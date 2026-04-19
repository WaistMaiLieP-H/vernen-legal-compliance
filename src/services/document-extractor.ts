/**
 * document-extractor.ts — Document Content Extractor
 *
 * Reads a PDF or image file and produces structured DocumentContent
 * that the execution engine consumes. This is the OCR/vision layer
 * that bridges raw files to the audit pipeline.
 *
 * For PDFs: extracts text, fields, persons, events, statements
 * For Images: reads visible text and form fields
 *
 * This extractor uses pattern matching on police report formats,
 * court forms (Judicial Council), and common legal documents.
 * It is NOT ML-based — it uses deterministic field extraction
 * based on known document structures.
 */

import { generateId } from "../utils/helpers.js";
import type {
  DocumentContent,
  PageContent,
  PersonMention,
  EventMention,
  StatementRecord,
  EvidenceItem,
  TimestampRecord,
} from "./execution-engine.js";

// ---------------------------------------------------------------------------
// Police Report Field Patterns
// ---------------------------------------------------------------------------

const POLICE_REPORT_PATTERNS = {
  incidentNumber: /incident\s*(?:number|#|no\.?)\s*[:.]?\s*(\d[\d-]+)/i,
  incidentType: /incident\s*type\s*[:.]?\s*([^\n]+)/i,
  incidentDate: /inc\s*occurred\s*(?:start|date)\s*[:.]?\s*(\d{1,2}\/\d{1,2}\/\d{2,4})/i,
  incidentEndDate: /inc\s*occurred\s*end\s*[:.]?\s*(\d{1,2}\/\d{1,2}\/\d{2,4})/i,
  reportDate: /report\s*(?:taken|date)\s*[:.]?\s*(\d{1,2}\/\d{1,2}\/\d{2,4})/i,
  address: /inc\s*occurred\s*address\s*[:.]?\s*([^\n]+)/i,
  domestic: /domestic\s*[:.]?\s*(Y|N|YES|NO)/i,
  statuteCode: /statute\s*(?:code|desc)\s*[:.]?\s*([^\n]+)/i,
  statuteSeverity: /statute\s*severity\s*[:.]?\s*(\w+)/i,
  disposition: /disposition\s*[:.]?\s*([^\n]+)/i,
  reportingOfficer: /reporting\s*officer\s*[:.]?\s*([^\n]+)/i,
  approvedBy: /approved\s*by\s*[:.]?\s*([^\n]+)/i,
  agency: /(?:oakland police|contra costa|alameda county|benicia|antioch|berkeley)/i,

  // Person patterns
  personBlock: /person\s*#?\s*[:.]?\s*(\d+)[\s\S]*?(?=person\s*#?\s*[:.]?\s*\d+|property|narrative|$)/gi,
  personName: /name\s*[:.]?\s*([A-Z][A-Z\s,'-]+)/i,
  personRole: /event\s*association\s*[:.]?\s*(\w+)/i,
  personAge: /age\s*[:.]?\s*(\d+\s*-\s*\d+)/i,
  personSex: /sex\s*[:.]?\s*(MALE|FEMALE|M|F)/i,
  personRace: /race\s*[:.]?\s*(\w+)/i,
  personAddress: /address\s*[:.]?\s*([^\n]+)/i,

  // DV Supplement patterns
  priorIncidents: /(?:dates?\s*of\s*)?previous\s*incidents?\s*(?:\(month\/year\))?\s*[:.]?\s*([^\n]+)/i,
  totalIncidents: /total\s*reported\s*incidents?\s*[:.]?\s*([^\n]+)/i,
  restrainingOrder: /restraining\s*order\s*(?:in\s*effect)?\s*[:.]?\s*(yes|no|Y|N)/i,
  dvResourceCard: /domestic\s*violence\s*resource\s*card\s*(?:given)?\s*[:.]?\s*(yes|no|Y|N)/i,
  victimProsecute: /victim\s*(?:refuses?\s*to\s*)?prosecute?\s*[:.]?\s*([^\n]+)/i,
  relationship: /nature\s*of\s*relationship\s*[:.]?\s*([^\n]+)/i,

  // Narrative patterns
  narrativeStart: /(?:summary|narrative|synopsis)\s*[:.]?\s*/i,
};

// ---------------------------------------------------------------------------
// Court Form Patterns (Judicial Council)
// ---------------------------------------------------------------------------

const COURT_FORM_PATTERNS = {
  formNumber: /(DV-\d{3}|FL-\d{3}|GC-\d{3}|MC-\d{3}|CR-\d{3})/i,
  caseNumber: /(?:case\s*(?:number|#|no\.?)|RF)\s*[:.]?\s*(\w[\w-]+)/i,
  filedDate: /filed\s*[:.]?\s*([A-Z]{3}\s+\d{1,2}\s+\d{4}|\d{1,2}\/\d{1,2}\/\d{2,4})/i,
  petitioner: /(?:protected\s*person|petitioner)\s*(?:['']s)?\s*name\s*[:.]?\s*([^\n]+)/i,
  respondent: /(?:restrained\s*person|respondent)\s*(?:['']s)?\s*name\s*[:.]?\s*([^\n]+)/i,
  courtName: /superior\s*court\s*(?:of\s*(?:california|the\s*state))?\s*,?\s*(?:county\s*of)?\s*([^\n]+)/i,
  hearingDate: /(?:court\s*hearing|hearing)\s*date\s*[:.]?\s*(\d{1,2}\/\d{1,2}\/\d{2,4})/i,
};

// ---------------------------------------------------------------------------
// Statement Extraction
// ---------------------------------------------------------------------------

/**
 * Extract statements from narrative text.
 * Looks for patterns like:
 * - "V-1 stated that..."
 * - "S-1 told me that..."
 * - "He stated..."
 * - Direct quotes in quotation marks
 */
function extractStatements(text: string, sourcePage: number): StatementRecord[] {
  const statements: StatementRecord[] = [];

  // Pattern: [Person] stated/told/said [content]
  const stmtPattern = /(?:(V-\d|S-\d|O-\d|[A-Z][a-z]+(?:\s[A-Z][a-z]+)?)\s+(?:stated|told\s+me|said|advised|reported|claimed|indicated|mentioned)\s+(?:that\s+|to\s+me\s+that\s+)?)((?:[^.]+\.){1,3})/gi;

  let match;
  while ((match = stmtPattern.exec(text)) !== null) {
    const speaker = match[1]!.trim();
    const content = match[2]!.trim();

    // Check if it's a direct quote
    const directQuote = content.includes('"') || content.includes("'") || content.includes("\u201C");

    statements.push({
      speaker,
      speakerRole: inferRole(speaker),
      content,
      context: "Officer narrative",
      sourcePage,
      paraphrasedBy: directQuote ? undefined : "Reporting Officer",
      directQuote,
    });
  }

  // Pattern: Direct quotes — "text here"
  const quotePattern = /[""\u201C]([^""\u201D]+)[""\u201D]/g;
  while ((match = quotePattern.exec(text)) !== null) {
    // Try to find who said it from surrounding context
    const before = text.substring(Math.max(0, match.index - 100), match.index);
    const speakerMatch = before.match(/(V-\d|S-\d|O-\d|[A-Z][a-z]+)\s+(?:said|stated|yelled|told)/i);

    statements.push({
      speaker: speakerMatch ? speakerMatch[1]! : "Unknown",
      speakerRole: speakerMatch ? inferRole(speakerMatch[1]!) : "Unknown",
      content: match[1]!,
      context: "Direct quote in narrative",
      sourcePage,
      directQuote: true,
    });
  }

  return statements;
}

function inferRole(designation: string): string {
  if (designation.startsWith("V-")) return "Victim";
  if (designation.startsWith("S-")) return "Suspect";
  if (designation.startsWith("O-")) return "Other/Child";
  if (designation.startsWith("R/P") || designation.startsWith("RP")) return "Reporting Person";
  return "Unknown";
}

// ---------------------------------------------------------------------------
// Event Extraction
// ---------------------------------------------------------------------------

/**
 * Extract events mentioned in text that reference other dates or incidents.
 * These are potential shadow incidents if no corresponding record exists.
 */
function extractEvents(text: string, sourcePage: number): EventMention[] {
  const events: EventMention[] = [];

  // Pattern: references to prior police/EMT contacts
  const priorContactPattern = /(?:called\s+(?:the\s+)?(?:police|911|OPD|officers?|EMTs?|paramedics?|ambulance)|(?:police|officers?|EMTs?|paramedics?)\s+(?:were\s+)?(?:dispatched|responded|arrived|came))\s*(?:(?:on|about|around|approximately)\s+)?(?:(\d{1,2}\/\d{1,2}\/\d{2,4}|\w+\s+\d{1,2}(?:,?\s+\d{4})?|(?:days?|week|month)\s+(?:earlier|before|prior|ago)))?/gi;

  let match;
  while ((match = priorContactPattern.exec(text)) !== null) {
    const fullMatch = match[0];
    const dateRef = match[1] || "date unspecified";

    // Determine who mentioned this
    const before = text.substring(Math.max(0, match.index - 200), match.index);
    const speakerMatch = before.match(/(V-\d|S-\d|[A-Z][a-z]+)\s+(?:stated|told|said|mentioned)/i);

    events.push({
      description: fullMatch.trim(),
      date: dateRef !== "date unspecified" ? dateRef : undefined,
      location: undefined,
      participants: [],
      sourcePage,
      sourceStatement: speakerMatch ? speakerMatch[1] : undefined,
      hasCorrespondingRecord: null, // Unknown — needs verification
    });
  }

  // Pattern: references to hospitalization
  const hospitalPattern = /(?:released\s+from\s+(?:the\s+)?hospital|admitted\s+to|hospitalized|self-commit|psychiatric\s+hold|5150|evaluated\s+by\s+(?:paramedics?|EMTs?))/gi;
  while ((match = hospitalPattern.exec(text)) !== null) {
    const before = text.substring(Math.max(0, match.index - 200), match.index);
    const speakerMatch = before.match(/(V-\d|S-\d|[A-Z][a-z]+)\s+(?:stated|told|said|was)/i);

    events.push({
      description: match[0].trim(),
      sourcePage,
      participants: [],
      sourceStatement: speakerMatch ? speakerMatch[1] : undefined,
      hasCorrespondingRecord: null,
    });
  }

  // Pattern: references to restraining orders / court orders
  const courtPattern = /(?:served\s+(?:with\s+)?(?:a\s+)?(?:restraining\s+order|TRO|protective\s+order|court\s+order)|restraining\s+order\s+(?:was\s+)?(?:served|issued|granted))/gi;
  while ((match = courtPattern.exec(text)) !== null) {
    events.push({
      description: match[0].trim(),
      sourcePage,
      participants: [],
      sourceStatement: undefined,
      hasCorrespondingRecord: null,
    });
  }

  return events;
}

// ---------------------------------------------------------------------------
// Evidence Extraction
// ---------------------------------------------------------------------------

function extractEvidence(text: string, sourcePage: number): EvidenceItem[] {
  const items: EvidenceItem[] = [];

  // Pattern: photo/photograph evidence
  const photoPattern = /(\d+)\s*(?:separate\s+)?(?:colored?\s+)?photo(?:graph)?(?:s|'s)?\s+of\s+([^.]+)/gi;
  let match;
  while ((match = photoPattern.exec(text)) !== null) {
    items.push({
      description: match[0].trim(),
      type: "Photograph",
      collected: true,
      sourcePage,
    });
  }

  // Pattern: property/evidence items
  const propertyPattern = /property\s*#?\s*[:.]?\s*(\d+)[\s\S]*?description\s*[:.]?\s*([^\n]+)/gi;
  while ((match = propertyPattern.exec(text)) !== null) {
    items.push({
      description: match[2]!.trim(),
      type: "Physical Evidence",
      collected: true,
      propertyNumber: match[1]!,
      sourcePage,
    });
  }

  return items;
}

// ---------------------------------------------------------------------------
// Timestamp Extraction
// ---------------------------------------------------------------------------

function extractTimestamps(text: string, sourcePage: number, sourceType: string): TimestampRecord[] {
  const timestamps: TimestampRecord[] = [];

  // Pattern: "On [date] at [time]..." or "[date] at approximately [time]..."
  const dateTimePattern = /(?:on\s+)?(\d{1,2}\s+\w{3}\s+\d{2,4}|\d{1,2}\/\d{1,2}\/\d{2,4})\s*(?:,?\s*at\s*(?:about|approximately)?\s*(\d{3,4})\s*hrs?)?/gi;

  let match;
  while ((match = dateTimePattern.exec(text)) !== null) {
    const date = match[1];
    const time = match[2] || "";
    const after = text.substring(match.index, Math.min(text.length, match.index + 200));

    timestamps.push({
      timestamp: date + (time ? " " + time : ""),
      event: after.substring(match[0].length, Math.min(after.length, 100)).trim().replace(/[,.]$/, ""),
      sourcePage,
      source: sourceType,
    });
  }

  return timestamps;
}

// ---------------------------------------------------------------------------
// Person Extraction from Police Reports
// ---------------------------------------------------------------------------

function extractPersons(text: string): PersonMention[] {
  const persons: PersonMention[] = [];

  // Look for Person blocks
  const personBlockPattern = /person\s*#?\s*[:.]?\s*(\d+)[\s\S]*?event\s*association\s*[:.]?\s*(\w+)[\s\S]*?name\s*[:.]?\s*([A-Z][A-Z\s,'-]+?)(?:\n|$)/gi;

  let match;
  while ((match = personBlockPattern.exec(text)) !== null) {
    const num = match[1]!;
    const role = match[2]!.trim();
    const name = match[3]!.trim();

    // Extract additional attributes
    const block = match[0];
    const ageMatch = block.match(/age\s*[:.]?\s*(\d+)/i);
    const sexMatch = block.match(/sex\s*[:.]?\s*(MALE|FEMALE|M|F)/i);
    const raceMatch = block.match(/race\s*[:.]?\s*(\w+)/i);
    const heightMatch = block.match(/height\s*[:.]?\s*([^\n]+)/i);
    const weightMatch = block.match(/weight\s*[:.]?\s*([^\n]+)/i);
    const badgeMatch = block.match(/(?:emp#?|badge#?)\s*[:.]?\s*(\d+)/i);

    persons.push({
      name,
      role,
      designation: `Person #${num} / ${role}`,
      agency: undefined,
      badgeOrId: badgeMatch?.[1],
      firstMentionPage: 1,
      attributes: {
        age: ageMatch?.[1] || "",
        sex: sexMatch?.[1] || "",
        race: raceMatch?.[1] || "",
        height: heightMatch?.[1] || "",
        weight: weightMatch?.[1] || "",
      },
    });
  }

  // Look for officers in the Officers section
  const officerPattern = /(?:reporting|primary|secondary|assigned)\s+(?:officer|responding)\s*(?:['']s)?\s*(?:supervis)?\s*(\d+)\s*(?:badge#?)?\s*([A-Z][A-Z\s,]+?)(?:\n|$)/gi;
  while ((match = officerPattern.exec(text)) !== null) {
    persons.push({
      name: match[2]!.trim(),
      role: "Officer",
      designation: `Emp# ${match[1]!}`,
      agency: "OPD",
      badgeOrId: match[1]!,
      firstMentionPage: 1,
      attributes: {},
    });
  }

  return persons;
}

// ---------------------------------------------------------------------------
// Main Extraction Function
// ---------------------------------------------------------------------------

/**
 * Extract structured content from raw document text.
 * Accepts the full text of a document (from PDF extraction or OCR)
 * and returns structured DocumentContent for the execution engine.
 */
export function extractDocumentContent(
  sourceFile: string,
  rawText: string,
  pageTexts: string[],  // Text per page if available
): DocumentContent {
  const fullText = rawText || pageTexts.join("\n\n");

  // Determine document type
  const isPoliceReport = /incident\s*(?:report|number|type)/i.test(fullText);
  const isCourtForm = /(DV-\d{3}|FL-\d{3}|GC-\d{3})/i.test(fullText);
  const isDVSupplement = /domestic\s*violence.*resource\s*card/i.test(fullText);

  // Extract metadata
  const metadata: Record<string, string> = {};

  if (isPoliceReport) {
    const incNum = fullText.match(POLICE_REPORT_PATTERNS.incidentNumber);
    const incType = fullText.match(POLICE_REPORT_PATTERNS.incidentType);
    const incDate = fullText.match(POLICE_REPORT_PATTERNS.incidentDate);
    const repDate = fullText.match(POLICE_REPORT_PATTERNS.reportDate);
    const addr = fullText.match(POLICE_REPORT_PATTERNS.address);
    const domestic = fullText.match(POLICE_REPORT_PATTERNS.domestic);
    const statute = fullText.match(POLICE_REPORT_PATTERNS.statuteCode);
    const severity = fullText.match(POLICE_REPORT_PATTERNS.statuteSeverity);
    const disp = fullText.match(POLICE_REPORT_PATTERNS.disposition);
    const agency = fullText.match(POLICE_REPORT_PATTERNS.agency);

    if (incNum) metadata.incidentNumber = incNum[1]!;
    if (incType) metadata.incidentType = incType[1]!.trim();
    if (incDate) metadata.incidentDate = incDate[1]!;
    if (repDate) metadata.reportDate = repDate[1]!;
    if (addr) metadata.address = addr[1]!.trim();
    if (domestic) metadata.domestic = domestic[1]!;
    if (statute) metadata.statuteCode = statute[1]!.trim();
    if (severity) metadata.statuteSeverity = severity[1]!.trim();
    if (disp) metadata.disposition = disp[1]!.trim();
    if (agency) metadata.agency = agency[0].trim();

    // DV supplement fields
    const priorInc = fullText.match(POLICE_REPORT_PATTERNS.priorIncidents);
    const totalInc = fullText.match(POLICE_REPORT_PATTERNS.totalIncidents);
    const ro = fullText.match(POLICE_REPORT_PATTERNS.restrainingOrder);
    const dvCard = fullText.match(POLICE_REPORT_PATTERNS.dvResourceCard);
    const prosecute = fullText.match(POLICE_REPORT_PATTERNS.victimProsecute);

    if (priorInc) metadata.priorIncidents = priorInc[1]!.trim();
    if (totalInc) metadata.totalIncidents = totalInc[1]!.trim();
    if (ro) metadata.restrainingOrder = ro[1]!.trim();
    if (dvCard) metadata.dvResourceCardGiven = dvCard[1]!.trim();
    if (prosecute) metadata.victimProsecute = prosecute[1]!.trim();
  }

  if (isCourtForm) {
    const formNum = fullText.match(COURT_FORM_PATTERNS.formNumber);
    const caseNum = fullText.match(COURT_FORM_PATTERNS.caseNumber);
    const filed = fullText.match(COURT_FORM_PATTERNS.filedDate);
    const pet = fullText.match(COURT_FORM_PATTERNS.petitioner);
    const resp = fullText.match(COURT_FORM_PATTERNS.respondent);

    if (formNum) metadata.formNumber = formNum[1]!;
    if (caseNum) metadata.caseNumber = caseNum[1]!;
    if (filed) metadata.filedDate = filed[1]!.trim();
    if (pet) metadata.petitioner = pet[1]!.trim();
    if (resp) metadata.respondent = resp[1]!.trim();
  }

  // Extract structured data
  const persons = extractPersons(fullText);
  const events = extractEvents(fullText, 1);
  const statements = extractStatements(fullText, 1);
  const evidenceItems = extractEvidence(fullText, 1);
  const timestamps = extractTimestamps(fullText, 1, isPoliceReport ? "Police Report" : "Court Document");

  // Build pages
  const pages: PageContent[] = pageTexts.length > 0
    ? pageTexts.map((text, i) => ({
        pageNumber: i + 1,
        rawText: text,
        fields: {},
      }))
    : [{
        pageNumber: 1,
        rawText: fullText,
        fields: {},
      }];

  // Determine document type string
  let documentType = "Unknown Document";
  if (isPoliceReport && metadata.incidentType) {
    documentType = `Police Report — ${metadata.incidentType}`;
  } else if (isCourtForm && metadata.formNumber) {
    documentType = `Court Form ${metadata.formNumber}`;
  } else if (isDVSupplement) {
    documentType = "DV Supplement";
  }

  return {
    id: generateId("doc"),
    sourceFile,
    documentType,
    documentDate: metadata.incidentDate || metadata.reportDate || metadata.filedDate || "Unknown",
    jurisdiction: metadata.agency ? "CA" : "Unknown",
    agency: metadata.agency,
    caseNumber: metadata.incidentNumber || metadata.caseNumber,
    pages,
    persons,
    events,
    statements,
    evidenceItems,
    timestamps,
    metadata,
  };
}

// ---------------------------------------------------------------------------
// Shadow Incident Verification
// ---------------------------------------------------------------------------

/**
 * After extracting events from multiple documents, cross-reference
 * to determine which events have corresponding records and which
 * are shadow incidents.
 */
export function verifyShadowIncidents(
  documents: DocumentContent[],
): void {
  for (const doc of documents) {
    for (const event of doc.events) {
      if (event.hasCorrespondingRecord !== null) continue; // Already verified

      // Check if any other document in the case file corresponds to this event
      let found = false;
      for (const otherDoc of documents) {
        if (otherDoc.id === doc.id) continue;

        // Check if the other document's date matches the event's date
        if (event.date && otherDoc.documentDate &&
            otherDoc.documentDate.includes(event.date)) {
          found = true;
          break;
        }

        // Check if the other document's description references the same event
        if (event.description &&
            otherDoc.pages.some(p =>
              p.rawText.toLowerCase().includes(event.description.toLowerCase().substring(0, 30))
            )) {
          // Found a reference, but is it a RECORD or just another mention?
          // If the other doc is from an official agency, it's a record
          if (otherDoc.agency) {
            found = true;
            break;
          }
        }
      }

      event.hasCorrespondingRecord = found;
    }
  }
}

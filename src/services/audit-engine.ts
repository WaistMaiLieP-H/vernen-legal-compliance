/**
 * VERNEN™ Autonomous Audit Engine — Cloudflare Workers Service
 * 6-Pass document audit pipeline, rule-based implementation.
 *
 * Pass 1: Document Classification — identify document type, jurisdiction, governing law
 * Pass 2: Statutory Retrieval — look up applicable statutes from D1
 * Pass 3: Procedural Compliance — check format, signatures, service, deadlines
 * Pass 4: Substantive Audit — check conflicts, inconsistencies, missing elements
 * Pass 5: Bias & Fraud Detection — check manipulation patterns
 * Pass 6: Risk Scoring — aggregate findings into overall risk score (0-100)
 *
 * © 2024-2026 Michael Vernen Thomas Hartmann. All Rights Reserved.
 */

import type { Env } from "../index.js";

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export interface AuditFinding {
  id: string;
  passNumber: number;
  passName: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFO";
  finding: string;
  recommendation: string;
  statutoryBasis: string;
  location?: string;
  evidence?: string;
  type?: string;
}

export interface PassResult {
  passNumber: number;
  passName: string;
  status: "completed" | "failed";
  findings: AuditFinding[];
  metadata: Record<string, unknown>;
}

export interface DocumentClassification {
  documentType: string;
  documentTypeLabel: string;
  jurisdiction: string;
  governingStatutes: string[];
  parties: { creator?: string; subject?: string };
  caseNumber?: string;
  dateIssued?: string;
  formCode?: string;
  category?: string;
}

export interface AuditResult {
  id: string;
  documentType: string;
  status: "COMPLETED" | "FAILED";
  passesCompleted: number;
  totalPasses: number;
  findings: AuditFinding[];
  riskScore: number;
  riskRating: string;
  classification: DocumentClassification;
  summary: string;
  createdAt: string;
  completedAt: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// PATTERNS & RULES
// ═══════════════════════════════════════════════════════════════════════════════

/** Known California Judicial Council form codes */
const FORM_PATTERNS: Record<string, { type: string; label: string; category: string; statutes: string[] }> = {
  "FL-100": { type: "petition", label: "Petition — Marriage/Domestic Partnership", category: "family_law", statutes: ["FAM §2320", "FAM §2330", "CRC 5.120"] },
  "FL-110": { type: "summons", label: "Summons (Family Law)", category: "family_law", statutes: ["CCP §412.20", "FAM §2040", "CRC 5.50"] },
  "FL-120": { type: "response", label: "Response — Marriage/Domestic Partnership", category: "family_law", statutes: ["FAM §2020", "CCP §412.20", "CRC 5.120"] },
  "FL-150": { type: "declaration", label: "Income and Expense Declaration", category: "family_law", statutes: ["FAM §2030", "FAM §3620", "FAM §4058", "CRC 5.260"] },
  "FL-300": { type: "motion", label: "Request for Order", category: "family_law", statutes: ["FAM §6300", "FAM §3020", "CRC 5.92"] },
  "FL-305": { type: "ex_parte", label: "Temporary Emergency (Ex Parte) Orders", category: "family_law", statutes: ["FAM §6340", "CRC 5.151", "CRC 5.165"] },
  "FL-311": { type: "custody_attachment", label: "Child Custody and Visitation Application Attachment", category: "family_law", statutes: ["FAM §3020", "FAM §3040", "CRC 5.210"] },
  "FL-312": { type: "abduction_prevention", label: "Child Abduction Prevention Orders", category: "family_law", statutes: ["FAM §3048", "FAM §3131", "PC §278.5"] },
  "FL-320": { type: "responsive_declaration", label: "Responsive Declaration to Request for Order", category: "family_law", statutes: ["CRC 5.92", "FAM §217"] },
  "FL-341": { type: "custody_order", label: "Child Custody and Visitation Order Attachment", category: "family_law", statutes: ["FAM §3020", "FAM §3040", "CRC 5.210"] },
  "DV-100": { type: "dvro_request", label: "Request for Domestic Violence Restraining Order", category: "domestic_violence", statutes: ["FAM §6200", "FAM §6300", "FAM §6320"] },
  "DV-109": { type: "dvro_notice", label: "Notice of Court Hearing (DV)", category: "domestic_violence", statutes: ["FAM §6306", "CRC 5.62"] },
  "DV-110": { type: "tro", label: "Temporary Restraining Order", category: "domestic_violence", statutes: ["FAM §6300", "FAM §6320", "FAM §6380"] },
  "FW-001": { type: "fee_waiver_request", label: "Request to Waive Court Fees", category: "fee_waiver", statutes: ["GOV §68631", "GOV §68632", "CRC 3.50"] },
  "FW-003": { type: "fee_waiver_order", label: "Order on Court Fee Waiver", category: "fee_waiver", statutes: ["GOV §68631", "GOV §68636", "CRC 3.56"] },
  "MC-031": { type: "declaration", label: "Attached Declaration", category: "general", statutes: ["CCP §2015.5", "CRC 5.92"] },
};

/** Keywords for document type inference */
const DOC_TYPE_KEYWORDS: Record<string, string[]> = {
  petition: ["petition", "petitioner", "dissolution", "annulment", "legal separation"],
  motion: ["motion", "request for order", "hereby requests", "relief sought"],
  declaration: ["i declare under penalty of perjury", "declare under penalty", "sworn statement"],
  order: ["it is hereby ordered", "the court orders", "ordered that"],
  dvro: ["restraining order", "domestic violence", "protective order", "stay away", "no contact"],
  response: ["response", "respondent", "responsive declaration"],
  summons: ["summons", "you are summoned", "notice to respondent"],
  subpoena: ["subpoena", "commanded to appear", "produce documents"],
  complaint: ["complaint", "plaintiff", "cause of action", "alleges"],
  custody: ["custody", "visitation", "parenting time", "best interest of the child"],
  support: ["child support", "spousal support", "income and expense", "guideline"],
};

/** Required procedural elements by document type */
const PROCEDURAL_REQUIREMENTS: Record<string, string[]> = {
  petition: ["party_names", "case_number_or_new", "verification", "signature", "venue"],
  motion: ["party_names", "case_number", "hearing_date", "signature", "declaration", "proof_of_service"],
  declaration: ["party_names", "case_number", "perjury_clause", "signature", "date"],
  order: ["party_names", "case_number", "judge_signature", "date", "findings"],
  dvro: ["party_names", "relationship", "abuse_description", "orders_requested", "signature"],
  response: ["party_names", "case_number", "signature", "verification", "timely_filing"],
  summons: ["party_names", "case_number", "clerk_signature", "atro_notice"],
  default: ["party_names", "signature", "date"],
};

// ═══════════════════════════════════════════════════════════════════════════════
// UTILITY
// ═══════════════════════════════════════════════════════════════════════════════

function generateId(): string {
  return crypto.randomUUID();
}

function normalizeContent(content: string): string {
  return content.replace(/\r\n/g, "\n").replace(/\s+/g, " ").trim();
}

function extractFormCode(content: string): string | null {
  // Look for form codes like FL-100, DV-100, FW-001, MC-031, etc.
  const match = content.match(/\b(FL|DV|FW|MC|SC|APP)-?\d{2,4}[A-Z]?\b/i);
  return match ? match[0].toUpperCase().replace(/(\w{2})(\d)/, "$1-$2") : null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// AUDIT ENGINE CLASS
// ═══════════════════════════════════════════════════════════════════════════════

export class AuditEngine {

  // ─── PASS 1: Document Classification ────────────────────────────────────────
  private classifyDocument(content: string): { classification: DocumentClassification; findings: AuditFinding[] } {
    const findings: AuditFinding[] = [];
    const normalized = normalizeContent(content).toLowerCase();
    const original = content;

    // Try to detect form code
    const formCode = extractFormCode(original);
    let knownForm = formCode ? FORM_PATTERNS[formCode] : null;

    // Infer document type from keywords
    let detectedType = "unknown";
    let detectedLabel = "Unknown Document";
    let bestScore = 0;

    for (const [type, keywords] of Object.entries(DOC_TYPE_KEYWORDS)) {
      let score = 0;
      for (const kw of keywords) {
        if (normalized.includes(kw)) score++;
      }
      if (score > bestScore) {
        bestScore = score;
        detectedType = type;
        detectedLabel = type.charAt(0).toUpperCase() + type.slice(1).replace(/_/g, " ");
      }
    }

    // If we matched a known form, use its metadata
    if (knownForm) {
      detectedType = knownForm.type;
      detectedLabel = knownForm.label;
    }

    // Extract jurisdiction
    let jurisdiction = "California"; // default
    const jurisdictionMatch = original.match(/superior court of california[,\s]+county of\s+([a-z\s]+)/i);
    if (jurisdictionMatch) {
      jurisdiction = `California, ${jurisdictionMatch[1]?.trim() ?? ""} County`;
    }

    // Extract case number
    const caseNumberMatch = original.match(/case\s*(?:no|number|#)[.:]*\s*([A-Z0-9\-]+)/i);
    const caseNumber = caseNumberMatch ? caseNumberMatch[1] : undefined;

    // Extract party names
    const petitionerMatch = original.match(/petitioner[:\s]+([^\n,]+)/i);
    const respondentMatch = original.match(/respondent[:\s]+([^\n,]+)/i);

    // Governing statutes
    const statutes = knownForm?.statutes || [];
    // Also try to extract statute references from content
    const statuteMatches = original.matchAll(/(?:FAM|CCP|GOV|CRC|PC|EC)\s*§\s*[\d.]+/gi);
    for (const m of statuteMatches) {
      const statute = m[0].replace(/\s+/g, " ");
      if (!statutes.includes(statute)) statutes.push(statute);
    }

    // Classification findings
    if (detectedType === "unknown") {
      findings.push({
        id: `P1-${generateId().slice(0, 8)}`,
        passNumber: 1,
        passName: "Document Classification",
        severity: "MEDIUM",
        finding: "Unable to determine document type. The document does not match known California Judicial Council form patterns.",
        recommendation: "Verify the document type and ensure it is a recognized legal document.",
        statutoryBasis: "",
      });
    }

    if (!caseNumber && detectedType !== "petition") {
      findings.push({
        id: `P1-${generateId().slice(0, 8)}`,
        passNumber: 1,
        passName: "Document Classification",
        severity: "LOW",
        finding: "No case number detected in the document.",
        recommendation: "Ensure the case number is clearly displayed on all filings.",
        statutoryBasis: "CRC 2.111",
      });
    }

    if (statutes.length === 0) {
      findings.push({
        id: `P1-${generateId().slice(0, 8)}`,
        passNumber: 1,
        passName: "Document Classification",
        severity: "INFO",
        finding: "No governing statutes could be identified from the document content.",
        recommendation: "The document should reference applicable statutory authority.",
        statutoryBasis: "",
      });
    }

    const classification: DocumentClassification = {
      documentType: detectedType,
      documentTypeLabel: detectedLabel,
      jurisdiction,
      governingStatutes: statutes,
      parties: {
        creator: petitionerMatch?.[1]?.trim(),
        subject: respondentMatch?.[1]?.trim(),
      },
      caseNumber,
      formCode: formCode || undefined,
      category: knownForm?.category,
    };

    return { classification, findings };
  }

  // ─── PASS 2: Statutory Retrieval ────────────────────────────────────────────
  private async retrieveStatutes(
    classification: DocumentClassification,
    env: Env
  ): Promise<{ statutes: Record<string, string>; findings: AuditFinding[] }> {
    const findings: AuditFinding[] = [];
    const statutes: Record<string, string> = {};

    // Look up form annotations from D1 if we have a form code
    if (classification.formCode) {
      try {
        const result = await env.DB.prepare(
          "SELECT data FROM court_forms WHERE form_code = ?"
        ).bind(classification.formCode).first<{ data: string }>();

        if (result?.data) {
          statutes[classification.formCode] = result.data;
          findings.push({
            id: `P2-${generateId().slice(0, 8)}`,
            passNumber: 2,
            passName: "Statutory Retrieval",
            severity: "INFO",
            finding: `Form annotation data retrieved for ${classification.formCode} from internal database.`,
            recommendation: "",
            statutoryBasis: "",
          });
        }
      } catch {
        // D1 lookup failed — not fatal
      }
    }

    // For each governing statute, note what it requires
    for (const statute of classification.governingStatutes) {
      const req = this.getStatuteRequirement(statute);
      if (req) {
        statutes[statute] = req;
      }
    }

    if (Object.keys(statutes).length === 0) {
      findings.push({
        id: `P2-${generateId().slice(0, 8)}`,
        passNumber: 2,
        passName: "Statutory Retrieval",
        severity: "MEDIUM",
        finding: "No statutory requirements could be retrieved for this document type. Audit will proceed with general compliance checks.",
        recommendation: "Consider manual review against applicable statutes.",
        statutoryBasis: "",
      });
    }

    return { statutes, findings };
  }

  /** Built-in statutory requirement summaries for common California statutes */
  private getStatuteRequirement(statute: string): string | null {
    const requirements: Record<string, string> = {
      "CRC 2.111": "Caption must include: court name, case number, document title, party names.",
      "CRC 5.92": "Request for Order requires: hearing date obtained in advance, 16 court days notice + 5 for mailing, supporting declaration.",
      "CRC 5.120": "Family law petition/response must include all required items per Judicial Council form.",
      "CRC 5.151": "Ex parte requires showing of immediate danger or irreparable harm.",
      "CRC 5.165": "Notice to other party required by 10:00 AM the court day before ex parte hearing.",
      "CRC 5.210": "Custody/visitation attachment must address best interest factors under FAM §3011.",
      "CCP §412.20": "Summons must be issued by clerk, valid for 3 years, respondent has 30 days to respond.",
      "CCP §1005": "Motion papers must be served at least 16 court days before hearing + 5 for mailing.",
      "CCP §2015.5": "Declaration must include: penalty of perjury clause, signature, date, city and state.",
      "FAM §70": "Date of separation requires actual physical separation with intent to end marriage.",
      "FAM §217": "At hearings on contested matters, each party has the right to present live testimony.",
      "FAM §2020": "Response must be filed within 30 calendar days after service of summons.",
      "FAM §2040": "Automatic temporary restraining orders (ATROs) effective upon service.",
      "FAM §2310": "Grounds for dissolution: irreconcilable differences or incurable insanity.",
      "FAM §2320": "Residency: 6 months in California, 3 months in filing county.",
      "FAM §2330": "Petition must contain party names and all required declarations.",
      "FAM §2550": "Community property must be divided equally.",
      "FAM §3011": "Best interest of child: health/safety, contact with both parents, DV history, substance abuse.",
      "FAM §3020": "Public policy favors frequent and continuing contact with both parents.",
      "FAM §3040": "Custody preference order: both parents, then other persons.",
      "FAM §3044": "Rebuttable presumption against custody to DV perpetrator within 5 years.",
      "FAM §3048": "Child abduction prevention: court considers risk factors listed in statute.",
      "FAM §4055": "Child support guideline formula based on income and timeshare.",
      "FAM §4320": "Spousal support factors for permanent support determination.",
      "FAM §4330": "Court may order spousal support during dissolution proceedings.",
      "FAM §6200": "DVPA purpose: prevent domestic violence and protect victims.",
      "FAM §6211": "Qualifying relationships for DVRO: spouse, cohabitant, dating, parent of child.",
      "FAM §6300": "Court may issue DVRO if reasonable proof of past act of abuse.",
      "FAM §6306": "DVRO hearing must be set within 21-25 days.",
      "FAM §6320": "DVRO may include: no contact, stay away, move out, property protection.",
      "FAM §6340": "Temporary restraining orders: court issues based on application showing abuse.",
      "GOV §68631": "Fee waiver available if receiving public benefits, below poverty line, or unable to pay.",
      "GOV §68632": "Three bases for fee waiver: public benefits, income threshold, hardship.",
    };

    // Normalize lookup
    for (const [key, value] of Object.entries(requirements)) {
      if (statute.includes(key.replace("§", "§").replace("§", "§")) || statute.includes(key)) {
        return value;
      }
    }
    return null;
  }

  // ─── PASS 3: Procedural Compliance ──────────────────────────────────────────
  private checkProceduralCompliance(
    content: string,
    classification: DocumentClassification
  ): AuditFinding[] {
    const findings: AuditFinding[] = [];
    const normalized = normalizeContent(content).toLowerCase();
    const original = content;

    const docType = classification.documentType;
    const requirements = PROCEDURAL_REQUIREMENTS[docType] || PROCEDURAL_REQUIREMENTS["default"]!;

    // Check party names
    if (requirements.includes("party_names")) {
      const hasPetitioner = /petitioner|plaintiff|protected person|applicant/i.test(original);
      const hasRespondent = /respondent|defendant|restrained person/i.test(original);
      if (!hasPetitioner && !hasRespondent) {
        findings.push({
          id: `P3-${generateId().slice(0, 8)}`,
          passNumber: 3,
          passName: "Procedural Compliance",
          severity: "HIGH",
          finding: "No party names or designations detected in the document.",
          recommendation: "All court filings must identify parties. Include Petitioner and Respondent names per CRC 2.111.",
          statutoryBasis: "CRC 2.111",
          location: "Header/Caption",
        });
      }
    }

    // Check case number
    if (requirements.includes("case_number") && !classification.caseNumber) {
      findings.push({
        id: `P3-${generateId().slice(0, 8)}`,
        passNumber: 3,
        passName: "Procedural Compliance",
        severity: "HIGH",
        finding: "No case number found. All filed documents except initial petitions must include the case number.",
        recommendation: "Add the case number assigned by the court to the caption area.",
        statutoryBasis: "CRC 2.111",
        location: "Header/Caption",
      });
    }

    // Check signature
    if (requirements.includes("signature")) {
      const hasSignature = /\bsign(?:ed|ature)\b|\/s\/|_{5,}|\.{5,}/i.test(original);
      if (!hasSignature) {
        findings.push({
          id: `P3-${generateId().slice(0, 8)}`,
          passNumber: 3,
          passName: "Procedural Compliance",
          severity: "CRITICAL",
          finding: "No signature detected. An unsigned document is invalid and will be rejected by the clerk.",
          recommendation: "Sign the document before filing.",
          statutoryBasis: "CCP §2015.5",
          location: "Signature Block",
        });
      }
    }

    // Check verification / perjury clause
    if (requirements.includes("verification") || requirements.includes("perjury_clause")) {
      const hasPerjury = /under penalty of perjury|declare under penalty|perjury/i.test(original);
      if (!hasPerjury) {
        findings.push({
          id: `P3-${generateId().slice(0, 8)}`,
          passNumber: 3,
          passName: "Procedural Compliance",
          severity: "CRITICAL",
          finding: "No declaration under penalty of perjury found. California requires verification under CCP §2015.5.",
          recommendation: "Include the standard declaration: 'I declare under penalty of perjury under the laws of the State of California that the foregoing is true and correct.'",
          statutoryBasis: "CCP §2015.5",
          location: "Signature/Verification Section",
        });
      }
    }

    // Check date
    if (requirements.includes("date")) {
      const hasDate = /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}|\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}/i.test(original);
      if (!hasDate) {
        findings.push({
          id: `P3-${generateId().slice(0, 8)}`,
          passNumber: 3,
          passName: "Procedural Compliance",
          severity: "MEDIUM",
          finding: "No date detected on the document.",
          recommendation: "All court filings must be dated. Include the date of signing.",
          statutoryBasis: "CCP §2015.5",
          location: "Date Field",
        });
      }
    }

    // Check venue/residency for petitions
    if (requirements.includes("venue")) {
      const hasVenue = /county of|superior court/i.test(original);
      if (!hasVenue) {
        findings.push({
          id: `P3-${generateId().slice(0, 8)}`,
          passNumber: 3,
          passName: "Procedural Compliance",
          severity: "HIGH",
          finding: "No venue/court designation found. Petitions must identify the Superior Court and county.",
          recommendation: "Include 'Superior Court of California, County of [Name]' in the caption.",
          statutoryBasis: "FAM §2320",
          location: "Header/Caption",
        });
      }
    }

    // Check hearing date for motions
    if (requirements.includes("hearing_date")) {
      const hasHearing = /hearing\s*(?:date|on|set)|(?:date|set)\s*(?:for|of)\s*hearing/i.test(original);
      if (!hasHearing) {
        findings.push({
          id: `P3-${generateId().slice(0, 8)}`,
          passNumber: 3,
          passName: "Procedural Compliance",
          severity: "HIGH",
          finding: "No hearing date detected. Motions (FL-300) must include a pre-reserved hearing date.",
          recommendation: "Contact the clerk to reserve a hearing date before filing. Must be at least 16 court days out.",
          statutoryBasis: "CRC 5.92",
          location: "Hearing Date Section",
        });
      }
    }

    // Check for declaration/supporting evidence for motions
    if (requirements.includes("declaration")) {
      const hasDeclaration = /declaration|mc-031|attached declaration|supporting declaration/i.test(original);
      if (!hasDeclaration) {
        findings.push({
          id: `P3-${generateId().slice(0, 8)}`,
          passNumber: 3,
          passName: "Procedural Compliance",
          severity: "HIGH",
          finding: "No supporting declaration referenced. Motions must be supported by a declaration under penalty of perjury stating the facts.",
          recommendation: "Prepare and attach a declaration (MC-031) setting forth the facts supporting your request.",
          statutoryBasis: "CRC 5.92",
          location: "Declaration/Attachments",
        });
      }
    }

    // Check proof of service for motions
    if (requirements.includes("proof_of_service")) {
      const hasService = /proof of service|served|service by|personally served/i.test(original);
      if (!hasService) {
        findings.push({
          id: `P3-${generateId().slice(0, 8)}`,
          passNumber: 3,
          passName: "Procedural Compliance",
          severity: "MEDIUM",
          finding: "No proof of service detected or referenced.",
          recommendation: "File a proof of service (FL-330) demonstrating proper service on the other party.",
          statutoryBasis: "CCP §1005",
          location: "Service",
        });
      }
    }

    // DVRO-specific: relationship and abuse description
    if (requirements.includes("relationship")) {
      const hasRelationship = /spouse|married|dating|cohabitant|domestic partner|parent of|formerly/i.test(original);
      if (!hasRelationship) {
        findings.push({
          id: `P3-${generateId().slice(0, 8)}`,
          passNumber: 3,
          passName: "Procedural Compliance",
          severity: "HIGH",
          finding: "No qualifying relationship identified. A DVRO requires a qualifying relationship under Family Code §6211.",
          recommendation: "Specify the relationship: spouse, cohabitant, dating, parent of same child, or close relative.",
          statutoryBasis: "FAM §6211",
          location: "Relationship Section",
        });
      }
    }

    if (requirements.includes("abuse_description")) {
      const hasAbuse = /abuse|violence|threaten|hit|struck|push|stalk|harass|fear|afraid|harm/i.test(original);
      if (!hasAbuse) {
        findings.push({
          id: `P3-${generateId().slice(0, 8)}`,
          passNumber: 3,
          passName: "Procedural Compliance",
          severity: "CRITICAL",
          finding: "No description of abuse detected. A DVRO requires reasonable proof of past act of abuse.",
          recommendation: "Describe specific incidents with dates, locations, and details of what happened.",
          statutoryBasis: "FAM §6300",
          location: "Abuse Description",
        });
      }
    }

    return findings;
  }

  // ─── PASS 4: Substantive Audit ──────────────────────────────────────────────
  private auditSubstance(
    content: string,
    classification: DocumentClassification
  ): AuditFinding[] {
    const findings: AuditFinding[] = [];
    const normalized = normalizeContent(content).toLowerCase();

    // Check for internal date inconsistencies
    const dateMatches = content.matchAll(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/g);
    const dates: string[] = [];
    for (const m of dateMatches) {
      dates.push(m[0]);
    }
    // If we find many dates, flag potential inconsistency
    if (dates.length > 5) {
      findings.push({
        id: `P4-${generateId().slice(0, 8)}`,
        passNumber: 4,
        passName: "Substantive Audit",
        severity: "INFO",
        finding: `Document contains ${dates.length} date references. Manual review recommended to ensure chronological consistency.`,
        recommendation: "Verify all dates are accurate and internally consistent.",
        statutoryBasis: "",
        type: "Internal_Consistency",
      });
    }

    // Custody-specific: check for best interest factors
    if (classification.category === "family_law" && /custody|visitation|parenting/i.test(content)) {
      const bestInterestFactors = [
        { keyword: "health", label: "child's health and safety" },
        { keyword: "contact with both parents", label: "frequent and continuing contact" },
        { keyword: "domestic violence", label: "history of domestic violence" },
        { keyword: "substance abuse", label: "substance abuse" },
        { keyword: "best interest", label: "best interest standard" },
      ];

      let mentionedCount = 0;
      for (const factor of bestInterestFactors) {
        if (normalized.includes(factor.keyword)) mentionedCount++;
      }

      if (mentionedCount < 2) {
        findings.push({
          id: `P4-${generateId().slice(0, 8)}`,
          passNumber: 4,
          passName: "Substantive Audit",
          severity: "MEDIUM",
          finding: "Custody-related document does not address key best interest factors required by FAM §3011.",
          recommendation: "Address: health/safety of child, contact with both parents, history of DV, substance abuse, and any other relevant factors.",
          statutoryBasis: "FAM §3011",
          type: "Omission",
        });
      }
    }

    // Support-specific: check for income information
    if (/support/i.test(content) && classification.category === "family_law") {
      const hasIncome = /income|salary|wages|earn|fl-150|pay stub/i.test(content);
      if (!hasIncome) {
        findings.push({
          id: `P4-${generateId().slice(0, 8)}`,
          passNumber: 4,
          passName: "Substantive Audit",
          severity: "HIGH",
          finding: "Support request detected but no income information referenced. Income evidence is mandatory for support calculations.",
          recommendation: "Attach an Income and Expense Declaration (FL-150) with current income documentation.",
          statutoryBasis: "FAM §4058",
          type: "Omission",
        });
      }
    }

    // Check for conflicting requests
    if (/terminate.*support/i.test(content) && /reserve.*jurisdiction/i.test(content)) {
      findings.push({
        id: `P4-${generateId().slice(0, 8)}`,
        passNumber: 4,
        passName: "Substantive Audit",
        severity: "CRITICAL",
        finding: "Document appears to simultaneously request termination of support AND reserve jurisdiction — these are contradictory.",
        recommendation: "Choose one: terminate (permanent, irreversible) OR reserve jurisdiction (preserves future right). Termination cannot be undone.",
        statutoryBasis: "FAM §4336",
        type: "Internal_Inconsistency",
      });
    }

    // Check for residency issues in dissolution
    if (classification.documentType === "petition") {
      const hasResidency = /resid(?:ent|ency)|lived in california|6 months|3 months/i.test(content);
      if (!hasResidency) {
        findings.push({
          id: `P4-${generateId().slice(0, 8)}`,
          passNumber: 4,
          passName: "Substantive Audit",
          severity: "HIGH",
          finding: "No residency allegation found. Dissolution petition requires at least one party to have lived in California 6 months and in the filing county 3 months.",
          recommendation: "Include residency declaration as required by FAM §2320.",
          statutoryBasis: "FAM §2320",
          type: "Omission",
        });
      }
    }

    // DVRO: check for specificity
    if (classification.documentType === "dvro_request") {
      const hasSpecificIncident = /on\s+(?:\w+\s+)?\d{1,2}|on\s+(?:january|february|march|april|may|june|july|august|september|october|november|december)/i.test(content);
      if (!hasSpecificIncident) {
        findings.push({
          id: `P4-${generateId().slice(0, 8)}`,
          passNumber: 4,
          passName: "Substantive Audit",
          severity: "HIGH",
          finding: "DVRO request lacks specific incident dates. Courts require specific factual allegations with dates to grant a restraining order.",
          recommendation: "Describe at least one specific incident with the date, time, and location.",
          statutoryBasis: "FAM §6300",
          type: "Omission",
        });
      }
    }

    // Check for mandatory attachments
    if (classification.documentType === "motion" || classification.documentType === "ex_parte") {
      if (/custody|visitation/i.test(content) && !/fl-311/i.test(content)) {
        findings.push({
          id: `P4-${generateId().slice(0, 8)}`,
          passNumber: 4,
          passName: "Substantive Audit",
          severity: "MEDIUM",
          finding: "Custody/visitation request detected but no reference to FL-311 (Custody Application Attachment).",
          recommendation: "Attach FL-311 with detailed custody and visitation plan.",
          statutoryBasis: "CRC 5.210",
          type: "Omission",
        });
      }
    }

    return findings;
  }

  // ─── PASS 5: Bias & Fraud Detection ─────────────────────────────────────────
  private detectBiasAndFraud(
    content: string,
    _classification: DocumentClassification,
    priorFindings: AuditFinding[]
  ): AuditFinding[] {
    const findings: AuditFinding[] = [];
    const normalized = normalizeContent(content).toLowerCase();

    // Pattern: Repetitive unsupported allegations
    const repetitionPatterns = [
      /\b(always|never|every time|constantly|repeatedly)\b/gi,
    ];
    let hyperboleCount = 0;
    for (const pattern of repetitionPatterns) {
      const matches = content.match(pattern);
      if (matches) hyperboleCount += matches.length;
    }
    if (hyperboleCount > 5) {
      findings.push({
        id: `P5-${generateId().slice(0, 8)}`,
        passNumber: 5,
        passName: "Bias & Fraud Detection",
        severity: "MEDIUM",
        finding: `Document uses ${hyperboleCount} absolute/hyperbolic terms (always, never, every time, constantly). This pattern can indicate asymmetric framing rather than factual reporting.`,
        recommendation: "Replace absolute language with specific factual statements. 'He always threatens me' should become 'On [date], he threatened me by [specific action].'",
        statutoryBasis: "",
        type: "Asymmetric_Framing",
      });
    }

    // Pattern: One-sided presentation in custody matters
    if (/custody|visitation/i.test(content)) {
      const negativeAboutOther = (content.match(/(?:other parent|father|mother|respondent|petitioner)\s+(?:is|was|has been|never|always|fails|refuses|cannot|does not)/gi) || []).length;
      const positiveAboutSelf = (content.match(/(?:i am|i have|i provide|i ensure|my home|my care|i always)/gi) || []).length;

      if (negativeAboutOther > 5 && positiveAboutSelf > 3) {
        findings.push({
          id: `P5-${generateId().slice(0, 8)}`,
          passNumber: 5,
          passName: "Bias & Fraud Detection",
          severity: "MEDIUM",
          finding: "Document shows pattern of systematic negative characterization of the other party combined with self-promotion. Courts look for balanced, fact-based presentations.",
          recommendation: "Focus on specific incidents and the child's needs rather than character attacks. Courts apply the best interest standard, not parental competition.",
          statutoryBasis: "FAM §3011",
          type: "Asymmetric_Framing",
        });
      }
    }

    // Pattern: Date anomalies
    const creationDateMatch = content.match(/(?:dated?|signed?)\s*:?\s*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i);
    const filingDateMatch = content.match(/(?:filed?|received?)\s*:?\s*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i);
    if (creationDateMatch && filingDateMatch) {
      // Basic check: filing date should be on or after creation date
      // (In a full implementation, parse and compare dates)
      findings.push({
        id: `P5-${generateId().slice(0, 8)}`,
        passNumber: 5,
        passName: "Bias & Fraud Detection",
        severity: "INFO",
        finding: `Document dated ${creationDateMatch[1]}, filing date ${filingDateMatch[1]}. Verify dates are consistent.`,
        recommendation: "Ensure the document was not backdated or modified after initial creation.",
        statutoryBasis: "",
        type: "Authenticity",
      });
    }

    // Pattern: Coordination indicators
    if (/identical language|same attorney|copied from|substantially similar/i.test(content)) {
      findings.push({
        id: `P5-${generateId().slice(0, 8)}`,
        passNumber: 5,
        passName: "Bias & Fraud Detection",
        severity: "LOW",
        finding: "Language patterns suggest possible coordination or template usage.",
        recommendation: "Review for improper coordination between nominally independent filings.",
        statutoryBasis: "",
        type: "Coordination",
      });
    }

    // Check if prior passes found misrepresentations
    const criticalFindings = priorFindings.filter(f => f.severity === "CRITICAL");
    if (criticalFindings.length >= 3) {
      findings.push({
        id: `P5-${generateId().slice(0, 8)}`,
        passNumber: 5,
        passName: "Bias & Fraud Detection",
        severity: "HIGH",
        finding: `Document has ${criticalFindings.length} critical defects across audit passes. The concentration of defects may indicate careless preparation, or the document may not be what it purports to be.`,
        recommendation: "Conduct manual review of the document's authenticity and preparation circumstances.",
        statutoryBasis: "",
        type: "Pattern_Analysis",
      });
    }

    return findings;
  }

  // ─── PASS 6: Risk Scoring ───────────────────────────────────────────────────
  private calculateRiskScore(allFindings: AuditFinding[]): { score: number; rating: string } {
    let score = 100;

    for (const finding of allFindings) {
      switch (finding.severity) {
        case "CRITICAL":
          score -= 20;
          break;
        case "HIGH":
          score -= 12;
          break;
        case "MEDIUM":
          score -= 6;
          break;
        case "LOW":
          score -= 3;
          break;
        case "INFO":
          score -= 1;
          break;
      }
    }

    // Clamp to 0-100
    score = Math.max(0, Math.min(100, score));

    let rating: string;
    if (score >= 80) rating = "COMPLIANT";
    else if (score >= 50) rating = "DEFECTIVE";
    else if (score >= 30) rating = "MATERIALLY_DEFECTIVE";
    else rating = "POTENTIALLY_FRAUDULENT";

    return { score, rating };
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // MAIN ENTRY POINT
  // ═══════════════════════════════════════════════════════════════════════════════

  async auditDocument(
    documentType: string,
    content: string,
    env: Env
  ): Promise<AuditResult> {
    const auditId = generateId();
    const createdAt = new Date().toISOString();
    const allFindings: AuditFinding[] = [];
    let passesCompleted = 0;

    // Create audit record
    try {
      await env.DB.prepare(
        `INSERT INTO document_audits (id, document_type, audit_status, created_at)
         VALUES (?, ?, 'IN_PROGRESS', ?)`
      ).bind(auditId, documentType, createdAt).run();
    } catch {
      // Table may not exist yet — continue without persistence
    }

    // ── PASS 1: Document Classification ──
    const { classification, findings: classFindings } = this.classifyDocument(content);
    allFindings.push(...classFindings);
    passesCompleted = 1;

    // ── PASS 2: Statutory Retrieval ──
    const { findings: statFindings } = await this.retrieveStatutes(classification, env);
    allFindings.push(...statFindings);
    passesCompleted = 2;

    // ── PASS 3: Procedural Compliance ──
    const procFindings = this.checkProceduralCompliance(content, classification);
    allFindings.push(...procFindings);
    passesCompleted = 3;

    // ── PASS 4: Substantive Audit ──
    const subFindings = this.auditSubstance(content, classification);
    allFindings.push(...subFindings);
    passesCompleted = 4;

    // ── PASS 5: Bias & Fraud Detection ──
    const biasFindings = this.detectBiasAndFraud(content, classification, allFindings);
    allFindings.push(...biasFindings);
    passesCompleted = 5;

    // ── PASS 6: Risk Scoring ──
    const { score, rating } = this.calculateRiskScore(allFindings);
    passesCompleted = 6;

    const completedAt = new Date().toISOString();

    // Build summary
    const criticalCount = allFindings.filter(f => f.severity === "CRITICAL").length;
    const highCount = allFindings.filter(f => f.severity === "HIGH").length;
    const summary = `${classification.documentTypeLabel} — ${rating} (${score}/100). ` +
      `${allFindings.length} findings: ${criticalCount} critical, ${highCount} high. ` +
      `Jurisdiction: ${classification.jurisdiction}.`;

    // Persist findings
    try {
      await env.DB.prepare(
        `UPDATE document_audits SET
          audit_status = 'COMPLETED',
          passes_completed = ?,
          findings = ?,
          risk_score = ?,
          completed_at = ?
         WHERE id = ?`
      ).bind(
        passesCompleted,
        JSON.stringify(allFindings),
        score,
        completedAt,
        auditId
      ).run();

      // Insert individual findings
      for (const finding of allFindings) {
        await env.DB.prepare(
          `INSERT INTO audit_findings (id, audit_id, pass_number, pass_name, severity, finding, recommendation, statutory_basis, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(
          finding.id,
          auditId,
          finding.passNumber,
          finding.passName,
          finding.severity,
          finding.finding,
          finding.recommendation,
          finding.statutoryBasis,
          createdAt
        ).run();
      }
    } catch {
      // Persistence failure is non-fatal — return results anyway
    }

    return {
      id: auditId,
      documentType: classification.documentTypeLabel,
      status: "COMPLETED",
      passesCompleted,
      totalPasses: 6,
      findings: allFindings,
      riskScore: score,
      riskRating: rating,
      classification,
      summary,
      createdAt,
      completedAt,
    };
  }
}

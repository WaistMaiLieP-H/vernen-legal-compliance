/**
 * execution-engine.ts — The Execution Engine
 *
 * Takes a document + assembled review team and runs the audit.
 * Each team member evaluates the document from their perspective.
 * Detection rules fire. Cross-perspective rules compare findings.
 * Output is a merged audit report with attributed findings.
 *
 * This is the bridge between architecture and autonomous operation.
 * Without this, a human reads every page. With this, the system
 * does the heavy lifting and the human reviews the output.
 */

import { generateId } from "../utils/helpers.js";
import type {
  ReviewTeam,
  TeamMember,
  DocumentCharacter,
  PerspectiveFinding,
  DecomposedAudit,
  CharacterTimelineEntry,
  CrossPerspectiveRule,
} from "./character-decomposition.js";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Raw content extracted from a document */
export interface DocumentContent {
  id: string;
  sourceFile: string;
  documentType: string;
  documentDate: string;
  jurisdiction: string;
  agency?: string;
  caseNumber?: string;

  /** All text content, page by page */
  pages: PageContent[];

  /** All persons mentioned (feeds into character extraction) */
  persons: PersonMention[];

  /** All events mentioned (feeds into timeline + shadow detection) */
  events: EventMention[];

  /** All statements made by parties (feeds into narrative tracking) */
  statements: StatementRecord[];

  /** All evidence referenced (feeds into evidence tracking) */
  evidenceItems: EvidenceItem[];

  /** All dates/times mentioned (feeds into temporal verification) */
  timestamps: TimestampRecord[];

  /** Metadata from document structure */
  metadata: Record<string, string>;
}

export interface PageContent {
  pageNumber: number;
  rawText: string;
  fields: Record<string, string>;  // Structured fields extracted
}

export interface PersonMention {
  name: string;
  role: string;
  designation?: string;
  agency?: string;
  badgeOrId?: string;
  firstMentionPage: number;
  attributes: Record<string, string>;
}

export interface EventMention {
  description: string;
  date?: string;
  time?: string;
  location?: string;
  participants: string[];         // Names of people involved
  sourcePage: number;
  sourceStatement?: string;       // Who mentioned this event
  hasCorrespondingRecord: boolean | null;  // null = unknown, check needed
}

export interface StatementRecord {
  speaker: string;                // Who made the statement
  speakerRole: string;            // Their role (victim, suspect, officer, etc.)
  content: string;                // What they said
  context: string;                // Where/when they said it
  sourcePage: number;
  paraphrasedBy?: string;         // If officer paraphrased, who
  directQuote: boolean;           // Was it quoted directly or summarized
}

export interface EvidenceItem {
  description: string;
  type: string;                   // Photo, document, weapon, clothing, etc.
  collected: boolean;
  collectedBy?: string;
  propertyNumber?: string;
  sourcePage: number;
}

export interface TimestampRecord {
  timestamp: string;
  event: string;
  sourcePage: number;
  source: string;                 // CAD, officer narrative, face sheet, etc.
}

// ---------------------------------------------------------------------------
// Detection Rule Evaluation
// ---------------------------------------------------------------------------

export interface DetectionRule {
  id: string;
  ruleName: string;
  ruleDescription: string;
  severity: string;
  triggerConditions: string[];
  findingTemplate: string;
  governingStandard: string;
}

/**
 * Evaluate a single detection rule against document content.
 * Returns a finding if the rule fires, null if it doesn't.
 */
function evaluateRule(
  rule: DetectionRule,
  content: DocumentContent,
  priorDocuments: DocumentContent[],
): PerspectiveFinding | null {
  const conditions = rule.triggerConditions;
  const allContent = [content, ...priorDocuments];

  for (const condition of conditions) {
    switch (condition) {
      case "same_person_name_or_dob_match": {
        // Check if any person in current doc appears in prior docs with different role
        // This is handled by ROLE_REVERSAL check below
        break;
      }
      case "same_address": {
        const currentAddr = content.metadata.address || "";
        const priorAddrs = priorDocuments.map(d => d.metadata.address || "");
        if (!priorAddrs.some(a => a && a === currentAddr)) return null;
        break;
      }
      case "role_in_report_a != role_in_report_b": {
        // Check for role reversal
        let found = false;
        for (const person of content.persons) {
          for (const prior of priorDocuments) {
            const match = prior.persons.find(p =>
              p.name.toLowerCase() === person.name.toLowerCase() ||
              (p.attributes.dob && p.attributes.dob === person.attributes.dob)
            );
            if (match && match.role.toLowerCase() !== person.role.toLowerCase()) {
              found = true;
            }
          }
        }
        if (!found) return null;
        break;
      }
      case "dv_report_filed": {
        if (!content.documentType.toLowerCase().includes("domestic") &&
            !content.documentType.toLowerCase().includes("dv")) return null;
        break;
      }
      case "reporting_party_served_with_court_order_within_72hrs": {
        // Check if any event mentions service of court order within 72 hours of report date
        const reportDate = new Date(content.documentDate);
        let served = false;
        for (const event of content.events) {
          if (event.description.toLowerCase().includes("served") &&
              event.description.toLowerCase().includes("restraining") ||
              event.description.toLowerCase().includes("order")) {
            if (event.date) {
              const serviceDate = new Date(event.date);
              const hoursDiff = Math.abs(reportDate.getTime() - serviceDate.getTime()) / (1000 * 60 * 60);
              if (hoursDiff <= 72) served = true;
            }
          }
        }
        if (!served) return null;
        break;
      }
      case "delay_between_alleged_incident_and_report > 48hrs": {
        const reportDate = new Date(content.documentDate);
        const incidentDate = content.metadata.incidentDate ? new Date(content.metadata.incidentDate) : null;
        if (!incidentDate) break; // Can't evaluate, skip condition
        const hoursDiff = (reportDate.getTime() - incidentDate.getTime()) / (1000 * 60 * 60);
        if (hoursDiff <= 48) return null;
        break;
      }
      case "shadow_incident_exists": {
        const shadows = content.events.filter(e => e.hasCorrespondingRecord === false);
        if (shadows.length === 0) return null;
        break;
      }
      case "later_document_contains_party_admission_confirming_event": {
        // Check if current document has a statement confirming a shadow incident from prior docs
        let confirmed = false;
        for (const prior of priorDocuments) {
          const shadows = prior.events.filter(e => e.hasCorrespondingRecord === false);
          for (const shadow of shadows) {
            for (const stmt of content.statements) {
              if (stmt.content.toLowerCase().includes(shadow.description.toLowerCase().substring(0, 30))) {
                confirmed = true;
              }
            }
          }
        }
        if (!confirmed) return null;
        break;
      }
      default:
        // Unknown condition — skip (don't block rule from firing)
        break;
    }
  }

  // All conditions passed — rule fires
  return {
    id: generateId("finding"),
    teamMemberId: "detection-rule",
    characterName: "SYSTEM",
    characterRole: "Detection Rule Library",
    personaName: "Detection Rule: " + rule.ruleName,
    findingText: rule.findingTemplate,
    severity: rule.severity as PerspectiveFinding["severity"],
    standardCited: rule.governingStandard,
    perspective: `Detection Rule ${rule.ruleName}: ${rule.ruleDescription}`,
    detectionRuleId: rule.id,
  };
}

// ---------------------------------------------------------------------------
// Perspective Audit
// ---------------------------------------------------------------------------

/**
 * Run a single team member's audit against the document.
 * Each team member evaluates from their character's perspective.
 */
function runPerspectiveAudit(
  member: TeamMember,
  content: DocumentContent,
  priorDocuments: DocumentContent[],
): PerspectiveFinding[] {
  const findings: PerspectiveFinding[] = [];

  // Check each audit question
  for (const question of member.auditQuestions) {
    const finding = evaluateQuestion(member, question, content, priorDocuments);
    if (finding) findings.push(finding);
  }

  return findings;
}

/**
 * Evaluate a single audit question from a team member's perspective.
 */
function evaluateQuestion(
  member: TeamMember,
  question: string,
  content: DocumentContent,
  priorDocuments: DocumentContent[],
): PerspectiveFinding | null {
  const q = question.toLowerCase();

  // --- STATEMENT ACCURACY CHECK ---
  if (q.includes("statement") && q.includes("accurate")) {
    // Find statements by this member's character
    const charStatements = content.statements.filter(s =>
      s.speaker.toLowerCase().includes(member.characterName.toLowerCase().split(",")[0])
    );
    for (const stmt of charStatements) {
      if (stmt.paraphrasedBy && !stmt.directQuote) {
        return {
          id: generateId("finding"),
          teamMemberId: member.characterId,
          characterName: member.characterName,
          characterRole: member.characterRole,
          personaName: member.personaName,
          findingText: `Statement by ${stmt.speaker} was paraphrased by ${stmt.paraphrasedBy}, not directly quoted. Original meaning may have been altered. Statement: "${stmt.content}"`,
          severity: "HIGH",
          standardCited: "PC 13519(c)(10) — accurate documentation of statements",
          perspective: member.perspective,
        };
      }
    }
  }

  // --- PRIOR CONTACTS CHECK ---
  if (q.includes("prior contact") || q.includes("prior history") || q.includes("search")) {
    // Check if the report documents a prior contact search
    const hasSearch = content.pages.some(p =>
      p.rawText.toLowerCase().includes("prior") &&
      (p.rawText.toLowerCase().includes("contact") || p.rawText.toLowerCase().includes("history") || p.rawText.toLowerCase().includes("incident"))
    );
    const priorFieldValue = content.metadata.priorIncidents || "";
    if (priorFieldValue.toLowerCase() === "none" && priorDocuments.length > 0) {
      // There ARE prior documents but report says none
      return {
        id: generateId("finding"),
        teamMemberId: member.characterId,
        characterName: member.characterName,
        characterRole: member.characterRole,
        personaName: member.personaName,
        findingText: `Report states "Previous Incidents: None" but ${priorDocuments.length} prior document(s) exist in the case file involving the same parties at the same address. Officer ${member.characterName} either failed to search prior contacts or omitted known history.`,
        severity: "CRITICAL",
        standardCited: "PC 13701(b) — mandatory DV history consideration; PC 13730 — DV call documentation",
        perspective: member.perspective,
      };
    }
  }

  // --- CANRA / CHILD SAFETY CHECK ---
  if (q.includes("canra") || q.includes("child safety") || q.includes("cps")) {
    const childPresent = content.persons.some(p =>
      p.role.toLowerCase().includes("child") ||
      p.role.toLowerCase().includes("minor") ||
      p.role.toLowerCase().includes("infant") ||
      p.role.toLowerCase().includes("baby")
    );
    if (childPresent) {
      const hasCPSRef = content.pages.some(p =>
        p.rawText.toLowerCase().includes("cps") ||
        p.rawText.toLowerCase().includes("child protective") ||
        p.rawText.toLowerCase().includes("canra") ||
        p.rawText.toLowerCase().includes("mandated report")
      );
      if (!hasCPSRef) {
        return {
          id: generateId("finding"),
          teamMemberId: member.characterId,
          characterName: member.characterName,
          characterRole: member.characterRole,
          personaName: member.personaName,
          findingText: `Child (${content.persons.find(p => p.role.toLowerCase().includes("child") || p.role.toLowerCase().includes("infant"))?.name || "minor"}) was present during domestic violence incident. No CANRA cross-report to CPS is documented. Under PC 11166, peace officers are mandated reporters when a child is present during DV.`,
          severity: "CRITICAL",
          standardCited: "PC 11166 — CANRA mandatory reporting; PC 11165.6 — child abuse definition includes witnessing DV",
          perspective: member.perspective,
        };
      }
    }
  }

  // --- EVIDENCE COLLECTION CHECK ---
  if (q.includes("evidence") && (q.includes("injuries") || q.includes("document") || q.includes("photo"))) {
    const hasPhotos = content.evidenceItems.some(e =>
      e.type.toLowerCase().includes("photo") && e.collected
    );
    const isDV = content.documentType.toLowerCase().includes("domestic") ||
                 content.metadata.incidentType?.toLowerCase().includes("domestic");
    if (isDV && !hasPhotos) {
      return {
        id: generateId("finding"),
        teamMemberId: member.characterId,
        characterName: member.characterName,
        characterRole: member.characterRole,
        personaName: member.personaName,
        findingText: `Domestic violence incident with no photographic evidence collected. POST DV response guidelines require scene and injury documentation regardless of whether visible injuries are present.`,
        severity: "HIGH",
        standardCited: "POST DV Response Guidelines; PC 13701 — evidence documentation",
        perspective: member.perspective,
      };
    }
  }

  // --- SHADOW INCIDENT CHECK ---
  if (q.includes("event") && q.includes("no corresponding record")) {
    const shadows = content.events.filter(e => e.hasCorrespondingRecord === false);
    if (shadows.length > 0) {
      return {
        id: generateId("finding"),
        teamMemberId: member.characterId,
        characterName: member.characterName,
        characterRole: member.characterRole,
        personaName: member.personaName,
        findingText: `${shadows.length} shadow incident(s) detected: ${shadows.map(s => `"${s.description}" (mentioned by ${s.sourceStatement || "unknown"}, page ${s.sourcePage})`).join("; ")}. Event(s) referenced in document but no corresponding official record exists.`,
        severity: "CRITICAL",
        standardCited: "PC 13730 — DV call documentation; Brady v. Maryland — exculpatory evidence preservation",
        perspective: member.perspective,
      };
    }
  }

  // --- SIGNATURE CHECK ---
  if (q.includes("signed") || q.includes("approved")) {
    const unsigned = !content.metadata.reportingOfficerSignature &&
                     !content.metadata.supervisorSignature;
    if (unsigned) {
      return {
        id: generateId("finding"),
        teamMemberId: member.characterId,
        characterName: member.characterName,
        characterRole: member.characterRole,
        personaName: member.personaName,
        findingText: `Report is unsigned. Reporting officer and/or supervisor signature lines are blank. An unsigned report has diminished evidentiary value.`,
        severity: "HIGH",
        standardCited: "POST Learning Domain 20 — Report Writing standards",
        perspective: member.perspective,
      };
    }
  }

  // --- CAD RECONCILIATION CHECK ---
  if (q.includes("cad") && (q.includes("entry") || q.includes("reconcil"))) {
    // Check if a dispatch is referenced but no CAD log is in the evidence
    const dispatchReferenced = content.events.some(e =>
      e.description.toLowerCase().includes("dispatch") ||
      e.description.toLowerCase().includes("911") ||
      e.description.toLowerCase().includes("responded to")
    );
    const cadDocumented = content.evidenceItems.some(e =>
      e.description.toLowerCase().includes("cad") ||
      e.description.toLowerCase().includes("dispatch log")
    );
    if (dispatchReferenced && !cadDocumented) {
      return {
        id: generateId("finding"),
        teamMemberId: member.characterId,
        characterName: member.characterName,
        characterRole: member.characterRole,
        personaName: member.personaName,
        findingText: `Dispatch referenced in report but no CAD log is attached or cross-referenced. Every dispatched call must have a corresponding CAD entry with disposition code.`,
        severity: "MODERATE",
        standardCited: "CAD-to-RMS reconciliation standards; NENA dispatch documentation standards",
        perspective: member.perspective,
      };
    }
  }

  // --- RIGHTS ADVISEMENT CHECK ---
  if (q.includes("rights") && (q.includes("marsy") || q.includes("dv resource") || q.includes("advised"))) {
    const isDV = content.documentType.toLowerCase().includes("domestic");
    const hasAdvisement = content.metadata.dvResourceCardGiven === "Yes" ||
      content.pages.some(p => p.rawText.toLowerCase().includes("resource card"));
    const hasMarsys = content.pages.some(p =>
      p.rawText.toLowerCase().includes("marsy") ||
      p.rawText.toLowerCase().includes("victim rights")
    );
    if (isDV && !hasMarsys) {
      return {
        id: generateId("finding"),
        teamMemberId: member.characterId,
        characterName: member.characterName,
        characterRole: member.characterRole,
        personaName: member.personaName,
        findingText: `No documentation that victim was advised of Marsy's Law rights (CA Constitution Art. I, Section 28(b)). DV resource card noted as given but full rights advisement not documented.`,
        severity: "MODERATE",
        standardCited: "California Constitution Art. I, Section 28(b) — Marsy's Law; PC 13701(c)(9) — mandatory victim notification",
        perspective: member.perspective,
      };
    }
  }

  return null;
}

// ---------------------------------------------------------------------------
// Cross-Perspective Analysis
// ---------------------------------------------------------------------------

/**
 * Run cross-perspective rules that compare findings between team members.
 */
function runCrossPerspective(
  rules: CrossPerspectiveRule[],
  memberFindings: Map<string, PerspectiveFinding[]>,
  content: DocumentContent,
  priorDocuments: DocumentContent[],
): PerspectiveFinding[] {
  const crossFindings: PerspectiveFinding[] = [];

  for (const rule of rules) {
    const findingsA = memberFindings.get(rule.memberA) || [];
    const findingsB = memberFindings.get(rule.memberB) || [];

    if (rule.ruleName === "VICTIM_SUSPECT_DYNAMIC") {
      // Check for role reversal in prior documents
      for (const prior of priorDocuments) {
        for (const person of content.persons) {
          const priorPerson = prior.persons.find(p =>
            p.name.toLowerCase() === person.name.toLowerCase()
          );
          if (priorPerson && priorPerson.role !== person.role) {
            crossFindings.push({
              id: generateId("finding"),
              teamMemberId: "cross-perspective",
              characterName: person.name,
              characterRole: `${priorPerson.role} → ${person.role}`,
              personaName: "Cross-Perspective: VICTIM_SUSPECT_DYNAMIC",
              findingText: `ROLE REVERSAL: ${person.name} was ${priorPerson.role} in ${prior.sourceFile} (${prior.documentDate}) and is now ${person.role} in ${content.sourceFile} (${content.documentDate}). Cross-reference both reports for dominant aggressor determination and retaliatory filing analysis.`,
              severity: "CRITICAL",
              standardCited: "PC 13701(b) — dominant aggressor; Detection Rule rule-001",
              perspective: "Cross-perspective analysis between victim and suspect positions",
            });
          }
        }
      }
    }

    if (rule.ruleName === "CHILD_SAFETY_CROSS_CHECK") {
      // Merge child-related findings from multiple perspectives
      const childFindings = [...findingsA, ...findingsB].filter(f =>
        f.findingText.toLowerCase().includes("child") ||
        f.findingText.toLowerCase().includes("canra") ||
        f.findingText.toLowerCase().includes("minor")
      );
      if (childFindings.length === 0) {
        // No one flagged child safety — that itself is a finding
        const childPresent = content.persons.some(p =>
          p.role.toLowerCase().includes("child") || p.role.toLowerCase().includes("infant")
        );
        if (childPresent) {
          crossFindings.push({
            id: generateId("finding"),
            teamMemberId: "cross-perspective",
            characterName: "Child Safety",
            characterRole: "CROSS_CHECK",
            personaName: "Cross-Perspective: CHILD_SAFETY_CROSS_CHECK",
            findingText: `Child present during incident but no team member produced a child-safety finding. Manual review required to confirm CANRA compliance and child welfare documentation.`,
            severity: "HIGH",
            standardCited: "PC 11166 — CANRA",
            perspective: "Cross-perspective child safety verification",
          });
        }
      }
    }

    if (rule.ruleName === "SHADOW_INCIDENT_CHECK") {
      // Check referenced persons/agencies against actual documents
      const referencedEMTs = content.persons.filter(p =>
        p.role.toLowerCase().includes("emt") ||
        p.role.toLowerCase().includes("paramedic") ||
        p.role.toLowerCase().includes("first responder")
      );
      for (const emt of referencedEMTs) {
        if (emt.attributes.note?.toLowerCase().includes("referenced") ||
            emt.attributes.note?.toLowerCase().includes("not in this report")) {
          crossFindings.push({
            id: generateId("finding"),
            teamMemberId: "cross-perspective",
            characterName: emt.name,
            characterRole: emt.role,
            personaName: "Cross-Perspective: SHADOW_INCIDENT_CHECK",
            findingText: `${emt.name} (${emt.role}) referenced in case context but not documented in this report. If EMTs responded to a call at this address, both a police report and a Pre-hospital Care Report (PCR) should exist. Neither is present.`,
            severity: "CRITICAL",
            standardCited: "PC 13730 — call documentation; WIC 5150.05 — psychiatric evaluation documentation; CAD reconciliation standards",
            perspective: "Cross-perspective: referenced first responders with no corresponding documentation",
          });
        }
      }
    }
  }

  return crossFindings;
}

// ---------------------------------------------------------------------------
// Timeline Construction
// ---------------------------------------------------------------------------

function buildTimeline(
  content: DocumentContent,
  priorDocuments: DocumentContent[],
): CharacterTimelineEntry[] {
  const entries: CharacterTimelineEntry[] = [];

  // Add all timestamps from current document
  for (const ts of content.timestamps) {
    entries.push({
      timestamp: ts.timestamp,
      characterName: ts.source,
      action: ts.event,
      source: `${content.sourceFile} p.${ts.sourcePage}`,
    });
  }

  // Add all events mentioned
  for (const event of content.events) {
    if (event.date) {
      entries.push({
        timestamp: event.date + (event.time ? " " + event.time : ""),
        characterName: event.participants.join(", ") || "Unknown",
        action: event.description,
        source: `${content.sourceFile} p.${event.sourcePage}` +
                (event.sourceStatement ? ` (per ${event.sourceStatement})` : ""),
      });
    }
  }

  // Add timeline entries from prior documents
  for (const prior of priorDocuments) {
    for (const ts of prior.timestamps) {
      entries.push({
        timestamp: ts.timestamp,
        characterName: ts.source,
        action: ts.event,
        source: `${prior.sourceFile} p.${ts.sourcePage}`,
      });
    }
  }

  // Sort chronologically
  entries.sort((a, b) => a.timestamp.localeCompare(b.timestamp));

  return entries;
}

// ---------------------------------------------------------------------------
// Main Execution
// ---------------------------------------------------------------------------

/**
 * Execute the full team audit on a document.
 *
 * 1. Each team member audits from their perspective
 * 2. Detection rules fire
 * 3. Cross-perspective rules compare findings
 * 4. Timeline is constructed
 * 5. Everything merges into a DecomposedAudit
 */
export function executeAudit(
  team: ReviewTeam,
  content: DocumentContent,
  priorDocuments: DocumentContent[],
  detectionRules: DetectionRule[],
): DecomposedAudit {
  // Phase 1: Individual perspective audits
  const memberFindings = new Map<string, PerspectiveFinding[]>();
  const allFindings: PerspectiveFinding[] = [];

  for (const member of team.teamMembers) {
    const findings = runPerspectiveAudit(member, content, priorDocuments);
    memberFindings.set(member.characterId, findings);
    allFindings.push(...findings);
  }

  // Phase 2: Detection rules
  for (const rule of detectionRules) {
    const finding = evaluateRule(rule, content, priorDocuments);
    if (finding) {
      allFindings.push(finding);
    }
  }

  // Phase 3: Cross-perspective analysis
  const crossFindings = runCrossPerspective(
    team.crossPerspectiveRules,
    memberFindings,
    content,
    priorDocuments,
  );

  // Phase 4: Timeline
  const timeline = buildTimeline(content, priorDocuments);

  // Phase 5: Summary
  const criticalCount = [...allFindings, ...crossFindings].filter(f => f.severity === "CRITICAL").length;
  const highCount = [...allFindings, ...crossFindings].filter(f => f.severity === "HIGH").length;
  const totalFindings = allFindings.length + crossFindings.length;

  const summary = `Audit of ${content.sourceFile} (${content.documentType}, ${content.documentDate}): ` +
    `${team.teamMembers.length} perspectives, ${totalFindings} findings ` +
    `(${criticalCount} CRITICAL, ${highCount} HIGH). ` +
    `${team.crossPerspectiveRules.length} cross-perspective rules evaluated. ` +
    `${detectionRules.length} detection rules checked, ` +
    `${allFindings.filter(f => f.detectionRuleId).length} fired. ` +
    `Timeline: ${timeline.length} events.`;

  return {
    id: generateId("audit"),
    documentId: content.id,
    documentType: content.documentType,
    reviewTeam: team,
    findings: allFindings,
    crossPerspectiveFindings: crossFindings,
    characterTimeline: timeline,
    summary,
    generatedAt: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Audit Report Renderer
// ---------------------------------------------------------------------------

/**
 * Render a DecomposedAudit to markdown.
 */
export function renderAuditReport(audit: DecomposedAudit): string {
  const lines: string[] = [];

  lines.push(`# Decomposed Audit Report`);
  lines.push(`## ${audit.documentType} — ${audit.reviewTeam.documentId}`);
  lines.push(``);
  lines.push(`**Generated:** ${audit.generatedAt}`);
  lines.push(`**Team Size:** ${audit.reviewTeam.teamMembers.length} perspectives`);
  lines.push(`**Total Findings:** ${audit.findings.length + audit.crossPerspectiveFindings.length}`);
  lines.push(``);
  lines.push(`---`);
  lines.push(``);
  lines.push(`## Summary`);
  lines.push(``);
  lines.push(audit.summary);
  lines.push(``);

  // Findings by perspective
  lines.push(`## Findings by Perspective`);
  lines.push(``);

  // Group findings by team member
  const byMember = new Map<string, PerspectiveFinding[]>();
  for (const f of audit.findings) {
    const key = f.characterName + " (" + f.characterRole + ")";
    if (!byMember.has(key)) byMember.set(key, []);
    byMember.get(key)!.push(f);
  }

  for (const [memberKey, findings] of byMember) {
    lines.push(`### ${memberKey}`);
    lines.push(`*Persona: ${findings[0].personaName}*`);
    lines.push(``);
    for (const f of findings) {
      lines.push(`**[${f.severity}]** ${f.findingText}`);
      lines.push(`*Standard: ${f.standardCited}*`);
      lines.push(``);
    }
  }

  // Cross-perspective findings
  if (audit.crossPerspectiveFindings.length > 0) {
    lines.push(`## Cross-Perspective Findings`);
    lines.push(``);
    for (const f of audit.crossPerspectiveFindings) {
      lines.push(`### ${f.personaName}`);
      lines.push(`**[${f.severity}]** ${f.findingText}`);
      lines.push(`*Standard: ${f.standardCited}*`);
      lines.push(``);
    }
  }

  // Timeline
  if (audit.characterTimeline.length > 0) {
    lines.push(`## Character Timeline`);
    lines.push(``);
    lines.push(`| Time | Who | Action | Source |`);
    lines.push(`|---|---|---|---|`);
    for (const entry of audit.characterTimeline) {
      lines.push(`| ${entry.timestamp} | ${entry.characterName} | ${entry.action} | ${entry.source} |`);
    }
    lines.push(``);
  }

  lines.push(`---`);
  lines.push(`*Generated by Vernen Legal Compliance — Character Decomposition Engine*`);

  return lines.join("\n");
}

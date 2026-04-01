/**
 * pipeline-runner.ts — End-to-End Audit Pipeline
 *
 * Takes a folder path containing case documents.
 * Processes each document through the full stack:
 * 1. Document Extractor → structured content
 * 2. Character Decomposition → review team assembly
 * 3. Execution Engine → perspective audits + detection rules
 * 4. Shadow Incident Verification → cross-document gap detection
 * 5. Merged Report → findings with attribution
 *
 * Processes documents chronologically. Each document has access
 * to all prior documents for cross-reference and pattern detection.
 */

import { generateId } from "../utils/helpers.js";
import { extractDocumentContent, verifyShadowIncidents } from "./document-extractor.js";
import { extractCharacters, assembleTeam, teamSummary } from "./character-decomposition.js";
import { executeAudit, renderAuditReport } from "./execution-engine.js";
import type { DocumentContent, DetectionRule } from "./execution-engine.js";
import type { DecomposedAudit } from "./character-decomposition.js";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PipelineConfig {
  caseName: string;
  folderPath: string;
  startDate?: string;     // Process documents from this date
  endDate?: string;       // Process documents through this date
  detectionRules: DetectionRule[];
  outputPath: string;
}

export interface PipelineResult {
  id: string;
  caseName: string;
  documentsProcessed: number;
  documentsSkipped: number;
  totalFindings: number;
  criticalFindings: number;
  highFindings: number;
  shadowIncidents: number;
  detectionRulesFired: number;
  crossPerspectiveFindings: number;
  audits: DecomposedAudit[];
  masterTimeline: Array<{ timestamp: string; who: string; action: string; source: string }>;
  shadowIncidentRegister: Array<{ event: string; source: string; status: string }>;
  narrativeRegisters: {
    christina: Array<{ date: string; document: string; claim: string; verified: string }>;
    michael: Array<{ date: string; document: string; claim: string; verified: string }>;
  };
  generatedAt: string;
}

// ---------------------------------------------------------------------------
// Pipeline Execution
// ---------------------------------------------------------------------------

/**
 * Run the full audit pipeline on a case folder.
 *
 * In a production implementation, this would:
 * 1. Scan the folder for all PDFs and images
 * 2. OCR any images to extract text
 * 3. Extract text from PDFs
 * 4. Process each document through the full stack
 *
 * For now, it accepts pre-extracted document content
 * and runs the audit pipeline on each.
 */
export function runPipeline(
  config: PipelineConfig,
  documents: DocumentContent[],
): PipelineResult {
  // Sort documents chronologically
  const sorted = [...documents].sort((a, b) =>
    a.documentDate.localeCompare(b.documentDate)
  );

  // Phase 0: Cross-reference shadow incidents across all documents
  verifyShadowIncidents(sorted);

  const audits: DecomposedAudit[] = [];
  const processedDocs: DocumentContent[] = [];
  let totalFindings = 0;
  let criticalFindings = 0;
  let highFindings = 0;
  let shadowIncidents = 0;
  let rulesFired = 0;
  let crossFindings = 0;

  // Process each document in chronological order
  for (const doc of sorted) {
    // Step 1: Extract characters from the document
    const rawChars = doc.persons.map(p => ({
      name: p.name,
      role: p.role,
      designation: p.designation,
      agency: p.agency,
      badgeOrId: p.badgeOrId,
      metadata: p.attributes,
    }));

    const characters = extractCharacters(rawChars);

    // Step 2: Assemble review team
    const team = assembleTeam(doc.id, doc.documentType, characters);

    // Step 3: Execute audit with all prior documents available
    const audit = executeAudit(team, doc, processedDocs, config.detectionRules);

    // Track statistics
    const allFindings = [...audit.findings, ...audit.crossPerspectiveFindings];
    totalFindings += allFindings.length;
    criticalFindings += allFindings.filter(f => f.severity === "CRITICAL").length;
    highFindings += allFindings.filter(f => f.severity === "HIGH").length;
    rulesFired += audit.findings.filter(f => f.detectionRuleId).length;
    crossFindings += audit.crossPerspectiveFindings.length;

    // Count shadow incidents
    const shadows = doc.events.filter(e => e.hasCorrespondingRecord === false);
    shadowIncidents += shadows.length;

    audits.push(audit);
    processedDocs.push(doc);
  }

  // Build master timeline from all audits
  const masterTimeline: PipelineResult["masterTimeline"] = [];
  for (const audit of audits) {
    for (const entry of audit.characterTimeline) {
      masterTimeline.push({
        timestamp: entry.timestamp,
        who: entry.characterName,
        action: entry.action,
        source: entry.source,
      });
    }
  }
  masterTimeline.sort((a, b) => a.timestamp.localeCompare(b.timestamp));

  // Build shadow incident register
  const shadowRegister: PipelineResult["shadowIncidentRegister"] = [];
  for (const doc of sorted) {
    for (const event of doc.events) {
      if (event.hasCorrespondingRecord === false) {
        shadowRegister.push({
          event: event.description,
          source: `${doc.sourceFile} p.${event.sourcePage}` +
                  (event.sourceStatement ? ` (per ${event.sourceStatement})` : ""),
          status: "NO CORRESPONDING RECORD — SHADOW INCIDENT",
        });
      }
    }
  }

  // Build narrative registers (Christina and Michael tracking)
  const christinaRegister: PipelineResult["narrativeRegisters"]["christina"] = [];
  const michaelRegister: PipelineResult["narrativeRegisters"]["michael"] = [];

  for (const doc of sorted) {
    for (const stmt of doc.statements) {
      const entry = {
        date: doc.documentDate,
        document: doc.sourceFile,
        claim: stmt.content,
        verified: stmt.directQuote ? "Direct quote" : "Paraphrased by " + (stmt.paraphrasedBy || "officer"),
      };

      if (stmt.speaker.toLowerCase().includes("christina") ||
          stmt.speaker.toLowerCase().includes("cerretani") ||
          stmt.speaker === "S-1") {
        christinaRegister.push(entry);
      }
      if (stmt.speaker.toLowerCase().includes("michael") ||
          stmt.speaker.toLowerCase().includes("hartmann") ||
          stmt.speaker === "V-1") {
        michaelRegister.push(entry);
      }
    }
  }

  return {
    id: generateId("pipeline"),
    caseName: config.caseName,
    documentsProcessed: sorted.length,
    documentsSkipped: 0,
    totalFindings,
    criticalFindings,
    highFindings,
    shadowIncidents,
    detectionRulesFired: rulesFired,
    crossPerspectiveFindings: crossFindings,
    audits,
    masterTimeline,
    shadowIncidentRegister: shadowRegister,
    narrativeRegisters: {
      christina: christinaRegister,
      michael: michaelRegister,
    },
    generatedAt: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Pipeline Report Renderer
// ---------------------------------------------------------------------------

export function renderPipelineReport(result: PipelineResult): string {
  const lines: string[] = [];

  lines.push(`# FORENSIC NARRATIVE AUDIT — PIPELINE REPORT`);
  lines.push(`## Case: ${result.caseName}`);
  lines.push(``);
  lines.push(`**Generated:** ${result.generatedAt}`);
  lines.push(`**Documents Processed:** ${result.documentsProcessed}`);
  lines.push(`**Total Findings:** ${result.totalFindings} (${result.criticalFindings} CRITICAL, ${result.highFindings} HIGH)`);
  lines.push(`**Shadow Incidents:** ${result.shadowIncidents}`);
  lines.push(`**Detection Rules Fired:** ${result.detectionRulesFired}`);
  lines.push(`**Cross-Perspective Findings:** ${result.crossPerspectiveFindings}`);
  lines.push(``);
  lines.push(`---`);

  // Shadow Incident Register
  if (result.shadowIncidentRegister.length > 0) {
    lines.push(``);
    lines.push(`## Shadow Incident Register`);
    lines.push(``);
    lines.push(`| # | Event | Source | Status |`);
    lines.push(`|---|---|---|---|`);
    result.shadowIncidentRegister.forEach((si, i) => {
      lines.push(`| SI-${String(i + 1).padStart(3, "0")} | ${si.event} | ${si.source} | ${si.status} |`);
    });
    lines.push(``);
  }

  // Narrative Registers
  if (result.narrativeRegisters.christina.length > 0) {
    lines.push(`## Christina Register`);
    lines.push(``);
    lines.push(`| Date | Document | Claim | Verification |`);
    lines.push(`|---|---|---|---|`);
    for (const entry of result.narrativeRegisters.christina) {
      lines.push(`| ${entry.date} | ${entry.document} | ${entry.claim.substring(0, 100)}... | ${entry.verified} |`);
    }
    lines.push(``);
  }

  if (result.narrativeRegisters.michael.length > 0) {
    lines.push(`## Michael Register`);
    lines.push(``);
    lines.push(`| Date | Document | Claim | Verification |`);
    lines.push(`|---|---|---|---|`);
    for (const entry of result.narrativeRegisters.michael) {
      lines.push(`| ${entry.date} | ${entry.document} | ${entry.claim.substring(0, 100)}... | ${entry.verified} |`);
    }
    lines.push(``);
  }

  // Master Timeline
  if (result.masterTimeline.length > 0) {
    lines.push(`## Master Timeline`);
    lines.push(``);
    lines.push(`| Timestamp | Who | Action | Source |`);
    lines.push(`|---|---|---|---|`);
    for (const entry of result.masterTimeline) {
      lines.push(`| ${entry.timestamp} | ${entry.who} | ${entry.action.substring(0, 80)} | ${entry.source} |`);
    }
    lines.push(``);
  }

  // Individual Audit Summaries
  lines.push(`## Document Audits`);
  lines.push(``);
  for (const audit of result.audits) {
    const findingCount = audit.findings.length + audit.crossPerspectiveFindings.length;
    const critCount = [...audit.findings, ...audit.crossPerspectiveFindings].filter(f => f.severity === "CRITICAL").length;
    lines.push(`### ${audit.documentType} (${audit.reviewTeam.documentId})`);
    lines.push(`**Findings:** ${findingCount} (${critCount} CRITICAL) | **Team:** ${audit.reviewTeam.teamMembers.length} perspectives`);
    lines.push(``);

    for (const f of [...audit.findings, ...audit.crossPerspectiveFindings]) {
      lines.push(`- **[${f.severity}]** (${f.personaName}) ${f.findingText.substring(0, 150)}...`);
    }
    lines.push(``);
  }

  lines.push(`---`);
  lines.push(`*Generated by Vernen Legal Compliance — Forensic Narrative Audit Pipeline*`);
  lines.push(`*Character Decomposition Engine + Execution Engine + Detection Rule Library*`);

  return lines.join("\n");
}

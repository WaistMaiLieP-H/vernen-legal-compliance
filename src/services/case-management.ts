/**
 * case-management.ts — Case Management Engine
 *
 * Groups documents into cases. Every new document triggers cross-document
 * analysis against all prior documents in the case. The forensic pipeline's
 * real power — shadow incidents, role reversals, narrative contradictions,
 * timeline reconstruction — only fires when documents see each other.
 *
 * Flow:
 *   1. Create case (name, jurisdiction, date range)
 *   2. Add documents (via intake pipeline — each gets individual audit)
 *   3. Cross-analysis runs automatically after each new document
 *   4. Case report aggregates all findings + cross-document discoveries
 */

import type { Env } from "../index.js";
import { generateId, safeKvPut } from "../utils/helpers.js";
import { runIntake } from "./intake-pipeline.js";
import type { IntakeInput, IntakeResult } from "./intake-pipeline.js";
import { extractDocumentContent, verifyShadowIncidents } from "./document-extractor.js";
import { extractCharacters, assembleTeam } from "./character-decomposition.js";
import { executeAudit } from "./execution-engine.js";
import type { DocumentContent } from "./execution-engine.js";
import { DETECTION_RULES } from "../api/forensic.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface CaseRecord {
  id: string;
  name: string;
  jurisdiction: string;
  category: string;
  status: "open" | "closed" | "archived";
  documentCount: number;
  totalFindings: number;
  criticalFindings: number;
  crossDocumentFindings: number;
  shadowIncidents: number;
  createdAt: string;
  updatedAt: string;
}

export interface CaseDocument {
  id: string;
  caseId: string;
  intakeId: string;
  title: string;
  documentType: string | null;
  documentDate: string | null;
  jurisdiction: string | null;
  findings: number;
  criticalFindings: number;
  addedAt: string;
}

export interface CrossDocumentFinding {
  id: string;
  caseId: string;
  ruleId: string;
  ruleName: string;
  severity: string;
  description: string;
  sourceDocuments: string[];
  governingStandard: string;
  discoveredAt: string;
}

export interface CaseTimeline {
  entries: Array<{
    timestamp: string;
    who: string;
    action: string;
    source: string;
    documentId: string;
  }>;
}

export interface NarrativeRegister {
  person: string;
  entries: Array<{
    date: string;
    document: string;
    claim: string;
    verified: string;
  }>;
}

export interface CaseReport {
  case: CaseRecord;
  documents: CaseDocument[];
  crossDocumentFindings: CrossDocumentFinding[];
  shadowIncidents: Array<{
    event: string;
    source: string;
    status: string;
  }>;
  timeline: CaseTimeline;
  narrativeRegisters: NarrativeRegister[];
  generatedAt: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// Case CRUD
// ═══════════════════════════════════════════════════════════════════════════

export async function createCase(
  env: Env,
  name: string,
  jurisdiction: string,
  category: string,
): Promise<CaseRecord> {
  const id = generateId("case");
  const now = new Date().toISOString();

  const record: CaseRecord = {
    id,
    name,
    jurisdiction,
    category,
    status: "open",
    documentCount: 0,
    totalFindings: 0,
    criticalFindings: 0,
    crossDocumentFindings: 0,
    shadowIncidents: 0,
    createdAt: now,
    updatedAt: now,
  };

  await env.DB.prepare(
    `INSERT INTO cases (id, name, jurisdiction, category, status, document_count,
     total_findings, critical_findings, cross_document_findings, shadow_incidents,
     created_at, updated_at)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12)`
  ).bind(
    id, name, jurisdiction, category, "open", 0, 0, 0, 0, 0, now, now,
  ).run();

  return record;
}

export async function getCase(env: Env, caseId: string): Promise<CaseRecord | null> {
  const row = await env.DB.prepare(
    `SELECT * FROM cases WHERE id = ?1`
  ).bind(caseId).first<Record<string, unknown>>();

  if (!row) return null;
  return rowToCase(row);
}

export async function listCases(env: Env, status?: string): Promise<CaseRecord[]> {
  const query = status
    ? `SELECT * FROM cases WHERE status = ?1 ORDER BY updated_at DESC LIMIT 100`
    : `SELECT * FROM cases ORDER BY updated_at DESC LIMIT 100`;

  const rows = status
    ? await env.DB.prepare(query).bind(status).all<Record<string, unknown>>()
    : await env.DB.prepare(query).all<Record<string, unknown>>();

  return (rows.results ?? []).map(rowToCase);
}

export async function closeCase(env: Env, caseId: string): Promise<CaseRecord | null> {
  await env.DB.prepare(
    `UPDATE cases SET status = 'closed', updated_at = ?1 WHERE id = ?2`
  ).bind(new Date().toISOString(), caseId).run();
  return getCase(env, caseId);
}

// ═══════════════════════════════════════════════════════════════════════════
// Add Document to Case — triggers cross-document analysis
// ═══════════════════════════════════════════════════════════════════════════

export async function addDocumentToCase(
  env: Env,
  caseId: string,
  input: IntakeInput,
): Promise<{
  intake: IntakeResult;
  crossFindings: CrossDocumentFinding[];
  shadowIncidents: number;
}> {
  // Step 1: Run the intake pipeline on this document
  const intake = await runIntake({ ...input, caseName: caseId }, env);

  // Step 2: Store the case-document link
  const docId = generateId("cdoc");
  const now = new Date().toISOString();

  await env.DB.prepare(
    `INSERT INTO case_documents (id, case_id, intake_id, title, document_type,
     document_date, jurisdiction, findings, critical_findings, added_at)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)`
  ).bind(
    docId,
    caseId,
    intake.id,
    input.title ?? intake.classification?.title ?? "untitled",
    intake.classification?.documentType ?? null,
    intake.classification?.documentDate ?? null,
    intake.classification?.jurisdiction ?? null,
    intake.audit?.totalFindings ?? 0,
    intake.audit?.criticalFindings ?? 0,
    now,
  ).run();

  // Step 3: Get all documents in this case for cross-analysis
  const caseDocRows = await env.DB.prepare(
    `SELECT intake_id FROM case_documents WHERE case_id = ?1 ORDER BY added_at ASC`
  ).bind(caseId).all<{ intake_id: string }>();

  const intakeIds = (caseDocRows.results ?? []).map(r => r.intake_id);

  // Step 4: Reconstruct DocumentContent for all case documents
  const allContents: DocumentContent[] = [];
  for (const iid of intakeIds) {
    const stored = await env.KNOWLEDGE_STORE.get(`INTAKE:${iid}`);
    if (!stored) continue;
    const storedIntake = JSON.parse(stored) as IntakeResult;
    const text = storedIntake.rawText ?? storedIntake.vision?.text ?? "";
    if (text) {
      try {
        const content = extractDocumentContent(
          storedIntake.classification?.title ?? iid,
          text,
          [text],
        );
        allContents.push(content);
      } catch {
        // Skip documents that can't be re-extracted
      }
    }
  }

  // Step 5: Cross-document analysis
  const crossFindings: CrossDocumentFinding[] = [];
  let newShadows = 0;

  if (allContents.length >= 2) {
    // Verify shadow incidents across all documents
    verifyShadowIncidents(allContents);

    // Count new shadow incidents
    for (const doc of allContents) {
      newShadows += doc.events.filter(e => e.hasCorrespondingRecord === false).length;
    }

    // Run cross-document detection rules
    const currentDoc = allContents[allContents.length - 1]!;
    const priorDocs = allContents.slice(0, -1);

    for (const rule of DETECTION_RULES) {
      const chars = currentDoc.persons.map(p => ({
        name: p.name,
        role: p.role,
        designation: p.designation,
        agency: p.agency,
        badgeOrId: p.badgeOrId,
        metadata: p.attributes,
      }));
      const characters = extractCharacters(chars);
      const team = assembleTeam(currentDoc.id, currentDoc.documentType, characters);
      const audit = executeAudit(team, currentDoc, priorDocs, [rule]);

      // Collect findings that specifically involve prior documents
      const crossResults = audit.findings.filter(f => f.detectionRuleId);
      for (const finding of crossResults) {
        const cf: CrossDocumentFinding = {
          id: generateId("xfind"),
          caseId,
          ruleId: rule.id,
          ruleName: rule.ruleName,
          severity: finding.severity,
          description: finding.findingText,
          sourceDocuments: [currentDoc.sourceFile, ...priorDocs.map(p => p.sourceFile)],
          governingStandard: finding.standardCited,
          discoveredAt: now,
        };
        crossFindings.push(cf);

        // Store cross-finding
        await env.DB.prepare(
          `INSERT INTO case_cross_findings (id, case_id, rule_id, rule_name, severity,
           description, source_documents, governing_standard, discovered_at)
           VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)`
        ).bind(
          cf.id, caseId, cf.ruleId, cf.ruleName, cf.severity,
          cf.description, JSON.stringify(cf.sourceDocuments),
          cf.governingStandard, now,
        ).run();
      }
    }
  }

  // Step 6: Update case statistics
  await env.DB.prepare(
    `UPDATE cases SET
       document_count = document_count + 1,
       total_findings = total_findings + ?1,
       critical_findings = critical_findings + ?2,
       cross_document_findings = cross_document_findings + ?3,
       shadow_incidents = ?4,
       updated_at = ?5
     WHERE id = ?6`
  ).bind(
    intake.audit?.totalFindings ?? 0,
    intake.audit?.criticalFindings ?? 0,
    crossFindings.length,
    newShadows,
    now,
    caseId,
  ).run();

  return { intake, crossFindings, shadowIncidents: newShadows };
}

// ═══════════════════════════════════════════════════════════════════════════
// Case Documents
// ═══════════════════════════════════════════════════════════════════════════

export async function getCaseDocuments(env: Env, caseId: string): Promise<CaseDocument[]> {
  const rows = await env.DB.prepare(
    `SELECT * FROM case_documents WHERE case_id = ?1 ORDER BY added_at ASC`
  ).bind(caseId).all<Record<string, unknown>>();

  return (rows.results ?? []).map(r => ({
    id: r.id as string,
    caseId: r.case_id as string,
    intakeId: r.intake_id as string,
    title: r.title as string,
    documentType: r.document_type as string | null,
    documentDate: r.document_date as string | null,
    jurisdiction: r.jurisdiction as string | null,
    findings: r.findings as number,
    criticalFindings: r.critical_findings as number,
    addedAt: r.added_at as string,
  }));
}

// ═══════════════════════════════════════════════════════════════════════════
// Cross-Document Findings
// ═══════════════════════════════════════════════════════════════════════════

export async function getCrossFindings(env: Env, caseId: string): Promise<CrossDocumentFinding[]> {
  const rows = await env.DB.prepare(
    `SELECT * FROM case_cross_findings WHERE case_id = ?1 ORDER BY discovered_at ASC`
  ).bind(caseId).all<Record<string, unknown>>();

  return (rows.results ?? []).map(r => ({
    id: r.id as string,
    caseId: r.case_id as string,
    ruleId: r.rule_id as string,
    ruleName: r.rule_name as string,
    severity: r.severity as string,
    description: r.description as string,
    sourceDocuments: JSON.parse(r.source_documents as string) as string[],
    governingStandard: r.governing_standard as string,
    discoveredAt: r.discovered_at as string,
  }));
}

// ═══════════════════════════════════════════════════════════════════════════
// Case Report — Full Markdown
// ═══════════════════════════════════════════════════════════════════════════

export async function generateCaseReport(env: Env, caseId: string): Promise<string | null> {
  const caseRecord = await getCase(env, caseId);
  if (!caseRecord) return null;

  const docs = await getCaseDocuments(env, caseId);
  const crossFindings = await getCrossFindings(env, caseId);

  // Reconstruct all document contents for timeline + narrative registers
  const allContents: DocumentContent[] = [];
  for (const doc of docs) {
    const stored = await env.KNOWLEDGE_STORE.get(`INTAKE:${doc.intakeId}`);
    if (!stored) continue;
    const storedIntake = JSON.parse(stored) as IntakeResult;
    const text = storedIntake.rawText ?? storedIntake.vision?.text ?? "";
    if (text) {
      try {
        allContents.push(extractDocumentContent(doc.title, text, [text]));
      } catch { /* skip */ }
    }
  }

  // Verify shadow incidents across all documents
  if (allContents.length >= 2) verifyShadowIncidents(allContents);

  // Build master timeline
  const timeline: CaseTimeline = { entries: [] };
  for (const doc of allContents) {
    for (const ts of doc.timestamps) {
      timeline.entries.push({
        timestamp: ts.timestamp,
        who: ts.source,
        action: ts.event,
        source: doc.sourceFile,
        documentId: doc.id,
      });
    }
    for (const event of doc.events) {
      timeline.entries.push({
        timestamp: event.date ?? doc.documentDate,
        who: event.participants.join(", ") || "Unknown",
        action: event.description,
        source: doc.sourceFile,
        documentId: doc.id,
      });
    }
  }
  timeline.entries.sort((a, b) => (a.timestamp ?? "").localeCompare(b.timestamp ?? ""));

  // Build narrative registers per person
  const personStatements = new Map<string, NarrativeRegister["entries"]>();
  for (const doc of allContents) {
    for (const stmt of doc.statements) {
      const key = stmt.speaker.toLowerCase();
      if (!personStatements.has(key)) personStatements.set(key, []);
      personStatements.get(key)!.push({
        date: doc.documentDate,
        document: doc.sourceFile,
        claim: stmt.content,
        verified: stmt.directQuote ? "Direct quote" : `Paraphrased by ${stmt.paraphrasedBy ?? "officer"}`,
      });
    }
  }
  const narrativeRegisters: NarrativeRegister[] = [];
  for (const [person, entries] of personStatements) {
    if (entries.length > 0) {
      narrativeRegisters.push({ person, entries });
    }
  }

  // Shadow incidents
  const shadows: Array<{ event: string; source: string; status: string }> = [];
  for (const doc of allContents) {
    for (const event of doc.events) {
      if (event.hasCorrespondingRecord === false) {
        shadows.push({
          event: event.description,
          source: `${doc.sourceFile} p.${event.sourcePage}`,
          status: "NO CORRESPONDING RECORD",
        });
      }
    }
  }

  // ── Render Markdown ──────────────────────────────────────────────────

  const lines: string[] = [];

  lines.push(`# CASE REPORT: ${caseRecord.name}`);
  lines.push(``);
  lines.push(`**Case ID:** ${caseRecord.id}`);
  lines.push(`**Jurisdiction:** ${caseRecord.jurisdiction}`);
  lines.push(`**Status:** ${caseRecord.status.toUpperCase()}`);
  lines.push(`**Documents:** ${caseRecord.documentCount}`);
  lines.push(`**Generated:** ${new Date().toISOString()}`);
  lines.push(``);

  // Summary box
  lines.push(`## Findings Summary`);
  lines.push(``);
  lines.push(`| Metric | Count |`);
  lines.push(`|--------|-------|`);
  lines.push(`| Total Findings | ${caseRecord.totalFindings} |`);
  lines.push(`| Critical Findings | ${caseRecord.criticalFindings} |`);
  lines.push(`| Cross-Document Findings | ${caseRecord.crossDocumentFindings} |`);
  lines.push(`| Shadow Incidents | ${caseRecord.shadowIncidents} |`);
  lines.push(`| Documents Analyzed | ${caseRecord.documentCount} |`);
  lines.push(``);

  // Document inventory
  lines.push(`## Document Inventory`);
  lines.push(``);
  lines.push(`| # | Title | Type | Date | Findings |`);
  lines.push(`|---|-------|------|------|----------|`);
  docs.forEach((doc, i) => {
    lines.push(`| ${i + 1} | ${doc.title} | ${doc.documentType ?? "—"} | ${doc.documentDate ?? "—"} | ${doc.findings} (${doc.criticalFindings} crit) |`);
  });
  lines.push(``);

  // Cross-document findings
  if (crossFindings.length > 0) {
    lines.push(`## Cross-Document Findings`);
    lines.push(``);
    for (const cf of crossFindings) {
      lines.push(`### [${cf.severity}] ${cf.ruleName}`);
      lines.push(`${cf.description}`);
      lines.push(`**Standard:** ${cf.governingStandard}`);
      lines.push(`**Documents:** ${cf.sourceDocuments.join(", ")}`);
      lines.push(``);
    }
  }

  // Shadow incidents
  if (shadows.length > 0) {
    lines.push(`## Shadow Incident Register`);
    lines.push(``);
    lines.push(`| # | Event | Source | Status |`);
    lines.push(`|---|-------|--------|--------|`);
    shadows.forEach((si, i) => {
      lines.push(`| SI-${String(i + 1).padStart(3, "0")} | ${si.event.substring(0, 100)} | ${si.source} | ${si.status} |`);
    });
    lines.push(``);
  }

  // Narrative registers
  if (narrativeRegisters.length > 0) {
    lines.push(`## Narrative Registers`);
    lines.push(``);
    for (const nr of narrativeRegisters) {
      lines.push(`### ${nr.person}`);
      lines.push(``);
      lines.push(`| Date | Document | Claim | Verification |`);
      lines.push(`|------|----------|-------|--------------|`);
      for (const entry of nr.entries) {
        lines.push(`| ${entry.date} | ${entry.document} | ${entry.claim.substring(0, 80)}... | ${entry.verified} |`);
      }
      lines.push(``);
    }
  }

  // Master timeline
  if (timeline.entries.length > 0) {
    lines.push(`## Master Timeline`);
    lines.push(``);
    lines.push(`| Timestamp | Who | Action | Source |`);
    lines.push(`|-----------|-----|--------|--------|`);
    for (const entry of timeline.entries) {
      lines.push(`| ${entry.timestamp} | ${entry.who} | ${entry.action.substring(0, 80)} | ${entry.source} |`);
    }
    lines.push(``);
  }

  lines.push(`---`);
  lines.push(`*Generated by Vernen Legal Compliance — Case Management Engine*`);
  lines.push(`*Cross-Document Analysis + Shadow Incident Verification + Narrative Tracking*`);

  const report = lines.join("\n");

  // Cache report in KV
  await safeKvPut(env.KNOWLEDGE_STORE, `CASE_REPORT:${caseId}`, report);

  return report;
}

// ═══════════════════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════════════════

function rowToCase(row: Record<string, unknown>): CaseRecord {
  return {
    id: row.id as string,
    name: row.name as string,
    jurisdiction: row.jurisdiction as string,
    category: row.category as string,
    status: row.status as CaseRecord["status"],
    documentCount: row.document_count as number,
    totalFindings: row.total_findings as number,
    criticalFindings: row.critical_findings as number,
    crossDocumentFindings: row.cross_document_findings as number,
    shadowIncidents: row.shadow_incidents as number,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

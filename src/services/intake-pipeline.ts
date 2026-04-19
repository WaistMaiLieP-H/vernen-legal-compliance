/**
 * intake-pipeline.ts — Document Intake Pipeline
 *
 * The single entry point: document in, audit out. No human instruction needed.
 *
 * Flow:
 *   1. Accept raw document (base64 image, plain text, or structured input)
 *   2. Vision extraction (if image) → raw text
 *   3. Classify (ARCHIVIST-0 patterns) → doc type, jurisdiction, category
 *   4. Route (citizen_routing_index) → owning Citizen + skill
 *   5. Extract structured content (document-extractor) → persons, events, statements
 *   6. Decompose characters → review team
 *   7. Execute audit → findings, detection rules, cross-perspective analysis
 *   8. Store result (D1 + KV) with full provenance chain
 *   9. Return complete audit package
 *
 * "The document IS the instruction."
 */

import type { Env } from "../index.js";
import { generateId, safeKvPut } from "../utils/helpers.js";
import { extractTextFromImage, extractStructuredData } from "./document-vision.js";
import type { VisionProcessResult, StructuredDocument } from "./document-vision.js";
import { DocumentFeedEngine } from "./document-feed.js";
import type { FeedProcessResult } from "./document-feed.js";
import { extractDocumentContent } from "./document-extractor.js";
import { extractCharacters, assembleTeam } from "./character-decomposition.js";
import { executeAudit, renderAuditReport } from "./execution-engine.js";
import type { DocumentContent } from "./execution-engine.js";
import { DETECTION_RULES } from "../api/forensic.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface IntakeInput {
  /** Base64-encoded image data (PNG, JPG, TIFF, PDF page) */
  imageBase64?: string;
  /** MIME type of the image (required if imageBase64 provided) */
  imageMimeType?: string;
  /** Raw text content (if already extracted / typed / pasted) */
  text?: string;
  /** Document title or filename */
  title?: string;
  /** Optional override: document type */
  documentType?: string;
  /** Optional override: jurisdiction */
  jurisdiction?: string;
  /** Optional override: category */
  category?: string;
  /** Optional: case name for grouping */
  caseName?: string;
  /** Optional: source identifier */
  source?: string;
}

export interface IntakeStage {
  name: string;
  status: "complete" | "skipped" | "failed";
  durationMs: number;
  detail?: string;
}

export interface IntakeResult {
  id: string;
  status: "complete" | "partial" | "failed";
  stages: IntakeStage[];
  totalDurationMs: number;

  /** Stage 1: Vision extraction (if image provided) */
  vision: {
    text: string;
    confidence: number;
    model: string;
  } | null;

  /** Stage 2: Classification */
  classification: {
    documentType: string;
    jurisdiction: string;
    category: string;
    confidence: number;
    title: string | null;
    caseNumber: string | null;
    documentDate: string | null;
    parties: string[];
    issuingAuthority: string | null;
  } | null;

  /** Stage 3: Citizen routing */
  routing: {
    citizenName: string;
    skillSlug: string;
    priority: number;
  } | null;

  /** Stage 4: Content extraction */
  extraction: {
    persons: number;
    events: number;
    statements: number;
    evidenceItems: number;
    timestamps: number;
    pages: number;
  } | null;

  /** Stage 5: Audit execution */
  audit: {
    auditId: string;
    teamSize: number;
    totalFindings: number;
    criticalFindings: number;
    highFindings: number;
    mediumFindings: number;
    lowFindings: number;
    detectionRulesFired: number;
    crossPerspectiveFindings: number;
  } | null;

  /** Full audit report in markdown */
  report: string | null;

  /** Raw text used for analysis (from vision or direct input) */
  rawText: string;

  /** When this intake was processed */
  processedAt: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// Intake Pipeline
// ═══════════════════════════════════════════════════════════════════════════

export async function runIntake(
  input: IntakeInput,
  env: Env,
): Promise<IntakeResult> {
  const intakeId = generateId("intake");
  const pipelineStart = Date.now();
  const stages: IntakeStage[] = [];
  let rawText = input.text ?? "";
  let visionResult: IntakeResult["vision"] = null;
  let classification: IntakeResult["classification"] = null;
  let routing: IntakeResult["routing"] = null;
  let extractionSummary: IntakeResult["extraction"] = null;
  let auditSummary: IntakeResult["audit"] = null;
  let report: string | null = null;

  // ── Stage 1: Vision extraction ────────────────────────────────────────
  if (input.imageBase64 && input.imageMimeType) {
    const stageStart = Date.now();
    try {
      const imageBuffer = base64ToArrayBuffer(input.imageBase64);
      const extraction = await extractTextFromImage(
        imageBuffer,
        input.imageMimeType,
        env,
      );
      rawText = extraction.text || rawText;
      visionResult = {
        text: extraction.text,
        confidence: extraction.confidence,
        model: extraction.model,
      };
      stages.push({
        name: "vision",
        status: "complete",
        durationMs: Date.now() - stageStart,
        detail: `${extraction.text.length} chars, ${(extraction.confidence * 100).toFixed(0)}% confidence`,
      });
    } catch (err: unknown) {
      stages.push({
        name: "vision",
        status: "failed",
        durationMs: Date.now() - stageStart,
        detail: err instanceof Error ? err.message : String(err),
      });
    }
  } else if (rawText) {
    stages.push({ name: "vision", status: "skipped", durationMs: 0, detail: "Text provided directly" });
  } else {
    return makeResult(intakeId, "failed", stages, pipelineStart, visionResult, classification, routing, extractionSummary, auditSummary, report, "",
      "No input: provide imageBase64+imageMimeType or text");
  }

  if (!rawText) {
    return makeResult(intakeId, "failed", stages, pipelineStart, visionResult, classification, routing, extractionSummary, auditSummary, report, "",
      "Vision extraction returned no text");
  }

  // ── Stage 2: Classification ───────────────────────────────────────────
  {
    const stageStart = Date.now();
    try {
      const structured = extractStructuredData(rawText);
      const docType = input.documentType ?? structured.documentType ?? "unknown";
      const jurisdiction = input.jurisdiction ?? structured.jurisdiction ?? "*";
      const category = input.category ?? structured.category ?? "*";

      // Estimate confidence based on how many fields we found
      let conf = 0.5;
      if (structured.documentType) conf += 0.15;
      if (structured.jurisdiction) conf += 0.1;
      if (structured.caseNumber) conf += 0.1;
      if (structured.documentDate) conf += 0.05;
      if (structured.parties.length > 0) conf += 0.05;
      if (structured.issuingAuthority) conf += 0.05;

      classification = {
        documentType: docType,
        jurisdiction,
        category,
        confidence: Math.min(conf, 0.98),
        title: input.title ?? structured.title,
        caseNumber: structured.caseNumber,
        documentDate: structured.documentDate,
        parties: structured.parties,
        issuingAuthority: structured.issuingAuthority,
      };

      stages.push({
        name: "classification",
        status: "complete",
        durationMs: Date.now() - stageStart,
        detail: `${docType} / ${jurisdiction} / ${category} (${(conf * 100).toFixed(0)}%)`,
      });
    } catch (err: unknown) {
      stages.push({
        name: "classification",
        status: "failed",
        durationMs: Date.now() - stageStart,
        detail: err instanceof Error ? err.message : String(err),
      });
    }
  }

  // ── Stage 3: Citizen routing ──────────────────────────────────────────
  if (classification) {
    const stageStart = Date.now();
    try {
      const routeResult = await env.DB.prepare(
        `SELECT citizen_name, skill_slug, priority
         FROM citizen_routing_index
         WHERE is_active = 1
           AND (doc_type = ?1 OR doc_type = '*')
           AND (jurisdiction = ?2 OR jurisdiction = '*')
           AND (category = ?3 OR category = '*')
         ORDER BY priority DESC
         LIMIT 1`
      ).bind(
        classification.documentType,
        classification.jurisdiction,
        classification.category,
      ).first<{ citizen_name: string; skill_slug: string; priority: number }>();

      if (routeResult) {
        routing = {
          citizenName: routeResult.citizen_name,
          skillSlug: routeResult.skill_slug,
          priority: routeResult.priority,
        };
        stages.push({
          name: "routing",
          status: "complete",
          durationMs: Date.now() - stageStart,
          detail: `${routeResult.citizen_name} → ${routeResult.skill_slug}`,
        });
      } else {
        stages.push({
          name: "routing",
          status: "complete",
          durationMs: Date.now() - stageStart,
          detail: "No matching citizen route (proceeding with general audit)",
        });
      }
    } catch (err: unknown) {
      stages.push({
        name: "routing",
        status: "failed",
        durationMs: Date.now() - stageStart,
        detail: err instanceof Error ? err.message : String(err),
      });
    }
  }

  // ── Stage 4: Content extraction ───────────────────────────────────────
  let docContent: DocumentContent | null = null;
  {
    const stageStart = Date.now();
    try {
      docContent = extractDocumentContent(
        input.title ?? classification?.title ?? "untitled",
        rawText,
        [rawText],
      );

      extractionSummary = {
        persons: docContent.persons.length,
        events: docContent.events.length,
        statements: docContent.statements.length,
        evidenceItems: docContent.evidenceItems.length,
        timestamps: docContent.timestamps.length,
        pages: docContent.pages.length,
      };

      stages.push({
        name: "extraction",
        status: "complete",
        durationMs: Date.now() - stageStart,
        detail: `${docContent.persons.length} persons, ${docContent.events.length} events, ${docContent.statements.length} statements`,
      });
    } catch (err: unknown) {
      stages.push({
        name: "extraction",
        status: "failed",
        durationMs: Date.now() - stageStart,
        detail: err instanceof Error ? err.message : String(err),
      });
    }
  }

  // ── Stage 5: Audit execution ──────────────────────────────────────────
  if (docContent) {
    const stageStart = Date.now();
    try {
      // Extract characters and assemble review team
      const rawChars = docContent.persons.map(p => ({
        name: p.name,
        role: p.role,
        designation: p.designation,
        agency: p.agency,
        badgeOrId: p.badgeOrId,
        metadata: p.attributes,
      }));

      const characters = extractCharacters(rawChars);
      const team = assembleTeam(docContent.id, docContent.documentType, characters);
      const rules = DETECTION_RULES;

      // Execute the audit
      const audit = executeAudit(team, docContent, [], rules);

      // Compute summary
      const allFindings = [...audit.findings, ...audit.crossPerspectiveFindings];
      auditSummary = {
        auditId: audit.id,
        teamSize: audit.reviewTeam.teamMembers.length,
        totalFindings: allFindings.length,
        criticalFindings: allFindings.filter(f => f.severity === "CRITICAL").length,
        highFindings: allFindings.filter(f => f.severity === "HIGH").length,
        mediumFindings: allFindings.filter(f => f.severity === "MODERATE").length,
        lowFindings: allFindings.filter(f => f.severity === "LOW").length,
        detectionRulesFired: audit.findings.filter(f => f.detectionRuleId).length,
        crossPerspectiveFindings: audit.crossPerspectiveFindings.length,
      };

      // Render the full report
      report = renderAuditReport(audit);

      stages.push({
        name: "audit",
        status: "complete",
        durationMs: Date.now() - stageStart,
        detail: `${allFindings.length} findings (${auditSummary.criticalFindings} CRITICAL), ${team.teamMembers.length} perspectives`,
      });
    } catch (err: unknown) {
      stages.push({
        name: "audit",
        status: "failed",
        durationMs: Date.now() - stageStart,
        detail: err instanceof Error ? err.message : String(err),
      });
    }
  }

  // ── Store result ──────────────────────────────────────────────────────
  const result = makeResult(intakeId, determineStatus(stages), stages, pipelineStart,
    visionResult, classification, routing, extractionSummary, auditSummary, report, rawText);

  // Persist to KV for retrieval via GET /api/intake/:id
  try {
    await safeKvPut(
      env.KNOWLEDGE_STORE,
      `INTAKE:${intakeId}`,
      JSON.stringify(result),
    );
  } catch {
    // Non-fatal — result is still returned inline
  }

  // Log to D1 for stats
  try {
    await env.DB.prepare(
      `INSERT INTO intake_log (id, document_type, jurisdiction, category, citizen_name, skill_slug,
       total_findings, critical_findings, status, processed_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)`
    ).bind(
      intakeId,
      classification?.documentType ?? null,
      classification?.jurisdiction ?? null,
      classification?.category ?? null,
      routing?.citizenName ?? null,
      routing?.skillSlug ?? null,
      auditSummary?.totalFindings ?? 0,
      auditSummary?.criticalFindings ?? 0,
      result.status,
      result.processedAt,
    ).run();
  } catch {
    // Table may not exist yet — non-fatal
  }

  return result;
}

// ═══════════════════════════════════════════════════════════════════════════
// Retrieve stored intake result
// ═══════════════════════════════════════════════════════════════════════════

export async function getIntakeResult(
  id: string,
  env: Env,
): Promise<IntakeResult | null> {
  const raw = await env.KNOWLEDGE_STORE.get(`INTAKE:${id}`);
  if (!raw) return null;
  return JSON.parse(raw) as IntakeResult;
}

// ═══════════════════════════════════════════════════════════════════════════
// Stats
// ═══════════════════════════════════════════════════════════════════════════

export async function getIntakeStats(env: Env): Promise<{
  total: number;
  byStatus: Record<string, number>;
  byDocumentType: Record<string, number>;
  byCitizen: Record<string, number>;
  avgFindings: number;
  totalCritical: number;
}> {
  try {
    const rows = await env.DB.prepare(
      `SELECT status, document_type, citizen_name, total_findings, critical_findings
       FROM intake_log ORDER BY processed_at DESC LIMIT 500`
    ).all<{
      status: string;
      document_type: string | null;
      citizen_name: string | null;
      total_findings: number;
      critical_findings: number;
    }>();

    const results = rows.results ?? [];
    const byStatus: Record<string, number> = {};
    const byDocumentType: Record<string, number> = {};
    const byCitizen: Record<string, number> = {};
    let totalFindings = 0;
    let totalCritical = 0;

    for (const r of results) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      if (r.document_type) byDocumentType[r.document_type] = (byDocumentType[r.document_type] ?? 0) + 1;
      if (r.citizen_name) byCitizen[r.citizen_name] = (byCitizen[r.citizen_name] ?? 0) + 1;
      totalFindings += r.total_findings;
      totalCritical += r.critical_findings;
    }

    return {
      total: results.length,
      byStatus,
      byDocumentType,
      byCitizen,
      avgFindings: results.length > 0 ? totalFindings / results.length : 0,
      totalCritical,
    };
  } catch {
    return { total: 0, byStatus: {}, byDocumentType: {}, byCitizen: {}, avgFindings: 0, totalCritical: 0 };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════════════════

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  // Strip data URL prefix if present
  const cleaned = base64.includes(",") ? base64.split(",")[1]! : base64;
  const binary = atob(cleaned);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

function determineStatus(stages: IntakeStage[]): "complete" | "partial" | "failed" {
  const failed = stages.filter(s => s.status === "failed").length;
  const complete = stages.filter(s => s.status === "complete").length;
  if (failed === 0 && complete > 0) return "complete";
  if (complete > 0) return "partial";
  return "failed";
}

function makeResult(
  id: string,
  status: "complete" | "partial" | "failed",
  stages: IntakeStage[],
  pipelineStart: number,
  vision: IntakeResult["vision"],
  classification: IntakeResult["classification"],
  routing: IntakeResult["routing"],
  extraction: IntakeResult["extraction"],
  audit: IntakeResult["audit"],
  report: string | null,
  rawText: string,
  errorDetail?: string,
): IntakeResult {
  if (errorDetail) {
    stages.push({ name: "pipeline", status: "failed", durationMs: 0, detail: errorDetail });
  }
  return {
    id,
    status,
    stages,
    totalDurationMs: Date.now() - pipelineStart,
    vision,
    classification,
    routing,
    extraction,
    audit,
    report,
    rawText,
    processedAt: new Date().toISOString(),
  };
}

/**
 * batch-intake.ts — Batch Document Intake Service
 *
 * Accepts multiple documents, processes each through the intake pipeline
 * sequentially (respecting D1 subrequest limits), auto-groups into cases,
 * and stores batch metadata for status retrieval.
 *
 * Flow:
 *   1. Accept array of { filename, content, mimeType }
 *   2. Create batch record in D1 (returns batchId immediately)
 *   3. Process each document through runIntake sequentially
 *   4. After all documents processed, trigger case grouping via addDocumentToCase
 *   5. Store per-document results in KV, batch summary in D1
 */

import type { Env } from "../index.js";
import { generateId, safeKvPut } from "../utils/helpers.js";
import { runIntake } from "./intake-pipeline.js";
import type { IntakeInput, IntakeResult } from "./intake-pipeline.js";
import { createCase, addDocumentToCase } from "./case-management.js";
import type { CaseRecord } from "./case-management.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface BatchDocument {
  /** Original filename */
  filename: string;
  /** Base64-encoded content (for images/PDFs) or plain text */
  content: string;
  /** MIME type: image/png, image/jpeg, text/plain, etc. */
  mimeType: string;
}

export interface BatchIntakeRequest {
  /** Array of documents to process */
  documents: BatchDocument[];
  /** Optional: case name to group all documents under */
  caseName?: string;
  /** Optional: jurisdiction override for all documents */
  jurisdiction?: string;
  /** Optional: category override for all documents */
  category?: string;
}

export type BatchItemStatus = "pending" | "processing" | "complete" | "failed";
export type BatchJobStatus = "accepted" | "processing" | "complete" | "partial" | "failed";

export interface BatchItemResult {
  index: number;
  filename: string;
  status: BatchItemStatus;
  intakeId: string | null;
  error: string | null;
  totalFindings: number;
  criticalFindings: number;
  documentType: string | null;
  durationMs: number;
}

export interface BatchReport {
  batchId: string;
  status: BatchJobStatus;
  totalDocuments: number;
  completed: number;
  failed: number;
  caseId: string | null;
  caseName: string | null;
  items: BatchItemResult[];
  totalFindings: number;
  criticalFindings: number;
  startedAt: string;
  completedAt: string | null;
  totalDurationMs: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// Table Initialization
// ═══════════════════════════════════════════════════════════════════════════

export async function ensureBatchTable(env: Env): Promise<void> {
  await env.DB.batch([
    env.DB.prepare(
      `CREATE TABLE IF NOT EXISTS batch_intake_jobs (
        id TEXT PRIMARY KEY,
        status TEXT NOT NULL DEFAULT 'accepted',
        total_documents INTEGER NOT NULL DEFAULT 0,
        completed INTEGER NOT NULL DEFAULT 0,
        failed INTEGER NOT NULL DEFAULT 0,
        case_id TEXT,
        case_name TEXT,
        total_findings INTEGER NOT NULL DEFAULT 0,
        critical_findings INTEGER NOT NULL DEFAULT 0,
        started_at TEXT NOT NULL,
        completed_at TEXT,
        total_duration_ms INTEGER NOT NULL DEFAULT 0
      )`
    ),
    env.DB.prepare(
      `CREATE TABLE IF NOT EXISTS batch_intake_items (
        id TEXT PRIMARY KEY,
        batch_id TEXT NOT NULL,
        item_index INTEGER NOT NULL,
        filename TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        intake_id TEXT,
        error TEXT,
        total_findings INTEGER NOT NULL DEFAULT 0,
        critical_findings INTEGER NOT NULL DEFAULT 0,
        document_type TEXT,
        duration_ms INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY (batch_id) REFERENCES batch_intake_jobs(id)
      )`
    ),
  ]);
}

// ═══════════════════════════════════════════════════════════════════════════
// Batch Processing
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Start a batch intake job. Creates the batch record and returns the batchId
 * immediately. Call processBatch() to actually run the pipeline.
 */
export async function createBatchJob(
  env: Env,
  request: BatchIntakeRequest,
): Promise<string> {
  await ensureBatchTable(env);

  const batchId = generateId("batch");
  const now = new Date().toISOString();

  // Insert the batch job record
  const stmts = [
    env.DB.prepare(
      `INSERT INTO batch_intake_jobs (id, status, total_documents, started_at)
       VALUES (?1, ?2, ?3, ?4)`
    ).bind(batchId, "accepted", request.documents.length, now),
  ];

  // Insert a row per document item
  for (let i = 0; i < request.documents.length; i++) {
    const itemId = generateId("bitem");
    stmts.push(
      env.DB.prepare(
        `INSERT INTO batch_intake_items (id, batch_id, item_index, filename, status)
         VALUES (?1, ?2, ?3, ?4, ?5)`
      ).bind(itemId, batchId, i, request.documents[i]!.filename, "pending"),
    );
  }

  await env.DB.batch(stmts);

  // Store the full request in KV so processBatch can retrieve it
  await safeKvPut(
    env.KNOWLEDGE_STORE,
    `BATCH_REQ:${batchId}`,
    JSON.stringify(request),
  );

  return batchId;
}

/**
 * Process all documents in a batch sequentially. Updates D1 and KV
 * as each document completes.
 */
export async function processBatch(
  env: Env,
  batchId: string,
): Promise<BatchReport> {
  // Mark batch as processing
  await env.DB.prepare(
    `UPDATE batch_intake_jobs SET status = 'processing' WHERE id = ?1`
  ).bind(batchId).run();

  // Retrieve the original request from KV
  const raw = await env.KNOWLEDGE_STORE.get(`BATCH_REQ:${batchId}`);
  if (!raw) {
    throw new Error(`Batch request not found: ${batchId}`);
  }
  const request: BatchIntakeRequest = JSON.parse(raw);

  // Load item IDs from D1
  const itemRows = await env.DB.prepare(
    `SELECT id, item_index, filename FROM batch_intake_items
     WHERE batch_id = ?1 ORDER BY item_index ASC`
  ).bind(batchId).all<{ id: string; item_index: number; filename: string }>();

  const items: BatchItemResult[] = [];
  let totalFindings = 0;
  let criticalFindings = 0;
  let completedCount = 0;
  let failedCount = 0;
  const intakeResults: IntakeResult[] = [];

  // Process each document sequentially to respect D1 subrequest limits
  for (const row of itemRows.results) {
    const doc = request.documents[row.item_index]!;
    const itemStart = Date.now();

    // Mark item as processing
    await env.DB.prepare(
      `UPDATE batch_intake_items SET status = 'processing' WHERE id = ?1`
    ).bind(row.id).run();

    let itemResult: BatchItemResult;

    try {
      // Build IntakeInput from the batch document
      const input = buildIntakeInput(doc, request);

      // Run the intake pipeline
      const result = await runIntake(input, env);
      intakeResults.push(result);

      const docFindings = result.audit?.totalFindings ?? 0;
      const docCritical = result.audit?.criticalFindings ?? 0;
      totalFindings += docFindings;
      criticalFindings += docCritical;
      completedCount++;

      itemResult = {
        index: row.item_index,
        filename: row.filename,
        status: "complete",
        intakeId: result.id,
        error: null,
        totalFindings: docFindings,
        criticalFindings: docCritical,
        documentType: result.classification?.documentType ?? null,
        durationMs: Date.now() - itemStart,
      };

      // Update item in D1
      await env.DB.prepare(
        `UPDATE batch_intake_items
         SET status = 'complete', intake_id = ?1, total_findings = ?2,
             critical_findings = ?3, document_type = ?4, duration_ms = ?5
         WHERE id = ?6`
      ).bind(
        result.id, docFindings, docCritical,
        result.classification?.documentType ?? null,
        itemResult.durationMs, row.id,
      ).run();
    } catch (err) {
      failedCount++;
      const errorMsg = err instanceof Error ? err.message : String(err);

      itemResult = {
        index: row.item_index,
        filename: row.filename,
        status: "failed",
        intakeId: null,
        error: errorMsg,
        totalFindings: 0,
        criticalFindings: 0,
        documentType: null,
        durationMs: Date.now() - itemStart,
      };

      // Update item in D1
      await env.DB.prepare(
        `UPDATE batch_intake_items
         SET status = 'failed', error = ?1, duration_ms = ?2
         WHERE id = ?3`
      ).bind(errorMsg, itemResult.durationMs, row.id).run();
    }

    items.push(itemResult);
  }

  // ── Case Grouping ──────────────────────────────────────────────────────
  // If documents were processed, group them into a case
  let caseId: string | null = null;
  let caseName: string | null = request.caseName ?? null;

  if (completedCount > 0) {
    try {
      // Auto-generate a case name from the batch if not provided
      if (!caseName) {
        const docTypes = items
          .filter((i) => i.documentType)
          .map((i) => i.documentType!);
        const uniqueTypes = [...new Set(docTypes)];
        caseName = uniqueTypes.length > 0
          ? `Batch ${batchId.slice(-8)} — ${uniqueTypes.slice(0, 3).join(", ")}`
          : `Batch ${batchId.slice(-8)}`;
      }

      const caseRecord: CaseRecord = await createCase(
        env,
        caseName,
        request.jurisdiction ?? "MULTI",
        request.category ?? "BATCH_INTAKE",
      );
      caseId = caseRecord.id;

      // Add each successfully-processed document to the case
      // This triggers cross-document analysis
      for (const item of items) {
        if (item.status === "complete" && item.intakeId) {
          const doc = request.documents[item.index]!;
          const input = buildIntakeInput(doc, request);
          try {
            await addDocumentToCase(env, caseId, input);
          } catch {
            // Case grouping failure is non-fatal; the individual audit stands
          }
        }
      }
    } catch {
      // Case creation failure is non-fatal
    }
  }

  // ── Finalize batch ─────────────────────────────────────────────────────
  const completedAt = new Date().toISOString();
  const startedRow = await env.DB.prepare(
    `SELECT started_at FROM batch_intake_jobs WHERE id = ?1`
  ).bind(batchId).first<{ started_at: string }>();

  const startedAt = startedRow?.started_at ?? completedAt;
  const totalDurationMs = new Date(completedAt).getTime() - new Date(startedAt).getTime();

  const batchStatus: BatchJobStatus =
    failedCount === 0 ? "complete" :
    completedCount === 0 ? "failed" :
    "partial";

  // Update batch job record
  await env.DB.prepare(
    `UPDATE batch_intake_jobs
     SET status = ?1, completed = ?2, failed = ?3, case_id = ?4, case_name = ?5,
         total_findings = ?6, critical_findings = ?7, completed_at = ?8,
         total_duration_ms = ?9
     WHERE id = ?10`
  ).bind(
    batchStatus, completedCount, failedCount, caseId, caseName,
    totalFindings, criticalFindings, completedAt, totalDurationMs, batchId,
  ).run();

  const report: BatchReport = {
    batchId,
    status: batchStatus,
    totalDocuments: request.documents.length,
    completed: completedCount,
    failed: failedCount,
    caseId,
    caseName,
    items,
    totalFindings,
    criticalFindings,
    startedAt,
    completedAt,
    totalDurationMs,
  };

  // Store full report in KV for fast retrieval
  await safeKvPut(
    env.KNOWLEDGE_STORE,
    `BATCH:${batchId}`,
    JSON.stringify(report),
  );

  return report;
}

/**
 * Retrieve a batch report by ID.
 */
export async function getBatchReport(
  env: Env,
  batchId: string,
): Promise<BatchReport | null> {
  // Try KV first (completed batches)
  const kvRaw = await env.KNOWLEDGE_STORE.get(`BATCH:${batchId}`);
  if (kvRaw) {
    return JSON.parse(kvRaw) as BatchReport;
  }

  // Fall back to D1 for in-progress batches
  const job = await env.DB.prepare(
    `SELECT * FROM batch_intake_jobs WHERE id = ?1`
  ).bind(batchId).first<Record<string, unknown>>();

  if (!job) return null;

  const itemRows = await env.DB.prepare(
    `SELECT * FROM batch_intake_items WHERE batch_id = ?1 ORDER BY item_index ASC`
  ).bind(batchId).all<Record<string, unknown>>();

  const items: BatchItemResult[] = itemRows.results.map((r) => ({
    index: r.item_index as number,
    filename: r.filename as string,
    status: r.status as BatchItemStatus,
    intakeId: (r.intake_id as string) ?? null,
    error: (r.error as string) ?? null,
    totalFindings: (r.total_findings as number) ?? 0,
    criticalFindings: (r.critical_findings as number) ?? 0,
    documentType: (r.document_type as string) ?? null,
    durationMs: (r.duration_ms as number) ?? 0,
  }));

  return {
    batchId: job.id as string,
    status: job.status as BatchJobStatus,
    totalDocuments: job.total_documents as number,
    completed: job.completed as number ?? 0,
    failed: job.failed as number ?? 0,
    caseId: (job.case_id as string) ?? null,
    caseName: (job.case_name as string) ?? null,
    items,
    totalFindings: (job.total_findings as number) ?? 0,
    criticalFindings: (job.critical_findings as number) ?? 0,
    startedAt: job.started_at as string,
    completedAt: (job.completed_at as string) ?? null,
    totalDurationMs: (job.total_duration_ms as number) ?? 0,
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════════════════

function buildIntakeInput(doc: BatchDocument, request: BatchIntakeRequest): IntakeInput {
  const isImage = doc.mimeType.startsWith("image/") || doc.mimeType === "application/pdf";

  const input: IntakeInput = {
    title: doc.filename,
    source: "batch-intake",
  };

  if (isImage) {
    input.imageBase64 = doc.content;
    input.imageMimeType = doc.mimeType;
  } else {
    input.text = doc.content;
  }

  if (request.jurisdiction) input.jurisdiction = request.jurisdiction;
  if (request.category) input.category = request.category;
  if (request.caseName) input.caseName = request.caseName;

  return input;
}

/**
 * batch-intake.ts — Batch Document Intake API
 *
 * POST /api/intake/batch         Submit multiple documents for batch processing
 * GET  /api/intake/batch/:batchId  Get batch job status and results
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { rateLimit } from "./middleware/rate-limit.js";
import { parseJsonBody } from "../utils/helpers.js";
import {
  createBatchJob,
  processBatch,
  getBatchReport,
} from "../services/batch-intake.js";
import type { BatchIntakeRequest, BatchDocument } from "../services/batch-intake.js";

type RouteParams = Record<string, string>;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// ── POST /api/intake/batch ─────────────────────────────────────────────

export async function handleBatchIntakeSubmit(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const rateLimitErr = await rateLimit(request, env);
  if (rateLimitErr) return rateLimitErr;

  let body: BatchIntakeRequest;
  try {
    body = await parseJsonBody<BatchIntakeRequest>(request);
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  // Validate input
  if (!body.documents || !Array.isArray(body.documents) || body.documents.length === 0) {
    return json({ error: "documents array is required and must not be empty" }, 400);
  }

  if (body.documents.length > 50) {
    return json({ error: "Maximum 50 documents per batch" }, 400);
  }

  for (let i = 0; i < body.documents.length; i++) {
    const doc = body.documents[i] as BatchDocument | undefined;
    if (!doc || !doc.filename || !doc.content || !doc.mimeType) {
      return json({
        error: `Document at index ${i} missing required fields (filename, content, mimeType)`,
      }, 400);
    }
  }

  // Create the batch job record (fast — returns immediately)
  const batchId = await createBatchJob(env, body);

  // Process the batch in the background using waitUntil
  // so the response returns immediately with the batchId
  ctx.waitUntil(processBatch(env, batchId));

  return json({
    batchId,
    status: "accepted",
    totalDocuments: body.documents.length,
    message: "Batch accepted. Poll GET /api/intake/batch/:batchId for results.",
  }, 202);
}

// ── GET /api/intake/batch/:batchId ─────────────────────────────────────

export async function handleBatchIntakeGet(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const batchId = params.batchId;
  if (!batchId) {
    return json({ error: "batchId parameter required" }, 400);
  }

  const report = await getBatchReport(env, batchId);
  if (!report) {
    return json({ error: "Batch not found" }, 404);
  }

  return json(report);
}

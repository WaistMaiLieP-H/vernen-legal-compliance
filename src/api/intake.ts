/**
 * intake.ts — Document Intake API
 *
 * POST /api/intake              Submit a document, get a complete audit
 * POST /api/intake/text         Submit plain text, get a complete audit
 * GET  /api/intake/:id          Retrieve a stored intake result (JSON)
 * GET  /api/intake/:id/report   Retrieve a stored intake report (Markdown)
 * GET  /api/intake/stats        Intake pipeline statistics
 * GET  /api/intake/status       Pipeline health check
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { parseJsonBody } from "../utils/helpers.js";
import {
  runIntake,
  getIntakeResult,
  getIntakeStats,
} from "../services/intake-pipeline.js";
import type { IntakeInput } from "../services/intake-pipeline.js";

type RouteParams = Record<string, string>;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function markdown(text: string): Response {
  return new Response(text, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}

// ── GET /api/intake/status ──────────────────────────────────────────────

export async function handleIntakeStatus(
  _request: Request,
  _env: Env,
): Promise<Response> {
  return json({
    service: "Document Intake Pipeline",
    version: "1.0.0",
    status: "OPERATIONAL",
    description: "Drop a document, get an audit. No instructions needed.",
    stages: [
      "1. Vision — OCR extraction (Workers AI)",
      "2. Classification — Document type, jurisdiction, category",
      "3. Routing — Citizen + skill assignment",
      "4. Extraction — Persons, events, statements, evidence, timestamps",
      "5. Audit — Multi-perspective review with detection rules",
    ],
    endpoints: [
      "GET  /api/intake/status",
      "GET  /api/intake/stats",
      "POST /api/intake",
      "POST /api/intake/text",
      "GET  /api/intake/:id",
      "GET  /api/intake/:id/report",
    ],
  });
}

// ── GET /api/intake/stats ───────────────────────────────────────────────

export async function handleIntakeStats(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const stats = await getIntakeStats(env);
  return json(stats);
}

// ── POST /api/intake ────────────────────────────────────────────────────

export async function handleIntakeSubmit(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const body = await parseJsonBody<IntakeInput>(request);
  if (!body) return json({ error: "Invalid JSON body" }, 400);

  if (!body.imageBase64 && !body.text) {
    return json({
      error: "Provide imageBase64 + imageMimeType (for scanned documents) or text (for extracted/pasted content)",
    }, 400);
  }

  if (body.imageBase64 && !body.imageMimeType) {
    return json({ error: "imageMimeType required when imageBase64 is provided" }, 400);
  }

  const result = await runIntake(body, env);
  return json(result, result.status === "failed" ? 422 : 200);
}

// ── POST /api/intake/text ───────────────────────────────────────────────

export async function handleIntakeText(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const body = await parseJsonBody<{ text: string; title?: string; caseName?: string }>(request);
  if (!body?.text) return json({ error: "Provide { text: '...' }" }, 400);

  const result = await runIntake({
    text: body.text,
    title: body.title,
    caseName: body.caseName,
  }, env);

  return json(result, result.status === "failed" ? 422 : 200);
}

// ── GET /api/intake/:id ─────────────────────────────────────────────────

export async function handleIntakeGet(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const id = params.id;
  if (!id) return json({ error: "Missing intake ID" }, 400);

  const result = await getIntakeResult(id, env);
  if (!result) return json({ error: "Intake result not found" }, 404);

  return json(result);
}

// ── GET /api/intake/:id/report ──────────────────────────────────────────

export async function handleIntakeReport(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const id = params.id;
  if (!id) return json({ error: "Missing intake ID" }, 400);

  const result = await getIntakeResult(id, env);
  if (!result) return json({ error: "Intake result not found" }, 404);

  if (!result.report) {
    return json({ error: "No report available (audit may have failed)" }, 404);
  }

  return markdown(result.report);
}

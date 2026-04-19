/**
 * cases.ts — Case Management API
 *
 * POST /api/cases                    Create a new case
 * GET  /api/cases                    List all cases
 * GET  /api/cases/:id               Get case details
 * POST /api/cases/:id/documents     Add document to case (triggers cross-analysis)
 * GET  /api/cases/:id/documents     List case documents
 * GET  /api/cases/:id/findings      Cross-document findings
 * GET  /api/cases/:id/report        Full case report (Markdown)
 * PUT  /api/cases/:id/close         Close a case
 * GET  /api/cases/status            Service status
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { parseJsonBody } from "../utils/helpers.js";
import {
  createCase,
  getCase,
  listCases,
  closeCase,
  addDocumentToCase,
  getCaseDocuments,
  getCrossFindings,
  generateCaseReport,
} from "../services/case-management.js";
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

// ── GET /api/cases/status ───────────────────────────────────────────────

export async function handleCasesStatus(
  _request: Request,
  _env: Env,
): Promise<Response> {
  return json({
    service: "Case Management Engine",
    version: "1.0.0",
    status: "OPERATIONAL",
    description: "Group documents into cases. Cross-document analysis fires automatically.",
    capabilities: [
      "Cross-document shadow incident detection",
      "Role reversal tracking across reports",
      "Narrative contradiction analysis",
      "Master timeline reconstruction",
      "Per-person narrative registers",
      "Aggregate case reporting",
    ],
    endpoints: [
      "GET  /api/cases/status",
      "POST /api/cases",
      "GET  /api/cases",
      "GET  /api/cases/:id",
      "POST /api/cases/:id/documents",
      "GET  /api/cases/:id/documents",
      "GET  /api/cases/:id/findings",
      "GET  /api/cases/:id/report",
      "PUT  /api/cases/:id/close",
    ],
  });
}

// ── POST /api/cases ─────────────────────────────────────────────────────

export async function handleCasesCreate(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const body = await parseJsonBody<{ name: string; jurisdiction?: string; category?: string }>(request);
  if (!body?.name) return json({ error: "Provide { name: '...' }" }, 400);

  const record = await createCase(
    env,
    body.name,
    body.jurisdiction ?? "*",
    body.category ?? "*",
  );

  return json(record, 201);
}

// ── GET /api/cases ──────────────────────────────────────────────────────

export async function handleCasesList(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const url = new URL(request.url);
  const status = url.searchParams.get("status") ?? undefined;
  const cases = await listCases(env, status);

  return json({ cases, count: cases.length });
}

// ── GET /api/cases/:id ──────────────────────────────────────────────────

export async function handleCasesGet(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const record = await getCase(env, params.id!);
  if (!record) return json({ error: "Case not found" }, 404);

  return json(record);
}

// ── POST /api/cases/:id/documents ───────────────────────────────────────

export async function handleCasesAddDocument(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const caseId = params.id!;
  const caseRecord = await getCase(env, caseId);
  if (!caseRecord) return json({ error: "Case not found" }, 404);
  if (caseRecord.status !== "open") return json({ error: "Case is not open" }, 400);

  const body = await parseJsonBody<IntakeInput>(request);
  if (!body) return json({ error: "Invalid JSON body" }, 400);
  if (!body.imageBase64 && !body.text) {
    return json({ error: "Provide imageBase64 + imageMimeType or text" }, 400);
  }

  const result = await addDocumentToCase(env, caseId, body);

  return json({
    intake: {
      id: result.intake.id,
      status: result.intake.status,
      classification: result.intake.classification,
      audit: result.intake.audit,
    },
    crossDocumentFindings: result.crossFindings,
    shadowIncidents: result.shadowIncidents,
    caseDocumentCount: caseRecord.documentCount + 1,
  });
}

// ── GET /api/cases/:id/documents ────────────────────────────────────────

export async function handleCasesDocuments(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const docs = await getCaseDocuments(env, params.id!);
  return json({ documents: docs, count: docs.length });
}

// ── GET /api/cases/:id/findings ─────────────────────────────────────────

export async function handleCasesFindings(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const findings = await getCrossFindings(env, params.id!);
  return json({ findings, count: findings.length });
}

// ── GET /api/cases/:id/report ───────────────────────────────────────────

export async function handleCasesReport(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const report = await generateCaseReport(env, params.id!);
  if (!report) return json({ error: "Case not found" }, 404);

  return markdown(report);
}

// ── PUT /api/cases/:id/close ────────────────────────────────────────────

export async function handleCasesClose(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const record = await closeCase(env, params.id!);
  if (!record) return json({ error: "Case not found" }, 404);

  return json(record);
}

import { D1EvidenceStore } from "../services/evidence-store.js";
import { RetentionEngine } from "../services/retention-engine.js";
import { authenticate } from "./middleware/auth.js";
import { parseJsonBody } from "../utils/helpers.js";
import type { Env } from "../index.js";

type RouteParams = Record<string, string>;

/**
 * POST /api/evidence/attest — Submit a self-attestation
 */
export async function handleSubmitAttestation(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authResult = await authenticate(request, env);
  if (authResult) return authResult;

  const body = await parseJsonBody<{
    clientId: string;
    ruleId: string;
    ruleCode: string;
    statement: string;
    attestedBy: string;
  }>(request);

  if (!body || !body.clientId || !body.ruleId || !body.ruleCode || !body.statement || !body.attestedBy) {
    return Response.json({ error: "Missing required fields: clientId, ruleId, ruleCode, statement, attestedBy" }, { status: 400 });
  }

  const store = new D1EvidenceStore(env.DB);
  const evidence = await store.submitAttestation(
    body.clientId, body.ruleId, body.ruleCode,
    body.statement, body.attestedBy,
    request.headers.get("CF-Connecting-IP") || undefined,
    request.headers.get("User-Agent") || undefined
  );

  return Response.json({ success: true, evidence }, { status: 201 });
}

/**
 * POST /api/evidence/document — Submit document-backed evidence
 */
export async function handleSubmitDocument(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authResult = await authenticate(request, env);
  if (authResult) return authResult;

  const body = await parseJsonBody<{
    clientId: string;
    ruleId: string;
    ruleCode: string;
    document: {
      id: string;
      title: string;
      documentType: string;
      category: string;
      storageMethod: string;
      storagePath: string;
      mimeType?: string;
      sizeBytes?: number;
      hashSha256?: string;
      uploadedBy: string;
    };
  }>(request);

  if (!body || !body.clientId || !body.ruleId || !body.document) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const store = new D1EvidenceStore(env.DB);
  const doc = {
    ...body.document,
    clientId: body.clientId,
    mimeType: body.document.mimeType || "application/octet-stream",
    sizeBytes: body.document.sizeBytes || 0,
    hashSha256: body.document.hashSha256 || "",
    uploadedAt: new Date().toISOString(),
    isLegalHold: false,
    metadata: {},
    retentionRuleId: undefined,
    retentionExpiresAt: undefined,
    retentionHoldReason: undefined,
    verifiedAt: undefined,
    verifiedBy: undefined,
  };

  const evidence = await store.submitDocument(
    body.clientId, body.ruleId, body.ruleCode, doc as any
  );

  return Response.json({ success: true, evidence }, { status: 201 });
}

/**
 * POST /api/evidence/verify/:evidenceId — Verify submitted evidence
 */
export async function handleVerifyEvidence(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const authResult = await authenticate(request, env);
  if (authResult) return authResult;

  const evidenceId = params["evidenceId"];
  if (!evidenceId) {
    return Response.json({ error: "Evidence ID required" }, { status: 400 });
  }

  const body = await parseJsonBody<{ verifiedBy: string }>(request);
  const store = new D1EvidenceStore(env.DB);
  await store.verifyEvidence(evidenceId, body?.verifiedBy || "SYSTEM");

  return Response.json({ success: true, evidenceId, status: "VERIFIED" });
}

/**
 * GET /api/evidence/:clientId — Get all evidence for a client
 */
export async function handleGetEvidence(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const authResult = await authenticate(request, env);
  if (authResult) return authResult;

  const clientId = params["clientId"];
  if (!clientId) {
    return Response.json({ error: "Client ID required" }, { status: 400 });
  }

  const store = new D1EvidenceStore(env.DB);
  const evidence = await store.getEvidenceForClient(clientId);
  const summary = await store.getEvidenceSummary(clientId);

  return Response.json({ clientId, summary, evidence });
}

/**
 * GET /api/evidence/:clientId/summary — Evidence coverage summary
 */
export async function handleGetEvidenceSummary(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const authResult = await authenticate(request, env);
  if (authResult) return authResult;

  const clientId = params["clientId"];
  if (!clientId) {
    return Response.json({ error: "Client ID required" }, { status: 400 });
  }

  const store = new D1EvidenceStore(env.DB);
  const summary = await store.getEvidenceSummary(clientId);

  return Response.json({ clientId, ...summary });
}

// ============================================================
// RETENTION ENDPOINTS
// ============================================================

/**
 * GET /api/retention/rules — List all retention rules
 */
export async function handleGetRetentionRules(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authResult = await authenticate(request, env);
  if (authResult) return authResult;

  const url = new URL(request.url);
  const jurisdiction = url.searchParams.get("jurisdiction") || undefined;
  const basis = url.searchParams.get("basis") || undefined;
  const documentType = url.searchParams.get("documentType") || undefined;

  const engine = new RetentionEngine();
  const rules = await engine.listRules(env.DB, { jurisdiction, basis, documentType });

  return Response.json({
    count: rules.length,
    filters: { jurisdiction, basis, documentType },
    rules: rules.map((r) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      retentionYears: r.retentionYears,
      retentionMonths: r.retentionMonths,
      retentionFrom: r.retentionFrom,
      basis: r.basis,
      legalCitation: r.legalCitation,
      jurisdiction: r.jurisdiction,
      disposalMethod: r.disposalMethod,
      penaltyForNonCompliance: r.penaltyForNonCompliance,
      notes: r.notes,
    })),
  });
}

/**
 * GET /api/retention/lookup — Look up retention requirement for a document type
 */
export async function handleRetentionLookup(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authResult = await authenticate(request, env);
  if (authResult) return authResult;

  const url = new URL(request.url);
  const documentType = url.searchParams.get("documentType");
  const jurisdiction = url.searchParams.get("jurisdiction") || "FEDERAL";
  const entityType = url.searchParams.get("entityType") || undefined;

  if (!documentType) {
    return Response.json({ error: "documentType parameter required" }, { status: 400 });
  }

  const engine = new RetentionEngine();
  const rules = await engine.getApplicableRules(env.DB, documentType, jurisdiction, entityType);
  const longest = await engine.getLongestRetention(env.DB, documentType, jurisdiction, entityType);

  return Response.json({
    documentType,
    jurisdiction,
    entityType,
    applicableRules: rules.length,
    longestRetention: longest ? {
      id: longest.id,
      title: longest.title,
      years: longest.retentionYears,
      months: longest.retentionMonths,
      from: longest.retentionFrom,
      citation: longest.legalCitation,
      penalty: longest.penaltyForNonCompliance,
    } : null,
    allRules: rules.map((r) => ({
      id: r.id,
      title: r.title,
      years: r.retentionYears,
      months: r.retentionMonths,
      citation: r.legalCitation,
      basis: r.basis,
    })),
  });
}

/**
 * GET /api/retention/:clientId/summary — Retention compliance summary
 */
export async function handleRetentionSummary(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const authResult = await authenticate(request, env);
  if (authResult) return authResult;

  const clientId = params["clientId"];
  if (!clientId) {
    return Response.json({ error: "Client ID required" }, { status: 400 });
  }

  const engine = new RetentionEngine();
  const summary = await engine.getRetentionSummary(env.DB, clientId);
  const expiring = await engine.getExpiringSoon(env.DB, clientId);
  const expired = await engine.getExpired(env.DB, clientId);
  const holds = await engine.getLegalHolds(env.DB, clientId);

  return Response.json({
    clientId,
    ...summary,
    expiringSoon: expiring,
    expiredDocuments: expired,
    legalHolds: holds,
  });
}

/**
 * POST /api/retention/:documentId/hold — Place legal hold
 */
export async function handlePlaceLegalHold(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const authResult = await authenticate(request, env);
  if (authResult) return authResult;

  const documentId = params["documentId"];
  if (!documentId) {
    return Response.json({ error: "Document ID required" }, { status: 400 });
  }

  const body = await parseJsonBody<{ reason: string }>(request);
  if (!body?.reason) {
    return Response.json({ error: "Reason required for legal hold" }, { status: 400 });
  }

  const engine = new RetentionEngine();
  await engine.placeLegalHold(env.DB, documentId, body.reason);

  return Response.json({ success: true, documentId, status: "LEGAL_HOLD", reason: body.reason });
}

/**
 * DELETE /api/retention/:documentId/hold — Release legal hold
 */
export async function handleReleaseLegalHold(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const authResult = await authenticate(request, env);
  if (authResult) return authResult;

  const documentId = params["documentId"];
  if (!documentId) {
    return Response.json({ error: "Document ID required" }, { status: 400 });
  }

  const engine = new RetentionEngine();
  await engine.releaseLegalHold(env.DB, documentId);

  return Response.json({ success: true, documentId, status: "ACTIVE" });
}

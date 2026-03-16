/**
 * INTEGRA API Route Handlers
 *
 * Founder-only internal audit and operational integrity endpoints.
 * ALL routes require Bearer token authentication — this is internal system data.
 */

import type { Env } from "../index.js";
import { Integra } from "../personas/integra/index.js";
import { authenticate } from "./middleware/auth.js";

type RouteParams = Record<string, string>;

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// ---------------------------------------------------------------------------
// Singleton
// ---------------------------------------------------------------------------

let integraInstance: Integra | null = null;
let integraInitialized = false;

async function getIntegraInstance(env: Env): Promise<Integra> {
  if (!integraInstance) {
    integraInstance = new Integra();
  }
  if (!integraInitialized) {
    await integraInstance.initialize(env);
    integraInitialized = true;
  }
  return integraInstance;
}

/**
 * Guard: every INTEGRA endpoint requires API key auth.
 */
function requireAuth(request: Request, env: Env): Response | null {
  return authenticate(request, env);
}

// =============================================================================
// GET /api/integra/status
// =============================================================================

async function handleIntegraStatus(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const integra = await getIntegraInstance(env);
    const stats = await integra.getStats(env);

    return jsonResponse({
      citizen: "INTEGRA",
      wave: 5,
      role: "Oversight Committee Chair",
      domain: "Internal Compliance & Operational Integrity",
      workers: ["AUDIT-1", "PROC-1"],
      ...stats,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to get INTEGRA status";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/integra/audit — run full operational audit
// =============================================================================

async function handleIntegraAudit(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const integra = await getIntegraInstance(env);
    const report = await integra.runOperationalAudit(env);

    return jsonResponse({
      audit: report,
      summary: {
        overallStatus: report.overallStatus,
        totalFindings: report.totalFindings,
        criticalFindings: report.criticalFindings,
        passed: report.passed,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to run operational audit";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/integra/audit/database — database health only
// =============================================================================

async function handleIntegraAuditDatabase(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const integra = await getIntegraInstance(env);
    const result = await integra.runControlTest("database", env);

    return jsonResponse(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to audit database";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/integra/audit/citizens — Citizen operations audit
// =============================================================================

async function handleIntegraAuditCitizens(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const integra = await getIntegraInstance(env);
    const result = await integra.runControlTest("citizens", env);

    return jsonResponse(result);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to audit Citizen operations";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/integra/audit/history — past audits
// =============================================================================

async function handleIntegraAuditHistory(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") ?? "20", 10);

    const integra = await getIntegraInstance(env);
    const history = await integra.getAuditHistory(env, Math.min(limit, 100));

    return jsonResponse(history);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to get audit history";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/integra/metrics — process metrics
// =============================================================================

async function handleIntegraMetrics(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const integra = await getIntegraInstance(env);
    const metrics = await integra.getProcessMetrics(env);

    return jsonResponse({
      citizen: "INTEGRA",
      worker: "PROC-1",
      metrics,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to get process metrics";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// Exported route handlers
// =============================================================================

export const handleIntegraRoutes = {
  status: handleIntegraStatus,
  audit: handleIntegraAudit,
  auditDatabase: handleIntegraAuditDatabase,
  auditCitizens: handleIntegraAuditCitizens,
  auditHistory: handleIntegraAuditHistory,
  metrics: handleIntegraMetrics,
};

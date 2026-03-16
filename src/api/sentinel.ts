import type { Env } from "../index.js";
import { Sentinel0Worker } from "../workers/sentinel-0/index.js";
import { authenticate } from "./middleware/auth.js";

type RouteParams = Record<string, string>;

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * GET /api/sentinel/status
 * Current audit state, adaptive schedule, and open issues summary.
 */
async function handleSentinelStatus(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  try {
    const sentinel = new Sentinel0Worker();
    const status = await sentinel.getStatus(env);
    return jsonResponse(status);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch SENTINEL-0 status";
    return jsonResponse({ error: message }, 500);
  }
}

/**
 * GET /api/sentinel/issues
 * Full issue register — all open (unresolved) issues, sorted by severity.
 */
async function handleSentinelIssues(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  try {
    const sentinel = new Sentinel0Worker();
    const issues = await sentinel.getIssueRegister(env);
    return jsonResponse({
      count: issues.length,
      issues,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch issue register";
    return jsonResponse({ error: message }, 500);
  }
}

/**
 * GET /api/sentinel/gate/:id
 * Gate readiness check for a specific compliance gate.
 */
async function handleSentinelGate(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const gateId = params["id"];
  if (!gateId) {
    return jsonResponse({ error: "Gate ID is required" }, 400);
  }

  try {
    const sentinel = new Sentinel0Worker();
    const gateStatus = await sentinel.auditGate(gateId, env);
    return jsonResponse(gateStatus);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to check gate readiness";
    return jsonResponse({ error: message }, 500);
  }
}

/**
 * GET /api/sentinel/citizens
 * All 15 Persona Citizens' evolution status.
 */
async function handleSentinelCitizens(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  try {
    const sentinel = new Sentinel0Worker();
    const citizens = await sentinel.getCitizenEvolutionStatus(env);
    return jsonResponse({
      count: citizens.length,
      citizens,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch citizen status";
    return jsonResponse({ error: message }, 500);
  }
}

/**
 * GET /api/sentinel/report/:phase
 * Full phase compliance report.
 */
async function handleSentinelReport(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const phase = params["phase"];
  if (!phase) {
    return jsonResponse({ error: "Phase is required" }, 400);
  }

  try {
    const sentinel = new Sentinel0Worker();
    const report = await sentinel.generateComplianceReport(phase.toUpperCase(), env);

    // Calculate summary stats
    const totalIssues = report.reduce((sum, r) => sum + r.issues.length, 0);
    const allPassed = report.every((r) => r.passed);

    return jsonResponse({
      phase: phase.toUpperCase(),
      auditsPerformed: report.length,
      totalIssuesFound: totalIssues,
      allPassed,
      results: report,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to generate compliance report";
    return jsonResponse({ error: message }, 500);
  }
}

/**
 * POST /api/sentinel/audit/:taskId
 * Trigger an audit of a specific build task. Founder-only (requires auth).
 */
async function handleSentinelAuditTask(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  // Founder-only: require authentication
  const authError = authenticate(request, env);
  if (authError) return authError;

  const taskId = params["taskId"];
  if (!taskId) {
    return jsonResponse({ error: "Task ID is required" }, 400);
  }

  try {
    const sentinel = new Sentinel0Worker();
    const result = await sentinel.auditBuildTask(taskId, env);
    return jsonResponse(result, result.passed ? 200 : 200);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Audit failed";
    return jsonResponse({ error: message }, 500);
  }
}

/**
 * Exported route handlers for the SENTINEL-0 API.
 */
export const handleSentinelRoutes = {
  status: handleSentinelStatus,
  issues: handleSentinelIssues,
  gate: handleSentinelGate,
  citizens: handleSentinelCitizens,
  report: handleSentinelReport,
  auditTask: handleSentinelAuditTask,
};

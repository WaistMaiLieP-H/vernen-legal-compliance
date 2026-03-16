/**
 * SYNTARA API Route Handlers
 *
 * Founder-only legal technology & compliance automation endpoints.
 * ALL routes require Bearer token authentication — infrastructure control is not public.
 */

import type { Env } from "../index.js";
import { Syntara } from "../personas/syntara/index.js";
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

let syntaraInstance: Syntara | null = null;
let syntaraInitialized = false;

async function getSyntaraInstance(env: Env): Promise<Syntara> {
  if (!syntaraInstance) {
    syntaraInstance = new Syntara();
  }
  if (!syntaraInitialized) {
    await syntaraInstance.initialize(env);
    syntaraInitialized = true;
  }
  return syntaraInstance;
}

/**
 * Guard: every SYNTARA endpoint requires API key auth.
 */
function requireAuth(request: Request, env: Env): Response | null {
  return authenticate(request, env);
}

// =============================================================================
// GET /api/syntara/status — SYNTARA operational status
// =============================================================================

export async function handleSyntaraStatus(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const syntara = await getSyntaraInstance(env);
    const stats = await syntara.getStats(env);

    return jsonResponse({
      ...stats,
      wave: 7,
      domain: "Legal Technology & Compliance Automation",
      committee: "ICT",
      workers: ["AUTO-1", "QUAL-1"],
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to get SYNTARA status";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/syntara/health — comprehensive platform health
// =============================================================================

export async function handleSyntaraHealth(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const syntara = await getSyntaraInstance(env);
    const health = await syntara.getPlatformHealth(env);

    return jsonResponse(health);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to run platform health check";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/syntara/automation — automation status and coverage
// =============================================================================

export async function handleSyntaraAutomation(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const syntara = await getSyntaraInstance(env);
    const automation = await syntara.getAutomationStatus(env);

    return jsonResponse(automation);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to get automation status";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/syntara/quality — QA score
// =============================================================================

export async function handleSyntaraQuality(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const syntara = await getSyntaraInstance(env);

    // Run integrity checks first to populate data, then get score
    await syntara.getPlatformHealth(env);
    const stats = await syntara.getStats(env);

    return jsonResponse({
      citizen: "SYNTARA",
      qualityScore: stats.qualityScore,
      totalHealthChecksRun: stats.totalHealthChecksRun,
      message:
        stats.qualityScore >= 90
          ? "Platform quality is excellent. All systems operating within tolerance."
          : stats.qualityScore >= 70
            ? "Platform quality is good. Some areas may need attention."
            : stats.qualityScore >= 50
              ? "Platform quality is fair. Review degraded systems."
              : "Platform quality needs immediate attention.",
      assessedAt: stats.assessedAt,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to get quality score";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/syntara/deployments — deployment history
// =============================================================================

export async function handleSyntaraDeployments(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const syntara = await getSyntaraInstance(env);
    const deployments = await syntara.getDeploymentHistory(env);

    return jsonResponse(deployments);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to get deployment history";
    return jsonResponse({ error: message }, 500);
  }
}

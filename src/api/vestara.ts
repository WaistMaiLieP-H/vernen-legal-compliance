/**
 * VESTARA API Route Handlers
 *
 * Founder-only stakeholder communication & capital strategy endpoints.
 * ALL routes require Bearer token authentication — this is investor-sensitive data.
 */

import type { Env } from "../index.js";
import { Vestara } from "../personas/vestara/index.js";
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

let vestaraInstance: Vestara | null = null;
let vestaraInitialized = false;

async function getVestaraInstance(env: Env): Promise<Vestara> {
  if (!vestaraInstance) {
    vestaraInstance = new Vestara();
  }
  if (!vestaraInitialized) {
    await vestaraInstance.initialize(env);
    vestaraInitialized = true;
  }
  return vestaraInstance;
}

function requireAuth(request: Request, env: Env): Response | null {
  return authenticate(request, env);
}

// =============================================================================
// GET /api/vestara/status — operational status
// =============================================================================

export async function handleVestaraStatus(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const vestara = await getVestaraInstance(env);
    const status = await vestara.getStatus(env);

    return jsonResponse({
      ...status,
      wave: 8,
      domain: "Stakeholder Communication & Capital Strategy",
      committee: "Investor Confidence",
      workers: ["PITCH-1"],
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to get VESTARA status";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/vestara/readiness — investor readiness assessment
// =============================================================================

export async function handleVestaraReadiness(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const vestara = await getVestaraInstance(env);
    const readiness = await vestara.getInvestorReadiness(env);

    return jsonResponse({
      citizen: "VESTARA",
      ...readiness,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to assess investor readiness";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/vestara/metrics — investor-relevant KPIs
// =============================================================================

export async function handleVestaraMetrics(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const vestara = await getVestaraInstance(env);
    const [metrics, strategy] = await Promise.all([
      vestara.generatePitchMetrics(env),
      vestara.getCapitalStrategy(env),
    ]);

    return jsonResponse({
      citizen: "VESTARA",
      metrics,
      capitalStrategy: strategy,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to get pitch metrics";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/vestara/narrative — full investor narrative
// =============================================================================

export async function handleVestaraNarrative(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const vestara = await getVestaraInstance(env);
    const narrative = await vestara.generateNarrative(env);

    return jsonResponse({
      citizen: "VESTARA",
      ...narrative,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to generate investor narrative";
    return jsonResponse({ error: message }, 500);
  }
}

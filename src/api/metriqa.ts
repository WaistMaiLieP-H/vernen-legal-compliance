/**
 * METRIQA API Route Handlers
 *
 * Founder-only performance analytics & growth validation endpoints.
 * ALL routes require Bearer token authentication — this is strategic data.
 */

import type { Env } from "../index.js";
import { Metriqa } from "../personas/metriqa/index.js";
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

let metriqaInstance: Metriqa | null = null;
let metriqaInitialized = false;

async function getMetriqaInstance(env: Env): Promise<Metriqa> {
  if (!metriqaInstance) {
    metriqaInstance = new Metriqa();
  }
  if (!metriqaInitialized) {
    await metriqaInstance.initialize(env);
    metriqaInitialized = true;
  }
  return metriqaInstance;
}

function requireAuth(request: Request, env: Env): Response | null {
  return authenticate(request, env);
}

// =============================================================================
// GET /api/metriqa/status — operational status
// =============================================================================

export async function handleMetriqaStatus(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const metriqa = await getMetriqaInstance(env);
    const status = await metriqa.getStatus(env);

    return jsonResponse({
      ...status,
      wave: 8,
      domain: "Performance Analytics & Growth Validation",
      committee: "Investor Confidence",
      workers: ["DASH-1"],
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to get METRIQA status";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/metriqa/dashboard — comprehensive platform dashboard
// =============================================================================

export async function handleMetriqaDashboard(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const metriqa = await getMetriqaInstance(env);
    const dashboard = await metriqa.getDashboard(env);

    return jsonResponse({
      citizen: "METRIQA",
      ...dashboard,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to generate dashboard";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/metriqa/growth — month-over-month growth metrics
// =============================================================================

export async function handleMetriqaGrowth(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const metriqa = await getMetriqaInstance(env);
    const growth = await metriqa.getGrowthMetrics(env);

    return jsonResponse({
      citizen: "METRIQA",
      ...growth,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to get growth metrics";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/metriqa/economics — unit economics for investor presentations
// =============================================================================

export async function handleMetriqaEconomics(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const metriqa = await getMetriqaInstance(env);
    const economics = await metriqa.getUnitEconomics(env);

    return jsonResponse({
      citizen: "METRIQA",
      ...economics,
      // Format key values for display
      averageRevenuePerClientFormatted: `$${(economics.averageRevenuePerClient / 100).toFixed(2)}`,
      customerAcquisitionCostFormatted: `$${(economics.customerAcquisitionCost / 100).toFixed(2)}`,
      lifetimeValueFormatted: `$${(economics.lifetimeValue / 100).toFixed(2)}`,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to get unit economics";
    return jsonResponse({ error: message }, 500);
  }
}

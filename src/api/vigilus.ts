/**
 * VIGILUS API Route Handlers
 *
 * Founder-only threat assessment & operational risk endpoints.
 * ALL routes require Bearer token authentication — this is security-critical data.
 */

import type { Env } from "../index.js";
import { Vigilus } from "../personas/vigilus/index.js";
import { authenticate } from "./middleware/auth.js";
import { parseJsonBody } from "../utils/helpers.js";
import { RiskCategory } from "../workers/risk-1/types.js";

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

let vigilusInstance: Vigilus | null = null;
let vigilusInitialized = false;

async function getVigilusInstance(env: Env): Promise<Vigilus> {
  if (!vigilusInstance) {
    vigilusInstance = new Vigilus();
  }
  if (!vigilusInitialized) {
    await vigilusInstance.initialize(env);
    vigilusInitialized = true;
  }
  return vigilusInstance;
}

/**
 * Guard: every VIGILUS endpoint requires API key auth.
 */
function requireAuth(request: Request, env: Env): Response | null {
  return authenticate(request, env);
}

// =============================================================================
// GET /api/vigilus/status — operational status
// =============================================================================

export async function handleVigilusStatus(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const vigilus = await getVigilusInstance(env);
    const status = await vigilus.getStatus(env);

    return jsonResponse({
      ...status,
      wave: 6,
      domain: "Threat Assessment & Operational Risk",
      committee: "Oversight",
      workers: ["RISK-1", "THRT-1"],
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to get VIGILUS status";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/vigilus/risks — full risk register
// =============================================================================

export async function handleVigilusRisks(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const vigilus = await getVigilusInstance(env);
    const register = await vigilus.getRiskRegister(env);

    return jsonResponse(register);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to get risk register";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/vigilus/risks/heatmap — risk heat map
// =============================================================================

export async function handleVigilusHeatmap(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const vigilus = await getVigilusInstance(env);
    const heatmap = await vigilus.getRiskHeatMap(env);

    return jsonResponse(heatmap);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to get risk heat map";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// POST /api/vigilus/risks — add a risk
// =============================================================================

export async function handleVigilusAddRisk(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  let body: {
    title: string;
    description: string;
    probability: number;
    impact: number;
    category: string;
    owner?: string;
    mitigationPlan?: string;
  };

  try {
    body = await parseJsonBody<typeof body>(request);
  } catch {
    return jsonResponse({ error: "Invalid JSON in request body" }, 400);
  }

  // Validate required fields
  if (!body.title || typeof body.title !== "string") {
    return jsonResponse({ error: "title is required" }, 400);
  }
  if (!body.description || typeof body.description !== "string") {
    return jsonResponse({ error: "description is required" }, 400);
  }
  if (
    typeof body.probability !== "number" ||
    body.probability < 1 ||
    body.probability > 5
  ) {
    return jsonResponse(
      { error: "probability must be a number between 1 and 5" },
      400
    );
  }
  if (
    typeof body.impact !== "number" ||
    body.impact < 1 ||
    body.impact > 5
  ) {
    return jsonResponse(
      { error: "impact must be a number between 1 and 5" },
      400
    );
  }
  if (
    !body.category ||
    !Object.values(RiskCategory).includes(body.category as RiskCategory)
  ) {
    return jsonResponse(
      {
        error: `Invalid category. Use: ${Object.values(RiskCategory).join(", ")}`,
      },
      400
    );
  }

  try {
    const vigilus = await getVigilusInstance(env);
    const risk = await vigilus.addRisk(
      {
        title: body.title,
        description: body.description,
        probability: body.probability,
        impact: body.impact,
        category: body.category as RiskCategory,
        owner: body.owner,
        mitigationPlan: body.mitigationPlan,
      },
      env
    );

    return jsonResponse({ risk }, 201);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to add risk";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/vigilus/threats — threat landscape
// =============================================================================

export async function handleVigilusThreats(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const vigilus = await getVigilusInstance(env);
    const landscape = await vigilus.assessThreatLandscape(env);

    return jsonResponse(landscape);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to assess threat landscape";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/vigilus/vendor/:name — vendor risk assessment
// =============================================================================

export async function handleVigilusVendor(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  const vendorName = params["name"];
  if (!vendorName) {
    return jsonResponse({ error: "Vendor name is required" }, 400);
  }

  try {
    const vigilus = await getVigilusInstance(env);
    const assessment = await vigilus.assessVendorRisk(
      decodeURIComponent(vendorName),
      env
    );

    return jsonResponse(assessment);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to assess vendor risk";
    return jsonResponse({ error: message }, 500);
  }
}

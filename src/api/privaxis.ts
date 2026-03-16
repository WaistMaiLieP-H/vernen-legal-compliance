/**
 * PRIVAXIS API Route Handlers
 *
 * Founder-only data protection & privacy compliance endpoints.
 * ALL routes require Bearer token authentication — this is security-critical data.
 */

import type { Env } from "../index.js";
import { Privaxis } from "../personas/privaxis/index.js";
import { authenticate } from "./middleware/auth.js";
import { parseJsonBody } from "../utils/helpers.js";
import { DSARType } from "../workers/guard-1/types.js";

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

let privaxisInstance: Privaxis | null = null;
let privaxisInitialized = false;

async function getPrivaxisInstance(env: Env): Promise<Privaxis> {
  if (!privaxisInstance) {
    privaxisInstance = new Privaxis();
  }
  if (!privaxisInitialized) {
    await privaxisInstance.initialize(env);
    privaxisInitialized = true;
  }
  return privaxisInstance;
}

/**
 * Guard: every PRIVAXIS endpoint requires API key auth.
 */
function requireAuth(request: Request, env: Env): Response | null {
  return authenticate(request, env);
}

// =============================================================================
// GET /api/privaxis/status — privacy posture
// =============================================================================

export async function handlePrivaxisStatus(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const privaxis = await getPrivaxisInstance(env);
    const status = await privaxis.getPrivacyStatus(env);

    return jsonResponse({
      ...status,
      wave: 5,
      domain: "Data Protection & Privacy Compliance",
      committee: "Oversight",
      workers: ["GUARD-1", "SHIELD-1"],
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to get PRIVAXIS status";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/privaxis/audit — full privacy audit
// =============================================================================

export async function handlePrivaxisAudit(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const privaxis = await getPrivaxisInstance(env);
    const audit = await privaxis.runPrivacyAudit(env);

    return jsonResponse({
      audit,
      summary: {
        riskLevel: audit.riskLevel,
        totalFindings: audit.findings.length,
        passing: audit.findings.filter((f) => f.status === "PASS").length,
        warnings: audit.findings.filter((f) => f.status === "WARN").length,
        failures: audit.findings.filter((f) => f.status === "FAIL").length,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to run privacy audit";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/privaxis/dataflows — data flow map
// =============================================================================

export async function handlePrivaxisDataflows(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const privaxis = await getPrivaxisInstance(env);
    const assessment = await privaxis.assessDataFlow(env);

    return jsonResponse(assessment);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to assess data flows";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/privaxis/classification — data classification report
// =============================================================================

export async function handlePrivaxisClassification(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const privaxis = await getPrivaxisInstance(env);
    const classification = await privaxis.getDataClassification(env);

    return jsonResponse(classification);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to classify data";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// POST /api/privaxis/dsar — submit a data subject access request
// =============================================================================

export async function handlePrivaxisDSAR(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  let body: { type: string; clientId: string };

  try {
    body = await parseJsonBody<typeof body>(request);
  } catch {
    return jsonResponse({ error: "Invalid JSON in request body" }, 400);
  }

  // Validate type
  if (
    !body.type ||
    !Object.values(DSARType).includes(body.type as DSARType)
  ) {
    return jsonResponse(
      {
        error: `Invalid DSAR type. Use: ${Object.values(DSARType).join(", ")}`,
      },
      400
    );
  }

  // Validate clientId
  if (!body.clientId || typeof body.clientId !== "string") {
    return jsonResponse({ error: "clientId is required" }, 400);
  }

  try {
    const privaxis = await getPrivaxisInstance(env);
    const dsar = await privaxis.handleDSAR(
      body.type as DSARType,
      body.clientId,
      env
    );

    return jsonResponse({ dsar }, 201);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to process DSAR";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/privaxis/security — security posture
// =============================================================================

export async function handlePrivaxisSecurity(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const privaxis = await getPrivaxisInstance(env);
    const posture = await privaxis.getSecurityPosture(env);

    return jsonResponse(posture);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to get security posture";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/privaxis/security/events — security event log
// =============================================================================

export async function handlePrivaxisSecurityEvents(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") ?? "50", 10);

    if (isNaN(limit) || limit < 1 || limit > 100) {
      return jsonResponse(
        { error: "Invalid limit parameter. Use 1-100." },
        400
      );
    }

    const privaxis = await getPrivaxisInstance(env);
    const events = await privaxis.getSecurityEvents(env, limit);

    return jsonResponse({
      events,
      total: events.length,
      limit,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to get security events";
    return jsonResponse({ error: message }, 500);
  }
}

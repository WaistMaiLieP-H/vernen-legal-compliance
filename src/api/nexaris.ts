/**
 * NEXARIS API Route Handlers
 *
 * Founder-only strategic partnerships & reputation endpoints.
 * ALL routes require Bearer token authentication — partnership data is confidential.
 */

import type { Env } from "../index.js";
import { Nexaris } from "../personas/nexaris/index.js";
import { authenticate } from "./middleware/auth.js";
import { parseJsonBody } from "../utils/helpers.js";

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

let nexarisInstance: Nexaris | null = null;
let nexarisInitialized = false;

async function getNexarisInstance(env: Env): Promise<Nexaris> {
  if (!nexarisInstance) {
    nexarisInstance = new Nexaris();
  }
  if (!nexarisInitialized) {
    await nexarisInstance.initialize(env);
    nexarisInitialized = true;
  }
  return nexarisInstance;
}

function requireAuth(request: Request, env: Env): Response | null {
  return authenticate(request, env);
}

// =============================================================================
// GET /api/nexaris/status — operational status
// =============================================================================

export async function handleNexarisStatus(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const nexaris = await getNexarisInstance(env);
    const status = await nexaris.getStatus(env);

    return jsonResponse({
      ...status,
      wave: 8,
      domain: "Strategic Partnerships & Reputation",
      committee: "Investor Confidence",
      workers: ["ALLY-1"],
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to get NEXARIS status";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/nexaris/partnerships — full partnership pipeline
// =============================================================================

export async function handleNexarisPartnerships(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const nexaris = await getNexarisInstance(env);
    const pipeline = await nexaris.getPartnershipPipeline(env);

    return jsonResponse(pipeline);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to get partnership pipeline";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// POST /api/nexaris/evaluate — evaluate a potential partner
// =============================================================================

export async function handleNexarisEvaluate(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  let body: {
    partnerName: string;
    industry: string;
    description: string;
  };

  try {
    body = await parseJsonBody<typeof body>(request);
  } catch {
    return jsonResponse({ error: "Invalid JSON in request body" }, 400);
  }

  if (!body.partnerName || typeof body.partnerName !== "string") {
    return jsonResponse({ error: "partnerName is required" }, 400);
  }
  if (!body.industry || typeof body.industry !== "string") {
    return jsonResponse({ error: "industry is required" }, 400);
  }
  if (!body.description || typeof body.description !== "string") {
    return jsonResponse({ error: "description is required" }, 400);
  }

  try {
    const nexaris = await getNexarisInstance(env);
    const evaluation = await nexaris.assessPartner(
      body.partnerName,
      body.industry,
      body.description,
      env
    );

    return jsonResponse({
      citizen: "NEXARIS",
      ...evaluation,
    }, 201);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to evaluate partner";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/nexaris/reputation — platform reputation score
// =============================================================================

export async function handleNexarisReputation(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const nexaris = await getNexarisInstance(env);
    const reputation = await nexaris.getReputationScore(env);

    return jsonResponse({
      citizen: "NEXARIS",
      ...reputation,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to get reputation score";
    return jsonResponse({ error: message }, 500);
  }
}

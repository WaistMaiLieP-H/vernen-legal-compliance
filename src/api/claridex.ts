/**
 * CLARIDEX API Route Handlers
 *
 * Founder-only financial disclosure & reporting standards endpoints.
 * ALL routes require Bearer token authentication — these are auditable financials.
 */

import type { Env } from "../index.js";
import { Claridex } from "../personas/claridex/index.js";
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

let claridexInstance: Claridex | null = null;
let claridexInitialized = false;

async function getClaridexInstance(env: Env): Promise<Claridex> {
  if (!claridexInstance) {
    claridexInstance = new Claridex();
  }
  if (!claridexInitialized) {
    await claridexInstance.initialize(env);
    claridexInitialized = true;
  }
  return claridexInstance;
}

function requireAuth(request: Request, env: Env): Response | null {
  return authenticate(request, env);
}

// =============================================================================
// GET /api/claridex/status — operational status
// =============================================================================

export async function handleClaridexStatus(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const claridex = await getClaridexInstance(env);
    const status = await claridex.getStatus(env);

    return jsonResponse({
      ...status,
      wave: 8,
      domain: "Financial Disclosure & Reporting Standards",
      committee: "Investor Confidence",
      workers: ["GAAP-1"],
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to get CLARIDEX status";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/claridex/financials?period=month — generate financial statements
// =============================================================================

export async function handleClaridexFinancials(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const url = new URL(request.url);
    const period = url.searchParams.get("period") ?? "month";

    if (!["day", "week", "month", "quarter", "year", "all"].includes(period)) {
      return jsonResponse(
        { error: "Invalid period. Use: day, week, month, quarter, year, all" },
        400
      );
    }

    const claridex = await getClaridexInstance(env);
    const statements = await claridex.generateFinancialStatement(period, env);

    return jsonResponse(statements);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to generate financial statements";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/claridex/disclosure — disclosure compliance status
// =============================================================================

export async function handleClaridexDisclosure(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const claridex = await getClaridexInstance(env);
    const disclosure = await claridex.getDisclosureStatus(env);

    return jsonResponse({
      citizen: "CLARIDEX",
      ...disclosure,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to get disclosure status";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/claridex/audit-readiness — audit readiness assessment
// =============================================================================

export async function handleClaridexAuditReadiness(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const claridex = await getClaridexInstance(env);
    const readiness = await claridex.getAuditReadiness(env);

    return jsonResponse({
      citizen: "CLARIDEX",
      ...readiness,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to assess audit readiness";
    return jsonResponse({ error: message }, 500);
  }
}

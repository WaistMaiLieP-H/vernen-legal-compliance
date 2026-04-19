/**
 * Universal Outreach API Routes
 *
 * Generates professional compliance outreach emails for leads
 * from ALL 40 intelligence pipelines. The analysis is free.
 * The information is free. Revenue is professional services.
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { rateLimit } from "./middleware/rate-limit.js";
import {
  generateBatchOutreach,
  generateAllOutreach,
  getOutreachStats,
  getOutreachLog,
  PIPELINE_TABLES,
} from "../services/outreach-engine.js";

type RouteParams = Record<string, string>;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// Route Handlers
// ═══════════════════════════════════════════════════════════════════════════

/**
 * GET /api/outreach/generate/:agency — Generate outreach for top leads from a specific agency
 *
 * Query params: limit (max 50), min_score (default 25)
 * Authenticated.
 */
export async function handleOutreachGenerateAgency(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const agency = params["agency"];
  if (!agency) {
    return json({ error: "agency parameter is required" }, 400);
  }

  // Validate agency exists
  const validAgency = PIPELINE_TABLES.find(
    p => p.agency.toLowerCase() === agency.toLowerCase()
  );
  if (!validAgency) {
    return json({
      error: `Unknown agency: ${agency}`,
      validAgencies: PIPELINE_TABLES.map(p => p.agency),
    }, 400);
  }

  const url = new URL(request.url);
  const limit = url.searchParams.has("limit")
    ? parseInt(url.searchParams.get("limit")!, 10)
    : 10;
  const minScore = url.searchParams.has("min_score")
    ? parseInt(url.searchParams.get("min_score")!, 10)
    : 25;

  try {
    const result = await generateBatchOutreach(env.DB, agency, { limit, minScore });

    return json({
      agency: result.agency,
      outreach: result.outreach,
      count: result.count,
      filters: { limit, minScore },
    });
  } catch (error) {
    return json({
      error: "Failed to generate outreach",
      detail: error instanceof Error ? error.message : "Unknown error",
    }, 500);
  }
}

/**
 * GET /api/outreach/generate — Generate outreach across ALL agencies (top 5 per agency)
 *
 * Query params: per_agency (default 5, max 10), min_score (default 40)
 * Authenticated.
 */
export async function handleOutreachGenerateAll(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const url = new URL(request.url);
  const perAgency = Math.min(
    url.searchParams.has("per_agency")
      ? parseInt(url.searchParams.get("per_agency")!, 10)
      : 5,
    10,
  );
  const minScore = url.searchParams.has("min_score")
    ? parseInt(url.searchParams.get("min_score")!, 10)
    : 40;

  try {
    const result = await generateAllOutreach(env.DB, perAgency, minScore);

    return json({
      outreach: result.outreach,
      totalCount: result.totalCount,
      agencyCounts: result.agencyCounts,
      pipelines: PIPELINE_TABLES.length,
      filters: { perAgency, minScore },
    });
  } catch (error) {
    return json({
      error: "Failed to generate outreach",
      detail: error instanceof Error ? error.message : "Unknown error",
    }, 500);
  }
}

/**
 * GET /api/outreach/stats — Outreach statistics
 *
 * Authenticated.
 */
export async function handleOutreachStats(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    const stats = await getOutreachStats(env.DB);
    return json(stats);
  } catch (error) {
    return json({
      error: "Failed to retrieve outreach stats",
      detail: error instanceof Error ? error.message : "Unknown error",
    }, 500);
  }
}

/**
 * GET /api/outreach/log — Outreach history
 *
 * Query params: agency, status (GENERATED/SENT/OPENED/RESPONDED), limit (default 100, max 500)
 * Authenticated.
 */
export async function handleOutreachLog(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const url = new URL(request.url);
  const agency = url.searchParams.get("agency") ?? undefined;
  const status = url.searchParams.get("status") ?? undefined;
  const limit = url.searchParams.has("limit")
    ? parseInt(url.searchParams.get("limit")!, 10)
    : 100;

  try {
    const log = await getOutreachLog(env.DB, { agency, status, limit });

    return json({
      log,
      count: log.length,
      filters: { agency: agency ?? "ALL", status: status ?? "ALL", limit },
    });
  } catch (error) {
    return json({
      error: "Failed to retrieve outreach log",
      detail: error instanceof Error ? error.message : "Unknown error",
    }, 500);
  }
}

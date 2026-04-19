/**
 * Pipeline Analytics API Routes
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { rateLimit } from "./middleware/rate-limit.js";
import { PipelineAnalyticsEngine, ensureAnalyticsTables, storeAnalyticsSnapshot, getAnalyticsTrend } from "../services/pipeline-analytics.js";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

/** GET /api/analytics — Full platform analytics */
export async function handleAnalyticsFull(request: Request, env: Env): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const engine = new PipelineAnalyticsEngine();
  const analytics = await engine.getFullAnalytics(env.DB);

  // Store snapshot for trending
  await ensureAnalyticsTables(env.DB);
  await storeAnalyticsSnapshot(env.DB, analytics);

  return json(analytics);
}

/** GET /api/analytics/quick — Quick stats (fewer D1 calls) */
export async function handleAnalyticsQuick(request: Request, env: Env): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const engine = new PipelineAnalyticsEngine();
  const stats = await engine.getQuickStats(env.DB);
  return json(stats);
}

/** GET /api/analytics/agency/:agency — Deep dive on single agency */
export async function handleAnalyticsAgency(request: Request, env: Env, _ctx: ExecutionContext, params: Record<string, string>): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const agency = params["agency"] ?? "";
  if (!agency) return json({ error: "Agency parameter required" }, 400);

  const engine = new PipelineAnalyticsEngine();
  const deepDive = await engine.getAgencyDeepDive(env.DB, agency);

  if (!deepDive.found) return json({ error: `Agency '${agency}' not found` }, 404);
  return json(deepDive);
}

/** GET /api/analytics/trend — Trending data over time */
export async function handleAnalyticsTrend(request: Request, env: Env): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  await ensureAnalyticsTables(env.DB);
  const url = new URL(request.url);
  const days = Math.min(Number(url.searchParams.get("days") ?? 30), 365);
  const trend = await getAnalyticsTrend(env.DB, days);
  return json({ days, snapshots: trend });
}

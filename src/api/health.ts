/**
 * Pipeline Health API Routes
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { rateLimit } from "./middleware/rate-limit.js";
import { PipelineHealthMonitor } from "../services/pipeline-health.js";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

/** GET /api/health/pipelines — Full pipeline health dashboard */
export async function handlePipelineHealth(request: Request, env: Env): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const monitor = new PipelineHealthMonitor();
  const health = await monitor.getFullHealth(env.DB);
  return json(health);
}

/** GET /api/health/pipelines/:pipeline — Single pipeline run history */
export async function handlePipelineHistoryRoute(request: Request, env: Env, _ctx: ExecutionContext, params: Record<string, string>): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;

  const pipeline = params["pipeline"] ?? "";
  if (!pipeline) return json({ error: "Pipeline parameter required" }, 400);

  const monitor = new PipelineHealthMonitor();
  const history = await monitor.getPipelineHistory(env.DB, pipeline.toUpperCase());
  return json({ pipeline: pipeline.toUpperCase(), runs: history });
}

/** POST /api/health/cleanup — Remove old run data */
export async function handlePipelineCleanup(request: Request, env: Env): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;

  const monitor = new PipelineHealthMonitor();
  const removed = await monitor.cleanup(env.DB);
  return json({ removed, message: `Cleaned up ${removed} old pipeline runs` });
}

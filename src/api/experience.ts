/**
 * Experience Generation API Routes
 *
 * POST /api/experience/seed     — Seed all 40 pipeline lead tables with realistic data
 * POST /api/experience/train    — Run full taxonomy→skills→citizens→executions chain
 * POST /api/experience/generate — Seed + train in sequence
 * GET  /api/experience/status   — Current experience stats per citizen
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { rateLimit } from "./middleware/rate-limit.js";
import { ExperienceEngine } from "../services/experience-engine.js";

type RouteParams = Record<string, string>;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// POST /api/experience/seed
// ═══════════════════════════════════════════════════════════════════════════

export async function handleExperienceSeed(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const engine = new ExperienceEngine(env);
  const result = await engine.seed();

  return json({
    success: true,
    action: "seed",
    ...result,
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// POST /api/experience/train
// ═══════════════════════════════════════════════════════════════════════════

export async function handleExperienceTrain(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const engine = new ExperienceEngine(env);
  const result = await engine.train();

  return json({
    success: true,
    action: "train",
    ...result,
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// POST /api/experience/generate
// ═══════════════════════════════════════════════════════════════════════════

export async function handleExperienceGenerate(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const engine = new ExperienceEngine(env);

  // Phase 1: Seed
  const seedResult = await engine.seed();

  // Phase 2: Train
  const trainResult = await engine.train();

  return json({
    success: true,
    action: "generate",
    seed: seedResult,
    train: trainResult,
    totalDurationMs: seedResult.durationMs + trainResult.durationMs,
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// GET /api/experience/status
// ═══════════════════════════════════════════════════════════════════════════

export async function handleExperienceStatus(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const engine = new ExperienceEngine(env);
  const status = await engine.getStatus();

  return json({
    success: true,
    ...status,
  });
}

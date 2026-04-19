/**
 * Pipeline Orchestrator API Routes
 *
 * POST /api/orchestrate            → Run full orchestration (ingest → discover → assemble)
 * POST /api/orchestrate/pipelines  → Run just intelligence pipeline ingestion
 * GET  /api/orchestrate/status     → Get last orchestration report
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { PipelineOrchestrator } from "../services/pipeline-orchestrator.js";
import type { SourcePipeline } from "../services/failure-taxonomy.js";
import { parseJsonBody } from "../utils/helpers.js";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * POST /api/orchestrate — Run full orchestration pipeline.
 *
 * Body (all optional):
 *   pipelines: string[]  — subset of pipeline names (default: all 40)
 *   limit: number        — max leads per pipeline (default: 50)
 *   autoDeploy: boolean  — auto-deploy assembled Citizens (default: false)
 *   minConfidence: number — min skill confidence (default: 0.2)
 *   minFailures: number  — min backing failures (default: 5)
 *   skipIngest: boolean   — skip ingest, run discovery+assembly only (default: false)
 */
export async function handleOrchestrate(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  let body: Record<string, unknown> = {};
  try {
    body = await parseJsonBody(request) as Record<string, unknown>;
  } catch {
    // Empty body is fine — all options are optional
  }

  const orchestrator = new PipelineOrchestrator(env);
  const report = await orchestrator.orchestrate({
    pipelines: Array.isArray(body.pipelines)
      ? (body.pipelines as string[]).map(p => p.toUpperCase() as SourcePipeline)
      : undefined,
    limit: typeof body.limit === "number" ? body.limit : undefined,
    autoDeploy: typeof body.autoDeploy === "boolean" ? body.autoDeploy : undefined,
    minConfidence: typeof body.minConfidence === "number" ? body.minConfidence : undefined,
    minFailures: typeof body.minFailures === "number" ? body.minFailures : undefined,
    skipIngest: typeof body.skipIngest === "boolean" ? body.skipIngest : undefined,
  });

  return json(report);
}

/**
 * POST /api/orchestrate/pipelines — Run just intelligence pipeline ingestion.
 *
 * Body (all optional):
 *   pipelines: string[]  — subset of pipeline names (default: all 40)
 *   limit: number        — max leads per pipeline (default: 50)
 */
export async function handleOrchestratePipelines(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  let body: Record<string, unknown> = {};
  try {
    body = await parseJsonBody(request) as Record<string, unknown>;
  } catch {
    // Empty body is fine
  }

  const orchestrator = new PipelineOrchestrator(env);
  const report = await orchestrator.ingestPipelines({
    pipelines: Array.isArray(body.pipelines)
      ? (body.pipelines as string[]).map(p => p.toUpperCase() as SourcePipeline)
      : undefined,
    limit: typeof body.limit === "number" ? body.limit : undefined,
  });

  return json(report);
}

/**
 * GET /api/orchestrate/status — Get last orchestration report.
 */
export async function handleOrchestrateStatus(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const orchestrator = new PipelineOrchestrator(env);
  const report = await orchestrator.getLastReport();

  if (!report) {
    return json({
      status: "NO_RUNS",
      message: "No orchestration has been run yet. POST /api/orchestrate to start one.",
    });
  }

  return json(report);
}

import type { Env } from "../index.js";
import type { SubmitTaskRequest } from "../workers/forge-0/types.js";
import { BuildPhase, BuildTaskStatus } from "../workers/forge-0/types.js";
import { Forge0Worker } from "../workers/forge-0/index.js";
import { authenticate } from "./middleware/auth.js";
import { parseJsonBody } from "../utils/helpers.js";

type RouteParams = Record<string, string>;

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

const forge = new Forge0Worker();

/**
 * GET /api/forge/status
 *
 * Returns current build phase, active milestone, and task queue.
 * Public read — no auth required.
 */
export async function handleForgeStatus(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  try {
    const status = await forge.getStatus(env);
    return jsonResponse({ ok: true, data: status });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to read build status";
    return jsonResponse({ ok: false, error: message }, 500);
  }
}

/**
 * GET /api/forge/log
 *
 * Returns the full build log from D1, grouped by task.
 * Public read — no auth required.
 */
export async function handleForgeLog(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  try {
    const logs = await forge.getFullBuildLog(env);
    return jsonResponse({ ok: true, data: logs });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to read build log";
    return jsonResponse({ ok: false, error: message }, 500);
  }
}

/**
 * GET /api/forge/milestone/:id
 *
 * Returns the status of a specific milestone.
 * Public read — no auth required.
 */
export async function handleForgeMilestone(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const milestoneId = params["id"];
  if (!milestoneId) {
    return jsonResponse({ ok: false, error: "Milestone ID is required" }, 400);
  }

  try {
    const milestone = await forge.getMilestoneStatus(
      milestoneId,
      env.KNOWLEDGE_STORE
    );
    if (!milestone) {
      return jsonResponse(
        { ok: false, error: `Milestone ${milestoneId} not found` },
        404
      );
    }
    return jsonResponse({ ok: true, data: milestone });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to read milestone status";
    return jsonResponse({ ok: false, error: message }, 500);
  }
}

/**
 * POST /api/forge/task
 *
 * Submit a new build task. Founder-only (requires API key).
 *
 * Body: { name, description, phase, milestone, priority?, assignedWorker?, dependencies? }
 *
 * If `execute` query param is "true", the task is created AND
 * executed immediately. Otherwise it is only queued.
 */
export async function handleForgeSubmitTask(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  // Founder-only gate
  const authError = authenticate(request, env);
  if (authError) return authError;

  let body: SubmitTaskRequest;
  try {
    body = await parseJsonBody<SubmitTaskRequest>(request);
  } catch {
    return jsonResponse({ ok: false, error: "Invalid JSON body" }, 400);
  }

  // Validate required fields
  if (!body.name || !body.description || !body.phase || !body.milestone) {
    return jsonResponse(
      {
        ok: false,
        error:
          "Missing required fields: name, description, phase, milestone",
      },
      400
    );
  }

  // Validate phase enum
  if (!Object.values(BuildPhase).includes(body.phase)) {
    return jsonResponse(
      {
        ok: false,
        error: `Invalid phase. Must be one of: ${Object.values(BuildPhase).join(", ")}`,
      },
      400
    );
  }

  try {
    const task = await forge.createTask(body, env.KNOWLEDGE_STORE);

    // Check if caller wants immediate execution
    const url = new URL(request.url);
    const executeNow = url.searchParams.get("execute") === "true";

    if (executeNow) {
      const logEntry = await forge.executeBuildTask(task, env);
      // Re-read the task after execution to get final state
      const finalTask = await forge.getTask(task.id, env.KNOWLEDGE_STORE);
      return jsonResponse(
        {
          ok: true,
          data: {
            task: finalTask ?? task,
            executed: true,
            logEntry,
          },
        },
        201
      );
    }

    return jsonResponse({ ok: true, data: { task, executed: false } }, 201);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create task";
    return jsonResponse({ ok: false, error: message }, 500);
  }
}

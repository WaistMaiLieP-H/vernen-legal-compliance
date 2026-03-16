import type { Env } from "../index.js";
import { DynamicCitizen } from "./dynamic-citizen.js";
import { getDeploymentStatus } from "./deployer.js";
import { parseJsonBody } from "../utils/helpers.js";

/**
 * Handle a dynamic route for a deployed Citizen.
 *
 * All dynamic Citizens are accessed under /api/citizens/{name}/{action}
 * so they never conflict with the 15 core Citizen routes (which are under
 * /api/regulis/*, /api/advocis/*, etc.).
 *
 * Supported actions:
 *   GET  /api/citizens/{name}/status      — Citizen status
 *   GET  /api/citizens/{name}/knowledge   — knowledge query (?q=...)
 *   POST /api/citizens/{name}/event       — send event { type, payload }
 *   GET  /api/citizens/{name}/activity    — activity log (?limit=N)
 *   GET  /api/citizens/{name}/workers     — worker list and status
 */
export async function handleDynamicRoute(
  citizenName: string,
  action: string,
  request: Request,
  env: Env
): Promise<Response> {
  // Look up the deployed Citizen
  const deployment = await getDeploymentStatus(citizenName, env);

  if (!deployment) {
    return jsonResponse(
      {
        error: `Citizen "${citizenName}" is not deployed or does not exist`,
        hint: "Check /api/engine/deployed for active Citizens",
      },
      404
    );
  }

  // Instantiate the dynamic Citizen runtime
  const citizen = new DynamicCitizen(
    deployment.spec,
    deployment.deploymentId,
    deployment.kvPrefix
  );
  await citizen.initialize(env);

  // Route to the appropriate action
  switch (action) {
    case "status": {
      if (request.method !== "GET") return methodNotAllowed();
      const status = await citizen.getStatus(env);
      return jsonResponse({
        citizen: status,
        deployment: {
          id: deployment.deploymentId,
          deployedAt: deployment.deployedAt,
          apiBasePath: deployment.apiBasePath,
        },
      });
    }

    case "knowledge": {
      if (request.method !== "GET") return methodNotAllowed();
      const url = new URL(request.url);
      const query = url.searchParams.get("q") ?? "";
      if (!query) {
        return jsonResponse({ error: "Query parameter 'q' is required" }, 400);
      }
      const results = await citizen.queryKnowledge(query, env);
      return jsonResponse(results);
    }

    case "event": {
      if (request.method !== "POST") return methodNotAllowed();
      const body = await parseJsonBody<{ type: string; payload?: unknown }>(request);
      if (!body.type) {
        return jsonResponse({ error: "Event 'type' is required in request body" }, 400);
      }
      await citizen.receiveEvent(body.type, body.payload ?? {}, env);
      return jsonResponse({
        success: true,
        citizen: citizenName.toUpperCase(),
        event: body.type,
        processedAt: new Date().toISOString(),
      });
    }

    case "activity": {
      if (request.method !== "GET") return methodNotAllowed();
      const url = new URL(request.url);
      const limit = parseInt(url.searchParams.get("limit") ?? "50", 10);
      const log = await citizen.getActivityLog(Math.min(limit, 200), env);
      return jsonResponse({
        citizen: citizenName.toUpperCase(),
        activityCount: log.length,
        activity: log,
      });
    }

    case "workers": {
      if (request.method !== "GET") return methodNotAllowed();
      const status = await citizen.getStatus(env);
      return jsonResponse({
        citizen: citizenName.toUpperCase(),
        workerCount: status.workers.length,
        workers: status.workers,
      });
    }

    default:
      return jsonResponse(
        {
          error: `Unknown action: ${action}`,
          availableActions: ["status", "knowledge", "event", "activity", "workers"],
        },
        404
      );
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function methodNotAllowed(): Response {
  return jsonResponse({ error: "Method not allowed" }, 405);
}

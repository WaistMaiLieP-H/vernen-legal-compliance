import type { Env } from "../index.js";
import { handleComplianceCheck } from "./compliance.js";
import { handleGetReport } from "./reports.js";
import { authenticate } from "./middleware/auth.js";
import { rateLimit } from "./middleware/rate-limit.js";

type RouteParams = Record<string, string>;

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const handleApiRoutes = {
  complianceCheck: async (
    request: Request,
    env: Env,
    _ctx: ExecutionContext,
    _params: RouteParams
  ): Promise<Response> => {
    const authError = authenticate(request, env);
    if (authError) return authError;

    const rateLimitError = await rateLimit(request, env);
    if (rateLimitError) return rateLimitError;

    try {
      return await handleComplianceCheck(request, env);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Compliance check failed";
      return jsonResponse({ error: message }, 500);
    }
  },

  getReport: async (
    request: Request,
    env: Env,
    _ctx: ExecutionContext,
    params: RouteParams
  ): Promise<Response> => {
    const authError = authenticate(request, env);
    if (authError) return authError;

    const rateLimitError = await rateLimit(request, env);
    if (rateLimitError) return rateLimitError;

    const reportId = params["id"];
    if (!reportId) {
      return jsonResponse({ error: "Report ID is required" }, 400);
    }

    try {
      return await handleGetReport(reportId, env);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to retrieve report";
      return jsonResponse({ error: message }, 500);
    }
  },
};

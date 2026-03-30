/**
 * corrective-action.ts — API endpoint for generating corrective action plans
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { rateLimit } from "./middleware/rate-limit.js";
import { parseJsonBody } from "../utils/helpers.js";
import {
  generateCorrectiveActionPlan,
  renderCAPtoMarkdown,
} from "../services/corrective-action.js";
import type { AuditFinding } from "../services/corrective-action.js";

/**
 * POST /api/corrective-action
 * Generate a corrective action plan from audit findings.
 *
 * Body: {
 *   entityName: string,
 *   auditReportId: string,
 *   auditYear: string,
 *   findings: AuditFinding[],
 *   format?: "json" | "markdown"
 * }
 */
export async function handleCorrectiveAction(
  request: Request,
  env: Env,
): Promise<Response> {
  const authResult = await authenticate(request, env);
  if (authResult) return authResult;

  const rlResult = await rateLimit(request, env);
  if (rlResult) return rlResult;

  const body = await parseJsonBody<{
    entityName: string;
    auditReportId: string;
    auditYear: string;
    findings: AuditFinding[];
    format?: "json" | "markdown";
  }>(request);

  if (!body || !body.entityName || !body.findings || body.findings.length === 0) {
    return new Response(
      JSON.stringify({ error: "entityName and findings[] are required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const cap = generateCorrectiveActionPlan(
    body.entityName,
    body.auditReportId || "unknown",
    body.auditYear || new Date().getFullYear().toString(),
    body.findings,
  );

  if (body.format === "markdown") {
    const markdown = renderCAPtoMarkdown(cap);
    return new Response(markdown, {
      headers: { "Content-Type": "text/markdown; charset=utf-8" },
    });
  }

  return new Response(JSON.stringify(cap, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
}

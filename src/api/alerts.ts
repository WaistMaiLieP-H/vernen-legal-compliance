/**
 * Alert & Notification API Routes
 *
 * Provides endpoints for managing pipeline risk alerts:
 * - List, filter, and paginate active alerts
 * - Trigger scans across all 40 pipelines
 * - Acknowledge, resolve, or dismiss individual alerts
 * - Get aggregate statistics by severity and status
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { rateLimit } from "./middleware/rate-limit.js";
import { AlertEngine } from "../services/alert-engine.js";
import type { AlertSeverity, AlertStatus } from "../services/alert-engine.js";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

const engine = new AlertEngine();

/** GET /api/alerts — List active alerts with optional filters */
export async function handleAlertsList(request: Request, env: Env): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const url = new URL(request.url);
  const severity = url.searchParams.get("severity")?.toUpperCase() as AlertSeverity | undefined;
  const pipeline = url.searchParams.get("pipeline") ?? undefined;
  const status = url.searchParams.get("status")?.toUpperCase() as AlertStatus | undefined;
  const limit = Math.min(Number(url.searchParams.get("limit") ?? 50), 200);
  const offset = Number(url.searchParams.get("offset") ?? 0);

  // Validate enum values if provided
  if (severity && !["CRITICAL", "HIGH", "MEDIUM", "LOW"].includes(severity)) {
    return json({ error: "Invalid severity. Must be CRITICAL, HIGH, MEDIUM, or LOW" }, 400);
  }
  if (status && !["NEW", "ACKNOWLEDGED", "RESOLVED", "DISMISSED"].includes(status)) {
    return json({ error: "Invalid status. Must be NEW, ACKNOWLEDGED, RESOLVED, or DISMISSED" }, 400);
  }

  const result = await engine.getActiveAlerts(env.DB, { severity, pipeline, status, limit, offset });
  return json(result);
}

/** GET /api/alerts/stats — Alert counts by severity and status */
export async function handleAlertsStats(request: Request, env: Env): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const stats = await engine.getAlertStats(env.DB);
  return json(stats);
}

/** POST /api/alerts/scan — Trigger alert scan across all pipelines */
export async function handleAlertsScan(request: Request, env: Env): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const result = await engine.scanForAlerts(env.DB);
  return json(result);
}

/** POST /api/alerts/:id/acknowledge — Acknowledge an alert */
export async function handleAlertAcknowledge(request: Request, env: Env, _ctx: ExecutionContext, params: Record<string, string>): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const id = params["id"] ?? "";
  if (!id) return json({ error: "Alert ID required" }, 400);

  const result = await engine.acknowledgeAlert(env.DB, id);
  if (!result.success) return json({ error: result.error }, result.error === "Alert not found" ? 404 : 409);
  return json({ success: true, id, status: "ACKNOWLEDGED" });
}

/** POST /api/alerts/:id/resolve — Resolve an alert */
export async function handleAlertResolve(request: Request, env: Env, _ctx: ExecutionContext, params: Record<string, string>): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const id = params["id"] ?? "";
  if (!id) return json({ error: "Alert ID required" }, 400);

  const result = await engine.resolveAlert(env.DB, id);
  if (!result.success) return json({ error: result.error }, result.error === "Alert not found" ? 404 : 409);
  return json({ success: true, id, status: "RESOLVED" });
}

/** POST /api/alerts/:id/dismiss — Dismiss an alert */
export async function handleAlertDismiss(request: Request, env: Env, _ctx: ExecutionContext, params: Record<string, string>): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const id = params["id"] ?? "";
  if (!id) return json({ error: "Alert ID required" }, 400);

  const result = await engine.dismissAlert(env.DB, id);
  if (!result.success) return json({ error: result.error }, result.error === "Alert not found" ? 404 : 409);
  return json({ success: true, id, status: "DISMISSED" });
}

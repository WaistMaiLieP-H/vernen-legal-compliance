/**
 * MSHA Intelligence API Routes
 *
 * Exposes the MSHA mine safety enforcement pipeline.
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import {
  MSHAIntelligenceService,
  ensureMSHATables,
  getStoredMSHALeads,
} from "../services/msha-intelligence.js";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

/** GET /api/msha/status */
export async function handleMSHAStatus(_request: Request, _env: Env): Promise<Response> {
  return json({
    citizen: "MSHA-INTELLIGENCE",
    status: "ACTIVE",
    description: "MSHA mine safety enforcement intelligence pipeline",
    capabilities: ["Mine violation tracking", "S&S violation analysis", "Penalty monitoring", "Pattern of violations detection", "Accident investigation tracking"],
    source: "MSHA Mine Safety Data (api.dol.gov)",
    dataScope: "All MSHA mine safety violations, penalties, and inspection data",
  });
}

/** GET /api/msha/search */
export async function handleMSHASearch(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    const url = new URL(request.url);
    const svc = new MSHAIntelligenceService();
    const result = await svc.fetchViolations({
      state: url.searchParams.get("state") ?? undefined,
      operatorName: url.searchParams.get("operator") ?? undefined,
      violationType: url.searchParams.get("type") ?? undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json({ violations: result.violations, count: result.violations.length, total: result.total });
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

/** GET /api/msha/pipeline */
export async function handleMSHAPipeline(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    const url = new URL(request.url);
    const svc = new MSHAIntelligenceService();
    const result = await svc.runPipeline(env.DB, {
      state: url.searchParams.get("state") ?? undefined,
      operatorName: url.searchParams.get("operator") ?? undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json(result);
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

/** GET /api/msha/leads */
export async function handleMSHALeads(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    await ensureMSHATables(env.DB);
    const url = new URL(request.url);
    const leads = await getStoredMSHALeads(env.DB, {
      state: url.searchParams.get("state") ?? undefined,
      operatorName: url.searchParams.get("operator") ?? undefined,
      minScore: url.searchParams.has("min_score") ? parseInt(url.searchParams.get("min_score")!, 10) : undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json({ leads, count: leads.length });
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

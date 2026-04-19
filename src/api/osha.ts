/**
 * OSHA Intelligence API Routes
 *
 * Exposes the DOL/OSHA workplace safety enforcement pipeline.
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import {
  OSHAIntelligenceService,
  ensureOSHATables,
  getStoredLeads,
} from "../services/osha-intelligence.js";

type RouteParams = Record<string, string>;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

/** GET /api/osha/status */
export async function handleOSHAStatus(_request: Request, _env: Env): Promise<Response> {
  return json({
    citizen: "OSHA-INTELLIGENCE",
    status: "ACTIVE",
    description: "DOL/OSHA workplace safety enforcement intelligence pipeline",
    capabilities: ["OSHA inspection tracking", "Violation severity scoring", "Fatality/hospitalization monitoring", "Penalty analysis", "Industry risk profiling"],
    source: "DOL Enforcement Data (enforcedata.dol.gov)",
    dataScope: "All OSHA inspections, violations, and penalties nationwide",
  });
}

/** GET /api/osha/discover */
export async function handleOSHADiscover(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    const url = new URL(request.url);
    const svc = new OSHAIntelligenceService();
    const inspections = await svc.fetchInspections({
      state: url.searchParams.get("state") ?? undefined,
      naics: url.searchParams.get("naics") ?? undefined,
      inspType: url.searchParams.get("type") ?? undefined,
      minPenalty: url.searchParams.has("min_penalty") ? parseInt(url.searchParams.get("min_penalty")!, 10) : undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json({ inspections, count: inspections.length });
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

/** GET /api/osha/pipeline */
export async function handleOSHAPipeline(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    const url = new URL(request.url);
    const svc = new OSHAIntelligenceService();
    const result = await svc.runPipeline(env.DB, {
      state: url.searchParams.get("state") ?? undefined,
      naics: url.searchParams.get("naics") ?? undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json(result);
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

/** GET /api/osha/leads */
export async function handleOSHALeads(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    await ensureOSHATables(env.DB);
    const url = new URL(request.url);
    const leads = await getStoredLeads(env.DB, {
      state: url.searchParams.get("state") ?? undefined,
      minScore: url.searchParams.has("min_score") ? parseInt(url.searchParams.get("min_score")!, 10) : undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json({ leads, count: leads.length });
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

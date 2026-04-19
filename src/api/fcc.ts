/**
 * FCC Intelligence API Routes
 *
 * Exposes the FCC telecommunications enforcement pipeline.
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import {
  FCCIntelligenceService,
  ensureFCCTables,
  getStoredFCCLeads,
} from "../services/fcc-intelligence.js";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

/** GET /api/fcc/status */
export async function handleFCCStatus(_request: Request, _env: Env): Promise<Response> {
  return json({
    citizen: "FCC-INTELLIGENCE",
    status: "ACTIVE",
    description: "FCC telecommunications enforcement intelligence pipeline",
    capabilities: ["TCPA/Robocall enforcement", "Spectrum violation tracking", "EAS compliance monitoring", "Tower violation detection", "Broadcasting enforcement"],
    source: "FCC Enforcement Bureau (opendata.fcc.gov)",
    dataScope: "All FCC enforcement actions — fines, forfeitures, consent decrees",
  });
}

/** GET /api/fcc/search */
export async function handleFCCSearch(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    const url = new URL(request.url);
    const svc = new FCCIntelligenceService();
    const result = await svc.fetchEnforcementActions({
      state: url.searchParams.get("state") ?? undefined,
      actionType: url.searchParams.get("action_type") ?? undefined,
      violationType: url.searchParams.get("violation_type") ?? undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json({ actions: result.actions, count: result.actions.length });
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

/** GET /api/fcc/pipeline */
export async function handleFCCPipeline(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    const url = new URL(request.url);
    const svc = new FCCIntelligenceService();
    const result = await svc.runPipeline(env.DB, {
      state: url.searchParams.get("state") ?? undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json(result);
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

/** GET /api/fcc/leads */
export async function handleFCCLeads(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    await ensureFCCTables(env.DB);
    const url = new URL(request.url);
    const leads = await getStoredFCCLeads(env.DB, {
      state: url.searchParams.get("state") ?? undefined,
      minScore: url.searchParams.has("min_score") ? parseInt(url.searchParams.get("min_score")!, 10) : undefined,
      minAmount: url.searchParams.has("min_amount") ? parseInt(url.searchParams.get("min_amount")!, 10) : undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json({ leads, count: leads.length });
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

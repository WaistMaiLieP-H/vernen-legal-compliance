/**
 * FDA Intelligence API Routes
 *
 * Exposes the openFDA drug/food/device enforcement pipeline.
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import {
  FDAIntelligenceService,
  ensureFDATables,
  getStoredLeads,
} from "../services/fda-intelligence.js";

type RouteParams = Record<string, string>;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

/** GET /api/fda/status */
export async function handleFDAStatus(_request: Request, _env: Env): Promise<Response> {
  return json({
    citizen: "FDA-INTELLIGENCE",
    status: "ACTIVE",
    description: "openFDA enforcement intelligence pipeline — drugs, food, medical devices",
    capabilities: ["Drug recall tracking", "Food enforcement monitoring", "Medical device adverse events", "Classification risk scoring", "Firm compliance profiling"],
    source: "openFDA (api.fda.gov)",
    dataScope: "All FDA enforcement actions — recalls, warning letters, adverse events",
  });
}

/** GET /api/fda/search */
export async function handleFDASearch(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    const url = new URL(request.url);
    const productType = url.searchParams.get("product") ?? "drug";
    const svc = new FDAIntelligenceService();
    const result = await svc.fetchEnforcement(productType, {
      state: url.searchParams.get("state") ?? undefined,
      classification: url.searchParams.get("classification") ?? undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    const actions = Array.isArray(result) ? result : (result as { actions: unknown[] }).actions ?? [];
    return json({ actions, count: actions.length, productType });
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

/** GET /api/fda/pipeline */
export async function handleFDAPipeline(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    const url = new URL(request.url);
    const svc = new FDAIntelligenceService();
    const result = await svc.runPipeline(env.DB, {
      state: url.searchParams.get("state") ?? undefined,
      classification: url.searchParams.get("classification") ?? undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json(result);
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

/** GET /api/fda/leads */
export async function handleFDALeads(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    await ensureFDATables(env.DB);
    const url = new URL(request.url);
    const leads = await getStoredLeads(env.DB, {
      state: url.searchParams.get("state") ?? undefined,
      classification: url.searchParams.get("classification") ?? undefined,
      productType: url.searchParams.get("product") ?? undefined,
      minScore: url.searchParams.has("min_score") ? parseInt(url.searchParams.get("min_score")!, 10) : undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json({ leads, count: leads.length });
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

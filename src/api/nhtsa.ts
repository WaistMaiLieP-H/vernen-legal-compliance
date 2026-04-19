/**
 * NHTSA Intelligence API Routes
 *
 * Exposes the NHTSA vehicle safety enforcement pipeline.
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import {
  NHTSAIntelligenceService,
  ensureNHTSATables,
  getStoredNHTSALeads,
} from "../services/nhtsa-intelligence.js";

type RouteParams = Record<string, string>;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

/** GET /api/nhtsa/status */
export async function handleNHTSAStatus(_request: Request, _env: Env): Promise<Response> {
  return json({
    citizen: "NHTSA-INTELLIGENCE",
    status: "ACTIVE",
    description: "NHTSA vehicle safety enforcement intelligence pipeline — recalls, complaints, investigations",
    capabilities: ["Vehicle recall tracking", "Consumer complaint analysis", "Safety defect investigation monitoring", "Manufacturer risk scoring", "Component failure tracking"],
    source: "NHTSA (api.nhtsa.dot.gov)",
    dataScope: "All NHTSA vehicle safety recalls and complaints",
  });
}

/** GET /api/nhtsa/search */
export async function handleNHTSASearch(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    const url = new URL(request.url);
    const svc = new NHTSAIntelligenceService();
    const result = await svc.fetchRecalls({
      make: url.searchParams.get("make") ?? undefined,
      model: url.searchParams.get("model") ?? undefined,
      year: url.searchParams.get("year") ?? undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json({ recalls: result.recalls, count: result.recalls.length, total: result.total });
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

/** GET /api/nhtsa/pipeline */
export async function handleNHTSAPipeline(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    const url = new URL(request.url);
    const svc = new NHTSAIntelligenceService();
    const result = await svc.runPipeline(env.DB, {
      make: url.searchParams.get("make") ?? undefined,
      model: url.searchParams.get("model") ?? undefined,
      year: url.searchParams.get("year") ?? undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json(result);
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

/** GET /api/nhtsa/leads */
export async function handleNHTSALeads(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    await ensureNHTSATables(env.DB);
    const url = new URL(request.url);
    const leads = await getStoredNHTSALeads(env.DB, {
      make: url.searchParams.get("make") ?? undefined,
      minScore: url.searchParams.has("min_score") ? parseInt(url.searchParams.get("min_score")!, 10) : undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json({ leads, count: leads.length });
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

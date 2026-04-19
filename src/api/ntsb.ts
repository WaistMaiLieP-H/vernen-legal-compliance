/**
 * NTSB Intelligence API Routes
 *
 * Exposes the NTSB transportation accident investigation pipeline.
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import {
  NTSBIntelligenceService,
  ensureNTSBTables,
  getStoredNTSBLeads,
} from "../services/ntsb-intelligence.js";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

/** GET /api/ntsb/status */
export async function handleNTSBStatus(_request: Request, _env: Env): Promise<Response> {
  return json({
    citizen: "NTSB-INTELLIGENCE",
    status: "ACTIVE",
    description: "NTSB transportation accident investigation intelligence pipeline",
    capabilities: ["Aviation accident tracking", "Highway crash investigation", "Railroad incident analysis", "Marine casualty monitoring", "Pipeline accident investigation", "Safety recommendation tracking"],
    source: "NTSB Investigation Database (data.ntsb.gov)",
    dataScope: "All NTSB investigations — aviation, highway, rail, marine, pipeline",
  });
}

/** GET /api/ntsb/search */
export async function handleNTSBSearch(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    const url = new URL(request.url);
    const svc = new NTSBIntelligenceService();
    const result = await svc.fetchAllModes({
      mode: url.searchParams.get("mode") ?? undefined,
      state: url.searchParams.get("state") ?? undefined,
      year: url.searchParams.get("year") ?? undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json({ investigations: result.investigations, count: result.investigations.length, total: result.total });
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

/** GET /api/ntsb/pipeline */
export async function handleNTSBPipeline(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    const url = new URL(request.url);
    const svc = new NTSBIntelligenceService();
    const result = await svc.runPipeline(env.DB, {
      mode: url.searchParams.get("mode") ?? undefined,
      state: url.searchParams.get("state") ?? undefined,
      year: url.searchParams.get("year") ?? undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json(result);
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

/** GET /api/ntsb/leads */
export async function handleNTSBLeads(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    await ensureNTSBTables(env.DB);
    const url = new URL(request.url);
    const leads = await getStoredNTSBLeads(env.DB, {
      mode: url.searchParams.get("mode") ?? undefined,
      state: url.searchParams.get("state") ?? undefined,
      minScore: url.searchParams.has("min_score") ? parseInt(url.searchParams.get("min_score")!, 10) : undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json({ leads, count: leads.length });
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

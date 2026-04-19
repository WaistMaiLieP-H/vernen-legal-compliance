/**
 * SAM.gov Intelligence API Routes
 *
 * Exposes the SAM.gov entity exclusions pipeline.
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import {
  SAMIntelligenceService,
  ensureSAMTables,
  getStoredSAMLeads,
} from "../services/sam-intelligence.js";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

/** GET /api/sam/status */
export async function handleSAMStatus(_request: Request, _env: Env): Promise<Response> {
  return json({
    citizen: "SAM-INTELLIGENCE",
    status: "ACTIVE",
    description: "SAM.gov entity exclusion intelligence pipeline — debarments, suspensions, ineligibility",
    capabilities: ["Entity exclusion monitoring", "Debarment tracking", "Suspension alerts", "Reinstatement support", "Government-wide exclusion analysis"],
    source: "SAM.gov Entity Exclusion List (api.sam.gov)",
    dataScope: "All federally excluded entities — debarred, suspended, proposed for debarment, ineligible",
  });
}

/** GET /api/sam/search */
export async function handleSAMSearch(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    const url = new URL(request.url);
    const svc = new SAMIntelligenceService();
    const result = await svc.fetchExclusions({
      state: url.searchParams.get("state") ?? undefined,
      entityName: url.searchParams.get("entity") ?? undefined,
      exclusionType: url.searchParams.get("type") ?? undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json({ exclusions: result.exclusions, count: result.exclusions.length, total: result.total });
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

/** GET /api/sam/pipeline */
export async function handleSAMPipeline(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    const url = new URL(request.url);
    const svc = new SAMIntelligenceService();
    const result = await svc.runPipeline(env.DB, {
      state: url.searchParams.get("state") ?? undefined,
      entityName: url.searchParams.get("entity") ?? undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json(result);
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

/** GET /api/sam/leads */
export async function handleSAMLeads(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    await ensureSAMTables(env.DB);
    const url = new URL(request.url);
    const leads = await getStoredSAMLeads(env.DB, {
      state: url.searchParams.get("state") ?? undefined,
      exclusionType: url.searchParams.get("type") ?? undefined,
      minScore: url.searchParams.has("min_score") ? parseInt(url.searchParams.get("min_score")!, 10) : undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json({ leads, count: leads.length });
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

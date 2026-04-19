/**
 * USDA Intelligence API Routes
 *
 * Exposes the USDA FSIS food safety enforcement pipeline.
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import {
  USDAIntelligenceService,
  ensureUSDATables,
  getStoredUSDALeads,
} from "../services/usda-intelligence.js";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

/** GET /api/usda/status */
export async function handleUSDAStatus(_request: Request, _env: Env): Promise<Response> {
  return json({
    citizen: "USDA-INTELLIGENCE",
    status: "ACTIVE",
    description: "USDA FSIS food safety enforcement intelligence pipeline",
    capabilities: ["FSIS recall tracking", "HACCP violation monitoring", "Pathogen contamination alerts", "Allergen compliance", "Meat/poultry inspection failures"],
    source: "USDA FSIS (fsis.usda.gov)",
    dataScope: "All USDA FSIS recalls — meat, poultry, egg products",
  });
}

/** GET /api/usda/search */
export async function handleUSDASearch(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    const url = new URL(request.url);
    const svc = new USDAIntelligenceService();
    const result = await svc.fetchRecalls({
      state: url.searchParams.get("state") ?? undefined,
      classification: url.searchParams.get("classification") ?? undefined,
      reason: url.searchParams.get("reason") ?? undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json({ recalls: result.recalls, count: result.recalls.length, total: result.total });
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

/** GET /api/usda/pipeline */
export async function handleUSDAPipeline(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    const url = new URL(request.url);
    const svc = new USDAIntelligenceService();
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

/** GET /api/usda/leads */
export async function handleUSDALeads(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    await ensureUSDATables(env.DB);
    const url = new URL(request.url);
    const leads = await getStoredUSDALeads(env.DB, {
      state: url.searchParams.get("state") ?? undefined,
      classification: url.searchParams.get("classification") ?? undefined,
      minScore: url.searchParams.has("min_score") ? parseInt(url.searchParams.get("min_score")!, 10) : undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json({ leads, count: leads.length });
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

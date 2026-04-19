/**
 * HUD Intelligence API Routes
 */
import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { HUDIntelligenceService, ensureHUDTables, getStoredHUDLeads } from "../services/hud-intelligence.js";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

export async function handleHUDStatus(_r: Request, _e: Env): Promise<Response> {
  return json({ citizen: "HUD-INTELLIGENCE", status: "ACTIVE", description: "HUD fair housing & FHA enforcement intelligence pipeline", capabilities: ["Fair housing discrimination tracking", "FHA lender enforcement", "RESPA violations", "ADA/accessibility compliance"], source: "HUD (data.hud.gov)" });
}

export async function handleHUDSearch(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env); if (authErr) return authErr;
  try {
    const url = new URL(request.url);
    const svc = new HUDIntelligenceService();
    const result = await svc.fetchFairHousingCharges({ state: url.searchParams.get("state") ?? undefined, basis: url.searchParams.get("basis") ?? undefined, limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50 });
    return json({ actions: result.actions, count: result.actions.length });
  } catch (err: unknown) { return json({ error: err instanceof Error ? err.message : String(err) }, 500); }
}

export async function handleHUDPipeline(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env); if (authErr) return authErr;
  try {
    const url = new URL(request.url);
    const svc = new HUDIntelligenceService();
    return json(await svc.runPipeline(env.DB, { state: url.searchParams.get("state") ?? undefined, basis: url.searchParams.get("basis") ?? undefined, limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50 }));
  } catch (err: unknown) { return json({ error: err instanceof Error ? err.message : String(err) }, 500); }
}

export async function handleHUDLeads(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env); if (authErr) return authErr;
  try {
    await ensureHUDTables(env.DB);
    const url = new URL(request.url);
    const leads = await getStoredHUDLeads(env.DB, { state: url.searchParams.get("state") ?? undefined, violationType: url.searchParams.get("type") ?? undefined, minScore: url.searchParams.has("min_score") ? parseInt(url.searchParams.get("min_score")!, 10) : undefined, limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50 });
    return json({ leads, count: leads.length });
  } catch (err: unknown) { return json({ error: err instanceof Error ? err.message : String(err) }, 500); }
}

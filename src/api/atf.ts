/**
 * ATF Intelligence API Routes
 */
import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { ATFIntelligenceService, ensureATFTables, getStoredATFLeads } from "../services/atf-intelligence.js";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

export async function handleATFStatus(_r: Request, _e: Env): Promise<Response> {
  return json({ citizen: "ATF-INTELLIGENCE", status: "ACTIVE", description: "ATF firearms & explosives enforcement intelligence pipeline", capabilities: ["FFL revocation tracking", "Explosives violation monitoring", "Record-keeping compliance", "License application support"], source: "ATF (atf.gov / regulations.gov)" });
}

export async function handleATFPipeline(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env); if (authErr) return authErr;
  try {
    const url = new URL(request.url);
    const svc = new ATFIntelligenceService();
    return json(await svc.runPipeline(env.DB, { state: url.searchParams.get("state") ?? undefined, actionType: url.searchParams.get("action_type") ?? undefined, limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50 }));
  } catch (err: unknown) { return json({ error: err instanceof Error ? err.message : String(err) }, 500); }
}

export async function handleATFLeads(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env); if (authErr) return authErr;
  try {
    await ensureATFTables(env.DB);
    const url = new URL(request.url);
    const leads = await getStoredATFLeads(env.DB, { state: url.searchParams.get("state") ?? undefined, actionType: url.searchParams.get("action_type") ?? undefined, minScore: url.searchParams.has("min_score") ? parseInt(url.searchParams.get("min_score")!, 10) : undefined, limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50 });
    return json({ leads, count: leads.length });
  } catch (err: unknown) { return json({ error: err instanceof Error ? err.message : String(err) }, 500); }
}

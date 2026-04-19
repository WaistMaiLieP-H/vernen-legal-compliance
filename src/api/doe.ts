/**
 * DOE Intelligence API Routes
 */
import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { DOEIntelligenceService, ensureDOETables, getStoredDOELeads } from "../services/doe-intelligence.js";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

export async function handleDOEStatus(_r: Request, _e: Env): Promise<Response> {
  return json({ citizen: "DOE-INTELLIGENCE", status: "ACTIVE", description: "DOE energy enforcement intelligence pipeline", capabilities: ["Nuclear safety enforcement", "Energy efficiency standards", "Classified info violations", "Civil penalty tracking"], source: "DOE (energy.gov / regulations.gov)" });
}

export async function handleDOEPipeline(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env); if (authErr) return authErr;
  try {
    const url = new URL(request.url);
    const svc = new DOEIntelligenceService();
    return json(await svc.runPipeline(env.DB, { program: url.searchParams.get("program") ?? undefined, limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50 }));
  } catch (err: unknown) { return json({ error: err instanceof Error ? err.message : String(err) }, 500); }
}

export async function handleDOELeads(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env); if (authErr) return authErr;
  try {
    await ensureDOETables(env.DB);
    const url = new URL(request.url);
    const leads = await getStoredDOELeads(env.DB, { program: url.searchParams.get("program") ?? undefined, minScore: url.searchParams.has("min_score") ? parseInt(url.searchParams.get("min_score")!, 10) : undefined, limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50 });
    return json({ leads, count: leads.length });
  } catch (err: unknown) { return json({ error: err instanceof Error ? err.message : String(err) }, 500); }
}

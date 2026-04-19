/**
 * PHMSA Intelligence API Routes
 */
import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { PHMSAIntelligenceService, ensurePHMSATables, getStoredPHMSALeads } from "../services/phmsa-intelligence.js";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

export async function handlePHMSAStatus(_r: Request, _e: Env): Promise<Response> {
  return json({ citizen: "PHMSA-INTELLIGENCE", status: "ACTIVE", description: "PHMSA pipeline & hazmat safety intelligence pipeline", capabilities: ["Pipeline incident tracking", "Hazmat transportation violations", "Operator compliance monitoring", "Environmental release tracking"], source: "PHMSA (phmsa.dot.gov)" });
}

export async function handlePHMSASearch(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env); if (authErr) return authErr;
  try {
    const url = new URL(request.url);
    const svc = new PHMSAIntelligenceService();
    const result = await svc.fetchIncidents({ state: url.searchParams.get("state") ?? undefined, operator: url.searchParams.get("operator") ?? undefined, systemType: url.searchParams.get("system_type") ?? undefined, limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50 });
    return json({ incidents: result.incidents, count: result.incidents.length });
  } catch (err: unknown) { return json({ error: err instanceof Error ? err.message : String(err) }, 500); }
}

export async function handlePHMSAPipeline(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env); if (authErr) return authErr;
  try {
    const url = new URL(request.url);
    const svc = new PHMSAIntelligenceService();
    return json(await svc.runPipeline(env.DB, { state: url.searchParams.get("state") ?? undefined, operator: url.searchParams.get("operator") ?? undefined, limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50 }));
  } catch (err: unknown) { return json({ error: err instanceof Error ? err.message : String(err) }, 500); }
}

export async function handlePHMSALeads(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env); if (authErr) return authErr;
  try {
    await ensurePHMSATables(env.DB);
    const url = new URL(request.url);
    const leads = await getStoredPHMSALeads(env.DB, { state: url.searchParams.get("state") ?? undefined, operator: url.searchParams.get("operator") ?? undefined, minScore: url.searchParams.has("min_score") ? parseInt(url.searchParams.get("min_score")!, 10) : undefined, limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50 });
    return json({ leads, count: leads.length });
  } catch (err: unknown) { return json({ error: err instanceof Error ? err.message : String(err) }, 500); }
}

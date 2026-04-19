import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { DCMAIntelligenceService, ensureDCMATables, getStoredDCMALeads } from "../services/dcma-intelligence.js";
function json(data: unknown, status = 200): Response { return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } }); }

export async function handleDCMAStatus(_r: Request, _e: Env): Promise<Response> {
  return json({ citizen: "DCMA-INTELLIGENCE", status: "ACTIVE", description: "Defense contractor compliance intelligence pipeline", capabilities: ["CMMC/cybersecurity compliance", "Quality system deficiencies", "ITAR/EAR export control", "Cost accounting (CAS/DCAA)", "Contract performance tracking"], source: "DOD/DCMA (regulations.gov)" });
}
export async function handleDCMAPipeline(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env); if (authErr) return authErr;
  try { const url = new URL(request.url); const svc = new DCMAIntelligenceService(); return json(await svc.runPipeline(env.DB, { state: url.searchParams.get("state") ?? undefined, contractor: url.searchParams.get("contractor") ?? undefined, limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50 })); } catch (err: unknown) { return json({ error: err instanceof Error ? err.message : String(err) }, 500); }
}
export async function handleDCMALeads(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env); if (authErr) return authErr;
  try { await ensureDCMATables(env.DB); const url = new URL(request.url); const leads = await getStoredDCMALeads(env.DB, { state: url.searchParams.get("state") ?? undefined, minScore: url.searchParams.has("min_score") ? parseInt(url.searchParams.get("min_score")!, 10) : undefined, limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50 }); return json({ leads, count: leads.length }); } catch (err: unknown) { return json({ error: err instanceof Error ? err.message : String(err) }, 500); }
}

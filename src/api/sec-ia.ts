import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { SECIAIntelligenceService, ensureSECIATables, getStoredSECIALeads } from "../services/sec-ia-intelligence.js";
function json(data: unknown, status = 200): Response { return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } }); }

export async function handleSECIAStatus(_r: Request, _e: Env): Promise<Response> {
  return json({ citizen: "SEC-IA-INTELLIGENCE", status: "ACTIVE", description: "SEC Investment Adviser enforcement pipeline", capabilities: ["RIA enforcement tracking", "Fiduciary violation monitoring", "Custody rule compliance", "Form ADV review", "SEC exam preparation"], source: "SEC EDGAR (sec.gov)" });
}
export async function handleSECIAPipeline(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env); if (authErr) return authErr;
  try { const url = new URL(request.url); const svc = new SECIAIntelligenceService(); return json(await svc.runPipeline(env.DB, { state: url.searchParams.get("state") ?? undefined, respondent: url.searchParams.get("respondent") ?? undefined, limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50 })); } catch (err: unknown) { return json({ error: err instanceof Error ? err.message : String(err) }, 500); }
}
export async function handleSECIALeads(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env); if (authErr) return authErr;
  try { await ensureSECIATables(env.DB); const url = new URL(request.url); const leads = await getStoredSECIALeads(env.DB, { state: url.searchParams.get("state") ?? undefined, minScore: url.searchParams.has("min_score") ? parseInt(url.searchParams.get("min_score")!, 10) : undefined, limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50 }); return json({ leads, count: leads.length }); } catch (err: unknown) { return json({ error: err instanceof Error ? err.message : String(err) }, 500); }
}

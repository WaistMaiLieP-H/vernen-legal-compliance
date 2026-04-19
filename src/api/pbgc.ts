/**
 * PBGC Intelligence API Routes
 */
import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { PBGCIntelligenceService, ensurePBGCTables, getStoredPBGCLeads } from "../services/pbgc-intelligence.js";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

export async function handlePBGCStatus(_r: Request, _e: Env): Promise<Response> {
  return json({ citizen: "PBGC-INTELLIGENCE", status: "ACTIVE", description: "PBGC pension plan enforcement intelligence pipeline", capabilities: ["Plan termination tracking", "Underfunding analysis", "ERISA compliance monitoring", "Withdrawal liability assessment"], source: "PBGC (pbgc.gov / regulations.gov)" });
}

export async function handlePBGCPipeline(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env); if (authErr) return authErr;
  try {
    const url = new URL(request.url);
    const svc = new PBGCIntelligenceService();
    return json(await svc.runPipeline(env.DB, { state: url.searchParams.get("state") ?? undefined, planType: url.searchParams.get("plan_type") ?? undefined, sponsorName: url.searchParams.get("sponsor") ?? undefined, limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50 }));
  } catch (err: unknown) { return json({ error: err instanceof Error ? err.message : String(err) }, 500); }
}

export async function handlePBGCLeads(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env); if (authErr) return authErr;
  try {
    await ensurePBGCTables(env.DB);
    const url = new URL(request.url);
    const leads = await getStoredPBGCLeads(env.DB, { state: url.searchParams.get("state") ?? undefined, planType: url.searchParams.get("plan_type") ?? undefined, minScore: url.searchParams.has("min_score") ? parseInt(url.searchParams.get("min_score")!, 10) : undefined, limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50 });
    return json({ leads, count: leads.length });
  } catch (err: unknown) { return json({ error: err instanceof Error ? err.message : String(err) }, 500); }
}

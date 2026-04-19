/**
 * CFTC Intelligence API Routes
 */
import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { CFTCIntelligenceService, ensureCFTCTables, getStoredCFTCLeads } from "../services/cftc-intelligence.js";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

export async function handleCFTCStatus(_r: Request, _e: Env): Promise<Response> {
  return json({ citizen: "CFTC-INTELLIGENCE", status: "ACTIVE", description: "CFTC commodities & derivatives enforcement intelligence pipeline", capabilities: ["Market manipulation detection", "Spoofing enforcement", "Swap dealer compliance", "Fraud investigation tracking"], source: "CFTC (cftc.gov / regulations.gov)" });
}

export async function handleCFTCPipeline(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env); if (authErr) return authErr;
  try {
    const url = new URL(request.url);
    const svc = new CFTCIntelligenceService();
    return json(await svc.runPipeline(env.DB, { violationType: url.searchParams.get("type") ?? undefined, respondent: url.searchParams.get("respondent") ?? undefined, limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50 }));
  } catch (err: unknown) { return json({ error: err instanceof Error ? err.message : String(err) }, 500); }
}

export async function handleCFTCLeads(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env); if (authErr) return authErr;
  try {
    await ensureCFTCTables(env.DB);
    const url = new URL(request.url);
    const leads = await getStoredCFTCLeads(env.DB, { violationType: url.searchParams.get("type") ?? undefined, minScore: url.searchParams.has("min_score") ? parseInt(url.searchParams.get("min_score")!, 10) : undefined, minAmount: url.searchParams.has("min_amount") ? parseInt(url.searchParams.get("min_amount")!, 10) : undefined, limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50 });
    return json({ leads, count: leads.length });
  } catch (err: unknown) { return json({ error: err instanceof Error ? err.message : String(err) }, 500); }
}

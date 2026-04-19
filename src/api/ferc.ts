/**
 * FERC Intelligence API Routes
 */
import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { FERCIntelligenceService, ensureFERCTables, getStoredFERCLeads } from "../services/ferc-intelligence.js";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

export async function handleFERCStatus(_r: Request, _e: Env): Promise<Response> {
  return json({ citizen: "FERC-INTELLIGENCE", status: "ACTIVE", description: "FERC energy market enforcement intelligence pipeline", capabilities: ["Energy market manipulation tracking", "NERC/CIP reliability violations", "Pipeline tariff compliance", "Hydropower license enforcement"], source: "FERC (ferc.gov / regulations.gov)" });
}

export async function handleFERCPipeline(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env); if (authErr) return authErr;
  try {
    const url = new URL(request.url);
    const svc = new FERCIntelligenceService();
    return json(await svc.runPipeline(env.DB, { violationType: url.searchParams.get("type") ?? undefined, respondent: url.searchParams.get("respondent") ?? undefined, limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50 }));
  } catch (err: unknown) { return json({ error: err instanceof Error ? err.message : String(err) }, 500); }
}

export async function handleFERCLeads(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env); if (authErr) return authErr;
  try {
    await ensureFERCTables(env.DB);
    const url = new URL(request.url);
    const leads = await getStoredFERCLeads(env.DB, { violationType: url.searchParams.get("type") ?? undefined, minScore: url.searchParams.has("min_score") ? parseInt(url.searchParams.get("min_score")!, 10) : undefined, minAmount: url.searchParams.has("min_amount") ? parseInt(url.searchParams.get("min_amount")!, 10) : undefined, limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50 });
    return json({ leads, count: leads.length });
  } catch (err: unknown) { return json({ error: err instanceof Error ? err.message : String(err) }, 500); }
}

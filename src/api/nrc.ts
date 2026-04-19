/**
 * NRC Intelligence API Routes
 */
import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { NRCIntelligenceService, ensureNRCTables, getStoredNRCLeads } from "../services/nrc-intelligence.js";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

export async function handleNRCStatus(_r: Request, _e: Env): Promise<Response> {
  return json({ citizen: "NRC-INTELLIGENCE", status: "ACTIVE", description: "NRC nuclear regulatory enforcement intelligence pipeline", capabilities: ["Reactor violation tracking", "Severity level analysis", "Civil penalty monitoring", "10 CFR compliance"], source: "NRC (nrc.gov / regulations.gov)" });
}

export async function handleNRCPipeline(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env); if (authErr) return authErr;
  try {
    const url = new URL(request.url);
    const svc = new NRCIntelligenceService();
    return json(await svc.runPipeline(env.DB, { state: url.searchParams.get("state") ?? undefined, severity: url.searchParams.get("severity") ?? undefined, limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50 }));
  } catch (err: unknown) { return json({ error: err instanceof Error ? err.message : String(err) }, 500); }
}

export async function handleNRCLeads(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env); if (authErr) return authErr;
  try {
    await ensureNRCTables(env.DB);
    const url = new URL(request.url);
    const leads = await getStoredNRCLeads(env.DB, { state: url.searchParams.get("state") ?? undefined, severity: url.searchParams.get("severity") ?? undefined, minScore: url.searchParams.has("min_score") ? parseInt(url.searchParams.get("min_score")!, 10) : undefined, limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50 });
    return json({ leads, count: leads.length });
  } catch (err: unknown) { return json({ error: err instanceof Error ? err.message : String(err) }, 500); }
}

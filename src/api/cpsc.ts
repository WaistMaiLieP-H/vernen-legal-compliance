/**
 * CPSC Intelligence API Routes
 */
import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { CPSCIntelligenceService, ensureCPSCTables, getStoredCPSCLeads } from "../services/cpsc-intelligence.js";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

export async function handleCPSCStatus(_r: Request, _e: Env): Promise<Response> {
  return json({ citizen: "CPSC-INTELLIGENCE", status: "ACTIVE", description: "Consumer product safety recall intelligence pipeline", capabilities: ["Product recall tracking", "Hazard analysis", "Injury/death monitoring", "CPSIA compliance", "Manufacturer risk profiling"], source: "CPSC SaferProducts (saferproducts.gov)" });
}

export async function handleCPSCSearch(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env); if (authErr) return authErr;
  try {
    const url = new URL(request.url);
    const svc = new CPSCIntelligenceService();
    const result = await svc.fetchRecalls({ query: url.searchParams.get("q") ?? undefined, limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50 });
    return json({ recalls: result.recalls, count: result.recalls.length, total: result.total });
  } catch (err: unknown) { return json({ error: err instanceof Error ? err.message : String(err) }, 500); }
}

export async function handleCPSCPipeline(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env); if (authErr) return authErr;
  try {
    const url = new URL(request.url);
    const svc = new CPSCIntelligenceService();
    return json(await svc.runPipeline(env.DB, { query: url.searchParams.get("q") ?? undefined, limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50 }));
  } catch (err: unknown) { return json({ error: err instanceof Error ? err.message : String(err) }, 500); }
}

export async function handleCPSCLeads(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env); if (authErr) return authErr;
  try {
    await ensureCPSCTables(env.DB);
    const url = new URL(request.url);
    const leads = await getStoredCPSCLeads(env.DB, { manufacturer: url.searchParams.get("manufacturer") ?? undefined, minScore: url.searchParams.has("min_score") ? parseInt(url.searchParams.get("min_score")!, 10) : undefined, limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50 });
    return json({ leads, count: leads.length });
  } catch (err: unknown) { return json({ error: err instanceof Error ? err.message : String(err) }, 500); }
}

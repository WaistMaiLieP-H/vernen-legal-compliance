/**
 * FTC Intelligence API Routes
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { FTCIntelligenceService, ensureFTCTables, getStoredLeads } from "../services/ftc-intelligence.js";

type RouteParams = Record<string, string>;
function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

export async function handleFTCStatus(_request: Request, _env: Env): Promise<Response> {
  return json({
    citizen: "FTC-INTELLIGENCE", status: "ACTIVE",
    description: "Federal Trade Commission enforcement intelligence pipeline",
    capabilities: ["Enforcement pattern analysis", "Statute citation mapping", "Industry violation trends", "Monetary relief tracking", "Dark pattern detection"],
    source: "FTC Legal Library (ftc.gov)", dataScope: "All FTC non-merger enforcement actions since 1996",
  });
}

export async function handleFTCPipeline(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;
  try {
    const url = new URL(request.url);
    const svc = new FTCIntelligenceService();
    const result = await svc.runPipeline(env.DB, {
      industry: url.searchParams.get("industry") ?? undefined,
      subject: url.searchParams.get("subject") ?? undefined,
      statute: url.searchParams.get("statute") ?? undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json(result);
  } catch (err: unknown) { return json({ error: err instanceof Error ? err.message : String(err) }, 500); }
}

export async function handleFTCLeads(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;
  try {
    await ensureFTCTables(env.DB);
    const url = new URL(request.url);
    const leads = await getStoredLeads(env.DB, {
      industry: url.searchParams.get("industry") ?? undefined,
      minScore: url.searchParams.has("min_score") ? parseInt(url.searchParams.get("min_score")!, 10) : undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json({ leads, count: leads.length });
  } catch (err: unknown) { return json({ error: err instanceof Error ? err.message : String(err) }, 500); }
}

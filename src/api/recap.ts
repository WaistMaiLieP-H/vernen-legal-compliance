/**
 * RECAP / CourtListener Intelligence API Routes
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { RECAPIntelligenceService, ensureRECAPTables, getStoredLeads } from "../services/recap-intelligence.js";

type RouteParams = Record<string, string>;
function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

export async function handleRECAPStatus(_request: Request, _env: Env): Promise<Response> {
  return json({
    citizen: "RECAP-INTELLIGENCE", status: "ACTIVE",
    description: "CourtListener/RECAP federal court filing intelligence pipeline",
    capabilities: ["Opinion search", "Docket analysis", "Legal area classification", "Document type identification", "Enforcement pattern extraction"],
    source: "CourtListener / RECAP Archive (Free Law Project)", dataScope: "Millions of federal court opinions, dockets, and PACER documents",
  });
}

export async function handleRECAPSearch(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;
  try {
    const url = new URL(request.url);
    const svc = new RECAPIntelligenceService();
    const opinions = await svc.searchOpinions({
      query: url.searchParams.get("q") ?? undefined,
      court: url.searchParams.get("court") ?? undefined,
      dateAfter: url.searchParams.get("date_after") ?? undefined,
      dateBefore: url.searchParams.get("date_before") ?? undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 20,
    });
    return json({ opinions, count: opinions.length });
  } catch (err: unknown) { return json({ error: err instanceof Error ? err.message : String(err) }, 500); }
}

export async function handleRECAPPipeline(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;
  try {
    const url = new URL(request.url);
    const svc = new RECAPIntelligenceService();
    const result = await svc.runPipeline(env.DB, {
      query: url.searchParams.get("q") ?? undefined,
      court: url.searchParams.get("court") ?? undefined,
      dateAfter: url.searchParams.get("date_after") ?? undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 20,
    });
    return json(result);
  } catch (err: unknown) { return json({ error: err instanceof Error ? err.message : String(err) }, 500); }
}

export async function handleRECAPLeads(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;
  try {
    await ensureRECAPTables(env.DB);
    const url = new URL(request.url);
    const leads = await getStoredLeads(env.DB, {
      court: url.searchParams.get("court") ?? undefined,
      documentType: url.searchParams.get("type") ?? undefined,
      minScore: url.searchParams.has("min_score") ? parseInt(url.searchParams.get("min_score")!, 10) : undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json({ leads, count: leads.length });
  } catch (err: unknown) { return json({ error: err instanceof Error ? err.message : String(err) }, 500); }
}

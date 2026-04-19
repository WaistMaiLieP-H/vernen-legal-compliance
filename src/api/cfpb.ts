/**
 * CFPB Intelligence API Routes
 *
 * Exposes the consumer financial complaint intelligence pipeline.
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import {
  CFPBIntelligenceService,
  ensureCFPBTables,
  getStoredLeads,
} from "../services/cfpb-intelligence.js";

type RouteParams = Record<string, string>;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

/** GET /api/cfpb/status */
export async function handleCFPBStatus(_request: Request, _env: Env): Promise<Response> {
  return json({
    citizen: "CFPB-INTELLIGENCE",
    status: "ACTIVE",
    description: "CFPB consumer financial complaint intelligence pipeline",
    capabilities: ["Complaint pattern analysis", "Company risk scoring", "Product violation mapping", "Dispute rate tracking", "Response timeliness audit"],
    source: "CFPB Consumer Complaint Database",
    dataScope: "Millions of consumer financial complaints — mortgages, credit cards, debt collection, credit reporting",
  });
}

/** GET /api/cfpb/search */
export async function handleCFPBSearch(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const url = new URL(request.url);
  const svc = new CFPBIntelligenceService();
  const complaints = await svc.searchComplaints({
    product: url.searchParams.get("product") ?? undefined,
    company: url.searchParams.get("company") ?? undefined,
    state: url.searchParams.get("state") ?? undefined,
    issue: url.searchParams.get("issue") ?? undefined,
    dateFrom: url.searchParams.get("date_from") ?? undefined,
    dateTo: url.searchParams.get("date_to") ?? undefined,
    limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
  });
  return json({ complaints, count: complaints.length });
}

/** GET /api/cfpb/pipeline */
export async function handleCFPBPipeline(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    const url = new URL(request.url);
    const svc = new CFPBIntelligenceService();
    const result = await svc.runPipeline(env.DB, {
      product: url.searchParams.get("product") ?? undefined,
      state: url.searchParams.get("state") ?? undefined,
      dateFrom: url.searchParams.get("date_from") ?? undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 200,
    });
    return json(result);
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err), stack: err instanceof Error ? err.stack : undefined }, 500);
  }
}

/** GET /api/cfpb/leads */
export async function handleCFPBLeads(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  await ensureCFPBTables(env.DB);
  const url = new URL(request.url);
  const leads = await getStoredLeads(env.DB, {
    company: url.searchParams.get("company") ?? undefined,
    state: url.searchParams.get("state") ?? undefined,
    minScore: url.searchParams.has("min_score") ? parseInt(url.searchParams.get("min_score")!, 10) : undefined,
    limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
  });
  return json({ leads, count: leads.length });
}

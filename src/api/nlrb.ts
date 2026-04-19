/**
 * NLRB Intelligence API Routes
 *
 * Exposes the NLRB labor law enforcement intelligence pipeline.
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import {
  NLRBIntelligenceService,
  ensureNLRBTables,
  getStoredLeads,
} from "../services/nlrb-intelligence.js";

type RouteParams = Record<string, string>;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

/** GET /api/nlrb/status */
export async function handleNLRBStatus(_request: Request, _env: Env): Promise<Response> {
  return json({
    citizen: "NLRB-INTELLIGENCE",
    status: "ACTIVE",
    description: "NLRB labor law enforcement intelligence pipeline",
    capabilities: ["Unfair labor practice case discovery", "NLRA violation risk scoring", "Collective bargaining compliance analysis", "Union representation dispute tracking", "Secondary boycott monitoring"],
    source: "NLRB Case Data (nlrb.gov)",
    dataScope: "Unfair labor practice charges, representation petitions, board decisions — employer and union violations under the National Labor Relations Act",
  });
}

/** GET /api/nlrb/pipeline */
export async function handleNLRBPipeline(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    const url = new URL(request.url);
    const svc = new NLRBIntelligenceService();
    const result = await svc.runPipeline(env.DB, {
      caseType: url.searchParams.get("case_type") ?? undefined,
      state: url.searchParams.get("state") ?? undefined,
      allegation: url.searchParams.get("allegation") ?? undefined,
      industry: url.searchParams.get("industry") ?? undefined,
      status: url.searchParams.get("status") ?? undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 100,
    });
    return json(result);
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err), stack: err instanceof Error ? err.stack : undefined }, 500);
  }
}

/** GET /api/nlrb/leads */
export async function handleNLRBLeads(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  await ensureNLRBTables(env.DB);
  const url = new URL(request.url);
  const leads = await getStoredLeads(env.DB, {
    state: url.searchParams.get("state") ?? undefined,
    caseType: url.searchParams.get("case_type") ?? undefined,
    minScore: url.searchParams.has("min_score") ? parseInt(url.searchParams.get("min_score")!, 10) : undefined,
    status: url.searchParams.get("status") ?? undefined,
    limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
  });
  return json({ leads, count: leads.length });
}

/**
 * EPA ECHO Intelligence API Routes
 *
 * Exposes the EPA environmental enforcement pipeline.
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import {
  EPAIntelligenceService,
  ensureEPATables,
  getStoredLeads,
  generateEPAReportHTML,
} from "../services/epa-intelligence.js";
import type { EPASearchFilters } from "../services/epa-intelligence.js";

type RouteParams = Record<string, string>;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

function html(body: string, status = 200): Response {
  return new Response(body, { status, headers: { "Content-Type": "text/html; charset=utf-8" } });
}

function parseFilters(url: URL): EPASearchFilters {
  return {
    state: url.searchParams.get("state") ?? undefined,
    naics: url.searchParams.get("naics") ?? undefined,
    program: url.searchParams.get("program") ?? undefined,
    sncOnly: url.searchParams.get("snc_only") === "true",
    minPenalties: url.searchParams.has("min_penalties") ? parseInt(url.searchParams.get("min_penalties")!, 10) : undefined,
    limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    offset: url.searchParams.has("offset") ? parseInt(url.searchParams.get("offset")!, 10) : 0,
  };
}

/** GET /api/epa/status */
export async function handleEPAStatus(_request: Request, _env: Env): Promise<Response> {
  return json({
    citizen: "EPA-INTELLIGENCE",
    status: "ACTIVE",
    description: "EPA ECHO environmental enforcement intelligence pipeline",
    capabilities: ["Clean Water Act violations", "Clean Air Act HPVs", "RCRA hazardous waste", "SDWA drinking water", "Penalty tracking", "Facility compliance scoring"],
    source: "EPA ECHO (echodata.epa.gov)",
    dataScope: "Every EPA-regulated facility in the United States",
  });
}

/** GET /api/epa/discover */
export async function handleEPADiscover(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const filters = parseFilters(new URL(request.url));
  const svc = new EPAIntelligenceService();
  const facilities = await svc.searchFacilities(filters);
  return json({ facilities, count: facilities.length, filters });
}

/** GET /api/epa/pipeline */
export async function handleEPAPipeline(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const filters = parseFilters(new URL(request.url));
  const svc = new EPAIntelligenceService();
  const result = await svc.runPipeline(env.DB, filters);
  return json(result);
}

/** GET /api/epa/leads */
export async function handleEPALeads(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  await ensureEPATables(env.DB);
  const url = new URL(request.url);
  const leads = await getStoredLeads(env.DB, {
    state: url.searchParams.get("state") ?? undefined,
    minScore: url.searchParams.has("min_score") ? parseInt(url.searchParams.get("min_score")!, 10) : undefined,
    limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
  });
  return json({ leads, count: leads.length });
}

/** GET /api/epa/report/:registryId */
export async function handleEPAReport(request: Request, env: Env, _ctx: ExecutionContext, params: RouteParams): Promise<Response> {
  const registryId = params.registryId;
  if (!registryId) return json({ error: "Registry ID required" }, 400);

  const svc = new EPAIntelligenceService();
  const facility = await svc.getFacilityDetail(registryId);
  if (!facility) return json({ error: "Facility not found" }, 404);

  // Score it
  const lead = (svc as unknown as { scoreComplianceRisk: (f: typeof facility) => ReturnType<EPAIntelligenceService["searchFacilities"]> extends Promise<infer T> ? T : never }).scoreComplianceRisk?.(facility);
  if (!lead) return json({ error: "Unable to score facility" }, 500);

  return html(generateEPAReportHTML(lead as never));
}

/**
 * CMS Intelligence API Routes
 *
 * Exposes the CMS healthcare provider enforcement pipeline.
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import {
  CMSIntelligenceService,
  ensureCMSTables,
  getStoredCMSLeads,
} from "../services/cms-intelligence.js";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

/** GET /api/cms/status */
export async function handleCMSStatus(_request: Request, _env: Env): Promise<Response> {
  return json({
    citizen: "CMS-INTELLIGENCE",
    status: "ACTIVE",
    description: "CMS healthcare provider enforcement intelligence pipeline",
    capabilities: ["Nursing home penalty tracking", "Hospital deficiency monitoring", "Survey readiness assessment", "CMS Conditions of Participation review", "Civil monetary penalty analysis"],
    source: "CMS Medicare/Medicaid Data (data.cms.gov)",
    dataScope: "Medicare/Medicaid certified providers — hospitals, nursing homes, home health",
  });
}

/** GET /api/cms/search */
export async function handleCMSSearch(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    const url = new URL(request.url);
    const svc = new CMSIntelligenceService();
    const facilityType = url.searchParams.get("facility_type") ?? "Nursing Home";
    let result;
    if (facilityType === "Hospital") {
      result = await svc.fetchHospitalDeficiencies({
        state: url.searchParams.get("state") ?? undefined,
        limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
      });
    } else {
      result = await svc.fetchNursingHomePenalties({
        state: url.searchParams.get("state") ?? undefined,
        limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
      });
    }
    return json({ deficiencies: result.deficiencies, count: result.deficiencies.length, total: result.total });
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

/** GET /api/cms/pipeline */
export async function handleCMSPipeline(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    const url = new URL(request.url);
    const svc = new CMSIntelligenceService();
    const result = await svc.runPipeline(env.DB, {
      state: url.searchParams.get("state") ?? undefined,
      facilityType: url.searchParams.get("facility_type") ?? undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json(result);
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

/** GET /api/cms/leads */
export async function handleCMSLeads(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    await ensureCMSTables(env.DB);
    const url = new URL(request.url);
    const leads = await getStoredCMSLeads(env.DB, {
      state: url.searchParams.get("state") ?? undefined,
      facilityType: url.searchParams.get("facility_type") ?? undefined,
      minScore: url.searchParams.has("min_score") ? parseInt(url.searchParams.get("min_score")!, 10) : undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json({ leads, count: leads.length });
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

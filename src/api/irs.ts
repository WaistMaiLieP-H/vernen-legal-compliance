/**
 * IRS Intelligence API Routes
 *
 * Exposes the IRS tax compliance enforcement pipeline.
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import {
  IRSIntelligenceService,
  ensureIRSTables,
  getStoredIRSLeads,
} from "../services/irs-intelligence.js";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

/** GET /api/irs/status */
export async function handleIRSStatus(_request: Request, _env: Env): Promise<Response> {
  return json({
    citizen: "IRS-INTELLIGENCE",
    status: "ACTIVE",
    description: "IRS tax compliance enforcement intelligence pipeline — exempt org revocations",
    capabilities: ["Exempt org revocation tracking", "501(c)(3) status monitoring", "Form 990 filing compliance", "Reinstatement support", "Nonprofit compliance analysis"],
    source: "IRS Exempt Organization Data (via ProPublica Nonprofit Explorer)",
    dataScope: "All IRS automatic revocations and tax-exempt organization status",
  });
}

/** GET /api/irs/search */
export async function handleIRSSearch(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    const url = new URL(request.url);
    const svc = new IRSIntelligenceService();
    const result = await svc.fetchExemptOrgs({
      state: url.searchParams.get("state") ?? undefined,
      entityName: url.searchParams.get("name") ?? undefined,
      exemptionType: url.searchParams.get("type") ?? undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json({ organizations: result.orgs, count: result.orgs.length, total: result.total });
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

/** GET /api/irs/pipeline */
export async function handleIRSPipeline(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    const url = new URL(request.url);
    const svc = new IRSIntelligenceService();
    const result = await svc.runPipeline(env.DB, {
      state: url.searchParams.get("state") ?? undefined,
      entityName: url.searchParams.get("name") ?? undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json(result);
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

/** GET /api/irs/leads */
export async function handleIRSLeads(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    await ensureIRSTables(env.DB);
    const url = new URL(request.url);
    const leads = await getStoredIRSLeads(env.DB, {
      state: url.searchParams.get("state") ?? undefined,
      exemptionType: url.searchParams.get("type") ?? undefined,
      minScore: url.searchParams.has("min_score") ? parseInt(url.searchParams.get("min_score")!, 10) : undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json({ leads, count: leads.length });
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

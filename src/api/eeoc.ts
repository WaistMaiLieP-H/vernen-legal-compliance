/**
 * EEOC Intelligence API Routes
 *
 * Exposes the employment discrimination enforcement intelligence pipeline.
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import {
  EEOCIntelligenceService,
  ensureEEOCTables,
  getStoredLeads,
} from "../services/eeoc-intelligence.js";

type RouteParams = Record<string, string>;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

/** GET /api/eeoc/status */
export async function handleEEOCStatus(_request: Request, _env: Env): Promise<Response> {
  return json({
    citizen: "EEOC-INTELLIGENCE",
    status: "ACTIVE",
    description: "EEOC employment discrimination enforcement intelligence pipeline",
    capabilities: ["Charge volume analysis", "Discrimination basis tracking", "Merit resolution rate scoring", "Monetary benefit exposure mapping", "Statutory category breakdown"],
    source: "EEOC Enforcement & Litigation Data",
    dataScope: "Employment discrimination charges — race, sex, national origin, religion, color, retaliation, age, disability, equal pay, genetic information",
  });
}

/** GET /api/eeoc/pipeline */
export async function handleEEOCPipeline(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    const url = new URL(request.url);
    const svc = new EEOCIntelligenceService();
    const result = await svc.runPipeline(env.DB, {
      basis: url.searchParams.get("basis") ?? undefined,
      category: url.searchParams.get("category") ?? undefined,
      fiscalYear: url.searchParams.has("fiscal_year") ? parseInt(url.searchParams.get("fiscal_year")!, 10) : undefined,
      minCharges: url.searchParams.has("min_charges") ? parseInt(url.searchParams.get("min_charges")!, 10) : undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : undefined,
    });
    return json(result);
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err), stack: err instanceof Error ? err.stack : undefined }, 500);
  }
}

/** GET /api/eeoc/leads */
export async function handleEEOCLeads(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  await ensureEEOCTables(env.DB);
  const url = new URL(request.url);
  const leads = await getStoredLeads(env.DB, {
    basis: url.searchParams.get("basis") ?? undefined,
    category: url.searchParams.get("category") ?? undefined,
    minScore: url.searchParams.has("min_score") ? parseInt(url.searchParams.get("min_score")!, 10) : undefined,
    fiscalYear: url.searchParams.has("fiscal_year") ? parseInt(url.searchParams.get("fiscal_year")!, 10) : undefined,
    limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
  });
  return json({ leads, count: leads.length });
}

/**
 * FMCSA Intelligence API Routes
 *
 * Exposes the FMCSA motor carrier safety enforcement pipeline.
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import {
  FMCSAIntelligenceService,
  ensureFMCSATables,
  getStoredFMCSALeads,
} from "../services/fmcsa-intelligence.js";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

/** GET /api/fmcsa/status */
export async function handleFMCSAStatus(_request: Request, _env: Env): Promise<Response> {
  return json({
    citizen: "FMCSA-INTELLIGENCE",
    status: "ACTIVE",
    description: "FMCSA motor carrier safety enforcement intelligence pipeline",
    capabilities: ["Carrier safety rating monitoring", "DOT number lookup", "Out-of-service tracking", "HAZMAT carrier compliance", "Passenger carrier safety"],
    source: "FMCSA Motor Carrier Safety Data (mobile.fmcsa.dot.gov)",
    dataScope: "All interstate motor carriers — trucks, buses, hazmat transporters",
  });
}

/** GET /api/fmcsa/search */
export async function handleFMCSASearch(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    const url = new URL(request.url);
    const svc = new FMCSAIntelligenceService();

    // Single carrier lookup by DOT number
    const dot = url.searchParams.get("dot");
    if (dot) {
      const carrier = await svc.lookupCarrier(dot);
      return json({ carrier, found: !!carrier });
    }

    const result = await svc.searchCarriers({
      state: url.searchParams.get("state") ?? undefined,
      safetyRating: url.searchParams.get("safety_rating") ?? undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json({ carriers: result.carriers, count: result.carriers.length, total: result.total });
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

/** GET /api/fmcsa/pipeline */
export async function handleFMCSAPipeline(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    const url = new URL(request.url);
    const svc = new FMCSAIntelligenceService();
    const result = await svc.runPipeline(env.DB, {
      state: url.searchParams.get("state") ?? undefined,
      safetyRating: url.searchParams.get("safety_rating") ?? undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json(result);
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

/** GET /api/fmcsa/leads */
export async function handleFMCSALeads(request: Request, env: Env): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    await ensureFMCSATables(env.DB);
    const url = new URL(request.url);
    const leads = await getStoredFMCSALeads(env.DB, {
      state: url.searchParams.get("state") ?? undefined,
      safetyRating: url.searchParams.get("safety_rating") ?? undefined,
      minScore: url.searchParams.has("min_score") ? parseInt(url.searchParams.get("min_score")!, 10) : undefined,
      limit: url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    });
    return json({ leads, count: leads.length });
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

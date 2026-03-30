/**
 * HHS Intelligence API Routes
 *
 * Exposes the HHS OCR Breach Portal ("Wall of Shame") intelligence pipeline
 * through authenticated API endpoints for the founder dashboard
 * and public-facing HIPAA compliance gap reports.
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import {
  HHSIntelligenceService,
  generateHHSGapReportHTML,
  ensureHHSTables,
  storeBreachLead,
  getStoredBreachLeads,
  HHSApiError,
} from "../services/hhs-intelligence.js";
import type { HHSSearchFilters } from "../services/hhs-intelligence.js";

type RouteParams = Record<string, string>;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function html(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

function parseFilters(url: URL): HHSSearchFilters {
  return {
    state: url.searchParams.get("state") ?? undefined,
    minAffected: url.searchParams.has("min_affected")
      ? parseInt(url.searchParams.get("min_affected")!, 10)
      : undefined,
    entityType: url.searchParams.get("entity_type") ?? undefined,
    breachType: url.searchParams.get("breach_type") ?? undefined,
    limit: url.searchParams.has("limit")
      ? parseInt(url.searchParams.get("limit")!, 10)
      : 50,
    offset: url.searchParams.has("offset")
      ? parseInt(url.searchParams.get("offset")!, 10)
      : 0,
  };
}

function handleHHSError(error: unknown): Response {
  if (error instanceof HHSApiError) {
    return json(
      {
        error: "HHS portal error",
        status: error.status,
        detail: error.body,
      },
      502
    );
  }
  throw error;
}

// ═══════════════════════════════════════════════════════════════════════════
// Route Handlers
// ═══════════════════════════════════════════════════════════════════════════

/**
 * GET /api/hhs/status — Service health & info (public)
 */
export async function handleHHSStatus(
  _request: Request,
  _env: Env
): Promise<Response> {
  return json({
    citizen: "HHS-INTELLIGENCE",
    status: "ACTIVE",
    description:
      "HHS OCR Breach Portal (Wall of Shame) HIPAA compliance gap intelligence pipeline",
    capabilities: [
      "HIPAA breach entity discovery",
      "Compliance gap severity scoring (0-100)",
      "Breach type classification & remediation mapping",
      "Business associate risk identification",
      "State-level HIPAA breach heatmap",
      "Branded HTML gap report generation",
    ],
    source:
      "HHS Office for Civil Rights Breach Portal (ocrportal.hhs.gov) — breaches affecting 500+ individuals",
    dataScope:
      "All reported HIPAA breaches affecting 500+ individuals under OCR investigation",
  });
}

/**
 * GET /api/hhs/breaches — Fetch breach entities with filtering (authenticated)
 *
 * Query params: state, min_affected, entity_type, breach_type, limit, offset
 */
export async function handleHHSBreaches(
  request: Request,
  env: Env
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const url = new URL(request.url);
  const filters = parseFilters(url);
  const hhs = new HHSIntelligenceService();

  try {
    const entities = await hhs.fetchBreachData(filters);
    return json({
      entities,
      count: entities.length,
      filters,
      source: "ocrportal.hhs.gov",
    });
  } catch (error) {
    return handleHHSError(error);
  }
}

/**
 * GET /api/hhs/pipeline — Run full discovery -> scoring -> D1 storage pipeline (authenticated)
 *
 * Query params: state, min_affected, entity_type, breach_type, limit, offset
 */
export async function handleHHSPipeline(
  request: Request,
  env: Env
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const url = new URL(request.url);
  const filters = parseFilters(url);
  const hhs = new HHSIntelligenceService();

  try {
    // Initialize storage tables
    await ensureHHSTables(env.DB);

    // Run the pipeline
    const result = await hhs.runPipeline(filters);

    // Store leads in D1 for tracking
    for (const lead of result.leads) {
      await storeBreachLead(env.DB, lead);
    }

    return json(result);
  } catch (error) {
    return handleHHSError(error);
  }
}

/**
 * GET /api/hhs/report/:entityId — Generate branded HIPAA gap report (public)
 *
 * The entityId param is used to look up the entity from D1 stored leads.
 * This is the "free sample" that demonstrates value.
 */
export async function handleHHSReport(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const entityId = params["entityId"];
  if (!entityId) {
    return json({ error: "entityId is required" }, 400);
  }

  try {
    // Ensure tables exist
    await ensureHHSTables(env.DB);

    // Look up the stored lead by ID
    const result = await env.DB.prepare(
      "SELECT * FROM hhs_breach_leads WHERE id = ?"
    )
      .bind(parseInt(entityId, 10))
      .first<Record<string, unknown>>();

    if (!result) {
      // If not found by ID, try matching by entity name
      const byName = await env.DB.prepare(
        "SELECT * FROM hhs_breach_leads WHERE entity_name = ? LIMIT 1"
      )
        .bind(entityId)
        .first<Record<string, unknown>>();

      if (!byName) {
        return json(
          {
            error: "Entity not found. Run the pipeline first to populate leads.",
          },
          404
        );
      }

      const lead = storedRowToLead(byName);
      return html(generateHHSGapReportHTML(lead));
    }

    const lead = storedRowToLead(result);
    return html(generateHHSGapReportHTML(lead));
  } catch (error) {
    return handleHHSError(error);
  }
}

/**
 * GET /api/hhs/states — State-level HIPAA breach heatmap (authenticated)
 */
export async function handleHHSStates(
  request: Request,
  env: Env
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const hhs = new HHSIntelligenceService();

  try {
    const summary = await hhs.getStateSummary();

    // Sort by count descending
    const sorted = Object.entries(summary)
      .sort(([, a], [, b]) => b.count - a.count)
      .map(([state, data]) => ({
        state,
        breachCount: data.count,
        totalAffected: data.totalAffected,
      }));

    return json({
      states: sorted,
      totalBreaches: sorted.reduce((s, e) => s + e.breachCount, 0),
      totalAffected: sorted.reduce((s, e) => s + e.totalAffected, 0),
    });
  } catch (error) {
    return handleHHSError(error);
  }
}

/**
 * GET /api/hhs/leads — Get stored leads from D1 (authenticated)
 *
 * Query params: state, min_score, status, min_affected, limit
 */
export async function handleHHSLeads(
  request: Request,
  env: Env
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    await ensureHHSTables(env.DB);

    const url = new URL(request.url);
    const leads = await getStoredBreachLeads(env.DB, {
      state: url.searchParams.get("state") ?? undefined,
      minScore: url.searchParams.has("min_score")
        ? parseInt(url.searchParams.get("min_score")!, 10)
        : undefined,
      status: url.searchParams.get("status") ?? undefined,
      minAffected: url.searchParams.has("min_affected")
        ? parseInt(url.searchParams.get("min_affected")!, 10)
        : undefined,
      limit: url.searchParams.has("limit")
        ? parseInt(url.searchParams.get("limit")!, 10)
        : 50,
    });

    return json({ leads, count: leads.length });
  } catch (error) {
    return handleHHSError(error);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Convert a D1 stored row back into a HIPAAComplianceGapLead for report generation.
 */
function storedRowToLead(
  row: Record<string, unknown>
): import("../services/hhs-intelligence.js").HIPAAComplianceGapLead {
  const gapScore = Number(row["gap_score"] ?? 0);

  let riskLevel: "CRITICAL" | "HIGH" | "ELEVATED" | "MODERATE";
  if (gapScore >= 75) riskLevel = "CRITICAL";
  else if (gapScore >= 55) riskLevel = "HIGH";
  else if (gapScore >= 35) riskLevel = "ELEVATED";
  else riskLevel = "MODERATE";

  let gapCategories: string[];
  try {
    gapCategories = JSON.parse(String(row["gap_categories"] ?? "[]"));
  } catch {
    gapCategories = [];
  }

  let recommendedServices: string[];
  try {
    recommendedServices = JSON.parse(
      String(row["recommended_services"] ?? "[]")
    );
  } catch {
    recommendedServices = [];
  }

  return {
    entity: {
      entityName: String(row["entity_name"] ?? ""),
      state: String(row["state"] ?? ""),
      coveredEntityType: String(row["covered_entity_type"] ?? ""),
      individualsAffected: Number(row["individuals_affected"] ?? 0),
      breachSubmissionDate: String(row["breach_submission_date"] ?? ""),
      breachType: String(row["breach_type"] ?? ""),
      locationOfBreachedInfo: String(row["location_of_breached_info"] ?? ""),
      businessAssociatePresent: Boolean(row["business_associate_present"]),
      webDescription: String(row["web_description"] ?? ""),
    },
    gapScore,
    gapCategories,
    recommendedServices,
    estimatedRemediation: String(row["estimated_remediation"] ?? ""),
    riskLevel,
  };
}

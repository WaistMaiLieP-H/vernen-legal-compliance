/**
 * USAspending Intelligence API Routes
 *
 * Exposes the USAspending.gov federal spending intelligence pipeline
 * through authenticated API endpoints for the founder dashboard
 * and public-facing compliance risk reports.
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import {
  USASpendingIntelligenceService,
  generateSpendingGapReportHTML,
  ensureSpendingTables,
  storeSpendingLead,
  getStoredSpendingLeads,
  USASpendingApiError,
} from "../services/usaspending-intelligence.js";
import type { SpendingSearchFilters } from "../services/usaspending-intelligence.js";

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

function getService(): USASpendingIntelligenceService {
  return new USASpendingIntelligenceService();
}

function parseFilters(url: URL): SpendingSearchFilters {
  return {
    award_type: url.searchParams.get("award_type") ?? undefined,
    min_amount: url.searchParams.has("min_amount")
      ? parseInt(url.searchParams.get("min_amount")!, 10)
      : undefined,
    max_amount: url.searchParams.has("max_amount")
      ? parseInt(url.searchParams.get("max_amount")!, 10)
      : undefined,
    state: url.searchParams.get("state") ?? undefined,
    naics: url.searchParams.get("naics") ?? undefined,
    agency: url.searchParams.get("agency") ?? undefined,
    set_aside_type: url.searchParams.get("set_aside_type") ?? undefined,
    start_date: url.searchParams.get("start_date") ?? undefined,
    end_date: url.searchParams.get("end_date") ?? undefined,
    limit: url.searchParams.has("limit")
      ? parseInt(url.searchParams.get("limit")!, 10)
      : 50,
    offset: url.searchParams.has("offset")
      ? parseInt(url.searchParams.get("offset")!, 10)
      : 0,
  };
}

function handleSpendingError(error: unknown): Response {
  if (error instanceof USASpendingApiError) {
    if (error.status === 429) {
      return json(
        {
          error:
            "USAspending API rate limit reached. Try again in a few minutes.",
        },
        429
      );
    }
    return json(
      {
        error: "USAspending API error",
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
 * GET /api/spending/status — Service health & info (public)
 */
export async function handleSpendingStatus(
  _request: Request,
  _env: Env
): Promise<Response> {
  return json({
    citizen: "USASPENDING-INTELLIGENCE",
    status: "ACTIVE",
    description:
      "USAspending.gov federal spending compliance risk intelligence pipeline",
    capabilities: [
      "High-value contract discovery ($20M+ threshold)",
      "8(a) sole source identification",
      "New grant recipient detection (Single Audit trigger)",
      "Agency-level risk summary",
      "Compliance risk scoring (0-100)",
      "Triggered obligations mapping (Single Audit, CMMC, FAR)",
      "Automated compliance risk report generation",
    ],
    source: "USAspending.gov (all federal spending data)",
    dataScope:
      "All federal contracts, grants, loans, and direct payments — no API key required",
  });
}

/**
 * GET /api/spending/search — Search high-value awards (authenticated)
 *
 * Query params: award_type, min_amount, max_amount, state, naics,
 *               agency, set_aside_type, start_date, end_date, limit, offset
 */
export async function handleSpendingSearch(
  request: Request,
  env: Env
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const url = new URL(request.url);
  const filters = parseFilters(url);
  const service = getService();

  try {
    const awards = await service.searchHighValueAwards(filters);
    return json({
      awards,
      count: awards.length,
      filters,
      source: "USAspending.gov",
    });
  } catch (error) {
    return handleSpendingError(error);
  }
}

/**
 * GET /api/spending/grants — Search new grant recipients (authenticated)
 *
 * Finds recipients of new grants likely triggering Single Audit ($750K+ threshold).
 * Query params: min_amount, state, agency, start_date, end_date, limit, offset
 */
export async function handleSpendingGrants(
  request: Request,
  env: Env
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const url = new URL(request.url);
  const filters = parseFilters(url);
  const service = getService();

  try {
    const awards = await service.searchNewGrantRecipients(filters);
    return json({
      awards,
      count: awards.length,
      filters,
      source: "USAspending.gov",
      note: "Recipients with $750K+ in federal grants trigger Single Audit requirements (2 CFR 200.501)",
    });
  } catch (error) {
    return handleSpendingError(error);
  }
}

/**
 * GET /api/spending/pipeline — Full intelligence pipeline (authenticated)
 *
 * Discovers high-value awards, enriches with recipient data,
 * scores compliance risk, stores leads in D1.
 */
export async function handleSpendingPipeline(
  request: Request,
  env: Env
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const url = new URL(request.url);
  const filters = parseFilters(url);
  const service = getService();

  try {
    // Initialize storage tables
    await ensureSpendingTables(env.DB);

    // Run the pipeline
    const result = await service.runPipeline(filters);

    // Store leads in D1 for tracking
    for (const lead of result.leads) {
      await storeSpendingLead(env.DB, lead);
    }

    return json(result);
  } catch (error) {
    return handleSpendingError(error);
  }
}

/**
 * GET /api/spending/report/:awardId — Branded compliance risk report (public)
 *
 * Generates an HTML report showing award details, recipient profile,
 * compliance risk score, triggered obligations, and recommended services.
 */
export async function handleSpendingReport(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const awardId = params["awardId"];
  if (!awardId) {
    return json({ error: "awardId is required" }, 400);
  }

  const service = getService();

  try {
    // Search for this specific award by ID
    // USAspending doesn't have a direct GET by award_id for spending_by_award,
    // so we fetch the award detail via the awards endpoint
    const detailResp = await fetch(
      `https://api.usaspending.gov/api/v2/awards/${encodeURIComponent(awardId)}/`,
      { headers: { Accept: "application/json" } }
    );

    if (!detailResp.ok) {
      if (detailResp.status === 404) {
        return json({ error: "Award not found in USAspending database" }, 404);
      }
      throw new USASpendingApiError(detailResp.status, await detailResp.text());
    }

    const detail = (await detailResp.json()) as Record<string, unknown>;

    // Map the award detail response to our type
    const recipientData = detail["recipient"] as Record<string, unknown> | null;
    const placeData = detail["place_of_performance"] as Record<string, unknown> | null;
    const periodData = detail["period_of_performance"] as Record<string, unknown> | null;
    const setAsideType = String(
      detail["type_of_set_aside_description"] ?? detail["type_of_set_aside"] ?? ""
    );

    const isSoleSource =
      setAsideType.toUpperCase().includes("SOLE SOURCE") ||
      setAsideType.toUpperCase().includes("SS") ||
      String(detail["description"] ?? "")
        .toUpperCase()
        .includes("SOLE SOURCE");

    // Determine award type
    const rawType = String(detail["type_description"] ?? detail["type"] ?? "");
    let awardType = "other";
    if (rawType.toUpperCase().includes("CONTRACT") || ["A", "B", "C", "D"].includes(String(detail["type"] ?? ""))) {
      awardType = "contract";
    } else if (rawType.toUpperCase().includes("GRANT")) {
      awardType = "grant";
    } else if (rawType.toUpperCase().includes("LOAN")) {
      awardType = "loan";
    }

    const award = {
      award_id: String(detail["generated_internal_id"] ?? awardId),
      recipient_name: recipientData
        ? String(recipientData["recipient_name"] ?? "")
        : "",
      recipient_uei: recipientData
        ? String(recipientData["recipient_uei"] ?? "")
        : "",
      recipient_state: placeData
        ? String(placeData["state_code"] ?? "")
        : "",
      award_amount: Number(detail["total_obligation"] ?? detail["base_and_all_options_value"] ?? 0),
      award_type: awardType,
      agency_name: String(
        (detail["funding_agency"] as Record<string, unknown> | null)?.["toptier_agency_name"] ??
        (detail["awarding_agency"] as Record<string, unknown> | null)?.["toptier_agency_name"] ??
        ""
      ),
      cfda_number: String(detail["cfda_number"] ?? ""),
      naics_code: String(detail["naics"] ?? (detail["naics_description"] ? "" : "")),
      start_date: periodData
        ? String(periodData["start_date"] ?? "")
        : "",
      end_date: periodData
        ? String(periodData["end_date"] ?? "")
        : "",
      description: String(detail["description"] ?? ""),
      is_sole_source: isSoleSource,
      set_aside_type: setAsideType,
    };

    // Attempt to enrich with recipient detail
    let recipient = null;
    if (award.recipient_uei) {
      recipient = await service.getRecipientDetail(award.recipient_uei);
    }

    // Score risk
    const risk = service.scoreComplianceRisk(award, recipient);

    let estimatedRemediation: string;
    if (risk.score >= 80) {
      estimatedRemediation = "6-12 months comprehensive compliance program";
    } else if (risk.score >= 50) {
      estimatedRemediation = "3-6 months targeted compliance review";
    } else if (risk.score >= 25) {
      estimatedRemediation = "1-3 months focused assessment";
    } else {
      estimatedRemediation = "< 1 month standard compliance check";
    }

    const lead = {
      award,
      recipient,
      riskScore: risk.score,
      riskCategories: risk.categories,
      triggeredObligations: risk.obligations,
      recommendedServices: risk.services,
      estimatedRemediation,
    };

    const reportHTML = generateSpendingGapReportHTML(lead);
    return html(reportHTML);
  } catch (error) {
    return handleSpendingError(error);
  }
}

/**
 * GET /api/spending/agencies — Agency risk summary (authenticated)
 *
 * Which agencies are spending the most through high-risk channels.
 */
export async function handleSpendingAgencies(
  request: Request,
  env: Env
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const service = getService();

  try {
    const summary = await service.getAgencySummary();

    // Sort by total amount descending
    summary.sort((a, b) => b.total_amount - a.total_amount);

    return json({
      agencies: summary,
      count: summary.length,
      source: "USAspending.gov",
      note: "Agencies under OIG scrutiny are flagged — higher audit probability for their awardees",
    });
  } catch (error) {
    return handleSpendingError(error);
  }
}

/**
 * GET /api/spending/leads — Stored leads from D1 (authenticated)
 *
 * Query params: state, min_score, award_type, agency, status, limit
 */
export async function handleSpendingLeads(
  request: Request,
  env: Env
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    await ensureSpendingTables(env.DB);

    const url = new URL(request.url);
    const leads = await getStoredSpendingLeads(env.DB, {
      state: url.searchParams.get("state") ?? undefined,
      minScore: url.searchParams.has("min_score")
        ? parseInt(url.searchParams.get("min_score")!, 10)
        : undefined,
      award_type: url.searchParams.get("award_type") ?? undefined,
      agency: url.searchParams.get("agency") ?? undefined,
      status: url.searchParams.get("status") ?? undefined,
      limit: url.searchParams.has("limit")
        ? parseInt(url.searchParams.get("limit")!, 10)
        : 50,
    });

    return json({ leads, count: leads.length });
  } catch (error) {
    return handleSpendingError(error);
  }
}

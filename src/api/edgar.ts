/**
 * EDGAR Intelligence API Routes
 *
 * Exposes the SEC EDGAR 8-K material weakness intelligence pipeline
 * through authenticated API endpoints for the founder dashboard
 * and public-facing compliance gap reports.
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import {
  EDGARIntelligenceService,
  generateEDGARGapReportHTML,
  ensureEDGARTables,
  storeEDGARLead,
  getStoredEDGARLeads,
  EDGARApiError,
  EDGARRateLimitError,
} from "../services/edgar-intelligence.js";
import type { EDGARSearchFilters } from "../services/edgar-intelligence.js";

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

function parseEDGARFilters(url: URL): EDGARSearchFilters {
  return {
    query: url.searchParams.get("q") ?? undefined,
    startDate: url.searchParams.get("start_date") ?? undefined,
    endDate: url.searchParams.get("end_date") ?? undefined,
    forms: url.searchParams.get("forms") ?? "8-K",
    limit: url.searchParams.has("limit")
      ? parseInt(url.searchParams.get("limit")!, 10)
      : 50,
    offset: url.searchParams.has("offset")
      ? parseInt(url.searchParams.get("offset")!, 10)
      : 0,
  };
}

function handleEDGARError(error: unknown): Response {
  if (error instanceof EDGARRateLimitError) {
    return json(
      {
        error:
          "SEC EDGAR rate limit reached (10 req/sec). Try again in a few seconds.",
      },
      429
    );
  }
  if (error instanceof EDGARApiError) {
    return json(
      {
        error: "SEC EDGAR API error",
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
 * GET /api/edgar/status — Service health & info (public)
 */
export async function handleEDGARStatus(
  _request: Request,
  _env: Env
): Promise<Response> {
  return json({
    citizen: "EDGAR-INTELLIGENCE",
    status: "ACTIVE",
    description:
      "SEC EDGAR 8-K material weakness monitoring and compliance gap intelligence pipeline",
    capabilities: [
      "Material weakness disclosure discovery",
      "Adverse opinion detection",
      "Financial restatement tracking",
      "Auditor change monitoring",
      "Compliance gap scoring (0-100)",
      "Branded gap report generation",
    ],
    source: "SEC EDGAR EFTS (efts.sec.gov)",
    dataScope:
      "All SEC 8-K filings — public companies with material event disclosures",
    rateLimit: "10 requests/second (SEC EDGAR policy)",
  });
}

/**
 * GET /api/edgar/search — Search EDGAR for material weakness filings (authenticated)
 *
 * Query params: q, start_date, end_date, forms, limit, offset
 */
export async function handleEDGARSearch(
  request: Request,
  env: Env
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const url = new URL(request.url);
  const filters = parseEDGARFilters(url);
  const edgar = new EDGARIntelligenceService();

  try {
    const filings = await edgar.searchMaterialWeaknesses(filters);
    return json({
      filings,
      count: filings.length,
      filters,
      source: "SEC EDGAR EFTS",
    });
  } catch (error) {
    return handleEDGARError(error);
  }
}

/**
 * GET /api/edgar/pipeline — Run full intelligence pipeline (authenticated)
 *
 * Discovers filings -> scores companies -> stores leads in D1.
 */
export async function handleEDGARPipeline(
  request: Request,
  env: Env
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const url = new URL(request.url);
  const filters = parseEDGARFilters(url);
  const edgar = new EDGARIntelligenceService();

  try {
    // Initialize storage tables
    await ensureEDGARTables(env.DB);

    // Run the pipeline
    const result = await edgar.runPipeline(filters);

    // Store leads in D1 for tracking
    for (const lead of result.leads) {
      await storeEDGARLead(env.DB, lead);
    }

    return json(result);
  } catch (error) {
    return handleEDGARError(error);
  }
}

/**
 * GET /api/edgar/report/:cik — Generate branded HTML gap report for a company (public)
 *
 * Takes a CIK param, searches EDGAR for that company's 8-K filings
 * with compliance indicators, and returns a branded report.
 */
export async function handleEDGARReport(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const cik = params["cik"];
  if (!cik) {
    return json({ error: "CIK parameter is required" }, 400);
  }

  // Validate CIK format (numeric, 1-10 digits)
  if (!/^\d{1,10}$/.test(cik)) {
    return json(
      { error: "Invalid CIK format. Must be 1-10 digits." },
      400
    );
  }

  const edgar = new EDGARIntelligenceService();

  try {
    // Search for this company's filings with material weakness keywords
    const filings = await edgar.searchByCIK(cik, {
      startDate: "2024-01-01",
      endDate: new Date().toISOString().split("T")[0],
    });

    // Score each filing
    const leads = filings.map((filing) => {
      // Re-use the pipeline scoring by running through the service
      // We reconstruct leads inline since buildMaterialWeaknessLead is private
      let gapScore = 0;
      const gapCategories: string[] = [];
      const recommendedServices: string[] = [];
      const keywords = filing.keywords;

      if (keywords.includes("material weakness")) {
        gapScore += 30;
        gapCategories.push("Material Weakness Disclosed");
        recommendedServices.push("Internal Control Remediation");
      }
      if (keywords.includes("adverse opinion")) {
        gapScore += 25;
        gapCategories.push("Adverse Audit Opinion");
        recommendedServices.push("SOX Compliance Program");
      }
      if (keywords.includes("restatement")) {
        gapScore += 20;
        gapCategories.push("Financial Restatement");
        recommendedServices.push("Restatement Assistance & Remediation");
      }
      if (keywords.includes("auditor change")) {
        gapScore += 15;
        gapCategories.push("Auditor Change");
        recommendedServices.push("Auditor Transition Support");
      }
      if (
        keywords.includes("auditor change") &&
        keywords.includes("material weakness")
      ) {
        gapScore += 15;
        gapCategories.push(
          "Auditor Change with Material Weakness (High Risk)"
        );
        recommendedServices.push(
          "Comprehensive Internal Control Overhaul"
        );
      }
      if (filing.filingDate) {
        const filingMs = new Date(filing.filingDate).getTime();
        const ninetyDaysAgo = Date.now() - 90 * 24 * 60 * 60 * 1000;
        if (filingMs >= ninetyDaysAgo) {
          gapScore += 10;
          gapCategories.push("Recent Filing (within 90 days)");
        }
      }
      if (keywords.length >= 3) {
        gapScore += 10;
        gapCategories.push("Multiple Compliance Indicators");
      }
      gapScore = Math.min(gapScore, 100);

      let estimatedRemediation: string;
      if (gapScore >= 80)
        estimatedRemediation =
          "6-12 months comprehensive remediation program";
      else if (gapScore >= 50)
        estimatedRemediation = "3-6 months targeted remediation";
      else if (gapScore >= 25)
        estimatedRemediation = "1-3 months focused compliance review";
      else
        estimatedRemediation = "< 1 month standard compliance check";

      return {
        filing,
        gapScore,
        gapCategories,
        recommendedServices: [...new Set(recommendedServices)],
        estimatedRemediation,
        discoveredAt: new Date().toISOString(),
      };
    });

    // Sort by score descending
    leads.sort((a, b) => b.gapScore - a.gapScore);

    const reportHTML = generateEDGARGapReportHTML(leads, cik);
    return html(reportHTML);
  } catch (error) {
    return handleEDGARError(error);
  }
}

/**
 * GET /api/edgar/leads — Get stored EDGAR leads from D1 (authenticated)
 *
 * Query params: cik, min_score, status, limit
 */
export async function handleEDGARLeads(
  request: Request,
  env: Env
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    await ensureEDGARTables(env.DB);

    const url = new URL(request.url);
    const leads = await getStoredEDGARLeads(env.DB, {
      cik: url.searchParams.get("cik") ?? undefined,
      minScore: url.searchParams.has("min_score")
        ? parseInt(url.searchParams.get("min_score")!, 10)
        : undefined,
      status: url.searchParams.get("status") ?? undefined,
      limit: url.searchParams.has("limit")
        ? parseInt(url.searchParams.get("limit")!, 10)
        : 50,
    });

    return json({ leads, count: leads.length });
  } catch (error) {
    return handleEDGARError(error);
  }
}

/**
 * Federal Register Intelligence API Routes
 *
 * Exposes the Federal Register regulatory change monitoring pipeline
 * through authenticated API endpoints for the founder dashboard
 * and public-facing regulatory alert reports.
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import {
  FedRegIntelligenceService,
  generateRegulatoryAlertHTML,
  ensureFedRegTables,
  storeAlert,
  getStoredAlerts,
  FedRegApiError,
} from "../services/fedreg-intelligence.js";
import type { FedRegSearchFilters } from "../services/fedreg-intelligence.js";

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

function getFedRegService(): FedRegIntelligenceService {
  return new FedRegIntelligenceService();
}

function parseFilters(url: URL): FedRegSearchFilters {
  const types: string[] = [];
  const typeParam = url.searchParams.get("type");
  if (typeParam) {
    for (const t of typeParam.split(",")) {
      const trimmed = t.trim().toUpperCase();
      if (["RULE", "PRORULE", "NOTICE", "PRESDOCU"].includes(trimmed)) {
        types.push(trimmed);
      }
    }
  }

  return {
    term: url.searchParams.get("term") ?? undefined,
    type: types.length > 0 ? types : undefined,
    agency: url.searchParams.get("agency") ?? undefined,
    startDate: url.searchParams.get("start_date") ?? undefined,
    endDate: url.searchParams.get("end_date") ?? undefined,
    significantOnly: url.searchParams.get("significant") === "true",
    limit: url.searchParams.has("limit")
      ? parseInt(url.searchParams.get("limit")!, 10)
      : 50,
    offset: url.searchParams.has("offset")
      ? parseInt(url.searchParams.get("offset")!, 10)
      : 0,
  };
}

function handleFedRegError(error: unknown): Response {
  if (error instanceof FedRegApiError) {
    return json({
      error: "Federal Register API error",
      status: error.status,
      detail: error.body,
    }, 502);
  }
  throw error;
}

// ═══════════════════════════════════════════════════════════════════════════
// Route Handlers
// ═══════════════════════════════════════════════════════════════════════════

/**
 * GET /api/fedreg/status — Service health & info (public)
 */
export async function handleFedRegStatus(
  _request: Request,
  _env: Env,
): Promise<Response> {
  return json({
    citizen: "FEDREG-INTELLIGENCE",
    status: "ACTIVE",
    description: "Federal Register regulatory change monitoring and compliance impact analysis",
    capabilities: [
      "Regulatory change discovery (rules, proposed rules, notices)",
      "Compliance impact scoring (0-100)",
      "Industry and sector mapping",
      "FAR Rewrite monitoring",
      "CMMC 2.0 implementation tracking",
      "SOC 2 / HIPAA / SOX update detection",
      "Agency activity analysis",
      "Branded regulatory alert reports",
    ],
    source: "Federal Register (federalregister.gov) — No API key required",
    dataScope: "All published federal regulations, proposed rules, and notices",
    monitoredKeywords: [
      "FAR", "CMMC", "HIPAA", "SOC 2", "SOX", "AML",
      "FedRAMP", "NIST", "ITAR", "FISMA", "PCI DSS",
    ],
  });
}

/**
 * GET /api/fedreg/search — Search Federal Register documents (authenticated)
 *
 * Query params: term, type (comma-separated: RULE,PRORULE,NOTICE,PRESDOCU),
 *               agency (slug), start_date, end_date, significant, limit, offset
 */
export async function handleFedRegSearch(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const url = new URL(request.url);
  const filters = parseFilters(url);
  const service = getFedRegService();

  try {
    const documents = await service.searchRegulations(filters);
    return json({
      documents,
      count: documents.length,
      filters,
      source: "federalregister.gov",
    });
  } catch (error) {
    return handleFedRegError(error);
  }
}

/**
 * GET /api/fedreg/impact — Search for compliance-impacting regulatory changes (authenticated)
 *
 * Query params: keywords (comma-separated, optional — defaults to FAR, CMMC, HIPAA, etc.)
 */
export async function handleFedRegImpact(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const url = new URL(request.url);
  const keywordsParam = url.searchParams.get("keywords");
  const keywords = keywordsParam
    ? keywordsParam.split(",").map((k) => k.trim()).filter(Boolean)
    : [];

  const service = getFedRegService();

  try {
    const documents = await service.searchComplianceImpact(keywords);

    // Score each document and build alerts
    const alerts = documents.map((doc) => {
      const impactScore = service.scoreComplianceImpact(doc);
      const { industries, sectors } = service.mapAffectedIndustries(doc);

      return {
        document: doc,
        impactScore,
        affectedIndustries: industries,
        affectedSectors: sectors,
      };
    });

    // Sort by impact score
    alerts.sort((a, b) => b.impactScore - a.impactScore);

    return json({
      alerts,
      count: alerts.length,
      keywords: keywords.length > 0 ? keywords : "default compliance keywords",
      source: "federalregister.gov",
    });
  } catch (error) {
    return handleFedRegError(error);
  }
}

/**
 * GET /api/fedreg/pipeline — Run full regulatory intelligence pipeline (authenticated)
 *
 * Discovers regulatory changes, scores compliance impact, stores in D1.
 * Query params: same as /search
 */
export async function handleFedRegPipeline(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const url = new URL(request.url);
  const filters = parseFilters(url);
  const service = getFedRegService();

  try {
    // Initialize storage tables
    await ensureFedRegTables(env.DB);

    // Run the pipeline
    const result = await service.runPipeline(filters);

    // Store alerts in D1 for tracking
    for (const alert of result.alerts) {
      await storeAlert(env.DB, alert);
    }

    return json(result);
  } catch (error) {
    return handleFedRegError(error);
  }
}

/**
 * GET /api/fedreg/alert/:docNumber — Branded regulatory alert report (public)
 *
 * Public endpoint — demonstrates Vernen Legal's monitoring capability.
 * Returns a branded HTML report for a specific Federal Register document.
 */
export async function handleFedRegAlert(
  _request: Request,
  _env: Env,
  _ctx: ExecutionContext,
  params: RouteParams,
): Promise<Response> {
  const docNumber = params["docNumber"];
  if (!docNumber) {
    return json({ error: "docNumber is required" }, 400);
  }

  const service = getFedRegService();

  try {
    const document = await service.getDocument(docNumber);

    // Build the full alert with scoring
    const impactScore = service.scoreComplianceImpact(document);
    const { industries, sectors } = service.mapAffectedIndustries(document);

    const textToSearch = `${document.title} ${document.abstract}`.toLowerCase();
    const complianceKeywords: string[] = [];
    const COMPLIANCE_KW_LIST = [
      "FAR", "Federal Acquisition Regulation", "CMMC", "Cybersecurity Maturity Model",
      "HIPAA", "Health Insurance Portability", "SOC 2", "SOC 1", "SOX", "Sarbanes-Oxley",
      "AML", "Anti-Money Laundering", "Bank Secrecy Act", "NIST", "FedRAMP", "ITAR",
      "EAR", "Export Administration", "OFAC", "FISMA", "PCI DSS",
      "cybersecurity", "data breach", "compliance", "certification",
    ];
    for (const kw of COMPLIANCE_KW_LIST) {
      if (textToSearch.includes(kw.toLowerCase())) {
        complianceKeywords.push(kw);
      }
    }

    let urgencyLevel: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
    if (impactScore >= 75) urgencyLevel = "CRITICAL";
    else if (impactScore >= 50) urgencyLevel = "HIGH";
    else if (impactScore >= 25) urgencyLevel = "MEDIUM";
    else urgencyLevel = "LOW";

    const recommendedActions: string[] = [];
    if (document.type === "RULE") {
      recommendedActions.push("Review final rule text for compliance obligations");
      recommendedActions.push("Update internal compliance controls before effective date");
      if (document.effectiveDate) {
        recommendedActions.push(`Ensure compliance by ${document.effectiveDate}`);
      }
    } else if (document.type === "PRORULE") {
      recommendedActions.push("Submit public comments before comment period closes");
      recommendedActions.push("Begin preliminary compliance gap assessment");
    } else {
      recommendedActions.push("Review for relevant compliance implications");
    }
    if (impactScore >= 50) {
      recommendedActions.push("Schedule compliance review with Vernen Legal");
    }

    let affectedRulesEstimate = 0;
    if (complianceKeywords.some((k) => ["FAR", "Federal Acquisition Regulation"].includes(k))) affectedRulesEstimate += 120;
    if (complianceKeywords.some((k) => ["CMMC", "Cybersecurity Maturity Model"].includes(k))) affectedRulesEstimate += 80;
    if (complianceKeywords.some((k) => ["HIPAA", "Health Insurance Portability"].includes(k))) affectedRulesEstimate += 60;
    if (complianceKeywords.some((k) => ["SOX", "Sarbanes-Oxley"].includes(k))) affectedRulesEstimate += 50;
    if (affectedRulesEstimate === 0 && complianceKeywords.length > 0) affectedRulesEstimate = complianceKeywords.length * 10;

    const alert = {
      document,
      impactScore,
      affectedIndustries: industries,
      affectedSectors: sectors,
      complianceKeywords,
      urgencyLevel,
      affectedRulesEstimate,
      recommendedActions,
      generatedAt: new Date().toISOString(),
    };

    const reportHTML = generateRegulatoryAlertHTML(alert);
    return html(reportHTML);
  } catch (error) {
    return handleFedRegError(error);
  }
}

/**
 * GET /api/fedreg/agencies — Agency activity summary (authenticated)
 *
 * Query params: days (default 30) — how many days of activity to analyze
 */
export async function handleFedRegAgencies(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const url = new URL(request.url);
  const days = url.searchParams.has("days")
    ? parseInt(url.searchParams.get("days")!, 10)
    : 30;

  const service = getFedRegService();

  try {
    const activity = await service.getAgencyActivity(days);

    return json({
      days,
      agencies: activity,
      totalAgencies: activity.length,
      totalActions: activity.reduce((sum, a) => sum + a.count, 0),
      source: "federalregister.gov",
    });
  } catch (error) {
    return handleFedRegError(error);
  }
}

/**
 * GET /api/fedreg/leads — Get stored regulatory alerts from D1 (authenticated)
 *
 * Query params: type, urgency, min_score, status, limit
 */
export async function handleFedRegLeads(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    await ensureFedRegTables(env.DB);

    const url = new URL(request.url);
    const alerts = await getStoredAlerts(env.DB, {
      type: url.searchParams.get("type") ?? undefined,
      urgency: url.searchParams.get("urgency") ?? undefined,
      minScore: url.searchParams.has("min_score")
        ? parseInt(url.searchParams.get("min_score")!, 10)
        : undefined,
      status: url.searchParams.get("status") ?? undefined,
      limit: url.searchParams.has("limit")
        ? parseInt(url.searchParams.get("limit")!, 10)
        : 50,
    });

    return json({ alerts, count: alerts.length });
  } catch (error) {
    return handleFedRegError(error);
  }
}

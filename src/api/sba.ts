/**
 * SBA 8(a) Restatement API Routes
 *
 * Exposes the SBA 8(a) Business Development Program intelligence pipeline
 * through authenticated API endpoints. Supports discovery of suspended firms,
 * restatement checklist management, OHA appeal readiness scoring, and
 * branded compliance report generation.
 *
 * Context: 1,091 firms suspended January 2026. SBA OIG Report 25-25.
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import {
  SBAIntelligenceService,
  generateSBARestatementReportHTML,
  generateSBAOutreachHTML,
  ensureSBATables,
  storeSBALead,
  storeChecklistItems,
  getStoredSBALeads,
  getChecklistItems,
  updateChecklistItem,
  SBAApiError,
  SBAValidationError,
} from "../services/sba-intelligence.js";
import type { SBASearchFilters } from "../services/sba-intelligence.js";

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

function parseSBAFilters(url: URL): SBASearchFilters {
  return {
    state: url.searchParams.get("state") ?? undefined,
    status: (url.searchParams.get("status") as SBASearchFilters["status"]) ?? undefined,
    naics: url.searchParams.get("naics") ?? undefined,
    limit: url.searchParams.has("limit")
      ? parseInt(url.searchParams.get("limit")!, 10)
      : 50,
    offset: url.searchParams.has("offset")
      ? parseInt(url.searchParams.get("offset")!, 10)
      : 0,
  };
}

function handleSBAError(error: unknown): Response {
  if (error instanceof SBAValidationError) {
    return json({ error: error.message }, 400);
  }
  if (error instanceof SBAApiError) {
    return json({
      error: "SBA API error",
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
 * GET /api/sba/status — Service health & info (public)
 */
export async function handleSBAStatus(
  _request: Request,
  _env: Env,
): Promise<Response> {
  return json({
    citizen: "SBA-8A-INTELLIGENCE",
    status: "ACTIVE",
    description: "SBA 8(a) Business Development Program restatement compliance pipeline",
    capabilities: [
      "Suspended firm discovery (DSBS integration)",
      "Restatement checklist generation",
      "OHA appeal readiness scoring",
      "Financial documentation gap analysis",
      "Economic disadvantage verification",
      "Branded compliance report generation",
      "State-level suspension heatmap",
    ],
    source: "SBA Dynamic Small Business Search (dsbs.sba.gov)",
    context: "1,091 firms suspended January 2026 — SBA OIG Report 25-25",
    dataScope: "8(a) Business Development Program — 13 CFR Part 124",
  });
}

/**
 * GET /api/sba/discover — Find 8(a) firms (authenticated)
 *
 * Query params: state, status (certified/suspended/graduated), naics, limit, offset
 */
export async function handleSBADiscover(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const url = new URL(request.url);
  const filters = parseSBAFilters(url);
  const sba = new SBAIntelligenceService();

  try {
    const firms = await sba.searchDSBS(filters);
    return json({
      firms,
      count: firms.length,
      filters,
      source: "dsbs.sba.gov",
    });
  } catch (error) {
    return handleSBAError(error);
  }
}

/**
 * GET /api/sba/pipeline — Full intelligence pipeline run (authenticated)
 *
 * Discovers firms → generates checklists → scores OHA readiness → stores in D1.
 */
export async function handleSBAPipeline(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const url = new URL(request.url);
  const filters = parseSBAFilters(url);
  const sba = new SBAIntelligenceService();

  try {
    // Initialize storage tables
    await ensureSBATables(env.DB);

    // Run the full pipeline with D1 storage
    const result = await sba.runPipeline(filters, env.DB);

    return json(result);
  } catch (error) {
    return handleSBAError(error);
  }
}

/**
 * GET /api/sba/report/:uei — Branded restatement report for a firm (public)
 *
 * Returns a styled HTML report showing firm details, suspension status,
 * full restatement checklist, and OHA appeal readiness score.
 */
export async function handleSBAReport(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams,
): Promise<Response> {
  const uei = params["uei"];
  if (!uei) {
    return json({ error: "UEI parameter is required" }, 400);
  }

  const sba = new SBAIntelligenceService();

  try {
    // Try to find the firm from D1 first
    await ensureSBATables(env.DB);
    const storedLeads = await getStoredSBALeads(env.DB, { limit: 1 });

    // Check if we have this UEI stored
    const storedResult = await env.DB.prepare(
      "SELECT * FROM sba_leads WHERE uei = ?"
    ).bind(uei).first<Record<string, unknown>>();

    let firm;

    if (storedResult) {
      // Rebuild firm from stored data
      firm = {
        name: String(storedResult["name"] ?? ""),
        uei: String(storedResult["uei"] ?? ""),
        ein: String(storedResult["ein"] ?? ""),
        state: String(storedResult["state"] ?? ""),
        city: String(storedResult["city"] ?? ""),
        certificationStatus: String(storedResult["certification_status"] ?? "suspended") as "suspended",
        programEntryDate: String(storedResult["program_entry_date"] ?? ""),
        graduationDate: String(storedResult["graduation_date"] ?? ""),
        naicsCodes: JSON.parse(String(storedResult["naics_codes"] ?? "[]")) as string[],
        annualRevenue: Number(storedResult["annual_revenue"] ?? 0),
        netWorth: Number(storedResult["net_worth"] ?? 0),
        ownerDemographics: {
          ethnicity: String(storedResult["owner_ethnicity"] ?? ""),
          gender: String(storedResult["owner_gender"] ?? ""),
          veteranStatus: String(storedResult["owner_veteran_status"] ?? ""),
        },
      };
    } else {
      // Search DSBS for the firm
      const firms = await sba.searchDSBS({ limit: 500 });
      const found = firms.find((f) => f.uei === uei);
      if (!found) {
        return json({ error: "Firm not found. Run the pipeline first or verify the UEI." }, 404);
      }
      firm = found;
    }

    // Generate checklist and score
    const checklist = sba.generateRestatementChecklist(firm);

    // Load any saved checklist progress from D1
    const savedItems = await getChecklistItems(env.DB, uei);
    if (savedItems.length > 0) {
      for (const saved of savedItems) {
        const itemId = String(saved["item_id"] ?? "");
        const item = checklist.items.find((i) => i.id === itemId);
        if (item) {
          item.status = String(saved["status"] ?? "not_started") as typeof item.status;
          item.notes = String(saved["notes"] ?? "");
        }
      }
      // Recalculate completion
      const completedCount = checklist.items.filter((i) => i.status === "complete").length;
      const applicableCount = checklist.items.filter((i) => i.status !== "not_applicable").length;
      checklist.completionPercentage = applicableCount > 0
        ? Math.round((completedCount / applicableCount) * 100)
        : 0;
    }

    const ohaReadiness = sba.scoreOHAReadiness(firm, checklist);
    const restatementScore = calculateRestatementScoreFromChecklist(firm, checklist);
    const recommendedServices = buildServicesFromChecklist(checklist);
    const estimatedTimeline = estimateTimelineFromScore(restatementScore);

    const lead = {
      firm,
      checklist,
      ohaReadiness,
      restatementScore,
      recommendedServices,
      estimatedTimeline,
      generatedAt: new Date().toISOString(),
    };

    const reportHTML = generateSBARestatementReportHTML(lead);
    return html(reportHTML);
  } catch (error) {
    return handleSBAError(error);
  }
}

/**
 * GET /api/sba/checklist/:uei — Get restatement checklist for a firm (authenticated)
 */
export async function handleSBAChecklist(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const uei = params["uei"];
  if (!uei) {
    return json({ error: "UEI parameter is required" }, 400);
  }

  try {
    await ensureSBATables(env.DB);
    const items = await getChecklistItems(env.DB, uei);

    if (items.length === 0) {
      // Generate a fresh checklist
      const sba = new SBAIntelligenceService();
      const firms = await sba.searchDSBS({ limit: 500 });
      const firm = firms.find((f) => f.uei === uei);

      if (!firm) {
        return json({ error: "Firm not found. Run the pipeline first or verify the UEI." }, 404);
      }

      const checklist = sba.generateRestatementChecklist(firm);
      await storeChecklistItems(env.DB, uei, checklist.items);

      return json({
        firmUei: uei,
        firmName: firm.name,
        items: checklist.items,
        completionPercentage: checklist.completionPercentage,
        generatedAt: checklist.generatedAt,
      });
    }

    // Calculate completion from stored items
    const completed = items.filter((i) => String(i["status"]) === "complete").length;
    const applicable = items.filter((i) => String(i["status"]) !== "not_applicable").length;
    const completionPercentage = applicable > 0 ? Math.round((completed / applicable) * 100) : 0;

    return json({
      firmUei: uei,
      items,
      count: items.length,
      completionPercentage,
    });
  } catch (error) {
    return handleSBAError(error);
  }
}

/**
 * POST /api/sba/checklist/update — Update a checklist item status (authenticated)
 *
 * Body: { itemId: number, status: string, notes: string }
 */
export async function handleSBAChecklistUpdate(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    await ensureSBATables(env.DB);

    const body = await request.json() as Record<string, unknown>;
    const itemId = Number(body["itemId"]);
    const status = String(body["status"] ?? "");
    const notes = String(body["notes"] ?? "");

    if (!itemId || isNaN(itemId)) {
      return json({ error: "itemId is required and must be a number" }, 400);
    }

    if (!status) {
      return json({ error: "status is required" }, 400);
    }

    await updateChecklistItem(env.DB, itemId, status, notes);

    return json({
      success: true,
      itemId,
      status,
      notes,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return handleSBAError(error);
  }
}

/**
 * GET /api/sba/appeal/:uei — OHA appeal readiness score (authenticated)
 */
export async function handleSBAAppealReadiness(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const uei = params["uei"];
  if (!uei) {
    return json({ error: "UEI parameter is required" }, 400);
  }

  const sba = new SBAIntelligenceService();

  try {
    await ensureSBATables(env.DB);

    // Look up the firm
    const storedResult = await env.DB.prepare(
      "SELECT * FROM sba_leads WHERE uei = ?"
    ).bind(uei).first<Record<string, unknown>>();

    let firm;
    if (storedResult) {
      firm = {
        name: String(storedResult["name"] ?? ""),
        uei: String(storedResult["uei"] ?? ""),
        ein: String(storedResult["ein"] ?? ""),
        state: String(storedResult["state"] ?? ""),
        city: String(storedResult["city"] ?? ""),
        certificationStatus: String(storedResult["certification_status"] ?? "suspended") as "suspended",
        programEntryDate: String(storedResult["program_entry_date"] ?? ""),
        graduationDate: String(storedResult["graduation_date"] ?? ""),
        naicsCodes: JSON.parse(String(storedResult["naics_codes"] ?? "[]")) as string[],
        annualRevenue: Number(storedResult["annual_revenue"] ?? 0),
        netWorth: Number(storedResult["net_worth"] ?? 0),
        ownerDemographics: {
          ethnicity: String(storedResult["owner_ethnicity"] ?? ""),
          gender: String(storedResult["owner_gender"] ?? ""),
          veteranStatus: String(storedResult["owner_veteran_status"] ?? ""),
        },
      };
    } else {
      const firms = await sba.searchDSBS({ limit: 500 });
      const found = firms.find((f) => f.uei === uei);
      if (!found) {
        return json({ error: "Firm not found. Run the pipeline first or verify the UEI." }, 404);
      }
      firm = found;
    }

    // Generate checklist and load saved progress
    const checklist = sba.generateRestatementChecklist(firm);
    const savedItems = await getChecklistItems(env.DB, uei);
    if (savedItems.length > 0) {
      for (const saved of savedItems) {
        const itemId = String(saved["item_id"] ?? "");
        const item = checklist.items.find((i) => i.id === itemId);
        if (item) {
          item.status = String(saved["status"] ?? "not_started") as typeof item.status;
          item.notes = String(saved["notes"] ?? "");
        }
      }
    }

    const readiness = sba.scoreOHAReadiness(firm, checklist);

    return json({
      firmUei: uei,
      firmName: firm.name,
      appealReadiness: readiness,
    });
  } catch (error) {
    return handleSBAError(error);
  }
}

/**
 * GET /api/sba/states — State-level suspension heatmap (authenticated)
 */
export async function handleSBAStates(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const sba = new SBAIntelligenceService();

  try {
    const summary = await sba.getSuspendedFirmsByState();

    // Sort by count descending
    const sorted = Object.entries(summary)
      .sort(([, a], [, b]) => b - a)
      .map(([state, count]) => ({ state, suspendedFirms: count }));

    return json({
      states: sorted,
      totalSuspended: sorted.reduce((s, e) => s + e.suspendedFirms, 0),
      source: "SBA OIG Report 25-25 — January 2026 suspensions",
    });
  } catch (error) {
    return handleSBAError(error);
  }
}

/**
 * GET /api/sba/leads — Stored leads from D1 (authenticated)
 *
 * Query params: state, status, min_score, limit
 */
export async function handleSBALeads(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    await ensureSBATables(env.DB);

    const url = new URL(request.url);
    const leads = await getStoredSBALeads(env.DB, {
      state: url.searchParams.get("state") ?? undefined,
      status: url.searchParams.get("status") ?? undefined,
      minScore: url.searchParams.has("min_score")
        ? parseInt(url.searchParams.get("min_score")!, 10)
        : undefined,
      limit: url.searchParams.has("limit")
        ? parseInt(url.searchParams.get("limit")!, 10)
        : 50,
    });

    return json({ leads, count: leads.length });
  } catch (error) {
    return handleSBAError(error);
  }
}

/**
 * GET /api/sba/outreach/:uei — Generate outreach email for a suspended firm (public)
 *
 * Returns a styled HTML email ready to send — specific findings,
 * CFR citations, consequences, and link to the free restatement report.
 */
export async function handleSBAOutreach(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams,
): Promise<Response> {
  const uei = params["uei"];
  if (!uei) {
    return json({ error: "UEI parameter is required" }, 400);
  }

  const sba = new SBAIntelligenceService();

  try {
    await ensureSBATables(env.DB);

    // Look up the firm from D1 or DSBS
    const storedResult = await env.DB.prepare(
      "SELECT * FROM sba_leads WHERE uei = ?"
    ).bind(uei).first<Record<string, unknown>>();

    let firm;

    if (storedResult) {
      firm = {
        name: String(storedResult["name"] ?? ""),
        uei: String(storedResult["uei"] ?? ""),
        ein: String(storedResult["ein"] ?? ""),
        state: String(storedResult["state"] ?? ""),
        city: String(storedResult["city"] ?? ""),
        certificationStatus: String(storedResult["certification_status"] ?? "suspended") as "suspended",
        programEntryDate: String(storedResult["program_entry_date"] ?? ""),
        graduationDate: String(storedResult["graduation_date"] ?? ""),
        naicsCodes: JSON.parse(String(storedResult["naics_codes"] ?? "[]")) as string[],
        annualRevenue: Number(storedResult["annual_revenue"] ?? 0),
        netWorth: Number(storedResult["net_worth"] ?? 0),
        ownerDemographics: {
          ethnicity: String(storedResult["owner_ethnicity"] ?? ""),
          gender: String(storedResult["owner_gender"] ?? ""),
          veteranStatus: String(storedResult["owner_veteran_status"] ?? ""),
        },
      };
    } else {
      const firms = await sba.searchDSBS({ limit: 500 });
      const found = firms.find((f) => f.uei === uei);
      if (!found) {
        return json({ error: "Firm not found. Run the pipeline first or verify the UEI." }, 404);
      }
      firm = found;
    }

    const checklist = sba.generateRestatementChecklist(firm);

    // Load saved checklist progress
    const savedItems = await getChecklistItems(env.DB, uei);
    if (savedItems.length > 0) {
      for (const saved of savedItems) {
        const itemId = String(saved["item_id"] ?? "");
        const item = checklist.items.find((i) => i.id === itemId);
        if (item) {
          item.status = String(saved["status"] ?? "not_started") as typeof item.status;
          item.notes = String(saved["notes"] ?? "");
        }
      }
      const completedCount = checklist.items.filter((i) => i.status === "complete").length;
      const applicableCount = checklist.items.filter((i) => i.status !== "not_applicable").length;
      checklist.completionPercentage = applicableCount > 0
        ? Math.round((completedCount / applicableCount) * 100)
        : 0;
    }

    const ohaReadiness = sba.scoreOHAReadiness(firm, checklist);
    const restatementScore = calculateRestatementScoreFromChecklist(firm, checklist);
    const recommendedServices = buildServicesFromChecklist(checklist);
    const estimatedTimeline = estimateTimelineFromScore(restatementScore);

    const lead = {
      firm,
      checklist,
      ohaReadiness,
      restatementScore,
      recommendedServices,
      estimatedTimeline,
      generatedAt: new Date().toISOString(),
    };

    const outreachHTML = generateSBAOutreachHTML(lead);
    return html(outreachHTML);
  } catch (error) {
    return handleSBAError(error);
  }
}

/**
 * GET /api/sba/outreach-batch — Generate outreach emails for multiple firms (authenticated)
 *
 * Query params: state, limit (max 50)
 * Returns JSON array of { uei, name, state, outreachHtml }
 */
export async function handleSBAOutreachBatch(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const url = new URL(request.url);
  const state = url.searchParams.get("state") ?? undefined;
  const limit = Math.min(
    url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 20,
    50,
  );

  const sba = new SBAIntelligenceService();

  try {
    await ensureSBATables(env.DB);

    const firms = await sba.searchDSBS({ state, status: "suspended", limit });
    const results: Array<{ uei: string; name: string; state: string; city: string; outreachHtml: string }> = [];

    for (const firm of firms) {
      const checklist = sba.generateRestatementChecklist(firm);
      const ohaReadiness = sba.scoreOHAReadiness(firm, checklist);
      const restatementScore = calculateRestatementScoreFromChecklist(firm, checklist);
      const recommendedServices = buildServicesFromChecklist(checklist);
      const estimatedTimeline = estimateTimelineFromScore(restatementScore);

      const lead = {
        firm,
        checklist,
        ohaReadiness,
        restatementScore,
        recommendedServices,
        estimatedTimeline,
        generatedAt: new Date().toISOString(),
      };

      results.push({
        uei: firm.uei,
        name: firm.name,
        state: firm.state,
        city: firm.city,
        outreachHtml: generateSBAOutreachHTML(lead),
      });
    }

    return json({
      outreach: results,
      count: results.length,
      state: state ?? "ALL",
    });
  } catch (error) {
    return handleSBAError(error);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Local Helpers (mirror service scoring for report generation)
// ═══════════════════════════════════════════════════════════════════════════

function calculateRestatementScoreFromChecklist(
  firm: { certificationStatus: string; netWorth: number; annualRevenue: number },
  checklist: { items: Array<{ required: boolean; status: string }> },
): number {
  let score = 0;

  if (firm.certificationStatus === "suspended") {
    score += 40;
  }

  const requiredItems = checklist.items.filter((i) => i.required);
  const incompleteRequired = requiredItems.filter(
    (i) => i.status === "not_started" || i.status === "in_progress"
  );
  if (requiredItems.length > 0) {
    score += Math.round((incompleteRequired.length / requiredItems.length) * 40);
  }

  if (firm.netWorth > 750000 && firm.netWorth < 850000) {
    score += 10;
  } else if (firm.netWorth >= 850000) {
    score += 10;
  }

  if (firm.annualRevenue === 0) {
    score += 10;
  }

  return Math.min(score, 100);
}

function buildServicesFromChecklist(
  checklist: { items: Array<{ required: boolean; status: string; category: string }> },
): string[] {
  const services: string[] = [];
  const categories = new Set(
    checklist.items
      .filter((i) => i.required && i.status !== "complete")
      .map((i) => i.category)
  );

  if (categories.has("Financial Documentation")) {
    services.push("General Ledger Reconciliation & Financial Restatement");
    services.push("Bank Reconciliation Preparation");
  }
  if (categories.has("Economic Disadvantage Proof")) {
    services.push("Economic Disadvantage Documentation Package");
    services.push("Net Worth Analysis & SBA Form 413 Preparation");
  }
  if (categories.has("Contract Performance")) {
    services.push("Contract Performance Documentation Review");
  }
  if (categories.has("Organizational")) {
    services.push("Corporate Governance Document Preparation");
  }
  if (categories.has("SBA-Specific")) {
    services.push("SBA Annual Review Compliance Package");
  }
  services.push("OHA Appeal Preparation & Filing Support");

  return [...new Set(services)];
}

function estimateTimelineFromScore(score: number): string {
  if (score >= 80) return "4-6 months comprehensive restatement program";
  if (score >= 60) return "2-4 months targeted remediation";
  if (score >= 40) return "1-2 months focused compliance preparation";
  return "2-4 weeks compliance review and filing";
}

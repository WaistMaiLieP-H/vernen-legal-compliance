/**
 * FAC Intelligence API Routes
 *
 * Exposes the Federal Audit Clearinghouse intelligence pipeline
 * through authenticated API endpoints for the founder dashboard
 * and public-facing compliance gap reports.
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import {
  FACIntelligenceService,
  generateGapReportHTML,
  generateFACOutreachHTML,
  ensureFACTables,
  storeLead,
  getStoredLeads,
  FACApiError,
  FACRateLimitError,
} from "../services/fac-intelligence.js";
import type { FACSearchFilters } from "../services/fac-intelligence.js";

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

function getFACService(env: Env): FACIntelligenceService {
  const apiKey = env.FAC_API_KEY ?? "DEMO_KEY";
  return new FACIntelligenceService(apiKey);
}

function parseFilters(url: URL): FACSearchFilters {
  return {
    auditYear: url.searchParams.has("year")
      ? parseInt(url.searchParams.get("year")!, 10)
      : undefined,
    state: url.searchParams.get("state") ?? undefined,
    materialWeaknessOnly: url.searchParams.get("material_weakness") === "true",
    questionedCostsOnly: url.searchParams.get("questioned_costs") === "true",
    repeatFindingsOnly: url.searchParams.get("repeat_findings") === "true",
    minExpenditure: url.searchParams.has("min_expenditure")
      ? parseInt(url.searchParams.get("min_expenditure")!, 10)
      : undefined,
    entityType: url.searchParams.get("entity_type") ?? undefined,
    limit: url.searchParams.has("limit")
      ? parseInt(url.searchParams.get("limit")!, 10)
      : 50,
    offset: url.searchParams.has("offset")
      ? parseInt(url.searchParams.get("offset")!, 10)
      : 0,
  };
}

function handleFACError(error: unknown): Response {
  if (error instanceof FACRateLimitError) {
    return json({
      error: "FAC API rate limit reached. Try again in a few minutes.",
      remaining: error.remaining,
    }, 429);
  }
  if (error instanceof FACApiError) {
    return json({
      error: "FAC API error",
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
 * GET /api/fac/status — Service health & info
 */
export async function handleFACStatus(
  _request: Request,
  _env: Env,
): Promise<Response> {
  return json({
    citizen: "FAC-INTELLIGENCE",
    status: "ACTIVE",
    description: "Federal Audit Clearinghouse compliance gap intelligence pipeline",
    capabilities: [
      "Material weakness discovery",
      "Questioned costs identification",
      "Repeat finding detection",
      "Compliance gap scoring",
      "Automated gap report generation",
      "State-level opportunity mapping",
    ],
    source: "fac.gov (Federal Audit Clearinghouse)",
    dataScope: "60,000+ audits/year — all entities spending $750K+ in federal funds",
  });
}

/**
 * GET /api/fac/discover — Find entities with compliance gaps (authenticated)
 *
 * Query params: year, state, material_weakness, questioned_costs,
 *               repeat_findings, min_expenditure, entity_type, limit, offset
 */
export async function handleFACDiscover(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const url = new URL(request.url);
  const filters = parseFilters(url);
  const fac = getFACService(env);

  try {
    const entities = await fac.findMaterialWeaknesses(filters);
    return json({
      entities,
      count: entities.length,
      filters,
      source: "fac.gov",
    });
  } catch (error) {
    return handleFACError(error);
  }
}

/**
 * GET /api/fac/pipeline — Run full intelligence pipeline (authenticated)
 *
 * Discovers entities → enriches with findings → scores → recommends.
 * This is the money endpoint.
 */
export async function handleFACPipeline(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const url = new URL(request.url);
  const filters = parseFilters(url);
  const fac = getFACService(env);

  try {
    // Initialize storage tables
    await ensureFACTables(env.DB);

    // Run the pipeline
    const result = await fac.runPipeline(filters);

    // Store leads in D1 for tracking
    for (const lead of result.leads) {
      await storeLead(env.DB, lead);
    }

    return json(result);
  } catch (error) {
    return handleFACError(error);
  }
}

/**
 * GET /api/fac/report/:reportId — Generate compliance gap report for entity
 *
 * Public endpoint — this is the "free sample" that demonstrates value.
 * Returns a branded HTML report showing the entity's compliance gaps.
 */
export async function handleFACReport(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams,
): Promise<Response> {
  const reportId = params["reportId"];
  if (!reportId) {
    return json({ error: "reportId is required" }, 400);
  }

  const fac = getFACService(env);

  try {
    // Fetch entity details
    const entities = await fac.findMaterialWeaknesses({ limit: 1 });

    // We need to query specifically for this report_id
    // Use the general endpoint with a direct filter
    const apiKey = env.FAC_API_KEY ?? "DEMO_KEY";
    const entityResp = await fetch(
      `https://api.fac.gov/general?report_id=eq.${encodeURIComponent(reportId)}&select=report_id,audit_year,auditee_name,auditee_ein,auditee_uei,auditee_state,auditee_city,auditee_zip,auditee_contact_name,auditee_email,auditee_phone,auditor_firm_name,total_amount_expended,entity_type,is_going_concern_included,is_internal_control_material_weakness_disclosed,is_material_noncompliance_disclosed,is_low_risk_auditee,fac_accepted_date`,
      { headers: { "X-Api-Key": apiKey } }
    );

    if (!entityResp.ok) {
      return json({ error: "Failed to fetch entity from FAC" }, 502);
    }

    const entityData = await entityResp.json() as Record<string, unknown>[];
    if (!entityData || entityData.length === 0) {
      return json({ error: "Entity not found in FAC database" }, 404);
    }

    // Enrich with findings and awards
    const [findings, findingsText, awards] = await Promise.all([
      fac.getEntityFindings(reportId),
      fac.getEntityFindingsText(reportId),
      fac.getEntityAwards(reportId),
    ]);

    const entity = {
      reportId: String(entityData[0]!["report_id"] ?? ""),
      auditYear: Number(entityData[0]!["audit_year"] ?? 0),
      auditeeNname: String(entityData[0]!["auditee_name"] ?? ""),
      auditeeEin: String(entityData[0]!["auditee_ein"] ?? ""),
      auditeeUei: String(entityData[0]!["auditee_uei"] ?? ""),
      auditeeState: String(entityData[0]!["auditee_state"] ?? ""),
      auditeeCity: String(entityData[0]!["auditee_city"] ?? ""),
      auditeeZip: String(entityData[0]!["auditee_zip"] ?? ""),
      auditeeContactName: String(entityData[0]!["auditee_contact_name"] ?? ""),
      auditeeEmail: String(entityData[0]!["auditee_email"] ?? ""),
      auditeePhone: String(entityData[0]!["auditee_phone"] ?? ""),
      auditorFirmName: String(entityData[0]!["auditor_firm_name"] ?? ""),
      totalAmountExpended: Number(entityData[0]!["total_amount_expended"] ?? 0),
      entityType: String(entityData[0]!["entity_type"] ?? ""),
      isGoingConcern: Boolean(entityData[0]!["is_going_concern_included"]),
      isMaterialWeakness: Boolean(entityData[0]!["is_internal_control_material_weakness_disclosed"]),
      isMaterialNoncompliance: Boolean(entityData[0]!["is_material_noncompliance_disclosed"]),
      isLowRiskAuditee: Boolean(entityData[0]!["is_low_risk_auditee"]),
      facAcceptedDate: String(entityData[0]!["fac_accepted_date"] ?? ""),
    };

    // Build the lead with gap scoring
    let gapScore = 0;
    const gapCategories: string[] = [];
    const recommendedServices: string[] = [];

    if (entity.isMaterialWeakness) {
      gapScore += 30;
      gapCategories.push("Internal Control Material Weakness");
      recommendedServices.push("Internal Control Remediation Audit");
    }
    if (entity.isMaterialNoncompliance) {
      gapScore += 25;
      gapCategories.push("Material Noncompliance");
      recommendedServices.push("Federal Compliance Gap Analysis");
    }
    if (entity.isGoingConcern) {
      gapScore += 20;
      gapCategories.push("Going Concern");
      recommendedServices.push("Organizational Viability Assessment");
    }
    const repeatCount = findings.filter((f) => f.isRepeatFinding).length;
    if (repeatCount > 0) {
      gapScore += Math.min(repeatCount * 15, 30);
      gapCategories.push(`Repeat Findings (${repeatCount})`);
      recommendedServices.push("Systemic Compliance Remediation Program");
    }
    const questionedCount = findings.filter((f) => f.isQuestionedCosts).length;
    if (questionedCount > 0) {
      gapScore += Math.min(questionedCount * 10, 20);
      gapCategories.push(`Questioned Costs (${questionedCount} findings)`);
      recommendedServices.push("Financial Compliance & Cost Recovery Audit");
    }
    if (findings.length > 5) {
      gapScore += 10;
      gapCategories.push(`High Finding Volume (${findings.length} total)`);
    }
    gapScore = Math.min(gapScore, 100);

    let estimatedRemediation: string;
    if (gapScore >= 80) estimatedRemediation = "6-12 months comprehensive remediation program";
    else if (gapScore >= 50) estimatedRemediation = "3-6 months targeted remediation";
    else if (gapScore >= 25) estimatedRemediation = "1-3 months focused compliance review";
    else estimatedRemediation = "< 1 month standard compliance check";

    const lead = {
      entity,
      findings,
      findingsText,
      awards,
      gapScore,
      gapCategories,
      recommendedServices: [...new Set(recommendedServices)],
      estimatedRemediation,
    };

    const reportHTML = generateGapReportHTML(lead);
    return html(reportHTML);
  } catch (error) {
    return handleFACError(error);
  }
}

/**
 * GET /api/fac/states — State-level compliance gap heatmap (authenticated)
 */
export async function handleFACStates(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const url = new URL(request.url);
  const year = url.searchParams.has("year")
    ? parseInt(url.searchParams.get("year")!, 10)
    : undefined;

  const fac = getFACService(env);

  try {
    const summary = await fac.getStateSummary(year);

    // Sort by count descending
    const sorted = Object.entries(summary)
      .sort(([, a], [, b]) => b - a)
      .map(([state, count]) => ({ state, entitiesWithGaps: count }));

    return json({
      year: year ?? new Date().getFullYear() - 1,
      states: sorted,
      totalEntities: sorted.reduce((s, e) => s + e.entitiesWithGaps, 0),
    });
  } catch (error) {
    return handleFACError(error);
  }
}

/**
 * GET /api/fac/leads — Get stored leads from D1 (authenticated)
 */
export async function handleFACLeads(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    await ensureFACTables(env.DB);

    const url = new URL(request.url);
    const leads = await getStoredLeads(env.DB, {
      state: url.searchParams.get("state") ?? undefined,
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
    return handleFACError(error);
  }
}

/**
 * GET /api/fac/outreach/:reportId — Generate outreach email for an entity (public)
 *
 * Returns a styled HTML email ready to send — specific findings,
 * CFR citations, consequences, and link to the free gap report.
 */
export async function handleFACOutreach(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams,
): Promise<Response> {
  const reportId = params["reportId"];
  if (!reportId) {
    return json({ error: "reportId is required" }, 400);
  }

  const fac = getFACService(env);

  try {
    const apiKey = env.FAC_API_KEY ?? "DEMO_KEY";
    const entityResp = await fetch(
      `https://api.fac.gov/general?report_id=eq.${encodeURIComponent(reportId)}&select=report_id,audit_year,auditee_name,auditee_ein,auditee_uei,auditee_state,auditee_city,auditee_zip,auditee_contact_name,auditee_email,auditee_phone,auditor_firm_name,total_amount_expended,entity_type,is_going_concern_included,is_internal_control_material_weakness_disclosed,is_material_noncompliance_disclosed,is_low_risk_auditee,fac_accepted_date`,
      { headers: { "X-Api-Key": apiKey } }
    );

    if (!entityResp.ok) {
      return json({ error: "Failed to fetch entity from FAC" }, 502);
    }

    const entityData = await entityResp.json() as Record<string, unknown>[];
    if (!entityData || entityData.length === 0) {
      return json({ error: "Entity not found in FAC database" }, 404);
    }

    const [findings, findingsText, awards] = await Promise.all([
      fac.getEntityFindings(reportId),
      fac.getEntityFindingsText(reportId),
      fac.getEntityAwards(reportId),
    ]);

    const entity = {
      reportId: String(entityData[0]!["report_id"] ?? ""),
      auditYear: Number(entityData[0]!["audit_year"] ?? 0),
      auditeeNname: String(entityData[0]!["auditee_name"] ?? ""),
      auditeeEin: String(entityData[0]!["auditee_ein"] ?? ""),
      auditeeUei: String(entityData[0]!["auditee_uei"] ?? ""),
      auditeeState: String(entityData[0]!["auditee_state"] ?? ""),
      auditeeCity: String(entityData[0]!["auditee_city"] ?? ""),
      auditeeZip: String(entityData[0]!["auditee_zip"] ?? ""),
      auditeeContactName: String(entityData[0]!["auditee_contact_name"] ?? ""),
      auditeeEmail: String(entityData[0]!["auditee_email"] ?? ""),
      auditeePhone: String(entityData[0]!["auditee_phone"] ?? ""),
      auditorFirmName: String(entityData[0]!["auditor_firm_name"] ?? ""),
      totalAmountExpended: Number(entityData[0]!["total_amount_expended"] ?? 0),
      entityType: String(entityData[0]!["entity_type"] ?? ""),
      isGoingConcern: String(entityData[0]!["is_going_concern_included"]).toUpperCase() === "YES",
      isMaterialWeakness: String(entityData[0]!["is_internal_control_material_weakness_disclosed"]).toUpperCase() === "YES",
      isMaterialNoncompliance: String(entityData[0]!["is_material_noncompliance_disclosed"]).toUpperCase() === "YES",
      isLowRiskAuditee: String(entityData[0]!["is_low_risk_auditee"]).toUpperCase() === "YES",
      facAcceptedDate: String(entityData[0]!["fac_accepted_date"] ?? ""),
    };

    // Score the gap
    let gapScore = 0;
    const gapCategories: string[] = [];
    const recommendedServices: string[] = [];

    if (entity.isMaterialWeakness) {
      gapScore += 30; gapCategories.push("Internal Control Material Weakness");
      recommendedServices.push("Internal Control Remediation Audit");
    }
    if (entity.isMaterialNoncompliance) {
      gapScore += 25; gapCategories.push("Material Noncompliance");
      recommendedServices.push("Federal Compliance Gap Analysis");
    }
    if (entity.isGoingConcern) {
      gapScore += 20; gapCategories.push("Going Concern");
      recommendedServices.push("Organizational Viability Assessment");
    }
    const repeatCount = findings.filter((f) => f.isRepeatFinding).length;
    if (repeatCount > 0) {
      gapScore += Math.min(repeatCount * 15, 30);
      gapCategories.push(`Repeat Findings (${repeatCount})`);
      recommendedServices.push("Systemic Compliance Remediation Program");
    }
    const questionedCount = findings.filter((f) => f.isQuestionedCosts).length;
    if (questionedCount > 0) {
      gapScore += Math.min(questionedCount * 10, 20);
      gapCategories.push(`Questioned Costs (${questionedCount} findings)`);
      recommendedServices.push("Financial Compliance & Cost Recovery Audit");
    }
    gapScore = Math.min(gapScore, 100);

    let estimatedRemediation: string;
    if (gapScore >= 80) estimatedRemediation = "6-12 months comprehensive remediation program";
    else if (gapScore >= 50) estimatedRemediation = "3-6 months targeted remediation";
    else if (gapScore >= 25) estimatedRemediation = "1-3 months focused compliance review";
    else estimatedRemediation = "< 1 month standard compliance check";

    const lead = {
      entity,
      findings,
      findingsText,
      awards,
      gapScore,
      gapCategories,
      recommendedServices: [...new Set(recommendedServices)],
      estimatedRemediation,
    };

    const outreachHTML = generateFACOutreachHTML(lead);
    return html(outreachHTML);
  } catch (error) {
    return handleFACError(error);
  }
}

/**
 * GET /api/fac/outreach-batch — Generate outreach for multiple entities (authenticated)
 *
 * Query params: year, state, material_weakness=true, limit (max 25)
 * Returns JSON array of { reportId, name, state, email, outreachHtml }
 */
export async function handleFACOutreachBatch(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const url = new URL(request.url);
  const filters = parseFilters(url);
  filters.materialWeaknessOnly = true;
  filters.limit = Math.min(filters.limit ?? 10, 25);

  const fac = getFACService(env);

  try {
    const result = await fac.runPipeline(filters);
    const outreach: Array<{
      reportId: string;
      name: string;
      state: string;
      email: string;
      contactName: string;
      gapScore: number;
      findingsCount: number;
      outreachHtml: string;
    }> = [];

    for (const lead of result.leads) {
      outreach.push({
        reportId: lead.entity.reportId,
        name: lead.entity.auditeeNname,
        state: lead.entity.auditeeState,
        email: lead.entity.auditeeEmail,
        contactName: lead.entity.auditeeContactName,
        gapScore: lead.gapScore,
        findingsCount: lead.findings.length,
        outreachHtml: generateFACOutreachHTML(lead),
      });
    }

    return json({
      outreach,
      count: outreach.length,
      filters,
    });
  } catch (error) {
    return handleFACError(error);
  }
}

/**
 * GET /api/fac/findings/:reportId — Get detailed findings (public)
 */
export async function handleFACFindings(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams,
): Promise<Response> {
  const reportId = params["reportId"];
  if (!reportId) {
    return json({ error: "reportId is required" }, 400);
  }

  const fac = getFACService(env);

  try {
    const [findings, findingsText] = await Promise.all([
      fac.getEntityFindings(reportId),
      fac.getEntityFindingsText(reportId),
    ]);

    return json({
      reportId,
      findings,
      findingsText,
      count: findings.length,
    });
  } catch (error) {
    return handleFACError(error);
  }
}

import type { Env } from "../index.js";
import { USState, BusinessEntityType } from "../types/client.js";
import { Regulis } from "../personas/regulis/index.js";
import { PRODUCTS, getProductForRequest } from "../personas/regulis/products.js";
import { ReportGenerator } from "../services/report-generator.js";
import { EventBus } from "../services/event-bus.js";
import { parseJsonBody } from "../utils/helpers.js";
import { Map1Worker } from "../workers/map-1/index.js";
import { Alert1Worker } from "../workers/alert-1/index.js";

const FREE_PREVIEW_LIMIT = 5;

type RouteParams = Record<string, string>;

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Validate that a string is a valid USState enum value.
 */
function isValidState(value: string): value is USState {
  return Object.values(USState).includes(value as USState);
}

/**
 * Normalize entity type input to match enum values.
 * Accepts common variations: "Corporation", "sole proprietorship", "S Corp", etc.
 */
const ENTITY_TYPE_ALIASES: Record<string, BusinessEntityType> = {
  llc: BusinessEntityType.LLC,
  corporation: BusinessEntityType.CORPORATION,
  corp: BusinessEntityType.CORPORATION,
  s_corp: BusinessEntityType.S_CORP,
  "s corp": BusinessEntityType.S_CORP,
  scorp: BusinessEntityType.S_CORP,
  sole_proprietorship: BusinessEntityType.SOLE_PROPRIETORSHIP,
  "sole proprietorship": BusinessEntityType.SOLE_PROPRIETORSHIP,
  soleproprietorship: BusinessEntityType.SOLE_PROPRIETORSHIP,
  "sole proprietor": BusinessEntityType.SOLE_PROPRIETORSHIP,
  partnership: BusinessEntityType.PARTNERSHIP,
  nonprofit: BusinessEntityType.NONPROFIT,
  "non-profit": BusinessEntityType.NONPROFIT,
  "non profit": BusinessEntityType.NONPROFIT,
  cooperative: BusinessEntityType.COOPERATIVE,
  "co-op": BusinessEntityType.COOPERATIVE,
  coop: BusinessEntityType.COOPERATIVE,
  "co-operative": BusinessEntityType.COOPERATIVE,
};

function normalizeEntityType(value: string): BusinessEntityType | null {
  // Direct match first
  if (Object.values(BusinessEntityType).includes(value as BusinessEntityType)) {
    return value as BusinessEntityType;
  }
  // Case-insensitive alias match
  const normalized = ENTITY_TYPE_ALIASES[value.toLowerCase().trim()];
  return normalized ?? null;
}

/**
 * Validate that a string is a valid BusinessEntityType enum value.
 */
function isValidEntityType(value: string): value is BusinessEntityType {
  return normalizeEntityType(value) !== null;
}

/**
 * Singleton REGULIS instance, initialized lazily.
 */
let regulisInstance: Regulis | null = null;
let regulisInitialized = false;

async function getRegulisInstance(env: Env): Promise<Regulis> {
  if (!regulisInstance) {
    regulisInstance = new Regulis();
  }
  if (!regulisInitialized) {
    await regulisInstance.initialize(env);
    regulisInitialized = true;
  }
  return regulisInstance;
}

// =============================================================================
// Route Handlers
// =============================================================================

/**
 * GET /api/regulis/status
 * Returns REGULIS Citizen status, knowledge stats, and operational info.
 */
export async function handleRegulisStatus(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const regulis = await getRegulisInstance(env);
  const stats = await regulis.getComplianceStats(env);

  return jsonResponse({
    citizen: "REGULIS",
    trademark: "REGULIS\u2122",
    domain: "Regulatory Intelligence",
    status: stats.status,
    description:
      "First revenue-generating Persona Citizen. Specializes in multi-state compliance analysis and reporting.",
    operational: {
      totalChecks: stats.totalChecks,
      reportsGenerated: stats.reportsGenerated,
      statesCovered: stats.statesCovered,
      lastBoot: stats.lastBoot,
    },
    knowledge: {
      topIssues: stats.topIssues,
      statesTracked: stats.statesCovered.length,
    },
    ecosystem: "Vernen Legal Compliance\u2122",
  });
}

/**
 * POST /api/regulis/check
 * Run a compliance check — the main product endpoint.
 *
 * Body: { state: string, entityType: string, businessName?: string }
 * Returns: free preview with first 5 findings + product pricing for full report.
 */
export async function handleRegulisCheck(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  let body: { state: string; entityType: string; businessName?: string };

  try {
    body = await parseJsonBody<typeof body>(request);
  } catch {
    return jsonResponse({ error: "Invalid JSON in request body" }, 400);
  }

  // Validate required fields
  if (!body.state || !body.entityType) {
    return jsonResponse(
      { error: "Both 'state' and 'entityType' are required" },
      400
    );
  }

  // Normalize state input (accept lowercase)
  body.state = body.state.toUpperCase().trim();

  // Validate state
  if (!isValidState(body.state)) {
    return jsonResponse(
      {
        error: `Invalid state: '${body.state}'. Must be a valid two-letter US state code.`,
        validStates: Object.values(USState),
      },
      400
    );
  }

  // Validate and normalize entity type
  const entityType = normalizeEntityType(body.entityType);
  if (!entityType) {
    return jsonResponse(
      {
        error: `Invalid entityType: '${body.entityType}'.`,
        validTypes: Object.values(BusinessEntityType),
        hint: "Accepted formats: 'LLC', 'Corporation', 'S Corp', 'Sole Proprietorship', 'Partnership', 'Nonprofit'",
      },
      400
    );
  }

  const state = body.state as USState;
  const startTime = Date.now();

  try {

  const regulis = await getRegulisInstance(env);

  // PROTECTION — guard the input
  const protectionResult = regulis.protect(
    "compliance_check",
    body as unknown as Record<string, unknown>,
  );

  if (protectionResult.verdict === "REJECTED") {
    return jsonResponse({
      error: "Input rejected by PROTECTION scan.",
      threats: protectionResult.threats.map((t) => ({
        type: t.type,
        field: t.field,
        description: t.description,
      })),
    }, 400);
  }

  // Run the compliance check through REGULIS
  const report = await regulis.performComplianceCheck(
    state,
    entityType,
    env,
    body.businessName
  );

  const reportGenerator = new ReportGenerator();
  const score = reportGenerator.calculateScore(report.results);

  // Publish event to other Citizens (non-blocking)
  ctx.waitUntil(
    EventBus.publish("REGULIS", "compliance_report_generated", {
      reportId: report.id,
      state,
      entityType,
      businessName: body.businessName ?? "Anonymous",
      totalRules: report.results.length,
      complianceScore: score,
      generatedAt: report.generatedAt,
    }, env)
  );

  // Free preview: show only the first N findings
  const previewResults = report.results.slice(0, FREE_PREVIEW_LIMIT);
  const hasMore = report.results.length > FREE_PREVIEW_LIMIT;

  // Determine recommended product
  const { recommended, allProducts } = getProductForRequest(1, entityType);

  const responsePayload = {
    reportId: report.id,
    state,
    entityType,
    businessName: body.businessName ?? "Anonymous",
    complianceScore: score,
    summary: {
      totalRules: report.results.length,
      compliant: report.results.filter((r) => r.status === "COMPLIANT").length,
      nonCompliant: report.results.filter(
        (r) => r.status === "NON_COMPLIANT"
      ).length,
      needsReview: report.results.filter(
        (r) => r.status === "NEEDS_REVIEW"
      ).length,
      notApplicable: report.results.filter(
        (r) => r.status === "NOT_APPLICABLE"
      ).length,
    },
    preview: previewResults,
    fullReportAvailable: hasMore,
    fullReportFindings: report.results.length,
    message: hasMore
      ? `Showing ${FREE_PREVIEW_LIMIT} of ${report.results.length} findings. Purchase the full report to see all findings with detailed remediation guidance.`
      : `Showing all ${report.results.length} findings.`,
    pricing: {
      recommended: {
        id: recommended.id,
        name: recommended.name,
        price: recommended.priceLabel,
        description: recommended.description,
      },
      fullReport: {
        id: "single_state",
        name: "Single State Report",
        price: "$29",
        description:
          "Full compliance report with all findings, remediation guidance, and downloadable HTML.",
      },
    },
    checkout: hasMore
      ? {
          url: "/api/payments/checkout",
          method: "POST",
          body: {
            reportId: report.id,
            productId: recommended.id,
          },
          note: "POST this payload to create a Stripe checkout session. The response contains a redirect URL.",
        }
      : null,
    checkedAt: report.generatedAt,
    checkedBy: "REGULIS",
    verification: (report as unknown as Record<string, unknown>)._proof ?? null,
  };

  // TRUST — create audit trail (non-blocking)
  const proofData = (report as unknown as Record<string, unknown>)._proof as { id?: string; verdict?: string; deficiencies?: number; correctionsMade?: number } | undefined;
  ctx.waitUntil(
    regulis.trust(
      "compliance_check",
      body as unknown as Record<string, unknown>,
      responsePayload as Record<string, unknown>,
      protectionResult,
      proofData ? {
        id: proofData.id ?? "",
        citizenName: "REGULIS",
        outputType: "compliance_report",
        verdict: proofData.verdict as "PASS" | "CORRECTED" | "FLAGGED" | "BLOCKED",
        deficiencies: [],
        standardsChecked: regulis.standards.length,
        standardsApplicable: 0,
        checksRun: 6,
        checksPassed: 6 - (proofData.deficiencies ?? 0),
        checksFailed: proofData.deficiencies ?? 0,
        correctionsMade: proofData.correctionsMade ?? 0,
        proofDurationMs: 0,
        timestamp: report.generatedAt,
      } : undefined,
      report.clientId,
      startTime,
      env,
    )
  );

  return jsonResponse(responsePayload);

  } catch (error) {
    const message = error instanceof Error ? error.stack ?? error.message : String(error);
    return jsonResponse({ error: "Compliance check failed", debug: message }, 500);
  }
}

/**
 * GET /api/regulis/report/:id
 * Retrieve a specific compliance report.
 * Full results are gated behind payment — free tier gets the preview.
 */
export async function handleRegulisGetReport(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const reportId = params["id"];
  if (!reportId) {
    return jsonResponse({ error: "Report ID is required" }, 400);
  }

  const regulis = await getRegulisInstance(env);
  const report = await regulis.getReportById(reportId, env);

  if (!report) {
    return jsonResponse({ error: `Report ${reportId} not found` }, 404);
  }

  // Check if the report is paid
  const paid = await regulis.isReportPaid(reportId, env);
  const reportGenerator = new ReportGenerator();
  const score = reportGenerator.calculateScore(report.results);

  if (paid) {
    // Full report
    return jsonResponse({
      paid: true,
      report: {
        id: report.id,
        clientId: report.clientId,
        states: report.states,
        entityType: report.entityType,
        generatedAt: report.generatedAt,
        generatedBy: report.generatedBy,
      },
      complianceScore: score,
      totalFindings: report.results.length,
      results: report.results,
    });
  }

  // Unpaid — preview only
  const previewResults = report.results.slice(0, FREE_PREVIEW_LIMIT);
  return jsonResponse({
    paid: false,
    report: {
      id: report.id,
      states: report.states,
      entityType: report.entityType,
      generatedAt: report.generatedAt,
      generatedBy: report.generatedBy,
    },
    complianceScore: score,
    totalFindings: report.results.length,
    preview: previewResults,
    previewCount: previewResults.length,
    message: `This is a free preview showing ${previewResults.length} of ${report.results.length} findings. Purchase the full report to unlock all results.`,
    purchaseOptions: {
      singleState: {
        id: "single_state",
        price: "$29",
        url: `/api/regulis/purchase?reportId=${reportId}&product=single_state`,
      },
    },
    checkout: {
      url: "/api/payments/checkout",
      method: "POST",
      body: {
        reportId: reportId,
        productId: "single_state",
      },
      note: "POST this payload to create a Stripe checkout session. The response contains a redirect URL.",
    },
  });
}

/**
 * GET /api/regulis/products
 * List all available products and pricing.
 */
export async function handleRegulisProducts(
  _request: Request,
  _env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  return jsonResponse({
    citizen: "REGULIS",
    products: PRODUCTS.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.priceLabel,
      priceCents: p.price,
      description: p.description,
      features: p.features,
      maxStates: p.maxStates,
      recurring: p.recurring,
    })),
  });
}

/**
 * GET /api/regulis/stats
 * Public stats — total checks run, states covered, rules tracked.
 */
export async function handleRegulisStats(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const regulis = await getRegulisInstance(env);
  const stats = await regulis.getComplianceStats(env);
  const totalRules = await regulis.getTotalRuleCount(env);

  return jsonResponse({
    citizen: "REGULIS",
    stats: {
      totalChecksRun: stats.totalChecks,
      reportsGenerated: stats.reportsGenerated,
      statesCovered: stats.statesCovered.length,
      statesList: stats.statesCovered,
      totalRulesTracked: totalRules,
      topIssues: stats.topIssues.slice(0, 5),
    },
    lastUpdated: stats.lastBoot,
  });
}

/**
 * GET /api/regulis/states
 * List all states with their rule counts.
 */
export async function handleRegulisStates(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const regulis = await getRegulisInstance(env);
  const stateCounts = await regulis.getStateRuleCounts(env);
  const totalRules = await regulis.getTotalRuleCount(env);

  // Count federal rules separately
  let federalCount = 0;
  try {
    const row = await env.DB.prepare(
      `SELECT COUNT(*) as count FROM compliance_rules WHERE level = 'FEDERAL'`
    ).first<{ count: number }>();
    federalCount = row?.count ?? 0;
  } catch {
    // Table may not exist
  }

  return jsonResponse({
    citizen: "REGULIS",
    totalRules,
    federal: {
      level: "FEDERAL",
      ruleCount: federalCount,
    },
    states: stateCounts,
    stateCount: stateCounts.length,
  });
}

// =============================================================================
// Phase 2: MAP-1 Endpoints — Jurisdictional Intelligence
// =============================================================================

/**
 * GET /api/regulis/map
 * Full 50-state compliance map with rule counts per state and category.
 */
export async function handleRegulisMap(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const mapper = new Map1Worker();

  try {
    const complianceMap = await mapper.getComplianceMap(env);
    return jsonResponse({
      citizen: "REGULIS",
      worker: "MAP-1",
      map: complianceMap,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to generate compliance map";
    return jsonResponse({ error: message }, 500);
  }
}

/**
 * GET /api/regulis/map/:state
 * Jurisdiction profile for a single state.
 */
export async function handleRegulisMapState(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const stateParam = params["state"];
  if (!stateParam) {
    return jsonResponse({ error: "State parameter is required" }, 400);
  }

  const stateUpper = stateParam.toUpperCase();
  if (!isValidState(stateUpper)) {
    return jsonResponse(
      {
        error: `Invalid state: '${stateParam}'. Must be a valid two-letter US state code.`,
        validStates: Object.values(USState),
      },
      400
    );
  }

  const mapper = new Map1Worker();

  try {
    const profile = await mapper.mapJurisdiction(stateUpper as USState, env);
    return jsonResponse({
      citizen: "REGULIS",
      worker: "MAP-1",
      jurisdiction: profile,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to map jurisdiction";
    return jsonResponse({ error: message }, 500);
  }
}

/**
 * GET /api/regulis/compare?state1=CA&state2=TX&entityType=LLC
 * Compare compliance requirements between two states for a given entity type.
 */
export async function handleRegulisCompare(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const url = new URL(request.url);
  const state1Param = url.searchParams.get("state1");
  const state2Param = url.searchParams.get("state2");
  const entityTypeParam = url.searchParams.get("entityType");

  if (!state1Param || !state2Param || !entityTypeParam) {
    return jsonResponse(
      {
        error:
          "Query parameters 'state1', 'state2', and 'entityType' are all required.",
        example: "/api/regulis/compare?state1=CA&state2=TX&entityType=LLC",
      },
      400
    );
  }

  const s1 = state1Param.toUpperCase();
  const s2 = state2Param.toUpperCase();

  if (!isValidState(s1)) {
    return jsonResponse(
      { error: `Invalid state1: '${state1Param}'.`, validStates: Object.values(USState) },
      400
    );
  }
  if (!isValidState(s2)) {
    return jsonResponse(
      { error: `Invalid state2: '${state2Param}'.`, validStates: Object.values(USState) },
      400
    );
  }
  const compareEntityType = normalizeEntityType(entityTypeParam);
  if (!compareEntityType) {
    return jsonResponse(
      {
        error: `Invalid entityType: '${entityTypeParam}'.`,
        validTypes: Object.values(BusinessEntityType),
      },
      400
    );
  }

  const mapper = new Map1Worker();

  try {
    const comparison = await mapper.compareStates(
      s1 as USState,
      s2 as USState,
      compareEntityType,
      env
    );
    return jsonResponse({
      citizen: "REGULIS",
      worker: "MAP-1",
      comparison,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to compare states";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// Phase 2: ALERT-1 Endpoints — Compliance Alert Engine
// =============================================================================

/**
 * GET /api/regulis/alerts
 * Return all active compliance alerts sorted by urgency.
 */
export async function handleRegulisAlerts(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const alertEngine = new Alert1Worker();

  try {
    const alerts = await alertEngine.getActiveAlerts(env);
    return jsonResponse({
      citizen: "REGULIS",
      worker: "ALERT-1",
      totalActive: alerts.length,
      alerts,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to retrieve alerts";
    return jsonResponse({ error: message }, 500);
  }
}

/**
 * GET /api/regulis/alerts/:state
 * Return active alerts for a specific state.
 */
export async function handleRegulisAlertsForState(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const stateParam = params["state"];
  if (!stateParam) {
    return jsonResponse({ error: "State parameter is required" }, 400);
  }

  const stateUpper = stateParam.toUpperCase();
  if (!isValidState(stateUpper)) {
    return jsonResponse(
      {
        error: `Invalid state: '${stateParam}'. Must be a valid two-letter US state code.`,
        validStates: Object.values(USState),
      },
      400
    );
  }

  const alertEngine = new Alert1Worker();

  try {
    const alerts = await alertEngine.getAlertsForState(stateUpper, env);
    return jsonResponse({
      citizen: "REGULIS",
      worker: "ALERT-1",
      state: stateUpper,
      totalActive: alerts.length,
      alerts,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to retrieve alerts";
    return jsonResponse({ error: message }, 500);
  }
}

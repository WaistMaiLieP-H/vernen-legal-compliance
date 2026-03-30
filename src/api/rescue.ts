/**
 * Rescue Sequence API Routes
 *
 * Exposes the Automated Rescue Sequence engine through API endpoints.
 * When a statutory failure is detected across any intelligence pipeline,
 * these endpoints generate the specific deliverables an entity needs to survive.
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import {
  RescueEngine,
  ensureRescueTables,
  storeRescueSequence,
  getActiveRescues,
  getRescueSequenceById,
  updateDeliverableStatus,
} from "../services/rescue-engine.js";
import type {
  RescueTrigger,
  RescueType,
  DeliverableStatus,
} from "../services/rescue-engine.js";

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

// ═══════════════════════════════════════════════════════════════════════════
// Citizen Assignment Map (for status endpoint)
// ═══════════════════════════════════════════════════════════════════════════

const RESCUE_TYPE_INFO: Record<RescueType, { name: string; description: string; citizens: string[] }> = {
  SBA_REINSTATEMENT_BRIEF: {
    name: "SBA 8(a) Reinstatement Brief",
    description: "Legal brief and financial reconstruction for suspended 8(a) firms appealing to OHA",
    citizens: ["CLARIDEX", "FISCARA", "LEXARC", "INTEGRA", "SENTINEL-0"],
  },
  CMMC_SYSTEM_SECURITY_PLAN: {
    name: "CMMC System Security Plan",
    description: "Complete SSP, POA&M, and CUI documentation for defense contractors",
    citizens: ["PRIVAXIS", "VIGILUS", "SYNTARA", "SENTINEL-0"],
  },
  SINGLE_AUDIT_CORRECTIVE_ACTION: {
    name: "Single Audit Corrective Action",
    description: "Corrective action plan for FAC entities with material weakness findings",
    citizens: ["REGULIS", "CLARIDEX", "INTEGRA", "SENTINEL-0"],
  },
  HIPAA_BREACH_RESPONSE_PLAN: {
    name: "HIPAA Breach Response Plan",
    description: "Breach notification, root cause analysis, and remediation for HHS OCR breach entities",
    citizens: ["PRIVAXIS", "ETHICARA", "VIGILUS", "SENTINEL-0"],
  },
  MATERIAL_WEAKNESS_REMEDIATION: {
    name: "Material Weakness Remediation",
    description: "SEC-ready remediation plan for public companies with ICFR material weaknesses",
    citizens: ["CLARIDEX", "INTEGRA", "FISCARA", "SENTINEL-0"],
  },
  FAR_COMPLIANCE_REMAP: {
    name: "FAR Compliance Remap",
    description: "Contract portfolio re-mapping for contractors affected by FAR/DFARS rewrites",
    citizens: ["REGULIS", "LEXARC", "INTEGRA", "SENTINEL-0"],
  },
  CARES_ACT_RECONSTRUCTION: {
    name: "CARES Act Reconstruction",
    description: "Financial reconstruction and OIG response for pandemic relief clawback targets",
    citizens: ["CLARIDEX", "FISCARA", "INTEGRA", "ETHICARA", "SENTINEL-0"],
  },
  OCC_CONSENT_ORDER_RESPONSE: {
    name: "OCC Consent Order Response",
    description: "Comprehensive response plan for banks under OCC enforcement action",
    citizens: ["PRIVAXIS", "VIGILUS", "ETHICARA", "CLARIDEX", "SENTINEL-0"],
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// Route Handlers
// ═══════════════════════════════════════════════════════════════════════════

/**
 * GET /api/rescue/status — Public service info showing all 8 rescue types
 */
export async function handleRescueStatus(
  _request: Request,
  _env: Env,
): Promise<Response> {
  const rescueTypes = Object.entries(RESCUE_TYPE_INFO).map(([type, info]) => ({
    type,
    ...info,
  }));

  return json({
    service: "AUTOMATED_RESCUE_SEQUENCE",
    status: "ACTIVE",
    description: "When a statutory failure is detected across any intelligence pipeline, the Rescue Engine generates the specific deliverables the entity needs to survive.",
    rescueTypes,
    totalTypes: rescueTypes.length,
    pipelines: ["FAC", "HHS", "EDGAR", "SBA", "USAspending", "FedReg"],
  });
}

/**
 * POST /api/rescue/initiate — Initiate a rescue sequence (authenticated)
 *
 * Body: { triggerSource, triggerRuleId, entityId, entityName, sector, contractValue, statutoryFail,
 *         failureType, isRepeatFinding, hasCriminalIndicators, isGoingConcern, daysUntilDeadline }
 */
export async function handleRescueInitiate(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return json({ error: "Invalid JSON in request body" }, 400);
  }

  const triggerSource = String(body["triggerSource"] ?? "");
  const triggerRuleId = String(body["triggerRuleId"] ?? "");
  const entityId = String(body["entityId"] ?? "");
  const entityName = String(body["entityName"] ?? "");

  if (!triggerSource || !entityId || !entityName) {
    return json({ error: "triggerSource, entityId, and entityName are required" }, 400);
  }

  const trigger: RescueTrigger = {
    source: triggerSource,
    ruleId: triggerRuleId || `MANUAL-${triggerSource}`,
    entityId,
    entityName,
    sector: String(body["sector"] ?? "unknown"),
    failureType: String(body["failureType"] ?? body["statutoryFail"] ?? triggerSource),
    contractValue: body["contractValue"] ? Number(body["contractValue"]) : undefined,
    isStatutory: body["statutoryFail"] ? true : (body["isStatutory"] === true),
    isRepeatFinding: body["isRepeatFinding"] === true,
    hasCriminalIndicators: body["hasCriminalIndicators"] === true,
    isGoingConcern: body["isGoingConcern"] === true,
    daysUntilDeadline: body["daysUntilDeadline"] ? Number(body["daysUntilDeadline"]) : undefined,
  };

  try {
    await ensureRescueTables(env.DB);

    const engine = new RescueEngine(env.DB);
    const sequence = engine.generateRescueSequence(trigger);

    // Store in D1
    await storeRescueSequence(env.DB, sequence);

    return json({
      success: true,
      sequence,
    }, 201);
  } catch (error) {
    console.error("Rescue initiation error:", error instanceof Error ? error.message : error);
    return json({ error: "Failed to initiate rescue sequence" }, 500);
  }
}

/**
 * GET /api/rescue/:sequenceId — Get a specific rescue sequence (authenticated)
 */
export async function handleRescueGet(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const sequenceId = params["sequenceId"];
  if (!sequenceId) {
    return json({ error: "sequenceId is required" }, 400);
  }

  try {
    await ensureRescueTables(env.DB);

    const { sequence, deliverables } = await getRescueSequenceById(env.DB, sequenceId);

    if (!sequence) {
      return json({ error: "Rescue sequence not found" }, 404);
    }

    // Parse JSON fields for response
    return json({
      sequence: {
        ...sequence,
        assigned_citizens: tryParseJSON(sequence["assigned_citizens"] as string, []),
        timeline_json: tryParseJSON(sequence["timeline_json"] as string, {}),
      },
      deliverables: deliverables.map((d) => ({
        ...d,
        template_sections: tryParseJSON(d["template_sections"] as string, []),
        required_inputs: tryParseJSON(d["required_inputs"] as string, []),
      })),
    });
  } catch (error) {
    console.error("Rescue get error:", error instanceof Error ? error.message : error);
    return json({ error: "Failed to retrieve rescue sequence" }, 500);
  }
}

/**
 * GET /api/rescue/report/:sequenceId — Branded HTML report (public)
 */
export async function handleRescueReport(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams,
): Promise<Response> {
  const sequenceId = params["sequenceId"];
  if (!sequenceId) {
    return json({ error: "sequenceId is required" }, 400);
  }

  try {
    await ensureRescueTables(env.DB);

    const { sequence, deliverables } = await getRescueSequenceById(env.DB, sequenceId);

    if (!sequence) {
      return json({ error: "Rescue sequence not found" }, 404);
    }

    // Reconstruct the RescueSequence object from DB rows
    const rescueSequence = {
      id: String(sequence["id"]),
      rescueType: String(sequence["rescue_type"]) as RescueType,
      entityId: String(sequence["entity_id"]),
      entityName: String(sequence["entity_name"]),
      sector: String(sequence["sector"] ?? ""),
      triggerSource: String(sequence["trigger_source"]),
      triggerRuleId: String(sequence["trigger_rule_id"]),
      federalSurvivalScore: Number(sequence["federal_survival_score"]),
      urgency: String(sequence["urgency"]) as "CRITICAL" | "HIGH" | "ELEVATED" | "STANDARD",
      assignedCitizens: tryParseJSON(sequence["assigned_citizens"] as string, []) as string[],
      deliverables: deliverables.map((d) => ({
        id: String(d["id"]),
        title: String(d["title"]),
        description: String(d["description"] ?? ""),
        category: String(d["category"]) as "LEGAL_BRIEF" | "COMPLIANCE_PLAN" | "FINANCIAL_RECONSTRUCTION" | "TECHNICAL_ARTIFACT" | "GOVERNANCE_DOCUMENT",
        status: String(d["status"]) as DeliverableStatus,
        assignedCitizen: String(d["assigned_citizen"]),
        content: String(d["content"] ?? ""),
        templateSections: tryParseJSON(d["template_sections"] as string, []) as string[],
        requiredInputs: tryParseJSON(d["required_inputs"] as string, []) as string[],
        deadline: String(d["deadline"] ?? ""),
      })),
      timeline: tryParseJSON(sequence["timeline_json"] as string, {
        detectionDate: String(sequence["created_at"] ?? ""),
        assessmentDeadline: "",
        deliveryDeadline: "",
        filingDeadline: "",
        milestones: [],
      }) as {
        detectionDate: string;
        assessmentDeadline: string;
        deliveryDeadline: string;
        filingDeadline: string;
        milestones: { date: string; action: string; citizen: string }[];
      },
      estimatedCost: String(sequence["estimated_cost"] ?? ""),
      generatedAt: String(sequence["created_at"] ?? ""),
    };

    const engine = new RescueEngine(env.DB);
    const reportHTML = engine.generateRescueReportHTML(rescueSequence);
    return html(reportHTML);
  } catch (error) {
    console.error("Rescue report error:", error instanceof Error ? error.message : error);
    return json({ error: "Failed to generate rescue report" }, 500);
  }
}

/**
 * GET /api/rescue/list — List active rescues (authenticated)
 *
 * Query params: urgency, type, status, limit
 */
export async function handleRescueList(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    await ensureRescueTables(env.DB);

    const url = new URL(request.url);
    const rescues = await getActiveRescues(env.DB, {
      urgency: url.searchParams.get("urgency") ?? undefined,
      rescueType: url.searchParams.get("type") ?? undefined,
      status: url.searchParams.get("status") ?? undefined,
      limit: url.searchParams.has("limit")
        ? parseInt(url.searchParams.get("limit")!, 10)
        : 50,
    });

    return json({
      rescues: rescues.map((r) => ({
        ...r,
        assigned_citizens: tryParseJSON(r["assigned_citizens"] as string, []),
      })),
      count: rescues.length,
    });
  } catch (error) {
    console.error("Rescue list error:", error instanceof Error ? error.message : error);
    return json({ error: "Failed to list rescue sequences" }, 500);
  }
}

/**
 * POST /api/rescue/deliverable/update — Update deliverable status (authenticated)
 *
 * Body: { deliverableId, status, notes }
 */
export async function handleRescueDeliverableUpdate(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return json({ error: "Invalid JSON in request body" }, 400);
  }

  const deliverableId = String(body["deliverableId"] ?? "");
  const status = String(body["status"] ?? "") as DeliverableStatus;
  const notes = body["notes"] ? String(body["notes"]) : undefined;

  if (!deliverableId || !status) {
    return json({ error: "deliverableId and status are required" }, 400);
  }

  const validStatuses: DeliverableStatus[] = ["PENDING", "IN_PROGRESS", "GENERATED", "REVIEWED", "DELIVERED"];
  if (!validStatuses.includes(status)) {
    return json({ error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` }, 400);
  }

  try {
    await ensureRescueTables(env.DB);

    const updated = await updateDeliverableStatus(env.DB, deliverableId, status, notes);

    if (!updated) {
      return json({ error: "Deliverable not found" }, 404);
    }

    return json({
      success: true,
      deliverableId,
      status,
      notes: notes ?? null,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Deliverable update error:", error instanceof Error ? error.message : error);
    return json({ error: "Failed to update deliverable status" }, 500);
  }
}

/**
 * POST /api/rescue/automate — Run a pipeline and auto-generate rescues (authenticated)
 *
 * Body: { pipeline: "FAC" | "HHS" | "EDGAR" | "SBA" | "USAspending" | "FedReg" }
 *
 * This endpoint triggers the named pipeline and generates rescue sequences
 * for all statutory failures found. In a full production system, each pipeline
 * would be called. Here we demonstrate the pattern with simulated pipeline results.
 */
export async function handleRescueAutomate(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return json({ error: "Invalid JSON in request body" }, 400);
  }

  const pipeline = String(body["pipeline"] ?? "").toUpperCase();
  const validPipelines = ["FAC", "HHS", "EDGAR", "SBA", "USASPENDING", "FEDREG"];

  if (!validPipelines.includes(pipeline)) {
    return json({
      error: `Invalid pipeline. Must be one of: ${validPipelines.join(", ")}`,
    }, 400);
  }

  try {
    await ensureRescueTables(env.DB);

    // Fetch stored leads from the pipeline's D1 table
    const leads = await fetchPipelineLeads(env.DB, pipeline);

    if (leads.length === 0) {
      return json({
        pipeline,
        message: "No stored leads found for this pipeline. Run the pipeline first to populate leads.",
        sequences: [],
        count: 0,
      });
    }

    const engine = new RescueEngine(env.DB);
    const pipelineResult = {
      leads,
      source: pipeline,
    };

    const sequences = engine.runAutomatedRescue(pipelineResult);

    // Store all generated sequences
    for (const seq of sequences) {
      await storeRescueSequence(env.DB, seq);
    }

    return json({
      pipeline,
      sequences,
      count: sequences.length,
      totalLeadsScanned: leads.length,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Rescue automate error:", error instanceof Error ? error.message : error);
    return json({ error: "Failed to run automated rescue" }, 500);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Pipeline Lead Fetcher
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Fetch stored leads from a pipeline's D1 table and normalize them
 * into the shape the RescueEngine expects.
 */
async function fetchPipelineLeads(
  db: D1Database,
  pipeline: string
): Promise<Array<{
  entity: { reportId?: string; auditeeNname?: string; auditeeEin?: string; entityName?: string; [key: string]: unknown };
  gapScore?: number;
  gapCategories?: string[];
  findings?: Array<{ isMaterialWeakness?: boolean; isRepeatFinding?: boolean; isQuestionedCosts?: boolean }>;
}>> {
  const tableMap: Record<string, string> = {
    FAC: "fac_leads",
    HHS: "hhs_leads",
    EDGAR: "edgar_leads",
    SBA: "sba_leads",
    USASPENDING: "spending_leads",
    FEDREG: "fedreg_leads",
  };

  const table = tableMap[pipeline];
  if (!table) return [];

  try {
    // Check if the table exists
    const tableCheck = await db.prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name=?"
    ).bind(table).first();

    if (!tableCheck) return [];

    const result = await db.prepare(
      `SELECT * FROM ${table} ORDER BY gap_score DESC LIMIT 50`
    ).all();

    return (result.results as Record<string, unknown>[]).map((row) => ({
      entity: {
        reportId: String(row["report_id"] ?? row["entity_id"] ?? row["uei"] ?? row["cik"] ?? ""),
        auditeeNname: String(row["auditee_name"] ?? row["entity_name"] ?? row["company_name"] ?? row["firm_name"] ?? ""),
        auditeeEin: String(row["auditee_ein"] ?? row["ein"] ?? ""),
        entityName: String(row["auditee_name"] ?? row["entity_name"] ?? row["company_name"] ?? row["firm_name"] ?? ""),
      },
      gapScore: Number(row["gap_score"] ?? 0),
      gapCategories: tryParseJSON(String(row["gap_categories"] ?? "[]"), []) as string[],
      findings: [
        {
          isMaterialWeakness: Number(row["has_material_weakness"] ?? 0) === 1,
          isRepeatFinding: Number(row["has_repeat_findings"] ?? 0) === 1,
          isQuestionedCosts: Number(row["has_questioned_costs"] ?? 0) === 1,
        },
      ],
    }));
  } catch {
    // Table might not exist yet or have different schema
    return [];
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Utilities
// ═══════════════════════════════════════════════════════════════════════════

function tryParseJSON(str: string, fallback: unknown): unknown {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}

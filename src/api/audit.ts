/**
 * VERNEN™ Audit & Forms API Endpoints
 * Routes for the Autonomous Audit Engine and Guided Document Navigator.
 *
 * © 2024-2026 Michael Vernen Thomas Hartmann. All Rights Reserved.
 */

import type { Env } from "../index.js";
import { AuditEngine } from "../services/audit-engine.js";
import { FormNavigator } from "../services/form-navigator.js";
import { FORM_REGISTRY } from "../data/form-registry.js";

type RouteParams = Record<string, string>;

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// AUDIT ENDPOINTS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * POST /api/audit/document
 * Submit a document for 6-pass autonomous audit.
 * Body: { documentType: string, content: string }
 */
export async function handleAuditDocument(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  try {
    const body = await request.json() as { documentType?: string; content?: string };

    if (!body.content || typeof body.content !== "string") {
      return jsonResponse({ error: "Missing required field: content" }, 400);
    }

    if (body.content.length < 10) {
      return jsonResponse({ error: "Document content too short for meaningful audit." }, 400);
    }

    if (body.content.length > 500_000) {
      return jsonResponse({ error: "Document content exceeds maximum size of 500,000 characters." }, 400);
    }

    const engine = new AuditEngine();
    const result = await engine.auditDocument(
      body.documentType || "unknown",
      body.content,
      env
    );

    return jsonResponse({
      success: true,
      audit: result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Audit failed";
    return jsonResponse({ error: message }, 500);
  }
}

/**
 * GET /api/audit/:id
 * Get audit results by ID.
 */
export async function handleGetAudit(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const auditId = params["id"];
  if (!auditId) {
    return jsonResponse({ error: "Audit ID required" }, 400);
  }

  try {
    const row = await env.DB.prepare(
      "SELECT * FROM document_audits WHERE id = ?"
    ).bind(auditId).first<{
      id: string;
      client_id: string | null;
      document_type: string;
      audit_status: string;
      passes_completed: number;
      total_passes: number;
      findings: string | null;
      risk_score: number | null;
      audited_by: string;
      created_at: string;
      completed_at: string | null;
    }>();

    if (!row) {
      return jsonResponse({ error: "Audit not found" }, 404);
    }

    return jsonResponse({
      id: row.id,
      clientId: row.client_id,
      documentType: row.document_type,
      status: row.audit_status,
      passesCompleted: row.passes_completed,
      totalPasses: row.total_passes,
      findings: row.findings ? JSON.parse(row.findings) : [],
      riskScore: row.risk_score,
      auditedBy: row.audited_by,
      createdAt: row.created_at,
      completedAt: row.completed_at,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to retrieve audit";
    return jsonResponse({ error: message }, 500);
  }
}

/**
 * GET /api/audit/:id/findings
 * Get detailed findings for an audit.
 */
export async function handleGetAuditFindings(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const auditId = params["id"];
  if (!auditId) {
    return jsonResponse({ error: "Audit ID required" }, 400);
  }

  try {
    const results = await env.DB.prepare(
      "SELECT * FROM audit_findings WHERE audit_id = ? ORDER BY pass_number, severity"
    ).bind(auditId).all<{
      id: string;
      audit_id: string;
      pass_number: number;
      pass_name: string;
      severity: string;
      finding: string;
      recommendation: string | null;
      statutory_basis: string | null;
      created_at: string;
    }>();

    const findings = (results.results || []).map(row => ({
      id: row.id,
      auditId: row.audit_id,
      passNumber: row.pass_number,
      passName: row.pass_name,
      severity: row.severity,
      finding: row.finding,
      recommendation: row.recommendation,
      statutoryBasis: row.statutory_basis,
      createdAt: row.created_at,
    }));

    return jsonResponse({
      auditId,
      totalFindings: findings.length,
      findings,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to retrieve findings";
    return jsonResponse({ error: message }, 500);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// FORMS / GDN ENDPOINTS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * GET /api/forms
 * List all available court forms.
 */
export async function handleListForms(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  try {
    const navigator = new FormNavigator();
    const forms = await navigator.getAvailableForms(env);

    return jsonResponse({
      total: forms.length,
      forms,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to list forms";
    return jsonResponse({ error: message }, 500);
  }
}

/**
 * GET /api/forms/:code
 * Get form guidance. Query param: ?language=es
 */
export async function handleGetFormGuidance(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const code = params["code"];
  if (!code) {
    return jsonResponse({ error: "Form code required" }, 400);
  }

  const url = new URL(request.url);
  const language = url.searchParams.get("language") || undefined;

  try {
    const navigator = new FormNavigator();
    const guidance = await navigator.getFormGuidance(code, language, env);

    if (!guidance) {
      return jsonResponse({ error: `Form ${code} not found` }, 404);
    }

    return jsonResponse(guidance);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get form guidance";
    return jsonResponse({ error: message }, 500);
  }
}

/**
 * GET /api/forms/:code/validate
 * Validate a form field. Query params: ?fieldId=FL100-01&value=John%20Doe
 */
export async function handleValidateFormField(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const code = params["code"];
  if (!code) {
    return jsonResponse({ error: "Form code required" }, 400);
  }

  const url = new URL(request.url);
  const fieldId = url.searchParams.get("fieldId");
  const value = url.searchParams.get("value") || "";

  if (!fieldId) {
    return jsonResponse({ error: "Query parameter 'fieldId' is required" }, 400);
  }

  try {
    const navigator = new FormNavigator();
    const result = await navigator.validateFormField(code, fieldId, value, env);

    return jsonResponse(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Validation failed";
    return jsonResponse({ error: message }, 500);
  }
}

/**
 * GET /api/forms/scenarios
 * List all available scenarios.
 */
export async function handleListScenarios(
  _request: Request,
  _env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  // Return the scenario IDs and basic info
  const scenarios = [
    "divorce_no_children", "divorce_with_children", "response_to_divorce",
    "custody_modification", "custody_emergency", "child_support_modification",
    "dv_restraining_order", "dv_response", "fee_waiver",
    "motion_general", "respond_to_motion", "child_abduction_prevention",
  ];

  return jsonResponse({ total: scenarios.length, scenarios });
}

/**
 * GET /api/forms/scenario/:id
 * Get a specific scenario. Query param: ?language=es
 */
export async function handleGetScenario(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const scenarioId = params["id"];
  if (!scenarioId) {
    return jsonResponse({ error: "Scenario ID required" }, 400);
  }

  const url = new URL(request.url);
  const language = url.searchParams.get("language") || undefined;

  try {
    const navigator = new FormNavigator();
    const scenario = await navigator.getScenario(scenarioId, language, env);

    if (!scenario) {
      return jsonResponse({ error: `Scenario ${scenarioId} not found` }, 404);
    }

    return jsonResponse(scenario);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get scenario";
    return jsonResponse({ error: message }, 500);
  }
}

/**
 * POST /api/forms/load
 * (Founder-only) Load form annotations from JSON into D1.
 * Body: { forms: [ { form_code, title, tier, category, field_count, languages, data } ] }
 */
export async function handleLoadForms(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  try {
    const body = await request.json() as {
      forms?: Array<{
        form_code: string;
        title: string;
        tier?: string;
        category?: string;
        field_count?: number;
        languages?: string[];
        data: unknown;
      }>;
    };

    if (!body.forms || !Array.isArray(body.forms)) {
      return jsonResponse({ error: "Missing required field: forms (array)" }, 400);
    }

    let loaded = 0;
    let errors = 0;
    const errorDetails: string[] = [];

    for (const form of body.forms) {
      if (!form.form_code || !form.title || !form.data) {
        errors++;
        errorDetails.push(`Skipped: missing required fields for form ${form.form_code || "(unknown)"}`);
        continue;
      }

      const id = crypto.randomUUID();
      const dataStr = typeof form.data === "string" ? form.data : JSON.stringify(form.data);
      const languagesStr = JSON.stringify(form.languages || ["en", "es", "zh", "vi", "so", "ti", "am", "ar", "ht", "ko", "pt", "ru", "tl"]);

      try {
        await env.DB.prepare(
          `INSERT OR REPLACE INTO court_forms (id, form_code, title, tier, category, field_count, languages, data)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(
          id,
          form.form_code.toUpperCase(),
          form.title,
          form.tier || "A",
          form.category || "general",
          form.field_count || 0,
          languagesStr,
          dataStr
        ).run();
        loaded++;
      } catch (err) {
        errors++;
        errorDetails.push(`Failed to load ${form.form_code}: ${err instanceof Error ? err.message : "unknown error"}`);
      }
    }

    return jsonResponse({
      success: true,
      loaded,
      errors,
      errorDetails: errorDetails.length > 0 ? errorDetails : undefined,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load forms";
    return jsonResponse({ error: message }, 500);
  }
}

/**
 * GET /api/forms/registry
 * Returns the enriched form registry with 13-language titles,
 * governing statutes, Tier A + Tier B forms, and metadata.
 */
export async function handleFormRegistry(
  request: Request,
  _env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const url = new URL(request.url);
  const tier = url.searchParams.get("tier")?.toUpperCase();
  const category = url.searchParams.get("category")?.toLowerCase();

  let forms = [...(FORM_REGISTRY.forms || []), ...(FORM_REGISTRY.tier_b_forms || [])];

  if (tier === "A") {
    forms = FORM_REGISTRY.forms || [];
  } else if (tier === "B") {
    forms = FORM_REGISTRY.tier_b_forms || [];
  }

  if (category) {
    forms = forms.filter((f: any) => f.category === category || f.subcategory === category);
  }

  return new Response(JSON.stringify({
    metadata: FORM_REGISTRY.metadata,
    total: forms.length,
    forms,
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, s-maxage=7200",
    },
  });
}

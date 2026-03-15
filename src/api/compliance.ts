import type { Env } from "../index.js";
import { USState, BusinessEntityType } from "../types/client.js";
import type { Client } from "../types/client.js";
import { ComplianceEngine } from "../services/compliance-engine.js";
import { ReportGenerator } from "../services/report-generator.js";
import { Scan1Worker } from "../workers/scan-1/index.js";
import { parseJsonBody, generateId } from "../utils/helpers.js";

const FREE_PREVIEW_LIMIT = 5;

interface ComplianceCheckRequest {
  state: string;
  entityType: string;
  businessName?: string;
  email?: string;
}

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
 * Validate that a string is a valid BusinessEntityType enum value.
 */
function isValidEntityType(value: string): value is BusinessEntityType {
  return Object.values(BusinessEntityType).includes(
    value as BusinessEntityType
  );
}

/**
 * Handler for POST /api/compliance/check
 * Accepts state + entity type, runs a scan via SCAN-1,
 * generates a report via ReportGenerator, and returns results.
 * Free preview shows the first 5 findings; full report requires payment.
 */
export async function handleComplianceCheck(
  request: Request,
  env: Env
): Promise<Response> {
  let body: ComplianceCheckRequest;

  try {
    body = await parseJsonBody<ComplianceCheckRequest>(request);
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

  // Validate entity type
  if (!isValidEntityType(body.entityType)) {
    return jsonResponse(
      {
        error: `Invalid entityType: '${body.entityType}'.`,
        validTypes: Object.values(BusinessEntityType),
      },
      400
    );
  }

  const state = body.state as USState;
  const entityType = body.entityType as BusinessEntityType;

  // Build a client object for the scan
  const client: Client = {
    id: generateId("cli"),
    name: body.businessName ?? "Anonymous",
    entityType,
    states: [state],
    industry: "General",
    createdAt: new Date().toISOString(),
  };

  // Run the scan via SCAN-1
  const scanner = new Scan1Worker();
  const results = await scanner.generateGapReport(client, [state], env.DB);

  // Generate the report
  const reportGenerator = new ReportGenerator();
  const report = reportGenerator.generate(results, client);
  const score = reportGenerator.calculateScore(results);

  // Free preview: show only the first N findings
  const previewResults = results.slice(0, FREE_PREVIEW_LIMIT);
  const hasMore = results.length > FREE_PREVIEW_LIMIT;

  return jsonResponse({
    reportId: report.id,
    clientId: client.id,
    state,
    entityType,
    complianceScore: score,
    summary: {
      totalRules: results.length,
      compliant: results.filter((r) => r.status === "COMPLIANT").length,
      nonCompliant: results.filter((r) => r.status === "NON_COMPLIANT").length,
      needsReview: results.filter((r) => r.status === "NEEDS_REVIEW").length,
      notApplicable: results.filter((r) => r.status === "NOT_APPLICABLE").length,
    },
    preview: previewResults,
    fullReportAvailable: hasMore,
    fullReportCount: results.length,
    message: hasMore
      ? `Showing ${FREE_PREVIEW_LIMIT} of ${results.length} findings. Full report available with a paid plan.`
      : `Showing all ${results.length} findings.`,
    checkedAt: new Date().toISOString(),
    checkedBy: "REGULIS",
    contact: body.email ?? null,
  });
}

/**
 * Handler for GET /api/compliance/report/:id
 * Retrieves a previously generated report in the requested format.
 */
export async function handleGetReport(
  request: Request,
  env: Env,
  reportId: string,
  format: "html" | "json" = "json"
): Promise<Response> {
  // In production, this would load the report from KV or D1
  // For now, return a not-found if the report doesn't exist in cache
  const cached = await env.KNOWLEDGE_STORE.get(`report:${reportId}`);

  if (!cached) {
    return jsonResponse({ error: "Report not found" }, 404);
  }

  const report = JSON.parse(cached);
  const generator = new ReportGenerator();

  if (format === "html") {
    const html = generator.formatAsHTML(report);
    return new Response(html, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  const json = generator.formatAsJSON(report);
  return new Response(json, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

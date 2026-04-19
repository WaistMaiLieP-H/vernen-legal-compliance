/**
 * forensic.ts — Forensic Narrative Audit API Routes
 *
 * Endpoints for the full forensic audit pipeline:
 * - Submit documents for forensic analysis
 * - Run character decomposition on a document
 * - Execute audit with assembled review team
 * - Run the full pipeline on a case
 * - Get detection rules
 * - Get pipeline results
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { parseJsonBody } from "../utils/helpers.js";
import { extractDocumentContent, verifyShadowIncidents } from "../services/document-extractor.js";
import {
  extractCharacters,
  assembleTeam,
  teamSummary,
} from "../services/character-decomposition.js";
import type { DecomposedAudit } from "../services/character-decomposition.js";
import {
  executeAudit,
  renderAuditReport,
} from "../services/execution-engine.js";
import type { DocumentContent, DetectionRule } from "../services/execution-engine.js";
import { runPipeline, renderPipelineReport } from "../services/pipeline-runner.js";
import type { PipelineConfig, PipelineResult } from "../services/pipeline-runner.js";
import { generateId } from "../utils/helpers.js";

type RouteParams = Record<string, string>;

// ---------------------------------------------------------------------------
// In-memory result store (KV-backed in production)
// ---------------------------------------------------------------------------

const pipelineResults = new Map<string, PipelineResult>();
const auditResults = new Map<string, DecomposedAudit>();

// ---------------------------------------------------------------------------
// Built-in Detection Rules
// ---------------------------------------------------------------------------

export const DETECTION_RULES: DetectionRule[] = [
  {
    id: "DR-001",
    ruleName: "ROLE_REVERSAL",
    ruleDescription: "Same person appears as victim in one report and suspect in another",
    severity: "CRITICAL",
    triggerConditions: ["same_person_name_or_dob_match", "role_in_report_a != role_in_report_b"],
    findingTemplate: "Role reversal detected: {person} designated as {role_a} in {doc_a} and {role_b} in {doc_b}",
    governingStandard: "POST Procedure D-1: Officer must document role change justification",
  },
  {
    id: "DR-002",
    ruleName: "REPEAT_ADDRESS",
    ruleDescription: "Same address appears in multiple incidents involving same parties",
    severity: "HIGH",
    triggerConditions: ["same_address", "same_parties"],
    findingTemplate: "Address {address} has {count} incidents involving same parties — indicates pattern, not isolated event",
    governingStandard: "OPD Policy 15.1: Pattern recognition in domestic violence calls",
  },
  {
    id: "DR-003",
    ruleName: "MISSING_DV_SUPPLEMENT",
    ruleDescription: "Domestic violence incident missing DV supplement form",
    severity: "CRITICAL",
    triggerConditions: ["incident_type_domestic", "no_dv_supplement"],
    findingTemplate: "DV incident report missing mandatory DV supplement — violation of mandatory reporting",
    governingStandard: "PC 13730: DV report form required for every DV incident",
  },
  {
    id: "DR-004",
    ruleName: "CHILD_PRESENT_NO_CANRA",
    ruleDescription: "Child present at DV incident without CANRA report generated",
    severity: "CRITICAL",
    triggerConditions: ["child_present", "incident_type_domestic", "no_canra_referral"],
    findingTemplate: "Child present during DV incident with no CANRA referral generated — mandatory reporting violation",
    governingStandard: "PC 11166(a): Mandated reporter must report suspected child abuse/neglect",
  },
  {
    id: "DR-005",
    ruleName: "UNSIGNED_COURT_FORM",
    ruleDescription: "Court form filed without judicial signature or authorization",
    severity: "HIGH",
    triggerConditions: ["court_form", "no_judicial_signature"],
    findingTemplate: "Court form {form_number} filed without required judicial signature",
    governingStandard: "CRC Rule 2.30: Court orders must bear judge signature",
  },
  {
    id: "DR-006",
    ruleName: "SHADOW_INCIDENT_REFERENCED",
    ruleDescription: "Event referenced in narrative with no corresponding report",
    severity: "HIGH",
    triggerConditions: ["event_referenced_no_record"],
    findingTemplate: "Referenced event '{event}' has no corresponding official record — shadow incident",
    governingStandard: "Evidence Code 1521: Best evidence rule — referenced event needs documentation",
  },
  {
    id: "DR-007",
    ruleName: "TEMPORAL_IMPOSSIBILITY",
    ruleDescription: "Timeline event impossible based on other documented timestamps",
    severity: "CRITICAL",
    triggerConditions: ["timestamp_conflict"],
    findingTemplate: "Event at {time_a} conflicts with documented location at {time_b} — temporal impossibility",
    governingStandard: "Evidence Code 352: Probative value vs prejudicial effect",
  },
  {
    id: "DR-008",
    ruleName: "NARRATIVE_CONTRADICTION",
    ruleDescription: "Same event described differently by same person in different documents",
    severity: "HIGH",
    triggerConditions: ["same_speaker", "same_event", "different_description"],
    findingTemplate: "Inconsistent account by {speaker}: '{claim_a}' in {doc_a} vs '{claim_b}' in {doc_b}",
    governingStandard: "Evidence Code 1235: Prior inconsistent statement",
  },
  {
    id: "DR-009",
    ruleName: "EMERGENCY_PROTECTIVE_ORDER_NOT_SERVED",
    ruleDescription: "EPO issued but no proof of service within required timeframe",
    severity: "HIGH",
    triggerConditions: ["epo_issued", "no_proof_of_service"],
    findingTemplate: "Emergency Protective Order issued but no proof of service found",
    governingStandard: "FC 6241: EPO must be served personally or by law enforcement",
  },
  {
    id: "DR-010",
    ruleName: "DUAL_ARREST_DV",
    ruleDescription: "Both parties arrested at domestic violence call — potential dominant aggressor failure",
    severity: "CRITICAL",
    triggerConditions: ["dual_arrest", "incident_type_domestic"],
    findingTemplate: "Dual arrest in DV incident — officer may have failed to identify dominant aggressor per PC 836(c)(3)",
    governingStandard: "PC 836(c)(3): Officer must identify dominant aggressor in DV",
  },
  {
    id: "DR-011",
    ruleName: "OFFICER_BODY_CAM_GAP",
    ruleDescription: "Gap in body camera footage during critical incident phases",
    severity: "HIGH",
    triggerConditions: ["body_camera_referenced", "footage_gap"],
    findingTemplate: "Body camera footage gap during {phase} — critical evidence preservation failure",
    governingStandard: "OPD DGO I-15.1: Continuous recording during enforcement contacts",
  },
  {
    id: "DR-012",
    ruleName: "VICTIM_STATEMENT_PARAPHRASED",
    ruleDescription: "Victim's words paraphrased by officer instead of directly quoted",
    severity: "MODERATE",
    triggerConditions: ["victim_statement", "not_direct_quote"],
    findingTemplate: "Victim statement paraphrased by {officer} — direct quote not captured",
    governingStandard: "POST Learning Domain 33: Report writing requires direct quotation of material statements",
  },
];

// ---------------------------------------------------------------------------
// Handlers
// ---------------------------------------------------------------------------

/** GET /api/forensic/status — Engine status and capabilities */
export async function handleForensicStatus(
  _request: Request,
  _env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams,
): Promise<Response> {
  return new Response(JSON.stringify({
    service: "Forensic Narrative Audit Engine",
    version: "1.0.0",
    status: "OPERATIONAL",
    components: {
      documentExtractor: "ACTIVE",
      characterDecomposition: "ACTIVE",
      executionEngine: "ACTIVE",
      detectionRuleLibrary: "ACTIVE",
      pipelineRunner: "ACTIVE",
    },
    detectionRules: DETECTION_RULES.length,
    storedPipelines: pipelineResults.size,
    storedAudits: auditResults.size,
    endpoints: [
      "GET  /api/forensic/status",
      "GET  /api/forensic/rules",
      "POST /api/forensic/extract",
      "POST /api/forensic/decompose",
      "POST /api/forensic/audit",
      "POST /api/forensic/pipeline",
      "GET  /api/forensic/pipeline/:id",
      "GET  /api/forensic/pipeline/:id/report",
      "GET  /api/forensic/audit/:id",
      "GET  /api/forensic/audit/:id/report",
    ],
  }), { status: 200, headers: { "Content-Type": "application/json" } });
}

/** GET /api/forensic/rules — List detection rules */
export async function handleForensicRules(
  _request: Request,
  _env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams,
): Promise<Response> {
  return new Response(JSON.stringify({
    count: DETECTION_RULES.length,
    rules: DETECTION_RULES,
  }), { status: 200, headers: { "Content-Type": "application/json" } });
}

/** POST /api/forensic/extract — Extract structured content from raw document text */
export async function handleForensicExtract(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams,
): Promise<Response> {
  const auth = await authenticate(request, env);
  if (auth) return auth;

  const body = await parseJsonBody<{
    sourceFile: string;
    documentType: string;
    documentDate: string;
    jurisdiction?: string;
    agency?: string;
    caseNumber?: string;
    pages: Array<{ pageNumber: number; rawText: string }>;
  }>(request);

  if (!body || !body.sourceFile || !body.pages?.length) {
    return new Response(JSON.stringify({
      error: "Required: sourceFile, documentType, documentDate, pages (array of { pageNumber, rawText })",
    }), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  const pageTexts = body.pages.map(p => p.rawText);
  const fullText = pageTexts.join("\n\n");

  const content = extractDocumentContent(
    body.sourceFile,
    fullText,
    pageTexts,
  );

  return new Response(JSON.stringify({
    documentId: content.id,
    sourceFile: content.sourceFile,
    documentType: content.documentType,
    persons: content.persons.length,
    events: content.events.length,
    statements: content.statements.length,
    evidenceItems: content.evidenceItems.length,
    timestamps: content.timestamps.length,
    content,
  }), { status: 200, headers: { "Content-Type": "application/json" } });
}

/** POST /api/forensic/decompose — Extract characters and assemble review team */
export async function handleForensicDecompose(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams,
): Promise<Response> {
  const auth = await authenticate(request, env);
  if (auth) return auth;

  const body = await parseJsonBody<{
    document: DocumentContent;
  }>(request);

  if (!body?.document) {
    return new Response(JSON.stringify({
      error: "Required: document (DocumentContent object from /extract endpoint)",
    }), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  const doc = body.document;
  const rawChars = doc.persons.map(p => ({
    name: p.name,
    role: p.role,
    designation: p.designation,
    agency: p.agency,
    badgeOrId: p.badgeOrId,
    metadata: p.attributes,
  }));

  const characters = extractCharacters(rawChars);
  const team = assembleTeam(doc.id, doc.documentType, characters);
  const summary = teamSummary(team);

  return new Response(JSON.stringify({
    documentId: doc.id,
    characters: characters.length,
    teamMembers: team.teamMembers.length,
    crossPerspectiveRules: team.crossPerspectiveRules.length,
    summary,
    team,
  }), { status: 200, headers: { "Content-Type": "application/json" } });
}

/** POST /api/forensic/audit — Execute audit on a single document with its review team */
export async function handleForensicAudit(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams,
): Promise<Response> {
  const auth = await authenticate(request, env);
  if (auth) return auth;

  const body = await parseJsonBody<{
    document: DocumentContent;
    priorDocuments?: DocumentContent[];
    customRules?: DetectionRule[];
  }>(request);

  if (!body?.document) {
    return new Response(JSON.stringify({
      error: "Required: document (DocumentContent). Optional: priorDocuments[], customRules[]",
    }), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  const doc = body.document;
  const priors = body.priorDocuments ?? [];
  const rules = [...DETECTION_RULES, ...(body.customRules ?? [])];

  // Step 1: Extract characters
  const rawChars = doc.persons.map(p => ({
    name: p.name,
    role: p.role,
    designation: p.designation,
    agency: p.agency,
    badgeOrId: p.badgeOrId,
    metadata: p.attributes,
  }));
  const characters = extractCharacters(rawChars);

  // Step 2: Assemble team
  const team = assembleTeam(doc.id, doc.documentType, characters);

  // Step 3: Execute audit
  const audit = executeAudit(team, doc, priors, rules);

  // Store result
  auditResults.set(audit.id, audit);

  const allFindings = [...audit.findings, ...audit.crossPerspectiveFindings];

  return new Response(JSON.stringify({
    auditId: audit.id,
    documentType: audit.documentType,
    teamMembers: audit.reviewTeam.teamMembers.length,
    totalFindings: allFindings.length,
    critical: allFindings.filter(f => f.severity === "CRITICAL").length,
    high: allFindings.filter(f => f.severity === "HIGH").length,
    medium: allFindings.filter(f => f.severity === "MODERATE").length,
    detectionRulesFired: audit.findings.filter(f => f.detectionRuleId).length,
    crossPerspectiveFindings: audit.crossPerspectiveFindings.length,
    timelineEntries: audit.characterTimeline.length,
    audit,
  }), { status: 200, headers: { "Content-Type": "application/json" } });
}

/** POST /api/forensic/pipeline — Run full forensic pipeline on a case */
export async function handleForensicPipeline(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams,
): Promise<Response> {
  const auth = await authenticate(request, env);
  if (auth) return auth;

  const body = await parseJsonBody<{
    caseName: string;
    documents: DocumentContent[];
    customRules?: DetectionRule[];
  }>(request);

  if (!body?.caseName || !body.documents?.length) {
    return new Response(JSON.stringify({
      error: "Required: caseName, documents[] (array of DocumentContent). Optional: customRules[]",
    }), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  const config: PipelineConfig = {
    caseName: body.caseName,
    folderPath: "",
    detectionRules: [...DETECTION_RULES, ...(body.customRules ?? [])],
    outputPath: "",
  };

  const result = runPipeline(config, body.documents);

  // Store result
  pipelineResults.set(result.id, result);

  return new Response(JSON.stringify({
    pipelineId: result.id,
    caseName: result.caseName,
    documentsProcessed: result.documentsProcessed,
    totalFindings: result.totalFindings,
    criticalFindings: result.criticalFindings,
    highFindings: result.highFindings,
    shadowIncidents: result.shadowIncidents,
    detectionRulesFired: result.detectionRulesFired,
    crossPerspectiveFindings: result.crossPerspectiveFindings,
    masterTimelineEntries: result.masterTimeline.length,
    christinaRegisterEntries: result.narrativeRegisters.christina.length,
    michaelRegisterEntries: result.narrativeRegisters.michael.length,
    result,
  }), { status: 200, headers: { "Content-Type": "application/json" } });
}

/** GET /api/forensic/pipeline/:id — Get stored pipeline result */
export async function handleForensicGetPipeline(
  _request: Request,
  _env: Env,
  _ctx: ExecutionContext,
  params: RouteParams,
): Promise<Response> {
  const id = params.id;
  const result = pipelineResults.get(id ?? "");
  if (!result) {
    return new Response(JSON.stringify({ error: "Pipeline result not found" }), {
      status: 404, headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify(result), {
    status: 200, headers: { "Content-Type": "application/json" },
  });
}

/** GET /api/forensic/pipeline/:id/report — Get pipeline report as markdown */
export async function handleForensicPipelineReport(
  _request: Request,
  _env: Env,
  _ctx: ExecutionContext,
  params: RouteParams,
): Promise<Response> {
  const id = params.id;
  const result = pipelineResults.get(id ?? "");
  if (!result) {
    return new Response(JSON.stringify({ error: "Pipeline result not found" }), {
      status: 404, headers: { "Content-Type": "application/json" },
    });
  }
  const report = renderPipelineReport(result);
  return new Response(report, {
    status: 200, headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}

/** GET /api/forensic/audit/:id — Get stored audit result */
export async function handleForensicGetAudit(
  _request: Request,
  _env: Env,
  _ctx: ExecutionContext,
  params: RouteParams,
): Promise<Response> {
  const id = params.id;
  const result = auditResults.get(id ?? "");
  if (!result) {
    return new Response(JSON.stringify({ error: "Audit result not found" }), {
      status: 404, headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify(result), {
    status: 200, headers: { "Content-Type": "application/json" },
  });
}

/** GET /api/forensic/audit/:id/report — Get audit report as markdown */
export async function handleForensicGetAuditReport(
  _request: Request,
  _env: Env,
  _ctx: ExecutionContext,
  params: RouteParams,
): Promise<Response> {
  const id = params.id;
  const result = auditResults.get(id ?? "");
  if (!result) {
    return new Response(JSON.stringify({ error: "Audit result not found" }), {
      status: 404, headers: { "Content-Type": "application/json" },
    });
  }
  const report = renderAuditReport(result);
  return new Response(report, {
    status: 200, headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}

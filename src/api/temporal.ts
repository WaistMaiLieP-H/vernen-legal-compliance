/**
 * Temporal Paradox Filter API — Layer 7a
 *
 * Public-facing endpoints for chronological integrity analysis.
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { rateLimit } from "./middleware/rate-limit.js";
import { parseJsonBody } from "../utils/helpers.js";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/** POST /api/verify/temporal — analyze a document set for temporal paradoxes */
export async function handleTemporalAnalyze(request: Request, env: Env): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;

  type Body = {
    documents: Array<{
      documentId: string;
      documentType: string;
      documentName?: string;
      claimedDate: string;
      dateContext: string;
      rawDateText?: string;
      attributes?: Record<string, string>;
    }>;
  };

  let body: Body;
  try {
    body = await parseJsonBody<Body>(request);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Invalid JSON" }, 400);
  }

  if (!body.documents || !Array.isArray(body.documents)) {
    return json({ error: "documents array required" }, 400);
  }

  const { TemporalParadoxFilter } = await import("../services/temporal-paradox-filter.js");
  const filter = new TemporalParadoxFilter(env);
  // Cast through unknown — caller validates the type strings
  const documents = body.documents as unknown as Parameters<typeof filter.analyze>[0];
  const report = await filter.analyze(documents);
  return json(report);
}

/** POST /api/verify/unconscionability — actuarial audit on financial terms */
export async function handleUnconscionabilityAudit(request: Request, env: Env): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;

  let body: unknown;
  try {
    body = await parseJsonBody(request);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Invalid JSON" }, 400);
  }

  if (!body || typeof body !== "object") {
    return json({ error: "financial terms object required" }, 400);
  }
  const t = body as Record<string, unknown>;
  const required: Array<[string, string]> = [
    ["documentId", "string"],
    ["documentType", "string"],
    ["principalAmount", "number"],
    ["paymentAmount", "number"],
    ["paymentFrequency", "string"],
    ["paymentCount", "number"],
  ];
  const missing: string[] = [];
  for (const [k, ty] of required) {
    if (t[k] === undefined || t[k] === null || typeof t[k] !== ty) missing.push(`${k} (${ty})`);
  }
  if (missing.length > 0) {
    return json({ error: "missing or invalid required fields", missing }, 400);
  }

  try {
    const { UnconscionabilityTrigger } = await import("../services/unconscionability-trigger.js");
    const trigger = new UnconscionabilityTrigger(env);
    const terms = body as Parameters<typeof trigger.audit>[0];
    const report = await trigger.audit(terms);
    return json(report);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "audit failed" }, 400);
  }
}

/** GET /api/verify/unconscionability/info — explain the unconscionability trigger */
export async function handleUnconscionabilityInfo(request: Request, env: Env): Promise<Response> {
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;
  return json({
    layer: "7d",
    name: "Unconscionability Trigger / Predatory Math Auditor",
    description: "Real-time actuarial audit of financial terms in contracts. Detects disguised security interests, usury violations, zero-equity forfeiture, and other UCC §1-203 / §2A-108 unconscionability triggers.",
    detection_categories: [
      "DISGUISED_SECURITY_INTEREST — UCC §1-203 buyout-below-FMV test",
      "PREDATORY_EFFECTIVE_APR — true cost vs stated rate",
      "ZERO_EQUITY_FORFEITURE — lease-to-purchase that converts to rent on default",
      "USURY_VIOLATION — effective rate exceeds state cap",
      "JURISDICTIONAL_OPPRESSION — distant forum selection clauses",
      "RISK_TRANSFER_TOTAL — lessee bears all operational risk while lessor retains equity",
      "REPOSSESSION_WITHOUT_PROCESS — self-help repossession waivers",
      "RESIDUAL_VALUE_GAP — buyout significantly below FMV",
      "MATH_NULL_OWNERSHIP — full price paid, zero equity gained",
    ],
    spec: "https://github.com/WaistMaiLieP-H/vernen-verification-log/blob/main/protocol/LAYER_7_STRUCTURAL_FORENSIC_ANALYSIS.md",
    state_usury_caps: "All 50 states + DC included",
    endpoints: [
      "POST /api/verify/unconscionability — audit financial terms",
      "GET /api/verify/unconscionability/info — this endpoint",
    ],
  });
}

/** POST /api/verify/document-to-layer7 — Unified document → 4-layer audit pipeline */
export async function handleDocumentToLayer7(request: Request, env: Env): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;

  let body: unknown;
  try {
    body = await parseJsonBody(request);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Invalid JSON" }, 400);
  }
  if (!body || typeof body !== "object") {
    return json({ error: "input object required" }, 400);
  }
  const input = body as { documentId?: string; rawText?: string; raw_text?: string; documentName?: string; jurisdiction?: string };
  const rawText = input.rawText ?? input.raw_text;
  const documentId = input.documentId ?? `doc_${Date.now().toString(36)}`;
  if (!rawText || typeof rawText !== "string") {
    return json({ error: "rawText (or raw_text) required" }, 400);
  }

  try {
    const { ForensicAuditPipeline } = await import("../services/forensic-audit-pipeline.js");
    const pipeline = new ForensicAuditPipeline(env);
    const report = await pipeline.run({
      documentId,
      documentName: input.documentName,
      rawText,
      jurisdiction: input.jurisdiction,
    });
    return json(report);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "pipeline failed" }, 500);
  }
}

/** GET /api/verify/document-to-layer7/info */
export async function handleDocumentToLayer7Info(request: Request, env: Env): Promise<Response> {
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;
  return json({
    name: "Document → Layer 7 Unified Pipeline",
    description: "Drop a raw document, get a complete Layer 7 structural forensic audit. Implements the 'document submission IS the instruction' principle: no manual pre-structuring required. Extracts dates, entities, and financial terms via deterministic regex, computes extraction-time structural findings, and dispatches to all four Layer 7 engines.",
    extraction_pipeline: [
      "Meta extraction — execution date, parties, entity formation dates, case citations, regulation citations, insurance certificate dates",
      "Entity extraction — block-style entities with names, addresses, registered agents, EINs, formation dates, roles",
      "Financial extraction — principal, payments, fees, APR, default rates, jurisdictions, clause flags",
      "Extraction-time findings — temporal paradoxes, shared addresses, formation clusters, accountability vacuums, control verbs, AB5 prongs, effective APR, confession of judgment, forum selection, choice of law evasion",
      "Engine dispatch — Layer 7a temporal, 7b liability, 7c reclassification, 7d unconscionability",
    ],
    response_shape: {
      generatedAt: "ISO timestamp",
      documentId: "string",
      extracted: "ExtractedDocumentMeta + ExtractedEntity[] + ExtractedFinancialTerms",
      extractionFindings: "ExtractionTimeFinding[] — flags computed directly from extraction",
      results: "{ temporal, liability, reclassification, unconscionability } — full engine reports",
      errors: "per-engine error map",
      summary: "engineVerdicts + totalFindings",
    },
    endpoints: [
      "POST /api/verify/document-to-layer7 — run unified pipeline",
      "GET /api/verify/document-to-layer7/info — this endpoint",
    ],
  });
}

/** POST /api/verify/liability-map — Layer 7b entity relational graph + accountability vacuum detection */
export async function handleLiabilityMapAnalyze(request: Request, env: Env): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;

  let body: unknown;
  try {
    body = await parseJsonBody(request);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Invalid JSON" }, 400);
  }

  if (!body || typeof body !== "object") {
    return json({ error: "liability map input object required" }, 400);
  }
  const input = body as { caseId?: string; entities?: unknown };
  if (!input.caseId || !Array.isArray(input.entities)) {
    return json({ error: "caseId and entities[] required" }, 400);
  }

  const { LiabilityMapping } = await import("../services/liability-mapping.js");
  const engine = new LiabilityMapping(env);
  const report = await engine.analyze(body as Parameters<typeof engine.analyze>[0]);
  return json(report);
}

/** GET /api/verify/liability-map/info — explain the liability mapping engine */
export async function handleLiabilityMapInfo(request: Request, env: Env): Promise<Response> {
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;
  return json({
    layer: "7b",
    name: "Circular Entity & Liability Mapping",
    description: "Builds a relational graph across entities in a document set and detects sock-puppet networks designed to frustrate accountability. Where Layer 6 asks 'do these entities exist?', Layer 7b asks 'do they exist as independent parties, or as a single accountability-evading structure?'",
    detection_categories: [
      "CIRCULAR_OWNERSHIP — A owns B owns C owns A patterns",
      "SYNTHETIC_DIVISION — 3+ nominally independent entities sharing 2+ attributes",
      "ACCOUNTABILITY_VACUUM — revenue/liability/equipment/insurance split across linked entities",
      "FORMATION_DATE_CLUSTERING — entities formed within the same week",
      "GEOGRAPHIC_CLUSTERING — entity addresses concentrated in narrow corridors",
      "SHARED_REGISTERED_AGENT_NETWORK — common point of service-of-process failure",
      "OFFICER_OVERLAP — shared officers across 'independent' entities",
      "ADDRESS_REUSE — shared physical addresses",
    ],
    attribute_kinds: [
      "ADDRESS", "PHONE", "EMAIL", "REGISTERED_AGENT",
      "OFFICER", "EIN_PREFIX", "DOMAIN", "FORMATION_WEEK",
    ],
    verdicts: [
      "INDEPENDENT_PARTIES",
      "RELATED_BUT_DISTINCT",
      "STRUCTURALLY_INTEGRATED",
      "SYNTHETIC_LIABILITY_NETWORK",
    ],
    spec: "https://github.com/WaistMaiLieP-H/vernen-verification-log/blob/main/protocol/LAYER_7_STRUCTURAL_FORENSIC_ANALYSIS.md",
    endpoints: [
      "POST /api/verify/liability-map — analyze a case's entity set",
      "GET /api/verify/liability-map/info — this endpoint",
    ],
  });
}

/** POST /api/verify/reclassification — Layer 7c control-verb scoring */
export async function handleReclassificationAnalyze(request: Request, env: Env): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;

  let body: unknown;
  try {
    body = await parseJsonBody(request);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Invalid JSON" }, 400);
  }

  if (!body || typeof body !== "object") {
    return json({ error: "reclassification input object required" }, 400);
  }
  const input = body as { documentId?: string; contractText?: string };
  if (!input.documentId || !input.contractText) {
    return json({ error: "documentId and contractText required" }, 400);
  }

  const { ReclassificationEngine } = await import("../services/reclassification-engine.js");
  const engine = new ReclassificationEngine(env);
  const report = await engine.analyze(body as Parameters<typeof engine.analyze>[0]);
  return json(report);
}

/** GET /api/verify/reclassification/info — explain the reclassification engine */
export async function handleReclassificationInfo(request: Request, env: Env): Promise<Response> {
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;
  return json({
    layer: "7c",
    name: "De Facto Reclassification Engine",
    description: "Detects disguised employment masquerading as independent contractor. Scores control verbs across 7 control categories and runs them against AB5 ABC, IRS 20-factor, and DOL economic reality tests. Outputs a control matrix, jurisdictional verdict, and statutory damages estimate.",
    control_categories: [
      "WORK_ASSIGNMENT — who decides what to do",
      "TIME_CONTROL — when to work",
      "LOCATION_CONTROL — where to work",
      "EQUIPMENT_CONTROL — what tools/equipment to use",
      "METHOD_CONTROL — how to do the work",
      "EXCLUSIVITY — who else may be served",
      "DISCIPLINARY — consequences for deviation",
    ],
    jurisdictional_tests: [
      "AB5_ABC — Cal. Lab. Code §2775 (Dynamex)",
      "IRS_20 — Rev. Rul. 87-41 / Form SS-8",
      "DOL_ECONOMIC_REALITY — 29 C.F.R. §795.105 (2024)",
    ],
    verdicts: [
      "CONTRACTOR_STANDS",
      "BORDERLINE",
      "PRESUMED_EMPLOYEE",
      "DE_FACTO_EMPLOYEE_AS_MATTER_OF_LAW",
    ],
    spec: "https://github.com/WaistMaiLieP-H/vernen-verification-log/blob/main/protocol/LAYER_7_STRUCTURAL_FORENSIC_ANALYSIS.md",
    endpoints: [
      "POST /api/verify/reclassification — analyze a contract",
      "GET /api/verify/reclassification/info — this endpoint",
    ],
  });
}

/** GET /api/verify/temporal/info — explain the temporal paradox filter */
export async function handleTemporalInfo(request: Request, env: Env): Promise<Response> {
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;
  return json({
    layer: "7a",
    name: "Temporal Paradox Filter",
    description: "Detects effects that predate causes across document sets. The structural signature of fabricated or retroactively-constructed documents.",
    detection_categories: [
      {
        type: "DIRECT_PARADOX",
        example: "A settlement statement dated November 2024 against a lease signed December 2025 — the operational data predates the governing contract by 13 months.",
      },
      {
        type: "STATUTORY_PARADOX",
        example: "A DOT employment contract signed before the required pre-employment drug test.",
      },
      {
        type: "AUTHORITY_PARADOX",
        example: "An LLC signing a lease before the LLC was formed.",
      },
      {
        type: "INSURANCE_PARADOX",
        example: "An insurance claim for a loss that occurred before coverage was bound.",
      },
      {
        type: "CALENDAR_PARADOX",
        example: "A document dated February 30 — a date that does not exist on any calendar.",
      },
      {
        type: "DAY_OF_WEEK_PARADOX",
        example: "A document claiming to be signed on Monday, March 15, 2024 — but March 15, 2024 was a Friday.",
      },
    ],
    spec: "https://github.com/WaistMaiLieP-H/vernen-verification-log/blob/main/protocol/LAYER_7_STRUCTURAL_FORENSIC_ANALYSIS.md",
    causal_rules_count: 17,
    endpoints: [
      "POST /api/verify/temporal — analyze a document set",
      "GET /api/verify/temporal/info — this endpoint",
    ],
  });
}

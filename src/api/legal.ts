// VERNEN™ Legal Intelligence API
// Ported from MCP Intelligence Platform (IP Manifest Filed February 2, 2026)
// All Rights Reserved
//
// Routes:
//   GET  /api/legal/authority/:practiceArea  — statutory authority compilation (public)
//   POST /api/legal/deadlines                — CCP deadline calculator (auth required)
//   GET  /api/legal/rules/:county            — local court rules (public)
//   POST /api/legal/motion                   — motion template generator (auth required)
//   POST /api/legal/conflicts                — conflict check (auth required)
//   GET  /api/legal/practice-areas           — list practice areas (public)
//   GET  /api/legal/jurisdictions            — list jurisdictions (public)

import type { Env } from "../index.js";
import { LegalIntelligenceService } from "../services/legal-intelligence.js";
import type {
  DeadlineRequest,
  MotionRequest,
  ConflictRequest,
} from "../services/legal-intelligence-types.js";
import { authenticate } from "./middleware/auth.js";

type RouteParams = Record<string, string>;

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// ── GET /api/legal/practice-areas ────────────────────────────

export async function handleLegalPracticeAreas(
  _request: Request,
  _env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams,
): Promise<Response> {
  const areas = LegalIntelligenceService.getPracticeAreas();
  return jsonResponse({
    citizen: "VERNEN Legal Intelligence",
    endpoint: "practice-areas",
    total: areas.length,
    practiceAreas: areas,
  });
}

// ── GET /api/legal/jurisdictions ─────────────────────────────

export async function handleLegalJurisdictions(
  _request: Request,
  _env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams,
): Promise<Response> {
  const jurisdictions = LegalIntelligenceService.getJurisdictions();
  return jsonResponse({
    citizen: "VERNEN Legal Intelligence",
    endpoint: "jurisdictions",
    total: jurisdictions.length,
    jurisdictions,
  });
}

// ── GET /api/legal/authority/:practiceArea ────────────────────

export async function handleLegalAuthority(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams,
): Promise<Response> {
  const practiceArea = params["practiceArea"];
  if (!practiceArea) {
    return jsonResponse({ error: "Practice area is required" }, 400);
  }

  // Optional jurisdiction filter from query string
  const url = new URL(request.url);
  const jurisdiction = url.searchParams.get("jurisdiction") || "all";

  try {
    const result = LegalIntelligenceService.compileAuthority(practiceArea, jurisdiction, env);

    if (result.totalAuthorities === 0) {
      return jsonResponse({
        citizen: "VERNEN Legal Intelligence",
        endpoint: "authority",
        warning: `No authorities found for practice area '${practiceArea}'. Use GET /api/legal/practice-areas for valid options.`,
        result,
      });
    }

    return jsonResponse({
      citizen: "VERNEN Legal Intelligence",
      endpoint: "authority",
      result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Authority compilation failed";
    return jsonResponse({ error: message }, 500);
  }
}

// ── POST /api/legal/deadlines ────────────────────────────────

export async function handleLegalDeadlines(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams,
): Promise<Response> {
  const authError = authenticate(request, env);
  if (authError) return authError;

  let body: DeadlineRequest;
  try {
    body = await request.json() as DeadlineRequest;
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  if (!body.motionType) {
    return jsonResponse({ error: "motionType is required" }, 400);
  }
  if (!body.filingDate) {
    return jsonResponse({ error: "filingDate is required (YYYY-MM-DD)" }, 400);
  }

  // Validate date format
  const dateCheck = new Date(body.filingDate);
  if (isNaN(dateCheck.getTime())) {
    return jsonResponse({ error: "filingDate must be a valid date (YYYY-MM-DD)" }, 400);
  }

  const serviceMethod = body.serviceMethod || "personal";

  try {
    const result = LegalIntelligenceService.calculateDeadlines(
      body.motionType,
      body.filingDate,
      serviceMethod,
      env,
    );

    return jsonResponse({
      citizen: "VERNEN Legal Intelligence",
      endpoint: "deadlines",
      result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Deadline calculation failed";
    return jsonResponse({ error: message }, 500);
  }
}

// ── GET /api/legal/rules/:county ─────────────────────────────

export async function handleLegalRules(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams,
): Promise<Response> {
  const county = params["county"];
  if (!county) {
    return jsonResponse({ error: "County is required" }, 400);
  }

  // Decode URI component for multi-word counties like "san francisco" or "contra costa"
  const decodedCounty = decodeURIComponent(county).replace(/-/g, " ");

  try {
    const result = LegalIntelligenceService.getLocalRules(decodedCounty, env);

    return jsonResponse({
      citizen: "VERNEN Legal Intelligence",
      endpoint: "rules",
      county: decodedCounty,
      result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Local rules lookup failed";
    return jsonResponse({ error: message }, 500);
  }
}

// ── POST /api/legal/motion ───────────────────────────────────

export async function handleLegalMotion(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams,
): Promise<Response> {
  const authError = authenticate(request, env);
  if (authError) return authError;

  let body: MotionRequest;
  try {
    body = await request.json() as MotionRequest;
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  if (!body.motionType) {
    return jsonResponse({ error: "motionType is required" }, 400);
  }

  try {
    const result = LegalIntelligenceService.generateMotionTemplate(
      body.motionType,
      {
        caseNumber: body.caseNumber,
        caseTitle: body.caseTitle,
        filingParty: body.filingParty,
        county: body.county,
        hearingDate: body.hearingDate,
        department: body.department,
        practiceAreas: body.practiceAreas,
        auditFindings: body.auditFindings,
        incorporateFindings: body.incorporateFindings,
      },
      env,
    );

    return jsonResponse({
      citizen: "VERNEN Legal Intelligence",
      endpoint: "motion",
      result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Motion template generation failed";
    return jsonResponse({ error: message }, 500);
  }
}

// ── POST /api/legal/conflicts ────────────────────────────────

export async function handleLegalConflicts(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams,
): Promise<Response> {
  const authError = authenticate(request, env);
  if (authError) return authError;

  let body: ConflictRequest;
  try {
    body = await request.json() as ConflictRequest;
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  if (!body.partyName) {
    return jsonResponse({ error: "partyName is required" }, 400);
  }
  if (!body.existingParties || !Array.isArray(body.existingParties)) {
    return jsonResponse({ error: "existingParties[] is required" }, 400);
  }

  try {
    const result = LegalIntelligenceService.checkConflicts(
      body.partyName,
      body.existingParties,
      env,
      {
        entityNames: body.entityNames,
        relatedPersons: body.relatedPersons,
        existingCases: body.existingCases,
      },
    );

    return jsonResponse({
      citizen: "VERNEN Legal Intelligence",
      endpoint: "conflicts",
      result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Conflict check failed";
    return jsonResponse({ error: message }, 500);
  }
}

// ── GET /api/legal/status ────────────────────────────────────

export async function handleLegalStatus(
  _request: Request,
  _env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams,
): Promise<Response> {
  return jsonResponse({
    citizen: "VERNEN Legal Intelligence",
    status: "operational",
    version: "1.0.0",
    source: "Ported from MCP Intelligence Platform (IP Manifest Filed February 2, 2026)",
    tools: {
      authorityCompiler: "Statutory citations across 18 practice areas and 12 authority mappings",
      deadlineCalculator: "CCP deadline engine with 8 motion types, court holiday awareness, service method extensions",
      localRulesEngine: "County-specific court rules for Alameda, Solano, Marin, San Francisco, Contra Costa + generic CRC fallback",
      motionTemplateGenerator: "8 motion types: ex_parte, demurrer, motion_to_compel, motion_to_strike, motion_for_sanctions, motion_for_reconsideration, motion_to_quash, OSC",
      conflictCheck: "Multi-algorithm matching: exact, phonetic (Soundex), alias, fuzzy (Levenshtein), entity, cross-case",
    },
    endpoints: {
      public: [
        "GET /api/legal/status",
        "GET /api/legal/practice-areas",
        "GET /api/legal/jurisdictions",
        "GET /api/legal/authority/:practiceArea",
        "GET /api/legal/rules/:county",
      ],
      authenticated: [
        "POST /api/legal/deadlines",
        "POST /api/legal/motion",
        "POST /api/legal/conflicts",
      ],
    },
    timestamp: new Date().toISOString(),
  });
}

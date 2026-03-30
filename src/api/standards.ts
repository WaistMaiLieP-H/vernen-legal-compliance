import { StandardsLibrary } from "../services/standards-library.js";
import { CITIZEN_STANDARDS_SEED } from "../data/citizen-standards-seed.js";
import { authenticate } from "./middleware/auth.js";
import type { Env } from "../index.js";

type RouteParams = Record<string, string>;

const library = new StandardsLibrary();

/**
 * GET /api/standards/:citizenName — All standards in a Citizen's library
 */
export async function handleGetCitizenStandards(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const authResult = await authenticate(request, env);
  if (authResult) return authResult;

  const citizenName = (params["citizenName"] ?? "").toUpperCase();
  const standards = await library.getCitizenStandards(citizenName, env);

  return Response.json({
    citizen: citizenName,
    count: standards.length,
    standards: standards.map((s) => ({
      id: s.id,
      type: s.standardType,
      jurisdiction: s.jurisdiction,
      citation: s.citation,
      shortCite: s.shortCite,
      title: s.title,
      description: s.description,
      enforcementBody: s.enforcementBody,
      privateRightOfAction: s.privateRightOfAction,
      skillSlugs: s.skillSlugs,
    })),
  });
}

/**
 * GET /api/standards/:citizenName/summary — Library summary stats
 */
export async function handleGetLibrarySummary(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const authResult = await authenticate(request, env);
  if (authResult) return authResult;

  const citizenName = (params["citizenName"] ?? "").toUpperCase();
  const summary = await library.getLibrarySummary(citizenName, env);

  return Response.json(summary);
}

/**
 * GET /api/standards/:citizenName/lookup?citation=... — Look up a standard by citation
 */
export async function handleLookupStandard(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const authResult = await authenticate(request, env);
  if (authResult) return authResult;

  const citizenName = (params["citizenName"] ?? "").toUpperCase();
  const url = new URL(request.url);
  const citation = url.searchParams.get("citation") ?? "";

  if (!citation) {
    return Response.json({ error: "'citation' query parameter required" }, { status: 400 });
  }

  const standard = await library.lookupByCitation(citizenName, citation, env);
  if (!standard) {
    return Response.json({ error: `No standard matching '${citation}' in ${citizenName}'s library` }, { status: 404 });
  }

  return Response.json({ standard });
}

/**
 * GET /api/standards/:citizenName/for-document?type=... — Standards for a document type
 */
export async function handleStandardsForDocument(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const authResult = await authenticate(request, env);
  if (authResult) return authResult;

  const citizenName = (params["citizenName"] ?? "").toUpperCase();
  const url = new URL(request.url);
  const docType = url.searchParams.get("type") ?? "";

  if (!docType) {
    return Response.json({ error: "'type' query parameter required" }, { status: 400 });
  }

  const standards = await library.findByDocumentType(citizenName, docType, env);

  return Response.json({
    citizen: citizenName,
    documentType: docType,
    count: standards.length,
    standards: standards.map((s) => ({
      citation: s.citation,
      shortCite: s.shortCite,
      title: s.title,
      type: s.standardType,
      requirements: s.requirements,
      enforcementBody: s.enforcementBody,
      privateRightOfAction: s.privateRightOfAction,
      damagesAvailable: s.damagesAvailable,
    })),
  });
}

/**
 * GET /api/standards/:citizenName/for-skill/:skillSlug — Standards for a specific skill
 */
export async function handleStandardsForSkill(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const authResult = await authenticate(request, env);
  if (authResult) return authResult;

  const citizenName = (params["citizenName"] ?? "").toUpperCase();
  const skillSlug = params["skillSlug"] ?? "";

  const standards = await library.findBySkill(citizenName, skillSlug, env);

  return Response.json({
    citizen: citizenName,
    skill: skillSlug,
    count: standards.length,
    standards,
  });
}

/**
 * POST /api/standards/:citizenName/search — Full-text search
 * Body: { query: string }
 */
export async function handleSearchStandards(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const authResult = await authenticate(request, env);
  if (authResult) return authResult;

  const citizenName = (params["citizenName"] ?? "").toUpperCase();
  let body: { query?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.query) {
    return Response.json({ error: "'query' is required" }, { status: 400 });
  }

  const results = await library.search(citizenName, body.query, env);

  return Response.json({
    citizen: citizenName,
    query: body.query,
    count: results.length,
    results: results.map((s) => ({
      citation: s.citation,
      shortCite: s.shortCite,
      title: s.title,
      type: s.standardType,
      description: s.description,
    })),
  });
}

/**
 * POST /api/standards/seed — Seed all Citizens' standards libraries from built-in data
 */
export async function handleSeedStandards(
  request: Request,
  env: Env
): Promise<Response> {
  const authResult = await authenticate(request, env);
  if (authResult) return authResult;

  const results: Record<string, { seeded: number; errors: number }> = {};

  for (const [citizenName, standards] of Object.entries(CITIZEN_STANDARDS_SEED)) {
    const result = await library.seedCitizenLibrary(citizenName, standards, env);
    results[citizenName] = result;
  }

  const totalSeeded = Object.values(results).reduce((sum, r) => sum + r.seeded, 0);
  const totalErrors = Object.values(results).reduce((sum, r) => sum + r.errors, 0);

  return Response.json({
    seeded: totalSeeded,
    errors: totalErrors,
    byCitizen: results,
  }, { status: 201 });
}

/**
 * GET /api/standards — All standards across all Citizens (inventory view)
 */
export async function handleGetAllStandards(
  request: Request,
  env: Env
): Promise<Response> {
  const authResult = await authenticate(request, env);
  if (authResult) return authResult;

  const citizenNames = ["REGULIS", "ADVOCIS", "ETHICARA", "FISCARA", "INTEGRA", "LEXARC", "SYNTARA", "PRIVAXIS", "VIGILUS", "VESTARA", "METRIQA", "CLARIDEX", "NEXARIS", "FACIALEX", "FORGE-0", "SENTINEL-0"];
  const inventory: Record<string, { count: number; types: string[] }> = {};
  let total = 0;

  for (const name of citizenNames) {
    const summary = await library.getLibrarySummary(name, env);
    if (summary.totalStandards > 0) {
      inventory[name] = {
        count: summary.totalStandards,
        types: Object.keys(summary.byType),
      };
      total += summary.totalStandards;
    }
  }

  return Response.json({ totalStandards: total, byCitizen: inventory });
}

/**
 * GET /api/standards/types — All standards grouped by type across all Citizens
 */
export async function handleGetStandardsByType(
  request: Request,
  env: Env
): Promise<Response> {
  const authResult = await authenticate(request, env);
  if (authResult) return authResult;

  const result = await env.DB.prepare(
    `SELECT standard_type, COUNT(*) as count, GROUP_CONCAT(DISTINCT citizen_name) as citizens
     FROM governing_standards WHERE is_active = 1
     GROUP BY standard_type ORDER BY count DESC`
  ).all();

  if (!result.success) {
    return Response.json({ error: "Query failed" }, { status: 500 });
  }

  return Response.json({
    types: result.results.map((r: Record<string, unknown>) => ({
      type: r.standard_type,
      count: r.count,
      citizens: (r.citizens as string).split(","),
    })),
  });
}

/**
 * GET /api/standards/jurisdiction/:jurisdiction — Standards by jurisdiction
 */
export async function handleGetStandardsByJurisdiction(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const authResult = await authenticate(request, env);
  if (authResult) return authResult;

  const jurisdiction = (params["jurisdiction"] ?? "").toUpperCase();

  const result = await env.DB.prepare(
    `SELECT * FROM governing_standards WHERE jurisdiction = ?1 AND is_active = 1 ORDER BY citizen_name, citation`
  ).bind(jurisdiction).all();

  if (!result.success) {
    return Response.json({ error: "Query failed" }, { status: 500 });
  }

  return Response.json({
    jurisdiction,
    count: result.results.length,
    standards: result.results.map((r: Record<string, unknown>) => ({
      id: r.id,
      citizenName: r.citizen_name,
      type: r.standard_type,
      citation: r.citation,
      shortCite: r.short_cite,
      title: r.title,
      privateRightOfAction: r.private_right_of_action === 1,
    })),
  });
}

/**
 * GET /api/standards/actionable — All standards with private right of action
 */
export async function handleGetActionableStandards(
  request: Request,
  env: Env
): Promise<Response> {
  const authResult = await authenticate(request, env);
  if (authResult) return authResult;

  const result = await env.DB.prepare(
    `SELECT * FROM governing_standards WHERE private_right_of_action = 1 AND is_active = 1 ORDER BY citizen_name, citation`
  ).all();

  if (!result.success) {
    return Response.json({ error: "Query failed" }, { status: 500 });
  }

  return Response.json({
    count: result.results.length,
    standards: result.results.map((r: Record<string, unknown>) => ({
      id: r.id,
      citizenName: r.citizen_name,
      type: r.standard_type,
      citation: r.citation,
      shortCite: r.short_cite,
      title: r.title,
      enforcementBody: r.enforcement_body,
      statuteOfLimitations: r.statute_of_limitations,
      damagesAvailable: r.damages_available ? JSON.parse(r.damages_available as string) : null,
    })),
  });
}

/**
 * GET /api/standards/:citizenName/cross-references/:standardId — Cross-references for a standard
 */
export async function handleGetCrossReferences(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const authResult = await authenticate(request, env);
  if (authResult) return authResult;

  const standardId = params["standardId"] ?? "";
  const refs = await library.getCrossReferences(standardId, env);

  return Response.json({
    standardId,
    count: refs.length,
    crossReferences: refs,
  });
}

/**
 * POST /api/standards/cross-reference — Add a cross-reference between standards
 * Body: { standardId, relatedStandardId, relationshipType, notes? }
 */
export async function handleAddCrossReference(
  request: Request,
  env: Env
): Promise<Response> {
  const authResult = await authenticate(request, env);
  if (authResult) return authResult;

  let body: { standardId?: string; relatedStandardId?: string; relationshipType?: string; notes?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.standardId || !body.relatedStandardId || !body.relationshipType) {
    return Response.json({ error: "standardId, relatedStandardId, and relationshipType are required" }, { status: 400 });
  }

  const validTypes = ["IMPLEMENTS", "SUPERSEDES", "SUPPLEMENTS", "CONFLICTS", "INTERPRETS", "REQUIRES", "REFERENCES"] as const;
  if (!validTypes.includes(body.relationshipType as typeof validTypes[number])) {
    return Response.json({ error: `relationshipType must be one of: ${validTypes.join(", ")}` }, { status: 400 });
  }

  const ref = await library.addCrossReference(
    body.standardId,
    body.relatedStandardId,
    body.relationshipType as typeof validTypes[number],
    env,
    body.notes
  );

  return Response.json({ crossReference: ref }, { status: 201 });
}

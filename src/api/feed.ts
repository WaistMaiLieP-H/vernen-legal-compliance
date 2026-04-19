/**
 * Document Feed API Routes
 *
 * Endpoints for ingesting real-world documents from PACER, Caselaw Access
 * Project, Federal Register, California courts, and manual submission.
 * Documents are classified, routed to owning Citizens, and skill executions
 * are logged automatically.
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { rateLimit } from "./middleware/rate-limit.js";
import { DocumentFeedEngine } from "../services/document-feed.js";
import type { FeedDocumentInput, FeedSource } from "../services/document-feed.js";
import { PipelineManifest } from "../services/pipeline-manifest.js";

type RouteParams = Record<string, string>;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function getEngine(env: Env): DocumentFeedEngine {
  return new DocumentFeedEngine(env);
}

// ═══════════════════════════════════════════════════════════════════════════
// POST /api/feed/document — Submit a single document
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Body: {
 *   source: "caselaw" | "pacer" | "fedreg" | "california" | "muckrock" | "manual",
 *   sourceUrl?: string,
 *   sourceId?: string,
 *   title: string,
 *   text?: string,
 *   metadata?: object,
 *   documentType?: string,  // skip classification
 *   jurisdiction?: string,
 *   category?: string,
 * }
 */
export async function handleFeedDocument(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  let body: FeedDocumentInput;
  try {
    body = await request.json() as FeedDocumentInput;
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  if (!body.title) {
    return json({ error: "title is required" }, 400);
  }
  if (!body.source) {
    body.source = "manual";
  }

  const engine = getEngine(env);
  await engine.ensureTables();

  try {
    const result = await engine.processDocument(body, env);
    return json(result, 201);
  } catch (e: unknown) {
    return json({
      error: "Document processing failed",
      detail: e instanceof Error ? e.message : String(e),
    }, 500);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// POST /api/feed/batch — Submit multiple documents
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Body: { documents: FeedDocumentInput[] }
 */
export async function handleFeedBatch(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  let body: { documents: FeedDocumentInput[] };
  try {
    body = await request.json() as { documents: FeedDocumentInput[] };
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  if (!Array.isArray(body.documents) || body.documents.length === 0) {
    return json({ error: "documents array is required and must not be empty" }, 400);
  }

  if (body.documents.length > 50) {
    return json({ error: "Maximum 50 documents per batch" }, 400);
  }

  const engine = getEngine(env);
  await engine.ensureTables();

  const { results, errors } = await engine.processBatch(body.documents, env);

  return json({
    processed: results.length,
    failed: errors.length,
    results,
    errors,
  }, 201);
}

// ═══════════════════════════════════════════════════════════════════════════
// GET /api/feed/history — Execution log
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Query params: source, status, citizen, limit, offset
 */
export async function handleFeedHistory(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const url = new URL(request.url);
  const engine = getEngine(env);
  await engine.ensureTables();

  const documents = await engine.getHistory({
    source: url.searchParams.get("source") ?? undefined,
    status: url.searchParams.get("status") ?? undefined,
    citizen: url.searchParams.get("citizen") ?? undefined,
    limit: url.searchParams.has("limit")
      ? parseInt(url.searchParams.get("limit")!, 10) : 50,
    offset: url.searchParams.has("offset")
      ? parseInt(url.searchParams.get("offset")!, 10) : 0,
  });

  return json({ documents, count: documents.length });
}

// ═══════════════════════════════════════════════════════════════════════════
// GET /api/feed/stats — Documents processed, skills exercised, by Citizen
// ═══════════════════════════════════════════════════════════════════════════

export async function handleFeedStats(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const engine = getEngine(env);
  await engine.ensureTables();

  const stats = await engine.getStats();

  return json(stats);
}

// ═══════════════════════════════════════════════════════════════════════════
// GET /api/feed/pull/caselaw — Pull from case.law API
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Query params: search, jurisdiction, decision_date_min, limit
 */
export async function handleFeedPullCaselaw(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const url = new URL(request.url);
  const engine = getEngine(env);
  await engine.ensureTables();

  try {
    const results = await engine.pullCaselaw(env, {
      search: url.searchParams.get("search") ?? undefined,
      jurisdiction: url.searchParams.get("jurisdiction") ?? undefined,
      decisionDateMin: url.searchParams.get("decision_date_min") ?? undefined,
      limit: url.searchParams.has("limit")
        ? parseInt(url.searchParams.get("limit")!, 10) : 10,
    });

    return json({
      source: "caselaw",
      pulled: results.length,
      results,
    });
  } catch (e: unknown) {
    return json({
      error: "Failed to pull from case.law",
      detail: e instanceof Error ? e.message : String(e),
    }, 502);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// GET /api/feed/pull/pacer — Pull from PACER RSS feeds (free)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Query params: court (default "cand" for N.D. Cal.), limit
 */
export async function handleFeedPullPacer(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const url = new URL(request.url);
  const engine = getEngine(env);
  await engine.ensureTables();

  try {
    const results = await engine.pullPacer(env, {
      court: url.searchParams.get("court") ?? "cand",
      limit: url.searchParams.has("limit")
        ? parseInt(url.searchParams.get("limit")!, 10) : 10,
    });

    return json({
      source: "pacer",
      court: url.searchParams.get("court") ?? "cand",
      pulled: results.length,
      results,
    });
  } catch (e: unknown) {
    return json({
      error: "Failed to pull from PACER RSS",
      detail: e instanceof Error ? e.message : String(e),
    }, 502);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// GET /api/feed/pull/fedreg — Pull recent Federal Register documents
// ═══════════════════════════════════════════════════════════════════════════

export async function handleFeedPullFedReg(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const url = new URL(request.url);
  const engine = getEngine(env);
  await engine.ensureTables();

  try {
    const results = await engine.pullFedReg(env, {
      type: url.searchParams.get("type") ?? undefined,
      agency: url.searchParams.get("agency") ?? undefined,
      limit: url.searchParams.has("limit")
        ? parseInt(url.searchParams.get("limit")!, 10) : 10,
    });
    return json({ source: "fedreg", pulled: results.length, results });
  } catch (e: unknown) {
    return json({ error: "Failed to pull from Federal Register", detail: e instanceof Error ? e.message : String(e) }, 502);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// GET /api/feed/pull/fda — Pull FDA enforcement actions & recalls
// ═══════════════════════════════════════════════════════════════════════════

export async function handleFeedPullFda(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const url = new URL(request.url);
  const engine = getEngine(env);
  await engine.ensureTables();

  try {
    const results = await engine.pullFda(env, {
      search: url.searchParams.get("search") ?? undefined,
      type: (url.searchParams.get("type") ?? "drug") as "drug" | "food" | "device",
      limit: url.searchParams.has("limit")
        ? parseInt(url.searchParams.get("limit")!, 10) : 10,
    });
    return json({ source: "fda", pulled: results.length, results });
  } catch (e: unknown) {
    return json({ error: "Failed to pull from FDA", detail: e instanceof Error ? e.message : String(e) }, 502);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// GET /api/feed/pull/edgar — Pull SEC EDGAR filings (full-text search)
// ═══════════════════════════════════════════════════════════════════════════

export async function handleFeedPullEdgar(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const url = new URL(request.url);
  const engine = getEngine(env);
  await engine.ensureTables();

  try {
    const results = await engine.pullEdgar(env, {
      search: url.searchParams.get("search") ?? undefined,
      forms: url.searchParams.get("forms") ?? undefined,
      dateFrom: url.searchParams.get("date_from") ?? undefined,
      limit: url.searchParams.has("limit")
        ? parseInt(url.searchParams.get("limit")!, 10) : 10,
    });
    return json({ source: "edgar", pulled: results.length, results });
  } catch (e: unknown) {
    return json({ error: "Failed to pull from EDGAR", detail: e instanceof Error ? e.message : String(e) }, 502);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// GET /api/feed/pull/gao — Pull GAO audit reports
// ═══════════════════════════════════════════════════════════════════════════

export async function handleFeedPullGao(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const url = new URL(request.url);
  const engine = getEngine(env);
  await engine.ensureTables();

  try {
    const results = await engine.pullGao(env, {
      search: url.searchParams.get("search") ?? undefined,
      topic: url.searchParams.get("topic") ?? undefined,
      limit: url.searchParams.has("limit")
        ? parseInt(url.searchParams.get("limit")!, 10) : 10,
    });
    return json({ source: "gao", pulled: results.length, results });
  } catch (e: unknown) {
    return json({ error: "Failed to pull from GAO", detail: e instanceof Error ? e.message : String(e) }, 502);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// GET /api/feed/pull/courtlistener — Pull court opinions from CourtListener
// ═══════════════════════════════════════════════════════════════════════════

export async function handleFeedPullCourtListener(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const url = new URL(request.url);
  const engine = getEngine(env);
  await engine.ensureTables();

  try {
    const results = await engine.pullCourtListener(env, {
      search: url.searchParams.get("search") ?? undefined,
      court: url.searchParams.get("court") ?? undefined,
      dateAfter: url.searchParams.get("date_after") ?? undefined,
      limit: url.searchParams.has("limit")
        ? parseInt(url.searchParams.get("limit")!, 10) : 10,
    });
    return json({ source: "courtlistener", pulled: results.length, results });
  } catch (e: unknown) {
    return json({ error: "Failed to pull from CourtListener", detail: e instanceof Error ? e.message : String(e) }, 502);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// GET /api/feed/pull/sam — Pull SAM.gov exclusion records
// ═══════════════════════════════════════════════════════════════════════════

export async function handleFeedPullSam(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const url = new URL(request.url);
  const engine = getEngine(env);
  await engine.ensureTables();

  try {
    const results = await engine.pullSam(env, {
      search: url.searchParams.get("search") ?? undefined,
      state: url.searchParams.get("state") ?? undefined,
      limit: url.searchParams.has("limit")
        ? parseInt(url.searchParams.get("limit")!, 10) : 10,
    });
    return json({ source: "sam", pulled: results.length, results });
  } catch (e: unknown) {
    return json({ error: "Failed to pull from SAM.gov", detail: e instanceof Error ? e.message : String(e) }, 502);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// GET /api/feed/pull/cfpb — Pull CFPB consumer complaint narratives
// ═══════════════════════════════════════════════════════════════════════════

export async function handleFeedPullCfpb(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const url = new URL(request.url);
  const engine = getEngine(env);
  await engine.ensureTables();

  try {
    const results = await engine.pullCfpb(env, {
      search: url.searchParams.get("search") ?? undefined,
      product: url.searchParams.get("product") ?? undefined,
      state: url.searchParams.get("state") ?? undefined,
      limit: url.searchParams.has("limit")
        ? parseInt(url.searchParams.get("limit")!, 10) : 10,
    });
    return json({ source: "cfpb", pulled: results.length, results });
  } catch (e: unknown) {
    return json({ error: "Failed to pull from CFPB", detail: e instanceof Error ? e.message : String(e) }, 502);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// GET /api/feed/pull/epa — Pull EPA enforcement actions
// ═══════════════════════════════════════════════════════════════════════════

export async function handleFeedPullEpa(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const url = new URL(request.url);
  const engine = getEngine(env);
  await engine.ensureTables();

  try {
    const results = await engine.pullEpa(env, {
      search: url.searchParams.get("search") ?? undefined,
      state: url.searchParams.get("state") ?? undefined,
      program: url.searchParams.get("program") ?? undefined,
      limit: url.searchParams.has("limit")
        ? parseInt(url.searchParams.get("limit")!, 10) : 10,
    });
    return json({ source: "epa", pulled: results.length, results });
  } catch (e: unknown) {
    return json({ error: "Failed to pull from EPA", detail: e instanceof Error ? e.message : String(e) }, 502);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// GET /api/feed/pull/osha — Pull OSHA inspection details
// ═══════════════════════════════════════════════════════════════════════════

export async function handleFeedPullOsha(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const url = new URL(request.url);
  const engine = getEngine(env);
  await engine.ensureTables();

  try {
    const results = await engine.pullOsha(env, {
      search: url.searchParams.get("search") ?? undefined,
      state: url.searchParams.get("state") ?? undefined,
      severity: url.searchParams.get("severity") ?? undefined,
      limit: url.searchParams.has("limit")
        ? parseInt(url.searchParams.get("limit")!, 10) : 10,
    });
    return json({ source: "osha", pulled: results.length, results });
  } catch (e: unknown) {
    return json({ error: "Failed to pull from OSHA", detail: e instanceof Error ? e.message : String(e) }, 502);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// GET /api/feed/pull/muckrock — Pull MuckRock FOIA documents
// ═══════════════════════════════════════════════════════════════════════════

export async function handleFeedPullMuckRock(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const url = new URL(request.url);
  const engine = getEngine(env);
  await engine.ensureTables();

  try {
    const results = await engine.pullMuckRock(env, {
      search: url.searchParams.get("search") ?? undefined,
      agency: url.searchParams.get("agency") ?? undefined,
      status: url.searchParams.get("status") ?? undefined,
      limit: url.searchParams.has("limit")
        ? parseInt(url.searchParams.get("limit")!, 10) : 10,
    });
    return json({ source: "muckrock", pulled: results.length, results });
  } catch (e: unknown) {
    return json({ error: "Failed to pull from MuckRock", detail: e instanceof Error ? e.message : String(e) }, 502);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// GET /api/feed/pull/california — Pull California court opinions
// ═══════════════════════════════════════════════════════════════════════════

export async function handleFeedPullCalifornia(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const url = new URL(request.url);
  const engine = getEngine(env);
  await engine.ensureTables();

  try {
    const results = await engine.pullCalifornia(env, {
      search: url.searchParams.get("search") ?? undefined,
      court: url.searchParams.get("court") ?? undefined,
      dateAfter: url.searchParams.get("date_after") ?? undefined,
      limit: url.searchParams.has("limit")
        ? parseInt(url.searchParams.get("limit")!, 10) : 10,
    });
    return json({ source: "california", pulled: results.length, results });
  } catch (e: unknown) {
    return json({ error: "Failed to pull from California courts", detail: e instanceof Error ? e.message : String(e) }, 502);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// GET /api/feed/pull/all — The Firehose: pull from all sources
// ═══════════════════════════════════════════════════════════════════════════

export async function handleFeedPullAll(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const url = new URL(request.url);
  const engine = getEngine(env);
  await engine.ensureTables();

  try {
    const perSourceLimit = url.searchParams.has("limit")
      ? parseInt(url.searchParams.get("limit")!, 10) : 5;

    const result = await engine.pullAll(env, { limit: perSourceLimit });

    return json({
      totalPulled: result.totalPulled,
      sources: Object.keys(result.bySource).length,
      bySource: result.bySource,
      results: result.results,
    });
  } catch (e: unknown) {
    return json({ error: "Firehose pull failed", detail: e instanceof Error ? e.message : String(e) }, 500);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// GET /api/feed/manifest — List all Citizens and their pipeline configs
// ═══════════════════════════════════════════════════════════════════════════

export async function handleFeedManifest(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const citizens = PipelineManifest.listCitizens();
  const totalPulls = citizens.reduce((sum, c) => sum + c.pullCount, 0);

  return json({
    citizens: citizens.length,
    totalPullConfigs: totalPulls,
    manifest: citizens,
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// GET /api/feed/fill/:citizen — Fill a specific Citizen with real documents
// ═══════════════════════════════════════════════════════════════════════════

export async function handleFeedFillCitizen(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const citizenName = params.citizen ?? "";
  if (!citizenName) {
    return json({ error: "citizen name is required" }, 400);
  }

  const url = new URL(request.url);
  const limit = url.searchParams.has("limit")
    ? parseInt(url.searchParams.get("limit")!, 10) : 5;

  const result = await PipelineManifest.fillCitizen(citizenName, env, limit);

  return json(result);
}

// ═══════════════════════════════════════════════════════════════════════════
// GET /api/feed/fill — Fill ALL Citizens with real documents
// ═══════════════════════════════════════════════════════════════════════════

export async function handleFeedFillAll(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const url = new URL(request.url);
  const limit = url.searchParams.has("limit")
    ? parseInt(url.searchParams.get("limit")!, 10) : 3;

  const result = await PipelineManifest.fillAll(env, limit);

  return json(result);
}

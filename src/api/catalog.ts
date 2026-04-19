/**
 * Citizen Catalog API Routes
 *
 * GET  /api/catalog           — Catalog overview stats
 * GET  /api/catalog/industry/:industry — Positions for one industry
 * GET  /api/catalog/position/:name     — Single position detail
 * POST /api/catalog/seed      — Seed all 2,880 positions into D1
 * POST /api/catalog/assemble  — Run full catalog assembly
 * GET  /api/catalog/stats     — Assembly coverage stats
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { rateLimit } from "./middleware/rate-limit.js";
import {
  getFullCatalog,
  getByIndustry,
  getPosition,
  getCatalogStats,
  seedCatalog,
} from "../services/citizen-catalog-2880.js";
import { CitizenAssemblyEngine } from "../services/citizen-assembly.js";

type RouteParams = Record<string, string>;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// GET /api/catalog — Overview stats (not the full 2,880 inline)
// ═══════════════════════════════════════════════════════════════════════════

export async function handleCatalogOverview(
  _request: Request,
  _env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const stats = getCatalogStats();
  return json({
    success: true,
    catalog: {
      totalPositions: stats.totalPositions,
      industries: stats.industries,
      uniqueNaicsCodes: stats.uniqueNaicsCodes,
      byIndustry: stats.byIndustry,
    },
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// GET /api/catalog/industry/:industry
// ═══════════════════════════════════════════════════════════════════════════

export async function handleCatalogByIndustry(
  _request: Request,
  _env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const industry = params.industry?.toUpperCase();
  if (!industry) {
    return json({ error: "Missing industry parameter" }, 400);
  }

  const positions = getByIndustry(industry);
  if (positions.length === 0) {
    return json({ error: `No positions found for industry: ${industry}` }, 404);
  }

  return json({
    success: true,
    industry,
    count: positions.length,
    positions,
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// GET /api/catalog/position/:name
// ═══════════════════════════════════════════════════════════════════════════

export async function handleCatalogByPosition(
  _request: Request,
  _env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const name = params.name;
  if (!name) {
    return json({ error: "Missing position name" }, 400);
  }

  const position = getPosition(name);
  if (!position) {
    return json({ error: `Position not found: ${name}` }, 404);
  }

  return json({
    success: true,
    position,
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// POST /api/catalog/seed — Seed all 2,880 positions into D1
// ═══════════════════════════════════════════════════════════════════════════

export async function handleCatalogSeed(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const result = await seedCatalog(env.DB);

  return json({
    success: true,
    action: "seed",
    ...result,
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// POST /api/catalog/assemble — Run full catalog assembly
// ═══════════════════════════════════════════════════════════════════════════

export async function handleCatalogAssemble(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const engine = new CitizenAssemblyEngine(env);
  const result = await engine.assembleFullCatalog();

  return json({
    success: true,
    action: "assemble_full_catalog",
    ...result,
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// GET /api/catalog/stats — Assembly coverage stats
// ═══════════════════════════════════════════════════════════════════════════

export async function handleCatalogStats(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const catalogStats = getCatalogStats();

  // Check D1 for assembly coverage
  let withData = 0;
  let placeholder = 0;
  let vacant = 0;

  try {
    const row = await env.DB.prepare(`
      SELECT
        SUM(CASE WHEN assembly_status = 'SKILLS_ASSIGNED' OR assembly_status = 'DEPLOYED' OR assembly_status = 'ACTIVE' THEN 1 ELSE 0 END) as with_data,
        SUM(CASE WHEN assembly_status = 'DISCOVERED' THEN 1 ELSE 0 END) as placeholder,
        SUM(CASE WHEN assembly_status = 'VACANT' THEN 1 ELSE 0 END) as vacant
      FROM citizen_catalog_positions
    `).first<{ with_data: number; placeholder: number; vacant: number }>();

    if (row) {
      withData = row.with_data ?? 0;
      placeholder = row.placeholder ?? 0;
      vacant = row.vacant ?? 0;
    }
  } catch {
    // Table may not exist yet
  }

  return json({
    success: true,
    catalog: {
      totalPositions: catalogStats.totalPositions,
      industries: catalogStats.industries,
      uniqueNaicsCodes: catalogStats.uniqueNaicsCodes,
    },
    assembly: {
      withData,
      placeholder,
      vacant,
      total: withData + placeholder + vacant,
      coveragePercent: catalogStats.totalPositions > 0
        ? ((withData / catalogStats.totalPositions) * 100).toFixed(1)
        : "0.0",
    },
  });
}

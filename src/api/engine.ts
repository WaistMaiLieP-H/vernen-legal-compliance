import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { parseJsonBody, generateId } from "../utils/helpers.js";
import {
  loadCatalogFromDB,
  registerSpec,
  getSpec,
  searchCatalog,
  getCatalogStats,
  importBatchSpecs,
} from "../engine/catalog.js";
import {
  deployCitizen,
  undeployCitizen,
  getDeployedCitizens,
  getDeploymentStatus,
} from "../engine/deployer.js";
import { handleDynamicRoute } from "../engine/dynamic-router.js";
import type { CitizenSpec, CatalogEntry } from "../engine/types.js";

type RouteParams = Record<string, string>;

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// ---------------------------------------------------------------------------
// Catalog Endpoints
// ---------------------------------------------------------------------------

/**
 * GET /api/engine/catalog — full catalog with optional search
 * Query params: ?q=<search>&industry=<INDUSTRY>
 */
export async function handleEngineCatalog(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");
  const industry = url.searchParams.get("industry");

  let specs: CitizenSpec[];

  if (query) {
    specs = await searchCatalog(query, env);
  } else {
    specs = await loadCatalogFromDB(env);
  }

  // Filter by industry if provided
  if (industry) {
    specs = specs.filter(
      (s) => s.industry.toUpperCase() === industry.toUpperCase()
    );
  }

  return jsonResponse({
    catalog: specs,
    count: specs.length,
    filters: { query, industry },
  });
}

/**
 * GET /api/engine/catalog/stats — catalog statistics
 */
export async function handleEngineCatalogStats(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const stats = await getCatalogStats(env);
  return jsonResponse({ stats });
}

/**
 * GET /api/engine/catalog/:id — single spec lookup
 */
export async function handleEngineCatalogById(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const id = params["id"];
  if (!id) return jsonResponse({ error: "Spec ID is required" }, 400);

  const spec = await getSpec(id, env);
  if (!spec) return jsonResponse({ error: `Spec not found: ${id}` }, 404);

  return jsonResponse({ spec });
}

/**
 * POST /api/engine/catalog — register a new spec (founder-only)
 */
export async function handleEngineRegisterSpec(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = authenticate(request, env);
  if (authError) return authError;

  const body = await parseJsonBody<Partial<CitizenSpec>>(request);

  // Validate required fields
  if (!body.name || !body.domain || !body.industry) {
    return jsonResponse(
      { error: "Required fields: name, domain, industry" },
      400
    );
  }

  const spec: CitizenSpec = {
    id: body.id ?? generateId("citizen"),
    name: body.name.toUpperCase(),
    trademark: body.trademark ?? `${body.name.toUpperCase()}™`,
    domain: body.domain,
    industry: body.industry.toUpperCase(),
    category: body.category ?? "",
    description: body.description ?? "",
    derivation: body.derivation ?? "",
    workers: body.workers ?? [],
    governanceType: body.governanceType ?? "INDEPENDENT",
    capabilities: body.capabilities ?? [],
  };

  try {
    await registerSpec(spec, env);
    return jsonResponse({ success: true, spec }, 201);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Registration failed";
    return jsonResponse({ error: message }, 409);
  }
}

/**
 * POST /api/engine/catalog/import — bulk import specs from batch format (founder-only)
 */
export async function handleEngineImportSpecs(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = authenticate(request, env);
  if (authError) return authError;

  const body = await parseJsonBody<{
    entries: CatalogEntry[];
    industry: string;
    category: string;
  }>(request);

  if (!body.entries || !Array.isArray(body.entries) || body.entries.length === 0) {
    return jsonResponse({ error: "entries array is required and must not be empty" }, 400);
  }
  if (!body.industry) {
    return jsonResponse({ error: "industry is required" }, 400);
  }

  const imported = await importBatchSpecs(
    body.entries,
    body.industry.toUpperCase(),
    body.category ?? "",
    env
  );

  return jsonResponse({
    success: true,
    imported,
    total: body.entries.length,
    skipped: body.entries.length - imported,
    industry: body.industry.toUpperCase(),
    category: body.category ?? "",
  });
}

// ---------------------------------------------------------------------------
// Deployment Endpoints
// ---------------------------------------------------------------------------

/**
 * POST /api/engine/deploy — deploy a Citizen from catalog (founder-only)
 */
export async function handleEngineDeploy(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = authenticate(request, env);
  if (authError) return authError;

  const body = await parseJsonBody<{ specId?: string; spec?: Partial<CitizenSpec> }>(request);

  let spec: CitizenSpec | null = null;

  if (body.specId) {
    spec = await getSpec(body.specId, env);
    if (!spec) {
      return jsonResponse({ error: `Spec not found: ${body.specId}` }, 404);
    }
  } else if (body.spec && body.spec.name && body.spec.domain && body.spec.industry) {
    // Deploy from inline spec — register it first
    spec = {
      id: body.spec.id ?? generateId("citizen"),
      name: body.spec.name.toUpperCase(),
      trademark: body.spec.trademark ?? `${body.spec.name.toUpperCase()}™`,
      domain: body.spec.domain,
      industry: body.spec.industry.toUpperCase(),
      category: body.spec.category ?? "",
      description: body.spec.description ?? "",
      derivation: body.spec.derivation ?? "",
      workers: body.spec.workers ?? [],
      governanceType: body.spec.governanceType ?? "INDEPENDENT",
      capabilities: body.spec.capabilities ?? [],
    };
    try {
      await registerSpec(spec, env);
    } catch {
      // May already exist — try to look it up
      spec = await getSpec(spec.name, env);
      if (!spec) {
        return jsonResponse({ error: "Failed to register inline spec" }, 500);
      }
    }
  } else {
    return jsonResponse(
      { error: "Provide specId or a complete spec { name, domain, industry }" },
      400
    );
  }

  const result = await deployCitizen(spec, env);

  return jsonResponse(result, result.success ? 201 : 409);
}

/**
 * POST /api/engine/undeploy — deactivate a Citizen (founder-only)
 */
export async function handleEngineUndeploy(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = authenticate(request, env);
  if (authError) return authError;

  const body = await parseJsonBody<{ citizenId: string }>(request);
  if (!body.citizenId) {
    return jsonResponse({ error: "citizenId is required" }, 400);
  }

  try {
    await undeployCitizen(body.citizenId, env);
    return jsonResponse({ success: true, citizenId: body.citizenId, status: "DEACTIVATED" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Undeploy failed";
    return jsonResponse({ error: message }, 500);
  }
}

/**
 * GET /api/engine/deployed — list all deployed dynamic Citizens
 */
export async function handleEngineDeployed(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const citizens = await getDeployedCitizens(env);
  return jsonResponse({
    deployed: citizens,
    count: citizens.length,
  });
}

/**
 * GET /api/engine/deployed/:id — single deployed Citizen status
 */
export async function handleEngineDeployedById(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const id = params["id"];
  if (!id) return jsonResponse({ error: "Deployment ID is required" }, 400);

  const citizen = await getDeploymentStatus(id, env);
  if (!citizen) {
    return jsonResponse({ error: `No active deployment found: ${id}` }, 404);
  }

  return jsonResponse({ deployment: citizen });
}

// ---------------------------------------------------------------------------
// Dynamic Citizen Catch-All
// ---------------------------------------------------------------------------

/**
 * GET/POST /api/citizens/:name/:action — routes to the dynamic citizen router
 */
export async function handleDynamicCitizenRoute(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const name = params["name"];
  const action = params["action"];

  if (!name || !action) {
    return jsonResponse({ error: "Citizen name and action are required" }, 400);
  }

  return handleDynamicRoute(name, action, request, env);
}

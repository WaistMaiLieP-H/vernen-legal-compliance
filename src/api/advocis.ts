import type { Env } from "../index.js";
import { BusinessEntityType, USState } from "../types/client.js";
import { Advocis } from "../personas/advocis/index.js";
import { parseJsonBody, generateId } from "../utils/helpers.js";

type RouteParams = Record<string, string>;

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Normalize entity type input to match enum values.
 */
const ENTITY_TYPE_ALIASES: Record<string, BusinessEntityType> = {
  llc: BusinessEntityType.LLC,
  corporation: BusinessEntityType.CORPORATION,
  corp: BusinessEntityType.CORPORATION,
  s_corp: BusinessEntityType.S_CORP,
  "s corp": BusinessEntityType.S_CORP,
  scorp: BusinessEntityType.S_CORP,
  sole_proprietorship: BusinessEntityType.SOLE_PROPRIETORSHIP,
  "sole proprietorship": BusinessEntityType.SOLE_PROPRIETORSHIP,
  soleproprietorship: BusinessEntityType.SOLE_PROPRIETORSHIP,
  "sole proprietor": BusinessEntityType.SOLE_PROPRIETORSHIP,
  partnership: BusinessEntityType.PARTNERSHIP,
  nonprofit: BusinessEntityType.NONPROFIT,
  "non-profit": BusinessEntityType.NONPROFIT,
  "non profit": BusinessEntityType.NONPROFIT,
  cooperative: BusinessEntityType.COOPERATIVE,
  "co-op": BusinessEntityType.COOPERATIVE,
  coop: BusinessEntityType.COOPERATIVE,
  "co-operative": BusinessEntityType.COOPERATIVE,
};

function normalizeEntityType(value: string): BusinessEntityType | null {
  if (Object.values(BusinessEntityType).includes(value as BusinessEntityType)) {
    return value as BusinessEntityType;
  }
  const normalized = ENTITY_TYPE_ALIASES[value.toLowerCase().trim()];
  return normalized ?? null;
}

function isValidEntityType(value: string): value is BusinessEntityType {
  return normalizeEntityType(value) !== null;
}

// ---------------------------------------------------------------------------
// Singleton
// ---------------------------------------------------------------------------

let advocisInstance: Advocis | null = null;
let advocisInitialized = false;

async function getAdvocisInstance(env: Env): Promise<Advocis> {
  if (!advocisInstance) {
    advocisInstance = new Advocis();
  }
  if (!advocisInitialized) {
    await advocisInstance.initialize(env);
    advocisInitialized = true;
  }
  return advocisInstance;
}

// =============================================================================
// Route Handlers
// =============================================================================

/**
 * GET /api/advocis/status
 * Returns ADVOCIS Citizen status and operational info.
 */
export async function handleAdvocisStatus(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const advocis = await getAdvocisInstance(env);
  const stats = await advocis.getClientStats(env);

  return jsonResponse({
    citizen: "ADVOCIS",
    trademark: "ADVOCIS\u2122",
    domain: "Client Advocacy",
    status: advocis.status,
    description:
      "Client Advocacy Persona Citizen. Turns one-time buyers into subscribers and manages all client-facing interactions.",
    operational: {
      totalClients: stats.totalClients,
      activeClients: stats.activeClients,
      retentionRate: stats.retentionRate,
      avgReportsPerClient: stats.avgReportsPerClient,
      openInquiries: stats.openInquiries,
    },
    workers: ["SERVE-1", "BOARD-1"],
    ecosystem: "Vernen Legal Compliance\u2122",
  });
}

/**
 * POST /api/advocis/onboard
 * Start client onboarding.
 * Body: { businessName, email, entityType, states[] }
 */
export async function handleAdvocisOnboard(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  let raw: Record<string, unknown>;

  try {
    raw = await parseJsonBody<Record<string, unknown>>(request);
  } catch {
    return jsonResponse({ error: "Invalid JSON in request body" }, 400);
  }

  // Accept common field name aliases
  const body = {
    businessName: (raw.businessName ?? raw.business_name ?? raw.name ?? raw.companyName ?? raw.company_name ?? "") as string,
    email: (raw.email ?? raw.contactEmail ?? raw.contact_email ?? raw.emailAddress ?? raw.email_address ?? "") as string,
    entityType: (raw.entityType ?? raw.entity_type ?? raw.type ?? "") as string,
    states: ((): string[] => {
      const s = raw.states ?? raw.state;
      if (Array.isArray(s)) return s as string[];
      if (typeof s === "string") return [s];
      return [];
    })(),
  };

  // Validate required fields
  if (!body.businessName || !body.email || !body.entityType || !body.states?.length) {
    return jsonResponse(
      {
        error:
          "All fields required: businessName, email, entityType, states[]",
        hint: "Also accepts: name, business_name, entity_type, state (string or array)",
      },
      400
    );
  }

  // Validate and normalize entity type
  const entityType = normalizeEntityType(body.entityType);
  if (!entityType) {
    return jsonResponse(
      {
        error: `Invalid entityType: '${body.entityType}'.`,
        validTypes: Object.values(BusinessEntityType),
        hint: "Accepted formats: 'LLC', 'Corporation', 'S Corp', 'Sole Proprietorship', 'Partnership', 'Nonprofit'",
      },
      400
    );
  }

  // Validate and normalize states (accept lowercase)
  const validStates = Object.values(USState) as string[];
  const normalizedStates = body.states.map((s) => s.toUpperCase().trim());
  const invalidStates = normalizedStates.filter((s) => !validStates.includes(s));
  if (invalidStates.length > 0) {
    return jsonResponse(
      {
        error: `Invalid states: ${invalidStates.join(", ")}`,
        validStates,
      },
      400
    );
  }

  // Create client record in D1
  const clientId = generateId("cli");
  const now = new Date().toISOString();

  try {
    await env.DB.prepare(
      `INSERT INTO clients (id, name, email, entity_type, industry, created_at, updated_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`
    )
      .bind(clientId, body.businessName, body.email, entityType, "General", now, now)
      .run();

    // Insert client-state associations
    for (const state of normalizedStates) {
      await env.DB.prepare(
        `INSERT INTO client_states (client_id, state, is_formation_state)
         VALUES (?1, ?2, ?3)`
      )
        .bind(clientId, state, normalizedStates.indexOf(state) === 0 ? 1 : 0)
        .run();
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create client";
    if (message.includes("UNIQUE")) {
      return jsonResponse(
        { error: "A client with this email already exists" },
        409
      );
    }
    return jsonResponse({ error: message }, 500);
  }

  // Onboard via ADVOCIS
  const advocis = await getAdvocisInstance(env);
  const result = await advocis.onboardClient(
    {
      id: clientId,
      name: body.businessName,
      entityType,
      states: normalizedStates as USState[],
      industry: "General",
      createdAt: now,
    },
    env
  );

  // PROOF pass — verify onboarding output before release
  const responseBody: Record<string, unknown> = {
    success: true,
    clientId: result.clientId,
    onboardingId: result.onboardingId,
    welcome: result.welcomeSequence,
    onboardingSteps: result.steps,
    nextStep: "Complete your profile at /api/advocis/client/" + clientId + "/onboarding",
  };

  const advocisForProof = await getAdvocisInstance(env);
  advocisForProof.proof("onboarding", responseBody, {
    entityType: entityType,
    jurisdiction: normalizedStates[0],
  });

  return jsonResponse(responseBody, 201);
}

/**
 * GET /api/advocis/client/:id
 * Client profile and health score.
 */
export async function handleAdvocisGetClient(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const clientId = params["id"];
  if (!clientId) {
    return jsonResponse({ error: "Client ID is required" }, 400);
  }

  // Fetch client from D1
  let client: {
    id: string;
    name: string;
    email: string;
    entity_type: string;
    industry: string | null;
    created_at: string;
  } | null = null;

  try {
    client = await env.DB.prepare(
      `SELECT id, name, email, entity_type, industry, created_at
       FROM clients WHERE id = ?1 LIMIT 1`
    )
      .bind(clientId)
      .first();
  } catch {
    return jsonResponse({ error: "Database error" }, 500);
  }

  if (!client) {
    return jsonResponse({ error: `Client ${clientId} not found` }, 404);
  }

  // Get states
  let states: string[] = [];
  try {
    const result = await env.DB.prepare(
      `SELECT state FROM client_states WHERE client_id = ?1`
    )
      .bind(clientId)
      .all<{ state: string }>();

    if (result.success && result.results) {
      states = result.results.map((r) => r.state);
    }
  } catch {
    // ignore
  }

  // Get health score
  const advocis = await getAdvocisInstance(env);
  const health = await advocis.getClientHealth(clientId, env);

  return jsonResponse({
    client: {
      id: client.id,
      name: client.name,
      email: client.email,
      entityType: client.entity_type,
      industry: client.industry,
      states,
      createdAt: client.created_at,
    },
    health,
  });
}

/**
 * GET /api/advocis/client/:id/onboarding
 * Onboarding progress for a client.
 */
export async function handleAdvocisOnboarding(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const clientId = params["id"];
  if (!clientId) {
    return jsonResponse({ error: "Client ID is required" }, 400);
  }

  const advocis = await getAdvocisInstance(env);
  const board = advocis.getOnboardingEngine();
  const flow = await board.getOnboardingStatus(clientId, env);

  if (!flow) {
    return jsonResponse(
      { error: `No onboarding found for client ${clientId}` },
      404
    );
  }

  const completed = flow.steps.filter(
    (s) => s.status === "COMPLETED" || s.status === "SKIPPED"
  ).length;
  const total = flow.steps.length;

  return jsonResponse({
    clientId,
    onboardingId: flow.id,
    progress: {
      completed,
      total,
      percentage: Math.round((completed / total) * 100),
    },
    steps: flow.steps,
    startedAt: flow.startedAt,
    completedAt: flow.completedAt,
    isComplete: flow.completedAt !== null,
  });
}

/**
 * POST /api/advocis/client/:id/feedback
 * Submit client feedback.
 * Body: { rating: 1-5, comment? }
 */
export async function handleAdvocisFeedback(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const clientId = params["id"];
  if (!clientId) {
    return jsonResponse({ error: "Client ID is required" }, 400);
  }

  let body: { rating: number; comment?: string };

  try {
    body = await parseJsonBody<typeof body>(request);
  } catch {
    return jsonResponse({ error: "Invalid JSON in request body" }, 400);
  }

  if (body.rating === undefined || body.rating < 1 || body.rating > 5) {
    return jsonResponse(
      { error: "Rating is required and must be between 1 and 5" },
      400
    );
  }

  const rating = Math.round(body.rating);

  const advocis = await getAdvocisInstance(env);
  const result = await advocis.recordFeedback(
    clientId,
    rating,
    body.comment ?? null,
    env
  );

  return jsonResponse({
    success: true,
    feedbackId: result.id,
    clientId,
    rating,
    message: "Thank you for your feedback!",
  });
}

/**
 * GET /api/advocis/stats
 * Client stats dashboard.
 */
export async function handleAdvocisStats(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const advocis = await getAdvocisInstance(env);
  const stats = await advocis.getClientStats(env);

  return jsonResponse({
    citizen: "ADVOCIS",
    stats,
    lastUpdated: new Date().toISOString(),
  });
}

/**
 * GET /api/advocis/churn-risk
 * Clients at risk of churning.
 */
export async function handleAdvocisChurnRisk(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const advocis = await getAdvocisInstance(env);
  const atRisk = await advocis.getChurnRisk(env);

  return jsonResponse({
    citizen: "ADVOCIS",
    churnRisk: {
      totalAtRisk: atRisk.length,
      clients: atRisk,
    },
    analyzedAt: new Date().toISOString(),
  });
}

/**
 * POST /api/advocis/inquiry
 * Submit a support inquiry.
 * Body: { clientId?, type, message }
 */
export async function handleAdvocisInquiry(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  let body: { clientId?: string; type: string; message: string };

  try {
    body = await parseJsonBody<typeof body>(request);
  } catch {
    return jsonResponse({ error: "Invalid JSON in request body" }, 400);
  }

  if (!body.type || !body.message) {
    return jsonResponse(
      { error: "Both 'type' and 'message' are required" },
      400
    );
  }

  const advocis = await getAdvocisInstance(env);
  const serve = advocis.getServiceEngine();

  const inquiry = await serve.handleInquiry(
    {
      clientId: body.clientId,
      type: body.type,
      message: body.message,
    },
    env
  );

  return jsonResponse(
    {
      success: true,
      inquiry: {
        id: inquiry.id,
        type: inquiry.type,
        status: inquiry.status,
        response: inquiry.response,
        createdAt: inquiry.createdAt,
      },
      message:
        "Your inquiry has been received. " + (inquiry.response ?? ""),
    },
    201
  );
}

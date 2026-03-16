/**
 * ETHICARA API Route Handlers
 *
 * Founder-only ethical governance & professional standards endpoints.
 * ALL routes require Bearer token authentication — ethics oversight is not public.
 */

import type { Env } from "../index.js";
import { Ethicara } from "../personas/ethicara/index.js";
import { authenticate } from "./middleware/auth.js";
import { parseJsonBody } from "../utils/helpers.js";
import { EthicsReportCategory } from "../workers/code-1/types.js";

type RouteParams = Record<string, string>;

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// ---------------------------------------------------------------------------
// Singleton
// ---------------------------------------------------------------------------

let ethicaraInstance: Ethicara | null = null;
let ethicaraInitialized = false;

async function getEthicaraInstance(env: Env): Promise<Ethicara> {
  if (!ethicaraInstance) {
    ethicaraInstance = new Ethicara();
  }
  if (!ethicaraInitialized) {
    await ethicaraInstance.initialize(env);
    ethicaraInitialized = true;
  }
  return ethicaraInstance;
}

/**
 * Guard: every ETHICARA endpoint requires API key auth.
 */
function requireAuth(request: Request, env: Env): Response | null {
  return authenticate(request, env);
}

// =============================================================================
// GET /api/ethicara/status — ethics posture
// =============================================================================

export async function handleEthicaraStatus(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const ethicara = await getEthicaraInstance(env);
    const status = await ethicara.getEthicsStatus(env);

    return jsonResponse({
      ...status,
      wave: 6,
      domain: "Ethical Governance & Professional Standards",
      committee: "Oversight",
      workers: ["CODE-1", "FAIR-1"],
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to get ETHICARA status";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/ethicara/code — the code of ethics
// =============================================================================

export async function handleEthicaraCode(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const ethicara = await getEthicaraInstance(env);
    const code = ethicara.getEthicsCode(env);

    return jsonResponse({
      code,
      message:
        "This is the operational code of ethics governing all Vernen Persona Citizens. " +
        "Every decision runs through these principles.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to get code of ethics";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// POST /api/ethicara/review — submit a decision for ethics review
// =============================================================================

export async function handleEthicaraReview(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  let body: { decision: string; context: string; stakeholders: string };

  try {
    body = await parseJsonBody<typeof body>(request);
  } catch {
    return jsonResponse({ error: "Invalid JSON in request body" }, 400);
  }

  if (!body.decision || typeof body.decision !== "string") {
    return jsonResponse({ error: "decision is required (string)" }, 400);
  }
  if (!body.context || typeof body.context !== "string") {
    return jsonResponse({ error: "context is required (string)" }, 400);
  }
  if (!body.stakeholders || typeof body.stakeholders !== "string") {
    return jsonResponse({ error: "stakeholders is required (string)" }, 400);
  }

  try {
    const ethicara = await getEthicaraInstance(env);
    const review = await ethicara.conductEthicsReview(
      {
        decision: body.decision,
        context: body.context,
        stakeholders: body.stakeholders,
      },
      env
    );

    return jsonResponse({ review }, 201);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to conduct ethics review";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/ethicara/reviews — ethics review history
// =============================================================================

export async function handleEthicaraReviews(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") ?? "50", 10);

    if (isNaN(limit) || limit < 1 || limit > 100) {
      return jsonResponse(
        { error: "Invalid limit parameter. Use 1-100." },
        400
      );
    }

    const ethicara = await getEthicaraInstance(env);
    const reviews = await ethicara.getReviewHistory(env, limit);

    return jsonResponse({
      reviews,
      total: reviews.length,
      limit,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to get ethics review history";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// POST /api/ethicara/report — anonymous ethics violation report
// =============================================================================

export async function handleEthicaraReport(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  let body: { description: string; category: string };

  try {
    body = await parseJsonBody<typeof body>(request);
  } catch {
    return jsonResponse({ error: "Invalid JSON in request body" }, 400);
  }

  if (!body.description || typeof body.description !== "string") {
    return jsonResponse({ error: "description is required (string)" }, 400);
  }

  if (
    !body.category ||
    !Object.values(EthicsReportCategory).includes(
      body.category as EthicsReportCategory
    )
  ) {
    return jsonResponse(
      {
        error: `Invalid category. Use: ${Object.values(EthicsReportCategory).join(", ")}`,
      },
      400
    );
  }

  try {
    const ethicara = await getEthicaraInstance(env);
    const report = await ethicara.reportEthicsViolation(
      { description: body.description, category: body.category },
      env
    );

    return jsonResponse(
      {
        report,
        message:
          "Ethics violation report received. All reports are anonymous and will " +
          "be investigated according to the code of ethics.",
      },
      201
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to submit ethics violation report";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/ethicara/fairness — fairness audit report
// =============================================================================

export async function handleEthicaraFairness(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const ethicara = await getEthicaraInstance(env);
    const fairnessReport = await ethicara.getFairnessReport(env);

    return jsonResponse({
      fairness: fairnessReport,
      message:
        fairnessReport.overallStatus === "FAIR"
          ? "All fairness checks passed. The system treats all clients equitably."
          : fairnessReport.overallStatus === "MARGINAL"
            ? "Some fairness checks raised concerns. Review the details below."
            : "Fairness violations detected. Immediate review required.",
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to generate fairness report";
    return jsonResponse({ error: message }, 500);
  }
}

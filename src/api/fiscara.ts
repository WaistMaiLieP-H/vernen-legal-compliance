/**
 * FISCARA API Route Handlers
 *
 * Founder-only financial intelligence endpoints.
 * ALL routes require Bearer token authentication — this is internal financial data.
 */

import type { Env } from "../index.js";
import { Fiscara } from "../personas/fiscara/index.js";
import { authenticate } from "./middleware/auth.js";
import { parseJsonBody } from "../utils/helpers.js";
import {
  TransactionType,
  TransactionCategory,
} from "../workers/ledger-1/types.js";

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

let fiscaraInstance: Fiscara | null = null;
let fiscaraInitialized = false;

async function getFiscaraInstance(env: Env): Promise<Fiscara> {
  if (!fiscaraInstance) {
    fiscaraInstance = new Fiscara();
  }
  if (!fiscaraInitialized) {
    await fiscaraInstance.initialize(env);
    fiscaraInitialized = true;
  }
  return fiscaraInstance;
}

/**
 * Guard: every FISCARA endpoint requires API key auth.
 */
function requireAuth(request: Request, env: Env): Response | null {
  return authenticate(request, env);
}

// =============================================================================
// GET /api/fiscara/status
// =============================================================================

export async function handleFiscaraStatus(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const fiscara = await getFiscaraInstance(env);
    const stats = await fiscara.getStats(env);

    return jsonResponse({
      citizen: "FISCARA",
      wave: 4,
      domain: "Financial Strategy & Fiscal Accountability",
      workers: ["LEDGER-1", "FLOW-1"],
      ...stats,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to get FISCARA status";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/fiscara/summary?period=month
// =============================================================================

export async function handleFiscaraSummary(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const url = new URL(request.url);
    const period = (url.searchParams.get("period") ?? "month") as
      | "day"
      | "week"
      | "month"
      | "all";

    if (!["day", "week", "month", "all"].includes(period)) {
      return jsonResponse(
        { error: "Invalid period. Use: day, week, month, all" },
        400
      );
    }

    const fiscara = await getFiscaraInstance(env);
    const summary = await fiscara.getFinancialSummary(period, env);

    return jsonResponse({
      ...summary,
      // Convert cents to dollars for display
      totalRevenueFormatted: `$${(summary.totalRevenue / 100).toFixed(2)}`,
      totalExpensesFormatted: `$${(summary.totalExpenses / 100).toFixed(2)}`,
      netIncomeFormatted: `$${(summary.netIncome / 100).toFixed(2)}`,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to get financial summary";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/fiscara/revenue/products
// =============================================================================

export async function handleFiscaraRevenueByProduct(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const fiscara = await getFiscaraInstance(env);
    const breakdown = await fiscara.getRevenueByProduct(env);

    return jsonResponse({
      breakdown,
      totalProducts: breakdown.length,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to get revenue by product";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/fiscara/revenue/states
// =============================================================================

export async function handleFiscaraRevenueByState(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const fiscara = await getFiscaraInstance(env);
    const breakdown = await fiscara.getRevenueByState(env);

    return jsonResponse({
      breakdown,
      totalStates: breakdown.length,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to get revenue by state";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/fiscara/revenue/daily?days=30
// =============================================================================

export async function handleFiscaraDailyRevenue(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const url = new URL(request.url);
    const days = parseInt(url.searchParams.get("days") ?? "30", 10);

    if (isNaN(days) || days < 1 || days > 365) {
      return jsonResponse(
        { error: "Invalid days parameter. Use 1-365." },
        400
      );
    }

    const fiscara = await getFiscaraInstance(env);
    const dailyData = await fiscara.getDailyRevenue(days, env);

    return jsonResponse({
      days,
      data: dailyData,
      totalDataPoints: dailyData.length,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to get daily revenue";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/fiscara/transactions?limit=50&offset=0
// =============================================================================

export async function handleFiscaraTransactions(
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
    const offset = parseInt(url.searchParams.get("offset") ?? "0", 10);

    const fiscara = await getFiscaraInstance(env);
    const result = await fiscara.getTransactionHistory(limit, offset, env);

    return jsonResponse({
      transactions: result.transactions,
      total: result.total,
      limit,
      offset,
      hasMore: offset + limit < result.total,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to get transactions";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// POST /api/fiscara/transaction
// =============================================================================

export async function handleFiscaraRecordTransaction(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  let body: {
    type: string;
    category: string;
    amount: number;
    description: string;
    productId?: string;
    state?: string;
    metadata?: Record<string, unknown>;
  };

  try {
    body = await parseJsonBody<typeof body>(request);
  } catch {
    return jsonResponse({ error: "Invalid JSON in request body" }, 400);
  }

  // Validate type
  if (
    !body.type ||
    !Object.values(TransactionType).includes(body.type as TransactionType)
  ) {
    return jsonResponse(
      {
        error: `Invalid type. Use: ${Object.values(TransactionType).join(", ")}`,
      },
      400
    );
  }

  // Validate category
  if (
    !body.category ||
    !Object.values(TransactionCategory).includes(
      body.category as TransactionCategory
    )
  ) {
    return jsonResponse(
      {
        error: `Invalid category. Use: ${Object.values(TransactionCategory).join(", ")}`,
      },
      400
    );
  }

  // Validate amount
  if (!body.amount || typeof body.amount !== "number" || body.amount <= 0) {
    return jsonResponse(
      { error: "Amount must be a positive integer (in cents)" },
      400
    );
  }

  if (!body.description) {
    return jsonResponse({ error: "Description is required" }, 400);
  }

  try {
    const fiscara = await getFiscaraInstance(env);
    const txnType = body.type as TransactionType;

    let transaction;
    if (txnType === TransactionType.REVENUE) {
      transaction = await fiscara.recordRevenue(
        {
          type: TransactionType.REVENUE,
          category: body.category as TransactionCategory,
          amount: body.amount,
          description: body.description,
          productId: body.productId,
          state: body.state,
          metadata: body.metadata,
        },
        env
      );
    } else {
      transaction = await fiscara.recordExpense(
        {
          type: txnType,
          category: body.category as TransactionCategory,
          amount: body.amount,
          description: body.description,
          productId: body.productId,
          state: body.state,
          metadata: body.metadata,
        },
        env
      );
    }

    return jsonResponse({ transaction }, 201);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to record transaction";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/fiscara/cashflow
// =============================================================================

export async function handleFiscaraCashFlow(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const fiscara = await getFiscaraInstance(env);
    const [cashFlow, projection, runway] = await Promise.all([
      fiscara.getCashFlow(env),
      fiscara.getCashFlowProjection(90, env),
      fiscara.getRunwayEstimate(env),
    ]);

    return jsonResponse({
      current: cashFlow,
      projection,
      runway,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to get cash flow data";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/fiscara/growth
// =============================================================================

export async function handleFiscaraGrowth(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const fiscara = await getFiscaraInstance(env);
    const [growth, avgTxn] = await Promise.all([
      fiscara.getGrowthRates(env),
      fiscara.getAverageTransactionValue(env),
    ]);

    return jsonResponse({
      growth,
      averageTransactionValue: avgTxn,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to get growth data";
    return jsonResponse({ error: message }, 500);
  }
}

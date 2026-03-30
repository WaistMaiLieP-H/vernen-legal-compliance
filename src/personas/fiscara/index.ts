/**
 * FISCARA — Financial Strategy & Fiscal Accountability Citizen.
 *
 * Wave 4 Persona Citizen. The internal financial brain of the Vernen platform.
 * Tracks all revenue, expenses, and financial health. Every dollar in and out
 * flows through FISCARA.
 *
 * Workers:
 *   - LEDGER-1: Accounting engine (transactions, balances, reconciliation)
 *   - FLOW-1: Cash flow intelligence (projections, growth, trends)
 */

import { PersonaCitizenBase } from "../base.js";
import { PersonaCitizenStatus } from "../../types/persona.js";
import { generateId , safeKvPut } from "../../utils/helpers.js";
import { Ledger1Worker } from "../../workers/ledger-1/index.js";
import { Flow1Worker } from "../../workers/flow-1/index.js";
import {
  TransactionType,
  TransactionCategory,
} from "../../workers/ledger-1/types.js";
import type {
  Transaction,
  FinancialSummary,
} from "../../workers/ledger-1/types.js";
import type { Env } from "../../index.js";

/** KV namespace prefix for all FISCARA knowledge entries. */
const KV_PREFIX = "FISCARA:";

/** D1 table where persona citizen records live. */
const PERSONA_TABLE = "persona_citizens";

/** D1 table where transactions are stored. */
const TRANSACTIONS_TABLE = "transactions";

/**
 * Shape of a row in the persona_citizens D1 table.
 */
interface PersonaRow {
  id: string;
  name: string;
  status: string;
  deployed_at: string | null;
  conceived_at: string;
}

/**
 * FISCARA — The Financial Strategy & Fiscal Accountability Persona Citizen.
 * Tracks all revenue, expenses, and financial health of the platform.
 */
export class Fiscara extends PersonaCitizenBase {
  private ledger: Ledger1Worker;
  private flow: Flow1Worker;

  constructor() {
    super("FISCARA", "fiscara-knowledge", PersonaCitizenStatus.CONCEIVED);
    this.ledger = new Ledger1Worker();
    this.flow = new Flow1Worker();
  }

  // ---------------------------------------------------------------------------
  // Lifecycle overrides
  // ---------------------------------------------------------------------------

  /**
   * Initialize FISCARA by reading its status from D1 and setting up its
   * knowledge store namespace in KV.
   */
  async initialize(env: Env): Promise<void> {
    try {
      const row = await env.DB.prepare(
        `SELECT id, name, status, deployed_at, conceived_at
         FROM ${PERSONA_TABLE}
         WHERE name = ?1
         LIMIT 1`
      )
        .bind("FISCARA")
        .first<PersonaRow>();

      if (row) {
        const dbStatus = row.status as PersonaCitizenStatus;
        if (Object.values(PersonaCitizenStatus).includes(dbStatus)) {
          this._status = dbStatus;
        }
      } else {
        // First boot — insert persona record
        await env.DB.prepare(
          `INSERT OR IGNORE INTO ${PERSONA_TABLE}
           (id, name, status, conceived_at)
           VALUES (?1, ?2, ?3, ?4)`
        )
          .bind(
            generateId("persona"),
            "FISCARA",
            PersonaCitizenStatus.SHELL_DEPLOYED,
            new Date().toISOString()
          )
          .run();

        this._status = PersonaCitizenStatus.SHELL_DEPLOYED;
      }
    } catch {
      this._status = PersonaCitizenStatus.SHELL_DEPLOYED;
    }

    // Initialize KV knowledge namespace with boot marker
    const bootKey = `${KV_PREFIX}system:last_boot`;
    await safeKvPut(env.KNOWLEDGE_STORE, bootKey, new Date().toISOString());

    // Ensure KV counters exist
    const totalTxnKey = `${KV_PREFIX}stats:total_transactions`;
    const existing = await env.KNOWLEDGE_STORE.get(totalTxnKey);
    if (existing === null) {
      await safeKvPut(env.KNOWLEDGE_STORE, totalTxnKey, "0");
    }
  }

  /**
   * Handle inbound events from the system or other Persona Citizens.
   */
  async receiveEvent(
    event: string,
    payload: unknown,
    env: Env
  ): Promise<void> {
    switch (event) {
      case "payment_received": {
        const data = payload as {
          amount: number;
          productId?: string;
          state?: string;
          stripePaymentId?: string;
          description?: string;
          category?: string;
        };
        await this.recordRevenue(
          {
            type: TransactionType.REVENUE,
            category:
              (data.category as TransactionCategory) ??
              TransactionCategory.COMPLIANCE_REPORT,
            amount: data.amount,
            description: data.description ?? "Payment received",
            stripePaymentId: data.stripePaymentId,
            productId: data.productId,
            state: data.state,
          },
          env
        );
        break;
      }

      case "expense_recorded": {
        const data = payload as {
          amount: number;
          category?: string;
          description?: string;
        };
        await this.recordExpense(
          {
            type: TransactionType.EXPENSE,
            category:
              (data.category as TransactionCategory) ??
              TransactionCategory.OTHER,
            amount: data.amount,
            description: data.description ?? "Expense recorded",
          },
          env
        );
        break;
      }

      case "report_generated": {
        const data = payload as { reportId: string; state?: string };
        // Record knowledge about report generation for financial tracking
        await this._recordKnowledge(
          `report:${data.reportId}`,
          {
            event: "report_generated",
            state: data.state,
            recordedAt: new Date().toISOString(),
          },
          env
        );
        break;
      }

      default:
        await this._recordKnowledge(
          `unknown_event:${Date.now()}`,
          { event, payload, receivedAt: new Date().toISOString() },
          env
        );
        break;
    }
  }

  /**
   * Search FISCARA's KV knowledge store by query string.
   */
  async queryKnowledge(
    query: string,
    env: Env
  ): Promise<{
    query: string;
    results: Array<{ key: string; value: unknown }>;
    source: string;
  }> {
    const prefix = `${KV_PREFIX}${query}`;
    const listResult = await env.KNOWLEDGE_STORE.list({ prefix, limit: 50 });

    const results: Array<{ key: string; value: unknown }> = [];
    for (const keyEntry of listResult.keys) {
      const value = await env.KNOWLEDGE_STORE.get(keyEntry.name, "json");
      if (value !== null) {
        results.push({
          key: keyEntry.name.slice(KV_PREFIX.length),
          value,
        });
      }
    }

    return { query, results, source: this.name };
  }

  // ---------------------------------------------------------------------------
  // Financial operations
  // ---------------------------------------------------------------------------

  /**
   * Record a revenue transaction in D1 via LEDGER-1.
   */
  async recordRevenue(
    transaction: Omit<Transaction, "id" | "createdAt">,
    env: Env
  ): Promise<Transaction> {
    const txn = await this.ledger.recordTransaction(
      { ...transaction, type: TransactionType.REVENUE },
      env
    );

    // Update FISCARA stats
    await this._incrementStat("total_transactions", env);
    await this._incrementStat("total_revenue_transactions", env);

    // Track revenue by product
    if (txn.productId) {
      await this._incrementStatBy(
        `product:${txn.productId}`,
        txn.amount,
        env
      );
    }

    // Track revenue by state
    if (txn.state) {
      await this._incrementStatBy(`state:${txn.state}`, txn.amount, env);
    }

    return txn;
  }

  /**
   * Record an expense transaction in D1 via LEDGER-1.
   */
  async recordExpense(
    expense: Omit<Transaction, "id" | "createdAt">,
    env: Env
  ): Promise<Transaction> {
    const txn = await this.ledger.recordTransaction(
      { ...expense, type: TransactionType.EXPENSE },
      env
    );

    await this._incrementStat("total_transactions", env);
    await this._incrementStat("total_expense_transactions", env);

    return txn;
  }

  /**
   * Get financial summary for a given period.
   */
  async getFinancialSummary(
    period: "day" | "week" | "month" | "all",
    env: Env
  ): Promise<FinancialSummary> {
    let dateFilter = "";
    const now = new Date();

    switch (period) {
      case "day": {
        const startOfDay = new Date(now);
        startOfDay.setHours(0, 0, 0, 0);
        dateFilter = `AND created_at >= '${startOfDay.toISOString()}'`;
        break;
      }
      case "week": {
        const startOfWeek = new Date(now);
        const dayOfWeek = now.getDay();
        const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        startOfWeek.setDate(now.getDate() - mondayOffset);
        startOfWeek.setHours(0, 0, 0, 0);
        dateFilter = `AND created_at >= '${startOfWeek.toISOString()}'`;
        break;
      }
      case "month": {
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        dateFilter = `AND created_at >= '${startOfMonth.toISOString()}'`;
        break;
      }
      case "all":
      default:
        dateFilter = "";
        break;
    }

    let totalRevenue = 0;
    let totalExpenses = 0;
    let transactionCount = 0;

    try {
      const result = await env.DB.prepare(
        `SELECT type, SUM(amount) as total, COUNT(*) as cnt
         FROM ${TRANSACTIONS_TABLE}
         WHERE type IN ('REVENUE', 'EXPENSE', 'REFUND')
         ${dateFilter}
         GROUP BY type`
      ).all<{ type: string; total: number; cnt: number }>();

      if (result.success && result.results) {
        for (const row of result.results) {
          transactionCount += row.cnt;
          if (row.type === "REVENUE") totalRevenue = row.total;
          if (row.type === "EXPENSE" || row.type === "REFUND")
            totalExpenses += row.total;
        }
      }
    } catch {
      // Table may not exist
    }

    return {
      totalRevenue,
      totalExpenses,
      netIncome: totalRevenue - totalExpenses,
      transactionCount,
      period,
    };
  }

  /**
   * Get revenue breakdown by product type.
   */
  async getRevenueByProduct(
    env: Env
  ): Promise<Array<{ productId: string; revenue: number; count: number }>> {
    try {
      const result = await env.DB.prepare(
        `SELECT product_id, SUM(amount) as revenue, COUNT(*) as cnt
         FROM ${TRANSACTIONS_TABLE}
         WHERE type = 'REVENUE' AND product_id IS NOT NULL
         GROUP BY product_id
         ORDER BY revenue DESC`
      ).all<{ product_id: string; revenue: number; cnt: number }>();

      if (result.success && result.results) {
        return result.results.map((row) => ({
          productId: row.product_id,
          revenue: row.revenue,
          count: row.cnt,
        }));
      }
    } catch {
      // Table may not exist
    }

    return [];
  }

  /**
   * Get revenue breakdown by state.
   */
  async getRevenueByState(
    env: Env
  ): Promise<Array<{ state: string; revenue: number; count: number }>> {
    try {
      const result = await env.DB.prepare(
        `SELECT state, SUM(amount) as revenue, COUNT(*) as cnt
         FROM ${TRANSACTIONS_TABLE}
         WHERE type = 'REVENUE' AND state IS NOT NULL
         GROUP BY state
         ORDER BY revenue DESC`
      ).all<{ state: string; revenue: number; cnt: number }>();

      if (result.success && result.results) {
        return result.results.map((row) => ({
          state: row.state,
          revenue: row.revenue,
          count: row.cnt,
        }));
      }
    } catch {
      // Table may not exist
    }

    return [];
  }

  /**
   * Get daily revenue for the last N days (for trend charts).
   */
  async getDailyRevenue(
    days: number,
    env: Env
  ): Promise<Array<{ date: string; revenue: number; expenses: number }>> {
    const safeDays = Math.min(Math.max(days, 1), 365);
    const startDate = new Date(
      Date.now() - safeDays * 24 * 60 * 60 * 1000
    ).toISOString();

    try {
      const result = await env.DB.prepare(
        `SELECT DATE(created_at) as date, type, SUM(amount) as total
         FROM ${TRANSACTIONS_TABLE}
         WHERE created_at >= ?1 AND type IN ('REVENUE', 'EXPENSE')
         GROUP BY DATE(created_at), type
         ORDER BY date ASC`
      )
        .bind(startDate)
        .all<{ date: string; type: string; total: number }>();

      if (result.success && result.results) {
        // Pivot rows into date -> { revenue, expenses }
        const dateMap = new Map<
          string,
          { revenue: number; expenses: number }
        >();

        for (const row of result.results) {
          const entry = dateMap.get(row.date) ?? { revenue: 0, expenses: 0 };
          if (row.type === "REVENUE") entry.revenue = row.total;
          if (row.type === "EXPENSE") entry.expenses = row.total;
          dateMap.set(row.date, entry);
        }

        return Array.from(dateMap.entries()).map(([date, totals]) => ({
          date,
          revenue: totals.revenue,
          expenses: totals.expenses,
        }));
      }
    } catch {
      // Table may not exist
    }

    return [];
  }

  /**
   * Estimate runway: how many days until break-even based on current burn rate.
   * Returns null if already profitable or no data.
   */
  async getRunwayEstimate(
    env: Env
  ): Promise<{
    dailyBurnRate: number;
    dailyRevenueRate: number;
    currentBalance: number;
    runwayDays: number | null;
    isProfitable: boolean;
    asOf: string;
  }> {
    const projection = await this.flow.projectCashFlow(90, env);

    return {
      dailyBurnRate: projection.dailyBurnRate,
      dailyRevenueRate: projection.dailyRevenueRate,
      currentBalance: projection.projectedBalance - projection.projectedNetDaily * 90,
      runwayDays: projection.breakEvenDays,
      isProfitable: projection.projectedNetDaily >= 0,
      asOf: new Date().toISOString(),
    };
  }

  /**
   * Get FISCARA operational stats.
   */
  async getStats(env: Env): Promise<{
    status: PersonaCitizenStatus;
    lastBoot: string | null;
    totalTransactions: number;
    balance: {
      totalRevenue: number;
      totalExpenses: number;
      totalRefunds: number;
      netBalance: number;
    };
  }> {
    const lastBoot = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}system:last_boot`
    );
    const totalTxnRaw = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}stats:total_transactions`
    );
    const totalTransactions = totalTxnRaw ? parseInt(totalTxnRaw, 10) : 0;
    const balance = await this.ledger.getBalance(env);

    return {
      status: this._status,
      lastBoot,
      totalTransactions,
      balance,
    };
  }

  // ---------------------------------------------------------------------------
  // Delegate methods to workers
  // ---------------------------------------------------------------------------

  /** Get paginated transaction history via LEDGER-1. */
  async getTransactionHistory(limit: number, offset: number, env: Env) {
    return this.ledger.getTransactionHistory(limit, offset, env);
  }

  /** Get current cash flow snapshot via FLOW-1. */
  async getCashFlow(env: Env) {
    return this.flow.getCurrentCashFlow(env);
  }

  /** Get cash flow projection via FLOW-1. */
  async getCashFlowProjection(days: number, env: Env) {
    return this.flow.projectCashFlow(days, env);
  }

  /** Get growth rates via FLOW-1. */
  async getGrowthRates(env: Env) {
    return this.flow.getRevenueGrowthRate(env);
  }

  /** Get average transaction values via FLOW-1. */
  async getAverageTransactionValue(env: Env) {
    return this.flow.getAverageTransactionValue(env);
  }

  /** Reconcile KV totals against D1 via LEDGER-1. */
  async reconcile(env: Env) {
    return this.ledger.reconcile(env);
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  private async _recordKnowledge(
    key: string,
    value: unknown,
    env: Env
  ): Promise<void> {
    const fullKey = `${KV_PREFIX}${key}`;
    await safeKvPut(env.KNOWLEDGE_STORE, fullKey, JSON.stringify(value));
  }

  private async _incrementStat(statName: string, env: Env): Promise<void> {
    const key = `${KV_PREFIX}stats:${statName}`;
    const currentRaw = await env.KNOWLEDGE_STORE.get(key);
    const current = currentRaw ? parseInt(currentRaw, 10) : 0;
    await safeKvPut(env.KNOWLEDGE_STORE, key, String(current + 1));
  }

  private async _incrementStatBy(
    statName: string,
    amount: number,
    env: Env
  ): Promise<void> {
    const key = `${KV_PREFIX}stats:${statName}`;
    const currentRaw = await env.KNOWLEDGE_STORE.get(key);
    const current = currentRaw ? parseInt(currentRaw, 10) : 0;
    await safeKvPut(env.KNOWLEDGE_STORE, key, String(current + amount));
  }
}

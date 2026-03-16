/**
 * LEDGER-1 — Accounting Engine Worker for FISCARA.
 *
 * Manages transaction recording, balance tracking, and reconciliation.
 * Uses D1 as the source of truth and KV for fast running-total lookups.
 */

import type { Env } from "../../index.js";
import { generateId } from "../../utils/helpers.js";
import type {
  Transaction,
  TransactionRow,
  FinancialSummary,
  MonthlyReport,
} from "./types.js";
import { TransactionType, TransactionCategory } from "./types.js";

const KV_PREFIX = "FISCARA:ledger:";
const TRANSACTIONS_TABLE = "transactions";

/**
 * Convert a D1 row into a typed Transaction.
 */
function rowToTransaction(row: TransactionRow): Transaction {
  let metadata: Record<string, unknown> | undefined;
  if (row.metadata) {
    try {
      metadata = JSON.parse(row.metadata) as Record<string, unknown>;
    } catch {
      metadata = undefined;
    }
  }

  return {
    id: row.id,
    type: row.type as TransactionType,
    category: row.category as TransactionCategory,
    amount: row.amount,
    description: row.description ?? "",
    stripePaymentId: row.stripe_payment_id ?? undefined,
    productId: row.product_id ?? undefined,
    state: row.state ?? undefined,
    metadata,
    createdAt: row.created_at,
  };
}

export class Ledger1Worker {
  /**
   * Record a transaction in D1 and update KV running totals.
   */
  async recordTransaction(
    txn: Omit<Transaction, "id" | "createdAt">,
    env: Env
  ): Promise<Transaction> {
    const id = generateId("txn");
    const createdAt = new Date().toISOString();

    await env.DB.prepare(
      `INSERT INTO ${TRANSACTIONS_TABLE}
       (id, type, category, amount, description, stripe_payment_id, product_id, state, metadata, created_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)`
    )
      .bind(
        id,
        txn.type,
        txn.category,
        txn.amount,
        txn.description || null,
        txn.stripePaymentId || null,
        txn.productId || null,
        txn.state || null,
        txn.metadata ? JSON.stringify(txn.metadata) : null,
        createdAt
      )
      .run();

    // Update KV running totals
    await this._updateRunningTotals(txn.type, txn.amount, env);

    const transaction: Transaction = {
      id,
      ...txn,
      createdAt,
    };

    return transaction;
  }

  /**
   * Get current balance from KV (fast path).
   */
  async getBalance(env: Env): Promise<{
    totalRevenue: number;
    totalExpenses: number;
    totalRefunds: number;
    netBalance: number;
  }> {
    const [revenueRaw, expensesRaw, refundsRaw] = await Promise.all([
      env.KNOWLEDGE_STORE.get(`${KV_PREFIX}total:REVENUE`),
      env.KNOWLEDGE_STORE.get(`${KV_PREFIX}total:EXPENSE`),
      env.KNOWLEDGE_STORE.get(`${KV_PREFIX}total:REFUND`),
    ]);

    const totalRevenue = revenueRaw ? parseInt(revenueRaw, 10) : 0;
    const totalExpenses = expensesRaw ? parseInt(expensesRaw, 10) : 0;
    const totalRefunds = refundsRaw ? parseInt(refundsRaw, 10) : 0;

    return {
      totalRevenue,
      totalExpenses,
      totalRefunds,
      netBalance: totalRevenue - totalExpenses - totalRefunds,
    };
  }

  /**
   * Reconcile KV running totals against D1 sums.
   * Returns a discrepancy report. If discrepancies are found, KV is corrected.
   */
  async reconcile(env: Env): Promise<{
    kvTotals: Record<string, number>;
    d1Totals: Record<string, number>;
    discrepancies: string[];
    corrected: boolean;
  }> {
    // Get KV totals
    const kvBalance = await this.getBalance(env);
    const kvTotals: Record<string, number> = {
      REVENUE: kvBalance.totalRevenue,
      EXPENSE: kvBalance.totalExpenses,
      REFUND: kvBalance.totalRefunds,
    };

    // Get D1 totals
    const d1Totals: Record<string, number> = {
      REVENUE: 0,
      EXPENSE: 0,
      REFUND: 0,
    };

    try {
      const result = await env.DB.prepare(
        `SELECT type, SUM(amount) as total
         FROM ${TRANSACTIONS_TABLE}
         WHERE type IN ('REVENUE', 'EXPENSE', 'REFUND')
         GROUP BY type`
      ).all<{ type: string; total: number }>();

      if (result.success && result.results) {
        for (const row of result.results) {
          d1Totals[row.type] = row.total;
        }
      }
    } catch {
      return {
        kvTotals,
        d1Totals,
        discrepancies: ["D1 query failed — transactions table may not exist"],
        corrected: false,
      };
    }

    // Compare
    const discrepancies: string[] = [];
    for (const type of ["REVENUE", "EXPENSE", "REFUND"]) {
      if (kvTotals[type] !== d1Totals[type]) {
        discrepancies.push(
          `${type}: KV=${kvTotals[type]} vs D1=${d1Totals[type]}`
        );
      }
    }

    // Correct KV if discrepancies found
    let corrected = false;
    if (discrepancies.length > 0) {
      await Promise.all([
        env.KNOWLEDGE_STORE.put(
          `${KV_PREFIX}total:REVENUE`,
          String(d1Totals["REVENUE"])
        ),
        env.KNOWLEDGE_STORE.put(
          `${KV_PREFIX}total:EXPENSE`,
          String(d1Totals["EXPENSE"])
        ),
        env.KNOWLEDGE_STORE.put(
          `${KV_PREFIX}total:REFUND`,
          String(d1Totals["REFUND"])
        ),
      ]);
      corrected = true;
    }

    return { kvTotals, d1Totals, discrepancies, corrected };
  }

  /**
   * Get paginated transaction history from D1.
   */
  async getTransactionHistory(
    limit: number,
    offset: number,
    env: Env
  ): Promise<{ transactions: Transaction[]; total: number }> {
    const safeLimit = Math.min(Math.max(limit, 1), 100);
    const safeOffset = Math.max(offset, 0);

    try {
      const [dataResult, countResult] = await Promise.all([
        env.DB.prepare(
          `SELECT id, type, category, amount, description, stripe_payment_id,
                  product_id, state, metadata, created_at
           FROM ${TRANSACTIONS_TABLE}
           ORDER BY created_at DESC
           LIMIT ?1 OFFSET ?2`
        )
          .bind(safeLimit, safeOffset)
          .all<TransactionRow>(),
        env.DB.prepare(
          `SELECT COUNT(*) as count FROM ${TRANSACTIONS_TABLE}`
        ).first<{ count: number }>(),
      ]);

      const transactions =
        dataResult.success && dataResult.results
          ? dataResult.results.map(rowToTransaction)
          : [];

      return {
        transactions,
        total: countResult?.count ?? 0,
      };
    } catch {
      return { transactions: [], total: 0 };
    }
  }

  /**
   * Generate a monthly P&L summary for a given year and month.
   */
  async getMonthlyReport(
    year: number,
    month: number,
    env: Env
  ): Promise<MonthlyReport> {
    const monthStr = String(month).padStart(2, "0");
    const startDate = `${year}-${monthStr}-01`;
    const endMonth = month === 12 ? 1 : month + 1;
    const endYear = month === 12 ? year + 1 : year;
    const endDate = `${endYear}-${String(endMonth).padStart(2, "0")}-01`;

    let revenue = 0;
    let expenses = 0;
    let refunds = 0;
    let transactionCount = 0;
    const categoryTotals = new Map<string, number>();

    try {
      // Aggregates by type
      const typeResult = await env.DB.prepare(
        `SELECT type, SUM(amount) as total, COUNT(*) as cnt
         FROM ${TRANSACTIONS_TABLE}
         WHERE created_at >= ?1 AND created_at < ?2
         GROUP BY type`
      )
        .bind(startDate, endDate)
        .all<{ type: string; total: number; cnt: number }>();

      if (typeResult.success && typeResult.results) {
        for (const row of typeResult.results) {
          transactionCount += row.cnt;
          switch (row.type) {
            case "REVENUE":
              revenue = row.total;
              break;
            case "EXPENSE":
              expenses = row.total;
              break;
            case "REFUND":
              refunds = row.total;
              break;
          }
        }
      }

      // Aggregates by category
      const catResult = await env.DB.prepare(
        `SELECT category, SUM(amount) as total
         FROM ${TRANSACTIONS_TABLE}
         WHERE created_at >= ?1 AND created_at < ?2
         GROUP BY category
         ORDER BY total DESC`
      )
        .bind(startDate, endDate)
        .all<{ category: string; total: number }>();

      if (catResult.success && catResult.results) {
        for (const row of catResult.results) {
          categoryTotals.set(row.category, row.total);
        }
      }
    } catch {
      // Table may not exist yet
    }

    const topCategories = Array.from(categoryTotals.entries())
      .map(([category, amount]) => ({ category, amount }))
      .slice(0, 10);

    return {
      year,
      month,
      revenue,
      expenses,
      refunds,
      netIncome: revenue - expenses - refunds,
      transactionCount,
      topCategories,
      generatedAt: new Date().toISOString(),
    };
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  /**
   * Update KV running totals after a transaction is recorded.
   */
  private async _updateRunningTotals(
    type: TransactionType,
    amount: number,
    env: Env
  ): Promise<void> {
    const key = `${KV_PREFIX}total:${type}`;
    const currentRaw = await env.KNOWLEDGE_STORE.get(key);
    const current = currentRaw ? parseInt(currentRaw, 10) : 0;
    await env.KNOWLEDGE_STORE.put(key, String(current + amount));
  }
}

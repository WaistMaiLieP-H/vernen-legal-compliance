/**
 * FLOW-1 — Cash Flow Intelligence Worker for FISCARA.
 *
 * Analyzes cash flow trends, projects forward, and calculates growth rates.
 */

import type { Env } from "../../index.js";
import type {
  CashFlowSnapshot,
  CashFlowProjection,
  GrowthRate,
  AverageTransactionValue,
} from "./types.js";

const TRANSACTIONS_TABLE = "transactions";

export class Flow1Worker {
  /**
   * Get the current real-time cash position.
   */
  async getCurrentCashFlow(env: Env): Promise<CashFlowSnapshot> {
    let totalRevenue = 0;
    let totalExpenses = 0;

    try {
      const result = await env.DB.prepare(
        `SELECT type, SUM(amount) as total
         FROM ${TRANSACTIONS_TABLE}
         WHERE type IN ('REVENUE', 'EXPENSE', 'REFUND')
         GROUP BY type`
      ).all<{ type: string; total: number }>();

      if (result.success && result.results) {
        for (const row of result.results) {
          if (row.type === "REVENUE") totalRevenue = row.total;
          if (row.type === "EXPENSE" || row.type === "REFUND")
            totalExpenses += row.total;
        }
      }
    } catch {
      // Table may not exist
    }

    return {
      currentBalance: totalRevenue - totalExpenses,
      totalRevenue,
      totalExpenses,
      netCashFlow: totalRevenue - totalExpenses,
      asOf: new Date().toISOString(),
    };
  }

  /**
   * Project cash flow forward based on recent trends.
   * Uses the last 30 days of data to calculate daily rates.
   */
  async projectCashFlow(days: number, env: Env): Promise<CashFlowProjection> {
    const safeDays = Math.min(Math.max(days, 1), 365);
    const thirtyDaysAgo = new Date(
      Date.now() - 30 * 24 * 60 * 60 * 1000
    ).toISOString();

    let recentRevenue = 0;
    let recentExpenses = 0;
    let daysCovered = 30;

    try {
      const result = await env.DB.prepare(
        `SELECT type, SUM(amount) as total
         FROM ${TRANSACTIONS_TABLE}
         WHERE created_at >= ?1 AND type IN ('REVENUE', 'EXPENSE', 'REFUND')
         GROUP BY type`
      )
        .bind(thirtyDaysAgo)
        .all<{ type: string; total: number }>();

      if (result.success && result.results) {
        for (const row of result.results) {
          if (row.type === "REVENUE") recentRevenue = row.total;
          if (row.type === "EXPENSE" || row.type === "REFUND")
            recentExpenses += row.total;
        }
      }

      // Check how many actual days of data we have
      const firstTxn = await env.DB.prepare(
        `SELECT MIN(created_at) as first_date FROM ${TRANSACTIONS_TABLE}`
      ).first<{ first_date: string | null }>();

      if (firstTxn?.first_date) {
        const firstDate = new Date(firstTxn.first_date);
        const now = new Date();
        const actualDays = Math.max(
          1,
          Math.ceil(
            (now.getTime() - firstDate.getTime()) / (24 * 60 * 60 * 1000)
          )
        );
        daysCovered = Math.min(actualDays, 30);
      }
    } catch {
      // Table may not exist
    }

    const dailyRevenueRate = recentRevenue / daysCovered;
    const dailyBurnRate = recentExpenses / daysCovered;
    const projectedNetDaily = dailyRevenueRate - dailyBurnRate;

    // Get current balance
    const currentCashFlow = await this.getCurrentCashFlow(env);
    const projectedBalance =
      currentCashFlow.currentBalance + projectedNetDaily * safeDays;

    // Calculate break-even (days until balance reaches 0 if negative trajectory)
    let breakEvenDays: number | null = null;
    if (projectedNetDaily < 0 && currentCashFlow.currentBalance > 0) {
      breakEvenDays = Math.ceil(
        currentCashFlow.currentBalance / Math.abs(projectedNetDaily)
      );
    }

    return {
      projectedDays: safeDays,
      dailyBurnRate,
      dailyRevenueRate,
      projectedBalance,
      projectedNetDaily,
      breakEvenDays,
      asOf: new Date().toISOString(),
    };
  }

  /**
   * Calculate week-over-week and month-over-month revenue growth rates.
   */
  async getRevenueGrowthRate(env: Env): Promise<GrowthRate> {
    const now = new Date();

    // Current week (Mon-Sun)
    const dayOfWeek = now.getDay();
    const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const currentWeekStart = new Date(now);
    currentWeekStart.setDate(now.getDate() - mondayOffset);
    currentWeekStart.setHours(0, 0, 0, 0);

    const previousWeekStart = new Date(currentWeekStart);
    previousWeekStart.setDate(previousWeekStart.getDate() - 7);

    // Current month
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const previousMonthStart = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1
    );

    let currentWeekRevenue = 0;
    let previousWeekRevenue = 0;
    let currentMonthRevenue = 0;
    let previousMonthRevenue = 0;

    try {
      const results = await env.DB.batch([
        env.DB.prepare(
          `SELECT COALESCE(SUM(amount), 0) as total FROM ${TRANSACTIONS_TABLE}
           WHERE type = 'REVENUE' AND created_at >= ?1 AND created_at < ?2`
        ).bind(currentWeekStart.toISOString(), now.toISOString()),
        env.DB.prepare(
          `SELECT COALESCE(SUM(amount), 0) as total FROM ${TRANSACTIONS_TABLE}
           WHERE type = 'REVENUE' AND created_at >= ?1 AND created_at < ?2`
        ).bind(
          previousWeekStart.toISOString(),
          currentWeekStart.toISOString()
        ),
        env.DB.prepare(
          `SELECT COALESCE(SUM(amount), 0) as total FROM ${TRANSACTIONS_TABLE}
           WHERE type = 'REVENUE' AND created_at >= ?1 AND created_at < ?2`
        ).bind(currentMonthStart.toISOString(), now.toISOString()),
        env.DB.prepare(
          `SELECT COALESCE(SUM(amount), 0) as total FROM ${TRANSACTIONS_TABLE}
           WHERE type = 'REVENUE' AND created_at >= ?1 AND created_at < ?2`
        ).bind(
          previousMonthStart.toISOString(),
          currentMonthStart.toISOString()
        ),
      ]);

      currentWeekRevenue =
        (results[0]?.results?.[0] as { total: number } | undefined)?.total ?? 0;
      previousWeekRevenue =
        (results[1]?.results?.[0] as { total: number } | undefined)?.total ?? 0;
      currentMonthRevenue =
        (results[2]?.results?.[0] as { total: number } | undefined)?.total ?? 0;
      previousMonthRevenue =
        (results[3]?.results?.[0] as { total: number } | undefined)?.total ?? 0;
    } catch {
      // Table may not exist
    }

    const weekOverWeek =
      previousWeekRevenue > 0
        ? ((currentWeekRevenue - previousWeekRevenue) / previousWeekRevenue) *
          100
        : null;

    const monthOverMonth =
      previousMonthRevenue > 0
        ? ((currentMonthRevenue - previousMonthRevenue) /
            previousMonthRevenue) *
          100
        : null;

    return {
      weekOverWeek,
      monthOverMonth,
      currentWeekRevenue,
      previousWeekRevenue,
      currentMonthRevenue,
      previousMonthRevenue,
      asOf: new Date().toISOString(),
    };
  }

  /**
   * Calculate average transaction values by type.
   */
  async getAverageTransactionValue(env: Env): Promise<AverageTransactionValue> {
    let averageRevenue = 0;
    let averageExpense = 0;
    let totalTransactions = 0;

    try {
      const result = await env.DB.prepare(
        `SELECT type, AVG(amount) as avg_amount, COUNT(*) as cnt
         FROM ${TRANSACTIONS_TABLE}
         WHERE type IN ('REVENUE', 'EXPENSE')
         GROUP BY type`
      ).all<{ type: string; avg_amount: number; cnt: number }>();

      if (result.success && result.results) {
        for (const row of result.results) {
          totalTransactions += row.cnt;
          if (row.type === "REVENUE") averageRevenue = Math.round(row.avg_amount);
          if (row.type === "EXPENSE") averageExpense = Math.round(row.avg_amount);
        }
      }
    } catch {
      // Table may not exist
    }

    return {
      averageRevenue,
      averageExpense,
      totalTransactions,
      asOf: new Date().toISOString(),
    };
  }
}

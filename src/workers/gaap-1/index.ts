/**
 * GAAP-1 — Financial Statement Generator Worker for CLARIDEX.
 *
 * Generates GAAP-aligned financial statements from FISCARA transaction data.
 * Income Statement, Balance Sheet, and Cash Flow Statement — the three
 * pillars of financial disclosure that make Vernen auditable.
 */

import type { Env } from "../../index.js";
import { generateId ,safeKvPut} from "../../utils/helpers.js";
import { StatementType } from "./types.js";
import type {
  IncomeStatement,
  BalanceSheet,
  CashFlowStatement,
  FinancialStatementRow,
  LineItem,
  DisclosureStatus,
  AuditReadiness,
} from "./types.js";

const KV_PREFIX = "CLARIDEX:gaap:";

export class Gaap1Worker {
  /**
   * Generate an income statement for a given period.
   * Pulls revenue and expense data from FISCARA's financial_transactions table.
   */
  async generateIncomeStatement(
    period: string,
    env: Env
  ): Promise<IncomeStatement> {
    const now = new Date().toISOString();
    const dateFilter = this._getDateFilter(period);

    // Revenue by category
    const revenueItems: LineItem[] = [];
    let totalRevenue = 0;

    try {
      const result = await env.DB.prepare(
        `SELECT category, SUM(amount) as total FROM financial_transactions
         WHERE type = 'REVENUE' ${dateFilter}
         GROUP BY category ORDER BY total DESC`
      ).all<{ category: string; total: number }>();

      if (result.success && result.results) {
        for (const row of result.results) {
          revenueItems.push({ name: row.category, amount: row.total });
          totalRevenue += row.total;
        }
      }
    } catch {
      // Table may not exist
    }

    // If no categorized revenue, get total
    if (revenueItems.length === 0) {
      try {
        const total = await env.DB.prepare(
          `SELECT COALESCE(SUM(amount), 0) as total FROM financial_transactions
           WHERE type = 'REVENUE' ${dateFilter}`
        ).first<{ total: number }>();
        totalRevenue = total?.total ?? 0;
        if (totalRevenue > 0) {
          revenueItems.push({ name: "Service Revenue", amount: totalRevenue });
        }
      } catch { /* Table may not exist */ }
    }

    // Cost of revenue (infrastructure, hosting)
    const costOfRevenue: LineItem[] = [];
    let totalCostOfRevenue = 0;

    try {
      const result = await env.DB.prepare(
        `SELECT category, SUM(amount) as total FROM financial_transactions
         WHERE type = 'EXPENSE' AND category IN ('INFRASTRUCTURE', 'HOSTING', 'CLOUD')
         ${dateFilter}
         GROUP BY category`
      ).all<{ category: string; total: number }>();

      if (result.success && result.results) {
        for (const row of result.results) {
          costOfRevenue.push({ name: row.category, amount: row.total });
          totalCostOfRevenue += row.total;
        }
      }
    } catch { /* Table may not exist */ }

    const grossProfit = totalRevenue - totalCostOfRevenue;

    // Operating expenses
    const operatingExpenses: LineItem[] = [];
    let totalOperatingExpenses = 0;

    try {
      const result = await env.DB.prepare(
        `SELECT category, SUM(amount) as total FROM financial_transactions
         WHERE type = 'EXPENSE' AND category NOT IN ('INFRASTRUCTURE', 'HOSTING', 'CLOUD')
         ${dateFilter}
         GROUP BY category ORDER BY total DESC`
      ).all<{ category: string; total: number }>();

      if (result.success && result.results) {
        for (const row of result.results) {
          operatingExpenses.push({ name: row.category, amount: row.total });
          totalOperatingExpenses += row.total;
        }
      }
    } catch { /* Table may not exist */ }

    const operatingIncome = grossProfit - totalOperatingExpenses;
    const netIncome = operatingIncome; // No other income/expense for now

    const statement: IncomeStatement = {
      period,
      revenue: revenueItems,
      totalRevenue,
      costOfRevenue,
      totalCostOfRevenue,
      grossProfit,
      operatingExpenses,
      totalOperatingExpenses,
      operatingIncome,
      otherIncome: 0,
      netIncome,
      generatedAt: now,
    };

    // Persist
    await this._saveStatement(StatementType.INCOME, period, statement, env);

    return statement;
  }

  /**
   * Generate a balance sheet as of the current date.
   */
  async generateBalanceSheet(env: Env): Promise<BalanceSheet> {
    const now = new Date().toISOString();

    // Assets: Cash is total revenue minus total expenses
    let totalCash = 0;
    try {
      const result = await env.DB.prepare(
        `SELECT
          COALESCE((SELECT SUM(amount) FROM financial_transactions WHERE type = 'REVENUE'), 0) -
          COALESCE((SELECT SUM(amount) FROM financial_transactions WHERE type = 'EXPENSE'), 0) as cash`
      ).first<{ cash: number }>();
      totalCash = Math.max(0, result?.cash ?? 0);
    } catch { /* Table may not exist */ }

    // Accounts receivable estimate (pending payments)
    let accountsReceivable = 0;
    try {
      const pending = await env.DB.prepare(
        `SELECT COALESCE(SUM(amount), 0) as total FROM financial_transactions
         WHERE type = 'REVENUE' AND status = 'PENDING'`
      ).first<{ total: number }>();
      accountsReceivable = pending?.total ?? 0;
    } catch { /* Table may not exist */ }

    const currentAssets: LineItem[] = [
      { name: "Cash and Cash Equivalents", amount: totalCash },
      { name: "Accounts Receivable", amount: accountsReceivable },
    ];
    const totalCurrentAssets = totalCash + accountsReceivable;

    const nonCurrentAssets: LineItem[] = [
      { name: "Intellectual Property (Persona Citizens)", amount: 0 }, // Not yet valued
      { name: "Software Development Costs", amount: 0 },
    ];
    const totalNonCurrentAssets = 0;

    // Liabilities
    const currentLiabilities: LineItem[] = [
      { name: "Accounts Payable", amount: 0 },
      { name: "Accrued Expenses", amount: 0 },
    ];

    const nonCurrentLiabilities: LineItem[] = [];

    // Equity
    const totalAssets = totalCurrentAssets + totalNonCurrentAssets;
    const totalLiabilitiesAmount = 0;
    const totalEquity = totalAssets - totalLiabilitiesAmount;

    const equityItems: LineItem[] = [
      { name: "Founder's Equity", amount: totalEquity },
      { name: "Retained Earnings", amount: 0 },
    ];

    const balanceSheet: BalanceSheet = {
      asOfDate: now,
      assets: {
        current: currentAssets,
        totalCurrent: totalCurrentAssets,
        nonCurrent: nonCurrentAssets,
        totalNonCurrent: totalNonCurrentAssets,
        totalAssets,
      },
      liabilities: {
        current: currentLiabilities,
        totalCurrent: 0,
        nonCurrent: nonCurrentLiabilities,
        totalNonCurrent: 0,
        totalLiabilities: totalLiabilitiesAmount,
      },
      equity: {
        items: equityItems,
        totalEquity,
      },
      generatedAt: now,
    };

    await this._saveStatement(StatementType.BALANCE_SHEET, "current", balanceSheet, env);

    return balanceSheet;
  }

  /**
   * Generate a cash flow statement for a given period.
   */
  async generateCashFlowStatement(
    period: string,
    env: Env
  ): Promise<CashFlowStatement> {
    const now = new Date().toISOString();
    const dateFilter = this._getDateFilter(period);

    // Operating activities
    let revenueReceived = 0;
    let expensesPaid = 0;

    try {
      const rev = await env.DB.prepare(
        `SELECT COALESCE(SUM(amount), 0) as total FROM financial_transactions
         WHERE type = 'REVENUE' ${dateFilter}`
      ).first<{ total: number }>();
      revenueReceived = rev?.total ?? 0;

      const exp = await env.DB.prepare(
        `SELECT COALESCE(SUM(amount), 0) as total FROM financial_transactions
         WHERE type = 'EXPENSE' ${dateFilter}`
      ).first<{ total: number }>();
      expensesPaid = exp?.total ?? 0;
    } catch { /* Table may not exist */ }

    const operating: LineItem[] = [
      { name: "Cash Received from Customers", amount: revenueReceived },
      { name: "Cash Paid for Operating Expenses", amount: -expensesPaid },
    ];
    const totalOperating = revenueReceived - expensesPaid;

    // Investing activities (none yet)
    const investing: LineItem[] = [
      { name: "Software Development Investment", amount: 0 },
    ];
    const totalInvesting = 0;

    // Financing activities (none yet)
    const financing: LineItem[] = [
      { name: "Equity Contributions", amount: 0 },
    ];
    const totalFinancing = 0;

    const netCashFlow = totalOperating + totalInvesting + totalFinancing;

    // Beginning cash
    let beginningCash = 0;
    try {
      const total = await env.DB.prepare(
        `SELECT
          COALESCE((SELECT SUM(amount) FROM financial_transactions WHERE type = 'REVENUE' AND created_at < date('now', 'start of month')), 0) -
          COALESCE((SELECT SUM(amount) FROM financial_transactions WHERE type = 'EXPENSE' AND created_at < date('now', 'start of month')), 0) as cash`
      ).first<{ cash: number }>();
      beginningCash = Math.max(0, total?.cash ?? 0);
    } catch { /* Table may not exist */ }

    const statement: CashFlowStatement = {
      period,
      operating,
      totalOperating,
      investing,
      totalInvesting,
      financing,
      totalFinancing,
      netCashFlow,
      beginningCash,
      endingCash: beginningCash + netCashFlow,
      generatedAt: now,
    };

    await this._saveStatement(StatementType.CASH_FLOW, period, statement, env);

    return statement;
  }

  /**
   * Get disclosure status — are all required statements current?
   */
  async getDisclosureStatus(env: Env): Promise<DisclosureStatus> {
    const now = new Date().toISOString();
    let lastIncome: string | null = null;
    let lastBalance: string | null = null;
    let lastCashFlow: string | null = null;
    let totalStatements = 0;

    try {
      const income = await env.DB.prepare(
        `SELECT generated_at FROM financial_statements
         WHERE statement_type = 'INCOME' ORDER BY generated_at DESC LIMIT 1`
      ).first<{ generated_at: string }>();
      lastIncome = income?.generated_at ?? null;

      const balance = await env.DB.prepare(
        `SELECT generated_at FROM financial_statements
         WHERE statement_type = 'BALANCE_SHEET' ORDER BY generated_at DESC LIMIT 1`
      ).first<{ generated_at: string }>();
      lastBalance = balance?.generated_at ?? null;

      const cashFlow = await env.DB.prepare(
        `SELECT generated_at FROM financial_statements
         WHERE statement_type = 'CASH_FLOW' ORDER BY generated_at DESC LIMIT 1`
      ).first<{ generated_at: string }>();
      lastCashFlow = cashFlow?.generated_at ?? null;

      const total = await env.DB.prepare(
        `SELECT COUNT(*) as cnt FROM financial_statements`
      ).first<{ cnt: number }>();
      totalStatements = total?.cnt ?? 0;
    } catch {
      // Table may not exist
    }

    const gaps: string[] = [];
    if (!lastIncome) gaps.push("No income statement generated");
    if (!lastBalance) gaps.push("No balance sheet generated");
    if (!lastCashFlow) gaps.push("No cash flow statement generated");

    return {
      lastIncomeStatement: lastIncome,
      lastBalanceSheet: lastBalance,
      lastCashFlow,
      totalStatements,
      disclosureGaps: gaps,
      compliant: gaps.length === 0,
      assessedAt: now,
    };
  }

  /**
   * Assess readiness for external audit.
   */
  async getAuditReadiness(env: Env): Promise<AuditReadiness> {
    const now = new Date().toISOString();
    const disclosure = await this.getDisclosureStatus(env);

    const dimensions = [
      {
        name: "Income Statement",
        ready: disclosure.lastIncomeStatement !== null,
        notes: disclosure.lastIncomeStatement
          ? `Last generated: ${disclosure.lastIncomeStatement}`
          : "Not yet generated",
      },
      {
        name: "Balance Sheet",
        ready: disclosure.lastBalanceSheet !== null,
        notes: disclosure.lastBalanceSheet
          ? `Last generated: ${disclosure.lastBalanceSheet}`
          : "Not yet generated",
      },
      {
        name: "Cash Flow Statement",
        ready: disclosure.lastCashFlow !== null,
        notes: disclosure.lastCashFlow
          ? `Last generated: ${disclosure.lastCashFlow}`
          : "Not yet generated",
      },
      {
        name: "Transaction Records",
        ready: true,
        notes: "All transactions tracked in FISCARA's ledger",
      },
      {
        name: "Internal Controls",
        ready: true,
        notes: "INTEGRA + SENTINEL-0 provide continuous audit coverage",
      },
    ];

    const readyCount = dimensions.filter((d) => d.ready).length;
    const score = Math.round((readyCount / dimensions.length) * 100);

    const missingDocuments: string[] = [];
    if (!disclosure.lastIncomeStatement) missingDocuments.push("Income Statement");
    if (!disclosure.lastBalanceSheet) missingDocuments.push("Balance Sheet");
    if (!disclosure.lastCashFlow) missingDocuments.push("Cash Flow Statement");

    const recommendations = [
      "Generate all three financial statements monthly",
      "Reconcile FISCARA ledger with Stripe payment records",
      "Document revenue recognition policies",
      "Maintain audit trail for all financial adjustments",
    ];

    return { score, dimensions, missingDocuments, recommendations, assessedAt: now };
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  private _getDateFilter(period: string): string {
    switch (period) {
      case "day":
        return "AND created_at >= date('now', 'start of day')";
      case "week":
        return "AND created_at >= date('now', '-7 days')";
      case "month":
        return "AND created_at >= date('now', 'start of month')";
      case "quarter":
        return "AND created_at >= date('now', '-3 months')";
      case "year":
        return "AND created_at >= date('now', 'start of year')";
      default:
        return ""; // 'all' — no filter
    }
  }

  private async _saveStatement(
    type: StatementType,
    period: string,
    data: unknown,
    env: Env
  ): Promise<void> {
    const id = generateId("stmt");
    const now = new Date().toISOString();

    try {
      await env.DB.prepare(
        `INSERT INTO financial_statements (id, statement_type, period, data, generated_at)
         VALUES (?1, ?2, ?3, ?4, ?5)`
      )
        .bind(id, type, period, JSON.stringify(data), now)
        .run();
    } catch {
      // Fallback to KV
      await safeKvPut(env.KNOWLEDGE_STORE, 
        `${KV_PREFIX}statement:${type}:${id}`,
        JSON.stringify({ id, statementType: type, period, data, generatedAt: now })
      );
    }
  }
}

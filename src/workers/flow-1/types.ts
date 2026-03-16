/**
 * FLOW-1 Types — Cash flow intelligence types for FISCARA.
 */

export interface CashFlowSnapshot {
  currentBalance: number;
  totalRevenue: number;
  totalExpenses: number;
  netCashFlow: number;
  asOf: string;
}

export interface CashFlowProjection {
  projectedDays: number;
  dailyBurnRate: number;
  dailyRevenueRate: number;
  projectedBalance: number;
  projectedNetDaily: number;
  breakEvenDays: number | null;
  asOf: string;
}

export interface GrowthRate {
  weekOverWeek: number | null;
  monthOverMonth: number | null;
  currentWeekRevenue: number;
  previousWeekRevenue: number;
  currentMonthRevenue: number;
  previousMonthRevenue: number;
  asOf: string;
}

export interface AverageTransactionValue {
  averageRevenue: number;
  averageExpense: number;
  totalTransactions: number;
  asOf: string;
}

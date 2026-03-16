/**
 * GAAP-1 Types — Financial statement types for CLARIDEX.
 */

export enum StatementType {
  INCOME = "INCOME",
  BALANCE_SHEET = "BALANCE_SHEET",
  CASH_FLOW = "CASH_FLOW",
}

export interface FinancialStatement {
  id: string;
  statementType: StatementType;
  period: string;
  data: IncomeStatement | BalanceSheet | CashFlowStatement;
  generatedAt: string;
}

export interface FinancialStatementRow {
  id: string;
  statement_type: string;
  period: string;
  data: string;
  generated_at: string;
}

export interface IncomeStatement {
  period: string;
  revenue: LineItem[];
  totalRevenue: number;
  costOfRevenue: LineItem[];
  totalCostOfRevenue: number;
  grossProfit: number;
  operatingExpenses: LineItem[];
  totalOperatingExpenses: number;
  operatingIncome: number;
  otherIncome: number;
  netIncome: number;
  generatedAt: string;
}

export interface BalanceSheet {
  asOfDate: string;
  assets: {
    current: LineItem[];
    totalCurrent: number;
    nonCurrent: LineItem[];
    totalNonCurrent: number;
    totalAssets: number;
  };
  liabilities: {
    current: LineItem[];
    totalCurrent: number;
    nonCurrent: LineItem[];
    totalNonCurrent: number;
    totalLiabilities: number;
  };
  equity: {
    items: LineItem[];
    totalEquity: number;
  };
  generatedAt: string;
}

export interface CashFlowStatement {
  period: string;
  operating: LineItem[];
  totalOperating: number;
  investing: LineItem[];
  totalInvesting: number;
  financing: LineItem[];
  totalFinancing: number;
  netCashFlow: number;
  beginningCash: number;
  endingCash: number;
  generatedAt: string;
}

export interface LineItem {
  name: string;
  amount: number;
}

export interface DisclosureStatus {
  lastIncomeStatement: string | null;
  lastBalanceSheet: string | null;
  lastCashFlow: string | null;
  totalStatements: number;
  disclosureGaps: string[];
  compliant: boolean;
  assessedAt: string;
}

export interface AuditReadiness {
  score: number;
  dimensions: Array<{ name: string; ready: boolean; notes: string }>;
  missingDocuments: string[];
  recommendations: string[];
  assessedAt: string;
}

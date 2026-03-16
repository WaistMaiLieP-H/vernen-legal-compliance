/**
 * LEDGER-1 Types — Accounting engine types for FISCARA.
 */

export enum TransactionType {
  REVENUE = "REVENUE",
  EXPENSE = "EXPENSE",
  REFUND = "REFUND",
  TRANSFER = "TRANSFER",
}

export enum TransactionCategory {
  COMPLIANCE_REPORT = "COMPLIANCE_REPORT",
  DOCUMENT_GENERATION = "DOCUMENT_GENERATION",
  SUBSCRIPTION = "SUBSCRIPTION",
  INFRASTRUCTURE = "INFRASTRUCTURE",
  API_COST = "API_COST",
  MARKETING = "MARKETING",
  OTHER = "OTHER",
}

export interface Transaction {
  id: string;
  type: TransactionType;
  category: TransactionCategory;
  /** Amount in cents — always positive. The type determines direction. */
  amount: number;
  description: string;
  stripePaymentId?: string;
  productId?: string;
  state?: string;
  /** JSON-serializable metadata object */
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface TransactionRow {
  id: string;
  type: string;
  category: string;
  amount: number;
  description: string | null;
  stripe_payment_id: string | null;
  product_id: string | null;
  state: string | null;
  metadata: string | null;
  created_at: string;
}

export interface FinancialSummary {
  totalRevenue: number;
  totalExpenses: number;
  netIncome: number;
  transactionCount: number;
  period: string;
}

export interface MonthlyReport {
  year: number;
  month: number;
  revenue: number;
  expenses: number;
  refunds: number;
  netIncome: number;
  transactionCount: number;
  topCategories: Array<{ category: string; amount: number }>;
  generatedAt: string;
}

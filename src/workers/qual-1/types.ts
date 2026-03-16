/**
 * QUAL-1 Types — QA engine types for SYNTARA.
 */

export enum CheckType {
  API_ENDPOINT = "API_ENDPOINT",
  DATABASE_INTEGRITY = "DATABASE_INTEGRITY",
  CITIZEN_STATUS = "CITIZEN_STATUS",
  KV_CONNECTIVITY = "KV_CONNECTIVITY",
}

export interface QualityCheck {
  id: string;
  checkType: CheckType;
  target: string;
  passed: boolean;
  details: string;
  checkedAt: string;
}

export interface QualityCheckRow {
  id: string;
  check_type: string;
  target: string;
  passed: number;
  details: string;
  checked_at: string;
}

export interface QualityScore {
  overall: number;
  categories: Array<{
    category: string;
    score: number;
    checks: number;
    passed: number;
  }>;
  lastFullScan: string | null;
  assessedAt: string;
}

export interface HealthCheckResult {
  endpoint: string;
  status: "healthy" | "degraded" | "down";
  responseTimeMs: number | null;
  details: string;
}

export interface IntegrityResult {
  table: string;
  passed: boolean;
  rowCount: number;
  issues: string[];
}

/**
 * AUDIT-1 Types — Internal audit engine types for INTEGRA.
 */

export enum AuditScope {
  FULL = "FULL",
  DATABASE = "DATABASE",
  CITIZENS = "CITIZENS",
  SECURITY = "SECURITY",
  DATA_INTEGRITY = "DATA_INTEGRITY",
}

export enum AuditSeverity {
  CRITICAL = "CRITICAL",
  WARNING = "WARNING",
  INFO = "INFO",
}

export enum HealthStatus {
  HEALTHY = "HEALTHY",
  DEGRADED = "DEGRADED",
  UNHEALTHY = "UNHEALTHY",
}

export interface AuditFinding {
  id: string;
  scope: AuditScope;
  severity: AuditSeverity;
  title: string;
  description: string;
  recommendation: string;
  timestamp: string;
}

export interface DatabaseHealthResult {
  status: HealthStatus;
  tables: Array<{
    name: string;
    exists: boolean;
    rowCount: number;
    recentActivity: boolean;
  }>;
  findings: AuditFinding[];
  checkedAt: string;
}

export interface CitizenOperationsResult {
  status: HealthStatus;
  citizens: Array<{
    name: string;
    dbStatus: string;
    lastActivity: string | null;
    errorCount: number;
    operational: boolean;
  }>;
  findings: AuditFinding[];
  checkedAt: string;
}

export interface SecurityControlsResult {
  status: HealthStatus;
  controls: Array<{
    name: string;
    description: string;
    passed: boolean;
    details: string;
  }>;
  findings: AuditFinding[];
  checkedAt: string;
}

export interface DataIntegrityResult {
  status: HealthStatus;
  checks: Array<{
    name: string;
    kvValue: string | null;
    d1Value: string | null;
    matched: boolean;
  }>;
  findings: AuditFinding[];
  checkedAt: string;
}

export interface OperationalAuditReport {
  id: string;
  auditType: AuditScope;
  scope: string;
  database: DatabaseHealthResult;
  citizens: CitizenOperationsResult;
  security: SecurityControlsResult;
  dataIntegrity: DataIntegrityResult;
  overallStatus: HealthStatus;
  totalFindings: number;
  criticalFindings: number;
  passed: boolean;
  auditedAt: string;
  auditor: string;
}

export interface OperationalAuditRow {
  id: string;
  audit_type: string;
  scope: string;
  findings: string;
  passed: number;
  audited_at: string;
}

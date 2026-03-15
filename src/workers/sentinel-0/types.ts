/**
 * Issue severity levels matching the build system specification.
 * S0 = informational, S4 = critical/blocking.
 */
export enum IssueSeverity {
  S0 = "S0",
  S1 = "S1",
  S2 = "S2",
  S3 = "S3",
  S4 = "S4",
}

export interface AuditResult {
  id: string;
  taskId: string;
  passed: boolean;
  issues: AuditIssue[];
  auditedAt: string;
  auditor: string;
}

export interface AuditIssue {
  id: string;
  severity: IssueSeverity;
  title: string;
  description: string;
  recommendation: string;
  resolved: boolean;
}

export interface ComplianceGateStatus {
  gateId: string;
  name: string;
  ready: boolean;
  blockers: string[];
  checkedAt: string;
}

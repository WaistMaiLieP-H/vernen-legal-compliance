/**
 * SENTINEL-0 Audit System Types
 *
 * Comprehensive type definitions for the autonomous auditor worker.
 * These types model the full audit lifecycle: issue tracking, gate decisions,
 * compliance reporting, and adaptive scheduling.
 */

// ── Issue Severity ─────────────────────────────────────────────

/**
 * Issue severity levels matching the build system specification.
 * S0 = HALT (critical safety/integrity), S1 = blocking, S2 = significant,
 * S3 = minor, S4 = informational/advisory.
 */
export enum IssueSeverity {
  S0 = "S0",
  S1 = "S1",
  S2 = "S2",
  S3 = "S3",
  S4 = "S4",
}

/**
 * Numeric weight for each severity level.
 * Used by the adaptive scheduler to calculate risk scores.
 */
export const SEVERITY_WEIGHT: Record<IssueSeverity, number> = {
  [IssueSeverity.S0]: 1000,
  [IssueSeverity.S1]: 100,
  [IssueSeverity.S2]: 25,
  [IssueSeverity.S3]: 5,
  [IssueSeverity.S4]: 1,
};

// ── Audit Enums ────────────────────────────────────────────────

export enum AuditType {
  GATE = "GATE",
  PHASE = "PHASE",
  CONTINUOUS = "CONTINUOUS",
  SPOT_CHECK = "SPOT_CHECK",
}

export enum AuditStatus {
  IN_PROGRESS = "IN_PROGRESS",
  PASSED = "PASSED",
  FAILED = "FAILED",
  BLOCKED = "BLOCKED",
}

// ── Audit Issue ────────────────────────────────────────────────

export interface AuditIssue {
  id: string;
  severity: IssueSeverity;
  title: string;
  description: string;
  recommendation: string;
  category: string;
  citizenAffected?: string;
  resolved: boolean;
  resolvedAt?: string;
  resolvedBy?: string;
  createdAt: string;
}

// ── Checklist ──────────────────────────────────────────────────

export interface ChecklistItem {
  id: string;
  description: string;
  status: "PASS" | "FAIL" | "SKIP" | "PENDING";
  checkedAt?: string;
  note?: string;
}

// ── Audit Result ───────────────────────────────────────────────

export interface AuditResult {
  id: string;
  gateId?: string;
  taskId?: string;
  auditType: AuditType;
  phase?: string;
  milestone?: string;
  status: AuditStatus;
  issues: AuditIssue[];
  passed: boolean;
  checklist: ChecklistItem[];
  auditedAt: string;
  auditor: "SENTINEL-0";
}

// ── Gate Decision ──────────────────────────────────────────────

export type GateDecisionOutcome =
  | "APPROVED"
  | "APPROVED_WITH_CONDITIONS"
  | "BLOCKED"
  | "HALTED";

export interface GateDecision {
  gateId: string;
  decision: GateDecisionOutcome;
  conditions: string[];
  founderSignoff: boolean;
  decidedAt: string;
}

// ── Compliance Gate Status ─────────────────────────────────────

export interface IssuesSummary {
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  total: number;
}

export interface ComplianceGateStatus {
  gateId: string;
  name: string;
  ready: boolean;
  blockers: string[];
  issuesSummary: IssuesSummary;
  recommendation: GateDecisionOutcome;
  checkedAt: string;
}

// ── Adaptive Schedule ──────────────────────────────────────────

export type AuditFrequency = "STANDARD" | "2X" | "3X";
export type GateInterval = "STANDARD" | "COMPRESSED_25" | "COMPRESSED_50";

export interface ScheduleAdjustment {
  id: string;
  trigger: string;
  previousScope: number;
  newScope: number;
  previousFrequency: AuditFrequency;
  newFrequency: AuditFrequency;
  reason: string;
  createdAt: string;
}

export interface AdaptiveScheduleState {
  currentScope: number; // 0-125 (can expand above 100 for clean cycles)
  auditFrequency: AuditFrequency;
  gateInterval: GateInterval;
  consecutiveCleanCycles: number;
  lastAdjustment?: ScheduleAdjustment;
  halted: boolean;
  haltReason?: string;
}

// ── Citizen Evolution ──────────────────────────────────────────

export interface CitizenEvolutionEntry {
  citizenId: string;
  name: string;
  currentPhase: string;
  status: string;
  issuesOpen: number;
  issuesClosed: number;
  lastAuditedAt?: string;
  lastAuditPassed?: boolean;
}

// ── KV Key Constants ───────────────────────────────────────────

export const SENTINEL_KV_KEYS = {
  SCHEDULE_STATE: "sentinel:schedule",
  LAST_AUDIT: "sentinel:lastAudit",
  ISSUE_PREFIX: "sentinel:issue:",
  AUDIT_PREFIX: "sentinel:audit:",
  GATE_PREFIX: "sentinel:gate:",
} as const;

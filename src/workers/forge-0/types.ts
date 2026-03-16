/**
 * FORGE-0 Build System Types
 *
 * Comprehensive type definitions for the autonomous build worker.
 * These types model the full lifecycle of build phases, gates,
 * tasks, and audit logging.
 */

// ── Build Phases ────────────────────────────────────────────────

export enum BuildPhase {
  FOUNDATION = "FOUNDATION",
  FIRST_REVENUE = "FIRST_REVENUE",
  CORE_CITIZENS = "CORE_CITIZENS",
  FULL_PLATFORM = "FULL_PLATFORM",
  AUTONOMOUS = "AUTONOMOUS",
}

/**
 * Ordered progression of build phases. Used to validate
 * that phase transitions only move forward.
 */
export const BUILD_PHASE_ORDER: readonly BuildPhase[] = [
  BuildPhase.FOUNDATION,
  BuildPhase.FIRST_REVENUE,
  BuildPhase.CORE_CITIZENS,
  BuildPhase.FULL_PLATFORM,
  BuildPhase.AUTONOMOUS,
] as const;

// ── Build Gates ─────────────────────────────────────────────────

export type GateStatus = "PENDING" | "PASSED" | "BLOCKED";

export interface GateChecklistItem {
  id: string;
  description: string;
  completed: boolean;
  completedAt?: string;
}

export interface SentinelReport {
  reportId: string;
  taskId: string;
  outcome: "APPROVED" | "REJECTED" | "NEEDS_REVIEW";
  findings: string[];
  issuedAt: string;
}

export interface BuildGate {
  id: string;
  phase: BuildPhase;
  milestone: string;
  status: GateStatus;
  checklist: GateChecklistItem[];
  sentinelReport?: SentinelReport;
  founderApproval: boolean;
  founderApprovedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ── Build Tasks ─────────────────────────────────────────────────

export enum BuildTaskStatus {
  QUEUED = "QUEUED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  BLOCKED = "BLOCKED",
}

// Keep the old enum around as an alias so nothing breaks
export const BuildStatus = BuildTaskStatus;

export interface BuildTask {
  id: string;
  name: string;
  description: string;
  phase: BuildPhase;
  milestone: string;
  status: BuildTaskStatus;
  priority: number;
  assignedWorker: string;
  dependencies: string[];
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  output?: string;
  errors?: string[];
}

// ── Build Logging ───────────────────────────────────────────────

export type BuildOutcome = "SUCCESS" | "FAILURE" | "PARTIAL" | "SKIPPED";

export interface BuildLogEntry {
  id: string;
  taskId: string;
  action: string;
  description: string;
  outcome: BuildOutcome;
  details: string; // JSON string for structured data
  durationMs: number;
  createdAt: string;
}

export interface BuildLog {
  taskId: string;
  entries: BuildLogEntry[];
  startedAt: string;
  completedAt?: string;
}

// ── Milestone Status ────────────────────────────────────────────

export interface MilestoneStatus {
  id: string;
  name: string;
  phase: BuildPhase;
  tasks: BuildTask[];
  gate: BuildGate;
  startedAt?: string;
  completedAt?: string;
  percentComplete: number;
}

// ── KV Key Constants ────────────────────────────────────────────

export const KV_KEYS = {
  CURRENT_PHASE: "forge:currentPhase",
  TASK_PREFIX: "forge:task:",
  MILESTONE_PREFIX: "forge:milestone:",
  GATE_PREFIX: "forge:gate:",
  TASK_QUEUE: "forge:taskQueue",
  ACTIVE_MILESTONE: "forge:activeMilestone",
} as const;

// ── API request shapes ──────────────────────────────────────────

export interface SubmitTaskRequest {
  name: string;
  description: string;
  phase: BuildPhase;
  milestone: string;
  priority?: number;
  assignedWorker?: string;
  dependencies?: string[];
}

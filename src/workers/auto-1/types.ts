/**
 * AUTO-1 Types — Compliance automation engine types for SYNTARA.
 */

export enum WorkflowStatus {
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export enum TriggerType {
  SCHEDULED = "SCHEDULED",
  EVENT_DRIVEN = "EVENT_DRIVEN",
  MANUAL = "MANUAL",
  ON_CHANGE = "ON_CHANGE",
}

export interface AutomationWorkflow {
  id: string;
  name: string;
  triggerType: TriggerType;
  state: string;
  entityType: string;
  status: WorkflowStatus;
  createdAt: string;
}

export interface AutomationWorkflowRow {
  id: string;
  name: string;
  trigger_type: string;
  state: string;
  entity_type: string;
  status: string;
  created_at: string;
}

export interface AutomationCoverage {
  totalProcesses: number;
  automatedProcesses: number;
  coveragePercent: number;
  byCategory: Array<{
    category: string;
    automated: boolean;
    description: string;
  }>;
  assessedAt: string;
}

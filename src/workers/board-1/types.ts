/**
 * Types for BOARD-1 — the client onboarding worker.
 */

export enum OnboardingStepId {
  PROFILE_COMPLETE = "profile_complete",
  FIRST_SCAN = "first_scan",
  REVIEW_RESULTS = "review_results",
  SET_ALERTS = "set_alerts",
  INVITE_TEAM = "invite_team",
}

export enum OnboardingStepStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  SKIPPED = "SKIPPED",
}

export interface OnboardingStep {
  id: OnboardingStepId;
  label: string;
  description: string;
  status: OnboardingStepStatus;
  completedAt: string | null;
}

export interface OnboardingFlow {
  id: string;
  clientId: string;
  steps: OnboardingStep[];
  startedAt: string;
  completedAt: string | null;
}

export interface OnboardingRow {
  id: string;
  client_id: string;
  steps: string;
  started_at: string;
  completed_at: string | null;
}

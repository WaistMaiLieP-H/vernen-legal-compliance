/**
 * CODE-1 Types — Ethics code engine types for ETHICARA.
 */

export enum EthicsOutcome {
  APPROVED = "APPROVED",
  FLAGGED = "FLAGGED",
  REJECTED = "REJECTED",
}

export enum EthicsReportCategory {
  BIAS = "BIAS",
  PRIVACY_VIOLATION = "PRIVACY_VIOLATION",
  CONFLICT_OF_INTEREST = "CONFLICT_OF_INTEREST",
  TRANSPARENCY = "TRANSPARENCY",
  ACCOUNTABILITY = "ACCOUNTABILITY",
  STEWARDSHIP = "STEWARDSHIP",
  OTHER = "OTHER",
}

export enum EthicsReportStatus {
  RECEIVED = "RECEIVED",
  INVESTIGATING = "INVESTIGATING",
  RESOLVED = "RESOLVED",
  DISMISSED = "DISMISSED",
}

export interface EthicsPrinciple {
  name: string;
  description: string;
  weight: number;
}

export interface EthicsReview {
  id: string;
  decision: string;
  context: string;
  stakeholders: string;
  outcome: EthicsOutcome;
  reasoning: string;
  reviewedAt: string;
}

export interface EthicsReviewRow {
  id: string;
  decision: string;
  context: string;
  stakeholders: string;
  outcome: string;
  reasoning: string;
  reviewed_at: string;
}

export interface EthicsReport {
  id: string;
  description: string;
  category: EthicsReportCategory;
  status: EthicsReportStatus;
  submittedAt: string;
  resolvedAt: string | null;
}

export interface EthicsReportRow {
  id: string;
  description: string;
  category: string;
  status: string;
  submitted_at: string;
  resolved_at: string | null;
}

export interface CodeOfEthics {
  title: string;
  foundingPrinciple: string;
  principles: EthicsPrinciple[];
  adoptedAt: string;
  version: string;
}

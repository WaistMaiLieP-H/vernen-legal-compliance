/**
 * FAIR-1 Types — Fairness engine types for ETHICARA.
 */

export enum FairnessStatus {
  FAIR = "FAIR",
  MARGINAL = "MARGINAL",
  UNFAIR = "UNFAIR",
}

export interface FairnessCheck {
  area: string;
  status: FairnessStatus;
  description: string;
  variance: number;
  threshold: number;
}

export interface FairnessReport {
  id: string;
  overallStatus: FairnessStatus;
  checks: FairnessCheck[];
  recommendationFairness: FairnessCheck;
  pricingFairness: FairnessCheck;
  assessedAt: string;
}

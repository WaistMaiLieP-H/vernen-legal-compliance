/**
 * RISK-1 Types — Risk register types for VIGILUS.
 */

export enum RiskCategory {
  CYBER = "CYBER",
  REGULATORY = "REGULATORY",
  OPERATIONAL = "OPERATIONAL",
  FINANCIAL = "FINANCIAL",
  REPUTATIONAL = "REPUTATIONAL",
  VENDOR = "VENDOR",
  LEGAL = "LEGAL",
}

export enum RiskStatus {
  ACTIVE = "ACTIVE",
  MITIGATED = "MITIGATED",
  ACCEPTED = "ACCEPTED",
  CLOSED = "CLOSED",
}

export interface Risk {
  id: string;
  title: string;
  description: string;
  category: RiskCategory;
  probability: number; // 1-5
  impact: number;      // 1-5
  score: number;       // probability × impact, max 25
  status: RiskStatus;
  owner: string | null;
  mitigationPlan: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RiskRow {
  id: string;
  title: string;
  description: string;
  category: string;
  probability: number;
  impact: number;
  score: number;
  status: string;
  owner: string | null;
  mitigation_plan: string | null;
  created_at: string;
  updated_at: string;
}

export interface RiskInput {
  title: string;
  description: string;
  category: RiskCategory;
  probability: number;
  impact: number;
  owner?: string;
  mitigationPlan?: string;
}

/** Quadrant label for the heat map. */
export type HeatMapQuadrant =
  | "LOW_PROBABILITY_LOW_IMPACT"
  | "LOW_PROBABILITY_HIGH_IMPACT"
  | "HIGH_PROBABILITY_LOW_IMPACT"
  | "HIGH_PROBABILITY_HIGH_IMPACT";

export interface RiskHeatMap {
  quadrants: Record<HeatMapQuadrant, Risk[]>;
  totalRisks: number;
  generatedAt: string;
}

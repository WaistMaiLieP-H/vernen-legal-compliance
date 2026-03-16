/**
 * ALLY-1 Types — Partnership evaluation types for NEXARIS.
 */

export enum PartnershipStatus {
  PROSPECT = "PROSPECT",
  EVALUATING = "EVALUATING",
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  TERMINATED = "TERMINATED",
}

export interface Partnership {
  id: string;
  partnerName: string;
  industry: string;
  status: PartnershipStatus;
  score: number;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PartnershipRow {
  id: string;
  partner_name: string;
  industry: string;
  status: string;
  score: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface PartnerEvaluation {
  partnerName: string;
  industry: string;
  overallScore: number;
  dimensions: Array<{ name: string; score: number; weight: number; notes: string }>;
  recommendation: string;
  risks: string[];
  synergies: string[];
  evaluatedAt: string;
}

export interface PartnershipROI {
  totalPartnerships: number;
  activePartnerships: number;
  avgPartnerScore: number;
  topPartner: string | null;
  industryBreakdown: Array<{ industry: string; count: number }>;
  generatedAt: string;
}

export interface ReputationScore {
  overallScore: number;
  dimensions: Array<{ name: string; score: number; trend: string }>;
  partnerSatisfaction: number;
  brandStrength: number;
  marketPresence: number;
  assessedAt: string;
}

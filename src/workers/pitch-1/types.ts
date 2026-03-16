/**
 * PITCH-1 Types — Investor narrative and capital strategy types for VESTARA.
 */

export interface InvestorMetric {
  id: string;
  metricName: string;
  metricValue: string;
  period: string;
  recordedAt: string;
}

export interface InvestorMetricRow {
  id: string;
  metric_name: string;
  metric_value: string;
  period: string;
  recorded_at: string;
}

export interface InvestorNarrative {
  thesis: string;
  keyPoints: string[];
  metrics: KeyMetrics;
  moat: string;
  stage: string;
  generatedAt: string;
}

export interface KeyMetrics {
  citizensDeployed: number;
  totalCitizens: number;
  complianceRulesCovered: number;
  statesCovered: number;
  totalRevenue: number;
  totalClients: number;
  monthlyGrowthRate: number;
  platformUptime: string;
}

export interface CapitalStrategy {
  currentStage: string;
  targetRaise: string;
  useOfFunds: Array<{ category: string; allocation: string; description: string }>;
  milestones: Array<{ milestone: string; timeline: string; status: string }>;
  readinessScore: number;
  generatedAt: string;
}

export interface InvestorReadiness {
  overallScore: number;
  dimensions: Array<{ name: string; score: number; status: string; notes: string }>;
  blockers: string[];
  nextSteps: string[];
  assessedAt: string;
}

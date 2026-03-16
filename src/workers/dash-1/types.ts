/**
 * DASH-1 Types — Performance dashboard types for METRIQA.
 */

export interface DashboardSnapshot {
  id: string;
  data: DashboardData;
  generatedAt: string;
}

export interface DashboardSnapshotRow {
  id: string;
  data: string;
  generated_at: string;
}

export interface DashboardData {
  revenue: RevenueSummary;
  clients: ClientSummary;
  compliance: ComplianceSummary;
  risk: RiskSummary;
  audit: AuditSummary;
  security: SecuritySummary;
  citizens: CitizenSummary;
  generatedAt: string;
}

export interface RevenueSummary {
  totalRevenue: number;
  monthlyRevenue: number;
  revenueGrowth: number;
  topProduct: string;
}

export interface ClientSummary {
  totalClients: number;
  activeClients: number;
  churnRate: number;
  avgSatisfaction: number;
}

export interface ComplianceSummary {
  totalRulesCovered: number;
  statesCovered: number;
  checksPerformed: number;
  complianceRate: number;
}

export interface RiskSummary {
  activeRisks: number;
  highestRiskScore: number;
  mitigatedRisks: number;
  threatLevel: string;
}

export interface AuditSummary {
  totalAudits: number;
  openIssues: number;
  resolvedIssues: number;
  lastAuditDate: string;
}

export interface SecuritySummary {
  securityScore: number;
  dataFlows: number;
  encryptionCoverage: number;
  lastSecurityScan: string;
}

export interface CitizenSummary {
  totalCitizens: number;
  deployedCitizens: number;
  activeCitizens: number;
  wave: number;
}

export interface GrowthMetrics {
  revenueGrowthMoM: number;
  clientGrowthMoM: number;
  complianceGrowthMoM: number;
  projectedAnnualRevenue: number;
  burnRate: number;
  runway: string;
  generatedAt: string;
}

export interface UnitEconomics {
  averageRevenuePerClient: number;
  customerAcquisitionCost: number;
  lifetimeValue: number;
  ltvCacRatio: number;
  grossMargin: number;
  paybackPeriodMonths: number;
  generatedAt: string;
}

/**
 * THRT-1 Types — Threat intelligence types for VIGILUS.
 */

export enum ThreatType {
  CYBER = "CYBER",
  REGULATORY = "REGULATORY",
  COMPETITIVE = "COMPETITIVE",
  OPERATIONAL = "OPERATIONAL",
  REPUTATIONAL = "REPUTATIONAL",
}

export enum ThreatSeverity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export interface ThreatAssessment {
  id: string;
  threatType: ThreatType;
  severity: ThreatSeverity;
  description: string;
  source: string;
  active: boolean;
  assessedAt: string;
}

export interface ThreatAssessmentRow {
  id: string;
  threat_type: string;
  severity: string;
  description: string;
  source: string;
  active: number;
  assessed_at: string;
}

export interface ThreatLandscape {
  threats: ThreatAssessment[];
  overallSeverity: ThreatSeverity;
  activeCount: number;
  assessedAt: string;
}

export interface CyberThreatReport {
  threats: ThreatAssessment[];
  platformExposures: string[];
  recommendations: string[];
  assessedAt: string;
}

export interface RegulatoryThreatReport {
  threats: ThreatAssessment[];
  upcomingDeadlines: string[];
  enforcementTrends: string[];
  assessedAt: string;
}

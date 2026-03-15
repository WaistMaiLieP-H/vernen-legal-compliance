import type { BusinessEntityType, USState } from "./client.js";

export enum ComplianceRuleCategory {
  FORMATION = "FORMATION",
  TAXATION = "TAXATION",
  EMPLOYMENT = "EMPLOYMENT",
  LICENSING = "LICENSING",
  REPORTING = "REPORTING",
  PRIVACY = "PRIVACY",
  INSURANCE = "INSURANCE",
}

export enum ComplianceLevel {
  FEDERAL = "FEDERAL",
  STATE = "STATE",
  LOCAL = "LOCAL",
}

export interface ComplianceRule {
  id: string;
  code: string;
  title: string;
  description: string;
  category: ComplianceRuleCategory;
  level: ComplianceLevel;
  state?: USState;
  entityTypes: BusinessEntityType[];
  effectiveDate: string;
  source: string;
  url: string;
}

export enum ComplianceStatus {
  COMPLIANT = "COMPLIANT",
  NON_COMPLIANT = "NON_COMPLIANT",
  NEEDS_REVIEW = "NEEDS_REVIEW",
  NOT_APPLICABLE = "NOT_APPLICABLE",
}

export interface ComplianceCheckResult {
  ruleId: string;
  status: ComplianceStatus;
  details: string;
  remediation: string;
  deadline?: string;
}

export interface ComplianceReport {
  id: string;
  clientId: string;
  states: USState[];
  entityType: BusinessEntityType;
  results: ComplianceCheckResult[];
  generatedAt: string;
  generatedBy: string;
}

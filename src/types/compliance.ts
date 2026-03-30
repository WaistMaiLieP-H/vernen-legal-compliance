import type { BusinessEntityType, USState } from "./client.js";

export enum ComplianceRuleCategory {
  FORMATION = "FORMATION",
  TAXATION = "TAXATION",
  EMPLOYMENT = "EMPLOYMENT",
  LICENSING = "LICENSING",
  REPORTING = "REPORTING",
  PRIVACY = "PRIVACY",
  INSURANCE = "INSURANCE",
  ENVIRONMENTAL = "ENVIRONMENTAL",
  ACCESSIBILITY = "ACCESSIBILITY",
  CORPORATE_GOVERNANCE = "CORPORATE_GOVERNANCE",
  INDUSTRY_SPECIFIC = "INDUSTRY_SPECIFIC",
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
  verificationId?: string;
  verificationHash?: string;
}

export enum VerificationStatus {
  VERIFIED_COMPLIANT = "VERIFIED_COMPLIANT",
  VERIFIED_PARTIAL = "VERIFIED_PARTIAL",
  VERIFIED_NON_COMPLIANT = "VERIFIED_NON_COMPLIANT",
  VERIFIED_PENDING_REVIEW = "VERIFIED_PENDING_REVIEW",
}

export interface VerificationRecord {
  id: string;
  reportId: string;
  clientId: string;
  verificationHash: string;
  rulesHash: string;
  resultHash: string;
  entityType: BusinessEntityType;
  statesChecked: USState[];
  rulesCount: number;
  compliantCount: number;
  nonCompliantCount: number;
  needsReviewCount: number;
  complianceScore: number;
  verificationStatus: VerificationStatus;
  chainId?: string;
  chainTxHash?: string;
  blockNumber?: number;
  chainTimestamp?: string;
  contractAddress?: string;
  verifiedBy: string;
  verifiedAt: string;
  expiresAt?: string;
  isPublic: boolean;
}

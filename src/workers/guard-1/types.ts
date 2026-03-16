/**
 * GUARD-1 Types — Privacy operations types for PRIVAXIS.
 */

export enum DataClassification {
  PUBLIC = "PUBLIC",
  INTERNAL = "INTERNAL",
  CONFIDENTIAL = "CONFIDENTIAL",
  RESTRICTED = "RESTRICTED",
}

export enum DSARType {
  ACCESS = "ACCESS",
  DELETE = "DELETE",
  EXPORT = "EXPORT",
}

export enum DSARStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  DENIED = "DENIED",
}

export interface DataFlowRecord {
  id: string;
  dataType: string;
  source: string;
  destination: string;
  classification: DataClassification;
  purpose: string;
  retentionDays: number | null;
  hasConsent: boolean;
  mappedAt: string;
}

export interface PrivacyAuditResult {
  id: string;
  auditType: string;
  findings: PrivacyFinding[];
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  auditedAt: string;
}

export interface PrivacyFinding {
  area: string;
  status: "PASS" | "WARN" | "FAIL";
  description: string;
  recommendation?: string;
}

export interface DSARRequest {
  id: string;
  type: DSARType;
  clientId: string;
  status: DSARStatus;
  requestedAt: string;
  completedAt: string | null;
}

export interface DataCollectionPoint {
  endpoint: string;
  dataFields: string[];
  classification: DataClassification;
  hasConsent: boolean;
  storedIn: string;
}

export interface ConsentRecord {
  endpoint: string;
  consentMechanism: string;
  isCompliant: boolean;
  issue?: string;
}

export interface ClassifiedDataRecord {
  table: string;
  column: string;
  classification: DataClassification;
  containsPII: boolean;
  encrypted: boolean;
}

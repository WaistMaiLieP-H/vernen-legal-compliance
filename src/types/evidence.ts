/**
 * Compliance Evidence Types
 * Three tiers: self-attestation, automated checks, document-backed proof
 */

export enum EvidenceType {
  SELF_ATTESTATION = "SELF_ATTESTATION",
  AUTOMATED_CHECK = "AUTOMATED_CHECK",
  DOCUMENT = "DOCUMENT",
}

export enum EvidenceStatus {
  SUBMITTED = "SUBMITTED",
  VERIFIED = "VERIFIED",
  REJECTED = "REJECTED",
  EXPIRED = "EXPIRED",
}

export enum DocumentStorageMethod {
  D1_METADATA = "D1_METADATA",
  R2_OBJECT = "R2_OBJECT",
  EXTERNAL_URL = "EXTERNAL_URL",
  KV_REFERENCE = "KV_REFERENCE",
}

export interface ComplianceEvidence {
  id: string;
  clientId: string;
  ruleId: string;
  ruleCode: string;
  evidenceType: EvidenceType;
  status: EvidenceStatus;
  title: string;
  description: string;
  attestedBy?: string;
  attestedAt?: string;
  documentId?: string;
  automatedCheckId?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SelfAttestation {
  id: string;
  clientId: string;
  ruleId: string;
  statement: string;
  attestedBy: string;
  attestedAt: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface AutomatedCheck {
  id: string;
  checkType: AutomatedCheckType;
  targetUrl?: string;
  targetEntity?: string;
  result: "PASS" | "FAIL" | "ERROR" | "SKIPPED";
  details: string;
  rawResponse?: string;
  executedAt: string;
  durationMs: number;
}

export enum AutomatedCheckType {
  PRIVACY_POLICY_EXISTS = "PRIVACY_POLICY_EXISTS",
  TERMS_OF_SERVICE_EXISTS = "TERMS_OF_SERVICE_EXISTS",
  SSL_CERTIFICATE_VALID = "SSL_CERTIFICATE_VALID",
  ACCESSIBILITY_BASIC = "ACCESSIBILITY_BASIC",
  SECURITY_HEADERS = "SECURITY_HEADERS",
  COOKIE_CONSENT = "COOKIE_CONSENT",
  CONTACT_INFO_PRESENT = "CONTACT_INFO_PRESENT",
  BUSINESS_REGISTRATION_LOOKUP = "BUSINESS_REGISTRATION_LOOKUP",
  DOMAIN_WHOIS = "DOMAIN_WHOIS",
  DNS_CONFIGURATION = "DNS_CONFIGURATION",
}

export interface DocumentRecord {
  id: string;
  clientId: string;
  title: string;
  documentType: DocumentType;
  category: DocumentCategory;
  storageMethod: DocumentStorageMethod;
  storagePath: string;
  mimeType: string;
  sizeBytes: number;
  hashSha256: string;
  retentionRuleId?: string;
  retentionExpiresAt?: string;
  retentionHoldReason?: string;
  isLegalHold: boolean;
  uploadedBy: string;
  uploadedAt: string;
  verifiedAt?: string;
  verifiedBy?: string;
  metadata?: Record<string, string>;
}

export enum DocumentType {
  PRIVACY_POLICY = "PRIVACY_POLICY",
  TERMS_OF_SERVICE = "TERMS_OF_SERVICE",
  ARTICLES_OF_INCORPORATION = "ARTICLES_OF_INCORPORATION",
  OPERATING_AGREEMENT = "OPERATING_AGREEMENT",
  BYLAWS = "BYLAWS",
  EIN_LETTER = "EIN_LETTER",
  BUSINESS_LICENSE = "BUSINESS_LICENSE",
  INSURANCE_CERTIFICATE = "INSURANCE_CERTIFICATE",
  TAX_RETURN = "TAX_RETURN",
  W9 = "W9",
  ANNUAL_REPORT = "ANNUAL_REPORT",
  BOI_REPORT = "BOI_REPORT",
  MEETING_MINUTES = "MEETING_MINUTES",
  RESOLUTION = "RESOLUTION",
  CONTRACT = "CONTRACT",
  EMPLOYEE_HANDBOOK = "EMPLOYEE_HANDBOOK",
  SAFETY_PLAN = "SAFETY_PLAN",
  ENVIRONMENTAL_PERMIT = "ENVIRONMENTAL_PERMIT",
  ACCESSIBILITY_AUDIT = "ACCESSIBILITY_AUDIT",
  SOC2_REPORT = "SOC2_REPORT",
  PENETRATION_TEST = "PENETRATION_TEST",
  DATA_PROCESSING_AGREEMENT = "DATA_PROCESSING_AGREEMENT",
  INCIDENT_RESPONSE_PLAN = "INCIDENT_RESPONSE_PLAN",
  BUSINESS_CONTINUITY_PLAN = "BUSINESS_CONTINUITY_PLAN",
  FINANCIAL_STATEMENT = "FINANCIAL_STATEMENT",
  AUDIT_REPORT = "AUDIT_REPORT",
  COMPLIANCE_CERTIFICATE = "COMPLIANCE_CERTIFICATE",
  TRAINING_RECORD = "TRAINING_RECORD",
  WHISTLEBLOWER_POLICY = "WHISTLEBLOWER_POLICY",
  ANTI_HARASSMENT_POLICY = "ANTI_HARASSMENT_POLICY",
  RECORD_RETENTION_POLICY = "RECORD_RETENTION_POLICY",
  OTHER = "OTHER",
}

export enum DocumentCategory {
  FORMATION = "FORMATION",
  TAX = "TAX",
  EMPLOYMENT = "EMPLOYMENT",
  LICENSING = "LICENSING",
  INSURANCE = "INSURANCE",
  GOVERNANCE = "GOVERNANCE",
  PRIVACY = "PRIVACY",
  SECURITY = "SECURITY",
  FINANCIAL = "FINANCIAL",
  ENVIRONMENTAL = "ENVIRONMENTAL",
  ACCESSIBILITY = "ACCESSIBILITY",
  CONTRACTS = "CONTRACTS",
  OPERATIONS = "OPERATIONS",
  LEGAL = "LEGAL",
}

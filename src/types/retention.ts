/**
 * Document Retention Types
 * Legal requirements for how long documents must be kept,
 * how they must be stored, and why.
 */

export enum RetentionBasis {
  FEDERAL_STATUTE = "FEDERAL_STATUTE",
  STATE_STATUTE = "STATE_STATUTE",
  FEDERAL_REGULATION = "FEDERAL_REGULATION",
  STATE_REGULATION = "STATE_REGULATION",
  INDUSTRY_STANDARD = "INDUSTRY_STANDARD",
  BEST_PRACTICE = "BEST_PRACTICE",
  LITIGATION_HOLD = "LITIGATION_HOLD",
  INTERNAL_POLICY = "INTERNAL_POLICY",
}

export enum RetentionPurpose {
  LEGAL_COMPLIANCE = "LEGAL_COMPLIANCE",
  TAX_AUDIT = "TAX_AUDIT",
  EMPLOYMENT_RECORDS = "EMPLOYMENT_RECORDS",
  LITIGATION_READINESS = "LITIGATION_READINESS",
  REGULATORY_AUDIT = "REGULATORY_AUDIT",
  INSURANCE_CLAIMS = "INSURANCE_CLAIMS",
  REFERENCE = "REFERENCE",
  LEARNING = "LEARNING",
  HISTORICAL = "HISTORICAL",
  EVIDENTIARY = "EVIDENTIARY",
}

export enum StorageRequirement {
  ORIGINAL_PAPER = "ORIGINAL_PAPER",
  CERTIFIED_COPY = "CERTIFIED_COPY",
  DIGITAL_ACCEPTABLE = "DIGITAL_ACCEPTABLE",
  DIGITAL_WITH_AUDIT_TRAIL = "DIGITAL_WITH_AUDIT_TRAIL",
  ENCRYPTED_STORAGE = "ENCRYPTED_STORAGE",
  OFFSITE_BACKUP = "OFFSITE_BACKUP",
  TAMPER_EVIDENT = "TAMPER_EVIDENT",
}

export enum DisposalMethod {
  SHRED = "SHRED",
  SECURE_DELETE = "SECURE_DELETE",
  DEGAUSS = "DEGAUSS",
  ARCHIVE_THEN_DESTROY = "ARCHIVE_THEN_DESTROY",
  TRANSFER_TO_ARCHIVE = "TRANSFER_TO_ARCHIVE",
  NO_DESTRUCTION = "NO_DESTRUCTION",
}

export interface RetentionRule {
  id: string;
  title: string;
  description: string;
  documentTypes: string;       // JSON array of DocumentType values
  retentionYears: number;
  retentionMonths: number;     // for sub-year precision
  retentionFrom: RetentionTrigger;
  basis: RetentionBasis;
  legalCitation: string;
  jurisdiction: string;        // FEDERAL, state code, or ALL
  purposes: string;            // JSON array of RetentionPurpose
  storageRequirements: string; // JSON array of StorageRequirement
  disposalMethod: DisposalMethod;
  appliesToEntityTypes: string; // JSON array of BusinessEntityType or ALL
  appliesToIndustries: string;  // JSON array or ALL
  penaltyForNonCompliance: string;
  notes: string;
  isActive: boolean;
  effectiveDate: string;
  lastAmended: string;
  sourceUrl: string;
}

export enum RetentionTrigger {
  CREATION_DATE = "CREATION_DATE",
  EXECUTION_DATE = "EXECUTION_DATE",
  TERMINATION_DATE = "TERMINATION_DATE",
  TAX_YEAR_END = "TAX_YEAR_END",
  EMPLOYEE_SEPARATION = "EMPLOYEE_SEPARATION",
  CONTRACT_EXPIRATION = "CONTRACT_EXPIRATION",
  CLAIM_RESOLUTION = "CLAIM_RESOLUTION",
  AUDIT_COMPLETION = "AUDIT_COMPLETION",
  ENTITY_DISSOLUTION = "ENTITY_DISSOLUTION",
  LAST_ACTION_DATE = "LAST_ACTION_DATE",
  FILING_DATE = "FILING_DATE",
  PERMANENT = "PERMANENT",
}

export interface RetentionSchedule {
  id: string;
  clientId: string;
  documentId: string;
  retentionRuleId: string;
  triggerDate: string;
  expiresAt: string;
  status: RetentionScheduleStatus;
  holdReason?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  disposedAt?: string;
  disposalMethod?: DisposalMethod;
  disposalCertificate?: string;
}

export enum RetentionScheduleStatus {
  ACTIVE = "ACTIVE",
  EXPIRING_SOON = "EXPIRING_SOON",
  EXPIRED = "EXPIRED",
  LEGAL_HOLD = "LEGAL_HOLD",
  DISPOSED = "DISPOSED",
  EXTENDED = "EXTENDED",
}

/**
 * Types for LEX-1 — the legal document generation engine.
 * LEX-1 is LEXARC's primary revenue worker.
 */

export enum DocumentType {
  PRIVACY_POLICY = "PRIVACY_POLICY",
  TERMS_OF_SERVICE = "TERMS_OF_SERVICE",
  EMPLOYEE_HANDBOOK = "EMPLOYEE_HANDBOOK",
  COMPLIANCE_CHECKLIST = "COMPLIANCE_CHECKLIST",
  BYLAWS = "BYLAWS",
  OPERATING_AGREEMENT = "OPERATING_AGREEMENT",
}

export interface PrivacyPolicyParams {
  businessName: string;
  state: string;
  entityType: string;
  websiteUrl?: string;
  collectsEmail: boolean;
  collectsPayment: boolean;
  usesAnalytics: boolean;
  hasMinors: boolean;
  effectiveDate?: string;
}

export interface TermsOfServiceParams {
  businessName: string;
  state: string;
  entityType: string;
  serviceType: string;
  websiteUrl?: string;
  hasSubscriptions: boolean;
  hasRefundPolicy: boolean;
  effectiveDate?: string;
}

export interface EmployeeHandbookParams {
  businessName: string;
  state: string;
  entityType: string;
  employeeCount?: number;
  effectiveDate?: string;
}

export interface ComplianceChecklistParams {
  state: string;
  entityType: string;
  businessName?: string;
}

export interface DocumentRequest {
  type: DocumentType;
  clientId?: string;
  params:
    | PrivacyPolicyParams
    | TermsOfServiceParams
    | EmployeeHandbookParams
    | ComplianceChecklistParams;
}

export interface GeneratedDocument {
  id: string;
  type: DocumentType;
  params: Record<string, unknown>;
  content: string; // HTML
  generatedAt: string;
  generatedBy: "LEX-1";
  isPaid: boolean;
  businessName: string;
  state: string;
}

/**
 * Product catalog entry for a document type.
 */
export interface DocumentProduct {
  type: DocumentType;
  name: string;
  description: string;
  priceUsd: number;
  estimatedPages: string;
}

/**
 * Bundle product — multiple documents at a discount.
 */
export interface DocumentBundle {
  id: string;
  name: string;
  description: string;
  includes: DocumentType[];
  priceUsd: number;
  savingsUsd: number;
}

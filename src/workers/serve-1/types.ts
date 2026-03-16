/**
 * Types for SERVE-1 — the client service engine worker.
 */

export enum InquiryType {
  BILLING = "BILLING",
  COMPLIANCE_QUESTION = "COMPLIANCE_QUESTION",
  TECHNICAL = "TECHNICAL",
  FEEDBACK = "FEEDBACK",
  GENERAL = "GENERAL",
}

export enum InquiryStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  RESOLVED = "RESOLVED",
  CLOSED = "CLOSED",
}

export interface Inquiry {
  id: string;
  clientId: string | null;
  type: InquiryType;
  message: string;
  response: string | null;
  status: InquiryStatus;
  createdAt: string;
  resolvedAt: string | null;
}

export interface InquiryRow {
  id: string;
  client_id: string | null;
  inquiry_type: string;
  message: string;
  response: string | null;
  status: string;
  created_at: string;
  resolved_at: string | null;
}

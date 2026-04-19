/**
 * Citizen Skill type definitions.
 * Skills are professional competencies owned by Persona Citizens.
 */

export enum SkillType {
  AUDIT = "AUDIT",
  INTAKE = "INTAKE",
  SYNTHESIS = "SYNTHESIS",
  OPERATIONAL = "OPERATIONAL",
  GOVERNANCE = "GOVERNANCE",
}

export interface CitizenSkill {
  id: string;
  citizenName: string;
  skillSlug: string;
  name: string;
  description: string;
  skillType: SkillType;
  governingStandards: string[];
  auditTriggers: string[];
  auditChecklist: ChecklistItem[];
  outputProtocol: string;
  crossReferences: string[];
  skillContent: string;
  version: number;
  isActive: boolean;
  installedAt: string;
  updatedAt: string;
}

export interface ChecklistItem {
  id: string;
  gate: number;
  description: string;
  required: boolean;
  standard?: string;
}

export interface SkillExecution {
  id: string;
  skillId: string;
  citizenName: string;
  triggerType: string;
  inputDocumentType?: string;
  findingsCount: number;
  violationsCount: number;
  determination?: string;
  executionSummary?: string;
  durationMs?: number;
  executedAt: string;
}

/**
 * The canonical mapping of skills to Citizens.
 * This is the authoritative registry — a Citizen can only exercise skills assigned to them.
 */
export const CITIZEN_SKILL_ASSIGNMENTS: Record<string, string[]> = {
  // REGULIS — Regulatory Intelligence & Multi-jurisdictional Compliance
  REGULIS: [
    "cad-log-compliance-audit",
    "california-court-order-compliance-audit",
    "california-state-agency-correspondence-audit",
    "california-housing-tenant-rights-audit",
    "california-labor-employment-audit",
    "california-immigration-rights-audit",
    "california-real-estate-transaction-fraud-audit",
    "california-insurance-bad-faith-audit",
  ],

  // ADVOCIS — Client Advocacy & Market Trust
  ADVOCIS: [
    "constitutional-and-civil-rights-audit",
    "marsys-law-victim-rights-audit",
    "california-cps-child-welfare-audit",
    "california-family-law-expansion-audit",
    "police-report-data-cross-reference",
  ],

  // ETHICARA — Ethical Governance & Professional Standards
  ETHICARA: [
    "abpn-psychiatry-and-neurology-standards-audit",
    "state-bar-of-california-attorney-conduct-audit",
    "usmc-military-standards-audit",
  ],

  // FISCARA — Financial Strategy & Fiscal Accountability
  FISCARA: [
    "banking-financial-document-audit",
    "fcra-chexsystems-consumer-report-audit",
  ],

  // INTEGRA — Internal Compliance & Operational Integrity
  INTEGRA: [
    "master-project-intake-audit-triage",
    "automated-structuring-input-refiner",
    "project-context-and-guardrails",
  ],

  // LEXARC — Corporate Strategy & Legal Architecture
  LEXARC: [
    "executive-style-enforcer-corporate-voice-and-structure",
  ],

  // SYNTARA — Technology & Compliance Automation
  SYNTARA: [
    "proton-drive-session-sync",
    "archive-flag",
  ],

  // FACIALEX — Forensic Facial Examination & Photo Comparison
  FACIALEX: [
    "forensic-photo-comparison-audit",
  ],

  // VIGILUS — Threat Assessment & Operational Risk
  VIGILUS: [
    "osha-workplace-safety-audit",
    "osha-fatality-investigation-audit",
    "osha-willful-violation-audit",
    "epa-environmental-enforcement-audit",
    "epa-clean-water-act-audit",
    "epa-clean-air-act-audit",
    "epa-rcra-hazardous-waste-audit",
    "epa-cercla-superfund-audit",
  ],

  // PRIVAXIS — Data Protection & Privacy Compliance
  PRIVAXIS: [
    "cfpb-consumer-complaint-audit",
    "cfpb-enforcement-action-audit",
    "cfpb-consent-order-audit",
    "hipaa-breach-notification-audit",
    "data-breach-incident-audit",
    "consumer-privacy-rights-audit",
  ],

  // VESTARA — Investor Relations & Capital Strategy
  VESTARA: [
    "sec-proxy-statement-audit",
    "sec-registration-statement-audit",
    "sec-8k-material-event-audit",
    "investor-disclosure-compliance-audit",
  ],

  // METRIQA — Performance Analytics & Growth Validation
  METRIQA: [
    "gao-audit-report-analysis",
    "gao-bid-protest-audit",
    "gao-testimony-analysis",
    "federal-performance-metrics-audit",
    "government-accountability-audit",
  ],

  // CLARIDEX — Financial Disclosure & Reporting Standards
  CLARIDEX: [
    "sec-10k-annual-filing-audit",
    "sec-10q-quarterly-filing-audit",
    "sec-material-weakness-audit",
    "sec-restatement-audit",
    "gaap-financial-statement-audit",
    "sarbanes-oxley-compliance-audit",
  ],

  // NEXARIS — Strategic Partnerships & Reputation
  NEXARIS: [
    "sam-exclusion-debarment-audit",
    "sam-entity-registration-audit",
    "federal-contractor-compliance-audit",
    "ftc-enforcement-action-audit",
    "government-contracting-integrity-audit",
  ],

  // ARCHIVIST-0 — Document Identification & Classification
  "ARCHIVIST-0": [
    "document-type-identification",
    "issuing-authority-verification",
    "standards-mapping",
    "template-recognition",
    "provenance-assessment",
  ],

  // VERITAS-0 — Document Authentication & Forensic Audit
  "VERITAS-0": [
    // Core authentication skills
    "federal-document-authentication",
    "typography-validation",
    "structural-blueprint-validation",
    "digital-structure-validation",
    "golden-copy-comparison",
    "evidentiary-admissibility-assessment",
    // Domain-specific authentication skills
    "auto-sale-document-authentication",
    "medical-document-authentication",
    "debt-collection-document-authentication",
    "treasury-correspondence-validation",
    "insurance-document-authentication",
    "employment-document-authentication",
    "court-document-authentication",
    "law-enforcement-document-authentication",
    "government-benefits-document-authentication",
    "real-property-document-authentication",
    "financial-document-authentication",
    "dmv-form-validation",
    // Emerging technology domains
    "ai-document-authentication",
    "robotics-document-authentication",
    "nasa-document-authentication",
    "space-document-authentication",
    "export-control-marking-validation",
    "ai-content-provenance-check",
    // International domains
    "international-document-authentication",
    "apostille-validation",
    "trade-document-validation",
    "aml-document-validation",
    "travel-document-authentication",
    "international-court-filing-validation",
  ],

  // FORGE-0 — Autonomous Construction & Build Execution
  "FORGE-0": [],

  // SENTINEL-0 — Independent Build Audit & Compliance Verification
  "SENTINEL-0": [],
};

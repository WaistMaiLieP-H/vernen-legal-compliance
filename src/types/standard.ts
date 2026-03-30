/**
 * Governing Standard type definitions.
 * Each Citizen's reference library — the law they know and measure against.
 */

export enum StandardType {
  FEDERAL_STATUTE = "FEDERAL_STATUTE",
  STATE_STATUTE = "STATE_STATUTE",
  FEDERAL_REGULATION = "FEDERAL_REGULATION",
  STATE_REGULATION = "STATE_REGULATION",
  COURT_RULE = "COURT_RULE",
  CASE_LAW = "CASE_LAW",
  CONSTITUTIONAL = "CONSTITUTIONAL",
  PROFESSIONAL_STANDARD = "PROFESSIONAL_STANDARD",
  AGENCY_STANDARD = "AGENCY_STANDARD",
  MILITARY_STANDARD = "MILITARY_STANDARD",
  INTERNATIONAL = "INTERNATIONAL",
}

export enum Determination {
  COMPLIANT = "COMPLIANT",
  NON_COMPLIANT = "NON_COMPLIANT",
  VIOLATION = "VIOLATION",
  NOT_APPLICABLE = "NOT_APPLICABLE",
  INSUFFICIENT_DATA = "INSUFFICIENT_DATA",
}

export enum Severity {
  CRITICAL = "CRITICAL",
  MAJOR = "MAJOR",
  MINOR = "MINOR",
  INFORMATIONAL = "INFORMATIONAL",
}

export interface KeySection {
  section: string;
  description: string;
}

export interface DamagesAvailable {
  actual?: boolean;
  statutory?: string;
  punitive?: boolean;
  attorney_fees?: boolean;
  injunctive?: boolean;
  treble?: boolean;
}

export interface GoverningStandard {
  id: string;
  citizenName: string;
  standardType: StandardType;
  jurisdiction: string;
  citation: string;
  shortCite?: string;
  title: string;
  description: string;
  requirements: string[];
  keySections: KeySection[];
  documentTypes: string[];
  skillSlugs: string[];
  enforcementBody?: string;
  enforcementUrl?: string;
  privateRightOfAction: boolean;
  statuteOfLimitations?: string;
  damagesAvailable?: DamagesAvailable;
  effectiveDate?: string;
  lastAmended?: string;
  sourceUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StandardCrossReference {
  id: string;
  standardId: string;
  relatedStandardId: string;
  relationshipType: "IMPLEMENTS" | "SUPERSEDES" | "SUPPLEMENTS" | "CONFLICTS" | "INTERPRETS" | "REQUIRES" | "REFERENCES";
  notes?: string;
  createdAt: string;
}

export interface StandardApplication {
  id: string;
  standardId: string;
  citizenName: string;
  skillExecutionId?: string;
  documentType?: string;
  determination: Determination;
  finding?: string;
  severity: Severity;
  appliedAt: string;
}

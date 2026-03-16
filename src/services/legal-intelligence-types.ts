// VERNEN™ Legal Intelligence Platform — Types
// Ported from MCP Intelligence Platform (IP Manifest Filed February 2, 2026)
// All Rights Reserved

// ============================================================
// ENUMS
// ============================================================

export enum PracticeArea {
  INSURANCE_BAD_FAITH = "INSURANCE_BAD_FAITH",
  REAL_ESTATE_FRAUD = "REAL_ESTATE_FRAUD",
  DOD_FEDERAL_COMPLIANCE = "DOD_FEDERAL_COMPLIANCE",
  MEDICAL_BILLING_FRAUD = "MEDICAL_BILLING_FRAUD",
  STATE_AGENCY_CORRESPONDENCE = "STATE_AGENCY_CORRESPONDENCE",
  FCRA_CONSUMER_REPORT = "FCRA_CONSUMER_REPORT",
  SSA_DISABILITY = "SSA_DISABILITY",
  COURT_ORDER_COMPLIANCE = "COURT_ORDER_COMPLIANCE",
  VICTIM_RIGHTS = "VICTIM_RIGHTS",
  LABOR_EMPLOYMENT = "LABOR_EMPLOYMENT",
  FAMILY_LAW_CUSTODY = "FAMILY_LAW_CUSTODY",
  FEDERAL_LAW_ENFORCEMENT = "FEDERAL_LAW_ENFORCEMENT",
  CHILD_WELFARE_CPS = "CHILD_WELFARE_CPS",
  PSYCHIATRY_NEUROLOGY = "PSYCHIATRY_NEUROLOGY",
  ATTORNEY_CONDUCT = "ATTORNEY_CONDUCT",
  STATE_LAW_ENFORCEMENT = "STATE_LAW_ENFORCEMENT",
  CONSTITUTIONAL_CIVIL_RIGHTS = "CONSTITUTIONAL_CIVIL_RIGHTS",
  MILITARY_JUSTICE = "MILITARY_JUSTICE",
}

export enum AuditSeverity {
  CRITICAL = "CRITICAL",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  INFORMATIONAL = "INFORMATIONAL",
}

// ============================================================
// AUTHORITY COMPILER TYPES
// ============================================================

export interface AuthorityEntry {
  citation: string;
  sourceType: "statute" | "regulation" | "rule" | "case_law" | "standard";
  shortDescription: string;
  fullText: string | null;
  relevance: string;
  jurisdiction: string;
  url: string | null;
}

export interface AuthorityPackage {
  findingId: string;
  findingDescription: string;
  severity: string;
  authorities: AuthorityEntry[];
  compiledAt: string;
}

export interface AuthorityCompilationResult {
  practiceArea: string;
  jurisdiction: string;
  authorities: AuthorityEntry[];
  totalAuthorities: number;
  compiledAt: string;
}

// ============================================================
// DEADLINE CALCULATOR TYPES
// ============================================================

export interface DeadlineResult {
  description: string;
  dueDate: string;
  statutoryBasis: string;
  calculatedFrom: string;
  daysRemaining: number;
  status: "upcoming" | "imminent" | "overdue" | "completed";
  warnings: string[];
}

export interface DeadlineCalculation {
  motionType: string;
  filingDate: string;
  serviceMethod: string;
  jurisdiction: string;
  calculatedAt: string;
  deadlines: DeadlineResult[];
  courtHolidaysApplied: string[];
  warnings: string[];
}

export interface DeadlineRequest {
  motionType: string;
  filingDate: string;
  serviceMethod?: string;
  hearingDate?: string;
}

// ============================================================
// LOCAL RULES TYPES
// ============================================================

export interface LocalRuleEntry {
  ruleId: string;
  category: "formatting" | "filing" | "department" | "efiling" | "general";
  description: string;
  requirement: string;
  source: string;
}

export interface CountyRuleSet {
  jurisdiction: string;
  county: string;
  department: string | null;
  courtName: string;
  courtAddress: string;
  clerkPhone: string;
  eFilingUrl: string | null;
  rules: LocalRuleEntry[];
  lastUpdated: string;
}

// ============================================================
// MOTION TEMPLATE TYPES
// ============================================================

export interface MotionSection {
  sectionId: string;
  heading: string;
  content: string;
  citations: string[];
  exhibitReferences: string[];
}

export interface MotionCaption {
  courtName: string;
  caseNumber: string;
  caseTitle: string;
  documentTitle: string;
  hearingDate: string | null;
  hearingTime: string | null;
  department: string | null;
  filingParty: string;
}

export interface GeneratedMotion {
  templateId: string;
  motionType: string;
  motionTitle: string;
  jurisdiction: string;
  county: string;
  generatedAt: string;
  caption: MotionCaption;
  sections: MotionSection[];
  proposedOrder: string;
  proofOfService: string;
  localRulesApplied: string[];
  totalCitations: number;
  totalExhibitRefs: number;
  warnings: string[];
  instructions: string[];
}

export interface MotionRequest {
  motionType: string;
  caseNumber?: string;
  caseTitle?: string;
  filingParty?: string;
  county?: string;
  hearingDate?: string;
  department?: string;
  practiceAreas?: string[];
  auditFindings?: AuditFindingInput[];
  incorporateFindings?: boolean;
}

export interface AuditFindingInput {
  severity: string;
  category: string;
  description: string;
  statutoryCitation: string;
  recommendation: string;
  evidenceReference: string;
}

// ============================================================
// CONFLICT CHECK TYPES
// ============================================================

export interface ConflictCheckResult {
  checkId: string;
  timestamp: string;
  checkedNames: string[];
  checkedEntities: string[];
  checkedRelated: string[];
  potentialConflicts: ConflictMatch[];
  clearanceStatus: "CLEAR" | "POTENTIAL_CONFLICT" | "CONFLICT_FOUND" | "REVIEW_REQUIRED";
  confidenceScore: number;
  recommendations: string[];
  warnings: string[];
}

export interface ConflictMatch {
  matchId: string;
  matchedName: string;
  matchedAgainst: string;
  matchType: "exact" | "phonetic" | "alias" | "entity_related" | "cross_case";
  confidence: number;
  source: string;
  caseReference: string | null;
  details: string;
  severity: "high" | "medium" | "low";
}

export interface ConflictRequest {
  partyName: string;
  existingParties: string[];
  entityNames?: string[];
  relatedPersons?: string[];
  existingCases?: Array<{ caseId: string; parties: string[] }>;
}

// ============================================================
// SUPPORTED JURISDICTIONS & PRACTICE AREAS METADATA
// ============================================================

export interface PracticeAreaInfo {
  id: string;
  displayName: string;
  description: string;
}

export interface JurisdictionInfo {
  code: string;
  name: string;
  type: "state" | "federal" | "territory";
}

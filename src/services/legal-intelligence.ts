// VERNEN™ Legal Intelligence Service
// Ported from MCP Intelligence Platform (IP Manifest Filed February 2, 2026)
// All Rights Reserved
//
// Core legal intelligence tools ported to Cloudflare Workers:
//   - Authority Compiler (statutory citations by practice area)
//   - CCP Deadline Calculator (motion timelines with holiday awareness)
//   - Local Rules Engine (CA county court rules)
//   - Motion Template Generator (8 motion types)
//   - Conflict Check (fuzzy matching algorithms)

import type { Env } from "../index.js";
import type {
  AuthorityEntry,
  AuthorityCompilationResult,
  DeadlineResult,
  DeadlineCalculation,
  LocalRuleEntry,
  CountyRuleSet,
  MotionSection,
  MotionCaption,
  GeneratedMotion,
  AuditFindingInput,
  ConflictCheckResult,
  ConflictMatch,
  PracticeAreaInfo,
  JurisdictionInfo,
} from "./legal-intelligence-types.js";

// ════════════════════════════════════════════════════════════════
// PRACTICE AREA & JURISDICTION METADATA
// ════════════════════════════════════════════════════════════════

const PRACTICE_AREAS: PracticeAreaInfo[] = [
  { id: "INSURANCE_BAD_FAITH", displayName: "Insurance Bad Faith", description: "Property/casualty and auto insurance bad faith practices, claims handling violations, unfair settlement conduct." },
  { id: "REAL_ESTATE_FRAUD", displayName: "Real Estate Transaction Fraud", description: "Real estate transaction fraud, title defects, escrow irregularities, deed fraud, elder financial abuse." },
  { id: "DOD_FEDERAL_COMPLIANCE", displayName: "DoD & Federal Compliance", description: "DoD document deficiencies, federal personnel records, administrative compliance." },
  { id: "MEDICAL_BILLING_FRAUD", displayName: "Medical Billing & Surgery Fraud", description: "Medical billing fraud, upcoding, unbundling, unnecessary procedures, surgical billing irregularities." },
  { id: "STATE_AGENCY_CORRESPONDENCE", displayName: "State Agency Correspondence", description: "California state agency correspondence deficiencies, SAM standards, plain language, accessibility." },
  { id: "FCRA_CONSUMER_REPORT", displayName: "Consumer Credit & FCRA", description: "FCRA/CCRAA violations, consumer report disputes, ChexSystems, reinvestigation failures." },
  { id: "SSA_DISABILITY", displayName: "Social Security Disability", description: "SSA/DDS disability determination deficiencies, POMS standards, appeals." },
  { id: "COURT_ORDER_COMPLIANCE", displayName: "Court Order Compliance", description: "Court order compliance monitoring, formatting requirements, filing procedures." },
  { id: "VICTIM_RIGHTS", displayName: "Victim Rights & Marsy's Law", description: "Marsy's Law violations, victim notification failures, DA correspondence deficiencies." },
  { id: "LABOR_EMPLOYMENT", displayName: "Labor & Employment", description: "California Labor Code, NLRA, union matters, employment document compliance." },
  { id: "FAMILY_LAW_CUSTODY", displayName: "Family Law & Custody", description: "Child custody, visitation, support, FCS mediator conduct, court order compliance." },
  { id: "FEDERAL_LAW_ENFORCEMENT", displayName: "Federal Law Enforcement", description: "FBI/federal law enforcement conduct standards, statutory duty failures." },
  { id: "CHILD_WELFARE_CPS", displayName: "Child Welfare & CPS", description: "CPS conduct issues, WIC standards, CDSS compliance, child welfare determinations." },
  { id: "PSYCHIATRY_NEUROLOGY", displayName: "Psychiatry & Neurology Standards", description: "ABPN standards, APA guidelines, forensic psychiatric evaluation compliance." },
  { id: "ATTORNEY_CONDUCT", displayName: "Attorney Conduct & Ethics", description: "California Rules of Professional Conduct violations, State Bar complaints, ethical breaches." },
  { id: "STATE_LAW_ENFORCEMENT", displayName: "State Law Enforcement", description: "POST standards, statutory duty failures, police report deficiencies." },
  { id: "CONSTITUTIONAL_CIVIL_RIGHTS", displayName: "Constitutional & Civil Rights", description: "Section 1983, due process, equal protection, government actor misconduct." },
  { id: "MILITARY_JUSTICE", displayName: "Military Justice", description: "UCMJ matters, Marine Corps regulations, military disciplinary proceedings." },
];

const JURISDICTIONS: JurisdictionInfo[] = [
  { code: "CA", name: "California", type: "state" },
  { code: "Federal", name: "Federal", type: "federal" },
  { code: "National", name: "National (Professional Standards)", type: "federal" },
  { code: "AL", name: "Alabama", type: "state" }, { code: "AK", name: "Alaska", type: "state" },
  { code: "AZ", name: "Arizona", type: "state" }, { code: "AR", name: "Arkansas", type: "state" },
  { code: "CO", name: "Colorado", type: "state" }, { code: "CT", name: "Connecticut", type: "state" },
  { code: "DE", name: "Delaware", type: "state" }, { code: "FL", name: "Florida", type: "state" },
  { code: "GA", name: "Georgia", type: "state" }, { code: "HI", name: "Hawaii", type: "state" },
  { code: "ID", name: "Idaho", type: "state" }, { code: "IL", name: "Illinois", type: "state" },
  { code: "IN", name: "Indiana", type: "state" }, { code: "IA", name: "Iowa", type: "state" },
  { code: "KS", name: "Kansas", type: "state" }, { code: "KY", name: "Kentucky", type: "state" },
  { code: "LA", name: "Louisiana", type: "state" }, { code: "ME", name: "Maine", type: "state" },
  { code: "MD", name: "Maryland", type: "state" }, { code: "MA", name: "Massachusetts", type: "state" },
  { code: "MI", name: "Michigan", type: "state" }, { code: "MN", name: "Minnesota", type: "state" },
  { code: "MS", name: "Mississippi", type: "state" }, { code: "MO", name: "Missouri", type: "state" },
  { code: "MT", name: "Montana", type: "state" }, { code: "NE", name: "Nebraska", type: "state" },
  { code: "NV", name: "Nevada", type: "state" }, { code: "NH", name: "New Hampshire", type: "state" },
  { code: "NJ", name: "New Jersey", type: "state" }, { code: "NM", name: "New Mexico", type: "state" },
  { code: "NY", name: "New York", type: "state" }, { code: "NC", name: "North Carolina", type: "state" },
  { code: "ND", name: "North Dakota", type: "state" }, { code: "OH", name: "Ohio", type: "state" },
  { code: "OK", name: "Oklahoma", type: "state" }, { code: "OR", name: "Oregon", type: "state" },
  { code: "PA", name: "Pennsylvania", type: "state" }, { code: "RI", name: "Rhode Island", type: "state" },
  { code: "SC", name: "South Carolina", type: "state" }, { code: "SD", name: "South Dakota", type: "state" },
  { code: "TN", name: "Tennessee", type: "state" }, { code: "TX", name: "Texas", type: "state" },
  { code: "UT", name: "Utah", type: "state" }, { code: "VT", name: "Vermont", type: "state" },
  { code: "VA", name: "Virginia", type: "state" }, { code: "WA", name: "Washington", type: "state" },
  { code: "WV", name: "West Virginia", type: "state" }, { code: "WI", name: "Wisconsin", type: "state" },
  { code: "WY", name: "Wyoming", type: "state" },
  { code: "DC", name: "District of Columbia", type: "territory" },
  { code: "PR", name: "Puerto Rico", type: "territory" },
  { code: "GU", name: "Guam", type: "territory" },
  { code: "VI", name: "Virgin Islands", type: "territory" },
  { code: "AS", name: "American Samoa", type: "territory" },
  { code: "MP", name: "Northern Mariana Islands", type: "territory" },
];

// ════════════════════════════════════════════════════════════════
// AUTHORITY COMPILER — Statutory citation database by practice area
// ════════════════════════════════════════════════════════════════

interface AuthorityMapping {
  practiceArea: string;
  primaryAuthorities: AuthorityEntry[];
}

const AUTHORITY_MAPPINGS: AuthorityMapping[] = [
  {
    practiceArea: "FAMILY_LAW_CUSTODY",
    primaryAuthorities: [
      { citation: "Cal. Fam. Code § 3011", sourceType: "statute", shortDescription: "Best interest of the child factors", fullText: null, relevance: "Primary standard for custody determinations", jurisdiction: "CA", url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=3011.&lawCode=FAM" },
      { citation: "Cal. Fam. Code § 3020", sourceType: "statute", shortDescription: "Legislative findings and declarations on custody", fullText: null, relevance: "Public policy: frequent and continuing contact with both parents", jurisdiction: "CA", url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=3020.&lawCode=FAM" },
      { citation: "Cal. Fam. Code § 3040", sourceType: "statute", shortDescription: "Order of preference for custody", fullText: null, relevance: "Joint custody preference; factors for custody allocation", jurisdiction: "CA", url: null },
      { citation: "Cal. Fam. Code § 3044", sourceType: "statute", shortDescription: "Presumption against custody to domestic violence perpetrator", fullText: null, relevance: "Rebuttable presumption; 7-factor analysis for rebuttal", jurisdiction: "CA", url: null },
      { citation: "CRC Rule 5.210", sourceType: "rule", shortDescription: "Court-connected child custody mediation", fullText: null, relevance: "Mediation procedures and requirements", jurisdiction: "CA", url: null },
      { citation: "CRC Rule 5.220", sourceType: "rule", shortDescription: "Court-ordered child custody evaluations", fullText: null, relevance: "Evaluation methodology requirements", jurisdiction: "CA", url: null },
    ],
  },
  {
    practiceArea: "CONSTITUTIONAL_CIVIL_RIGHTS",
    primaryAuthorities: [
      { citation: "42 U.S.C. § 1983", sourceType: "statute", shortDescription: "Civil action for deprivation of rights", fullText: null, relevance: "Primary vehicle for constitutional tort claims against state actors", jurisdiction: "Federal", url: null },
      { citation: "42 U.S.C. § 1985(3)", sourceType: "statute", shortDescription: "Conspiracy to interfere with civil rights", fullText: null, relevance: "Multi-actor coordination to deprive rights", jurisdiction: "Federal", url: null },
      { citation: "42 U.S.C. § 1986", sourceType: "statute", shortDescription: "Action for neglect to prevent conspiracy", fullText: null, relevance: "Failure to act when aware of § 1985 conspiracy", jurisdiction: "Federal", url: null },
      { citation: "18 U.S.C. § 242", sourceType: "statute", shortDescription: "Deprivation of rights under color of law", fullText: null, relevance: "Criminal liability for willful deprivation", jurisdiction: "Federal", url: null },
      { citation: "U.S. Const. amend. XIV, § 1", sourceType: "statute", shortDescription: "Due Process and Equal Protection", fullText: null, relevance: "Substantive and procedural due process; equal protection", jurisdiction: "Federal", url: null },
      { citation: "U.S. Const. amend. IV", sourceType: "statute", shortDescription: "Protection against unreasonable searches and seizures", fullText: null, relevance: "Fourth Amendment rights; qualified immunity analysis", jurisdiction: "Federal", url: null },
    ],
  },
  {
    practiceArea: "STATE_LAW_ENFORCEMENT",
    primaryAuthorities: [
      { citation: "Cal. Pen. Code § 13519.4", sourceType: "statute", shortDescription: "POST training on domestic violence", fullText: null, relevance: "Mandatory training requirements for law enforcement", jurisdiction: "CA", url: null },
      { citation: "Cal. Pen. Code § 836(c)(1)", sourceType: "statute", shortDescription: "Mandatory arrest for domestic violence", fullText: null, relevance: "Officer duty when probable cause exists", jurisdiction: "CA", url: null },
      { citation: "Cal. Pen. Code § 13701", sourceType: "statute", shortDescription: "Domestic violence policies", fullText: null, relevance: "Written agency policies required", jurisdiction: "CA", url: null },
      { citation: "Cal. Gov. Code § 820.2", sourceType: "statute", shortDescription: "Discretionary act immunity", fullText: null, relevance: "Immunity analysis for law enforcement decisions", jurisdiction: "CA", url: null },
      { citation: "11 CCR § 1081", sourceType: "regulation", shortDescription: "POST minimum standards for officers", fullText: null, relevance: "Training and certification requirements", jurisdiction: "CA", url: null },
    ],
  },
  {
    practiceArea: "CHILD_WELFARE_CPS",
    primaryAuthorities: [
      { citation: "Cal. Welf. & Inst. Code § 300", sourceType: "statute", shortDescription: "Persons subject to jurisdiction of juvenile court", fullText: null, relevance: "Grounds for dependency jurisdiction", jurisdiction: "CA", url: null },
      { citation: "Cal. Welf. & Inst. Code § 300.2", sourceType: "statute", shortDescription: "Purpose of dependency provisions", fullText: null, relevance: "Safety, protection, and family preservation mandate", jurisdiction: "CA", url: null },
      { citation: "Cal. Welf. & Inst. Code § 361.5", sourceType: "statute", shortDescription: "Reunification services", fullText: null, relevance: "When services must/may be provided or denied", jurisdiction: "CA", url: null },
      { citation: "22 CCR § 31-001 et seq.", sourceType: "regulation", shortDescription: "CDSS child welfare standards", fullText: null, relevance: "Regulatory requirements for CPS investigations", jurisdiction: "CA", url: null },
    ],
  },
  {
    practiceArea: "PSYCHIATRY_NEUROLOGY",
    primaryAuthorities: [
      { citation: "APA Practice Guidelines", sourceType: "standard", shortDescription: "American Psychiatric Association clinical guidelines", fullText: null, relevance: "Standard of care for psychiatric evaluations", jurisdiction: "National", url: null },
      { citation: "AAPL Ethics Guidelines", sourceType: "standard", shortDescription: "American Academy of Psychiatry and the Law", fullText: null, relevance: "Forensic psychiatry ethical standards", jurisdiction: "National", url: null },
      { citation: "Cal. Bus. & Prof. Code § 2220", sourceType: "statute", shortDescription: "Medical Board enforcement powers", fullText: null, relevance: "Grounds for disciplinary action", jurisdiction: "CA", url: null },
      { citation: "Cal. Evid. Code § 730", sourceType: "statute", shortDescription: "Court-appointed expert witnesses", fullText: null, relevance: "Standards for court-appointed evaluators", jurisdiction: "CA", url: null },
    ],
  },
  {
    practiceArea: "ATTORNEY_CONDUCT",
    primaryAuthorities: [
      { citation: "Cal. Rules of Prof. Conduct, Rule 1.1", sourceType: "rule", shortDescription: "Competence", fullText: null, relevance: "Duty of competent representation", jurisdiction: "CA", url: null },
      { citation: "Cal. Rules of Prof. Conduct, Rule 1.4", sourceType: "rule", shortDescription: "Communication with clients", fullText: null, relevance: "Duty to keep client informed", jurisdiction: "CA", url: null },
      { citation: "Cal. Rules of Prof. Conduct, Rule 1.7", sourceType: "rule", shortDescription: "Conflict of interest: current clients", fullText: null, relevance: "Concurrent conflict analysis", jurisdiction: "CA", url: null },
      { citation: "Cal. Rules of Prof. Conduct, Rule 3.3", sourceType: "rule", shortDescription: "Candor toward the tribunal", fullText: null, relevance: "Duty of truthfulness to court", jurisdiction: "CA", url: null },
      { citation: "Cal. Bus. & Prof. Code § 6068", sourceType: "statute", shortDescription: "Duties of attorneys", fullText: null, relevance: "Statutory duties of California attorneys", jurisdiction: "CA", url: null },
    ],
  },
  {
    practiceArea: "VICTIM_RIGHTS",
    primaryAuthorities: [
      { citation: "Cal. Const. art. I, § 28(b)", sourceType: "statute", shortDescription: "Marsy's Law - Victims' Bill of Rights", fullText: null, relevance: "Constitutional victim rights in California", jurisdiction: "CA", url: null },
      { citation: "Cal. Pen. Code § 679.02", sourceType: "statute", shortDescription: "Enforcement of victim rights", fullText: null, relevance: "Mechanism for enforcing Marsy's Law rights", jurisdiction: "CA", url: null },
      { citation: "Cal. Pen. Code § 679.026", sourceType: "statute", shortDescription: "Victim notification requirements", fullText: null, relevance: "DA/agency notification duties", jurisdiction: "CA", url: null },
    ],
  },
  {
    practiceArea: "FCRA_CONSUMER_REPORT",
    primaryAuthorities: [
      { citation: "15 U.S.C. § 1681", sourceType: "statute", shortDescription: "Fair Credit Reporting Act", fullText: null, relevance: "Federal consumer report accuracy and dispute framework", jurisdiction: "Federal", url: null },
      { citation: "15 U.S.C. § 1681i", sourceType: "statute", shortDescription: "Procedure in case of disputed accuracy", fullText: null, relevance: "Reinvestigation requirements and timelines", jurisdiction: "Federal", url: null },
      { citation: "Cal. Civ. Code § 1785.1 et seq.", sourceType: "statute", shortDescription: "California Consumer Credit Reporting Agencies Act", fullText: null, relevance: "California-specific consumer report protections", jurisdiction: "CA", url: null },
    ],
  },
  {
    practiceArea: "LABOR_EMPLOYMENT",
    primaryAuthorities: [
      { citation: "Cal. Lab. Code § 1102.5", sourceType: "statute", shortDescription: "Whistleblower protection", fullText: null, relevance: "Protection from retaliation for reporting violations", jurisdiction: "CA", url: null },
      { citation: "Cal. Lab. Code § 226", sourceType: "statute", shortDescription: "Itemized wage statements", fullText: null, relevance: "Employer wage statement requirements", jurisdiction: "CA", url: null },
      { citation: "29 U.S.C. § 158", sourceType: "statute", shortDescription: "NLRA unfair labor practices", fullText: null, relevance: "Federal unfair labor practice framework", jurisdiction: "Federal", url: null },
    ],
  },
  {
    practiceArea: "INSURANCE_BAD_FAITH",
    primaryAuthorities: [
      { citation: "Cal. Ins. Code § 790.03", sourceType: "statute", shortDescription: "Unfair methods of competition and unfair practices", fullText: null, relevance: "Defines unfair claims settlement practices", jurisdiction: "CA", url: null },
      { citation: "10 CCR § 2695.1 et seq.", sourceType: "regulation", shortDescription: "Fair Claims Settlement Practices Regulations", fullText: null, relevance: "Detailed requirements for claims handling", jurisdiction: "CA", url: null },
    ],
  },
  {
    practiceArea: "COURT_ORDER_COMPLIANCE",
    primaryAuthorities: [
      { citation: "CRC Rule 3.1110", sourceType: "rule", shortDescription: "Format of papers", fullText: null, relevance: "Formatting requirements for court filings", jurisdiction: "CA", url: null },
      { citation: "Cal. Code Civ. Proc. § 1005", sourceType: "statute", shortDescription: "Notice of motion", fullText: null, relevance: "Motion notice and timing requirements", jurisdiction: "CA", url: null },
    ],
  },
  {
    practiceArea: "MILITARY_JUSTICE",
    primaryAuthorities: [
      { citation: "10 U.S.C. § 801 et seq.", sourceType: "statute", shortDescription: "Uniform Code of Military Justice", fullText: null, relevance: "Military criminal and disciplinary framework", jurisdiction: "Federal", url: null },
      { citation: "MCO P1900.16F", sourceType: "standard", shortDescription: "Marine Corps Separation and Retirement Manual", fullText: null, relevance: "Standards for administrative separations", jurisdiction: "Federal", url: null },
    ],
  },
];

function getAuthoritiesForPracticeArea(practiceArea: string): AuthorityEntry[] {
  const mapping = AUTHORITY_MAPPINGS.find(m => m.practiceArea === practiceArea);
  return mapping?.primaryAuthorities || [];
}

function compileAuthoritiesInternal(practiceAreas: string[]): AuthorityEntry[] {
  const seen = new Set<string>();
  const authorities: AuthorityEntry[] = [];
  for (const area of practiceAreas) {
    for (const auth of getAuthoritiesForPracticeArea(area)) {
      if (!seen.has(auth.citation)) {
        seen.add(auth.citation);
        authorities.push(auth);
      }
    }
  }
  return authorities;
}

// ════════════════════════════════════════════════════════════════
// CCP DEADLINE CALCULATOR — California court holiday awareness
// ════════════════════════════════════════════════════════════════

// California court holidays (2026)
const COURT_HOLIDAYS_2026: number[] = [
  new Date("2026-01-01").getTime(), // New Year's Day
  new Date("2026-01-19").getTime(), // MLK Day
  new Date("2026-02-12").getTime(), // Lincoln's Birthday
  new Date("2026-02-16").getTime(), // Presidents' Day
  new Date("2026-03-31").getTime(), // Cesar Chavez Day
  new Date("2026-05-25").getTime(), // Memorial Day
  new Date("2026-06-19").getTime(), // Juneteenth
  new Date("2026-07-03").getTime(), // Independence Day observed
  new Date("2026-09-07").getTime(), // Labor Day
  new Date("2026-09-09").getTime(), // Admission Day (observed)
  new Date("2026-10-12").getTime(), // Columbus Day
  new Date("2026-11-11").getTime(), // Veterans Day
  new Date("2026-11-26").getTime(), // Thanksgiving
  new Date("2026-11-27").getTime(), // Day after Thanksgiving
  new Date("2026-12-25").getTime(), // Christmas
];

function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

function isCourtHoliday(date: Date): boolean {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return COURT_HOLIDAYS_2026.includes(normalized.getTime());
}

function isCourtClosed(date: Date): boolean {
  return isWeekend(date) || isCourtHoliday(date);
}

function extendToNextCourtDay(date: Date): Date {
  const result = new Date(date);
  while (isCourtClosed(result)) {
    result.setDate(result.getDate() + 1);
  }
  return result;
}

function addCalendarDays(from: Date, days: number): Date {
  const result = new Date(from);
  result.setDate(result.getDate() + days);
  return extendToNextCourtDay(result);
}

function addCourtDays(from: Date, days: number): Date {
  const result = new Date(from);
  let counted = 0;
  while (counted < days) {
    result.setDate(result.getDate() + 1);
    if (!isCourtClosed(result)) {
      counted++;
    }
  }
  return result;
}

function subtractCourtDays(from: Date, days: number): Date {
  const result = new Date(from);
  let counted = 0;
  while (counted < days) {
    result.setDate(result.getDate() - 1);
    if (!isCourtClosed(result)) {
      counted++;
    }
  }
  return result;
}

function daysRemainingFn(deadline: Date): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(deadline);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function deadlineStatus(remaining: number): "upcoming" | "imminent" | "overdue" | "completed" {
  if (remaining < 0) return "overdue";
  if (remaining <= 5) return "imminent";
  return "upcoming";
}

function getServiceExtension(method: string): { days: number; basis: string } {
  switch (method) {
    case "personal": return { days: 0, basis: "CCP § 1011 - No extension for personal service" };
    case "mail": return { days: 5, basis: "CCP § 1013(a) - 5 calendar days for mail within California" };
    case "electronic": return { days: 2, basis: "CCP § 1010.6(a)(4)(B) - 2 court days for electronic service" };
    case "overnight": return { days: 2, basis: "CCP § 1013(c) - 2 court days for overnight delivery" };
    case "fax": return { days: 2, basis: "CCP § 1013(e) - 2 court days for fax service" };
    default: return { days: 0, basis: "Unknown method - no extension applied" };
  }
}

// Motion deadline templates — CCP timeline definitions
interface MotionDeadlineTemplate {
  name: string;
  deadlines: Array<{
    description: string;
    daysFromHearing: number;
    type: "calendar" | "court";
    statutoryBasis: string;
    direction: "before_hearing" | "after_filing" | "after_service";
  }>;
}

const MOTION_DEADLINE_TEMPLATES: Record<string, MotionDeadlineTemplate> = {
  motion_to_compel: {
    name: "Motion to Compel Discovery",
    deadlines: [
      { description: "Motion must be filed and served", daysFromHearing: 16, type: "court", statutoryBasis: "CCP § 1005(b) - 16 court days before hearing", direction: "before_hearing" },
      { description: "Opposition due", daysFromHearing: 9, type: "court", statutoryBasis: "CCP § 1005(b) - 9 court days before hearing", direction: "before_hearing" },
      { description: "Reply due", daysFromHearing: 5, type: "court", statutoryBasis: "CCP § 1005(b) - 5 court days before hearing", direction: "before_hearing" },
    ],
  },
  demurrer: {
    name: "Demurrer",
    deadlines: [
      { description: "Demurrer must be filed and served", daysFromHearing: 16, type: "court", statutoryBasis: "CCP § 1005(b) - 16 court days before hearing", direction: "before_hearing" },
      { description: "Opposition due", daysFromHearing: 9, type: "court", statutoryBasis: "CCP § 1005(b) - 9 court days before hearing", direction: "before_hearing" },
      { description: "Reply due", daysFromHearing: 5, type: "court", statutoryBasis: "CCP § 1005(b) - 5 court days before hearing", direction: "before_hearing" },
      { description: "Demurrer must be filed within 30 days of answer deadline", daysFromHearing: 0, type: "calendar", statutoryBasis: "CCP § 430.40(a) - 30 calendar days after service of complaint", direction: "after_service" },
    ],
  },
  ex_parte: {
    name: "Ex Parte Application",
    deadlines: [
      { description: "Notice to opposing party by 10:00 AM the court day before", daysFromHearing: 1, type: "court", statutoryBasis: "CRC Rule 3.1204(a) - Notice by 10:00 AM previous court day", direction: "before_hearing" },
      { description: "Declaration of notice or attempts at notice", daysFromHearing: 0, type: "court", statutoryBasis: "CRC Rule 3.1204(b) - Declaration required with application", direction: "before_hearing" },
    ],
  },
  motion_for_sanctions: {
    name: "Motion for Sanctions (CCP § 128.7)",
    deadlines: [
      { description: "Safe harbor: serve motion on opposing party", daysFromHearing: 21, type: "calendar", statutoryBasis: "CCP § 128.7(c)(1) - 21-day safe harbor period", direction: "before_hearing" },
      { description: "If not withdrawn, file motion with court", daysFromHearing: 16, type: "court", statutoryBasis: "CCP § 1005(b) + § 128.7(c)(1)", direction: "before_hearing" },
      { description: "Opposition due", daysFromHearing: 9, type: "court", statutoryBasis: "CCP § 1005(b)", direction: "before_hearing" },
      { description: "Reply due", daysFromHearing: 5, type: "court", statutoryBasis: "CCP § 1005(b)", direction: "before_hearing" },
    ],
  },
  motion_to_quash: {
    name: "Motion to Quash Service of Summons",
    deadlines: [
      { description: "Must be filed on or before last day to respond to complaint", daysFromHearing: 0, type: "calendar", statutoryBasis: "CCP § 418.10(a) - Filed before or concurrent with response deadline", direction: "after_service" },
      { description: "Motion hearing: 16 court days notice", daysFromHearing: 16, type: "court", statutoryBasis: "CCP § 1005(b)", direction: "before_hearing" },
    ],
  },
  motion_for_reconsideration: {
    name: "Motion for Reconsideration",
    deadlines: [
      { description: "Must be filed within 10 days of service of notice of entry of order", daysFromHearing: 10, type: "calendar", statutoryBasis: "CCP § 1008(a) - 10 days from service of notice of entry", direction: "after_service" },
    ],
  },
  response_to_complaint: {
    name: "Response to Complaint",
    deadlines: [
      { description: "Answer or responsive pleading due (personal service)", daysFromHearing: 30, type: "calendar", statutoryBasis: "CCP § 412.20(a)(3) - 30 calendar days from service", direction: "after_service" },
    ],
  },
  OSC: {
    name: "Order to Show Cause",
    deadlines: [
      { description: "Responsive declaration due", daysFromHearing: 9, type: "court", statutoryBasis: "CRC Rule 5.92(d) - 9 court days before hearing (family law)", direction: "before_hearing" },
      { description: "Reply declaration due", daysFromHearing: 5, type: "court", statutoryBasis: "CRC Rule 5.92(e) - 5 court days before hearing (family law)", direction: "before_hearing" },
    ],
  },
};

// ════════════════════════════════════════════════════════════════
// LOCAL RULES — California county court rules database
// ════════════════════════════════════════════════════════════════

const COUNTY_RULES: Record<string, Omit<CountyRuleSet, "department" | "lastUpdated">> = {
  alameda: {
    jurisdiction: "CA",
    county: "Alameda",
    courtName: "Superior Court of California, County of Alameda",
    courtAddress: "1221 Oak Street, Oakland, CA 94612",
    clerkPhone: "(510) 891-6012",
    eFilingUrl: "https://www.alameda.courts.ca.gov/online-services/efiling",
    rules: [
      { ruleId: "ALA-FMT-001", category: "formatting", description: "Paper size and margins", requirement: "8.5 x 11 inches, 1-inch margins on all sides. 28 lines per page maximum.", source: "Alameda County Local Rule 3.30" },
      { ruleId: "ALA-FMT-002", category: "formatting", description: "Font requirements", requirement: "12-point font minimum. Proportionally spaced fonts must be 12-point minimum; monospaced fonts must be 10-point minimum, no more than 10 characters per inch.", source: "CRC Rule 2.104" },
      { ruleId: "ALA-FMT-003", category: "formatting", description: "Line numbering", requirement: "All papers must have line numbers in the left margin.", source: "CRC Rule 2.108" },
      { ruleId: "ALA-FMT-004", category: "formatting", description: "Footer", requirement: "Each page must include the document title in the footer.", source: "CRC Rule 2.110" },
      { ruleId: "ALA-FILE-001", category: "filing", description: "E-filing requirement", requirement: "E-filing is mandatory for represented parties in civil cases. Self-represented litigants may file on paper or electronically.", source: "Alameda County Local Rule 3.31" },
      { ruleId: "ALA-FILE-002", category: "filing", description: "Courtesy copies", requirement: "Courtesy copies required for all motions. Must be delivered to the department within 2 court days of filing.", source: "Alameda County Local Rule 3.30(c)" },
      { ruleId: "ALA-FILE-003", category: "filing", description: "Proposed orders", requirement: "All motions must include a proposed order as a separate document.", source: "CRC Rule 3.1312" },
      { ruleId: "ALA-DEPT-001", category: "department", description: "Family law department assignments", requirement: "Family law matters are heard in departments 501-514 at Hayward Hall of Justice, 24405 Amador Street, Hayward, CA 94544.", source: "Alameda County Superior Court - Family Law Division" },
      { ruleId: "ALA-EFIL-001", category: "efiling", description: "E-filing service provider", requirement: "E-filing available through approved providers including File & ServeXpress and One Legal.", source: "Alameda County Local Rule 3.31" },
    ],
  },
  solano: {
    jurisdiction: "CA",
    county: "Solano",
    courtName: "Superior Court of California, County of Solano",
    courtAddress: "600 Union Avenue, Fairfield, CA 94533",
    clerkPhone: "(707) 207-7320",
    eFilingUrl: "https://www.solano.courts.ca.gov/efiling",
    rules: [
      { ruleId: "SOL-FMT-001", category: "formatting", description: "Paper format", requirement: "Standard 8.5 x 11 paper, 28 lines per page, line numbers required.", source: "Solano County Local Rules, General Provisions" },
      { ruleId: "SOL-FMT-002", category: "formatting", description: "Tabs and exhibits", requirement: "Exhibits must be separated by numbered tabs.", source: "Solano County Local Rules" },
      { ruleId: "SOL-FILE-001", category: "filing", description: "Filing hours", requirement: "Clerk's office open 8:00 AM - 4:00 PM. Documents filed after 4:00 PM are deemed filed the next business day.", source: "Solano County Superior Court Operations" },
      { ruleId: "SOL-FILE-002", category: "filing", description: "E-filing", requirement: "E-filing available but not mandatory for self-represented litigants.", source: "Solano County Local Rules" },
      { ruleId: "SOL-DEPT-001", category: "department", description: "Family law departments", requirement: "Family law matters heard at Fairfield courthouse. Contact clerk for specific department assignment.", source: "Solano County Superior Court" },
      { ruleId: "SOL-GEN-001", category: "general", description: "Tentative rulings", requirement: "Tentative rulings posted by 2:00 PM the court day before hearing. Parties must check tentative ruling system.", source: "Solano County Local Rules" },
    ],
  },
  marin: {
    jurisdiction: "CA",
    county: "Marin",
    courtName: "Superior Court of California, County of Marin",
    courtAddress: "3501 Civic Center Drive, San Rafael, CA 94903",
    clerkPhone: "(415) 444-7020",
    eFilingUrl: "https://www.marincourt.org/efiling",
    rules: [
      { ruleId: "MAR-FMT-001", category: "formatting", description: "Paper format", requirement: "Standard CRC formatting. 8.5 x 11, line numbers, 28 lines per page.", source: "Marin County Local Rules" },
      { ruleId: "MAR-FILE-001", category: "filing", description: "Meet and confer requirement", requirement: "All discovery motions must include a meet and confer declaration per CCP § 2016.040.", source: "Marin County Local Rule 4.7" },
      { ruleId: "MAR-FILE-002", category: "filing", description: "Page limits", requirement: "Memoranda in support of motions limited to 15 pages unless leave of court obtained.", source: "CRC Rule 3.1113(d)" },
      { ruleId: "MAR-DEPT-001", category: "department", description: "Family law department", requirement: "Family law matters typically heard in Department F. Check court website for current assignments.", source: "Marin County Superior Court" },
      { ruleId: "MAR-GEN-001", category: "general", description: "Tentative rulings", requirement: "Tentative rulings available after 2:00 PM the court day before hearing via court website.", source: "Marin County Local Rules" },
    ],
  },
  "san francisco": {
    jurisdiction: "CA",
    county: "San Francisco",
    courtName: "Superior Court of California, County of San Francisco",
    courtAddress: "400 McAllister Street, San Francisco, CA 94102",
    clerkPhone: "(415) 551-4000",
    eFilingUrl: "https://www.sfsuperiorcourt.org/online-services/efiling",
    rules: [
      { ruleId: "SF-FMT-001", category: "formatting", description: "Paper format", requirement: "Standard CRC formatting requirements apply.", source: "SF Local Rules" },
      { ruleId: "SF-FILE-001", category: "filing", description: "E-filing mandatory", requirement: "E-filing mandatory for all civil cases for represented parties.", source: "SF Local Rule 2.0" },
      { ruleId: "SF-FILE-002", category: "filing", description: "Ex parte applications", requirement: "Ex parte applications must be filed by 10:00 AM. Notice to opposing party by 10:00 AM the prior court day.", source: "SF Local Rule 7.2" },
    ],
  },
  "contra costa": {
    jurisdiction: "CA",
    county: "Contra Costa",
    courtName: "Superior Court of California, County of Contra Costa",
    courtAddress: "725 Court Street, Martinez, CA 94553",
    clerkPhone: "(925) 608-1000",
    eFilingUrl: "https://www.cc-courts.org/efiling",
    rules: [
      { ruleId: "CC-FMT-001", category: "formatting", description: "Paper format", requirement: "Standard CRC formatting. Tabbed exhibits required.", source: "Contra Costa Local Rules" },
      { ruleId: "CC-FILE-001", category: "filing", description: "Courtesy copies", requirement: "Judge's copy required for all motions. Must be stamped 'JUDGE'S COPY' and delivered to department.", source: "Contra Costa Local Rule 3.42" },
      { ruleId: "CC-GEN-001", category: "general", description: "Tentative rulings", requirement: "Available after 1:30 PM the court day before hearing via court phone system.", source: "Contra Costa Local Rules" },
    ],
  },
};

function getGenericCRCRules(): LocalRuleEntry[] {
  return [
    { ruleId: "CRC-FMT-001", category: "formatting", description: "Paper size (CRC Rule 2.100)", requirement: "8.5 x 11 inches, recycled paper preferred.", source: "CRC Rule 2.100" },
    { ruleId: "CRC-FMT-002", category: "formatting", description: "Font (CRC Rule 2.104)", requirement: "Proportionally spaced: 12-point minimum. Monospaced: 10-point minimum.", source: "CRC Rule 2.104" },
    { ruleId: "CRC-FMT-003", category: "formatting", description: "Line numbering (CRC Rule 2.108)", requirement: "Consecutively numbered lines, not exceeding 28 per page.", source: "CRC Rule 2.108" },
    { ruleId: "CRC-FMT-004", category: "formatting", description: "Footer (CRC Rule 2.110)", requirement: "Each page must include the page number and document title.", source: "CRC Rule 2.110" },
    { ruleId: "CRC-FILE-001", category: "filing", description: "Proof of service (CRC Rule 3.1300)", requirement: "Proof of service must be filed for all motions.", source: "CRC Rule 3.1300" },
    { ruleId: "CRC-FILE-002", category: "filing", description: "Memorandum of points and authorities (CRC Rule 3.1113)", requirement: "Required for all motions except those based solely on declarations. 15-page limit.", source: "CRC Rule 3.1113" },
    { ruleId: "CRC-FILE-003", category: "filing", description: "Proposed order (CRC Rule 3.1312)", requirement: "Proposed order must accompany every motion.", source: "CRC Rule 3.1312" },
  ];
}

// ════════════════════════════════════════════════════════════════
// MOTION TEMPLATE GENERATOR — 8 motion type definitions
// ════════════════════════════════════════════════════════════════

interface MotionTypeDefinition {
  title: string;
  statutoryBasis: string;
  requiredSections: string[];
  optionalSections: string[];
  specialRequirements: string[];
}

const MOTION_TYPES: Record<string, MotionTypeDefinition> = {
  ex_parte: {
    title: "EX PARTE APPLICATION",
    statutoryBasis: "CRC Rules 3.1200-3.1207",
    requiredSections: ["application", "declaration_of_notice", "memorandum", "declaration_of_facts", "proposed_order"],
    optionalSections: ["declaration_of_irreparable_harm"],
    specialRequirements: [
      "Must demonstrate irreparable harm, immediate danger, or statutory authorization",
      "Notice to opposing party by 10:00 AM the court day before (CRC Rule 3.1204)",
      "Declaration of notice or good faith attempts required",
      "Appearance required unless court permits submission on papers",
    ],
  },
  demurrer: {
    title: "DEMURRER",
    statutoryBasis: "CCP §§ 430.10-430.80",
    requiredSections: ["notice_of_demurrer", "demurrer", "memorandum", "proposed_order"],
    optionalSections: ["request_for_judicial_notice"],
    specialRequirements: [
      "Must be filed within 30 days of service of complaint (CCP § 430.40)",
      "Must specify grounds per CCP § 430.10",
      "Meet and confer declaration required (CCP § 430.41)",
      "Cannot introduce extrinsic evidence — face of pleading only",
    ],
  },
  motion_to_compel: {
    title: "MOTION TO COMPEL",
    statutoryBasis: "CCP §§ 2030.300, 2031.310, 2033.290",
    requiredSections: ["notice_of_motion", "memorandum", "declaration_of_meet_and_confer", "separate_statement", "proposed_order"],
    optionalSections: ["request_for_sanctions"],
    specialRequirements: [
      "Separate statement of disputed discovery required (CRC Rule 3.1345)",
      "Meet and confer declaration mandatory (CCP § 2016.040)",
      "45-day deadline from service of deficient response (CCP § 2030.300(c))",
      "Filing fee required",
    ],
  },
  motion_to_strike: {
    title: "MOTION TO STRIKE",
    statutoryBasis: "CCP §§ 435-437",
    requiredSections: ["notice_of_motion", "memorandum", "proposed_order"],
    optionalSections: ["declaration", "request_for_judicial_notice"],
    specialRequirements: [
      "Must identify specific matter to be stricken",
      "Must be filed within time to respond to complaint",
      "Meet and confer required (CCP § 435.5)",
    ],
  },
  motion_for_sanctions: {
    title: "MOTION FOR SANCTIONS",
    statutoryBasis: "CCP § 128.7",
    requiredSections: ["notice_of_motion", "memorandum", "declaration", "proposed_order"],
    optionalSections: ["declaration_of_costs"],
    specialRequirements: [
      "21-day safe harbor: serve motion, wait 21 days before filing (CCP § 128.7(c)(1))",
      "Must specify the sanctionable conduct",
      "Must state amount of sanctions sought and basis for calculation",
      "Discovery sanctions governed by CCP § 2023.030 instead",
    ],
  },
  motion_for_reconsideration: {
    title: "MOTION FOR RECONSIDERATION",
    statutoryBasis: "CCP § 1008",
    requiredSections: ["notice_of_motion", "memorandum", "declaration_of_new_facts", "proposed_order"],
    optionalSections: [],
    specialRequirements: [
      "Must be filed within 10 days of service of notice of entry of order (CCP § 1008(a))",
      "Must present new or different facts, circumstances, or law",
      "Declaration must state what new facts/law are presented and why not presented earlier",
      "Penalty of perjury attestation required (CCP § 1008(d))",
    ],
  },
  motion_to_quash: {
    title: "MOTION TO QUASH SERVICE OF SUMMONS",
    statutoryBasis: "CCP § 418.10",
    requiredSections: ["notice_of_motion", "memorandum", "declaration", "proposed_order"],
    optionalSections: [],
    specialRequirements: [
      "Must be filed on or before last day to respond to complaint (CCP § 418.10(a))",
      "Filing does not constitute general appearance",
      "Burden on plaintiff to prove valid service",
      "Specify defects in service with particularity",
    ],
  },
  OSC: {
    title: "ORDER TO SHOW CAUSE",
    statutoryBasis: "CRC Rule 5.92 (Family Law)",
    requiredSections: ["request_for_order", "declaration", "income_and_expense", "proposed_order"],
    optionalSections: ["custody_declaration", "property_declaration"],
    specialRequirements: [
      "Use Judicial Council form FL-300 (Request for Order)",
      "FL-150 (Income and Expense Declaration) required for support issues",
      "FL-310 (Application for Order and Supporting Declaration) for DV matters",
      "Responsive declaration due 9 court days before hearing (CRC Rule 5.92(d))",
    ],
  },
};

// ════════════════════════════════════════════════════════════════
// CONFLICT CHECK — Name matching algorithms
// ════════════════════════════════════════════════════════════════

function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z\s]/g, "")
    .replace(/\s+/g, " ")
    .replace(/\b(jr|sr|ii|iii|iv|esq|md|phd|dds)\b/g, "")
    .trim();
}

function normalizeEntity(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\b(inc|llc|llp|corp|ltd|co|company|corporation|limited|partnership)\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function soundex(name: string): string {
  const normalized = normalizeName(name).replace(/\s/g, "");
  if (!normalized) return "";
  const codes: Record<string, string> = {
    b: "1", f: "1", p: "1", v: "1",
    c: "2", g: "2", j: "2", k: "2", q: "2", s: "2", x: "2", z: "2",
    d: "3", t: "3",
    l: "4",
    m: "5", n: "5",
    r: "6",
  };
  let result = normalized[0]!.toUpperCase();
  let lastCode = codes[normalized[0]!] || "";
  for (let i = 1; i < normalized.length && result.length < 4; i++) {
    const code = codes[normalized[i]!] || "";
    if (code && code !== lastCode) {
      result += code;
    }
    lastCode = code || lastCode;
  }
  return result.padEnd(4, "0");
}

function phoneticMatch(name1: string, name2: string): boolean {
  const parts1 = normalizeName(name1).split(" ").filter(Boolean);
  const parts2 = normalizeName(name2).split(" ").filter(Boolean);
  if (parts1.length === 0 || parts2.length === 0) return false;
  const lastName1 = parts1[parts1.length - 1]!;
  const lastName2 = parts2[parts2.length - 1]!;
  if (soundex(lastName1) !== soundex(lastName2)) return false;
  if (parts1.length > 1 && parts2.length > 1) {
    return parts1[0]![0] === parts2[0]![0];
  }
  return true;
}

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= a.length; i++) matrix[i] = [i];
  for (let j = 0; j <= b.length; j++) matrix[0]![j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i]![j] = Math.min(
        matrix[i - 1]![j]! + 1,
        matrix[i]![j - 1]! + 1,
        matrix[i - 1]![j - 1]! + cost,
      );
    }
  }
  return matrix[a.length]![b.length]!;
}

function similarityScore(a: string, b: string): number {
  const na = normalizeName(a);
  const nb = normalizeName(b);
  if (na === nb) return 1.0;
  const maxLen = Math.max(na.length, nb.length);
  if (maxLen === 0) return 0;
  return 1 - levenshteinDistance(na, nb) / maxLen;
}

const NAME_ALIASES: Record<string, string[]> = {
  michael: ["mike", "mick", "mickey", "mikey"],
  robert: ["bob", "rob", "bobby", "robbie", "bert"],
  william: ["bill", "will", "billy", "willy", "liam"],
  james: ["jim", "jimmy", "jamie"],
  john: ["jack", "johnny", "jon"],
  richard: ["rick", "dick", "rich", "richie"],
  thomas: ["tom", "tommy"],
  joseph: ["joe", "joey"],
  charles: ["charlie", "chuck", "chas"],
  christopher: ["chris", "kit"],
  daniel: ["dan", "danny"],
  matthew: ["matt", "matty"],
  anthony: ["tony", "ant"],
  elizabeth: ["liz", "beth", "betty", "eliza", "lizzy"],
  jennifer: ["jen", "jenny"],
  patricia: ["pat", "patty", "trish"],
  catherine: ["kate", "cathy", "kathy", "katie", "cat"],
  margaret: ["maggie", "meg", "peggy", "marge"],
  jessica: ["jess", "jessie"],
  alexander: ["alex", "al", "xander"],
  benjamin: ["ben", "benny"],
  nicholas: ["nick", "nicky"],
  edward: ["ed", "eddie", "ted", "teddy"],
  samuel: ["sam", "sammy"],
  david: ["dave", "davey"],
  steven: ["steve", "stevie"],
  kenneth: ["ken", "kenny"],
  ronald: ["ron", "ronnie"],
  timothy: ["tim", "timmy"],
  andrew: ["andy", "drew"],
  gregory: ["greg"],
  joshua: ["josh"],
  jonathan: ["jon", "jonny"],
  lawrence: ["larry"],
  raymond: ["ray"],
  gerald: ["jerry"],
  dennis: ["denny"],
  harold: ["harry", "hal"],
  henry: ["hank", "harry"],
};

function isAliasMatch(name1: string, name2: string): boolean {
  const parts1 = normalizeName(name1).split(" ").filter(Boolean);
  const parts2 = normalizeName(name2).split(" ").filter(Boolean);
  if (parts1.length === 0 || parts2.length === 0) return false;
  const first1 = parts1[0]!;
  const first2 = parts2[0]!;
  const last1 = parts1[parts1.length - 1]!;
  const last2 = parts2[parts2.length - 1]!;
  if (similarityScore(last1, last2) < 0.8) return false;
  if (first1 === first2) return true;
  for (const [canonical, aliases] of Object.entries(NAME_ALIASES)) {
    const allVariants = [canonical, ...aliases];
    if (allVariants.includes(first1) && allVariants.includes(first2)) {
      return true;
    }
  }
  return false;
}

// ════════════════════════════════════════════════════════════════
// MOTION TEMPLATE SECTION BUILDERS
// ════════════════════════════════════════════════════════════════

function buildNoticeSection(caption: MotionCaption, def: MotionTypeDefinition): string {
  return `TO ALL PARTIES AND THEIR ATTORNEYS OF RECORD:

PLEASE TAKE NOTICE that on ${caption.hearingDate} at ${caption.hearingTime}, or as soon thereafter as the matter may be heard, in Department ${caption.department} of the above-entitled court, located at [COURT ADDRESS], ${caption.filingParty} will and hereby does move this Court for the following:

[STATE SPECIFIC RELIEF SOUGHT]

This ${def.title.toLowerCase()} is made pursuant to ${def.statutoryBasis} on the grounds that:

[STATE GROUNDS]

This ${def.title.toLowerCase()} is based on this Notice, the attached Memorandum of Points and Authorities, the Declaration of [DECLARANT NAME], all papers and records on file in this action, and such oral argument as may be presented at the hearing.

DATED: [DATE]

Respectfully submitted,

___________________________
${caption.filingParty}
[Address]
[Phone]
[Email]`;
}

function buildRequestForOrderSection(_caption: MotionCaption): string {
  return `[USE JUDICIAL COUNCIL FORM FL-300]

Petitioner/Respondent requests the following orders:

[ ] Child custody    [ ] Visitation (parenting time)
[ ] Child support    [ ] Spousal support
[ ] Property control [ ] Attorney fees and costs
[ ] Other: [SPECIFY]

FACTS IN SUPPORT:
[State the facts that support your request. Reference attached declaration for details.]`;
}

function buildMemorandum(
  def: MotionTypeDefinition,
  findings: AuditFindingInput[],
  authorities: AuthorityEntry[],
  incorporateFindings: boolean,
): { text: string; exhibitRefs: string[] } {
  const exhibitRefs: string[] = [];
  let text = "";

  text += `I. INTRODUCTION\n\n`;
  text += `[Brief overview of the motion and relief sought. 2-3 sentences maximum.]\n\n`;

  text += `II. STATEMENT OF RELEVANT FACTS\n\n`;
  text += `[Chronological recitation of relevant facts. Each fact should reference supporting evidence.]\n\n`;

  if (incorporateFindings && findings.length > 0) {
    text += `A VERNEN forensic audit of the relevant documents identified the following deficiencies:\n\n`;
    const sorted = [
      ...findings.filter(f => f.severity === "CRITICAL"),
      ...findings.filter(f => f.severity === "HIGH"),
      ...findings.filter(f => f.severity !== "CRITICAL" && f.severity !== "HIGH"),
    ];
    let exhibitCounter = 1;
    for (const f of sorted) {
      const exhibitLabel = `Exhibit ${String.fromCharCode(64 + exhibitCounter)}`;
      text += `${exhibitCounter}. [${f.severity}] ${f.description}`;
      if (f.statutoryCitation) text += ` (See ${f.statutoryCitation})`;
      if (f.evidenceReference) {
        text += ` (${exhibitLabel}: ${f.evidenceReference})`;
        exhibitRefs.push(exhibitLabel);
      }
      text += `\n`;
      exhibitCounter++;
    }
    text += `\n`;
  }

  text += `III. LEGAL ARGUMENT\n\n`;
  text += `A. Standard of Review\n\n`;
  text += `[State the applicable standard. Reference ${def.statutoryBasis}.]\n\n`;
  text += `B. [FIRST ARGUMENT HEADING]\n\n`;
  text += `[Argument with citations to authority.]\n\n`;

  if (authorities.length > 0) {
    text += `The following authorities support the relief sought:\n\n`;
    for (const auth of authorities.slice(0, 10)) {
      text += `${auth.citation} — ${auth.relevance}\n`;
    }
    text += `\n`;
  }

  text += `C. [SECOND ARGUMENT HEADING]\n\n`;
  text += `[Additional argument.]\n\n`;

  text += `IV. CONCLUSION\n\n`;
  text += `For the foregoing reasons, [FILING PARTY] respectfully requests that this Court grant the ${def.title.toLowerCase()} and [STATE SPECIFIC RELIEF].\n`;

  return { text, exhibitRefs };
}

function buildDeclaration(findings: AuditFindingInput[], incorporateFindings: boolean): { text: string; exhibitRefs: string[] } {
  const exhibitRefs: string[] = [];
  let text = "";
  text += `I, [DECLARANT NAME], declare as follows:\n\n`;
  text += `1. I am [RELATIONSHIP TO CASE]. I have personal knowledge of the facts stated herein and, if called as a witness, could and would competently testify thereto.\n\n`;
  text += `2. [STATE FACTS IN NUMBERED PARAGRAPHS]\n\n`;

  if (incorporateFindings && findings.length > 0) {
    let paraNum = 3;
    for (const f of findings) {
      text += `${paraNum}. ${f.description}`;
      if (f.evidenceReference) {
        const label = `Exhibit ${String.fromCharCode(64 + paraNum - 2)}`;
        text += ` A true and correct copy of ${f.evidenceReference} is attached hereto as ${label}.`;
        exhibitRefs.push(label);
      }
      text += `\n\n`;
      paraNum++;
    }
  }

  text += `I declare under penalty of perjury under the laws of the State of California that the foregoing is true and correct.\n\n`;
  text += `Executed on [DATE] at [CITY], California.\n\n`;
  text += `___________________________\n[DECLARANT NAME]\n`;
  return { text, exhibitRefs };
}

function buildNoticeDeclaration(): string {
  return `I, [DECLARANT NAME], declare as follows:

1. I am [RELATIONSHIP TO CASE].

2. On [DATE], at approximately [TIME], I provided notice of this ex parte application to [OPPOSING PARTY/COUNSEL] by the following method:

   [ ] Telephone to [NUMBER] at [TIME]
   [ ] Email to [ADDRESS] at [TIME]
   [ ] Fax to [NUMBER] at [TIME]
   [ ] Personal delivery at [TIME]

3. [If unable to provide notice:]
   I made the following good faith efforts to provide notice:
   [DESCRIBE ATTEMPTS]

4. Notice was/was not successfully provided. [DESCRIBE RESPONSE IF ANY]

I declare under penalty of perjury under the laws of the State of California that the foregoing is true and correct.

Executed on [DATE] at [CITY], California.

___________________________
[DECLARANT NAME]`;
}

function buildMeetAndConfer(): string {
  return `I, [DECLARANT NAME], declare as follows:

1. I am [RELATIONSHIP TO CASE].

2. Pursuant to CCP § 2016.040, I made a good faith attempt to resolve the issues presented in this motion informally before filing.

3. On [DATE], I [contacted opposing party/counsel] by [METHOD] and [DESCRIBE MEET AND CONFER EFFORTS].

4. The parties were unable to resolve the following disputed issues:
   a. [ISSUE 1]
   b. [ISSUE 2]

5. [DESCRIBE OPPOSING PARTY'S POSITION AND WHY RESOLUTION WAS NOT POSSIBLE]

I declare under penalty of perjury under the laws of the State of California that the foregoing is true and correct.

Executed on [DATE] at [CITY], California.

___________________________
[DECLARANT NAME]`;
}

function buildNewFactsDeclaration(findings: AuditFindingInput[], incorporateFindings: boolean): string {
  let text = `I, [DECLARANT NAME], declare as follows:

1. I am [RELATIONSHIP TO CASE]. This declaration is submitted pursuant to CCP § 1008(a).

2. The following new or different facts, circumstances, or law have arisen since the Court's order of [DATE]:

`;

  if (incorporateFindings && findings.length > 0) {
    let paraNum = 3;
    text += `   A VERNEN forensic audit conducted on [DATE] revealed the following previously unknown deficiencies:\n\n`;
    for (const f of findings) {
      text += `${paraNum}. NEW FACT: ${f.description} (${f.statutoryCitation})\n`;
      text += `   This information was not available at the time of the original hearing because [EXPLAIN WHY].\n\n`;
      paraNum++;
    }
  } else {
    text += `3. [STATE NEW FACTS]\n\n`;
    text += `4. This information was not available at the time of the original hearing because [EXPLAIN WHY].\n\n`;
  }

  text += `I declare under penalty of perjury under the laws of the State of California that the foregoing is true and correct.

Executed on [DATE] at [CITY], California.

___________________________
[DECLARANT NAME]`;

  return text;
}

function buildProposedOrder(caption: MotionCaption, def: MotionTypeDefinition): string {
  return `${caption.courtName}

Case No.: ${caption.caseNumber}

${caption.caseTitle}

[PROPOSED] ORDER ON ${def.title}

The ${def.title.toLowerCase()} of ${caption.filingParty} having come on for hearing on [DATE], the Court having considered the moving papers, opposition (if any), reply (if any), oral argument (if any), and good cause appearing:

IT IS HEREBY ORDERED:

1. [SPECIFIC ORDER]

2. [ADDITIONAL ORDERS]

DATED: _______________

___________________________
Judge of the Superior Court`;
}

function buildProofOfService(caption: MotionCaption): string {
  return `PROOF OF SERVICE

I, [SERVER NAME], declare:

I am over the age of 18 years and not a party to this action. My business address is [ADDRESS].

On [DATE], I served the following documents:

${caption.documentTitle}
[LIST ALL DOCUMENTS SERVED]

on the following persons at the addresses indicated:

[PARTY NAME]
[ADDRESS]
[CITY, STATE ZIP]

[ ] BY MAIL: I placed true copies in sealed envelopes addressed as above and deposited them in the United States mail at [CITY], California, with postage fully prepaid.

[ ] BY PERSONAL SERVICE: I personally delivered true copies to the persons at the addresses listed above.

[ ] BY ELECTRONIC SERVICE: I electronically served true copies to the email addresses listed above per CCP § 1010.6.

I declare under penalty of perjury under the laws of the State of California that the foregoing is true and correct.

Executed on [DATE] at [CITY], California.

___________________________
[SERVER NAME]`;
}

// ════════════════════════════════════════════════════════════════
// EXPORTED SERVICE CLASS
// ════════════════════════════════════════════════════════════════

export class LegalIntelligenceService {

  // ── Metadata ─────────────────────────────────────────────────

  static getPracticeAreas(): PracticeAreaInfo[] {
    return PRACTICE_AREAS;
  }

  static getJurisdictions(): JurisdictionInfo[] {
    return JURISDICTIONS;
  }

  // ── Authority Compiler ───────────────────────────────────────

  static compileAuthority(
    practiceArea: string,
    jurisdiction: string,
    _env: Env,
  ): AuthorityCompilationResult {
    let authorities = getAuthoritiesForPracticeArea(practiceArea);

    // Filter by jurisdiction if specified and not "all"
    if (jurisdiction && jurisdiction !== "all") {
      const filtered = authorities.filter(
        a => a.jurisdiction.toLowerCase() === jurisdiction.toLowerCase(),
      );
      // Only filter if we'd get results; otherwise return all for the practice area
      if (filtered.length > 0) {
        authorities = filtered;
      }
    }

    return {
      practiceArea,
      jurisdiction: jurisdiction || "all",
      authorities,
      totalAuthorities: authorities.length,
      compiledAt: new Date().toISOString(),
    };
  }

  // ── CCP Deadline Calculator ──────────────────────────────────

  static calculateDeadlines(
    motionType: string,
    filingDate: string,
    serviceMethod: string,
    _env: Env,
  ): DeadlineCalculation {
    const filing = new Date(filingDate);
    filing.setHours(0, 0, 0, 0);
    const warnings: string[] = [];
    const deadlines: DeadlineResult[] = [];
    const holidaysApplied: string[] = [];
    const serviceExt = getServiceExtension(serviceMethod);

    const template = MOTION_DEADLINE_TEMPLATES[motionType];

    if (!template) {
      warnings.push(`No template found for motion type '${motionType}'. Computing from filing date using CCP § 1005(b).`);
    }

    // Calculate from filing date: earliest hearing, then work backwards
    const earliestHearing = addCourtDays(filing, 16);
    deadlines.push({
      description: "Earliest possible hearing date (personal service)",
      dueDate: earliestHearing.toISOString().split("T")[0]!,
      statutoryBasis: "CCP § 1005(b) - 16 court days minimum notice",
      calculatedFrom: `Filing date: ${filingDate}`,
      daysRemaining: daysRemainingFn(earliestHearing),
      status: deadlineStatus(daysRemainingFn(earliestHearing)),
      warnings: [],
    });

    // Proof of service
    const posDue = addCourtDays(filing, 5);
    deadlines.push({
      description: "Proof of service should be filed",
      dueDate: posDue.toISOString().split("T")[0]!,
      statutoryBasis: "CCP § 1013a - Proof of service required",
      calculatedFrom: `Filing date: ${filingDate}`,
      daysRemaining: daysRemainingFn(posDue),
      status: deadlineStatus(daysRemainingFn(posDue)),
      warnings: [],
    });

    // If we have a template, compute motion-specific deadlines from earliest hearing
    if (template) {
      for (const dl of template.deadlines) {
        if (dl.direction === "before_hearing") {
          let dueDate: Date;
          if (dl.type === "court") {
            dueDate = subtractCourtDays(earliestHearing, dl.daysFromHearing);
          } else {
            dueDate = new Date(earliestHearing);
            dueDate.setDate(dueDate.getDate() - dl.daysFromHearing);
            dueDate = extendToNextCourtDay(dueDate);
          }

          const originalDate = new Date(dueDate);
          if (isCourtClosed(originalDate)) {
            holidaysApplied.push(`${dl.description}: extended from ${originalDate.toISOString().split("T")[0]} (court closed)`);
          }

          const remaining = daysRemainingFn(dueDate);
          const dlWarnings: string[] = [];
          if (remaining < 0) dlWarnings.push("THIS DEADLINE HAS PASSED");
          else if (remaining <= 3) dlWarnings.push("IMMINENT — action required immediately");
          if (serviceExt.days > 0 && dl.description.includes("served")) {
            dlWarnings.push(`Service extension applies: +${serviceExt.days} days (${serviceExt.basis})`);
          }

          deadlines.push({
            description: dl.description,
            dueDate: dueDate.toISOString().split("T")[0]!,
            statutoryBasis: dl.statutoryBasis,
            calculatedFrom: `${dl.daysFromHearing} ${dl.type} days before hearing (${earliestHearing.toISOString().split("T")[0]})`,
            daysRemaining: remaining,
            status: deadlineStatus(remaining),
            warnings: dlWarnings,
          });
        } else if (dl.direction === "after_service") {
          // Calculate from filing date + service extension
          const dueDate = addCalendarDays(filing, dl.daysFromHearing + serviceExt.days);
          deadlines.push({
            description: dl.description,
            dueDate: dueDate.toISOString().split("T")[0]!,
            statutoryBasis: dl.statutoryBasis,
            calculatedFrom: `${dl.daysFromHearing} days from filing/service date`,
            daysRemaining: daysRemainingFn(dueDate),
            status: deadlineStatus(daysRemainingFn(dueDate)),
            warnings: [],
          });
        }
      }
    }

    // Handle judgment/order specific deadlines
    if (motionType === "judgment" || motionType === "order") {
      const noticeOfAppeal = addCalendarDays(filing, 60);
      deadlines.push({
        description: "Notice of appeal deadline",
        dueDate: noticeOfAppeal.toISOString().split("T")[0]!,
        statutoryBasis: "CRC Rule 8.104(a)(1) - 60 days from notice of entry",
        calculatedFrom: `Entry date: ${filingDate}`,
        daysRemaining: daysRemainingFn(noticeOfAppeal),
        status: deadlineStatus(daysRemainingFn(noticeOfAppeal)),
        warnings: [],
      });

      const motionForNewTrial = addCalendarDays(filing, 15);
      deadlines.push({
        description: "Motion for new trial deadline",
        dueDate: motionForNewTrial.toISOString().split("T")[0]!,
        statutoryBasis: "CCP § 659 - Within 15 days of notice of entry",
        calculatedFrom: `Entry date: ${filingDate}`,
        daysRemaining: daysRemainingFn(motionForNewTrial),
        status: deadlineStatus(daysRemainingFn(motionForNewTrial)),
        warnings: [],
      });

      const reconsideration = addCalendarDays(filing, 10);
      deadlines.push({
        description: "Motion for reconsideration deadline",
        dueDate: reconsideration.toISOString().split("T")[0]!,
        statutoryBasis: "CCP § 1008(a) - Within 10 days of service of notice of entry",
        calculatedFrom: `Entry date: ${filingDate}`,
        daysRemaining: daysRemainingFn(reconsideration),
        status: deadlineStatus(daysRemainingFn(reconsideration)),
        warnings: [],
      });
    }

    // Sort by due date
    deadlines.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

    if (serviceExt.days > 0) {
      warnings.push(`Service method: ${serviceMethod}. Extension of ${serviceExt.days} days applies per ${serviceExt.basis}`);
    }

    return {
      motionType,
      filingDate,
      serviceMethod,
      jurisdiction: "CA",
      calculatedAt: new Date().toISOString(),
      deadlines,
      courtHolidaysApplied: holidaysApplied,
      warnings,
    };
  }

  // ── Local Rules Engine ───────────────────────────────────────

  static getLocalRules(county: string, _env: Env): CountyRuleSet {
    const key = county.toLowerCase();
    const countyData = COUNTY_RULES[key];

    if (!countyData) {
      return {
        jurisdiction: "CA",
        county,
        department: null,
        courtName: `Superior Court of California, County of ${county}`,
        courtAddress: "Contact clerk for address",
        clerkPhone: "Contact California Courts: (916) 323-3121",
        eFilingUrl: null,
        rules: getGenericCRCRules(),
        lastUpdated: new Date().toISOString(),
      };
    }

    return {
      ...countyData,
      department: null,
      lastUpdated: new Date().toISOString(),
    };
  }

  // ── Motion Template Generator ────────────────────────────────

  static generateMotionTemplate(
    motionType: string,
    caseInfo: {
      caseNumber?: string;
      caseTitle?: string;
      filingParty?: string;
      county?: string;
      hearingDate?: string;
      department?: string;
      practiceAreas?: string[];
      auditFindings?: AuditFindingInput[];
      incorporateFindings?: boolean;
    },
    _env: Env,
  ): GeneratedMotion {
    const templateId = `tpl_${Date.now().toString(36)}`;
    const county = caseInfo.county || "Alameda";
    const jurisdiction = "CA";
    const motionDef = MOTION_TYPES[motionType];
    const warnings: string[] = [];
    const instructions: string[] = [];

    if (!motionDef) {
      warnings.push(`Unknown motion type '${motionType}'. Using generic motion framework.`);
    }

    const def: MotionTypeDefinition = motionDef || {
      title: motionType.toUpperCase().replace(/_/g, " "),
      statutoryBasis: "See applicable CCP section",
      requiredSections: ["notice_of_motion", "memorandum", "declaration", "proposed_order"],
      optionalSections: [],
      specialRequirements: [],
    };

    // Get local rules
    const localRules = this.getLocalRules(county, _env);
    const localRulesApplied = localRules.rules.map(r => `${r.ruleId}: ${r.description}`);

    // Compile authorities
    const practiceAreas = caseInfo.practiceAreas || [];
    const authorities = practiceAreas.length > 0 ? compileAuthoritiesInternal(practiceAreas) : [];
    const findings = caseInfo.auditFindings || [];
    const incorporateFindings = caseInfo.incorporateFindings ?? false;

    // Build caption
    const caption: MotionCaption = {
      courtName: localRules.courtName,
      caseNumber: caseInfo.caseNumber || "[CASE NUMBER]",
      caseTitle: caseInfo.caseTitle || "[PARTY A] v. [PARTY B]",
      documentTitle: def.title,
      hearingDate: caseInfo.hearingDate || "[HEARING DATE]",
      hearingTime: "[HEARING TIME]",
      department: caseInfo.department || "[DEPARTMENT]",
      filingParty: caseInfo.filingParty || "[FILING PARTY]",
    };

    // Build sections
    const sections: MotionSection[] = [];
    let citationCount = 0;
    let exhibitRefCount = 0;

    // Notice section
    if (def.requiredSections.includes("notice_of_motion") || def.requiredSections.includes("notice_of_demurrer")) {
      sections.push({
        sectionId: "notice",
        heading: `NOTICE OF ${def.title}`,
        content: buildNoticeSection(caption, def),
        citations: [def.statutoryBasis],
        exhibitReferences: [],
      });
      citationCount++;
    }

    if (def.requiredSections.includes("request_for_order")) {
      sections.push({
        sectionId: "request",
        heading: "REQUEST FOR ORDER",
        content: buildRequestForOrderSection(caption),
        citations: ["CRC Rule 5.92"],
        exhibitReferences: [],
      });
      citationCount++;
    }

    // Memorandum
    if (def.requiredSections.includes("memorandum")) {
      const memoContent = buildMemorandum(def, findings, authorities, incorporateFindings);
      const memoCitations = authorities.map(a => a.citation);
      sections.push({
        sectionId: "memorandum",
        heading: "MEMORANDUM OF POINTS AND AUTHORITIES",
        content: memoContent.text,
        citations: memoCitations,
        exhibitReferences: memoContent.exhibitRefs,
      });
      citationCount += memoCitations.length;
      exhibitRefCount += memoContent.exhibitRefs.length;
    }

    // Declaration sections
    if (def.requiredSections.includes("declaration") || def.requiredSections.includes("declaration_of_facts")) {
      const declContent = buildDeclaration(findings, incorporateFindings);
      sections.push({
        sectionId: "declaration",
        heading: "DECLARATION OF [DECLARANT NAME]",
        content: declContent.text,
        citations: [],
        exhibitReferences: declContent.exhibitRefs,
      });
      exhibitRefCount += declContent.exhibitRefs.length;
    }

    if (def.requiredSections.includes("declaration_of_notice")) {
      sections.push({
        sectionId: "notice_declaration",
        heading: "DECLARATION OF NOTICE",
        content: buildNoticeDeclaration(),
        citations: ["CRC Rule 3.1204(a)", "CRC Rule 3.1204(b)"],
        exhibitReferences: [],
      });
      citationCount += 2;
    }

    if (def.requiredSections.includes("declaration_of_meet_and_confer")) {
      sections.push({
        sectionId: "meet_confer",
        heading: "DECLARATION OF MEET AND CONFER",
        content: buildMeetAndConfer(),
        citations: ["CCP § 2016.040"],
        exhibitReferences: [],
      });
      citationCount++;
    }

    if (def.requiredSections.includes("separate_statement")) {
      sections.push({
        sectionId: "separate_statement",
        heading: "SEPARATE STATEMENT OF DISPUTED DISCOVERY",
        content: "[Each discovery request, response, and reason compulsion is warranted — use CRC Rule 3.1345 format]",
        citations: ["CRC Rule 3.1345"],
        exhibitReferences: [],
      });
      citationCount++;
    }

    if (def.requiredSections.includes("declaration_of_new_facts")) {
      sections.push({
        sectionId: "new_facts",
        heading: "DECLARATION OF NEW OR DIFFERENT FACTS, CIRCUMSTANCES, OR LAW",
        content: buildNewFactsDeclaration(findings, incorporateFindings),
        citations: ["CCP § 1008(a)"],
        exhibitReferences: [],
      });
      citationCount++;
    }

    // Proposed order
    sections.push({
      sectionId: "proposed_order",
      heading: "PROPOSED ORDER",
      content: buildProposedOrder(caption, def),
      citations: ["CRC Rule 3.1312"],
      exhibitReferences: [],
    });
    citationCount++;

    const proofOfService = buildProofOfService(caption);

    // Instructions
    instructions.push("Review and customize all sections marked with [BRACKETS]");
    instructions.push("Verify case number and party names are correct");
    instructions.push("Confirm hearing date and department with court clerk");
    for (const req of def.specialRequirements) {
      instructions.push(req);
    }
    if (incorporateFindings && findings.length > 0) {
      instructions.push(`${findings.length} audit findings have been incorporated — review for accuracy and relevance`);
    }
    instructions.push(`Apply ${county} County local formatting rules before filing`);
    instructions.push("File proof of service separately after serving all parties");

    return {
      templateId,
      motionType,
      motionTitle: def.title,
      jurisdiction,
      county,
      generatedAt: new Date().toISOString(),
      caption,
      sections,
      proposedOrder: sections.find(s => s.sectionId === "proposed_order")?.content || "",
      proofOfService,
      localRulesApplied,
      totalCitations: citationCount,
      totalExhibitRefs: exhibitRefCount,
      warnings,
      instructions,
    };
  }

  // ── Conflict Check ───────────────────────────────────────────

  static checkConflicts(
    partyName: string,
    existingParties: string[],
    _env: Env,
    options?: {
      entityNames?: string[];
      relatedPersons?: string[];
      existingCases?: Array<{ caseId: string; parties: string[] }>;
    },
  ): ConflictCheckResult {
    const checkId = `chk_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
    const conflicts: ConflictMatch[] = [];
    const warnings: string[] = [];
    const recommendations: string[] = [];
    let matchCounter = 0;

    const allNamesToCheck = [partyName, ...(options?.relatedPersons || [])];
    const entityNames = options?.entityNames || [];
    const existingCases = options?.existingCases || [];

    // Check each name against existing parties
    for (const name of allNamesToCheck) {
      for (const client of existingParties) {
        // Exact match
        if (normalizeName(name) === normalizeName(client)) {
          conflicts.push({
            matchId: `m_${++matchCounter}`,
            matchedName: name,
            matchedAgainst: client,
            matchType: "exact",
            confidence: 1.0,
            source: "Existing client database",
            caseReference: null,
            details: "Exact name match with existing client",
            severity: "high",
          });
          continue;
        }

        // Alias match
        if (isAliasMatch(name, client)) {
          conflicts.push({
            matchId: `m_${++matchCounter}`,
            matchedName: name,
            matchedAgainst: client,
            matchType: "alias",
            confidence: 0.85,
            source: "Existing client database (alias match)",
            caseReference: null,
            details: `Potential alias/nickname match: "${name}" <-> "${client}"`,
            severity: "medium",
          });
          continue;
        }

        // Phonetic match
        if (phoneticMatch(name, client)) {
          conflicts.push({
            matchId: `m_${++matchCounter}`,
            matchedName: name,
            matchedAgainst: client,
            matchType: "phonetic",
            confidence: 0.7,
            source: "Existing client database (phonetic match)",
            caseReference: null,
            details: `Phonetic/spelling variation match: "${name}" <-> "${client}"`,
            severity: "low",
          });
          continue;
        }

        // Fuzzy match
        const score = similarityScore(name, client);
        if (score >= 0.85) {
          conflicts.push({
            matchId: `m_${++matchCounter}`,
            matchedName: name,
            matchedAgainst: client,
            matchType: "alias",
            confidence: score,
            source: "Existing client database (fuzzy match)",
            caseReference: null,
            details: `High similarity (${(score * 100).toFixed(0)}%): "${name}" <-> "${client}"`,
            severity: score >= 0.95 ? "high" : "medium",
          });
        }
      }
    }

    // Check entities against existing parties (treat as entity names)
    for (const entity of entityNames) {
      for (const existing of existingParties) {
        const normalA = normalizeEntity(entity);
        const normalB = normalizeEntity(existing);
        if (normalA === normalB) {
          conflicts.push({
            matchId: `m_${++matchCounter}`,
            matchedName: entity,
            matchedAgainst: existing,
            matchType: "exact",
            confidence: 1.0,
            source: "Existing entity database",
            caseReference: null,
            details: "Exact entity name match",
            severity: "high",
          });
        } else if (similarityScore(normalA, normalB) >= 0.8) {
          conflicts.push({
            matchId: `m_${++matchCounter}`,
            matchedName: entity,
            matchedAgainst: existing,
            matchType: "entity_related",
            confidence: similarityScore(normalA, normalB),
            source: "Existing entity database (similar name)",
            caseReference: null,
            details: "Similar entity names — may be related",
            severity: "medium",
          });
        }
      }
    }

    // Cross-case check
    for (const name of allNamesToCheck) {
      for (const caseRecord of existingCases) {
        for (const caseParty of caseRecord.parties) {
          if (normalizeName(name) === normalizeName(caseParty)) {
            conflicts.push({
              matchId: `m_${++matchCounter}`,
              matchedName: name,
              matchedAgainst: caseParty,
              matchType: "cross_case",
              confidence: 1.0,
              source: `Case ${caseRecord.caseId}`,
              caseReference: caseRecord.caseId,
              details: `Party appears in existing case ${caseRecord.caseId}`,
              severity: "high",
            });
          }
        }
      }
    }

    // Determine clearance status
    const highConflicts = conflicts.filter(c => c.severity === "high");
    const medConflicts = conflicts.filter(c => c.severity === "medium");

    let clearanceStatus: ConflictCheckResult["clearanceStatus"] = "CLEAR";
    if (highConflicts.length > 0) {
      clearanceStatus = "CONFLICT_FOUND";
      recommendations.push("HIGH-SEVERITY CONFLICT DETECTED: Consult firm ethics counsel before proceeding.");
      recommendations.push("Review Cal. Rules of Prof. Conduct, Rule 1.7 (concurrent conflicts) and Rule 1.9 (former clients).");
    } else if (medConflicts.length > 0) {
      clearanceStatus = "REVIEW_REQUIRED";
      recommendations.push("Potential conflict identified — manual review required to determine if actual conflict exists.");
      recommendations.push("Consider whether informed written consent under Rule 1.7(b) may be appropriate.");
    } else if (conflicts.length > 0) {
      clearanceStatus = "POTENTIAL_CONFLICT";
      recommendations.push("Low-confidence matches found. Likely false positives but verify manually.");
    } else {
      recommendations.push("No conflicts identified. Clearance granted based on available data.");
      recommendations.push("Note: Conflict check is only as comprehensive as the data provided.");
    }

    if (existingParties.length === 0 && entityNames.length === 0 && existingCases.length === 0) {
      warnings.push("No existing client/entity/case data provided. Conflict check limited to cross-checking submitted names against each other.");
      warnings.push("Connect firm client database for comprehensive conflict screening.");
    }

    const totalConfidence = conflicts.length > 0
      ? conflicts.reduce((sum, c) => sum + c.confidence, 0) / conflicts.length
      : 1.0;

    return {
      checkId,
      timestamp: new Date().toISOString(),
      checkedNames: [partyName],
      checkedEntities: entityNames,
      checkedRelated: options?.relatedPersons || [],
      potentialConflicts: conflicts,
      clearanceStatus,
      confidenceScore: totalConfidence,
      recommendations,
      warnings,
    };
  }
}

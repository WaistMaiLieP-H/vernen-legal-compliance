/**
 * Failure Taxonomy Engine
 *
 * Mines compliance failures from all 6 intelligence pipelines and classifies
 * them by industry, violation type, governing standard, severity, and frequency.
 *
 * Every failure in the federal record is a skill definition waiting to be extracted.
 * This engine turns "how companies actually fail" into "what Citizens need to know."
 *
 * Pipeline sources:
 *   FAC  → Material weaknesses, questioned costs, repeat findings
 *   HHS  → HIPAA breaches by type, entity type, location
 *   EDGAR → 8-K material weakness, restatements, auditor changes
 *   SBA  → 8(a) suspensions with NAICS codes, violation types
 *   USAspending → Award compliance triggers (CMMC, FAR, Single Audit)
 *   FedReg → Regulatory changes forcing re-certification
 *   EPA  → Clean Water/Air/RCRA/SDWA violations, penalties
 *   CFPB → Consumer financial complaints, dispute patterns
 *   OSHA → Workplace safety violations, fatalities, penalties
 *   FDA  → Drug/food/device recalls, enforcement actions
 */

import type { Env } from "../index.js";
import { generateId } from "../utils/helpers.js";
import type { FACEntity, FACFinding, ComplianceGapLead } from "./fac-intelligence.js";
import type { HHSBreachEntity, HIPAAComplianceGapLead } from "./hhs-intelligence.js";
import type { EDGARFiling, MaterialWeaknessLead } from "./edgar-intelligence.js";
import type { SBA8aFirm, SBA8aComplianceLead } from "./sba-intelligence.js";
import type { USASpendingAward, SpendingComplianceLead } from "./usaspending-intelligence.js";
import type { FedRegDocument, RegulatoryChangeAlert } from "./fedreg-intelligence.js";
import type { EPAComplianceLead } from "./epa-intelligence.js";
import type { CFPBComplianceLead } from "./cfpb-intelligence.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export type SourcePipeline =
  // Wave 1-3 (original 14)
  | "FAC" | "HHS" | "EDGAR" | "SBA" | "USASPENDING" | "FEDREG"
  | "EPA" | "CFPB" | "OSHA" | "FDA" | "FTC" | "RECAP" | "EEOC" | "NLRB"
  // Wave 4
  | "NHTSA" | "FCC" | "USDA" | "CMS" | "SAM" | "MSHA" | "FMCSA" | "NTSB" | "IRS"
  // Wave 5
  | "CPSC" | "DOE" | "HUD" | "PHMSA" | "ATF" | "CFTC" | "NRC" | "FERC" | "PBGC"
  // Wave 6
  | "SEC_IA" | "DCMA" | "TTB" | "OFAC" | "FINCEN" | "OCC" | "FDIC" | "NCUA"
  // Wave 7 — California state (bulk-file ingest)
  | "CSLB";

export interface TaxonomyEntry {
  id: string;
  sourcePipeline: SourcePipeline;
  sourceRecordId: string;
  naicsCode: string | null;
  naicsSector: string | null;
  industry: string;
  subIndustry: string | null;
  entityName: string;
  entityState: string | null;
  entityType: string | null;
  violationType: string;
  violationDetail: string | null;
  severity: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
  governingStandard: string | null;
  governingStandardTitle: string | null;
  complianceFramework: string | null;
  gapScore: number;
  financialExposure: number;
  failureDate: string | null;
}

export interface TaxonomyIngestResult {
  pipeline: SourcePipeline;
  recordsProcessed: number;
  recordsClassified: number;
  newViolations: number;
  duplicatesSkipped: number;
  durationMs: number;
}

export interface IndustryProfile {
  industry: string;
  totalFailures: number;
  uniqueEntities: number;
  violationTypes: { type: string; count: number }[];
  frameworks: { framework: string; count: number }[];
  topStates: { state: string; count: number }[];
  avgGapScore: number;
  totalExposure: number;
  severityDistribution: Record<string, number>;
}

export interface TaxonomyStats {
  totalEntries: number;
  byPipeline: Record<string, number>;
  byIndustry: Record<string, number>;
  byViolationType: Record<string, number>;
  byFramework: Record<string, number>;
  bySeverity: Record<string, number>;
  lastIngestAt: string | null;
}

// ═══════════════════════════════════════════════════════════════════════════
// NAICS → Industry mapping
// ═══════════════════════════════════════════════════════════════════════════

const NAICS_SECTOR_MAP: Record<string, string> = {
  "11": "AGRICULTURE",
  "21": "MINING",
  "22": "UTILITIES",
  "23": "CONSTRUCTION",
  "31": "MANUFACTURING", "32": "MANUFACTURING", "33": "MANUFACTURING",
  "42": "WHOLESALE",
  "44": "RETAIL", "45": "RETAIL",
  "48": "TRANSPORTATION", "49": "TRANSPORTATION",
  "51": "TECHNOLOGY",
  "52": "FINANCE",
  "53": "REAL_ESTATE",
  "54": "PROFESSIONAL_SERVICES",
  "55": "MANAGEMENT",
  "56": "ADMINISTRATIVE",
  "61": "EDUCATION",
  "62": "HEALTHCARE",
  "71": "ENTERTAINMENT",
  "72": "HOSPITALITY",
  "81": "OTHER_SERVICES",
  "92": "GOVERNMENT",
};

/**
 * Resolve a NAICS code to a normalized industry.
 * Falls back to entity type keywords if no NAICS available.
 */
function resolveIndustry(naicsCode: string | null, entityType: string | null, entityName: string): string {
  // Try NAICS first (most reliable)
  if (naicsCode && naicsCode.length >= 2) {
    const sector = naicsCode.substring(0, 2);
    if (NAICS_SECTOR_MAP[sector]) return NAICS_SECTOR_MAP[sector];
  }

  // Fall back to entity type keywords
  const combined = `${entityType ?? ""} ${entityName}`.toLowerCase();
  if (combined.includes("hospital") || combined.includes("health") || combined.includes("medical") || combined.includes("clinic")) return "HEALTHCARE";
  if (combined.includes("school") || combined.includes("university") || combined.includes("college") || combined.includes("education")) return "EDUCATION";
  if (combined.includes("bank") || combined.includes("credit union") || combined.includes("financial")) return "FINANCE";
  if (combined.includes("construction") || combined.includes("builder") || combined.includes("contractor")) return "CONSTRUCTION";
  if (combined.includes("city of") || combined.includes("county of") || combined.includes("state of") || combined.includes("department of") || combined.includes("government")) return "GOVERNMENT";
  if (combined.includes("housing") || combined.includes("real estate")) return "REAL_ESTATE";
  if (combined.includes("transport") || combined.includes("transit") || combined.includes("airline")) return "TRANSPORTATION";
  if (combined.includes("tech") || combined.includes("software") || combined.includes("data")) return "TECHNOLOGY";
  if (combined.includes("manufact") || combined.includes("factory")) return "MANUFACTURING";
  if (combined.includes("nonprofit") || combined.includes("foundation") || combined.includes("association")) return "NONPROFIT";
  if (combined.includes("defense") || combined.includes("military") || combined.includes("dod")) return "DEFENSE";
  if (combined.includes("energy") || combined.includes("utility") || combined.includes("electric") || combined.includes("water")) return "UTILITIES";
  if (combined.includes("food") || combined.includes("restaurant") || combined.includes("hotel")) return "HOSPITALITY";
  if (combined.includes("farm") || combined.includes("ranch") || combined.includes("agriculture")) return "AGRICULTURE";

  return "GENERAL";
}

// ═══════════════════════════════════════════════════════════════════════════
// Violation type normalization
// ═══════════════════════════════════════════════════════════════════════════

/** Normalize violation types across pipelines into a common taxonomy */
const VIOLATION_TAXONOMY: Record<string, string> = {
  // FAC violations
  "Internal Control Material Weakness": "MATERIAL_WEAKNESS",
  "Material Noncompliance": "MATERIAL_NONCOMPLIANCE",
  "Going Concern": "GOING_CONCERN",
  "Questioned Costs": "QUESTIONED_COSTS",
  "Modified Audit Opinion": "MODIFIED_OPINION",
  "Repeat Finding": "REPEAT_FINDING",
  "Significant Deficiency": "SIGNIFICANT_DEFICIENCY",
  // HHS violations
  "Hacking/IT Incident": "HIPAA_BREACH_HACKING",
  "Unauthorized Access/Disclosure": "HIPAA_BREACH_UNAUTHORIZED_ACCESS",
  "Theft": "HIPAA_BREACH_THEFT",
  "Loss": "HIPAA_BREACH_LOSS",
  "Improper Disposal": "HIPAA_BREACH_IMPROPER_DISPOSAL",
  // EDGAR violations
  "material weakness": "SEC_MATERIAL_WEAKNESS",
  "restatement": "SEC_RESTATEMENT",
  "adverse opinion": "SEC_ADVERSE_OPINION",
  "auditor change": "SEC_AUDITOR_CHANGE",
  // SBA violations
  "suspended": "SBA_SUSPENSION",
  "decertified": "SBA_DECERTIFICATION",
  "net_worth_exceeded": "SBA_NET_WORTH_VIOLATION",
  "narrative_ban": "SBA_NARRATIVE_BAN",
  "subcontract_violation": "SBA_SUBCONTRACT_VIOLATION",
  // USAspending triggers
  "Single Audit": "SINGLE_AUDIT_TRIGGER",
  "CMMC": "CMMC_TRIGGER",
  "FAR": "FAR_TRIGGER",
  "ITAR": "ITAR_TRIGGER",
  "FedRAMP": "FEDRAMP_TRIGGER",
  // FedReg
  "RULE": "REGULATORY_CHANGE_FINAL",
  "PRORULE": "REGULATORY_CHANGE_PROPOSED",
};

function normalizeViolationType(raw: string): string {
  return VIOLATION_TAXONOMY[raw] ?? raw.toUpperCase().replace(/[^A-Z0-9]/g, "_");
}

// ═══════════════════════════════════════════════════════════════════════════
// Compliance framework resolution
// ═══════════════════════════════════════════════════════════════════════════

function resolveFramework(violationType: string, governingStandard: string | null): string | null {
  const v = violationType.toUpperCase();
  if (v.includes("HIPAA")) return "HIPAA";
  if (v.includes("SBA") || v.includes("8(A)")) return "SBA_8A";
  if (v.includes("SEC") || v.includes("SOX")) return "SOX";
  if (v.includes("CMMC")) return "CMMC";
  if (v.includes("FAR")) return "FAR";
  if (v.includes("ITAR")) return "ITAR";
  if (v.includes("FEDRAMP")) return "FEDRAMP";
  if (v.includes("SINGLE_AUDIT")) return "SINGLE_AUDIT";

  // Check governing standard
  if (governingStandard) {
    const g = governingStandard.toUpperCase();
    if (g.includes("CFR 124") || g.includes("CFR 121") || g.includes("CFR 125")) return "SBA_8A";
    if (g.includes("HIPAA") || g.includes("45 CFR")) return "HIPAA";
    if (g.includes("2 CFR 200") || g.includes("A-133")) return "SINGLE_AUDIT";
    if (g.includes("FAR") || g.includes("48 CFR")) return "FAR";
    if (g.includes("SOX") || g.includes("PCAOB")) return "SOX";
    if (g.includes("NIST 800-171")) return "CMMC";
  }

  return null;
}

// ═══════════════════════════════════════════════════════════════════════════
// Failure Taxonomy Engine
// ═══════════════════════════════════════════════════════════════════════════

export class FailureTaxonomyEngine {
  private db: D1Database;

  constructor(env: Env) {
    this.db = env.DB;
  }

  // ─── Table Setup ──────────────────────────────────────────────────────

  async ensureTables(): Promise<void> {
    // Tables are created by migration-022. This is a safety net.
    await this.db.batch([
      this.db.prepare(`CREATE TABLE IF NOT EXISTS failure_taxonomy (
        id TEXT PRIMARY KEY, source_pipeline TEXT NOT NULL, source_record_id TEXT NOT NULL,
        naics_code TEXT, naics_sector TEXT, industry TEXT NOT NULL, sub_industry TEXT,
        entity_name TEXT NOT NULL, entity_state TEXT, entity_type TEXT,
        violation_type TEXT NOT NULL, violation_detail TEXT,
        severity TEXT NOT NULL DEFAULT 'HIGH',
        governing_standard TEXT, governing_standard_title TEXT, compliance_framework TEXT,
        gap_score INTEGER DEFAULT 0, financial_exposure REAL DEFAULT 0,
        failure_date TEXT, ingested_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`),
      this.db.prepare(`CREATE TABLE IF NOT EXISTS naics_sectors (
        code TEXT PRIMARY KEY, name TEXT NOT NULL, industry_normalized TEXT NOT NULL
      )`),
    ]);
  }

  // ─── FAC Ingest ───────────────────────────────────────────────────────

  /**
   * Ingest FAC pipeline leads into the taxonomy.
   * Each finding on each entity becomes a separate taxonomy entry.
   */
  async ingestFAC(leads: ComplianceGapLead[]): Promise<TaxonomyIngestResult> {
    const start = Date.now();
    let classified = 0;
    let newViolations = 0;
    let dupes = 0;

    for (const lead of leads) {
      const { entity, findings } = lead;
      const industry = resolveIndustry(null, entity.entityType, entity.auditeeNname);

      // Material weakness
      if (entity.isMaterialWeakness) {
        const result = await this.upsertEntry({
          sourcePipeline: "FAC",
          sourceRecordId: entity.reportId,
          naicsCode: null,
          naicsSector: null,
          industry,
          subIndustry: null,
          entityName: entity.auditeeNname,
          entityState: entity.auditeeState,
          entityType: entity.entityType,
          violationType: "MATERIAL_WEAKNESS",
          violationDetail: "Internal control material weakness disclosed in Single Audit",
          severity: "HIGH",
          governingStandard: "2 CFR 200 Subpart F",
          governingStandardTitle: "Uniform Administrative Requirements — Audit Requirements",
          complianceFramework: "SINGLE_AUDIT",
          gapScore: lead.gapScore,
          financialExposure: entity.totalAmountExpended,
          failureDate: entity.facAcceptedDate,
        });
        classified++;
        if (result === "new") newViolations++;
        else dupes++;
      }

      // Material noncompliance
      if (entity.isMaterialNoncompliance) {
        const result = await this.upsertEntry({
          sourcePipeline: "FAC",
          sourceRecordId: entity.reportId,
          naicsCode: null,
          naicsSector: null,
          industry,
          subIndustry: null,
          entityName: entity.auditeeNname,
          entityState: entity.auditeeState,
          entityType: entity.entityType,
          violationType: "MATERIAL_NONCOMPLIANCE",
          violationDetail: "Material noncompliance with federal program requirements",
          severity: "HIGH",
          governingStandard: "2 CFR 200.516",
          governingStandardTitle: "Audit findings",
          complianceFramework: "SINGLE_AUDIT",
          gapScore: lead.gapScore,
          financialExposure: entity.totalAmountExpended,
          failureDate: entity.facAcceptedDate,
        });
        classified++;
        if (result === "new") newViolations++;
        else dupes++;
      }

      // Going concern
      if (entity.isGoingConcern) {
        const result = await this.upsertEntry({
          sourcePipeline: "FAC",
          sourceRecordId: entity.reportId,
          naicsCode: null,
          naicsSector: null,
          industry,
          subIndustry: null,
          entityName: entity.auditeeNname,
          entityState: entity.auditeeState,
          entityType: entity.entityType,
          violationType: "GOING_CONCERN",
          violationDetail: "Going concern opinion — entity viability at risk",
          severity: "CRITICAL",
          governingStandard: "AU-C Section 570",
          governingStandardTitle: "Going Concern",
          complianceFramework: "SINGLE_AUDIT",
          gapScore: lead.gapScore,
          financialExposure: entity.totalAmountExpended,
          failureDate: entity.facAcceptedDate,
        });
        classified++;
        if (result === "new") newViolations++;
        else dupes++;
      }

      // Individual findings
      for (const finding of findings) {
        if (finding.isRepeatFinding) {
          const result = await this.upsertEntry({
            sourcePipeline: "FAC",
            sourceRecordId: `${entity.reportId}:${finding.referenceNumber}`,
            naicsCode: null, naicsSector: null, industry, subIndustry: null,
            entityName: entity.auditeeNname,
            entityState: entity.auditeeState,
            entityType: entity.entityType,
            violationType: "REPEAT_FINDING",
            violationDetail: `Repeat finding ref ${finding.referenceNumber} — type: ${finding.typeRequirement}`,
            severity: "HIGH",
            governingStandard: "2 CFR 200.511(b)",
            governingStandardTitle: "Audit follow-up — prior findings",
            complianceFramework: "SINGLE_AUDIT",
            gapScore: lead.gapScore,
            financialExposure: 0,
            failureDate: entity.facAcceptedDate,
          });
          classified++;
          if (result === "new") newViolations++;
          else dupes++;
        }

        if (finding.isQuestionedCosts) {
          const result = await this.upsertEntry({
            sourcePipeline: "FAC",
            sourceRecordId: `${entity.reportId}:${finding.referenceNumber}:QC`,
            naicsCode: null, naicsSector: null, industry, subIndustry: null,
            entityName: entity.auditeeNname,
            entityState: entity.auditeeState,
            entityType: entity.entityType,
            violationType: "QUESTIONED_COSTS",
            violationDetail: `Questioned costs — finding ref ${finding.referenceNumber}`,
            severity: "HIGH",
            governingStandard: "2 CFR 200.516(a)(3)",
            governingStandardTitle: "Audit findings — questioned costs",
            complianceFramework: "SINGLE_AUDIT",
            gapScore: lead.gapScore,
            financialExposure: 0,
            failureDate: entity.facAcceptedDate,
          });
          classified++;
          if (result === "new") newViolations++;
          else dupes++;
        }
      }
    }

    await this.logStats("pipeline_run", "FAC", leads.length, classified, newViolations, Date.now() - start);
    return { pipeline: "FAC", recordsProcessed: leads.length, recordsClassified: classified, newViolations, duplicatesSkipped: dupes, durationMs: Date.now() - start };
  }

  // ─── HHS Ingest ──────────────────────────────────────────────────────

  async ingestHHS(leads: HIPAAComplianceGapLead[]): Promise<TaxonomyIngestResult> {
    const start = Date.now();
    let classified = 0;
    let newViolations = 0;
    let dupes = 0;

    for (const lead of leads) {
      const { entity } = lead;
      const violationType = normalizeViolationType(entity.breachType);
      const industry = resolveIndustry(null, entity.coveredEntityType, entity.entityName);

      const result = await this.upsertEntry({
        sourcePipeline: "HHS",
        sourceRecordId: `${entity.entityName}:${entity.breachSubmissionDate}`,
        naicsCode: null,
        naicsSector: null,
        industry,
        subIndustry: entity.coveredEntityType,
        entityName: entity.entityName,
        entityState: entity.state,
        entityType: entity.coveredEntityType,
        violationType,
        violationDetail: `${entity.breachType} — ${entity.locationOfBreachedInfo} — ${entity.individualsAffected} individuals`,
        severity: lead.riskLevel === "CRITICAL" ? "CRITICAL" : lead.riskLevel === "HIGH" ? "HIGH" : "MODERATE",
        governingStandard: "45 CFR 164.400-414",
        governingStandardTitle: "HIPAA Breach Notification Rule",
        complianceFramework: "HIPAA",
        gapScore: lead.gapScore,
        financialExposure: entity.individualsAffected * 100, // $100/record conservative estimate
        failureDate: entity.breachSubmissionDate,
      });
      classified++;
      if (result === "new") newViolations++;
      else dupes++;
    }

    await this.logStats("pipeline_run", "HHS", leads.length, classified, newViolations, Date.now() - start);
    return { pipeline: "HHS", recordsProcessed: leads.length, recordsClassified: classified, newViolations, duplicatesSkipped: dupes, durationMs: Date.now() - start };
  }

  // ─── EDGAR Ingest ─────────────────────────────────────────────────────

  async ingestEDGAR(leads: MaterialWeaknessLead[]): Promise<TaxonomyIngestResult> {
    const start = Date.now();
    let classified = 0;
    let newViolations = 0;
    let dupes = 0;

    for (const lead of leads) {
      const { filing } = lead;

      // Each keyword found becomes a violation type
      for (const keyword of filing.keywords) {
        const violationType = normalizeViolationType(keyword);
        const result = await this.upsertEntry({
          sourcePipeline: "EDGAR",
          sourceRecordId: `${filing.cik}:${filing.accessionNumber}:${keyword}`,
          naicsCode: null, naicsSector: null,
          industry: "PUBLIC_COMPANY",
          subIndustry: null,
          entityName: filing.companyName,
          entityState: null,
          entityType: "public_company",
          violationType,
          violationDetail: `8-K filing: ${keyword} — ${filing.description}`,
          severity: keyword === "adverse opinion" ? "CRITICAL" : "HIGH",
          governingStandard: "SOX Section 404",
          governingStandardTitle: "Management Assessment of Internal Controls",
          complianceFramework: "SOX",
          gapScore: lead.gapScore,
          financialExposure: 0,
          failureDate: filing.filingDate,
        });
        classified++;
        if (result === "new") newViolations++;
        else dupes++;
      }
    }

    await this.logStats("pipeline_run", "EDGAR", leads.length, classified, newViolations, Date.now() - start);
    return { pipeline: "EDGAR", recordsProcessed: leads.length, recordsClassified: classified, newViolations, duplicatesSkipped: dupes, durationMs: Date.now() - start };
  }

  // ─── SBA Ingest ───────────────────────────────────────────────────────

  async ingestSBA(leads: SBA8aComplianceLead[]): Promise<TaxonomyIngestResult> {
    const start = Date.now();
    let classified = 0;
    let newViolations = 0;
    let dupes = 0;

    for (const lead of leads) {
      const { firm } = lead;
      // SBA firms have NAICS codes — richest industry signal
      const naicsCode = firm.naicsCodes[0] ?? null;
      const industry = resolveIndustry(naicsCode, null, firm.name);

      const violationType = normalizeViolationType(firm.certificationStatus);
      const result = await this.upsertEntry({
        sourcePipeline: "SBA",
        sourceRecordId: firm.uei,
        naicsCode,
        naicsSector: naicsCode ? naicsCode.substring(0, 2) : null,
        industry,
        subIndustry: naicsCode && naicsCode.length >= 4 ? naicsCode.substring(0, 4) : null,
        entityName: firm.name,
        entityState: firm.state,
        entityType: "small_business_8a",
        violationType,
        violationDetail: `8(a) ${firm.certificationStatus} — revenue: $${firm.annualRevenue}, net worth: $${firm.netWorth}`,
        severity: firm.certificationStatus === "suspended" ? "HIGH" : "MODERATE",
        governingStandard: "13 CFR 124",
        governingStandardTitle: "8(a) Business Development Program",
        complianceFramework: "SBA_8A",
        gapScore: lead.restatementScore,
        financialExposure: firm.annualRevenue,
        failureDate: null,
      });
      classified++;
      if (result === "new") newViolations++;
      else dupes++;

      // Also classify each NAICS code as a separate sub-industry entry if multiple
      for (let i = 1; i < firm.naicsCodes.length; i++) {
        const nc = firm.naicsCodes[i] ?? "";
        if (!nc) continue;
        const subIndustry = resolveIndustry(nc, null, firm.name);
        if (subIndustry !== industry) {
          await this.upsertEntry({
            sourcePipeline: "SBA",
            sourceRecordId: `${firm.uei}:NAICS:${nc}`,
            naicsCode: nc, naicsSector: nc.substring(0, 2),
            industry: subIndustry, subIndustry: nc.substring(0, 4),
            entityName: firm.name, entityState: firm.state,
            entityType: "small_business_8a",
            violationType,
            violationDetail: `Cross-industry: ${firm.certificationStatus} in NAICS ${nc}`,
            severity: "MODERATE",
            governingStandard: "13 CFR 124",
            governingStandardTitle: "8(a) Business Development Program",
            complianceFramework: "SBA_8A",
            gapScore: lead.restatementScore,
            financialExposure: 0,
            failureDate: null,
          });
        }
      }
    }

    await this.logStats("pipeline_run", "SBA", leads.length, classified, newViolations, Date.now() - start);
    return { pipeline: "SBA", recordsProcessed: leads.length, recordsClassified: classified, newViolations, duplicatesSkipped: dupes, durationMs: Date.now() - start };
  }

  // ─── USAspending Ingest ───────────────────────────────────────────────

  async ingestUSAspending(leads: SpendingComplianceLead[]): Promise<TaxonomyIngestResult> {
    const start = Date.now();
    let classified = 0;
    let newViolations = 0;
    let dupes = 0;

    for (const lead of leads) {
      const { award } = lead;
      const naicsCode = award.naics_code || null;
      const industry = resolveIndustry(naicsCode, award.award_type, award.recipient_name);

      // Each triggered obligation is a separate violation entry
      for (const obligation of lead.triggeredObligations) {
        const violationType = normalizeViolationType(obligation);
        const framework = resolveFramework(violationType, null) ?? obligation;

        const result = await this.upsertEntry({
          sourcePipeline: "USASPENDING",
          sourceRecordId: `${award.award_id}:${obligation}`,
          naicsCode, naicsSector: naicsCode ? naicsCode.substring(0, 2) : null,
          industry,
          subIndustry: naicsCode && naicsCode.length >= 4 ? naicsCode.substring(0, 4) : null,
          entityName: award.recipient_name,
          entityState: award.recipient_state,
          entityType: award.award_type,
          violationType,
          violationDetail: `$${award.award_amount.toLocaleString()} ${award.award_type} from ${award.agency_name} — triggers ${obligation}`,
          severity: award.award_amount > 10_000_000 ? "HIGH" : "MODERATE",
          governingStandard: null,
          governingStandardTitle: null,
          complianceFramework: framework,
          gapScore: lead.riskScore,
          financialExposure: award.award_amount,
          failureDate: award.start_date,
        });
        classified++;
        if (result === "new") newViolations++;
        else dupes++;
      }
    }

    await this.logStats("pipeline_run", "USASPENDING", leads.length, classified, newViolations, Date.now() - start);
    return { pipeline: "USASPENDING", recordsProcessed: leads.length, recordsClassified: classified, newViolations, duplicatesSkipped: dupes, durationMs: Date.now() - start };
  }

  // ─── FedReg Ingest ────────────────────────────────────────────────────

  async ingestFedReg(alerts: RegulatoryChangeAlert[]): Promise<TaxonomyIngestResult> {
    const start = Date.now();
    let classified = 0;
    let newViolations = 0;
    let dupes = 0;

    for (const alert of alerts) {
      const { document } = alert;
      const violationType = normalizeViolationType(document.type);

      // Each affected industry gets its own entry
      for (const industry of alert.affectedIndustries) {
        const normalizedIndustry = industry.toUpperCase().replace(/[^A-Z0-9]/g, "_");
        const framework = alert.complianceKeywords[0] ?? null;

        const result = await this.upsertEntry({
          sourcePipeline: "FEDREG",
          sourceRecordId: `${document.documentNumber}:${normalizedIndustry}`,
          naicsCode: null, naicsSector: null,
          industry: normalizedIndustry,
          subIndustry: null,
          entityName: document.agencies.map(a => a.name).join(", "),
          entityState: null,
          entityType: "federal_agency",
          violationType,
          violationDetail: document.title,
          severity: alert.urgencyLevel === "CRITICAL" ? "CRITICAL" : alert.urgencyLevel === "HIGH" ? "HIGH" : "MODERATE",
          governingStandard: document.cfrReferences[0] ?? null,
          governingStandardTitle: document.title,
          complianceFramework: framework,
          gapScore: alert.impactScore,
          financialExposure: 0,
          failureDate: document.effectiveDate ?? document.publicationDate,
        });
        classified++;
        if (result === "new") newViolations++;
        else dupes++;
      }
    }

    await this.logStats("pipeline_run", "FEDREG", alerts.length, classified, newViolations, Date.now() - start);
    return { pipeline: "FEDREG", recordsProcessed: alerts.length, recordsClassified: classified, newViolations, duplicatesSkipped: dupes, durationMs: Date.now() - start };
  }

  // ─── EPA Ingest ───────────────────────────────────────────────────────

  async ingestEPA(leads: EPAComplianceLead[]): Promise<TaxonomyIngestResult> {
    const start = Date.now();
    let classified = 0;
    let newViolations = 0;
    let dupes = 0;

    for (const lead of leads) {
      const { facility } = lead;
      const industry = resolveIndustry(facility.naicsCode || null, null, facility.facilityName);

      for (const program of lead.violationPrograms) {
        const violationType = `EPA_${program.toUpperCase().replace(/[^A-Z0-9]/g, "_")}`;
        const framework = program.includes("Clean Water") ? "CWA" :
          program.includes("Clean Air") ? "CAA" :
          program.includes("RCRA") ? "RCRA" :
          program.includes("Drinking Water") ? "SDWA" : "EPA";

        const result = await this.upsertEntry({
          sourcePipeline: "EPA" as SourcePipeline,
          sourceRecordId: `${facility.registryId}:${framework}`,
          naicsCode: facility.naicsCode || null,
          naicsSector: facility.naicsCode ? facility.naicsCode.substring(0, 2) : null,
          industry, subIndustry: null,
          entityName: facility.facilityName,
          entityState: facility.state,
          entityType: "epa_regulated_facility",
          violationType,
          violationDetail: lead.riskCategories.join("; "),
          severity: lead.riskScore >= 70 ? "CRITICAL" : lead.riskScore >= 40 ? "HIGH" : "MODERATE",
          governingStandard: framework === "CWA" ? "33 USC 1251" : framework === "CAA" ? "42 USC 7401" : framework === "RCRA" ? "42 USC 6901" : "42 USC 300f",
          governingStandardTitle: program,
          complianceFramework: framework,
          gapScore: lead.riskScore,
          financialExposure: facility.totalPenalties,
          failureDate: null,
        });
        classified++;
        if (result === "new") newViolations++;
        else dupes++;
      }
    }

    await this.logStats("pipeline_run", "EPA", leads.length, classified, newViolations, Date.now() - start);
    return { pipeline: "EPA" as SourcePipeline, recordsProcessed: leads.length, recordsClassified: classified, newViolations, duplicatesSkipped: dupes, durationMs: Date.now() - start };
  }

  // ─── CFPB Ingest ──────────────────────────────────────────────────────

  async ingestCFPB(leads: CFPBComplianceLead[]): Promise<TaxonomyIngestResult> {
    const start = Date.now();
    let classified = 0;
    let newViolations = 0;
    let dupes = 0;

    for (const lead of leads) {
      const industry = "FINANCE";
      const products = lead.product.split(", ");

      for (const product of products) {
        const violationType = `CFPB_${product.toUpperCase().replace(/[^A-Z0-9]/g, "_")}`;
        const framework = product.toLowerCase().includes("mortgage") ? "TILA_RESPA" :
          product.toLowerCase().includes("debt") ? "FDCPA" :
          product.toLowerCase().includes("credit report") ? "FCRA" :
          product.toLowerCase().includes("credit card") ? "TILA" : "CFPA";

        const result = await this.upsertEntry({
          sourcePipeline: "CFPB" as SourcePipeline,
          sourceRecordId: `${lead.company}:${product}`,
          naicsCode: "522", naicsSector: "52",
          industry, subIndustry: product,
          entityName: lead.company,
          entityState: lead.state,
          entityType: "financial_institution",
          violationType,
          violationDetail: `${lead.totalComplaints} complaints — ${lead.topIssues.slice(0, 3).join(", ")}`,
          severity: lead.riskScore >= 70 ? "CRITICAL" : lead.riskScore >= 40 ? "HIGH" : "MODERATE",
          governingStandard: framework === "FDCPA" ? "15 USC 1692" : framework === "FCRA" ? "15 USC 1681" : framework === "TILA" ? "15 USC 1601" : "12 USC 5531",
          governingStandardTitle: framework === "FDCPA" ? "Fair Debt Collection Practices Act" : framework === "FCRA" ? "Fair Credit Reporting Act" : framework === "TILA" ? "Truth in Lending Act" : "Consumer Financial Protection Act",
          complianceFramework: framework,
          gapScore: lead.riskScore,
          financialExposure: lead.totalComplaints * 500, // $500/complaint conservative
          failureDate: null,
        });
        classified++;
        if (result === "new") newViolations++;
        else dupes++;
      }
    }

    await this.logStats("pipeline_run", "CFPB", leads.length, classified, newViolations, Date.now() - start);
    return { pipeline: "CFPB" as SourcePipeline, recordsProcessed: leads.length, recordsClassified: classified, newViolations, duplicatesSkipped: dupes, durationMs: Date.now() - start };
  }

  // ─── Generic Ingest (all Wave 4-6 pipelines) ────────────────────────

  /**
   * Generic ingest for any pipeline that produces leads with:
   *   entity (string), riskScore (number), riskCategories (string[]),
   *   recommendedServices (string[])
   *
   * Works with NHTSA, FCC, USDA, CMS, SAM, MSHA, FMCSA, NTSB, IRS,
   * CPSC, DOE, HUD, PHMSA, ATF, CFTC, NRC, FERC, PBGC,
   * SEC_IA, DCMA, TTB, OFAC, FINCEN, OCC, FDIC, NCUA, FTC, EEOC, NLRB, RECAP
   */
  async ingestGeneric(
    pipeline: SourcePipeline,
    leads: Array<{
      entity?: string;
      riskScore: number;
      riskCategories: string[];
      recommendedServices?: string[];
      estimatedRemediation?: string;
      // Allow any additional fields
      [key: string]: unknown;
    }>,
    options: {
      industry?: string;
      complianceFramework?: string;
      governingStandard?: string;
    } = {}
  ): Promise<TaxonomyIngestResult> {
    const start = Date.now();
    let classified = 0;
    let newViolations = 0;
    let dupes = 0;

    for (const lead of leads) {
      const entityName = String(lead.entity ?? lead["entityName"] ?? lead["respondent"] ?? lead["licensee"] ?? lead["bankName"] ?? lead["creditUnion"] ?? lead["permitHolder"] ?? lead["contractor"] ?? "Unknown");
      const state = String(lead["state"] ?? lead["entityState"] ?? "");
      const industry = options.industry ?? resolveIndustry(null, null, entityName);

      // Extract violation info from riskCategories
      const violationType = lead.riskCategories[0] ?? "ENFORCEMENT_ACTION";
      const violationDetail = lead.riskCategories.slice(1).join("; ") || null;

      // Map riskScore to severity
      let severity: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
      if (lead.riskScore >= 70) severity = "CRITICAL";
      else if (lead.riskScore >= 50) severity = "HIGH";
      else if (lead.riskScore >= 25) severity = "MODERATE";
      else severity = "LOW";

      // Generate a stable source record ID
      const sourceId = String(lead["id"] ?? lead["recallNumber"] ?? lead["violationNumber"] ?? lead["dotNumber"] ?? lead["ntsbNumber"] ?? lead["ein"] ?? lead["samNumber"] ?? lead["planNumber"] ?? `${pipeline}-${entityName}-${Date.now()}`);

      const result = await this.upsertEntry({
        sourcePipeline: pipeline,
        sourceRecordId: sourceId,
        naicsCode: null,
        naicsSector: null,
        industry,
        subIndustry: null,
        entityName,
        entityState: state || null,
        entityType: null,
        violationType,
        violationDetail,
        severity,
        governingStandard: options.governingStandard ?? null,
        governingStandardTitle: null,
        complianceFramework: options.complianceFramework ?? pipeline,
        gapScore: lead.riskScore,
        financialExposure: Number(lead["amount"] ?? lead["penaltyAmount"] ?? lead["propertyDamage"] ?? 0),
        failureDate: String(lead["dateIssued"] ?? lead["recallDate"] ?? lead["incidentDate"] ?? lead["eventDate"] ?? null),
      });

      classified++;
      if (result === "new") newViolations++;
      else dupes++;
    }

    return {
      pipeline,
      recordsProcessed: leads.length,
      recordsClassified: classified,
      newViolations,
      duplicatesSkipped: dupes,
      durationMs: Date.now() - start,
    };
  }

  // ─── Core Upsert ──────────────────────────────────────────────────────

  private async upsertEntry(entry: Omit<TaxonomyEntry, "id">): Promise<"new" | "existing"> {
    const id = generateId("tax");
    try {
      await this.db.prepare(`
        INSERT INTO failure_taxonomy (
          id, source_pipeline, source_record_id,
          naics_code, naics_sector, industry, sub_industry,
          entity_name, entity_state, entity_type,
          violation_type, violation_detail, severity,
          governing_standard, governing_standard_title, compliance_framework,
          gap_score, financial_exposure, failure_date
        ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18, ?19)
      `).bind(
        id, entry.sourcePipeline, entry.sourceRecordId,
        entry.naicsCode, entry.naicsSector, entry.industry, entry.subIndustry,
        entry.entityName, entry.entityState, entry.entityType,
        entry.violationType, entry.violationDetail, entry.severity,
        entry.governingStandard, entry.governingStandardTitle, entry.complianceFramework,
        entry.gapScore, entry.financialExposure, entry.failureDate,
      ).run();
      return "new";
    } catch (e: unknown) {
      // Unique constraint violation = duplicate, skip
      if (e instanceof Error && e.message.includes("UNIQUE")) {
        return "existing";
      }
      throw e;
    }
  }

  // ─── Query Methods ────────────────────────────────────────────────────

  /**
   * Get the full industry profile — what fails, how often, how badly.
   * This is the data that defines a Citizen's skill set.
   */
  async getIndustryProfile(industry: string): Promise<IndustryProfile> {
    const [totalRow, entityRow, violationRows, frameworkRows, stateRows, scoreRow, sevRows] = await Promise.all([
      this.db.prepare("SELECT COUNT(*) as cnt FROM failure_taxonomy WHERE industry = ?1").bind(industry).first<{ cnt: number }>(),
      this.db.prepare("SELECT COUNT(DISTINCT entity_name) as cnt FROM failure_taxonomy WHERE industry = ?1").bind(industry).first<{ cnt: number }>(),
      this.db.prepare("SELECT violation_type, COUNT(*) as cnt FROM failure_taxonomy WHERE industry = ?1 GROUP BY violation_type ORDER BY cnt DESC").bind(industry).all(),
      this.db.prepare("SELECT compliance_framework, COUNT(*) as cnt FROM failure_taxonomy WHERE industry = ?1 AND compliance_framework IS NOT NULL GROUP BY compliance_framework ORDER BY cnt DESC").bind(industry).all(),
      this.db.prepare("SELECT entity_state, COUNT(*) as cnt FROM failure_taxonomy WHERE industry = ?1 AND entity_state IS NOT NULL GROUP BY entity_state ORDER BY cnt DESC LIMIT 10").bind(industry).all(),
      this.db.prepare("SELECT AVG(gap_score) as avg_score, SUM(financial_exposure) as total_exposure FROM failure_taxonomy WHERE industry = ?1").bind(industry).first<{ avg_score: number; total_exposure: number }>(),
      this.db.prepare("SELECT severity, COUNT(*) as cnt FROM failure_taxonomy WHERE industry = ?1 GROUP BY severity").bind(industry).all(),
    ]);

    const severityDist: Record<string, number> = {};
    for (const row of (sevRows.results ?? [])) {
      severityDist[(row as Record<string, unknown>).severity as string] = (row as Record<string, unknown>).cnt as number;
    }

    return {
      industry,
      totalFailures: totalRow?.cnt ?? 0,
      uniqueEntities: entityRow?.cnt ?? 0,
      violationTypes: (violationRows.results ?? []).map(r => ({
        type: (r as Record<string, unknown>).violation_type as string,
        count: (r as Record<string, unknown>).cnt as number,
      })),
      frameworks: (frameworkRows.results ?? []).map(r => ({
        framework: (r as Record<string, unknown>).compliance_framework as string,
        count: (r as Record<string, unknown>).cnt as number,
      })),
      topStates: (stateRows.results ?? []).map(r => ({
        state: (r as Record<string, unknown>).entity_state as string,
        count: (r as Record<string, unknown>).cnt as number,
      })),
      avgGapScore: scoreRow?.avg_score ?? 0,
      totalExposure: scoreRow?.total_exposure ?? 0,
      severityDistribution: severityDist,
    };
  }

  /** Get all industries and their failure counts */
  async getIndustrySummary(): Promise<{ industry: string; count: number; uniqueEntities: number }[]> {
    const rows = await this.db.prepare(`
      SELECT industry, COUNT(*) as cnt, COUNT(DISTINCT entity_name) as entities
      FROM failure_taxonomy
      GROUP BY industry
      ORDER BY cnt DESC
    `).all();

    return (rows.results ?? []).map(r => ({
      industry: (r as Record<string, unknown>).industry as string,
      count: (r as Record<string, unknown>).cnt as number,
      uniqueEntities: (r as Record<string, unknown>).entities as number,
    }));
  }

  /** Get taxonomy-wide statistics */
  async getStats(): Promise<TaxonomyStats> {
    const [totalRow, pipelineRows, industryRows, violationRows, frameworkRows, sevRows, lastIngest] = await Promise.all([
      this.db.prepare("SELECT COUNT(*) as cnt FROM failure_taxonomy").first<{ cnt: number }>(),
      this.db.prepare("SELECT source_pipeline, COUNT(*) as cnt FROM failure_taxonomy GROUP BY source_pipeline ORDER BY cnt DESC").all(),
      this.db.prepare("SELECT industry, COUNT(*) as cnt FROM failure_taxonomy GROUP BY industry ORDER BY cnt DESC").all(),
      this.db.prepare("SELECT violation_type, COUNT(*) as cnt FROM failure_taxonomy GROUP BY violation_type ORDER BY cnt DESC LIMIT 20").all(),
      this.db.prepare("SELECT compliance_framework, COUNT(*) as cnt FROM failure_taxonomy WHERE compliance_framework IS NOT NULL GROUP BY compliance_framework ORDER BY cnt DESC").all(),
      this.db.prepare("SELECT severity, COUNT(*) as cnt FROM failure_taxonomy GROUP BY severity").all(),
      this.db.prepare("SELECT MAX(ingested_at) as last_at FROM failure_taxonomy").first<{ last_at: string }>(),
    ]);

    const toRecord = (rows: unknown[]): Record<string, number> => {
      const rec: Record<string, number> = {};
      for (const r of rows) {
        const row = r as Record<string, unknown>;
        const key = (Object.values(row)[0] as string) ?? "UNKNOWN";
        rec[key] = (Object.values(row)[1] as number) ?? 0;
      }
      return rec;
    };

    return {
      totalEntries: totalRow?.cnt ?? 0,
      byPipeline: toRecord(pipelineRows.results ?? []),
      byIndustry: toRecord(industryRows.results ?? []),
      byViolationType: toRecord(violationRows.results ?? []),
      byFramework: toRecord(frameworkRows.results ?? []),
      bySeverity: toRecord(sevRows.results ?? []),
      lastIngestAt: lastIngest?.last_at ?? null,
    };
  }

  // ─── Stats Logging ────────────────────────────────────────────────────

  private async logStats(
    statType: string, pipeline: string,
    processed: number, classified: number,
    newViolations: number, durationMs: number
  ): Promise<void> {
    try {
      await this.db.prepare(`
        INSERT INTO taxonomy_statistics (id, stat_type, pipeline, records_processed, records_classified, new_violations_found, duration_ms)
        VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
      `).bind(generateId("stat"), statType, pipeline, processed, classified, newViolations, durationMs).run();
    } catch {
      // Non-blocking — don't fail ingest over stats
    }
  }
}

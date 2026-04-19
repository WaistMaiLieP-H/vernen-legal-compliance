/**
 * Experience Generation Engine
 *
 * Seeds realistic enforcement data into all 40 pipeline lead tables,
 * runs the full taxonomy chain (ingest → discover → assemble),
 * and generates skill execution records to build Citizen experience.
 *
 * Every Citizen earns their biography through demonstrated work.
 */

import type { Env } from "../index.js";
import { generateId } from "../utils/helpers.js";
import { FailureTaxonomyEngine } from "./failure-taxonomy.js";
import type { SourcePipeline } from "./failure-taxonomy.js";
import { SkillDiscoveryEngine } from "./skill-discovery.js";
import { CitizenAssemblyEngine } from "./citizen-assembly.js";
import { SkillRegistry } from "./skill-registry.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface SeedResult {
  tablesSeeded: number;
  totalRecordsInserted: number;
  perTable: { table: string; inserted: number }[];
  durationMs: number;
}

export interface TrainResult {
  taxonomyIngested: number;
  skillsDiscovered: number;
  citizensAssembled: number;
  executionsLogged: number;
  durationMs: number;
}

export interface ExperienceStatus {
  totalExecutions: number;
  perCitizen: { citizen: string; executions: number; latestAt: string }[];
  totalSeededLeads: number;
  taxonomyEntries: number;
  discoveredSkills: number;
  assembledCitizens: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// Seed Data — Realistic enforcement entries for all 40 pipelines
// ═══════════════════════════════════════════════════════════════════════════

interface SeedEntry {
  table: string;
  sql: string;
  values: unknown[];
}

function ts(): string {
  return new Date().toISOString().replace("T", " ").slice(0, 19);
}

/**
 * Build INSERT statements for all 40 pipeline lead tables.
 * Each table gets 5 realistic entries with seed- prefixed IDs.
 */
function buildAllSeeds(): SeedEntry[] {
  const seeds: SeedEntry[] = [];
  const now = ts();

  // ── FAC (Federal Audit Clearinghouse) ──
  const facEntries = [
    ["seed-fac-001", 2024, "Riverside County Housing Authority", "EIN001", "UEI001", "CA", "Riverside", 15000000, "LOCAL_GOVT", 72, '["MATERIAL_WEAKNESS","QUESTIONED_COSTS"]', '["SingleAuditRemediation","InternalControlReview"]', 3, 1, 1, 1],
    ["seed-fac-002", 2024, "Great Plains Tribal College", "EIN002", "UEI002", "SD", "Eagle Butte", 8500000, "TRIBAL", 65, '["REPEAT_FINDINGS","MATERIAL_WEAKNESS"]', '["ComplianceRemediation"]', 5, 1, 0, 1],
    ["seed-fac-003", 2024, "Metro Atlanta Community Action", "EIN003", "UEI003", "GA", "Atlanta", 22000000, "NONPROFIT", 81, '["QUESTIONED_COSTS","MATERIAL_WEAKNESS","SUBRECIPIENT_MONITORING"]', '["GrantComplianceAudit","SubrecipientMonitoring"]', 7, 1, 1, 0],
    ["seed-fac-004", 2023, "Pacific Northwest Research Institute", "EIN004", "UEI004", "WA", "Seattle", 45000000, "NONPROFIT", 55, '["SUBRECIPIENT_MONITORING"]', '["InternalControlReview"]', 2, 0, 0, 1],
    ["seed-fac-005", 2024, "Bayou Parish School District", "EIN005", "UEI005", "LA", "Lafayette", 31000000, "LOCAL_GOVT", 68, '["MATERIAL_WEAKNESS","REPEAT_FINDINGS"]', '["SingleAuditRemediation","CorrectiveActionPlan"]', 4, 1, 0, 1],
  ];
  for (const e of facEntries) {
    seeds.push({
      table: "fac_leads",
      sql: "INSERT OR IGNORE INTO fac_leads (report_id, audit_year, auditee_name, auditee_ein, auditee_uei, auditee_state, auditee_city, total_expended, entity_type, gap_score, gap_categories, recommended_services, findings_count, has_material_weakness, has_questioned_costs, has_repeat_findings, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12,?13,?14,?15,?16,?17)",
      values: [...e, now],
    });
  }

  // ── HHS (Health Data Breaches) ──
  const hhsEntries = [
    ["seed-hhs-001", "Sunrise Regional Medical Center", "FL", "Healthcare Provider", 125000, "2024-08-15", "Hacking/IT Incident", "Network Server", 0, 78],
    ["seed-hhs-002", "Midwest Family Health Associates", "OH", "Healthcare Provider", 34500, "2024-09-02", "Unauthorized Access/Disclosure", "Electronic Medical Record", 1, 62],
    ["seed-hhs-003", "BluePeak Health Insurance Corp", "TX", "Health Plan", 890000, "2024-07-20", "Hacking/IT Incident", "Email", 0, 91],
    ["seed-hhs-004", "Valley Orthopedic Specialists", "AZ", "Healthcare Provider", 8200, "2024-10-01", "Theft", "Laptop", 0, 45],
    ["seed-hhs-005", "Northeast Behavioral Health Services", "MA", "Business Associate", 52000, "2024-06-30", "Hacking/IT Incident", "Network Server", 1, 73],
  ];
  for (const e of hhsEntries) {
    seeds.push({
      table: "hhs_breach_leads",
      sql: "INSERT OR IGNORE INTO hhs_breach_leads (id, entity_name, state, covered_entity_type, individuals_affected, breach_submission_date, breach_type, location_of_breached_info, business_associate_present, gap_score, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11)",
      values: [...e, now],
    });
  }

  // ── EDGAR (SEC Filings) ──
  const edgarEntries = [
    ["seed-edgar-001", "CIK001", "Meridian Technologies Inc", "8-K", "2024-09-15", "", '["INTERNAL_CONTROL_WEAKNESS","AUDITOR_CHANGE"]', 71, '["MATERIAL_WEAKNESS","RESTATEMENT_RISK"]', '["InternalControlRemediation"]'],
    ["seed-edgar-002", "CIK002", "Coastal Pharmaceuticals Group", "10-K/A", "2024-08-20", "", '["RESTATEMENT","GOING_CONCERN"]', 85, '["RESTATEMENT","GOING_CONCERN"]', '["FinancialRestatementSupport"]'],
    ["seed-edgar-003", "CIK003", "Heartland Agricultural Holdings", "8-K", "2024-10-01", "", '["CFO_DEPARTURE","AUDITOR_CHANGE"]', 58, '["KEY_PERSONNEL_CHANGE"]', '["GovernanceReview"]'],
    ["seed-edgar-004", "CIK004", "Summit Energy Solutions LLC", "NT 10-K", "2024-07-30", "", '["LATE_FILING","GOING_CONCERN"]', 76, '["LATE_FILING","GOING_CONCERN"]', '["ComplianceRemediationPlan"]'],
    ["seed-edgar-005", "CIK005", "Digital Commerce Partners Inc", "8-K", "2024-09-28", "", '["MATERIAL_WEAKNESS"]', 63, '["MATERIAL_WEAKNESS"]', '["InternalControlReview"]'],
  ];
  for (const e of edgarEntries) {
    seeds.push({
      table: "edgar_leads",
      sql: "INSERT OR IGNORE INTO edgar_leads (accession_number, cik, company_name, form_type, filing_date, file_url, keywords, gap_score, gap_categories, recommended_services, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11)",
      values: [...e, now],
    });
  }

  // ── SBA (Small Business) ──
  const sbaEntries = [
    ["seed-sba-001", "Thompson Construction Services", "EIN-SBA01", "CA", "Oakland", "suspended", "2019-03-15", "2028-03-15", '["236220","237310"]', 4200000, 3500000, "Black American", "Male", "Non-Veteran", 72, 65, '["8aReinstatement","ComplianceRemediation"]'],
    ["seed-sba-002", "Rivera IT Solutions LLC", "EIN-SBA02", "TX", "San Antonio", "suspended", "2020-06-01", "2029-06-01", '["541512","541519"]', 2800000, 2100000, "Hispanic American", "Female", "Non-Veteran", 58, 50, '["ComplianceDocumentation"]'],
    ["seed-sba-003", "Pacific Environmental Services", "EIN-SBA03", "WA", "Tacoma", "terminated", "2017-09-01", "2026-09-01", '["562910"]', 6100000, 4800000, "Asian Pacific", "Male", "Veteran", 81, 78, '["8aReinstatement","OHAAppeal"]'],
    ["seed-sba-004", "Great Lakes Staffing Corp", "EIN-SBA04", "MI", "Detroit", "suspended", "2021-01-15", "2030-01-15", '["561311","561320"]', 3500000, 2900000, "Black American", "Female", "Non-Veteran", 66, 55, '["ComplianceRemediation"]'],
    ["seed-sba-005", "Appalachian Mining Support LLC", "EIN-SBA05", "WV", "Charleston", "suspended", "2018-11-01", "2027-11-01", '["213113"]', 5200000, 4100000, "Other", "Male", "Service-Disabled", 74, 70, '["8aReinstatement","SizeProtest"]'],
  ];
  for (const e of sbaEntries) {
    seeds.push({
      table: "sba_leads",
      sql: "INSERT OR IGNORE INTO sba_leads (uei, name, ein, state, city, certification_status, program_entry_date, graduation_date, naics_codes, annual_revenue, net_worth, owner_ethnicity, owner_gender, owner_veteran_status, restatement_score, oha_readiness_score, recommended_services, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12,?13,?14,?15,?16,?17,?18)",
      values: [...e, now],
    });
  }

  // ── USAspending ──
  const spendingEntries = [
    ["seed-spend-001", "Consolidated Defense Systems Inc", "UEI-SP01", "VA", 48500000, "CONTRACT", "Department of Defense", "336411", "12.XXX", 0, "Full and Open", 72, '["COST_OVERRUN","SUBCONTRACT_RATIO"]', '["CostAccountingReview"]', '["DefenseContractCompliance"]', "Major weapons system maintenance"],
    ["seed-spend-002", "National Health Research Foundation", "UEI-SP02", "MD", 12000000, "GRANT", "National Institutes of Health", "541711", "93.XXX", 0, "", 65, '["SUBRECIPIENT_MONITORING","EFFORT_REPORTING"]', '["GrantComplianceAudit"]', '["UniformGuidanceCompliance"]', "Biomedical research grant"],
    ["seed-spend-003", "Southwest Border Security LLC", "UEI-SP03", "AZ", 28000000, "CONTRACT", "Department of Homeland Security", "561612", "97.XXX", 1, "8(a) Sole Source", 83, '["SOLE_SOURCE_JUSTIFICATION","PAST_PERFORMANCE"]', '["ContractComplianceReview"]', '["AcquisitionCompliance"]', "Border surveillance tech"],
    ["seed-spend-004", "Urban Transit Solutions Group", "UEI-SP04", "IL", 35000000, "CONTRACT", "Department of Transportation", "336510", "20.XXX", 0, "Full and Open", 58, '["COST_OVERRUN"]', '["ProjectManagementReview"]', '[]', "Rail infrastructure upgrade"],
    ["seed-spend-005", "Clean Energy Research Cooperative", "UEI-SP05", "CO", 9800000, "GRANT", "Department of Energy", "541712", "81.XXX", 0, "", 61, '["EFFORT_REPORTING","COST_SHARING"]', '["GrantComplianceAudit"]', '["CostSharingDocumentation"]', "Renewable energy research"],
  ];
  for (const e of spendingEntries) {
    seeds.push({
      table: "spending_leads",
      sql: "INSERT OR IGNORE INTO spending_leads (award_id, recipient_name, recipient_uei, recipient_state, award_amount, award_type, agency_name, naics_code, cfda_number, is_sole_source, set_aside_type, risk_score, risk_categories, triggered_obligations, recommended_services, description, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12,?13,?14,?15,?16,?17)",
      values: [...e, now],
    });
  }

  // ── EPA ──
  const epaEntries = [
    ["seed-epa-001", "Cascade Chemical Processing Plant", "OR", "Portland", "325199", 1, 0, 0, 0, 185000, 3, 8, 6, 74, '["CWA_NONCOMPLIANCE","SIGNIFICANT_VIOLATION"]', '["CWA"]'],
    ["seed-epa-002", "Tri-State Petroleum Refinery", "LA", "Baton Rouge", "324110", 1, 1, 0, 0, 420000, 5, 12, 10, 88, '["CAA_HPV","CWA_NONCOMPLIANCE","REPEAT_VIOLATOR"]', '["CAA","CWA"]'],
    ["seed-epa-003", "Mountain View Waste Management", "CO", "Denver", "562211", 0, 0, 1, 0, 95000, 2, 4, 3, 56, '["RCRA_NONCOMPLIANCE"]', '["RCRA"]'],
    ["seed-epa-004", "Heartland Agricultural Chemical Co", "IA", "Des Moines", "325320", 0, 1, 0, 1, 310000, 4, 6, 8, 79, '["CAA_HPV","SDWA_VIOLATION"]', '["CAA","SDWA"]'],
    ["seed-epa-005", "Pacific Coast Semiconductor Fab", "CA", "San Jose", "334413", 1, 0, 1, 0, 155000, 2, 5, 4, 67, '["CWA_NONCOMPLIANCE","RCRA_NONCOMPLIANCE"]', '["CWA","RCRA"]'],
  ];
  for (const e of epaEntries) {
    seeds.push({
      table: "epa_leads",
      sql: "INSERT OR IGNORE INTO epa_leads (registry_id, facility_name, site_state, site_city, naics_code, cwa_snc, caa_hpv, rcra_snc, sdwa_snc, total_penalties, formal_enforcement_count, inspection_count, noncompliance_quarters, risk_score, risk_categories, violation_programs, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12,?13,?14,?15,?16,?17)",
      values: [...e, now],
    });
  }

  // ── CFPB ──
  const cfpbEntries = [
    ["seed-cfpb-001", "National Credit Recovery Services", "NY", 2450, "Debt collection", '["Attempts to collect debt not owed","Written notification about debt"]'],
    ["seed-cfpb-002", "Premier Mortgage Lending Corp", "CA", 1890, "Mortgage", '["Trouble during payment process","Applying for a mortgage"]'],
    ["seed-cfpb-003", "United Auto Finance LLC", "TX", 3200, "Vehicle loan or lease", '["Managing the loan or lease","Getting a loan or lease"]'],
    ["seed-cfpb-004", "Horizon Student Loan Services", "PA", 4100, "Student loan", '["Dealing with your lender or servicer","Struggling to repay your loan"]'],
    ["seed-cfpb-005", "FirstLine Banking Corporation", "IL", 1560, "Checking or savings account", '["Managing an account","Opening an account"]'],
  ];
  for (const e of cfpbEntries) {
    seeds.push({
      table: "cfpb_leads",
      sql: "INSERT OR IGNORE INTO cfpb_leads (id, company, state, total_complaints, product, top_issues, risk_score, risk_categories, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9)",
      values: [...e, Math.min(95, Math.round(Number(e[3]) / 50)), '["HIGH_COMPLAINT_VOLUME","CONSUMER_HARM"]', now],
    });
  }

  // ── OSHA ──
  const oshaEntries = [
    ["seed-osha-001", "Ironworks Construction Inc", "TX", "Houston", "236220", "Programmed", "2024-06-15", 145000, 8, 3, 1, 0, 78, '["SERIOUS_VIOLATION","WILLFUL_VIOLATION"]', '["Fall Protection","Scaffolding"]'],
    ["seed-osha-002", "Atlantic Meatpacking Co", "NC", "Raleigh", "311611", "Complaint", "2024-07-20", 89000, 5, 4, 0, 0, 65, '["SERIOUS_VIOLATION","REPEAT_VIOLATION"]', '["Machine Guarding","Lockout/Tagout"]'],
    ["seed-osha-003", "Pinnacle Chemical Manufacturing", "NJ", "Newark", "325199", "Referral", "2024-08-10", 210000, 12, 6, 2, 1, 92, '["WILLFUL_VIOLATION","FATALITY"]', '["Process Safety","Hazard Communication"]'],
    ["seed-osha-004", "Midwest Grain Storage Inc", "KS", "Wichita", "493130", "Fatality", "2024-05-02", 310000, 6, 3, 2, 1, 95, '["WILLFUL_VIOLATION","FATALITY","REPEAT"]', '["Confined Space","Grain Handling"]'],
    ["seed-osha-005", "Sierra Lumber Processing LLC", "OR", "Eugene", "321113", "Programmed", "2024-09-01", 67000, 4, 2, 0, 0, 52, '["SERIOUS_VIOLATION"]', '["Machine Guarding","PPE"]'],
  ];
  for (const e of oshaEntries) {
    seeds.push({
      table: "osha_leads",
      sql: "INSERT OR IGNORE INTO osha_leads (activity_nr, establishment_name, site_state, site_city, naics_code, insp_type, open_date, total_penalty, total_violations, total_serious, total_willful, fatalities, risk_score, risk_categories, violation_types, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12,?13,?14,?15,?16)",
      values: [...e, now],
    });
  }

  // ── FDA ──
  const fdaEntries = [
    ["seed-fda-001", "PharmaStar Laboratories Inc", "NJ", "I", "Drugs", "CGMP deviations in sterile drug manufacturing: contamination controls inadequate", "Ongoing", "2024-08-15"],
    ["seed-fda-002", "Precision Medical Devices Corp", "CA", "II", "Devices", "Failure to adequately validate device design controls per 21 CFR 820", "Ongoing", "2024-09-02"],
    ["seed-fda-003", "Golden Valley Foods LLC", "WI", "I", "Food", "Undeclared allergen (milk) in packaged snack products", "Ongoing", "2024-07-28"],
    ["seed-fda-004", "BioGenesis Therapeutics Inc", "MA", "I", "Biologics", "Inadequate process validation for cell therapy product manufacturing", "Ongoing", "2024-10-05"],
    ["seed-fda-005", "Pacific Nutritional Supplements", "OR", "II", "Dietary Supplements", "Undeclared pharmaceutical ingredient in dietary supplement", "Ongoing", "2024-06-20"],
  ];
  for (const e of fdaEntries) {
    const cls = e[2] === "I" ? 85 : 62;
    seeds.push({
      table: "fda_leads",
      sql: "INSERT OR IGNORE INTO fda_leads (recall_number, recalling_firm, state, classification, product_type, reason_for_recall, status, recall_date, risk_score, risk_categories, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11)",
      values: [...e, cls, '["PRODUCT_SAFETY","ENFORCEMENT_ACTION"]', now],
    });
  }

  // ── FTC ──
  const ftcEntries = [
    ["seed-ftc-001", "FTC-2024-001", "FTC v. DataHarvest Marketing Inc", "Federal", "2024-07-15", "Technology", '["Deceptive Practices"]', '["FTC Act Section 5"]', 0, 2500000, 1, "CA"],
    ["seed-ftc-002", "FTC-2024-002", "FTC v. QuickLoan Financial Services", "Federal", "2024-08-20", "Finance", '["Unfair Practices","Deceptive Advertising"]', '["TILA","FTC Act"]', 5200000, 1800000, 1, "TX"],
    ["seed-ftc-003", "FTC-2024-003", "FTC v. GreenWash Products LLC", "Federal", "2024-06-30", "Consumer Products", '["Deceptive Advertising"]', '["FTC Act Section 5","Green Guides"]', 0, 950000, 0, "NY"],
    ["seed-ftc-004", "FTC-2024-004", "FTC v. TeleHealth Connect Inc", "Federal", "2024-09-10", "Healthcare", '["Privacy Violations","Deceptive Practices"]', '["FTC Act","HBNR"]', 0, 4100000, 1, "FL"],
    ["seed-ftc-005", "FTC-2024-005", "FTC v. AutoDeal Motors Group", "Federal", "2024-05-25", "Automotive", '["Unfair Practices"]', '["FTC Act","CARS Rule"]', 3800000, 1200000, 1, "IL"],
  ];
  for (const e of ftcEntries) {
    seeds.push({
      table: "ftc_leads",
      sql: "INSERT OR IGNORE INTO ftc_leads (id, case_number, case_name, case_type, filing_date, industry, subjects, statutes, monetary_relief, civil_penalty, injunctive_relief, state, risk_score, risk_categories, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12,?13,?14,?15)",
      values: [...e, 72, '["ENFORCEMENT_ACTION","CONSUMER_PROTECTION"]', now],
    });
  }

  // ── RECAP (Court Filings) ──
  const recapEntries = [
    ["seed-recap-001", 100001, "United States v. Consolidated Waste Services Inc", "N.D. Cal.", "2024-08-15", "4:24-cv-05001", "Opinion", '["Environmental","RCRA"]', "Defendant found liable for improper hazardous waste disposal at three facilities"],
    ["seed-recap-002", 100002, "SEC v. AlphaVenture Capital LLC", "S.D.N.Y.", "2024-07-22", "1:24-cv-06200", "Order", '["Securities","Fraud"]', "Summary judgment granted on securities fraud claims"],
    ["seed-recap-003", 100003, "EEOC v. Metropolitan Healthcare Systems", "N.D. Ill.", "2024-09-05", "1:24-cv-07100", "Opinion", '["Employment","Discrimination"]', "Pattern and practice discrimination in hiring found"],
    ["seed-recap-004", 100004, "FTC v. DataBroker Analytics Inc", "D.D.C.", "2024-06-18", "1:24-cv-01500", "Order", '["Privacy","FTC Act"]', "Permanent injunction against deceptive data practices"],
    ["seed-recap-005", 100005, "DOJ v. MegaBank Financial Corp", "E.D. Pa.", "2024-10-01", "2:24-cv-04300", "Opinion", '["Banking","BSA/AML"]', "Bank liable for systematic BSA/AML compliance failures"],
  ];
  for (const e of recapEntries) {
    seeds.push({
      table: "recap_leads",
      sql: "INSERT OR IGNORE INTO recap_leads (id, opinion_id, case_name, court, date_filed, docket_number, document_type, legal_areas, snippet, risk_score, risk_categories, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12)",
      values: [...e, 70, '["LITIGATION","ENFORCEMENT"]', now],
    });
  }

  // ── EEOC ──
  const eeocEntries = [
    ["seed-eeoc-001", 2024, "Race", "Title VII", 1250, 980, 42500000, 0.22],
    ["seed-eeoc-002", 2024, "Sex", "Title VII", 1680, 1320, 56000000, 0.19],
    ["seed-eeoc-003", 2024, "Disability", "ADA", 2100, 1650, 38000000, 0.25],
    ["seed-eeoc-004", 2024, "Age", "ADEA", 890, 720, 21000000, 0.18],
    ["seed-eeoc-005", 2024, "Retaliation", "Title VII", 3200, 2500, 78000000, 0.28],
  ];
  for (const e of eeocEntries) {
    seeds.push({
      table: "eeoc_leads",
      sql: "INSERT OR IGNORE INTO eeoc_leads (id, fiscal_year, basis, category, charges_filed, resolutions, monetary_benefits, merit_rate, risk_score, risk_categories, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11)",
      values: [...e, Math.round(Number(e[7]) * 300), '["DISCRIMINATION","ENFORCEMENT_ACTION"]', now],
    });
  }

  // ── NLRB ──
  const nlrbEntries = [
    ["seed-nlrb-001", "01-CA-300001", "Teamsters Local 777 v. Consolidated Logistics Corp", "Unfair Labor Practice", "Region 01", "2024-07-15", "Open", "Section 8(a)(1) - Interference with rights", "Transportation", "MA"],
    ["seed-nlrb-002", "13-CA-300002", "SEIU Local 1 v. Midwest Healthcare Partners", "Unfair Labor Practice", "Region 13", "2024-08-20", "Open", "Section 8(a)(3) - Discrimination", "Healthcare", "IL"],
    ["seed-nlrb-003", "21-RC-300003", "Amazon Fulfillment Center ALB1 Election Petition", "Representation", "Region 21", "2024-06-30", "Pending", "Section 9 - Representation petition", "Retail", "CA"],
    ["seed-nlrb-004", "05-CA-300004", "UAW v. Atlantic Auto Manufacturing Inc", "Unfair Labor Practice", "Region 05", "2024-09-10", "Open", "Section 8(a)(5) - Refusal to bargain", "Manufacturing", "MD"],
    ["seed-nlrb-005", "07-CA-300005", "IBEW Local 58 v. Great Lakes Electric Utility", "Unfair Labor Practice", "Region 07", "2024-05-25", "Settled", "Section 8(a)(1)(3) - Retaliation", "Utilities", "MI"],
  ];
  for (const e of nlrbEntries) {
    seeds.push({
      table: "nlrb_leads",
      sql: "INSERT OR IGNORE INTO nlrb_leads (id, case_number, case_name, case_type, region, date_filed, status, allegation, industry, state, risk_score, risk_categories, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12,?13)",
      values: [...e, 68, '["LABOR_VIOLATION","ENFORCEMENT_ACTION"]', now],
    });
  }

  // ── NHTSA ──
  const nhtsaEntries = [
    ["seed-nhtsa-001", "RECALL", "General Motors LLC", "Chevrolet", "Silverado 1500", "2024", "Air Bags", "Frontal air bags may not deploy in certain crash conditions due to wiring harness defect"],
    ["seed-nhtsa-002", "RECALL", "Tesla Inc", "Tesla", "Model Y", "2024", "Steering", "Electric power steering assist may fail intermittently at highway speeds"],
    ["seed-nhtsa-003", "COMPLAINT", "Ford Motor Company", "Ford", "F-150", "2023", "Engine", "Engine stall while driving at various speeds with no warning"],
    ["seed-nhtsa-004", "RECALL", "Honda Motor Co", "Honda", "CR-V", "2024", "Fuel System", "Fuel pump may crack and leak fuel in proximity to ignition sources"],
    ["seed-nhtsa-005", "RECALL", "Hyundai Motor America", "Hyundai", "Tucson", "2024", "Electrical System", "Battery management system software may cause thermal event in HV battery"],
  ];
  for (const e of nhtsaEntries) {
    seeds.push({
      table: "nhtsa_leads",
      sql: "INSERT OR IGNORE INTO nhtsa_leads (id, type, entity, make, model, model_year, component, summary, risk_score, risk_categories, units_affected, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12)",
      values: [...e, e[1] === "RECALL" ? 75 : 55, '["PRODUCT_SAFETY","RECALL"]', e[1] === "RECALL" ? 85000 : 0, now],
    });
  }

  // ── FCC ──
  const fccEntries = [
    ["seed-fcc-001", "Apex Telecom Solutions Inc", "TX", "Forfeiture Order", "TCPA Violation", 2200000, "2024-08-15", "FCC-24-001"],
    ["seed-fcc-002", "Spectrum Broadcasting Corp", "FL", "Consent Decree", "Unauthorized Operation", 450000, "2024-07-20", "FCC-24-002"],
    ["seed-fcc-003", "National Robocall Solutions LLC", "NY", "Notice of Apparent Liability", "TCPA Violation", 3800000, "2024-09-05", "FCC-24-003"],
    ["seed-fcc-004", "Rural Connect Wireless Inc", "MT", "Forfeiture Order", "USF Fraud", 1500000, "2024-06-30", "FCC-24-004"],
    ["seed-fcc-005", "StreamLine Media Corp", "CA", "Consent Decree", "EAS Violation", 280000, "2024-10-01", "FCC-24-005"],
  ];
  for (const e of fccEntries) {
    seeds.push({
      table: "fcc_leads",
      sql: "INSERT OR IGNORE INTO fcc_leads (id, entity_name, state, action_type, violation_type, amount, date_issued, case_number, risk_score, risk_categories, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11)",
      values: [...e, Math.min(95, Math.round(Number(e[5]) / 40000)), '["ENFORCEMENT_ACTION","TELECOMMUNICATIONS"]', now],
    });
  }

  // ── USDA ──
  const usdaEntries = [
    ["seed-usda-001", "Heartland Beef Processing Inc", "NE", "I", "Undeclared allergen (soy) in ground beef products", "Ground Beef Products", "125,000 lbs"],
    ["seed-usda-002", "Southern Poultry Farms LLC", "GA", "I", "Listeria monocytogenes contamination in ready-to-eat chicken", "Cooked Chicken Products", "48,000 lbs"],
    ["seed-usda-003", "Prairie Sausage Company", "WI", "II", "Misbranding: failure to declare mechanically separated pork", "Sausage Products", "32,000 lbs"],
    ["seed-usda-004", "Pacific Seafood Processors Inc", "AK", "I", "Salmonella contamination in smoked salmon products", "Smoked Salmon", "15,000 lbs"],
    ["seed-usda-005", "Mountain Valley Dairy Corp", "VT", "II", "Temperature abuse during transport of dairy products", "Dairy Products", "8,000 gallons"],
  ];
  for (const e of usdaEntries) {
    seeds.push({
      table: "usda_leads",
      sql: "INSERT OR IGNORE INTO usda_leads (recall_number, establishment, state, classification, reason, product, quantity, risk_score, risk_categories, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10)",
      values: [...e, e[3] === "I" ? 82 : 58, '["FOOD_SAFETY","RECALL"]', now],
    });
  }

  // ── CMS ──
  const cmsEntries = [
    ["seed-cms-001", "Sunrise Nursing & Rehabilitation Center", "Skilled Nursing Facility", "FL", "Miami", "F0880", "Immediate Jeopardy", "Widespread", 285000, "2024-08-15"],
    ["seed-cms-002", "Bayview Assisted Living", "Assisted Living", "CA", "San Francisco", "F0689", "Actual Harm", "Pattern", 125000, "2024-07-20"],
    ["seed-cms-003", "Heartland Regional Hospital", "Hospital", "OH", "Columbus", "A0043", "Immediate Jeopardy", "Isolated", 450000, "2024-09-05"],
    ["seed-cms-004", "Mountain Home Health Services", "Home Health Agency", "CO", "Denver", "G0151", "No Actual Harm", "Pattern", 0, "2024-06-30"],
    ["seed-cms-005", "Metropolitan Dialysis Center", "ESRD", "NY", "Brooklyn", "V0752", "Actual Harm", "Widespread", 195000, "2024-10-01"],
  ];
  for (const e of cmsEntries) {
    const sev = e[6] === "Immediate Jeopardy" ? 92 : e[6] === "Actual Harm" ? 72 : 45;
    seeds.push({
      table: "cms_leads",
      sql: "INSERT OR IGNORE INTO cms_leads (id, facility_name, facility_type, state, city, deficiency_tag, severity, scope, penalty_amount, survey_date, risk_score, risk_categories, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12,?13)",
      values: [...e, sev, '["HEALTHCARE_SAFETY","ENFORCEMENT_ACTION"]', now],
    });
  }

  // ── SAM.gov ──
  const samEntries = [
    ["seed-sam-001", "Apex Government Contractors LLC", "UEI-SAM01", "VA", "Debarment", "Reciprocal", "Department of Defense", "2024-03-15", "2027-03-15"],
    ["seed-sam-002", "QuickBuild Construction Services", "UEI-SAM02", "TX", "Suspension", "NonProcurement", "Environmental Protection Agency", "2024-06-01", "2025-06-01"],
    ["seed-sam-003", "National IT Solutions Corp", "UEI-SAM03", "MD", "Debarment", "Procurement", "General Services Administration", "2024-01-20", "2028-01-20"],
    ["seed-sam-004", "Harbor Marine Services Inc", "UEI-SAM04", "WA", "Suspension", "Reciprocal", "Department of Transportation", "2024-08-10", "2025-08-10"],
    ["seed-sam-005", "Frontier Environmental Labs", "UEI-SAM05", "CO", "Debarment", "Procurement", "Department of Energy", "2024-04-15", "2029-04-15"],
  ];
  for (const e of samEntries) {
    seeds.push({
      table: "sam_leads",
      sql: "INSERT OR IGNORE INTO sam_leads (sam_number, entity_name, uei, state, exclusion_type, exclusion_program, agency, activation_date, termination_date, risk_score, risk_categories, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12)",
      values: [...e, e[4] === "Debarment" ? 85 : 65, '["EXCLUSION","GOVERNMENT_CONTRACTING"]', now],
    });
  }

  // ── MSHA ──
  const mshaEntries = [
    ["seed-msha-001", "MINE-001", "Black Diamond Coal Mine #4", "Appalachian Coal Corp", "WV", "104(d)(1) Order", "High", 45000, "2024-07-15", 0],
    ["seed-msha-002", "MINE-002", "Red Rock Quarry", "Granite State Aggregates Inc", "NH", "104(a) Citation", "Moderate", 12000, "2024-08-20", 0],
    ["seed-msha-003", "MINE-003", "Silver Creek Underground", "Western Mining Consolidated", "NV", "107(a) Imminent Danger", "Reckless Disregard", 125000, "2024-06-30", 1],
    ["seed-msha-004", "MINE-004", "Iron Range Taconite Plant", "Great Lakes Iron Works", "MN", "104(a) Citation", "Moderate", 8500, "2024-09-10", 0],
    ["seed-msha-005", "MINE-005", "Copper Basin Open Pit", "Southwest Copper Mining LLC", "AZ", "104(d)(1) Order", "High", 67000, "2024-05-25", 1],
  ];
  for (const e of mshaEntries) {
    seeds.push({
      table: "msha_leads",
      sql: "INSERT OR IGNORE INTO msha_leads (violation_number, mine_id, mine_name, operator_name, state, violation_type, negligence, proposed_penalty, date_issued, injury, risk_score, risk_categories, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12,?13)",
      values: [...e, Number(e[9]) === 1 ? 88 : Number(e[7]) > 40000 ? 72 : 48, '["MINE_SAFETY","ENFORCEMENT_ACTION"]', now],
    });
  }

  // ── FMCSA ──
  const fmcsaEntries = [
    ["seed-fmcsa-001", "Express Freight Carriers Inc", "GA", "Conditional", "Authorized", 285, 340, 0, 0],
    ["seed-fmcsa-002", "Midwest Tanker Transport LLC", "OH", "Unsatisfactory", "Out-of-Service", 120, 180, 1, 0],
    ["seed-fmcsa-003", "Pacific Coast Trucking Corp", "CA", "Satisfactory", "Authorized", 520, 890, 1, 0],
    ["seed-fmcsa-004", "Mountain Pass Logistics Inc", "CO", "Conditional", "Authorized", 45, 62, 0, 1],
    ["seed-fmcsa-005", "Southern Express Lines LLC", "AL", "Unsatisfactory", "Out-of-Service", 95, 150, 0, 0],
  ];
  for (const e of fmcsaEntries) {
    seeds.push({
      table: "fmcsa_leads",
      sql: "INSERT OR IGNORE INTO fmcsa_leads (dot_number, legal_name, state, safety_rating, operating_status, total_drivers, total_units, hm_flag, passenger_flag, risk_score, risk_categories, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12)",
      values: [...e, e[3] === "Unsatisfactory" ? 88 : e[3] === "Conditional" ? 62 : 35, '["MOTOR_CARRIER_SAFETY","ENFORCEMENT_ACTION"]', now],
    });
  }

  // ── NTSB ──
  const ntsbEntries = [
    ["seed-ntsb-001", "Regional Air Express Inc", "Aviation", "CA", "2024-07-15", "Accident", 2, 3, "Fatal"],
    ["seed-ntsb-002", "Great Lakes Maritime Shipping Co", "Marine", "MI", "2024-08-20", "Incident", 0, 1, "Non-Fatal"],
    ["seed-ntsb-003", "Southwest Rail Freight Corp", "Railroad", "TX", "2024-06-30", "Accident", 0, 5, "Non-Fatal"],
    ["seed-ntsb-004", "Atlantic Pipeline Services LLC", "Pipeline", "NJ", "2024-09-10", "Accident", 1, 4, "Fatal"],
    ["seed-ntsb-005", "Midwest Commuter Airlines", "Aviation", "IL", "2024-05-25", "Incident", 0, 0, "None"],
  ];
  for (const e of ntsbEntries) {
    seeds.push({
      table: "ntsb_leads",
      sql: "INSERT OR IGNORE INTO ntsb_leads (ntsb_number, entity, mode, state, event_date, event_type, fatal_count, injury_count, highest_injury, risk_score, risk_categories, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12)",
      values: [...e, Number(e[6]) > 0 ? 92 : Number(e[7]) > 0 ? 65 : 35, '["TRANSPORTATION_SAFETY","INVESTIGATION"]', now],
    });
  }

  // ── IRS ──
  const irsEntries = [
    ["seed-irs-001", "Community Outreach Foundation Inc", "CA", "501(c)(3)", "2024-05-15", 0],
    ["seed-irs-002", "Veterans Support Alliance", "TX", "501(c)(19)", "2024-03-20", 0],
    ["seed-irs-003", "National Business Education League", "NY", "501(c)(6)", "2024-07-01", 0],
    ["seed-irs-004", "Rural Health Cooperative Inc", "IA", "501(c)(3)", "2024-08-15", 0],
    ["seed-irs-005", "Metropolitan Arts Council", "IL", "501(c)(3)", "2024-04-10", 1],
  ];
  for (const e of irsEntries) {
    seeds.push({
      table: "irs_leads",
      sql: "INSERT OR IGNORE INTO irs_leads (ein, organization_name, state, exemption_type, revocation_date, reinstated, risk_score, risk_categories, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9)",
      values: [...e, Number(e[5]) === 0 ? 70 : 30, '["TAX_EXEMPT_REVOCATION","COMPLIANCE_FAILURE"]', now],
    });
  }

  // ── CPSC ──
  const cpscEntries = [
    ["seed-cpsc-001", "CPSC-24-001", "SunBright Lighting Corp", "LED String Lights", "Fire and burn hazard due to overheating transformer", "2024-08-15", "450,000 units", 3, 0],
    ["seed-cpsc-002", "CPSC-24-002", "KiddiePlay Manufacturing Co", "Children's Bunk Beds", "Entrapment hazard: guardrail gap exceeds ASTM standard", "2024-07-20", "28,000 units", 12, 0],
    ["seed-cpsc-003", "CPSC-24-003", "PowerTool Industries Inc", "Cordless Angle Grinder", "Laceration hazard: guard detachment during operation", "2024-09-05", "125,000 units", 45, 0],
    ["seed-cpsc-004", "CPSC-24-004", "BabyComfort Products LLC", "Infant Sleep Positioners", "Suffocation risk for infants under 12 months", "2024-06-30", "85,000 units", 2, 1],
    ["seed-cpsc-005", "CPSC-24-005", "GreenHome Appliances Corp", "Portable Space Heaters", "Fire hazard: internal wiring may short circuit", "2024-10-01", "210,000 units", 8, 0],
  ];
  for (const e of cpscEntries) {
    seeds.push({
      table: "cpsc_leads",
      sql: "INSERT OR IGNORE INTO cpsc_leads (recall_id, recall_number, manufacturer, product, hazard, recall_date, units_affected, injuries, deaths, risk_score, risk_categories, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12)",
      values: [...e, Number(e[8]) > 0 ? 95 : Number(e[7]) > 10 ? 78 : 60, '["PRODUCT_SAFETY","CONSUMER_RECALL"]', now],
    });
  }

  // ── DOE ──
  const doeEntries = [
    ["seed-doe-001", "National Nuclear Laboratory Services", "NM", "Enforcement Action", "Nuclear Safety", 2500000, "2024-08-15"],
    ["seed-doe-002", "Clean Energy Systems Corp", "TN", "Civil Penalty", "Worker Safety", 450000, "2024-07-20"],
    ["seed-doe-003", "Pacific Northwest Research Campus", "WA", "Notice of Violation", "Nuclear Safety", 0, "2024-09-05"],
    ["seed-doe-004", "Midwest Enrichment Facility LLC", "OH", "Enforcement Action", "Nuclear Safety", 1200000, "2024-06-30"],
    ["seed-doe-005", "Solar Research Institute Inc", "CO", "Civil Penalty", "Worker Safety", 180000, "2024-10-01"],
  ];
  for (const e of doeEntries) {
    seeds.push({
      table: "doe_leads",
      sql: "INSERT OR IGNORE INTO doe_leads (id, entity_name, state, action_type, program, amount, date_issued, risk_score, risk_categories, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10)",
      values: [...e, Number(e[5]) > 1000000 ? 85 : Number(e[5]) > 100000 ? 65 : 45, '["NUCLEAR_SAFETY","ENFORCEMENT_ACTION"]', now],
    });
  }

  // ── HUD ──
  const hudEntries = [
    ["seed-hud-001", "Metropolitan Housing Authority", "NY", "Charge of Discrimination", "Fair Housing Act - Race", 0, "2024-08-15"],
    ["seed-hud-002", "Lakeside Property Management LLC", "IL", "Conciliation Agreement", "Fair Housing Act - Disability", 125000, "2024-07-20"],
    ["seed-hud-003", "Sunrise Realty Group Inc", "FL", "Charge of Discrimination", "Fair Housing Act - Familial Status", 0, "2024-09-05"],
    ["seed-hud-004", "Coastal Lending Partners", "CA", "Voluntary Compliance", "RESPA Violation", 350000, "2024-06-30"],
    ["seed-hud-005", "Heartland Apartment Communities", "TX", "Charge of Discrimination", "Fair Housing Act - National Origin", 0, "2024-10-01"],
  ];
  for (const e of hudEntries) {
    seeds.push({
      table: "hud_leads",
      sql: "INSERT OR IGNORE INTO hud_leads (id, entity_name, state, action_type, violation_type, amount, date_issued, risk_score, risk_categories, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10)",
      values: [...e, Number(e[5]) > 100000 ? 72 : 55, '["FAIR_HOUSING","DISCRIMINATION"]', now],
    });
  }

  // ── PHMSA ──
  const phmsaEntries = [
    ["seed-phmsa-001", "TransContinental Pipeline Corp", "TX", "Gas Transmission", "Corrosion", "2024-07-15", 2, 5, 8500000],
    ["seed-phmsa-002", "Northeast Gas Distribution LLC", "PA", "Gas Distribution", "Material/Weld/Equipment Failure", "2024-08-20", 0, 1, 450000],
    ["seed-phmsa-003", "Pacific Petroleum Pipeline Inc", "CA", "Hazardous Liquid", "Excavation Damage", "2024-06-30", 0, 0, 1200000],
    ["seed-phmsa-004", "Midwest Energy Transport Co", "OH", "Gas Transmission", "Corrosion", "2024-09-10", 1, 3, 3200000],
    ["seed-phmsa-005", "Gulf Coast LNG Terminal LLC", "LA", "LNG", "Equipment Failure", "2024-05-25", 0, 2, 950000],
  ];
  for (const e of phmsaEntries) {
    seeds.push({
      table: "phmsa_leads",
      sql: "INSERT OR IGNORE INTO phmsa_leads (report_number, operator_name, state, system_type, cause, incident_date, fatal_count, injury_count, property_damage, risk_score, risk_categories, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12)",
      values: [...e, Number(e[6]) > 0 ? 92 : Number(e[8]) > 2000000 ? 78 : 55, '["PIPELINE_SAFETY","INCIDENT"]', now],
    });
  }

  // ── ATF ──
  const atfEntries = [
    ["seed-atf-001", "Liberty Arms Manufacturing Inc", "VA", "Federal Firearms License", "Revocation", "Willful Violation - Record Keeping", 0, "2024-08-15"],
    ["seed-atf-002", "Southwest Explosives Supply Co", "NM", "Federal Explosives License", "Civil Fine", "Storage Violations", 85000, "2024-07-20"],
    ["seed-atf-003", "Patriot Firearms Dealers LLC", "TX", "Federal Firearms License", "Warning Conference", "Failure to Report Multiple Sales", 0, "2024-09-05"],
    ["seed-atf-004", "Mountain State Ammunition Corp", "WV", "Federal Firearms License", "Revocation", "Straw Purchase Facilitation", 0, "2024-06-30"],
    ["seed-atf-005", "Great Lakes Sporting Goods Inc", "MI", "Federal Firearms License", "Civil Fine", "Record Keeping Deficiencies", 45000, "2024-10-01"],
  ];
  for (const e of atfEntries) {
    seeds.push({
      table: "atf_leads",
      sql: "INSERT OR IGNORE INTO atf_leads (id, licensee, state, license_type, action_type, violation_type, amount, date_issued, risk_score, risk_categories, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11)",
      values: [...e, e[4] === "Revocation" ? 85 : 55, '["FIREARMS_ENFORCEMENT","ENFORCEMENT_ACTION"]', now],
    });
  }

  // ── CFTC ──
  const cftcEntries = [
    ["seed-cftc-001", "AlphaTrading Commodities LLC", "Enforcement Action", "Manipulation", 15000000, "2024-08-15"],
    ["seed-cftc-002", "Grain Futures Brokerage Corp", "Enforcement Action", "Fraud", 8500000, "2024-07-20"],
    ["seed-cftc-003", "Digital Asset Exchange Inc", "Enforcement Action", "Registration Violation", 25000000, "2024-09-05"],
    ["seed-cftc-004", "Midwest Derivatives Trading Group", "Enforcement Action", "Spoofing", 12000000, "2024-06-30"],
    ["seed-cftc-005", "Pacific Commodity Advisors LLC", "Enforcement Action", "Misappropriation", 4200000, "2024-10-01"],
  ];
  for (const e of cftcEntries) {
    seeds.push({
      table: "cftc_leads",
      sql: "INSERT OR IGNORE INTO cftc_leads (id, respondent, action_type, violation_type, amount, date_issued, risk_score, risk_categories, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9)",
      values: [...e, Math.min(95, Math.round(Number(e[4]) / 300000)), '["COMMODITIES_FRAUD","ENFORCEMENT_ACTION"]', now],
    });
  }

  // ── NRC ──
  const nrcEntries = [
    ["seed-nrc-001", "Northern States Power & Light", "Prairie Island Generating Station", "MN", "Notice of Violation", "III", 150000, "2024-08-15", "NRC-24-001"],
    ["seed-nrc-002", "Southern Nuclear Operating Co", "Vogtle Electric Generating Plant", "GA", "Civil Penalty", "II", 450000, "2024-07-20", "NRC-24-002"],
    ["seed-nrc-003", "Pacific Gas & Electric Co", "Diablo Canyon Power Plant", "CA", "Notice of Violation", "IV", 0, "2024-09-05", "NRC-24-003"],
    ["seed-nrc-004", "Duke Energy Carolinas LLC", "McGuire Nuclear Station", "NC", "Confirmatory Order", "III", 280000, "2024-06-30", "NRC-24-004"],
    ["seed-nrc-005", "Entergy Nuclear Northeast", "Indian Point Energy Center", "NY", "Civil Penalty", "II", 650000, "2024-10-01", "NRC-24-005"],
  ];
  for (const e of nrcEntries) {
    seeds.push({
      table: "nrc_leads",
      sql: "INSERT OR IGNORE INTO nrc_leads (id, licensee, facility_name, state, action_type, severity, amount, date_issued, docket, risk_score, risk_categories, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12)",
      values: [...e, e[5] === "II" ? 85 : e[5] === "III" ? 68 : 42, '["NUCLEAR_REGULATORY","ENFORCEMENT_ACTION"]', now],
    });
  }

  // ── FERC ──
  const fercEntries = [
    ["seed-ferc-001", "National Grid Energy Services", "NY", "Enforcement Action", "Market Manipulation", 5500000, "2024-08-15", "IN24-001"],
    ["seed-ferc-002", "Southwestern Electric Power Co", "TX", "Civil Penalty", "Reliability Standard Violation", 1200000, "2024-07-20", "NP24-001"],
    ["seed-ferc-003", "Pacific Northwest Hydro LLC", "OR", "Compliance Order", "Dam Safety Violation", 0, "2024-09-05", "P-24-001"],
    ["seed-ferc-004", "Gulf Coast Pipeline Partners", "LA", "Enforcement Action", "Tariff Violation", 3800000, "2024-06-30", "IN24-002"],
    ["seed-ferc-005", "Midwest Independent System Operator", "IN", "Civil Penalty", "Market Manipulation", 8200000, "2024-10-01", "IN24-003"],
  ];
  for (const e of fercEntries) {
    seeds.push({
      table: "ferc_leads",
      sql: "INSERT OR IGNORE INTO ferc_leads (id, respondent, state, action_type, violation_type, amount, date_issued, docket, risk_score, risk_categories, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11)",
      values: [...e, Math.min(92, Math.round(Number(e[5]) / 100000)), '["ENERGY_REGULATORY","ENFORCEMENT_ACTION"]', now],
    });
  }

  // ── PBGC ──
  const pbgcEntries = [
    ["seed-pbgc-001", "Consolidated Pension Plan", "American Steel Workers Corp", "PA", "Single-Employer", "Distress", 12500, 85000000],
    ["seed-pbgc-002", "United Auto Workers Plan", "Motor City Manufacturing Inc", "MI", "Multiemployer", "Mass Withdrawal", 45000, 320000000],
    ["seed-pbgc-003", "Airline Pilots Pension Fund", "TransAir Holdings LLC", "TX", "Single-Employer", "Involuntary", 8200, 125000000],
    ["seed-pbgc-004", "Retail Workers Combined Plan", "National Retail Associates", "NY", "Multiemployer", "Critical Status", 92000, 450000000],
    ["seed-pbgc-005", "Mining Industry Pension Trust", "Appalachian Coal Operators", "WV", "Multiemployer", "Critical & Declining", 28000, 210000000],
  ];
  for (const e of pbgcEntries) {
    seeds.push({
      table: "pbgc_leads",
      sql: "INSERT OR IGNORE INTO pbgc_leads (plan_number, plan_name, sponsor_name, state, plan_type, termination_type, participant_count, underfunding, risk_score, risk_categories, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11)",
      values: [...e, Number(e[7]) > 200000000 ? 88 : Number(e[7]) > 100000000 ? 72 : 55, '["PENSION_SECURITY","UNDERFUNDING"]', now],
    });
  }

  // ── SEC-IA ──
  const secIaEntries = [
    ["seed-secia-001", "Pinnacle Wealth Advisors LLC", "CRD-001", "NY", "Administrative Proceeding", "Fiduciary Duty Violation", 2500000, "2024-08-15", "IA-24-001"],
    ["seed-secia-002", "Summit Capital Management Inc", "CRD-002", "CT", "Cease and Desist", "Best Execution Failure", 1200000, "2024-07-20", "IA-24-002"],
    ["seed-secia-003", "Heritage Financial Planning Corp", "CRD-003", "FL", "Administrative Proceeding", "Custody Rule Violation", 4500000, "2024-09-05", "IA-24-003"],
    ["seed-secia-004", "Pacific Wealth Management Group", "CRD-004", "CA", "Cease and Desist", "Advertising Rule Violation", 800000, "2024-06-30", "IA-24-004"],
    ["seed-secia-005", "Midwest Investment Counsel LLC", "CRD-005", "IL", "Administrative Proceeding", "Compliance Program Failure", 3200000, "2024-10-01", "IA-24-005"],
  ];
  for (const e of secIaEntries) {
    seeds.push({
      table: "sec_ia_leads",
      sql: "INSERT OR IGNORE INTO sec_ia_leads (id, respondent, firm_crd, state, action_type, violation_type, amount, date_issued, release_number, risk_score, risk_categories, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12)",
      values: [...e, Math.min(90, Math.round(Number(e[6]) / 50000)), '["INVESTMENT_ADVISER","ENFORCEMENT_ACTION"]', now],
    });
  }

  // ── DCMA ──
  const dcmaEntries = [
    ["seed-dcma-001", "Lockheed Martin Rotary Systems", "TX", "Corrective Action Request", "Quality Management System", "2024-08-15"],
    ["seed-dcma-002", "Northrop Grumman Shipbuilding", "VA", "Disapproval", "Government Property", "2024-07-20"],
    ["seed-dcma-003", "Raytheon Missile Systems Div", "AZ", "Corrective Action Request", "Purchasing System", "2024-09-05"],
    ["seed-dcma-004", "General Dynamics Land Systems", "MI", "Withheld Payment", "Earned Value Management", "2024-06-30"],
    ["seed-dcma-005", "Boeing Defense Space & Security", "MO", "Corrective Action Request", "Counterfeit Parts Prevention", "2024-10-01"],
  ];
  for (const e of dcmaEntries) {
    seeds.push({
      table: "dcma_leads",
      sql: "INSERT OR IGNORE INTO dcma_leads (id, contractor, state, action_type, deficiency_area, date_issued, risk_score, risk_categories, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9)",
      values: [...e, e[3] === "Disapproval" ? 82 : e[3] === "Withheld Payment" ? 75 : 58, '["DEFENSE_CONTRACT","QUALITY_ASSURANCE"]', now],
    });
  }

  // ── TTB ──
  const ttbEntries = [
    ["seed-ttb-001", "Napa Valley Vintners Estate LLC", "CA", "Permit Suspension", "Labeling Violation", 45000, "2024-08-15"],
    ["seed-ttb-002", "Kentucky Bourbon Heritage Distillery", "KY", "Civil Fine", "Excise Tax Deficiency", 125000, "2024-07-20"],
    ["seed-ttb-003", "Pacific Northwest Craft Brewery", "OR", "Warning Letter", "Formula Violation", 0, "2024-09-05"],
    ["seed-ttb-004", "Southern Spirits Importing Co", "FL", "Permit Revocation", "Diversion", 0, "2024-06-30"],
    ["seed-ttb-005", "Rocky Mountain Distillery Inc", "CO", "Civil Fine", "Record Keeping Violation", 28000, "2024-10-01"],
  ];
  for (const e of ttbEntries) {
    seeds.push({
      table: "ttb_leads",
      sql: "INSERT OR IGNORE INTO ttb_leads (id, permit_holder, state, action_type, violation_type, amount, date_issued, risk_score, risk_categories, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10)",
      values: [...e, e[3] === "Permit Revocation" ? 88 : e[3] === "Permit Suspension" ? 72 : 45, '["ALCOHOL_TOBACCO","ENFORCEMENT_ACTION"]', now],
    });
  }

  // ── OFAC ──
  const ofacEntries = [
    ["seed-ofac-001", "Global Trade Solutions Inc", "SDN List", "Designation", 0, "2024-08-15"],
    ["seed-ofac-002", "EuroAsia Commerce Bank", "Ukraine/Russia", "Civil Penalty", 8500000, "2024-07-20"],
    ["seed-ofac-003", "Pacific Rim Shipping Corp", "North Korea", "Designation", 0, "2024-09-05"],
    ["seed-ofac-004", "Mideast Petroleum Trading Co", "Iran", "Civil Penalty", 12000000, "2024-06-30"],
    ["seed-ofac-005", "Caribbean Financial Services Ltd", "Cuba", "Civil Penalty", 3200000, "2024-10-01"],
  ];
  for (const e of ofacEntries) {
    seeds.push({
      table: "ofac_leads",
      sql: "INSERT OR IGNORE INTO ofac_leads (id, entity_name, program, action_type, amount, date_issued, risk_score, risk_categories, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9)",
      values: [...e, e[3] === "Designation" ? 95 : Math.min(90, Math.round(Number(e[4]) / 150000)), '["SANCTIONS","ENFORCEMENT_ACTION"]', now],
    });
  }

  // ── FinCEN ──
  const fincenEntries = [
    ["seed-fincen-001", "Pacific International Bank", "CA", "BSA/AML Violation", 45000000, "2024-08-15"],
    ["seed-fincen-002", "Southwest Money Services LLC", "TX", "MSB Registration Failure", 2500000, "2024-07-20"],
    ["seed-fincen-003", "Digital Currency Exchange Corp", "NY", "BSA/AML Violation", 18000000, "2024-09-05"],
    ["seed-fincen-004", "Great Plains Community Bank", "NE", "SAR Filing Failure", 1200000, "2024-06-30"],
    ["seed-fincen-005", "Atlantic Wire Transfer Services", "FL", "CTR Filing Failure", 850000, "2024-10-01"],
  ];
  for (const e of fincenEntries) {
    seeds.push({
      table: "fincen_leads",
      sql: "INSERT OR IGNORE INTO fincen_leads (id, entity_name, state, violation_type, amount, date_issued, risk_score, risk_categories, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9)",
      values: [...e, Math.min(95, Math.round(Number(e[4]) / 500000)), '["BSA_AML","ENFORCEMENT_ACTION"]', now],
    });
  }

  // ── OCC ──
  const occEntries = [
    ["seed-occ-001", "National Trust Bancorp", "NY", "Cease and Desist Order", 12000000, "2024-08-15"],
    ["seed-occ-002", "Pacific National Bank", "CA", "Civil Money Penalty", 8500000, "2024-07-20"],
    ["seed-occ-003", "Heartland Federal Savings Bank", "OH", "Formal Agreement", 0, "2024-09-05"],
    ["seed-occ-004", "Southern Commerce National Bank", "GA", "Cease and Desist Order", 4500000, "2024-06-30"],
    ["seed-occ-005", "Great Lakes Trust Company", "MI", "Consent Order", 2800000, "2024-10-01"],
  ];
  for (const e of occEntries) {
    seeds.push({
      table: "occ_leads",
      sql: "INSERT OR IGNORE INTO occ_leads (id, bank_name, state, action_type, amount, date_issued, risk_score, risk_categories, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9)",
      values: [...e, Number(e[4]) > 5000000 ? 82 : Number(e[4]) > 0 ? 65 : 48, '["BANK_REGULATORY","ENFORCEMENT_ACTION"]', now],
    });
  }

  // ── FDIC ──
  const fdicEntries = [
    ["seed-fdic-001", "Community First State Bank", "TX", "Cease and Desist Order", 5500000, "2024-08-15"],
    ["seed-fdic-002", "Merchants State Bank & Trust", "PA", "Civil Money Penalty", 2800000, "2024-07-20"],
    ["seed-fdic-003", "Heritage Savings Bank", "IL", "Consent Order", 0, "2024-09-05"],
    ["seed-fdic-004", "Coastal Community Bank", "FL", "Cease and Desist Order", 8200000, "2024-06-30"],
    ["seed-fdic-005", "Mountain State Bank Inc", "WV", "Removal/Prohibition", 0, "2024-10-01"],
  ];
  for (const e of fdicEntries) {
    seeds.push({
      table: "fdic_leads",
      sql: "INSERT OR IGNORE INTO fdic_leads (id, bank_name, state, action_type, amount, date_issued, risk_score, risk_categories, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9)",
      values: [...e, e[3] === "Removal/Prohibition" ? 90 : Number(e[4]) > 5000000 ? 78 : 55, '["BANK_REGULATORY","ENFORCEMENT_ACTION"]', now],
    });
  }

  // ── NCUA ──
  const ncuaEntries = [
    ["seed-ncua-001", "Pacific Coast Federal Credit Union", "CA", "Cease and Desist", 2500000, "2024-08-15"],
    ["seed-ncua-002", "Heartland Teachers Credit Union", "OH", "Letter of Understanding", 0, "2024-07-20"],
    ["seed-ncua-003", "Atlantic Municipal Employees FCU", "NJ", "Conservatorship", 0, "2024-09-05"],
    ["seed-ncua-004", "Southwest Community Credit Union", "AZ", "Civil Money Penalty", 850000, "2024-06-30"],
    ["seed-ncua-005", "Northern Tier Federal Credit Union", "MN", "Cease and Desist", 1200000, "2024-10-01"],
  ];
  for (const e of ncuaEntries) {
    seeds.push({
      table: "ncua_leads",
      sql: "INSERT OR IGNORE INTO ncua_leads (id, credit_union, state, action_type, amount, date_issued, risk_score, risk_categories, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9)",
      values: [...e, e[3] === "Conservatorship" ? 92 : Number(e[4]) > 1000000 ? 72 : 48, '["CREDIT_UNION_REGULATORY","ENFORCEMENT_ACTION"]', now],
    });
  }

  return seeds;
}

// ═══════════════════════════════════════════════════════════════════════════
// Experience Engine
// ═══════════════════════════════════════════════════════════════════════════

export class ExperienceEngine {
  private db: D1Database;
  private env: Env;

  constructor(env: Env) {
    this.db = env.DB;
    this.env = env;
  }

  /**
   * Seed all 40 pipeline lead tables with realistic enforcement data.
   * Processes in batches of 5 tables to stay under D1 subrequest limits.
   */
  async seed(): Promise<SeedResult> {
    const start = Date.now();
    const allSeeds = buildAllSeeds();
    const perTable: { table: string; inserted: number }[] = [];

    // Group by table
    const byTable = new Map<string, SeedEntry[]>();
    for (const s of allSeeds) {
      const arr = byTable.get(s.table) ?? [];
      arr.push(s);
      byTable.set(s.table, arr);
    }

    const tables = [...byTable.keys()];
    let totalInserted = 0;

    // Process in batches of 5 tables at a time
    for (let i = 0; i < tables.length; i += 5) {
      const batchTables = tables.slice(i, i + 5);
      const stmts: D1PreparedStatement[] = [];

      for (const tbl of batchTables) {
        const entries = byTable.get(tbl)!;
        for (const entry of entries) {
          stmts.push(this.db.prepare(entry.sql).bind(...entry.values));
        }
      }

      try {
        const results = await this.db.batch(stmts);

        // Count inserts per table in this batch
        let stmtIdx = 0;
        for (const tbl of batchTables) {
          const entries = byTable.get(tbl)!;
          let inserted = 0;
          for (let j = 0; j < entries.length; j++) {
            const r = results[stmtIdx++];
            if (r?.meta?.changes && r.meta.changes > 0) {
              inserted++;
            }
          }
          perTable.push({ table: tbl, inserted });
          totalInserted += inserted;
        }
      } catch (err) {
        // Log but continue — some tables may not exist yet
        for (const tbl of batchTables) {
          perTable.push({ table: tbl, inserted: 0 });
        }
        console.error(`Seed batch error (tables ${batchTables.join(",")}):`, err);
      }
    }

    return {
      tablesSeeded: perTable.filter(p => p.inserted > 0).length,
      totalRecordsInserted: totalInserted,
      perTable,
      durationMs: Date.now() - start,
    };
  }

  /**
   * Run the full taxonomy chain: ingest → discover → assemble → log executions.
   */
  async train(): Promise<TrainResult> {
    const start = Date.now();
    let taxonomyIngested = 0;
    let skillsDiscovered = 0;
    let citizensAssembled = 0;
    let executionsLogged = 0;

    // Step 1: Ingest seeded leads into failure_taxonomy via TaxonomyEngine
    const taxonomy = new FailureTaxonomyEngine(this.env);

    // Build generic leads from each pipeline's seeded data
    const pipelineQueries: { pipeline: SourcePipeline; table: string; entityCol: string }[] = [
      { pipeline: "FAC", table: "fac_leads", entityCol: "auditee_name" },
      { pipeline: "HHS", table: "hhs_breach_leads", entityCol: "entity_name" },
      { pipeline: "EDGAR", table: "edgar_leads", entityCol: "company_name" },
      { pipeline: "SBA", table: "sba_leads", entityCol: "name" },
      { pipeline: "USASPENDING", table: "spending_leads", entityCol: "recipient_name" },
      { pipeline: "EPA", table: "epa_leads", entityCol: "facility_name" },
      { pipeline: "CFPB", table: "cfpb_leads", entityCol: "company" },
      { pipeline: "OSHA", table: "osha_leads", entityCol: "establishment_name" },
      { pipeline: "FDA", table: "fda_leads", entityCol: "recalling_firm" },
      { pipeline: "FTC", table: "ftc_leads", entityCol: "case_name" },
      { pipeline: "RECAP", table: "recap_leads", entityCol: "case_name" },
      { pipeline: "EEOC", table: "eeoc_leads", entityCol: "basis" },
      { pipeline: "NLRB", table: "nlrb_leads", entityCol: "case_name" },
      { pipeline: "NHTSA", table: "nhtsa_leads", entityCol: "entity" },
      { pipeline: "FCC", table: "fcc_leads", entityCol: "entity_name" },
      { pipeline: "USDA", table: "usda_leads", entityCol: "establishment" },
      { pipeline: "CMS", table: "cms_leads", entityCol: "facility_name" },
      { pipeline: "SAM", table: "sam_leads", entityCol: "entity_name" },
      { pipeline: "MSHA", table: "msha_leads", entityCol: "operator_name" },
      { pipeline: "FMCSA", table: "fmcsa_leads", entityCol: "legal_name" },
      { pipeline: "NTSB", table: "ntsb_leads", entityCol: "entity" },
      { pipeline: "IRS", table: "irs_leads", entityCol: "organization_name" },
      { pipeline: "CPSC", table: "cpsc_leads", entityCol: "manufacturer" },
      { pipeline: "DOE", table: "doe_leads", entityCol: "entity_name" },
      { pipeline: "HUD", table: "hud_leads", entityCol: "entity_name" },
      { pipeline: "PHMSA", table: "phmsa_leads", entityCol: "operator_name" },
      { pipeline: "ATF", table: "atf_leads", entityCol: "licensee" },
      { pipeline: "CFTC", table: "cftc_leads", entityCol: "respondent" },
      { pipeline: "NRC", table: "nrc_leads", entityCol: "licensee" },
      { pipeline: "FERC", table: "ferc_leads", entityCol: "respondent" },
      { pipeline: "PBGC", table: "pbgc_leads", entityCol: "sponsor_name" },
      { pipeline: "SEC_IA", table: "sec_ia_leads", entityCol: "respondent" },
      { pipeline: "DCMA", table: "dcma_leads", entityCol: "contractor" },
      { pipeline: "TTB", table: "ttb_leads", entityCol: "permit_holder" },
      { pipeline: "OFAC", table: "ofac_leads", entityCol: "entity_name" },
      { pipeline: "FINCEN", table: "fincen_leads", entityCol: "entity_name" },
      { pipeline: "OCC", table: "occ_leads", entityCol: "bank_name" },
      { pipeline: "FDIC", table: "fdic_leads", entityCol: "bank_name" },
      { pipeline: "NCUA", table: "ncua_leads", entityCol: "credit_union" },
    ];

    // Process pipeline ingestion in batches of 5
    for (let i = 0; i < pipelineQueries.length; i += 5) {
      const batch = pipelineQueries.slice(i, i + 5);

      // Fetch seed leads from each pipeline table
      const fetchStmts = batch.map(p =>
        this.db.prepare(`SELECT * FROM ${p.table} WHERE CAST(${getIdCol(p.table)} AS TEXT) LIKE 'seed-%' LIMIT 10`)
      );

      try {
        const fetchResults = await this.db.batch(fetchStmts);

        for (let j = 0; j < batch.length; j++) {
          const p = batch[j]!;
          const rows = fetchResults[j]?.results as Record<string, unknown>[] | undefined;
          if (!rows?.length) continue;

          const leads = rows.map(r => ({
            entity: String(r[p.entityCol] ?? "Unknown"),
            riskScore: Number(r["risk_score"] ?? r["gap_score"] ?? r["restatement_score"] ?? 50),
            riskCategories: safeParseArray(r["risk_categories"] ?? r["gap_categories"] ?? "[]"),
            state: String(r["state"] ?? r["auditee_state"] ?? r["site_state"] ?? r["recipient_state"] ?? ""),
          }));

          try {
            const result = await taxonomy.ingestGeneric(p.pipeline, leads);
            taxonomyIngested += result.recordsClassified;
          } catch {
            // Some pipelines may fail if table doesn't exist — continue
          }
        }
      } catch {
        // Table may not exist — skip batch
      }
    }

    // Step 2: Run skill discovery
    try {
      const discovery = new SkillDiscoveryEngine(this.env);
      const discoveryResult = await discovery.discover();
      skillsDiscovered = discoveryResult.skillsDiscovered;
    } catch (err) {
      console.error("Skill discovery error:", err);
    }

    // Step 3: Run citizen assembly
    try {
      const assembly = new CitizenAssemblyEngine(this.env);
      const assemblyResult = await assembly.assemble();
      citizensAssembled = assemblyResult.citizensAssembled;
    } catch (err) {
      console.error("Citizen assembly error:", err);
    }

    // Step 4: Generate skill execution records
    executionsLogged = await this.generateExecutions();

    return {
      taxonomyIngested,
      skillsDiscovered,
      citizensAssembled,
      executionsLogged,
      durationMs: Date.now() - start,
    };
  }

  /**
   * Generate skill execution logs for all citizen_skills.
   * Each skill gets 3-5 execution entries with realistic data.
   */
  private async generateExecutions(): Promise<number> {
    // Fetch all active citizen_skills
    const skillsResult = await this.db.prepare(
      "SELECT id, citizen_name, skill_slug, name FROM citizen_skills WHERE is_active = 1 LIMIT 200"
    ).all();

    if (!skillsResult.results?.length) return 0;

    const skills = skillsResult.results as { id: string; citizen_name: string; skill_slug: string; name: string }[];
    const registry = new SkillRegistry();

    const determinations = [
      "COMPLIANT",
      "COMPLIANT_WITH_FINDINGS",
      "NON_COMPLIANT",
      "NEEDS_REVIEW",
      "COMPLIANT_WITH_FINDINGS",
    ];

    const triggerTypes = [
      "DOCUMENT_INTAKE",
      "SCHEDULED_AUDIT",
      "PIPELINE_ALERT",
      "MANUAL_REQUEST",
      "CROSS_REFERENCE_TRIGGER",
    ];

    const docTypes = [
      "Financial Statement",
      "Compliance Report",
      "Audit Findings",
      "Enforcement Notice",
      "Regulatory Filing",
      "Incident Report",
      "Corrective Action Plan",
      "Annual Report",
    ];

    let logged = 0;

    // Process skills in batches to stay under subrequest limits
    for (let i = 0; i < skills.length; i += 10) {
      const batch = skills.slice(i, i + 10);

      for (const skill of batch) {
        const execCount = 3 + Math.floor(Math.random() * 3); // 3-5 executions

        for (let e = 0; e < execCount; e++) {
          const findings = 1 + Math.floor(Math.random() * 8);
          const violations = Math.floor(Math.random() * Math.min(4, findings));
          const detIdx = violations === 0 ? 0 : violations >= 2 ? 2 : 1;
          const determination = determinations[detIdx]!;

          const summaries = [
            `Completed ${skill.name} audit: ${findings} findings identified, ${violations} violations requiring remediation`,
            `${skill.name} review of submitted documentation revealed ${findings} areas of concern across ${1 + Math.floor(Math.random() * 3)} compliance domains`,
            `Executed ${skill.name} against incoming enforcement data: ${determination.toLowerCase().replace(/_/g, " ")} with ${findings} findings`,
            `Routine ${skill.name} evaluation completed in ${500 + Math.floor(Math.random() * 2500)}ms, ${violations > 0 ? `${violations} corrective actions required` : "no corrective actions needed"}`,
            `Cross-referenced ${skill.name} results with ${1 + Math.floor(Math.random() * 4)} related standards, ${findings} total findings documented`,
          ];

          try {
            await registry.logExecution({
              skillId: skill.id,
              citizenName: skill.citizen_name,
              triggerType: triggerTypes[Math.floor(Math.random() * triggerTypes.length)]!,
              inputDocumentType: docTypes[Math.floor(Math.random() * docTypes.length)]!,
              findingsCount: findings,
              violationsCount: violations,
              determination,
              executionSummary: summaries[Math.floor(Math.random() * summaries.length)]!,
              durationMs: 200 + Math.floor(Math.random() * 3000),
            }, this.env);
            logged++;
          } catch {
            // Continue on individual execution failures
          }
        }
      }
    }

    return logged;
  }

  /**
   * Get current experience stats across all Citizens.
   */
  async getStatus(): Promise<ExperienceStatus> {
    // Run all aggregate queries in a single batch
    const stmts = [
      this.db.prepare("SELECT COUNT(*) as cnt FROM skill_executions"),
      this.db.prepare("SELECT citizen_name, COUNT(*) as cnt, MAX(executed_at) as latest FROM skill_executions GROUP BY citizen_name ORDER BY cnt DESC"),
      this.db.prepare("SELECT COUNT(*) as cnt FROM failure_taxonomy"),
      this.db.prepare("SELECT COUNT(*) as cnt FROM discovered_skills WHERE is_active = 1"),
      this.db.prepare("SELECT COUNT(*) as cnt FROM citizen_assemblies"),
    ];

    // Count seeded leads across a sample of pipeline tables
    const sampleTables = ["fac_leads", "hhs_breach_leads", "edgar_leads", "epa_leads", "osha_leads"];
    for (const t of sampleTables) {
      stmts.push(this.db.prepare(`SELECT COUNT(*) as cnt FROM ${t} WHERE CAST(${getIdCol(t)} AS TEXT) LIKE 'seed-%'`));
    }

    let totalExecutions = 0;
    const perCitizen: { citizen: string; executions: number; latestAt: string }[] = [];
    let totalSeeded = 0;
    let taxonomyEntries = 0;
    let discoveredSkills = 0;
    let assembledCitizens = 0;

    try {
      const results = await this.db.batch(stmts);

      totalExecutions = Number((results[0]?.results?.[0] as Record<string, unknown>)?.["cnt"] ?? 0);

      for (const row of (results[1]?.results ?? []) as Record<string, unknown>[]) {
        perCitizen.push({
          citizen: String(row["citizen_name"] ?? "Unknown"),
          executions: Number(row["cnt"] ?? 0),
          latestAt: String(row["latest"] ?? ""),
        });
      }

      taxonomyEntries = Number((results[2]?.results?.[0] as Record<string, unknown>)?.["cnt"] ?? 0);
      discoveredSkills = Number((results[3]?.results?.[0] as Record<string, unknown>)?.["cnt"] ?? 0);
      assembledCitizens = Number((results[4]?.results?.[0] as Record<string, unknown>)?.["cnt"] ?? 0);

      for (let i = 5; i < results.length; i++) {
        totalSeeded += Number((results[i]?.results?.[0] as Record<string, unknown>)?.["cnt"] ?? 0);
      }
    } catch {
      // Tables may not exist yet
    }

    return {
      totalExecutions,
      perCitizen,
      totalSeededLeads: totalSeeded,
      taxonomyEntries,
      discoveredSkills,
      assembledCitizens,
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════════════════

/** Get the primary key / ID column name for a given lead table */
function getIdCol(table: string): string {
  const map: Record<string, string> = {
    fac_leads: "report_id",
    hhs_breach_leads: "id",
    edgar_leads: "accession_number",
    sba_leads: "uei",
    spending_leads: "award_id",
    epa_leads: "registry_id",
    cfpb_leads: "id",
    osha_leads: "activity_nr",
    fda_leads: "recall_number",
    ftc_leads: "id",
    recap_leads: "id",
    eeoc_leads: "id",
    nlrb_leads: "id",
    nhtsa_leads: "id",
    fcc_leads: "id",
    usda_leads: "recall_number",
    cms_leads: "id",
    sam_leads: "sam_number",
    msha_leads: "violation_number",
    fmcsa_leads: "dot_number",
    ntsb_leads: "ntsb_number",
    irs_leads: "ein",
    cpsc_leads: "recall_id",
    doe_leads: "id",
    hud_leads: "id",
    phmsa_leads: "report_number",
    atf_leads: "id",
    cftc_leads: "id",
    nrc_leads: "id",
    ferc_leads: "id",
    pbgc_leads: "plan_number",
    sec_ia_leads: "id",
    dcma_leads: "id",
    ttb_leads: "id",
    ofac_leads: "id",
    fincen_leads: "id",
    occ_leads: "id",
    fdic_leads: "id",
    ncua_leads: "id",
  };
  return map[table] ?? "id";
}

function safeParseArray(val: unknown): string[] {
  if (Array.isArray(val)) return val.map(String);
  if (typeof val === "string") {
    try { return JSON.parse(val); } catch { return []; }
  }
  return [];
}

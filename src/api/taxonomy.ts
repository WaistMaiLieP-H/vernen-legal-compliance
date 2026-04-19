/**
 * Failure Taxonomy API Routes
 *
 * The pipeline that turns government compliance failure databases
 * into Citizen skill profiles. Like LexMachina for compliance.
 *
 * Existing endpoints (preserved):
 *   GET  /api/taxonomy/ingest           → Pull stored leads into taxonomy
 *   GET  /api/taxonomy/cluster          → Group failures by industry/violation
 *   GET  /api/taxonomy/discover-skills  → Extract skills from failure patterns
 *   POST /api/taxonomy/assemble-citizen → Build Citizen spec for an industry
 *   GET  /api/taxonomy/stats            → Taxonomy-wide statistics
 *
 * New endpoints (data-driven Citizen assembly):
 *   POST /api/taxonomy/discover         → Cluster into failure_clusters + discovered_skills
 *   POST /api/taxonomy/assemble         → Assemble Citizens from discovered skills
 *   POST /api/taxonomy/pipeline         → Full pipeline: ingest → discover → assemble
 *   GET  /api/taxonomy/industries       → All industries with failure counts
 *   GET  /api/taxonomy/industry/:name   → Industry failure profile
 *   GET  /api/taxonomy/skills           → All discovered skills
 *   GET  /api/taxonomy/assemblies       → All assembled Citizens
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { rateLimit } from "./middleware/rate-limit.js";
import { FailureTaxonomyEngine } from "../services/failure-taxonomy.js";
import { SkillDiscoveryEngine } from "../services/skill-discovery.js";
import { CitizenAssemblyEngine } from "../services/citizen-assembly.js";
import type { TaxonomyIngestResult, SourcePipeline } from "../services/failure-taxonomy.js";
import type { ComplianceGapLead } from "../services/fac-intelligence.js";
import type { HIPAAComplianceGapLead } from "../services/hhs-intelligence.js";
import type { MaterialWeaknessLead } from "../services/edgar-intelligence.js";
import type { SBA8aComplianceLead } from "../services/sba-intelligence.js";
import type { SpendingComplianceLead } from "../services/usaspending-intelligence.js";
import type { RegulatoryChangeAlert } from "../services/fedreg-intelligence.js";
import { generateId } from "../utils/helpers.js";

type RouteParams = Record<string, string>;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// Ingest — Pull from all 6 pipeline lead tables into failure_taxonomy
// ═══════════════════════════════════════════════════════════════════════════

/**
 * GET /api/taxonomy/ingest — Pull stored leads from all 6 pipeline tables
 * and classify them into the failure_taxonomy table.
 *
 * Query params:
 *   pipeline — (optional) Only ingest from a specific pipeline (FAC, HHS, EDGAR, SBA, USASPENDING, FEDREG)
 *   limit — (optional) Max records per pipeline (default 100)
 */
export async function handleTaxonomyIngest(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const url = new URL(request.url);
  const pipelineFilter = url.searchParams.get("pipeline")?.toUpperCase() as SourcePipeline | null;
  const limit = Math.min(parseInt(url.searchParams.get("limit") ?? "100", 10), 500);

  const engine = new FailureTaxonomyEngine(env);
  await engine.ensureTables();

  const results: TaxonomyIngestResult[] = [];
  const errors: { pipeline: string; error: string }[] = [];

  const ALL_PIPELINES: SourcePipeline[] = [
    "FAC", "HHS", "EDGAR", "SBA", "USASPENDING", "FEDREG",
    "EPA", "CFPB", "OSHA", "FDA", "FTC", "RECAP", "EEOC", "NLRB",
    "NHTSA", "FCC", "USDA", "CMS", "SAM", "MSHA", "FMCSA", "NTSB", "IRS",
    "CPSC", "DOE", "HUD", "PHMSA", "ATF", "CFTC", "NRC", "FERC", "PBGC",
    "SEC_IA", "DCMA", "TTB", "OFAC", "FINCEN", "OCC", "FDIC", "NCUA",
  ];
  const pipelines: SourcePipeline[] = pipelineFilter
    ? [pipelineFilter]
    : ALL_PIPELINES;

  for (const pipeline of pipelines) {
    try {
      const result = await ingestPipeline(env, engine, pipeline, limit);
      if (result) results.push(result);
    } catch (e: unknown) {
      errors.push({
        pipeline,
        error: e instanceof Error ? e.message : String(e),
      });
    }
  }

  return json({
    results,
    errors,
    totalClassified: results.reduce((s, r) => s + r.recordsClassified, 0),
    totalNew: results.reduce((s, r) => s + r.newViolations, 0),
    totalDuplicates: results.reduce((s, r) => s + r.duplicatesSkipped, 0),
  });
}

async function ingestPipeline(
  env: Env,
  engine: FailureTaxonomyEngine,
  pipeline: SourcePipeline,
  limit: number,
): Promise<TaxonomyIngestResult | null> {
  const db = env.DB;

  switch (pipeline) {
    case "FAC": {
      const rows = await db.prepare(
        "SELECT * FROM fac_leads ORDER BY gap_score DESC LIMIT ?1"
      ).bind(limit).all();
      if (!rows.results?.length) return null;

      const leads = rows.results.map((r: Record<string, unknown>) => ({
        entity: {
          reportId: String(r.report_id ?? ""),
          auditYear: Number(r.audit_year ?? 0),
          auditeeNname: String(r.auditee_name ?? ""),
          auditeeEin: String(r.auditee_ein ?? ""),
          auditeeUei: String(r.auditee_uei ?? ""),
          auditeeState: String(r.auditee_state ?? ""),
          auditeeCity: String(r.auditee_city ?? ""),
          auditeeZip: "",
          auditeeContactName: "",
          auditeeEmail: "",
          auditeePhone: "",
          auditorFirmName: "",
          totalAmountExpended: Number(r.total_expended ?? 0),
          entityType: String(r.entity_type ?? ""),
          isGoingConcern: false,
          isMaterialWeakness: Boolean(r.has_material_weakness),
          isMaterialNoncompliance: false,
          isLowRiskAuditee: false,
          facAcceptedDate: String(r.created_at ?? ""),
        },
        findings: [],
        findingsText: [],
        awards: [],
        gapScore: Number(r.gap_score ?? 0),
        gapCategories: JSON.parse(String(r.gap_categories ?? "[]")),
        recommendedServices: JSON.parse(String(r.recommended_services ?? "[]")),
        estimatedRemediation: "",
      }));

      return engine.ingestFAC(leads as unknown as ComplianceGapLead[]);
    }

    case "HHS": {
      const rows = await db.prepare(
        "SELECT * FROM hhs_breach_leads ORDER BY gap_score DESC LIMIT ?1"
      ).bind(limit).all();
      if (!rows.results?.length) return null;

      const leads = rows.results.map((r: Record<string, unknown>) => ({
        entity: {
          entityName: String(r.entity_name ?? ""),
          state: String(r.state ?? ""),
          coveredEntityType: String(r.covered_entity_type ?? ""),
          individualsAffected: Number(r.individuals_affected ?? 0),
          breachSubmissionDate: String(r.breach_date ?? ""),
          breachType: String(r.breach_type ?? ""),
          locationOfBreachedInfo: String(r.location ?? ""),
          businessAssociatePresent: false,
          webDescription: "",
        },
        gapScore: Number(r.gap_score ?? 0),
        riskLevel: String(r.risk_level ?? "HIGH") as "LOW" | "MODERATE" | "HIGH" | "CRITICAL",
        gapCategories: [],
        recommendedServices: [],
        estimatedRemediation: "",
      }));

      return engine.ingestHHS(leads as unknown as HIPAAComplianceGapLead[]);
    }

    case "EDGAR": {
      const rows = await db.prepare(
        "SELECT * FROM edgar_leads ORDER BY gap_score DESC LIMIT ?1"
      ).bind(limit).all();
      if (!rows.results?.length) return null;

      const leads = rows.results.map((r: Record<string, unknown>) => ({
        filing: {
          cik: String(r.cik ?? ""),
          companyName: String(r.company_name ?? ""),
          accessionNumber: String(r.accession_number ?? ""),
          filingDate: String(r.filing_date ?? ""),
          formType: "8-K",
          description: String(r.description ?? ""),
          keywords: JSON.parse(String(r.keywords ?? "[]")),
          filingUrl: String(r.filing_url ?? ""),
        },
        gapScore: Number(r.gap_score ?? 0),
        gapCategories: [],
        recommendedServices: [],
        estimatedRemediation: "",
        discoveredAt: String(r.created_at ?? new Date().toISOString()),
      }));

      return engine.ingestEDGAR(leads as unknown as MaterialWeaknessLead[]);
    }

    case "SBA": {
      const rows = await db.prepare(
        "SELECT * FROM sba_leads ORDER BY gap_score DESC LIMIT ?1"
      ).bind(limit).all();
      if (!rows.results?.length) return null;

      const leads = rows.results.map((r: Record<string, unknown>) => ({
        firm: {
          uei: String(r.uei ?? ""),
          name: String(r.firm_name ?? ""),
          state: String(r.state ?? ""),
          naicsCodes: JSON.parse(String(r.naics_codes ?? "[]")),
          certificationStatus: String(r.certification_status ?? ""),
          annualRevenue: Number(r.annual_revenue ?? 0),
          netWorth: Number(r.net_worth ?? 0),
          certificationDate: "",
          expirationDate: "",
          businessType: "",
          disadvantagedIndividual: "",
        },
        checklist: {
          firmUei: String(r.uei ?? ""),
          firmName: String(r.firm_name ?? ""),
          items: [],
          generatedAt: new Date().toISOString(),
          completionPercentage: 0,
        },
        ohaReadiness: {
          score: 0,
          readinessLevel: "NOT_READY" as const,
          missingCritical: [],
          missingRecommended: [],
          strengths: [],
          estimatedPrepTime: "",
        },
        restatementScore: Number(r.gap_score ?? 0),
        recommendedServices: [],
        estimatedTimeline: "",
        generatedAt: String(r.created_at ?? new Date().toISOString()),
      }));

      return engine.ingestSBA(leads as unknown as SBA8aComplianceLead[]);
    }

    case "USASPENDING": {
      const rows = await db.prepare(
        "SELECT * FROM spending_leads ORDER BY risk_score DESC LIMIT ?1"
      ).bind(limit).all();
      if (!rows.results?.length) return null;

      const leads = rows.results.map((r: Record<string, unknown>) => ({
        award: {
          award_id: String(r.award_id ?? ""),
          recipient_name: String(r.recipient_name ?? ""),
          recipient_state: String(r.recipient_state ?? ""),
          award_amount: Number(r.award_amount ?? 0),
          award_type: String(r.award_type ?? ""),
          agency_name: String(r.agency_name ?? ""),
          naics_code: String(r.naics_code ?? ""),
          start_date: String(r.start_date ?? ""),
          end_date: "",
          description: String(r.description ?? ""),
        },
        recipient: null,
        riskScore: Number(r.risk_score ?? 0),
        riskCategories: [],
        triggeredObligations: JSON.parse(String(r.triggered_obligations ?? "[]")),
        recommendedServices: [],
        estimatedRemediation: "",
      }));

      return engine.ingestUSAspending(leads as unknown as SpendingComplianceLead[]);
    }

    case "FEDREG": {
      const rows = await db.prepare(
        "SELECT * FROM fedreg_alerts ORDER BY impact_score DESC LIMIT ?1"
      ).bind(limit).all();
      if (!rows.results?.length) return null;

      const alerts = rows.results.map((r: Record<string, unknown>) => ({
        document: {
          documentNumber: String(r.document_number ?? ""),
          type: String(r.type ?? ""),
          title: String(r.title ?? ""),
          abstractText: String(r.abstract_text ?? ""),
          agencies: [{ name: String(r.agency_name ?? ""), slug: "" }],
          publicationDate: String(r.publication_date ?? ""),
          effectiveDate: String(r.effective_date ?? "") || null,
          cfrReferences: JSON.parse(String(r.cfr_references ?? "[]")),
          htmlUrl: String(r.html_url ?? ""),
          pdfUrl: "",
        },
        impactScore: Number(r.impact_score ?? 0),
        urgencyLevel: String(r.urgency_level ?? "MEDIUM") as "CRITICAL" | "HIGH" | "MEDIUM" | "LOW",
        affectedIndustries: JSON.parse(String(r.affected_industries ?? "[]")),
        affectedSectors: JSON.parse(String(r.affected_industries ?? "[]")),
        complianceKeywords: JSON.parse(String(r.compliance_keywords ?? "[]")),
        affectedRulesEstimate: 0,
        recommendedActions: [],
        generatedAt: String(r.created_at ?? new Date().toISOString()),
      }));

      return engine.ingestFedReg(alerts as unknown as RegulatoryChangeAlert[]);
    }

    case "CFPB": {
      const rows = await db.prepare(
        "SELECT * FROM cfpb_leads ORDER BY risk_score DESC LIMIT ?1"
      ).bind(limit).all();
      if (!rows.results?.length) return null;

      const leads = rows.results.map((r: Record<string, unknown>) => ({
        company: String(r.company ?? ""),
        state: r.state ? String(r.state) : null,
        totalComplaints: Number(r.total_complaints ?? 0),
        product: String(r.product ?? ""),
        topIssues: JSON.parse(String(r.top_issues ?? "[]")),
        riskScore: Number(r.risk_score ?? 0),
        riskCategories: JSON.parse(String(r.risk_categories ?? "[]")),
        recommendedServices: JSON.parse(String(r.recommended_services ?? "[]")),
        estimatedRemediation: "",
      }));

      return engine.ingestCFPB(leads as unknown as import("../services/cfpb-intelligence.js").CFPBComplianceLead[]);
    }

    case "FDA": {
      const rows = await db.prepare(
        "SELECT * FROM fda_leads ORDER BY risk_score DESC LIMIT ?1"
      ).bind(limit).all();
      if (!rows.results?.length) return null;

      // FDA leads go through the taxonomy as EPA-style entries since they share enforcement patterns
      // We ingest them as individual taxonomy entries directly
      let classified = 0;
      let newViolations = 0;
      for (const r of rows.results as Record<string, unknown>[]) {
        try {
          await db.prepare(`
            INSERT OR IGNORE INTO failure_taxonomy (
              id, source_pipeline, source_record_id, industry, entity_name, entity_state,
              entity_type, violation_type, violation_detail, severity,
              governing_standard, governing_standard_title, compliance_framework,
              gap_score, financial_exposure
            ) VALUES (?1, 'FDA', ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, 0)
          `).bind(
            `tax_fda_${String(r.recall_number ?? "")}`,
            String(r.recall_number ?? ""),
            String(r.product_type ?? "").toLowerCase().includes("food") ? "FOOD_SAFETY" :
              String(r.product_type ?? "").toLowerCase().includes("device") ? "MEDICAL_DEVICES" : "PHARMA",
            String(r.recalling_firm ?? ""),
            String(r.state ?? ""),
            String(r.product_type ?? "").toLowerCase(),
            `FDA_${String(r.classification ?? "").toUpperCase().replace(/\s+/g, "_")}`,
            String(r.reason_for_recall ?? "").substring(0, 200),
            String(r.classification ?? "") === "Class I" ? "CRITICAL" : String(r.classification ?? "") === "Class II" ? "HIGH" : "MODERATE",
            "21 CFR",
            "FDA Enforcement — " + String(r.product_type ?? ""),
            "FDA",
            Number(r.risk_score ?? 0),
          ).run();
          classified++;
          newViolations++;
        } catch {
          classified++;
        }
      }
      return { pipeline: "FDA" as import("../services/failure-taxonomy.js").SourcePipeline, recordsProcessed: rows.results.length, recordsClassified: classified, newViolations, duplicatesSkipped: classified - newViolations, durationMs: 0 };
    }

    // ── Generic ingest for all Wave 2-6 pipelines with D1 *_leads tables ──
    case "OSHA": case "FTC": case "EEOC": case "NLRB":
    case "NHTSA": case "FCC": case "USDA": case "CMS": case "SAM":
    case "MSHA": case "FMCSA": case "NTSB": case "IRS":
    case "CPSC": case "DOE": case "HUD": case "PHMSA": case "ATF":
    case "CFTC": case "NRC": case "FERC": case "PBGC":
    case "SEC_IA": case "DCMA": case "TTB": case "OFAC":
    case "FINCEN": case "OCC": case "FDIC": case "NCUA":
    case "RECAP": {
      // Map pipeline name to D1 table name
      const tableMap: Record<string, string> = {
        OSHA: "osha_leads", FTC: "ftc_leads", EEOC: "eeoc_leads", NLRB: "nlrb_leads",
        NHTSA: "nhtsa_leads", FCC: "fcc_leads", USDA: "usda_leads", CMS: "cms_leads",
        SAM: "sam_leads", MSHA: "msha_leads", FMCSA: "fmcsa_leads", NTSB: "ntsb_leads",
        IRS: "irs_leads", CPSC: "cpsc_leads", DOE: "doe_leads", HUD: "hud_leads",
        PHMSA: "phmsa_leads", ATF: "atf_leads", CFTC: "cftc_leads", NRC: "nrc_leads",
        FERC: "ferc_leads", PBGC: "pbgc_leads", SEC_IA: "sec_ia_leads", DCMA: "dcma_leads",
        TTB: "ttb_leads", OFAC: "ofac_leads", FINCEN: "fincen_leads", OCC: "occ_leads",
        FDIC: "fdic_leads", NCUA: "ncua_leads", RECAP: "recap_leads",
      };
      const table = tableMap[pipeline];
      if (!table) return null;

      try {
        const rows = await db.prepare(
          `SELECT * FROM ${table} ORDER BY risk_score DESC LIMIT ?1`
        ).bind(limit).all();
        if (!rows.results?.length) return null;

        const leads = rows.results.map((r: Record<string, unknown>) => ({
          entity: String(r["entity"] ?? r["entity_name"] ?? r["recalling_firm"] ?? r["operator_name"] ??
            r["legal_name"] ?? r["facility_name"] ?? r["organization_name"] ?? r["manufacturer"] ??
            r["respondent"] ?? r["licensee"] ?? r["bank_name"] ?? r["credit_union"] ??
            r["permit_holder"] ?? r["contractor"] ?? r["sponsor_name"] ?? r["company"] ?? "Unknown"),
          riskScore: Number(r["risk_score"] ?? 0),
          riskCategories: JSON.parse(String(r["risk_categories"] ?? "[]")) as string[],
          state: String(r["state"] ?? ""),
          id: String(r["id"] ?? r["recall_number"] ?? r["violation_number"] ?? r["dot_number"] ??
            r["ntsb_number"] ?? r["ein"] ?? r["sam_number"] ?? r["plan_number"] ??
            r["recall_id"] ?? r["report_number"] ?? `${pipeline}-${Date.now()}`),
          amount: Number(r["amount"] ?? r["proposed_penalty"] ?? r["penalty_amount"] ?? r["property_damage"] ?? 0),
          dateIssued: String(r["date_issued"] ?? r["recall_date"] ?? r["event_date"] ?? r["incident_date"] ?? r["created_at"] ?? ""),
        }));

        return engine.ingestGeneric(pipeline, leads);
      } catch {
        return null; // Table may not exist yet — skip gracefully
      }
    }

    default:
      return null;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Cluster — Group failures by industry + violation + framework (original)
// ═══════════════════════════════════════════════════════════════════════════

export interface FailureClusterLegacy {
  clusterId: string;
  industry: string;
  violationType: string;
  complianceFramework: string | null;
  entryCount: number;
  uniqueEntities: number;
  avgGapScore: number;
  totalExposure: number;
  severityBreakdown: Record<string, number>;
  topStates: { state: string; count: number }[];
  governingStandards: string[];
}

/**
 * GET /api/taxonomy/cluster — Group taxonomy entries into failure clusters.
 */
export async function handleTaxonomyCluster(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const url = new URL(request.url);
  const minEntries = parseInt(url.searchParams.get("min_entries") ?? "2", 10);
  const industryFilter = url.searchParams.get("industry")?.toUpperCase() ?? null;

  const db = env.DB;

  let whereClause = "";
  const binds: unknown[] = [];

  if (industryFilter) {
    whereClause = "WHERE industry = ?1";
    binds.push(industryFilter);
  }

  const clusterQuery = `
    SELECT
      industry, violation_type, compliance_framework,
      COUNT(*) as entry_count,
      COUNT(DISTINCT entity_name) as unique_entities,
      AVG(gap_score) as avg_gap_score,
      SUM(financial_exposure) as total_exposure
    FROM failure_taxonomy
    ${whereClause}
    GROUP BY industry, violation_type, compliance_framework
    HAVING COUNT(*) >= ${minEntries}
    ORDER BY entry_count DESC
    LIMIT 100
  `;

  const clusterRows = binds.length
    ? await db.prepare(clusterQuery).bind(...binds).all()
    : await db.prepare(clusterQuery).all();

  const clusters: FailureClusterLegacy[] = [];

  for (const row of (clusterRows.results ?? [])) {
    const r = row as Record<string, unknown>;
    const industry = String(r.industry ?? "");
    const violationType = String(r.violation_type ?? "");
    const framework = r.compliance_framework ? String(r.compliance_framework) : null;

    const sevQuery = `
      SELECT severity, COUNT(*) as cnt
      FROM failure_taxonomy
      WHERE industry = ?1 AND violation_type = ?2
        AND (compliance_framework = ?3 OR (?3 IS NULL AND compliance_framework IS NULL))
      GROUP BY severity
    `;
    const sevRows = await db.prepare(sevQuery).bind(industry, violationType, framework).all();
    const severityBreakdown: Record<string, number> = {};
    for (const s of (sevRows.results ?? [])) {
      const sr = s as Record<string, unknown>;
      severityBreakdown[String(sr.severity)] = Number(sr.cnt);
    }

    const stateQuery = `
      SELECT entity_state, COUNT(*) as cnt
      FROM failure_taxonomy
      WHERE industry = ?1 AND violation_type = ?2
        AND (compliance_framework = ?3 OR (?3 IS NULL AND compliance_framework IS NULL))
        AND entity_state IS NOT NULL
      GROUP BY entity_state ORDER BY cnt DESC LIMIT 5
    `;
    const stateRows = await db.prepare(stateQuery).bind(industry, violationType, framework).all();
    const topStates = (stateRows.results ?? []).map(s => {
      const sr = s as Record<string, unknown>;
      return { state: String(sr.entity_state), count: Number(sr.cnt) };
    });

    const stdQuery = `
      SELECT DISTINCT governing_standard
      FROM failure_taxonomy
      WHERE industry = ?1 AND violation_type = ?2
        AND (compliance_framework = ?3 OR (?3 IS NULL AND compliance_framework IS NULL))
        AND governing_standard IS NOT NULL
    `;
    const stdRows = await db.prepare(stdQuery).bind(industry, violationType, framework).all();
    const governingStandards = (stdRows.results ?? []).map(s =>
      String((s as Record<string, unknown>).governing_standard)
    );

    clusters.push({
      clusterId: generateId("clst"),
      industry,
      violationType,
      complianceFramework: framework,
      entryCount: Number(r.entry_count),
      uniqueEntities: Number(r.unique_entities),
      avgGapScore: Math.round(Number(r.avg_gap_score) * 10) / 10,
      totalExposure: Number(r.total_exposure),
      severityBreakdown,
      topStates,
      governingStandards,
    });
  }

  return json({ clusters, count: clusters.length, minEntriesThreshold: minEntries, industryFilter });
}

// ═══════════════════════════════════════════════════════════════════════════
// Discover Skills (original endpoint — lightweight query)
// ═══════════════════════════════════════════════════════════════════════════

export interface DiscoveredSkillLegacy {
  skillSlug: string;
  skillName: string;
  description: string;
  industry: string;
  complianceFramework: string | null;
  violationTypes: string[];
  governingStandards: string[];
  demandSignal: number;
  avgSeverity: string;
  financialExposure: number;
}

/**
 * GET /api/taxonomy/discover-skills — Analyze failure clusters and extract
 * the professional skills needed to prevent/remediate them.
 */
export async function handleTaxonomyDiscoverSkills(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const url = new URL(request.url);
  const minDemand = parseInt(url.searchParams.get("min_demand") ?? "3", 10);
  const industryFilter = url.searchParams.get("industry")?.toUpperCase() ?? null;

  const db = env.DB;

  let whereClause = "";
  const binds: unknown[] = [];

  if (industryFilter) {
    whereClause = "WHERE industry = ?1";
    binds.push(industryFilter);
  }

  const query = `
    SELECT
      industry, compliance_framework, violation_type,
      COUNT(*) as demand,
      COUNT(DISTINCT entity_name) as unique_entities,
      AVG(gap_score) as avg_score,
      SUM(financial_exposure) as total_exposure,
      GROUP_CONCAT(DISTINCT governing_standard) as standards,
      CASE
        WHEN AVG(CASE WHEN severity = 'CRITICAL' THEN 4 WHEN severity = 'HIGH' THEN 3
             WHEN severity = 'MODERATE' THEN 2 ELSE 1 END) >= 3.5 THEN 'CRITICAL'
        WHEN AVG(CASE WHEN severity = 'CRITICAL' THEN 4 WHEN severity = 'HIGH' THEN 3
             WHEN severity = 'MODERATE' THEN 2 ELSE 1 END) >= 2.5 THEN 'HIGH'
        WHEN AVG(CASE WHEN severity = 'CRITICAL' THEN 4 WHEN severity = 'HIGH' THEN 3
             WHEN severity = 'MODERATE' THEN 2 ELSE 1 END) >= 1.5 THEN 'MODERATE'
        ELSE 'LOW'
      END as avg_severity
    FROM failure_taxonomy
    ${whereClause}
    GROUP BY industry, compliance_framework, violation_type
    HAVING COUNT(*) >= ${minDemand}
    ORDER BY demand DESC
    LIMIT 200
  `;

  const rows = binds.length
    ? await db.prepare(query).bind(...binds).all()
    : await db.prepare(query).all();

  const skillMap = new Map<string, DiscoveredSkillLegacy>();

  for (const row of (rows.results ?? [])) {
    const r = row as Record<string, unknown>;
    const industry = String(r.industry ?? "GENERAL");
    const framework = r.compliance_framework ? String(r.compliance_framework) : null;
    const violationType = String(r.violation_type ?? "");

    const key = `${industry}:${framework ?? "GENERAL"}`;

    if (!skillMap.has(key)) {
      const skillName = buildSkillName(industry, framework);
      const slug = skillName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

      skillMap.set(key, {
        skillSlug: slug,
        skillName,
        description: buildSkillDescription(industry, framework),
        industry,
        complianceFramework: framework,
        violationTypes: [],
        governingStandards: [],
        demandSignal: 0,
        avgSeverity: "MODERATE",
        financialExposure: 0,
      });
    }

    const skill = skillMap.get(key)!;
    if (!skill.violationTypes.includes(violationType)) {
      skill.violationTypes.push(violationType);
    }

    const standards = String(r.standards ?? "").split(",").filter(Boolean);
    for (const std of standards) {
      if (!skill.governingStandards.includes(std)) {
        skill.governingStandards.push(std);
      }
    }

    skill.demandSignal += Number(r.demand ?? 0);
    skill.financialExposure += Number(r.total_exposure ?? 0);
    skill.avgSeverity = String(r.avg_severity ?? "MODERATE");
  }

  const skills = Array.from(skillMap.values()).sort((a, b) => b.demandSignal - a.demandSignal);

  return json({ skills, count: skills.length, minDemandThreshold: minDemand, industryFilter });
}

function buildSkillName(industry: string, framework: string | null): string {
  const ind = industry.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  if (framework) {
    const fMap: Record<string, string> = {
      SINGLE_AUDIT: "Single Audit Compliance",
      HIPAA: "HIPAA Privacy & Security",
      SOX: "SOX Internal Controls",
      SBA_8A: "SBA 8(a) Program Compliance",
      CMMC: "CMMC Cybersecurity Maturity",
      FAR: "Federal Acquisition Regulation",
      ITAR: "ITAR Export Controls",
      FEDRAMP: "FedRAMP Authorization",
    };
    return `${ind} ${fMap[framework] ?? framework} Audit`;
  }
  return `${ind} Compliance Audit`;
}

function buildSkillDescription(industry: string, framework: string | null): string {
  const ind = industry.replace(/_/g, " ").toLowerCase();
  if (framework) {
    return `Audit and remediate ${framework} compliance failures in the ${ind} sector. Derived from observed failure patterns in federal enforcement data.`;
  }
  return `Audit and remediate compliance failures in the ${ind} sector. Derived from observed failure patterns across federal enforcement databases.`;
}

// ═══════════════════════════════════════════════════════════════════════════
// Assemble Citizen (original endpoint — single industry)
// ═══════════════════════════════════════════════════════════════════════════

export interface AssembledCitizenSpec {
  citizenId: string;
  name: string;
  title: string;
  industry: string;
  skills: DiscoveredSkillLegacy[];
  totalDemandSignal: number;
  totalFinancialExposure: number;
  complianceFrameworks: string[];
  governingStandards: string[];
  coverageSummary: string;
}

/**
 * POST /api/taxonomy/assemble-citizen — Build a Citizen specification from
 * failure taxonomy data for a target industry.
 *
 * Body: { industry: string, name?: string, title?: string }
 */
export async function handleTaxonomyAssembleCitizen(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  let body: { industry: string; name?: string; title?: string };
  try {
    body = await request.json() as { industry: string; name?: string; title?: string };
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  if (!body.industry) {
    return json({ error: "industry is required" }, 400);
  }

  const industry = body.industry.toUpperCase();
  const db = env.DB;

  const [profileRows, frameworkRows, stdRows, violationRows] = await Promise.all([
    db.prepare(`
      SELECT COUNT(*) as total_failures, COUNT(DISTINCT entity_name) as unique_entities,
             AVG(gap_score) as avg_score, SUM(financial_exposure) as total_exposure
      FROM failure_taxonomy WHERE industry = ?1
    `).bind(industry).first<Record<string, unknown>>(),
    db.prepare(`
      SELECT DISTINCT compliance_framework FROM failure_taxonomy
      WHERE industry = ?1 AND compliance_framework IS NOT NULL
    `).bind(industry).all(),
    db.prepare(`
      SELECT DISTINCT governing_standard FROM failure_taxonomy
      WHERE industry = ?1 AND governing_standard IS NOT NULL
    `).bind(industry).all(),
    db.prepare(`
      SELECT violation_type, compliance_framework, COUNT(*) as cnt,
             AVG(gap_score) as avg_score, SUM(financial_exposure) as exposure,
             GROUP_CONCAT(DISTINCT governing_standard) as standards
      FROM failure_taxonomy WHERE industry = ?1
      GROUP BY violation_type, compliance_framework ORDER BY cnt DESC
    `).bind(industry).all(),
  ]);

  if (!profileRows || Number(profileRows.total_failures) === 0) {
    return json({ error: `No taxonomy data found for industry: ${industry}` }, 404);
  }

  const skills: DiscoveredSkillLegacy[] = [];
  const skillMap = new Map<string, DiscoveredSkillLegacy>();

  for (const row of (violationRows.results ?? [])) {
    const r = row as Record<string, unknown>;
    const framework = r.compliance_framework ? String(r.compliance_framework) : null;
    const violationType = String(r.violation_type ?? "");
    const key = `${industry}:${framework ?? "GENERAL"}`;

    if (!skillMap.has(key)) {
      const skillName = buildSkillName(industry, framework);
      const slug = skillName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const skill: DiscoveredSkillLegacy = {
        skillSlug: slug, skillName,
        description: buildSkillDescription(industry, framework),
        industry, complianceFramework: framework,
        violationTypes: [], governingStandards: [],
        demandSignal: 0, avgSeverity: "MODERATE", financialExposure: 0,
      };
      skillMap.set(key, skill);
      skills.push(skill);
    }

    const skill = skillMap.get(key)!;
    skill.violationTypes.push(violationType);
    skill.demandSignal += Number(r.cnt ?? 0);
    skill.financialExposure += Number(r.exposure ?? 0);

    const stds = String(r.standards ?? "").split(",").filter(Boolean);
    for (const std of stds) {
      if (!skill.governingStandards.includes(std)) skill.governingStandards.push(std);
    }
  }

  const frameworks = (frameworkRows.results ?? []).map(r => String((r as Record<string, unknown>).compliance_framework));
  const standards = (stdRows.results ?? []).map(r => String((r as Record<string, unknown>).governing_standard));

  const indFormatted = industry.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  const defaultName = `${indFormatted.substring(0, 6).toUpperCase()}RA`;
  const name = body.name ?? defaultName;
  const title = body.title ?? `${indFormatted} Compliance Specialist`;

  const spec: AssembledCitizenSpec = {
    citizenId: generateId("ctzn"),
    name, title, industry,
    skills: skills.sort((a, b) => b.demandSignal - a.demandSignal),
    totalDemandSignal: skills.reduce((s, sk) => s + sk.demandSignal, 0),
    totalFinancialExposure: Number(profileRows.total_exposure ?? 0),
    complianceFrameworks: frameworks,
    governingStandards: standards,
    coverageSummary: `${name} covers ${skills.length} compliance skill areas across ${frameworks.length} frameworks, ` +
      `derived from ${Number(profileRows.total_failures)} observed failures affecting ${Number(profileRows.unique_entities)} entities ` +
      `in the ${indFormatted} sector. Total financial exposure: $${Number(profileRows.total_exposure ?? 0).toLocaleString()}.`,
  };

  return json(spec);
}

// ═══════════════════════════════════════════════════════════════════════════
// NEW: Data-Driven Discovery + Assembly (uses new engines)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * POST /api/taxonomy/discover — Run the full skill discovery pipeline.
 * Clusters taxonomy entries into failure_clusters and creates discovered_skills.
 */
export async function handleTaxonomyDiscover(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  try {
    const discovery = new SkillDiscoveryEngine(env);
    const result = await discovery.discover();
    return json({ success: true, ...result });
  } catch (err: unknown) {
    return json({ error: err instanceof Error ? err.message : String(err), stack: err instanceof Error ? err.stack : undefined }, 500);
  }
}

/**
 * POST /api/taxonomy/assemble — Assemble Citizens from discovered skills.
 * Query params: industry, minConfidence, minFailures, autoDeploy
 */
export async function handleTaxonomyAssemble(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const url = new URL(request.url);
  const assembly = new CitizenAssemblyEngine(env);

  const result = await assembly.assemble({
    industry: url.searchParams.get("industry") ?? undefined,
    minConfidence: url.searchParams.has("minConfidence") ? parseFloat(url.searchParams.get("minConfidence")!) : undefined,
    minFailures: url.searchParams.has("minFailures") ? parseInt(url.searchParams.get("minFailures")!, 10) : undefined,
    autoDeploy: url.searchParams.get("autoDeploy") === "true",
  });

  return json({ success: true, ...result });
}

/**
 * POST /api/taxonomy/pipeline — Full pipeline: ingest → discover → assemble.
 * The LexMachina button. One call, real Citizens from real failures.
 */
export async function handleTaxonomyPipeline(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const url = new URL(request.url);
  const limit = url.searchParams.has("limit") ? parseInt(url.searchParams.get("limit")!, 10) : 100;
  const autoDeploy = url.searchParams.get("autoDeploy") === "true";
  const start = Date.now();

  // Step 1: Ingest from all pipeline lead tables
  const taxonomy = new FailureTaxonomyEngine(env);
  await taxonomy.ensureTables();

  const ingestResults: Record<string, TaxonomyIngestResult | { error: string }> = {};
  const pipelines: SourcePipeline[] = ["FAC", "HHS", "EDGAR", "SBA", "USASPENDING", "FEDREG", "CFPB", "FDA"];

  for (const pipeline of pipelines) {
    try {
      const result = await ingestPipeline(env, taxonomy, pipeline, limit);
      if (result) ingestResults[pipeline] = result;
    } catch (e: unknown) {
      ingestResults[pipeline] = { error: e instanceof Error ? e.message : String(e) };
    }
  }

  // Step 2: Discover skills from taxonomy
  const discovery = new SkillDiscoveryEngine(env);
  const discoveryResult = await discovery.discover();

  // Step 3: Assemble Citizens from skills
  const assembly = new CitizenAssemblyEngine(env);
  const assemblyResult = await assembly.assemble({ autoDeploy });

  // Step 4: Get final stats
  const taxonomyStats = await taxonomy.getStats();

  return json({
    success: true,
    totalDurationMs: Date.now() - start,
    ingest: ingestResults,
    discovery: discoveryResult,
    assembly: {
      citizensAssembled: assemblyResult.citizensAssembled,
      skillsAssigned: assemblyResult.skillsAssigned,
      specsCreated: assemblyResult.specsCreated,
      citizensDeployed: assemblyResult.citizensDeployed,
    },
    taxonomyStats,
    assemblies: assemblyResult.assemblies.map(a => ({
      name: a.citizenName,
      trademark: a.citizenTrademark,
      industry: a.industry,
      skills: a.skillCount,
      backingFailures: a.totalBackingFailures,
      confidence: a.avgConfidence,
      frameworks: a.primaryFrameworks,
      status: a.assemblyStatus,
    })),
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// NEW: Query Endpoints
// ═══════════════════════════════════════════════════════════════════════════

/** GET /api/taxonomy/industries — All industries with failure counts */
export async function handleTaxonomyIndustries(
  request: Request, env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const taxonomy = new FailureTaxonomyEngine(env);
  const industries = await taxonomy.getIndustrySummary();
  return json({ industries });
}

/** GET /api/taxonomy/industry/:name — Full industry failure profile */
export async function handleTaxonomyIndustryProfile(
  request: Request, env: Env, _ctx: ExecutionContext, params: RouteParams,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const industry = params.name?.toUpperCase();
  if (!industry) return json({ error: "Industry name required" }, 400);

  const taxonomy = new FailureTaxonomyEngine(env);
  const profile = await taxonomy.getIndustryProfile(industry);
  return json(profile);
}

/** GET /api/taxonomy/skills — All discovered skills (from new engine) */
export async function handleTaxonomySkills(
  request: Request, env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const url = new URL(request.url);
  const industry = url.searchParams.get("industry") ?? undefined;
  const unassigned = url.searchParams.get("unassigned") === "true";

  const discovery = new SkillDiscoveryEngine(env);

  if (unassigned) {
    const skills = await discovery.getUnassignedSkills();
    return json({ skills, count: skills.length });
  }
  if (industry) {
    const skills = await discovery.getSkillsForIndustry(industry.toUpperCase());
    return json({ skills, count: skills.length });
  }

  const clusters = await discovery.getClusters();
  return json({ clusters, count: clusters.length });
}

/** GET /api/taxonomy/assemblies — All assembled Citizens */
export async function handleTaxonomyAssemblies(
  request: Request, env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const url = new URL(request.url);
  const industry = url.searchParams.get("industry") ?? undefined;
  const status = url.searchParams.get("status") ?? undefined;

  const assembly = new CitizenAssemblyEngine(env);
  const assemblies = await assembly.getAssemblies({ industry: industry?.toUpperCase(), status });
  const stats = await assembly.getStats();

  return json({ assemblies, stats });
}

// ═══════════════════════════════════════════════════════════════════════════
// Stats — Taxonomy-wide statistics
// ═══════════════════════════════════════════════════════════════════════════

/**
 * GET /api/taxonomy/stats — Full taxonomy statistics
 */
export async function handleTaxonomyStats(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const engine = new FailureTaxonomyEngine(env);
  await engine.ensureTables();

  const [stats, industries] = await Promise.all([
    engine.getStats(),
    engine.getIndustrySummary(),
  ]);

  return json({ ...stats, industries });
}

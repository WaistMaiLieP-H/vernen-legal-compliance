/**
 * Pipeline Orchestrator Service
 *
 * Auto-trigger orchestration that chains all 40 intelligence pipelines through
 * the full taxonomy → skill discovery → citizen assembly pipeline.
 *
 * Processes pipelines in batches of 10 to stay under D1's 1,000 subrequest limit.
 * Each batch: ingest leads → classify into failure_taxonomy → move to next batch.
 * After all ingestion completes: discover skills → assemble citizens.
 *
 * The orchestrator is the single command that turns federal failure databases
 * into deployable Persona Citizens. One POST, forty pipelines, zero manual steps.
 */

import type { Env } from "../index.js";
import { generateId } from "../utils/helpers.js";
import { FailureTaxonomyEngine } from "./failure-taxonomy.js";
import { SkillDiscoveryEngine } from "./skill-discovery.js";
import { CitizenAssemblyEngine } from "./citizen-assembly.js";
import type { SourcePipeline, TaxonomyIngestResult, TaxonomyStats } from "./failure-taxonomy.js";
import type { SkillDiscoveryResult } from "./skill-discovery.js";
import type { AssemblyResult, CitizenAssembly } from "./citizen-assembly.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface OrchestrationOptions {
  /** Specific pipelines to run (default: all 40) */
  pipelines?: SourcePipeline[];
  /** Max leads per pipeline (default: 50) */
  limit?: number;
  /** Auto-deploy assembled Citizens (default: false) */
  autoDeploy?: boolean;
  /** Minimum confidence for skill inclusion (default: 0.2) */
  minConfidence?: number;
  /** Minimum backing failures for skill inclusion (default: 5) */
  minFailures?: number;
  /** Skip taxonomy ingest, run only discovery + assembly (default: false) */
  skipIngest?: boolean;
  /** Skip discovery + assembly, run only ingest (default: false) */
  ingestOnly?: boolean;
}

export interface BatchResult {
  batchIndex: number;
  pipelines: SourcePipeline[];
  results: Record<string, TaxonomyIngestResult | { error: string }>;
  durationMs: number;
}

export interface OrchestrationReport {
  id: string;
  status: "COMPLETE" | "PARTIAL" | "FAILED";
  startedAt: string;
  completedAt: string;
  totalDurationMs: number;
  options: OrchestrationOptions;
  phases: {
    ingest: {
      durationMs: number;
      batches: BatchResult[];
      totalPipelinesRun: number;
      totalPipelinesSucceeded: number;
      totalPipelinesFailed: number;
      totalRecordsProcessed: number;
      totalRecordsClassified: number;
      totalNewViolations: number;
    } | null;
    discovery: {
      durationMs: number;
      result: SkillDiscoveryResult;
    } | null;
    assembly: {
      durationMs: number;
      citizensAssembled: number;
      skillsAssigned: number;
      specsCreated: number;
      citizensDeployed: number;
      assemblies: Array<{
        name: string;
        trademark: string;
        industry: string;
        skills: number;
        backingFailures: number;
        confidence: number;
        frameworks: string[];
        status: string;
      }>;
    } | null;
    stats: TaxonomyStats | null;
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// All 40 pipelines in wave order
// ═══════════════════════════════════════════════════════════════════════════

const ALL_PIPELINES: SourcePipeline[] = [
  // Wave 1 (6)
  "FAC", "HHS", "EDGAR", "SBA", "USASPENDING", "FEDREG",
  // Wave 2 (4)
  "EPA", "CFPB", "OSHA", "FDA",
  // Wave 3 (4)
  "FTC", "RECAP", "EEOC", "NLRB",
  // Wave 4 (9)
  "NHTSA", "FCC", "USDA", "CMS", "SAM", "MSHA", "FMCSA", "NTSB", "IRS",
  // Wave 5 (9)
  "CPSC", "DOE", "HUD", "PHMSA", "ATF", "CFTC", "NRC", "FERC", "PBGC",
  // Wave 6 (8)
  "SEC_IA", "DCMA", "TTB", "OFAC", "FINCEN", "OCC", "FDIC", "NCUA",
  // Wave 7 — California state (bulk-file ingest, populated by scripts/ingest-cslb.cjs)
  // The orchestrator only reads cslb_leads here; it never fetches CSLB itself.
  "CSLB",
];

const BATCH_SIZE = 10;

// ═══════════════════════════════════════════════════════════════════════════
// Lead table mapping — pipeline name → D1 table
// ═══════════════════════════════════════════════════════════════════════════

const LEAD_TABLE_MAP: Record<string, string> = {
  FAC: "fac_leads",
  HHS: "hhs_breach_leads",
  EDGAR: "edgar_leads",
  SBA: "sba_leads",
  USASPENDING: "spending_leads",
  FEDREG: "fedreg_alerts",
  EPA: "epa_leads",
  CFPB: "cfpb_leads",
  OSHA: "osha_leads",
  FDA: "fda_leads",
  FTC: "ftc_leads",
  RECAP: "recap_leads",
  EEOC: "eeoc_leads",
  NLRB: "nlrb_leads",
  NHTSA: "nhtsa_leads",
  FCC: "fcc_leads",
  USDA: "usda_leads",
  CMS: "cms_leads",
  SAM: "sam_leads",
  MSHA: "msha_leads",
  FMCSA: "fmcsa_leads",
  NTSB: "ntsb_leads",
  IRS: "irs_leads",
  CPSC: "cpsc_leads",
  DOE: "doe_leads",
  HUD: "hud_leads",
  PHMSA: "phmsa_leads",
  ATF: "atf_leads",
  CFTC: "cftc_leads",
  NRC: "nrc_leads",
  FERC: "ferc_leads",
  PBGC: "pbgc_leads",
  SEC_IA: "sec_ia_leads",
  DCMA: "dcma_leads",
  TTB: "ttb_leads",
  OFAC: "ofac_leads",
  FINCEN: "fincen_leads",
  OCC: "occ_leads",
  FDIC: "fdic_leads",
  NCUA: "ncua_leads",
  // Wave 7 — California state
  CSLB: "cslb_leads",
};

// Pipelines that use risk_score vs gap_score for ordering
const GAP_SCORE_PIPELINES = new Set<string>(["FAC", "HHS", "EDGAR", "SBA"]);
const IMPACT_SCORE_PIPELINES = new Set<string>(["FEDREG"]);

// ═══════════════════════════════════════════════════════════════════════════
// Pipeline Orchestrator
// ═══════════════════════════════════════════════════════════════════════════

export class PipelineOrchestrator {
  private db: D1Database;
  private env: Env;

  constructor(env: Env) {
    this.env = env;
    this.db = env.DB;
  }

  /**
   * Run the full orchestration pipeline:
   *   1. Ingest leads from all (or specified) pipelines in batches of 10
   *   2. Run skill discovery on the full taxonomy
   *   3. Run citizen assembly for new skills
   *   4. Return comprehensive report with timing
   */
  async orchestrate(options: OrchestrationOptions = {}): Promise<OrchestrationReport> {
    const id = generateId("orch");
    const startedAt = new Date().toISOString();
    const globalStart = Date.now();

    const pipelines = options.pipelines ?? ALL_PIPELINES;
    const limit = options.limit ?? 50;
    const skipIngest = options.skipIngest ?? false;
    const ingestOnly = options.ingestOnly ?? false;

    let ingestPhase: OrchestrationReport["phases"]["ingest"] = null;
    let discoveryPhase: OrchestrationReport["phases"]["discovery"] = null;
    let assemblyPhase: OrchestrationReport["phases"]["assembly"] = null;
    let statsPhase: OrchestrationReport["phases"]["stats"] = null;

    // ── Phase 1: Ingest ──────────────────────────────────────────────────
    if (!skipIngest) {
      const ingestStart = Date.now();
      const taxonomy = new FailureTaxonomyEngine(this.env);
      await taxonomy.ensureTables();

      const batches: BatchResult[] = [];
      let totalPipelinesRun = 0;
      let totalPipelinesSucceeded = 0;
      let totalPipelinesFailed = 0;
      let totalRecordsProcessed = 0;
      let totalRecordsClassified = 0;
      let totalNewViolations = 0;

      // Split pipelines into batches of BATCH_SIZE
      for (let i = 0; i < pipelines.length; i += BATCH_SIZE) {
        const batch = pipelines.slice(i, i + BATCH_SIZE);
        const batchStart = Date.now();
        const batchResults: Record<string, TaxonomyIngestResult | { error: string }> = {};

        for (const pipeline of batch) {
          totalPipelinesRun++;
          try {
            const result = await this.ingestSingle(taxonomy, pipeline, limit);
            if (result) {
              batchResults[pipeline] = result;
              totalPipelinesSucceeded++;
              totalRecordsProcessed += result.recordsProcessed;
              totalRecordsClassified += result.recordsClassified;
              totalNewViolations += result.newViolations;
            } else {
              // No data in this pipeline — still counts as success
              batchResults[pipeline] = {
                pipeline: pipeline as SourcePipeline,
                recordsProcessed: 0,
                recordsClassified: 0,
                newViolations: 0,
                duplicatesSkipped: 0,
                durationMs: 0,
              } as TaxonomyIngestResult;
              totalPipelinesSucceeded++;
            }
          } catch (e: unknown) {
            batchResults[pipeline] = { error: e instanceof Error ? e.message : String(e) };
            totalPipelinesFailed++;
          }
        }

        batches.push({
          batchIndex: Math.floor(i / BATCH_SIZE),
          pipelines: batch,
          results: batchResults,
          durationMs: Date.now() - batchStart,
        });
      }

      ingestPhase = {
        durationMs: Date.now() - ingestStart,
        batches,
        totalPipelinesRun,
        totalPipelinesSucceeded,
        totalPipelinesFailed,
        totalRecordsProcessed,
        totalRecordsClassified,
        totalNewViolations,
      };
    }

    // ── Phase 2: Skill Discovery ─────────────────────────────────────────
    if (!ingestOnly) {
      const discoveryStart = Date.now();
      const discovery = new SkillDiscoveryEngine(this.env);
      const result = await discovery.discover();
      discoveryPhase = {
        durationMs: Date.now() - discoveryStart,
        result,
      };
    }

    // ── Phase 3: Citizen Assembly ────────────────────────────────────────
    if (!ingestOnly) {
      const assemblyStart = Date.now();
      const assembly = new CitizenAssemblyEngine(this.env);
      const result = await assembly.assemble({
        autoDeploy: options.autoDeploy ?? false,
        minConfidence: options.minConfidence ?? 0.2,
        minFailures: options.minFailures ?? 5,
      });
      assemblyPhase = {
        durationMs: Date.now() - assemblyStart,
        citizensAssembled: result.citizensAssembled,
        skillsAssigned: result.skillsAssigned,
        specsCreated: result.specsCreated,
        citizensDeployed: result.citizensDeployed,
        assemblies: result.assemblies.map((a: CitizenAssembly) => ({
          name: a.citizenName,
          trademark: a.citizenTrademark,
          industry: a.industry,
          skills: a.skillCount,
          backingFailures: a.totalBackingFailures,
          confidence: a.avgConfidence,
          frameworks: a.primaryFrameworks,
          status: a.assemblyStatus,
        })),
      };
    }

    // ── Phase 4: Stats ───────────────────────────────────────────────────
    try {
      const taxonomy = new FailureTaxonomyEngine(this.env);
      statsPhase = await taxonomy.getStats();
    } catch {
      // Stats are informational — don't fail the orchestration
    }

    // ── Save report to KV for status endpoint ────────────────────────────
    const completedAt = new Date().toISOString();
    const totalDurationMs = Date.now() - globalStart;

    const succeeded = (ingestPhase?.totalPipelinesFailed ?? 0) === 0;
    const partial = (ingestPhase?.totalPipelinesFailed ?? 0) > 0 &&
                    (ingestPhase?.totalPipelinesSucceeded ?? 0) > 0;

    const report: OrchestrationReport = {
      id,
      status: succeeded ? "COMPLETE" : partial ? "PARTIAL" : "FAILED",
      startedAt,
      completedAt,
      totalDurationMs,
      options: {
        pipelines: options.pipelines,
        limit,
        autoDeploy: options.autoDeploy,
        minConfidence: options.minConfidence,
        minFailures: options.minFailures,
        skipIngest,
        ingestOnly,
      },
      phases: {
        ingest: ingestPhase,
        discovery: discoveryPhase,
        assembly: assemblyPhase,
        stats: statsPhase,
      },
    };

    // Store last report in KV (TTL 24h) for the status endpoint
    try {
      await this.env.KNOWLEDGE_STORE.put(
        "orchestration:last_report",
        JSON.stringify(report),
        { expirationTtl: 86400 },
      );
    } catch {
      // KV write failure is non-fatal
    }

    return report;
  }

  /**
   * Run only the intelligence pipeline ingestion phase (no discovery/assembly).
   */
  async ingestPipelines(options: OrchestrationOptions = {}): Promise<OrchestrationReport> {
    return this.orchestrate({ ...options, ingestOnly: true });
  }

  /**
   * Get the last orchestration report from KV.
   */
  async getLastReport(): Promise<OrchestrationReport | null> {
    try {
      const raw = await this.env.KNOWLEDGE_STORE.get("orchestration:last_report");
      if (!raw) return null;
      return JSON.parse(raw) as OrchestrationReport;
    } catch {
      return null;
    }
  }

  // ═══════════════════════════════════════════════════════════════════════
  // Private: Single pipeline ingest
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Ingest a single pipeline's leads into the failure taxonomy.
   * Uses the generic ingest path for all pipelines to keep subrequest count low.
   * Each pipeline costs ~2-3 subrequests (SELECT + batch INSERT).
   */
  private async ingestSingle(
    engine: FailureTaxonomyEngine,
    pipeline: SourcePipeline,
    limit: number,
  ): Promise<TaxonomyIngestResult | null> {
    const table = LEAD_TABLE_MAP[pipeline];
    if (!table) return null;

    // Determine sort column
    const sortCol = GAP_SCORE_PIPELINES.has(pipeline) ? "gap_score"
      : IMPACT_SCORE_PIPELINES.has(pipeline) ? "impact_score"
      : "risk_score";

    try {
      const rows = await this.db.prepare(
        `SELECT * FROM ${table} ORDER BY ${sortCol} DESC LIMIT ?1`
      ).bind(limit).all();

      if (!rows.results?.length) return null;

      // Map all pipelines through the generic ingest for consistency
      // The taxonomy engine handles deduplication internally
      const leads = rows.results.map((r: Record<string, unknown>) => ({
        entity: String(
          r["entity"] ?? r["entity_name"] ?? r["auditee_name"] ?? r["company_name"] ??
          r["firm_name"] ?? r["recalling_firm"] ?? r["operator_name"] ??
          r["legal_name"] ?? r["facility_name"] ?? r["organization_name"] ??
          r["manufacturer"] ?? r["respondent"] ?? r["licensee"] ??
          r["bank_name"] ?? r["credit_union"] ?? r["permit_holder"] ??
          r["contractor"] ?? r["sponsor_name"] ?? r["company"] ??
          r["recipient_name"] ?? r["title"] ?? "Unknown"
        ),
        riskScore: Number(
          r["risk_score"] ?? r["gap_score"] ?? r["impact_score"] ?? 0
        ),
        riskCategories: safeParseArray(r["risk_categories"] ?? r["gap_categories"] ?? r["compliance_keywords"] ?? "[]"),
        state: String(r["state"] ?? r["auditee_state"] ?? r["recipient_state"] ?? ""),
        id: String(
          r["id"] ?? r["report_id"] ?? r["recall_number"] ?? r["violation_number"] ??
          r["dot_number"] ?? r["ntsb_number"] ?? r["ein"] ?? r["sam_number"] ??
          r["plan_number"] ?? r["recall_id"] ?? r["report_number"] ??
          r["accession_number"] ?? r["document_number"] ?? r["uei"] ??
          r["award_id"] ?? `${pipeline}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
        ),
        amount: Number(
          r["amount"] ?? r["proposed_penalty"] ?? r["penalty_amount"] ??
          r["property_damage"] ?? r["total_expended"] ?? r["award_amount"] ?? 0
        ),
        dateIssued: String(
          r["date_issued"] ?? r["recall_date"] ?? r["event_date"] ??
          r["incident_date"] ?? r["filing_date"] ?? r["publication_date"] ??
          r["breach_date"] ?? r["created_at"] ?? ""
        ),
      }));

      return engine.ingestGeneric(pipeline, leads);
    } catch {
      // Table may not exist yet — skip gracefully
      return null;
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════════════════

function safeParseArray(val: unknown): string[] {
  if (Array.isArray(val)) return val.map(String);
  if (typeof val === "string") {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed.map(String);
    } catch {
      // not JSON
    }
  }
  return [];
}

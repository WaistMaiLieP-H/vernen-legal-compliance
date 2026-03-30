/**
 * FAC Intelligence Service — Federal Audit Clearinghouse Pipeline
 *
 * Connects to the FAC API (api.fac.gov) to identify entities with
 * documented compliance gaps: material weaknesses, questioned costs,
 * repeat findings, and modified opinions.
 *
 * These are not cold leads — they are entities with legally mandated
 * compliance obligations and documented audit failures.
 */

import type { Env } from "../index.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface FACEntity {
  reportId: string;
  auditYear: number;
  auditeeNname: string;
  auditeeEin: string;
  auditeeUei: string;
  auditeeState: string;
  auditeeCity: string;
  auditeeZip: string;
  auditeeContactName: string;
  auditeeEmail: string;
  auditeePhone: string;
  auditorFirmName: string;
  totalAmountExpended: number;
  entityType: string;
  isGoingConcern: boolean;
  isMaterialWeakness: boolean;
  isMaterialNoncompliance: boolean;
  isLowRiskAuditee: boolean;
  facAcceptedDate: string;
}

export interface FACFinding {
  reportId: string;
  auditYear: number;
  referenceNumber: string;
  isMaterialWeakness: boolean;
  isSignificantDeficiency: boolean;
  isModifiedOpinion: boolean;
  isQuestionedCosts: boolean;
  isRepeatFinding: boolean;
  typeRequirement: string;
}

export interface FACFindingText {
  reportId: string;
  findingRefNumber: string;
  findingText: string;
}

export interface FACFederalAward {
  reportId: string;
  auditYear: number;
  federalAgencyPrefix: string;
  federalAwardExtension: string;
  federalProgramName: string;
  amountExpended: number;
  isMajor: boolean;
  findingsCount: number;
  auditReportType: string; // U=Unmodified, D=Disclaimer, A=Adverse, S=Scope limitation
}

export interface ComplianceGapLead {
  entity: FACEntity;
  findings: FACFinding[];
  findingsText: FACFindingText[];
  awards: FACFederalAward[];
  gapScore: number; // 0-100, higher = more urgent compliance need
  gapCategories: string[];
  recommendedServices: string[];
  estimatedRemediation: string;
}

export interface FACSearchFilters {
  auditYear?: number;
  state?: string;
  materialWeaknessOnly?: boolean;
  questionedCostsOnly?: boolean;
  repeatFindingsOnly?: boolean;
  minExpenditure?: number;
  maxExpenditure?: number;
  entityType?: string;
  limit?: number;
  offset?: number;
}

export interface FACPipelineResult {
  leads: ComplianceGapLead[];
  totalMatched: number;
  filters: FACSearchFilters;
  generatedAt: string;
  source: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// FAC API Client
// ═══════════════════════════════════════════════════════════════════════════

const FAC_API_BASE = "https://api.fac.gov";
const DEFAULT_LIMIT = 100;
const MAX_LIMIT = 1000;

export class FACIntelligenceService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Core API request handler with rate-limit awareness
   */
  private async facRequest<T>(
    endpoint: string,
    params: Record<string, string> = {}
  ): Promise<T[]> {
    const url = new URL(`${FAC_API_BASE}${endpoint}`);
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }

    const response = await fetch(url.toString(), {
      headers: {
        "X-Api-Key": this.apiKey,
        "Accept": "application/json",
      },
    });

    if (response.status === 429) {
      throw new FACRateLimitError(
        response.headers.get("X-RateLimit-Remaining") ?? "0"
      );
    }

    if (!response.ok) {
      throw new FACApiError(response.status, await response.text());
    }

    return response.json() as Promise<T[]>;
  }

  // ─── Discovery Queries ──────────────────────────────────────────────

  /**
   * Find entities with material weakness findings.
   * These entities have documented internal control failures
   * and are prime candidates for remediation services.
   */
  async findMaterialWeaknesses(
    filters: FACSearchFilters = {}
  ): Promise<FACEntity[]> {
    const year = filters.auditYear ?? new Date().getFullYear() - 1;
    const limit = Math.min(filters.limit ?? DEFAULT_LIMIT, MAX_LIMIT);

    const params: Record<string, string> = {
      audit_year: `eq.${year}`,
      is_internal_control_material_weakness_disclosed: "eq.Yes",
      select: [
        "report_id", "audit_year", "auditee_name", "auditee_ein",
        "auditee_uei", "auditee_state", "auditee_city", "auditee_zip",
        "auditee_contact_name", "auditee_email", "auditee_phone",
        "auditor_firm_name", "total_amount_expended", "entity_type",
        "is_going_concern_included",
        "is_internal_control_material_weakness_disclosed",
        "is_material_noncompliance_disclosed",
        "is_low_risk_auditee", "fac_accepted_date",
      ].join(","),
      limit: String(limit),
      offset: String(filters.offset ?? 0),
      order: "total_amount_expended.desc",
    };

    if (filters.state) {
      params["auditee_state"] = `eq.${filters.state.toUpperCase()}`;
    }
    if (filters.minExpenditure) {
      params["total_amount_expended"] = `gte.${filters.minExpenditure}`;
    }
    if (filters.entityType) {
      params["entity_type"] = `eq.${filters.entityType}`;
    }

    const raw = await this.facRequest<Record<string, unknown>>("/general", params);
    return raw.map(mapToFACEntity);
  }

  /**
   * Find entities with questioned costs — money that may need to be returned.
   * Highest urgency leads.
   */
  async findQuestionedCosts(
    filters: FACSearchFilters = {}
  ): Promise<FACFinding[]> {
    const year = filters.auditYear ?? new Date().getFullYear() - 1;
    const limit = Math.min(filters.limit ?? DEFAULT_LIMIT, MAX_LIMIT);

    const params: Record<string, string> = {
      audit_year: `eq.${year}`,
      is_questioned_costs: "eq.Yes",
      limit: String(limit),
      offset: String(filters.offset ?? 0),
    };

    const raw = await this.facRequest<Record<string, unknown>>("/findings", params);
    return raw.map(mapToFACFinding);
  }

  /**
   * Find repeat findings — entities that failed the same audit point
   * in consecutive years. Indicates systemic compliance failure.
   */
  async findRepeatFindings(
    filters: FACSearchFilters = {}
  ): Promise<FACFinding[]> {
    const year = filters.auditYear ?? new Date().getFullYear() - 1;
    const limit = Math.min(filters.limit ?? DEFAULT_LIMIT, MAX_LIMIT);

    const params: Record<string, string> = {
      audit_year: `eq.${year}`,
      is_repeat_finding: "eq.Yes",
      limit: String(limit),
      offset: String(filters.offset ?? 0),
    };

    const raw = await this.facRequest<Record<string, unknown>>("/findings", params);
    return raw.map(mapToFACFinding);
  }

  /**
   * Get findings detail for a specific entity by report_id
   */
  async getEntityFindings(reportId: string): Promise<FACFinding[]> {
    const raw = await this.facRequest<Record<string, unknown>>("/findings", {
      report_id: `eq.${reportId}`,
    });
    return raw.map(mapToFACFinding);
  }

  /**
   * Get the narrative text of findings for a specific entity
   */
  async getEntityFindingsText(reportId: string): Promise<FACFindingText[]> {
    const raw = await this.facRequest<Record<string, unknown>>("/findings_text", {
      report_id: `eq.${reportId}`,
    });
    return raw.map((r) => ({
      reportId: String(r["report_id"] ?? ""),
      findingRefNumber: String(r["finding_ref_number"] ?? ""),
      findingText: String(r["finding_text"] ?? ""),
    }));
  }

  /**
   * Get federal awards for a specific entity
   */
  async getEntityAwards(reportId: string): Promise<FACFederalAward[]> {
    const raw = await this.facRequest<Record<string, unknown>>("/federal_awards", {
      report_id: `eq.${reportId}`,
      order: "amount_expended.desc",
    });
    return raw.map(mapToFACAward);
  }

  // ─── Full Intelligence Pipeline ─────────────────────────────────────

  /**
   * Run the full compliance gap intelligence pipeline.
   * Discovers entities with gaps → enriches with findings → scores → recommends.
   */
  async runPipeline(
    filters: FACSearchFilters = {}
  ): Promise<FACPipelineResult> {
    // Step 1: Find entities with material weaknesses
    const entities = await this.findMaterialWeaknesses(filters);

    // Step 2: Enrich top entities with findings detail
    const enrichmentLimit = Math.min(entities.length, 25); // API rate limit awareness
    const leads: ComplianceGapLead[] = [];

    for (let i = 0; i < enrichmentLimit; i++) {
      const entity = entities[i]!;

      const [findings, findingsText, awards] = await Promise.all([
        this.getEntityFindings(entity.reportId),
        this.getEntityFindingsText(entity.reportId),
        this.getEntityAwards(entity.reportId),
      ]);

      const lead = buildComplianceGapLead(entity, findings, findingsText, awards);
      leads.push(lead);
    }

    // Sort by gap score (highest urgency first)
    leads.sort((a, b) => b.gapScore - a.gapScore);

    return {
      leads,
      totalMatched: entities.length,
      filters,
      generatedAt: new Date().toISOString(),
      source: "Federal Audit Clearinghouse (fac.gov)",
    };
  }

  // ─── State-level Summary ────────────────────────────────────────────

  /**
   * Get a summary of compliance gaps by state for a given audit year.
   * Useful for identifying which states have the most opportunity.
   */
  async getStateSummary(auditYear?: number): Promise<Record<string, number>> {
    const year = auditYear ?? new Date().getFullYear() - 1;

    const raw = await this.facRequest<Record<string, unknown>>("/general", {
      audit_year: `eq.${year}`,
      is_internal_control_material_weakness_disclosed: "eq.Yes",
      select: "auditee_state",
      limit: "10000",
    });

    const counts: Record<string, number> = {};
    for (const r of raw) {
      const state = String(r["auditee_state"] ?? "UNKNOWN");
      counts[state] = (counts[state] ?? 0) + 1;
    }

    return counts;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Gap Scoring & Recommendation Engine
// ═══════════════════════════════════════════════════════════════════════════

function buildComplianceGapLead(
  entity: FACEntity,
  findings: FACFinding[],
  findingsText: FACFindingText[],
  awards: FACFederalAward[]
): ComplianceGapLead {
  let gapScore = 0;
  const gapCategories: string[] = [];
  const recommendedServices: string[] = [];

  // Material weakness = base 30 points
  if (entity.isMaterialWeakness) {
    gapScore += 30;
    gapCategories.push("Internal Control Material Weakness");
    recommendedServices.push("Internal Control Remediation Audit");
  }

  // Material noncompliance = 25 points
  if (entity.isMaterialNoncompliance) {
    gapScore += 25;
    gapCategories.push("Material Noncompliance");
    recommendedServices.push("Federal Compliance Gap Analysis");
  }

  // Going concern = 20 points (entity viability at risk)
  if (entity.isGoingConcern) {
    gapScore += 20;
    gapCategories.push("Going Concern");
    recommendedServices.push("Organizational Viability Assessment");
  }

  // Repeat findings = 15 points each (systemic failure)
  const repeatCount = findings.filter((f) => f.isRepeatFinding).length;
  if (repeatCount > 0) {
    gapScore += Math.min(repeatCount * 15, 30);
    gapCategories.push(`Repeat Findings (${repeatCount})`);
    recommendedServices.push("Systemic Compliance Remediation Program");
  }

  // Questioned costs = 10 points (financial exposure)
  const questionedCount = findings.filter((f) => f.isQuestionedCosts).length;
  if (questionedCount > 0) {
    gapScore += Math.min(questionedCount * 10, 20);
    gapCategories.push(`Questioned Costs (${questionedCount} findings)`);
    recommendedServices.push("Financial Compliance & Cost Recovery Audit");
  }

  // Modified opinions on awards = 5 points each
  const modifiedAwards = awards.filter(
    (a) => a.auditReportType !== "U" && a.auditReportType !== ""
  );
  if (modifiedAwards.length > 0) {
    gapScore += Math.min(modifiedAwards.length * 5, 15);
    gapCategories.push(`Modified Audit Opinions (${modifiedAwards.length} awards)`);
    recommendedServices.push("Award-Specific Compliance Review");
  }

  // Multiple findings = complexity multiplier
  if (findings.length > 5) {
    gapScore += 10;
    gapCategories.push(`High Finding Volume (${findings.length} total)`);
  }

  // Cap at 100
  gapScore = Math.min(gapScore, 100);

  // Estimate remediation timeline
  let estimatedRemediation: string;
  if (gapScore >= 80) {
    estimatedRemediation = "6-12 months comprehensive remediation program";
  } else if (gapScore >= 50) {
    estimatedRemediation = "3-6 months targeted remediation";
  } else if (gapScore >= 25) {
    estimatedRemediation = "1-3 months focused compliance review";
  } else {
    estimatedRemediation = "< 1 month standard compliance check";
  }

  // Deduplicate services
  const uniqueServices = [...new Set(recommendedServices)];

  return {
    entity,
    findings,
    findingsText,
    awards,
    gapScore,
    gapCategories,
    recommendedServices: uniqueServices,
    estimatedRemediation,
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// Compliance Gap Report Generator
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Generate a professional HTML compliance gap report for a specific entity.
 * This is the "free sample" — demonstrates value before asking for payment.
 */
export function generateGapReportHTML(lead: ComplianceGapLead): string {
  const { entity, findings, awards, gapScore, gapCategories, recommendedServices, estimatedRemediation } = lead;

  const scoreColor = gapScore >= 70 ? "#dc2626" : gapScore >= 40 ? "#d97706" : "#16a34a";
  const scoreLabel = gapScore >= 70 ? "CRITICAL" : gapScore >= 40 ? "ELEVATED" : "MODERATE";

  const findingsRows = findings.map((f) => `
    <tr>
      <td>${sanitize(f.referenceNumber)}</td>
      <td>${f.isMaterialWeakness ? '<span class="badge critical">Material Weakness</span>' : ""}
          ${f.isSignificantDeficiency ? '<span class="badge warning">Significant Deficiency</span>' : ""}
          ${f.isQuestionedCosts ? '<span class="badge critical">Questioned Costs</span>' : ""}
          ${f.isRepeatFinding ? '<span class="badge repeat">REPEAT</span>' : ""}
          ${f.isModifiedOpinion ? '<span class="badge warning">Modified Opinion</span>' : ""}</td>
      <td>${sanitize(f.typeRequirement)}</td>
    </tr>`).join("");

  const awardsRows = awards.slice(0, 10).map((a) => `
    <tr>
      <td>${sanitize(a.federalAgencyPrefix)}.${sanitize(a.federalAwardExtension)}</td>
      <td>${sanitize(a.federalProgramName)}</td>
      <td class="amount">$${a.amountExpended.toLocaleString()}</td>
      <td>${a.findingsCount > 0 ? `<span class="badge critical">${a.findingsCount} findings</span>` : '<span class="badge ok">Clean</span>'}</td>
      <td>${a.auditReportType === "U" ? "Unmodified" : a.auditReportType === "A" ? "Adverse" : a.auditReportType === "D" ? "Disclaimer" : a.auditReportType === "S" ? "Scope Limitation" : a.auditReportType || "N/A"}</td>
    </tr>`).join("");

  const servicesHTML = recommendedServices.map((s) => `<li>${sanitize(s)}</li>`).join("");
  const categoriesHTML = gapCategories.map((c) => `<span class="gap-tag">${sanitize(c)}</span>`).join(" ");

  const totalExpended = awards.reduce((sum, a) => sum + a.amountExpended, 0);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Compliance Gap Report — ${sanitize(entity.auditeeNname)}</title>
<style>
  :root {
    --gold: #c8a951; --navy: #0a0e17; --slate: #1a1f2e;
    --text: #e0e6f0; --muted: #8892a4;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', system-ui, sans-serif; background: var(--navy); color: var(--text); line-height: 1.6; }
  .container { max-width: 960px; margin: 0 auto; padding: 2rem; }
  .header { text-align: center; padding: 2rem 0; border-bottom: 2px solid var(--gold); margin-bottom: 2rem; }
  .header h1 { color: var(--gold); font-size: 1.5rem; letter-spacing: 2px; text-transform: uppercase; }
  .header .subtitle { color: var(--muted); margin-top: 0.5rem; }
  .entity-card { background: var(--slate); border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .entity-card .label { color: var(--muted); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; }
  .entity-card .value { font-size: 1.1rem; margin-bottom: 0.5rem; }
  .score-section { text-align: center; background: var(--slate); border-radius: 8px; padding: 2rem; margin-bottom: 1.5rem; }
  .score-circle { width: 120px; height: 120px; border-radius: 50%; border: 6px solid ${scoreColor}; display: inline-flex; align-items: center; justify-content: center; flex-direction: column; }
  .score-number { font-size: 2rem; font-weight: bold; color: ${scoreColor}; }
  .score-label { font-size: 0.75rem; color: ${scoreColor}; letter-spacing: 2px; text-transform: uppercase; }
  .section { margin-bottom: 2rem; }
  .section h2 { color: var(--gold); font-size: 1.2rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(200,169,81,0.3); }
  table { width: 100%; border-collapse: collapse; background: var(--slate); border-radius: 8px; overflow: hidden; }
  th { background: rgba(200,169,81,0.15); color: var(--gold); text-align: left; padding: 0.75rem; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; }
  td { padding: 0.75rem; border-top: 1px solid rgba(255,255,255,0.05); font-size: 0.9rem; }
  .amount { font-family: monospace; text-align: right; }
  .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; margin: 2px; }
  .badge.critical { background: rgba(220,38,38,0.2); color: #fca5a5; }
  .badge.warning { background: rgba(217,119,6,0.2); color: #fcd34d; }
  .badge.repeat { background: rgba(147,51,234,0.2); color: #c4b5fd; }
  .badge.ok { background: rgba(22,163,74,0.2); color: #86efac; }
  .gap-tag { display: inline-block; background: rgba(220,38,38,0.15); color: #fca5a5; padding: 4px 12px; border-radius: 16px; font-size: 0.85rem; margin: 4px; }
  .recommendations { background: var(--slate); border-radius: 8px; padding: 1.5rem; border-left: 4px solid var(--gold); }
  .recommendations ul { padding-left: 1.5rem; }
  .recommendations li { margin-bottom: 0.5rem; }
  .cta { text-align: center; margin-top: 2rem; padding: 2rem; background: linear-gradient(135deg, rgba(200,169,81,0.1), rgba(200,169,81,0.05)); border: 1px solid var(--gold); border-radius: 8px; }
  .cta a { display: inline-block; background: var(--gold); color: var(--navy); padding: 12px 32px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 1.1rem; }
  .footer { text-align: center; color: var(--muted); font-size: 0.8rem; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.05); }
  .disclaimer { font-size: 0.75rem; color: var(--muted); margin-top: 1rem; font-style: italic; }
</style>
</head>
<body>
<div class="container">

  <div class="header">
    <h1>Vernen Legal Compliance</h1>
    <div class="subtitle">Federal Audit Compliance Gap Report</div>
  </div>

  <div class="entity-card">
    <div>
      <div class="label">Entity</div>
      <div class="value">${sanitize(entity.auditeeNname)}</div>
      <div class="label">Location</div>
      <div class="value">${sanitize(entity.auditeeCity)}, ${sanitize(entity.auditeeState)} ${sanitize(entity.auditeeZip)}</div>
      <div class="label">EIN</div>
      <div class="value">${sanitize(entity.auditeeEin)}</div>
    </div>
    <div>
      <div class="label">Audit Year</div>
      <div class="value">${entity.auditYear}</div>
      <div class="label">Total Federal Expenditures</div>
      <div class="value" style="font-family:monospace;">$${entity.totalAmountExpended.toLocaleString()}</div>
      <div class="label">Audit Firm</div>
      <div class="value">${sanitize(entity.auditorFirmName)}</div>
    </div>
  </div>

  <div class="score-section">
    <div class="score-circle">
      <div class="score-number">${gapScore}</div>
      <div class="score-label">${scoreLabel}</div>
    </div>
    <p style="margin-top:1rem; color: var(--muted);">Compliance Gap Score — higher indicates greater remediation urgency</p>
    <div style="margin-top:1rem;">${categoriesHTML}</div>
  </div>

  <div class="section">
    <h2>Audit Findings (${findings.length})</h2>
    ${findings.length > 0 ? `
    <table>
      <thead><tr><th>Ref #</th><th>Classification</th><th>Requirement</th></tr></thead>
      <tbody>${findingsRows}</tbody>
    </table>` : '<p style="color: var(--muted);">No findings on record.</p>'}
  </div>

  <div class="section">
    <h2>Federal Awards Under Audit ($${totalExpended.toLocaleString()} total)</h2>
    ${awards.length > 0 ? `
    <table>
      <thead><tr><th>ALN</th><th>Program</th><th>Expended</th><th>Findings</th><th>Opinion</th></tr></thead>
      <tbody>${awardsRows}</tbody>
    </table>` : '<p style="color: var(--muted);">No award data available.</p>'}
  </div>

  <div class="section">
    <h2>Recommended Compliance Services</h2>
    <div class="recommendations">
      <ul>${servicesHTML}</ul>
      <p style="margin-top: 1rem; color: var(--muted);">Estimated remediation timeline: <strong style="color: var(--text);">${sanitize(estimatedRemediation)}</strong></p>
    </div>
  </div>

  <div class="cta">
    <p style="margin-bottom: 1rem; font-size: 1.1rem;">Ready to close these compliance gaps?</p>
    <a href="https://compliance.vernenlegal.com/api/regulis/check">Start Your Compliance Review</a>
    <p style="margin-top: 1rem; color: var(--muted);">Powered by 745+ compliance rules across all 50 states</p>
  </div>

  <div class="footer">
    <p>Generated by Vernen Legal Compliance — ${new Date().toISOString().split("T")[0]}</p>
    <p>Data source: Federal Audit Clearinghouse (fac.gov) — Public record</p>
    <p class="disclaimer">This report is generated from publicly available federal audit data and is provided for informational purposes only. It does not constitute legal advice, an audit opinion, or a professional engagement. Consult qualified professionals for compliance remediation.</p>
  </div>

</div>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// D1 Storage — Cache FAC data locally for fast access
// ═══════════════════════════════════════════════════════════════════════════

export async function ensureFACTables(db: D1Database): Promise<void> {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS fac_leads (
      report_id TEXT PRIMARY KEY,
      audit_year INTEGER NOT NULL,
      auditee_name TEXT NOT NULL,
      auditee_ein TEXT,
      auditee_uei TEXT,
      auditee_state TEXT,
      auditee_city TEXT,
      total_expended INTEGER DEFAULT 0,
      entity_type TEXT,
      gap_score INTEGER DEFAULT 0,
      gap_categories TEXT DEFAULT '[]',
      recommended_services TEXT DEFAULT '[]',
      findings_count INTEGER DEFAULT 0,
      has_material_weakness INTEGER DEFAULT 0,
      has_questioned_costs INTEGER DEFAULT 0,
      has_repeat_findings INTEGER DEFAULT 0,
      status TEXT DEFAULT 'new',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_fac_leads_state ON fac_leads(auditee_state);
    CREATE INDEX IF NOT EXISTS idx_fac_leads_score ON fac_leads(gap_score DESC);
    CREATE INDEX IF NOT EXISTS idx_fac_leads_status ON fac_leads(status);
    CREATE INDEX IF NOT EXISTS idx_fac_leads_year ON fac_leads(audit_year);
  `);
}

export async function storeLead(
  db: D1Database,
  lead: ComplianceGapLead
): Promise<void> {
  await db.prepare(`
    INSERT OR REPLACE INTO fac_leads
    (report_id, audit_year, auditee_name, auditee_ein, auditee_uei,
     auditee_state, auditee_city, total_expended, entity_type,
     gap_score, gap_categories, recommended_services,
     findings_count, has_material_weakness, has_questioned_costs,
     has_repeat_findings, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
  `).bind(
    lead.entity.reportId,
    lead.entity.auditYear,
    lead.entity.auditeeNname,
    lead.entity.auditeeEin,
    lead.entity.auditeeUei,
    lead.entity.auditeeState,
    lead.entity.auditeeCity,
    lead.entity.totalAmountExpended,
    lead.entity.entityType,
    lead.gapScore,
    JSON.stringify(lead.gapCategories),
    JSON.stringify(lead.recommendedServices),
    lead.findings.length,
    lead.findings.some((f) => f.isMaterialWeakness) ? 1 : 0,
    lead.findings.some((f) => f.isQuestionedCosts) ? 1 : 0,
    lead.findings.some((f) => f.isRepeatFinding) ? 1 : 0,
  ).run();
}

export async function getStoredLeads(
  db: D1Database,
  filters: { state?: string; minScore?: number; status?: string; limit?: number }
): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM fac_leads WHERE 1=1";
  const binds: unknown[] = [];

  if (filters.state) {
    query += " AND auditee_state = ?";
    binds.push(filters.state.toUpperCase());
  }
  if (filters.minScore) {
    query += " AND gap_score >= ?";
    binds.push(filters.minScore);
  }
  if (filters.status) {
    query += " AND status = ?";
    binds.push(filters.status);
  }

  query += " ORDER BY gap_score DESC LIMIT ?";
  binds.push(filters.limit ?? 50);

  const result = await db.prepare(query).bind(...binds).all();
  return result.results as Record<string, unknown>[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Data Mappers
// ═══════════════════════════════════════════════════════════════════════════

function mapToFACEntity(r: Record<string, unknown>): FACEntity {
  return {
    reportId: String(r["report_id"] ?? ""),
    auditYear: Number(r["audit_year"] ?? 0),
    auditeeNname: String(r["auditee_name"] ?? ""),
    auditeeEin: String(r["auditee_ein"] ?? ""),
    auditeeUei: String(r["auditee_uei"] ?? ""),
    auditeeState: String(r["auditee_state"] ?? ""),
    auditeeCity: String(r["auditee_city"] ?? ""),
    auditeeZip: String(r["auditee_zip"] ?? ""),
    auditeeContactName: String(r["auditee_contact_name"] ?? ""),
    auditeeEmail: String(r["auditee_email"] ?? ""),
    auditeePhone: String(r["auditee_phone"] ?? ""),
    auditorFirmName: String(r["auditor_firm_name"] ?? ""),
    totalAmountExpended: Number(r["total_amount_expended"] ?? 0),
    entityType: String(r["entity_type"] ?? ""),
    isGoingConcern: String(r["is_going_concern_included"]).toUpperCase() === "YES",
    isMaterialWeakness: String(r["is_internal_control_material_weakness_disclosed"]).toUpperCase() === "YES",
    isMaterialNoncompliance: String(r["is_material_noncompliance_disclosed"]).toUpperCase() === "YES",
    isLowRiskAuditee: String(r["is_low_risk_auditee"]).toUpperCase() === "YES",
    facAcceptedDate: String(r["fac_accepted_date"] ?? ""),
  };
}

function mapToFACFinding(r: Record<string, unknown>): FACFinding {
  return {
    reportId: String(r["report_id"] ?? ""),
    auditYear: Number(r["audit_year"] ?? 0),
    referenceNumber: String(r["reference_number"] ?? ""),
    isMaterialWeakness: String(r["is_material_weakness"]).toUpperCase() === "YES",
    isSignificantDeficiency: String(r["is_significant_deficiency"]).toUpperCase() === "YES",
    isModifiedOpinion: String(r["is_modified_opinion"]).toUpperCase() === "YES",
    isQuestionedCosts: String(r["is_questioned_costs"]).toUpperCase() === "YES",
    isRepeatFinding: String(r["is_repeat_finding"]).toUpperCase() === "YES",
    typeRequirement: String(r["type_requirement"] ?? ""),
  };
}

function mapToFACAward(r: Record<string, unknown>): FACFederalAward {
  return {
    reportId: String(r["report_id"] ?? ""),
    auditYear: Number(r["audit_year"] ?? 0),
    federalAgencyPrefix: String(r["federal_agency_prefix"] ?? ""),
    federalAwardExtension: String(r["federal_award_extension"] ?? ""),
    federalProgramName: String(r["federal_program_name"] ?? ""),
    amountExpended: Number(r["amount_expended"] ?? 0),
    isMajor: String(r["is_major"]).toUpperCase() === "YES",
    findingsCount: Number(r["findings_count"] ?? 0),
    auditReportType: String(r["audit_report_type"] ?? ""),
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// Outreach Email Generator
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Generate a direct outreach email for an entity with Single Audit findings.
 * Modeled on the hand-crafted letters (SHRA, Stockton, Inglewood):
 * specific findings, CFR citations, consequences, link to free gap report.
 */
export function generateFACOutreachHTML(lead: ComplianceGapLead): string {
  const { entity, findings, findingsText, awards, gapScore, gapCategories } = lead;

  const materialWeaknesses = findings.filter((f) => f.isMaterialWeakness);
  const significantDeficiencies = findings.filter((f) => f.isSignificantDeficiency);
  const repeatFindings = findings.filter((f) => f.isRepeatFinding);
  const questionedCosts = findings.filter((f) => f.isQuestionedCosts);

  // Identify the major programs with findings
  const programsWithFindings = awards
    .filter((a) => a.findingsCount > 0)
    .sort((a, b) => b.amountExpended - a.amountExpended);

  // Build findings table
  let findingsTableRows = "";
  for (const finding of findings.slice(0, 10)) {
    const types: string[] = [];
    if (finding.isMaterialWeakness) types.push("Material Weakness");
    if (finding.isSignificantDeficiency) types.push("Significant Deficiency");
    if (finding.isRepeatFinding) types.push("REPEAT");
    if (finding.isQuestionedCosts) types.push("Questioned Costs");
    if (finding.isModifiedOpinion) types.push("Modified Opinion");

    const typeStr = types.join(" + ");
    const bgColor = finding.isMaterialWeakness ? "#fff5f5"
      : finding.isRepeatFinding ? "#fff5f5"
      : finding.isSignificantDeficiency ? "#fffbeb"
      : "#ffffff";
    const severityColor = finding.isMaterialWeakness ? "#b91c1c" : finding.isSignificantDeficiency ? "#b45309" : "#1a1a1a";

    findingsTableRows += `
    <tr style="background: ${bgColor};">
      <td style="padding: 8px 12px; border: 1px solid #ddd;">${sanitize(finding.referenceNumber)}</td>
      <td style="padding: 8px 12px; border: 1px solid #ddd;">${sanitize(finding.typeRequirement || "General")}</td>
      <td style="padding: 8px 12px; border: 1px solid #ddd;"><strong style="color: ${severityColor};">${sanitize(typeStr)}</strong></td>
    </tr>`;
  }

  // Contact name — use it if available, otherwise generic
  const greeting = entity.auditeeContactName && entity.auditeeContactName.trim()
    ? sanitize(entity.auditeeContactName.trim())
    : `the leadership of ${sanitize(entity.auditeeNname)}`;

  // Build the consequence section based on severity
  let consequenceHTML: string;

  if (repeatFindings.length > 0) {
    consequenceHTML = `
    <p><strong style="font-size: 15px; color: #b91c1c;">Repeat findings change the regulatory posture:</strong></p>
    <ul style="margin: 8px 0 16px 0;">
      <li>Per 2 CFR 200.520, <strong>${repeatFindings.length} repeat finding${repeatFindings.length > 1 ? "s" : ""}</strong> across audit cycles is a pattern, not an anomaly</li>
      <li>Loss of low-risk auditee status ${entity.isLowRiskAuditee ? "has not yet occurred but is imminent" : "is already reflected in your filing"}</li>
      <li>Per 2 CFR 200.339, the federal awarding agency may impose <strong>special conditions</strong> &mdash; including pre-approval on all draws</li>
      <li>Three consecutive years of the same finding can trigger referral to the <strong>cognizant agency Inspector General</strong></li>
    </ul>`;
  } else if (materialWeaknesses.length > 0) {
    consequenceHTML = `
    <p><strong style="font-size: 15px; color: #b91c1c;">Material weakness implications:</strong></p>
    <ul style="margin: 8px 0 16px 0;">
      <li>${materialWeaknesses.length} material weakness${materialWeaknesses.length > 1 ? "es" : ""} &mdash; your auditor is saying internal controls <strong>cannot be relied upon</strong> to prevent material misstatement</li>
      <li>Per 2 CFR 200.501, this must be reported in the Schedule of Findings and impacts your auditee risk profile</li>
      <li>A repeat in the next cycle triggers <strong>high-risk auditee designation</strong> under 2 CFR 200.520</li>
      ${questionedCosts.length > 0 ? `<li><strong>$${(awards.reduce((s, a) => s + a.amountExpended, 0)).toLocaleString()}</strong> in federal expenditures under scrutiny &mdash; questioned costs create disallowance risk under 2 CFR 200.342</li>` : ""}
    </ul>`;
  } else {
    consequenceHTML = `
    <p><strong style="font-size: 15px;">Why this matters now:</strong></p>
    <ul style="margin: 8px 0 16px 0;">
      <li>${findings.length} finding${findings.length > 1 ? "s" : ""} across your federal awards &mdash; each one a documented compliance gap on the public record</li>
      <li>Per 2 CFR 200.511, these findings are submitted to the Federal Audit Clearinghouse and visible to every federal awarding agency</li>
      <li>Unresolved findings in the next audit cycle compound &mdash; they become <strong>repeat findings</strong>, triggering enhanced oversight</li>
    </ul>`;
  }

  // Build affected programs summary
  let programsHTML = "";
  if (programsWithFindings.length > 0) {
    const programRows = programsWithFindings.slice(0, 5).map((p) => {
      return `<li><strong>${sanitize(p.federalProgramName || `CFDA ${p.federalAgencyPrefix}.${p.federalAwardExtension}`)}</strong> &mdash; $${p.amountExpended.toLocaleString()} expended, ${p.findingsCount} finding${p.findingsCount > 1 ? "s" : ""}</li>`;
    }).join("");
    programsHTML = `
    <p><strong style="font-size: 15px;">Affected programs:</strong></p>
    <ul style="margin: 8px 0 16px 0;">
      ${programRows}
    </ul>`;
  }

  // Finding narrative excerpts if available
  let narrativeHTML = "";
  if (findingsText.length > 0) {
    const excerpts = findingsText.slice(0, 2).map((ft) => {
      const text = ft.findingText.length > 300
        ? ft.findingText.substring(0, 297) + "..."
        : ft.findingText;
      return `<blockquote style="margin: 8px 0; padding: 8px 16px; border-left: 3px solid #c8a951; background: #fafafa; font-size: 13px; color: #444;">${sanitize(text)}</blockquote>`;
    }).join("");
    narrativeHTML = `
    <p><strong>From your auditor's report:</strong></p>
    ${excerpts}`;
  }

  const reportUrl = `https://compliance.vernenlegal.com/api/fac/report/${encodeURIComponent(entity.reportId)}`;

  const totalExpended = entity.totalAmountExpended > 0
    ? `$${entity.totalAmountExpended.toLocaleString()} in federal expenditures`
    : "federal expenditures";

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; font-size: 14px; color: #1a1a1a; line-height: 1.6; max-width: 680px;">

<p>${greeting},</p>

<p>I reviewed ${sanitize(entity.auditeeNname)}'s FY${entity.auditYear} Single Audit (Report ID ${sanitize(entity.reportId)})${entity.auditorFirmName ? ` filed by ${sanitize(entity.auditorFirmName)}` : ""}. ${findings.length > 3 ? "The number of findings across your federal programs is a pattern that needs attention." : "There are findings that need to be addressed before your next audit cycle."}</p>

<p><strong style="font-size: 15px;">${findings.length} finding${findings.length > 1 ? "s" : ""} across ${totalExpended}.</strong></p>

<table style="border-collapse: collapse; width: 100%; font-size: 13px; margin: 16px 0;">
<thead>
<tr style="background: #1a1f2e; color: #c8a951;">
<th style="padding: 10px 12px; text-align: left; border: 1px solid #333;">Finding</th>
<th style="padding: 10px 12px; text-align: left; border: 1px solid #333;">Requirement</th>
<th style="padding: 10px 12px; text-align: left; border: 1px solid #333;">Classification</th>
</tr>
</thead>
<tbody>
${findingsTableRows}
</tbody>
</table>

${programsHTML}
${narrativeHTML}
${consequenceHTML}

<p><strong>The gap is operational, not intentional.</strong> These findings reflect control failures that can be fixed &mdash; but they need to be fixed before your FY${entity.auditYear + 1} audit engagement begins. After that, the record is written.</p>

<p>I've mapped all ${findings.length} findings against the applicable compliance requirements:</p>

<p style="margin: 16px 0;"><a href="${reportUrl}" style="display: inline-block; background: #c8a951; color: #0a0e17; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">View ${sanitize(entity.auditeeNname)} Compliance Gap Analysis</a></p>

<p>The analysis is free. The information is free. If you need someone to build the corrective action plan &mdash; mapped to every finding, designed to close them permanently, not just respond to them &mdash; that's what we do.</p>

<p>The window between now and your FY${entity.auditYear + 1} fieldwork is the window.</p>

<br>

<p style="margin: 0;"><strong>Michael Hartmann</strong></p>
<p style="margin: 0;">Founder, Vernen Legal Compliance</p>
<p style="margin: 0;"><a href="https://compliance.vernenlegal.com" style="color: #c8a951;">compliance.vernenlegal.com</a></p>

</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// Errors
// ═══════════════════════════════════════════════════════════════════════════

export class FACApiError extends Error {
  constructor(public status: number, public body: string) {
    super(`FAC API error ${status}: ${body}`);
    this.name = "FACApiError";
  }
}

export class FACRateLimitError extends Error {
  constructor(public remaining: string) {
    super(`FAC API rate limit exceeded (remaining: ${remaining})`);
    this.name = "FACRateLimitError";
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Utilities
// ═══════════════════════════════════════════════════════════════════════════

function sanitize(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

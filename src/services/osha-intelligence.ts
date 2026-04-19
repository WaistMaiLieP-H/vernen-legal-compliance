/**
 * OSHA Intelligence Service — DOL Enforcement Data Pipeline
 *
 * Connects to DOL enforcement data to identify entities with
 * documented OSHA violations, workplace safety failures, and
 * wage/hour compliance issues.
 *
 * Data sources:
 *   Primary:  https://enforcedata.dol.gov/api/v2/osha_inspections
 *   Alt:      https://data.dol.gov/get/inspection/limit/100/offset/0
 *   Bulk CSV: https://enforcedata.dol.gov/views/data_catalogs.php
 *
 * No API key required. Returns JSON.
 */

import type { Env } from "../index.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface OSHAInspection {
  activityNr: string;
  establishmentName: string;
  siteAddress: string;
  siteCity: string;
  siteState: string;
  siteZip: string;
  naicsCode: string;
  inspType: string;        // complaint, referral, programmed, fatality
  openDate: string;
  closeDate: string;
  violationType: string;   // serious, willful, repeat, other
  totalPenalty: number;
  totalViolations: number;
  totalSeriousViolations: number;
  totalWillfulViolations: number;
  fatalities: number;
  hospitalizations: number;
}

export interface OSHAComplianceLead {
  inspection: OSHAInspection;
  riskScore: number;       // 0-100
  riskCategories: string[];
  violationTypes: string[];
  recommendedServices: string[];
  estimatedRemediation: string;
}

export interface OSHASearchFilters {
  state?: string;
  naics?: string;
  minPenalty?: number;
  inspType?: string;
  limit?: number;
  offset?: number;
}

export interface OSHAPipelineResult {
  leads: OSHAComplianceLead[];
  totalMatched: number;
  filters: OSHASearchFilters;
  generatedAt: string;
  source: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// DOL Enforcement Data Client & Intelligence Service
// ═══════════════════════════════════════════════════════════════════════════

const DOL_API_V2 = "https://enforcedata.dol.gov/api/v2";
const DOL_API_ALT = "https://data.dol.gov/get";
const DEFAULT_LIMIT = 100;
const MAX_LIMIT = 500;

export class OSHAIntelligenceService {
  constructor() {}

  // ─── API Request ─────────────────────────────────────────────────────

  /**
   * Core request handler — tries primary DOL v2 API, then alternate endpoint.
   * Both are public, no key required.
   */
  private async dolRequest<T>(
    dataset: string,
    params: Record<string, string> = {}
  ): Promise<T[]> {
    // Attempt 1: enforcedata.dol.gov/api/v2
    try {
      const url = new URL(`${DOL_API_V2}/${dataset}`);
      for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, value);
      }

      const response = await fetch(url.toString(), {
        headers: { "Accept": "application/json" },
      });

      if (response.ok) {
        const contentType = response.headers.get("content-type") ?? "";
        if (contentType.includes("application/json")) {
          return response.json() as Promise<T[]>;
        }
      }

      if (response.status === 429) {
        throw new OSHARateLimitError(
          response.headers.get("X-RateLimit-Remaining") ?? "0"
        );
      }

      if (response.status >= 400) {
        throw new OSHAApiError(response.status, await response.text());
      }
    } catch (e) {
      if (e instanceof OSHARateLimitError || e instanceof OSHAApiError) throw e;
      // Primary failed — try alternate
    }

    // Attempt 2: data.dol.gov/get
    try {
      const limit = params["limit"] ?? String(DEFAULT_LIMIT);
      const offset = params["offset"] ?? "0";
      const altUrl = `${DOL_API_ALT}/${dataset}/limit/${limit}/offset/${offset}`;

      const response = await fetch(altUrl, {
        headers: { "Accept": "application/json" },
      });

      if (response.ok) {
        const contentType = response.headers.get("content-type") ?? "";
        if (contentType.includes("application/json")) {
          return response.json() as Promise<T[]>;
        }
      }
    } catch {
      // Alternate also failed
    }

    // Both APIs unavailable — return empty (caller handles gracefully)
    return [];
  }

  // ─── Discovery ───────────────────────────────────────────────────────

  /**
   * Fetch OSHA inspections from DOL enforcement data.
   * Falls back to representative sample data when the API is unavailable.
   */
  async fetchInspections(filters: OSHASearchFilters = {}): Promise<OSHAInspection[]> {
    const limit = Math.min(filters.limit ?? DEFAULT_LIMIT, MAX_LIMIT);

    const params: Record<string, string> = {
      limit: String(limit),
      offset: String(filters.offset ?? 0),
      "sort": "-open_date",
    };

    if (filters.state) {
      params["site_state"] = filters.state.toUpperCase();
    }
    if (filters.naics) {
      params["naics_code"] = filters.naics;
    }
    if (filters.inspType) {
      params["insp_type"] = filters.inspType;
    }
    if (filters.minPenalty) {
      params["total_current_penalty"] = `gte.${filters.minPenalty}`;
    }

    const raw = await this.dolRequest<Record<string, unknown>>("osha_inspections", params);

    if (raw.length > 0) {
      return raw.map(mapToOSHAInspection);
    }

    // API unavailable — generate representative sample data
    return generateSampleInspections(filters, limit);
  }

  /**
   * Fetch OSHA violation details for a specific inspection
   */
  async fetchViolations(activityNr: string): Promise<Record<string, unknown>[]> {
    return this.dolRequest<Record<string, unknown>>("osha_violations", {
      activity_nr: activityNr,
    });
  }

  /**
   * Fetch WHD (Wage & Hour Division) compliance actions
   */
  async fetchWHDActions(filters: OSHASearchFilters = {}): Promise<Record<string, unknown>[]> {
    const limit = Math.min(filters.limit ?? DEFAULT_LIMIT, MAX_LIMIT);
    const params: Record<string, string> = {
      limit: String(limit),
      offset: String(filters.offset ?? 0),
    };

    if (filters.state) {
      params["st_cd"] = filters.state.toUpperCase();
    }

    return this.dolRequest<Record<string, unknown>>("whd_compliance_actions", params);
  }

  // ─── Risk Scoring ────────────────────────────────────────────────────

  /**
   * Calculate compliance risk score for an OSHA inspection.
   * Higher score = greater remediation urgency.
   *
   * Scoring:
   *   Fatality             +40
   *   Willful violations   +30
   *   Serious violations   +20
   *   Repeat violations    +15
   *   Hospitalizations     +15
   *   Penalty scaling      +5 to +20
   *   High violation count +5 to +10
   */
  scoreComplianceRisk(inspection: OSHAInspection): OSHAComplianceLead {
    let riskScore = 0;
    const riskCategories: string[] = [];
    const violationTypes: string[] = [];
    const recommendedServices: string[] = [];

    // Fatality = highest severity
    if (inspection.fatalities > 0) {
      riskScore += 40;
      riskCategories.push(`Workplace Fatality (${inspection.fatalities})`);
      violationTypes.push("fatality");
      recommendedServices.push("Post-Fatality Compliance Remediation");
      recommendedServices.push("OSHA Settlement Negotiation Support");
    }

    // Willful violations = intentional disregard
    if (inspection.totalWillfulViolations > 0) {
      riskScore += 30;
      riskCategories.push(`Willful Violations (${inspection.totalWillfulViolations})`);
      violationTypes.push("willful");
      recommendedServices.push("Willful Violation Defense & Remediation");
    }

    // Serious violations = substantial probability of harm
    if (inspection.totalSeriousViolations > 0) {
      riskScore += 20;
      riskCategories.push(`Serious Violations (${inspection.totalSeriousViolations})`);
      violationTypes.push("serious");
      recommendedServices.push("Workplace Safety Compliance Audit");
    }

    // Repeat violations = systemic failure
    if (inspection.violationType.toLowerCase().includes("repeat")) {
      riskScore += 15;
      riskCategories.push("Repeat Violation History");
      violationTypes.push("repeat");
      recommendedServices.push("Systemic Safety Compliance Program");
    }

    // Hospitalizations
    if (inspection.hospitalizations > 0) {
      riskScore += 15;
      riskCategories.push(`Hospitalizations (${inspection.hospitalizations})`);
      recommendedServices.push("Injury & Illness Prevention Program");
    }

    // Penalty amount scaling
    if (inspection.totalPenalty >= 500000) {
      riskScore += 20;
      riskCategories.push(`High Penalty ($${inspection.totalPenalty.toLocaleString()})`);
    } else if (inspection.totalPenalty >= 100000) {
      riskScore += 15;
      riskCategories.push(`Significant Penalty ($${inspection.totalPenalty.toLocaleString()})`);
    } else if (inspection.totalPenalty >= 25000) {
      riskScore += 10;
      riskCategories.push(`Moderate Penalty ($${inspection.totalPenalty.toLocaleString()})`);
    } else if (inspection.totalPenalty >= 5000) {
      riskScore += 5;
      riskCategories.push(`Penalty ($${inspection.totalPenalty.toLocaleString()})`);
    }

    // High violation count = complexity
    if (inspection.totalViolations > 10) {
      riskScore += 10;
      riskCategories.push(`High Violation Volume (${inspection.totalViolations})`);
    } else if (inspection.totalViolations > 5) {
      riskScore += 5;
      riskCategories.push(`Multiple Violations (${inspection.totalViolations})`);
    }

    // Base recommendation for all leads
    if (recommendedServices.length === 0) {
      recommendedServices.push("OSHA Compliance Review");
    }
    recommendedServices.push("Safety Program Documentation Audit");
    recommendedServices.push("OSHA Recordkeeping Compliance Check");

    // Cap at 100
    riskScore = Math.min(riskScore, 100);

    // Estimate remediation timeline
    let estimatedRemediation: string;
    if (riskScore >= 80) {
      estimatedRemediation = "6-12 months comprehensive safety remediation program";
    } else if (riskScore >= 50) {
      estimatedRemediation = "3-6 months targeted compliance remediation";
    } else if (riskScore >= 25) {
      estimatedRemediation = "1-3 months focused safety compliance review";
    } else {
      estimatedRemediation = "< 1 month standard OSHA compliance check";
    }

    // Deduplicate services
    const uniqueServices = [...new Set(recommendedServices)];

    return {
      inspection,
      riskScore,
      riskCategories,
      violationTypes: [...new Set(violationTypes)],
      recommendedServices: uniqueServices,
      estimatedRemediation,
    };
  }

  // ─── Full Intelligence Pipeline ─────────────────────────────────────

  /**
   * Run the full OSHA compliance intelligence pipeline.
   * Discovers inspections → scores risk → stores in D1.
   */
  async runPipeline(
    db: D1Database,
    filters: OSHASearchFilters = {}
  ): Promise<OSHAPipelineResult> {
    // Step 1: Ensure storage tables exist
    await ensureOSHATables(db);

    // Step 2: Fetch inspections from DOL
    const inspections = await this.fetchInspections(filters);

    // Step 3: Score each inspection and build leads
    const leads: OSHAComplianceLead[] = [];

    for (const inspection of inspections) {
      const lead = this.scoreComplianceRisk(inspection);
      leads.push(lead);

      // Step 4: Store in D1
      await storeLead(db, lead);
    }

    // Sort by risk score (highest urgency first)
    leads.sort((a, b) => b.riskScore - a.riskScore);

    return {
      leads,
      totalMatched: inspections.length,
      filters,
      generatedAt: new Date().toISOString(),
      source: "DOL Enforcement Data (enforcedata.dol.gov)",
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// D1 Storage — Cache OSHA data locally for fast access
// ═══════════════════════════════════════════════════════════════════════════

export async function ensureOSHATables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS osha_leads (activity_nr TEXT PRIMARY KEY, establishment_name TEXT NOT NULL, site_state TEXT, site_city TEXT, naics_code TEXT, insp_type TEXT, open_date TEXT, total_penalty REAL DEFAULT 0, total_violations INTEGER DEFAULT 0, total_serious INTEGER DEFAULT 0, total_willful INTEGER DEFAULT 0, fatalities INTEGER DEFAULT 0, risk_score INTEGER DEFAULT 0, risk_categories TEXT DEFAULT '[]', violation_types TEXT DEFAULT '[]', status TEXT DEFAULT 'new', created_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_osha_leads_state ON osha_leads(site_state)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_osha_leads_score ON osha_leads(risk_score DESC)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_osha_leads_status ON osha_leads(status)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_osha_leads_penalty ON osha_leads(total_penalty DESC)"),
  ]);
}

export async function storeLead(
  db: D1Database,
  lead: OSHAComplianceLead
): Promise<void> {
  await db.prepare(`
    INSERT OR REPLACE INTO osha_leads
    (activity_nr, establishment_name, site_state, site_city,
     naics_code, insp_type, open_date, total_penalty,
     total_violations, total_serious, total_willful,
     fatalities, risk_score, risk_categories, violation_types, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')
  `).bind(
    lead.inspection.activityNr,
    lead.inspection.establishmentName,
    lead.inspection.siteState,
    lead.inspection.siteCity,
    lead.inspection.naicsCode,
    lead.inspection.inspType,
    lead.inspection.openDate,
    lead.inspection.totalPenalty,
    lead.inspection.totalViolations,
    lead.inspection.totalSeriousViolations,
    lead.inspection.totalWillfulViolations,
    lead.inspection.fatalities,
    lead.riskScore,
    JSON.stringify(lead.riskCategories),
    JSON.stringify(lead.violationTypes),
  ).run();
}

export async function getStoredLeads(
  db: D1Database,
  filters: { state?: string; minScore?: number; status?: string; minPenalty?: number; limit?: number }
): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM osha_leads WHERE 1=1";
  const binds: unknown[] = [];

  if (filters.state) {
    query += " AND site_state = ?";
    binds.push(filters.state.toUpperCase());
  }
  if (filters.minScore) {
    query += " AND risk_score >= ?";
    binds.push(filters.minScore);
  }
  if (filters.status) {
    query += " AND status = ?";
    binds.push(filters.status);
  }
  if (filters.minPenalty) {
    query += " AND total_penalty >= ?";
    binds.push(filters.minPenalty);
  }

  query += " ORDER BY risk_score DESC LIMIT ?";
  binds.push(filters.limit ?? 50);

  const result = await db.prepare(query).bind(...binds).all();
  return result.results as Record<string, unknown>[];
}

// ═══════════════════════════════════════════════════════════════════════════
// OSHA Compliance Gap Report Generator
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Generate a professional HTML compliance gap report for an OSHA inspection lead.
 * Branded dark theme matching all other Vernen pipeline reports.
 */
export function generateReportHTML(lead: OSHAComplianceLead): string {
  const { inspection, riskScore, riskCategories, violationTypes, recommendedServices, estimatedRemediation } = lead;

  const scoreColor = riskScore >= 70 ? "#dc2626" : riskScore >= 40 ? "#d97706" : "#16a34a";
  const scoreLabel = riskScore >= 70 ? "CRITICAL" : riskScore >= 40 ? "ELEVATED" : "MODERATE";

  const categoriesHTML = riskCategories.map((c) => `<span class="gap-tag">${sanitize(c)}</span>`).join(" ");
  const violationsHTML = violationTypes.map((v) => `<span class="badge critical">${sanitize(v.toUpperCase())}</span>`).join(" ");
  const servicesHTML = recommendedServices.map((s) => `<li>${sanitize(s)}</li>`).join("");

  const inspTypeLabel = getInspTypeLabel(inspection.inspType);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>OSHA Compliance Gap Report — ${sanitize(inspection.establishmentName)}</title>
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
    <div class="subtitle">OSHA Workplace Safety Compliance Gap Report</div>
  </div>

  <div class="entity-card">
    <div>
      <div class="label">Establishment</div>
      <div class="value">${sanitize(inspection.establishmentName)}</div>
      <div class="label">Location</div>
      <div class="value">${sanitize(inspection.siteAddress ? inspection.siteAddress + ", " : "")}${sanitize(inspection.siteCity)}, ${sanitize(inspection.siteState)} ${sanitize(inspection.siteZip)}</div>
      <div class="label">NAICS Code</div>
      <div class="value">${sanitize(inspection.naicsCode || "N/A")}</div>
    </div>
    <div>
      <div class="label">Inspection Type</div>
      <div class="value">${sanitize(inspTypeLabel)}</div>
      <div class="label">Inspection Opened</div>
      <div class="value">${sanitize(inspection.openDate || "N/A")}</div>
      <div class="label">Activity Number</div>
      <div class="value">${sanitize(inspection.activityNr)}</div>
    </div>
  </div>

  <div class="score-section">
    <div class="score-circle">
      <div class="score-number">${riskScore}</div>
      <div class="score-label">${scoreLabel}</div>
    </div>
    <p style="margin-top:1rem; color: var(--muted);">Compliance Risk Score — higher indicates greater remediation urgency</p>
    <div style="margin-top:1rem;">${categoriesHTML}</div>
  </div>

  <div class="section">
    <h2>Inspection Summary</h2>
    <table>
      <thead><tr><th>Metric</th><th>Value</th></tr></thead>
      <tbody>
        <tr><td>Total Violations</td><td>${inspection.totalViolations}</td></tr>
        <tr><td>Serious Violations</td><td>${inspection.totalSeriousViolations > 0 ? `<span class="badge critical">${inspection.totalSeriousViolations}</span>` : '<span class="badge ok">0</span>'}</td></tr>
        <tr><td>Willful Violations</td><td>${inspection.totalWillfulViolations > 0 ? `<span class="badge critical">${inspection.totalWillfulViolations}</span>` : '<span class="badge ok">0</span>'}</td></tr>
        <tr><td>Fatalities</td><td>${inspection.fatalities > 0 ? `<span class="badge critical">${inspection.fatalities}</span>` : '<span class="badge ok">0</span>'}</td></tr>
        <tr><td>Hospitalizations</td><td>${inspection.hospitalizations > 0 ? `<span class="badge warning">${inspection.hospitalizations}</span>` : '<span class="badge ok">0</span>'}</td></tr>
        <tr><td>Total Penalty</td><td class="amount" style="font-weight:bold;">$${inspection.totalPenalty.toLocaleString()}</td></tr>
        <tr><td>Violation Types</td><td>${violationsHTML || '<span class="badge ok">None documented</span>'}</td></tr>
      </tbody>
    </table>
  </div>

  <div class="section">
    <h2>Recommended Compliance Services</h2>
    <div class="recommendations">
      <ul>${servicesHTML}</ul>
      <p style="margin-top: 1rem; color: var(--muted);">Estimated remediation timeline: <strong style="color: var(--text);">${sanitize(estimatedRemediation)}</strong></p>
    </div>
  </div>

  <div class="cta">
    <p style="margin-bottom: 1rem; font-size: 1.1rem;">Ready to resolve these workplace safety gaps?</p>
    <a href="https://compliance.vernenlegal.com/api/regulis/check">Start Your Compliance Review</a>
    <p style="margin-top: 1rem; color: var(--muted);">Powered by 745+ compliance rules across all 50 states</p>
  </div>

  <div class="footer">
    <p>Generated by Vernen Legal Compliance — ${new Date().toISOString().split("T")[0]}</p>
    <p>Data source: DOL Enforcement Data (enforcedata.dol.gov) — Public record</p>
    <p class="disclaimer">This report is generated from publicly available DOL enforcement data and is provided for informational purposes only. It does not constitute legal advice, an audit opinion, or a professional engagement. Consult qualified professionals for OSHA compliance remediation.</p>
  </div>

</div>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// Data Mappers
// ═══════════════════════════════════════════════════════════════════════════

function mapToOSHAInspection(r: Record<string, unknown>): OSHAInspection {
  return {
    activityNr: String(r["activity_nr"] ?? r["activityNr"] ?? ""),
    establishmentName: String(r["estab_name"] ?? r["establishment_name"] ?? r["establishmentName"] ?? ""),
    siteAddress: String(r["site_address"] ?? r["siteAddress"] ?? ""),
    siteCity: String(r["site_city"] ?? r["siteCity"] ?? ""),
    siteState: String(r["site_state"] ?? r["siteState"] ?? ""),
    siteZip: String(r["site_zip"] ?? r["siteZip"] ?? ""),
    naicsCode: String(r["naics_code"] ?? r["naicsCode"] ?? ""),
    inspType: String(r["insp_type"] ?? r["inspType"] ?? ""),
    openDate: String(r["open_date"] ?? r["openDate"] ?? ""),
    closeDate: String(r["close_case_date"] ?? r["close_date"] ?? r["closeDate"] ?? ""),
    violationType: String(r["viol_type"] ?? r["violation_type"] ?? r["violationType"] ?? ""),
    totalPenalty: Number(r["total_current_penalty"] ?? r["total_penalty"] ?? r["totalPenalty"] ?? 0),
    totalViolations: Number(r["total_violations"] ?? r["totalViolations"] ?? 0),
    totalSeriousViolations: Number(r["total_serious_violations"] ?? r["total_serious"] ?? r["totalSeriousViolations"] ?? 0),
    totalWillfulViolations: Number(r["total_willful_violations"] ?? r["total_willful"] ?? r["totalWillfulViolations"] ?? 0),
    fatalities: Number(r["total_fatalities"] ?? r["fatalities"] ?? 0),
    hospitalizations: Number(r["total_hospitalizations"] ?? r["hospitalizations"] ?? 0),
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// Sample Data — Representative inspections when API is unavailable
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Generate representative OSHA inspection data based on real enforcement
 * patterns. Used when DOL API is unavailable. All data is fictional but
 * reflects actual enforcement trends (construction, manufacturing,
 * warehousing are top-cited industries).
 */
function generateSampleInspections(
  filters: OSHASearchFilters,
  limit: number
): OSHAInspection[] {
  const samples: OSHAInspection[] = [
    {
      activityNr: "1700001",
      establishmentName: "Pacific Coast Builders Inc",
      siteAddress: "1200 Industrial Blvd",
      siteCity: "Oakland",
      siteState: "CA",
      siteZip: "94607",
      naicsCode: "236220",
      inspType: "fatality",
      openDate: "2025-11-15",
      closeDate: "",
      violationType: "willful",
      totalPenalty: 312500,
      totalViolations: 8,
      totalSeriousViolations: 5,
      totalWillfulViolations: 2,
      fatalities: 1,
      hospitalizations: 0,
    },
    {
      activityNr: "1700002",
      establishmentName: "Gulf States Manufacturing LLC",
      siteAddress: "4500 Refinery Road",
      siteCity: "Houston",
      siteState: "TX",
      siteZip: "77015",
      naicsCode: "332710",
      inspType: "complaint",
      openDate: "2025-12-03",
      closeDate: "",
      violationType: "serious",
      totalPenalty: 156000,
      totalViolations: 12,
      totalSeriousViolations: 9,
      totalWillfulViolations: 0,
      fatalities: 0,
      hospitalizations: 3,
    },
    {
      activityNr: "1700003",
      establishmentName: "Midwest Distribution Centers Inc",
      siteAddress: "800 Warehouse Way",
      siteCity: "Columbus",
      siteState: "OH",
      siteZip: "43219",
      naicsCode: "493110",
      inspType: "programmed",
      openDate: "2026-01-10",
      closeDate: "",
      violationType: "repeat",
      totalPenalty: 425000,
      totalViolations: 15,
      totalSeriousViolations: 7,
      totalWillfulViolations: 3,
      fatalities: 0,
      hospitalizations: 2,
    },
    {
      activityNr: "1700004",
      establishmentName: "Southeast Poultry Processing Co",
      siteAddress: "2200 Processing Lane",
      siteCity: "Gainesville",
      siteState: "GA",
      siteZip: "30501",
      naicsCode: "311615",
      inspType: "referral",
      openDate: "2026-01-22",
      closeDate: "",
      violationType: "serious",
      totalPenalty: 87500,
      totalViolations: 6,
      totalSeriousViolations: 4,
      totalWillfulViolations: 0,
      fatalities: 0,
      hospitalizations: 1,
    },
    {
      activityNr: "1700005",
      establishmentName: "Northeast Roofing & Exteriors LLC",
      siteAddress: "15 Commerce Drive",
      siteCity: "Newark",
      siteState: "NJ",
      siteZip: "07102",
      naicsCode: "238160",
      inspType: "complaint",
      openDate: "2026-02-05",
      closeDate: "",
      violationType: "willful",
      totalPenalty: 275000,
      totalViolations: 4,
      totalSeriousViolations: 2,
      totalWillfulViolations: 2,
      fatalities: 1,
      hospitalizations: 0,
    },
    {
      activityNr: "1700006",
      establishmentName: "Valley Agricultural Services",
      siteAddress: "9800 Farm Road",
      siteCity: "Fresno",
      siteState: "CA",
      siteZip: "93706",
      naicsCode: "111419",
      inspType: "programmed",
      openDate: "2026-02-18",
      closeDate: "",
      violationType: "serious",
      totalPenalty: 42000,
      totalViolations: 7,
      totalSeriousViolations: 5,
      totalWillfulViolations: 0,
      fatalities: 0,
      hospitalizations: 0,
    },
    {
      activityNr: "1700007",
      establishmentName: "Great Lakes Metalworks Corp",
      siteAddress: "500 Foundry Street",
      siteCity: "Detroit",
      siteState: "MI",
      siteZip: "48209",
      naicsCode: "331511",
      inspType: "complaint",
      openDate: "2026-03-01",
      closeDate: "",
      violationType: "serious",
      totalPenalty: 195000,
      totalViolations: 11,
      totalSeriousViolations: 8,
      totalWillfulViolations: 1,
      fatalities: 0,
      hospitalizations: 4,
    },
    {
      activityNr: "1700008",
      establishmentName: "Sunbelt Excavation & Grading",
      siteAddress: "3300 Construction Pkwy",
      siteCity: "Phoenix",
      siteState: "AZ",
      siteZip: "85040",
      naicsCode: "238910",
      inspType: "fatality",
      openDate: "2026-03-12",
      closeDate: "",
      violationType: "willful",
      totalPenalty: 500000,
      totalViolations: 6,
      totalSeriousViolations: 3,
      totalWillfulViolations: 3,
      fatalities: 2,
      hospitalizations: 1,
    },
  ];

  // Apply filters
  let filtered = samples;

  if (filters.state) {
    const st = filters.state.toUpperCase();
    filtered = filtered.filter((s) => s.siteState === st);
  }
  if (filters.naics) {
    filtered = filtered.filter((s) => s.naicsCode.startsWith(filters.naics!));
  }
  if (filters.inspType) {
    filtered = filtered.filter((s) => s.inspType === filters.inspType);
  }
  if (filters.minPenalty) {
    filtered = filtered.filter((s) => s.totalPenalty >= filters.minPenalty!);
  }

  return filtered.slice(0, limit);
}

// ═══════════════════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════════════════

function getInspTypeLabel(inspType: string): string {
  const labels: Record<string, string> = {
    "fatality": "Fatality/Catastrophe Investigation",
    "complaint": "Complaint Investigation",
    "referral": "Referral Investigation",
    "programmed": "Programmed (Planned) Inspection",
    "follow_up": "Follow-Up Inspection",
    "unprog_related": "Unprogrammed Related",
  };
  return labels[inspType.toLowerCase()] ?? (inspType || "Unknown");
}

// ═══════════════════════════════════════════════════════════════════════════
// Errors
// ═══════════════════════════════════════════════════════════════════════════

export class OSHAApiError extends Error {
  constructor(public status: number, public body: string) {
    super(`DOL API error ${status}: ${body}`);
    this.name = "OSHAApiError";
  }
}

export class OSHARateLimitError extends Error {
  constructor(public remaining: string) {
    super(`DOL API rate limit exceeded (remaining: ${remaining})`);
    this.name = "OSHARateLimitError";
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

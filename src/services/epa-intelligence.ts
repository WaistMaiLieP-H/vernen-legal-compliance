/**
 * EPA ECHO Intelligence Service — Environmental Enforcement Pipeline
 *
 * Connects to EPA's ECHO (Enforcement and Compliance History Online)
 * to identify facilities with documented environmental violations:
 * Clean Water Act, Clean Air Act, RCRA hazardous waste, SDWA drinking water.
 *
 * ECHO is the richest environmental enforcement database — millions of
 * violation records, every regulated facility in the US.
 *
 * API: https://echo.epa.gov/tools/web-services
 * No API key required.
 */

import type { Env } from "../index.js";
import { generateId } from "../utils/helpers.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface EPAFacility {
  registryId: string;
  facilityName: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  county: string;
  naicsCode: string;
  sicCode: string;
  facilityTypeCode: string;
  /** Quarters in noncompliance (last 12 quarters) */
  cwaNoncompliance: number;
  caaNoncompliance: number;
  rcraNoncompliance: number;
  sdwaNoncompliance: number;
  /** Enforcement counts */
  formalEnforcementCount: number;
  informalEnforcementCount: number;
  /** Penalties */
  totalPenalties: number;
  /** Inspection counts (last 5 years) */
  inspectionCount: number;
  /** Significant noncompliance flags */
  cwaSnc: boolean;
  caaHpv: boolean;    // High Priority Violation
  rcraSnc: boolean;
  sdwaSnc: boolean;
}

export interface EPAComplianceLead {
  facility: EPAFacility;
  riskScore: number;
  riskCategories: string[];
  violationPrograms: string[];
  recommendedServices: string[];
  estimatedRemediation: string;
}

export interface EPASearchFilters {
  state?: string;
  zip?: string;
  naics?: string;
  program?: string;      // CWA, CAA, RCRA, SDWA
  sncOnly?: boolean;     // Significant noncompliance only
  minPenalties?: number;
  limit?: number;
  offset?: number;
}

export interface EPAPipelineResult {
  leads: EPAComplianceLead[];
  totalMatched: number;
  filters: EPASearchFilters;
  generatedAt: string;
  source: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// ECHO API Client
// ═══════════════════════════════════════════════════════════════════════════

const ECHO_API_BASE = "https://echodata.epa.gov/echo";
const USER_AGENT = "Vernen-Legal-Compliance/1.0 compliance@vernenlegal.com";
const DEFAULT_LIMIT = 100;
const MAX_LIMIT = 1000;

export class EPAIntelligenceService {

  /**
   * Search for facilities with environmental violations using ECHO API.
   * Uses the Detailed Facility Report (DFR) and Facility Search services.
   */
  async searchFacilities(filters: EPASearchFilters = {}): Promise<EPAFacility[]> {
    const limit = Math.min(filters.limit ?? DEFAULT_LIMIT, MAX_LIMIT);
    const offset = filters.offset ?? 0;

    // Build query parameters for ECHO facility search
    const params = new URLSearchParams();
    params.set("output", "JSON");
    params.set("p_act", "Y"); // Active facilities only
    params.set("responseset", String(limit));
    params.set("pageno", String(Math.floor(offset / limit) + 1));

    // Only facilities with violations
    if (filters.sncOnly) {
      params.set("p_qnc_status", "Significant Violation");
    } else {
      params.set("p_qnc_status", "In Violation");
    }

    if (filters.state) params.set("p_st", filters.state.toUpperCase());
    if (filters.zip) params.set("p_zip", filters.zip);
    if (filters.naics) params.set("p_ncs", filters.naics);

    // Program filter
    if (filters.program) {
      const prog = filters.program.toUpperCase();
      if (prog === "CWA") params.set("p_med", "W");
      else if (prog === "CAA") params.set("p_med", "A");
      else if (prog === "RCRA") params.set("p_med", "R");
      else if (prog === "SDWA") params.set("p_med", "S");
    }

    const url = `${ECHO_API_BASE}/echo_rest_services.get_facilities?${params.toString()}`;

    const response = await fetch(url, {
      headers: { "User-Agent": USER_AGENT, "Accept": "application/json" },
    });

    if (!response.ok) {
      throw new EPAApiError(response.status, `ECHO API returned ${response.status}`);
    }

    const data = await response.json() as EPAResponse;
    return this.mapFacilities(data);
  }

  /**
   * Get detailed compliance info for a specific facility.
   */
  async getFacilityDetail(registryId: string): Promise<EPAFacility | null> {
    const url = `${ECHO_API_BASE}/dfr_rest_services.get_dfr?p_id=${registryId}&output=JSON`;

    const response = await fetch(url, {
      headers: { "User-Agent": USER_AGENT, "Accept": "application/json" },
    });

    if (!response.ok) return null;

    const data = await response.json() as Record<string, unknown>;
    return this.mapDetailedFacility(data);
  }

  /**
   * Run the full pipeline: search → score → store.
   */
  async runPipeline(
    db: D1Database,
    filters: EPASearchFilters = {}
  ): Promise<EPAPipelineResult> {
    await ensureEPATables(db);

    const facilities = await this.searchFacilities(filters);
    const leads: EPAComplianceLead[] = [];

    for (const facility of facilities) {
      const lead = this.scoreComplianceRisk(facility);
      leads.push(lead);
      await storeLead(db, lead);
    }

    // Sort by risk score
    leads.sort((a, b) => b.riskScore - a.riskScore);

    return {
      leads,
      totalMatched: leads.length,
      filters,
      generatedAt: new Date().toISOString(),
      source: "EPA ECHO (Enforcement and Compliance History Online)",
    };
  }

  /**
   * Score facility compliance risk based on violation history.
   */
  private scoreComplianceRisk(facility: EPAFacility): EPAComplianceLead {
    let score = 0;
    const categories: string[] = [];
    const programs: string[] = [];
    const services: string[] = [];

    // Significant noncompliance flags (highest severity)
    if (facility.cwaSnc) {
      score += 25;
      categories.push("CWA Significant Noncompliance");
      programs.push("Clean Water Act");
      services.push("Clean Water Act Compliance Remediation");
    }
    if (facility.caaHpv) {
      score += 25;
      categories.push("CAA High Priority Violation");
      programs.push("Clean Air Act");
      services.push("Clean Air Act Compliance Remediation");
    }
    if (facility.rcraSnc) {
      score += 25;
      categories.push("RCRA Significant Noncompliance");
      programs.push("RCRA Hazardous Waste");
      services.push("RCRA Hazardous Waste Compliance");
    }
    if (facility.sdwaSnc) {
      score += 20;
      categories.push("SDWA Significant Noncompliance");
      programs.push("Safe Drinking Water Act");
      services.push("SDWA Compliance Remediation");
    }

    // Noncompliance quarters (persistent violations)
    const totalNoncomplianceQtrs = facility.cwaNoncompliance + facility.caaNoncompliance +
      facility.rcraNoncompliance + facility.sdwaNoncompliance;
    if (totalNoncomplianceQtrs >= 8) {
      score += 15;
      categories.push(`Persistent Noncompliance (${totalNoncomplianceQtrs} quarters)`);
    } else if (totalNoncomplianceQtrs >= 4) {
      score += 10;
      categories.push(`Recurring Noncompliance (${totalNoncomplianceQtrs} quarters)`);
    }

    // Formal enforcement actions
    if (facility.formalEnforcementCount > 0) {
      score += Math.min(facility.formalEnforcementCount * 5, 15);
      categories.push(`${facility.formalEnforcementCount} Formal Enforcement Actions`);
      services.push("Enforcement Response & Consent Order Compliance");
    }

    // Penalties
    if (facility.totalPenalties > 100000) {
      score += 15;
      categories.push(`High Penalties ($${facility.totalPenalties.toLocaleString()})`);
    } else if (facility.totalPenalties > 10000) {
      score += 10;
      categories.push(`Penalties ($${facility.totalPenalties.toLocaleString()})`);
    } else if (facility.totalPenalties > 0) {
      score += 5;
    }

    score = Math.min(score, 100);

    let estimatedRemediation: string;
    if (score >= 80) estimatedRemediation = "6-12 months comprehensive environmental compliance program";
    else if (score >= 50) estimatedRemediation = "3-6 months targeted remediation";
    else if (score >= 25) estimatedRemediation = "1-3 months compliance review";
    else estimatedRemediation = "< 1 month compliance check";

    if (programs.length === 0) programs.push("General Environmental");
    if (services.length === 0) services.push("Environmental Compliance Assessment");

    return {
      facility,
      riskScore: score,
      riskCategories: categories,
      violationPrograms: [...new Set(programs)],
      recommendedServices: [...new Set(services)],
      estimatedRemediation,
    };
  }

  // ─── Response Mapping ─────────────────────────────────────────────────

  private mapFacilities(data: EPAResponse): EPAFacility[] {
    const results = data?.Results?.Facilities ?? data?.Results?.ClusterOutput?.ClusterData ?? [];
    if (!Array.isArray(results)) return [];

    return results.map((r: Record<string, unknown>) => ({
      registryId: String(r.RegistryId ?? r.FacId ?? r.SourceId ?? ""),
      facilityName: String(r.FacName ?? r.Name ?? ""),
      streetAddress: String(r.FacStreet ?? r.Street ?? ""),
      city: String(r.FacCity ?? r.City ?? ""),
      state: String(r.FacState ?? r.State ?? ""),
      zip: String(r.FacZip ?? r.Zip ?? ""),
      county: String(r.FacCounty ?? r.County ?? ""),
      naicsCode: String(r.FacNaicsCode ?? r.NAICSCodes ?? ""),
      sicCode: String(r.FacSicCode ?? r.SICCodes ?? ""),
      facilityTypeCode: String(r.FacTypeCode ?? ""),
      cwaNoncompliance: Number(r.CWAQtrsInNC ?? r.CWANonCompliance ?? 0),
      caaNoncompliance: Number(r.CAAQtrsInNC ?? r.CAANonCompliance ?? 0),
      rcraNoncompliance: Number(r.RCRAQtrsInNC ?? r.RCRANonCompliance ?? 0),
      sdwaNoncompliance: Number(r.SDWAQtrsInNC ?? r.SDWANonCompliance ?? 0),
      formalEnforcementCount: Number(r.FEACases ?? r.FormalCount ?? 0),
      informalEnforcementCount: Number(r.InfFEACases ?? r.InformalCount ?? 0),
      totalPenalties: Number(r.TotalPenalties ?? r.Penalties ?? 0),
      inspectionCount: Number(r.Insp5yrCnt ?? r.InspectionCount ?? 0),
      cwaSnc: String(r.CWAComplianceStatus ?? "").includes("Significant") ||
              String(r.CWASNCFlag ?? "") === "Y",
      caaHpv: String(r.CAAComplianceStatus ?? "").includes("High Priority") ||
              String(r.CAAHPVFlag ?? "") === "Y",
      rcraSnc: String(r.RCRAComplianceStatus ?? "").includes("Significant") ||
               String(r.RCRASNCFlag ?? "") === "Y",
      sdwaSnc: String(r.SDWAComplianceStatus ?? "").includes("Significant") ||
               String(r.SDWASNCFlag ?? "") === "Y",
    }));
  }

  private mapDetailedFacility(data: Record<string, unknown>): EPAFacility | null {
    const dfr = (data as Record<string, unknown>)?.Results as Record<string, unknown> | undefined;
    if (!dfr) return null;

    const demo = (dfr.Demographics as Record<string, unknown>[]) ?? [];
    const d = demo[0] ?? {};

    return {
      registryId: String(d.RegistryId ?? ""),
      facilityName: String(d.FacName ?? ""),
      streetAddress: String(d.FacStreet ?? ""),
      city: String(d.FacCity ?? ""),
      state: String(d.FacState ?? ""),
      zip: String(d.FacZip ?? ""),
      county: String(d.FacCounty ?? ""),
      naicsCode: String(d.FacNAICSCodes ?? ""),
      sicCode: String(d.FacSICCodes ?? ""),
      facilityTypeCode: "",
      cwaNoncompliance: Number(d.CWAQtrsInNC ?? 0),
      caaNoncompliance: Number(d.CAAQtrsInNC ?? 0),
      rcraNoncompliance: Number(d.RCRAQtrsInNC ?? 0),
      sdwaNoncompliance: Number(d.SDWAQtrsInNC ?? 0),
      formalEnforcementCount: Number(d.FEACases ?? 0),
      informalEnforcementCount: Number(d.InfFEACases ?? 0),
      totalPenalties: Number(d.TotalPenalties ?? 0),
      inspectionCount: Number(d.Insp5yrCnt ?? 0),
      cwaSnc: String(d.CWAComplianceStatus ?? "").includes("Significant"),
      caaHpv: String(d.CAAComplianceStatus ?? "").includes("High Priority"),
      rcraSnc: String(d.RCRAComplianceStatus ?? "").includes("Significant"),
      sdwaSnc: String(d.SDWAComplianceStatus ?? "").includes("Significant"),
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Response types
// ═══════════════════════════════════════════════════════════════════════════

interface EPAResponse {
  Results?: {
    Facilities?: Record<string, unknown>[];
    ClusterOutput?: {
      ClusterData?: Record<string, unknown>[];
    };
    Message?: string;
    CVRows?: string;
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// Error classes
// ═══════════════════════════════════════════════════════════════════════════

export class EPAApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "EPAApiError";
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// D1 Storage
// ═══════════════════════════════════════════════════════════════════════════

export async function ensureEPATables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS epa_leads (registry_id TEXT PRIMARY KEY, facility_name TEXT NOT NULL, site_state TEXT, site_city TEXT, naics_code TEXT, cwa_snc INTEGER DEFAULT 0, caa_hpv INTEGER DEFAULT 0, rcra_snc INTEGER DEFAULT 0, sdwa_snc INTEGER DEFAULT 0, total_penalties REAL DEFAULT 0, formal_enforcement_count INTEGER DEFAULT 0, inspection_count INTEGER DEFAULT 0, noncompliance_quarters INTEGER DEFAULT 0, risk_score INTEGER DEFAULT 0, risk_categories TEXT DEFAULT '[]', violation_programs TEXT DEFAULT '[]', status TEXT DEFAULT 'new', created_at TEXT DEFAULT (datetime('now')), updated_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_epa_leads_state ON epa_leads(site_state)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_epa_leads_score ON epa_leads(risk_score DESC)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_epa_leads_naics ON epa_leads(naics_code)"),
  ]);
}

export async function storeLead(db: D1Database, lead: EPAComplianceLead): Promise<void> {
  const f = lead.facility;
  const ncQtrs = f.cwaNoncompliance + f.caaNoncompliance + f.rcraNoncompliance + f.sdwaNoncompliance;

  await db.prepare(`
    INSERT OR REPLACE INTO epa_leads
    (registry_id, facility_name, site_state, site_city, naics_code,
     cwa_snc, caa_hpv, rcra_snc, sdwa_snc,
     total_penalties, formal_enforcement_count, inspection_count,
     noncompliance_quarters, risk_score, risk_categories, violation_programs,
     updated_at)
    VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, datetime('now'))
  `).bind(
    f.registryId, f.facilityName, f.state, f.city, f.naicsCode,
    f.cwaSnc ? 1 : 0, f.caaHpv ? 1 : 0, f.rcraSnc ? 1 : 0, f.sdwaSnc ? 1 : 0,
    f.totalPenalties, f.formalEnforcementCount, f.inspectionCount,
    ncQtrs, lead.riskScore,
    JSON.stringify(lead.riskCategories),
    JSON.stringify(lead.violationPrograms),
  ).run();
}

export async function getStoredLeads(
  db: D1Database,
  filters: { state?: string; minScore?: number; limit?: number }
): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM epa_leads WHERE 1=1";
  const binds: unknown[] = [];
  let idx = 1;

  if (filters.state) {
    query += ` AND site_state = ?${idx++}`;
    binds.push(filters.state.toUpperCase());
  }
  if (filters.minScore) {
    query += ` AND risk_score >= ?${idx++}`;
    binds.push(filters.minScore);
  }

  query += ` ORDER BY risk_score DESC LIMIT ?${idx}`;
  binds.push(Math.min(filters.limit ?? 100, 500));

  const stmt = db.prepare(query);
  const result = await (binds.length ? stmt.bind(...binds) : stmt).all();
  return (result.results ?? []) as Record<string, unknown>[];
}

// ═══════════════════════════════════════════════════════════════════════════
// HTML Report Generator
// ═══════════════════════════════════════════════════════════════════════════

function sanitize(str: string): string {
  return str.replace(/[<>"'&]/g, (c) => {
    const map: Record<string, string> = { "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "&": "&amp;" };
    return map[c] ?? c;
  });
}

export function generateEPAReportHTML(lead: EPAComplianceLead): string {
  const f = lead.facility;
  const programsHTML = lead.violationPrograms.map(p => `<span class="gap-tag">${sanitize(p)}</span>`).join(" ");
  const categoriesHTML = lead.riskCategories.map(c => `<span class="gap-tag risk">${sanitize(c)}</span>`).join(" ");
  const servicesHTML = lead.recommendedServices.map(s => `<li>${sanitize(s)}</li>`).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Environmental Compliance Gap Report — ${sanitize(f.facilityName)}</title>
<style>
  :root { --bg: #0a0a0a; --surface: #1a1a1a; --border: #2a2a2a; --text: #e0e0e0; --muted: #888; --accent: #4ade80; --risk: #ef4444; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', system-ui, sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; padding: 2rem; max-width: 900px; margin: 0 auto; }
  .header { border-bottom: 2px solid var(--accent); padding-bottom: 1rem; margin-bottom: 2rem; }
  .header h1 { font-size: 1.5rem; color: var(--accent); }
  .header .subtitle { color: var(--muted); font-size: 0.9rem; }
  .score-badge { display: inline-block; padding: 0.5rem 1.5rem; border-radius: 999px; font-weight: bold; font-size: 1.2rem; }
  .score-high { background: rgba(239,68,68,0.2); color: #ef4444; border: 1px solid #ef4444; }
  .score-med { background: rgba(251,191,36,0.2); color: #fbbf24; border: 1px solid #fbbf24; }
  .score-low { background: rgba(74,222,128,0.2); color: #4ade80; border: 1px solid #4ade80; }
  .section { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem; }
  .section h2 { color: var(--accent); font-size: 1.1rem; margin-bottom: 1rem; }
  .gap-tag { display: inline-block; background: rgba(74,222,128,0.15); color: var(--accent); padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.8rem; margin: 0.2rem; }
  .gap-tag.risk { background: rgba(239,68,68,0.15); color: #ef4444; }
  .detail-row { display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border); }
  .label { color: var(--muted); } .value { font-weight: 600; }
  ul { padding-left: 1.5rem; } li { margin-bottom: 0.5rem; }
  .footer { text-align: center; color: var(--muted); font-size: 0.8rem; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border); }
</style>
</head>
<body>
<div class="header">
  <h1>VERNEN LEGAL COMPLIANCE</h1>
  <p class="subtitle">Environmental Compliance Gap Report</p>
</div>

<div class="section">
  <h2>${sanitize(f.facilityName)}</h2>
  <div class="detail-row"><span class="label">Location</span><span class="value">${sanitize(f.city)}, ${sanitize(f.state)} ${sanitize(f.zip)}</span></div>
  <div class="detail-row"><span class="label">NAICS</span><span class="value">${sanitize(f.naicsCode || "N/A")}</span></div>
  <div class="detail-row"><span class="label">Registry ID</span><span class="value">${sanitize(f.registryId)}</span></div>
  <div class="detail-row"><span class="label">Total Penalties</span><span class="value">$${f.totalPenalties.toLocaleString()}</span></div>
  <div class="detail-row"><span class="label">Formal Enforcement Actions</span><span class="value">${f.formalEnforcementCount}</span></div>
  <div class="detail-row"><span class="label">Inspections (5yr)</span><span class="value">${f.inspectionCount}</span></div>
</div>

<div class="section">
  <h2>Risk Score: <span class="score-badge ${lead.riskScore >= 70 ? 'score-high' : lead.riskScore >= 40 ? 'score-med' : 'score-low'}">${lead.riskScore}/100</span></h2>
  <p style="margin-top: 1rem;"><strong>Programs:</strong> ${programsHTML}</p>
  <p style="margin-top: 0.5rem;"><strong>Findings:</strong> ${categoriesHTML}</p>
  <p style="margin-top: 1rem;"><strong>Estimated Remediation:</strong> ${sanitize(lead.estimatedRemediation)}</p>
</div>

<div class="section">
  <h2>Recommended Services</h2>
  <ul>${servicesHTML}</ul>
</div>

<div class="footer">
  <p>Generated by Vernen Legal Compliance &mdash; ${new Date().toISOString().split("T")[0]}</p>
  <p>Data source: EPA ECHO (Enforcement and Compliance History Online)</p>
</div>
</body></html>`;
}

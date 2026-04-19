/**
 * CMS Intelligence Service — Healthcare Provider Enforcement Pipeline
 *
 * Connects to CMS Hospital Compare, Nursing Home Compare, and Medicare
 * provider data to identify facilities with enforcement actions,
 * survey deficiencies, penalties, and payment suspensions.
 *
 * Source: data.cms.gov (free, no key required)
 */

import type { Env } from "../index.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface CMSDeficiency {
  facilityId: string;
  facilityName: string;
  facilityType: string;     // Hospital, Nursing Home, Home Health, Hospice
  state: string;
  city: string;
  deficiencyTag: string;
  deficiencyDescription: string;
  scope: string;             // Isolated, Pattern, Widespread
  severity: string;          // No harm, Minimal harm, Actual harm, Immediate jeopardy
  surveyDate: string;
  correctionDate: string;
  penaltyAmount: number;
}

export interface CMSComplianceLead {
  deficiency: CMSDeficiency;
  riskScore: number;
  riskCategories: string[];
  recommendedServices: string[];
  estimatedRemediation: string;
}

export interface CMSSearchFilters {
  state?: string;
  facilityType?: string;
  minPenalty?: number;
  severity?: string;
  limit?: number;
}

export interface CMSPipelineResult {
  leads: CMSComplianceLead[];
  totalMatched: number;
  filters: CMSSearchFilters;
  generatedAt: string;
  source: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// CMS Data Client & Intelligence Service
// ═══════════════════════════════════════════════════════════════════════════

// CMS Socrata Open Data API endpoints
const CMS_ENDPOINTS = {
  nursingHomePenalties: "https://data.cms.gov/resource/g6vv-u9sr.json",
  nursingHomeDeficiencies: "https://data.cms.gov/resource/r5ix-sfxw.json",
  hospitalCompare: "https://data.cms.gov/resource/dgck-syfz.json",
  homeHealth: "https://data.cms.gov/resource/6jpm-sxkc.json",
};

export class CMSIntelligenceService {

  private async cmsRequest(endpoint: string, params: Record<string, string> = {}): Promise<Record<string, unknown>[]> {
    const url = new URL(endpoint);
    url.searchParams.set("$limit", params["limit"] ?? "100");

    if (params["state"]) {
      url.searchParams.set("$where", `state='${params["state"].toUpperCase()}'`);
    }
    if (params["order"]) {
      url.searchParams.set("$order", params["order"]);
    }

    const response = await fetch(url.toString(), {
      headers: { "Accept": "application/json" },
    });

    if (!response.ok) {
      if (response.status === 404) return [];
      throw new Error(`CMS API error ${response.status}: ${await response.text()}`);
    }

    return response.json() as Promise<Record<string, unknown>[]>;
  }

  async fetchNursingHomePenalties(filters: CMSSearchFilters = {}): Promise<{ deficiencies: CMSDeficiency[]; total: number }> {
    const params: Record<string, string> = { limit: String(filters.limit ?? 100) };
    if (filters.state) params["state"] = filters.state;

    const results = await this.cmsRequest(CMS_ENDPOINTS.nursingHomePenalties, params);
    const deficiencies = results.map(r => mapToCMSDeficiency(r, "Nursing Home"));

    return { deficiencies, total: deficiencies.length };
  }

  async fetchHospitalDeficiencies(filters: CMSSearchFilters = {}): Promise<{ deficiencies: CMSDeficiency[]; total: number }> {
    const params: Record<string, string> = { limit: String(filters.limit ?? 100) };
    if (filters.state) params["state"] = filters.state;

    const results = await this.cmsRequest(CMS_ENDPOINTS.hospitalCompare, params);
    const deficiencies = results.map(r => mapToCMSDeficiency(r, "Hospital"));

    return { deficiencies, total: deficiencies.length };
  }

  scoreComplianceRisk(deficiency: CMSDeficiency): CMSComplianceLead {
    let riskScore = 0;
    const riskCategories: string[] = [];
    const recommendedServices: string[] = [];

    // Severity scoring
    const severity = (deficiency.severity ?? "").toLowerCase();
    if (severity.includes("immediate jeopardy")) {
      riskScore += 40;
      riskCategories.push("Immediate Jeopardy — Life-threatening Situation");
      recommendedServices.push("CMS Immediate Jeopardy Response & Abatement");
      recommendedServices.push("Accelerated Survey Preparation");
    } else if (severity.includes("actual harm")) {
      riskScore += 30;
      riskCategories.push("Actual Harm to Residents/Patients");
      recommendedServices.push("CMS Corrective Action Plan Development");
    } else if (severity.includes("minimal harm") || severity.includes("potential")) {
      riskScore += 15;
      riskCategories.push("Potential for Harm");
      recommendedServices.push("Deficiency Remediation Planning");
    }

    // Scope scoring
    const scope = (deficiency.scope ?? "").toLowerCase();
    if (scope.includes("widespread")) {
      riskScore += 20;
      riskCategories.push("Widespread Scope");
      recommendedServices.push("Facility-wide Compliance Overhaul");
    } else if (scope.includes("pattern")) {
      riskScore += 10;
      riskCategories.push("Pattern Scope");
    }

    // Penalty amount
    if (deficiency.penaltyAmount > 100000) {
      riskScore += 15;
      riskCategories.push(`Civil Monetary Penalty — $${(deficiency.penaltyAmount / 1000).toFixed(0)}K`);
      recommendedServices.push("CMS Penalty Appeal Preparation");
    } else if (deficiency.penaltyAmount > 10000) {
      riskScore += 10;
      riskCategories.push(`Penalty — $${(deficiency.penaltyAmount / 1000).toFixed(0)}K`);
    }

    // Facility type escalation
    if (deficiency.facilityType === "Nursing Home") {
      recommendedServices.push("Nursing Home Survey Readiness Program");
    } else if (deficiency.facilityType === "Hospital") {
      recommendedServices.push("Hospital CMS Conditions of Participation Review");
    }

    riskScore = Math.min(riskScore, 100);

    let estimatedRemediation: string;
    if (riskScore >= 70) estimatedRemediation = "6-12 months comprehensive CMS compliance remediation";
    else if (riskScore >= 50) estimatedRemediation = "3-6 months targeted corrective action";
    else if (riskScore >= 25) estimatedRemediation = "1-3 months deficiency correction";
    else estimatedRemediation = "< 1 month documentation review";

    return {
      deficiency,
      riskScore,
      riskCategories,
      recommendedServices: [...new Set(recommendedServices)],
      estimatedRemediation,
    };
  }

  async runPipeline(db: D1Database, filters: CMSSearchFilters = {}): Promise<CMSPipelineResult> {
    await ensureCMSTables(db);

    const allLeads: CMSComplianceLead[] = [];
    let totalMatched = 0;

    // Fetch from multiple CMS data sources
    const facilityTypes = filters.facilityType
      ? [filters.facilityType]
      : ["Nursing Home", "Hospital"];

    for (const facilityType of facilityTypes) {
      try {
        let result: { deficiencies: CMSDeficiency[]; total: number };
        if (facilityType === "Nursing Home") {
          result = await this.fetchNursingHomePenalties(filters);
        } else {
          result = await this.fetchHospitalDeficiencies(filters);
        }

        totalMatched += result.total;

        for (const deficiency of result.deficiencies) {
          const lead = this.scoreComplianceRisk(deficiency);
          allLeads.push(lead);
          await storeCMSLead(db, lead);
        }
      } catch (err) {
        console.error(`CMS pipeline error for ${facilityType}:`, err);
      }
    }

    allLeads.sort((a, b) => b.riskScore - a.riskScore);

    return {
      leads: allLeads,
      totalMatched,
      filters,
      generatedAt: new Date().toISOString(),
      source: "CMS Medicare/Medicaid Provider Data (data.cms.gov)",
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// D1 Storage
// ═══════════════════════════════════════════════════════════════════════════

export async function ensureCMSTables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS cms_leads (id TEXT PRIMARY KEY, facility_name TEXT NOT NULL, facility_type TEXT, state TEXT, city TEXT, deficiency_tag TEXT, severity TEXT, scope TEXT, penalty_amount REAL DEFAULT 0, survey_date TEXT, risk_score INTEGER DEFAULT 0, risk_categories TEXT DEFAULT '[]', created_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_cms_leads_state ON cms_leads(state)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_cms_leads_score ON cms_leads(risk_score DESC)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_cms_leads_type ON cms_leads(facility_type)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_cms_leads_severity ON cms_leads(severity)"),
  ]);
}

export async function storeCMSLead(db: D1Database, lead: CMSComplianceLead): Promise<void> {
  const d = lead.deficiency;
  const id = `${d.facilityId}-${d.deficiencyTag}-${d.surveyDate}`.replace(/\s/g, "");
  await db.prepare(
    "INSERT OR REPLACE INTO cms_leads (id, facility_name, facility_type, state, city, deficiency_tag, severity, scope, penalty_amount, survey_date, risk_score, risk_categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(id, d.facilityName, d.facilityType, d.state, d.city, d.deficiencyTag, d.severity, d.scope, d.penaltyAmount, d.surveyDate, lead.riskScore, JSON.stringify(lead.riskCategories)).run();
}

export async function getStoredCMSLeads(
  db: D1Database,
  filters: { state?: string; facilityType?: string; minScore?: number; limit?: number }
): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM cms_leads WHERE 1=1";
  const binds: unknown[] = [];
  if (filters.state) { query += " AND state = ?"; binds.push(filters.state.toUpperCase()); }
  if (filters.facilityType) { query += " AND facility_type = ?"; binds.push(filters.facilityType); }
  if (filters.minScore) { query += " AND risk_score >= ?"; binds.push(filters.minScore); }
  query += " ORDER BY risk_score DESC LIMIT ?";
  binds.push(filters.limit ?? 50);
  return (await db.prepare(query).bind(...binds).all()).results as Record<string, unknown>[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Data Mapper
// ═══════════════════════════════════════════════════════════════════════════

function mapToCMSDeficiency(r: Record<string, unknown>, facilityType: string): CMSDeficiency {
  return {
    facilityId: String(r["federal_provider_number"] ?? r["provider_number"] ?? r["ccn"] ?? r["facility_id"] ?? `cms-${Date.now()}`),
    facilityName: String(r["facility_name"] ?? r["provider_name"] ?? r["hospital_name"] ?? "Unknown"),
    facilityType,
    state: String(r["state"] ?? r["provider_state"] ?? ""),
    city: String(r["city"] ?? r["provider_city"] ?? ""),
    deficiencyTag: String(r["deficiency_prefix"] ?? r["survey_type"] ?? r["tag"] ?? ""),
    deficiencyDescription: String(r["deficiency_description"] ?? r["measure_name"] ?? r["description"] ?? ""),
    scope: String(r["scope_severity"] ?? r["scope"] ?? ""),
    severity: String(r["severity"] ?? r["scope_severity"] ?? ""),
    surveyDate: String(r["survey_date"] ?? r["date"] ?? ""),
    correctionDate: String(r["correction_date"] ?? ""),
    penaltyAmount: Number(r["fine_amount"] ?? r["penalty_amount"] ?? r["total_amount"] ?? 0),
  };
}

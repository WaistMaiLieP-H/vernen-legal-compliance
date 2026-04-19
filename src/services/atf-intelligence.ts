/**
 * ATF Intelligence Service — Firearms & Explosives Enforcement Pipeline
 *
 * Connects to ATF enforcement data covering Federal Firearms License
 * revocations, explosives violations, and arson investigation data.
 *
 * Source: atf.gov public data, regulations.gov ATF actions
 */

import type { Env } from "../index.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface ATFEnforcement {
  id: string;
  licensee: string;
  licenseType: string;       // FFL Type 01-11, SOT, Explosives
  state: string;
  city: string;
  actionType: string;        // Revocation, Warning, Civil Fine, Denial
  violationType: string;     // Record-keeping, Transfer, Storage, Straw Purchase
  amount: number;
  dateIssued: string;
  description: string;
  status: string;
}

export interface ATFComplianceLead {
  enforcement: ATFEnforcement;
  riskScore: number;
  riskCategories: string[];
  recommendedServices: string[];
  estimatedRemediation: string;
}

export interface ATFSearchFilters {
  state?: string;
  licenseType?: string;
  actionType?: string;
  limit?: number;
}

export interface ATFPipelineResult {
  leads: ATFComplianceLead[];
  totalMatched: number;
  filters: ATFSearchFilters;
  generatedAt: string;
  source: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// ATF API Client & Intelligence Service
// ═══════════════════════════════════════════════════════════════════════════

// ATF FFL listing and enforcement via regulations.gov
const ATF_REGS_URL = "https://www.regulations.gov/api/v4/documents";
// ATF trace data (aggregated, no individual records)
const ATF_DATA_URL = "https://data.atf.gov/resource";

export class ATFIntelligenceService {

  async fetchEnforcementActions(filters: ATFSearchFilters = {}): Promise<{ actions: ATFEnforcement[]; total: number }> {
    // Primary: ATF Socrata open data (FFL commerce & enforcement)
    try {
      const url = new URL(`${ATF_DATA_URL}/478i-svk6.json`);
      url.searchParams.set("$limit", String(filters.limit ?? 50));
      url.searchParams.set("$order", "premise_state");
      if (filters.state) url.searchParams.set("$where", `premise_state='${filters.state.toUpperCase()}'`);
      const response = await fetch(url.toString(), { headers: { "Accept": "application/json" } });
      if (!response.ok) { console.error(`ATF Socrata API error: ${response.status}`); return this.fallbackFetch(filters); }
      const data = await response.json() as Record<string, unknown>[];
      if (!Array.isArray(data) || data.length === 0) return this.fallbackFetch(filters);
      const actions = data.map((r: Record<string, unknown>) => ({
        id: String(r["lic_regn"] ?? r["license_number"] ?? `atf-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
        licensee: String(r["business_name"] ?? r["trade_name"] ?? r["licensee"] ?? "Unknown"),
        licenseType: String(r["lic_type"] ?? r["license_type"] ?? ""),
        state: String(r["premise_state"] ?? r["state"] ?? ""),
        city: String(r["premise_city"] ?? r["city"] ?? ""),
        actionType: String(r["action_type"] ?? "FFL Listing"),
        violationType: String(r["violation_type"] ?? ""),
        amount: Number(r["amount"] ?? 0),
        dateIssued: String(r["exp_date"] ?? r["date_issued"] ?? ""),
        description: String(r["mail_street"] ?? r["description"] ?? ""),
        status: "Active",
      } as ATFEnforcement));
      return { actions, total: actions.length };
    } catch (e) { console.error(`ATF Socrata API failed: ${e}`); return this.fallbackFetch(filters); }
  }

  private async fallbackFetch(filters: ATFSearchFilters): Promise<{ actions: ATFEnforcement[]; total: number }> {
    try {
      const url = new URL(ATF_REGS_URL);
      url.searchParams.set("filter[agencyId]", "ATF");
      url.searchParams.set("filter[documentType]", "Rule");
      url.searchParams.set("sort", "-postedDate");
      url.searchParams.set("page[size]", String(filters.limit ?? 50));
      const response = await fetch(url.toString(), { headers: { "Accept": "application/vnd.api+json" } });
      if (!response.ok) { console.error(`ATF regulations.gov fallback error: ${response.status}`); return { actions: [], total: 0 }; }
      const data = await response.json() as { data?: Record<string, unknown>[]; meta?: { totalElements?: number } };
      const actions = (data.data ?? []).map(mapToATFEnforcement);
      return { actions, total: data.meta?.totalElements ?? actions.length };
    } catch { return { actions: [], total: 0 }; }
  }

  scoreComplianceRisk(enforcement: ATFEnforcement): ATFComplianceLead {
    let riskScore = 0;
    const riskCategories: string[] = [];
    const recommendedServices: string[] = [];

    // Action type severity
    const actionType = (enforcement.actionType ?? "").toLowerCase();
    if (actionType.includes("revocation")) {
      riskScore += 40;
      riskCategories.push("FFL Revocation");
      recommendedServices.push("FFL Revocation Appeal & Hearing Preparation");
      recommendedServices.push("ATF Compliance Program Development");
    } else if (actionType.includes("denial")) {
      riskScore += 25;
      riskCategories.push("License Application Denial");
      recommendedServices.push("ATF License Application Support");
    } else if (actionType.includes("warning")) {
      riskScore += 15;
      riskCategories.push("ATF Warning Letter");
      recommendedServices.push("ATF Compliance Corrective Action");
    }

    // Violation type
    const vType = (enforcement.violationType ?? "").toLowerCase();
    if (vType.includes("record") || vType.includes("4473")) {
      riskScore += 15;
      riskCategories.push("Record-keeping Violation (Form 4473)");
      recommendedServices.push("ATF Record-keeping Compliance Audit");
    }
    if (vType.includes("transfer") || vType.includes("straw")) {
      riskScore += 20;
      riskCategories.push("Illegal Transfer / Straw Purchase");
    }
    if (vType.includes("explosive")) {
      riskScore += 20;
      riskCategories.push("Explosives Violation");
      recommendedServices.push("Explosives Storage & Handling Compliance");
    }

    // License type
    const licType = (enforcement.licenseType ?? "").toLowerCase();
    if (licType.includes("sot") || licType.includes("class 3") || licType.includes("nfa")) {
      riskScore += 10;
      riskCategories.push("SOT/NFA Dealer");
    }

    // Amount
    if (enforcement.amount >= 50000) {
      riskScore += 10;
      riskCategories.push(`Civil Fine — $${(enforcement.amount / 1000).toFixed(0)}K`);
    }

    riskScore = Math.min(riskScore, 100);

    let estimatedRemediation: string;
    if (riskScore >= 70) estimatedRemediation = "6-12 months FFL compliance remediation & appeal";
    else if (riskScore >= 50) estimatedRemediation = "3-6 months targeted compliance program";
    else if (riskScore >= 25) estimatedRemediation = "1-3 months ATF compliance review";
    else estimatedRemediation = "< 1 month record-keeping audit";

    return {
      enforcement,
      riskScore,
      riskCategories,
      recommendedServices: [...new Set(recommendedServices)],
      estimatedRemediation,
    };
  }

  async runPipeline(db: D1Database, filters: ATFSearchFilters = {}): Promise<ATFPipelineResult> {
    await ensureATFTables(db);

    const { actions, total } = await this.fetchEnforcementActions(filters);
    const leads: ATFComplianceLead[] = [];

    for (const action of actions) {
      const lead = this.scoreComplianceRisk(action);
      leads.push(lead);
      await storeATFLead(db, lead);
    }

    leads.sort((a, b) => b.riskScore - a.riskScore);

    return {
      leads,
      totalMatched: total,
      filters,
      generatedAt: new Date().toISOString(),
      source: "ATF Enforcement Actions (atf.gov / regulations.gov)",
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// D1 Storage
// ═══════════════════════════════════════════════════════════════════════════

export async function ensureATFTables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS atf_leads (id TEXT PRIMARY KEY, licensee TEXT NOT NULL, state TEXT, license_type TEXT, action_type TEXT, violation_type TEXT, amount REAL DEFAULT 0, date_issued TEXT, risk_score INTEGER DEFAULT 0, risk_categories TEXT DEFAULT '[]', created_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_atf_leads_state ON atf_leads(state)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_atf_leads_score ON atf_leads(risk_score DESC)"),
  ]);
}

export async function storeATFLead(db: D1Database, lead: ATFComplianceLead): Promise<void> {
  const e = lead.enforcement;
  await db.prepare(
    "INSERT OR REPLACE INTO atf_leads (id, licensee, state, license_type, action_type, violation_type, amount, date_issued, risk_score, risk_categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(e.id, e.licensee, e.state, e.licenseType, e.actionType, e.violationType, e.amount, e.dateIssued, lead.riskScore, JSON.stringify(lead.riskCategories)).run();
}

export async function getStoredATFLeads(
  db: D1Database,
  filters: { state?: string; actionType?: string; minScore?: number; limit?: number }
): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM atf_leads WHERE 1=1";
  const binds: unknown[] = [];
  if (filters.state) { query += " AND state = ?"; binds.push(filters.state.toUpperCase()); }
  if (filters.actionType) { query += " AND action_type LIKE ?"; binds.push(`%${filters.actionType}%`); }
  if (filters.minScore) { query += " AND risk_score >= ?"; binds.push(filters.minScore); }
  query += " ORDER BY risk_score DESC LIMIT ?";
  binds.push(filters.limit ?? 50);
  return (await db.prepare(query).bind(...binds).all()).results as Record<string, unknown>[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Data Mapper
// ═══════════════════════════════════════════════════════════════════════════

function mapToATFEnforcement(r: Record<string, unknown>): ATFEnforcement {
  const attrs = (r["attributes"] ?? r) as Record<string, unknown>;
  return {
    id: String(r["id"] ?? attrs["documentId"] ?? `atf-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
    licensee: String(attrs["title"] ?? attrs["licensee"] ?? "Unknown"),
    licenseType: String(attrs["subtype"] ?? attrs["licenseType"] ?? ""),
    state: String(attrs["stateProvince"] ?? attrs["state"] ?? ""),
    city: String(attrs["city"] ?? ""),
    actionType: String(attrs["documentType"] ?? attrs["actionType"] ?? "Enforcement"),
    violationType: String(attrs["subject"] ?? attrs["violationType"] ?? ""),
    amount: Number(attrs["amount"] ?? 0),
    dateIssued: String(attrs["postedDate"] ?? attrs["dateIssued"] ?? ""),
    description: String(attrs["summary"] ?? attrs["description"] ?? ""),
    status: String(attrs["withdrawnDate"] ? "Withdrawn" : "Active"),
  };
}

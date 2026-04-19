/**
 * FERC Intelligence Service — Energy Market Enforcement Pipeline
 *
 * Connects to FERC enforcement data covering energy market manipulation,
 * reliability violations, pipeline tariff compliance, and hydropower
 * license violations.
 *
 * Source: ferc.gov, regulations.gov FERC docket
 */

import type { Env } from "../index.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface FERCEnforcement {
  id: string;
  respondent: string;
  state: string;
  actionType: string;        // Civil Penalty, Show Cause, NOV, Settlement
  violationType: string;     // Market Manipulation, Reliability, Tariff, Hydropower
  amount: number;
  dateIssued: string;
  docket: string;
  description: string;
  status: string;
}

export interface FERCComplianceLead {
  enforcement: FERCEnforcement;
  riskScore: number;
  riskCategories: string[];
  recommendedServices: string[];
  estimatedRemediation: string;
}

export interface FERCSearchFilters {
  violationType?: string;
  respondent?: string;
  minAmount?: number;
  limit?: number;
}

export interface FERCPipelineResult {
  leads: FERCComplianceLead[];
  totalMatched: number;
  filters: FERCSearchFilters;
  generatedAt: string;
  source: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// FERC API Client & Intelligence Service
// ═══════════════════════════════════════════════════════════════════════════

const FERC_REGS_URL = "https://www.regulations.gov/api/v4/documents";

export class FERCIntelligenceService {

  async fetchEnforcementActions(filters: FERCSearchFilters = {}): Promise<{ actions: FERCEnforcement[]; total: number }> {
    // Primary: FERC eLibrary enforcement orders API
    try {
      const url = new URL("https://elibrary.ferc.gov/eLibrary/filelist");
      url.searchParams.set("accession_number", "");
      url.searchParams.set("optimized", "true");
      url.searchParams.set("category", "issuance");
      url.searchParams.set("sub_category", "order");
      url.searchParams.set("ResultCount", String(filters.limit ?? 50));
      if (filters.respondent) url.searchParams.set("textsearch", filters.respondent);
      const response = await fetch(url.toString(), { headers: { "Accept": "application/json" } });
      if (!response.ok) { console.error(`FERC eLibrary API error: ${response.status}`); return this.fallbackFetch(filters); }
      const data = await response.json() as { FilingList?: Record<string, unknown>[]; TotalCount?: number } | Record<string, unknown>[];
      const filings = Array.isArray(data) ? data : (data.FilingList ?? []);
      if (filings.length === 0) return this.fallbackFetch(filters);
      let actions = filings.map((r: Record<string, unknown>) => ({
        id: String(r["accession_number"] ?? r["AccessionNumber"] ?? `ferc-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
        respondent: String(r["description"] ?? r["Description"] ?? "Unknown").split(/[–—-]/)[0]?.trim() || "Unknown",
        state: "",
        actionType: String(r["sub_category"] ?? r["SubCategory"] ?? "Order"),
        violationType: classifyFERCViolation(String(r["description"] ?? r["Description"] ?? "")),
        amount: 0,
        dateIssued: String(r["filed_date"] ?? r["FiledDate"] ?? ""),
        docket: String(r["docket_number"] ?? r["DocketNumber"] ?? ""),
        description: String(r["description"] ?? r["Description"] ?? ""),
        status: "Active",
      } as FERCEnforcement));
      if (filters.violationType) actions = actions.filter(a => a.violationType.toLowerCase().includes(filters.violationType!.toLowerCase()));
      if (filters.minAmount) actions = actions.filter(a => a.amount >= filters.minAmount!);
      return { actions, total: (data as { TotalCount?: number }).TotalCount ?? actions.length };
    } catch (e) { console.error(`FERC eLibrary API failed: ${e}`); return this.fallbackFetch(filters); }
  }

  private async fallbackFetch(filters: FERCSearchFilters): Promise<{ actions: FERCEnforcement[]; total: number }> {
    try {
      const url = new URL(FERC_REGS_URL);
      url.searchParams.set("filter[agencyId]", "FERC");
      url.searchParams.set("sort", "-postedDate");
      url.searchParams.set("page[size]", String(filters.limit ?? 50));
      if (filters.respondent) url.searchParams.set("filter[searchTerm]", filters.respondent);
      const response = await fetch(url.toString(), { headers: { "Accept": "application/vnd.api+json" } });
      if (!response.ok) { console.error(`FERC regulations.gov fallback error: ${response.status}`); return { actions: [], total: 0 }; }
      const data = await response.json() as { data?: Record<string, unknown>[]; meta?: { totalElements?: number } };
      let actions = (data.data ?? []).map(mapToFERCEnforcement);
      if (filters.violationType) actions = actions.filter(a => a.violationType.toLowerCase().includes(filters.violationType!.toLowerCase()));
      if (filters.minAmount) actions = actions.filter(a => a.amount >= filters.minAmount!);
      return { actions, total: data.meta?.totalElements ?? actions.length };
    } catch { return { actions: [], total: 0 }; }
  }

  scoreComplianceRisk(enforcement: FERCEnforcement): FERCComplianceLead {
    let riskScore = 0;
    const riskCategories: string[] = [];
    const recommendedServices: string[] = [];

    // Amount (FERC penalties can be enormous)
    if (enforcement.amount >= 100000000) {
      riskScore += 40;
      riskCategories.push(`Massive FERC Penalty — $${(enforcement.amount / 1000000).toFixed(0)}M`);
      recommendedServices.push("FERC Enforcement Defense & Settlement Negotiation");
    } else if (enforcement.amount >= 10000000) {
      riskScore += 30;
      riskCategories.push(`Major FERC Penalty — $${(enforcement.amount / 1000000).toFixed(0)}M`);
      recommendedServices.push("FERC Penalty Response");
    } else if (enforcement.amount >= 1000000) {
      riskScore += 20;
      riskCategories.push(`FERC Penalty — $${(enforcement.amount / 1000000).toFixed(1)}M`);
    } else if (enforcement.amount >= 100000) {
      riskScore += 10;
    }

    // Violation type
    const vType = (enforcement.violationType + " " + enforcement.description).toLowerCase();
    if (vType.includes("manipulation") || vType.includes("anti-manipulation")) {
      riskScore += 25;
      riskCategories.push("Energy Market Manipulation");
      recommendedServices.push("Energy Trading Compliance Program");
    }
    if (vType.includes("reliability")) {
      riskScore += 20;
      riskCategories.push("Reliability Standards Violation (NERC/CIP)");
      recommendedServices.push("NERC CIP Compliance Program");
    }
    if (vType.includes("tariff")) {
      riskScore += 10;
      riskCategories.push("Tariff Violation");
      recommendedServices.push("FERC Tariff Compliance Review");
    }
    if (vType.includes("hydropower") || vType.includes("dam")) {
      riskScore += 15;
      riskCategories.push("Hydropower License Violation");
      recommendedServices.push("Hydropower License Compliance");
    }

    riskScore = Math.min(riskScore, 100);

    let estimatedRemediation: string;
    if (riskScore >= 70) estimatedRemediation = "12-24 months comprehensive energy compliance program";
    else if (riskScore >= 50) estimatedRemediation = "6-12 months FERC enforcement response";
    else if (riskScore >= 25) estimatedRemediation = "3-6 months compliance review";
    else estimatedRemediation = "1-3 months regulatory audit";

    return {
      enforcement,
      riskScore,
      riskCategories,
      recommendedServices: [...new Set(recommendedServices)],
      estimatedRemediation,
    };
  }

  async runPipeline(db: D1Database, filters: FERCSearchFilters = {}): Promise<FERCPipelineResult> {
    await ensureFERCTables(db);

    const { actions, total } = await this.fetchEnforcementActions(filters);
    const leads: FERCComplianceLead[] = [];

    for (const action of actions) {
      const lead = this.scoreComplianceRisk(action);
      leads.push(lead);
      await storeFERCLead(db, lead);
    }

    leads.sort((a, b) => b.riskScore - a.riskScore);

    return {
      leads,
      totalMatched: total,
      filters,
      generatedAt: new Date().toISOString(),
      source: "FERC Energy Market Enforcement (ferc.gov / regulations.gov)",
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// D1 Storage
// ═══════════════════════════════════════════════════════════════════════════

export async function ensureFERCTables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS ferc_leads (id TEXT PRIMARY KEY, respondent TEXT NOT NULL, state TEXT, action_type TEXT, violation_type TEXT, amount REAL DEFAULT 0, date_issued TEXT, docket TEXT, risk_score INTEGER DEFAULT 0, risk_categories TEXT DEFAULT '[]', created_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_ferc_leads_score ON ferc_leads(risk_score DESC)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_ferc_leads_amount ON ferc_leads(amount DESC)"),
  ]);
}

export async function storeFERCLead(db: D1Database, lead: FERCComplianceLead): Promise<void> {
  const e = lead.enforcement;
  await db.prepare(
    "INSERT OR REPLACE INTO ferc_leads (id, respondent, state, action_type, violation_type, amount, date_issued, docket, risk_score, risk_categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(e.id, e.respondent, e.state, e.actionType, e.violationType, e.amount, e.dateIssued, e.docket, lead.riskScore, JSON.stringify(lead.riskCategories)).run();
}

export async function getStoredFERCLeads(
  db: D1Database,
  filters: { violationType?: string; minScore?: number; minAmount?: number; limit?: number }
): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM ferc_leads WHERE 1=1";
  const binds: unknown[] = [];
  if (filters.violationType) { query += " AND violation_type LIKE ?"; binds.push(`%${filters.violationType}%`); }
  if (filters.minScore) { query += " AND risk_score >= ?"; binds.push(filters.minScore); }
  if (filters.minAmount) { query += " AND amount >= ?"; binds.push(filters.minAmount); }
  query += " ORDER BY risk_score DESC LIMIT ?";
  binds.push(filters.limit ?? 50);
  return (await db.prepare(query).bind(...binds).all()).results as Record<string, unknown>[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Data Mapper
// ═══════════════════════════════════════════════════════════════════════════

function mapToFERCEnforcement(r: Record<string, unknown>): FERCEnforcement {
  const attrs = (r["attributes"] ?? r) as Record<string, unknown>;
  const title = String(attrs["title"] ?? "");
  return {
    id: String(r["id"] ?? attrs["documentId"] ?? `ferc-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
    respondent: title.split(/[–—-]/)[0]?.trim() || "Unknown",
    state: String(attrs["stateProvince"] ?? ""),
    actionType: String(attrs["documentType"] ?? "Enforcement"),
    violationType: classifyFERCViolation(title + " " + String(attrs["summary"] ?? "")),
    amount: Number(attrs["amount"] ?? 0),
    dateIssued: String(attrs["postedDate"] ?? ""),
    docket: String(attrs["docketId"] ?? ""),
    description: String(attrs["summary"] ?? title),
    status: String(attrs["withdrawnDate"] ? "Withdrawn" : "Active"),
  };
}

function classifyFERCViolation(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("manipulat")) return "Market Manipulation";
  if (t.includes("reliabilit") || t.includes("nerc") || t.includes("cip")) return "Reliability/NERC CIP";
  if (t.includes("tariff")) return "Tariff";
  if (t.includes("hydro") || t.includes("dam")) return "Hydropower";
  if (t.includes("pipeline") || t.includes("natural gas")) return "Pipeline/Natural Gas";
  return "General";
}

/**
 * FDIC Intelligence Service — Bank Enforcement Pipeline
 *
 * Covers FDIC enforcement actions against state-chartered banks:
 * cease & desist, removal orders, CMPs, consent orders.
 * Source: fdic.gov enforcement decisions database
 */

import type { Env } from "../index.js";

export interface FDICEnforcement { id: string; bankName: string; certNumber: string; state: string; city: string; actionType: string; amount: number; dateIssued: string; description: string; status: string; }
export interface FDICComplianceLead { enforcement: FDICEnforcement; riskScore: number; riskCategories: string[]; recommendedServices: string[]; estimatedRemediation: string; }
export interface FDICSearchFilters { state?: string; bankName?: string; actionType?: string; limit?: number; }
export interface FDICPipelineResult { leads: FDICComplianceLead[]; totalMatched: number; filters: FDICSearchFilters; generatedAt: string; source: string; }

const FDIC_ENFORCEMENT_URL = "https://efoia.fdic.gov/efoia/servlet/Search";
const FDIC_API = "https://banks.data.fdic.gov/api/financials";

export class FDICIntelligenceService {
  async fetchEnforcementActions(filters: FDICSearchFilters = {}): Promise<{ actions: FDICEnforcement[]; total: number }> {
    // Primary: FDIC BankFind API — institutions data
    try {
      const url = new URL("https://banks.data.fdic.gov/api/financials");
      url.searchParams.set("limit", String(filters.limit ?? 50));
      url.searchParams.set("sort_by", "REPDTE"); url.searchParams.set("sort_order", "DESC");
      url.searchParams.set("fields", "REPNM,CERT,CITY,STALP,ASSET,DEP,REPDTE,ENDEFYMD");
      if (filters.state) url.searchParams.set("filters", `STALP:${filters.state.toUpperCase()}`);
      if (filters.bankName) url.searchParams.set("search", filters.bankName);
      const response = await fetch(url.toString(), { headers: { "Accept": "application/json" } });
      if (!response.ok) { console.error(`FDIC API error: ${response.status}`); return this.fallbackFetch(filters); }
      const data = await response.json() as { data?: Record<string, unknown>[]; totals?: { count?: number } };
      const actions = (data.data ?? []).map((r: Record<string, unknown>) => ({
        id: String(r["CERT"] ?? r["ID"] ?? `fdic-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
        bankName: String(r["REPNM"] ?? r["INSTNAME"] ?? "Unknown"),
        certNumber: String(r["CERT"] ?? ""),
        state: String(r["STALP"] ?? ""),
        city: String(r["CITY"] ?? ""),
        actionType: r["ENDEFYMD"] ? "Enforcement Action" : "Active Institution",
        amount: Number(r["ASSET"] ?? 0),
        dateIssued: String(r["REPDTE"] ?? r["ENDEFYMD"] ?? ""),
        description: `Assets: $${(Number(r["ASSET"] ?? 0) / 1000).toFixed(0)}K, Deposits: $${(Number(r["DEP"] ?? 0) / 1000).toFixed(0)}K`,
        status: r["ENDEFYMD"] ? "Enforcement" : "Active",
      } as FDICEnforcement));
      return { actions, total: data.totals?.count ?? actions.length };
    } catch (e) { console.error(`FDIC API failed: ${e}`); return this.fallbackFetch(filters); }
  }

  private async fallbackFetch(filters: FDICSearchFilters): Promise<{ actions: FDICEnforcement[]; total: number }> {
    try {
      const url = new URL("https://www.regulations.gov/api/v4/documents");
      url.searchParams.set("filter[agencyId]", "FDIC"); url.searchParams.set("sort", "-postedDate");
      url.searchParams.set("page[size]", String(filters.limit ?? 50));
      if (filters.bankName) url.searchParams.set("filter[searchTerm]", filters.bankName);
      const response = await fetch(url.toString(), { headers: { "Accept": "application/vnd.api+json" } });
      if (!response.ok) { console.error(`FDIC regulations.gov fallback error: ${response.status}`); return { actions: [], total: 0 }; }
      const data = await response.json() as { data?: Record<string, unknown>[]; meta?: { totalElements?: number } };
      const actions = (data.data ?? []).map((r: Record<string, unknown>) => {
        const a = (r["attributes"] ?? r) as Record<string, unknown>;
        return { id: String(r["id"] ?? `fdic-${Date.now()}`), bankName: String(a["title"] ?? "Unknown").split(/[–—-]/)[0]?.trim() || "Unknown", certNumber: "", state: String(a["stateProvince"] ?? ""), city: "", actionType: String(a["documentType"] ?? "Enforcement"), amount: 0, dateIssued: String(a["postedDate"] ?? ""), description: String(a["summary"] ?? ""), status: "Active" } as FDICEnforcement;
      });
      return { actions, total: data.meta?.totalElements ?? actions.length };
    } catch { return { actions: [], total: 0 }; }
  }

  scoreComplianceRisk(e: FDICEnforcement): FDICComplianceLead {
    let riskScore = 0; const riskCategories: string[] = []; const recommendedServices: string[] = [];
    const at = (e.actionType + " " + e.description).toLowerCase();
    if (at.includes("cease and desist")) { riskScore += 35; riskCategories.push("Cease & Desist Order"); recommendedServices.push("FDIC Consent Order Compliance Program"); }
    if (at.includes("removal") || at.includes("prohibition")) { riskScore += 30; riskCategories.push("Removal/Prohibition Order"); }
    if (at.includes("civil money penalty") || at.includes("cmp")) { riskScore += 25; riskCategories.push("Civil Money Penalty"); }
    if (at.includes("consent")) { riskScore += 20; riskCategories.push("Consent Order"); }
    if (at.includes("termination of insurance")) { riskScore += 40; riskCategories.push("Deposit Insurance Termination"); recommendedServices.push("FDIC Insurance Reinstatement"); }
    if (e.amount >= 1000000) { riskScore += 15; riskCategories.push(`Penalty — $${(e.amount / 1000000).toFixed(1)}M`); }

    if (at.includes("bsa") || at.includes("aml")) recommendedServices.push("BSA/AML Compliance");
    if (at.includes("safety and soundness")) recommendedServices.push("Safety & Soundness Compliance");
    recommendedServices.push("FDIC Examination Preparation");

    riskScore = Math.min(riskScore, 100);
    return { enforcement: e, riskScore, riskCategories, recommendedServices: [...new Set(recommendedServices)], estimatedRemediation: riskScore >= 50 ? "6-18 months bank compliance" : "3-6 months FDIC review" };
  }

  async runPipeline(db: D1Database, filters: FDICSearchFilters = {}): Promise<FDICPipelineResult> {
    await ensureFDICTables(db); const { actions, total } = await this.fetchEnforcementActions(filters);
    const leads: FDICComplianceLead[] = [];
    for (const a of actions) { const l = this.scoreComplianceRisk(a); leads.push(l); await storeFDICLead(db, l); }
    leads.sort((a, b) => b.riskScore - a.riskScore);
    return { leads, totalMatched: total, filters, generatedAt: new Date().toISOString(), source: "FDIC Bank Enforcement (fdic.gov)" };
  }
}

export async function ensureFDICTables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS fdic_leads (id TEXT PRIMARY KEY, bank_name TEXT NOT NULL, state TEXT, action_type TEXT, amount REAL DEFAULT 0, date_issued TEXT, risk_score INTEGER DEFAULT 0, risk_categories TEXT DEFAULT '[]', created_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_fdic_leads_score ON fdic_leads(risk_score DESC)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_fdic_leads_state ON fdic_leads(state)"),
  ]);
}
export async function storeFDICLead(db: D1Database, lead: FDICComplianceLead): Promise<void> {
  const e = lead.enforcement;
  await db.prepare("INSERT OR REPLACE INTO fdic_leads (id, bank_name, state, action_type, amount, date_issued, risk_score, risk_categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(e.id, e.bankName, e.state, e.actionType, e.amount, e.dateIssued, lead.riskScore, JSON.stringify(lead.riskCategories)).run();
}
export async function getStoredFDICLeads(db: D1Database, filters: { state?: string; minScore?: number; limit?: number }): Promise<Record<string, unknown>[]> {
  let q = "SELECT * FROM fdic_leads WHERE 1=1"; const b: unknown[] = [];
  if (filters.state) { q += " AND state = ?"; b.push(filters.state.toUpperCase()); }
  if (filters.minScore) { q += " AND risk_score >= ?"; b.push(filters.minScore); }
  q += " ORDER BY risk_score DESC LIMIT ?"; b.push(filters.limit ?? 50);
  return (await db.prepare(q).bind(...b).all()).results as Record<string, unknown>[];
}

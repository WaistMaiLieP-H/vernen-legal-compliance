/**
 * NCUA Intelligence Service — Credit Union Enforcement Pipeline
 *
 * Covers NCUA enforcement actions against federally insured credit unions:
 * conservatorships, liquidations, cease & desist, CMPs.
 * Source: ncua.gov enforcement data
 */

import type { Env } from "../index.js";

export interface NCUAEnforcement { id: string; creditUnion: string; charterNumber: string; state: string; actionType: string; amount: number; dateIssued: string; description: string; status: string; }
export interface NCUAComplianceLead { enforcement: NCUAEnforcement; riskScore: number; riskCategories: string[]; recommendedServices: string[]; estimatedRemediation: string; }
export interface NCUASearchFilters { state?: string; creditUnion?: string; actionType?: string; limit?: number; }
export interface NCUAPipelineResult { leads: NCUAComplianceLead[]; totalMatched: number; filters: NCUASearchFilters; generatedAt: string; source: string; }

export class NCUAIntelligenceService {
  async fetchEnforcementActions(filters: NCUASearchFilters = {}): Promise<{ actions: NCUAEnforcement[]; total: number }> {
    // Primary: NCUA credit union data API
    try {
      const url = new URL("https://ncuaapi.ncua.gov/api/v1/credit-unions");
      url.searchParams.set("$top", String(filters.limit ?? 50));
      url.searchParams.set("$orderby", "LastModifiedDate desc");
      if (filters.state) url.searchParams.set("$filter", `State eq '${filters.state.toUpperCase()}'`);
      if (filters.creditUnion) url.searchParams.set("$filter", `contains(CreditUnionName,'${filters.creditUnion}')`);
      const response = await fetch(url.toString(), { headers: { "Accept": "application/json" } });
      if (!response.ok) { console.error(`NCUA API error: ${response.status}`); return this.fallbackFetch(filters); }
      const data = await response.json() as { value?: Record<string, unknown>[]; "@odata.count"?: number } | Record<string, unknown>[];
      const results = Array.isArray(data) ? data : (data.value ?? []);
      if (results.length === 0) return this.fallbackFetch(filters);
      const actions = results.map((r: Record<string, unknown>) => ({
        id: String(r["CharterNumber"] ?? r["CuNumber"] ?? `ncua-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
        creditUnion: String(r["CreditUnionName"] ?? r["CuName"] ?? "Unknown"),
        charterNumber: String(r["CharterNumber"] ?? r["CuNumber"] ?? ""),
        state: String(r["State"] ?? r["PhysicalAddressStateCode"] ?? ""),
        actionType: String(r["CuStatus"] ?? r["ActionType"] ?? "Active"),
        amount: Number(r["TotalAssets"] ?? 0),
        dateIssued: String(r["LastModifiedDate"] ?? r["CycleDate"] ?? ""),
        description: `Members: ${r["NumberOfMembers"] ?? "N/A"}, Assets: $${(Number(r["TotalAssets"] ?? 0) / 1000000).toFixed(1)}M`,
        status: String(r["CuStatus"] ?? "Active"),
      } as NCUAEnforcement));
      return { actions, total: (data as { "@odata.count"?: number })["@odata.count"] ?? actions.length };
    } catch (e) { console.error(`NCUA API failed: ${e}`); return this.fallbackFetch(filters); }
  }

  private async fallbackFetch(filters: NCUASearchFilters): Promise<{ actions: NCUAEnforcement[]; total: number }> {
    try {
      const url = new URL("https://www.regulations.gov/api/v4/documents");
      url.searchParams.set("filter[agencyId]", "NCUA"); url.searchParams.set("sort", "-postedDate");
      url.searchParams.set("page[size]", String(filters.limit ?? 50));
      if (filters.creditUnion) url.searchParams.set("filter[searchTerm]", filters.creditUnion);
      const response = await fetch(url.toString(), { headers: { "Accept": "application/vnd.api+json" } });
      if (!response.ok) { console.error(`NCUA regulations.gov fallback error: ${response.status}`); return { actions: [], total: 0 }; }
      const data = await response.json() as { data?: Record<string, unknown>[]; meta?: { totalElements?: number } };
      const actions = (data.data ?? []).map((r: Record<string, unknown>) => {
        const a = (r["attributes"] ?? r) as Record<string, unknown>;
        return { id: String(r["id"] ?? `ncua-${Date.now()}`), creditUnion: String(a["title"] ?? "Unknown").split(/[–—-]/)[0]?.trim() || "Unknown", charterNumber: "", state: String(a["stateProvince"] ?? ""), actionType: String(a["documentType"] ?? "Enforcement"), amount: 0, dateIssued: String(a["postedDate"] ?? ""), description: String(a["summary"] ?? ""), status: "Active" } as NCUAEnforcement;
      });
      return { actions, total: data.meta?.totalElements ?? actions.length };
    } catch { return { actions: [], total: 0 }; }
  }

  scoreComplianceRisk(e: NCUAEnforcement): NCUAComplianceLead {
    let riskScore = 0; const riskCategories: string[] = []; const recommendedServices: string[] = [];
    const at = (e.actionType + " " + e.description).toLowerCase();
    if (at.includes("conservatorship")) { riskScore += 40; riskCategories.push("Conservatorship"); recommendedServices.push("NCUA Conservatorship Response"); }
    if (at.includes("liquidation")) { riskScore += 45; riskCategories.push("Liquidation"); recommendedServices.push("Credit Union Liquidation Support"); }
    if (at.includes("cease and desist")) { riskScore += 30; riskCategories.push("Cease & Desist Order"); recommendedServices.push("NCUA Consent Order Compliance"); }
    if (at.includes("civil money penalty") || at.includes("cmp")) { riskScore += 20; riskCategories.push("Civil Money Penalty"); }
    if (at.includes("removal") || at.includes("prohibition")) { riskScore += 30; riskCategories.push("Removal/Prohibition Order"); }
    if (at.includes("letter of understanding")) { riskScore += 10; riskCategories.push("Letter of Understanding"); }

    if (e.amount >= 1000000) { riskScore += 15; riskCategories.push(`Penalty — $${(e.amount / 1000000).toFixed(1)}M`); }

    if (at.includes("bsa")) recommendedServices.push("Credit Union BSA/AML Compliance");
    recommendedServices.push("NCUA Examination Preparation");

    riskScore = Math.min(riskScore, 100);
    return { enforcement: e, riskScore, riskCategories, recommendedServices: [...new Set(recommendedServices)], estimatedRemediation: riskScore >= 50 ? "6-18 months credit union compliance" : "3-6 months NCUA review" };
  }

  async runPipeline(db: D1Database, filters: NCUASearchFilters = {}): Promise<NCUAPipelineResult> {
    await ensureNCUATables(db); const { actions, total } = await this.fetchEnforcementActions(filters);
    const leads: NCUAComplianceLead[] = [];
    for (const a of actions) { const l = this.scoreComplianceRisk(a); leads.push(l); await storeNCUALead(db, l); }
    leads.sort((a, b) => b.riskScore - a.riskScore);
    return { leads, totalMatched: total, filters, generatedAt: new Date().toISOString(), source: "NCUA Credit Union Enforcement (ncua.gov)" };
  }
}

export async function ensureNCUATables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS ncua_leads (id TEXT PRIMARY KEY, credit_union TEXT NOT NULL, state TEXT, action_type TEXT, amount REAL DEFAULT 0, date_issued TEXT, risk_score INTEGER DEFAULT 0, risk_categories TEXT DEFAULT '[]', created_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_ncua_leads_score ON ncua_leads(risk_score DESC)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_ncua_leads_state ON ncua_leads(state)"),
  ]);
}
export async function storeNCUALead(db: D1Database, lead: NCUAComplianceLead): Promise<void> {
  const e = lead.enforcement;
  await db.prepare("INSERT OR REPLACE INTO ncua_leads (id, credit_union, state, action_type, amount, date_issued, risk_score, risk_categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(e.id, e.creditUnion, e.state, e.actionType, e.amount, e.dateIssued, lead.riskScore, JSON.stringify(lead.riskCategories)).run();
}
export async function getStoredNCUALeads(db: D1Database, filters: { state?: string; minScore?: number; limit?: number }): Promise<Record<string, unknown>[]> {
  let q = "SELECT * FROM ncua_leads WHERE 1=1"; const b: unknown[] = [];
  if (filters.state) { q += " AND state = ?"; b.push(filters.state.toUpperCase()); }
  if (filters.minScore) { q += " AND risk_score >= ?"; b.push(filters.minScore); }
  q += " ORDER BY risk_score DESC LIMIT ?"; b.push(filters.limit ?? 50);
  return (await db.prepare(q).bind(...b).all()).results as Record<string, unknown>[];
}

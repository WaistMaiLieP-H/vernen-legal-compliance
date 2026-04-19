/**
 * TTB Intelligence Service — Alcohol/Tobacco Tax Enforcement Pipeline
 *
 * Covers permit revocations, label violations, trade practice enforcement.
 * Source: ttb.gov, regulations.gov
 */

import type { Env } from "../index.js";

export interface TTBEnforcement { id: string; permitHolder: string; permitType: string; state: string; actionType: string; violationType: string; amount: number; dateIssued: string; description: string; status: string; }
export interface TTBComplianceLead { enforcement: TTBEnforcement; riskScore: number; riskCategories: string[]; recommendedServices: string[]; estimatedRemediation: string; }
export interface TTBSearchFilters { state?: string; permitType?: string; limit?: number; }
export interface TTBPipelineResult { leads: TTBComplianceLead[]; totalMatched: number; filters: TTBSearchFilters; generatedAt: string; source: string; }

export class TTBIntelligenceService {
  async fetchEnforcementActions(filters: TTBSearchFilters = {}): Promise<{ actions: TTBEnforcement[]; total: number }> {
    // Primary: TTB permits online data (COLA/permit search)
    try {
      const url = new URL("https://ttbonline.gov/colasonline/API/COLADetail");
      url.searchParams.set("pageSize", String(filters.limit ?? 50));
      url.searchParams.set("pageNumber", "1");
      if (filters.state) url.searchParams.set("originState", filters.state.toUpperCase());
      const response = await fetch(url.toString(), { headers: { "Accept": "application/json" } });
      if (!response.ok) { console.error(`TTB Online API error: ${response.status}`); return this.fallbackFetch(filters); }
      const data = await response.json() as { results?: Record<string, unknown>[]; totalCount?: number } | Record<string, unknown>[];
      const results = Array.isArray(data) ? data : (data.results ?? []);
      if (results.length === 0) return this.fallbackFetch(filters);
      const actions = results.map((r: Record<string, unknown>) => ({
        id: String(r["ttbId"] ?? r["permitId"] ?? r["colaId"] ?? `ttb-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
        permitHolder: String(r["applicantName"] ?? r["permitHolder"] ?? r["brandName"] ?? "Unknown"),
        permitType: String(r["permitType"] ?? r["beverageType"] ?? ""),
        state: String(r["originState"] ?? r["state"] ?? ""),
        actionType: String(r["status"] ?? r["actionType"] ?? "Permit"),
        violationType: classifyTTB(String(r["status"] ?? "") + " " + String(r["description"] ?? "")),
        amount: Number(r["amount"] ?? 0),
        dateIssued: String(r["completedDate"] ?? r["issueDate"] ?? ""),
        description: String(r["brandName"] ?? r["description"] ?? ""),
        status: String(r["status"] ?? "Active"),
      } as TTBEnforcement));
      return { actions, total: (data as { totalCount?: number }).totalCount ?? actions.length };
    } catch (e) { console.error(`TTB Online API failed: ${e}`); return this.fallbackFetch(filters); }
  }

  private async fallbackFetch(filters: TTBSearchFilters): Promise<{ actions: TTBEnforcement[]; total: number }> {
    try {
      const url = new URL("https://www.regulations.gov/api/v4/documents");
      url.searchParams.set("filter[agencyId]", "TTB"); url.searchParams.set("sort", "-postedDate");
      url.searchParams.set("page[size]", String(filters.limit ?? 50));
      const response = await fetch(url.toString(), { headers: { "Accept": "application/vnd.api+json" } });
      if (!response.ok) { console.error(`TTB regulations.gov fallback error: ${response.status}`); return { actions: [], total: 0 }; }
      const data = await response.json() as { data?: Record<string, unknown>[]; meta?: { totalElements?: number } };
      const actions = (data.data ?? []).map((r: Record<string, unknown>) => {
        const a = (r["attributes"] ?? r) as Record<string, unknown>;
        return { id: String(r["id"] ?? `ttb-${Date.now()}`), permitHolder: String(a["title"] ?? "Unknown").split(/[–—-]/)[0]?.trim() || "Unknown", permitType: String(a["subtype"] ?? ""), state: String(a["stateProvince"] ?? ""), actionType: String(a["documentType"] ?? "Enforcement"), violationType: classifyTTB(String(a["title"] ?? "") + " " + String(a["summary"] ?? "")), amount: 0, dateIssued: String(a["postedDate"] ?? ""), description: String(a["summary"] ?? ""), status: "Active" } as TTBEnforcement;
      });
      return { actions, total: data.meta?.totalElements ?? actions.length };
    } catch { return { actions: [], total: 0 }; }
  }

  scoreComplianceRisk(e: TTBEnforcement): TTBComplianceLead {
    let riskScore = 0; const riskCategories: string[] = []; const recommendedServices: string[] = [];
    const vt = (e.violationType + " " + e.description).toLowerCase();
    if (vt.includes("revoc")) { riskScore += 40; riskCategories.push("Permit Revocation"); recommendedServices.push("TTB Permit Reinstatement"); }
    if (vt.includes("label")) { riskScore += 15; riskCategories.push("Labeling Violation"); recommendedServices.push("TTB Label Compliance (COLA)"); }
    if (vt.includes("trade practice") || vt.includes("tied house")) { riskScore += 20; riskCategories.push("Trade Practice Violation"); recommendedServices.push("Trade Practice Compliance Program"); }
    if (vt.includes("tax") || vt.includes("excise")) { riskScore += 25; riskCategories.push("Excise Tax Violation"); recommendedServices.push("Federal Excise Tax Compliance"); }
    if (vt.includes("diversion")) { riskScore += 20; riskCategories.push("Product Diversion"); }
    riskScore = Math.min(riskScore, 100);
    return { enforcement: e, riskScore, riskCategories, recommendedServices: [...new Set(recommendedServices)], estimatedRemediation: riskScore >= 50 ? "6-12 months TTB compliance" : "1-6 months permit review" };
  }

  async runPipeline(db: D1Database, filters: TTBSearchFilters = {}): Promise<TTBPipelineResult> {
    await ensureTTBTables(db); const { actions, total } = await this.fetchEnforcementActions(filters);
    const leads: TTBComplianceLead[] = [];
    for (const a of actions) { const l = this.scoreComplianceRisk(a); leads.push(l); await storeTTBLead(db, l); }
    leads.sort((a, b) => b.riskScore - a.riskScore);
    return { leads, totalMatched: total, filters, generatedAt: new Date().toISOString(), source: "TTB Enforcement (ttb.gov / regulations.gov)" };
  }
}

export async function ensureTTBTables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS ttb_leads (id TEXT PRIMARY KEY, permit_holder TEXT NOT NULL, state TEXT, action_type TEXT, violation_type TEXT, amount REAL DEFAULT 0, date_issued TEXT, risk_score INTEGER DEFAULT 0, risk_categories TEXT DEFAULT '[]', created_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_ttb_leads_score ON ttb_leads(risk_score DESC)"),
  ]);
}
export async function storeTTBLead(db: D1Database, lead: TTBComplianceLead): Promise<void> {
  const e = lead.enforcement;
  await db.prepare("INSERT OR REPLACE INTO ttb_leads (id, permit_holder, state, action_type, violation_type, amount, date_issued, risk_score, risk_categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(e.id, e.permitHolder, e.state, e.actionType, e.violationType, e.amount, e.dateIssued, lead.riskScore, JSON.stringify(lead.riskCategories)).run();
}
export async function getStoredTTBLeads(db: D1Database, filters: { state?: string; minScore?: number; limit?: number }): Promise<Record<string, unknown>[]> {
  let q = "SELECT * FROM ttb_leads WHERE 1=1"; const b: unknown[] = [];
  if (filters.state) { q += " AND state = ?"; b.push(filters.state.toUpperCase()); }
  if (filters.minScore) { q += " AND risk_score >= ?"; b.push(filters.minScore); }
  q += " ORDER BY risk_score DESC LIMIT ?"; b.push(filters.limit ?? 50);
  return (await db.prepare(q).bind(...b).all()).results as Record<string, unknown>[];
}

function classifyTTB(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("revoc")) return "Revocation"; if (t.includes("label")) return "Labeling";
  if (t.includes("trade")) return "Trade Practice"; if (t.includes("tax") || t.includes("excise")) return "Excise Tax";
  return "General";
}

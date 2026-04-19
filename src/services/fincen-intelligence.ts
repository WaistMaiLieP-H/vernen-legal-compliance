/**
 * FinCEN Intelligence Service — Anti-Money Laundering Enforcement Pipeline
 *
 * Covers BSA/AML violations, MSB enforcement, SAR deficiencies.
 * Source: fincen.gov enforcement actions
 */

import type { Env } from "../index.js";

export interface FinCENEnforcement { id: string; entityName: string; entityType: string; state: string; actionType: string; violationType: string; amount: number; dateIssued: string; description: string; status: string; }
export interface FinCENComplianceLead { enforcement: FinCENEnforcement; riskScore: number; riskCategories: string[]; recommendedServices: string[]; estimatedRemediation: string; }
export interface FinCENSearchFilters { violationType?: string; entityName?: string; limit?: number; }
export interface FinCENPipelineResult { leads: FinCENComplianceLead[]; totalMatched: number; filters: FinCENSearchFilters; generatedAt: string; source: string; }

export class FinCENIntelligenceService {
  async fetchEnforcementActions(filters: FinCENSearchFilters = {}): Promise<{ actions: FinCENEnforcement[]; total: number }> {
    // Primary: FinCEN enforcement actions data feed
    try {
      const url = new URL("https://www.fincen.gov/sites/default/files/enforcement_action/data.json");
      const response = await fetch(url.toString(), { headers: { "Accept": "application/json" } });
      if (!response.ok) { console.error(`FinCEN direct API error: ${response.status}`); return this.fallbackFetch(filters); }
      const data = await response.json() as Record<string, unknown>[] | { results?: Record<string, unknown>[] };
      const results = Array.isArray(data) ? data : (data.results ?? []);
      if (results.length === 0) return this.fallbackFetch(filters);
      const actions = results.slice(0, filters.limit ?? 50).map((r: Record<string, unknown>) => ({
        id: String(r["id"] ?? r["case_number"] ?? `fincen-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
        entityName: String(r["entity_name"] ?? r["respondent"] ?? r["title"] ?? "Unknown"),
        entityType: String(r["entity_type"] ?? r["type"] ?? ""),
        state: String(r["state"] ?? ""),
        actionType: String(r["action_type"] ?? "Enforcement"),
        violationType: classifyFinCEN(String(r["violation_type"] ?? r["description"] ?? "")),
        amount: Number(r["penalty_amount"] ?? r["amount"] ?? 0),
        dateIssued: String(r["date"] ?? r["action_date"] ?? ""),
        description: String(r["description"] ?? r["summary"] ?? ""),
        status: String(r["status"] ?? "Active"),
      } as FinCENEnforcement));
      return { actions, total: actions.length };
    } catch (e) { console.error(`FinCEN direct API failed: ${e}`); return this.fallbackFetch(filters); }
  }

  private async fallbackFetch(filters: FinCENSearchFilters): Promise<{ actions: FinCENEnforcement[]; total: number }> {
    try {
      const url = new URL("https://www.regulations.gov/api/v4/documents");
      url.searchParams.set("filter[agencyId]", "FINCEN"); url.searchParams.set("sort", "-postedDate");
      url.searchParams.set("page[size]", String(filters.limit ?? 50));
      if (filters.entityName) url.searchParams.set("filter[searchTerm]", filters.entityName);
      const response = await fetch(url.toString(), { headers: { "Accept": "application/vnd.api+json" } });
      if (!response.ok) { console.error(`FinCEN regulations.gov fallback error: ${response.status}`); return { actions: [], total: 0 }; }
      const data = await response.json() as { data?: Record<string, unknown>[]; meta?: { totalElements?: number } };
      const actions = (data.data ?? []).map((r: Record<string, unknown>) => {
        const a = (r["attributes"] ?? r) as Record<string, unknown>;
        return { id: String(r["id"] ?? `fincen-${Date.now()}`), entityName: String(a["title"] ?? "Unknown").split(/[–—-]/)[0]?.trim() || "Unknown", entityType: "", state: String(a["stateProvince"] ?? ""), actionType: String(a["documentType"] ?? "Enforcement"), violationType: classifyFinCEN(String(a["summary"] ?? "")), amount: 0, dateIssued: String(a["postedDate"] ?? ""), description: String(a["summary"] ?? ""), status: "Active" } as FinCENEnforcement;
      });
      return { actions, total: data.meta?.totalElements ?? actions.length };
    } catch { return { actions: [], total: 0 }; }
  }

  scoreComplianceRisk(e: FinCENEnforcement): FinCENComplianceLead {
    let riskScore = 0; const riskCategories: string[] = []; const recommendedServices: string[] = [];
    if (e.amount >= 10000000) { riskScore += 40; riskCategories.push(`Major FinCEN Penalty — $${(e.amount / 1000000).toFixed(0)}M`); }
    else if (e.amount >= 1000000) { riskScore += 30; riskCategories.push(`FinCEN Penalty — $${(e.amount / 1000000).toFixed(1)}M`); }
    else if (e.amount >= 100000) { riskScore += 20; }

    const vt = (e.violationType + " " + e.description).toLowerCase();
    if (vt.includes("bsa") || vt.includes("bank secrecy")) { riskScore += 25; riskCategories.push("BSA Violation"); recommendedServices.push("BSA/AML Compliance Program Development"); }
    if (vt.includes("sar") || vt.includes("suspicious activity")) { riskScore += 20; riskCategories.push("SAR Filing Deficiency"); recommendedServices.push("SAR Filing Compliance Review"); }
    if (vt.includes("ctr") || vt.includes("currency transaction")) { riskScore += 15; riskCategories.push("CTR Violation"); recommendedServices.push("CTR/Cash Reporting Compliance"); }
    if (vt.includes("cdd") || vt.includes("customer due diligence") || vt.includes("kyc")) { riskScore += 15; riskCategories.push("CDD/KYC Deficiency"); recommendedServices.push("Customer Due Diligence Program"); }
    if (vt.includes("msb") || vt.includes("money service")) { riskScore += 15; riskCategories.push("MSB Registration/Compliance"); recommendedServices.push("MSB Registration & Compliance"); }

    riskScore = Math.min(riskScore, 100);
    return { enforcement: e, riskScore, riskCategories, recommendedServices: [...new Set(recommendedServices)], estimatedRemediation: riskScore >= 50 ? "6-18 months AML compliance program" : "3-6 months BSA review" };
  }

  async runPipeline(db: D1Database, filters: FinCENSearchFilters = {}): Promise<FinCENPipelineResult> {
    await ensureFinCENTables(db); const { actions, total } = await this.fetchEnforcementActions(filters);
    const leads: FinCENComplianceLead[] = [];
    for (const a of actions) { const l = this.scoreComplianceRisk(a); leads.push(l); await storeFinCENLead(db, l); }
    leads.sort((a, b) => b.riskScore - a.riskScore);
    return { leads, totalMatched: total, filters, generatedAt: new Date().toISOString(), source: "FinCEN BSA/AML Enforcement (fincen.gov)" };
  }
}

export async function ensureFinCENTables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS fincen_leads (id TEXT PRIMARY KEY, entity_name TEXT NOT NULL, state TEXT, violation_type TEXT, amount REAL DEFAULT 0, date_issued TEXT, risk_score INTEGER DEFAULT 0, risk_categories TEXT DEFAULT '[]', created_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_fincen_leads_score ON fincen_leads(risk_score DESC)"),
  ]);
}
export async function storeFinCENLead(db: D1Database, lead: FinCENComplianceLead): Promise<void> {
  const e = lead.enforcement;
  await db.prepare("INSERT OR REPLACE INTO fincen_leads (id, entity_name, state, violation_type, amount, date_issued, risk_score, risk_categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(e.id, e.entityName, e.state, e.violationType, e.amount, e.dateIssued, lead.riskScore, JSON.stringify(lead.riskCategories)).run();
}
export async function getStoredFinCENLeads(db: D1Database, filters: { violationType?: string; minScore?: number; limit?: number }): Promise<Record<string, unknown>[]> {
  let q = "SELECT * FROM fincen_leads WHERE 1=1"; const b: unknown[] = [];
  if (filters.violationType) { q += " AND violation_type LIKE ?"; b.push(`%${filters.violationType}%`); }
  if (filters.minScore) { q += " AND risk_score >= ?"; b.push(filters.minScore); }
  q += " ORDER BY risk_score DESC LIMIT ?"; b.push(filters.limit ?? 50);
  return (await db.prepare(q).bind(...b).all()).results as Record<string, unknown>[];
}

function classifyFinCEN(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("bsa")) return "BSA"; if (t.includes("sar")) return "SAR"; if (t.includes("ctr")) return "CTR";
  if (t.includes("cdd") || t.includes("kyc")) return "CDD/KYC"; if (t.includes("msb")) return "MSB"; return "General";
}

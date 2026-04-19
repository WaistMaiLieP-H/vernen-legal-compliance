/**
 * OCC Intelligence Service — National Bank Enforcement Pipeline
 *
 * Covers bank enforcement actions, consent orders, CMPs, cease & desist.
 * Source: occ.gov enforcement actions database
 */

import type { Env } from "../index.js";

export interface OCCEnforcement { id: string; bankName: string; charterNumber: string; state: string; city: string; actionType: string; violationType: string; amount: number; dateIssued: string; description: string; status: string; }
export interface OCCComplianceLead { enforcement: OCCEnforcement; riskScore: number; riskCategories: string[]; recommendedServices: string[]; estimatedRemediation: string; }
export interface OCCSearchFilters { state?: string; actionType?: string; bankName?: string; limit?: number; }
export interface OCCPipelineResult { leads: OCCComplianceLead[]; totalMatched: number; filters: OCCSearchFilters; generatedAt: string; source: string; }

const OCC_ENFORCEMENT_URL = "https://apps.occ.gov/EASearch/api/enforcement-actions";

export class OCCIntelligenceService {
  async fetchEnforcementActions(filters: OCCSearchFilters = {}): Promise<{ actions: OCCEnforcement[]; total: number }> {
    // Try OCC enforcement search API
    try {
      const url = new URL(OCC_ENFORCEMENT_URL);
      url.searchParams.set("pageSize", String(filters.limit ?? 50));
      if (filters.state) url.searchParams.set("state", filters.state.toUpperCase());
      if (filters.bankName) url.searchParams.set("bankName", filters.bankName);
      const response = await fetch(url.toString(), { headers: { "Accept": "application/json" } });
      if (!response.ok) return this.fallbackFetch(filters);
      const data = await response.json() as { results?: Record<string, unknown>[]; totalCount?: number };
      const actions = (data.results ?? []).map(mapToOCC);
      return { actions, total: data.totalCount ?? actions.length };
    } catch { return this.fallbackFetch(filters); }
  }

  private async fallbackFetch(filters: OCCSearchFilters): Promise<{ actions: OCCEnforcement[]; total: number }> {
    try {
      const url = new URL("https://www.regulations.gov/api/v4/documents");
      url.searchParams.set("filter[agencyId]", "OCC"); url.searchParams.set("sort", "-postedDate");
      url.searchParams.set("page[size]", String(filters.limit ?? 50));
      const response = await fetch(url.toString(), { headers: { "Accept": "application/vnd.api+json" } });
      if (!response.ok) return { actions: [], total: 0 };
      const data = await response.json() as { data?: Record<string, unknown>[]; meta?: { totalElements?: number } };
      const actions = (data.data ?? []).map((r: Record<string, unknown>) => {
        const a = (r["attributes"] ?? r) as Record<string, unknown>;
        return { id: String(r["id"] ?? `occ-${Date.now()}`), bankName: String(a["title"] ?? "Unknown").split(/[–—-]/)[0]?.trim() || "Unknown", charterNumber: "", state: String(a["stateProvince"] ?? ""), city: "", actionType: String(a["documentType"] ?? ""), violationType: "", amount: 0, dateIssued: String(a["postedDate"] ?? ""), description: String(a["summary"] ?? ""), status: "Active" } as OCCEnforcement;
      });
      return { actions, total: data.meta?.totalElements ?? actions.length };
    } catch { return { actions: [], total: 0 }; }
  }

  scoreComplianceRisk(e: OCCEnforcement): OCCComplianceLead {
    let riskScore = 0; const riskCategories: string[] = []; const recommendedServices: string[] = [];
    const at = (e.actionType + " " + e.description).toLowerCase();
    if (at.includes("cease and desist") || at.includes("c&d")) { riskScore += 35; riskCategories.push("Cease & Desist Order"); recommendedServices.push("OCC Consent Order Compliance"); }
    if (at.includes("civil money penalty") || at.includes("cmp")) { riskScore += 25; riskCategories.push("Civil Money Penalty"); recommendedServices.push("OCC CMP Response & Mitigation"); }
    if (at.includes("removal") || at.includes("prohibition")) { riskScore += 30; riskCategories.push("Removal/Prohibition Order"); }
    if (at.includes("consent")) { riskScore += 20; riskCategories.push("Consent Order"); }
    if (at.includes("formal agreement")) { riskScore += 15; riskCategories.push("Formal Agreement"); }
    if (e.amount >= 10000000) { riskScore += 15; riskCategories.push(`Major Penalty — $${(e.amount / 1000000).toFixed(0)}M`); }
    else if (e.amount >= 1000000) { riskScore += 10; }

    const desc = e.description.toLowerCase();
    if (desc.includes("bsa") || desc.includes("aml")) { recommendedServices.push("BSA/AML Compliance Program"); }
    if (desc.includes("fair lending") || desc.includes("cra")) { recommendedServices.push("Fair Lending & CRA Compliance"); }
    if (desc.includes("cybersecurity") || desc.includes("information security")) { recommendedServices.push("Bank IT/Cybersecurity Compliance"); }
    recommendedServices.push("OCC Examination Preparation");

    riskScore = Math.min(riskScore, 100);
    return { enforcement: e, riskScore, riskCategories, recommendedServices: [...new Set(recommendedServices)], estimatedRemediation: riskScore >= 50 ? "6-18 months bank compliance remediation" : "3-6 months OCC review" };
  }

  async runPipeline(db: D1Database, filters: OCCSearchFilters = {}): Promise<OCCPipelineResult> {
    await ensureOCCTables(db); const { actions, total } = await this.fetchEnforcementActions(filters);
    const leads: OCCComplianceLead[] = [];
    for (const a of actions) { const l = this.scoreComplianceRisk(a); leads.push(l); await storeOCCLead(db, l); }
    leads.sort((a, b) => b.riskScore - a.riskScore);
    return { leads, totalMatched: total, filters, generatedAt: new Date().toISOString(), source: "OCC Bank Enforcement (occ.gov)" };
  }
}

export async function ensureOCCTables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS occ_leads (id TEXT PRIMARY KEY, bank_name TEXT NOT NULL, state TEXT, action_type TEXT, amount REAL DEFAULT 0, date_issued TEXT, risk_score INTEGER DEFAULT 0, risk_categories TEXT DEFAULT '[]', created_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_occ_leads_score ON occ_leads(risk_score DESC)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_occ_leads_state ON occ_leads(state)"),
  ]);
}
export async function storeOCCLead(db: D1Database, lead: OCCComplianceLead): Promise<void> {
  const e = lead.enforcement;
  await db.prepare("INSERT OR REPLACE INTO occ_leads (id, bank_name, state, action_type, amount, date_issued, risk_score, risk_categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(e.id, e.bankName, e.state, e.actionType, e.amount, e.dateIssued, lead.riskScore, JSON.stringify(lead.riskCategories)).run();
}
export async function getStoredOCCLeads(db: D1Database, filters: { state?: string; minScore?: number; limit?: number }): Promise<Record<string, unknown>[]> {
  let q = "SELECT * FROM occ_leads WHERE 1=1"; const b: unknown[] = [];
  if (filters.state) { q += " AND state = ?"; b.push(filters.state.toUpperCase()); }
  if (filters.minScore) { q += " AND risk_score >= ?"; b.push(filters.minScore); }
  q += " ORDER BY risk_score DESC LIMIT ?"; b.push(filters.limit ?? 50);
  return (await db.prepare(q).bind(...b).all()).results as Record<string, unknown>[];
}

function mapToOCC(r: Record<string, unknown>): OCCEnforcement {
  return { id: String(r["id"] ?? r["docketNumber"] ?? `occ-${Date.now()}`), bankName: String(r["bankName"] ?? r["institutionName"] ?? "Unknown"), charterNumber: String(r["charterNumber"] ?? ""), state: String(r["state"] ?? ""), city: String(r["city"] ?? ""), actionType: String(r["actionType"] ?? r["type"] ?? ""), violationType: String(r["violationType"] ?? ""), amount: Number(r["amount"] ?? r["penaltyAmount"] ?? 0), dateIssued: String(r["actionDate"] ?? r["date"] ?? ""), description: String(r["description"] ?? r["summary"] ?? ""), status: String(r["status"] ?? "Active") };
}

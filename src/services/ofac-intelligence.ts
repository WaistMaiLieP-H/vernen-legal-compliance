/**
 * OFAC Intelligence Service — Sanctions Enforcement Pipeline
 *
 * Covers SDN list monitoring, sanctions violations, civil penalties.
 * Source: ofac.treasury.gov, sanctionssearch.ofac.treas.gov
 */

import type { Env } from "../index.js";

export interface OFACEnforcement { id: string; entityName: string; entityType: string; program: string; actionType: string; amount: number; dateIssued: string; description: string; sdnType: string; country: string; status: string; }
export interface OFACComplianceLead { enforcement: OFACEnforcement; riskScore: number; riskCategories: string[]; recommendedServices: string[]; estimatedRemediation: string; }
export interface OFACSearchFilters { program?: string; entityName?: string; limit?: number; }
export interface OFACPipelineResult { leads: OFACComplianceLead[]; totalMatched: number; filters: OFACSearchFilters; generatedAt: string; source: string; }

const OFAC_SDN_URL = "https://sanctionssearch.ofac.treas.gov/api/search";
const OFAC_ACTIONS_URL = "https://www.regulations.gov/api/v4/documents";

export class OFACIntelligenceService {
  async fetchEnforcementActions(filters: OFACSearchFilters = {}): Promise<{ actions: OFACEnforcement[]; total: number }> {
    // Primary: OFAC SDN search API
    try {
      const response = await fetch(OFAC_SDN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ query: filters.entityName ?? "*", pageSize: filters.limit ?? 50 }),
      });
      if (!response.ok) { console.error(`OFAC SDN API error: ${response.status}`); return this.fallbackFetch(filters); }
      const data = await response.json() as { results?: Record<string, unknown>[]; totalResults?: number };
      const actions = (data.results ?? []).map((r: Record<string, unknown>) => ({
        id: String(r["id"] ?? r["entityNumber"] ?? `ofac-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
        entityName: String(r["name"] ?? r["lastName"] ?? "Unknown"),
        entityType: String(r["type"] ?? r["sdnType"] ?? ""),
        program: String((Array.isArray(r["programs"]) ? r["programs"][0] : r["program"]) ?? classifyOFACProgram(String(r["remarks"] ?? ""))),
        actionType: "SDN Designation",
        amount: 0,
        dateIssued: String(r["publishDate"] ?? r["dateAdded"] ?? ""),
        description: String(r["remarks"] ?? r["title"] ?? ""),
        sdnType: String(r["sdnType"] ?? r["type"] ?? ""),
        country: String(r["country"] ?? (Array.isArray(r["addresses"]) ? (r["addresses"][0] as Record<string, unknown>)?.["country"] : "") ?? ""),
        status: "Active",
      } as OFACEnforcement));
      return { actions, total: data.totalResults ?? actions.length };
    } catch (e) { console.error(`OFAC SDN API failed: ${e}`); return this.fallbackFetch(filters); }
  }

  private async fallbackFetch(filters: OFACSearchFilters): Promise<{ actions: OFACEnforcement[]; total: number }> {
    try {
      const url = new URL(OFAC_ACTIONS_URL);
      url.searchParams.set("filter[agencyId]", "TREAS"); url.searchParams.set("filter[searchTerm]", filters.entityName ?? "OFAC sanctions");
      url.searchParams.set("sort", "-postedDate"); url.searchParams.set("page[size]", String(filters.limit ?? 50));
      const response = await fetch(url.toString(), { headers: { "Accept": "application/vnd.api+json" } });
      if (!response.ok) { console.error(`OFAC regulations.gov fallback error: ${response.status}`); return { actions: [], total: 0 }; }
      const data = await response.json() as { data?: Record<string, unknown>[]; meta?: { totalElements?: number } };
      const actions = (data.data ?? []).map((r: Record<string, unknown>) => {
        const a = (r["attributes"] ?? r) as Record<string, unknown>;
        return { id: String(r["id"] ?? `ofac-${Date.now()}`), entityName: String(a["title"] ?? "Unknown").split(/[–—-]/)[0]?.trim() || "Unknown", entityType: "", program: classifyOFACProgram(String(a["summary"] ?? "")), actionType: String(a["documentType"] ?? "Enforcement"), amount: 0, dateIssued: String(a["postedDate"] ?? ""), description: String(a["summary"] ?? ""), sdnType: "", country: "", status: "Active" } as OFACEnforcement;
      });
      return { actions, total: data.meta?.totalElements ?? actions.length };
    } catch { return { actions: [], total: 0 }; }
  }

  scoreComplianceRisk(e: OFACEnforcement): OFACComplianceLead {
    let riskScore = 0; const riskCategories: string[] = []; const recommendedServices: string[] = [];
    if (e.amount >= 10000000) { riskScore += 40; riskCategories.push(`Major OFAC Penalty — $${(e.amount / 1000000).toFixed(0)}M`); }
    else if (e.amount >= 1000000) { riskScore += 30; riskCategories.push(`OFAC Penalty — $${(e.amount / 1000000).toFixed(1)}M`); }
    else if (e.amount >= 100000) { riskScore += 20; }

    const desc = (e.program + " " + e.description).toLowerCase();
    if (desc.includes("iran") || desc.includes("north korea") || desc.includes("russia")) { riskScore += 20; riskCategories.push("Primary Sanctions Program"); recommendedServices.push("OFAC Sanctions Compliance Program"); }
    if (desc.includes("sdn")) { riskScore += 25; riskCategories.push("SDN List Violation"); recommendedServices.push("SDN Screening Implementation"); }
    if (desc.includes("voluntary self-disclosure")) { riskScore -= 10; riskCategories.push("Voluntary Self-Disclosure (mitigating)"); }
    recommendedServices.push("OFAC Risk Assessment & Compliance Framework");

    riskScore = Math.min(Math.max(riskScore, 0), 100);
    return { enforcement: e, riskScore, riskCategories, recommendedServices: [...new Set(recommendedServices)], estimatedRemediation: riskScore >= 50 ? "6-18 months sanctions compliance" : "3-6 months OFAC review" };
  }

  async runPipeline(db: D1Database, filters: OFACSearchFilters = {}): Promise<OFACPipelineResult> {
    await ensureOFACTables(db); const { actions, total } = await this.fetchEnforcementActions(filters);
    const leads: OFACComplianceLead[] = [];
    for (const a of actions) { const l = this.scoreComplianceRisk(a); leads.push(l); await storeOFACLead(db, l); }
    leads.sort((a, b) => b.riskScore - a.riskScore);
    return { leads, totalMatched: total, filters, generatedAt: new Date().toISOString(), source: "OFAC Sanctions Enforcement (treasury.gov)" };
  }
}

export async function ensureOFACTables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS ofac_leads (id TEXT PRIMARY KEY, entity_name TEXT NOT NULL, program TEXT, action_type TEXT, amount REAL DEFAULT 0, date_issued TEXT, risk_score INTEGER DEFAULT 0, risk_categories TEXT DEFAULT '[]', created_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_ofac_leads_score ON ofac_leads(risk_score DESC)"),
  ]);
}
export async function storeOFACLead(db: D1Database, lead: OFACComplianceLead): Promise<void> {
  const e = lead.enforcement;
  await db.prepare("INSERT OR REPLACE INTO ofac_leads (id, entity_name, program, action_type, amount, date_issued, risk_score, risk_categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(e.id, e.entityName, e.program, e.actionType, e.amount, e.dateIssued, lead.riskScore, JSON.stringify(lead.riskCategories)).run();
}
export async function getStoredOFACLeads(db: D1Database, filters: { program?: string; minScore?: number; limit?: number }): Promise<Record<string, unknown>[]> {
  let q = "SELECT * FROM ofac_leads WHERE 1=1"; const b: unknown[] = [];
  if (filters.program) { q += " AND program LIKE ?"; b.push(`%${filters.program}%`); }
  if (filters.minScore) { q += " AND risk_score >= ?"; b.push(filters.minScore); }
  q += " ORDER BY risk_score DESC LIMIT ?"; b.push(filters.limit ?? 50);
  return (await db.prepare(q).bind(...b).all()).results as Record<string, unknown>[];
}

function classifyOFACProgram(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("iran")) return "Iran"; if (t.includes("russia")) return "Russia"; if (t.includes("north korea")) return "North Korea";
  if (t.includes("cuba")) return "Cuba"; if (t.includes("syria")) return "Syria"; if (t.includes("narco")) return "Narcotics";
  return "General";
}

/**
 * DCMA Intelligence Service — Defense Contractor Compliance Pipeline
 *
 * Connects to defense contractor performance and compliance data
 * including CPARS ratings, corrective action requests, and
 * contractor responsibility determinations.
 *
 * Source: sam.gov contract data, regulations.gov DOD actions
 */

import type { Env } from "../index.js";

export interface DCMAEnforcement {
  id: string;
  contractor: string;
  contractNumber: string;
  state: string;
  actionType: string;
  deficiencyArea: string;
  severity: string;
  dateIssued: string;
  description: string;
  status: string;
}

export interface DCMAComplianceLead {
  enforcement: DCMAEnforcement;
  riskScore: number;
  riskCategories: string[];
  recommendedServices: string[];
  estimatedRemediation: string;
}

export interface DCMASearchFilters { state?: string; contractor?: string; deficiencyArea?: string; limit?: number; }
export interface DCMAPipelineResult { leads: DCMAComplianceLead[]; totalMatched: number; filters: DCMASearchFilters; generatedAt: string; source: string; }

const DOD_REGS_URL = "https://www.regulations.gov/api/v4/documents";

export class DCMAIntelligenceService {
  async fetchEnforcementActions(filters: DCMASearchFilters = {}): Promise<{ actions: DCMAEnforcement[]; total: number }> {
    // Primary: SAM.gov Entity Exclusions API (defense contractor exclusions)
    try {
      const url = new URL("https://api.sam.gov/entity-information/v3/exclusions");
      url.searchParams.set("api_key", "DEMO_KEY");
      url.searchParams.set("limit", String(filters.limit ?? 50));
      url.searchParams.set("classificationType", "Firm");
      if (filters.state) url.searchParams.set("stateProvince", filters.state.toUpperCase());
      if (filters.contractor) url.searchParams.set("q", filters.contractor);
      const response = await fetch(url.toString(), { headers: { "Accept": "application/json" } });
      if (!response.ok) { console.error(`SAM.gov exclusions API error: ${response.status}`); return this.fallbackFetch(filters); }
      const data = await response.json() as { results?: Record<string, unknown>[]; totalRecords?: number };
      const results = data.results ?? [];
      if (results.length === 0) return this.fallbackFetch(filters);
      const actions = results.map((r: Record<string, unknown>) => ({
        id: String(r["uniqueEntityId"] ?? r["ueiSAM"] ?? `dcma-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
        contractor: String(r["firmName"] ?? r["entityName"] ?? "Unknown"),
        contractNumber: String(r["cageCode"] ?? ""),
        state: String(r["stateProvince"] ?? ""),
        actionType: String(r["exclusionType"] ?? "Exclusion"),
        deficiencyArea: classifyDCMAArea(String(r["exclusionType"] ?? "") + " " + String(r["description"] ?? "")),
        severity: String(r["exclusionType"] ?? ""),
        dateIssued: String(r["activeDateFrom"] ?? r["createDate"] ?? ""),
        description: String(r["description"] ?? r["exclusionType"] ?? ""),
        status: String(r["activeStatus"] ?? "Active"),
      } as DCMAEnforcement));
      return { actions, total: data.totalRecords ?? actions.length };
    } catch (e) { console.error(`SAM.gov exclusions API failed: ${e}`); return this.fallbackFetch(filters); }
  }

  private async fallbackFetch(filters: DCMASearchFilters): Promise<{ actions: DCMAEnforcement[]; total: number }> {
    try {
      const url = new URL(DOD_REGS_URL);
      url.searchParams.set("filter[agencyId]", "DOD");
      url.searchParams.set("sort", "-postedDate");
      url.searchParams.set("page[size]", String(filters.limit ?? 50));
      if (filters.contractor) url.searchParams.set("filter[searchTerm]", filters.contractor);
      const response = await fetch(url.toString(), { headers: { "Accept": "application/vnd.api+json" } });
      if (!response.ok) { console.error(`DCMA regulations.gov fallback error: ${response.status}`); return { actions: [], total: 0 }; }
      const data = await response.json() as { data?: Record<string, unknown>[]; meta?: { totalElements?: number } };
      const actions = (data.data ?? []).map(mapToDCMAEnforcement);
      return { actions, total: data.meta?.totalElements ?? actions.length };
    } catch { return { actions: [], total: 0 }; }
  }

  scoreComplianceRisk(enforcement: DCMAEnforcement): DCMAComplianceLead {
    let riskScore = 0; const riskCategories: string[] = []; const recommendedServices: string[] = [];

    const area = (enforcement.deficiencyArea + " " + enforcement.description).toLowerCase();
    if (area.includes("quality") || area.includes("nonconform")) {
      riskScore += 25; riskCategories.push("Quality System Deficiency");
      recommendedServices.push("AS9100/ISO 9001 Quality System Remediation");
    }
    if (area.includes("cybersecurity") || area.includes("cmmc") || area.includes("nist 800")) {
      riskScore += 30; riskCategories.push("Cybersecurity/CMMC Deficiency");
      recommendedServices.push("CMMC Certification Preparation");
    }
    if (area.includes("cost") || area.includes("accounting") || area.includes("cas")) {
      riskScore += 20; riskCategories.push("Cost Accounting Standards Violation");
      recommendedServices.push("DCAA Audit Preparation");
    }
    if (area.includes("delivery") || area.includes("schedule")) {
      riskScore += 15; riskCategories.push("Delivery/Schedule Deficiency");
      recommendedServices.push("Earned Value Management Compliance");
    }
    if (area.includes("itar") || area.includes("ear") || area.includes("export")) {
      riskScore += 25; riskCategories.push("Export Control (ITAR/EAR) Violation");
      recommendedServices.push("ITAR/EAR Compliance Program");
    }

    const actionType = (enforcement.actionType ?? "").toLowerCase();
    if (actionType.includes("stop work") || actionType.includes("show cause")) {
      riskScore += 20; riskCategories.push("Stop Work / Show Cause Order");
    }
    if (actionType.includes("termination")) {
      riskScore += 30; riskCategories.push("Contract Termination for Default");
      recommendedServices.push("Contract Termination Appeal (ASBCA)");
    }

    riskScore = Math.min(riskScore, 100);
    const estimatedRemediation = riskScore >= 70 ? "12-24 months defense contractor compliance" : riskScore >= 50 ? "6-12 months targeted remediation" : riskScore >= 25 ? "3-6 months compliance review" : "1-3 months audit preparation";

    return { enforcement, riskScore, riskCategories, recommendedServices: [...new Set(recommendedServices)], estimatedRemediation };
  }

  async runPipeline(db: D1Database, filters: DCMASearchFilters = {}): Promise<DCMAPipelineResult> {
    await ensureDCMATables(db);
    const { actions, total } = await this.fetchEnforcementActions(filters);
    const leads: DCMAComplianceLead[] = [];
    for (const action of actions) { const lead = this.scoreComplianceRisk(action); leads.push(lead); await storeDCMALead(db, lead); }
    leads.sort((a, b) => b.riskScore - a.riskScore);
    return { leads, totalMatched: total, filters, generatedAt: new Date().toISOString(), source: "DCMA/DOD Contractor Compliance (regulations.gov)" };
  }
}

export async function ensureDCMATables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS dcma_leads (id TEXT PRIMARY KEY, contractor TEXT NOT NULL, state TEXT, action_type TEXT, deficiency_area TEXT, date_issued TEXT, risk_score INTEGER DEFAULT 0, risk_categories TEXT DEFAULT '[]', created_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_dcma_leads_score ON dcma_leads(risk_score DESC)"),
  ]);
}

export async function storeDCMALead(db: D1Database, lead: DCMAComplianceLead): Promise<void> {
  const e = lead.enforcement;
  await db.prepare("INSERT OR REPLACE INTO dcma_leads (id, contractor, state, action_type, deficiency_area, date_issued, risk_score, risk_categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(e.id, e.contractor, e.state, e.actionType, e.deficiencyArea, e.dateIssued, lead.riskScore, JSON.stringify(lead.riskCategories)).run();
}

export async function getStoredDCMALeads(db: D1Database, filters: { state?: string; minScore?: number; limit?: number }): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM dcma_leads WHERE 1=1"; const binds: unknown[] = [];
  if (filters.state) { query += " AND state = ?"; binds.push(filters.state.toUpperCase()); }
  if (filters.minScore) { query += " AND risk_score >= ?"; binds.push(filters.minScore); }
  query += " ORDER BY risk_score DESC LIMIT ?"; binds.push(filters.limit ?? 50);
  return (await db.prepare(query).bind(...binds).all()).results as Record<string, unknown>[];
}

function mapToDCMAEnforcement(r: Record<string, unknown>): DCMAEnforcement {
  const attrs = (r["attributes"] ?? r) as Record<string, unknown>;
  return {
    id: String(r["id"] ?? `dcma-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
    contractor: String(attrs["title"] ?? "Unknown").split(/[–—-]/)[0]?.trim() || "Unknown",
    contractNumber: "", state: String(attrs["stateProvince"] ?? ""),
    actionType: String(attrs["documentType"] ?? "Enforcement"),
    deficiencyArea: classifyDCMAArea(String(attrs["title"] ?? "") + " " + String(attrs["summary"] ?? "")),
    severity: "", dateIssued: String(attrs["postedDate"] ?? ""),
    description: String(attrs["summary"] ?? ""), status: "Active",
  };
}

function classifyDCMAArea(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("cyber") || t.includes("cmmc")) return "Cybersecurity/CMMC";
  if (t.includes("quality")) return "Quality"; if (t.includes("cost") || t.includes("cas")) return "Cost Accounting";
  if (t.includes("itar") || t.includes("export")) return "Export Control"; if (t.includes("deliver")) return "Delivery";
  return "General";
}

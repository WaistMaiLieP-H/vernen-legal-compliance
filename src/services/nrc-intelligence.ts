/**
 * NRC Intelligence Service — Nuclear Regulatory Enforcement Pipeline
 *
 * Connects to NRC enforcement data covering reactor violations,
 * civil penalties, orders, and inspection findings.
 *
 * Source: nrc.gov ADAMS (public documents), regulations.gov
 */

import type { Env } from "../index.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface NRCEnforcement {
  id: string;
  licensee: string;
  facilityName: string;
  state: string;
  actionType: string;        // NOV, Civil Penalty, Order, Confirmatory Action Letter
  severity: string;           // Severity Level I-IV
  amount: number;
  dateIssued: string;
  inspectionReport: string;
  description: string;
  reactorType: string;
  docket: string;
}

export interface NRCComplianceLead {
  enforcement: NRCEnforcement;
  riskScore: number;
  riskCategories: string[];
  recommendedServices: string[];
  estimatedRemediation: string;
}

export interface NRCSearchFilters {
  state?: string;
  severity?: string;
  actionType?: string;
  limit?: number;
}

export interface NRCPipelineResult {
  leads: NRCComplianceLead[];
  totalMatched: number;
  filters: NRCSearchFilters;
  generatedAt: string;
  source: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// NRC API Client & Intelligence Service
// ═══════════════════════════════════════════════════════════════════════════

const NRC_REGS_URL = "https://www.regulations.gov/api/v4/documents";
// NRC ADAMS public documents
const NRC_ADAMS_URL = "https://adams.nrc.gov/wba/services/search/advanced/nrc";

export class NRCIntelligenceService {

  async fetchEnforcementActions(filters: NRCSearchFilters = {}): Promise<{ actions: NRCEnforcement[]; total: number }> {
    // Primary: NRC ADAMS public document search
    try {
      const url = new URL("https://adams.nrc.gov/wba/services/search/advanced/nrc");
      url.searchParams.set("q", "enforcement action");
      url.searchParams.set("rows", String(filters.limit ?? 50));
      url.searchParams.set("sort", "PublishDatePARS desc");
      if (filters.state) url.searchParams.set("fq", `state:${filters.state.toUpperCase()}`);
      const response = await fetch(url.toString(), { headers: { "Accept": "application/json" } });
      if (!response.ok) { console.error(`NRC ADAMS API error: ${response.status}`); return this.fallbackFetch(filters); }
      const data = await response.json() as { response?: { docs?: Record<string, unknown>[]; numFound?: number } };
      const docs = data.response?.docs ?? [];
      if (docs.length === 0) return this.fallbackFetch(filters);
      let actions = docs.map((r: Record<string, unknown>) => ({
        id: String(r["AccessionNumber"] ?? r["id"] ?? `nrc-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
        licensee: String(r["DocketNumber_facet"] ?? r["AuthorName"] ?? "Unknown"),
        facilityName: String(r["FacilityName"] ?? ""),
        state: String(r["state"] ?? ""),
        actionType: String(r["DocumentType"] ?? "Enforcement"),
        severity: classifyNRCSeverity(String(r["DocumentTitle"] ?? "")),
        amount: 0,
        dateIssued: String(r["PublishDatePARS"] ?? r["DocumentDate"] ?? ""),
        inspectionReport: "",
        description: String(r["DocumentTitle"] ?? ""),
        reactorType: "",
        docket: String(r["DocketNumber"] ?? ""),
      } as NRCEnforcement));
      if (filters.severity) actions = actions.filter(a => a.severity.includes(filters.severity!));
      if (filters.actionType) actions = actions.filter(a => a.actionType.toLowerCase().includes(filters.actionType!.toLowerCase()));
      return { actions, total: data.response?.numFound ?? actions.length };
    } catch (e) { console.error(`NRC ADAMS API failed: ${e}`); return this.fallbackFetch(filters); }
  }

  private async fallbackFetch(filters: NRCSearchFilters): Promise<{ actions: NRCEnforcement[]; total: number }> {
    try {
      const url = new URL(NRC_REGS_URL);
      url.searchParams.set("filter[agencyId]", "NRC");
      url.searchParams.set("sort", "-postedDate");
      url.searchParams.set("page[size]", String(filters.limit ?? 50));
      const response = await fetch(url.toString(), { headers: { "Accept": "application/vnd.api+json" } });
      if (!response.ok) { console.error(`NRC regulations.gov fallback error: ${response.status}`); return { actions: [], total: 0 }; }
      const data = await response.json() as { data?: Record<string, unknown>[]; meta?: { totalElements?: number } };
      let actions = (data.data ?? []).map(mapToNRCEnforcement);
      if (filters.severity) actions = actions.filter(a => a.severity.includes(filters.severity!));
      if (filters.actionType) actions = actions.filter(a => a.actionType.toLowerCase().includes(filters.actionType!.toLowerCase()));
      return { actions, total: data.meta?.totalElements ?? actions.length };
    } catch { return { actions: [], total: 0 }; }
  }

  scoreComplianceRisk(enforcement: NRCEnforcement): NRCComplianceLead {
    let riskScore = 0;
    const riskCategories: string[] = [];
    const recommendedServices: string[] = [];

    // Severity level scoring (NRC: I = most severe)
    const severity = (enforcement.severity ?? "").toLowerCase();
    if (severity.includes("i") && !severity.includes("ii") && !severity.includes("iv")) {
      riskScore += 40;
      riskCategories.push("Severity Level I — Most Significant");
      recommendedServices.push("NRC Enforcement Response — Severity Level I");
      recommendedServices.push("Nuclear Safety Culture Assessment");
    } else if (severity.includes("ii") && !severity.includes("iii")) {
      riskScore += 30;
      riskCategories.push("Severity Level II");
      recommendedServices.push("NRC Enforcement Response");
    } else if (severity.includes("iii")) {
      riskScore += 20;
      riskCategories.push("Severity Level III");
      recommendedServices.push("NRC Corrective Action Program Review");
    } else if (severity.includes("iv")) {
      riskScore += 10;
      riskCategories.push("Severity Level IV");
    }

    // Action type
    const actionType = (enforcement.actionType ?? "").toLowerCase();
    if (actionType.includes("civil penalty")) {
      riskScore += 15;
      riskCategories.push("Civil Penalty Assessed");
      recommendedServices.push("NRC Civil Penalty Mitigation");
    }
    if (actionType.includes("order")) {
      riskScore += 20;
      riskCategories.push("NRC Order Issued");
      recommendedServices.push("NRC Order Compliance & Response");
    }

    // Amount
    if (enforcement.amount >= 500000) {
      riskScore += 15;
      riskCategories.push(`Major Penalty — $${(enforcement.amount / 1000).toFixed(0)}K`);
    } else if (enforcement.amount >= 100000) {
      riskScore += 10;
      riskCategories.push(`Penalty — $${(enforcement.amount / 1000).toFixed(0)}K`);
    }

    // Nuclear-specific services
    recommendedServices.push("10 CFR Compliance Program Development");

    riskScore = Math.min(riskScore, 100);

    let estimatedRemediation: string;
    if (riskScore >= 70) estimatedRemediation = "12-24 months comprehensive nuclear safety program";
    else if (riskScore >= 50) estimatedRemediation = "6-12 months NRC enforcement response";
    else if (riskScore >= 25) estimatedRemediation = "3-6 months corrective action program";
    else estimatedRemediation = "1-3 months compliance review";

    return {
      enforcement,
      riskScore,
      riskCategories,
      recommendedServices: [...new Set(recommendedServices)],
      estimatedRemediation,
    };
  }

  async runPipeline(db: D1Database, filters: NRCSearchFilters = {}): Promise<NRCPipelineResult> {
    await ensureNRCTables(db);

    const { actions, total } = await this.fetchEnforcementActions(filters);
    const leads: NRCComplianceLead[] = [];

    for (const action of actions) {
      const lead = this.scoreComplianceRisk(action);
      leads.push(lead);
      await storeNRCLead(db, lead);
    }

    leads.sort((a, b) => b.riskScore - a.riskScore);

    return {
      leads,
      totalMatched: total,
      filters,
      generatedAt: new Date().toISOString(),
      source: "NRC Nuclear Regulatory Enforcement (nrc.gov / regulations.gov)",
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// D1 Storage
// ═══════════════════════════════════════════════════════════════════════════

export async function ensureNRCTables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS nrc_leads (id TEXT PRIMARY KEY, licensee TEXT NOT NULL, facility_name TEXT, state TEXT, action_type TEXT, severity TEXT, amount REAL DEFAULT 0, date_issued TEXT, docket TEXT, risk_score INTEGER DEFAULT 0, risk_categories TEXT DEFAULT '[]', created_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_nrc_leads_score ON nrc_leads(risk_score DESC)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_nrc_leads_state ON nrc_leads(state)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_nrc_leads_severity ON nrc_leads(severity)"),
  ]);
}

export async function storeNRCLead(db: D1Database, lead: NRCComplianceLead): Promise<void> {
  const e = lead.enforcement;
  await db.prepare(
    "INSERT OR REPLACE INTO nrc_leads (id, licensee, facility_name, state, action_type, severity, amount, date_issued, docket, risk_score, risk_categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(e.id, e.licensee, e.facilityName, e.state, e.actionType, e.severity, e.amount, e.dateIssued, e.docket, lead.riskScore, JSON.stringify(lead.riskCategories)).run();
}

export async function getStoredNRCLeads(
  db: D1Database,
  filters: { state?: string; severity?: string; minScore?: number; limit?: number }
): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM nrc_leads WHERE 1=1";
  const binds: unknown[] = [];
  if (filters.state) { query += " AND state = ?"; binds.push(filters.state.toUpperCase()); }
  if (filters.severity) { query += " AND severity LIKE ?"; binds.push(`%${filters.severity}%`); }
  if (filters.minScore) { query += " AND risk_score >= ?"; binds.push(filters.minScore); }
  query += " ORDER BY risk_score DESC LIMIT ?";
  binds.push(filters.limit ?? 50);
  return (await db.prepare(query).bind(...binds).all()).results as Record<string, unknown>[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Data Mapper
// ═══════════════════════════════════════════════════════════════════════════

function mapToNRCEnforcement(r: Record<string, unknown>): NRCEnforcement {
  const attrs = (r["attributes"] ?? r) as Record<string, unknown>;
  const title = String(attrs["title"] ?? "");
  return {
    id: String(r["id"] ?? attrs["documentId"] ?? `nrc-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
    licensee: title.split(/[–—-]/)[0]?.trim() || "Unknown",
    facilityName: String(attrs["facilityName"] ?? ""),
    state: String(attrs["stateProvince"] ?? attrs["state"] ?? ""),
    actionType: String(attrs["documentType"] ?? "Enforcement"),
    severity: classifyNRCSeverity(title + " " + String(attrs["summary"] ?? "")),
    amount: Number(attrs["amount"] ?? 0),
    dateIssued: String(attrs["postedDate"] ?? ""),
    inspectionReport: String(attrs["inspectionReport"] ?? ""),
    description: String(attrs["summary"] ?? title),
    reactorType: String(attrs["reactorType"] ?? ""),
    docket: String(attrs["docketId"] ?? attrs["docket"] ?? ""),
  };
}

function classifyNRCSeverity(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("severity level i") && !t.includes("ii")) return "Severity Level I";
  if (t.includes("severity level ii") && !t.includes("iii")) return "Severity Level II";
  if (t.includes("severity level iii") && !t.includes("iv")) return "Severity Level III";
  if (t.includes("severity level iv")) return "Severity Level IV";
  return "";
}

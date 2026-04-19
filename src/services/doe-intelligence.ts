/**
 * DOE Intelligence Service — Energy Enforcement Pipeline
 *
 * Connects to DOE enforcement data including energy efficiency violations,
 * appliance standards enforcement, and nuclear safety penalties.
 *
 * Source: energy.gov open data, enforcement actions database
 */

import type { Env } from "../index.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface DOEEnforcement {
  id: string;
  entityName: string;
  state: string;
  actionType: string;        // Civil Penalty, Consent Order, NOV
  program: string;           // Energy Efficiency, Nuclear Safety, Classified Info
  amount: number;
  dateIssued: string;
  description: string;
  regulation: string;
  status: string;
}

export interface DOEComplianceLead {
  enforcement: DOEEnforcement;
  riskScore: number;
  riskCategories: string[];
  recommendedServices: string[];
  estimatedRemediation: string;
}

export interface DOESearchFilters {
  program?: string;
  state?: string;
  minAmount?: number;
  limit?: number;
}

export interface DOEPipelineResult {
  leads: DOEComplianceLead[];
  totalMatched: number;
  filters: DOESearchFilters;
  generatedAt: string;
  source: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// DOE API Client & Intelligence Service
// ═══════════════════════════════════════════════════════════════════════════

// DOE Energy Efficiency enforcement actions (Socrata)
const DOE_ENFORCEMENT_URL = "https://www.energy.gov/gc/enforcement-actions";
const DOE_OPEN_DATA_URL = "https://data.energy.gov/resource";
// DOE appliance standards enforcement
const DOE_APPLIANCE_URL = "https://www.regulations.gov/api/v4/documents";

export class DOEIntelligenceService {

  async fetchEnforcementActions(filters: DOESearchFilters = {}): Promise<{ actions: DOEEnforcement[]; total: number }> {
    // Primary: DOE Socrata open data (energy efficiency enforcement)
    try {
      const url = new URL(`${DOE_OPEN_DATA_URL}/qmr6-q5n4.json`);
      url.searchParams.set("$limit", String(filters.limit ?? 50));
      url.searchParams.set("$order", "date DESC");
      if (filters.state) url.searchParams.set("$where", `state='${filters.state.toUpperCase()}'`);
      const response = await fetch(url.toString(), { headers: { "Accept": "application/json" } });
      if (!response.ok) { console.error(`DOE Socrata API error: ${response.status}`); return this.fallbackFetch(filters); }
      const data = await response.json() as Record<string, unknown>[];
      if (!Array.isArray(data) || data.length === 0) return this.fallbackFetch(filters);
      const actions = data.map((r: Record<string, unknown>) => ({
        id: String(r["id"] ?? r["case_number"] ?? `doe-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
        entityName: String(r["entity_name"] ?? r["company"] ?? r["respondent"] ?? "Unknown"),
        state: String(r["state"] ?? ""),
        actionType: String(r["action_type"] ?? r["type"] ?? "Enforcement"),
        program: String(r["program"] ?? r["category"] ?? "Energy"),
        amount: Number(r["penalty_amount"] ?? r["amount"] ?? 0),
        dateIssued: String(r["date"] ?? r["action_date"] ?? ""),
        description: String(r["description"] ?? r["summary"] ?? ""),
        regulation: String(r["regulation"] ?? r["cfr_part"] ?? ""),
        status: String(r["status"] ?? "Active"),
      } as DOEEnforcement));
      return { actions, total: actions.length };
    } catch (e) { console.error(`DOE Socrata API failed: ${e}`); return this.fallbackFetch(filters); }
  }

  private async fallbackFetch(filters: DOESearchFilters): Promise<{ actions: DOEEnforcement[]; total: number }> {
    try {
      const url = new URL(DOE_APPLIANCE_URL);
      url.searchParams.set("filter[agencyId]", "DOE");
      url.searchParams.set("filter[documentType]", "Rule");
      url.searchParams.set("sort", "-postedDate");
      url.searchParams.set("page[size]", String(filters.limit ?? 50));
      const response = await fetch(url.toString(), { headers: { "Accept": "application/vnd.api+json" } });
      if (!response.ok) { console.error(`DOE regulations.gov fallback error: ${response.status}`); return { actions: [], total: 0 }; }
      const data = await response.json() as { data?: Record<string, unknown>[]; meta?: { totalElements?: number } };
      const actions = (data.data ?? []).map(mapToDOEEnforcement);
      return { actions, total: data.meta?.totalElements ?? actions.length };
    } catch { return { actions: [], total: 0 }; }
  }

  scoreComplianceRisk(enforcement: DOEEnforcement): DOEComplianceLead {
    let riskScore = 0;
    const riskCategories: string[] = [];
    const recommendedServices: string[] = [];

    // Amount scoring
    if (enforcement.amount >= 1000000) {
      riskScore += 35;
      riskCategories.push(`Major Penalty — $${(enforcement.amount / 1000000).toFixed(1)}M`);
      recommendedServices.push("DOE Civil Penalty Response & Mitigation");
    } else if (enforcement.amount >= 100000) {
      riskScore += 25;
      riskCategories.push(`Significant Penalty — $${(enforcement.amount / 1000).toFixed(0)}K`);
      recommendedServices.push("DOE Enforcement Response");
    } else if (enforcement.amount >= 10000) {
      riskScore += 15;
      riskCategories.push(`Penalty — $${(enforcement.amount / 1000).toFixed(0)}K`);
    }

    // Program-based risk
    const program = (enforcement.program ?? "").toLowerCase();
    if (program.includes("nuclear")) {
      riskScore += 25;
      riskCategories.push("Nuclear Safety Violation");
      recommendedServices.push("Nuclear Safety Compliance Program");
      recommendedServices.push("DOE Order Compliance Assessment");
    } else if (program.includes("classified") || program.includes("security")) {
      riskScore += 20;
      riskCategories.push("Classified Information/Security Violation");
      recommendedServices.push("Security Classification Compliance");
    } else if (program.includes("efficiency") || program.includes("appliance")) {
      riskScore += 10;
      riskCategories.push("Energy Efficiency Standards Violation");
      recommendedServices.push("Energy Efficiency Compliance Program");
    }

    // Action type
    const actionType = (enforcement.actionType ?? "").toLowerCase();
    if (actionType.includes("civil penalty")) {
      riskScore += 10;
      riskCategories.push("Civil Penalty Assessed");
    } else if (actionType.includes("consent")) {
      riskScore += 5;
      riskCategories.push("Consent Order");
    }

    riskScore = Math.min(riskScore, 100);

    let estimatedRemediation: string;
    if (riskScore >= 70) estimatedRemediation = "6-12 months comprehensive DOE compliance remediation";
    else if (riskScore >= 50) estimatedRemediation = "3-6 months targeted enforcement response";
    else if (riskScore >= 25) estimatedRemediation = "1-3 months compliance review";
    else estimatedRemediation = "< 1 month documentation audit";

    return {
      enforcement,
      riskScore,
      riskCategories,
      recommendedServices: [...new Set(recommendedServices)],
      estimatedRemediation,
    };
  }

  async runPipeline(db: D1Database, filters: DOESearchFilters = {}): Promise<DOEPipelineResult> {
    await ensureDOETables(db);

    const { actions, total } = await this.fetchEnforcementActions(filters);
    const leads: DOEComplianceLead[] = [];

    for (const action of actions) {
      const lead = this.scoreComplianceRisk(action);
      leads.push(lead);
      await storeDOELead(db, lead);
    }

    leads.sort((a, b) => b.riskScore - a.riskScore);

    return {
      leads,
      totalMatched: total,
      filters,
      generatedAt: new Date().toISOString(),
      source: "DOE Enforcement Actions (energy.gov / regulations.gov)",
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// D1 Storage
// ═══════════════════════════════════════════════════════════════════════════

export async function ensureDOETables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS doe_leads (id TEXT PRIMARY KEY, entity_name TEXT NOT NULL, state TEXT, action_type TEXT, program TEXT, amount REAL DEFAULT 0, date_issued TEXT, risk_score INTEGER DEFAULT 0, risk_categories TEXT DEFAULT '[]', created_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_doe_leads_score ON doe_leads(risk_score DESC)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_doe_leads_program ON doe_leads(program)"),
  ]);
}

export async function storeDOELead(db: D1Database, lead: DOEComplianceLead): Promise<void> {
  const e = lead.enforcement;
  await db.prepare(
    "INSERT OR REPLACE INTO doe_leads (id, entity_name, state, action_type, program, amount, date_issued, risk_score, risk_categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(e.id, e.entityName, e.state, e.actionType, e.program, e.amount, e.dateIssued, lead.riskScore, JSON.stringify(lead.riskCategories)).run();
}

export async function getStoredDOELeads(
  db: D1Database,
  filters: { program?: string; minScore?: number; limit?: number }
): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM doe_leads WHERE 1=1";
  const binds: unknown[] = [];
  if (filters.program) { query += " AND program LIKE ?"; binds.push(`%${filters.program}%`); }
  if (filters.minScore) { query += " AND risk_score >= ?"; binds.push(filters.minScore); }
  query += " ORDER BY risk_score DESC LIMIT ?";
  binds.push(filters.limit ?? 50);
  return (await db.prepare(query).bind(...binds).all()).results as Record<string, unknown>[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Data Mapper
// ═══════════════════════════════════════════════════════════════════════════

function mapToDOEEnforcement(r: Record<string, unknown>): DOEEnforcement {
  const attrs = (r["attributes"] ?? r) as Record<string, unknown>;
  return {
    id: String(r["id"] ?? attrs["documentId"] ?? `doe-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
    entityName: String(attrs["title"] ?? attrs["entityName"] ?? "Unknown"),
    state: String(attrs["stateProvince"] ?? attrs["state"] ?? ""),
    actionType: String(attrs["documentType"] ?? attrs["actionType"] ?? "Enforcement"),
    program: String(attrs["subtype"] ?? attrs["program"] ?? "Energy"),
    amount: Number(attrs["amount"] ?? attrs["penaltyAmount"] ?? 0),
    dateIssued: String(attrs["postedDate"] ?? attrs["dateIssued"] ?? ""),
    description: String(attrs["summary"] ?? attrs["description"] ?? ""),
    regulation: String(attrs["cfrPart"] ?? attrs["regulation"] ?? ""),
    status: String(attrs["withdrawnDate"] ? "Withdrawn" : "Active"),
  };
}

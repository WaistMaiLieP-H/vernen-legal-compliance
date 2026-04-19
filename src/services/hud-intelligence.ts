/**
 * HUD Intelligence Service — Housing Enforcement Pipeline
 *
 * Connects to HUD fair housing enforcement, FHA lender actions,
 * and RESPA violation data.
 *
 * Source: data.hud.gov (Socrata), HUD enforcement databases
 */

import type { Env } from "../index.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface HUDEnforcement {
  id: string;
  entityName: string;
  state: string;
  city: string;
  actionType: string;        // Fair Housing Charge, Conciliation, Civil Penalty
  violationType: string;     // Discrimination, RESPA, FHA
  basis: string;             // Race, Disability, Familial Status, etc.
  amount: number;
  dateIssued: string;
  description: string;
  status: string;
}

export interface HUDComplianceLead {
  enforcement: HUDEnforcement;
  riskScore: number;
  riskCategories: string[];
  recommendedServices: string[];
  estimatedRemediation: string;
}

export interface HUDSearchFilters {
  state?: string;
  violationType?: string;
  basis?: string;
  limit?: number;
}

export interface HUDPipelineResult {
  leads: HUDComplianceLead[];
  totalMatched: number;
  filters: HUDSearchFilters;
  generatedAt: string;
  source: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// HUD API Client & Intelligence Service
// ═══════════════════════════════════════════════════════════════════════════

// HUD Fair Housing charges (Socrata dataset)
const HUD_FHEO_URL = "https://data.hud.gov/resource/jcdp-4jdh.json";
// HUD FHA lender enforcement
const HUD_FHA_URL = "https://data.hud.gov/resource/s6bq-gtic.json";

export class HUDIntelligenceService {

  private async hudRequest(endpoint: string, params: Record<string, string> = {}): Promise<Record<string, unknown>[]> {
    const url = new URL(endpoint);
    url.searchParams.set("$limit", params["limit"] ?? "100");
    if (params["order"]) url.searchParams.set("$order", params["order"]);
    if (params["where"]) url.searchParams.set("$where", params["where"]);

    try {
      const response = await fetch(url.toString(), {
        headers: { "Accept": "application/json" },
      });
      if (!response.ok) return [];
      return response.json() as Promise<Record<string, unknown>[]>;
    } catch {
      return [];
    }
  }

  async fetchFairHousingCharges(filters: HUDSearchFilters = {}): Promise<{ actions: HUDEnforcement[]; total: number }> {
    const params: Record<string, string> = { limit: String(filters.limit ?? 100) };
    if (filters.state) {
      params["where"] = `state='${filters.state.toUpperCase()}'`;
    }

    const results = await this.hudRequest(HUD_FHEO_URL, params);
    let actions = results.map(r => mapToHUDEnforcement(r, "Fair Housing"));

    if (filters.basis) {
      actions = actions.filter(a => a.basis.toLowerCase().includes(filters.basis!.toLowerCase()));
    }

    return { actions, total: actions.length };
  }

  async fetchFHAEnforcement(filters: HUDSearchFilters = {}): Promise<{ actions: HUDEnforcement[]; total: number }> {
    const params: Record<string, string> = { limit: String(filters.limit ?? 100) };
    if (filters.state) {
      params["where"] = `state='${filters.state.toUpperCase()}'`;
    }

    const results = await this.hudRequest(HUD_FHA_URL, params);
    const actions = results.map(r => mapToHUDEnforcement(r, "FHA"));

    return { actions, total: actions.length };
  }

  scoreComplianceRisk(enforcement: HUDEnforcement): HUDComplianceLead {
    let riskScore = 0;
    const riskCategories: string[] = [];
    const recommendedServices: string[] = [];

    // Violation type
    const vType = (enforcement.violationType ?? "").toLowerCase();
    if (vType.includes("fair housing") || vType.includes("discrimination")) {
      riskScore += 30;
      riskCategories.push("Fair Housing Act Violation");
      recommendedServices.push("Fair Housing Compliance Training");
      recommendedServices.push("Anti-Discrimination Policy Development");
    }
    if (vType.includes("respa")) {
      riskScore += 20;
      riskCategories.push("RESPA Violation");
      recommendedServices.push("RESPA Compliance Program");
    }
    if (vType.includes("fha")) {
      riskScore += 15;
      riskCategories.push("FHA Lending Violation");
      recommendedServices.push("FHA Lender Compliance Audit");
    }

    // Discrimination basis
    const basis = (enforcement.basis ?? "").toLowerCase();
    if (basis.includes("race") || basis.includes("national origin")) {
      riskScore += 15;
      riskCategories.push(`Discrimination Basis — Race/National Origin`);
    }
    if (basis.includes("disability")) {
      riskScore += 10;
      riskCategories.push("Disability Discrimination");
      recommendedServices.push("ADA/Fair Housing Accessibility Compliance");
    }
    if (basis.includes("familial")) {
      riskScore += 10;
      riskCategories.push("Familial Status Discrimination");
    }

    // Penalty amount
    if (enforcement.amount >= 100000) {
      riskScore += 15;
      riskCategories.push(`Major Penalty — $${(enforcement.amount / 1000).toFixed(0)}K`);
      recommendedServices.push("HUD Penalty Negotiation & Appeal");
    } else if (enforcement.amount >= 10000) {
      riskScore += 10;
      riskCategories.push(`Penalty — $${(enforcement.amount / 1000).toFixed(0)}K`);
    }

    riskScore = Math.min(riskScore, 100);

    let estimatedRemediation: string;
    if (riskScore >= 70) estimatedRemediation = "6-12 months comprehensive fair housing compliance";
    else if (riskScore >= 50) estimatedRemediation = "3-6 months targeted remediation";
    else if (riskScore >= 25) estimatedRemediation = "1-3 months compliance review";
    else estimatedRemediation = "< 1 month policy audit";

    return {
      enforcement,
      riskScore,
      riskCategories,
      recommendedServices: [...new Set(recommendedServices)],
      estimatedRemediation,
    };
  }

  async runPipeline(db: D1Database, filters: HUDSearchFilters = {}): Promise<HUDPipelineResult> {
    await ensureHUDTables(db);

    const allLeads: HUDComplianceLead[] = [];
    let totalMatched = 0;

    const [fhResult, fhaResult] = await Promise.all([
      this.fetchFairHousingCharges(filters),
      this.fetchFHAEnforcement(filters),
    ]);

    totalMatched = fhResult.total + fhaResult.total;
    const allActions = [...fhResult.actions, ...fhaResult.actions];

    for (const action of allActions) {
      const lead = this.scoreComplianceRisk(action);
      allLeads.push(lead);
      await storeHUDLead(db, lead);
    }

    allLeads.sort((a, b) => b.riskScore - a.riskScore);

    return {
      leads: allLeads,
      totalMatched,
      filters,
      generatedAt: new Date().toISOString(),
      source: "HUD Fair Housing & FHA Enforcement (data.hud.gov)",
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// D1 Storage
// ═══════════════════════════════════════════════════════════════════════════

export async function ensureHUDTables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS hud_leads (id TEXT PRIMARY KEY, entity_name TEXT NOT NULL, state TEXT, action_type TEXT, violation_type TEXT, basis TEXT, amount REAL DEFAULT 0, date_issued TEXT, risk_score INTEGER DEFAULT 0, risk_categories TEXT DEFAULT '[]', created_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_hud_leads_state ON hud_leads(state)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_hud_leads_score ON hud_leads(risk_score DESC)"),
  ]);
}

export async function storeHUDLead(db: D1Database, lead: HUDComplianceLead): Promise<void> {
  const e = lead.enforcement;
  await db.prepare(
    "INSERT OR REPLACE INTO hud_leads (id, entity_name, state, action_type, violation_type, basis, amount, date_issued, risk_score, risk_categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(e.id, e.entityName, e.state, e.actionType, e.violationType, e.basis, e.amount, e.dateIssued, lead.riskScore, JSON.stringify(lead.riskCategories)).run();
}

export async function getStoredHUDLeads(
  db: D1Database,
  filters: { state?: string; violationType?: string; minScore?: number; limit?: number }
): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM hud_leads WHERE 1=1";
  const binds: unknown[] = [];
  if (filters.state) { query += " AND state = ?"; binds.push(filters.state.toUpperCase()); }
  if (filters.violationType) { query += " AND violation_type LIKE ?"; binds.push(`%${filters.violationType}%`); }
  if (filters.minScore) { query += " AND risk_score >= ?"; binds.push(filters.minScore); }
  query += " ORDER BY risk_score DESC LIMIT ?";
  binds.push(filters.limit ?? 50);
  return (await db.prepare(query).bind(...binds).all()).results as Record<string, unknown>[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Data Mapper
// ═══════════════════════════════════════════════════════════════════════════

function mapToHUDEnforcement(r: Record<string, unknown>, violationType: string): HUDEnforcement {
  return {
    id: String(r["case_number"] ?? r["id"] ?? r["charge_number"] ?? `hud-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
    entityName: String(r["respondent_name"] ?? r["entity_name"] ?? r["lender_name"] ?? r["company"] ?? "Unknown"),
    state: String(r["state"] ?? r["respondent_state"] ?? ""),
    city: String(r["city"] ?? r["respondent_city"] ?? ""),
    actionType: String(r["action_type"] ?? r["charge_type"] ?? r["disposition"] ?? "Enforcement"),
    violationType,
    basis: String(r["basis"] ?? r["protected_class"] ?? r["discrimination_basis"] ?? ""),
    amount: Number(r["amount"] ?? r["civil_penalty"] ?? r["settlement_amount"] ?? 0),
    dateIssued: String(r["date_filed"] ?? r["charge_date"] ?? r["action_date"] ?? ""),
    description: String(r["description"] ?? r["summary"] ?? r["allegation"] ?? ""),
    status: String(r["status"] ?? r["case_status"] ?? "Active"),
  };
}

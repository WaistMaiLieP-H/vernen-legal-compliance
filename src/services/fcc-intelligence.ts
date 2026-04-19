/**
 * FCC Intelligence Service — Telecommunications Enforcement Pipeline
 *
 * Connects to FCC Enforcement Bureau data to identify entities with
 * documented FCC violations: spectrum violations, TCPA fines, robocall
 * enforcement, tower compliance, and broadcasting violations.
 *
 * Source: opendata.fcc.gov (free, no key required)
 */

import type { Env } from "../index.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface FCCEnforcementAction {
  id: string;
  entityName: string;
  entityType: string;
  state: string;
  actionType: string;       // NAL, Forfeiture, Consent Decree, Citation
  violationType: string;    // TCPA, Spectrum, EAS, Tower, Broadcasting
  amount: number;
  dateIssued: string;
  description: string;
  caseNumber: string;
  bureau: string;
}

export interface FCCComplianceLead {
  action: FCCEnforcementAction;
  riskScore: number;
  riskCategories: string[];
  recommendedServices: string[];
  estimatedRemediation: string;
}

export interface FCCSearchFilters {
  state?: string;
  actionType?: string;
  violationType?: string;
  minAmount?: number;
  limit?: number;
}

export interface FCCPipelineResult {
  leads: FCCComplianceLead[];
  totalMatched: number;
  filters: FCCSearchFilters;
  generatedAt: string;
  source: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// FCC API Client & Intelligence Service
// ═══════════════════════════════════════════════════════════════════════════

const FCC_ENFORCEMENT_URL = "https://opendata.fcc.gov/resource/5fvk-3f82.json";

export class FCCIntelligenceService {

  private async fccRequest(params: Record<string, string> = {}): Promise<Record<string, unknown>[]> {
    const url = new URL(FCC_ENFORCEMENT_URL);
    url.searchParams.set("$limit", params["limit"] ?? "100");
    url.searchParams.set("$order", "date_issued DESC");

    if (params["state"]) {
      url.searchParams.set("$where", `state='${params["state"].toUpperCase()}'`);
    }

    const response = await fetch(url.toString(), {
      headers: { "Accept": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`FCC API error ${response.status}: ${await response.text()}`);
    }

    return response.json() as Promise<Record<string, unknown>[]>;
  }

  async fetchEnforcementActions(filters: FCCSearchFilters = {}): Promise<{ actions: FCCEnforcementAction[]; total: number }> {
    const params: Record<string, string> = {
      limit: String(filters.limit ?? 100),
    };
    if (filters.state) params["state"] = filters.state;

    const results = await this.fccRequest(params);
    let actions = results.map(mapToFCCAction);

    if (filters.actionType) {
      actions = actions.filter(a => a.actionType.toLowerCase().includes(filters.actionType!.toLowerCase()));
    }
    if (filters.violationType) {
      actions = actions.filter(a => a.violationType.toLowerCase().includes(filters.violationType!.toLowerCase()));
    }
    if (filters.minAmount) {
      actions = actions.filter(a => a.amount >= filters.minAmount!);
    }

    return { actions, total: actions.length };
  }

  scoreComplianceRisk(action: FCCEnforcementAction): FCCComplianceLead {
    let riskScore = 0;
    const riskCategories: string[] = [];
    const recommendedServices: string[] = [];

    // Fine amount scoring
    if (action.amount >= 1000000) {
      riskScore += 35;
      riskCategories.push(`Major Fine — $${(action.amount / 1000000).toFixed(1)}M`);
      recommendedServices.push("FCC Consent Decree Negotiation");
    } else if (action.amount >= 100000) {
      riskScore += 25;
      riskCategories.push(`Significant Fine — $${(action.amount / 1000).toFixed(0)}K`);
      recommendedServices.push("FCC Enforcement Response");
    } else if (action.amount >= 10000) {
      riskScore += 15;
      riskCategories.push(`Fine — $${(action.amount / 1000).toFixed(0)}K`);
    }

    // Action type severity
    const actionType = action.actionType.toLowerCase();
    if (actionType.includes("forfeiture")) {
      riskScore += 20;
      riskCategories.push("Forfeiture Order");
      recommendedServices.push("FCC Forfeiture Payment & Compliance Plan");
    } else if (actionType.includes("nal") || actionType.includes("notice of apparent liability")) {
      riskScore += 15;
      riskCategories.push("Notice of Apparent Liability");
      recommendedServices.push("NAL Response Preparation");
    }

    // Violation type
    const desc = (action.description + " " + action.violationType).toLowerCase();
    if (desc.includes("tcpa") || desc.includes("robocall")) {
      riskScore += 15;
      riskCategories.push("TCPA/Robocall Violation");
      recommendedServices.push("TCPA Compliance Program Development");
    }
    if (desc.includes("spectrum") || desc.includes("pirate")) {
      riskScore += 10;
      riskCategories.push("Spectrum/Pirate Radio Violation");
      recommendedServices.push("Spectrum Compliance Audit");
    }
    if (desc.includes("eas") || desc.includes("emergency alert")) {
      riskScore += 15;
      riskCategories.push("Emergency Alert System Violation");
      recommendedServices.push("EAS Compliance Review");
    }

    riskScore = Math.min(riskScore, 100);

    let estimatedRemediation: string;
    if (riskScore >= 70) estimatedRemediation = "6-12 months comprehensive FCC compliance remediation";
    else if (riskScore >= 50) estimatedRemediation = "3-6 months targeted enforcement response";
    else if (riskScore >= 25) estimatedRemediation = "1-3 months compliance review";
    else estimatedRemediation = "< 1 month violation closure";

    return {
      action,
      riskScore,
      riskCategories,
      recommendedServices: [...new Set(recommendedServices)],
      estimatedRemediation,
    };
  }

  async runPipeline(db: D1Database, filters: FCCSearchFilters = {}): Promise<FCCPipelineResult> {
    await ensureFCCTables(db);

    const { actions, total } = await this.fetchEnforcementActions(filters);
    const leads: FCCComplianceLead[] = [];

    for (const action of actions) {
      const lead = this.scoreComplianceRisk(action);
      leads.push(lead);
      await storeFCCLead(db, lead);
    }

    leads.sort((a, b) => b.riskScore - a.riskScore);

    return {
      leads,
      totalMatched: total,
      filters,
      generatedAt: new Date().toISOString(),
      source: "FCC Enforcement Bureau (opendata.fcc.gov)",
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// D1 Storage
// ═══════════════════════════════════════════════════════════════════════════

export async function ensureFCCTables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS fcc_leads (id TEXT PRIMARY KEY, entity_name TEXT NOT NULL, state TEXT, action_type TEXT, violation_type TEXT, amount REAL DEFAULT 0, date_issued TEXT, case_number TEXT, risk_score INTEGER DEFAULT 0, risk_categories TEXT DEFAULT '[]', created_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_fcc_leads_state ON fcc_leads(state)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_fcc_leads_score ON fcc_leads(risk_score DESC)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_fcc_leads_amount ON fcc_leads(amount DESC)"),
  ]);
}

export async function storeFCCLead(db: D1Database, lead: FCCComplianceLead): Promise<void> {
  const a = lead.action;
  await db.prepare(
    "INSERT OR REPLACE INTO fcc_leads (id, entity_name, state, action_type, violation_type, amount, date_issued, case_number, risk_score, risk_categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(a.id, a.entityName, a.state, a.actionType, a.violationType, a.amount, a.dateIssued, a.caseNumber, lead.riskScore, JSON.stringify(lead.riskCategories)).run();
}

export async function getStoredFCCLeads(
  db: D1Database,
  filters: { state?: string; minScore?: number; minAmount?: number; limit?: number }
): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM fcc_leads WHERE 1=1";
  const binds: unknown[] = [];
  if (filters.state) { query += " AND state = ?"; binds.push(filters.state.toUpperCase()); }
  if (filters.minScore) { query += " AND risk_score >= ?"; binds.push(filters.minScore); }
  if (filters.minAmount) { query += " AND amount >= ?"; binds.push(filters.minAmount); }
  query += " ORDER BY risk_score DESC LIMIT ?";
  binds.push(filters.limit ?? 50);
  return (await db.prepare(query).bind(...binds).all()).results as Record<string, unknown>[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Data Mapper
// ═══════════════════════════════════════════════════════════════════════════

function mapToFCCAction(r: Record<string, unknown>): FCCEnforcementAction {
  const amount = Number(r["total_amount"] ?? r["amount"] ?? r["proposed_fine"] ?? 0);
  const desc = String(r["description"] ?? r["case_name"] ?? r["subject"] ?? "");
  const violationType = classifyViolation(desc);

  return {
    id: String(r["da_case_number"] ?? r["case_number"] ?? r["id"] ?? `fcc-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
    entityName: String(r["entity_name"] ?? r["respondent"] ?? r["company_name"] ?? "Unknown"),
    entityType: String(r["entity_type"] ?? ""),
    state: String(r["state"] ?? ""),
    actionType: String(r["action_type"] ?? r["type"] ?? "Enforcement"),
    violationType,
    amount,
    dateIssued: String(r["date_issued"] ?? r["release_date"] ?? ""),
    description: desc,
    caseNumber: String(r["da_case_number"] ?? r["case_number"] ?? ""),
    bureau: String(r["bureau"] ?? "Enforcement Bureau"),
  };
}

function classifyViolation(description: string): string {
  const d = description.toLowerCase();
  if (d.includes("tcpa") || d.includes("robocall") || d.includes("telemarket")) return "TCPA";
  if (d.includes("spectrum") || d.includes("pirate") || d.includes("unlicensed")) return "Spectrum";
  if (d.includes("eas") || d.includes("emergency alert")) return "EAS";
  if (d.includes("tower") || d.includes("antenna")) return "Tower";
  if (d.includes("broadcast")) return "Broadcasting";
  if (d.includes("cable") || d.includes("satellite")) return "Cable/Satellite";
  return "General";
}

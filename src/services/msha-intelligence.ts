/**
 * MSHA Intelligence Service — Mine Safety Enforcement Pipeline
 *
 * Connects to the DOL MSHA public data to identify mines with
 * violations, accidents, penalties, and pattern of violations (POV)
 * designations.
 *
 * Source: api.dol.gov/v2/safety/msha (free, API key via api.dol.gov)
 */

import type { Env } from "../index.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface MSHAViolation {
  violationNumber: string;
  mineId: string;
  mineName: string;
  operatorName: string;
  state: string;
  sectionOfAct: string;
  violationType: string;    // S&S, Non-S&S, Flagrant
  dateIssued: string;
  proposedPenalty: number;
  currentPenalty: number;
  negligence: string;       // None, Low, Moderate, High, Reckless
  gravity: string;
  injuryOrIllness: boolean;
}

export interface MSHAComplianceLead {
  violation: MSHAViolation;
  riskScore: number;
  riskCategories: string[];
  recommendedServices: string[];
  estimatedRemediation: string;
}

export interface MSHASearchFilters {
  state?: string;
  operatorName?: string;
  violationType?: string;
  minPenalty?: number;
  limit?: number;
}

export interface MSHAPipelineResult {
  leads: MSHAComplianceLead[];
  totalMatched: number;
  filters: MSHASearchFilters;
  generatedAt: string;
  source: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// MSHA API Client & Intelligence Service
// ═══════════════════════════════════════════════════════════════════════════

const MSHA_VIOLATIONS_URL = "https://api.dol.gov/v2/safety/msha_violations";
const MSHA_MINES_URL = "https://api.dol.gov/v2/safety/msha_mines";
const ENFDATA_URL = "https://arlweb.msha.gov/OpenGovernmentData/DataSets/Violations.zip";
// Fallback: MSHA public data downloads
const MSHA_PUBLIC = "https://enforcedata.dol.gov/api/msha_violation";

export class MSHAIntelligenceService {

  private async mshaRequest(endpoint: string, params: Record<string, string> = {}): Promise<Record<string, unknown>[]> {
    const url = new URL(endpoint);
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(k, v);
    }

    const response = await fetch(url.toString(), {
      headers: { "Accept": "application/json", "X-API-KEY": "" },
    });

    if (!response.ok) {
      if (response.status === 403 || response.status === 401) {
        // Try enforcement data fallback
        return this.mshaFallback(params);
      }
      throw new Error(`MSHA API error ${response.status}`);
    }

    const data = await response.json() as Record<string, unknown>;
    return (data["results"] ?? data["data"] ?? []) as Record<string, unknown>[];
  }

  private async mshaFallback(params: Record<string, string>): Promise<Record<string, unknown>[]> {
    const url = new URL(MSHA_PUBLIC);
    url.searchParams.set("$top", params["limit"] ?? "100");
    url.searchParams.set("$orderby", "date_issued desc");
    if (params["state"]) {
      url.searchParams.set("$filter", `mine_state eq '${params["state"]}'`);
    }

    try {
      const response = await fetch(url.toString(), {
        headers: { "Accept": "application/json" },
      });
      if (!response.ok) return [];
      const data = await response.json() as { d?: { results?: Record<string, unknown>[] } };
      return data.d?.results ?? [];
    } catch {
      return [];
    }
  }

  async fetchViolations(filters: MSHASearchFilters = {}): Promise<{ violations: MSHAViolation[]; total: number }> {
    const params: Record<string, string> = {
      limit: String(filters.limit ?? 100),
    };
    if (filters.state) params["state"] = filters.state;

    const results = await this.mshaRequest(MSHA_VIOLATIONS_URL, params);
    let violations = results.map(mapToMSHAViolation);

    if (filters.operatorName) {
      const opLower = filters.operatorName.toLowerCase();
      violations = violations.filter(v => v.operatorName.toLowerCase().includes(opLower));
    }
    if (filters.violationType) {
      violations = violations.filter(v => v.violationType.toLowerCase().includes(filters.violationType!.toLowerCase()));
    }
    if (filters.minPenalty) {
      violations = violations.filter(v => v.proposedPenalty >= filters.minPenalty!);
    }

    return { violations, total: violations.length };
  }

  scoreComplianceRisk(violation: MSHAViolation): MSHAComplianceLead {
    let riskScore = 0;
    const riskCategories: string[] = [];
    const recommendedServices: string[] = [];

    // Violation type
    const vType = (violation.violationType ?? "").toLowerCase();
    if (vType.includes("flagrant")) {
      riskScore += 40;
      riskCategories.push("Flagrant Violation");
      recommendedServices.push("MSHA Flagrant Violation Defense");
    } else if (vType.includes("s&s") || vType.includes("significant and substantial")) {
      riskScore += 30;
      riskCategories.push("Significant & Substantial (S&S) Violation");
      recommendedServices.push("S&S Violation Abatement & Contest");
    }

    // Negligence level
    const negligence = (violation.negligence ?? "").toLowerCase();
    if (negligence.includes("reckless")) {
      riskScore += 25;
      riskCategories.push("Reckless Disregard");
      recommendedServices.push("Pattern of Violations (POV) Defense");
    } else if (negligence.includes("high")) {
      riskScore += 15;
      riskCategories.push("High Negligence");
    }

    // Penalty amount
    if (violation.proposedPenalty >= 100000) {
      riskScore += 15;
      riskCategories.push(`Major Penalty — $${(violation.proposedPenalty / 1000).toFixed(0)}K`);
      recommendedServices.push("MSHA Penalty Contest & Reduction");
    } else if (violation.proposedPenalty >= 10000) {
      riskScore += 10;
      riskCategories.push(`Penalty — $${(violation.proposedPenalty / 1000).toFixed(0)}K`);
    }

    // Injury/illness
    if (violation.injuryOrIllness) {
      riskScore += 15;
      riskCategories.push("Injury or Illness Reported");
      recommendedServices.push("Accident Investigation Response");
    }

    riskScore = Math.min(riskScore, 100);

    let estimatedRemediation: string;
    if (riskScore >= 70) estimatedRemediation = "6-12 months comprehensive mine safety remediation";
    else if (riskScore >= 50) estimatedRemediation = "3-6 months violation abatement program";
    else if (riskScore >= 25) estimatedRemediation = "1-3 months safety compliance review";
    else estimatedRemediation = "< 1 month violation closure";

    return {
      violation,
      riskScore,
      riskCategories,
      recommendedServices: [...new Set(recommendedServices)],
      estimatedRemediation,
    };
  }

  async runPipeline(db: D1Database, filters: MSHASearchFilters = {}): Promise<MSHAPipelineResult> {
    await ensureMSHATables(db);

    const { violations, total } = await this.fetchViolations(filters);
    const leads: MSHAComplianceLead[] = [];

    for (const violation of violations) {
      const lead = this.scoreComplianceRisk(violation);
      leads.push(lead);
      await storeMSHALead(db, lead);
    }

    leads.sort((a, b) => b.riskScore - a.riskScore);

    return {
      leads,
      totalMatched: total,
      filters,
      generatedAt: new Date().toISOString(),
      source: "MSHA Mine Safety Violation Data (api.dol.gov)",
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// D1 Storage
// ═══════════════════════════════════════════════════════════════════════════

export async function ensureMSHATables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS msha_leads (violation_number TEXT PRIMARY KEY, mine_id TEXT, mine_name TEXT, operator_name TEXT NOT NULL, state TEXT, violation_type TEXT, negligence TEXT, proposed_penalty REAL DEFAULT 0, date_issued TEXT, injury INTEGER DEFAULT 0, risk_score INTEGER DEFAULT 0, risk_categories TEXT DEFAULT '[]', created_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_msha_leads_state ON msha_leads(state)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_msha_leads_score ON msha_leads(risk_score DESC)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_msha_leads_operator ON msha_leads(operator_name)"),
  ]);
}

export async function storeMSHALead(db: D1Database, lead: MSHAComplianceLead): Promise<void> {
  const v = lead.violation;
  await db.prepare(
    "INSERT OR REPLACE INTO msha_leads (violation_number, mine_id, mine_name, operator_name, state, violation_type, negligence, proposed_penalty, date_issued, injury, risk_score, risk_categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(v.violationNumber, v.mineId, v.mineName, v.operatorName, v.state, v.violationType, v.negligence, v.proposedPenalty, v.dateIssued, v.injuryOrIllness ? 1 : 0, lead.riskScore, JSON.stringify(lead.riskCategories)).run();
}

export async function getStoredMSHALeads(
  db: D1Database,
  filters: { state?: string; operatorName?: string; minScore?: number; limit?: number }
): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM msha_leads WHERE 1=1";
  const binds: unknown[] = [];
  if (filters.state) { query += " AND state = ?"; binds.push(filters.state.toUpperCase()); }
  if (filters.operatorName) { query += " AND operator_name LIKE ?"; binds.push(`%${filters.operatorName}%`); }
  if (filters.minScore) { query += " AND risk_score >= ?"; binds.push(filters.minScore); }
  query += " ORDER BY risk_score DESC LIMIT ?";
  binds.push(filters.limit ?? 50);
  return (await db.prepare(query).bind(...binds).all()).results as Record<string, unknown>[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Data Mapper
// ═══════════════════════════════════════════════════════════════════════════

function mapToMSHAViolation(r: Record<string, unknown>): MSHAViolation {
  return {
    violationNumber: String(r["violation_no"] ?? r["violationNumber"] ?? r["VIOLATION_NO"] ?? `msha-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
    mineId: String(r["mine_id"] ?? r["mineId"] ?? r["MINE_ID"] ?? ""),
    mineName: String(r["mine_name"] ?? r["mineName"] ?? r["MINE_NAME"] ?? "Unknown"),
    operatorName: String(r["operator_name"] ?? r["operatorName"] ?? r["OPERATOR_NAME"] ?? "Unknown"),
    state: String(r["mine_state"] ?? r["state"] ?? r["MINE_STATE"] ?? ""),
    sectionOfAct: String(r["section_of_act"] ?? r["sectionOfAct"] ?? ""),
    violationType: String(r["sig_sub"] ?? r["violationType"] ?? r["SIG_SUB"] ?? ""),
    dateIssued: String(r["date_issued"] ?? r["dateIssued"] ?? r["DATE_ISSUED"] ?? ""),
    proposedPenalty: Number(r["proposed_penalty"] ?? r["proposedPenalty"] ?? r["PROPOSED_PENALTY"] ?? 0),
    currentPenalty: Number(r["current_penalty"] ?? r["currentPenalty"] ?? 0),
    negligence: String(r["negligence"] ?? r["NEGLIGENCE"] ?? ""),
    gravity: String(r["gravity"] ?? r["GRAVITY"] ?? ""),
    injuryOrIllness: Boolean(r["injury_illness"] ?? r["injuryOrIllness"] ?? false),
  };
}

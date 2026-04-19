/**
 * CFTC Intelligence Service — Commodities & Derivatives Enforcement Pipeline
 *
 * Connects to CFTC enforcement data covering derivatives fraud,
 * market manipulation, spoofing, and swap dealer violations.
 *
 * Source: cftc.gov enforcement actions, regulations.gov
 */

import type { Env } from "../index.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface CFTCEnforcement {
  id: string;
  respondent: string;
  actionType: string;         // Civil Monetary Penalty, Cease and Desist, Ban
  violationType: string;      // Fraud, Manipulation, Spoofing, Reporting, Registration
  amount: number;
  dateIssued: string;
  courtOrForum: string;
  description: string;
  status: string;
}

export interface CFTCComplianceLead {
  enforcement: CFTCEnforcement;
  riskScore: number;
  riskCategories: string[];
  recommendedServices: string[];
  estimatedRemediation: string;
}

export interface CFTCSearchFilters {
  violationType?: string;
  respondent?: string;
  minAmount?: number;
  limit?: number;
}

export interface CFTCPipelineResult {
  leads: CFTCComplianceLead[];
  totalMatched: number;
  filters: CFTCSearchFilters;
  generatedAt: string;
  source: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// CFTC API Client & Intelligence Service
// ═══════════════════════════════════════════════════════════════════════════

const CFTC_REGS_URL = "https://www.regulations.gov/api/v4/documents";

export class CFTCIntelligenceService {

  async fetchEnforcementActions(filters: CFTCSearchFilters = {}): Promise<{ actions: CFTCEnforcement[]; total: number }> {
    // Primary: CFTC enforcement API (Socrata open data)
    try {
      const url = new URL("https://www.cftc.gov/files/enforcement/enforcementactions.json");
      const response = await fetch(url.toString(), { headers: { "Accept": "application/json" } });
      if (!response.ok) { console.error(`CFTC direct API error: ${response.status}`); return this.fallbackFetch(filters); }
      const data = await response.json() as Record<string, unknown>[] | { results?: Record<string, unknown>[] };
      const results = Array.isArray(data) ? data : (data.results ?? []);
      if (results.length === 0) return this.fallbackFetch(filters);
      let actions = results.slice(0, filters.limit ?? 50).map((r: Record<string, unknown>) => ({
        id: String(r["id"] ?? r["caseNumber"] ?? `cftc-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
        respondent: String(r["respondent"] ?? r["defendant"] ?? r["title"] ?? "Unknown"),
        actionType: String(r["actionType"] ?? r["type"] ?? "Enforcement"),
        violationType: classifyCFTCViolation(String(r["description"] ?? r["summary"] ?? r["title"] ?? "")),
        amount: Number(r["civilMonetaryPenalty"] ?? r["amount"] ?? r["penalty"] ?? 0),
        dateIssued: String(r["date"] ?? r["filingDate"] ?? r["dateIssued"] ?? ""),
        courtOrForum: String(r["court"] ?? r["forum"] ?? "CFTC"),
        description: String(r["description"] ?? r["summary"] ?? ""),
        status: String(r["status"] ?? "Active"),
      } as CFTCEnforcement));
      if (filters.violationType) actions = actions.filter(a => a.violationType.toLowerCase().includes(filters.violationType!.toLowerCase()));
      if (filters.minAmount) actions = actions.filter(a => a.amount >= filters.minAmount!);
      return { actions, total: actions.length };
    } catch (e) { console.error(`CFTC direct API failed: ${e}`); return this.fallbackFetch(filters); }
  }

  private async fallbackFetch(filters: CFTCSearchFilters): Promise<{ actions: CFTCEnforcement[]; total: number }> {
    try {
      const url = new URL(CFTC_REGS_URL);
      url.searchParams.set("filter[agencyId]", "CFTC");
      url.searchParams.set("sort", "-postedDate");
      url.searchParams.set("page[size]", String(filters.limit ?? 50));
      if (filters.respondent) url.searchParams.set("filter[searchTerm]", filters.respondent);
      const response = await fetch(url.toString(), { headers: { "Accept": "application/vnd.api+json" } });
      if (!response.ok) { console.error(`CFTC regulations.gov fallback error: ${response.status}`); return { actions: [], total: 0 }; }
      const data = await response.json() as { data?: Record<string, unknown>[]; meta?: { totalElements?: number } };
      let actions = (data.data ?? []).map(mapToCFTCEnforcement);
      if (filters.violationType) actions = actions.filter(a => a.violationType.toLowerCase().includes(filters.violationType!.toLowerCase()));
      if (filters.minAmount) actions = actions.filter(a => a.amount >= filters.minAmount!);
      return { actions, total: data.meta?.totalElements ?? actions.length };
    } catch { return { actions: [], total: 0 }; }
  }

  scoreComplianceRisk(enforcement: CFTCEnforcement): CFTCComplianceLead {
    let riskScore = 0;
    const riskCategories: string[] = [];
    const recommendedServices: string[] = [];

    // Amount scoring
    if (enforcement.amount >= 10000000) {
      riskScore += 35;
      riskCategories.push(`Major CFTC Penalty — $${(enforcement.amount / 1000000).toFixed(1)}M`);
      recommendedServices.push("CFTC Enforcement Defense & Settlement");
    } else if (enforcement.amount >= 1000000) {
      riskScore += 25;
      riskCategories.push(`Significant Penalty — $${(enforcement.amount / 1000000).toFixed(1)}M`);
      recommendedServices.push("CFTC Civil Monetary Penalty Response");
    } else if (enforcement.amount >= 100000) {
      riskScore += 15;
      riskCategories.push(`Penalty — $${(enforcement.amount / 1000).toFixed(0)}K`);
    }

    // Violation type
    const vType = (enforcement.violationType + " " + enforcement.description).toLowerCase();
    if (vType.includes("manipulation") || vType.includes("spoofing")) {
      riskScore += 25;
      riskCategories.push("Market Manipulation / Spoofing");
      recommendedServices.push("Anti-Manipulation Compliance Program");
      recommendedServices.push("Trading Surveillance System Review");
    }
    if (vType.includes("fraud")) {
      riskScore += 20;
      riskCategories.push("Commodities Fraud");
      recommendedServices.push("Fraud Prevention & Detection Program");
    }
    if (vType.includes("registration") || vType.includes("swap dealer")) {
      riskScore += 10;
      riskCategories.push("Registration / Swap Dealer Violation");
      recommendedServices.push("CFTC Registration Compliance");
    }
    if (vType.includes("reporting") || vType.includes("record")) {
      riskScore += 10;
      riskCategories.push("Reporting / Record-keeping Violation");
      recommendedServices.push("CFTC Reporting Compliance Program");
    }

    // Action type
    const actionType = (enforcement.actionType ?? "").toLowerCase();
    if (actionType.includes("ban") || actionType.includes("permanent")) {
      riskScore += 15;
      riskCategories.push("Trading Ban / Permanent Injunction");
    }

    riskScore = Math.min(riskScore, 100);

    let estimatedRemediation: string;
    if (riskScore >= 70) estimatedRemediation = "12-24 months comprehensive CFTC compliance remediation";
    else if (riskScore >= 50) estimatedRemediation = "6-12 months enforcement response & program build";
    else if (riskScore >= 25) estimatedRemediation = "3-6 months compliance review";
    else estimatedRemediation = "1-3 months policy audit";

    return {
      enforcement,
      riskScore,
      riskCategories,
      recommendedServices: [...new Set(recommendedServices)],
      estimatedRemediation,
    };
  }

  async runPipeline(db: D1Database, filters: CFTCSearchFilters = {}): Promise<CFTCPipelineResult> {
    await ensureCFTCTables(db);

    const { actions, total } = await this.fetchEnforcementActions(filters);
    const leads: CFTCComplianceLead[] = [];

    for (const action of actions) {
      const lead = this.scoreComplianceRisk(action);
      leads.push(lead);
      await storeCFTCLead(db, lead);
    }

    leads.sort((a, b) => b.riskScore - a.riskScore);

    return {
      leads,
      totalMatched: total,
      filters,
      generatedAt: new Date().toISOString(),
      source: "CFTC Enforcement Actions (cftc.gov / regulations.gov)",
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// D1 Storage
// ═══════════════════════════════════════════════════════════════════════════

export async function ensureCFTCTables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS cftc_leads (id TEXT PRIMARY KEY, respondent TEXT NOT NULL, action_type TEXT, violation_type TEXT, amount REAL DEFAULT 0, date_issued TEXT, risk_score INTEGER DEFAULT 0, risk_categories TEXT DEFAULT '[]', created_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_cftc_leads_score ON cftc_leads(risk_score DESC)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_cftc_leads_amount ON cftc_leads(amount DESC)"),
  ]);
}

export async function storeCFTCLead(db: D1Database, lead: CFTCComplianceLead): Promise<void> {
  const e = lead.enforcement;
  await db.prepare(
    "INSERT OR REPLACE INTO cftc_leads (id, respondent, action_type, violation_type, amount, date_issued, risk_score, risk_categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(e.id, e.respondent, e.actionType, e.violationType, e.amount, e.dateIssued, lead.riskScore, JSON.stringify(lead.riskCategories)).run();
}

export async function getStoredCFTCLeads(
  db: D1Database,
  filters: { violationType?: string; minScore?: number; minAmount?: number; limit?: number }
): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM cftc_leads WHERE 1=1";
  const binds: unknown[] = [];
  if (filters.violationType) { query += " AND violation_type LIKE ?"; binds.push(`%${filters.violationType}%`); }
  if (filters.minScore) { query += " AND risk_score >= ?"; binds.push(filters.minScore); }
  if (filters.minAmount) { query += " AND amount >= ?"; binds.push(filters.minAmount); }
  query += " ORDER BY risk_score DESC LIMIT ?";
  binds.push(filters.limit ?? 50);
  return (await db.prepare(query).bind(...binds).all()).results as Record<string, unknown>[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Data Mapper
// ═══════════════════════════════════════════════════════════════════════════

function mapToCFTCEnforcement(r: Record<string, unknown>): CFTCEnforcement {
  const attrs = (r["attributes"] ?? r) as Record<string, unknown>;
  const title = String(attrs["title"] ?? "");
  return {
    id: String(r["id"] ?? attrs["documentId"] ?? `cftc-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
    respondent: title.split(/[–—-]/)[0]?.trim() || title || "Unknown",
    actionType: String(attrs["documentType"] ?? attrs["actionType"] ?? "Enforcement"),
    violationType: classifyCFTCViolation(title + " " + String(attrs["summary"] ?? "")),
    amount: Number(attrs["amount"] ?? 0),
    dateIssued: String(attrs["postedDate"] ?? attrs["dateIssued"] ?? ""),
    courtOrForum: String(attrs["agencyAcronym"] ?? "CFTC"),
    description: String(attrs["summary"] ?? attrs["description"] ?? title),
    status: String(attrs["withdrawnDate"] ? "Withdrawn" : "Active"),
  };
}

function classifyCFTCViolation(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("spoof")) return "Spoofing";
  if (t.includes("manipulat")) return "Manipulation";
  if (t.includes("fraud")) return "Fraud";
  if (t.includes("swap")) return "Swap Dealer";
  if (t.includes("report")) return "Reporting";
  if (t.includes("registrat")) return "Registration";
  return "General";
}

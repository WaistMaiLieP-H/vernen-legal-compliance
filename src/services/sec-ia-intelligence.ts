/**
 * SEC Investment Adviser Intelligence Service
 *
 * Connects to SEC IAPD (Investment Adviser Public Disclosure) and
 * enforcement data covering RIA deficiencies, exam findings,
 * and enforcement actions against investment advisers.
 *
 * Source: sec.gov EDGAR, adviserinfo.sec.gov (free, no key)
 */

import type { Env } from "../index.js";

export interface SECIAEnforcement {
  id: string;
  respondent: string;
  firmCrd: string;
  state: string;
  actionType: string;
  violationType: string;
  amount: number;
  dateIssued: string;
  description: string;
  releaseNumber: string;
  status: string;
}

export interface SECIAComplianceLead {
  enforcement: SECIAEnforcement;
  riskScore: number;
  riskCategories: string[];
  recommendedServices: string[];
  estimatedRemediation: string;
}

export interface SECIASearchFilters {
  state?: string;
  violationType?: string;
  respondent?: string;
  limit?: number;
}

export interface SECIAPipelineResult {
  leads: SECIAComplianceLead[];
  totalMatched: number;
  filters: SECIASearchFilters;
  generatedAt: string;
  source: string;
}

const SEC_EDGAR_SEARCH = "https://efts.sec.gov/LATEST/search-index?q=%22investment+adviser%22&dateRange=custom&startdt=2024-01-01&forms=ADV";
const SEC_ENFORCEMENT_URL = "https://efts.sec.gov/LATEST/search-index";

export class SECIAIntelligenceService {

  async fetchEnforcementActions(filters: SECIASearchFilters = {}): Promise<{ actions: SECIAEnforcement[]; total: number }> {
    try {
      const url = new URL("https://efts.sec.gov/LATEST/search-index");
      url.searchParams.set("q", filters.respondent ?? "investment adviser enforcement");
      url.searchParams.set("forms", "LIT-REL,AAER");
      url.searchParams.set("from", "0");
      url.searchParams.set("size", String(filters.limit ?? 50));

      const response = await fetch(url.toString(), { headers: { "Accept": "application/json" } });
      if (!response.ok) return { actions: [], total: 0 };

      const data = await response.json() as { hits?: { hits?: Record<string, unknown>[]; total?: { value?: number } } };
      const hits = data.hits?.hits ?? [];
      const actions = hits.map(mapToSECIAEnforcement);
      return { actions, total: data.hits?.total?.value ?? actions.length };
    } catch {
      return { actions: [], total: 0 };
    }
  }

  scoreComplianceRisk(enforcement: SECIAEnforcement): SECIAComplianceLead {
    let riskScore = 0;
    const riskCategories: string[] = [];
    const recommendedServices: string[] = [];

    if (enforcement.amount >= 10000000) {
      riskScore += 35; riskCategories.push(`Major SEC Penalty — $${(enforcement.amount / 1000000).toFixed(1)}M`);
      recommendedServices.push("SEC Enforcement Defense & Settlement");
    } else if (enforcement.amount >= 1000000) {
      riskScore += 25; riskCategories.push(`SEC Penalty — $${(enforcement.amount / 1000000).toFixed(1)}M`);
    } else if (enforcement.amount >= 100000) {
      riskScore += 15; riskCategories.push(`Penalty — $${(enforcement.amount / 1000).toFixed(0)}K`);
    }

    const vType = (enforcement.violationType + " " + enforcement.description).toLowerCase();
    if (vType.includes("fraud") || vType.includes("misrepresent")) {
      riskScore += 25; riskCategories.push("Investment Adviser Fraud");
      recommendedServices.push("SEC Exam Readiness Program");
    }
    if (vType.includes("fiduciary") || vType.includes("best interest")) {
      riskScore += 20; riskCategories.push("Fiduciary Duty Violation");
      recommendedServices.push("Fiduciary Compliance Program");
    }
    if (vType.includes("custody") || vType.includes("safekeeping")) {
      riskScore += 15; riskCategories.push("Custody Rule Violation");
      recommendedServices.push("SEC Custody Rule Compliance");
    }
    if (vType.includes("adv") || vType.includes("disclosure")) {
      riskScore += 10; riskCategories.push("Form ADV / Disclosure Violation");
      recommendedServices.push("Form ADV Review & Compliance");
    }
    if (vType.includes("compliance") || vType.includes("206(4)-7")) {
      riskScore += 10; riskCategories.push("Compliance Program Deficiency");
      recommendedServices.push("RIA Compliance Program Development");
    }

    riskScore = Math.min(riskScore, 100);
    const estimatedRemediation = riskScore >= 70 ? "12-24 months comprehensive RIA compliance" : riskScore >= 50 ? "6-12 months SEC enforcement response" : riskScore >= 25 ? "3-6 months compliance review" : "1-3 months exam preparation";

    return { enforcement, riskScore, riskCategories, recommendedServices: [...new Set(recommendedServices)], estimatedRemediation };
  }

  async runPipeline(db: D1Database, filters: SECIASearchFilters = {}): Promise<SECIAPipelineResult> {
    await ensureSECIATables(db);
    const { actions, total } = await this.fetchEnforcementActions(filters);
    const leads: SECIAComplianceLead[] = [];
    for (const action of actions) { const lead = this.scoreComplianceRisk(action); leads.push(lead); await storeSECIALead(db, lead); }
    leads.sort((a, b) => b.riskScore - a.riskScore);
    return { leads, totalMatched: total, filters, generatedAt: new Date().toISOString(), source: "SEC Investment Adviser Enforcement (sec.gov EDGAR)" };
  }
}

export async function ensureSECIATables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS sec_ia_leads (id TEXT PRIMARY KEY, respondent TEXT NOT NULL, firm_crd TEXT, state TEXT, action_type TEXT, violation_type TEXT, amount REAL DEFAULT 0, date_issued TEXT, release_number TEXT, risk_score INTEGER DEFAULT 0, risk_categories TEXT DEFAULT '[]', created_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_sec_ia_leads_score ON sec_ia_leads(risk_score DESC)"),
  ]);
}

export async function storeSECIALead(db: D1Database, lead: SECIAComplianceLead): Promise<void> {
  const e = lead.enforcement;
  await db.prepare("INSERT OR REPLACE INTO sec_ia_leads (id, respondent, firm_crd, state, action_type, violation_type, amount, date_issued, release_number, risk_score, risk_categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(e.id, e.respondent, e.firmCrd, e.state, e.actionType, e.violationType, e.amount, e.dateIssued, e.releaseNumber, lead.riskScore, JSON.stringify(lead.riskCategories)).run();
}

export async function getStoredSECIALeads(db: D1Database, filters: { state?: string; minScore?: number; limit?: number }): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM sec_ia_leads WHERE 1=1"; const binds: unknown[] = [];
  if (filters.state) { query += " AND state = ?"; binds.push(filters.state.toUpperCase()); }
  if (filters.minScore) { query += " AND risk_score >= ?"; binds.push(filters.minScore); }
  query += " ORDER BY risk_score DESC LIMIT ?"; binds.push(filters.limit ?? 50);
  return (await db.prepare(query).bind(...binds).all()).results as Record<string, unknown>[];
}

function mapToSECIAEnforcement(r: Record<string, unknown>): SECIAEnforcement {
  const src = (r["_source"] ?? r) as Record<string, unknown>;
  return {
    id: String(r["_id"] ?? src["file_num"] ?? `sec-ia-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
    respondent: String(src["display_names"]?.[0 as keyof typeof src["display_names"]] ?? src["entity_name"] ?? "Unknown"),
    firmCrd: String(src["crd_number"] ?? ""), state: String(src["state"] ?? ""),
    actionType: String(src["form_type"] ?? "Enforcement"),
    violationType: classifySECIAViolation(String(src["display_names"] ?? "") + " " + String(src["file_description"] ?? "")),
    amount: 0, dateIssued: String(src["file_date"] ?? src["date_filed"] ?? ""),
    description: String(src["file_description"] ?? ""), releaseNumber: String(src["release_number"] ?? ""),
    status: "Active",
  };
}

function classifySECIAViolation(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("fraud")) return "Fraud"; if (t.includes("fiduciar")) return "Fiduciary";
  if (t.includes("custody")) return "Custody"; if (t.includes("adv")) return "Form ADV";
  if (t.includes("compliance")) return "Compliance"; return "General";
}

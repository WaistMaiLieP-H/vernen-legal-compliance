/**
 * PBGC Intelligence Service — Pension Plan Enforcement Pipeline
 *
 * Connects to PBGC data covering pension plan terminations,
 * underfunded plans, and employer compliance obligations.
 *
 * Source: pbgc.gov open data, regulations.gov
 */

import type { Env } from "../index.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface PBGCPlan {
  planNumber: string;
  planName: string;
  sponsorName: string;
  state: string;
  planType: string;           // Single-Employer, Multiemployer
  terminationDate: string;
  terminationType: string;    // Standard, Distress, Involuntary
  participantCount: number;
  totalLiability: number;
  totalAssets: number;
  underfunding: number;
  status: string;
}

export interface PBGCComplianceLead {
  plan: PBGCPlan;
  riskScore: number;
  riskCategories: string[];
  recommendedServices: string[];
  estimatedRemediation: string;
}

export interface PBGCSearchFilters {
  state?: string;
  planType?: string;
  sponsorName?: string;
  limit?: number;
}

export interface PBGCPipelineResult {
  leads: PBGCComplianceLead[];
  totalMatched: number;
  filters: PBGCSearchFilters;
  generatedAt: string;
  source: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// PBGC API Client & Intelligence Service
// ═══════════════════════════════════════════════════════════════════════════

// PBGC plan data on data.gov
const PBGC_DATA_URL = "https://www.pbgc.gov/about/open-government/data";
const PBGC_REGS_URL = "https://www.regulations.gov/api/v4/documents";

export class PBGCIntelligenceService {

  async fetchPlanTerminations(filters: PBGCSearchFilters = {}): Promise<{ plans: PBGCPlan[]; total: number }> {
    // Primary: PBGC plan termination data (data.gov Socrata)
    try {
      const url = new URL("https://www.pbgc.gov/sites/default/files/legacy/docs/data/pension-plans-terminated.json");
      const response = await fetch(url.toString(), { headers: { "Accept": "application/json" } });
      if (!response.ok) { console.error(`PBGC data error: ${response.status}`); return this.fallbackFetch(filters); }
      const data = await response.json() as Record<string, unknown>[] | { data?: Record<string, unknown>[] };
      const results = Array.isArray(data) ? data : (data.data ?? []);
      if (results.length === 0) return this.fallbackFetch(filters);
      let plans = results.slice(0, filters.limit ?? 50).map((r: Record<string, unknown>) => ({
        planNumber: String(r["plan_number"] ?? r["planNumber"] ?? `pbgc-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
        planName: String(r["plan_name"] ?? r["planName"] ?? ""),
        sponsorName: String(r["sponsor_name"] ?? r["company_name"] ?? r["sponsorName"] ?? "Unknown"),
        state: String(r["state"] ?? ""),
        planType: String(r["plan_type"] ?? "Single-Employer"),
        terminationDate: String(r["termination_date"] ?? r["terminationDate"] ?? ""),
        terminationType: String(r["termination_type"] ?? classifyTermination(String(r["reason"] ?? ""))),
        participantCount: Number(r["participant_count"] ?? r["participants"] ?? 0),
        totalLiability: Number(r["total_liability"] ?? 0),
        totalAssets: Number(r["total_assets"] ?? 0),
        underfunding: Number(r["underfunding"] ?? (Number(r["total_liability"] ?? 0) - Number(r["total_assets"] ?? 0))),
        status: "Terminated",
      } as PBGCPlan));
      if (filters.state) plans = plans.filter(p => p.state.toUpperCase() === filters.state!.toUpperCase());
      if (filters.planType) plans = plans.filter(p => p.planType.toLowerCase().includes(filters.planType!.toLowerCase()));
      return { plans, total: plans.length };
    } catch (e) { console.error(`PBGC data API failed: ${e}`); return this.fallbackFetch(filters); }
  }

  private async fallbackFetch(filters: PBGCSearchFilters): Promise<{ plans: PBGCPlan[]; total: number }> {
    try {
      const url = new URL(PBGC_REGS_URL);
      url.searchParams.set("filter[agencyId]", "PBGC");
      url.searchParams.set("sort", "-postedDate");
      url.searchParams.set("page[size]", String(filters.limit ?? 50));
      if (filters.sponsorName) url.searchParams.set("filter[searchTerm]", filters.sponsorName);
      const response = await fetch(url.toString(), { headers: { "Accept": "application/vnd.api+json" } });
      if (!response.ok) { console.error(`PBGC regulations.gov fallback error: ${response.status}`); return { plans: [], total: 0 }; }
      const data = await response.json() as { data?: Record<string, unknown>[]; meta?: { totalElements?: number } };
      let plans = (data.data ?? []).map(mapToPBGCPlan);
      if (filters.state) plans = plans.filter(p => p.state.toUpperCase() === filters.state!.toUpperCase());
      if (filters.planType) plans = plans.filter(p => p.planType.toLowerCase().includes(filters.planType!.toLowerCase()));
      return { plans, total: data.meta?.totalElements ?? plans.length };
    } catch { return { plans: [], total: 0 }; }
  }

  scoreComplianceRisk(plan: PBGCPlan): PBGCComplianceLead {
    let riskScore = 0;
    const riskCategories: string[] = [];
    const recommendedServices: string[] = [];

    // Termination type
    const termType = (plan.terminationType ?? "").toLowerCase();
    if (termType.includes("involuntary")) {
      riskScore += 40;
      riskCategories.push("PBGC Involuntary Termination");
      recommendedServices.push("PBGC Involuntary Termination Response");
      recommendedServices.push("Employer Liability Assessment (ERISA 4062)");
    } else if (termType.includes("distress")) {
      riskScore += 30;
      riskCategories.push("Distress Termination");
      recommendedServices.push("Distress Termination Application Support");
    } else if (termType.includes("standard")) {
      riskScore += 10;
      riskCategories.push("Standard Termination");
      recommendedServices.push("Standard Termination Compliance");
    }

    // Underfunding
    if (plan.underfunding > 100000000) {
      riskScore += 25;
      riskCategories.push(`Severe Underfunding — $${(plan.underfunding / 1000000).toFixed(0)}M`);
      recommendedServices.push("Pension Funding Improvement Plan");
    } else if (plan.underfunding > 10000000) {
      riskScore += 15;
      riskCategories.push(`Significant Underfunding — $${(plan.underfunding / 1000000).toFixed(0)}M`);
    } else if (plan.underfunding > 1000000) {
      riskScore += 10;
      riskCategories.push(`Underfunded — $${(plan.underfunding / 1000000).toFixed(1)}M`);
    }

    // Participant count
    if (plan.participantCount > 10000) {
      riskScore += 10;
      riskCategories.push(`Large Plan — ${plan.participantCount.toLocaleString()} participants`);
    } else if (plan.participantCount > 1000) {
      riskScore += 5;
      riskCategories.push(`${plan.participantCount.toLocaleString()} participants`);
    }

    // Plan type
    if (plan.planType.toLowerCase().includes("multiemployer")) {
      riskScore += 5;
      riskCategories.push("Multiemployer Plan");
      recommendedServices.push("Multiemployer Plan Withdrawal Liability Assessment");
    }

    riskScore = Math.min(riskScore, 100);

    let estimatedRemediation: string;
    if (riskScore >= 70) estimatedRemediation = "12-24 months pension compliance remediation";
    else if (riskScore >= 50) estimatedRemediation = "6-12 months PBGC response & funding plan";
    else if (riskScore >= 25) estimatedRemediation = "3-6 months ERISA compliance review";
    else estimatedRemediation = "1-3 months plan documentation audit";

    return {
      plan,
      riskScore,
      riskCategories,
      recommendedServices: [...new Set(recommendedServices)],
      estimatedRemediation,
    };
  }

  async runPipeline(db: D1Database, filters: PBGCSearchFilters = {}): Promise<PBGCPipelineResult> {
    await ensurePBGCTables(db);

    const { plans, total } = await this.fetchPlanTerminations(filters);
    const leads: PBGCComplianceLead[] = [];

    for (const plan of plans) {
      const lead = this.scoreComplianceRisk(plan);
      leads.push(lead);
      await storePBGCLead(db, lead);
    }

    leads.sort((a, b) => b.riskScore - a.riskScore);

    return {
      leads,
      totalMatched: total,
      filters,
      generatedAt: new Date().toISOString(),
      source: "PBGC Pension Plan Data (pbgc.gov / regulations.gov)",
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// D1 Storage
// ═══════════════════════════════════════════════════════════════════════════

export async function ensurePBGCTables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS pbgc_leads (plan_number TEXT PRIMARY KEY, plan_name TEXT, sponsor_name TEXT NOT NULL, state TEXT, plan_type TEXT, termination_type TEXT, participant_count INTEGER DEFAULT 0, underfunding REAL DEFAULT 0, risk_score INTEGER DEFAULT 0, risk_categories TEXT DEFAULT '[]', created_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_pbgc_leads_state ON pbgc_leads(state)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_pbgc_leads_score ON pbgc_leads(risk_score DESC)"),
  ]);
}

export async function storePBGCLead(db: D1Database, lead: PBGCComplianceLead): Promise<void> {
  const p = lead.plan;
  await db.prepare(
    "INSERT OR REPLACE INTO pbgc_leads (plan_number, plan_name, sponsor_name, state, plan_type, termination_type, participant_count, underfunding, risk_score, risk_categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(p.planNumber, p.planName, p.sponsorName, p.state, p.planType, p.terminationType, p.participantCount, p.underfunding, lead.riskScore, JSON.stringify(lead.riskCategories)).run();
}

export async function getStoredPBGCLeads(
  db: D1Database,
  filters: { state?: string; planType?: string; minScore?: number; limit?: number }
): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM pbgc_leads WHERE 1=1";
  const binds: unknown[] = [];
  if (filters.state) { query += " AND state = ?"; binds.push(filters.state.toUpperCase()); }
  if (filters.planType) { query += " AND plan_type LIKE ?"; binds.push(`%${filters.planType}%`); }
  if (filters.minScore) { query += " AND risk_score >= ?"; binds.push(filters.minScore); }
  query += " ORDER BY risk_score DESC LIMIT ?";
  binds.push(filters.limit ?? 50);
  return (await db.prepare(query).bind(...binds).all()).results as Record<string, unknown>[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Data Mapper
// ═══════════════════════════════════════════════════════════════════════════

function mapToPBGCPlan(r: Record<string, unknown>): PBGCPlan {
  const attrs = (r["attributes"] ?? r) as Record<string, unknown>;
  const title = String(attrs["title"] ?? "");
  return {
    planNumber: String(r["id"] ?? attrs["planNumber"] ?? `pbgc-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
    planName: title || String(attrs["planName"] ?? ""),
    sponsorName: title.split(/[–—-]/)[0]?.trim() || String(attrs["sponsorName"] ?? "Unknown"),
    state: String(attrs["stateProvince"] ?? attrs["state"] ?? ""),
    planType: String(attrs["subtype"] ?? attrs["planType"] ?? "Single-Employer"),
    terminationDate: String(attrs["terminationDate"] ?? attrs["postedDate"] ?? ""),
    terminationType: classifyTermination(title + " " + String(attrs["summary"] ?? "")),
    participantCount: Number(attrs["participantCount"] ?? 0),
    totalLiability: Number(attrs["totalLiability"] ?? 0),
    totalAssets: Number(attrs["totalAssets"] ?? 0),
    underfunding: Number(attrs["underfunding"] ?? 0),
    status: String(attrs["withdrawnDate"] ? "Withdrawn" : "Active"),
  };
}

function classifyTermination(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("involuntary")) return "Involuntary";
  if (t.includes("distress")) return "Distress";
  if (t.includes("standard")) return "Standard";
  return "";
}

/**
 * USDA Intelligence Service — Food Safety & Agricultural Enforcement Pipeline
 *
 * Connects to USDA FSIS recall data and APHIS enforcement actions.
 * Covers food safety recalls, meat/poultry inspection failures,
 * and agricultural compliance violations.
 *
 * Source: USDA FSIS API (free, no key required)
 */

import type { Env } from "../index.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface USDARecall {
  recallNumber: string;
  establishment: string;
  recallDate: string;
  reason: string;
  product: string;
  quantity: string;
  classification: string;  // Class I, II, III
  state: string;
  riskLevel: string;       // High, Medium, Low
  status: string;
}

export interface USDAComplianceLead {
  recall: USDARecall;
  riskScore: number;
  riskCategories: string[];
  recommendedServices: string[];
  estimatedRemediation: string;
}

export interface USDASearchFilters {
  state?: string;
  classification?: string;
  reason?: string;
  limit?: number;
}

export interface USDABPipelineResult {
  leads: USDAComplianceLead[];
  totalMatched: number;
  filters: USDASearchFilters;
  generatedAt: string;
  source: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// USDA FSIS Client & Intelligence Service
// ═══════════════════════════════════════════════════════════════════════════

const FSIS_RECALL_URL = "https://www.fsis.usda.gov/sites/default/files/media_file/fsis-recalls.json";
const FSIS_RECALL_API = "https://api.fsis.usda.gov/recall";

export class USDAIntelligenceService {

  async fetchRecalls(filters: USDASearchFilters = {}): Promise<{ recalls: USDARecall[]; total: number }> {
    // Try the JSON file first (more reliable), fall back to API
    try {
      const response = await fetch(FSIS_RECALL_URL, {
        headers: { "Accept": "application/json" },
      });

      if (!response.ok) throw new Error(`FSIS status ${response.status}`);

      const data = await response.json() as Record<string, unknown>[];
      let recalls = (Array.isArray(data) ? data : []).map(mapToUSDARecall);

      if (filters.state) {
        recalls = recalls.filter(r => r.state.toUpperCase().includes(filters.state!.toUpperCase()));
      }
      if (filters.classification) {
        recalls = recalls.filter(r => r.classification.includes(filters.classification!));
      }
      if (filters.reason) {
        const reasonLower = filters.reason.toLowerCase();
        recalls = recalls.filter(r => r.reason.toLowerCase().includes(reasonLower));
      }

      const limit = filters.limit ?? 100;
      return { recalls: recalls.slice(0, limit), total: recalls.length };
    } catch {
      // Fallback: try the API endpoint
      try {
        const url = new URL(FSIS_RECALL_API);
        url.searchParams.set("limit", String(filters.limit ?? 100));
        const response = await fetch(url.toString(), { headers: { "Accept": "application/json" } });
        if (!response.ok) return { recalls: [], total: 0 };
        const data = await response.json() as { results?: Record<string, unknown>[] };
        const recalls = (data.results ?? []).map(mapToUSDARecall);
        return { recalls, total: recalls.length };
      } catch {
        return { recalls: [], total: 0 };
      }
    }
  }

  scoreComplianceRisk(recall: USDARecall): USDAComplianceLead {
    let riskScore = 0;
    const riskCategories: string[] = [];
    const recommendedServices: string[] = [];

    // Classification scoring
    if (recall.classification === "Class I") {
      riskScore += 40;
      riskCategories.push("Class I — Health Hazard Situation with Reasonable Probability of Serious Consequences or Death");
      recommendedServices.push("Emergency FSIS Recall Response");
      recommendedServices.push("HACCP Plan Audit & Remediation");
    } else if (recall.classification === "Class II") {
      riskScore += 25;
      riskCategories.push("Class II — Remote Probability of Adverse Health Consequences");
      recommendedServices.push("FSIS Corrective Action Plan");
    } else if (recall.classification === "Class III") {
      riskScore += 10;
      riskCategories.push("Class III — No Adverse Health Consequences");
    }

    // Reason-based risk
    const reason = (recall.reason ?? "").toLowerCase();
    if (reason.includes("salmonella") || reason.includes("listeria") || reason.includes("e. coli") || reason.includes("botulism")) {
      riskScore += 25;
      riskCategories.push("Pathogen Contamination");
      recommendedServices.push("Pathogen Control Program Development");
    }
    if (reason.includes("undeclared") || reason.includes("allergen")) {
      riskScore += 15;
      riskCategories.push("Undeclared Allergen");
      recommendedServices.push("Allergen Control & Labeling Compliance");
    }
    if (reason.includes("foreign") || reason.includes("metal") || reason.includes("plastic") || reason.includes("bone")) {
      riskScore += 20;
      riskCategories.push("Foreign Material Contamination");
      recommendedServices.push("Foreign Material Prevention Program");
    }
    if (reason.includes("misbranded") || reason.includes("mislabeled")) {
      riskScore += 10;
      riskCategories.push("Misbranding/Mislabeling");
      recommendedServices.push("Label Compliance Review");
    }

    // Quantity scoring
    const qty = recall.quantity.toLowerCase();
    if (qty.includes("million") || parseQuantityPounds(qty) > 100000) {
      riskScore += 15;
      riskCategories.push("Large Volume Recall");
    }

    riskScore = Math.min(riskScore, 100);

    let estimatedRemediation: string;
    if (riskScore >= 70) estimatedRemediation = "6-12 months comprehensive food safety remediation";
    else if (riskScore >= 50) estimatedRemediation = "3-6 months HACCP/FSIS corrective action";
    else if (riskScore >= 25) estimatedRemediation = "1-3 months food safety review";
    else estimatedRemediation = "< 1 month recall documentation audit";

    return {
      recall,
      riskScore,
      riskCategories,
      recommendedServices: [...new Set(recommendedServices)],
      estimatedRemediation,
    };
  }

  async runPipeline(db: D1Database, filters: USDASearchFilters = {}): Promise<USDABPipelineResult> {
    await ensureUSDATables(db);

    const { recalls, total } = await this.fetchRecalls(filters);
    const leads: USDAComplianceLead[] = [];

    for (const recall of recalls) {
      const lead = this.scoreComplianceRisk(recall);
      leads.push(lead);
      await storeUSDALead(db, lead);
    }

    leads.sort((a, b) => b.riskScore - a.riskScore);

    return {
      leads,
      totalMatched: total,
      filters,
      generatedAt: new Date().toISOString(),
      source: "USDA FSIS Recall Database (fsis.usda.gov)",
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// D1 Storage
// ═══════════════════════════════════════════════════════════════════════════

export async function ensureUSDATables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS usda_leads (recall_number TEXT PRIMARY KEY, establishment TEXT NOT NULL, state TEXT, classification TEXT, reason TEXT, product TEXT, quantity TEXT, risk_score INTEGER DEFAULT 0, risk_categories TEXT DEFAULT '[]', created_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_usda_leads_state ON usda_leads(state)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_usda_leads_score ON usda_leads(risk_score DESC)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_usda_leads_classification ON usda_leads(classification)"),
  ]);
}

export async function storeUSDALead(db: D1Database, lead: USDAComplianceLead): Promise<void> {
  const r = lead.recall;
  await db.prepare(
    "INSERT OR REPLACE INTO usda_leads (recall_number, establishment, state, classification, reason, product, quantity, risk_score, risk_categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(r.recallNumber, r.establishment, r.state, r.classification, r.reason, r.product, r.quantity, lead.riskScore, JSON.stringify(lead.riskCategories)).run();
}

export async function getStoredUSDALeads(
  db: D1Database,
  filters: { state?: string; classification?: string; minScore?: number; limit?: number }
): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM usda_leads WHERE 1=1";
  const binds: unknown[] = [];
  if (filters.state) { query += " AND state = ?"; binds.push(filters.state.toUpperCase()); }
  if (filters.classification) { query += " AND classification = ?"; binds.push(filters.classification); }
  if (filters.minScore) { query += " AND risk_score >= ?"; binds.push(filters.minScore); }
  query += " ORDER BY risk_score DESC LIMIT ?";
  binds.push(filters.limit ?? 50);
  return (await db.prepare(query).bind(...binds).all()).results as Record<string, unknown>[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Data Mapper
// ═══════════════════════════════════════════════════════════════════════════

function mapToUSDARecall(r: Record<string, unknown>): USDARecall {
  return {
    recallNumber: String(r["Recall_Number"] ?? r["recall_number"] ?? r["recallNumber"] ?? `usda-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
    establishment: String(r["Establishment"] ?? r["establishment"] ?? r["company"] ?? "Unknown"),
    recallDate: String(r["Recall_Date"] ?? r["recall_date"] ?? r["date"] ?? ""),
    reason: String(r["Reason"] ?? r["reason"] ?? r["reason_for_recall"] ?? ""),
    product: String(r["Product"] ?? r["product"] ?? r["product_name"] ?? ""),
    quantity: String(r["Quantity"] ?? r["quantity"] ?? r["pounds_recalled"] ?? ""),
    classification: String(r["Classification"] ?? r["classification"] ?? r["class"] ?? ""),
    state: String(r["State"] ?? r["state"] ?? ""),
    riskLevel: String(r["Risk_Level"] ?? r["risk_level"] ?? ""),
    status: String(r["Status"] ?? r["status"] ?? "Active"),
  };
}

function parseQuantityPounds(qty: string): number {
  const match = qty.match(/([\d,]+)/);
  if (!match || !match[1]) return 0;
  return parseInt(match[1].replace(/,/g, ""), 10) || 0;
}

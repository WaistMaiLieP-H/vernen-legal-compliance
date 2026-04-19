/**
 * CPSC Intelligence Service — Consumer Product Safety Pipeline
 *
 * Connects to the CPSC Recalls API to identify manufacturers and
 * retailers with documented product safety recalls, violations,
 * and civil penalties.
 *
 * Source: cpsc.gov/Recalls/CPSC-Recalls-Application-Program-Interface (free, no key)
 */

import type { Env } from "../index.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface CPSCRecall {
  recallId: string;
  recallNumber: string;
  recallDate: string;
  title: string;
  description: string;
  product: string;
  hazard: string;
  remedy: string;
  manufacturer: string;
  retailer: string;
  unitsAffected: string;
  injuryCount: number;
  deathCount: number;
  images: string[];
  url: string;
}

export interface CPSCComplianceLead {
  recall: CPSCRecall;
  riskScore: number;
  riskCategories: string[];
  recommendedServices: string[];
  estimatedRemediation: string;
}

export interface CPSCSearchFilters {
  query?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
}

export interface CPSCPipelineResult {
  leads: CPSCComplianceLead[];
  totalMatched: number;
  filters: CPSCSearchFilters;
  generatedAt: string;
  source: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// CPSC API Client & Intelligence Service
// ═══════════════════════════════════════════════════════════════════════════

const CPSC_API_URL = "https://www.saferproducts.gov/RestWebServices/Recall";

export class CPSCIntelligenceService {

  async fetchRecalls(filters: CPSCSearchFilters = {}): Promise<{ recalls: CPSCRecall[]; total: number }> {
    const url = new URL(CPSC_API_URL);
    url.searchParams.set("format", "json");
    if (filters.query) url.searchParams.set("RecallTitle", filters.query);
    if (filters.startDate) url.searchParams.set("RecallDateStart", filters.startDate);
    if (filters.endDate) url.searchParams.set("RecallDateEnd", filters.endDate);

    try {
      const response = await fetch(url.toString(), {
        headers: { "Accept": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`CPSC API error ${response.status}`);
      }

      const data = await response.json() as Record<string, unknown>[];
      const results = Array.isArray(data) ? data : [];
      const limit = filters.limit ?? 100;
      const recalls = results.slice(0, limit).map(mapToCPSCRecall);

      return { recalls, total: results.length };
    } catch {
      return { recalls: [], total: 0 };
    }
  }

  scoreComplianceRisk(recall: CPSCRecall): CPSCComplianceLead {
    let riskScore = 0;
    const riskCategories: string[] = [];
    const recommendedServices: string[] = [];

    // Death scoring
    if (recall.deathCount > 0) {
      riskScore += 40;
      riskCategories.push(`Fatal Product Defect — ${recall.deathCount} deaths`);
      recommendedServices.push("CPSC Section 15 Mandatory Report Response");
      recommendedServices.push("Product Liability Risk Assessment");
    }

    // Injury scoring
    if (recall.injuryCount > 100) {
      riskScore += 25;
      riskCategories.push(`Mass Injury Event — ${recall.injuryCount} injuries`);
      recommendedServices.push("Product Recall Campaign Management");
    } else if (recall.injuryCount > 0) {
      riskScore += 15;
      riskCategories.push(`Injuries Reported — ${recall.injuryCount}`);
    }

    // Hazard keyword analysis
    const hazard = (recall.hazard ?? "").toLowerCase();
    if (hazard.includes("fire") || hazard.includes("burn") || hazard.includes("electrocution")) {
      riskScore += 20;
      riskCategories.push("Fire/Burn/Electrocution Hazard");
      recommendedServices.push("Product Safety Testing & Certification");
    }
    if (hazard.includes("laceration") || hazard.includes("amputation")) {
      riskScore += 15;
      riskCategories.push("Laceration/Amputation Hazard");
    }
    if (hazard.includes("choking") || hazard.includes("strangulation") || hazard.includes("suffocation")) {
      riskScore += 20;
      riskCategories.push("Choking/Strangulation/Suffocation Hazard");
      recommendedServices.push("Children's Product Safety Compliance (CPSIA)");
    }
    if (hazard.includes("lead") || hazard.includes("chemical") || hazard.includes("toxic")) {
      riskScore += 15;
      riskCategories.push("Chemical/Toxic Hazard");
      recommendedServices.push("Chemical Compliance & Third-Party Testing");
    }

    // Units affected
    const units = parseUnits(recall.unitsAffected);
    if (units > 1000000) {
      riskScore += 10;
      riskCategories.push("Mass Recall — 1M+ units");
    } else if (units > 100000) {
      riskScore += 5;
      riskCategories.push("Large Recall — 100K+ units");
    }

    riskScore = Math.min(riskScore, 100);

    let estimatedRemediation: string;
    if (riskScore >= 70) estimatedRemediation = "6-12 months comprehensive product safety remediation";
    else if (riskScore >= 50) estimatedRemediation = "3-6 months recall compliance program";
    else if (riskScore >= 25) estimatedRemediation = "1-3 months product safety review";
    else estimatedRemediation = "< 1 month recall documentation audit";

    return {
      recall,
      riskScore,
      riskCategories,
      recommendedServices: [...new Set(recommendedServices)],
      estimatedRemediation,
    };
  }

  async runPipeline(db: D1Database, filters: CPSCSearchFilters = {}): Promise<CPSCPipelineResult> {
    await ensureCPSCTables(db);

    const { recalls, total } = await this.fetchRecalls(filters);
    const leads: CPSCComplianceLead[] = [];

    for (const recall of recalls) {
      const lead = this.scoreComplianceRisk(recall);
      leads.push(lead);
      await storeCPSCLead(db, lead);
    }

    leads.sort((a, b) => b.riskScore - a.riskScore);

    return {
      leads,
      totalMatched: total,
      filters,
      generatedAt: new Date().toISOString(),
      source: "CPSC SaferProducts Recall Database (saferproducts.gov)",
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// D1 Storage
// ═══════════════════════════════════════════════════════════════════════════

export async function ensureCPSCTables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS cpsc_leads (recall_id TEXT PRIMARY KEY, recall_number TEXT, manufacturer TEXT NOT NULL, product TEXT, hazard TEXT, recall_date TEXT, units_affected TEXT, injuries INTEGER DEFAULT 0, deaths INTEGER DEFAULT 0, risk_score INTEGER DEFAULT 0, risk_categories TEXT DEFAULT '[]', created_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_cpsc_leads_score ON cpsc_leads(risk_score DESC)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_cpsc_leads_manufacturer ON cpsc_leads(manufacturer)"),
  ]);
}

export async function storeCPSCLead(db: D1Database, lead: CPSCComplianceLead): Promise<void> {
  const r = lead.recall;
  await db.prepare(
    "INSERT OR REPLACE INTO cpsc_leads (recall_id, recall_number, manufacturer, product, hazard, recall_date, units_affected, injuries, deaths, risk_score, risk_categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(r.recallId, r.recallNumber, r.manufacturer, r.product, r.hazard, r.recallDate, r.unitsAffected, r.injuryCount, r.deathCount, lead.riskScore, JSON.stringify(lead.riskCategories)).run();
}

export async function getStoredCPSCLeads(
  db: D1Database,
  filters: { manufacturer?: string; minScore?: number; limit?: number }
): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM cpsc_leads WHERE 1=1";
  const binds: unknown[] = [];
  if (filters.manufacturer) { query += " AND manufacturer LIKE ?"; binds.push(`%${filters.manufacturer}%`); }
  if (filters.minScore) { query += " AND risk_score >= ?"; binds.push(filters.minScore); }
  query += " ORDER BY risk_score DESC LIMIT ?";
  binds.push(filters.limit ?? 50);
  return (await db.prepare(query).bind(...binds).all()).results as Record<string, unknown>[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Data Mapper
// ═══════════════════════════════════════════════════════════════════════════

function mapToCPSCRecall(r: Record<string, unknown>): CPSCRecall {
  const products = (r["Products"] ?? r["products"] ?? []) as Record<string, unknown>[];
  const hazards = (r["Hazards"] ?? r["hazards"] ?? []) as Record<string, unknown>[];
  const remedies = (r["Remedies"] ?? r["remedies"] ?? []) as Record<string, unknown>[];
  const injuries = (r["Injuries"] ?? r["injuries"] ?? []) as Record<string, unknown>[];
  const manufacturers = (r["Manufacturers"] ?? r["manufacturers"] ?? []) as Record<string, unknown>[];
  const retailers = (r["Retailers"] ?? r["retailers"] ?? []) as Record<string, unknown>[];
  const images = (r["Images"] ?? r["images"] ?? []) as Record<string, unknown>[];

  const product = products[0] ?? {};
  const hazard = hazards[0] ?? {};
  const remedy = remedies[0] ?? {};
  const mfr = manufacturers[0] ?? {};
  const retailer = retailers[0] ?? {};

  let injuryCount = 0;
  let deathCount = 0;
  for (const inj of injuries) {
    const name = String(inj["Name"] ?? inj["name"] ?? "").toLowerCase();
    if (name.includes("death")) deathCount += Number(inj["Count"] ?? inj["count"] ?? 0);
    else injuryCount += Number(inj["Count"] ?? inj["count"] ?? 0);
  }

  return {
    recallId: String(r["RecallID"] ?? r["recallId"] ?? r["RecallNumber"] ?? `cpsc-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
    recallNumber: String(r["RecallNumber"] ?? r["recallNumber"] ?? ""),
    recallDate: String(r["RecallDate"] ?? r["recallDate"] ?? ""),
    title: String(r["Title"] ?? r["title"] ?? ""),
    description: String(r["Description"] ?? r["description"] ?? product["Description"] ?? ""),
    product: String(product["Name"] ?? product["name"] ?? product["Description"] ?? ""),
    hazard: String(hazard["Name"] ?? hazard["name"] ?? hazard["HazardDescription"] ?? ""),
    remedy: String(remedy["Name"] ?? remedy["name"] ?? ""),
    manufacturer: String(mfr["Name"] ?? mfr["name"] ?? mfr["CompanyName"] ?? "Unknown"),
    retailer: String(retailer["Name"] ?? retailer["name"] ?? ""),
    unitsAffected: String(r["NumberOfUnits"] ?? r["numberOfUnits"] ?? product["NumberOfUnits"] ?? ""),
    injuryCount,
    deathCount,
    images: images.map(img => String(img["URL"] ?? img["url"] ?? "")),
    url: String(r["URL"] ?? r["url"] ?? ""),
  };
}

function parseUnits(units: string): number {
  if (!units) return 0;
  const cleaned = units.replace(/[^0-9]/g, "");
  return parseInt(cleaned, 10) || 0;
}

/**
 * NHTSA Intelligence Service — Vehicle Safety Pipeline
 *
 * Connects to the NHTSA Recalls & Complaints API to identify entities with
 * documented vehicle safety defects, recall campaigns, and investigations.
 *
 * Source: api.nhtsa.dot.gov (free, no key required)
 */

import type { Env } from "../index.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface NHTSARecall {
  nhtsaCampaignNumber: string;
  manufacturer: string;
  make: string;
  model: string;
  modelYear: string;
  component: string;
  summary: string;
  consequence: string;
  remedy: string;
  reportReceivedDate: string;
  potentialUnitsAffected: number;
}

export interface NHTSAComplaint {
  odiNumber: string;
  manufacturer: string;
  make: string;
  model: string;
  modelYear: string;
  dateOfIncident: string;
  numberOfInjuries: number;
  numberOfDeaths: number;
  summary: string;
  component: string;
}

export interface NHTSAComplianceLead {
  type: "recall" | "complaint";
  recall?: NHTSARecall;
  complaint?: NHTSAComplaint;
  entity: string;
  riskScore: number;
  riskCategories: string[];
  recommendedServices: string[];
  estimatedRemediation: string;
}

export interface NHTSASearchFilters {
  make?: string;
  model?: string;
  year?: string;
  limit?: number;
}

export interface NHTSAPipelineResult {
  leads: NHTSAComplianceLead[];
  totalRecalls: number;
  totalComplaints: number;
  filters: NHTSASearchFilters;
  generatedAt: string;
  source: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// NHTSA API Client & Intelligence Service
// ═══════════════════════════════════════════════════════════════════════════

const NHTSA_API_BASE = "https://api.nhtsa.dot.gov";

export class NHTSAIntelligenceService {

  private async nhtsaRequest<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      headers: { "Accept": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`NHTSA API error ${response.status}: ${await response.text()}`);
    }
    return response.json() as Promise<T>;
  }

  async fetchRecalls(filters: NHTSASearchFilters = {}): Promise<{ recalls: NHTSARecall[]; total: number }> {
    // NHTSA recalls API: /recalls/recallsByYear/{year}
    const year = filters.year ?? new Date().getFullYear().toString();
    const url = `${NHTSA_API_BASE}/products/vehicle/recalls?modelYear=${year}&issueType=r&format=json`;

    try {
      const data = await this.nhtsaRequest<{ results: Record<string, unknown>[]; count: number }>(url);
      const results = data.results ?? [];
      let recalls = results.map(mapToRecall);

      if (filters.make) {
        const makeLower = filters.make.toLowerCase();
        recalls = recalls.filter(r => r.make.toLowerCase().includes(makeLower));
      }
      if (filters.model) {
        const modelLower = filters.model.toLowerCase();
        recalls = recalls.filter(r => r.model.toLowerCase().includes(modelLower));
      }

      const limit = filters.limit ?? 100;
      return { recalls: recalls.slice(0, limit), total: data.count ?? recalls.length };
    } catch {
      // Fallback: use flat file recalls endpoint
      const fallbackUrl = `${NHTSA_API_BASE}/recalls/recallsByYear/${year}?format=json`;
      try {
        const data = await this.nhtsaRequest<{ results: Record<string, unknown>[]; Count: number }>(fallbackUrl);
        const results = data.results ?? [];
        let recalls = results.map(mapToRecall);
        if (filters.make) {
          recalls = recalls.filter(r => r.make.toLowerCase().includes(filters.make!.toLowerCase()));
        }
        const limit = filters.limit ?? 100;
        return { recalls: recalls.slice(0, limit), total: data.Count ?? recalls.length };
      } catch {
        return { recalls: [], total: 0 };
      }
    }
  }

  async fetchComplaints(filters: NHTSASearchFilters = {}): Promise<{ complaints: NHTSAComplaint[]; total: number }> {
    const year = filters.year ?? new Date().getFullYear().toString();
    const make = filters.make ?? "";
    const model = filters.model ?? "";

    let url: string;
    if (make && model) {
      url = `${NHTSA_API_BASE}/complaints/complaintsByVehicle?make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}&modelYear=${year}&format=json`;
    } else {
      url = `${NHTSA_API_BASE}/complaints/complaintsByYear/${year}?format=json`;
    }

    try {
      const data = await this.nhtsaRequest<{ results: Record<string, unknown>[]; count?: number; Count?: number }>(url);
      const results = data.results ?? [];
      const complaints = results.map(mapToComplaint).slice(0, filters.limit ?? 100);
      return { complaints, total: data.count ?? data.Count ?? complaints.length };
    } catch {
      return { complaints: [], total: 0 };
    }
  }

  scoreRecallRisk(recall: NHTSARecall): NHTSAComplianceLead {
    let riskScore = 0;
    const riskCategories: string[] = [];
    const recommendedServices: string[] = [];

    // Units affected scoring
    if (recall.potentialUnitsAffected > 500000) {
      riskScore += 35;
      riskCategories.push("Mass Recall — 500K+ Units");
      recommendedServices.push("Mass Recall Campaign Management");
    } else if (recall.potentialUnitsAffected > 100000) {
      riskScore += 25;
      riskCategories.push("Major Recall — 100K+ Units");
      recommendedServices.push("Recall Compliance Program Development");
    } else if (recall.potentialUnitsAffected > 10000) {
      riskScore += 15;
      riskCategories.push("Significant Recall — 10K+ Units");
    }

    // Safety consequence keywords
    const consequence = (recall.consequence ?? "").toLowerCase();
    if (consequence.includes("fire") || consequence.includes("crash") || consequence.includes("death")) {
      riskScore += 30;
      riskCategories.push("Life Safety Risk — Fire/Crash/Death");
      recommendedServices.push("NHTSA Defect Investigation Response");
    } else if (consequence.includes("injury") || consequence.includes("loss of control")) {
      riskScore += 20;
      riskCategories.push("Injury Risk");
      recommendedServices.push("Safety Defect Remediation Planning");
    }

    // Component severity
    const component = (recall.component ?? "").toLowerCase();
    if (component.includes("airbag") || component.includes("fuel") || component.includes("steering") || component.includes("brake")) {
      riskScore += 15;
      riskCategories.push(`Critical Component — ${recall.component}`);
      recommendedServices.push("Critical Safety Component Audit");
    }

    riskScore = Math.min(riskScore, 100);

    let estimatedRemediation: string;
    if (riskScore >= 70) estimatedRemediation = "6-12 months comprehensive recall remediation";
    else if (riskScore >= 50) estimatedRemediation = "3-6 months targeted recall compliance";
    else if (riskScore >= 25) estimatedRemediation = "1-3 months recall documentation review";
    else estimatedRemediation = "< 1 month recall closure audit";

    return {
      type: "recall",
      recall,
      entity: recall.manufacturer,
      riskScore,
      riskCategories,
      recommendedServices: [...new Set(recommendedServices)],
      estimatedRemediation,
    };
  }

  scoreComplaintRisk(complaint: NHTSAComplaint): NHTSAComplianceLead {
    let riskScore = 0;
    const riskCategories: string[] = [];
    const recommendedServices: string[] = [];

    if (complaint.numberOfDeaths > 0) {
      riskScore += 40;
      riskCategories.push(`Fatal Incident — ${complaint.numberOfDeaths} deaths`);
      recommendedServices.push("Fatal Incident Response & NHTSA Cooperation");
    }
    if (complaint.numberOfInjuries > 0) {
      riskScore += 25;
      riskCategories.push(`Injury Incident — ${complaint.numberOfInjuries} injuries`);
      recommendedServices.push("Injury Complaint Investigation Support");
    }

    const summary = (complaint.summary ?? "").toLowerCase();
    if (summary.includes("fire") || summary.includes("rollover")) {
      riskScore += 20;
      riskCategories.push("Fire/Rollover Risk");
    }

    riskScore = Math.min(riskScore, 100);

    return {
      type: "complaint",
      complaint,
      entity: complaint.manufacturer,
      riskScore,
      riskCategories,
      recommendedServices: [...new Set(recommendedServices)],
      estimatedRemediation: riskScore >= 50 ? "3-6 months investigation support" : "1-3 months complaint review",
    };
  }

  async runPipeline(db: D1Database, filters: NHTSASearchFilters = {}): Promise<NHTSAPipelineResult> {
    await ensureNHTSATables(db);

    const [recallResult, complaintResult] = await Promise.all([
      this.fetchRecalls(filters),
      this.fetchComplaints(filters),
    ]);

    const leads: NHTSAComplianceLead[] = [];

    for (const recall of recallResult.recalls) {
      const lead = this.scoreRecallRisk(recall);
      leads.push(lead);
      await storeNHTSALead(db, lead);
    }

    for (const complaint of complaintResult.complaints) {
      const lead = this.scoreComplaintRisk(complaint);
      if (lead.riskScore > 0) {
        leads.push(lead);
        await storeNHTSALead(db, lead);
      }
    }

    leads.sort((a, b) => b.riskScore - a.riskScore);

    return {
      leads,
      totalRecalls: recallResult.total,
      totalComplaints: complaintResult.total,
      filters,
      generatedAt: new Date().toISOString(),
      source: "NHTSA Vehicle Safety Data (api.nhtsa.dot.gov)",
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// D1 Storage
// ═══════════════════════════════════════════════════════════════════════════

export async function ensureNHTSATables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS nhtsa_leads (id TEXT PRIMARY KEY, type TEXT NOT NULL, entity TEXT NOT NULL, make TEXT, model TEXT, model_year TEXT, component TEXT, summary TEXT, risk_score INTEGER DEFAULT 0, risk_categories TEXT DEFAULT '[]', units_affected INTEGER DEFAULT 0, deaths INTEGER DEFAULT 0, injuries INTEGER DEFAULT 0, created_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_nhtsa_leads_entity ON nhtsa_leads(entity)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_nhtsa_leads_score ON nhtsa_leads(risk_score DESC)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_nhtsa_leads_make ON nhtsa_leads(make)"),
  ]);
}

export async function storeNHTSALead(db: D1Database, lead: NHTSAComplianceLead): Promise<void> {
  const id = lead.recall?.nhtsaCampaignNumber ?? lead.complaint?.odiNumber ?? `nhtsa-${Date.now()}`;
  const make = lead.recall?.make ?? lead.complaint?.make ?? "";
  const model = lead.recall?.model ?? lead.complaint?.model ?? "";
  const modelYear = lead.recall?.modelYear ?? lead.complaint?.modelYear ?? "";
  const component = lead.recall?.component ?? lead.complaint?.component ?? "";
  const summary = lead.recall?.summary ?? lead.complaint?.summary ?? "";
  const units = lead.recall?.potentialUnitsAffected ?? 0;
  const deaths = lead.complaint?.numberOfDeaths ?? 0;
  const injuries = lead.complaint?.numberOfInjuries ?? 0;

  await db.prepare(
    "INSERT OR REPLACE INTO nhtsa_leads (id, type, entity, make, model, model_year, component, summary, risk_score, risk_categories, units_affected, deaths, injuries) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(id, lead.type, lead.entity, make, model, modelYear, component, summary, lead.riskScore, JSON.stringify(lead.riskCategories), units, deaths, injuries).run();
}

export async function getStoredNHTSALeads(
  db: D1Database,
  filters: { make?: string; minScore?: number; limit?: number }
): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM nhtsa_leads WHERE 1=1";
  const binds: unknown[] = [];
  if (filters.make) { query += " AND make = ?"; binds.push(filters.make.toUpperCase()); }
  if (filters.minScore) { query += " AND risk_score >= ?"; binds.push(filters.minScore); }
  query += " ORDER BY risk_score DESC LIMIT ?";
  binds.push(filters.limit ?? 50);
  return (await db.prepare(query).bind(...binds).all()).results as Record<string, unknown>[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Data Mappers
// ═══════════════════════════════════════════════════════════════════════════

function mapToRecall(r: Record<string, unknown>): NHTSARecall {
  return {
    nhtsaCampaignNumber: String(r["NHTSACampaignNumber"] ?? r["nhtsaCampaignNumber"] ?? r["NHTSA_CAMPAIGN_NUMBER"] ?? ""),
    manufacturer: String(r["Manufacturer"] ?? r["manufacturer"] ?? r["MANUFACTURER"] ?? ""),
    make: String(r["Make"] ?? r["make"] ?? r["MAKE"] ?? ""),
    model: String(r["Model"] ?? r["model"] ?? r["MODEL"] ?? ""),
    modelYear: String(r["ModelYear"] ?? r["modelYear"] ?? r["MODEL_YEAR"] ?? ""),
    component: String(r["Component"] ?? r["component"] ?? r["COMPONENT"] ?? ""),
    summary: String(r["Summary"] ?? r["summary"] ?? r["SUMMARY"] ?? ""),
    consequence: String(r["Consequence"] ?? r["consequence"] ?? r["CONSEQUENCE"] ?? ""),
    remedy: String(r["Remedy"] ?? r["remedy"] ?? r["REMEDY"] ?? ""),
    reportReceivedDate: String(r["ReportReceivedDate"] ?? r["reportReceivedDate"] ?? ""),
    potentialUnitsAffected: Number(r["PotentialNumberOfUnitsAffected"] ?? r["potentialNumberOfUnitsAffected"] ?? 0),
  };
}

function mapToComplaint(r: Record<string, unknown>): NHTSAComplaint {
  return {
    odiNumber: String(r["ODINumber"] ?? r["odiNumber"] ?? r["ODI_NUMBER"] ?? `c-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
    manufacturer: String(r["Manufacturer"] ?? r["manufacturer"] ?? r["MANUFACTURER"] ?? ""),
    make: String(r["Make"] ?? r["make"] ?? r["MAKE"] ?? ""),
    model: String(r["Model"] ?? r["model"] ?? r["MODEL"] ?? ""),
    modelYear: String(r["ModelYear"] ?? r["modelYear"] ?? r["MODEL_YEAR"] ?? ""),
    dateOfIncident: String(r["DateOfIncident"] ?? r["dateOfIncident"] ?? ""),
    numberOfInjuries: Number(r["NumberOfInjuries"] ?? r["numberOfInjuries"] ?? 0),
    numberOfDeaths: Number(r["NumberOfDeaths"] ?? r["numberOfDeaths"] ?? 0),
    summary: String(r["Summary"] ?? r["summary"] ?? r["SUMMARY"] ?? ""),
    component: String(r["Component"] ?? r["component"] ?? r["COMPONENT"] ?? ""),
  };
}

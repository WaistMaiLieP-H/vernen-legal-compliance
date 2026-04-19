/**
 * PHMSA Intelligence Service — Pipeline & Hazmat Safety Pipeline
 *
 * Connects to PHMSA incident and enforcement data covering pipeline
 * accidents, hazardous materials transportation incidents, and
 * operator compliance violations.
 *
 * Source: phmsa.dot.gov open data (free, no key)
 */

import type { Env } from "../index.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface PHMSAIncident {
  reportNumber: string;
  operatorName: string;
  operatorId: string;
  state: string;
  city: string;
  incidentDate: string;
  systemType: string;         // Gas Distribution, Gas Transmission, Hazardous Liquid, LNG
  cause: string;
  subCause: string;
  fatalCount: number;
  injuryCount: number;
  propertyDamage: number;
  commodityReleased: string;
  unintentionalRelease: number; // barrels
}

export interface PHMSAComplianceLead {
  incident: PHMSAIncident;
  riskScore: number;
  riskCategories: string[];
  recommendedServices: string[];
  estimatedRemediation: string;
}

export interface PHMSASearchFilters {
  state?: string;
  systemType?: string;
  operator?: string;
  limit?: number;
}

export interface PHMSAPipelineResult {
  leads: PHMSAComplianceLead[];
  totalMatched: number;
  filters: PHMSASearchFilters;
  generatedAt: string;
  source: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// PHMSA API Client & Intelligence Service
// ═══════════════════════════════════════════════════════════════════════════

const PHMSA_INCIDENTS_URL = "https://portal.phmsa.dot.gov/analytics/saw.dll";
// Open data alternative
const PHMSA_DATA_URL = "https://www.phmsa.dot.gov/data-research/pipeline/pipeline-incident-flagged-files";
// Pipeline Safety Community data
const PHMSA_API_URL = "https://hip.phmsa.dot.gov/analyticsSOAP/saw.dll";

export class PHMSAIntelligenceService {

  async fetchIncidents(filters: PHMSASearchFilters = {}): Promise<{ incidents: PHMSAIncident[]; total: number }> {
    // PHMSA doesn't have a clean REST API — use their data files
    // Try the open data portal
    try {
      const url = new URL("https://data.transportation.gov/resource/4fya-3eea.json");
      url.searchParams.set("$limit", String(filters.limit ?? 100));
      url.searchParams.set("$order", "date_of_incident DESC");

      if (filters.state) {
        url.searchParams.set("$where", `incident_state='${filters.state.toUpperCase()}'`);
      }

      const response = await fetch(url.toString(), {
        headers: { "Accept": "application/json" },
      });

      if (!response.ok) return { incidents: [], total: 0 };

      const data = await response.json() as Record<string, unknown>[];
      let incidents = (Array.isArray(data) ? data : []).map(mapToPHMSAIncident);

      if (filters.systemType) {
        incidents = incidents.filter(i => i.systemType.toLowerCase().includes(filters.systemType!.toLowerCase()));
      }
      if (filters.operator) {
        incidents = incidents.filter(i => i.operatorName.toLowerCase().includes(filters.operator!.toLowerCase()));
      }

      return { incidents, total: incidents.length };
    } catch {
      return { incidents: [], total: 0 };
    }
  }

  scoreComplianceRisk(incident: PHMSAIncident): PHMSAComplianceLead {
    let riskScore = 0;
    const riskCategories: string[] = [];
    const recommendedServices: string[] = [];

    // Fatalities
    if (incident.fatalCount > 0) {
      riskScore += 40;
      riskCategories.push(`Fatal Pipeline Incident — ${incident.fatalCount} deaths`);
      recommendedServices.push("PHMSA Investigation Response & Cooperation");
      recommendedServices.push("Pipeline Integrity Management Program Review");
    }

    // Injuries
    if (incident.injuryCount > 10) {
      riskScore += 20;
      riskCategories.push(`Multiple Injuries — ${incident.injuryCount}`);
    } else if (incident.injuryCount > 0) {
      riskScore += 10;
      riskCategories.push(`Injuries — ${incident.injuryCount}`);
    }

    // Property damage
    if (incident.propertyDamage > 1000000) {
      riskScore += 15;
      riskCategories.push(`Major Property Damage — $${(incident.propertyDamage / 1000000).toFixed(1)}M`);
      recommendedServices.push("Pipeline Damage Prevention Program");
    } else if (incident.propertyDamage > 100000) {
      riskScore += 10;
      riskCategories.push(`Property Damage — $${(incident.propertyDamage / 1000).toFixed(0)}K`);
    }

    // Release volume
    if (incident.unintentionalRelease > 1000) {
      riskScore += 15;
      riskCategories.push("Major Unintentional Release");
      recommendedServices.push("Environmental Remediation Support");
    }

    // System type
    const sysType = (incident.systemType ?? "").toLowerCase();
    if (sysType.includes("gas transmission")) {
      recommendedServices.push("Gas Transmission Integrity Assessment");
    } else if (sysType.includes("hazardous liquid")) {
      recommendedServices.push("Hazardous Liquid Pipeline Compliance");
    } else if (sysType.includes("lng")) {
      riskScore += 5;
      riskCategories.push("LNG Facility Incident");
      recommendedServices.push("LNG Facility Safety Compliance");
    }

    // Cause analysis
    const cause = (incident.cause ?? "").toLowerCase();
    if (cause.includes("corrosion")) {
      recommendedServices.push("Corrosion Control & Cathodic Protection Audit");
    }
    if (cause.includes("excavation") || cause.includes("third party")) {
      recommendedServices.push("Damage Prevention & 811 Compliance Program");
    }

    riskScore = Math.min(riskScore, 100);

    let estimatedRemediation: string;
    if (riskScore >= 70) estimatedRemediation = "12-24 months comprehensive pipeline safety program";
    else if (riskScore >= 50) estimatedRemediation = "6-12 months integrity management review";
    else if (riskScore >= 25) estimatedRemediation = "3-6 months compliance assessment";
    else estimatedRemediation = "1-3 months incident documentation review";

    return {
      incident,
      riskScore,
      riskCategories,
      recommendedServices: [...new Set(recommendedServices)],
      estimatedRemediation,
    };
  }

  async runPipeline(db: D1Database, filters: PHMSASearchFilters = {}): Promise<PHMSAPipelineResult> {
    await ensurePHMSATables(db);

    const { incidents, total } = await this.fetchIncidents(filters);
    const leads: PHMSAComplianceLead[] = [];

    for (const incident of incidents) {
      const lead = this.scoreComplianceRisk(incident);
      leads.push(lead);
      await storePHMSALead(db, lead);
    }

    leads.sort((a, b) => b.riskScore - a.riskScore);

    return {
      leads,
      totalMatched: total,
      filters,
      generatedAt: new Date().toISOString(),
      source: "PHMSA Pipeline & Hazmat Incident Data (phmsa.dot.gov)",
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// D1 Storage
// ═══════════════════════════════════════════════════════════════════════════

export async function ensurePHMSATables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS phmsa_leads (report_number TEXT PRIMARY KEY, operator_name TEXT NOT NULL, state TEXT, system_type TEXT, cause TEXT, incident_date TEXT, fatal_count INTEGER DEFAULT 0, injury_count INTEGER DEFAULT 0, property_damage REAL DEFAULT 0, risk_score INTEGER DEFAULT 0, risk_categories TEXT DEFAULT '[]', created_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_phmsa_leads_state ON phmsa_leads(state)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_phmsa_leads_score ON phmsa_leads(risk_score DESC)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_phmsa_leads_operator ON phmsa_leads(operator_name)"),
  ]);
}

export async function storePHMSALead(db: D1Database, lead: PHMSAComplianceLead): Promise<void> {
  const i = lead.incident;
  await db.prepare(
    "INSERT OR REPLACE INTO phmsa_leads (report_number, operator_name, state, system_type, cause, incident_date, fatal_count, injury_count, property_damage, risk_score, risk_categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(i.reportNumber, i.operatorName, i.state, i.systemType, i.cause, i.incidentDate, i.fatalCount, i.injuryCount, i.propertyDamage, lead.riskScore, JSON.stringify(lead.riskCategories)).run();
}

export async function getStoredPHMSALeads(
  db: D1Database,
  filters: { state?: string; operator?: string; minScore?: number; limit?: number }
): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM phmsa_leads WHERE 1=1";
  const binds: unknown[] = [];
  if (filters.state) { query += " AND state = ?"; binds.push(filters.state.toUpperCase()); }
  if (filters.operator) { query += " AND operator_name LIKE ?"; binds.push(`%${filters.operator}%`); }
  if (filters.minScore) { query += " AND risk_score >= ?"; binds.push(filters.minScore); }
  query += " ORDER BY risk_score DESC LIMIT ?";
  binds.push(filters.limit ?? 50);
  return (await db.prepare(query).bind(...binds).all()).results as Record<string, unknown>[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Data Mapper
// ═══════════════════════════════════════════════════════════════════════════

function mapToPHMSAIncident(r: Record<string, unknown>): PHMSAIncident {
  return {
    reportNumber: String(r["report_number"] ?? r["REPORT_NUMBER"] ?? r["reportNumber"] ?? `phmsa-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
    operatorName: String(r["operator_name"] ?? r["OPERATOR_NAME"] ?? r["operatorName"] ?? "Unknown"),
    operatorId: String(r["operator_id"] ?? r["OPERATOR_ID"] ?? ""),
    state: String(r["incident_state"] ?? r["state"] ?? r["STATE"] ?? ""),
    city: String(r["incident_city"] ?? r["city"] ?? ""),
    incidentDate: String(r["date_of_incident"] ?? r["incident_date"] ?? r["DATE_OF_INCIDENT"] ?? ""),
    systemType: String(r["system_type"] ?? r["SYSTEM_TYPE"] ?? r["pipeline_type"] ?? ""),
    cause: String(r["cause"] ?? r["CAUSE"] ?? r["incident_cause"] ?? ""),
    subCause: String(r["sub_cause"] ?? r["SUB_CAUSE"] ?? ""),
    fatalCount: Number(r["fatal"] ?? r["FATAL"] ?? r["fatalities"] ?? 0),
    injuryCount: Number(r["injured"] ?? r["INJURED"] ?? r["injuries"] ?? 0),
    propertyDamage: Number(r["property_damage"] ?? r["PROPERTY_DAMAGE"] ?? r["total_cost"] ?? 0),
    commodityReleased: String(r["commodity_released"] ?? r["COMMODITY_RELEASED"] ?? ""),
    unintentionalRelease: Number(r["unintentional_release_bbls"] ?? r["UNINTENTIONAL_RELEASE"] ?? 0),
  };
}

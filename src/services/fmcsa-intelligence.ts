/**
 * FMCSA Intelligence Service — Motor Carrier Safety Pipeline
 *
 * Connects to the FMCSA SAFER/SMS data to identify carriers with
 * safety violations, out-of-service orders, crash data, and
 * compliance review failures.
 *
 * Source: ai.fmcsa.dot.gov/SMS, mobile.fmcsa.dot.gov (free, web key)
 */

import type { Env } from "../index.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface FMCSACarrier {
  dotNumber: string;
  legalName: string;
  dbaName: string;
  mcNumber: string;
  state: string;
  city: string;
  safetyRating: string;        // Satisfactory, Conditional, Unsatisfactory
  operatingStatus: string;
  totalDrivers: number;
  totalPowerUnits: number;
  carrierOperation: string;    // Interstate, Intrastate
  hmFlag: boolean;             // Hazmat carrier
  passengerFlag: boolean;
}

export interface FMCSAViolation {
  inspectionNumber: string;
  dotNumber: string;
  carrierName: string;
  state: string;
  inspectionDate: string;
  violationCode: string;
  violationDescription: string;
  oosFlag: boolean;            // Out of Service
  severity: number;
  basicCategory: string;       // Unsafe Driving, HOS, Vehicle Maintenance, etc.
}

export interface FMCSAComplianceLead {
  carrier?: FMCSACarrier;
  violation?: FMCSAViolation;
  entity: string;
  dotNumber: string;
  riskScore: number;
  riskCategories: string[];
  recommendedServices: string[];
  estimatedRemediation: string;
}

export interface FMCSASearchFilters {
  state?: string;
  safetyRating?: string;
  hmOnly?: boolean;
  limit?: number;
}

export interface FMCSAPipelineResult {
  leads: FMCSAComplianceLead[];
  totalMatched: number;
  filters: FMCSASearchFilters;
  generatedAt: string;
  source: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// FMCSA API Client & Intelligence Service
// ═══════════════════════════════════════════════════════════════════════════

const FMCSA_API_BASE = "https://mobile.fmcsa.dot.gov/qc/services";
const FMCSA_SAFER_BASE = "https://ai.fmcsa.dot.gov/SMS/Carrier";

export class FMCSAIntelligenceService {

  private async fmcsaRequest(url: string): Promise<Record<string, unknown>> {
    const response = await fetch(url, {
      headers: { "Accept": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`FMCSA API error ${response.status}: ${await response.text()}`);
    }
    return response.json() as Promise<Record<string, unknown>>;
  }

  async lookupCarrier(dotNumber: string): Promise<FMCSACarrier | null> {
    try {
      const url = `${FMCSA_API_BASE}/carriers/${dotNumber}?webKey=`;
      const data = await this.fmcsaRequest(url);
      const content = (data["content"] ?? data) as Record<string, unknown>;
      const carrier = (content["carrier"] ?? content) as Record<string, unknown>;
      return mapToCarrier(carrier);
    } catch {
      return null;
    }
  }

  async searchCarriers(filters: FMCSASearchFilters = {}): Promise<{ carriers: FMCSACarrier[]; total: number }> {
    // FMCSA doesn't have a bulk search by state without a web key
    // Use the carrier search endpoint
    try {
      let url = `${FMCSA_API_BASE}/carriers?webKey=`;
      if (filters.state) url += `&stateCode=${filters.state.toUpperCase()}`;
      if (filters.safetyRating) url += `&safetyRating=${filters.safetyRating}`;
      url += `&size=${filters.limit ?? 100}`;

      const data = await this.fmcsaRequest(url);
      const content = (data["content"] ?? []) as Record<string, unknown>[];
      const carriers = (Array.isArray(content) ? content : []).map(c => mapToCarrier(c["carrier"] as Record<string, unknown> ?? c));

      return { carriers, total: carriers.length };
    } catch {
      return { carriers: [], total: 0 };
    }
  }

  scoreCarrierRisk(carrier: FMCSACarrier): FMCSAComplianceLead {
    let riskScore = 0;
    const riskCategories: string[] = [];
    const recommendedServices: string[] = [];

    // Safety rating
    const rating = (carrier.safetyRating ?? "").toLowerCase();
    if (rating.includes("unsatisfactory")) {
      riskScore += 40;
      riskCategories.push("Unsatisfactory Safety Rating");
      recommendedServices.push("FMCSA Safety Rating Upgrade Program");
      recommendedServices.push("Compliance Review Preparation");
    } else if (rating.includes("conditional")) {
      riskScore += 25;
      riskCategories.push("Conditional Safety Rating");
      recommendedServices.push("Safety Management Cycle Improvement");
    }

    // Operating status
    const status = (carrier.operatingStatus ?? "").toLowerCase();
    if (status.includes("out of service") || status.includes("revoked")) {
      riskScore += 30;
      riskCategories.push("Out of Service / Revoked Authority");
      recommendedServices.push("Operating Authority Reinstatement");
    }

    // Hazmat flag
    if (carrier.hmFlag) {
      riskScore += 10;
      riskCategories.push("Hazardous Materials Carrier");
      recommendedServices.push("HAZMAT Compliance Program");
    }

    // Passenger carrier
    if (carrier.passengerFlag) {
      riskScore += 10;
      riskCategories.push("Passenger Carrier");
      recommendedServices.push("Passenger Carrier Safety Compliance");
    }

    // Fleet size risk
    if (carrier.totalPowerUnits > 100) {
      riskScore += 5;
      riskCategories.push(`Large Fleet — ${carrier.totalPowerUnits} units`);
    }

    riskScore = Math.min(riskScore, 100);

    let estimatedRemediation: string;
    if (riskScore >= 70) estimatedRemediation = "6-12 months comprehensive safety compliance overhaul";
    else if (riskScore >= 50) estimatedRemediation = "3-6 months targeted safety improvement";
    else if (riskScore >= 25) estimatedRemediation = "1-3 months compliance review";
    else estimatedRemediation = "< 1 month safety audit";

    return {
      carrier,
      entity: carrier.legalName,
      dotNumber: carrier.dotNumber,
      riskScore,
      riskCategories,
      recommendedServices: [...new Set(recommendedServices)],
      estimatedRemediation,
    };
  }

  async runPipeline(db: D1Database, filters: FMCSASearchFilters = {}): Promise<FMCSAPipelineResult> {
    await ensureFMCSATables(db);

    const { carriers, total } = await this.searchCarriers(filters);
    const leads: FMCSAComplianceLead[] = [];

    for (const carrier of carriers) {
      const lead = this.scoreCarrierRisk(carrier);
      leads.push(lead);
      await storeFMCSALead(db, lead);
    }

    leads.sort((a, b) => b.riskScore - a.riskScore);

    return {
      leads,
      totalMatched: total,
      filters,
      generatedAt: new Date().toISOString(),
      source: "FMCSA Motor Carrier Safety Data (mobile.fmcsa.dot.gov)",
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// D1 Storage
// ═══════════════════════════════════════════════════════════════════════════

export async function ensureFMCSATables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS fmcsa_leads (dot_number TEXT PRIMARY KEY, legal_name TEXT NOT NULL, state TEXT, safety_rating TEXT, operating_status TEXT, total_drivers INTEGER DEFAULT 0, total_units INTEGER DEFAULT 0, hm_flag INTEGER DEFAULT 0, passenger_flag INTEGER DEFAULT 0, risk_score INTEGER DEFAULT 0, risk_categories TEXT DEFAULT '[]', created_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_fmcsa_leads_state ON fmcsa_leads(state)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_fmcsa_leads_score ON fmcsa_leads(risk_score DESC)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_fmcsa_leads_rating ON fmcsa_leads(safety_rating)"),
  ]);
}

export async function storeFMCSALead(db: D1Database, lead: FMCSAComplianceLead): Promise<void> {
  const c = lead.carrier;
  if (!c) return;
  await db.prepare(
    "INSERT OR REPLACE INTO fmcsa_leads (dot_number, legal_name, state, safety_rating, operating_status, total_drivers, total_units, hm_flag, passenger_flag, risk_score, risk_categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(c.dotNumber, c.legalName, c.state, c.safetyRating, c.operatingStatus, c.totalDrivers, c.totalPowerUnits, c.hmFlag ? 1 : 0, c.passengerFlag ? 1 : 0, lead.riskScore, JSON.stringify(lead.riskCategories)).run();
}

export async function getStoredFMCSALeads(
  db: D1Database,
  filters: { state?: string; safetyRating?: string; minScore?: number; limit?: number }
): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM fmcsa_leads WHERE 1=1";
  const binds: unknown[] = [];
  if (filters.state) { query += " AND state = ?"; binds.push(filters.state.toUpperCase()); }
  if (filters.safetyRating) { query += " AND safety_rating = ?"; binds.push(filters.safetyRating); }
  if (filters.minScore) { query += " AND risk_score >= ?"; binds.push(filters.minScore); }
  query += " ORDER BY risk_score DESC LIMIT ?";
  binds.push(filters.limit ?? 50);
  return (await db.prepare(query).bind(...binds).all()).results as Record<string, unknown>[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Data Mapper
// ═══════════════════════════════════════════════════════════════════════════

function mapToCarrier(r: Record<string, unknown>): FMCSACarrier {
  return {
    dotNumber: String(r["dotNumber"] ?? r["DOT_NUMBER"] ?? r["dot_number"] ?? ""),
    legalName: String(r["legalName"] ?? r["LEGAL_NAME"] ?? r["legal_name"] ?? "Unknown"),
    dbaName: String(r["dbaName"] ?? r["DBA_NAME"] ?? r["dba_name"] ?? ""),
    mcNumber: String(r["mcNumber"] ?? r["MC_MX_FF_NUMBER"] ?? ""),
    state: String(r["phyState"] ?? r["PHY_STATE"] ?? r["state"] ?? ""),
    city: String(r["phyCity"] ?? r["PHY_CITY"] ?? r["city"] ?? ""),
    safetyRating: String(r["safetyRating"] ?? r["SAFETY_RATING"] ?? r["safety_rating"] ?? "Not Rated"),
    operatingStatus: String(r["allowedToOperate"] ?? r["statusCode"] ?? r["operating_status"] ?? ""),
    totalDrivers: Number(r["totalDrivers"] ?? r["TOTAL_DRIVERS"] ?? 0),
    totalPowerUnits: Number(r["totalPowerUnits"] ?? r["TOTAL_POWER_UNITS"] ?? 0),
    carrierOperation: String(r["carrierOperation"] ?? r["CARRIER_OPERATION"] ?? ""),
    hmFlag: Boolean(r["hmFlag"] ?? r["HM_FLAG"] ?? false),
    passengerFlag: Boolean(r["passengerFlag"] ?? r["PC_FLAG"] ?? false),
  };
}

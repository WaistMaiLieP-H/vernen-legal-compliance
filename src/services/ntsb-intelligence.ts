/**
 * NTSB Intelligence Service — Transportation Accident Investigation Pipeline
 *
 * Connects to NTSB investigation data covering aviation, highway, rail,
 * marine, and pipeline accidents. Identifies entities involved in
 * investigated accidents with safety recommendations.
 *
 * Source: data.ntsb.gov (free, no key required)
 */

import type { Env } from "../index.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface NTSBInvestigation {
  ntsbNumber: string;
  eventDate: string;
  city: string;
  state: string;
  country: string;
  mode: string;              // Aviation, Highway, Railroad, Marine, Pipeline
  eventType: string;         // Accident, Incident
  highestInjury: string;     // Fatal, Serious, Minor, None
  fatalCount: number;
  injuryCount: number;
  aircraftOperator: string;
  aircraftMake: string;
  aircraftModel: string;
  reportStatus: string;      // Preliminary, Factual, Probable Cause
  probableCause: string;
  recommendations: string;
}

export interface NTSBComplianceLead {
  investigation: NTSBInvestigation;
  entity: string;
  riskScore: number;
  riskCategories: string[];
  recommendedServices: string[];
  estimatedRemediation: string;
}

export interface NTSBSearchFilters {
  mode?: string;
  state?: string;
  year?: string;
  eventType?: string;
  limit?: number;
}

export interface NTSBPipelineResult {
  leads: NTSBComplianceLead[];
  totalMatched: number;
  filters: NTSBSearchFilters;
  generatedAt: string;
  source: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// NTSB Data Client & Intelligence Service
// ═══════════════════════════════════════════════════════════════════════════

// NTSB Aviation data Socrata endpoint
const NTSB_AVIATION_URL = "https://data.ntsb.gov/resource/ynmb-r7ys.json";
// Carol query API for all modes
const NTSB_CAROL_URL = "https://data.ntsb.gov/carol-repgen/api/query";

export class NTSBIntelligenceService {

  private async ntsbRequest(url: string, params: Record<string, string> = {}): Promise<Record<string, unknown>[]> {
    const fetchUrl = new URL(url);
    for (const [k, v] of Object.entries(params)) {
      fetchUrl.searchParams.set(k, v);
    }

    const response = await fetch(fetchUrl.toString(), {
      headers: { "Accept": "application/json" },
    });

    if (!response.ok) {
      if (response.status === 404) return [];
      throw new Error(`NTSB API error ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data as Record<string, unknown>[] : [];
  }

  async fetchAviationInvestigations(filters: NTSBSearchFilters = {}): Promise<{ investigations: NTSBInvestigation[]; total: number }> {
    const params: Record<string, string> = {
      "$limit": String(filters.limit ?? 100),
      "$order": "EventDate DESC",
    };

    const whereParts: string[] = [];
    if (filters.state) {
      whereParts.push(`State='${filters.state.toUpperCase()}'`);
    }
    if (filters.year) {
      whereParts.push(`EventDate>='${filters.year}-01-01'`);
    }
    if (filters.eventType) {
      whereParts.push(`EventType='${filters.eventType}'`);
    }
    if (whereParts.length > 0) {
      params["$where"] = whereParts.join(" AND ");
    }

    const results = await this.ntsbRequest(NTSB_AVIATION_URL, params);
    const investigations = results.map(r => mapToInvestigation(r, "Aviation"));

    return { investigations, total: investigations.length };
  }

  async fetchAllModes(filters: NTSBSearchFilters = {}): Promise<{ investigations: NTSBInvestigation[]; total: number }> {
    // Try aviation first (most data), then other modes if specified
    if (!filters.mode || filters.mode.toLowerCase() === "aviation") {
      return this.fetchAviationInvestigations(filters);
    }

    // For other modes, try CAROL query API
    try {
      const url = `${NTSB_CAROL_URL}`;
      const body = {
        ResultSetSize: filters.limit ?? 100,
        QueryGroups: [{
          QueryRules: [
            { RuleType: "Mode", SelectedAccidentCategories: [{ Value: filters.mode }] },
          ],
        }],
      };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) return this.fetchAviationInvestigations(filters);

      const data = await response.json() as { Results?: Record<string, unknown>[] };
      const investigations = (data.Results ?? []).map(r => mapToInvestigation(r, filters.mode ?? "Unknown"));
      return { investigations, total: investigations.length };
    } catch {
      return this.fetchAviationInvestigations(filters);
    }
  }

  scoreInvestigationRisk(investigation: NTSBInvestigation): NTSBComplianceLead {
    let riskScore = 0;
    const riskCategories: string[] = [];
    const recommendedServices: string[] = [];

    // Fatality scoring
    if (investigation.fatalCount > 10) {
      riskScore += 40;
      riskCategories.push(`Mass Fatality Event — ${investigation.fatalCount} deaths`);
      recommendedServices.push("NTSB Investigation Cooperation & Response");
    } else if (investigation.fatalCount > 0) {
      riskScore += 30;
      riskCategories.push(`Fatal Accident — ${investigation.fatalCount} deaths`);
      recommendedServices.push("Fatal Accident Compliance Response");
    }

    // Injury scoring
    if (investigation.injuryCount > 10) {
      riskScore += 15;
      riskCategories.push(`Multiple Injuries — ${investigation.injuryCount}`);
    } else if (investigation.injuryCount > 0) {
      riskScore += 10;
      riskCategories.push(`Injuries Reported — ${investigation.injuryCount}`);
    }

    // Highest injury severity
    const highestInjury = (investigation.highestInjury ?? "").toLowerCase();
    if (highestInjury.includes("fatal")) {
      riskScore += 10;
    } else if (highestInjury.includes("serious")) {
      riskScore += 5;
      riskCategories.push("Serious Injury Event");
    }

    // Mode-specific
    const mode = (investigation.mode ?? "").toLowerCase();
    if (mode.includes("aviation")) {
      recommendedServices.push("Aviation Safety Compliance Program");
    } else if (mode.includes("highway")) {
      recommendedServices.push("Motor Carrier Safety Review");
    } else if (mode.includes("railroad") || mode.includes("rail")) {
      recommendedServices.push("Railroad Safety Compliance Audit");
    } else if (mode.includes("marine")) {
      recommendedServices.push("Maritime Safety Compliance");
    } else if (mode.includes("pipeline")) {
      recommendedServices.push("Pipeline Safety & Integrity Management");
    }

    // Probable cause with safety recommendations = active compliance obligation
    if (investigation.probableCause) {
      riskScore += 5;
      riskCategories.push("Probable Cause Determined");
    }
    if (investigation.recommendations) {
      riskScore += 5;
      riskCategories.push("NTSB Safety Recommendations Issued");
      recommendedServices.push("Safety Recommendation Implementation");
    }

    riskScore = Math.min(riskScore, 100);

    const entity = investigation.aircraftOperator || "Unknown Operator";

    let estimatedRemediation: string;
    if (riskScore >= 70) estimatedRemediation = "12-24 months comprehensive safety program overhaul";
    else if (riskScore >= 50) estimatedRemediation = "6-12 months targeted safety improvements";
    else if (riskScore >= 25) estimatedRemediation = "3-6 months safety compliance review";
    else estimatedRemediation = "1-3 months safety documentation audit";

    return {
      investigation,
      entity,
      riskScore,
      riskCategories,
      recommendedServices: [...new Set(recommendedServices)],
      estimatedRemediation,
    };
  }

  async runPipeline(db: D1Database, filters: NTSBSearchFilters = {}): Promise<NTSBPipelineResult> {
    await ensureNTSBTables(db);

    const { investigations, total } = await this.fetchAllModes(filters);
    const leads: NTSBComplianceLead[] = [];

    for (const investigation of investigations) {
      const lead = this.scoreInvestigationRisk(investigation);
      leads.push(lead);
      await storeNTSBLead(db, lead);
    }

    leads.sort((a, b) => b.riskScore - a.riskScore);

    return {
      leads,
      totalMatched: total,
      filters,
      generatedAt: new Date().toISOString(),
      source: "NTSB Accident Investigation Database (data.ntsb.gov)",
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// D1 Storage
// ═══════════════════════════════════════════════════════════════════════════

export async function ensureNTSBTables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS ntsb_leads (ntsb_number TEXT PRIMARY KEY, entity TEXT NOT NULL, mode TEXT, state TEXT, event_date TEXT, event_type TEXT, fatal_count INTEGER DEFAULT 0, injury_count INTEGER DEFAULT 0, highest_injury TEXT, risk_score INTEGER DEFAULT 0, risk_categories TEXT DEFAULT '[]', created_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_ntsb_leads_state ON ntsb_leads(state)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_ntsb_leads_score ON ntsb_leads(risk_score DESC)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_ntsb_leads_mode ON ntsb_leads(mode)"),
  ]);
}

export async function storeNTSBLead(db: D1Database, lead: NTSBComplianceLead): Promise<void> {
  const i = lead.investigation;
  await db.prepare(
    "INSERT OR REPLACE INTO ntsb_leads (ntsb_number, entity, mode, state, event_date, event_type, fatal_count, injury_count, highest_injury, risk_score, risk_categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(i.ntsbNumber, lead.entity, i.mode, i.state, i.eventDate, i.eventType, i.fatalCount, i.injuryCount, i.highestInjury, lead.riskScore, JSON.stringify(lead.riskCategories)).run();
}

export async function getStoredNTSBLeads(
  db: D1Database,
  filters: { mode?: string; state?: string; minScore?: number; limit?: number }
): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM ntsb_leads WHERE 1=1";
  const binds: unknown[] = [];
  if (filters.mode) { query += " AND mode = ?"; binds.push(filters.mode); }
  if (filters.state) { query += " AND state = ?"; binds.push(filters.state.toUpperCase()); }
  if (filters.minScore) { query += " AND risk_score >= ?"; binds.push(filters.minScore); }
  query += " ORDER BY risk_score DESC LIMIT ?";
  binds.push(filters.limit ?? 50);
  return (await db.prepare(query).bind(...binds).all()).results as Record<string, unknown>[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Data Mapper
// ═══════════════════════════════════════════════════════════════════════════

function mapToInvestigation(r: Record<string, unknown>, defaultMode: string): NTSBInvestigation {
  return {
    ntsbNumber: String(r["NTSBNumber"] ?? r["ntsb_no"] ?? r["EventId"] ?? r["AccidentNumber"] ?? `ntsb-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
    eventDate: String(r["EventDate"] ?? r["event_date"] ?? r["AccidentDate"] ?? ""),
    city: String(r["City"] ?? r["city"] ?? r["EventCity"] ?? ""),
    state: String(r["State"] ?? r["state"] ?? r["EventState"] ?? ""),
    country: String(r["Country"] ?? r["country"] ?? "US"),
    mode: String(r["Mode"] ?? r["mode"] ?? defaultMode),
    eventType: String(r["EventType"] ?? r["event_type"] ?? r["TypeOfEvent"] ?? "Accident"),
    highestInjury: String(r["HighestInjury"] ?? r["InjurySeverity"] ?? r["highest_injury"] ?? ""),
    fatalCount: Number(r["FatalInjuryCount"] ?? r["TotalFatalInjuries"] ?? r["fatal_count"] ?? 0),
    injuryCount: Number(r["SeriousInjuryCount"] ?? r["TotalSeriousInjuries"] ?? r["injury_count"] ?? 0),
    aircraftOperator: String(r["AirCarrier"] ?? r["Operator"] ?? r["operator"] ?? r["OperatorName"] ?? ""),
    aircraftMake: String(r["Make"] ?? r["AircraftMake"] ?? r["make"] ?? ""),
    aircraftModel: String(r["Model"] ?? r["AircraftModel"] ?? r["model"] ?? ""),
    reportStatus: String(r["ReportStatus"] ?? r["report_status"] ?? r["PublicationDate"] ?? ""),
    probableCause: String(r["ProbableCause"] ?? r["probable_cause"] ?? ""),
    recommendations: String(r["Recommendations"] ?? r["recommendations"] ?? ""),
  };
}

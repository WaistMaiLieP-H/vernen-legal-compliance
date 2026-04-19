/**
 * SAM.gov Intelligence Service — Entity Exclusions Pipeline
 *
 * Connects to the SAM.gov Entity Management API to identify entities
 * that have been debarred, suspended, proposed for debarment, or
 * declared ineligible for federal awards.
 *
 * Source: api.sam.gov (free, API key required for full access)
 */

import type { Env } from "../index.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface SAMExclusion {
  entityName: string;
  uei: string;              // Unique Entity Identifier
  duns: string;
  cageCode: string;
  exclusionType: string;    // Debarment, Suspension, Proposed Debarment, Ineligible
  exclusionProgram: string; // Reciprocal, Nonprecurement, Procurement
  agency: string;
  state: string;
  city: string;
  activationDate: string;
  terminationDate: string;
  description: string;
  samNumber: string;
}

export interface SAMComplianceLead {
  exclusion: SAMExclusion;
  riskScore: number;
  riskCategories: string[];
  recommendedServices: string[];
  estimatedRemediation: string;
}

export interface SAMSearchFilters {
  state?: string;
  exclusionType?: string;
  agency?: string;
  entityName?: string;
  limit?: number;
}

export interface SAMPipelineResult {
  leads: SAMComplianceLead[];
  totalMatched: number;
  filters: SAMSearchFilters;
  generatedAt: string;
  source: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// SAM.gov API Client & Intelligence Service
// ═══════════════════════════════════════════════════════════════════════════

const SAM_API_BASE = "https://api.sam.gov/entity-information/v3/exclusions";
const SAM_PUBLIC_URL = "https://sam.gov/api/prod/sgs/v1/search";

export class SAMIntelligenceService {

  async fetchExclusions(filters: SAMSearchFilters = {}, apiKey?: string): Promise<{ exclusions: SAMExclusion[]; total: number }> {
    // Try official API first if we have a key
    if (apiKey) {
      try {
        return await this.fetchFromOfficialAPI(filters, apiKey);
      } catch {
        // Fall through to public endpoint
      }
    }

    // Public search fallback
    return this.fetchFromPublicSearch(filters);
  }

  private async fetchFromOfficialAPI(
    filters: SAMSearchFilters,
    apiKey: string
  ): Promise<{ exclusions: SAMExclusion[]; total: number }> {
    const url = new URL(SAM_API_BASE);
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("limit", String(filters.limit ?? 100));

    if (filters.state) url.searchParams.set("stateProvince", filters.state.toUpperCase());
    if (filters.exclusionType) url.searchParams.set("excludingAgencyCode", filters.exclusionType);
    if (filters.entityName) url.searchParams.set("q", filters.entityName);

    const response = await fetch(url.toString(), {
      headers: { "Accept": "application/json" },
    });

    if (!response.ok) throw new Error(`SAM API error ${response.status}`);

    const data = await response.json() as { totalRecords: number; entityData: Record<string, unknown>[] };
    const exclusions = (data.entityData ?? []).map(mapToSAMExclusion);

    return { exclusions, total: data.totalRecords ?? exclusions.length };
  }

  private async fetchFromPublicSearch(filters: SAMSearchFilters): Promise<{ exclusions: SAMExclusion[]; total: number }> {
    const url = new URL(SAM_PUBLIC_URL);
    url.searchParams.set("index", "eel");
    url.searchParams.set("page", "0");
    url.searchParams.set("size", String(filters.limit ?? 100));
    url.searchParams.set("mode", "search");
    url.searchParams.set("is_active", "true");

    if (filters.entityName) url.searchParams.set("q", filters.entityName);

    try {
      const response = await fetch(url.toString(), {
        headers: { "Accept": "application/json" },
      });
      if (!response.ok) return { exclusions: [], total: 0 };

      const data = await response.json() as { totalRecords: number; _embedded?: { results?: Record<string, unknown>[] } };
      const results = data._embedded?.results ?? [];
      const exclusions = results.map(mapToSAMExclusion);
      return { exclusions, total: data.totalRecords ?? exclusions.length };
    } catch {
      return { exclusions: [], total: 0 };
    }
  }

  scoreComplianceRisk(exclusion: SAMExclusion): SAMComplianceLead {
    let riskScore = 0;
    const riskCategories: string[] = [];
    const recommendedServices: string[] = [];

    // Exclusion type scoring
    const exType = (exclusion.exclusionType ?? "").toLowerCase();
    if (exType.includes("debarment") && !exType.includes("proposed")) {
      riskScore += 40;
      riskCategories.push("Debarred — Prohibited from Federal Awards");
      recommendedServices.push("Debarment Appeal & Reinstatement");
      recommendedServices.push("Responsibility Determination Support");
    } else if (exType.includes("proposed")) {
      riskScore += 30;
      riskCategories.push("Proposed Debarment — Pending Final Action");
      recommendedServices.push("Proposed Debarment Response & Mitigation");
    } else if (exType.includes("suspension")) {
      riskScore += 35;
      riskCategories.push("Suspended — Temporary Exclusion Pending Investigation");
      recommendedServices.push("Suspension Response & Investigation Support");
    } else if (exType.includes("ineligible")) {
      riskScore += 25;
      riskCategories.push("Statutory Ineligibility");
      recommendedServices.push("Eligibility Restoration Assessment");
    }

    // Program scope
    const program = (exclusion.exclusionProgram ?? "").toLowerCase();
    if (program.includes("reciprocal")) {
      riskScore += 15;
      riskCategories.push("Government-wide Reciprocal Exclusion");
      recommendedServices.push("Cross-Agency Compliance Coordination");
    }
    if (program.includes("procurement") && program.includes("nonprocurement")) {
      riskScore += 10;
      riskCategories.push("Both Procurement & Nonprocurement");
    }

    // Active vs terminated
    if (!exclusion.terminationDate || new Date(exclusion.terminationDate) > new Date()) {
      riskScore += 10;
      riskCategories.push("Currently Active Exclusion");
    }

    riskScore = Math.min(riskScore, 100);

    let estimatedRemediation: string;
    if (riskScore >= 70) estimatedRemediation = "12-24 months debarment appeal & reinstatement";
    else if (riskScore >= 50) estimatedRemediation = "6-12 months suspension response & compliance";
    else if (riskScore >= 25) estimatedRemediation = "3-6 months eligibility restoration";
    else estimatedRemediation = "1-3 months compliance review";

    return {
      exclusion,
      riskScore,
      riskCategories,
      recommendedServices: [...new Set(recommendedServices)],
      estimatedRemediation,
    };
  }

  async runPipeline(db: D1Database, filters: SAMSearchFilters = {}, apiKey?: string): Promise<SAMPipelineResult> {
    await ensureSAMTables(db);

    const { exclusions, total } = await this.fetchExclusions(filters, apiKey);
    const leads: SAMComplianceLead[] = [];

    for (const exclusion of exclusions) {
      const lead = this.scoreComplianceRisk(exclusion);
      leads.push(lead);
      await storeSAMLead(db, lead);
    }

    leads.sort((a, b) => b.riskScore - a.riskScore);

    return {
      leads,
      totalMatched: total,
      filters,
      generatedAt: new Date().toISOString(),
      source: "SAM.gov Entity Exclusion List (api.sam.gov)",
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// D1 Storage
// ═══════════════════════════════════════════════════════════════════════════

export async function ensureSAMTables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS sam_leads (sam_number TEXT PRIMARY KEY, entity_name TEXT NOT NULL, uei TEXT, state TEXT, exclusion_type TEXT, exclusion_program TEXT, agency TEXT, activation_date TEXT, termination_date TEXT, risk_score INTEGER DEFAULT 0, risk_categories TEXT DEFAULT '[]', created_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_sam_leads_state ON sam_leads(state)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_sam_leads_score ON sam_leads(risk_score DESC)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_sam_leads_type ON sam_leads(exclusion_type)"),
  ]);
}

export async function storeSAMLead(db: D1Database, lead: SAMComplianceLead): Promise<void> {
  const e = lead.exclusion;
  const samNum = e.samNumber || `sam-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  await db.prepare(
    "INSERT OR REPLACE INTO sam_leads (sam_number, entity_name, uei, state, exclusion_type, exclusion_program, agency, activation_date, termination_date, risk_score, risk_categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(samNum, e.entityName, e.uei, e.state, e.exclusionType, e.exclusionProgram, e.agency, e.activationDate, e.terminationDate, lead.riskScore, JSON.stringify(lead.riskCategories)).run();
}

export async function getStoredSAMLeads(
  db: D1Database,
  filters: { state?: string; exclusionType?: string; minScore?: number; limit?: number }
): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM sam_leads WHERE 1=1";
  const binds: unknown[] = [];
  if (filters.state) { query += " AND state = ?"; binds.push(filters.state.toUpperCase()); }
  if (filters.exclusionType) { query += " AND exclusion_type = ?"; binds.push(filters.exclusionType); }
  if (filters.minScore) { query += " AND risk_score >= ?"; binds.push(filters.minScore); }
  query += " ORDER BY risk_score DESC LIMIT ?";
  binds.push(filters.limit ?? 50);
  return (await db.prepare(query).bind(...binds).all()).results as Record<string, unknown>[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Data Mapper
// ═══════════════════════════════════════════════════════════════════════════

function mapToSAMExclusion(r: Record<string, unknown>): SAMExclusion {
  // Handle nested SAM API response structure
  const entityInfo = (r["entityInformation"] ?? r) as Record<string, unknown>;
  const exclusionDetails = (r["exclusionDetails"] ?? r) as Record<string, unknown>;
  const address = (r["address"] ?? entityInfo["address"] ?? {}) as Record<string, unknown>;

  return {
    entityName: String(entityInfo["entityName"] ?? r["name"] ?? r["entity_name"] ?? r["legalBusinessName"] ?? "Unknown"),
    uei: String(entityInfo["ueiSAM"] ?? r["uei"] ?? r["UEI"] ?? ""),
    duns: String(entityInfo["dunsNumber"] ?? r["duns"] ?? ""),
    cageCode: String(entityInfo["cageCode"] ?? r["cage_code"] ?? ""),
    exclusionType: String(exclusionDetails["classificationType"] ?? r["exclusion_type"] ?? r["classification"] ?? ""),
    exclusionProgram: String(exclusionDetails["exclusionProgram"] ?? r["exclusion_program"] ?? ""),
    agency: String(exclusionDetails["excludingAgencyName"] ?? r["agency"] ?? r["excluding_agency"] ?? ""),
    state: String(address["stateOrProvince"] ?? r["state"] ?? ""),
    city: String(address["city"] ?? r["city"] ?? ""),
    activationDate: String(exclusionDetails["activateDate"] ?? r["activation_date"] ?? ""),
    terminationDate: String(exclusionDetails["terminationDate"] ?? r["termination_date"] ?? ""),
    description: String(exclusionDetails["description"] ?? r["description"] ?? ""),
    samNumber: String(r["samNumber"] ?? r["sam_number"] ?? r["exclusionIdentifier"] ?? ""),
  };
}

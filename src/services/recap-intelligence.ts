/**
 * RECAP / CourtListener Intelligence Service — Free Federal Court Filings
 *
 * CourtListener (Free Law Project) provides free access to millions of
 * federal court opinions, dockets, and PACER documents via REST API.
 *
 * This is the bulk document source for building agent experience —
 * real motions, orders, opinions, complaints that Citizens process
 * to develop verified skills.
 *
 * API: https://www.courtlistener.com/api/rest/v4/
 * Free account required for higher rate limits.
 */

import type { Env } from "../index.js";
import { generateId } from "../utils/helpers.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface RECAPOpinion {
  id: number;
  absoluteUrl: string;
  caseName: string;
  court: string;         // "scotus", "ca9", "cand", etc.
  dateCreated: string;
  dateFiled: string;
  docketNumber: string;
  suitNature: string;    // Nature of suit code
  status: string;
  snippet: string;       // Text excerpt
  citation: string;
  judges: string;
}

export interface RECAPDocket {
  id: number;
  absoluteUrl: string;
  caseName: string;
  court: string;
  dateCreated: string;
  dateFiled: string;
  docketNumber: string;
  suitNature: string;
  cause: string;         // Statutory basis (e.g., "28:1332 Diversity")
  jurisdictionType: string;
  assignedTo: string;
  entryCount: number;
}

export interface RECAPDocument {
  id: number;
  docketId: number;
  documentType: string;  // "Complaint", "Motion to Dismiss", "Order", etc.
  description: string;
  dateFiled: string;
  pageCount: number;
  plainText: string;     // Extracted text (when available)
  court: string;
  caseName: string;
}

export interface RECAPComplianceLead {
  opinion: RECAPOpinion;
  riskScore: number;
  riskCategories: string[];
  documentType: string;
  legalAreas: string[];
}

export interface RECAPSearchFilters {
  query?: string;         // Full-text search
  court?: string;         // Court code (e.g., "cand", "ca9")
  type?: string;          // "o" (opinions), "r" (RECAP dockets), "oa" (oral arguments)
  dateAfter?: string;     // YYYY-MM-DD
  dateBefore?: string;
  suitNature?: string;    // Nature of suit code
  limit?: number;
  offset?: number;
}

export interface RECAPPipelineResult {
  leads: RECAPComplianceLead[];
  totalMatched: number;
  filters: RECAPSearchFilters;
  generatedAt: string;
  source: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// CourtListener API Client
// ═══════════════════════════════════════════════════════════════════════════

const CL_API_BASE = "https://www.courtlistener.com/api/rest/v4";
const CL_SEARCH_BASE = "https://www.courtlistener.com/api/rest/v4/search";
const USER_AGENT = "Vernen-Legal-Compliance/1.0 compliance@vernenlegal.com";
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export class RECAPIntelligenceService {

  /**
   * Search opinions via CourtListener API.
   */
  async searchOpinions(filters: RECAPSearchFilters = {}): Promise<RECAPOpinion[]> {
    const limit = Math.min(filters.limit ?? DEFAULT_LIMIT, MAX_LIMIT);
    const params = new URLSearchParams();
    params.set("type", filters.type ?? "o");
    params.set("order_by", "score desc");

    if (filters.query) params.set("q", filters.query);
    if (filters.court) params.set("court", filters.court);
    if (filters.dateAfter) params.set("filed_after", filters.dateAfter);
    if (filters.dateBefore) params.set("filed_before", filters.dateBefore);
    if (filters.suitNature) params.set("suitNature", filters.suitNature);

    // Default to compliance-relevant searches
    if (!filters.query) {
      params.set("q", "compliance violation enforcement");
    }

    const url = `${CL_SEARCH_BASE}/?${params.toString()}`;

    try {
      const response = await fetch(url, {
        headers: { "User-Agent": USER_AGENT, "Accept": "application/json" },
      });

      if (!response.ok) {
        if (response.status === 429) throw new RECAPRateLimitError("CourtListener rate limit exceeded");
        throw new RECAPApiError(response.status, `CourtListener returned ${response.status}`);
      }

      const data = await response.json() as CLSearchResponse;
      return this.mapOpinions(data, limit);
    } catch (e) {
      if (e instanceof RECAPApiError || e instanceof RECAPRateLimitError) throw e;
      throw new RECAPApiError(0, `CourtListener request failed: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  /**
   * Search RECAP dockets (actual PACER filings uploaded by the public).
   */
  async searchDockets(filters: RECAPSearchFilters = {}): Promise<RECAPDocket[]> {
    const params = new URLSearchParams();
    params.set("type", "r"); // RECAP type
    params.set("order_by", "score desc");

    if (filters.query) params.set("q", filters.query);
    if (filters.court) params.set("court", filters.court);
    if (filters.dateAfter) params.set("filed_after", filters.dateAfter);

    if (!filters.query) params.set("q", "fraud enforcement compliance");

    const url = `${CL_SEARCH_BASE}/?${params.toString()}`;

    try {
      const response = await fetch(url, {
        headers: { "User-Agent": USER_AGENT, "Accept": "application/json" },
      });

      if (!response.ok) throw new RECAPApiError(response.status, `CourtListener returned ${response.status}`);

      const data = await response.json() as CLSearchResponse;
      return this.mapDockets(data);
    } catch (e) {
      if (e instanceof RECAPApiError) throw e;
      throw new RECAPApiError(0, String(e));
    }
  }

  /**
   * Run the full pipeline: search → classify → score → store → feed to Citizens.
   */
  async runPipeline(db: D1Database, filters: RECAPSearchFilters = {}): Promise<RECAPPipelineResult> {
    await ensureRECAPTables(db);

    const opinions = await this.searchOpinions(filters);
    const leads: RECAPComplianceLead[] = [];

    for (const opinion of opinions) {
      const lead = this.classifyAndScore(opinion);
      leads.push(lead);
      await storeLead(db, lead);
    }

    leads.sort((a, b) => b.riskScore - a.riskScore);

    return {
      leads,
      totalMatched: leads.length,
      filters,
      generatedAt: new Date().toISOString(),
      source: "CourtListener / RECAP Archive (Free Law Project)",
    };
  }

  /**
   * Classify an opinion by legal area and document type, then score.
   */
  private classifyAndScore(opinion: RECAPOpinion): RECAPComplianceLead {
    const text = `${opinion.caseName} ${opinion.snippet}`.toLowerCase();
    let score = 50; // Base score for any real court document
    const categories: string[] = [];
    const legalAreas: string[] = [];
    let documentType = "opinion";

    // Legal area classification from content
    if (text.includes("civil rights") || text.includes("1983") || text.includes("discrimination")) {
      legalAreas.push("Civil Rights"); score += 10;
    }
    if (text.includes("fraud") || text.includes("deceptive") || text.includes("misrepresentation")) {
      legalAreas.push("Fraud"); score += 10;
    }
    if (text.includes("employment") || text.includes("title vii") || text.includes("ada ")) {
      legalAreas.push("Employment Law"); score += 5;
    }
    if (text.includes("consumer") || text.includes("ftc") || text.includes("fair debt")) {
      legalAreas.push("Consumer Protection"); score += 5;
    }
    if (text.includes("environmental") || text.includes("epa") || text.includes("clean water")) {
      legalAreas.push("Environmental"); score += 5;
    }
    if (text.includes("antitrust") || text.includes("sherman act") || text.includes("monopol")) {
      legalAreas.push("Antitrust"); score += 10;
    }
    if (text.includes("securities") || text.includes("sec ") || text.includes("10b-5")) {
      legalAreas.push("Securities"); score += 10;
    }
    if (text.includes("patent") || text.includes("trademark") || text.includes("copyright")) {
      legalAreas.push("Intellectual Property"); score += 5;
    }
    if (text.includes("bankruptcy") || text.includes("chapter 11") || text.includes("chapter 7")) {
      legalAreas.push("Bankruptcy"); score += 5;
    }
    if (text.includes("habeas") || text.includes("criminal") || text.includes("sentencing")) {
      legalAreas.push("Criminal"); score += 5;
    }

    // Document type from context
    if (text.includes("motion to dismiss") || text.includes("12(b)(6)")) documentType = "motion_to_dismiss";
    else if (text.includes("summary judgment") || text.includes("56(")) documentType = "summary_judgment";
    else if (text.includes("class action") || text.includes("class cert")) documentType = "class_action";
    else if (text.includes("preliminary injunction") || text.includes("tro ")) documentType = "injunction";
    else if (text.includes("appeal") || text.includes("circuit")) documentType = "appellate_opinion";

    // Court level scoring
    if (opinion.court === "scotus") { score += 20; categories.push("Supreme Court"); }
    else if (opinion.court.startsWith("ca")) { score += 10; categories.push("Circuit Court"); }

    if (legalAreas.length === 0) legalAreas.push("General");
    score = Math.min(score, 100);

    return { opinion, riskScore: score, riskCategories: categories, documentType, legalAreas };
  }

  // ─── Response Mapping ─────────────────────────────────────────────────

  private mapOpinions(data: CLSearchResponse, limit: number): RECAPOpinion[] {
    const results = data.results ?? [];
    return results.slice(0, limit).map((r: CLResult) => ({
      id: r.id ?? 0,
      absoluteUrl: r.absolute_url ?? "",
      caseName: r.caseName ?? r.case_name ?? "",
      court: r.court ?? r.court_id ?? "",
      dateCreated: r.dateCreated ?? r.date_created ?? "",
      dateFiled: r.dateFiled ?? r.date_filed ?? "",
      docketNumber: r.docketNumber ?? r.docket_number ?? "",
      suitNature: r.suitNature ?? r.suit_nature ?? "",
      status: r.status ?? "",
      snippet: r.snippet ?? "",
      citation: r.citation ?? (r.citations ?? []).join(", "),
      judges: r.judge ?? r.assigned_to ?? "",
    }));
  }

  private mapDockets(data: CLSearchResponse): RECAPDocket[] {
    const results = data.results ?? [];
    return results.slice(0, 50).map((r: CLResult) => ({
      id: r.id ?? 0,
      absoluteUrl: r.absolute_url ?? "",
      caseName: r.caseName ?? r.case_name ?? "",
      court: r.court ?? r.court_id ?? "",
      dateCreated: r.dateCreated ?? r.date_created ?? "",
      dateFiled: r.dateFiled ?? r.date_filed ?? "",
      docketNumber: r.docketNumber ?? r.docket_number ?? "",
      suitNature: r.suitNature ?? r.suit_nature ?? "",
      cause: r.cause ?? "",
      jurisdictionType: r.jurisdiction_type ?? "",
      assignedTo: r.assigned_to ?? "",
      entryCount: r.entry_count ?? 0,
    }));
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Response types
// ═══════════════════════════════════════════════════════════════════════════

interface CLResult {
  id?: number;
  absolute_url?: string;
  caseName?: string;
  case_name?: string;
  court?: string;
  court_id?: string;
  dateCreated?: string;
  date_created?: string;
  dateFiled?: string;
  date_filed?: string;
  docketNumber?: string;
  docket_number?: string;
  suitNature?: string;
  suit_nature?: string;
  status?: string;
  snippet?: string;
  citation?: string;
  citations?: string[];
  judge?: string;
  assigned_to?: string;
  cause?: string;
  jurisdiction_type?: string;
  entry_count?: number;
}

interface CLSearchResponse {
  count?: number;
  results?: CLResult[];
  next?: string;
  previous?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// Errors
// ═══════════════════════════════════════════════════════════════════════════

export class RECAPApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "RECAPApiError";
  }
}

export class RECAPRateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RECAPRateLimitError";
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// D1 Storage
// ═══════════════════════════════════════════════════════════════════════════

export async function ensureRECAPTables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS recap_leads (id TEXT PRIMARY KEY, opinion_id INTEGER, case_name TEXT NOT NULL, court TEXT, date_filed TEXT, docket_number TEXT, document_type TEXT, legal_areas TEXT DEFAULT '[]', snippet TEXT, risk_score INTEGER DEFAULT 0, risk_categories TEXT DEFAULT '[]', absolute_url TEXT, status TEXT DEFAULT 'new', created_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_recap_leads_court ON recap_leads(court)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_recap_leads_score ON recap_leads(risk_score DESC)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_recap_leads_type ON recap_leads(document_type)"),
  ]);
}

export async function storeLead(db: D1Database, lead: RECAPComplianceLead): Promise<void> {
  const o = lead.opinion;
  await db.prepare(`
    INSERT OR REPLACE INTO recap_leads
    (id, opinion_id, case_name, court, date_filed, docket_number, document_type,
     legal_areas, snippet, risk_score, risk_categories, absolute_url)
    VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12)
  `).bind(
    generateId("recap"), o.id, o.caseName, o.court, o.dateFiled, o.docketNumber,
    lead.documentType, JSON.stringify(lead.legalAreas),
    o.snippet.substring(0, 500), lead.riskScore,
    JSON.stringify(lead.riskCategories), o.absoluteUrl,
  ).run();
}

export async function getStoredLeads(
  db: D1Database,
  filters: { court?: string; documentType?: string; minScore?: number; limit?: number }
): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM recap_leads WHERE 1=1";
  const binds: unknown[] = [];
  let idx = 1;
  if (filters.court) { query += ` AND court = ?${idx++}`; binds.push(filters.court); }
  if (filters.documentType) { query += ` AND document_type = ?${idx++}`; binds.push(filters.documentType); }
  if (filters.minScore) { query += ` AND risk_score >= ?${idx++}`; binds.push(filters.minScore); }
  query += ` ORDER BY risk_score DESC LIMIT ?${idx}`;
  binds.push(Math.min(filters.limit ?? 100, 500));
  const stmt = db.prepare(query);
  const result = await (binds.length ? stmt.bind(...binds) : stmt).all();
  return (result.results ?? []) as Record<string, unknown>[];
}

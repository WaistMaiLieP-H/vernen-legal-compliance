/**
 * EDGAR Intelligence Service — SEC 8-K Material Weakness Monitoring
 *
 * Connects to SEC EDGAR EFTS (full-text search) to identify publicly
 * traded companies with documented compliance gaps: material weaknesses,
 * adverse opinions, restatements, and auditor changes.
 *
 * These are companies with SEC-mandated disclosure obligations and
 * documented internal control failures — prime candidates for
 * compliance remediation services.
 */

import type { Env } from "../index.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface EDGARFiling {
  accessionNumber: string;
  cik: string;
  companyName: string;
  formType: string;
  filingDate: string;
  fileUrl: string;
  description: string;
  keywords: string[];
}

export interface MaterialWeaknessLead {
  filing: EDGARFiling;
  gapScore: number; // 0-100, higher = more urgent compliance need
  gapCategories: string[];
  recommendedServices: string[];
  estimatedRemediation: string;
  discoveredAt: string;
}

export interface EDGARSearchFilters {
  query?: string;
  startDate?: string; // YYYY-MM-DD
  endDate?: string;   // YYYY-MM-DD
  forms?: string;     // e.g. "8-K"
  limit?: number;
  offset?: number;
}

interface EFTSHit {
  _id?: string;
  _source?: {
    file_num?: string[];
    display_names?: string[];
    entity_name?: string;
    file_date?: string;
    period_of_report?: string;
    form_type?: string;
    file_description?: string;
    biz_locations?: string[];
  };
  entity_name?: string;
  file_date?: string;
  form_type?: string;
}

interface EFTSResponse {
  hits?: {
    hits?: EFTSHit[];
    total?: { value?: number } | number;
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// EDGAR EFTS Client
// ═══════════════════════════════════════════════════════════════════════════

const EFTS_BASE = "https://efts.sec.gov/LATEST/search-index";
const USER_AGENT = "Vernen Legal Compliance compliance@vernenlegal.com";
const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 200;

const SEARCH_KEYWORDS = [
  "material weakness",
  "adverse opinion",
  "restatement",
  "auditor change",
];

export class EDGARIntelligenceService {
  /**
   * Core EFTS request handler with required User-Agent
   */
  private async eftsRequest(
    params: Record<string, string>
  ): Promise<EFTSResponse> {
    const url = new URL(EFTS_BASE);
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }

    const response = await fetch(url.toString(), {
      headers: {
        "User-Agent": USER_AGENT,
        "Accept": "application/json",
      },
    });

    if (response.status === 429) {
      throw new EDGARRateLimitError();
    }

    if (!response.ok) {
      throw new EDGARApiError(response.status, await response.text());
    }

    return response.json() as Promise<EFTSResponse>;
  }

  // ─── Discovery Queries ──────────────────────────────────────────────

  /**
   * Search EDGAR EFTS for 8-K filings containing material weakness
   * keywords: "material weakness", "adverse opinion", "restatement",
   * "auditor change".
   */
  async searchMaterialWeaknesses(
    filters: EDGARSearchFilters = {}
  ): Promise<EDGARFiling[]> {
    const limit = Math.min(filters.limit ?? DEFAULT_LIMIT, MAX_LIMIT);

    // Build the query: user-supplied or default keyword set
    const query =
      filters.query ??
      SEARCH_KEYWORDS.map((k) => `"${k}"`).join(" OR ");

    const params: Record<string, string> = {
      q: query,
      forms: filters.forms ?? "8-K",
    };

    if (filters.startDate || filters.endDate) {
      params["dateRange"] = "custom";
      if (filters.startDate) params["startdt"] = filters.startDate;
      if (filters.endDate) params["enddt"] = filters.endDate;
    }

    // EFTS uses from/size for pagination
    params["from"] = String(filters.offset ?? 0);
    params["size"] = String(limit);

    const data = await this.eftsRequest(params);
    return this.parseEFTSHits(data, query);
  }

  /**
   * Search for filings related to a specific CIK (company)
   */
  async searchByCIK(
    cik: string,
    filters: EDGARSearchFilters = {}
  ): Promise<EDGARFiling[]> {
    const query =
      filters.query ??
      SEARCH_KEYWORDS.map((k) => `"${k}"`).join(" OR ");

    const params: Record<string, string> = {
      q: query,
      forms: filters.forms ?? "8-K",
    };

    // EFTS supports filtering by CIK via the q parameter
    params["q"] = `(${query}) AND "${cik}"`;

    if (filters.startDate || filters.endDate) {
      params["dateRange"] = "custom";
      if (filters.startDate) params["startdt"] = filters.startDate;
      if (filters.endDate) params["enddt"] = filters.endDate;
    }

    params["from"] = String(filters.offset ?? 0);
    params["size"] = String(Math.min(filters.limit ?? DEFAULT_LIMIT, MAX_LIMIT));

    const data = await this.eftsRequest(params);
    return this.parseEFTSHits(data, query);
  }

  // ─── EFTS Response Parsing ──────────────────────────────────────────

  private parseEFTSHits(data: EFTSResponse, query: string): EDGARFiling[] {
    const hits = data.hits?.hits ?? [];
    const lowerQuery = query.toLowerCase();

    return hits.map((hit) => {
      const src = hit._source ?? {};
      const accession = String(hit._id ?? "").replace(/-/g, "");
      const cik = (src.file_num ?? [])[0]?.replace(/^0+/, "") ?? "";
      const companyName =
        (src.display_names ?? [])[0] ??
        src.entity_name ??
        hit.entity_name ??
        "Unknown";
      const filingDate = src.file_date ?? hit.file_date ?? "";
      const formType = src.form_type ?? hit.form_type ?? "8-K";
      const description = src.file_description ?? "";

      // Determine which keywords matched
      const keywords: string[] = [];
      const lowerDesc = description.toLowerCase();
      const lowerName = companyName.toLowerCase();
      const combinedText = `${lowerDesc} ${lowerName} ${lowerQuery}`;

      for (const kw of SEARCH_KEYWORDS) {
        if (combinedText.includes(kw)) {
          keywords.push(kw);
        }
      }

      // Build SEC filing URL from accession number
      const formattedAccession = formatAccession(String(hit._id ?? ""));
      const fileUrl = formattedAccession
        ? `https://www.sec.gov/Archives/edgar/data/${cik}/${formattedAccession}`
        : `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${encodeURIComponent(cik)}&type=8-K&dateb=&owner=include&count=10`;

      return {
        accessionNumber: String(hit._id ?? accession),
        cik,
        companyName,
        formType,
        filingDate,
        fileUrl,
        description,
        keywords,
      };
    });
  }

  // ─── Full Intelligence Pipeline ─────────────────────────────────────

  /**
   * Run the full compliance gap intelligence pipeline.
   * Discovers filings → scores companies → generates leads.
   */
  async runPipeline(
    filters: EDGARSearchFilters = {}
  ): Promise<EDGARPipelineResult> {
    const filings = await this.searchMaterialWeaknesses(filters);

    const leads: MaterialWeaknessLead[] = filings.map((filing) =>
      buildMaterialWeaknessLead(filing)
    );

    // Sort by gap score (highest urgency first)
    leads.sort((a, b) => b.gapScore - a.gapScore);

    const totalHits = filings.length;

    return {
      leads,
      totalMatched: totalHits,
      filters,
      generatedAt: new Date().toISOString(),
      source: "SEC EDGAR EFTS (efts.sec.gov)",
    };
  }
}

export interface EDGARPipelineResult {
  leads: MaterialWeaknessLead[];
  totalMatched: number;
  filters: EDGARSearchFilters;
  generatedAt: string;
  source: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// Gap Scoring & Recommendation Engine
// ═══════════════════════════════════════════════════════════════════════════

function buildMaterialWeaknessLead(filing: EDGARFiling): MaterialWeaknessLead {
  let gapScore = 0;
  const gapCategories: string[] = [];
  const recommendedServices: string[] = [];
  const keywords = filing.keywords;

  // Material weakness = base 30 points
  if (keywords.includes("material weakness")) {
    gapScore += 30;
    gapCategories.push("Material Weakness Disclosed");
    recommendedServices.push("Internal Control Remediation");
  }

  // Adverse opinion = 25 points
  if (keywords.includes("adverse opinion")) {
    gapScore += 25;
    gapCategories.push("Adverse Audit Opinion");
    recommendedServices.push("SOX Compliance Program");
  }

  // Restatement = 20 points (financial reporting failure)
  if (keywords.includes("restatement")) {
    gapScore += 20;
    gapCategories.push("Financial Restatement");
    recommendedServices.push("Restatement Assistance & Remediation");
  }

  // Auditor change = 15 points
  if (keywords.includes("auditor change")) {
    gapScore += 15;
    gapCategories.push("Auditor Change");
    recommendedServices.push("Auditor Transition Support");
  }

  // Combo: auditor change + material weakness = extra 15 points
  if (
    keywords.includes("auditor change") &&
    keywords.includes("material weakness")
  ) {
    gapScore += 15;
    gapCategories.push("Auditor Change with Material Weakness (High Risk)");
    recommendedServices.push("Comprehensive Internal Control Overhaul");
  }

  // Recency bonus: filings from last 90 days get +10
  if (filing.filingDate) {
    const filingMs = new Date(filing.filingDate).getTime();
    const ninetyDaysAgo = Date.now() - 90 * 24 * 60 * 60 * 1000;
    if (filingMs >= ninetyDaysAgo) {
      gapScore += 10;
      gapCategories.push("Recent Filing (within 90 days)");
    }
  }

  // Multiple keywords = complexity bonus
  if (keywords.length >= 3) {
    gapScore += 10;
    gapCategories.push("Multiple Compliance Indicators");
  }

  // Cap at 100
  gapScore = Math.min(gapScore, 100);

  // Estimate remediation timeline
  let estimatedRemediation: string;
  if (gapScore >= 80) {
    estimatedRemediation = "6-12 months comprehensive remediation program";
  } else if (gapScore >= 50) {
    estimatedRemediation = "3-6 months targeted remediation";
  } else if (gapScore >= 25) {
    estimatedRemediation = "1-3 months focused compliance review";
  } else {
    estimatedRemediation = "< 1 month standard compliance check";
  }

  // Deduplicate services
  const uniqueServices = [...new Set(recommendedServices)];

  return {
    filing,
    gapScore,
    gapCategories,
    recommendedServices: uniqueServices,
    estimatedRemediation,
    discoveredAt: new Date().toISOString(),
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// Compliance Gap Report Generator — Branded HTML
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Generate a professional HTML compliance gap report for an SEC-filed company.
 * This is the "free sample" — demonstrates value before asking for payment.
 */
export function generateEDGARGapReportHTML(
  leads: MaterialWeaknessLead[],
  cik: string
): string {
  if (leads.length === 0) {
    return generateNoResultsHTML(cik);
  }

  const companyName = leads[0]!.filing.companyName;
  const topScore = Math.max(...leads.map((l) => l.gapScore));
  const scoreColor =
    topScore >= 70 ? "#dc2626" : topScore >= 40 ? "#d97706" : "#16a34a";
  const scoreLabel =
    topScore >= 70 ? "CRITICAL" : topScore >= 40 ? "ELEVATED" : "MODERATE";

  // Aggregate all categories and services across filings
  const allCategories = [...new Set(leads.flatMap((l) => l.gapCategories))];
  const allServices = [...new Set(leads.flatMap((l) => l.recommendedServices))];

  const categoriesHTML = allCategories
    .map((c) => `<span class="gap-tag">${sanitize(c)}</span>`)
    .join(" ");
  const servicesHTML = allServices
    .map((s) => `<li>${sanitize(s)}</li>`)
    .join("");

  const filingsRows = leads
    .map(
      (lead) => `
    <tr>
      <td>${sanitize(lead.filing.filingDate)}</td>
      <td>${sanitize(lead.filing.formType)}</td>
      <td>${lead.filing.keywords.map((k) => `<span class="badge ${k === "material weakness" || k === "adverse opinion" ? "critical" : k === "restatement" ? "warning" : "info"}">${sanitize(k)}</span>`).join(" ") || '<span class="badge ok">None detected</span>'}</td>
      <td class="score-cell" style="color: ${lead.gapScore >= 70 ? "#dc2626" : lead.gapScore >= 40 ? "#d97706" : "#16a34a"}; font-weight: bold;">${lead.gapScore}</td>
      <td><a href="${sanitize(lead.filing.fileUrl)}" target="_blank" rel="noopener noreferrer" style="color: var(--gold);">View Filing</a></td>
    </tr>`
    )
    .join("");

  // Determine best remediation estimate from highest-scored lead
  const topLead = leads.reduce((best, l) =>
    l.gapScore > best.gapScore ? l : best
  );

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SEC Compliance Gap Report &mdash; ${sanitize(companyName)}</title>
<style>
  :root {
    --gold: #c8a951; --navy: #0a0e17; --slate: #1a1f2e;
    --text: #e0e6f0; --muted: #8892a4;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', system-ui, sans-serif; background: var(--navy); color: var(--text); line-height: 1.6; }
  .container { max-width: 960px; margin: 0 auto; padding: 2rem; }
  .header { text-align: center; padding: 2rem 0; border-bottom: 2px solid var(--gold); margin-bottom: 2rem; }
  .header h1 { color: var(--gold); font-size: 1.5rem; letter-spacing: 2px; text-transform: uppercase; }
  .header .subtitle { color: var(--muted); margin-top: 0.5rem; }
  .entity-card { background: var(--slate); border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .entity-card .label { color: var(--muted); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; }
  .entity-card .value { font-size: 1.1rem; margin-bottom: 0.5rem; }
  .score-section { text-align: center; background: var(--slate); border-radius: 8px; padding: 2rem; margin-bottom: 1.5rem; }
  .score-circle { width: 120px; height: 120px; border-radius: 50%; border: 6px solid ${scoreColor}; display: inline-flex; align-items: center; justify-content: center; flex-direction: column; }
  .score-number { font-size: 2rem; font-weight: bold; color: ${scoreColor}; }
  .score-label { font-size: 0.75rem; color: ${scoreColor}; letter-spacing: 2px; text-transform: uppercase; }
  .section { margin-bottom: 2rem; }
  .section h2 { color: var(--gold); font-size: 1.2rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(200,169,81,0.3); }
  table { width: 100%; border-collapse: collapse; background: var(--slate); border-radius: 8px; overflow: hidden; }
  th { background: rgba(200,169,81,0.15); color: var(--gold); text-align: left; padding: 0.75rem; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; }
  td { padding: 0.75rem; border-top: 1px solid rgba(255,255,255,0.05); font-size: 0.9rem; }
  .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; margin: 2px; }
  .badge.critical { background: rgba(220,38,38,0.2); color: #fca5a5; }
  .badge.warning { background: rgba(217,119,6,0.2); color: #fcd34d; }
  .badge.info { background: rgba(59,130,246,0.2); color: #93c5fd; }
  .badge.ok { background: rgba(22,163,74,0.2); color: #86efac; }
  .gap-tag { display: inline-block; background: rgba(220,38,38,0.15); color: #fca5a5; padding: 4px 12px; border-radius: 16px; font-size: 0.85rem; margin: 4px; }
  .recommendations { background: var(--slate); border-radius: 8px; padding: 1.5rem; border-left: 4px solid var(--gold); }
  .recommendations ul { padding-left: 1.5rem; }
  .recommendations li { margin-bottom: 0.5rem; }
  .cta { text-align: center; margin-top: 2rem; padding: 2rem; background: linear-gradient(135deg, rgba(200,169,81,0.1), rgba(200,169,81,0.05)); border: 1px solid var(--gold); border-radius: 8px; }
  .cta a { display: inline-block; background: var(--gold); color: var(--navy); padding: 12px 32px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 1.1rem; }
  .footer { text-align: center; color: var(--muted); font-size: 0.8rem; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.05); }
  .disclaimer { font-size: 0.75rem; color: var(--muted); margin-top: 1rem; font-style: italic; }
  .score-cell { text-align: center; }
</style>
</head>
<body>
<div class="container">

  <div class="header">
    <h1>Vernen Legal Compliance</h1>
    <div class="subtitle">SEC EDGAR Compliance Gap Report</div>
  </div>

  <div class="entity-card">
    <div>
      <div class="label">Company</div>
      <div class="value">${sanitize(companyName)}</div>
      <div class="label">CIK</div>
      <div class="value">${sanitize(cik)}</div>
    </div>
    <div>
      <div class="label">Filings Analyzed</div>
      <div class="value">${leads.length}</div>
      <div class="label">Date Range</div>
      <div class="value">${sanitize(leads[leads.length - 1]!.filing.filingDate)} &mdash; ${sanitize(leads[0]!.filing.filingDate)}</div>
    </div>
  </div>

  <div class="score-section">
    <div class="score-circle">
      <div class="score-number">${topScore}</div>
      <div class="score-label">${scoreLabel}</div>
    </div>
    <p style="margin-top:1rem; color: var(--muted);">Compliance Gap Score &mdash; higher indicates greater remediation urgency</p>
    <div style="margin-top:1rem;">${categoriesHTML}</div>
  </div>

  <div class="section">
    <h2>8-K Filings with Compliance Indicators (${leads.length})</h2>
    <table>
      <thead><tr><th>Date</th><th>Form</th><th>Indicators</th><th>Score</th><th>Filing</th></tr></thead>
      <tbody>${filingsRows}</tbody>
    </table>
  </div>

  <div class="section">
    <h2>Recommended Compliance Services</h2>
    <div class="recommendations">
      <ul>${servicesHTML}</ul>
      <p style="margin-top: 1rem; color: var(--muted);">Estimated remediation timeline: <strong style="color: var(--text);">${sanitize(topLead.estimatedRemediation)}</strong></p>
    </div>
  </div>

  <div class="cta">
    <p style="margin-bottom: 1rem; font-size: 1.1rem;">Ready to close these compliance gaps?</p>
    <a href="https://compliance.vernenlegal.com/api/regulis/check">Start Your Compliance Review</a>
    <p style="margin-top: 1rem; color: var(--muted);">Powered by 745+ compliance rules across all 50 states</p>
  </div>

  <div class="footer">
    <p>Generated by Vernen Legal Compliance &mdash; ${new Date().toISOString().split("T")[0]}</p>
    <p>Data source: SEC EDGAR (sec.gov) &mdash; Public record</p>
    <p class="disclaimer">This report is generated from publicly available SEC filing data and is provided for informational purposes only. It does not constitute legal advice, an audit opinion, or a professional engagement. Consult qualified professionals for compliance remediation.</p>
  </div>

</div>
</body>
</html>`;
}

function generateNoResultsHTML(cik: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SEC Compliance Gap Report &mdash; CIK ${sanitize(cik)}</title>
<style>
  :root {
    --gold: #c8a951; --navy: #0a0e17; --slate: #1a1f2e;
    --text: #e0e6f0; --muted: #8892a4;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', system-ui, sans-serif; background: var(--navy); color: var(--text); line-height: 1.6; }
  .container { max-width: 960px; margin: 0 auto; padding: 2rem; text-align: center; }
  .header { padding: 2rem 0; border-bottom: 2px solid var(--gold); margin-bottom: 2rem; }
  .header h1 { color: var(--gold); font-size: 1.5rem; letter-spacing: 2px; text-transform: uppercase; }
  .header .subtitle { color: var(--muted); margin-top: 0.5rem; }
  .no-results { background: var(--slate); border-radius: 8px; padding: 3rem; margin-top: 2rem; }
  .no-results h2 { color: var(--gold); margin-bottom: 1rem; }
  .no-results p { color: var(--muted); }
  .footer { text-align: center; color: var(--muted); font-size: 0.8rem; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.05); }
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <h1>Vernen Legal Compliance</h1>
    <div class="subtitle">SEC EDGAR Compliance Gap Report</div>
  </div>
  <div class="no-results">
    <h2>No Compliance Gaps Found</h2>
    <p>No 8-K filings with material weakness indicators were found for CIK ${sanitize(cik)}.</p>
    <p style="margin-top: 1rem;">This may indicate a clean compliance record, or the company may not have filed relevant 8-K disclosures in the search period.</p>
  </div>
  <div class="footer">
    <p>Generated by Vernen Legal Compliance &mdash; ${new Date().toISOString().split("T")[0]}</p>
    <p>Data source: SEC EDGAR (sec.gov) &mdash; Public record</p>
  </div>
</div>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// D1 Storage — Cache EDGAR leads locally for fast access
// ═══════════════════════════════════════════════════════════════════════════

export async function ensureEDGARTables(db: D1Database): Promise<void> {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS edgar_leads (
      accession_number TEXT PRIMARY KEY,
      cik TEXT NOT NULL,
      company_name TEXT NOT NULL,
      form_type TEXT DEFAULT '8-K',
      filing_date TEXT,
      file_url TEXT,
      keywords TEXT DEFAULT '[]',
      gap_score INTEGER DEFAULT 0,
      gap_categories TEXT DEFAULT '[]',
      recommended_services TEXT DEFAULT '[]',
      estimated_remediation TEXT,
      status TEXT DEFAULT 'new',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_edgar_leads_cik ON edgar_leads(cik);
    CREATE INDEX IF NOT EXISTS idx_edgar_leads_score ON edgar_leads(gap_score DESC);
    CREATE INDEX IF NOT EXISTS idx_edgar_leads_status ON edgar_leads(status);
    CREATE INDEX IF NOT EXISTS idx_edgar_leads_date ON edgar_leads(filing_date DESC);
  `);
}

export async function storeEDGARLead(
  db: D1Database,
  lead: MaterialWeaknessLead
): Promise<void> {
  await db
    .prepare(
      `
    INSERT OR REPLACE INTO edgar_leads
    (accession_number, cik, company_name, form_type, filing_date,
     file_url, keywords, gap_score, gap_categories,
     recommended_services, estimated_remediation, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
  `
    )
    .bind(
      lead.filing.accessionNumber,
      lead.filing.cik,
      lead.filing.companyName,
      lead.filing.formType,
      lead.filing.filingDate,
      lead.filing.fileUrl,
      JSON.stringify(lead.filing.keywords),
      lead.gapScore,
      JSON.stringify(lead.gapCategories),
      JSON.stringify(lead.recommendedServices),
      lead.estimatedRemediation
    )
    .run();
}

export async function getStoredEDGARLeads(
  db: D1Database,
  filters: {
    cik?: string;
    minScore?: number;
    status?: string;
    limit?: number;
  }
): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM edgar_leads WHERE 1=1";
  const binds: unknown[] = [];

  if (filters.cik) {
    query += " AND cik = ?";
    binds.push(filters.cik);
  }
  if (filters.minScore) {
    query += " AND gap_score >= ?";
    binds.push(filters.minScore);
  }
  if (filters.status) {
    query += " AND status = ?";
    binds.push(filters.status);
  }

  query += " ORDER BY gap_score DESC LIMIT ?";
  binds.push(filters.limit ?? 50);

  const result = await db.prepare(query).bind(...binds).all();
  return result.results as Record<string, unknown>[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Errors
// ═══════════════════════════════════════════════════════════════════════════

export class EDGARApiError extends Error {
  constructor(
    public status: number,
    public body: string
  ) {
    super(`EDGAR API error ${status}: ${body}`);
    this.name = "EDGARApiError";
  }
}

export class EDGARRateLimitError extends Error {
  constructor() {
    super("EDGAR API rate limit exceeded (10 req/sec)");
    this.name = "EDGARRateLimitError";
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Utilities
// ═══════════════════════════════════════════════════════════════════════════

function sanitize(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function formatAccession(raw: string): string {
  // EDGAR accession numbers: 0001234567-24-012345
  // Strip to just digits and dashes for URL construction
  const cleaned = raw.replace(/[^0-9-]/g, "");
  if (cleaned.length < 10) return "";
  return cleaned.replace(/-/g, "");
}

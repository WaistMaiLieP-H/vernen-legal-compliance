/**
 * FDA Intelligence Service — openFDA Enforcement Pipeline
 *
 * Connects to the openFDA API to identify entities with documented
 * FDA enforcement actions: recalls, warning letters, adverse events.
 * Covers drugs, food, medical devices, and tobacco.
 *
 * These are not cold leads — they are entities with legally documented
 * enforcement actions and active recall obligations.
 */

import type { Env } from "../index.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface FDAEnforcementAction {
  recallNumber: string;
  recallingFirm: string;
  city: string;
  state: string;
  classification: string;  // "Class I" | "Class II" | "Class III"
  productDescription: string;
  reasonForRecall: string;
  status: string;
  voluntaryMandated: string;
  recallInitiationDate: string;
  productType: string;     // "Drugs" | "Food" | "Devices"
  eventId: string;
}

export interface FDAComplianceLead {
  action: FDAEnforcementAction;
  riskScore: number;
  riskCategories: string[];
  recommendedServices: string[];
  estimatedRemediation: string;
}

export interface FDASearchFilters {
  productType?: string;    // drug, food, device
  classification?: string; // "Class I", etc.
  state?: string;
  limit?: number;
  offset?: number;
}

export interface FDAPipelineResult {
  leads: FDAComplianceLead[];
  totalMatched: number;
  filters: FDASearchFilters;
  generatedAt: string;
  source: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// FDA openFDA Client & Intelligence Service
// ═══════════════════════════════════════════════════════════════════════════

const FDA_API_BASE = "https://api.fda.gov";
const DEFAULT_LIMIT = 100;
const MAX_LIMIT = 100; // openFDA caps at 100 per request without API key

const ENFORCEMENT_ENDPOINTS: Record<string, string> = {
  drug: "/drug/enforcement.json",
  food: "/food/enforcement.json",
  device: "/device/enforcement.json",
};

export class FDAIntelligenceService {

  /**
   * Core API request handler with rate-limit awareness.
   * openFDA allows 40 requests/min without an API key.
   */
  private async fdaRequest<T>(
    endpoint: string,
    params: Record<string, string> = {}
  ): Promise<{ meta: { results: { total: number } }; results: T[] }> {
    const url = new URL(`${FDA_API_BASE}${endpoint}`);
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }

    const response = await fetch(url.toString(), {
      headers: {
        "Accept": "application/json",
      },
    });

    if (response.status === 429) {
      throw new FDARateLimitError();
    }

    if (response.status === 404) {
      // openFDA returns 404 when no results match the query
      return { meta: { results: { total: 0 } }, results: [] };
    }

    if (!response.ok) {
      throw new FDAApiError(response.status, await response.text());
    }

    return response.json() as Promise<{ meta: { results: { total: number } }; results: T[] }>;
  }

  // ─── Discovery Queries ──────────────────────────────────────────────

  /**
   * Fetch enforcement actions for a given product type (drug, food, device).
   * Returns recalled entities with documented FDA enforcement.
   */
  async fetchEnforcement(
    productType: string,
    filters: FDASearchFilters = {}
  ): Promise<{ actions: FDAEnforcementAction[]; total: number }> {
    const endpoint = ENFORCEMENT_ENDPOINTS[productType.toLowerCase()];
    if (!endpoint) {
      throw new FDAApiError(400, `Invalid product type: ${productType}. Use drug, food, or device.`);
    }

    const limit = Math.min(filters.limit ?? DEFAULT_LIMIT, MAX_LIMIT);
    const params: Record<string, string> = {
      limit: String(limit),
    };

    if (filters.offset) {
      params["skip"] = String(filters.offset);
    }

    // Build search query parts
    const searchParts: string[] = [];

    if (filters.state) {
      searchParts.push(`state:"${filters.state.toUpperCase()}"`);
    }
    if (filters.classification) {
      searchParts.push(`classification:"${filters.classification}"`);
    }

    if (searchParts.length > 0) {
      params["search"] = searchParts.join("+AND+");
    }

    const label = productType.charAt(0).toUpperCase() + productType.slice(1).toLowerCase();
    const productTypeLabel = label === "Drug" ? "Drugs" : label === "Food" ? "Food" : "Devices";

    const response = await this.fdaRequest<Record<string, unknown>>(endpoint, params);

    const actions = response.results.map((r) => mapToEnforcementAction(r, productTypeLabel));

    return {
      actions,
      total: response.meta.results.total,
    };
  }

  /**
   * Fetch device adverse events — reported injuries/malfunctions.
   * Separate from enforcement but signals compliance risk.
   */
  async fetchDeviceAdverseEvents(
    filters: FDASearchFilters = {}
  ): Promise<{ events: Record<string, unknown>[]; total: number }> {
    const limit = Math.min(filters.limit ?? DEFAULT_LIMIT, MAX_LIMIT);
    const params: Record<string, string> = {
      limit: String(limit),
    };

    if (filters.offset) {
      params["skip"] = String(filters.offset);
    }

    const response = await this.fdaRequest<Record<string, unknown>>(
      "/device/event.json",
      params
    );

    return {
      events: response.results,
      total: response.meta.results.total,
    };
  }

  // ─── Risk Scoring ─────────────────────────────────────────────────

  /**
   * Score compliance risk for a single enforcement action.
   * Class I = most serious (reasonable probability of serious health consequences or death).
   * Class II = may cause temporary/reversible adverse health consequences.
   * Class III = not likely to cause adverse health consequences.
   */
  scoreComplianceRisk(action: FDAEnforcementAction): FDAComplianceLead {
    let riskScore = 0;
    const riskCategories: string[] = [];
    const recommendedServices: string[] = [];

    // Classification scoring
    if (action.classification === "Class I") {
      riskScore += 40;
      riskCategories.push("Class I — Serious Health Risk or Death");
      recommendedServices.push("Emergency Recall Compliance Audit");
      recommendedServices.push("FDA 483 Response Preparation");
    } else if (action.classification === "Class II") {
      riskScore += 25;
      riskCategories.push("Class II — Temporary/Reversible Health Risk");
      recommendedServices.push("Recall Effectiveness Assessment");
      recommendedServices.push("Corrective Action Plan Development");
    } else if (action.classification === "Class III") {
      riskScore += 10;
      riskCategories.push("Class III — Low Health Risk");
      recommendedServices.push("Voluntary Recall Documentation Review");
    }

    // Mandated recall = higher severity (FDA forced it)
    if (action.voluntaryMandated && !action.voluntaryMandated.toLowerCase().includes("voluntary")) {
      riskScore += 20;
      riskCategories.push("FDA-Mandated Recall");
      recommendedServices.push("Mandatory Recall Response & Reporting");
    }

    // Ongoing status = active compliance obligation
    if (action.status && action.status.toLowerCase().includes("ongoing")) {
      riskScore += 10;
      riskCategories.push("Active/Ongoing Recall");
      recommendedServices.push("Ongoing Recall Status Monitoring");
    }

    // Cap at 100
    riskScore = Math.min(riskScore, 100);

    // Estimate remediation timeline
    let estimatedRemediation: string;
    if (riskScore >= 70) {
      estimatedRemediation = "6-12 months comprehensive FDA compliance remediation";
    } else if (riskScore >= 50) {
      estimatedRemediation = "3-6 months targeted corrective action program";
    } else if (riskScore >= 25) {
      estimatedRemediation = "1-3 months recall compliance review";
    } else {
      estimatedRemediation = "< 1 month documentation and closure audit";
    }

    // Deduplicate services
    const uniqueServices = [...new Set(recommendedServices)];

    return {
      action,
      riskScore,
      riskCategories,
      recommendedServices: uniqueServices,
      estimatedRemediation,
    };
  }

  // ─── Full Intelligence Pipeline ─────────────────────────────────────

  /**
   * Run the full FDA compliance intelligence pipeline.
   * Fetches enforcement data across all 3 product types → scores → stores in D1.
   */
  async runPipeline(
    db: D1Database,
    filters: FDASearchFilters = {}
  ): Promise<FDAPipelineResult> {
    await ensureFDATables(db);

    const productTypes = filters.productType
      ? [filters.productType.toLowerCase()]
      : ["drug", "food", "device"];

    const allLeads: FDAComplianceLead[] = [];
    let totalMatched = 0;

    for (const productType of productTypes) {
      try {
        const { actions, total } = await this.fetchEnforcement(productType, filters);
        totalMatched += total;

        for (const action of actions) {
          const lead = this.scoreComplianceRisk(action);
          allLeads.push(lead);

          // Store each lead in D1
          await storeLead(db, lead);
        }
      } catch (err) {
        // If one product type fails, continue with others
        if (err instanceof FDARateLimitError) {
          throw err; // Rate limit affects all endpoints — stop
        }
        // Log and continue for other errors
        console.error(`FDA pipeline error for ${productType}:`, err);
      }
    }

    // Sort by risk score (highest urgency first)
    allLeads.sort((a, b) => b.riskScore - a.riskScore);

    return {
      leads: allLeads,
      totalMatched,
      filters,
      generatedAt: new Date().toISOString(),
      source: "openFDA Enforcement Database (api.fda.gov)",
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Compliance Report Generator
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Generate a professional HTML compliance report for an FDA enforcement lead.
 * This is the "free sample" — demonstrates value before asking for payment.
 */
export function generateReportHTML(lead: FDAComplianceLead): string {
  const { action, riskScore, riskCategories, recommendedServices, estimatedRemediation } = lead;

  const scoreColor = riskScore >= 70 ? "#dc2626" : riskScore >= 40 ? "#d97706" : "#16a34a";
  const scoreLabel = riskScore >= 70 ? "CRITICAL" : riskScore >= 40 ? "ELEVATED" : "MODERATE";

  const categoriesHTML = riskCategories.map((c) => `<span class="gap-tag">${sanitize(c)}</span>`).join(" ");
  const servicesHTML = recommendedServices.map((s) => `<li>${sanitize(s)}</li>`).join("");

  // Format the recall date from YYYYMMDD to readable
  const recallDate = formatFDADate(action.recallInitiationDate);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>FDA Enforcement Report — ${sanitize(action.recallingFirm)}</title>
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
  .badge.ok { background: rgba(22,163,74,0.2); color: #86efac; }
  .gap-tag { display: inline-block; background: rgba(220,38,38,0.15); color: #fca5a5; padding: 4px 12px; border-radius: 16px; font-size: 0.85rem; margin: 4px; }
  .recommendations { background: var(--slate); border-radius: 8px; padding: 1.5rem; border-left: 4px solid var(--gold); }
  .recommendations ul { padding-left: 1.5rem; }
  .recommendations li { margin-bottom: 0.5rem; }
  .reason-block { background: var(--slate); border-radius: 8px; padding: 1.5rem; border-left: 4px solid #dc2626; margin-bottom: 1.5rem; }
  .reason-block .reason-label { color: var(--muted); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem; }
  .product-block { background: var(--slate); border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem; }
  .product-block .product-label { color: var(--muted); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem; }
  .cta { text-align: center; margin-top: 2rem; padding: 2rem; background: linear-gradient(135deg, rgba(200,169,81,0.1), rgba(200,169,81,0.05)); border: 1px solid var(--gold); border-radius: 8px; }
  .cta a { display: inline-block; background: var(--gold); color: var(--navy); padding: 12px 32px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 1.1rem; }
  .footer { text-align: center; color: var(--muted); font-size: 0.8rem; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.05); }
  .disclaimer { font-size: 0.75rem; color: var(--muted); margin-top: 1rem; font-style: italic; }
</style>
</head>
<body>
<div class="container">

  <div class="header">
    <h1>Vernen Legal Compliance</h1>
    <div class="subtitle">FDA Enforcement Compliance Report</div>
  </div>

  <div class="entity-card">
    <div>
      <div class="label">Recalling Firm</div>
      <div class="value">${sanitize(action.recallingFirm)}</div>
      <div class="label">Location</div>
      <div class="value">${sanitize(action.city)}, ${sanitize(action.state)}</div>
      <div class="label">Recall Number</div>
      <div class="value">${sanitize(action.recallNumber)}</div>
    </div>
    <div>
      <div class="label">Product Type</div>
      <div class="value">${sanitize(action.productType)}</div>
      <div class="label">Classification</div>
      <div class="value"><span class="badge ${action.classification === "Class I" ? "critical" : action.classification === "Class II" ? "warning" : "ok"}">${sanitize(action.classification)}</span></div>
      <div class="label">Recall Date</div>
      <div class="value">${sanitize(recallDate)}</div>
    </div>
  </div>

  <div class="score-section">
    <div class="score-circle">
      <div class="score-number">${riskScore}</div>
      <div class="score-label">${scoreLabel}</div>
    </div>
    <p style="margin-top:1rem; color: var(--muted);">FDA Compliance Risk Score — higher indicates greater remediation urgency</p>
    <div style="margin-top:1rem;">${categoriesHTML}</div>
  </div>

  <div class="section">
    <h2>Enforcement Details</h2>
    <table>
      <thead><tr><th>Field</th><th>Value</th></tr></thead>
      <tbody>
        <tr><td>Status</td><td><span class="badge ${action.status.toLowerCase().includes("ongoing") ? "critical" : "ok"}">${sanitize(action.status)}</span></td></tr>
        <tr><td>Voluntary / Mandated</td><td>${sanitize(action.voluntaryMandated)}</td></tr>
        <tr><td>Event ID</td><td>${sanitize(action.eventId)}</td></tr>
      </tbody>
    </table>
  </div>

  <div class="reason-block">
    <div class="reason-label">Reason for Recall</div>
    <p>${sanitize(action.reasonForRecall)}</p>
  </div>

  <div class="product-block">
    <div class="product-label">Product Description</div>
    <p>${sanitize(action.productDescription)}</p>
  </div>

  <div class="section">
    <h2>Recommended Compliance Services</h2>
    <div class="recommendations">
      <ul>${servicesHTML}</ul>
      <p style="margin-top: 1rem; color: var(--muted);">Estimated remediation timeline: <strong style="color: var(--text);">${sanitize(estimatedRemediation)}</strong></p>
    </div>
  </div>

  <div class="cta">
    <p style="margin-bottom: 1rem; font-size: 1.1rem;">Ready to resolve this enforcement action?</p>
    <a href="https://compliance.vernenlegal.com/api/regulis/check">Start Your Compliance Review</a>
    <p style="margin-top: 1rem; color: var(--muted);">Powered by 745+ compliance rules across all 50 states</p>
  </div>

  <div class="footer">
    <p>Generated by Vernen Legal Compliance — ${new Date().toISOString().split("T")[0]}</p>
    <p>Data source: openFDA Enforcement Database (api.fda.gov) — Public record</p>
    <p class="disclaimer">This report is generated from publicly available FDA enforcement data and is provided for informational purposes only. It does not constitute legal advice, a regulatory opinion, or a professional engagement. Consult qualified professionals for FDA compliance remediation.</p>
  </div>

</div>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// D1 Storage — Cache FDA data locally for fast access
// ═══════════════════════════════════════════════════════════════════════════

export async function ensureFDATables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS fda_leads (recall_number TEXT PRIMARY KEY, recalling_firm TEXT NOT NULL, state TEXT, classification TEXT, product_type TEXT, reason_for_recall TEXT, status TEXT, recall_date TEXT, risk_score INTEGER DEFAULT 0, risk_categories TEXT DEFAULT '[]', created_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_fda_leads_state ON fda_leads(state)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_fda_leads_score ON fda_leads(risk_score DESC)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_fda_leads_classification ON fda_leads(classification)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_fda_leads_product_type ON fda_leads(product_type)"),
  ]);
}

export async function storeLead(
  db: D1Database,
  lead: FDAComplianceLead
): Promise<void> {
  await db.prepare(`
    INSERT OR REPLACE INTO fda_leads
    (recall_number, recalling_firm, state, classification, product_type,
     reason_for_recall, status, recall_date, risk_score, risk_categories)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    lead.action.recallNumber,
    lead.action.recallingFirm,
    lead.action.state,
    lead.action.classification,
    lead.action.productType,
    lead.action.reasonForRecall,
    lead.action.status,
    lead.action.recallInitiationDate,
    lead.riskScore,
    JSON.stringify(lead.riskCategories),
  ).run();
}

export async function getStoredLeads(
  db: D1Database,
  filters: { state?: string; classification?: string; productType?: string; minScore?: number; limit?: number }
): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM fda_leads WHERE 1=1";
  const binds: unknown[] = [];

  if (filters.state) {
    query += " AND state = ?";
    binds.push(filters.state.toUpperCase());
  }
  if (filters.classification) {
    query += " AND classification = ?";
    binds.push(filters.classification);
  }
  if (filters.productType) {
    query += " AND product_type = ?";
    binds.push(filters.productType);
  }
  if (filters.minScore) {
    query += " AND risk_score >= ?";
    binds.push(filters.minScore);
  }

  query += " ORDER BY risk_score DESC LIMIT ?";
  binds.push(filters.limit ?? 50);

  const result = await db.prepare(query).bind(...binds).all();
  return result.results as Record<string, unknown>[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Data Mappers
// ═══════════════════════════════════════════════════════════════════════════

function mapToEnforcementAction(
  r: Record<string, unknown>,
  productType: string
): FDAEnforcementAction {
  return {
    recallNumber: String(r["recall_number"] ?? ""),
    recallingFirm: String(r["recalling_firm"] ?? ""),
    city: String(r["city"] ?? ""),
    state: String(r["state"] ?? ""),
    classification: String(r["classification"] ?? ""),
    productDescription: String(r["product_description"] ?? ""),
    reasonForRecall: String(r["reason_for_recall"] ?? ""),
    status: String(r["status"] ?? ""),
    voluntaryMandated: String(r["voluntary_mandated"] ?? ""),
    recallInitiationDate: String(r["recall_initiation_date"] ?? ""),
    productType,
    eventId: String(r["event_id"] ?? ""),
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// Errors
// ═══════════════════════════════════════════════════════════════════════════

export class FDAApiError extends Error {
  constructor(public status: number, public body: string) {
    super(`FDA API error ${status}: ${body}`);
    this.name = "FDAApiError";
  }
}

export class FDARateLimitError extends Error {
  constructor() {
    super("openFDA API rate limit exceeded (40 requests/min without API key)");
    this.name = "FDARateLimitError";
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

/**
 * Convert openFDA date format (YYYYMMDD) to readable string.
 */
function formatFDADate(fdaDate: string): string {
  if (!fdaDate || fdaDate.length !== 8) return fdaDate || "Unknown";
  const year = fdaDate.substring(0, 4);
  const month = fdaDate.substring(4, 6);
  const day = fdaDate.substring(6, 8);
  return `${year}-${month}-${day}`;
}

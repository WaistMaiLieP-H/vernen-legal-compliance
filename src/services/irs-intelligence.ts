/**
 * IRS Intelligence Service — Tax Compliance Enforcement Pipeline
 *
 * Connects to IRS public data including exempt organization revocations,
 * automatic revocation list, and tax-exempt status checks.
 *
 * Source: irs.gov public data files (free, no key required)
 */

import type { Env } from "../index.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface IRSRevocation {
  ein: string;
  organizationName: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  exemptionType: string;       // 501(c)(3), 501(c)(4), etc.
  revocationDate: string;
  revocationPostingDate: string;
  reinstatementDate: string;
  exemptionReinstated: boolean;
}

export interface IRSExemptOrg {
  ein: string;
  organizationName: string;
  city: string;
  state: string;
  subsection: string;          // 501(c)(3), (c)(4), etc.
  classification: string;
  ruling: string;
  deductibility: string;
  foundation: string;
  filingRequirement: string;
  assetAmount: number;
  incomeAmount: number;
  revenueAmount: number;
}

export interface IRSComplianceLead {
  type: "revocation" | "exempt_org";
  revocation?: IRSRevocation;
  exemptOrg?: IRSExemptOrg;
  entity: string;
  ein: string;
  riskScore: number;
  riskCategories: string[];
  recommendedServices: string[];
  estimatedRemediation: string;
}

export interface IRSSearchFilters {
  state?: string;
  exemptionType?: string;
  entityName?: string;
  limit?: number;
}

export interface IRSPipelineResult {
  leads: IRSComplianceLead[];
  totalMatched: number;
  filters: IRSSearchFilters;
  generatedAt: string;
  source: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// IRS Data Client & Intelligence Service
// ═══════════════════════════════════════════════════════════════════════════

// IRS EO Search (Exempt Organizations)
const IRS_EO_SEARCH_URL = "https://apps.irs.gov/app/eos/allSearch";
// ProPublica Nonprofit Explorer API (public, reliable, free)
const PROPUBLICA_NONPROFIT_URL = "https://projects.propublica.org/nonprofits/api/v2";

export class IRSIntelligenceService {

  async fetchRevocations(filters: IRSSearchFilters = {}): Promise<{ revocations: IRSRevocation[]; total: number }> {
    // Use ProPublica as a reliable proxy for IRS exempt org data
    try {
      const url = new URL(`${PROPUBLICA_NONPROFIT_URL}/search.json`);
      url.searchParams.set("page", "0");

      if (filters.state) url.searchParams.set("state[id]", filters.state.toUpperCase());
      if (filters.entityName) url.searchParams.set("q", filters.entityName);

      const response = await fetch(url.toString(), {
        headers: { "Accept": "application/json" },
      });

      if (!response.ok) return { revocations: [], total: 0 };

      const data = await response.json() as {
        total_results?: number;
        organizations?: Record<string, unknown>[];
      };

      const orgs = data.organizations ?? [];
      // Filter for revoked/lost status
      const revokedOrgs = orgs.filter(o => {
        const status = String(o["status"] ?? o["tax_period"] ?? "").toLowerCase();
        return status.includes("revok") || status.includes("terminat") || !o["ruling_date"];
      });

      const limit = filters.limit ?? 100;
      const revocations = revokedOrgs.slice(0, limit).map(mapToRevocation);

      return { revocations, total: data.total_results ?? revocations.length };
    } catch {
      return { revocations: [], total: 0 };
    }
  }

  async fetchExemptOrgs(filters: IRSSearchFilters = {}): Promise<{ orgs: IRSExemptOrg[]; total: number }> {
    try {
      const url = new URL(`${PROPUBLICA_NONPROFIT_URL}/search.json`);
      url.searchParams.set("page", "0");

      if (filters.state) url.searchParams.set("state[id]", filters.state.toUpperCase());
      if (filters.entityName) url.searchParams.set("q", filters.entityName);
      if (filters.exemptionType) url.searchParams.set("c_code[id]", filters.exemptionType);

      const response = await fetch(url.toString(), {
        headers: { "Accept": "application/json" },
      });

      if (!response.ok) return { orgs: [], total: 0 };

      const data = await response.json() as {
        total_results?: number;
        organizations?: Record<string, unknown>[];
      };

      const limit = filters.limit ?? 100;
      const orgs = (data.organizations ?? []).slice(0, limit).map(mapToExemptOrg);

      return { orgs, total: data.total_results ?? orgs.length };
    } catch {
      return { orgs: [], total: 0 };
    }
  }

  scoreRevocationRisk(revocation: IRSRevocation): IRSComplianceLead {
    let riskScore = 0;
    const riskCategories: string[] = [];
    const recommendedServices: string[] = [];

    // Revocation status
    if (!revocation.exemptionReinstated) {
      riskScore += 40;
      riskCategories.push("Tax-Exempt Status Revoked — Not Reinstated");
      recommendedServices.push("IRS Form 1023/1024 Reinstatement Application");
      recommendedServices.push("Tax-Exempt Status Recovery Program");
    } else {
      riskScore += 10;
      riskCategories.push("Previously Revoked — Now Reinstated");
      recommendedServices.push("Post-Reinstatement Compliance Monitoring");
    }

    // Exemption type
    const exemptionType = (revocation.exemptionType ?? "").toLowerCase();
    if (exemptionType.includes("501(c)(3)")) {
      riskScore += 10;
      riskCategories.push("501(c)(3) Public Charity/Private Foundation");
      recommendedServices.push("Form 990 Filing Compliance");
    } else if (exemptionType.includes("501(c)(4)")) {
      riskScore += 5;
      riskCategories.push("501(c)(4) Social Welfare Organization");
    }

    // Recency
    if (revocation.revocationDate) {
      const revDate = new Date(revocation.revocationDate);
      const yearsSince = (Date.now() - revDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
      if (yearsSince < 1) {
        riskScore += 15;
        riskCategories.push("Recent Revocation (< 1 year)");
        recommendedServices.push("Expedited Reinstatement Filing");
      } else if (yearsSince < 3) {
        riskScore += 10;
        riskCategories.push("Revocation within 3 years");
      }
    }

    // Filing delinquency
    riskScore += 10;
    riskCategories.push("Automatic Revocation — 3 Consecutive Years Non-Filing");
    recommendedServices.push("Back-Filing Form 990 Series Returns");

    riskScore = Math.min(riskScore, 100);

    let estimatedRemediation: string;
    if (riskScore >= 70) estimatedRemediation = "6-12 months full reinstatement process";
    else if (riskScore >= 50) estimatedRemediation = "3-6 months reinstatement application";
    else if (riskScore >= 25) estimatedRemediation = "1-3 months filing compliance";
    else estimatedRemediation = "< 1 month compliance check";

    return {
      type: "revocation",
      revocation,
      entity: revocation.organizationName,
      ein: revocation.ein,
      riskScore,
      riskCategories,
      recommendedServices: [...new Set(recommendedServices)],
      estimatedRemediation,
    };
  }

  async runPipeline(db: D1Database, filters: IRSSearchFilters = {}): Promise<IRSPipelineResult> {
    await ensureIRSTables(db);

    const { revocations, total } = await this.fetchRevocations(filters);
    const leads: IRSComplianceLead[] = [];

    for (const revocation of revocations) {
      const lead = this.scoreRevocationRisk(revocation);
      leads.push(lead);
      await storeIRSLead(db, lead);
    }

    leads.sort((a, b) => b.riskScore - a.riskScore);

    return {
      leads,
      totalMatched: total,
      filters,
      generatedAt: new Date().toISOString(),
      source: "IRS Exempt Organization Data (via ProPublica Nonprofit Explorer)",
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// D1 Storage
// ═══════════════════════════════════════════════════════════════════════════

export async function ensureIRSTables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS irs_leads (ein TEXT PRIMARY KEY, organization_name TEXT NOT NULL, state TEXT, exemption_type TEXT, revocation_date TEXT, reinstated INTEGER DEFAULT 0, risk_score INTEGER DEFAULT 0, risk_categories TEXT DEFAULT '[]', created_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_irs_leads_state ON irs_leads(state)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_irs_leads_score ON irs_leads(risk_score DESC)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_irs_leads_type ON irs_leads(exemption_type)"),
  ]);
}

export async function storeIRSLead(db: D1Database, lead: IRSComplianceLead): Promise<void> {
  const r = lead.revocation;
  if (!r) return;
  await db.prepare(
    "INSERT OR REPLACE INTO irs_leads (ein, organization_name, state, exemption_type, revocation_date, reinstated, risk_score, risk_categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(r.ein, r.organizationName, r.state, r.exemptionType, r.revocationDate, r.exemptionReinstated ? 1 : 0, lead.riskScore, JSON.stringify(lead.riskCategories)).run();
}

export async function getStoredIRSLeads(
  db: D1Database,
  filters: { state?: string; exemptionType?: string; minScore?: number; limit?: number }
): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM irs_leads WHERE 1=1";
  const binds: unknown[] = [];
  if (filters.state) { query += " AND state = ?"; binds.push(filters.state.toUpperCase()); }
  if (filters.exemptionType) { query += " AND exemption_type LIKE ?"; binds.push(`%${filters.exemptionType}%`); }
  if (filters.minScore) { query += " AND risk_score >= ?"; binds.push(filters.minScore); }
  query += " ORDER BY risk_score DESC LIMIT ?";
  binds.push(filters.limit ?? 50);
  return (await db.prepare(query).bind(...binds).all()).results as Record<string, unknown>[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Data Mappers
// ═══════════════════════════════════════════════════════════════════════════

function mapToRevocation(r: Record<string, unknown>): IRSRevocation {
  return {
    ein: String(r["ein"] ?? r["EIN"] ?? ""),
    organizationName: String(r["name"] ?? r["organization_name"] ?? r["ORGANIZATION_NAME"] ?? "Unknown"),
    city: String(r["city"] ?? r["CITY"] ?? ""),
    state: String(r["state"] ?? r["STATE"] ?? ""),
    zipCode: String(r["zipcode"] ?? r["zip"] ?? ""),
    country: String(r["country"] ?? "US"),
    exemptionType: String(r["subsection_code"] ?? r["subsection"] ?? r["SUBSECTION"] ?? ""),
    revocationDate: String(r["revocation_date"] ?? r["REVOCATION_DATE"] ?? ""),
    revocationPostingDate: String(r["revocation_posting_date"] ?? ""),
    reinstatementDate: String(r["reinstatement_date"] ?? ""),
    exemptionReinstated: Boolean(r["exemption_reinstated"] ?? false),
  };
}

function mapToExemptOrg(r: Record<string, unknown>): IRSExemptOrg {
  return {
    ein: String(r["ein"] ?? r["EIN"] ?? ""),
    organizationName: String(r["name"] ?? r["organization_name"] ?? "Unknown"),
    city: String(r["city"] ?? ""),
    state: String(r["state"] ?? ""),
    subsection: String(r["subsection_code"] ?? r["subsection"] ?? ""),
    classification: String(r["classification"] ?? ""),
    ruling: String(r["ruling_date"] ?? ""),
    deductibility: String(r["deductibility"] ?? ""),
    foundation: String(r["foundation"] ?? ""),
    filingRequirement: String(r["filing_requirement"] ?? ""),
    assetAmount: Number(r["asset_amount"] ?? r["totassetsend"] ?? 0),
    incomeAmount: Number(r["income_amount"] ?? r["totrevenue"] ?? 0),
    revenueAmount: Number(r["revenue_amount"] ?? 0),
  };
}

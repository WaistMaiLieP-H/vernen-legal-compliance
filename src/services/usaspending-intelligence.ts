/**
 * USAspending Intelligence Service — Federal Spending Pipeline
 *
 * Connects to the USAspending.gov API to identify entities with
 * high-value federal contracts and grants that trigger compliance
 * obligations: Single Audit, CMMC, FAR clauses, 8(a) oversight.
 *
 * USAspending.gov is free, no API key required.
 */

import type { Env } from "../index.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface USASpendingAward {
  award_id: string;
  recipient_name: string;
  recipient_uei: string;
  recipient_state: string;
  award_amount: number;
  award_type: string; // contract, grant, loan, direct_payment, other
  agency_name: string;
  cfda_number: string;
  naics_code: string;
  start_date: string;
  end_date: string;
  description: string;
  is_sole_source: boolean;
  set_aside_type: string;
}

export interface USASpendingRecipient {
  name: string;
  uei: string;
  ein: string;
  state: string;
  city: string;
  business_types: string[];
  total_awards: number;
  total_amount: number;
}

export interface SpendingComplianceLead {
  award: USASpendingAward;
  recipient: USASpendingRecipient | null;
  riskScore: number; // 0-100
  riskCategories: string[];
  triggeredObligations: string[];
  recommendedServices: string[];
  estimatedRemediation: string;
}

export interface SpendingSearchFilters {
  award_type?: string; // contract, grant, loan
  min_amount?: number;
  max_amount?: number;
  state?: string;
  naics?: string;
  agency?: string;
  set_aside_type?: string;
  start_date?: string;
  end_date?: string;
  limit?: number;
  offset?: number;
}

export interface SpendingPipelineResult {
  leads: SpendingComplianceLead[];
  totalMatched: number;
  filters: SpendingSearchFilters;
  generatedAt: string;
  source: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// Constants
// ═══════════════════════════════════════════════════════════════════════════

const USA_SPENDING_BASE = "https://api.usaspending.gov/api/v2";
const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 100;

/** Award type codes per USAspending API */
const AWARD_TYPE_MAP: Record<string, string[]> = {
  contract: ["A", "B", "C", "D"],
  grant: ["02", "03", "04", "05"],
  loan: ["07", "08"],
  direct_payment: ["06", "10"],
  other: ["09", "11"],
};

/** NAICS codes with elevated compliance risk */
const HIGH_RISK_NAICS: Set<string> = new Set([
  "541511", // Custom Computer Programming
  "541512", // Computer Systems Design
  "541519", // Other Computer Related Services
  "541330", // Engineering Services
  "541715", // R&D Physical/Engineering/Life Sciences
  "561210", // Facilities Support Services
  "236220", // Commercial Building Construction
  "237310", // Highway/Street/Bridge Construction
  "238220", // Plumbing/HVAC
  "562910", // Environmental Remediation
]);

/** Agencies under active OIG scrutiny or DoD line-by-line audit mandate */
const OIG_SCRUTINY_AGENCIES: Set<string> = new Set([
  "Department of Defense",
  "Department of Health and Human Services",
  "Department of Homeland Security",
  "Department of Veterans Affairs",
  "Department of Education",
  "Environmental Protection Agency",
  "Small Business Administration",
]);

// ═══════════════════════════════════════════════════════════════════════════
// USASpending API Client
// ═══════════════════════════════════════════════════════════════════════════

export class USASpendingIntelligenceService {
  /**
   * Core POST request to USAspending search endpoints
   */
  private async usaSpendingPost<T>(
    endpoint: string,
    body: Record<string, unknown>
  ): Promise<T> {
    const url = `${USA_SPENDING_BASE}${endpoint}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.status === 429) {
      throw new USASpendingApiError(429, "Rate limit exceeded");
    }

    if (!response.ok) {
      throw new USASpendingApiError(response.status, await response.text());
    }

    return response.json() as Promise<T>;
  }

  /**
   * Core GET request to USAspending endpoints
   */
  private async usaSpendingGet<T>(
    endpoint: string,
    params: Record<string, string> = {}
  ): Promise<T> {
    const url = new URL(`${USA_SPENDING_BASE}${endpoint}`);
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }

    const response = await fetch(url.toString(), {
      headers: { "Accept": "application/json" },
    });

    if (response.status === 429) {
      throw new USASpendingApiError(429, "Rate limit exceeded");
    }

    if (!response.ok) {
      throw new USASpendingApiError(response.status, await response.text());
    }

    return response.json() as Promise<T>;
  }

  // ─── Discovery Queries ──────────────────────────────────────────────

  /**
   * Find high-value awards, especially 8(a) sole source contracts
   * over $20M that are high-risk for DoD line-by-line audit.
   */
  async searchHighValueAwards(
    filters: SpendingSearchFilters = {}
  ): Promise<USASpendingAward[]> {
    const limit = Math.min(filters.limit ?? DEFAULT_LIMIT, MAX_LIMIT);
    const minAmount = filters.min_amount ?? 20_000_000; // Default $20M

    const awardTypeCodes = filters.award_type
      ? AWARD_TYPE_MAP[filters.award_type] ?? ["A", "B", "C", "D"]
      : ["A", "B", "C", "D"]; // Default to contracts

    const requestFilters: Record<string, unknown> = {
      award_type_codes: awardTypeCodes,
      award_amounts: [{ lower_bound: minAmount }],
    };

    if (filters.max_amount) {
      requestFilters["award_amounts"] = [
        { lower_bound: minAmount, upper_bound: filters.max_amount },
      ];
    }

    if (filters.state) {
      requestFilters["place_of_performance_locations"] = [
        { country: "USA", state: filters.state.toUpperCase() },
      ];
    }

    if (filters.naics) {
      requestFilters["naics_codes"] = { require: [filters.naics] };
    }

    if (filters.agency) {
      requestFilters["agencies"] = [
        { type: "funding", tier: "toptier", name: filters.agency },
      ];
    }

    if (filters.set_aside_type) {
      requestFilters["set_aside_type_codes"] = [filters.set_aside_type];
    }

    if (filters.start_date || filters.end_date) {
      requestFilters["time_period"] = [
        {
          start_date: filters.start_date ?? "2020-01-01",
          end_date: filters.end_date ?? new Date().toISOString().split("T")[0],
        },
      ];
    }

    const body = {
      filters: requestFilters,
      fields: [
        "Award ID",
        "Recipient Name",
        "Recipient UEI",
        "Place of Performance State Code",
        "Award Amount",
        "Award Type",
        "Awarding Agency",
        "CFDA Number",
        "NAICS Code",
        "Start Date",
        "End Date",
        "Description",
        "Type of Set Aside",
      ],
      page: Math.floor((filters.offset ?? 0) / limit) + 1,
      limit,
      sort: "Award Amount",
      order: "desc",
    };

    const result = await this.usaSpendingPost<SpendingByAwardResponse>(
      "/search/spending_by_award/",
      body
    );

    return (result.results ?? []).map(mapToUSASpendingAward);
  }

  /**
   * Find recipients of new grants likely triggering Single Audit
   * ($750K+ federal spend threshold).
   */
  async searchNewGrantRecipients(
    filters: SpendingSearchFilters = {}
  ): Promise<USASpendingAward[]> {
    const limit = Math.min(filters.limit ?? DEFAULT_LIMIT, MAX_LIMIT);
    const minAmount = filters.min_amount ?? 750_000; // Single Audit threshold

    const currentYear = new Date().getFullYear();
    const startDate = filters.start_date ?? `${currentYear - 1}-01-01`;
    const endDate =
      filters.end_date ?? new Date().toISOString().split("T")[0];

    const requestFilters: Record<string, unknown> = {
      award_type_codes: ["02", "03", "04", "05"], // Grants
      award_amounts: [{ lower_bound: minAmount }],
      time_period: [{ start_date: startDate, end_date: endDate }],
    };

    if (filters.state) {
      requestFilters["place_of_performance_locations"] = [
        { country: "USA", state: filters.state.toUpperCase() },
      ];
    }

    if (filters.agency) {
      requestFilters["agencies"] = [
        { type: "funding", tier: "toptier", name: filters.agency },
      ];
    }

    const body = {
      filters: requestFilters,
      fields: [
        "Award ID",
        "Recipient Name",
        "Recipient UEI",
        "Place of Performance State Code",
        "Award Amount",
        "Award Type",
        "Awarding Agency",
        "CFDA Number",
        "NAICS Code",
        "Start Date",
        "End Date",
        "Description",
        "Type of Set Aside",
      ],
      page: Math.floor((filters.offset ?? 0) / limit) + 1,
      limit,
      sort: "Award Amount",
      order: "desc",
    };

    const result = await this.usaSpendingPost<SpendingByAwardResponse>(
      "/search/spending_by_award/",
      body
    );

    return (result.results ?? []).map(mapToUSASpendingAward);
  }

  /**
   * Get full recipient profile by UEI
   */
  async getRecipientDetail(uei: string): Promise<USASpendingRecipient | null> {
    try {
      // Search for the recipient by keyword (UEI)
      const searchResult = await this.usaSpendingPost<RecipientSearchResponse>(
        "/recipient/",
        {
          keyword: uei,
          order: "desc",
          sort: "amount",
          page: 1,
          limit: 1,
        }
      );

      if (!searchResult.results || searchResult.results.length === 0) {
        return null;
      }

      const r = searchResult.results[0]!;
      return {
        name: String(r["name"] ?? ""),
        uei: String(r["uei"] ?? uei),
        ein: String(r["ein"] ?? ""),
        state: String(r["state"] ?? ""),
        city: String(r["city"] ?? ""),
        business_types: Array.isArray(r["business_types"])
          ? (r["business_types"] as string[])
          : [],
        total_awards: Number(r["total_awards"] ?? 0),
        total_amount: Number(r["total_amount"] ?? 0),
      };
    } catch {
      return null;
    }
  }

  /**
   * Find all awards under a specific agency
   */
  async searchByAgency(
    agencyName: string,
    filters: SpendingSearchFilters = {}
  ): Promise<USASpendingAward[]> {
    const limit = Math.min(filters.limit ?? DEFAULT_LIMIT, MAX_LIMIT);

    const requestFilters: Record<string, unknown> = {
      award_type_codes: [
        ...(AWARD_TYPE_MAP["contract"] ?? []),
        ...(AWARD_TYPE_MAP["grant"] ?? []),
      ],
      agencies: [{ type: "funding", tier: "toptier", name: agencyName }],
      award_amounts: [{ lower_bound: filters.min_amount ?? 1_000_000 }],
    };

    if (filters.start_date || filters.end_date) {
      requestFilters["time_period"] = [
        {
          start_date:
            filters.start_date ??
            `${new Date().getFullYear() - 1}-01-01`,
          end_date:
            filters.end_date ?? new Date().toISOString().split("T")[0],
        },
      ];
    }

    const body = {
      filters: requestFilters,
      fields: [
        "Award ID",
        "Recipient Name",
        "Recipient UEI",
        "Place of Performance State Code",
        "Award Amount",
        "Award Type",
        "Awarding Agency",
        "CFDA Number",
        "NAICS Code",
        "Start Date",
        "End Date",
        "Description",
        "Type of Set Aside",
      ],
      page: Math.floor((filters.offset ?? 0) / limit) + 1,
      limit,
      sort: "Award Amount",
      order: "desc",
    };

    const result = await this.usaSpendingPost<SpendingByAwardResponse>(
      "/search/spending_by_award/",
      body
    );

    return (result.results ?? []).map(mapToUSASpendingAward);
  }

  // ─── Risk Scoring ───────────────────────────────────────────────────

  /**
   * Score compliance risk 0-100 based on award and recipient factors.
   */
  scoreComplianceRisk(
    award: USASpendingAward,
    recipient: USASpendingRecipient | null
  ): {
    score: number;
    categories: string[];
    obligations: string[];
    services: string[];
  } {
    let score = 0;
    const categories: string[] = [];
    const obligations: string[] = [];
    const services: string[] = [];

    // Award size scoring (larger = higher risk)
    if (award.award_amount >= 100_000_000) {
      score += 25;
      categories.push("Mega Award ($100M+)");
      obligations.push("Enhanced oversight under FAR 42.302");
      services.push("Federal Contract Compliance Program");
    } else if (award.award_amount >= 50_000_000) {
      score += 20;
      categories.push("Major Award ($50M+)");
      obligations.push("DCAA audit readiness");
      services.push("Defense Contract Audit Preparation");
    } else if (award.award_amount >= 20_000_000) {
      score += 15;
      categories.push("High-Value Award ($20M+)");
      obligations.push("Cost accounting standards compliance");
      services.push("Cost Accounting Standards Review");
    }

    // 8(a) Sole Source — highest risk category
    if (award.is_sole_source) {
      score += 20;
      categories.push("Sole Source Award");
      obligations.push("SBA 8(a) sole source justification required");
      obligations.push("DoD line-by-line audit target");
      services.push("8(a) Sole Source Compliance Audit");
    }

    // Set-aside type risk
    if (award.set_aside_type) {
      const setAside = award.set_aside_type.toUpperCase();
      if (setAside.includes("8(A)") || setAside.includes("8A")) {
        score += 10;
        categories.push("8(a) Set-Aside");
        obligations.push("SBA 8(a) program compliance requirements");
        services.push("Small Business Set-Aside Compliance Review");
      } else if (
        setAside.includes("SDVOSB") ||
        setAside.includes("WOSB") ||
        setAside.includes("HUBZONE")
      ) {
        score += 5;
        categories.push(`Set-Aside: ${sanitize(award.set_aside_type)}`);
        obligations.push("Set-aside eligibility verification");
        services.push("Set-Aside Status Compliance Verification");
      }
    }

    // Agency under OIG scrutiny
    if (OIG_SCRUTINY_AGENCIES.has(award.agency_name)) {
      score += 10;
      categories.push("Agency Under OIG Scrutiny");
      obligations.push("Heightened audit probability");
      services.push("Pre-Audit Compliance Readiness Assessment");
    }

    // NAICS risk factor
    if (HIGH_RISK_NAICS.has(award.naics_code)) {
      score += 5;
      categories.push("High-Risk NAICS Sector");
      obligations.push("Industry-specific compliance requirements");
      services.push("Industry Compliance Gap Analysis");
    }

    // New/small recipient with large award
    if (recipient) {
      if (recipient.total_awards <= 3 && award.award_amount >= 5_000_000) {
        score += 15;
        categories.push("New Recipient with Large Award");
        obligations.push("Single Audit (2 CFR 200 Subpart F)");
        obligations.push("Federal grant compliance infrastructure required");
        services.push("New Recipient Compliance Onboarding");
      }
    }

    // Grant-specific: Single Audit threshold
    if (
      award.award_type === "grant" &&
      award.award_amount >= 750_000
    ) {
      score += 10;
      categories.push("Single Audit Threshold Triggered");
      obligations.push("Single Audit required (2 CFR 200.501)");
      obligations.push("Audit filing with Federal Audit Clearinghouse");
      services.push("Single Audit Preparation & Filing Support");
    }

    // Contract-specific: CMMC for DoD
    if (
      award.award_type === "contract" &&
      award.agency_name.includes("Defense")
    ) {
      score += 10;
      categories.push("DoD Contract — CMMC Required");
      obligations.push("CMMC Level 2+ certification");
      obligations.push("NIST SP 800-171 compliance");
      obligations.push("DFARS 252.204-7012 safeguarding CUI");
      services.push("CMMC Readiness Assessment");
    }

    // Cap at 100
    score = Math.min(score, 100);

    return {
      score,
      categories,
      obligations: [...new Set(obligations)],
      services: [...new Set(services)],
    };
  }

  // ─── Full Intelligence Pipeline ─────────────────────────────────────

  /**
   * Run the full discovery, scoring, and storage pipeline.
   */
  async runPipeline(
    filters: SpendingSearchFilters = {}
  ): Promise<SpendingPipelineResult> {
    // Step 1: Discover high-value awards
    const awards = await this.searchHighValueAwards(filters);

    // Step 2: Score each award and optionally enrich with recipient data
    const enrichmentLimit = Math.min(awards.length, 25);
    const leads: SpendingComplianceLead[] = [];

    for (let i = 0; i < enrichmentLimit; i++) {
      const award = awards[i]!;

      // Attempt recipient enrichment (non-blocking)
      let recipient: USASpendingRecipient | null = null;
      if (award.recipient_uei) {
        recipient = await this.getRecipientDetail(award.recipient_uei);
      }

      const risk = this.scoreComplianceRisk(award, recipient);

      let estimatedRemediation: string;
      if (risk.score >= 80) {
        estimatedRemediation =
          "6-12 months comprehensive compliance program";
      } else if (risk.score >= 50) {
        estimatedRemediation = "3-6 months targeted compliance review";
      } else if (risk.score >= 25) {
        estimatedRemediation = "1-3 months focused assessment";
      } else {
        estimatedRemediation = "< 1 month standard compliance check";
      }

      leads.push({
        award,
        recipient,
        riskScore: risk.score,
        riskCategories: risk.categories,
        triggeredObligations: risk.obligations,
        recommendedServices: risk.services,
        estimatedRemediation,
      });
    }

    // Sort by risk score descending
    leads.sort((a, b) => b.riskScore - a.riskScore);

    return {
      leads,
      totalMatched: awards.length,
      filters,
      generatedAt: new Date().toISOString(),
      source: "USAspending.gov (federal spending data)",
    };
  }

  // ─── Agency Summary ────────────────────────────────────────────────

  /**
   * Get a summary of which agencies are spending the most through
   * high-risk channels (sole source, set-asides, large contracts).
   */
  async getAgencySummary(): Promise<AgencySummaryEntry[]> {
    const body = {
      category: "awarding_agency",
      filters: {
        award_type_codes: ["A", "B", "C", "D"],
        award_amounts: [{ lower_bound: 20_000_000 }],
        time_period: [
          {
            start_date: `${new Date().getFullYear() - 1}-01-01`,
            end_date: new Date().toISOString().split("T")[0],
          },
        ],
      },
      limit: 20,
      page: 1,
    };

    const result = await this.usaSpendingPost<SpendingByCategoryResponse>(
      "/search/spending_by_category/",
      body
    );

    return (result.results ?? []).map((r) => ({
      agency: String(r["name"] ?? "Unknown"),
      total_amount: Number(r["amount"] ?? 0),
      award_count: Number(r["count"] ?? 0),
      under_oig_scrutiny: OIG_SCRUTINY_AGENCIES.has(
        String(r["name"] ?? "")
      ),
    }));
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// API Response Types (internal)
// ═══════════════════════════════════════════════════════════════════════════

interface SpendingByAwardResponse {
  results?: Record<string, unknown>[];
  page_metadata?: { total?: number; page?: number; hasNext?: boolean };
}

interface SpendingByCategoryResponse {
  results?: Record<string, unknown>[];
  page_metadata?: { total?: number };
}

interface RecipientSearchResponse {
  results?: Record<string, unknown>[];
  page_metadata?: { total?: number };
}

export interface AgencySummaryEntry {
  agency: string;
  total_amount: number;
  award_count: number;
  under_oig_scrutiny: boolean;
}

// ═══════════════════════════════════════════════════════════════════════════
// Data Mappers
// ═══════════════════════════════════════════════════════════════════════════

function mapToUSASpendingAward(
  r: Record<string, unknown>
): USASpendingAward {
  const awardType = String(r["Award Type"] ?? r["award_type"] ?? "");
  const setAside = String(
    r["Type of Set Aside"] ?? r["type_of_set_aside"] ?? ""
  );

  // Determine if sole source from set-aside or description
  const isSoleSource =
    setAside.toUpperCase().includes("SOLE SOURCE") ||
    setAside.toUpperCase().includes("SS") ||
    String(r["Description"] ?? "")
      .toUpperCase()
      .includes("SOLE SOURCE");

  // Normalize award type
  let normalizedType = "other";
  const rawType = awardType.toUpperCase();
  if (
    rawType.includes("CONTRACT") ||
    rawType === "A" ||
    rawType === "B" ||
    rawType === "C" ||
    rawType === "D"
  ) {
    normalizedType = "contract";
  } else if (rawType.includes("GRANT")) {
    normalizedType = "grant";
  } else if (rawType.includes("LOAN")) {
    normalizedType = "loan";
  } else if (rawType.includes("DIRECT")) {
    normalizedType = "direct_payment";
  }

  return {
    award_id: String(
      r["Award ID"] ?? r["award_id"] ?? r["generated_internal_id"] ?? ""
    ),
    recipient_name: String(
      r["Recipient Name"] ?? r["recipient_name"] ?? ""
    ),
    recipient_uei: String(r["Recipient UEI"] ?? r["recipient_uei"] ?? ""),
    recipient_state: String(
      r["Place of Performance State Code"] ??
        r["recipient_state"] ??
        ""
    ),
    award_amount: Number(
      r["Award Amount"] ?? r["award_amount"] ?? r["total_obligation"] ?? 0
    ),
    award_type: normalizedType,
    agency_name: String(
      r["Awarding Agency"] ?? r["awarding_agency_name"] ?? ""
    ),
    cfda_number: String(
      r["CFDA Number"] ?? r["cfda_number"] ?? ""
    ),
    naics_code: String(r["NAICS Code"] ?? r["naics_code"] ?? ""),
    start_date: String(
      r["Start Date"] ?? r["period_of_performance_start_date"] ?? ""
    ),
    end_date: String(
      r["End Date"] ?? r["period_of_performance_current_end_date"] ?? ""
    ),
    description: String(r["Description"] ?? r["description"] ?? ""),
    is_sole_source: isSoleSource,
    set_aside_type: setAside,
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// Compliance Gap Report Generator
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Generate a branded HTML report for a spending compliance lead.
 * Shows award details, recipient profile, risk score,
 * triggered obligations, and recommended services.
 */
export function generateSpendingGapReportHTML(
  lead: SpendingComplianceLead
): string {
  const { award, recipient, riskScore, riskCategories, triggeredObligations, recommendedServices, estimatedRemediation } = lead;

  const scoreColor =
    riskScore >= 70 ? "#dc2626" : riskScore >= 40 ? "#d97706" : "#16a34a";
  const scoreLabel =
    riskScore >= 70 ? "CRITICAL" : riskScore >= 40 ? "ELEVATED" : "MODERATE";

  const categoriesHTML = riskCategories
    .map((c) => `<span class="gap-tag">${sanitize(c)}</span>`)
    .join(" ");

  const obligationsHTML = triggeredObligations
    .map((o) => `<li>${sanitize(o)}</li>`)
    .join("");

  const servicesHTML = recommendedServices
    .map((s) => `<li>${sanitize(s)}</li>`)
    .join("");

  const awardTypeLabel =
    award.award_type === "contract"
      ? "Federal Contract"
      : award.award_type === "grant"
        ? "Federal Grant"
        : award.award_type === "loan"
          ? "Federal Loan"
          : "Federal Award";

  const recipientSection = recipient
    ? `
    <div class="entity-card">
      <div>
        <div class="label">Recipient</div>
        <div class="value">${sanitize(recipient.name)}</div>
        <div class="label">Location</div>
        <div class="value">${sanitize(recipient.city)}${recipient.city && recipient.state ? ", " : ""}${sanitize(recipient.state)}</div>
        <div class="label">UEI</div>
        <div class="value">${sanitize(recipient.uei)}</div>
      </div>
      <div>
        <div class="label">EIN</div>
        <div class="value">${sanitize(recipient.ein || "Not disclosed")}</div>
        <div class="label">Total Federal Awards</div>
        <div class="value">${recipient.total_awards}</div>
        <div class="label">Total Federal Amount</div>
        <div class="value" style="font-family:monospace;">$${recipient.total_amount.toLocaleString()}</div>
      </div>
    </div>`
    : `
    <div class="entity-card">
      <div>
        <div class="label">Recipient</div>
        <div class="value">${sanitize(award.recipient_name)}</div>
        <div class="label">State</div>
        <div class="value">${sanitize(award.recipient_state)}</div>
      </div>
      <div>
        <div class="label">UEI</div>
        <div class="value">${sanitize(award.recipient_uei || "Not available")}</div>
      </div>
    </div>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Federal Spending Compliance Report — ${sanitize(award.recipient_name)}</title>
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
  .award-card { background: var(--slate); border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem; border-left: 4px solid var(--gold); }
  .award-card .award-type { color: var(--gold); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem; }
  .award-card .award-amount { font-size: 2rem; font-family: monospace; font-weight: bold; color: var(--text); }
  .award-card .award-detail { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-top: 1rem; }
  .award-card .label { color: var(--muted); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; }
  .award-card .value { font-size: 0.95rem; }
  .score-section { text-align: center; background: var(--slate); border-radius: 8px; padding: 2rem; margin-bottom: 1.5rem; }
  .score-circle { width: 120px; height: 120px; border-radius: 50%; border: 6px solid ${scoreColor}; display: inline-flex; align-items: center; justify-content: center; flex-direction: column; }
  .score-number { font-size: 2rem; font-weight: bold; color: ${scoreColor}; }
  .score-label { font-size: 0.75rem; color: ${scoreColor}; letter-spacing: 2px; text-transform: uppercase; }
  .section { margin-bottom: 2rem; }
  .section h2 { color: var(--gold); font-size: 1.2rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(200,169,81,0.3); }
  .gap-tag { display: inline-block; background: rgba(220,38,38,0.15); color: #fca5a5; padding: 4px 12px; border-radius: 16px; font-size: 0.85rem; margin: 4px; }
  .obligations { background: var(--slate); border-radius: 8px; padding: 1.5rem; border-left: 4px solid #dc2626; margin-bottom: 1.5rem; }
  .obligations h3 { color: #fca5a5; font-size: 1rem; margin-bottom: 0.75rem; }
  .obligations ul { padding-left: 1.5rem; }
  .obligations li { margin-bottom: 0.5rem; color: var(--text); }
  .recommendations { background: var(--slate); border-radius: 8px; padding: 1.5rem; border-left: 4px solid var(--gold); }
  .recommendations ul { padding-left: 1.5rem; }
  .recommendations li { margin-bottom: 0.5rem; }
  .sole-source-flag { background: rgba(220,38,38,0.2); border: 1px solid rgba(220,38,38,0.4); border-radius: 6px; padding: 1rem; margin-bottom: 1.5rem; text-align: center; }
  .sole-source-flag .flag-label { color: #fca5a5; font-weight: bold; font-size: 1.1rem; letter-spacing: 1px; }
  .sole-source-flag .flag-detail { color: var(--muted); font-size: 0.9rem; margin-top: 0.5rem; }
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
    <div class="subtitle">Federal Spending Compliance Risk Report</div>
  </div>

  ${award.is_sole_source ? `
  <div class="sole-source-flag">
    <div class="flag-label">SOLE SOURCE AWARD DETECTED</div>
    <div class="flag-detail">This award was issued without full and open competition — subject to heightened audit scrutiny under DoD line-by-line review mandate.</div>
  </div>` : ""}

  <div class="award-card">
    <div class="award-type">${sanitize(awardTypeLabel)}</div>
    <div class="award-amount">$${award.award_amount.toLocaleString()}</div>
    <div class="award-detail">
      <div>
        <div class="label">Award ID</div>
        <div class="value">${sanitize(award.award_id)}</div>
        <div class="label">Agency</div>
        <div class="value">${sanitize(award.agency_name)}</div>
        <div class="label">NAICS</div>
        <div class="value">${sanitize(award.naics_code || "N/A")}</div>
      </div>
      <div>
        <div class="label">Period</div>
        <div class="value">${sanitize(award.start_date || "N/A")} to ${sanitize(award.end_date || "N/A")}</div>
        <div class="label">Set-Aside</div>
        <div class="value">${sanitize(award.set_aside_type || "None")}</div>
        <div class="label">CFDA</div>
        <div class="value">${sanitize(award.cfda_number || "N/A")}</div>
      </div>
    </div>
  </div>

  ${recipientSection}

  <div class="score-section">
    <div class="score-circle">
      <div class="score-number">${riskScore}</div>
      <div class="score-label">${scoreLabel}</div>
    </div>
    <p style="margin-top:1rem; color: var(--muted);">Compliance Risk Score — higher indicates greater obligation urgency</p>
    <div style="margin-top:1rem;">${categoriesHTML}</div>
  </div>

  ${triggeredObligations.length > 0 ? `
  <div class="section">
    <h2>Triggered Compliance Obligations</h2>
    <div class="obligations">
      <h3>This award triggers the following federal compliance requirements:</h3>
      <ul>${obligationsHTML}</ul>
    </div>
  </div>` : ""}

  <div class="section">
    <h2>Recommended Compliance Services</h2>
    <div class="recommendations">
      <ul>${servicesHTML}</ul>
      <p style="margin-top: 1rem; color: var(--muted);">Estimated timeline: <strong style="color: var(--text);">${sanitize(estimatedRemediation)}</strong></p>
    </div>
  </div>

  <div class="cta">
    <p style="margin-bottom: 1rem; font-size: 1.1rem;">Federal compliance obligations are legally mandated — not optional.</p>
    <a href="https://compliance.vernenlegal.com/api/regulis/check">Start Your Compliance Review</a>
    <p style="margin-top: 1rem; color: var(--muted);">Powered by 745+ compliance rules across all 50 states</p>
  </div>

  <div class="footer">
    <p>Generated by Vernen Legal Compliance — ${new Date().toISOString().split("T")[0]}</p>
    <p>Data source: USAspending.gov — Public record</p>
    <p class="disclaimer">This report is generated from publicly available federal spending data and is provided for informational purposes only. It does not constitute legal advice, an audit opinion, or a professional engagement. Consult qualified professionals for compliance remediation.</p>
  </div>

</div>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// D1 Storage — Cache spending leads locally
// ═══════════════════════════════════════════════════════════════════════════

export async function ensureSpendingTables(db: D1Database): Promise<void> {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS spending_leads (
      award_id TEXT PRIMARY KEY,
      recipient_name TEXT NOT NULL,
      recipient_uei TEXT,
      recipient_state TEXT,
      award_amount INTEGER DEFAULT 0,
      award_type TEXT,
      agency_name TEXT,
      naics_code TEXT,
      cfda_number TEXT,
      is_sole_source INTEGER DEFAULT 0,
      set_aside_type TEXT,
      risk_score INTEGER DEFAULT 0,
      risk_categories TEXT DEFAULT '[]',
      triggered_obligations TEXT DEFAULT '[]',
      recommended_services TEXT DEFAULT '[]',
      description TEXT,
      start_date TEXT,
      end_date TEXT,
      status TEXT DEFAULT 'new',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_spending_leads_state ON spending_leads(recipient_state);
    CREATE INDEX IF NOT EXISTS idx_spending_leads_score ON spending_leads(risk_score DESC);
    CREATE INDEX IF NOT EXISTS idx_spending_leads_type ON spending_leads(award_type);
    CREATE INDEX IF NOT EXISTS idx_spending_leads_status ON spending_leads(status);
    CREATE INDEX IF NOT EXISTS idx_spending_leads_agency ON spending_leads(agency_name);
  `);
}

export async function storeSpendingLead(
  db: D1Database,
  lead: SpendingComplianceLead
): Promise<void> {
  await db
    .prepare(
      `
    INSERT OR REPLACE INTO spending_leads
    (award_id, recipient_name, recipient_uei, recipient_state,
     award_amount, award_type, agency_name, naics_code, cfda_number,
     is_sole_source, set_aside_type, risk_score, risk_categories,
     triggered_obligations, recommended_services, description,
     start_date, end_date, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
  `
    )
    .bind(
      lead.award.award_id,
      lead.award.recipient_name,
      lead.award.recipient_uei,
      lead.award.recipient_state,
      lead.award.award_amount,
      lead.award.award_type,
      lead.award.agency_name,
      lead.award.naics_code,
      lead.award.cfda_number,
      lead.award.is_sole_source ? 1 : 0,
      lead.award.set_aside_type,
      lead.riskScore,
      JSON.stringify(lead.riskCategories),
      JSON.stringify(lead.triggeredObligations),
      JSON.stringify(lead.recommendedServices),
      lead.award.description,
      lead.award.start_date,
      lead.award.end_date
    )
    .run();
}

export async function getStoredSpendingLeads(
  db: D1Database,
  filters: {
    state?: string;
    minScore?: number;
    award_type?: string;
    agency?: string;
    status?: string;
    limit?: number;
  }
): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM spending_leads WHERE 1=1";
  const binds: unknown[] = [];

  if (filters.state) {
    query += " AND recipient_state = ?";
    binds.push(filters.state.toUpperCase());
  }
  if (filters.minScore) {
    query += " AND risk_score >= ?";
    binds.push(filters.minScore);
  }
  if (filters.award_type) {
    query += " AND award_type = ?";
    binds.push(filters.award_type);
  }
  if (filters.agency) {
    query += " AND agency_name LIKE ?";
    binds.push(`%${filters.agency}%`);
  }
  if (filters.status) {
    query += " AND status = ?";
    binds.push(filters.status);
  }

  query += " ORDER BY risk_score DESC LIMIT ?";
  binds.push(filters.limit ?? 50);

  const result = await db.prepare(query).bind(...binds).all();
  return result.results as Record<string, unknown>[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Errors
// ═══════════════════════════════════════════════════════════════════════════

export class USASpendingApiError extends Error {
  constructor(
    public status: number,
    public body: string
  ) {
    super(`USAspending API error ${status}: ${body}`);
    this.name = "USASpendingApiError";
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

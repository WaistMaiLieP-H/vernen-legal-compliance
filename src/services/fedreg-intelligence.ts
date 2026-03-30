/**
 * Federal Register Intelligence Service — Regulatory Change Monitoring
 *
 * Connects to the Federal Register API (federalregister.gov) to identify
 * regulatory changes that force businesses to re-certify or update compliance:
 * FAR Rewrite, CMMC 2.0, SOC 2, HIPAA, SOX, AML, and more.
 *
 * These are not hypothetical risks — they are published regulatory actions
 * with legally binding effective dates.
 */

import type { Env } from "../index.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface FedRegAgency {
  name: string;
  slug: string;
}

export interface FedRegDocument {
  documentNumber: string;
  title: string;
  type: "RULE" | "PRORULE" | "NOTICE" | "PRESDOCU";
  abstract: string;
  agencies: FedRegAgency[];
  publicationDate: string;
  effectiveDate: string;
  htmlUrl: string;
  pdfUrl: string;
  pageLength: number;
  cfrReferences: string[];
  docketIds: string[];
  significant: boolean;
}

export interface RegulatoryChangeAlert {
  document: FedRegDocument;
  impactScore: number; // 0-100
  affectedIndustries: string[];
  affectedSectors: string[];
  complianceKeywords: string[];
  urgencyLevel: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  affectedRulesEstimate: number;
  recommendedActions: string[];
  generatedAt: string;
}

export interface FedRegSearchFilters {
  term?: string;
  type?: string[];
  agency?: string;
  startDate?: string;
  endDate?: string;
  significantOnly?: boolean;
  limit?: number;
  offset?: number;
}

export interface FedRegPipelineResult {
  alerts: RegulatoryChangeAlert[];
  totalDocuments: number;
  filters: FedRegSearchFilters;
  generatedAt: string;
  source: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// Federal Register API Client
// ═══════════════════════════════════════════════════════════════════════════

const FEDREG_API_BASE = "https://www.federalregister.gov/api/v1";
const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 200;

/** High-severity compliance keywords and their scoring weight */
const COMPLIANCE_KEYWORDS: Record<string, number> = {
  "FAR": 25,
  "Federal Acquisition Regulation": 25,
  "CMMC": 25,
  "Cybersecurity Maturity Model": 25,
  "HIPAA": 20,
  "Health Insurance Portability": 20,
  "SOC 2": 20,
  "SOC 1": 15,
  "SOX": 20,
  "Sarbanes-Oxley": 20,
  "AML": 18,
  "Anti-Money Laundering": 18,
  "Bank Secrecy Act": 18,
  "NIST": 15,
  "FedRAMP": 20,
  "ITAR": 20,
  "EAR": 15,
  "Export Administration": 15,
  "OFAC": 18,
  "FISMA": 18,
  "PCI DSS": 15,
  "GDPR": 12,
  "privacy": 10,
  "cybersecurity": 15,
  "data breach": 18,
  "compliance": 8,
  "certification": 10,
  "recertification": 15,
  "debarment": 20,
  "suspension": 18,
  "small business": 10,
  "contractor": 12,
  "subcontractor": 10,
  "audit": 8,
};

/** Industry mapping based on agency slug and keywords */
const AGENCY_INDUSTRY_MAP: Record<string, string[]> = {
  "defense-department": ["Defense Contracting", "Government Contracting"],
  "general-services-administration": ["Government Contracting", "Federal Services"],
  "health-and-human-services-department": ["Healthcare", "Health Insurance"],
  "securities-and-exchange-commission": ["Financial Services", "Capital Markets"],
  "environmental-protection-agency": ["Environmental Services", "Manufacturing"],
  "small-business-administration": ["Small Business", "Government Contracting"],
  "treasury-department": ["Financial Services", "Banking"],
  "federal-trade-commission": ["Consumer Products", "Technology", "Privacy"],
  "labor-department": ["Employment", "Labor Relations"],
  "commerce-department": ["Trade", "Technology", "Export"],
  "homeland-security-department": ["Cybersecurity", "Immigration", "Critical Infrastructure"],
  "energy-department": ["Energy", "Nuclear"],
  "transportation-department": ["Transportation", "Logistics"],
  "education-department": ["Education", "Higher Education"],
  "housing-and-urban-development-department": ["Real Estate", "Housing Finance"],
  "veterans-affairs-department": ["Healthcare", "Veterans Services"],
  "justice-department": ["Legal Services", "Law Enforcement"],
  "interior-department": ["Natural Resources", "Mining"],
  "agriculture-department": ["Agriculture", "Food Safety"],
  "state-department": ["International Trade", "Foreign Affairs"],
};

const KEYWORD_INDUSTRY_MAP: Record<string, string[]> = {
  "FAR": ["Government Contracting", "Defense Contracting"],
  "Federal Acquisition Regulation": ["Government Contracting", "Defense Contracting"],
  "CMMC": ["Defense Contracting", "Cybersecurity"],
  "HIPAA": ["Healthcare", "Health Insurance", "Health IT"],
  "SOC": ["Technology", "Cloud Services", "SaaS"],
  "SOX": ["Public Companies", "Financial Services", "Accounting"],
  "AML": ["Banking", "Financial Services", "Cryptocurrency"],
  "Bank Secrecy Act": ["Banking", "Financial Services"],
  "FedRAMP": ["Cloud Services", "Government IT"],
  "ITAR": ["Defense Contracting", "Aerospace", "Export"],
  "EAR": ["Technology", "Export", "Manufacturing"],
  "NIST": ["Technology", "Cybersecurity", "Government IT"],
  "cybersecurity": ["Technology", "All Industries"],
  "privacy": ["Technology", "Healthcare", "Financial Services"],
  "data breach": ["Technology", "Healthcare", "Financial Services"],
  "small business": ["Small Business", "Government Contracting"],
};

export class FedRegIntelligenceService {
  /**
   * Core API request handler
   */
  private async fedRegRequest(
    endpoint: string,
    params: Record<string, string> = {}
  ): Promise<Record<string, unknown>> {
    const url = new URL(`${FEDREG_API_BASE}${endpoint}`);
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }

    const response = await fetch(url.toString(), {
      headers: { "Accept": "application/json" },
    });

    if (!response.ok) {
      throw new FedRegApiError(response.status, await response.text());
    }

    return response.json() as Promise<Record<string, unknown>>;
  }

  // ─── Discovery Queries ──────────────────────────────────────────────

  /**
   * Search Federal Register documents with flexible filters.
   */
  async searchRegulations(
    filters: FedRegSearchFilters = {}
  ): Promise<FedRegDocument[]> {
    const limit = Math.min(filters.limit ?? DEFAULT_LIMIT, MAX_LIMIT);

    const params: Record<string, string> = {
      per_page: String(limit),
      page: String(Math.floor((filters.offset ?? 0) / limit) + 1),
      order: "newest",
    };

    if (filters.term) {
      params["conditions[term]"] = filters.term;
    }
    if (filters.type && filters.type.length > 0) {
      for (let i = 0; i < filters.type.length; i++) {
        params[`conditions[type][]`] = filters.type[i]!;
      }
    }
    if (filters.agency) {
      params["conditions[agencies][]"] = filters.agency;
    }
    if (filters.startDate) {
      params["conditions[publication_date][gte]"] = filters.startDate;
    }
    if (filters.endDate) {
      params["conditions[publication_date][lte]"] = filters.endDate;
    }
    if (filters.significantOnly) {
      params["conditions[significant]"] = "1";
    }

    // Build the URL manually to support multiple same-key params for type[]
    const url = new URL(`${FEDREG_API_BASE}/documents`);
    if (filters.term) {
      url.searchParams.set("conditions[term]", filters.term);
    }
    if (filters.type && filters.type.length > 0) {
      for (const t of filters.type) {
        url.searchParams.append("conditions[type][]", t);
      }
    }
    if (filters.agency) {
      url.searchParams.set("conditions[agencies][]", filters.agency);
    }
    if (filters.startDate) {
      url.searchParams.set("conditions[publication_date][gte]", filters.startDate);
    }
    if (filters.endDate) {
      url.searchParams.set("conditions[publication_date][lte]", filters.endDate);
    }
    if (filters.significantOnly) {
      url.searchParams.set("conditions[significant]", "1");
    }
    url.searchParams.set("per_page", String(limit));
    url.searchParams.set("page", String(Math.floor((filters.offset ?? 0) / limit) + 1));
    url.searchParams.set("order", "newest");

    const response = await fetch(url.toString(), {
      headers: { "Accept": "application/json" },
    });

    if (!response.ok) {
      throw new FedRegApiError(response.status, await response.text());
    }

    const data = await response.json() as Record<string, unknown>;
    const results = (data["results"] ?? []) as Record<string, unknown>[];

    return results.map(mapToFedRegDocument);
  }

  /**
   * Search specifically for compliance-impacting regulatory changes.
   * Targets FAR, CMMC, SOC, HIPAA, SOX, AML, and other high-impact areas.
   */
  async searchComplianceImpact(
    keywords: string[] = []
  ): Promise<FedRegDocument[]> {
    const defaultKeywords = [
      "Federal Acquisition Regulation",
      "CMMC",
      "cybersecurity maturity",
      "HIPAA",
      "SOC 2",
      "Sarbanes-Oxley",
      "anti-money laundering",
      "FedRAMP",
      "NIST",
      "compliance certification",
    ];

    const searchTerms = keywords.length > 0 ? keywords : defaultKeywords;
    const allDocuments: FedRegDocument[] = [];
    const seenNumbers = new Set<string>();

    // Search for final rules and proposed rules from last 90 days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 90);
    const startDateStr = startDate.toISOString().split("T")[0]!;

    for (const term of searchTerms) {
      const docs = await this.searchRegulations({
        term,
        type: ["RULE", "PRORULE"],
        startDate: startDateStr,
        limit: 20,
      });

      for (const doc of docs) {
        if (!seenNumbers.has(doc.documentNumber)) {
          seenNumbers.add(doc.documentNumber);
          allDocuments.push(doc);
        }
      }
    }

    return allDocuments;
  }

  /**
   * Fetch a single document by its document number.
   */
  async getDocument(documentNumber: string): Promise<FedRegDocument> {
    const data = await this.fedRegRequest(`/documents/${encodeURIComponent(documentNumber)}`);
    return mapToFedRegDocument(data);
  }

  /**
   * Get recent regulatory activity for a specific agency.
   */
  async monitorAgency(
    agencySlug: string,
    limit = 25
  ): Promise<FedRegDocument[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    const startDateStr = startDate.toISOString().split("T")[0]!;

    return this.searchRegulations({
      agency: agencySlug,
      type: ["RULE", "PRORULE", "NOTICE"],
      startDate: startDateStr,
      limit,
    });
  }

  // ─── Scoring & Analysis ─────────────────────────────────────────────

  /**
   * Score a document's compliance impact from 0-100.
   *
   * Factors:
   * - Document type: final rule (high), proposed rule (medium), notice (low)
   * - Keyword severity: FAR/CMMC/HIPAA (high), general compliance (medium)
   * - Page length: longer documents = more complex changes
   * - CFR references: more references = broader regulatory scope
   * - Significant flag: economically significant rules
   * - Effective date proximity: sooner deadline = higher urgency
   */
  scoreComplianceImpact(document: FedRegDocument): number {
    let score = 0;

    // Document type scoring (0-25 points)
    switch (document.type) {
      case "RULE":
        score += 25;
        break;
      case "PRORULE":
        score += 15;
        break;
      case "PRESDOCU":
        score += 20;
        break;
      case "NOTICE":
        score += 8;
        break;
    }

    // Keyword severity scoring (0-30 points)
    const textToSearch = `${document.title} ${document.abstract}`.toLowerCase();
    let keywordScore = 0;
    for (const [keyword, weight] of Object.entries(COMPLIANCE_KEYWORDS)) {
      if (textToSearch.includes(keyword.toLowerCase())) {
        keywordScore += weight;
      }
    }
    score += Math.min(keywordScore, 30);

    // Page length complexity (0-10 points)
    if (document.pageLength > 100) {
      score += 10;
    } else if (document.pageLength > 50) {
      score += 7;
    } else if (document.pageLength > 20) {
      score += 4;
    } else if (document.pageLength > 5) {
      score += 2;
    }

    // CFR references breadth (0-10 points)
    const cfrCount = document.cfrReferences.length;
    if (cfrCount > 10) {
      score += 10;
    } else if (cfrCount > 5) {
      score += 7;
    } else if (cfrCount > 2) {
      score += 4;
    } else if (cfrCount > 0) {
      score += 2;
    }

    // Economically significant (0-15 points)
    if (document.significant) {
      score += 15;
    }

    // Effective date proximity (0-10 points)
    if (document.effectiveDate) {
      const effectiveMs = new Date(document.effectiveDate).getTime();
      const nowMs = Date.now();
      const daysUntilEffective = (effectiveMs - nowMs) / (1000 * 60 * 60 * 24);

      if (daysUntilEffective <= 30 && daysUntilEffective > 0) {
        score += 10; // Imminent — less than 30 days
      } else if (daysUntilEffective <= 90 && daysUntilEffective > 0) {
        score += 7; // Soon — 30-90 days
      } else if (daysUntilEffective <= 180 && daysUntilEffective > 0) {
        score += 4; // Upcoming — 90-180 days
      } else if (daysUntilEffective < 0) {
        score += 8; // Already effective — must comply now
      }
    }

    return Math.min(score, 100);
  }

  /**
   * Determine which industries and sectors are affected by a regulatory change.
   */
  mapAffectedIndustries(document: FedRegDocument): { industries: string[]; sectors: string[] } {
    const industries = new Set<string>();
    const sectors = new Set<string>();

    // Map from agency
    for (const agency of document.agencies) {
      const mapped = AGENCY_INDUSTRY_MAP[agency.slug];
      if (mapped) {
        for (const ind of mapped) {
          industries.add(ind);
        }
      }
    }

    // Map from keywords in title + abstract
    const textToSearch = `${document.title} ${document.abstract}`;
    for (const [keyword, mappedIndustries] of Object.entries(KEYWORD_INDUSTRY_MAP)) {
      if (textToSearch.toLowerCase().includes(keyword.toLowerCase())) {
        for (const ind of mappedIndustries) {
          industries.add(ind);
        }
      }
    }

    // Derive sectors from industries
    const sectorMap: Record<string, string> = {
      "Government Contracting": "Public Sector",
      "Defense Contracting": "Public Sector",
      "Federal Services": "Public Sector",
      "Government IT": "Public Sector",
      "Healthcare": "Healthcare & Life Sciences",
      "Health Insurance": "Healthcare & Life Sciences",
      "Health IT": "Healthcare & Life Sciences",
      "Financial Services": "Financial Services",
      "Banking": "Financial Services",
      "Capital Markets": "Financial Services",
      "Cryptocurrency": "Financial Services",
      "Technology": "Technology",
      "Cloud Services": "Technology",
      "SaaS": "Technology",
      "Cybersecurity": "Technology",
      "Manufacturing": "Industrial",
      "Energy": "Industrial",
      "Transportation": "Industrial",
      "Logistics": "Industrial",
      "Aerospace": "Industrial",
      "Small Business": "Small Business",
      "Education": "Education",
      "Higher Education": "Education",
      "Real Estate": "Real Estate & Construction",
      "Housing Finance": "Real Estate & Construction",
      "International Trade": "Trade & Commerce",
      "Export": "Trade & Commerce",
      "Trade": "Trade & Commerce",
      "Environmental Services": "Environmental",
      "Agriculture": "Agriculture",
      "Food Safety": "Agriculture",
      "Legal Services": "Professional Services",
      "Public Companies": "Financial Services",
      "Accounting": "Professional Services",
      "Privacy": "Technology",
      "Consumer Products": "Consumer",
    };

    for (const ind of industries) {
      const sector = sectorMap[ind];
      if (sector) {
        sectors.add(sector);
      }
    }

    // If nothing matched, mark as general
    if (industries.size === 0) {
      industries.add("General Regulatory");
      sectors.add("Cross-Industry");
    }

    return {
      industries: [...industries],
      sectors: [...sectors],
    };
  }

  /**
   * Find matching compliance keywords in a document.
   */
  private findComplianceKeywords(document: FedRegDocument): string[] {
    const textToSearch = `${document.title} ${document.abstract}`.toLowerCase();
    const found: string[] = [];

    for (const keyword of Object.keys(COMPLIANCE_KEYWORDS)) {
      if (textToSearch.includes(keyword.toLowerCase())) {
        found.push(keyword);
      }
    }

    return found;
  }

  /**
   * Build a full regulatory change alert from a document.
   */
  private buildAlert(document: FedRegDocument): RegulatoryChangeAlert {
    const impactScore = this.scoreComplianceImpact(document);
    const { industries, sectors } = this.mapAffectedIndustries(document);
    const complianceKeywords = this.findComplianceKeywords(document);

    let urgencyLevel: RegulatoryChangeAlert["urgencyLevel"];
    if (impactScore >= 75) {
      urgencyLevel = "CRITICAL";
    } else if (impactScore >= 50) {
      urgencyLevel = "HIGH";
    } else if (impactScore >= 25) {
      urgencyLevel = "MEDIUM";
    } else {
      urgencyLevel = "LOW";
    }

    // Estimate how many of the 745 rules might be affected
    let affectedRulesEstimate = 0;
    if (complianceKeywords.some((k) => ["FAR", "Federal Acquisition Regulation"].includes(k))) {
      affectedRulesEstimate += 120;
    }
    if (complianceKeywords.some((k) => ["CMMC", "Cybersecurity Maturity Model"].includes(k))) {
      affectedRulesEstimate += 80;
    }
    if (complianceKeywords.some((k) => ["HIPAA", "Health Insurance Portability"].includes(k))) {
      affectedRulesEstimate += 60;
    }
    if (complianceKeywords.some((k) => ["SOX", "Sarbanes-Oxley"].includes(k))) {
      affectedRulesEstimate += 50;
    }
    if (complianceKeywords.some((k) => ["AML", "Anti-Money Laundering", "Bank Secrecy Act"].includes(k))) {
      affectedRulesEstimate += 40;
    }
    if (complianceKeywords.some((k) => k.toLowerCase().includes("cybersecurity"))) {
      affectedRulesEstimate += 35;
    }
    if (affectedRulesEstimate === 0 && complianceKeywords.length > 0) {
      affectedRulesEstimate = complianceKeywords.length * 10;
    }

    // Recommended actions
    const recommendedActions: string[] = [];
    if (document.type === "RULE") {
      recommendedActions.push("Review final rule text for compliance obligations");
      recommendedActions.push("Update internal compliance controls before effective date");
      if (document.effectiveDate) {
        recommendedActions.push(`Ensure compliance by ${document.effectiveDate}`);
      }
    } else if (document.type === "PRORULE") {
      recommendedActions.push("Submit public comments before comment period closes");
      recommendedActions.push("Begin preliminary compliance gap assessment");
      recommendedActions.push("Monitor for final rule publication");
    } else if (document.type === "PRESDOCU") {
      recommendedActions.push("Assess executive order impact on compliance program");
      recommendedActions.push("Monitor implementing agency guidance");
    } else {
      recommendedActions.push("Review notice for relevant compliance implications");
    }

    if (complianceKeywords.some((k) => ["FAR", "Federal Acquisition Regulation"].includes(k))) {
      recommendedActions.push("Re-map FAR clause compliance matrix");
    }
    if (complianceKeywords.some((k) => ["CMMC", "Cybersecurity Maturity Model"].includes(k))) {
      recommendedActions.push("Update CMMC assessment scope and controls");
    }
    if (impactScore >= 50) {
      recommendedActions.push("Schedule compliance review with Vernen Legal");
    }

    return {
      document,
      impactScore,
      affectedIndustries: industries,
      affectedSectors: sectors,
      complianceKeywords,
      urgencyLevel,
      affectedRulesEstimate,
      recommendedActions,
      generatedAt: new Date().toISOString(),
    };
  }

  // ─── Full Intelligence Pipeline ─────────────────────────────────────

  /**
   * Run the full regulatory intelligence pipeline:
   * Discover regulatory changes → score compliance impact → store in D1.
   */
  async runPipeline(
    filters: FedRegSearchFilters = {}
  ): Promise<FedRegPipelineResult> {
    // Default to compliance-impacting document types
    if (!filters.type || filters.type.length === 0) {
      filters.type = ["RULE", "PRORULE"];
    }
    // Default to last 30 days
    if (!filters.startDate) {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
      filters.startDate = startDate.toISOString().split("T")[0]!;
    }

    const documents = await this.searchRegulations(filters);
    const alerts = documents.map((doc) => this.buildAlert(doc));

    // Sort by impact score descending
    alerts.sort((a, b) => b.impactScore - a.impactScore);

    return {
      alerts,
      totalDocuments: documents.length,
      filters,
      generatedAt: new Date().toISOString(),
      source: "Federal Register (federalregister.gov)",
    };
  }

  /**
   * Get a summary of which agencies are most active in regulatory changes.
   */
  async getAgencyActivity(
    days = 30
  ): Promise<{ agency: string; slug: string; count: number }[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const startDateStr = startDate.toISOString().split("T")[0]!;

    const documents = await this.searchRegulations({
      type: ["RULE", "PRORULE"],
      startDate: startDateStr,
      limit: MAX_LIMIT,
    });

    const agencyCounts = new Map<string, { name: string; slug: string; count: number }>();

    for (const doc of documents) {
      for (const agency of doc.agencies) {
        const existing = agencyCounts.get(agency.slug);
        if (existing) {
          existing.count++;
        } else {
          agencyCounts.set(agency.slug, {
            name: agency.name,
            slug: agency.slug,
            count: 1,
          });
        }
      }
    }

    return [...agencyCounts.values()]
      .sort((a, b) => b.count - a.count)
      .map(({ name, slug, count }) => ({ agency: name, slug, count }));
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Regulatory Alert Report Generator
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Generate a professional HTML regulatory change alert report.
 * Public-facing report that demonstrates Vernen Legal's monitoring value.
 */
export function generateRegulatoryAlertHTML(alert: RegulatoryChangeAlert): string {
  const { document, impactScore, affectedIndustries, affectedSectors, complianceKeywords, urgencyLevel, affectedRulesEstimate, recommendedActions } = alert;

  const scoreColor = impactScore >= 70 ? "#dc2626" : impactScore >= 40 ? "#d97706" : "#16a34a";
  const urgencyColor = urgencyLevel === "CRITICAL" ? "#dc2626"
    : urgencyLevel === "HIGH" ? "#d97706"
    : urgencyLevel === "MEDIUM" ? "#2563eb"
    : "#16a34a";

  const typeLabel = document.type === "RULE" ? "Final Rule"
    : document.type === "PRORULE" ? "Proposed Rule"
    : document.type === "PRESDOCU" ? "Presidential Document"
    : "Notice";

  const industriesHTML = affectedIndustries.map((i) => `<span class="industry-tag">${sanitize(i)}</span>`).join(" ");
  const sectorsHTML = affectedSectors.map((s) => `<span class="sector-tag">${sanitize(s)}</span>`).join(" ");
  const keywordsHTML = complianceKeywords.map((k) => `<span class="keyword-tag">${sanitize(k)}</span>`).join(" ");
  const actionsHTML = recommendedActions.map((a) => `<li>${sanitize(a)}</li>`).join("");
  const agenciesHTML = document.agencies.map((a) => sanitize(a.name)).join(", ");
  const cfrHTML = document.cfrReferences.length > 0
    ? document.cfrReferences.map((c) => `<span class="cfr-ref">${sanitize(c)}</span>`).join(" ")
    : '<span class="muted">None specified</span>';
  const docketHTML = document.docketIds.length > 0
    ? document.docketIds.map((d) => `<span class="docket-ref">${sanitize(d)}</span>`).join(" ")
    : '<span class="muted">None specified</span>';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Regulatory Alert — ${sanitize(document.title.substring(0, 80))}</title>
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
  .urgency-banner { text-align: center; padding: 0.75rem; border-radius: 8px; font-weight: 600; font-size: 1rem; letter-spacing: 1px; margin-bottom: 1.5rem; background: rgba(${urgencyColor === "#dc2626" ? "220,38,38" : urgencyColor === "#d97706" ? "217,119,6" : urgencyColor === "#2563eb" ? "37,99,235" : "22,163,74"},0.15); color: ${urgencyColor}; border: 1px solid ${urgencyColor}; }
  .doc-card { background: var(--slate); border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem; }
  .doc-card .doc-type { display: inline-block; padding: 4px 12px; border-radius: 4px; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; background: rgba(200,169,81,0.15); color: var(--gold); margin-bottom: 0.75rem; }
  .doc-card h2 { font-size: 1.2rem; margin-bottom: 0.75rem; line-height: 1.4; }
  .doc-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-top: 1rem; }
  .doc-meta .label { color: var(--muted); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; }
  .doc-meta .value { font-size: 0.95rem; margin-bottom: 0.5rem; }
  .doc-abstract { background: rgba(255,255,255,0.03); border-left: 3px solid var(--gold); padding: 1rem; margin-top: 1rem; border-radius: 0 4px 4px 0; font-size: 0.9rem; color: var(--muted); }
  .score-section { text-align: center; background: var(--slate); border-radius: 8px; padding: 2rem; margin-bottom: 1.5rem; }
  .score-circle { width: 120px; height: 120px; border-radius: 50%; border: 6px solid ${scoreColor}; display: inline-flex; align-items: center; justify-content: center; flex-direction: column; }
  .score-number { font-size: 2rem; font-weight: bold; color: ${scoreColor}; }
  .score-label { font-size: 0.75rem; color: ${scoreColor}; letter-spacing: 2px; text-transform: uppercase; }
  .section { margin-bottom: 2rem; }
  .section h2 { color: var(--gold); font-size: 1.1rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(200,169,81,0.3); }
  .tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .industry-tag { display: inline-block; background: rgba(37,99,235,0.15); color: #93c5fd; padding: 4px 12px; border-radius: 16px; font-size: 0.85rem; }
  .sector-tag { display: inline-block; background: rgba(147,51,234,0.15); color: #c4b5fd; padding: 4px 12px; border-radius: 16px; font-size: 0.85rem; }
  .keyword-tag { display: inline-block; background: rgba(220,38,38,0.12); color: #fca5a5; padding: 4px 12px; border-radius: 16px; font-size: 0.85rem; }
  .cfr-ref, .docket-ref { display: inline-block; background: rgba(200,169,81,0.1); color: var(--gold); padding: 3px 10px; border-radius: 4px; font-size: 0.8rem; font-family: monospace; margin: 2px; }
  .muted { color: var(--muted); font-size: 0.85rem; }
  .timeline { background: var(--slate); border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; text-align: center; }
  .timeline .t-label { color: var(--muted); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; }
  .timeline .t-value { font-size: 1.1rem; margin-top: 0.25rem; }
  .actions { background: var(--slate); border-radius: 8px; padding: 1.5rem; border-left: 4px solid var(--gold); }
  .actions ul { padding-left: 1.5rem; }
  .actions li { margin-bottom: 0.5rem; }
  .rules-impact { background: var(--slate); border-radius: 8px; padding: 1.5rem; text-align: center; margin-bottom: 1.5rem; }
  .rules-impact .big-number { font-size: 2.5rem; font-weight: bold; color: var(--gold); }
  .rules-impact .context { color: var(--muted); font-size: 0.9rem; margin-top: 0.25rem; }
  .links { display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap; }
  .links a { display: inline-block; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-size: 0.9rem; font-weight: 500; }
  .links .primary { background: var(--gold); color: var(--navy); }
  .links .secondary { background: rgba(200,169,81,0.15); color: var(--gold); border: 1px solid rgba(200,169,81,0.3); }
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
    <div class="subtitle">Federal Register Regulatory Change Alert</div>
  </div>

  <div class="urgency-banner">${urgencyLevel} COMPLIANCE IMPACT</div>

  <div class="doc-card">
    <span class="doc-type">${sanitize(typeLabel)}</span>
    <h2>${sanitize(document.title)}</h2>
    <div class="doc-meta">
      <div>
        <div class="label">Document Number</div>
        <div class="value" style="font-family:monospace;">${sanitize(document.documentNumber)}</div>
        <div class="label">Issuing Agencies</div>
        <div class="value">${agenciesHTML || '<span class="muted">Not specified</span>'}</div>
      </div>
      <div>
        <div class="label">Published</div>
        <div class="value">${sanitize(document.publicationDate)}</div>
        <div class="label">Pages</div>
        <div class="value">${document.pageLength} pages</div>
      </div>
    </div>
    ${document.abstract ? `<div class="doc-abstract">${sanitize(document.abstract)}</div>` : ""}
  </div>

  <div class="score-section">
    <div class="score-circle">
      <div class="score-number">${impactScore}</div>
      <div class="score-label">${urgencyLevel}</div>
    </div>
    <p style="margin-top:1rem; color: var(--muted);">Compliance Impact Score — higher indicates greater urgency to act</p>
  </div>

  <div class="timeline">
    <div>
      <div class="t-label">Published</div>
      <div class="t-value">${sanitize(document.publicationDate)}</div>
    </div>
    <div>
      <div class="t-label">Effective Date</div>
      <div class="t-value">${document.effectiveDate ? sanitize(document.effectiveDate) : '<span class="muted">TBD</span>'}</div>
    </div>
    <div>
      <div class="t-label">Significant</div>
      <div class="t-value">${document.significant ? "Yes" : "No"}</div>
    </div>
  </div>

  <div class="section">
    <h2>Affected Industries</h2>
    <div class="tags">${industriesHTML}</div>
  </div>

  <div class="section">
    <h2>Affected Sectors</h2>
    <div class="tags">${sectorsHTML}</div>
  </div>

  ${complianceKeywords.length > 0 ? `
  <div class="section">
    <h2>Compliance Keywords Detected</h2>
    <div class="tags">${keywordsHTML}</div>
  </div>
  ` : ""}

  <div class="section">
    <h2>Regulatory References</h2>
    <div style="margin-bottom:0.75rem;">
      <span class="label" style="color:var(--muted); font-size:0.8rem;">CFR References:</span>
      <div style="margin-top:0.25rem;">${cfrHTML}</div>
    </div>
    <div>
      <span class="label" style="color:var(--muted); font-size:0.8rem;">Docket IDs:</span>
      <div style="margin-top:0.25rem;">${docketHTML}</div>
    </div>
  </div>

  ${affectedRulesEstimate > 0 ? `
  <div class="rules-impact">
    <div class="big-number">~${affectedRulesEstimate}</div>
    <div class="context">of your 745 compliance rules may require updates</div>
  </div>
  ` : ""}

  <div class="section">
    <h2>Recommended Actions</h2>
    <div class="actions">
      <ul>${actionsHTML}</ul>
    </div>
  </div>

  <div class="section">
    <h2>Source Documents</h2>
    <div class="links">
      ${document.htmlUrl ? `<a href="${sanitize(document.htmlUrl)}" class="primary" target="_blank" rel="noopener">View on Federal Register</a>` : ""}
      ${document.pdfUrl ? `<a href="${sanitize(document.pdfUrl)}" class="secondary" target="_blank" rel="noopener">Download PDF</a>` : ""}
    </div>
  </div>

  <div class="cta">
    <p style="margin-bottom: 1rem; font-size: 1.1rem;">Need help mapping this regulatory change to your compliance program?</p>
    <a href="https://compliance.vernenlegal.com/api/regulis/check">Start Your Compliance Review</a>
    <p style="margin-top: 1rem; color: var(--muted);">Powered by 745+ compliance rules across all 50 states</p>
  </div>

  <div class="footer">
    <p>Generated by Vernen Legal Compliance — ${new Date().toISOString().split("T")[0]}</p>
    <p>Data source: Federal Register (federalregister.gov) — Public record</p>
    <p class="disclaimer">This report is generated from publicly available Federal Register data and is provided for informational purposes only. It does not constitute legal advice or a professional compliance assessment. Consult qualified professionals for regulatory compliance guidance.</p>
  </div>

</div>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// D1 Storage — Persist regulatory alerts for tracking
// ═══════════════════════════════════════════════════════════════════════════

export async function ensureFedRegTables(db: D1Database): Promise<void> {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS fedreg_alerts (
      document_number TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      type TEXT NOT NULL,
      abstract TEXT DEFAULT '',
      agencies TEXT DEFAULT '[]',
      publication_date TEXT,
      effective_date TEXT,
      html_url TEXT,
      pdf_url TEXT,
      page_length INTEGER DEFAULT 0,
      cfr_references TEXT DEFAULT '[]',
      docket_ids TEXT DEFAULT '[]',
      significant INTEGER DEFAULT 0,
      impact_score INTEGER DEFAULT 0,
      urgency_level TEXT DEFAULT 'LOW',
      affected_industries TEXT DEFAULT '[]',
      affected_sectors TEXT DEFAULT '[]',
      compliance_keywords TEXT DEFAULT '[]',
      affected_rules_estimate INTEGER DEFAULT 0,
      recommended_actions TEXT DEFAULT '[]',
      status TEXT DEFAULT 'new',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_fedreg_alerts_score ON fedreg_alerts(impact_score DESC);
    CREATE INDEX IF NOT EXISTS idx_fedreg_alerts_type ON fedreg_alerts(type);
    CREATE INDEX IF NOT EXISTS idx_fedreg_alerts_urgency ON fedreg_alerts(urgency_level);
    CREATE INDEX IF NOT EXISTS idx_fedreg_alerts_pubdate ON fedreg_alerts(publication_date DESC);
    CREATE INDEX IF NOT EXISTS idx_fedreg_alerts_status ON fedreg_alerts(status);
  `);
}

export async function storeAlert(
  db: D1Database,
  alert: RegulatoryChangeAlert
): Promise<void> {
  await db.prepare(`
    INSERT OR REPLACE INTO fedreg_alerts
    (document_number, title, type, abstract, agencies,
     publication_date, effective_date, html_url, pdf_url,
     page_length, cfr_references, docket_ids, significant,
     impact_score, urgency_level, affected_industries,
     affected_sectors, compliance_keywords, affected_rules_estimate,
     recommended_actions, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
  `).bind(
    alert.document.documentNumber,
    alert.document.title,
    alert.document.type,
    alert.document.abstract,
    JSON.stringify(alert.document.agencies),
    alert.document.publicationDate,
    alert.document.effectiveDate,
    alert.document.htmlUrl,
    alert.document.pdfUrl,
    alert.document.pageLength,
    JSON.stringify(alert.document.cfrReferences),
    JSON.stringify(alert.document.docketIds),
    alert.document.significant ? 1 : 0,
    alert.impactScore,
    alert.urgencyLevel,
    JSON.stringify(alert.affectedIndustries),
    JSON.stringify(alert.affectedSectors),
    JSON.stringify(alert.complianceKeywords),
    alert.affectedRulesEstimate,
    JSON.stringify(alert.recommendedActions),
  ).run();
}

export async function getStoredAlerts(
  db: D1Database,
  filters: {
    type?: string;
    urgency?: string;
    minScore?: number;
    status?: string;
    limit?: number;
  }
): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM fedreg_alerts WHERE 1=1";
  const binds: unknown[] = [];

  if (filters.type) {
    query += " AND type = ?";
    binds.push(filters.type);
  }
  if (filters.urgency) {
    query += " AND urgency_level = ?";
    binds.push(filters.urgency.toUpperCase());
  }
  if (filters.minScore) {
    query += " AND impact_score >= ?";
    binds.push(filters.minScore);
  }
  if (filters.status) {
    query += " AND status = ?";
    binds.push(filters.status);
  }

  query += " ORDER BY impact_score DESC LIMIT ?";
  binds.push(filters.limit ?? 50);

  const result = await db.prepare(query).bind(...binds).all();
  return result.results as Record<string, unknown>[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Data Mappers
// ═══════════════════════════════════════════════════════════════════════════

function mapToFedRegDocument(r: Record<string, unknown>): FedRegDocument {
  const agencies = Array.isArray(r["agencies"])
    ? (r["agencies"] as Record<string, unknown>[]).map((a) => ({
        name: String(a["name"] ?? a["raw_name"] ?? ""),
        slug: String(a["slug"] ?? a["id"] ?? ""),
      }))
    : [];

  const cfrReferences: string[] = [];
  if (Array.isArray(r["cfr_references"])) {
    for (const ref of r["cfr_references"] as Record<string, unknown>[]) {
      const title = ref["title"] ?? "";
      const part = ref["part"] ?? "";
      cfrReferences.push(`${title} CFR ${part}`);
    }
  }

  const docketIds: string[] = [];
  if (Array.isArray(r["docket_ids"])) {
    for (const d of r["docket_ids"] as string[]) {
      docketIds.push(String(d));
    }
  }

  // Federal Register API uses "Rule", "Proposed Rule", "Notice", "Presidential Document"
  const rawType = String(r["type"] ?? "");
  let mappedType: FedRegDocument["type"];
  if (rawType === "Rule" || rawType === "RULE") {
    mappedType = "RULE";
  } else if (rawType === "Proposed Rule" || rawType === "PRORULE") {
    mappedType = "PRORULE";
  } else if (rawType === "Presidential Document" || rawType === "PRESDOCU") {
    mappedType = "PRESDOCU";
  } else {
    mappedType = "NOTICE";
  }

  return {
    documentNumber: String(r["document_number"] ?? ""),
    title: String(r["title"] ?? ""),
    type: mappedType,
    abstract: String(r["abstract"] ?? r["excerpts"] ?? ""),
    agencies,
    publicationDate: String(r["publication_date"] ?? ""),
    effectiveDate: String(r["effective_on"] ?? r["effective_date"] ?? ""),
    htmlUrl: String(r["html_url"] ?? ""),
    pdfUrl: String(r["pdf_url"] ?? r["raw_text_url"] ?? ""),
    pageLength: Number(r["page_length"] ?? r["pages"] ?? 0),
    cfrReferences,
    docketIds,
    significant: Boolean(r["significant"]),
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// Errors
// ═══════════════════════════════════════════════════════════════════════════

export class FedRegApiError extends Error {
  constructor(public status: number, public body: string) {
    super(`Federal Register API error ${status}: ${body}`);
    this.name = "FedRegApiError";
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

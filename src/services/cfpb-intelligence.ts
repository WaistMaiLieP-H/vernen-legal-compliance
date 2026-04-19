/**
 * CFPB Intelligence Service — Consumer Financial Complaints Pipeline
 *
 * Connects to the CFPB Consumer Complaint Database to identify
 * financial institutions with documented consumer complaints and
 * compliance failures: mortgages, credit cards, debt collection,
 * credit reporting, bank accounts.
 *
 * API: https://www.consumerfinance.gov/data-research/consumer-complaints/search/api/v1/
 * No API key required. Millions of complaints.
 */

import type { Env } from "../index.js";
import { generateId } from "../utils/helpers.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface CFPBComplaint {
  complaintId: string;
  dateReceived: string;
  product: string;         // "Mortgage", "Credit card", "Debt collection", etc.
  subProduct: string;
  issue: string;
  subIssue: string;
  company: string;
  state: string;
  zipCode: string;
  companyResponse: string; // "Closed with explanation", "Closed with monetary relief", etc.
  timelyResponse: boolean;
  consumerDisputed: boolean;
  dateSentToCompany: string;
}

export interface CFPBCompanyProfile {
  company: string;
  totalComplaints: number;
  complaintsByProduct: Record<string, number>;
  complaintsByIssue: Record<string, number>;
  disputeRate: number;      // % of complaints where consumer disputed
  monetaryReliefRate: number;
  untimelyRate: number;
  topStates: { state: string; count: number }[];
}

export interface CFPBComplianceLead {
  company: string;
  state: string | null;
  totalComplaints: number;
  product: string;
  topIssues: string[];
  riskScore: number;
  riskCategories: string[];
  recommendedServices: string[];
  estimatedRemediation: string;
}

export interface CFPBSearchFilters {
  product?: string;
  company?: string;
  state?: string;
  issue?: string;
  dateFrom?: string;      // YYYY-MM-DD
  dateTo?: string;
  hasNarrative?: boolean;
  limit?: number;
  offset?: number;
}

export interface CFPBPipelineResult {
  leads: CFPBComplianceLead[];
  totalMatched: number;
  filters: CFPBSearchFilters;
  generatedAt: string;
  source: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// CFPB API Client
// ═══════════════════════════════════════════════════════════════════════════

const CFPB_API_BASE = "https://www.consumerfinance.gov/data-research/consumer-complaints/search/api/v1/";
const USER_AGENT = "Vernen-Legal-Compliance/1.0 compliance@vernenlegal.com";
const DEFAULT_LIMIT = 100;
const MAX_LIMIT = 1000;

export class CFPBIntelligenceService {

  /**
   * Search complaints from the CFPB database.
   */
  async searchComplaints(filters: CFPBSearchFilters = {}): Promise<CFPBComplaint[]> {
    const limit = Math.min(filters.limit ?? DEFAULT_LIMIT, MAX_LIMIT);
    const offset = filters.offset ?? 0;

    const params = new URLSearchParams();
    params.set("size", String(limit));
    params.set("frm", String(offset));
    params.set("sort", "created_date_desc");
    params.set("no_aggs", "true");

    if (filters.product) params.set("product", filters.product);
    if (filters.company) params.set("company", filters.company);
    if (filters.state) params.set("state", filters.state.toUpperCase());
    if (filters.issue) params.set("issue", filters.issue);
    if (filters.dateFrom) params.set("date_received_min", filters.dateFrom);
    if (filters.dateTo) params.set("date_received_max", filters.dateTo);
    if (filters.hasNarrative) params.set("has_narrative", "true");

    const url = `${CFPB_API_BASE}?${params.toString()}`;

    const response = await fetch(url, {
      headers: { "User-Agent": USER_AGENT, "Accept": "application/json" },
    });

    if (!response.ok) {
      throw new CFPBApiError(response.status, `CFPB API returned ${response.status}`);
    }

    const data = await response.json() as CFPBResponse;
    return this.mapComplaints(data);
  }

  /**
   * Aggregate complaints by company to find worst offenders.
   */
  async getCompanyAggregates(filters: CFPBSearchFilters = {}): Promise<CFPBCompanyAggregate[]> {
    const params = new URLSearchParams();
    params.set("size", "0"); // Don't return individual complaints
    params.set("sort", "created_date_desc");

    if (filters.product) params.set("product", filters.product);
    if (filters.state) params.set("state", filters.state.toUpperCase());
    if (filters.dateFrom) params.set("date_received_min", filters.dateFrom);
    if (filters.dateTo) params.set("date_received_max", filters.dateTo);

    const url = `${CFPB_API_BASE}?${params.toString()}`;

    const response = await fetch(url, {
      headers: { "User-Agent": USER_AGENT, "Accept": "application/json" },
    });

    if (!response.ok) {
      throw new CFPBApiError(response.status, `CFPB API returned ${response.status}`);
    }

    const data = await response.json() as CFPBResponse;
    return this.extractAggregates(data);
  }

  /**
   * Run the full pipeline: search → aggregate by company → score → store.
   */
  async runPipeline(
    db: D1Database,
    filters: CFPBSearchFilters = {}
  ): Promise<CFPBPipelineResult> {
    await ensureCFPBTables(db);

    // Default to last 6 months if no date range specified
    if (!filters.dateFrom) {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      filters.dateFrom = sixMonthsAgo.toISOString().split("T")[0];
    }

    // Get complaints
    const complaints = await this.searchComplaints({
      ...filters,
      limit: Math.min(filters.limit ?? 500, MAX_LIMIT),
    });

    // Group by company
    const companyMap = new Map<string, CFPBComplaint[]>();
    for (const c of complaints) {
      const existing = companyMap.get(c.company) ?? [];
      existing.push(c);
      companyMap.set(c.company, existing);
    }

    // Score each company
    const leads: CFPBComplianceLead[] = [];
    for (const [company, companyComplaints] of companyMap) {
      const lead = this.scoreCompany(company, companyComplaints);
      leads.push(lead);
      await storeLead(db, lead);
    }

    leads.sort((a, b) => b.riskScore - a.riskScore);

    return {
      leads,
      totalMatched: leads.length,
      filters,
      generatedAt: new Date().toISOString(),
      source: "CFPB Consumer Complaint Database",
    };
  }

  /**
   * Score a company's compliance risk based on complaint patterns.
   */
  private scoreCompany(company: string, complaints: CFPBComplaint[]): CFPBComplianceLead {
    let score = 0;
    const categories: string[] = [];
    const services: string[] = [];

    // Volume scoring
    const count = complaints.length;
    if (count >= 50) { score += 30; categories.push(`High Volume (${count} complaints)`); }
    else if (count >= 20) { score += 20; categories.push(`Elevated Volume (${count} complaints)`); }
    else if (count >= 5) { score += 10; categories.push(`${count} complaints`); }
    else { score += 5; }

    // Dispute rate
    const disputed = complaints.filter(c => c.consumerDisputed).length;
    const disputeRate = count > 0 ? disputed / count : 0;
    if (disputeRate > 0.5) {
      score += 20;
      categories.push(`High Dispute Rate (${(disputeRate * 100).toFixed(0)}%)`);
      services.push("Consumer Dispute Resolution Program");
    } else if (disputeRate > 0.25) {
      score += 10;
      categories.push(`Elevated Dispute Rate (${(disputeRate * 100).toFixed(0)}%)`);
    }

    // Timeliness
    const untimely = complaints.filter(c => !c.timelyResponse).length;
    const untimelyRate = count > 0 ? untimely / count : 0;
    if (untimelyRate > 0.1) {
      score += 15;
      categories.push(`Untimely Response Rate (${(untimelyRate * 100).toFixed(0)}%)`);
      services.push("Response Time Compliance Remediation");
    }

    // Product diversity (violations across multiple products = systemic issue)
    const products = new Set(complaints.map(c => c.product));
    if (products.size >= 4) {
      score += 15;
      categories.push(`Multi-Product Issues (${products.size} products)`);
      services.push("Enterprise-Wide Compliance Assessment");
    } else if (products.size >= 2) {
      score += 5;
    }

    // Issue patterns
    const issueCounts = new Map<string, number>();
    for (const c of complaints) {
      issueCounts.set(c.issue, (issueCounts.get(c.issue) ?? 0) + 1);
    }
    const topIssues = [...issueCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([issue]) => issue);

    // Monetary relief needed
    const monetaryRelief = complaints.filter(c =>
      c.companyResponse.toLowerCase().includes("monetary relief")
    ).length;
    if (monetaryRelief > 0) {
      score += 10;
      categories.push(`${monetaryRelief} cases requiring monetary relief`);
      services.push("Financial Remediation & Restitution Program");
    }

    // Product-specific services
    for (const product of products) {
      const p = product.toLowerCase();
      if (p.includes("mortgage")) services.push("Mortgage Servicing Compliance Audit");
      else if (p.includes("credit card")) services.push("Credit Card Practices Compliance");
      else if (p.includes("debt collection")) services.push("FDCPA Compliance Audit");
      else if (p.includes("credit report")) services.push("FCRA Compliance Audit");
      else if (p.includes("bank") || p.includes("checking") || p.includes("savings")) services.push("Deposit Account Compliance");
      else if (p.includes("student loan")) services.push("Student Loan Servicing Compliance");
    }

    score = Math.min(score, 100);

    let estimatedRemediation: string;
    if (score >= 80) estimatedRemediation = "6-12 months comprehensive consumer compliance program";
    else if (score >= 50) estimatedRemediation = "3-6 months targeted remediation";
    else if (score >= 25) estimatedRemediation = "1-3 months compliance review";
    else estimatedRemediation = "< 1 month standard review";

    // Determine primary state
    const stateCounts = new Map<string, number>();
    for (const c of complaints) {
      if (c.state) stateCounts.set(c.state, (stateCounts.get(c.state) ?? 0) + 1);
    }
    const topState = [...stateCounts.entries()].sort((a, b) => b[1] - a[1])[0];

    return {
      company,
      state: topState?.[0] ?? null,
      totalComplaints: count,
      product: [...products].join(", "),
      topIssues,
      riskScore: score,
      riskCategories: categories,
      recommendedServices: [...new Set(services)],
      estimatedRemediation,
    };
  }

  // ─── Response Mapping ─────────────────────────────────────────────────

  private mapComplaints(data: CFPBResponse): CFPBComplaint[] {
    const hits = data.hits?.hits ?? [];
    return hits.map((hit: CFPBHit) => {
      const s = hit._source ?? {};
      return {
        complaintId: String(s.complaint_id ?? hit._id ?? ""),
        dateReceived: String(s.date_received ?? ""),
        product: String(s.product ?? ""),
        subProduct: String(s.sub_product ?? ""),
        issue: String(s.issue ?? ""),
        subIssue: String(s.sub_issue ?? ""),
        company: String(s.company ?? ""),
        state: String(s.state ?? ""),
        zipCode: String(s.zip_code ?? ""),
        companyResponse: String(s.company_response ?? ""),
        timelyResponse: s.timely === "Yes" || s.timely === true,
        consumerDisputed: s.consumer_disputed === "Yes" || s.consumer_disputed === true,
        dateSentToCompany: String(s.date_sent_to_company ?? ""),
      };
    });
  }

  private extractAggregates(data: CFPBResponse): CFPBCompanyAggregate[] {
    const aggs = data.aggregations?.company?.company?.buckets ?? [];
    return aggs.map((b: Record<string, unknown>) => ({
      company: String(b.key ?? ""),
      count: Number(b.doc_count ?? 0),
    }));
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Response types
// ═══════════════════════════════════════════════════════════════════════════

interface CFPBHit {
  _id?: string;
  _source?: Record<string, unknown>;
}

interface CFPBResponse {
  hits?: {
    hits?: CFPBHit[];
    total?: number | { value?: number };
  };
  aggregations?: {
    company?: {
      company?: {
        buckets?: Record<string, unknown>[];
      };
    };
  };
}

interface CFPBCompanyAggregate {
  company: string;
  count: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// Error classes
// ═══════════════════════════════════════════════════════════════════════════

export class CFPBApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "CFPBApiError";
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// D1 Storage
// ═══════════════════════════════════════════════════════════════════════════

export async function ensureCFPBTables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS cfpb_leads (id TEXT PRIMARY KEY, company TEXT NOT NULL, state TEXT, total_complaints INTEGER DEFAULT 0, product TEXT, top_issues TEXT DEFAULT '[]', risk_score INTEGER DEFAULT 0, risk_categories TEXT DEFAULT '[]', recommended_services TEXT DEFAULT '[]', status TEXT DEFAULT 'new', created_at TEXT DEFAULT (datetime('now')), updated_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_cfpb_leads_company ON cfpb_leads(company)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_cfpb_leads_score ON cfpb_leads(risk_score DESC)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_cfpb_leads_state ON cfpb_leads(state)"),
  ]);
}

export async function storeLead(db: D1Database, lead: CFPBComplianceLead): Promise<void> {
  const id = generateId("cfpb");
  await db.prepare(`
    INSERT OR REPLACE INTO cfpb_leads
    (id, company, state, total_complaints, product, top_issues,
     risk_score, risk_categories, recommended_services, updated_at)
    VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, datetime('now'))
  `).bind(
    id, lead.company, lead.state, lead.totalComplaints,
    lead.product, JSON.stringify(lead.topIssues),
    lead.riskScore, JSON.stringify(lead.riskCategories),
    JSON.stringify(lead.recommendedServices),
  ).run();
}

export async function getStoredLeads(
  db: D1Database,
  filters: { company?: string; state?: string; minScore?: number; limit?: number }
): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM cfpb_leads WHERE 1=1";
  const binds: unknown[] = [];
  let idx = 1;

  if (filters.company) {
    query += ` AND company LIKE ?${idx++}`;
    binds.push(`%${filters.company}%`);
  }
  if (filters.state) {
    query += ` AND state = ?${idx++}`;
    binds.push(filters.state.toUpperCase());
  }
  if (filters.minScore) {
    query += ` AND risk_score >= ?${idx++}`;
    binds.push(filters.minScore);
  }

  query += ` ORDER BY risk_score DESC LIMIT ?${idx}`;
  binds.push(Math.min(filters.limit ?? 100, 500));

  const stmt = db.prepare(query);
  const result = await (binds.length ? stmt.bind(...binds) : stmt).all();
  return (result.results ?? []) as Record<string, unknown>[];
}

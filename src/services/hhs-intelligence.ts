/**
 * HHS Intelligence Service — OCR Breach Portal ("Wall of Shame") Pipeline
 *
 * Connects to the HHS Office for Civil Rights breach portal to identify
 * healthcare entities under investigation for HIPAA breaches affecting
 * 500+ individuals.
 *
 * These are not cold leads — they are entities with documented HIPAA
 * violations and legally mandated remediation obligations.
 */

import type { Env } from "../index.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface HHSBreachEntity {
  /** Name of the covered entity or business associate */
  entityName: string;
  /** Two-letter state abbreviation */
  state: string;
  /** Covered entity type: e.g. "Health Plan", "Healthcare Provider", "Healthcare Clearing House", "Business Associate" */
  coveredEntityType: string;
  /** Number of individuals affected by the breach */
  individualsAffected: number;
  /** Date the breach report was submitted to HHS */
  breachSubmissionDate: string;
  /** Type of breach: e.g. "Hacking/IT Incident", "Theft", "Unauthorized Access/Disclosure", "Loss", "Improper Disposal" */
  breachType: string;
  /** Location of breached information: e.g. "Network Server", "Email", "Electronic Medical Record", "Paper/Films", "Laptop" */
  locationOfBreachedInfo: string;
  /** Whether a business associate was involved */
  businessAssociatePresent: boolean;
  /** Web description/summary of the breach (if available) */
  webDescription: string;
}

export interface HIPAAComplianceGapLead {
  entity: HHSBreachEntity;
  gapScore: number; // 0-100, higher = more urgent compliance need
  gapCategories: string[];
  recommendedServices: string[];
  estimatedRemediation: string;
  riskLevel: "CRITICAL" | "HIGH" | "ELEVATED" | "MODERATE";
}

export interface HHSSearchFilters {
  state?: string;
  minAffected?: number;
  entityType?: string;
  breachType?: string;
  limit?: number;
  offset?: number;
}

export interface HHSPipelineResult {
  leads: HIPAAComplianceGapLead[];
  totalMatched: number;
  filters: HHSSearchFilters;
  generatedAt: string;
  source: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// HHS Breach Portal Client
// ═══════════════════════════════════════════════════════════════════════════

/**
 * HHS OCR Breach Portal data URL.
 * The portal publishes breach data as a CSV download.
 */
const HHS_BREACH_CSV_URL =
  "https://ocrportal.hhs.gov/ocr/breach/breach_report.jsf";

const DEFAULT_LIMIT = 100;
const MAX_LIMIT = 1000;

export class HHSIntelligenceService {
  /**
   * Fetch breach data from the HHS OCR portal.
   *
   * The HHS portal serves data through a JSF application. We attempt to
   * fetch and parse the page content. In production, the CSV download
   * endpoint or a cached/scraped dataset would be used.
   */
  async fetchBreachData(
    filters: HHSSearchFilters = {}
  ): Promise<HHSBreachEntity[]> {
    const response = await fetch(HHS_BREACH_CSV_URL, {
      headers: {
        Accept: "text/html,text/csv,application/json",
        "User-Agent": "Vernen-Legal-Compliance-Bot/1.0",
      },
    });

    if (!response.ok) {
      throw new HHSApiError(
        response.status,
        `HHS portal returned ${response.status}`
      );
    }

    const body = await response.text();
    let entities = this.parseBreachPage(body);

    // Apply filters
    if (filters.state) {
      const st = filters.state.toUpperCase();
      entities = entities.filter((e) => e.state === st);
    }
    if (filters.minAffected) {
      const min = filters.minAffected;
      entities = entities.filter((e) => e.individualsAffected >= min);
    }
    if (filters.entityType) {
      const et = filters.entityType.toLowerCase();
      entities = entities.filter(
        (e) => e.coveredEntityType.toLowerCase().includes(et)
      );
    }
    if (filters.breachType) {
      const bt = filters.breachType.toLowerCase();
      entities = entities.filter(
        (e) => e.breachType.toLowerCase().includes(bt)
      );
    }

    // Sort by individuals affected descending
    entities.sort((a, b) => b.individualsAffected - a.individualsAffected);

    // Pagination
    const offset = filters.offset ?? 0;
    const limit = Math.min(filters.limit ?? DEFAULT_LIMIT, MAX_LIMIT);
    return entities.slice(offset, offset + limit);
  }

  /**
   * Parse breach data from HTML table or CSV content.
   * Handles both the HTML table rendered by the JSF portal
   * and CSV-formatted data.
   */
  private parseBreachPage(body: string): HHSBreachEntity[] {
    // Try CSV parsing first (if we received CSV data)
    if (body.includes(",") && !body.includes("<html")) {
      return this.parseCSV(body);
    }

    // Parse HTML table rows from the JSF portal
    return this.parseHTMLTable(body);
  }

  /**
   * Parse CSV-formatted breach data.
   * Expected columns: Name of Covered Entity, State, Covered Entity Type,
   * Individuals Affected, Breach Submission Date, Type of Breach,
   * Location of Breached Information, Business Associate Present,
   * Web Description
   */
  private parseCSV(csv: string): HHSBreachEntity[] {
    const lines = csv.split("\n");
    if (lines.length < 2) return [];

    const entities: HHSBreachEntity[] = [];

    // Skip header row
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i]!.trim();
      if (!line) continue;

      const fields = this.parseCSVLine(line);
      if (fields.length < 8) continue;

      entities.push({
        entityName: fields[0] ?? "",
        state: fields[1] ?? "",
        coveredEntityType: fields[2] ?? "",
        individualsAffected: parseInt(fields[3] ?? "0", 10) || 0,
        breachSubmissionDate: fields[4] ?? "",
        breachType: fields[5] ?? "",
        locationOfBreachedInfo: fields[6] ?? "",
        businessAssociatePresent:
          (fields[7] ?? "").toLowerCase() === "yes" ||
          (fields[7] ?? "").toLowerCase() === "true",
        webDescription: fields[8] ?? "",
      });
    }

    return entities;
  }

  /**
   * Parse a single CSV line respecting quoted fields.
   */
  private parseCSVLine(line: string): string[] {
    const fields: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const ch = line[i]!;
      if (ch === '"') {
        if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++; // skip escaped quote
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === "," && !inQuotes) {
        fields.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
    fields.push(current.trim());
    return fields;
  }

  /**
   * Parse HTML table from HHS breach portal page.
   * Extracts rows from the main data table.
   */
  private parseHTMLTable(html: string): HHSBreachEntity[] {
    const entities: HHSBreachEntity[] = [];

    // Find table rows — the HHS portal renders breach data in a table
    // with class "responsiveTable" or within a datatable
    const rowPattern = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
    let rowMatch: RegExpExecArray | null;
    let isFirstRow = true;

    while ((rowMatch = rowPattern.exec(html)) !== null) {
      const rowContent = rowMatch[1] ?? "";

      // Skip header rows
      if (rowContent.includes("<th")) {
        isFirstRow = false;
        continue;
      }
      if (isFirstRow) {
        isFirstRow = false;
        continue;
      }

      // Extract cell values
      const cellPattern = /<td[^>]*>([\s\S]*?)<\/td>/gi;
      const cells: string[] = [];
      let cellMatch: RegExpExecArray | null;

      while ((cellMatch = cellPattern.exec(rowContent)) !== null) {
        // Strip HTML tags from cell content
        const cellText = (cellMatch[1] ?? "")
          .replace(/<[^>]+>/g, "")
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&#x27;/g, "'")
          .replace(/\s+/g, " ")
          .trim();
        cells.push(cellText);
      }

      if (cells.length >= 8) {
        entities.push({
          entityName: cells[0] ?? "",
          state: cells[1] ?? "",
          coveredEntityType: cells[2] ?? "",
          individualsAffected: parseInt(cells[3] ?? "0", 10) || 0,
          breachSubmissionDate: cells[4] ?? "",
          breachType: cells[5] ?? "",
          locationOfBreachedInfo: cells[6] ?? "",
          businessAssociatePresent:
            (cells[7] ?? "").toLowerCase() === "yes",
          webDescription: cells[8] ?? "",
        });
      }
    }

    return entities;
  }

  // ─── Gap Scoring ─────────────────────────────────────────────────────

  /**
   * Score a breach entity on HIPAA compliance gap severity (0-100).
   *
   * Factors:
   * - Individuals affected (scale)
   * - Breach type (hacking/IT most severe)
   * - Recency (more recent = higher urgency)
   * - Business associate involvement (adds complexity)
   * - Entity type (health plans have broader exposure)
   */
  scoreEntity(entity: HHSBreachEntity): HIPAAComplianceGapLead {
    let gapScore = 0;
    const gapCategories: string[] = [];
    const recommendedServices: string[] = [];

    // ── Individuals affected (up to 35 points) ──
    const affected = entity.individualsAffected;
    if (affected >= 1000000) {
      gapScore += 35;
      gapCategories.push(`Massive Breach (${affected.toLocaleString()} individuals)`);
    } else if (affected >= 500000) {
      gapScore += 30;
      gapCategories.push(`Major Breach (${affected.toLocaleString()} individuals)`);
    } else if (affected >= 100000) {
      gapScore += 25;
      gapCategories.push(`Large Breach (${affected.toLocaleString()} individuals)`);
    } else if (affected >= 10000) {
      gapScore += 18;
      gapCategories.push(`Significant Breach (${affected.toLocaleString()} individuals)`);
    } else if (affected >= 1000) {
      gapScore += 12;
      gapCategories.push(`Moderate Breach (${affected.toLocaleString()} individuals)`);
    } else {
      gapScore += 5;
      gapCategories.push(`Breach (${affected.toLocaleString()} individuals)`);
    }

    // ── Breach type (up to 25 points) ──
    const bt = entity.breachType.toLowerCase();
    if (bt.includes("hacking") || bt.includes("it incident")) {
      gapScore += 25;
      gapCategories.push("Hacking/IT Incident");
      recommendedServices.push("HIPAA Security Risk Assessment");
      recommendedServices.push("Penetration Testing & Vulnerability Assessment");
      recommendedServices.push("Incident Response Plan Development");
    } else if (bt.includes("unauthorized")) {
      gapScore += 20;
      gapCategories.push("Unauthorized Access/Disclosure");
      recommendedServices.push("Access Control Policy Review");
      recommendedServices.push("Workforce Training Program");
    } else if (bt.includes("theft")) {
      gapScore += 18;
      gapCategories.push("Theft");
      recommendedServices.push("Physical Security Assessment");
      recommendedServices.push("Device Encryption Audit");
    } else if (bt.includes("loss")) {
      gapScore += 15;
      gapCategories.push("Loss");
      recommendedServices.push("Asset Tracking & Inventory Program");
      recommendedServices.push("Mobile Device Management Implementation");
    } else if (bt.includes("improper disposal")) {
      gapScore += 12;
      gapCategories.push("Improper Disposal");
      recommendedServices.push("Media Sanitization Policy Development");
      recommendedServices.push("Document Destruction Program");
    } else {
      gapScore += 10;
      gapCategories.push(`Breach Type: ${entity.breachType}`);
      recommendedServices.push("Comprehensive HIPAA Compliance Assessment");
    }

    // ── Recency (up to 20 points) ──
    const submissionDate = new Date(entity.breachSubmissionDate);
    const now = new Date();
    const monthsAgo = Math.floor(
      (now.getTime() - submissionDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
    );
    if (monthsAgo <= 3) {
      gapScore += 20;
      gapCategories.push("Recent Breach (< 3 months)");
    } else if (monthsAgo <= 6) {
      gapScore += 15;
      gapCategories.push("Recent Breach (3-6 months)");
    } else if (monthsAgo <= 12) {
      gapScore += 10;
      gapCategories.push("Within Last Year");
    } else if (monthsAgo <= 24) {
      gapScore += 5;
      gapCategories.push("Within Last 2 Years");
    }
    // Older breaches: 0 recency points

    // ── Business associate involvement (up to 10 points) ──
    if (entity.businessAssociatePresent) {
      gapScore += 10;
      gapCategories.push("Business Associate Involved");
      recommendedServices.push("Business Associate Agreement Review");
      recommendedServices.push("Third-Party Risk Management Program");
    }

    // ── Entity type (up to 10 points) ──
    const ct = entity.coveredEntityType.toLowerCase();
    if (ct.includes("health plan")) {
      gapScore += 10;
      gapCategories.push("Health Plan (Broad Member Exposure)");
      recommendedServices.push("Health Plan Privacy Rule Compliance Review");
    } else if (ct.includes("healthcare clearing")) {
      gapScore += 8;
      gapCategories.push("Healthcare Clearing House");
      recommendedServices.push("Transaction Security Audit");
    } else if (ct.includes("provider")) {
      gapScore += 6;
      gapCategories.push("Healthcare Provider");
      recommendedServices.push("Provider HIPAA Compliance Program");
    } else if (ct.includes("business associate")) {
      gapScore += 7;
      gapCategories.push("Business Associate Entity");
      recommendedServices.push("BA Compliance Obligation Assessment");
    }

    // Always recommend core HIPAA services
    recommendedServices.push("HIPAA Privacy Rule Gap Analysis");
    recommendedServices.push("Breach Notification Compliance Review");

    // Cap at 100
    gapScore = Math.min(gapScore, 100);

    // Risk level
    let riskLevel: HIPAAComplianceGapLead["riskLevel"];
    if (gapScore >= 75) riskLevel = "CRITICAL";
    else if (gapScore >= 55) riskLevel = "HIGH";
    else if (gapScore >= 35) riskLevel = "ELEVATED";
    else riskLevel = "MODERATE";

    // Estimated remediation timeline
    let estimatedRemediation: string;
    if (gapScore >= 75) {
      estimatedRemediation =
        "6-12 months comprehensive HIPAA remediation program";
    } else if (gapScore >= 55) {
      estimatedRemediation = "3-6 months targeted HIPAA remediation";
    } else if (gapScore >= 35) {
      estimatedRemediation = "1-3 months focused HIPAA compliance review";
    } else {
      estimatedRemediation = "< 1 month standard HIPAA compliance check";
    }

    // Deduplicate services
    const uniqueServices = [...new Set(recommendedServices)];

    return {
      entity,
      gapScore,
      gapCategories,
      recommendedServices: uniqueServices,
      estimatedRemediation,
      riskLevel,
    };
  }

  // ─── Full Intelligence Pipeline ─────────────────────────────────────

  /**
   * Run the full HIPAA breach intelligence pipeline.
   * Fetches breach data -> scores entities -> returns ranked leads.
   */
  async runPipeline(
    filters: HHSSearchFilters = {}
  ): Promise<HHSPipelineResult> {
    const entities = await this.fetchBreachData(filters);

    const leads: HIPAAComplianceGapLead[] = entities.map((entity) =>
      this.scoreEntity(entity)
    );

    // Sort by gap score descending
    leads.sort((a, b) => b.gapScore - a.gapScore);

    return {
      leads,
      totalMatched: leads.length,
      filters,
      generatedAt: new Date().toISOString(),
      source:
        "HHS Office for Civil Rights Breach Portal (ocrportal.hhs.gov)",
    };
  }

  // ─── State-level Summary ────────────────────────────────────────────

  /**
   * Get a summary of HIPAA breaches by state.
   * Returns state -> { count, totalAffected } for heatmap rendering.
   */
  async getStateSummary(): Promise<
    Record<string, { count: number; totalAffected: number }>
  > {
    // Fetch all breaches (no state filter, high limit)
    const entities = await this.fetchBreachData({ limit: MAX_LIMIT });

    const summary: Record<string, { count: number; totalAffected: number }> =
      {};
    for (const e of entities) {
      const state = e.state || "UNKNOWN";
      if (!summary[state]) {
        summary[state] = { count: 0, totalAffected: 0 };
      }
      summary[state]!.count += 1;
      summary[state]!.totalAffected += e.individualsAffected;
    }

    return summary;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// HIPAA Gap Report Generator
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Maps HIPAA breach types to recommended remediation service packages.
 */
function mapBreachToServices(lead: HIPAAComplianceGapLead): string[] {
  const services = [...lead.recommendedServices];
  const bt = lead.entity.breachType.toLowerCase();

  // Additional context-specific services
  if (bt.includes("hacking") && lead.entity.individualsAffected >= 100000) {
    services.push("Enterprise Security Operations Center (SOC) Setup");
    services.push("Cyber Insurance Coverage Review");
  }

  if (lead.entity.businessAssociatePresent) {
    services.push("Downstream BAA Compliance Cascade Review");
  }

  const loc = lead.entity.locationOfBreachedInfo.toLowerCase();
  if (loc.includes("email")) {
    services.push("Email Security & Encryption Implementation");
  }
  if (loc.includes("network server")) {
    services.push("Network Segmentation & Access Control Review");
  }
  if (loc.includes("paper") || loc.includes("film")) {
    services.push("Physical Records Security Program");
  }
  if (loc.includes("laptop") || loc.includes("portable")) {
    services.push("Endpoint Encryption & Mobile Device Policy");
  }
  if (loc.includes("electronic medical record") || loc.includes("emr")) {
    services.push("EHR/EMR Access Control & Audit Trail Review");
  }

  return [...new Set(services)];
}

/**
 * Generate a professional HTML HIPAA compliance gap report for a breach entity.
 * Branded with Vernen Legal gold/navy styling.
 */
export function generateHHSGapReportHTML(lead: HIPAAComplianceGapLead): string {
  const { entity, gapScore, gapCategories, estimatedRemediation, riskLevel } =
    lead;

  const allServices = mapBreachToServices(lead);

  const scoreColor =
    gapScore >= 75
      ? "#dc2626"
      : gapScore >= 55
        ? "#ea580c"
        : gapScore >= 35
          ? "#d97706"
          : "#16a34a";

  const categoriesHTML = gapCategories
    .map((c) => `<span class="gap-tag">${sanitize(c)}</span>`)
    .join(" ");

  const servicesHTML = allServices
    .map((s) => `<li>${sanitize(s)}</li>`)
    .join("");

  const locationParts = entity.locationOfBreachedInfo
    .split(",")
    .map((l) => l.trim())
    .filter(Boolean);
  const locationHTML = locationParts
    .map((l) => `<span class="loc-tag">${sanitize(l)}</span>`)
    .join(" ");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>HIPAA Compliance Gap Report — ${sanitize(entity.entityName)}</title>
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
  .loc-tag { display: inline-block; background: rgba(59,130,246,0.15); color: #93c5fd; padding: 4px 12px; border-radius: 16px; font-size: 0.85rem; margin: 4px; }
  .recommendations { background: var(--slate); border-radius: 8px; padding: 1.5rem; border-left: 4px solid var(--gold); }
  .recommendations ul { padding-left: 1.5rem; }
  .recommendations li { margin-bottom: 0.5rem; }
  .breach-detail { background: var(--slate); border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem; }
  .breach-detail .row { display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
  .breach-detail .row:last-child { border-bottom: none; }
  .breach-detail .detail-label { color: var(--muted); font-size: 0.9rem; }
  .breach-detail .detail-value { font-size: 0.9rem; text-align: right; max-width: 60%; }
  .web-desc { background: var(--slate); border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem; border-left: 4px solid rgba(220,38,38,0.4); font-size: 0.9rem; color: var(--muted); line-height: 1.8; }
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
    <div class="subtitle">HIPAA Breach Compliance Gap Report</div>
  </div>

  <div class="entity-card">
    <div>
      <div class="label">Covered Entity</div>
      <div class="value">${sanitize(entity.entityName)}</div>
      <div class="label">State</div>
      <div class="value">${sanitize(entity.state)}</div>
      <div class="label">Entity Type</div>
      <div class="value">${sanitize(entity.coveredEntityType)}</div>
    </div>
    <div>
      <div class="label">Individuals Affected</div>
      <div class="value" style="font-family:monospace; font-size:1.3rem; color:#fca5a5;">${entity.individualsAffected.toLocaleString()}</div>
      <div class="label">Breach Submission Date</div>
      <div class="value">${sanitize(entity.breachSubmissionDate)}</div>
      <div class="label">Business Associate</div>
      <div class="value">${entity.businessAssociatePresent ? '<span class="badge warning">Yes</span>' : '<span class="badge ok">No</span>'}</div>
    </div>
  </div>

  <div class="score-section">
    <div class="score-circle">
      <div class="score-number">${gapScore}</div>
      <div class="score-label">${sanitize(riskLevel)}</div>
    </div>
    <p style="margin-top:1rem; color: var(--muted);">HIPAA Compliance Gap Score — higher indicates greater remediation urgency</p>
    <div style="margin-top:1rem;">${categoriesHTML}</div>
  </div>

  <div class="section">
    <h2>Breach Details</h2>
    <div class="breach-detail">
      <div class="row">
        <span class="detail-label">Type of Breach</span>
        <span class="detail-value"><span class="badge critical">${sanitize(entity.breachType)}</span></span>
      </div>
      <div class="row">
        <span class="detail-label">Location of Breached Information</span>
        <span class="detail-value">${locationHTML || sanitize(entity.locationOfBreachedInfo)}</span>
      </div>
      <div class="row">
        <span class="detail-label">Business Associate Involved</span>
        <span class="detail-value">${entity.businessAssociatePresent ? "Yes" : "No"}</span>
      </div>
      <div class="row">
        <span class="detail-label">Estimated Remediation Timeline</span>
        <span class="detail-value" style="color: var(--gold); font-weight: 600;">${sanitize(estimatedRemediation)}</span>
      </div>
    </div>
  </div>

  ${entity.webDescription ? `
  <div class="section">
    <h2>Breach Description (Public Record)</h2>
    <div class="web-desc">${sanitize(entity.webDescription)}</div>
  </div>` : ""}

  <div class="section">
    <h2>Recommended HIPAA Compliance Services</h2>
    <div class="recommendations">
      <ul>${servicesHTML}</ul>
      <p style="margin-top: 1rem; color: var(--muted);">Estimated remediation timeline: <strong style="color: var(--text);">${sanitize(estimatedRemediation)}</strong></p>
    </div>
  </div>

  <div class="cta">
    <p style="margin-bottom: 1rem; font-size: 1.1rem;">Ready to close these HIPAA compliance gaps?</p>
    <a href="https://compliance.vernenlegal.com/api/regulis/check">Start Your HIPAA Compliance Review</a>
    <p style="margin-top: 1rem; color: var(--muted);">Powered by 745+ compliance rules across all 50 states</p>
  </div>

  <div class="footer">
    <p>Generated by Vernen Legal Compliance — ${new Date().toISOString().split("T")[0]}</p>
    <p>Data source: HHS Office for Civil Rights Breach Portal (ocrportal.hhs.gov) — Public record</p>
    <p class="disclaimer">This report is generated from publicly available HHS breach report data and is provided for informational purposes only. It does not constitute legal advice, an audit opinion, or a professional engagement. Consult qualified HIPAA compliance professionals for remediation.</p>
  </div>

</div>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// D1 Storage — Cache HHS breach leads locally for fast access
// ═══════════════════════════════════════════════════════════════════════════

export async function ensureHHSTables(db: D1Database): Promise<void> {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS hhs_breach_leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      entity_name TEXT NOT NULL,
      state TEXT,
      covered_entity_type TEXT,
      individuals_affected INTEGER DEFAULT 0,
      breach_submission_date TEXT,
      breach_type TEXT,
      location_of_breached_info TEXT,
      business_associate_present INTEGER DEFAULT 0,
      web_description TEXT DEFAULT '',
      gap_score INTEGER DEFAULT 0,
      gap_categories TEXT DEFAULT '[]',
      recommended_services TEXT DEFAULT '[]',
      risk_level TEXT DEFAULT 'MODERATE',
      estimated_remediation TEXT DEFAULT '',
      status TEXT DEFAULT 'new',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      UNIQUE(entity_name, breach_submission_date)
    );

    CREATE INDEX IF NOT EXISTS idx_hhs_leads_state ON hhs_breach_leads(state);
    CREATE INDEX IF NOT EXISTS idx_hhs_leads_score ON hhs_breach_leads(gap_score DESC);
    CREATE INDEX IF NOT EXISTS idx_hhs_leads_status ON hhs_breach_leads(status);
    CREATE INDEX IF NOT EXISTS idx_hhs_leads_affected ON hhs_breach_leads(individuals_affected DESC);
  `);
}

export async function storeBreachLead(
  db: D1Database,
  lead: HIPAAComplianceGapLead
): Promise<void> {
  await db
    .prepare(
      `
    INSERT OR REPLACE INTO hhs_breach_leads
    (entity_name, state, covered_entity_type, individuals_affected,
     breach_submission_date, breach_type, location_of_breached_info,
     business_associate_present, web_description,
     gap_score, gap_categories, recommended_services,
     risk_level, estimated_remediation, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
  `
    )
    .bind(
      lead.entity.entityName,
      lead.entity.state,
      lead.entity.coveredEntityType,
      lead.entity.individualsAffected,
      lead.entity.breachSubmissionDate,
      lead.entity.breachType,
      lead.entity.locationOfBreachedInfo,
      lead.entity.businessAssociatePresent ? 1 : 0,
      lead.entity.webDescription,
      lead.gapScore,
      JSON.stringify(lead.gapCategories),
      JSON.stringify(lead.recommendedServices),
      lead.riskLevel,
      lead.estimatedRemediation
    )
    .run();
}

export async function getStoredBreachLeads(
  db: D1Database,
  filters: {
    state?: string;
    minScore?: number;
    status?: string;
    minAffected?: number;
    limit?: number;
  }
): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM hhs_breach_leads WHERE 1=1";
  const binds: unknown[] = [];

  if (filters.state) {
    query += " AND state = ?";
    binds.push(filters.state.toUpperCase());
  }
  if (filters.minScore) {
    query += " AND gap_score >= ?";
    binds.push(filters.minScore);
  }
  if (filters.status) {
    query += " AND status = ?";
    binds.push(filters.status);
  }
  if (filters.minAffected) {
    query += " AND individuals_affected >= ?";
    binds.push(filters.minAffected);
  }

  query += " ORDER BY gap_score DESC LIMIT ?";
  binds.push(filters.limit ?? 50);

  const result = await db.prepare(query).bind(...binds).all();
  return result.results as Record<string, unknown>[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Errors
// ═══════════════════════════════════════════════════════════════════════════

export class HHSApiError extends Error {
  constructor(
    public status: number,
    public body: string
  ) {
    super(`HHS portal error ${status}: ${body}`);
    this.name = "HHSApiError";
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

import type { Client } from "../types/client.js";
import type {
  ComplianceCheckResult,
  ComplianceReport,
} from "../types/compliance.js";
import { ComplianceStatus } from "../types/compliance.js";
import { generateId, formatDate, sanitizeInput } from "../utils/helpers.js";

/**
 * ReportGenerator -- Produces compliance reports from check results.
 * Supports HTML and JSON output formats.
 */
export class ReportGenerator {
  /**
   * Generate a ComplianceReport from check results and client data.
   */
  generate(
    results: ComplianceCheckResult[],
    client: Client
  ): ComplianceReport {
    return {
      id: generateId("rpt"),
      clientId: client.id,
      states: client.states,
      entityType: client.entityType,
      results,
      generatedAt: new Date().toISOString(),
      generatedBy: "REGULIS",
    };
  }

  /**
   * Calculate a compliance score as a percentage.
   * Score = (COMPLIANT + NOT_APPLICABLE) / total * 100
   */
  calculateScore(results: ComplianceCheckResult[]): number {
    if (results.length === 0) return 100;

    const passing = results.filter(
      (r) =>
        r.status === ComplianceStatus.COMPLIANT ||
        r.status === ComplianceStatus.NOT_APPLICABLE
    ).length;

    return Math.round((passing / results.length) * 100);
  }

  /**
   * Format a compliance report as a professional HTML document
   * with Vernen Legal Compliance branding.
   */
  formatAsHTML(report: ComplianceReport): string {
    const compliant = report.results.filter(
      (r) => r.status === ComplianceStatus.COMPLIANT
    ).length;
    const nonCompliant = report.results.filter(
      (r) => r.status === ComplianceStatus.NON_COMPLIANT
    ).length;
    const needsReview = report.results.filter(
      (r) => r.status === ComplianceStatus.NEEDS_REVIEW
    ).length;
    const notApplicable = report.results.filter(
      (r) => r.status === ComplianceStatus.NOT_APPLICABLE
    ).length;

    const score = this.calculateScore(report.results);
    const scoreColor =
      score >= 80 ? "#2d6a4f" : score >= 50 ? "#b45309" : "#991b1b";

    // Group results by category (extracted from ruleId prefix or details)
    const grouped = this.groupByCategory(report.results);

    const categoryBlocks = Object.entries(grouped)
      .map(
        ([category, items]) => `
      <div class="category-section">
        <h3 class="category-header">${sanitizeInput(category)}</h3>
        <table class="findings-table">
          <thead>
            <tr>
              <th style="width:15%">Rule ID</th>
              <th style="width:12%">Status</th>
              <th style="width:35%">Details</th>
              <th style="width:28%">Remediation</th>
              <th style="width:10%">Deadline</th>
            </tr>
          </thead>
          <tbody>
            ${items
              .map(
                (r) => `
            <tr>
              <td><code>${sanitizeInput(r.ruleId)}</code></td>
              <td><span class="status-badge status-${r.status.toLowerCase().replace("_", "-")}">${this.formatStatus(r.status)}</span></td>
              <td>${sanitizeInput(r.details)}</td>
              <td>${sanitizeInput(r.remediation)}</td>
              <td>${r.deadline ? sanitizeInput(r.deadline) : "&mdash;"}</td>
            </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>`
      )
      .join("");

    // Remediation summary: collect unique remediations for non-compliant/needs-review items
    const actionItems = report.results
      .filter(
        (r) =>
          r.status === ComplianceStatus.NON_COMPLIANT ||
          r.status === ComplianceStatus.NEEDS_REVIEW
      )
      .map((r) => r.remediation)
      .filter((v, i, arr) => arr.indexOf(v) === i);

    const remediationList = actionItems.length > 0
      ? actionItems
          .map((item) => `<li>${sanitizeInput(item)}</li>`)
          .join("")
      : "<li>No immediate action items identified.</li>";

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Compliance Report - ${sanitizeInput(report.id)}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Georgia', 'Times New Roman', serif;
      color: #1a2744;
      background: #f8f9fa;
      line-height: 1.6;
    }
    .report-container {
      max-width: 960px;
      margin: 0 auto;
      background: #ffffff;
      box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    }

    /* Header */
    .report-header {
      background: #1a2744;
      color: #ffffff;
      padding: 2rem 2.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .report-header h1 {
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
    .report-header .brand-accent {
      color: #c8a951;
    }
    .report-header .report-meta {
      text-align: right;
      font-size: 0.85rem;
      opacity: 0.85;
    }

    /* Client Info */
    .client-info {
      padding: 1.5rem 2.5rem;
      background: #f0f2f5;
      border-bottom: 2px solid #c8a951;
      display: flex;
      gap: 2.5rem;
      flex-wrap: wrap;
    }
    .client-info .info-item {
      font-size: 0.9rem;
    }
    .client-info .info-label {
      font-weight: 700;
      color: #1a2744;
      text-transform: uppercase;
      font-size: 0.7rem;
      letter-spacing: 1px;
      display: block;
      margin-bottom: 0.15rem;
    }

    /* Score Section */
    .score-section {
      padding: 2rem 2.5rem;
      display: flex;
      align-items: center;
      gap: 2.5rem;
      border-bottom: 1px solid #e5e7eb;
    }
    .score-circle {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: 700;
      color: #ffffff;
      flex-shrink: 0;
    }
    .score-details h2 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      color: #1a2744;
    }

    /* Summary Cards */
    .summary-cards {
      padding: 1.5rem 2.5rem;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      border-bottom: 1px solid #e5e7eb;
    }
    .summary-card {
      padding: 1rem;
      border-radius: 6px;
      text-align: center;
    }
    .summary-card .count {
      font-size: 2rem;
      font-weight: 700;
      display: block;
    }
    .summary-card .label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 600;
    }
    .card-compliant { background: #d1fae5; color: #065f46; }
    .card-non-compliant { background: #fee2e2; color: #991b1b; }
    .card-needs-review { background: #fef3c7; color: #92400e; }
    .card-not-applicable { background: #e5e7eb; color: #4b5563; }

    /* Findings */
    .findings-section {
      padding: 2rem 2.5rem;
    }
    .findings-section > h2 {
      font-size: 1.2rem;
      margin-bottom: 1.5rem;
      color: #1a2744;
      border-bottom: 2px solid #c8a951;
      padding-bottom: 0.5rem;
    }
    .category-section {
      margin-bottom: 2rem;
    }
    .category-header {
      font-size: 1rem;
      color: #1a2744;
      background: #f0f2f5;
      padding: 0.5rem 1rem;
      border-left: 4px solid #c8a951;
      margin-bottom: 0.75rem;
    }
    .findings-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.85rem;
    }
    .findings-table th {
      background: #1a2744;
      color: #ffffff;
      padding: 0.6rem 0.75rem;
      text-align: left;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .findings-table td {
      padding: 0.6rem 0.75rem;
      border-bottom: 1px solid #e5e7eb;
      vertical-align: top;
    }
    .findings-table tr:hover td {
      background: #f9fafb;
    }
    .findings-table code {
      font-family: 'Courier New', monospace;
      font-size: 0.8rem;
      background: #f0f2f5;
      padding: 0.1rem 0.3rem;
      border-radius: 3px;
    }

    /* Status Badges */
    .status-badge {
      display: inline-block;
      padding: 0.2rem 0.5rem;
      border-radius: 3px;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
    }
    .status-compliant { background: #d1fae5; color: #065f46; }
    .status-non-compliant { background: #fee2e2; color: #991b1b; }
    .status-needs-review { background: #fef3c7; color: #92400e; }
    .status-not-applicable { background: #e5e7eb; color: #4b5563; }

    /* Remediation */
    .remediation-section {
      padding: 1.5rem 2.5rem;
      border-top: 1px solid #e5e7eb;
    }
    .remediation-section h2 {
      font-size: 1.2rem;
      margin-bottom: 1rem;
      color: #1a2744;
      border-bottom: 2px solid #c8a951;
      padding-bottom: 0.5rem;
    }
    .remediation-section ol {
      padding-left: 1.5rem;
    }
    .remediation-section li {
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }

    /* Footer */
    .report-footer {
      background: #1a2744;
      color: #ffffff;
      padding: 1.5rem 2.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.8rem;
    }
    .report-footer .footer-brand {
      color: #c8a951;
      font-weight: 700;
    }
    .report-footer .footer-legal {
      opacity: 0.7;
      font-size: 0.7rem;
      max-width: 400px;
      text-align: right;
    }

    @media print {
      body { background: #fff; }
      .report-container { box-shadow: none; }
      .findings-table th { background: #1a2744 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="report-container">

    <!-- Header -->
    <div class="report-header">
      <div>
        <h1>Vernen Legal <span class="brand-accent">Compliance&trade;</span></h1>
        <div style="font-size:0.85rem; margin-top:0.25rem; opacity:0.8;">Regulatory Compliance Report</div>
      </div>
      <div class="report-meta">
        <div>Report ID: ${sanitizeInput(report.id)}</div>
        <div>${formatDate(report.generatedAt)}</div>
      </div>
    </div>

    <!-- Client Info -->
    <div class="client-info">
      <div class="info-item">
        <span class="info-label">Client</span>
        ${sanitizeInput(report.clientId)}
      </div>
      <div class="info-item">
        <span class="info-label">Entity Type</span>
        ${sanitizeInput(report.entityType)}
      </div>
      <div class="info-item">
        <span class="info-label">Jurisdictions</span>
        ${report.states.map((s) => sanitizeInput(s)).join(", ")}
      </div>
      <div class="info-item">
        <span class="info-label">Rules Analyzed</span>
        ${report.results.length}
      </div>
    </div>

    <!-- Compliance Score -->
    <div class="score-section">
      <div class="score-circle" style="background:${scoreColor}">
        ${score}%
      </div>
      <div class="score-details">
        <h2>Compliance Score</h2>
        <p>${this.getScoreSummary(score, nonCompliant, needsReview)}</p>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="summary-cards">
      <div class="summary-card card-compliant">
        <span class="count">${compliant}</span>
        <span class="label">Compliant</span>
      </div>
      <div class="summary-card card-non-compliant">
        <span class="count">${nonCompliant}</span>
        <span class="label">Non-Compliant</span>
      </div>
      <div class="summary-card card-needs-review">
        <span class="count">${needsReview}</span>
        <span class="label">Needs Review</span>
      </div>
      <div class="summary-card card-not-applicable">
        <span class="count">${notApplicable}</span>
        <span class="label">Not Applicable</span>
      </div>
    </div>

    <!-- Detailed Findings -->
    <div class="findings-section">
      <h2>Detailed Findings</h2>
      ${report.results.length > 0 ? categoryBlocks : "<p>No compliance rules were found for the specified criteria.</p>"}
    </div>

    <!-- Remediation Recommendations -->
    <div class="remediation-section">
      <h2>Remediation Recommendations</h2>
      <ol>
        ${remediationList}
      </ol>
    </div>

    <!-- Footer -->
    <div class="report-footer">
      <div>
        Generated by <span class="footer-brand">REGULIS&trade;</span>
        &nbsp;&bull;&nbsp; &copy; ${new Date().getFullYear()} Vernen Legal Compliance&trade;
      </div>
      <div class="footer-legal">
        This report is for informational purposes and does not constitute legal advice.
        Consult a licensed attorney for compliance guidance specific to your situation.
      </div>
    </div>

  </div>
</body>
</html>`;
  }

  /**
   * Format a compliance report as structured JSON for API consumers.
   */
  formatAsJSON(report: ComplianceReport): string {
    const score = this.calculateScore(report.results);

    const summary = {
      compliant: report.results.filter(
        (r) => r.status === ComplianceStatus.COMPLIANT
      ).length,
      nonCompliant: report.results.filter(
        (r) => r.status === ComplianceStatus.NON_COMPLIANT
      ).length,
      needsReview: report.results.filter(
        (r) => r.status === ComplianceStatus.NEEDS_REVIEW
      ).length,
      notApplicable: report.results.filter(
        (r) => r.status === ComplianceStatus.NOT_APPLICABLE
      ).length,
    };

    const grouped = this.groupByCategory(report.results);

    return JSON.stringify(
      {
        report: {
          id: report.id,
          clientId: report.clientId,
          entityType: report.entityType,
          states: report.states,
          generatedAt: report.generatedAt,
          generatedBy: report.generatedBy,
        },
        complianceScore: score,
        summary,
        totalRules: report.results.length,
        findingsByCategory: grouped,
        results: report.results,
      },
      null,
      2
    );
  }

  /**
   * Format a compliance report as PDF.
   * Stub -- will integrate with a PDF generation service.
   */
  formatAsPDF(_report: ComplianceReport): Uint8Array {
    return new Uint8Array(0);
  }

  // -- Private helpers --

  private formatStatus(status: ComplianceStatus): string {
    const labels: Record<ComplianceStatus, string> = {
      [ComplianceStatus.COMPLIANT]: "Compliant",
      [ComplianceStatus.NON_COMPLIANT]: "Non-Compliant",
      [ComplianceStatus.NEEDS_REVIEW]: "Needs Review",
      [ComplianceStatus.NOT_APPLICABLE]: "N/A",
    };
    return labels[status];
  }

  private getScoreSummary(
    score: number,
    nonCompliant: number,
    needsReview: number
  ): string {
    if (score === 100) {
      return "All applicable rules are verified as compliant. No action items identified.";
    }
    if (score >= 80) {
      return `Good standing. ${nonCompliant} non-compliant finding(s) and ${needsReview} item(s) requiring review.`;
    }
    if (score >= 50) {
      return `Moderate risk. ${nonCompliant} non-compliant finding(s) and ${needsReview} item(s) requiring immediate review.`;
    }
    return `High risk. ${nonCompliant} non-compliant finding(s) and ${needsReview} item(s) requiring urgent attention.`;
  }

  private groupByCategory(
    results: ComplianceCheckResult[]
  ): Record<string, ComplianceCheckResult[]> {
    const grouped: Record<string, ComplianceCheckResult[]> = {};

    for (const result of results) {
      // Extract category from the rule ID prefix or use "General"
      const category = this.extractCategory(result.ruleId);
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(result);
    }

    return grouped;
  }

  private extractCategory(ruleId: string): string {
    // Rule IDs may contain category hints like "FED-TAX-001" or "CA-EMP-003"
    const parts = ruleId.split("-");
    if (parts.length >= 2) {
      const categoryMap: Record<string, string> = {
        FORM: "Formation",
        TAX: "Taxation",
        EMP: "Employment",
        LIC: "Licensing",
        RPT: "Reporting",
        PRIV: "Privacy",
        INS: "Insurance",
      };
      // Check second or third segment for category codes
      for (const part of parts.slice(1)) {
        if (categoryMap[part]) {
          return categoryMap[part];
        }
      }
    }
    return "General";
  }
}

/**
 * PDF Generator — Pure TypeScript PDF creation for Cloudflare Workers.
 * No external dependencies. Generates valid PDF 1.4 documents.
 *
 * Used by REGULIS for compliance report PDF export and LEXARC for legal documents.
 */

import type { ComplianceReport, ComplianceCheckResult } from "../types/compliance.js";
import { ComplianceStatus } from "../types/compliance.js";
import { formatDate } from "../utils/helpers.js";

/**
 * Lightweight PDF builder.
 * Supports: text, lines, rectangles, fonts (Helvetica family), multi-page.
 */
class PDFBuilder {
  private objects: string[] = [];
  private pages: number[] = [];
  private pageContents: string[] = [];
  private currentPage = "";
  private cursorY = 750;
  private pageWidth = 595.28; // A4
  private pageHeight = 841.89;
  private marginLeft = 50;
  private marginRight = 545;
  private marginTop = 790;
  private marginBottom = 50;
  private fontSize = 10;
  private fontName = "/F1";

  constructor() {
    this.newPage();
  }

  /** Start a new page */
  newPage(): void {
    if (this.currentPage) {
      this.pageContents.push(this.currentPage);
    }
    this.currentPage = "";
    this.cursorY = this.marginTop;
  }

  /** Set font: F1=Helvetica, F2=Helvetica-Bold, F3=Helvetica-Oblique */
  setFont(font: "F1" | "F2" | "F3", size: number): void {
    this.fontName = `/${font}`;
    this.fontSize = size;
    this.currentPage += `BT ${this.fontName} ${size} Tf ET\n`;
  }

  /** Draw text at current cursor position */
  text(content: string, x?: number): void {
    if (this.cursorY < this.marginBottom + 20) {
      this.newPage();
    }
    const xPos = x ?? this.marginLeft;
    const escaped = this.escapeText(content);
    this.currentPage += `BT ${this.fontName} ${this.fontSize} Tf ${xPos} ${this.cursorY} Td (${escaped}) Tj ET\n`;
    this.cursorY -= this.fontSize * 1.4;
  }

  /** Draw text with color */
  textColor(content: string, r: number, g: number, b: number, x?: number): void {
    if (this.cursorY < this.marginBottom + 20) {
      this.newPage();
    }
    const xPos = x ?? this.marginLeft;
    const escaped = this.escapeText(content);
    this.currentPage += `BT ${r} ${g} ${b} rg ${this.fontName} ${this.fontSize} Tf ${xPos} ${this.cursorY} Td (${escaped}) Tj 0 0 0 rg ET\n`;
    this.cursorY -= this.fontSize * 1.4;
  }

  /** Draw a horizontal line */
  line(y?: number, x1?: number, x2?: number): void {
    const yPos = y ?? this.cursorY;
    this.currentPage += `${x1 ?? this.marginLeft} ${yPos} m ${x2 ?? this.marginRight} ${yPos} l S\n`;
    if (!y) this.cursorY -= 8;
  }

  /** Draw a filled rectangle */
  rect(x: number, y: number, w: number, h: number, r: number, g: number, b: number): void {
    this.currentPage += `${r} ${g} ${b} rg ${x} ${y} ${w} ${h} re f 0 0 0 rg\n`;
  }

  /** Add vertical space */
  space(pts: number): void {
    this.cursorY -= pts;
    if (this.cursorY < this.marginBottom + 20) {
      this.newPage();
    }
  }

  /** Get remaining vertical space on current page */
  get remainingSpace(): number {
    return this.cursorY - this.marginBottom;
  }

  /** Wrap and render a long line of text */
  wrappedText(content: string, maxWidth?: number, x?: number): void {
    const max = maxWidth ?? (this.marginRight - this.marginLeft);
    const approxCharsPerLine = Math.floor(max / (this.fontSize * 0.5));
    const words = content.split(" ");
    let line = "";

    for (const word of words) {
      const test = line ? line + " " + word : word;
      if (test.length > approxCharsPerLine && line) {
        this.text(line, x);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) {
      this.text(line, x);
    }
  }

  /** Build the final PDF as Uint8Array */
  build(): Uint8Array {
    // Finalize last page
    if (this.currentPage) {
      this.pageContents.push(this.currentPage);
    }

    const objects: string[] = [];
    const offsets: number[] = [];
    let body = "";

    // Helper to add an object
    const addObj = (content: string): number => {
      const num = objects.length + 1;
      objects.push(content);
      return num;
    };

    // Object 1: Catalog
    addObj("<<\n/Type /Catalog\n/Pages 2 0 R\n>>");

    // Object 2: Pages (placeholder, updated after page creation)
    const pagesObjNum = addObj("PLACEHOLDER");

    // Object 3: Font Helvetica
    addObj("<<\n/Type /Font\n/Subtype /Type1\n/BaseFont /Helvetica\n/Encoding /WinAnsiEncoding\n>>");
    // Object 4: Font Helvetica-Bold
    addObj("<<\n/Type /Font\n/Subtype /Type1\n/BaseFont /Helvetica-Bold\n/Encoding /WinAnsiEncoding\n>>");
    // Object 5: Font Helvetica-Oblique
    addObj("<<\n/Type /Font\n/Subtype /Type1\n/BaseFont /Helvetica-Oblique\n/Encoding /WinAnsiEncoding\n>>");

    // Create page objects
    const pageObjNums: number[] = [];
    for (const content of this.pageContents) {
      // Content stream
      const streamBytes = new TextEncoder().encode(content);
      const streamObj = addObj(
        `<<\n/Length ${streamBytes.length}\n>>\nstream\n${content}endstream`
      );

      // Page object
      const pageObj = addObj(
        `<<\n/Type /Page\n/Parent 2 0 R\n/MediaBox [0 0 ${this.pageWidth} ${this.pageHeight}]\n` +
        `/Contents ${streamObj} 0 R\n` +
        `/Resources <<\n/Font <<\n/F1 3 0 R\n/F2 4 0 R\n/F3 5 0 R\n>>\n>>\n>>`
      );
      pageObjNums.push(pageObj);
    }

    // Update Pages object
    const kids = pageObjNums.map((n) => `${n} 0 R`).join(" ");
    objects[pagesObjNum - 1] =
      `<<\n/Type /Pages\n/Kids [${kids}]\n/Count ${pageObjNums.length}\n>>`;

    // Build PDF
    body = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";

    for (let i = 0; i < objects.length; i++) {
      offsets.push(body.length);
      body += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
    }

    // Cross-reference table
    const xrefOffset = body.length;
    body += `xref\n0 ${objects.length + 1}\n`;
    body += "0000000000 65535 f \n";
    for (const offset of offsets) {
      body += `${String(offset).padStart(10, "0")} 00000 n \n`;
    }

    // Trailer
    body += `trailer\n<<\n/Size ${objects.length + 1}\n/Root 1 0 R\n>>\nstartxref\n${xrefOffset}\n%%EOF\n`;

    return new TextEncoder().encode(body);
  }

  private escapeText(text: string): string {
    return text
      .replace(/\\/g, "\\\\")
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)")
      .replace(/[^\x20-\x7E]/g, "?"); // Replace non-ASCII with ?
  }
}

/**
 * Generate a compliance report as a PDF document.
 */
export function generateComplianceReportPDF(report: ComplianceReport): Uint8Array {
  const pdf = new PDFBuilder();

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

  const score = report.results.length > 0
    ? Math.round(
        (report.results.filter(
          (r) =>
            r.status === ComplianceStatus.COMPLIANT ||
            r.status === ComplianceStatus.NOT_APPLICABLE
        ).length /
          report.results.length) *
          100
      )
    : 100;

  // --- Header Band ---
  pdf.rect(0, 800, 595.28, 42, 0.102, 0.153, 0.267); // Navy bar
  pdf.setFont("F2", 16);
  pdf.textColor("Vernen Legal Compliance", 1, 1, 1, 50);
  pdf.setFont("F1", 9);
  pdf.textColor("Regulatory Compliance Report", 0.78, 0.66, 0.32, 50);

  // Report ID + date right-aligned
  pdf.setFont("F1", 8);
  pdf.textColor(`Report: ${report.id}`, 0.8, 0.8, 0.8, 400);
  pdf.setFont("F1", 8);
  pdf.textColor(formatDate(report.generatedAt), 0.8, 0.8, 0.8, 400);

  pdf.space(8);
  pdf.line();
  pdf.space(4);

  // --- Client Info ---
  pdf.setFont("F2", 10);
  pdf.text("CLIENT INFORMATION");
  pdf.space(4);
  pdf.setFont("F1", 9);
  pdf.text(`Client ID: ${report.clientId}`);
  pdf.text(`Entity Type: ${report.entityType}`);
  pdf.text(`Jurisdictions: ${report.states.join(", ")}`);
  pdf.text(`Rules Analyzed: ${report.results.length}`);
  pdf.text(`Generated: ${formatDate(report.generatedAt)} by ${report.generatedBy}`);

  pdf.space(8);
  pdf.line();
  pdf.space(8);

  // --- Compliance Score ---
  pdf.setFont("F2", 14);
  if (score >= 80) {
    pdf.textColor(`Compliance Score: ${score}%`, 0.18, 0.42, 0.31);
  } else if (score >= 50) {
    pdf.textColor(`Compliance Score: ${score}%`, 0.71, 0.33, 0.04);
  } else {
    pdf.textColor(`Compliance Score: ${score}%`, 0.6, 0.11, 0.11);
  }

  pdf.space(4);
  pdf.setFont("F1", 9);
  pdf.text(
    score === 100
      ? "All applicable rules are verified as compliant."
      : score >= 80
        ? `Good standing. ${nonCompliant} non-compliant, ${needsReview} needs review.`
        : score >= 50
          ? `Moderate risk. ${nonCompliant} non-compliant, ${needsReview} needs review.`
          : `High risk. ${nonCompliant} non-compliant, ${needsReview} needs urgent attention.`
  );

  pdf.space(8);

  // --- Summary ---
  pdf.setFont("F2", 10);
  pdf.text("SUMMARY");
  pdf.space(4);
  pdf.setFont("F1", 9);
  pdf.textColor(`  Compliant: ${compliant}`, 0.02, 0.37, 0.27);
  pdf.textColor(`  Non-Compliant: ${nonCompliant}`, 0.6, 0.11, 0.11);
  pdf.textColor(`  Needs Review: ${needsReview}`, 0.57, 0.25, 0.05);
  pdf.text(`  Not Applicable: ${notApplicable}`);

  pdf.space(8);
  pdf.line();
  pdf.space(8);

  // --- Detailed Findings ---
  pdf.setFont("F2", 12);
  pdf.text("DETAILED FINDINGS");
  pdf.space(8);

  // Group by category
  const grouped = groupByCategory(report.results);

  for (const [category, items] of Object.entries(grouped)) {
    if (pdf.remainingSpace < 60) pdf.newPage();

    pdf.setFont("F2", 10);
    pdf.textColor(category, 0.102, 0.153, 0.267);
    pdf.space(4);

    for (const item of items) {
      if (pdf.remainingSpace < 50) pdf.newPage();

      const statusLabel = formatStatusLabel(item.status);
      pdf.setFont("F2", 8);

      if (item.status === ComplianceStatus.NON_COMPLIANT) {
        pdf.textColor(`[${statusLabel}] ${item.ruleId}`, 0.6, 0.11, 0.11);
      } else if (item.status === ComplianceStatus.NEEDS_REVIEW) {
        pdf.textColor(`[${statusLabel}] ${item.ruleId}`, 0.57, 0.25, 0.05);
      } else if (item.status === ComplianceStatus.COMPLIANT) {
        pdf.textColor(`[${statusLabel}] ${item.ruleId}`, 0.02, 0.37, 0.27);
      } else {
        pdf.text(`[${statusLabel}] ${item.ruleId}`);
      }

      pdf.setFont("F1", 8);
      pdf.wrappedText(`  ${item.details}`, 470, 60);

      if (
        item.status === ComplianceStatus.NON_COMPLIANT ||
        item.status === ComplianceStatus.NEEDS_REVIEW
      ) {
        pdf.setFont("F3", 8);
        pdf.wrappedText(`  Remediation: ${item.remediation}`, 460, 60);
        if (item.deadline) {
          pdf.text(`  Deadline: ${item.deadline}`, 60);
        }
      }
      pdf.space(4);
    }

    pdf.space(6);
  }

  // --- Remediation Summary ---
  const actionItems = report.results
    .filter(
      (r) =>
        r.status === ComplianceStatus.NON_COMPLIANT ||
        r.status === ComplianceStatus.NEEDS_REVIEW
    )
    .map((r) => r.remediation)
    .filter((v, i, arr) => arr.indexOf(v) === i);

  if (actionItems.length > 0) {
    if (pdf.remainingSpace < 80) pdf.newPage();

    pdf.space(4);
    pdf.line();
    pdf.space(8);
    pdf.setFont("F2", 12);
    pdf.text("REMEDIATION RECOMMENDATIONS");
    pdf.space(8);

    pdf.setFont("F1", 9);
    actionItems.forEach((item, i) => {
      if (pdf.remainingSpace < 30) pdf.newPage();
      pdf.wrappedText(`${i + 1}. ${item}`);
      pdf.space(2);
    });
  }

  // --- Footer ---
  if (pdf.remainingSpace < 60) pdf.newPage();
  pdf.space(12);
  pdf.line();
  pdf.space(6);
  pdf.setFont("F3", 7);
  pdf.text(
    "This report is generated by REGULIS and is for informational purposes only."
  );
  pdf.text(
    "It does not constitute legal advice. Consult a licensed attorney for compliance guidance."
  );
  pdf.space(4);
  pdf.setFont("F2", 7);
  pdf.textColor(
    `(c) ${new Date().getFullYear()} Vernen Legal Compliance  |  Powered by REGULIS`,
    0.78,
    0.66,
    0.32
  );

  return pdf.build();
}

function groupByCategory(
  results: ComplianceCheckResult[]
): Record<string, ComplianceCheckResult[]> {
  const grouped: Record<string, ComplianceCheckResult[]> = {};
  const categoryMap: Record<string, string> = {
    FORM: "Formation",
    TAX: "Taxation",
    EMP: "Employment",
    LIC: "Licensing",
    RPT: "Reporting",
    PRIV: "Privacy",
    INS: "Insurance",
  };

  for (const result of results) {
    const parts = result.ruleId.split("-");
    let category = "General";
    for (const part of parts.slice(1)) {
      if (categoryMap[part]) {
        category = categoryMap[part];
        break;
      }
    }
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push(result);
  }

  return grouped;
}

function formatStatusLabel(status: ComplianceStatus): string {
  const labels: Record<ComplianceStatus, string> = {
    [ComplianceStatus.COMPLIANT]: "COMPLIANT",
    [ComplianceStatus.NON_COMPLIANT]: "NON-COMPLIANT",
    [ComplianceStatus.NEEDS_REVIEW]: "NEEDS REVIEW",
    [ComplianceStatus.NOT_APPLICABLE]: "N/A",
  };
  return labels[status];
}

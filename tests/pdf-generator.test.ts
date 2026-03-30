import { describe, it, expect } from "vitest";
import { generateComplianceReportPDF } from "../src/services/pdf-generator.js";
import { ComplianceStatus } from "../src/types/compliance.js";
import { BusinessEntityType, USState } from "../src/types/client.js";

function makeReport(overrides: Partial<Parameters<typeof generateComplianceReportPDF>[0]> = {}) {
  return {
    id: "rpt_test123",
    clientId: "cli_abc",
    states: [USState.CA, USState.NY] as USState[],
    entityType: BusinessEntityType.LLC,
    results: [
      {
        ruleId: "CA-TAX-001",
        status: ComplianceStatus.COMPLIANT,
        details: "California franchise tax filing requirement met",
        remediation: "No action needed",
      },
      {
        ruleId: "CA-EMP-002",
        status: ComplianceStatus.NON_COMPLIANT,
        details: "Missing required workplace poster in California",
        remediation: "Purchase and display Cal/OSHA workplace poster",
        deadline: "30 days",
      },
      {
        ruleId: "NY-FORM-001",
        status: ComplianceStatus.NEEDS_REVIEW,
        details: "New York biennial statement may be due",
        remediation: "Verify filing date with NY DOS",
      },
      {
        ruleId: "FED-TAX-003",
        status: ComplianceStatus.NOT_APPLICABLE,
        details: "S-Corp election requirements do not apply to LLC",
        remediation: "N/A",
      },
    ],
    generatedAt: "2026-03-16T10:00:00Z",
    generatedBy: "REGULIS",
    ...overrides,
  };
}

describe("PDF Generator", () => {
  it("generates a valid PDF with correct header", () => {
    const report = makeReport();
    const pdf = generateComplianceReportPDF(report);

    expect(pdf).toBeInstanceOf(Uint8Array);
    expect(pdf.length).toBeGreaterThan(100);

    const text = new TextDecoder().decode(pdf);
    expect(text).toContain("%PDF-1.4");
    expect(text).toContain("%%EOF");
  });

  it("contains report metadata in the PDF", () => {
    const report = makeReport();
    const pdf = generateComplianceReportPDF(report);
    const text = new TextDecoder().decode(pdf);

    expect(text).toContain("rpt_test123");
    expect(text).toContain("Vernen Legal Compliance");
    expect(text).toContain("REGULIS");
  });

  it("includes compliance score", () => {
    const report = makeReport();
    const pdf = generateComplianceReportPDF(report);
    const text = new TextDecoder().decode(pdf);

    // 1 compliant + 1 N/A out of 4 = 50%
    expect(text).toContain("50%");
  });

  it("includes status labels for findings", () => {
    const report = makeReport();
    const pdf = generateComplianceReportPDF(report);
    const text = new TextDecoder().decode(pdf);

    expect(text).toContain("COMPLIANT");
    expect(text).toContain("NON-COMPLIANT");
    expect(text).toContain("NEEDS REVIEW");
  });

  it("includes remediation recommendations", () => {
    const report = makeReport();
    const pdf = generateComplianceReportPDF(report);
    const text = new TextDecoder().decode(pdf);

    expect(text).toContain("REMEDIATION RECOMMENDATIONS");
    expect(text).toContain("Cal/OSHA");
  });

  it("handles empty results", () => {
    const report = makeReport({ results: [] });
    const pdf = generateComplianceReportPDF(report);

    expect(pdf).toBeInstanceOf(Uint8Array);
    expect(pdf.length).toBeGreaterThan(100);

    const text = new TextDecoder().decode(pdf);
    expect(text).toContain("100%");
  });

  it("handles single result", () => {
    const report = makeReport({
      results: [
        {
          ruleId: "FED-TAX-001",
          status: ComplianceStatus.NON_COMPLIANT,
          details: "EIN registration incomplete",
          remediation: "Apply for EIN at IRS.gov",
          deadline: "Immediate",
        },
      ],
    });
    const pdf = generateComplianceReportPDF(report);
    const text = new TextDecoder().decode(pdf);

    expect(text).toContain("0%"); // 0 out of 1 compliant
    expect(text).toContain("EIN registration");
  });

  it("handles many results without crashing (multi-page)", () => {
    const manyResults = Array.from({ length: 50 }, (_, i) => ({
      ruleId: `CA-TAX-${String(i).padStart(3, "0")}`,
      status: i % 3 === 0 ? ComplianceStatus.COMPLIANT : ComplianceStatus.NON_COMPLIANT,
      details: `Finding #${i}: Description of compliance requirement for rule ${i}`,
      remediation: `Take action ${i} to resolve this finding`,
      deadline: i % 5 === 0 ? "30 days" : undefined,
    }));

    const report = makeReport({ results: manyResults });
    const pdf = generateComplianceReportPDF(report);

    expect(pdf).toBeInstanceOf(Uint8Array);
    expect(pdf.length).toBeGreaterThan(500);

    const text = new TextDecoder().decode(pdf);
    // Multi-page: should have multiple Page objects
    expect((text.match(/\/Type \/Page\b/g) || []).length).toBeGreaterThan(1);
  });

  it("escapes special characters in text", () => {
    const report = makeReport({
      results: [
        {
          ruleId: "CA-LIC-001",
          status: ComplianceStatus.COMPLIANT,
          details: "License (type A) is valid for business\\operations",
          remediation: "N/A",
        },
      ],
    });
    const pdf = generateComplianceReportPDF(report);
    const text = new TextDecoder().decode(pdf);

    // Parentheses and backslashes should be escaped in PDF
    expect(text).toContain("\\(type A\\)");
    expect(text).toContain("business\\\\operations");
  });

  it("produces valid PDF structure with xref table", () => {
    const report = makeReport();
    const pdf = generateComplianceReportPDF(report);
    const text = new TextDecoder().decode(pdf);

    expect(text).toContain("xref");
    expect(text).toContain("trailer");
    expect(text).toContain("/Root 1 0 R");
    expect(text).toContain("/Type /Catalog");
    expect(text).toContain("/Type /Pages");
    expect(text).toContain("/Type /Font");
  });

  it("includes all three font definitions", () => {
    const report = makeReport();
    const pdf = generateComplianceReportPDF(report);
    const text = new TextDecoder().decode(pdf);

    expect(text).toContain("/BaseFont /Helvetica\n");
    expect(text).toContain("/BaseFont /Helvetica-Bold");
    expect(text).toContain("/BaseFont /Helvetica-Oblique");
  });

  it("includes legal disclaimer", () => {
    const report = makeReport();
    const pdf = generateComplianceReportPDF(report);
    const text = new TextDecoder().decode(pdf);

    expect(text).toContain("does not constitute legal advice");
  });

  it("categorizes findings correctly", () => {
    const report = makeReport();
    const pdf = generateComplianceReportPDF(report);
    const text = new TextDecoder().decode(pdf);

    expect(text).toContain("Taxation");
    expect(text).toContain("Employment");
    expect(text).toContain("Formation");
  });
});

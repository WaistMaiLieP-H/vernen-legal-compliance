import { describe, it, expect } from "vitest";
import { ReportGenerator } from "../src/services/report-generator.js";
import { ComplianceStatus } from "../src/types/compliance.js";
import type { ComplianceCheckResult } from "../src/types/compliance.js";
import { BusinessEntityType, USState } from "../src/types/client.js";
import type { Client } from "../src/types/client.js";

function makeClient(overrides: Partial<Client> = {}): Client {
  return {
    id: "cli_test001",
    name: "Test Business",
    entityType: BusinessEntityType.LLC,
    states: [USState.CA],
    industry: "Technology",
    createdAt: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}

function makeResult(overrides: Partial<ComplianceCheckResult> = {}): ComplianceCheckResult {
  return {
    ruleId: "rule_001",
    status: ComplianceStatus.NEEDS_REVIEW,
    details: "Rule FED-TAX-001 — Federal Tax Registration",
    remediation: "Verify tax registration status with the IRS.",
    ...overrides,
  };
}

describe("ReportGenerator", () => {
  const generator = new ReportGenerator();

  describe("generate", () => {
    it("should create a report with correct client data", () => {
      const client = makeClient();
      const results = [makeResult()];
      const report = generator.generate(results, client);

      expect(report.clientId).toBe("cli_test001");
      expect(report.entityType).toBe(BusinessEntityType.LLC);
      expect(report.states).toEqual([USState.CA]);
      expect(report.results).toHaveLength(1);
      expect(report.generatedBy).toBe("REGULIS");
    });

    it("should generate a unique report ID with rpt prefix", () => {
      const client = makeClient();
      const r1 = generator.generate([], client);
      const r2 = generator.generate([], client);

      expect(r1.id).toMatch(/^rpt_/);
      expect(r1.id).not.toBe(r2.id);
    });
  });

  describe("calculateScore", () => {
    it("should return 100 for empty results", () => {
      expect(generator.calculateScore([])).toBe(100);
    });

    it("should return 100 when all are compliant", () => {
      const results = [
        makeResult({ status: ComplianceStatus.COMPLIANT }),
        makeResult({ status: ComplianceStatus.COMPLIANT }),
      ];
      expect(generator.calculateScore(results)).toBe(100);
    });

    it("should return 100 when all are NOT_APPLICABLE", () => {
      const results = [
        makeResult({ status: ComplianceStatus.NOT_APPLICABLE }),
      ];
      expect(generator.calculateScore(results)).toBe(100);
    });

    it("should count COMPLIANT + NOT_APPLICABLE as passing", () => {
      const results = [
        makeResult({ status: ComplianceStatus.COMPLIANT }),
        makeResult({ status: ComplianceStatus.NOT_APPLICABLE }),
        makeResult({ status: ComplianceStatus.NEEDS_REVIEW }),
        makeResult({ status: ComplianceStatus.NON_COMPLIANT }),
      ];
      // 2 passing out of 4 = 50%
      expect(generator.calculateScore(results)).toBe(50);
    });

    it("should return 0 when all are non-compliant", () => {
      const results = [
        makeResult({ status: ComplianceStatus.NON_COMPLIANT }),
        makeResult({ status: ComplianceStatus.NON_COMPLIANT }),
      ];
      expect(generator.calculateScore(results)).toBe(0);
    });

    it("should round the score", () => {
      const results = [
        makeResult({ status: ComplianceStatus.COMPLIANT }),
        makeResult({ status: ComplianceStatus.NON_COMPLIANT }),
        makeResult({ status: ComplianceStatus.NON_COMPLIANT }),
      ];
      // 1/3 = 33.33... => 33
      expect(generator.calculateScore(results)).toBe(33);
    });
  });

  describe("formatAsJSON", () => {
    it("should produce valid JSON with required fields", () => {
      const client = makeClient();
      const results = [
        makeResult({ ruleId: "rule_001", status: ComplianceStatus.COMPLIANT }),
        makeResult({ ruleId: "rule_002", status: ComplianceStatus.NON_COMPLIANT }),
      ];
      const report = generator.generate(results, client);
      const json = generator.formatAsJSON(report);
      const parsed = JSON.parse(json);

      expect(parsed.report.id).toBe(report.id);
      expect(parsed.complianceScore).toBe(50);
      expect(parsed.summary.compliant).toBe(1);
      expect(parsed.summary.nonCompliant).toBe(1);
      expect(parsed.totalRules).toBe(2);
      expect(parsed.results).toHaveLength(2);
    });

    it("should group findings by category", () => {
      const client = makeClient();
      const results = [
        makeResult({ ruleId: "FED-TAX-001" }),
        makeResult({ ruleId: "CA-EMP-001" }),
        makeResult({ ruleId: "FED-TAX-002" }),
      ];
      const report = generator.generate(results, client);
      const parsed = JSON.parse(generator.formatAsJSON(report));

      expect(parsed.findingsByCategory["Taxation"]).toHaveLength(2);
      expect(parsed.findingsByCategory["Employment"]).toHaveLength(1);
    });
  });

  describe("formatAsHTML", () => {
    it("should produce valid HTML with branding", () => {
      const client = makeClient();
      const results = [makeResult({ status: ComplianceStatus.COMPLIANT })];
      const report = generator.generate(results, client);
      const html = generator.formatAsHTML(report);

      expect(html).toContain("<!DOCTYPE html>");
      expect(html).toContain("Vernen Legal");
      expect(html).toContain("REGULIS");
      expect(html).toContain(report.id);
    });

    it("should sanitize client data in HTML output", () => {
      const client = makeClient({ id: '<script>alert("xss")</script>' });
      const report = generator.generate([], client);
      const html = generator.formatAsHTML(report);

      expect(html).not.toContain("<script>");
    });

    it("should display correct summary counts", () => {
      const client = makeClient();
      const results = [
        makeResult({ status: ComplianceStatus.COMPLIANT }),
        makeResult({ status: ComplianceStatus.COMPLIANT }),
        makeResult({ status: ComplianceStatus.NON_COMPLIANT }),
        makeResult({ status: ComplianceStatus.NEEDS_REVIEW }),
        makeResult({ status: ComplianceStatus.NOT_APPLICABLE }),
      ];
      const report = generator.generate(results, client);
      const html = generator.formatAsHTML(report);

      // Score should be 60% (3 passing / 5 total)
      expect(html).toContain("60%");
    });
  });
});

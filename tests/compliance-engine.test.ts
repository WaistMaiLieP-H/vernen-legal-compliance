import { describe, it, expect } from "vitest";
import { ComplianceEngine } from "../src/services/compliance-engine.js";
import {
  ComplianceLevel,
  ComplianceRuleCategory,
  ComplianceStatus,
} from "../src/types/compliance.js";
import type { ComplianceRule } from "../src/types/compliance.js";
import { BusinessEntityType, USState } from "../src/types/client.js";
import type { Client } from "../src/types/client.js";

// -- Test data --

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

function makeRule(overrides: Partial<ComplianceRule> = {}): ComplianceRule {
  return {
    id: "rule_001",
    code: "FED-TAX-001",
    title: "Federal Tax Registration",
    description: "All business entities must obtain an EIN from the IRS.",
    category: ComplianceRuleCategory.TAXATION,
    level: ComplianceLevel.FEDERAL,
    entityTypes: [
      BusinessEntityType.LLC,
      BusinessEntityType.CORPORATION,
      BusinessEntityType.S_CORP,
      BusinessEntityType.SOLE_PROPRIETORSHIP,
      BusinessEntityType.PARTNERSHIP,
      BusinessEntityType.NONPROFIT,
      BusinessEntityType.COOPERATIVE,
    ],
    effectiveDate: "2020-01-01",
    source: "IRS",
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online",
    ...overrides,
  };
}

const sampleRules: ComplianceRule[] = [
  makeRule(),
  makeRule({
    id: "rule_002",
    code: "FED-RPT-001",
    title: "Beneficial Ownership Information Report",
    description: "Reporting companies must file BOI reports with FinCEN.",
    category: ComplianceRuleCategory.REPORTING,
    level: ComplianceLevel.FEDERAL,
    entityTypes: [
      BusinessEntityType.LLC,
      BusinessEntityType.CORPORATION,
      BusinessEntityType.S_CORP,
    ],
  }),
  makeRule({
    id: "rule_003",
    code: "CA-FORM-001",
    title: "California Statement of Information",
    description: "LLCs must file a Statement of Information with the CA SOS.",
    category: ComplianceRuleCategory.FORMATION,
    level: ComplianceLevel.STATE,
    state: USState.CA,
    entityTypes: [BusinessEntityType.LLC, BusinessEntityType.CORPORATION],
  }),
  makeRule({
    id: "rule_004",
    code: "CA-EMP-001",
    title: "California Workers Compensation Insurance",
    description: "Employers in CA must carry workers compensation insurance.",
    category: ComplianceRuleCategory.EMPLOYMENT,
    level: ComplianceLevel.STATE,
    state: USState.CA,
    entityTypes: [
      BusinessEntityType.LLC,
      BusinessEntityType.CORPORATION,
      BusinessEntityType.S_CORP,
    ],
  }),
  makeRule({
    id: "rule_005",
    code: "TX-FORM-001",
    title: "Texas Franchise Tax Report",
    description: "Texas entities must file an annual franchise tax report.",
    category: ComplianceRuleCategory.FORMATION,
    level: ComplianceLevel.STATE,
    state: USState.TX,
    entityTypes: [
      BusinessEntityType.LLC,
      BusinessEntityType.CORPORATION,
      BusinessEntityType.S_CORP,
      BusinessEntityType.PARTNERSHIP,
    ],
  }),
  makeRule({
    id: "rule_006",
    code: "FED-PRIV-001",
    title: "Future Federal Privacy Rule",
    description: "Upcoming federal data privacy regulation.",
    category: ComplianceRuleCategory.PRIVACY,
    level: ComplianceLevel.FEDERAL,
    entityTypes: [BusinessEntityType.LLC, BusinessEntityType.CORPORATION],
    effectiveDate: "2028-01-01",
  }),
];

// -- Tests --

describe("ComplianceEngine", () => {
  describe("checkCompliance", () => {
    it("should return results when rules are loaded", () => {
      const engine = new ComplianceEngine();
      engine.loadRules(sampleRules);
      const client = makeClient();

      const results = engine.checkCompliance(client, [USState.CA]);

      expect(results.length).toBeGreaterThan(0);
    });

    it("should return empty results when no rules are loaded", () => {
      const engine = new ComplianceEngine();
      engine.loadRules([]);
      const client = makeClient();

      const results = engine.checkCompliance(client, [USState.CA]);

      expect(results).toHaveLength(0);
    });

    it("should include federal rules for all entity types", () => {
      const engine = new ComplianceEngine();
      engine.loadRules(sampleRules);

      // Federal tax rule (rule_001) applies to all entity types
      for (const entityType of Object.values(BusinessEntityType)) {
        const client = makeClient({ entityType });
        const results = engine.checkCompliance(client, [USState.CA]);
        const federalTax = results.find((r) => r.ruleId === "rule_001");
        expect(federalTax).toBeDefined();
        expect(federalTax!.status).not.toBe(ComplianceStatus.NOT_APPLICABLE);
      }
    });

    it("should filter state rules correctly - CA rules appear for CA, not TX scan", () => {
      const engine = new ComplianceEngine();
      engine.loadRules(sampleRules);
      const client = makeClient({ entityType: BusinessEntityType.LLC });

      // Scanning only TX should not include CA-specific rules
      const txResults = engine.checkCompliance(client, [USState.TX]);
      const caFormRule = txResults.find((r) => r.ruleId === "rule_003");
      expect(caFormRule).toBeUndefined();

      // Scanning CA should include the CA formation rule
      const caResults = engine.checkCompliance(client, [USState.CA]);
      const caFormInCa = caResults.find((r) => r.ruleId === "rule_003");
      expect(caFormInCa).toBeDefined();
    });

    it("should filter by entity type - sole proprietorship excluded from BOI", () => {
      const engine = new ComplianceEngine();
      engine.loadRules(sampleRules);

      // BOI report (rule_002) does not apply to SOLE_PROPRIETORSHIP
      const soleClient = makeClient({
        entityType: BusinessEntityType.SOLE_PROPRIETORSHIP,
      });
      const results = engine.checkCompliance(soleClient, [USState.CA]);
      const boi = results.find((r) => r.ruleId === "rule_002");
      expect(boi).toBeUndefined();

      // BOI report should apply to LLC
      const llcClient = makeClient({ entityType: BusinessEntityType.LLC });
      const llcResults = engine.checkCompliance(llcClient, [USState.CA]);
      const llcBoi = llcResults.find((r) => r.ruleId === "rule_002");
      expect(llcBoi).toBeDefined();
    });
  });

  describe("getRulesForState", () => {
    it("should return only state-level rules for the given state", () => {
      const engine = new ComplianceEngine();
      engine.loadRules(sampleRules);

      const caRules = engine.getRulesForState(USState.CA, BusinessEntityType.LLC);
      expect(caRules.length).toBe(2); // CA-FORM-001 and CA-EMP-001
      expect(caRules.every((r) => r.state === USState.CA)).toBe(true);
      expect(caRules.every((r) => r.level === ComplianceLevel.STATE)).toBe(true);
    });

    it("should return empty array for state with no rules", () => {
      const engine = new ComplianceEngine();
      engine.loadRules(sampleRules);

      const nyRules = engine.getRulesForState(USState.NY, BusinessEntityType.LLC);
      expect(nyRules).toHaveLength(0);
    });
  });

  describe("evaluateRule", () => {
    it("should return NOT_APPLICABLE for rules that don't match entity type", () => {
      const engine = new ComplianceEngine();
      const client = makeClient({
        entityType: BusinessEntityType.NONPROFIT,
      });

      // TX franchise tax rule doesn't include NONPROFIT
      const result = engine.evaluateRule(client, sampleRules[4]); // rule_005
      expect(result.status).toBe(ComplianceStatus.NOT_APPLICABLE);
    });

    it("should return NEEDS_REVIEW with deadline for future-effective rules", () => {
      const engine = new ComplianceEngine();
      const client = makeClient({ entityType: BusinessEntityType.LLC });

      // rule_006 has effectiveDate of 2028-01-01
      const result = engine.evaluateRule(client, sampleRules[5]);
      expect(result.status).toBe(ComplianceStatus.NEEDS_REVIEW);
      expect(result.deadline).toBe("2028-01-01");
    });

    it("should return NEEDS_REVIEW for active rules pending verification", () => {
      const engine = new ComplianceEngine();
      const client = makeClient({ entityType: BusinessEntityType.LLC });

      // rule_001 is active (effectiveDate 2020-01-01)
      const result = engine.evaluateRule(client, sampleRules[0]);
      expect(result.status).toBe(ComplianceStatus.NEEDS_REVIEW);
      expect(result.deadline).toBeUndefined();
    });

    it("should include remediation text for each category", () => {
      const engine = new ComplianceEngine();
      const client = makeClient({ entityType: BusinessEntityType.LLC });

      // Test a few different categories
      const taxResult = engine.evaluateRule(client, sampleRules[0]); // TAXATION
      expect(taxResult.remediation).toBeTruthy();
      expect(taxResult.remediation.length).toBeGreaterThan(0);

      const formResult = engine.evaluateRule(client, sampleRules[2]); // FORMATION
      expect(formResult.remediation).toBeTruthy();
      expect(formResult.remediation.length).toBeGreaterThan(0);

      const empResult = engine.evaluateRule(client, sampleRules[3]); // EMPLOYMENT
      expect(empResult.remediation).toBeTruthy();
      expect(empResult.remediation.length).toBeGreaterThan(0);
    });
  });
});

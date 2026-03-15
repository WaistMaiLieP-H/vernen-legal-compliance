import type { Client, USState, BusinessEntityType } from "../types/client.js";
import type {
  ComplianceRule,
  ComplianceCheckResult,
} from "../types/compliance.js";
import {
  ComplianceStatus,
  ComplianceLevel,
  ComplianceRuleCategory,
} from "../types/compliance.js";

/**
 * ComplianceEngine — Core business logic for compliance checking.
 * Evaluates clients against applicable federal and state rules
 * based on entity type, jurisdiction, and industry.
 */
export class ComplianceEngine {
  private rules: ComplianceRule[] = [];

  /**
   * Load rules into the engine. In production this pulls from D1.
   */
  loadRules(rules: ComplianceRule[]): void {
    this.rules = rules;
  }

  /**
   * Run a full compliance check for a client across multiple states.
   */
  checkCompliance(
    client: Client,
    states: USState[]
  ): ComplianceCheckResult[] {
    const results: ComplianceCheckResult[] = [];

    // Check federal rules first (apply to all states)
    const federalRules = this.rules.filter(
      (r) =>
        r.level === ComplianceLevel.FEDERAL &&
        r.entityTypes.includes(client.entityType)
    );

    for (const rule of federalRules) {
      results.push(this.evaluateRule(client, rule));
    }

    // Check state-specific rules for each requested state
    for (const state of states) {
      const stateRules = this.getRulesForState(state, client.entityType);
      for (const rule of stateRules) {
        results.push(this.evaluateRule(client, rule));
      }
    }

    return results;
  }

  /**
   * Get all rules applicable to a specific state and entity type.
   */
  getRulesForState(
    state: USState,
    entityType: BusinessEntityType
  ): ComplianceRule[] {
    return this.rules.filter(
      (rule) =>
        rule.level === ComplianceLevel.STATE &&
        rule.state === state &&
        rule.entityTypes.includes(entityType)
    );
  }

  /**
   * Evaluate a single compliance rule against a client.
   * Returns a result with status, details, and remediation guidance.
   */
  evaluateRule(
    client: Client,
    rule: ComplianceRule
  ): ComplianceCheckResult {
    // Check if the rule applies to this entity type
    if (!rule.entityTypes.includes(client.entityType)) {
      return {
        ruleId: rule.id,
        status: ComplianceStatus.NOT_APPLICABLE,
        details: `Rule ${rule.code} does not apply to ${client.entityType} entities`,
        remediation: "No action required",
      };
    }

    // Check if the rule's effective date is in the future
    const effectiveDate = new Date(rule.effectiveDate);
    const now = new Date();

    if (effectiveDate > now) {
      return {
        ruleId: rule.id,
        status: ComplianceStatus.NEEDS_REVIEW,
        details: `Rule ${rule.code} takes effect on ${rule.effectiveDate} — review required before deadline`,
        remediation: `Review ${rule.title} requirements and prepare for compliance by ${rule.effectiveDate}`,
        deadline: rule.effectiveDate,
      };
    }

    // Default: flag for review until actual compliance data is integrated
    return {
      ruleId: rule.id,
      status: ComplianceStatus.NEEDS_REVIEW,
      details: `Rule ${rule.code}: ${rule.title} — requires verification against client records`,
      remediation: remediationForCategory(rule.category),
    };
  }
}

function remediationForCategory(category: ComplianceRuleCategory): string {
  const remediations: Record<ComplianceRuleCategory, string> = {
    [ComplianceRuleCategory.FORMATION]:
      "Verify entity formation documents are filed and current in all registered states",
    [ComplianceRuleCategory.TAXATION]:
      "Confirm tax registrations and filing obligations are met for all applicable jurisdictions",
    [ComplianceRuleCategory.EMPLOYMENT]:
      "Review employment law compliance including wage/hour, anti-discrimination, and benefits requirements",
    [ComplianceRuleCategory.LICENSING]:
      "Verify all required business licenses and permits are obtained and current",
    [ComplianceRuleCategory.REPORTING]:
      "Confirm all required periodic reports (annual reports, BOI, etc.) are filed on time",
    [ComplianceRuleCategory.PRIVACY]:
      "Review data privacy obligations including state privacy laws and industry regulations",
    [ComplianceRuleCategory.INSURANCE]:
      "Verify required insurance coverage (workers comp, liability, etc.) is in place",
  };
  return remediations[category];
}

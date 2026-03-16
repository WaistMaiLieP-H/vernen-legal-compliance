import type { USState, BusinessEntityType } from "../../types/client.js";
import type { ComplianceRuleCategory } from "../../types/compliance.js";

/**
 * A profile of a single jurisdiction's compliance landscape.
 */
export interface JurisdictionProfile {
  state: USState;
  totalRules: number;
  rulesByCategory: Record<string, number>;
  entityTypesAffected: BusinessEntityType[];
  keyDeadlines: JurisdictionDeadline[];
  lastUpdated: string;
}

/**
 * A deadline extracted from compliance rules for a jurisdiction.
 */
export interface JurisdictionDeadline {
  ruleId: string;
  ruleCode: string;
  title: string;
  effectiveDate: string;
  category: ComplianceRuleCategory;
}

/**
 * An entry in the 50-state compliance map.
 */
export interface StateMapEntry {
  state: string;
  ruleCount: number;
  categories: string[];
}

/**
 * The full 50-state compliance map.
 */
export interface ComplianceMap {
  totalStates: number;
  totalRules: number;
  federalRules: number;
  states: StateMapEntry[];
  generatedAt: string;
  generatedBy: string;
}

/**
 * Result of comparing compliance requirements between two states.
 */
export interface StateComparison {
  state1: string;
  state2: string;
  entityType: BusinessEntityType;
  state1RuleCount: number;
  state2RuleCount: number;
  sharedCategories: string[];
  state1OnlyCategories: string[];
  state2OnlyCategories: string[];
  state1Rules: ComparisonRuleSummary[];
  state2Rules: ComparisonRuleSummary[];
  comparedAt: string;
}

/**
 * A rule summary used in state comparison results.
 */
export interface ComparisonRuleSummary {
  id: string;
  code: string;
  title: string;
  category: string;
  effectiveDate: string;
}

/**
 * A client impacted by a rule change.
 */
export interface ImpactedClient {
  clientId: string;
  clientName: string;
  entityType: string;
  state: string;
  isFormationState: boolean;
}

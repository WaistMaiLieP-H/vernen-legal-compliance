import type { ScanRequest, ScanResult } from "./types.js";
import type { USState, BusinessEntityType, Client } from "../../types/client.js";
import type {
  ComplianceRule,
  ComplianceCheckResult,
  ComplianceRuleCategory,
} from "../../types/compliance.js";
import type { ComplianceLevel } from "../../types/compliance.js";
import { ComplianceEngine } from "../../services/compliance-engine.js";
import { generateId } from "../../utils/helpers.js";
import { getStateRules, getFederalRules } from "./queries.js";

/**
 * Database row shape returned by D1 queries against compliance_rules.
 */
interface RuleRow {
  id: string;
  code: string;
  title: string;
  description: string;
  category: string;
  level: string;
  state: string | null;
  entity_types: string;
  effective_date: string;
  source: string;
  url: string;
}

/**
 * Parse a database row into a typed ComplianceRule.
 */
function rowToRule(row: RuleRow): ComplianceRule {
  let entityTypes: BusinessEntityType[];
  try {
    entityTypes = JSON.parse(row.entity_types) as BusinessEntityType[];
  } catch {
    entityTypes = [];
  }

  return {
    id: row.id,
    code: row.code,
    title: row.title,
    description: row.description,
    category: row.category as ComplianceRuleCategory,
    level: row.level as ComplianceLevel,
    state: (row.state ?? undefined) as USState | undefined,
    entityTypes,
    effectiveDate: row.effective_date,
    source: row.source,
    url: row.url,
  };
}

/**
 * SCAN-1: Regulatory scanner worker -- the first worker of REGULIS.
 * Scans federal and state regulatory sources to identify
 * applicable compliance rules and coverage gaps.
 */
export class Scan1Worker {
  /**
   * Scan state-specific compliance rules from the D1 database.
   * Returns structured ComplianceRule objects for the given state and entity type.
   */
  async scanState(
    state: USState,
    entityType: BusinessEntityType,
    db: D1Database
  ): Promise<ComplianceRule[]> {
    const query = getStateRules(state, entityType);
    const result = await db
      .prepare(query.sql)
      .bind(...query.params)
      .all<RuleRow>();

    if (!result.success || !result.results) {
      return [];
    }

    return result.results.map(rowToRule);
  }

  /**
   * Scan federal compliance rules from the D1 database.
   * Federal rules apply across all states.
   */
  async scanFederal(
    entityType: BusinessEntityType,
    db: D1Database
  ): Promise<ComplianceRule[]> {
    const query = getFederalRules(entityType);
    const result = await db
      .prepare(query.sql)
      .bind(...query.params)
      .all<RuleRow>();

    if (!result.success || !result.results) {
      return [];
    }

    return result.results.map(rowToRule);
  }

  /**
   * Generate a full gap report for a client across all their registered states.
   * Runs both federal and state scans, feeds results through the ComplianceEngine,
   * and returns a complete set of ComplianceCheckResult findings.
   */
  async generateGapReport(
    client: Client,
    states: USState[],
    db: D1Database
  ): Promise<ComplianceCheckResult[]> {
    // Collect all applicable rules
    const allRules: ComplianceRule[] = [];

    // Federal rules apply regardless of state
    const federalRules = await this.scanFederal(client.entityType, db);
    allRules.push(...federalRules);

    // State-specific rules for each jurisdiction
    for (const state of states) {
      const stateRules = await this.scanState(state, client.entityType, db);
      allRules.push(...stateRules);
    }

    // Load rules into the compliance engine and run the check
    const engine = new ComplianceEngine();
    engine.loadRules(allRules);

    return engine.checkCompliance(client, states);
  }

  /**
   * Legacy scan method for backward compatibility.
   * Wraps scanState and returns a ScanResult summary.
   */
  async scanStateSummary(
    state: USState,
    request: ScanRequest,
    db: D1Database
  ): Promise<ScanResult> {
    const rules = await this.scanState(state, request.entityType, db);

    return {
      id: generateId("scan"),
      request: { ...request, state },
      rulesFound: rules.length,
      gapsIdentified: rules.length, // All unverified rules are gaps until confirmed
      newSinceLastScan: 0,
      scannedAt: new Date().toISOString(),
      scanner: "SCAN-1",
    };
  }

  /**
   * Legacy scan method for backward compatibility.
   * Wraps scanFederal and returns a ScanResult summary.
   */
  async scanFederalSummary(
    request: ScanRequest,
    db: D1Database
  ): Promise<ScanResult> {
    const rules = await this.scanFederal(request.entityType, db);

    return {
      id: generateId("scan"),
      request,
      rulesFound: rules.length,
      gapsIdentified: rules.length,
      newSinceLastScan: 0,
      scannedAt: new Date().toISOString(),
      scanner: "SCAN-1",
    };
  }
}

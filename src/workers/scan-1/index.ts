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
  source_url: string | null;
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
    url: row.source_url ?? "",
  };
}

/** In-memory rule cache — survives across requests within the same Worker isolate. */
const ruleCache = new Map<string, { rules: ComplianceRule[]; cachedAt: number }>();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const MAX_CACHE_ENTRIES = 500;

function getCacheKey(prefix: string, ...parts: string[]): string {
  return `${prefix}:${parts.join(":")}`;
}

function getCachedRules(key: string): ComplianceRule[] | null {
  const entry = ruleCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.cachedAt > CACHE_TTL_MS) {
    ruleCache.delete(key);
    return null;
  }
  return entry.rules;
}

function setCachedRules(key: string, rules: ComplianceRule[]): void {
  // Evict oldest entries if cache is full
  if (ruleCache.size >= MAX_CACHE_ENTRIES) {
    const oldest = ruleCache.keys().next().value;
    if (oldest) ruleCache.delete(oldest);
  }
  ruleCache.set(key, { rules, cachedAt: Date.now() });
}

/**
 * SCAN-1: Regulatory scanner worker -- the first worker of REGULIS.
 * Scans federal and state regulatory sources to identify
 * applicable compliance rules and coverage gaps.
 *
 * Rule queries are cached in-memory (per Worker isolate) with 24hr TTL.
 * Same state + same entity type = same rules. No reason to query D1
 * hundreds of times for the same answer.
 */
export class Scan1Worker {
  /**
   * Scan state-specific compliance rules from the D1 database.
   * Results are cached by state+entityType for 24 hours.
   */
  async scanState(
    state: USState,
    entityType: BusinessEntityType,
    db: D1Database
  ): Promise<ComplianceRule[]> {
    const cacheKey = getCacheKey("state", state, entityType);
    const cached = getCachedRules(cacheKey);
    if (cached) return cached;

    const query = getStateRules(state, entityType);
    const result = await db
      .prepare(query.sql)
      .bind(...query.params)
      .all<RuleRow>();

    if (!result.success || !result.results) {
      return [];
    }

    const rules = result.results.map(rowToRule);
    setCachedRules(cacheKey, rules);
    return rules;
  }

  /**
   * Scan federal compliance rules from the D1 database.
   * Results are cached by entityType for 24 hours.
   */
  async scanFederal(
    entityType: BusinessEntityType,
    db: D1Database
  ): Promise<ComplianceRule[]> {
    const cacheKey = getCacheKey("federal", entityType);
    const cached = getCachedRules(cacheKey);
    if (cached) return cached;

    const query = getFederalRules(entityType);
    const result = await db
      .prepare(query.sql)
      .bind(...query.params)
      .all<RuleRow>();

    if (!result.success || !result.results) {
      return [];
    }

    const rules = result.results.map(rowToRule);
    setCachedRules(cacheKey, rules);
    return rules;
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

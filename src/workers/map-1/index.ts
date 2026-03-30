import type { USState, BusinessEntityType } from "../../types/client.js";
import type {
  JurisdictionProfile,
  JurisdictionDeadline,
  ComplianceMap,
  StateMapEntry,
  StateComparison,
  ComparisonRuleSummary,
  ImpactedClient,
} from "./types.js";
import type { ComplianceRuleCategory } from "../../types/compliance.js";

/** In-memory comparison cache — survives across requests within same Worker isolate. */
const compareCache = new Map<string, { result: StateComparison; at: number }>();

/**
 * Database row shape for compliance_rules queries.
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
  effective_date: string | null;
  source: string;
  source_url: string | null;
}

/**
 * Database row for client_states join queries.
 */
interface ClientStateRow {
  client_id: string;
  name: string;
  entity_type: string;
  state: string;
  is_formation_state: number;
}

/**
 * MAP-1: Jurisdictional Mapper — the second worker of REGULIS.
 *
 * Maintains a living compliance map across all 50 states + DC.
 * Provides jurisdictional profiling, client impact analysis, and
 * cross-state comparison for businesses expanding into new markets.
 */
export class Map1Worker {
  /**
   * Build a jurisdiction profile for a single state.
   * Queries D1 for all rules in that state, groups by category,
   * and returns a structured profile with rule counts, entity types,
   * and upcoming deadlines.
   */
  async mapJurisdiction(
    state: USState,
    env: { DB: D1Database }
  ): Promise<JurisdictionProfile> {
    const result = await env.DB.prepare(
      `SELECT id, code, title, description, category, level, state,
              entity_types, effective_date, source, source_url
       FROM compliance_rules
       WHERE state = ?1 AND is_active = 1
       ORDER BY category, code`
    )
      .bind(state)
      .all<RuleRow>();

    const rules = result.success && result.results ? result.results : [];

    // Group rules by category
    const rulesByCategory: Record<string, number> = {};
    const entityTypesSet = new Set<BusinessEntityType>();
    const deadlines: JurisdictionDeadline[] = [];

    for (const rule of rules) {
      // Count by category
      rulesByCategory[rule.category] =
        (rulesByCategory[rule.category] ?? 0) + 1;

      // Collect entity types
      try {
        const types = JSON.parse(rule.entity_types) as string[];
        for (const t of types) {
          if (t !== "ALL") {
            entityTypesSet.add(t as BusinessEntityType);
          }
        }
      } catch {
        // Skip malformed entity_types
      }

      // Collect upcoming deadlines (rules with future effective dates)
      if (rule.effective_date) {
        const effectiveDate = new Date(rule.effective_date);
        if (effectiveDate > new Date()) {
          deadlines.push({
            ruleId: rule.id,
            ruleCode: rule.code,
            title: rule.title,
            effectiveDate: rule.effective_date,
            category: rule.category as ComplianceRuleCategory,
          });
        }
      }
    }

    // Sort deadlines by date ascending (soonest first)
    deadlines.sort(
      (a, b) =>
        new Date(a.effectiveDate).getTime() -
        new Date(b.effectiveDate).getTime()
    );

    return {
      state,
      totalRules: rules.length,
      rulesByCategory,
      entityTypesAffected: Array.from(entityTypesSet),
      keyDeadlines: deadlines.slice(0, 20), // Top 20 upcoming deadlines
      lastUpdated: new Date().toISOString(),
    };
  }

  /**
   * When a rule changes, find all clients operating in that rule's
   * jurisdiction by querying the client_states table.
   */
  async identifyImpactedClients(
    ruleId: string,
    env: { DB: D1Database }
  ): Promise<ImpactedClient[]> {
    // First, get the rule to determine its state and entity types
    const rule = await env.DB.prepare(
      `SELECT id, state, entity_types FROM compliance_rules WHERE id = ?1`
    )
      .bind(ruleId)
      .first<{ id: string; state: string | null; entity_types: string }>();

    if (!rule) {
      return [];
    }

    // For federal rules (state IS NULL), find all clients
    // For state rules, find clients operating in that state
    let clientQuery: string;
    let params: unknown[];

    if (rule.state) {
      clientQuery = `
        SELECT cs.client_id, c.name, c.entity_type, cs.state, cs.is_formation_state
        FROM client_states cs
        JOIN clients c ON c.id = cs.client_id
        WHERE cs.state = ?1
        ORDER BY c.name
      `;
      params = [rule.state];
    } else {
      // Federal rule — all clients are potentially impacted
      clientQuery = `
        SELECT cs.client_id, c.name, c.entity_type, cs.state, cs.is_formation_state
        FROM client_states cs
        JOIN clients c ON c.id = cs.client_id
        ORDER BY c.name
      `;
      params = [];
    }

    const result = await env.DB.prepare(clientQuery)
      .bind(...params)
      .all<ClientStateRow>();

    if (!result.success || !result.results) {
      return [];
    }

    // Filter by entity type if the rule targets specific types
    let applicableEntityTypes: string[] = [];
    try {
      applicableEntityTypes = JSON.parse(rule.entity_types) as string[];
    } catch {
      applicableEntityTypes = [];
    }

    const isAllTypes = applicableEntityTypes.includes("ALL");

    // Deduplicate by client_id (a client may appear in multiple states)
    const seen = new Set<string>();
    const impacted: ImpactedClient[] = [];

    for (const row of result.results) {
      if (seen.has(row.client_id)) continue;

      // Check entity type match
      if (
        !isAllTypes &&
        applicableEntityTypes.length > 0 &&
        !applicableEntityTypes.includes(row.entity_type)
      ) {
        continue;
      }

      seen.add(row.client_id);
      impacted.push({
        clientId: row.client_id,
        clientName: row.name,
        entityType: row.entity_type,
        state: row.state,
        isFormationState: row.is_formation_state === 1,
      });
    }

    return impacted;
  }

  /**
   * Build the full 50-state compliance map showing rule counts
   * per state and per category.
   */
  async getComplianceMap(env: { DB: D1Database }): Promise<ComplianceMap> {
    // Get state-level rule counts and categories
    const stateResult = await env.DB.prepare(
      `SELECT state, COUNT(*) as rule_count, GROUP_CONCAT(DISTINCT category) as categories
       FROM compliance_rules
       WHERE state IS NOT NULL AND is_active = 1
       GROUP BY state
       ORDER BY state`
    ).all<{ state: string; rule_count: number; categories: string }>();

    // Get federal rule count
    const federalRow = await env.DB.prepare(
      `SELECT COUNT(*) as count FROM compliance_rules WHERE level = 'FEDERAL' AND is_active = 1`
    ).first<{ count: number }>();

    // Get total rule count
    const totalRow = await env.DB.prepare(
      `SELECT COUNT(*) as count FROM compliance_rules WHERE is_active = 1`
    ).first<{ count: number }>();

    const states: StateMapEntry[] =
      stateResult.success && stateResult.results
        ? stateResult.results.map((row) => ({
            state: row.state,
            ruleCount: row.rule_count,
            categories: row.categories ? row.categories.split(",") : [],
          }))
        : [];

    return {
      totalStates: states.length,
      totalRules: totalRow?.count ?? 0,
      federalRules: federalRow?.count ?? 0,
      states,
      generatedAt: new Date().toISOString(),
      generatedBy: "MAP-1",
    };
  }

  /**
   * Compare compliance requirements between two states for a given
   * entity type. Useful for businesses considering expansion.
   * Results cached per state+entityType combo.
   */
  async compareStates(
    state1: USState,
    state2: USState,
    entityType: BusinessEntityType,
    env: { DB: D1Database }
  ): Promise<StateComparison> {
    // Check cache first
    const cacheKey = `compare:${state1}:${state2}:${entityType}`;
    const cached = compareCache.get(cacheKey);
    if (cached && Date.now() - cached.at < 24 * 60 * 60 * 1000) {
      return cached.result;
    }

    const sql = `SELECT id, code, title, category, effective_date
       FROM compliance_rules
       WHERE state = ?1 AND is_active = 1
       AND (
         entity_types LIKE '%"' || ?2 || '"%'
         OR entity_types LIKE '%"ALL"%'
       )
       ORDER BY category, code`;

    type RuleRow = {
      id: string;
      code: string;
      title: string;
      category: string;
      effective_date: string;
    };

    // Batch both queries in a single D1 round-trip
    const [result1, result2] = await env.DB.batch([
      env.DB.prepare(sql).bind(state1, entityType),
      env.DB.prepare(sql).bind(state2, entityType),
    ]);

    const rules1 = (result1.success && result1.results ? result1.results : []) as RuleRow[];
    const rules2 = (result2.success && result2.results ? result2.results : []) as RuleRow[];

    // Extract categories
    const categories1 = new Set(rules1.map((r) => r.category));
    const categories2 = new Set(rules2.map((r) => r.category));

    const sharedCategories = Array.from(categories1).filter((c) =>
      categories2.has(c)
    );
    const state1OnlyCategories = Array.from(categories1).filter(
      (c) => !categories2.has(c)
    );
    const state2OnlyCategories = Array.from(categories2).filter(
      (c) => !categories1.has(c)
    );

    const toSummary = (r: {
      id: string;
      code: string;
      title: string;
      category: string;
      effective_date: string;
    }): ComparisonRuleSummary => ({
      id: r.id,
      code: r.code,
      title: r.title,
      category: r.category,
      effectiveDate: r.effective_date,
    });

    const comparison: StateComparison = {
      state1,
      state2,
      entityType,
      state1RuleCount: rules1.length,
      state2RuleCount: rules2.length,
      sharedCategories,
      state1OnlyCategories,
      state2OnlyCategories,
      state1Rules: rules1.map(toSummary),
      state2Rules: rules2.map(toSummary),
      comparedAt: new Date().toISOString(),
    };

    // Cache the result
    compareCache.set(cacheKey, { result: comparison, at: Date.now() });
    if (compareCache.size > 200) {
      const oldest = compareCache.keys().next().value;
      if (oldest) compareCache.delete(oldest);
    }

    return comparison;
  }
}

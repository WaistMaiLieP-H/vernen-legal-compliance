import type { ComplianceRuleCategory } from "../../types/compliance.js";

/**
 * SQL query builders for SCAN-1 regulatory database queries.
 * All queries return { sql, params } tuples for use with D1's bind().
 */

export interface PreparedQuery {
  sql: string;
  params: unknown[];
}

/**
 * Query for state-specific compliance rules matching a given entity type.
 * The entity_types column stores a JSON array of applicable entity types.
 */
export function getStateRules(state: string, entityType: string): PreparedQuery {
  return {
    sql: `
      SELECT id, code, title, description, category, level, state,
             entity_types, effective_date, source, url
      FROM compliance_rules
      WHERE level = 'STATE'
        AND state = ?1
        AND json_array_length(entity_types) > 0
        AND (
          entity_types LIKE '%"' || ?2 || '"%'
          OR entity_types LIKE '%"ALL"%'
        )
      ORDER BY category, code
    `,
    params: [state, entityType],
  };
}

/**
 * Query for federal compliance rules matching a given entity type.
 */
export function getFederalRules(entityType: string): PreparedQuery {
  return {
    sql: `
      SELECT id, code, title, description, category, level, state,
             entity_types, effective_date, source, url
      FROM compliance_rules
      WHERE level = 'FEDERAL'
        AND json_array_length(entity_types) > 0
        AND (
          entity_types LIKE '%"' || ?1 || '"%'
          OR entity_types LIKE '%"ALL"%'
        )
      ORDER BY category, code
    `,
    params: [entityType],
  };
}

/**
 * Query for a single rule by ID.
 */
export function getRuleById(id: string): PreparedQuery {
  return {
    sql: `
      SELECT id, code, title, description, category, level, state,
             entity_types, effective_date, source, url
      FROM compliance_rules
      WHERE id = ?1
    `,
    params: [id],
  };
}

/**
 * Query for rules by category, optionally filtered by state and entity type.
 */
export function getRulesByCategory(
  category: ComplianceRuleCategory,
  state?: string,
  entityType?: string
): PreparedQuery {
  const conditions: string[] = ["category = ?1"];
  const params: unknown[] = [category];

  if (state) {
    params.push(state);
    conditions.push(`state = ?${params.length}`);
  }

  if (entityType) {
    params.push(entityType);
    conditions.push(
      `(entity_types LIKE '%"' || ?${params.length} || '"%' OR entity_types LIKE '%"ALL"%')`
    );
  }

  return {
    sql: `
      SELECT id, code, title, description, category, level, state,
             entity_types, effective_date, source, url
      FROM compliance_rules
      WHERE ${conditions.join(" AND ")}
      ORDER BY level, state, code
    `,
    params,
  };
}

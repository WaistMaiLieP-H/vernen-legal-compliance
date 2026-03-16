import type {
  ComplianceAlert,
  AlertRow,
  AlertRuleInput,
  AlertUrgency,
  AlertType,
  DeadlineCheckResult,
} from "./types.js";
import { generateId } from "../../utils/helpers.js";

/**
 * Convert a database row into a typed ComplianceAlert.
 */
function rowToAlert(row: AlertRow): ComplianceAlert {
  return {
    id: row.id,
    ruleId: row.rule_id,
    state: row.state,
    alertType: row.alert_type as AlertType,
    urgency: row.urgency as AlertUrgency,
    title: row.title,
    description: row.description,
    effectiveDate: row.effective_date,
    acknowledged: row.acknowledged === 1,
    createdAt: row.created_at,
  };
}

/**
 * ALERT-1: Compliance Alert Engine — the third worker of REGULIS.
 *
 * Monitors compliance rules for upcoming deadlines, generates
 * urgency-tiered alerts, and provides filtered views for
 * state-specific and system-wide alert management.
 */
export class Alert1Worker {
  /**
   * Scan all compliance rules for upcoming effective dates and
   * generate alerts for rules taking effect within 30, 60, or 90 days.
   *
   * Avoids generating duplicate alerts for rules that already have
   * an active (unacknowledged) alert.
   */
  async checkDeadlines(env: {
    DB: D1Database;
  }): Promise<DeadlineCheckResult> {
    const now = new Date();
    const in30 = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const in60 = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
    const in90 = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);

    // Find rules with upcoming effective dates that don't already have alerts
    const result = await env.DB.prepare(
      `SELECT r.id, r.code, r.title, r.description, r.state,
              r.effective_date, r.category
       FROM compliance_rules r
       WHERE r.is_active = 1
         AND r.effective_date IS NOT NULL
         AND r.effective_date > ?1
         AND r.effective_date <= ?2
         AND r.id NOT IN (
           SELECT a.rule_id FROM alerts a
           WHERE a.rule_id IS NOT NULL
             AND a.acknowledged = 0
         )
       ORDER BY r.effective_date ASC`
    )
      .bind(now.toISOString(), in90.toISOString())
      .all<AlertRuleInput>();

    const rules =
      result.success && result.results ? result.results : [];

    let alertsGenerated = 0;
    let upcoming30 = 0;
    let upcoming60 = 0;
    let upcoming90 = 0;

    for (const rule of rules) {
      if (!rule.effective_date) continue;

      const effectiveDate = new Date(rule.effective_date);
      let urgency: AlertUrgency;

      if (effectiveDate <= in30) {
        urgency = "CRITICAL";
        upcoming30++;
      } else if (effectiveDate <= in60) {
        urgency = "HIGH";
        upcoming60++;
      } else {
        urgency = "MEDIUM";
        upcoming90++;
      }

      await this.generateAlert(rule, urgency, env);
      alertsGenerated++;
    }

    return {
      scannedAt: now.toISOString(),
      alertsGenerated,
      upcoming30Days: upcoming30,
      upcoming60Days: upcoming60,
      upcoming90Days: upcoming90,
    };
  }

  /**
   * Create an alert record in the alerts table for a given rule.
   */
  async generateAlert(
    rule: AlertRuleInput,
    urgency: AlertUrgency,
    env: { DB: D1Database }
  ): Promise<ComplianceAlert> {
    const id = generateId("alert");
    const alertType: AlertType = "DEADLINE";

    const daysUntil = rule.effective_date
      ? Math.ceil(
          (new Date(rule.effective_date).getTime() - Date.now()) /
            (24 * 60 * 60 * 1000)
        )
      : null;

    const title = `${urgency} — ${rule.title}`;
    const description = daysUntil !== null
      ? `Rule ${rule.code} (${rule.category}) takes effect in ${daysUntil} day${daysUntil === 1 ? "" : "s"}. ${rule.description}`
      : `Rule ${rule.code} (${rule.category}): ${rule.description}`;

    await env.DB.prepare(
      `INSERT INTO alerts (id, rule_id, state, alert_type, urgency, title, description, effective_date)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)`
    )
      .bind(
        id,
        rule.id,
        rule.state,
        alertType,
        urgency,
        title,
        description,
        rule.effective_date
      )
      .run();

    return {
      id,
      ruleId: rule.id,
      state: rule.state,
      alertType,
      urgency,
      title,
      description,
      effectiveDate: rule.effective_date,
      acknowledged: false,
      createdAt: new Date().toISOString(),
    };
  }

  /**
   * Create a custom alert (not tied to a deadline scan).
   * Useful for regulatory change notifications and manual alerts.
   */
  async createCustomAlert(
    params: {
      ruleId?: string;
      state?: string;
      alertType: AlertType;
      urgency: AlertUrgency;
      title: string;
      description: string;
      effectiveDate?: string;
    },
    env: { DB: D1Database }
  ): Promise<ComplianceAlert> {
    const id = generateId("alert");

    await env.DB.prepare(
      `INSERT INTO alerts (id, rule_id, state, alert_type, urgency, title, description, effective_date)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)`
    )
      .bind(
        id,
        params.ruleId ?? null,
        params.state ?? null,
        params.alertType,
        params.urgency,
        params.title,
        params.description,
        params.effectiveDate ?? null
      )
      .run();

    return {
      id,
      ruleId: params.ruleId ?? null,
      state: params.state ?? null,
      alertType: params.alertType,
      urgency: params.urgency,
      title: params.title,
      description: params.description,
      effectiveDate: params.effectiveDate ?? null,
      acknowledged: false,
      createdAt: new Date().toISOString(),
    };
  }

  /**
   * Return all active (unacknowledged) alerts, sorted by urgency
   * (CRITICAL first) then by creation date.
   */
  async getActiveAlerts(env: {
    DB: D1Database;
  }): Promise<ComplianceAlert[]> {
    const result = await env.DB.prepare(
      `SELECT id, rule_id, state, alert_type, urgency, title,
              description, effective_date, acknowledged, created_at
       FROM alerts
       WHERE acknowledged = 0
       ORDER BY
         CASE urgency
           WHEN 'CRITICAL' THEN 0
           WHEN 'HIGH' THEN 1
           WHEN 'MEDIUM' THEN 2
           WHEN 'LOW' THEN 3
         END,
         created_at DESC`
    ).all<AlertRow>();

    if (!result.success || !result.results) {
      return [];
    }

    return result.results.map(rowToAlert);
  }

  /**
   * Return active alerts filtered to a specific state.
   */
  async getAlertsForState(
    state: string,
    env: { DB: D1Database }
  ): Promise<ComplianceAlert[]> {
    const result = await env.DB.prepare(
      `SELECT id, rule_id, state, alert_type, urgency, title,
              description, effective_date, acknowledged, created_at
       FROM alerts
       WHERE state = ?1 AND acknowledged = 0
       ORDER BY
         CASE urgency
           WHEN 'CRITICAL' THEN 0
           WHEN 'HIGH' THEN 1
           WHEN 'MEDIUM' THEN 2
           WHEN 'LOW' THEN 3
         END,
         created_at DESC`
    )
      .bind(state)
      .all<AlertRow>();

    if (!result.success || !result.results) {
      return [];
    }

    return result.results.map(rowToAlert);
  }

  /**
   * Acknowledge an alert by ID, marking it as handled.
   */
  async acknowledgeAlert(
    alertId: string,
    env: { DB: D1Database }
  ): Promise<boolean> {
    const result = await env.DB.prepare(
      `UPDATE alerts SET acknowledged = 1 WHERE id = ?1`
    )
      .bind(alertId)
      .run();

    return result.success;
  }
}

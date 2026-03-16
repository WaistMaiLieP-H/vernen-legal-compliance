/**
 * Alert types for compliance deadline and regulatory change monitoring.
 */
export type AlertType = "DEADLINE" | "REGULATORY_CHANGE" | "NEW_REQUIREMENT" | "EXPIRATION";

/**
 * Urgency levels for compliance alerts.
 */
export type AlertUrgency = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

/**
 * A compliance alert record.
 */
export interface ComplianceAlert {
  id: string;
  ruleId: string | null;
  state: string | null;
  alertType: AlertType;
  urgency: AlertUrgency;
  title: string;
  description: string;
  effectiveDate: string | null;
  acknowledged: boolean;
  createdAt: string;
}

/**
 * Database row shape for the alerts table.
 */
export interface AlertRow {
  id: string;
  rule_id: string | null;
  state: string | null;
  alert_type: string;
  urgency: string;
  title: string;
  description: string;
  effective_date: string | null;
  acknowledged: number;
  created_at: string;
}

/**
 * Input for generating an alert from a compliance rule.
 */
export interface AlertRuleInput {
  id: string;
  code: string;
  title: string;
  description: string;
  state: string | null;
  effective_date: string | null;
  category: string;
}

/**
 * Summary of deadline check results.
 */
export interface DeadlineCheckResult {
  scannedAt: string;
  alertsGenerated: number;
  upcoming30Days: number;
  upcoming60Days: number;
  upcoming90Days: number;
}

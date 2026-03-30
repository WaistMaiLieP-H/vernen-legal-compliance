import type { RetentionRule, RetentionSchedule } from "../types/retention.js";
import { RetentionScheduleStatus, DisposalMethod } from "../types/retention.js";
import type { DocumentRecord } from "../types/evidence.js";
import { generateId } from "../utils/helpers.js";

/**
 * RetentionEngine — Manages document retention compliance.
 * Knows the law on how long documents must be kept, how they must
 * be stored, and when/how they can be disposed.
 */
export class RetentionEngine {
  /**
   * Get all retention rules applicable to a document type and jurisdiction.
   */
  async getApplicableRules(
    db: D1Database,
    documentType: string,
    jurisdiction: string,
    entityType?: string
  ): Promise<RetentionRule[]> {
    const results = await db
      .prepare(
        `SELECT * FROM retention_rules
         WHERE is_active = 1
         AND (jurisdiction = ? OR jurisdiction = 'FEDERAL')
         AND (applies_to_entity_types = '"ALL"' OR applies_to_entity_types LIKE ?)
         ORDER BY retention_years DESC, retention_months DESC`
      )
      .bind(jurisdiction, `%${entityType || ""}%`)
      .all<RetentionRule>();

    // Filter by document type match
    return (results.results || []).filter((rule) => {
      try {
        const types = JSON.parse(rule.documentTypes || "[]");
        return types.includes(documentType) || types.length === 0;
      } catch {
        return false;
      }
    });
  }

  /**
   * Get the longest applicable retention period for a document.
   * Always use the most conservative (longest) requirement.
   */
  async getLongestRetention(
    db: D1Database,
    documentType: string,
    jurisdiction: string,
    entityType?: string
  ): Promise<RetentionRule | null> {
    const rules = await this.getApplicableRules(
      db, documentType, jurisdiction, entityType
    );

    if (rules.length === 0) return null;

    // Sort by total months descending, permanent (0 years) last-wins
    return rules.reduce((longest, rule) => {
      const longestMonths = longest.retentionYears === 0 && longest.retentionFrom === "PERMANENT"
        ? Infinity
        : longest.retentionYears * 12 + longest.retentionMonths;
      const ruleMonths = rule.retentionYears === 0 && rule.retentionFrom === "PERMANENT"
        ? Infinity
        : rule.retentionYears * 12 + rule.retentionMonths;
      return ruleMonths >= longestMonths ? rule : longest;
    });
  }

  /**
   * Create a retention schedule for a document based on applicable rules.
   */
  async scheduleRetention(
    db: D1Database,
    document: DocumentRecord,
    jurisdiction: string,
    entityType?: string
  ): Promise<RetentionSchedule | null> {
    const rule = await this.getLongestRetention(
      db, document.documentType, jurisdiction, entityType
    );

    if (!rule) return null;

    const triggerDate = document.uploadedAt;
    const expiresAt = this.calculateExpiration(rule, triggerDate);

    const schedule: RetentionSchedule = {
      id: generateId("ret"),
      clientId: document.clientId,
      documentId: document.id,
      retentionRuleId: rule.id,
      triggerDate,
      expiresAt,
      status: RetentionScheduleStatus.ACTIVE,
    };

    await db
      .prepare(
        `INSERT INTO retention_schedules
         (id, client_id, document_id, retention_rule_id, trigger_date, expires_at, status)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        schedule.id, schedule.clientId, schedule.documentId,
        schedule.retentionRuleId, schedule.triggerDate, schedule.expiresAt,
        schedule.status
      )
      .run();

    // Update the document record with retention info
    await db
      .prepare(
        `UPDATE document_records SET retention_rule_id = ?, retention_expires_at = ?
         WHERE id = ?`
      )
      .bind(rule.id, expiresAt, document.id)
      .run();

    return schedule;
  }

  /**
   * Calculate expiration date from a retention rule and trigger date.
   */
  calculateExpiration(rule: RetentionRule, triggerDate: string): string {
    if (rule.retentionFrom === "PERMANENT") {
      return "9999-12-31T23:59:59Z"; // Permanent retention
    }

    const trigger = new Date(triggerDate);
    trigger.setFullYear(trigger.getFullYear() + rule.retentionYears);
    trigger.setMonth(trigger.getMonth() + rule.retentionMonths);
    return trigger.toISOString();
  }

  /**
   * Check all documents approaching retention expiry (within 90 days).
   */
  async getExpiringSoon(
    db: D1Database,
    clientId: string,
    daysAhead: number = 90
  ): Promise<RetentionSchedule[]> {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() + daysAhead);

    const results = await db
      .prepare(
        `SELECT * FROM retention_schedules
         WHERE client_id = ?
         AND status = 'ACTIVE'
         AND expires_at <= ?
         AND expires_at > datetime('now')
         ORDER BY expires_at ASC`
      )
      .bind(clientId, cutoff.toISOString())
      .all<RetentionSchedule>();

    return results.results || [];
  }

  /**
   * Get documents past retention that can be disposed.
   */
  async getExpired(
    db: D1Database,
    clientId: string
  ): Promise<RetentionSchedule[]> {
    const results = await db
      .prepare(
        `SELECT * FROM retention_schedules
         WHERE client_id = ?
         AND status = 'ACTIVE'
         AND expires_at < datetime('now')
         ORDER BY expires_at ASC`
      )
      .bind(clientId)
      .all<RetentionSchedule>();

    return results.results || [];
  }

  /**
   * Get all documents under legal hold.
   */
  async getLegalHolds(
    db: D1Database,
    clientId: string
  ): Promise<RetentionSchedule[]> {
    const results = await db
      .prepare(
        `SELECT * FROM retention_schedules
         WHERE client_id = ?
         AND status = 'LEGAL_HOLD'
         ORDER BY trigger_date ASC`
      )
      .bind(clientId)
      .all<RetentionSchedule>();

    return results.results || [];
  }

  /**
   * Place a document on legal hold — overrides all retention schedules.
   */
  async placeLegalHold(
    db: D1Database,
    documentId: string,
    reason: string
  ): Promise<void> {
    await db
      .prepare(
        `UPDATE retention_schedules
         SET status = 'LEGAL_HOLD', hold_reason = ?
         WHERE document_id = ?`
      )
      .bind(reason, documentId)
      .run();

    await db
      .prepare(
        `UPDATE document_records
         SET is_legal_hold = 1, retention_hold_reason = ?
         WHERE id = ?`
      )
      .bind(reason, documentId)
      .run();
  }

  /**
   * Release a legal hold on a document.
   */
  async releaseLegalHold(
    db: D1Database,
    documentId: string
  ): Promise<void> {
    await db
      .prepare(
        `UPDATE retention_schedules
         SET status = 'ACTIVE', hold_reason = NULL
         WHERE document_id = ? AND status = 'LEGAL_HOLD'`
      )
      .bind(documentId)
      .run();

    await db
      .prepare(
        `UPDATE document_records
         SET is_legal_hold = 0, retention_hold_reason = NULL
         WHERE id = ?`
      )
      .bind(documentId)
      .run();
  }

  /**
   * Record disposal of a document per retention schedule.
   */
  async recordDisposal(
    db: D1Database,
    scheduleId: string,
    method: DisposalMethod,
    certificate?: string
  ): Promise<void> {
    await db
      .prepare(
        `UPDATE retention_schedules
         SET status = 'DISPOSED',
             disposed_at = datetime('now'),
             disposal_method = ?,
             disposal_certificate = ?
         WHERE id = ?`
      )
      .bind(method, certificate || null, scheduleId)
      .run();
  }

  /**
   * Get a full retention compliance summary for a client.
   */
  async getRetentionSummary(
    db: D1Database,
    clientId: string
  ): Promise<{
    totalDocuments: number;
    active: number;
    expiringSoon: number;
    expired: number;
    legalHold: number;
    disposed: number;
    complianceScore: number;
  }> {
    const results = await db
      .prepare(
        `SELECT status, COUNT(*) as count
         FROM retention_schedules
         WHERE client_id = ?
         GROUP BY status`
      )
      .bind(clientId)
      .all<{ status: string; count: number }>();

    const counts: Record<string, number> = {};
    for (const row of results.results || []) {
      counts[row.status] = row.count;
    }

    const active = counts["ACTIVE"] || 0;
    const expiringSoon = counts["EXPIRING_SOON"] || 0;
    const expired = counts["EXPIRED"] || 0;
    const legalHold = counts["LEGAL_HOLD"] || 0;
    const disposed = counts["DISPOSED"] || 0;
    const total = active + expiringSoon + expired + legalHold + disposed;

    // Score: percentage of documents properly managed (not expired without action)
    const managed = active + expiringSoon + legalHold + disposed;
    const score = total > 0 ? Math.round((managed / total) * 100) : 100;

    return {
      totalDocuments: total,
      active,
      expiringSoon,
      expired,
      legalHold,
      disposed,
      complianceScore: score,
    };
  }

  /**
   * List all retention rules, optionally filtered.
   */
  async listRules(
    db: D1Database,
    filters?: { jurisdiction?: string; basis?: string; documentType?: string }
  ): Promise<RetentionRule[]> {
    let query = "SELECT * FROM retention_rules WHERE is_active = 1";
    const binds: string[] = [];

    if (filters?.jurisdiction) {
      query += " AND (jurisdiction = ? OR jurisdiction = 'FEDERAL')";
      binds.push(filters.jurisdiction);
    }

    if (filters?.basis) {
      query += " AND basis = ?";
      binds.push(filters.basis);
    }

    query += " ORDER BY retention_years DESC, title ASC";

    const stmt = db.prepare(query);
    const results = binds.length > 0
      ? await stmt.bind(...binds).all<RetentionRule>()
      : await stmt.all<RetentionRule>();

    let rules = results.results || [];

    if (filters?.documentType) {
      rules = rules.filter((rule) => {
        try {
          const types = JSON.parse(rule.documentTypes || "[]");
          return types.includes(filters.documentType);
        } catch {
          return false;
        }
      });
    }

    return rules;
  }
}

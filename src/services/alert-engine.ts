/**
 * Alert Engine — Real-time notification system for high-risk pipeline leads
 *
 * Scans all 40 intelligence pipeline lead tables for new high-risk entries
 * and generates alerts with severity levels. Tracks alert lifecycle from
 * NEW → ACKNOWLEDGED → RESOLVED/DISMISSED.
 *
 * Uses db.batch() for all multi-statement operations.
 * Processes pipeline tables in batches of 10 to stay under D1 subrequest limits.
 */

// ═══════════════════════════════════════════════════════════════════════════
// Pipeline table mapping (same as pipeline-analytics.ts)
// ═══════════════════════════════════════════════════════════════════════════

const PIPELINE_TABLES: { table: string; agency: string; entityCol: string }[] = [
  { table: "fac_leads", agency: "FAC", entityCol: "auditee_name" },
  { table: "hhs_breach_leads", agency: "HHS", entityCol: "covered_entity" },
  { table: "edgar_leads", agency: "EDGAR", entityCol: "company_name" },
  { table: "sba_leads", agency: "SBA", entityCol: "firm_name" },
  { table: "spending_leads", agency: "USAspending", entityCol: "recipient_name" },
  { table: "epa_leads", agency: "EPA", entityCol: "facility_name" },
  { table: "cfpb_leads", agency: "CFPB", entityCol: "company" },
  { table: "osha_leads", agency: "OSHA", entityCol: "establishment_name" },
  { table: "fda_leads", agency: "FDA", entityCol: "recalling_firm" },
  { table: "ftc_leads", agency: "FTC", entityCol: "case_name" },
  { table: "recap_leads", agency: "RECAP", entityCol: "case_name" },
  { table: "eeoc_leads", agency: "EEOC", entityCol: "basis" },
  { table: "nlrb_leads", agency: "NLRB", entityCol: "case_name" },
  { table: "nhtsa_leads", agency: "NHTSA", entityCol: "entity" },
  { table: "fcc_leads", agency: "FCC", entityCol: "entity_name" },
  { table: "usda_leads", agency: "USDA", entityCol: "establishment" },
  { table: "cms_leads", agency: "CMS", entityCol: "facility_name" },
  { table: "sam_leads", agency: "SAM", entityCol: "entity_name" },
  { table: "msha_leads", agency: "MSHA", entityCol: "operator_name" },
  { table: "fmcsa_leads", agency: "FMCSA", entityCol: "legal_name" },
  { table: "ntsb_leads", agency: "NTSB", entityCol: "entity" },
  { table: "irs_leads", agency: "IRS", entityCol: "organization_name" },
  { table: "cpsc_leads", agency: "CPSC", entityCol: "manufacturer" },
  { table: "doe_leads", agency: "DOE", entityCol: "entity_name" },
  { table: "hud_leads", agency: "HUD", entityCol: "entity_name" },
  { table: "phmsa_leads", agency: "PHMSA", entityCol: "operator_name" },
  { table: "atf_leads", agency: "ATF", entityCol: "licensee" },
  { table: "cftc_leads", agency: "CFTC", entityCol: "respondent" },
  { table: "nrc_leads", agency: "NRC", entityCol: "licensee" },
  { table: "ferc_leads", agency: "FERC", entityCol: "respondent" },
  { table: "pbgc_leads", agency: "PBGC", entityCol: "sponsor_name" },
  { table: "sec_ia_leads", agency: "SEC-IA", entityCol: "respondent" },
  { table: "dcma_leads", agency: "DCMA", entityCol: "contractor" },
  { table: "ttb_leads", agency: "TTB", entityCol: "permit_holder" },
  { table: "ofac_leads", agency: "OFAC", entityCol: "entity_name" },
  { table: "fincen_leads", agency: "FinCEN", entityCol: "entity_name" },
  { table: "occ_leads", agency: "OCC", entityCol: "bank_name" },
  { table: "fdic_leads", agency: "FDIC", entityCol: "bank_name" },
  { table: "ncua_leads", agency: "NCUA", entityCol: "credit_union" },
];

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export type AlertSeverity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type AlertStatus = "NEW" | "ACKNOWLEDGED" | "RESOLVED" | "DISMISSED";

export interface Alert {
  id: string;
  source_pipeline: string;
  source_lead_id: string;
  entity_name: string;
  severity: AlertSeverity;
  risk_score: number;
  title: string;
  description: string;
  status: AlertStatus;
  created_at: string;
  acknowledged_at: string | null;
  resolved_at: string | null;
}

export interface AlertFilters {
  severity?: AlertSeverity;
  pipeline?: string;
  status?: AlertStatus;
  limit?: number;
  offset?: number;
}

export interface AlertStats {
  total: number;
  bySeverity: { CRITICAL: number; HIGH: number; MEDIUM: number; LOW: number };
  byStatus: { NEW: number; ACKNOWLEDGED: number; RESOLVED: number; DISMISSED: number };
  topPipelines: { pipeline: string; count: number }[];
  generatedAt: string;
}

export interface ScanResult {
  scannedPipelines: number;
  newAlerts: number;
  skippedDuplicates: number;
  errors: string[];
  duration: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════════════════

function classifySeverity(riskScore: number): AlertSeverity {
  if (riskScore >= 70) return "CRITICAL";
  if (riskScore >= 50) return "HIGH";
  if (riskScore >= 30) return "MEDIUM";
  return "LOW";
}

function generateId(): string {
  return `alert-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

// ═══════════════════════════════════════════════════════════════════════════
// Alert Engine
// ═══════════════════════════════════════════════════════════════════════════

export class AlertEngine {

  /**
   * Ensure the alerts table exists. Uses db.batch() per project conventions.
   */
  async ensureTable(db: D1Database): Promise<void> {
    await db.batch([
      db.prepare(`CREATE TABLE IF NOT EXISTS alerts (
        id TEXT PRIMARY KEY,
        source_pipeline TEXT NOT NULL,
        source_lead_id TEXT NOT NULL,
        entity_name TEXT NOT NULL DEFAULT '',
        severity TEXT NOT NULL DEFAULT 'MEDIUM',
        risk_score INTEGER NOT NULL DEFAULT 0,
        title TEXT NOT NULL DEFAULT '',
        description TEXT NOT NULL DEFAULT '',
        status TEXT NOT NULL DEFAULT 'NEW',
        created_at TEXT DEFAULT (datetime('now')),
        acknowledged_at TEXT,
        resolved_at TEXT
      )`),
      db.prepare("CREATE INDEX IF NOT EXISTS idx_alerts_status ON alerts(status)"),
      db.prepare("CREATE INDEX IF NOT EXISTS idx_alerts_severity ON alerts(severity)"),
      db.prepare("CREATE INDEX IF NOT EXISTS idx_alerts_pipeline ON alerts(source_pipeline)"),
      db.prepare("CREATE INDEX IF NOT EXISTS idx_alerts_created ON alerts(created_at DESC)"),
      db.prepare("CREATE UNIQUE INDEX IF NOT EXISTS idx_alerts_dedup ON alerts(source_pipeline, source_lead_id)"),
    ]);
  }

  /**
   * Scan all pipeline lead tables for new high-risk entries (last 24 hours).
   * Only creates alerts for leads that don't already have an alert row.
   * Processes in batches of 10 to stay under D1 subrequest limits.
   */
  async scanForAlerts(db: D1Database): Promise<ScanResult> {
    const start = Date.now();
    await this.ensureTable(db);

    let newAlerts = 0;
    let skippedDuplicates = 0;
    const errors: string[] = [];

    // Process pipeline tables in batches of 10
    for (let i = 0; i < PIPELINE_TABLES.length; i += 10) {
      const batch = PIPELINE_TABLES.slice(i, i + 10);

      // Query each table for leads with risk_score >= 50 created in last 24 hours
      const stmts = batch.map(p =>
        db.prepare(
          `SELECT rowid, ${p.entityCol} as entity, risk_score, risk_categories, created_at FROM ${p.table} WHERE risk_score >= 50 AND created_at >= datetime('now', '-1 day') ORDER BY risk_score DESC LIMIT 50`
        )
      );

      let results: D1Result[];
      try {
        results = await db.batch(stmts);
      } catch {
        // Tables may not exist yet
        for (const p of batch) {
          errors.push(`Table ${p.table} not accessible`);
        }
        continue;
      }

      // Collect all new alerts to insert
      const alertInserts: D1PreparedStatement[] = [];

      for (let j = 0; j < batch.length; j++) {
        const p = batch[j]!;
        const rows = (results[j]!.results ?? []) as Record<string, unknown>[];

        for (const row of rows) {
          const riskScore = Number(row["risk_score"] ?? 0);
          const entity = String(row["entity"] ?? "Unknown");
          const leadId = String(row["rowid"] ?? "");
          const categories = String(row["risk_categories"] ?? "[]");
          const severity = classifySeverity(riskScore);

          // Parse risk categories for description
          let categoryList: string[] = [];
          try { categoryList = JSON.parse(categories); } catch { /* ignore */ }

          const title = `${severity} risk: ${entity} (${p.agency})`;
          const description = `${p.agency} pipeline detected ${entity} with risk score ${riskScore}. Categories: ${categoryList.length > 0 ? categoryList.join(", ") : "unclassified"}.`;

          const id = generateId();
          alertInserts.push(
            db.prepare(
              "INSERT OR IGNORE INTO alerts (id, source_pipeline, source_lead_id, entity_name, severity, risk_score, title, description, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'NEW')"
            ).bind(id, p.agency, `${p.table}:${leadId}`, entity, severity, riskScore, title, description)
          );
        }
      }

      // Execute alert inserts in sub-batches of 50 to stay within limits
      for (let k = 0; k < alertInserts.length; k += 50) {
        const insertBatch = alertInserts.slice(k, k + 50);
        try {
          const insertResults = await db.batch(insertBatch);
          for (const r of insertResults) {
            if (r.meta?.changes && r.meta.changes > 0) {
              newAlerts++;
            } else {
              skippedDuplicates++;
            }
          }
        } catch {
          errors.push(`Insert batch failed at offset ${k}`);
        }
      }
    }

    return {
      scannedPipelines: PIPELINE_TABLES.length,
      newAlerts,
      skippedDuplicates,
      errors,
      duration: Date.now() - start,
    };
  }

  /**
   * Acknowledge an alert — marks it as seen by an operator.
   */
  async acknowledgeAlert(db: D1Database, id: string): Promise<{ success: boolean; error?: string }> {
    await this.ensureTable(db);
    const result = await db.prepare(
      "UPDATE alerts SET status = 'ACKNOWLEDGED', acknowledged_at = datetime('now') WHERE id = ? AND status = 'NEW'"
    ).bind(id).run();

    if (!result.meta?.changes || result.meta.changes === 0) {
      // Check if it exists at all
      const existing = await db.prepare("SELECT id, status FROM alerts WHERE id = ?").bind(id).first();
      if (!existing) return { success: false, error: "Alert not found" };
      return { success: false, error: `Alert is already ${existing["status"]}` };
    }
    return { success: true };
  }

  /**
   * Resolve an alert — marks the underlying issue as addressed.
   */
  async resolveAlert(db: D1Database, id: string): Promise<{ success: boolean; error?: string }> {
    await this.ensureTable(db);
    const result = await db.prepare(
      "UPDATE alerts SET status = 'RESOLVED', resolved_at = datetime('now') WHERE id = ? AND status IN ('NEW', 'ACKNOWLEDGED')"
    ).bind(id).run();

    if (!result.meta?.changes || result.meta.changes === 0) {
      const existing = await db.prepare("SELECT id, status FROM alerts WHERE id = ?").bind(id).first();
      if (!existing) return { success: false, error: "Alert not found" };
      return { success: false, error: `Alert is already ${existing["status"]}` };
    }
    return { success: true };
  }

  /**
   * Dismiss an alert — operator has reviewed and determined no action needed.
   */
  async dismissAlert(db: D1Database, id: string): Promise<{ success: boolean; error?: string }> {
    await this.ensureTable(db);
    const result = await db.prepare(
      "UPDATE alerts SET status = 'DISMISSED', resolved_at = datetime('now') WHERE id = ? AND status IN ('NEW', 'ACKNOWLEDGED')"
    ).bind(id).run();

    if (!result.meta?.changes || result.meta.changes === 0) {
      const existing = await db.prepare("SELECT id, status FROM alerts WHERE id = ?").bind(id).first();
      if (!existing) return { success: false, error: "Alert not found" };
      return { success: false, error: `Alert is already ${existing["status"]}` };
    }
    return { success: true };
  }

  /**
   * Get active alerts with optional filters.
   */
  async getActiveAlerts(db: D1Database, filters: AlertFilters = {}): Promise<{ alerts: Alert[]; total: number }> {
    await this.ensureTable(db);

    const conditions: string[] = [];
    const params: (string | number)[] = [];

    if (filters.severity) {
      conditions.push("severity = ?");
      params.push(filters.severity);
    }
    if (filters.pipeline) {
      conditions.push("source_pipeline = ?");
      params.push(filters.pipeline);
    }
    if (filters.status) {
      conditions.push("status = ?");
      params.push(filters.status);
    } else {
      // Default: show non-resolved/dismissed
      conditions.push("status IN ('NEW', 'ACKNOWLEDGED')");
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    const limit = Math.min(filters.limit ?? 50, 200);
    const offset = filters.offset ?? 0;

    const [countResult, alertsResult] = await db.batch([
      db.prepare(`SELECT COUNT(*) as cnt FROM alerts ${where}`).bind(...params),
      db.prepare(`SELECT * FROM alerts ${where} ORDER BY CASE severity WHEN 'CRITICAL' THEN 0 WHEN 'HIGH' THEN 1 WHEN 'MEDIUM' THEN 2 ELSE 3 END, created_at DESC LIMIT ? OFFSET ?`).bind(...params, limit, offset),
    ]);

    const total = Number((countResult!.results?.[0] as Record<string, unknown>)?.["cnt"] ?? 0);
    const alerts = (alertsResult!.results ?? []) as unknown as Alert[];

    return { alerts, total };
  }

  /**
   * Get alert statistics — counts by severity, status, and top pipelines.
   */
  async getAlertStats(db: D1Database): Promise<AlertStats> {
    await this.ensureTable(db);

    const [severityResult, statusResult, pipelineResult] = await db.batch([
      db.prepare("SELECT severity, COUNT(*) as cnt FROM alerts GROUP BY severity"),
      db.prepare("SELECT status, COUNT(*) as cnt FROM alerts GROUP BY status"),
      db.prepare("SELECT source_pipeline, COUNT(*) as cnt FROM alerts WHERE status IN ('NEW', 'ACKNOWLEDGED') GROUP BY source_pipeline ORDER BY cnt DESC LIMIT 15"),
    ]);

    const bySeverity = { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0 };
    for (const row of (severityResult!.results ?? []) as Record<string, unknown>[]) {
      const sev = String(row["severity"]) as AlertSeverity;
      if (sev in bySeverity) bySeverity[sev] = Number(row["cnt"] ?? 0);
    }

    const byStatus = { NEW: 0, ACKNOWLEDGED: 0, RESOLVED: 0, DISMISSED: 0 };
    for (const row of (statusResult!.results ?? []) as Record<string, unknown>[]) {
      const st = String(row["status"]) as AlertStatus;
      if (st in byStatus) byStatus[st] = Number(row["cnt"] ?? 0);
    }

    const topPipelines = ((pipelineResult!.results ?? []) as Record<string, unknown>[]).map(row => ({
      pipeline: String(row["source_pipeline"] ?? ""),
      count: Number(row["cnt"] ?? 0),
    }));

    return {
      total: bySeverity.CRITICAL + bySeverity.HIGH + bySeverity.MEDIUM + bySeverity.LOW,
      bySeverity,
      byStatus,
      topPipelines,
      generatedAt: new Date().toISOString(),
    };
  }
}

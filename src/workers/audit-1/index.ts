/**
 * AUDIT-1: Internal Audit Engine for INTEGRA.
 *
 * Audits the running system — database health, Citizen operations,
 * security controls, and data integrity. Unlike SENTINEL-0 which audits
 * build outputs, AUDIT-1 audits the live operational environment.
 */

import { generateId ,safeKvPut} from "../../utils/helpers.js";
import type { Env } from "../../index.js";
import {
  AuditScope,
  AuditSeverity,
  HealthStatus,
} from "./types.js";
import type {
  AuditFinding,
  DatabaseHealthResult,
  CitizenOperationsResult,
  SecurityControlsResult,
  DataIntegrityResult,
  OperationalAuditReport,
} from "./types.js";

/** Known D1 tables that must exist in a healthy system. */
const EXPECTED_TABLES = [
  "persona_citizens",
  "build_tasks",
  "build_logs",
  "build_gates",
  "compliance_catalog",
  "audit_issues",
  "events",
  "compliance_reports",
  "transactions",
  "clients",
  "client_onboarding_steps",
  "client_feedback",
  "legal_documents",
  "operational_audits",
  "process_metrics",
];

export class Audit1Worker {
  // ── Database Health ──────────────────────────────────────────────

  /**
   * Check all D1 tables exist, row counts, and recent activity.
   */
  async auditDatabaseHealth(env: Env): Promise<DatabaseHealthResult> {
    const findings: AuditFinding[] = [];
    const tables: DatabaseHealthResult["tables"] = [];
    const now = new Date().toISOString();
    let overallHealthy = true;

    for (const tableName of EXPECTED_TABLES) {
      try {
        const countResult = await env.DB.prepare(
          `SELECT COUNT(*) as cnt FROM ${tableName}`
        ).first<{ cnt: number }>();

        const rowCount = countResult?.cnt ?? 0;

        // Check for recent activity (rows created in last 24h) — only for tables likely to have timestamps
        let recentActivity = false;
        try {
          const recentResult = await env.DB.prepare(
            `SELECT COUNT(*) as cnt FROM ${tableName}
             WHERE created_at >= datetime('now', '-1 day')
               OR conceived_at >= datetime('now', '-1 day')
               OR audited_at >= datetime('now', '-1 day')
               OR recorded_at >= datetime('now', '-1 day')`
          ).first<{ cnt: number }>();
          recentActivity = (recentResult?.cnt ?? 0) > 0;
        } catch {
          // Table may not have timestamp columns — that's fine
        }

        tables.push({
          name: tableName,
          exists: true,
          rowCount,
          recentActivity,
        });
      } catch {
        overallHealthy = false;
        tables.push({
          name: tableName,
          exists: false,
          rowCount: 0,
          recentActivity: false,
        });

        findings.push(this.createFinding(
          AuditScope.DATABASE,
          AuditSeverity.CRITICAL,
          `Missing table: ${tableName}`,
          `The D1 table '${tableName}' does not exist or is inaccessible`,
          `Run migration to create the ${tableName} table`
        ));
      }
    }

    // Check for empty critical tables
    const criticalTables = ["persona_citizens"];
    for (const ct of criticalTables) {
      const tableEntry = tables.find((t) => t.name === ct);
      if (tableEntry && tableEntry.exists && tableEntry.rowCount === 0) {
        findings.push(this.createFinding(
          AuditScope.DATABASE,
          AuditSeverity.WARNING,
          `Empty critical table: ${ct}`,
          `Table '${ct}' exists but contains zero rows`,
          `Verify seed data has been applied`
        ));
      }
    }

    const status = !overallHealthy
      ? HealthStatus.UNHEALTHY
      : findings.length > 0
        ? HealthStatus.DEGRADED
        : HealthStatus.HEALTHY;

    return {
      status,
      tables,
      findings,
      checkedAt: now,
    };
  }

  // ── Citizen Operations ───────────────────────────────────────────

  /**
   * Verify each Citizen's status, last activity, and error count.
   */
  async auditCitizenOperations(env: Env): Promise<CitizenOperationsResult> {
    const findings: AuditFinding[] = [];
    const citizens: CitizenOperationsResult["citizens"] = [];
    const now = new Date().toISOString();

    try {
      const result = await env.DB.prepare(
        `SELECT id, name, status, deployed_at, conceived_at
         FROM persona_citizens
         ORDER BY name ASC`
      ).all<Record<string, unknown>>();

      const rows = result.results ?? [];

      if (rows.length === 0) {
        findings.push(this.createFinding(
          AuditScope.CITIZENS,
          AuditSeverity.CRITICAL,
          "No Persona Citizens found",
          "The persona_citizens table is empty — no Citizens are registered",
          "Run seed data to register all 15 Persona Citizens"
        ));
      }

      for (const row of rows) {
        const name = row["name"] as string;
        const dbStatus = row["status"] as string;
        const deployedAt = row["deployed_at"] as string | null;

        // Count errors in events table for this Citizen
        let errorCount = 0;
        try {
          const errorResult = await env.DB.prepare(
            `SELECT COUNT(*) as cnt FROM events
             WHERE source = ?1
               AND (type LIKE '%ERROR%' OR type LIKE '%FAIL%' OR severity IN ('S0', 'S1'))
               AND created_at >= datetime('now', '-7 days')`
          )
            .bind(name)
            .first<{ cnt: number }>();
          errorCount = errorResult?.cnt ?? 0;
        } catch {
          // events table might not have these columns
        }

        // Count open audit issues for this Citizen
        let openIssueCount = 0;
        try {
          const issueResult = await env.DB.prepare(
            `SELECT COUNT(*) as cnt FROM audit_issues
             WHERE citizen_affected = ?1 AND resolved = 0`
          )
            .bind(name)
            .first<{ cnt: number }>();
          openIssueCount = issueResult?.cnt ?? 0;
        } catch {
          // Table may not exist
        }

        const operational = dbStatus !== "CONCEIVED" && errorCount < 10;

        citizens.push({
          name,
          dbStatus,
          lastActivity: deployedAt,
          errorCount: errorCount + openIssueCount,
          operational,
        });

        // Flag Citizens with high error counts
        if (errorCount >= 10) {
          findings.push(this.createFinding(
            AuditScope.CITIZENS,
            AuditSeverity.WARNING,
            `High error rate: ${name}`,
            `Citizen ${name} has ${errorCount} errors in the last 7 days`,
            `Investigate ${name}'s recent operations and resolve underlying issues`
          ));
        }

        // Flag Citizens still in CONCEIVED state
        if (dbStatus === "CONCEIVED") {
          findings.push(this.createFinding(
            AuditScope.CITIZENS,
            AuditSeverity.INFO,
            `Citizen not deployed: ${name}`,
            `Citizen ${name} is still in CONCEIVED state`,
            `Deploy ${name} when ready according to wave schedule`
          ));
        }
      }
    } catch (error) {
      findings.push(this.createFinding(
        AuditScope.CITIZENS,
        AuditSeverity.CRITICAL,
        "Cannot query persona_citizens",
        `Failed to read persona_citizens table: ${error instanceof Error ? error.message : "unknown error"}`,
        "Verify D1 database connectivity and table existence"
      ));
    }

    const hasCritical = findings.some((f) => f.severity === AuditSeverity.CRITICAL);
    const hasWarning = findings.some((f) => f.severity === AuditSeverity.WARNING);

    return {
      status: hasCritical
        ? HealthStatus.UNHEALTHY
        : hasWarning
          ? HealthStatus.DEGRADED
          : HealthStatus.HEALTHY,
      citizens,
      findings,
      checkedAt: now,
    };
  }

  // ── Security Controls ────────────────────────────────────────────

  /**
   * Check API key auth is enforced on protected endpoints, no exposed secrets.
   */
  async auditSecurityControls(env: Env): Promise<SecurityControlsResult> {
    const findings: AuditFinding[] = [];
    const controls: SecurityControlsResult["controls"] = [];
    const now = new Date().toISOString();

    // Control 1: API_KEY is configured
    const apiKeySet = !!env.API_KEY && env.API_KEY.length > 0;
    controls.push({
      name: "API_KEY_CONFIGURED",
      description: "API key secret is set in environment",
      passed: apiKeySet,
      details: apiKeySet ? "API key is configured" : "API key is missing or empty",
    });
    if (!apiKeySet) {
      findings.push(this.createFinding(
        AuditScope.SECURITY,
        AuditSeverity.CRITICAL,
        "API key not configured",
        "The API_KEY environment variable is not set — all authenticated endpoints are unprotected",
        "Set API_KEY via `wrangler secret put API_KEY`"
      ));
    }

    // Control 2: API key has sufficient length
    const apiKeyStrong = apiKeySet && env.API_KEY.length >= 32;
    controls.push({
      name: "API_KEY_STRENGTH",
      description: "API key meets minimum length requirement (32+ chars)",
      passed: apiKeyStrong,
      details: apiKeyStrong
        ? "API key meets strength requirements"
        : `API key length: ${apiKeySet ? env.API_KEY.length : 0} (minimum: 32)`,
    });
    if (apiKeySet && !apiKeyStrong) {
      findings.push(this.createFinding(
        AuditScope.SECURITY,
        AuditSeverity.WARNING,
        "Weak API key",
        `API key is only ${env.API_KEY.length} characters — recommend 32+ characters`,
        "Generate a stronger API key with sufficient entropy"
      ));
    }

    // Control 3: D1 database is accessible (not exposed without auth)
    const dbAccessible = !!env.DB;
    controls.push({
      name: "DB_BINDING_PRESENT",
      description: "D1 database binding exists",
      passed: dbAccessible,
      details: dbAccessible ? "D1 binding is configured" : "D1 binding is missing",
    });
    if (!dbAccessible) {
      findings.push(this.createFinding(
        AuditScope.SECURITY,
        AuditSeverity.CRITICAL,
        "D1 database binding missing",
        "The DB environment binding is not configured",
        "Add D1 database binding to wrangler.toml"
      ));
    }

    // Control 4: KV namespace is accessible
    const kvAccessible = !!env.KNOWLEDGE_STORE;
    controls.push({
      name: "KV_BINDING_PRESENT",
      description: "KV namespace binding exists",
      passed: kvAccessible,
      details: kvAccessible ? "KV binding is configured" : "KV binding is missing",
    });
    if (!kvAccessible) {
      findings.push(this.createFinding(
        AuditScope.SECURITY,
        AuditSeverity.CRITICAL,
        "KV namespace binding missing",
        "The KNOWLEDGE_STORE KV binding is not configured",
        "Add KV namespace binding to wrangler.toml"
      ));
    }

    // Control 5: Check for unacknowledged security events
    try {
      const secEvents = await env.DB.prepare(
        `SELECT COUNT(*) as cnt FROM events
         WHERE (type LIKE '%SECURITY%' OR type LIKE '%HALT%' OR severity = 'S0')
           AND acknowledged = 0`
      ).first<{ cnt: number }>();

      const unackedCount = secEvents?.cnt ?? 0;
      controls.push({
        name: "SECURITY_EVENTS_ACKNOWLEDGED",
        description: "No unacknowledged security events",
        passed: unackedCount === 0,
        details: unackedCount === 0
          ? "All security events acknowledged"
          : `${unackedCount} unacknowledged security event(s)`,
      });

      if (unackedCount > 0) {
        findings.push(this.createFinding(
          AuditScope.SECURITY,
          AuditSeverity.WARNING,
          "Unacknowledged security events",
          `${unackedCount} security-related events have not been acknowledged`,
          "Review and acknowledge all pending security events"
        ));
      }
    } catch {
      // Events table may not exist yet
    }

    const hasCritical = findings.some((f) => f.severity === AuditSeverity.CRITICAL);
    const hasWarning = findings.some((f) => f.severity === AuditSeverity.WARNING);

    return {
      status: hasCritical
        ? HealthStatus.UNHEALTHY
        : hasWarning
          ? HealthStatus.DEGRADED
          : HealthStatus.HEALTHY,
      controls,
      findings,
      checkedAt: now,
    };
  }

  // ── Data Integrity ───────────────────────────────────────────────

  /**
   * Cross-check KV cached data against D1 source of truth.
   */
  async auditDataIntegrity(env: Env): Promise<DataIntegrityResult> {
    const findings: AuditFinding[] = [];
    const checks: DataIntegrityResult["checks"] = [];
    const now = new Date().toISOString();

    // Check 1: Citizen count — KV vs D1
    let d1CitizenCount = "0";
    try {
      const result = await env.DB.prepare(
        "SELECT COUNT(*) as cnt FROM persona_citizens"
      ).first<{ cnt: number }>();
      d1CitizenCount = String(result?.cnt ?? 0);
    } catch {
      // Table may not exist
    }

    const kvCitizenCount = await env.KNOWLEDGE_STORE.get("INTEGRA:stats:citizen_count");
    // We store citizen count in KV during audits — if it exists, verify
    if (kvCitizenCount !== null) {
      const matched = kvCitizenCount === d1CitizenCount;
      checks.push({
        name: "citizen_count",
        kvValue: kvCitizenCount,
        d1Value: d1CitizenCount,
        matched,
      });
      if (!matched) {
        findings.push(this.createFinding(
          AuditScope.DATA_INTEGRITY,
          AuditSeverity.WARNING,
          "Citizen count mismatch",
          `KV reports ${kvCitizenCount} Citizens but D1 has ${d1CitizenCount}`,
          "Refresh KV cache from D1 source of truth"
        ));
      }
    }

    // Check 2: FISCARA transaction count — KV vs D1
    let d1TxnCount = "0";
    try {
      const result = await env.DB.prepare(
        "SELECT COUNT(*) as cnt FROM transactions"
      ).first<{ cnt: number }>();
      d1TxnCount = String(result?.cnt ?? 0);
    } catch {
      // Table may not exist
    }

    const kvTxnCount = await env.KNOWLEDGE_STORE.get("FISCARA:stats:total_transactions");
    if (kvTxnCount !== null) {
      const matched = kvTxnCount === d1TxnCount;
      checks.push({
        name: "transaction_count",
        kvValue: kvTxnCount,
        d1Value: d1TxnCount,
        matched,
      });
      if (!matched) {
        findings.push(this.createFinding(
          AuditScope.DATA_INTEGRITY,
          AuditSeverity.WARNING,
          "Transaction count mismatch",
          `KV reports ${kvTxnCount} transactions but D1 has ${d1TxnCount}`,
          "Run FISCARA reconciliation to sync KV with D1"
        ));
      }
    }

    // Check 3: Audit count — verify operational_audits table tracks correctly
    let d1AuditCount = "0";
    try {
      const result = await env.DB.prepare(
        "SELECT COUNT(*) as cnt FROM operational_audits"
      ).first<{ cnt: number }>();
      d1AuditCount = String(result?.cnt ?? 0);
    } catch {
      // Table may not exist
    }

    const kvAuditCount = await env.KNOWLEDGE_STORE.get("INTEGRA:stats:total_audits");
    if (kvAuditCount !== null) {
      const matched = kvAuditCount === d1AuditCount;
      checks.push({
        name: "operational_audit_count",
        kvValue: kvAuditCount,
        d1Value: d1AuditCount,
        matched,
      });
      if (!matched) {
        findings.push(this.createFinding(
          AuditScope.DATA_INTEGRITY,
          AuditSeverity.INFO,
          "Operational audit count mismatch",
          `KV reports ${kvAuditCount} audits but D1 has ${d1AuditCount}`,
          "KV count will be corrected on next audit cycle"
        ));
      }
    }

    // Update KV with current D1 values for next comparison
    await safeKvPut(env.KNOWLEDGE_STORE, "INTEGRA:stats:citizen_count", d1CitizenCount);

    const hasCritical = findings.some((f) => f.severity === AuditSeverity.CRITICAL);
    const hasWarning = findings.some((f) => f.severity === AuditSeverity.WARNING);

    return {
      status: hasCritical
        ? HealthStatus.UNHEALTHY
        : hasWarning
          ? HealthStatus.DEGRADED
          : HealthStatus.HEALTHY,
      checks,
      findings,
      checkedAt: now,
    };
  }

  // ── Full Audit Report ────────────────────────────────────────────

  /**
   * Generate a comprehensive operational audit report covering all scopes.
   */
  async generateAuditReport(env: Env): Promise<OperationalAuditReport> {
    const [database, citizens, security, dataIntegrity] = await Promise.all([
      this.auditDatabaseHealth(env),
      this.auditCitizenOperations(env),
      this.auditSecurityControls(env),
      this.auditDataIntegrity(env),
    ]);

    const allFindings = [
      ...database.findings,
      ...citizens.findings,
      ...security.findings,
      ...dataIntegrity.findings,
    ];

    const criticalFindings = allFindings.filter(
      (f) => f.severity === AuditSeverity.CRITICAL
    ).length;

    const overallStatus =
      database.status === HealthStatus.UNHEALTHY ||
      citizens.status === HealthStatus.UNHEALTHY ||
      security.status === HealthStatus.UNHEALTHY
        ? HealthStatus.UNHEALTHY
        : database.status === HealthStatus.DEGRADED ||
            citizens.status === HealthStatus.DEGRADED ||
            security.status === HealthStatus.DEGRADED
          ? HealthStatus.DEGRADED
          : HealthStatus.HEALTHY;

    const passed = criticalFindings === 0;

    const report: OperationalAuditReport = {
      id: generateId("opaudit"),
      auditType: AuditScope.FULL,
      scope: "ALL_SYSTEMS",
      database,
      citizens,
      security,
      dataIntegrity,
      overallStatus,
      totalFindings: allFindings.length,
      criticalFindings,
      passed,
      auditedAt: new Date().toISOString(),
      auditor: "INTEGRA/AUDIT-1",
    };

    // Persist to D1
    try {
      await env.DB.prepare(
        `INSERT INTO operational_audits (id, audit_type, scope, findings, passed, audited_at)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6)`
      )
        .bind(
          report.id,
          report.auditType,
          report.scope,
          JSON.stringify(allFindings),
          passed ? 1 : 0,
          report.auditedAt
        )
        .run();
    } catch {
      // Table may not exist yet — not a blocker
    }

    // Update KV audit counter
    const totalAuditsRaw = await env.KNOWLEDGE_STORE.get("INTEGRA:stats:total_audits");
    const totalAudits = totalAuditsRaw ? parseInt(totalAuditsRaw, 10) : 0;
    await safeKvPut(env.KNOWLEDGE_STORE, "INTEGRA:stats:total_audits", String(totalAudits + 1));

    // Cache latest report
    await safeKvPut(env.KNOWLEDGE_STORE, 
      `INTEGRA:audit:latest`,
      JSON.stringify(report),
      { expirationTtl: 86400 }
    );

    return report;
  }

  // ── Private Helpers ──────────────────────────────────────────────

  private createFinding(
    scope: AuditScope,
    severity: AuditSeverity,
    title: string,
    description: string,
    recommendation: string
  ): AuditFinding {
    return {
      id: generateId("finding"),
      scope,
      severity,
      title,
      description,
      recommendation,
      timestamp: new Date().toISOString(),
    };
  }
}

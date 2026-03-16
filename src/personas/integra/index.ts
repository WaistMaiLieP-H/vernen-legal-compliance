/**
 * INTEGRA — Internal Compliance & Operational Integrity Citizen.
 *
 * Wave 5 Persona Citizen. Oversight Committee Chair.
 * Audits the RUNNING SYSTEM — not the build (that's SENTINEL-0's job).
 * INTEGRA ensures all internal operations, controls, and processes are
 * working correctly. The internal watchdog: thorough and independent.
 *
 * Workers:
 *   - AUDIT-1: Internal audit engine (database, Citizens, security, data integrity)
 *   - PROC-1: Process optimization (response times, bottlenecks, metrics)
 */

import { PersonaCitizenBase } from "../base.js";
import { PersonaCitizenStatus } from "../../types/persona.js";
import { generateId } from "../../utils/helpers.js";
import { Audit1Worker } from "../../workers/audit-1/index.js";
import { Proc1Worker } from "../../workers/proc-1/index.js";
import { HealthStatus } from "../../workers/audit-1/types.js";
import type { OperationalAuditReport } from "../../workers/audit-1/types.js";
import type { ProcessMetrics } from "../../workers/proc-1/types.js";
import type { Env } from "../../index.js";

/** KV namespace prefix for all INTEGRA knowledge entries. */
const KV_PREFIX = "INTEGRA:";

/** D1 table where persona citizen records live. */
const PERSONA_TABLE = "persona_citizens";

/**
 * Shape of a row in the persona_citizens D1 table.
 */
interface PersonaRow {
  id: string;
  name: string;
  status: string;
  deployed_at: string | null;
  conceived_at: string;
}

/**
 * INTEGRA — The Internal Compliance & Operational Integrity Persona Citizen.
 * Audits the running system and ensures all operations are within parameters.
 */
export class Integra extends PersonaCitizenBase {
  private audit: Audit1Worker;
  private proc: Proc1Worker;

  constructor() {
    super("INTEGRA", "integra-knowledge", PersonaCitizenStatus.CONCEIVED);
    this.audit = new Audit1Worker();
    this.proc = new Proc1Worker();
  }

  // ---------------------------------------------------------------------------
  // Lifecycle overrides
  // ---------------------------------------------------------------------------

  /**
   * Initialize INTEGRA by reading its status from D1 and setting up its
   * knowledge store namespace in KV.
   */
  async initialize(env: Env): Promise<void> {
    try {
      const row = await env.DB.prepare(
        `SELECT id, name, status, deployed_at, conceived_at
         FROM ${PERSONA_TABLE}
         WHERE name = ?1
         LIMIT 1`
      )
        .bind("INTEGRA")
        .first<PersonaRow>();

      if (row) {
        const dbStatus = row.status as PersonaCitizenStatus;
        if (Object.values(PersonaCitizenStatus).includes(dbStatus)) {
          this._status = dbStatus;
        }
      } else {
        // First boot — insert persona record
        await env.DB.prepare(
          `INSERT OR IGNORE INTO ${PERSONA_TABLE}
           (id, name, status, conceived_at)
           VALUES (?1, ?2, ?3, ?4)`
        )
          .bind(
            generateId("persona"),
            "INTEGRA",
            PersonaCitizenStatus.SHELL_DEPLOYED,
            new Date().toISOString()
          )
          .run();

        this._status = PersonaCitizenStatus.SHELL_DEPLOYED;
      }
    } catch {
      this._status = PersonaCitizenStatus.SHELL_DEPLOYED;
    }

    // Initialize KV knowledge namespace with boot marker
    const bootKey = `${KV_PREFIX}system:last_boot`;
    await env.KNOWLEDGE_STORE.put(bootKey, new Date().toISOString());

    // Ensure KV counters exist
    const totalAuditKey = `${KV_PREFIX}stats:total_audits`;
    const existing = await env.KNOWLEDGE_STORE.get(totalAuditKey);
    if (existing === null) {
      await env.KNOWLEDGE_STORE.put(totalAuditKey, "0");
    }
  }

  /**
   * Handle inbound events from the system or other Persona Citizens.
   */
  async receiveEvent(
    event: string,
    payload: unknown,
    env: Env
  ): Promise<void> {
    switch (event) {
      case "system_health_check": {
        // Run a full operational audit in response to a health check request
        await this.runOperationalAudit(env);
        break;
      }

      case "policy_review_due": {
        // Check if all Citizens are operating within defined parameters
        await this.getPolicyCompliance(env);
        break;
      }

      case "incident_detected": {
        const data = payload as {
          source?: string;
          severity?: string;
          description?: string;
        };
        // Record the incident and run a targeted audit
        await this._recordKnowledge(
          `incident:${Date.now()}`,
          {
            event: "incident_detected",
            source: data.source,
            severity: data.severity,
            description: data.description,
            receivedAt: new Date().toISOString(),
          },
          env
        );
        // Run full audit after incident
        await this.runOperationalAudit(env);
        break;
      }

      default:
        await this._recordKnowledge(
          `unknown_event:${Date.now()}`,
          { event, payload, receivedAt: new Date().toISOString() },
          env
        );
        break;
    }
  }

  /**
   * Search INTEGRA's KV knowledge store by query string.
   */
  async queryKnowledge(
    query: string,
    env: Env
  ): Promise<{
    query: string;
    results: Array<{ key: string; value: unknown }>;
    source: string;
  }> {
    const prefix = `${KV_PREFIX}${query}`;
    const listResult = await env.KNOWLEDGE_STORE.list({ prefix, limit: 50 });

    const results: Array<{ key: string; value: unknown }> = [];
    for (const keyEntry of listResult.keys) {
      const value = await env.KNOWLEDGE_STORE.get(keyEntry.name, "json");
      if (value !== null) {
        results.push({
          key: keyEntry.name.slice(KV_PREFIX.length),
          value,
        });
      }
    }

    return { query, results, source: this.name };
  }

  // ---------------------------------------------------------------------------
  // Operational audit methods
  // ---------------------------------------------------------------------------

  /**
   * Run a comprehensive operational audit of the entire running system.
   * Checks D1 table health, KV connectivity, Citizen statuses, and error rates.
   */
  async runOperationalAudit(env: Env): Promise<OperationalAuditReport> {
    return this.audit.generateAuditReport(env);
  }

  /**
   * Test a specific internal control by ID.
   * Control IDs: "database", "citizens", "security", "data_integrity"
   */
  async runControlTest(
    controlId: string,
    env: Env
  ): Promise<{
    controlId: string;
    status: HealthStatus;
    findings: unknown[];
    testedAt: string;
  }> {
    const now = new Date().toISOString();

    switch (controlId) {
      case "database": {
        const result = await this.audit.auditDatabaseHealth(env);
        return {
          controlId,
          status: result.status,
          findings: result.findings,
          testedAt: now,
        };
      }
      case "citizens": {
        const result = await this.audit.auditCitizenOperations(env);
        return {
          controlId,
          status: result.status,
          findings: result.findings,
          testedAt: now,
        };
      }
      case "security": {
        const result = await this.audit.auditSecurityControls(env);
        return {
          controlId,
          status: result.status,
          findings: result.findings,
          testedAt: now,
        };
      }
      case "data_integrity": {
        const result = await this.audit.auditDataIntegrity(env);
        return {
          controlId,
          status: result.status,
          findings: result.findings,
          testedAt: now,
        };
      }
      default:
        return {
          controlId,
          status: HealthStatus.UNHEALTHY,
          findings: [
            {
              error: `Unknown control ID: ${controlId}`,
              validControls: [
                "database",
                "citizens",
                "security",
                "data_integrity",
              ],
            },
          ],
          testedAt: now,
        };
    }
  }

  /**
   * Retrieve past operational audits from D1.
   */
  async getAuditHistory(
    env: Env,
    limit = 20
  ): Promise<{
    audits: Array<{
      id: string;
      auditType: string;
      scope: string;
      findingCount: number;
      passed: boolean;
      auditedAt: string;
    }>;
    total: number;
  }> {
    let audits: Array<{
      id: string;
      auditType: string;
      scope: string;
      findingCount: number;
      passed: boolean;
      auditedAt: string;
    }> = [];
    let total = 0;

    try {
      const countResult = await env.DB.prepare(
        "SELECT COUNT(*) as cnt FROM operational_audits"
      ).first<{ cnt: number }>();
      total = countResult?.cnt ?? 0;

      const result = await env.DB.prepare(
        `SELECT id, audit_type, scope, findings, passed, audited_at
         FROM operational_audits
         ORDER BY audited_at DESC
         LIMIT ?1`
      )
        .bind(limit)
        .all<{
          id: string;
          audit_type: string;
          scope: string;
          findings: string;
          passed: number;
          audited_at: string;
        }>();

      if (result.success && result.results) {
        audits = result.results.map((row) => {
          let findingCount = 0;
          try {
            const findings = JSON.parse(row.findings);
            findingCount = Array.isArray(findings) ? findings.length : 0;
          } catch {
            // Unparseable
          }

          return {
            id: row.id,
            auditType: row.audit_type,
            scope: row.scope,
            findingCount,
            passed: row.passed === 1,
            auditedAt: row.audited_at,
          };
        });
      }
    } catch {
      // Table may not exist
    }

    return { audits, total };
  }

  /**
   * Check if all Citizens are operating within their defined parameters.
   * Returns a compliance snapshot for each registered Citizen.
   */
  async getPolicyCompliance(env: Env): Promise<{
    compliant: boolean;
    citizens: Array<{
      name: string;
      status: string;
      withinParameters: boolean;
      issues: string[];
    }>;
    checkedAt: string;
  }> {
    const citizenResults: Array<{
      name: string;
      status: string;
      withinParameters: boolean;
      issues: string[];
    }> = [];
    const now = new Date().toISOString();

    try {
      const result = await env.DB.prepare(
        `SELECT name, status FROM persona_citizens ORDER BY name ASC`
      ).all<{ name: string; status: string }>();

      const rows = result.results ?? [];

      for (const row of rows) {
        const issues: string[] = [];
        let withinParameters = true;

        // Check 1: Status is a valid lifecycle state
        if (
          !Object.values(PersonaCitizenStatus).includes(
            row.status as PersonaCitizenStatus
          )
        ) {
          issues.push(`Invalid status: '${row.status}'`);
          withinParameters = false;
        }

        // Check 2: Open critical issues
        try {
          const critResult = await env.DB.prepare(
            `SELECT COUNT(*) as cnt FROM audit_issues
             WHERE citizen_affected = ?1 AND resolved = 0 AND severity IN ('S0', 'S1')`
          )
            .bind(row.name)
            .first<{ cnt: number }>();

          const critCount = critResult?.cnt ?? 0;
          if (critCount > 0) {
            issues.push(`${critCount} unresolved critical issue(s)`);
            withinParameters = false;
          }
        } catch {
          // Table may not exist
        }

        // Check 3: Recent errors
        try {
          const errResult = await env.DB.prepare(
            `SELECT COUNT(*) as cnt FROM events
             WHERE source = ?1
               AND (type LIKE '%ERROR%' OR type LIKE '%FAIL%')
               AND created_at >= datetime('now', '-24 hours')`
          )
            .bind(row.name)
            .first<{ cnt: number }>();

          const errCount = errResult?.cnt ?? 0;
          if (errCount >= 5) {
            issues.push(`${errCount} errors in last 24 hours`);
            withinParameters = false;
          }
        } catch {
          // Table may not exist
        }

        citizenResults.push({
          name: row.name,
          status: row.status,
          withinParameters,
          issues,
        });
      }
    } catch {
      // persona_citizens table may not exist
    }

    const allCompliant = citizenResults.every((c) => c.withinParameters);

    // Record compliance snapshot in KV
    await this._recordKnowledge(
      "compliance:latest",
      {
        compliant: allCompliant,
        citizenCount: citizenResults.length,
        nonCompliantCount: citizenResults.filter((c) => !c.withinParameters)
          .length,
        checkedAt: now,
      },
      env
    );

    return {
      compliant: allCompliant,
      citizens: citizenResults,
      checkedAt: now,
    };
  }

  /**
   * Get INTEGRA operational stats.
   */
  async getStats(env: Env): Promise<{
    status: PersonaCitizenStatus;
    lastBoot: string | null;
    totalAudits: number;
    lastAuditPassed: boolean | null;
  }> {
    const lastBoot = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}system:last_boot`
    );
    const totalAuditsRaw = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}stats:total_audits`
    );
    const totalAudits = totalAuditsRaw ? parseInt(totalAuditsRaw, 10) : 0;

    // Get last audit pass/fail
    let lastAuditPassed: boolean | null = null;
    try {
      const lastAudit = await env.DB.prepare(
        `SELECT passed FROM operational_audits ORDER BY audited_at DESC LIMIT 1`
      ).first<{ passed: number }>();
      if (lastAudit) {
        lastAuditPassed = lastAudit.passed === 1;
      }
    } catch {
      // Table may not exist
    }

    return {
      status: this._status,
      lastBoot,
      totalAudits,
      lastAuditPassed,
    };
  }

  /**
   * Get process metrics from PROC-1.
   */
  async getProcessMetrics(env: Env): Promise<ProcessMetrics> {
    return this.proc.getProcessMetrics(env);
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  private async _recordKnowledge(
    key: string,
    value: unknown,
    env: Env
  ): Promise<void> {
    const fullKey = `${KV_PREFIX}${key}`;
    await env.KNOWLEDGE_STORE.put(fullKey, JSON.stringify(value));
  }
}

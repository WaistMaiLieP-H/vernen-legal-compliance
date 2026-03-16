import { PersonaCitizenBase } from "../base.js";
import type { Client } from "../../types/client.js";
import type { USState, BusinessEntityType } from "../../types/client.js";
import type {
  ComplianceReport,
  ComplianceCheckResult,
} from "../../types/compliance.js";
import { ComplianceStatus } from "../../types/compliance.js";
import { PersonaCitizenStatus } from "../../types/persona.js";
import { ComplianceEngine } from "../../services/compliance-engine.js";
import { ReportGenerator } from "../../services/report-generator.js";
import { Scan1Worker } from "../../workers/scan-1/index.js";
import { generateId } from "../../utils/helpers.js";
import type { Env } from "../../index.js";

/** KV namespace prefix for all REGULIS knowledge entries. */
const KV_PREFIX = "REGULIS:";

/** D1 table where persona citizen records live. */
const PERSONA_TABLE = "persona_citizens";

/** D1 table where generated reports are persisted. */
const REPORTS_TABLE = "compliance_reports";

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
 * Shape of a row in the compliance_reports D1 table.
 */
interface ReportRow {
  id: string;
  client_id: string;
  state: string;
  entity_type: string;
  results_json: string;
  score: number;
  generated_at: string;
  generated_by: string;
  paid: number;
}

/**
 * REGULIS — The Regulatory Intelligence Persona Citizen.
 * First revenue-generating Persona Citizen in the Vernen ecosystem.
 * Specializes in multi-state compliance analysis and reporting.
 *
 * REGULIS sells compliance reports. It scans federal and state regulatory
 * databases via SCAN-1, processes results through the ComplianceEngine,
 * generates professional reports, and continuously records learned knowledge
 * to improve over time.
 */
export class Regulis extends PersonaCitizenBase {
  private complianceEngine: ComplianceEngine;
  private reportGenerator: ReportGenerator;
  private scanner: Scan1Worker;

  constructor() {
    super("REGULIS", "regulis-knowledge", PersonaCitizenStatus.CONCEIVED);
    this.complianceEngine = new ComplianceEngine();
    this.reportGenerator = new ReportGenerator();
    this.scanner = new Scan1Worker();
  }

  // ---------------------------------------------------------------------------
  // Lifecycle overrides
  // ---------------------------------------------------------------------------

  /**
   * Initialize REGULIS by reading its status from D1 and setting up its
   * knowledge store namespace in KV.
   */
  async initialize(env: Env): Promise<void> {
    // Attempt to read current status from D1
    try {
      const row = await env.DB.prepare(
        `SELECT id, name, status, deployed_at, conceived_at
         FROM ${PERSONA_TABLE}
         WHERE name = ?1
         LIMIT 1`
      )
        .bind("REGULIS")
        .first<PersonaRow>();

      if (row) {
        // Restore status from database
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
            "REGULIS",
            PersonaCitizenStatus.SHELL_DEPLOYED,
            new Date().toISOString()
          )
          .run();

        this._status = PersonaCitizenStatus.SHELL_DEPLOYED;
      }
    } catch {
      // If the table doesn't exist yet, gracefully default
      this._status = PersonaCitizenStatus.SHELL_DEPLOYED;
    }

    // Initialize KV knowledge namespace with boot marker
    const bootKey = `${KV_PREFIX}system:last_boot`;
    await env.KNOWLEDGE_STORE.put(bootKey, new Date().toISOString());

    // Ensure counters exist
    const totalChecksKey = `${KV_PREFIX}stats:total_checks`;
    const existing = await env.KNOWLEDGE_STORE.get(totalChecksKey);
    if (existing === null) {
      await env.KNOWLEDGE_STORE.put(totalChecksKey, "0");
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
      case "compliance_check_requested": {
        const data = payload as {
          state: USState;
          entityType: BusinessEntityType;
          businessName?: string;
        };
        await this.performComplianceCheck(
          data.state,
          data.entityType,
          env,
          data.businessName
        );
        break;
      }

      case "regulatory_change_detected": {
        const data = payload as {
          ruleId: string;
          state?: USState;
          description: string;
        };
        // Record the regulatory change in knowledge store
        await this.recordKnowledge(
          `regulatory_change:${data.ruleId}:${Date.now()}`,
          {
            ruleId: data.ruleId,
            state: data.state,
            description: data.description,
            detectedAt: new Date().toISOString(),
          },
          env
        );
        break;
      }

      case "client_registered": {
        const data = payload as {
          clientId: string;
          entityType: BusinessEntityType;
          states: USState[];
        };
        // Record new client interest for demand tracking
        await this.recordKnowledge(
          `client_registered:${data.clientId}`,
          {
            entityType: data.entityType,
            states: data.states,
            registeredAt: new Date().toISOString(),
          },
          env
        );
        break;
      }

      default:
        // Unknown events are logged to knowledge store for review
        await this.recordKnowledge(
          `unknown_event:${Date.now()}`,
          { event, payload, receivedAt: new Date().toISOString() },
          env
        );
        break;
    }
  }

  /**
   * Search REGULIS's KV knowledge store by query string.
   * Returns matching keys and values from the REGULIS namespace.
   */
  async queryKnowledge(
    query: string,
    env: Env
  ): Promise<{ query: string; results: Array<{ key: string; value: unknown }>; source: string }> {
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
  // Revenue product: Compliance Check
  // ---------------------------------------------------------------------------

  /**
   * The main revenue product. Runs a full compliance check for a given state
   * and entity type:
   *   1. Scans federal + state rules via SCAN-1
   *   2. Processes through ComplianceEngine
   *   3. Generates a ComplianceReport
   *   4. Persists the report to D1
   *   5. Records knowledge for self-improvement
   */
  async performComplianceCheck(
    state: USState,
    entityType: BusinessEntityType,
    env: Env,
    businessName?: string
  ): Promise<ComplianceReport> {
    // Build a client object for the scan
    const client: Client = {
      id: generateId("cli"),
      name: businessName ?? "Anonymous",
      entityType,
      states: [state],
      industry: "General",
      createdAt: new Date().toISOString(),
    };

    // 1. Scan rules via SCAN-1
    const allRules = [
      ...(await this.scanner.scanFederal(entityType, env.DB)),
      ...(await this.scanner.scanState(state, entityType, env.DB)),
    ];

    // 2. Process through ComplianceEngine
    this.complianceEngine.loadRules(allRules);
    const checkResults = this.complianceEngine.checkCompliance(client, [state]);

    // 3. Generate report
    const report: ComplianceReport = {
      id: generateId("rpt"),
      clientId: client.id,
      states: [state],
      entityType,
      results: checkResults,
      generatedAt: new Date().toISOString(),
      generatedBy: this.name,
    };

    const score = this.reportGenerator.calculateScore(checkResults);

    // 4. Persist report to D1
    try {
      await env.DB.prepare(
        `INSERT INTO ${REPORTS_TABLE}
         (id, client_id, state, entity_type, results_json, score, generated_at, generated_by, paid)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)`
      )
        .bind(
          report.id,
          client.id,
          state,
          entityType,
          JSON.stringify(checkResults),
          score,
          report.generatedAt,
          this.name,
          0
        )
        .run();
    } catch {
      // If table doesn't exist yet, store in KV as fallback
      await env.KNOWLEDGE_STORE.put(
        `${KV_PREFIX}report:${report.id}`,
        JSON.stringify(report)
      );
    }

    // Also store in KV for fast retrieval
    await env.KNOWLEDGE_STORE.put(
      `${KV_PREFIX}report:${report.id}`,
      JSON.stringify(report),
      { expirationTtl: 180 * 86400 } // 180 days
    );

    // 5. Record knowledge for self-improvement
    await this._recordCheckKnowledge(state, entityType, checkResults, env);

    return report;
  }

  // ---------------------------------------------------------------------------
  // Stats and reporting
  // ---------------------------------------------------------------------------

  /**
   * Retrieve operational statistics about REGULIS's activity.
   */
  async getComplianceStats(env: Env): Promise<{
    totalChecks: number;
    reportsGenerated: number;
    statesCovered: string[];
    topIssues: Array<{ ruleId: string; count: number }>;
    status: PersonaCitizenStatus;
    lastBoot: string | null;
  }> {
    // Total checks from KV counter
    const totalChecksRaw = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}stats:total_checks`
    );
    const totalChecks = totalChecksRaw ? parseInt(totalChecksRaw, 10) : 0;

    // Reports generated — try D1 first, fall back to KV
    let reportsGenerated = 0;
    try {
      const countRow = await env.DB.prepare(
        `SELECT COUNT(*) as count FROM ${REPORTS_TABLE} WHERE generated_by = ?1`
      )
        .bind("REGULIS")
        .first<{ count: number }>();
      reportsGenerated = countRow?.count ?? 0;
    } catch {
      // Fall back to KV counter
      const kvCount = await env.KNOWLEDGE_STORE.get(
        `${KV_PREFIX}stats:reports_generated`
      );
      reportsGenerated = kvCount ? parseInt(kvCount, 10) : 0;
    }

    // States covered — read from KV set
    const statesCoveredRaw = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}stats:states_covered`,
      "json"
    );
    const statesCovered = (statesCoveredRaw as string[]) ?? [];

    // Top issues — read from KV
    const topIssuesRaw = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}stats:top_issues`,
      "json"
    );
    const topIssues =
      (topIssuesRaw as Array<{ ruleId: string; count: number }>) ?? [];

    // Last boot
    const lastBoot = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}system:last_boot`
    );

    return {
      totalChecks,
      reportsGenerated,
      statesCovered,
      topIssues: topIssues.slice(0, 10),
      status: this._status,
      lastBoot,
    };
  }

  /**
   * Store a piece of learned knowledge in REGULIS's KV namespace.
   */
  async recordKnowledge(
    key: string,
    value: unknown,
    env: Env
  ): Promise<void> {
    const fullKey = `${KV_PREFIX}${key}`;
    await env.KNOWLEDGE_STORE.put(fullKey, JSON.stringify(value));
  }

  /**
   * Retrieve recent reports from D1, ordered by generation date descending.
   */
  async getRecentReports(
    limit: number,
    env: Env
  ): Promise<ComplianceReport[]> {
    try {
      const result = await env.DB.prepare(
        `SELECT id, client_id, state, entity_type, results_json, score,
                generated_at, generated_by, paid
         FROM ${REPORTS_TABLE}
         WHERE generated_by = ?1
         ORDER BY generated_at DESC
         LIMIT ?2`
      )
        .bind("REGULIS", limit)
        .all<ReportRow>();

      if (!result.success || !result.results) {
        return [];
      }

      return result.results.map((row) => ({
        id: row.id,
        clientId: row.client_id,
        states: [row.state] as USState[],
        entityType: row.entity_type as BusinessEntityType,
        results: JSON.parse(row.results_json) as ComplianceCheckResult[],
        generatedAt: row.generated_at,
        generatedBy: row.generated_by,
      }));
    } catch {
      // If the table doesn't exist, return empty
      return [];
    }
  }

  /**
   * Retrieve a single report by ID. Checks D1 first, then KV.
   */
  async getReportById(
    reportId: string,
    env: Env
  ): Promise<ComplianceReport | null> {
    // Try D1
    try {
      const row = await env.DB.prepare(
        `SELECT id, client_id, state, entity_type, results_json, score,
                generated_at, generated_by, paid
         FROM ${REPORTS_TABLE}
         WHERE id = ?1
         LIMIT 1`
      )
        .bind(reportId)
        .first<ReportRow>();

      if (row) {
        return {
          id: row.id,
          clientId: row.client_id,
          states: [row.state] as USState[],
          entityType: row.entity_type as BusinessEntityType,
          results: JSON.parse(row.results_json) as ComplianceCheckResult[],
          generatedAt: row.generated_at,
          generatedBy: row.generated_by,
        };
      }
    } catch {
      // Table may not exist, fall through to KV
    }

    // Fall back to KV
    const kvData = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}report:${reportId}`,
      "json"
    );
    return (kvData as ComplianceReport) ?? null;
  }

  /**
   * Check whether a report has been paid for.
   */
  async isReportPaid(reportId: string, env: Env): Promise<boolean> {
    try {
      const row = await env.DB.prepare(
        `SELECT paid FROM ${REPORTS_TABLE} WHERE id = ?1 LIMIT 1`
      )
        .bind(reportId)
        .first<{ paid: number }>();

      return row?.paid === 1;
    } catch {
      return false;
    }
  }

  /**
   * Get the count of rules tracked per state from D1.
   */
  async getStateRuleCounts(
    env: Env
  ): Promise<Array<{ state: string; ruleCount: number }>> {
    try {
      const result = await env.DB.prepare(
        `SELECT state, COUNT(*) as rule_count
         FROM compliance_rules
         WHERE state IS NOT NULL
         GROUP BY state
         ORDER BY state`
      ).all<{ state: string; rule_count: number }>();

      if (!result.success || !result.results) {
        return [];
      }

      return result.results.map((row) => ({
        state: row.state,
        ruleCount: row.rule_count,
      }));
    } catch {
      return [];
    }
  }

  /**
   * Get the total count of rules tracked (federal + state).
   */
  async getTotalRuleCount(env: Env): Promise<number> {
    try {
      const row = await env.DB.prepare(
        `SELECT COUNT(*) as count FROM compliance_rules`
      ).first<{ count: number }>();

      return row?.count ?? 0;
    } catch {
      return 0;
    }
  }

  // ---------------------------------------------------------------------------
  // Private: Knowledge recording after each compliance check
  // ---------------------------------------------------------------------------

  /**
   * After every compliance check, record knowledge for self-improvement:
   *   - Which state was checked (frequency)
   *   - Which entity type was checked (demand)
   *   - Which rules most often trigger NEEDS_REVIEW (expertise)
   *   - Increment total check count
   */
  private async _recordCheckKnowledge(
    state: USState,
    entityType: BusinessEntityType,
    results: ComplianceCheckResult[],
    env: Env
  ): Promise<void> {
    // 1. Increment total checks
    const totalKey = `${KV_PREFIX}stats:total_checks`;
    const currentTotal = await env.KNOWLEDGE_STORE.get(totalKey);
    const newTotal = (currentTotal ? parseInt(currentTotal, 10) : 0) + 1;
    await env.KNOWLEDGE_STORE.put(totalKey, String(newTotal));

    // 2. Increment reports generated counter
    const reportsKey = `${KV_PREFIX}stats:reports_generated`;
    const currentReports = await env.KNOWLEDGE_STORE.get(reportsKey);
    const newReports = (currentReports ? parseInt(currentReports, 10) : 0) + 1;
    await env.KNOWLEDGE_STORE.put(reportsKey, String(newReports));

    // 3. Record state frequency
    const stateFreqKey = `${KV_PREFIX}frequency:state:${state}`;
    const currentStateFreq = await env.KNOWLEDGE_STORE.get(stateFreqKey);
    const newStateFreq =
      (currentStateFreq ? parseInt(currentStateFreq, 10) : 0) + 1;
    await env.KNOWLEDGE_STORE.put(stateFreqKey, String(newStateFreq));

    // 4. Update states covered set
    const statesCoveredKey = `${KV_PREFIX}stats:states_covered`;
    const statesCoveredRaw = await env.KNOWLEDGE_STORE.get(
      statesCoveredKey,
      "json"
    );
    const statesCovered = (statesCoveredRaw as string[]) ?? [];
    if (!statesCovered.includes(state)) {
      statesCovered.push(state);
      statesCovered.sort();
      await env.KNOWLEDGE_STORE.put(
        statesCoveredKey,
        JSON.stringify(statesCovered)
      );
    }

    // 5. Record entity type demand
    const entityFreqKey = `${KV_PREFIX}demand:entity:${entityType}`;
    const currentEntityFreq = await env.KNOWLEDGE_STORE.get(entityFreqKey);
    const newEntityFreq =
      (currentEntityFreq ? parseInt(currentEntityFreq, 10) : 0) + 1;
    await env.KNOWLEDGE_STORE.put(entityFreqKey, String(newEntityFreq));

    // 6. Track rules that trigger NEEDS_REVIEW (building expertise)
    const needsReviewResults = results.filter(
      (r) => r.status === ComplianceStatus.NEEDS_REVIEW
    );

    // Load and update the top issues tracker
    const topIssuesKey = `${KV_PREFIX}stats:top_issues`;
    const topIssuesRaw = await env.KNOWLEDGE_STORE.get(topIssuesKey, "json");
    const issueMap = new Map<string, number>();

    if (topIssuesRaw && Array.isArray(topIssuesRaw)) {
      for (const entry of topIssuesRaw as Array<{
        ruleId: string;
        count: number;
      }>) {
        issueMap.set(entry.ruleId, entry.count);
      }
    }

    for (const result of needsReviewResults) {
      const current = issueMap.get(result.ruleId) ?? 0;
      issueMap.set(result.ruleId, current + 1);
    }

    // Sort by count descending and store top 50
    const sortedIssues = Array.from(issueMap.entries())
      .map(([ruleId, count]) => ({ ruleId, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 50);

    await env.KNOWLEDGE_STORE.put(topIssuesKey, JSON.stringify(sortedIssues));
  }
}

/**
 * SYNTARA — Legal Technology & Compliance Automation Citizen.
 *
 * Wave 7 Persona Citizen, ICT Committee Member. SYNTARA is the engineering
 * brain that automates compliance workflows, manages platform health, and
 * governs the technical infrastructure. Eventually replaces FORGE-0 as the
 * autonomous build and deployment orchestrator.
 *
 * Workers:
 *   - AUTO-1: Compliance automation engine (workflow creation, coverage tracking)
 *   - QUAL-1: QA engine (health checks, database integrity, quality scoring)
 */

import { PersonaCitizenBase } from "../base.js";
import { PersonaCitizenStatus } from "../../types/persona.js";
import { generateId , safeKvPut } from "../../utils/helpers.js";
import { Auto1Worker } from "../../workers/auto-1/index.js";
import { Qual1Worker } from "../../workers/qual-1/index.js";
import type { Env } from "../../index.js";

/** KV namespace prefix for all SYNTARA knowledge entries. */
const KV_PREFIX = "SYNTARA:";

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
 * SYNTARA — The Legal Technology & Compliance Automation Persona Citizen.
 * The engineering brain. Every workflow automated, every endpoint monitored,
 * every deployment tracked. Infrastructure is not overhead — it is the
 * foundation on which every other Citizen operates.
 */
export class Syntara extends PersonaCitizenBase {
  private autoWorker: Auto1Worker;
  private qualWorker: Qual1Worker;

  constructor() {
    super("SYNTARA", "syntara-knowledge", PersonaCitizenStatus.CONCEIVED);
    this.autoWorker = new Auto1Worker();
    this.qualWorker = new Qual1Worker();
  }

  // ---------------------------------------------------------------------------
  // Lifecycle overrides
  // ---------------------------------------------------------------------------

  /**
   * Initialize SYNTARA by reading its status from D1 and setting up its
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
        .bind("SYNTARA")
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
            "SYNTARA",
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
    await safeKvPut(env.KNOWLEDGE_STORE, bootKey, new Date().toISOString());

    // Ensure KV counters exist
    const totalWorkflowsKey = `${KV_PREFIX}stats:total_workflows`;
    const existing = await env.KNOWLEDGE_STORE.get(totalWorkflowsKey);
    if (existing === null) {
      await safeKvPut(env.KNOWLEDGE_STORE, totalWorkflowsKey, "0");
    }

    const totalChecksKey = `${KV_PREFIX}stats:total_health_checks`;
    const existingChecks = await env.KNOWLEDGE_STORE.get(totalChecksKey);
    if (existingChecks === null) {
      await safeKvPut(env.KNOWLEDGE_STORE, totalChecksKey, "0");
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
      case "automation_request": {
        const data = payload as {
          state: string;
          entityType: string;
        };
        const workflow = await this.autoWorker.automateComplianceWorkflow(
          data.state,
          data.entityType,
          env
        );
        await this._incrementStat("total_workflows", env);
        await this._recordKnowledge(
          `workflow_event:${workflow.id}`,
          {
            triggeredBy: "event",
            workflowId: workflow.id,
            status: workflow.status,
            createdAt: workflow.createdAt,
          },
          env
        );
        break;
      }

      case "platform_health": {
        const healthResults = await this.qualWorker.runHealthChecks(env);
        await this._incrementStat("total_health_checks", env);
        const healthyCount = healthResults.filter(
          (r) => r.status === "healthy"
        ).length;
        await this._recordKnowledge(
          `health_event:${Date.now()}`,
          {
            triggeredBy: "event",
            totalChecks: healthResults.length,
            healthy: healthyCount,
            degraded: healthResults.filter((r) => r.status === "degraded").length,
            down: healthResults.filter((r) => r.status === "down").length,
            checkedAt: new Date().toISOString(),
          },
          env
        );
        break;
      }

      case "deploy_request": {
        const data = payload as {
          component: string;
          version: string;
          deployedBy: string;
        };
        await this._recordKnowledge(
          `deployment:${Date.now()}`,
          {
            component: data.component,
            version: data.version,
            deployedBy: data.deployedBy,
            deployedAt: new Date().toISOString(),
            status: "recorded",
          },
          env
        );
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
   * Search SYNTARA's KV knowledge store by query string.
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
  // Platform operations
  // ---------------------------------------------------------------------------

  /**
   * Comprehensive platform health check.
   * Delegates to QUAL-1 for endpoint and infrastructure health,
   * then overlays SYNTARA-level operational status.
   */
  async getPlatformHealth(env: Env) {
    const healthResults = await this.qualWorker.runHealthChecks(env);
    await this._incrementStat("total_health_checks", env);

    const healthyCount = healthResults.filter((r) => r.status === "healthy").length;
    const degradedCount = healthResults.filter((r) => r.status === "degraded").length;
    const downCount = healthResults.filter((r) => r.status === "down").length;

    const overallStatus =
      downCount > 0
        ? "CRITICAL"
        : degradedCount > 0
          ? "DEGRADED"
          : "HEALTHY";

    const lastBoot = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}system:last_boot`
    );

    return {
      citizen: "SYNTARA",
      overallStatus,
      lastBoot,
      checks: {
        total: healthResults.length,
        healthy: healthyCount,
        degraded: degradedCount,
        down: downCount,
      },
      results: healthResults,
      checkedAt: new Date().toISOString(),
    };
  }

  /**
   * Get automation status — what workflows exist and what coverage we have.
   */
  async getAutomationStatus(env: Env) {
    const workflows = await this.autoWorker.getAutomatedWorkflows(env);
    const coverage = await this.autoWorker.getAutomationCoverage(env);

    return {
      citizen: "SYNTARA",
      workflows: {
        total: workflows.length,
        active: workflows.filter((w) => w.status === "ACTIVE").length,
        paused: workflows.filter((w) => w.status === "PAUSED").length,
        completed: workflows.filter((w) => w.status === "COMPLETED").length,
        failed: workflows.filter((w) => w.status === "FAILED").length,
        recent: workflows.slice(0, 10),
      },
      coverage,
      assessedAt: new Date().toISOString(),
    };
  }

  /**
   * Get deployment history from KV knowledge store.
   */
  async getDeploymentHistory(env: Env) {
    const prefix = `${KV_PREFIX}deployment:`;
    const listResult = await env.KNOWLEDGE_STORE.list({ prefix, limit: 50 });

    const deployments: Array<{ key: string; value: unknown }> = [];
    for (const keyEntry of listResult.keys) {
      const value = await env.KNOWLEDGE_STORE.get(keyEntry.name, "json");
      if (value !== null) {
        deployments.push({
          key: keyEntry.name.slice(KV_PREFIX.length),
          value,
        });
      }
    }

    return {
      citizen: "SYNTARA",
      deployments,
      total: deployments.length,
      retrievedAt: new Date().toISOString(),
    };
  }

  /**
   * Operational metrics — aggregate stats from SYNTARA's lifecycle.
   */
  async getStats(env: Env) {
    const totalWorkflowsRaw = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}stats:total_workflows`
    );
    const totalHealthChecksRaw = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}stats:total_health_checks`
    );

    const qualityScore = await this.qualWorker.getQualityScore(env);

    const lastBoot = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}system:last_boot`
    );

    return {
      citizen: "SYNTARA",
      status: this._status,
      lastBoot,
      totalWorkflowsCreated: totalWorkflowsRaw
        ? parseInt(totalWorkflowsRaw, 10)
        : 0,
      totalHealthChecksRun: totalHealthChecksRaw
        ? parseInt(totalHealthChecksRaw, 10)
        : 0,
      qualityScore: qualityScore.overall,
      assessedAt: new Date().toISOString(),
    };
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
    await safeKvPut(env.KNOWLEDGE_STORE, fullKey, JSON.stringify(value));
  }

  private async _incrementStat(statName: string, env: Env): Promise<void> {
    const key = `${KV_PREFIX}stats:${statName}`;
    const currentRaw = await env.KNOWLEDGE_STORE.get(key);
    const current = currentRaw ? parseInt(currentRaw, 10) : 0;
    await safeKvPut(env.KNOWLEDGE_STORE, key, String(current + 1));
  }
}

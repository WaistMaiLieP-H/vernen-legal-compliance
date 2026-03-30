/**
 * METRIQA — Performance Analytics & Growth Validation Citizen.
 *
 * Wave 8 Persona Citizen, Investor Confidence Team. METRIQA pulls data
 * from ALL other Citizens to build a comprehensive performance dashboard.
 * Revenue from FISCARA, clients from ADVOCIS, rules from REGULIS, risks
 * from VIGILUS, audits from SENTINEL-0, security from PRIVAXIS — all
 * unified into a single source of truth.
 *
 * Workers:
 *   - DASH-1: Dashboard aggregation, growth metrics, unit economics
 */

import { PersonaCitizenBase } from "../base.js";
import { PersonaCitizenStatus } from "../../types/persona.js";
import { generateId , safeKvPut } from "../../utils/helpers.js";
import { Dash1Worker } from "../../workers/dash-1/index.js";
import type { Env } from "../../index.js";

/** KV namespace prefix for all METRIQA knowledge entries. */
const KV_PREFIX = "METRIQA:";

/** D1 table where persona citizen records live. */
const PERSONA_TABLE = "persona_citizens";

interface PersonaRow {
  id: string;
  name: string;
  status: string;
  deployed_at: string | null;
  conceived_at: string;
}

/**
 * METRIQA — The Performance Analytics & Growth Validation Persona Citizen.
 * Aggregates platform-wide data into actionable dashboards and growth metrics.
 */
export class Metriqa extends PersonaCitizenBase {
  private dash: Dash1Worker;

  constructor() {
    super("METRIQA", "metriqa-knowledge", PersonaCitizenStatus.CONCEIVED);
    this.dash = new Dash1Worker();
  }

  // ---------------------------------------------------------------------------
  // Lifecycle overrides
  // ---------------------------------------------------------------------------

  async initialize(env: Env): Promise<void> {
    try {
      const row = await env.DB.prepare(
        `SELECT id, name, status, deployed_at, conceived_at
         FROM ${PERSONA_TABLE}
         WHERE name = ?1
         LIMIT 1`
      )
        .bind("METRIQA")
        .first<PersonaRow>();

      if (row) {
        const dbStatus = row.status as PersonaCitizenStatus;
        if (Object.values(PersonaCitizenStatus).includes(dbStatus)) {
          this._status = dbStatus;
        }
      } else {
        await env.DB.prepare(
          `INSERT OR IGNORE INTO ${PERSONA_TABLE}
           (id, name, status, conceived_at)
           VALUES (?1, ?2, ?3, ?4)`
        )
          .bind(
            generateId("persona"),
            "METRIQA",
            PersonaCitizenStatus.SHELL_DEPLOYED,
            new Date().toISOString()
          )
          .run();

        this._status = PersonaCitizenStatus.SHELL_DEPLOYED;
      }
    } catch {
      this._status = PersonaCitizenStatus.SHELL_DEPLOYED;
    }

    const bootKey = `${KV_PREFIX}system:last_boot`;
    await safeKvPut(env.KNOWLEDGE_STORE, bootKey, new Date().toISOString());

    const snapshotKey = `${KV_PREFIX}stats:total_snapshots`;
    const existing = await env.KNOWLEDGE_STORE.get(snapshotKey);
    if (existing === null) {
      await safeKvPut(env.KNOWLEDGE_STORE, snapshotKey, "0");
    }
  }

  async receiveEvent(
    event: string,
    payload: unknown,
    env: Env
  ): Promise<void> {
    switch (event) {
      case "dashboard_requested": {
        const dashboard = await this.dash.generateDashboard(env);
        await this._recordKnowledge(
          `dashboard:${Date.now()}`,
          { generatedAt: dashboard.generatedAt, citizenCount: dashboard.citizens.deployedCitizens },
          env
        );
        await this._incrementStat("total_snapshots", env);
        break;
      }

      case "metrics_alert": {
        const data = payload as { metric: string; threshold: string };
        await this._recordKnowledge(
          `alert:${Date.now()}`,
          { ...data, receivedAt: new Date().toISOString() },
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
  // Domain methods
  // ---------------------------------------------------------------------------

  /** Generate a comprehensive platform dashboard. */
  async getDashboard(env: Env) {
    return this.dash.generateDashboard(env);
  }

  /** Get month-over-month growth metrics. */
  async getGrowthMetrics(env: Env) {
    return this.dash.getGrowthMetrics(env);
  }

  /** Get unit economics for investor presentations. */
  async getUnitEconomics(env: Env) {
    return this.dash.getUnitEconomics(env);
  }

  /** Get operational status. */
  async getStatus(env: Env) {
    const lastBoot = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}system:last_boot`
    );

    const totalSnapshotsRaw = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}stats:total_snapshots`
    );
    const totalSnapshots = totalSnapshotsRaw
      ? parseInt(totalSnapshotsRaw, 10)
      : 0;

    return {
      citizen: "METRIQA",
      status: this._status,
      lastBoot,
      totalSnapshots,
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

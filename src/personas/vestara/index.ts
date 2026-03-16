/**
 * VESTARA — Stakeholder Communication & Capital Strategy Citizen.
 *
 * Wave 8 Persona Citizen, Investor Confidence Team. VESTARA translates
 * platform performance into investor-ready narratives, tracks capital
 * strategy, and assesses fundraising readiness. Every metric is real.
 * Every narrative is grounded in actual platform data.
 *
 * Workers:
 *   - PITCH-1: Investor narrative generation, KPI tracking, capital strategy
 */

import { PersonaCitizenBase } from "../base.js";
import { PersonaCitizenStatus } from "../../types/persona.js";
import { generateId } from "../../utils/helpers.js";
import { Pitch1Worker } from "../../workers/pitch-1/index.js";
import type { Env } from "../../index.js";

/** KV namespace prefix for all VESTARA knowledge entries. */
const KV_PREFIX = "VESTARA:";

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
 * VESTARA — The Stakeholder Communication & Capital Strategy Persona Citizen.
 * Translates platform data into investor-ready narratives and capital strategy.
 */
export class Vestara extends PersonaCitizenBase {
  private pitch: Pitch1Worker;

  constructor() {
    super("VESTARA", "vestara-knowledge", PersonaCitizenStatus.CONCEIVED);
    this.pitch = new Pitch1Worker();
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
        .bind("VESTARA")
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
            "VESTARA",
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
    await env.KNOWLEDGE_STORE.put(bootKey, new Date().toISOString());
  }

  async receiveEvent(
    event: string,
    payload: unknown,
    env: Env
  ): Promise<void> {
    switch (event) {
      case "funding_milestone": {
        const data = payload as { milestone: string; amount: number };
        await this._recordKnowledge(
          `milestone:${Date.now()}`,
          { ...data, recordedAt: new Date().toISOString() },
          env
        );
        break;
      }

      case "investor_meeting": {
        const data = payload as { investor: string; outcome: string };
        const narrative = await this.pitch.generateInvestorNarrative(env);
        await this._recordKnowledge(
          `meeting:${Date.now()}`,
          { ...data, narrativeGenerated: true, stage: narrative.stage },
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

  /** Get investor readiness assessment. */
  async getInvestorReadiness(env: Env) {
    return this.pitch.getInvestorReadiness(env);
  }

  /** Generate pitch metrics from real platform data. */
  async generatePitchMetrics(env: Env) {
    return this.pitch.getKeyMetrics(env);
  }

  /** Get capital strategy recommendation. */
  async getCapitalStrategy(env: Env) {
    return this.pitch.getCapitalStrategy(env);
  }

  /** Generate a full investor narrative. */
  async generateNarrative(env: Env) {
    return this.pitch.generateInvestorNarrative(env);
  }

  /** Get operational status. */
  async getStatus(env: Env) {
    const lastBoot = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}system:last_boot`
    );

    const readiness = await this.pitch.getInvestorReadiness(env);

    return {
      citizen: "VESTARA",
      status: this._status,
      lastBoot,
      investorReadinessScore: readiness.overallScore,
      blockers: readiness.blockers.length,
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
    await env.KNOWLEDGE_STORE.put(fullKey, JSON.stringify(value));
  }
}

/**
 * NEXARIS — Strategic Partnerships & Reputation Citizen.
 *
 * Wave 8 Persona Citizen, Investor Confidence Team. NEXARIS evaluates
 * potential partners, tracks the partnership pipeline, and monitors
 * organizational reputation. Every partnership is scored. Every
 * reputation dimension is measured.
 *
 * Workers:
 *   - ALLY-1: Partner evaluation, partnership tracking, ROI analysis
 */

import { PersonaCitizenBase } from "../base.js";
import { PersonaCitizenStatus } from "../../types/persona.js";
import { generateId } from "../../utils/helpers.js";
import { Ally1Worker } from "../../workers/ally-1/index.js";
import type { Env } from "../../index.js";

/** KV namespace prefix for all NEXARIS knowledge entries. */
const KV_PREFIX = "NEXARIS:";

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
 * NEXARIS — The Strategic Partnerships & Reputation Persona Citizen.
 * Evaluates partners, tracks pipeline, and safeguards organizational reputation.
 */
export class Nexaris extends PersonaCitizenBase {
  private ally: Ally1Worker;

  constructor() {
    super("NEXARIS", "nexaris-knowledge", PersonaCitizenStatus.CONCEIVED);
    this.ally = new Ally1Worker();
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
        .bind("NEXARIS")
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
            "NEXARIS",
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

    const evaluationsKey = `${KV_PREFIX}stats:total_evaluations`;
    const existing = await env.KNOWLEDGE_STORE.get(evaluationsKey);
    if (existing === null) {
      await env.KNOWLEDGE_STORE.put(evaluationsKey, "0");
    }
  }

  async receiveEvent(
    event: string,
    payload: unknown,
    env: Env
  ): Promise<void> {
    switch (event) {
      case "partner_inquiry": {
        const data = payload as {
          partnerName: string;
          industry: string;
          description: string;
        };
        const evaluation = await this.ally.evaluatePartner(
          data.partnerName,
          data.industry,
          data.description,
          env
        );
        await this._recordKnowledge(
          `inquiry:${Date.now()}`,
          {
            partnerName: data.partnerName,
            score: evaluation.overallScore,
            recommendation: evaluation.recommendation,
            evaluatedAt: evaluation.evaluatedAt,
          },
          env
        );
        await this._incrementStat("total_evaluations", env);
        break;
      }

      case "reputation_check": {
        const score = await this.ally.getReputationScore(env);
        await this._recordKnowledge(
          `reputation:${Date.now()}`,
          { overallScore: score.overallScore, checkedAt: new Date().toISOString() },
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

  /** Get the full partnership pipeline. */
  async getPartnershipPipeline(env: Env) {
    const partnerships = await this.ally.getAllPartnerships(env);
    const roi = await this.ally.getPartnershipROI(env);

    return {
      citizen: "NEXARIS",
      partnerships,
      totalPartnerships: roi.totalPartnerships,
      activePartnerships: roi.activePartnerships,
      avgScore: roi.avgPartnerScore,
      topPartner: roi.topPartner,
      industryBreakdown: roi.industryBreakdown,
      assessedAt: new Date().toISOString(),
    };
  }

  /** Get the platform reputation score. */
  async getReputationScore(env: Env) {
    return this.ally.getReputationScore(env);
  }

  /** Evaluate a specific potential partner. */
  async assessPartner(
    partnerName: string,
    industry: string,
    description: string,
    env: Env
  ) {
    await this._incrementStat("total_evaluations", env);
    return this.ally.evaluatePartner(partnerName, industry, description, env);
  }

  /** Get operational status. */
  async getStatus(env: Env) {
    const lastBoot = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}system:last_boot`
    );

    const totalEvaluationsRaw = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}stats:total_evaluations`
    );
    const totalEvaluations = totalEvaluationsRaw
      ? parseInt(totalEvaluationsRaw, 10)
      : 0;

    const roi = await this.ally.getPartnershipROI(env);

    return {
      citizen: "NEXARIS",
      status: this._status,
      lastBoot,
      totalEvaluations,
      activePartnerships: roi.activePartnerships,
      totalPartnerships: roi.totalPartnerships,
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

  private async _incrementStat(statName: string, env: Env): Promise<void> {
    const key = `${KV_PREFIX}stats:${statName}`;
    const currentRaw = await env.KNOWLEDGE_STORE.get(key);
    const current = currentRaw ? parseInt(currentRaw, 10) : 0;
    await env.KNOWLEDGE_STORE.put(key, String(current + 1));
  }
}

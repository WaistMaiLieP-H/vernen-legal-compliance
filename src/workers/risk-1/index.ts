/**
 * RISK-1 — Risk Register Worker for VIGILUS.
 *
 * Maintains the organizational risk register in D1. Every risk is scored
 * by probability (1-5) × impact (1-5) for a maximum score of 25. Risks
 * are organized into a heat map by quadrant for visual triage.
 */

import type { Env } from "../../index.js";
import { generateId } from "../../utils/helpers.js";
import { RiskStatus } from "./types.js";
import type {
  Risk,
  RiskRow,
  RiskInput,
  RiskHeatMap,
  HeatMapQuadrant,
} from "./types.js";

const KV_PREFIX = "VIGILUS:risk:";

/**
 * Convert a D1 row into a Risk domain object.
 */
function rowToRisk(row: RiskRow): Risk {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category as Risk["category"],
    probability: row.probability,
    impact: row.impact,
    score: row.score,
    status: row.status as RiskStatus,
    owner: row.owner,
    mitigationPlan: row.mitigation_plan,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * Clamp a value between 1 and 5.
 */
function clamp(value: number): number {
  return Math.max(1, Math.min(5, Math.round(value)));
}

export class Risk1Worker {
  /**
   * Add a new risk to the register.
   */
  async createRisk(risk: RiskInput, env: Env): Promise<Risk> {
    const id = generateId("risk");
    const now = new Date().toISOString();
    const probability = clamp(risk.probability);
    const impact = clamp(risk.impact);
    const score = probability * impact;

    try {
      await env.DB.prepare(
        `INSERT INTO risk_register
         (id, title, description, category, probability, impact, score, status, owner, mitigation_plan, created_at, updated_at)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12)`
      )
        .bind(
          id,
          risk.title,
          risk.description,
          risk.category,
          probability,
          impact,
          score,
          RiskStatus.ACTIVE,
          risk.owner ?? null,
          risk.mitigationPlan ?? null,
          now,
          now
        )
        .run();
    } catch {
      // Table may not exist — store in KV as fallback
      await env.KNOWLEDGE_STORE.put(
        `${KV_PREFIX}${id}`,
        JSON.stringify({
          id,
          title: risk.title,
          description: risk.description,
          category: risk.category,
          probability,
          impact,
          score,
          status: RiskStatus.ACTIVE,
          owner: risk.owner ?? null,
          mitigationPlan: risk.mitigationPlan ?? null,
          createdAt: now,
          updatedAt: now,
        })
      );
    }

    // Update counter in KV
    const counterKey = `${KV_PREFIX}stats:total_risks`;
    const currentRaw = await env.KNOWLEDGE_STORE.get(counterKey);
    const current = currentRaw ? parseInt(currentRaw, 10) : 0;
    await env.KNOWLEDGE_STORE.put(counterKey, String(current + 1));

    return {
      id,
      title: risk.title,
      description: risk.description,
      category: risk.category,
      probability,
      impact,
      score,
      status: RiskStatus.ACTIVE,
      owner: risk.owner ?? null,
      mitigationPlan: risk.mitigationPlan ?? null,
      createdAt: now,
      updatedAt: now,
    };
  }

  /**
   * Re-score an existing risk by ID.
   */
  async updateRiskScore(
    riskId: string,
    probability: number,
    impact: number,
    env: Env
  ): Promise<Risk | null> {
    const p = clamp(probability);
    const i = clamp(impact);
    const score = p * i;
    const now = new Date().toISOString();

    try {
      await env.DB.prepare(
        `UPDATE risk_register
         SET probability = ?1, impact = ?2, score = ?3, updated_at = ?4
         WHERE id = ?5`
      )
        .bind(p, i, score, now, riskId)
        .run();

      const row = await env.DB.prepare(
        `SELECT * FROM risk_register WHERE id = ?1 LIMIT 1`
      )
        .bind(riskId)
        .first<RiskRow>();

      return row ? rowToRisk(row) : null;
    } catch {
      return null;
    }
  }

  /**
   * Build a heat map of all active risks organized by probability × impact quadrants.
   *
   * Quadrants:
   *   - LOW_PROBABILITY_LOW_IMPACT: probability <= 2.5, impact <= 2.5
   *   - LOW_PROBABILITY_HIGH_IMPACT: probability <= 2.5, impact > 2.5
   *   - HIGH_PROBABILITY_LOW_IMPACT: probability > 2.5, impact <= 2.5
   *   - HIGH_PROBABILITY_HIGH_IMPACT: probability > 2.5, impact > 2.5
   */
  async getRiskHeatMap(env: Env): Promise<RiskHeatMap> {
    const quadrants: Record<HeatMapQuadrant, Risk[]> = {
      LOW_PROBABILITY_LOW_IMPACT: [],
      LOW_PROBABILITY_HIGH_IMPACT: [],
      HIGH_PROBABILITY_LOW_IMPACT: [],
      HIGH_PROBABILITY_HIGH_IMPACT: [],
    };

    let totalRisks = 0;

    try {
      const result = await env.DB.prepare(
        `SELECT * FROM risk_register WHERE status = 'ACTIVE' ORDER BY score DESC`
      ).all<RiskRow>();

      if (result.success && result.results) {
        for (const row of result.results) {
          const risk = rowToRisk(row);
          totalRisks++;

          const highProb = risk.probability > 2.5;
          const highImpact = risk.impact > 2.5;

          if (highProb && highImpact) {
            quadrants.HIGH_PROBABILITY_HIGH_IMPACT.push(risk);
          } else if (highProb) {
            quadrants.HIGH_PROBABILITY_LOW_IMPACT.push(risk);
          } else if (highImpact) {
            quadrants.LOW_PROBABILITY_HIGH_IMPACT.push(risk);
          } else {
            quadrants.LOW_PROBABILITY_LOW_IMPACT.push(risk);
          }
        }
      }
    } catch {
      // Table may not exist
    }

    return {
      quadrants,
      totalRisks,
      generatedAt: new Date().toISOString(),
    };
  }

  /**
   * Get the highest-scored active risks.
   */
  async getTopRisks(limit: number, env: Env): Promise<Risk[]> {
    const safeLimit = Math.min(Math.max(limit, 1), 100);

    try {
      const result = await env.DB.prepare(
        `SELECT * FROM risk_register
         WHERE status = 'ACTIVE'
         ORDER BY score DESC
         LIMIT ?1`
      )
        .bind(safeLimit)
        .all<RiskRow>();

      if (result.success && result.results) {
        return result.results.map(rowToRisk);
      }
    } catch {
      // Table may not exist
    }

    return [];
  }

  /**
   * Get all risks from the register.
   */
  async getAllRisks(env: Env): Promise<Risk[]> {
    try {
      const result = await env.DB.prepare(
        `SELECT * FROM risk_register ORDER BY score DESC`
      ).all<RiskRow>();

      if (result.success && result.results) {
        return result.results.map(rowToRisk);
      }
    } catch {
      // Table may not exist
    }

    return [];
  }
}

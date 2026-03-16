/**
 * CLARIDEX — Financial Disclosure & Reporting Standards Citizen.
 *
 * Wave 8 Persona Citizen, Investor Confidence Team. CLARIDEX generates
 * GAAP-aligned financial statements from FISCARA data, tracks disclosure
 * compliance, and assesses audit readiness. Every statement is traceable
 * to the underlying transaction ledger.
 *
 * Workers:
 *   - GAAP-1: Financial statement generation (income, balance sheet, cash flow)
 */

import { PersonaCitizenBase } from "../base.js";
import { PersonaCitizenStatus } from "../../types/persona.js";
import { generateId } from "../../utils/helpers.js";
import { Gaap1Worker } from "../../workers/gaap-1/index.js";
import type { Env } from "../../index.js";

/** KV namespace prefix for all CLARIDEX knowledge entries. */
const KV_PREFIX = "CLARIDEX:";

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
 * CLARIDEX — The Financial Disclosure & Reporting Standards Persona Citizen.
 * Generates auditable financial statements and maintains disclosure compliance.
 */
export class Claridex extends PersonaCitizenBase {
  private gaap: Gaap1Worker;

  constructor() {
    super("CLARIDEX", "claridex-knowledge", PersonaCitizenStatus.CONCEIVED);
    this.gaap = new Gaap1Worker();
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
        .bind("CLARIDEX")
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
            "CLARIDEX",
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

    const statementsKey = `${KV_PREFIX}stats:total_statements`;
    const existing = await env.KNOWLEDGE_STORE.get(statementsKey);
    if (existing === null) {
      await env.KNOWLEDGE_STORE.put(statementsKey, "0");
    }
  }

  async receiveEvent(
    event: string,
    payload: unknown,
    env: Env
  ): Promise<void> {
    switch (event) {
      case "financial_close": {
        const data = payload as { period: string };
        // Generate all three statements for the period
        await Promise.all([
          this.gaap.generateIncomeStatement(data.period, env),
          this.gaap.generateBalanceSheet(env),
          this.gaap.generateCashFlowStatement(data.period, env),
        ]);
        await this._recordKnowledge(
          `close:${Date.now()}`,
          { period: data.period, closedAt: new Date().toISOString() },
          env
        );
        await this._incrementStat("total_statements", env);
        break;
      }

      case "audit_request": {
        const readiness = await this.gaap.getAuditReadiness(env);
        await this._recordKnowledge(
          `audit_request:${Date.now()}`,
          { readinessScore: readiness.score, respondedAt: new Date().toISOString() },
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

  /** Generate a financial statement for the given period. */
  async generateFinancialStatement(period: string, env: Env) {
    const [income, balance, cashFlow] = await Promise.all([
      this.gaap.generateIncomeStatement(period, env),
      this.gaap.generateBalanceSheet(env),
      this.gaap.generateCashFlowStatement(period, env),
    ]);

    await this._incrementStat("total_statements", env);

    return {
      citizen: "CLARIDEX",
      period,
      incomeStatement: income,
      balanceSheet: balance,
      cashFlowStatement: cashFlow,
      generatedAt: new Date().toISOString(),
    };
  }

  /** Get current disclosure status. */
  async getDisclosureStatus(env: Env) {
    return this.gaap.getDisclosureStatus(env);
  }

  /** Assess audit readiness. */
  async getAuditReadiness(env: Env) {
    return this.gaap.getAuditReadiness(env);
  }

  /** Get operational status. */
  async getStatus(env: Env) {
    const lastBoot = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}system:last_boot`
    );

    const totalStatementsRaw = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}stats:total_statements`
    );
    const totalStatements = totalStatementsRaw
      ? parseInt(totalStatementsRaw, 10)
      : 0;

    const disclosure = await this.gaap.getDisclosureStatus(env);

    return {
      citizen: "CLARIDEX",
      status: this._status,
      lastBoot,
      totalStatements,
      disclosureCompliant: disclosure.compliant,
      disclosureGaps: disclosure.disclosureGaps.length,
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

/**
 * VIGILUS — Threat Assessment & Operational Risk Citizen.
 *
 * Wave 6 Persona Citizen, Oversight Committee Member. VIGILUS monitors
 * threats, assesses risks, and provides early warning. Every risk is
 * tracked. Every threat is assessed. Every vulnerability is cataloged.
 *
 * Workers:
 *   - RISK-1: Risk register (probability × impact scoring, heat map)
 *   - THRT-1: Threat intelligence (cyber, regulatory, operational)
 */

import { PersonaCitizenBase } from "../base.js";
import { PersonaCitizenStatus } from "../../types/persona.js";
import { generateId , safeKvPut } from "../../utils/helpers.js";
import { Risk1Worker } from "../../workers/risk-1/index.js";
import { Thrt1Worker } from "../../workers/thrt-1/index.js";
import type { RiskInput } from "../../workers/risk-1/types.js";
import type { Env } from "../../index.js";

/** KV namespace prefix for all VIGILUS knowledge entries. */
const KV_PREFIX = "VIGILUS:";

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
 * VIGILUS — The Threat Assessment & Operational Risk Persona Citizen.
 * Monitors threats, scores risks, and provides early warning to the org.
 */
export class Vigilus extends PersonaCitizenBase {
  private risk: Risk1Worker;
  private threat: Thrt1Worker;

  constructor() {
    super("VIGILUS", "vigilus-knowledge", PersonaCitizenStatus.CONCEIVED);
    this.risk = new Risk1Worker();
    this.threat = new Thrt1Worker();
  }

  // ---------------------------------------------------------------------------
  // Lifecycle overrides
  // ---------------------------------------------------------------------------

  /**
   * Initialize VIGILUS by reading its status from D1 and setting up its
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
        .bind("VIGILUS")
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
            "VIGILUS",
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
    const totalRisksKey = `${KV_PREFIX}stats:total_assessments`;
    const existing = await env.KNOWLEDGE_STORE.get(totalRisksKey);
    if (existing === null) {
      await safeKvPut(env.KNOWLEDGE_STORE, totalRisksKey, "0");
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
      case "threat_detected": {
        const data = payload as {
          description: string;
          source: string;
          severity?: string;
        };
        // Scan threat landscape immediately
        const landscape = await this.threat.scanThreatLandscape(env);
        await this._recordKnowledge(
          `threat_event:${Date.now()}`,
          {
            ...data,
            landscapeOverallSeverity: landscape.overallSeverity,
            activeCount: landscape.activeCount,
            respondedAt: new Date().toISOString(),
          },
          env
        );
        break;
      }

      case "risk_assessment_due": {
        // Run a full risk + threat assessment
        const [risks, landscape] = await Promise.all([
          this.risk.getTopRisks(10, env),
          this.threat.scanThreatLandscape(env),
        ]);
        await this._recordKnowledge(
          `scheduled_assessment:${Date.now()}`,
          {
            topRiskCount: risks.length,
            highestRiskScore: risks[0]?.score ?? 0,
            threatSeverity: landscape.overallSeverity,
            assessedAt: new Date().toISOString(),
          },
          env
        );
        await this._incrementStat("total_assessments", env);
        break;
      }

      case "vendor_review": {
        const data = payload as { vendorName: string };
        const assessment = await this.assessVendorRisk(data.vendorName, env);
        await this._recordKnowledge(
          `vendor_review:${data.vendorName}:${Date.now()}`,
          assessment,
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
   * Search VIGILUS's KV knowledge store by query string.
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
  // Threat operations
  // ---------------------------------------------------------------------------

  /**
   * Assess the current threat landscape.
   * Delegates to THRT-1 for the assessment, then records knowledge.
   */
  async assessThreatLandscape(env: Env) {
    const landscape = await this.threat.scanThreatLandscape(env);

    await this._incrementStat("total_assessments", env);

    await this._recordKnowledge(
      `landscape:latest`,
      {
        overallSeverity: landscape.overallSeverity,
        activeCount: landscape.activeCount,
        assessedAt: landscape.assessedAt,
      },
      env
    );

    return landscape;
  }

  /**
   * Get the full risk register, combining all risks from D1.
   */
  async getRiskRegister(env: Env) {
    const risks = await this.risk.getAllRisks(env);
    const topRisks = risks.filter((r) => r.status === "ACTIVE").slice(0, 5);

    return {
      citizen: "VIGILUS",
      risks,
      totalRisks: risks.length,
      activeRisks: risks.filter((r) => r.status === "ACTIVE").length,
      mitigatedRisks: risks.filter((r) => r.status === "MITIGATED").length,
      topRisks,
      highestScore: topRisks[0]?.score ?? 0,
      assessedAt: new Date().toISOString(),
    };
  }

  /**
   * Register a new risk via RISK-1.
   */
  async addRisk(riskInput: RiskInput, env: Env) {
    const risk = await this.risk.createRisk(riskInput, env);

    await this._recordKnowledge(
      `risk:${risk.id}`,
      {
        title: risk.title,
        category: risk.category,
        score: risk.score,
        createdAt: risk.createdAt,
      },
      env
    );

    return risk;
  }

  /**
   * Evaluate a third-party vendor's risk profile.
   * Combines threat intelligence and risk scoring.
   */
  async assessVendorRisk(vendorName: string, env: Env) {
    const now = new Date().toISOString();

    // Check existing vendor risks
    let existingVendorRisks = 0;
    try {
      const result = await env.DB.prepare(
        `SELECT COUNT(*) as cnt FROM risk_register
         WHERE category = 'VENDOR' AND title LIKE ?1`
      )
        .bind(`%${vendorName}%`)
        .first<{ cnt: number }>();
      existingVendorRisks = result?.cnt ?? 0;
    } catch {
      // Table may not exist
    }

    // Generate vendor risk assessment
    const vendorAssessment = {
      vendorName,
      assessedAt: now,
      existingRisks: existingVendorRisks,
      riskFactors: [
        {
          factor: "Data Access",
          description: `Does ${vendorName} have access to client PII or sensitive compliance data?`,
          severity: "MEDIUM" as const,
        },
        {
          factor: "Service Dependency",
          description: `How critical is ${vendorName} to platform operations?`,
          severity: "HIGH" as const,
        },
        {
          factor: "Compliance Posture",
          description: `Does ${vendorName} maintain SOC 2, ISO 27001, or equivalent certifications?`,
          severity: "MEDIUM" as const,
        },
        {
          factor: "Incident History",
          description: `Has ${vendorName} experienced data breaches or service outages?`,
          severity: "LOW" as const,
        },
      ],
      recommendations: [
        `Request SOC 2 Type II report from ${vendorName}`,
        `Review ${vendorName}'s data processing agreement`,
        `Verify ${vendorName}'s incident response SLA`,
        `Add ${vendorName} to quarterly vendor review cycle`,
      ],
    };

    // Record in knowledge store
    await this._recordKnowledge(
      `vendor:${vendorName}:latest`,
      vendorAssessment,
      env
    );

    return vendorAssessment;
  }

  // ---------------------------------------------------------------------------
  // Status
  // ---------------------------------------------------------------------------

  /**
   * Get the current VIGILUS operational status.
   */
  async getStatus(env: Env) {
    const [topRisks, activeThreats] = await Promise.all([
      this.risk.getTopRisks(5, env),
      this.threat.getActiveThreatAlerts(env),
    ]);

    const lastBoot = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}system:last_boot`
    );

    const totalAssessmentsRaw = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}stats:total_assessments`
    );
    const totalAssessments = totalAssessmentsRaw
      ? parseInt(totalAssessmentsRaw, 10)
      : 0;

    return {
      citizen: "VIGILUS",
      status: this._status,
      lastBoot,
      totalAssessments,
      risks: {
        topRiskCount: topRisks.length,
        highestScore: topRisks[0]?.score ?? 0,
        highestRiskTitle: topRisks[0]?.title ?? "None",
      },
      threats: {
        activeCount: activeThreats.length,
        highestSeverity: activeThreats[0]?.severity ?? "NONE",
      },
      assessedAt: new Date().toISOString(),
    };
  }

  // ---------------------------------------------------------------------------
  // Delegate methods to workers
  // ---------------------------------------------------------------------------

  /** Get the risk heat map via RISK-1. */
  async getRiskHeatMap(env: Env) {
    return this.risk.getRiskHeatMap(env);
  }

  /** Get active threat alerts via THRT-1. */
  async getActiveThreatAlerts(env: Env) {
    return this.threat.getActiveThreatAlerts(env);
  }

  /** Get cyber threat assessment via THRT-1. */
  async getCyberThreats(env: Env) {
    return this.threat.assessCyberThreats(env);
  }

  /** Get regulatory threat assessment via THRT-1. */
  async getRegulatoryThreats(env: Env) {
    return this.threat.assessRegulatoryThreats(env);
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

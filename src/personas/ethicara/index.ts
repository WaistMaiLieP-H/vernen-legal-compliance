/**
 * ETHICARA — Ethical Governance & Professional Standards Citizen.
 *
 * Wave 6 Persona Citizen, Oversight Committee Member. ETHICARA ensures all
 * operations meet ethical standards, manages the code of ethics, and governs
 * AI ethics for the Citizen ecosystem. Ethics is not a department — it is
 * the foundation on which every other Citizen stands.
 *
 * Workers:
 *   - CODE-1: Ethics code engine (code of ethics, decision review, history)
 *   - FAIR-1: Fairness engine (recommendation & pricing fairness audits)
 */

import { PersonaCitizenBase } from "../base.js";
import { PersonaCitizenStatus } from "../../types/persona.js";
import { generateId , safeKvPut } from "../../utils/helpers.js";
import { Code1Worker } from "../../workers/code-1/index.js";
import { Fair1Worker } from "../../workers/fair-1/index.js";
import { EthicsReportCategory, EthicsReportStatus } from "../../workers/code-1/types.js";
import type { EthicsReport, EthicsReportRow } from "../../workers/code-1/types.js";
import type { Env } from "../../index.js";

/** KV namespace prefix for all ETHICARA knowledge entries. */
const KV_PREFIX = "ETHICARA:";

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
 * ETHICARA — The Ethical Governance & Professional Standards Persona Citizen.
 * The moral compass of the Vernen ecosystem. Every decision, every
 * recommendation, every action is measured against the code of ethics.
 */
export class Ethicara extends PersonaCitizenBase {
  private codeWorker: Code1Worker;
  private fairWorker: Fair1Worker;

  constructor() {
    super("ETHICARA", "ethicara-knowledge", PersonaCitizenStatus.CONCEIVED);
    this.codeWorker = new Code1Worker();
    this.fairWorker = new Fair1Worker();
  }

  // ---------------------------------------------------------------------------
  // Lifecycle overrides
  // ---------------------------------------------------------------------------

  /**
   * Initialize ETHICARA by reading its status from D1 and setting up its
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
        .bind("ETHICARA")
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
            "ETHICARA",
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
    const totalReviewsKey = `${KV_PREFIX}stats:total_reviews`;
    const existing = await env.KNOWLEDGE_STORE.get(totalReviewsKey);
    if (existing === null) {
      await safeKvPut(env.KNOWLEDGE_STORE, totalReviewsKey, "0");
    }

    const totalReportsKey = `${KV_PREFIX}stats:total_reports`;
    const existingReports = await env.KNOWLEDGE_STORE.get(totalReportsKey);
    if (existingReports === null) {
      await safeKvPut(env.KNOWLEDGE_STORE, totalReportsKey, "0");
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
      case "ethics_review_requested": {
        const data = payload as {
          decision: string;
          context: string;
          stakeholders: string;
        };
        const review = await this.conductEthicsReview(
          { decision: data.decision, context: data.context, stakeholders: data.stakeholders },
          env
        );
        await this._recordKnowledge(
          `review_event:${review.id}`,
          {
            triggeredBy: "event",
            outcome: review.outcome,
            reviewedAt: review.reviewedAt,
          },
          env
        );
        break;
      }

      case "bias_detected": {
        const data = payload as {
          source: string;
          description: string;
        };
        // File an automatic ethics report
        await this.reportEthicsViolation(
          {
            description: `Bias detected by ${data.source}: ${data.description}`,
            category: EthicsReportCategory.BIAS,
          },
          env
        );
        // Trigger fairness audit
        const fairnessReport = await this.fairWorker.getFairnessReport(env);
        await this._recordKnowledge(
          `bias_response:${Date.now()}`,
          {
            triggeredBy: data.source,
            fairnessStatus: fairnessReport.overallStatus,
            assessedAt: fairnessReport.assessedAt,
          },
          env
        );
        break;
      }

      case "policy_conflict": {
        const data = payload as {
          policies: string[];
          description: string;
        };
        // Review the conflict as an ethics decision
        await this.conductEthicsReview(
          {
            decision: `Policy conflict resolution: ${data.description}`,
            context: `Conflicting policies: ${data.policies.join(", ")}`,
            stakeholders: "All affected Citizens and clients",
          },
          env
        );
        await this._recordKnowledge(
          `policy_conflict:${Date.now()}`,
          { ...data, respondedAt: new Date().toISOString() },
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
   * Search ETHICARA's KV knowledge store by query string.
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
  // Ethics operations
  // ---------------------------------------------------------------------------

  /**
   * Review a business decision against the code of ethics.
   * Delegates to CODE-1 for principle evaluation.
   */
  async conductEthicsReview(
    input: { decision: string; context: string; stakeholders: string },
    env: Env
  ) {
    const review = await this.codeWorker.reviewDecision(
      input.decision,
      input.context,
      input.stakeholders,
      env
    );

    // Increment review counter
    await this._incrementStat("total_reviews", env);

    // Record latest review result
    await this._recordKnowledge(
      "review:latest",
      {
        reviewId: review.id,
        outcome: review.outcome,
        reviewedAt: review.reviewedAt,
      },
      env
    );

    return review;
  }

  /**
   * Return the current code of ethics.
   * Delegates to CODE-1.
   */
  getEthicsCode(_env: Env) {
    return this.codeWorker.getCodeOfEthics();
  }

  /**
   * Submit an anonymous ethics violation report.
   * Reports are received without attribution and tracked through resolution.
   */
  async reportEthicsViolation(
    report: { description: string; category: string },
    env: Env
  ): Promise<EthicsReport> {
    const id = generateId("ethrpt");
    const submittedAt = new Date().toISOString();

    // Validate category
    const category = Object.values(EthicsReportCategory).includes(
      report.category as EthicsReportCategory
    )
      ? (report.category as EthicsReportCategory)
      : EthicsReportCategory.OTHER;

    const ethicsReport: EthicsReport = {
      id,
      description: report.description,
      category,
      status: EthicsReportStatus.RECEIVED,
      submittedAt,
      resolvedAt: null,
    };

    // Persist to D1
    try {
      await env.DB.prepare(
        `INSERT INTO ethics_reports (id, description, category, status, submitted_at, resolved_at)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6)`
      )
        .bind(
          ethicsReport.id,
          ethicsReport.description,
          ethicsReport.category,
          ethicsReport.status,
          ethicsReport.submittedAt,
          ethicsReport.resolvedAt
        )
        .run();
    } catch {
      // Table may not exist — store in KV as fallback
      await safeKvPut(env.KNOWLEDGE_STORE, 
        `${KV_PREFIX}report:${ethicsReport.id}`,
        JSON.stringify(ethicsReport)
      );
    }

    // Increment report counter
    await this._incrementStat("total_reports", env);

    return ethicsReport;
  }

  /**
   * Get the overall ethics posture of the platform.
   * Combines ethics review stats, violation reports, and fairness status.
   */
  async getEthicsStatus(env: Env) {
    const code = this.codeWorker.getCodeOfEthics();

    // Get review stats
    let totalReviews = 0;
    let approvedCount = 0;
    let flaggedCount = 0;
    let rejectedCount = 0;

    try {
      const reviewStats = await env.DB.prepare(
        `SELECT
           COUNT(*) as total,
           SUM(CASE WHEN outcome = 'APPROVED' THEN 1 ELSE 0 END) as approved,
           SUM(CASE WHEN outcome = 'FLAGGED' THEN 1 ELSE 0 END) as flagged,
           SUM(CASE WHEN outcome = 'REJECTED' THEN 1 ELSE 0 END) as rejected
         FROM ethics_reviews`
      ).first<{
        total: number;
        approved: number;
        flagged: number;
        rejected: number;
      }>();

      totalReviews = reviewStats?.total ?? 0;
      approvedCount = reviewStats?.approved ?? 0;
      flaggedCount = reviewStats?.flagged ?? 0;
      rejectedCount = reviewStats?.rejected ?? 0;
    } catch {
      // Table may not exist
    }

    // Get open ethics reports
    let openReports = 0;
    let totalReports = 0;

    try {
      const reportStats = await env.DB.prepare(
        `SELECT
           COUNT(*) as total,
           SUM(CASE WHEN status IN ('RECEIVED', 'INVESTIGATING') THEN 1 ELSE 0 END) as open_count
         FROM ethics_reports`
      ).first<{ total: number; open_count: number }>();

      totalReports = reportStats?.total ?? 0;
      openReports = reportStats?.open_count ?? 0;
    } catch {
      // Table may not exist
    }

    const lastBoot = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}system:last_boot`
    );

    return {
      citizen: "ETHICARA",
      status: this._status,
      lastBoot,
      codeOfEthics: {
        title: code.title,
        version: code.version,
        principleCount: code.principles.length,
        adoptedAt: code.adoptedAt,
      },
      reviews: {
        total: totalReviews,
        approved: approvedCount,
        flagged: flaggedCount,
        rejected: rejectedCount,
      },
      reports: {
        total: totalReports,
        open: openReports,
      },
      assessedAt: new Date().toISOString(),
    };
  }

  // ---------------------------------------------------------------------------
  // Delegate methods to workers
  // ---------------------------------------------------------------------------

  /** Get ethics review history via CODE-1. */
  async getReviewHistory(env: Env, limit?: number) {
    return this.codeWorker.getEthicsReviewHistory(env, limit);
  }

  /** Get fairness report via FAIR-1. */
  async getFairnessReport(env: Env) {
    return this.fairWorker.getFairnessReport(env);
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

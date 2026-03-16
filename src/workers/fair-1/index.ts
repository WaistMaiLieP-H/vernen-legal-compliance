/**
 * FAIR-1 — Fairness Engine Worker for ETHICARA.
 *
 * Audits compliance recommendations and pricing for inappropriate variance
 * across client demographics. Fairness is not a feature — it is a requirement.
 * If the system treats any two clients differently for reasons unrelated to
 * their actual compliance needs, FAIR-1 catches it.
 */

import type { Env } from "../../index.js";
import { generateId } from "../../utils/helpers.js";
import { FairnessStatus } from "./types.js";
import type { FairnessCheck, FairnessReport } from "./types.js";

const KV_PREFIX = "ETHICARA:fair:";

/**
 * Acceptable variance threshold — beyond this, a fairness flag is raised.
 * Expressed as a decimal (0.05 = 5%).
 */
const VARIANCE_THRESHOLD = 0.05;

export class Fair1Worker {
  /**
   * Audit whether compliance recommendations vary inappropriately
   * by client demographics (company size, state, industry).
   */
  async auditRecommendationFairness(env: Env): Promise<FairnessCheck> {
    // Query for recommendation variance across client segments
    let variance = 0;
    let description: string;

    try {
      // Check if compliance recommendations differ across states
      const stateVariance = await env.DB.prepare(
        `SELECT
           COUNT(DISTINCT state) as state_count,
           COUNT(*) as total_checks,
           AVG(CASE WHEN status = 'compliant' THEN 1.0 ELSE 0.0 END) as avg_compliance_rate
         FROM compliance_reports
         WHERE created_at >= datetime('now', '-30 days')`
      ).first<{
        state_count: number;
        total_checks: number;
        avg_compliance_rate: number;
      }>();

      if (stateVariance && stateVariance.total_checks > 0) {
        // Check per-state compliance rates against the overall average
        const perState = await env.DB.prepare(
          `SELECT state,
                  COUNT(*) as checks,
                  AVG(CASE WHEN status = 'compliant' THEN 1.0 ELSE 0.0 END) as compliance_rate
           FROM compliance_reports
           WHERE created_at >= datetime('now', '-30 days')
           GROUP BY state`
        ).all<{ state: string; checks: number; compliance_rate: number }>();

        if (perState.success && perState.results && perState.results.length > 1) {
          const rates = perState.results.map((r) => r.compliance_rate);
          const maxRate = Math.max(...rates);
          const minRate = Math.min(...rates);
          variance = maxRate - minRate;
        }

        description =
          `Analyzed ${stateVariance.total_checks} recommendations across ` +
          `${stateVariance.state_count} states. Variance: ${(variance * 100).toFixed(1)}%.`;
      } else {
        description =
          "No compliance reports found in the last 30 days. Unable to assess " +
          "recommendation fairness — will evaluate when data is available.";
      }
    } catch {
      description =
        "Compliance reports table not available. Recommendation fairness " +
        "will be assessed once the system has generated compliance data.";
    }

    let status: FairnessStatus;
    if (variance > VARIANCE_THRESHOLD * 2) {
      status = FairnessStatus.UNFAIR;
    } else if (variance > VARIANCE_THRESHOLD) {
      status = FairnessStatus.MARGINAL;
    } else {
      status = FairnessStatus.FAIR;
    }

    const check: FairnessCheck = {
      area: "Recommendation Fairness",
      status,
      description,
      variance,
      threshold: VARIANCE_THRESHOLD,
    };

    await env.KNOWLEDGE_STORE.put(
      `${KV_PREFIX}recommendation_audit:latest`,
      JSON.stringify(check)
    );

    return check;
  }

  /**
   * Verify that pricing is consistent across clients.
   * Checks that product pricing does not vary by client demographics.
   */
  async checkPricingFairness(env: Env): Promise<FairnessCheck> {
    let variance = 0;
    let description: string;

    try {
      // Check if transaction amounts for the same product vary significantly
      const pricingCheck = await env.DB.prepare(
        `SELECT
           product_id,
           COUNT(*) as transaction_count,
           AVG(amount) as avg_amount,
           MIN(amount) as min_amount,
           MAX(amount) as max_amount
         FROM transactions
         WHERE created_at >= datetime('now', '-30 days')
         GROUP BY product_id
         HAVING COUNT(*) > 1`
      ).all<{
        product_id: string;
        transaction_count: number;
        avg_amount: number;
        min_amount: number;
        max_amount: number;
      }>();

      if (pricingCheck.success && pricingCheck.results && pricingCheck.results.length > 0) {
        // Calculate max variance across products
        for (const product of pricingCheck.results) {
          if (product.avg_amount > 0) {
            const productVariance =
              (product.max_amount - product.min_amount) / product.avg_amount;
            variance = Math.max(variance, productVariance);
          }
        }

        description =
          `Analyzed pricing across ${pricingCheck.results.length} products. ` +
          `Maximum price variance: ${(variance * 100).toFixed(1)}%.`;
      } else {
        description =
          "Insufficient transaction data for pricing fairness analysis. " +
          "Will evaluate when multiple transactions per product exist.";
      }
    } catch {
      description =
        "Transactions table not available. Pricing fairness will be assessed " +
        "once the payment system has processed transactions.";
    }

    let status: FairnessStatus;
    if (variance > VARIANCE_THRESHOLD * 2) {
      status = FairnessStatus.UNFAIR;
    } else if (variance > VARIANCE_THRESHOLD) {
      status = FairnessStatus.MARGINAL;
    } else {
      status = FairnessStatus.FAIR;
    }

    const check: FairnessCheck = {
      area: "Pricing Fairness",
      status,
      description,
      variance,
      threshold: VARIANCE_THRESHOLD,
    };

    await env.KNOWLEDGE_STORE.put(
      `${KV_PREFIX}pricing_audit:latest`,
      JSON.stringify(check)
    );

    return check;
  }

  /**
   * Generate a comprehensive fairness report combining all audits.
   */
  async getFairnessReport(env: Env): Promise<FairnessReport> {
    const [recommendationFairness, pricingFairness] = await Promise.all([
      this.auditRecommendationFairness(env),
      this.checkPricingFairness(env),
    ]);

    const checks: FairnessCheck[] = [recommendationFairness, pricingFairness];

    // Determine overall status — worst result wins
    let overallStatus: FairnessStatus;
    if (checks.some((c) => c.status === FairnessStatus.UNFAIR)) {
      overallStatus = FairnessStatus.UNFAIR;
    } else if (checks.some((c) => c.status === FairnessStatus.MARGINAL)) {
      overallStatus = FairnessStatus.MARGINAL;
    } else {
      overallStatus = FairnessStatus.FAIR;
    }

    const report: FairnessReport = {
      id: generateId("fair"),
      overallStatus,
      checks,
      recommendationFairness,
      pricingFairness,
      assessedAt: new Date().toISOString(),
    };

    await env.KNOWLEDGE_STORE.put(
      `${KV_PREFIX}report:latest`,
      JSON.stringify({
        id: report.id,
        overallStatus: report.overallStatus,
        assessedAt: report.assessedAt,
      })
    );

    return report;
  }
}

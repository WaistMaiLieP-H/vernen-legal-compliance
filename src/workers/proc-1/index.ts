/**
 * PROC-1: Process Optimization Worker for INTEGRA.
 *
 * Tracks API endpoint performance, identifies bottlenecks,
 * and provides operational metrics for the running system.
 */

import { generateId } from "../../utils/helpers.js";
import type { Env } from "../../index.js";
import type {
  EndpointMetric,
  Bottleneck,
  ProcessMetrics,
  ProcessMetricRow,
} from "./types.js";

/** Response time thresholds in milliseconds. */
const THRESHOLDS = {
  SLOW_RESPONSE_MS: 2000,
  VERY_SLOW_RESPONSE_MS: 5000,
  HIGH_ERROR_RATE: 0.1,  // 10%
  VERY_HIGH_ERROR_RATE: 0.25,  // 25%
};

export class Proc1Worker {
  // ── Response Time Analysis ───────────────────────────────────────

  /**
   * Analyze API endpoint response times from the process_metrics table.
   */
  async analyzeResponseTimes(env: Env): Promise<EndpointMetric[]> {
    const metrics: EndpointMetric[] = [];

    try {
      const result = await env.DB.prepare(
        `SELECT
           endpoint,
           AVG(response_time_ms) as avg_time,
           MAX(response_time_ms) as max_time,
           MIN(response_time_ms) as min_time,
           COUNT(*) as request_count,
           SUM(CASE WHEN status_code >= 400 THEN 1 ELSE 0 END) as error_count,
           MAX(recorded_at) as last_recorded
         FROM process_metrics
         WHERE recorded_at >= datetime('now', '-24 hours')
         GROUP BY endpoint
         ORDER BY avg_time DESC`
      ).all<{
        endpoint: string;
        avg_time: number;
        max_time: number;
        min_time: number;
        request_count: number;
        error_count: number;
        last_recorded: string;
      }>();

      if (result.success && result.results) {
        for (const row of result.results) {
          metrics.push({
            endpoint: row.endpoint,
            avgResponseTimeMs: Math.round(row.avg_time),
            maxResponseTimeMs: row.max_time,
            minResponseTimeMs: row.min_time,
            requestCount: row.request_count,
            errorCount: row.error_count,
            errorRate: row.request_count > 0
              ? Math.round((row.error_count / row.request_count) * 10000) / 10000
              : 0,
            lastRecordedAt: row.last_recorded,
          });
        }
      }
    } catch {
      // Table may not exist yet
    }

    return metrics;
  }

  // ── Bottleneck Identification ────────────────────────────────────

  /**
   * Identify slow queries or failing endpoints based on metric thresholds.
   */
  async identifyBottlenecks(env: Env): Promise<Bottleneck[]> {
    const metrics = await this.analyzeResponseTimes(env);
    const bottlenecks: Bottleneck[] = [];

    for (const metric of metrics) {
      // Check for very slow responses
      if (metric.avgResponseTimeMs >= THRESHOLDS.VERY_SLOW_RESPONSE_MS) {
        bottlenecks.push({
          endpoint: metric.endpoint,
          issue: "Very slow average response time",
          severity: "HIGH",
          avgResponseTimeMs: metric.avgResponseTimeMs,
          errorRate: metric.errorRate,
          recommendation: `Average response time is ${metric.avgResponseTimeMs}ms (threshold: ${THRESHOLDS.VERY_SLOW_RESPONSE_MS}ms). Investigate query optimization or caching.`,
        });
      } else if (metric.avgResponseTimeMs >= THRESHOLDS.SLOW_RESPONSE_MS) {
        bottlenecks.push({
          endpoint: metric.endpoint,
          issue: "Slow average response time",
          severity: "MEDIUM",
          avgResponseTimeMs: metric.avgResponseTimeMs,
          errorRate: metric.errorRate,
          recommendation: `Average response time is ${metric.avgResponseTimeMs}ms (threshold: ${THRESHOLDS.SLOW_RESPONSE_MS}ms). Consider adding KV caching.`,
        });
      }

      // Check for high error rates
      if (metric.errorRate >= THRESHOLDS.VERY_HIGH_ERROR_RATE) {
        bottlenecks.push({
          endpoint: metric.endpoint,
          issue: "Very high error rate",
          severity: "HIGH",
          avgResponseTimeMs: metric.avgResponseTimeMs,
          errorRate: metric.errorRate,
          recommendation: `Error rate is ${(metric.errorRate * 100).toFixed(1)}% (threshold: ${THRESHOLDS.VERY_HIGH_ERROR_RATE * 100}%). Investigate endpoint stability immediately.`,
        });
      } else if (metric.errorRate >= THRESHOLDS.HIGH_ERROR_RATE) {
        bottlenecks.push({
          endpoint: metric.endpoint,
          issue: "High error rate",
          severity: "MEDIUM",
          avgResponseTimeMs: metric.avgResponseTimeMs,
          errorRate: metric.errorRate,
          recommendation: `Error rate is ${(metric.errorRate * 100).toFixed(1)}% (threshold: ${THRESHOLDS.HIGH_ERROR_RATE * 100}%). Review error logs for this endpoint.`,
        });
      }
    }

    // Sort by severity
    const severityOrder: Record<string, number> = { HIGH: 0, MEDIUM: 1, LOW: 2 };
    bottlenecks.sort(
      (a, b) => (severityOrder[a.severity] ?? 2) - (severityOrder[b.severity] ?? 2)
    );

    return bottlenecks;
  }

  // ── Process Metrics Dashboard ────────────────────────────────────

  /**
   * Get the full operational metrics dashboard.
   */
  async getProcessMetrics(env: Env): Promise<ProcessMetrics> {
    const endpoints = await this.analyzeResponseTimes(env);
    const bottlenecks = await this.identifyBottlenecks(env);

    const totalRequests = endpoints.reduce((sum, e) => sum + e.requestCount, 0);
    const totalErrors = endpoints.reduce((sum, e) => sum + e.errorCount, 0);
    const overallErrorRate = totalRequests > 0
      ? Math.round((totalErrors / totalRequests) * 10000) / 10000
      : 0;

    const totalWeightedTime = endpoints.reduce(
      (sum, e) => sum + e.avgResponseTimeMs * e.requestCount,
      0
    );
    const avgResponseTimeMs = totalRequests > 0
      ? Math.round(totalWeightedTime / totalRequests)
      : 0;

    return {
      totalRequests,
      totalErrors,
      overallErrorRate,
      avgResponseTimeMs,
      endpoints,
      bottlenecks,
      collectedAt: new Date().toISOString(),
    };
  }

  // ── Metric Recording ─────────────────────────────────────────────

  /**
   * Record a single request metric. Called by middleware or API handlers.
   */
  async recordMetric(
    endpoint: string,
    responseTimeMs: number,
    statusCode: number,
    env: Env
  ): Promise<void> {
    try {
      await env.DB.prepare(
        `INSERT INTO process_metrics (id, endpoint, response_time_ms, status_code, recorded_at)
         VALUES (?1, ?2, ?3, ?4, ?5)`
      )
        .bind(
          generateId("metric"),
          endpoint,
          responseTimeMs,
          statusCode,
          new Date().toISOString()
        )
        .run();
    } catch {
      // Non-critical — don't fail the request if metrics recording fails
    }
  }
}

/**
 * PROC-1 Types — Process optimization types for INTEGRA.
 */

export interface EndpointMetric {
  endpoint: string;
  avgResponseTimeMs: number;
  maxResponseTimeMs: number;
  minResponseTimeMs: number;
  requestCount: number;
  errorCount: number;
  errorRate: number;
  lastRecordedAt: string;
}

export interface Bottleneck {
  endpoint: string;
  issue: string;
  severity: "HIGH" | "MEDIUM" | "LOW";
  avgResponseTimeMs: number;
  errorRate: number;
  recommendation: string;
}

export interface ProcessMetrics {
  totalRequests: number;
  totalErrors: number;
  overallErrorRate: number;
  avgResponseTimeMs: number;
  endpoints: EndpointMetric[];
  bottlenecks: Bottleneck[];
  collectedAt: string;
}

export interface ProcessMetricRow {
  id: string;
  endpoint: string;
  response_time_ms: number;
  status_code: number;
  recorded_at: string;
}

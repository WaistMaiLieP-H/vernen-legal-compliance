/**
 * SHIELD-1 Types — Security operations types for PRIVAXIS.
 */

export enum SecurityEventType {
  AUTH_FAILURE = "AUTH_FAILURE",
  DATA_ACCESS = "DATA_ACCESS",
  PERMISSION_CHANGE = "PERMISSION_CHANGE",
  BREACH_ATTEMPT = "BREACH_ATTEMPT",
  POLICY_VIOLATION = "POLICY_VIOLATION",
  SYSTEM_ALERT = "SYSTEM_ALERT",
}

export enum SecuritySeverity {
  INFO = "INFO",
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export interface SecurityEvent {
  id: string;
  eventType: SecurityEventType;
  severity: SecuritySeverity;
  description: string;
  source: string;
  metadata?: Record<string, unknown>;
  recordedAt: string;
}

export interface SecurityEventRow {
  id: string;
  event_type: string;
  severity: string;
  description: string | null;
  source: string | null;
  metadata: string | null;
  recorded_at: string;
}

export interface AuthControlCheck {
  endpoint: string;
  requiresAuth: boolean;
  authMechanism: string;
  isSecure: boolean;
  issue?: string;
}

export interface DataExposureCheck {
  endpoint: string;
  exposedFields: string[];
  severity: SecuritySeverity;
  recommendation: string;
}

export interface SecurityPosture {
  overallScore: number;
  grade: "A" | "B" | "C" | "D" | "F";
  authControlsPassing: number;
  authControlsTotal: number;
  exposedDataPoints: number;
  recentSecurityEvents: number;
  lastAuditAt: string | null;
  findings: SecurityFinding[];
}

export interface SecurityFinding {
  area: string;
  status: "PASS" | "WARN" | "FAIL";
  description: string;
}

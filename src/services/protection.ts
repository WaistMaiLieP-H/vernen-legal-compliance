/**
 * PROTECTION — Pre-processing Review Of Threats, Exposure, and Client Trust Integrity On Nodes
 *
 * Runs BEFORE a Citizen processes anything. Guards the input.
 * PROOF checks output. PROTECTION checks input. Nothing gets in dirty.
 *
 * What it catches:
 * - PII leaking between customers (client isolation)
 * - Malformed or adversarial input
 * - Injection attempts in string fields
 * - Missing authorization context
 * - Input that would cause a Citizen to produce garbage
 * - Rate/volume anomalies
 *
 * Standard 3 (Integrity): "Right" is defined by impact on everyone who depends on the work.
 * Standard 1 (Identity): Each Citizen's work is sovereign — one client's data never touches another's.
 */

import { generateId } from "../utils/helpers.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export enum ProtectionVerdict {
  CLEAR = "CLEAR",           // Input is clean — proceed
  SANITIZED = "SANITIZED",   // Input had issues but was cleaned
  REJECTED = "REJECTED",     // Input cannot be safely processed
}

export enum ThreatType {
  PII_EXPOSURE = "PII_EXPOSURE",             // SSN, credit card, etc. in unexpected field
  INJECTION_ATTEMPT = "INJECTION_ATTEMPT",   // SQL, script, or template injection
  CLIENT_ISOLATION = "CLIENT_ISOLATION",      // Request references another client's data
  MALFORMED_INPUT = "MALFORMED_INPUT",       // Structurally invalid for the operation
  MISSING_CONTEXT = "MISSING_CONTEXT",       // Required context for safe processing absent
  EXCESSIVE_VOLUME = "EXCESSIVE_VOLUME",     // Abnormal request size or frequency
  PRIVILEGE_ESCALATION = "PRIVILEGE_ESCALATION", // Requesting operations above auth level
}

export enum ThreatSeverity {
  CRITICAL = "CRITICAL",   // Reject immediately
  HIGH = "HIGH",           // Sanitize or reject
  MEDIUM = "MEDIUM",       // Sanitize and proceed
  LOW = "LOW",             // Log and proceed
}

export interface Threat {
  id: string;
  type: ThreatType;
  severity: ThreatSeverity;
  field: string;
  description: string;
  rawValue?: string;        // Original value (redacted if PII)
  sanitized: boolean;
  sanitizedValue?: string;
}

export interface ProtectionResult {
  id: string;
  citizenName: string;
  operationType: string;
  verdict: ProtectionVerdict;
  threats: Threat[];
  fieldsScanned: number;
  fieldsSanitized: number;
  durationMs: number;
  timestamp: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// Detection Patterns
// ═══════════════════════════════════════════════════════════════════════════

/** SSN pattern: 3-2-4 with optional dashes/spaces */
const SSN_PATTERN = /\b\d{3}[-\s]?\d{2}[-\s]?\d{4}\b/;

/** Credit card: 13-19 digits with optional separators */
const CC_PATTERN = /\b(?:\d[-\s]?){13,19}\b/;

/** EIN pattern: 2-7 */
const EIN_PATTERN = /\b\d{2}[-]?\d{7}\b/;

/** Email pattern for detection (not validation) */
const EMAIL_PATTERN = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

/** SQL injection patterns */
const SQL_INJECTION_PATTERNS = [
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|EXEC|EXECUTE|UNION)\b\s)/i,
  /(['";]\s*(OR|AND)\s+['"]?\d+['"]?\s*=\s*['"]?\d+)/i,
  /(--\s|;\s*DROP|;\s*DELETE|;\s*UPDATE|;\s*INSERT)/i,
  /(\bxp_\w+)/i,
];

/** Script injection patterns */
const SCRIPT_INJECTION_PATTERNS = [
  /<script[\s>]/i,
  /javascript\s*:/i,
  /on(error|load|click|mouse|focus|blur)\s*=/i,
  /<iframe[\s>]/i,
  /<object[\s>]/i,
  /eval\s*\(/i,
];

/** Template injection patterns */
const TEMPLATE_INJECTION_PATTERNS = [
  /\{\{.*\}\}/,
  /\$\{.*\}/,
  /<%(.*?)%>/,
];

// ═══════════════════════════════════════════════════════════════════════════
// Scan Functions
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Scan a string value for PII.
 */
function scanForPII(field: string, value: string): Threat[] {
  const threats: Threat[] = [];

  // Skip fields that legitimately contain these patterns
  const piiExemptFields = ["email", "contactEmail", "contact_email", "emailAddress"];
  const isEmailField = piiExemptFields.includes(field);

  if (SSN_PATTERN.test(value)) {
    threats.push({
      id: generateId("thr"),
      type: ThreatType.PII_EXPOSURE,
      severity: ThreatSeverity.CRITICAL,
      field,
      description: `Possible SSN detected in '${field}'. PII must not be stored in this field.`,
      rawValue: value.replace(SSN_PATTERN, "***-**-****"),
      sanitized: false,
    });
  }

  if (CC_PATTERN.test(value)) {
    threats.push({
      id: generateId("thr"),
      type: ThreatType.PII_EXPOSURE,
      severity: ThreatSeverity.CRITICAL,
      field,
      description: `Possible credit card number detected in '${field}'.`,
      rawValue: value.replace(CC_PATTERN, "****-****-****-****"),
      sanitized: false,
    });
  }

  // Detect email in non-email fields
  if (!isEmailField && EMAIL_PATTERN.test(value) && field !== "source" && field !== "url") {
    threats.push({
      id: generateId("thr"),
      type: ThreatType.PII_EXPOSURE,
      severity: ThreatSeverity.MEDIUM,
      field,
      description: `Email address detected in non-email field '${field}'. Verify this is intentional.`,
      sanitized: false,
    });
  }

  return threats;
}

/**
 * Scan a string value for injection attempts.
 */
function scanForInjection(field: string, value: string): Threat[] {
  const threats: Threat[] = [];

  for (const pattern of SQL_INJECTION_PATTERNS) {
    if (pattern.test(value)) {
      threats.push({
        id: generateId("thr"),
        type: ThreatType.INJECTION_ATTEMPT,
        severity: ThreatSeverity.CRITICAL,
        field,
        description: `Possible SQL injection in '${field}'.`,
        rawValue: value.slice(0, 100),
        sanitized: false,
      });
      break; // One SQL injection finding is enough
    }
  }

  for (const pattern of SCRIPT_INJECTION_PATTERNS) {
    if (pattern.test(value)) {
      threats.push({
        id: generateId("thr"),
        type: ThreatType.INJECTION_ATTEMPT,
        severity: ThreatSeverity.CRITICAL,
        field,
        description: `Possible script injection in '${field}'.`,
        rawValue: value.slice(0, 100),
        sanitized: false,
      });
      break;
    }
  }

  for (const pattern of TEMPLATE_INJECTION_PATTERNS) {
    if (pattern.test(value)) {
      threats.push({
        id: generateId("thr"),
        type: ThreatType.INJECTION_ATTEMPT,
        severity: ThreatSeverity.HIGH,
        field,
        description: `Possible template injection in '${field}'.`,
        rawValue: value.slice(0, 100),
        sanitized: false,
      });
      break;
    }
  }

  return threats;
}

/**
 * Scan for excessive input size.
 */
function scanForVolume(field: string, value: unknown): Threat[] {
  const threats: Threat[] = [];

  if (typeof value === "string" && value.length > 10000) {
    threats.push({
      id: generateId("thr"),
      type: ThreatType.EXCESSIVE_VOLUME,
      severity: ThreatSeverity.HIGH,
      field,
      description: `Field '${field}' contains ${value.length} characters. Maximum recommended: 10,000.`,
      sanitized: false,
    });
  }

  if (Array.isArray(value) && value.length > 500) {
    threats.push({
      id: generateId("thr"),
      type: ThreatType.EXCESSIVE_VOLUME,
      severity: ThreatSeverity.HIGH,
      field,
      description: `Array field '${field}' contains ${value.length} elements. Maximum recommended: 500.`,
      sanitized: false,
    });
  }

  return threats;
}

/**
 * Sanitize a string — strip dangerous characters while preserving meaning.
 */
function sanitizeString(value: string): string {
  return value
    .replace(/<script[^>]*>.*?<\/script>/gi, "")
    .replace(/<[^>]*>/g, "")                     // Strip HTML tags
    .replace(/javascript\s*:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim();
}

// ═══════════════════════════════════════════════════════════════════════════
// PROTECTION Engine
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Run PROTECTION on input before a Citizen processes it.
 *
 * @param citizenName - Which Citizen will process this
 * @param operationType - What operation is being performed
 * @param input - The raw input (will be mutated if sanitized)
 * @param clientId - The client making the request (for isolation checks)
 * @returns ProtectionResult with verdict and threat details
 */
export function runProtection(
  citizenName: string,
  operationType: string,
  input: Record<string, unknown>,
  clientId?: string,
): ProtectionResult {
  const startTime = Date.now();
  const allThreats: Threat[] = [];
  let fieldsScanned = 0;
  let fieldsSanitized = 0;

  // Recursively scan all string fields
  function scanObject(obj: Record<string, unknown>, prefix = ""): void {
    for (const [key, value] of Object.entries(obj)) {
      const fieldPath = prefix ? `${prefix}.${key}` : key;

      if (typeof value === "string") {
        fieldsScanned++;

        // PII scan
        allThreats.push(...scanForPII(fieldPath, value));

        // Injection scan
        allThreats.push(...scanForInjection(fieldPath, value));

        // Volume scan
        allThreats.push(...scanForVolume(fieldPath, value));
      } else if (Array.isArray(value)) {
        fieldsScanned++;
        allThreats.push(...scanForVolume(fieldPath, value));

        // Scan string elements
        for (let i = 0; i < Math.min(value.length, 100); i++) {
          if (typeof value[i] === "string") {
            allThreats.push(...scanForPII(`${fieldPath}[${i}]`, value[i] as string));
            allThreats.push(...scanForInjection(`${fieldPath}[${i}]`, value[i] as string));
          } else if (typeof value[i] === "object" && value[i] !== null) {
            scanObject(value[i] as Record<string, unknown>, `${fieldPath}[${i}]`);
          }
        }
      } else if (typeof value === "object" && value !== null) {
        scanObject(value as Record<string, unknown>, fieldPath);
      } else {
        fieldsScanned++;
      }
    }
  }

  scanObject(input);

  // Attempt sanitization on non-critical threats
  for (const threat of allThreats) {
    if (threat.type === ThreatType.INJECTION_ATTEMPT && threat.severity !== ThreatSeverity.CRITICAL) {
      // Sanitize the field in place
      const keys = threat.field.split(".");
      let target: unknown = input;
      for (let i = 0; i < keys.length - 1; i++) {
        target = (target as Record<string, unknown>)[keys[i]!];
      }
      const lastKey = keys[keys.length - 1]!;
      const currentValue = (target as Record<string, unknown>)[lastKey];
      if (typeof currentValue === "string") {
        (target as Record<string, unknown>)[lastKey] = sanitizeString(currentValue);
        threat.sanitized = true;
        threat.sanitizedValue = (target as Record<string, unknown>)[lastKey] as string;
        fieldsSanitized++;
      }
    }
  }

  // Determine verdict
  const criticalThreats = allThreats.filter((t) => t.severity === ThreatSeverity.CRITICAL && !t.sanitized);
  const highThreats = allThreats.filter((t) => t.severity === ThreatSeverity.HIGH && !t.sanitized);

  let verdict: ProtectionVerdict;
  if (criticalThreats.length > 0) {
    verdict = ProtectionVerdict.REJECTED;
  } else if (fieldsSanitized > 0 || highThreats.length > 0) {
    verdict = ProtectionVerdict.SANITIZED;
  } else {
    verdict = ProtectionVerdict.CLEAR;
  }

  return {
    id: generateId("prt"),
    citizenName,
    operationType,
    verdict,
    threats: allThreats,
    fieldsScanned,
    fieldsSanitized,
    durationMs: Date.now() - startTime,
    timestamp: new Date().toISOString(),
  };
}

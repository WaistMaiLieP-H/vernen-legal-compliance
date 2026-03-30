/**
 * PROOF — Pre-Release Output Oversight and Finalization
 *
 * Every Citizen runs a PROOF pass before any output leaves.
 * PROOF checks the work product against the Citizen's own governing standards,
 * flags deficiencies, attempts self-correction, and either stamps the output
 * as verified or escalates to human review.
 *
 * Standard 3 (Integrity): "Right" is defined by impact on everyone who depends on the work.
 * Standard 5 (Accountability): Every decision logged and verifiable.
 *
 * A compliance company that ships unverified output is not a compliance company.
 */

import type { GoverningStandard } from "../types/standard.js";
import { generateId } from "../utils/helpers.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export enum ProofVerdict {
  PASS = "PASS",               // Output meets all applicable standards
  CORRECTED = "CORRECTED",     // Deficiencies found and self-corrected
  FLAGGED = "FLAGGED",         // Cannot self-correct — needs human review
  BLOCKED = "BLOCKED",         // Critical deficiency — output not released
}

export enum DeficiencyType {
  MISSING_FIELD = "MISSING_FIELD",           // Required field absent
  EMPTY_RESULT = "EMPTY_RESULT",             // No findings when findings expected
  CITATION_MISSING = "CITATION_MISSING",     // Legal output without citation
  CITATION_INVALID = "CITATION_INVALID",     // Citation doesn't match known standards
  INTERNAL_CONTRADICTION = "INTERNAL_CONTRADICTION", // Output contradicts itself
  STANDARD_NOT_APPLIED = "STANDARD_NOT_APPLIED",     // Applicable standard was skipped
  INCOMPLETE_REMEDIATION = "INCOMPLETE_REMEDIATION",  // Problem identified but no fix
  JURISDICTION_MISMATCH = "JURISDICTION_MISMATCH",    // Wrong jurisdiction applied
  ENTITY_TYPE_MISMATCH = "ENTITY_TYPE_MISMATCH",     // Standard doesn't apply to entity type
  STALE_STANDARD = "STALE_STANDARD",                  // Standard may be outdated
}

export enum DeficiencySeverity {
  CRITICAL = "CRITICAL",   // Output must not ship — BLOCKED
  MAJOR = "MAJOR",         // Must be corrected or flagged
  MINOR = "MINOR",         // Should be corrected, can ship with flag
  INFO = "INFO",           // Noted but not blocking
}

export interface ProofDeficiency {
  id: string;
  type: DeficiencyType;
  severity: DeficiencySeverity;
  field: string;              // Which field/section has the issue
  expected: string;           // What should be there
  actual: string;             // What is there (or "missing")
  standardId?: string;        // Which governing standard was violated
  standardCitation?: string;  // Human-readable citation
  correctable: boolean;       // Can the Citizen fix this itself?
  corrected: boolean;         // Was it corrected?
  correction?: string;        // What was changed
}

export interface ProofResult {
  id: string;
  citizenName: string;
  outputType: string;         // "compliance_report", "onboarding", "audit_finding", etc.
  verdict: ProofVerdict;
  deficiencies: ProofDeficiency[];
  standardsChecked: number;
  standardsApplicable: number;
  checksRun: number;
  checksPassed: number;
  checksFailed: number;
  correctionsMade: number;
  proofDurationMs: number;
  timestamp: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// Check Functions — Each returns deficiencies found
// ═══════════════════════════════════════════════════════════════════════════

type CheckFn = (
  output: Record<string, unknown>,
  outputType: string,
  standards: GoverningStandard[],
  context?: ProofContext
) => ProofDeficiency[];

export interface ProofContext {
  jurisdiction?: string;
  entityType?: string;
  documentType?: string;
}

/**
 * Check 1: Required fields are present and non-empty.
 */
function checkRequiredFields(
  output: Record<string, unknown>,
  outputType: string,
): ProofDeficiency[] {
  const deficiencies: ProofDeficiency[] = [];

  // Define required fields per output type
  const requiredFieldMap: Record<string, string[]> = {
    compliance_report: ["id", "clientId", "states", "entityType", "results", "generatedAt", "generatedBy"],
    compliance_result: ["ruleId", "status", "details", "remediation"],
    onboarding: ["clientId", "onboardingId", "welcome", "onboardingSteps"],
    audit_finding: ["id", "standardId", "determination", "finding", "severity"],
    form_guidance: ["formCode", "title", "fields"],
    inquiry_response: ["id", "status", "response"],
  };

  const required = requiredFieldMap[outputType] ?? [];

  for (const field of required) {
    const value = output[field];
    if (value === undefined || value === null) {
      deficiencies.push({
        id: generateId("def"),
        type: DeficiencyType.MISSING_FIELD,
        severity: DeficiencySeverity.CRITICAL,
        field,
        expected: `Non-null value for '${field}'`,
        actual: "missing",
        correctable: false,
        corrected: false,
      });
    } else if (value === "" || (Array.isArray(value) && value.length === 0)) {
      deficiencies.push({
        id: generateId("def"),
        type: DeficiencyType.EMPTY_RESULT,
        severity: DeficiencySeverity.MAJOR,
        field,
        expected: `Non-empty value for '${field}'`,
        actual: "empty",
        correctable: false,
        corrected: false,
      });
    }
  }

  return deficiencies;
}

/**
 * Check 2: Compliance results have remediation for every non-compliant finding.
 */
function checkRemediationCompleteness(
  output: Record<string, unknown>,
  outputType: string,
): ProofDeficiency[] {
  if (outputType !== "compliance_report") return [];
  const deficiencies: ProofDeficiency[] = [];

  const results = output.results as Array<Record<string, unknown>> | undefined;
  if (!Array.isArray(results)) return [];

  for (const result of results) {
    const status = result.status as string;
    const remediation = result.remediation as string | undefined;
    const ruleId = result.ruleId as string;

    if (
      (status === "NON_COMPLIANT" || status === "NEEDS_REVIEW") &&
      (!remediation || remediation.trim().length < 10)
    ) {
      deficiencies.push({
        id: generateId("def"),
        type: DeficiencyType.INCOMPLETE_REMEDIATION,
        severity: DeficiencySeverity.MAJOR,
        field: `results[${ruleId}].remediation`,
        expected: "Actionable remediation steps (10+ chars)",
        actual: remediation ?? "missing",
        correctable: true,
        corrected: false,
      });
    }
  }

  return deficiencies;
}

/**
 * Check 3: Applicable standards were actually checked.
 * If a Citizen has standards for a document type but didn't apply them, that's a gap.
 */
function checkStandardCoverage(
  output: Record<string, unknown>,
  outputType: string,
  standards: GoverningStandard[],
  context?: ProofContext,
): ProofDeficiency[] {
  if (outputType !== "compliance_report") return [];
  const deficiencies: ProofDeficiency[] = [];

  const results = output.results as Array<Record<string, unknown>> | undefined;
  if (!Array.isArray(results)) return [];

  // Filter standards by jurisdiction if context provided
  const applicableStandards = standards.filter((std) => {
    if (context?.jurisdiction) {
      return std.jurisdiction === context.jurisdiction || std.jurisdiction === "US";
    }
    return true;
  });

  // Check if we have any standards but zero results — suspicious
  if (applicableStandards.length > 0 && results.length === 0) {
    deficiencies.push({
      id: generateId("def"),
      type: DeficiencyType.STANDARD_NOT_APPLIED,
      severity: DeficiencySeverity.MAJOR,
      field: "results",
      expected: `At least some findings from ${applicableStandards.length} applicable standards`,
      actual: "0 results returned",
      correctable: false,
      corrected: false,
    });
  }

  return deficiencies;
}

/**
 * Check 4: Jurisdiction consistency — all results match the requested jurisdiction.
 */
function checkJurisdictionConsistency(
  output: Record<string, unknown>,
  outputType: string,
  _standards: GoverningStandard[],
  context?: ProofContext,
): ProofDeficiency[] {
  if (outputType !== "compliance_report" || !context?.jurisdiction) return [];
  const deficiencies: ProofDeficiency[] = [];

  const states = output.states as string[] | undefined;
  if (Array.isArray(states) && context.jurisdiction) {
    if (!states.includes(context.jurisdiction) && context.jurisdiction !== "US") {
      deficiencies.push({
        id: generateId("def"),
        type: DeficiencyType.JURISDICTION_MISMATCH,
        severity: DeficiencySeverity.CRITICAL,
        field: "states",
        expected: `Contains requested jurisdiction '${context.jurisdiction}'`,
        actual: JSON.stringify(states),
        correctable: true,
        corrected: false,
      });
    }
  }

  return deficiencies;
}

/**
 * Check 5: Entity type consistency — report entity type matches request.
 */
function checkEntityTypeConsistency(
  output: Record<string, unknown>,
  outputType: string,
  _standards: GoverningStandard[],
  context?: ProofContext,
): ProofDeficiency[] {
  if (outputType !== "compliance_report" || !context?.entityType) return [];
  const deficiencies: ProofDeficiency[] = [];

  const reportEntityType = output.entityType as string | undefined;
  if (reportEntityType && reportEntityType !== context.entityType) {
    deficiencies.push({
      id: generateId("def"),
      type: DeficiencyType.ENTITY_TYPE_MISMATCH,
      severity: DeficiencySeverity.CRITICAL,
      field: "entityType",
      expected: context.entityType,
      actual: reportEntityType,
      correctable: true,
      corrected: false,
    });
  }

  return deficiencies;
}

/**
 * Check 6: Onboarding completeness — welcome message and steps present.
 */
function checkOnboardingCompleteness(
  output: Record<string, unknown>,
  outputType: string,
): ProofDeficiency[] {
  if (outputType !== "onboarding") return [];
  const deficiencies: ProofDeficiency[] = [];

  const steps = output.onboardingSteps as Array<Record<string, unknown>> | undefined;
  if (Array.isArray(steps)) {
    for (const step of steps) {
      if (!step.id || !step.label || !step.description) {
        deficiencies.push({
          id: generateId("def"),
          type: DeficiencyType.MISSING_FIELD,
          severity: DeficiencySeverity.MAJOR,
          field: `onboardingSteps[${step.id ?? "unknown"}]`,
          expected: "Each step must have id, label, and description",
          actual: `id=${step.id}, label=${step.label}, desc=${step.description}`,
          correctable: false,
          corrected: false,
        });
      }
    }
    if (steps.length === 0) {
      deficiencies.push({
        id: generateId("def"),
        type: DeficiencyType.EMPTY_RESULT,
        severity: DeficiencySeverity.CRITICAL,
        field: "onboardingSteps",
        expected: "At least 1 onboarding step",
        actual: "0 steps",
        correctable: false,
        corrected: false,
      });
    }
  }

  const welcome = output.welcome as string | undefined;
  if (welcome && welcome.length < 20) {
    deficiencies.push({
      id: generateId("def"),
      type: DeficiencyType.INCOMPLETE_REMEDIATION,
      severity: DeficiencySeverity.MINOR,
      field: "welcome",
      expected: "Personalized welcome message (20+ chars)",
      actual: `${welcome.length} chars`,
      correctable: false,
      corrected: false,
    });
  }

  return deficiencies;
}

// ═══════════════════════════════════════════════════════════════════════════
// Self-Correction — Attempt to fix deficiencies in-place
// ═══════════════════════════════════════════════════════════════════════════

function attemptCorrections(
  output: Record<string, unknown>,
  deficiencies: ProofDeficiency[],
): number {
  let correctionCount = 0;

  for (const def of deficiencies) {
    if (!def.correctable) continue;

    switch (def.type) {
      case DeficiencyType.INCOMPLETE_REMEDIATION: {
        // Add generic remediation text for missing remediation
        const results = output.results as Array<Record<string, unknown>> | undefined;
        if (Array.isArray(results)) {
          for (const result of results) {
            if (
              (result.status === "NON_COMPLIANT" || result.status === "NEEDS_REVIEW") &&
              (!result.remediation || (result.remediation as string).trim().length < 10)
            ) {
              result.remediation =
                `Review ${result.ruleId} requirements and consult with a licensed attorney ` +
                `to determine compliance obligations. File necessary documents before applicable deadlines.`;
              def.corrected = true;
              def.correction = "Added generic remediation guidance";
              correctionCount++;
            }
          }
        }
        break;
      }

      case DeficiencyType.JURISDICTION_MISMATCH: {
        // Cannot safely correct jurisdiction — flag only
        break;
      }

      case DeficiencyType.ENTITY_TYPE_MISMATCH: {
        // Cannot safely change entity type — flag only
        break;
      }
    }
  }

  return correctionCount;
}

// ═══════════════════════════════════════════════════════════════════════════
// PROOF Engine — The main entry point
// ═══════════════════════════════════════════════════════════════════════════

/** All check functions to run, in order. */
const ALL_CHECKS: CheckFn[] = [
  checkRequiredFields,
  checkRemediationCompleteness,
  checkStandardCoverage,
  checkJurisdictionConsistency,
  checkEntityTypeConsistency,
  checkOnboardingCompleteness,
];

/**
 * Run a PROOF pass on a Citizen's output before it ships.
 *
 * @param citizenName - Which Citizen produced this output
 * @param outputType - Type of output (compliance_report, onboarding, etc.)
 * @param output - The actual output object (will be mutated if corrections made)
 * @param standards - The Citizen's governing standards library
 * @param context - Optional context (jurisdiction, entity type, document type)
 * @returns ProofResult with verdict and deficiency details
 */
export function runProof(
  citizenName: string,
  outputType: string,
  output: Record<string, unknown>,
  standards: GoverningStandard[],
  context?: ProofContext,
): ProofResult {
  const startTime = Date.now();
  const allDeficiencies: ProofDeficiency[] = [];

  // Run all checks
  let checksRun = 0;
  for (const check of ALL_CHECKS) {
    const found = check(output, outputType, standards, context);
    allDeficiencies.push(...found);
    checksRun++;
  }

  // Attempt self-correction on correctable deficiencies
  const correctionsMade = attemptCorrections(output, allDeficiencies);

  // Determine verdict
  const uncorrectedCritical = allDeficiencies.filter(
    (d) => d.severity === DeficiencySeverity.CRITICAL && !d.corrected
  );
  const uncorrectedMajor = allDeficiencies.filter(
    (d) => d.severity === DeficiencySeverity.MAJOR && !d.corrected
  );

  let verdict: ProofVerdict;
  if (uncorrectedCritical.length > 0) {
    verdict = ProofVerdict.BLOCKED;
  } else if (uncorrectedMajor.length > 0) {
    verdict = ProofVerdict.FLAGGED;
  } else if (correctionsMade > 0) {
    verdict = ProofVerdict.CORRECTED;
  } else {
    verdict = ProofVerdict.PASS;
  }

  // Count applicable standards
  const applicableStandards = context?.jurisdiction
    ? standards.filter(
        (s) => s.jurisdiction === context.jurisdiction || s.jurisdiction === "US"
      )
    : standards;

  const result: ProofResult = {
    id: generateId("prf"),
    citizenName,
    outputType,
    verdict,
    deficiencies: allDeficiencies,
    standardsChecked: standards.length,
    standardsApplicable: applicableStandards.length,
    checksRun,
    checksPassed: checksRun - allDeficiencies.length,
    checksFailed: allDeficiencies.length,
    correctionsMade,
    proofDurationMs: Date.now() - startTime,
    timestamp: new Date().toISOString(),
  };

  return result;
}

/**
 * Stamp an output with its PROOF verification.
 * Adds proofId and proofVerdict directly to the output object.
 */
export function stampOutput(
  output: Record<string, unknown>,
  proof: ProofResult,
): void {
  output._proof = {
    id: proof.id,
    verdict: proof.verdict,
    checksRun: proof.checksRun,
    deficiencies: proof.deficiencies.length,
    correctionsMade: proof.correctionsMade,
    durationMs: proof.proofDurationMs,
    timestamp: proof.timestamp,
  };
}

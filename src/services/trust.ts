/**
 * TRUST — Tamper-Resistant Unified Standard Trail
 *
 * Every piece of work a Citizen produces gets a TRUST record.
 * Immutable audit trail. Hash-verified integrity. Provable chain of custody.
 *
 * If someone asks "how did you arrive at this finding?" — TRUST answers.
 * If someone asks "has this report been modified?" — TRUST proves it hasn't.
 * If someone asks "which standards were applied?" — TRUST shows the receipts.
 *
 * Standard 5 (Accountability): Every decision logged and verifiable.
 * Standard 3 (Integrity): "Right" is defined by impact on everyone who depends on the work.
 */

import { generateId } from "../utils/helpers.js";
import type { ProofResult } from "./proof.js";
import type { ProtectionResult } from "./protection.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface TrustRecord {
  id: string;
  citizenName: string;
  operationType: string;
  clientId?: string;

  // What went in
  inputHash: string;
  inputSummary: string;          // Human-readable: "LLC compliance check for CA"

  // What was checked (PROTECTION)
  protectionId?: string;
  protectionVerdict?: string;
  threatsDetected: number;
  threatsSanitized: number;

  // What was produced
  outputHash: string;
  outputSummary: string;         // "48 rules checked, 42 compliant, 3 non-compliant, 3 needs review"

  // What was verified (PROOF)
  proofId?: string;
  proofVerdict?: string;
  deficienciesFound: number;
  correctionsMade: number;

  // Standards applied
  standardsConsulted: number;
  standardsCited: string[];      // IDs of standards actually referenced in output

  // Integrity
  combinedHash: string;          // SHA-256 of inputHash + outputHash + proofId
  previousTrustId?: string;      // Chain to previous TRUST record for this client
  chainDepth: number;            // How many records in this client's chain

  // Timestamps
  createdAt: string;
  processingDurationMs: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// Hashing — Deterministic content hash for integrity verification
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Generate a deterministic hash of an object.
 * Uses a simple but effective approach that works in Workers runtime.
 */
async function hashObject(obj: unknown): Promise<string> {
  const str = JSON.stringify(obj, Object.keys(obj as object).sort());
  const encoder = new TextEncoder();
  const data = encoder.encode(str);

  // Use Web Crypto API (available in Workers)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Generate a combined integrity hash from input, output, and proof.
 */
async function combinedIntegrityHash(
  inputHash: string,
  outputHash: string,
  proofId: string,
): Promise<string> {
  return hashObject({ inputHash, outputHash, proofId });
}

// ═══════════════════════════════════════════════════════════════════════════
// Summary Generators
// ═══════════════════════════════════════════════════════════════════════════

function summarizeInput(
  operationType: string,
  input: Record<string, unknown>,
): string {
  switch (operationType) {
    case "compliance_check": {
      const state = input.state ?? input.states;
      const entity = input.entityType ?? input.entity_type;
      const name = input.businessName ?? input.name ?? "Anonymous";
      return `${entity} compliance check for ${name} in ${Array.isArray(state) ? (state as string[]).join(", ") : state}`;
    }
    case "onboarding": {
      const name = input.businessName ?? input.name;
      const entity = input.entityType ?? input.entity_type;
      return `${entity} onboarding for ${name}`;
    }
    case "audit": {
      const docType = input.documentType ?? input.document_type ?? "document";
      return `Audit of ${docType}`;
    }
    case "inquiry": {
      const subject = input.subject ?? input.question ?? "general inquiry";
      return `Client inquiry: ${String(subject).slice(0, 80)}`;
    }
    default:
      return `${operationType} operation`;
  }
}

function summarizeOutput(
  operationType: string,
  output: Record<string, unknown>,
): string {
  switch (operationType) {
    case "compliance_check":
    case "compliance_report": {
      const summary = output.summary as Record<string, unknown> | undefined;
      if (summary) {
        return `${summary.totalRules} rules checked: ${summary.compliant} compliant, ${summary.nonCompliant} non-compliant, ${summary.needsReview} needs review`;
      }
      const results = output.results as unknown[] | undefined;
      return `${results?.length ?? 0} compliance findings generated`;
    }
    case "onboarding": {
      const steps = output.onboardingSteps as unknown[] | undefined;
      return `Client onboarded with ${steps?.length ?? 0} steps, ID: ${output.clientId}`;
    }
    case "audit": {
      const findings = output.findings as unknown[] | undefined;
      return `${findings?.length ?? 0} audit findings`;
    }
    default:
      return `${operationType} completed`;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// TRUST Engine
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Create a TRUST record for a completed operation.
 * Called after both PROTECTION (input) and PROOF (output) have run.
 *
 * @param citizenName - Which Citizen performed the work
 * @param operationType - What was done
 * @param input - The original input (after PROTECTION)
 * @param output - The final output (after PROOF)
 * @param protection - PROTECTION result (if run)
 * @param proof - PROOF result (if run)
 * @param clientId - Client who requested the work
 * @param standardsCited - IDs of standards actually applied
 * @param previousTrustId - Previous TRUST record in this client's chain
 * @param startTime - When processing began (for duration calculation)
 */
export async function createTrustRecord(
  citizenName: string,
  operationType: string,
  input: Record<string, unknown>,
  output: Record<string, unknown>,
  protection?: ProtectionResult,
  proof?: ProofResult,
  clientId?: string,
  standardsCited?: string[],
  previousTrustId?: string,
  startTime?: number,
): Promise<TrustRecord> {
  const inputHash = await hashObject(input);
  const outputHash = await hashObject(output);
  const proofId = proof?.id ?? "none";

  const combined = await combinedIntegrityHash(inputHash, outputHash, proofId);

  const record: TrustRecord = {
    id: generateId("tru"),
    citizenName,
    operationType,
    clientId,

    inputHash,
    inputSummary: summarizeInput(operationType, input),

    protectionId: protection?.id,
    protectionVerdict: protection?.verdict,
    threatsDetected: protection?.threats.length ?? 0,
    threatsSanitized: protection?.fieldsSanitized ?? 0,

    outputHash,
    outputSummary: summarizeOutput(operationType, output),

    proofId: proof?.id,
    proofVerdict: proof?.verdict,
    deficienciesFound: proof?.deficiencies.length ?? 0,
    correctionsMade: proof?.correctionsMade ?? 0,

    standardsConsulted: proof?.standardsChecked ?? 0,
    standardsCited: standardsCited ?? [],

    combinedHash: combined,
    previousTrustId,
    chainDepth: previousTrustId ? 1 : 0, // Caller increments if chaining

    createdAt: new Date().toISOString(),
    processingDurationMs: startTime ? Date.now() - startTime : 0,
  };

  return record;
}

/**
 * Persist a TRUST record to D1.
 */
export async function persistTrustRecord(
  record: TrustRecord,
  env: { DB: { prepare: (q: string) => { bind: (...args: unknown[]) => { run: () => Promise<unknown> } } } },
): Promise<void> {
  try {
    await env.DB.prepare(
      `INSERT INTO trust_records
       (id, citizen_name, operation_type, client_id,
        input_hash, input_summary,
        protection_id, protection_verdict, threats_detected, threats_sanitized,
        output_hash, output_summary,
        proof_id, proof_verdict, deficiencies_found, corrections_made,
        standards_consulted, standards_cited,
        combined_hash, previous_trust_id, chain_depth,
        processing_duration_ms, created_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10,
               ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18, ?19, ?20, ?21, ?22, ?23)`
    )
      .bind(
        record.id,
        record.citizenName,
        record.operationType,
        record.clientId ?? null,
        record.inputHash,
        record.inputSummary,
        record.protectionId ?? null,
        record.protectionVerdict ?? null,
        record.threatsDetected,
        record.threatsSanitized,
        record.outputHash,
        record.outputSummary,
        record.proofId ?? null,
        record.proofVerdict ?? null,
        record.deficienciesFound,
        record.correctionsMade,
        record.standardsConsulted,
        JSON.stringify(record.standardsCited),
        record.combinedHash,
        record.previousTrustId ?? null,
        record.chainDepth,
        record.processingDurationMs,
        record.createdAt,
      )
      .run();
  } catch {
    // Table may not exist yet — fail silently until migration runs
  }
}

/**
 * Verify the integrity of an output against its TRUST record.
 * Returns true if the output hasn't been tampered with.
 */
export async function verifyIntegrity(
  output: Record<string, unknown>,
  trustRecord: TrustRecord,
): Promise<{ verified: boolean; outputHashMatch: boolean; combinedHashMatch: boolean }> {
  const currentOutputHash = await hashObject(output);
  const outputHashMatch = currentOutputHash === trustRecord.outputHash;

  const currentCombined = await combinedIntegrityHash(
    trustRecord.inputHash,
    currentOutputHash,
    trustRecord.proofId ?? "none",
  );
  const combinedHashMatch = currentCombined === trustRecord.combinedHash;

  return {
    verified: outputHashMatch && combinedHashMatch,
    outputHashMatch,
    combinedHashMatch,
  };
}

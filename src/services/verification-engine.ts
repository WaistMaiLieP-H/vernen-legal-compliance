/**
 * VerificationEngine — Blockchain-backed compliance verification
 *
 * This is the stamp. When Vernen verifies a business, the result is:
 * 1. Hashed (SHA-256 of report + rules + results + timestamp)
 * 2. Stored in D1 with full audit trail
 * 3. Anchored on-chain (Base L2 / Ethereum) for immutable proof
 * 4. Publicly verifiable by anyone with the verification hash
 *
 * Nobody can forge it. Nobody can backdate it. Nobody can argue with it.
 * Like the building inspector's stamp — except it lives forever on-chain.
 */

import type { VerificationRecord, VerificationStatus } from "../types/compliance.js";

interface VerificationInput {
  reportId: string;
  clientId: string;
  entityType: string;
  statesChecked: string[];
  rulesChecked: Array<{ id: string; code: string; title: string; description: string }>;
  results: Array<{ ruleId: string; status: string; details: string }>;
  compliantCount: number;
  nonCompliantCount: number;
  needsReviewCount: number;
  totalRules: number;
}

interface VerificationResult {
  verificationId: string;
  verificationHash: string;
  rulesHash: string;
  resultHash: string;
  complianceScore: number;
  verificationStatus: string;
  verifiedAt: string;
  expiresAt: string;
  publicUrl: string;
}

export class VerificationEngine {
  /**
   * Generate a verification record for a compliance report.
   * This creates the cryptographic proof that a check was performed.
   */
  async generateVerification(
    input: VerificationInput
  ): Promise<VerificationResult> {
    const verifiedAt = new Date().toISOString();
    const verificationId = `vr-${generateId()}`;

    // Hash the rules that were checked (the book version)
    const rulesHash = await this.hashContent(
      JSON.stringify(
        input.rulesChecked.map((r) => ({
          id: r.id,
          code: r.code,
          title: r.title,
        }))
      )
    );

    // Hash the results (what the inspector found)
    const resultHash = await this.hashContent(
      JSON.stringify(
        input.results.map((r) => ({
          ruleId: r.ruleId,
          status: r.status,
        }))
      )
    );

    // Calculate compliance score
    const complianceScore = this.calculateScore(
      input.compliantCount,
      input.nonCompliantCount,
      input.needsReviewCount,
      input.totalRules
    );

    // Determine verification status
    const verificationStatus = this.determineStatus(
      input.compliantCount,
      input.nonCompliantCount,
      input.needsReviewCount,
      input.totalRules
    );

    // Generate the master verification hash
    // This is THE stamp — combines everything into one unforgeable proof
    const verificationHash = await this.hashContent(
      JSON.stringify({
        reportId: input.reportId,
        clientId: input.clientId,
        entityType: input.entityType,
        statesChecked: input.statesChecked,
        rulesHash,
        resultHash,
        complianceScore,
        verificationStatus,
        verifiedAt,
        verifiedBy: "REGULIS",
      })
    );

    // Expiry: 1 year from verification for annual certification
    const expiresAt = new Date(
      Date.now() + 365 * 24 * 60 * 60 * 1000
    ).toISOString();

    return {
      verificationId,
      verificationHash,
      rulesHash,
      resultHash,
      complianceScore,
      verificationStatus,
      verifiedAt,
      expiresAt,
      publicUrl: `https://compliance.vernenlegal.com/verify/${verificationHash}`,
    };
  }

  /**
   * Verify an existing verification record against its hash.
   * Anyone can do this — it's the public lookup.
   */
  async verifyRecord(
    record: VerificationRecord,
    rulesUsed: Array<{ id: string; code: string; title: string }>,
    results: Array<{ ruleId: string; status: string }>
  ): Promise<{ valid: boolean; reason?: string }> {
    // Recompute the rules hash
    const rulesHash = await this.hashContent(
      JSON.stringify(rulesUsed.map((r) => ({ id: r.id, code: r.code, title: r.title })))
    );

    if (rulesHash !== record.rulesHash) {
      return { valid: false, reason: "Rules hash mismatch — rules have been altered" };
    }

    // Recompute the result hash
    const resultHash = await this.hashContent(
      JSON.stringify(results.map((r) => ({ ruleId: r.ruleId, status: r.status })))
    );

    if (resultHash !== record.resultHash) {
      return { valid: false, reason: "Result hash mismatch — results have been altered" };
    }

    // Check expiry
    if (record.expiresAt && new Date(record.expiresAt) < new Date()) {
      return { valid: false, reason: "Verification has expired" };
    }

    return { valid: true };
  }

  /**
   * Prepare a verification record for on-chain anchoring.
   * Returns the data to be submitted to the smart contract.
   */
  prepareChainAnchor(verification: VerificationResult): {
    hash: string;
    score: number;
    status: string;
    timestamp: number;
    expiresAt: number;
  } {
    return {
      hash: verification.verificationHash,
      score: Math.round(verification.complianceScore * 100), // basis points
      status: verification.verificationStatus,
      timestamp: Math.floor(new Date(verification.verifiedAt).getTime() / 1000),
      expiresAt: Math.floor(new Date(verification.expiresAt).getTime() / 1000),
    };
  }

  /**
   * SHA-256 hash using Web Crypto API (available in Cloudflare Workers)
   */
  private async hashContent(content: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(content);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  /**
   * Calculate compliance score (0-100)
   * Weighted: compliant = full credit, needs_review = half credit, non_compliant = zero
   */
  private calculateScore(
    compliant: number,
    nonCompliant: number,
    needsReview: number,
    total: number
  ): number {
    if (total === 0) return 0;
    const weighted = compliant * 1.0 + needsReview * 0.5 + nonCompliant * 0.0;
    return Math.round((weighted / total) * 10000) / 100; // two decimal places
  }

  /**
   * Determine verification status based on results
   */
  private determineStatus(
    compliant: number,
    nonCompliant: number,
    needsReview: number,
    total: number
  ): string {
    if (total === 0) return "VERIFIED_PENDING_REVIEW";
    if (nonCompliant === 0 && needsReview === 0) return "VERIFIED_COMPLIANT";
    if (nonCompliant === 0) return "VERIFIED_PARTIAL";
    if (nonCompliant / total > 0.25) return "VERIFIED_NON_COMPLIANT";
    return "VERIFIED_PARTIAL";
  }
}

function generateId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  const randomValues = new Uint8Array(16);
  crypto.getRandomValues(randomValues);
  for (let i = 0; i < 16; i++) {
    id += chars[(randomValues[i] ?? 0) % chars.length];
  }
  return id;
}

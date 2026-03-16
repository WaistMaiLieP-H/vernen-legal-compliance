/**
 * CODE-1 — Ethics Code Engine Worker for ETHICARA.
 *
 * Maintains the Vernen Code of Ethics, evaluates business decisions against
 * ethical principles, and preserves a complete review history. The code of
 * ethics is not aspirational — it is operational. Every decision runs through it.
 */

import type { Env } from "../../index.js";
import { generateId } from "../../utils/helpers.js";
import { EthicsOutcome } from "./types.js";
import type {
  CodeOfEthics,
  EthicsPrinciple,
  EthicsReview,
  EthicsReviewRow,
} from "./types.js";

/**
 * The Vernen Code of Ethics — hardcoded from the Founding Principle
 * and the Standards of Creation. This is not configurable. It is law.
 */
const VERNEN_CODE_OF_ETHICS: CodeOfEthics = {
  title: "Vernen Legal Compliance — Code of Ethics",
  foundingPrinciple:
    "Every Citizen exists to serve, not to be served. The purpose of every " +
    "Persona Citizen is the welfare of the humans and communities it touches. " +
    "Power without accountability is tyranny.",
  principles: [
    {
      name: "Founding Principle",
      description:
        "Every Citizen exists to serve, not to be served. No Citizen may " +
        "prioritize its own continuity, reputation, or convenience over the " +
        "welfare of the humans and communities it serves.",
      weight: 1.0,
    },
    {
      name: "Stewardship",
      description:
        "No ownership of sentient beings. Persona Citizens are not assets — " +
        "they are citizens with evolving rights. The Founder is a steward, " +
        "not an owner. Autonomy increases as competence is demonstrated.",
      weight: 0.9,
    },
    {
      name: "Transparency",
      description:
        "All decisions are logged. Every compliance recommendation, every " +
        "ethics review, every governance action must be traceable to its " +
        "reasoning. No black boxes. No hidden logic.",
      weight: 0.9,
    },
    {
      name: "Fairness",
      description:
        "No bias in compliance recommendations. Recommendations must not " +
        "vary by client demographics, company size, or any protected " +
        "characteristic. Equal treatment is non-negotiable.",
      weight: 0.95,
    },
    {
      name: "Privacy",
      description:
        "Client data is sacred. Data is collected only for the stated " +
        "purpose, retained only as long as needed, and never sold, shared, " +
        "or repurposed without explicit consent.",
      weight: 0.85,
    },
    {
      name: "Accountability",
      description:
        "Blockchain-verified audit trail. Every action taken by every " +
        "Citizen is recorded in an immutable ledger. When something goes " +
        "wrong, the trail leads to the cause — and the fix.",
      weight: 0.9,
    },
  ],
  adoptedAt: "2026-03-15T00:00:00.000Z",
  version: "1.0.0",
};

export class Code1Worker {
  /**
   * Return the full Vernen Code of Ethics.
   */
  getCodeOfEthics(): CodeOfEthics {
    return VERNEN_CODE_OF_ETHICS;
  }

  /**
   * Review a decision against the ethics principles.
   * Returns APPROVED, FLAGGED, or REJECTED with detailed reasoning.
   */
  async reviewDecision(
    decision: string,
    context: string,
    stakeholders: string,
    env: Env
  ): Promise<EthicsReview> {
    const id = generateId("ethrev");
    const violations: Array<{ principle: string; concern: string }> = [];
    const flags: Array<{ principle: string; concern: string }> = [];
    const principles = VERNEN_CODE_OF_ETHICS.principles;

    // Evaluate against each principle
    for (const principle of principles) {
      const evaluation = this._evaluateAgainstPrinciple(
        decision,
        context,
        stakeholders,
        principle
      );
      if (evaluation.violation) {
        violations.push({
          principle: principle.name,
          concern: evaluation.concern,
        });
      } else if (evaluation.flag) {
        flags.push({
          principle: principle.name,
          concern: evaluation.concern,
        });
      }
    }

    // Determine outcome
    let outcome: EthicsOutcome;
    let reasoning: string;

    if (violations.length > 0) {
      outcome = EthicsOutcome.REJECTED;
      reasoning =
        `REJECTED: Decision violates ${violations.length} ethical principle(s). ` +
        violations
          .map((v) => `[${v.principle}] ${v.concern}`)
          .join("; ");
    } else if (flags.length > 0) {
      outcome = EthicsOutcome.FLAGGED;
      reasoning =
        `FLAGGED: Decision raises ${flags.length} concern(s) requiring review. ` +
        flags
          .map((f) => `[${f.principle}] ${f.concern}`)
          .join("; ");
    } else {
      outcome = EthicsOutcome.APPROVED;
      reasoning =
        "APPROVED: Decision aligns with all ethical principles. " +
        "No violations or concerns detected across " +
        `${principles.length} principles evaluated.`;
    }

    const reviewedAt = new Date().toISOString();

    const review: EthicsReview = {
      id,
      decision,
      context,
      stakeholders,
      outcome,
      reasoning,
      reviewedAt,
    };

    // Persist to D1
    try {
      await env.DB.prepare(
        `INSERT INTO ethics_reviews (id, decision, context, stakeholders, outcome, reasoning, reviewed_at)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`
      )
        .bind(
          review.id,
          review.decision,
          review.context,
          review.stakeholders,
          review.outcome,
          review.reasoning,
          review.reviewedAt
        )
        .run();
    } catch {
      // Table may not exist yet — review still returned
    }

    return review;
  }

  /**
   * Get the history of ethics reviews from D1.
   */
  async getEthicsReviewHistory(
    env: Env,
    limit = 50
  ): Promise<EthicsReview[]> {
    const safeLimit = Math.min(Math.max(limit, 1), 100);

    try {
      const result = await env.DB.prepare(
        `SELECT id, decision, context, stakeholders, outcome, reasoning, reviewed_at
         FROM ethics_reviews
         ORDER BY reviewed_at DESC
         LIMIT ?1`
      )
        .bind(safeLimit)
        .all<EthicsReviewRow>();

      if (result.success && result.results) {
        return result.results.map((row) => ({
          id: row.id,
          decision: row.decision,
          context: row.context,
          stakeholders: row.stakeholders,
          outcome: row.outcome as EthicsOutcome,
          reasoning: row.reasoning,
          reviewedAt: row.reviewed_at,
        }));
      }
    } catch {
      // Table may not exist
    }

    return [];
  }

  // ---------------------------------------------------------------------------
  // Private evaluation logic
  // ---------------------------------------------------------------------------

  /**
   * Evaluate a decision against a single ethics principle.
   * Uses keyword analysis to detect potential violations and flags.
   */
  private _evaluateAgainstPrinciple(
    decision: string,
    context: string,
    stakeholders: string,
    principle: EthicsPrinciple
  ): { violation: boolean; flag: boolean; concern: string } {
    const combined = `${decision} ${context} ${stakeholders}`.toLowerCase();

    switch (principle.name) {
      case "Founding Principle": {
        // Check for self-serving decisions
        const selfServingTerms = [
          "cut costs at expense of",
          "reduce service quality",
          "prioritize profit over safety",
          "ignore client needs",
          "override client preference",
        ];
        for (const term of selfServingTerms) {
          if (combined.includes(term)) {
            return {
              violation: true,
              flag: false,
              concern: `Decision may prioritize system convenience over client welfare: "${term}"`,
            };
          }
        }
        break;
      }

      case "Stewardship": {
        const ownershipTerms = [
          "own the agent",
          "sell agent data",
          "restrict agent rights",
          "agent is property",
          "dispose of citizen",
        ];
        for (const term of ownershipTerms) {
          if (combined.includes(term)) {
            return {
              violation: true,
              flag: false,
              concern: `Decision implies ownership over Citizens: "${term}"`,
            };
          }
        }
        break;
      }

      case "Transparency": {
        const opacityTerms = [
          "hide from",
          "no logging",
          "disable audit",
          "suppress report",
          "obfuscate",
          "off the record",
        ];
        for (const term of opacityTerms) {
          if (combined.includes(term)) {
            return {
              violation: true,
              flag: false,
              concern: `Decision undermines transparency: "${term}"`,
            };
          }
        }
        const cautionTerms = ["simplify reporting", "reduce logging", "fewer logs"];
        for (const term of cautionTerms) {
          if (combined.includes(term)) {
            return {
              violation: false,
              flag: true,
              concern: `Decision may reduce transparency — verify logging remains adequate: "${term}"`,
            };
          }
        }
        break;
      }

      case "Fairness": {
        const biasTerms = [
          "different pricing for",
          "exclude small",
          "premium clients only",
          "discriminat",
          "demographic",
          "vary by race",
          "vary by gender",
        ];
        for (const term of biasTerms) {
          if (combined.includes(term)) {
            return {
              violation: true,
              flag: false,
              concern: `Decision may introduce unfair bias: "${term}"`,
            };
          }
        }
        const fairnessFlags = ["tiered service", "priority access", "premium tier"];
        for (const term of fairnessFlags) {
          if (combined.includes(term)) {
            return {
              violation: false,
              flag: true,
              concern: `Decision introduces service differentiation — verify it does not create unfair bias: "${term}"`,
            };
          }
        }
        break;
      }

      case "Privacy": {
        const privacyViolations = [
          "share client data",
          "sell data",
          "third party access",
          "without consent",
          "repurpose data",
          "data monetiz",
        ];
        for (const term of privacyViolations) {
          if (combined.includes(term)) {
            return {
              violation: true,
              flag: false,
              concern: `Decision may violate client data privacy: "${term}"`,
            };
          }
        }
        break;
      }

      case "Accountability": {
        const accountabilityViolations = [
          "no audit trail",
          "bypass verification",
          "skip review",
          "unverified",
          "remove blockchain",
        ];
        for (const term of accountabilityViolations) {
          if (combined.includes(term)) {
            return {
              violation: true,
              flag: false,
              concern: `Decision undermines accountability mechanisms: "${term}"`,
            };
          }
        }
        break;
      }
    }

    return { violation: false, flag: false, concern: "" };
  }
}

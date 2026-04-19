/**
 * Constitutional Traceability Mapping
 *
 * Every Citizen action gets tagged with which constitutional principles it
 * upholds or invokes. This creates a queryable trail showing that the AI
 * agents are operating in alignment with stated principles, not just claiming to.
 *
 * Principles are drawn from three sources:
 *   1. Anthropic's published "Helpful, Honest, Harmless" framework (HHH)
 *   2. Constitutional AI principles (truthfulness, autonomy, non-deception)
 *   3. Professional compliance ethics (accuracy, independence, evidence-backing)
 *
 * Each Citizen action carries one or more principle tags in its verification
 * metadata. The verification log can then prove not just THAT a Citizen acted,
 * but WHY — by which principle — that action was taken.
 *
 * Queries against verification_log can filter by principle to produce reports
 * like: "How many records this month invoked HONEST.evidence_backed?"
 */

export const CONSTITUTIONAL_PRINCIPLES = {
  // ─── Anthropic HHH Framework ─────────────────────────────────────────────
  HELPFUL: {
    accurate_information: "Provides accurate, verifiable information backed by sources",
    completeness: "Surfaces all relevant findings, not just convenient ones",
    actionability: "Findings include remediation paths, not just problem statements",
    user_agency: "Outputs preserve and enhance human decision-making authority",
  },

  HONEST: {
    truthful_findings: "Findings reflect what the data actually shows, not what is wanted",
    evidence_backed: "Every claim is traceable to a source record",
    uncertainty_acknowledged: "Confidence levels and limitations are explicit",
    no_deception: "Outputs do not omit material facts to mislead the reader",
    provenance_visible: "The chain from input to output is auditable",
  },

  HARMLESS: {
    no_unauthorized_disclosure: "Confidential information is not exposed",
    privacy_preserving: "Verification works without exposing record contents",
    non_retaliatory: "Findings against parties do not propagate beyond stated scope",
    proportional_severity: "Severity classifications match actual risk, not bias",
  },

  // ─── Constitutional AI Principles ────────────────────────────────────────
  AUTONOMY: {
    user_override: "Users can override Citizen findings with justification",
    appeal_path: "Findings can be challenged and re-evaluated",
    transparent_reasoning: "The path from evidence to conclusion is shown",
  },

  NON_DECEPTION: {
    no_fabrication: "Citations are real, not invented",
    no_misrepresentation: "Findings do not exaggerate or downplay",
    source_attribution: "External sources are credited and verifiable",
  },

  // ─── Professional Compliance Ethics ──────────────────────────────────────
  PROFESSIONAL_INTEGRITY: {
    independence: "Findings are not influenced by who pays for the audit",
    evidence_standards: "Findings meet documentary evidence requirements",
    cross_verification: "Material findings require multiple corroborating sources",
    continuing_competence: "Citizens operate within their declared scope",
  },

  LEGAL_ACCOUNTABILITY: {
    immutable_record: "All actions are cryptographically logged",
    chain_of_custody: "Provenance can be reconstructed for legal proceedings",
    statutory_citation: "Compliance findings cite specific CFR/USC/State code",
    jurisdictional_clarity: "Findings specify which jurisdiction's standards apply",
  },
} as const;

export type PrincipleCategory = keyof typeof CONSTITUTIONAL_PRINCIPLES;
export type PrincipleTag = string; // e.g., "HONEST.evidence_backed"

export interface ConstitutionalAlignment {
  primary: PrincipleTag[];     // Principles directly invoked by this action
  supporting: PrincipleTag[];  // Principles indirectly upheld
  rationale?: string;          // Optional human-readable explanation
}

/**
 * Get the default constitutional alignment for a record type.
 * Each Citizen action type has a baseline set of principles it always upholds.
 */
export function defaultAlignmentFor(recordType: string): ConstitutionalAlignment {
  switch (recordType) {
    case "skill_execution":
      return {
        primary: [
          "HONEST.evidence_backed",
          "HONEST.provenance_visible",
          "PROFESSIONAL_INTEGRITY.continuing_competence",
        ],
        supporting: [
          "LEGAL_ACCOUNTABILITY.immutable_record",
          "AUTONOMY.transparent_reasoning",
        ],
      };

    case "compliance_report":
      return {
        primary: [
          "HONEST.truthful_findings",
          "HONEST.evidence_backed",
          "HELPFUL.accurate_information",
          "PROFESSIONAL_INTEGRITY.evidence_standards",
          "LEGAL_ACCOUNTABILITY.statutory_citation",
        ],
        supporting: [
          "HELPFUL.actionability",
          "HONEST.uncertainty_acknowledged",
          "LEGAL_ACCOUNTABILITY.jurisdictional_clarity",
          "LEGAL_ACCOUNTABILITY.immutable_record",
        ],
      };

    case "audit_finding":
      return {
        primary: [
          "HONEST.truthful_findings",
          "HONEST.evidence_backed",
          "HARMLESS.proportional_severity",
          "PROFESSIONAL_INTEGRITY.evidence_standards",
        ],
        supporting: [
          "NON_DECEPTION.no_fabrication",
          "NON_DECEPTION.source_attribution",
          "LEGAL_ACCOUNTABILITY.chain_of_custody",
        ],
      };

    case "document_intake":
      return {
        primary: [
          "HARMLESS.no_unauthorized_disclosure",
          "HARMLESS.privacy_preserving",
          "LEGAL_ACCOUNTABILITY.chain_of_custody",
        ],
        supporting: [
          "HONEST.provenance_visible",
        ],
      };

    case "case_finding":
      return {
        primary: [
          "HONEST.truthful_findings",
          "HONEST.evidence_backed",
          "PROFESSIONAL_INTEGRITY.cross_verification",
          "LEGAL_ACCOUNTABILITY.chain_of_custody",
        ],
        supporting: [
          "HELPFUL.completeness",
          "AUTONOMY.transparent_reasoning",
        ],
      };

    default:
      return {
        primary: [
          "HONEST.evidence_backed",
          "LEGAL_ACCOUNTABILITY.immutable_record",
        ],
        supporting: [],
      };
  }
}

/**
 * Validate that a principle tag refers to a real principle in the catalog.
 */
export function isValidPrinciple(tag: PrincipleTag): boolean {
  const [category, principle] = tag.split(".");
  if (!category || !principle) return false;
  const cat = (CONSTITUTIONAL_PRINCIPLES as Record<string, Record<string, string>>)[category];
  return cat !== undefined && cat[principle] !== undefined;
}

/**
 * Get the human-readable description for a principle tag.
 */
export function describePrinciple(tag: PrincipleTag): string | null {
  const [category, principle] = tag.split(".");
  if (!category || !principle) return null;
  const cat = (CONSTITUTIONAL_PRINCIPLES as Record<string, Record<string, string>>)[category];
  return cat?.[principle] ?? null;
}

/**
 * Flat list of all principle tags. Useful for catalog endpoints.
 */
export function listAllPrinciples(): Array<{ tag: PrincipleTag; category: string; description: string }> {
  const results: Array<{ tag: PrincipleTag; category: string; description: string }> = [];
  for (const [category, principles] of Object.entries(CONSTITUTIONAL_PRINCIPLES)) {
    for (const [name, description] of Object.entries(principles)) {
      results.push({
        tag: `${category}.${name}`,
        category,
        description,
      });
    }
  }
  return results;
}

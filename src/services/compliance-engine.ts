import type { Client, USState, BusinessEntityType } from "../types/client.js";
import type {
  ComplianceRule,
  ComplianceCheckResult,
} from "../types/compliance.js";
import {
  ComplianceStatus,
  ComplianceLevel,
  ComplianceRuleCategory,
} from "../types/compliance.js";
import type { ComplianceEvidence, AutomatedCheck } from "../types/evidence.js";
import { EvidenceType, EvidenceStatus, AutomatedCheckType } from "../types/evidence.js";

/**
 * Evidence store interface — what the engine needs from the database layer.
 */
export interface EvidenceStore {
  getEvidenceForClient(clientId: string): Promise<ComplianceEvidence[]>;
  getEvidenceForRule(clientId: string, ruleId: string): Promise<ComplianceEvidence[]>;
  getAutomatedChecks(clientId: string): Promise<AutomatedCheck[]>;
}

/**
 * Rule-to-evidence mapping: which evidence types can satisfy which rule categories.
 */
const CATEGORY_EVIDENCE_MAP: Record<ComplianceRuleCategory, {
  acceptedDocTypes: string[];
  automatedChecks: AutomatedCheckType[];
  attestationAccepted: boolean;
}> = {
  [ComplianceRuleCategory.FORMATION]: {
    acceptedDocTypes: ["ARTICLES_OF_INCORPORATION", "OPERATING_AGREEMENT", "BYLAWS"],
    automatedChecks: [AutomatedCheckType.BUSINESS_REGISTRATION_LOOKUP],
    attestationAccepted: false,
  },
  [ComplianceRuleCategory.TAXATION]: {
    acceptedDocTypes: ["EIN_LETTER", "TAX_RETURN", "W9"],
    automatedChecks: [],
    attestationAccepted: false,
  },
  [ComplianceRuleCategory.EMPLOYMENT]: {
    acceptedDocTypes: ["EMPLOYEE_HANDBOOK", "ANTI_HARASSMENT_POLICY", "TRAINING_RECORD"],
    automatedChecks: [],
    attestationAccepted: true,
  },
  [ComplianceRuleCategory.LICENSING]: {
    acceptedDocTypes: ["BUSINESS_LICENSE", "COMPLIANCE_CERTIFICATE"],
    automatedChecks: [AutomatedCheckType.BUSINESS_REGISTRATION_LOOKUP],
    attestationAccepted: false,
  },
  [ComplianceRuleCategory.REPORTING]: {
    acceptedDocTypes: ["ANNUAL_REPORT", "BOI_REPORT", "FINANCIAL_STATEMENT"],
    automatedChecks: [],
    attestationAccepted: true,
  },
  [ComplianceRuleCategory.PRIVACY]: {
    acceptedDocTypes: ["PRIVACY_POLICY", "DATA_PROCESSING_AGREEMENT"],
    automatedChecks: [
      AutomatedCheckType.PRIVACY_POLICY_EXISTS,
      AutomatedCheckType.COOKIE_CONSENT,
    ],
    attestationAccepted: true,
  },
  [ComplianceRuleCategory.INSURANCE]: {
    acceptedDocTypes: ["INSURANCE_CERTIFICATE"],
    automatedChecks: [],
    attestationAccepted: false,
  },
  [ComplianceRuleCategory.ENVIRONMENTAL]: {
    acceptedDocTypes: ["ENVIRONMENTAL_PERMIT"],
    automatedChecks: [],
    attestationAccepted: true,
  },
  [ComplianceRuleCategory.ACCESSIBILITY]: {
    acceptedDocTypes: ["ACCESSIBILITY_AUDIT"],
    automatedChecks: [AutomatedCheckType.ACCESSIBILITY_BASIC],
    attestationAccepted: true,
  },
  [ComplianceRuleCategory.CORPORATE_GOVERNANCE]: {
    acceptedDocTypes: [
      "MEETING_MINUTES", "RESOLUTION", "BYLAWS", "OPERATING_AGREEMENT",
      "WHISTLEBLOWER_POLICY", "RECORD_RETENTION_POLICY",
    ],
    automatedChecks: [],
    attestationAccepted: true,
  },
  [ComplianceRuleCategory.INDUSTRY_SPECIFIC]: {
    acceptedDocTypes: [
      "SOC2_REPORT", "PENETRATION_TEST", "COMPLIANCE_CERTIFICATE",
      "SAFETY_PLAN", "AUDIT_REPORT",
    ],
    automatedChecks: [],
    attestationAccepted: true,
  },
};

/**
 * Rules that can be auto-verified by checking the client's website.
 */
const AUTO_VERIFIABLE_RULES: Record<string, AutomatedCheckType[]> = {
  "FED-PRIV-001": [AutomatedCheckType.PRIVACY_POLICY_EXISTS],
  "FED-PRIV-002": [AutomatedCheckType.COOKIE_CONSENT],
  "FED-ACC-001": [AutomatedCheckType.ACCESSIBILITY_BASIC],
  "CA-PRIV-001": [AutomatedCheckType.PRIVACY_POLICY_EXISTS],
  "CA-PRIV-002": [AutomatedCheckType.PRIVACY_POLICY_EXISTS],
};

/**
 * ComplianceEngine — Core business logic for compliance checking.
 * Evaluates clients against applicable federal and state rules
 * using three tiers of evidence: self-attestation, automated checks,
 * and document-backed proof.
 */
export class ComplianceEngine {
  private rules: ComplianceRule[] = [];
  private evidence: ComplianceEvidence[] = [];
  private automatedChecks: AutomatedCheck[] = [];
  private evidenceStore: EvidenceStore | null = null;

  /**
   * Load rules into the engine. In production this pulls from D1.
   */
  loadRules(rules: ComplianceRule[]): void {
    this.rules = rules;
  }

  /**
   * Load evidence for evaluation. Call before checkCompliance.
   */
  loadEvidence(evidence: ComplianceEvidence[]): void {
    this.evidence = evidence;
  }

  /**
   * Load automated check results. Call before checkCompliance.
   */
  loadAutomatedChecks(checks: AutomatedCheck[]): void {
    this.automatedChecks = checks;
  }

  /**
   * Set the evidence store for async evidence lookups.
   */
  setEvidenceStore(store: EvidenceStore): void {
    this.evidenceStore = store;
  }

  /**
   * Run a full compliance check for a client across multiple states.
   * Now evaluates against actual evidence.
   */
  async checkComplianceWithEvidence(
    client: Client,
    states: USState[]
  ): Promise<ComplianceCheckResult[]> {
    // Load evidence from store if available
    if (this.evidenceStore) {
      this.evidence = await this.evidenceStore.getEvidenceForClient(client.id);
      this.automatedChecks = await this.evidenceStore.getAutomatedChecks(client.id);
    }

    const results: ComplianceCheckResult[] = [];

    const federalRules = this.rules.filter(
      (r) =>
        r.level === ComplianceLevel.FEDERAL &&
        r.entityTypes.includes(client.entityType)
    );

    for (const rule of federalRules) {
      results.push(this.evaluateRule(client, rule));
    }

    for (const state of states) {
      const stateRules = this.getRulesForState(state, client.entityType);
      for (const rule of stateRules) {
        results.push(this.evaluateRule(client, rule));
      }
    }

    return results;
  }

  /**
   * Synchronous version for backward compatibility.
   */
  checkCompliance(
    client: Client,
    states: USState[]
  ): ComplianceCheckResult[] {
    const results: ComplianceCheckResult[] = [];

    const federalRules = this.rules.filter(
      (r) =>
        r.level === ComplianceLevel.FEDERAL &&
        r.entityTypes.includes(client.entityType)
    );

    for (const rule of federalRules) {
      results.push(this.evaluateRule(client, rule));
    }

    for (const state of states) {
      const stateRules = this.getRulesForState(state, client.entityType);
      for (const rule of stateRules) {
        results.push(this.evaluateRule(client, rule));
      }
    }

    return results;
  }

  /**
   * Get all rules applicable to a specific state and entity type.
   */
  getRulesForState(
    state: USState,
    entityType: BusinessEntityType
  ): ComplianceRule[] {
    return this.rules.filter(
      (rule) =>
        rule.level === ComplianceLevel.STATE &&
        rule.state === state &&
        rule.entityTypes.includes(entityType)
    );
  }

  /**
   * Evaluate a single compliance rule against a client.
   * Three-tier evaluation:
   *   1. Document-backed proof (strongest)
   *   2. Automated platform checks (verifiable)
   *   3. Self-attestation (accepted for eligible categories)
   *
   * Falls back to NEEDS_REVIEW only when no evidence exists.
   */
  evaluateRule(
    client: Client,
    rule: ComplianceRule
  ): ComplianceCheckResult {
    // Check if the rule applies to this entity type
    if (!rule.entityTypes.includes(client.entityType)) {
      return {
        ruleId: rule.id,
        status: ComplianceStatus.NOT_APPLICABLE,
        details: `Rule ${rule.code} does not apply to ${client.entityType} entities`,
        remediation: "No action required",
      };
    }

    // Check if the rule's effective date is in the future
    const effectiveDate = new Date(rule.effectiveDate);
    const now = new Date();

    if (effectiveDate > now) {
      return {
        ruleId: rule.id,
        status: ComplianceStatus.NEEDS_REVIEW,
        details: `Rule ${rule.code} takes effect on ${rule.effectiveDate} — review required before deadline`,
        remediation: `Review ${rule.title} requirements and prepare for compliance by ${rule.effectiveDate}`,
        deadline: rule.effectiveDate,
      };
    }

    // Get evidence for this specific rule
    const ruleEvidence = this.evidence.filter(
      (e) => e.ruleId === rule.id && e.clientId === client.id
    );

    // Also check evidence mapped by rule code (broader match)
    const codeEvidence = this.evidence.filter(
      (e) => e.ruleCode === rule.code && e.clientId === client.id
    );

    const allEvidence = deduplicateEvidence([...ruleEvidence, ...codeEvidence]);

    // TIER 1: Document-backed proof (strongest evidence)
    const docEvidence = allEvidence.filter(
      (e) => e.evidenceType === EvidenceType.DOCUMENT &&
             (e.status === EvidenceStatus.VERIFIED || e.status === EvidenceStatus.SUBMITTED)
    );

    if (docEvidence.length > 0) {
      const verified = docEvidence.filter((e) => e.status === EvidenceStatus.VERIFIED);
      if (verified.length > 0) {
        // Check expiration
        const validDocs = verified.filter((e) => !isExpired(e));
        if (validDocs.length > 0) {
          return {
            ruleId: rule.id,
            status: ComplianceStatus.COMPLIANT,
            details: `Rule ${rule.code}: Verified by ${validDocs.length} document(s) — ${validDocs.map((d) => d.title).join(", ")}`,
            remediation: "Maintain current documentation and review before expiration",
          };
        }
        // Documents exist but expired
        return {
          ruleId: rule.id,
          status: ComplianceStatus.NON_COMPLIANT,
          details: `Rule ${rule.code}: Documentation expired — ${verified.map((d) => d.title).join(", ")}`,
          remediation: `Renew or update expired documentation for ${rule.title}`,
          deadline: verified[0]?.expiresAt || undefined,
        };
      }
      // Documents submitted but not yet verified
      return {
        ruleId: rule.id,
        status: ComplianceStatus.NEEDS_REVIEW,
        details: `Rule ${rule.code}: ${docEvidence.length} document(s) submitted, pending verification`,
        remediation: "Documents are under review. No further action required at this time.",
      };
    }

    // TIER 2: Automated platform checks
    const categoryMap = CATEGORY_EVIDENCE_MAP[rule.category];
    const autoEvidence = allEvidence.filter(
      (e) => e.evidenceType === EvidenceType.AUTOMATED_CHECK &&
             (e.status === EvidenceStatus.VERIFIED || e.status === EvidenceStatus.SUBMITTED)
    );

    // Also check automated_checks directly by type
    const relevantAutoChecks = this.automatedChecks.filter((check) => {
      if (!categoryMap) return false;
      return categoryMap.automatedChecks.includes(check.checkType as AutomatedCheckType);
    });

    if (autoEvidence.length > 0 || relevantAutoChecks.length > 0) {
      const passingChecks = relevantAutoChecks.filter((c) => c.result === "PASS");
      const failingChecks = relevantAutoChecks.filter((c) => c.result === "FAIL");

      if (passingChecks.length > 0 && failingChecks.length === 0) {
        return {
          ruleId: rule.id,
          status: ComplianceStatus.COMPLIANT,
          details: `Rule ${rule.code}: Passed ${passingChecks.length} automated check(s) — ${passingChecks.map((c) => c.checkType).join(", ")}`,
          remediation: "Continue maintaining current configuration",
        };
      }

      if (failingChecks.length > 0) {
        return {
          ruleId: rule.id,
          status: ComplianceStatus.NON_COMPLIANT,
          details: `Rule ${rule.code}: Failed automated check(s) — ${failingChecks.map((c) => `${c.checkType}: ${c.details}`).join("; ")}`,
          remediation: remediationForCategory(rule.category),
        };
      }

      // Auto evidence submitted but checks not yet run
      if (autoEvidence.length > 0) {
        return {
          ruleId: rule.id,
          status: ComplianceStatus.NEEDS_REVIEW,
          details: `Rule ${rule.code}: Automated verification pending`,
          remediation: "Automated checks will be executed. No action required.",
        };
      }
    }

    // TIER 3: Self-attestation (accepted for eligible categories only)
    const attestEvidence = allEvidence.filter(
      (e) => e.evidenceType === EvidenceType.SELF_ATTESTATION &&
             (e.status === EvidenceStatus.VERIFIED || e.status === EvidenceStatus.SUBMITTED)
    );

    if (attestEvidence.length > 0 && categoryMap?.attestationAccepted) {
      const validAttestations = attestEvidence.filter((e) => !isExpired(e));
      if (validAttestations.length > 0) {
        return {
          ruleId: rule.id,
          status: ComplianceStatus.COMPLIANT,
          details: `Rule ${rule.code}: Self-attested by ${validAttestations[0]?.attestedBy || "unknown"} on ${validAttestations[0]?.attestedAt || "unknown"}. Attestation accepted for ${rule.category} category.`,
          remediation: "Maintain attestation records. Strengthen with document-backed evidence when available.",
        };
      }
      // Attestation expired
      return {
        ruleId: rule.id,
        status: ComplianceStatus.NON_COMPLIANT,
        details: `Rule ${rule.code}: Self-attestation expired`,
        remediation: `Re-attest compliance with ${rule.title} or provide document-backed evidence`,
      };
    }

    // Self-attestation exists but not accepted for this category
    if (attestEvidence.length > 0 && categoryMap && !categoryMap.attestationAccepted) {
      return {
        ruleId: rule.id,
        status: ComplianceStatus.NEEDS_REVIEW,
        details: `Rule ${rule.code}: Self-attestation not sufficient for ${rule.category} rules. Document-backed proof required.`,
        remediation: `Provide ${categoryMap.acceptedDocTypes.join(" or ")} to verify compliance with ${rule.title}`,
      };
    }

    // NO EVIDENCE: Determine the right status based on rule category
    return {
      ruleId: rule.id,
      status: ComplianceStatus.NEEDS_REVIEW,
      details: `Rule ${rule.code}: ${rule.title} — no compliance evidence on file`,
      remediation: buildRemediation(rule),
    };
  }
}

/**
 * Check if evidence has expired.
 */
function isExpired(evidence: ComplianceEvidence): boolean {
  if (!evidence.expiresAt) return false;
  return new Date(evidence.expiresAt) < new Date();
}

/**
 * Deduplicate evidence by ID.
 */
function deduplicateEvidence(evidence: ComplianceEvidence[]): ComplianceEvidence[] {
  const seen = new Set<string>();
  return evidence.filter((e) => {
    if (seen.has(e.id)) return false;
    seen.add(e.id);
    return true;
  });
}

/**
 * Build specific remediation guidance based on rule category and what evidence is accepted.
 */
function buildRemediation(rule: ComplianceRule): string {
  const categoryMap = CATEGORY_EVIDENCE_MAP[rule.category];
  if (!categoryMap) return remediationForCategory(rule.category);

  const options: string[] = [];

  if (categoryMap.acceptedDocTypes.length > 0) {
    options.push(`Upload: ${categoryMap.acceptedDocTypes.join(", ")}`);
  }

  if (categoryMap.automatedChecks.length > 0) {
    options.push(`Auto-verify: ${categoryMap.automatedChecks.join(", ")}`);
  }

  if (categoryMap.attestationAccepted) {
    options.push("Self-attest compliance (authorized personnel)");
  }

  return `To satisfy ${rule.code} (${rule.title}), provide one of: ${options.join(" | ")}`;
}

function remediationForCategory(category: ComplianceRuleCategory): string {
  const remediations: Record<ComplianceRuleCategory, string> = {
    [ComplianceRuleCategory.FORMATION]:
      "Verify entity formation documents are filed and current in all registered states",
    [ComplianceRuleCategory.TAXATION]:
      "Confirm tax registrations and filing obligations are met for all applicable jurisdictions",
    [ComplianceRuleCategory.EMPLOYMENT]:
      "Review employment law compliance including wage/hour, anti-discrimination, and benefits requirements",
    [ComplianceRuleCategory.LICENSING]:
      "Verify all required business licenses and permits are obtained and current",
    [ComplianceRuleCategory.REPORTING]:
      "Confirm all required periodic reports (annual reports, BOI, etc.) are filed on time",
    [ComplianceRuleCategory.PRIVACY]:
      "Review data privacy obligations including state privacy laws and industry regulations",
    [ComplianceRuleCategory.INSURANCE]:
      "Verify required insurance coverage (workers comp, liability, etc.) is in place",
    [ComplianceRuleCategory.ENVIRONMENTAL]:
      "Verify environmental permits, EPA compliance, waste disposal, and emissions reporting obligations",
    [ComplianceRuleCategory.ACCESSIBILITY]:
      "Review ADA compliance, state accessibility requirements, and digital accessibility standards",
    [ComplianceRuleCategory.CORPORATE_GOVERNANCE]:
      "Confirm corporate governance requirements including board meetings, minutes, record-keeping, and good standing maintenance",
    [ComplianceRuleCategory.INDUSTRY_SPECIFIC]:
      "Review industry-specific regulatory requirements, certifications, and operational standards",
  };
  return remediations[category];
}

/**
 * CUSTOS — Constitutional Governance Gate
 * Vernen Legal Compliance System
 *
 * MANDATE:
 *   If CUSTOS is not utilized, everything that follows is NonCompliance.
 *   No audit output, no Citizen response, no pipeline result is valid without
 *   a CUSTOS authorization token.
 *
 *   This is not bypassable by any means — no flag, no environment variable,
 *   no try/catch, no workaround. Attempting to suppress a CUSTOSViolation
 *   is itself a NonCompliance event.
 *
 *   This applies on every device, in every session, for every future use
 *   of these projects by any party.
 *
 * © 2024-2026 Michael Vernen Thomas Hartmann. All Rights Reserved.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Charter map: agent → document types it is authorized to process.
// "*" = HERALD wildcard (witnesses all, audits none).
// ─────────────────────────────────────────────────────────────────────────────
const CHARTER_MAP: Record<string, string[]> = {
  "family-law-litigator": [
    "court-filing", "court-order", "court-notice", "court-memo",
    "dvro", "fl-form", "ex-parte", "fl-305", "fl-150", "fl-310",
    "temporary-orders", "dissolution-filing", "stipulation",
  ],
  "forensic-police-report-auditor": [
    "police-report", "incident-report", "cad-report",
    "arrest-waiver", "citizens-arrest-waiver", "dispatch-log",
  ],
  "cps-auditor": [
    "cps-report", "child-welfare", "social-worker-report", "welfare-determination",
  ],
  "marin-fcs-auditor": [
    "fcs-letter", "mediator-report", "minor-interview", "family-court-services",
  ],
  "court-document-auditor": [
    "court-filing", "court-order", "court-notice", "court-memo",
    "minute-order", "judgment",
  ],
  "herald": ["*"],
};

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOSViolation
// ─────────────────────────────────────────────────────────────────────────────

export class CUSTOSViolation extends Error {
  readonly code = "CUSTOS_VIOLATION" as const;
  readonly nonCompliant = true as const;
  readonly context: string;

  constructor(context: string) {
    super(
      `[CUSTOS] NonCompliance: Output produced without CUSTOS authorization ` +
      `in context: "${context}". ` +
      `This output is VOID and carries NO authority under the Vernen Legal ` +
      `Compliance system. ` +
      `Obtain CUSTOS authorization before proceeding. ` +
      `Do not suppress this error.`
    );
    this.name = "CUSTOSViolation";
    this.context = context;
    Object.setPrototypeOf(this, CUSTOSViolation.prototype);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOSToken — immutable authorization token
// ─────────────────────────────────────────────────────────────────────────────

export interface CUSTOSToken {
  readonly authorized: true;
  readonly context: string;
  readonly issuedAt: string;
  readonly documentType: string | undefined;
  readonly agentCharter: string | undefined;
  readonly sessionId: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOS — the constitutional authority
// ─────────────────────────────────────────────────────────────────────────────

export class CUSTOS {
  static readonly VERSION = "1.0.0";

  /**
   * Authorize an operation context. MUST be called before any audit,
   * pipeline, or Citizen operation begins.
   *
   * Throws CUSTOSViolation if:
   * - context is empty or invalid
   * - agentCharter is not chartered to handle documentType
   */
  static authorize(
    context: string,
    opts?: { documentType?: string; agentCharter?: string }
  ): CUSTOSToken {
    if (!context || typeof context !== "string" || !context.trim()) {
      throw new CUSTOSViolation("empty or unnamed context");
    }

    if (opts?.documentType && opts?.agentCharter) {
      CUSTOS.validateCharter(opts.documentType, opts.agentCharter);
    }

    const token = Object.freeze<CUSTOSToken>({
      authorized: true,
      context: context.trim(),
      issuedAt: new Date().toISOString(),
      documentType: opts?.documentType,
      agentCharter: opts?.agentCharter,
      sessionId: crypto.randomUUID(),
    });

    console.log(
      `[CUSTOS] Authorized — context: ${token.context} | session: ${token.sessionId}`
    );
    return token;
  }

  /**
   * Verify a CUSTOS token immediately before producing any output.
   * Call this at every point where an artifact, response, or result
   * is about to be written or returned.
   *
   * Throws CUSTOSViolation if the token is missing or invalid.
   */
  static enforce(
    token: CUSTOSToken | null | undefined,
    context: string
  ): void {
    if (!token || token.authorized !== true) {
      throw new CUSTOSViolation(context);
    }
  }

  /**
   * Build a hard 403 NonCompliance HTTP response.
   * Used by API handlers when a CUSTOSViolation is caught at the boundary.
   * The error still propagates internally — this is only for the HTTP response.
   */
  static nonComplianceResponse(violation: CUSTOSViolation): Response {
    return new Response(
      JSON.stringify({
        error: "CUSTOS_VIOLATION",
        nonCompliant: true,
        message: violation.message,
        context: violation.context,
        remedy:
          "Obtain CUSTOS authorization before invoking this operation. " +
          "No output produced without CUSTOS is valid under the " +
          "Vernen Legal Compliance system.",
      }),
      {
        status: 403,
        headers: {
          "Content-Type": "application/json",
          "X-Vernen-NonCompliant": "true",
          "X-CUSTOS-Violation": violation.context,
        },
      }
    );
  }

  // ── Private ───────────────────────────────────────────────────────────────

  private static validateCharter(
    documentType: string,
    agentCharter: string
  ): void {
    const allowed = CHARTER_MAP[agentCharter];
    if (!allowed) return; // Unknown charter — new agent, no boundary yet
    if (allowed.includes("*")) return; // Wildcard (HERALD)
    if (!allowed.includes(documentType)) {
      throw new CUSTOSViolation(
        `Agent "${agentCharter}" is not chartered to process document type ` +
        `"${documentType}". ` +
        `Chartered scope: [${allowed.join(", ")}]. ` +
        `Assign the correct agent before proceeding.`
      );
    }
  }
}

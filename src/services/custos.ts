/**
 * CUSTOS — Constitutional Governance Gate
 * Vernen Legal Compliance System (also known as Vernen Legal Compliance, VLC,
 * and Vernen Compliance). This mandate extends in full to CITIZEN, a fork of
 * Vernen: CUSTOS operates natively within CITIZEN at 100% functionability.
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
 * ARCHITECTURE — 7-Layer Trust Stack:
 *   CUSTOS owns Layers 2-7 (structural/physical gate — lightweight, fast).
 *   Industry agents own Layer 1 (S.o.C. — heavyweight, triggered after clearance).
 *
 *   Layer 7 — Output Layer         : Physical/digital presentation standard
 *   Layer 6 — Content Integrity    : Internal consistency, no contradictions
 *   Layer 5 — Temporal Layer       : Timestamps, metadata, sequence of creation
 *   Layer 4 — Authentication Layer : Signatures, stamps, digital handshakes
 *   Layer 3 — Procedural Layer     : Administrative steps required to generate record
 *   Layer 2 — Jurisdictional Layer : Authority/venue where filed or enforced
 *   Layer 1 — Statutory Layer      : S.o.C. — specific law requiring the document
 *                                    (handled by industry-specific agents, not CUSTOS)
 *
 * © 2024-2026 Michael Vernen Thomas Hartmann. All Rights Reserved.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Physical defaults — Universal Template (Layer 7 audit baseline).
// Every value is sourced from an authoritative primary legal source.
// No invented standards. No best-guess values. Source is law.
// ─────────────────────────────────────────────────────────────────────────────

export const PHYSICAL_DEFAULTS = {

  paperSize: {
    // SOURCE: Cal. Rules of Court, Rule 2.103 (eff. Jan. 1, 2007):
    //   "All papers filed must be 8 1/2 by 11 inches. All papers not filed
    //   electronically must be on opaque, unglazed paper, white or unbleached,
    //   of standard quality not less than 20-pound weight."
    //   https://courts.ca.gov/cms/rules/index.cfm?title=two&linkid=rule2_103
    //
    // SOURCE (Federal Appellate): Fed. R. App. P. 32(a)(4):
    //   "Documents must be on 8 1/2 by 11 inch paper."
    //   https://www.law.cornell.edu/rules/frap/rule_32
    standard: { widthIn: 8.5, heightIn: 11.0, label: "US Letter" },
    // Legal size has no direct CRC mandate — flagged as non-standard for trial courts.
    legal:    { widthIn: 8.5, heightIn: 14.0, label: "US Legal (non-standard for CA trial courts)" },
    tolerancePct: 2,
    paperWeight: {
      minLbs: 20,
      source: "Cal. Rules of Court, Rule 2.103",
    },
    paperColor: {
      accepted: ["white", "unbleached"],
      source: "Cal. Rules of Court, Rule 2.103",
    },
  },

  font: {
    // SOURCE: Cal. Rules of Court, Rule 2.104 (amended Jan. 1, 2017):
    //   "Unless otherwise specified in these rules, all papers filed must be
    //   prepared using a font size not smaller than 12 points."
    //   https://courts.ca.gov/cms/rules/index/two/rule2_104
    //   NOTE: CRC does not mandate a specific font TYPEFACE for trial courts.
    //   Font type restriction applies in appellate context only (see FRAP below).
    //
    // SOURCE (Federal Appellate): Fed. R. App. P. 32(a)(5)(A):
    //   "A proportionally spaced face must be 14-point or larger" and
    //   "must include serifs, but sans-serif type may be used in headings."
    //   https://www.law.cornell.edu/rules/frap/rule_32
    //
    // SOURCE (Federal Appellate style): Fed. R. App. P. 32(a)(6):
    //   "Documents must be set in a plain, roman style."
    bodyPtMinCA: 12,          // Cal. Rules of Court, Rule 2.104
    bodyPtMinFedAppellate: 14, // Fed. R. App. P. 32(a)(5)(A)
    typeRestriction: {
      applies: "federal-appellate-only",
      requirement: "proportionally spaced with serifs; sans-serif permitted in headings only",
      source: "Fed. R. App. P. 32(a)(5)(A), 32(a)(6)",
    },
    note: "CRC mandates minimum 12pt for all CA trial court filings. No typeface mandate at trial level.",
  },

  margins: {
    // SOURCE: Cal. Rules of Court, Rule 2.107 (eff. Jan. 1, 2007):
    //   "The left margin of each page must be at least one inch from the left edge
    //   and the right margin at least 1/2 inch from the right edge."
    //   https://courts.ca.gov/cms/rules/index/two/rule2_107
    //
    // SOURCE (Federal Appellate): Fed. R. App. P. 32(a)(4):
    //   "Margins must be at least one inch on all four sides."
    //   https://www.law.cornell.edu/rules/frap/rule_32
    caTrialCourt: {
      leftMinIn: 1.0,
      rightMinIn: 0.5,
      topMinIn: null,   // CRC 2.107 does not specify top/bottom minimums
      bottomMinIn: null,
      source: "Cal. Rules of Court, Rule 2.107",
    },
    fedAppellate: {
      allSidesMinIn: 1.0,
      source: "Fed. R. App. P. 32(a)(4)",
    },
    tolerancePct: 5,
    note: "CA trial court right margin is 0.5 inch — not 1 inch. Do not apply federal standard to state filings.",
  },

  lineSpacing: {
    // SOURCE: Cal. Rules of Court, Rule 2.108(1) (amended Jan. 1, 2016):
    //   "The lines on each page must be one and one-half spaced or double-spaced
    //   and numbered consecutively."
    //   Exceptions: descriptions of real property (single-spaced, Rule 2.108(2));
    //   footnotes and quotations (single-spaced, Rule 2.108(3)).
    //   https://courts.ca.gov/cms/rules/index/two/rule2_108
    //
    // SOURCE (Federal Appellate): Fed. R. App. P. 32(a)(4):
    //   "The text must be double-spaced, but quotations more than two lines long
    //   may be indented and single-spaced. Headings and footnotes may be single-spaced."
    //   https://www.law.cornell.edu/rules/frap/rule_32
    caTrialCourt: {
      accepted: [1.5, 2.0],
      exceptionsAllowSingleSpaced: ["real property descriptions", "footnotes", "quotations", "corporate surety bond forms"],
      source: "Cal. Rules of Court, Rule 2.108",
    },
    fedAppellate: {
      required: 2.0,
      exceptionsAllowSingleSpaced: ["quotations over two lines", "headings", "footnotes"],
      source: "Fed. R. App. P. 32(a)(4)",
    },
  },

  lineNumbering: {
    // SOURCE: Cal. Rules of Court, Rule 2.108(4):
    //   "Line numbers must be placed at the left margin and separated from the text
    //   by a vertical column of space at least 1/5 inch wide or a single or double
    //   vertical line. Each line number must be aligned with a line of type...
    //   There must be at least three line numbers for every vertical inch on the page."
    //   https://courts.ca.gov/cms/rules/index/two/rule2_108
    required: true,
    minPerVerticalInch: 3,
    separatorMinIn: 0.2,  // 1/5 inch
    source: "Cal. Rules of Court, Rule 2.108(4)",
    appliesTo: "CA trial courts",
  },

  oneSidedPaper: {
    // SOURCE: Cal. Rules of Court, Rule 2.102 (eff. Jan. 1, 2007):
    //   "When papers are not filed electronically, only one side of each page may be used."
    //   https://www.courts.ca.gov/cms/rules/index.cfm?title=two&linkid=rule2_102
    required: true,
    appliesTo: "non-electronic CA trial court filings",
    source: "Cal. Rules of Court, Rule 2.102",
  },

  digitalSignature: {
    // SOURCE: Cal. Gov. Code § 16.5:
    //   A digital signature must be: (1) unique to the person using it,
    //   (2) capable of verification, (3) under the sole control of the person using it,
    //   (4) linked to data in such a manner that if the data are changed the digital
    //   signature is invalidated, (5) conform to regulations adopted by the Secretary of State.
    //   https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=16.5.&lawCode=GOV
    requirements: [
      "unique to the person using it",
      "capable of verification",
      "under the sole control of the person using it",
      "linked to data such that alteration invalidates the signature",
      "conforms to CA Secretary of State regulations",
    ],
    source: "Cal. Gov. Code § 16.5",
    note: "Use is optional per § 16.5 — no public entity required to accept unless adopted policy.",
  },

} as const;

// ─────────────────────────────────────────────────────────────────────────────
// NAICS routing map — document type → industry agent after CUSTOS clearance.
// CUSTOS routes; industry agents audit Layer 1 (S.o.C.).
// ─────────────────────────────────────────────────────────────────────────────

export const NAICS_ROUTING: Record<string, { naics: string; sector: string; agent: string }> = {
  // NAICS 92 — Public Administration
  "police-report":          { naics: "922120", sector: "Public Administration", agent: "forensic-police-report-auditor" },
  "incident-report":        { naics: "922120", sector: "Public Administration", agent: "forensic-police-report-auditor" },
  "cad-report":             { naics: "922120", sector: "Public Administration", agent: "forensic-police-report-auditor" },
  "arrest-waiver":          { naics: "922120", sector: "Public Administration", agent: "forensic-police-report-auditor" },
  "dispatch-log":           { naics: "922120", sector: "Public Administration", agent: "forensic-police-report-auditor" },
  // NAICS 92 — Courts
  "court-filing":           { naics: "922110", sector: "Courts", agent: "court-document-auditor" },
  "court-order":            { naics: "922110", sector: "Courts", agent: "court-document-auditor" },
  "court-notice":           { naics: "922110", sector: "Courts", agent: "court-document-auditor" },
  "court-memo":             { naics: "922110", sector: "Courts", agent: "court-document-auditor" },
  "minute-order":           { naics: "922110", sector: "Courts", agent: "court-document-auditor" },
  "judgment":               { naics: "922110", sector: "Courts", agent: "court-document-auditor" },
  // NAICS 92 — Family Law
  "dvro":                   { naics: "922110", sector: "Family Law Courts", agent: "family-law-litigator" },
  "fl-form":                { naics: "922110", sector: "Family Law Courts", agent: "family-law-litigator" },
  "ex-parte":               { naics: "922110", sector: "Family Law Courts", agent: "family-law-litigator" },
  "fl-305":                 { naics: "922110", sector: "Family Law Courts", agent: "family-law-litigator" },
  "fl-150":                 { naics: "922110", sector: "Family Law Courts", agent: "family-law-litigator" },
  "fl-310":                 { naics: "922110", sector: "Family Law Courts", agent: "family-law-litigator" },
  "temporary-orders":       { naics: "922110", sector: "Family Law Courts", agent: "family-law-litigator" },
  "dissolution-filing":     { naics: "922110", sector: "Family Law Courts", agent: "family-law-litigator" },
  "stipulation":            { naics: "922110", sector: "Family Law Courts", agent: "family-law-litigator" },
  // NAICS 92 — Child Welfare
  "cps-report":             { naics: "923130", sector: "Child Welfare", agent: "cps-auditor" },
  "child-welfare":          { naics: "923130", sector: "Child Welfare", agent: "cps-auditor" },
  "social-worker-report":   { naics: "923130", sector: "Child Welfare", agent: "cps-auditor" },
  "welfare-determination":  { naics: "923130", sector: "Child Welfare", agent: "cps-auditor" },
  // NAICS 92 — Family Court Services
  "fcs-letter":             { naics: "922110", sector: "Family Court Services", agent: "marin-fcs-auditor" },
  "mediator-report":        { naics: "922110", sector: "Family Court Services", agent: "marin-fcs-auditor" },
  "minor-interview":        { naics: "922110", sector: "Family Court Services", agent: "marin-fcs-auditor" },
  "family-court-services":  { naics: "922110", sector: "Family Court Services", agent: "marin-fcs-auditor" },
  // NAICS 62 — Health Care
  "medical-record":         { naics: "621111", sector: "Health Care", agent: "herald" },
  "disability-evaluation":  { naics: "621111", sector: "Health Care", agent: "herald" },
  // NAICS 52 — Finance & Insurance
  "insurance-policy":       { naics: "524113", sector: "Finance & Insurance", agent: "herald" },
  "financial-statement":    { naics: "521110", sector: "Finance & Insurance", agent: "herald" },
} as const;

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
// Structural examination input — document metadata passed to examine().
// Callers supply what they know; CUSTOS flags what's missing or anomalous.
// ─────────────────────────────────────────────────────────────────────────────

export interface CUSTOSExamInput {
  documentType?: string;
  jurisdiction?: string;
  // Layer 7 — Output (physical presentation)
  pageWidthIn?: number;
  pageHeightIn?: number;
  fontFamily?: string;
  fontSizePt?: number;
  marginTopIn?: number;
  marginBottomIn?: number;
  marginLeftIn?: number;
  marginRightIn?: number;
  lineSpacing?: number;
  // Layer 5 — Temporal
  documentDate?: string;
  filedDate?: string;
  createdAt?: string;
  modifiedAt?: string;
  // Layer 4 — Authentication
  hasSignature?: boolean;
  hasOfficialSeal?: boolean;
  hasNotarization?: boolean;
  signatureCount?: number;
  // Layer 6 — Content Integrity (caller-supplied flags)
  hasInternalContradictions?: boolean;
  contentHashSha256?: string;
}

export interface CUSTOSLayerResult {
  layer: number;
  name: string;
  pass: boolean;
  findings: string[];
}

export interface CUSTOSStructuralExam {
  passed: boolean;
  layers: CUSTOSLayerResult[];
  routedAgent: string;
  naicsCode: string;
  naiicsSector: string;
  redFlags: string[];
  examinedAt: string;
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
  readonly structuralExam?: CUSTOSStructuralExam;
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
    opts?: {
      documentType?: string;
      agentCharter?: string;
      examInput?: CUSTOSExamInput;
    }
  ): CUSTOSToken {
    if (!context || typeof context !== "string" || !context.trim()) {
      throw new CUSTOSViolation("empty or unnamed context");
    }

    if (opts?.documentType && opts?.agentCharter) {
      CUSTOS.validateCharter(opts.documentType, opts.agentCharter);
    }

    // Run structural examination when document metadata is provided
    let structuralExam: CUSTOSStructuralExam | undefined;
    if (opts?.examInput) {
      const examInput = opts.documentType
        ? { ...opts.examInput, documentType: opts.examInput.documentType ?? opts.documentType }
        : opts.examInput;
      structuralExam = CUSTOS.examine(examInput);
      if (!structuralExam.passed) {
        console.warn(
          `[CUSTOS] Structural exam FAILED — ${structuralExam.redFlags.length} red flag(s). ` +
          `Document proceeds under NonCompliance risk. Red flags: ${structuralExam.redFlags.join("; ")}`
        );
      }
    }

    const token = Object.freeze<CUSTOSToken>({
      authorized: true,
      context: context.trim(),
      issuedAt: new Date().toISOString(),
      documentType: opts?.documentType,
      agentCharter: opts?.agentCharter ?? structuralExam?.routedAgent,
      sessionId: crypto.randomUUID(),
      structuralExam,
    });

    console.log(
      `[CUSTOS] Authorized — context: ${token.context} | session: ${token.sessionId}` +
      (structuralExam ? ` | routed → ${structuralExam.routedAgent} | exam: ${structuralExam.passed ? "PASS" : "FAIL"}` : "")
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

  /**
   * Perform the 7-layer structural examination on document metadata.
   * CUSTOS owns Layers 2-7. Layer 1 (S.o.C.) is delegated to the routed agent.
   *
   * This is the structural gate — lightweight, fast, runs before any Citizen
   * receives the document. A failed exam does not throw; it returns a result
   * with passed=false so the caller can decide to block or flag.
   */
  static examine(input: CUSTOSExamInput): CUSTOSStructuralExam {
    const layers: CUSTOSLayerResult[] = [];
    const redFlags: string[] = [];

    // Layer 7 — Output (physical presentation)
    const l7 = CUSTOS._examLayer7(input);
    layers.push(l7);
    redFlags.push(...l7.findings.filter(f => f.startsWith("RED FLAG")));

    // Layer 6 — Content Integrity
    const l6 = CUSTOS._examLayer6(input);
    layers.push(l6);
    redFlags.push(...l6.findings.filter(f => f.startsWith("RED FLAG")));

    // Layer 5 — Temporal
    const l5 = CUSTOS._examLayer5(input);
    layers.push(l5);
    redFlags.push(...l5.findings.filter(f => f.startsWith("RED FLAG")));

    // Layer 4 — Authentication
    const l4 = CUSTOS._examLayer4(input);
    layers.push(l4);
    redFlags.push(...l4.findings.filter(f => f.startsWith("RED FLAG")));

    // Layer 3 — Procedural
    const l3 = CUSTOS._examLayer3(input);
    layers.push(l3);

    // Layer 2 — Jurisdictional
    const l2 = CUSTOS._examLayer2(input);
    layers.push(l2);

    const routing = CUSTOS.route(input.documentType);
    const passed = layers.every(l => l.pass);

    return {
      passed,
      layers,
      routedAgent: routing.agent,
      naicsCode: routing.naics,
      naiicsSector: routing.sector,
      redFlags,
      examinedAt: new Date().toISOString(),
    };
  }

  /**
   * Determine the correct industry agent for a document type.
   * Returns HERALD as the fallback universal witness for unknown types.
   */
  static route(documentType?: string): { agent: string; naics: string; sector: string } {
    if (!documentType) return { agent: "herald", naics: "000000", sector: "Unknown" };
    const match = NAICS_ROUTING[documentType];
    if (match) return match;
    // Unknown type — HERALD witnesses until a chartered agent is assigned
    return { agent: "herald", naics: "000000", sector: "Unclassified" };
  }

  // ── Layer examination — private ────────────────────────────────────────────

  private static _examLayer7(input: CUSTOSExamInput): CUSTOSLayerResult {
    const findings: string[] = [];
    const { paperSize, font, margins, lineSpacing } = PHYSICAL_DEFAULTS;

    // Paper size — CRC Rule 2.103 / FRAP 32(a)(4): 8.5" x 11" required
    if (input.pageWidthIn !== undefined && input.pageHeightIn !== undefined) {
      const isLetter = CUSTOS._within(input.pageWidthIn, paperSize.standard.widthIn, paperSize.tolerancePct) &&
                       CUSTOS._within(input.pageHeightIn, paperSize.standard.heightIn, paperSize.tolerancePct);
      if (!isLetter) {
        findings.push(
          `RED FLAG: Non-standard page size ${input.pageWidthIn}" x ${input.pageHeightIn}". ` +
          `Required: 8.5" x 11" per Cal. Rules of Court, Rule 2.103 and Fed. R. App. P. 32(a)(4).`
        );
      }
    }

    // Font size — CRC Rule 2.104: minimum 12pt for CA trial courts
    // No typeface mandate at CA trial court level (FRAP 32 applies to federal appellate only)
    if (input.fontSizePt !== undefined && input.fontSizePt < font.bodyPtMinCA) {
      findings.push(
        `RED FLAG: Font size ${input.fontSizePt}pt is below the 12pt minimum. ` +
        `Required: minimum 12pt per Cal. Rules of Court, Rule 2.104.`
      );
    }

    // Margins — CRC Rule 2.107: left ≥1.0", right ≥0.5"
    if (input.marginLeftIn !== undefined && input.marginLeftIn < margins.caTrialCourt.leftMinIn) {
      findings.push(
        `RED FLAG: Left margin ${input.marginLeftIn}" is below minimum 1.0". ` +
        `Required: left margin ≥1 inch per Cal. Rules of Court, Rule 2.107.`
      );
    }
    if (input.marginRightIn !== undefined && input.marginRightIn < margins.caTrialCourt.rightMinIn) {
      findings.push(
        `RED FLAG: Right margin ${input.marginRightIn}" is below minimum 0.5". ` +
        `Required: right margin ≥0.5 inch per Cal. Rules of Court, Rule 2.107.`
      );
    }

    // Line spacing — CRC Rule 2.108(1): 1.5 or double-spaced required
    if (input.lineSpacing !== undefined &&
        !(lineSpacing.caTrialCourt.accepted as readonly number[]).includes(input.lineSpacing)) {
      findings.push(
        `Non-standard line spacing ${input.lineSpacing}. ` +
        `Required: 1.5 or double-spaced per Cal. Rules of Court, Rule 2.108(1).`
      );
    }

    return { layer: 7, name: "Output Layer", pass: !findings.some(f => f.startsWith("RED FLAG")), findings };
  }

  private static _examLayer6(input: CUSTOSExamInput): CUSTOSLayerResult {
    const findings: string[] = [];
    if (input.hasInternalContradictions === true) {
      findings.push("RED FLAG: Caller-flagged internal contradictions detected in document content.");
    }
    if (!input.contentHashSha256) {
      findings.push("NOTICE: No content hash provided. Content integrity cannot be independently verified.");
    }
    return { layer: 6, name: "Content Integrity Layer", pass: !findings.some(f => f.startsWith("RED FLAG")), findings };
  }

  private static _examLayer5(input: CUSTOSExamInput): CUSTOSLayerResult {
    const findings: string[] = [];
    if (!input.documentDate) {
      findings.push("NOTICE: No document date provided. Temporal sequence cannot be verified.");
    }
    if (input.modifiedAt && input.createdAt && input.modifiedAt < input.createdAt) {
      findings.push("RED FLAG: Modified date precedes created date — metadata anomaly.");
    }
    if (input.filedDate && input.documentDate && input.filedDate < input.documentDate) {
      findings.push("RED FLAG: Filed date precedes document date — impossible sequence.");
    }
    return { layer: 5, name: "Temporal Layer", pass: !findings.some(f => f.startsWith("RED FLAG")), findings };
  }

  private static _examLayer4(input: CUSTOSExamInput): CUSTOSLayerResult {
    const findings: string[] = [];
    if (input.hasSignature === false) {
      findings.push("RED FLAG: No signature detected. Document may lack authentication.");
    }
    if (input.signatureCount !== undefined && input.signatureCount === 0) {
      findings.push("RED FLAG: Zero signatures on a document that requires authentication.");
    }
    return { layer: 4, name: "Authentication Layer", pass: !findings.some(f => f.startsWith("RED FLAG")), findings };
  }

  private static _examLayer3(input: CUSTOSExamInput): CUSTOSLayerResult {
    const findings: string[] = [];
    if (!input.documentType) {
      findings.push("NOTICE: Document type not declared. Procedural requirements cannot be mapped.");
    }
    return { layer: 3, name: "Procedural Layer", pass: true, findings };
  }

  private static _examLayer2(input: CUSTOSExamInput): CUSTOSLayerResult {
    const findings: string[] = [];
    if (!input.jurisdiction) {
      findings.push("NOTICE: Jurisdiction not declared. Venue requirements cannot be verified.");
    }
    return { layer: 2, name: "Jurisdictional Layer", pass: true, findings };
  }

  private static _within(value: number, target: number, tolerancePct: number): boolean {
    const delta = Math.abs(value - target) / target;
    return delta <= tolerancePct / 100;
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

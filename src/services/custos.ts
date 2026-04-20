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

  // ── Jurisdiction-specific rulesets ──────────────────────────────────────────
  // Each jurisdiction block contains only what that jurisdiction's law actually
  // states. No invented values. Absence of a rule = absence of that requirement.

  jurisdictions: {

    CA_TRIAL: {
      label: "California Trial Courts",
      authority: "Cal. Rules of Court, Rules 2.100–2.117",
      source: "https://courts.ca.gov/cms/rules/index.cfm?title=two",
      paperSize: { widthIn: 8.5, heightIn: 11.0, source: "CRC Rule 2.103" },
      paperQuality: { minWeightLbs: 20, color: ["white", "unbleached"], opaque: true, source: "CRC Rule 2.103" },
      oneSided: { required: true, source: "CRC Rule 2.102" },
      font: { minPt: 12, typefaceMandate: false, source: "CRC Rule 2.104" },
      margins: {
        leftMinIn: 1.0, rightMinIn: 0.5,
        topMinIn: null, bottomMinIn: null,
        note: "CRC 2.107 specifies left and right only. Top/bottom not mandated.",
        source: "CRC Rule 2.107",
      },
      lineSpacing: { accepted: [1.5, 2.0], source: "CRC Rule 2.108(1)" },
      lineNumbering: {
        required: true, minPerVerticalInch: 3,
        separatorMinIn: 0.2, source: "CRC Rule 2.108(4)",
      },
      electronicFiling: { governs: "CRC Rule 2.256", note: "PDF/A format required for e-filing" },
    },

    NDCA: {
      label: "U.S. District Court — Northern District of California",
      authority: "N.D. Cal. Civil Local Rules, Civil L.R. 3-4 (eff. Aug. 19, 2025)",
      source: "https://cand.uscourts.gov/rules-forms-fees/local-rules/civil-local-rules",
      paperSize: {
        // SOURCE: Civil L.R. 3-4(c): "8½ inch by 11 inch white paper with numbered lines,
        // and must be flat, unfolded...without back or cover, and firmly bound."
        widthIn: 8.5, heightIn: 11.0, color: "white",
        numberedLines: true, oneSided: true,
        source: "N.D. Cal. Civil L.R. 3-4(c)",
      },
      font: {
        // SOURCE: Civil L.R. 3-4(c)(2): "Standard proportionally spaced font
        // (e.g., Times New Roman or Century Schoolbook), 12 point type or larger,
        // and no more than 10 characters per horizontal inch."
        minPt: 12,
        style: "proportionally spaced",
        examples: ["Times New Roman", "Century Schoolbook"],
        maxCharsPerInch: 10,
        source: "N.D. Cal. Civil L.R. 3-4(c)(2)",
      },
      lineSpacing: {
        // SOURCE: Civil L.R. 3-4(c)(2): "double-spaced text" with max 28 lines/page.
        // Exceptions: counsel ID, case title, footnotes, quotations.
        required: 2.0,
        maxLinesPerPage: 28,
        exceptionsAllowSingleSpaced: ["counsel identification", "case title", "footnotes", "quotations"],
        source: "N.D. Cal. Civil L.R. 3-4(c)(2)",
      },
      margins: {
        // FINDING: Civil L.R. 3-4 does NOT specify margins in inches.
        // The 28-lines-per-page cap is the implicit physical constraint.
        // No margin measurement may be cited — absence of rule = no requirement coded.
        explicit: false,
        implicitControl: "28-line-per-page maximum serves as margin enforcement",
        source: "N.D. Cal. Civil L.R. 3-4(c)(2) — no explicit margin measurement stated",
      },
      footer: {
        // SOURCE: Civil L.R. 3-4(c)(3): Each page must have a footer stating the
        // paper title (e.g., "Complaint") or an abbreviation thereof.
        // Once a case number is assigned, it must appear in the footer.
        required: true,
        mustContain: ["paper title or abbreviation", "case number (once assigned)"],
        source: "N.D. Cal. Civil L.R. 3-4(c)(3)",
      },
      firstPage: {
        // SOURCE: Civil L.R. 3-4(a): Upper left must contain attorney name, address,
        // phone, email, state bar number (or party info if pro se). Line 8 begins
        // court title, action title, case number with judge initials, document title.
        upperLeftBlock: ["attorney name", "address", "phone", "email", "state bar number"],
        line8Begins: ["court title", "action title", "case number + judge initials", "document title"],
        source: "N.D. Cal. Civil L.R. 3-4(a)",
      },
      electronicFiling: {
        // SOURCE: Civil L.R. 5-1(d)(4): "All electronic filings...must be completed
        // prior to midnight in order to be considered timely filed that day."
        // Civil L.R. 5-1(f): Proposed orders must be filed in PDF format.
        deadline: "midnight Pacific time for same-day filing",
        proposedOrderFormat: "PDF",
        source: "N.D. Cal. Civil L.R. 5-1(d)(4), 5-1(f)",
      },
    },

    FED_APPELLATE: {
      label: "U.S. Courts of Appeals",
      authority: "Fed. R. App. P. 32 (as amended)",
      source: "https://www.law.cornell.edu/rules/frap/rule_32",
      paperSize: { widthIn: 8.5, heightIn: 11.0, source: "FRAP 32(a)(4)" },
      margins: { allSidesMinIn: 1.0, source: "FRAP 32(a)(4)" },
      lineSpacing: {
        required: 2.0,
        exceptionsAllowSingleSpaced: ["quotations over two lines", "headings", "footnotes"],
        source: "FRAP 32(a)(4)",
      },
      font: {
        proportional: { minPt: 14, mustHaveSerifs: true, sansSerifHeadingsOk: true, source: "FRAP 32(a)(5)(A)" },
        monospaced: { maxCharsPerInch: 10.5, source: "FRAP 32(a)(5)(B)" },
        style: "plain roman; italics/boldface for emphasis only",
        source: "FRAP 32(a)(5), 32(a)(6)",
      },
    },

  } as const,

  // ── Agency rulesets inserted above electronicFiling ──────────────────────

  agencies: {

    NLRB: {
      label: "National Labor Relations Board",
      authority: "29 CFR Part 102 — Rules and Regulations, Series 8",
      source: "https://www.ecfr.gov/current/title-29/subtitle-B/chapter-I/part-102",
      physicalFormat: {
        // SOURCE: 29 CFR § 102.5(a): "typewritten or otherwise legibly duplicated on
        // 8 1/2 by 11-inch plain white paper" with one-inch margins, double-spaced,
        // 10.5 chars/inch single-spaced typeface OR 12-point proportionally spaced.
        paperSize: { widthIn: 8.5, heightIn: 11.0, color: "white", source: "29 CFR § 102.5(a)" },
        margins: { allSidesMinIn: 1.0, source: "29 CFR § 102.5(a)" },
        font: { option1: "single-spaced ≤10.5 chars/inch", option2: "proportionally spaced 12pt min", source: "29 CFR § 102.5(a)" },
        lineSpacing: { required: 2.0, source: "29 CFR § 102.5(a)" },
        briefsOver20Pages: { requiresSubjectIndex: true, requiresTableOfCases: true, source: "29 CFR § 102.5(a)" },
      },
      filing: {
        // SOURCE: 29 CFR § 102.5(c): All documents E-Filed at nlrb.gov unless excepted.
        // ULP charges and representation petitions may be filed paper or electronic.
        defaultMethod: "E-Filed at nlrb.gov",
        exceptions: ["unfair labor practice charges", "representation petitions"],
        paperFilingRequiresJustification: true,
        source: "29 CFR § 102.5(c)",
      },
      charge: {
        // SOURCE: 29 CFR § 102.10: Must be in writing, signed, sworn or declared under PoP.
        // Filed with Regional Director for region where ULP occurred or is occurring.
        inWriting: true, signed: true,
        verificationOptions: ["sworn before notary/Board agent/authorized officer", "declaration under penalty of perjury"],
        filedWith: "Regional Director for region where alleged ULP occurred or is occurring",
        source: "29 CFR § 102.10",
      },
      service: {
        // SOURCE: 29 CFR § 102.5(f)-(h): Simultaneous service; proof of service required.
        // Fax service limited to <25 pages unless consented.
        simultaneousServiceRequired: true,
        proofOfServiceRequired: true,
        faxLimitPages: 25,
        source: "29 CFR § 102.5(f)-(h)",
      },
    },

    EEOC: {
      label: "Equal Employment Opportunity Commission",
      authority: "29 CFR Part 1601 — Procedural Regulations",
      source: "https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XIV/part-1601",
      physicalFormat: {
        // FINDING: 29 CFR Part 1601 contains NO physical format requirements.
        // Charge validity is content-driven, not format-governed.
        explicit: false,
        note: "No physical format requirements. Charge governed by content under 29 CFR § 1601.9 and § 1601.12.",
        source: "29 CFR Part 1601 — no physical format provision",
      },
      charge: {
        // SOURCE: 29 CFR § 1601.9: "A charge shall be in writing and signed and shall be verified."
        // SOURCE: 29 CFR § 1601.12: Required contents.
        inWriting: true, signed: true, verified: true,
        source: "29 CFR § 1601.9",
        requiredContents: [
          "full name and contact of charging party",
          "full name and contact of respondent (if known)",
          "clear and concise statement of facts including pertinent dates",
          "approximate number of employees of respondent (if known)",
          "disclosure of prior state or local agency proceedings on same matter",
        ],
        contentSource: "29 CFR § 1601.12",
      },
      digitalTransmission: {
        // SOURCE: 29 CFR § 1601.12 note: "file, serve, submit...shall include all forms of digital transmission."
        accepted: true, source: "29 CFR § 1601.12",
      },
      receipt: {
        // SOURCE: 29 CFR § 1601.12: Document must reflect date and time received by EEOC.
        dateTimeStampRequired: true, source: "29 CFR § 1601.12",
      },
    },

    VA: {
      label: "Department of Veterans Affairs",
      authority: "38 CFR Part 3 — Adjudication: Pension, Compensation, and Dependency",
      source: "https://www.ecfr.gov/current/title-38/chapter-I/part-3",
      physicalFormat: {
        // FINDING: 38 CFR Part 3 contains NO physical format requirements.
        // VA claims are filed on Secretary-prescribed forms. Format is determined by the form.
        explicit: false,
        note: "VA claims are form-driven. No physical format requirements in 38 CFR for claimant submissions.",
        source: "38 CFR § 3.155 — no physical format provision",
      },
      filing: {
        // SOURCE: 38 CFR § 3.155(a)-(d): Four filing methods.
        // Filing date = date received by VA (complete claim) or date of intent (one year to perfect).
        methods: [
          "complete claim on Secretary-prescribed form",
          "intent to file: saved electronic application at va.gov",
          "intent to file: signed written intent on prescribed form",
          "intent to file: oral statement to designated VA personnel (documented in writing)",
        ],
        filingDateRule: "date received by VA for complete claim; intent to file preserves date for one year",
        onlyOneIntentPerBenefitType: true,
        source: "38 CFR § 3.155",
      },
      prescribedForms: {
        compensation: "VA Form 21-526EZ",
        supplementalClaim: "VA Form 20-0995",
        higherLevelReview: "VA Form 20-0996",
        boardAppeal: "VA Form 10182 (Notice of Disagreement)",
        source: "38 CFR § 3.2500, § 3.155(d)",
      },
    },

    SSA: {
      label: "Social Security Administration",
      authority: "20 CFR Chapter III — Social Security Administration",
      source: "https://www.ecfr.gov/current/title-20/chapter-III",
      physicalFormat: {
        // FINDING: 20 CFR Chapter III contains NO physical format requirements
        // for claimant-submitted documents. Claims filed on SSA-prescribed forms.
        explicit: false,
        note: "SSA claims are form-driven. No physical format requirements in 20 CFR for claimant submissions.",
        source: "20 CFR Chapter III — no physical format provision",
      },
      filing: {
        // SOURCE: 20 CFR § 404.603 (SSDI), § 416.305 (SSI): Written claim on prescribed form.
        // Online, in-person, and phone filing accepted for initial applications.
        // Filing date = date of written application, or date of oral inquiry if application
        // filed within 6 months of inquiry.
        methods: ["online at ssa.gov", "in person at SSA field office", "by phone (initial applications)"],
        filingDateRule: "date of written application; oral inquiry preserves date if application filed within 6 months",
        source: "20 CFR § 404.603, § 416.305",
      },
      prescribedForms: {
        ssdi: "SSA-16-BK (Application for Disability Insurance Benefits)",
        functionReport: "SSA-3373-BK (Function Report — Adult)",
        workHistory: "SSA-3369-BK (Work History Report)",
        medicalRelease: "SSA-827 (Authorization to Disclose Information to SSA)",
        source: "20 CFR § 404.603",
      },
    },

    WCAB: {
      label: "California Workers' Compensation Appeals Board",
      authority: "8 Cal. Code Regs. §§ 10300–10999 — Rules of Practice and Procedure",
      source: "https://www.dir.ca.gov/wcab/wcab.htm",
      physicalFormat: {
        // FINDING: 8 CCR §§ 10300-10999 does not specify paper size, font, or margins.
        // WCAB filings follow CRC for physical format. WCAB rules govern procedure only.
        explicit: false,
        note: "WCAB physical format governed by CRC (Cal. Rules of Court). WCAB rules govern procedure, verification, and service.",
        source: "8 CCR §§ 10300–10999 — no independent physical format provision",
      },
      filing: {
        // SOURCE: 8 CCR § 10610, § 10615, § 10625: "File and serve" = file document
        // + proof of service with WCAB AND serve copy on each party.
        fileAndServeDefinition: "serve copy on each party AND file document + proof of service with WCAB",
        electronicFilingAvailable: true,
        source: "8 CCR § 10610, § 10615, § 10625",
      },
      verification: {
        // SOURCE: 8 CCR § 10510: Petitions and answers must be verified under penalty
        // of perjury — same manner as verified pleadings in courts of record.
        required: true,
        standard: "same manner as verified pleadings in courts of record",
        source: "8 CCR § 10510",
      },
      proofOfService: {
        // SOURCE: 8 CCR § 10625: Failure to file proof of service may result in
        // summary dismissal or denial without further review.
        required: true,
        consequenceOfOmission: "summary dismissal or denial without further review",
        source: "8 CCR § 10625",
      },
    },

  } as const,

  electronicFiling: {

    CA_TRIAL_EFILING: {
      label: "California Trial Court Electronic Filing",
      authority: "Cal. Rules of Court, Rules 2.256, 2.257, 2.259",
      source: "https://courts.ca.gov/cms/rules/index.cfm?title=two",

      format: {
        // SOURCE: CRC Rule 2.256(b)(3): "The document must be text searchable when
        // technologically feasible without impairment of the document's image."
        // SOURCE: CRC Rule 2.256(b)(2): "The printing of documents must not result
        // in the loss of document text, format, or appearance."
        required: "PDF",
        textSearchable: "required when technologically feasible",
        source: "CRC Rule 2.256(b)(2), 2.256(b)(3)",
      },

      fileSize: {
        // SOURCE: Court-level enforcement — no single statewide CRC limit.
        // Common limits by court as of 2025:
        //   LA County: 25MB per document, 60MB per transaction
        //   San Bernardino: 25MB per document, 50MB per submission
        //   Riverside: 120MB per document
        // Filings exceeding court limit are rejected by EFM (Electronic Filing Manager).
        noStatewideCRCLimit: true,
        commonLimitMbPerDoc: 25,
        note: "Limit set by each court's EFM. Rejection is automatic. Verify with target court before filing.",
        source: "Court-level EFM policy; no statewide CRC mandate",
      },

      signatures: {
        // SOURCE: CRC Rule 2.257(b): Documents signed under penalty of perjury.
        // Filer may use electronic signature that is: unique, verifiable, sole-controlled,
        // linked to data such that alteration invalidates it — OR file a previously
        // physically signed document; original producible within 5 days on demand.
        // SOURCE: CRC Rule 2.257(c): Documents NOT under penalty of perjury are
        // deemed signed by the electronic filer upon filing.
        // SOURCE: CRC Rule 2.257(d): "A party or other person is not required to
        // use a digital signature on an electronically filed document."
        penaltyOfPerjury: {
          electronicSignatureRequirements: [
            "unique to the declarant",
            "capable of verification",
            "under the sole control of the declarant",
            "linked to data such that alteration invalidates it",
          ],
          alternativeAllowed: "file previously physically signed document; produce original within 5 days on demand",
          source: "CRC Rule 2.257(b)",
        },
        notPenaltyOfPerjury: {
          deemedSigned: "by electronic filer upon filing",
          digitalSignatureNotRequired: true,
          source: "CRC Rule 2.257(c), 2.257(d)",
        },
      },

      filingDateTime: {
        // SOURCE: CRC Rule 2.259: Court sends confirmation with date/time of receipt.
        // Document deemed received at date/time confirmation is created.
        // Filing confirmation = proof of filing date and time.
        receiptConfirmationRequired: true,
        filedAtTimeOfConfirmation: true,
        source: "CRC Rule 2.259",
      },
    },

    CA_APPELLATE_EFILING: {
      label: "California Court of Appeal / Supreme Court Electronic Filing",
      authority: "Cal. Rules of Court, Rule 8.74",
      source: "https://courts.ca.gov/cms/rules/index/eight/rule8_74",

      format: {
        // SOURCE: CRC Rule 8.74: "Electronic documents must be in text-searchable
        // portable document format (PDF) while maintaining the original document formatting."
        required: "PDF",
        textSearchable: "required; non-searchable permitted only when conversion is impractical",
        source: "CRC Rule 8.74",
      },

      fileSize: {
        // SOURCE: CRC Rule 8.74: Electronic filings cannot exceed "25 megabytes."
        // Documents exceeding this must be split into multiple files, each with
        // cover pages indicating file numbers and page ranges.
        maxMbPerFile: 25,
        oversizeProtocol: "split into multiple files, each with cover page showing file number and page range",
        source: "CRC Rule 8.74",
      },

      font: {
        // SOURCE: CRC Rule 8.74: "proportionally spaced serif face" at 13-points minimum,
        // with 1.5 spaced line spacing. Century Schoolbook is preferred.
        minPt: 13,
        style: "proportionally spaced serif",
        preferred: "Century Schoolbook",
        lineSpacing: 1.5,
        source: "CRC Rule 8.74",
      },

      pagination: {
        // SOURCE: CRC Rule 8.74: Page numbering begins at 1, Arabic numerals,
        // consecutive. Electronic page counter must match document pagination.
        startAt: 1,
        format: "Arabic numerals",
        electronicCounterMustMatch: true,
        source: "CRC Rule 8.74",
      },

      bookmarks: {
        // SOURCE: CRC Rule 8.74: Documents must include "an electronic bookmark to
        // each heading, subheading, and the first page of any component."
        required: true,
        mustInclude: ["each heading", "each subheading", "first page of each component"],
        descriptionRequired: true,
        source: "CRC Rule 8.74",
      },

      hyperlinks: {
        // SOURCE: CRC Rule 8.74: Hyperlinks "encouraged but not required."
        // If included, must be active at filing and follow standard citation format.
        required: false,
        encouraged: true,
        ifIncluded: "must be active at filing; follow standard citation format",
        source: "CRC Rule 8.74",
      },
    },

  } as const,

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

  // ── NAICS 922120 — Police Protection ──────────────────────────────────────
  "police-report":                   { naics: "922120", sector: "Police Protection", agent: "forensic-police-report-auditor" },
  "incident-report":                 { naics: "922120", sector: "Police Protection", agent: "forensic-police-report-auditor" },
  "cad-report":                      { naics: "922120", sector: "Police Protection", agent: "forensic-police-report-auditor" },
  "arrest-waiver":                   { naics: "922120", sector: "Police Protection", agent: "forensic-police-report-auditor" },
  "citizens-arrest-waiver":          { naics: "922120", sector: "Police Protection", agent: "forensic-police-report-auditor" },
  "dispatch-log":                    { naics: "922120", sector: "Police Protection", agent: "forensic-police-report-auditor" },
  "arrest-warrant":                  { naics: "922120", sector: "Police Protection", agent: "ca-law-enforcement-procedures-specialist" },
  "search-warrant":                  { naics: "922120", sector: "Police Protection", agent: "ca-law-enforcement-procedures-specialist" },
  "internal-affairs-report":         { naics: "922120", sector: "Police Protection", agent: "ca-law-enforcement-procedures-specialist" },
  "use-of-force-report":             { naics: "922120", sector: "Police Protection", agent: "ca-law-enforcement-procedures-specialist" },
  "booking-record":                  { naics: "922120", sector: "Police Protection", agent: "ca-law-enforcement-procedures-specialist" },
  "jail-intake-record":              { naics: "922120", sector: "Police Protection", agent: "ca-law-enforcement-procedures-specialist" },
  "brady-list":                      { naics: "922120", sector: "Police Protection", agent: "ca-law-enforcement-procedures-specialist" },
  "personnel-complaint":             { naics: "922120", sector: "Police Protection", agent: "ca-law-enforcement-procedures-specialist" },

  // ── NAICS 922110 — Courts (general) ──────────────────────────────────────
  "court-filing":                    { naics: "922110", sector: "Courts", agent: "court-document-auditor" },
  "court-order":                     { naics: "922110", sector: "Courts", agent: "court-document-auditor" },
  "court-notice":                    { naics: "922110", sector: "Courts", agent: "court-document-auditor" },
  "court-memo":                      { naics: "922110", sector: "Courts", agent: "court-document-auditor" },
  "minute-order":                    { naics: "922110", sector: "Courts", agent: "court-document-auditor" },
  "judgment":                        { naics: "922110", sector: "Courts", agent: "court-document-auditor" },

  // ── NAICS 922110 — Family Law Courts ─────────────────────────────────────
  "dvro":                            { naics: "922110", sector: "Family Law Courts", agent: "ca-family-law-litigator" },
  "fl-form":                         { naics: "922110", sector: "Family Law Courts", agent: "ca-family-law-litigator" },
  "ex-parte":                        { naics: "922110", sector: "Family Law Courts", agent: "ca-family-law-litigator" },
  "fl-305":                          { naics: "922110", sector: "Family Law Courts", agent: "ca-family-law-litigator" },
  "fl-150":                          { naics: "922110", sector: "Family Law Courts", agent: "ca-family-law-litigator" },
  "fl-310":                          { naics: "922110", sector: "Family Law Courts", agent: "ca-family-law-litigator" },
  "fl-300":                          { naics: "922110", sector: "Family Law Courts", agent: "ca-family-law-litigator" },
  "fl-311":                          { naics: "922110", sector: "Family Law Courts", agent: "ca-family-law-litigator" },
  "fl-341":                          { naics: "922110", sector: "Family Law Courts", agent: "ca-family-law-litigator" },
  "temporary-orders":                { naics: "922110", sector: "Family Law Courts", agent: "ca-family-law-litigator" },
  "dissolution-filing":              { naics: "922110", sector: "Family Law Courts", agent: "ca-family-law-litigator" },
  "stipulation":                     { naics: "922110", sector: "Family Law Courts", agent: "ca-family-law-litigator" },
  "custody-order":                   { naics: "922110", sector: "Family Law Courts", agent: "ca-family-law-litigator" },
  "visitation-order":                { naics: "922110", sector: "Family Law Courts", agent: "ca-family-law-litigator" },
  "child-support-order":             { naics: "922110", sector: "Family Law Courts", agent: "ca-family-law-litigator" },
  "paternity-filing":                { naics: "922110", sector: "Family Law Courts", agent: "ca-family-law-litigator" },

  // ── NAICS 922110 — Criminal Courts ───────────────────────────────────────
  "criminal-complaint":              { naics: "922110", sector: "Criminal Courts", agent: "ca-criminal-law-specialist" },
  "indictment":                      { naics: "922110", sector: "Criminal Courts", agent: "ca-criminal-law-specialist" },
  "information":                     { naics: "922110", sector: "Criminal Courts", agent: "ca-criminal-law-specialist" },
  "plea-agreement":                  { naics: "922110", sector: "Criminal Courts", agent: "ca-criminal-law-specialist" },
  "sentencing-brief":                { naics: "922110", sector: "Criminal Courts", agent: "ca-criminal-law-specialist" },
  "probation-report":                { naics: "922110", sector: "Criminal Courts", agent: "ca-criminal-law-specialist" },
  "criminal-court-filing":           { naics: "922110", sector: "Criminal Courts", agent: "ca-criminal-law-specialist" },
  "pitchess-motion":                 { naics: "922110", sector: "Criminal Courts", agent: "ca-criminal-law-specialist" },
  "brady-demand":                    { naics: "922110", sector: "Criminal Courts", agent: "ca-criminal-law-specialist" },
  "motion-to-suppress":              { naics: "922110", sector: "Criminal Courts", agent: "ca-criminal-law-specialist" },
  "section-1001-petition":           { naics: "922110", sector: "Criminal Courts", agent: "ca-criminal-law-specialist" },
  "criminal-appeal":                 { naics: "922110", sector: "Criminal Courts", agent: "ca-criminal-law-specialist" },
  "misdemeanor-complaint":           { naics: "922110", sector: "Criminal Courts", agent: "ca-criminal-law-specialist" },
  "felony-complaint":                { naics: "922110", sector: "Criminal Courts", agent: "ca-criminal-law-specialist" },

  // ── NAICS 922110 — Civil Courts ───────────────────────────────────────────
  "civil-complaint":                 { naics: "922110", sector: "Civil Courts", agent: "ca-civil-litigator" },
  "answer":                          { naics: "922110", sector: "Civil Courts", agent: "ca-civil-litigator" },
  "cross-complaint":                 { naics: "922110", sector: "Civil Courts", agent: "ca-civil-litigator" },
  "demurrer":                        { naics: "922110", sector: "Civil Courts", agent: "ca-civil-litigator" },
  "motion-to-strike":                { naics: "922110", sector: "Civil Courts", agent: "ca-civil-litigator" },
  "motion-for-summary-judgment":     { naics: "922110", sector: "Civil Courts", agent: "ca-civil-litigator" },
  "writ-of-execution":               { naics: "922110", sector: "Civil Courts", agent: "ca-civil-litigator" },
  "notice-of-appeal":                { naics: "922110", sector: "Civil Courts", agent: "ca-civil-litigator" },
  "appellate-brief":                 { naics: "922110", sector: "Civil Courts", agent: "ca-civil-litigator" },

  // ── NAICS 922110 — Discovery ──────────────────────────────────────────────
  "subpoena":                        { naics: "922110", sector: "Discovery", agent: "ca-discovery-specialist" },
  "subpoena-duces-tecum":            { naics: "922110", sector: "Discovery", agent: "ca-discovery-specialist" },
  "interrogatories":                 { naics: "922110", sector: "Discovery", agent: "ca-discovery-specialist" },
  "request-for-admission":           { naics: "922110", sector: "Discovery", agent: "ca-discovery-specialist" },
  "request-for-production":          { naics: "922110", sector: "Discovery", agent: "ca-discovery-specialist" },
  "deposition-notice":               { naics: "922110", sector: "Discovery", agent: "ca-discovery-specialist" },
  "deposition-transcript":           { naics: "922110", sector: "Discovery", agent: "ca-discovery-specialist" },
  "privilege-log":                   { naics: "922110", sector: "Discovery", agent: "ca-discovery-specialist" },
  "protective-order":                { naics: "922110", sector: "Discovery", agent: "ca-discovery-specialist" },
  "discovery-motion":                { naics: "922110", sector: "Discovery", agent: "ca-discovery-specialist" },
  "meet-and-confer-letter":          { naics: "922110", sector: "Discovery", agent: "ca-discovery-specialist" },

  // ── NAICS 922110 — Probate & Conservatorship ──────────────────────────────
  "conservatorship-petition":        { naics: "922110", sector: "Probate Court", agent: "ca-probate-conservatorship-litigator" },
  "probate-petition":                { naics: "922110", sector: "Probate Court", agent: "ca-probate-conservatorship-litigator" },
  "letters-conservatorship":         { naics: "922110", sector: "Probate Court", agent: "ca-probate-conservatorship-litigator" },
  "letters-testamentary":            { naics: "922110", sector: "Probate Court", agent: "ca-probate-conservatorship-litigator" },
  "will":                            { naics: "922110", sector: "Probate Court", agent: "ca-probate-conservatorship-litigator" },
  "inventory-appraisal":             { naics: "922110", sector: "Probate Court", agent: "ca-probate-conservatorship-litigator" },
  "accounting":                      { naics: "922110", sector: "Probate Court", agent: "ca-probate-conservatorship-litigator" },
  "capacity-declaration":            { naics: "922110", sector: "Probate Court", agent: "ca-probate-conservatorship-litigator" },
  "court-investigator-report":       { naics: "922110", sector: "Probate Court", agent: "ca-probate-conservatorship-litigator" },
  "probate-court-filing":            { naics: "922110", sector: "Probate Court", agent: "ca-probate-conservatorship-litigator" },

  // ── NAICS 922110 — Federal Courts (NDCA, 9th Circuit) ────────────────────
  "section-1983-complaint":          { naics: "922110", sector: "Federal Courts", agent: "us-federal-civil-rights-litigator" },
  "title-vi-complaint":              { naics: "922110", sector: "Federal Courts", agent: "us-federal-civil-rights-litigator" },
  "title-vii-complaint":             { naics: "922110", sector: "Federal Courts", agent: "us-federal-civil-rights-litigator" },
  "civil-rights-complaint":          { naics: "922110", sector: "Federal Courts", agent: "us-federal-civil-rights-litigator" },
  "ndca-filing":                     { naics: "922110", sector: "Federal Courts", agent: "us-federal-civil-rights-litigator" },
  "federal-court-filing":            { naics: "922110", sector: "Federal Courts", agent: "us-federal-civil-rights-litigator" },
  "pro-se-complaint":                { naics: "922110", sector: "Federal Courts", agent: "us-federal-civil-rights-litigator" },
  "ifp-application":                 { naics: "922110", sector: "Federal Courts", agent: "us-federal-civil-rights-litigator" },
  "habeas-petition":                 { naics: "922110", sector: "Federal Courts", agent: "us-federal-civil-rights-litigator" },
  "ninth-circuit-brief":             { naics: "922110", sector: "Federal Courts", agent: "us-federal-civil-rights-litigator" },

  // ── NAICS 922110 — Administrative Law / OAH ───────────────────────────────
  "oah-filing":                      { naics: "922110", sector: "Administrative Courts", agent: "ca-administrative-law-specialist" },
  "administrative-complaint":        { naics: "922110", sector: "Administrative Courts", agent: "ca-administrative-law-specialist" },
  "oah-notice-of-hearing":           { naics: "922110", sector: "Administrative Courts", agent: "ca-administrative-law-specialist" },
  "oah-proposed-decision":           { naics: "922110", sector: "Administrative Courts", agent: "ca-administrative-law-specialist" },
  "administrative-subpoena":         { naics: "922110", sector: "Administrative Courts", agent: "ca-administrative-law-specialist" },
  "administrative-appeal":           { naics: "922110", sector: "Administrative Courts", agent: "ca-administrative-law-specialist" },

  // ── NAICS 922110 — Victim Compensation ───────────────────────────────────
  "calvcb-application":              { naics: "922110", sector: "Victim Compensation", agent: "ca-victim-compensation-litigator" },
  "victim-comp-form":                { naics: "922110", sector: "Victim Compensation", agent: "ca-victim-compensation-litigator" },
  "victim-declaration":              { naics: "922110", sector: "Victim Compensation", agent: "ca-victim-compensation-litigator" },
  "restitution-order":               { naics: "922110", sector: "Victim Compensation", agent: "ca-victim-compensation-litigator" },
  "calvcb-appeal":                   { naics: "922110", sector: "Victim Compensation", agent: "ca-victim-compensation-litigator" },
  "victim-advocate-letter":          { naics: "922110", sector: "Victim Compensation", agent: "ca-victim-compensation-litigator" },
  "vcgcb-form":                      { naics: "922110", sector: "Victim Compensation", agent: "ca-victim-compensation-litigator" },

  // ── NAICS 923110 — Human Resource Program Administration ─────────────────
  "employment-contract":             { naics: "923110", sector: "Labor & Employment", agent: "ca-labor-employment-litigator" },
  "offer-letter":                    { naics: "923110", sector: "Labor & Employment", agent: "ca-labor-employment-litigator" },
  "termination-notice":              { naics: "923110", sector: "Labor & Employment", agent: "ca-labor-employment-litigator" },
  "wage-claim":                      { naics: "923110", sector: "Labor & Employment", agent: "ca-labor-employment-litigator" },
  "dlse-form":                       { naics: "923110", sector: "Labor & Employment", agent: "ca-labor-employment-litigator" },
  "labor-board-filing":              { naics: "923110", sector: "Labor & Employment", agent: "ca-labor-employment-litigator" },
  "eeoc-charge":                     { naics: "923110", sector: "Labor & Employment", agent: "ca-labor-employment-litigator" },
  "dfeh-complaint":                  { naics: "923110", sector: "Labor & Employment", agent: "ca-labor-employment-litigator" },
  "crd-complaint":                   { naics: "923110", sector: "Labor & Employment", agent: "ca-labor-employment-litigator" },
  "wrongful-termination-complaint":  { naics: "923110", sector: "Labor & Employment", agent: "ca-labor-employment-litigator" },
  "wage-theft-claim":                { naics: "923110", sector: "Labor & Employment", agent: "ca-labor-employment-litigator" },
  "fmla-cfra-form":                  { naics: "923110", sector: "Labor & Employment", agent: "ca-labor-employment-litigator" },
  "union-grievance":                 { naics: "923110", sector: "Labor & Employment", agent: "ca-labor-employment-litigator" },
  "retaliation-claim":               { naics: "923110", sector: "Labor & Employment", agent: "ca-labor-employment-litigator" },

  // ── NAICS 524126 — Workers' Compensation (via WCAB) ──────────────────────
  "dwc-1-form":                      { naics: "524126", sector: "Workers Compensation", agent: "ca-workers-compensation-litigator" },
  "wcab-petition":                   { naics: "524126", sector: "Workers Compensation", agent: "ca-workers-compensation-litigator" },
  "wcab-form":                       { naics: "524126", sector: "Workers Compensation", agent: "ca-workers-compensation-litigator" },
  "qme-report":                      { naics: "524126", sector: "Workers Compensation", agent: "ca-workers-compensation-litigator" },
  "panel-qme-request":               { naics: "524126", sector: "Workers Compensation", agent: "ca-workers-compensation-litigator" },
  "work-status-report":              { naics: "524126", sector: "Workers Compensation", agent: "ca-workers-compensation-litigator" },
  "wage-loss-claim":                 { naics: "524126", sector: "Workers Compensation", agent: "ca-workers-compensation-litigator" },
  "td-benefit-claim":                { naics: "524126", sector: "Workers Compensation", agent: "ca-workers-compensation-litigator" },
  "pd-rating":                       { naics: "524126", sector: "Workers Compensation", agent: "ca-workers-compensation-litigator" },
  "compromise-and-release":          { naics: "524126", sector: "Workers Compensation", agent: "ca-workers-compensation-litigator" },

  // ── NAICS 923130 — Child Welfare ──────────────────────────────────────────
  "cps-report":                      { naics: "923130", sector: "Child Welfare", agent: "cps-auditor" },
  "child-welfare":                   { naics: "923130", sector: "Child Welfare", agent: "cps-auditor" },
  "social-worker-report":            { naics: "923130", sector: "Child Welfare", agent: "cps-auditor" },
  "welfare-determination":           { naics: "923130", sector: "Child Welfare", agent: "cps-auditor" },
  "child-protective-services-filing":{ naics: "923130", sector: "Child Welfare", agent: "cps-auditor" },
  "cws-report":                      { naics: "923130", sector: "Child Welfare", agent: "cps-auditor" },

  // ── NAICS 922110 — Family Court Services ──────────────────────────────────
  "fcs-letter":                      { naics: "922110", sector: "Family Court Services", agent: "marin-fcs-auditor" },
  "mediator-report":                 { naics: "922110", sector: "Family Court Services", agent: "marin-fcs-auditor" },
  "minor-interview":                 { naics: "922110", sector: "Family Court Services", agent: "marin-fcs-auditor" },
  "family-court-services":           { naics: "922110", sector: "Family Court Services", agent: "marin-fcs-auditor" },

  // ── NAICS 923120 — Social Security Administration ─────────────────────────
  "ssa-form":                        { naics: "923120", sector: "Social Security", agent: "us-federal-social-security-litigator" },
  "ssdi-application":                { naics: "923120", sector: "Social Security", agent: "us-federal-social-security-litigator" },
  "ssi-application":                 { naics: "923120", sector: "Social Security", agent: "us-federal-social-security-litigator" },
  "ssa-denial":                      { naics: "923120", sector: "Social Security", agent: "us-federal-social-security-litigator" },
  "ssa-appeal":                      { naics: "923120", sector: "Social Security", agent: "us-federal-social-security-litigator" },
  "ssa-hearing-request":             { naics: "923120", sector: "Social Security", agent: "us-federal-social-security-litigator" },
  "alj-decision":                    { naics: "923120", sector: "Social Security", agent: "us-federal-social-security-litigator" },
  "ssa-827":                         { naics: "923120", sector: "Social Security", agent: "us-federal-social-security-litigator" },
  "ssa-3373":                        { naics: "923120", sector: "Social Security", agent: "us-federal-social-security-litigator" },
  "ssa-3369":                        { naics: "923120", sector: "Social Security", agent: "us-federal-social-security-litigator" },
  "ssa-16-bk":                       { naics: "923120", sector: "Social Security", agent: "us-federal-social-security-litigator" },
  "representative-payee-form":       { naics: "923120", sector: "Social Security", agent: "us-federal-social-security-litigator" },

  // ── NAICS 523920 — ERISA / Pension ───────────────────────────────────────
  "pension-document":                { naics: "523920", sector: "Pension & ERISA", agent: "us-federal-erisa-litigator" },
  "erisa-complaint":                 { naics: "523920", sector: "Pension & ERISA", agent: "us-federal-erisa-litigator" },
  "plan-document":                   { naics: "523920", sector: "Pension & ERISA", agent: "us-federal-erisa-litigator" },
  "401k-statement":                  { naics: "523920", sector: "Pension & ERISA", agent: "us-federal-erisa-litigator" },
  "pension-statement":               { naics: "523920", sector: "Pension & ERISA", agent: "us-federal-erisa-litigator" },
  "benefit-denial-letter":           { naics: "523920", sector: "Pension & ERISA", agent: "us-federal-erisa-litigator" },
  "dol-filing":                      { naics: "523920", sector: "Pension & ERISA", agent: "us-federal-erisa-litigator" },
  "form-5500":                       { naics: "523920", sector: "Pension & ERISA", agent: "us-federal-erisa-litigator" },
  "pension-audit":                   { naics: "523920", sector: "Pension & ERISA", agent: "us-federal-erisa-litigator" },

  // ── NAICS 921130 — Tax (Federal & State) ──────────────────────────────────
  "irs-notice":                      { naics: "921130", sector: "Federal Tax", agent: "us-federal-tax-litigator" },
  "tax-court-petition":              { naics: "921130", sector: "Federal Tax", agent: "us-federal-tax-litigator" },
  "irs-audit-response":              { naics: "921130", sector: "Federal Tax", agent: "us-federal-tax-litigator" },
  "irs-lien":                        { naics: "921130", sector: "Federal Tax", agent: "us-federal-tax-litigator" },
  "irs-levy":                        { naics: "921130", sector: "Federal Tax", agent: "us-federal-tax-litigator" },
  "form-1040":                       { naics: "921130", sector: "Federal Tax", agent: "us-federal-tax-litigator" },
  "form-w-2":                        { naics: "921130", sector: "Federal Tax", agent: "us-federal-tax-litigator" },
  "form-1099":                       { naics: "921130", sector: "Federal Tax", agent: "us-federal-tax-litigator" },
  "irs-appeal":                      { naics: "921130", sector: "Federal Tax", agent: "us-federal-tax-litigator" },
  "offer-in-compromise":             { naics: "921130", sector: "Federal Tax", agent: "us-federal-tax-litigator" },
  "ftb-notice":                      { naics: "921130", sector: "State Tax", agent: "ca-tax-specialist" },
  "cdtfa-filing":                    { naics: "921130", sector: "State Tax", agent: "ca-tax-specialist" },
  "ftb-audit-response":              { naics: "921130", sector: "State Tax", agent: "ca-tax-specialist" },
  "ftb-appeal":                      { naics: "921130", sector: "State Tax", agent: "ca-tax-specialist" },
  "payroll-tax-filing":              { naics: "921130", sector: "State Tax", agent: "ca-tax-specialist" },

  // ── NAICS 524113 — Insurance ──────────────────────────────────────────────
  "insurance-policy":                { naics: "524113", sector: "Insurance", agent: "ca-insurance-compliance-litigator" },
  "insurance-claim":                 { naics: "524113", sector: "Insurance", agent: "ca-insurance-compliance-litigator" },
  "claim-denial-letter":             { naics: "524113", sector: "Insurance", agent: "ca-insurance-compliance-litigator" },
  "cdi-complaint":                   { naics: "524113", sector: "Insurance", agent: "ca-insurance-compliance-litigator" },
  "bad-faith-complaint":             { naics: "524113", sector: "Insurance", agent: "ca-insurance-compliance-litigator" },
  "coverage-dispute":                { naics: "524113", sector: "Insurance", agent: "ca-insurance-compliance-litigator" },
  "proof-of-loss":                   { naics: "524113", sector: "Insurance", agent: "ca-insurance-compliance-litigator" },

  // ── NAICS 531210 — Real Estate ────────────────────────────────────────────
  "deed":                            { naics: "531210", sector: "Real Estate", agent: "ca-real-estate-attorney" },
  "grant-deed":                      { naics: "531210", sector: "Real Estate", agent: "ca-real-estate-attorney" },
  "trust-deed":                      { naics: "531210", sector: "Real Estate", agent: "ca-real-estate-attorney" },
  "purchase-agreement":              { naics: "531210", sector: "Real Estate", agent: "ca-real-estate-attorney" },
  "escrow-instruction":              { naics: "531210", sector: "Real Estate", agent: "ca-real-estate-attorney" },
  "title-report":                    { naics: "531210", sector: "Real Estate", agent: "ca-real-estate-attorney" },
  "residential-lease":               { naics: "531210", sector: "Real Estate", agent: "ca-real-estate-attorney" },
  "commercial-lease":                { naics: "531210", sector: "Real Estate", agent: "ca-real-estate-attorney" },
  "notice-to-quit":                  { naics: "531210", sector: "Real Estate", agent: "ca-real-estate-attorney" },
  "unlawful-detainer-complaint":     { naics: "531210", sector: "Real Estate", agent: "ca-real-estate-attorney" },
  "real-estate-disclosure":          { naics: "531210", sector: "Real Estate", agent: "ca-real-estate-attorney" },
  "mechanics-lien":                  { naics: "531210", sector: "Real Estate", agent: "ca-real-estate-attorney" },
  "lien-release":                    { naics: "531210", sector: "Real Estate", agent: "ca-real-estate-attorney" },

  // ── NAICS 517110 — Telecommunications ────────────────────────────────────
  "phone-record":                    { naics: "517110", sector: "Telecommunications", agent: "ca-telecom-privacy-litigator" },
  "call-log":                        { naics: "517110", sector: "Telecommunications", agent: "ca-telecom-privacy-litigator" },
  "sim-swap-complaint":              { naics: "517110", sector: "Telecommunications", agent: "ca-telecom-privacy-litigator" },
  "carrier-disclosure":              { naics: "517110", sector: "Telecommunications", agent: "ca-telecom-privacy-litigator" },
  "cpuc-complaint":                  { naics: "517110", sector: "Telecommunications", agent: "ca-telecom-privacy-litigator" },
  "fcc-complaint":                   { naics: "517110", sector: "Telecommunications", agent: "ca-telecom-privacy-litigator" },
  "wiretap-complaint":               { naics: "517110", sector: "Telecommunications", agent: "ca-telecom-privacy-litigator" },
  "geolocation-record":              { naics: "517110", sector: "Telecommunications", agent: "ca-telecom-privacy-litigator" },
  "cipa-complaint":                  { naics: "517110", sector: "Telecommunications", agent: "ca-telecom-privacy-litigator" },

  // ── NAICS 621111 — Health Care / Offices of Physicians ───────────────────
  "medical-record":                  { naics: "621111", sector: "Health Care", agent: "ca-medical-malpractice-litigator" },
  "disability-evaluation":           { naics: "621111", sector: "Health Care", agent: "ca-medical-malpractice-litigator" },
  "medical-malpractice-complaint":   { naics: "621111", sector: "Health Care", agent: "ca-medical-malpractice-litigator" },
  "surgical-report":                 { naics: "621111", sector: "Health Care", agent: "ca-medical-malpractice-litigator" },
  "operative-report":                { naics: "621111", sector: "Health Care", agent: "ca-medical-malpractice-litigator" },
  "hospital-discharge-summary":      { naics: "621111", sector: "Health Care", agent: "ca-medical-malpractice-litigator" },
  "radiology-report":                { naics: "621111", sector: "Health Care", agent: "ca-medical-malpractice-litigator" },
  "pathology-report":                { naics: "621111", sector: "Health Care", agent: "ca-medical-malpractice-litigator" },
  "hipaa-release":                   { naics: "621111", sector: "Health Care", agent: "ca-medical-privacy-officer" },
  "medical-authorization":           { naics: "621111", sector: "Health Care", agent: "ca-medical-privacy-officer" },
  "phi-disclosure-log":              { naics: "621111", sector: "Health Care", agent: "ca-medical-privacy-officer" },
  "breach-notification":             { naics: "621111", sector: "Health Care", agent: "ca-medical-privacy-officer" },
  "cmia-complaint":                  { naics: "621111", sector: "Health Care", agent: "ca-medical-privacy-officer" },

  // ── NAICS 621420 — Mental Health ──────────────────────────────────────────
  "5150-hold":                       { naics: "621420", sector: "Mental Health", agent: "ca-mental-health-litigator" },
  "5250-hold":                       { naics: "621420", sector: "Mental Health", agent: "ca-mental-health-litigator" },
  "mental-health-record":            { naics: "621420", sector: "Mental Health", agent: "ca-mental-health-litigator" },
  "psychiatric-evaluation":          { naics: "621420", sector: "Mental Health", agent: "ca-mental-health-litigator" },
  "lps-conservatorship":             { naics: "621420", sector: "Mental Health", agent: "ca-mental-health-litigator" },
  "mental-health-court-filing":      { naics: "621420", sector: "Mental Health", agent: "ca-mental-health-litigator" },
  "voluntary-admission":             { naics: "621420", sector: "Mental Health", agent: "ca-mental-health-litigator" },

  // ── NAICS 621111 — Healthcare Fraud ──────────────────────────────────────
  "medical-billing-record":          { naics: "621111", sector: "Healthcare Fraud", agent: "ca-healthcare-fraud-litigator" },
  "medicare-billing-record":         { naics: "621111", sector: "Healthcare Fraud", agent: "ca-healthcare-fraud-litigator" },
  "medi-cal-claim":                  { naics: "621111", sector: "Healthcare Fraud", agent: "ca-healthcare-fraud-litigator" },
  "cms-1500":                        { naics: "621111", sector: "Healthcare Fraud", agent: "ca-healthcare-fraud-litigator" },
  "ub-04":                           { naics: "621111", sector: "Healthcare Fraud", agent: "ca-healthcare-fraud-litigator" },

  // ── NAICS 521110 / 522110 — Financial Fraud ───────────────────────────────
  "financial-statement":             { naics: "522110", sector: "Financial", agent: "us-federal-financial-fraud-litigator" },
  "bank-record":                     { naics: "522110", sector: "Financial", agent: "us-federal-financial-fraud-litigator" },
  "financial-fraud-complaint":       { naics: "522110", sector: "Financial", agent: "us-federal-financial-fraud-litigator" },
  "forensic-accounting-report":      { naics: "522110", sector: "Financial", agent: "us-federal-financial-fraud-litigator" },
  "suspicious-activity-report":      { naics: "522110", sector: "Financial", agent: "us-federal-financial-fraud-litigator" },
  "identity-theft-complaint":        { naics: "522110", sector: "Financial", agent: "us-federal-financial-fraud-litigator" },

  // ── NAICS 923110 — Housing / HUD ─────────────────────────────────────────
  "fha-complaint":                   { naics: "923110", sector: "Federal Housing", agent: "us-federal-housing-litigator" },
  "hud-complaint":                   { naics: "923110", sector: "Federal Housing", agent: "us-federal-housing-litigator" },
  "fair-housing-complaint":          { naics: "923110", sector: "Federal Housing", agent: "us-federal-housing-litigator" },
  "housing-discrimination-charge":   { naics: "923110", sector: "Federal Housing", agent: "us-federal-housing-litigator" },

  // ── NAICS 923110 — Disability Rights ─────────────────────────────────────
  "ada-complaint":                   { naics: "923110", sector: "Disability Rights", agent: "ca-disability-rights-litigator" },
  "section-504-complaint":           { naics: "923110", sector: "Disability Rights", agent: "ca-disability-rights-litigator" },
  "accommodation-request":           { naics: "923110", sector: "Disability Rights", agent: "ca-disability-rights-litigator" },
  "disability-discrimination-charge":{ naics: "923110", sector: "Disability Rights", agent: "ca-disability-rights-litigator" },

  // ── NAICS 926110 — Consumer Protection ───────────────────────────────────
  "consumer-complaint":              { naics: "926110", sector: "Consumer Protection", agent: "ca-consumer-protection-litigator" },
  "dca-complaint":                   { naics: "926110", sector: "Consumer Protection", agent: "ca-consumer-protection-litigator" },
  "ftc-complaint":                   { naics: "926110", sector: "Consumer Protection", agent: "ca-consumer-protection-litigator" },
  "ucl-complaint":                   { naics: "926110", sector: "Consumer Protection", agent: "ca-consumer-protection-litigator" },
  "clra-demand":                     { naics: "926110", sector: "Consumer Protection", agent: "ca-consumer-protection-litigator" },
  "lemon-law-filing":                { naics: "926110", sector: "Consumer Protection", agent: "ca-consumer-protection-litigator" },
  "auto-dealer-complaint":           { naics: "926110", sector: "Consumer Protection", agent: "ca-consumer-protection-litigator" },

  // ── NAICS 928110 — Immigration ────────────────────────────────────────────
  "i-485":                           { naics: "928110", sector: "Immigration", agent: "ca-immigration-litigator" },
  "i-130":                           { naics: "928110", sector: "Immigration", agent: "ca-immigration-litigator" },
  "i-765":                           { naics: "928110", sector: "Immigration", agent: "ca-immigration-litigator" },
  "i-589":                           { naics: "928110", sector: "Immigration", agent: "ca-immigration-litigator" },
  "i-751":                           { naics: "928110", sector: "Immigration", agent: "ca-immigration-litigator" },
  "uscis-notice":                    { naics: "928110", sector: "Immigration", agent: "ca-immigration-litigator" },
  "immigration-court-filing":        { naics: "928110", sector: "Immigration", agent: "ca-immigration-litigator" },
  "asylum-application":              { naics: "928110", sector: "Immigration", agent: "ca-immigration-litigator" },
  "removal-order":                   { naics: "928110", sector: "Immigration", agent: "ca-immigration-litigator" },
  "naturalization-application":      { naics: "928110", sector: "Immigration", agent: "ca-immigration-litigator" },

  // ── NAICS 926120 — Licensing, Inspection, Vehicle Code, Building ─────────
  "traffic-citation":                { naics: "926120", sector: "Vehicle Code", agent: "ca-vehicle-code-specialist" },
  "dmv-record":                      { naics: "926120", sector: "Vehicle Code", agent: "ca-vehicle-code-specialist" },
  "dmv-suspension-notice":           { naics: "926120", sector: "Vehicle Code", agent: "ca-vehicle-code-specialist" },
  "sr-22":                           { naics: "926120", sector: "Vehicle Code", agent: "ca-vehicle-code-specialist" },
  "vehicle-registration":            { naics: "926120", sector: "Vehicle Code", agent: "ca-vehicle-code-specialist" },
  "title-document":                  { naics: "926120", sector: "Vehicle Code", agent: "ca-vehicle-code-specialist" },
  "dmv-hearing-request":             { naics: "926120", sector: "Vehicle Code", agent: "ca-vehicle-code-specialist" },
  "building-permit":                 { naics: "926120", sector: "Building & Construction", agent: "ca-building-official" },
  "code-enforcement-notice":         { naics: "926120", sector: "Building & Construction", agent: "ca-building-official" },
  "stop-work-order":                 { naics: "926120", sector: "Building & Construction", agent: "ca-building-official" },
  "certificate-of-occupancy":        { naics: "926120", sector: "Building & Construction", agent: "ca-building-official" },
  "contractor-agreement":            { naics: "926120", sector: "Building & Construction", agent: "ca-licensed-contractor" },
  "notice-of-completion":            { naics: "926120", sector: "Building & Construction", agent: "ca-licensed-contractor" },
  "food-safety-inspection":          { naics: "926120", sector: "Food Safety", agent: "ca-food-safety-specialist" },
  "restaurant-inspection-report":    { naics: "926120", sector: "Food Safety", agent: "ca-retail-food-inspector" },
  "health-code-violation":           { naics: "926120", sector: "Food Safety", agent: "ca-retail-food-inspector" },
  "weights-measures-inspection":     { naics: "926120", sector: "Weights & Measures", agent: "ca-weights-measures-inspector" },

  // ── NAICS 924110 — Environmental / CEQA ──────────────────────────────────
  "ceqa-document":                   { naics: "924110", sector: "Environmental", agent: "ca-ceqa-consultant" },
  "eir":                             { naics: "924110", sector: "Environmental", agent: "ca-ceqa-consultant" },
  "notice-of-determination":         { naics: "924110", sector: "Environmental", agent: "ca-ceqa-consultant" },
  "notice-of-exemption":             { naics: "924110", sector: "Environmental", agent: "ca-ceqa-consultant" },
  "cpuc-filing":                     { naics: "924110", sector: "Energy Policy", agent: "ca-energy-policy-specialist" },

  // ── NAICS 922120 — Qui Tam / False Claims Act (Council Seat 5 — DELATOR) ──
  "qui-tam-complaint":               { naics: "922120", sector: "Qui Tam / False Claims", agent: "delator" },
  "fca-sealed-complaint":            { naics: "922120", sector: "Qui Tam / False Claims", agent: "delator" },
  "fca-disclosure":                  { naics: "922120", sector: "Qui Tam / False Claims", agent: "delator" },
  "relator-disclosure-statement":    { naics: "922120", sector: "Qui Tam / False Claims", agent: "delator" },
  "false-claims-complaint":          { naics: "922120", sector: "Qui Tam / False Claims", agent: "delator" },
  "whistleblower-complaint":         { naics: "922120", sector: "Qui Tam / False Claims", agent: "delator" },
  "irs-form-211":                    { naics: "922120", sector: "Qui Tam / False Claims", agent: "delator" },
  "sec-whistleblower-tip":           { naics: "922120", sector: "Qui Tam / False Claims", agent: "delator" },
  "dol-form-5500":                   { naics: "922120", sector: "Qui Tam / False Claims", agent: "delator" },
  "retaliation-complaint":           { naics: "922120", sector: "Qui Tam / False Claims", agent: "delator" },
  "anti-retaliation-filing":         { naics: "922120", sector: "Qui Tam / False Claims", agent: "delator" },
  "upcoding-complaint":              { naics: "922120", sector: "Qui Tam / False Claims", agent: "delator" },
  "healthcare-fraud-referral":       { naics: "922120", sector: "Qui Tam / False Claims", agent: "delator" },

} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Filing deadlines — primary-source statutes only.
// Every entry cites the exact statute that establishes the deadline.
// No invented values. No best-guess periods.
// ─────────────────────────────────────────────────────────────────────────────

export const FILING_DEADLINES = {

  NLRB_ULP: {
    // SOURCE: 29 USC § 160(b):
    //   "no complaint shall issue based upon any unfair labor practice occurring
    //   more than six months prior to the filing of the charge with the Board and
    //   the service of a copy thereof upon the person against whom such charge is made."
    days: 180,
    months: 6,
    trigger: "date of unfair labor practice (ULP)",
    source: "29 USC § 160(b)",
    note: "Six-month period is jurisdictional. Filing after 180 days bars the charge absolutely.",
  },

  EEOC_NO_STATE_AGENCY: {
    // SOURCE: 42 USC § 2000e-5(e)(1):
    //   "A charge under this section shall be filed within one hundred and eighty days
    //   after the alleged unlawful employment practice occurred..."
    days: 180,
    trigger: "date of alleged unlawful employment practice",
    stateAgencyDeferral: false,
    source: "42 USC § 2000e-5(e)(1)",
    note: "Applies when no state or local agency has authority to grant relief for such practice.",
  },

  EEOC_WITH_STATE_AGENCY: {
    // SOURCE: 42 USC § 2000e-5(e)(1):
    //   "...except that in a case of an unlawful employment practice with respect to
    //   which the person aggrieved has initially instituted proceedings with a State
    //   or local agency with authority to grant or seek relief from such practice...
    //   such charge shall be filed...within three hundred days after the alleged
    //   unlawful employment practice occurred."
    days: 300,
    trigger: "date of alleged unlawful employment practice",
    stateAgencyDeferral: true,
    source: "42 USC § 2000e-5(e)(1)",
    note: "Extended to 300 days only when a state/local deferral agency has authority over the practice. California = DFEH/CRD qualifies.",
  },

  CA_PERSONAL_INJURY: {
    // SOURCE: Cal. Code of Civil Procedure § 335.1:
    //   "Within two years: An action for assault, battery, or injury to, or for
    //   the death of, an individual caused by the wrongful act or neglect of another."
    years: 2,
    trigger: "date of injury or wrongful act",
    discoveryRule: false,
    source: "Cal. Code of Civil Procedure § 335.1",
    note: "Two-year period runs from date of injury. Discovery rule may toll in limited circumstances under CCP § 340.1 (childhood sexual abuse) or specific statutory exceptions.",
  },

  CA_FRAUD: {
    // SOURCE: Cal. Code of Civil Procedure § 338(d):
    //   "An action for relief on the ground of fraud or mistake. The cause of action
    //   in that case is not to be deemed to have accrued until the discovery, by the
    //   aggrieved party, of the facts constituting the fraud or mistake."
    years: 3,
    trigger: "date of discovery of facts constituting fraud or mistake",
    discoveryRule: true,
    source: "Cal. Code of Civil Procedure § 338(d)",
    note: "Discovery rule: period does not begin until the aggrieved party discovered or reasonably should have discovered the fraud.",
  },

  CA_WCAB: {
    // SOURCE: Cal. Labor Code § 5405:
    //   "The period within which proceedings for the collection of the benefits
    //   provided by Article 2 (commencing with Section 4600) of Chapter 2 of
    //   Part 2 may be commenced is one year from: (a) The date of injury;
    //   (b) The expiration of any period covered by payment of temporary disability
    //   indemnity; or (c) The last date on which any benefits provided for in Article
    //   3 (commencing with Section 4650) of Chapter 2 of Part 2 were furnished."
    years: 1,
    trigger: "latest of: date of injury, expiration of temporary disability payment period, or last date benefits furnished",
    source: "Cal. Labor Code § 5405",
    note: "Three possible accrual triggers — use the LATEST date. Failure to file within one year bars the claim before WCAB.",
  },

  CA_GOVERNMENT_TORT: {
    // SOURCE: Cal. Government Code § 911.2(a):
    //   "A claim relating to a cause of action for death or for injury to person or
    //   to personal property or growing crops shall be presented as provided in
    //   Article 2 (commencing with Section 915) not later than six months after
    //   the accrual of the cause of action."
    months: 6,
    trigger: "date of injury or cause of action accrual",
    prerequisite: "Government Tort Claim required BEFORE filing suit against public entity",
    source: "Cal. Government Code § 911.2(a)",
    note: "Mandatory prerequisite for suits against CA state agencies, counties, cities. Failure to file = bars suit. Late claim application under § 911.4 if within one year of accrual.",
  },

  CA_SECTION_1983_FEDERAL: {
    // SOURCE: Wilson v. Garcia, 471 US 261 (1985); Owens v. Okure, 488 US 235 (1989):
    //   Federal courts borrow the forum state's general personal injury statute of limitations.
    //   For California: Cal. CCP § 335.1 (2 years).
    // SOURCE: 42 USC § 1983 — no independent limitations period stated in the statute.
    years: 2,
    trigger: "date constitutional violation occurred (or discovered under equitable tolling)",
    source: "Cal. CCP § 335.1 (borrowed under Wilson v. Garcia, 471 US 261 (1985))",
    note: "§ 1983 has no internal SOL; federal courts apply state personal injury period. CA = 2 years. Accrual under federal law: when plaintiff knows or has reason to know of the injury.",
  },

} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Charter map: agent → document types it is authorized to process.
// "*" = universal witness (HERALD, ADAM, EVE, CUSTOS, CA_Forensic_Document_Specialist,
//        CA_Records_Authentication_Specialist) — witness all, audit none beyond scope.
// ─────────────────────────────────────────────────────────────────────────────
const CHARTER_MAP: Record<string, string[]> = {

  // ── Core system agents ────────────────────────────────────────────────────
  "herald":                               ["*"],
  "adam":                                 ["*"],
  "eve":                                  ["*"],
  "custos":                               ["*"],
  "ca-forensic-document-specialist":      ["*"],
  "ca-records-authentication-specialist": ["*"],

  // ── Family Law ───────────────────────────────────────────────────────────
  "ca-family-law-litigator": [
    "court-filing", "court-order", "court-notice", "court-memo",
    "dvro", "fl-form", "ex-parte", "fl-305", "fl-150", "fl-310",
    "temporary-orders", "dissolution-filing", "stipulation",
    "minute-order", "judgment", "child-support-order", "visitation-order",
    "custody-order", "paternity-filing", "fl-300", "fl-311", "fl-341",
  ],

  // ── Criminal Law ─────────────────────────────────────────────────────────
  "ca-criminal-law-specialist": [
    "criminal-complaint", "arrest-warrant", "search-warrant", "indictment",
    "information", "plea-agreement", "sentencing-brief", "probation-report",
    "criminal-court-filing", "pitchess-motion", "brady-demand",
    "motion-to-suppress", "section-1001-petition", "criminal-appeal",
    "misdemeanor-complaint", "felony-complaint",
  ],

  // ── Law Enforcement Procedures ────────────────────────────────────────────
  "ca-law-enforcement-procedures-specialist": [
    "police-report", "incident-report", "cad-report",
    "arrest-waiver", "citizens-arrest-waiver", "dispatch-log",
    "internal-affairs-report", "use-of-force-report", "booking-record",
    "jail-intake-record", "brady-list", "personnel-complaint",
  ],

  // ── Police Report Forensics ───────────────────────────────────────────────
  "forensic-police-report-auditor": [
    "police-report", "incident-report", "cad-report",
    "arrest-waiver", "citizens-arrest-waiver", "dispatch-log",
  ],

  // ── Labor & Employment ────────────────────────────────────────────────────
  "ca-labor-employment-litigator": [
    "employment-contract", "offer-letter", "termination-notice",
    "wage-claim", "dlse-form", "labor-board-filing", "eeoc-charge",
    "dfeh-complaint", "crd-complaint", "retaliation-claim",
    "wrongful-termination-complaint", "wage-theft-claim",
    "leave-of-absence-request", "fmla-cfra-form", "union-grievance",
  ],

  // ── Workers' Compensation ─────────────────────────────────────────────────
  "ca-workers-compensation-litigator": [
    "dwc-1-form", "wcab-petition", "wcab-form", "qme-report",
    "panel-qme-request", "mri-report", "work-status-report",
    "wage-loss-claim", "td-benefit-claim", "pd-rating", "wcab-answer",
    "lien-claim", "compromise-and-release", "stipulation-with-request",
  ],

  // ── General Civil Litigation ──────────────────────────────────────────────
  "ca-civil-litigator": [
    "civil-complaint", "answer", "cross-complaint", "demurrer",
    "motion-to-strike", "motion-for-summary-judgment", "court-filing",
    "court-order", "court-notice", "minute-order", "judgment",
    "writ-of-execution", "notice-of-appeal", "appellate-brief",
    "request-for-admission", "interrogatories", "deposition-notice",
  ],

  // ── Discovery ─────────────────────────────────────────────────────────────
  "ca-discovery-specialist": [
    "subpoena", "subpoena-duces-tecum", "interrogatories",
    "request-for-admission", "request-for-production", "deposition-notice",
    "deposition-transcript", "meet-and-confer-letter", "privilege-log",
    "protective-order", "discovery-motion",
  ],

  // ── Consumer Protection ───────────────────────────────────────────────────
  "ca-consumer-protection-litigator": [
    "consumer-complaint", "dca-complaint", "ftc-complaint",
    "ucl-complaint", "clra-demand", "false-advertising-claim",
    "refund-demand", "warranty-claim", "lemon-law-filing",
    "auto-dealer-complaint", "credit-dispute",
  ],

  // ── Medical Malpractice ───────────────────────────────────────────────────
  "ca-medical-malpractice-litigator": [
    "medical-record", "medical-malpractice-complaint", "expert-declaration",
    "surgical-report", "hospital-discharge-summary", "informed-consent",
    "medical-authorization", "hipaa-release", "incident-report",
    "operative-report", "pathology-report", "radiology-report",
  ],

  // ── Medical Privacy ───────────────────────────────────────────────────────
  "ca-medical-privacy-officer": [
    "medical-record", "hipaa-release", "medical-authorization",
    "phi-disclosure-log", "breach-notification", "medical-privacy-complaint",
    "cmia-complaint",
  ],

  // ── Real Estate ───────────────────────────────────────────────────────────
  "ca-real-estate-attorney": [
    "deed", "grant-deed", "trust-deed", "purchase-agreement",
    "escrow-instruction", "title-report", "hoa-document",
    "residential-lease", "commercial-lease", "notice-to-quit",
    "unlawful-detainer-complaint", "real-estate-disclosure",
    "dre-filing", "1031-exchange",
  ],

  // ── Telecom & Privacy ─────────────────────────────────────────────────────
  "ca-telecom-privacy-litigator": [
    "phone-record", "call-log", "sim-swap-complaint",
    "carrier-disclosure", "cpuc-complaint", "fcc-complaint",
    "wiretap-complaint", "surveillance-record", "geolocation-record",
    "ecpa-request", "cipa-complaint",
  ],

  // ── Victim Compensation ───────────────────────────────────────────────────
  "ca-victim-compensation-litigator": [
    "calvcb-application", "victim-comp-form", "crime-report",
    "victim-declaration", "restitution-order", "calvcb-appeal",
    "victim-advocate-letter", "vcgcb-form",
  ],

  // ── Child Welfare ─────────────────────────────────────────────────────────
  "cps-auditor": [
    "cps-report", "child-welfare", "social-worker-report", "welfare-determination",
    "child-protective-services-filing", "dshs-form", "cws-report",
  ],

  // ── Family Court Services ─────────────────────────────────────────────────
  "marin-fcs-auditor": [
    "fcs-letter", "mediator-report", "minor-interview", "family-court-services",
  ],

  // ── Court Document Audit ──────────────────────────────────────────────────
  "court-document-auditor": [
    "court-filing", "court-order", "court-notice", "court-memo",
    "minute-order", "judgment",
  ],

  // ── US Federal Civil Rights (§ 1983 / Title VII) ─────────────────────────
  "us-federal-civil-rights-litigator": [
    "section-1983-complaint", "title-vi-complaint", "title-vii-complaint",
    "civil-rights-complaint", "ndca-filing", "federal-court-filing",
    "pro-se-complaint", "ifp-application", "habeas-petition",
    "federal-court-order", "ninth-circuit-brief",
  ],

  // ── US Federal Social Security ────────────────────────────────────────────
  "us-federal-social-security-litigator": [
    "ssa-form", "ssdi-application", "ssi-application", "ssa-denial",
    "ssa-appeal", "ssa-hearing-request", "alj-decision",
    "ssa-827", "ssa-3373", "ssa-3369", "ssa-16-bk",
    "representative-payee-form", "disability-evaluation",
  ],

  // ── US Federal ERISA / Pension ────────────────────────────────────────────
  "us-federal-erisa-litigator": [
    "pension-document", "erisa-complaint", "plan-document",
    "401k-statement", "pension-statement", "benefit-denial-letter",
    "dol-filing", "form-5500", "esop-document", "pension-audit",
  ],

  // ── US Federal Financial Fraud ────────────────────────────────────────────
  "us-federal-financial-fraud-litigator": [
    "financial-fraud-complaint", "wire-fraud-filing", "bank-record",
    "financial-statement", "sec-complaint", "fbi-tip", "doj-referral",
    "forensic-accounting-report", "suspicious-activity-report",
    "mortgage-fraud-filing", "identity-theft-complaint",
  ],

  // ── US Federal Housing ────────────────────────────────────────────────────
  "us-federal-housing-litigator": [
    "fha-complaint", "hud-complaint", "fair-housing-complaint",
    "housing-discrimination-charge", "section-8-document",
    "eviction-notice", "federal-housing-filing",
  ],

  // ── Federal & State Tax ───────────────────────────────────────────────────
  "us-federal-tax-litigator": [
    "irs-notice", "tax-court-petition", "irs-audit-response",
    "irs-lien", "irs-levy", "form-1040", "form-w-2", "form-1099",
    "irs-appeal", "offer-in-compromise", "tax-protest",
  ],
  "ca-tax-specialist": [
    "ftb-notice", "cdtfa-filing", "state-tax-return", "ftb-audit-response",
    "ftb-appeal", "boe-filing", "payroll-tax-filing",
  ],

  // ── Insurance ─────────────────────────────────────────────────────────────
  "ca-insurance-compliance-litigator": [
    "insurance-policy", "insurance-claim", "claim-denial-letter",
    "cdi-complaint", "bad-faith-complaint", "coverage-dispute",
    "subrogation-notice", "proof-of-loss",
  ],

  // ── Mental Health ─────────────────────────────────────────────────────────
  "ca-mental-health-litigator": [
    "5150-hold", "5250-hold", "mental-health-record",
    "psychiatric-evaluation", "lps-conservatorship", "mental-health-court-filing",
    "dmh-form", "voluntary-admission",
  ],

  // ── Elder Law ─────────────────────────────────────────────────────────────
  "ca-elder-law-litigator": [
    "elder-abuse-report", "adult-protective-services-report",
    "elder-abuse-complaint", "conservatorship-petition",
    "trust-document", "power-of-attorney", "advance-health-directive",
    "nursing-home-complaint",
  ],

  // ── Probate & Conservatorship ─────────────────────────────────────────────
  "ca-probate-conservatorship-litigator": [
    "conservatorship-petition", "probate-petition", "letters-conservatorship",
    "letters-testamentary", "will", "trust-document", "inventory-appraisal",
    "accounting", "capacity-declaration", "court-investigator-report",
    "probate-court-filing",
  ],

  // ── Conservatorship Investigation ────────────────────────────────────────
  "ca-conservator-investigator": [
    "conservatorship-investigation-report", "capacity-declaration",
    "court-investigator-report", "letters-conservatorship",
    "conservatorship-petition", "financial-account-record",
  ],

  // ── Disability Rights ─────────────────────────────────────────────────────
  "ca-disability-rights-litigator": [
    "ada-complaint", "section-504-complaint", "dds-form",
    "rehabilitation-act-complaint", "accommodation-request",
    "disability-discrimination-charge", "dfeh-disability-complaint",
  ],

  // ── Immigration ───────────────────────────────────────────────────────────
  "ca-immigration-litigator": [
    "i-485", "i-130", "i-765", "i-589", "i-751",
    "uscis-notice", "immigration-court-filing", "motion-to-reopen",
    "voluntary-departure", "removal-order", "asylum-application",
    "naturalization-application",
  ],

  // ── Vehicle Code ──────────────────────────────────────────────────────────
  "ca-vehicle-code-specialist": [
    "traffic-citation", "dmv-record", "dmv-suspension-notice",
    "sr-22", "vehicle-registration", "title-document",
    "accident-report", "dmv-hearing-request", "vc-violation",
  ],

  // ── Administrative Law ────────────────────────────────────────────────────
  "ca-administrative-law-specialist": [
    "oah-filing", "administrative-complaint", "oah-notice-of-hearing",
    "oah-proposed-decision", "administrative-subpoena",
    "agency-response", "administrative-appeal",
  ],

  // ── Healthcare Fraud ──────────────────────────────────────────────────────
  "ca-healthcare-fraud-litigator": [
    "medical-billing-record", "insurance-fraud-complaint",
    "medicare-billing-record", "medi-cal-claim", "upcoding-complaint",
    "cms-1500", "ub-04", "healthcare-fraud-referral",
  ],

  // ── Civil Rights (State) ──────────────────────────────────────────────────
  "ca-civil-rights-litigator": [
    "bane-act-complaint", "unruh-act-complaint", "cra-complaint",
    "section-52-complaint", "civil-rights-court-filing",
    "dfeh-complaint", "crd-complaint",
  ],
  "ca-civil-rights-compliance-specialist": [
    "ada-compliance-report", "title-ii-audit", "title-iii-audit",
    "section-504-compliance", "eeo-report", "civil-rights-compliance-filing",
  ],

  // ── Constitutional Law ────────────────────────────────────────────────────
  "ca-constitutional-law-specialist": [
    "constitutional-challenge", "petition-for-writ", "writ-of-mandate",
    "writ-of-prohibition", "demurrer-constitutional", "appellate-brief",
    "supreme-court-petition", "amicus-brief",
  ],
  "ca-first-amendment-litigator": [
    "first-amendment-complaint", "free-speech-filing", "press-credential-dispute",
    "prior-restraint-challenge", "defamation-complaint",
    "public-records-request", "pra-complaint",
  ],

  // ── Product Liability ─────────────────────────────────────────────────────
  "ca-product-liability-litigator": [
    "product-liability-complaint", "recall-notice", "cpsc-complaint",
    "defective-product-claim", "strict-liability-complaint",
    "products-liability-expert-report",
  ],

  // ── Building, Land Use, Environmental ────────────────────────────────────
  "ca-building-official": [
    "building-permit", "code-enforcement-notice", "stop-work-order",
    "certificate-of-occupancy", "inspection-report", "plan-check",
    "code-violation-notice",
  ],
  "ca-structural-engineer": [
    "structural-report", "engineering-declaration", "soils-report",
    "seismic-report", "structural-inspection", "calcs",
  ],
  "ca-licensed-contractor": [
    "cslb-license", "contractor-agreement", "lien-release",
    "mechanics-lien", "notice-of-completion", "change-order",
    "subcontractor-agreement",
  ],
  "ca-ceqa-consultant": [
    "ceqa-document", "eir", "mitigated-negative-declaration",
    "notice-of-determination", "notice-of-exemption", "ceqa-comment",
  ],
  "ca-energy-policy-specialist": [
    "cpuc-filing", "puc-application", "utility-tariff",
    "energy-contract", "net-metering-application", "solar-permit",
  ],

  // ── Food & Weights/Measures ───────────────────────────────────────────────
  "ca-food-safety-specialist": [
    "food-safety-inspection", "food-facility-permit", "cdfa-report",
    "fda-complaint", "recall-notice", "food-violation-notice",
  ],
  "ca-retail-food-inspector": [
    "restaurant-inspection-report", "retail-food-permit",
    "health-code-violation", "cdph-report",
  ],
  "ca-weights-measures-inspector": [
    "weights-measures-inspection", "scale-certification",
    "measurement-violation-notice", "cdfa-wm-report",
  ],

  // ── Platform Compliance Personas ──────────────────────────────────────────
  "regulis":   ["court-filing", "court-order", "compliance-rule", "regulation-document"],
  "advocis":   ["legal-brief", "court-filing", "advocacy-document", "court-notice"],
  "lexarc":    ["court-filing", "legal-research", "case-law-document"],
  "syntara":   ["contract", "agreement", "stipulation", "nda"],
  "fiscara":   ["financial-statement", "tax-document", "accounting-record", "form-w-2", "form-1099"],
  "integra":   ["audit-report", "compliance-report", "internal-controls-report"],
  "vigilus":   ["incident-report", "security-report", "risk-assessment"],
  "ethicara":  ["ethics-complaint", "code-of-conduct", "ethics-policy"],
  "privaxis":  ["privacy-policy", "gdpr-document", "hipaa-document", "data-breach-notice"],
  "vestara":   ["real-estate-document", "deed", "title-report", "lease"],
  "metriqa":   ["audit-report", "performance-report", "compliance-metrics"],
  "claridex":  ["regulatory-guidance", "compliance-advisory", "policy-document"],
  "nexaris":   ["network-document", "it-policy", "cybersecurity-report"],
  "facialex":  ["identity-document", "biometric-record", "authentication-record"],

  // ── Qui Tam / Whistleblower (Council Seat 5) ──────────────────────────────
  "delator": [
    "qui-tam-complaint", "fca-disclosure", "fca-sealed-complaint",
    "relator-disclosure-statement", "medicare-billing-record", "medi-cal-claim",
    "cms-1500", "ub-04", "healthcare-fraud-referral", "medical-billing-record",
    "false-claims-complaint", "whistleblower-complaint", "irs-form-211",
    "sec-whistleblower-tip", "erisa-complaint", "pension-document",
    "dol-form-5500", "ssdi-application", "ssa-denial", "form-w-2",
    "upcoding-complaint", "retaliation-complaint", "anti-retaliation-filing",
  ],
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

export type CUSTOSJurisdiction =
  | "CA_TRIAL"
  | "NDCA"
  | "FED_APPELLATE"
  | "NLRB"
  | "EEOC"
  | "VA"
  | "SSA"
  | "WCAB"
  | "UNKNOWN";

export interface CUSTOSExamInput {
  documentType?: string;
  jurisdiction?: string;
  /** Explicit jurisdiction override. If not provided, CUSTOS infers from jurisdiction string. */
  jurisdictionKey?: CUSTOSJurisdiction;
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
  // Layer 7 — additional physical checks
  linesPerPage?: number;
  // Electronic filing flags
  isElectronicFiling?: boolean;
  fileSizeMb?: number;
  isTextSearchable?: boolean;
  hasBookmarks?: boolean;
  isPdf?: boolean;
  // Penalty of perjury flag — determines which signature standard applies
  signedUnderPenaltyOfPerjury?: boolean;
  // Layer 6 — Content Integrity
  // Caller extracts these fields from document content and passes them to CUSTOS.
  // CUSTOS validates internal consistency — it does not read document content directly.
  hasInternalContradictions?: boolean;  // Caller-flagged from content analysis
  contentHashSha256?: string;           // SHA-256 of document content at time of intake
  // Structured content fields for consistency checking
  caseNumber?: string;
  partyNamesPlaintiff?: string[];
  partyNamesDefendant?: string[];
  reportingOfficerName?: string;
  reportingOfficerId?: string;
  claimantName?: string;
  documentTitle?: string;
  statedJurisdiction?: string;   // Jurisdiction stated IN the document (vs. jurisdictionKey passed by caller)
  statedDocumentDate?: string;   // Date stated on face of document
  statedFiledDate?: string;      // Filed date stated on face of document
  statedCaseNumber?: string;     // Case number stated on face of document
  // Cross-document set fields (used by examineSet())
  setId?: string;                // Group identifier for documents in the same submission set
}

export interface CUSTOSLayerResult {
  layer: number;
  name: string;
  pass: boolean;
  findings: string[];
}

export interface CUSTOSSetExamResult {
  setId: string;
  documentCount: number;
  passed: boolean;
  contradictions: string[];
  warnings: string[];
  examinedAt: string;
}

export interface CUSTOSStructuralExam {
  passed: boolean;
  layers: CUSTOSLayerResult[];
  routedAgent: string;
  naicsCode: string;
  naicsSector: string;
  jurisdictionResolved: CUSTOSJurisdiction;
  jurisdictionLabel: string;
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
  static readonly VERSION = "2.0.0";

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
   * Resolve the applicable jurisdiction ruleset from document metadata.
   * Called automatically by examine() — can also be called independently.
   *
   * Resolution order:
   *   1. Explicit jurisdictionKey on input
   *   2. Inferred from jurisdiction string (e.g. "NDCA", "Northern District", "California")
   *   3. UNKNOWN — examination proceeds with no physical standard checks
   */
  static resolveJurisdiction(input: CUSTOSExamInput): CUSTOSJurisdiction {
    if (input.jurisdictionKey) return input.jurisdictionKey;

    const j = (input.jurisdiction ?? "").toLowerCase();

    if (j.includes("northern district") || j.includes("ndca") || j.includes("n.d. cal")) {
      return "NDCA";
    }
    if (j.includes("9th circuit") || j.includes("ninth circuit") || j.includes("court of appeals")) {
      return "FED_APPELLATE";
    }
    if (j.includes("nlrb") || j.includes("national labor relations")) {
      return "NLRB";
    }
    if (j.includes("eeoc") || j.includes("equal employment opportunity")) {
      return "EEOC";
    }
    if (j.includes("department of veterans") || j.includes(" va ") || j.includes("veterans affairs") || j.startsWith("va")) {
      return "VA";
    }
    if (j.includes("social security") || j.includes(" ssa") || j.includes("disability insurance")) {
      return "SSA";
    }
    if (j.includes("wcab") || j.includes("workers compensation appeals") || j.includes("workers' compensation appeals")) {
      return "WCAB";
    }
    if (j.includes("california") || j.includes("alameda") || j.includes("contra costa") ||
        j.includes("solano") || j.includes("marin") || j.includes("san francisco") ||
        j.includes("superior court")) {
      return "CA_TRIAL";
    }

    return "UNKNOWN";
  }

  /**
   * Structural examination against the 7-Level Compliance Stack.
   * CUSTOS owns Levels 2-7. Level 1 (S.o.C.) is delegated to the routed agent.
   * See ~/citizens/_COMPLIANCE_STACK.md for canonical stack definition.
   *
   * This is the structural gate — lightweight, fast, runs before any Citizen
   * receives the document. A failed exam does not throw; it returns a result
   * with passed=false so the caller can decide to block or flag.
   */
  static examine(input: CUSTOSExamInput): CUSTOSStructuralExam {
    const layers: CUSTOSLayerResult[] = [];
    const redFlags: string[] = [];

    // Resolve jurisdiction before any layer runs — every check uses the correct ruleset
    const jurisdictionResolved = CUSTOS.resolveJurisdiction(input);
    const agencyKeys = ["NLRB", "EEOC", "VA", "SSA", "WCAB"] as const;
    const isAgencyJx = (agencyKeys as readonly string[]).includes(jurisdictionResolved);
    const jurisdictionLabel = jurisdictionResolved === "UNKNOWN"
      ? "Unknown — no jurisdiction-specific rules applied"
      : isAgencyJx
        ? PHYSICAL_DEFAULTS.agencies[jurisdictionResolved as keyof typeof PHYSICAL_DEFAULTS.agencies].label
        : PHYSICAL_DEFAULTS.jurisdictions[jurisdictionResolved as keyof typeof PHYSICAL_DEFAULTS.jurisdictions].label;

    // Layer 7 — Output (physical presentation)
    const l7 = CUSTOS._examLayer7(input, jurisdictionResolved);
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
    const l3 = CUSTOS._examLayer3(input, jurisdictionResolved);
    layers.push(l3);
    redFlags.push(...l3.findings.filter(f => f.startsWith("RED FLAG")));

    // Layer 2 — Jurisdictional
    const l2 = CUSTOS._examLayer2(input, jurisdictionResolved);
    layers.push(l2);

    const routing = CUSTOS.route(input.documentType);
    const passed = layers.every(l => l.pass);

    return {
      passed,
      layers,
      routedAgent: routing.agent,
      naicsCode: routing.naics,
      naicsSector: routing.sector,
      jurisdictionResolved,
      jurisdictionLabel,
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

  private static _examLayer7(input: CUSTOSExamInput, jx: CUSTOSJurisdiction): CUSTOSLayerResult {
    const findings: string[] = [];
    const isAgency = ["NLRB", "EEOC", "VA", "SSA", "WCAB"].includes(jx);
    const agencyRules = isAgency ? PHYSICAL_DEFAULTS.agencies[jx as keyof typeof PHYSICAL_DEFAULTS.agencies] : null;
    const jxRules = !isAgency && jx !== "UNKNOWN"
      ? PHYSICAL_DEFAULTS.jurisdictions[jx as keyof typeof PHYSICAL_DEFAULTS.jurisdictions]
      : null;

    if (jx === "UNKNOWN") {
      findings.push("NOTICE: Jurisdiction unknown — physical standard checks skipped. Declare jurisdiction to enable Layer 7 audit.");
      return { layer: 7, name: "Output Layer", pass: true, findings };
    }

    // Agency with no physical format mandate — skip physical checks, note the sourced finding
    if (isAgency && agencyRules && (agencyRules.physicalFormat as Record<string, unknown>).explicit === false) {
      const note = (agencyRules.physicalFormat as Record<string, unknown>).note as string;
      findings.push(`NOTICE: ${agencyRules.label} — ${note}`);
      if (jx === "NLRB") {
        // NLRB is the exception — it DOES have physical format requirements
      } else {
        return { layer: 7, name: "Output Layer", pass: true, findings };
      }
    }

    // NLRB has explicit physical format requirements — apply them
    if (jx === "NLRB") {
      const nlrb = PHYSICAL_DEFAULTS.agencies.NLRB.physicalFormat;
      if (input.pageWidthIn !== undefined && input.pageHeightIn !== undefined) {
        const ok = CUSTOS._within(input.pageWidthIn, nlrb.paperSize.widthIn, 2) &&
                   CUSTOS._within(input.pageHeightIn, nlrb.paperSize.heightIn, 2);
        if (!ok) findings.push(`RED FLAG: Non-standard page size ${input.pageWidthIn}" x ${input.pageHeightIn}". Required: 8.5" x 11" per ${nlrb.paperSize.source}.`);
      }
      if (input.marginLeftIn !== undefined && input.marginLeftIn < nlrb.margins.allSidesMinIn) {
        findings.push(`RED FLAG: Left margin ${input.marginLeftIn}" below 1-inch minimum per ${nlrb.margins.source}.`);
      }
      if (input.marginRightIn !== undefined && input.marginRightIn < nlrb.margins.allSidesMinIn) {
        findings.push(`RED FLAG: Right margin ${input.marginRightIn}" below 1-inch minimum per ${nlrb.margins.source}.`);
      }
      if (input.fontSizePt !== undefined && input.fontSizePt < 12) {
        findings.push(`RED FLAG: Font size ${input.fontSizePt}pt below 12pt minimum per ${nlrb.font.source}.`);
      }
      return { layer: 7, name: "Output Layer", pass: !findings.some(f => f.startsWith("RED FLAG")), findings };
    }

    if (!jxRules) {
      return { layer: 7, name: "Output Layer", pass: true, findings };
    }

    // Paper size — universal across all known jurisdictions: 8.5" x 11"
    if (input.pageWidthIn !== undefined && input.pageHeightIn !== undefined) {
      const ps = jxRules.paperSize;
      const ok = CUSTOS._within(input.pageWidthIn, ps.widthIn, PHYSICAL_DEFAULTS.paperSize.tolerancePct) &&
                 CUSTOS._within(input.pageHeightIn, ps.heightIn, PHYSICAL_DEFAULTS.paperSize.tolerancePct);
      if (!ok) {
        findings.push(
          `RED FLAG: Non-standard page size ${input.pageWidthIn}" x ${input.pageHeightIn}". ` +
          `Required: 8.5" x 11" per ${ps.source}.`
        );
      }
    }

    // Font size — jurisdiction-specific minimum
    if (input.fontSizePt !== undefined && "font" in jxRules) {
      const minPt = (jxRules.font as { minPt: number }).minPt;
      if (input.fontSizePt < minPt) {
        findings.push(
          `RED FLAG: Font size ${input.fontSizePt}pt is below the ${minPt}pt minimum per ${(jxRules.font as { source: string }).source}.`
        );
      }
    }

    // Margins — only check if jurisdiction explicitly mandates them
    if ("margins" in jxRules && (jxRules.margins as Record<string, unknown>).explicit !== false) {
      const m = jxRules.margins as Record<string, unknown>;
      if (input.marginLeftIn !== undefined && typeof m.leftMinIn === "number" &&
          input.marginLeftIn < m.leftMinIn) {
        findings.push(
          `RED FLAG: Left margin ${input.marginLeftIn}" below minimum ${m.leftMinIn}" per ${m.source}.`
        );
      }
      if (input.marginRightIn !== undefined && typeof m.rightMinIn === "number" &&
          input.marginRightIn < m.rightMinIn) {
        findings.push(
          `RED FLAG: Right margin ${input.marginRightIn}" below minimum ${m.rightMinIn}" per ${m.source}.`
        );
      }
      if (input.marginLeftIn !== undefined && typeof m.allSidesMinIn === "number" &&
          input.marginLeftIn < m.allSidesMinIn) {
        findings.push(
          `RED FLAG: Left margin ${input.marginLeftIn}" below minimum ${m.allSidesMinIn}" per ${m.source}.`
        );
      }
    }

    // Line spacing — jurisdiction-specific
    if (input.lineSpacing !== undefined && "lineSpacing" in jxRules) {
      const ls = jxRules.lineSpacing as Record<string, unknown>;
      const accepted = ls.accepted as readonly number[] | undefined;
      const required = ls.required as number | undefined;
      if (accepted && !(accepted as readonly number[]).includes(input.lineSpacing)) {
        findings.push(
          `Non-standard line spacing ${input.lineSpacing}. Required: ${accepted.join(" or ")} per ${ls.source}.`
        );
      } else if (required !== undefined && input.lineSpacing < required) {
        findings.push(
          `Non-standard line spacing ${input.lineSpacing}. Required: ${required} per ${ls.source}.`
        );
      }
    }

    // NDCA-specific: lines per page cap
    if (jx === "NDCA" && input.linesPerPage !== undefined) {
      const ndca = PHYSICAL_DEFAULTS.jurisdictions.NDCA;
      if (input.linesPerPage > ndca.lineSpacing.maxLinesPerPage) {
        findings.push(
          `RED FLAG: ${input.linesPerPage} lines per page exceeds maximum ${ndca.lineSpacing.maxLinesPerPage} per ${ndca.lineSpacing.source}.`
        );
      }
    }

    return { layer: 7, name: "Output Layer", pass: !findings.some(f => f.startsWith("RED FLAG")), findings };
  }

  /**
   * Examine a set of documents for cross-document consistency.
   * All documents in a set must share the same setId.
   *
   * Legal basis: Cal. Evid. Code § 1400 — authentication requires sufficient evidence
   * that a writing is what its proponent claims. Fed. R. Evid. 901(b)(4) — distinctive
   * characteristics and internal patterns may authenticate or impeach a document.
   * Inconsistencies across a document set are grounds for authentication challenge.
   */
  static examineSet(inputs: CUSTOSExamInput[]): CUSTOSSetExamResult {
    const setId = inputs[0]?.setId ?? `set-${Date.now()}`;
    const contradictions: string[] = [];
    const warnings: string[] = [];

    if (inputs.length < 2) {
      warnings.push("NOTICE: Set examination requires at least 2 documents. Single document returned without cross-document checks.");
      return { setId, documentCount: inputs.length, passed: true, contradictions, warnings, examinedAt: new Date().toISOString() };
    }

    // Case number consistency across set
    // BASIS: Cal. Evid. Code § 1400 — document must be what it claims to be.
    // Differing case numbers within a set submitted as a single matter is an
    // authentication challenge requiring explanation.
    const caseNumbers = inputs.map(d => d.statedCaseNumber ?? d.caseNumber).filter(Boolean);
    const uniqueCaseNums = new Set(caseNumbers);
    if (uniqueCaseNums.size > 1) {
      contradictions.push(
        `RED FLAG: Multiple case numbers detected across document set (${[...uniqueCaseNums].join(", ")}). ` +
        `Documents submitted as a single matter must share a case number or the variance must be explained. ` +
        `Basis: Cal. Evid. Code § 1400 — authentication challenge.`
      );
    }

    // Party name consistency across set
    // BASIS: Fed. R. Evid. 901(b)(4) — internal patterns and distinctive characteristics
    // taken together with all circumstances. Party name variance across a set is a
    // distinctive characteristic inconsistency.
    const allPlaintiffs = inputs.flatMap(d => d.partyNamesPlaintiff ?? []);
    const allDefendants = inputs.flatMap(d => d.partyNamesDefendant ?? []);
    const uniquePlaintiffs = new Set(allPlaintiffs.map(n => n.toLowerCase().trim()));
    const uniqueDefendants = new Set(allDefendants.map(n => n.toLowerCase().trim()));
    if (allPlaintiffs.length > 0 && uniquePlaintiffs.size > inputs.filter(d => d.partyNamesPlaintiff?.length).length) {
      warnings.push(
        `NOTICE: Plaintiff/claimant name variants detected across document set (${[...uniquePlaintiffs].join("; ")}). ` +
        `Verify name consistency. Basis: Fed. R. Evid. 901(b)(4).`
      );
    }
    if (allDefendants.length > 0 && uniqueDefendants.size > inputs.filter(d => d.partyNamesDefendant?.length).length) {
      warnings.push(
        `NOTICE: Defendant/respondent name variants detected across document set (${[...uniqueDefendants].join("; ")}). ` +
        `Verify name consistency. Basis: Fed. R. Evid. 901(b)(4).`
      );
    }

    // Temporal sequence across set — documents must be internally dated in a plausible order
    // BASIS: Cal. Penal Code § 134 — ante-dated documents prepared with fraudulent intent
    // constitute a felony. Temporal anomalies are the primary forensic signal of ante-dating.
    const datedDocs = inputs
      .filter(d => d.statedDocumentDate || d.documentDate)
      .map(d => ({ date: d.statedDocumentDate ?? d.documentDate!, type: d.documentType ?? "unknown" }))
      .sort((a, b) => a.date.localeCompare(b.date));

    for (let i = 1; i < datedDocs.length; i++) {
      const prev = datedDocs[i - 1]!;
      const curr = datedDocs[i]!;
      if (curr.date < prev.date) {
        contradictions.push(
          `RED FLAG: Temporal anomaly — "${curr.type}" (${curr.date}) precedes "${prev.type}" (${prev.date}) ` +
          `in the submitted sequence. Ante-dating is a felony under Cal. Penal Code § 134 when prepared ` +
          `with intent to produce as genuine in any proceeding authorized by law.`
        );
      }
    }

    // Jurisdiction consistency — all docs in set should share jurisdiction or explain variance
    const jurisdictions = inputs.map(d => d.statedJurisdiction ?? d.jurisdiction).filter(Boolean);
    const uniqueJx = new Set(jurisdictions);
    if (uniqueJx.size > 1) {
      warnings.push(
        `NOTICE: Multiple jurisdictions across document set (${[...uniqueJx].join(", ")}). ` +
        `Cross-jurisdictional document sets require explanation of venue basis.`
      );
    }

    // Content hash presence check — each document in a set should be individually hashed
    // BASIS: Cal. Evid. Code § 1530-1532 — certified copies of official records establish
    // authenticity. SHA-256 is the equivalent digital certification.
    const unhashed = inputs.filter(d => !d.contentHashSha256);
    if (unhashed.length > 0) {
      warnings.push(
        `NOTICE: ${unhashed.length} of ${inputs.length} documents lack SHA-256 content hashes. ` +
        `Unverified documents cannot establish chain of custody equivalent to certified copies ` +
        `under Cal. Evid. Code § 1530–1532.`
      );
    }

    return {
      setId,
      documentCount: inputs.length,
      passed: contradictions.length === 0,
      contradictions,
      warnings,
      examinedAt: new Date().toISOString(),
    };
  }

  private static _examLayer6(input: CUSTOSExamInput): CUSTOSLayerResult {
    const findings: string[] = [];

    // Caller-flagged internal contradictions
    // BASIS: Cal. Evid. Code § 1400 — a writing must be what its proponent claims.
    // Internal contradictions undermine authentication.
    if (input.hasInternalContradictions === true) {
      findings.push(
        `RED FLAG: Caller-flagged internal contradictions detected in document content. ` +
        `Authentication challenged under Cal. Evid. Code § 1400 — document may not be ` +
        `what its proponent claims it is.`
      );
    }

    // Content hash — chain of custody
    // BASIS: Cal. Evid. Code §§ 1530–1532 — certified copies of official records establish
    // authenticity. SHA-256 hash is the digital equivalent of certification.
    if (!input.contentHashSha256) {
      findings.push(
        `NOTICE: No SHA-256 content hash provided. Document integrity cannot be independently ` +
        `verified. Without a hash, any alteration after intake is undetectable. ` +
        `Equivalent to an uncertified copy under Cal. Evid. Code § 1530.`
      );
    }

    // Stated fields vs. passed fields — catch mismatches between what the doc says and what the caller says
    // BASIS: Fed. R. Evid. 901(b)(4) — internal patterns and distinctive characteristics.
    // A document whose stated case number differs from the case number the caller assigned
    // is a distinctive inconsistency requiring explanation.
    if (input.statedCaseNumber && input.caseNumber &&
        input.statedCaseNumber.trim() !== input.caseNumber.trim()) {
      findings.push(
        `RED FLAG: Case number mismatch — document states "${input.statedCaseNumber}" but ` +
        `caller assigned "${input.caseNumber}". ` +
        `Distinctive characteristics inconsistency per Fed. R. Evid. 901(b)(4).`
      );
    }

    if (input.statedDocumentDate && input.documentDate &&
        input.statedDocumentDate !== input.documentDate) {
      findings.push(
        `RED FLAG: Document date mismatch — face of document states "${input.statedDocumentDate}" ` +
        `but metadata shows "${input.documentDate}". ` +
        `Ante-dating is a felony under Cal. Penal Code § 134 when prepared with fraudulent intent.`
      );
    }

    if (input.statedJurisdiction && input.jurisdiction &&
        input.statedJurisdiction.toLowerCase() !== input.jurisdiction.toLowerCase()) {
      findings.push(
        `NOTICE: Jurisdiction mismatch — document states "${input.statedJurisdiction}" but ` +
        `caller declared "${input.jurisdiction}". Verify venue authority.`
      );
    }

    // Filed date before document date — impossible without ante-dating
    // BASIS: Cal. Penal Code § 134 — ante-dated documents with fraudulent intent = felony.
    if (input.statedFiledDate && input.statedDocumentDate &&
        input.statedFiledDate < input.statedDocumentDate) {
      findings.push(
        `RED FLAG: Filed date (${input.statedFiledDate}) precedes document date (${input.statedDocumentDate}). ` +
        `A document cannot be filed before it exists. Ante-dating indicator per Cal. Penal Code § 134.`
      );
    }

    return {
      layer: 6,
      name: "Content Integrity Layer",
      pass: !findings.some(f => f.startsWith("RED FLAG")),
      findings,
    };
  }

  private static _examLayer5(input: CUSTOSExamInput): CUSTOSLayerResult {
    const findings: string[] = [];

    // ── Metadata temporal integrity ─────────────────────────────────────────
    if (!input.documentDate) {
      findings.push("NOTICE: No document date provided. Temporal sequence cannot be verified.");
    }
    if (input.modifiedAt && input.createdAt && input.modifiedAt < input.createdAt) {
      findings.push("RED FLAG: Modified date precedes created date — metadata anomaly indicative of tampering.");
    }
    if (input.filedDate && input.documentDate && input.filedDate < input.documentDate) {
      findings.push("RED FLAG: Filed date precedes document date — impossible sequence. Ante-dating indicator per Cal. Penal Code § 134.");
    }

    // ── Jurisdiction-specific filing deadline awareness ─────────────────────
    // CUSTOS does not calculate deadlines — it flags the applicable statute and
    // delivers the sourced rule so the caller and agent can evaluate timeliness.
    // Calculation requires knowing the precise accrual date, which CUSTOS does
    // not receive. Source citation is the output; timeliness determination is Layer 1.

    const jx = CUSTOS.resolveJurisdiction(input);

    if (jx === "NLRB") {
      findings.push(
        `TEMPORAL RULE (NLRB): ULP charges must be filed within 180 days (6 months) of the unfair ` +
        `labor practice. Period is jurisdictional — late filing bars the charge absolutely. ` +
        `Source: ${FILING_DEADLINES.NLRB_ULP.source}.`
      );
    }

    if (jx === "EEOC") {
      findings.push(
        `TEMPORAL RULE (EEOC): Charge must be filed within 180 days of the unlawful employment ` +
        `practice (no state deferral agency) or 300 days (with qualifying state/local deferral agency — ` +
        `California DFEH/CRD qualifies). Source: ${FILING_DEADLINES.EEOC_WITH_STATE_AGENCY.source}.`
      );
    }

    if (jx === "WCAB") {
      findings.push(
        `TEMPORAL RULE (WCAB): Claims must be filed within 1 year of the latest of: ` +
        `(a) date of injury, (b) expiration of temporary disability period, or ` +
        `(c) last date benefits were furnished. Source: ${FILING_DEADLINES.CA_WCAB.source}.`
      );
    }

    if (jx === "CA_TRIAL" || jx === "UNKNOWN") {
      const dt = input.documentType ?? "";
      if (dt.includes("personal-injury") || dt.includes("assault") || dt.includes("battery")) {
        findings.push(
          `TEMPORAL RULE (CA Personal Injury): 2-year statute of limitations from date of injury. ` +
          `Source: ${FILING_DEADLINES.CA_PERSONAL_INJURY.source}.`
        );
      }
      if (dt.includes("fraud")) {
        findings.push(
          `TEMPORAL RULE (CA Fraud): 3-year statute of limitations from DISCOVERY of facts ` +
          `constituting fraud. Discovery rule applies — accrual begins when aggrieved party ` +
          `discovered or should have discovered the fraud. ` +
          `Source: ${FILING_DEADLINES.CA_FRAUD.source}.`
        );
      }
      if (dt.includes("government") || dt.includes("public-entity") || dt.includes("police") || dt.includes("county") || dt.includes("city")) {
        findings.push(
          `TEMPORAL RULE (CA Government Tort): Claim against public entity must be presented ` +
          `within 6 months of accrual BEFORE filing suit. Failure bars suit. ` +
          `Source: ${FILING_DEADLINES.CA_GOVERNMENT_TORT.source}.`
        );
      }
    }

    if (jx === "NDCA" || jx === "FED_APPELLATE") {
      const dt = input.documentType ?? "";
      if (dt.includes("1983") || dt.includes("civil-rights")) {
        findings.push(
          `TEMPORAL RULE (§ 1983 Federal): 2-year limitations period borrowed from Cal. CCP § 335.1 ` +
          `per Wilson v. Garcia, 471 US 261 (1985). Accrual under federal law: when plaintiff knows ` +
          `or has reason to know of the constitutional violation. ` +
          `Source: ${FILING_DEADLINES.CA_SECTION_1983_FEDERAL.source}.`
        );
      }
    }

    return { layer: 5, name: "Temporal Layer", pass: !findings.some(f => f.startsWith("RED FLAG")), findings };
  }

  private static _examLayer4(input: CUSTOSExamInput): CUSTOSLayerResult {
    const findings: string[] = [];

    // Physical signature check
    if (input.hasSignature === false) {
      findings.push("RED FLAG: No signature detected. Document may lack authentication.");
    }
    if (input.signatureCount !== undefined && input.signatureCount === 0) {
      findings.push("RED FLAG: Zero signatures on a document that requires authentication.");
    }

    // Electronic signature standard — CRC Rule 2.257
    if (input.isElectronicFiling && input.hasSignature) {
      const efiling = PHYSICAL_DEFAULTS.electronicFiling.CA_TRIAL_EFILING.signatures;
      if (input.signedUnderPenaltyOfPerjury) {
        // CRC Rule 2.257(b): must meet 4-element test OR be a pre-signed physical original
        findings.push(
          `NOTICE: Document signed under penalty of perjury — electronic signature must satisfy ` +
          `all four requirements of CRC Rule 2.257(b): ` +
          efiling.penaltyOfPerjury.electronicSignatureRequirements.join("; ") + `. ` +
          `Alternative: file a previously physically signed document (original producible within 5 days on demand).`
        );
      } else {
        // CRC Rule 2.257(c)/(d): deemed signed by electronic filer; digital sig not required
        findings.push(
          `Document not signed under penalty of perjury: deemed signed by electronic filer upon filing. ` +
          `Digital signature not required per CRC Rule 2.257(d).`
        );
      }
    }

    // Cal. Gov. Code § 16.5 digital signature — if digital sig is used
    if (input.hasSignature && input.isElectronicFiling) {
      findings.push(
        `If a digital signature is used: must comply with Cal. Gov. Code § 16.5 ` +
        `(unique, verifiable, sole-controlled, alteration-invalidated, SoS-compliant).`
      );
    }

    return { layer: 4, name: "Authentication Layer", pass: !findings.some(f => f.startsWith("RED FLAG")), findings };
  }

  private static _examLayer3(input: CUSTOSExamInput, jx?: CUSTOSJurisdiction): CUSTOSLayerResult {
    const findings: string[] = [];

    if (!input.documentType) {
      findings.push("NOTICE: Document type not declared. Procedural requirements cannot be mapped.");
    }

    if (input.isElectronicFiling) {
      // Electronic filing format checks — CRC Rule 2.256 / 2.257 / Rule 8.74
      if (input.isPdf === false) {
        findings.push(
          `RED FLAG: Electronic filing must be in PDF format per CRC Rule 2.256(b)(1). ` +
          `Non-PDF format will be rejected by the EFM.`
        );
      }
      if (input.isTextSearchable === false) {
        findings.push(
          `RED FLAG: Electronically filed PDF must be text-searchable when technologically feasible ` +
          `per CRC Rule 2.256(b)(3). Non-searchable PDFs require justification.`
        );
      }

      // File size — appellate has hard CRC limit; trial is court-specific
      if (jx === "FED_APPELLATE" || jx === "CA_TRIAL") {
        const limit = jx === "FED_APPELLATE"
          ? PHYSICAL_DEFAULTS.electronicFiling.CA_APPELLATE_EFILING.fileSize.maxMbPerFile
          : PHYSICAL_DEFAULTS.electronicFiling.CA_TRIAL_EFILING.fileSize.commonLimitMbPerDoc;
        if (input.fileSizeMb !== undefined && input.fileSizeMb > limit) {
          findings.push(
            `RED FLAG: File size ${input.fileSizeMb}MB exceeds the ${limit}MB ` +
            `${jx === "FED_APPELLATE" ? "CRC Rule 8.74 hard limit" : "common court EFM limit"}. ` +
            `Document must be split into multiple files with cover pages.`
          );
        }
      }

      // Appellate-specific: bookmarks required per CRC Rule 8.74
      if (jx === "FED_APPELLATE" && input.hasBookmarks === false) {
        findings.push(
          `RED FLAG: Appellate electronic filing requires electronic bookmarks for each heading, ` +
          `subheading, and first page of each component per CRC Rule 8.74.`
        );
      }

      findings.push(
        `Electronic filing procedural requirements: ` +
        `(1) Filer responsible for virus-free submission (CRC Rule 2.256(a)(3)). ` +
        `(2) Electronic service address must be furnished and kept current (CRC Rule 2.256(a)(4)-(5)). ` +
        `(3) Filing deemed received at time of court confirmation per CRC Rule 2.259.`
      );
    }

    return { layer: 3, name: "Procedural Layer", pass: !findings.some(f => f.startsWith("RED FLAG")), findings };
  }

  private static _examLayer2(input: CUSTOSExamInput, jx: CUSTOSJurisdiction): CUSTOSLayerResult {
    const findings: string[] = [];
    if (!input.jurisdiction) {
      findings.push("NOTICE: Jurisdiction not declared. Venue requirements cannot be verified.");
    } else if (jx === "UNKNOWN") {
      findings.push(`NOTICE: Jurisdiction "${input.jurisdiction}" could not be mapped to a known ruleset. ` +
        `Physical standard checks were skipped. Add jurisdiction mapping to CUSTOS.resolveJurisdiction() to enable.`);
    } else {
      const agencyKeys = ["NLRB", "EEOC", "VA", "SSA", "WCAB"] as const;
      const isAgency = (agencyKeys as readonly string[]).includes(jx);
      if (isAgency) {
        const rules = PHYSICAL_DEFAULTS.agencies[jx as keyof typeof PHYSICAL_DEFAULTS.agencies];
        findings.push(`Agency jurisdiction resolved: ${rules.label} — rules applied per ${rules.authority}.`);
      } else {
        const rules = PHYSICAL_DEFAULTS.jurisdictions[jx as keyof typeof PHYSICAL_DEFAULTS.jurisdictions];
        findings.push(`Jurisdiction resolved: ${rules.label} — rules applied per ${rules.authority}.`);
      }
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

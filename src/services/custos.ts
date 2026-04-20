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

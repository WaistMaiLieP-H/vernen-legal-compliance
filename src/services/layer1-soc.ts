/**
 * Layer 1 — Statutory S.o.C. (Source of Creation) Registry
 * Vernen Legal Compliance System
 *
 * PURPOSE:
 *   CUSTOS clears documents structurally (Layers 2-7) then hands off to an
 *   industry agent. The agent's FIRST question is always Layer 1:
 *   "What statute, rule, or authority REQUIRED or AUTHORIZED this document?"
 *
 *   This registry answers that question from primary source only.
 *   Every entry cites the exact statute, CFR section, or court rule.
 *   No invented authority. No best-guess citations.
 *
 *   An agent that cannot answer Layer 1 cannot audit the document.
 *   A document with no Layer 1 source cannot be authenticated.
 *
 * STRUCTURE:
 *   Each entry maps a document type → one or more governing authorities.
 *   An authority is the legal source that REQUIRES the document to exist,
 *   or that AUTHORIZES the issuing body to create it.
 *
 * USAGE:
 *   import { LAYER1_SOC } from "./layer1-soc.js";
 *   const soc = LAYER1_SOC.lookup("police-report");
 *   // → { authorities: [...], layer1Pass: (doc) => boolean }
 *
 * © 2024-2026 Michael Vernen Thomas Hartmann. All Rights Reserved.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface SoCAuthority {
  /** The exact statute, CFR section, rule, or case that creates this authority */
  citation: string;
  /** What it requires or authorizes — verbatim from the source or close paraphrase */
  mandate: string;
  /** Primary URL for the source text */
  sourceUrl?: string;
  /** Jurisdiction scope */
  jurisdiction: "CA" | "FEDERAL" | "FEDERAL_ADMIN" | "LOCAL" | "UNIVERSAL";
}

export interface SoCEntry {
  /** Human-readable document label */
  label: string;
  /** One or more statutes that create, require, or authorize this document */
  authorities: SoCAuthority[];
  /** What the absence of this document means legally */
  absenceSignificance?: string;
  /** Which agents can perform Layer 1 audit on this type */
  owningAgents: string[];
}

export interface SoCLookupResult {
  documentType: string;
  found: boolean;
  entry?: SoCEntry;
  layer1Pass: boolean;  // true if at least one authority is established
  missingAuthority?: string;  // populated when layer1Pass = false
}

// ─────────────────────────────────────────────────────────────────────────────
// Registry
// ─────────────────────────────────────────────────────────────────────────────

const REGISTRY: Record<string, SoCEntry> = {

  // ── Law Enforcement Documents ─────────────────────────────────────────────

  "police-report": {
    label: "Police Incident Report",
    authorities: [
      {
        citation: "Cal. Penal Code § 13650",
        mandate: "Law enforcement agencies required to report crime data to DOJ; incident reports are the source records.",
        jurisdiction: "CA",
      },
      {
        citation: "Cal. Gov. Code § 6254(f)",
        mandate: "Incident reports are public records subject to disclosure with specific exemptions. Their creation is an obligation of the investigating agency.",
        jurisdiction: "CA",
      },
      {
        citation: "Cal. Penal Code § 13519.4(e)",
        mandate: "Law enforcement required to keep records of all stops, detentions, and any actions taken.",
        jurisdiction: "CA",
      },
    ],
    absenceSignificance: "Absence of an incident report for a documented call for service is a records management anomaly. Under Cal. Gov. Code § 6254(f), agencies must maintain records of reported crimes.",
    owningAgents: ["forensic-police-report-auditor", "ca-law-enforcement-procedures-specialist"],
  },

  "cad-report": {
    label: "Computer-Aided Dispatch Log",
    authorities: [
      {
        citation: "Cal. Penal Code § 13650; CLETS Policy Manual §§ 4.1–4.3",
        mandate: "CAD systems are required by CLETS participation agreements. Dispatch records are the authoritative record of all calls for service received and units dispatched.",
        jurisdiction: "CA",
      },
    ],
    absenceSignificance: "Absence of a CAD log for a 911 call or reported incident is a records gap that contradicts the agency's CLETS obligations.",
    owningAgents: ["forensic-police-report-auditor", "ca-law-enforcement-procedures-specialist"],
  },

  "arrest-warrant": {
    label: "Arrest Warrant",
    authorities: [
      {
        citation: "Cal. Penal Code §§ 813–821",
        mandate: "A magistrate must issue a warrant on a showing of probable cause supported by sworn complaint. The warrant must name the defendant and describe the offense charged.",
        jurisdiction: "CA",
      },
      {
        citation: "U.S. Const. amend. IV; Fed. R. Crim. P. 4",
        mandate: "No warrant shall issue but upon probable cause, supported by oath or affirmation, describing the person to be seized.",
        jurisdiction: "FEDERAL",
      },
    ],
    absenceSignificance: "Arrest without warrant requires independent probable cause justification under Cal. Penal Code §§ 836–849. Warrantless arrest shifts constitutional burden to arresting agency.",
    owningAgents: ["ca-criminal-law-specialist", "ca-law-enforcement-procedures-specialist"],
  },

  "search-warrant": {
    label: "Search Warrant",
    authorities: [
      {
        citation: "Cal. Penal Code §§ 1523–1542",
        mandate: "A search warrant may be issued only upon probable cause supported by affidavit describing the place to be searched and items to be seized.",
        jurisdiction: "CA",
      },
      {
        citation: "U.S. Const. amend. IV; Fed. R. Crim. P. 41",
        mandate: "Warrants must be issued by a neutral magistrate upon probable cause, particularly describing place to be searched and things to be seized.",
        jurisdiction: "FEDERAL",
      },
    ],
    owningAgents: ["ca-criminal-law-specialist", "ca-law-enforcement-procedures-specialist"],
  },

  "dvro": {
    label: "Domestic Violence Restraining Order",
    authorities: [
      {
        citation: "Cal. Family Code §§ 6200–6460 (DVPA — Domestic Violence Prevention Act)",
        mandate: "A court may issue a protective order to prevent recurrence of domestic violence. Cal. Family Code § 6300 is the operative grant of authority.",
        jurisdiction: "CA",
      },
      {
        citation: "Cal. Family Code § 6322 (Ex Parte TRO)",
        mandate: "A court may issue an ex parte order without notice upon a showing that great or irreparable harm would result to the petitioner.",
        jurisdiction: "CA",
      },
    ],
    absenceSignificance: "A DVRO that does not comply with DVPA form requirements (FL-305, FL-306) is unenforceable. Unsigned or undated DVROs are facially defective.",
    owningAgents: ["ca-family-law-litigator"],
  },

  "fl-150": {
    label: "Income and Expense Declaration (FL-150)",
    authorities: [
      {
        citation: "Cal. Family Code § 2104; Cal. Rules of Court, Rule 5.427",
        mandate: "Parties in dissolution, legal separation, or nullity proceedings must serve a preliminary declaration of disclosure including an Income and Expense Declaration. CRC Rule 5.427 governs the form and content.",
        jurisdiction: "CA",
      },
    ],
    absenceSignificance: "Failure to serve or file FL-150 as required is grounds for sanctions under Cal. Family Code § 2107. Court cannot make support orders without a complete FL-150.",
    owningAgents: ["ca-family-law-litigator"],
  },

  // ── Criminal Law Documents ────────────────────────────────────────────────

  "criminal-complaint": {
    label: "Criminal Complaint",
    authorities: [
      {
        citation: "Cal. Penal Code §§ 806–815",
        mandate: "A complaint is a written statement of the essential facts constituting the offense charged, made under oath before a magistrate.",
        jurisdiction: "CA",
      },
      {
        citation: "Fed. R. Crim. P. 3",
        mandate: "A criminal proceeding is commenced by a complaint — a written statement of the essential facts constituting the offense charged, made under oath before a magistrate judge.",
        jurisdiction: "FEDERAL",
      },
    ],
    owningAgents: ["ca-criminal-law-specialist"],
  },

  "pitchess-motion": {
    label: "Pitchess Motion (Peace Officer Personnel Records)",
    authorities: [
      {
        citation: "Cal. Evidence Code §§ 1043–1047; Penal Code §§ 832.5–832.8",
        mandate: "A defendant seeking discovery of peace officer personnel records must file a Pitchess motion supported by good cause. The court reviews records in camera before ordering disclosure.",
        jurisdiction: "CA",
      },
      {
        citation: "Pitchess v. Superior Court, 11 Cal.3d 531 (1974)",
        mandate: "Established the defendant's right to discover relevant peace officer personnel records through a court-supervised process.",
        jurisdiction: "CA",
      },
    ],
    owningAgents: ["ca-criminal-law-specialist"],
  },

  "brady-demand": {
    label: "Brady/Giglio Discovery Demand",
    authorities: [
      {
        citation: "Brady v. Maryland, 373 US 83 (1963)",
        mandate: "Prosecution must disclose all material exculpatory evidence to the defense. Suppression violates due process regardless of good faith.",
        jurisdiction: "FEDERAL",
      },
      {
        citation: "Giglio v. United States, 405 US 150 (1972)",
        mandate: "Brady extends to impeachment evidence, including evidence affecting the credibility of prosecution witnesses.",
        jurisdiction: "FEDERAL",
      },
      {
        citation: "Cal. Penal Code § 1054.1",
        mandate: "Prosecution must disclose to defendant: statements of all defendants; felony convictions of material witnesses; physical evidence adverse to defendant; information favorable to defendant.",
        jurisdiction: "CA",
      },
    ],
    owningAgents: ["ca-criminal-law-specialist"],
  },

  "section-1001-petition": {
    label: "PC § 1001.36 Mental Health Diversion Petition",
    authorities: [
      {
        citation: "Cal. Penal Code § 1001.36",
        mandate: "A defendant charged with a qualifying misdemeanor or felony may be eligible for pretrial diversion if the offense is related to a mental disorder diagnosed by a mental health expert. The court may grant diversion and, upon completion, dismiss the charges.",
        jurisdiction: "CA",
      },
    ],
    owningAgents: ["ca-criminal-law-specialist", "ca-mental-health-litigator"],
  },

  // ── Labor & Employment ────────────────────────────────────────────────────

  "eeoc-charge": {
    label: "EEOC Charge of Discrimination",
    authorities: [
      {
        citation: "42 USC § 2000e-5(b)",
        mandate: "The EEOC shall receive, investigate, and attempt to eliminate unlawful employment practices. A charge must be filed before a civil action may be brought.",
        jurisdiction: "FEDERAL_ADMIN",
      },
      {
        citation: "29 CFR § 1601.9, § 1601.12",
        mandate: "Charge must be in writing, signed, and verified. Required contents include: full contact of charging party and respondent, clear statement of facts with dates, and number of employees (if known).",
        jurisdiction: "FEDERAL_ADMIN",
      },
    ],
    absenceSignificance: "Filing an EEOC charge is a mandatory prerequisite to filing a Title VII, ADA, ADEA, or GINA civil action in federal court. Exhaustion failure is a jurisdictional bar.",
    owningAgents: ["ca-labor-employment-litigator"],
  },

  "dfeh-complaint": {
    label: "DFEH/CRD Complaint of Discrimination",
    authorities: [
      {
        citation: "Cal. Government Code § 12960",
        mandate: "A person claiming to be aggrieved by an unlawful practice under FEHA must file a verified complaint with the Civil Rights Department (formerly DFEH) before bringing a civil action.",
        jurisdiction: "CA",
      },
      {
        citation: "Cal. Government Code § 12965",
        mandate: "An employee must obtain a Right-to-Sue notice from CRD before filing a FEHA civil action. Complaint must be filed within 3 years of the unlawful practice.",
        jurisdiction: "CA",
      },
    ],
    absenceSignificance: "DFEH/CRD exhaustion is a mandatory prerequisite for FEHA civil actions. Failure to exhaust is a complete defense.",
    owningAgents: ["ca-labor-employment-litigator", "ca-civil-rights-litigator"],
  },

  "wage-claim": {
    label: "DLSE Wage Claim (Berman Hearing)",
    authorities: [
      {
        citation: "Cal. Labor Code §§ 98–98.7",
        mandate: "The Labor Commissioner has jurisdiction to investigate and determine employee wage claims without resort to civil courts (Berman hearing). Employees may file a wage claim for unpaid wages, overtime, meal/rest period premiums.",
        jurisdiction: "CA",
      },
    ],
    owningAgents: ["ca-labor-employment-litigator"],
  },

  // ── Workers' Compensation ─────────────────────────────────────────────────

  "dwc-1-form": {
    label: "DWC-1 — Employee's Claim for Workers' Compensation Benefits",
    authorities: [
      {
        citation: "Cal. Labor Code § 5401",
        mandate: "Employer must provide the DWC-1 claim form to employee within one working day of learning of the injury or illness. Employee files completed form to initiate a workers' compensation claim.",
        jurisdiction: "CA",
      },
    ],
    absenceSignificance: "Employer failure to provide DWC-1 constitutes a Labor Code violation and may create presumption of compensability under Labor Code § 5402(b).",
    owningAgents: ["ca-workers-compensation-litigator"],
  },

  "qme-report": {
    label: "Qualified Medical Evaluator (QME) Report",
    authorities: [
      {
        citation: "Cal. Labor Code §§ 4060–4067",
        mandate: "When the parties dispute injury, treatment, or permanent disability, a QME selected from a panel randomly assigned by the Medical Unit of the DWC performs an examination and issues a report.",
        jurisdiction: "CA",
      },
      {
        citation: "8 CCR §§ 35–36.7 (QME regulations)",
        mandate: "QME reports must contain prescribed elements including a complete history, description of examination, diagnoses, work restrictions, and apportionment analysis.",
        jurisdiction: "CA",
      },
    ],
    owningAgents: ["ca-workers-compensation-litigator"],
  },

  // ── Family Law — Additional ───────────────────────────────────────────────

  "dissolution-filing": {
    label: "Petition for Dissolution of Marriage (FL-100)",
    authorities: [
      {
        citation: "Cal. Family Code §§ 2330–2337",
        mandate: "Either spouse may petition for dissolution on the ground of irreconcilable differences. The petition (FL-100) and summons (FL-110) initiate the proceeding.",
        jurisdiction: "CA",
      },
    ],
    owningAgents: ["ca-family-law-litigator"],
  },

  "custody-order": {
    label: "Child Custody Order",
    authorities: [
      {
        citation: "Cal. Family Code §§ 3000–3465",
        mandate: "The court shall make custody orders in the best interest of the child (§ 3011). Joint legal custody is presumed in contested cases absent evidence of domestic violence (§ 3080).",
        jurisdiction: "CA",
      },
    ],
    owningAgents: ["ca-family-law-litigator"],
  },

  // ── Federal Courts ────────────────────────────────────────────────────────

  "section-1983-complaint": {
    label: "42 USC § 1983 Civil Rights Complaint",
    authorities: [
      {
        citation: "42 USC § 1983",
        mandate: "Every person who, under color of any statute, ordinance, regulation, custom, or usage, of any State...subjects, or causes to be subjected, any citizen...to the deprivation of any rights, privileges, or immunities secured by the Constitution and laws, shall be liable to the party injured.",
        jurisdiction: "FEDERAL",
      },
    ],
    absenceSignificance: "§ 1983 is the exclusive federal cause of action for state constitutional violations. No § 1983 complaint = no federal civil rights cause of action against state actors.",
    owningAgents: ["us-federal-civil-rights-litigator"],
  },

  "ifp-application": {
    label: "Application to Proceed In Forma Pauperis (28 USC § 1915)",
    authorities: [
      {
        citation: "28 USC § 1915",
        mandate: "Any court of the United States may authorize the commencement of a civil action without prepayment of fees if the person submits an affidavit that includes a statement of all assets and that the person is unable to pay such fees.",
        jurisdiction: "FEDERAL",
      },
    ],
    owningAgents: ["us-federal-civil-rights-litigator"],
  },

  "habeas-petition": {
    label: "Petition for Writ of Habeas Corpus",
    authorities: [
      {
        citation: "28 USC §§ 2241–2266 (federal habeas); Cal. Penal Code § 1473 (state habeas)",
        mandate: "Federal: district courts have jurisdiction to grant writs of habeas corpus to persons in custody in violation of the Constitution or federal law. State: any person unlawfully imprisoned may prosecute a writ.",
        jurisdiction: "FEDERAL",
      },
    ],
    owningAgents: ["us-federal-civil-rights-litigator", "ca-criminal-law-specialist"],
  },

  // ── Social Security ───────────────────────────────────────────────────────

  "ssdi-application": {
    label: "Application for Social Security Disability Insurance Benefits",
    authorities: [
      {
        citation: "42 USC § 423; 20 CFR § 404.300 et seq.",
        mandate: "A disability insurance benefit claim must be filed on a prescribed form (SSA-16-BK) with the Social Security Administration. Disability is defined as inability to engage in any substantial gainful activity by reason of a medically determinable impairment expected to result in death or last at least 12 months.",
        jurisdiction: "FEDERAL_ADMIN",
      },
    ],
    absenceSignificance: "No application = no claim. SSA cannot pay benefits without a filed application. The filing date establishes the protective filing date for purposes of the onset date.",
    owningAgents: ["us-federal-social-security-litigator"],
  },

  "ssa-denial": {
    label: "SSA Notice of Denial / Notice of Reconsideration Denial",
    authorities: [
      {
        citation: "20 CFR §§ 404.900–404.999 (appeals); 42 USC § 405(g)",
        mandate: "SSA must provide written notice of any adverse determination and claimant's right to appeal. Claimant has 60 days from receipt of notice to request reconsideration, then 60 days for ALJ hearing, then Appeals Council review, then federal court under 42 USC § 405(g).",
        jurisdiction: "FEDERAL_ADMIN",
      },
    ],
    owningAgents: ["us-federal-social-security-litigator"],
  },

  // ── Insurance ─────────────────────────────────────────────────────────────

  "insurance-claim": {
    label: "Insurance Claim",
    authorities: [
      {
        citation: "Cal. Insurance Code § 790.03 (unfair claims practices); Cal. Code Regs. tit. 10 § 2695.7",
        mandate: "Insurers must acknowledge receipt of a claim within 15 days, accept or deny within 40 days after proof of claim, and communicate the basis for any denial. Failure to do so constitutes an unfair claims practice.",
        jurisdiction: "CA",
      },
    ],
    owningAgents: ["ca-insurance-compliance-litigator"],
  },

  "cdi-complaint": {
    label: "California Department of Insurance Complaint",
    authorities: [
      {
        citation: "Cal. Insurance Code § 12921.1",
        mandate: "The Insurance Commissioner shall investigate all complaints of alleged violations of the Insurance Code and all regulations adopted thereunder.",
        jurisdiction: "CA",
      },
    ],
    owningAgents: ["ca-insurance-compliance-litigator"],
  },

  // ── Mental Health ─────────────────────────────────────────────────────────

  "5150-hold": {
    label: "WIC § 5150 Involuntary Psychiatric Hold",
    authorities: [
      {
        citation: "Cal. Welfare and Institutions Code § 5150",
        mandate: "A peace officer, professional person in charge of a facility, member of the attending staff, or designated mental health professional may take a person into custody for 72-hour evaluation and treatment if, as a result of a mental health disorder, the person is a danger to others, a danger to self, or gravely disabled.",
        jurisdiction: "CA",
      },
      {
        citation: "Cal. Welfare and Institutions Code § 5150(f)",
        mandate: "The person taking the individual into custody must prepare a written application stating the circumstances under which the person's condition was called to the officer's attention and the stated reasons for the detention.",
        jurisdiction: "CA",
      },
    ],
    absenceSignificance: "A § 5150 hold without a completed written application (§ 5150(f)) is procedurally defective. The application is the authorizing document — its absence is itself a due process violation.",
    owningAgents: ["ca-mental-health-litigator"],
  },

  "5250-hold": {
    label: "WIC § 5250 14-Day Certification Hold",
    authorities: [
      {
        citation: "Cal. Welfare and Institutions Code § 5250",
        mandate: "A person detained under § 5150 may be certified for up to 14 days of intensive psychiatric treatment only if the facility finds the person continues to meet § 5150 criteria and the person is unwilling to accept voluntary treatment.",
        jurisdiction: "CA",
      },
    ],
    owningAgents: ["ca-mental-health-litigator"],
  },

  // ── Probate & Conservatorship ─────────────────────────────────────────────

  "conservatorship-petition": {
    label: "Petition for Appointment of Conservator",
    authorities: [
      {
        citation: "Cal. Probate Code §§ 1800–1897 (Lanterman-Petris-Short / Probate Conservatorship)",
        mandate: "A petition for conservatorship of the person or estate must be filed in the superior court of the county of the proposed conservatee's residence. The court must appoint a court investigator who must interview the proposed conservatee.",
        jurisdiction: "CA",
      },
      {
        citation: "Cal. Probate Code § 1821 (notice requirements)",
        mandate: "The proposed conservatee and certain relatives must be personally served with the petition and notice of hearing at least 15 days before the hearing.",
        jurisdiction: "CA",
      },
    ],
    absenceSignificance: "A conservatorship cannot be imposed without a court order issued after petition, notice, hearing, and capacity finding. No petition = no valid conservatorship.",
    owningAgents: ["ca-probate-conservatorship-litigator", "ca-conservator-investigator", "ca-elder-law-litigator"],
  },

  "letters-conservatorship": {
    label: "Letters of Conservatorship",
    authorities: [
      {
        citation: "Cal. Probate Code § 1830",
        mandate: "The court clerk issues Letters of Conservatorship as evidence of the conservator's authority to act on behalf of the conservatee. Letters must be current — they expire and must be renewed.",
        jurisdiction: "CA",
      },
    ],
    absenceSignificance: "A conservator acting without current Letters has no legal authority. Actions taken without Letters are void. Third parties are not obligated to follow directives without current Letters.",
    owningAgents: ["ca-probate-conservatorship-litigator", "ca-conservator-investigator"],
  },

  // ── Real Estate ───────────────────────────────────────────────────────────

  "deed": {
    label: "Deed (Grant Deed / Quitclaim Deed)",
    authorities: [
      {
        citation: "Cal. Civil Code §§ 1054–1093 (transfer of property)",
        mandate: "A grant deed must be in writing (§ 1091), signed by the grantor (§ 1092), and delivered to take effect (§ 1054). Recordation with the county recorder constructively notifies all persons (Gov. Code § 27201).",
        jurisdiction: "CA",
      },
      {
        citation: "Cal. Government Code § 27201",
        mandate: "Every conveyance of real property, if acknowledged and certified, may be recorded in the office of the county recorder. Recordation gives constructive notice.",
        jurisdiction: "CA",
      },
    ],
    owningAgents: ["ca-real-estate-attorney"],
  },

  "unlawful-detainer-complaint": {
    label: "Unlawful Detainer Complaint",
    authorities: [
      {
        citation: "Cal. Code of Civil Procedure §§ 1161–1179a",
        mandate: "A landlord may maintain an action for unlawful detainer when a tenant remains in possession after expiration of term, failure to pay rent, or breach of covenant. A three-day notice (§ 1161) is a mandatory prerequisite.",
        jurisdiction: "CA",
      },
    ],
    absenceSignificance: "No compliant pre-filing notice (3-day, 30-day, or 60-day as applicable) means the unlawful detainer is premature and subject to dismissal.",
    owningAgents: ["ca-real-estate-attorney", "ca-civil-litigator"],
  },

  // ── Telecom ───────────────────────────────────────────────────────────────

  "sim-swap-complaint": {
    label: "SIM Swap / Port-Out Fraud Complaint",
    authorities: [
      {
        citation: "47 USC § 222 (CPNI — Customer Proprietary Network Information)",
        mandate: "Telecommunications carriers must protect the confidentiality of customer proprietary network information. Unauthorized transfer of a number via SIM swap violates § 222 if carrier procedures fail.",
        jurisdiction: "FEDERAL",
      },
      {
        citation: "FCC Rules: 47 CFR § 64.2010 (number porting authentication)",
        mandate: "Carriers must implement methods to authenticate customers before porting numbers. Failure to authenticate enables fraudulent porting.",
        jurisdiction: "FEDERAL_ADMIN",
      },
      {
        citation: "Cal. Penal Code § 530.5 (identity theft)",
        mandate: "Every person who willfully obtains personal identifying information and uses it for any unlawful purpose is guilty of a public offense. SIM swapping to intercept communications = identity theft.",
        jurisdiction: "CA",
      },
    ],
    owningAgents: ["ca-telecom-privacy-litigator"],
  },

  // ── Victim Compensation ───────────────────────────────────────────────────

  "calvcb-application": {
    label: "CalVCB Victim Compensation Application",
    authorities: [
      {
        citation: "Cal. Government Code §§ 13950–13965 (Victims of Crime Act)",
        mandate: "Victims of qualifying crimes may apply to the California Victim Compensation Board for reimbursement of unreimbursed expenses. Application must be filed within 3 years of the crime or within 3 years of discovering the loss.",
        jurisdiction: "CA",
      },
    ],
    owningAgents: ["ca-victim-compensation-litigator"],
  },

  // ── Financial ─────────────────────────────────────────────────────────────

  "financial-statement": {
    label: "Financial Statement / Bank Record",
    authorities: [
      {
        citation: "Cal. Family Code § 2104 (required in dissolution); Cal. CCP § 2031.010 (discovery)",
        mandate: "In dissolution proceedings, parties must produce financial disclosures. In civil litigation, financial records are discoverable. In federal cases, bank records are subpoenable under Fed. R. Civ. P. 45.",
        jurisdiction: "CA",
      },
    ],
    owningAgents: ["us-federal-financial-fraud-litigator", "ca-civil-litigator", "ca-family-law-litigator"],
  },

  // ── Tax ───────────────────────────────────────────────────────────────────

  "irs-notice": {
    label: "IRS Statutory Notice of Deficiency / Collection Notice",
    authorities: [
      {
        citation: "26 USC § 6212 (Notice of Deficiency); 26 USC § 6303 (Notice and Demand for Tax)",
        mandate: "The Secretary must send a notice of deficiency by certified mail before assessing a tax deficiency. The taxpayer then has 90 days to file a petition in Tax Court.",
        jurisdiction: "FEDERAL",
      },
    ],
    absenceSignificance: "A valid Notice of Deficiency is a jurisdictional prerequisite for Tax Court. Without it, the court lacks jurisdiction.",
    owningAgents: ["us-federal-tax-litigator"],
  },

  // ── Disability Rights ─────────────────────────────────────────────────────

  "ada-complaint": {
    label: "ADA Title II / Title III Complaint",
    authorities: [
      {
        citation: "42 USC §§ 12131–12134 (Title II — public entities); 42 USC §§ 12181–12189 (Title III — public accommodations)",
        mandate: "Title II: No qualified individual with a disability shall be excluded from participation in or be denied the benefits of services, programs, or activities of a public entity. Title III: No individual with a disability shall be discriminated against on the basis of disability in the full and equal enjoyment of goods, services, facilities, privileges, advantages, or accommodations of any place of public accommodation.",
        jurisdiction: "FEDERAL",
      },
      {
        citation: "Cal. Civil Code § 51 (Unruh Civil Rights Act)",
        mandate: "Persons with disabilities are entitled to full and equal accommodations in all business establishments. ADA violations are per se Unruh violations (Civil Code § 51(f)).",
        jurisdiction: "CA",
      },
    ],
    owningAgents: ["ca-disability-rights-litigator", "ca-civil-rights-litigator"],
  },

  // ── Environmental / CEQA ─────────────────────────────────────────────────

  "eir": {
    label: "Environmental Impact Report (EIR)",
    authorities: [
      {
        citation: "Cal. Public Resources Code §§ 21000–21189.57 (CEQA); 14 CCR §§ 15000–15387 (CEQA Guidelines)",
        mandate: "A lead agency must prepare an EIR whenever it proposes to approve a project that may have a significant effect on the environment. The EIR must identify, analyze, and mitigate or explain all significant environmental effects.",
        jurisdiction: "CA",
      },
    ],
    owningAgents: ["ca-ceqa-consultant"],
  },

  // ── Building & Construction ───────────────────────────────────────────────

  "building-permit": {
    label: "Building Permit",
    authorities: [
      {
        citation: "Cal. Health & Safety Code § 19825; Cal. Building Code (CBC) § 105.1",
        mandate: "Any owner or authorized agent who intends to construct, enlarge, alter, repair, move, demolish, or change the occupancy of a building or structure must first obtain a permit from the building official.",
        jurisdiction: "CA",
      },
    ],
    absenceSignificance: "Construction without a permit violates H&S Code § 19825. Unpermitted work is subject to stop-work orders, demolition orders, and civil penalties.",
    owningAgents: ["ca-building-official"],
  },

  // ── Healthcare Fraud ──────────────────────────────────────────────────────

  "cms-1500": {
    label: "CMS-1500 Health Insurance Claim Form",
    authorities: [
      {
        citation: "42 USC § 1320a-7b(a) (false claims to federal health programs); 18 USC § 1347 (healthcare fraud statute)",
        mandate: "Providers submitting claims for Medicare/Medicaid services must submit accurate CMS-1500 (professional) or UB-04 (institutional) forms. False claims are a federal crime under 18 USC § 1347 and subject to civil penalties under 31 USC § 3729 (False Claims Act).",
        jurisdiction: "FEDERAL",
      },
    ],
    owningAgents: ["ca-healthcare-fraud-litigator"],
  },

  // ── Immigration ───────────────────────────────────────────────────────────

  "i-589": {
    label: "Form I-589 — Application for Asylum",
    authorities: [
      {
        citation: "8 USC § 1158; 8 CFR § 208.3",
        mandate: "An alien physically present in or arriving in the United States may apply for asylum regardless of immigration status. The application must be filed within one year of arrival unless an exception applies.",
        jurisdiction: "FEDERAL_ADMIN",
      },
    ],
    owningAgents: ["ca-immigration-litigator"],
  },

  // ── ERISA / Pension ───────────────────────────────────────────────────────

  "erisa-complaint": {
    label: "ERISA Civil Enforcement Action",
    authorities: [
      {
        citation: "29 USC § 1132 (ERISA § 502)",
        mandate: "A civil action may be brought by a participant or beneficiary to recover benefits due under the plan, to enforce rights under the plan, or to clarify rights to future benefits. Also to remedy breach of fiduciary duty.",
        jurisdiction: "FEDERAL",
      },
    ],
    owningAgents: ["us-federal-erisa-litigator"],
  },

  "pension-document": {
    label: "Pension Plan Document / Summary Plan Description",
    authorities: [
      {
        citation: "29 USC § 1022 (ERISA § 102); 29 USC § 1024 (§ 104)",
        mandate: "Every benefit plan must have a Summary Plan Description furnished automatically to every participant and beneficiary. The plan administrator must file annual reports (Form 5500) with DOL.",
        jurisdiction: "FEDERAL_ADMIN",
      },
    ],
    absenceSignificance: "Failure to provide SPD within 90 days of plan coverage is a § 502 violation and grounds for civil action. Employer cannot enforce plan terms not disclosed in SPD.",
    owningAgents: ["us-federal-erisa-litigator"],
  },

  // ── Victim Advocate / Court-Issued Crime Report ───────────────────────────

  "victim-advocate-letter": {
    label: "Victim Advocate or Victim Services Letter",
    authorities: [
      {
        citation: "Cal. Government Code §§ 13950–13965; Cal. Penal Code § 679.026 (crime victim notification rights)",
        mandate: "Victim advocates operate under statutory frameworks giving them access to victims and authority to provide written support documentation for compensation and protective order applications.",
        jurisdiction: "CA",
      },
    ],
    owningAgents: ["ca-victim-compensation-litigator"],
  },

};

// ─────────────────────────────────────────────────────────────────────────────
// LAYER1_SOC — the registry interface
// ─────────────────────────────────────────────────────────────────────────────

export const LAYER1_SOC = {

  /**
   * Look up the statutory source of creation for a document type.
   * If the document type is not in the registry, returns found=false
   * and layer1Pass=false — the agent must research the authority.
   */
  lookup(documentType: string): SoCLookupResult {
    const entry = REGISTRY[documentType];
    if (!entry) {
      return {
        documentType,
        found: false,
        layer1Pass: false,
        missingAuthority: `No Layer 1 S.o.C. entry for "${documentType}". ` +
          `The agent must identify and cite the governing statute before proceeding. ` +
          `A document with no legal source of creation authority cannot be authenticated.`,
      };
    }
    return {
      documentType,
      found: true,
      entry,
      layer1Pass: entry.authorities.length > 0,
    };
  },

  /**
   * Return all registered document types.
   */
  documentTypes(): string[] {
    return Object.keys(REGISTRY);
  },

  /**
   * Return all entries for a given owning agent.
   */
  byAgent(agentId: string): Array<{ documentType: string; entry: SoCEntry }> {
    return Object.entries(REGISTRY)
      .filter(([, e]) => e.owningAgents.includes(agentId))
      .map(([documentType, entry]) => ({ documentType, entry }));
  },

  /**
   * Return all entries for a given jurisdiction.
   */
  byJurisdiction(jx: SoCAuthority["jurisdiction"]): Array<{ documentType: string; entry: SoCEntry }> {
    return Object.entries(REGISTRY)
      .filter(([, e]) => e.authorities.some(a => a.jurisdiction === jx))
      .map(([documentType, entry]) => ({ documentType, entry }));
  },

};

/**
 * Universal Outreach Engine
 *
 * Generates professional compliance outreach emails for leads
 * from ALL 40 intelligence pipelines. Each agency gets a tailored
 * template referencing the specific enforcement action.
 *
 * Core principle: The analysis is free. The information is free.
 * If you need someone to build the corrective action plan — that's what we do.
 */

// ═══════════════════════════════════════════════════════════════════════════
// Pipeline Table Mapping (mirrors pipeline-analytics.ts)
// ═══════════════════════════════════════════════════════════════════════════

export const PIPELINE_TABLES: {
  table: string;
  agency: string;
  entityCol: string;
  stateCol: string;
  riskCol: string;
  descriptionCol: string;
}[] = [
  { table: "fac_leads", agency: "FAC", entityCol: "auditee_name", stateCol: "state", riskCol: "risk_score", descriptionCol: "gap_categories" },
  { table: "hhs_breach_leads", agency: "HHS", entityCol: "covered_entity", stateCol: "state", riskCol: "risk_score", descriptionCol: "breach_type" },
  { table: "edgar_leads", agency: "EDGAR", entityCol: "company_name", stateCol: "state", riskCol: "risk_score", descriptionCol: "filing_type" },
  { table: "sba_leads", agency: "SBA", entityCol: "firm_name", stateCol: "state", riskCol: "risk_score", descriptionCol: "certification_status" },
  { table: "spending_leads", agency: "USAspending", entityCol: "recipient_name", stateCol: "state", riskCol: "risk_score", descriptionCol: "award_type" },
  { table: "fedreg_leads", agency: "FedReg", entityCol: "agency_name", stateCol: "state", riskCol: "risk_score", descriptionCol: "document_type" },
  { table: "epa_leads", agency: "EPA", entityCol: "facility_name", stateCol: "state", riskCol: "risk_score", descriptionCol: "violation_type" },
  { table: "cfpb_leads", agency: "CFPB", entityCol: "company", stateCol: "state", riskCol: "risk_score", descriptionCol: "issue" },
  { table: "osha_leads", agency: "OSHA", entityCol: "establishment_name", stateCol: "state", riskCol: "risk_score", descriptionCol: "violation_type" },
  { table: "fda_leads", agency: "FDA", entityCol: "recalling_firm", stateCol: "state", riskCol: "risk_score", descriptionCol: "reason" },
  { table: "ftc_leads", agency: "FTC", entityCol: "case_name", stateCol: "state", riskCol: "risk_score", descriptionCol: "case_type" },
  { table: "recap_leads", agency: "RECAP", entityCol: "case_name", stateCol: "court", riskCol: "risk_score", descriptionCol: "case_type" },
  { table: "eeoc_leads", agency: "EEOC", entityCol: "basis", stateCol: "basis", riskCol: "risk_score", descriptionCol: "issue" },
  { table: "nlrb_leads", agency: "NLRB", entityCol: "case_name", stateCol: "state", riskCol: "risk_score", descriptionCol: "case_type" },
  { table: "nhtsa_leads", agency: "NHTSA", entityCol: "entity", stateCol: "make", riskCol: "risk_score", descriptionCol: "component" },
  { table: "fcc_leads", agency: "FCC", entityCol: "entity_name", stateCol: "state", riskCol: "risk_score", descriptionCol: "violation_type" },
  { table: "usda_leads", agency: "USDA", entityCol: "establishment", stateCol: "state", riskCol: "risk_score", descriptionCol: "reason" },
  { table: "cms_leads", agency: "CMS", entityCol: "facility_name", stateCol: "state", riskCol: "risk_score", descriptionCol: "deficiency_type" },
  { table: "sam_leads", agency: "SAM", entityCol: "entity_name", stateCol: "state", riskCol: "risk_score", descriptionCol: "exclusion_type" },
  { table: "msha_leads", agency: "MSHA", entityCol: "operator_name", stateCol: "state", riskCol: "risk_score", descriptionCol: "violation_type" },
  { table: "fmcsa_leads", agency: "FMCSA", entityCol: "legal_name", stateCol: "state", riskCol: "risk_score", descriptionCol: "violation_type" },
  { table: "ntsb_leads", agency: "NTSB", entityCol: "entity", stateCol: "state", riskCol: "risk_score", descriptionCol: "event_type" },
  { table: "irs_leads", agency: "IRS", entityCol: "organization_name", stateCol: "state", riskCol: "risk_score", descriptionCol: "revocation_reason" },
  { table: "cpsc_leads", agency: "CPSC", entityCol: "manufacturer", stateCol: "recall_date", riskCol: "risk_score", descriptionCol: "hazard" },
  { table: "doe_leads", agency: "DOE", entityCol: "entity_name", stateCol: "state", riskCol: "risk_score", descriptionCol: "violation_type" },
  { table: "hud_leads", agency: "HUD", entityCol: "entity_name", stateCol: "state", riskCol: "risk_score", descriptionCol: "violation_type" },
  { table: "phmsa_leads", agency: "PHMSA", entityCol: "operator_name", stateCol: "state", riskCol: "risk_score", descriptionCol: "violation_type" },
  { table: "atf_leads", agency: "ATF", entityCol: "licensee", stateCol: "state", riskCol: "risk_score", descriptionCol: "violation_type" },
  { table: "cftc_leads", agency: "CFTC", entityCol: "respondent", stateCol: "action_type", riskCol: "risk_score", descriptionCol: "action_type" },
  { table: "nrc_leads", agency: "NRC", entityCol: "licensee", stateCol: "state", riskCol: "risk_score", descriptionCol: "violation_type" },
  { table: "ferc_leads", agency: "FERC", entityCol: "respondent", stateCol: "state", riskCol: "risk_score", descriptionCol: "violation_type" },
  { table: "pbgc_leads", agency: "PBGC", entityCol: "sponsor_name", stateCol: "state", riskCol: "risk_score", descriptionCol: "plan_status" },
  { table: "sec_ia_leads", agency: "SEC-IA", entityCol: "respondent", stateCol: "state", riskCol: "risk_score", descriptionCol: "action_type" },
  { table: "dcma_leads", agency: "DCMA", entityCol: "contractor", stateCol: "state", riskCol: "risk_score", descriptionCol: "action_type" },
  { table: "ttb_leads", agency: "TTB", entityCol: "permit_holder", stateCol: "state", riskCol: "risk_score", descriptionCol: "violation_type" },
  { table: "ofac_leads", agency: "OFAC", entityCol: "entity_name", stateCol: "program", riskCol: "risk_score", descriptionCol: "program" },
  { table: "fincen_leads", agency: "FinCEN", entityCol: "entity_name", stateCol: "state", riskCol: "risk_score", descriptionCol: "violation_type" },
  { table: "occ_leads", agency: "OCC", entityCol: "bank_name", stateCol: "state", riskCol: "risk_score", descriptionCol: "action_type" },
  { table: "fdic_leads", agency: "FDIC", entityCol: "bank_name", stateCol: "state", riskCol: "risk_score", descriptionCol: "action_type" },
  { table: "ncua_leads", agency: "NCUA", entityCol: "credit_union", stateCol: "state", riskCol: "risk_score", descriptionCol: "action_type" },
];

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface OutreachLead {
  agency: string;
  entityName: string;
  riskScore: number;
  riskCategories: string[];
  actionType: string;
  description: string;
  recommendedServices: string[];
  leadId?: string;
  state?: string;
}

export interface OutreachResult {
  subject: string;
  body: string;
  recipientContext: string;
}

export interface OutreachLogEntry {
  id: number;
  agency: string;
  lead_id: string;
  entity_name: string;
  subject: string;
  status: string;
  created_at: string;
}

export interface OutreachStats {
  totalGenerated: number;
  totalSent: number;
  totalOpened: number;
  totalResponded: number;
  totalPending: number;
  byAgency: { agency: string; generated: number; sent: number }[];
  generatedAt: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// Agency-specific enforcement context
// ═══════════════════════════════════════════════════════════════════════════

const AGENCY_CONTEXT: Record<string, {
  fullName: string;
  enforcementType: string;
  regulatoryBasis: string;
  consequences: string;
  services: string[];
}> = {
  FAC: {
    fullName: "Federal Audit Clearinghouse",
    enforcementType: "audit finding",
    regulatoryBasis: "2 CFR Part 200 (Uniform Guidance)",
    consequences: "loss of federal funding, increased audit frequency, designation as high-risk grantee, and potential debarment",
    services: ["Internal Control Remediation", "Single Audit Preparation", "Corrective Action Plan Development", "Federal Grant Compliance Review"],
  },
  HHS: {
    fullName: "Department of Health and Human Services",
    enforcementType: "data breach notification",
    regulatoryBasis: "HIPAA (45 CFR Parts 160, 164)",
    consequences: "civil monetary penalties up to $2.1M per violation category, OCR investigation, and reputational harm",
    services: ["HIPAA Compliance Assessment", "Breach Response Planning", "Security Risk Analysis", "Privacy Program Development"],
  },
  EDGAR: {
    fullName: "SEC EDGAR",
    enforcementType: "securities filing irregularity",
    regulatoryBasis: "Securities Exchange Act of 1934, Sarbanes-Oxley Act",
    consequences: "SEC enforcement action, shareholder litigation, restatement costs, and executive liability",
    services: ["SEC Filing Compliance Review", "Internal Controls Assessment", "Financial Reporting Remediation", "SOX Compliance Program"],
  },
  SBA: {
    fullName: "Small Business Administration",
    enforcementType: "8(a) program suspension",
    regulatoryBasis: "13 CFR Part 124",
    consequences: "loss of 8(a) certification, contract set-aside eligibility, and SBA mentor-protege participation",
    services: ["8(a) Restatement Package", "OHA Appeal Preparation", "Economic Disadvantage Documentation", "Annual Review Compliance"],
  },
  USAspending: {
    fullName: "USAspending.gov (Federal Awards)",
    enforcementType: "federal award compliance gap",
    regulatoryBasis: "Federal Funding Accountability and Transparency Act (FFATA)",
    consequences: "award suspension, mandatory reporting corrections, and increased oversight requirements",
    services: ["Federal Award Compliance Review", "Subaward Reporting Remediation", "Grant Performance Documentation", "Award Closeout Support"],
  },
  FedReg: {
    fullName: "Federal Register",
    enforcementType: "regulatory compliance change",
    regulatoryBasis: "Administrative Procedure Act (5 U.S.C. 551-559)",
    consequences: "non-compliance with new regulatory requirements, missed comment periods, and enforcement exposure",
    services: ["Regulatory Change Impact Analysis", "Compliance Gap Assessment", "Comment Period Response Preparation", "Regulatory Transition Planning"],
  },
  EPA: {
    fullName: "Environmental Protection Agency",
    enforcementType: "environmental violation",
    regulatoryBasis: "Clean Air Act, Clean Water Act, RCRA, CERCLA",
    consequences: "civil penalties up to $109,024/day per violation, injunctive relief, criminal referral, and Superfund liability",
    services: ["Environmental Compliance Audit", "Corrective Action Plan", "Permit Compliance Review", "Environmental Management System Development"],
  },
  CFPB: {
    fullName: "Consumer Financial Protection Bureau",
    enforcementType: "consumer complaint pattern",
    regulatoryBasis: "Dodd-Frank Act, TILA, FCRA, FDCPA",
    consequences: "consent orders, civil money penalties, restitution to consumers, and supervisory actions",
    services: ["Consumer Compliance Assessment", "Fair Lending Review", "Complaint Management Program", "Regulatory Examination Preparation"],
  },
  OSHA: {
    fullName: "Occupational Safety and Health Administration",
    enforcementType: "workplace safety violation",
    regulatoryBasis: "OSH Act of 1970 (29 CFR 1900-1999)",
    consequences: "citations up to $161,323 per willful violation, repeat violation penalties, and potential criminal prosecution for fatalities",
    services: ["Safety Compliance Audit", "OSHA Citation Response", "Safety Program Development", "Hazard Communication Compliance"],
  },
  FDA: {
    fullName: "Food and Drug Administration",
    enforcementType: "product recall or warning",
    regulatoryBasis: "FD&C Act, 21 CFR",
    consequences: "product seizure, injunction, consent decree, import detention, and criminal prosecution",
    services: ["FDA Compliance Assessment", "Recall Management Support", "CGMP Remediation", "Regulatory Submission Review"],
  },
  FTC: {
    fullName: "Federal Trade Commission",
    enforcementType: "enforcement action",
    regulatoryBasis: "FTC Act Section 5, various consumer protection statutes",
    consequences: "consent orders, civil penalties, disgorgement of profits, and permanent injunctions",
    services: ["FTC Compliance Review", "Advertising Compliance Assessment", "Privacy Practice Audit", "Consent Order Compliance Monitoring"],
  },
  RECAP: {
    fullName: "RECAP (Federal Court Records)",
    enforcementType: "federal litigation filing",
    regulatoryBasis: "Federal Rules of Civil Procedure",
    consequences: "adverse judgments, consent decrees, class action exposure, and regulatory follow-on actions",
    services: ["Litigation Risk Assessment", "Compliance Program Review", "Regulatory Defense Preparation", "Settlement Compliance Monitoring"],
  },
  EEOC: {
    fullName: "Equal Employment Opportunity Commission",
    enforcementType: "discrimination charge pattern",
    regulatoryBasis: "Title VII, ADA, ADEA, EPA, GINA",
    consequences: "conciliation demands, pattern-or-practice lawsuits, compensatory and punitive damages, and injunctive relief",
    services: ["EEO Compliance Audit", "Anti-Discrimination Training Program", "Complaint Investigation Support", "Affirmative Action Plan Development"],
  },
  NLRB: {
    fullName: "National Labor Relations Board",
    enforcementType: "unfair labor practice charge",
    regulatoryBasis: "National Labor Relations Act (29 U.S.C. 151-169)",
    consequences: "cease-and-desist orders, back pay awards, reinstatement orders, and notice-posting requirements",
    services: ["Labor Relations Compliance Audit", "ULP Response Strategy", "Collective Bargaining Compliance", "Employee Rights Training"],
  },
  NHTSA: {
    fullName: "National Highway Traffic Safety Administration",
    enforcementType: "vehicle safety defect or recall",
    regulatoryBasis: "National Traffic and Motor Vehicle Safety Act (49 U.S.C. 30101-30170)",
    consequences: "mandatory recalls, civil penalties up to $115M, consent orders, and criminal liability for concealment",
    services: ["Recall Compliance Review", "Defect Investigation Response", "Safety Compliance Assessment", "Early Warning Reporting Audit"],
  },
  FCC: {
    fullName: "Federal Communications Commission",
    enforcementType: "communications violation",
    regulatoryBasis: "Communications Act of 1934, Telecommunications Act of 1996",
    consequences: "forfeitures, license revocation, cease-and-desist orders, and consent decrees",
    services: ["FCC Compliance Audit", "Spectrum Compliance Review", "TCPA Compliance Assessment", "License Renewal Preparation"],
  },
  USDA: {
    fullName: "U.S. Department of Agriculture",
    enforcementType: "food safety or inspection violation",
    regulatoryBasis: "Federal Meat Inspection Act, Poultry Products Inspection Act, Egg Products Inspection Act",
    consequences: "suspension of operations, product recall, criminal prosecution, and debarment from federal programs",
    services: ["Food Safety Compliance Audit", "HACCP Plan Development", "FSIS Inspection Preparation", "Corrective Action Response"],
  },
  CMS: {
    fullName: "Centers for Medicare & Medicaid Services",
    enforcementType: "healthcare facility deficiency",
    regulatoryBasis: "Social Security Act, 42 CFR Parts 482-485",
    consequences: "termination from Medicare/Medicaid, civil monetary penalties, denial of payment, and state monitoring",
    services: ["Survey Readiness Assessment", "Plan of Correction Development", "Conditions of Participation Compliance", "Quality Assurance Program"],
  },
  SAM: {
    fullName: "System for Award Management",
    enforcementType: "federal exclusion or debarment",
    regulatoryBasis: "FAR 9.4, 2 CFR Part 180",
    consequences: "ineligibility for federal contracts and grants, subcontract prohibitions, and reputational impact across all federal agencies",
    services: ["Exclusion Response Strategy", "Debarment Appeal Preparation", "Present Responsibility Demonstration", "Compliance Program Rehabilitation"],
  },
  MSHA: {
    fullName: "Mine Safety and Health Administration",
    enforcementType: "mine safety violation",
    regulatoryBasis: "Federal Mine Safety and Health Act (30 U.S.C. 801-966)",
    consequences: "citations, orders of withdrawal, civil penalties, and criminal prosecution for knowing violations",
    services: ["Mine Safety Compliance Audit", "Citation Response Support", "Safety Program Development", "Pattern of Violations Defense"],
  },
  FMCSA: {
    fullName: "Federal Motor Carrier Safety Administration",
    enforcementType: "motor carrier safety violation",
    regulatoryBasis: "49 CFR Parts 350-399",
    consequences: "out-of-service orders, civil penalties, unsatisfactory safety rating, and operating authority revocation",
    services: ["Safety Rating Improvement Program", "Compliance Review Preparation", "CSA Score Remediation", "Driver Qualification File Audit"],
  },
  NTSB: {
    fullName: "National Transportation Safety Board",
    enforcementType: "transportation safety investigation",
    regulatoryBasis: "49 U.S.C. Chapter 11",
    consequences: "safety recommendations requiring response, increased regulatory scrutiny, and public accountability",
    services: ["Safety Recommendation Response", "Safety Management System Development", "Investigation Cooperation Strategy", "Corrective Action Implementation"],
  },
  IRS: {
    fullName: "Internal Revenue Service",
    enforcementType: "tax-exempt status revocation",
    regulatoryBasis: "Internal Revenue Code Section 501",
    consequences: "loss of tax-exempt status, retroactive tax liability, donor contribution non-deductibility, and state-level consequences",
    services: ["Tax-Exempt Reinstatement", "Form 990 Compliance Review", "Governance Documentation", "Operational Test Compliance"],
  },
  CPSC: {
    fullName: "Consumer Product Safety Commission",
    enforcementType: "product safety recall",
    regulatoryBasis: "Consumer Product Safety Act (15 U.S.C. 2051-2089)",
    consequences: "mandatory recall, civil penalties up to $120,000 per violation (max $17.15M), import detention, and criminal liability",
    services: ["Product Safety Compliance Review", "Recall Plan Development", "Section 15(b) Reporting Compliance", "Testing and Certification Audit"],
  },
  DOE: {
    fullName: "Department of Energy",
    enforcementType: "energy regulatory violation",
    regulatoryBasis: "Energy Policy Act, Atomic Energy Act, 10 CFR",
    consequences: "civil penalties, compliance orders, license modifications, and criminal referral",
    services: ["Energy Compliance Assessment", "Nuclear Safety Review", "Environmental Compliance Audit", "Regulatory Remediation Plan"],
  },
  HUD: {
    fullName: "Department of Housing and Urban Development",
    enforcementType: "housing or lending violation",
    regulatoryBasis: "Fair Housing Act, RESPA, National Housing Act",
    consequences: "civil penalties, voluntary compliance agreements, charge of discrimination, and ALJ proceedings",
    services: ["Fair Housing Compliance Audit", "RESPA Compliance Review", "Lending Practice Assessment", "Conciliation Agreement Support"],
  },
  PHMSA: {
    fullName: "Pipeline and Hazardous Materials Safety Administration",
    enforcementType: "pipeline or hazmat safety violation",
    regulatoryBasis: "49 CFR Parts 171-180, 190-199",
    consequences: "civil penalties up to $257,664 per violation per day, compliance orders, and corrective action orders",
    services: ["Pipeline Safety Compliance Audit", "Hazmat Transportation Review", "Integrity Management Program", "Corrective Action Response"],
  },
  ATF: {
    fullName: "Bureau of Alcohol, Tobacco, Firearms and Explosives",
    enforcementType: "federal firearms or explosives violation",
    regulatoryBasis: "Gun Control Act, National Firearms Act, Federal Explosives Laws",
    consequences: "license revocation, civil fines, criminal prosecution, and asset forfeiture",
    services: ["FFL Compliance Audit", "Record-Keeping Review", "Inspection Preparation", "License Renewal Support"],
  },
  CFTC: {
    fullName: "Commodity Futures Trading Commission",
    enforcementType: "commodities or derivatives enforcement",
    regulatoryBasis: "Commodity Exchange Act (7 U.S.C. 1-27f)",
    consequences: "civil monetary penalties, disgorgement, trading bans, registration revocation, and criminal referral",
    services: ["Derivatives Compliance Review", "Trading Practice Audit", "Registration Compliance", "Enforcement Response Strategy"],
  },
  NRC: {
    fullName: "Nuclear Regulatory Commission",
    enforcementType: "nuclear safety violation",
    regulatoryBasis: "Atomic Energy Act, 10 CFR",
    consequences: "civil penalties, license modification/suspension/revocation, orders, and criminal referral",
    services: ["Nuclear Compliance Assessment", "License Condition Review", "Corrective Action Program", "Inspection Preparation"],
  },
  FERC: {
    fullName: "Federal Energy Regulatory Commission",
    enforcementType: "energy market or infrastructure violation",
    regulatoryBasis: "Federal Power Act, Natural Gas Act, Energy Policy Act",
    consequences: "civil penalties up to $1.5M per violation per day, disgorgement, compliance monitoring, and license conditions",
    services: ["FERC Compliance Program", "Market Manipulation Review", "Reliability Standards Audit", "Rate Filing Compliance"],
  },
  PBGC: {
    fullName: "Pension Benefit Guaranty Corporation",
    enforcementType: "pension funding or reporting deficiency",
    regulatoryBasis: "ERISA Titles I and IV (29 U.S.C. 1001-1461)",
    consequences: "involuntary plan termination, personal liability for fiduciary breach, excise taxes, and benefit reductions",
    services: ["Pension Compliance Audit", "Funding Improvement Plan", "PBGC Reporting Review", "Fiduciary Liability Assessment"],
  },
  "SEC-IA": {
    fullName: "SEC Investment Adviser Enforcement",
    enforcementType: "investment adviser enforcement action",
    regulatoryBasis: "Investment Advisers Act of 1940, Investment Company Act",
    consequences: "censure, registration revocation, civil penalties, disgorgement, and industry bars",
    services: ["Investment Adviser Compliance Review", "SEC Examination Preparation", "ADV Filing Audit", "Compliance Program Development"],
  },
  DCMA: {
    fullName: "Defense Contract Management Agency",
    enforcementType: "defense contract compliance failure",
    regulatoryBasis: "FAR/DFARS, 48 CFR",
    consequences: "contract termination for default, negative CPARS ratings, suspension/debarment referral, and cost disallowances",
    services: ["Government Contract Compliance Audit", "DCMA Audit Response", "CPARS Mitigation Strategy", "Contractor Business System Review"],
  },
  TTB: {
    fullName: "Alcohol and Tobacco Tax and Trade Bureau",
    enforcementType: "alcohol/tobacco tax or trade violation",
    regulatoryBasis: "Internal Revenue Code, Federal Alcohol Administration Act",
    consequences: "permit revocation/suspension, civil penalties, product seizure, and criminal referral",
    services: ["TTB Compliance Audit", "Permit Application Support", "Label Compliance Review", "Tax Reporting Remediation"],
  },
  OFAC: {
    fullName: "Office of Foreign Assets Control",
    enforcementType: "sanctions program violation",
    regulatoryBasis: "IEEPA, Trading with the Enemy Act, various Executive Orders",
    consequences: "civil penalties up to $356,579 per violation or twice the transaction value, criminal penalties up to $20M and 30 years, and asset blocking",
    services: ["Sanctions Compliance Program", "OFAC Screening Implementation", "Voluntary Self-Disclosure Preparation", "Compliance Framework Development"],
  },
  FinCEN: {
    fullName: "Financial Crimes Enforcement Network",
    enforcementType: "anti-money laundering violation",
    regulatoryBasis: "Bank Secrecy Act (31 U.S.C. 5311-5330), USA PATRIOT Act",
    consequences: "civil penalties up to $1.1M per violation per day, criminal penalties, and consent orders",
    services: ["BSA/AML Compliance Review", "SAR Filing Assessment", "CDD/KYC Program Audit", "Compliance Program Development"],
  },
  OCC: {
    fullName: "Office of the Comptroller of the Currency",
    enforcementType: "banking enforcement action",
    regulatoryBasis: "National Bank Act, 12 CFR",
    consequences: "cease-and-desist orders, civil money penalties, removal/prohibition of institution-affiliated parties, and charter revocation",
    services: ["Bank Compliance Assessment", "Enforcement Response Strategy", "BSA/AML Program Review", "Examination Preparation"],
  },
  FDIC: {
    fullName: "Federal Deposit Insurance Corporation",
    enforcementType: "banking enforcement action",
    regulatoryBasis: "Federal Deposit Insurance Act (12 U.S.C. 1811-1835a)",
    consequences: "cease-and-desist orders, civil money penalties, deposit insurance termination, and removal of officers",
    services: ["FDIC Compliance Assessment", "Safety and Soundness Review", "Enforcement Response Strategy", "Deposit Insurance Compliance"],
  },
  NCUA: {
    fullName: "National Credit Union Administration",
    enforcementType: "credit union regulatory action",
    regulatoryBasis: "Federal Credit Union Act (12 U.S.C. 1751-1795k)",
    consequences: "letters of understanding, cease-and-desist orders, civil money penalties, conservatorship, and liquidation",
    services: ["Credit Union Compliance Audit", "Examination Preparation", "Enforcement Response Strategy", "Share Insurance Compliance"],
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// Outreach Engine
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Generate a professional outreach email for a lead from any pipeline.
 */
export function generateOutreach(lead: OutreachLead): OutreachResult {
  const ctx = AGENCY_CONTEXT[lead.agency];
  const agencyName = ctx?.fullName ?? lead.agency;
  const enforcementType = ctx?.enforcementType ?? "compliance action";
  const regulatoryBasis = ctx?.regulatoryBasis ?? "applicable federal regulations";
  const consequences = ctx?.consequences ?? "enforcement actions, penalties, and increased regulatory scrutiny";

  const riskLevel = lead.riskScore >= 70 ? "Critical" : lead.riskScore >= 50 ? "High" : lead.riskScore >= 25 ? "Elevated" : "Moderate";

  const subject = `${agencyName} Compliance Alert: Free Assessment Available for ${lead.entityName}`;

  const categoriesText = lead.riskCategories.length > 0
    ? lead.riskCategories.slice(0, 4).join(", ")
    : lead.actionType || enforcementType;

  const servicesText = (lead.recommendedServices.length > 0 ? lead.recommendedServices : ctx?.services ?? [])
    .slice(0, 5)
    .map(s => `  - ${s}`)
    .join("\n");

  const body = `Dear Compliance Officer,

We are writing because public records from the ${agencyName} indicate that ${lead.entityName} has been identified in connection with a recent ${enforcementType}.

WHAT WE FOUND
Based on publicly available ${lead.agency} data, the following compliance concerns were identified:

  Enforcement Type: ${lead.actionType || enforcementType}
  Risk Categories: ${categoriesText}
  Risk Assessment: ${riskLevel} (${lead.riskScore}/100)
  ${lead.description ? `Details: ${lead.description}` : ""}

WHY THIS MATTERS
Under ${regulatoryBasis}, unresolved ${enforcementType} findings can lead to ${consequences}.

Organizations that address compliance gaps promptly typically reduce their enforcement exposure and demonstrate good faith to regulators.

FREE COMPLIANCE ASSESSMENT
We are offering a complimentary compliance assessment at no cost and no obligation. The analysis is free. The information is free. Our platform at compliance.vernenlegal.com provides:

  - Automated compliance gap identification across 40 federal agencies
  - Risk scoring based on actual enforcement data
  - Specific regulatory citations and remediation guidance

To access your free assessment, visit:
https://compliance.vernenlegal.com

PROFESSIONAL REMEDIATION SERVICES
If you need someone to build the corrective action plan, that is what we do. Our professional services include:

${servicesText}

Engagement models range from focused compliance reviews to comprehensive remediation programs, tailored to the scope and severity of the findings.

We welcome the opportunity to discuss how we can help ${lead.entityName} return to full compliance.

Respectfully,

Vernen Legal Compliance
compliance.vernenlegal.com
compliance@vernenlegal.com

---
This communication is based solely on publicly available federal enforcement data.
The analysis referenced in this message is provided at no cost.`;

  const recipientContext = `${lead.agency} ${enforcementType} | ${riskLevel} risk (${lead.riskScore}/100) | ${categoriesText}`;

  return { subject, body, recipientContext };
}

/**
 * Generate outreach for top leads from a specific agency pipeline.
 */
export async function generateBatchOutreach(
  db: D1Database,
  agency: string,
  filters?: { limit?: number; minScore?: number },
): Promise<{ outreach: Array<OutreachResult & { entityName: string; riskScore: number; leadId: string }>; agency: string; count: number }> {
  const pipeline = PIPELINE_TABLES.find(p => p.agency.toLowerCase() === agency.toLowerCase());
  if (!pipeline) {
    return { outreach: [], agency, count: 0 };
  }

  const limit = Math.min(filters?.limit ?? 10, 50);
  const minScore = filters?.minScore ?? 25;

  let rows: Record<string, unknown>[] = [];
  try {
    const result = await db.prepare(
      `SELECT rowid, ${pipeline.entityCol} as entity_name, ${pipeline.riskCol} as risk_score, ${pipeline.descriptionCol} as description FROM ${pipeline.table} WHERE ${pipeline.riskCol} >= ? ORDER BY ${pipeline.riskCol} DESC LIMIT ?`
    ).bind(minScore, limit).all();
    rows = (result.results ?? []) as Record<string, unknown>[];
  } catch {
    // Table may not exist yet
    return { outreach: [], agency, count: 0 };
  }

  // Ensure outreach_log table exists
  await ensureOutreachTable(db);

  const outreach: Array<OutreachResult & { entityName: string; riskScore: number; leadId: string }> = [];

  for (const row of rows) {
    const entityName = String(row["entity_name"] ?? "Unknown Entity");
    const riskScore = Number(row["risk_score"] ?? 0);
    const description = String(row["description"] ?? "");
    const leadId = `${pipeline.agency}-${String(row["rowid"] ?? "0")}`;

    const lead: OutreachLead = {
      agency: pipeline.agency,
      entityName,
      riskScore,
      riskCategories: description ? [description] : [],
      actionType: AGENCY_CONTEXT[pipeline.agency]?.enforcementType ?? "compliance action",
      description,
      recommendedServices: AGENCY_CONTEXT[pipeline.agency]?.services ?? [],
      leadId,
    };

    const result = generateOutreach(lead);
    outreach.push({ ...result, entityName, riskScore, leadId });

    // Log the generation
    try {
      await db.prepare(
        "INSERT INTO outreach_log (agency, lead_id, entity_name, subject, status, created_at) VALUES (?, ?, ?, ?, 'GENERATED', ?)"
      ).bind(pipeline.agency, leadId, entityName, result.subject, new Date().toISOString()).run();
    } catch {
      // Log failures are non-fatal
    }
  }

  return { outreach, agency: pipeline.agency, count: outreach.length };
}

/**
 * Generate outreach across ALL agencies (top N per agency).
 */
export async function generateAllOutreach(
  db: D1Database,
  perAgency: number = 5,
  minScore: number = 40,
): Promise<{ outreach: Array<OutreachResult & { agency: string; entityName: string; riskScore: number; leadId: string }>; totalCount: number; agencyCounts: Record<string, number> }> {
  await ensureOutreachTable(db);

  const allOutreach: Array<OutreachResult & { agency: string; entityName: string; riskScore: number; leadId: string }> = [];
  const agencyCounts: Record<string, number> = {};

  // Process pipelines in batches of 10 to stay within subrequest limits
  for (let i = 0; i < PIPELINE_TABLES.length; i += 10) {
    const batch = PIPELINE_TABLES.slice(i, i + 10);
    const stmts = batch.map(p =>
      db.prepare(
        `SELECT rowid, ${p.entityCol} as entity_name, ${p.riskCol} as risk_score, ${p.descriptionCol} as description FROM ${p.table} WHERE ${p.riskCol} >= ? ORDER BY ${p.riskCol} DESC LIMIT ?`
      ).bind(minScore, perAgency)
    );

    let results: D1Result<unknown>[];
    try {
      results = await db.batch(stmts);
    } catch {
      // Batch might fail if tables don't exist — skip
      continue;
    }

    for (let j = 0; j < batch.length; j++) {
      const pipeline = batch[j]!;
      const rows = (results[j]?.results ?? []) as Record<string, unknown>[];

      let count = 0;
      for (const row of rows) {
        const entityName = String(row["entity_name"] ?? "Unknown Entity");
        const riskScore = Number(row["risk_score"] ?? 0);
        const description = String(row["description"] ?? "");
        const leadId = `${pipeline.agency}-${String(row["rowid"] ?? "0")}`;

        const lead: OutreachLead = {
          agency: pipeline.agency,
          entityName,
          riskScore,
          riskCategories: description ? [description] : [],
          actionType: AGENCY_CONTEXT[pipeline.agency]?.enforcementType ?? "compliance action",
          description,
          recommendedServices: AGENCY_CONTEXT[pipeline.agency]?.services ?? [],
          leadId,
        };

        const result = generateOutreach(lead);
        allOutreach.push({ ...result, agency: pipeline.agency, entityName, riskScore, leadId });
        count++;
      }
      agencyCounts[pipeline.agency] = count;
    }
  }

  // Batch-insert outreach log entries (up to 50 at a time)
  const logStmts = allOutreach.map(o =>
    db.prepare(
      "INSERT INTO outreach_log (agency, lead_id, entity_name, subject, status, created_at) VALUES (?, ?, ?, ?, 'GENERATED', ?)"
    ).bind(o.agency, o.leadId, o.entityName, o.subject, new Date().toISOString())
  );

  for (let i = 0; i < logStmts.length; i += 50) {
    try {
      await db.batch(logStmts.slice(i, i + 50));
    } catch {
      // Non-fatal
    }
  }

  // Sort by risk score descending
  allOutreach.sort((a, b) => b.riskScore - a.riskScore);

  return { outreach: allOutreach, totalCount: allOutreach.length, agencyCounts };
}

/**
 * Get outreach statistics.
 */
export async function getOutreachStats(db: D1Database): Promise<OutreachStats> {
  await ensureOutreachTable(db);

  try {
    const results = await db.batch([
      db.prepare("SELECT COUNT(*) as cnt FROM outreach_log WHERE status = 'GENERATED'"),
      db.prepare("SELECT COUNT(*) as cnt FROM outreach_log WHERE status = 'SENT'"),
      db.prepare("SELECT COUNT(*) as cnt FROM outreach_log WHERE status = 'OPENED'"),
      db.prepare("SELECT COUNT(*) as cnt FROM outreach_log WHERE status = 'RESPONDED'"),
      db.prepare("SELECT COUNT(*) as cnt FROM outreach_log"),
      db.prepare("SELECT agency, COUNT(*) as generated, SUM(CASE WHEN status = 'SENT' THEN 1 ELSE 0 END) as sent FROM outreach_log GROUP BY agency ORDER BY generated DESC"),
    ]);

    const generated = Number((results[0]?.results?.[0] as Record<string, unknown> | undefined)?.["cnt"] ?? 0);
    const sent = Number((results[1]?.results?.[0] as Record<string, unknown> | undefined)?.["cnt"] ?? 0);
    const opened = Number((results[2]?.results?.[0] as Record<string, unknown> | undefined)?.["cnt"] ?? 0);
    const responded = Number((results[3]?.results?.[0] as Record<string, unknown> | undefined)?.["cnt"] ?? 0);
    const total = Number((results[4]?.results?.[0] as Record<string, unknown> | undefined)?.["cnt"] ?? 0);

    const byAgency = ((results[5]?.results ?? []) as Record<string, unknown>[]).map(r => ({
      agency: String(r["agency"] ?? ""),
      generated: Number(r["generated"] ?? 0),
      sent: Number(r["sent"] ?? 0),
    }));

    return {
      totalGenerated: generated,
      totalSent: sent,
      totalOpened: opened,
      totalResponded: responded,
      totalPending: total - sent,
      byAgency,
      generatedAt: new Date().toISOString(),
    };
  } catch {
    return {
      totalGenerated: 0,
      totalSent: 0,
      totalOpened: 0,
      totalResponded: 0,
      totalPending: 0,
      byAgency: [],
      generatedAt: new Date().toISOString(),
    };
  }
}

/**
 * Get outreach log history.
 */
export async function getOutreachLog(
  db: D1Database,
  filters?: { agency?: string; status?: string; limit?: number },
): Promise<OutreachLogEntry[]> {
  await ensureOutreachTable(db);

  const limit = Math.min(filters?.limit ?? 100, 500);
  let query = "SELECT id, agency, lead_id, entity_name, subject, status, created_at FROM outreach_log";
  const conditions: string[] = [];
  const binds: (string | number)[] = [];

  if (filters?.agency) {
    conditions.push("agency = ?");
    binds.push(filters.agency.toUpperCase());
  }
  if (filters?.status) {
    conditions.push("status = ?");
    binds.push(filters.status.toUpperCase());
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }
  query += " ORDER BY created_at DESC LIMIT ?";
  binds.push(limit);

  try {
    const stmt = db.prepare(query);
    const result = await stmt.bind(...binds).all();
    return (result.results ?? []) as unknown as OutreachLogEntry[];
  } catch {
    return [];
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Table Creation
// ═══════════════════════════════════════════════════════════════════════════

let _tableCreated = false;

async function ensureOutreachTable(db: D1Database): Promise<void> {
  if (_tableCreated) return;
  try {
    await db.batch([
      db.prepare(`CREATE TABLE IF NOT EXISTS outreach_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        agency TEXT NOT NULL,
        lead_id TEXT NOT NULL,
        entity_name TEXT NOT NULL,
        subject TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'GENERATED',
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`),
      db.prepare("CREATE INDEX IF NOT EXISTS idx_outreach_agency ON outreach_log(agency)"),
      db.prepare("CREATE INDEX IF NOT EXISTS idx_outreach_status ON outreach_log(status)"),
      db.prepare("CREATE INDEX IF NOT EXISTS idx_outreach_created ON outreach_log(created_at)"),
    ]);
    _tableCreated = true;
  } catch {
    // Table may already exist
    _tableCreated = true;
  }
}

---
name: government-contracting-far-audit
description: Passive audit layer that flags Federal Acquisition Regulation violations, contractor compliance failures, cost accounting deficiencies, and small business program fraud in government contracts, modifications, claims, and compliance documents.
---

# Government Contracting FAR Audit

**Purpose:** Detect Federal Acquisition Regulation violations, contractor compliance failures, cost accounting deficiencies, small business program fraud, and mandatory disclosure failures across government contracts, contract modifications, cost proposals, claims, and compliance documentation. This skill passively audits documents for procurement integrity violations, false claims indicators, and regulatory noncompliance.

## Governing Standards

### Federal
- 48 CFR (Federal Acquisition Regulation — FAR)
- 48 CFR Part 1 (Federal Acquisition Regulations System)
- 48 CFR Part 3 (Improper Business Practices and Personal Conflicts of Interest)
- 48 CFR Part 9 (Contractor Qualifications — Responsibility, Debarment)
- 48 CFR Part 15 (Contracting by Negotiation — Competitive Proposals)
- 48 CFR Part 19 (Small Business Programs)
- 48 CFR Part 22 (Application of Labor Laws to Government Acquisitions)
- 48 CFR Part 25 (Foreign Acquisition — Buy American Act, Trade Agreements Act)
- 48 CFR Part 31 (Contract Cost Principles and Procedures)
- 48 CFR § 31.205 (Selected Costs — Allowability)
- 48 CFR Part 32 (Contract Financing)
- 48 CFR Part 42 (Contract Administration and Audit Services)
- 48 CFR Part 44 (Subcontracting Policies and Procedures)
- 48 CFR Part 45 (Government Property)
- 48 CFR Part 52 (Solicitation Provisions and Contract Clauses)
- 48 CFR § 52.203-13 (Contractor Code of Business Ethics and Conduct — Mandatory Disclosure)
- 48 CFR § 52.203-14 (Display of Hotline Poster)
- 48 CFR § 52.204-21 (Basic Safeguarding of Covered Contractor Information Systems)
- 48 CFR § 52.204-24 (Representation Regarding Certain Telecommunications — Section 889)
- 48 CFR § 52.204-25 (Prohibition on Contracting for Certain Telecommunications — Section 889)
- 48 CFR § 52.209-5 (Certification Regarding Responsibility Matters)
- 48 CFR § 52.219-8 (Utilization of Small Business Concerns)
- 48 CFR § 52.219-9 (Small Business Subcontracting Plan)
- 48 CFR § 52.222-26 (Equal Opportunity)
- 48 CFR § 52.222-50 (Combating Trafficking in Persons)
- 48 CFR § 52.225-1 (Buy American Act — Supplies)
- 48 CFR § 52.225-5 (Trade Agreements)
- 48 CFR § 52.230-2 (Cost Accounting Standards)
- DFARS (Defense Federal Acquisition Regulation Supplement)
- DFARS 252.204-7012 (Safeguarding Covered Defense Information — Cyber Incident Reporting)
- DFARS 252.204-7021 (Cybersecurity Maturity Model Certification — CMMC)
- 10 USC § 4754 (Contractor Business Systems — Accounting, Estimating, Purchasing, EVMS, MMAS, Property)
- 31 USC § 3729-3733 (False Claims Act)
- 41 USC § 2101-2107 (Procurement Integrity Act)
- 41 USC § 4712 (Contractor Employee Whistleblower Protections)
- 41 USC § 8102 (Drug-Free Workplace Act)
- 41 USC § 8702-8707 (Anti-Kickback Act)
- 15 USC § 631 et seq (Small Business Act)
- CAS (Cost Accounting Standards — 48 CFR Chapter 99)
- 48 CFR § 9903 (CAS Board Rules and Regulations)

### California
- Cal. Government Code § 12100 et seq (Small Business Procurement and Contract Act)
- Cal. Military and Veterans Code § 999 et seq (DVBE Program)
- Cal. Public Contract Code § 10115 (DVBE Participation Goal — 3%)
- Cal. Public Contract Code § 2000-2001 (Non-Discrimination in State Contracts)
- Cal. Government Code § 14838 (Prompt Payment Act — State Contracts)

### Regulatory
- 2 CFR Part 200 (Uniform Administrative Requirements — Cost Principles — Audit Requirements)
- 2 CFR § 200.400-475 (Cost Principles for Federal Awards)
- 2 CFR Part 180 (Government-Wide Debarment and Suspension)
- 13 CFR Part 121 (SBA Small Business Size Standards)
- 13 CFR Part 124 (8(a) Business Development Program)
- 13 CFR Part 125 (Government Contracting Programs — HUBZone, SDVOSB, WOSB)
- 13 CFR Part 126 (HUBZone Program)
- 13 CFR Part 127 (Women-Owned Small Business Program)
- 13 CFR Part 128 (Veteran Small Business Certification Program)
- FAR 4.1102 (SAM Registration Requirement)
- DCAA Contract Audit Manual (CAM)

## Audit Triggers

- Government contract awards (firm-fixed-price, cost-reimbursement, T&M, IDIQ)
- Contract modifications and change orders
- Cost proposals and price proposals
- Incurred cost submissions (ICE)
- Small business subcontracting plans and reports (ISR/SSR)
- Contractor business system descriptions (accounting, estimating, purchasing)
- Organizational conflict of interest (OCI) mitigation plans
- SAM.gov registration and representations/certifications
- Claims and disputes (Contract Disputes Act)
- Contractor Purchasing System Reviews (CPSR)
- DCAA audit findings and contractor responses
- Section 889 compliance representations
- Buy American Act / Trade Agreements Act certifications
- Mandatory disclosure reports (FAR 52.203-13)
- Past performance evaluations (CPARS/PPIRS)

## Audit Checklist

### Contractor Eligibility and Registration
- [ ] Active SAM.gov registration current and accurate (FAR 4.1102)
- [ ] Representations and certifications current in SAM (FAR 52.204-7)
- [ ] Not suspended, debarred, or proposed for debarment (FAR 9.404, 2 CFR Part 180)
- [ ] Responsibility determination made by contracting officer (FAR 9.104)
- [ ] Small business size status accurate per NAICS code (13 CFR Part 121)
- [ ] Section 889 representation accurate — no prohibited telecommunications equipment (FAR 52.204-24)
- [ ] Drug-Free Workplace certification in place (41 USC § 8102)

### Procurement Integrity
- [ ] No unauthorized disclosure of source selection information (41 USC § 2102)
- [ ] No unauthorized disclosure of contractor bid/proposal information (41 USC § 2102)
- [ ] Post-employment restrictions for former government personnel honored (41 USC § 2104)
- [ ] Organizational conflict of interest identified, disclosed, and mitigated (FAR 9.5)
- [ ] No kickbacks or gratuities to government personnel (41 USC § 8702)
- [ ] Contractor code of business ethics and conduct implemented (FAR 52.203-13)

### Cost Accounting and Allowability
- [ ] Cost Accounting Standards (CAS) applied correctly if CAS-covered (48 CFR Chapter 99)
- [ ] Disclosure Statement (DS-1) current and practices consistent (CAS 9903.202)
- [ ] Direct costs properly classified and charged (FAR 31.202)
- [ ] Indirect costs allocated using acceptable base and methodology (FAR 31.203)
- [ ] Unallowable costs excluded — entertainment, lobbying, fines, bad debts (FAR 31.205)
- [ ] Executive compensation within statutory cap (FAR 31.205-6(p))
- [ ] Travel costs comply with Federal Travel Regulation or JTR (FAR 31.205-46)
- [ ] Incurred cost submission filed within 6 months of fiscal year end (FAR 52.216-7)
- [ ] DCAA audit findings addressed with corrective actions

### Small Business Program Compliance
- [ ] Small business subcontracting plan submitted for contracts over $750K (FAR 52.219-9)
- [ ] Subcontracting plan goals met or good faith effort documented
- [ ] Individual Subcontract Reports (ISR) filed timely in eSRS
- [ ] Summary Subcontract Reports (SSR) filed timely in eSRS
- [ ] No pass-through to large business disguised as small business subcontracting
- [ ] 8(a), HUBZone, SDVOSB, WOSB certifications valid and current (13 CFR Parts 124-128)
- [ ] Mentor-protege agreements properly documented and approved

### Contract Performance and Administration
- [ ] Contract deliverables meet specifications and quality requirements
- [ ] Contract modifications properly executed with bilateral agreement where required
- [ ] Government property managed per FAR Part 45 and contractor property system
- [ ] Earned Value Management System (EVMS) data reported accurately (where applicable)
- [ ] Progress payments supported by adequate documentation (FAR Part 32)
- [ ] Final voucher submitted with all costs reconciled

### Mandatory Disclosure and Compliance
- [ ] Mandatory disclosure obligation for fraud, false claims, bribery implemented (FAR 52.203-13)
- [ ] Internal control system includes timely disclosure mechanism to OIG/contracting officer
- [ ] False Claims Act exposure assessed — treble damages plus $11,665-$23,331 per claim (31 USC § 3729)
- [ ] Whistleblower protection procedures in place (41 USC § 4712)
- [ ] Trafficking in Persons compliance plan implemented for contracts performed overseas (FAR 52.222-50)

### Buy American and Trade Agreements
- [ ] Domestic end products certified where Buy American Act applies (FAR 52.225-1)
- [ ] Trade Agreements Act country of origin correctly determined (FAR 52.225-5)
- [ ] Manufactured articles substantially transformed in designated countries (TAA)
- [ ] Commercial off-the-shelf (COTS) exemptions properly documented
- [ ] Berry Amendment compliance for DoD textile and food contracts (DFARS 252.225-7012)

### Cybersecurity and Information Safeguarding
- [ ] Basic safeguarding of covered contractor information systems (FAR 52.204-21)
- [ ] DFARS 252.204-7012 flowdown to subcontractors handling CDI
- [ ] Cyber incident reporting within 72 hours to DoD (DFARS 252.204-7012)
- [ ] CMMC certification level matches contract requirements (DFARS 252.204-7021)
- [ ] NIST SP 800-171 self-assessment score submitted to SPRS

## Output Protocol

| Field | Description |
|---|---|
| **Document ID** | Unique identifier for the audited document |
| **Document Type** | Contract / Modification / Cost proposal / Subcontracting plan / SAM record / Disclosure / Other |
| **Date Reviewed** | Date the audit was performed |
| **Contract Number** | Government contract number, if applicable |
| **Applicable FAR/DFARS** | Specific FAR or DFARS section implicated |
| **Applicable Statute** | Specific USC section implicated (FCA, PIA, Anti-Kickback, etc.) |
| **Finding** | Description of the violation, deficiency, or noncompliance |
| **Severity** | CRITICAL / HIGH / MEDIUM / LOW |
| **Risk Category** | False Claims Act / Suspension-Debarment / Procurement Integrity / Cost Disallowance / Cyber |
| **Financial Exposure** | Estimated disallowed costs, penalties, or FCA treble damages |
| **Evidence** | Specific text, calculation, absence, or pattern constituting the finding |
| **Remediation** | Recommended corrective action — mandatory disclosure, cost adjustment, plan revision, or certification |
| **Deadline** | Statutory or regulatory deadline — 72 hours (cyber), 6 months (ICE), or other |
| **Status** | OPEN / IN PROGRESS / REMEDIATED / DISCLOSED TO OIG / REFERRED |

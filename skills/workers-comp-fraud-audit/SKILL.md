---
name: workers-comp-fraud-audit
description: Passive audit layer that flags workers' compensation fraud, claim denial irregularities, utilization review failures, and employer coverage violations in workers' comp claims, medical reports, UR decisions, and employer records.
---

# Workers' Compensation Fraud Audit

**Purpose:** Detect fraud indicators, procedural violations, and noncompliance across workers' compensation claims, medical treatment authorizations, utilization review decisions, employer coverage obligations, and benefit calculations. This skill passively audits documents for claim manipulation, UR/IMR irregularities, coverage gaps, and statutory timeline failures.

## Governing Standards

### Federal
- 18 USC § 1347 (Health Care Fraud)
- 18 USC § 1341 (Mail Fraud — when WC documents sent via mail)
- 18 USC § 1343 (Wire Fraud — electronic WC claim submissions)
- 29 USC § 651 et seq (OSHA — Occupational Safety and Health Act)
- 42 USC § 1395y(b) (Medicare Secondary Payer — WC coordination)

### California
- Cal. Labor Code § 3200 et seq (Workers' Compensation Division)
- Cal. Labor Code § 3600 (Conditions of Employer Liability)
- Cal. Labor Code § 3700 (Employer Duty to Secure Payment of Compensation)
- Cal. Labor Code § 3700.5 (Penalties for Failure to Secure Insurance)
- Cal. Labor Code § 4060-4067 (Medical-Legal Disputes — QME/AME)
- Cal. Labor Code § 4062 (QME Panel Selection Process)
- Cal. Labor Code § 4600 (Medical Treatment — Employer Obligation)
- Cal. Labor Code § 4610 (Utilization Review Requirements)
- Cal. Labor Code § 4610.5 (Independent Medical Review)
- Cal. Labor Code § 4610.6 (IMR Application and Procedures)
- Cal. Labor Code § 4650 (Temporary Disability Payment Timelines)
- Cal. Labor Code § 4658 (Permanent Disability Supplemental Payment)
- Cal. Labor Code § 4660 (Permanent Disability Rating Schedule)
- Cal. Labor Code § 4850 (Special Leave for Public Safety Officers)
- Cal. Labor Code § 5401 (Claim Form — Employer Must Provide Within 1 Working Day)
- Cal. Labor Code § 5402 (90-Day Investigation Period / Presumption of Compensability)
- Cal. Labor Code § 5814 (Penalties for Unreasonable Delay/Denial — 25% Increase)
- Cal. Labor Code § 5814.5 (Audit Penalties)
- Cal. Insurance Code § 1871.4 (Workers' Compensation Fraud — Criminal Penalties)
- Cal. Insurance Code § 11770 et seq (Insurance Rate Regulation)
- Cal. Insurance Code § 11760 (Insurer Obligations)
- Cal. Penal Code § 549 (Solicitation of WC Fraud)
- Cal. Penal Code § 550 (Fraudulent Claims)

### Regulatory
- 8 CCR § 9767 et seq (Utilization Review Standards)
- 8 CCR § 9767.1 (UR Timeline Requirements — 5 Business Days)
- 8 CCR § 9767.5 (UR Decision Notification Requirements)
- 8 CCR § 9767.6 (Retrospective UR)
- 8 CCR § 9767.7 (UR Reviewer Qualifications)
- 8 CCR § 9768.1-9768.17 (Independent Medical Review)
- 8 CCR § 9770-9792 (Medical Treatment Utilization Schedule — MTUS)
- 8 CCR § 9785 (Physician Reporting Requirements — PR-2/PR-4)
- 8 CCR § 9792.5 (MTUS Drug Formulary)
- 8 CCR § 10100 et seq (WCAB Rules of Practice and Procedure)
- 8 CCR § 10101.1 (WCAB Electronic Filing)
- 8 CCR § 10109 (Service and Filing Requirements)
- 8 CCR § 10111 (Lien Filing Fees and Procedures)
- 8 CCR § 10600 et seq (QME Regulations)
- 8 CCR § 10606 (QME Panel Selection)
- 8 CCR § 10682 (AME Selection and Replacement)
- 10 CCR § 2592-2592.14 (Claims Administration — Audit Standards)

## Audit Triggers

- First report of injury (DWC-1) and employer's report of injury (DLSR 5020)
- Utilization review decisions (approval, modification, delay, denial)
- Independent medical review applications and determinations
- QME/AME reports and supplemental reports
- Permanent disability rating calculations (PDRS)
- Temporary disability payment records
- Medical treatment authorization requests (RFA)
- Claim denial and delay letters
- Benefit notices (per Labor Code § 138.4)
- Employer insurance policy declarations
- Experience modification rate (X-Mod) calculations
- Subrogation and lien filings
- Vocational rehabilitation/SJDB voucher records
- Settlement agreements (Compromise and Release / Stipulations)
- Fraud referral documentation

## Audit Checklist

### Employer Coverage and Reporting
- [ ] Employer has current workers' compensation insurance coverage (Labor Code § 3700)
- [ ] Claim form (DWC-1) provided to employee within 1 working day of notice (§ 5401)
- [ ] Employer's Report of Occupational Injury (DLSR 5020) filed within 5 days (8 CCR § 14001)
- [ ] Employee notice of workers' compensation rights posted (Labor Code § 3550)
- [ ] Authorization for medical treatment provided within 1 day of claim (§ 5402(c))
- [ ] $10,000 in presumptive medical treatment authorized during investigation (§ 5402(c))

### Claim Administration Timelines
- [ ] Claim accepted or denied within 90 days of filing (§ 5402(b))
- [ ] Late denial results in presumption of compensability applied (§ 5402(b))
- [ ] Temporary disability payments commenced within 14 days of employer knowledge (§ 4650)
- [ ] TD payments made every 2 weeks (§ 4650(b))
- [ ] Delay/denial notice includes specific factual and legal basis (§ 5402)
- [ ] 25% penalty self-assessed for unreasonable delay (§ 5814)
- [ ] Benefit notices issued for all changes in compensation status (§ 138.4)

### Utilization Review Compliance
- [ ] UR decision made within 5 business days of receipt of RFA (8 CCR § 9767.1)
- [ ] Expedited UR completed within 72 hours for imminent/serious threat (8 CCR § 9767.1)
- [ ] Concurrent UR completed within 24 hours (8 CCR § 9767.1)
- [ ] UR reviewer is licensed physician in relevant specialty (8 CCR § 9767.7)
- [ ] Non-certification includes clinical rationale and MTUS citation (8 CCR § 9767.5)
- [ ] IMR rights notice provided with every UR denial/modification (§ 4610.5)
- [ ] UR decision communicated to requesting physician and employee (8 CCR § 9767.5)
- [ ] MTUS Drug Formulary applied correctly (8 CCR § 9792.5)

### QME/AME Process
- [ ] QME panel request made through proper DWC channels (§ 4062.1)
- [ ] Panel QME selected from 3-physician panel within 10 days (8 CCR § 10606)
- [ ] AME selected by agreement documented in writing (§ 4062.2)
- [ ] QME/AME report addresses all disputed medical issues
- [ ] Supplemental report requested and responded to within required timelines
- [ ] No ex parte communication with QME/AME (Labor Code § 4062.3)

### Permanent Disability and Settlement
- [ ] PD rating calculated using current PDRS schedule (§ 4660)
- [ ] Whole person impairment based on AMA Guides 5th Edition (§ 4660.1)
- [ ] Apportionment supported by substantial medical evidence (§ 4663)
- [ ] SJDB voucher offered within 60 days of P&S for qualifying claims (§ 4658.7)
- [ ] Compromise and Release reviewed for adequacy of medical coverage
- [ ] Stipulated Findings and Award verified against benefit calculations

### Fraud Indicators
- [ ] Claim circumstances consistent with reported mechanism of injury
- [ ] Treatment patterns consistent with documented injury (Insurance Code § 1871.4)
- [ ] Provider billing matches documented treatment rendered
- [ ] Multiple claims by same employee assessed for pattern (Penal Code § 550)
- [ ] Lien claims supported by actual services rendered (Labor Code § 4903.05)
- [ ] Surveillance or investigation results cross-referenced with reported limitations
- [ ] Kickback or referral fee arrangements flagged (Penal Code § 549)

## Output Protocol

| Field | Description |
|---|---|
| **Document ID** | Unique identifier for the audited document |
| **Document Type** | DWC-1 / UR decision / QME report / Payment record / Employer policy / Other |
| **Date Reviewed** | Date the audit was performed |
| **Claim Number** | Workers' comp claim number, if available |
| **Applicable Statute** | Specific Labor Code, Insurance Code, or Penal Code section implicated |
| **Applicable Regulation** | Specific 8 CCR or 10 CCR section implicated |
| **Finding** | Description of the noncompliance, fraud indicator, or deficiency |
| **Severity** | CRITICAL / HIGH / MEDIUM / LOW |
| **Fraud Indicator** | YES / NO — If yes, category (claim fraud, provider fraud, employer fraud, premium fraud) |
| **Penalty Exposure** | § 5814 (25%), criminal referral, audit penalty, or other exposure |
| **Evidence** | Specific text, absence, timeline failure, or pattern constituting the finding |
| **Remediation** | Recommended corrective action or referral |
| **Deadline** | Statutory or regulatory deadline implicated |
| **Status** | OPEN / IN PROGRESS / REMEDIATED / REFERRED TO DI |

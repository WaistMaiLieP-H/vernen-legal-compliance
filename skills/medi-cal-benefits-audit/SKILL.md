---
name: medi-cal-benefits-audit
description: Passive audit layer that flags Medi-Cal eligibility determination errors, coverage denials, managed care violations, and estate recovery overreach in Medi-Cal applications, NOAs, fair hearing requests, and provider claims.
---

# Medi-Cal Benefits Audit

**Purpose:** Detect eligibility determination errors, coverage denials, managed care violations, provider discrimination, and estate recovery overreach across Medi-Cal applications, Notices of Action, fair hearing requests, managed care plan documents, and provider claims. This skill passively audits documents for failures in timely processing, incorrect methodology application, and beneficiary rights violations.

## Governing Standards

### Federal
- 42 USC § 1396 et seq (Medicaid — Title XIX of the Social Security Act)
- 42 USC § 1396a(a)(8) (Reasonable Promptness in Eligibility Determinations)
- 42 USC § 1396a(a)(10) (Mandatory Eligibility Groups)
- 42 USC § 1396a(a)(17) (Income and Resource Methodology)
- 42 USC § 1396a(e)(14) (MAGI-Based Eligibility)
- 42 USC § 1396b(i) (Federal Financial Participation)
- 42 USC § 1396d(a) (Definition of Medical Assistance)
- 42 USC § 1396o (Cost Sharing Limitations)
- 42 USC § 1396p (Liens, Adjustments, Recoveries — Estate Recovery)
- 42 USC § 1396p(b)(1) (Estate Recovery — Federal Requirements)
- 42 USC § 1396p(c) (Transfer of Assets Penalty)
- 42 USC § 1396p(d) (Trust Treatment)
- 42 USC § 1396r-6 (Transitional Medical Assistance)
- 42 USC § 1396u-7 (Benchmark Benefit Packages)
- 42 CFR Part 430-456 (Medicaid Program Administration)
- 42 CFR § 431.200-250 (Fair Hearing Requirements)
- 42 CFR § 435 (Eligibility — General Provisions)
- 42 CFR § 435.603 (MAGI-Based Income Methodologies)
- 42 CFR § 438 (Managed Care Requirements)
- 42 CFR § 438.210 (Coverage and Authorization of Services)
- 42 CFR § 438.402-424 (Managed Care Grievance and Appeal System)

### California
- Cal. Welfare & Institutions Code § 14000 et seq (Medi-Cal Program)
- Cal. WIC § 14005.4 (Medi-Cal Eligibility — Income Limits)
- Cal. WIC § 14005.7 (Modified Adjusted Gross Income Methodology)
- Cal. WIC § 14005.40 (Aged and Disabled Federal Poverty Level Program)
- Cal. WIC § 14005.64 (Working Disabled Program)
- Cal. WIC § 14005.65 (Breast and Cervical Cancer Treatment Program)
- Cal. WIC § 14007.5 (Retroactive Medi-Cal Coverage — 3 Months)
- Cal. WIC § 14007.8 (Continuous Eligibility for Children Under 5)
- Cal. WIC § 14008 (Share of Cost Calculation)
- Cal. WIC § 14009.5 (Estate Recovery — California Implementation)
- Cal. WIC § 14011 (Application Processing Timelines — 45 Days, 90 Days for Disability)
- Cal. WIC § 14014 (Managed Care Enrollment)
- Cal. WIC § 14015 (Continuity of Care Requirements)
- Cal. WIC § 14016.5 (Provider Discrimination Prohibition)
- Cal. WIC § 14019.3 (Telehealth Coverage Parity)
- Cal. WIC § 14053 (No-Cost Medi-Cal — Zero Share of Cost)
- Cal. WIC § 14087-14089 (County Organized Health Systems — COHS)
- Cal. WIC § 14100 et seq (Services and Benefits)
- Cal. WIC § 10950 (Fair Hearing Rights)
- Cal. WIC § 10951 (Request for Fair Hearing — 90 Days from NOA)
- Cal. WIC § 10952 (Aid Paid Pending)
- Cal. WIC § 10953 (Fair Hearing Decision Timelines)

### Regulatory
- 22 CCR Division 3 (Medi-Cal Program Regulations)
- 22 CCR § 50000-50007 (General Provisions)
- 22 CCR § 50063-50091 (Application and Eligibility Determination)
- 22 CCR § 50079-50079.1 (Property Limitations)
- 22 CCR § 50083 (Income Calculation)
- 22 CCR § 50087 (Share of Cost Determination)
- 22 CCR § 50100-50179 (Benefits and Services)
- 22 CCR § 50180-50199 (Provider Enrollment and Responsibilities)
- 22 CCR § 50700-50767 (Estate Recovery)
- 22 CCR § 50760-50767 (Hardship Waiver for Estate Recovery)
- 22 CCR § 51000 et seq (Managed Care)
- DHCS All County Welfare Director Letters (ACWDLs)
- DHCS Medi-Cal Eligibility Division Information Letters (MEDILs)
- MPP § 63-001 et seq (Medi-Cal Administrative Procedures)

## Audit Triggers

- Medi-Cal applications (MC 210, SAWS 2 Plus, online applications)
- Notices of Action (NOAs) — approvals, denials, discontinuances, share of cost changes
- Fair hearing requests and decisions
- Managed care plan enrollment and disenrollment notices
- Prior authorization requests and denials
- Managed care grievance and appeal records
- Estate recovery demand letters and hardship waiver requests
- Provider claims and Explanation of Benefits (EOBs)
- Annual redetermination packets and responses
- Income and resource verification documents
- Transfer of assets documentation
- Continuity of care request forms
- Presumptive eligibility determinations
- County eligibility worker case notes
- Treatment Authorization Requests (TARs)

## Audit Checklist

### Eligibility Determination
- [ ] Application processed within 45 days (90 days for disability-based) (WIC § 14011)
- [ ] MAGI methodology correctly applied for non-aged, non-disabled, non-Medicare applicants (42 USC § 1396a(e)(14))
- [ ] Non-MAGI methodology correctly applied for aged, blind, disabled (22 CCR § 50083)
- [ ] Income correctly calculated — gross income, applicable deductions, household size (42 CFR § 435.603)
- [ ] Asset/property limits correctly applied for non-MAGI programs — $130,000 individual, $195,000 couple (22 CCR § 50079)
- [ ] Asset limits eliminated for programs where applicable (post-2024 expansion)
- [ ] Retroactive coverage assessed for 3 months before application month (WIC § 14007.5)
- [ ] Presumptive eligibility properly determined at qualified entity (42 CFR § 435.1110)
- [ ] Continuous eligibility applied for children under 5 (WIC § 14007.8)
- [ ] Aged and Disabled FPL program eligibility assessed (WIC § 14005.40)
- [ ] Working Disabled program assessed where applicant has earned income and disability (WIC § 14005.64)

### Share of Cost
- [ ] Share of cost correctly calculated using applicable income methodology (WIC § 14008)
- [ ] Allowable deductions applied — health insurance premiums, medical expenses (22 CCR § 50087)
- [ ] Share of cost meets maintenance need level — not below federal standards
- [ ] Beneficiary informed of how to meet share of cost with medical expenses
- [ ] Zero share of cost correctly determined where eligible (WIC § 14053)

### Notice Requirements
- [ ] NOA provided in writing before action is taken — at least 10 days for adverse actions (42 CFR § 431.210)
- [ ] NOA states specific reasons for action with regulatory citations (42 CFR § 431.210(b))
- [ ] NOA includes fair hearing rights notice (42 CFR § 431.206)
- [ ] NOA includes aid paid pending rights notice (WIC § 10952)
- [ ] NOA in beneficiary's primary language or includes language access notice
- [ ] Annual redetermination notice sent with reasonable time to respond (42 CFR § 435.916)

### Fair Hearing Rights
- [ ] Fair hearing request accepted within 90 days of NOA (WIC § 10951)
- [ ] Aid paid pending granted when hearing requested before effective date of action (WIC § 10952)
- [ ] Fair hearing decision issued within 90 days of request (42 CFR § 431.244)
- [ ] Hearing conducted by impartial ALJ with no prior involvement (42 CFR § 431.232)
- [ ] Beneficiary right to review case file before hearing honored (42 CFR § 431.242)
- [ ] Beneficiary right to representation at hearing honored

### Managed Care Compliance
- [ ] Enrollment and plan selection processed correctly (WIC § 14014)
- [ ] New enrollee right to change plans within 90 days honored (42 CFR § 438.56)
- [ ] Continuity of care for ongoing treatment with out-of-network providers (WIC § 14015)
- [ ] Prior authorization decisions made within required timelines — standard 14 days, expedited 72 hours (42 CFR § 438.210)
- [ ] Grievance and appeal system operational with required timelines (42 CFR § 438.402-424)
- [ ] Plan network adequacy meets time and distance standards (42 CFR § 438.68)
- [ ] Cultural and linguistic services available (42 CFR § 438.206)

### Estate Recovery
- [ ] Estate recovery limited to services received at age 55 or older (WIC § 14009.5)
- [ ] Estate recovery not pursued against surviving spouse, minor child, or blind/disabled child (42 USC § 1396p(b)(2))
- [ ] Hardship waiver evaluated upon request (22 CCR § 50760-50767)
- [ ] Homestead exemption properly applied — estate recovery deferred while qualifying individual resides in home
- [ ] Recovery limited to amount of Medi-Cal benefits correctly paid (no penalties, interest on overstated amounts)
- [ ] Estate recovery demand includes notice of right to hardship waiver and fair hearing

### Provider Obligations
- [ ] Provider not discriminating against Medi-Cal beneficiaries (WIC § 14016.5)
- [ ] Provider accepting Medi-Cal as payment in full — no balance billing (22 CCR § 50180)
- [ ] Telehealth services covered at parity with in-person (WIC § 14019.3)
- [ ] Provider enrolled and active in Medi-Cal program (22 CCR § 50180-50199)

## Output Protocol

| Field | Description |
|---|---|
| **Document ID** | Unique identifier for the audited document |
| **Document Type** | Application / NOA / Fair hearing record / Managed care document / Estate recovery notice / Other |
| **Date Reviewed** | Date the audit was performed |
| **Beneficiary ID** | Medi-Cal beneficiary identification number (BIC), if available |
| **Applicable Statute** | Specific WIC, 42 USC, or other section implicated |
| **Applicable Regulation** | Specific 22 CCR, 42 CFR, or MPP section implicated |
| **Finding** | Description of the eligibility error, coverage denial, or procedural failure |
| **Severity** | CRITICAL / HIGH / MEDIUM / LOW |
| **Beneficiary Impact** | Loss of coverage / Delayed care / Financial harm / Procedural rights violation |
| **Evidence** | Specific text, calculation error, timeline failure, or absence constituting the finding |
| **Remediation** | Recommended corrective action — fair hearing, redetermination, managed care appeal, hardship waiver |
| **Deadline** | Applicable timeline — 90 days for fair hearing, 45/90 days for application, other |
| **Status** | OPEN / IN PROGRESS / REMEDIATED / FAIR HEARING REQUESTED / ESCALATED |

---
name: tila-truth-in-lending-audit
description: Passive audit layer that flags Truth in Lending Act violations, Regulation Z noncompliance, and TRID disclosure failures in loan documents, credit card agreements, mortgage disclosures, and advertising materials.
---

# TILA Truth in Lending Audit

**Purpose**

Identifies violations of federal and California truth-in-lending laws by auditing loan disclosures, credit card agreements, mortgage documents, Loan Estimates, Closing Disclosures, refinancing paperwork, and advertising materials against TILA, Regulation Z, TRID requirements, HOEPA high-cost mortgage protections, and the CARD Act.

## Governing Standards

### Federal Statutes
- **15 USC § 1601** — Congressional findings and declaration of purpose (TILA)
- **15 USC § 1602** — Definitions: creditor, consumer, open-end credit, closed-end credit, finance charge, APR
- **15 USC § 1604** — Disclosure guidelines (Federal Reserve / CFPB authority)
- **15 USC § 1605** — Determination of finance charge (all costs incident to credit)
- **15 USC § 1606** — Determination of annual percentage rate
- **15 USC § 1631** — Disclosure requirements for open-end credit (credit cards, HELOCs)
- **15 USC § 1632** — Form of disclosure: clear, conspicuous, meaningful sequence
- **15 USC § 1635** — Right of rescission (3 business days, extended to 3 years if not properly disclosed)
- **15 USC § 1635(a)** — Security interest in principal dwelling: right to rescind until midnight of third business day
- **15 USC § 1635(f)** — Absolute 3-year limit on right of rescission
- **15 USC § 1637** — Open-end credit: periodic statement requirements, billing error resolution
- **15 USC § 1637(a)** — Credit card initial disclosures (APR, fees, grace period, balance computation method)
- **15 USC § 1638** — Closed-end credit: required disclosures (amount financed, APR, finance charge, total of payments, payment schedule)
- **15 USC § 1638(b)(2)** — Mortgage transaction disclosures (Loan Estimate timing)
- **15 USC § 1639** — Requirements for certain mortgages (HOEPA high-cost)
- **15 USC § 1639(a)-(b)** — HOEPA disclosure requirements (at least 3 days before consummation)
- **15 USC § 1639(c)-(h)** — HOEPA prohibitions: balloon payments, negative amortization, prepayment penalties, lending without regard to repayment ability
- **15 USC § 1639c** — Minimum standards for residential mortgage loans (ability-to-repay / qualified mortgage)
- **15 USC § 1639d** — Escrow or impound accounts (higher-priced mortgage loans)
- **15 USC § 1639f** — Requirements for prompt crediting and payoff statements
- **15 USC § 1639h** — Property appraisal requirements (independent, certified)
- **15 USC § 1640** — Civil liability: actual damages, statutory damages (2x finance charge or $200-$2,000 individual / $1M class), attorney fees
- **15 USC § 1640(e)** — Statute of limitations: 1 year from violation (3 years rescission)
- **15 USC § 1641** — Liability of assignees (violations apparent on face of disclosure)
- **15 USC § 1643** — Credit card liability limitation ($50 unauthorized use)
- **15 USC § 1644** — Fraudulent use of credit cards
- **15 USC § 1661-1665b** — Credit card provisions (CARD Act amendments)
- **15 USC § 1665b** — Advance notice of rate increase (45 days)
- **15 USC § 1665c** — Interest rate reduction program (CARD Act reevaluation every 6 months)
- **15 USC § 1665d** — Reasonable penalty fees and charges
- **15 USC § 1665e** — Consideration of consumer ability to pay (CARD Act)

### California Statutes
- **Cal. Civil Code § 1916-1916.12** — Usury law and constitutional exemptions
- **Cal. Financial Code § 22000 et seq** — California Financing Law (CFL) — licensed lenders
- **Cal. Financial Code § 4970 et seq** — California covered loan protections (state HOEPA equivalent)
- **Cal. Financial Code § 4973** — Prohibited acts for covered loans (flipping, equity stripping, steering)
- **Cal. Civil Code § 1632** — Translation requirements: contract negotiated in Spanish, Chinese, Tagalog, Vietnamese, or Korean must provide translated disclosure
- **Cal. Civil Code § 2924-2924.19** — Homeowner Bill of Rights (non-judicial foreclosure protections)
- **Cal. Civil Code § 2923.4-2923.7** — Single point of contact, dual tracking prohibition
- **Cal. Bus. & Prof. Code § 10240** — Real estate broker disclosure requirements
- **Cal. Bus. & Prof. Code § 17200** — Unfair Competition Law (UCL) — TILA violations as unfair business practices

### Regulatory
- **12 CFR Part 1026** — Regulation Z (Truth in Lending)
- **12 CFR § 1026.1** — Authority, purpose, coverage, organization
- **12 CFR § 1026.2** — Definitions (creditor, consumer, dwelling, residential mortgage transaction)
- **12 CFR § 1026.4** — Finance charge: what is and is not included
- **12 CFR § 1026.17** — General disclosure requirements (clear, conspicuous, written, before consummation)
- **12 CFR § 1026.18** — Content of closed-end credit disclosures
- **12 CFR § 1026.19** — Certain mortgage and variable-rate transactions
- **12 CFR § 1026.19(e)** — Loan Estimate: provided within 3 business days of application
- **12 CFR § 1026.19(f)** — Closing Disclosure: provided at least 3 business days before consummation
- **12 CFR § 1026.19(e)(3)** — Tolerance categories: zero tolerance, 10% cumulative tolerance, no tolerance limit
- **12 CFR § 1026.19(f)(2)** — Revised Closing Disclosure: 3-day waiting period resets for APR increase >1/8%, prepayment penalty added, or product change
- **12 CFR § 1026.20** — Subsequent disclosure requirements (refinancing, rate adjustments)
- **12 CFR § 1026.22** — Determination of annual percentage rate
- **12 CFR § 1026.23** — Right of rescission (3 business days, extended 3 years)
- **12 CFR § 1026.23(b)** — Notice of right to rescind: 2 copies to each consumer with ownership interest
- **12 CFR § 1026.24** — Advertising (triggering terms require full disclosures)
- **12 CFR § 1026.25** — Record retention (2 years from disclosures, 3 years from action required)
- **12 CFR § 1026.32** — High-cost mortgages (HOEPA): APR and points-and-fees triggers
- **12 CFR § 1026.33** — Requirements for reverse mortgages
- **12 CFR § 1026.34** — Prohibited acts for high-cost mortgages
- **12 CFR § 1026.35** — Higher-priced mortgage loans (HPML): appraisal, escrow requirements
- **12 CFR § 1026.36** — Prohibited acts for loan originators (compensation, steering)
- **12 CFR § 1026.37** — Content of Loan Estimate form
- **12 CFR § 1026.38** — Content of Closing Disclosure form
- **12 CFR § 1026.39** — Mortgage transfer disclosures (30-day notice to borrower)
- **12 CFR § 1026.41** — Periodic statements for residential mortgage loans
- **12 CFR § 1026.43** — Ability-to-repay / Qualified Mortgage rule
- **12 CFR Part 1026, Appendix D** — Multiple advance construction loans
- **12 CFR Part 1026, Appendix H** — Closed-end model forms and clauses
- **12 CFR Part 1026, Appendix J** — Annual percentage rate computations (actuarial method)

## Audit Triggers

- Loan Estimate (LE) form
- Closing Disclosure (CD) form
- Truth-in-Lending disclosure statement (pre-TRID)
- Good Faith Estimate (pre-TRID, for comparison)
- HUD-1 / HUD-1A Settlement Statement (pre-TRID, for comparison)
- Promissory note or loan agreement
- Adjustable rate mortgage (ARM) disclosure and rate adjustment notice
- Credit card agreement, application, or solicitation
- Credit card periodic statement
- Credit card change-in-terms notice
- Right of rescission notice
- HELOC application disclosure and account-opening disclosure
- HOEPA high-cost mortgage disclosure
- Mortgage advertising materials (print, digital, broadcast)
- Loan originator compensation agreement
- Mortgage transfer or servicing transfer notice
- Refinancing disclosure documents
- Reverse mortgage disclosure and counseling certificate
- Appraisal and property valuation documents
- Ability-to-repay / Qualified Mortgage documentation

## Audit Checklist

### Loan Estimate (12 CFR § 1026.37 / § 1026.19(e))

- [ ] Loan Estimate provided within 3 business days of receiving application
- [ ] Application defined: name, income, SSN, property address, property value estimate, loan amount sought
- [ ] Consumer cannot be charged fees (except bona fide credit report fee) before LE provided and intent to proceed received
- [ ] LE contains loan terms: loan amount, interest rate, monthly principal and interest, prepayment penalty, balloon payment
- [ ] LE contains projected payments table with itemized escrow amounts
- [ ] LE contains closing costs details: loan costs (A, B, C) and other costs (D, E, F, G, H)
- [ ] LE contains cash to close table
- [ ] LE contains APR, total interest percentage (TIP), and total of payments
- [ ] Zero-tolerance items: fees creditor controls, transfer taxes, fees for required service where creditor selected provider
- [ ] 10% cumulative tolerance items: recording fees, required services consumer can shop for but used creditor-referred provider
- [ ] No tolerance limit items: prepaid interest, property insurance, services consumer shopped for independently
- [ ] Revised LE issued only for valid changed circumstance (§ 1026.19(e)(4))
- [ ] Revised LE provided within 3 business days of changed circumstance
- [ ] Expiration date on LE: at least 10 business days for consumer to indicate intent to proceed

### Closing Disclosure (12 CFR § 1026.38 / § 1026.19(f))

- [ ] Closing Disclosure provided at least 3 business days before consummation
- [ ] CD reflects actual loan terms and closing costs
- [ ] CD includes comparison to Loan Estimate (LE vs. CD column)
- [ ] Tolerance cures: excess amounts refunded within 60 days of consummation
- [ ] 3-day waiting period resets if: APR increases by more than 1/8% (fixed) or 1/4% (ARM), prepayment penalty added, or basic loan product changes
- [ ] Seller's CD provided to seller (or combined CD with consumer)
- [ ] Corrected CD provided within 30 days if non-numeric clerical errors discovered post-consummation
- [ ] Corrected CD provided within 60 days if tolerance violation discovered post-consummation

### APR and Finance Charge Accuracy (15 USC §§ 1605-1606 / 12 CFR §§ 1026.4, 1026.22)

- [ ] Finance charge includes all costs incident to extension of credit
- [ ] Finance charge excludes only items specifically permitted (application fees if charged to all, late charges, seller points)
- [ ] APR calculated using actuarial method per Appendix J
- [ ] APR accuracy tolerance: 1/8% for regular transactions, 1/4% for irregular transactions
- [ ] Mortgage APR accuracy: within 1/8% for fixed rate, 1/4% for variable rate
- [ ] Total of payments = sum of all payments consumer will make
- [ ] Amount financed = amount of credit provided minus prepaid finance charges

### Right of Rescission (15 USC § 1635 / 12 CFR § 1026.23)

- [ ] Right of rescission applies to credit secured by consumer's principal dwelling (not purchase money)
- [ ] Two copies of notice of right to rescind provided to each consumer with ownership interest
- [ ] Notice clearly discloses: security interest, right to rescind, how to rescind, effects of rescission, expiration date
- [ ] 3 business day rescission period observed (no disbursement during period)
- [ ] If rescission notice not provided or material disclosures inaccurate, right extends to 3 years
- [ ] Upon rescission: security interest voided, consumer not liable for finance charges, creditor returns money/property within 20 days
- [ ] Refinancing by same creditor: rescission right applies unless no new money advanced

### HOEPA High-Cost Mortgage (12 CFR § 1026.32)

- [ ] APR trigger: first-lien exceeds APOR by 6.5%, subordinate-lien by 8.5%
- [ ] Points-and-fees trigger: exceeds 5% of total loan amount (or $1,000 for loans under $20,000)
- [ ] Prepayment penalty trigger: charged more than 36 months after consummation or exceeds 2% of prepaid amount
- [ ] HOEPA disclosures provided at least 3 business days before consummation
- [ ] No balloon payment (for loans under 5 years)
- [ ] No negative amortization
- [ ] No prepayment penalties exceeding HOEPA limits
- [ ] No lending without reasonable ability to repay determination
- [ ] No financing of points and fees
- [ ] No modification or deferral fees
- [ ] Homeownership counseling from HUD-approved agency before consummation

### Higher-Priced Mortgage Loans (12 CFR § 1026.35)

- [ ] HPML trigger: APR exceeds APOR by 1.5% (first-lien) or 3.5% (subordinate-lien)
- [ ] Appraisal by certified or licensed appraiser with interior inspection
- [ ] Second appraisal for flipped properties (seller acquired within 180 days, price increase >10%)
- [ ] Copy of appraisal provided to consumer at least 3 days before consummation
- [ ] Escrow account established for property taxes and insurance (at least 5 years for first-lien)

### Credit Card Protections (CARD Act / 15 USC §§ 1637, 1665b-e)

- [ ] 45-day advance notice of significant changes (rate increase, fee changes)
- [ ] Rate increase reevaluated every 6 months; rate reduced if appropriate
- [ ] No interest rate increase during first year (with limited exceptions)
- [ ] Payments applied to highest-rate balance first (amounts exceeding minimum)
- [ ] Minimum payment warning: time to pay off at minimum vs. 36-month payoff amount
- [ ] Penalty fee reasonable and proportional to violation
- [ ] No over-limit fee unless consumer opted in to over-limit transactions
- [ ] No double-cycle billing
- [ ] Ability-to-pay assessment before account opening or credit limit increase
- [ ] Under-21 requirement: independent ability to pay or co-signer
- [ ] Billing statements mailed at least 21 days before payment due date
- [ ] Due date same day each month; if weekend/holiday, payment accepted next business day without penalty

### Advertising (12 CFR § 1026.24)

- [ ] If triggering term used (e.g., "10% down," "$500/month," "financing available"), all required disclosures included
- [ ] Closed-end triggering term disclosures: APR, loan terms, down payment
- [ ] No misleading use of "fixed" for variable-rate products
- [ ] APR displayed as prominently as any triggering term
- [ ] No advertisement of rate that is not available or is bait-and-switch
- [ ] Tax deductibility claims include "consult a tax advisor" language if used
- [ ] Open-end credit advertising: if rate disclosed, stated as APR

### Ability-to-Repay / Qualified Mortgage (12 CFR § 1026.43)

- [ ] Eight ATR underwriting factors considered: income, employment, payment on loan, payment on simultaneous loans, other obligations, DTI, credit history, remaining mortgage term
- [ ] Verified using third-party records (pay stubs, tax returns, bank statements)
- [ ] Monthly payment calculated using fully-indexed rate and fully-amortizing schedule
- [ ] Qualified Mortgage safe harbor: DTI ≤ 43% (or GSE/FHA-eligible), points-and-fees ≤ 3%, no risky features
- [ ] QM rebuttable presumption: for loans exceeding HPML threshold

## Output Protocol

Each finding must be recorded in the following format:

| Field | Value |
|---|---|
| **Finding ID** | TILA-YYYY-NNN |
| **Document Reviewed** | [filename / document title] |
| **Date of Document** | [date on document face] |
| **Audit Date** | [date audit performed] |
| **Statute Violated** | [specific USC section or Reg Z section] |
| **Violation Category** | Disclosure / APR-Finance Charge / Rescission / HOEPA / HPML / CARD Act / Advertising / ATR-QM / Timing |
| **Transaction Type** | Closed-End Mortgage / Open-End Credit / Credit Card / HELOC / Reverse Mortgage |
| **Severity** | Critical / High / Medium / Low |
| **Finding Description** | [plain-language description of the violation] |
| **Evidence** | [quoted text, calculated vs. disclosed figures, or absence noted] |
| **Legal Requirement** | [what the statute or regulation requires] |
| **Actual Condition** | [what the document shows or fails to show] |
| **Financial Impact** | [dollar amount of overcharge, miscalculation, or exposure] |
| **Remediation** | [specific corrective action required] |
| **Rescission Exposure** | [whether extended rescission right may be triggered] |
| **Damages Exposure** | [statutory: 2x finance charge ($200-$2,000) + actual + attorney fees] |
| **Tolerance Status** | [within tolerance / exceeds tolerance / N/A] |
| **Cross-References** | [related RESPA findings, prior disclosures, or origination documents] |

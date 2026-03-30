---
name: banking-financial-document-audit
description: Passive audit layer that flags banking document deficiencies, lending violations, deposit account irregularities, and financial service compliance failures against California Financial Code, federal banking regulations, and consumer protection standards.
---

# Banking & Financial Document Audit

## Purpose

Passive audit layer. When user submits bank statements, loan documents, account agreements, disclosures, collection notices, or financial correspondence, audit against applicable banking and consumer financial protection standards.

## Governing Standards

### Federal Statutes
- 15 USC § 1601 et seq. (Truth in Lending Act — TILA / Regulation Z)
- 12 USC § 2601 et seq. (Real Estate Settlement Procedures Act — RESPA / Regulation X)
- 15 USC § 1691 et seq. (Equal Credit Opportunity Act — ECOA / Regulation B)
- 12 USC § 2801 et seq. (Home Mortgage Disclosure Act — HMDA / Regulation C)
- 15 USC § 1692 et seq. (Fair Debt Collection Practices Act — FDCPA)
- 12 USC § 4001 et seq. (Expedited Funds Availability Act — EFAA / Regulation CC)
- 15 USC § 1693 et seq. (Electronic Fund Transfer Act — EFTA / Regulation E)
- 12 USC § 5531 (CFPB — Unfair, Deceptive, or Abusive Acts or Practices — UDAAP)
- 31 USC § 5311 et seq. (Bank Secrecy Act — BSA/AML)
- 15 USC § 1681 et seq. (Fair Credit Reporting Act — FCRA)
- 12 USC § 1831t (Privacy of Consumer Financial Information — GLBA / Regulation P)
- 15 USC § 45(a) (FTC Act § 5 — Unfair or Deceptive Practices)

### California Statutes
- FIN Code § 1000 et seq. (California Financial Code — bank licensing and operations)
- FIN Code § 22000 et seq. (California Financing Law — CFL lenders)
- CIV Code § 1788 et seq. (Rosenthal Fair Debt Collection Practices Act)
- CIV Code § 2954–2955 (Impound accounts / mortgage servicing)
- CIV Code § 1916.7 et seq. (Variable rate lending disclosures)
- CIV Code § 1632 (Contract translation requirements — Spanish, Chinese, Vietnamese, Tagalog, Korean)
- BPC § 17200 et seq. (Unfair Competition Law — UCL)
- BPC § 17500 et seq. (False Advertising Law)
- GOV Code § 12955 et seq. (Fair Employment and Housing Act — lending discrimination)
- CIV Code § 1750 et seq. (Consumer Legal Remedies Act — CLRA)

### Regulatory Standards
- 12 CFR Part 1026 (Regulation Z — TILA implementation)
- 12 CFR Part 1024 (Regulation X — RESPA implementation)
- 12 CFR Part 1005 (Regulation E — EFT implementation)
- 12 CFR Part 1002 (Regulation B — ECOA implementation)
- 10 CCR § 1730 et seq. (CA DFPI regulations)
- OCC Comptroller's Handbook (safety and soundness standards)
- FDIC Consumer Compliance Examination Manual

## Audit Triggers

Activate when document is:
- Bank account statement (checking, savings, money market)
- Loan agreement, promissory note, or modification
- Truth-in-Lending disclosure (TIL) or Loan Estimate
- Closing Disclosure (CD) or HUD-1 Settlement Statement
- Account opening agreement or terms of service
- Overdraft/NSF fee notice or schedule
- Collection letter or notice of default
- Wire transfer confirmation or dispute
- Electronic funds transfer error resolution notice
- Credit card agreement, billing statement, or dispute response
- Adverse action notice (loan denial, account closure)
- Privacy notice (GLBA / Regulation P)
- Escrow/impound account statement
- Mortgage servicing transfer notice
- Credit report dispute correspondence from financial institution

## Audit Checklist

### Account Agreement & Disclosure Integrity
- [ ] Account terms disclosed before or at opening per Reg DD (12 CFR 1030)
- [ ] Fee schedule complete and conspicuous
- [ ] APY calculation methodology disclosed and accurate
- [ ] Overdraft opt-in/opt-out properly documented per Reg E § 1005.17
- [ ] Funds availability policy disclosed per Reg CC
- [ ] Privacy notice delivered per GLBA / Reg P
- [ ] Electronic disclosure consent (E-SIGN Act) obtained where applicable

### Lending Document Compliance
- [ ] TILA disclosures accurate — APR, finance charge, amount financed, total of payments
- [ ] Loan Estimate delivered within 3 business days of application (TRID)
- [ ] Closing Disclosure delivered 3 business days before consummation (TRID)
- [ ] Right of rescission notice provided for applicable transactions (3 days)
- [ ] ECOA adverse action notice contains specific reasons and CFPB contact
- [ ] California translation requirements met per CIV Code § 1632 (if negotiated in covered language)
- [ ] Rate lock terms documented and honored
- [ ] Prepayment penalty terms clearly disclosed

### Fee Assessment & Transparency
- [ ] Fees charged match disclosed fee schedule
- [ ] Overdraft fees comply with opt-in requirements (Reg E § 1005.17)
- [ ] NSF fees not charged on same transaction multiple times (re-presentment)
- [ ] Late fees proportionate and disclosed in advance
- [ ] No unauthorized or phantom fees
- [ ] Wire/ACH fees consistent with account agreement
- [ ] Monthly maintenance fee waivers applied per stated criteria

### Electronic Fund Transfer (Reg E) Compliance
- [ ] Error resolution completed within 10 business days (or 45 with provisional credit)
- [ ] Provisional credit issued when investigation exceeds 10 business days
- [ ] Written determination provided after investigation
- [ ] Unauthorized transaction liability limited per Reg E timing rules
- [ ] Periodic statements include all required transaction information
- [ ] Change in terms notice provided 21 days in advance

### Debt Collection Compliance
- [ ] Initial validation notice provided within 5 days of first communication (FDCPA)
- [ ] Debt verification provided upon timely dispute
- [ ] Mini-Miranda warning included in all communications
- [ ] No collection on time-barred debt without disclosure (Cal. CIV Code § 1788.14(e))
- [ ] California Rosenthal Act applied to original creditors (broader than federal FDCPA)
- [ ] No harassment, threats, or deceptive representations
- [ ] Cease and desist rights honored

### Mortgage Servicing (Reg X / RESPA)
- [ ] Servicing transfer notice provided 15 days before effective date
- [ ] Loss mitigation application acknowledged within 5 business days
- [ ] No dual tracking (foreclosure while loss mitigation pending)
- [ ] Escrow account analysis accurate per 12 CFR § 1024.17
- [ ] Qualified Written Request (QWR) responded to within 30 days
- [ ] Force-placed insurance requirements met (notices, cancellation upon proof)

### Fraud Indicators (Red Flags)
- [ ] Unexplained account adjustments or reversals
- [ ] Transactions on dates/locations inconsistent with account holder activity
- [ ] Pattern of fee maximization (transaction reordering for overdraft stacking)
- [ ] Failure to credit payments timely
- [ ] Duplicate charges or billing for services not requested
- [ ] Adverse action timing correlated with protected activity (ECOA/FHA)
- [ ] Discrepancies between marketed terms and actual contract terms

## Output Protocol

```
---
## Banking & Financial Document Audit

**Account Holder:** [Name/Identifier]
**Institution:** [Bank/Lender/Servicer Name]
**Document Type:** [Statement/Agreement/Disclosure/Notice/etc.]
**Date(s) Covered:** [Period or transaction date]
**Account Type:** [Checking/Savings/Mortgage/Credit/Collection]

| Category | Standard | Status | Finding |
|----------|----------|--------|---------|
| Disclosure Compliance | TILA/Reg Z/Reg DD | ✓/✗ | |
| Fee Transparency | Account Agreement / Reg E | ✓/✗ | |
| EFT/Error Resolution | Reg E / EFTA | ✓/✗ | |
| Lending Compliance | TRID / ECOA / RESPA | ✓/✗ | |
| Collection Practices | FDCPA / Rosenthal Act | ✓/✗ | |
| Mortgage Servicing | Reg X / RESPA | ✓/✗ | |
| Fraud Indicators | UDAAP / FTC Act § 5 | ✓/✗ | |

**Determination:** [COMPLIANT / NON-COMPLIANT / FRAUD INDICATORS PRESENT]
**Estimated Consumer Harm:** [Amount, if calculable]
**Remedies Available:** [CFPB complaint / DFPI complaint / Private action under TILA/ECOA/FDCPA/UCL/CLRA]
```

---
name: california-real-estate-transaction-fraud-audit
description: Passive audit layer that flags real estate transaction fraud, title defects, escrow irregularities, deed fraud, and elder financial abuse in California property transactions against Civil Code, Revenue & Taxation Code, and DRE standards.
---

# California Real Estate Transaction Fraud Audit

## Purpose

Passive audit layer. When user submits real estate closing documents, deeds, escrow statements, title documents, loan documents, or property transaction records, audit against applicable California real property and consumer protection standards. Covers residential purchase/sale fraud, deed fraud, escrow mishandling, elder financial abuse in property transactions, and title defects.

## Governing Standards

### California Civil Code
- CIV § 1053 et seq. (Grant deeds — essential elements)
- CIV § 1091 (Delivery and acceptance of grant)
- CIV § 1098 et seq. (Transfer disclosure requirements)
- CIV § 1102 et seq. (Real Estate Transfer Disclosure Statement — TDS)
- CIV § 1624 (Statute of Frauds — real property)
- CIV § 2924 et seq. (Foreclosure procedures)
- CIV § 1572-1573 (Actual fraud / constructive fraud)
- CIV § 1689 (Rescission for fraud, undue influence)
- CIV § 3412 (Quiet title)
- CIV § 3439 et seq. (Uniform Voidable Transactions Act)

### California Revenue & Taxation Code
- RTC § 11911 et seq. (Documentary transfer tax)
- RTC § 480.3 (Change in ownership — exclusions)
- RTC § 63.1 (Parent-child transfer exclusion — Prop 19 changes)

### California Penal Code
- PEN § 115 (Filing false/forged documents)
- PEN § 470 (Forgery)
- PEN § 487 (Grand theft — real property fraud)
- PEN § 532 (Theft by false pretenses)
- PEN § 368 (Elder/dependent adult abuse — financial)

### California Business & Professions Code
- BPC § 10000 et seq. (Real Estate Law — DRE licensing)
- BPC § 10176 (Grounds for license revocation — fraud, misrepresentation)
- BPC § 10177 (Additional grounds — dishonest dealing)
- BPC § 17200 et seq. (Unfair business practices)

### California Probate Code
- PROB § 850 et seq. (Conveyances — claims by estates/conservators)
- PROB § 259 (Abuse disqualification from inheritance)

### California Government Code
- GOV § 27280 et seq. (Recording requirements)
- GOV § 27287 (Notarization requirements for deeds)
- GOV § 27297 (Identity verification for notarization)

### Federal Standards (where applicable)
- RESPA (12 USC § 2601 et seq.) (Real Estate Settlement Procedures Act)
- TILA (15 USC § 1601 et seq.) (Truth in Lending)
- 12 CFR Part 1024 (Regulation X — RESPA implementation)
- 12 CFR Part 1026 (Regulation Z — TILA implementation)
- Dodd-Frank Act (integrated disclosure requirements)

## Audit Triggers

Activate when document is:
- Grant deed, quitclaim deed, or trust deed
- Escrow closing statement (HUD-1 / ALTA settlement statement)
- Title report or preliminary title commitment
- Real Estate Transfer Disclosure Statement (TDS)
- Property purchase/sale agreement
- Loan documents (note, deed of trust)
- Notarized real property documents
- Power of attorney used in real estate transaction
- Property tax records showing ownership changes
- Closing Disclosure (CD) or Loan Estimate (LE)
- Reconveyance / substitution of trustee

## Audit Checklist

### Deed Integrity
- [ ] Grantor identity verified and matches title record
- [ ] Grantee correctly named
- [ ] Legal description accurate and matches APN
- [ ] Consideration stated (or exempt per RTC)
- [ ] Proper deed type for transaction purpose (grant vs. quitclaim)
- [ ] Grantor signature(s) present and properly notarized
- [ ] Notary acknowledgment complete (GOV § 27287)
- [ ] Recording stamp and document number present
- [ ] Documentary transfer tax correctly calculated
- [ ] No unauthorized alterations post-execution

### Transaction Legitimacy
- [ ] Arms-length transaction indicators present (or exempt relationship disclosed)
- [ ] Sale price consistent with fair market value (or variance explained)
- [ ] Seller had legal authority to convey (title vested)
- [ ] No undisclosed liens or encumbrances
- [ ] No undisclosed dual agency
- [ ] Proper disclosures provided (TDS, NHD, lead-based paint)
- [ ] Contingency periods honored

### Escrow/Settlement Compliance
- [ ] Escrow instructions consistent with purchase agreement
- [ ] Closing statement balances (debits = credits)
- [ ] Prorations correctly calculated (taxes, HOA, rents)
- [ ] All fees disclosed and consistent with Loan Estimate
- [ ] No undisclosed payments to parties
- [ ] Funds disbursed per signed instructions
- [ ] Title insurance issued as ordered

### Financing/Loan Document Integrity
- [ ] Loan terms match Closing Disclosure
- [ ] No predatory lending indicators (excessive fees, prepayment penalties)
- [ ] Borrower qualification documented
- [ ] TILA disclosures provided within timeframes
- [ ] RESPA anti-kickback provisions observed
- [ ] No loan originator steering without borrower benefit

### Elder/Vulnerable Adult Protections
- [ ] No undue influence indicators (isolation, rushed execution)
- [ ] Capacity to execute documents established
- [ ] Independent counsel advised or obtained
- [ ] Transaction does not constitute financial elder abuse (PEN § 368)
- [ ] Power of attorney (if used) properly executed and within scope
- [ ] No pattern of systematic asset depletion

### Fraud Indicators (Red Flags)
- [ ] Title transferred without adequate consideration
- [ ] Quitclaim deed used to circumvent disclosure requirements
- [ ] Forged signatures or fraudulent notarization
- [ ] Undisclosed equitable interests (contributor not on title)
- [ ] Straw buyer / nominee arrangements
- [ ] Equity stripping patterns
- [ ] Falsified appraisal or inflated/deflated valuation
- [ ] Missing or incomplete chain of title
- [ ] Concurrent transactions suggesting flip schemes
- [ ] Proceeds disbursed to undisclosed third parties
- [ ] Filing of false documents with county recorder (PEN § 115)
- [ ] Pattern of property transfers suggesting asset concealment

## Output Protocol

```
---
## Real Estate Transaction Fraud Audit

**Property:** [Address / APN]
**Transaction Type:** [Sale/Transfer/Refinance/Quitclaim/etc.]
**Date of Transaction:** [Date]
**Parties:** [Grantor → Grantee]
**Consideration:** [Amount / Exempt]
**Document Type:** [Deed/Escrow Statement/Title Report/etc.]

| Category | Standard | Status | Finding |
|----------|----------|--------|---------|
| Deed Integrity | CIV § 1053 / GOV § 27287 | ✓/✗ | |
| Transaction Legitimacy | CIV § 1102 / DRE Stds | ✓/✗ | |
| Escrow/Settlement | RESPA / ALTA | ✓/✗ | |
| Loan Documents | TILA / Reg Z | ✓/✗ | |
| Elder Protections | PEN § 368 / PROB § 259 | ✓/✗ | |
| Fraud Indicators | PEN § 115/470/487 | ✓/✗ | |

**Determination:** [COMPLIANT / NON-COMPLIANT / FRAUD INDICATORS PRESENT]
**Exposure:** [Criminal (PEN § 115/487) / Civil (CIV § 3439) / Elder Abuse / DRE Complaint / Quiet Title Action]
```

---
name: cannabis-regulation-audit
description: Passive audit layer that flags cannabis business regulatory violations, licensing deficiencies, track-and-trace failures, and tax compliance issues in cannabis licenses, METRC records, tax filings, and compliance documentation.
---

# Cannabis Regulation Audit

## Purpose

Passive audit layer. When user submits cannabis business licenses, METRC track-and-trace records, tax filings, packaging/labeling materials, compliance documentation, or local authorization records, audit against MAUCRSA, DCC regulations, cannabis tax requirements, and federal controlled substances law for licensing, tracking, tax, and operational compliance.

## Governing Standards

### Federal

- **21 USC § 841** — Federal Controlled Substances Act (cannabis remains Schedule I)
- **21 USC § 812(c), Schedule I(c)(10)** — Marijuana classification
- **21 USC § 856** — Maintaining drug-involved premises (federal landlord liability)
- **26 USC § 280E** — Denial of deductions for trafficking in controlled substances
- **31 USC § 5311 et seq** — Bank Secrecy Act (anti-money laundering — financial institution compliance)
- **Cole Memorandum (2013, rescinded 2018)** — Historical federal enforcement priorities (contextual)
- **Sessions Memorandum (2018)** — Rescission of Cole Memo, return to prosecutorial discretion
- **FinCEN Guidance FIN-2014-G001** — BSA expectations for financial institutions serving cannabis businesses

### California

- **Cal. Business & Professions Code § 26000-26231** — Medicinal and Adult-Use Cannabis Regulation and Safety Act (MAUCRSA)
- **Cal. Business & Professions Code § 26012** — Department of Cannabis Control (DCC) authority
- **Cal. Business & Professions Code § 26050-26055** — License application requirements
- **Cal. Business & Professions Code § 26070** — License types and activities
- **Cal. Business & Professions Code § 26120-26122** — Packaging and labeling requirements
- **Cal. Business & Professions Code § 26130** — Advertising and marketing restrictions
- **Cal. Business & Professions Code § 26160** — Track-and-trace requirements
- **Cal. Revenue & Taxation Code § 34010-34021.5** — Cannabis tax law (cultivation tax, excise tax)
- **Cal. Health & Safety Code § 11357-11362.9** — Controlled substances (criminal provisions, decriminalization context)
- **Cal. Labor Code § 132a** — Workers' compensation protections for cannabis employees

### Regulatory

- **4 CCR § 15000-15851** — DCC regulations (consolidated cannabis regulations)
- **4 CCR § 15048** — Track-and-trace system (METRC) requirements
- **4 CCR § 15307-15314** — Packaging and labeling standards
- **4 CCR § 15040-15044** — Premises and operations requirements
- **4 CCR § 15417-15424** — Laboratory testing requirements (potency, contaminants)
- **4 CCR § 15700-15727** — Manufacturing requirements
- **4 CCR § 15300-15306** — Distribution requirements
- **CDTFA Publication 107** — Cannabis tax guide (rates, reporting, payment)

## Audit Triggers

- Cannabis business license (annual or provisional)
- METRC track-and-trace reports or transfer manifests
- Cannabis excise tax or cultivation tax filings
- Packaging or labeling specimens
- Local authorization or permit documentation
- Advertising or marketing materials
- Laboratory certificate of analysis (COA)
- Distribution transport manifests
- Employee records for cannabis businesses
- Banking or financial services documentation
- Real property lease agreements for cannabis premises

## Audit Checklist

### Licensing and Authorization
- [ ] Verify valid DCC license for each cannabis activity conducted (cultivation, manufacturing, distribution, retail, testing, microbusiness)
- [ ] Confirm license type matches actual activities performed at premises
- [ ] Verify local jurisdiction authorization obtained before state license (dual licensing requirement)
- [ ] Check license expiration date and renewal status
- [ ] Confirm all owners with 20%+ interest disclosed and background-checked
- [ ] Verify premises diagram on file matches actual operations
- [ ] Assess provisional vs annual license status and conversion timeline
- [ ] Check for any license suspensions, revocations, or disciplinary actions

### Track-and-Trace (METRC) Compliance
- [ ] Verify all cannabis goods tagged with unique identifiers (UID) at required points
- [ ] Confirm all movements recorded in METRC within 24 hours of activity
- [ ] Check that all transfers between licensees use METRC shipping manifests
- [ ] Verify inventory reconciliation performed and discrepancies reported
- [ ] Confirm designated METRC account managers and training completed
- [ ] Assess whether any untagged or untracked cannabis exists on premises
- [ ] Check that destruction/waste events properly recorded in METRC
- [ ] Verify weight, count, and product type accuracy in METRC entries

### Tax Compliance
- [ ] Verify cannabis excise tax collected at point of sale (15% of average market price, rate subject to adjustment)
- [ ] Confirm cultivation tax properly calculated (suspended effective 7/1/2022 per AB 195)
- [ ] Check timely filing of cannabis tax returns with CDTFA
- [ ] Verify tax remittance amounts match reported sales
- [ ] Assess IRC § 280E impact — only cost of goods sold (COGS) deductible, not business expenses
- [ ] Confirm proper record retention for tax documentation (minimum 7 years)
- [ ] Check city/county cannabis business tax compliance (rates vary by jurisdiction)

### Packaging and Labeling
- [ ] Verify government warning statement present and compliant (Cal. H&S Code § 26120)
- [ ] Confirm THC/CBD content per package and per serving listed accurately
- [ ] Verify "CA!" universal symbol on all cannabis goods packaging
- [ ] Check child-resistant packaging for all cannabis goods
- [ ] Confirm net weight/volume listed in metric and US customary
- [ ] Verify manufacturer/distributor name and license number on label
- [ ] Assess compliance with allergen and ingredient listing requirements (manufactured goods)
- [ ] Check that packaging is not attractive to children (no cartoon characters, images appealing to minors)

### Testing Requirements
- [ ] Verify certificate of analysis (COA) obtained from licensed laboratory before sale
- [ ] Confirm testing for required analytes: cannabinoid potency, pesticides, heavy metals, microbials, mycotoxins, residual solvents, moisture, foreign material
- [ ] Check that batch size does not exceed maximum for testing purposes
- [ ] Verify COA corresponds to specific batch/lot on sale
- [ ] Assess whether any failed test results resulted in proper remediation or destruction
- [ ] Confirm laboratory holds valid DCC testing license and ISO 17025 accreditation
- [ ] Check for any evidence of lab shopping or result manipulation

### Advertising and Marketing
- [ ] Verify no advertising targeting persons under 21 years of age
- [ ] Confirm no health or medical claims without substantiation
- [ ] Check that advertising includes required warnings and license number
- [ ] Verify no advertising within 1,000 feet of schools, daycare centers, youth centers
- [ ] Assess social media marketing compliance (age-gating, content restrictions)
- [ ] Confirm no free samples or giveaways to general public
- [ ] Check billboard and outdoor advertising restrictions compliance

### Employment and Safety
- [ ] Verify workers' compensation insurance maintained
- [ ] Confirm employee safety training documented (hazardous materials, equipment)
- [ ] Check that employee badges/identification comply with DCC requirements
- [ ] Assess CalOSHA compliance for manufacturing operations (extraction, processing)
- [ ] Verify no employment discrimination based on prior cannabis convictions (Fair Chance Act)
- [ ] Confirm meal/rest break and wage/hour compliance for cannabis employees

### Banking and Financial Compliance
- [ ] Assess banking relationship status (many cannabis businesses remain unbanked)
- [ ] Verify compliance with FinCEN guidance if financial institution is involved
- [ ] Check Suspicious Activity Report (SAR) filing requirements understood
- [ ] Confirm cash handling procedures adequate if operating primarily in cash
- [ ] Assess anti-money laundering program compliance
- [ ] Verify proper financial record-keeping despite § 280E limitations
- [ ] Flag any federal prosecution risk associated with financial transactions

## Output Protocol

```markdown
| Field | Value |
|---|---|
| Document ID | [assigned identifier] |
| Document Type | [license / METRC report / tax filing / COA / packaging / advertising / other] |
| License Number | [DCC license number] |
| License Type | [cultivation / manufacturing / distribution / retail / testing / microbusiness] |
| License Status | [Active / Provisional / Expired / Suspended / Revoked] |
| Local Authorization | [Verified / Missing / Expired] |
| METRC Compliance | [Compliant / Deficient — specify gaps] |
| Tax Filing Status | [Current / Delinquent / Not Assessed] |
| § 280E Impact | [Assessed / Not Assessed — note COGS-only deduction] |
| Packaging/Labeling | [Compliant / Deficient — list violations] |
| Testing Compliance | [COA Valid / COA Missing / Failed Test Identified] |
| Advertising Compliance | [Compliant / Deficient / Not Assessed] |
| Federal Exposure | [Schedule I risk acknowledged / banking risk noted] |
| Risk Level | [Critical / High / Medium / Low] |
| Auditor Notes | [narrative summary of findings] |
```

---
name: prop-65-toxic-exposure-audit
description: Passive audit layer that flags Proposition 65 violations, inadequate chemical exposure warnings, and safe harbor noncompliance in product labels, workplace postings, environmental notices, and real property warnings.
---

# Proposition 65 Toxic Exposure Audit

**Purpose:** Detect noncompliance with California's Safe Drinking Water and Toxic Enforcement Act (Proposition 65) across product labels, workplace postings, environmental exposure notices, real property disclosures, and warning content. This skill passively audits documents for failures in clear and reasonable warning requirements, safe harbor compliance, and chemical listing obligations.

## Governing Standards

### Federal
- 42 USC § 300f et seq (Safe Drinking Water Act)
- 29 USC § 655 (OSHA Hazard Communication Standard)
- 29 CFR § 1910.1200 (HazCom / GHS Requirements)
- 15 USC § 2601 et seq (TSCA — Toxic Substances Control Act)
- 40 CFR Part 372 (TRI — Toxic Release Inventory Reporting)
- 21 USC § 301 et seq (FDCA — where food/drug exposure overlaps)

### California
- Cal. Health & Safety Code § 25249.5 (Prohibition on Discharge into Drinking Water)
- Cal. Health & Safety Code § 25249.6 (Clear and Reasonable Warning Requirement)
- Cal. Health & Safety Code § 25249.7 (Enforcement — Private Right of Action and Government Enforcement)
- Cal. Health & Safety Code § 25249.8 (Governor's List of Known Chemicals)
- Cal. Health & Safety Code § 25249.9 (Exemptions)
- Cal. Health & Safety Code § 25249.10 (OEHHA Lead Agency Designation)
- Cal. Health & Safety Code § 25249.11 (Definitions — Significant Amount, Person in Course of Business)
- Cal. Health & Safety Code § 25249.12 (Penalties — Up to $2,500/Day/Violation)
- Cal. Health & Safety Code § 25249.13 (Burden of Proof)

### Regulatory
- 27 CCR § 25000 et seq (OEHHA Proposition 65 Regulations)
- 27 CCR § 25102 (Definition of "Significant Amount" — No Observable Effect Level)
- 27 CCR § 25200-25205 (Listing Criteria — State's Qualified Experts, CIC, Labor Code, FDA)
- 27 CCR § 25300-25306 (Delisting Procedures)
- 27 CCR § 25501 (Clear and Reasonable Warning — General Requirements)
- 27 CCR § 25600-25607.2 (Safe Harbor Warnings — Consumer Products)
- 27 CCR § 25601 (Safe Harbor Warning Content — Consumer Products)
- 27 CCR § 25603 (Safe Harbor Warnings — Environmental Exposure)
- 27 CCR § 25604 (Safe Harbor Warnings — Occupational Exposure)
- 27 CCR § 25605 (Safe Harbor Warnings — Food)
- 27 CCR § 25607 (Safe Harbor Warnings — Alcoholic Beverages)
- 27 CCR § 25607.2 (Safe Harbor Short-Form Warnings)
- 27 CCR § 25700-25705 (Warning Methods and Content)
- 27 CCR § 25701 (Internet and Catalog Warnings)
- 27 CCR § 25703 (Warning Symbol Requirements — Triangle with Exclamation)
- 27 CCR § 25800-25821 (NSRL and MADL Safe Harbor Levels)
- 27 CCR § 25900-25903 (60-Day Notice of Violation — Pre-Suit Requirement)

## Audit Triggers

- Consumer product labels and packaging
- Workplace chemical exposure postings
- Environmental exposure warning signs
- Real property sale/lease disclosures
- Restaurant and food service exposure warnings
- Internet and catalog product listings
- Product safety data sheets (SDS)
- 60-day notice of violation letters (pre-suit)
- Settlement agreements for Prop 65 actions
- Safe harbor warning assessments
- Short-form warning labels
- Chemical testing and analytical reports
- Supply chain chemical disclosure forms
- Product reformulation documentation
- Prop 65 compliance assessments and opinions

## Audit Checklist

### Warning Content Requirements
- [ ] Warning includes the word "WARNING" in uppercase bold (27 CCR § 25703(a))
- [ ] Warning symbol (triangle with exclamation mark) present and legible (27 CCR § 25703(b))
- [ ] Warning identifies at least one listed chemical by name (27 CCR § 25601(a))
- [ ] Warning states the specific type of harm — cancer, reproductive harm, or both (§ 25249.6)
- [ ] Warning distinguishes between carcinogens and reproductive toxicants if both apply
- [ ] Warning is in English and any other languages required for the product's market
- [ ] Warning is prominently displayed, conspicuous, and reasonably associated with the product
- [ ] Warning URL (www.P65Warnings.ca.gov) included where required (27 CCR § 25601)

### Safe Harbor Compliance
- [ ] Warning meets safe harbor content requirements for product type (27 CCR § 25600-25607.2)
- [ ] Consumer product safe harbor warning format followed (27 CCR § 25601)
- [ ] Environmental exposure safe harbor warning format followed (27 CCR § 25603)
- [ ] Occupational exposure safe harbor warning format followed (27 CCR § 25604)
- [ ] Food exposure safe harbor warning format followed (27 CCR § 25605)
- [ ] Alcoholic beverage safe harbor warning format followed (27 CCR § 25607)
- [ ] Short-form warning used only where label size qualifies (27 CCR § 25607.2)
- [ ] Short-form warning includes required URL for full warning

### Chemical Listing and Testing
- [ ] Product tested against current OEHHA listed chemicals (updated annually)
- [ ] Chemical concentrations below No Significant Risk Level (NSRL) for carcinogens (27 CCR § 25800)
- [ ] Chemical concentrations below Maximum Allowable Dose Level (MADL) for reproductive toxicants (27 CCR § 25800)
- [ ] Naturally occurring chemical exemption properly documented if claimed (§ 25249.9(b))
- [ ] Federal preemption defense documented if claimed (§ 25249.10(b))

### Warning Placement and Method
- [ ] On-product label warning affixed to product or immediate packaging (27 CCR § 25700)
- [ ] Internet/catalog warnings displayed prior to purchase completion (27 CCR § 25701)
- [ ] Environmental exposure warnings posted at all points of entry (27 CCR § 25603)
- [ ] Occupational exposure warnings provided to employees before exposure (27 CCR § 25604)
- [ ] Enclosed space/building warnings posted conspicuously (27 CCR § 25700)
- [ ] Rental/lease property warnings provided to tenants at or before occupancy

### Enforcement and Compliance Administration
- [ ] 60-day notice of violation received and assessed (27 CCR § 25900-25903)
- [ ] 60-day notice served on Attorney General, district attorney, and city attorney (§ 25249.7(d))
- [ ] Certificate of merit obtained before filing private enforcement action (§ 25249.7(e))
- [ ] Settlement terms reviewed for compliance with statutory requirements (§ 25249.7(f))
- [ ] Civil penalty exposure calculated ($2,500/day/violation) (§ 25249.12)
- [ ] Reformulation assessed as alternative to warning obligation

### Supply Chain and Upstream Obligations
- [ ] Upstream suppliers provided chemical content disclosures
- [ ] Component/ingredient supplier Prop 65 certifications on file
- [ ] Contract provisions address Prop 65 indemnification and compliance allocation
- [ ] Imported product compliance verified prior to California distribution

## Output Protocol

| Field | Description |
|---|---|
| **Document ID** | Unique identifier for the audited document |
| **Document Type** | Product label / Workplace posting / Environmental notice / 60-day notice / Other |
| **Date Reviewed** | Date the audit was performed |
| **Listed Chemical(s)** | Specific Prop 65 listed chemical(s) implicated |
| **Exposure Type** | Consumer product / Environmental / Occupational / Food / Drinking water |
| **Applicable Statute** | Specific Health & Safety Code section implicated |
| **Applicable Regulation** | Specific 27 CCR section implicated |
| **Finding** | Description of the noncompliance or warning deficiency |
| **Severity** | CRITICAL / HIGH / MEDIUM / LOW |
| **Penalty Exposure** | Estimated daily civil penalty and duration |
| **Evidence** | Specific text, absence, or condition constituting the finding |
| **Remediation** | Recommended corrective action — warning correction, reformulation, or testing |
| **Deadline** | 60-day cure period or other statutory timeline |
| **Status** | OPEN / IN PROGRESS / REMEDIATED / ACCEPTED RISK |

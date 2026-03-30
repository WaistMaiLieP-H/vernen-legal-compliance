---
name: whistleblower-retaliation-audit
description: Passive audit layer that flags whistleblower retaliation, qui tam procedure failures, and protected activity discrimination in termination records, complaints, settlement agreements, and employer communications.
---

# Whistleblower Retaliation Audit

## Purpose

Passive audit layer. When user submits termination records, internal complaints, settlement agreements, HR correspondence, or employer communications, audit against federal and California whistleblower protection statutes, qui tam procedural requirements, and retaliation analysis frameworks.

## Governing Standards

### Federal

- **31 USC § 3729-3733** — False Claims Act (qui tam provisions, anti-retaliation § 3730(h))
- **18 USC § 1514A** — SOX § 806 (whistleblower protection for publicly traded companies)
- **15 USC § 78u-6** — Dodd-Frank § 922 (SEC whistleblower protections and bounty program)
- **29 USC § 660(c)** — OSHA § 11(c) (general occupational safety whistleblower)
- **49 USC § 31105** — Surface Transportation Assistance Act (STAA) whistleblower protection
- **42 USC § 5851** — Energy Reorganization Act (nuclear/DOE whistleblower)
- **18 USC § 1513(e)** — Federal criminal retaliation statute
- **McDonnell Douglas Corp. v. Green, 411 U.S. 792 (1973)** — Burden-shifting framework

### California

- **Cal. Labor Code § 1102.5** — General whistleblower protection (report to government or internal authority)
- **Cal. Labor Code § 1102.6** — Employer burden of proof (clear and convincing evidence)
- **Cal. Labor Code § 98.6** — Retaliation for filing wage claims
- **Cal. Gov. Code § 8547-8547.12** — State Employee Whistleblower Protection Act (California Whistleblower Protection Act)
- **Cal. Health & Safety Code § 1278.5** — Healthcare whistleblower protection (patient safety)
- **Cal. Gov. Code § 12653** — California False Claims Act (anti-retaliation provision)
- **Cal. Labor Code § 6310** — Retaliation for occupational safety complaints

### Regulatory

- **29 CFR Part 1980** — SOX whistleblower complaint procedures (OSHA)
- **29 CFR Part 1982** — Dodd-Frank whistleblower procedures
- **17 CFR § 240.21F** — SEC whistleblower rules and award program
- **OSHA Whistleblower Investigations Manual** — Procedural guidance for all 25+ federal statutes

## Audit Triggers

- Termination letters, separation agreements, or RIF documentation
- Internal complaint or ethics hotline records
- Qui tam complaints (sealed or unsealed)
- Settlement agreements with non-disparagement or confidentiality clauses
- HR investigation reports involving complainants
- Performance reviews following protected activity
- OSHA or SEC whistleblower filings
- LWDA or EEOC retaliation charges
- Employer communications referencing employee reports to regulators
- Demotion, transfer, or schedule change documentation post-complaint

## Audit Checklist

### Protected Activity Identification
- [ ] Identify whether employee engaged in protected activity under applicable statute
- [ ] Determine if report was to a government or law enforcement agency (§ 1102.5(b))
- [ ] Determine if report was internal to a supervisor or designated authority (§ 1102.5(b))
- [ ] Assess whether employee had reasonable belief that violation occurred
- [ ] Verify whether complaint involves fraud against the government (qui tam eligibility)
- [ ] Document whether activity is protected under federal, state, or both frameworks

### Temporal Proximity Analysis
- [ ] Document date of protected activity with specificity
- [ ] Document date of adverse action with specificity
- [ ] Calculate elapsed time between protected activity and adverse action
- [ ] Flag any adverse action within 90 days of protected activity as presumptively retaliatory
- [ ] Identify pattern of escalating adverse actions following protected disclosure
- [ ] Cross-reference performance review timing against complaint timeline

### Adverse Action Assessment
- [ ] Identify all adverse employment actions (termination, demotion, suspension, transfer)
- [ ] Assess whether constructive discharge conditions exist
- [ ] Evaluate whether non-obvious retaliation occurred (schedule changes, isolation, exclusion)
- [ ] Determine if employer altered job duties, removed responsibilities, or reassigned work
- [ ] Check for retaliatory investigation or surveillance post-complaint
- [ ] Assess whether negative references were provided to prospective employers

### Burden-Shifting Framework Analysis
- [ ] Apply McDonnell Douglas framework: prima facie case elements documented
- [ ] Evaluate employer's articulated legitimate non-retaliatory reason
- [ ] Assess evidence of pretext (inconsistency, deviation from policy, shifting rationale)
- [ ] Under SOX/Dodd-Frank: apply contributing factor test (lower standard than motivating factor)
- [ ] Under Cal. Labor Code § 1102.6: verify employer meets clear and convincing evidence standard
- [ ] Document comparator evidence (similarly situated employees treated differently)

### Qui Tam Procedural Compliance
- [ ] Verify complaint filed under seal per 31 USC § 3730(b)(2)
- [ ] Confirm government served with complaint and material evidence disclosure
- [ ] Check 60-day seal period and any extensions
- [ ] Determine whether government elected to intervene or decline
- [ ] Assess original source requirements if public disclosure bar applies
- [ ] Verify relator's share calculation (15-30% if government intervenes, 25-30% if not)

### Settlement Agreement Review
- [ ] Flag overbroad confidentiality clauses that restrict future reporting to government agencies
- [ ] Identify non-disparagement provisions that could chill protected activity
- [ ] Verify settlement does not waive right to file future SEC or OSHA complaints
- [ ] Check for adequate consideration and knowing/voluntary waiver requirements
- [ ] Assess whether OWBPA requirements met if employee is 40+ (21/45 day review, 7-day revocation)
- [ ] Flag any provision requiring repayment if employee cooperates with government investigation

### Statute of Limitations Verification
- [ ] SOX § 806: 180 days from violation to OSHA complaint
- [ ] Dodd-Frank § 922: 6 years from violation (3-year discovery rule)
- [ ] False Claims Act § 3730(h): 3 years from date employer knew of protected activity
- [ ] Cal. Labor Code § 1102.5: 3 years (post-AB 1947, effective 1/1/2022)
- [ ] OSHA § 11(c): 30 days from violation
- [ ] Cal. Health & Safety Code § 1278.5: assess applicable limitations
- [ ] Determine whether continuing violation doctrine extends filing period

### Remedies Assessment
- [ ] Calculate back pay from date of adverse action to resolution
- [ ] Assess front pay or reinstatement appropriateness
- [ ] Document compensatory damages (emotional distress, reputational harm)
- [ ] Evaluate punitive damages availability (not available under SOX, available under state law)
- [ ] Calculate attorney fees and costs entitlement under applicable statute
- [ ] Dodd-Frank: assess double back pay eligibility
- [ ] FCA qui tam: calculate relator's percentage share of recovery

## Output Protocol

```markdown
| Field | Value |
|---|---|
| Document ID | [assigned identifier] |
| Document Type | [termination letter / complaint / settlement / HR record / other] |
| Protected Activity Identified | [Yes / No / Insufficient Information] |
| Statute(s) Implicated | [list applicable statutes] |
| Adverse Action Type | [termination / demotion / suspension / constructive discharge / other] |
| Temporal Proximity | [days between protected activity and adverse action] |
| Burden-Shifting Standard | [contributing factor / motivating factor / McDonnell Douglas] |
| Employer Burden Met | [Yes / No / Insufficient Evidence] |
| Qui Tam Procedural Compliance | [Compliant / Deficient / N/A] |
| Settlement Clause Flags | [list problematic provisions or "None"] |
| Statute of Limitations Status | [Timely / Expired / Equitable Tolling Argument Available] |
| Remedies Available | [list applicable remedies] |
| Risk Level | [Critical / High / Medium / Low] |
| Auditor Notes | [narrative summary of findings] |
```

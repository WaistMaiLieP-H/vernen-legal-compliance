---
name: data-breach-notification-audit
description: Passive audit layer that flags data breach notification failures, delayed reporting, inadequate notice content, and regulatory reporting gaps in breach notification letters, incident response plans, forensic reports, and regulatory filings.
---

# Data Breach Notification Audit

## Purpose

Passive audit layer. When user submits breach notification letters, incident response plans, forensic investigation reports, regulatory filings, or internal breach assessment documentation, audit against California breach notification statutes, HIPAA breach rules, SEC disclosure requirements, and federal regulatory frameworks for notification timing, content adequacy, and reporting compliance.

## Governing Standards

### Federal

- **45 CFR §§ 164.400-164.414** — HIPAA Breach Notification Rule (covered entities and business associates)
- **45 CFR § 164.402** — Definition of breach (unsecured PHI, risk assessment)
- **45 CFR § 164.404** — Individual notification requirements (60 days from discovery)
- **45 CFR § 164.406** — Media notification (breaches affecting 500+ in a state/jurisdiction)
- **45 CFR § 164.408** — HHS/OCR notification (Breach Notification Portal)
- **15 USC § 6801-6809** — Gramm-Leach-Bliley Act (financial institution safeguards)
- **16 CFR Part 314** — FTC Safeguards Rule (notification requirements added 2023)
- **17 CFR § 229.106** — SEC Regulation S-K Item 106 (cybersecurity risk management disclosure)
- **SEC Form 8-K Item 1.05** — Material cybersecurity incident disclosure (4 business days)
- **SEC Rule 10-K Annual Report** — Cybersecurity risk management, strategy, and governance disclosure
- **Regulation (EU) 2016/679, Art. 33-34** — GDPR 72-hour notification (if EU data subjects affected)

### California

- **Cal. Civil Code § 1798.29** — Breach notification by state agencies
- **Cal. Civil Code § 1798.82** — Breach notification by businesses
- **Cal. Civil Code § 1798.29(e) / § 1798.82(e)** — Content requirements for notification
- **Cal. Civil Code § 1798.29(a) / § 1798.82(a)** — "Most expedient time possible and without unreasonable delay"
- **Cal. Civil Code § 1798.29(d) / § 1798.82(d)** — Substitute notice provisions
- **Cal. Civil Code § 1798.29(h) / § 1798.82(j)** — Personal information definition (expanded effective 1/1/2020)
- **Cal. Civil Code § 1798.150** — CCPA private right of action for data breaches (unauthorized access due to failure to maintain reasonable security)
- **Cal. Civil Code § 1798.81.5** — Reasonable security measures requirement

### Regulatory

- **FTC Health Breach Notification Rule (16 CFR Part 318)** — Non-HIPAA health data breaches
- **NIST SP 800-61 Rev. 2** — Computer Security Incident Handling Guide
- **NIST Cybersecurity Framework (CSF)** — Respond and Recover functions
- **PCI DSS v4.0 Requirement 12.10** — Incident response plan requirements
- **State AG Notification Statutes** — All 50 states have breach notification laws (cross-reference per affected population)
- **CISA Cyber Incident Reporting (CIRCIA)** — Critical infrastructure reporting (72 hours for covered incidents, 24 hours for ransom payments)

## Audit Triggers

- Breach notification letters to affected individuals
- Breach notification filings with state attorneys general
- HHS/OCR breach notification portal submissions
- SEC Form 8-K cybersecurity incident disclosures
- Incident response plans or playbooks
- Forensic investigation reports (internal or third-party)
- Internal breach assessment or risk-of-harm analysis
- Insurance claim documentation (cyber liability policies)
- Vendor/third-party breach notifications received
- Substitute notice publications (website posting, media notice)

## Audit Checklist

### Breach Determination and Scoping
- [ ] Verify whether incident meets legal definition of "breach" under applicable statute(s)
- [ ] Determine categories of personal information compromised (SSN, driver's license, financial account, medical, biometric, login credentials)
- [ ] Assess expanded California PI definition: includes biometric data, tax ID, passport, military ID, unique identification number on government document
- [ ] Determine number of individuals affected (total and by state/jurisdiction)
- [ ] Assess whether encryption safe harbor applies (data encrypted and key not compromised)
- [ ] For HIPAA: conduct four-factor risk assessment per 45 CFR § 164.402(2)
- [ ] Determine date of breach discovery vs date of breach occurrence
- [ ] Identify root cause (unauthorized access, ransomware, employee error, vendor compromise, physical theft)

### Notification Timing Compliance
- [ ] California: verify notification provided in "most expedient time possible and without unreasonable delay" (no fixed statutory deadline, but 30-45 days is typical AG expectation)
- [ ] HIPAA: verify individual notification within 60 days of discovery
- [ ] HIPAA: verify HHS notification within 60 days (500+) or annual log submission (under 500)
- [ ] SEC: verify Form 8-K filed within 4 business days of materiality determination
- [ ] GDPR: verify supervisory authority notification within 72 hours (if applicable)
- [ ] FTC Safeguards Rule: verify notification within 60 days
- [ ] Document any delay and justification (law enforcement request, investigation needs)
- [ ] Assess whether notification delay was reasonable under circumstances

### Notification Content Adequacy (California)
- [ ] Confirm notice includes name and contact information of notifying entity
- [ ] Verify notice describes types of personal information involved in the breach
- [ ] Check notice includes date, estimated date, or date range of breach
- [ ] Confirm description of the incident in general terms
- [ ] Verify notice describes what entity has done in response (investigation, remediation)
- [ ] Check that notice advises individual on self-protective steps
- [ ] Confirm notice includes toll-free numbers for credit reporting agencies (if SSN or financial info involved)
- [ ] Verify notice header: "Notice of Data Breach" (California-specific requirement, Title 20 in at least 12-point type)

### HIPAA-Specific Compliance
- [ ] Verify notification to each affected individual by first-class mail or email (if consented)
- [ ] If 500+ affected in a state: confirm media notification to prominent media outlets
- [ ] Verify breach reported on HHS OCR Breach Portal with required data elements
- [ ] Assess whether business associate properly notified covered entity within BAA timeframe
- [ ] Check business associate agreement provisions for breach notification obligations
- [ ] Evaluate whether breach qualifies for any HIPAA exception (unintentional access, inadvertent disclosure, good faith belief information not retained)
- [ ] Verify HIPAA breach log maintained for breaches under 500 individuals

### SEC Disclosure Compliance
- [ ] Assess whether cybersecurity incident is "material" under securities law standards
- [ ] Verify Form 8-K Item 1.05 disclosure filed within 4 business days of materiality determination
- [ ] Check that 8-K describes material aspects: nature, scope, timing, and material impact or reasonably likely impact
- [ ] Assess whether national security / public safety delay exception invoked (DOJ authorization)
- [ ] Verify 10-K annual report includes cybersecurity risk management and governance disclosure (Reg S-K Item 106)
- [ ] Check for subsequent 8-K amendments updating initial disclosure

### Substitute Notice Assessment
- [ ] Determine if entity qualifies for substitute notice (cost exceeds $250,000, affected class exceeds 500,000, or insufficient contact information)
- [ ] Verify substitute notice includes email notice, conspicuous website posting, and notification to major statewide media
- [ ] Confirm website posting is conspicuous and maintained for minimum required period
- [ ] Assess whether substitute notice content meets same requirements as direct notice

### Regulatory Reporting
- [ ] Identify all state AG offices requiring notification (based on affected individuals' residences)
- [ ] Verify state AG notifications filed with required content and timing per each state's statute
- [ ] If financial institution: assess GLBA reporting obligations to primary federal regulator
- [ ] If critical infrastructure: assess CISA CIRCIA reporting obligations
- [ ] Document all regulatory notifications with dates, recipients, and confirmation
- [ ] Maintain copies of all notifications sent for audit trail

### CCPA Private Right of Action Exposure
- [ ] Assess whether breach resulted from failure to implement and maintain reasonable security (§ 1798.150)
- [ ] Evaluate statutory damages exposure: $100-$750 per consumer per incident
- [ ] Calculate aggregate exposure based on affected California residents
- [ ] Assess whether 30-day cure notice was received and whether cure is possible
- [ ] Evaluate class action risk based on breach scope and affected population
- [ ] Document security measures in place at time of breach for reasonableness defense

## Output Protocol

```markdown
| Field | Value |
|---|---|
| Document ID | [assigned identifier] |
| Document Type | [notification letter / forensic report / AG filing / 8-K / incident response plan / other] |
| Breach Date (Occurrence) | [date or range] |
| Breach Date (Discovery) | [date] |
| Personal Information Types | [list categories compromised] |
| Individuals Affected | [total count, by state if available] |
| Encryption Safe Harbor | [Applicable / Not Applicable — explain] |
| Notification Timing | [Timely / Delayed — days elapsed from discovery] |
| California Notice Content | [Compliant / Deficient — list missing elements] |
| HIPAA Compliance | [Compliant / Deficient / N/A] |
| HHS/OCR Notification | [Filed / Not Filed / N/A] |
| SEC 8-K Filed | [Yes — date / No / N/A (non-public company)] |
| State AG Notifications | [list states notified or "Not Assessed"] |
| Substitute Notice Used | [Yes — compliant / Yes — deficient / No] |
| CCPA § 1798.150 Exposure | [estimated range or "Not Assessed"] |
| Root Cause | [category of incident] |
| Risk Level | [Critical / High / Medium / Low] |
| Auditor Notes | [narrative summary of findings] |
```

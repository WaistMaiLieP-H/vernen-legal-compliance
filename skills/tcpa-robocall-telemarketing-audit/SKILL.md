---
name: tcpa-robocall-telemarketing-audit
description: Passive audit layer that flags Telephone Consumer Protection Act violations, Do Not Call noncompliance, and autodialer/prerecorded message violations in call records, consent forms, marketing materials, and compliance documentation.
---

# TCPA Robocall & Telemarketing Audit

## Purpose

Passive audit layer. When user submits call records, consent forms, marketing scripts, compliance documentation, or customer complaints, audit against TCPA, FCC rules, TSR requirements, and California telemarketing statutes for autodialer violations, consent deficiencies, and Do Not Call noncompliance.

## Governing Standards

### Federal

- **47 USC § 227** — Telephone Consumer Protection Act (TCPA)
- **47 USC § 227(b)(1)(A)** — Prohibition on autodialer/prerecorded calls to cell phones without consent
- **47 USC § 227(b)(1)(B)** — Prohibition on prerecorded calls to residential lines
- **47 USC § 227(c)** — Do Not Call provisions and private right of action
- **47 USC § 227(b)(3)** — Private right of action ($500 per violation, trebled for willful)
- **Facebook, Inc. v. Duguid, 141 S. Ct. 1163 (2021)** — ATDS definition narrowed (random/sequential number generator required)
- **16 CFR Part 310** — Telemarketing Sales Rule (TSR) (FTC)
- **47 USC § 227(e)** — Caller ID spoofing prohibitions
- **Junk Fax Prevention Act (JFPA)** — 47 USC § 227(b)(1)(C) (unsolicited fax advertisements)

### California

- **Cal. Business & Professions Code § 17590-17594** — California Do Not Call implementation
- **Cal. Civil Code § 1770(a)(22.1)** — CLRA (disseminating recorded message without opt-out)
- **Cal. Public Utilities Code § 2871-2876** — California telephone solicitation restrictions
- **Cal. Business & Professions Code § 17538.41-17538.45** — Automatic dialing-announcing devices
- **Cal. Penal Code § 653m** — Annoying/harassing telephone calls

### Regulatory

- **47 CFR § 64.1200** — FCC rules implementing TCPA (consent, DNC, caller ID)
- **47 CFR § 64.1200(a)(2)** — Prior express written consent for telemarketing
- **47 CFR § 64.1200(d)** — Company-specific Do Not Call list requirements
- **FCC Declaratory Ruling 2015-0355** — Expanded TCPA interpretations (partially reversed by Duguid)
- **FCC Order 23-105 (2023)** — One-to-one consent rule, lead generator restrictions
- **National Do Not Call Registry** — 16 CFR § 310.4(b)(1)(iii)

## Audit Triggers

- Outbound call records or dialer logs
- Consent forms or opt-in documentation
- Marketing scripts (telemarketing or prerecorded)
- Customer complaints alleging unwanted calls or texts
- Do Not Call compliance policies or scrub records
- Text message marketing campaigns or SMS records
- Dialer system configuration documentation
- Lead purchase agreements or lead generation contracts
- Fax marketing materials or fax broadcast logs
- Caller ID assignment records

## Audit Checklist

### ATDS / Autodialer Analysis
- [ ] Determine whether calling system uses random or sequential number generator (Duguid standard)
- [ ] Assess whether system stores numbers and dials from a list (post-Duguid: likely not ATDS)
- [ ] Document specific dialer technology and software version
- [ ] Evaluate whether predictive/power dialer functions meet ATDS definition under applicable circuit
- [ ] Check whether system has capacity to generate random numbers even if not currently used
- [ ] Flag any calls to cell phones using autodialer without prior express consent

### Consent Documentation
- [ ] Verify prior express written consent obtained before telemarketing calls/texts
- [ ] Confirm consent form includes clear and conspicuous disclosure
- [ ] Verify consent is not a condition of purchase (47 CFR § 64.1200(a)(2))
- [ ] Check that consent specifies the particular seller authorized to call
- [ ] Validate one-to-one consent (FCC 2023 rule — no blanket lead generator consent)
- [ ] Confirm consent includes signature (electronic or physical)
- [ ] Assess revocation mechanisms — must be reasonable and honored promptly
- [ ] Check for reassigned number safe harbor compliance (Reassigned Numbers Database)

### Do Not Call Compliance
- [ ] Verify registration with National Do Not Call Registry access
- [ ] Confirm DNC list scrubbed within 31 days of download
- [ ] Verify company-specific DNC list maintained and honored
- [ ] Check that DNC requests processed within 30 days
- [ ] Assess established business relationship (EBR) exception — 18 months from transaction, 3 months from inquiry
- [ ] Verify calling hours compliance (8am-9pm recipient's time zone)
- [ ] Confirm caller ID displays accurate name and number
- [ ] Document DNC policy provided to consumers upon request

### Prerecorded / Artificial Voice Messages
- [ ] Verify prior express consent for informational prerecorded calls to cell phones
- [ ] Verify prior express written consent for telemarketing prerecorded calls
- [ ] Confirm prerecorded message includes opt-out mechanism at beginning of message
- [ ] Check that opt-out is automated and available throughout the message
- [ ] Verify residential prerecorded calls include identification and callback number
- [ ] Assess emergency purpose exception applicability

### Text Message / SMS Compliance
- [ ] Verify prior express written consent obtained for marketing text messages
- [ ] Confirm opt-out mechanism honored (STOP, CANCEL, END, etc.)
- [ ] Check frequency of messages against disclosed frequency in consent
- [ ] Assess whether texts sent to reassigned numbers
- [ ] Verify text messages include sender identification
- [ ] Evaluate whether content matches scope of consent provided
- [ ] Check for SHAFT content restrictions if applicable (sex, hate, alcohol, firearms, tobacco)

### Fax Advertising (JFPA)
- [ ] Verify prior express invitation or permission for fax advertisements
- [ ] Confirm opt-out notice on face of fax advertisement
- [ ] Check that opt-out mechanism is toll-free and available 24/7
- [ ] Assess established business relationship exception (fax-specific EBR rules)
- [ ] Verify fax sender identification included on face of fax

### Statutory Damages Exposure
- [ ] Calculate number of potentially non-compliant calls/texts
- [ ] Apply $500 per violation baseline (47 USC § 227(b)(3)(B))
- [ ] Assess willfulness for treble damages ($1,500 per violation)
- [ ] Evaluate class action exposure (number of affected consumers)
- [ ] Calculate DNC violation exposure ($500 per violation, 47 USC § 227(c)(5))
- [ ] Assess state law additional penalties (Cal. B&P Code § 17593 — $2,500 per violation)
- [ ] Flag aggregate exposure threshold for materiality assessment

### TSR Compliance (FTC)
- [ ] Verify TSR disclosures made before payment (cost, quantity, terms, refund policy)
- [ ] Check for prohibited misrepresentations
- [ ] Confirm no payment demands via unauthorized billing
- [ ] Assess abandoned call rate (no more than 3% per campaign per 30-day period)
- [ ] Verify abandoned calls deliver prerecorded message within 2 seconds
- [ ] Check that upsells comply with consent requirements
- [ ] Confirm entity-specific DNC list maintained per TSR

## Output Protocol

```markdown
| Field | Value |
|---|---|
| Document ID | [assigned identifier] |
| Document Type | [call records / consent form / marketing script / complaint / DNC policy / other] |
| ATDS Classification | [ATDS / Non-ATDS / Indeterminate — cite Duguid analysis] |
| Consent Status | [Valid Written Consent / Valid Oral Consent / Deficient / Missing] |
| Consent Deficiency Detail | [specify deficiency or "None"] |
| DNC Compliance | [Compliant / Deficient / Not Assessed] |
| Prerecorded Message Compliance | [Compliant / Deficient / N/A] |
| SMS Compliance | [Compliant / Deficient / N/A] |
| Reassigned Number Risk | [Assessed / Not Assessed] |
| Estimated Violation Count | [number of potentially non-compliant contacts] |
| Per-Violation Damages | [$500 / $1,500 (willful)] |
| Aggregate Exposure Estimate | [calculated total] |
| Class Action Risk | [High / Medium / Low] |
| Risk Level | [Critical / High / Medium / Low] |
| Auditor Notes | [narrative summary of findings] |
```

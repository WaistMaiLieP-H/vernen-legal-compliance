---
name: coppa-childrens-privacy-audit
description: Passive audit layer that flags Children's Online Privacy Protection Act violations, age verification failures, and parental consent deficiencies in website/app privacy policies, data collection practices, and consent mechanisms.
---

# COPPA Children's Privacy Audit

## Purpose

Passive audit layer. When user submits website or app privacy policies, data collection documentation, consent mechanisms, age-gating implementations, or marketing materials directed at children, audit against COPPA, FTC COPPA Rule, and California children's privacy statutes for compliance deficiencies.

## Governing Standards

### Federal

- **15 USC § 6501-6506** — Children's Online Privacy Protection Act (COPPA)
- **15 USC § 6502(b)** — Regulations on unfair/deceptive acts directed at children
- **15 USC § 6502(a)** — Prohibition on collection without verifiable parental consent
- **15 USC § 6501(2)** — Definition of "child" (under 13)
- **15 USC § 6501(4)** — Definition of "operator"
- **15 USC § 6503** — Safe harbor provisions
- **15 USC § 6505** — FTC enforcement authority (violations treated as unfair/deceptive under FTC Act)

### California

- **Cal. Business & Professions Code § 22580-22582** — Privacy Rights for California Minors in the Digital World (eraser law, marketing restrictions)
- **Cal. Civil Code § 1798.99.28-1798.99.40** — California Age-Appropriate Design Code Act (CAADCA)
- **Cal. Business & Professions Code § 22575-22579** — CalOPPA (general online privacy policy requirements)
- **Cal. Civil Code § 1798.100 et seq** — CCPA/CPRA (provisions applicable to minors' data § 1798.120(c)-(d))

### Regulatory

- **16 CFR Part 312** — FTC COPPA Rule (implementing regulations)
- **16 CFR § 312.2** — Definitions (actual knowledge, constructive knowledge, personal information)
- **16 CFR § 312.3** — Regulation of unfair/deceptive acts (operator obligations)
- **16 CFR § 312.4** — Notice requirements (direct notice and posted notice)
- **16 CFR § 312.5** — Verifiable parental consent requirements and approved methods
- **16 CFR § 312.6** — Right of parent to review and delete
- **16 CFR § 312.7** — Prohibition on conditioning participation on disclosure
- **16 CFR § 312.8** — Confidentiality, security, and integrity of personal information
- **16 CFR § 312.10** — Data retention and deletion requirements
- **16 CFR § 312.11** — Safe harbor programs (CARU, iKeepSafe, kidSAFE, PRIVO, TRUSTe/TrustArc)
- **FTC Policy Statement on COPPA (2013 Amendments)** — Expanded personal information definition

## Audit Triggers

- Website or mobile app privacy policies
- Age-gating or age verification mechanisms
- Parental consent forms or verification procedures
- Data collection forms or registration flows targeting children
- In-app purchase or virtual goods documentation
- Advertising or marketing materials on child-directed platforms
- Third-party SDK or analytics integration documentation
- Teacher or school consent documentation
- Safe harbor program certifications or applications
- FTC complaint or enforcement correspondence

## Audit Checklist

### Operator and Audience Determination
- [ ] Determine whether website/app is directed to children under 13 (totality of circumstances)
- [ ] Assess subject matter, visual content, language, age of models, music, and animation
- [ ] Evaluate whether advertising on the site/app is directed to children
- [ ] Determine whether operator has actual knowledge of collecting information from children under 13
- [ ] Assess constructive knowledge standard — whether operator should have known users are under 13
- [ ] Identify all operators and third parties with access to children's personal information
- [ ] Determine whether mixed-audience site properly implements age-screening

### Privacy Policy Notice Requirements
- [ ] Verify privacy policy is clearly linked on homepage and every page where data is collected
- [ ] Confirm policy lists all operators collecting personal information through the site/app
- [ ] Verify description of personal information collected from children
- [ ] Check that policy describes how personal information is used
- [ ] Confirm disclosure of whether personal information is shared with third parties
- [ ] Verify policy describes parental rights (consent, review, deletion, opt-out)
- [ ] Confirm contact information for all operators listed in policy
- [ ] Assess readability and clarity of privacy policy (understandable to non-lawyers)

### Verifiable Parental Consent (VPC)
- [ ] Verify VPC obtained before collecting, using, or disclosing children's personal information
- [ ] Assess VPC method against FTC-approved methods (signed consent form, credit card transaction, knowledge-based authentication, government ID, video call, facial recognition comparison)
- [ ] Evaluate whether "email plus" method properly limited to internal use only
- [ ] Check that consent is verifiable and attributable to the parent/guardian
- [ ] Confirm consent is not obtained through dark patterns or manipulative design
- [ ] Verify mechanism for parents to revoke consent at any time
- [ ] Assess teacher/school exception compliance (if relying on school consent for educational purposes)

### Data Collection and Minimization
- [ ] Verify collection limited to what is reasonably necessary for child's participation
- [ ] Confirm no conditioning of activity participation on excessive data disclosure (§ 312.7)
- [ ] Audit all personal information types collected (name, email, phone, address, SSN, photo, geolocation, persistent identifiers, audio/video)
- [ ] Identify persistent identifiers used for behavioral advertising (prohibited without VPC)
- [ ] Assess whether plug-ins, SDKs, or third-party trackers collect personal information from children
- [ ] Verify data minimization principles applied to all collection points

### Data Retention and Deletion
- [ ] Verify retention policy limits storage to period reasonably necessary for purpose collected
- [ ] Confirm deletion procedures exist and are followed upon parent request
- [ ] Assess whether personal information is properly deleted when no longer needed
- [ ] Verify secure disposal methods for children's personal information
- [ ] Check that third parties also delete data upon operator's instruction
- [ ] Confirm parent's ability to request review and deletion of child's information honored

### Security and Confidentiality
- [ ] Verify reasonable security measures protect confidentiality and integrity of children's data
- [ ] Assess encryption standards for data at rest and in transit
- [ ] Evaluate access controls limiting who can access children's personal information
- [ ] Check for breach response procedures specific to children's data
- [ ] Confirm third-party recipients maintain adequate security measures
- [ ] Assess whether data is stored or processed outside the United States

### California-Specific Compliance
- [ ] Verify compliance with California eraser law (B&P § 22581 — minor's right to remove posted content)
- [ ] Assess CAADCA requirements: Data Protection Impact Assessment (DPIA) for services likely accessed by children
- [ ] Verify age estimation mechanisms meet CAADCA proportionality standards
- [ ] Confirm no profiling of children unless demonstrably necessary
- [ ] Check marketing restrictions for minors under B&P § 22580
- [ ] Evaluate CCPA opt-in requirement for sale of data of consumers under 16 (§ 1798.120(c)-(d))

### Safe Harbor and Enforcement
- [ ] Determine whether operator participates in FTC-approved safe harbor program
- [ ] Verify safe harbor certification is current and in good standing
- [ ] Assess whether safe harbor guidelines are actually followed (not just enrolled)
- [ ] Review any prior FTC enforcement actions or consent decrees against operator
- [ ] Evaluate civil penalty exposure ($50,120 per violation as of 2024 adjustment)
- [ ] Assess state AG enforcement risk in addition to FTC

## Output Protocol

```markdown
| Field | Value |
|---|---|
| Document ID | [assigned identifier] |
| Document Type | [privacy policy / consent mechanism / age gate / data collection form / marketing material / other] |
| Site/App Classification | [child-directed / mixed-audience / general audience with actual knowledge] |
| Operator(s) Identified | [list all operators] |
| Personal Information Collected | [list PI types collected from children] |
| Privacy Policy Compliant | [Compliant / Deficient — list deficiencies] |
| VPC Method | [method used or "None"] |
| VPC Validity | [Valid / Deficient / Missing] |
| Data Minimization | [Compliant / Excessive Collection Identified] |
| Retention Policy | [Compliant / Deficient / Missing] |
| Security Measures | [Adequate / Deficient / Not Assessed] |
| Safe Harbor Status | [Enrolled — program name / Not Enrolled] |
| CAADCA Compliance | [Compliant / Deficient / Not Assessed / N/A] |
| Per-Violation Penalty | [$50,120 (2024 adjusted)] |
| Risk Level | [Critical / High / Medium / Low] |
| Auditor Notes | [narrative summary of findings] |
```

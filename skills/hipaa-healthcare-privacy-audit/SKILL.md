---
name: hipaa-healthcare-privacy-audit
description: Passive audit layer that flags HIPAA Privacy Rule, Security Rule, and Breach Notification violations in healthcare records, authorization forms, Notice of Privacy Practices, breach notifications, and Business Associate Agreements.
---

# HIPAA Healthcare Privacy Audit

**Purpose**

Identifies violations of federal and California healthcare privacy laws by auditing patient records, authorization forms, Notices of Privacy Practices, breach notification letters, and Business Associate Agreements against the HIPAA Privacy Rule, Security Rule, Breach Notification Rule, HITECH Act, and the California Confidentiality of Medical Information Act.

## Governing Standards

### Federal Statutes
- **42 USC § 1320d et seq** — Health Insurance Portability and Accountability Act (HIPAA)
- **42 USC § 1320d-1** — Definitions (covered entity, protected health information, business associate)
- **42 USC § 1320d-2** — Administrative simplification: standards for transactions, code sets, identifiers
- **42 USC § 1320d-5** — General civil monetary penalties for HIPAA violations
- **42 USC § 1320d-6** — Criminal penalties: wrongful disclosure of individually identifiable health information
- **42 USC § 17921 et seq** — HITECH Act: Health Information Technology for Economic and Clinical Health Act
- **42 USC § 17930** — Application of security provisions and penalties to business associates
- **42 USC § 17932** — Notification in the case of breach of unsecured PHI
- **42 USC § 17934** — Application of privacy provisions and penalties to business associates
- **42 USC § 17935** — Restrictions on certain disclosures and sales of health information
- **42 USC § 17937** — Temporary breach notification requirement for vendors of personal health records

### California Statutes
- **Cal. Civil Code § 56 et seq** — Confidentiality of Medical Information Act (CMIA)
- **Cal. Civil Code § 56.10** — Prohibition on disclosure without authorization
- **Cal. Civil Code § 56.11** — Requirements for valid authorization
- **Cal. Civil Code § 56.104** — Additional authorization requirements for psychotherapy notes
- **Cal. Civil Code § 56.16** — Right to inspect and copy medical records
- **Cal. Civil Code § 56.35** — Nominal damages for CMIA violations
- **Cal. Civil Code § 56.36** — Civil remedies: compensatory damages, attorney fees, injunctive relief
- **Cal. Health & Safety Code § 1280.15** — Clinic/hospital breach reporting to CDPH within 15 days
- **Cal. Health & Safety Code § 123100-123149.5** — Patient Access to Health Records Act
- **Cal. Civil Code § 1798.29** — Data breach notification requirements (general)

### Regulatory
- **45 CFR Part 160** — General administrative requirements (definitions, preemption, enforcement)
- **45 CFR § 160.103** — Definitions: covered entity, business associate, PHI, disclosure, use
- **45 CFR § 160.306** — Complaints to the Secretary (HHS/OCR complaint process)
- **45 CFR § 160.400-160.426** — Civil monetary penalty tiers and procedures
- **45 CFR Part 164 Subpart A** — General provisions
- **45 CFR Part 164 Subpart C** — Security Rule (§§ 164.302-164.318)
- **45 CFR § 164.308** — Administrative safeguards (risk analysis, workforce training, contingency plan)
- **45 CFR § 164.310** — Physical safeguards (facility access controls, workstation use/security, device/media controls)
- **45 CFR § 164.312** — Technical safeguards (access control, audit controls, integrity, transmission security)
- **45 CFR Part 164 Subpart D** — Breach Notification Rule (§§ 164.400-164.414)
- **45 CFR § 164.402** — Definition of breach; risk assessment factors
- **45 CFR § 164.404** — Notification to individuals (without unreasonable delay, no later than 60 days)
- **45 CFR § 164.406** — Notification to media (breaches affecting 500+ residents of a state)
- **45 CFR § 164.408** — Notification to HHS Secretary
- **45 CFR Part 164 Subpart E** — Privacy Rule (§§ 164.500-164.534)
- **45 CFR § 164.502** — Uses and disclosures: general rules, minimum necessary standard
- **45 CFR § 164.504** — Uses and disclosures: organizational requirements (BAA provisions)
- **45 CFR § 164.508** — Uses and disclosures for which an authorization is required
- **45 CFR § 164.510** — Uses and disclosures requiring opportunity to agree or object (facility directories, persons involved in care)
- **45 CFR § 164.512** — Uses and disclosures for which consent/authorization not required (12 categories)
- **45 CFR § 164.514** — De-identification standards: Safe Harbor (18 identifiers) and Expert Determination
- **45 CFR § 164.520** — Notice of Privacy Practices requirements
- **45 CFR § 164.522** — Rights to request privacy protection (restrictions, confidential communications)
- **45 CFR § 164.524** — Access of individuals to protected health information (30-day response)
- **45 CFR § 164.526** — Amendment of PHI (60-day response)
- **45 CFR § 164.528** — Accounting of disclosures (6-year lookback)
- **45 CFR § 164.530** — Administrative requirements (privacy officer, training, sanctions, documentation)

## Audit Triggers

- Medical records (electronic or paper)
- Authorization for use or disclosure of PHI
- Notice of Privacy Practices (NPP)
- Breach notification letters (individual, media, HHS)
- Business Associate Agreements (BAA)
- Subpoena or court order seeking medical records
- Patient request for access, amendment, or accounting of disclosures
- De-identified data sets or limited data sets
- Psychotherapy notes
- Explanation of Benefits (EOB) or claims data
- Health plan enrollment or disenrollment forms
- Research consent or IRB authorization documents
- Complaint filed with HHS/OCR or state AG
- Workforce training records and sanctions policies
- Security risk assessment reports
- Incident reports involving potential PHI exposure

## Audit Checklist

### Privacy Rule Compliance (45 CFR Subpart E)

- [ ] Notice of Privacy Practices distributed at first service delivery
- [ ] NPP contains all required elements per 45 CFR § 164.520(b)
- [ ] NPP includes header: "THIS NOTICE DESCRIBES HOW MEDICAL INFORMATION ABOUT YOU MAY BE USED AND DISCLOSED AND HOW YOU CAN GET ACCESS TO THIS INFORMATION. PLEASE REVIEW IT CAREFULLY."
- [ ] Good-faith effort to obtain written acknowledgment of NPP receipt
- [ ] Uses and disclosures limited to minimum necessary standard (§ 164.502(b))
- [ ] Minimum necessary standard not applied to treatment disclosures, individual access, or disclosures authorized by patient
- [ ] Valid authorization contains all required elements per § 164.508(c)
- [ ] Authorization is not combined with other forms (compound authorization prohibition)
- [ ] Separate authorization obtained for psychotherapy notes
- [ ] No conditioning of treatment/payment on authorization (unless exceptions apply)
- [ ] Revocation of authorization honored promptly

### Patient Access Rights (45 CFR § 164.524)

- [ ] Patient access requests responded to within 30 days (one 30-day extension permitted)
- [ ] Access provided in the form and format requested if readily producible
- [ ] Reasonable, cost-based fees charged (no retrieval fees)
- [ ] Grounds for denial are limited to permitted categories
- [ ] Reviewable denial includes right to have denial reviewed by licensed professional
- [ ] Directed access to third parties honored (including electronic copy)

### Amendment and Accounting (45 CFR §§ 164.526, 164.528)

- [ ] Amendment requests responded to within 60 days (one 30-day extension permitted)
- [ ] Denial of amendment includes reason and right to submit statement of disagreement
- [ ] Accounting of disclosures covers 6-year period prior to request
- [ ] Accounting excludes treatment, payment, operations, and individual-authorized disclosures
- [ ] Accounting includes date, recipient, description, and purpose of each disclosure

### Breach Notification (45 CFR Subpart D)

- [ ] Breach risk assessment performed using 4-factor test (§ 164.402)
- [ ] Individual notification sent without unreasonable delay, no later than 60 days from discovery
- [ ] Notification includes: description of breach, types of PHI involved, steps to protect, what entity is doing, contact information
- [ ] Notification sent by first-class mail or email (if individual agreed to electronic notice)
- [ ] Substitute notice provided when contact information insufficient
- [ ] HHS notification filed (≥500: within 60 days; <500: annual log)
- [ ] Media notification issued for breaches affecting 500+ residents of a state/jurisdiction
- [ ] Breach log maintained for breaches affecting fewer than 500 individuals
- [ ] Cal. Health & Safety Code § 1280.15 report filed with CDPH within 15 days (if applicable)

### Business Associate Agreements (45 CFR § 164.504)

- [ ] BAA executed before PHI shared with business associate
- [ ] BAA specifies permitted and required uses/disclosures
- [ ] BAA requires safeguards to prevent unauthorized use/disclosure
- [ ] BAA requires reporting of security incidents and breaches
- [ ] BAA requires business associate to ensure subcontractor compliance
- [ ] BAA requires return or destruction of PHI upon termination
- [ ] BAA includes termination provisions for material breach
- [ ] BAA updated for HITECH Act requirements (direct liability of BA)

### Security Rule Compliance (45 CFR Subpart C)

- [ ] Security risk analysis conducted and documented (§ 164.308(a)(1))
- [ ] Risk management plan implemented to reduce risks to reasonable level
- [ ] Workforce security: access authorization, clearance, termination procedures
- [ ] Security awareness and training program in place
- [ ] Contingency plan: data backup, disaster recovery, emergency mode operations
- [ ] Facility access controls documented
- [ ] Workstation use and security policies implemented
- [ ] Device and media controls: disposal, re-use, accountability, data backup
- [ ] Access control: unique user identification, emergency access, auto logoff, encryption
- [ ] Audit controls: hardware, software, procedural mechanisms to record and examine access
- [ ] Integrity controls: mechanism to authenticate electronic PHI
- [ ] Transmission security: integrity controls and encryption for PHI in transit

### De-Identification Standards (45 CFR § 164.514)

- [ ] Safe Harbor method: all 18 identifier categories removed
- [ ] No actual knowledge that remaining information can identify an individual
- [ ] Expert Determination method: qualified statistical expert applied and documented methods
- [ ] Limited Data Set includes only permitted identifiers and Data Use Agreement executed
- [ ] Re-identification code not derived from or related to individual information

### California CMIA Compliance (Cal. Civil Code § 56)

- [ ] Authorization meets CMIA requirements (§ 56.11) in addition to HIPAA
- [ ] No disclosure of medical information without authorization except as permitted (§ 56.10)
- [ ] Employer handling of medical information complies with § 56.20 et seq
- [ ] Marketing use of medical information complies with § 56.10(d)

## Output Protocol

Each finding must be recorded in the following format:

| Field | Value |
|---|---|
| **Finding ID** | HIPAA-YYYY-NNN |
| **Document Reviewed** | [filename / document title] |
| **Date of Document** | [date on document face] |
| **Audit Date** | [date audit performed] |
| **Rule Violated** | [specific CFR section or statute] |
| **Violation Category** | Privacy Rule / Security Rule / Breach Notification / BAA / CMIA |
| **Severity** | Critical / High / Medium / Low |
| **Finding Description** | [plain-language description of the violation] |
| **Evidence** | [quoted text, page reference, or absence noted] |
| **Required Element** | [what the law requires] |
| **Actual Condition** | [what the document shows or fails to show] |
| **Remediation** | [specific corrective action required] |
| **Deadline** | [regulatory deadline if applicable] |
| **Penalty Exposure** | [applicable penalty tier and range] |
| **Cross-References** | [related findings or prior audit items] |

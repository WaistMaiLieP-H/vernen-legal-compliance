---
name: ccpa-cpra-consumer-privacy-audit
description: Passive audit layer that flags CCPA/CPRA violations, consumer privacy rights failures, data sale/sharing noncompliance, and privacy notice deficiencies in privacy policies, data subject requests, opt-out mechanisms, and vendor agreements.
---

# CCPA/CPRA Consumer Privacy Audit

**Purpose:** Detect noncompliance with the California Consumer Privacy Act and California Privacy Rights Act across privacy policies, data subject access requests, opt-out mechanisms, vendor agreements, and consumer-facing disclosures. This skill passively audits documents for violations of consumer privacy rights, data handling obligations, and notice requirements.

## Governing Standards

### Federal
- 15 USC § 45 (FTC Act — Unfair or Deceptive Practices)
- 15 USC § 6501 et seq (COPPA — Children's Online Privacy Protection)
- 16 CFR Part 312 (COPPA Rule)
- 15 USC § 1681 et seq (FCRA — Fair Credit Reporting Act, where consumer data overlaps)

### California
- Cal. Civil Code § 1798.100 et seq (California Consumer Privacy Act / CPRA)
- Cal. Civil Code § 1798.100 (Right to Know / Right to Access)
- Cal. Civil Code § 1798.105 (Right to Delete)
- Cal. Civil Code § 1798.106 (Right to Correct)
- Cal. Civil Code § 1798.110 (Categories of Personal Information Collected)
- Cal. Civil Code § 1798.115 (Categories of PI Sold or Shared)
- Cal. Civil Code § 1798.120 (Right to Opt-Out of Sale/Sharing)
- Cal. Civil Code § 1798.121 (Right to Limit Use of Sensitive Personal Information)
- Cal. Civil Code § 1798.125 (Non-Discrimination)
- Cal. Civil Code § 1798.130 (Notice and Disclosure Obligations)
- Cal. Civil Code § 1798.135 (Opt-Out Link Requirements)
- Cal. Civil Code § 1798.140 (Definitions — Business, Service Provider, Contractor, Third Party)
- Cal. Civil Code § 1798.145 (Exemptions — Employee Data, B2B Data)
- Cal. Civil Code § 1798.150 (Private Right of Action for Data Breaches)
- Cal. Civil Code § 1798.155 (CPPA Administrative Enforcement)
- Cal. Civil Code § 1798.185 (CPPA Rulemaking Authority)
- Cal. Civil Code § 1798.199.10-199.100 (California Privacy Protection Agency)

### Regulatory
- 11 CCR § 7000 et seq (CPPA Final Regulations)
- 11 CCR § 7001 (Definitions)
- 11 CCR § 7002-7004 (Notice at Collection Requirements)
- 11 CCR § 7010-7011 (Privacy Policy Requirements)
- 11 CCR § 7020-7028 (Consumer Request Handling)
- 11 CCR § 7030-7031 (Opt-Out Preference Signals)
- 11 CCR § 7050-7053 (Service Provider and Contractor Obligations)
- 11 CCR § 7060-7062 (Sensitive Personal Information)
- 11 CCR § 7070-7071 (Dark Patterns Prohibition)
- 11 CCR § 7080-7082 (Data Broker Registration — Civil Code § 1798.99.80)
- 11 CCR § 7100-7102 (Audits and Risk Assessments)

## Audit Triggers

- Privacy policies and notices at collection
- Data subject access request (DSAR) logs and responses
- Opt-out mechanisms and preference signal configurations
- Service provider and contractor agreements
- Data processing agreements (DPAs)
- Data inventory and mapping records
- Vendor assessment questionnaires
- Cookie consent banners and configuration
- Consumer complaints related to privacy rights
- Data breach notification records
- Children's data collection disclosures (under 16)
- Data broker registration filings
- Employee and B2B data handling procedures
- Dark pattern assessments for consumer-facing interfaces
- Cross-context behavioral advertising records
- Sensitive personal information processing records

## Audit Checklist

### Notice and Disclosure Requirements
- [ ] Privacy policy updated within last 12 months (Civil Code § 1798.130(a)(5))
- [ ] Notice at collection provided before or at point of collection (§ 1798.100(b))
- [ ] Categories of PI collected are disclosed with purposes for each (§ 1798.110)
- [ ] Categories of PI sold or shared are disclosed (§ 1798.115)
- [ ] Categories of third parties to whom PI is disclosed are identified (§ 1798.130)
- [ ] Retention periods or criteria disclosed for each category of PI (§ 1798.100(a)(3))
- [ ] "Do Not Sell or Share My Personal Information" link is conspicuous (§ 1798.135)
- [ ] "Limit the Use of My Sensitive Personal Information" link provided where applicable (§ 1798.135)
- [ ] Contact information for exercising consumer rights is provided (§ 1798.130(a)(1))
- [ ] Notice of financial incentive programs disclosed with material terms (§ 1798.125(b))

### Consumer Rights Fulfillment
- [ ] Right to Know requests fulfilled within 45 calendar days (§ 1798.130(a)(2))
- [ ] 45-day extension properly noticed when used (§ 1798.130(a)(2))
- [ ] Right to Delete requests processed and forwarded to service providers (§ 1798.105)
- [ ] Right to Correct requests verified and processed (§ 1798.106)
- [ ] Right to Opt-Out effectuated within 15 business days (§ 1798.135)
- [ ] Right to Limit Sensitive PI use is operational (§ 1798.121)
- [ ] Identity verification procedures are reasonable and proportionate (11 CCR § 7060)
- [ ] Authorized agent requests accepted with proper verification (§ 1798.140(e))
- [ ] No requirement for account creation to exercise rights (11 CCR § 7022)

### Children's Privacy
- [ ] Affirmative opt-in obtained for consumers aged 13-16 before sale/sharing (§ 1798.120(c))
- [ ] Parental/guardian consent obtained for consumers under 13 (§ 1798.120(c))
- [ ] Age verification mechanisms implemented where children's data is collected
- [ ] 12-month waiting period honored after child opts out (§ 1798.120(d))

### Service Provider and Contractor Compliance
- [ ] Written contracts with service providers include required CCPA provisions (§ 1798.100(d))
- [ ] Contracts prohibit selling/sharing PI received from business (§ 1798.140(ag))
- [ ] Contracts limit use of PI to specified business purposes (§ 1798.140(ag))
- [ ] Contractor certification of compliance obtained (§ 1798.140(j))
- [ ] Flow-down provisions to sub-processors documented (11 CCR § 7050)
- [ ] Vendor data processing inventories maintained and current

### Data Breach and Security
- [ ] Reasonable security procedures implemented (§ 1798.150(a))
- [ ] Incident response plan addresses CCPA private right of action exposure
- [ ] Data breach notification procedures comply with Civil Code § 1798.82
- [ ] Non-encrypted/non-redacted PI exposure assessed for § 1798.150 liability

### Dark Patterns
- [ ] Consumer consent interfaces free of dark patterns (11 CCR § 7070)
- [ ] Opt-out process not more burdensome than opt-in (§ 1798.135)
- [ ] Consent obtained through dark patterns is void and unenforceable (§ 1798.140(l))
- [ ] Symmetry in choice tested — declining is as easy as accepting

### Data Broker Requirements
- [ ] Data broker registration with CPPA completed if applicable (Civil Code § 1798.99.82)
- [ ] Annual registration fee paid
- [ ] Delete-all mechanism operational for registered data brokers (Civil Code § 1798.99.86)

## Output Protocol

| Field | Description |
|---|---|
| **Document ID** | Unique identifier for the audited document |
| **Document Type** | Privacy policy / DSAR log / Vendor agreement / Consent record / Other |
| **Date Reviewed** | Date the audit was performed |
| **Applicable Statute** | Specific CCPA/CPRA section implicated |
| **Applicable Regulation** | Specific 11 CCR section implicated |
| **Finding** | Description of the noncompliance or deficiency |
| **Severity** | CRITICAL / HIGH / MEDIUM / LOW |
| **Risk Category** | Private right of action / CPPA enforcement / Reputational / Operational |
| **Evidence** | Specific text, absence, or condition constituting the finding |
| **Remediation** | Recommended corrective action |
| **Deadline** | Statutory or regulatory deadline, if applicable |
| **Status** | OPEN / IN PROGRESS / REMEDIATED / ACCEPTED RISK |

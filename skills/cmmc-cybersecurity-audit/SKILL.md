---
name: cmmc-cybersecurity-audit
description: Passive audit layer that flags CMMC compliance gaps, NIST 800-171 control failures, CUI handling violations, and cybersecurity maturity deficiencies in System Security Plans, POA&Ms, assessment reports, and incident response plans.
---

# CMMC Cybersecurity Audit

**Purpose:** Detect CMMC compliance gaps, NIST SP 800-171 control implementation failures, CUI handling violations, and cybersecurity maturity deficiencies across System Security Plans, Plans of Action and Milestones, self-assessment reports, incident response plans, and related security documentation. This skill passively audits documents for missing controls, inadequate implementation evidence, scoring errors, and contractual flowdown failures.

## Governing Standards

### Federal
- 32 CFR Part 170 (Cybersecurity Maturity Model Certification 2.0 — Final Rule)
- 32 CFR Part 170.3 (CMMC Definitions — CUI, FCI, CMMC Assessment, Security Requirement)
- 32 CFR Part 170.14 (CMMC Level 1 — 17 Practices from FAR 52.204-21)
- 32 CFR Part 170.15 (CMMC Level 2 — 110 NIST SP 800-171 Rev 2 Security Requirements)
- 32 CFR Part 170.16 (CMMC Level 3 — NIST SP 800-172 Enhanced Requirements)
- 32 CFR Part 170.17 (Assessment and Certification Procedures)
- 32 CFR Part 170.19 (POA&M Requirements and Limitations)
- 32 CFR Part 170.21 (Assessment Scoring Methodology)
- 32 CFR Part 2002 (Controlled Unclassified Information — CUI Registry)
- NIST SP 800-171 Rev 2 (Protecting CUI in Nonfederal Systems — 110 Security Requirements)
- NIST SP 800-171A (Assessing Security Requirements for CUI)
- NIST SP 800-172 (Enhanced Security Requirements for CUI — Level 3)
- NIST SP 800-53 Rev 5 (Security and Privacy Controls — Reference Framework)
- DFARS 252.204-7012 (Safeguarding Covered Defense Information and Cyber Incident Reporting)
- DFARS 252.204-7019 (Notice of NIST SP 800-171 DoD Assessment Requirements)
- DFARS 252.204-7020 (NIST SP 800-171 DoD Assessment Requirements)
- DFARS 252.204-7021 (Cybersecurity Maturity Model Certification Requirements)
- FAR 52.204-21 (Basic Safeguarding of Covered Contractor Information Systems — 15 Requirements)
- 44 USC § 3552-3558 (FISMA — Federal Information Security Modernization Act)
- 10 USC § 4901 (Defense Industrial Base Cybersecurity)
- FedRAMP Authorization Act (Pub. L. 117-263, Title LVIII)

### California
- Cal. Civil Code § 1798.81.5 (Reasonable Security Procedures)
- Cal. Civil Code § 1798.82 (Data Breach Notification)
- Cal. Civil Code § 1798.150 (CCPA Private Right of Action — Non-Encrypted/Non-Redacted PI)
- Cal. Government Code § 11549.3 (Office of Information Security — State Standards)

### Regulatory
- DoD CMMC Assessment Guide — Level 1 (Self-Assessment)
- DoD CMMC Assessment Guide — Level 2 (Self and C3PAO Assessment)
- DoD CMMC Assessment Guide — Level 3 (DIBCAC Assessment)
- NIST SP 800-171 DoD Assessment Methodology
- SPRS (Supplier Performance Risk System) Scoring Requirements
- CUI Registry (National Archives — isoo.archives.gov)
- CUI Marking Handbook (32 CFR Part 2002)
- FedRAMP Security Assessment Framework (for cloud service providers)
- CISA Binding Operational Directives (for reference controls)

## Audit Triggers

- System Security Plans (SSPs) for CUI-processing systems
- Plans of Action and Milestones (POA&Ms)
- NIST SP 800-171 self-assessment scorecards
- SPRS score submissions
- C3PAO assessment reports
- DIBCAC assessment reports
- Incident response plans and cyber incident reports
- CUI handling procedures and marking guides
- Network architecture diagrams and system boundary documentation
- Access control policies and procedures
- Encryption implementation documentation
- Audit log configurations and retention policies
- Configuration management plans
- Media protection and sanitization procedures
- Subcontractor flowdown documentation (DFARS 252.204-7012)
- Cloud service provider (CSP) authorization documentation (FedRAMP)

## Audit Checklist

### CMMC Level 1 — Basic Safeguarding (17 Practices from FAR 52.204-21)
- [ ] AC.L1-3.1.1 — Authorized access control: limit system access to authorized users (FAR 52.204-21(b)(1)(i))
- [ ] AC.L1-3.1.2 — Transaction and function control: limit system access to authorized transactions and functions
- [ ] AC.L1-3.1.20 — External connections: verify and control connections to external systems
- [ ] AC.L1-3.1.22 — Public information: control information posted on publicly accessible systems
- [ ] IA.L1-3.5.1 — Identification: identify system users, processes acting on behalf of users
- [ ] IA.L1-3.5.2 — Authentication: authenticate users, processes, and devices before access
- [ ] MP.L1-3.8.3 — Media disposal: sanitize or destroy media before disposal or reuse
- [ ] PE.L1-3.10.1 — Physical access: limit physical access to authorized individuals
- [ ] PE.L1-3.10.3 — Escort visitors: escort visitors and monitor visitor activity
- [ ] PE.L1-3.10.4 — Physical access logs: maintain audit logs of physical access
- [ ] PE.L1-3.10.5 — Physical access devices: control and manage physical access devices
- [ ] SC.L1-3.13.1 — Boundary protection: monitor, control, and protect communications at system boundaries
- [ ] SC.L1-3.13.5 — Public access: implement subnetworks for publicly accessible system components
- [ ] SI.L1-3.14.1 — Flaw remediation: identify, report, and correct information system flaws timely
- [ ] SI.L1-3.14.2 — Malicious code: provide protection from malicious code at appropriate locations
- [ ] SI.L1-3.14.4 — Update malicious code: update malicious code protection mechanisms
- [ ] SI.L1-3.14.5 — System and file scanning: perform periodic scans and real-time scans of files from external sources

### CMMC Level 2 — NIST SP 800-171 Security Requirement Families (110 Controls)

#### Access Control (AC) — 22 Requirements
- [ ] AC.L2-3.1.1 through AC.L2-3.1.22 — All access control requirements implemented with evidence
- [ ] Account management procedures documented with review frequency
- [ ] Least privilege enforced for all CUI-processing accounts
- [ ] Remote access monitored, controlled, and encrypted
- [ ] Wireless access restricted and protected
- [ ] Mobile device access controlled with organizational policies

#### Awareness and Training (AT) — 3 Requirements
- [ ] AT.L2-3.2.1 — Security awareness training provided to all users
- [ ] AT.L2-3.2.2 — Role-based training for users with security responsibilities
- [ ] AT.L2-3.2.3 — Insider threat awareness included in training

#### Audit and Accountability (AU) — 9 Requirements
- [ ] AU.L2-3.3.1 — System audit logs created and retained
- [ ] AU.L2-3.3.2 — Individual user actions uniquely traceable
- [ ] Audit log retention period meets minimum requirements (at least 3 years recommended)
- [ ] Audit log protection from unauthorized access, modification, and deletion
- [ ] Audit log review, analysis, and reporting procedures operational
- [ ] Time synchronization to authoritative source (NTP/NIST)

#### Configuration Management (CM) — 9 Requirements
- [ ] CM.L2-3.4.1 — Baseline configurations established and maintained
- [ ] CM.L2-3.4.2 — Security configuration settings enforced
- [ ] Change control processes documented and followed
- [ ] Software installation restrictions enforced — allowlisting
- [ ] Nonessential programs, functions, ports, protocols, services restricted

#### Identification and Authentication (IA) — 11 Requirements
- [ ] IA.L2-3.5.3 — Multi-factor authentication (MFA) for local and network access
- [ ] MFA implemented for all privileged accounts
- [ ] MFA implemented for remote access
- [ ] Password complexity and lifecycle requirements enforced
- [ ] Replay-resistant authentication mechanisms used
- [ ] Identifier management — unique user IDs, no shared accounts

#### Incident Response (IR) — 3 Requirements
- [ ] IR.L2-3.6.1 — Incident response capability established
- [ ] IR.L2-3.6.2 — Incidents tracked, documented, and reported
- [ ] IR.L2-3.6.3 — Incident response tested at least annually
- [ ] Cyber incident reported to DoD within 72 hours of discovery (DFARS 252.204-7012)
- [ ] Incident report includes required DFARS content — affected CDI, system compromised, forensic images preserved

#### Maintenance (MA) — 6 Requirements
- [ ] Maintenance procedures documented for CUI systems
- [ ] Maintenance tools controlled and monitored
- [ ] Remote maintenance sessions logged and terminated after completion
- [ ] Media containing diagnostic programs sanitized before removal

#### Media Protection (MP) — 9 Requirements
- [ ] CUI media protected during storage and transport
- [ ] CUI media access limited to authorized personnel
- [ ] CUI media sanitized or destroyed before disposal (NIST SP 800-88)
- [ ] CUI marking on media consistent with 32 CFR Part 2002

#### Personnel Security (PS) — 2 Requirements
- [ ] Personnel screening prior to CUI access
- [ ] CUI access revoked upon personnel termination or transfer

#### Physical Protection (PE) — 6 Requirements
- [ ] Physical access to CUI systems limited and monitored
- [ ] Visitor access controlled with escort and logging
- [ ] Physical access audit logs maintained and reviewed

#### Risk Assessment (RA) — 3 Requirements
- [ ] RA.L2-3.11.1 — Risk assessments performed periodically
- [ ] Vulnerability scanning conducted and remediated
- [ ] Risk assessment results used to inform security decisions

#### Security Assessment (CA) — 4 Requirements
- [ ] CA.L2-3.12.1 — Security controls assessed periodically
- [ ] CA.L2-3.12.4 — System security plan developed and maintained
- [ ] POA&M developed for identified deficiencies
- [ ] POA&M items have defined completion timelines and responsible parties

#### System and Communications Protection (SC) — 16 Requirements
- [ ] FIPS-validated encryption for CUI in transit (TLS 1.2+ minimum)
- [ ] FIPS-validated encryption for CUI at rest (AES-256 or equivalent)
- [ ] Network segmentation separates CUI boundary from general IT
- [ ] DNS filtering and boundary protection operational
- [ ] Session authenticity protections implemented

#### System and Information Integrity (SI) — 7 Requirements
- [ ] SI.L2-3.14.1 — Flaw remediation process operational
- [ ] Security alerts and advisories monitored and acted upon
- [ ] Inbound and outbound communications traffic monitored
- [ ] Unauthorized use of systems detected through monitoring

### CMMC Level 3 — Enhanced Security (NIST SP 800-172)
- [ ] Enhanced security requirements identified per contract (32 CFR Part 170.16)
- [ ] Penetration testing conducted at required frequency
- [ ] Threat hunting capabilities operational
- [ ] Security operations center (SOC) monitoring active or contracted
- [ ] Supply chain risk management procedures implemented

### SPRS Scoring and Assessment
- [ ] SPRS score calculated accurately per DoD Assessment Methodology
- [ ] Score reflects current implementation — not planned or partial
- [ ] POA&M items reduce score appropriately (1, 3, or 5 point deductions per control)
- [ ] SPRS score submitted to DoD and current (not more than 3 years old)
- [ ] Self-assessment versus C3PAO assessment requirement correctly determined per contract

### POA&M Management
- [ ] POA&M closed within 180 days of CMMC assessment (32 CFR Part 170.19)
- [ ] No more than 20% of Level 2 controls (22 of 110) on POA&M at assessment
- [ ] POA&M does not include any of the highest-weighted controls (specific controls cannot be POA&M'd)
- [ ] Each POA&M item has defined milestones, resources, and completion dates
- [ ] POA&M reviewed and updated at least quarterly

### CUI Handling and Marking
- [ ] CUI identified and categorized per CUI Registry (32 CFR Part 2002)
- [ ] CUI marked with required banner — "CUI" or "CONTROLLED" (32 CFR § 2002.20)
- [ ] CUI handling procedures documented and trained
- [ ] CUI not stored on unauthorized personal devices
- [ ] CUI not transmitted via unauthorized channels (unencrypted email, personal cloud)

### Subcontractor Flowdown
- [ ] DFARS 252.204-7012 flowed down to subcontractors processing, storing, or transmitting CDI
- [ ] DFARS 252.204-7021 CMMC level requirement flowed to subcontractors
- [ ] Subcontractor SPRS scores verified before awarding subcontracts
- [ ] Subcontractor SSPs reviewed for CUI boundary adequacy
- [ ] Subcontractor incident reporting requirements documented in subcontract

### Cloud Service Provider Requirements
- [ ] CSP meets FedRAMP Moderate baseline (or equivalent) for CUI processing (DFARS 252.204-7012)
- [ ] CSP authorization documentation current and valid
- [ ] CSP incident reporting provisions meet 72-hour DFARS requirement
- [ ] CSP data residency within United States confirmed
- [ ] CSP shared responsibility model documented and gaps addressed in SSP

## Output Protocol

| Field | Description |
|---|---|
| **Document ID** | Unique identifier for the audited document |
| **Document Type** | SSP / POA&M / Assessment report / Incident report / CUI procedure / Subcontract / Other |
| **Date Reviewed** | Date the audit was performed |
| **CMMC Level** | Level 1 / Level 2 / Level 3 |
| **NIST Control ID** | Specific NIST SP 800-171 or 800-172 control identifier |
| **Applicable Regulation** | Specific 32 CFR, DFARS, or FAR section implicated |
| **Finding** | Description of the compliance gap, control failure, or deficiency |
| **Severity** | CRITICAL / HIGH / MEDIUM / LOW |
| **SPRS Score Impact** | Point deduction (1, 3, or 5) and revised score, if applicable |
| **POA&M Eligible** | YES / NO — If no, must be remediated before assessment |
| **Evidence** | Specific text, configuration, absence, or condition constituting the finding |
| **Remediation** | Recommended corrective action — control implementation, documentation, or configuration change |
| **Deadline** | 180-day POA&M closure, 72-hour incident report, or other timeline |
| **Status** | OPEN / IN PROGRESS / REMEDIATED / POA&M TRACKED / ASSESSMENT BLOCKED |

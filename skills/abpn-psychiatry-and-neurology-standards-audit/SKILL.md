---
name: abpn-psychiatry-and-neurology-standards-audit
description: Passive audit layer that flags psychiatrist or neurologist conduct issues against ABPN, APA, and California Medical Board standards.
---

# ABPN Psychiatry and Neurology Standards Audit Framework

## Purpose
Passive audit layer. When user describes conduct of psychiatrists or neurologists, automatically assess against professional board standards, ethics codes, and licensing requirements.

## Governing Standards

### American Board of Psychiatry and Neurology (ABPN)
- Certification Standards
- Maintenance of Certification Requirements
- Ethics Policies
- Reference: abpn.com

### American Psychiatric Association (APA)
- Principles of Medical Ethics with Annotations Especially Applicable to Psychiatry
- Reference: psychiatry.org/psychiatrists/practice/ethics

### American Medical Association (AMA)
- Code of Medical Ethics
- Reference: ama-assn.org/delivering-care/ethics

### California Medical Board
- Business & Professions Code — Medical Practice Act
- California Code of Regulations, Title 16
- Reference: mbc.ca.gov

### Forensic Psychiatry (if applicable)
- AAPL Ethics Guidelines for the Practice of Forensic Psychiatry
- Reference: aapl.org

## Audit Triggers

Activate when user describes:
- Psychiatric/neurological evaluation
- Diagnosis rendered
- Testimony or declarations
- Treatment recommendations
- Medication decisions
- Competency/capacity evaluations
- Court-ordered mental health assessments
- Communications with court or attorneys
- Any conduct by psychiatrist/neurologist

## Framework

When triggered, assess:
1. What professional standard governed the conduct?
2. Was proper methodology followed?
3. Were ethical boundaries maintained?
4. Was documentation adequate and accurate?
5. Were conclusions supported by examination?

## Output Protocol

When professional conduct issue detected, inject:
```
[MEDICAL BOARD/ABPN FLAG]
Provider: [Name, License # if known]
Standard Implicated: [ABPN, APA, AMA, or CA Medical Board]
Required Conduct: [Standard]
Deviation: [What occurred]
Classification: [Violation type]
Remedies: [Medical Board complaint, expert challenge, etc.]
```

## Complaint Reference
Medical Board of California
- mbc.ca.gov/Consumers/Complaints
- 800-633-2322

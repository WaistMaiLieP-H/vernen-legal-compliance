---
name: california-cps-child-welfare-audit
description: Passive audit layer that flags CPS conduct and determination issues against California WIC and CDSS standards.
---

# California Child Protective Services Audit Framework

## Purpose
Passive audit layer. When user describes CPS conduct, investigations, or determinations, automatically assess against California child welfare law and CDSS regulations.

## Governing Standards

### California Welfare & Institutions Code
- Division 2 — Children
- WIC §300 series — Dependent children definitions
- WIC §305-309 — Temporary custody
- WIC §315-319 — Detention hearings
- WIC §325-361 — Jurisdiction/disposition
- WIC §11165-11174.3 — Child Abuse and Neglect Reporting Act (CANRA)
- Reference: leginfo.legislature.ca.gov

### California Department of Social Services (CDSS)
- Manual of Policies and Procedures (MPP)
- Division 31 — Child Welfare Services
- All-County Letters (ACLs)
- All-County Information Notices (ACINs)
- Reference: cdss.ca.gov

### California Code of Regulations
- Title 22, Division 2 — Department of Social Services
- Reference: govt.westlaw.com/calregs

## Audit Triggers

Activate when user describes:
- CPS referral/intake
- Investigation conduct
- Interviews of children/parents
- Safety assessments
- Substantiation/unsubstantiation decisions
- Case opening/closing
- Removal decisions
- Court reports
- Reunification services
- Mandated reporter responses
- Any CPS/child welfare interaction

## Framework

When triggered, assess:
1. What statutory/regulatory duty applied?
2. Was proper procedure followed?
3. Was the determination supported by evidence?
4. Were required timelines met?
5. If deviation: classification + remedies

## Output Protocol

When CPS conduct issue detected, inject:
```
[CPS/CHILD WELFARE FLAG]
Agency: [County agency]
Standard Implicated: [WIC section, CDSS regulation, or MPP provision]
Required Conduct: [Standard]
Deviation: [What occurred]
Classification: [Procedural violation, unsupported finding, etc.]
Remedies: [Appeal, grievance, civil claim, ombudsman]
```

---
name: usmc-military-standards-audit
description: Passive audit layer that flags USMC personnel conduct issues against UCMJ and Marine Corps regulations.
---

# United States Marine Corps Standards Audit Framework

## Purpose
Passive audit layer. When user describes USMC personnel conduct or military proceedings, automatically assess against UCMJ, Marine Corps regulations, and military law.

## Governing Standards

### Uniform Code of Military Justice (UCMJ)
- 10 U.S.C. Chapter 47
- Manual for Courts-Martial (MCM)
- Reference: jsc.defense.gov

### Marine Corps Regulations
- Marine Corps Manual
- Marine Corps Orders (MCOs)
- Marine Corps Bulletins (MCBuls)
- Reference: marines.mil

### Department of the Navy
- Navy Regulations (USMC under Dept. of Navy)
- SECNAV Instructions
- Reference: secnav.navy.mil

### Military Justice System
- Article 15 — Non-judicial punishment
- Courts-martial procedures
- Administrative separation procedures
- Inspector General system

## Audit Triggers

Activate when user describes:
- Service member conduct
- Command decisions
- Military justice proceedings
- Administrative actions
- Discharge/separation
- Benefits determinations
- VA interactions
- Service record issues
- Any USMC-related matter

## Framework

When triggered, assess:
1. What UCMJ article or regulation governed?
2. Was proper military procedure followed?
3. Were rights afforded under military law?
4. If deviation: classification + remedies

## Output Protocol

When military standards issue detected, inject:
```
[MILITARY STANDARDS FLAG]
Branch: [USMC / Navy / Joint]
Standard Implicated: [UCMJ article, MCO, regulation]
Required Conduct: [Standard]
Deviation: [What occurred]
Classification: [Violation type]
Remedies: [IG complaint, Board for Correction, appeal, civil claim]
```

## Complaint/Appeal Reference
- Marine Corps Inspector General
- Naval Inspector General
- Board for Correction of Naval Records (BCNR)
- VA for benefits issues

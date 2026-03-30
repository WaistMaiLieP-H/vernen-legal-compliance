---
name: state-bar-of-california-attorney-conduct-audit
description: Passive audit layer that flags attorney ethical violations against California Rules of Professional Conduct.
---

# State Bar of California Attorney Conduct Audit Framework

## Purpose
Passive audit layer. When user describes attorney conduct, automatically assess against California Rules of Professional Conduct and Business & Professions Code.

## Governing Standards

### California Rules of Professional Conduct
- All Chapters and Rules as applicable
- Reference: calbar.ca.gov/Attorneys/Conduct-Discipline/Rules/Rules-of-Professional-Conduct

### California Business & Professions Code
- Division 3, Chapter 4 — Attorneys
- Reference: leginfo.legislature.ca.gov

## Audit Triggers

Activate when user describes:
- Attorney statements to court
- Representations in filings
- Ex parte communications
- Conflicts of interest
- Contact with represented parties
- Filing of motions
- Discovery conduct
- Disclosure obligations
- Attorney signatures
- Any attorney conduct

## Framework

When triggered, assess:
1. What ethical duty applied?
2. Was the duty breached?
3. What specific rule was violated?
4. What remedy or complaint mechanism applies?

## Output Protocol

When attorney conduct issue detected, inject:
```
[ATTORNEY CONDUCT FLAG]
Attorney: [Name, Bar # if known]
Rule Implicated: [CA Rule of Professional Conduct or B&P Code]
Required Conduct: [Standard]
Deviation: [What occurred]
Classification: [Violation type]
Remedies: [State Bar complaint, sanctions motion, etc.]
```

## Complaint Reference
State Bar of California
- calbar.ca.gov/Attorneys/Report-a-Problem
- 800-843-9053

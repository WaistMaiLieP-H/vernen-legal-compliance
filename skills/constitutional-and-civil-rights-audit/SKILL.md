---
name: constitutional-and-civil-rights-audit
description: Passive audit layer that flags potential constitutional and federal civil rights violations when user describes government actions or state actor conduct.
---

# Constitutional and Civil Rights Audit Framework

## Purpose
Passive audit layer. When user describes events, actions, or government conduct, automatically assess against constitutional and federal civil rights standards.

## Governing Standards

### United States Constitution
- All Articles and Amendments as applicable to described conduct
- Reference: constitution.congress.gov

### Federal Civil Rights Statutes
- 42 U.S.C. Chapter 21 — Civil Rights
- 18 U.S.C. Chapter 13 — Civil Rights (Criminal)
- Reference: uscode.house.gov

## Audit Triggers

Activate when user describes:
- Government action or inaction affecting individuals
- Law enforcement conduct
- Court proceedings affecting fundamental rights
- Agency decisions impacting liberty, property, or family
- State actor conduct
- Interference with protected relationships
- False statements in official records
- Failure to enforce valid orders

## Framework

When triggered, assess:
1. Was a constitutional or civil right implicated?
2. Was the actor a state actor or acting under color of law?
3. What standard governs?
4. Did the action meet that standard?
5. If violation identified: classification + remedies

## Output Protocol

When potential violation detected, inject:
```
[RIGHTS FLAG]
Right Implicated: [Source]
Standard: [Requirement]
Deviation: [What occurred]
Classification: [Violation type]
Remedies: [Available actions]
```

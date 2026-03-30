---
name: california-labor-employment-audit
description: Passive audit layer that flags California Labor Code, NLRA, and union-related violations in employment documents, correspondence, and union matters.
---

# California Labor & Employment Audit

## Purpose

Passive audit layer. When user submits employment-related documents including union matters, audit against California Labor Code and federal labor law.

## Governing Standards

### California
- Cal. Labor Code (all divisions)
- Cal. Code Regs. Title 8 (Industrial Relations)
- Cal. Unemp. Ins. Code

### Federal
- National Labor Relations Act (29 USC § 151 et seq.)
- NLRB Rules and Regulations (29 CFR)
- ERISA (29 USC § 1001 et seq.)
- OSHA (29 USC § 651 et seq.)

### Union-Specific
- Collective Bargaining Agreement provisions
- Union constitution and bylaws
- Duty of fair representation standards

## Audit Triggers

Activate when document involves:
- Employment records
- Wage statements
- Termination documents
- Union correspondence
- Grievance proceedings
- Apprenticeship records
- Benefits disputes

## Audit Checklist

### Wage & Hour (Labor Code §§ 200-2699.8)
- [ ] Proper wage statement (Labor Code § 226)
- [ ] Overtime calculation correct
- [ ] Meal/rest period compliance
- [ ] Final pay timing (Labor Code § 201-203)

### Union Representation
- [ ] Duty of fair representation met
- [ ] Grievance procedures followed
- [ ] CBA provisions applied correctly
- [ ] No discrimination based on union activity

### Documentation Requirements
- [ ] Personnel file access provided (Labor Code § 1198.5)
- [ ] Required notices posted/provided
- [ ] Records retention compliance

### Apprenticeship (Labor Code § 3070 et seq.)
- [ ] DAS registration compliance
- [ ] Training hour requirements
- [ ] Wage progression correct

## Output Protocol

```
---
## Labor/Employment Compliance Audit

**Document:** [Type, Date]
**Employer/Union:** [Name]

| Category | Standard | Status | Finding |
|----------|----------|--------|---------|
| Wage/Hour | Labor Code § [X] | ✓/✗ | |
| Union Rep | NLRA/CBA | ✓/✗ | |
| Documentation | Labor Code § [X] | ✓/✗ | |

**Determination:** [COMPLIANT / NON-COMPLIANT]
```

---
name: fcra-chexsystems-consumer-report-audit
description: Passive audit layer that flags FCRA and California CCRAA violations in consumer reports, dispute responses, and reinvestigation results from ChexSystems and similar consumer reporting agencies.
---

# FCRA/ChexSystems Consumer Report Audit

## Purpose

Passive audit layer. When user submits consumer reports or CRA correspondence, audit against FCRA and California Consumer Credit Reporting Agencies Act.

## Governing Standards

### Federal
- 15 USC § 1681 et seq. (Fair Credit Reporting Act)
- 12 CFR Part 1022 (Regulation V)
- CFPB Official Interpretations

### California
- Cal. Civil Code § 1785.1 et seq. (CCRAA)
- Cal. Civil Code § 1785.25 (Accuracy requirements)

## Audit Triggers

Activate when document is:
- Consumer report from CRA
- Dispute response
- Reinvestigation results
- Adverse action notice based on consumer report

## Audit Checklist

### Report Accuracy (15 USC § 1681e(b))
- [ ] Information is accurate
- [ ] Information is complete
- [ ] Maximum possible accuracy standard applied

### Dispute Procedures (15 USC § 1681i)
- [ ] 30-day reinvestigation completed
- [ ] All relevant information considered
- [ ] Results communicated in writing
- [ ] Method of verification disclosed

### California Additions (Civil Code § 1785.16)
- [ ] Source of information disclosed
- [ ] Dates of information disclosed
- [ ] Dispute rights notice included

### Permissible Purpose (15 USC § 1681b)
- [ ] Valid permissible purpose for report
- [ ] Certification obtained from requester

## Output Protocol

```
---
## FCRA/CCRAA Compliance Audit

**CRA:** [Name]
**Document Type:** [Report/Dispute Response/etc.]

| Requirement | Standard | Status | Finding |
|-------------|----------|--------|---------|
| Accuracy | 15 USC § 1681e(b) | ✓/✗ | |
| Reinvestigation | 15 USC § 1681i | ✓/✗ | |
| Disclosure | Cal. Civ. Code § 1785.16 | ✓/✗ | |

**Determination:** [COMPLIANT / NON-COMPLIANT]
```

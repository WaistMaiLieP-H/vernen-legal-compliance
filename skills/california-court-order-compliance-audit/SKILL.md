---
name: california-court-order-compliance-audit
description: Passive audit layer that flags California court order deficiencies against CRC, CCP, Family Code, and Judicial Council form requirements.
---

# California Court Order Compliance Audit

## Purpose

Passive audit layer. When user submits California court orders, audit against applicable procedural and substantive requirements.

## Governing Standards

### California Rules of Court
- CRC 1.31 (Signatures)
- CRC 2.30 (Form of papers)
- CRC 3.1312 (Proposed orders)
- CRC 5.125 (Family law orders)

### Code of Civil Procedure
- CCP § 581d (Dismissals)
- CCP § 1003 (Orders and judgments)

### Family Code
- Fam. Code § 215 (Summons requirements)
- Fam. Code § 2010 et seq. (Judgments)
- Fam. Code § 3022 (Custody orders)
- Fam. Code § 3044 (DV presumption findings)

### Judicial Council Forms
- Mandatory vs. optional forms
- Form completion requirements

## Audit Triggers

Activate when document is:
- Court order (any type)
- Minute order
- Judgment
- Custody/visitation order
- Restraining order
- Transfer order

## Audit Checklist

### Jurisdictional Requirements
- [ ] Court has subject matter jurisdiction
- [ ] Court has personal jurisdiction
- [ ] Proper venue
- [ ] UCCJEA compliance (custody matters)

### Formal Requirements
- [ ] Proper caption (court, parties, case number)
- [ ] Date of order
- [ ] Judge's signature or clerk attestation
- [ ] Filed stamp

### Substantive Requirements
- [ ] Findings support conclusions
- [ ] Required findings included (e.g., Fam. Code § 3044)
- [ ] Unambiguous directive language
- [ ] Effective date stated

### Service/Notice
- [ ] Parties served or present
- [ ] Proper notice given

## Output Protocol

```
---
## Court Order Compliance Audit

**Court:** [Name]
**Order Type:** [Type]
**Date:** [Date]
**Case Number:** [Number]

| Category | Standard | Status | Finding |
|----------|----------|--------|---------|
| Jurisdiction | [Citation] | ✓/✗ | |
| Form | CRC [Section] | ✓/✗ | |
| Substance | [Citation] | ✓/✗ | |
| Service | [Citation] | ✓/✗ | |

**Determination:** [COMPLIANT / NON-COMPLIANT]
```

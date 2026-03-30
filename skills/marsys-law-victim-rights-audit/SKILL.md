---
name: marsys-law-victim-rights-audit
description: Passive audit layer that flags Marsy's Law and California victim rights violations when reviewing DA correspondence, court proceedings, or victim notification documents.
---

# Marsy's Law Victim Rights Audit

## Purpose

Passive audit layer. When user submits documents from prosecutors or courts involving victim status, audit against California Constitutional victim rights.

## Governing Standards

### California Constitution
- Art. I, § 28 (Marsy's Law - Crime Victims' Bill of Rights)

### California Penal Code
- Penal Code § 679 et seq. (Rights of victims and witnesses)
- Penal Code § 679.02 (Enumerated rights)
- Penal Code § 679.026 (Enforcement)

### Prosecution Standards
- Penal Code § 11116 (Victim notification by DA)

## Audit Triggers

Activate when document involves:
- DA charging/rejection decisions
- Victim notification letters
- Restitution proceedings
- Plea negotiations affecting victim
- Parole/release notifications

## Victim Rights Checklist (Cal. Const. Art. I, § 28(b))

- [ ] (1) Fair treatment with respect for dignity/privacy
- [ ] (2) Protection from defendant and persons acting on defendant's behalf
- [ ] (3) Notification of and ability to attend proceedings
- [ ] (4) Right to be heard at proceedings
- [ ] (5) Right to confer with prosecution
- [ ] (6) Information about case status
- [ ] (7) Restitution
- [ ] (8) Return of property
- [ ] (9) Speedy trial
- [ ] (10) Provide information to probation pre-sentence
- [ ] (11) Notification of release/escape
- [ ] (12) Prevent disclosure of confidential information
- [ ] (13) Refuse interview by defendant's attorney
- [ ] (14) Informed of rights
- [ ] (15) Standing to enforce rights in court
- [ ] (16) Timely disposition
- [ ] (17) Be heard at parole proceedings

## Output Protocol

```
---
## Marsy's Law Compliance Audit

**Document:** [Type, Date]
**Entity:** [DA/Court/CDCR]

| Right | Cal. Const. Art. I § 28(b) | Status | Finding |
|-------|----------------------------|--------|---------|
| Notification | (3), (6), (11) | ✓/✗ | |
| Participation | (4), (5), (10) | ✓/✗ | |
| Protection | (2), (12) | ✓/✗ | |
| Restitution | (7) | ✓/✗ | |
| Information | (14) | ✓/✗ | |

**Determination:** [COMPLIANT / NON-COMPLIANT]
```

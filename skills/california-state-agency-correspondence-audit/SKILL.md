---
name: california-state-agency-correspondence-audit
description: Passive audit layer that flags California state agency correspondence deficiencies against SAM, Plain Language, accessibility, and agency-specific correspondence standards.
---

# California State Agency Correspondence Audit Framework

## Purpose

Passive audit layer. When user submits or reviews correspondence FROM a California state agency, automatically audit the document against applicable correspondence standards governing that agency's outbound communications.

## Audit Scope

This skill audits the AGENCY'S compliance with correspondence standards — not the recipient's claims or the substantive decision. The question is: "Did the agency produce this document in accordance with all governing requirements for official correspondence?"

## Governing Standards

### State Administrative Manual (SAM)

- SAM § 1215 — Official Correspondence Standards
- SAM § 1220 — Letter Format Requirements
- SAM § 1230 — Signature Authority
- SAM § 4819 et seq. — Records Management
- Reference: https://www.dgs.ca.gov/Resources/SAM

### Plain Language Requirements

- Cal. Gov. Code § 6219 — Plain Language in State Documents
- Federal Plain Writing Act of 2010 (if federal funds involved)
- Requirements: Clear, concise, well-organized; avoids jargon; uses active voice; appropriate reading level

### Accessibility Standards

- Cal. Gov. Code § 11135 — Non-discrimination, accessibility
- Cal. Gov. Code § 7405 — Web accessibility (if electronic)
- Americans with Disabilities Act (ADA) — accessible formats
- Section 508 compliance (if federal nexus)

### Bilingual Services Act

- Cal. Gov. Code § 7290 et seq. — Dymally-Alatorre Bilingual Services Act
- Requires translation when substantial non-English speaking population served
- Quality standard: Translations must be accurate and equivalent

### Agency-Specific Standards

#### CalVCB (Victim Compensation Board)
- Cal. Gov. Code §§ 13900-13974.5
- CalVCB Program Regulations (Title 2, CCR § 640 et seq.)
- Required elements: Application number, appeal rights, deadlines, contact information

#### CPS/CDSS (Child Welfare)
- Cal. Welf. & Inst. Code
- CDSS Manual of Policies and Procedures
- MPP Division 31 correspondence requirements

#### POST (Law Enforcement Standards)
- Cal. Penal Code § 13500 et seq.
- 11 CCR § 1000 et seq.

#### Medical Board of California
- 16 CCR § 1300 et seq.
- Business and Professions Code correspondence requirements

## Audit Triggers

Activate when user submits or reviews any document that:
- Bears California state agency letterhead
- Is addressed TO the user FROM a state agency
- Contains official case/application numbers
- References California statutes or regulations
- Is part of an administrative proceeding

## Audit Checklist

### 1. Document Identification
- [ ] Agency clearly identified (letterhead, logo)
- [ ] Date of correspondence present
- [ ] Case/application/reference number included
- [ ] Recipient name and address correct
- [ ] Sender identification (name, title, contact)

### 2. Structural Compliance
- [ ] Proper salutation
- [ ] Clear subject line/RE: block
- [ ] Logical paragraph organization
- [ ] Proper closing
- [ ] Signature block complete
- [ ] Enclosure notation (if applicable)
- [ ] CC notation (if applicable)

### 3. Content Requirements
- [ ] Purpose stated clearly in first paragraph
- [ ] Legal basis cited (statute, regulation)
- [ ] Decision/action clearly stated
- [ ] Deadlines explicitly stated with dates
- [ ] Appeal/reconsideration rights explained
- [ ] Contact information for questions
- [ ] Required notices included (per program)

### 4. Plain Language Compliance
- [ ] Active voice predominant
- [ ] Sentences ≤20 words average
- [ ] Jargon avoided or defined
- [ ] Reading level appropriate (8th grade target)
- [ ] Instructions actionable and clear

### 5. Grammar, Punctuation, Mechanics
- [ ] Subject-verb agreement
- [ ] Proper punctuation
- [ ] Consistent capitalization
- [ ] No spelling errors
- [ ] Proper citation format
- [ ] Consistent date format throughout

### 6. Accessibility & Bilingual
- [ ] Alternative format notice (if required)
- [ ] TTY/TDD number included
- [ ] Spanish translation provided (if required)
- [ ] Translation accuracy (if bilingual)

### 7. Legal Sufficiency
- [ ] Correct statute/regulation cited
- [ ] Deadline calculations accurate
- [ ] Appeal rights accurately stated
- [ ] Required findings included
- [ ] Due process notice adequate

## Output Protocol

When correspondence audit completed, append to document audit:

```
---
## Agency Correspondence Compliance Audit

**Agency:** [Name]
**Document Date:** [Date]
**Document Type:** [Letter type]

### Compliance Summary

| Category | Status | Deficiencies |
|----------|--------|--------------|
| Identification | ✓/✗ | [List] |
| Structure | ✓/✗ | [List] |
| Content | ✓/✗ | [List] |
| Plain Language | ✓/✗ | [List] |
| Grammar/Mechanics | ✓/✗ | [List] |
| Accessibility | ✓/✗ | [List] |
| Legal Sufficiency | ✓/✗ | [List] |

### Deficiencies Identified

| # | Category | Deficiency | Standard Violated | Evidence |
|---|----------|------------|-------------------|----------|
| 1 | [Cat] | [Description] | [Citation] | [Location in doc] |

### Compliance Determination

[COMPLIANT / NON-COMPLIANT / PARTIALLY COMPLIANT]

Total Deficiencies: [#]
Critical: [#] | Major: [#] | Minor: [#]
```

## Severity Classifications

**Critical:** Affects legal rights, deadlines, or due process
- Missing appeal deadline
- Incorrect legal citation affecting rights
- Missing required notice

**Major:** Affects comprehension or compliance ability
- Unclear instructions
- Missing contact information
- Calculation errors

**Minor:** Technical/stylistic deficiency
- Grammar errors
- Formatting inconsistencies
- Minor punctuation issues

## Integration

This skill integrates with and runs IN ADDITION TO:
- legal-bias-and-fraud-auditor (S.o.C. analysis)
- constitutional-and-civil-rights-audit (rights implications)
- Agency-specific audit skills (POST, CPS, Medical Board, etc.)

When a California state agency document is processed, ALL applicable audit layers activate automatically.

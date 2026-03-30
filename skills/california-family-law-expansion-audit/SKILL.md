---
name: california-family-law-expansion-audit
description: >
  Expanded audit layer for California family law proceedings beyond basic custody — covers spousal
  support calculations, property division, QDRO compliance, move-away motions, domestic violence
  restraining orders (DVRO/DVTRO), paternity actions, and family law contempt proceedings. Trigger
  whenever reviewing family law financial disclosures, support calculations, property characterization
  disputes, QDROs, move-away motions, or contempt filings. Complements existing fcs-child-custody
  and california-court-order-compliance skills.
---

# California Family Law Expansion Audit

## Activation Trigger

When ANY document or user description involves:
- Spousal support / alimony calculations or orders
- Property division (community vs separate)
- Financial disclosures (FL-150, FL-142)
- QDROs (Qualified Domestic Relations Orders)
- Move-away motions (LaMusga factors)
- DVRO/DVTRO petitions or responses
- Paternity / parentage actions
- Family law contempt proceedings
- Fee waivers in family law
- Bifurcation of marital status

## Governing Standards

### Spousal Support
- **Family Code §§ 4320-4326** — Factors for permanent support
- **Family Code § 3600** — Temporary support during proceedings
- **Family Code § 4330** — Duration and self-sufficiency
- **Marriage of Williamson** — vocational evaluation standards
- **Gavron warning** — duty to become self-supporting

### Property Division
- **Family Code §§ 760-761** — Community property presumption
- **Family Code § 770** — Separate property definition
- **Family Code § 2550** — Equal division mandate
- **Family Code § 2640** — Reimbursement claims
- **Family Code § 1101** — Fiduciary duties between spouses
- **Family Code § 2107** — Sanctions for disclosure violations

### Financial Disclosures
- **Family Code §§ 2100-2113** — Fiduciary duty of disclosure
- **FL-150** — Income and Expense Declaration
- **FL-142** — Schedule of Assets and Debts
- **FL-160** — Property Declaration

### Move-Away
- **Family Code § 7501** — Custodial parent's right to move
- **Marriage of LaMusga (2004)** — Best interest factors for move-away
- **Marriage of Burgess (1996)** — Changed circumstance standard

### DVRO
- **Family Code §§ 6200-6389** — DVPA
- **Family Code § 6300** — Issuance of protective order
- **Family Code § 6340** — Custody/visitation in DVRO context
- **Family Code § 3044** — Rebuttable presumption against DV perpetrator

### Contempt
- **CCP § 1209** — Acts constituting contempt
- **Family Code § 290** — Enforcement of family law orders
- **CCP § 1218** — Punishment for contempt

## Audit Checklists

### Financial Disclosure Audit
- [ ] Both parties served and filed FL-150/FL-142
- [ ] All income sources disclosed (W-2, 1099, K-1, rental, cash)
- [ ] Disclosure of stock options, RSUs, deferred compensation
- [ ] Business valuation completed if self-employed
- [ ] Pension/retirement accounts identified with Ds&Bs date
- [ ] Tax returns attached (2 years minimum)
- [ ] Access to records not impeded (§ 2107 sanctions available)

### Spousal Support Calculation Audit
- [ ] All § 4320 factors addressed
- [ ] Marital standard of living documented
- [ ] Duration of marriage correctly calculated (date of marriage to DOS)
- [ ] Earning capacity of both parties analyzed
- [ ] Vocational evaluation ordered if appropriate
- [ ] Tax implications considered
- [ ] Gavron warning included in order
- [ ] Reasonable transition period for long-term marriage (>10 years)

### Property Division Audit
- [ ] Community property correctly characterized
- [ ] Date of separation properly determined (Family Code § 70)
- [ ] Separate property claims supported by tracing
- [ ] Transmutation requirements met (§ 852 — writing requirement)
- [ ] Reimbursement claims identified (§ 2640, § 2641)
- [ ] Epstein/Watts credits analyzed post-separation
- [ ] Marital debt allocation equitable

### DVRO Audit
- [ ] Reasonable proof standard met (DV within meaning of § 6211)
- [ ] Specific incidents described with dates/details
- [ ] Children's safety addressed
- [ ] Firearms relinquishment ordered (§ 6389)
- [ ] No mutual restraining orders absent separate findings (§ 6305)
- [ ] Duration specified (up to 5 years, renewable)

## Output Format

For each finding:
1. **VIOLATION**: Description of deficiency
2. **STANDARD**: Specific code section or case law violated
3. **EVIDENCE**: Document reference and location
4. **SEVERITY**: Critical / Major / Minor
5. **REMEDY**: Available procedural remedy

## Cross-Reference Skills
- `fcs-child-custody-recommending-counselor-audit` — custody evaluation context
- `california-court-order-compliance-audit` — order format/content
- `state-bar-of-california-attorney-conduct-audit` — attorney misconduct in disclosure
- `legal-bias-and-fraud-auditor` — one-sided financial declarations

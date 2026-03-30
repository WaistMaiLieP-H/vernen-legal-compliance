---
name: california-housing-tenant-rights-audit
description: >
  Passive audit layer that flags housing discrimination, unlawful eviction, habitability violations,
  rent control non-compliance, and tenant rights abuses against California Civil Code, Government Code
  (FEHA housing provisions), Health & Safety Code, and local rent stabilization ordinances. Trigger
  whenever reviewing eviction notices, lease agreements, landlord correspondence, housing complaints,
  code enforcement documents, Section 8/HCV documentation, or any tenant-landlord dispute materials.
---

# California Housing & Tenant Rights Audit

## Activation Trigger

When ANY document or user description involves:
- Eviction notices (3-day, 30-day, 60-day, 90-day)
- Lease agreements or rental contracts
- Landlord-tenant disputes
- Habitability complaints or code violations
- Rent increases or rent control matters
- Housing discrimination complaints
- Section 8 / Housing Choice Voucher issues
- Retaliatory actions by landlords
- Security deposit disputes
- Ellis Act or Owner Move-In evictions

## Governing Standards

### State Law
- **California Civil Code §§ 1940-1954.06** — Hiring of Real Property (tenant rights)
- **Civil Code § 1942.4** — Habitability; rent withholding
- **Civil Code § 1942.5** — Retaliatory eviction prohibition
- **Civil Code § 1946.2** — Tenant Protection Act (AB 1482) — just cause eviction, rent caps
- **Civil Code §§ 1950.5-1950.7** — Security deposits
- **Government Code § 12955** — FEHA housing discrimination
- **Health & Safety Code §§ 17920.3-17920.10** — Substandard building standards
- **CCP § 1161** — Unlawful detainer grounds
- **CCP § 1161.2** — COVID-era protections (check current status)

### Federal Law
- **Fair Housing Act, 42 USC §§ 3601-3619**
- **24 CFR Part 982** — Section 8 HCV program requirements

### Local Ordinances (flag when applicable)
- San Francisco Rent Ordinance
- Los Angeles RSO (LAMC Chapter XV)
- Oakland Just Cause for Eviction Ordinance
- Berkeley Rent Stabilization
- Richmond Fair Rent Ordinance

## Audit Checklist

### Eviction Notice Review
- [ ] Proper notice period (3/30/60/90-day as applicable)
- [ ] Just cause stated per Civil Code § 1946.2 (if tenancy > 12 months)
- [ ] Relocation assistance offered for no-fault evictions (§ 1946.2(d))
- [ ] Proper service method documented
- [ ] Notice contains mandatory statutory language
- [ ] No retaliatory timing (within 180 days of complaint per § 1942.5)

### Lease Agreement Review
- [ ] No prohibited provisions (§ 1953 — waiver of rights void)
- [ ] Rent increase complies with AB 1482 cap (5% + CPI, max 10%)
- [ ] Security deposit within legal limits (2x rent unfurnished, 3x furnished)
- [ ] Proper disclosure of bed bugs, mold, flooding history
- [ ] No discrimination in terms or conditions

### Habitability Assessment
- [ ] Effective waterproofing and weather protection
- [ ] Plumbing, gas, heating in good working order
- [ ] Hot and cold running water
- [ ] Adequate heating facilities
- [ ] Working electrical lighting
- [ ] Clean and sanitary grounds/common areas
- [ ] Adequate trash receptacles
- [ ] Floors, stairways, railings maintained
- [ ] Working locks on doors and windows
- [ ] No lead paint hazards (pre-1978 buildings)

### Discrimination Indicators
- [ ] Different terms/conditions based on protected class
- [ ] Refusal to make reasonable accommodations (disability)
- [ ] Discriminatory advertising language
- [ ] Source-of-income discrimination (Section 8)
- [ ] Familial status discrimination

## Output Format

For each finding:
1. **VIOLATION**: Description of deficiency
2. **STANDARD**: Specific code section violated
3. **EVIDENCE**: Document reference and location
4. **SEVERITY**: Critical / Major / Minor
5. **REMEDY**: Available tenant remedy or enforcement action

## Cross-Reference Skills
- `constitutional-and-civil-rights-audit` — for Equal Protection / Due Process claims
- `california-state-agency-correspondence-audit` — for HCD or local agency response review

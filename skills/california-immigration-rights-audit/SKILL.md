---
name: california-immigration-rights-audit
description: >
  Passive audit layer that flags immigration-related rights violations in California — covers
  AB 450 workplace immigration enforcement restrictions, SB 54 sanctuary state compliance,
  immigration-based housing/employment discrimination, notario fraud, and state-level protections
  for undocumented residents. Trigger whenever reviewing ICE detainer requests, workplace I-9 audits,
  immigration-related employment actions, housing denials citing immigration status, notario fraud
  complaints, or any document involving intersection of immigration status with California rights.
---

# California Immigration Rights Audit

## Activation Trigger

When ANY document or user description involves:
- Workplace immigration enforcement or I-9 audits
- ICE detainer requests to local law enforcement
- Employment discrimination based on immigration status
- Housing discrimination based on citizenship/immigration status
- Notario fraud or immigration services fraud
- California sanctuary city/state policy compliance
- U-visa or T-visa certification requests
- Language access in government services
- Driver's license (AB 60) issues
- Professional licensing for DACA recipients

## Governing Standards

### State Law — Worker Protections
- **Labor Code § 1019** — Prohibition on retaliation using immigration status
- **Labor Code § 1024.6** — Employer restrictions during immigration audit (AB 450)
- **Labor Code § 244** — Prohibition on unfair immigration-related practices
- **Labor Code § 98.6** — Protection from retaliation for filing wage claim
- **Business & Professions Code § 22440-22449** — Immigration consultant regulation
- **Penal Code § 532b** — Immigration fraud

### State Law — Sanctuary Protections
- **Government Code §§ 7284-7284.12** — California Values Act (SB 54)
- **Government Code § 7285** — ICE access restrictions
- **Health & Safety Code § 1357.10** — Health care access regardless of immigration status

### State Law — Housing/Services
- **Government Code § 12955** — FEHA housing (includes immigration status in some jurisdictions)
- **Civil Code § 1940.05** — Immigration status irrelevant in landlord-tenant
- **Civil Code § 1940.35** — Landlord cannot threaten immigration enforcement

### Federal Law (reference only)
- **8 USC § 1324b** — Anti-discrimination provisions of INA
- **Title VII, 42 USC § 2000e** — National origin discrimination
- **Fair Housing Act** — National origin protections

## Audit Checklists

### Workplace Immigration Audit (AB 450 Compliance)
- [ ] Employer provided 72-hour notice to employees before federal audit
- [ ] Employer did not provide voluntary consent to warrantless federal agent access
- [ ] Employer posted ICE inspection notice in the workplace
- [ ] Employer did not reverify documents not legally required
- [ ] No adverse action taken against employees during or after audit
- [ ] No threats to call immigration authorities during labor dispute
- [ ] Employee notification of audit results within 72 hours

### Law Enforcement — SB 54 Compliance
- [ ] Agency not honoring ICE detainer requests absent judicial warrant
- [ ] No agency resources used for immigration enforcement
- [ ] No transfer of individuals to immigration authorities without court order
- [ ] Exceptions properly documented (prior serious felony convictions)
- [ ] Agency policy posted and accessible to public

### Immigration Consultant/Notario Fraud
- [ ] Consultant properly registered with county clerk (B&P § 22442)
- [ ] Bond posted ($100,000 minimum per § 22443)
- [ ] Written contract provided in client's language (§ 22442(a))
- [ ] No representation as attorney or providing legal advice
- [ ] No guarantee of immigration outcomes
- [ ] Fee schedule disclosed in advance
- [ ] Original documents returned to client

### Housing Discrimination
- [ ] No inquiry into immigration status for rental application
- [ ] No threats of immigration enforcement in landlord-tenant dispute
- [ ] No discriminatory lease terms based on national origin
- [ ] Language access provided for lease terms
- [ ] No retaliation for exercising habitability rights

## Output Format

For each finding:
1. **VIOLATION**: Description of deficiency
2. **STANDARD**: Specific code section violated
3. **EVIDENCE**: Document reference and location
4. **SEVERITY**: Critical / Major / Minor
5. **REMEDY**: Available enforcement action or complaint mechanism

## Cross-Reference Skills
- `california-labor-employment-audit` — wage theft / retaliation context
- `california-housing-tenant-rights-audit` — housing discrimination
- `ca-post-law-enforcement-audit` — law enforcement SB 54 compliance
- `constitutional-and-civil-rights-audit` — Equal Protection claims

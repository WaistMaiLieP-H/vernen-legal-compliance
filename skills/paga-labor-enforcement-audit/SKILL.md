---
name: paga-labor-enforcement-audit
description: Passive audit layer that flags PAGA notice deficiencies, Labor Code violation claims, cure provisions, and procedural requirements in PAGA notices, LWDA correspondence, employer responses, and settlement agreements.
---

# PAGA Labor Enforcement Audit

## Purpose

Passive audit layer. When user submits PAGA notices, LWDA correspondence, employer cure letters, settlement agreements, or underlying Labor Code violation documentation, audit against PAGA procedural requirements, underlying Labor Code standards, and post-Viking River procedural developments for notice adequacy, standing, and penalty calculation compliance.

## Governing Standards

### Federal

- **Viking River Cruises, Inc. v. Moriana, 596 U.S. 639 (2022)** — FAA preemption, individual PAGA claims arbitrable, standing for non-individual claims (subsequently addressed by Adolph v. Uber)
- **29 USC § 201 et seq** — Fair Labor Standards Act (FLSA) (federal floor for wage/hour standards)
- **9 USC § 1 et seq** — Federal Arbitration Act (FAA) (arbitration enforcement context)

### California

- **Cal. Labor Code § 2698-2699.8** — Private Attorneys General Act of 2004 (PAGA)
- **Cal. Labor Code § 2699.3** — Administrative exhaustion and notice requirements
- **Cal. Labor Code § 2699.5** — Labor Code sections subject to PAGA penalties
- **Cal. Labor Code § 2699(a)** — Penalty distribution (75% LWDA / 25% aggrieved employees)
- **Cal. Labor Code § 226.7** — Meal and rest period violations
- **Cal. Labor Code § 510** — Overtime requirements
- **Cal. Labor Code § 226** — Wage statement requirements (itemized)
- **Cal. Labor Code § 203** — Waiting time penalties (final wages)
- **Cal. Labor Code § 1194** — Minimum wage violations
- **Cal. Labor Code § 1198** — Maximum hours violations
- **Cal. Labor Code § 201-202** — Timing of final wage payments (termination vs resignation)
- **Cal. Labor Code § 204** — Semi-monthly pay requirements
- **Cal. Labor Code § 2802** — Expense reimbursement
- **Cal. Labor Code § 1102.5** — Whistleblower retaliation
- **Cal. Labor Code § 558** — Overtime penalty calculation
- **Cal. Labor Code § 558.1** — Individual liability for wage theft
- **Adolph v. Uber Technologies, Inc., 14 Cal. 5th 1104 (2023)** — Standing retained for non-individual PAGA claims even after individual claim compelled to arbitration
- **Kim v. Reins International California, Inc., 9 Cal. 5th 73 (2020)** — Settlement must be approved by court, LWDA notification required

### Regulatory

- **IWC Wage Orders (1-17)** — Industry-specific wage/hour requirements (meal periods, rest periods, overtime)
- **DLSE Enforcement Policies and Interpretations Manual** — DLSE guidance on Labor Code provisions
- **LWDA Filing Portal** — Electronic notice filing requirements and procedures

## Audit Triggers

- PAGA notice letters filed with LWDA
- LWDA response or acknowledgment correspondence
- Employer cure letters or cure documentation
- PAGA complaints filed in court
- Settlement agreements in PAGA actions
- Underlying wage statements or pay records
- Time and attendance records
- Meal and rest period policies or waivers
- Final pay documentation (termination or resignation)
- Arbitration agreements with PAGA waivers

## Audit Checklist

### PAGA Notice Adequacy
- [ ] Verify written notice filed with LWDA online portal before filing court action
- [ ] Confirm notice sent to employer by certified mail
- [ ] Check that notice identifies specific Labor Code provisions allegedly violated
- [ ] Verify notice includes facts and theories supporting each alleged violation
- [ ] Assess specificity of factual allegations (not conclusory)
- [ ] Confirm notice identifies the aggrieved employee filing the notice
- [ ] Verify notice was filed within one year of the alleged violation (§ 340, CCP)
- [ ] Check whether notice covers all violations subsequently pleaded in complaint

### Exhaustion and Timing Requirements
- [ ] Verify 65-calendar-day waiting period elapsed before filing court action (from LWDA notice)
- [ ] Determine whether LWDA responded within 65 days (investigation decision)
- [ ] If LWDA declined investigation: confirm 65-day period expired
- [ ] If employer alleged cure: verify 33-day cure response period observed
- [ ] Assess whether alleged cure actually remedied the violation
- [ ] Confirm no court action filed before exhaustion period complete
- [ ] Check for any LWDA deficiency letter and whether deficiencies were corrected

### Standing Analysis
- [ ] Verify filer is or was an "aggrieved employee" (employed by alleged violator and suffered at least one violation)
- [ ] Assess post-Viking River standing — if individual claim sent to arbitration, does Adolph v. Uber apply to retain standing for representative claims
- [ ] Confirm aggrieved employee status as to each cause of action (violation-specific standing)
- [ ] Check employment dates against violation period
- [ ] Verify employee was employed in California during relevant period
- [ ] Assess whether employee signed arbitration agreement with class/PAGA waiver

### Underlying Labor Code Violations
- [ ] Audit meal period compliance: timely first meal (before end of 5th hour), second meal (before end of 10th hour)
- [ ] Audit rest period compliance: 10 minutes per 4 hours worked (or major fraction thereof)
- [ ] Verify overtime calculated correctly: daily (8+ hours), weekly (40+ hours), 7th consecutive day
- [ ] Check wage statement compliance (§ 226): 9 required items (gross/net wages, hours, rates, deductions, employer name/address, employee name/ID, pay period, applicable piece rate)
- [ ] Verify final wages paid timely: immediately upon involuntary termination (§ 201), within 72 hours of resignation or immediately if 72-hour notice given (§ 202)
- [ ] Assess minimum wage compliance at state and local levels
- [ ] Check expense reimbursement for necessary business expenditures (§ 2802)
- [ ] Verify proper pay frequency and timing (§ 204)

### Penalty Calculation
- [ ] Apply correct penalty: $100 per employee per pay period for initial violation (§ 2699(f)(2))
- [ ] Apply correct penalty: $200 per employee per pay period for subsequent violations
- [ ] Calculate total penalties across all aggrieved employees and pay periods
- [ ] Apply 75/25 split (75% to LWDA, 25% to aggrieved employees)
- [ ] Assess whether court may exercise discretion to reduce penalties (§ 2699(e)(2))
- [ ] Evaluate penalty stacking across multiple violations per pay period
- [ ] Check for special penalty provisions in specific Labor Code sections (e.g., § 226(e), § 203)

### Settlement Review
- [ ] Verify settlement submitted to court for approval (required for all PAGA settlements)
- [ ] Confirm LWDA notified of proposed settlement and given opportunity to comment
- [ ] Assess whether settlement amount is fair, reasonable, and adequate
- [ ] Verify 75/25 LWDA/employee split honored in settlement allocation
- [ ] Check attorney fee reasonableness (typically 33% of total settlement)
- [ ] Confirm settlement provides for distribution to all aggrieved employees
- [ ] Assess release scope — ensure it does not release non-PAGA claims without separate consideration
- [ ] Verify settlement administrator provisions and distribution timeline

### Manageability and Scope
- [ ] Assess whether PAGA claims are manageable as representative action
- [ ] Evaluate employer's manageability defense (if raised)
- [ ] Check scope of representative claims — all employees vs subset
- [ ] Assess adequacy of sampling methodology if used for violation proof
- [ ] Verify applicable statute of limitations (one year from PAGA notice, underlying violations may have longer SOL)
- [ ] Evaluate relationship to any concurrent class action or individual claims

## Output Protocol

```markdown
| Field | Value |
|---|---|
| Document ID | [assigned identifier] |
| Document Type | [PAGA notice / LWDA correspondence / cure letter / settlement / complaint / other] |
| LWDA Notice Date | [date filed] |
| Court Filing Date | [date or "Not Yet Filed"] |
| Exhaustion Period | [65 days elapsed: Yes / No — date eligible] |
| Cure Attempted | [Yes — specify / No] |
| Standing Status | [Established / Deficient / Challenged — specify basis] |
| Labor Code Violations Alleged | [list specific sections] |
| Violations Substantiated | [list with supporting evidence or "Not Assessed"] |
| Aggrieved Employee Count | [number or estimate] |
| Penalty Calculation | [initial: $____ / subsequent: $____ / total: $____] |
| LWDA Share (75%) | [$____] |
| Employee Share (25%) | [$____] |
| Settlement Adequacy | [Fair/Adequate / Deficient / N/A] |
| Arbitration Impact | [Viking River/Adolph analysis or "N/A"] |
| Risk Level | [Critical / High / Medium / Low] |
| Auditor Notes | [narrative summary of findings] |
```

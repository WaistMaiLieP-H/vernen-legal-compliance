---
name: probate-conservatorship-audit
description: Passive audit layer that flags probate and conservatorship irregularities, fiduciary breaches, accounting deficiencies, and due process violations in petitions, accountings, inventories, and court orders.
---

# Probate and Conservatorship Audit

**Purpose:** Detect irregularities, fiduciary breaches, accounting deficiencies, and due process violations across conservatorship petitions, estate administration, trust accountings, inventories, and court filings. This skill passively audits documents for procedural noncompliance, missing safeguards, capacity determination failures, and fiduciary self-dealing.

## Governing Standards

### Federal
- U.S. Constitution, 14th Amendment (Due Process — Liberty Interest in Personal Autonomy)
- 42 USC § 3058g (Older Americans Act — Long-Term Care Ombudsman)
- 42 USC § 12101 et seq (ADA — Disability Accommodations in Court Proceedings)
- 42 USC § 1983 (Civil Rights — State Action Depriving Liberty Without Due Process)

### California
- Cal. Probate Code § 1800 (Legislative Findings — Conservatorship as Last Resort)
- Cal. Probate Code § 1800.3 (Least Restrictive Alternative Requirement)
- Cal. Probate Code § 1801 (Conservatorship of the Person)
- Cal. Probate Code § 1802 (Conservatorship of the Estate)
- Cal. Probate Code § 1810 (Who May Petition for Conservatorship)
- Cal. Probate Code § 1820-1828 (Citation, Notice, and Rights Advisement)
- Cal. Probate Code § 1821 (Notice to Proposed Conservatee — 15 Days Before Hearing)
- Cal. Probate Code § 1826 (Court Investigation Before Appointment)
- Cal. Probate Code § 1828 (Conservatee Rights — Jury Trial, Counsel, Presence at Hearing)
- Cal. Probate Code § 1830 (Temporary Conservatorship — Emergency Only)
- Cal. Probate Code § 1840 (Appointment Hearing Requirements)
- Cal. Probate Code § 1850 (Court Investigator — Biennial Review of Continuing Need)
- Cal. Probate Code § 1860 (Limited Conservatorship — Developmentally Disabled Individuals)
- Cal. Probate Code § 1860.5 (Limited Conservatorship — Specific Powers Only)
- Cal. Probate Code § 1871 (Capacity Declarations — Required Medical Evidence)
- Cal. Probate Code § 1872 (Conservator Qualifications)
- Cal. Probate Code § 2101 (Fiduciary Duty — Utmost Good Faith)
- Cal. Probate Code § 2110-2117 (Conservator Powers and Limitations)
- Cal. Probate Code § 2250 (Independent Powers Under IAEA)
- Cal. Probate Code § 2320 (Bond Requirements)
- Cal. Probate Code § 2400-2403 (Accounting Duty)
- Cal. Probate Code § 2401 (First Accounting Due Within 1 Year)
- Cal. Probate Code § 2403 (Accounting Content Requirements)
- Cal. Probate Code § 2540 (Court Authorization for Specific Transactions)
- Cal. Probate Code § 2543 (Prohibition on Self-Dealing)
- Cal. Probate Code § 2580 (Substituted Judgment for Estate Planning)
- Cal. Probate Code § 2620 (Settlement of Accounts)
- Cal. Probate Code § 2630 (Liability of Conservator for Breach)
- Cal. Probate Code § 2680 (Termination of Conservatorship)
- Cal. Probate Code § 2684 (Restoration of Rights)
- Cal. Probate Code § 6100-6105 (Wills — Capacity and Undue Influence)
- Cal. Probate Code § 6110 (Will Execution Requirements)
- Cal. Probate Code § 8000-8005 (Petition for Probate)
- Cal. Probate Code § 8200-8273 (Notice Requirements in Probate)
- Cal. Probate Code § 8461 (Priority for Appointment as Personal Representative)
- Cal. Probate Code § 8800-8807 (Inventory and Appraisal)
- Cal. Probate Code § 9000-9054 (Creditor Claims)
- Cal. Probate Code § 10580-10592 (Compensation of Personal Representative)
- Cal. Probate Code § 11640-11642 (Final Distribution)
- Cal. Probate Code § 12200-12591 (Trust Administration)
- Cal. Probate Code § 16000-16015 (Trustee Duties)
- Cal. Probate Code § 16060-16064 (Duty to Account to Beneficiaries)

### Regulatory
- Cal. Rules of Court, Rule 7.50-7.59 (Conservatorship Proceedings)
- Cal. Rules of Court, Rule 7.575 (Conservatorship Investigations)
- Cal. Rules of Court, Rule 7.1050-7.1063 (Probate Accountings)
- Cal. Rules of Court, Rule 7.1052 (Accounting Format — Receipts, Disbursements, On Hand)
- Cal. Rules of Court, Rule 7.1054 (Supporting Schedules Required)
- Cal. Rules of Court, Rule 7.1060 (Vouchers and Documentation)
- GC-310 (Capacity Declaration — Conservatorship)
- GC-312 (Confidential Supplemental Information)
- GC-335 (Duties of Conservator)
- GC-400 (Inventory and Appraisal)
- Judicial Council Form DE-160 (Inventory and Appraisal — Decedent's Estate)
- Local Rules of Superior Court (County-Specific Probate Requirements)

## Audit Triggers

- Conservatorship petitions (GC-310, GC-312, GC-320)
- Capacity declarations and medical evidence
- Court investigator reports (initial and biennial)
- Conservatorship accountings (annual and biennial)
- Inventories and appraisals (GC-400, DE-160)
- Petitions for special orders (sale of real property, gifts, estate planning)
- Bond filings and bond review orders
- Letters of conservatorship or letters testamentary
- Probate petitions and orders for administration
- Trust certifications and trust administration documents
- Trust accountings and beneficiary communications
- Creditor claims and claim rejection notices
- Personal representative fee petitions
- Attorney fee petitions in probate or conservatorship matters
- Final distribution petitions and orders

## Audit Checklist

### Conservatorship Petition and Appointment
- [ ] Petition states facts showing conservatorship is necessary (Probate Code § 1820)
- [ ] Least restrictive alternative analysis documented (§ 1800.3)
- [ ] Proposed conservatee served with citation at least 15 days before hearing (§ 1821)
- [ ] Notice served on spouse/domestic partner, relatives to second degree, and nominee (§ 1822)
- [ ] Capacity declaration (GC-310) filed with medical evidence from licensed professional (§ 1871)
- [ ] Court investigator report filed before hearing (§ 1826)
- [ ] Court investigator interviewed proposed conservatee in person (§ 1826(a))
- [ ] Proposed conservatee advised of right to counsel (§ 1828)
- [ ] Proposed conservatee advised of right to jury trial (§ 1828)
- [ ] Proposed conservatee present at hearing or waiver documented (§ 1825)
- [ ] Temporary conservatorship based on good cause showing of emergency (§ 1830)

### Limited Conservatorship (Developmental Disability)
- [ ] Regional center report and assessment included (§ 1860)
- [ ] Specific powers requested — only those necessary (§ 1860.5)
- [ ] Full conservatorship not imposed where limited conservatorship would suffice
- [ ] Conservatee's right to make decisions preserved in all non-specified areas

### Fiduciary Duties and Powers
- [ ] Conservator duties advisement (GC-335) filed with court (§ 2101)
- [ ] Bond posted in proper amount — value of estate plus anticipated annual income (§ 2320)
- [ ] Bond waived only by court order with documented justification
- [ ] No self-dealing transactions by conservator/PR (§ 2543)
- [ ] Court authorization obtained for transactions requiring prior approval (§ 2540)
- [ ] Real property sales at fair market value with independent appraisal (§ 2540)
- [ ] No commingling of estate funds with personal funds (§ 2101)

### Accountings
- [ ] First accounting filed within 1 year of appointment (§ 2401, Rule 7.1050)
- [ ] Subsequent accountings filed biennially or as ordered (§ 2400)
- [ ] Accounting includes receipts schedule with dates and sources (Rule 7.1052)
- [ ] Accounting includes disbursements schedule with dates and payees (Rule 7.1052)
- [ ] Accounting shows assets on hand with fair market values (Rule 7.1052)
- [ ] Supporting vouchers available for all disbursements (Rule 7.1060)
- [ ] All income to estate accounted for — interest, dividends, rent (Rule 7.1054)
- [ ] Conservator/PR compensation within statutory limits (§ 10580-10592)
- [ ] Attorney fees supported by time records and found reasonable by court

### Inventory and Appraisal
- [ ] Inventory and Appraisal filed within 90 days of appointment (§ 2610, § 8800)
- [ ] Probate referee appointed for assets requiring appraisal (§ 8902)
- [ ] All known assets listed — real property, personal property, accounts, insurance (§ 8801)
- [ ] Cash and cash equivalents valued at face value (§ 8901)
- [ ] Supplemental inventory filed for after-discovered assets (§ 8802)

### Court Investigator Reviews
- [ ] Biennial review conducted by court investigator (§ 1850)
- [ ] Investigator determined conservatorship continues to be necessary (§ 1850(a))
- [ ] Conservatee interviewed by investigator outside conservator's presence (§ 1851)
- [ ] Investigator assessed conservatee's living conditions and care (§ 1851)
- [ ] Report addresses whether current powers are appropriate or should be modified

### Due Process and Notice
- [ ] All required notices given to interested persons (§ 1460-1470)
- [ ] Proper service methods used — personal service, mail, posting (§ 1215-1265)
- [ ] Hearing continuances do not exceed statutory limits without good cause
- [ ] Conservatee's objections documented and addressed by the court
- [ ] Termination petition processed when conservatorship no longer necessary (§ 2680)
- [ ] Restoration of capacity adjudicated with supporting evidence (§ 2684)

### Probate Estate Administration
- [ ] Letters testamentary or letters of administration issued (§ 8400)
- [ ] Creditor notice published and mailed to known creditors (§ 9050)
- [ ] Creditor claims allowed or rejected within 30 days (§ 9250)
- [ ] Estate taxes assessed and paid where applicable
- [ ] Final distribution petition identifies all beneficiaries and their shares (§ 11640)
- [ ] Court order for final distribution entered before distribution (§ 11641)

## Output Protocol

| Field | Description |
|---|---|
| **Document ID** | Unique identifier for the audited document |
| **Document Type** | Petition / Accounting / Inventory / Court order / Investigator report / Trust document / Other |
| **Date Reviewed** | Date the audit was performed |
| **Case Number** | Probate or conservatorship case number |
| **Applicable Statute** | Specific Probate Code, WIC, or other section implicated |
| **Applicable Rule** | Specific Cal. Rules of Court or local rule implicated |
| **Finding** | Description of the irregularity, breach, or deficiency |
| **Severity** | CRITICAL / HIGH / MEDIUM / LOW |
| **Due Process Impact** | YES / NO — If yes, describe the liberty interest affected |
| **Financial Exposure** | Surcharge, liability, or fee disgorgement amount, if calculable |
| **Evidence** | Specific text, absence, timeline failure, or procedural gap constituting the finding |
| **Remediation** | Recommended corrective action — supplemental filing, objection, removal petition, or referral |
| **Deadline** | Statutory or rule-based deadline implicated |
| **Status** | OPEN / IN PROGRESS / REMEDIATED / OBJECTION FILED / REFERRED |

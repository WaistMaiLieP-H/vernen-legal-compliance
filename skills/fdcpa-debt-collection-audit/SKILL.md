---
name: fdcpa-debt-collection-audit
description: Passive audit layer that flags Fair Debt Collection Practices Act violations, California Rosenthal Act violations, and abusive/deceptive collection practices in collection letters, dunning notices, credit reporting disputes, and debt validation correspondence.
---

# FDCPA Debt Collection Audit

**Purpose**

Identifies violations of federal and California debt collection laws by auditing collection letters, dunning notices, validation requests, cease and desist correspondence, credit reporting disputes, and settlement offers against the FDCPA, Rosenthal Fair Debt Collection Practices Act, and CFPB Regulation F.

## Governing Standards

### Federal Statutes
- **15 USC § 1692** — Congressional findings and declaration of purpose (FDCPA)
- **15 USC § 1692a** — Definitions: debt collector, consumer, debt, communication, creditor
- **15 USC § 1692a(6)** — Debt collector: person who regularly collects debts owed to another
- **15 USC § 1692b** — Acquisition of location information (permissible contacts with third parties)
- **15 USC § 1692c** — Communication in connection with debt collection
- **15 USC § 1692c(a)** — Prohibited communication times (before 8 AM, after 9 PM, at workplace if known inconvenient)
- **15 USC § 1692c(b)** — Communication with third parties prohibited (except attorney, CRA, creditor, creditor's attorney)
- **15 USC § 1692c(c)** — Cease communication upon written request
- **15 USC § 1692d** — Harassment or abuse
- **15 USC § 1692d(1)** — Threats of violence or criminal means
- **15 USC § 1692d(2)** — Obscene or profane language
- **15 USC § 1692d(5)** — Causing telephone to ring repeatedly with intent to annoy
- **15 USC § 1692d(6)** — Failure to disclose identity in telephone communications
- **15 USC § 1692e** — False or misleading representations
- **15 USC § 1692e(2)** — False representation of character, amount, or legal status of debt
- **15 USC § 1692e(3)** — False representation as attorney or government representative
- **15 USC § 1692e(4)** — Representation that nonpayment will result in arrest or imprisonment
- **15 USC § 1692e(5)** — Threat to take action that cannot legally be taken or is not intended
- **15 USC § 1692e(9)** — Use of deceptive means to collect (simulated court documents)
- **15 USC § 1692e(10)** — False representation or deceptive means to collect
- **15 USC § 1692e(11)** — Failure to disclose communication is from debt collector (mini-Miranda)
- **15 USC § 1692e(14)** — Use of name other than true name of collector's business
- **15 USC § 1692f** — Unfair practices
- **15 USC § 1692f(1)** — Collection of unauthorized amounts (interest, fees, charges)
- **15 USC § 1692f(6)** — Taking or threatening nonjudicial action on exempt property
- **15 USC § 1692f(8)** — Using symbols on envelope indicating debt collection
- **15 USC § 1692g** — Validation of debts
- **15 USC § 1692g(a)** — Required validation notice within 5 days of initial communication
- **15 USC § 1692g(a)(1)-(5)** — Five required validation notice elements
- **15 USC § 1692g(b)** — Disputed debts: cease collection until verification provided
- **15 USC § 1692g(c)** — Admission of liability: validation notice not admission
- **15 USC § 1692h** — Multiple debts: payment application per consumer direction
- **15 USC § 1692i** — Legal actions by debt collectors (venue requirements)
- **15 USC § 1692i(a)(1)** — Venue for actions on real property: where property located
- **15 USC § 1692i(a)(2)** — Venue for other actions: where consumer signed contract or resides
- **15 USC § 1692j** — Furnishing deceptive forms
- **15 USC § 1692k** — Civil liability: actual damages, statutory damages ($1,000 individual / lesser of $500,000 or 1% of net worth class), attorney fees
- **15 USC § 1692l** — Administrative enforcement (CFPB primary, FTC supplemental)
- **15 USC § 1681 et seq** — Fair Credit Reporting Act (FCRA) — credit reporting intersection
- **15 USC § 1681s-2** — Furnisher responsibilities: accuracy, dispute investigation

### California Statutes
- **Cal. Civil Code § 1788 et seq** — Rosenthal Fair Debt Collection Practices Act
- **Cal. Civil Code § 1788.1** — Legislative findings (Rosenthal Act)
- **Cal. Civil Code § 1788.2** — Definitions (broader than FDCPA: includes original creditors)
- **Cal. Civil Code § 1788.10** — Harassment or abuse prohibitions
- **Cal. Civil Code § 1788.11** — Threats and coercion prohibitions
- **Cal. Civil Code § 1788.12** — Unfair or deceptive practices prohibitions
- **Cal. Civil Code § 1788.13** — False or misleading representations prohibitions
- **Cal. Civil Code § 1788.14** — Restrictions on communication with debtor's employer
- **Cal. Civil Code § 1788.15** — Restrictions on communication with third parties
- **Cal. Civil Code § 1788.17** — FDCPA provisions incorporated by reference (applies to original creditors too)
- **Cal. Civil Code § 1788.21** — Civil remedies: actual damages, statutory penalty, attorney fees, injunctive relief
- **Cal. Civil Code § 1788.30** — Individual civil action: actual damages plus $100-$1,000 statutory penalty
- **Cal. Civil Code § 1788.50** — Time-barred debt: written disclosure required before payment
- **Cal. Civil Code § 1788.52** — Written communication requirements for time-barred debt
- **Cal. Civil Code § 1788.58** — Identity theft: debt collector duties upon notice
- **Cal. Code Civ. Proc. § 337-340** — Statutes of limitations for common debt types
- **Cal. Code Civ. Proc. § 340.6** — Legal malpractice SOL (if applicable)
- **Cal. Code Civ. Proc. § 337(1)** — Written contract: 4-year SOL
- **Cal. Code Civ. Proc. § 339(1)** — Oral contract: 2-year SOL

### Regulatory
- **12 CFR Part 1006** — Regulation F (CFPB debt collection rule)
- **12 CFR § 1006.2** — Definitions under Regulation F
- **12 CFR § 1006.6** — Communications in connection with debt collection
- **12 CFR § 1006.6(b)** — Telephone call frequency: 7-in-7 rule (no more than 7 calls per debt in 7 days)
- **12 CFR § 1006.6(c)** — Place of communication restrictions
- **12 CFR § 1006.6(d)** — Time of communication restrictions (8 AM - 9 PM local time)
- **12 CFR § 1006.6(e)** — Opt-out requirements for electronic communications
- **12 CFR § 1006.14** — Harassing, oppressive, or abusive conduct
- **12 CFR § 1006.18** — False, deceptive, or misleading representations
- **12 CFR § 1006.22** — Unfair or unconscionable means
- **12 CFR § 1006.26** — Collection of time-barred debts
- **12 CFR § 1006.30** — Other prohibited practices
- **12 CFR § 1006.34** — Validation notices (model form, content, timing, delivery)
- **12 CFR § 1006.34(c)** — Required validation information (itemization date, amount breakdowns)
- **12 CFR § 1006.38** — Disputes and requests for original-creditor information
- **12 CFR § 1006.42** — Sending required disclosures electronically (E-SIGN compliance)
- **16 CFR Part 660** — FTC Furnisher Rule (accuracy and dispute obligations)

## Audit Triggers

- Initial collection letter or dunning notice
- Validation notice (written or electronic)
- Debt validation request from consumer
- Debt verification response from collector
- Cease and desist letter (consumer to collector)
- Cease communication acknowledgment from collector
- Settlement offer or payment plan proposal
- Collection lawsuit complaint or summons
- Credit report showing collection account
- Credit reporting dispute and investigation results
- Time-barred debt collection communication
- Telephone call log or recorded collection calls
- Skip tracing or location information requests
- Debt buyer purchase agreement or bill of sale
- Assignment or transfer of debt documentation
- Identity theft claim related to collected debt
- State licensing records for debt collector

## Audit Checklist

### Validation Notice Requirements (15 USC § 1692g / 12 CFR § 1006.34)

- [ ] Validation notice sent within 5 days of initial communication
- [ ] Notice includes amount of debt
- [ ] Notice includes name of creditor to whom debt is owed
- [ ] Notice includes statement that debt will be assumed valid if not disputed within 30 days
- [ ] Notice includes statement that verification will be obtained upon written dispute within 30 days
- [ ] Notice includes statement that name and address of original creditor will be provided upon written request within 30 days
- [ ] Regulation F itemization date provided (one of four permitted dates)
- [ ] Regulation F itemization of debt amount (principal, interest, fees, payments, credits)
- [ ] Regulation F model validation notice format followed (if used, safe harbor applies)
- [ ] Validation notice not overshadowed or contradicted by other language in communication
- [ ] Collection activity ceased upon receipt of written dispute until verification provided

### Mini-Miranda and Disclosure Requirements

- [ ] Initial communication states: "This is an attempt to collect a debt" and "any information obtained will be used for that purpose" (15 USC § 1692e(11))
- [ ] All subsequent communications include disclosure that communication is from a debt collector
- [ ] Collector identifies true name of business (§ 1692e(14))
- [ ] No false representation as attorney when not (§ 1692e(3))
- [ ] No false representation as government agent or official
- [ ] Meaningful attorney involvement if sending letters on attorney letterhead

### Communication Restrictions (15 USC § 1692c / 12 CFR § 1006.6)

- [ ] No calls before 8:00 AM or after 9:00 PM consumer's local time
- [ ] No calls to consumer at workplace if collector knows employer prohibits such calls
- [ ] No communication after consumer represented by attorney (if attorney known)
- [ ] No communication with third parties except for location information (one contact per person)
- [ ] Location information contacts: no disclosure that consumer owes a debt
- [ ] Regulation F: no more than 7 telephone calls per debt in 7-day period
- [ ] Regulation F: no call within 7 days of telephone conversation about same debt
- [ ] Electronic communications include opt-out mechanism
- [ ] Social media communications are private (not viewable by public or contacts)
- [ ] Communication ceased after written cease-and-desist received (except to notify of specific actions)

### Harassment and Abuse Prohibitions (15 USC § 1692d)

- [ ] No threats of violence or harm to person, property, or reputation
- [ ] No obscene or profane language
- [ ] No publication of shame lists (consumers who refuse to pay)
- [ ] No repeated or continuous telephone calls intended to annoy, abuse, or harass
- [ ] No calls without meaningful disclosure of caller's identity
- [ ] Caller identifies themselves and states purpose of call

### False or Misleading Representations (15 USC § 1692e)

- [ ] Amount of debt accurately stated (no unauthorized interest, fees, or charges)
- [ ] Legal status of debt accurately represented
- [ ] No false implication of attorney involvement
- [ ] No threat of lawsuit or legal action not actually intended or authorized
- [ ] No threat of arrest, imprisonment, or garnishment unless legally available
- [ ] No false representation of credit consequences
- [ ] No false implication that communication is from government
- [ ] No simulated legal documents or court papers
- [ ] No implication that sale or transfer of debt causes consumer to lose defenses

### Unfair Practices (15 USC § 1692f)

- [ ] No collection of amounts not authorized by agreement or law
- [ ] No postdated check solicitation for purpose of threatening criminal prosecution
- [ ] No deposit of postdated check before stated date
- [ ] No communication via postcard
- [ ] No language or symbols on envelope indicating debt collection (except collector's address)
- [ ] No threatened nonjudicial action on property not subject to such action
- [ ] Proper application of payments per consumer direction (§ 1692h)

### Time-Barred Debt (12 CFR § 1006.26 / Cal. Civil Code § 1788.50-52)

- [ ] Collector determined whether debt is beyond applicable statute of limitations
- [ ] No lawsuit or threat of lawsuit on time-barred debt
- [ ] California: written disclosure that debt is too old to sue on (§ 1788.52)
- [ ] California: disclosure that partial payment may restart the limitations period
- [ ] No misrepresentation that time-barred debt is legally enforceable
- [ ] Revival of debt by partial payment or acknowledgment properly tracked

### Credit Reporting Obligations (15 USC § 1681s-2)

- [ ] Information furnished to consumer reporting agencies is accurate
- [ ] Dispute investigated within 30 days of notice from CRA
- [ ] Results of investigation reported to CRA
- [ ] Inaccurate information corrected, updated, or deleted
- [ ] Consumer notified if dispute results in no change
- [ ] No reporting of debt during validation period if disputed
- [ ] Collection tradeline includes original creditor name and account number

### Venue and Legal Action Requirements (15 USC § 1692i)

- [ ] Lawsuit filed in judicial district where consumer signed contract or where consumer resides
- [ ] Real property actions filed where property is located
- [ ] No service of process in deceptive manner
- [ ] Complaint accurately states facts and amount owed

### California Rosenthal Act Specifics (Cal. Civil Code § 1788)

- [ ] Rosenthal Act applies to original creditors (broader than FDCPA)
- [ ] FDCPA provisions incorporated and applied to original creditors (§ 1788.17)
- [ ] No threats of criminal prosecution for consumer debt
- [ ] No communication with debtor's employer except for specific permitted purposes (§ 1788.14)
- [ ] Identity theft procedures followed upon consumer notice (§ 1788.58)
- [ ] State licensing requirements verified (if applicable)

## Output Protocol

Each finding must be recorded in the following format:

| Field | Value |
|---|---|
| **Finding ID** | FDCPA-YYYY-NNN |
| **Document Reviewed** | [filename / document title] |
| **Date of Document** | [date on document face] |
| **Audit Date** | [date audit performed] |
| **Statute Violated** | [specific USC section, CFR section, or Cal. Civil Code section] |
| **Violation Category** | Validation / Communication / Harassment / False Representation / Unfair Practice / Time-Barred / Credit Reporting / Venue |
| **Actor** | [debt collector name, original creditor, or debt buyer] |
| **Severity** | Critical / High / Medium / Low |
| **Finding Description** | [plain-language description of the violation] |
| **Evidence** | [quoted text from letter, call transcript, or absence noted] |
| **Legal Requirement** | [what the law requires] |
| **Actual Condition** | [what the communication shows or fails to show] |
| **Debt Amount** | [amount claimed vs. amount authorized] |
| **Statute of Limitations** | [applicable SOL, expiration date, time-barred status] |
| **Remediation** | [specific corrective action required] |
| **Damages Exposure** | [actual + statutory ($1,000 individual / class) + attorney fees] |
| **Cross-References** | [related findings, credit reports, or prior correspondence] |

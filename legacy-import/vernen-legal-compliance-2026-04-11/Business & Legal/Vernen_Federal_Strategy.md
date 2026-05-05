# Vernen Federal Strategy Memo

**Prepared:** 2026-04-07
**For:** Michael Hartmann, Founder & Steward, Vernen Legal Compliance
**Purpose:** Identify the federal funding and partnership opportunities that fit Vernen's actual capabilities, prioritize them by realistic odds and required effort, and document the equity / IP / autonomy guardrails that must be honored in any institutional relationship.

---

## TL;DR

1. **The fastest realistic federal funding path is NSF SBIR Phase I** ($275K, ~6 month application cycle, no ATO required, no FedRAMP required, no prior federal track record required).
2. **The biggest dollar federal grant Vernen plausibly fits is LSC Technology Initiative Grant (TIG)** (up to $500K, civil legal services focus, fits Vernen's compliance audit story).
3. **The single biggest blocker today is the lack of a legal entity.** Form an LLC this week. Cost: ~$170 + $800/year California minimum franchise tax. See `Vernen_LLC_Formation_California_Quickstart.md`.
4. **Hard equity guardrails for any Anthropic / institutional deal:** never accept >49% equity, never assign IP, never give up SBIR small-business eligibility. These rules exist to keep the federal funding doors open.
5. **None of the federal opportunities below require Vernen to be authorized (ATO'd) or to have FedRAMP status.** Those are for federal contract sales, not for grants and SBIR. Don't conflate them.

---

## 1. Tier 1 — Best Fit, Move on These First

### 1.1 NSF SBIR Phase I — AI / Trustworthy Computing Topics

**What it is:** The Small Business Innovation Research (SBIR) program is the largest source of early-stage federal funding for small US technology businesses. NSF runs an SBIR program with multiple topic categories. The relevant ones for Vernen are typically grouped under **"Artificial Intelligence and Machine Learning"** and **"Trustworthy Computing / Cybersecurity."**

**Award amount:** **$275,000 for Phase I** (12 months, no cost share required). If Phase I succeeds, Phase II is up to **$1,000,000+** (24 months) and Phase III brings the total potential to multi-million-dollar federal contracts.

**Application timing:**
- NSF SBIR Phase I has multiple "windows" per year — typically March, June, September, December deadlines (varies by exact topic).
- The next cycle for Vernen-relevant topics is most likely **mid-to-late 2026**.
- A typical proposal takes 3–6 weeks of focused effort to write from scratch. With the SSP draft and Layer 7+8 documentation already in hand, Vernen could prepare a strong proposal in **1–2 weeks of focused work**.

**Eligibility:**
- Must be a **US small business** (≤500 employees, US-based, **majority-owned by US individuals or other US small businesses**)
- **CRITICAL:** if Anthropic (or any other entity) ever owns >49% of Vernen, **SBIR eligibility is gone**. This is THE rule that determines whether the equity guardrails matter.
- The PI (principal investigator) must be primarily employed by the small business at the time of award.
- Must have a SAM.gov registration (which requires the legal entity).

**Why Vernen fits:**
- The NSF AI topic descriptions explicitly call for "trustworthy AI infrastructure," "verifiable AI systems," and "AI accountability mechanisms." Vernen's verification protocol IS that.
- Vernen has working production code, a public protocol repository, blind evaluation results, and an SSP draft mapped to NIST 800-53. This is dramatically more than the typical SBIR Phase I applicant brings.
- The "plumber built it by talking to Claude" origin story plays well with NSF's commitment to broadening participation in research.

**Realistic odds:** Better than baseline. NSF SBIR Phase I has roughly a 15-20% acceptance rate generally, but well-prepared proposals with working implementations and credible technical depth do significantly better. Vernen brings unusual depth for a Phase I applicant.

**What needs to be ready before submitting:**
- ✅ Working code (have it)
- ✅ Public protocol documentation (have it)
- ✅ NIST 800-53 mapping (have the SSP draft)
- ❌ **Legal entity** — blocking (form LLC first)
- ❌ **SAM.gov registration** — blocking (requires legal entity first)
- ❌ Letter(s) of support from prospective customers or partners — easy to get if Anthropic relationship develops, or from any law firm that's used the forensic audit
- ❌ Specific NSF topic alignment narrative — write during proposal prep
- ❌ Commercialization plan — write during proposal prep
- ❌ Budget narrative ($275K broken into salaries, fringe, equipment, travel, indirect costs) — write during proposal prep

**Estimated total prep time once legal entity is formed:** **2-3 weeks of focused work** to produce a submitted proposal.

---

### 1.2 Legal Services Corporation (LSC) Technology Initiative Grant (TIG)

**What it is:** LSC is the largest federal funder of civil legal aid in the US. The Technology Initiative Grant (TIG) program funds "innovative use of technology to improve the delivery and quality of legal services to low-income people."

**Award amount:** **Typically $50,000 to $500,000.** The largest awards go to multi-organization collaborations or established legal aid organizations. A solo applicant is more likely to land in the $100K-$250K range.

**Application timing:**
- Annual cycle. Letter of Intent typically due in late spring (May/June). Full proposal due late summer (August). Awards announced fall.
- **2026 cycle is most likely closed.** Plan for **2027 cycle** — Letter of Intent around May 2027.
- This means you have **months to prepare**, which is good — TIG proposals are detailed (15-25 pages) and benefit from a mature project.

**Eligibility:**
- Applicants must be a 501(c)(3) nonprofit OR a recipient of LSC funding OR a partner organization working with one.
- **This is a complication for Vernen** because it's currently structured as a stewardship enterprise with no formal entity, and even after LLC formation it would not be a 501(c)(3).
- **Workaround:** apply as a partner with an existing LSC grantee (e.g., Bay Area Legal Aid, East Bay Community Law Center, BayLegal). Vernen provides the technology; the legal aid org is the lead applicant. Your project memory already mentions BayLegal as a possible partnership target — that's the right connection to develop.

**Why Vernen fits:**
- TIG explicitly funds "tools that automate document analysis, intake processing, and compliance review for legal aid clients." Vernen's Layer 7 forensic audit pipeline is exactly that, but for the harder version of the problem.
- The Vernen story (a pro se litigant building tools to detect the kinds of fraud that hurt his own family) plays directly to TIG's mission.

**Realistic odds:** Moderate-to-good if you partner with an established LSC grantee. Solo, you're not eligible.

**What needs to be ready:**
- ❌ **Partnership with an LSC grantee** — biggest unblock; requires direct outreach to BayLegal or similar
- ❌ Letter of intent narrative
- ❌ Demonstration of working technology with low-income legal aid use case (you have this — the case folders in your FamilyLaw / NonFamilyLaw directories are exactly the use case)

**Estimated total prep time:** Months, including the partnership development. Start by emailing BayLegal in May 2026 about a partnership for the 2027 TIG cycle.

---

## 2. Tier 2 — Realistic Stretch, Worth Knowing About

### 2.1 NIST Cooperative Agreements / Direct Awards

**What it is:** NIST funds external research through several mechanisms — cooperative agreements under the Manufacturing USA program, the AI Safety Institute Consortium (CAISI), grants under the Measurement Science and Engineering programs, and various special initiatives.

**Award amount:** Highly variable — from $50K research contracts to multi-million-dollar consortium-level cooperative agreements.

**Why Vernen fits:**
- NIST AI Safety Institute Consortium is currently restructured as CAISI but the core function remains: bringing external organizations into NIST's AI measurement work.
- Vernen's verification protocol is, structurally, AI measurement infrastructure. It directly maps to what CAISI is supposed to develop.
- The SSP draft you have today, mapped to NIST 800-53, is exactly the kind of artifact NIST evaluators would want to see.

**Eligibility / blocker:**
- Most NIST cooperative agreements require a CRADA (Cooperative Research and Development Agreement). CRADAs require a legal entity.
- AISIC application window is currently closed; expected to reopen but timing is uncertain.

**Action:** Send the AISIC inquiry email (already drafted in the Chrome agent briefing). Subscribe to the NIST AI mailing list for application window announcements. Position Vernen as a willing contributor when the window opens.

### 2.2 Department of Justice (DOJ) Office of Justice Programs

**What it is:** DOJ funds civil rights enforcement, victim services, and legal technology through several offices — Office for Victims of Crime (OVC), Office of Justice Programs (OJP), Office on Violence Against Women (OVW), Civil Rights Division.

**Award amount:** Typically $100K-$500K for technology grants.

**Why Vernen fits:**
- Vernen's case-pattern detection and forensic audit capabilities match what DOJ funds for "improving access to civil legal remedies" and "detecting fraud patterns affecting vulnerable populations."
- The detailed family law / non-family law case material in your project memory is, in fact, exactly the kind of evidence base a DOJ-funded researcher would build a study around.

**Eligibility:**
- Same general structure as other federal grants — legal entity, SAM.gov, sometimes 501(c)(3) preference.
- Most relevant programs cycle annually, with deadlines varying by office.

**Action:** Lower priority than SBIR / TIG. Revisit after legal entity is formed and after Vernen has any peer-reviewed credibility.

### 2.3 NSF Convergence Accelerator

**What it is:** NSF Convergence Accelerator funds multi-disciplinary research with a 9-month "Phase I" planning grant ($750K) followed by a 24-month "Phase II" ($5M). Recent tracks include "Trustworthy AI" and "Equitable Access to Justice."

**Award amount:** $750K Phase I, $5M Phase II.

**Why Vernen fits:** The "Equitable Access to Justice" track is an obvious fit. Vernen could be a core technology partner in a multi-organization team.

**Blocker:** Convergence Accelerator awards go to teams (typically led by a university). Vernen would need to join an existing university-led team, not lead its own application. Possible candidates: Stanford CRFM, Berkeley CLTC, MIT CSAIL, USC GAP.

**Action:** Long-term play. Cultivate academic relationships. Not actionable in the next month.

---

## 3. Tier 3 — Long Shots Worth Knowing About

| Program | Amount | Why It Matters | Why It's Hard |
|---|---|---|---|
| **NIH SBIR (NIA / NIMH AI safety topics)** | $275K-$1M | Same SBIR structure as NSF; healthcare-AI angle | Vernen doesn't have a clear healthcare angle |
| **DOD STTR (cybersecurity / verifiable AI)** | $250K-$1M | Verification protocol fits "trustworthy AI for defense applications" | Defense work means classification, ITAR, security clearances — incompatible with public CC0 protocol |
| **DARPA AI Cyber Challenge** | $1M-$10M+ | Verification protocol could fit "automated cyber reasoning" | Highly competitive; teams are usually well-funded with multiple PhDs |
| **Department of Energy ARPA-E** | $250K-$5M | Verification protocol could apply to grid security audit | No direct fit; energy is a different vertical |
| **Knight Foundation (not federal)** | $50K-$1M | Civic tech focus; legal technology fits | Not federal but adjacent in dollar/effort profile |
| **Mozilla Foundation** | $25K-$250K | "Trustworthy AI" is an explicit Mozilla focus area | Smaller dollar amounts but easier process |

---

## 4. The Equity Guardrails — Hard Rules That Cannot Be Crossed

These rules exist because they protect the entire federal funding pipeline above. Crossing any of them kills opportunities that are worth orders of magnitude more than the equity stake being offered.

### Rule 1: Never accept equity above 49%

If any single outside party owns more than 49% of Vernen, **SBIR eligibility is destroyed**. The SBA's small business size standards require majority ownership by US individuals or other US small businesses. A single non-individual owner above 49% disqualifies you from every SBIR program at every federal agency, forever, until ownership shifts back below the threshold.

**Acceptable:** Anthropic equity stake of 5%, 10%, 20%. Any number that leaves you with >51% ownership.
**Unacceptable:** Anthropic equity stake of 50%, 51%, anything that puts a single outside party above 49%.

**Soft target:** Keep any single outside investor below 20%. This leaves room for additional investors / partners later without crossing the 49% line.

### Rule 2: Never assign IP to any outside party

The verification protocol code is published under CC0 in the public protocol repository. **That public license must remain.** Any deal that requires Vernen to assign exclusive IP rights to an outside party would:
- Violate the existing CC0 license (legally complicated; the public version cannot be retroactively un-published)
- Make the project ineligible for federal grants that fund "open research" (most NSF grants)
- Destroy the credibility story that Vernen is a public-good infrastructure project

**Acceptable:** Joint development of new modules with shared rights. Co-authoring papers. Co-branding.
**Unacceptable:** "Vernen assigns all rights to Anthropic in exchange for X." Any exclusive IP grant.

### Rule 3: Never give up operational control or board majority

The whole point of pursuing federal grants and SBIR is that Vernen continues to be steered by Michael's vision and judgment. A board majority controlled by outside parties — even friendly ones — means strategic direction can be overridden. SBIR specifically cares about this: the Principal Investigator must be primarily employed by the small business and must have actual authority over the work.

**Acceptable:** Advisory board members from Anthropic / partners, with no voting power.
**Acceptable:** A single board observer seat for a major investor.
**Unacceptable:** A board where outside parties hold majority votes.
**Unacceptable:** Any "consent rights" giving outside parties veto power over strategic decisions.

### Rule 4: Never sign anything that prevents Vernen from pursuing federal grants or contracts

Some institutional investment terms include language like "the company will not pursue government contracts" or "all government work must be approved by the board" or "the company will not enter into IP-restrictive arrangements." **Reject all such language.** Federal funding is the core path to scale; any term that obstructs it is a deal-killer.

### Rule 5: Get every deal reviewed by an attorney before signing

Even a "friendly" term sheet can contain language with consequences the founder doesn't immediately see. **Before signing anything that takes equity, assigns IP, or creates ongoing obligations, get a startup-experienced California attorney to review it.** The cost of a 1-hour review is small compared to the cost of missing a hidden term. Contra Costa County Bar Association Lawyer Referral Service charges ~$40 for a 30-minute consult — that's enough to flag the obvious red flags. For substantive review of an actual term sheet, expect $300-$1,000 of attorney time, which is cheap insurance.

---

## 5. The Sequencing — What to Do in What Order

This is the realistic priority order, given the current state of Vernen and the need to preserve federal eligibility.

### Week 1 (this week)
1. **Form the California single-member LLC.** See `Vernen_LLC_Formation_California_Quickstart.md`. Cost: ~$170 + $800/year. Effort: one afternoon.
2. **Apply for an EIN from the IRS.** Cost: free. Effort: 10 minutes online, but only after the LLC is formed.

### Week 2
3. **Register Vernen on SAM.gov.** Cost: free. Effort: 1-3 hours of forms. Requires the EIN. Without SAM.gov, every federal opportunity is blocked.
4. **Open a business bank account.** Cost: depends on bank ($0-$25/month). Effort: 30 minutes at a branch. Requires the EIN.
5. **Send the Anthropic pitch.** This was already drafted and updated. Now you can sign it from `michael@vernenlegal.com` and reference Vernen as a real legal entity.

### Weeks 3-4
6. **Send the AISIC inquiry email** to `aiconsortium@nist.gov`. (Already drafted in the Chrome agent briefing.)
7. **Subscribe to the NIST AI mailing list** for AISIC application window announcements.
8. **Subscribe to NSF SBIR / STTR notifications** for Vernen-relevant topics.
9. **Identify the next NSF SBIR submission window** for AI / trustworthy computing topics. Mark it on the calendar.

### Months 2-3
10. **Begin drafting the NSF SBIR Phase I proposal.** Use the SSP draft, the Layer 7 + 8 documentation, the blind eval results, and the public verification log as the technical core. Write the commercialization plan and budget narrative. Allow 2-3 weeks of focused work.
11. **Reach out to BayLegal / East Bay Community Law Center** about a potential partnership for the 2027 LSC TIG cycle.
12. **Reach out to one academic institution** (Stanford CRFM, Berkeley CLTC, MIT CSAIL) about a potential collaboration on a future NSF Convergence Accelerator track.

### Months 4-6
13. **Submit NSF SBIR Phase I proposal** when the next window opens.
14. **Maintain federation peer activation.** Recruit a third-party peer (academic or partner) to address Gap FE-01 in the SSP.

### Month 6+
15. **Wait for federal review cycles.** SBIR Phase I decisions take 3-6 months. LSC TIG full cycle takes ~6 months. Don't put all eggs in one basket; pursue multiple in parallel.

---

## 6. What to Tell Anthropic

When the Anthropic conversation happens, frame Vernen using the language they actually respond to. Avoid pitching a "company we want to invest in" — instead pitch a **"public-good infrastructure project that aligns with Anthropic's stated mission and could benefit from a structured collaboration."**

Specific things to mention:
- Vernen is structured as an independent stewardship enterprise with the legal entity formed (use the LLC as the "real" reference point)
- The verification protocol is published under CC0 in the public protocol repository
- The protocol maps directly to NIST SP 800-53 Rev. 5 controls — see the SSP draft
- The Layer 6 Conscientious Identity Framework is built on Anthropic's HHH ethics framework — that's not a marketing line, it's literally cited in the source code
- Layer 8 Federation has its first operational cross-witness and is publicly verifiable
- Vernen is pursuing federal grant funding as an independent small business and intends to continue doing so

What to ask for, in priority order:
1. **A conversation with Anthropic's policy team about the NIST AI RMF mapping and how Vernen fits the AISIC contributor profile.** This is the lowest-cost ask and the highest-value relationship.
2. **A research collaboration / co-authoring opportunity** on a paper about verifiable AI infrastructure. This builds credibility and creates a citable artifact.
3. **An Anthology Fund equity investment** at a small stake (≤20%), if Anthropic offers it. Reject if the terms violate the equity guardrails above.

What NOT to ask for:
- Money as the primary ask (Vernen doesn't need cash to keep working; cash is gravy)
- Anthropic to take majority ownership or full IP rights
- Anything that would lock Michael into 50-hour-week employment
- Anything that would prevent Vernen from pursuing federal grants

---

## 7. What This Strategy is NOT

To be clear about scope:

- **This is not a guarantee of any federal funding.** SBIR Phase I has a ~15-20% baseline acceptance rate. LSC TIG is competitive. Anything could fall through.
- **This is not a complete federal funding landscape.** There are many other programs not listed here. The above are the ones that fit Vernen's actual capabilities and don't require pre-existing federal track record.
- **This is not legal or financial advice.** Any actual entity formation, equity negotiation, or grant application should be reviewed by a licensed attorney and (for the budget side) an accountant.
- **This is not a substitute for the Vernen SSP draft, the Anthropic pitch, or the Chrome agent briefing.** It's complementary to them — those documents address the technical and tactical layers; this one addresses the strategic / financial layer.

---

## 8. The One Thing That Matters Most

**Form the LLC.** Everything else in this document is gated on it. SBIR requires it. SAM.gov requires it. CRADA requires it. Even the Anthropic conversation goes better with it — "I'm the founder of Vernen Legal Compliance LLC, a California small business" lands different than "I'm building this thing called Vernen as a stewardship project."

The legal entity is the smallest, cheapest, fastest unblock available. It costs ~$170 to form and $800/year to maintain. It takes one afternoon. It removes the single biggest blocker on every federal track simultaneously.

**See the companion document:** `Vernen_LLC_Formation_California_Quickstart.md`.

---

**End of Federal Strategy Memo.**

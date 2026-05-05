# Vernen Federal Grant Landscape — 2026 Q2

Prepared: 2026-04-07
Prepared for: Michael Hartmann, Vernen Legal Compliance
Scope: Federal (and one near-federal) non-dilutive funding opportunities that match Vernen's actual profile — solo operator, pre-LLC, pre-revenue, production AI verification platform with open-source protocol, NIST SP 800-53 / AI RMF mapping, no clearances, no FedRAMP.

---

## Executive Summary

- **Biggest real shot right now is DARPA I2O CLARA** — verifiable / formal-methods AI, up to $2M per award, full proposal due April 10, 2026. Eligibility is open to US businesses of any size. Timing is brutal (three days from today) but Vernen's Layer 1-8 architecture maps cleanly to the stated problem. See Tier 1.
- **NSF SBIR Phase I is the natural home** but is currently paused pending reauthorization signature. House passed S. 3971 on March 17, 2026. Expect Project Pitch intake to resume within weeks; Vernen should have Project Pitch draft ready the day the window reopens. Phase I awards ~$275K, decision in ~3 months.
- **NIST SBIR Phase I is the highest-fit agency** for what Vernen actually does (AI measurement, evaluation, benchmarking). Awards ~$100K Phase I / up to $400K Phase II. AI measurement is explicitly funded for FY2026.
- **LSC Technology Initiative Grant is INELIGIBLE** — TIG only funds existing LSC Basic Field grantees. Vernen is not one. Remove from active list; pursue via BayLegal partnership instead (already flagged in project_grant_strategy.md).
- **CISA small-business grants do not exist.** SLCGP is state/local only. Stop chasing this pathway.
- **NIST CAISI Consortium (formerly AISIC)** is a CRADA, not a grant — no money flows to participants, but it is the single most strategically aligned affiliation for Vernen and accepts rolling applications. Join regardless of funding outcome.

---

## Tier 1 — Best Fit, Apply When Possible

### 1. DARPA I2O — CLARA (Compositional Learning-And-Reasoning for AI)
- **Agency / Office:** DARPA, Information Innovation Office (I2O)
- **Award:** Up to $2,000,000 per award
- **Deadline:** Full proposals due **April 10, 2026** (three days from today as of this memo)
- **Eligibility:** Open to US businesses of any size; no clearance stated as prerequisite at proposal stage
- **Fit analysis:** CLARA funds work that "integrates algorithmic reasoning with machine learning into systems that are demonstrably trustworthy, not just empirically good" — this is almost a literal description of Vernen's eight-layer verification protocol. The program explicitly calls out ML systems that "cannot explain their reasoning, fail unpredictably in edge cases, and resist formal verification." Vernen's hash chain + Merkle + GitHub anchor + cross-model consensus + conscientious identity stack is a direct answer to "resist formal verification."
- **What Vernen would need to gather:** (a) LLC formation (or partner with a formed entity as sub), (b) SAM.gov UEI + SBA company registry entry — but DARPA BAA does not strictly require SBIR-style SAM before proposal, confirm in solicitation, (c) technical volume pulling from existing VERIFIABILITY_ARCHITECTURE.md and Layer 1-8 code in public repo, (d) commercialization / transition plan, (e) budget & budget narrative.
- **Reality check:** Three-day turnaround is aggressive for a solo operator with no proposal history. Recommend: pull the BAA text today, assess whether a compliant 10-15 page technical volume can be assembled from existing artifacts, and if not, redirect to the broader **I2O Office-Wide BAA HR001126S0001** which has abstracts due November 1, 2026 and full proposals November 30, 2026 — same thrust area ("Resilient, Adaptable, and Secure Software and Complex Systems, including formal methods").
- **Confidence:** HIGH (program details and April 10 deadline verified)

### 2. DARPA I2O Office-Wide BAA (HR001126S0001)
- **Agency / Office:** DARPA I2O
- **Award:** Typically $500K – $5M per award depending on scope
- **Deadline:** Abstracts due **November 1, 2026**; full proposals **November 30, 2026**
- **Eligibility:** Open to US businesses of any size; US entity required
- **Fit analysis:** The BAA has an explicit thrust area for "formal methods and next-generation approaches to eliminate software vulnerabilities at scale." Vernen's Layer 7 structural forensic analysis modules and Layer 8 federation map here. An abstract first lets Vernen test interest without burning a month on a full proposal.
- **What Vernen would need to gather:** LLC formed, SAM.gov UEI active, a 5-10 page abstract, identification of a specific I2O program manager whose interests align. Strongly recommend getting an abstract to a PM informally before November.
- **Confidence:** HIGH

### 3. NSF SBIR Phase I — Artificial Intelligence topic
- **Agency:** NSF, Directorate for Technology, Innovation and Partnerships (TIP)
- **Award:** ~$275K (Phase I typical), 6-12 months; Phase II up to $1M+
- **Deadline:** Rolling Project Pitch → full proposal upon invitation. Currently **paused** pending SBIR reauthorization enactment (S. 3971 passed House March 17, 2026, awaiting President signature / full enactment). Expected reopening: Q2 2026. Prior-cycle full-proposal deadlines were twice yearly; once reopened, NSF commits to ~3-week Project Pitch review turnaround.
- **Eligibility:** US for-profit, <500 employees, >50% US-citizen owned/controlled, LLC qualifies. SAM.gov + SBA company registry required before submitting full proposal.
- **Fit analysis:** NSF's SBIR AI topic description explicitly targets "AI-based hardware" and "learning-based systems in production." Vernen is a production learning-adjacent system. Project Pitch format (3-page) is achievable by a solo operator. Decision-to-Phase-I is among the fastest in the federal system.
- **What Vernen would need to gather:** (a) LLC formed, (b) SAM.gov UEI, (c) SBA company registry + SBC Control ID, (d) 3-page Project Pitch covering: the innovation, technical merit, broader impact, commercial potential, (e) list of prior funding (none, which is fine).
- **Recommended action:** Draft the Project Pitch now, sitting in a local file, so it can be submitted within 24 hours of the program reopening.
- **Confidence:** HIGH (program structure), MEDIUM (2026 reopening date)

### 4. NIST SBIR Phase I
- **Agency:** NIST (Department of Commerce)
- **Award:** ~$100,000 Phase I (6 months); up to $400,000 Phase II (24 months)
- **Deadline:** NIST SBIR annually; FY25 solicitation (2025-NIST-SBIR-01) is the most recent cycle. FY26 solicitation expected to open mid-2026. MEDIUM confidence on exact date.
- **Eligibility:** Same as NSF SBIR — US for-profit, <500 employees, >50% US-citizen owned.
- **Fit analysis:** Of all federal SBIR programs, **NIST is the single strongest substantive fit.** NIST is the agency that actually owns SP 800-53 and the AI RMF — the two frameworks Vernen has already self-mapped against. Congress allocated ≥$55M specifically to NIST AI measurement science for FY2026. NIST SBIR recently awarded $3.19M to small businesses doing AI, measurement, and safety work. "Model robustness testing, bias auditing, hallucination detection, or safety evaluation" is explicitly called out by NIST-tracking commentary as the target profile.
- **What Vernen would need to gather:** Same SAM/SBC prerequisites as NSF, plus a topic-matched proposal once FY26 topics are published.
- **Confidence:** HIGH (NIST appetite), MEDIUM (exact FY26 deadline)

---

## Tier 2 — Realistic Stretch

### 5. NIST CAISI Consortium (Center for AI Standards and Innovation, formerly AISIC)
- **Agency:** NIST CAISI
- **Award:** $0. This is a Cooperative Research and Development Agreement (CRADA), not a grant. No money to participant. Strategic affiliation only.
- **Deadline:** Rolling. CAISI is actively soliciting partners. April 2026 sector workshops (healthcare, finance, education) had extended submission deadline March 31, 2026 — missed. Future calls will follow.
- **Eligibility:** Any organization that can contribute expertise, products, data, or models. No revenue or size requirement.
- **Fit analysis:** Vernen is measurement-first, attestation-first, open-source — this is exactly the type of contributor CAISI wants. Consortium membership is table-stakes credibility for everything else on this list; multiple other federal opportunities favor CAISI members.
- **What Vernen would need to gather:** Statement of contribution (what Vernen brings to the consortium), willingness to execute NIST CRADA template, legal entity to sign the CRADA.
- **Confidence:** HIGH (pathway exists), **UNDETERMINED** on whether CAISI will accept a single-operator pre-LLC entity — this is the open question. Recommend direct email inquiry to CAISI before LLC is formed to confirm.

### 6. DOE SBIR Phase I — Advanced Computing / Cybersecurity topics
- **Agency:** DOE Office of Science + applied offices
- **Award:** Typically ~$250K Phase I
- **Deadline:** DOE FY26 SBIR solicitation expected to open late April or May 2026. Topics published ~1 month before FOA; 2-page LOI ~3 weeks after topics; full proposals ~4 months after FOA release.
- **Eligibility:** Standard SBIR — for-profit, <500 employees, US-owned.
- **Fit analysis:** Medium. DOE historically funds advanced computing and grid-adjacent cybersecurity. Vernen's verification protocol could map to "secure software supply chain" or "AI for critical infrastructure monitoring" if topics land there. Historically DOE topics have been more energy-adjacent than pure AI safety, so fit depends heavily on specific topics when published.
- **What Vernen would need to gather:** Same SBIR prerequisites; wait for topic list; only pursue if a topic directly matches.
- **Confidence:** MEDIUM

### 7. NIH SBIR (NLM or relevant institute)
- **Agency:** NIH (National Library of Medicine is the most likely fit)
- **Award:** Phase I typically $150K-$300K
- **Deadline:** Next NOFO cycle expected March-April 2026. MEDIUM confidence on specific dates.
- **Eligibility:** Standard SBIR.
- **Fit analysis:** Weak-to-medium. NIH pays for AI only when tied to biomedical outcomes. Vernen would need to reframe verification protocol as applied to clinical decision support, medical record integrity, or biomedical AI safety — genuine angle but not the main business. Only pursue if Vernen builds a healthcare-specific line (e.g., clinical documentation verification, HIPAA audit automation).
- **What Vernen would need to gather:** Identified NIH institute + program officer conversation; biomedical use case; human-subjects exempt determination.
- **Confidence:** MEDIUM

### 8. DOJ / Office of Justice Programs — technology / fraud detection grants
- **Agency:** DOJ OJP / NIJ (National Institute of Justice)
- **Award:** Varies widely; NIJ research grants typically $250K-$750K
- **Deadline:** Varies by solicitation; FY25 JAG cycles had April/May 2026 deadlines. Need to check DOJ Grants Program Plan for specific FY26 solicitations.
- **Eligibility:** NIJ research grants accept for-profit small businesses for certain research solicitations. Most OJP formula grants are state/local only.
- **Fit analysis:** Real but narrow. NIJ occasionally funds research on digital evidence integrity, forensic AI, and document authentication — all topics where Vernen has working technology. The Christina Cerretani / 16-year family law documentation audit is a literal case study of what this technology does. Pursue NIJ research solicitations specifically, not OJP formula grants.
- **What Vernen would need to gather:** Identify specific NIJ solicitation; draft research plan; SAM.gov registration; letters of collaboration (court self-help centers, legal aid partners).
- **Confidence:** MEDIUM (pathway exists), LOW (specific FY26 solicitation match)

### 9. Anthology Fund (Anthropic + Menlo Ventures)
- **Agency / Type:** Private VC (NOT a federal grant — included because it's non-dilutive-ish and uniquely aligned)
- **Award:** Investments start at $100K; plus $25K Claude API credits via Anthropic Startup Program
- **Deadline:** Rolling
- **Eligibility:** Startups building with Anthropic technology. LLC preferred but not strictly required.
- **Fit analysis:** This is literally the fund. Anthology explicitly targets "trust and safety tooling" and "legal" as focus areas. Vernen built the entire platform by talking to Claude — the origin story is the pitch. However: it is dilutive equity investment, not a grant. Michael's stewardship-not-ownership model may create friction with standard VC term sheets. Recommend using Anthropic Startup Program ($25K credits) as the near-term path and treating Anthology as an exploratory conversation, not a funding target.
- **What Vernen would need to gather:** Pitch deck, demo of compliance.vernenlegal.com, origin story narrative, LLC formed.
- **Confidence:** HIGH (program exists, exact fit), but dilutive

---

## Tier 3 — Long Shot But Worth Knowing

### 10. DOD SBIR — Army AI/ML Open Topic (data validation & verification sub-field)
- **Award:** Phase I up to $250K (6 months); Direct-to-Phase-II up to $2M (24 months)
- **Eligibility:** Standard SBIR. Security clearance is NOT required at the Phase I open-topic stage for most topics, but later phases and transition to Army programs of record typically require Facility Clearance.
- **Fit analysis:** The Army AI/ML Open Topic explicitly lists "data validation and verification in a contested environment" as an accepted sub-field. Vernen's verification stack is a literal match. Concerns: (a) DOD prime/transition pathway assumes eventual clearance which Vernen currently lacks; (b) solo operator at DOD is unusual and raises due-diligence friction; (c) DOD SBIR reauthorization environment includes new foreign screening rules per 2026 reauthorization.
- **Recommendation:** Worth a Phase I application if a topic cycle opens where Vernen can submit without committing to clearance acquisition. Do not build a company strategy around DOD.
- **Confidence:** MEDIUM

### 11. NSF Convergence Accelerator
- **Award:** Phase 1 typically ~$750K; Phase 2 up to $5M
- **Deadline:** 2026 cohort solicitation details not verifiable as of today. Historical pattern: annual solicitation naming specific tracks. 2025 cohort solicitation was NSF 23-590 (recycled). **UNDETERMINED** whether a 2026 solicitation has been released or whether the program is affected by the NSF SBIR reauthorization pause.
- **Eligibility:** Multi-disciplinary teams; typically led by a university PI but small businesses can be core team members.
- **Fit analysis:** Strong thematic fit if a track on AI safety / trustworthy AI / civic technology appears. Weak structural fit because Convergence Accelerator heavily favors university-led consortia — Vernen as a solo operator would need a university partner (BayLegal + UC Berkeley or Stanford HAI are natural candidates).
- **What Vernen would need to gather:** University PI partner, consortium letter, detailed phase-gated plan.
- **Confidence:** LOW (program status for 2026 undetermined)

### 12. Federal Prize Competitions / Presidential AI Challenge
- **Deadline:** Challenge.gov sunset March 30, 2026. Federal prize competitions now routed through USA.gov Innovation section. The 2026 Presidential AI Challenge registration is closed.
- **Fit analysis:** Prize competitions are episodic. No current competition directly targets AI verification or provenance attestation as of today. Monitor monthly.
- **Confidence:** LOW

---

## Ineligible — Do Not Pursue Directly

### Legal Services Corporation Technology Initiative Grant (TIG) — INELIGIBLE
- TIG eligibility is restricted to current LSC Basic Field grantees (Basic Field-General, Basic Field-Migrant, or Basic Field-Native American). Vernen is not an LSC grantee and cannot become one (LSC Basic Field funds legal services programs, not technology vendors). FY2026 available funding: $4.75M; pre-applications due April 10, 2026; full applications due June 30, 2026 — none of which Vernen can apply for directly.
- **Pathway:** Partner with an existing LSC grantee (BayLegal is the target already in project_grant_strategy.md). The LSC grantee applies; Vernen is the technology contractor/sub.
- **Confidence:** HIGH (eligibility rule verified)

### CISA State and Local Cybersecurity Grant Program (SLCGP) — INELIGIBLE
- Only State Administrative Agencies (SAAs) for states and territories can apply. Local, tribal, and Vernen-as-vendor cannot apply directly. No small-business CISA grant stream exists.
- **Pathway:** Become a vendor to a state recipient. Requires separate procurement path, not grant path.

### DOD SBIR topics requiring active security clearance at proposal — INELIGIBLE (currently)
- Any DOD topic that conditions Phase I on personnel or facility clearance is inaccessible to Vernen today.

---

## Eligibility Blockers Currently Affecting Vernen

| Blocker | Status | Time to Resolve | Blocks |
|---|---|---|---|
| Legal entity (CA LLC) | In progress, ~2 weeks | ~2 weeks | All SBIR, BAA, CRADA |
| EIN from IRS | Pending LLC | 1 day after LLC | SAM.gov |
| SAM.gov UEI | Pending EIN | 3-4 weeks after EIN | All federal funding |
| SBA Company Registry + SBC Control ID | Pending SAM | 1 day after SAM active | All SBIR |
| NAICS codes selected | Not done | 1 hour | SAM.gov registration |
| Bank account + routing (for EFT) | Pending LLC | 1 week after LLC | SAM.gov |
| DUNS legacy number | N/A — UEI replaces DUNS | — | — |
| FedRAMP authorization | Not authorized | 12-24 months, ~$500K+ | Only blocks federal hosting contracts, not grants |
| 3PAO assessment of SP 800-53 SSP | Self-attestation draft only | 3-6 months + cost | Not required for grants, strengthens proposals |
| Facility clearance | None | 12-18 months, requires sponsor | Blocks classified DOD work only |

**Critical path:** LLC → EIN → SAM.gov → SBA registry. Total: ~5-6 weeks from today (2026-04-07). This path must be walked regardless of which grant lands first.

---

## Action Calendar — Next 12 Months

**April 2026**
- **Immediate (this week):** Pull DARPA CLARA BAA text; decide go/no-go on April 10 full proposal based on honest read of compliance burden. If no-go, redirect preparation to I2O Office-Wide BAA abstracts.
- Select NAICS codes (likely 541511 Custom Computer Programming, 541690 Other Scientific/Technical Consulting, 541990 All Other Professional/Scientific/Technical Services).
- Email NIST CAISI asking about pathway for pre-revenue single-member LLC participation.
- Draft NSF SBIR Project Pitch (3 pages) so it can be submitted the day the program reopens.

**May 2026**
- LLC formation completes. File EIN SS-4 with IRS day one.
- Begin SAM.gov registration the same week.
- Monitor DOE SBIR FY26 topic release (expected late April / May).
- Apply to Anthropic Startup Program for $25K Claude credits (no federal prerequisites needed).

**June 2026**
- SAM.gov registration completes (~3-4 weeks). SBA Company Registry same day.
- If NSF SBIR reopens: submit Project Pitch within 48 hours.
- Draft DARPA I2O Office-Wide BAA abstract and identify target PM.

**July–August 2026**
- NIST SBIR FY26 solicitation expected release window.
- NIH SBIR next standard receipt date (September 5 for most institutes, verify per-cycle).
- Explore NIJ research solicitations published during this window.

**September–October 2026**
- Submit NIST SBIR Phase I (topic-dependent).
- Finalize DARPA I2O BAA abstract; informal PM outreach.

**November 2026**
- DARPA I2O Office-Wide BAA abstracts due November 1.
- DARPA I2O Office-Wide BAA full proposals due November 30.

**December 2026 – March 2027**
- Phase I decision cycles (NSF SBIR 3 months, NIST SBIR varies).
- LSC TIG 2027 cycle via BayLegal partnership (not direct).
- Plan Phase II follow-ons for any Phase I wins.

---

## Surprising Findings

1. **DARPA CLARA is a nearly perfect technical match** and Vernen didn't have it flagged. It is the first genuinely aligned DoD-adjacent program found in this sweep. The April 10 deadline is too close for a full proposal from a solo operator with no prior DARPA experience, but the I2O Office-Wide BAA in November is a second bite at the same apple with seven months of runway.
2. **LSC TIG is fully closed to Vernen.** The project notes already imply a BayLegal partnership pathway is needed; this research confirms there is no direct route. Any "TIG" line item in pitch decks targeting Vernen-as-applicant should be removed.
3. **CISA has no small-business grant stream.** The SLCGP is the only real CISA grant program and it is state-only. Remove CISA from the active funding pipeline entirely; treat CISA only as a standards/partnership relationship.
4. **NSF SBIR is paused.** This is the single most important operational fact in this report. The House passed reauthorization March 17, 2026, but until Project Pitch intake resumes, NSF SBIR is not a deployable funding source. Have the pitch ready; don't wait on it.
5. **NIST is the structural home.** The agency that owns SP 800-53 and the AI RMF is also the agency actively funding the exact work Vernen does. Everything in project_grant_strategy.md should weight NIST higher than it currently does.
6. **CAISI is free money in the form of credibility.** Membership costs nothing but paperwork, and it materially changes how every other application reads. Apply regardless of whether the CRADA produces direct funding (it won't).

---

## Sources

- [NSF SBIR Project Pitch (seedfund.nsf.gov)](https://seedfund.nsf.gov/project-pitch/)
- [NSF SBIR Artificial Intelligence topic](https://seedfund.nsf.gov/topics/artificial-intelligence/)
- [NSF SBIR Solicitations](https://seedfund.nsf.gov/solicitations/)
- [SBIR & STTR Deadlines 2026 calendar (Granted AI)](https://grantedai.com/blog/sbir-sttr-deadlines-calendar-2026)
- [SBIR Reauthorization 2026 guide (Granted AI)](https://grantedai.com/learn/guides/sbir-reauthorization-2026-guide)
- [DARPA I2O Office-Wide BAA HR001126S0001](https://www.darpa.mil/work-with-us/opportunities/hr001126s0001)
- [Every DARPA AI Program You Can Apply To in 2026 (Granted AI)](https://grantedai.com/blog/every-darpa-ai-program-2026)
- [DARPA SBIR/STTR overview (Granted AI)](https://grantedai.com/grants/darpa-small-business-innovation-research-sbir-and-small-business-technol-defense-advanced-research-projects-agenc-c9e26f6c)
- [NIST Center for AI Standards and Innovation (CAISI)](https://www.nist.gov/caisi)
- [NIST AI Consortium (AISIC) page](https://www.nist.gov/artificial-intelligence/artificial-intelligence-safety-institute-consortium-aisic)
- [CAISI listening sessions on AI adoption barriers](https://www.nist.gov/news-events/news/2026/02/caisi-host-listening-sessions-barriers-ai-adoption)
- [NIST AI Agent Standards Initiative announcement](https://www.nist.gov/news-events/news/2026/02/announcing-ai-agent-standards-initiative-interoperable-and-secure)
- [NIST $1.85B innovation engine / SBIR analysis (Granted AI)](https://grantedai.com/blog/nist-1-85-billion-innovation-engine-sbir-grants-startups-2026)
- [NIST allocates $3M+ to small businesses for AI and more (Feb 2026)](https://www.nist.gov/news-events/news/2026/02/nist-allocates-over-3-million-small-businesses-advancing-ai-biotechnology)
- [GSA and NIST partner on AI evaluation science in federal procurement](https://www.gsa.gov/about-us/newsroom/news-releases/gsa-and-nist-partner-to-boost-ai-evaluation-science-in-federal-procurement-03182026)
- [DOE SBIR FY2026 Office of Science funding opportunities](https://science.osti.gov/sbir/Funding-Opportunities/FY-2026)
- [DoD SBIR/STTR Innovation Portal (DSIP) topics](https://www.dodsbirsttr.mil/topics-app/)
- [Army AI/ML Open Topic (SBIR.gov)](https://www.sbir.gov/topics/10716)
- [NSF Convergence Accelerator program page](https://www.nsf.gov/funding/initiatives/convergence-accelerator)
- [NSF Convergence Accelerator 2025 cohort solicitation](https://www.nsf.gov/funding/opportunities/nsf-convergence-accelerator-phases-1-2-2025-cohort/506015/nsf23-590)
- [LSC TIG program overview](https://www.lsc.gov/grants/technology-initiative-grant-program)
- [LSC TIG CY2026 Federal Register notice](https://www.federalregister.gov/documents/2026/02/24/2026-03618/notice-of-availability-of-calendar-year-2026-competitive-grant-funds-for-the-technology-initiative)
- [LSC TIG how to apply + eligibility](https://www.lsc.gov/grants/technology-initiative-grant-program/how-apply-technology-initiative-grant)
- [DOJ Grants Program Plan](https://www.justice.gov/dojgrantsprogramplan)
- [OJP current funding opportunities](https://www.ojp.gov/funding/explore/current-funding-opportunities)
- [DOJ JustGrants system](https://justicegrants.usdoj.gov/)
- [CISA State and Local Cybersecurity Grant Program](https://www.cisa.gov/cybergrants/slcgp)
- [CISA Cyber Grants overview](https://www.cisa.gov/cybergrants)
- [Challenge.gov sunset notice](https://www.challenge.gov/)
- [Presidential AI Challenge](https://www.ai.gov/initiatives/presidential-challenge)
- [Amazon Nova AI Challenge: Trusted AI](https://www.amazon.science/nova-ai-challenge)
- [Anthropic Anthology Fund announcement](https://www.anthropic.com/news/anthropic-partners-with-menlo-ventures-to-launch-anthology-fund)
- [Menlo Ventures Anthology Fund page](https://menlovc.com/anthology-fund/)
- [Anthropic Startups program](https://claude.com/programs/startups)
- [SAM.gov entity registration](https://alpha.sam.gov/entity-registration)
- [SBIR.gov required registrations tutorial](https://www.sbir.gov/tutorials/registration-requirements/tutorial-1)
- [NIH SEED required company registrations](https://seed.nih.gov/small-business-funding/how-to-apply/before-you-apply/register-company)
- [SBA basic contracting requirements](https://www.sba.gov/federal-contracting/contracting-guide/basic-requirements)

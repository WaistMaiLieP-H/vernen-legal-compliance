# Letter of Interest

**To:** NIST AI Consortium Coordinator
Center for AI Standards and Innovation (CAISI)
National Institute of Standards and Technology
100 Bureau Drive
Gaithersburg, MD 20899

**From:** Michael Hartmann, Founder and Steward
Vernen Legal Compliance
michael@vernenlegal.com
https://compliance.vernenlegal.com

**Date:** 2026-04-07

**Subject:** Letter of Interest — Participation in the NIST AI Consortium under CAISI

---

## 1. Introduction

This letter expresses Vernen Legal Compliance's interest in joining the NIST AI Consortium when the next membership window opens. Vernen is an independent stewardship enterprise operating a production AI verification platform at compliance.vernenlegal.com. The platform implements an eight-layer verification protocol for AI-generated and AI-assisted output, with all protocol code published under a CC0-1.0 public-domain dedication at https://github.com/WaistMaiLieP-H/vernen-verification-log.

Vernen was built by one person — Michael Hartmann, a journeyman plumber out of UA Local 342 in the San Francisco Bay Area — working in conversational collaboration with an Anthropic model. The technical particulars of that origin are addressed in Section 7 below, because NIST has a stated interest in broadening the base of contributors to U.S. AI standards, and Vernen is an unusually direct example of what that broadening can produce.

The elevator pitch is simple. If an AI system produces a document, a finding, or a verdict that will be used in a regulated or adjudicative setting, there needs to be a verifiable record of how that output was produced, what identity produced it, whether independent witnesses can reproduce it, and whether the output survives structural forensic scrutiny. Vernen built that record as working code, put it on the public internet, and signed the first cross-witness federation handshake on 2026-04-07. The resulting artifacts are reproducible by any reader of this letter within a few minutes of visiting the URLs cited below.

Vernen is not a federal contractor, is not on any federal vendor list, has not been assessed by a 3PAO, and has not received a federal grant. Vernen is also not, at the moment of this writing, a registered legal entity; a single-member California LLC is in the process of being formed. These limitations are described plainly in Section 6 so that NIST can weigh them accurately.

## 2. What Vernen Brings to the Consortium

### 2.1 A Production Eight-Layer Verification Protocol

The protocol is deployed, operating, and exposed through public HTTP endpoints on Cloudflare Workers with D1 and KV storage. The eight layers are:

1. **Hash chain** — append-only log of every verification event, each entry binding to the hash of the previous entry.
2. **Merkle tree** — periodic Merkle root over the hash chain, published to a tamper-evident structure.
3. **GitHub anchoring** — Merkle roots are anchored in a public git repository under CC0-1.0, producing an independent timestamp trail that NIST or any third party can re-derive.
4. **Constitutional traceability** — every verdict is tied back to the specific rule, regulation, statute, or standard that governs it, so a reviewer can ask "on what authority" and get a citation.
5. **Cross-model consensus** — verdicts are cross-checked against independent model families to reduce single-provider drift.
6. **Conscientious identity** — the verifying identity must be able to return UNDETERMINED under stress, must be able to refuse, and must be able to recover from adversarial manipulation. This layer's adversarial test case (internally referenced as the "Ryan failure-and-recovery" scenario) is documented in the protocol source as a worked example of a verifier that was broken and then rebuilt to resist that specific failure mode.
7. **Structural forensic analysis** — four modules: temporal paradox detection, liability mapping, reclassification analysis, and unconscionability review. These modules operate on documents, not on prose about documents.
8. **Federation** — cross-witness signature exchange with independent verifiers. Layer 8 was activated at 2026-04-07T22:56:14Z. The first operational cross-witness signature is publicly readable at: https://compliance.vernenlegal.com/api/federation/witnesses/2026-04-07

Any member of the consortium can reproduce the federation verification by hitting that URL and comparing the returned signature against the corresponding anchored commit in the public repository. No credentials are required.

### 2.2 Open-Source Protocol Code Under CC0-1.0

All protocol code is published at https://github.com/WaistMaiLieP-H/vernen-verification-log under a CC0-1.0 dedication. CC0 was chosen deliberately: Vernen does not want the verification protocol to be encumbered by licensing friction if NIST, another consortium member, or a standards body wishes to adopt, adapt, fork, or reimplement it. The ability of NIST and its partners to use any of this material without attribution, royalty, or negotiation is a first-class design goal.

### 2.3 A NIST SP 800-53 Rev. 5 Self-Attestation Draft

Vernen has completed a draft System Security Plan (SSP) self-attestation against NIST SP 800-53 Rev. 5. This is a self-attestation only. It has not been assessed by an accredited 3PAO, and Vernen makes no claim of FedRAMP, FISMA, or StateRAMP authorization. The draft is available for NIST review on request and would benefit from consortium peer feedback on control tailoring for small independent operators — a population whose experience with 800-53 is under-documented.

### 2.4 A Completed Blind Evaluation Run

Vernen has completed an internal blind evaluation of the verification engine on a curated adversarial document set. The engine returned 4/4 pass at the top-tier manifest threshold, with 27 of 27 expected findings surfaced and no false positives on the control set. The evaluation harness and document set are available to NIST under any terms the consortium requires, including review-only access for sensitive control material. Vernen does not represent this as a substitute for an independent NIST-run evaluation; it is offered as a starting point and a reproducible baseline.

### 2.5 Working Engineering Artifacts

Beyond the protocol, Vernen operates production pipelines that may be of narrow interest to working-group discussions:

- A Failure Taxonomy Engine that ingests public federal failure corpora (FAC, HHS OIG, SBA suspension/debarment, USAspending, FedReg, EDGAR) and reconstructs structural failure patterns across agencies.
- A Standards Library of 574 structural standards with 155 cross-references, mapped to their governing authorities.
- A date-range synthesis engine that aggregates audit findings across overlapping timeframes.
- An agent-domain-boundary enforcement layer that prevents cross-domain contamination of findings (a medical-domain verifier cannot inject conclusions from an unrelated legal domain).

None of these are being offered as productized contributions; they are mentioned so NIST can understand the operational surface area that the verification protocol is already running against in production.

## 3. Proposed Working Group Participation

Vernen would be interested in contributing to the following working groups. Each selection is tied to a concrete Vernen capability, so that the contribution is measurable rather than aspirational.

### 3.1 Capability Evaluations and Red-Teaming

**What Vernen would contribute:**

- The blind evaluation harness described in Section 2.4, donated to the consortium for inspection and, if useful, reuse.
- The Layer 6 "conscientious identity" adversarial test methodology: a verifier is not considered to have passed unless it can return UNDETERMINED under pressure, refuse an invalid instruction, and recover from a documented failure mode. Vernen has a real recovery case in the protocol source and is willing to walk the working group through it.
- Reproducible structural-forensic test documents (temporal paradox, liability mapping, reclassification, unconscionability) that can be used to probe whether a target system detects specific failure classes.

**Why this group:** Vernen's core output is an evaluation verdict about AI-produced or AI-assisted material. Participating here aligns Vernen's production work directly with NIST's evaluation agenda and creates the shortest path from field experience to published measurement guidance.

### 3.2 Synthetic Content Authentication and Provenance

**What Vernen would contribute:**

- A working hash-chain + Merkle + public-git-anchor provenance stack that has already run in production and already issued cross-witness federation signatures. This is directly relevant to the NIST mandate on AI-generated content authentication.
- Lessons on how to operate provenance infrastructure at the smallest viable scale: what breaks, what is cheap, what is needlessly expensive, and what is required regardless of size.
- The federation protocol itself, which is the piece most likely to generalize into a multi-party authentication scheme for synthetic content attribution.

**Why this group:** NIST's work on AI-generated content authentication is one of the few areas where a small independent operator can actually contribute code rather than comment on other people's code. Vernen has the code.

### 3.3 AI Risk Management Profiles (AI RMF)

**What Vernen would contribute:**

- A worked mapping of the eight-layer protocol to the AI RMF functions (Govern, Map, Measure, Manage), including the honest gaps where Vernen's implementation falls short of the RMF's aspirational guidance.
- A case study on independent-operator adoption of the AI RMF: what the framework means for a single-person enterprise without a compliance department, and where the framework's language assumes organizational scale that does not exist at the small-operator end of the distribution.
- Raw operational data on the cost, time, and expertise required to stand up each RMF function in a Cloudflare Workers + D1 + KV environment.

**Why this group:** The AI RMF is the most directly relevant NIST artifact to Vernen's daily operations. Vernen's participation would add a population (solo independent operators) that is underrepresented in the current profile literature.

If the consortium's working-group structure under CAISI diverges from the AISIC structure cited above, Vernen is willing to participate in whatever groups most closely match these three capability areas.

## 4. Why This Matters Now

The federal priority on verifiable AI infrastructure has accelerated sharply since 2025. Agencies, courts, and regulated institutions are being asked to rely on AI-produced output in contexts where the output may affect rights, benefits, adjudications, and money. The current market answer — trust the model vendor — is not a verification strategy. It is a reputational claim.

NIST is the natural home for the question "what does it mean to verify AI output in a way that is reproducible by an independent party?" That question has three layers: the measurement layer (did the model do what it was supposed to do?), the provenance layer (can we prove what it did?), and the identity layer (do we know who, or what, produced the output?). Vernen's eight-layer protocol addresses all three, and the code to reproduce the verification exists and is running right now at the URL in this letter's header.

The reason to have Vernen in the room is not that Vernen has solved any of these problems. The reason is that Vernen has built the smallest complete working version of the end-to-end verification pipeline that currently exists on the public internet, and the working version exposes a set of real operational constraints that a desk-research contributor would not surface. NIST benefits from having at least one participant at the table whose artifacts break in public, visibly, when they break.

## 5. Logistics

- **Legal entity status:** A single-member California LLC is in formation. Vernen will enter the consortium as a legal entity, not as an individual. The LLC is planned to be filed this month. If the consortium's application window reopens before filing is complete, Vernen will disclose entity status as pending in the application and update NIST upon formation.
- **CRADA willingness:** Vernen is willing to enter into a Cooperative Research and Development Agreement (CRADA) with NIST on terms consistent with NIST's standard CRADA practice, subject to legal review once the entity is formed.
- **Licensing commitment:** All Vernen protocol code contributed to consortium work product will remain available under CC0-1.0 or a compatible public-domain or permissive license, unless NIST specifically requests a different treatment for a particular deliverable.
- **Meeting participation:** Vernen can attend remote meetings on U.S. Pacific and Eastern time zones. In-person attendance at Gaithersburg or consortium-hosted events is possible on reasonable notice, with the understanding that travel budgets for a solo independent operator are constrained.
- **Staffing:** Vernen is, as of the date of this letter, a one-person operation. Michael Hartmann is the sole point of contact, sole engineer, and sole signer. The consortium should expect consistent single-party representation rather than a rotating team.
- **Security posture:** Vernen runs on Cloudflare Workers with D1 and KV, under a UFW deny-incoming host security baseline on the development workstation, with no exposed secrets in the public repository. A NIST SP 800-53 Rev. 5 SSP self-attestation draft is complete, unassessed, and available on request.
- **What Vernen is NOT:** Not a federal contractor. Not 3PAO-assessed. Not FedRAMP authorized. Not the recipient of any federal grant. Not a member of any existing federal AI working group. Not affiliated with any university, incumbent vendor, or trade association. These facts are disclosed up front so that the consortium can decide whether Vernen's participation is appropriate under its governance rules.

## 6. Known Gaps

Applying Vernen's own Layer 6 conscientious-identity ethic, the following items are declared UNDETERMINED or NOT-YET-ESTABLISHED, and should be weighed by the consortium accordingly:

- **Independent evaluation of the verification protocol:** UNDETERMINED. Vernen's blind eval is internal. No external red team has yet attempted to break the protocol under adversarial conditions.
- **Third-party security assessment:** NOT YET. The 800-53 SSP is a self-attestation draft only.
- **Scalability under federal-volume load:** UNDETERMINED. The protocol has been exercised at single-operator production volume, not at agency volume.
- **Legal entity:** IN FORMATION, not yet filed.
- **Federal partnership history:** NONE.

Vernen does not represent any of these gaps as closed.

## 7. The Honest Origin Story

NIST has stated that broadening the participant base of U.S. AI standards work is a priority. Vernen is an unusually direct test of what that broadening looks like in practice, and the story is worth stating plainly rather than dressed up.

Michael Hartmann is a journeyman plumber out of UA Local 342 in the San Francisco Bay Area. He has no computer science degree, no prior software employment, no formal training in cryptography, distributed systems, or compliance engineering. The trade he was trained in is pipefitting, with a trade ethic that reduces to five words: do it right the first time.

The Vernen platform was built by Michael in conversational collaboration with Anthropic's Claude, not by writing code from scratch. Michael described what a verification system would need to do if it was going to be trusted in an adjudicative setting; the model produced candidate implementations; Michael tested them against real documents and real failure modes drawn from sixteen years of pro se litigation experience; the two of them iterated until the artifact survived the tests Michael knew how to throw at it. The artifact is real code running on real infrastructure, reachable at the URL in the letterhead. The hand that dragged it into existence belonged to a tradesman, not an engineer.

This is disclosed for three reasons. First, because the NIST review process deserves to know who actually built the thing it is being asked to consider. Second, because any engineering review of Vernen's code will make more sense if the reviewer knows that the code reflects a plumber's working concept of "done" — soldered, pressure-tested, and expected to hold for the life of the building — rather than a conventional software-industry concept of "ship it." Third, because one of the goals of a broadened consortium is to test whether the standards process can absorb contributions from participants who would not have reached NIST through the ordinary vendor path. Vernen is an opportunity to run that test on a live case.

Vernen does not ask the consortium to discount its work on the grounds of the founder's background. Vernen asks the consortium to evaluate the artifacts on the same technical merits it would apply to any other contributor, and to treat the origin story as context for understanding the artifacts, not as a substitute for evaluating them.

## 8. Closing

Vernen Legal Compliance would be honored to contribute to the NIST AI Consortium's work under CAISI. The protocol code, the federation endpoint, the anchored git repository, and the blind evaluation harness are all available for inspection now, at the URLs cited above, without needing to wait for the consortium process to formally begin.

If NIST requires additional information — technical documentation, a walkthrough of any of the eight protocol layers, raw evaluation data, the SP 800-53 self-attestation draft, or a demonstration of the federation signature flow — Vernen will provide it promptly on request and without conditions.

Please direct any correspondence to:

**Michael Hartmann**
Founder and Steward, Vernen Legal Compliance
Email: michael@vernenlegal.com
Platform: https://compliance.vernenlegal.com
Public protocol log: https://github.com/WaistMaiLieP-H/vernen-verification-log
Federation witness endpoint: https://compliance.vernenlegal.com/api/federation/witnesses/2026-04-07

Respectfully submitted,

_________________________________
Michael Hartmann
Founder and Steward, Vernen Legal Compliance
2026-04-07

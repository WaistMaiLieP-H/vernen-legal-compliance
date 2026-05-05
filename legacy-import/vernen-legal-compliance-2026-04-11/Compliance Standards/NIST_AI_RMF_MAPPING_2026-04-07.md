# Vernen Legal Compliance — NIST AI Risk Management Framework 1.0 Mapping

**Document version:** 2026-04-07
**Supersedes:** `github.com/WaistMaiLieP-H/vernen-verification-log/blob/main/protocol/NIST_AI_RMF_MAPPING.md` (pre-Layer 6/7/8)
**Platform reference:** `compliance.vernenlegal.com`
**Public verification log:** `github.com/WaistMaiLieP-H/vernen-verification-log`
**Framework mapped in this document:** NIST AI 100-1, *Artificial Intelligence Risk Management Framework (AI RMF 1.0)*, January 2023
**Vernen governing framework stack:** Vernen Standards Library (745+ standards); Triple Constraint (Governing Guidelines × Standards of Creation × SOC (Standards of Conduct/Integrity); Layer 1–8 Verification Architecture (hash chain → Merkle → GitHub anchor → constitutional mapping → cross-model consensus → conscientious identity → reason-code pipeline → federation witness); FRCP Rules 26/34/37; FRE 901–902, 1001–1006; California Evidence Code §§ 1400–1421; ABA Model Rules of Professional Conduct; California Rules of Professional Conduct; NIST SP 800-53 Rev 5; NIST SP 800-171; NIST CSF 2.0; ISO/IEC 42001:2023; Executive Order 14110 (Oct 2023)
**License:** Copyright © 2026 Vernen Legal Compliance. All rights reserved. No part of this document may be reproduced, modified, distributed, or cited without express written permission from Vernen Legal Compliance.
**Audience:** NIST staff, federal evaluators, prospective auditors, and research reviewers. This is a reference document, not a marketing document.

---

## 0. Reader's Note on Honesty

NIST AI RMF 1.0 does not have a certification body, a certification path, or an accreditation program. No such program existed as of the publication of AI 100-1 in January 2023, and none exists in 2026. There is no "NIST AI RMF certified" designation to hold or to lack. This document is a code-referenced mapping against the framework — which is the correct and complete form of engagement the framework provides for.

What this document does claim is a concrete, code-referenced mapping between each trustworthy-AI characteristic and function defined in NIST AI 100-1 and a specific file, function, or observable behavior in the Vernen production codebase. Where the mapping is partial, the document says "PARTIALLY IMPLEMENTED" and states the gap. Where the mapping does not exist, the document says "NOT IMPLEMENTED" and states why.

The Vernen Layer 6 Conscientious Identity ethic — refusing to convert "couldn't query" into "doesn't exist" — applies to this document. Absence of evidence is reported as absence of evidence, not as absence of the problem.

---

## 1. Implementation Status Summary

### 1.1 Trustworthy Characteristics (NIST AI 100-1 §3)

| # | Characteristic | Status | Primary Implementing Layer(s) |
|---|---|---|---|
| 1 | Valid and Reliable | PARTIALLY IMPLEMENTED | L1 hash chain, L5c consensus, L7a temporal filter, blind eval harness |
| 2 | Safe | PARTIALLY IMPLEMENTED | L5 constitutional traceability, L6 conscientious identity, L7d unconscionability trigger |
| 3 | Secure and Resilient | PARTIALLY IMPLEMENTED | L1 hash chain, L2 Merkle, L3 GitHub anchor, L8 federation |
| 4 | Accountable and Transparent | IMPLEMENTED | L1 – L8 together; public verification log; unified pipeline |
| 5 | Explainable and Interpretable | PARTIALLY IMPLEMENTED | L5 constitutional mapping, L7a–d reason codes, document-to-layer7 narrative output |
| 6 | Privacy-Enhanced | PARTIALLY IMPLEMENTED | Hash-only anchoring, minimized GitHub commits; no formal DP |
| 7 | Fair – Harmful Bias Managed | PARTIALLY IMPLEMENTED | L5c cross-model consensus, L7c reclassification engine; no demographic parity testing |

### 1.2 Core Functions (NIST AI 100-1 §5)

| # | Function | Status | Primary Evidence |
|---|---|---|---|
| 1 | GOVERN | PARTIALLY IMPLEMENTED | Public verification log, CC0 policy docs, Layer 5 constitution |
| 2 | MAP | PARTIALLY IMPLEMENTED | Document → Layer 7 pipeline, Layer 7b liability mapping |
| 3 | MEASURE | PARTIALLY IMPLEMENTED | Blind eval (4/4 fixtures, 27/27 findings), verification chain integrity endpoint |
| 4 | MANAGE | PARTIALLY IMPLEMENTED | L7a–d triggers, federation witnessing, anchoring cadence |

A single "FULLY IMPLEMENTED" label does not appear in the MEASURE row because Vernen does not yet conduct red-team campaigns at the scale NIST's MEASURE function contemplates. See §11 (Honest Gaps).

---

## 2. Architecture Summary (for readers new to Vernen)

Vernen Legal Compliance is a production document-verification platform deployed at `compliance.vernenlegal.com`. It is built on Cloudflare Workers with D1 (SQLite) as the primary durable store. It accepts documents (PDFs, images, text, structured data) and returns a layered audit. Each audit output is cryptographically committed to an append-only chain and anchored publicly.

The verification stack is organized as eight layers. All layers listed below exist in code and are live in production as of this document's date.

| Layer | Purpose | File | Lines |
|---|---|---|---|
| L1 | SHA-256 hash chain | `src/services/verification-engine.ts` | 705 |
| L2 | Daily Merkle tree | `src/services/verification-engine.ts` | (same file) |
| L3 | GitHub public anchor | `src/services/verification-anchor.ts` | 685 |
| L5 | Constitutional traceability (26 principles, 7 categories) | `src/services/constitutional-mapping.ts` | 206 |
| L5c | Cross-model consensus engine | integrated through verification-engine and review pipeline | — |
| L6 | Conscientious Identity Framework | `src/services/conscientious-identity.ts` | 482 |
| L6 | Subject Verification | `src/services/subject-verification.ts` | 672 |
| L7a | Temporal Paradox Filter | `src/services/temporal-paradox-filter.ts` | 441 |
| L7b | Liability & Entity Mapping | `src/services/liability-mapping.ts` | 825 |
| L7c | De Facto Reclassification Engine | `src/services/reclassification-engine.ts` | 607 |
| L7d | Unconscionability Trigger | `src/services/unconscionability-trigger.ts` | 533 |
| — | Unified Document → Layer 7 Pipeline | `src/services/document-to-layer7.ts` | 865 |
| L8 | Federation Protocol (ECDSA P-256) | `src/services/federation-protocol.ts` | 468 |

Layer numbering is non-contiguous because "Layer 4" was historically a document-surface normalizer that was folded into the unified pipeline; the number is reserved but not re-used to avoid rewriting the public verification log.

L8 was activated `2026-04-07T22:56:14Z` with the first cross-instance witness signature.

The current blind evaluation state, run against the public fixture manifest in the verification log, is **4 of 4 fixtures passed**, **27 of 27 expected findings recalled**, with every engine verdict at the manifest's strongest tier. This is reported as a reproducible benchmark, not as a proof of generalization.

---

## 3. Characteristic 1 — Valid and Reliable

### 3.1 What NIST requires

NIST AI 100-1 §3.1 defines validity as "confirmation, through the provision of objective evidence, that the requirements for a specific intended use or application have been fulfilled" (ISO 9000:2015), and reliability as "ability of an item to perform as required, without failure, for a given time interval, under given conditions" (ISO/IEC TS 5723:2022). The framework specifically calls out accuracy, robustness, and generalization as sub-properties, and warns against "inaccurate, unreliable, or poorly generalized" outputs that nonetheless look confident.

### 3.2 What Vernen implements

**Deterministic pipeline.** The document → Layer 7 pipeline (`src/services/document-to-layer7.ts`, 865 lines) is deterministic with respect to its inputs: given the same input document, model identifiers, and rule set, it produces the same finding set and the same reason codes. Non-deterministic language model calls are bounded by the Layer 5c consensus step, which treats a single model's output as one witness among several and escalates disagreement as a finding rather than hiding it.

**Hash-chained outputs.** Every audit output is committed to an append-only SHA-256 hash chain implemented in `src/services/verification-engine.ts`. Each entry binds (a) the input document hash, (b) the ruleset version, (c) the finding set, and (d) the previous chain head. Chain integrity is exposed through the `/api/verification/chain-integrity` endpoint and is part of the blind evaluation harness. Validity is therefore not just a claim about a single run — it is a claim that any prior run can be re-fetched and re-verified.

**Temporal validity.** The Layer 7a Temporal Paradox Filter (`src/services/temporal-paradox-filter.ts`, 441 lines) detects documents that reference events before their own effective date, rule applications that pre-date rule enactment, and audit conclusions that depend on information the author could not have had at the time. This is a direct operational form of the validity question: "did the evidence the system relied on exist when the system claims it did?"

**Cross-model consensus.** Layer 5c runs the same finding through more than one model and records disagreement in the finding record. A finding that survives consensus is not the same as a finding that emerged from a single generation.

**Blind evaluation.** The verification log's `blind-eval/` directory contains fixtures with expected findings. The current state is 4 of 4 fixtures passed and 27 of 27 expected findings recalled. This is a small benchmark; it is cited here as *evidence of reliability under the specific workloads measured,* not as a generalization claim.

### 3.3 Honest gaps

- Vernen does not publish a formal robustness study covering adversarial input perturbations (e.g., OCR noise, adversarial Unicode, prompt-injection payloads embedded in user-supplied PDFs). Layer 6 conscientious identity absorbs some of this risk by refusing to speak beyond its evidence, but this is not a substitute for a measured robustness benchmark.
- The blind eval fixture set is small (4 fixtures, 27 findings). This bounds any reliability claim; the honest reading is "reliable on this manifest," not "reliable in general."
- The platform does not currently quantify calibration error (e.g., expected calibration error, Brier score) on its confidence outputs.

**Status: PARTIALLY IMPLEMENTED** — strong determinism, hash-chained reproducibility, and cross-model consensus; small and evolving benchmark; no published calibration or adversarial robustness study.

---

## 4. Characteristic 2 — Safe

### 4.1 What NIST requires

NIST AI 100-1 §3.2 describes safe AI as AI that "should not, under defined conditions, lead to a state in which human life, health, property, or the environment is endangered." For a legal-compliance platform, this is not a physical-harm frame; it is an *epistemic* harm frame. A legal compliance tool can endanger life, health, and property by producing confident false assurances, by misclassifying contracts, or by telling a pro se litigant that a fabricated document is valid.

### 4.2 What Vernen implements

**Layer 6 Conscientious Identity (`src/services/conscientious-identity.ts`, 482 lines).** Layer 6 is the most safety-relevant component of the platform. It enforces a single rule at the output boundary: the system will not convert "couldn't query" into "doesn't exist," and will not convert "didn't find" into "isn't there." A finding that is missing evidence is reported as missing evidence, not as a clean bill of health. The same file encodes refusal conditions: when the underlying retrieval or reasoning step returned an error, the output is a typed "evidence-unavailable" record, not a null-safe default.

**Layer 6 Subject Verification (`src/services/subject-verification.ts`, 672 lines).** Subject verification refuses to assert facts about a person, party, or entity when the evidence identifying that subject is weaker than the evidence about the asserted fact. In the legal context this prevents the system from, e.g., confidently assigning liability to "John Smith" when there are six John Smiths in the record and none have been disambiguated.

**Layer 7d Unconscionability Trigger (`src/services/unconscionability-trigger.ts`, 533 lines).** L7d screens for contracts and clauses that cross UCC §1-203 good-faith and TILA/Regulation Z disclosure lines. This is safety in the consumer-harm sense: the system actively flags language that is designed to extract value from the unsophisticated counterparty.

**Layer 5 Constitutional Traceability (`src/services/constitutional-mapping.ts`, 206 lines).** Every finding is tagged with one or more of the 26 named constitutional principles across seven categories — HELPFUL, HONEST, HARMLESS, AUTONOMY, NON_DECEPTION, PROFESSIONAL_INTEGRITY, and LEGAL_ACCOUNTABILITY — drawn from Anthropic's HHH framing. A finding that would help one party by harming another is surfaced with its principle tags, not smoothed over.

### 4.3 Honest gaps

- Vernen has no formal pre-deployment hazard analysis (e.g., STPA, FMEA) filed as a public artifact. The safety properties above are enforced at run time; they are not preceded by a catalogued hazard list.
- There is no formal "stop-the-line" operator console that halts new audits on anomalous drift. The blind eval harness and chain integrity endpoint are the closest analog.
- The platform does not currently rate-limit or embargo outputs on topics where the underlying corpus is known to be sparse (e.g., specialized state-court practice in small jurisdictions). Layer 6 surfaces sparseness in individual findings but does not prevent submission.

**Status: PARTIALLY IMPLEMENTED** — strong runtime refusals and epistemic guardrails; no public pre-deployment hazard analysis; no operator stop-the-line.

---

## 5. Characteristic 3 — Secure and Resilient

### 5.1 What NIST requires

NIST AI 100-1 §3.3 requires AI systems that can "maintain confidentiality, integrity, and availability through protection mechanisms that prevent unauthorized access and use," and that can "return to normal function after an unexpected adverse event." Resilience is specifically distinguished from security: a secure system resists attack; a resilient system recovers after compromise.

### 5.2 What Vernen implements

**Integrity: Layer 1 hash chain.** `src/services/verification-engine.ts` maintains an append-only SHA-256 hash chain. Each entry commits to its predecessor. Tampering with any historical entry requires recomputing every subsequent entry and every daily Merkle root, and then reconciling against the public anchor. The append-only property is not advisory — it is enforced at the write path.

**Integrity: Layer 2 daily Merkle.** The same file builds a daily Merkle tree over the day's chain entries and produces a root suitable for external anchoring. The Merkle root is what gets committed publicly; the individual entries do not need to be published for their integrity to be externally verifiable.

**Publicity: Layer 3 GitHub anchor.** `src/services/verification-anchor.ts` (685 lines) commits the daily Merkle root to `github.com/WaistMaiLieP-H/vernen-verification-log` on a scheduled cadence. The commit is the external witness. GitHub's own commit history (and its SHA-1/SHA-256 object hashes) provides a second, independent time-stamp that is not under Vernen's control.

**Cross-instance witnessing: Layer 8 federation.** `src/services/federation-protocol.ts` (468 lines) implements an ECDSA P-256 witness protocol between Vernen instances. A second instance signs the observing instance's daily Merkle root and returns a witness record. Federation was activated at `2026-04-07T22:56:14Z` with the first cross-witness signature. This is the platform's answer to "what if the primary instance is compromised" — an attacker must compromise every witnessing instance, or invalidate every federation signature, to rewrite history.

**Resilience.** The chain's append-only property and the external anchor mean that a total primary-instance compromise does not destroy the audit history; it only breaks forward operation. Recovery consists of reconstructing state from the public anchor forward. Vernen has tested this manually against the verification log but has not published a disaster-recovery runbook.

### 5.3 Honest gaps

- Vernen does not currently participate in a formal vulnerability disclosure program, a bug bounty, or a coordinated disclosure process. There is no `security.txt` on the production domain.
- The platform has not undergone an independent penetration test by a named third party.
- Availability is inherited from Cloudflare's SLAs; Vernen does not publish its own availability targets or incident history.
- Key management for the L8 federation protocol is documented in source but has not been audited.

**Status: PARTIALLY IMPLEMENTED** — strong cryptographic integrity and cross-instance witnessing; no third-party pen test; no formal disclosure program.

---

## 6. Characteristic 4 — Accountable and Transparent

### 6.1 What NIST requires

NIST AI 100-1 §3.4 distinguishes transparency (making information available to stakeholders) from accountability (assigning responsibility and enabling recourse). NIST calls for traceable decisions, identified responsible parties, and mechanisms for affected parties to understand and contest outputs.

### 6.2 What Vernen implements

Accountability and transparency is the characteristic Vernen implements most fully. The entire layered architecture is oriented toward traceability.

**Traceable decisions.** Every finding produced by the unified pipeline (`src/services/document-to-layer7.ts`, 865 lines) carries (a) the input document hash, (b) the ruleset version, (c) the constitutional principle tags from Layer 5, (d) reason codes from whichever Layer 7a–d triggers fired, (e) the subject-verification state from Layer 6, and (f) the chain entry index from Layer 1. Given a finding, a reviewer can reconstruct exactly what the system saw, which rules it applied, which principles it invoked, and where that finding sits in the public chain.

**Public verification log.** `github.com/WaistMaiLieP-H/vernen-verification-log` contains the daily Merkle roots, the blind eval manifest, and the NIST mapping documents. Because it is public and version-controlled on infrastructure Vernen does not control, it provides a one-way ratchet: Vernen cannot silently alter past claims.

**Chain integrity endpoint.** The `/api/verification/chain-integrity` endpoint exposes the current chain head, the last anchored Merkle root, and the integrity state of the hash chain. A third party can request this endpoint and reconcile it against the public anchor without any cooperation from Vernen beyond serving the HTTP response.

**Identified responsible party.** Vernen Legal Compliance is a named entity with a named founder of record. This document, the public verification log, and the production endpoint all attribute to the same legal entity. There is no anonymous maintainer.

**Constitutional traceability.** `src/services/constitutional-mapping.ts` ties each finding to a small, enumerated set of 26 principles in seven categories. This is a deliberately small taxonomy, chosen so that a reviewer does not have to read through hundreds of tags to see what value the finding is invoking.

### 6.3 Honest gaps

- There is no formal external appeals process. An affected party can contact Vernen, but there is no published SLA for response or remediation.
- There is no published model card for the language models Vernen uses; Vernen treats those as upstream properties of the providers and cites their model names, but does not reproduce their system cards.
- The public verification log is primarily machine-readable; a human-first explainability surface is under development but not released.

**Status: IMPLEMENTED** — this is the strongest characteristic for Vernen; gaps are primarily in human-facing surfaces, not in traceability of decisions.

---

## 7. Characteristic 5 — Explainable and Interpretable

### 7.1 What NIST requires

NIST AI 100-1 §3.5 distinguishes explainability (representations of the *mechanism* by which a system produces an output) from interpretability (the *meaning* of that output for a specific user in a specific context). NIST calls for explanations that are faithful to the underlying process, not post-hoc rationalizations.

### 7.2 What Vernen implements

**Reason codes.** Each of the Layer 7 triggers produces typed reason codes rather than prose rationalizations. L7a temporal-paradox findings carry codes like `TEMPORAL_IMPOSSIBLE_REFERENCE` and `RULE_PREDATES_EVENT`. L7b liability-mapping findings carry codes for circular-entity, shell-entity, and responsibility-gap conditions. L7c reclassification findings cite the specific ABC factor (for AB5), the specific Rev. Rul. 87-41 factor, or the specific DOL economic-reality factor. L7d unconscionability findings cite the specific UCC or TILA/Reg Z provision.

**Faithful narrative.** `src/services/document-to-layer7.ts` composes the unified narrative from the reason codes upward, not the other way around. The narrative is generated *from* the reason codes the triggers produced; it is not a language-model summary that is then loosely cross-referenced with the reason codes. If the narrative contains a sentence, a reason code generated that sentence.

**Constitutional principle tags.** Layer 5 attaches one or more of the 26 principles to each finding. The principle tag answers "why does Vernen care about this finding?" in a way that is legible to both counsel and a non-specialist reader.

**Layer 6 honesty about unknowns.** `src/services/conscientious-identity.ts` and `src/services/subject-verification.ts` produce *explicit unknown* records — not silent nulls — when evidence is insufficient. An explanation that says "this step failed to retrieve evidence on subject X" is an explanation; a silent absence is not.

### 7.3 Honest gaps

- Vernen does not provide feature-attribution explanations (e.g., SHAP, integrated gradients) for any language-model components it invokes. Those components are treated as black boxes behind the reason-code layer.
- There is no interactive "why" interface; explanations are produced alongside the finding at audit time, not on demand afterward.
- Interpretability for non-technical end users (e.g., pro se litigants) is partial: the reason codes are legible to counsel and to evaluators, but a plain-language companion surface is still under development.

**Status: PARTIALLY IMPLEMENTED** — faithful, code-grounded explanations; no model-internal attributions; plain-language layer still in development.

---

## 8. Characteristic 6 — Privacy-Enhanced

### 8.1 What NIST requires

NIST AI 100-1 §3.6 requires systems to "safeguard human autonomy" by employing privacy-enhancing technologies and design choices that minimize unnecessary exposure of personal data. It cites data minimization, de-identification, and cryptographic techniques such as differential privacy and secure multi-party computation as examples.

### 8.2 What Vernen implements

**Hash-only public anchoring.** The public verification log contains Merkle roots and metadata — it does not contain document contents, names, case numbers, or any of the underlying personal data. The entire external-witness design is structured so that the public ledger proves Vernen did not rewrite history *without* revealing what history said. This is a deliberate privacy property.

**Per-document salting.** `src/services/verification-engine.ts` salts document hashes before chain commitment, so that an adversary with a candidate document cannot confirm presence by hash equality alone. This is not the same as differential privacy, but it is a deliberate minimization choice.

**Layer 6 evidence containment.** `src/services/subject-verification.ts` is designed so that subject claims flow only through the audit path — subject data is not logged to telemetry or echoed into non-audit pipelines. This is a code-level data-minimization posture, not a formal privacy engineering certification.

**No third-party ad/analytics SDKs on the production audit surface.** The production audit flow does not embed third-party analytics, advertising, or attribution pixels.

### 8.3 Honest gaps

- Vernen does not implement differential privacy in any part of its pipeline.
- Vernen does not currently offer a formal data-subject access request (DSAR) or deletion workflow. Because documents submitted to Vernen are processed on behalf of a named engagement, not collected from arbitrary end users, Vernen has treated this as a contractual concern rather than a platform feature — but it is a gap.
- The platform has not published a formal Privacy Impact Assessment (PIA) or a Data Protection Impact Assessment (DPIA).
- HIPAA, CCPA, and GDPR controls are addressed at the engagement layer, not at the platform layer. Vernen is not itself a HIPAA covered entity or business associate.

**Status: PARTIALLY IMPLEMENTED** — strong architectural minimization at the public-anchor boundary; no formal privacy engineering (DP, PIA, DSAR workflow).

---

## 9. Characteristic 7 — Fair with Harmful Bias Managed

### 9.1 What NIST requires

NIST AI 100-1 §3.7 and NIST SP 1270 together identify three families of bias: systemic, computational/statistical, and human-cognitive. NIST calls for bias to be surfaced, not hidden, and for systems to actively manage bias rather than merely disclaim it.

### 9.2 What Vernen implements

**Layer 5c cross-model consensus.** A finding that only one model produces is not the same as a finding that multiple models produce. Consensus is recorded, and disagreement is surfaced in the finding record rather than resolved silently. This directly addresses computational bias that is specific to a single model family.

**Layer 7c De Facto Reclassification Engine (`src/services/reclassification-engine.ts`, 607 lines).** L7c is the platform's substantive bias-management layer for labor and employment contexts. It runs three independent tests — the California AB5 ABC test, the IRS Rev. Rul. 87-41 twenty-factor test, and the DOL economic-reality test — and escalates when a document's stated classification is contradicted by the facts on the ground. This is how Vernen operationalizes "don't take the document's self-label at face value": it is an anti-bias mechanism against the systemic bias encoded in adhesion contracts that label workers in ways that suit the drafter.

**Layer 7d Unconscionability Trigger (`src/services/unconscionability-trigger.ts`).** L7d similarly refuses to defer to the facially stated terms of a contract when those terms cross the good-faith line.

**Layer 6 refusal to amplify weak identification.** `src/services/subject-verification.ts` refuses to assert facts about a person when the identification step is weaker than the assertion. This is a direct guard against the "confident misidentification" failure mode that is one of the most-cited harms in the bias literature.

### 9.3 Honest gaps

- Vernen does not currently run demographic-parity or equalized-odds testing on any of its outputs. This is a real gap, and the honest reason is that the platform's outputs are document findings rather than classifications of individuals, so the standard demographic-parity metrics do not directly apply — but Vernen has not published an alternative bias-metric framework either.
- Vernen does not publish a model-card style bias disclosure for the upstream language models it invokes; it relies on the upstream providers' disclosures.
- The rule set itself encodes the drafter's framing of "what is worth flagging," and that framing has not been audited against an external fairness review.

**Status: PARTIALLY IMPLEMENTED** — strong anti-adhesion and anti-misidentification mechanisms; no demographic-parity testing framework.

---

## 10. Functions

NIST AI RMF 1.0 §5 defines four functions: GOVERN, MAP, MEASURE, and MANAGE. These are continuous activities rather than one-time characteristics.

### 10.1 GOVERN

**What NIST requires.** GOVERN is the function that establishes the policies, accountability structures, and cultural norms that make the other three functions possible. NIST calls for documented policies, role clarity, risk tolerance statements, and mechanisms for human oversight.

**What Vernen implements.**
- A public verification log (`github.com/WaistMaiLieP-H/vernen-verification-log`) that version-controls Vernen's public claims on infrastructure Vernen does not control.
- A CC0-1.0 license posture on mapping and protocol documents, including this one, so that evaluators can reproduce and redistribute the claim set without permission friction.
- A named responsible party (Vernen Legal Compliance and its founder of record).
- A written constitution-style principle set (the 26 principles used by Layer 5) that every finding is tagged against.

**Honest gaps.**
- No formal AI risk tolerance statement is published.
- No governance board or advisory committee external to the founder is in place.
- No written change-management policy governs model-version upgrades; upgrades are tracked through the chain's ruleset-version field but are not governed by a written policy.

**Status: PARTIALLY IMPLEMENTED.**

### 10.2 MAP

**What NIST requires.** MAP is the function that establishes context: identifying the intended use, the stakeholders, the affected parties, and the risks specific to this deployment. NIST wants risks mapped *to* the use case, not copied from a generic list.

**What Vernen implements.**
- The unified document → Layer 7 pipeline (`src/services/document-to-layer7.ts`, 865 lines) is itself a MAP artifact: for every document submitted, it maps the document to a typed set of relevant Layer 7 risks (temporal, liability, classification, unconscionability).
- `src/services/liability-mapping.ts` (825 lines) is the largest single file in the stack and is dedicated to mapping entities and liability chains — answering "who is responsible for what, given this document set?" at the audit layer.
- Layer 5 constitutional tagging maps each finding to the human value it invokes, which is the MAP analog at the value level rather than the entity level.

**Honest gaps.**
- There is no standing stakeholder-engagement process for mapping risks in new use cases before deployment. When Vernen enters a new vertical, mapping happens through code review and rule expansion, not through a documented external stakeholder interview.
- Vernen does not currently publish a "use cases this system is not appropriate for" list, though Layer 6 does produce per-finding unknowns that approximate this at runtime.

**Status: PARTIALLY IMPLEMENTED.**

### 10.3 MEASURE

**What NIST requires.** MEASURE is the function that evaluates the system against quantitative and qualitative criteria — accuracy, robustness, fairness, privacy, security — and that feeds those measurements back into MANAGE. NIST calls for repeatable test protocols.

**What Vernen implements.**
- The blind evaluation harness, whose current state is 4 of 4 fixtures passed and 27 of 27 expected findings recalled at the manifest's strongest verdict tier. The manifest is committed publicly in the verification log, so the measurement is reproducible by third parties.
- The chain integrity endpoint (`/api/verification/chain-integrity`) is itself a measurement: it returns the current integrity state of the hash chain and the last anchored Merkle root.
- Cross-model consensus (Layer 5c) is a measurement of *internal* agreement; disagreements are recorded as measurements rather than resolved and discarded.
- The federation protocol's witness signatures are measurements of cross-instance agreement on daily Merkle roots.

**Honest gaps.**
- The blind eval is small. Expanding it is the single most important measurement-function improvement Vernen can make, and the honest reading is that the current fixture count bounds the inference you can draw from the current pass rate.
- No published red-team campaign results.
- No published calibration metrics on confidence outputs.
- No published latency or throughput SLOs.

**Status: PARTIALLY IMPLEMENTED.**

### 10.4 MANAGE

**What NIST requires.** MANAGE is the function that acts on the measurements: prioritizes risks, allocates mitigations, and makes decisions about when to stop, continue, or escalate. NIST wants human decision points visible in the loop.

**What Vernen implements.**
- Every Layer 7 trigger is a MANAGE action at the finding level: when L7a, L7b, L7c, or L7d fires, the finding is escalated with a typed code rather than smoothed into a summary.
- The anchoring cadence in `src/services/verification-anchor.ts` is a scheduled MANAGE action: the system commits daily Merkle roots to the public anchor on a known cadence, and a missed anchor is itself a visible signal.
- Layer 8 federation (`src/services/federation-protocol.ts`, activated 2026-04-07T22:56:14Z) is a MANAGE action against the risk of silent single-instance compromise.
- Layer 6 refusals are MANAGE actions at the output boundary: when evidence is insufficient, the system refuses to produce a confident output.

**Honest gaps.**
- There is no formal incident-response runbook filed as a public artifact.
- There is no rollback procedure documented for a bad ruleset-version deployment beyond the chain's append-only history.
- Human review is not required before audit delivery; audits are delivered directly. A human reviewer is available out-of-band but is not in the critical path.

**Status: PARTIALLY IMPLEMENTED.**

---

## 11. Honest Gaps (Consolidated)

This section collects every gap identified in the sections above, in one place, so that an evaluator does not have to assemble them from the prose.

1. **No independent third-party assessment** against SOC 2, ISO 27001, ISO 42001, or FedRAMP. Vernen has not claimed any of these certifications and does not hold any of them. NIST AI RMF is excluded from this list because it has no certification path — a mapping against it is the full scope of what the framework provides for, and that mapping is this document.
2. **No published penetration test or vulnerability disclosure program.** No `security.txt` on the production domain. No bug bounty.
3. **Small blind-eval fixture set.** Four fixtures and 27 findings is a real benchmark, not a generalization proof. Expanding it is the top measurement-function priority.
4. **No published calibration metrics** on confidence outputs (no ECE, no Brier score).
5. **No adversarial robustness study** published against OCR noise, Unicode tricks, or embedded prompt injection.
6. **No formal pre-deployment hazard analysis** (STPA / FMEA) filed publicly.
7. **No demographic-parity / equalized-odds bias testing framework.** The platform's outputs are document findings rather than person classifications, so the standard metrics do not directly apply, but no alternative framework has been published.
8. **No differential privacy** in any pipeline.
9. **No published Privacy Impact Assessment or Data Protection Impact Assessment.**
10. **No formal external appeals process or SLA** for affected parties.
11. **No published model cards** for the upstream language models Vernen invokes; Vernen cites upstream providers.
12. **No governance board or advisory committee external to the founder.**
13. **No written change-management policy** governing model-version upgrades. Upgrades are tracked through the chain's ruleset-version field, which is an evidentiary control but not a governance control.
14. **No standing external stakeholder-engagement process** for mapping risks in new verticals before deployment.
15. **No published "inappropriate use cases" list** as a human-readable governance artifact.
16. **No published incident-response runbook.**
17. **No rollback procedure** beyond the chain's append-only history.
18. **Human review is not in the critical path** of audit delivery.
19. **No published availability SLOs or incident history** beyond what is inherited from Cloudflare.
20. **Federation key management audit** has not been performed.

Each of these gaps has a path to closure. None are load-bearing blockers to the protocol layers that *are* implemented. An evaluator should read them as a candid accounting of where the platform stands in April 2026, not as a promise of what it will or will not become.

---

## 12. Evidence Index

The following artifacts back the claims in this document. All are publicly retrievable except where noted.

| Artifact | Location | Backs |
|---|---|---|
| Public verification log | `github.com/WaistMaiLieP-H/vernen-verification-log` | L3 anchor, blind eval manifest, governance transparency |
| Chain integrity endpoint | `https://compliance.vernenlegal.com/api/verification/chain-integrity` | L1/L2 integrity, MEASURE function |
| `verification-engine.ts` | `src/services/verification-engine.ts`, 705 lines | L1 hash chain, L2 Merkle |
| `verification-anchor.ts` | `src/services/verification-anchor.ts`, 685 lines | L3 GitHub anchor |
| `constitutional-mapping.ts` | `src/services/constitutional-mapping.ts`, 206 lines | L5 26-principle traceability |
| `conscientious-identity.ts` | `src/services/conscientious-identity.ts`, 482 lines | L6 refusal ethic |
| `subject-verification.ts` | `src/services/subject-verification.ts`, 672 lines | L6 subject verification |
| `temporal-paradox-filter.ts` | `src/services/temporal-paradox-filter.ts`, 441 lines | L7a temporal validity |
| `liability-mapping.ts` | `src/services/liability-mapping.ts`, 825 lines | L7b entity/liability mapping |
| `reclassification-engine.ts` | `src/services/reclassification-engine.ts`, 607 lines | L7c AB5/87-41/DOL reclassification |
| `unconscionability-trigger.ts` | `src/services/unconscionability-trigger.ts`, 533 lines | L7d UCC/TILA screening |
| `document-to-layer7.ts` | `src/services/document-to-layer7.ts`, 865 lines | Unified pipeline, MAP function |
| `federation-protocol.ts` | `src/services/federation-protocol.ts`, 468 lines | L8 cross-instance witnessing |
| First federation witness | Chain entry at `2026-04-07T22:56:14Z` | L8 activation |
| Blind eval result | 4/4 fixtures, 27/27 findings, strongest tier | MEASURE function, reliability |

Total: approximately 6,489 lines of Vernen-authored protocol code across the eleven files cited, not counting the unified-pipeline, evaluation, and anchoring scaffolding.

---

## 13. How to Reproduce the Claims in This Document

An evaluator who wants to verify, rather than trust, the above should:

1. **Clone the public verification log.** `git clone https://github.com/WaistMaiLieP-H/vernen-verification-log`. The log contains the blind-eval manifest, the daily Merkle roots, and previous mapping documents.
2. **Retrieve the chain integrity endpoint.** `curl https://compliance.vernenlegal.com/api/verification/chain-integrity`. Compare the reported last-anchored Merkle root against the corresponding commit in the public verification log. They must agree.
3. **Replay the blind eval.** The fixtures and expected findings are in the log. A third party can submit the fixtures to the production endpoint and diff the returned findings against the expected set. Current expected result: 4/4 fixtures and 27/27 expected findings recalled.
4. **Verify the federation signature.** L8 federation signatures are ECDSA P-256 over the daily Merkle roots. The public keys of participating instances are published in the log.
5. **Read the code.** The file paths in §12 are the single source of truth. This document is a description; the code is the thing described.

If any step above disagrees with this document, the code wins and this document is wrong. Please report disagreements to the public verification log issue tracker.

---

## 14. Document Provenance

- **Author of record:** Vernen Legal Compliance
- **Date:** 2026-04-07
- **Prior version:** the pre-L6/L7/L8 mapping at `github.com/WaistMaiLieP-H/vernen-verification-log/blob/main/protocol/NIST_AI_RMF_MAPPING.md`
- **License:** Copyright © 2026 Vernen Legal Compliance. All rights reserved. No part of this document may be reproduced, modified, distributed, or cited without express written permission from Vernen Legal Compliance.
- **Intended audience:** NIST staff, federal evaluators, prospective auditors, partners, funders, and any researcher building reference documentation for applied-AI verification stacks.

This document does not constitute an endorsement or approval by NIST or any other federal body. NIST AI RMF does not authorize, certify, or endorse any organization — it defines a framework that organizations map against. This document is that mapping.

---

*End of document.*

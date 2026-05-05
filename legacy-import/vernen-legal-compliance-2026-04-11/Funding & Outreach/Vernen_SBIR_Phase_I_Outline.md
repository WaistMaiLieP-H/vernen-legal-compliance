# Vernen Legal Compliance — NSF SBIR Phase I Proposal Outline

**Status:** Pre-fill skeleton (not a submission draft)
**Created:** 2026-04-07
**Author:** Michael Hartmann, Founder, Vernen Legal Compliance
**Intended solicitation:** NSF SBIR Phase I — next open window (est. mid-to-late 2026)
**Target topic area:** Artificial Intelligence and Machine Learning (AI) — subtopic: Trustworthy AI / Verifiable AI Infrastructure. Secondary fit: Trustworthy Computing / Cybersecurity (CT).
**Typical Phase I award:** up to $275,000 over 6–12 months (verify exact ceiling against the active solicitation at filing time).

> **How to use this file:** Each section is pre-filled with Vernen-specific content at outline/draft level. When the solicitation opens, flesh out each section in place. `[NEEDS: ...]` markers indicate information that must be gathered (salary figures, letters of support, etc.) before submission. `TO WRITE` markers indicate sections that require longer-form prose expansion.

---

## 0. Pre-Submission Checklist (not part of the submission)

- [ ] LLC formation complete; EIN issued; SAM.gov registration active (UEI assigned); CAGE code assigned.
- [ ] Research.gov account created; organization registered at NSF.
- [ ] Project Pitch submitted and invitation to submit full proposal received. (NSF SBIR Phase I requires a Project Pitch invitation before a full proposal can be filed — this is a hard gate.)
- [ ] Solicitation PDF downloaded, page limits and formatting rules re-verified against this outline.
- [ ] PI (Michael Hartmann) primary employment confirmed to be at Vernen at time of award (NSF requires PI to be employed ≥ 51% by the small business at time of award and for project duration).
- [ ] Company confirmed as small business concern: ≥ 50% US owned, ≤ 500 employees, for-profit.
- [ ] Conflicts-of-interest and current/pending support forms prepared.
- [ ] Letters of support drafted and requested from real prospective customers. `[NEEDS: named customers willing to sign]`

---

## 1. Project Summary (1 page)

**Project Title:** Verifiable AI Infrastructure for High-Stakes Compliance: A Cryptographic Execution Protocol for Accountable Agent Systems

### 1.1 Overview

Vernen Legal Compliance proposes to research and extend a working prototype of **verifiable AI infrastructure**: a protocol and reference implementation that produces cryptographically verifiable execution records for every action an AI agent takes. Unlike current approaches that rely on trust in the provider, Vernen's approach lets any third party verify — without the provider's cooperation — that a given AI output was produced by a specific model, at a specific time, from specific inputs, under a specific governing rule set, and was signed by an independent witness.

The prototype is deployed in production at compliance.vernenlegal.com as a forensic compliance audit platform. It implements an eight-layer verification protocol (hash chain, Merkle tree, external anchor, constitutional traceability, cross-model consensus, conscientious identity, structural forensic analysis, and federation) and has passed a 4-of-4 blind evaluation with 27 of 27 expected findings detected. Phase I funding will extend this prototype from a single-operator deployment into a federated, independently-audited verification substrate that can serve as reference infrastructure for any agency, court, or enterprise that needs to answer the question: *"Did the AI really do what it says it did?"*

### 1.2 Intellectual Merit

The verification protocol is novel in three respects. First, it treats AI execution records as **first-class evidentiary artifacts** — append-only, hash-chained, externally anchored, and independently witnessable — rather than as opaque logs owned by the provider. Second, it introduces a **Conscientious Identity layer** (Layer 6) in which the executing model is required to declare refusal grounds when a requested action would violate its own stated operating constraints, producing a machine-readable record of ethical reasoning. Third, it extends to **federation** (Layer 8), where independent witnesses co-sign audit findings, allowing verification without requiring any single party to be trusted. The first cross-witness federation signature was recorded on 2026-04-07T22:56:14Z.

### 1.3 Broader Impacts

Trustworthy AI is currently gated by the fact that AI outputs are unfalsifiable after the fact. Federal agencies, courts, hospitals, and legal services organizations cannot adopt AI for consequential decisions because there is no mechanism to audit whether an AI actually did what it claims. Vernen's protocol directly addresses this gap. Broader impacts include: (a) an open reference implementation under CC0 licensing that the research community and other small businesses can build on; (b) alignment with the NIST AI RMF 1.0 trustworthy-AI characteristics; (c) a demonstrated path for non-traditional founders to contribute infrastructure to AI safety. The founder is a working union plumber (UA Local 342) who built the prototype through conversational development — evidence that verification infrastructure need not be the exclusive province of well-capitalized AI labs.

---

## 2. Project Description (15 pages max)

### 2.1 The Opportunity

**The problem.** AI agents are being deployed at scale into high-stakes decision contexts — legal drafting, medical triage, benefits adjudication, procurement review, federal compliance — but there is no widely adopted mechanism to *prove after the fact* that an AI actually performed the work it reports. Current systems produce logs that are (i) controlled by the vendor, (ii) mutable, (iii) unanchored to any external time source, (iv) unsigned by an independent party, and (v) unreadable to anyone outside the vendor's stack. This creates three concrete failure modes already observable in 2025–2026:

1. **Retroactive log editing.** AI vendors have been observed modifying historical outputs after the fact without an audit trail. `[CITE: specific incidents at writing time — see References]`
2. **Hallucinated attributions.** AI-drafted legal briefs citing fabricated cases have reached federal courts. `[CITE: Mata v. Avianca 2023; subsequent 2025 cases]`
3. **Unverifiable compliance claims.** Federal contractors are beginning to use AI to generate compliance attestations that cannot be independently verified. `[CITE: GAO/OIG reports on AI use in federal contracting]`

**The market gap.** Existing AI observability platforms (e.g., model-monitoring tools) treat logs as internal telemetry. Blockchain-based "proof of AI" proposals are largely vaporware and require token economies that federal buyers will not adopt. No product on the market today produces cryptographically verifiable, externally anchored, independently witnessed execution records suitable for evidentiary use in a federal administrative or judicial proceeding.

**The window.** NIST published AI RMF 1.0 in 2023 and its Generative AI Profile in 2024. OMB M-24-10 and subsequent AI procurement guidance now require federal agencies to manage AI risk with documented controls. The market demand for verifiable AI infrastructure is moving from theoretical to procurement-active within the Phase I performance window. `TO WRITE: 2–3 paragraphs connecting this to specific open solicitations and federal AI use cases.`

### 2.2 The Innovation: The Eight-Layer Verification Protocol

Vernen's verification stack is documented at `platform/docs/VERIFIABILITY_ARCHITECTURE.md`, `platform/docs/FEDERATION_PROTOCOL.md`, `platform/docs/LAYER_7_STRUCTURAL_FORENSIC_ANALYSIS.md`, and `platform/docs/NIST_AI_RMF_MAPPING.md`. The layers are:

| Layer | Name | Function | Status |
|---|---|---|---|
| 1 | Hash Chain | Each execution record contains the SHA-256 hash of the previous record; tamper produces visible break. | Production |
| 2 | Merkle Tree | Daily Merkle root aggregates all records for efficient proof-of-inclusion. | Production |
| 3 | External Anchor | Daily Merkle root published to GitHub public repo (and optionally OpenTimestamps) for independent time-anchoring. | Production |
| 4 | Constitutional Traceability | Every finding traces to a specific governing rule (statute/regulation/standard) by citation. | Production |
| 5 | Cross-Model Consensus | Findings can be independently reproduced by a second model family; disagreement is surfaced, not hidden. | Production |
| 6 | Conscientious Identity | Executing model declares refusal grounds when an instruction would violate its operating ethic; refusals are first-class records. | Production |
| 7 | Structural Forensic Analysis | Four sub-modules — temporal paradox, liability mapping, reclassification, unconscionability — detect document-level manipulation. | Production |
| 8 | Federation | Independent peer witnesses co-sign findings; first cross-witness signature recorded 2026-04-07T22:56:14Z. | Prototype → target of Phase I extension |

**What is novel.** (a) The combination is novel: no existing system integrates hash-chaining + external anchoring + cross-model consensus + conscientious-identity refusals + federation under a single protocol with an open reference implementation. (b) Layer 6 (Conscientious Identity) is, to our knowledge, the first operational implementation of machine-readable refusal records as part of the execution log — turning ethical reasoning from a runtime behavior into an auditable artifact. (c) Layer 7's structural forensic modules apply formal document-integrity checks (temporal coherence, liability-party coherence, classification coherence, substantive-unconscionability screens) as part of the execution record, not as a downstream analysis step.

**Prior art and differentiation.** `TO WRITE: 3–4 paragraphs differentiating from (i) AI model-monitoring vendors, (ii) blockchain-based provenance proposals, (iii) academic work on verifiable ML (e.g., zkML, SNARK-based proofs for inference), (iv) NIST RMF tooling. Cite specific papers and products.`

### 2.3 R&D Plan for Phase I (Milestones)

With a Phase I award of up to $275,000 over 12 months, Vernen will execute four concrete R&D milestones. Each milestone is paired with an objective technical acceptance criterion.

**Milestone 1 — Federation Peer Recruitment and Hardened Witness Protocol (months 1–3).**
Extend Layer 8 from its current single-peer prototype to a multi-peer federation of 3–5 independent witnesses, including at least one academic partner. Harden the witness handshake, signature scheme, and replay-attack defenses. Publish the federation protocol spec as a versioned RFC under CC0.
*Acceptance criterion:* 3 independent witnesses (not operated by Vernen) successfully co-sign a live audit finding; replay and forgery tests pass an external security review. `[NEEDS: named academic partner — candidates: computer science departments with trustworthy-systems labs.]`

**Milestone 2 — Formal Proof-of-Execution for Individual Records (months 3–7).**
Research and prototype a succinct, zero-knowledge proof (SNARK or STARK) that a specific execution record belongs to a specific anchored Merkle tree without revealing the contents of other records. Evaluate performance, proof size, and verification time against real production workloads.
*Acceptance criterion:* A working prototype that produces a < 10 KB proof verifiable in < 100 ms on commodity hardware, for records drawn from production execution logs.

**Milestone 3 — NIST AI RMF 1.0 Attestation Generator (months 4–9).**
Extend the existing NIST AI RMF mapping (`platform/docs/NIST_AI_RMF_MAPPING.md`) into an automated attestation generator that produces a machine-readable, cryptographically signed AI RMF compliance report for a given deployment. Align output format with NIST OSCAL where feasible.
*Acceptance criterion:* An OSCAL-compatible attestation document generated automatically from production logs, validated by at least one independent reviewer with NIST RMF expertise.

**Milestone 4 — Document Vision Integration and Structural Forensic Extension (months 6–12).**
Integrate document vision (OCR + layout) into the Layer 7 structural forensic analysis pipeline so that native image-only documents can be subjected to temporal-paradox and unconscionability screens. Benchmark against the existing blind evaluation corpus (27 findings).
*Acceptance criterion:* Extended pipeline reproduces the 27/27 blind eval result when source documents are supplied as scanned images rather than text, with no additional human preprocessing.

**Cross-milestone deliverables.** (a) A published Phase I technical report. (b) Updated open reference implementation (CC0). (c) An independently executed red-team evaluation of the federation protocol. (d) A Phase II proposal informed by Phase I findings.

### 2.4 Technical Feasibility

Feasibility is not hypothetical. The core verification stack is already in production:

- **Deployment:** compliance.vernenlegal.com, live since 2026-03-15.
- **Scale:** approximately 92,000 lines of TypeScript, 470+ API endpoints, 3.13 MB bundle (638 KB gzipped), zero production npm dependencies.
- **Federation:** first cross-witness signature operational as of 2026-04-07T22:56:14Z.
- **Blind evaluation:** 4-of-4 pass with 27-of-27 expected findings detected on a blind corpus constructed by an independent reviewer.
- **Security posture:** NIST SP 800-53 Rev. 5 SSP self-attestation draft complete; UFW deny-incoming baseline; no exposed secrets at last audit.
- **Open protocol:** public protocol repository under CC0.

Phase I work therefore does *not* require proving that the underlying architecture can function. It requires research to extend specific layers (8 and 7) and to formalize the proof-of-execution primitive (Milestone 2). The primary technical risks are (i) SNARK proof-generation cost at production scale and (ii) coordinating independent federation witnesses; Milestones 1 and 2 are specifically designed to surface and mitigate these risks.

### 2.5 Commercial Opportunity

**Three market segments.**

1. **Federal compliance and procurement oversight.** OIG offices, GAO, agency inspectors, and federal compliance consultants need verifiable audit trails for AI-assisted work. Vernen's forensic audit offering is already operating in this segment at $7,500 per deep forensic scan. `TO WRITE: TAM estimate citing federal AI procurement spend and compliance services market.`
2. **Legal technology and evidentiary AI.** Courts, legal services organizations, and law firms face the *Mata v. Avianca* problem: AI-generated work product that cannot be verified. Verification-as-a-service is a natural product.
3. **Trustworthy AI infrastructure for regulated industries.** Healthcare, financial services, and critical infrastructure operators subject to NIST AI RMF and sector-specific AI governance rules need attestation tooling.

**Customer discovery to date.** `TO WRITE / TO GATHER: summarize real conversations held with prospective customers. Do not invent commitments. As of 2026-04-07, active outreach in progress with BayLegal (legal aid partnership), Anthropic (infrastructure partnership track), and direct federal forensic audit engagements under the Vernen Forensic Audit Service Agreement template (platform/Desktop/Vernen_Forensic_Audit_Service_Agreement_TEMPLATE.md).`

### 2.6 The Team

**Principal Investigator: Michael Hartmann.** Founder and sole technical lead of Vernen Legal Compliance. Journeyman plumber, UA Local 342 (Plumbers, Steamfitters and Refrigeration Fitters). Michael built the entire Vernen platform — approximately 92,000 lines of TypeScript, 470+ API endpoints, the eight-layer verification protocol, and the production deployment — through conversational development using Claude, beginning in February 2026.

**Why the plumber-built-this story is a strength, not a weakness.** NSF SBIR exists precisely to fund technically rigorous work by small businesses that would not otherwise receive venture capital. The trade-craft ethic of UA Local 342 — *"do it right the first time"* — is the operating principle behind the eight-layer verification protocol. The decision to make every AI execution cryptographically verifiable is the software equivalent of a pressure-tested joint: the point is not that you trust the installer, the point is that the joint holds under test regardless of who installed it. The fact that a working union plumber produced verifiable AI infrastructure through conversational development is itself empirical evidence for one of the project's core claims: that AI tooling, if held to rigorous verification standards, broadens who can contribute to high-assurance software.

**Technical advisory and collaboration.** `[NEEDS: named academic collaborators, industry advisors, and any sub-awardees. Do not list anyone without their written consent.]`

### 2.7 Intellectual Property

The Vernen verification protocol is published under CC0 (public domain dedication). This is a deliberate choice: verifiable AI infrastructure produces value through adoption and independent witnessing, not through secrecy. The IP strategy for commercial sustainability is based on (a) trademarks (16 common-law marks established 2026-03-15, including CITIZEN); (b) trade-secret operational know-how (the forensic audit methodology, the blind-eval corpus construction process, customer-facing deliverable templates); (c) the operational federation network itself as a defensible moat; and (d) first-mover credibility with federal buyers. No patent filings are planned for Phase I work; the reference implementation will remain CC0 to maximize adoption.

---

## 3. References Cited

`TO GATHER.` At minimum, include:

- NIST AI RMF 1.0 and Generative AI Profile.
- NIST SP 800-53 Rev. 5.
- NIST OSCAL specification.
- OMB M-24-10 and successor AI memos in force at filing time.
- *Mata v. Avianca* and subsequent AI-hallucination case law.
- Academic work on zkML / SNARK-based ML inference verification.
- Academic and practitioner work on append-only logs and transparency logs (Certificate Transparency; Google Trillian; sigstore / Rekor).
- Relevant GAO/OIG reports on federal AI use.
- Vernen internal artifacts cited by path (treated as supporting documents, not formal references).

`[NEEDS: full citation list in NSF-acceptable format.]`

---

## 4. Biographical Sketches

NSF requires the SciENcv-generated biosketch format for all senior personnel.

**Michael Hartmann — PI.**

- **Professional preparation.** `[NEEDS: education history; trade apprenticeship and journeyman certifications via UA Local 342.]`
- **Appointments.** Founder, Vernen Legal Compliance (2026–present). Journeyman Plumber, UA Local 342 (dates `[NEEDS]`).
- **Products — Most closely related to proposed project:**
  1. Vernen Verifiability Architecture (2026) — `platform/docs/VERIFIABILITY_ARCHITECTURE.md`
  2. Vernen Federation Protocol (2026) — `platform/docs/FEDERATION_PROTOCOL.md`
  3. Layer 7 Structural Forensic Analysis (2026) — `platform/docs/LAYER_7_STRUCTURAL_FORENSIC_ANALYSIS.md`
  4. NIST AI RMF Mapping (2026) — `platform/docs/NIST_AI_RMF_MAPPING.md`
  5. Vernen production deployment (2026) — compliance.vernenlegal.com
- **Products — Other significant:** `[NEEDS: any prior publications, public speaking, or professional credentials.]`
- **Synergistic activities.** Open-source publication of the verification protocol under CC0; blind-evaluation methodology; public NIST AI RMF crosswalk.

Generate via SciENcv and attach as PDF at submission time.

---

## 5. Budget and Budget Justification

NSF SBIR Phase I maximum is up to $275,000 (verify ceiling in the active solicitation).

### 5.1 Summary Budget (placeholder)

| Category | Amount | Notes |
|---|---|---|
| A. Senior Personnel (PI salary) | `[NEEDS]` | PI effort: target ~6 calendar months; NSF salary cap applies. |
| B. Other Personnel | `[NEEDS]` | Any sub-contracted labor; confirm NSF sub-award caps. |
| C. Fringe Benefits | `[NEEDS: rate]` | Must be documented and reasonable for a single-member LLC. |
| D. Equipment | $0 planned | All development runs on existing Cloudflare Workers infra + laptop. Equipment purchases > $5,000 would need justification. |
| E. Travel | `[NEEDS]` | Include NSF SBIR PI kickoff travel (required in many cohorts) and one customer-discovery trip. |
| F. Participant Support | $0 | Not applicable. |
| G. Other Direct Costs | `[NEEDS]` | Cloudflare / Workers / D1 usage; domain; external security review; independent red-team for Milestone 1; potential sub-award to academic partner for federation witness; publication and conference fees. |
| H. Total Direct Costs | `[NEEDS]` | Sum of A–G. |
| I. Indirect Costs | `[NEEDS: rate]` | No federally negotiated indirect rate; de minimis 10% MTDC may apply. Verify current NSF policy. |
| J. Total | ≤ $275,000 | Must not exceed solicitation ceiling. |

### 5.2 Budget Justification (narrative)

`TO WRITE.` For each line, justify:
- **PI salary:** Michael Hartmann's time on Milestones 1–4. Effort distribution across milestones. NSF salary cap compliance. `[NEEDS: actual salary basis; must be defensible if audited.]`
- **Fringe:** benefit rate basis. `[NEEDS: rate calculation.]`
- **Sub-award / academic partner:** witness node operation and independent evaluation for Milestone 1. `[NEEDS: partner and statement of work.]`
- **External security review:** one paid independent red-team evaluation for Milestone 1 acceptance criterion.
- **Cloud infrastructure:** Cloudflare Workers, D1, R2, and Pages line items based on current production usage plus expected Phase I workloads.
- **Travel:** NSF SBIR PI meeting (if required); one customer-discovery visit. No conference tourism.
- **No equipment purchases.**
- **Indirect costs:** rate and basis.

---

## 6. Current and Pending Support

- **Current federal support:** **None.** Vernen has not previously received federal funding and has no current federal awards.
- **Pending federal support:** `TO UPDATE at submission time.` If other federal proposals are pending (e.g., other SBIR topics, LSC TIG, NIH SBIR), list them here per NSF format.
- **Non-federal support:** `[NEEDS: any private grants, fellowships, or in-kind support at the time of submission.]`
- **Overlap statement:** Confirm no scientific, budgetary, or commitment overlap between this proposal and any other pending or current support.

---

## 7. Facilities, Equipment, and Other Resources

**Computing and cloud infrastructure.** Vernen's production deployment runs on Cloudflare Workers, D1 (SQLite), R2 (object storage), and Pages, with a public GitHub repository used as an external anchor for daily Merkle roots. This infrastructure is already provisioned, in production, and serving live forensic audit workloads.

**Software assets.** The Vernen platform codebase (~92,000 lines TypeScript, 470+ API endpoints, 3.13 MB bundle, zero production npm dependencies) and its documentation (`platform/docs/`) are available to the project from day one. The eight-layer verification protocol is already operational; Phase I work extends rather than creates it.

**Physical facilities.** Home-office development environment in California. No wet-lab or specialized instrumentation is required for the proposed research.

**Security baseline.** System security baseline established 2026-03-18: UFW deny-incoming default, blacklisted unstable WWAN hardware, secret scanning on the public repo. NIST SP 800-53 Rev. 5 SSP self-attestation draft on file.

**Data and evaluation corpora.** The blind-evaluation corpus used to validate the 4-of-4 / 27-of-27 result is retained and available for Phase I regression testing.

**Resources that must be obtained during Phase I.** (i) A named academic federation partner to operate an independent witness node (Milestone 1). (ii) A paid independent security reviewer for Milestone 1 acceptance. (iii) A NIST AI RMF subject-matter reviewer for Milestone 3 acceptance.

---

## 8. Data Management Plan

**Types of data.** The project will generate (i) execution records from the Vernen verification protocol, (ii) anchored Merkle roots published to GitHub, (iii) federation witness signatures, (iv) synthetic evaluation corpora, and (v) a NIST RMF attestation corpus (Milestone 3). The project will *not* handle customer PII, protected health information, or classified material during Phase I; any customer engagements that involve sensitive data will be conducted under separate service agreements outside the scope of Phase I research.

**Data standards.** Execution records are append-only, hash-chained, Merkle-aggregated, and externally anchored. Attestation outputs (Milestone 3) will target NIST OSCAL. Federation signatures follow the Vernen Federation Protocol RFC (to be versioned and published in Milestone 1).

**Access, sharing, and re-use.** The reference implementation and protocol documentation will be published under CC0. Synthetic evaluation corpora will be published under CC0 with documented construction methodology. Non-synthetic customer data will not be shared.

**Archiving and preservation.** GitHub public repository serves as the durable anchor. Cloudflare R2 stores the underlying execution logs. A mirror of the public protocol repository will be maintained on at least one independent archival host. `[NEEDS: confirm mirror host.]`

**Privacy and IRB.** No human-subjects research is proposed in Phase I. If Phase I produces findings that would motivate a human-subjects study in Phase II, IRB review will be obtained at that time.

---

## 9. Postdoctoral Mentoring Plan

**Not applicable.** No postdoctoral researchers are included in the Phase I budget. If a postdoctoral researcher is added by amendment or in Phase II, a full mentoring plan will be submitted at that time. This section is included here only to document that the requirement has been considered.

---

## 10. Letters of Support

NSF SBIR strongly encourages letters from prospective customers confirming that the proposed innovation would address a real problem and that they would evaluate or pilot the technology if it is built. Letters do not constitute purchase commitments but must be genuine.

`[NEEDS: named customers willing to sign letters of support.]` Candidate categories (do not list anyone who has not confirmed):

- A federal OIG or agency compliance office interested in verifiable AI audit trails.
- A legal services organization (e.g., BayLegal — ongoing partnership conversation) willing to pilot verifiable AI-assisted drafting.
- An academic trustworthy-systems lab willing to operate a federation witness node (Milestone 1).
- A state or local government AI governance office.
- An enterprise in a NIST AI RMF–regulated sector (healthcare, financial services).

**Hard rule: do not submit fabricated or ghostwritten letters.** Every letter must be drafted by the signer or genuinely approved by the signer in writing.

---

## 11. Commercialization Plan (separate document, 5–10 pages)

### 11.1 Market Analysis

**Segment 1 — Federal compliance and oversight.** Vernen is already generating revenue in this segment through forensic compliance audit engagements at $7,500 per deep scan (see `Desktop/Vernen_Forensic_Audit_Service_Agreement_TEMPLATE.md` and `Desktop/Vernen_Deep_Forensic_Scan_OnePager.md`). The buyer is an agency, an OIG, a compliance consultancy, or a legal team investigating a counterparty. The pain point is that current compliance reviews rely on unverifiable narrative reports; Vernen delivers a cryptographically verifiable finding set. `TO WRITE: TAM/SAM/SOM estimate citing GAO figures on federal compliance and oversight spend.`

**Segment 2 — Legal technology and evidentiary AI.** Post-*Mata v. Avianca*, courts and law firms need verifiable AI execution records. Vernen's protocol produces exactly that. Revenue model in this segment is verification-as-a-service (subscription or per-matter) plus professional services for high-stakes matters.

**Segment 3 — Trustworthy AI infrastructure for regulated industries.** NIST AI RMF 1.0 adoption is accelerating; the OMB M-24-10 line of AI procurement guidance makes verifiable controls a de facto procurement requirement for federal contractors. Vernen's attestation generator (Milestone 3) is designed for this buyer.

**Competitive landscape.** `TO WRITE: 2–3 paragraphs distinguishing Vernen from (a) model-monitoring vendors, (b) AI observability platforms, (c) blockchain-provenance proposals, (d) academic zkML projects, and (e) general-purpose audit / GRC platforms.`

### 11.2 Revenue Model

Vernen's revenue model is **professional services priced around verifiable deliverables**, not software subscriptions. The founder's operating principle (documented in `MEMORY.md: feedback_info_is_free.md`) is that information and reports are free; revenue comes from the professional-services engagement that produces the verified finding set.

- **Forensic Audit Engagement — $7,500 per deep scan.** Current offering. Produces a verifiable finding set delivered under the Vernen Forensic Audit Service Agreement template. Margin is high because the underlying platform is already built; incremental cost per engagement is analyst time.
- **Enterprise compliance attestation — `[NEEDS: price anchor]`.** Milestone 3 output. Target customer: a federal contractor or regulated enterprise that needs a signed, OSCAL-format AI RMF attestation for procurement or audit.
- **Federation witness operation — long-term infrastructure pricing.** As the federation matures, Vernen operates a paid witness-of-record tier for counterparties that need independent signatures on their AI execution records.
- **Federal reference infrastructure — Phase III.** Long-term vision: Vernen's protocol (or a federally adopted fork of it) becomes a reference verification substrate under a federal contract vehicle. This is explicitly not assumed in the Phase I business case.

### 11.3 Customer Discovery Summary

`TO WRITE / TO GATHER.` Summarize real conversations held to date. As of 2026-04-07, known real threads include:

- Ongoing partnership conversation with BayLegal (legal aid).
- Outreach draft to Anthropic (infrastructure partnership / Anthology Fund track).
- Direct engagement conversations under the Forensic Audit Service Agreement template.
- Federal strategy document (`Desktop/Vernen_Federal_Strategy.md`).

Do not overstate any of these. Do not represent exploratory conversations as commitments.

### 11.4 Path from Phase I to Phase II to Phase III

**Phase I (Milestones 1–4).** Extend the verification protocol to federation-hardened, formally proofed, NIST-attested, and document-vision-capable status. Build the evidence base for Phase II.

**Phase II (proposed, $1M–$2M range; verify active ceiling at filing).** Scale the federation to 10+ independent witnesses including government partners. Build a production-grade OSCAL attestation service. Deliver a reference implementation that any federal agency can deploy internally. Conduct paid pilots with federal and regulated-industry customers.

**Phase III (non-SBIR revenue).** Scale paid engagements, operate the federation as durable infrastructure, and pursue federal contract vehicles for verifiable AI infrastructure. Phase III is explicitly the commercialization phase; NSF funding ends at Phase II.

**Non-dilutive capital stack alongside SBIR.** `[NEEDS: confirm at submission time.]` Candidates under consideration per `project_grant_strategy.md`: Anthropic Startup / Anthology / Partner Network; Google.org; LSC TIG; Google for Startups. SBIR awards do not preclude these.

### 11.5 Risks and Mitigations

- **Technical risk — SNARK performance (Milestone 2).** Mitigation: scoped as research milestone with objective acceptance criterion; if the criterion is not met, Phase I still delivers a characterized performance envelope and informs Phase II design.
- **Federation risk — witness recruitment (Milestone 1).** Mitigation: academic partners have low activation cost; commercial witnesses are not required in Phase I.
- **Market risk — federal procurement timelines.** Mitigation: Vernen already has paying forensic-audit customers at $7,500; revenue does not depend on federal procurement closing within the Phase I performance window.
- **Founder concentration risk.** Single-PI dependence is a real risk. Mitigation: open-source the protocol under CC0, document every layer, and build a first external contributor during Phase I.
- **Conflict-of-interest risk.** The founder is an active pro se federal § 1983 litigant (see `project_federal_complaint_draft.md`). This must be disclosed to NSF in the conflicts section; it does not disqualify the proposal but requires a clean firewall between the litigation and the federally funded research. `TO WRITE: disclosure language.`

---

## 12. Appendices and Attachments Checklist

- [ ] Project Summary (1 page) — Section 1 above, reformatted to NSF template.
- [ ] Project Description (≤ 15 pages) — Section 2 above, expanded.
- [ ] References Cited — Section 3.
- [ ] Biographical Sketch (SciENcv PDF) — Section 4.
- [ ] Budget (NSF form) and Budget Justification narrative — Section 5.
- [ ] Current and Pending Support (NSF form) — Section 6.
- [ ] Facilities, Equipment, and Other Resources — Section 7.
- [ ] Data Management Plan (≤ 2 pages) — Section 8.
- [ ] Postdoctoral Mentoring Plan — Section 9 (not applicable).
- [ ] Letters of Support — Section 10.
- [ ] Commercialization Plan (separate document) — Section 11.
- [ ] Conflicts of Interest disclosure (including § 1983 litigation firewall language).
- [ ] SBIR eligibility certifications (small business concern, ownership, PI employment).

---

## 13. Honesty Footer (Layer 6 — Conscientious Identity)

This outline is a pre-fill skeleton, not a submission draft. In accordance with the Layer 6 conscientious-identity ethic built into the Vernen protocol itself, the author of this draft (a Claude sub-agent) explicitly records the following:

- **What is known to be real:** the production deployment at compliance.vernenlegal.com; the eight-layer protocol as documented in `platform/docs/`; the first cross-witness federation signature at 2026-04-07T22:56:14Z; the 4/4 blind eval with 27/27 findings; the $7,500 forensic audit engagement price; the CC0 public protocol; the founder's UA Local 342 membership; the fact that the codebase was authored through conversational development with Claude.
- **What must be gathered before submission:** every `[NEEDS: ...]` marker in this file. In particular: named letters of support, academic federation partner, salary and indirect-cost basis, and customer-discovery specifics.
- **What must not be invented:** letters of support, customer commitments, partnership agreements, prior federal funding, award amounts, and any academic or industry affiliations for named individuals who have not consented.
- **What this proposal does not claim:** that Vernen is currently a federally certified or federally endorsed system; that the protocol has been formally adopted by any government body; that any specific federal agency has committed to pilot the technology; that the author of this outline (a sub-agent) has independent expert knowledge of every referenced body of prior art.

If any part of this outline is carried forward into a live submission, the submitter (Michael Hartmann) must personally verify each factual claim and replace each `[NEEDS: ...]` and `TO WRITE` marker with verified content.

*End of pre-fill outline.*

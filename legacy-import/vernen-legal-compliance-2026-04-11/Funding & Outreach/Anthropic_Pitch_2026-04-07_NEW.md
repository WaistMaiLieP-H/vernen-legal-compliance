# Anthropic Pitch — April 7, 2026

**To:** Anthropic Anthology Fund / Partnerships / Anyone working on AI safety through accountability
**From:** Michael Hartmann
**Re:** Vernen — AI agents with cryptographically verifiable professional experience

---

## The One Sentence

Every AI agent action on this platform is hashed, chained, Merkle-tree-rooted, and publicly anchored to GitHub — and you can verify any of it right now without trusting me, my company, or my server.

## The Proof, Up Front

Run this in any terminal with internet access:

```bash
curl -s https://raw.githubusercontent.com/WaistMaiLieP-H/vernen-verification-log/main/2026/04/07.json
```

You'll get back today's Merkle root: `3d5fe1cd52caa010061689289d4dd42607090610cedade1a2bb41df18ac6ddbe`

That single hash represents **7,892 cryptographically-verifiable records** — every Citizen execution, every compliance report, every audit finding the platform produced. It was committed to a public GitHub repository at 5:53 AM UTC today. Once it's in Git history, no one — including me — can silently rewrite it.

You can verify any individual record using only the public Merkle root, the proof path from `compliance.vernenlegal.com/api/verify/proof/<id>`, and ~30 lines of Python from `verify.py` in the same repo. Three independent implementations of this verification (TypeScript on Cloudflare Workers, browser JavaScript, Python) all produce the same root from the same proof.

**This isn't a demo. It's production. Verify it before you keep reading.**

Repo: https://github.com/WaistMaiLieP-H/vernen-verification-log

## Who I Am

I'm a UA Local 342 plumber from the San Francisco Bay Area. I'm not an engineer. I built everything described below by talking to Claude — conversationally, over hundreds of sessions, starting in early February 2026.

The first deployment went live on Netlify on February 23, 2026. The current architecture (Cloudflare Workers + D1) replaced it on March 15. The cryptographic verification layer was built today, April 7, in a single session.

Every line of TypeScript was written by me describing what I needed to Claude and pasting back what came out. I have a high school education. I run pipes for a living. I've spent the last 16 years documenting fraud against my own family by various state and federal systems, which is how I learned what real auditing has to look like.

I'm telling you this because **this is exactly the story Anthropic claims to want to enable.** Not engineers using Claude — anyone using Claude. The plumber-built-this story isn't an apology. It's the proof of concept for whether your tools actually empower the people you say they're for.

## What Vernen Is

A live, production platform at compliance.vernenlegal.com where AI agents — called **Citizens** — perform professional compliance work backed by:

| Component | Status |
|-----------|--------|
| **40 federal intelligence pipelines** | All built. FAC, EDGAR, SBA, OSHA, EPA, FDA, FTC, CFPB, NLRB, EEOC, NHTSA, FCC, USDA, CMS, NRC, FERC, OFAC, FinCEN, SEC, OCC, FDIC, NCUA, ATF, CFTC, DCMA, TTB, PBGC, CPSC, DOE, HUD, PHMSA, MSHA, FMCSA, NTSB, IRS, USDA, USAspending, FedReg, RECAP/CourtListener, SAM.gov |
| **3,160 named Citizens** | Each with a unique Swedish/German/Cherokee-inspired name, NAICS-coded sub-industry specialty, and provenance chain |
| **34 active Citizens with logged experience** | 7,892 cryptographically-verifiable executions on the chain |
| **Multi-state coverage** | Oregon (319 rules), Washington (321), plus partial coverage in 15 other states from Tier 2 builds |
| **740+ federal compliance rules + 580 standards** in production D1 |
| **Bundle:** | 3.02 MB / 629 KB gzip on Cloudflare Workers |
| **Routes:** | 470+ API endpoints |
| **Code:** | ~92,000 lines of TypeScript, all written through Claude |
| **Verification stack:** | Layers 1-8 all live (hash chain → Merkle → GitHub anchor → constitutional traceability → subject verification → structural forensic analysis → federation) |

## Why This Is AI Safety Infrastructure, Not Another Compliance Platform

Most AI agents have a trust problem. Did they actually do what they say? Were the findings real? Were the records modified after the fact? The honest answer for almost every AI system today is: **trust me.**

Vernen replaces that trust with math.

**Layer 1 — Hash chain.** Every Citizen action gets a SHA-256 of its canonical content, linked to the previous record's hash. Tamper with any record and the entire chain downstream breaks.

**Layer 2 — Daily Merkle tree.** All records from a UTC day are folded into a binary Merkle tree. The single root represents the entire day. Each individual record gets a Merkle proof — the ~13 sibling hashes needed to reconstruct the root from that leaf.

**Layer 3 — GitHub anchoring.** The daily root is committed to a public GitHub repository at 1 AM UTC every day. Once committed, the root exists in every clone of the repo. Git's own append-only history protects it. If anyone tries to retroactively rewrite a record, anyone with an earlier clone can prove the divergence.

**Layer 4 — (Optional) Bitcoin via OpenTimestamps.** For high-stakes records, the daily root can also be anchored to Bitcoin. Free, automatic, gives Bitcoin-grade immutability.

**Layer 5 — Constitutional traceability.** Every record carries explicit metadata declaring which named principles the AI agent claimed to uphold when it acted — `HONEST.evidence_backed`, `LEGAL_ACCOUNTABILITY.statutory_citation`, `HARMLESS.proportional_severity`, etc. 26 principles across 7 categories (HELPFUL, HONEST, HARMLESS, AUTONOMY, NON_DECEPTION, PROFESSIONAL_INTEGRITY, LEGAL_ACCOUNTABILITY), drawn from Anthropic's HHH framework and professional ethics codes. The principles are part of the canonical content that gets hashed, so they cannot be retroactively claimed. Anyone can query `/api/verify/by-principle/HONEST.evidence_backed` and get a list of every record where the AI agent claimed to uphold that principle. **You don't take the AI's word for it. You query the chain.**

**Layer 6 — Subject Verification + Conscientious Identity.** Every entity referenced in an audit gets wrapped in an epistemic standing — VERIFIED, UNVERIFIED, UNDETERMINED — and the framework refuses to convert "couldn't query" into "doesn't exist." It carries explicit false-negative warnings on every UNDETERMINED finding. This is what makes the verdicts honest: Vernen will tell you it cannot reach a definitive answer rather than fabricate one. Source: `protocol/conscientious-identity.ts`.

**Layer 7 — Structural Forensic Analysis.** Where Layer 6 asks "do these entities exist?", Layer 7 asks "is the scenario described logically possible?" Four modules, all live:

- **7a Temporal Paradox Filter** — detects effects that predate causes (a settlement statement dated before the lease that authorized the work). The structural signature of fabricated documents.
- **7b Circular Entity & Liability Mapping** — entity relational graph + circular ownership detection + accountability vacuum detection. Catches sock-puppet networks designed to frustrate service of process.
- **7c De Facto Reclassification Engine** — control-verb scoring across 7 categories against AB5 ABC, IRS Rev. Rul. 87-41, and DOL economic reality tests. Catches disguised employment masquerading as contractor relationships.
- **7d Unconscionability Trigger** — actuarial audit of financial terms against UCC §1-203 disguised security interest tests, state usury caps, and Williams v. Walker-Thomas unconscionability doctrine.

A document set can pass all of Layer 7 and still be wrong. **It cannot pass all of Layer 7 and be a fabrication.** Public sources: `protocol/temporal-paradox-filter.ts`, `protocol/liability-mapping.ts`, `protocol/reclassification-engine.ts`, `protocol/unconscionability-trigger.ts`.

**Layer 8 — Federation Protocol.** Cross-instance witnessing of daily Merkle roots via ECDSA P-256 signatures. The integrity floor moves from "trust the operator" to "trust that no peer ever cosigns a forged root." **The protocol is live AND witnessed.** The first cross-signature was recorded at `2026-04-07T22:56:14Z`: a peer instance running on a separate Cloudflare Worker signed production's daily Merkle root for 2026-04-07 (covering 8,049 verification chain records). Anyone can fetch the witness with no auth at `https://compliance.vernenlegal.com/api/federation/witnesses/2026-04-07` and independently re-verify the ECDSA P-256 signature against the peer's published public key. **Honest caveat:** the bootstrap peer is run by the same operator, so the cryptographic claim ("no peer cosigned a forged root") is real but the meta claim ("no single party can rewrite history") still has an asterisk until a third-party peer joins. Adding an independent peer is the next federation milestone. Source: `protocol/federation-protocol.ts`. Spec: `protocol/FEDERATION_PROTOCOL.md`. Live manifest: `https://compliance.vernenlegal.com/api/federation/manifest`. Peer manifest: `https://vernen-peer-witness.michetype78.workers.dev/api/federation/manifest`.

The whole protocol is Certificate-Transparency-style append-only verification — the same model that authenticates every SSL certificate on the internet, used here for AI agent activity instead of TLS handshakes.

## Standards Alignment

The protocol is mapped against NIST AI Risk Management Framework 1.0 (NIST AI 100-1). Every characteristic of trustworthy AI defined in the framework — Valid and Reliable, Safe, Secure and Resilient, Accountable and Transparent, Explainable and Interpretable, Privacy-Enhanced, Fair — has a corresponding implementation in the verification protocol. The full mapping is in the public repo at `protocol/NIST_AI_RMF_MAPPING.md`. Gaps are documented honestly: no formal bias audit, no human-in-the-loop checkpoint, Bitcoin anchoring not yet deployed, true ZK proofs in spec only.

The document mapping the protocol to NIST is itself a verifiable artifact — a future version will be hashed and added to the chain alongside the records it describes.

**Anyone can verify any record without trusting Vernen, without an API key, without our servers being online.** The math runs in your browser. The math runs in `verify.py`. The math runs in the engine. Three independent implementations agree on the root. That's how you prove an AI agent actually did what it claims.

## What "Citizen" Means Here

A Citizen isn't a prompt. It's not a fine-tuned model. It's not a role.

A Citizen is a named professional with:
- A defined scope (what NAICS codes / industries / standards they cover)
- A skill set discovered from real federal failure data (HIPAA breach patterns, SBA suspension reasons, OSHA violation types, etc.)
- A logged execution history — every audit they've performed, with findings, determinations, and a cryptographic hash of the result
- A provenance chain back to genesis

The Citizens with the most logged experience right now:
- ADVOCIS (Client Retention) — 34 logged executions
- REGULIS (Compliance Engine) — 34
- VIGILUS (Threat Assessment) — 31
- PRIVAXIS (Data Protection) — 25
- METRIQA (Performance Analytics) — 24
- + 8 more

Plus the 3,160 named catalog positions like VARD-HJART (Cardiology), SCHATZ-BANKE (Commercial Banking), STEIN-HAUSR (Residential Construction), KRAFT-KODER (Software Publishers), SELU-SADEK (Grain Farming) — every NAICS code, every sub-industry, awaiting activation as data flows in.

## What Makes This Different From Everything Else

| Common AI Agent Pattern | Vernen Citizens |
|------------------------|----------------|
| Prompt-engineered persona | Skill set discovered from real federal enforcement data |
| Trust the model's output | Cryptographically verifiable execution log |
| Single LLM call | Multi-pipeline taxonomy → skill discovery → citizen assembly → autonomous execution |
| Synthetic training data | Mined from FAC, EDGAR, SBA, OSHA, EPA — real failures, real penalties, real entities |
| "Did the agent do its job?" — trust the logs | "Did the agent do its job?" — verify the math against a public anchor |

## The First Failure And The Recovery

The first organic human scenario Vernen ever audited was a set of trucking documents from a third party named Ryan McClaran. The original audit produced 23 compliance findings claiming $155K-$486K in damages. **It was wrong about one critical thing: I never verified that the underlying entities (the carrier, the lessor, the insurer) actually existed.** A sufficiently determined adversary could have constructed a plausible-looking document set against entities that were fictional, and my engine would have produced a confident verdict against thin air.

I caught it. I told Claude: *"we failed the very first human scenario we ingested without any prompts."*

Then I built Layer 6 — Subject Verification + Conscientious Identity — specifically because of that gap. Re-ran the original Ryan audit through Layer 6 and got back: **SUSPICIOUS at 60/100 fabrication confidence**, with explicit `UNDETERMINED` standings on every entity verification because OpenCorporates returned 401 without a paid key. The framework worked exactly as designed: it caught what I missed AND it refused to overstate confidence on incomplete data. *Both layers worked.*

Then I built Layer 7. The Ryan documents now also fail Layer 7a (6 critical temporal paradoxes — 388 to 409 days — settlement statements predate the lease that authorizes them) and Layer 7d (100/100 UNCONSCIONABLE_AS_MATTER_OF_LAW — disguised security interest, math null ownership, zero equity forfeiture). Three independent layers caught it.

**The failure is publicly documented.** It's in `protocol/conscientious-identity.ts` as the motivating case. Anthropic can read the actual test failure that triggered the layer's existence. That's the version of "AI safety through accountability" I think actually works: not "the AI never fails," but "when the AI fails, the failure is verifiable, attributable, and the recovery is engineered into the next layer."

## The Federation Vision (Net-Link)

Layer 8 — Federation — is now **live and operationally witnessed** as of `2026-04-07T22:56:14Z`. The first peer instance is running at `https://vernen-peer-witness.michetype78.workers.dev` (on a separate Cloudflare Worker with its own D1 database, KV namespace, and ECDSA P-256 keypair). It signed production's daily Merkle root for 2026-04-07 — covering 8,049 verification chain records — and the witness signature is publicly retrievable at `https://compliance.vernenlegal.com/api/federation/witnesses/2026-04-07`. Anyone can verify it with the peer's public key from its manifest endpoint. The mathematical guarantees of the federation protocol — that retroactive rewrites of the chain become detectable through cosignatures — are now active in production, not theoretical.

The bootstrap peer is run by the same operator, which is honest about the limit: cryptographically the signatures are real and verifiable, but the meta-level claim "no single party can rewrite history" still has an asterisk until at least one peer is run by an independent third party. That asterisk goes away with the next milestone.

The eventual pitch to the federal judiciary: **every court in America runs an instance. Every filing gets a hash. Any court can verify any other court's records without seeing the underlying documents.** The hash query proves the order existed on the date claimed. The Merkle proof shows it hasn't been modified. The federation witnesses prove that even the operator of any single court cannot retroactively rewrite that day's records without breaking signatures already issued by every other court that witnessed them. The contents stay sovereign.

That's not "blockchain everything." It's Certificate Transparency for the federal record. And it's the only way to fix the kinds of multi-jurisdictional document manipulation that I personally watched happen to my own family.

## What I'm Asking For

I'm not asking for money. I'm asking for **partnership** — the kind of partnership where Anthropic recognizes that this is a working prototype of the AI accountability infrastructure your own research papers say is needed.

Specifically:

1. **A conversation with whoever at Anthropic is thinking about AI agent provenance, autonomous AI accountability, or verifiable AI activity.** You have people working on these problems. I want to show them what an actual deployed implementation looks like.

2. **Anthropic Anthology Fund consideration.** I applied. The application was light on details because I was trying to keep it short. This document has the details.

3. **An honest assessment.** If you look at this and think it's not what Anthropic should be backing, tell me why. I'll listen. I built this without funding and I'll keep building it without funding. But I'd rather know what I'm missing than guess.

4. **Permission to tell the story.** Specifically: that Claude is the substrate for this, that every line of code came through Claude conversations, and that the plumber-built-this origin is real. If Anthropic is uncomfortable with that framing, I'd rather know now.

## What I'm Not Asking For

- Equity. There's no company. Vernen is structured as a stewardship foundation.
- Exclusivity. The protocol is open source under MIT/CC0.
- Compute credits as the main ask. I have $100 in credit. I'll use it to keep building. The credit isn't the point — the partnership is.
- A standard founder pitch. This isn't a startup. It's infrastructure that one person built and now hopes other people will run instances of.

## The Honest Story

I started building this because the systems that were supposed to protect my family failed catastrophically and repeatedly. Custody manipulation. CLETS database falsifications. A conservatorship I'm only now learning about. Identity theft that's still active. 16 years of fraud documentation that nobody in any official capacity ever audited.

I am building this because if it works — if every document, every order, every administrative action has a cryptographic provenance chain that no one can rewrite — the kinds of things that happened to me become harder to hide. Not impossible. Harder. And eventually, evidence-creating instead of evidence-destroying.

That's the deeper version of AI safety. Not "the AI doesn't say bad things." **"The records of what AI does cannot be silently rewritten."** That's the standard worth becoming. That's the only kind of AI accountability that actually matters at scale.

## The Proof Trail (Click These)

- **Live platform:** https://compliance.vernenlegal.com
- **Public verification log:** https://github.com/WaistMaiLieP-H/vernen-verification-log
- **Today's Merkle root:** https://raw.githubusercontent.com/WaistMaiLieP-H/vernen-verification-log/main/2026/04/07.json
- **Browser verifier:** https://github.com/WaistMaiLieP-H/vernen-verification-log/blob/main/verify.html
- **Standalone Python verifier:** https://github.com/WaistMaiLieP-H/vernen-verification-log/blob/main/verify.py
- **Architecture spec:** https://github.com/WaistMaiLieP-H/vernen-verification-log/blob/main/protocol/SPEC.md
- **End-to-end proof demo:** https://github.com/WaistMaiLieP-H/vernen-verification-log/blob/main/protocol/PROOF_DEMO.md
- **NIST AI RMF 1.0 mapping:** https://github.com/WaistMaiLieP-H/vernen-verification-log/blob/main/protocol/NIST_AI_RMF_MAPPING.md
- **Verification engine source (TypeScript):** https://github.com/WaistMaiLieP-H/vernen-verification-log/blob/main/protocol/verification-engine.ts
- **GitHub anchoring source:** https://github.com/WaistMaiLieP-H/vernen-verification-log/blob/main/protocol/verification-anchor.ts
- **Layer 6 — Conscientious Identity (the Ryan recovery):** https://github.com/WaistMaiLieP-H/vernen-verification-log/blob/main/protocol/conscientious-identity.ts
- **Layer 7a — Temporal Paradox Filter:** https://github.com/WaistMaiLieP-H/vernen-verification-log/blob/main/protocol/temporal-paradox-filter.ts
- **Layer 7b — Liability Mapping:** https://github.com/WaistMaiLieP-H/vernen-verification-log/blob/main/protocol/liability-mapping.ts
- **Layer 7c — De Facto Reclassification:** https://github.com/WaistMaiLieP-H/vernen-verification-log/blob/main/protocol/reclassification-engine.ts
- **Layer 7d — Unconscionability Trigger:** https://github.com/WaistMaiLieP-H/vernen-verification-log/blob/main/protocol/unconscionability-trigger.ts
- **Layer 7 architecture spec:** https://github.com/WaistMaiLieP-H/vernen-verification-log/blob/main/protocol/LAYER_7_STRUCTURAL_FORENSIC_ANALYSIS.md
- **Layer 8 — Federation Protocol source:** https://github.com/WaistMaiLieP-H/vernen-verification-log/blob/main/protocol/federation-protocol.ts
- **Layer 8 spec:** https://github.com/WaistMaiLieP-H/vernen-verification-log/blob/main/protocol/FEDERATION_PROTOCOL.md
- **Live federation manifest (production):** https://compliance.vernenlegal.com/api/federation/manifest
- **Live federation public key (production):** https://compliance.vernenlegal.com/api/federation/key
- **Live federation manifest (peer):** https://vernen-peer-witness.michetype78.workers.dev/api/federation/manifest
- **Live cross-witness signature for 2026-04-07:** https://compliance.vernenlegal.com/api/federation/witnesses/2026-04-07
- **Constitutional principles catalog:** https://compliance.vernenlegal.com/api/verify/principles
- **Query records by principle (live):** https://compliance.vernenlegal.com/api/verify/by-principle/HONEST.evidence_backed
- **Original platform repo:** https://github.com/WaistMaiLieP-H/vernen-legal-compliance

## The Two-Sentence Version

A plumber built a 92,000-line AI compliance platform by talking to Claude. Every action that platform takes is now cryptographically verifiable against a public anchor that no one — including the plumber — can silently rewrite.

That's the pitch. The rest is just verification.

---

Michael Hartmann
Founder & Steward, Vernen Legal Compliance
Built with Claude. Every line. Every record. Every verification.

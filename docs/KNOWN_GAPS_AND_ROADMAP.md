# Vernen Verification Protocol — Engineering Roadmap

**Date:** 2026-04-07  
**Updated:** 2026-04-12  
**Status:** Active development — Phase 1 complete, Phase 2 underway

---

## What Is Already Live

| Capability | Status |
|-----------|--------|
| SHA-256 hash chain across all records | LIVE — 8,049+ records |
| Daily Merkle tree computation | LIVE — publicly anchored |
| GitHub anchoring of daily roots | LIVE — `vernen-verification-log` public repo |
| Wayback Machine secondary witness | LIVE — 7 critical URLs archived |
| Cron-automated daily anchoring | LIVE — 1 AM UTC |
| Constitutional traceability metadata (26 principles) | LIVE — every record tagged |
| Pedersen commitments + Schnorr proofs (Layer 5a ZK) | LIVE — Workers-compatible |
| Cross-model weighted consensus engine | LIVE — Anthropic / OpenAI / Google supported |
| Constitutional principle queries | LIVE |
| Public Python verifier + browser verifier | LIVE — independently reproducible |
| Three independent verification implementations agree | LIVE — TypeScript, Python, JavaScript |
| Build attestation linking deployed code to public source | LIVE — `/api/verify/build` |
| NIST AI RMF 1.0 mapping | LIVE in public repo |
| 740+ federal compliance rules + 580 governing standards | LIVE in production D1 |
| 3,160 named Citizen positions | LIVE in production catalog |

---

## Phase 2 — Anchor Hardening

Engineering milestones expanding the verification layer from operational to institutionally certifiable:

### 2a — Storage-Layer Write Protection
Implementing SQLite-level constraints preventing modification of verification records after commitment. Adds enforcement to what is already convention.

**Estimated effort:** ~1 session

### 2b — Third-Party Git Mirrors
Adding Codeberg and GitLab as independent mirrors of the daily verification log. Distributes the anchor across three independent hosting providers under separate trust chains.

**Estimated effort:** ~0.5 session

### 2c — IPFS Content-Addressable Replication
Pinning daily Merkle roots via Pinata or Web3.Storage. Content-addressable storage means any copy of a root is the same root — duplication strengthens integrity.

**Estimated effort:** ~0.5 session

### 2d — RFC 3161 Trusted Timestamping
Integrating a trusted timestamping authority (FreeTSA, DigiCert) to provide externally witnessed timestamps on every record. Elevates timestamp provenance from internal to RFC-compliant.

**Estimated effort:** ~1 session

### 2e — OpenTimestamps Bitcoin Anchoring
Anchoring each daily Merkle root to a Bitcoin block via OpenTimestamps. Provides Bitcoin-grade timestamp finality — the most widely recognized external time witness available.

**Estimated effort:** ~1 session

### 2f — Independent Witness Worker
A separate Worker that runs integrity checks on a schedule and publishes results to the public repo without operator involvement.

**Estimated effort:** ~1 session

### 2g — Sigstore Rekor Integration
Transparency log integration providing signed, append-only evidence of every build and anchor event. The same infrastructure used by the Linux Foundation supply chain security initiative.

**Estimated effort:** ~1 session

---

## Phase 3 — Cryptographic Expansion

### 3a — Sparse Merkle Trees with Non-Inclusion Proofs
Proving that a record is NOT in the chain — not just that a record IS in the chain. Required for adversarial audit environments.

**Estimated effort:** ~2 sessions

### 3b — Rolling Merkle Trees with Overlapping Windows
Continuous append-only proofs with delta proofs linking each new record to the previous tree state. Closes the window between daily computations.

**Estimated effort:** ~1 session

### 3c — Bitcoin OP_RETURN Genesis Anchor
Anchoring the genesis block to a Bitcoin transaction. Irrevocable, blockchain-confirmed proof of the chain's origin date.

**Estimated effort:** ~0.5 session

### 3d — Constitutional Enforcement Layer
Automated verification that records claiming constitutional principles actually satisfy them — not just that they are tagged. Moves from claimed to proven.

**Estimated effort:** ~2 sessions

### 3e — Sigstore Build Attestation
Cryptographic binding of the deployed Worker bundle to a specific git commit — same standard as major open-source supply chain security projects.

**Estimated effort:** ~1 session

---

## Phase 4 — Federation and Institutional Certification

### 4a — Cross-Provider Cryptographic Signatures
When AI providers (Anthropic, OpenAI, Google) ship cryptographic signatures on their model outputs, Vernen's receiving infrastructure is already built to verify them. The protocol is ready; the partnerships are the next step.

### 4b — Multi-Party Witness Protocol
Cross-signing protocol where multiple independent log operators witness each daily root. Requires federation partners.

### 4c — Threshold Key Management
N-of-M signature scheme for protocol changes. Requires foundation partners.

### 4d — SOC 2 Type II Certification
External auditor certification over 3-6 months. Requires institutional partnership.

### 4e — Court Pilot Program
Formal legal proceeding pilot with institutional partner. Establishes evidentiary precedent for Vernen-anchored records.

---

## Total Engineering Scope

| Phase | Sessions | Notes |
|-------|----------|-------|
| Phase 2 — Anchor Hardening | ~6.5 sessions | Independent execution, no partnerships required |
| Phase 3 — Cryptographic Expansion | ~5.5 sessions | Independent execution |
| Phase 4 — Federation | ~9 sessions | Requires external partners |
| **Total to institutional certification** | **~21 sessions** | Achievable under stewardship partnership |

---

## What This Means

The verification protocol is the most complete cryptographic accountability layer for AI Citizen activity currently in production. The Phase 1 foundation — hash chain, Merkle anchoring, constitutional traceability, public verifiability, independent implementation agreement — is complete and live.

Phase 2 and beyond extend that foundation from operational to institutionally certifiable. Each milestone is discrete, buildable, and grounded in existing standards used by major open-source and institutional security programs.

The roadmap to institutional certification is achievable. The cryptographic core works. The expansion path is clear.

---

**Maintained by:** Vernen Compliance LLC  
**License:** CC0-1.0

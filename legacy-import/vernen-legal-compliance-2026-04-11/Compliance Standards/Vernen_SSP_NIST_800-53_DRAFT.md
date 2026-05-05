# SYSTEM SECURITY PLAN — SELF-ATTESTATION DRAFT

**System Name:** Vernen Legal Compliance Platform
**System Identifier:** VERNEN-COMPLIANCE-PROD
**Document Version:** 1.0 (Self-Attestation Draft)
**Document Date:** 2026-04-07
**Author:** Michael Hartmann, Founder & Steward, Vernen Legal Compliance
**Framework:** NIST SP 800-53 Revision 5 (security and privacy controls)
**Categorization Reference:** NIST SP 800-60 / FIPS PUB 199
**Control Tailoring Baseline:** LOW

---

## ⚠️ READ THIS FIRST: WHAT THIS DOCUMENT IS AND IS NOT

**This document is a self-attestation draft. It is NOT an authorized System Security Plan.** It has not been assessed by a Third Party Assessment Organization (3PAO), it has not been signed by an Authorizing Official, and the system it describes does not currently hold an Authority to Operate (ATO) from any U.S. federal agency.

The purpose of this draft is:

1. To document, in NIST SP 800-53 Rev. 5 control language, how the Vernen Legal Compliance Platform was actually built — so that anyone evaluating Vernen against federal information system standards can see the alignment without reverse-engineering it from source code.

2. To serve as a credibility artifact in conversations with foundations, AI safety researchers, federal program managers, academic partners, and any future 3PAO engagement — by demonstrating that the system was architected against the federal security framework from the beginning, rather than retrofitted.

3. To provide an honest gap analysis identifying every control where Vernen's current implementation falls short of, would need to be assessed for, or is structurally incompatible with the requirements of an authorized SSP. The gap analysis is in **Appendix C**.

**A note about accuracy.** Every implementation description in Section 4 references real, currently-deployed code in the public protocol repository at `github.com/WaistMaiLieP-H/vernen-verification-log`. Any reader can verify the implementation by reading the source. This is not a marketing document. If a control description and the actual implementation diverge, the implementation governs and this document is wrong.

**A note about scope.** This document covers the Vernen Legal Compliance Platform deployed at `compliance.vernenlegal.com`. It does not cover any client systems, any external integrations beyond the documented interconnections, or any future federation peer instances run by parties other than Vernen.

**A note about authority.** Vernen Legal Compliance is currently structured as a stewardship enterprise without a formal legal entity. This is a known issue documented in Appendix C and is a prerequisite blocker for any actual federal authorization activity (CRADA, SAM.gov, FedRAMP package submission, ATO).

---

## TABLE OF CONTENTS

1. System Identification
2. System Characterization
3. Information Categorization (FIPS 199)
4. Security Control Implementation
   4.1. AC — Access Control
   4.2. AT — Awareness and Training
   4.3. AU — Audit and Accountability *(strongest family)*
   4.4. CA — Assessment, Authorization, and Monitoring
   4.5. CM — Configuration Management
   4.6. CP — Contingency Planning
   4.7. IA — Identification and Authentication
   4.8. IR — Incident Response
   4.9. MA — Maintenance
   4.10. MP — Media Protection
   4.11. PE — Physical and Environmental Protection *(inherited)*
   4.12. PL — Planning
   4.13. PM — Program Management
   4.14. PS — Personnel Security
   4.15. PT — PII Processing and Transparency
   4.16. RA — Risk Assessment *(Layer 7 implementation)*
   4.17. SA — System and Services Acquisition
   4.18. SC — System and Communications Protection
   4.19. SI — System and Information Integrity *(strongest family)*
   4.20. SR — Supply Chain Risk Management
5. Layer-to-Control Mapping Summary
6. Cloudflare Inheritance Analysis
7. Appendix A — Glossary
8. Appendix B — Acronyms
9. Appendix C — Gap Analysis and Path to Authorization
10. Appendix D — References
11. Appendix E — Verification Instructions for Independent Reviewers

---

## 1. SYSTEM IDENTIFICATION

### 1.1 System Name and Title

**System Name:** Vernen Legal Compliance Platform
**Common Name:** Vernen
**Trademarks:** VERNEN™, CITIZEN™ (common law)

### 1.2 System Owner

**Owner / Steward:** Michael Hartmann
**Role:** Founder and Steward
**Organization:** Vernen Legal Compliance (stewardship enterprise; legal entity formation pending — see Appendix C, Gap LE-01)

### 1.3 Authorizing Official

**Status:** None designated. No federal Authorizing Official has reviewed, assessed, or signed any authorization for this system. This document is a self-attestation only.

### 1.4 System Description

The Vernen Legal Compliance Platform is a serverless, edge-deployed compliance and document forensic analysis system that:

1. Provides automated regulatory compliance audits against federal and state rules for small-business entities;
2. Performs structural forensic analysis of legal documents through eight independent verification layers (Layers 1–8 of the Vernen Verification Protocol);
3. Generates a cryptographically-verifiable audit trail of every analytical action taken by any persona-citizen agent within the system;
4. Publishes daily Merkle tree roots of the audit trail to a public, append-only Git repository, and (via Layer 8) cross-witnesses those roots with peer instances.

The system is operated as a stewardship enterprise with the explicit goal of producing infrastructure suitable for adoption as a federal record-integrity standard. Source code for the verification protocol layers is published under CC0-1.0.

### 1.5 System Boundary

The system boundary includes:

- The Cloudflare Worker bundle deployed at the route `compliance.vernenlegal.com/*`, including all source files under `src/`
- The bound D1 database instance `vernen-legal-compliance` containing all platform tables (currently 85+ tables)
- The bound KV namespace `KNOWLEDGE_STORE` (namespace ID `b5185e79eb634dff9fab6ae2027d3801`) used for rate limiting and ephemeral state
- The Workers AI binding (`env.AI`) used for model inference
- Configured Workers Secrets: `API_KEY`, `FAC_API_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- Cron triggers configured in `wrangler.toml` (currently `0 1 * * *` for daily Merkle root computation)

The system boundary explicitly **excludes**:

- The Cloudflare control plane and underlying infrastructure (boundary at the Worker invocation interface; see §6 inheritance analysis)
- The public verification repository at `github.com/WaistMaiLieP-H/vernen-verification-log` (interconnection — see §1.6)
- Client browsers, third-party HTTP callers, and any external systems consuming the API
- Future federation peer instances run by other operators

### 1.6 System Interconnections

The platform has the following authorized interconnections:

| Connection | Purpose | Direction | Authentication | Confidentiality |
|---|---|---|---|---|
| GitHub REST API (`api.github.com`) | Daily Merkle root anchoring under Layer 3 | Outbound | Personal Access Token (Workers Secret) | TLS 1.2+ |
| External federation peer manifests | Layer 8 peer registration and attestation exchange | Outbound (HTTPS only — enforced in code) | None at fetch; ECDSA P-256 signature verification on attestation payloads | TLS 1.2+ |
| Federal Audit Clearinghouse API | Compliance intelligence pipeline | Outbound | API key (Workers Secret) | TLS 1.2+ |
| Stripe API | Payment processing for paid engagements | Outbound | API key (Workers Secret) | TLS 1.2+ |
| Wayback Machine save endpoint | External anchoring witness diversity | Outbound | None | TLS 1.2+ |
| Public verification log repo | One-way write of daily Merkle roots and protocol source | Outbound (`git push`) | GitHub credentials (operator-side) | TLS 1.2+ |

All inbound traffic to the system arrives through the Cloudflare global anycast network, terminating at the Worker entry point in `src/index.ts` → `src/router.ts`. There are no other inbound paths.

### 1.7 Operational Status

| | |
|---|---|
| Deployment status | Production |
| Production URL | `https://compliance.vernenlegal.com` |
| Current version (at draft date) | `67965cad-2145-4714-af32-ed8c6459020e` |
| Bundle size | 3.13 MB / 638 KB gzip |
| API endpoint count | 470+ |
| Codebase size | ~92,000 lines of TypeScript |

---

## 2. SYSTEM CHARACTERIZATION

### 2.1 Architecture Overview

```
┌────────────────────────────────────────────────────────────────────┐
│                        SYSTEM BOUNDARY                              │
│                                                                      │
│   ┌──────────────────────────────────────────────────────────────┐  │
│   │  Cloudflare Worker @ compliance.vernenlegal.com/*            │  │
│   │                                                                │  │
│   │  ┌─────────────┐    ┌──────────────┐    ┌────────────────┐   │  │
│   │  │  Router     │───▶│  Middleware  │───▶│   API Layer    │   │  │
│   │  │ (router.ts) │    │ auth/rate    │    │ (470+ routes)  │   │  │
│   │  └─────────────┘    └──────────────┘    └────────┬───────┘   │  │
│   │                                                    │           │  │
│   │  ┌─────────────────────────────────────────────────▼───────┐  │  │
│   │  │              Service Layer                               │  │  │
│   │  │  • verification-engine (Layer 1-2 hash chain + Merkle)   │  │  │
│   │  │  • verification-anchor (Layer 3 GitHub anchoring)        │  │  │
│   │  │  • consensus-engine (Layer 5c cross-model)               │  │  │
│   │  │  • conscientious-identity (Layer 6)                      │  │  │
│   │  │  • subject-verification (Layer 6)                        │  │  │
│   │  │  • temporal-paradox-filter (Layer 7a)                    │  │  │
│   │  │  • liability-mapping (Layer 7b)                          │  │  │
│   │  │  • reclassification-engine (Layer 7c)                    │  │  │
│   │  │  • unconscionability-trigger (Layer 7d)                  │  │  │
│   │  │  • document-to-layer7 (unified pipeline)                 │  │  │
│   │  │  • federation-protocol (Layer 8)                         │  │  │
│   │  │  • compliance-engine, audit-engine, etc.                 │  │  │
│   │  └─────────────┬──────────────────┬──────────────┬─────────┘  │  │
│   │                │                  │              │             │  │
│   │   ┌────────────▼──┐    ┌──────────▼───┐  ┌──────▼────────┐    │  │
│   │   │ D1 Database   │    │ KV Namespace │  │  Workers AI   │    │  │
│   │   │ 85+ tables    │    │ rate-limit   │  │  binding      │    │  │
│   │   │ verification_ │    │ ephemeral    │  │               │    │  │
│   │   │ chain etc.    │    │ state        │  │               │    │  │
│   │   └───────────────┘    └──────────────┘  └───────────────┘    │  │
│   │                                                                │  │
│   └────────────────────────────┬───────────────────────────────────┘  │
│                                │                                       │
│                                │ Workers Secrets binding               │
│                                ▼                                       │
│        API_KEY · FAC_API_KEY · STRIPE_SECRET_KEY · ...                 │
│                                                                        │
└────────────────────────────────┼───────────────────────────────────────┘
                                 │
                                 │ Outbound (TLS 1.2+ only)
                                 │
       ┌─────────────────────────┼─────────────────────────────┐
       ▼                         ▼                              ▼
  ┌─────────┐              ┌──────────┐                ┌──────────────┐
  │ GitHub  │              │ Stripe   │                │ Wayback /    │
  │ API     │              │ API      │                │ Federation   │
  │(Layer 3)│              │(payments)│                │ Peers (L8)   │
  └─────────┘              └──────────┘                └──────────────┘
```

### 2.2 Component Inventory

**Compute:**
- Cloudflare Workers runtime (V8 isolate)
- Single Worker bundle: `vernen-legal-compliance`
- Cron Trigger: daily `0 1 * * *` UTC for Merkle root computation
- Bundle metrics: 3.13 MB uncompressed / 638 KB gzipped

**Storage (Vernen-managed):**
- D1 (SQLite-based serverless DB) — instance `vernen-legal-compliance`, 85+ tables
- KV namespace `KNOWLEDGE_STORE` (id `b5185e79eb634dff9fab6ae2027d3801`)
- Workers Secrets store (API_KEY, FAC_API_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, GITHUB_TOKEN)

**Code modules in scope (key services):**
- `src/index.ts` — Worker entry point
- `src/router.ts` — pattern-matching router with `:param` support, ~1,720 lines
- `src/api/middleware/auth.ts` — Bearer token authentication
- `src/api/middleware/rate-limit.ts` — KV-backed sliding window rate limiter
- `src/services/verification-engine.ts` — Layer 1-2 hash chain and Merkle tree (705 lines)
- `src/services/verification-anchor.ts` — Layer 3 GitHub anchor + build attestation (685 lines)
- `src/services/conscientious-identity.ts` — Layer 6 epistemic standing (482 lines)
- `src/services/subject-verification.ts` — Layer 6 entity verification
- `src/services/temporal-paradox-filter.ts` — Layer 7a
- `src/services/liability-mapping.ts` — Layer 7b
- `src/services/reclassification-engine.ts` — Layer 7c
- `src/services/unconscionability-trigger.ts` — Layer 7d
- `src/services/document-to-layer7.ts` — unified document → 4-layer pipeline
- `src/services/federation-protocol.ts` — Layer 8 federation protocol

**Personas (data model):**
- 16 hand-built Persona Citizens (FORGE-0, SENTINEL-0, REGULIS, ADVOCIS, LEXARC, SYNTARA, FISCARA, INTEGRA, VIGILUS, ETHICARA, PRIVAXIS, VESTARA, METRIQA, CLARIDEX, NEXARIS, FACIALEX)
- 18 data-assembled Citizens from the Failure Taxonomy Engine

**Test infrastructure:**
- `tests/` Vitest unit and integration tests
- `~/test_fixtures/blind_eval_2026/` synthetic Layer 7 blind evaluation harness (4 fixtures, 27 expected findings)

### 2.3 User Roles

| Role | Description | Authentication |
|---|---|---|
| **Steward** | The single founder-operator with administrative access to deploy code, rotate secrets, and access D1 directly through Wrangler | Cloudflare account credentials + Wrangler OAuth |
| **API Client** | Any external caller of authenticated endpoints (paid clients, AI agents performing audits, integration partners) | Bearer token in Authorization header |
| **Public Reader** | Any anonymous caller of public endpoints (verification chain integrity, federation manifest, info endpoints) | None (rate-limited only) |
| **Federation Peer** | Another Vernen instance exchanging cross-attestations under Layer 8 | ECDSA P-256 signature verification on attestation payloads, against keys retrieved from peer manifest |

There are no other privilege levels. The system is intentionally flat: there is no admin web UI, no role-based access control beyond authenticated/unauthenticated, and no concept of multi-tenant separation. This is documented as a known limitation in Appendix C, Gap AC-01.

### 2.4 Data Flows

**Inbound data flows:**
1. HTTPS request → Cloudflare edge → Worker isolate
2. Router matches method + path
3. Middleware: `authenticate()` (if protected) + `rateLimit()` (if rate-limited)
4. Handler executes; may read/write D1, read/write KV, call external APIs, invoke services
5. Service layer may append a verification chain record (Layer 1) for any business event
6. Response constructed; CORS, security headers, and cache-control headers attached
7. Response returned through Cloudflare edge

**Outbound data flows:**
1. Compliance intelligence pipeline → federal agency APIs (FAC, EDGAR, SBA, OSHA, etc.)
2. Daily cron trigger → `verification-anchor.publishDaily()` → GitHub commit of Merkle root
3. Layer 8 attestation request → Federation peer's manifest URL (HTTPS only)
4. Layer 7 audit findings → optional anchor to verification chain via `VerificationEngine.appendRecord()`

**Data at rest:**
- D1 stores: compliance reports, audit issues, verification chain records, Merkle roots, federation peer registry, federation witnesses, persona citizen state, build log, audit reports
- KV stores: rate-limit counters (TTL'd)
- Workers Secrets: API keys (encrypted at rest by Cloudflare control plane)

### 2.5 Information Types Handled

| Information Type | Sensitivity | Source |
|---|---|---|
| Compliance audit findings | Public-by-default for verification chain; client-confidential for paid engagements | Vernen-generated |
| Document content (paid engagements) | Confidential per client agreement | Client-supplied |
| Hashes of audit records | Public (intentionally — verification chain is public) | Vernen-generated |
| Daily Merkle roots | Public (intentionally — anchored to public Git) | Vernen-generated |
| Federation peer public keys | Public | Peer-published |
| Federation private signing key | High sensitivity (currently in D1 — see Gap SC-01) | Vernen-generated |
| API keys (Workers Secrets) | High sensitivity | Operator-configured |
| User PII | Minimized — see §4.15 PT family | Client-supplied |

---

## 3. INFORMATION CATEGORIZATION (FIPS 199)

### 3.1 Categorization Methodology

This system is categorized in accordance with FIPS PUB 199, using the methodology described in NIST SP 800-60. Each information type processed by the system is assigned an impact level (LOW / MODERATE / HIGH) for each of the three security objectives (confidentiality, integrity, availability). The system's overall categorization is the high-water mark across all information types.

### 3.2 Information Type Impact Levels

| Information Type | Confidentiality | Integrity | Availability |
|---|---|---|---|
| Public verification chain records | LOW (public by design) | **HIGH** (integrity is the entire value proposition) | LOW (verification can run offline against public anchors) |
| Compliance audit findings | LOW | MODERATE | LOW |
| Client document content (paid engagements) | MODERATE | MODERATE | LOW |
| Federation private signing key | HIGH | HIGH | LOW |
| API keys (Workers Secrets) | HIGH | HIGH | LOW |

### 3.3 Provisional Overall Categorization

**Confidentiality: LOW** (the system intentionally publishes its core artifact — the audit chain — and minimizes any PII or client-confidential data through architectural choices documented in §4.15)

**Integrity: HIGH** (the entire purpose of the verification protocol is integrity; tampering with the chain destroys the value of the system; integrity controls are the strongest implemented)

**Availability: LOW** (availability is a desirable but not load-bearing property; verification can be performed against public anchors even when the production endpoint is offline)

**System Categorization: MODERATE** (highest of the three, driven by the integrity rating)

### 3.4 Categorization Notes

Although the categorization above produces a MODERATE rating, the present document maps the system against the **LOW baseline** for the following reasons:

1. The current state of Vernen does not yet support the full Moderate baseline (in particular it lacks formal incident response procedures, continuous monitoring with a SIEM, configuration baselines hardened against the CIS Benchmarks, and a documented contingency plan).
2. The Low baseline is the appropriate starting point for a self-attestation draft. Closing the gap from Low to Moderate is itself a roadmap milestone documented in Appendix C.
3. A future authorized SSP would re-perform the categorization with appropriate stakeholder review.

---

## 4. SECURITY CONTROL IMPLEMENTATION

This section describes how Vernen implements the controls in NIST SP 800-53 Revision 5 at the LOW baseline. For each control family, controls are listed with:

- **Status:** Implemented / Partially Implemented / Planned / Not Applicable / Inherited
- **Description:** the actual implementation in Vernen, with file references where the implementation lives
- **Inheritance:** any portion of the control inherited from Cloudflare's underlying platform (see §6)

Status definitions:
- **Implemented:** the control is in production code, in scope of the system boundary, and verifiable from the source repository
- **Partially Implemented:** some elements of the control are implemented; specific gaps are listed
- **Planned:** the control is on the roadmap but not yet built; date estimates are aspirational
- **Not Applicable:** the control does not apply to a system of this type and scope
- **Inherited:** the control is satisfied by Cloudflare's underlying platform; the inheritance is **only valid in Cloudflare for Government**, not the commercial platform Vernen currently runs on (see Gap CL-01)

---

### 4.1 AC — Access Control

**Family Overview:** Vernen implements a flat, two-tier access model: authenticated (Bearer token) and unauthenticated (rate-limited public). There is no role-based access control, no multi-factor authentication, no privileged user separation, and no session management. This is appropriate for a single-operator stewardship enterprise but is a known limitation for any larger deployment.

#### AC-1 Policy and Procedures
**Status:** Partially Implemented
**Description:** Access control policy is documented in this SSP draft and in the public protocol repository's README.md. Procedures for granting/revoking access are informal: the operator (Steward) manages the single API key via `wrangler secret put API_KEY`. There is no separate written access control policy document.
**Gap:** A standalone Access Control Policy document is required for any formal authorization. (Gap AC-01)

#### AC-2 Account Management
**Status:** Partially Implemented
**Description:** Vernen has two account types: (1) the Steward operator, managed via the Cloudflare account console, and (2) API clients, managed via the single shared API_KEY Workers Secret. Account creation, modification, and deletion are manual operations performed by the Steward through Wrangler. There is no automated account management, no expiration, no access reviews, and no separation of duties — the Steward is the sole human user.
**Gap:** A multi-user platform would require account lifecycle management. The flat single-operator model is appropriate for the current deployment scale but blocks any institutional adoption. (Gap AC-02)

#### AC-3 Access Enforcement
**Status:** Implemented
**Description:** Access enforcement is implemented in `src/api/middleware/auth.ts`. Every protected route invokes `authenticate(request, env)` which:
1. Checks for the `Authorization` header (returns 401 if missing)
2. Validates the Bearer scheme prefix (returns 401 if malformed)
3. Compares the token against `env.API_KEY` from Workers Secrets (returns 403 if mismatch)
4. Returns `null` on success, allowing the handler to proceed

The middleware is invoked at the start of every protected handler. Public endpoints do not invoke `authenticate()` and rely on rate limiting alone.

The router (`src/router.ts`) registers each route with its method and path; handlers explicitly opt into authentication. There is no negative-list / blacklist model — protection is opt-in per route.

**Reference:** `src/api/middleware/auth.ts` (45 lines, complete implementation visible)

#### AC-4 Information Flow Enforcement
**Status:** Partially Implemented
**Description:** Information flow is constrained by the architecture: Cloudflare handles ingress/egress, the Worker runtime sandboxes execution, and outbound calls go through `fetch()` which is logged in Cloudflare's audit trail (operator-visible only). There are no formal information flow rules beyond TLS enforcement on outbound calls (Layer 8 explicitly rejects non-HTTPS manifest URLs in `federation-protocol.ts:addPeer`).
**Gap:** Formal information flow policy enforcement (e.g., explicit allow-listed external destinations, egress filtering) is not implemented. (Gap AC-04)

#### AC-6 Least Privilege
**Status:** Implemented (architecturally)
**Description:** The Worker runs with no system-level privileges — it is a sandboxed V8 isolate with access only to the bindings declared in `wrangler.toml` (DB, KV, AI, Secrets). It cannot access the file system, the network beyond `fetch()`, or any other Cloudflare account resources. Service modules within the Worker each receive the same `env` object but use only the bindings they need. There is no privilege escalation path within the runtime.

#### AC-7 Unsuccessful Logon Attempts
**Status:** Implemented (via rate limiting)
**Description:** `src/api/middleware/rate-limit.ts` implements a sliding-window rate limiter using KV. Failed authentication attempts count against the limit. Excessive attempts return 429 Too Many Requests. There is no separate "lockout" — rate limiting is the protection mechanism.

#### AC-8 System Use Notification
**Status:** Implemented
**Description:** The landing page at `https://compliance.vernenlegal.com/` (served from `src/landing/serve.ts`) displays system identification and terms-of-use links. The Terms of Service, Privacy Policy, and Disclaimer are served from `src/legal/`. API responses do not include a use notification (interactive only).

#### AC-14 Permitted Actions Without Identification or Authentication
**Status:** Implemented
**Description:** Public endpoints (verification chain integrity check, federation manifest, info endpoints) are explicitly permitted without authentication. They are documented in the API and rate-limited via `rateLimit()` middleware. Each public endpoint is registered explicitly in `src/router.ts`; there is no wildcard public access.

#### AC-17 Remote Access
**Status:** Inherited / Implemented
**Description:** All access to the system is remote (the system has no local interface). Remote access is protected by TLS 1.2+ enforced at the Cloudflare edge, plus the Bearer token authentication described in AC-3. The Steward's remote administrative access (via Wrangler) is authenticated via Cloudflare account credentials.

#### AC-18 Wireless Access — **Not Applicable**
The system has no wireless components.

#### AC-19 Access Control for Mobile Devices — **Not Applicable**
The system has no mobile components.

#### AC-20 Use of External Information Systems
**Status:** Partially Implemented
**Description:** External systems used by Vernen are documented in §1.6 (System Interconnections). Authorization for each connection is implicit in the Steward's deployment of the corresponding code module. No formal authorization-of-external-systems policy exists.

#### AC-22 Publicly Accessible Content
**Status:** Implemented
**Description:** Vernen publishes its verification chain, daily Merkle roots, and protocol source code intentionally and as a core feature. The published content is reviewed by the Steward at the time of publication (each protocol file is reviewed before being mirrored to the public repo). The verification chain itself is hash-only — no client document content is ever published.

---

### 4.2 AT — Awareness and Training

**Family Overview:** As a single-operator system, formal awareness and training programs are not implemented. The Steward is the sole human with system access and acts as both administrator and end user. This entire family is a known gap for any multi-user deployment.

#### AT-1 Policy and Procedures
**Status:** Not Implemented
**Gap:** No documented training policy. (Gap AT-01)

#### AT-2 Literacy Training and Awareness
**Status:** Not Applicable (single operator with deep system knowledge)

#### AT-3 Role-Based Training
**Status:** Not Applicable (no roles)

#### AT-4 Training Records
**Status:** Not Applicable (no training program)

---

### 4.3 AU — Audit and Accountability *(Vernen's strongest control family)*

**Family Overview:** This family is Vernen's strongest implementation. The verification protocol — Layers 1, 2, 3, 5, and 8 — is essentially an enhanced AU-family implementation that exceeds the LOW baseline and approaches HIGH on AU-9 specifically. Every meaningful action taken by any agent within the system is hashed, chained, Merkle-rooted, and anchored to a public Git repository on a daily cadence, with optional cross-witnessing by federation peers.

#### AU-1 Policy and Procedures
**Status:** Implemented
**Description:** The audit policy is documented in the public protocol repository at `protocol/SPEC.md`, which describes the chain construction, Merkle tree algorithm, anchoring schedule, and verification procedure. Procedures for verifying any record are documented in `protocol/PROOF_DEMO.md` and the standalone `verify.py` script in the public repo.

#### AU-2 Event Logging
**Status:** Implemented
**Description:** Every record passed to `VerificationEngine.appendRecord()` (in `src/services/verification-engine.ts`) generates a chained audit record. Records include:
- Sequence number
- Record type (e.g., `audit_finding`, `compliance_report`, `actuarial_audit`, `liability_map`, `federation_attestation`, `subject_verification`)
- Source table and source ID
- Canonical-JSON content
- Optional metadata (model name, consensus group ID, layer label)
- Content hash (SHA-256 of canonical JSON)
- Previous record hash
- Combined hash (SHA-256 of content + previous + sequence)
- Timestamp

The set of events that produce audit records includes every Layer 7 finding, every compliance report, every Citizen execution, and every federation attestation.

**Reference:** `src/services/verification-engine.ts` lines 1–705, especially the `appendRecord` and `computeRecordHashes` functions.

#### AU-3 Content of Audit Records
**Status:** Implemented (extends to Layer 5 constitutional traceability)
**Description:** In addition to the core fields described in AU-2, audit records carry constitutional traceability metadata (Layer 5) declaring which named ethical principles the agent claimed to uphold when taking the action. The principle catalog includes 26 principles across 7 categories (HELPFUL, HONEST, HARMLESS, AUTONOMY, NON_DECEPTION, PROFESSIONAL_INTEGRITY, LEGAL_ACCOUNTABILITY), drawn from Anthropic's HHH framework and from professional ethics codes. The principles are part of the canonical JSON that gets hashed, so they cannot be retroactively claimed.

This implementation goes beyond the LOW baseline requirement and approaches the requirements of AU-3(1) (additional content).

#### AU-4 Audit Log Storage Capacity
**Status:** Implemented
**Description:** The verification chain is stored in D1 (`verification_log` table). D1 has documented capacity limits (10 GB per database in Cloudflare's current free tier; higher with paid plans). The chain is append-only and grows monotonically; current size is in the tens of thousands of records. Historical capacity planning would extend the chain across multiple D1 databases or migrate to R2 if scale becomes an issue.

#### AU-5 Response to Audit Logging Process Failures
**Status:** Partially Implemented
**Description:** Failures in `appendRecord` are caught and logged via `console.warn` (visible in Cloudflare dashboard logs). Layer 7 engines that fail to anchor a finding to the verification chain log the failure but proceed with the audit (returning the report without the chain anchor). This is a deliberate design choice — audit findings are not blocked by anchoring failures — but it does mean that some findings may not be in the verification chain even though the engine produced them.
**Gap:** A formal alerting mechanism for chain failures is not implemented. (Gap AU-05)

#### AU-6 Audit Record Review, Analysis, and Reporting
**Status:** Implemented (via Layer 7 itself)
**Description:** Layer 7 (Structural Forensic Analysis) is the systematic review and analysis of audit records — both the records generated by the system itself and the records produced from externally-supplied documents. Layer 7a (Temporal Paradox Filter) audits records for temporal impossibility. Layer 7b (Liability Mapping) audits records for entity-relational inconsistency. Layer 7c (Reclassification Engine) audits records for control-language patterns. Layer 7d (Unconscionability Trigger) audits records for actuarial impossibility. Each layer produces structured findings that are themselves anchored back into the verification chain, creating a recursive audit-of-the-audit.

In NIST 800-53 terms, the Layer 7 modules ARE the AU-6 implementation — automated review and analysis of audit content with structured reporting.

#### AU-8 Time Stamps
**Status:** Implemented
**Description:** All records carry an ISO-8601 timestamp generated at the time of `appendRecord` invocation. Timestamps come from `new Date().toISOString()` which uses the underlying system clock; in Cloudflare Workers, the system clock is synchronized to NTP-authoritative time at the edge.

#### AU-9 Protection of Audit Information *(Vernen's strongest single-control implementation)*
**Status:** Implemented (and exceeds LOW baseline)
**Description:** Audit information is protected by **three independent integrity paths**:

1. **Hash chain (Layer 1):** Each record's combined hash includes the previous record's hash, so any modification to historical records invalidates every subsequent hash. Tampering with one record breaks the chain at every record from that point forward.

2. **GitHub anchor (Layer 3):** Daily Merkle roots are committed to a public, append-only Git repository at `github.com/WaistMaiLieP-H/vernen-verification-log`. Once committed, the root exists in every clone of the repository. Git's content-addressed object model and append-only commit history protect the root from silent modification. Anyone with an earlier clone can prove divergence.

3. **Federation witnesses (Layer 8):** Other Vernen instances (peers) cross-sign each other's daily Merkle roots using ECDSA P-256. Once N peers have witnessed a root, retroactively rewriting the chain AND the GitHub anchor still leaves the peer signatures invalid against the new root. The integrity floor moves from "trust the operator" to "trust that no peer ever cosigns a forged root." **As of 2026-04-07T22:56:14Z, Layer 8 has its first operational cross-witness signature.** A peer instance running on a separate Cloudflare Worker (`vernen-peer-witness.michetype78.workers.dev`, instance ID `vernen-mnp6rlwx-w0grz2`, key ID `99c64c2b47ab1477`) signed production's daily Merkle root for 2026-04-07 (`77b6504fefa9a0972979ce8055ea97c9eff1774d18f24ad4de166d7db7362af4`, covering 8,049 records). The witness is publicly retrievable at `https://compliance.vernenlegal.com/api/federation/witnesses/2026-04-07` with no authentication required, and any third party can independently verify the ECDSA signature using the peer's published public key. The bootstrap peer is run by the same operator (acknowledged limitation — see Gap FE-01); a true third-party peer is the next federation milestone.

For an operator to forge history through all three layers, they would need to either compromise every federation peer's signing key or collude with every peer to issue new signatures over the falsified root and back-date them — both of which are observable actions that expand the attack surface.

**This implementation satisfies AU-9, AU-9(2) (audit backup on separate physical systems), AU-9(3) (cryptographic protection), and AU-9(4) (access by subset of privileged users — there is no such subset; the verification chain is publicly accessible).**

**Reference:** `src/services/verification-engine.ts`, `src/services/verification-anchor.ts`, `src/services/federation-protocol.ts`. Spec: `protocol/SPEC.md`, `protocol/FEDERATION_PROTOCOL.md`.

#### AU-10 Non-Repudiation
**Status:** Partially Implemented
**Description:** Layer 8 attestations provide non-repudiation for federation peer signatures: each attestation is signed with an ECDSA P-256 private key tied to a public key published in the peer's manifest. Anyone can verify a signature against the published key, and the signing key is bound to the specific instance ID, providing strong attribution.

For internal records (within a single instance), non-repudiation is weaker: the records are hashed and chained but not individually signed. The implicit attribution is to the operator of the instance.

**Gap:** Per-record signing (rather than per-batch via daily Merkle root) would provide stronger non-repudiation. This is on the roadmap but not yet implemented. (Gap AU-10)

#### AU-11 Audit Record Retention
**Status:** Implemented
**Description:** Audit records are retained indefinitely. The verification chain is append-only by design; there is no purge mechanism. D1 capacity limits would eventually require migration to a larger backing store (R2 with object lock would be the natural target), but no records have been deleted since the chain genesis.

#### AU-12 Audit Record Generation
**Status:** Implemented
**Description:** Audit records are generated by every service that produces a meaningful business event. Layer 7 engines call `VerificationEngine.appendRecord()` after persisting a report to D1. The compliance engine, audit engine, and persona citizen executions follow the same pattern. The set of audit-record-generating events is defined in code, not in configuration.

---

### 4.4 CA — Assessment, Authorization, and Monitoring

**Family Overview:** Vernen has not been formally assessed or authorized by any external party. Continuous monitoring is implemented at the technical level (Cloudflare logs, verification chain integrity checks) but no formal assessment program exists.

#### CA-1 Policy and Procedures
**Status:** Not Implemented (this draft is the closest analogue)

#### CA-2 Control Assessments
**Status:** Not Implemented
**Gap:** No 3PAO has assessed any of these controls. (Gap CA-02)

#### CA-3 Information Exchange
**Status:** Partially Implemented
**Description:** External information exchanges (§1.6) are documented but no formal Memoranda of Understanding (MOUs) or Interconnection Security Agreements (ISAs) exist. Future federation peers would require ISAs.

#### CA-5 Plan of Action and Milestones (POA&M)
**Status:** Implemented (Appendix C of this document)
**Description:** Appendix C of this SSP draft serves as the initial POA&M, documenting every gap identified during this self-attestation along with proposed remediation milestones.

#### CA-6 Authorization
**Status:** Not Implemented
**Description:** No federal Authorizing Official has reviewed or signed an Authority to Operate. The system is operating in a self-authorized stewardship mode.

#### CA-7 Continuous Monitoring
**Status:** Partially Implemented
**Description:** Technical continuous monitoring is provided by:
1. Cloudflare's built-in logging (operator-accessible via dashboard)
2. The verification chain itself, which provides cryptographic integrity monitoring
3. The `/api/verify/chain/integrity` endpoint, which provides on-demand chain verification
4. The daily cron-triggered Merkle root computation, which serves as a daily integrity checkpoint

There is no SIEM, no automated alerting on anomalous behavior, and no formal monitoring program.

#### CA-9 Internal System Connections
**Status:** Implemented
**Description:** All internal connections (Worker → D1, Worker → KV, Worker → AI, Worker → Secrets) are declared in `wrangler.toml` and authorized at deployment time. There is no dynamic binding.

---

### 4.5 CM — Configuration Management

**Family Overview:** Configuration management is implemented through a combination of source control (Git), Wrangler-managed deployment, and the verification chain's build attestation.

#### CM-1 Policy and Procedures
**Status:** Partially Implemented
**Description:** Configuration management is governed by source control. The platform code lives in a private Git repository; the protocol code lives in a public Git repository. Deployment is performed via `npm run deploy` which invokes Wrangler. Each deployment produces a Cloudflare Worker version ID that is embedded in the build attestation written to the verification chain.

#### CM-2 Baseline Configuration
**Status:** Implemented
**Description:** The baseline configuration is captured in `wrangler.toml` (bindings, routes, cron triggers, compatibility date) and `package.json` (zero production dependencies). The Worker source code in Git is the single source of truth for the deployed system.

#### CM-3 Configuration Change Control
**Status:** Implemented (informally)
**Description:** Changes are made by the Steward through Git commits and deployed via Wrangler. Each deployment creates a new Cloudflare Worker version with a unique version ID. The build attestation (`POST /api/verify/build`) writes the version ID to the verification chain, providing a tamper-evident link between source code and deployed version.

#### CM-4 Impact Analyses
**Status:** Not Implemented
**Description:** Formal impact analysis is not performed. (Gap CM-04)

#### CM-5 Access Restrictions for Change
**Status:** Implemented
**Description:** Code changes can only be deployed by the Steward via Wrangler, which requires Cloudflare account credentials. There is no other deployment path.

#### CM-6 Configuration Settings
**Status:** Partially Implemented
**Description:** Configuration settings are captured in `wrangler.toml` (build configuration), `tsconfig.json` (TypeScript strict mode enabled), and Workers Secrets (sensitive runtime configuration). There is no formal hardening checklist applied.

#### CM-7 Least Functionality
**Status:** Implemented (architecturally)
**Description:** The Worker runs only the code in its bundle, with only the bindings declared in `wrangler.toml`. There are no extraneous services, daemons, or processes. The runtime is a V8 isolate with no shell, no file system access, and no access to other Cloudflare account resources.

#### CM-8 System Component Inventory
**Status:** Implemented
**Description:** §2.2 of this document is the component inventory. The list is derived from the actual `wrangler.toml` bindings and the source tree.

#### CM-10 Software Usage Restrictions
**Status:** Implemented
**Description:** The codebase has zero production npm dependencies (verifiable in `package.json`). All functionality is self-contained or uses Cloudflare-provided runtime APIs (`crypto.subtle`, `fetch`, the D1/KV/AI bindings). There is no risk of third-party-package supply-chain compromise within the production runtime. (Test dependencies — Vitest — exist in `devDependencies` but never reach production.)

#### CM-11 User-Installed Software
**Status:** Not Applicable
**Description:** The runtime is a sandboxed isolate; users cannot install software.

---

### 4.6 CP — Contingency Planning

**Family Overview:** Contingency planning is largely informal. The system relies on Cloudflare's underlying availability and the public verification chain for disaster recovery of audit data.

#### CP-1 Policy and Procedures
**Status:** Not Implemented (Gap CP-01)

#### CP-2 Contingency Plan
**Status:** Partially Implemented
**Description:** The contingency posture is: (1) Cloudflare provides underlying availability across its global anycast network, (2) the public verification chain on GitHub provides off-site disaster recovery of all audit data — even if the production D1 database is destroyed, the daily Merkle roots can be retrieved from GitHub and the chain can be reconstructed by replaying records from external sources, (3) the codebase is in Git and can be redeployed at any time.
**Gap:** A formal Contingency Plan document with role assignments, communication procedures, and recovery time/point objectives does not exist. (Gap CP-02)

#### CP-3 Contingency Training
**Status:** Not Applicable (single operator)

#### CP-4 Contingency Plan Testing
**Status:** Not Implemented (Gap CP-04)

#### CP-9 System Backup
**Status:** Partially Implemented
**Description:** The verification chain is effectively backed up to GitHub via the daily Merkle root commits. However, this backup is hash-only — it preserves cryptographic integrity but not the underlying record content. A full content backup of D1 to an off-site location is not currently scheduled. (Gap CP-09)

#### CP-10 System Recovery and Reconstitution
**Status:** Partially Implemented
**Description:** Reconstitution from the public verification chain is theoretically possible but has not been tested. Recovery from a Cloudflare outage relies on Cloudflare's recovery procedures.

---

### 4.7 IA — Identification and Authentication

**Family Overview:** Identification and authentication is implemented at three levels: Steward (Cloudflare account), API client (Bearer token), and federation peer (ECDSA P-256 signature).

#### IA-1 Policy and Procedures
**Status:** Partially Implemented (this document)

#### IA-2 Identification and Authentication (Organizational Users)
**Status:** Implemented
**Description:** The Steward authenticates to the deployment environment via Cloudflare account credentials managed through Wrangler. Cloudflare's account model includes optional MFA (recommended in CM-3 follow-up).

#### IA-2(1) Multi-Factor Authentication for Privileged Accounts
**Status:** Inherited from Cloudflare (operator must enable)
**Description:** Cloudflare supports MFA for account access. Whether MFA is enabled is the Steward's responsibility.

#### IA-3 Device Identification and Authentication
**Status:** Not Applicable

#### IA-4 Identifier Management
**Status:** Implemented
**Description:** The single API_KEY identifier is managed via Workers Secrets. Federation peer instance identifiers are generated at first run (`vernen-{base36-timestamp}-{random}`) and stored in the `federation_keypair` table.

#### IA-5 Authenticator Management
**Status:** Partially Implemented
**Description:** Authenticators are Workers Secrets (managed via Wrangler) and the federation private key (stored in D1). Rotation is manual. Strength requirements are not enforced beyond the single Bearer token check.
**Gap:** Federation private key should migrate from D1 to a hardware-backed key store (Cloudflare Workers Secrets or HSM-backed). (Gap IA-05)

#### IA-7 Cryptographic Module Authentication
**Status:** Partially Implemented
**Description:** All cryptographic operations use Web Crypto via `crypto.subtle`, which is Cloudflare's runtime cryptographic module. Cloudflare's commercial environment is not FIPS 140-3 validated; Cloudflare for Government may be (verification with Cloudflare required). Vernen uses FIPS-approved algorithms (SHA-256 for hashing, ECDSA P-256 for federation signing) but the question of whether the cryptographic module is FIPS-validated depends on the underlying Cloudflare environment.
**Gap:** Migration to Cloudflare for Government required for FIPS 140-3 module validation. (Gap CL-01 / IA-07)

#### IA-8 Identification and Authentication (Non-Organizational Users)
**Status:** Implemented
**Description:** Non-organizational users (API clients) authenticate via the same Bearer token mechanism. Federation peers authenticate cryptographically via ECDSA signatures.

#### IA-11 Re-Authentication
**Status:** Not Implemented (sessions are stateless; every request re-authenticates)

#### IA-12 Identity Proofing
**Status:** Not Implemented
**Description:** Identity proofing is not currently performed for any user category. (Gap IA-12)

---

### 4.8 IR — Incident Response

**Family Overview:** Incident response is informal. The Steward is the single responder. There is no documented incident response procedure.

#### IR-1 Policy and Procedures
**Status:** Not Implemented (Gap IR-01)

#### IR-2 Incident Response Training
**Status:** Not Applicable (single operator)

#### IR-3 Incident Response Testing
**Status:** Not Implemented

#### IR-4 Incident Handling
**Status:** Partially Implemented
**Description:** Handling is ad hoc. The Steward monitors Cloudflare logs and the verification chain integrity endpoint. Incident triage and remediation are performed manually.

#### IR-5 Incident Monitoring
**Status:** Partially Implemented
**Description:** Cloudflare provides logs; the Steward monitors them informally.

#### IR-6 Incident Reporting
**Status:** Not Implemented
**Description:** No incident reporting channel exists. (Gap IR-06)

#### IR-7 Incident Response Assistance
**Status:** Not Implemented

#### IR-8 Incident Response Plan
**Status:** Not Implemented (Gap IR-08)

---

### 4.9 MA — Maintenance

**Family Overview:** Maintenance is performed by the Steward through Wrangler-mediated deployments. There is no physical hardware to maintain.

#### MA-1 Policy and Procedures
**Status:** Not Implemented (Gap MA-01)

#### MA-2 Controlled Maintenance
**Status:** Implemented (architecturally)
**Description:** All maintenance is software-based and performed via Wrangler deployment. Each deployment is logged in the build attestation system.

#### MA-3 Maintenance Tools — **Not Applicable**

#### MA-4 Nonlocal Maintenance
**Status:** Implemented
**Description:** All maintenance is nonlocal (the system has no local interface). Maintenance is performed via Wrangler over an authenticated, TLS-protected channel to Cloudflare's API.

#### MA-5 Maintenance Personnel
**Status:** Implemented
**Description:** The Steward is the single maintenance person. No third-party maintenance is permitted.

---

### 4.10 MP — Media Protection

**Status: Not Applicable**
The system has no physical media. All storage is provided by Cloudflare D1, KV, and Workers Secrets, and is governed by Cloudflare's underlying media protection (see §6 Inheritance).

---

### 4.11 PE — Physical and Environmental Protection

**Family Overview:** All physical and environmental protection controls are inherited from Cloudflare's underlying data center infrastructure. **This inheritance is only fully valid if the system runs on Cloudflare for Government** — Cloudflare's commercial environment provides physical security but is not FedRAMP-authorized.

**Inheritance Status (commercial Cloudflare):** Partially Inherited — Cloudflare provides physical security but the inheritance is not formally documented in a FedRAMP package.

**Inheritance Status (Cloudflare for Government, post-migration):** Fully Inherited

All PE controls (PE-1 through PE-21) are out of scope for Vernen-direct implementation. See §6 for the Cloudflare inheritance analysis and Appendix C, Gap CL-01 for the migration roadmap.

---

### 4.12 PL — Planning

**Family Overview:** Planning is captured in this SSP draft and in the public protocol repository documentation.

#### PL-1 Policy and Procedures
**Status:** Partially Implemented (this document)

#### PL-2 System Security Plan
**Status:** Self-Attestation Draft (this document)

#### PL-4 Rules of Behavior
**Status:** Implemented (via Terms of Service)
**Description:** Rules of behavior for users are documented in the Terms of Service served from `src/legal/`. The Steward's rules of behavior are documented in this SSP.

#### PL-8 Security and Privacy Architectures
**Status:** Implemented
**Description:** §2 of this document plus the public protocol architecture spec at `protocol/SPEC.md` constitute the security and privacy architecture documentation.

---

### 4.13 PM — Program Management

**Family Overview:** As a single-operator stewardship enterprise, formal program management is minimal. Most PM controls are not applicable.

#### PM-1 Information Security Program Plan
**Status:** Partially Implemented (this document)

#### PM-2 Information Security Program Leadership Role
**Status:** Implemented
**Description:** The Steward is the designated security program leader.

#### PM-4 Plan of Action and Milestones Process
**Status:** Implemented (Appendix C of this document)

#### PM-5 System Inventory
**Status:** Implemented
**Description:** §2.2 of this document.

#### PM-6 Measures of Performance
**Status:** Partially Implemented
**Description:** The blind evaluation harness at `~/test_fixtures/blind_eval_2026/` provides one set of measures (currently 4/4 fixtures pass with 27/27 expected findings recalled). This is documented in the operator memory but not yet in a formal performance plan.

---

### 4.14 PS — Personnel Security

**Status: Not Applicable**
Single operator. No personnel screening, separation, or transfer procedures are required.

---

### 4.15 PT — PII Processing and Transparency

**Family Overview:** Vernen is architected to minimize PII processing by design. The verification chain is hash-only — no document content or PII is published. Client document content (in paid engagements) is governed by the service agreement and is not retained in long-term storage.

#### PT-1 Policy and Procedures
**Status:** Implemented
**Description:** The Privacy Policy served from `src/legal/` documents PII handling practices.

#### PT-2 Authority and Purpose
**Status:** Implemented
**Description:** PII processing is performed only with explicit client authorization via the Forensic Audit Service Agreement (template at `Desktop/Vernen_Forensic_Audit_Service_Agreement_TEMPLATE.md`).

#### PT-3 Personally Identifiable Information Processing
**Status:** Implemented (minimization by architecture)
**Description:** PII never enters the verification chain. The chain stores only hashes of canonical-JSON content. Client document content is processed in-memory during audit and persisted to D1 only as required for the report; the report is delivered to the client and the underlying content is not republished.

#### PT-5 Privacy Notice
**Status:** Implemented
**Description:** The Privacy Policy at `src/legal/` constitutes the privacy notice.

#### PT-6 System of Records Notice
**Status:** Not Applicable (Vernen is not a federal agency)

#### PT-7 Specific Categories of PII
**Status:** Not Implemented (no special category PII intentionally processed)

---

### 4.16 RA — Risk Assessment *(implemented as Layer 7)*

**Family Overview:** Layer 7 IS Vernen's risk assessment implementation. Where most systems treat risk assessment as a pre-deployment exercise, Vernen treats it as a continuous, automated, document-by-document process. Each Layer 7 module performs a different category of structural risk assessment on every document submitted to the system.

#### RA-1 Policy and Procedures
**Status:** Implemented
**Description:** Risk assessment policy is documented in `protocol/LAYER_7_STRUCTURAL_FORENSIC_ANALYSIS.md` (mirrored to public repo). The four Layer 7 modules implement structured risk assessment against documented criteria.

#### RA-2 Security Categorization
**Status:** Implemented (this document, §3)

#### RA-3 Risk Assessment
**Status:** Implemented (Layer 7)
**Description:** Layer 7 performs continuous risk assessment on documents flowing through the system:
- **7a Temporal Paradox Filter** — assesses temporal coherence risk
- **7b Liability Mapping** — assesses entity-relational and structural fraud risk
- **7c Reclassification Engine** — assesses worker classification compliance risk
- **7d Unconscionability Trigger** — assesses contractual and financial fairness risk

Each engine produces structured findings with severity ratings (CRITICAL / HIGH / MEDIUM / LOW), evidence excerpts, and statutory citations. The unified pipeline (`/api/verify/document-to-layer7`) runs all four assessments on a single raw document submission.

**Reference:** `src/services/temporal-paradox-filter.ts`, `src/services/liability-mapping.ts`, `src/services/reclassification-engine.ts`, `src/services/unconscionability-trigger.ts`, `src/services/document-to-layer7.ts`.

#### RA-3(1) Supply Chain Risk Assessment
**Status:** Implemented (architecturally)
**Description:** Vernen's supply chain risk is minimized by the zero-production-dependency architecture documented in CM-10. The only supply-chain trust assumptions are Cloudflare's runtime and Web Crypto's algorithm implementations.

#### RA-5 Vulnerability Monitoring and Scanning
**Status:** Partially Implemented
**Description:** The codebase has zero production npm dependencies, eliminating the most common vulnerability category. Cloudflare patches the underlying runtime. There is no scheduled SAST/DAST scanning beyond the TypeScript strict-mode type checker run on every build.
**Gap:** Formal vulnerability scanning is not implemented. (Gap RA-05)

#### RA-7 Risk Response
**Status:** Implemented
**Description:** Risk response is encoded in the Layer 7 verdict tiers. For example, Layer 7d's verdicts (`STANDARD`, `AGGRESSIVE`, `PREDATORY`, `UNCONSCIONABLE_AS_MATTER_OF_LAW`) each carry a documented recommendation. The risk response for Vernen's own audit findings is documented in the Forensic Audit Service Agreement template.

---

### 4.17 SA — System and Services Acquisition

**Family Overview:** Vernen acquires no third-party software or services beyond Cloudflare's runtime. There is no procurement process beyond the Steward's choice of platform.

#### SA-1 Policy and Procedures
**Status:** Not Implemented

#### SA-2 Allocation of Resources
**Status:** Implemented (informally)
**Description:** All resources are allocated by the Steward.

#### SA-3 System Development Life Cycle
**Status:** Implemented (informally)
**Description:** Development follows a build-test-deploy cycle managed via Git and Wrangler. Each Layer 7 build session is documented in the operator memory.

#### SA-4 Acquisition Process
**Status:** Not Applicable

#### SA-8 Security and Privacy Engineering Principles
**Status:** Implemented
**Description:** Vernen is designed against the following principles, all of which are visible in the source code:
1. **Minimization** — zero production dependencies, no PII in the verification chain, no extraneous services
2. **Transparency** — protocol source code is public under CC0
3. **Verifiability** — every action is hashable and anchorable
4. **Conscientious epistemic standing** — Layer 6 refuses to overstate confidence on incomplete information
5. **Fail-soft** — Layer 7 engines do not block on chain anchor failures; they log and proceed

#### SA-11 Developer Testing and Evaluation
**Status:** Implemented
**Description:** Vitest unit and integration tests in `tests/`. The Layer 7 blind evaluation harness in `~/test_fixtures/blind_eval_2026/` provides ongoing adversarial testing. Cross-model consensus (Layer 5c) provides test-time agreement scoring across multiple models for the same input.

#### SA-15 Development Process, Standards, and Tools
**Status:** Implemented
**Description:** TypeScript strict mode, Wrangler-managed deployment, Git source control, public protocol repo for transparency.

#### SA-22 Unsupported System Components
**Status:** Implemented
**Description:** The system has no unsupported components. The only runtime component is the Cloudflare Workers V8 isolate, which is actively maintained by Cloudflare.

---

### 4.18 SC — System and Communications Protection

**Family Overview:** Communications protection is largely inherited from Cloudflare's TLS termination. Vernen-side protection includes hash-chain integrity, federation cryptographic signatures, and secure deletion patterns.

#### SC-1 Policy and Procedures
**Status:** Partially Implemented

#### SC-5 Denial of Service Protection
**Status:** Inherited (from Cloudflare)
**Description:** Cloudflare's global anycast network and DDoS protection are inherited. Vernen-side rate limiting (`src/api/middleware/rate-limit.ts`) provides additional per-client throttling.

#### SC-7 Boundary Protection
**Status:** Implemented (architecturally)
**Description:** The system boundary is enforced by Cloudflare's edge. All traffic enters through the route `compliance.vernenlegal.com/*`. There are no other entry points. Outbound traffic is constrained to documented destinations (§1.6).

#### SC-8 Transmission Confidentiality and Integrity
**Status:** Implemented
**Description:** All transmissions use TLS 1.2+ enforced by Cloudflare. Layer 8 federation explicitly rejects HTTP manifest URLs (`federation-protocol.ts: addPeer` throws if the URL does not start with `https://`).

#### SC-12 Cryptographic Key Establishment and Management
**Status:** Partially Implemented
**Description:** Vernen uses ECDSA P-256 keys for federation signing. Keys are generated via `crypto.subtle.generateKey` (`federation-protocol.ts: getOrCreateKeypair`) and stored in the `federation_keypair` D1 table. Bearer tokens (API keys) are managed via Workers Secrets.
**Gap:** The federation private key is currently stored in D1 rather than in a hardware-backed key store. Migration to Workers Secrets or HSM is on the roadmap. (Gap SC-12)

#### SC-13 Cryptographic Protection
**Status:** Implemented (with FIPS caveat)
**Description:** All cryptographic operations use Web Crypto via `crypto.subtle`:
- SHA-256 for hash chain and Merkle tree (FIPS 180-4 approved algorithm)
- ECDSA P-256 for federation signatures (FIPS 186-5 approved algorithm)
- AES-GCM (via Workers Secrets storage; inherited from Cloudflare)

The algorithms are FIPS-approved. **Whether the cryptographic module is FIPS 140-3 validated depends on the underlying Cloudflare environment.** Cloudflare for Government is FIPS-validated; the commercial environment may not be. See Gap CL-01.

#### SC-17 Public Key Infrastructure Certificates
**Status:** Inherited
**Description:** TLS certificates for `compliance.vernenlegal.com` are managed by Cloudflare.

#### SC-23 Session Authenticity
**Status:** Implemented (sessions are stateless)

#### SC-28 Protection of Information at Rest
**Status:** Inherited (D1 + KV + Secrets all encrypted at rest by Cloudflare)

---

### 4.19 SI — System and Information Integrity *(Vernen's other strongest control family)*

**Family Overview:** Together with AU-9, this is Vernen's strongest control family. The hash chain, Merkle tree, GitHub anchor, federation witnesses, conscientious identity framework, and Layer 7 forensic detectors all map to this family. The implementation depth here exceeds the LOW baseline by a significant margin and approaches the HIGH baseline on SI-7 specifically.

#### SI-1 Policy and Procedures
**Status:** Implemented
**Description:** Documented in the public protocol repository (`protocol/SPEC.md`, `protocol/LAYER_7_STRUCTURAL_FORENSIC_ANALYSIS.md`, `protocol/FEDERATION_PROTOCOL.md`) and in this SSP.

#### SI-2 Flaw Remediation
**Status:** Partially Implemented
**Description:** Flaws in the platform are remediated by the Steward via Git commits and Wrangler deployment. Cloudflare patches the underlying runtime. Flaws in detected documents (Layer 7 findings) are reported to clients via the Forensic Scan Report.

#### SI-3 Malicious Code Protection
**Status:** Inherited
**Description:** Cloudflare's runtime sandboxing prevents malicious code execution. The Worker isolate has no shell, no file system, and no privilege escalation path.

#### SI-4 System Monitoring
**Status:** Implemented (extends to Layer 7 forensic monitoring)
**Description:** System monitoring is implemented at multiple layers:
1. **Cloudflare logs** — operator-accessible runtime logs for all requests
2. **Hash chain integrity endpoint** — `/api/verify/chain/integrity` runs an end-to-end chain verification on demand
3. **Daily cron Merkle computation** — automated daily integrity checkpoint
4. **Layer 7 forensic detectors** — for content monitoring of documents flowing through the system, the four Layer 7 engines provide structural-fraud detection that is itself a form of system monitoring (system content being submitted by external parties)
5. **Layer 6 conscientious identity** — monitors confidence claims and refuses to overstate certainty on incomplete information

**Reference:** `src/services/verification-engine.ts`, all `src/services/*.ts` Layer 7 modules.

#### SI-4(7) Automated Response to Suspicious Events
**Status:** Implemented (Layer 6)
**Description:** Layer 6's Conscientious Identity Framework automatically marks any entity verification result as `UNDETERMINED` (with explicit false-negative warnings) when verification cannot reach a confident answer. This is the "automated response to suspicious events" pattern: rather than guessing, the system marks the situation as suspicious and refuses to assert a conclusion.

#### SI-5 Security Alerts, Advisories, and Directives
**Status:** Not Implemented (Gap SI-05)

#### SI-6 Security and Privacy Function Verification
**Status:** Implemented
**Description:** The Layer 7 blind evaluation harness verifies that the security and privacy functions of Layers 7a/7b/7c/7d perform as intended. Current state: 4/4 fixtures pass with 27/27 expected findings recalled. The harness is documented in `~/test_fixtures/blind_eval_2026/manifest.json` with hash-verified fixtures.

#### SI-7 Software, Firmware, and Information Integrity *(strongest single control)*
**Status:** Implemented (and exceeds LOW baseline; approaches HIGH on SI-7(1))
**Description:** Vernen's hash chain, Merkle tree, GitHub anchor, and federation cross-signing constitute a complete information integrity implementation. Specifically:

- **SI-7 (base):** Integrity verification tools detect unauthorized changes to the verification chain. Cryptographic hash linking ensures any modification to a historical record breaks every subsequent hash. The `/api/verify/chain/integrity` endpoint provides on-demand verification.

- **SI-7(1) Integrity Checks:** The chain is checked on every record append (the new record includes the previous record's hash, validating the chain). Daily, the cron-triggered Merkle root computation re-validates the entire day's records.

- **SI-7(2) Automated Notification of Integrity Violations:** Partially implemented. Integrity check failures are logged but not automatically alerted to the Steward beyond Cloudflare logs. (Gap SI-07-2)

- **SI-7(3) Centrally Managed Integrity Tools:** Implemented. The verification engine is the single integrity tool.

- **SI-7(5) Automated Response to Integrity Violations:** Partially implemented. Layer 7 engines that detect integrity violations in submitted documents refuse to anchor false findings.

- **SI-7(6) Cryptographic Protection:** Implemented via SHA-256 hash chain.

- **SI-7(7) Integration of Detection and Response:** Implemented via the recursive audit-the-audit pattern: Layer 7 findings are themselves anchored back into the verification chain.

- **SI-7(8) Auditing Capability for Significant Events:** Implemented. Every significant event generates a verification chain record.

- **SI-7(15) Code Authentication:** Implemented via the build attestation system. Each Worker version ID is recorded in the verification chain at deployment time.

**Reference:** `src/services/verification-engine.ts`, `src/services/verification-anchor.ts`, public spec: `protocol/SPEC.md`.

#### SI-10 Information Input Validation
**Status:** Implemented
**Description:** Every API handler validates JSON input shape before passing to service layer. The `parseJsonBody` utility (`src/utils/helpers.ts`) handles JSON parsing with explicit error handling. Layer 7 endpoints validate required fields (e.g., `/api/verify/unconscionability` checks for `documentId`, `documentType`, `principalAmount`, `paymentAmount`, `paymentFrequency`, `paymentCount` and returns 400 with explicit `missing` field list if any are absent or wrong type).

#### SI-11 Error Handling
**Status:** Implemented
**Description:** All exceptions are caught at the API handler boundary. Service layer exceptions are converted to JSON error responses with appropriate HTTP status codes (400 for client error, 500 for server error). Sensitive information is not exposed in error messages.

#### SI-12 Information Management and Retention
**Status:** Implemented
**Description:** Verification chain records are retained indefinitely. Client document content is retained only as needed for audit reporting and deleted on Final Payment per the service agreement. Operator-side data retention is governed by Cloudflare D1 retention.

---

### 4.20 SR — Supply Chain Risk Management

**Family Overview:** Vernen's supply chain is minimal: Cloudflare's runtime, Web Crypto algorithms, and zero npm production dependencies. This is the strongest possible supply chain posture short of running on bare metal.

#### SR-1 Policy and Procedures
**Status:** Implemented
**Description:** The zero-production-dependency rule is enforced at the codebase level. Any new dependency requires explicit Steward approval and would be visible in `package.json`.

#### SR-2 Supply Chain Risk Management Plan
**Status:** Implemented (this section)

#### SR-3 Supply Chain Controls and Processes
**Status:** Implemented
**Description:** Production code uses zero npm dependencies. Test code uses Vitest only and is not bundled into the production Worker. The build process uses the official Cloudflare Wrangler toolchain.

#### SR-5 Acquisition Strategies, Tools, and Methods
**Status:** Implemented
**Description:** The Steward selects all software components personally. No procurement process.

#### SR-9 Tamper Resistance and Detection
**Status:** Implemented
**Description:** The build attestation system records the Cloudflare Worker version ID for every deployment in the verification chain, providing tamper-evident linkage between source code and deployed version. Public repo mirroring ensures any change to the verification protocol code is publicly visible.

#### SR-11 Component Authenticity
**Status:** Implemented
**Description:** All components (the Worker bundle) are built from source by the Steward. There are no pre-built components from third parties.

---

## 5. LAYER-TO-CONTROL MAPPING SUMMARY

This section provides a one-table summary of how each Vernen verification protocol layer maps to specific NIST SP 800-53 Rev. 5 controls. This is the document a federal evaluator should look at first.

| Vernen Layer | Service File | Primary Controls | Secondary Controls |
|---|---|---|---|
| **L1 — Hash Chain** | `verification-engine.ts` | SI-7, SI-7(1), SI-7(6), AU-2, AU-9 | SI-7(8), AU-12 |
| **L2 — Daily Merkle Tree** | `verification-engine.ts` | SI-7, AU-9, AU-9(3) | AU-11 |
| **L3 — GitHub Anchor** | `verification-anchor.ts` | AU-9(2), AU-9(3) | SI-7(15) |
| **L4 — Bitcoin Anchor (planned)** | — | AU-9(2), AU-9(3) | — |
| **L5 — Constitutional Traceability** | `verification-engine.ts` | AU-3, AU-3(1), AU-12 | PT-2 |
| **L5c — Cross-Model Consensus** | `consensus-engine.ts` | SA-11, SA-11(1), SI-4(13) | RA-3 |
| **L6 — Conscientious Identity** | `conscientious-identity.ts` | SI-4(7), RA-5, PT-3 | SA-8 |
| **L6 — Subject Verification** | `subject-verification.ts` | RA-5, IA-12, SI-4 | RA-3 |
| **L7a — Temporal Paradox** | `temporal-paradox-filter.ts` | SI-4, AU-6, AU-6(1) | RA-3 |
| **L7b — Liability Mapping** | `liability-mapping.ts` | SI-4, RA-3, AU-6 | — |
| **L7c — Reclassification** | `reclassification-engine.ts` | SI-4, RA-3 | — |
| **L7d — Unconscionability** | `unconscionability-trigger.ts` | SI-4, AU-6, RA-3 | — |
| **Unified Pipeline** | `document-to-layer7.ts` | SI-4, RA-3, SI-10 | — |
| **L8 — Federation Protocol** | `federation-protocol.ts` | AU-9(2), AU-9(3), AU-12(3), SC-12 | IA-3, SC-13 |

The `verification-engine.ts` file alone covers more than half of the AU and SI families at Low baseline.

---

## 6. CLOUDFLARE INHERITANCE ANALYSIS

This section analyzes which controls Vernen inherits from the underlying Cloudflare platform, distinguishing between **commercial Cloudflare** (which Vernen currently runs on) and **Cloudflare for Government** (the FedRAMP-authorized environment that would be required for any actual ATO).

### 6.1 Inheritance Status: Commercial Cloudflare (current)

| Control Family | Inheritance | Notes |
|---|---|---|
| PE — Physical and Environmental | **De facto inherited but not FedRAMP-documented.** Cloudflare runs physically secured data centers, but the inheritance is not formalized in a FedRAMP package available to Vernen. | Acceptable for self-attestation; insufficient for ATO. |
| MP — Media Protection | Inherited (Cloudflare manages all storage media) | Same caveat. |
| SC-5 DDoS Protection | Inherited (Cloudflare's global anycast + DDoS shield) | Documented in Cloudflare's marketing; not in a FedRAMP package for commercial. |
| SC-17 PKI Certificates | Inherited (Cloudflare-managed TLS certificates) | Same. |
| SC-28 Encryption at Rest | Inherited (D1, KV, Secrets all encrypted) | Same. |
| SI-3 Malicious Code Protection | Inherited (V8 isolate sandboxing) | Same. |
| IA-7 Cryptographic Module | **Not validly inherited on commercial.** Cloudflare's commercial environment is not FIPS 140-3 validated. | Major gap; see Gap CL-01. |

### 6.2 Inheritance Status: Cloudflare for Government (post-migration)

If Vernen migrated to Cloudflare for Government, the inheritance would shift to:

| Control Family | Inheritance |
|---|---|
| All PE controls | Fully inherited via Cloudflare's FedRAMP authorization |
| All MP controls | Fully inherited |
| SC-5, SC-17, SC-28 | Fully inherited |
| SI-3 | Fully inherited |
| IA-7 | Fully inherited (Cloudflare for Government uses FIPS 140-3 validated modules) |
| SC-13 (Cryptographic Protection) | Module is now FIPS-validated |

**Migration cost estimate:** Significant. Some Workers/D1/KV features have feature gaps in Cloudflare for Government. Migration is months-of-engineering work, not a config change. See Gap CL-01.

---

## 7. APPENDIX A — GLOSSARY

| Term | Definition |
|---|---|
| **Anchor / Anchoring** | The act of writing a Merkle root to an external, append-only system (currently GitHub) so that subsequent rewrites of the root are externally detectable. |
| **ATO (Authority to Operate)** | A formal authorization, signed by an Authorizing Official, permitting a federal information system to operate in production. Vernen does not have an ATO. |
| **Citizen / Persona Citizen** | Vernen's term for an autonomous agent within the platform with a defined scope, skill set, and execution history. |
| **CRADA** | Cooperative Research and Development Agreement — the legal instrument used by NIST consortia to formalize participation. |
| **Federation peer** | Another Vernen instance, run by a different operator, that has registered with this instance and exchanges cross-attestations. |
| **Layer 1–8** | The eight layers of the Vernen Verification Protocol. See §5 for the layer-to-control mapping. |
| **Merkle root** | The single hash representing all records from a single UTC day. See `protocol/SPEC.md`. |
| **POA&M** | Plan of Action and Milestones — a tracked list of identified gaps and remediation plans. Appendix C of this document is the initial POA&M. |
| **SSP** | System Security Plan — the document type this draft is structured as. |
| **Steward** | The single operator/founder of Vernen. Functionally equivalent to "system owner" in NIST terminology. |

---

## 8. APPENDIX B — ACRONYMS

| Acronym | Expansion |
|---|---|
| AISIC | AI Safety Institute Consortium (NIST) |
| ATO | Authority to Operate |
| CAISI | Center for AI Standards and Innovation (NIST) |
| CRADA | Cooperative Research and Development Agreement |
| D1 | Cloudflare's serverless SQLite database |
| ECDSA | Elliptic Curve Digital Signature Algorithm |
| FedRAMP | Federal Risk and Authorization Management Program |
| FIPS | Federal Information Processing Standard |
| FISMA | Federal Information Security Modernization Act |
| HSM | Hardware Security Module |
| KV | Cloudflare's serverless key-value store |
| NIST | National Institute of Standards and Technology |
| NIST SP | NIST Special Publication |
| OSCAL | Open Security Controls Assessment Language |
| PII | Personally Identifiable Information |
| POA&M | Plan of Action and Milestones |
| Rev. 5 | Revision 5 of NIST SP 800-53 |
| SHA-256 | Secure Hash Algorithm 256-bit |
| SSP | System Security Plan |
| TLS | Transport Layer Security |
| UDAP | Unfair and Deceptive Acts and Practices |

---

## 9. APPENDIX C — GAP ANALYSIS AND PATH TO AUTHORIZATION

This appendix is the **initial Plan of Action and Milestones (POA&M)** for Vernen. Each gap identified in §4 is listed here with a proposed remediation, estimated effort, and priority.

### 9.1 Blocking Gaps (Must Close Before ATO is Possible)

| Gap ID | Title | Description | Remediation | Priority |
|---|---|---|---|---|
| **LE-01** | No legal entity | Vernen Legal Compliance is a stewardship enterprise without a registered legal entity. Federal procurement, CRADA, SAM.gov registration, and 3PAO engagement all require a legal entity. | Form a single-member LLC or sole proprietorship. Register with SAM.gov. Obtain EIN and CAGE code. | **CRITICAL — gates everything federal** |
| **CL-01** | Commercial Cloudflare (not FedRAMP) | The current production environment is Cloudflare's commercial offering, which is not FedRAMP-authorized. The PE, MP, and FIPS-related inheritances cannot be claimed in a real ATO context until migration to Cloudflare for Government. | Migrate the Worker bundle, D1 database, KV namespace, and Secrets to Cloudflare for Government. Verify feature parity for all bindings used. Update DNS. | **CRITICAL — required for any FedRAMP path** |
| **CA-02** | No 3PAO assessment | No control has been assessed by an independent Third Party Assessment Organization. | Engage a 3PAO. Estimated cost: $250K–$2M depending on baseline (Low to High). | **HIGH — required for ATO** |
| **CA-06** | No Authorization | No federal Authorizing Official has reviewed the system. | Identify a sponsoring agency, complete FedRAMP package, submit for AO review. | **HIGH — required for ATO** |

### 9.2 High-Priority Gaps

| Gap ID | Title | Description | Remediation | Priority |
|---|---|---|---|---|
| **FE-01** | Same-operator federation peer | The first Layer 8 federation peer (`vernen-peer-witness.michetype78.workers.dev`) is run by the same operator as the production instance. Cryptographically the cross-signatures are real and independently verifiable, but the meta-level claim "no single party can rewrite history" still has an asterisk. True federation requires at least one peer run by an unrelated third party (academic institution, partner organization, regulator, or independent operator). | Recruit one independent peer. Candidate institutions: Stanford CRFM, Berkeley CLTC, MIT CSAIL, NIST AI Consortium, a partner law firm, or another founder running an independent Vernen instance. The protocol is bilateral and the registration flow is documented; onboarding a new peer is a routine `POST /api/federation/peers` call once they deploy their own instance. | HIGH |
| **SC-12** | Federation private key in D1 | The federation signing key is currently stored in the `federation_keypair` D1 table rather than in a hardware-backed key store. | Migrate the private key to Workers Secrets, or to an HSM-backed signer. | HIGH |
| **AU-10** | Per-record signing | Records are batched into daily Merkle roots and signed at that level. Per-record signing would provide stronger non-repudiation. | Add per-record ECDSA signature using the federation key. | MEDIUM |
| **IR-01 / IR-08** | No incident response plan | No formal incident response procedures exist. | Draft an Incident Response Plan. Document escalation paths, communication procedures, recovery time objectives. | HIGH |
| **CP-02** | No contingency plan | No formal contingency planning document. | Draft a Contingency Plan. Document recovery time/point objectives, dependencies, recovery procedures. | HIGH |
| **AT-01** | No security awareness training | Single operator, but a documented training program is required for any institutional adoption. | Draft a Security Awareness and Training Plan. | MEDIUM (HIGH if scaling) |
| **AC-01** | No formal access control policy | The two-tier model is implemented but not documented as a policy. | Draft an Access Control Policy document. | MEDIUM |

### 9.3 Medium-Priority Gaps

| Gap ID | Title | Description | Remediation |
|---|---|---|---|
| **AC-04** | No formal information flow enforcement | Implicit constraints exist; explicit policy does not. | Document allowed external destinations and egress rules. |
| **CM-04** | No formal impact analysis | Changes are deployed without documented impact assessment. | Add a CHANGELOG.md and require impact notes for each significant change. |
| **AU-05** | No alerting on chain failures | Failures are logged but not actively alerted. | Add an alerting integration (e.g., webhook to operator). |
| **SI-07-2** | No automated integrity violation alerting | Same pattern as AU-05. | Same remediation. |
| **RA-05** | No vulnerability scanning | Zero deps minimizes exposure but no scheduled scan exists. | Add SAST and dependency-scan in CI. |
| **MA-01 / IR-01 / SI-05** | Various policy gaps | Several control families lack standalone policy documents. | Draft policy documents for each. |
| **IA-12** | No identity proofing | No identity proofing for any user category. | Document the Steward identity-proofing process. Define proofing requirements for any future federation peers. |

### 9.4 Low-Priority / Acceptable for Current Scale

These gaps are documented but acceptable for the current single-operator stewardship scale. They would need to be closed before institutional adoption.

| Gap ID | Title |
|---|---|
| AC-02 | Account management is informal |
| AT-02..04 | No training program |
| CP-04 | No contingency plan testing |
| PS-* | No personnel security |

### 9.5 Estimated Effort Summary

| Category | Cost / Effort |
|---|---|
| Blocking gaps (LE-01, CL-01, CA-02, CA-06) | Months of engineering, $250K–$2M for 3PAO, plus legal/incorporation costs |
| High-priority gaps (SC-12, AU-10, IR-01, IR-08, CP-02, AT-01, AC-01) | 4–6 weeks of focused work, primarily documentation |
| Medium-priority gaps | 2–3 weeks of focused work |
| Low-priority gaps | Open until institutional scale-up |

### 9.6 Path to Low-Baseline Authorization

A realistic path from the current state to a Low-baseline FedRAMP Tailored authorization would require, in order:

1. **Form legal entity** (Gap LE-01) — weeks
2. **Register SAM.gov + obtain EIN/CAGE** — weeks
3. **Migrate to Cloudflare for Government** (Gap CL-01) — months
4. **Close high-priority documentation gaps** (Gaps IR-01, IR-08, CP-02, AT-01, AC-01) — 4–6 weeks
5. **Engage 3PAO for assessment** — months, $250K–$2M
6. **Identify sponsoring agency** — variable
7. **Submit FedRAMP package; iterate with reviewers** — 6–18 months
8. **Receive ATO** — variable

**Total realistic timeline: 18–36 months** assuming sustained effort and a willing sponsoring agency. **Total realistic cost: $300K–$2.5M** including 3PAO, engineering, and legal costs.

---

## 10. APPENDIX D — REFERENCES

### NIST Publications

- **NIST SP 800-53 Rev. 5** — Security and Privacy Controls for Information Systems and Organizations
- **NIST SP 800-53A Rev. 5** — Assessing Security and Privacy Controls
- **NIST SP 800-60 Vol. 1 Rev. 1** — Guide for Mapping Types of Information and Information Systems to Security Categories
- **NIST SP 800-37 Rev. 2** — Risk Management Framework for Information Systems and Organizations
- **NIST SP 800-30 Rev. 1** — Guide for Conducting Risk Assessments
- **FIPS PUB 199** — Standards for Security Categorization of Federal Information and Information Systems
- **FIPS PUB 200** — Minimum Security Requirements for Federal Information and Information Systems
- **FIPS 140-3** — Security Requirements for Cryptographic Modules
- **FIPS 180-4** — Secure Hash Standard (SHA)
- **FIPS 186-5** — Digital Signature Standard (DSS)
- **NIST AI RMF 1.0 (NIST AI 100-1)** — Artificial Intelligence Risk Management Framework

### Vernen Public Documentation

- `protocol/SPEC.md` — Verification protocol architecture
- `protocol/PROOF_DEMO.md` — End-to-end verification example
- `protocol/NIST_AI_RMF_MAPPING.md` — Mapping to NIST AI RMF 1.0
- `protocol/LAYER_7_STRUCTURAL_FORENSIC_ANALYSIS.md` — Layer 7 architecture
- `protocol/FEDERATION_PROTOCOL.md` — Layer 8 architecture
- `protocol/KNOWN_GAPS_AND_ROADMAP.md` — Self-disclosed gaps

### Vernen Public Source

All source files referenced in this SSP are mirrored to the public repository at `github.com/WaistMaiLieP-H/vernen-verification-log/tree/main/protocol/`.

### Cloudflare Documentation

- Cloudflare Workers platform documentation
- Cloudflare for Government FedRAMP authorization (verification with Cloudflare required)

### External Standards

- **OSCAL** (Open Security Controls Assessment Language) — NIST machine-readable format for SSPs and POA&Ms

---

## 11. APPENDIX E — VERIFICATION INSTRUCTIONS FOR INDEPENDENT REVIEWERS

Anyone reviewing this SSP draft can independently verify the implementation claims in §4 by performing the following steps:

### E.1 Verify the Public Source

```bash
git clone https://github.com/WaistMaiLieP-H/vernen-verification-log.git
cd vernen-verification-log/protocol
ls -la
```

This repository contains the verification protocol source code under CC0-1.0. Each layer's implementation file is referenced in §4 of this document.

### E.2 Verify the Live Production Endpoint

```bash
curl -s https://compliance.vernenlegal.com/api/verify/build
```

Returns the current Worker version ID and build attestation. This is the deployed version that the implementation descriptions in §4 refer to.

### E.3 Verify a Daily Merkle Root

```bash
curl -s https://raw.githubusercontent.com/WaistMaiLieP-H/vernen-verification-log/main/2026/04/07.json
```

Returns the published Merkle root for the date 2026-04-07. Each daily root is committed to Git on the day it is computed.

### E.4 Verify a Layer Implementation

For example, to verify Layer 7c implements the AB5 ABC test:

```bash
curl -s https://compliance.vernenlegal.com/api/verify/reclassification/info
```

Returns the layer's documented detection categories and jurisdictional tests. Cross-reference against `protocol/reclassification-engine.ts` in the public repo.

### E.5 Verify the Federation Protocol

```bash
curl -s https://compliance.vernenlegal.com/api/federation/manifest
```

Returns the production instance's federation manifest, including its ECDSA P-256 public key.

### E.6 Run the Blind Evaluation

The Layer 7 blind evaluation harness is reproducible:

```bash
cd ~/test_fixtures/blind_eval_2026
export VERNEN_API_BASE=https://compliance.vernenlegal.com
export VERNEN_API_TOKEN=<token-on-request>
export VERNEN_USE_UNIFIED=1
python3 run_blind_eval.py verify    # checks fixture hashes against manifest
python3 run_blind_eval.py capture   # POSTs each fixture to the unified pipeline
python3 run_blind_eval.py score     # produces results/REPORT.md
```

Current state: 4/4 fixtures pass with 27/27 expected findings recalled and all engine verdicts at the manifest's strongest tier.

---

## END OF SELF-ATTESTATION DRAFT

**This draft is a living document.** Each gap closed in Appendix C should produce a new version of this SSP. The version number at the top should be incremented with every substantive change. All changes should themselves be anchored into Vernen's verification chain.

**The author welcomes review.** Anyone reviewing this document is encouraged to file issues against the public protocol repository or contact the Steward directly.

**License:** CC0-1.0 (this SSP draft is hereby released into the public domain, like the Vernen verification protocol code it documents).

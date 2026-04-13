# Vernen Legal Compliance Platform

Multi-state legal compliance engine built on Cloudflare Workers, powered by Persona Citizens.

---

## Judicial Standard of Notice (JSON)™

**Defined:** April 12, 2026 — Vernen Compliance LLC  
**Common Law Trademark:** International Class 045 — Legal Services and Compliance  
**USPTO Filing:** Pending

A **Judicial Standard of Notice (JSON)** is a structured, machine-readable compliance record
carrying the legal weight of formal notice — timestamped, immutable, and cryptographically
verifiable. Any document processed through the Vernen Compliance engine and rendered in this
format constitutes a Judicial Standard of Notice for purposes of legal accountability and
audit verification.

Every record produced by this engine is anchored to the six-layer compliance framework and
must satisfy the triple constraint before achieving notice status. Partial compliance is not notice.

The individual is the genesis block. The chain is the witness.

Full specification: [`docs/JSON_JUDICIAL_STANDARD_OF_NOTICE.md`](docs/JSON_JUDICIAL_STANDARD_OF_NOTICE.md)

*Note: The file format `.json` (JavaScript Object Notation, ECMA-404 / RFC 8259) is an open
international standard and is not claimed. This trademark applies exclusively to the legal
meaning of the acronym JSON within compliance and legal services contexts.*

---

## Traceable Standard (TS)™

**Defined:** April 12, 2026 — Vernen Compliance LLC  
**Common Law Trademark:** International Class 045 — Legal Services and Compliance  
**USPTO Filing:** Pending

A **Traceable Standard (TS)** is the executable compliance logic layer of the Vernen engine —
the structured, version-controlled, independently verifiable code that produces every Judicial
Standard of Notice. Every step the engine takes is recorded, timestamped, and verifiable.
Called with the same inputs at any point in time, it produces the same auditable output.

The TS produces the JSON. Together they form a complete chain of custody: how the analysis
was performed, and what it found.

Full specification: [`docs/TS_TRACEABLE_STANDARD.md`](docs/TS_TRACEABLE_STANDARD.md)

*Note: The file extension `.ts` (TypeScript) is an open standard maintained by Microsoft
and is not claimed. This trademark applies exclusively to the legal meaning of the acronym
TS within compliance and legal services contexts.*

---

## Statutory Query Ledger (SQL)™

**Defined:** April 12, 2026 — Vernen Compliance LLC  
**Common Law Trademark:** International Class 045 — Legal Services and Compliance  
**USPTO Filing:** Pending

A **Statutory Query Ledger (SQL)** is the structured, version-controlled record of legal
requirements, compliance rules, and governing standards that powers the Vernen engine.
Every entry traces to a specific statute, regulation, or governing standard. No entry
is valid without a traceable authority. An entry without a citation is not a Statutory
Query Ledger entry — it is an opinion. The Ledger holds law, not opinion.

Full specification: [`docs/SQL_STATUTORY_QUERY_LEDGER.md`](docs/SQL_STATUTORY_QUERY_LEDGER.md)

*Note: SQL (Structured Query Language, ISO/IEC 9075) is an open international standard
and is not claimed. This trademark applies exclusively to the legal meaning of the acronym
SQL within compliance and legal services contexts.*

---

## Master Verified Traceable Hash (MVTH)™

**Defined:** April 12, 2026 — Vernen Compliance LLC  
**Founder:** Michael Vernen Thomas Hartmann  
**Common Law Trademark:** International Class 045 — Legal Services and Compliance  
**USPTO Filing:** Pending

A **Master Verified Traceable Hash (MVTH)** is the highest-level artifact the Vernen engine
produces — the master case record representing a complete, verified, traceable compliance
engagement from intake through finding, sealed by a single cryptographic hash anchored to
the verification chain.

MVTH carries the initials of the founder — Michael Vernen Thomas Hartmann — embedded not
as a signature applied after the fact, but as the name of the standard itself. Every master
record the engine produces carries those initials in its designation. They are stamped into
the project DNA.

Full specification: [`docs/MVTH_MASTER_VERIFIED_TRACEABLE_HASH.md`](docs/MVTH_MASTER_VERIFIED_TRACEABLE_HASH.md)

---

## The Four-Layer Architecture

| Layer | Acronym | Full Name | Role |
|-------|---------|-----------|------|
| Foundation | SQL | Statutory Query Ledger | The law library |
| Engine | TS | Traceable Standard | The logic |
| Output | JSON | Judicial Standard of Notice | The finding |
| Master Record | MVTH | Master Verified Traceable Hash | The complete case |

SQL feeds TS. TS produces JSON. JSON aggregates into MVTH.  
The chain runs in one direction and cannot be reversed or altered.

---

## Development

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run deploy
```

## Architecture

- **REGULIS** — Regulatory intelligence Persona Citizen (first to deploy)
- **FORGE-0** — Autonomous builder worker
- **SENTINEL-0** — Compliance auditor worker
- **SCAN-1** — Regulatory scanner (REGULIS's first worker)

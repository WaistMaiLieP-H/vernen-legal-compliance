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

# CHRONICLE — Governing Standard

**Defined:** April 12, 2026  
**Author:** Vernen Compliance LLC  
**Status:** Active  

---

## What CHRONICLE Is

CHRONICLE is the restricted historical archive within the Vernen Compliance platform.
It contains primary source legal materials whose historical content includes language,
doctrine, or legal construction that is offensive, discriminatory, or otherwise
objectionable by present-day standards.

CHRONICLE exists because the law has a history. Some of that history is shameful.
None of it can be removed from the chain without breaking the chain. CHRONICLE holds
it intact, verified, and inaccessible to anyone who has not acknowledged their
responsibility in receiving it.

---

## What THRESHOLD Is

THRESHOLD is the mandatory gateway to CHRONICLE. No path to CHRONICLE exists that
does not pass through THRESHOLD. Any direct access attempt to CHRONICLE that bypasses
THRESHOLD is redirected to THRESHOLD automatically.

THRESHOLD contains one document: the Declaration of Historical Record Access.
That Declaration must be read and acknowledged before access is granted.
Acknowledgment generates a signed, time-limited access token.
That token is logged as a MVTH record in the verification chain.

---

## Security Architecture

### Access Control

```
Request for CHRONICLE content
        ↓
Does session carry valid THRESHOLD acknowledgment token?
        ↓                          ↓
       YES                         NO
        ↓                          ↓
  Grant access              Redirect to THRESHOLD
  Log MVTH record           Serve Declaration
                            Await acknowledgment
                            Issue token on acknowledgment
                            Log MVTH record
                            Grant access
```

### Token Specification

| Property | Value |
|----------|-------|
| Type | Signed JWT |
| Expiry | 8 hours per session |
| Payload | User session ID, acknowledgment timestamp, MVTH anchor hash |
| Storage | KV namespace — `CHRONICLE_ACCESS` |
| Revocable | Yes — by steward action |

### Access Logging

Every access event — acknowledgment, token issuance, content access, access denial,
redirect — is logged as a MVTH record in the verification chain. The log contains:

- Session identifier
- Timestamp
- Action taken (ACKNOWLEDGED / ACCESSED / DENIED / REDIRECTED)
- Content path requested
- MVTH anchor hash

No access to CHRONICLE is silent. Every crossing of the Threshold is recorded permanently.

---

## Content Standards for CHRONICLE

Material admitted to CHRONICLE must meet all of the following:

1. **Primary source** — the original statute, regulation, opinion, or instrument; not a
   summary, paraphrase, or secondary account

2. **Traceable Standard compliant** — every entry has a complete citation, jurisdiction,
   effective date, and historical chain of events documented

3. **Contextual record** — every entry includes documentation of the historical context
   in which the law was enacted, its enforcement history, and its ultimate repudiation,
   reform, or replacement where applicable

4. **No editorial opinion** — CHRONICLE contains facts and primary sources only;
   analysis and opinion belong in the Citizen engagement layer, not the Archive

5. **Six-layer anchored** — every entry is anchored to the compliance layer it belongs to
   within the Vernen framework

---

## What Does Not Belong in CHRONICLE

- Current law that contains no offensive historical content
- Secondary sources, summaries, or commentary
- Internal platform documentation
- Anything that has not been reviewed and admitted by the steward

---

## Admission Process

When a law is discovered at its source and its historical chain contains sensitive or
offensive content:

1. The law is flagged during ingestion
2. The full historical chain is documented — origin, evolution, enforcement, repudiation
3. The material is placed in CHRONICLE, not in the general Statutory Query Ledger
4. A THRESHOLD acknowledgment requirement is attached to the entry
5. A MVTH record is created documenting the admission decision, the steward who approved
   it, and the timestamp
6. The entry becomes accessible only through THRESHOLD

---

## Relationship to the Four-Layer Architecture

| Layer | Acronym | Role in CHRONICLE |
|-------|---------|-------------------|
| Foundation | SQL | Historical statutes stored as Statutory Query Ledger entries |
| Engine | TS | Traceable Standards that process and contextualize the material |
| Output | JSON | Judicial Standards of Notice produced from CHRONICLE engagements |
| Master Record | MVTH | Master record sealing each CHRONICLE access and engagement |

CHRONICLE is not outside the architecture. It is a protected section of it.
The same standards apply. The same chain holds. The gate is THRESHOLD.

---

*Vernen Compliance LLC — compliance.vernenlegal.com*  
*"The document date is the law that governs."*

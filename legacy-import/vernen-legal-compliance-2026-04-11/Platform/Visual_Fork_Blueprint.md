# Visual Fork — Blueprint & Architecture
**Vernen Legal Compliance · Fork 2**
**Date:** 2026-04-11
**Status:** Foundation built · Full blueprint defined

---

## What the Visual Fork Is

The Visual Fork is the compliance layer applied to what you *see* in real time.

Every human interaction with a legal, medical, financial, or governmental system produces documents, signage, disclosures, forms, and physical evidence. The Visual Fork captures those surfaces at the point of encounter — through the lens of smart glasses or a device camera — and instantly routes them through the Vernen compliance engine for real-time audit.

**The core principle:** if a document exists and a law governs it, the moment you look at it a Citizen should be able to tell you whether it complies.

---

## What Already Exists

**`/glasses-app/` — Vernen Secure Comply (Android XR)**

| Component | Status | Description |
|---|---|---|
| `GlassesActivity.kt` | Built | In-lens display renderer, lifecycle-managed |
| `VernenGlassesApp.kt` | Built | Main Compose UI, screen routing |
| `VernenApiClient.kt` | Built | Live connection to compliance.vernenlegal.com API |
| `CompanionActivity.kt` | Built | Phone-side companion for processing offload |
| Voice commands | Built | On-device speech recognition (no cloud required) |
| Camera → OCR → audit pipeline | Built | Scan document, extract text, route to Citizen |
| Live translation overlay | Built | In-lens real-time translation with compliance verification |
| Regulatory alerts | Built | Real-time push from the compliance engine to the lens |

**Existing voice commands:**
- `"scan document"` → camera captures, OCR runs, audit fires
- `"check compliance"` → queries current compliance status
- `"translate"` → begins live translation overlay in lens
- `"audit history"` → displays recent findings in lens

---

## The Compliance Vision — What It Does at Full Build

### 1. Document Compliance at Point of View
You look at a document — a contract, a police report, a medical consent form, a court filing, a lease, an eviction notice, a car purchase agreement.

The glasses:
- Capture the document via camera
- OCR extracts the text on-device (no cloud required for extraction)
- Routes to the appropriate CITIZEN based on document classification
- Citizen applies triple-constraint audit (Governing Guidelines · Standards of Creation · SOC integrity)
- Finding overlays in the lens within seconds:
  - **GREEN:** Document appears compliant
  - **YELLOW:** Anomalies detected, review flagged items
  - **RED:** Compliance violation found — specific standard cited

**Legal significance:** Creates a timestamped, device-attested, tamper-evident record of the document at the moment of encounter. The audit trail begins the second you look at it.

### 2. Real-Time Certified Translation
You are in a courtroom, a medical appointment, a government hearing, a police encounter. Someone speaks in a language you do not understand.

The glasses:
- Capture audio in real time
- On-device speech recognition processes the audio (no cloud, no interception risk)
- Translation renders in the lens
- Every translation is timestamped and logged to the audit trail
- Translation is flagged against certified interpreter standards (California Rule of Court 2.890, 28 USC § 1827 for federal proceedings)
- Discrepancies between what was said and what an interpreter claims was said are flagged

**Legal significance:** Enforces the right to a competent interpreter (42 USC § 2000d, Cal. Gov. Code § 68560) at the point of the interaction, with an audit-trailed record that survives the proceeding.

### 3. Visual Evidence Chain of Custody
You witness something that matters legally — a signature being forged, a document being altered, a disclosure being omitted, a physical condition that constitutes evidence.

The glasses:
- Continuous passive capture (opt-in, user-controlled)
- Every frame timestamped against device attestation signature (Communications Fork integration)
- Chain of custody log: what was seen, when, on what device, by whom, verified by the Vernen ledger
- Evidence package exportable as a court-ready format with provenance attestation

**Legal significance:** Eliminates the "you have no proof" defense for real-time events. The evidence exists the moment the event occurs, with a provenance chain that doesn't depend on memory.

### 4. Regulatory Signage & Business Compliance
You walk into a business — a food establishment, a contractor's job site, a medical office, a car dealership.

The glasses:
- Scan posted licenses, permits, certifications, disclosures
- Verify license numbers against live DCA, CSLB, CDFA, and other agency databases
- Flag expired licenses, missing required postings, non-compliant disclosures
- Alert in lens: "This contractor's license expired 4 months ago"

**Legal significance:** Puts compliance verification in the hands of the consumer at the point of transaction, before they are harmed.

---

## Technical Architecture

```
[Physical World]
      │
      ▼
[Smart Glasses Camera / Device Camera]
      │  raw visual input
      ▼
[On-Device Processing Layer]
      │
      ├── OCR Engine (on-device, no cloud)
      ├── Speech Recognition (on-device, no cloud)
      ├── Document Classification (on-device ML)
      └── Audio Capture
      │
      ▼
[Vernen API Gateway — compliance.vernenlegal.com]
      │
      ├── Document Router → appropriate CITIZEN
      ├── Translation Engine → Language Access Citizen
      ├── License Verification → live agency database check
      └── Evidence Chain → tamper-evident audit log
      │
      ▼
[CITIZEN Audit Layer]
      │
      ├── Triple-Constraint Audit fires automatically
      ├── Finding generated with standard citation
      ├── Severity rated (GREEN / YELLOW / RED)
      └── Audit trail written to immutable log
      │
      ▼
[Output to Lens / Companion Device]
      │
      ├── In-lens overlay (finding, translation, alert)
      ├── Companion device notification
      └── Evidence package export
```

---

## The CITIZEN for this Fork

**Visual Compliance Verification Citizen**

Scope: Any document, disclosure, signage, or visual surface subject to a compliance standard.

Skills:
- Document classification and routing
- Triple-constraint audit at point of capture
- Certified translation verification
- Chain-of-custody evidence generation
- License and permit verification against live agency data
- Real-time regulatory alert generation
- Court-ready evidence package assembly

This Citizen is the bridge between what the lens captures and what the law requires.

---

## What Still Needs to Be Built

| Component | Priority | Description |
|---|---|---|
| Android XR hardware integration | High | Glasses-specific display API (beyond phone screen) |
| On-device document classifier | High | ML model: contract / police report / medical / financial / government |
| Evidence chain export format | High | Court-ready package with provenance attestation |
| License database connectors | Medium | Live CSLB, DCA, CDFA, DMV verification calls |
| Passive capture mode | Medium | Continuous opt-in recording with chain of custody |
| Visual Compliance Citizen build | High | Scaffold and build per Citizens methodology |
| Communications Fork integration | Medium | Device attestation ties evidence to verified device identity |

---

## Relationship to Other Forks

| Fork | Connection |
|---|---|
| CITIZEN | Visual Fork routes to Citizens for audit; Citizens generate the findings |
| Audio | Visual + Audio together cover a complete interaction (see + hear) |
| Communications | Device attestation verifies that the capturing device is what it claims to be, anchoring the evidence chain |
| Software | Apps that request camera access are a Software Fork compliance surface |

---

## The Story in One Sentence

**You look at a document — a Citizen reads it for you, tells you immediately whether it complies with the law, and creates a timestamped record that survives any dispute about what you saw.**

---

*Source code: ~/Documents/VernenLegalCompliance/glasses-app/*
*Part of Vernen Compliance LLC · vernenlegal.com*

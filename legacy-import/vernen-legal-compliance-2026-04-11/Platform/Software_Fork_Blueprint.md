# Software Fork — Blueprint & Architecture
**Vernen Legal Compliance · Fork 5**
**Date:** 2026-04-11
**Status:** First instrument operational · Full blueprint defined

---

## What the Software Fork Is

The Software Fork is the compliance layer applied to software itself — as a legal surface.

Every other fork operates on a device, through a channel, capturing something from the world. The Software Fork audits what that device is running. The app on your phone. The browser extension in your browser. The SaaS platform handling your medical records. The firmware in your router. The SDK embedded in a children's game.

Software is the invisible layer that governs what data is collected, who it is shared with, and under what terms — and it is almost entirely unaudited at scale.

**The core principle:** software that touches regulated data is subject to law. The law requires disclosure. The Software Fork verifies that disclosure is real, accurate, and complete — at scale, automatically, before anyone is harmed.

---

## What Already Exists

**560-App Google Play Corpus — Operational (April 2026)**

The first Software Fork instrument is built and running. A full corpus scan of the trucker/fuel/wifi/router/signal sector of the Google Play Store:

| Instrument | Output | Status |
|---|---|---|
| `scan_play_store.py` | 560 unique apps, CSV + JSON, 45 keywords | Operational |
| `exposure_aggregate.py` | 4.08B cumulative installs, fraud exposure quantification | Operational |
| `play_store_suspicious_engagement.csv` | 99 apps flagged, engagement-fingerprint fraud detection | Operational |
| `play_store_audit_001-002.md` | Full compliance audit: GDPR, CCPA, COPPA, FTC, Google Play policies | Operational |

**Key findings already documented:**

- **Trucker Path** (50M installs): Privacy policy URL serves Terms of Service — zero privacy disclosures at the mandated URL. Critical CCPA, GDPR violation.
- **Truckers of Europe 3** (50M installs): Self-declared unencrypted data transmission, no deletion mechanism, COPPA exposure, HTTP privacy policy URL. Four critical findings.
- **99/560 apps** (17.7%): Engagement fraud signature — review/rating ratio below 2% (organic baseline: 5–20%). 1.9B cumulative installs in the flagged set.
- **4.08B total installs** in corpus: estimated 685M–1.1B accounts with PII exposure from apps with unverified or non-compliant data practices.

**Detection methodology already proven:**
- Privacy policy URL fetch + content analysis (what does the URL actually serve?)
- Data Safety declaration vs. privacy policy contradiction detection
- Engagement-fingerprint fraud scoring (review/rating ratio)
- GDPR Art. 32 (encryption requirement) vs. self-declared unencrypted transmission
- COPPA exposure: "Everyone" rated apps + ad network + persistent identifier = federal violation
- FTC Click-to-Cancel: phone-only cancellation for subscription apps = unlawful under 2025 rule

---

## The Compliance Vision — What It Does at Full Build

### 1. Mobile App Store Compliance Audit (Multi-Platform)

The Play Store scan proves the methodology. The Software Fork extends it to every major distribution platform:

| Platform | Install Base | Regulatory Surface |
|---|---|---|
| Google Play Store | 3.5B devices | GDPR, CCPA, COPPA, FTC § 5, Google Play Policy |
| Apple App Store | 1.3B devices | GDPR, CCPA, COPPA, FTC § 5, Apple App Store Guidelines |
| Microsoft Store | 1.4B devices | GDPR, CCPA, FTC § 5, Microsoft Store Policies |
| Amazon Appstore | Fire TV + tablets | COPPA (children's content dominant), FTC § 5 |
| Samsung Galaxy Store | 600M devices | GDPR, CCPA, Samsung Developer Policy |

The Software Fork:
- Scans each store by industry category and keyword
- Extracts: app metadata, privacy policy URL, Data Safety / Nutrition Label declarations, permissions requested
- Fetches and analyzes privacy policy content against declaration
- Flags contradictions, missing disclosures, non-compliant terms
- Scores engagement-fingerprint for fraud signals
- Generates per-app compliance findings with specific regulation citations

---

### 2. Privacy Policy vs. Data Practice Contradiction Detection

The most common and consequential software compliance failure: **what the app says it does versus what it actually does.**

The Software Fork runs a three-layer contradiction analysis:

**Layer 1 — Declaration vs. Policy**
- Google Data Safety / Apple Nutrition Label: what the developer self-declared
- Privacy policy: what the text actually says
- Flag every contradiction (declares "no third-party sharing" → policy text grants broad sharing rights)

**Layer 2 — Policy vs. Permission**
- Android permission manifest / iOS entitlements: what the app actually requests at the OS level
- Privacy policy: what the text claims to collect
- Flag undisclosed data access (app requests location permission → privacy policy says "we do not collect location data")

**Layer 3 — Policy vs. SDK**
- Known SDK fingerprinting: identify embedded ad networks, analytics SDKs, and data brokers by package signatures
- Cross-reference against the SDK's known data collection practices
- Flag when embedded SDKs collect data that the host app's policy doesn't disclose

**Legal framework:**
- GDPR Art. 13/14: explicit disclosure of all data collected, purposes, and recipients
- CCPA § 1798.100: right to know — every category of data collected must be disclosed
- FTC § 5: unfair or deceptive acts — misrepresentation of data practices is deception per se
- COPPA 16 CFR § 312.4: actual notice before collection from children

---

### 3. Children's App Compliance Audit

COPPA is the most systematically violated privacy law in software. The violations are:
- Structural (the regulatory framework has a structural gap: "Everyone" rating ≠ "not directed to children")
- Profitable (children's engagement = highest LTV for ad networks)
- Hard to detect manually at scale

The Software Fork COPPA module:
- Identifies apps rated "Everyone" or "Everyone 10+" with embedded advertising SDKs
- Maps ad SDK identity against FTC's known behavioral advertising networks
- Flags persistent identifier collection (device ID, advertising ID) in "Everyone"-rated apps
- Cross-references against COPPA Safe Harbor certification (CARU, kidSAFE, PRIVO)
- Generates finding: uncertified "Everyone"-rated app with behavioral ad network = COPPA exposure

**Market reality:** The FTC has levied COPPA fines of $275M (Epic Games, 2023), $170M (YouTube/Google, 2019), and $5.7M (Musical.ly/TikTok, 2019). The pattern repeats because no systematic detection layer exists at scale before the violation completes.

---

### 4. Browser Extension Compliance Audit

Browser extensions sit in the most privileged position in a user's digital life: they read every page the user visits, every form they fill out, every credential they type. The regulatory disclosure requirements are the same as apps. The audit rate is close to zero.

The Software Fork extension module:
- Scrapes the Chrome Web Store, Firefox Add-ons, and Edge Add-ons by category
- Extracts declared permissions (tabs, history, webRequest, storage, identity)
- Fetches privacy policy and cross-references against permission scope
- Flags undisclosed data access, missing data retention terms, absent deletion mechanisms
- Special flag: extensions with `history` + `webRequest` permissions + no meaningful privacy policy = high-risk surveillance tool

---

### 5. SaaS & Web Platform Compliance Audit

SaaS platforms handling regulated data (healthcare, financial, legal, HR) are subject to sector-specific requirements beyond general privacy law:

| Sector | Regulations | Compliance Surface |
|---|---|---|
| Healthcare SaaS | HIPAA, HITECH | BAA requirement, PHI handling, breach notification |
| Financial SaaS | GLBA, FCRA, SOX | Data retention, audit trails, access controls |
| HR / Employment | EEOC, BIPA, state biometric laws | Biometric data, hiring algorithm disclosure |
| Legal / Attorney | State bar data rules, ABA 1.6 | Client confidentiality, cloud storage compliance |
| Education / EdTech | FERPA, COPPA, state student privacy laws | Student data, third-party sharing prohibition |

The Software Fork SaaS module:
- Identifies SaaS platforms by sector
- Audits Terms of Service and Privacy Policy against sector-specific requirements
- Flags missing BAA offers (healthcare), absent GLBA notice (financial), undisclosed biometric collection (BIPA states)
- Generates findings routable to the appropriate Citizen for full analysis

---

### 6. Firmware & SDK Compliance

The outermost layer — software that users never see:

**Firmware:** Routers, IoT devices, and embedded systems often run software with persistent data collection and no meaningful privacy disclosure. FTC § 5 applies. CCPA applies if California consumers are users.

**SDKs:** Third-party SDKs embedded in apps operate as de facto data collectors under the host app's privacy policy — but collect under the SDK vendor's actual terms. This is the primary vector for undisclosed data sharing.

The Software Fork SDK intelligence layer:
- Maintains a registry of known SDKs and their documented data collection practices
- Fingerprints installed SDKs by package signature against the registry
- Cross-references the host app's privacy policy against the SDK's actual behavior
- Flags undisclosed third-party data flows

---

## Technical Architecture

```
[App Store / Web Platform]
      │
      ├── Keyword/category sweep
      ├── App metadata extraction
      └── Privacy policy URL + Data Safety declaration fetch
      │
      ▼
[Software Fork Intake Engine]
      │
      ├── Privacy policy content fetch + parse
      ├── Permission manifest extraction (Android/iOS)
      ├── SDK fingerprint detection
      ├── Engagement-fingerprint fraud scoring
      └── Sector classification (healthcare / financial / children / general)
      │
      ▼
[Contradiction Detection Layer]
      │
      ├── Layer 1: Declaration vs. Policy text
      ├── Layer 2: Policy vs. Permission manifest
      └── Layer 3: Policy vs. SDK known behavior
      │
      ▼
[Compliance Rule Engine — compliance.vernenlegal.com]
      │
      ├── GDPR module (Art. 5, 6, 13, 14, 17, 32, 33)
      ├── CCPA/CPRA module (§ 1798.100–1798.199)
      ├── COPPA module (16 CFR Part 312)
      ├── FTC module (§ 5, Click-to-Cancel, ROSCA)
      ├── HIPAA module (45 CFR Parts 160, 164)
      ├── GLBA module (16 CFR Part 314)
      └── Platform policy module (Google Play, Apple, Microsoft)
      │
      ▼
[CITIZEN Audit Layer]
      │
      ├── Software Compliance Auditor Citizen (primary)
      ├── Routes to domain Citizens for sector findings:
      │   ├── Medical Privacy Officer (HIPAA findings)
      │   ├── Consumer Protection Litigator (CCPA/FTC findings)
      │   └── Civil Rights Litigator (COPPA findings)
      └── Finding generated: severity + statute + evidence + remediation
      │
      ▼
[Output Channels]
      │
      ├── Per-app compliance report
      ├── Corpus-level exposure aggregate
      ├── Regulatory routing (FTC complaint draft, AG referral)
      └── Audit trail: finding hash + timestamp + source evidence
```

---

## The CITIZEN for This Fork

**Software Compliance Auditor Citizen**

Scope: Any software — mobile app, browser extension, SaaS platform, firmware, SDK — that operates in a regulated context, collects user data, or is subject to platform distribution policies.

Skills:
- Privacy policy content analysis and statutory cross-reference
- Data Safety / Nutrition Label declaration vs. policy contradiction detection
- Android permission manifest and iOS entitlement audit
- SDK fingerprinting and third-party data flow analysis
- COPPA age-gate and advertising network compliance audit
- FTC unfair and deceptive practice identification
- GDPR lawful basis and data minimization compliance audit
- CCPA/CPRA consumer rights disclosure verification
- Engagement-fingerprint fraud scoring and flagging
- Platform developer policy compliance (Google Play, Apple, Microsoft, Samsung)
- HIPAA software vendor compliance (BAA, PHI handling)
- Regulatory finding packaging for FTC, state AG, and platform policy enforcement

---

## Market Context

| Segment | Scale | Current Gap |
|---|---|---|
| Google Play Store | 3.5M apps | No systematic compliance audit at scale |
| Apple App Store | 1.7M apps | Privacy Nutrition Labels self-declared, unverified |
| Browser extensions (Chrome) | 180,000+ | Almost entirely unaudited |
| COPPA violations (estimated active) | Thousands of apps | FTC enforcement is complaint-driven, not systematic |
| GDPR fines (EU, cumulative through 2025) | $4.5B+ | Mostly large companies; small app developers unaudited |
| CCPA enforcement (CA AG) | Growing | Complaint-driven; no proactive app audit infrastructure |
| SDK data broker market | $12B+/year | Almost entirely undisclosed in host app policies |

The Software Fork closes a gap that has existed since the first privacy laws were applied to mobile apps — no systematic, independent compliance audit layer has ever existed. The 560-app scan is proof the methodology works.

---

## What Still Needs to Be Built

| Component | Priority | Description |
|---|---|---|
| Multi-store scanner (Apple, Microsoft, Amazon) | High | Extend Play Store methodology to all major stores |
| SDK fingerprint registry | High | Known SDK → data collection behavior database |
| Permission manifest extractor | High | Android APK + iOS IPA static analysis |
| Layer 2/3 contradiction engine | High | Policy vs. permission + policy vs. SDK cross-reference |
| HIPAA/GLBA sector modules | Medium | Sector-specific compliance rules for SaaS |
| Browser extension scanner | Medium | Chrome Web Store + Firefox Add-ons automated sweep |
| Regulatory routing module | Medium | Finding → FTC complaint / AG referral package |
| Software Compliance Auditor Citizen build | High | Scaffold and build per Citizens methodology |
| COPPA safe harbor registry | Medium | CARU, kidSAFE, PRIVO certification database |

---

## Relationship to Other Forks

| Fork | Connection |
|---|---|
| CITIZEN | Software Fork findings route to domain Citizens — a COPPA finding goes to Consumer Protection Litigator; a HIPAA finding goes to Medical Privacy Officer |
| Visual | Apps that request camera access are audited for appropriate disclosure in the Software Fork; the Visual Fork captures what the camera sees, the Software Fork audits whether the app has permission and has disclosed what it does with that capture |
| Audio | Apps that request microphone access are a Software Fork compliance surface; Audio Fork captures the sound, Software Fork audits whether the app's disclosure around microphone use is lawful |
| Communications | A cloned or compromised device (Communications Fork scope) is a device where any app on it may be operating outside its stated permissions. Communications Fork attests the device; Software Fork audits what's running on it |

---

## The Story in One Sentence

**Before you install an app, before you grant a permission, before a single byte of your data leaves your device — the Software Fork tells you whether the software asking for it has the legal right to collect it, the obligation to protect it, and the disclosed intention to use it lawfully.**

---

*First instrument: ~/Vernen/research/play_store_scan/ · 560 apps · operational April 2026*
*Part of Vernen Compliance LLC · vernenlegal.com*

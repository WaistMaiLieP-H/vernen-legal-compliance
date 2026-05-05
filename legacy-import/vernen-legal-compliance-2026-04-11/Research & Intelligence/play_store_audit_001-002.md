# Play Store Compliance Audit — Apps 001 & 002

**Source CSV:** `~/Desktop/play_store_apps.csv` (rows 1–2)
**Audit date:** 2026-04-10
**Frameworks evaluated:** Google Play Developer Program Policies (User Data; Data safety; Privacy Policy), GDPR (Arts. 12–22, 32), CCPA/CPRA, COPPA (16 CFR Part 312), FTC § 5 (deceptive/unfair), FTC Click-to-Cancel Rule (Negative Option, eff. 2025)
**Method:** Live retrieval of Google Play Data Safety pages + developer-declared privacy policy URLs; comparison of Data Safety declarations against actual privacy-policy text and against required disclosures.

---

## App 001 — Trucker Path: Truck GPS & Fuel

| Field | Value |
|---|---|
| Package ID | `com.sixdays.truckerpath` |
| Developer | Trucker Path, Inc. (Phoenix, AZ) |
| Category | Maps & Navigation |
| Real installs | 4,944,754 |
| Content rating | Everyone |
| Ads / IAP | Yes / Yes |
| Privacy policy URL (declared) | https://truckerpath.com/privacy-policy |

### Data Safety form (developer's own declaration)
**Collected:**
- **Personal info:** Name, Email address, User IDs, Address, Phone number
- **Location:** Approximate **and** Precise
- **Photos & Videos**
- **Audio:** Voice or sound recordings
- **Files and docs**
- **Financial info:** Purchase history
- **Device or other IDs**
- **App activity:** Interactions, in-app search history, other user-generated content
- **App info & performance:** Crash logs, diagnostics, other performance data

**Sharing with third parties:** "No data shared with third parties"
**Encryption in transit:** Yes
**Data deletion option:** Yes

### Compliance findings

**FINDING 1 (CRITICAL) — Privacy policy URL serves Terms of Service, not a privacy policy.**
The URL declared on the Play Store listing (`/privacy-policy`) returns a 57,000-character document whose main content area (51,860 chars) is the Trucker Path **Terms of Service** — sections 1–30 cover license, eligibility, content rules, billing, arbitration, jury-trial waiver, governing law (Arizona). The only privacy-policy-specific content is a single trailing paragraph (Section 31, "Third Party Partners Access to Information") listing AdMob and Appodeal with links to **their** privacy policies.

The document does **not contain** any of the disclosures required by Google Play's User Data policy:
- No description of what personal data is collected
- No description of how data is used
- No description of how data is shared
- No data retention period
- No GDPR rights (access, deletion, portability, objection)
- No CCPA / CPRA rights ("Do Not Sell or Share", right to know, right to delete, financial-incentive notice)
- No COPPA / children's-privacy section
- No account or data deletion process
- No privacy contact (email, address, DPO, or web form)
- No "last updated" / "effective date"
- No international data transfer disclosure (despite being a US-based service used internationally)

**Why this matters:** Google Play Developer Program Policies — User Data section: *"If your app handles personal and sensitive user data, you must post a privacy policy in both the designated field in Play Console and from within the Play-distributed app itself. The privacy policy must, together with any in-app disclosures, comprehensively disclose how your app collects, accesses, uses, and shares user data..."* A privacy policy URL that returns a ToS does not satisfy this requirement. App is reportable to Google Play Trust & Safety on this basis alone.

**FINDING 2 (HIGH) — Data Safety contradiction: "no data shared" vs. ad SDK use.**
The Data Safety form declares "No data shared with third parties." The trailing privacy-policy paragraph names **AdMob** (Google) and **Appodeal** as third-party advertising partners that "may access your information." Ad mediation SDKs that collect Advertising ID and device identifiers for ad targeting are typically classified as "sharing" under Google Play's Data Safety taxonomy when data leaves the developer's environment for the ad network's own purposes. Either:
- (a) the Data Safety declaration is wrong and should be corrected to declare sharing, or
- (b) the privacy-policy passage is wrong and these SDKs aren't actually used.
Either way, the public disclosures are internally inconsistent.

**FINDING 3 (MEDIUM) — FTC "Click-to-Cancel" exposure.**
Section 2 of the published ToS requires that subscription cancellations *"must be made via a live telephone conversation via Trucker Path staff to be considered valid."* Under the FTC's Negative Option Rule (Click-to-Cancel, finalized Oct 2024, enforcement effective 2025), sellers must provide a cancellation mechanism *at least as easy as the sign-up mechanism*. Subscribers who signed up through the Play Store (a tap) cannot be lawfully forced into a telephone-only cancellation flow. State analogues already in force (CA Auto-Renewal Law, NY GBL § 527-a) impose similar duties.

**FINDING 4 (MEDIUM) — Sensitive-data collection without proportional disclosure.**
The Data Safety form declares collection of **precise location**, **photos**, **videos**, **voice recordings**, and **address + phone** — all categories Google classifies as "sensitive." The User Data policy requires *prominent in-app disclosure* and runtime consent for sensitive data collection that is not obvious from the app's primary function. A trucking-route GPS app's collection of voice recordings and photos is non-obvious and would require a separate disclosure flow that this audit cannot verify from the listing alone, but the missing privacy policy makes compliance unprovable.

**FINDING 5 (LOW) — Cross-border transfer silent.**
ToS § 24 says the platform *"is controlled and operated from within the United States"* and § 15 says *"If you are located outside of the United States, you expressly consent to the transfer and processing of your data outside your home jurisdiction."* For EU users this is insufficient under GDPR Chapter V — there is no SCC reference, no adequacy basis, no Article 13/14 transfer notice. For UK users likewise.

---

## App 002 — Truckers of Europe 3

| Field | Value |
|---|---|
| Package ID | `com.WandaSoftware.TruckersofEurope3` |
| Developer | Wanda Software |
| Category | Simulation (Game) |
| Real installs | 98,036,773 |
| Content rating | Everyone |
| Ads / IAP | Yes / Yes |
| Privacy policy URL (declared) | **http://**wandasoftware.com/privacy-policy.html |

### Data Safety form (developer's own declaration)
**Collected:**
- **App info & performance:** Crash logs (purposes: Analytics, **Advertising or marketing**)
- **Device or other IDs** (purposes: Analytics, **Advertising or marketing**)

**Sharing with third parties:** "No data shared with third parties"
**Encryption in transit:** **No — "Data isn't encrypted. Your data isn't transferred over a secure connection."**
**Data deletion option:** **No — "Data can't be deleted. The developer doesn't provide a way for you to request that your data be deleted."**

### Compliance findings

**FINDING 1 (CRITICAL) — Self-declared lack of encryption in transit.**
The developer affirmatively declares on the Google Play Data Safety form that user data is **not** transferred over a secure connection. The same form declares the app collects **Device IDs** and transmits **crash logs** for advertising/analytics. That means user identifiers (Advertising ID, device fingerprints) and potentially diagnostic payloads are sent in cleartext.

- **GDPR Art. 32** ("Security of processing") requires "appropriate technical and organisational measures" including encryption. For an app with 98M installs, EU regulators have repeatedly held HTTPS to be the floor. Cleartext transmission of persistent identifiers used for ad targeting is a per-se Art. 32 failure.
- **CCPA/CPRA § 1798.150** creates a private right of action for data breaches resulting from failure to implement "reasonable security procedures." Cleartext transmission of identifiers would not meet "reasonable."
- **Google Play User Data policy:** "You must handle all personal and sensitive user data securely, including transmitting it using modern cryptography (for example, over HTTPS)." This is a **direct policy violation**, not an interpretation.

**FINDING 2 (CRITICAL) — Self-declared no data deletion.**
Effective 2024, Google Play requires apps that allow account creation to provide an in-app and web-accessible **account + data deletion** path. Wanda declares neither. Even if Wanda argues the game has no accounts (just a device install), the European right to erasure (GDPR Art. 17) attaches to **any** processing of personal data and must be honored on request via a verifiable channel. None is provided.

**FINDING 3 (CRITICAL) — Privacy policy served over HTTP.**
The Play Store listing's declared privacy policy URL is `http://wandasoftware.com/privacy-policy.html`. The privacy policy itself is therefore not served over a secure channel. Google Play's User Data policy states the privacy policy must be hosted on an "active, publicly accessible URL" — current enforcement guidance treats HTTPS as required for the policy host. Beyond Play Store policy, an HTTP privacy policy can be silently rewritten by any network intermediary, defeating the legal purpose of having one.

**FINDING 4 (HIGH) — Generic-template privacy policy missing every required disclosure.**
The actual policy text (~4,500 characters, retrieved live) is the well-known "[App Name] built the [App Name] app as an Ad Supported app" template. It is missing:
- **GDPR rights:** access, rectification, erasure, restriction, portability, objection — **none addressed.** No legal basis for processing stated. No EU representative named (required by GDPR Art. 27 for non-EU controllers offering services to EU users).
- **CCPA / CPRA rights:** right to know, delete, correct, opt out of sale/sharing, limit use of sensitive PI, "Do Not Sell or Share My Personal Information" link — **none addressed.** No California-specific section.
- **Data retention period:** not stated.
- **Data deletion process:** not described.
- **Privacy contact:** says "contact us" but provides no email, address, web form, or DPO.
- **International data transfer:** not addressed.
- **Last updated / effective date:** not present.
- **Breach notification:** not addressed.

The only specific data category named is "Advertising ID" — yet the Data Safety form also declares Crash logs and Device IDs collected for advertising. The two disclosures are not aligned.

**FINDING 5 (CRITICAL) — COPPA exposure.**
The privacy policy states: *"These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13."* The app is:
- Rated **"Everyone"** on Google Play (no age gate)
- A **vehicle simulation game** with cartoon-style trucks — content directly attractive to children
- Collecting **persistent identifiers (Device IDs)** for **advertising or marketing** by the developer's own declaration

The FTC's 2013 COPPA Rule update classifies persistent identifiers used for behavioral advertising as "personal information" of children. If the app is found to have actual knowledge that children use it (or to be "directed to children" under the FTC's multi-factor test, which weighs subject matter, animated characters, music, visual content, and intended audience), then collecting Device IDs for advertising without verifiable parental consent is a per-se COPPA violation. Penalties have reached $20K+ per violation; recent settlements (Epic Games $275M, TikTok $5.7M, YouTube $170M) show the FTC actively enforces this against game developers. The "Everyone" rating + vehicle game theme + ad-monetized identifiers is the exact fact pattern the FTC has prosecuted.

**FINDING 6 (HIGH) — Data Safety contradiction: "no data shared" vs. advertising purpose.**
Wanda declares Crash logs and Device IDs are collected for "Advertising or marketing" purpose, but also declares "No data shared with third parties." Advertising and marketing using device identifiers virtually always involves transmission to an ad network (AdMob, Unity Ads, IronSource, AppLovin, etc.). Either the data **is** shared (and the form is wrong) or the data is processed entirely in-house and no ads are served (which contradicts the ad-supported business model). The disclosures are internally inconsistent.

---

## Severity summary

| App | Critical | High | Medium | Low |
|---|---|---|---|---|
| Trucker Path | 1 | 1 | 2 | 1 |
| Truckers of Europe 3 | 4 | 2 | 0 | 0 |

## Recommended next steps (for Vernen platform productization)

1. **Encode the rule set used here** as a Citizen-runnable audit: every Play Store row → Data Safety fetch → privacy-policy fetch → ten-question checklist (PP exists / PP is HTTPS / has GDPR / has CCPA / has COPPA / has retention / has deletion / has contact / has effective date / matches Data Safety form). Output PASS/FAIL per question per app.
2. **The "PP URL serves a ToS instead" check** (Trucker Path Finding 1) is a high-signal automated heuristic — keyword profile of the document body should hit privacy-policy lexicon, not ToS lexicon. Worth building as a standalone classifier.
3. **The Data Safety internal-consistency check** (both apps' Finding 2/6) is also automatable: if `categories.purpose includes "Advertising or marketing"` then `data_shared == false` is suspicious.
4. **The HTTP-vs-HTTPS privacy-policy URL check** is one regex.
5. **COPPA audience-mismatch** (rated "Everyone" + game + ad identifiers) is a structured rule and worth its own pipeline.

If the same patterns recur across the other 558 apps in the CSV, this is a productizable audit at scale — exactly the federal-failure-database play CITIZEN already runs against SBA/FAC/HHS, but pointed at the consumer app surface.

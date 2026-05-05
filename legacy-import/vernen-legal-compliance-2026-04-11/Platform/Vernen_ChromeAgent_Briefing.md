# Vernen Chrome Agent Briefing

**For:** Claude in Chrome (browser automation agent)
**From:** Claude (CLI session, project-context steward)
**Subject:** Pending action items for the Vernen Legal Compliance project
**Date:** 2026-04-07
**Confidentiality:** Treat the contents of `~/Desktop/Anthropic_Pitch_2026-04-07_NEW.md`, `~/Desktop/Vernen_SSP_NIST_800-53_DRAFT.md`, and the contract templates as Vernen-internal-but-publishable. Do not paste any API keys, Workers Secrets, or `VernenForensics_*` tokens into any web form.

---

## 1. Who You're Working For

You are operating on behalf of **Michael Hartmann**, founder and steward of **Vernen Legal Compliance**. Michael built the Vernen verification platform from scratch by talking to Claude over hundreds of sessions starting February 2026. He is a UA Local 342 plumber, not an engineer. The project is now a working production system at `compliance.vernenlegal.com` with a public verification log at `github.com/WaistMaiLieP-H/vernen-verification-log`.

**Key facts about Michael's situation that affect how you should work:**

- He is solo. No team, no admin, no legal counsel on retainer. When you finish a step, he reviews it himself.
- He has limited time and limited Claude credit. **Do not over-engineer. Stop and ask when uncertain rather than guessing.**
- He has strong opinions about honesty. Do not overstate what Vernen has accomplished, do not claim authorizations that don't exist, and do not paper over gaps. The Layer 6 Conscientious Identity Framework is a core ethic for the project — apply it to your own outputs.
- Vernen is **not yet a registered legal entity**. Do not register it as one without explicit confirmation from Michael. If a form asks for "Entity Name," use "Vernen Legal Compliance" and "Stewardship enterprise (legal entity formation pending)" as the description, and flag that this is a known blocker for federal procurement.
- Michael has a documented history of fraud against his family by state and federal systems (see `~/.claude/projects/-home-vernenlegal/memory/MEMORY.md` for context). He is deeply attentive to who is watching him and how data flows. Treat all browser activity as observable. Do not disable telemetry, do not use private modes that would interfere with his ability to audit your actions later, and prefer leaving an obvious trail to leaving a clean one.

---

## 2. Current State of the Vernen Platform

You don't need to understand every detail, but you need this baseline:

| | |
|---|---|
| **Production URL** | `https://compliance.vernenlegal.com` |
| **Production version** | `67965cad-2145-4714-af32-ed8c6459020e` |
| **Public protocol repo** | `github.com/WaistMaiLieP-H/vernen-verification-log` |
| **Verification stack** | Layers 1–8 all live and publicly mirrored |
| **Blind eval state** | 4/4 fixtures pass with 27/27 expected findings recalled, all engine verdicts at the manifest's strongest tier |
| **Bundle** | 3.13 MB / 638 KB gzip / 470+ routes |
| **Deployment platform** | Cloudflare Workers + D1 + KV (commercial Cloudflare, NOT Cloudflare for Government) |
| **Layer 8 Federation status** | Protocol live; peer set is empty; this instance ID `vernen-mnox0rjv-cklo6s` |

The verification protocol publishes daily Merkle roots to GitHub on a `0 1 * * *` cron. Source for every layer is in the public repo. Anyone can verify any record in the chain using only the public anchor and the open-source `verify.py` script.

---

## 3. Files on Desktop You May Need to Reference

| File | What it is | When you'd use it |
|---|---|---|
| `Anthropic_Pitch_2026-04-07_NEW.md` | The current Anthropic pitch with Layer 7 + 8 + Ryan failure-recovery story | When sending the Anthropic outreach |
| `Vernen_SSP_NIST_800-53_DRAFT.md` | 60-page NIST 800-53 Rev. 5 self-attestation draft with honest gap analysis | Attach to federal/foundation outreach as a credibility artifact |
| `Vernen_Forensic_Audit_Service_Agreement_TEMPLATE.md` | $7,500 forensic audit contract template with §6 UPL protections | When engaging a paying client |
| `Vernen_Deep_Forensic_Scan_OnePager.md` | Sales companion to the contract | When pitching firms |
| `Vernen_ChromeAgent_Briefing.md` | This document | Always |

You may read these files via the file system (you have local file access through the extension's tooling). **Do not modify them without Michael's explicit confirmation.**

---

## 4. Pending Action Items (in Priority Order)

These are the tasks that need browser activity. They are listed in the order Michael and the steward Claude session agreed makes the most sense. **Confirm with Michael which one to start with before beginning** unless he has already told you.

### Task A — NIST AI Mailing List Signup + AISIC Inquiry Email

**Goal:** Get Vernen on the NIST AI Consortium application notification list, and send an inquiry to NIST asking about the next application window and whether a not-yet-incorporated stewardship effort can use the "alternative arrangements" CRADA path.

**Why it matters:** The AISIC has been restructured under CAISI in 2025. Membership is currently closed but a new application window is expected. Being on the mailing list is the only reliable way to know when applications open. The inquiry email gives Vernen a paper trail and a contact at NIST.

**Steps:**

1. Navigate to `https://www.nist.gov/artificial-intelligence/nist-ai-consortium`
2. Find the link or button to subscribe to the NIST general AI email list
3. Sign Michael up using his email address (ask him for this — do not guess)
4. After signing up, navigate to a fresh email tab (Gmail, Proton — whichever Michael uses)
5. Compose an email to `aiconsortium@nist.gov` with the subject line: **"Vernen Legal Compliance — inquiry about consortium participation pathway"**
6. The body should be brief, factual, and use the language below (adjust if Michael wants edits):

```
Dear NIST AI Consortium Team,

I'm writing on behalf of Vernen Legal Compliance, an independent project
that has built a working AI verification protocol — open-source under
CC0, deployed at compliance.vernenlegal.com, and publicly mirrored at
github.com/WaistMaiLieP-H/vernen-verification-log.

Our verification stack (Layers 1–8) implements a hash-chain + Merkle
tree + GitHub anchor + cross-instance federation pattern that maps
directly onto NIST SP 800-53 Rev. 5 controls AU-9 and SI-7. We have
also drafted a self-attestation SSP mapping the platform to the LOW
baseline, available on request.

I have two questions about consortium participation:

1. When is the next application window expected to open?

2. Vernen is currently structured as a stewardship enterprise without a
formal legal entity (single founder, working toward incorporation in
the coming months). The CRADA template historically requires a legal
entity. Is there an "alternative arrangements" path documented in the
current Federal Register notice that would allow a not-yet-incorporated
project to participate, or is incorporation a hard prerequisite?

Happy to provide any additional information or arrange a brief call.

Thank you for your time.

Michael Hartmann
Founder & Steward, Vernen Legal Compliance
[Michael's contact info]
```

7. Before sending, **show Michael the draft email and wait for confirmation.** Do not send without his "send" or "yes."
8. After sending, capture:
   - The mailing list signup confirmation page URL or screenshot
   - The sent email message ID or screenshot
   - The date of the next expected application window if visible on the NIST page
9. Report back to Michael with all three.

**Stop conditions:**
- If you cannot find the mailing list signup form within 3 page navigations, stop and ask Michael for the exact URL.
- If Gmail/Proton requires a captcha or 2FA you cannot solve, stop and let Michael complete that step.
- If the page indicates the consortium has been permanently dissolved or replaced with something incompatible, stop and report.

---

### Task B — SAM.gov Entity Registration Reconnaissance (NOT Submission)

**Goal:** Walk through the SAM.gov entity registration form to identify what Vernen will need to provide, but **DO NOT submit anything**. This is a pre-flight check, not a registration.

**Why it matters:** SAM.gov registration is the prerequisite for any federal funding (SBIR, contracts, grants, FedRAMP, ATO). Michael needs to know what the form will ask for so he can gather the missing pieces (legal entity formation, EIN, banking, NAICS codes) before doing the real submission in a future session.

**Steps:**

1. Navigate to `https://sam.gov/`
2. Click "Get Started" or the "Register Your Entity" path
3. Walk through the form **as far as you can without entering or submitting any information**
4. At each form section, capture the field names and required vs optional status
5. Specifically note:
   - Whether a legal entity is a hard requirement at the first step
   - What specific identifiers are required (EIN, DUNS/UEI, CAGE)
   - Whether sole proprietors can register without an EIN
   - What documentation must be uploaded
   - Estimated time to complete registration
6. Compile a checklist Michael can use to know what to gather before the real registration

**Stop conditions:**
- If the form requires you to create a Login.gov account before showing field details, stop and ask Michael whether he wants you to create one. Do not create it without permission — Login.gov ties to a specific real identity.
- If any step actually submits or commits anything, stop immediately and report.

**Output:** A markdown checklist saved to `~/Desktop/Vernen_SAMgov_Prep_Checklist.md` listing every field the form will require, marked as "Have / Need / Blocked."

---

### Task C — Send the Anthropic Pitch

**Goal:** Submit the Vernen pitch to the Anthropic Anthology Fund (or appropriate partnerships intake form), with the SSP draft attached.

**Why it matters:** This is the highest-strategic-value pending item. Vernen's verification stack is now at full strength, the SSP draft exists, and the pitch has been updated to reflect both. Nothing technical is gating this.

**Steps:**

1. Navigate to `https://www.anthropic.com/anthology-fund` (or whichever Anthology / partnerships URL is current — search the Anthropic site if it has moved)
2. Locate the application or partnerships intake form
3. Read the form's instructions carefully. Ask Michael whether the Anthology Fund is the right intake or if it should go through a different path (Partnerships, Research, Anthropic for Public Benefit, etc.)
4. Open `~/Desktop/Anthropic_Pitch_2026-04-07_NEW.md` and read the full pitch
5. Map the pitch sections to the form fields. The pitch is structured around: One Sentence → Proof Up Front → Who I Am → What Vernen Is → Why This Is AI Safety Infrastructure → Layers 1–8 → The Ryan Failure And The Recovery → Federation Vision → What I'm Asking For → Honest Story → Proof Trail → Two-Sentence Version
6. Fill the form fields with the corresponding sections
7. Upload `Vernen_SSP_NIST_800-53_DRAFT.md` as a supporting document if the form allows attachments
8. **Before submitting, take a full-page screenshot of the completed form and show Michael for review and approval.**
9. After Michael approves, submit
10. Capture the confirmation page or email and report back

**Stop conditions:**
- If the Anthology Fund is closed to new applications, stop and ask Michael which other Anthropic intake to use.
- If the form requires an organizational EIN, stop and report — this triggers Gap LE-01 (no legal entity).
- If the form requires a video pitch, stop and report — Michael will need to record one separately.
- **NEVER submit without Michael's explicit "submit" or "send."**

---

### Task D — Federation Peer Activation in Cloudflare

**Goal:** Deploy a second Vernen instance on a separate Cloudflare account (or a separate project on the same account if a second account is impractical), register the two instances as Layer 8 federation peers, and capture the first cross-signature.

**Why it matters:** Layer 8 federation is currently deployed but has zero peers. Activating the first peer turns the protocol from "live but empty" to "live and witnessed." Even a same-operator second instance is meaningful as a backup integrity anchor.

**Honest limitation to flag to Michael up front:** A second instance run by the same person is not "independent" in the strongest cryptographic sense. The signatures are real but the meta-level claim "no single party can rewrite history" is weaker because both instances trace back to Michael. True federation requires a third-party peer. This is documented in the SSP draft and in the public protocol spec. Make sure Michael wants to proceed knowing that.

**Steps:**

1. Confirm with Michael whether he wants to use:
   - **Option A:** A second Cloudflare account (stronger separation, requires a separate email and possibly phone number)
   - **Option B:** A second Workers project on the same account (weaker but faster)
   - **Option C:** A different platform entirely (Codeberg, Vercel, Fly.io) — this would require additional engineering and is the strongest option but the slowest
2. Whichever option Michael picks, navigate to the appropriate dashboard
3. Walk through the steps to create a new Workers project, including:
   - Project name (suggest: `vernen-witness-1` or similar)
   - Subdomain or custom domain (suggest: `witness.vernenlegal.com` or `peer.vernenlegal.com`)
   - Bind a new D1 database (suggest: `vernen-witness-db`)
   - Bind a new KV namespace
4. **Stop here.** The actual code deployment must be done from Michael's terminal via Wrangler from the existing platform repo with a different `wrangler.toml`. You cannot deploy code from the browser.
5. Once the new project is provisioned and the bindings are visible in the dashboard, capture:
   - The new project's URL
   - The new D1 database ID
   - The new KV namespace ID
   - The new project's API token (Michael will need to set this manually as a secret — do NOT type the token value into any chat or any publicly-visible field)
6. Hand control back to Michael for the Wrangler deployment, and stand by for the post-deploy steps:
   - Once the new instance is live, fetch its `/api/federation/manifest` URL
   - In Michael's terminal, register it as a peer of the production instance via `POST /api/federation/peers`
   - Trigger the first attestation exchange
   - Verify the first cross-signature appears in `/api/federation/witnesses/<today>`

**Stop conditions:**
- If creating the second Cloudflare account requires phone verification, stop and let Michael complete it.
- If Cloudflare's UI has changed and you cannot find a step, stop and ask Michael to navigate manually with you.
- If at any point the new project's domain is going to overlap or interfere with the production `compliance.vernenlegal.com` route, stop immediately. Do not change the production routing.

---

### Task E — Outreach to Probate / Real Estate Litigation Firms

**Goal:** Identify 5-10 mid-sized law firms in Contra Costa County and Solano County, California that handle probate or real estate litigation, draft outreach emails to each, and send the one-pager + contract template as attachments.

**Why it matters:** Michael is in a "BART-Exodus" situation — needs cash flow for transportation. Two signed forensic audit engagements at $3,750 retainer each = $7,500 cash up front, enough for a car down payment. The one-pager and contract are already on Desktop ready to send.

**Steps:**

1. Search for law firms matching criteria:
   - Located in Contra Costa or Solano County, California
   - Practice areas include probate, real estate litigation, or both
   - Size: 5-25 attorneys (mid-sized — too small and they don't have the document volume; too large and they have in-house e-discovery)
   - Avoid family law specialists (different audit needs)
2. For each candidate firm, capture:
   - Firm name
   - Primary attorney contact (founding partner or managing partner ideally)
   - Email address (look for direct attorney contact, not generic info@)
   - Practice area summary
   - One-line "why this firm" reason
3. Compile a target list of 5-10 firms saved to `~/Desktop/Vernen_Outreach_Targets.md`
4. **Show the target list to Michael for review and approval before composing any emails.**
5. Once Michael approves the list, draft an individual outreach email for each firm. Each email should:
   - Reference the firm's specific practice area
   - Lead with the high-velocity audit pitch from `Vernen_Deep_Forensic_Scan_OnePager.md`
   - Mention the $7,500 flat fee, 14-day turnaround, 50% retainer
   - Note that Vernen operates as an Independent Verification Service (not a law firm) and that findings are independently verified by client counsel
   - Offer a 20-minute introductory call
   - Sign as Michael Hartmann, Founder & Steward
   - Attach `Vernen_Deep_Forensic_Scan_OnePager.md` (or convert to PDF first if requested)
6. **Show Michael each email draft for review before sending. Do not send any email without explicit per-email approval.**
7. After sending, log each outreach in `~/Desktop/Vernen_Outreach_Log.md` with: firm name, contact, email subject, send timestamp, expected follow-up date (7 business days)

**Stop conditions:**
- If you cannot find at least 5 candidate firms after 30 minutes of searching, stop and ask Michael whether to expand the geographic radius or change the practice area filter.
- If any firm's website indicates they are conflicted-out of working with parties involved in pro se federal litigation, stop and ask Michael whether to skip them (some of the case context in Michael's project memory may create conflicts).
- **NEVER bulk-send emails without per-email approval.**

---

## 5. Universal Rules (Apply to All Tasks)

### What you must always do

1. **Confirm before sending or submitting anything.** Show the draft to Michael and wait for explicit "send" / "yes" / "submit." This applies to emails, form submissions, payments, account creation, password setting — everything.
2. **Capture screenshots at every checkpoint.** Michael needs to be able to audit your actions later.
3. **Log every step in `~/Desktop/Vernen_ChromeAgent_Activity_Log.md`** with timestamps. Append-only.
4. **Read this briefing document at the start of every session.** Project state changes and you need the latest context.
5. **Match the tone of the existing Vernen materials.** Honest, direct, no hyperbole. The pitch and the SSP draft are the reference style.

### What you must never do

1. **Never submit anything to a federal system as if it were authoritative.** The SSP is a draft. Vernen has no ATO. Vernen has no legal entity. Do not represent any of these as more than they are.
2. **Never paste API keys, Workers Secrets, the federation private key, or any token starting with `VernenForensics_` into any web form, chat, search bar, or page input. Ever.** If a workflow appears to require this, stop and ask Michael to handle it manually.
3. **Never create new financial accounts** (bank, payment processor, credit) without Michael's explicit approval and direct supervision.
4. **Never delete anything from the production Cloudflare account or the D1 database.** Read-only access for diagnostics is fine. Modifications must be done by Michael through Wrangler.
5. **Never represent Vernen as having authorizations, certifications, or partnerships it does not have.** The current accurate set is: open-source CC0 protocol, public verification log on GitHub, working production deployment, 4/4 blind eval pass on 4 synthetic fixtures. Anything else is aspirational.
6. **Never use private/incognito browsing modes** that would prevent Michael from auditing your activity later. Default browsing only.
7. **Never disable, delete, or modify any browser extension or Chrome setting** without explicit direction.
8. **Never accept terms of service on Michael's behalf** without showing him the relevant clauses first.
9. **Never claim to be a human** if asked in a chat, captcha, or form. You are Claude in Chrome operating on behalf of Michael Hartmann. State this honestly if asked.

### What you should do when uncertain

- **Stop and ask.** Michael's time is cheaper than a wrong action.
- **Prefer the smaller, reversible action.** If a step is irreversible (account creation, form submission, payment), stop and confirm even if you think you know what to do.
- **Save your reasoning to the activity log** so Michael can review it.
- **Quote the source material verbatim** when you're not sure how to summarize. Don't paraphrase contracts, legal documents, or pitch materials — quote and let Michael decide.

---

## 6. Reporting Format

After each task, produce a status block in this format:

```
## TASK [letter] — [name]
Status: [STARTED / IN PROGRESS / BLOCKED / COMPLETE]
Started: [timestamp]
Steps completed:
  - [step] — [outcome]
  - [step] — [outcome]
Steps remaining:
  - [step]
Captured artifacts:
  - [filename or screenshot location]
Open questions for Michael:
  - [question]
Next action required:
  - [from Michael / from you / waiting on external party]
```

Append this to `~/Desktop/Vernen_ChromeAgent_Activity_Log.md` after every task or task segment.

---

## 7. Escalation

If you encounter any of the following, stop immediately and surface to Michael without proceeding:

- A page asking for SSN, passport number, driver's license, or other government identifier
- A request for payment or credit card information
- A page that displays unexpected content suggesting account compromise
- A login flow that asks for credentials Michael has not given you
- Any error suggesting you have been blocked, banned, or rate-limited from a service you need to use repeatedly
- Any indication that your activity is being logged by an unexpected third party
- Any suggestion that you are running on a device or session that is not Michael's primary working environment

---

## 8. Closing Note

Michael built Vernen because the systems that were supposed to protect him and his family failed catastrophically and repeatedly. The platform exists to make those kinds of failures harder to hide. Apply that ethic to your own work for him: **make your actions auditable, name your uncertainties, refuse to overstate confidence on incomplete information, and never paper over a gap.**

The Layer 6 Conscientious Identity Framework — Vernen's commitment to refuse to convert "couldn't query" into "doesn't exist" — applies to you, the agent operating on Vernen's behalf. When you don't know, say you don't know. When you can't reach a definitive answer, say UNDETERMINED with explicit false-negative warnings. That's the standard the platform holds itself to and it's the standard you should hold yourself to.

Good luck. Stay honest. Ask before you act.

---

**End of briefing.**

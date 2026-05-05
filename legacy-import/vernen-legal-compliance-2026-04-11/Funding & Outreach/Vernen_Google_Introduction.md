# Vernen Legal Compliance
## Platform Overview for Google Partnership Discussion

---

## What It Is

Vernen Legal Compliance is a production AI compliance platform built entirely on conversational AI. It audits documents against governing law, professional standards, and integrity controls — automatically, the moment a document enters the system.

**Live at:** compliance.vernenlegal.com

---

## What It Does

A person submits a document. The platform identifies what kind of document it is, routes it to the right professional auditor (we call them "Persona Citizens"), and runs it against every applicable law, standard, and integrity check — then returns a plain-English compliance report with specific findings, citations, and remediation steps.

**Example from today:** A truck driver handed us 18 documents from his employer — contracts, pay stubs, a lease agreement, onboarding paperwork. Within minutes, the platform identified 15 compliance failures including FMCSA safety violations, worker misclassification under California AB5, a $156,000 predatory lease-to-purchase, and onboarding documents signed on a DocuSign demo account. The driver was taking home 14 cents of every dollar he hauled in freight. The audit report is ready to email to an employment attorney.

That's the product. Document goes in, compliance audit comes out.

---

## The Scale

- **2,800+ professional personas** in the catalog — covering healthcare, financial services, construction, cannabis, tribal law, sports leagues, environmental, elections, education, and dozens more industries
- **745+ compliance rules** across federal and state jurisdictions
- **574 professional standards** with 155 cross-references
- **6 intelligence pipelines** monitoring federal regulatory data in real time (Federal Audit Clearinghouse, HHS, EDGAR, SBA, USAspending, Federal Register)
- **Automated lead generation** — the platform reads public audit failure databases and generates outreach to organizations with compliance findings before they become enforcement actions

---

## How It Was Built

Michael Hartmann is a UA Local 342 journeyman plumber in the Bay Area. No engineering background. He built the entire platform through conversation with Claude (Anthropic's AI) over approximately two weeks.

The platform runs on Cloudflare Workers (serverless), D1 (SQLite database), and KV (key-value store). Zero production dependencies. 99+ tests passing. Security hardened. Custom domain deployed.

Michael's domain expertise comes from 16 years as a pro se litigant and sole-custody father navigating compliance failures in family court, disability systems, and financial institutions. Every feature in the platform exists because he lived through the failure it detects.

---

## The Business

**Revenue model:** Professional services, not subscriptions. Information is free — the analysis, the audit, the report. Revenue comes when organizations need help fixing what the audit found: corrective action plans, compliance remediation, ongoing monitoring.

**Current pipeline:**
- City of Stockton CFO responded to automated outreach about 6 HUD audit findings (active lead)
- Trucking industry worker exploitation audits (today's deliverable)
- Federal audit failure database generates new leads automatically

**Market context:** 2026 federal enforcement wave — SBA suspended 1,091 entities, DOJ fraud division expanding, Treasury targeting $35B in clawback, CMMC mandate taking effect. Organizations that failed their last audit need help before the next one.

---

## Where Google Fits

### Google.org AI for Government Innovation ($1-3M)
Google.org is funding AI tools that improve government services. Vernen's platform already monitors federal compliance data and generates actionable intelligence for government entities. The Stockton engagement is proof of concept — a city CFO engaging with AI-generated compliance analysis.

### Google Cloud / Google for Startups
The platform currently runs on Cloudflare but is architecture-agnostic. Google Cloud credits would enable:
- **Vertex AI integration** for document OCR and classification at intake
- **BigQuery** for cross-referencing compliance data across the 6 intelligence pipelines
- **Cloud Run** as an alternative deployment target
- **Firebase** for the mobile app (Android XR glasses app already scaffolded)

### Google for Startups Cloud Program
- **Start tier:** $2,000 in Cloud credits (eligible now)
- **Scale AI tier:** Up to $350,000 in credits (requires equity funding or institutional backing)

### Android XR / Smart Glasses
Vernen has already scaffolded an Android XR application for smart glasses — real-time compliance overlay for field workers, court proceedings, and inspections. The rule engine, jurisdictional mapping, and audit trail infrastructure already exist. The glasses app connects to the live platform API.

---

## The Numbers

| Metric | Value |
|---|---|
| Persona Citizens in catalog | 2,800+ |
| Hand-coded Citizens (full logic) | 15 |
| Compliance rules | 745+ |
| Professional standards | 574 |
| Cross-references | 155 |
| Intelligence pipelines | 6 |
| API endpoints | 48+ |
| Test coverage | 99+ tests |
| Database tables | 55 |
| Time to build | ~2 weeks |
| Engineering team | 1 person (non-engineer) + Claude |

---

## Contact

**Michael Hartmann**
Founder, Vernen Legal Compliance
compliance.vernenlegal.com
michetype78@gmail.com

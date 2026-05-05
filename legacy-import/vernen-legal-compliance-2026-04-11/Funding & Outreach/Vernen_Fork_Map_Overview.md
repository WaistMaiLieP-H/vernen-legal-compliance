# Vernen Legal Compliance — Fork Architecture Overview

**For use with:** Anthropic Phase 1 + Phase 2 emails
**Date:** 2026-04-11

---

## The Platform and Its Forks

Vernen Legal Compliance is the root. Every fork below it inherits the same foundation: the rules engine, standards library, triple-constraint audit framework, and CITIZEN agent architecture. Each fork is a compliance discipline applied to a different surface where law is currently unenforced at scale.

```
Vernen Legal Compliance (root)
│   Live at compliance.vernenlegal.com
│   745+ rules · 574+ standards · 17 D1 tables · Stripe payments
│
├── CITIZEN Fork                    ← Fork 1 (current build)
│   Autonomous professional compliance agents
│   grown from federal enforcement data
│   30 Citizens target · 7 operational today
│   ~/citizens/ · compliance.vernenlegal.com
│
├── Visual Fork                     ← Fork 2
│   Compliance through sight
│   Smart glasses · real-time visual verification
│   Court-admissible visual evidence capture
│   Certified document authentication at point of view
│
├── Audio Fork                      ← Fork 3
│   Compliance through sound
│   Real-time certified translation · court interpreter disruption
│   Audit-trailed recordings · chain-of-custody audio evidence
│   Language access rights enforcement (42 USC §2000d)
│
├── Communications Fork             ← Fork 4
│   Compliance OF the communication channel itself
│   FCC-mandated device attestation · cellular trust layer
│   Elimination of SIM swap · fake towers · cloned devices
│   Federated PKI + Certificate-Transparency-style verifiable log
│   (Full architecture: anthropic_email_phase2_cellular_attestation.md)
│
└── Software Fork                   ← Fork 5
    Compliance OF software as a legal surface
    Mobile apps · desktop software · browser extensions
    Firmware · SaaS · web platforms
    GDPR · CCPA · COPPA · FTC § 5 · platform developer policies
    560-app Google Play scan already operational (April 2026)
```

---

## Why the Fork Architecture Matters

Every fork addresses the same root condition: **a gap between what the law requires and what anyone can currently verify in real time.**

- The law says apps must have honest privacy policies. Nobody is checking 4 billion installs systematically.
- The law says court interpreters must be certified and accurate. Nobody is verifying in real time.
- The law says cellular networks must be what they claim to be. Nobody is attesting device-to-network identity at the connection layer.
- The law says software must disclose what it collects. Nobody is auditing the disclosure against the actual behavior at scale.

CITIZEN closes the gap through autonomous professional agents.
Visual, Audio, Communications, and Software close it through the surfaces those agents operate on.

**Together they form the first compliance infrastructure that operates at the speed of the violation.**

---

## The Relationship Between Forks

No fork operates independently. A Communications-attested device running a Software-audited app, capturing Visual-verified evidence with Audio-certified translation, routed through a CITIZEN for professional compliance analysis — that is the full system.

Each fork strengthens every other fork.
Each fork is also a standalone product.

---

## Current Status

| Fork | Status | Key Deliverable |
|---|---|---|
| CITIZEN | 7 operational · 3 in build · 21 scaffolded | 30-Citizen target, ~2 months |
| Visual | Blueprint stage | Smart glasses app scaffolded (Android XR) |
| Audio | Blueprint stage | Translation pipeline designed |
| Communications | Architecture drafted | Phase 2 Anthropic email complete |
| Software | First instrument built | 560-app scan · fraud-signal detection · compliance audit methodology |

---

*Root platform: Vernen Legal Compliance / Vernen Compliance LLC (filed CA SOS 2026-04-11)*
*All forks built with Claude. Every line.*

# VERNEN™ Guided Document Navigator (GDN) — Canonical Build

**Project:** VERNEN™ Guided Document Navigator
**Author:** Michael Vernen Thomas Hartmann
**© 2024–2026 Michael Vernen Thomas Hartmann. All Rights Reserved.**

A multilingual registry of California Judicial Council forms with titles and
field labels translated into **13 languages**:

`en` English · `es` Spanish · `zh` Chinese · `vi` Vietnamese · `so` Somali ·
`ti` Tigrinya · `am` Amharic · `ar` Arabic · `ht` Haitian Creole · `ko` Korean ·
`pt` Portuguese · `ru` Russian · `tl` Tagalog

## Canonical status
This `gdn/` directory is the **authoritative, most-complete build** of the project:
- `form_registry.json` — **28 forms across tiers A / B / C**
- `i18n/` — 12 per-language translation files (English is the base)
- `legal_glossary.json` — legal-term glossary
- `scenario_index.json` — guided-navigation scenario map
- `annotations/gdn_annotations.json` — form annotations

It supersedes the smaller 15-form Tier-A `src/data/forms/form_registry.json`
in this repo and the drifted 15-form variants previously scattered across
local/Proton/USB source trees. Edit here; treat other copies as derived.

## Integrity
All 16 JSON files validated as well-formed at time of commit.

---
name: ghost
description: Run GHOST blind verification — generate and submit scenarios to the live compliance engine with zero knowledge of its rules
user_invocable: true
---

# GHOST — Blind Independent Verification (Secret Shopper)

## When to use
When the user types `/ghost` or asks to run a blind test, secret shopper test, or independent verification against the compliance engine.

## What this does
GHOST generates realistic business scenarios and submits them to `compliance.vernenlegal.com` exactly like a real customer would. It knows NOTHING about the engine's rules, standards, categories, or expected outcomes.

## CRITICAL ISOLATION REQUIREMENT
DO NOT provide GHOST with any information about:
- The engine's rule IDs, categories, or standards
- Expected pass/fail outcomes
- What the engine checks for
- How the engine scores compliance

GHOST must run as a blind subprocess. Launch it via Bash, not inline.

## How to execute

Parse the user's request for:
- `mode`: "compliance", "documents", or "both" (default: "both")
- `count`: number of scenarios (default: 10)
- `--dry-run`: generate scenarios without submitting

Then run:

```bash
cd /home/vernenlegal/ghost && python3 ghost.py <mode> -n <count>
```

Examples:
- `/ghost` → `python3 ghost.py both -n 10`
- `/ghost 25` → `python3 ghost.py both -n 25`
- `/ghost compliance 50` → `python3 ghost.py compliance -n 50`
- `/ghost documents 20` → `python3 ghost.py documents -n 20`
- `/ghost dry-run` → `python3 ghost.py both -n 10 --dry-run`

## After execution
Report ONLY:
- Number of scenarios submitted
- Success/failure counts
- Average response times
- Where results are saved

DO NOT interpret or evaluate the engine's responses. That's MIRROR's job.

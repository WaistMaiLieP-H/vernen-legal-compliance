---
name: ghost-mirror
description: Full blind test cycle — generate scenarios, submit to engine, independently evaluate, report drift
user_invocable: true
---

# GHOST-MIRROR — Full Blind Verification Cycle

## When to use
When the user types `/ghost-mirror` or asks for a full blind test, complete IV&V cycle, or end-to-end independent verification.

## What this does
Runs the complete blind verification cycle:
1. GHOST generates realistic scenarios (zero knowledge of engine)
2. GHOST submits them to the live platform like a real customer
3. MIRROR independently assesses each scenario
4. MIRROR compares its assessment against the engine's response
5. Drift report generated showing blind spots and detection gaps

## CRITICAL ISOLATION REQUIREMENT
Both GHOST and MIRROR run as isolated subprocesses via Bash.
DO NOT run their logic inline in Claude Code where context could contaminate.
DO NOT provide either process with engine internals.

## How to execute

Parse the user's request for:
- `count`: number of scenarios (default: 10)
- `mode`: "compliance", "documents", or "both" (default: "both")

Then run sequentially:

```bash
# Step 1: GHOST generates and submits
cd /home/vernenlegal/ghost && python3 ghost.py <mode> -n <count>

# Step 2: MIRROR evaluates the results
cd /home/vernenlegal/mirror && python3 mirror.py evaluate
```

Examples:
- `/ghost-mirror` → 10 scenarios, both modes, full evaluation
- `/ghost-mirror 50` → 50 scenarios, both modes, full evaluation
- `/ghost-mirror compliance 25` → 25 compliance scenarios, full evaluation

## After execution
Report the complete picture:
- GHOST submission summary (counts, response times)
- MIRROR evaluation summary (agreements, blind spots, drift)
- Top blind spot categories with recommendations
- Path to all output files

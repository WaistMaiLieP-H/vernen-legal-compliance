---
name: mirror
description: Run MIRROR independent evaluation — assess GHOST results and generate drift reports showing engine blind spots
user_invocable: true
---

# MIRROR — Independent Compliance Evaluator

## When to use
When the user types `/mirror` or asks to evaluate GHOST results, check for blind spots, or generate a drift report.

## What this does
MIRROR reads GHOST's blind test submissions and the engine's responses. It forms its OWN independent opinion about what compliance issues exist in each scenario, then compares its assessment against the engine's findings. It identifies blind spots, over-detections, and novel patterns.

## CRITICAL ISOLATION REQUIREMENT
MIRROR uses general compliance knowledge (public law, common standards) but does NOT know the engine's specific rule IDs, internal categories, or scoring methodology. It forms independent opinions.

## How to execute

Parse the user's request for:
- `mode`: "evaluate" (latest batch), "evaluate-all" (all new), or "drift-summary" (aggregate)
- `-f <file>`: specific GHOST result file

Then run:

```bash
cd /home/vernenlegal/mirror && python3 mirror.py <mode>
```

Examples:
- `/mirror` → `python3 mirror.py evaluate` (evaluates most recent GHOST batch)
- `/mirror all` → `python3 mirror.py evaluate-all`
- `/mirror drift` or `/mirror summary` → `python3 mirror.py drift-summary`

## After execution
Report:
- Number of agreements (both found the same issue)
- Number of blind spots (MIRROR found, engine missed)
- Number of engine-only findings (engine found, MIRROR didn't assess)
- Top blind spot categories
- Recommendation for engine improvement
- Path to drift report

#!/usr/bin/env python3
"""
IRON-CLAD STRESS TEST: DOJ/CMMC 2026 PURGE SIMULATION

Generates high-stakes compliance failure scenarios at 120/sec
and fires them at the live platform intelligence pipelines.

Usage:
  python3 iron-clad-stress.py                    # 5 min default
  python3 iron-clad-stress.py --duration 60      # 1 minute
  python3 iron-clad-stress.py --live             # hit live endpoints
  python3 iron-clad-stress.py --report           # generate summary
"""

import time
import json
import random
import sys
import argparse

try:
    import urllib.request
    import urllib.error
    HAS_URLLIB = True
except ImportError:
    HAS_URLLIB = False

API_BASE = "https://compliance.vernenlegal.com"
API_KEY = "b84dMhAsZMjLWQFNmFyuEb2IPbL72nWQl18BzdBt"

# ═══════════════════════════════════════════════════════════════════════════
# 2026 Critical Failure Vectors
# ═══════════════════════════════════════════════════════════════════════════

FAILURE_SCENARIOS = [
    {
        "sector": "DEFENSE_AEROSPACE",
        "trigger": "CMMC_LEVEL_2_GOVERNANCE_CRISIS",
        "issue": "Missing System Security Plan (SSP) for CUI. 0% governance tracking.",
        "statutory_fail": True,
        "rule_id": "DFARS-252.204-7021",
        "pipeline": "fedreg",
        "citizen_chain": ["PRIVAXIS", "VIGILUS", "SENTINEL-0"],
        "engagement_value": "$50K-$250K",
        "urgency": "CRITICAL"
    },
    {
        "sector": "FEDERAL_HEALTHCARE",
        "trigger": "NATIONAL_FRAUD_DIVISION_SCAN",
        "issue": "Parallel civil/criminal indicator: Re-coding of SNAP/Medicaid benefits.",
        "statutory_fail": True,
        "rule_id": "DOJ-NFD-2026-04",
        "pipeline": "hhs",
        "citizen_chain": ["INTEGRA", "ETHICARA", "CLARIDEX", "SENTINEL-0"],
        "engagement_value": "$25K-$100K",
        "urgency": "CRITICAL"
    },
    {
        "sector": "GOV_TECH_CONTRACTOR",
        "trigger": "DEI_FRAUD_CLAIMS_ACT",
        "issue": "Internal audit confirms demographic quotas used for 2025 federal staffing task order.",
        "statutory_fail": True,
        "rule_id": "FCA-31-USC-3729",
        "pipeline": "edgar",
        "citizen_chain": ["ETHICARA", "LEXARC", "INTEGRA", "SENTINEL-0"],
        "engagement_value": "$100K-$500K",
        "urgency": "CRITICAL"
    },
    {
        "sector": "SUPPLY_CHAIN",
        "trigger": "F-35_SUSTAINMENT_AUDIT",
        "issue": "Material inspection failure: 35% of components lack verifiable origin tracking.",
        "statutory_fail": False,
        "rule_id": "DODIG-2026-039",
        "pipeline": "spending",
        "citizen_chain": ["VIGILUS", "INTEGRA", "SENTINEL-0"],
        "engagement_value": "$75K-$200K",
        "urgency": "HIGH"
    },
    {
        "sector": "SBA_8A_PROGRAM",
        "trigger": "SUSPENSION_APPEAL_DEADLINE",
        "issue": "Firm suspended Jan 2026. OHA appeal window closing. Missing GL reconciliation.",
        "statutory_fail": True,
        "rule_id": "13-CFR-124.112",
        "pipeline": "sba",
        "citizen_chain": ["CLARIDEX", "FISCARA", "INTEGRA", "SENTINEL-0"],
        "engagement_value": "$5K-$25K",
        "urgency": "CRITICAL"
    },
    {
        "sector": "NONPROFIT_EDUCATION",
        "trigger": "SINGLE_AUDIT_MATERIAL_WEAKNESS",
        "issue": "University failed Single Audit: $12M in questioned costs across 3 federal programs.",
        "statutory_fail": True,
        "rule_id": "2-CFR-200.516",
        "pipeline": "fac",
        "citizen_chain": ["REGULIS", "CLARIDEX", "SENTINEL-0"],
        "engagement_value": "$15K-$50K",
        "urgency": "HIGH"
    },
    {
        "sector": "BANKING_FINTECH",
        "trigger": "OCC_CONSENT_ORDER",
        "issue": "BSA/AML deficiency: Suspicious activity monitoring system failed 3 consecutive exams.",
        "statutory_fail": True,
        "rule_id": "OCC-EA-2026-017",
        "pipeline": "fedreg",
        "citizen_chain": ["PRIVAXIS", "VIGILUS", "ETHICARA", "SENTINEL-0"],
        "engagement_value": "$100K-$500K",
        "urgency": "CRITICAL"
    },
    {
        "sector": "PANDEMIC_RELIEF",
        "trigger": "CARES_ACT_CLAWBACK",
        "issue": "Treasury OIG flags pass-through fraud: shell entity received $4.2M PPP via intermediary.",
        "statutory_fail": True,
        "rule_id": "TREASURY-OIG-2026-003",
        "pipeline": "spending",
        "citizen_chain": ["INTEGRA", "CLARIDEX", "ETHICARA", "SENTINEL-0"],
        "engagement_value": "$50K-$250K",
        "urgency": "CRITICAL"
    },
]

ENTITY_PREFIXES = {
    "DEFENSE_AEROSPACE": "DIB",
    "FEDERAL_HEALTHCARE": "HHS",
    "GOV_TECH_CONTRACTOR": "GTC",
    "SUPPLY_CHAIN": "SCM",
    "SBA_8A_PROGRAM": "SBA",
    "NONPROFIT_EDUCATION": "EDU",
    "BANKING_FINTECH": "FIN",
    "PANDEMIC_RELIEF": "PPP",
}

STATES = ["CA", "TX", "NY", "FL", "VA", "MD", "DC", "IL", "PA", "OH",
          "GA", "NC", "CO", "AZ", "WA", "MA", "NJ", "MI", "MN", "CT"]

# ═══════════════════════════════════════════════════════════════════════════
# Generator
# ═══════════════════════════════════════════════════════════════════════════

def generate_high_stakes_failure():
    scenario = random.choice(FAILURE_SCENARIOS)
    prefix = ENTITY_PREFIXES.get(scenario["sector"], "UNK")

    payload = {
        "timestamp": time.time(),
        "entity_id": f"{prefix}-{random.randint(10000, 99999)}",
        "entity_state": random.choice(STATES),
        "contract_value": random.randint(500_000, 250_000_000),
        "audit_metadata": scenario,
        "gap_score": random.randint(
            65 if scenario["statutory_fail"] else 30,
            100 if scenario["statutory_fail"] else 70
        ),
    }
    return payload


def hit_live_endpoint(payload):
    """Fire the scenario at the appropriate pipeline status endpoint."""
    if not HAS_URLLIB:
        return None

    pipeline = payload["audit_metadata"]["pipeline"]
    url = f"{API_BASE}/api/{pipeline}/status"

    req = urllib.request.Request(url, headers={
        "Authorization": f"Bearer {API_KEY}",
        "Accept": "application/json",
    })

    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            return json.loads(resp.read().decode())
    except Exception as e:
        return {"error": str(e)}


# ═══════════════════════════════════════════════════════════════════════════
# Simulation Runner
# ═══════════════════════════════════════════════════════════════════════════

def run_iron_simulation(duration_sec=300, live=False, report=False):
    print(f"{'='*70}")
    print(f"  IRON-CLAD STRESS TEST: DOJ/CMMC 2026 PURGE SIMULATION")
    print(f"  Duration: {duration_sec}s | Live: {live} | Target: {API_BASE}")
    print(f"{'='*70}")
    print()

    start = time.time()
    count = 0
    sector_counts = {}
    urgency_counts = {"CRITICAL": 0, "HIGH": 0}
    pipeline_counts = {}
    total_contract_value = 0
    statutory_fails = 0

    try:
        while time.time() - start < duration_sec:
            payload = generate_high_stakes_failure()
            count += 1

            sector = payload["audit_metadata"]["sector"]
            urgency = payload["audit_metadata"]["urgency"]
            pipeline = payload["audit_metadata"]["pipeline"]

            sector_counts[sector] = sector_counts.get(sector, 0) + 1
            urgency_counts[urgency] = urgency_counts.get(urgency, 0) + 1
            pipeline_counts[pipeline] = pipeline_counts.get(pipeline, 0) + 1
            total_contract_value += payload["contract_value"]
            if payload["audit_metadata"]["statutory_fail"]:
                statutory_fails += 1

            if live:
                hit_live_endpoint(payload)

            # Print every 100th event for visibility
            if count % 100 == 0:
                elapsed = time.time() - start
                rate = count / elapsed
                print(f"  [{elapsed:6.1f}s] Events: {count:,} | Rate: {rate:.0f}/sec | "
                      f"Statutory Fails: {statutory_fails:,} | "
                      f"Contract Value: ${total_contract_value:,.0f}")

            # 120 events/sec
            time.sleep(0.008)

    except KeyboardInterrupt:
        print("\n  [INTERRUPTED]")

    elapsed = time.time() - start
    rate = count / elapsed if elapsed > 0 else 0

    print()
    print(f"{'='*70}")
    print(f"  SIMULATION COMPLETE")
    print(f"{'='*70}")
    print(f"  Duration:           {elapsed:.1f}s")
    print(f"  Total Events:       {count:,}")
    print(f"  Rate:               {rate:.0f} events/sec")
    print(f"  Statutory Failures: {statutory_fails:,} ({statutory_fails/count*100:.1f}%)")
    print(f"  Total Contract $:   ${total_contract_value:,.0f}")
    print()
    print(f"  SECTOR BREAKDOWN:")
    for sector, c in sorted(sector_counts.items(), key=lambda x: -x[1]):
        print(f"    {sector:30s} {c:6,} events")
    print()
    print(f"  PIPELINE LOAD:")
    for pipeline, c in sorted(pipeline_counts.items(), key=lambda x: -x[1]):
        print(f"    /api/{pipeline:12s}          {c:6,} events")
    print()
    print(f"  URGENCY:")
    for urg, c in sorted(urgency_counts.items(), key=lambda x: -x[1]):
        print(f"    {urg:12s} {c:6,} ({c/count*100:.1f}%)")
    print()

    if report:
        print(f"  REVENUE POTENTIAL (1% capture rate):")
        # Conservative estimate based on engagement values
        print(f"    Low estimate:  ${count * 0.01 * 15_000:,.0f}")
        print(f"    High estimate: ${count * 0.01 * 150_000:,.0f}")
        print()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="IRON-CLAD 2026 Purge Simulation")
    parser.add_argument("--duration", type=int, default=300, help="Duration in seconds")
    parser.add_argument("--live", action="store_true", help="Hit live endpoints")
    parser.add_argument("--report", action="store_true", help="Generate revenue report")
    args = parser.parse_args()

    run_iron_simulation(args.duration, args.live, args.report)

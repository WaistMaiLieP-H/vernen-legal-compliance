/**
 * Generate Stockton Corrective Action Plan directly
 * Uses the corrective-action service logic inline (no TS compilation needed)
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function generateId(prefix) {
  return prefix + '-' + crypto.randomBytes(8).toString('hex');
}

// Stockton findings from FY2024 Single Audit
const findings = [
  {
    id: generateId("finding"),
    findingNumber: "2024-004",
    program: "CDBG Entitlement (14.218)",
    programCFDA: "14.218",
    complianceArea: "Allowable Costs — Payroll Expenditure Controls",
    description: "Allowable costs — payroll expenditure controls. The City did not maintain adequate internal controls over payroll expenditures charged to the CDBG program to ensure costs were allowable per 2 CFR 200.403.",
    severity: "HIGH",
    regulation: "2 CFR 200.403 (Allowable Costs), 2 CFR 200.430 (Compensation)",
    auditYear: "FY2024",
    repeatedFromPrior: false,
  },
  {
    id: generateId("finding"),
    findingNumber: "2024-005",
    program: "CDBG Entitlement (14.218)",
    programCFDA: "14.218",
    complianceArea: "Procurement — SAM Verification Failures",
    description: "SAM verification failures. The City did not verify that vendors were not suspended or debarred by checking SAM.gov prior to awarding CDBG-funded procurements as required by 2 CFR 200.214.",
    severity: "CRITICAL",
    regulation: "2 CFR 200.214 (Suspension and Debarment), 31 USC 3729 (False Claims Act exposure)",
    auditYear: "FY2024",
    repeatedFromPrior: false,
  },
  {
    id: generateId("finding"),
    findingNumber: "2024-006",
    program: "CDBG Entitlement (14.218)",
    programCFDA: "14.218",
    complianceArea: "Reporting — Internal Control Over Federal Reports",
    description: "Internal control over federal reporting. The City's internal controls over financial reporting were not designed to detect errors in federal financial reports submitted to HUD.",
    severity: "HIGH",
    regulation: "2 CFR 200.328 (Financial Reporting), 2 CFR 200.303 (Internal Controls)",
    auditYear: "FY2024",
    repeatedFromPrior: false,
  },
  {
    id: generateId("finding"),
    findingNumber: "2024-007",
    program: "CDBG Entitlement (14.218)",
    programCFDA: "14.218",
    complianceArea: "Environmental Reviews — Special Tests",
    description: "Environmental reviews not completed per NEPA/HUD requirements. The City did not complete required environmental reviews under 24 CFR Part 58 before committing CDBG funds to projects.",
    severity: "HIGH",
    regulation: "24 CFR Part 58 (Environmental Review), NEPA",
    auditYear: "FY2024",
    repeatedFromPrior: false,
  },
  {
    id: generateId("finding"),
    findingNumber: "2024-008",
    program: "ESG (14.231)",
    programCFDA: "14.231",
    complianceArea: "Obligation/Expenditure/Payment Requirements",
    description: "The City did not comply with ESG obligation, expenditure, and payment timing requirements per program regulations.",
    severity: "MODERATE",
    regulation: "24 CFR 576.203 (ESG Obligation Requirements)",
    auditYear: "FY2024",
    repeatedFromPrior: false,
  },
  {
    id: generateId("finding"),
    findingNumber: "2024-009",
    program: "HOME (14.239)",
    programCFDA: "14.239",
    complianceArea: "Housing Quality Standards — Noncompliance",
    description: "Housing quality standards noncompliance. HOME-funded units did not meet housing quality standards at initial occupancy or during ongoing monitoring.",
    severity: "MODERATE",
    regulation: "24 CFR 92.251 (Property Standards)",
    auditYear: "FY2024",
    repeatedFromPrior: false,
  },
];

// --- Root Cause Analysis ---
const ROOT_CAUSE_MAP = {
  "allowable costs": "Inadequate cost allocation methodology or missing documentation for expenditure classification. Payroll charged to CDBG without time-and-effort documentation per 2 CFR 200.430.",
  "procurement": "Procurement policies not aligned with 2 CFR 200.320 or missing verification steps in vendor selection workflow.",
  "sam": "SAM.gov verification not built into procurement workflow. No pre-award suspension/debarment check documented. This creates potential False Claims Act exposure under 31 USC 3729 if any funds went to suspended or debarred entities.",
  "reporting": "Internal controls over financial reporting not designed to catch errors before federal report submission. No reconciliation step between general ledger and federal reports.",
  "environmental": "Environmental review process not integrated into project approval workflow. Funds committed before 24 CFR Part 58 clearance obtained — a procedural sequencing failure, not a substantive environmental issue.",
  "obligation": "Obligation and expenditure tracking does not flag approaching period-of-performance deadlines or payment timing requirements.",
  "housing quality": "HQS inspection scheduling and follow-up not systematically tracked. No documented protocol for re-inspection when units fail initial review.",
};

function identifyRootCause(finding) {
  const desc = (finding.description + ' ' + finding.complianceArea).toLowerCase();
  for (const [key, cause] of Object.entries(ROOT_CAUSE_MAP)) {
    if (desc.includes(key)) return cause;
  }
  return "Internal controls not designed or operating effectively to ensure compliance with " + (finding.regulation || "applicable requirements");
}

// --- Build the CAP ---
const lines = [];

lines.push("# Corrective Action Plan");
lines.push("## City of Stockton — FY2024 Single Audit");
lines.push("");
lines.push("**Report ID:** 2024-06-GSAFAC-0000405190");
lines.push("**Prepared by:** Vernen Legal Compliance");
lines.push("**Date:** " + new Date().toISOString().split("T")[0]);
lines.push("**Total Findings:** 6");
lines.push("**Programs Affected:** CDBG Entitlement (14.218), ESG (14.231), HOME (14.239)");
lines.push("");
lines.push("---");
lines.push("");

// Executive Summary
lines.push("## Executive Summary");
lines.push("");
lines.push("The City of Stockton's FY2024 Single Audit identified 6 findings across all three major HUD entitlement programs — CDBG, ESG, and HOME. Four of the six findings are concentrated in CDBG alone, covering payroll controls, procurement, federal reporting, and environmental review. This is not four isolated deficiencies — it is a systemic breakdown in CDBG program administration.");
lines.push("");
lines.push("The SAM verification failure (2024-005) carries the most immediate legal risk. If any CDBG procurement was awarded to a suspended or debarred entity, the City faces potential False Claims Act exposure under 31 USC 3729. This finding should be investigated and closed first.");
lines.push("");
lines.push("This plan addresses the systemic CDBG gap as one program administration fix, with separate targeted actions for the ESG and HOME findings. The goal is closure of all findings before FY2025 fieldwork.");
lines.push("");
lines.push("---");
lines.push("");

// Systemic Analysis
lines.push("## Systemic Analysis");
lines.push("");
lines.push("### Pattern 1: CDBG Program Administration Gap (Findings 2024-004, 2024-005, 2024-006, 2024-007)");
lines.push("");
lines.push("Four findings in a single program in a single audit year is not coincidence. When payroll, procurement, reporting, and environmental review all fail simultaneously, the root cause is not in any one of those areas — it is in the overall program administration framework that should be ensuring compliance across all of them.");
lines.push("");
lines.push("The likely root cause: the City's CDBG program lacks a single compliance officer or function responsible for cross-cutting federal requirements. Each area (finance, procurement, planning) operates independently without a unified compliance checkpoint. The corrective action must address this structural gap, not just patch each finding individually.");
lines.push("");
lines.push("### Pattern 2: HUD-Wide Compliance Controls");
lines.push("");
lines.push("Findings span all three HUD programs (CDBG, ESG, HOME). While the ESG and HOME findings are distinct, they suggest the internal control weaknesses are not limited to CDBG. A compliance framework built for CDBG should be extended to cover ESG and HOME to prevent findings from migrating across programs.");
lines.push("");
lines.push("---");
lines.push("");

// Individual Findings
for (const finding of findings) {
  const rootCause = identifyRootCause(finding);

  lines.push("## Finding " + finding.findingNumber);
  lines.push("");
  lines.push("**Program:** " + finding.program);
  lines.push("**Compliance Area:** " + finding.complianceArea);
  lines.push("**Severity:** " + finding.severity);
  lines.push("**Regulation:** " + finding.regulation);
  lines.push("");
  lines.push("### Root Cause");
  lines.push("");
  lines.push(rootCause);
  lines.push("");
  lines.push("### Corrective Actions");
  lines.push("");
  lines.push("| # | Action | Responsible | Deadline | Deliverable |");
  lines.push("|---|---|---|---|---|");

  let step = 0;

  // Always: policy review
  lines.push(`| ${++step} | Review and update written policies for ${finding.complianceArea} | CDBG Program Manager | Week 2 | Updated policy document with approval signatures |`);

  // Area-specific
  const area = finding.complianceArea.toLowerCase();
  if (area.includes("sam") || area.includes("procurement")) {
    lines.push(`| ${++step} | Implement mandatory SAM.gov pre-award verification for all procurements over $25,000 | Procurement Officer | Week 3 | SAM verification checklist, screenshot requirement |`);
    lines.push(`| ${++step} | Retroactively verify SAM status for all current-year CDBG vendors | Procurement Officer | Week 6 | Vendor verification log with dates and screenshots |`);
    lines.push(`| ${++step} | Legal review of any procurements where vendor was suspended/debarred at time of award | City Attorney | Week 4 | Legal memo assessing False Claims Act exposure |`);
  }
  if (area.includes("allowable") || area.includes("payroll")) {
    lines.push(`| ${++step} | Implement time-and-effort documentation for all staff charging time to CDBG | Finance Director | Week 3 | Time certification forms, semi-annual certification schedule |`);
    lines.push(`| ${++step} | Secondary review of all CDBG payroll charges before posting | Finance Director | Week 3 | Dual-approval workflow documentation |`);
  }
  if (area.includes("reporting")) {
    lines.push(`| ${++step} | Implement pre-submission reconciliation between GL and federal reports | Finance Director | Week 3 | Reconciliation checklist with supervisory sign-off |`);
    lines.push(`| ${++step} | Establish quarterly review of all federal financial reports before submission | CFO | Week 4 | Quarterly report review schedule and sign-off log |`);
  }
  if (area.includes("environmental")) {
    lines.push(`| ${++step} | Integrate environmental clearance into project approval workflow — no funds committed before Part 58 clearance | Planning Director | Week 4 | Updated project approval checklist with environmental gate |`);
    lines.push(`| ${++step} | Retroactively complete environmental reviews for any active projects lacking clearance | Environmental Reviewer | Week 8 | Environmental review completion log |`);
  }
  if (area.includes("obligation") || area.includes("expenditure") || area.includes("payment")) {
    lines.push(`| ${++step} | Map ESG obligation/expenditure/payment deadlines into financial tracking system | Grants Manager | Week 4 | ESG compliance calendar with automated reminders |`);
    lines.push(`| ${++step} | Monthly ESG expenditure reconciliation against obligation timeline | Finance Director | Week 4 | Monthly reconciliation template |`);
  }
  if (area.includes("housing quality") || area.includes("hqs")) {
    lines.push(`| ${++step} | Implement HQS inspection tracking with automated re-inspection scheduling | Housing Program Manager | Week 4 | Inspection tracking database/spreadsheet |`);
    lines.push(`| ${++step} | Conduct retroactive HQS inspections for all HOME units currently occupied | Housing Inspector | Week 8 | Inspection completion log with results |`);
  }

  // Always: training
  lines.push(`| ${++step} | Train responsible staff on updated procedures | Program Manager | Week 4 | Training attendance log with signatures |`);
  // Always: monitoring
  lines.push(`| ${++step} | Quarterly internal monitoring review through next audit cycle | Internal Audit | Quarterly | Monitoring memo documenting control effectiveness |`);

  lines.push("");
  lines.push("---");
  lines.push("");
}

// Implementation Timeline
lines.push("## Implementation Timeline");
lines.push("");
lines.push("| Phase | Weeks | Focus | Description |");
lines.push("|---|---|---|---|");
lines.push("| 1. Immediate Response | 1-2 | SAM verification (2024-005), policy review (all) | Investigate SAM finding for False Claims Act exposure. Begin policy review for all 6 findings. |");
lines.push("| 2. Remediation | 3-8 | Implementation of all corrective actions | Execute corrective actions across all findings. Complete retroactive reviews. Deliver staff training. |");
lines.push("| 3. Monitoring | 9-12 | Verify fixes hold | First quarterly monitoring review. Document evidence of sustained compliance. |");
lines.push("| 4. Pre-Audit Readiness | FY2025 -60 days | Audit preparation | Readiness assessment confirming all 6 findings can be demonstrated as closed. Prepare auditor-ready documentation. |");
lines.push("");
lines.push("---");
lines.push("");

// Engagement Options
lines.push("## Engagement Options");
lines.push("");
lines.push("### Option 1: Corrective Action Plan Only");
lines.push("");
lines.push("This document, plus template documents for each deliverable (checklists, tracking logs, certification forms, reconciliation templates).");
lines.push("");
lines.push("**Includes:**");
lines.push("- Root cause analysis for each finding");
lines.push("- Systemic pattern identification");
lines.push("- Remediation steps with responsible parties and deadlines");
lines.push("- Template documents for all deliverables");
lines.push("");
lines.push("**Price: $5,000 - $7,500**");
lines.push("");

lines.push("### Option 2: CAP + Implementation Support");
lines.push("");
lines.push("Everything in Option 1, plus hands-on assistance implementing the corrective actions.");
lines.push("");
lines.push("**Includes:**");
lines.push("- Everything in Option 1");
lines.push("- Policy and procedure drafting/revision");
lines.push("- Staff training delivery");
lines.push("- Weekly progress check-ins");
lines.push("- Management briefing presentations");
lines.push("");
lines.push("**Price: $12,000 - $18,000**");
lines.push("");

lines.push("### Option 3: Full Remediation + Monitoring Through Next Audit");
lines.push("");
lines.push("Complete engagement through the FY2025 audit cycle.");
lines.push("");
lines.push("**Includes:**");
lines.push("- Everything in Options 1 and 2");
lines.push("- Quarterly monitoring reviews");
lines.push("- Pre-audit readiness assessment");
lines.push("- Auditor liaison support during FY2025 fieldwork");
lines.push("- Continuous compliance monitoring via platform");
lines.push("");
lines.push("**Price: $25,000 - $35,000**");
lines.push("");
lines.push("---");
lines.push("");

// Monitoring
lines.push("## Ongoing Monitoring Plan");
lines.push("");
lines.push("Quarterly internal monitoring reviews for 4 quarters following implementation. Each review assesses whether corrective actions remain effective, documents evidence of ongoing compliance, and identifies any drift. A pre-audit readiness assessment will be conducted 60 days before anticipated FY2025 fieldwork to ensure all 6 findings can be demonstrated as closed to the auditor's satisfaction.");
lines.push("");
lines.push("---");
lines.push("");
lines.push("**Vernen Legal Compliance**");
lines.push("compliance.vernenlegal.com");
lines.push("");
lines.push("*This corrective action plan was generated from public Single Audit data (Federal Audit Clearinghouse). Engagement pricing reflects estimated effort based on the scope of findings and may be adjusted following a scoping discussion.*");

// Write to Desktop
const output = lines.join("\n");
const outPath = path.join('/home/vernenlegal/Desktop', 'Stockton_Corrective_Action_Plan.md');
fs.writeFileSync(outPath, output);
console.log("Written to:", outPath);
console.log("Lines:", lines.length);
console.log("Size:", (Buffer.byteLength(output) / 1024).toFixed(1) + " KB");

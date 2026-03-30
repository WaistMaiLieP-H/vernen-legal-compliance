/**
 * corrective-action.ts — Corrective Action Plan (CAP) Generator
 *
 * Takes audit findings (from FAC, internal audits, or document audits)
 * and generates structured corrective action plans with:
 * - Root cause analysis per finding
 * - Systemic pattern detection (multiple findings = one root cause)
 * - Remediation steps with responsible parties and deadlines
 * - Monitoring milestones
 * - Cost estimates by tier
 *
 * This is the revenue product. The audit is free. The CAP is the engagement.
 */

import { generateId } from "../utils/helpers.js";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AuditFinding {
  id: string;
  findingNumber: string;
  program: string;
  programCFDA?: string;
  complianceArea: string;
  description: string;
  severity: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
  regulation?: string;
  auditYear?: string;
  repeatedFromPrior?: boolean;
}

export interface RemediationStep {
  id: string;
  order: number;
  action: string;
  responsible: string;
  deadline: string;
  deliverable: string;
  estimatedHours: number;
  dependencies: string[];
}

export interface FindingCAP {
  findingId: string;
  findingNumber: string;
  rootCause: string;
  systemicPattern: string | null;
  remediationSteps: RemediationStep[];
  monitoringMilestones: string[];
  estimatedCost: { low: number; mid: number; high: number };
  priority: number;
  targetCloseDate: string;
}

export interface CorrectiveActionPlan {
  id: string;
  entityName: string;
  auditReportId: string;
  auditYear: string;
  generatedAt: string;
  executiveSummary: string;
  systemicAnalysis: string;
  totalFindings: number;
  criticalFindings: number;
  findings: FindingCAP[];
  implementationTimeline: TimelinePhase[];
  costSummary: {
    totalLow: number;
    totalMid: number;
    totalHigh: number;
    engagementTiers: EngagementTier[];
  };
  monitoringPlan: string;
}

export interface TimelinePhase {
  phase: number;
  name: string;
  startWeek: number;
  endWeek: number;
  findings: string[];
  description: string;
}

export interface EngagementTier {
  name: string;
  description: string;
  includes: string[];
  price: { low: number; high: number };
}

// ---------------------------------------------------------------------------
// Root Cause Analysis Patterns
// ---------------------------------------------------------------------------

const ROOT_CAUSE_MAP: Record<string, string> = {
  "allowable costs": "Inadequate cost allocation methodology or missing documentation for expenditure classification",
  "procurement": "Procurement policies not aligned with 2 CFR 200.320 or missing verification steps in vendor selection",
  "reporting": "Internal controls over financial reporting not designed to catch errors before federal report submission",
  "environmental": "Environmental review process not integrated into project approval workflow per 24 CFR Part 58",
  "subrecipient monitoring": "Insufficient monitoring framework for pass-through entities per 2 CFR 200.332",
  "eligibility": "Beneficiary eligibility determination procedures lack documented verification steps",
  "cash management": "Treasury draw-down timing not aligned with actual disbursement schedule per 2 CFR 200.305",
  "matching": "Match tracking not integrated into general ledger; reliance on manual reconciliation",
  "period of performance": "Obligation and expenditure tracking does not flag approaching period-of-performance deadlines",
  "sam": "SAM.gov verification not built into procurement workflow; no pre-award check documented",
  "housing quality": "HQS inspection scheduling and follow-up not systematically tracked",
  "davis-bacon": "Prevailing wage compliance monitoring relies on contractor self-certification without independent verification",
  "special tests": "Program-specific compliance requirements not mapped to internal control activities",
};

function identifyRootCause(finding: AuditFinding): string {
  const desc = finding.description.toLowerCase();
  const area = finding.complianceArea.toLowerCase();

  for (const [key, cause] of Object.entries(ROOT_CAUSE_MAP)) {
    if (desc.includes(key) || area.includes(key)) {
      return cause;
    }
  }

  return `Internal controls over ${finding.complianceArea} not designed or operating effectively to ensure compliance with ${finding.regulation || "applicable requirements"}`;
}

// ---------------------------------------------------------------------------
// Systemic Pattern Detection
// ---------------------------------------------------------------------------

function detectSystemicPatterns(findings: AuditFinding[]): Map<string, string[]> {
  const patterns = new Map<string, string[]>();

  // Group by program
  const byProgram = new Map<string, AuditFinding[]>();
  for (const f of findings) {
    const key = f.program;
    if (!byProgram.has(key)) byProgram.set(key, []);
    byProgram.get(key)!.push(f);
  }

  // 3+ findings in one program = systemic administration gap
  for (const [program, programFindings] of byProgram) {
    if (programFindings.length >= 3) {
      patterns.set(
        `Systemic ${program} program administration gap`,
        programFindings.map(f => f.findingNumber)
      );
    }
  }

  // Repeated findings from prior year
  const repeated = findings.filter(f => f.repeatedFromPrior);
  if (repeated.length > 0) {
    patterns.set(
      "Unresolved prior-year findings indicate corrective actions were not implemented or were ineffective",
      repeated.map(f => f.findingNumber)
    );
  }

  // Cross-program patterns (same compliance area across programs)
  const byArea = new Map<string, AuditFinding[]>();
  for (const f of findings) {
    const key = f.complianceArea.toLowerCase();
    if (!byArea.has(key)) byArea.set(key, []);
    byArea.get(key)!.push(f);
  }

  for (const [area, areaFindings] of byArea) {
    if (areaFindings.length >= 2) {
      const programs = [...new Set(areaFindings.map(f => f.program))];
      if (programs.length >= 2) {
        patterns.set(
          `Cross-program ${area} deficiency spanning ${programs.join(", ")}`,
          areaFindings.map(f => f.findingNumber)
        );
      }
    }
  }

  return patterns;
}

// ---------------------------------------------------------------------------
// Remediation Step Generation
// ---------------------------------------------------------------------------

function generateRemediationSteps(finding: AuditFinding): RemediationStep[] {
  const steps: RemediationStep[] = [];
  const area = finding.complianceArea.toLowerCase();
  let order = 0;

  // Step 1: Always start with policy/procedure review
  steps.push({
    id: generateId("step"),
    order: ++order,
    action: `Review and update written policies and procedures for ${finding.complianceArea}`,
    responsible: "Compliance Officer / Program Manager",
    deadline: "Week 2",
    deliverable: `Updated ${finding.complianceArea} policy document with version date and approval signatures`,
    estimatedHours: 8,
    dependencies: [],
  });

  // Step 2: Training
  steps.push({
    id: generateId("step"),
    order: ++order,
    action: `Train all staff involved in ${finding.program} on updated procedures`,
    responsible: "Program Manager",
    deadline: "Week 4",
    deliverable: "Training attendance log with signatures, training materials, competency assessment",
    estimatedHours: 4,
    dependencies: [steps[0].id],
  });

  // Area-specific steps
  if (area.includes("procurement") || area.includes("sam")) {
    steps.push({
      id: generateId("step"),
      order: ++order,
      action: "Implement mandatory SAM.gov verification checklist for all procurements exceeding $25,000",
      responsible: "Procurement Officer",
      deadline: "Week 3",
      deliverable: "SAM verification log template, screenshot requirement, pre-award checklist",
      estimatedHours: 6,
      dependencies: [steps[0].id],
    });

    steps.push({
      id: generateId("step"),
      order: ++order,
      action: "Retroactively verify SAM.gov status for all current-year vendors",
      responsible: "Procurement Officer",
      deadline: "Week 6",
      deliverable: "Vendor SAM verification spreadsheet with dates and screenshots",
      estimatedHours: 16,
      dependencies: [],
    });
  }

  if (area.includes("allowable") || area.includes("payroll") || area.includes("cost")) {
    steps.push({
      id: generateId("step"),
      order: ++order,
      action: "Implement secondary review for all federal expenditure classifications before posting",
      responsible: "Finance Director",
      deadline: "Week 3",
      deliverable: "Expenditure approval workflow with dual-signature requirement",
      estimatedHours: 8,
      dependencies: [steps[0].id],
    });
  }

  if (area.includes("reporting") || area.includes("report")) {
    steps.push({
      id: generateId("step"),
      order: ++order,
      action: "Implement pre-submission reconciliation checklist for all federal financial reports",
      responsible: "Finance Director / Grants Manager",
      deadline: "Week 3",
      deliverable: "Report reconciliation checklist, supervisory review sign-off template",
      estimatedHours: 6,
      dependencies: [steps[0].id],
    });
  }

  if (area.includes("environmental")) {
    steps.push({
      id: generateId("step"),
      order: ++order,
      action: "Integrate environmental review clearance into project approval workflow — no funds released without documented NEPA/HUD environmental clearance",
      responsible: "Program Manager / Environmental Reviewer",
      deadline: "Week 4",
      deliverable: "Environmental review tracking log, clearance-before-commitment policy",
      estimatedHours: 12,
      dependencies: [steps[0].id],
    });
  }

  if (area.includes("housing quality") || area.includes("hqs")) {
    steps.push({
      id: generateId("step"),
      order: ++order,
      action: "Implement HQS inspection tracking system with automated follow-up scheduling",
      responsible: "Housing Program Manager",
      deadline: "Week 4",
      deliverable: "Inspection tracking spreadsheet/database, re-inspection scheduling protocol",
      estimatedHours: 10,
      dependencies: [steps[0].id],
    });
  }

  // Final step: Always end with monitoring
  steps.push({
    id: generateId("step"),
    order: ++order,
    action: `Conduct internal monitoring review of ${finding.complianceArea} controls quarterly until next audit`,
    responsible: "Internal Audit / Compliance Officer",
    deadline: "Quarterly (ongoing)",
    deliverable: "Quarterly monitoring memo documenting control effectiveness",
    estimatedHours: 4,
    dependencies: steps.map(s => s.id),
  });

  return steps;
}

// ---------------------------------------------------------------------------
// Cost Estimation
// ---------------------------------------------------------------------------

function estimateCost(steps: RemediationStep[]): { low: number; mid: number; high: number } {
  const totalHours = steps.reduce((sum, s) => sum + s.estimatedHours, 0);
  return {
    low: totalHours * 100,   // Junior/internal rate
    mid: totalHours * 175,   // Mid-market consulting
    high: totalHours * 275,  // Big-4 / specialized
  };
}

// ---------------------------------------------------------------------------
// Timeline Generation
// ---------------------------------------------------------------------------

function generateTimeline(findingCAPs: FindingCAP[]): TimelinePhase[] {
  const phases: TimelinePhase[] = [];

  // Phase 1: Immediate (weeks 1-2) — policy review for all findings
  const criticalFindings = findingCAPs.filter(f => f.priority <= 2).map(f => f.findingNumber);
  phases.push({
    phase: 1,
    name: "Immediate Response",
    startWeek: 1,
    endWeek: 2,
    findings: criticalFindings.length > 0 ? criticalFindings : [findingCAPs[0]?.findingNumber || ""],
    description: "Policy and procedure review for highest-priority findings. Management acknowledgment of findings and assignment of responsible parties.",
  });

  // Phase 2: Implementation (weeks 3-8) — remediation steps
  phases.push({
    phase: 2,
    name: "Remediation Implementation",
    startWeek: 3,
    endWeek: 8,
    findings: findingCAPs.map(f => f.findingNumber),
    description: "Execute corrective actions: update procedures, train staff, implement new controls, verify retroactive compliance.",
  });

  // Phase 3: Monitoring (weeks 9-12) — verify fixes hold
  phases.push({
    phase: 3,
    name: "Verification & Monitoring",
    startWeek: 9,
    endWeek: 12,
    findings: findingCAPs.map(f => f.findingNumber),
    description: "Internal monitoring to verify corrective actions are operating effectively. Document evidence for next audit cycle.",
  });

  return phases;
}

// ---------------------------------------------------------------------------
// Engagement Tier Definition
// ---------------------------------------------------------------------------

function defineEngagementTiers(totalFindings: number): EngagementTier[] {
  return [
    {
      name: "Corrective Action Plan Only",
      description: "Written CAP document with root cause analysis, remediation steps, timelines, and deliverables for each finding",
      includes: [
        "Root cause analysis for each finding",
        "Systemic pattern identification",
        "Remediation steps with responsible parties and deadlines",
        "Deliverable specifications for each step",
        "Implementation timeline",
        "Template documents (checklists, tracking logs)",
      ],
      price: {
        low: Math.max(2500, totalFindings * 750),
        high: Math.max(5000, totalFindings * 1500),
      },
    },
    {
      name: "CAP + Implementation Support",
      description: "Everything in the CAP plus hands-on assistance implementing the corrective actions",
      includes: [
        "Everything in CAP Only",
        "Policy and procedure drafting/revision",
        "Staff training delivery",
        "Control design and testing",
        "Progress check-ins (weekly)",
        "Management briefing presentations",
      ],
      price: {
        low: Math.max(7500, totalFindings * 2000),
        high: Math.max(15000, totalFindings * 3500),
      },
    },
    {
      name: "Full Remediation + Monitoring",
      description: "Complete engagement through the next audit cycle including ongoing monitoring",
      includes: [
        "Everything in CAP + Implementation",
        "Quarterly monitoring reviews",
        "Pre-audit readiness assessment",
        "Auditor liaison support",
        "Continuous compliance monitoring via platform",
        "Annual refresh of compliance controls",
      ],
      price: {
        low: Math.max(15000, totalFindings * 4000),
        high: Math.max(35000, totalFindings * 7500),
      },
    },
  ];
}

// ---------------------------------------------------------------------------
// Main Generator
// ---------------------------------------------------------------------------

export function generateCorrectiveActionPlan(
  entityName: string,
  auditReportId: string,
  auditYear: string,
  findings: AuditFinding[],
): CorrectiveActionPlan {
  // Detect systemic patterns
  const patterns = detectSystemicPatterns(findings);

  // Generate CAP for each finding
  const findingCAPs: FindingCAP[] = findings.map((finding, idx) => {
    const rootCause = identifyRootCause(finding);
    const steps = generateRemediationSteps(finding);
    const cost = estimateCost(steps);

    // Check if this finding is part of a systemic pattern
    let systemicPattern: string | null = null;
    for (const [pattern, findingNums] of patterns) {
      if (findingNums.includes(finding.findingNumber)) {
        systemicPattern = pattern;
        break;
      }
    }

    // Priority: CRITICAL=1, HIGH=2, MODERATE=3, LOW=4; repeated findings +priority
    let priority = finding.severity === "CRITICAL" ? 1 : finding.severity === "HIGH" ? 2 : finding.severity === "MODERATE" ? 3 : 4;
    if (finding.repeatedFromPrior) priority = Math.max(1, priority - 1);

    // Target close: 30 days for critical, 60 for high, 90 for moderate/low
    const daysToClose = priority <= 1 ? 30 : priority <= 2 ? 60 : 90;
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + daysToClose);

    return {
      findingId: finding.id,
      findingNumber: finding.findingNumber,
      rootCause,
      systemicPattern,
      remediationSteps: steps,
      monitoringMilestones: [
        `Week 2: Policy review complete for ${finding.findingNumber}`,
        `Week 4: Staff training delivered`,
        `Week 8: All corrective actions implemented`,
        `Week 12: First monitoring review confirms controls operating`,
      ],
      estimatedCost: cost,
      priority,
      targetCloseDate: targetDate.toISOString().split("T")[0],
    };
  });

  // Sort by priority
  findingCAPs.sort((a, b) => a.priority - b.priority);

  // Generate timeline
  const timeline = generateTimeline(findingCAPs);

  // Cost summary
  const totalLow = findingCAPs.reduce((s, f) => s + f.estimatedCost.low, 0);
  const totalMid = findingCAPs.reduce((s, f) => s + f.estimatedCost.mid, 0);
  const totalHigh = findingCAPs.reduce((s, f) => s + f.estimatedCost.high, 0);
  const engagementTiers = defineEngagementTiers(findings.length);

  // Systemic analysis narrative
  const systemicNarrative = patterns.size > 0
    ? [...patterns.entries()]
        .map(([pattern, nums]) => `**${pattern}** (${nums.join(", ")}): This is not ${nums.length} separate issues — it is one program administration gap that manifests across multiple compliance areas.`)
        .join("\n\n")
    : "No systemic patterns detected. Findings appear to be isolated control deficiencies.";

  const criticalCount = findings.filter(f => f.severity === "CRITICAL" || f.severity === "HIGH").length;

  // Executive summary
  const execSummary = `${entityName}'s ${auditYear} Single Audit identified ${findings.length} finding${findings.length !== 1 ? "s" : ""} across ${[...new Set(findings.map(f => f.program))].join(", ")}. ${criticalCount > 0 ? `${criticalCount} finding${criticalCount !== 1 ? "s" : ""} are rated HIGH or CRITICAL and require immediate attention. ` : ""}${patterns.size > 0 ? `Systemic analysis reveals ${patterns.size} underlying pattern${patterns.size !== 1 ? "s" : ""} — addressing the root causes will close multiple findings simultaneously rather than treating each as an isolated deficiency.` : "Each finding can be addressed through targeted corrective actions."} This plan provides specific remediation steps, responsible parties, deadlines, and deliverables for each finding, with a ${findingCAPs.length <= 3 ? "60" : "90"}-day implementation timeline targeting closure before the next audit cycle.`;

  return {
    id: generateId("cap"),
    entityName,
    auditReportId,
    auditYear,
    generatedAt: new Date().toISOString(),
    executiveSummary: execSummary,
    systemicAnalysis: systemicNarrative,
    totalFindings: findings.length,
    criticalFindings: criticalCount,
    findings: findingCAPs,
    implementationTimeline: timeline,
    costSummary: {
      totalLow,
      totalMid,
      totalHigh,
      engagementTiers,
    },
    monitoringPlan: `Quarterly internal monitoring reviews for ${Math.ceil(12 / 3)} quarters following implementation. Each review will assess whether corrective actions remain effective, document evidence of ongoing compliance, and identify any drift. A pre-audit readiness assessment will be conducted 60 days before anticipated fieldwork to ensure all findings can be demonstrated as closed.`,
  };
}

// ---------------------------------------------------------------------------
// Markdown Renderer
// ---------------------------------------------------------------------------

export function renderCAPtoMarkdown(cap: CorrectiveActionPlan): string {
  const lines: string[] = [];

  lines.push(`# Corrective Action Plan`);
  lines.push(`## ${cap.entityName} — ${cap.auditYear} Single Audit`);
  lines.push(``);
  lines.push(`**Report ID:** ${cap.auditReportId}`);
  lines.push(`**Generated:** ${cap.generatedAt.split("T")[0]}`);
  lines.push(`**Total Findings:** ${cap.totalFindings}`);
  lines.push(`**Critical/High Findings:** ${cap.criticalFindings}`);
  lines.push(``);
  lines.push(`---`);
  lines.push(``);
  lines.push(`## Executive Summary`);
  lines.push(``);
  lines.push(cap.executiveSummary);
  lines.push(``);
  lines.push(`---`);
  lines.push(``);
  lines.push(`## Systemic Analysis`);
  lines.push(``);
  lines.push(cap.systemicAnalysis);
  lines.push(``);
  lines.push(`---`);
  lines.push(``);

  // Findings
  for (const f of cap.findings) {
    lines.push(`## Finding ${f.findingNumber}`);
    lines.push(``);
    lines.push(`**Priority:** ${f.priority} | **Target Close:** ${f.targetCloseDate}`);
    if (f.systemicPattern) {
      lines.push(`**Systemic Pattern:** ${f.systemicPattern}`);
    }
    lines.push(``);
    lines.push(`### Root Cause`);
    lines.push(``);
    lines.push(f.rootCause);
    lines.push(``);
    lines.push(`### Remediation Steps`);
    lines.push(``);
    lines.push(`| # | Action | Responsible | Deadline | Deliverable | Est. Hours |`);
    lines.push(`|---|---|---|---|---|---|`);
    for (const step of f.remediationSteps) {
      lines.push(`| ${step.order} | ${step.action} | ${step.responsible} | ${step.deadline} | ${step.deliverable} | ${step.estimatedHours} |`);
    }
    lines.push(``);
    lines.push(`### Monitoring Milestones`);
    lines.push(``);
    for (const m of f.monitoringMilestones) {
      lines.push(`- ${m}`);
    }
    lines.push(``);
    lines.push(`**Estimated Cost:** $${f.estimatedCost.low.toLocaleString()} - $${f.estimatedCost.high.toLocaleString()}`);
    lines.push(``);
    lines.push(`---`);
    lines.push(``);
  }

  // Timeline
  lines.push(`## Implementation Timeline`);
  lines.push(``);
  lines.push(`| Phase | Name | Weeks | Findings | Description |`);
  lines.push(`|---|---|---|---|---|`);
  for (const phase of cap.implementationTimeline) {
    lines.push(`| ${phase.phase} | ${phase.name} | ${phase.startWeek}-${phase.endWeek} | ${phase.findings.join(", ")} | ${phase.description} |`);
  }
  lines.push(``);

  // Cost Summary
  lines.push(`## Engagement Options`);
  lines.push(``);
  for (const tier of cap.costSummary.engagementTiers) {
    lines.push(`### ${tier.name}`);
    lines.push(``);
    lines.push(tier.description);
    lines.push(``);
    lines.push(`**Includes:**`);
    for (const item of tier.includes) {
      lines.push(`- ${item}`);
    }
    lines.push(``);
    lines.push(`**Price Range:** $${tier.price.low.toLocaleString()} - $${tier.price.high.toLocaleString()}`);
    lines.push(``);
  }

  // Monitoring
  lines.push(`## Ongoing Monitoring Plan`);
  lines.push(``);
  lines.push(cap.monitoringPlan);
  lines.push(``);

  lines.push(`---`);
  lines.push(``);
  lines.push(`**Vernen Legal Compliance**`);
  lines.push(`compliance.vernenlegal.com`);
  lines.push(``);
  lines.push(`*This corrective action plan was generated from public audit data. Engagement pricing reflects estimated effort and may be adjusted based on scope discussion.*`);

  return lines.join("\n");
}

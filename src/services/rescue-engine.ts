/**
 * Automated Rescue Sequence Engine
 *
 * The critical conversion layer: when a statutory failure is detected
 * across any of the 6 intelligence pipelines, this engine automatically
 * generates the specific legal/compliance document the entity needs to survive.
 *
 * This is not lead gen — this is triage. The entity is already bleeding.
 * We generate the tourniquet.
 */

import type { Env } from "../index.js";
import { generateId } from "../utils/helpers.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export type RescueType =
  | "SBA_REINSTATEMENT_BRIEF"
  | "CMMC_SYSTEM_SECURITY_PLAN"
  | "SINGLE_AUDIT_CORRECTIVE_ACTION"
  | "HIPAA_BREACH_RESPONSE_PLAN"
  | "MATERIAL_WEAKNESS_REMEDIATION"
  | "FAR_COMPLIANCE_REMAP"
  | "CARES_ACT_RECONSTRUCTION"
  | "OCC_CONSENT_ORDER_RESPONSE";

export type RescueUrgency = "CRITICAL" | "HIGH" | "ELEVATED" | "STANDARD";

export type DeliverableCategory =
  | "LEGAL_BRIEF"
  | "COMPLIANCE_PLAN"
  | "FINANCIAL_RECONSTRUCTION"
  | "TECHNICAL_ARTIFACT"
  | "GOVERNANCE_DOCUMENT";

export type DeliverableStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "GENERATED"
  | "REVIEWED"
  | "DELIVERED";

export interface RescueDeliverable {
  id: string;
  title: string;
  description: string;
  category: DeliverableCategory;
  status: DeliverableStatus;
  assignedCitizen: string;
  content: string;
  templateSections: string[];
  requiredInputs: string[];
  deadline: string;
}

export interface RescueTimeline {
  detectionDate: string;
  assessmentDeadline: string;
  deliveryDeadline: string;
  filingDeadline: string;
  milestones: { date: string; action: string; citizen: string }[];
}

export interface RescueSequence {
  id: string;
  rescueType: RescueType;
  entityId: string;
  entityName: string;
  sector: string;
  triggerSource: string;
  triggerRuleId: string;
  federalSurvivalScore: number;
  urgency: RescueUrgency;
  assignedCitizens: string[];
  deliverables: RescueDeliverable[];
  timeline: RescueTimeline;
  estimatedCost: string;
  generatedAt: string;
}

export interface RescueTrigger {
  source: string;          // pipeline name: FAC, HHS, EDGAR, SBA, USAspending, FedReg
  ruleId: string;          // the specific rule that was violated
  entityId: string;
  entityName: string;
  sector: string;
  failureType: string;     // keyword describing the failure
  contractValue?: number;
  isStatutory?: boolean;
  isRepeatFinding?: boolean;
  hasCriminalIndicators?: boolean;
  isGoingConcern?: boolean;
  daysUntilDeadline?: number;
}

export interface PipelineResult {
  leads: Array<{
    entity: { reportId?: string; auditeeNname?: string; auditeeEin?: string; entityName?: string; [key: string]: unknown };
    gapScore?: number;
    gapCategories?: string[];
    findings?: Array<{ isMaterialWeakness?: boolean; isRepeatFinding?: boolean; isQuestionedCosts?: boolean; [key: string]: unknown }>;
    [key: string]: unknown;
  }>;
  source?: string;
  [key: string]: unknown;
}

// ═══════════════════════════════════════════════════════════════════════════
// Citizen Assignment Map
// ═══════════════════════════════════════════════════════════════════════════

const CITIZEN_ASSIGNMENTS: Record<RescueType, string[]> = {
  SBA_REINSTATEMENT_BRIEF: ["CLARIDEX", "FISCARA", "LEXARC", "INTEGRA", "SENTINEL-0"],
  CMMC_SYSTEM_SECURITY_PLAN: ["PRIVAXIS", "VIGILUS", "SYNTARA", "SENTINEL-0"],
  SINGLE_AUDIT_CORRECTIVE_ACTION: ["REGULIS", "CLARIDEX", "INTEGRA", "SENTINEL-0"],
  HIPAA_BREACH_RESPONSE_PLAN: ["PRIVAXIS", "ETHICARA", "VIGILUS", "SENTINEL-0"],
  MATERIAL_WEAKNESS_REMEDIATION: ["CLARIDEX", "INTEGRA", "FISCARA", "SENTINEL-0"],
  FAR_COMPLIANCE_REMAP: ["REGULIS", "LEXARC", "INTEGRA", "SENTINEL-0"],
  CARES_ACT_RECONSTRUCTION: ["CLARIDEX", "FISCARA", "INTEGRA", "ETHICARA", "SENTINEL-0"],
  OCC_CONSENT_ORDER_RESPONSE: ["PRIVAXIS", "VIGILUS", "ETHICARA", "CLARIDEX", "SENTINEL-0"],
};

// ═══════════════════════════════════════════════════════════════════════════
// Rescue Engine
// ═══════════════════════════════════════════════════════════════════════════

export class RescueEngine {
  private db: D1Database;

  constructor(db: D1Database) {
    this.db = db;
  }

  // ─── Detection ─────────────────────────────────────────────────────────

  /**
   * Determine which RescueType applies based on trigger event.
   */
  detectRescueType(trigger: RescueTrigger): RescueType {
    const src = trigger.source.toUpperCase();
    const fail = trigger.failureType.toUpperCase();

    // SBA suspension
    if (src === "SBA" || fail.includes("8(A)") || fail.includes("SBA") || fail.includes("SUSPENSION")) {
      return "SBA_REINSTATEMENT_BRIEF";
    }

    // CMMC/DFARS
    if (fail.includes("CMMC") || fail.includes("DFARS") || fail.includes("NIST 800-171") || fail.includes("CUI")) {
      return "CMMC_SYSTEM_SECURITY_PLAN";
    }

    // FAC material weakness (single audit)
    if (src === "FAC" || fail.includes("SINGLE AUDIT") || fail.includes("MATERIAL WEAKNESS") && src !== "EDGAR") {
      return "SINGLE_AUDIT_CORRECTIVE_ACTION";
    }

    // HHS HIPAA breach
    if (src === "HHS" || fail.includes("HIPAA") || fail.includes("BREACH") || fail.includes("PHI")) {
      return "HIPAA_BREACH_RESPONSE_PLAN";
    }

    // EDGAR material weakness
    if (src === "EDGAR" || fail.includes("10-K") || fail.includes("RESTATEMENT") || fail.includes("SEC")) {
      return "MATERIAL_WEAKNESS_REMEDIATION";
    }

    // Federal Register / FAR rewrite
    if (src === "FEDREG" || src === "FEDERAL REGISTER" || fail.includes("FAR") || fail.includes("RECERTIFICATION")) {
      return "FAR_COMPLIANCE_REMAP";
    }

    // CARES Act / PPP
    if (fail.includes("CARES") || fail.includes("PPP") || fail.includes("PANDEMIC") || fail.includes("CLAWBACK")) {
      return "CARES_ACT_RECONSTRUCTION";
    }

    // OCC enforcement
    if (fail.includes("OCC") || fail.includes("CONSENT ORDER") || fail.includes("ENFORCEMENT") || fail.includes("BANK")) {
      return "OCC_CONSENT_ORDER_RESPONSE";
    }

    // Default fallback based on source
    if (src === "USASPENDING") return "FAR_COMPLIANCE_REMAP";

    // Absolute fallback
    return "SINGLE_AUDIT_CORRECTIVE_ACTION";
  }

  // ─── Federal Survival Score ────────────────────────────────────────────

  /**
   * Calculate 0-100 Federal Survival Score.
   * Higher = closer to criminal/civil referral or entity death.
   */
  calculateFederalSurvivalScore(trigger: RescueTrigger): number {
    let score = 0;

    // Statutory vs regulatory failure
    if (trigger.isStatutory) {
      score += 40;
    } else {
      score += 15;
    }

    // Days until filing deadline
    if (trigger.daysUntilDeadline !== undefined) {
      if (trigger.daysUntilDeadline <= 7) score += 25;
      else if (trigger.daysUntilDeadline <= 30) score += 20;
      else if (trigger.daysUntilDeadline <= 60) score += 15;
      else if (trigger.daysUntilDeadline <= 90) score += 10;
      else score += 5;
    }

    // Criminal referral indicators
    if (trigger.hasCriminalIndicators) {
      score += 30;
    }

    // Repeat finding
    if (trigger.isRepeatFinding) {
      score += 15;
    }

    // Contract value at risk
    if (trigger.contractValue !== undefined) {
      if (trigger.contractValue > 100_000_000) score += 15;
      else if (trigger.contractValue > 50_000_000) score += 10;
      else if (trigger.contractValue > 10_000_000) score += 5;
    }

    // Going concern flag
    if (trigger.isGoingConcern) {
      score += 20;
    }

    return Math.min(score, 100);
  }

  // ─── Citizen Assignment ────────────────────────────────────────────────

  assignCitizens(rescueType: RescueType): string[] {
    return CITIZEN_ASSIGNMENTS[rescueType] ?? ["SENTINEL-0"];
  }

  // ─── Urgency Classification ────────────────────────────────────────────

  private classifyUrgency(score: number): RescueUrgency {
    if (score >= 80) return "CRITICAL";
    if (score >= 60) return "HIGH";
    if (score >= 40) return "ELEVATED";
    return "STANDARD";
  }

  // ─── Estimated Cost ───────────────────────────────────────────────────

  private estimateCost(rescueType: RescueType, urgency: RescueUrgency): string {
    const baseCosts: Record<RescueType, string> = {
      SBA_REINSTATEMENT_BRIEF: "$15,000 - $35,000",
      CMMC_SYSTEM_SECURITY_PLAN: "$25,000 - $75,000",
      SINGLE_AUDIT_CORRECTIVE_ACTION: "$10,000 - $25,000",
      HIPAA_BREACH_RESPONSE_PLAN: "$20,000 - $50,000",
      MATERIAL_WEAKNESS_REMEDIATION: "$30,000 - $80,000",
      FAR_COMPLIANCE_REMAP: "$15,000 - $40,000",
      CARES_ACT_RECONSTRUCTION: "$20,000 - $60,000",
      OCC_CONSENT_ORDER_RESPONSE: "$50,000 - $150,000",
    };

    const cost = baseCosts[rescueType] ?? "$10,000 - $50,000";
    if (urgency === "CRITICAL") return cost + " (expedited surcharge applies)";
    return cost;
  }

  // ─── Deliverable Generation ────────────────────────────────────────────

  generateDeliverables(rescueType: RescueType, entityData: { entityName: string; entityId: string }): RescueDeliverable[] {
    const now = new Date();
    const deadline30 = new Date(now.getTime() + 30 * 86400000).toISOString();
    const deadline60 = new Date(now.getTime() + 60 * 86400000).toISOString();
    const deadline90 = new Date(now.getTime() + 90 * 86400000).toISOString();

    const deliverableMap: Record<RescueType, RescueDeliverable[]> = {
      SBA_REINSTATEMENT_BRIEF: [
        {
          id: generateId("DEL"),
          title: "Statement of Eligibility",
          description: "Legal brief for OHA demonstrating continued 8(a) eligibility under 13 CFR 124",
          category: "LEGAL_BRIEF",
          status: "PENDING",
          assignedCitizen: "LEXARC",
          content: this.generateSBAEligibilityContent(entityData.entityName),
          templateSections: [
            "I. Procedural History",
            "II. Statement of Facts",
            "III. Legal Standard — 13 CFR 124.112",
            "IV. Argument: Continued Eligibility",
            "V. Economic Disadvantage Analysis",
            "VI. Good Character Determination",
            "VII. Conclusion & Prayer for Relief",
          ],
          requiredInputs: ["Articles of incorporation", "Operating agreement", "Owner personal financial statement", "SBA Form 1010"],
          deadline: deadline30,
        },
        {
          id: generateId("DEL"),
          title: "Financial Reconstruction Package",
          description: "GL reconciliation, bank reconciliations, and Form 4506-T verification for SBA review",
          category: "FINANCIAL_RECONSTRUCTION",
          status: "PENDING",
          assignedCitizen: "FISCARA",
          content: this.generateFinancialReconContent(entityData.entityName),
          templateSections: [
            "I. General Ledger Reconciliation",
            "II. Bank Reconciliation Summary",
            "III. IRS Form 4506-T Transcript Analysis",
            "IV. Revenue Recognition Verification",
            "V. Cost Allocation Methodology",
            "VI. Intercompany Transaction Audit",
          ],
          requiredInputs: ["3 years federal tax returns", "12 months bank statements", "General ledger export", "IRS Form 4506-T authorization"],
          deadline: deadline30,
        },
        {
          id: generateId("DEL"),
          title: "Economic Disadvantage Certification",
          description: "Net worth calculation, asset disclosure, and 3-year tax analysis per 13 CFR 124.104",
          category: "COMPLIANCE_PLAN",
          status: "PENDING",
          assignedCitizen: "CLARIDEX",
          content: `# Economic Disadvantage Certification\n## Entity: [ENTITY_NAME]\n## Prepared for: SBA Office of Hearings and Appeals\n\n### I. Net Worth Calculation\nPursuant to 13 CFR 124.104(c), the adjusted net worth of [ENTITY_NAME]'s disadvantaged owner(s) must not exceed $850,000 (excluding equity in primary residence and business).\n\n**Current Adjusted Net Worth:** $[AMOUNT]\n\n### II. Asset Disclosure\n- Primary Residence: $[VALUE] (excluded per 13 CFR 124.104(c)(2))\n- Business Equity: $[VALUE] (excluded per regulation)\n- Retirement Accounts: $[VALUE]\n- Other Assets: $[VALUE]\n\n### III. Three-Year Income Analysis\n| Tax Year | AGI | Business Income | Total Compensation |\n|----------|-----|-----------------|--------------------|\n| [YEAR-1] | $[AMOUNT] | $[AMOUNT] | $[AMOUNT] |\n| [YEAR-2] | $[AMOUNT] | $[AMOUNT] | $[AMOUNT] |\n| [YEAR-3] | $[AMOUNT] | $[AMOUNT] | $[AMOUNT] |\n\n### IV. Certification\nI certify under penalty of perjury that the information provided herein is true and correct to the best of my knowledge.`,
          templateSections: [
            "I. Net Worth Calculation",
            "II. Asset Disclosure",
            "III. Three-Year Income Analysis",
            "IV. Certification Under Penalty of Perjury",
          ],
          requiredInputs: ["Personal financial statement (SBA Form 413)", "3 years personal tax returns", "Asset valuations", "Retirement account statements"],
          deadline: deadline30,
        },
        {
          id: generateId("DEL"),
          title: "Performance Capability Statement",
          description: "Contract history, completion records, and workforce documentation demonstrating ongoing capability",
          category: "GOVERNANCE_DOCUMENT",
          status: "PENDING",
          assignedCitizen: "INTEGRA",
          content: `# Performance Capability Statement\n## Entity: [ENTITY_NAME]\n## UEI: [UEI]\n\n### I. Contract Performance History\n| Contract # | Agency | Value | Period | Status |\n|-----------|--------|-------|--------|--------|\n| [CONTRACT] | [AGENCY] | $[VALUE] | [DATES] | [STATUS] |\n\n### II. Past Performance Ratings\n- CPARS Average Rating: [RATING]\n- On-Time Delivery Rate: [PERCENT]%\n- Quality Acceptance Rate: [PERCENT]%\n\n### III. Workforce Documentation\n- Total Employees: [COUNT]\n- Key Personnel: [LIST]\n- Professional Certifications: [LIST]\n\n### IV. Facility & Equipment\n- Primary Office: [ADDRESS]\n- Equipment Assets: [LIST]\n- Technology Infrastructure: [DESCRIPTION]`,
          templateSections: [
            "I. Contract Performance History",
            "II. Past Performance Ratings (CPARS)",
            "III. Workforce Documentation",
            "IV. Facility & Equipment Inventory",
          ],
          requiredInputs: ["CPARS login credentials or reports", "Active contract list", "Employee roster", "Equipment inventory"],
          deadline: deadline60,
        },
        {
          id: generateId("DEL"),
          title: "Corrective Action Plan",
          description: "Forward-looking remediation plan addressing the specific grounds for suspension",
          category: "COMPLIANCE_PLAN",
          status: "PENDING",
          assignedCitizen: "INTEGRA",
          content: `# Corrective Action Plan\n## Entity: [ENTITY_NAME]\n## In Response to: SBA Suspension Notice dated [DATE]\n\n### I. Acknowledgment of Findings\n[ENTITY_NAME] acknowledges the following findings identified by the SBA:\n- [FINDING_1]\n- [FINDING_2]\n\n### II. Root Cause Analysis\n[DESCRIPTION]\n\n### III. Corrective Actions\n| Action Item | Responsible Party | Target Date | Status |\n|------------|-------------------|-------------|--------|\n| [ACTION] | [PERSON] | [DATE] | Planned |\n\n### IV. Monitoring & Reporting\n- Monthly compliance reports to SBA district office\n- Quarterly financial statement submissions\n- Annual re-certification package\n\n### V. Management Commitment\n[ENTITY_NAME]'s management commits to full compliance with all 8(a) program requirements going forward.`,
          templateSections: [
            "I. Acknowledgment of Findings",
            "II. Root Cause Analysis",
            "III. Corrective Actions with Timeline",
            "IV. Monitoring & Reporting Framework",
            "V. Management Commitment Statement",
          ],
          requiredInputs: ["SBA suspension notice", "Prior compliance correspondence", "Management org chart"],
          deadline: deadline30,
        },
      ],

      CMMC_SYSTEM_SECURITY_PLAN: [
        {
          id: generateId("DEL"),
          title: "System Security Plan (SSP)",
          description: "Complete SSP per NIST SP 800-171 Rev 2 mapping all 110 security controls",
          category: "TECHNICAL_ARTIFACT",
          status: "PENDING",
          assignedCitizen: "PRIVAXIS",
          content: `# System Security Plan (SSP)\n## Entity: [ENTITY_NAME]\n## CAGE Code: [CAGE]\n## Prepared per: NIST SP 800-171 Rev 2\n\n### 1. System Identification\n- System Name: [SYSTEM_NAME]\n- System Owner: [OWNER]\n- Authorizing Official: [OFFICIAL]\n\n### 2. System Description\n[DESCRIPTION]\n\n### 3. System Boundary\n[BOUNDARY_DESCRIPTION]\n\n### 4. Security Control Implementation\n#### 3.1 Access Control (AC)\n- 3.1.1: Limit system access to authorized users — [IMPLEMENTATION]\n- 3.1.2: Limit system access to authorized functions — [IMPLEMENTATION]\n[... all 110 controls mapped ...]\n\n### 5. CUI Categorization\n- CUI Categories Handled: [CATEGORIES]\n- CUI Markings Applied: [MARKINGS]\n\n### 6. Interconnections\n| System | Organization | Type | Authorization |\n|--------|-------------|------|---------------|\n| [SYSTEM] | [ORG] | [TYPE] | [AUTH_DATE] |`,
          templateSections: [
            "1. System Identification",
            "2. System Description & Purpose",
            "3. System Boundary Definition",
            "4. Security Control Implementation (110 Controls)",
            "5. CUI Categorization & Handling",
            "6. System Interconnections",
            "7. Ports, Protocols & Services",
            "8. Hardware & Software Inventory",
          ],
          requiredInputs: ["Network diagram", "Hardware/software inventory", "CAGE code", "Current security policies", "CUI handling procedures"],
          deadline: deadline60,
        },
        {
          id: generateId("DEL"),
          title: "Plan of Action & Milestones (POA&M)",
          description: "Gap remediation timeline for all unmet NIST 800-171 controls",
          category: "COMPLIANCE_PLAN",
          status: "PENDING",
          assignedCitizen: "VIGILUS",
          content: `# Plan of Action & Milestones (POA&M)\n## Entity: [ENTITY_NAME]\n\n### Summary\n- Total Controls: 110\n- Controls Met: [MET]\n- Controls Partially Met: [PARTIAL]\n- Controls Not Met: [NOT_MET]\n- SPRS Score: [SCORE] / 110\n\n### Remediation Items\n| ID | Control | Gap Description | Milestone | Target Date | Resources | Risk |\n|----|---------|----------------|-----------|-------------|-----------|------|\n| POA-001 | 3.1.1 | [GAP] | [MILESTONE] | [DATE] | $[COST] | [HIGH/MED/LOW] |\n\n### Resource Requirements\n- Estimated Total Cost: $[TOTAL]\n- Personnel Required: [COUNT]\n- Timeline: [MONTHS] months`,
          templateSections: [
            "I. Control Assessment Summary",
            "II. SPRS Score Calculation",
            "III. Remediation Items (per control)",
            "IV. Milestone Timeline",
            "V. Resource Requirements",
            "VI. Risk Acceptance Decisions",
          ],
          requiredInputs: ["Current SPRS score", "Self-assessment results", "IT budget allocation", "Staffing plan"],
          deadline: deadline60,
        },
        {
          id: generateId("DEL"),
          title: "CUI Data Flow Diagram",
          description: "Documentation of where Controlled Unclassified Information lives, moves, and is processed",
          category: "TECHNICAL_ARTIFACT",
          status: "PENDING",
          assignedCitizen: "PRIVAXIS",
          content: `# CUI Data Flow Diagram\n## Entity: [ENTITY_NAME]\n\n### CUI Sources\n- [SOURCE_1]: [DESCRIPTION]\n- [SOURCE_2]: [DESCRIPTION]\n\n### CUI Processing Points\n| System | Location | CUI Category | Encryption | Access Control |\n|--------|----------|-------------|------------|----------------|\n| [SYSTEM] | [LOCATION] | [CATEGORY] | [YES/NO] | [METHOD] |\n\n### CUI Transit Paths\n- Inbound: [PATH_DESCRIPTION]\n- Internal: [PATH_DESCRIPTION]\n- Outbound: [PATH_DESCRIPTION]\n\n### CUI Storage\n- At Rest: [ENCRYPTION_METHOD]\n- Backup: [BACKUP_METHOD]\n- Retention: [PERIOD]\n- Destruction: [METHOD]`,
          templateSections: [
            "I. CUI Sources & Categories",
            "II. Processing Points",
            "III. Transit Paths (Inbound/Internal/Outbound)",
            "IV. Storage & Encryption",
            "V. Backup & Recovery",
            "VI. Retention & Destruction",
          ],
          requiredInputs: ["Network diagram", "Data classification inventory", "Encryption certificates", "Backup procedures"],
          deadline: deadline60,
        },
        {
          id: generateId("DEL"),
          title: "Incident Response Plan",
          description: "Cyber incident response plan per CMMC Level 2 / NIST 800-171 IR controls",
          category: "GOVERNANCE_DOCUMENT",
          status: "PENDING",
          assignedCitizen: "VIGILUS",
          content: `# Incident Response Plan\n## Entity: [ENTITY_NAME]\n## Version: 1.0\n## Effective: [DATE]\n\n### 1. Purpose & Scope\nThis plan establishes procedures for detecting, reporting, and responding to cybersecurity incidents affecting CUI per DFARS 252.204-7012.\n\n### 2. Incident Categories\n- Category 1: Root-level compromise\n- Category 2: User-level compromise\n- Category 3: Malware infection\n- Category 4: DoS/DDoS\n- Category 5: Unauthorized CUI access\n\n### 3. Reporting Requirements\n- DIBNet reporting: 72 hours from discovery\n- Preserve forensic images for 90 days\n- Provide damage assessment to DC3\n\n### 4. Response Team\n| Role | Name | Contact | Alternate |\n|------|------|---------|----------|\n| Incident Commander | [NAME] | [CONTACT] | [ALT] |`,
          templateSections: [
            "1. Purpose & Scope",
            "2. Incident Categories & Severity",
            "3. DFARS 252.204-7012 Reporting Requirements",
            "4. Response Team & Roles",
            "5. Detection & Analysis Procedures",
            "6. Containment & Eradication",
            "7. Recovery & Post-Incident",
            "8. Testing & Training Schedule",
          ],
          requiredInputs: ["IT staff contact list", "Network monitoring tools inventory", "Current security policies", "DIBNet registration"],
          deadline: deadline90,
        },
        {
          id: generateId("DEL"),
          title: "Security Assessment Report",
          description: "Pre-assessment findings documenting current security posture against CMMC Level 2",
          category: "TECHNICAL_ARTIFACT",
          status: "PENDING",
          assignedCitizen: "SYNTARA",
          content: `# Security Assessment Report\n## Entity: [ENTITY_NAME]\n## Assessment Date: [DATE]\n## Assessor: Vernen Legal Compliance (Pre-Assessment)\n\n### Executive Summary\n[ENTITY_NAME] was assessed against CMMC Level 2 requirements (110 NIST 800-171 controls). This pre-assessment identifies gaps prior to formal C3PAO assessment.\n\n### Overall Readiness: [PERCENT]%\n\n### Domain Summary\n| Domain | Controls | Met | Partial | Not Met |\n|--------|----------|-----|---------|--------|\n| Access Control | 22 | [N] | [N] | [N] |\n| Awareness & Training | 3 | [N] | [N] | [N] |\n| Audit & Accountability | 9 | [N] | [N] | [N] |\n[... all 14 domains ...]\n\n### Critical Findings\n1. [FINDING]\n2. [FINDING]`,
          templateSections: [
            "I. Executive Summary",
            "II. Assessment Methodology",
            "III. Domain-by-Domain Results",
            "IV. Critical Findings",
            "V. Recommendations",
            "VI. Readiness Score & Timeline to Certification",
          ],
          requiredInputs: ["Existing security documentation", "IT infrastructure details", "Policy documents", "Previous assessment results"],
          deadline: deadline30,
        },
      ],

      SINGLE_AUDIT_CORRECTIVE_ACTION: [
        {
          id: generateId("DEL"),
          title: "Corrective Action Plan (CAP)",
          description: "Formal response to single audit findings per 2 CFR 200.511(c) with remediation timeline",
          category: "COMPLIANCE_PLAN",
          status: "PENDING",
          assignedCitizen: "REGULIS",
          content: `# Corrective Action Plan\n## Entity: [ENTITY_NAME]\n## EIN: [EIN]\n## Audit Year: [YEAR]\n## Prepared per: 2 CFR 200.511(c)\n\n### I. Summary of Findings\n| Ref # | Type | Federal Program | Amount |\n|-------|------|----------------|--------|\n| [REF] | Material Weakness | [PROGRAM] | $[AMOUNT] |\n\n### II. Corrective Actions\n| Finding | Root Cause | Corrective Action | Responsible Party | Target Date |\n|---------|-----------|-------------------|-------------------|-------------|\n| [REF] | [CAUSE] | [ACTION] | [PERSON] | [DATE] |\n\n### III. Implementation Timeline\n[GANTT_DESCRIPTION]\n\n### IV. Management Response\n[ENTITY_NAME] management acknowledges these findings and commits to full remediation within the specified timeline.`,
          templateSections: [
            "I. Summary of Audit Findings",
            "II. Corrective Actions per Finding",
            "III. Implementation Timeline",
            "IV. Management Response & Commitment",
            "V. Monitoring Procedures",
            "VI. Reporting Schedule to Federal Cognizant Agency",
          ],
          requiredInputs: ["Single audit report", "Management letter", "Prior year findings", "Organizational chart"],
          deadline: deadline30,
        },
        {
          id: generateId("DEL"),
          title: "Internal Control Assessment",
          description: "Evaluation of internal controls over federal awards per 2 CFR 200.303",
          category: "COMPLIANCE_PLAN",
          status: "PENDING",
          assignedCitizen: "CLARIDEX",
          content: `# Internal Control Assessment\n## Entity: [ENTITY_NAME]\n## Assessment per: 2 CFR 200.303\n\n### Control Environment\n- Tone at the top: [ASSESSMENT]\n- Code of conduct: [EXISTS/MISSING]\n- Board oversight: [ASSESSMENT]\n\n### Risk Assessment\n- Federal award risk identification: [ASSESSMENT]\n- Fraud risk factors: [ASSESSMENT]\n\n### Control Activities\n| Control Area | Current State | Gap | Remediation |\n|-------------|--------------|-----|-------------|\n| Segregation of duties | [STATE] | [GAP] | [ACTION] |`,
          templateSections: [
            "I. Control Environment",
            "II. Risk Assessment",
            "III. Control Activities",
            "IV. Information & Communication",
            "V. Monitoring Activities",
            "VI. Gap Remediation Plan",
          ],
          requiredInputs: ["Organizational chart", "Policies & procedures manual", "Prior audit workpapers", "Board meeting minutes"],
          deadline: deadline60,
        },
        {
          id: generateId("DEL"),
          title: "Questioned Costs Response",
          description: "Formal response to questioned costs with supporting documentation strategy",
          category: "FINANCIAL_RECONSTRUCTION",
          status: "PENDING",
          assignedCitizen: "CLARIDEX",
          content: `# Questioned Costs Response\n## Entity: [ENTITY_NAME]\n\n### Summary of Questioned Costs\n| Finding | Program | Amount Questioned | Status |\n|---------|---------|-------------------|--------|\n| [REF] | [PROGRAM] | $[AMOUNT] | Under Review |\n\n### Response Strategy\nFor each questioned cost, we provide:\n1. Documentation proving allowability under applicable cost principles\n2. Evidence of allocation methodology\n3. Supporting invoices and receipts\n4. Written justification`,
          templateSections: [
            "I. Summary of Questioned Costs",
            "II. Cost Allowability Analysis",
            "III. Supporting Documentation Index",
            "IV. Allocation Methodology Defense",
            "V. Repayment Plan (if required)",
          ],
          requiredInputs: ["Audit findings detail", "Invoices and receipts for questioned items", "Cost allocation plan", "Grant agreements"],
          deadline: deadline30,
        },
        {
          id: generateId("DEL"),
          title: "Federal Award Administration Manual",
          description: "Updated policies and procedures for federal award management going forward",
          category: "GOVERNANCE_DOCUMENT",
          status: "PENDING",
          assignedCitizen: "INTEGRA",
          content: `# Federal Award Administration Manual\n## Entity: [ENTITY_NAME]\n## Effective Date: [DATE]\n\n### Purpose\nThis manual establishes policies and procedures for the administration of federal awards in compliance with 2 CFR 200 (Uniform Guidance).\n\n### Sections\n1. Award Acceptance & Setup\n2. Financial Management\n3. Procurement Standards\n4. Property Management\n5. Personnel & Time Distribution\n6. Travel & Per Diem\n7. Subrecipient Monitoring\n8. Reporting Requirements\n9. Record Retention\n10. Close-out Procedures`,
          templateSections: [
            "1. Award Acceptance & Setup",
            "2. Financial Management Standards",
            "3. Procurement Standards (2 CFR 200.317-327)",
            "4. Property Management",
            "5. Personnel & Time Distribution",
            "6. Subrecipient Monitoring",
            "7. Reporting & Close-out",
          ],
          requiredInputs: ["Current policies manual", "Federal award agreements", "Procurement procedures", "Financial system documentation"],
          deadline: deadline90,
        },
      ],

      HIPAA_BREACH_RESPONSE_PLAN: [
        {
          id: generateId("DEL"),
          title: "Breach Notification Package",
          description: "Individual, media, and HHS notifications per 45 CFR 164.404-408 (Breach Notification Rule)",
          category: "LEGAL_BRIEF",
          status: "PENDING",
          assignedCitizen: "PRIVAXIS",
          content: `# HIPAA Breach Notification Package\n## Covered Entity: [ENTITY_NAME]\n## Breach Discovery Date: [DATE]\n## Notification Deadline: [DATE + 60 days]\n\n### I. Individual Notification (45 CFR 164.404)\nDear [INDIVIDUAL_NAME],\n\nWe are writing to inform you of a breach of your protected health information (PHI) that occurred on [DATE].\n\n**What Happened:** [DESCRIPTION]\n**What Information Was Involved:** [PHI_TYPES]\n**What We Are Doing:** [ACTIONS]\n**What You Can Do:** [STEPS]\n\n### II. Media Notification (45 CFR 164.406)\n[Required if breach affects 500+ residents of a state/jurisdiction]\n\n### III. HHS Notification (45 CFR 164.408)\n- Submission via HHS Breach Portal\n- Number of individuals affected: [COUNT]\n- Type of breach: [TYPE]\n- PHI involved: [CATEGORIES]`,
          templateSections: [
            "I. Individual Notification Letter",
            "II. Media Notification (500+ individuals)",
            "III. HHS OCR Breach Portal Submission",
            "IV. State Attorney General Notifications",
            "V. Business Associate Notifications",
            "VI. Documentation of Notification Efforts",
          ],
          requiredInputs: ["Breach discovery date", "Number of affected individuals", "Types of PHI involved", "Breach description", "State residency of affected individuals"],
          deadline: deadline30,
        },
        {
          id: generateId("DEL"),
          title: "Root Cause Analysis",
          description: "Technical forensic report identifying breach vector, scope, and containment measures",
          category: "TECHNICAL_ARTIFACT",
          status: "PENDING",
          assignedCitizen: "VIGILUS",
          content: `# Root Cause Analysis — HIPAA Breach\n## Entity: [ENTITY_NAME]\n## Incident Reference: [REF]\n\n### I. Timeline of Events\n| Date/Time | Event | Source |\n|-----------|-------|--------|\n| [DATETIME] | [EVENT] | [LOG/SYSTEM] |\n\n### II. Attack Vector\n- Initial access: [METHOD]\n- Lateral movement: [DESCRIPTION]\n- Data exfiltration: [METHOD]\n\n### III. Scope of Compromise\n- Systems affected: [COUNT]\n- Records accessed: [COUNT]\n- PHI categories: [LIST]\n\n### IV. Containment Actions\n- [ACTION_1]: [DATE]\n- [ACTION_2]: [DATE]`,
          templateSections: [
            "I. Incident Timeline",
            "II. Attack Vector Analysis",
            "III. Scope of Compromise",
            "IV. Containment Actions Taken",
            "V. Evidence Preservation",
            "VI. Indicators of Compromise (IOCs)",
          ],
          requiredInputs: ["System logs", "Network traffic captures", "Endpoint detection alerts", "Access logs", "Firewall logs"],
          deadline: deadline30,
        },
        {
          id: generateId("DEL"),
          title: "Corrective Action Plan",
          description: "Technical and administrative safeguard remediation per 45 CFR 164.306",
          category: "COMPLIANCE_PLAN",
          status: "PENDING",
          assignedCitizen: "PRIVAXIS",
          content: `# HIPAA Corrective Action Plan\n## Entity: [ENTITY_NAME]\n\n### Administrative Safeguards (45 CFR 164.308)\n| Standard | Current State | Gap | Remediation | Target Date |\n|----------|--------------|-----|-------------|-------------|\n| Security Officer | [STATE] | [GAP] | [ACTION] | [DATE] |\n| Risk Analysis | [STATE] | [GAP] | [ACTION] | [DATE] |\n\n### Physical Safeguards (45 CFR 164.310)\n[TABLE]\n\n### Technical Safeguards (45 CFR 164.312)\n[TABLE]`,
          templateSections: [
            "I. Administrative Safeguard Remediation",
            "II. Physical Safeguard Remediation",
            "III. Technical Safeguard Remediation",
            "IV. Policy & Procedure Updates",
            "V. Implementation Timeline",
            "VI. Ongoing Monitoring Plan",
          ],
          requiredInputs: ["Current HIPAA policies", "Most recent risk assessment", "IT infrastructure diagram", "Workforce roster"],
          deadline: deadline60,
        },
        {
          id: generateId("DEL"),
          title: "Risk Assessment Update",
          description: "Updated enterprise-wide risk assessment per NIST Cybersecurity Framework",
          category: "TECHNICAL_ARTIFACT",
          status: "PENDING",
          assignedCitizen: "VIGILUS",
          content: `# Updated Risk Assessment\n## Entity: [ENTITY_NAME]\n## Framework: NIST Cybersecurity Framework + HIPAA Security Rule\n\n### Risk Register\n| ID | Risk | Likelihood | Impact | Risk Level | Mitigation |\n|----|------|-----------|--------|-----------|------------|\n| R-001 | [RISK] | [H/M/L] | [H/M/L] | [SCORE] | [ACTION] |`,
          templateSections: [
            "I. Assessment Methodology",
            "II. Asset Inventory",
            "III. Threat Analysis",
            "IV. Vulnerability Assessment",
            "V. Risk Register",
            "VI. Risk Treatment Plan",
            "VII. Residual Risk Acceptance",
          ],
          requiredInputs: ["Previous risk assessment", "Asset inventory", "Vulnerability scan results", "Threat intelligence feeds"],
          deadline: deadline60,
        },
        {
          id: generateId("DEL"),
          title: "Workforce Training Plan",
          description: "HIPAA privacy and security training curriculum and schedule for all workforce members",
          category: "GOVERNANCE_DOCUMENT",
          status: "PENDING",
          assignedCitizen: "ETHICARA",
          content: `# HIPAA Workforce Training Plan\n## Entity: [ENTITY_NAME]\n\n### Training Requirements\n- All new workforce members: within 30 days of hire\n- Annual refresher: all workforce members\n- Role-specific: IT staff, management, clinical staff\n- Post-incident: all affected departments\n\n### Curriculum\n1. HIPAA Privacy Rule Overview\n2. HIPAA Security Rule Overview\n3. PHI Identification & Handling\n4. Breach Notification Procedures\n5. Social Engineering Awareness\n6. Password & Access Management\n7. Mobile Device Security\n8. Incident Reporting Procedures`,
          templateSections: [
            "I. Training Requirements & Schedule",
            "II. Core Curriculum Modules",
            "III. Role-Specific Training Tracks",
            "IV. Post-Incident Training Protocol",
            "V. Training Documentation & Records",
            "VI. Effectiveness Evaluation",
          ],
          requiredInputs: ["Workforce roster with roles", "Current training records", "Incident history", "Department structure"],
          deadline: deadline90,
        },
      ],

      MATERIAL_WEAKNESS_REMEDIATION: [
        {
          id: generateId("DEL"),
          title: "Material Weakness Remediation Plan",
          description: "SEC-ready remediation plan addressing identified material weaknesses in ICFR",
          category: "COMPLIANCE_PLAN",
          status: "PENDING",
          assignedCitizen: "CLARIDEX",
          content: `# Material Weakness Remediation Plan\n## Entity: [ENTITY_NAME]\n## CIK: [CIK]\n## Filing Reference: 8-K dated [DATE]\n\n### I. Material Weakness Summary\n[DESCRIPTION of material weakness as disclosed in SEC filing]\n\n### II. Root Cause Analysis\n[ANALYSIS]\n\n### III. Remediation Steps\n| Step | Action | Owner | Target Date | Status |\n|------|--------|-------|-------------|--------|\n| 1 | [ACTION] | [OWNER] | [DATE] | Planned |`,
          templateSections: [
            "I. Material Weakness Description",
            "II. Root Cause Analysis",
            "III. Remediation Steps & Timeline",
            "IV. Enhanced Controls Design",
            "V. Testing Plan for Remediated Controls",
            "VI. Management Assertion Timeline",
          ],
          requiredInputs: ["SEC filing with MW disclosure", "Internal audit workpapers", "ICFR documentation", "Management assessment"],
          deadline: deadline60,
        },
        {
          id: generateId("DEL"),
          title: "Restated Financial Statements",
          description: "Restatement package with reconciliation of prior-period errors",
          category: "FINANCIAL_RECONSTRUCTION",
          status: "PENDING",
          assignedCitizen: "FISCARA",
          content: `# Financial Restatement Package\n## Entity: [ENTITY_NAME]\n\n### I. Nature of Restatement\n[DESCRIPTION]\n\n### II. Impact Analysis\n| Line Item | As Reported | As Restated | Difference |\n|-----------|------------|-------------|------------|\n| [ITEM] | $[AMOUNT] | $[AMOUNT] | $[AMOUNT] |`,
          templateSections: [
            "I. Nature & Scope of Restatement",
            "II. Financial Impact Analysis",
            "III. Period-by-Period Reconciliation",
            "IV. Tax Impact Assessment",
            "V. Updated MD&A Language",
            "VI. Auditor Communication",
          ],
          requiredInputs: ["Original financial statements", "Error identification workpapers", "Tax provisions", "Auditor communications"],
          deadline: deadline30,
        },
        {
          id: generateId("DEL"),
          title: "ICFR Enhancement Documentation",
          description: "Redesigned internal controls over financial reporting with testing protocols",
          category: "GOVERNANCE_DOCUMENT",
          status: "PENDING",
          assignedCitizen: "INTEGRA",
          content: `# ICFR Enhancement Documentation\n## Entity: [ENTITY_NAME]\n\n### Enhanced Control Matrix\n| Process | Risk | Control | Type | Frequency | Owner |\n|---------|------|---------|------|-----------|-------|\n| [PROCESS] | [RISK] | [CONTROL] | [P/D] | [FREQ] | [OWNER] |`,
          templateSections: [
            "I. Control Environment Enhancements",
            "II. Risk Assessment Updates",
            "III. Redesigned Control Activities",
            "IV. IT General Controls",
            "V. Monitoring & Testing Protocols",
            "VI. SOX 302/404 Certification Timeline",
          ],
          requiredInputs: ["Current control documentation", "Risk assessment", "IT general controls", "SOX compliance calendar"],
          deadline: deadline90,
        },
        {
          id: generateId("DEL"),
          title: "Audit Committee Communication",
          description: "Board-ready presentation on remediation progress per SOX requirements",
          category: "GOVERNANCE_DOCUMENT",
          status: "PENDING",
          assignedCitizen: "CLARIDEX",
          content: `# Audit Committee Update — Material Weakness Remediation\n## Entity: [ENTITY_NAME]\n## Date: [DATE]\n\n### Executive Summary\n[SUMMARY]\n\n### Remediation Status\n- Overall Progress: [PERCENT]%\n- Controls Redesigned: [COUNT]\n- Controls Tested: [COUNT]\n- Target Remediation Date: [DATE]`,
          templateSections: [
            "I. Executive Summary",
            "II. Remediation Status Dashboard",
            "III. Key Milestones Achieved",
            "IV. Remaining Actions",
            "V. External Auditor Feedback",
            "VI. Updated Timeline",
          ],
          requiredInputs: ["Board meeting schedule", "External auditor interim feedback", "Remediation progress reports"],
          deadline: deadline30,
        },
      ],

      FAR_COMPLIANCE_REMAP: [
        {
          id: generateId("DEL"),
          title: "FAR Compliance Gap Analysis",
          description: "Mapping of affected FAR/DFARS clauses to current contract portfolio",
          category: "COMPLIANCE_PLAN",
          status: "PENDING",
          assignedCitizen: "REGULIS",
          content: `# FAR Compliance Gap Analysis\n## Entity: [ENTITY_NAME]\n## Triggered by: Federal Register Notice [FR_DOC_NUMBER]\n\n### I. Regulatory Change Summary\n[DESCRIPTION of FAR/DFARS change]\n\n### II. Affected Contracts\n| Contract # | Agency | FAR Clause | Impact | Action Required |\n|-----------|--------|-----------|--------|----------------|\n| [CONTRACT] | [AGENCY] | [CLAUSE] | [IMPACT] | [ACTION] |`,
          templateSections: [
            "I. Regulatory Change Summary",
            "II. Affected Contract Portfolio",
            "III. Clause-by-Clause Impact Analysis",
            "IV. Compliance Gap Identification",
            "V. Remediation Action Items",
            "VI. Re-certification Requirements",
          ],
          requiredInputs: ["Federal Register notice", "Active contract list with FAR clauses", "Current compliance certifications"],
          deadline: deadline30,
        },
        {
          id: generateId("DEL"),
          title: "Contract Modification Requests",
          description: "Bilateral modification requests for affected contracts to incorporate new requirements",
          category: "LEGAL_BRIEF",
          status: "PENDING",
          assignedCitizen: "LEXARC",
          content: `# Contract Modification Request\n## Entity: [ENTITY_NAME]\n## Contract: [CONTRACT_NUMBER]\n\n### Modification Request\nPursuant to FAR 43.103, [ENTITY_NAME] requests modification to incorporate [NEW_CLAUSE] as required by [FR_NOTICE].`,
          templateSections: [
            "I. Modification Request Cover Letter",
            "II. Regulatory Basis for Modification",
            "III. Proposed Contract Language",
            "IV. Cost/Price Impact Analysis",
            "V. Implementation Timeline",
          ],
          requiredInputs: ["Current contract documents", "Contracting officer contact", "Cost impact estimates"],
          deadline: deadline60,
        },
        {
          id: generateId("DEL"),
          title: "Updated Compliance Certifications",
          description: "Re-certified representations and certifications per updated FAR requirements",
          category: "COMPLIANCE_PLAN",
          status: "PENDING",
          assignedCitizen: "INTEGRA",
          content: `# Updated Compliance Certifications\n## Entity: [ENTITY_NAME]\n## SAM UEI: [UEI]\n\n### Certifications Requiring Update\n| Certification | FAR Reference | Current Status | Action |\n|--------------|---------------|---------------|--------|\n| [CERT] | [FAR_REF] | [STATUS] | [ACTION] |`,
          templateSections: [
            "I. Certifications Requiring Update",
            "II. SAM.gov Registration Updates",
            "III. ORCA/Reps & Certs Updates",
            "IV. Subcontractor Flow-Down Requirements",
          ],
          requiredInputs: ["SAM.gov login", "Current certifications", "Subcontractor list"],
          deadline: deadline30,
        },
      ],

      CARES_ACT_RECONSTRUCTION: [
        {
          id: generateId("DEL"),
          title: "PPP Loan Forgiveness Reconstruction",
          description: "Reconstructed documentation supporting PPP loan forgiveness application",
          category: "FINANCIAL_RECONSTRUCTION",
          status: "PENDING",
          assignedCitizen: "FISCARA",
          content: `# PPP Loan Forgiveness Reconstruction\n## Entity: [ENTITY_NAME]\n## PPP Loan #: [LOAN_NUMBER]\n## Amount: $[AMOUNT]\n\n### I. Covered Period Documentation\n- Covered Period: [START] to [END]\n- Payroll Costs: $[AMOUNT]\n- Rent/Lease: $[AMOUNT]\n- Utilities: $[AMOUNT]\n- Mortgage Interest: $[AMOUNT]\n\n### II. FTE Calculation\n| Pay Period | FTE Count | Reference Period FTE |\n|-----------|-----------|---------------------|\n| [PERIOD] | [COUNT] | [COUNT] |`,
          templateSections: [
            "I. Covered Period Expense Documentation",
            "II. FTE Calculation & Safe Harbor",
            "III. Payroll Cost Verification",
            "IV. Non-Payroll Cost Documentation",
            "V. Salary/Wage Reduction Analysis",
            "VI. SBA Form 3508 Preparation",
          ],
          requiredInputs: ["PPP loan documents", "Payroll records (covered period)", "Rent/lease agreements", "Utility bills", "IRS Form 941s"],
          deadline: deadline30,
        },
        {
          id: generateId("DEL"),
          title: "EIDL Compliance Documentation",
          description: "Documentation demonstrating proper use of EIDL funds per SBA requirements",
          category: "FINANCIAL_RECONSTRUCTION",
          status: "PENDING",
          assignedCitizen: "CLARIDEX",
          content: `# EIDL Compliance Documentation\n## Entity: [ENTITY_NAME]\n\n### Fund Usage Documentation\n| Date | Amount | Purpose | Category | Supporting Doc |\n|------|--------|---------|----------|---------------|\n| [DATE] | $[AMOUNT] | [PURPOSE] | [CAT] | [DOC_REF] |`,
          templateSections: [
            "I. Fund Usage Documentation",
            "II. Working Capital Allocation",
            "III. Prohibited Use Verification",
            "IV. Collateral Documentation",
            "V. Ongoing Compliance Obligations",
          ],
          requiredInputs: ["EIDL loan agreement", "Bank statements showing fund usage", "General ledger entries", "Business expense documentation"],
          deadline: deadline60,
        },
        {
          id: generateId("DEL"),
          title: "Inspector General Response",
          description: "Formal response to OIG or SBA inquiry regarding pandemic relief fund usage",
          category: "LEGAL_BRIEF",
          status: "PENDING",
          assignedCitizen: "INTEGRA",
          content: `# Response to Inspector General Inquiry\n## Entity: [ENTITY_NAME]\n## Reference: [INQUIRY_NUMBER]\n\n### I. Acknowledgment\n[ENTITY_NAME] acknowledges receipt of [AGENCY] inquiry dated [DATE].\n\n### II. Response to Specific Questions\n[RESPONSES]\n\n### III. Supporting Documentation Index\n[DOCUMENT_LIST]`,
          templateSections: [
            "I. Acknowledgment of Inquiry",
            "II. Point-by-Point Response",
            "III. Supporting Documentation Index",
            "IV. Attestation of Accuracy",
            "V. Request for Consideration",
          ],
          requiredInputs: ["OIG/SBA inquiry letter", "All supporting financial documents", "Correspondence history", "Legal counsel coordination"],
          deadline: deadline30,
        },
        {
          id: generateId("DEL"),
          title: "Repayment Plan",
          description: "Structured repayment proposal if forgiveness is denied or clawback initiated",
          category: "FINANCIAL_RECONSTRUCTION",
          status: "PENDING",
          assignedCitizen: "FISCARA",
          content: `# Structured Repayment Plan\n## Entity: [ENTITY_NAME]\n\n### I. Financial Capacity Analysis\n- Monthly Revenue: $[AMOUNT]\n- Monthly Expenses: $[AMOUNT]\n- Available for Repayment: $[AMOUNT]\n\n### II. Proposed Repayment Schedule\n| Month | Payment | Balance |\n|-------|---------|--------|\n| [MONTH] | $[AMOUNT] | $[AMOUNT] |`,
          templateSections: [
            "I. Financial Capacity Analysis",
            "II. Proposed Repayment Schedule",
            "III. Hardship Documentation",
            "IV. Offer in Compromise (if applicable)",
            "V. Compliance Commitments Going Forward",
          ],
          requiredInputs: ["Current financial statements", "Cash flow projections", "Outstanding debt schedule", "Hardship documentation"],
          deadline: deadline60,
        },
        {
          id: generateId("DEL"),
          title: "Compliance Remediation Program",
          description: "Forward-looking compliance program to prevent future pandemic relief issues",
          category: "GOVERNANCE_DOCUMENT",
          status: "PENDING",
          assignedCitizen: "ETHICARA",
          content: `# Compliance Remediation Program\n## Entity: [ENTITY_NAME]\n\n### Program Components\n1. Enhanced financial controls\n2. Documentation retention policy\n3. Periodic self-assessment\n4. Training program\n5. Whistleblower procedures`,
          templateSections: [
            "I. Enhanced Financial Controls",
            "II. Documentation & Retention Policy",
            "III. Self-Assessment Schedule",
            "IV. Training Program",
            "V. Whistleblower & Reporting Procedures",
          ],
          requiredInputs: ["Current compliance policies", "Training records", "Internal audit findings"],
          deadline: deadline90,
        },
      ],

      OCC_CONSENT_ORDER_RESPONSE: [
        {
          id: generateId("DEL"),
          title: "Consent Order Response Plan",
          description: "Comprehensive response to OCC consent order with remediation commitments",
          category: "LEGAL_BRIEF",
          status: "PENDING",
          assignedCitizen: "CLARIDEX",
          content: `# Consent Order Response Plan\n## Institution: [ENTITY_NAME]\n## OCC Charter #: [CHARTER]\n## Consent Order Date: [DATE]\n## Docket #: [DOCKET]\n\n### I. Order Summary\n[SUMMARY of consent order requirements]\n\n### II. Compliance Committee\n- Chair: [NAME]\n- Members: [NAMES]\n- Meeting Frequency: Monthly\n\n### III. Action Items\n| Order Provision | Required Action | Deadline | Responsible | Status |\n|----------------|----------------|----------|-------------|--------|\n| [PROVISION] | [ACTION] | [DATE] | [PERSON] | Planned |`,
          templateSections: [
            "I. Consent Order Summary",
            "II. Compliance Committee Charter",
            "III. Article-by-Article Response",
            "IV. Action Items & Timelines",
            "V. Progress Reporting Framework",
            "VI. Board Resolution",
          ],
          requiredInputs: ["Consent order document", "Board of directors roster", "Current compliance infrastructure", "Recent examination reports"],
          deadline: deadline30,
        },
        {
          id: generateId("DEL"),
          title: "BSA/AML Program Enhancement",
          description: "Enhanced Bank Secrecy Act/Anti-Money Laundering program per OCC requirements",
          category: "COMPLIANCE_PLAN",
          status: "PENDING",
          assignedCitizen: "PRIVAXIS",
          content: `# BSA/AML Program Enhancement\n## Institution: [ENTITY_NAME]\n\n### I. BSA Officer Designation\n- BSA Officer: [NAME]\n- Qualifications: [QUALS]\n\n### II. Risk Assessment\n| Risk Category | Current Rating | Target Rating | Actions |\n|--------------|---------------|---------------|--------|\n| Customer Risk | [RATING] | [RATING] | [ACTIONS] |`,
          templateSections: [
            "I. BSA Officer & Staffing",
            "II. BSA/AML Risk Assessment",
            "III. Customer Due Diligence (CDD) Enhancement",
            "IV. Suspicious Activity Monitoring",
            "V. SAR Filing Procedures",
            "VI. Independent Testing Plan",
          ],
          requiredInputs: ["Current BSA/AML program", "Transaction monitoring system details", "SAR filing history", "Examination findings"],
          deadline: deadline60,
        },
        {
          id: generateId("DEL"),
          title: "Capital Restoration Plan",
          description: "Plan to restore capital ratios if required by consent order",
          category: "FINANCIAL_RECONSTRUCTION",
          status: "PENDING",
          assignedCitizen: "VIGILUS",
          content: `# Capital Restoration Plan\n## Institution: [ENTITY_NAME]\n\n### Current Capital Position\n| Ratio | Current | Required | Gap |\n|-------|---------|----------|-----|\n| Tier 1 Leverage | [RATIO]% | [RATIO]% | [GAP]% |\n| CET1 | [RATIO]% | [RATIO]% | [GAP]% |\n| Total Capital | [RATIO]% | [RATIO]% | [GAP]% |`,
          templateSections: [
            "I. Current Capital Position",
            "II. Capital Restoration Strategy",
            "III. Earnings Retention Plan",
            "IV. Asset Reduction Strategy",
            "V. Capital Raise Options",
            "VI. Quarterly Milestone Targets",
          ],
          requiredInputs: ["Call report data", "Capital adequacy analysis", "Earnings projections", "Asset quality review"],
          deadline: deadline60,
        },
        {
          id: generateId("DEL"),
          title: "Board Governance Enhancement",
          description: "Enhanced board governance procedures including committee restructuring",
          category: "GOVERNANCE_DOCUMENT",
          status: "PENDING",
          assignedCitizen: "ETHICARA",
          content: `# Board Governance Enhancement Plan\n## Institution: [ENTITY_NAME]\n\n### I. Board Composition Review\n- Independent directors: [COUNT]/[TOTAL]\n- Committee assignments: [LIST]\n\n### II. Enhanced Oversight\n- Risk committee charter update\n- Compliance committee formation\n- Audit committee independence verification`,
          templateSections: [
            "I. Board Composition & Independence",
            "II. Committee Restructuring",
            "III. Enhanced Reporting Requirements",
            "IV. Director Training Requirements",
            "V. Management Information Systems",
            "VI. Succession Planning",
          ],
          requiredInputs: ["Board roster with backgrounds", "Current committee charters", "Bylaws", "Meeting minutes (last 12 months)"],
          deadline: deadline90,
        },
        {
          id: generateId("DEL"),
          title: "OCC Progress Reports",
          description: "Template and schedule for required progress reports to OCC examiner",
          category: "COMPLIANCE_PLAN",
          status: "PENDING",
          assignedCitizen: "CLARIDEX",
          content: `# OCC Progress Report Template\n## Institution: [ENTITY_NAME]\n## Report Period: [START] to [END]\n## Submission Date: [DATE]\n\n### I. Executive Summary\n[STATUS_OVERVIEW]\n\n### II. Article-by-Article Status\n| Article | Requirement | Status | Evidence |\n|---------|------------|--------|----------|\n| [ART] | [REQ] | [STATUS] | [EVIDENCE] |`,
          templateSections: [
            "I. Executive Summary",
            "II. Article-by-Article Compliance Status",
            "III. Key Metrics & Trends",
            "IV. Challenges & Mitigation",
            "V. Next Period Objectives",
            "VI. Appendices & Supporting Data",
          ],
          requiredInputs: ["Consent order articles", "Current compliance status", "Metrics data", "Remediation evidence"],
          deadline: deadline30,
        },
      ],
    };

    return deliverableMap[rescueType] ?? [];
  }

  // ─── Content Generators (Helpers) ──────────────────────────────────────

  private generateSBAEligibilityContent(entityName: string): string {
    return `# Statement of Eligibility — 8(a) Business Development Program
## Entity: ${entityName}
## Submitted to: SBA Office of Hearings and Appeals (OHA)
## Prepared by: Vernen Legal Compliance

### I. Procedural History
On [DATE], the U.S. Small Business Administration ("SBA") issued a notice of proposed termination/suspension from the 8(a) Business Development program to [ENTITY_NAME] (the "Appellant"). This Statement of Eligibility is submitted pursuant to 13 CFR 124.305 in support of Appellant's continued participation.

### II. Statement of Facts
[ENTITY_NAME] was admitted to the 8(a) program on [ADMISSION_DATE] with a program term ending [END_DATE]. The firm is a [BUSINESS_TYPE] organized under the laws of [STATE], with its principal office located at [ADDRESS].

The SBA's grounds for proposed action are:
- [GROUND_1]
- [GROUND_2]

### III. Legal Standard — 13 CFR 124.112
Under 13 CFR 124.112, a participant must continue to meet the eligibility requirements of 13 CFR 124.101-124.108. The burden of proof rests with the SBA to demonstrate by a preponderance of evidence that the participant no longer meets program requirements.

### IV. Argument: Continued Eligibility
A. Social Disadvantage (13 CFR 124.103)
[ARGUMENT]

B. Economic Disadvantage (13 CFR 124.104)
[ARGUMENT]

C. Ownership & Control (13 CFR 124.105-106)
[ARGUMENT]

### V. Economic Disadvantage Analysis
[DETAILED_ANALYSIS]

### VI. Good Character Determination
[ANALYSIS]

### VII. Conclusion & Prayer for Relief
For the foregoing reasons, [ENTITY_NAME] respectfully requests that OHA reverse the SBA's proposed termination/suspension and permit continued participation in the 8(a) Business Development program.

Respectfully submitted,
[SIGNATURE_BLOCK]`;
  }

  private generateFinancialReconContent(entityName: string): string {
    return `# Financial Reconstruction Package
## Entity: ${entityName}
## Prepared for: SBA District Office Review

### I. General Ledger Reconciliation
Period: [START_DATE] through [END_DATE]

| Account | GL Balance | Bank/Sub Balance | Variance | Explanation |
|---------|-----------|-----------------|----------|-------------|
| [ACCOUNT] | $[AMOUNT] | $[AMOUNT] | $[AMOUNT] | [EXPLANATION] |

### II. Bank Reconciliation Summary
| Bank Account | Statement Balance | Outstanding Deposits | Outstanding Checks | Adjusted Balance |
|-------------|------------------|---------------------|-------------------|-----------------|
| [ACCOUNT] | $[AMOUNT] | $[AMOUNT] | $[AMOUNT] | $[AMOUNT] |

### III. IRS Form 4506-T Transcript Analysis
| Tax Year | Filed Return AGI | IRS Transcript AGI | Variance | Notes |
|----------|-----------------|-------------------|----------|-------|
| [YEAR] | $[AMOUNT] | $[AMOUNT] | $[AMOUNT] | [NOTES] |

### IV. Revenue Recognition Verification
[ANALYSIS]

### V. Cost Allocation Methodology
[METHODOLOGY_DESCRIPTION]

### VI. Intercompany Transaction Audit
[AUDIT_RESULTS]`;
  }

  // ─── Timeline Builder ─────────────────────────────────────────────────

  buildTimeline(rescueType: RescueType, detectionDate: string): RescueTimeline {
    const detection = new Date(detectionDate);
    const addDays = (d: Date, days: number): string =>
      new Date(d.getTime() + days * 86400000).toISOString();

    const deadlines: Record<RescueType, { assessment: number; delivery: number; filing: number }> = {
      SBA_REINSTATEMENT_BRIEF: { assessment: 5, delivery: 25, filing: 45 },
      CMMC_SYSTEM_SECURITY_PLAN: { assessment: 10, delivery: 60, filing: 90 },
      SINGLE_AUDIT_CORRECTIVE_ACTION: { assessment: 7, delivery: 30, filing: 60 },
      HIPAA_BREACH_RESPONSE_PLAN: { assessment: 3, delivery: 30, filing: 60 },
      MATERIAL_WEAKNESS_REMEDIATION: { assessment: 7, delivery: 45, filing: 90 },
      FAR_COMPLIANCE_REMAP: { assessment: 10, delivery: 45, filing: 90 },
      CARES_ACT_RECONSTRUCTION: { assessment: 5, delivery: 30, filing: 45 },
      OCC_CONSENT_ORDER_RESPONSE: { assessment: 5, delivery: 30, filing: 60 },
    };

    const d = deadlines[rescueType] ?? { assessment: 7, delivery: 30, filing: 60 };
    const citizens = this.assignCitizens(rescueType);

    const milestones: { date: string; action: string; citizen: string }[] = [
      { date: addDays(detection, 1), action: "Initial triage and document collection", citizen: citizens[0] ?? "SENTINEL-0" },
      { date: addDays(detection, d.assessment), action: "Complete initial assessment and scope definition", citizen: citizens[0] ?? "SENTINEL-0" },
      { date: addDays(detection, Math.floor(d.delivery * 0.33)), action: "Draft deliverables — first review cycle", citizen: citizens[1] ?? citizens[0] ?? "SENTINEL-0" },
      { date: addDays(detection, Math.floor(d.delivery * 0.66)), action: "Revised deliverables — quality review by SENTINEL-0", citizen: "SENTINEL-0" },
      { date: addDays(detection, d.delivery), action: "Final deliverables ready for entity review", citizen: citizens[0] ?? "SENTINEL-0" },
      { date: addDays(detection, d.delivery + 5), action: "Entity review and feedback incorporation", citizen: citizens[0] ?? "SENTINEL-0" },
      { date: addDays(detection, d.filing - 5), action: "Pre-filing review and final quality check", citizen: "SENTINEL-0" },
      { date: addDays(detection, d.filing), action: "Filing deadline — all documents submitted", citizen: citizens[0] ?? "SENTINEL-0" },
    ];

    return {
      detectionDate,
      assessmentDeadline: addDays(detection, d.assessment),
      deliveryDeadline: addDays(detection, d.delivery),
      filingDeadline: addDays(detection, d.filing),
      milestones,
    };
  }

  // ─── Main Orchestrator ─────────────────────────────────────────────────

  generateRescueSequence(trigger: RescueTrigger, entityData?: { entityName: string; entityId: string }): RescueSequence {
    const rescueType = this.detectRescueType(trigger);
    const federalSurvivalScore = this.calculateFederalSurvivalScore(trigger);
    const urgency = this.classifyUrgency(federalSurvivalScore);
    const assignedCitizens = this.assignCitizens(rescueType);
    const now = new Date().toISOString();

    const entity = entityData ?? { entityName: trigger.entityName, entityId: trigger.entityId };
    const deliverables = this.generateDeliverables(rescueType, entity);
    const timeline = this.buildTimeline(rescueType, now);
    const estimatedCost = this.estimateCost(rescueType, urgency);

    return {
      id: generateId("RSQ"),
      rescueType,
      entityId: entity.entityId,
      entityName: entity.entityName,
      sector: trigger.sector,
      triggerSource: trigger.source,
      triggerRuleId: trigger.ruleId,
      federalSurvivalScore,
      urgency,
      assignedCitizens,
      deliverables,
      timeline,
      estimatedCost,
      generatedAt: now,
    };
  }

  // ─── Automated Pipeline Rescue ─────────────────────────────────────────

  runAutomatedRescue(pipelineResult: PipelineResult): RescueSequence[] {
    const sequences: RescueSequence[] = [];
    const source = pipelineResult.source ?? "UNKNOWN";

    for (const lead of pipelineResult.leads) {
      const gapScore = (lead.gapScore as number) ?? 0;

      // Only generate rescue for entities with significant statutory failures
      if (gapScore < 40) continue;

      const entityName = (lead.entity?.auditeeNname ?? lead.entity?.entityName ?? "Unknown Entity") as string;
      const entityId = (lead.entity?.reportId ?? lead.entity?.auditeeEin ?? "UNKNOWN") as string;

      const hasMW = lead.findings?.some((f) => f.isMaterialWeakness) ?? false;
      const hasRepeat = lead.findings?.some((f) => f.isRepeatFinding) ?? false;
      const hasQC = lead.findings?.some((f) => f.isQuestionedCosts) ?? false;

      let failureType = "COMPLIANCE_FAILURE";
      if (hasMW) failureType = "MATERIAL_WEAKNESS";
      if (hasQC) failureType = "QUESTIONED_COSTS";

      const trigger: RescueTrigger = {
        source,
        ruleId: `AUTO-${source}-${gapScore}`,
        entityId,
        entityName,
        sector: "government" as string,
        failureType,
        isStatutory: gapScore >= 60,
        isRepeatFinding: hasRepeat,
        hasCriminalIndicators: hasQC && gapScore >= 80,
        isGoingConcern: false,
        daysUntilDeadline: 60,
      };

      const sequence = this.generateRescueSequence(trigger);
      sequences.push(sequence);
    }

    return sequences;
  }

  // ─── HTML Report Generator ─────────────────────────────────────────────

  generateRescueReportHTML(sequence: RescueSequence): string {
    const scoreColor =
      sequence.federalSurvivalScore >= 80 ? "#dc2626" :
      sequence.federalSurvivalScore >= 60 ? "#d97706" :
      sequence.federalSurvivalScore >= 40 ? "#f59e0b" : "#16a34a";

    const urgencyColor: Record<string, string> = {
      CRITICAL: "#dc2626",
      HIGH: "#d97706",
      ELEVATED: "#f59e0b",
      STANDARD: "#16a34a",
    };

    const citizensHTML = sequence.assignedCitizens
      .map((c) => `<span class="citizen-badge">${sanitize(c)}</span>`)
      .join(" ");

    const deliverablesHTML = sequence.deliverables
      .map((d) => {
        const statusClass =
          d.status === "DELIVERED" ? "ok" :
          d.status === "GENERATED" || d.status === "REVIEWED" ? "warning" :
          "pending";
        return `
      <div class="deliverable-card">
        <div class="deliverable-header">
          <span class="deliverable-title">${sanitize(d.title)}</span>
          <span class="badge ${statusClass}">${d.status}</span>
        </div>
        <p class="deliverable-desc">${sanitize(d.description)}</p>
        <div class="deliverable-meta">
          <span>Assigned: <strong>${sanitize(d.assignedCitizen)}</strong></span>
          <span>Category: ${sanitize(d.category)}</span>
          <span>Deadline: ${sanitize(d.deadline.split("T")[0] ?? d.deadline)}</span>
        </div>
        <div class="sections-list">
          <strong>Sections:</strong>
          <ol>${d.templateSections.map((s) => `<li>${sanitize(s)}</li>`).join("")}</ol>
        </div>
        <div class="inputs-list">
          <strong>Required from Entity:</strong>
          <ul>${d.requiredInputs.map((i) => `<li><input type="checkbox"> ${sanitize(i)}</li>`).join("")}</ul>
        </div>
      </div>`;
      })
      .join("");

    const milestonesHTML = sequence.timeline.milestones
      .map((m) => `
      <tr>
        <td>${sanitize(m.date.split("T")[0] ?? m.date)}</td>
        <td>${sanitize(m.action)}</td>
        <td><span class="citizen-badge small">${sanitize(m.citizen)}</span></td>
      </tr>`)
      .join("");

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Rescue Sequence ${sanitize(sequence.id)} — ${sanitize(sequence.entityName)}</title>
<style>
  :root {
    --gold: #c8a951; --navy: #0a0e17; --slate: #1a1f2e;
    --text: #e0e6f0; --muted: #8892a4;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', system-ui, sans-serif; background: var(--navy); color: var(--text); line-height: 1.6; }
  .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
  .header { text-align: center; padding: 2rem 0; border-bottom: 2px solid var(--gold); margin-bottom: 2rem; }
  .header h1 { color: var(--gold); font-size: 1.5rem; letter-spacing: 2px; text-transform: uppercase; }
  .header .subtitle { color: var(--muted); margin-top: 0.5rem; }
  .header .rescue-id { color: var(--muted); font-family: monospace; font-size: 0.9rem; margin-top: 0.25rem; }

  .score-section { text-align: center; background: var(--slate); border-radius: 8px; padding: 2rem; margin-bottom: 1.5rem; }
  .score-circle { width: 140px; height: 140px; border-radius: 50%; border: 6px solid ${scoreColor}; display: inline-flex; align-items: center; justify-content: center; flex-direction: column; }
  .score-number { font-size: 2.5rem; font-weight: bold; color: ${scoreColor}; }
  .score-label { font-size: 0.75rem; color: ${scoreColor}; letter-spacing: 2px; text-transform: uppercase; }
  .urgency-badge { display: inline-block; padding: 4px 16px; border-radius: 16px; font-size: 0.85rem; font-weight: 600; margin-top: 1rem; background: ${urgencyColor[sequence.urgency] ?? "#16a34a"}22; color: ${urgencyColor[sequence.urgency] ?? "#16a34a"}; border: 1px solid ${urgencyColor[sequence.urgency] ?? "#16a34a"}44; }

  .entity-card { background: var(--slate); border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .entity-card .label { color: var(--muted); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; }
  .entity-card .value { font-size: 1.1rem; margin-bottom: 0.5rem; }

  .section { margin-bottom: 2rem; }
  .section h2 { color: var(--gold); font-size: 1.2rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(200,169,81,0.3); }

  .citizen-badge { display: inline-block; background: rgba(200,169,81,0.15); color: var(--gold); padding: 4px 12px; border-radius: 16px; font-size: 0.85rem; font-weight: 600; margin: 2px; }
  .citizen-badge.small { font-size: 0.75rem; padding: 2px 8px; }

  .deliverable-card { background: var(--slate); border-radius: 8px; padding: 1.5rem; margin-bottom: 1rem; border-left: 4px solid var(--gold); }
  .deliverable-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
  .deliverable-title { font-weight: 600; font-size: 1.05rem; }
  .deliverable-desc { color: var(--muted); font-size: 0.9rem; margin-bottom: 0.75rem; }
  .deliverable-meta { display: flex; gap: 1.5rem; font-size: 0.85rem; color: var(--muted); margin-bottom: 0.75rem; flex-wrap: wrap; }
  .deliverable-meta strong { color: var(--text); }
  .sections-list, .inputs-list { font-size: 0.85rem; margin-top: 0.5rem; }
  .sections-list ol, .inputs-list ul { padding-left: 1.5rem; margin-top: 0.25rem; }
  .sections-list li, .inputs-list li { margin-bottom: 0.25rem; color: var(--muted); }

  table { width: 100%; border-collapse: collapse; background: var(--slate); border-radius: 8px; overflow: hidden; }
  th { background: rgba(200,169,81,0.15); color: var(--gold); text-align: left; padding: 0.75rem; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; }
  td { padding: 0.75rem; border-top: 1px solid rgba(255,255,255,0.05); font-size: 0.9rem; }

  .badge { display: inline-block; padding: 2px 10px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; }
  .badge.ok { background: rgba(22,163,74,0.2); color: #86efac; }
  .badge.warning { background: rgba(217,119,6,0.2); color: #fcd34d; }
  .badge.pending { background: rgba(100,116,139,0.2); color: #94a3b8; }
  .badge.critical { background: rgba(220,38,38,0.2); color: #fca5a5; }

  .cost-section { background: var(--slate); border-radius: 8px; padding: 1.5rem; text-align: center; margin-bottom: 1.5rem; }
  .cost-amount { font-size: 1.5rem; color: var(--gold); font-weight: 600; }

  .cta { text-align: center; margin-top: 2rem; padding: 2rem; background: linear-gradient(135deg, rgba(200,169,81,0.1), rgba(200,169,81,0.05)); border: 1px solid var(--gold); border-radius: 8px; }
  .cta a { display: inline-block; background: var(--gold); color: var(--navy); padding: 14px 36px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 1.1rem; letter-spacing: 1px; }
  .cta a:hover { opacity: 0.9; }

  .footer { text-align: center; color: var(--muted); font-size: 0.8rem; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.05); }
  .disclaimer { font-size: 0.75rem; color: var(--muted); margin-top: 1rem; font-style: italic; }
</style>
</head>
<body>
<div class="container">

  <div class="header">
    <h1>Vernen Legal Compliance</h1>
    <div class="subtitle">Automated Rescue Sequence</div>
    <div class="rescue-id">${sanitize(sequence.id)}</div>
  </div>

  <div class="score-section">
    <div class="score-circle">
      <div class="score-number">${sequence.federalSurvivalScore}</div>
      <div class="score-label">SURVIVAL</div>
    </div>
    <p style="margin-top:1rem; color: var(--muted);">Federal Survival Score — higher indicates greater proximity to enforcement action</p>
    <div class="urgency-badge">${sequence.urgency} URGENCY</div>
  </div>

  <div class="entity-card">
    <div>
      <div class="label">Entity</div>
      <div class="value">${sanitize(sequence.entityName)}</div>
      <div class="label">Entity ID</div>
      <div class="value" style="font-family:monospace;">${sanitize(sequence.entityId)}</div>
      <div class="label">Sector</div>
      <div class="value">${sanitize(sequence.sector)}</div>
    </div>
    <div>
      <div class="label">Rescue Type</div>
      <div class="value">${sanitize(sequence.rescueType.replace(/_/g, " "))}</div>
      <div class="label">Trigger Source</div>
      <div class="value">${sanitize(sequence.triggerSource)}</div>
      <div class="label">Trigger Rule</div>
      <div class="value" style="font-family:monospace;">${sanitize(sequence.triggerRuleId)}</div>
    </div>
  </div>

  <div class="section">
    <h2>Assigned Citizens</h2>
    <div style="padding: 1rem 0;">${citizensHTML}</div>
  </div>

  <div class="section">
    <h2>Deliverables (${sequence.deliverables.length})</h2>
    ${deliverablesHTML}
  </div>

  <div class="section">
    <h2>Timeline</h2>
    <div class="entity-card" style="grid-template-columns: 1fr 1fr 1fr;">
      <div>
        <div class="label">Detection</div>
        <div class="value">${sanitize(sequence.timeline.detectionDate.split("T")[0] ?? "")}</div>
      </div>
      <div>
        <div class="label">Delivery Deadline</div>
        <div class="value">${sanitize(sequence.timeline.deliveryDeadline.split("T")[0] ?? "")}</div>
      </div>
      <div>
        <div class="label">Filing Deadline</div>
        <div class="value" style="color: ${scoreColor}; font-weight: 600;">${sanitize(sequence.timeline.filingDeadline.split("T")[0] ?? "")}</div>
      </div>
    </div>
    <table>
      <thead><tr><th>Date</th><th>Milestone</th><th>Citizen</th></tr></thead>
      <tbody>${milestonesHTML}</tbody>
    </table>
  </div>

  <div class="cost-section">
    <div class="label" style="color: var(--muted); margin-bottom: 0.5rem;">ESTIMATED ENGAGEMENT COST</div>
    <div class="cost-amount">${sanitize(sequence.estimatedCost)}</div>
  </div>

  <div class="cta">
    <p style="margin-bottom: 1rem; font-size: 1.1rem;">This entity needs immediate intervention.</p>
    <a href="https://compliance.vernenlegal.com/api/rescue/initiate">Initiate Rescue Sequence</a>
    <p style="margin-top: 1rem; color: var(--muted);">Powered by 8 rescue protocols and 16 Persona Citizens</p>
  </div>

  <div class="footer">
    <p>Generated by Vernen Legal Compliance — ${new Date().toISOString().split("T")[0]}</p>
    <p>Rescue Sequence ${sanitize(sequence.id)} — ${sanitize(sequence.rescueType)}</p>
    <p class="disclaimer">This report is generated from publicly available federal data and is provided for informational purposes only. It does not constitute legal advice or a professional engagement. The Federal Survival Score is an algorithmic assessment, not a legal opinion. Consult qualified professionals before taking action.</p>
  </div>

</div>
</body>
</html>`;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// D1 Storage
// ═══════════════════════════════════════════════════════════════════════════

export async function ensureRescueTables(db: D1Database): Promise<void> {
  await db.exec(`CREATE TABLE IF NOT EXISTS rescue_sequences (id TEXT PRIMARY KEY, rescue_type TEXT NOT NULL, entity_id TEXT NOT NULL, entity_name TEXT NOT NULL, sector TEXT DEFAULT '', trigger_source TEXT NOT NULL, trigger_rule_id TEXT NOT NULL, federal_survival_score INTEGER DEFAULT 0, urgency TEXT DEFAULT 'STANDARD', assigned_citizens TEXT DEFAULT '[]', timeline_json TEXT DEFAULT '{}', estimated_cost TEXT DEFAULT '', status TEXT DEFAULT 'ACTIVE', created_at TEXT DEFAULT (datetime('now')), updated_at TEXT DEFAULT (datetime('now')))`);
  await db.exec(`CREATE TABLE IF NOT EXISTS rescue_deliverables (id TEXT PRIMARY KEY, sequence_id TEXT NOT NULL, title TEXT NOT NULL, description TEXT DEFAULT '', category TEXT NOT NULL, status TEXT DEFAULT 'PENDING', assigned_citizen TEXT NOT NULL, content TEXT DEFAULT '', template_sections TEXT DEFAULT '[]', required_inputs TEXT DEFAULT '[]', deadline TEXT DEFAULT '', notes TEXT DEFAULT '', created_at TEXT DEFAULT (datetime('now')), updated_at TEXT DEFAULT (datetime('now')))`);
  await db.exec(`CREATE INDEX IF NOT EXISTS idx_rescue_seq_type ON rescue_sequences(rescue_type)`);
  await db.exec(`CREATE INDEX IF NOT EXISTS idx_rescue_seq_urgency ON rescue_sequences(urgency)`);
  await db.exec(`CREATE INDEX IF NOT EXISTS idx_rescue_seq_status ON rescue_sequences(status)`);
  await db.exec(`CREATE INDEX IF NOT EXISTS idx_rescue_seq_entity ON rescue_sequences(entity_id)`);
  await db.exec(`CREATE INDEX IF NOT EXISTS idx_rescue_del_sequence ON rescue_deliverables(sequence_id)`);
  await db.exec(`CREATE INDEX IF NOT EXISTS idx_rescue_del_status ON rescue_deliverables(status)`);
}

export async function storeRescueSequence(
  db: D1Database,
  sequence: RescueSequence
): Promise<void> {
  // Store the sequence
  await db.prepare(`
    INSERT OR REPLACE INTO rescue_sequences
    (id, rescue_type, entity_id, entity_name, sector, trigger_source, trigger_rule_id,
     federal_survival_score, urgency, assigned_citizens, timeline_json, estimated_cost, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
  `).bind(
    sequence.id,
    sequence.rescueType,
    sequence.entityId,
    sequence.entityName,
    sequence.sector,
    sequence.triggerSource,
    sequence.triggerRuleId,
    sequence.federalSurvivalScore,
    sequence.urgency,
    JSON.stringify(sequence.assignedCitizens),
    JSON.stringify(sequence.timeline),
    sequence.estimatedCost,
  ).run();

  // Store each deliverable
  for (const del of sequence.deliverables) {
    await db.prepare(`
      INSERT OR REPLACE INTO rescue_deliverables
      (id, sequence_id, title, description, category, status, assigned_citizen,
       content, template_sections, required_inputs, deadline, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `).bind(
      del.id,
      sequence.id,
      del.title,
      del.description,
      del.category,
      del.status,
      del.assignedCitizen,
      del.content,
      JSON.stringify(del.templateSections),
      JSON.stringify(del.requiredInputs),
      del.deadline,
    ).run();
  }
}

export async function getActiveRescues(
  db: D1Database,
  filters: { urgency?: string; rescueType?: string; status?: string; limit?: number }
): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM rescue_sequences WHERE 1=1";
  const binds: unknown[] = [];

  if (filters.urgency) {
    query += " AND urgency = ?";
    binds.push(filters.urgency.toUpperCase());
  }
  if (filters.rescueType) {
    query += " AND rescue_type = ?";
    binds.push(filters.rescueType);
  }
  if (filters.status) {
    query += " AND status = ?";
    binds.push(filters.status.toUpperCase());
  }

  query += " ORDER BY federal_survival_score DESC LIMIT ?";
  binds.push(filters.limit ?? 50);

  const result = await db.prepare(query).bind(...binds).all();
  return result.results as Record<string, unknown>[];
}

export async function getRescueSequenceById(
  db: D1Database,
  sequenceId: string
): Promise<{ sequence: Record<string, unknown> | null; deliverables: Record<string, unknown>[] }> {
  const seqResult = await db.prepare(
    "SELECT * FROM rescue_sequences WHERE id = ?"
  ).bind(sequenceId).first();

  if (!seqResult) {
    return { sequence: null, deliverables: [] };
  }

  const delResult = await db.prepare(
    "SELECT * FROM rescue_deliverables WHERE sequence_id = ? ORDER BY created_at ASC"
  ).bind(sequenceId).all();

  return {
    sequence: seqResult as Record<string, unknown>,
    deliverables: delResult.results as Record<string, unknown>[],
  };
}

export async function updateDeliverableStatus(
  db: D1Database,
  deliverableId: string,
  status: DeliverableStatus,
  notes?: string
): Promise<boolean> {
  const result = await db.prepare(`
    UPDATE rescue_deliverables
    SET status = ?, notes = COALESCE(?, notes), updated_at = datetime('now')
    WHERE id = ?
  `).bind(status, notes ?? null, deliverableId).run();

  return (result.meta?.changes ?? 0) > 0;
}

// ═══════════════════════════════════════════════════════════════════════════
// Utilities
// ═══════════════════════════════════════════════════════════════════════════

function sanitize(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

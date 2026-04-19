/**
 * Skill Discovery Service
 *
 * Clusters failure taxonomy entries into discovered skills.
 * Each cluster of related violations becomes a professional competency
 * that a Citizen needs to possess.
 *
 * "73% of construction 8(a) firms failed on subcontract ratio compliance"
 * → Skill: construction-subcontract-compliance-audit
 * → Checklist derived from what actually gets violated
 * → Governing standards from the CFR citations in the failure data
 */

import type { Env } from "../index.js";
import { generateId } from "../utils/helpers.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface FailureCluster {
  id: string;
  clusterName: string;
  clusterLabel: string;
  industry: string;
  subIndustry: string | null;
  violationTypes: string[];
  complianceFrameworks: string[];
  governingStandards: string[];
  totalFailures: number;
  uniqueEntities: number;
  avgGapScore: number;
  totalFinancialExposure: number;
  topStates: { state: string; count: number }[];
  severityDistribution: Record<string, number>;
  suggestedSkillSlug: string;
  suggestedSkillType: string;
  suggestedChecklist: ChecklistItem[];
}

export interface ChecklistItem {
  id: string;
  gate: number;
  description: string;
  required: boolean;
  standard: string | null;
}

export interface DiscoveredSkill {
  id: string;
  clusterId: string;
  skillSlug: string;
  name: string;
  description: string;
  skillType: string;
  governingStandards: string[];
  auditTriggers: string[];
  auditChecklist: ChecklistItem[];
  outputProtocol: string;
  crossReferences: string[];
  backedByFailures: number;
  backedByEntities: number;
  confidenceScore: number;
  industries: string[];
  assignedCitizen: string | null;
}

export interface SkillDiscoveryResult {
  clustersCreated: number;
  clustersUpdated: number;
  skillsDiscovered: number;
  skillsUpdated: number;
  durationMs: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// Clustering rules — which violation types group together
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Violations that should cluster into the same skill.
 * Key = cluster name prefix, Value = violation type patterns.
 */
const CLUSTER_RULES: { prefix: string; label: string; patterns: string[]; skillType: string }[] = [
  // Single Audit cluster
  {
    prefix: "single-audit-internal-controls",
    label: "Single Audit Internal Controls Remediation",
    patterns: ["MATERIAL_WEAKNESS", "SIGNIFICANT_DEFICIENCY", "MATERIAL_NONCOMPLIANCE"],
    skillType: "AUDIT",
  },
  {
    prefix: "single-audit-financial-management",
    label: "Single Audit Financial Management",
    patterns: ["QUESTIONED_COSTS", "GOING_CONCERN", "MODIFIED_OPINION"],
    skillType: "AUDIT",
  },
  {
    prefix: "single-audit-systemic-compliance",
    label: "Systemic Compliance Failure Remediation",
    patterns: ["REPEAT_FINDING"],
    skillType: "AUDIT",
  },
  // HIPAA cluster
  {
    prefix: "hipaa-cyber-incident-response",
    label: "HIPAA Cyber Incident Response & Breach Notification",
    patterns: ["HIPAA_BREACH_HACKING"],
    skillType: "AUDIT",
  },
  {
    prefix: "hipaa-access-control",
    label: "HIPAA Access Control & Authorization Audit",
    patterns: ["HIPAA_BREACH_UNAUTHORIZED_ACCESS"],
    skillType: "AUDIT",
  },
  {
    prefix: "hipaa-physical-safeguards",
    label: "HIPAA Physical Safeguards & Asset Protection",
    patterns: ["HIPAA_BREACH_THEFT", "HIPAA_BREACH_LOSS", "HIPAA_BREACH_IMPROPER_DISPOSAL"],
    skillType: "AUDIT",
  },
  // SEC/SOX cluster
  {
    prefix: "sox-internal-controls",
    label: "SOX Section 404 Internal Controls Assessment",
    patterns: ["SEC_MATERIAL_WEAKNESS", "SEC_ADVERSE_OPINION"],
    skillType: "AUDIT",
  },
  {
    prefix: "sox-financial-reporting",
    label: "SOX Financial Reporting & Restatement Recovery",
    patterns: ["SEC_RESTATEMENT", "SEC_AUDITOR_CHANGE"],
    skillType: "AUDIT",
  },
  // SBA cluster
  {
    prefix: "sba-8a-program-compliance",
    label: "SBA 8(a) Program Eligibility & Compliance",
    patterns: ["SBA_SUSPENSION", "SBA_DECERTIFICATION"],
    skillType: "AUDIT",
  },
  {
    prefix: "sba-8a-financial-eligibility",
    label: "SBA 8(a) Financial Eligibility Standards",
    patterns: ["SBA_NET_WORTH_VIOLATION", "SBA_NARRATIVE_BAN"],
    skillType: "AUDIT",
  },
  {
    prefix: "sba-8a-performance-requirements",
    label: "SBA 8(a) Performance & Subcontracting Requirements",
    patterns: ["SBA_SUBCONTRACT_VIOLATION"],
    skillType: "AUDIT",
  },
  // Federal spending triggers
  {
    prefix: "federal-contract-compliance",
    label: "Federal Contract FAR Compliance",
    patterns: ["FAR_TRIGGER", "SINGLE_AUDIT_TRIGGER"],
    skillType: "AUDIT",
  },
  {
    prefix: "cybersecurity-maturity",
    label: "CMMC / FedRAMP Cybersecurity Maturity",
    patterns: ["CMMC_TRIGGER", "FEDRAMP_TRIGGER"],
    skillType: "AUDIT",
  },
  {
    prefix: "export-control-compliance",
    label: "ITAR Export Control Compliance",
    patterns: ["ITAR_TRIGGER"],
    skillType: "AUDIT",
  },
  // Regulatory change
  {
    prefix: "regulatory-change-adaptation",
    label: "Regulatory Change Impact Assessment",
    patterns: ["REGULATORY_CHANGE_FINAL", "REGULATORY_CHANGE_PROPOSED"],
    skillType: "GOVERNANCE",
  },
  // FDA clusters
  {
    prefix: "fda-critical-recall",
    label: "FDA Class I Critical Recall Response",
    patterns: ["FDA_CLASS_I"],
    skillType: "AUDIT",
  },
  {
    prefix: "fda-standard-recall",
    label: "FDA Class II/III Recall Compliance",
    patterns: ["FDA_CLASS_II", "FDA_CLASS_III"],
    skillType: "AUDIT",
  },
  // CFPB clusters
  {
    prefix: "cfpb-credit-reporting",
    label: "Fair Credit Reporting Act Compliance",
    patterns: ["CFPB_CREDIT_REPORTING_OR_OTHER_PERSONAL_CONSUMER_REPORTS", "CFPB_CREDIT_CARD"],
    skillType: "AUDIT",
  },
  {
    prefix: "cfpb-debt-collection",
    label: "Fair Debt Collection Practices Compliance",
    patterns: ["CFPB_DEBT_COLLECTION", "CFPB_DEBT_OR_CREDIT_MANAGEMENT"],
    skillType: "AUDIT",
  },
  {
    prefix: "cfpb-lending-practices",
    label: "Consumer Lending Compliance",
    patterns: ["CFPB_MORTGAGE", "CFPB_VEHICLE_LOAN_OR_LEASE", "CFPB_PERSONAL_LOAN", "CFPB_PAYDAY_LOAN", "CFPB_TITLE_LOAN", "CFPB_OR_ADVANCE_LOAN"],
    skillType: "AUDIT",
  },
  {
    prefix: "cfpb-banking-services",
    label: "Consumer Banking Services Compliance",
    patterns: ["CFPB_CHECKING_OR_SAVINGS_ACCOUNT", "CFPB_MONEY_TRANSFER", "CFPB_OR_MONEY_SERVICE", "CFPB_VIRTUAL_CURRENCY"],
    skillType: "AUDIT",
  },
  // EPA clusters
  {
    prefix: "epa-clean-water",
    label: "Clean Water Act Compliance",
    patterns: ["EPA_CLEAN_WATER_ACT"],
    skillType: "AUDIT",
  },
  {
    prefix: "epa-clean-air",
    label: "Clean Air Act Compliance",
    patterns: ["EPA_CLEAN_AIR_ACT"],
    skillType: "AUDIT",
  },
  {
    prefix: "epa-hazardous-waste",
    label: "RCRA Hazardous Waste Compliance",
    patterns: ["EPA_RCRA_HAZARDOUS_WASTE"],
    skillType: "AUDIT",
  },
  {
    prefix: "epa-drinking-water",
    label: "Safe Drinking Water Act Compliance",
    patterns: ["EPA_SAFE_DRINKING_WATER_ACT"],
    skillType: "AUDIT",
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// Skill Discovery Engine
// ═══════════════════════════════════════════════════════════════════════════

export class SkillDiscoveryEngine {
  private db: D1Database;

  constructor(env: Env) {
    this.db = env.DB;
  }

  /**
   * Run the full discovery pipeline (optimized for D1 subrequest limits):
   * 1. Single query to get all industry × violation_type aggregates
   * 2. Match in memory against cluster rules
   * 3. Batch upsert clusters and skills
   */
  async discover(): Promise<SkillDiscoveryResult> {
    const start = Date.now();
    let clustersCreated = 0;
    let clustersUpdated = 0;
    let skillsDiscovered = 0;
    let skillsUpdated = 0;

    // ONE query to get all aggregates — avoids N×M subrequest explosion
    const allAggs = await this.db.prepare(`
      SELECT
        industry,
        violation_type,
        COUNT(*) as total_failures,
        COUNT(DISTINCT entity_name) as unique_entities,
        AVG(gap_score) as avg_score,
        SUM(financial_exposure) as total_exposure,
        GROUP_CONCAT(DISTINCT governing_standard) as standards_found,
        GROUP_CONCAT(DISTINCT compliance_framework) as frameworks_found,
        GROUP_CONCAT(DISTINCT entity_state) as states_found,
        GROUP_CONCAT(DISTINCT severity) as severities_found
      FROM failure_taxonomy
      GROUP BY industry, violation_type
      ORDER BY industry, total_failures DESC
    `).all();

    // Build in-memory lookup: industry → violation_type → aggregates
    type AggRow = {
      industry: string; violation_type: string;
      total_failures: number; unique_entities: number;
      avg_score: number; total_exposure: number;
      standards_found: string | null; frameworks_found: string | null;
      states_found: string | null; severities_found: string | null;
    };
    const aggsByIndustry = new Map<string, Map<string, AggRow>>();
    for (const row of (allAggs.results ?? [])) {
      const r = row as unknown as AggRow;
      if (!aggsByIndustry.has(r.industry)) aggsByIndustry.set(r.industry, new Map());
      aggsByIndustry.get(r.industry)!.set(r.violation_type, r);
    }

    // Match cluster rules against aggregates in memory
    for (const [industry, violationMap] of aggsByIndustry) {
      for (const rule of CLUSTER_RULES) {
        // Find matching violations for this rule
        let totalFailures = 0;
        let uniqueEntities = 0;
        let totalExposure = 0;
        let scoreSum = 0;
        let scoreCount = 0;
        const violationTypesFound: string[] = [];
        const standardsSet = new Set<string>();
        const frameworksSet = new Set<string>();
        const statesSet = new Set<string>();
        const severityCounts: Record<string, number> = {};

        for (const pattern of rule.patterns) {
          const agg = violationMap.get(pattern);
          if (!agg || agg.total_failures === 0) continue;
          totalFailures += agg.total_failures;
          uniqueEntities += agg.unique_entities;
          totalExposure += agg.total_exposure ?? 0;
          scoreSum += (agg.avg_score ?? 0) * agg.total_failures;
          scoreCount += agg.total_failures;
          violationTypesFound.push(agg.violation_type);
          for (const s of (agg.standards_found ?? "").split(",").filter(Boolean)) standardsSet.add(s);
          for (const f of (agg.frameworks_found ?? "").split(",").filter(Boolean)) frameworksSet.add(f);
          for (const st of (agg.states_found ?? "").split(",").filter(Boolean)) statesSet.add(st);
          for (const sev of (agg.severities_found ?? "").split(",").filter(Boolean)) {
            severityCounts[sev] = (severityCounts[sev] ?? 0) + agg.total_failures;
          }
        }

        if (totalFailures === 0) continue;

        const clusterName = `${industry.toLowerCase()}-${rule.prefix}`;
        const avgScore = scoreCount > 0 ? scoreSum / scoreCount : 0;
        const topStates = [...statesSet].slice(0, 10).map(s => ({ state: s, count: 1 }));

        // Simple checklist from violation types
        const checklist: ChecklistItem[] = violationTypesFound.map((vt, i) => ({
          id: generateId("chk"),
          gate: i + 1,
          description: `Verify ${vt.replace(/_/g, " ").toLowerCase()} controls are in place (${totalFailures} documented failures)`,
          required: totalFailures >= 3,
          standard: [...standardsSet][0] ?? null,
        }));

        // Upsert cluster
        const clusterId = await this.upsertCluster({
          clusterName,
          clusterLabel: `${formatIndustryName(industry)} ${rule.label}`,
          industry,
          subIndustry: null,
          violationTypes: violationTypesFound,
          complianceFrameworks: [...frameworksSet],
          governingStandards: [...standardsSet],
          totalFailures,
          uniqueEntities,
          avgGapScore: avgScore,
          totalFinancialExposure: totalExposure,
          topStates,
          severityDistribution: severityCounts,
          suggestedSkillSlug: `${clusterName}-audit`,
          suggestedSkillType: rule.skillType,
          suggestedChecklist: checklist,
        });

        if (clusterId.created) clustersCreated++;
        else clustersUpdated++;

        // Discover/update the skill
        const skillResult = await this.upsertDiscoveredSkill(clusterId.id, {
          clusterName,
          clusterLabel: `${formatIndustryName(industry)} ${rule.label}`,
          industry,
          violationTypes: violationTypesFound,
          complianceFrameworks: [...frameworksSet],
          governingStandards: [...standardsSet],
          totalFailures,
          uniqueEntities,
          avgGapScore: avgScore,
          checklist,
          skillType: rule.skillType,
        });

        if (skillResult === "new") skillsDiscovered++;
        else skillsUpdated++;
      }
    }

    // Log stats
    try {
      await this.db.prepare(`
        INSERT INTO taxonomy_statistics (id, stat_type, pipeline, clusters_updated, skills_discovered, duration_ms)
        VALUES (?1, ?2, ?3, ?4, ?5, ?6)
      `).bind(generateId("stat"), "cluster_run", "ALL", clustersCreated + clustersUpdated, skillsDiscovered, Date.now() - start).run();
    } catch { /* non-blocking */ }

    return { clustersCreated, clustersUpdated, skillsDiscovered, skillsUpdated, durationMs: Date.now() - start };
  }

  // ─── Cluster Upsert ──────────────────────────────────────────────────

  private async upsertCluster(cluster: Omit<FailureCluster, "id">): Promise<{ id: string; created: boolean }> {
    // Use INSERT OR REPLACE to avoid the check-then-insert pattern (saves a subrequest)
    const id = generateId("cluster");
    try {
      await this.db.prepare(`
      INSERT OR REPLACE INTO failure_clusters (
        id, cluster_name, cluster_label, industry, sub_industry,
        violation_types, compliance_frameworks, governing_standards,
        total_failures, unique_entities, avg_gap_score, total_financial_exposure,
        top_states, severity_distribution,
        suggested_skill_slug, suggested_skill_type, suggested_checklist
      ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17)
    `).bind(
      id, cluster.clusterName, cluster.clusterLabel, cluster.industry, cluster.subIndustry,
      JSON.stringify(cluster.violationTypes), JSON.stringify(cluster.complianceFrameworks), JSON.stringify(cluster.governingStandards),
      cluster.totalFailures, cluster.uniqueEntities, cluster.avgGapScore, cluster.totalFinancialExposure,
      JSON.stringify(cluster.topStates), JSON.stringify(cluster.severityDistribution),
      cluster.suggestedSkillSlug, cluster.suggestedSkillType, JSON.stringify(cluster.suggestedChecklist),
    ).run();
      return { id, created: true };
    } catch {
      return { id, created: false };
    }
  }

  // ─── Discovered Skill Upsert ──────────────────────────────────────────

  private async upsertDiscoveredSkill(
    clusterId: string,
    data: {
      clusterName: string;
      clusterLabel: string;
      industry: string;
      violationTypes: string[];
      complianceFrameworks: string[];
      governingStandards: string[];
      totalFailures: number;
      uniqueEntities: number;
      avgGapScore: number;
      checklist: ChecklistItem[];
      skillType: string;
    }
  ): Promise<"new" | "updated"> {
    const skillSlug = `${data.clusterName}-audit`;
    const auditTriggers = buildAuditTriggers(data.violationTypes);
    const confidence = Math.min(
      (Math.log10(Math.max(data.totalFailures, 1)) / 4) * 0.6 +
      (Math.log10(Math.max(data.uniqueEntities, 1)) / 3) * 0.4,
      1.0
    );
    const outputProtocol = buildOutputProtocol(data.clusterLabel, data.industry, data.complianceFrameworks);
    const description = `Audits ${data.industry.toLowerCase().replace(/_/g, " ")} entities for ${data.violationTypes.join(", ").toLowerCase()} violations. Backed by ${data.totalFailures} documented failures across ${data.uniqueEntities} entities.`;

    // Single INSERT OR REPLACE — no check query, no cross-ref query
    const id = generateId("dskill");
    try {
      await this.db.prepare(`
      INSERT OR REPLACE INTO discovered_skills (
        id, cluster_id, skill_slug, name, description, skill_type,
        governing_standards, audit_triggers, audit_checklist,
        output_protocol, cross_references,
        backed_by_failures, backed_by_entities, confidence_score, industries
      ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15)
    `).bind(
      id, clusterId, skillSlug,
      data.clusterLabel,
      `Audits ${data.industry.toLowerCase().replace(/_/g, " ")} entities for ${data.violationTypes.join(", ").toLowerCase()} violations. Backed by ${data.totalFailures} documented failures across ${data.uniqueEntities} entities.`,
      data.skillType,
      JSON.stringify(data.governingStandards),
      JSON.stringify(auditTriggers),
      JSON.stringify(data.checklist),
      outputProtocol,
      JSON.stringify([]),
      data.totalFailures, data.uniqueEntities, confidence,
      JSON.stringify([data.industry]),
    ).run();
      return "new";
    } catch {
      return "updated";
    }
  }

  // ─── Query Methods ────────────────────────────────────────────────────

  /** Get all discovered skills for an industry */
  async getSkillsForIndustry(industry: string): Promise<DiscoveredSkill[]> {
    const rows = await this.db.prepare(`
      SELECT * FROM discovered_skills
      WHERE industries LIKE ?1 AND is_active = 1
      ORDER BY confidence_score DESC
    `).bind(`%${industry}%`).all();

    return (rows.results ?? []).map(mapToDiscoveredSkill);
  }

  /** Get all unassigned skills (ready for Citizen assembly) */
  async getUnassignedSkills(): Promise<DiscoveredSkill[]> {
    const rows = await this.db.prepare(`
      SELECT * FROM discovered_skills
      WHERE assigned_citizen IS NULL AND is_active = 1
      ORDER BY confidence_score DESC
    `).all();

    return (rows.results ?? []).map(mapToDiscoveredSkill);
  }

  /** Get all clusters with their statistics */
  async getClusters(industry?: string): Promise<FailureCluster[]> {
    let query = "SELECT * FROM failure_clusters WHERE is_active = 1";
    const binds: string[] = [];
    if (industry) {
      query += " AND industry = ?1";
      binds.push(industry);
    }
    query += " ORDER BY total_failures DESC";

    const stmt = this.db.prepare(query);
    const rows = await (binds.length ? stmt.bind(...binds) : stmt).all();
    return (rows.results ?? []).map(mapToCluster);
  }

  /** Assign a discovered skill to a Citizen */
  async assignSkillToCitizen(skillSlug: string, citizenName: string): Promise<void> {
    await this.db.prepare(`
      UPDATE discovered_skills
      SET assigned_citizen = ?1, assigned_at = datetime('now'), updated_at = datetime('now')
      WHERE skill_slug = ?2
    `).bind(citizenName, skillSlug).run();
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════════════════

function formatIndustryName(industry: string): string {
  return industry
    .split("_")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function buildCheckDescription(violationType: string, standard: string | null, standardTitle: string | null, frequency: number): string {
  const base = violationType.replace(/_/g, " ").toLowerCase();
  const standardRef = standard ? ` per ${standard}` : "";
  return `Verify ${base} controls are in place${standardRef} (${frequency} documented failures)`;
}

function buildAuditTriggers(violationTypes: string[]): string[] {
  const triggers: string[] = [];
  for (const vt of violationTypes) {
    if (vt.includes("HIPAA")) triggers.push("HIPAA_ASSESSMENT", "BREACH_NOTIFICATION", "SECURITY_RULE_AUDIT");
    else if (vt.includes("MATERIAL_WEAKNESS") || vt.includes("SIGNIFICANT_DEFICIENCY")) triggers.push("SINGLE_AUDIT", "INTERNAL_CONTROL_REVIEW", "A_133_AUDIT");
    else if (vt.includes("QUESTIONED_COSTS")) triggers.push("COST_ALLOWABILITY_REVIEW", "GRANT_FINANCIAL_AUDIT");
    else if (vt.includes("SEC_") || vt.includes("SOX")) triggers.push("SOX_ASSESSMENT", "10_K_REVIEW", "RESTATEMENT_ANALYSIS");
    else if (vt.includes("SBA")) triggers.push("8A_ELIGIBILITY_REVIEW", "ANNUAL_REVIEW_PREP", "OHA_APPEAL");
    else if (vt.includes("CMMC")) triggers.push("CMMC_ASSESSMENT", "SSP_REVIEW", "CUI_AUDIT");
    else if (vt.includes("FAR")) triggers.push("FAR_CLAUSE_REVIEW", "CONTRACT_COMPLIANCE_AUDIT");
    else if (vt.includes("REGULATORY_CHANGE")) triggers.push("REGULATORY_IMPACT_ASSESSMENT", "POLICY_UPDATE_REVIEW");
    else triggers.push(vt);
  }
  return [...new Set(triggers)];
}

function buildOutputProtocol(label: string, industry: string, frameworks: string[]): string {
  return `## ${label}\n\n**Industry:** ${formatIndustryName(industry)}\n**Frameworks:** ${frameworks.join(", ") || "General"}\n\n### Findings\n[Auto-populated from audit execution]\n\n### Violations\n[Matched against ${frameworks.join(", ") || "applicable"} requirements]\n\n### Remediation Recommendations\n[Derived from failure cluster patterns]\n\n### Governing Standards\n[CFR citations from taxonomy data]`;
}

function mapToDiscoveredSkill(row: unknown): DiscoveredSkill {
  const r = row as Record<string, unknown>;
  return {
    id: r.id as string,
    clusterId: r.cluster_id as string,
    skillSlug: r.skill_slug as string,
    name: r.name as string,
    description: r.description as string,
    skillType: r.skill_type as string,
    governingStandards: JSON.parse((r.governing_standards as string) ?? "[]"),
    auditTriggers: JSON.parse((r.audit_triggers as string) ?? "[]"),
    auditChecklist: JSON.parse((r.audit_checklist as string) ?? "[]"),
    outputProtocol: (r.output_protocol as string) ?? "",
    crossReferences: JSON.parse((r.cross_references as string) ?? "[]"),
    backedByFailures: r.backed_by_failures as number,
    backedByEntities: r.backed_by_entities as number,
    confidenceScore: r.confidence_score as number,
    industries: JSON.parse((r.industries as string) ?? "[]"),
    assignedCitizen: (r.assigned_citizen as string) ?? null,
  };
}

function mapToCluster(row: unknown): FailureCluster {
  const r = row as Record<string, unknown>;
  return {
    id: r.id as string,
    clusterName: r.cluster_name as string,
    clusterLabel: r.cluster_label as string,
    industry: r.industry as string,
    subIndustry: (r.sub_industry as string) ?? null,
    violationTypes: JSON.parse((r.violation_types as string) ?? "[]"),
    complianceFrameworks: JSON.parse((r.compliance_frameworks as string) ?? "[]"),
    governingStandards: JSON.parse((r.governing_standards as string) ?? "[]"),
    totalFailures: r.total_failures as number,
    uniqueEntities: r.unique_entities as number,
    avgGapScore: r.avg_gap_score as number,
    totalFinancialExposure: r.total_financial_exposure as number,
    topStates: JSON.parse((r.top_states as string) ?? "[]"),
    severityDistribution: JSON.parse((r.severity_distribution as string) ?? "{}"),
    suggestedSkillSlug: r.suggested_skill_slug as string,
    suggestedSkillType: r.suggested_skill_type as string,
    suggestedChecklist: JSON.parse((r.suggested_checklist as string) ?? "[]"),
  };
}

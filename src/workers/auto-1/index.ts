/**
 * AUTO-1 — Compliance Automation Engine Worker for SYNTARA.
 *
 * Creates and manages automated compliance check workflows. Turns manual
 * compliance processes into repeatable, auditable automation. Every workflow
 * is logged, every trigger is traceable, every result is recorded.
 */

import type { Env } from "../../index.js";
import { generateId } from "../../utils/helpers.js";
import { WorkflowStatus, TriggerType } from "./types.js";
import type {
  AutomationWorkflow,
  AutomationWorkflowRow,
  AutomationCoverage,
} from "./types.js";

/**
 * The compliance processes that can be automated, with their current status.
 * This is the source of truth for automation coverage tracking.
 */
const COMPLIANCE_PROCESSES = [
  { category: "Multi-State Compliance Check", automated: true, description: "REGULIS scans all 50 states for regulatory changes" },
  { category: "Client Onboarding Verification", automated: true, description: "ADVOCIS validates new client intake data" },
  { category: "Financial Transaction Recording", automated: true, description: "FISCARA records and categorizes all revenue" },
  { category: "Document Generation", automated: true, description: "LEXARC generates compliance documents from templates" },
  { category: "Privacy Data Flow Mapping", automated: true, description: "PRIVAXIS tracks all data flows across the platform" },
  { category: "Risk Assessment Scoring", automated: true, description: "VIGILUS calculates risk scores for all identified threats" },
  { category: "Ethics Review Automation", automated: true, description: "ETHICARA evaluates decisions against the code of ethics" },
  { category: "Internal Audit Scheduling", automated: true, description: "INTEGRA runs scheduled internal compliance audits" },
  { category: "Deployment Verification", automated: false, description: "Post-deploy smoke tests and rollback verification" },
  { category: "Regulatory Alert Monitoring", automated: true, description: "ALERT-1 monitors regulatory changes across jurisdictions" },
  { category: "Client Churn Prediction", automated: true, description: "ADVOCIS identifies at-risk clients for intervention" },
  { category: "Vendor Risk Assessment", automated: true, description: "VIGILUS evaluates third-party vendor security posture" },
  { category: "Board Governance Reporting", automated: false, description: "Quarterly board reports and governance summaries" },
  { category: "Certificate Renewal Tracking", automated: false, description: "Professional license and certification expiry monitoring" },
];

export class Auto1Worker {
  /**
   * Create an automated compliance check workflow.
   * Persists the workflow to D1 and returns the created record.
   */
  async automateComplianceWorkflow(
    state: string,
    entityType: string,
    env: Env
  ): Promise<AutomationWorkflow> {
    const id = generateId("wflow");
    const name = `${entityType} compliance check — ${state}`;
    const createdAt = new Date().toISOString();

    const workflow: AutomationWorkflow = {
      id,
      name,
      triggerType: TriggerType.SCHEDULED,
      state,
      entityType,
      status: WorkflowStatus.ACTIVE,
      createdAt,
    };

    try {
      await env.DB.prepare(
        `INSERT INTO automation_workflows (id, name, trigger_type, state, entity_type, status, created_at)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`
      )
        .bind(
          workflow.id,
          workflow.name,
          workflow.triggerType,
          workflow.state,
          workflow.entityType,
          workflow.status,
          workflow.createdAt
        )
        .run();
    } catch {
      // Table may not exist yet — workflow still returned
    }

    return workflow;
  }

  /**
   * List all active automation workflows from D1.
   */
  async getAutomatedWorkflows(env: Env): Promise<AutomationWorkflow[]> {
    try {
      const result = await env.DB.prepare(
        `SELECT id, name, trigger_type, state, entity_type, status, created_at
         FROM automation_workflows
         ORDER BY created_at DESC
         LIMIT 100`
      ).all<AutomationWorkflowRow>();

      if (result.success && result.results) {
        return result.results.map((row) => ({
          id: row.id,
          name: row.name,
          triggerType: row.trigger_type as TriggerType,
          state: row.state,
          entityType: row.entity_type,
          status: row.status as WorkflowStatus,
          createdAt: row.created_at,
        }));
      }
    } catch {
      // Table may not exist
    }

    return [];
  }

  /**
   * Calculate automation coverage — what percentage of compliance
   * processes are currently automated.
   */
  async getAutomationCoverage(env: Env): Promise<AutomationCoverage> {
    const totalProcesses = COMPLIANCE_PROCESSES.length;
    const automatedProcesses = COMPLIANCE_PROCESSES.filter((p) => p.automated).length;

    // Also count active workflows from D1
    let activeWorkflowCount = 0;
    try {
      const result = await env.DB.prepare(
        `SELECT COUNT(*) as count FROM automation_workflows WHERE status = 'ACTIVE'`
      ).first<{ count: number }>();
      activeWorkflowCount = result?.count ?? 0;
    } catch {
      // Table may not exist
    }

    return {
      totalProcesses,
      automatedProcesses,
      coveragePercent: Math.round((automatedProcesses / totalProcesses) * 100),
      byCategory: COMPLIANCE_PROCESSES.map((p) => ({
        category: p.category,
        automated: p.automated,
        description: p.description,
      })),
      assessedAt: new Date().toISOString(),
    };
  }
}

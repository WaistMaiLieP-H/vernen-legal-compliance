import type { AuditResult, ComplianceGateStatus, AuditIssue } from "./types.js";
import { IssueSeverity } from "./types.js";
import type { BuildLog } from "../forge-0/index.js";
import { generateId } from "../../utils/helpers.js";

/**
 * SENTINEL-0: The autonomous auditor worker.
 * Reviews all FORGE-0 build outputs, generates compliance reports,
 * flags issues by severity, and gates deployments.
 */
export class Sentinel0Worker {
  private auditHistory: AuditResult[] = [];

  async auditBuild(buildLog: BuildLog): Promise<AuditResult> {
    const issues: AuditIssue[] = [];

    // Validate that all log entries have required fields
    for (const entry of buildLog.entries) {
      if (!entry.action || !entry.details) {
        issues.push({
          id: generateId("issue"),
          severity: IssueSeverity.S2,
          title: "Incomplete log entry",
          description: `Log entry ${entry.id} is missing required fields`,
          recommendation: "Ensure FORGE-0 logs all required fields for each action",
          resolved: false,
        });
      }
    }

    // Check for empty build logs
    if (buildLog.entries.length === 0) {
      issues.push({
        id: generateId("issue"),
        severity: IssueSeverity.S3,
        title: "Empty build log",
        description: "Build produced no log entries — cannot verify execution",
        recommendation: "Investigate FORGE-0 logging pipeline",
        resolved: false,
      });
    }

    const result: AuditResult = {
      id: generateId("audit"),
      taskId: buildLog.taskId,
      passed: issues.every((i) => i.severity < IssueSeverity.S3),
      issues,
      auditedAt: new Date().toISOString(),
      auditor: "SENTINEL-0",
    };

    this.auditHistory.push(result);
    return result;
  }

  async generateComplianceReport(): Promise<AuditResult[]> {
    return [...this.auditHistory];
  }

  flagIssue(
    taskId: string,
    severity: IssueSeverity,
    title: string,
    description: string,
    recommendation: string
  ): AuditIssue {
    return {
      id: generateId("issue"),
      severity,
      title,
      description,
      recommendation,
      resolved: false,
    };
  }

  async checkGateReadiness(gateName: string, requiredAudits: string[]): Promise<ComplianceGateStatus> {
    const blockers: string[] = [];

    for (const auditId of requiredAudits) {
      const audit = this.auditHistory.find((a) => a.id === auditId);
      if (!audit) {
        blockers.push(`Audit ${auditId} not found`);
      } else if (!audit.passed) {
        blockers.push(`Audit ${auditId} did not pass`);
      }
    }

    return {
      gateId: generateId("gate"),
      name: gateName,
      ready: blockers.length === 0,
      blockers,
      checkedAt: new Date().toISOString(),
    };
  }
}

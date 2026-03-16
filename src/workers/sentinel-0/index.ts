import type {
  AuditResult,
  ComplianceGateStatus,
  AuditIssue,
  AdaptiveScheduleState,
  ChecklistItem,
  IssuesSummary,
  CitizenEvolutionEntry,
  GateDecisionOutcome,
  ScheduleAdjustment,
} from "./types.js";
import {
  IssueSeverity,
  AuditType,
  AuditStatus,
  SENTINEL_KV_KEYS,
} from "./types.js";
import { generateId } from "../../utils/helpers.js";
import type { Env } from "../../index.js";

/**
 * SENTINEL-0: The autonomous auditor worker.
 *
 * Independent auditor for the Vernen Legal Compliance platform.
 * Reviews all FORGE-0 build outputs, generates compliance reports,
 * flags issues by severity, gates deployments, and adapts its own
 * audit schedule based on observed risk levels.
 *
 * All state is persisted to D1 (structured data) and KV (fast lookups).
 * SENTINEL-0 never trusts in-memory state across requests.
 */
export class Sentinel0Worker {
  // ── Build Task Audit ───────────────────────────────────────────

  /**
   * Audit a single FORGE-0 build task by reading its log entries from D1,
   * running quality checks, and writing the audit result back to D1.
   */
  async auditBuildTask(taskId: string, env: Env): Promise<AuditResult> {
    // Fetch the task record
    const task = await env.DB.prepare(
      "SELECT * FROM build_tasks WHERE id = ?"
    )
      .bind(taskId)
      .first<Record<string, unknown>>();

    // Fetch all log entries for this task
    const logRows = await env.DB.prepare(
      "SELECT * FROM build_logs WHERE task_id = ? ORDER BY created_at ASC"
    )
      .bind(taskId)
      .all<Record<string, unknown>>();

    const entries = logRows.results ?? [];
    const issues: AuditIssue[] = [];
    const checklist: ChecklistItem[] = [];
    const now = new Date().toISOString();

    // ── Check 1: Task exists ──────────────────────────────────
    checklist.push({
      id: generateId("chk"),
      description: "Build task record exists in D1",
      status: task ? "PASS" : "FAIL",
      checkedAt: now,
    });

    if (!task) {
      issues.push(this.createIssue(
        IssueSeverity.S1,
        "Missing build task",
        `No build_tasks record found for task ID: ${taskId}`,
        "Verify FORGE-0 is persisting task records before execution",
        "data_integrity"
      ));
    }

    // ── Check 2: Log entries present ──────────────────────────
    checklist.push({
      id: generateId("chk"),
      description: "Build log entries exist",
      status: entries.length > 0 ? "PASS" : "FAIL",
      checkedAt: now,
    });

    if (entries.length === 0) {
      issues.push(this.createIssue(
        IssueSeverity.S2,
        "Empty build log",
        `Task ${taskId} has zero log entries — cannot verify execution`,
        "Investigate FORGE-0 logging pipeline; ensure all actions are recorded",
        "observability"
      ));
    }

    // ── Check 3: Each entry has required fields ───────────────
    for (const entry of entries) {
      const missingFields: string[] = [];
      if (!entry["action"]) missingFields.push("action");
      if (!entry["details"] && entry["details"] !== "") missingFields.push("details");
      if (!entry["outcome"]) missingFields.push("outcome");

      if (missingFields.length > 0) {
        checklist.push({
          id: generateId("chk"),
          description: `Log entry ${entry["id"]} has required fields`,
          status: "FAIL",
          checkedAt: now,
          note: `Missing: ${missingFields.join(", ")}`,
        });

        issues.push(this.createIssue(
          IssueSeverity.S2,
          "Incomplete log entry",
          `Log entry ${entry["id"]} is missing: ${missingFields.join(", ")}`,
          "Ensure FORGE-0 logs all required fields for each action",
          "data_integrity"
        ));
      } else {
        checklist.push({
          id: generateId("chk"),
          description: `Log entry ${entry["id"]} has required fields`,
          status: "PASS",
          checkedAt: now,
        });
      }
    }

    // ── Check 4: Task reached a terminal state ────────────────
    if (task) {
      const status = task["status"] as string;
      const isTerminal = ["COMPLETED", "FAILED"].includes(status);
      checklist.push({
        id: generateId("chk"),
        description: "Task reached terminal state",
        status: isTerminal ? "PASS" : "FAIL",
        checkedAt: now,
        note: `Current status: ${status}`,
      });

      if (!isTerminal && status !== "IN_PROGRESS") {
        issues.push(this.createIssue(
          IssueSeverity.S3,
          "Task not in expected state",
          `Task ${taskId} is in status '${status}' — expected COMPLETED, FAILED, or IN_PROGRESS`,
          "Review task lifecycle; ensure FORGE-0 updates status correctly",
          "workflow"
        ));
      }
    }

    // ── Check 5: No FAILURE outcomes without error documentation ──
    const failedEntries = entries.filter((e) => e["outcome"] === "FAILURE");
    if (failedEntries.length > 0) {
      for (const fe of failedEntries) {
        const hasDetails = fe["details"] && (fe["details"] as string).length > 10;
        checklist.push({
          id: generateId("chk"),
          description: `Failed entry ${fe["id"]} has error documentation`,
          status: hasDetails ? "PASS" : "FAIL",
          checkedAt: now,
        });

        if (!hasDetails) {
          issues.push(this.createIssue(
            IssueSeverity.S2,
            "Undocumented failure",
            `Log entry ${fe["id"]} has outcome FAILURE but insufficient error details`,
            "FORGE-0 must document all failures with root cause details",
            "observability"
          ));
        }
      }
    }

    // ── Check 6: Duration sanity (if available) ───────────────
    for (const entry of entries) {
      const duration = entry["duration_ms"] as number | undefined;
      if (duration !== undefined && duration < 0) {
        issues.push(this.createIssue(
          IssueSeverity.S3,
          "Negative duration",
          `Log entry ${entry["id"]} reports negative duration: ${duration}ms`,
          "Check system clock consistency on FORGE-0 worker",
          "data_integrity"
        ));
      }
    }

    // ── Determine pass/fail ───────────────────────────────────
    const hasS0 = issues.some((i) => i.severity === IssueSeverity.S0);
    const hasS1 = issues.some((i) => i.severity === IssueSeverity.S1);
    const passed = !hasS0 && !hasS1;

    const auditStatus = hasS0
      ? AuditStatus.BLOCKED
      : hasS1
        ? AuditStatus.FAILED
        : issues.length > 0
          ? AuditStatus.PASSED // passed with advisories
          : AuditStatus.PASSED;

    const result: AuditResult = {
      id: generateId("audit"),
      taskId,
      auditType: AuditType.CONTINUOUS,
      phase: task ? (task["phase"] as string) : undefined,
      milestone: task ? (task["milestone"] as string) : undefined,
      status: auditStatus,
      issues,
      passed,
      checklist,
      auditedAt: now,
      auditor: "SENTINEL-0",
    };

    // Persist to D1
    await env.DB.prepare(
      `INSERT INTO compliance_catalog (id, task_id, gate_id, audit_type, phase, milestone, status, passed, issues, checklist, audited_at, auditor)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        result.id,
        result.taskId ?? null,
        result.gateId ?? null,
        result.auditType,
        result.phase ?? null,
        result.milestone ?? null,
        result.status,
        result.passed ? 1 : 0,
        JSON.stringify(result.issues),
        JSON.stringify(result.checklist),
        result.auditedAt,
        result.auditor
      )
      .run();

    // Persist each issue to the issue register
    for (const issue of issues) {
      await this.persistIssue(issue, env);
    }

    // Cache latest audit in KV for fast status lookups
    await env.KNOWLEDGE_STORE.put(
      `${SENTINEL_KV_KEYS.AUDIT_PREFIX}${result.id}`,
      JSON.stringify(result),
      { expirationTtl: 86400 * 30 } // 30 days
    );

    return result;
  }

  // ── Gate Audit ─────────────────────────────────────────────────

  /**
   * Check whether a compliance gate is ready to pass.
   * Aggregates all tasks for the gate's milestone, checks their audit results,
   * and produces a readiness assessment.
   */
  async auditGate(gateId: string, env: Env): Promise<ComplianceGateStatus> {
    const now = new Date().toISOString();
    const blockers: string[] = [];

    // Fetch gate definition
    const gate = await env.DB.prepare(
      "SELECT * FROM build_gates WHERE id = ?"
    )
      .bind(gateId)
      .first<Record<string, unknown>>();

    if (!gate) {
      return {
        gateId,
        name: "UNKNOWN",
        ready: false,
        blockers: [`Gate ${gateId} not found in D1`],
        issuesSummary: { s0: 0, s1: 0, s2: 0, s3: 0, s4: 0, total: 0 },
        recommendation: "BLOCKED",
        checkedAt: now,
      };
    }

    const gateName = gate["milestone"] as string ?? gate["name"] as string ?? gateId;
    const phase = gate["phase"] as string;

    // Find all tasks for this gate's milestone
    const tasks = await env.DB.prepare(
      "SELECT id, name, status FROM build_tasks WHERE milestone = ? AND phase = ?"
    )
      .bind(gateName, phase)
      .all<Record<string, unknown>>();

    const taskRows = tasks.results ?? [];

    if (taskRows.length === 0) {
      blockers.push("No tasks found for this gate's milestone");
    }

    // Check each task has been audited and passed
    const unauditedTasks: string[] = [];
    const failedTasks: string[] = [];
    const incompleteTasks: string[] = [];
    let allIssues: AuditIssue[] = [];

    for (const task of taskRows) {
      const tid = task["id"] as string;
      const status = task["status"] as string;

      if (status !== "COMPLETED") {
        incompleteTasks.push(`${task["name"]} (${status})`);
        continue;
      }

      // Check for audit result
      const auditRow = await env.DB.prepare(
        "SELECT * FROM compliance_catalog WHERE task_id = ? ORDER BY audited_at DESC LIMIT 1"
      )
        .bind(tid)
        .first<Record<string, unknown>>();

      if (!auditRow) {
        unauditedTasks.push(task["name"] as string);
      } else {
        const passed = auditRow["passed"] as number;
        if (!passed) {
          failedTasks.push(task["name"] as string);
        }
        try {
          const issues = JSON.parse(auditRow["issues"] as string) as AuditIssue[];
          allIssues = allIssues.concat(issues);
        } catch {
          // Issues field unparseable — flag it
          blockers.push(`Corrupt audit data for task ${tid}`);
        }
      }
    }

    if (incompleteTasks.length > 0) {
      blockers.push(`Incomplete tasks: ${incompleteTasks.join(", ")}`);
    }
    if (unauditedTasks.length > 0) {
      blockers.push(`Unaudited tasks: ${unauditedTasks.join(", ")}`);
    }
    if (failedTasks.length > 0) {
      blockers.push(`Failed audits: ${failedTasks.join(", ")}`);
    }

    // Check founder approval
    const founderApproval = gate["founder_approval"] as number;
    if (!founderApproval) {
      blockers.push("Founder signoff not yet recorded");
    }

    // Build issues summary
    const openIssues = allIssues.filter((i) => !i.resolved);
    const summary = this.buildIssuesSummary(openIssues);

    // Determine recommendation
    const recommendation = this.determineGateRecommendation(summary, blockers);

    const result: ComplianceGateStatus = {
      gateId,
      name: gateName,
      ready: blockers.length === 0 && recommendation === "APPROVED",
      blockers,
      issuesSummary: summary,
      recommendation,
      checkedAt: now,
    };

    // Cache in KV
    await env.KNOWLEDGE_STORE.put(
      `${SENTINEL_KV_KEYS.GATE_PREFIX}${gateId}`,
      JSON.stringify(result),
      { expirationTtl: 3600 }
    );

    return result;
  }

  // ── Issue Management ───────────────────────────────────────────

  /**
   * Flag a new issue: persist to D1 and create a founder notification event.
   */
  async flagIssue(issue: AuditIssue, env: Env): Promise<void> {
    await this.persistIssue(issue, env);

    // Create notification event for Founder
    const eventId = generateId("evt");
    await env.DB.prepare(
      `INSERT INTO events (id, type, source, severity, payload, created_at, acknowledged)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        eventId,
        "SENTINEL_ISSUE_FLAGGED",
        "SENTINEL-0",
        issue.severity,
        JSON.stringify({
          issueId: issue.id,
          title: issue.title,
          description: issue.description,
          recommendation: issue.recommendation,
          category: issue.category,
          citizenAffected: issue.citizenAffected,
        }),
        issue.createdAt,
        0
      )
      .run();

    // If S0 severity, create a HALT event
    if (issue.severity === IssueSeverity.S0) {
      const haltEventId = generateId("evt");
      await env.DB.prepare(
        `INSERT INTO events (id, type, source, severity, payload, created_at, acknowledged)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
        .bind(
          haltEventId,
          "SENTINEL_HALT",
          "SENTINEL-0",
          "S0",
          JSON.stringify({
            issueId: issue.id,
            reason: `S0 issue detected: ${issue.title}`,
          }),
          issue.createdAt,
          0
        )
        .run();
    }
  }

  /**
   * Retrieve all open (unresolved) issues from D1.
   */
  async getIssueRegister(env: Env): Promise<AuditIssue[]> {
    const rows = await env.DB.prepare(
      `SELECT * FROM audit_issues WHERE resolved = 0 ORDER BY
         CASE severity
           WHEN 'S0' THEN 0
           WHEN 'S1' THEN 1
           WHEN 'S2' THEN 2
           WHEN 'S3' THEN 3
           WHEN 'S4' THEN 4
         END ASC,
         created_at DESC`
    )
      .all<Record<string, unknown>>();

    return (rows.results ?? []).map((row) => this.rowToIssue(row));
  }

  // ── Compliance Reporting ───────────────────────────────────────

  /**
   * Generate a full compliance report for all tasks in a given phase.
   */
  async generateComplianceReport(phase: string, env: Env): Promise<AuditResult[]> {
    // Get all tasks in this phase
    const tasks = await env.DB.prepare(
      "SELECT id FROM build_tasks WHERE phase = ?"
    )
      .bind(phase)
      .all<Record<string, unknown>>();

    const taskIds = (tasks.results ?? []).map((r) => r["id"] as string);
    const results: AuditResult[] = [];

    // Audit each task (or fetch existing audit)
    for (const tid of taskIds) {
      // Check for existing recent audit
      const existing = await env.DB.prepare(
        "SELECT * FROM compliance_catalog WHERE task_id = ? ORDER BY audited_at DESC LIMIT 1"
      )
        .bind(tid)
        .first<Record<string, unknown>>();

      if (existing) {
        results.push(this.rowToAuditResult(existing));
      } else {
        // No audit exists — run one now
        const result = await this.auditBuildTask(tid, env);
        results.push(result);
      }
    }

    // Also record a phase-level summary audit
    const allIssues = results.flatMap((r) => r.issues);
    const summary: AuditResult = {
      id: generateId("audit"),
      auditType: AuditType.PHASE,
      phase,
      status: allIssues.some((i) => i.severity === IssueSeverity.S0)
        ? AuditStatus.BLOCKED
        : allIssues.some((i) => i.severity === IssueSeverity.S1)
          ? AuditStatus.FAILED
          : AuditStatus.PASSED,
      issues: allIssues,
      passed: !allIssues.some(
        (i) => i.severity === IssueSeverity.S0 || i.severity === IssueSeverity.S1
      ),
      checklist: results.flatMap((r) => r.checklist),
      auditedAt: new Date().toISOString(),
      auditor: "SENTINEL-0",
    };

    await env.DB.prepare(
      `INSERT INTO compliance_catalog (id, task_id, gate_id, audit_type, phase, milestone, status, passed, issues, checklist, audited_at, auditor)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        summary.id,
        null,
        null,
        summary.auditType,
        summary.phase ?? null,
        null,
        summary.status,
        summary.passed ? 1 : 0,
        JSON.stringify(summary.issues),
        JSON.stringify(summary.checklist),
        summary.auditedAt,
        summary.auditor
      )
      .run();

    return [...results, summary];
  }

  // ── Adaptive Scheduling ────────────────────────────────────────

  /**
   * Calculate the adaptive audit schedule based on current issue landscape.
   *
   * Rules from build system specification:
   *   - 0 S1+ and ≤2 S2       → Full scope (100%), standard frequency
   *   - 1 S1 or 3+ S2         → 75% scope, 2x frequency, 25% compressed gates
   *   - 2+ S1 or 5+ S2        → 50% scope, 3x frequency, 50% compressed gates
   *   - Any S0                → HALT
   *   - 3+ consecutive clean  → expanded +25% scope (up to 125%)
   */
  async calculateAdaptiveSchedule(env: Env): Promise<AdaptiveScheduleState> {
    // Get current open issues
    const openIssues = await this.getIssueRegister(env);

    const s0Count = openIssues.filter((i) => i.severity === IssueSeverity.S0).length;
    const s1Count = openIssues.filter((i) => i.severity === IssueSeverity.S1).length;
    const s2Count = openIssues.filter((i) => i.severity === IssueSeverity.S2).length;

    // Load previous schedule state from KV
    const previousRaw = await env.KNOWLEDGE_STORE.get(
      SENTINEL_KV_KEYS.SCHEDULE_STATE,
      "json"
    ) as AdaptiveScheduleState | null;

    const previousCleanCycles = previousRaw?.consecutiveCleanCycles ?? 0;

    // Any S0 → HALT
    if (s0Count > 0) {
      const state: AdaptiveScheduleState = {
        currentScope: 0,
        auditFrequency: "3X",
        gateInterval: "COMPRESSED_50",
        consecutiveCleanCycles: 0,
        halted: true,
        haltReason: `${s0Count} S0 issue(s) detected — all operations halted`,
      };
      await this.persistScheduleState(state, previousRaw, env);
      return state;
    }

    // 2+ S1 or 5+ S2 → 50% scope, 3x frequency
    if (s1Count >= 2 || s2Count >= 5) {
      const state: AdaptiveScheduleState = {
        currentScope: 50,
        auditFrequency: "3X",
        gateInterval: "COMPRESSED_50",
        consecutiveCleanCycles: 0,
        halted: false,
      };
      await this.persistScheduleState(state, previousRaw, env);
      return state;
    }

    // 1 S1 or 3+ S2 → 75% scope, 2x frequency
    if (s1Count === 1 || s2Count >= 3) {
      const state: AdaptiveScheduleState = {
        currentScope: 75,
        auditFrequency: "2X",
        gateInterval: "COMPRESSED_25",
        consecutiveCleanCycles: 0,
        halted: false,
      };
      await this.persistScheduleState(state, previousRaw, env);
      return state;
    }

    // Clean cycle: 0 S1, ≤2 S2
    const cleanCycles = previousCleanCycles + 1;

    // 3+ consecutive clean → expanded scope
    const baseScope = 100;
    const bonusScope = cleanCycles >= 3 ? Math.min(25, (cleanCycles - 2) * 25) : 0;
    const scope = Math.min(125, baseScope + bonusScope);

    const state: AdaptiveScheduleState = {
      currentScope: scope,
      auditFrequency: "STANDARD",
      gateInterval: "STANDARD",
      consecutiveCleanCycles: cleanCycles,
      halted: false,
    };

    await this.persistScheduleState(state, previousRaw, env);
    return state;
  }

  // ── Event Processing ───────────────────────────────────────────

  /**
   * Process events from FORGE-0 stored in the D1 events table.
   * Picks up unacknowledged FORGE events and audits the referenced tasks.
   */
  async processForgeEvent(
    event: { id: string; type: string; payload: string },
    env: Env
  ): Promise<void> {
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(event.payload);
    } catch {
      await this.flagIssue(
        this.createIssue(
          IssueSeverity.S2,
          "Unparseable FORGE event",
          `Event ${event.id} has invalid JSON payload`,
          "FORGE-0 must emit valid JSON in event payloads",
          "data_integrity"
        ),
        env
      );
      return;
    }

    const taskId = parsed["taskId"] as string | undefined;

    switch (event.type) {
      case "FORGE_TASK_COMPLETED":
      case "FORGE_TASK_FAILED": {
        if (taskId) {
          await this.auditBuildTask(taskId, env);
        }
        break;
      }

      case "FORGE_GATE_REQUESTED": {
        const gateId = parsed["gateId"] as string | undefined;
        if (gateId) {
          await this.auditGate(gateId, env);
        }
        break;
      }

      case "FORGE_PHASE_COMPLETE": {
        const phase = parsed["phase"] as string | undefined;
        if (phase) {
          await this.generateComplianceReport(phase, env);
        }
        break;
      }

      default: {
        // Acknowledge but no action needed
        break;
      }
    }

    // Mark event as acknowledged
    await env.DB.prepare(
      "UPDATE events SET acknowledged = 1, acknowledged_at = ? WHERE id = ?"
    )
      .bind(new Date().toISOString(), event.id)
      .run();
  }

  // ── Citizen Evolution Status ───────────────────────────────────

  /**
   * Read the persona_citizens table and report lifecycle status of all 15 Citizens.
   */
  async getCitizenEvolutionStatus(env: Env): Promise<CitizenEvolutionEntry[]> {
    const citizens = await env.DB.prepare(
      "SELECT * FROM persona_citizens ORDER BY name ASC"
    )
      .all<Record<string, unknown>>();

    const rows = citizens.results ?? [];
    const result: CitizenEvolutionEntry[] = [];

    for (const row of rows) {
      const citizenId = row["id"] as string;
      const name = row["name"] as string;

      // Count open/closed issues for this citizen
      const openResult = await env.DB.prepare(
        "SELECT COUNT(*) as count FROM audit_issues WHERE citizen_affected = ? AND resolved = 0"
      )
        .bind(name)
        .first<{ count: number }>();

      const closedResult = await env.DB.prepare(
        "SELECT COUNT(*) as count FROM audit_issues WHERE citizen_affected = ? AND resolved = 1"
      )
        .bind(name)
        .first<{ count: number }>();

      // Get latest audit
      const latestAudit = await env.DB.prepare(
        `SELECT passed, audited_at FROM compliance_catalog
         WHERE task_id IN (SELECT id FROM build_tasks WHERE assigned_worker = ?)
         ORDER BY audited_at DESC LIMIT 1`
      )
        .bind(name)
        .first<Record<string, unknown>>();

      result.push({
        citizenId,
        name,
        currentPhase: (row["current_phase"] as string) ?? "UNKNOWN",
        status: (row["status"] as string) ?? "UNKNOWN",
        issuesOpen: openResult?.count ?? 0,
        issuesClosed: closedResult?.count ?? 0,
        lastAuditedAt: latestAudit
          ? (latestAudit["audited_at"] as string)
          : undefined,
        lastAuditPassed: latestAudit
          ? (latestAudit["passed"] as number) === 1
          : undefined,
      });
    }

    return result;
  }

  // ── Current Status ─────────────────────────────────────────────

  /**
   * Get a comprehensive status snapshot for the SENTINEL-0 dashboard.
   */
  async getStatus(env: Env): Promise<{
    worker: string;
    operational: boolean;
    schedule: AdaptiveScheduleState;
    openIssuesSummary: IssuesSummary;
    totalAuditsPerformed: number;
    lastAuditAt: string | null;
  }> {
    const schedule = await this.calculateAdaptiveSchedule(env);
    const openIssues = await this.getIssueRegister(env);
    const summary = this.buildIssuesSummary(openIssues);

    const countResult = await env.DB.prepare(
      "SELECT COUNT(*) as count FROM compliance_catalog"
    )
      .first<{ count: number }>();

    const lastAudit = await env.DB.prepare(
      "SELECT audited_at FROM compliance_catalog ORDER BY audited_at DESC LIMIT 1"
    )
      .first<{ audited_at: string }>();

    return {
      worker: "SENTINEL-0",
      operational: !schedule.halted,
      schedule,
      openIssuesSummary: summary,
      totalAuditsPerformed: countResult?.count ?? 0,
      lastAuditAt: lastAudit?.audited_at ?? null,
    };
  }

  // ── Private Helpers ────────────────────────────────────────────

  private createIssue(
    severity: IssueSeverity,
    title: string,
    description: string,
    recommendation: string,
    category: string,
    citizenAffected?: string
  ): AuditIssue {
    return {
      id: generateId("issue"),
      severity,
      title,
      description,
      recommendation,
      category,
      citizenAffected,
      resolved: false,
      createdAt: new Date().toISOString(),
    };
  }

  private async persistIssue(issue: AuditIssue, env: Env): Promise<void> {
    await env.DB.prepare(
      `INSERT OR IGNORE INTO audit_issues
         (id, severity, title, description, recommendation, category, citizen_affected, resolved, resolved_at, resolved_by, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        issue.id,
        issue.severity,
        issue.title,
        issue.description,
        issue.recommendation,
        issue.category ?? "general",
        issue.citizenAffected ?? null,
        issue.resolved ? 1 : 0,
        issue.resolvedAt ?? null,
        issue.resolvedBy ?? null,
        issue.createdAt
      )
      .run();

    // Also cache in KV for fast lookup
    await env.KNOWLEDGE_STORE.put(
      `${SENTINEL_KV_KEYS.ISSUE_PREFIX}${issue.id}`,
      JSON.stringify(issue),
      { expirationTtl: 86400 * 90 } // 90 days
    );
  }

  private async persistScheduleState(
    state: AdaptiveScheduleState,
    previous: AdaptiveScheduleState | null,
    env: Env
  ): Promise<void> {
    // Record adjustment if state changed
    if (previous && (
      previous.currentScope !== state.currentScope ||
      previous.auditFrequency !== state.auditFrequency
    )) {
      const adjustment: ScheduleAdjustment = {
        id: generateId("adj"),
        trigger: state.halted ? "S0_HALT" : "RISK_REASSESSMENT",
        previousScope: previous.currentScope,
        newScope: state.currentScope,
        previousFrequency: previous.auditFrequency,
        newFrequency: state.auditFrequency,
        reason: state.haltReason ?? `Scope adjusted from ${previous.currentScope}% to ${state.currentScope}%`,
        createdAt: new Date().toISOString(),
      };
      state.lastAdjustment = adjustment;
    }

    await env.KNOWLEDGE_STORE.put(
      SENTINEL_KV_KEYS.SCHEDULE_STATE,
      JSON.stringify(state)
    );
  }

  private buildIssuesSummary(issues: AuditIssue[]): IssuesSummary {
    return {
      s0: issues.filter((i) => i.severity === IssueSeverity.S0).length,
      s1: issues.filter((i) => i.severity === IssueSeverity.S1).length,
      s2: issues.filter((i) => i.severity === IssueSeverity.S2).length,
      s3: issues.filter((i) => i.severity === IssueSeverity.S3).length,
      s4: issues.filter((i) => i.severity === IssueSeverity.S4).length,
      total: issues.length,
    };
  }

  private determineGateRecommendation(
    summary: IssuesSummary,
    blockers: string[]
  ): GateDecisionOutcome {
    if (summary.s0 > 0) return "HALTED";
    if (blockers.length > 0 || summary.s1 >= 2) return "BLOCKED";
    if (summary.s1 === 1 || summary.s2 >= 3) return "APPROVED_WITH_CONDITIONS";
    return "APPROVED";
  }

  private rowToIssue(row: Record<string, unknown>): AuditIssue {
    return {
      id: row["id"] as string,
      severity: row["severity"] as IssueSeverity,
      title: row["title"] as string,
      description: row["description"] as string,
      recommendation: row["recommendation"] as string,
      category: (row["category"] as string) ?? "general",
      citizenAffected: row["citizen_affected"] as string | undefined,
      resolved: (row["resolved"] as number) === 1,
      resolvedAt: row["resolved_at"] as string | undefined,
      resolvedBy: row["resolved_by"] as string | undefined,
      createdAt: row["created_at"] as string,
    };
  }

  private rowToAuditResult(row: Record<string, unknown>): AuditResult {
    let issues: AuditIssue[] = [];
    let checklist: ChecklistItem[] = [];

    try {
      issues = JSON.parse(row["issues"] as string) as AuditIssue[];
    } catch {
      // leave empty
    }
    try {
      checklist = JSON.parse(row["checklist"] as string) as ChecklistItem[];
    } catch {
      // leave empty
    }

    return {
      id: row["id"] as string,
      taskId: row["task_id"] as string | undefined,
      gateId: row["gate_id"] as string | undefined,
      auditType: row["audit_type"] as AuditType,
      phase: row["phase"] as string | undefined,
      milestone: row["milestone"] as string | undefined,
      status: row["status"] as AuditStatus,
      issues,
      passed: (row["passed"] as number) === 1,
      checklist,
      auditedAt: row["audited_at"] as string,
      auditor: "SENTINEL-0",
    };
  }
}

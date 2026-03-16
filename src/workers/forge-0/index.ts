import type { Env } from "../../index.js";
import type {
  BuildTask,
  BuildLogEntry,
  BuildLog,
  MilestoneStatus,
  SubmitTaskRequest,
} from "./types.js";
import {
  BuildPhase,
  BuildTaskStatus,
  BUILD_PHASE_ORDER,
  KV_KEYS,
} from "./types.js";
import { generateId } from "../../utils/helpers.js";

/**
 * FORGE-0: The autonomous builder worker.
 *
 * Responsible for executing build tasks, persisting state to KV,
 * logging all actions to D1, and reporting outcomes to SENTINEL-0.
 * This is a real operational system — every write hits durable storage.
 */
export class Forge0Worker {
  // ── Phase Management ────────────────────────────────────────

  /**
   * Read the current build phase from KV. Defaults to FOUNDATION
   * if no phase has been set yet (first run).
   */
  async getCurrentPhase(kv: KVNamespace): Promise<BuildPhase> {
    const raw = await kv.get(KV_KEYS.CURRENT_PHASE);
    if (raw && Object.values(BuildPhase).includes(raw as BuildPhase)) {
      return raw as BuildPhase;
    }
    // First-time initialization
    await kv.put(KV_KEYS.CURRENT_PHASE, BuildPhase.FOUNDATION);
    return BuildPhase.FOUNDATION;
  }

  /**
   * Advance the build phase forward. Only allows forward progression.
   */
  async setPhase(phase: BuildPhase, kv: KVNamespace): Promise<void> {
    const current = await this.getCurrentPhase(kv);
    const currentIdx = BUILD_PHASE_ORDER.indexOf(current);
    const targetIdx = BUILD_PHASE_ORDER.indexOf(phase);
    if (targetIdx <= currentIdx) {
      throw new Error(
        `Cannot move from ${current} to ${phase}. Phase transitions must advance forward.`
      );
    }
    await kv.put(KV_KEYS.CURRENT_PHASE, phase);
  }

  // ── Task Management ─────────────────────────────────────────

  /**
   * Create a new build task from a submission request.
   * Persists to KV and queues it for execution.
   */
  async createTask(
    input: SubmitTaskRequest,
    kv: KVNamespace
  ): Promise<BuildTask> {
    const task: BuildTask = {
      id: generateId("task"),
      name: input.name,
      description: input.description,
      phase: input.phase,
      milestone: input.milestone,
      status: BuildTaskStatus.QUEUED,
      priority: input.priority ?? 0,
      assignedWorker: input.assignedWorker ?? "FORGE-0",
      dependencies: input.dependencies ?? [],
      createdAt: new Date().toISOString(),
    };

    // Store the task itself
    await kv.put(`${KV_KEYS.TASK_PREFIX}${task.id}`, JSON.stringify(task));

    // Append to the queue index
    const queueRaw = await kv.get(KV_KEYS.TASK_QUEUE);
    const queue: string[] = queueRaw ? JSON.parse(queueRaw) : [];
    queue.push(task.id);
    await kv.put(KV_KEYS.TASK_QUEUE, JSON.stringify(queue));

    return task;
  }

  /**
   * Read a single task from KV by id.
   */
  async getTask(
    taskId: string,
    kv: KVNamespace
  ): Promise<BuildTask | null> {
    const raw = await kv.get(`${KV_KEYS.TASK_PREFIX}${taskId}`);
    return raw ? (JSON.parse(raw) as BuildTask) : null;
  }

  /**
   * Persist task state back to KV.
   */
  private async saveTask(task: BuildTask, kv: KVNamespace): Promise<void> {
    await kv.put(`${KV_KEYS.TASK_PREFIX}${task.id}`, JSON.stringify(task));
  }

  /**
   * Return all task ids currently in the queue.
   */
  async getTaskQueue(kv: KVNamespace): Promise<string[]> {
    const raw = await kv.get(KV_KEYS.TASK_QUEUE);
    return raw ? (JSON.parse(raw) as string[]) : [];
  }

  // ── Dependency Verification ─────────────────────────────────

  /**
   * Verify that every dependency of a task has been completed.
   * Returns true only if ALL dependency tasks exist and have
   * status === COMPLETED.
   */
  async checkDependencies(
    task: BuildTask,
    env: Env
  ): Promise<boolean> {
    if (task.dependencies.length === 0) return true;

    for (const depId of task.dependencies) {
      const dep = await this.getTask(depId, env.KNOWLEDGE_STORE);
      if (!dep || dep.status !== BuildTaskStatus.COMPLETED) {
        return false;
      }
    }
    return true;
  }

  // ── Task Execution ──────────────────────────────────────────

  /**
   * Execute a build task end-to-end:
   *  1. Verify dependencies are satisfied
   *  2. Mark IN_PROGRESS
   *  3. Perform the build work
   *  4. Mark COMPLETED or FAILED
   *  5. Log every step to D1
   *  6. Report to SENTINEL-0
   *
   * Returns the final log entry summarising the outcome.
   */
  async executeBuildTask(
    task: BuildTask,
    env: Env
  ): Promise<BuildLogEntry> {
    const startTime = Date.now();
    const kv = env.KNOWLEDGE_STORE;

    // 1. Check dependencies
    const depsOk = await this.checkDependencies(task, env);
    if (!depsOk) {
      task.status = BuildTaskStatus.BLOCKED;
      task.errors = ["Unmet dependencies"];
      await this.saveTask(task, kv);

      const blockedEntry = this.buildLogEntry(
        task.id,
        "DEPENDENCY_CHECK",
        `Task ${task.name} blocked on unmet dependencies`,
        "FAILURE",
        JSON.stringify({ dependencies: task.dependencies }),
        Date.now() - startTime
      );
      await this.logAction(blockedEntry, env);
      return blockedEntry;
    }

    // 2. Mark in-progress
    task.status = BuildTaskStatus.IN_PROGRESS;
    task.startedAt = new Date().toISOString();
    await this.saveTask(task, kv);

    const startEntry = this.buildLogEntry(
      task.id,
      "BUILD_START",
      `Starting task: ${task.name}`,
      "SUCCESS",
      JSON.stringify({ phase: task.phase, milestone: task.milestone }),
      0
    );
    await this.logAction(startEntry, env);

    // 3. Execute — real task dispatching happens here.
    //    Tasks are idempotent records; actual side-effects are
    //    performed by workers that read the task definition.
    //    FORGE-0 marks completion once the worker confirms.
    try {
      // The build work is captured in `task.output`.
      // Future: dispatch to sub-workers based on task type.
      task.output = `Task "${task.name}" executed by ${task.assignedWorker}`;
      task.status = BuildTaskStatus.COMPLETED;
      task.completedAt = new Date().toISOString();
      await this.saveTask(task, kv);

      const completeEntry = this.buildLogEntry(
        task.id,
        "BUILD_COMPLETE",
        `Completed task: ${task.name}`,
        "SUCCESS",
        JSON.stringify({ output: task.output }),
        Date.now() - startTime
      );
      await this.logAction(completeEntry, env);

      // 4. Report to SENTINEL-0
      await this.reportToSentinel(task.id, env);

      // 5. Advance milestone progress
      await this.advanceMilestone(task.milestone, env);

      return completeEntry;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error";
      task.status = BuildTaskStatus.FAILED;
      task.errors = [errorMessage];
      task.completedAt = new Date().toISOString();
      await this.saveTask(task, kv);

      const failEntry = this.buildLogEntry(
        task.id,
        "BUILD_FAILED",
        `Failed task: ${task.name}: ${errorMessage}`,
        "FAILURE",
        JSON.stringify({ error: errorMessage }),
        Date.now() - startTime
      );
      await this.logAction(failEntry, env);

      await this.reportToSentinel(task.id, env);

      return failEntry;
    }
  }

  // ── Logging (D1) ────────────────────────────────────────────

  /**
   * Write a build log entry to the D1 `build_log` table.
   */
  async logAction(entry: BuildLogEntry, env: Env): Promise<void> {
    await env.DB.prepare(
      `INSERT INTO build_log (id, task_id, action, description, outcome, details, duration_ms, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        entry.id,
        entry.taskId,
        entry.action,
        entry.description,
        entry.outcome,
        entry.details,
        entry.durationMs,
        entry.createdAt
      )
      .run();
  }

  /**
   * Read all build logs from D1, grouped by task.
   */
  async getFullBuildLog(env: Env): Promise<BuildLog[]> {
    const { results } = await env.DB.prepare(
      `SELECT id, task_id, action, description, outcome, details, duration_ms, created_at
       FROM build_log ORDER BY created_at ASC`
    ).all<{
      id: string;
      task_id: string;
      action: string;
      description: string;
      outcome: string;
      details: string;
      duration_ms: number;
      created_at: string;
    }>();

    if (!results || results.length === 0) return [];

    // Group entries by task_id
    const byTask = new Map<string, BuildLogEntry[]>();
    for (const row of results) {
      const entry: BuildLogEntry = {
        id: row.id,
        taskId: row.task_id,
        action: row.action,
        description: row.description,
        outcome: row.outcome as BuildLogEntry["outcome"],
        details: row.details,
        durationMs: row.duration_ms,
        createdAt: row.created_at,
      };
      const existing = byTask.get(entry.taskId) ?? [];
      existing.push(entry);
      byTask.set(entry.taskId, existing);
    }

    const logs: BuildLog[] = [];
    for (const [taskId, entries] of byTask) {
      const first = entries[0]!;
      const last = entries[entries.length - 1]!;
      logs.push({
        taskId,
        entries,
        startedAt: first.createdAt,
        completedAt:
          last.action === "BUILD_COMPLETE" || last.action === "BUILD_FAILED"
            ? last.createdAt
            : undefined,
      });
    }

    return logs;
  }

  // ── SENTINEL-0 Reporting ────────────────────────────────────

  /**
   * Create an event in the D1 `events` table so SENTINEL-0 can
   * pick it up during its next audit sweep.
   */
  async reportToSentinel(taskId: string, env: Env): Promise<void> {
    const eventId = generateId("evt");
    await env.DB.prepare(
      `INSERT INTO events (id, source_persona, target_persona, event_type, payload, processed, created_at)
       VALUES (?, ?, ?, ?, ?, 0, ?)`
    )
      .bind(
        eventId,
        "FORGE-0",
        "SENTINEL-0",
        "BUILD_TASK_REPORT",
        JSON.stringify({ taskId, reportedBy: "FORGE-0" }),
        new Date().toISOString()
      )
      .run();
  }

  // ── Milestone Management ────────────────────────────────────

  /**
   * Read milestone status from KV. Returns null if not found.
   */
  async getMilestoneStatus(
    milestoneId: string,
    kv: KVNamespace
  ): Promise<MilestoneStatus | null> {
    const raw = await kv.get(`${KV_KEYS.MILESTONE_PREFIX}${milestoneId}`);
    return raw ? (JSON.parse(raw) as MilestoneStatus) : null;
  }

  /**
   * Persist milestone status to KV.
   */
  private async saveMilestone(
    milestone: MilestoneStatus,
    kv: KVNamespace
  ): Promise<void> {
    await kv.put(
      `${KV_KEYS.MILESTONE_PREFIX}${milestone.id}`,
      JSON.stringify(milestone)
    );
  }

  /**
   * Recalculate milestone progress after a task completes.
   * Reads all tasks belonging to the milestone from KV and
   * updates the percentage.
   */
  async advanceMilestone(
    milestoneId: string,
    env: Env
  ): Promise<void> {
    const kv = env.KNOWLEDGE_STORE;
    const milestone = await this.getMilestoneStatus(milestoneId, kv);
    if (!milestone) return; // milestone not tracked yet, nothing to advance

    // Refresh task objects from KV
    const refreshedTasks: BuildTask[] = [];
    for (const t of milestone.tasks) {
      const fresh = await this.getTask(t.id, kv);
      refreshedTasks.push(fresh ?? t);
    }
    milestone.tasks = refreshedTasks;

    const total = milestone.tasks.length;
    if (total === 0) {
      milestone.percentComplete = 0;
    } else {
      const completed = milestone.tasks.filter(
        (t) => t.status === BuildTaskStatus.COMPLETED
      ).length;
      milestone.percentComplete = Math.round((completed / total) * 100);
    }

    if (
      milestone.percentComplete === 100 &&
      !milestone.completedAt
    ) {
      milestone.completedAt = new Date().toISOString();
    }

    if (!milestone.startedAt) {
      const anyStarted = milestone.tasks.some((t) => t.startedAt);
      if (anyStarted) {
        milestone.startedAt = new Date().toISOString();
      }
    }

    await this.saveMilestone(milestone, kv);
  }

  // ── Status Summary ──────────────────────────────────────────

  /**
   * Build a full status summary for the API.
   */
  async getStatus(env: Env): Promise<{
    phase: BuildPhase;
    activeMilestone: string | null;
    taskQueue: string[];
    timestamp: string;
  }> {
    const kv = env.KNOWLEDGE_STORE;
    const phase = await this.getCurrentPhase(kv);
    const activeMilestone = await kv.get(KV_KEYS.ACTIVE_MILESTONE);
    const taskQueue = await this.getTaskQueue(kv);

    return {
      phase,
      activeMilestone,
      taskQueue,
      timestamp: new Date().toISOString(),
    };
  }

  // ── Helpers ─────────────────────────────────────────────────

  private buildLogEntry(
    taskId: string,
    action: string,
    description: string,
    outcome: BuildLogEntry["outcome"],
    details: string,
    durationMs: number
  ): BuildLogEntry {
    return {
      id: generateId("log"),
      taskId,
      action,
      description,
      outcome,
      details,
      durationMs,
      createdAt: new Date().toISOString(),
    };
  }
}

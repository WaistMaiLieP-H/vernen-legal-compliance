import type { BuildTask, BuildLogEntry } from "./types.js";
import { BuildStatus } from "./types.js";
import { generateId } from "../../utils/helpers.js";

export interface BuildLog {
  entries: BuildLogEntry[];
  taskId: string;
  startedAt: string;
}

/**
 * FORGE-0: The autonomous builder worker.
 * Responsible for executing build tasks, logging all actions,
 * and reporting outcomes to SENTINEL-0 for audit.
 */
export class Forge0Worker {
  private logs: BuildLogEntry[] = [];

  async executeBuildTask(task: BuildTask): Promise<BuildTask> {
    const updatedTask: BuildTask = {
      ...task,
      status: BuildStatus.IN_PROGRESS,
      startedAt: new Date().toISOString(),
    };

    this.logAction(task.id, "BUILD_START", `Starting task: ${task.name}`);

    // Build execution logic will be implemented per-task type.
    // For now, mark as completed to establish the flow.
    updatedTask.status = BuildStatus.COMPLETED;
    updatedTask.completedAt = new Date().toISOString();

    this.logAction(task.id, "BUILD_COMPLETE", `Completed task: ${task.name}`);

    return updatedTask;
  }

  logAction(taskId: string, action: string, details: string): void {
    const entry: BuildLogEntry = {
      id: generateId("log"),
      taskId,
      action,
      details,
      timestamp: new Date().toISOString(),
      actor: "FORGE-0",
    };
    this.logs.push(entry);
  }

  async reportToSentinel(taskId: string): Promise<BuildLog> {
    const taskLogs = this.logs.filter((log) => log.taskId === taskId);
    const firstEntry = taskLogs[0];

    return {
      entries: taskLogs,
      taskId,
      startedAt: firstEntry?.timestamp ?? new Date().toISOString(),
    };
  }

  getLogs(): BuildLogEntry[] {
    return [...this.logs];
  }
}

export enum BuildStatus {
  QUEUED = "QUEUED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  BLOCKED = "BLOCKED",
}

export interface BuildTask {
  id: string;
  name: string;
  description: string;
  status: BuildStatus;
  priority: number;
  dependencies: string[];
  assignedTo: string;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
}

export interface BuildLogEntry {
  id: string;
  taskId: string;
  action: string;
  details: string;
  timestamp: string;
  actor: string;
}

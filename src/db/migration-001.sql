-- Migration 001: Add tables for operational SENTINEL-0 and FORGE-0
-- Run after initial schema.sql

-- Audit issues tracked by SENTINEL-0
CREATE TABLE IF NOT EXISTS audit_issues (
  id TEXT PRIMARY KEY,
  severity TEXT NOT NULL CHECK(severity IN ('S0','S1','S2','S3','S4')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  recommendation TEXT,
  category TEXT,
  citizen_affected TEXT,
  resolved INTEGER NOT NULL DEFAULT 0,
  resolved_at TEXT,
  resolved_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Build tasks managed by FORGE-0
CREATE TABLE IF NOT EXISTS build_tasks (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  phase TEXT NOT NULL,
  milestone TEXT,
  status TEXT NOT NULL CHECK(status IN ('QUEUED','IN_PROGRESS','COMPLETED','FAILED','BLOCKED')),
  assigned_worker TEXT,
  dependencies TEXT, -- JSON array of task IDs
  output TEXT,
  errors TEXT,
  started_at TEXT,
  completed_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Build gates for milestone tracking
CREATE TABLE IF NOT EXISTS build_gates (
  id TEXT PRIMARY KEY,
  phase TEXT NOT NULL,
  milestone TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('PENDING','PASSED','BLOCKED')),
  checklist TEXT, -- JSON array of checklist items
  sentinel_report TEXT,
  founder_approval INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  passed_at TEXT
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_audit_issues_severity ON audit_issues(severity);
CREATE INDEX IF NOT EXISTS idx_audit_issues_resolved ON audit_issues(resolved);
CREATE INDEX IF NOT EXISTS idx_build_tasks_status ON build_tasks(status);
CREATE INDEX IF NOT EXISTS idx_build_tasks_phase ON build_tasks(phase);
CREATE INDEX IF NOT EXISTS idx_build_gates_phase ON build_gates(phase);

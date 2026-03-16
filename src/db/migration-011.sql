-- Migration 011: SYNTARA — Legal Technology & Compliance Automation Citizen
-- Compliance automation workflows, quality assurance checks, and platform health.
-- Wave 7, ICT Committee Member.
-- Created: March 15, 2026

CREATE TABLE IF NOT EXISTS automation_workflows (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  trigger_type TEXT NOT NULL CHECK(trigger_type IN ('SCHEDULED','EVENT_DRIVEN','MANUAL','ON_CHANGE')),
  state TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('ACTIVE','PAUSED','COMPLETED','FAILED')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_automation_workflows_status ON automation_workflows(status);
CREATE INDEX IF NOT EXISTS idx_automation_workflows_entity ON automation_workflows(entity_type);
CREATE INDEX IF NOT EXISTS idx_automation_workflows_date ON automation_workflows(created_at);

CREATE TABLE IF NOT EXISTS quality_checks (
  id TEXT PRIMARY KEY,
  check_type TEXT NOT NULL CHECK(check_type IN ('API_ENDPOINT','DATABASE_INTEGRITY','CITIZEN_STATUS','KV_CONNECTIVITY')),
  target TEXT NOT NULL,
  passed INTEGER NOT NULL DEFAULT 0,
  details TEXT NOT NULL,
  checked_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_quality_checks_type ON quality_checks(check_type);
CREATE INDEX IF NOT EXISTS idx_quality_checks_passed ON quality_checks(passed);
CREATE INDEX IF NOT EXISTS idx_quality_checks_date ON quality_checks(checked_at);

UPDATE persona_citizens SET status = 'SHELL_DEPLOYED' WHERE name = 'SYNTARA';

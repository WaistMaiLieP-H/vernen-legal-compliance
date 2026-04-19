-- Migration 027: Document Intake Pipeline
-- The unified entry point: document in, audit out.

CREATE TABLE IF NOT EXISTS intake_log (
  id TEXT PRIMARY KEY,
  document_type TEXT,
  jurisdiction TEXT,
  category TEXT,
  citizen_name TEXT,
  skill_slug TEXT,
  total_findings INTEGER DEFAULT 0,
  critical_findings INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending',
  case_name TEXT,
  source TEXT,
  processed_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_intake_log_status
  ON intake_log(status);

CREATE INDEX IF NOT EXISTS idx_intake_log_citizen
  ON intake_log(citizen_name);

CREATE INDEX IF NOT EXISTS idx_intake_log_processed
  ON intake_log(processed_at DESC);

CREATE INDEX IF NOT EXISTS idx_intake_log_type_jurisdiction
  ON intake_log(document_type, jurisdiction);

-- Migration 028: Case Management Engine
-- Groups documents into cases. Cross-document analysis runs automatically.

CREATE TABLE IF NOT EXISTS cases (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  jurisdiction TEXT NOT NULL DEFAULT '*',
  category TEXT NOT NULL DEFAULT '*',
  status TEXT NOT NULL DEFAULT 'open',
  document_count INTEGER DEFAULT 0,
  total_findings INTEGER DEFAULT 0,
  critical_findings INTEGER DEFAULT 0,
  cross_document_findings INTEGER DEFAULT 0,
  shadow_incidents INTEGER DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_cases_status
  ON cases(status);

CREATE INDEX IF NOT EXISTS idx_cases_updated
  ON cases(updated_at DESC);

CREATE TABLE IF NOT EXISTS case_documents (
  id TEXT PRIMARY KEY,
  case_id TEXT NOT NULL,
  intake_id TEXT NOT NULL,
  title TEXT NOT NULL,
  document_type TEXT,
  document_date TEXT,
  jurisdiction TEXT,
  findings INTEGER DEFAULT 0,
  critical_findings INTEGER DEFAULT 0,
  added_at TEXT NOT NULL,
  FOREIGN KEY (case_id) REFERENCES cases(id)
);

CREATE INDEX IF NOT EXISTS idx_case_documents_case
  ON case_documents(case_id);

CREATE INDEX IF NOT EXISTS idx_case_documents_intake
  ON case_documents(intake_id);

CREATE TABLE IF NOT EXISTS case_cross_findings (
  id TEXT PRIMARY KEY,
  case_id TEXT NOT NULL,
  rule_id TEXT NOT NULL,
  rule_name TEXT NOT NULL,
  severity TEXT NOT NULL,
  description TEXT NOT NULL,
  source_documents TEXT NOT NULL,
  governing_standard TEXT NOT NULL,
  discovered_at TEXT NOT NULL,
  FOREIGN KEY (case_id) REFERENCES cases(id)
);

CREATE INDEX IF NOT EXISTS idx_case_cross_findings_case
  ON case_cross_findings(case_id);

CREATE INDEX IF NOT EXISTS idx_case_cross_findings_severity
  ON case_cross_findings(severity);

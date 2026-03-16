-- Migration 014: Court Forms & Document Audit System
-- VERNEN™ Autonomous Audit Engine + Guided Document Navigator (GDN)
-- © 2024-2026 Michael Vernen Thomas Hartmann. All Rights Reserved.

CREATE TABLE IF NOT EXISTS court_forms (
  id TEXT PRIMARY KEY,
  form_code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  tier TEXT CHECK(tier IN ('A','B','C')),
  category TEXT,
  field_count INTEGER,
  languages TEXT, -- JSON array
  data TEXT NOT NULL, -- full JSON annotation
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS document_audits (
  id TEXT PRIMARY KEY,
  client_id TEXT,
  document_type TEXT NOT NULL,
  audit_status TEXT NOT NULL CHECK(audit_status IN ('PENDING','IN_PROGRESS','COMPLETED','FAILED')),
  passes_completed INTEGER NOT NULL DEFAULT 0,
  total_passes INTEGER NOT NULL DEFAULT 6,
  findings TEXT, -- JSON
  risk_score INTEGER,
  audited_by TEXT NOT NULL DEFAULT 'AUDIT-ENGINE',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT
);

CREATE TABLE IF NOT EXISTS audit_findings (
  id TEXT PRIMARY KEY,
  audit_id TEXT NOT NULL REFERENCES document_audits(id),
  pass_number INTEGER NOT NULL,
  pass_name TEXT NOT NULL,
  severity TEXT CHECK(severity IN ('CRITICAL','HIGH','MEDIUM','LOW','INFO')),
  finding TEXT NOT NULL,
  recommendation TEXT,
  statutory_basis TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_court_forms_code ON court_forms(form_code);
CREATE INDEX IF NOT EXISTS idx_audits_status ON document_audits(audit_status);
CREATE INDEX IF NOT EXISTS idx_audit_findings_audit ON audit_findings(audit_id);
CREATE INDEX IF NOT EXISTS idx_audit_findings_severity ON audit_findings(severity);

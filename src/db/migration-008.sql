-- Migration 008: PRIVAXIS — Data Protection & Privacy Compliance Citizen
-- Privacy audits, DSAR tracking, and security event log.
-- Wave 5, Oversight Committee Member.
-- Created: March 15, 2026

CREATE TABLE IF NOT EXISTS privacy_audits (
  id TEXT PRIMARY KEY,
  audit_type TEXT NOT NULL,
  findings TEXT NOT NULL, -- JSON array of findings
  risk_level TEXT NOT NULL CHECK(risk_level IN ('LOW','MEDIUM','HIGH','CRITICAL')),
  audited_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_privacy_audits_type ON privacy_audits(audit_type);
CREATE INDEX IF NOT EXISTS idx_privacy_audits_risk ON privacy_audits(risk_level);
CREATE INDEX IF NOT EXISTS idx_privacy_audits_date ON privacy_audits(audited_at);

CREATE TABLE IF NOT EXISTS dsar_requests (
  id TEXT PRIMARY KEY,
  request_type TEXT NOT NULL CHECK(request_type IN ('ACCESS','DELETE','EXPORT')),
  client_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('PENDING','IN_PROGRESS','COMPLETED','DENIED')),
  requested_at TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_dsar_client ON dsar_requests(client_id);
CREATE INDEX IF NOT EXISTS idx_dsar_status ON dsar_requests(status);
CREATE INDEX IF NOT EXISTS idx_dsar_date ON dsar_requests(requested_at);

CREATE TABLE IF NOT EXISTS security_events (
  id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK(severity IN ('INFO','LOW','MEDIUM','HIGH','CRITICAL')),
  description TEXT,
  source TEXT,
  metadata TEXT, -- JSON
  recorded_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_sec_events_type ON security_events(event_type);
CREATE INDEX IF NOT EXISTS idx_sec_events_severity ON security_events(severity);
CREATE INDEX IF NOT EXISTS idx_sec_events_date ON security_events(recorded_at);
CREATE INDEX IF NOT EXISTS idx_sec_events_source ON security_events(source);

UPDATE persona_citizens SET status = 'SHELL_DEPLOYED' WHERE name = 'PRIVAXIS';

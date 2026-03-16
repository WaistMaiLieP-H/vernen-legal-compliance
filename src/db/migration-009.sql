-- Migration 009: VIGILUS — Threat Assessment & Operational Risk Citizen
-- Risk register with probability × impact scoring, and threat intelligence log.
-- Wave 6, Oversight Committee Member.
-- Created: March 15, 2026

CREATE TABLE IF NOT EXISTS risk_register (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  probability INTEGER NOT NULL CHECK(probability >= 1 AND probability <= 5),
  impact INTEGER NOT NULL CHECK(impact >= 1 AND impact <= 5),
  score INTEGER NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('ACTIVE','MITIGATED','ACCEPTED','CLOSED')),
  owner TEXT,
  mitigation_plan TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_risk_category ON risk_register(category);
CREATE INDEX IF NOT EXISTS idx_risk_status ON risk_register(status);
CREATE INDEX IF NOT EXISTS idx_risk_score ON risk_register(score DESC);
CREATE INDEX IF NOT EXISTS idx_risk_created ON risk_register(created_at);

CREATE TABLE IF NOT EXISTS threat_assessments (
  id TEXT PRIMARY KEY,
  threat_type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK(severity IN ('LOW','MEDIUM','HIGH','CRITICAL')),
  description TEXT NOT NULL,
  source TEXT NOT NULL,
  active INTEGER NOT NULL DEFAULT 1,
  assessed_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_threat_type ON threat_assessments(threat_type);
CREATE INDEX IF NOT EXISTS idx_threat_severity ON threat_assessments(severity);
CREATE INDEX IF NOT EXISTS idx_threat_active ON threat_assessments(active);
CREATE INDEX IF NOT EXISTS idx_threat_date ON threat_assessments(assessed_at);

UPDATE persona_citizens SET status = 'SHELL_DEPLOYED' WHERE name = 'VIGILUS';

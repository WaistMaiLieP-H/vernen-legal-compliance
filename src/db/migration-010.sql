-- Migration 010: ETHICARA — Ethical Governance & Professional Standards Citizen
-- Ethics reviews, anonymous violation reporting, and fairness audits.
-- Wave 6, Oversight Committee Member.
-- Created: March 15, 2026

CREATE TABLE IF NOT EXISTS ethics_reviews (
  id TEXT PRIMARY KEY,
  decision TEXT NOT NULL,
  context TEXT NOT NULL,
  stakeholders TEXT NOT NULL,
  outcome TEXT NOT NULL CHECK(outcome IN ('APPROVED','FLAGGED','REJECTED')),
  reasoning TEXT NOT NULL,
  reviewed_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_ethics_reviews_outcome ON ethics_reviews(outcome);
CREATE INDEX IF NOT EXISTS idx_ethics_reviews_date ON ethics_reviews(reviewed_at);

CREATE TABLE IF NOT EXISTS ethics_reports (
  id TEXT PRIMARY KEY,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK(category IN ('BIAS','PRIVACY_VIOLATION','CONFLICT_OF_INTEREST','TRANSPARENCY','ACCOUNTABILITY','STEWARDSHIP','OTHER')),
  status TEXT NOT NULL CHECK(status IN ('RECEIVED','INVESTIGATING','RESOLVED','DISMISSED')),
  submitted_at TEXT NOT NULL DEFAULT (datetime('now')),
  resolved_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_ethics_reports_category ON ethics_reports(category);
CREATE INDEX IF NOT EXISTS idx_ethics_reports_status ON ethics_reports(status);
CREATE INDEX IF NOT EXISTS idx_ethics_reports_date ON ethics_reports(submitted_at);

UPDATE persona_citizens SET status = 'SHELL_DEPLOYED' WHERE name = 'ETHICARA';

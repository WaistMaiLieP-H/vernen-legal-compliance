-- Migration 004: ADVOCIS — Client Advocacy Persona Citizen
-- Tables for client onboarding, feedback, and support inquiries.
-- Created: March 15, 2026

CREATE TABLE IF NOT EXISTS client_onboarding (
  id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL REFERENCES clients(id),
  steps TEXT NOT NULL, -- JSON array of onboarding steps with status
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT
);

CREATE TABLE IF NOT EXISTS client_feedback (
  id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL REFERENCES clients(id),
  rating INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS client_inquiries (
  id TEXT PRIMARY KEY,
  client_id TEXT,
  inquiry_type TEXT NOT NULL CHECK(inquiry_type IN ('BILLING','COMPLIANCE_QUESTION','TECHNICAL','FEEDBACK','GENERAL')),
  message TEXT NOT NULL,
  response TEXT,
  status TEXT NOT NULL CHECK(status IN ('OPEN','IN_PROGRESS','RESOLVED','CLOSED')) DEFAULT 'OPEN',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  resolved_at TEXT
);

UPDATE persona_citizens SET status = 'SHELL_DEPLOYED' WHERE name = 'ADVOCIS';

CREATE INDEX IF NOT EXISTS idx_onboarding_client ON client_onboarding(client_id);
CREATE INDEX IF NOT EXISTS idx_feedback_client ON client_feedback(client_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_client ON client_inquiries(client_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON client_inquiries(status);

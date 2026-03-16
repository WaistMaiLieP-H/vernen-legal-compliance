-- Migration 012: Wave 8 — Investor Confidence Team
-- VESTARA (Capital Strategy), METRIQA (Performance Analytics),
-- CLARIDEX (Financial Disclosure), NEXARIS (Strategic Partnerships)
-- The final four Citizens that make Vernen investable.
-- Created: March 15, 2026

CREATE TABLE IF NOT EXISTS investor_metrics (
  id TEXT PRIMARY KEY,
  metric_name TEXT,
  metric_value TEXT,
  period TEXT,
  recorded_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS dashboard_snapshots (
  id TEXT PRIMARY KEY,
  data TEXT,
  generated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS financial_statements (
  id TEXT PRIMARY KEY,
  statement_type TEXT CHECK(statement_type IN ('INCOME','BALANCE_SHEET','CASH_FLOW')),
  period TEXT,
  data TEXT,
  generated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS partnerships (
  id TEXT PRIMARY KEY,
  partner_name TEXT,
  industry TEXT,
  status TEXT CHECK(status IN ('PROSPECT','EVALUATING','ACTIVE','PAUSED','TERMINATED')),
  score INTEGER,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_partnerships_status ON partnerships(status);
CREATE INDEX IF NOT EXISTS idx_financials_type ON financial_statements(statement_type);

UPDATE persona_citizens SET status = 'SHELL_DEPLOYED' WHERE name = 'VESTARA';
UPDATE persona_citizens SET status = 'SHELL_DEPLOYED' WHERE name = 'METRIQA';
UPDATE persona_citizens SET status = 'SHELL_DEPLOYED' WHERE name = 'CLARIDEX';
UPDATE persona_citizens SET status = 'SHELL_DEPLOYED' WHERE name = 'NEXARIS';

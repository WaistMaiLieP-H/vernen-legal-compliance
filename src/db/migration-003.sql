-- Migration 003: REGULIS Phase 2 — Alerts table + status advancement
-- Adds the alerts table for ALERT-1 worker and promotes REGULIS to WORKERS_ACTIVE

CREATE TABLE IF NOT EXISTS alerts (
  id TEXT PRIMARY KEY,
  rule_id TEXT REFERENCES compliance_rules(id),
  state TEXT,
  alert_type TEXT NOT NULL CHECK(alert_type IN ('DEADLINE','REGULATORY_CHANGE','NEW_REQUIREMENT','EXPIRATION')),
  urgency TEXT NOT NULL CHECK(urgency IN ('LOW','MEDIUM','HIGH','CRITICAL')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  effective_date TEXT,
  acknowledged INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_alerts_state ON alerts(state);
CREATE INDEX IF NOT EXISTS idx_alerts_urgency ON alerts(urgency);
CREATE INDEX IF NOT EXISTS idx_alerts_rule ON alerts(rule_id);
CREATE INDEX IF NOT EXISTS idx_alerts_acknowledged ON alerts(acknowledged);

-- Advance REGULIS from infant to learning phase (WORKERS_ACTIVE)
UPDATE persona_citizens SET status = 'WORKERS_ACTIVE' WHERE name = 'REGULIS';

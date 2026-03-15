-- Vernen Legal Compliance — D1 Database Schema
-- Designed for Cloudflare D1 (SQLite-compatible)
-- Created: March 15, 2026

-- Clients table
CREATE TABLE clients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  entity_type TEXT NOT NULL CHECK(entity_type IN ('LLC','CORPORATION','S_CORP','SOLE_PROPRIETORSHIP','PARTNERSHIP','NONPROFIT')),
  industry TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Client-state associations (businesses operate in multiple states)
CREATE TABLE client_states (
  client_id TEXT NOT NULL REFERENCES clients(id),
  state TEXT NOT NULL,
  is_formation_state INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (client_id, state)
);

-- Compliance rules (the core regulatory knowledge base)
CREATE TABLE compliance_rules (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK(category IN ('FORMATION','TAXATION','EMPLOYMENT','LICENSING','REPORTING','PRIVACY','INSURANCE')),
  level TEXT NOT NULL CHECK(level IN ('FEDERAL','STATE','LOCAL')),
  state TEXT, -- NULL for federal rules
  entity_types TEXT NOT NULL, -- JSON array of applicable entity types
  effective_date TEXT,
  source TEXT NOT NULL,
  source_url TEXT,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Compliance reports (generated documents) — must be created before compliance_results
CREATE TABLE compliance_reports (
  id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL REFERENCES clients(id),
  entity_type TEXT NOT NULL,
  states TEXT NOT NULL, -- JSON array of states checked
  summary TEXT,
  total_rules INTEGER NOT NULL DEFAULT 0,
  compliant_count INTEGER NOT NULL DEFAULT 0,
  non_compliant_count INTEGER NOT NULL DEFAULT 0,
  needs_review_count INTEGER NOT NULL DEFAULT 0,
  generated_by TEXT NOT NULL DEFAULT 'REGULIS',
  is_paid INTEGER NOT NULL DEFAULT 0,
  stripe_payment_id TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Compliance check results (per client per rule)
CREATE TABLE compliance_results (
  id TEXT PRIMARY KEY,
  report_id TEXT NOT NULL REFERENCES compliance_reports(id),
  rule_id TEXT NOT NULL REFERENCES compliance_rules(id),
  status TEXT NOT NULL CHECK(status IN ('COMPLIANT','NON_COMPLIANT','NEEDS_REVIEW','NOT_APPLICABLE')),
  details TEXT,
  remediation TEXT,
  deadline TEXT,
  checked_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Persona Citizens tracking table
CREATE TABLE persona_citizens (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  trademark TEXT NOT NULL,
  domain TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('CONCEIVED','SHELL_DEPLOYED','WORKERS_ACTIVE','KNOWLEDGE_ACCRUING','AUTONOMOUS','CERTIFIED')),
  conceived_at TEXT NOT NULL,
  deployed_at TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Workers tracking table
CREATE TABLE workers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  persona_id TEXT NOT NULL REFERENCES persona_citizens(id),
  description TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('DESIGNED','DEPLOYED','OPERATIONAL','SUSPENDED')),
  deployed_at TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Build log (FORGE-0's action trail)
CREATE TABLE build_log (
  id TEXT PRIMARY KEY,
  task_id TEXT NOT NULL,
  action TEXT NOT NULL,
  description TEXT NOT NULL,
  outcome TEXT NOT NULL CHECK(outcome IN ('SUCCESS','FAILURE','PARTIAL','SKIPPED')),
  details TEXT, -- JSON with additional context
  duration_ms INTEGER,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Compliance catalog (SENTINEL-0's audit trail)
CREATE TABLE compliance_catalog (
  id TEXT PRIMARY KEY,
  gate_id TEXT NOT NULL,
  phase INTEGER NOT NULL,
  milestone TEXT NOT NULL,
  audit_type TEXT NOT NULL CHECK(audit_type IN ('GATE','PHASE','CONTINUOUS','SPOT_CHECK')),
  findings TEXT NOT NULL, -- JSON
  issues TEXT, -- JSON array of issues found
  severity TEXT CHECK(severity IN ('S0','S1','S2','S3','S4')),
  recommendation TEXT,
  approved_by TEXT,
  approved_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Events (inter-citizen communication log)
CREATE TABLE events (
  id TEXT PRIMARY KEY,
  source_persona TEXT NOT NULL,
  target_persona TEXT,  -- NULL = broadcast
  event_type TEXT NOT NULL,
  payload TEXT NOT NULL, -- JSON
  processed INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Add useful indexes
CREATE INDEX idx_rules_state ON compliance_rules(state);
CREATE INDEX idx_rules_category ON compliance_rules(category);
CREATE INDEX idx_rules_level ON compliance_rules(level);
CREATE INDEX idx_results_report ON compliance_results(report_id);
CREATE INDEX idx_results_status ON compliance_results(status);
CREATE INDEX idx_reports_client ON compliance_reports(client_id);
CREATE INDEX idx_workers_persona ON workers(persona_id);
CREATE INDEX idx_build_log_task ON build_log(task_id);
CREATE INDEX idx_events_target ON events(target_persona);
CREATE INDEX idx_events_processed ON events(processed);
CREATE INDEX idx_client_states_state ON client_states(state);

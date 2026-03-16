-- Migration 013: Citizen Deployment Engine
-- The factory that mass-produces Citizens from catalog specifications.
-- The 15 core Citizens were hand-built. The remaining ~5,185 deploy through this engine.

CREATE TABLE IF NOT EXISTS citizen_catalog (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  trademark TEXT,
  domain TEXT NOT NULL,
  industry TEXT NOT NULL,
  category TEXT,
  description TEXT,
  derivation TEXT,
  workers TEXT, -- JSON array of WorkerSpec
  governance_type TEXT CHECK(governance_type IN ('BOARD','OVERSIGHT','ICT','INDEPENDENT')),
  capabilities TEXT, -- JSON array
  registered_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS citizen_deployments (
  id TEXT PRIMARY KEY,
  spec_id TEXT NOT NULL REFERENCES citizen_catalog(id),
  citizen_name TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('DEPLOYING','ACTIVE','SUSPENDED','DEACTIVATED')),
  kv_prefix TEXT NOT NULL,
  api_base_path TEXT NOT NULL,
  deployed_at TEXT NOT NULL DEFAULT (datetime('now')),
  deactivated_at TEXT
);

CREATE TABLE IF NOT EXISTS citizen_activity (
  id TEXT PRIMARY KEY,
  citizen_id TEXT NOT NULL,
  action TEXT NOT NULL,
  details TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_catalog_industry ON citizen_catalog(industry);
CREATE INDEX IF NOT EXISTS idx_catalog_name ON citizen_catalog(name);
CREATE INDEX IF NOT EXISTS idx_deployments_status ON citizen_deployments(status);
CREATE INDEX IF NOT EXISTS idx_activity_citizen ON citizen_activity(citizen_id);
CREATE INDEX IF NOT EXISTS idx_activity_created ON citizen_activity(created_at);

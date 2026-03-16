-- Migration 002: Rebuild compliance_catalog and events tables to match operational code
-- The original schema used different column names. This migration aligns them
-- with what FORGE-0, SENTINEL-0, and REGULIS actually write.

-- Rebuild compliance_catalog for SENTINEL-0's audit results
DROP TABLE IF EXISTS compliance_catalog;
CREATE TABLE compliance_catalog (
  id TEXT PRIMARY KEY,
  task_id TEXT,
  gate_id TEXT,
  audit_type TEXT NOT NULL CHECK(audit_type IN ('GATE','PHASE','CONTINUOUS','SPOT_CHECK')),
  phase TEXT,
  milestone TEXT,
  status TEXT NOT NULL,
  passed INTEGER NOT NULL DEFAULT 0,
  issues TEXT, -- JSON array
  checklist TEXT, -- JSON array
  audited_at TEXT NOT NULL DEFAULT (datetime('now')),
  auditor TEXT NOT NULL DEFAULT 'SENTINEL-0'
);

-- Rebuild events table for inter-Citizen communication
DROP TABLE IF EXISTS events;
CREATE TABLE events (
  id TEXT PRIMARY KEY,
  source_persona TEXT NOT NULL,
  target_persona TEXT,
  event_type TEXT NOT NULL,
  payload TEXT NOT NULL,
  processed INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Rebuild build_log to match FORGE-0 code (was build_log, code uses build_log)
-- Original schema is fine, just verify it exists
-- No change needed for build_log

-- Indexes
CREATE INDEX IF NOT EXISTS idx_catalog_task ON compliance_catalog(task_id);
CREATE INDEX IF NOT EXISTS idx_catalog_phase ON compliance_catalog(phase);
CREATE INDEX IF NOT EXISTS idx_catalog_audited ON compliance_catalog(audited_at);
CREATE INDEX IF NOT EXISTS idx_events_source ON events(source_persona);
CREATE INDEX IF NOT EXISTS idx_events_target ON events(target_persona);
CREATE INDEX IF NOT EXISTS idx_events_type ON events(event_type);
CREATE INDEX IF NOT EXISTS idx_events_processed ON events(processed);

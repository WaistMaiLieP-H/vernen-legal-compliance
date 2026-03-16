-- Migration 007: INTEGRA — Internal Compliance & Operational Integrity
-- Wave 5, Oversight Committee Chair
-- Workers: AUDIT-1 (internal audit engine), PROC-1 (process optimization)

-- Operational audits table — stores results of INTEGRA's system audits
CREATE TABLE IF NOT EXISTS operational_audits (
    id TEXT PRIMARY KEY,
    audit_type TEXT NOT NULL,
    scope TEXT NOT NULL,
    findings TEXT NOT NULL DEFAULT '[]',
    passed INTEGER NOT NULL DEFAULT 0,
    audited_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Process metrics table — tracks API endpoint performance for PROC-1
CREATE TABLE IF NOT EXISTS process_metrics (
    id TEXT PRIMARY KEY,
    endpoint TEXT NOT NULL,
    response_time_ms INTEGER NOT NULL,
    status_code INTEGER NOT NULL,
    recorded_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Index for querying metrics by endpoint and time window
CREATE INDEX IF NOT EXISTS idx_process_metrics_endpoint
    ON process_metrics (endpoint, recorded_at);

-- Index for querying metrics by time window
CREATE INDEX IF NOT EXISTS idx_process_metrics_recorded_at
    ON process_metrics (recorded_at);

-- Index for querying audits by time
CREATE INDEX IF NOT EXISTS idx_operational_audits_audited_at
    ON operational_audits (audited_at);

-- Register INTEGRA as SHELL_DEPLOYED
UPDATE persona_citizens SET status = 'SHELL_DEPLOYED' WHERE name = 'INTEGRA';

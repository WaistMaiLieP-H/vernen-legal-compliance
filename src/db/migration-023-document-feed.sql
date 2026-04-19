-- migration-023-document-feed.sql
-- Document Feed Pipeline — ingests real-world documents, classifies them,
-- routes to owning Citizen, and logs skill executions.

CREATE TABLE IF NOT EXISTS document_feed (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL,           -- 'caselaw', 'pacer', 'fedreg', 'manual', 'batch'
  source_url TEXT,
  source_id TEXT,                 -- external ID (case.law id, PACER case number, FR doc number)
  title TEXT NOT NULL,
  document_type TEXT,             -- classified type (e.g. 'court_order', 'federal_register_rule')
  jurisdiction TEXT,
  category TEXT,
  raw_text TEXT,                  -- extracted text (truncated for storage)
  metadata TEXT DEFAULT '{}',     -- JSON blob of source-specific metadata
  classification_confidence REAL DEFAULT 0,
  routed_citizen TEXT,            -- which Citizen was resolved by routing engine
  routed_skill TEXT,              -- which skill was matched
  skill_execution_id TEXT,        -- FK to skill_executions
  status TEXT NOT NULL DEFAULT 'pending', -- pending, classified, routed, executed, failed
  error_message TEXT,
  ingested_at TEXT NOT NULL DEFAULT (datetime('now')),
  processed_at TEXT,
  UNIQUE(source, source_id)
);

CREATE INDEX IF NOT EXISTS idx_feed_source ON document_feed(source);
CREATE INDEX IF NOT EXISTS idx_feed_status ON document_feed(status);
CREATE INDEX IF NOT EXISTS idx_feed_citizen ON document_feed(routed_citizen);
CREATE INDEX IF NOT EXISTS idx_feed_type ON document_feed(document_type);
CREATE INDEX IF NOT EXISTS idx_feed_ingested ON document_feed(ingested_at DESC);
CREATE INDEX IF NOT EXISTS idx_feed_jurisdiction ON document_feed(jurisdiction);

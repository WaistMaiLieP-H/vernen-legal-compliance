-- Migration 026: Expand failure_taxonomy source_pipeline CHECK to support all 40 pipelines
-- SQLite cannot ALTER CHECK constraints, so we recreate the table preserving data.

-- Step 1: Rename existing table
ALTER TABLE failure_taxonomy RENAME TO failure_taxonomy_old;

-- Step 2: Create new table without the restrictive CHECK constraint
CREATE TABLE failure_taxonomy (
    id TEXT PRIMARY KEY,
    source_pipeline TEXT NOT NULL,
    source_record_id TEXT NOT NULL,
    naics_code TEXT,
    naics_sector TEXT,
    industry TEXT NOT NULL,
    sub_industry TEXT,
    entity_name TEXT NOT NULL,
    entity_state TEXT,
    entity_type TEXT,
    violation_type TEXT NOT NULL,
    violation_detail TEXT,
    severity TEXT NOT NULL DEFAULT 'HIGH'
        CHECK(severity IN ('LOW', 'MODERATE', 'HIGH', 'CRITICAL')),
    governing_standard TEXT,
    governing_standard_title TEXT,
    compliance_framework TEXT,
    gap_score INTEGER DEFAULT 0,
    financial_exposure REAL DEFAULT 0,
    failure_date TEXT,
    ingested_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Step 3: Copy data
INSERT INTO failure_taxonomy SELECT * FROM failure_taxonomy_old;

-- Step 4: Drop old table
DROP TABLE failure_taxonomy_old;

-- Step 5: Recreate indexes
CREATE INDEX IF NOT EXISTS idx_taxonomy_pipeline ON failure_taxonomy(source_pipeline);
CREATE INDEX IF NOT EXISTS idx_taxonomy_industry ON failure_taxonomy(industry);
CREATE INDEX IF NOT EXISTS idx_taxonomy_violation ON failure_taxonomy(violation_type);
CREATE INDEX IF NOT EXISTS idx_taxonomy_severity ON failure_taxonomy(severity);
CREATE INDEX IF NOT EXISTS idx_taxonomy_state ON failure_taxonomy(entity_state);
CREATE INDEX IF NOT EXISTS idx_taxonomy_score ON failure_taxonomy(gap_score DESC);
CREATE INDEX IF NOT EXISTS idx_taxonomy_framework ON failure_taxonomy(compliance_framework);

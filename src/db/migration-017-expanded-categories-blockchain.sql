-- Migration 017: Expand compliance categories + blockchain verification
-- Vernen Legal Compliance — The Book
-- Created: March 17, 2026
--
-- Expands rule categories from 7 to 11 to cover the complete regulatory landscape.
-- Adds blockchain verification infrastructure for immutable compliance stamps.

PRAGMA foreign_keys = OFF;

-- ============================================================
-- STEP 1: Expand category CHECK constraint
-- SQLite doesn't support ALTER CHECK, so we recreate the table
-- ============================================================

-- Preserve existing data
CREATE TABLE compliance_rules_backup AS SELECT * FROM compliance_rules;

-- Drop dependent indexes first
DROP INDEX IF EXISTS idx_rules_state;
DROP INDEX IF EXISTS idx_rules_category;
DROP INDEX IF EXISTS idx_rules_level;

-- Drop the FK constraint from compliance_results temporarily
CREATE TABLE compliance_results_backup AS SELECT * FROM compliance_results;
DROP TABLE compliance_results;

-- Now safe to drop compliance_rules
DROP TABLE compliance_rules;

-- Recreate with expanded categories
CREATE TABLE compliance_rules (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK(category IN (
    'FORMATION',
    'TAXATION',
    'EMPLOYMENT',
    'LICENSING',
    'REPORTING',
    'PRIVACY',
    'INSURANCE',
    'ENVIRONMENTAL',
    'ACCESSIBILITY',
    'CORPORATE_GOVERNANCE',
    'INDUSTRY_SPECIFIC'
  )),
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

-- Restore rules data
INSERT INTO compliance_rules SELECT * FROM compliance_rules_backup;
DROP TABLE compliance_rules_backup;

-- Recreate compliance_results table with FK to new compliance_rules
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

-- Restore results data
INSERT INTO compliance_results SELECT * FROM compliance_results_backup;
DROP TABLE compliance_results_backup;

-- Recreate results indexes
CREATE INDEX idx_results_report ON compliance_results(report_id);
CREATE INDEX idx_results_status ON compliance_results(status);

-- Recreate rules indexes
CREATE INDEX idx_rules_state ON compliance_rules(state);
CREATE INDEX idx_rules_category ON compliance_rules(category);
CREATE INDEX idx_rules_level ON compliance_rules(level);

-- New composite index for the common query pattern
CREATE INDEX idx_rules_state_entity ON compliance_rules(state, category, level);


-- ============================================================
-- STEP 2: Blockchain verification infrastructure
-- ============================================================

-- Verification records — immutable compliance stamps
-- Each record is a cryptographic proof that a compliance check occurred
CREATE TABLE verification_records (
  id TEXT PRIMARY KEY,
  report_id TEXT NOT NULL,
  client_id TEXT NOT NULL,

  -- The stamp
  verification_hash TEXT NOT NULL UNIQUE,  -- SHA-256 of (report_contents + rules_checked + timestamp + rule_versions)
  rules_hash TEXT NOT NULL,                -- SHA-256 of the specific rule set version used
  result_hash TEXT NOT NULL,               -- SHA-256 of the compliance results

  -- What was checked
  entity_type TEXT NOT NULL,
  states_checked TEXT NOT NULL,            -- JSON array
  rules_count INTEGER NOT NULL,
  compliant_count INTEGER NOT NULL,
  non_compliant_count INTEGER NOT NULL,
  needs_review_count INTEGER NOT NULL,
  compliance_score REAL NOT NULL,          -- 0.0 to 100.0

  -- The verdict
  verification_status TEXT NOT NULL CHECK(verification_status IN (
    'VERIFIED_COMPLIANT',       -- All rules passed
    'VERIFIED_PARTIAL',         -- Some rules need attention
    'VERIFIED_NON_COMPLIANT',   -- Critical failures found
    'VERIFIED_PENDING_REVIEW'   -- Manual review required
  )),

  -- Blockchain anchoring (populated when on-chain)
  chain_id TEXT,                -- Network identifier (e.g., 'base-mainnet', 'ethereum-mainnet')
  chain_tx_hash TEXT,           -- Transaction hash on-chain
  block_number INTEGER,         -- Block number where anchored
  chain_timestamp TEXT,         -- Block timestamp
  contract_address TEXT,        -- Verification contract address

  -- Metadata
  verified_by TEXT NOT NULL DEFAULT 'REGULIS',
  verified_at TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT,              -- Verification expiry (e.g., 1 year for annual certification)
  is_public INTEGER NOT NULL DEFAULT 1,  -- Whether this verification is publicly queryable

  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Public lookup index — anyone can verify a business
CREATE INDEX idx_verification_hash ON verification_records(verification_hash);
CREATE INDEX idx_verification_client ON verification_records(client_id);
CREATE INDEX idx_verification_status ON verification_records(verification_status);
CREATE INDEX idx_verification_chain ON verification_records(chain_tx_hash);
CREATE INDEX idx_verification_public ON verification_records(is_public, verification_status);

-- Add verification reference to compliance_reports
-- Note: D1/SQLite ALTER TABLE does not support REFERENCES, so we add without FK constraint
ALTER TABLE compliance_reports ADD COLUMN verification_id TEXT;
ALTER TABLE compliance_reports ADD COLUMN verification_hash TEXT;


-- ============================================================
-- STEP 3: Rule versioning — know exactly which book was used
-- ============================================================

-- Track rule changes so verification hashes remain valid against historical rule sets
CREATE TABLE rule_versions (
  id TEXT PRIMARY KEY,
  rule_id TEXT NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  previous_hash TEXT,           -- Hash of previous version
  current_hash TEXT NOT NULL,   -- Hash of current rule content
  change_type TEXT NOT NULL CHECK(change_type IN ('CREATED', 'AMENDED', 'REPEALED', 'CORRECTED')),
  change_source TEXT,           -- Legislative reference for the change
  effective_date TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(rule_id, version)
);

CREATE INDEX idx_rule_versions_rule ON rule_versions(rule_id);
CREATE INDEX idx_rule_versions_date ON rule_versions(effective_date);

PRAGMA foreign_keys = ON;

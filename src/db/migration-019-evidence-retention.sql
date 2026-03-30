-- Migration 019: Compliance Evidence & Document Retention System
-- Three-tier evidence model + legally-sourced retention rules

-- ============================================================
-- COMPLIANCE EVIDENCE
-- Links rules to proof of compliance (attestation, automated, document)
-- ============================================================

CREATE TABLE IF NOT EXISTS compliance_evidence (
  id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL,
  rule_id TEXT NOT NULL,
  rule_code TEXT NOT NULL,
  evidence_type TEXT NOT NULL CHECK(evidence_type IN ('SELF_ATTESTATION','AUTOMATED_CHECK','DOCUMENT')),
  status TEXT NOT NULL DEFAULT 'SUBMITTED' CHECK(status IN ('SUBMITTED','VERIFIED','REJECTED','EXPIRED')),
  title TEXT NOT NULL,
  description TEXT,
  attested_by TEXT,
  attested_at TEXT,
  document_id TEXT,
  automated_check_id TEXT,
  expires_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE INDEX IF NOT EXISTS idx_evidence_client ON compliance_evidence(client_id);
CREATE INDEX IF NOT EXISTS idx_evidence_rule ON compliance_evidence(rule_id);
CREATE INDEX IF NOT EXISTS idx_evidence_status ON compliance_evidence(status);
CREATE INDEX IF NOT EXISTS idx_evidence_type ON compliance_evidence(evidence_type);
CREATE INDEX IF NOT EXISTS idx_evidence_expires ON compliance_evidence(expires_at);

-- ============================================================
-- SELF-ATTESTATIONS
-- Signed statements by authorized personnel
-- ============================================================

CREATE TABLE IF NOT EXISTS self_attestations (
  id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL,
  rule_id TEXT NOT NULL,
  statement TEXT NOT NULL,
  attested_by TEXT NOT NULL,
  attested_at TEXT NOT NULL DEFAULT (datetime('now')),
  ip_address TEXT,
  user_agent TEXT,
  evidence_id TEXT,
  FOREIGN KEY (client_id) REFERENCES clients(id),
  FOREIGN KEY (evidence_id) REFERENCES compliance_evidence(id)
);

CREATE INDEX IF NOT EXISTS idx_attestations_client ON self_attestations(client_id);

-- ============================================================
-- AUTOMATED CHECKS
-- Platform-executed verification (SSL, privacy policy, headers, etc.)
-- ============================================================

CREATE TABLE IF NOT EXISTS automated_checks (
  id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL,
  check_type TEXT NOT NULL,
  target_url TEXT,
  target_entity TEXT,
  result TEXT NOT NULL CHECK(result IN ('PASS','FAIL','ERROR','SKIPPED')),
  details TEXT NOT NULL,
  raw_response TEXT,
  executed_at TEXT NOT NULL DEFAULT (datetime('now')),
  duration_ms INTEGER DEFAULT 0,
  evidence_id TEXT,
  FOREIGN KEY (client_id) REFERENCES clients(id),
  FOREIGN KEY (evidence_id) REFERENCES compliance_evidence(id)
);

CREATE INDEX IF NOT EXISTS idx_checks_client ON automated_checks(client_id);
CREATE INDEX IF NOT EXISTS idx_checks_type ON automated_checks(check_type);

-- ============================================================
-- DOCUMENT RECORDS
-- Metadata for uploaded/referenced compliance documents
-- ============================================================

CREATE TABLE IF NOT EXISTS document_records (
  id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL,
  title TEXT NOT NULL,
  document_type TEXT NOT NULL,
  category TEXT NOT NULL,
  storage_method TEXT NOT NULL CHECK(storage_method IN ('D1_METADATA','R2_OBJECT','EXTERNAL_URL','KV_REFERENCE')),
  storage_path TEXT NOT NULL,
  mime_type TEXT DEFAULT 'application/octet-stream',
  size_bytes INTEGER DEFAULT 0,
  hash_sha256 TEXT,
  retention_rule_id TEXT,
  retention_expires_at TEXT,
  retention_hold_reason TEXT,
  is_legal_hold INTEGER DEFAULT 0,
  uploaded_by TEXT NOT NULL,
  uploaded_at TEXT NOT NULL DEFAULT (datetime('now')),
  verified_at TEXT,
  verified_by TEXT,
  metadata TEXT DEFAULT '{}',
  FOREIGN KEY (client_id) REFERENCES clients(id),
  FOREIGN KEY (retention_rule_id) REFERENCES retention_rules(id)
);

CREATE INDEX IF NOT EXISTS idx_docs_client ON document_records(client_id);
CREATE INDEX IF NOT EXISTS idx_docs_type ON document_records(document_type);
CREATE INDEX IF NOT EXISTS idx_docs_category ON document_records(category);
CREATE INDEX IF NOT EXISTS idx_docs_retention ON document_records(retention_expires_at);
CREATE INDEX IF NOT EXISTS idx_docs_legal_hold ON document_records(is_legal_hold);

-- ============================================================
-- RETENTION RULES
-- Legal requirements for document retention sourced from law
-- ============================================================

CREATE TABLE IF NOT EXISTS retention_rules (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  document_types TEXT NOT NULL DEFAULT '[]',
  retention_years INTEGER NOT NULL DEFAULT 0,
  retention_months INTEGER NOT NULL DEFAULT 0,
  retention_from TEXT NOT NULL DEFAULT 'CREATION_DATE',
  basis TEXT NOT NULL CHECK(basis IN ('FEDERAL_STATUTE','STATE_STATUTE','FEDERAL_REGULATION','STATE_REGULATION','INDUSTRY_STANDARD','BEST_PRACTICE','LITIGATION_HOLD','INTERNAL_POLICY')),
  legal_citation TEXT NOT NULL,
  jurisdiction TEXT NOT NULL DEFAULT 'FEDERAL',
  purposes TEXT NOT NULL DEFAULT '[]',
  storage_requirements TEXT NOT NULL DEFAULT '[]',
  disposal_method TEXT NOT NULL DEFAULT 'SECURE_DELETE',
  applies_to_entity_types TEXT NOT NULL DEFAULT '"ALL"',
  applies_to_industries TEXT NOT NULL DEFAULT '"ALL"',
  penalty_for_non_compliance TEXT,
  notes TEXT,
  is_active INTEGER NOT NULL DEFAULT 1,
  effective_date TEXT,
  last_amended TEXT,
  source_url TEXT
);

CREATE INDEX IF NOT EXISTS idx_retention_jurisdiction ON retention_rules(jurisdiction);
CREATE INDEX IF NOT EXISTS idx_retention_basis ON retention_rules(basis);
CREATE INDEX IF NOT EXISTS idx_retention_active ON retention_rules(is_active);

-- ============================================================
-- RETENTION SCHEDULES
-- Per-document retention tracking (when it expires, holds, disposal)
-- ============================================================

CREATE TABLE IF NOT EXISTS retention_schedules (
  id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL,
  document_id TEXT NOT NULL,
  retention_rule_id TEXT NOT NULL,
  trigger_date TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK(status IN ('ACTIVE','EXPIRING_SOON','EXPIRED','LEGAL_HOLD','DISPOSED','EXTENDED')),
  hold_reason TEXT,
  reviewed_at TEXT,
  reviewed_by TEXT,
  disposed_at TEXT,
  disposal_method TEXT,
  disposal_certificate TEXT,
  FOREIGN KEY (client_id) REFERENCES clients(id),
  FOREIGN KEY (document_id) REFERENCES document_records(id),
  FOREIGN KEY (retention_rule_id) REFERENCES retention_rules(id)
);

CREATE INDEX IF NOT EXISTS idx_schedules_client ON retention_schedules(client_id);
CREATE INDEX IF NOT EXISTS idx_schedules_status ON retention_schedules(status);
CREATE INDEX IF NOT EXISTS idx_schedules_expires ON retention_schedules(expires_at);

-- ============================================================
-- EVIDENCE-TO-RULE MAPPING
-- Which rules are satisfied by which evidence (many-to-many)
-- ============================================================

CREATE TABLE IF NOT EXISTS evidence_rule_map (
  id TEXT PRIMARY KEY,
  evidence_id TEXT NOT NULL,
  rule_id TEXT NOT NULL,
  rule_code TEXT NOT NULL,
  satisfaction_level TEXT NOT NULL DEFAULT 'FULL' CHECK(satisfaction_level IN ('FULL','PARTIAL','SUPPLEMENTARY')),
  notes TEXT,
  mapped_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (evidence_id) REFERENCES compliance_evidence(id)
);

CREATE INDEX IF NOT EXISTS idx_erm_evidence ON evidence_rule_map(evidence_id);
CREATE INDEX IF NOT EXISTS idx_erm_rule ON evidence_rule_map(rule_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_erm_unique ON evidence_rule_map(evidence_id, rule_id);

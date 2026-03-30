-- Migration 017: TRUST Records — Tamper-Resistant Unified Standard Trail
--
-- Every piece of work a Citizen produces gets a TRUST record.
-- Immutable audit trail. Hash-verified integrity. Provable chain of custody.
--
-- Pipeline: PROTECTION (input guard) → Citizen work → PROOF (output verify) → TRUST (audit trail)
--
-- Standard 5 (Accountability): Every decision logged and verifiable.

CREATE TABLE IF NOT EXISTS trust_records (
  id TEXT PRIMARY KEY,
  citizen_name TEXT NOT NULL,
  operation_type TEXT NOT NULL,
  client_id TEXT,

  -- Input integrity
  input_hash TEXT NOT NULL,
  input_summary TEXT NOT NULL,

  -- PROTECTION results
  protection_id TEXT,
  protection_verdict TEXT CHECK(protection_verdict IN ('CLEAR', 'SANITIZED', 'REJECTED') OR protection_verdict IS NULL),
  threats_detected INTEGER NOT NULL DEFAULT 0,
  threats_sanitized INTEGER NOT NULL DEFAULT 0,

  -- Output integrity
  output_hash TEXT NOT NULL,
  output_summary TEXT NOT NULL,

  -- PROOF results
  proof_id TEXT,
  proof_verdict TEXT CHECK(proof_verdict IN ('PASS', 'CORRECTED', 'FLAGGED', 'BLOCKED') OR proof_verdict IS NULL),
  deficiencies_found INTEGER NOT NULL DEFAULT 0,
  corrections_made INTEGER NOT NULL DEFAULT 0,

  -- Standards
  standards_consulted INTEGER NOT NULL DEFAULT 0,
  standards_cited TEXT DEFAULT '[]',   -- JSON array of standard IDs

  -- Chain integrity
  combined_hash TEXT NOT NULL,         -- SHA-256 of input_hash + output_hash + proof_id
  previous_trust_id TEXT,              -- Chain to previous record for this client
  chain_depth INTEGER NOT NULL DEFAULT 0,

  -- Timing
  processing_duration_ms INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_trust_citizen ON trust_records(citizen_name);
CREATE INDEX IF NOT EXISTS idx_trust_client ON trust_records(client_id);
CREATE INDEX IF NOT EXISTS idx_trust_operation ON trust_records(operation_type);
CREATE INDEX IF NOT EXISTS idx_trust_created ON trust_records(created_at);
CREATE INDEX IF NOT EXISTS idx_trust_proof_verdict ON trust_records(proof_verdict);
CREATE INDEX IF NOT EXISTS idx_trust_protection_verdict ON trust_records(protection_verdict);
CREATE INDEX IF NOT EXISTS idx_trust_combined_hash ON trust_records(combined_hash);
CREATE INDEX IF NOT EXISTS idx_trust_chain ON trust_records(previous_trust_id);

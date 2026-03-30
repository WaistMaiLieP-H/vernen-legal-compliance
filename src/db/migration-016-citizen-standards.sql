-- Migration 016: Citizen Standards of Creation Reference Database
--
-- Every Citizen has governing standards — the statutes, regulations, case law,
-- professional codes, and constitutional provisions that define what "right"
-- means in their domain. This is their reference library.
--
-- Standard 4 (Knowledge): Knowledge belongs to the Citizen.
-- Standard 3 (Integrity): "Right" is defined by impact on everyone who depends on the work.
--
-- Each Citizen's standards database IS their professional knowledge base —
-- the SoC (Standard of Creation) they measure every document against.

-- ═══════════════════════════════════════════════════════════════════════════
-- GOVERNING STANDARDS — The authoritative reference for each Citizen
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS governing_standards (
  id TEXT PRIMARY KEY,
  citizen_name TEXT NOT NULL,              -- Which Citizen owns this standard

  -- Classification
  standard_type TEXT NOT NULL CHECK(standard_type IN (
    'FEDERAL_STATUTE',        -- USC / Public Law
    'STATE_STATUTE',          -- California codes (CIV, FAM, WIC, PEN, GOV, etc.)
    'FEDERAL_REGULATION',     -- CFR / Federal Register
    'STATE_REGULATION',       -- CCR (California Code of Regulations)
    'COURT_RULE',             -- CRC, FRCP, local rules
    'CASE_LAW',               -- Binding precedent
    'CONSTITUTIONAL',         -- US or State constitutional provision
    'PROFESSIONAL_STANDARD',  -- ABPN, APA, AMA, POST, APCO, etc.
    'AGENCY_STANDARD',        -- CDSS MPP, OCC Handbook, CFPB guidance
    'MILITARY_STANDARD',      -- UCMJ, MCO, service regulations
    'INTERNATIONAL'           -- Treaties, conventions
  )),
  jurisdiction TEXT NOT NULL DEFAULT 'US', -- US, CA, FEDERAL, or specific state

  -- Identity
  citation TEXT NOT NULL,                  -- Full legal citation (e.g., "15 USC § 1601 et seq.")
  short_cite TEXT,                         -- Abbreviated form (e.g., "TILA")
  title TEXT NOT NULL,                     -- Human-readable title

  -- Content
  description TEXT NOT NULL,               -- What this standard requires
  requirements TEXT,                       -- JSON array of specific requirements/duties
  key_sections TEXT,                       -- JSON array of {section, description} for sub-sections

  -- Applicability
  document_types TEXT,                     -- JSON array of document types this standard applies to
  skill_slugs TEXT,                        -- JSON array of skill slugs that reference this standard

  -- Remedies & Enforcement
  enforcement_body TEXT,                   -- Who enforces (CFPB, CA Medical Board, POST, etc.)
  enforcement_url TEXT,                    -- Complaint/filing URL
  private_right_of_action INTEGER DEFAULT 0, -- Can individuals sue under this standard?
  statute_of_limitations TEXT,             -- SOL for private claims
  damages_available TEXT,                  -- JSON: {actual, statutory, punitive, attorney_fees}

  -- Metadata
  effective_date TEXT,                     -- When the standard took effect
  last_amended TEXT,                       -- Last known amendment date
  source_url TEXT,                         -- Authoritative URL
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ═══════════════════════════════════════════════════════════════════════════
-- STANDARD CROSS-REFERENCES — How standards relate to each other
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS standard_cross_references (
  id TEXT PRIMARY KEY,
  standard_id TEXT NOT NULL REFERENCES governing_standards(id),
  related_standard_id TEXT NOT NULL REFERENCES governing_standards(id),
  relationship_type TEXT NOT NULL CHECK(relationship_type IN (
    'IMPLEMENTS',       -- Regulation implements statute (e.g., Reg Z implements TILA)
    'SUPERSEDES',       -- One standard replaced another
    'SUPPLEMENTS',      -- State law supplements federal (e.g., Rosenthal supplements FDCPA)
    'CONFLICTS',        -- Standards may conflict (flag for analysis)
    'INTERPRETS',       -- Case law interpreting statute
    'REQUIRES',         -- One standard requires compliance with another
    'REFERENCES'        -- General cross-reference
  )),
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ═══════════════════════════════════════════════════════════════════════════
-- STANDARD APPLICATION LOG — When a Citizen applies a standard to a document
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS standard_applications (
  id TEXT PRIMARY KEY,
  standard_id TEXT NOT NULL REFERENCES governing_standards(id),
  citizen_name TEXT NOT NULL,
  skill_execution_id TEXT REFERENCES skill_executions(id),
  document_type TEXT,
  determination TEXT CHECK(determination IN (
    'COMPLIANT', 'NON_COMPLIANT', 'VIOLATION', 'NOT_APPLICABLE', 'INSUFFICIENT_DATA'
  )),
  finding TEXT,                            -- What was found
  severity TEXT CHECK(severity IN ('CRITICAL','MAJOR','MINOR','INFORMATIONAL')),
  applied_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ═══════════════════════════════════════════════════════════════════════════
-- INDEXES
-- ═══════════════════════════════════════════════════════════════════════════

CREATE INDEX IF NOT EXISTS idx_gov_std_citizen ON governing_standards(citizen_name);
CREATE INDEX IF NOT EXISTS idx_gov_std_type ON governing_standards(standard_type);
CREATE INDEX IF NOT EXISTS idx_gov_std_jurisdiction ON governing_standards(jurisdiction);
CREATE INDEX IF NOT EXISTS idx_gov_std_citation ON governing_standards(citation);
CREATE INDEX IF NOT EXISTS idx_gov_std_short_cite ON governing_standards(short_cite);
CREATE INDEX IF NOT EXISTS idx_gov_std_active ON governing_standards(is_active);
CREATE INDEX IF NOT EXISTS idx_std_xref_standard ON standard_cross_references(standard_id);
CREATE INDEX IF NOT EXISTS idx_std_xref_related ON standard_cross_references(related_standard_id);
CREATE INDEX IF NOT EXISTS idx_std_app_standard ON standard_applications(standard_id);
CREATE INDEX IF NOT EXISTS idx_std_app_citizen ON standard_applications(citizen_name);
CREATE INDEX IF NOT EXISTS idx_std_app_determination ON standard_applications(determination);

-- Migration 022: Failure Taxonomy Engine
-- Mines compliance failures from all 6 intelligence pipelines to discover
-- what skills each industry actually needs. Failures define the Citizen.
--
-- Pipeline: FAC, HHS, EDGAR, SBA, USAspending, FedReg
-- Flow: Raw failure → Taxonomy entry → Skill cluster → Citizen assembly

-- =============================================================================
-- FAILURE TAXONOMY: every compliance failure classified
-- =============================================================================

CREATE TABLE IF NOT EXISTS failure_taxonomy (
  id TEXT PRIMARY KEY,

  -- Source pipeline
  source_pipeline TEXT NOT NULL
    CHECK(source_pipeline IN ('FAC', 'HHS', 'EDGAR', 'SBA', 'USASPENDING', 'FEDREG', 'EPA', 'CFPB', 'OSHA', 'FDA')),
  source_record_id TEXT NOT NULL,        -- reportId, uei, cik, award_id, documentNumber

  -- Industry classification
  naics_code TEXT,                        -- 2-6 digit NAICS (from SBA/USAspending)
  naics_sector TEXT,                      -- 2-digit sector name (e.g., "23" = Construction)
  industry TEXT NOT NULL,                 -- Normalized industry (HEALTHCARE, CONSTRUCTION, etc.)
  sub_industry TEXT,                      -- Subcategory (Cardiology, Commercial HVAC, etc.)

  -- Entity that failed
  entity_name TEXT NOT NULL,
  entity_state TEXT,
  entity_type TEXT,                       -- e.g., "nonprofit", "small_business", "public_company"

  -- What failed
  violation_type TEXT NOT NULL,           -- Normalized: MATERIAL_WEAKNESS, HIPAA_BREACH, etc.
  violation_detail TEXT,                  -- Specific: "Network Server breach", "Repeat finding on A-133"
  severity TEXT NOT NULL DEFAULT 'HIGH'
    CHECK(severity IN ('LOW', 'MODERATE', 'HIGH', 'CRITICAL')),

  -- Legal basis
  governing_standard TEXT,               -- CFR/statute citation
  governing_standard_title TEXT,          -- Human-readable title
  compliance_framework TEXT,             -- HIPAA, SOX, FAR, CMMC, Single Audit, etc.

  -- Scoring
  gap_score INTEGER DEFAULT 0,           -- Original pipeline gap score (0-100)
  financial_exposure REAL DEFAULT 0,     -- Dollar amount at risk

  -- Metadata
  failure_date TEXT,                      -- When the failure was reported/discovered
  ingested_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Composite indexes for taxonomy queries
CREATE INDEX IF NOT EXISTS idx_taxonomy_industry ON failure_taxonomy(industry, sub_industry);
CREATE INDEX IF NOT EXISTS idx_taxonomy_naics ON failure_taxonomy(naics_code);
CREATE INDEX IF NOT EXISTS idx_taxonomy_violation ON failure_taxonomy(violation_type);
CREATE INDEX IF NOT EXISTS idx_taxonomy_framework ON failure_taxonomy(compliance_framework);
CREATE INDEX IF NOT EXISTS idx_taxonomy_pipeline ON failure_taxonomy(source_pipeline);
CREATE INDEX IF NOT EXISTS idx_taxonomy_severity ON failure_taxonomy(severity);
CREATE INDEX IF NOT EXISTS idx_taxonomy_industry_violation ON failure_taxonomy(industry, violation_type);
-- Dedup: same entity + same violation from same pipeline
CREATE UNIQUE INDEX IF NOT EXISTS idx_taxonomy_dedup
  ON failure_taxonomy(source_pipeline, source_record_id, violation_type);


-- =============================================================================
-- FAILURE CLUSTERS: grouped violations that become skills
-- =============================================================================

CREATE TABLE IF NOT EXISTS failure_clusters (
  id TEXT PRIMARY KEY,

  -- What this cluster represents
  cluster_name TEXT NOT NULL,             -- e.g., "healthcare-hipaa-breach-response"
  cluster_label TEXT NOT NULL,            -- e.g., "HIPAA Breach Response & Notification"
  industry TEXT NOT NULL,
  sub_industry TEXT,

  -- The violation types in this cluster
  violation_types TEXT NOT NULL,          -- JSON array of violation_type values
  compliance_frameworks TEXT NOT NULL,    -- JSON array of frameworks (HIPAA, SOX, etc.)
  governing_standards TEXT NOT NULL,      -- JSON array of CFR citations

  -- Statistics from real data
  total_failures INTEGER NOT NULL DEFAULT 0,
  unique_entities INTEGER NOT NULL DEFAULT 0,
  avg_gap_score REAL DEFAULT 0,
  total_financial_exposure REAL DEFAULT 0,
  top_states TEXT DEFAULT '[]',           -- JSON: [{"state":"CA","count":42}, ...]
  severity_distribution TEXT DEFAULT '{}', -- JSON: {"CRITICAL":10,"HIGH":25,...}

  -- Derived skill properties
  suggested_skill_slug TEXT,              -- Auto-generated slug for citizen_skills
  suggested_skill_type TEXT DEFAULT 'AUDIT'
    CHECK(suggested_skill_type IN ('AUDIT', 'INTAKE', 'SYNTHESIS', 'OPERATIONAL', 'GOVERNANCE')),
  suggested_checklist TEXT DEFAULT '[]',  -- JSON array of ChecklistItem derived from failure patterns

  -- Lifecycle
  last_clustered_at TEXT NOT NULL DEFAULT (datetime('now')),
  cluster_version INTEGER NOT NULL DEFAULT 1,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_cluster_industry ON failure_clusters(industry, sub_industry);
CREATE UNIQUE INDEX IF NOT EXISTS idx_cluster_name ON failure_clusters(cluster_name);


-- =============================================================================
-- DISCOVERED SKILLS: skills derived from failure clusters
-- =============================================================================

CREATE TABLE IF NOT EXISTS discovered_skills (
  id TEXT PRIMARY KEY,

  -- Link to the cluster that produced this skill
  cluster_id TEXT NOT NULL REFERENCES failure_clusters(id),

  -- Skill definition (mirrors citizen_skills schema)
  skill_slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  skill_type TEXT NOT NULL DEFAULT 'AUDIT'
    CHECK(skill_type IN ('AUDIT', 'INTAKE', 'SYNTHESIS', 'OPERATIONAL', 'GOVERNANCE')),

  -- Derived from cluster data
  governing_standards TEXT NOT NULL DEFAULT '[]',  -- JSON array of CFR citations
  audit_triggers TEXT NOT NULL DEFAULT '[]',       -- JSON array of document types
  audit_checklist TEXT NOT NULL DEFAULT '[]',      -- JSON array of ChecklistItem
  output_protocol TEXT,
  cross_references TEXT DEFAULT '[]',              -- JSON array of related skill slugs

  -- Data backing
  backed_by_failures INTEGER NOT NULL DEFAULT 0,   -- How many real failures support this skill
  backed_by_entities INTEGER NOT NULL DEFAULT 0,   -- How many unique entities
  confidence_score REAL NOT NULL DEFAULT 0,        -- 0-1 how well-supported this skill is
  industries TEXT NOT NULL DEFAULT '[]',           -- JSON array of industries this applies to

  -- Assignment
  assigned_citizen TEXT,                            -- Which Citizen owns this skill (null = unassigned)
  assigned_at TEXT,

  -- Lifecycle
  discovery_version INTEGER NOT NULL DEFAULT 1,
  is_active INTEGER NOT NULL DEFAULT 1,
  discovered_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_discovered_citizen ON discovered_skills(assigned_citizen);
CREATE INDEX IF NOT EXISTS idx_discovered_industry ON discovered_skills(industries);
CREATE INDEX IF NOT EXISTS idx_discovered_confidence ON discovered_skills(confidence_score);


-- =============================================================================
-- CITIZEN ASSEMBLY: Citizens assembled from discovered skills
-- =============================================================================

CREATE TABLE IF NOT EXISTS citizen_assemblies (
  id TEXT PRIMARY KEY,

  -- The Citizen being assembled
  citizen_name TEXT NOT NULL,
  citizen_trademark TEXT NOT NULL,
  industry TEXT NOT NULL,
  sub_industry TEXT,
  domain TEXT NOT NULL,

  -- Skills assigned (discovered_skills IDs)
  skill_ids TEXT NOT NULL DEFAULT '[]',    -- JSON array
  skill_count INTEGER NOT NULL DEFAULT 0,

  -- Data profile
  total_backing_failures INTEGER NOT NULL DEFAULT 0,
  total_backing_entities INTEGER NOT NULL DEFAULT 0,
  avg_confidence REAL NOT NULL DEFAULT 0,
  primary_frameworks TEXT NOT NULL DEFAULT '[]',  -- JSON array of compliance frameworks
  primary_standards TEXT NOT NULL DEFAULT '[]',   -- JSON array of governing standards

  -- Top failure patterns (the Citizen's specialty)
  failure_profile TEXT NOT NULL DEFAULT '{}',     -- JSON: {violation_type: count, ...}
  state_coverage TEXT DEFAULT '[]',               -- JSON: states with most failures

  -- Deployment linkage
  catalog_spec_id TEXT,                            -- FK to citizen_catalog if spec exists
  deployment_id TEXT,                              -- FK to citizen_deployments if deployed
  assembly_status TEXT NOT NULL DEFAULT 'DISCOVERED'
    CHECK(assembly_status IN ('DISCOVERED', 'SKILLS_ASSIGNED', 'SPEC_CREATED', 'DEPLOYED', 'ACTIVE')),

  -- Lifecycle
  assembled_at TEXT NOT NULL DEFAULT (datetime('now')),
  deployed_at TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_assembly_industry ON citizen_assemblies(industry);
CREATE INDEX IF NOT EXISTS idx_assembly_status ON citizen_assemblies(assembly_status);
CREATE UNIQUE INDEX IF NOT EXISTS idx_assembly_citizen ON citizen_assemblies(citizen_name);


-- =============================================================================
-- TAXONOMY STATISTICS: aggregate pipeline health metrics
-- =============================================================================

CREATE TABLE IF NOT EXISTS taxonomy_statistics (
  id TEXT PRIMARY KEY,
  stat_type TEXT NOT NULL,                -- e.g., "pipeline_run", "cluster_run", "assembly_run"
  pipeline TEXT,                           -- Which pipeline (or "ALL")
  records_processed INTEGER DEFAULT 0,
  records_classified INTEGER DEFAULT 0,
  new_violations_found INTEGER DEFAULT 0,
  clusters_updated INTEGER DEFAULT 0,
  skills_discovered INTEGER DEFAULT 0,
  citizens_assembled INTEGER DEFAULT 0,
  duration_ms INTEGER DEFAULT 0,
  run_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_taxonomy_stats_type ON taxonomy_statistics(stat_type, run_at);


-- =============================================================================
-- NAICS SECTOR LOOKUP: maps 2-digit codes to sector names
-- =============================================================================

CREATE TABLE IF NOT EXISTS naics_sectors (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  industry_normalized TEXT NOT NULL       -- Our normalized industry label
);

INSERT OR IGNORE INTO naics_sectors (code, name, industry_normalized) VALUES
  ('11', 'Agriculture, Forestry, Fishing and Hunting', 'AGRICULTURE'),
  ('21', 'Mining, Quarrying, and Oil and Gas Extraction', 'MINING'),
  ('22', 'Utilities', 'UTILITIES'),
  ('23', 'Construction', 'CONSTRUCTION'),
  ('31', 'Manufacturing', 'MANUFACTURING'),
  ('32', 'Manufacturing', 'MANUFACTURING'),
  ('33', 'Manufacturing', 'MANUFACTURING'),
  ('42', 'Wholesale Trade', 'WHOLESALE'),
  ('44', 'Retail Trade', 'RETAIL'),
  ('45', 'Retail Trade', 'RETAIL'),
  ('48', 'Transportation and Warehousing', 'TRANSPORTATION'),
  ('49', 'Transportation and Warehousing', 'TRANSPORTATION'),
  ('51', 'Information', 'TECHNOLOGY'),
  ('52', 'Finance and Insurance', 'FINANCE'),
  ('53', 'Real Estate and Rental and Leasing', 'REAL_ESTATE'),
  ('54', 'Professional, Scientific, and Technical Services', 'PROFESSIONAL_SERVICES'),
  ('55', 'Management of Companies and Enterprises', 'MANAGEMENT'),
  ('56', 'Administrative and Support and Waste Management', 'ADMINISTRATIVE'),
  ('61', 'Educational Services', 'EDUCATION'),
  ('62', 'Health Care and Social Assistance', 'HEALTHCARE'),
  ('71', 'Arts, Entertainment, and Recreation', 'ENTERTAINMENT'),
  ('72', 'Accommodation and Food Services', 'HOSPITALITY'),
  ('81', 'Other Services (except Public Administration)', 'OTHER_SERVICES'),
  ('92', 'Public Administration', 'GOVERNMENT');

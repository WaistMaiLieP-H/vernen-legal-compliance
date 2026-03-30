-- Migration 020: Citizen Routing Engine
-- Eliminates runtime sifting. Pre-indexes document→citizen→scope paths.
-- Three tables: routing index, scope cache, junction registry + instances.
-- Created: March 26, 2026

-- =============================================================================
-- ROUTING INDEX: document characteristics → citizen + skill in O(1)
-- =============================================================================
-- This replaces findSkillByTrigger's "load all skills, loop through them" pattern.
-- A composite key of (document_type, jurisdiction, category) resolves directly
-- to the citizen and skill that handle it. No scanning.

CREATE TABLE IF NOT EXISTS citizen_routing_index (
  id TEXT PRIMARY KEY,

  -- The composite routing key (what the document IS)
  doc_type TEXT NOT NULL,           -- e.g. "POLICE_REPORT", "CAD_LOG", "BANK_STATEMENT"
  jurisdiction TEXT NOT NULL,       -- e.g. "CA", "FEDERAL", "US", "*" for any
  category TEXT NOT NULL,           -- e.g. "LAW_ENFORCEMENT", "FINANCIAL", "MEDICAL"

  -- The resolution (who handles it and how)
  citizen_name TEXT NOT NULL,       -- e.g. "REGULIS", "ADVOCIS"
  skill_slug TEXT NOT NULL,         -- e.g. "cad-log-compliance-audit"
  skill_id TEXT,                    -- FK to citizen_skills.id (populated on cache build)
  priority INTEGER NOT NULL DEFAULT 0,  -- Higher = preferred when multiple matches

  -- Pre-resolved scope pointers (eliminates the second sift)
  standard_ids TEXT,                -- JSON array of governing_standards.id this route needs
  cross_ref_paths TEXT,             -- JSON array of junction_registry.id this route can trigger

  -- Metadata
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- The money index: one hash lookup to resolve any document
CREATE UNIQUE INDEX IF NOT EXISTS idx_routing_composite
  ON citizen_routing_index(doc_type, jurisdiction, category, citizen_name);

-- Reverse lookup: what routes does this citizen own?
CREATE INDEX IF NOT EXISTS idx_routing_citizen
  ON citizen_routing_index(citizen_name);

-- Skill-based lookup for cache invalidation
CREATE INDEX IF NOT EXISTS idx_routing_skill
  ON citizen_routing_index(skill_slug);


-- =============================================================================
-- SCOPE CACHE: each citizen's pre-loaded audit toolkit
-- =============================================================================
-- Instead of querying governing_standards + citizen_skills at runtime,
-- each citizen's entire scope is materialized into a single JSON payload
-- loaded once at boot or on change. The citizen reads from cache, not D1.

CREATE TABLE IF NOT EXISTS citizen_scope_cache (
  citizen_name TEXT PRIMARY KEY,

  -- Pre-serialized scope (loaded into memory at boot)
  skill_manifest TEXT NOT NULL,     -- JSON: { slug: { id, triggers, checklist_count, standard_ids } }
  standard_manifest TEXT NOT NULL,  -- JSON: { id: { citation, type, jurisdiction, doc_types, requirements_count } }
  routing_keys TEXT NOT NULL,       -- JSON: array of { doc_type, jurisdiction, category } this citizen handles
  cross_ref_citizens TEXT NOT NULL, -- JSON: array of citizen names this citizen can junction with

  -- Cache metadata
  skill_count INTEGER NOT NULL DEFAULT 0,
  standard_count INTEGER NOT NULL DEFAULT 0,
  route_count INTEGER NOT NULL DEFAULT 0,
  cache_version INTEGER NOT NULL DEFAULT 1,
  built_at TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT,                  -- Optional TTL for forced rebuild
  build_duration_ms INTEGER         -- How long the cache build took
);


-- =============================================================================
-- JUNCTION REGISTRY: which citizen tethers CAN split toward each other (STATIC)
-- =============================================================================
-- This is the railroad switch map. It defines authorized cross-reference paths.
-- A citizen cannot request a junction with another citizen unless a registry
-- entry exists. This is a governance decision, not a runtime decision.

CREATE TABLE IF NOT EXISTS junction_registry (
  id TEXT PRIMARY KEY,

  -- The two citizens whose tethers can connect
  citizen_a TEXT NOT NULL,          -- e.g. "ADVOCIS"
  citizen_b TEXT NOT NULL,          -- e.g. "REGULIS"

  -- What can flow through this junction
  shared_categories TEXT NOT NULL,  -- JSON array: ["LAW_ENFORCEMENT", "COURT_FILINGS"]
  directionality TEXT NOT NULL DEFAULT 'BIDIRECTIONAL'
    CHECK(directionality IN ('A_TO_B', 'B_TO_A', 'BIDIRECTIONAL')),
  data_scope TEXT NOT NULL DEFAULT 'FINDINGS_ONLY'
    CHECK(data_scope IN ('FINDINGS_ONLY', 'FINDINGS_AND_EVIDENCE', 'FULL_SCOPE')),

  -- Why this junction exists
  justification TEXT NOT NULL,      -- e.g. "Police reports require both civil rights and regulatory audit"
  governing_standard_id TEXT,       -- Optional: the standard that mandates this cross-reference

  -- Governance
  approved_by TEXT,                 -- Who authorized this junction path
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Prevent duplicate junction paths (order-independent)
CREATE UNIQUE INDEX IF NOT EXISTS idx_junction_pair
  ON junction_registry(MIN(citizen_a, citizen_b), MAX(citizen_a, citizen_b));

-- Fast lookup: what junctions does this citizen participate in?
CREATE INDEX IF NOT EXISTS idx_junction_citizen_a ON junction_registry(citizen_a);
CREATE INDEX IF NOT EXISTS idx_junction_citizen_b ON junction_registry(citizen_b);


-- =============================================================================
-- JUNCTION INSTANCES: active cross-reference workspaces (DYNAMIC)
-- =============================================================================
-- Created at runtime when a cross-reference is actually triggered.
-- Lives only as long as the cross-reference needs it.

CREATE TABLE IF NOT EXISTS junction_instances (
  id TEXT PRIMARY KEY,

  -- Which registry entry authorized this
  registry_id TEXT NOT NULL REFERENCES junction_registry(id),

  -- The citizens meeting at this junction
  citizen_a TEXT NOT NULL,
  citizen_b TEXT NOT NULL,

  -- What triggered the junction
  trigger_type TEXT NOT NULL CHECK(trigger_type IN (
    'AUDIT_FINDING',        -- One citizen's audit flagged a cross-domain issue
    'DOCUMENT_OVERLAP',     -- A document touches both citizens' scopes
    'STANDARD_REFERENCE',   -- A standard in scope A references one in scope B
    'EXPLICIT_REQUEST',     -- Manual cross-reference request
    'RESCUE_SEQUENCE'       -- Rescue engine assigned multiple citizens
  )),
  trigger_source TEXT NOT NULL,     -- ID of the finding/document/standard that triggered
  trigger_detail TEXT,              -- JSON with trigger context

  -- Junction workspace contents
  shared_artifacts TEXT,            -- JSON array of artifact IDs both citizens can see
  findings TEXT,                    -- JSON array of cross-reference findings produced
  audit_trail TEXT,                 -- JSON array of { citizen, action, timestamp }

  -- Lifecycle
  status TEXT NOT NULL DEFAULT 'ACTIVE'
    CHECK(status IN ('ACTIVE', 'COMPLETED', 'PROMOTED', 'EXPIRED')),
  promoted_to TEXT,                 -- If findings became evidence, where they went
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT,
  expires_at TEXT                   -- TTL for auto-cleanup
);

CREATE INDEX IF NOT EXISTS idx_junction_inst_registry ON junction_instances(registry_id);
CREATE INDEX IF NOT EXISTS idx_junction_inst_status ON junction_instances(status);
CREATE INDEX IF NOT EXISTS idx_junction_inst_citizens
  ON junction_instances(citizen_a, citizen_b);


-- =============================================================================
-- ROUTING AUDIT LOG: track every routing decision for performance analysis
-- =============================================================================

CREATE TABLE IF NOT EXISTS routing_audit_log (
  id TEXT PRIMARY KEY,
  doc_type TEXT NOT NULL,
  jurisdiction TEXT NOT NULL,
  category TEXT NOT NULL,
  resolved_citizen TEXT,            -- NULL if no route found
  resolved_skill TEXT,
  resolution_method TEXT NOT NULL   -- 'INDEX_HIT', 'FALLBACK_SCAN', 'NO_MATCH'
    CHECK(resolution_method IN ('INDEX_HIT', 'FALLBACK_SCAN', 'NO_MATCH')),
  resolution_ns INTEGER,           -- Nanoseconds to resolve (track the speedup)
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_routing_audit_method ON routing_audit_log(resolution_method);
CREATE INDEX IF NOT EXISTS idx_routing_audit_date ON routing_audit_log(created_at);

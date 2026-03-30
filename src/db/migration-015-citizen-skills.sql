-- Migration 015: Citizen Skill Registry
-- Skills are professional competencies owned by Persona Citizens.
-- Each skill defines audit frameworks, triggers, standards, and execution gates.
-- Skills belong to Citizens. Citizens execute their own skills autonomously.

-- Skill definitions table
CREATE TABLE IF NOT EXISTS citizen_skills (
  id TEXT PRIMARY KEY,
  citizen_name TEXT NOT NULL,           -- Which Citizen owns this skill
  skill_slug TEXT NOT NULL UNIQUE,      -- URL-safe identifier (e.g., 'cad-log-compliance-audit')
  name TEXT NOT NULL,                   -- Human-readable name
  description TEXT NOT NULL,            -- What the skill does
  skill_type TEXT NOT NULL CHECK(skill_type IN (
    'AUDIT',         -- Compliance/regulatory audit framework
    'INTAKE',        -- Document intake and triage
    'SYNTHESIS',     -- Cross-document analysis and structuring
    'OPERATIONAL',   -- Internal platform operations (sync, archive, style)
    'GOVERNANCE'     -- Guardrails, context, constitutional enforcement
  )),
  governing_standards TEXT,             -- JSON array of standard citations
  audit_triggers TEXT,                  -- JSON array of activation triggers
  audit_checklist TEXT,                 -- JSON array of checklist items (gated steps)
  output_protocol TEXT,                 -- Template for skill output format
  cross_references TEXT,                -- JSON array of related skill slugs
  skill_content TEXT NOT NULL,          -- Full SKILL.md content (the knowledge itself)
  version INTEGER NOT NULL DEFAULT 1,
  is_active INTEGER NOT NULL DEFAULT 1,
  installed_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Skill execution log — every time a Citizen exercises a skill
CREATE TABLE IF NOT EXISTS skill_executions (
  id TEXT PRIMARY KEY,
  skill_id TEXT NOT NULL REFERENCES citizen_skills(id),
  citizen_name TEXT NOT NULL,
  trigger_type TEXT NOT NULL,           -- What activated the skill
  input_document_type TEXT,             -- What kind of document was analyzed
  findings_count INTEGER DEFAULT 0,
  violations_count INTEGER DEFAULT 0,
  determination TEXT,                   -- COMPLIANT / NON-COMPLIANT / etc.
  execution_summary TEXT,               -- Brief outcome summary
  duration_ms INTEGER,
  executed_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Indexes for skill lookups
CREATE INDEX IF NOT EXISTS idx_skills_citizen ON citizen_skills(citizen_name);
CREATE INDEX IF NOT EXISTS idx_skills_type ON citizen_skills(skill_type);
CREATE INDEX IF NOT EXISTS idx_skills_active ON citizen_skills(is_active);
CREATE INDEX IF NOT EXISTS idx_skill_exec_skill ON skill_executions(skill_id);
CREATE INDEX IF NOT EXISTS idx_skill_exec_citizen ON skill_executions(citizen_name);
CREATE INDEX IF NOT EXISTS idx_skill_exec_date ON skill_executions(executed_at);

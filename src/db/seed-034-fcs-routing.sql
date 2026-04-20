-- Seed 034: Family Court Services (FCS) → D1 Routing Engine
-- Adds marin-fcs-auditor to citizen_catalog, citizen_skills, and citizen_routing_index.
-- Closes the gap from seed-033 where FCS was chartered in CUSTOS but missing from D1.
--
-- Run via db.batch([db.prepare("...")]) per statement — NOT db.exec().
-- Created: 2026-04-20

-- =============================================================================
-- 1. CITIZEN CATALOG
-- =============================================================================

INSERT OR IGNORE INTO citizen_catalog (id, name, trademark, domain, industry, category, description, derivation, workers, governance_type, capabilities)
VALUES
  ('cat-fcs-auditor', 'MARIN_FCS_AUDITOR', 'Marin FCS Auditor™', 'Family Court Services', 'LEGAL', 'California Litigation',
   'Audits Family Court Services letters, mediator reports, minor interviews, and court-ordered FCS documents for procedural compliance under CRC Rules 5.210–5.215 and local FCS program standards',
   'Court-appointed Family Court Services mediators; Cal. Family Code § 3160 et seq.',
   '[]', 'INDEPENDENT', '["fcs-letter-audit","mediator-report-audit","minor-interview-audit"]');

-- =============================================================================
-- 2. CITIZEN SKILLS
-- =============================================================================

INSERT OR IGNORE INTO citizen_skills (id, citizen_name, skill_slug, name, description, skill_type, governing_standards, audit_triggers, output_protocol, version, is_active, installed_at)
VALUES
  ('skill-fcs-001', 'MARIN_FCS_AUDITOR', 'fcs-document-audit', 'Family Court Services Document Audit',
   'Audits FCS letters, mediator reports, and minor interview records for compliance with Cal. Family Code § 3160 et seq. and CRC Rules 5.210–5.215. Verifies mediator credentials, statutory basis for recommendations, mandatory disclosure requirements, and procedural integrity of the FCS process.',
   'AUDIT',
   '["Cal. Family Code §§ 3160-3186","CRC Rules 5.210-5.215","Cal. Family Code § 3170 (mandatory mediation)","Cal. Family Code § 3172 (confidentiality)","Cal. Family Code § 3180 (best interest standard)"]',
   '["fcs-letter","mediator-report","minor-interview","family-court-services"]',
   'MARIN_FCS_AUDIT_REPORT', 1, 1, datetime('now'));

-- =============================================================================
-- 3. CITIZEN ROUTING INDEX
-- =============================================================================
-- SOURCE: Cal. Family Code § 3170 — mediation is mandatory before the court
-- makes an order regarding child custody or visitation contested by either party.
-- FCS documents are court-program records created under § 3160 et seq.
-- Jurisdiction: CA only — FCS is a California Superior Court program.

INSERT OR IGNORE INTO citizen_routing_index (id, doc_type, jurisdiction, category, citizen_name, skill_slug, priority, standard_ids, cross_ref_paths)
VALUES
  ('ri-fcs-001', 'fcs-letter',           'CA', 'family-court-services', 'MARIN_FCS_AUDITOR', 'fcs-document-audit', 95, '[]', '[]'),
  ('ri-fcs-002', 'mediator-report',       'CA', 'family-court-services', 'MARIN_FCS_AUDITOR', 'fcs-document-audit', 95, '[]', '[]'),
  ('ri-fcs-003', 'minor-interview',       'CA', 'family-court-services', 'MARIN_FCS_AUDITOR', 'fcs-document-audit', 95, '[]', '[]'),
  ('ri-fcs-004', 'family-court-services', 'CA', 'family-court-services', 'MARIN_FCS_AUDITOR', 'fcs-document-audit', 90, '[]', '[]');

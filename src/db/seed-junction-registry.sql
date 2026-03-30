-- Junction Registry Seed: Authorized cross-reference paths between Citizens
-- These are governance decisions — who CAN talk to whom and about what.
-- Created: March 26, 2026

-- =============================================================================
-- ADVOCIS ↔ REGULIS: Civil rights findings often trigger regulatory audits
-- =============================================================================
INSERT OR IGNORE INTO junction_registry (id, citizen_a, citizen_b, shared_categories, directionality, data_scope, justification, approved_by)
VALUES ('jreg_adv_reg_001', 'ADVOCIS', 'REGULIS', '["LAW_ENFORCEMENT","COURT_FILINGS","CIVIL_RIGHTS"]', 'BIDIRECTIONAL', 'FINDINGS_AND_EVIDENCE',
  'Police reports require both civil rights audit (ADVOCIS) and regulatory compliance audit (REGULIS). CAD log violations often indicate civil rights violations and vice versa.',
  'FOUNDER');

-- =============================================================================
-- ADVOCIS ↔ ETHICARA: Professional misconduct in family law / civil rights cases
-- =============================================================================
INSERT OR IGNORE INTO junction_registry (id, citizen_a, citizen_b, shared_categories, directionality, data_scope, justification, approved_by)
VALUES ('jreg_adv_eth_001', 'ADVOCIS', 'ETHICARA', '["FAMILY_LAW","CIVIL_RIGHTS","MEDICAL"]', 'BIDIRECTIONAL', 'FINDINGS_AND_EVIDENCE',
  'Family law violations often involve attorney misconduct (State Bar) or medical professional standard violations (ABPN). Cross-referencing findings reveals coordinated professional failures.',
  'FOUNDER');

-- =============================================================================
-- REGULIS ↔ ETHICARA: Regulatory violations that implicate professional standards
-- =============================================================================
INSERT OR IGNORE INTO junction_registry (id, citizen_a, citizen_b, shared_categories, directionality, data_scope, justification, approved_by)
VALUES ('jreg_reg_eth_001', 'REGULIS', 'ETHICARA', '["LAW_ENFORCEMENT","COURT_FILINGS","MEDICAL"]', 'BIDIRECTIONAL', 'FINDINGS_ONLY',
  'State agency correspondence failures may indicate attorney or medical professional standards violations requiring separate professional conduct audit.',
  'FOUNDER');

-- =============================================================================
-- FISCARA ↔ REGULIS: Financial fraud with regulatory implications
-- =============================================================================
INSERT OR IGNORE INTO junction_registry (id, citizen_a, citizen_b, shared_categories, directionality, data_scope, justification, approved_by)
VALUES ('jreg_fis_reg_001', 'FISCARA', 'REGULIS', '["FINANCIAL","INSURANCE","REAL_ESTATE"]', 'BIDIRECTIONAL', 'FINDINGS_AND_EVIDENCE',
  'Financial document fraud (banking, FCRA) often intersects with regulatory violations in real estate transactions and insurance bad faith claims.',
  'FOUNDER');

-- =============================================================================
-- FISCARA ↔ ADVOCIS: Financial exploitation in civil rights / family law context
-- =============================================================================
INSERT OR IGNORE INTO junction_registry (id, citizen_a, citizen_b, shared_categories, directionality, data_scope, justification, approved_by)
VALUES ('jreg_fis_adv_001', 'FISCARA', 'ADVOCIS', '["FINANCIAL","FAMILY_LAW","CIVIL_RIGHTS"]', 'BIDIRECTIONAL', 'FINDINGS_AND_EVIDENCE',
  'Financial exploitation patterns (property theft, crypto fraud, debt manipulation) are evidence in civil rights and family law proceedings.',
  'FOUNDER');

-- =============================================================================
-- ARCHIVIST-0 ↔ VERITAS-0: Document identification feeds authentication
-- =============================================================================
INSERT OR IGNORE INTO junction_registry (id, citizen_a, citizen_b, shared_categories, directionality, data_scope, justification, approved_by)
VALUES ('jreg_arc_ver_001', 'ARCHIVIST-0', 'VERITAS-0', '["DOCUMENT_FORENSICS"]', 'A_TO_B', 'FULL_SCOPE',
  'ARCHIVIST-0 identifies and classifies documents; VERITAS-0 authenticates them. Classification must complete before authentication can begin. One-directional: identification feeds authentication.',
  'FOUNDER');

-- =============================================================================
-- VERITAS-0 ↔ ALL DOMAIN CITIZENS: Authentication findings inform domain audits
-- =============================================================================
INSERT OR IGNORE INTO junction_registry (id, citizen_a, citizen_b, shared_categories, directionality, data_scope, justification, approved_by)
VALUES ('jreg_ver_reg_001', 'VERITAS-0', 'REGULIS', '["LAW_ENFORCEMENT","COURT_FILINGS","REAL_ESTATE","INSURANCE","EMPLOYMENT"]', 'A_TO_B', 'FINDINGS_ONLY',
  'Document authentication failures (forgery, manipulation, missing signatures) are critical findings for any domain-specific regulatory audit.',
  'FOUNDER');

INSERT OR IGNORE INTO junction_registry (id, citizen_a, citizen_b, shared_categories, directionality, data_scope, justification, approved_by)
VALUES ('jreg_ver_adv_001', 'VERITAS-0', 'ADVOCIS', '["CIVIL_RIGHTS","FAMILY_LAW","VICTIM_RIGHTS"]', 'A_TO_B', 'FINDINGS_ONLY',
  'Forged or manipulated documents in civil rights and family law cases are evidence of rights violations.',
  'FOUNDER');

INSERT OR IGNORE INTO junction_registry (id, citizen_a, citizen_b, shared_categories, directionality, data_scope, justification, approved_by)
VALUES ('jreg_ver_fis_001', 'VERITAS-0', 'FISCARA', '["FINANCIAL"]', 'A_TO_B', 'FINDINGS_ONLY',
  'Financial document authentication failures (forged signatures, altered amounts) feed into financial fraud audit.',
  'FOUNDER');

INSERT OR IGNORE INTO junction_registry (id, citizen_a, citizen_b, shared_categories, directionality, data_scope, justification, approved_by)
VALUES ('jreg_ver_eth_001', 'VERITAS-0', 'ETHICARA', '["COURT_FILINGS","MEDICAL"]', 'A_TO_B', 'FINDINGS_ONLY',
  'Forged professional documents (court filings, medical reports) indicate professional misconduct.',
  'FOUNDER');

-- =============================================================================
-- FACIALEX ↔ ADVOCIS: Photo comparison results inform identity fraud / civil rights
-- =============================================================================
INSERT OR IGNORE INTO junction_registry (id, citizen_a, citizen_b, shared_categories, directionality, data_scope, justification, approved_by)
VALUES ('jreg_fac_adv_001', 'FACIALEX', 'ADVOCIS', '["FORENSIC_IMAGING","CIVIL_RIGHTS"]', 'A_TO_B', 'FINDINGS_ONLY',
  'Forensic photo comparison findings (synthetic profiles, identity fraud) are evidence in civil rights proceedings.',
  'FOUNDER');

-- =============================================================================
-- PRIVAXIS ↔ VIGILUS: Privacy and threat assessment are interlinked
-- =============================================================================
INSERT OR IGNORE INTO junction_registry (id, citizen_a, citizen_b, shared_categories, directionality, data_scope, justification, approved_by)
VALUES ('jreg_pri_vig_001', 'PRIVAXIS', 'VIGILUS', '["PRIVACY","SECURITY"]', 'BIDIRECTIONAL', 'FINDINGS_AND_EVIDENCE',
  'Privacy breaches are security threats. Threat assessments reveal privacy exposures. Bidirectional by nature.',
  'FOUNDER');

-- =============================================================================
-- INTEGRA ↔ ALL: Intake triage routes to any citizen, needs junction authority
-- =============================================================================
INSERT OR IGNORE INTO junction_registry (id, citizen_a, citizen_b, shared_categories, directionality, data_scope, justification, approved_by)
VALUES ('jreg_int_all_001', 'INTEGRA', 'REGULIS', '["INTAKE"]', 'A_TO_B', 'FINDINGS_ONLY',
  'INTEGRA triages incoming documents and routes to domain citizens. Needs junction authority to hand off.',
  'FOUNDER');

INSERT OR IGNORE INTO junction_registry (id, citizen_a, citizen_b, shared_categories, directionality, data_scope, justification, approved_by)
VALUES ('jreg_int_all_002', 'INTEGRA', 'ADVOCIS', '["INTAKE"]', 'A_TO_B', 'FINDINGS_ONLY',
  'INTEGRA triages incoming documents and routes to domain citizens.',
  'FOUNDER');

INSERT OR IGNORE INTO junction_registry (id, citizen_a, citizen_b, shared_categories, directionality, data_scope, justification, approved_by)
VALUES ('jreg_int_all_003', 'INTEGRA', 'FISCARA', '["INTAKE"]', 'A_TO_B', 'FINDINGS_ONLY',
  'INTEGRA triages incoming documents and routes to domain citizens.',
  'FOUNDER');

INSERT OR IGNORE INTO junction_registry (id, citizen_a, citizen_b, shared_categories, directionality, data_scope, justification, approved_by)
VALUES ('jreg_int_all_004', 'INTEGRA', 'ETHICARA', '["INTAKE"]', 'A_TO_B', 'FINDINGS_ONLY',
  'INTEGRA triages incoming documents and routes to domain citizens.',
  'FOUNDER');

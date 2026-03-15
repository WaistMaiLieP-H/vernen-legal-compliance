-- Vernen Legal Compliance — Seed Data
-- Initial data for development and testing

-- Persona Citizens
INSERT INTO persona_citizens (id, name, trademark, domain, description, status, conceived_at)
VALUES
  ('pc_regulis', 'REGULIS', 'REGULIS™', 'regulatory-intelligence', 'Regulatory Intelligence Persona Citizen — multi-state compliance analysis and reporting', 'CONCEIVED', '2026-03-15T00:00:00Z');

-- Workers
INSERT INTO workers (id, name, persona_id, description, status)
VALUES
  ('wkr_forge0', 'FORGE-0', 'pc_regulis', 'Autonomous builder worker — executes build tasks', 'DESIGNED'),
  ('wkr_sentinel0', 'SENTINEL-0', 'pc_regulis', 'Autonomous auditor worker — reviews builds and gates deployments', 'DESIGNED'),
  ('wkr_scan1', 'SCAN-1', 'pc_regulis', 'Regulatory scanner — scans federal and state regulatory sources', 'DESIGNED');

-- Sample Federal Compliance Rules
INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active)
VALUES
  ('rule_fed_boi', 'FED-BOI-001', 'Beneficial Ownership Information Report', 'All reporting companies must file BOI reports with FinCEN under the Corporate Transparency Act', 'REPORTING', 'FEDERAL', NULL, '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]', '2024-01-01', 'Corporate Transparency Act', 'https://www.fincen.gov/boi', 1),
  ('rule_fed_ein', 'FED-EIN-001', 'Employer Identification Number', 'All business entities with employees or that file certain tax returns must obtain an EIN from the IRS', 'TAXATION', 'FEDERAL', NULL, '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '1974-01-01', 'Internal Revenue Code', 'https://www.irs.gov/businesses/small-businesses-self-employed/employer-id-numbers', 1),
  ('rule_fed_1099', 'FED-1099-001', 'Form 1099-NEC Filing', 'Businesses that pay independent contractors $600 or more must file Form 1099-NEC', 'TAXATION', 'FEDERAL', NULL, '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2020-01-01', 'IRS', 'https://www.irs.gov/forms-pubs/about-form-1099-nec', 1);

-- Sample California Compliance Rules
INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active)
VALUES
  ('rule_ca_sos', 'CA-SOS-001', 'Statement of Information Filing', 'LLCs and corporations must file a Statement of Information with the California Secretary of State', 'REPORTING', 'STATE', 'CA', '["LLC","CORPORATION","S_CORP"]', '2000-01-01', 'California Corporations Code', 'https://www.sos.ca.gov/business-programs/business-entities/statements', 1),
  ('rule_ca_ftb', 'CA-FTB-001', 'Annual Minimum Franchise Tax', 'LLCs and corporations doing business in California must pay an annual minimum franchise tax of $800', 'TAXATION', 'STATE', 'CA', '["LLC","CORPORATION","S_CORP"]', '2000-01-01', 'California Revenue and Taxation Code', 'https://www.ftb.ca.gov', 1),
  ('rule_ca_ccpa', 'CA-CCPA-001', 'California Consumer Privacy Act Compliance', 'Businesses meeting revenue/data thresholds must comply with CCPA/CPRA data privacy requirements', 'PRIVACY', 'STATE', 'CA', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2020-01-01', 'California Civil Code 1798.100', 'https://oag.ca.gov/privacy/ccpa', 1);

-- Sample Texas Compliance Rules
INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active)
VALUES
  ('rule_tx_ft', 'TX-FT-001', 'Texas Franchise Tax', 'Taxable entities doing business in Texas must file an annual franchise tax report', 'TAXATION', 'STATE', 'TX', '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]', '2008-01-01', 'Texas Tax Code Chapter 171', 'https://comptroller.texas.gov/taxes/franchise/', 1),
  ('rule_tx_reg', 'TX-REG-001', 'Foreign Entity Registration', 'Foreign entities transacting business in Texas must register with the Secretary of State', 'FORMATION', 'STATE', 'TX', '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]', '2000-01-01', 'Texas Business Organizations Code', 'https://www.sos.state.tx.us/corp/', 1);

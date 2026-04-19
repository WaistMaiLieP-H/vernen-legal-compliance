-- Migration 025: Citizen Skills & Universal Document Routing
-- Seeds skills for 6 previously empty Citizens and routes ALL document types
-- to owning Citizens. Zero dead-ends — every document type has a home.
--
-- Run via db.batch([db.prepare("...")]) per statement — NOT db.exec().

-- ═══════════════════════════════════════════════════════════════════════════
-- VIGILUS — Threat Assessment & Operational Risk
-- Domain: Workplace safety (OSHA) + Environmental enforcement (EPA)
-- ═══════════════════════════════════════════════════════════════════════════

INSERT OR IGNORE INTO citizen_skills (id, citizen_name, skill_slug, name, description, skill_type, governing_standards, audit_triggers, output_protocol, version, is_active, installed_at)
VALUES
  ('skill-vigilus-001', 'VIGILUS', 'osha-workplace-safety-audit', 'OSHA Workplace Safety Audit', 'Audits OSHA inspection reports and citations for workplace safety violations, penalty adequacy, and abatement compliance', 'AUDIT', '["29 CFR 1910","29 CFR 1926","OSH Act §5(a)(1)"]', '["osha_citation","osha_inspection_report","osha_serious_violation","osha_enforcement_document"]', 'VIGILUS_OSHA_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-vigilus-002', 'VIGILUS', 'osha-fatality-investigation-audit', 'OSHA Fatality Investigation Audit', 'Reviews OSHA fatality and catastrophe investigation reports for root cause analysis, employer negligence, and willful violations', 'AUDIT', '["29 CFR 1904","OSH Act §17","OSHA Field Operations Manual"]', '["osha_fatality_report"]', 'VIGILUS_FATALITY_REPORT', 1, 1, datetime('now')),
  ('skill-vigilus-003', 'VIGILUS', 'osha-willful-violation-audit', 'OSHA Willful Violation Audit', 'Evaluates willful and repeat violations for penalty escalation, criminal referral indicators, and pattern establishment', 'AUDIT', '["OSH Act §17(a)","29 CFR 1903.14"]', '["osha_willful_violation"]', 'VIGILUS_WILLFUL_REPORT', 1, 1, datetime('now')),
  ('skill-vigilus-004', 'VIGILUS', 'epa-environmental-enforcement-audit', 'EPA Environmental Enforcement Audit', 'Audits EPA enforcement actions including consent decrees, administrative orders, and penalty assessments', 'AUDIT', '["Clean Water Act","Clean Air Act","RCRA","CERCLA","TSCA"]', '["epa_consent_decree","epa_administrative_order","epa_penalty_action","epa_enforcement_document"]', 'VIGILUS_EPA_ENFORCEMENT_REPORT', 1, 1, datetime('now')),
  ('skill-vigilus-005', 'VIGILUS', 'epa-clean-water-act-audit', 'EPA Clean Water Act Audit', 'Reviews CWA violations for discharge permit compliance, effluent limits, and NPDES permit requirements', 'AUDIT', '["33 USC §1251","40 CFR 122","NPDES Permit Program"]', '["epa_cwa_violation"]', 'VIGILUS_CWA_REPORT', 1, 1, datetime('now')),
  ('skill-vigilus-006', 'VIGILUS', 'epa-clean-air-act-audit', 'EPA Clean Air Act Audit', 'Reviews CAA violations for emission standards, Title V permits, and NAAQS compliance', 'AUDIT', '["42 USC §7401","40 CFR 50-97","Title V Operating Permits"]', '["epa_caa_violation"]', 'VIGILUS_CAA_REPORT', 1, 1, datetime('now')),
  ('skill-vigilus-007', 'VIGILUS', 'epa-rcra-hazardous-waste-audit', 'EPA RCRA Hazardous Waste Audit', 'Reviews RCRA violations for hazardous waste handling, storage, treatment, and disposal requirements', 'AUDIT', '["42 USC §6901","40 CFR 260-279","RCRA Subtitle C"]', '["epa_rcra_violation"]', 'VIGILUS_RCRA_REPORT', 1, 1, datetime('now')),
  ('skill-vigilus-008', 'VIGILUS', 'epa-cercla-superfund-audit', 'EPA CERCLA Superfund Audit', 'Reviews CERCLA/Superfund actions for potentially responsible party liability, cleanup standards, and NCP compliance', 'AUDIT', '["42 USC §9601","40 CFR 300","National Contingency Plan"]', '["epa_cercla_action"]', 'VIGILUS_CERCLA_REPORT', 1, 1, datetime('now'));

-- ═══════════════════════════════════════════════════════════════════════════
-- PRIVAXIS — Data Protection & Privacy Compliance
-- Domain: Consumer financial complaints (CFPB) + Privacy/Data breach
-- ═══════════════════════════════════════════════════════════════════════════

INSERT OR IGNORE INTO citizen_skills (id, citizen_name, skill_slug, name, description, skill_type, governing_standards, audit_triggers, output_protocol, version, is_active, installed_at)
VALUES
  ('skill-privaxis-001', 'PRIVAXIS', 'cfpb-consumer-complaint-audit', 'CFPB Consumer Complaint Audit', 'Analyzes CFPB consumer complaint narratives for regulatory violations, company response adequacy, and systemic patterns', 'AUDIT', '["12 USC §5531","Reg Z","Reg E","ECOA","FDCPA"]', '["cfpb_complaint","cfpb_document"]', 'PRIVAXIS_CFPB_COMPLAINT_REPORT', 1, 1, datetime('now')),
  ('skill-privaxis-002', 'PRIVAXIS', 'cfpb-enforcement-action-audit', 'CFPB Enforcement Action Audit', 'Reviews CFPB enforcement actions for consumer harm scope, restitution adequacy, and compliance program requirements', 'AUDIT', '["12 USC §5564","Dodd-Frank §1055"]', '["cfpb_enforcement_action"]', 'PRIVAXIS_CFPB_ENFORCEMENT_REPORT', 1, 1, datetime('now')),
  ('skill-privaxis-003', 'PRIVAXIS', 'cfpb-consent-order-audit', 'CFPB Consent Order Audit', 'Audits CFPB consent orders for compliance terms, monetary penalties, and ongoing reporting obligations', 'AUDIT', '["12 USC §5565","Dodd-Frank §1056"]', '["cfpb_consent_order"]', 'PRIVAXIS_CONSENT_ORDER_REPORT', 1, 1, datetime('now')),
  ('skill-privaxis-004', 'PRIVAXIS', 'hipaa-breach-notification-audit', 'HIPAA Breach Notification Audit', 'Audits healthcare data breach notifications for HIPAA compliance, notification timeliness, and remediation adequacy', 'AUDIT', '["45 CFR 164.400-414","HITECH Act §13402"]', '["hipaa_breach","medical_record"]', 'PRIVAXIS_HIPAA_BREACH_REPORT', 1, 1, datetime('now')),
  ('skill-privaxis-005', 'PRIVAXIS', 'data-breach-incident-audit', 'Data Breach Incident Audit', 'Reviews data breach disclosures for state notification compliance, scope assessment, and consumer protection measures', 'AUDIT', '["CA Civil Code §1798.82","CCPA §1798.150"]', '["data_breach","security_incident"]', 'PRIVAXIS_DATA_BREACH_REPORT', 1, 1, datetime('now')),
  ('skill-privaxis-006', 'PRIVAXIS', 'consumer-privacy-rights-audit', 'Consumer Privacy Rights Audit', 'Evaluates consumer privacy practices against CCPA/CPRA, FCRA, and state privacy law requirements', 'AUDIT', '["CCPA","CPRA","FCRA","GLBA"]', '["cfpb_supervisory_highlight","privacy_complaint"]', 'PRIVAXIS_PRIVACY_RIGHTS_REPORT', 1, 1, datetime('now'));

-- ═══════════════════════════════════════════════════════════════════════════
-- VESTARA — Investor Relations & Capital Strategy
-- Domain: SEC proxy/registration, material events
-- ═══════════════════════════════════════════════════════════════════════════

INSERT OR IGNORE INTO citizen_skills (id, citizen_name, skill_slug, name, description, skill_type, governing_standards, audit_triggers, output_protocol, version, is_active, installed_at)
VALUES
  ('skill-vestara-001', 'VESTARA', 'sec-proxy-statement-audit', 'SEC Proxy Statement Audit', 'Reviews DEF 14A proxy statements for executive compensation disclosure, board governance, and shareholder proposal compliance', 'AUDIT', '["Securities Exchange Act §14(a)","17 CFR 240.14a","Regulation S-K Item 402"]', '["sec_proxy"]', 'VESTARA_PROXY_REPORT', 1, 1, datetime('now')),
  ('skill-vestara-002', 'VESTARA', 'sec-registration-statement-audit', 'SEC Registration Statement Audit', 'Audits S-1/S-3 registration statements for disclosure completeness, risk factor adequacy, and MD&A compliance', 'AUDIT', '["Securities Act of 1933 §5","Regulation S-K","Regulation S-X"]', '["sec_registration"]', 'VESTARA_REGISTRATION_REPORT', 1, 1, datetime('now')),
  ('skill-vestara-003', 'VESTARA', 'sec-8k-material-event-audit', 'SEC 8-K Material Event Audit', 'Reviews 8-K current reports for material event disclosure timeliness, completeness, and Reg FD compliance', 'AUDIT', '["Securities Exchange Act §13(a)","17 CFR 249.308","Regulation FD"]', '["sec_8k"]', 'VESTARA_8K_REPORT', 1, 1, datetime('now')),
  ('skill-vestara-004', 'VESTARA', 'investor-disclosure-compliance-audit', 'Investor Disclosure Compliance Audit', 'Evaluates overall investor disclosure practices against SEC requirements and best practices', 'AUDIT', '["Regulation S-K","Regulation S-X","SEC Staff Guidance"]', '["sec_filing"]', 'VESTARA_DISCLOSURE_REPORT', 1, 1, datetime('now'));

-- ═══════════════════════════════════════════════════════════════════════════
-- METRIQA — Performance Analytics & Growth Validation
-- Domain: GAO reports, government accountability, federal performance
-- ═══════════════════════════════════════════════════════════════════════════

INSERT OR IGNORE INTO citizen_skills (id, citizen_name, skill_slug, name, description, skill_type, governing_standards, audit_triggers, output_protocol, version, is_active, installed_at)
VALUES
  ('skill-metriqa-001', 'METRIQA', 'gao-audit-report-analysis', 'GAO Audit Report Analysis', 'Analyzes GAO audit reports for findings patterns, recommendation implementation rates, and systemic governance failures', 'AUDIT', '["31 USC §702-720","Government Auditing Standards","Single Audit Act"]', '["gao_audit_report","gao_report"]', 'METRIQA_GAO_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-metriqa-002', 'METRIQA', 'gao-bid-protest-audit', 'GAO Bid Protest Audit', 'Reviews GAO bid protest decisions for procurement compliance, competitive fairness, and corrective action adequacy', 'AUDIT', '["31 USC §3551-3556","FAR Part 33","CICA"]', '["gao_bid_protest"]', 'METRIQA_BID_PROTEST_REPORT', 1, 1, datetime('now')),
  ('skill-metriqa-003', 'METRIQA', 'gao-testimony-analysis', 'GAO Testimony Analysis', 'Analyzes GAO congressional testimony for policy implications, oversight gaps, and legislative recommendations', 'AUDIT', '["31 USC §719","Congressional Budget Act"]', '["gao_testimony","gao_correspondence"]', 'METRIQA_TESTIMONY_REPORT', 1, 1, datetime('now')),
  ('skill-metriqa-004', 'METRIQA', 'federal-performance-metrics-audit', 'Federal Performance Metrics Audit', 'Evaluates federal agency performance against GPRA/GPRAMA requirements, strategic goals, and performance indicators', 'AUDIT', '["GPRA Modernization Act","OMB Circular A-11","FFMIA"]', '["gao_tech_assessment"]', 'METRIQA_PERFORMANCE_REPORT', 1, 1, datetime('now')),
  ('skill-metriqa-005', 'METRIQA', 'government-accountability-audit', 'Government Accountability Audit', 'Cross-references GAO findings with agency responses, IG reports, and corrective action plans for accountability tracking', 'AUDIT', '["Inspector General Act","GPRA","DATA Act"]', '["gao_report"]', 'METRIQA_ACCOUNTABILITY_REPORT', 1, 1, datetime('now'));

-- ═══════════════════════════════════════════════════════════════════════════
-- CLARIDEX — Financial Disclosure & Reporting Standards
-- Domain: SEC annual/quarterly filings, material weakness, restatements
-- ═══════════════════════════════════════════════════════════════════════════

INSERT OR IGNORE INTO citizen_skills (id, citizen_name, skill_slug, name, description, skill_type, governing_standards, audit_triggers, output_protocol, version, is_active, installed_at)
VALUES
  ('skill-claridex-001', 'CLARIDEX', 'sec-10k-annual-filing-audit', 'SEC 10-K Annual Filing Audit', 'Audits 10-K annual reports for GAAP compliance, MD&A adequacy, risk factor disclosure, and internal control assessments', 'AUDIT', '["Securities Exchange Act §13(a)","Regulation S-K","Regulation S-X","PCAOB AS 2201"]', '["sec_10k"]', 'CLARIDEX_10K_REPORT', 1, 1, datetime('now')),
  ('skill-claridex-002', 'CLARIDEX', 'sec-10q-quarterly-filing-audit', 'SEC 10-Q Quarterly Filing Audit', 'Reviews 10-Q quarterly reports for interim financial statement compliance, material changes, and disclosure consistency', 'AUDIT', '["Securities Exchange Act §13(a)","ASC 270","Regulation S-X Article 10"]', '["sec_10q"]', 'CLARIDEX_10Q_REPORT', 1, 1, datetime('now')),
  ('skill-claridex-003', 'CLARIDEX', 'sec-material-weakness-audit', 'SEC Material Weakness Audit', 'Evaluates material weakness disclosures for root cause analysis, remediation plans, and SOX 302/404 compliance', 'AUDIT', '["SOX §302","SOX §404","PCAOB AS 2201","17 CFR 229.308"]', '["sec_material_weakness_filing"]', 'CLARIDEX_MATERIAL_WEAKNESS_REPORT', 1, 1, datetime('now')),
  ('skill-claridex-004', 'CLARIDEX', 'sec-restatement-audit', 'SEC Restatement Audit', 'Audits financial restatements for error significance, investor impact, control failure identification, and recovery assessment', 'AUDIT', '["ASC 250","SEC Staff Accounting Bulletin 99","PCAOB AS 2401"]', '["sec_restatement_filing"]', 'CLARIDEX_RESTATEMENT_REPORT', 1, 1, datetime('now')),
  ('skill-claridex-005', 'CLARIDEX', 'gaap-financial-statement-audit', 'GAAP Financial Statement Audit', 'Comprehensive audit of financial statements against GAAP standards for presentation, measurement, and disclosure compliance', 'AUDIT', '["ASC 205-855","PCAOB Standards","AICPA Professional Standards"]', '["financial_document","sec_filing"]', 'CLARIDEX_GAAP_REPORT', 1, 1, datetime('now')),
  ('skill-claridex-006', 'CLARIDEX', 'sarbanes-oxley-compliance-audit', 'Sarbanes-Oxley Compliance Audit', 'Evaluates SOX compliance including CEO/CFO certifications, internal control testing, and whistleblower protection', 'AUDIT', '["SOX §302","SOX §404","SOX §806","SOX §906"]', '["sec_10k","sec_10q"]', 'CLARIDEX_SOX_REPORT', 1, 1, datetime('now'));

-- ═══════════════════════════════════════════════════════════════════════════
-- NEXARIS — Strategic Partnerships & Reputation
-- Domain: SAM.gov exclusions, FTC enforcement, contractor integrity
-- ═══════════════════════════════════════════════════════════════════════════

INSERT OR IGNORE INTO citizen_skills (id, citizen_name, skill_slug, name, description, skill_type, governing_standards, audit_triggers, output_protocol, version, is_active, installed_at)
VALUES
  ('skill-nexaris-001', 'NEXARIS', 'sam-exclusion-debarment-audit', 'SAM Exclusion & Debarment Audit', 'Audits SAM.gov exclusion records for debarment basis, due process compliance, and reinstatement eligibility', 'AUDIT', '["FAR 9.4","2 CFR 180","48 CFR 9.406"]', '["sam_exclusion"]', 'NEXARIS_EXCLUSION_REPORT', 1, 1, datetime('now')),
  ('skill-nexaris-002', 'NEXARIS', 'sam-entity-registration-audit', 'SAM Entity Registration Audit', 'Reviews SAM.gov entity registrations for completeness, accuracy, and federal contracting eligibility', 'AUDIT', '["FAR 4.11","2 CFR 25","SAM User Guide"]', '["sam_entity_registration","sam_record"]', 'NEXARIS_REGISTRATION_REPORT', 1, 1, datetime('now')),
  ('skill-nexaris-003', 'NEXARIS', 'federal-contractor-compliance-audit', 'Federal Contractor Compliance Audit', 'Evaluates contractor compliance with federal acquisition regulations, ethics requirements, and mandatory disclosures', 'AUDIT', '["FAR 3.10","FAR 52.203","DFARS 252.203"]', '["government_contracting"]', 'NEXARIS_CONTRACTOR_REPORT', 1, 1, datetime('now')),
  ('skill-nexaris-004', 'NEXARIS', 'ftc-enforcement-action-audit', 'FTC Enforcement Action Audit', 'Reviews FTC enforcement actions for consumer protection violations, deceptive practices, and antitrust concerns', 'AUDIT', '["FTC Act §5","15 USC §45","Hart-Scott-Rodino Act"]', '["ftc_enforcement","ftc_consent_order"]', 'NEXARIS_FTC_REPORT', 1, 1, datetime('now')),
  ('skill-nexaris-005', 'NEXARIS', 'government-contracting-integrity-audit', 'Government Contracting Integrity Audit', 'Cross-references exclusion records, past performance, and compliance history for partnership risk assessment', 'AUDIT', '["FAR 9.1","CPARS","FAPIIS"]', '["sam_exclusion","sam_record"]', 'NEXARIS_INTEGRITY_REPORT', 1, 1, datetime('now'));

-- ═══════════════════════════════════════════════════════════════════════════
-- FDA Document Skills — Route to existing taxonomy Citizens
-- ═══════════════════════════════════════════════════════════════════════════

INSERT OR IGNORE INTO citizen_skills (id, citizen_name, skill_slug, name, description, skill_type, governing_standards, audit_triggers, output_protocol, version, is_active, installed_at)
VALUES
  ('skill-fda-food-001', 'REGULIS', 'fda-food-recall-audit', 'FDA Food Recall Audit', 'Audits FDA food recall notices for classification adequacy, distribution scope, and public notification compliance', 'AUDIT', '["21 CFR 7","FD&C Act §402","FSMA §206"]', '["fda_recall"]', 'REGULIS_FDA_FOOD_REPORT', 1, 1, datetime('now')),
  ('skill-fda-warn-001', 'REGULIS', 'fda-warning-letter-audit', 'FDA Warning Letter Audit', 'Reviews FDA warning letters for violation specificity, response deadline compliance, and corrective action adequacy', 'AUDIT', '["21 CFR 7","FDA Regulatory Procedures Manual Ch.4"]', '["fda_warning_letter","fda_483_observation"]', 'REGULIS_FDA_WARNING_REPORT', 1, 1, datetime('now')),
  ('skill-fda-enforce-001', 'REGULIS', 'fda-enforcement-action-audit', 'FDA Enforcement Action Audit', 'Audits FDA enforcement actions including injunctions, seizures, and import alerts for regulatory compliance', 'AUDIT', '["FD&C Act §301-304","21 CFR 1","FDA Import Alert Manual"]', '["fda_enforcement_action","fda_import_alert","fda_document","fda_drug_label"]', 'REGULIS_FDA_ENFORCEMENT_REPORT', 1, 1, datetime('now'));

-- ═══════════════════════════════════════════════════════════════════════════
-- FOIA/Government Records — Route to ADVOCIS (government accountability)
-- ═══════════════════════════════════════════════════════════════════════════

INSERT OR IGNORE INTO citizen_skills (id, citizen_name, skill_slug, name, description, skill_type, governing_standards, audit_triggers, output_protocol, version, is_active, installed_at)
VALUES
  ('skill-advocis-foia-001', 'ADVOCIS', 'foia-response-audit', 'FOIA Response Audit', 'Audits FOIA responses for exemption application, response timeliness, and adequacy of search and disclosure', 'AUDIT', '["5 USC §552","DOJ FOIA Guidelines","OGIS Best Practices"]', '["foia_response","public_records_response"]', 'ADVOCIS_FOIA_REPORT', 1, 1, datetime('now'));

-- ═══════════════════════════════════════════════════════════════════════════
-- UNIVERSAL ROUTING TABLE
-- Every document type → a Citizen. Zero dead-ends.
-- ═══════════════════════════════════════════════════════════════════════════

INSERT OR IGNORE INTO citizen_routing_index (id, doc_type, jurisdiction, category, citizen_name, skill_slug, priority, standard_ids, cross_ref_paths)
VALUES
  -- Court/Litigation → ADVOCIS
  ('route-court-001', 'supreme_court_opinion', '*', 'litigation', 'ADVOCIS', 'constitutional-and-civil-rights-audit', 90, '[]', '[]'),
  ('route-court-002', 'appellate_opinion', '*', 'litigation', 'ADVOCIS', 'constitutional-and-civil-rights-audit', 85, '[]', '[]'),
  ('route-court-003', 'district_court_opinion', '*', 'litigation', 'ADVOCIS', 'constitutional-and-civil-rights-audit', 85, '[]', '[]'),
  ('route-court-004', 'court_opinion', '*', 'litigation', 'ADVOCIS', 'constitutional-and-civil-rights-audit', 80, '[]', '[]'),
  ('route-court-005', 'court_filing', '*', 'litigation', 'ADVOCIS', 'constitutional-and-civil-rights-audit', 75, '[]', '[]'),
  ('route-court-006', 'court_order', '*', 'litigation', 'ADVOCIS', 'constitutional-and-civil-rights-audit', 80, '[]', '[]'),
  ('route-court-007', 'court_docket', '*', 'litigation', 'ADVOCIS', 'constitutional-and-civil-rights-audit', 70, '[]', '[]'),
  ('route-court-008', 'court_document', '*', 'litigation', 'ADVOCIS', 'constitutional-and-civil-rights-audit', 70, '[]', '[]'),
  ('route-court-009', 'complaint', '*', 'litigation', 'ADVOCIS', 'constitutional-and-civil-rights-audit', 80, '[]', '[]'),
  ('route-court-010', 'motion', '*', 'litigation', 'ADVOCIS', 'constitutional-and-civil-rights-audit', 75, '[]', '[]'),
  ('route-court-011', 'judgment', '*', 'litigation', 'ADVOCIS', 'constitutional-and-civil-rights-audit', 85, '[]', '[]'),
  ('route-court-012', 'brief', '*', 'litigation', 'ADVOCIS', 'constitutional-and-civil-rights-audit', 75, '[]', '[]'),
  ('route-court-013', 'declaration', '*', 'litigation', 'ADVOCIS', 'constitutional-and-civil-rights-audit', 70, '[]', '[]'),
  ('route-court-014', 'subpoena', '*', 'litigation', 'ADVOCIS', 'constitutional-and-civil-rights-audit', 75, '[]', '[]'),
  ('route-court-015', 'bankruptcy_filing', '*', 'bankruptcy', 'FISCARA', 'banking-financial-document-audit', 80, '[]', '[]'),

  -- SEC/Securities → CLARIDEX + VESTARA
  ('route-sec-001', 'sec_10k', '*', 'securities', 'CLARIDEX', 'sec-10k-annual-filing-audit', 95, '[]', '[]'),
  ('route-sec-002', 'sec_10q', '*', 'securities', 'CLARIDEX', 'sec-10q-quarterly-filing-audit', 95, '[]', '[]'),
  ('route-sec-003', 'sec_8k', '*', 'securities', 'VESTARA', 'sec-8k-material-event-audit', 90, '[]', '[]'),
  ('route-sec-004', 'sec_proxy', '*', 'securities', 'VESTARA', 'sec-proxy-statement-audit', 90, '[]', '[]'),
  ('route-sec-005', 'sec_registration', '*', 'securities', 'VESTARA', 'sec-registration-statement-audit', 90, '[]', '[]'),
  ('route-sec-006', 'sec_material_weakness_filing', '*', 'securities', 'CLARIDEX', 'sec-material-weakness-audit', 95, '[]', '[]'),
  ('route-sec-007', 'sec_restatement_filing', '*', 'securities', 'CLARIDEX', 'sec-restatement-audit', 95, '[]', '[]'),
  ('route-sec-008', 'sec_filing', '*', 'securities', 'CLARIDEX', 'gaap-financial-statement-audit', 80, '[]', '[]'),

  -- Federal Register → REGULIS
  ('route-fedreg-001', 'federal_register_final_rule', '*', 'regulatory', 'REGULIS', 'california-court-order-compliance-audit', 85, '[]', '[]'),
  ('route-fedreg-002', 'federal_register_proposed_rule', '*', 'regulatory', 'REGULIS', 'california-court-order-compliance-audit', 80, '[]', '[]'),
  ('route-fedreg-003', 'federal_register_notice', '*', 'regulatory', 'REGULIS', 'california-state-agency-correspondence-audit', 75, '[]', '[]'),
  ('route-fedreg-004', 'federal_register_document', '*', 'regulatory', 'REGULIS', 'california-state-agency-correspondence-audit', 70, '[]', '[]'),
  ('route-fedreg-005', 'executive_order', '*', 'regulatory', 'REGULIS', 'california-court-order-compliance-audit', 90, '[]', '[]'),

  -- FDA → REGULIS
  ('route-fda-001', 'fda_warning_letter', '*', 'regulatory', 'REGULIS', 'fda-warning-letter-audit', 95, '[]', '[]'),
  ('route-fda-002', 'fda_recall', '*', 'regulatory', 'REGULIS', 'fda-food-recall-audit', 95, '[]', '[]'),
  ('route-fda-003', 'fda_483_observation', '*', 'regulatory', 'REGULIS', 'fda-warning-letter-audit', 90, '[]', '[]'),
  ('route-fda-004', 'fda_enforcement_action', '*', 'regulatory', 'REGULIS', 'fda-enforcement-action-audit', 90, '[]', '[]'),
  ('route-fda-005', 'fda_import_alert', '*', 'regulatory', 'REGULIS', 'fda-enforcement-action-audit', 85, '[]', '[]'),
  ('route-fda-006', 'fda_drug_label', '*', 'regulatory', 'REGULIS', 'fda-enforcement-action-audit', 70, '[]', '[]'),
  ('route-fda-007', 'fda_document', '*', 'regulatory', 'REGULIS', 'fda-enforcement-action-audit', 70, '[]', '[]'),

  -- EPA → VIGILUS
  ('route-epa-001', 'epa_consent_decree', '*', 'environmental', 'VIGILUS', 'epa-environmental-enforcement-audit', 95, '[]', '[]'),
  ('route-epa-002', 'epa_administrative_order', '*', 'environmental', 'VIGILUS', 'epa-environmental-enforcement-audit', 90, '[]', '[]'),
  ('route-epa-003', 'epa_penalty_action', '*', 'environmental', 'VIGILUS', 'epa-environmental-enforcement-audit', 90, '[]', '[]'),
  ('route-epa-004', 'epa_cwa_violation', '*', 'environmental', 'VIGILUS', 'epa-clean-water-act-audit', 95, '[]', '[]'),
  ('route-epa-005', 'epa_caa_violation', '*', 'environmental', 'VIGILUS', 'epa-clean-air-act-audit', 95, '[]', '[]'),
  ('route-epa-006', 'epa_rcra_violation', '*', 'environmental', 'VIGILUS', 'epa-rcra-hazardous-waste-audit', 95, '[]', '[]'),
  ('route-epa-007', 'epa_cercla_action', '*', 'environmental', 'VIGILUS', 'epa-cercla-superfund-audit', 95, '[]', '[]'),
  ('route-epa-008', 'epa_enforcement_document', '*', 'environmental', 'VIGILUS', 'epa-environmental-enforcement-audit', 80, '[]', '[]'),

  -- OSHA → VIGILUS
  ('route-osha-001', 'osha_citation', '*', 'workplace_safety', 'VIGILUS', 'osha-workplace-safety-audit', 95, '[]', '[]'),
  ('route-osha-002', 'osha_fatality_report', '*', 'workplace_safety', 'VIGILUS', 'osha-fatality-investigation-audit', 95, '[]', '[]'),
  ('route-osha-003', 'osha_willful_violation', '*', 'workplace_safety', 'VIGILUS', 'osha-willful-violation-audit', 95, '[]', '[]'),
  ('route-osha-004', 'osha_serious_violation', '*', 'workplace_safety', 'VIGILUS', 'osha-workplace-safety-audit', 90, '[]', '[]'),
  ('route-osha-005', 'osha_inspection_report', '*', 'workplace_safety', 'VIGILUS', 'osha-workplace-safety-audit', 85, '[]', '[]'),
  ('route-osha-006', 'osha_enforcement_document', '*', 'workplace_safety', 'VIGILUS', 'osha-workplace-safety-audit', 80, '[]', '[]'),

  -- CFPB → PRIVAXIS
  ('route-cfpb-001', 'cfpb_consent_order', '*', 'consumer_finance', 'PRIVAXIS', 'cfpb-consent-order-audit', 95, '[]', '[]'),
  ('route-cfpb-002', 'cfpb_complaint', '*', 'consumer_finance', 'PRIVAXIS', 'cfpb-consumer-complaint-audit', 90, '[]', '[]'),
  ('route-cfpb-003', 'cfpb_enforcement_action', '*', 'consumer_finance', 'PRIVAXIS', 'cfpb-enforcement-action-audit', 95, '[]', '[]'),
  ('route-cfpb-004', 'cfpb_supervisory_highlight', '*', 'consumer_finance', 'PRIVAXIS', 'consumer-privacy-rights-audit', 80, '[]', '[]'),
  ('route-cfpb-005', 'cfpb_document', '*', 'consumer_finance', 'PRIVAXIS', 'cfpb-consumer-complaint-audit', 75, '[]', '[]'),

  -- GAO → METRIQA
  ('route-gao-001', 'gao_audit_report', '*', 'government_audit', 'METRIQA', 'gao-audit-report-analysis', 95, '[]', '[]'),
  ('route-gao-002', 'gao_testimony', '*', 'government_audit', 'METRIQA', 'gao-testimony-analysis', 90, '[]', '[]'),
  ('route-gao-003', 'gao_bid_protest', '*', 'government_audit', 'METRIQA', 'gao-bid-protest-audit', 95, '[]', '[]'),
  ('route-gao-004', 'gao_correspondence', '*', 'government_audit', 'METRIQA', 'gao-testimony-analysis', 75, '[]', '[]'),
  ('route-gao-005', 'gao_tech_assessment', '*', 'government_audit', 'METRIQA', 'federal-performance-metrics-audit', 85, '[]', '[]'),
  ('route-gao-006', 'gao_report', '*', 'government_audit', 'METRIQA', 'gao-audit-report-analysis', 85, '[]', '[]'),

  -- SAM → NEXARIS
  ('route-sam-001', 'sam_exclusion', '*', 'government_contracting', 'NEXARIS', 'sam-exclusion-debarment-audit', 95, '[]', '[]'),
  ('route-sam-002', 'sam_entity_registration', '*', 'government_contracting', 'NEXARIS', 'sam-entity-registration-audit', 85, '[]', '[]'),
  ('route-sam-003', 'sam_record', '*', 'government_contracting', 'NEXARIS', 'sam-entity-registration-audit', 75, '[]', '[]'),

  -- FOIA/Government Records → ADVOCIS
  ('route-foia-001', 'foia_response', '*', 'government_records', 'ADVOCIS', 'foia-response-audit', 90, '[]', '[]'),
  ('route-foia-002', 'public_records_response', '*', 'government_records', 'ADVOCIS', 'foia-response-audit', 85, '[]', '[]'),

  -- California State → REGULIS
  ('route-ca-001', 'california_family_law_form', 'CA', 'family_law', 'ADVOCIS', 'california-family-law-expansion-audit', 95, '[]', '[]'),
  ('route-ca-002', 'california_civil_form', 'CA', 'civil', 'REGULIS', 'california-court-order-compliance-audit', 85, '[]', '[]'),
  ('route-ca-003', 'california_criminal_form', 'CA', 'criminal', 'ADVOCIS', 'constitutional-and-civil-rights-audit', 85, '[]', '[]'),
  ('route-ca-004', 'california_court_document', 'CA', 'state_proceeding', 'REGULIS', 'california-court-order-compliance-audit', 80, '[]', '[]'),
  ('route-ca-005', 'california_state_document', 'CA', 'state_proceeding', 'REGULIS', 'california-state-agency-correspondence-audit', 75, '[]', '[]'),

  -- General/Content-Based → Appropriate Citizens
  ('route-gen-001', 'police_report', '*', 'law_enforcement', 'ADVOCIS', 'police-report-data-cross-reference', 95, '[]', '[]'),
  ('route-gen-002', 'medical_record', '*', 'healthcare', 'PRIVAXIS', 'hipaa-breach-notification-audit', 80, '[]', '[]'),
  ('route-gen-003', 'contract', '*', 'business', 'LEXARC', 'executive-style-enforcer-corporate-voice-and-structure', 70, '[]', '[]'),
  ('route-gen-004', 'tax_document', '*', 'financial', 'FISCARA', 'banking-financial-document-audit', 80, '[]', '[]'),
  ('route-gen-005', 'property_record', '*', 'real_estate', 'REGULIS', 'california-real-estate-transaction-fraud-audit', 85, '[]', '[]'),
  ('route-gen-006', 'financial_document', '*', 'financial', 'FISCARA', 'banking-financial-document-audit', 80, '[]', '[]'),
  ('route-gen-007', 'regulatory_document', '*', 'regulatory', 'REGULIS', 'california-state-agency-correspondence-audit', 70, '[]', '[]'),

  -- Fallback: unclassified → INTEGRA (triage)
  ('route-fallback-001', 'unclassified', '*', '*', 'INTEGRA', 'master-project-intake-audit-triage', 50, '[]', '[]'),
  ('route-fallback-002', 'unknown', '*', '*', 'INTEGRA', 'master-project-intake-audit-triage', 50, '[]', '[]');

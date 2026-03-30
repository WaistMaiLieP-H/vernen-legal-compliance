-- ═══════════════════════════════════════════════════════════════════════════
-- GOVERNING STANDARDS LIBRARY SEED DATA — BATCH 3
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Seeds remaining Citizens: LEXARC, SYNTARA, VESTARA, METRIQA, CLARIDEX,
-- NEXARIS, and expands FORGE-0, SENTINEL-0 with operational standards.
--
-- Generated: March 17, 2026
-- ═══════════════════════════════════════════════════════════════════════════


-- ═══════════════════════════════════════════════════════════════════════════
-- LEXARC — Corporate Strategy & Legal Architecture
-- Skill: executive-style-enforcer (governance, not substantive law)
-- Domain: Corporate formation, governance, IP, trademarks
-- ═══════════════════════════════════════════════════════════════════════════

INSERT OR IGNORE INTO governing_standards (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title, description, requirements, key_sections, document_types, skill_slugs, enforcement_body, private_right_of_action, is_active, created_at, updated_at)
VALUES
('std_lex_001', 'LEXARC', 'STATE_STATUTE', 'CA', 'Cal. Corp. Code §§ 17701.01-17713.13', 'CA LLC Act', 'California Revised Uniform Limited Liability Company Act', 'Governs formation, operation, and dissolution of LLCs in California.', '["Articles of Organization filing","Operating Agreement (oral or written)","Annual Statement of Information","Registered agent requirement","Member/manager duties"]', '[{"section":"17701.04","description":"Articles of Organization requirements"},{"section":"17701.10","description":"Operating Agreement"},{"section":"17704.09","description":"Standards of conduct for members/managers"}]', '["articles_of_organization","operating_agreement","statement_of_information","LLC_formation"]', '["executive-style-enforcer-corporate-voice-and-structure"]', 'California Secretary of State', 1, 1, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO governing_standards (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title, description, requirements, key_sections, document_types, skill_slugs, enforcement_body, private_right_of_action, is_active, created_at, updated_at)
VALUES
('std_lex_002', 'LEXARC', 'STATE_STATUTE', 'CA', 'Cal. Corp. Code §§ 100-2319', 'CA Corp Code', 'California General Corporation Law', 'Governs formation, governance, and dissolution of California corporations.', '["Articles of Incorporation","Bylaws required","Annual meeting of shareholders","Board of directors fiduciary duties","Annual Statement of Information"]', '[{"section":"200","description":"Articles of Incorporation"},{"section":"212","description":"Bylaws"},{"section":"309","description":"Director duties of care"},{"section":"310","description":"Director conflict of interest transactions"}]', '["articles_of_incorporation","bylaws","board_resolution","shareholder_agreement"]', '["executive-style-enforcer-corporate-voice-and-structure"]', 'California Secretary of State', 1, 1, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO governing_standards (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title, description, requirements, key_sections, document_types, skill_slugs, enforcement_body, private_right_of_action, is_active, created_at, updated_at)
VALUES
('std_lex_003', 'LEXARC', 'FEDERAL_STATUTE', 'US', '15 USC §§ 1051-1141n (Lanham Act)', 'Lanham Act', 'Federal Trademark Act (Lanham Act)', 'Federal registration, protection, and enforcement of trademarks and service marks.', '["Federal registration on Principal or Supplemental Register","Use in commerce requirement","Likelihood of confusion standard","Incontestability after 5 years","Dilution protection for famous marks"]', '[{"section":"1051","description":"Registration application"},{"section":"1057","description":"Constructive notice of registration"},{"section":"1114","description":"Infringement remedies"},{"section":"1125(a)","description":"False designation of origin / unfair competition"},{"section":"1125(c)","description":"Dilution"}]', '["trademark_application","cease_and_desist","trademark_registration","brand_guidelines"]', '["executive-style-enforcer-corporate-voice-and-structure"]', 'USPTO / Federal Courts', 1, 1, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO governing_standards (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title, description, requirements, key_sections, document_types, skill_slugs, enforcement_body, private_right_of_action, is_active, created_at, updated_at)
VALUES
('std_lex_004', 'LEXARC', 'STATE_STATUTE', 'CA', 'Cal. Bus. & Prof. Code §§ 14200-14272', 'CA Trademark Law', 'California Trademark Law', 'State registration and protection of trademarks in California, supplementing federal Lanham Act.', '["State registration with Secretary of State","Common law rights from first use","Statutory damages for counterfeiting","Injunctive relief available"]', '[{"section":"14200","description":"Definitions"},{"section":"14205","description":"Registration requirements"},{"section":"14245","description":"Infringement and remedies"}]', '["trademark_registration","common_law_trademark","infringement_complaint"]', '["executive-style-enforcer-corporate-voice-and-structure"]', 'California Secretary of State / Courts', 1, 1, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO governing_standards (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title, description, requirements, key_sections, document_types, skill_slugs, enforcement_body, private_right_of_action, is_active, created_at, updated_at)
VALUES
('std_lex_005', 'LEXARC', 'STATE_STATUTE', 'CA', 'Cal. Rev. & Tax. Code §§ 23001-24990', 'CA Corporate Tax', 'California Corporation Tax Law', 'California franchise tax and income tax requirements for business entities.', '["$800 minimum franchise tax for LLCs","Annual tax return filing","Estimated tax payments","Foreign entity registration and taxation"]', '[{"section":"23151","description":"Franchise tax rate"},{"section":"23153","description":"Minimum franchise tax"},{"section":"17941","description":"LLC annual tax"}]', '["tax_return","FTB_filing","franchise_tax","estimated_payment"]', '["executive-style-enforcer-corporate-voice-and-structure"]', 'California Franchise Tax Board', 0, 1, datetime('now'), datetime('now'));


-- ═══════════════════════════════════════════════════════════════════════════
-- SYNTARA — Technology & Compliance Automation
-- Skills: proton-drive-session-sync, archive-flag (operational)
-- Domain: Platform technology, data integrity, automation standards
-- ═══════════════════════════════════════════════════════════════════════════

INSERT OR IGNORE INTO governing_standards (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title, description, requirements, key_sections, document_types, skill_slugs, enforcement_body, private_right_of_action, is_active, created_at, updated_at)
VALUES
('std_syn_001', 'SYNTARA', 'PROFESSIONAL_STANDARD', 'US', 'SOC 2 Type II — Trust Services Criteria', 'SOC 2', 'Service Organization Control 2 Compliance', 'AICPA trust services criteria for security, availability, processing integrity, confidentiality, and privacy of service organizations.', '["Security: protection against unauthorized access","Availability: system is operational as committed","Processing Integrity: processing is complete, accurate, timely","Confidentiality: information designated confidential is protected","Privacy: personal information managed per notice"]', '[{"section":"CC1-CC9","description":"Common Criteria (Security)"},{"section":"A1","description":"Availability criteria"},{"section":"PI1","description":"Processing Integrity criteria"},{"section":"C1","description":"Confidentiality criteria"},{"section":"P1-P8","description":"Privacy criteria"}]', '["SOC_report","security_policy","incident_response_plan","access_control_matrix"]', '["proton-drive-session-sync"]', 'AICPA', 0, 1, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO governing_standards (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title, description, requirements, key_sections, document_types, skill_slugs, enforcement_body, private_right_of_action, is_active, created_at, updated_at)
VALUES
('std_syn_002', 'SYNTARA', 'INTERNATIONAL', 'US', 'NIST SP 800-53 Rev. 5 — Security and Privacy Controls', 'NIST 800-53', 'NIST Security and Privacy Controls', 'Comprehensive catalog of security and privacy controls for information systems and organizations.', '["Access control (AC)","Audit and accountability (AU)","Identification and authentication (IA)","System and communications protection (SC)","Incident response (IR)"]', '[{"section":"AC","description":"Access Control family"},{"section":"AU","description":"Audit and Accountability family"},{"section":"IA","description":"Identification and Authentication family"},{"section":"IR","description":"Incident Response family"}]', '["security_assessment","system_security_plan","POA_M","risk_assessment"]', '[]', 'NIST', 0, 1, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO governing_standards (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title, description, requirements, key_sections, document_types, skill_slugs, enforcement_body, private_right_of_action, is_active, created_at, updated_at)
VALUES
('std_syn_003', 'SYNTARA', 'PROFESSIONAL_STANDARD', 'US', 'OWASP Top 10 (2021)', 'OWASP Top 10', 'OWASP Top 10 Web Application Security Risks', 'Industry-standard awareness document for web application security identifying the most critical risks.', '["A01: Broken Access Control","A02: Cryptographic Failures","A03: Injection","A04: Insecure Design","A05: Security Misconfiguration","A06: Vulnerable Components","A07: Authentication Failures","A08: Software and Data Integrity Failures","A09: Security Logging and Monitoring Failures","A10: Server-Side Request Forgery"]', '[{"section":"A01","description":"Broken Access Control"},{"section":"A03","description":"Injection"},{"section":"A07","description":"Authentication Failures"}]', '["security_audit","penetration_test","code_review","vulnerability_assessment"]', '[]', 'OWASP Foundation', 0, 1, datetime('now'), datetime('now'));


-- ═══════════════════════════════════════════════════════════════════════════
-- VESTARA — Investor Relations & Capital Strategy
-- Domain: Securities, fundraising, investor communications
-- ═══════════════════════════════════════════════════════════════════════════

INSERT OR IGNORE INTO governing_standards (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title, description, requirements, key_sections, document_types, skill_slugs, enforcement_body, private_right_of_action, is_active, created_at, updated_at)
VALUES
('std_ves_001', 'VESTARA', 'FEDERAL_STATUTE', 'US', '15 USC §§ 77a-77aa (Securities Act of 1933)', 'Securities Act', 'Securities Act of 1933', 'Federal law requiring registration of securities offerings and prohibiting fraud in the sale of securities.', '["Registration or exemption required for all securities offerings","Prospectus delivery requirements","Section 4(a)(2) private placement exemption","Regulation D exemptions (Rules 504, 506(b), 506(c))","Anti-fraud provisions (Section 17)"]', '[{"section":"77b","description":"Definition of security"},{"section":"77d","description":"Exempted transactions"},{"section":"77e","description":"Registration requirement"},{"section":"77q","description":"Anti-fraud provisions"}]', '["prospectus","PPM","subscription_agreement","Form_D","investor_questionnaire"]', '[]', 'SEC', 1, 1, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO governing_standards (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title, description, requirements, key_sections, document_types, skill_slugs, enforcement_body, private_right_of_action, is_active, created_at, updated_at)
VALUES
('std_ves_002', 'VESTARA', 'FEDERAL_REGULATION', 'US', '17 CFR §§ 230.501-230.508 (Regulation D)', 'Reg D', 'Regulation D — Private Placement Exemptions', 'SEC safe harbor rules for private offerings of securities without full SEC registration.', '["Rule 504: offerings up to $10M","Rule 506(b): unlimited, up to 35 non-accredited investors, no general solicitation","Rule 506(c): unlimited, accredited investors only, general solicitation permitted","Form D filing within 15 days of first sale"]', '[{"section":"230.501","description":"Definitions (accredited investor)"},{"section":"230.506(b)","description":"Private offering to limited investors"},{"section":"230.506(c)","description":"General solicitation to verified accredited investors"}]', '["Form_D","PPM","accredited_investor_verification","subscription_agreement"]', '[]', 'SEC', 1, 1, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO governing_standards (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title, description, requirements, key_sections, document_types, skill_slugs, enforcement_body, private_right_of_action, is_active, created_at, updated_at)
VALUES
('std_ves_003', 'VESTARA', 'STATE_STATUTE', 'CA', 'Cal. Corp. Code §§ 25000-25707 (Corporate Securities Law of 1968)', 'CA Securities Law', 'California Corporate Securities Law', 'State securities regulation including registration, qualification, and exemptions for securities offerings in California.', '["Qualification requirement unless exempt","Limited offering exemption (Section 25102(f))","Crowdfunding exemption (Section 25102(n))","Anti-fraud provisions","Commissioner enforcement authority"]', '[{"section":"25102(f)","description":"Limited offering exemption (up to 35 purchasers)"},{"section":"25102(n)","description":"Crowdfunding exemption"},{"section":"25401","description":"Anti-fraud provisions"},{"section":"25501","description":"Civil liability for violations"}]', '["qualification_application","offering_circular","notice_filing","investor_suitability"]', '[]', 'California DFPI', 1, 1, datetime('now'), datetime('now'));


-- ═══════════════════════════════════════════════════════════════════════════
-- METRIQA — Performance Analytics & Growth Validation
-- Domain: Data analytics, performance measurement, metrics integrity
-- ═══════════════════════════════════════════════════════════════════════════

INSERT OR IGNORE INTO governing_standards (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title, description, requirements, key_sections, document_types, skill_slugs, enforcement_body, private_right_of_action, is_active, created_at, updated_at)
VALUES
('std_met_001', 'METRIQA', 'PROFESSIONAL_STANDARD', 'US', 'GAAP — ASC 606 Revenue Recognition', 'ASC 606', 'Revenue Recognition Standard', 'FASB standard for recognizing revenue from contracts with customers using the five-step model.', '["Step 1: Identify the contract","Step 2: Identify performance obligations","Step 3: Determine transaction price","Step 4: Allocate transaction price","Step 5: Recognize revenue when obligations satisfied"]', '[{"section":"606-10-05","description":"Overview of the five-step model"},{"section":"606-10-25","description":"Recognition criteria"},{"section":"606-10-32","description":"Determining the transaction price"}]', '["revenue_report","financial_statement","subscription_revenue","SaaS_metrics"]', '[]', 'FASB / SEC', 0, 1, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO governing_standards (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title, description, requirements, key_sections, document_types, skill_slugs, enforcement_body, private_right_of_action, is_active, created_at, updated_at)
VALUES
('std_met_002', 'METRIQA', 'PROFESSIONAL_STANDARD', 'US', 'SEC Non-GAAP Financial Measures Guidance (Regulation G / Item 10(e))', 'SEC Non-GAAP', 'Non-GAAP Financial Measures Disclosure', 'SEC requirements for presenting non-GAAP financial measures including reconciliation to nearest GAAP measure.', '["Must present most directly comparable GAAP measure with equal or greater prominence","Quantitative reconciliation required","Cannot exclude charges deemed non-recurring if likely to recur within 2 years","Cannot present non-GAAP per share measures on face of financial statements"]', '[{"section":"Regulation G","description":"Non-GAAP measure disclosure in public communications"},{"section":"Item 10(e)","description":"Non-GAAP measures in SEC filings"}]', '["investor_presentation","earnings_release","10-K","10-Q"]', '[]', 'SEC', 0, 1, datetime('now'), datetime('now'));


-- ═══════════════════════════════════════════════════════════════════════════
-- CLARIDEX — Financial Disclosure & Reporting Standards
-- Domain: Financial transparency, regulatory reporting, audit readiness
-- ═══════════════════════════════════════════════════════════════════════════

INSERT OR IGNORE INTO governing_standards (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title, description, requirements, key_sections, document_types, skill_slugs, enforcement_body, private_right_of_action, is_active, created_at, updated_at)
VALUES
('std_cla_001', 'CLARIDEX', 'FEDERAL_STATUTE', 'US', '31 USC §§ 3701-3720E (Federal Claims Collection Act / DCIA)', 'FCCA / DCIA', 'Federal Debt Collection and Financial Reporting', 'Federal requirements for collection of debts owed to the government and reporting of financial obligations.', '["Treasury Offset Program for delinquent debts","Credit bureau reporting of federal debts","Administrative wage garnishment authority","Debt compromise standards"]', '[{"section":"3711","description":"Collection and compromise authority"},{"section":"3716","description":"Administrative offset"},{"section":"3720D","description":"Administrative wage garnishment"}]', '["debt_collection","offset_notice","wage_garnishment","compromise_offer"]', '[]', 'Treasury / DOJ', 0, 1, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO governing_standards (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title, description, requirements, key_sections, document_types, skill_slugs, enforcement_body, private_right_of_action, is_active, created_at, updated_at)
VALUES
('std_cla_002', 'CLARIDEX', 'PROFESSIONAL_STANDARD', 'US', 'AICPA Generally Accepted Auditing Standards (GAAS)', 'GAAS', 'Generally Accepted Auditing Standards', 'Professional standards for conducting financial audits including independence, due professional care, and reporting.', '["Independence in fact and appearance","Due professional care","Adequate planning and supervision","Sufficient appropriate audit evidence","Opinion on financial statements"]', '[{"section":"General Standards","description":"Independence, training, due care"},{"section":"Fieldwork Standards","description":"Planning, internal controls, evidence"},{"section":"Reporting Standards","description":"GAAP conformity, consistency, disclosure adequacy, opinion"}]', '["audit_report","financial_statement","management_letter","internal_control_assessment"]', '[]', 'AICPA / PCAOB', 0, 1, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO governing_standards (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title, description, requirements, key_sections, document_types, skill_slugs, enforcement_body, private_right_of_action, is_active, created_at, updated_at)
VALUES
('std_cla_003', 'CLARIDEX', 'STATE_STATUTE', 'CA', 'Cal. Gov. Code §§ 12580-12599.10', 'CA Charitable Trust Act', 'Supervision of Trustees and Fundraisers for Charitable Purposes', 'Registration and reporting requirements for charitable organizations operating in California.', '["Registration with AG Registry of Charitable Trusts","Annual filing (RRF-1)","Financial statements for organizations over $2M","Professional fundraiser registration"]', '[{"section":"12580","description":"Purpose and definitions"},{"section":"12586","description":"Annual reporting requirements"},{"section":"12599","description":"Commercial fundraiser registration"}]', '["RRF-1","CT-1","financial_statement","fundraiser_registration"]', '[]', 'California AG — Registry of Charitable Trusts', 0, 1, datetime('now'), datetime('now'));


-- ═══════════════════════════════════════════════════════════════════════════
-- NEXARIS — Strategic Partnerships & Reputation
-- Domain: Business relationships, reputation management, competitive compliance
-- ═══════════════════════════════════════════════════════════════════════════

INSERT OR IGNORE INTO governing_standards (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title, description, requirements, key_sections, document_types, skill_slugs, enforcement_body, private_right_of_action, is_active, created_at, updated_at)
VALUES
('std_nex_001', 'NEXARIS', 'FEDERAL_STATUTE', 'US', '15 USC §§ 1-7 (Sherman Antitrust Act)', 'Sherman Act', 'Sherman Antitrust Act', 'Federal law prohibiting anticompetitive agreements and monopolization.', '["Section 1: Every contract in restraint of trade is illegal","Section 2: Monopolization or attempt to monopolize is illegal","Per se violations: price fixing, market allocation, bid rigging","Rule of reason analysis for other agreements"]', '[{"section":"1","description":"Restraint of trade prohibited"},{"section":"2","description":"Monopolization prohibited"}]', '["partnership_agreement","vendor_agreement","competitive_analysis","market_assessment"]', '[]', 'DOJ Antitrust Division / FTC', 1, 1, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO governing_standards (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title, description, requirements, key_sections, document_types, skill_slugs, enforcement_body, private_right_of_action, is_active, created_at, updated_at)
VALUES
('std_nex_002', 'NEXARIS', 'FEDERAL_STATUTE', 'US', '16 CFR Part 255 (FTC Endorsement Guides)', 'FTC Endorsements', 'FTC Guides Concerning Use of Endorsements and Testimonials', 'FTC guidelines for truthful advertising including disclosure of material connections between endorsers and advertisers.', '["Material connections must be clearly disclosed","Endorsements must reflect honest opinions","Cannot make claims endorser cannot substantiate","Social media disclosures must be clear and conspicuous"]', '[{"section":"255.1","description":"General considerations"},{"section":"255.2","description":"Consumer endorsements"},{"section":"255.5","description":"Disclosure of material connections"}]', '["testimonial","endorsement","partnership_announcement","marketing_material"]', '[]', 'FTC', 0, 1, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO governing_standards (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title, description, requirements, key_sections, document_types, skill_slugs, enforcement_body, private_right_of_action, is_active, created_at, updated_at)
VALUES
('std_nex_003', 'NEXARIS', 'STATE_STATUTE', 'CA', 'Cal. Bus. & Prof. Code §§ 17500-17509', 'CA False Advertising', 'California False Advertising Law', 'Prohibits untrue or misleading advertising in any form.', '["Cannot make untrue or misleading statements","Applies to all forms of advertising","Injunctive relief and civil penalties","AG, DA, or city attorney enforcement"]', '[{"section":"17500","description":"False or misleading advertising prohibited"},{"section":"17500.3","description":"Made in USA claims"},{"section":"17508","description":"Civil penalties"}]', '["advertisement","marketing_material","website_content","press_release"]', '[]', 'California AG / DA', 1, 1, datetime('now'), datetime('now'));


-- ═══════════════════════════════════════════════════════════════════════════
-- FORGE-0 — Autonomous Construction & Build Execution
-- Domain: Software development standards, deployment, quality assurance
-- ═══════════════════════════════════════════════════════════════════════════

INSERT OR IGNORE INTO governing_standards (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title, description, requirements, key_sections, document_types, skill_slugs, enforcement_body, private_right_of_action, is_active, created_at, updated_at)
VALUES
('std_for_001', 'FORGE-0', 'PROFESSIONAL_STANDARD', 'US', 'Cloudflare Workers Runtime Limits and Best Practices', 'CF Workers Limits', 'Cloudflare Workers Platform Standards', 'Platform constraints and best practices for building on Cloudflare Workers, D1, and KV.', '["10ms CPU time (free) / 30ms (paid)","128MB memory limit","D1 row limit per query","KV eventual consistency model","Subrequest limits per invocation"]', '[{"section":"CPU Time","description":"Maximum CPU execution time per request"},{"section":"D1 Limits","description":"SQLite-compatible with size and query limits"},{"section":"KV","description":"Eventually consistent key-value storage"}]', '["worker_code","wrangler_config","D1_migration","deployment_log"]', '[]', 'Cloudflare', 0, 1, datetime('now'), datetime('now'));


-- ═══════════════════════════════════════════════════════════════════════════
-- SENTINEL-0 — Independent Build Audit & Compliance Verification
-- Domain: Audit standards, quality assurance, compliance verification
-- ═══════════════════════════════════════════════════════════════════════════

INSERT OR IGNORE INTO governing_standards (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title, description, requirements, key_sections, document_types, skill_slugs, enforcement_body, private_right_of_action, is_active, created_at, updated_at)
VALUES
('std_sen_001', 'SENTINEL-0', 'PROFESSIONAL_STANDARD', 'US', 'IIA International Standards for the Professional Practice of Internal Auditing', 'IIA Standards', 'Internal Audit Professional Standards', 'Standards for conducting internal audits including independence, objectivity, proficiency, and due professional care.', '["Independence and objectivity","Proficiency and due professional care","Quality assurance and improvement program","Managing the internal audit activity","Nature of work: governance, risk, control"]', '[{"section":"1000","description":"Purpose, authority, and responsibility"},{"section":"1100","description":"Independence and objectivity"},{"section":"2000","description":"Managing the internal audit activity"},{"section":"2300","description":"Performing the engagement"}]', '["audit_report","compliance_gate","issue_register","remediation_plan"]', '[]', 'IIA', 0, 1, datetime('now'), datetime('now'));


-- ═══════════════════════════════════════════════════════════════════════════
-- ADVOCIS — BATCH 3: Additional civil rights and family law standards
-- ═══════════════════════════════════════════════════════════════════════════

INSERT OR IGNORE INTO governing_standards (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title, description, requirements, key_sections, document_types, skill_slugs, enforcement_body, private_right_of_action, is_active, created_at, updated_at)
VALUES
('std_adv_017', 'ADVOCIS', 'FEDERAL_STATUTE', 'US', '42 USC § 1985(3)', '§ 1985(3)', 'Conspiracy to Interfere with Civil Rights', 'Two or more persons conspiring to deprive any person of equal protection of the laws.', '["Two or more persons acting in concert","Intent to deprive of equal protection or privileges","Overt act in furtherance of conspiracy","Resulting injury to person or property"]', '[{"section":"1985(3)","description":"Conspiracy to deprive of civil rights"}]', '["conspiracy_complaint","1983_complaint","civil_rights_complaint"]', '["constitutional-and-civil-rights-audit"]', 'Federal District Courts', 1, 1, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO governing_standards (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title, description, requirements, key_sections, document_types, skill_slugs, enforcement_body, private_right_of_action, is_active, created_at, updated_at)
VALUES
('std_adv_018', 'ADVOCIS', 'FEDERAL_STATUTE', 'US', '42 USC § 1986', '§ 1986', 'Neglect to Prevent Conspiracy Against Civil Rights', 'Liability for persons with knowledge of a §1985 conspiracy who have power to prevent it but neglect or refuse to do so.', '["Knowledge of §1985 conspiracy","Power to prevent","Neglect or refusal to act","One-year statute of limitations"]', '[{"section":"1986","description":"Neglect to prevent known conspiracy"}]', '["civil_rights_complaint","supervisory_liability","failure_to_intervene"]', '["constitutional-and-civil-rights-audit"]', 'Federal District Courts', 1, 1, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO governing_standards (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title, description, requirements, key_sections, document_types, skill_slugs, enforcement_body, private_right_of_action, is_active, created_at, updated_at)
VALUES
('std_adv_019', 'ADVOCIS', 'STATE_STATUTE', 'CA', 'Cal. Civ. Code § 52.1 (Bane Act)', 'Bane Act', 'Tom Bane Civil Rights Act', 'California civil action for interference with constitutional rights by threats, intimidation, or coercion.', '["Interference with constitutional or statutory rights","By threat, intimidation, or coercion","Treble damages available","Attorney fees to prevailing plaintiff","Does not require discriminatory animus"]', '[{"section":"52.1(a)","description":"Prohibition on interference with rights"},{"section":"52.1(b)","description":"Civil action and treble damages"},{"section":"52.1(h)","description":"Speech alone not sufficient unless threat"}]', '["civil_rights_complaint","Bane_Act_claim","police_misconduct"]', '["constitutional-and-civil-rights-audit"]', 'California Courts', 1, 1, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO governing_standards (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title, description, requirements, key_sections, document_types, skill_slugs, enforcement_body, private_right_of_action, is_active, created_at, updated_at)
VALUES
('std_adv_020', 'ADVOCIS', 'STATE_STATUTE', 'CA', 'Cal. Civ. Code § 52 (Unruh Civil Rights Act)', 'Unruh Act', 'Unruh Civil Rights Act', 'California law guaranteeing equal access to all business establishments regardless of protected characteristics.', '["All persons entitled to full and equal accommodations","Protected classes include sex, race, disability, and others","Minimum $4,000 statutory damages per violation","ADA violations are automatic Unruh violations"]', '[{"section":"51(b)","description":"Equal access guarantee"},{"section":"52(a)","description":"Damages — $4,000 minimum per violation"},{"section":"51(f)","description":"ADA incorporated"}]', '["discrimination_complaint","ADA_complaint","public_accommodation"]', '["constitutional-and-civil-rights-audit"]', 'California Courts / CRD', 1, 1, datetime('now'), datetime('now'));


-- ═══════════════════════════════════════════════════════════════════════════
-- REGULIS — BATCH 3: Additional compliance infrastructure
-- ═══════════════════════════════════════════════════════════════════════════

INSERT OR IGNORE INTO governing_standards (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title, description, requirements, key_sections, document_types, skill_slugs, enforcement_body, private_right_of_action, is_active, created_at, updated_at)
VALUES
('std_reg_038', 'REGULIS', 'STATE_STATUTE', 'CA', 'Cal. Penal Code §§ 422-422.4', 'PC §§ 422+', 'Criminal Threats', 'California criminal threat statute — willful threat to commit a crime resulting in death or great bodily injury.', '["Threat must be specific and unequivocal","Must cause sustained fear","Threat may be verbal, written, or electronic","Felony with prison sentence 16 months to 3 years"]', '[{"section":"422","description":"Criminal threats — elements and penalties"},{"section":"422.4","description":"Additional penalties for hate crime threats"}]', '["police_report","threat_assessment","protective_order","criminal_complaint"]', '["police-report-data-cross-reference","cad-log-compliance-audit"]', 'District Attorney / Law Enforcement', 1, 1, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO governing_standards (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title, description, requirements, key_sections, document_types, skill_slugs, enforcement_body, private_right_of_action, is_active, created_at, updated_at)
VALUES
('std_reg_039', 'REGULIS', 'STATE_STATUTE', 'CA', 'Cal. Fam. Code § 290', 'FC § 290', 'Enforcement of Family Law Orders', 'Family Code orders may be enforced by contempt of court, and the court retains jurisdiction to modify orders.', '["Orders enforceable by contempt","Court retains continuing jurisdiction","Wage assignment for support","Sanctions for noncompliance"]', '[{"section":"290","description":"Enforcement of judgments and orders"},{"section":"291","description":"Exclusion from other enforcement remedies"}]', '["contempt_motion","wage_assignment","enforcement_order"]', '["california-court-order-compliance-audit","california-family-law-expansion-audit"]', 'Superior Court of California', 1, 1, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO governing_standards (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title, description, requirements, key_sections, document_types, skill_slugs, enforcement_body, private_right_of_action, is_active, created_at, updated_at)
VALUES
('std_reg_040', 'REGULIS', 'STATE_STATUTE', 'CA', 'Cal. Code Civ. Proc. §§ 1209-1222', 'CCP §§ 1209+', 'Contempt of Court', 'California contempt statutes including civil and criminal contempt for disobedience of court orders.', '["Contempt for willful disobedience of court order","Contempt for violation of protective order","Fine and/or imprisonment (up to 5 days per count)","Purge conditions for civil contempt"]', '[{"section":"1209","description":"Acts constituting contempt"},{"section":"1211","description":"Procedure for contempt"},{"section":"1218","description":"Penalties for contempt in family law"}]', '["contempt_citation","OSC_re_contempt","court_order"]', '["california-court-order-compliance-audit"]', 'Superior Court of California', 1, 1, datetime('now'), datetime('now'));

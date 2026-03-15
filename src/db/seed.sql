-- Vernen Legal Compliance — Seed Data
-- Regulatory knowledge base and Persona Citizens registry
-- Created: March 15, 2026

-- ============================================================
-- SECTION 1: PERSONA CITIZENS
-- ============================================================

INSERT INTO persona_citizens (id, name, trademark, domain, description, status, conceived_at) VALUES
  ('pc-lexarc',    'LEXARC',     'LEXARC™',     'Legal Architecture',       'Legal structure and entity formation specialist. Designs compliant business architectures across jurisdictions.', 'CONCEIVED', '2026-03-15'),
  ('pc-syntara',   'SYNTARA',    'SYNTARA™',    'Regulatory Synthesis',     'Regulatory intelligence synthesizer. Aggregates and interprets multi-jurisdictional compliance requirements.', 'CONCEIVED', '2026-03-15'),
  ('pc-fiscara',   'FISCARA',    'FISCARA™',    'Fiscal Compliance',        'Tax and fiscal compliance navigator. Manages federal, state, and local tax obligation mapping.', 'CONCEIVED', '2026-03-15'),
  ('pc-regulis',   'REGULIS',    'REGULIS™',    'Compliance Reporting',     'Compliance report generator. Produces actionable compliance assessments and remediation plans.', 'CONCEIVED', '2026-03-15'),
  ('pc-advocis',   'ADVOCIS',    'ADVOCIS™',    'Client Advocacy',          'Client-facing advocate. Translates complex regulatory requirements into plain-language guidance.', 'CONCEIVED', '2026-03-15'),
  ('pc-integra',   'INTEGRA',    'INTEGRA™',    'Systems Integration',      'Platform integration specialist. Manages data flows, APIs, and third-party service connections.', 'CONCEIVED', '2026-03-15'),
  ('pc-vigilus',   'VIGILUS',    'VIGILUS™',    'Regulatory Monitoring',    'Continuous regulatory monitor. Tracks legislative changes and triggers compliance re-evaluations.', 'CONCEIVED', '2026-03-15'),
  ('pc-ethicara',  'ETHICARA',   'ETHICARA™',   'Ethics & Governance',      'Ethics and governance guardian. Ensures all platform operations meet ethical standards and governance requirements.', 'CONCEIVED', '2026-03-15'),
  ('pc-privaxis',  'PRIVAXIS',   'PRIVAXIS™',   'Privacy Compliance',       'Privacy and data protection specialist. Manages CCPA, GDPR, HIPAA, and emerging privacy frameworks.', 'CONCEIVED', '2026-03-15'),
  ('pc-vestara',   'VESTARA',    'VESTARA™',    'Insurance & Risk',         'Insurance and risk management advisor. Maps coverage requirements to business risk profiles.', 'CONCEIVED', '2026-03-15'),
  ('pc-metriqa',   'METRIQA',    'METRIQA™',    'Metrics & Analytics',      'Compliance metrics and analytics engine. Measures, benchmarks, and reports compliance health.', 'CONCEIVED', '2026-03-15'),
  ('pc-claridex',  'CLARIDEX',   'CLARIDEX™',   'Knowledge Indexing',       'Knowledge base curator. Indexes, classifies, and retrieves regulatory content across all domains.', 'CONCEIVED', '2026-03-15'),
  ('pc-nexaris',   'NEXARIS',    'NEXARIS™',    'Network Coordination',     'Inter-citizen coordinator. Orchestrates collaboration between Persona Citizens for complex compliance tasks.', 'CONCEIVED', '2026-03-15'),
  ('pc-forge-0',   'FORGE-0',    'FORGE-0™',    'Build & Deployment',       'Autonomous builder. Constructs, deploys, and maintains platform infrastructure and citizen shells.', 'CONCEIVED', '2026-03-15'),
  ('pc-sentinel-0','SENTINEL-0', 'SENTINEL-0™', 'Audit & Compliance Gates', 'Autonomous auditor. Validates build quality, enforces compliance gates, and maintains the compliance catalog.', 'CONCEIVED', '2026-03-15');


-- ============================================================
-- SECTION 2: FEDERAL COMPLIANCE RULES
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

-- EIN Requirement
('fed-tax-001', 'FED-TAX-001', 'Employer Identification Number (EIN)',
 'All business entities (except sole proprietors with no employees) must obtain an EIN from the IRS. Sole proprietors with employees or who file excise tax returns also require an EIN. Used for tax filing, banking, and federal reporting.',
 'TAXATION', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '26 USC § 6109; IRS Publication 1635', 'https://www.irs.gov/businesses/small-businesses-self-employed/employer-id-numbers', 1),

-- Federal income tax — C-Corp
('fed-tax-002', 'FED-TAX-002', 'Federal Corporate Income Tax (Form 1120)',
 'C-Corporations must file Form 1120 annually to report income, gains, losses, deductions, and credits. Corporate tax rate is 21% under the Tax Cuts and Jobs Act of 2017. Due by the 15th day of the 4th month after fiscal year-end.',
 'TAXATION', 'FEDERAL', NULL,
 '["CORPORATION"]',
 '2018-01-01', '26 USC § 11; 26 USC § 6012(a)(2)', 'https://www.irs.gov/forms-pubs/about-form-1120', 1),

-- Federal income tax — S-Corp
('fed-tax-003', 'FED-TAX-003', 'S-Corporation Tax Return (Form 1120-S)',
 'S-Corporations must file Form 1120-S annually as an information return. Income, deductions, and credits pass through to shareholders via Schedule K-1. Due by the 15th day of the 3rd month after fiscal year-end.',
 'TAXATION', 'FEDERAL', NULL,
 '["S_CORP"]',
 NULL, '26 USC § 1366; 26 USC § 6037', 'https://www.irs.gov/forms-pubs/about-form-1120-s', 1),

-- Federal income tax — Partnership
('fed-tax-004', 'FED-TAX-004', 'Partnership Tax Return (Form 1065)',
 'Partnerships and multi-member LLCs must file Form 1065 annually as an information return. Income and deductions pass through to partners via Schedule K-1. Due by the 15th day of the 3rd month after fiscal year-end.',
 'TAXATION', 'FEDERAL', NULL,
 '["PARTNERSHIP","LLC"]',
 NULL, '26 USC § 6031; 26 USC § 701-777', 'https://www.irs.gov/forms-pubs/about-form-1065', 1),

-- Sole proprietor — Schedule C
('fed-tax-005', 'FED-TAX-005', 'Sole Proprietor Income Reporting (Schedule C)',
 'Sole proprietors report business income and expenses on Schedule C (Form 1040). Subject to self-employment tax (Schedule SE) at 15.3% on net earnings. Due April 15 with individual return.',
 'TAXATION', 'FEDERAL', NULL,
 '["SOLE_PROPRIETORSHIP"]',
 NULL, '26 USC § 1402; IRS Schedule C (Form 1040)', 'https://www.irs.gov/forms-pubs/about-schedule-c-form-1040', 1),

-- Nonprofit — Form 990
('fed-tax-006', 'FED-TAX-006', 'Nonprofit Annual Information Return (Form 990)',
 'Tax-exempt organizations must file Form 990 (or 990-EZ/990-N depending on gross receipts) annually. Reports revenue, expenses, governance, and compliance. Due by the 15th day of the 5th month after fiscal year-end. Failure to file for 3 consecutive years results in automatic revocation of tax-exempt status.',
 'TAXATION', 'FEDERAL', NULL,
 '["NONPROFIT"]',
 NULL, '26 USC § 6033; Rev. Proc. 2011-15', 'https://www.irs.gov/forms-pubs/about-form-990', 1),

-- FICA / Payroll Tax
('fed-tax-007', 'FED-TAX-007', 'FICA Payroll Tax Withholding and Reporting',
 'Employers must withhold and remit Social Security tax (6.2% up to wage base) and Medicare tax (1.45%, plus 0.9% Additional Medicare Tax on wages over $200,000) from employee wages. Employer matches the 6.2% and 1.45%. Reported quarterly on Form 941.',
 'TAXATION', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '26 USC § 3101-3128; IRS Form 941', 'https://www.irs.gov/forms-pubs/about-form-941', 1),

-- FUTA
('fed-tax-008', 'FED-TAX-008', 'Federal Unemployment Tax (FUTA)',
 'Employers who pay $1,500+ in wages in any quarter or have 1+ employees for 20+ weeks must pay FUTA tax at 6.0% on first $7,000 of each employee''s wages. Credit of up to 5.4% for state unemployment taxes paid. Reported annually on Form 940.',
 'TAXATION', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '26 USC § 3301-3311; IRS Form 940', 'https://www.irs.gov/forms-pubs/about-form-940', 1),

-- ADA
('fed-emp-001', 'FED-EMP-001', 'Americans with Disabilities Act (ADA) Compliance',
 'Employers with 15 or more employees must provide reasonable accommodations for qualified individuals with disabilities and may not discriminate in hiring, firing, advancement, or compensation. Title III requires public accommodations to be accessible. Applies to physical locations and digital services.',
 'EMPLOYMENT', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '1990-07-26', '42 USC § 12101-12213; 29 CFR Part 1630', 'https://www.ada.gov/', 1),

-- OSHA
('fed-emp-002', 'FED-EMP-002', 'OSHA Workplace Safety Standards',
 'Employers must provide a workplace free from recognized hazards. Must comply with OSHA standards for the industry, maintain injury/illness records (Form 300/300A/301 for 11+ employees), display the OSHA poster, and report fatalities within 8 hours and hospitalizations within 24 hours.',
 'EMPLOYMENT', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '1970-12-29', '29 USC § 651-678; 29 CFR Part 1903-1990', 'https://www.osha.gov/laws-regs', 1),

-- FLSA
('fed-emp-003', 'FED-EMP-003', 'Fair Labor Standards Act (FLSA) — Minimum Wage and Overtime',
 'Covered employers must pay at least the federal minimum wage ($7.25/hour) and overtime at 1.5x regular rate for hours over 40 per workweek for non-exempt employees. Must maintain accurate time and pay records. Child labor provisions restrict hours and occupations for minors.',
 'EMPLOYMENT', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '1938-06-25', '29 USC § 201-219; 29 CFR Parts 510-794', 'https://www.dol.gov/agencies/whd/flsa', 1),

-- Title VII
('fed-emp-004', 'FED-EMP-004', 'Title VII — Prohibition of Employment Discrimination',
 'Employers with 15 or more employees may not discriminate based on race, color, religion, sex (including pregnancy, sexual orientation, gender identity per Bostock v. Clayton County), or national origin. Must post EEO notices. File EEO-1 report annually if 100+ employees.',
 'EMPLOYMENT', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '1964-07-02', '42 USC § 2000e; 29 CFR Part 1601-1608', 'https://www.eeoc.gov/statutes/title-vii-civil-rights-act-1964', 1),

-- COBRA
('fed-ins-001', 'FED-INS-001', 'COBRA Health Insurance Continuation',
 'Employers with 20 or more employees who offer group health plans must offer continuation coverage to employees and dependents after qualifying events (termination, reduction in hours, etc.) for 18-36 months. Must provide election notice within 14 days of learning of qualifying event.',
 'INSURANCE', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 '1986-04-07', '29 USC § 1161-1169; 26 USC § 4980B', 'https://www.dol.gov/general/topic/health-plans/cobra', 1),

-- ERISA
('fed-ins-002', 'FED-INS-002', 'ERISA — Employee Retirement Income Security Act',
 'Employers offering retirement plans (401(k), pension, profit-sharing) or welfare benefit plans must comply with ERISA fiduciary standards, reporting (Form 5500), disclosure requirements, and participant protections. Does not mandate plans but regulates those voluntarily offered.',
 'INSURANCE', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 '1974-09-02', '29 USC § 1001-1461; 29 CFR Part 2509-2590', 'https://www.dol.gov/general/topic/retirement/erisa', 1),

-- HIPAA
('fed-priv-001', 'FED-PRIV-001', 'HIPAA Privacy and Security Rules',
 'Covered entities (health plans, health care clearinghouses, health care providers conducting electronic transactions) and their business associates must protect individually identifiable health information. Requires administrative, physical, and technical safeguards. Breach notification within 60 days.',
 'PRIVACY', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '1996-08-21', '42 USC § 1320d; 45 CFR Parts 160, 162, 164', 'https://www.hhs.gov/hipaa/index.html', 1),

-- FTC Act
('fed-lic-001', 'FED-LIC-001', 'FTC Act — Prohibition of Unfair or Deceptive Practices',
 'Section 5 of the FTC Act prohibits unfair or deceptive acts or practices in or affecting commerce. Applies to all businesses engaged in commerce. Includes advertising claims, endorsement disclosures, negative option marketing, and data security practices.',
 'LICENSING', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '1914-09-26', '15 USC § 45; 16 CFR Parts 238-255', 'https://www.ftc.gov/legal-library/browse/statutes/federal-trade-commission-act', 1),

-- CAN-SPAM
('fed-priv-002', 'FED-PRIV-002', 'CAN-SPAM Act — Commercial Email Requirements',
 'Businesses sending commercial email must include accurate header information, non-deceptive subject lines, identification as an advertisement, sender''s physical postal address, and a clear opt-out mechanism. Opt-out requests must be honored within 10 business days. Violations up to $51,744 per email.',
 'PRIVACY', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2004-01-01', '15 USC § 7701-7713; 16 CFR Part 316', 'https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business', 1),

-- COPPA
('fed-priv-003', 'FED-PRIV-003', 'COPPA — Children''s Online Privacy Protection',
 'Operators of websites or online services directed at children under 13 (or with actual knowledge of collecting data from children under 13) must obtain verifiable parental consent, post a privacy policy, and provide parents access to collected data. Updated 2024 rule strengthens protections.',
 'PRIVACY', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2000-04-21', '15 USC § 6501-6506; 16 CFR Part 312', 'https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa', 1),

-- AML/BSA
('fed-lic-002', 'FED-LIC-002', 'Bank Secrecy Act / Anti-Money Laundering (BSA/AML)',
 'Financial institutions and money services businesses must establish AML programs, file Currency Transaction Reports (CTRs) for transactions over $10,000, file Suspicious Activity Reports (SARs), maintain records, and comply with Customer Identification Program (CIP) and beneficial ownership requirements under the Corporate Transparency Act.',
 'LICENSING', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '1970-10-26', '31 USC § 5311-5332; 31 CFR Chapter X; Corporate Transparency Act (P.L. 116-283)', 'https://www.fincen.gov/resources/statutes-and-regulations', 1),

-- BOI Reporting (Corporate Transparency Act)
('fed-rep-001', 'FED-REP-001', 'Beneficial Ownership Information (BOI) Reporting',
 'Under the Corporate Transparency Act, most companies created or registered to do business in the U.S. must report beneficial ownership information to FinCEN. Existing companies had until January 1, 2025 (extended via court orders). New companies must file within 30 days of formation. Exemptions for large operating companies, regulated entities, and others.',
 'REPORTING', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 '2024-01-01', 'Corporate Transparency Act, 31 USC § 5336; 31 CFR Part 1010.380', 'https://www.fincen.gov/boi', 1);


-- ============================================================
-- SECTION 3: STATE COMPLIANCE RULES — CALIFORNIA
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ca-form-001', 'CA-FORM-001', 'California Business Entity Formation',
 'LLCs file Articles of Organization (Form LLC-1) with the Secretary of State ($70 filing fee). Corporations file Articles of Incorporation (Form ARTS-GS, $100 filing fee). Must designate a California registered agent. Foreign entities must register before transacting business in California.',
 'FORMATION', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Cal. Corp. Code § 17702.01 (LLC); Cal. Corp. Code § 200 (Corp)', 'https://www.sos.ca.gov/business-programs/business-entities', 1),

('ca-tax-001', 'CA-TAX-001', 'California Franchise Tax',
 'LLCs pay an annual $800 minimum franchise tax plus a fee based on total income ($900-$11,790 for income over $250,000). Corporations pay the greater of 8.84% of net income or $800 minimum franchise tax. S-Corps pay 1.5% of net income (minimum $800). First-year exemption available for LLCs/Corps formed after 01/01/2024.',
 'TAXATION', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 NULL, 'Cal. Rev. & Tax. Code § 17941 (LLC); § 23151 (Corp); § 23802 (S-Corp)', 'https://www.ftb.ca.gov/', 1),

('ca-tax-002', 'CA-TAX-002', 'California Sales and Use Tax Registration',
 'Businesses selling tangible personal property must register with the California Department of Tax and Fee Administration (CDTFA) for a seller''s permit. Base state rate is 7.25%, with district taxes bringing totals to 7.25%-10.75% depending on location. Remote sellers with $500,000+ in CA sales must also collect.',
 'TAXATION', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Cal. Rev. & Tax. Code § 6001-7176; CDTFA Regulation 1684', 'https://www.cdtfa.ca.gov/', 1),

('ca-emp-001', 'CA-EMP-001', 'California Employer Registration (EDD)',
 'Employers must register with the Employment Development Department (EDD) within 20 days of paying $100+ in wages in a calendar quarter. Must withhold state income tax (PIT), pay State Disability Insurance (SDI at 1.1%), and contribute to Unemployment Insurance (UI at 1.5-6.2%) and Employment Training Tax (ETT at 0.1%).',
 'EMPLOYMENT', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Cal. Unemp. Ins. Code § 1088; Cal. Rev. & Tax. Code § 18663', 'https://edd.ca.gov/en/payroll_taxes/', 1),

('ca-rep-001', 'CA-REP-001', 'California Statement of Information (Annual/Biennial Report)',
 'Corporations must file a Statement of Information (Form SI-550) annually with the Secretary of State ($25 fee). LLCs must file a Statement of Information (Form LLC-12) biennially ($20 fee). Reports officer/member information, registered agent, and principal address.',
 'REPORTING', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'Cal. Corp. Code § 1502 (Corp); Cal. Corp. Code § 17702.09 (LLC)', 'https://www.sos.ca.gov/business-programs/business-entities/statements', 1),

('ca-ins-001', 'CA-INS-001', 'California Workers'' Compensation Insurance',
 'All California employers must carry workers'' compensation insurance, with no exceptions for size. Can be obtained through a licensed insurer, the State Compensation Insurance Fund, or self-insurance (for qualifying employers). Failure to carry coverage is a criminal offense (Cal. Labor Code § 3700.5).',
 'INSURANCE', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Cal. Labor Code § 3700-3709.5', 'https://www.dir.ca.gov/dwc/employer.htm', 1),

('ca-ins-002', 'CA-INS-002', 'California Unemployment Insurance (UI)',
 'Employers must pay UI contributions on the first $7,000 of each employee''s wages. New employer rate is 3.4%. Rates adjust annually based on employer''s experience rating. Reported quarterly to EDD on Form DE-9/DE-9C.',
 'INSURANCE', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Cal. Unemp. Ins. Code § 976-985', 'https://edd.ca.gov/en/payroll_taxes/rates_and_withholding/', 1),

('ca-priv-001', 'CA-PRIV-001', 'California Consumer Privacy Act (CCPA/CPRA)',
 'Businesses that collect California residents'' personal information and meet thresholds (annual gross revenue $25M+, buy/sell/share data of 100,000+ consumers/households, or derive 50%+ of revenue from selling personal information) must provide privacy notices, honor opt-out requests, and allow data deletion. CPRA amendments effective January 1, 2023 added the California Privacy Protection Agency.',
 'PRIVACY', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2020-01-01', 'Cal. Civ. Code § 1798.100-1798.199.100', 'https://oag.ca.gov/privacy/ccpa', 1),

('ca-lic-001', 'CA-LIC-001', 'California Business License (City Level)',
 'California does not require a state-level general business license, but virtually all cities and counties require a local business license or tax certificate. Requirements vary by jurisdiction. Most cities require a business tax certificate for any commercial activity within city limits.',
 'LICENSING', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Various municipal codes; Cal. Bus. & Prof. Code (professional licenses)', 'https://www.calgold.ca.gov/', 1);


-- ============================================================
-- SECTION 4: STATE COMPLIANCE RULES — TEXAS
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('tx-form-001', 'TX-FORM-001', 'Texas Business Entity Formation',
 'LLCs file a Certificate of Formation (Form 205) with the Secretary of State ($300 filing fee). Corporations file a Certificate of Formation (Form 201, $300 filing fee). Must designate a registered agent in Texas. Foreign entities must register via Form 304 ($750 filing fee).',
 'FORMATION', 'STATE', 'TX',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Tex. Bus. Orgs. Code § 3.001-3.010', 'https://www.sos.state.tx.us/corp/forms_702.shtml', 1),

('tx-tax-001', 'TX-TAX-001', 'Texas Franchise Tax (Margin Tax)',
 'Taxable entities with total revenue exceeding $2.47 million (2024 threshold) must pay the Texas franchise tax. Rate is 0.375% for retail/wholesale or 0.75% for other businesses, calculated on the lesser of 70% total revenue, total revenue minus COGS, total revenue minus compensation, or $1 million. No-tax-due threshold applies below revenue limit. Filed annually with the Comptroller.',
 'TAXATION', 'STATE', 'TX',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 NULL, 'Tex. Tax Code § 171.001-171.903', 'https://comptroller.texas.gov/taxes/franchise/', 1),

('tx-tax-002', 'TX-TAX-002', 'Texas Sales and Use Tax Registration',
 'Businesses selling taxable goods or services must obtain a Texas sales tax permit from the Comptroller (no fee). State rate is 6.25%, with local taxes up to 2% additional (max 8.25% combined). Remote sellers with $500,000+ in TX sales must collect. Filed monthly, quarterly, or annually depending on volume.',
 'TAXATION', 'STATE', 'TX',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Tex. Tax Code § 151.001-151.802', 'https://comptroller.texas.gov/taxes/sales/', 1),

('tx-emp-001', 'TX-EMP-001', 'Texas Employer Registration (TWC)',
 'Employers must register with the Texas Workforce Commission (TWC). Texas has no state income tax withholding. Employers pay unemployment insurance tax on the first $9,000 of each employee''s wages. New employer rate is 2.7%. Must report new hires within 20 days.',
 'EMPLOYMENT', 'STATE', 'TX',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Tex. Labor Code § 204.001-204.087', 'https://www.twc.texas.gov/businesses/employer-registration', 1),

('tx-rep-001', 'TX-REP-001', 'Texas Annual Franchise Tax Report',
 'All taxable entities must file an annual franchise tax report with the Comptroller, even if no tax is due. Public Information Report (PIR) filed concurrently. Due May 15 each year. Entities below the no-tax-due threshold file Form 05-163. Late filing results in forfeiture of right to transact business.',
 'REPORTING', 'STATE', 'TX',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Tex. Tax Code § 171.201-171.212', 'https://comptroller.texas.gov/taxes/franchise/filing-requirements.php', 1),

('tx-ins-001', 'TX-INS-001', 'Texas Workers'' Compensation Insurance',
 'Texas is the only state where workers'' compensation insurance is optional for private employers (non-subscribers). However, non-subscribing employers lose certain legal defenses in workplace injury lawsuits. Government contractors and certain industries effectively require coverage. Employers who opt in obtain coverage through licensed insurers or self-insurance.',
 'INSURANCE', 'STATE', 'TX',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Tex. Labor Code § 406.002-406.034', 'https://www.tdi.texas.gov/wc/employer/index.html', 1),

('tx-ins-002', 'TX-INS-002', 'Texas Unemployment Insurance',
 'Employers pay UI tax on the first $9,000 of each employee''s annual wages. New employer rate is 2.7%. Rates adjusted annually based on experience. Reported quarterly to TWC. Liable when paying $1,500+ in wages in a quarter or having 1+ employees for 20+ weeks.',
 'INSURANCE', 'STATE', 'TX',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Tex. Labor Code § 204.001-204.087; § 201.021', 'https://www.twc.texas.gov/businesses/unemployment-tax-basics', 1);


-- ============================================================
-- SECTION 5: STATE COMPLIANCE RULES — FLORIDA
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('fl-form-001', 'FL-FORM-001', 'Florida Business Entity Formation',
 'LLCs file Articles of Organization with the Division of Corporations ($125 filing fee). Corporations file Articles of Incorporation ($70 filing fee). Must designate a Florida registered agent. Foreign entities file Application for Authorization ($50-125 depending on entity type).',
 'FORMATION', 'STATE', 'FL',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Fla. Stat. § 605.0201 (LLC); Fla. Stat. § 607.0202 (Corp)', 'https://dos.fl.gov/sunbiz/start-business/', 1),

('fl-tax-001', 'FL-TAX-001', 'Florida Corporate Income Tax',
 'Florida imposes a 5.5% corporate income tax on C-Corporations (and entities taxed as corporations) with income apportioned to Florida. $50,000 exemption applies. S-Corporations, sole proprietors, and partnerships are generally exempt. Florida has no personal income tax. Filed on Form F-1120.',
 'TAXATION', 'STATE', 'FL',
 '["CORPORATION"]',
 NULL, 'Fla. Stat. § 220.001-220.904', 'https://floridarevenue.com/taxes/taxesfees/Pages/corporate.aspx', 1),

('fl-tax-002', 'FL-TAX-002', 'Florida Sales and Use Tax Registration',
 'Businesses selling, renting, or leasing tangible personal property or taxable services must register with the Department of Revenue for a sales tax certificate. State rate is 6%, with county discretionary surtaxes of 0.5%-2.5%. Remote sellers with $100,000+ in FL sales must collect.',
 'TAXATION', 'STATE', 'FL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Fla. Stat. § 212.001-212.21', 'https://floridarevenue.com/taxes/taxesfees/Pages/sales_tax.aspx', 1),

('fl-emp-001', 'FL-EMP-001', 'Florida Employer Registration (Reemployment Tax)',
 'Employers must register with the Department of Revenue for reemployment (unemployment) tax. No state income tax withholding. Reemployment tax paid on the first $7,000 of each employee''s wages. New employer rate is 2.7%. Must report new hires within 20 days to the FL New Hire Reporting Center.',
 'EMPLOYMENT', 'STATE', 'FL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Fla. Stat. § 443.036-443.231', 'https://floridarevenue.com/taxes/taxesfees/Pages/reemploy.aspx', 1),

('fl-rep-001', 'FL-REP-001', 'Florida Annual Report',
 'All entities registered with the Division of Corporations must file an annual report by May 1. LLCs pay $138.75, corporations pay $150. Failure to file results in administrative dissolution. Reports update officer/director information, registered agent, and principal address. Filed online via Sunbiz.',
 'REPORTING', 'STATE', 'FL',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Fla. Stat. § 605.0212 (LLC); Fla. Stat. § 607.1622 (Corp)', 'https://dos.fl.gov/sunbiz/manage-business/annual-reports/', 1),

('fl-ins-001', 'FL-INS-001', 'Florida Workers'' Compensation Insurance',
 'Required for construction employers with 1+ employees, non-construction employers with 4+ employees, and agricultural employers with 6+ regular or 12+ seasonal employees. Coverage obtained through licensed carriers or self-insurance. Non-compliance is a felony for construction employers.',
 'INSURANCE', 'STATE', 'FL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Fla. Stat. § 440.01-440.60', 'https://www.myfloridacfo.com/division/wc/', 1),

('fl-ins-002', 'FL-INS-002', 'Florida Reemployment (Unemployment) Insurance',
 'Employers pay reemployment tax on the first $7,000 of each employee''s wages annually. New employer rate is 2.7%. Rates adjusted annually based on experience. Reported quarterly to the Department of Revenue.',
 'INSURANCE', 'STATE', 'FL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Fla. Stat. § 443.131', 'https://floridarevenue.com/taxes/taxesfees/Pages/reemploy.aspx', 1);


-- ============================================================
-- SECTION 6: STATE COMPLIANCE RULES — NEW YORK
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ny-form-001', 'NY-FORM-001', 'New York Business Entity Formation',
 'LLCs file Articles of Organization with the Department of State ($200 filing fee). Corporations file a Certificate of Incorporation ($125 filing fee). LLCs must publish formation notice in two newspapers for 6 consecutive weeks in the county of the LLC''s office (cost varies, $200-$2,000+). Must designate a NY registered agent.',
 'FORMATION', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.Y. LLC Law § 203; N.Y. Bus. Corp. Law § 402; N.Y. LLC Law § 206 (publication)', 'https://dos.ny.gov/business-entities', 1),

('ny-tax-001', 'NY-TAX-001', 'New York Corporate Franchise Tax',
 'Corporations pay the highest of: business income base (7.25% for income over $5M, 6.5% otherwise), capital base (0.04%, max $5M), or fixed dollar minimum ($25-$200,000 based on receipts). S-Corps pay a fixed dollar minimum. LLCs with income sourced to NY may owe a filing fee ($25-$4,500 based on NY-source gross income).',
 'TAXATION', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 NULL, 'N.Y. Tax Law § 209-211-B (Corp); N.Y. Tax Law § 658(c) (LLC fee)', 'https://www.tax.ny.gov/bus/ct/article9a.htm', 1),

('ny-tax-002', 'NY-TAX-002', 'New York Sales Tax Registration',
 'Businesses making taxable sales must register for a Certificate of Authority with the Department of Taxation and Finance. State rate is 4%, with local rates adding 3%-4.875% (NYC total is 8.875%). Remote sellers with $500,000+ in NY sales and 100+ transactions must collect.',
 'TAXATION', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.Y. Tax Law § 1105; § 1134', 'https://www.tax.ny.gov/bus/st/stidx.htm', 1),

('ny-emp-001', 'NY-EMP-001', 'New York Employer Registration',
 'Employers must register with the Department of Taxation and Finance for income tax withholding and with the Department of Labor for unemployment insurance. Must withhold NY state (and NYC/Yonkers if applicable) income tax. UI paid on first $12,500 of wages per employee. New employer rate is approximately 4.1%.',
 'EMPLOYMENT', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.Y. Tax Law § 671; N.Y. Labor Law § 570-591', 'https://dol.ny.gov/unemployment-insurance', 1),

('ny-rep-001', 'NY-REP-001', 'New York Biennial Statement',
 'LLCs and corporations must file a biennial statement with the Department of State ($9 fee). Due every 2 years in the anniversary month of formation. Reports current address of the entity and the address to which the Secretary of State can forward process. Filed online.',
 'REPORTING', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'N.Y. LLC Law § 301; N.Y. Bus. Corp. Law § 408', 'https://dos.ny.gov/businesses', 1),

('ny-ins-001', 'NY-INS-001', 'New York Workers'' Compensation Insurance',
 'All employers in New York must carry workers'' compensation insurance, including for part-time employees. Coverage obtained through the NY State Insurance Fund (NYSIF), private carriers, or self-insurance. Must also carry disability benefits insurance and Paid Family Leave insurance.',
 'INSURANCE', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.Y. Workers'' Comp. Law § 10-50; N.Y. Workers'' Comp. Law § 26-a (disability); N.Y. Workers'' Comp. Law § 204 (PFL)', 'https://www.wcb.ny.gov/', 1),

('ny-ins-002', 'NY-INS-002', 'New York Unemployment Insurance',
 'Employers pay UI contributions on the first $12,500 of each employee''s wages. New employer rate is approximately 4.1%. Rates adjusted annually based on experience and UI trust fund balance. Reported quarterly to the Department of Labor.',
 'INSURANCE', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.Y. Labor Law § 570-591', 'https://dol.ny.gov/unemployment-insurance', 1),

('ny-tax-003', 'NY-TAX-003', 'New York City Commercial Rent Tax',
 'Tenants in Manhattan south of 96th Street paying annual commercial rent of $250,000 or more must pay the Commercial Rent Tax at 3.9% of rent above the base amount (after a 35% credit, effective rate is approximately 2.535%). Filed with NYC Department of Finance.',
 'TAXATION', 'LOCAL', 'NY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'NYC Admin. Code § 11-701 to 11-718', 'https://www.nyc.gov/site/finance/taxes/business-commercial-rent-tax.page', 1);


-- ============================================================
-- SECTION 7: STATE COMPLIANCE RULES — ILLINOIS
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('il-form-001', 'IL-FORM-001', 'Illinois Business Entity Formation',
 'LLCs file Articles of Organization with the Secretary of State ($150 filing fee). Corporations file Articles of Incorporation ($150 filing fee). Must designate an Illinois registered agent. Foreign entities file Application for Authority ($150).',
 'FORMATION', 'STATE', 'IL',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, '805 ILCS 180/5-1 (LLC); 805 ILCS 5/2.10 (Corp)', 'https://www.ilsos.gov/departments/business_services/', 1),

('il-tax-001', 'IL-TAX-001', 'Illinois Corporate Income and Replacement Tax',
 'Corporations pay a flat 7% income tax plus a 2.5% Personal Property Replacement Tax (PPRT) on net income, for a combined rate of 9.5%. Partnerships, S-Corps, and trusts pay 1.5% PPRT. LLCs taxed as partnerships pay 1.5% PPRT. Individual income tax rate is 4.95%.',
 'TAXATION', 'STATE', 'IL',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 NULL, '35 ILCS 5/201 (income tax); 35 ILCS 515/201 (replacement tax)', 'https://tax.illinois.gov/businesses.html', 1),

('il-tax-002', 'IL-TAX-002', 'Illinois Sales Tax Registration',
 'Retailers must register with the Department of Revenue for Retailers'' Occupation Tax. State rate is 6.25% (1% food/drugs). Local rates add 0.25%-5.25%. Remote sellers with $100,000+ in IL sales or 200+ transactions must collect. Registered via MyTax Illinois.',
 'TAXATION', 'STATE', 'IL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '35 ILCS 120/1 (Retailers'' Occupation Tax Act)', 'https://tax.illinois.gov/businesses/taxregistration.html', 1),

('il-emp-001', 'IL-EMP-001', 'Illinois Employer Registration',
 'Employers must register with the Department of Revenue for income tax withholding (4.95% flat rate) and with the Department of Employment Security (IDES) for unemployment insurance. UI paid on first $13,590 of wages per employee. New employer rate is 3.95%.',
 'EMPLOYMENT', 'STATE', 'IL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '35 ILCS 5/701-710 (withholding); 820 ILCS 405/1500', 'https://ides.illinois.gov/employer.html', 1),

('il-rep-001', 'IL-REP-001', 'Illinois Annual Report',
 'All entities registered with the Secretary of State must file an annual report. LLCs pay $75, corporations pay $75. Due in the anniversary month of formation. Failure to file results in administrative dissolution. Filed online at the Secretary of State website.',
 'REPORTING', 'STATE', 'IL',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, '805 ILCS 180/50-1 (LLC); 805 ILCS 5/14.05 (Corp)', 'https://www.ilsos.gov/departments/business_services/annual_reports.html', 1),

('il-ins-001', 'IL-INS-001', 'Illinois Workers'' Compensation Insurance',
 'All employers must carry workers'' compensation insurance. No minimum employee count. Coverage through licensed insurers or self-insurance (approved by the Illinois Workers'' Compensation Commission). Non-compliance is a Class 4 felony.',
 'INSURANCE', 'STATE', 'IL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '820 ILCS 305/1-305/30 (Workers'' Compensation Act)', 'https://iwcc.illinois.gov/', 1),

('il-ins-002', 'IL-INS-002', 'Illinois Unemployment Insurance',
 'Employers pay UI contributions on the first $13,590 of each employee''s wages. New employer rate is 3.95%. Rates adjusted annually based on experience. Reported quarterly to IDES.',
 'INSURANCE', 'STATE', 'IL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '820 ILCS 405/1500-1510', 'https://ides.illinois.gov/employer/tax-rate-information.html', 1);


-- ============================================================
-- SECTION 8: STATE COMPLIANCE RULES — PENNSYLVANIA
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('pa-form-001', 'PA-FORM-001', 'Pennsylvania Business Entity Formation',
 'LLCs file a Certificate of Organization with the Department of State ($125 filing fee). Corporations file Articles of Incorporation ($125 filing fee). Must designate a registered office in Pennsylvania (not a registered agent — PA uses registered office concept). Foreign entities file registration ($250).',
 'FORMATION', 'STATE', 'PA',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, '15 Pa.C.S. § 8821 (LLC); 15 Pa.C.S. § 1306 (Corp)', 'https://www.dos.pa.gov/BusinessCharities/', 1),

('pa-tax-001', 'PA-TAX-001', 'Pennsylvania Corporate Net Income Tax',
 'C-Corporations pay a 8.99% corporate net income tax (rate decreasing to 4.99% by 2031 under Act 53 of 2022). S-Corps, partnerships, and LLCs are pass-through entities — income taxed at the individual level at Pennsylvania''s flat 3.07% personal income tax rate.',
 'TAXATION', 'STATE', 'PA',
 '["CORPORATION"]',
 NULL, '72 P.S. § 7402; Act 53 of 2022 (rate reduction schedule)', 'https://www.revenue.pa.gov/TaxTypes/CorporateNetIncomeTax/', 1),

('pa-tax-002', 'PA-TAX-002', 'Pennsylvania Sales Tax Registration',
 'Businesses making taxable sales must obtain a sales tax license from the Department of Revenue. State rate is 6%, with an additional 1% in Allegheny County and 2% in Philadelphia. Remote sellers with $100,000+ in PA sales must collect. License is free.',
 'TAXATION', 'STATE', 'PA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '72 P.S. § 7201-7282', 'https://www.revenue.pa.gov/TaxTypes/SalesUseTax/', 1),

('pa-emp-001', 'PA-EMP-001', 'Pennsylvania Employer Registration',
 'Employers must register with the Department of Revenue for PA personal income tax withholding (3.07% flat) and with the Department of Labor & Industry for UC tax. UC paid on first $10,000 of wages per employee. Must also register for local earned income tax withholding where applicable.',
 'EMPLOYMENT', 'STATE', 'PA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '72 P.S. § 7316; 43 P.S. § 781', 'https://www.uc.pa.gov/employers-uc-services-uc-tax/', 1),

('pa-rep-001', 'PA-REP-001', 'Pennsylvania Decennial Report',
 'Pennsylvania requires a decennial (every 10 years) report for all entities, not an annual report. Filed with the Department of State in years ending in ''1'' (2021, 2031, etc.). $70 filing fee. Failure to file does not result in dissolution but may affect registered office status.',
 'REPORTING', 'STATE', 'PA',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, '15 Pa.C.S. § 146', 'https://www.dos.pa.gov/BusinessCharities/Business/Pages/Decennial-Reports.aspx', 1),

('pa-ins-001', 'PA-INS-001', 'Pennsylvania Workers'' Compensation Insurance',
 'All employers must carry workers'' compensation insurance. Coverage through licensed insurers, the State Workers'' Insurance Fund (SWIF), or self-insurance. Executive officers of corporations can exempt themselves. Non-compliance results in fines and potential criminal charges.',
 'INSURANCE', 'STATE', 'PA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '77 P.S. § 1-1603', 'https://www.dli.pa.gov/Businesses/Compensation/', 1),

('pa-ins-002', 'PA-INS-002', 'Pennsylvania Unemployment Compensation',
 'Employers pay UC contributions on the first $10,000 of each employee''s wages. New employer rate is approximately 3.822% (includes surcharges). Rates adjusted annually based on experience. Reported quarterly to the Department of Labor & Industry.',
 'INSURANCE', 'STATE', 'PA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '43 P.S. § 781-914', 'https://www.uc.pa.gov/employers-uc-services-uc-tax/', 1);


-- ============================================================
-- SECTION 9: STATE COMPLIANCE RULES — OHIO
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('oh-form-001', 'OH-FORM-001', 'Ohio Business Entity Formation',
 'LLCs file Articles of Organization with the Secretary of State ($99 filing fee). Corporations file Articles of Incorporation ($99 filing fee). Must designate a statutory agent in Ohio. Foreign entities file Application for License ($99). Can file online or by mail.',
 'FORMATION', 'STATE', 'OH',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Ohio Rev. Code § 1706.16 (LLC); Ohio Rev. Code § 1701.04 (Corp)', 'https://www.ohiosos.gov/businesses/', 1),

('oh-tax-001', 'OH-TAX-001', 'Ohio Commercial Activity Tax (CAT)',
 'Businesses with Ohio taxable gross receipts over $150,000 annually must register and pay the Commercial Activity Tax at 0.26% on receipts over $1 million. Ohio does not impose a traditional corporate income tax on most businesses. The CAT replaced the corporate franchise tax and tangible personal property tax. Filed quarterly or annually.',
 'TAXATION', 'STATE', 'OH',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2005-07-01', 'Ohio Rev. Code § 5751.01-5751.99', 'https://tax.ohio.gov/business/ohio-business-taxes/commercial-activity-tax', 1),

('oh-tax-002', 'OH-TAX-002', 'Ohio Sales Tax Registration',
 'Vendors selling tangible personal property or taxable services must obtain a vendor''s license from the Department of Taxation. State rate is 5.75%, with county rates adding 0.75%-2.25%. Remote sellers with $100,000+ in OH sales or 200+ transactions must collect. License is free.',
 'TAXATION', 'STATE', 'OH',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Ohio Rev. Code § 5739.01-5739.99', 'https://tax.ohio.gov/business/ohio-business-taxes/sales-and-use', 1),

('oh-emp-001', 'OH-EMP-001', 'Ohio Employer Registration',
 'Employers must register with the Department of Taxation for income tax withholding and with the Department of Job and Family Services (ODJFS) for unemployment compensation. Ohio income tax is progressive (0%-3.5%). UC paid on first $9,000 of wages. New employer rate is 2.7%.',
 'EMPLOYMENT', 'STATE', 'OH',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Ohio Rev. Code § 5747.06 (withholding); Ohio Rev. Code § 4141.01-4141.99', 'https://jfs.ohio.gov/unemployment/employers', 1),

('oh-rep-001', 'OH-REP-001', 'Ohio Statutory Agent Update (No Annual Report)',
 'Ohio does not require an annual report for domestic entities. However, entities must maintain a current statutory agent and may need to file updates if agent information changes. Foreign entities must file a biennial report. LLCs and corporations should keep formation records current with the Secretary of State.',
 'REPORTING', 'STATE', 'OH',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Ohio Rev. Code § 1706.09 (LLC agent); Ohio Rev. Code § 1701.07 (Corp agent)', 'https://www.ohiosos.gov/businesses/', 1),

('oh-ins-001', 'OH-INS-001', 'Ohio Workers'' Compensation Insurance (BWC)',
 'All employers must carry workers'' compensation through the Ohio Bureau of Workers'' Compensation (BWC) — Ohio is a monopolistic state fund jurisdiction (private insurance not available). Self-insurance available for large employers. Premium rates based on industry classification and experience.',
 'INSURANCE', 'STATE', 'OH',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Ohio Rev. Code § 4123.01-4123.99', 'https://www.bwc.ohio.gov/', 1),

('oh-ins-002', 'OH-INS-002', 'Ohio Unemployment Compensation',
 'Employers pay UC contributions on the first $9,000 of each employee''s wages. New employer rate is 2.7%. Rates adjusted annually based on experience. Reported quarterly to ODJFS.',
 'INSURANCE', 'STATE', 'OH',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Ohio Rev. Code § 4141.25', 'https://jfs.ohio.gov/unemployment/employers', 1);


-- ============================================================
-- SECTION 10: STATE COMPLIANCE RULES — GEORGIA
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ga-form-001', 'GA-FORM-001', 'Georgia Business Entity Formation',
 'LLCs file Articles of Organization with the Secretary of State ($100 filing fee). Corporations file Articles of Incorporation ($100 filing fee). Must designate a registered agent in Georgia. Foreign entities file Application for Certificate of Authority ($225). Filed online via Georgia Corporations Division.',
 'FORMATION', 'STATE', 'GA',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'O.C.G.A. § 14-11-203 (LLC); O.C.G.A. § 14-2-202 (Corp)', 'https://sos.ga.gov/corporations-division', 1),

('ga-tax-001', 'GA-TAX-001', 'Georgia Corporate Income Tax',
 'Corporations pay a flat 5.75% net income tax on income apportioned to Georgia (reduced from 6% effective 2024). Pass-through entities (S-Corps, partnerships, LLCs) may elect to pay tax at the entity level under the SALT cap workaround. Individual income tax rate is 5.49% (decreasing to 4.99% by 2029).',
 'TAXATION', 'STATE', 'GA',
 '["CORPORATION","S_CORP","LLC","PARTNERSHIP"]',
 NULL, 'O.C.G.A. § 48-7-21 (corporate); O.C.G.A. § 48-7-20 (individual)', 'https://dor.georgia.gov/taxes/business-taxes/corporate-income-tax', 1),

('ga-tax-002', 'GA-TAX-002', 'Georgia Sales Tax Registration',
 'Businesses making retail sales of tangible personal property must register with the Department of Revenue for a sales tax number. State rate is 4%, with local rates of 2%-4% additional. Remote sellers with $100,000+ in GA sales or 200+ transactions must collect.',
 'TAXATION', 'STATE', 'GA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'O.C.G.A. § 48-8-1 to 48-8-121', 'https://dor.georgia.gov/taxes/sales-use-tax', 1),

('ga-emp-001', 'GA-EMP-001', 'Georgia Employer Registration',
 'Employers must register with the Department of Revenue for income tax withholding and with the Department of Labor for unemployment insurance. State income tax withholding follows graduated rates. UI paid on first $9,500 of wages per employee. New employer rate is 2.7%.',
 'EMPLOYMENT', 'STATE', 'GA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'O.C.G.A. § 48-7-100 (withholding); O.C.G.A. § 34-8-150 (UI)', 'https://dol.georgia.gov/employers', 1),

('ga-rep-001', 'GA-REP-001', 'Georgia Annual Registration',
 'All entities registered with the Secretary of State must file an annual registration between January 1 and April 1. Filing fee is $50 for all entity types. Failure to file results in administrative dissolution. Filed online through the Georgia Corporations Division.',
 'REPORTING', 'STATE', 'GA',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'O.C.G.A. § 14-2-1622 (Corp); O.C.G.A. § 14-11-1101 (LLC)', 'https://sos.ga.gov/corporations-division', 1),

('ga-ins-001', 'GA-INS-001', 'Georgia Workers'' Compensation Insurance',
 'Employers with 3 or more employees (including regular part-time) must carry workers'' compensation insurance. Officers of corporations counted as employees. Coverage obtained through licensed insurers or self-insurance. Non-compliance is a misdemeanor with fines up to $10,000.',
 'INSURANCE', 'STATE', 'GA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'O.C.G.A. § 34-9-1 to 34-9-432', 'https://sbwc.georgia.gov/', 1),

('ga-ins-002', 'GA-INS-002', 'Georgia Unemployment Insurance',
 'Employers pay UI contributions on the first $9,500 of each employee''s wages. New employer rate is 2.7%. Rates adjusted annually based on experience. Reported quarterly to the Department of Labor.',
 'INSURANCE', 'STATE', 'GA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'O.C.G.A. § 34-8-150 to 34-8-196', 'https://dol.georgia.gov/employers', 1);


-- ============================================================
-- SECTION 11: STATE COMPLIANCE RULES — NORTH CAROLINA
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('nc-form-001', 'NC-FORM-001', 'North Carolina Business Entity Formation',
 'LLCs file Articles of Organization with the Secretary of State ($125 filing fee). Corporations file Articles of Incorporation ($125 filing fee). Must designate a registered agent in North Carolina. Foreign entities file Application for Certificate of Authority ($250).',
 'FORMATION', 'STATE', 'NC',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.C. Gen. Stat. § 57D-2-20 (LLC); N.C. Gen. Stat. § 55-2-02 (Corp)', 'https://www.sosnc.gov/divisions/business_registration', 1),

('nc-tax-001', 'NC-TAX-001', 'North Carolina Corporate Income Tax',
 'North Carolina corporate income tax rate is 2.5% for tax year 2024, scheduled to phase down to 0% by 2030 under S.L. 2021-180. This makes NC increasingly attractive for corporate formation. Individual income tax is a flat 4.5% (also decreasing). Pass-through income taxed at individual level.',
 'TAXATION', 'STATE', 'NC',
 '["CORPORATION"]',
 NULL, 'N.C. Gen. Stat. § 105-130.3; S.L. 2021-180', 'https://www.ncdor.gov/taxes-forms/corporate-income-franchise-tax', 1),

('nc-tax-002', 'NC-TAX-002', 'North Carolina Sales Tax Registration',
 'Retailers must obtain a Certificate of Registration from the Department of Revenue. State rate is 4.75%, with local rates of 2%-2.75% additional. Remote sellers with $100,000+ in NC sales or 200+ transactions must collect. Registration is free.',
 'TAXATION', 'STATE', 'NC',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.C. Gen. Stat. § 105-164.1 to 105-164.44K', 'https://www.ncdor.gov/taxes-forms/sales-and-use-tax', 1),

('nc-emp-001', 'NC-EMP-001', 'North Carolina Employer Registration',
 'Employers must register with the Department of Revenue for income tax withholding (flat 4.5%) and with the Division of Employment Security (DES) for unemployment insurance. UI paid on first $31,400 of wages per employee. New employer rate is 1.0%.',
 'EMPLOYMENT', 'STATE', 'NC',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.C. Gen. Stat. § 105-163.1 (withholding); N.C. Gen. Stat. § 96-1', 'https://des.nc.gov/employers', 1),

('nc-rep-001', 'NC-REP-001', 'North Carolina Annual Report',
 'All entities registered with the Secretary of State must file an annual report by April 15. Filing fee is $200 for LLCs and $25 for corporations. Failure to file results in administrative dissolution. Reports current information about officers, directors, registered agent, and principal office.',
 'REPORTING', 'STATE', 'NC',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.C. Gen. Stat. § 57D-2-24 (LLC); N.C. Gen. Stat. § 55-16-22 (Corp)', 'https://www.sosnc.gov/divisions/business_registration', 1),

('nc-ins-001', 'NC-INS-001', 'North Carolina Workers'' Compensation Insurance',
 'Employers with 3 or more employees must carry workers'' compensation insurance. Coverage obtained through licensed insurers or self-insurance (approved by the NC Industrial Commission). Non-compliance subjects employers to NCIC enforcement and personal liability for employee injuries.',
 'INSURANCE', 'STATE', 'NC',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.C. Gen. Stat. § 97-1 to 97-122', 'https://www.ic.nc.gov/', 1),

('nc-ins-002', 'NC-INS-002', 'North Carolina Unemployment Insurance',
 'Employers pay UI contributions on the first $31,400 of each employee''s wages (one of the highest wage bases nationally). New employer rate is 1.0%. Rates adjusted annually based on experience. Reported quarterly to the Division of Employment Security.',
 'INSURANCE', 'STATE', 'NC',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.C. Gen. Stat. § 96-9.2 to 96-9.15', 'https://des.nc.gov/employers', 1);


-- ============================================================
-- SECTION 12: STATE COMPLIANCE RULES — MICHIGAN
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('mi-form-001', 'MI-FORM-001', 'Michigan Business Entity Formation',
 'LLCs file Articles of Organization with the Department of Licensing and Regulatory Affairs (LARA) ($50 filing fee). Corporations file Articles of Incorporation ($10-60 filing fee based on shares). Must designate a registered agent in Michigan. Foreign entities file Application for Certificate of Authority ($50).',
 'FORMATION', 'STATE', 'MI',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'MCL § 450.4202 (LLC); MCL § 450.1202 (Corp)', 'https://www.michigan.gov/lara/bureau-list/bcs', 1),

('mi-tax-001', 'MI-TAX-001', 'Michigan Corporate Income Tax',
 'C-Corporations pay a 6% Corporate Income Tax (CIT) on business income apportioned to Michigan. Replaced the Michigan Business Tax in 2012. Pass-through entities (S-Corps, partnerships, LLCs) are taxed at the individual level at Michigan''s flat 4.25% income tax rate. Flow-through entity tax election available.',
 'TAXATION', 'STATE', 'MI',
 '["CORPORATION"]',
 '2012-01-01', 'MCL § 206.601-206.699 (Corporate Income Tax Act)', 'https://www.michigan.gov/taxes/business-taxes/cit', 1),

('mi-tax-002', 'MI-TAX-002', 'Michigan Sales Tax Registration',
 'Retailers must obtain a sales tax license from the Department of Treasury. State rate is 6% (no local sales taxes in Michigan). Remote sellers with $100,000+ in MI sales or 200+ transactions must collect. License is free.',
 'TAXATION', 'STATE', 'MI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'MCL § 205.51-205.78 (General Sales Tax Act)', 'https://www.michigan.gov/taxes/business-taxes/sales-use-tax', 1),

('mi-emp-001', 'MI-EMP-001', 'Michigan Employer Registration',
 'Employers must register with the Department of Treasury for income tax withholding (4.25% flat rate) and with the Unemployment Insurance Agency (UIA) for unemployment tax. UI paid on first $9,500 of wages per employee. New employer rate is 2.7%. Must report new hires within 20 days.',
 'EMPLOYMENT', 'STATE', 'MI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'MCL § 206.351 (withholding); MCL § 421.1-421.75 (Michigan Employment Security Act)', 'https://www.michigan.gov/leo/bureaus-agencies/uia/employer', 1),

('mi-rep-001', 'MI-REP-001', 'Michigan Annual Report / Annual Statement',
 'LLCs and corporations must file an annual report (called Annual Statement for LLCs) with LARA. LLCs pay $25, corporations pay $25. Due February 15 each year. Failure to file for 2 consecutive years results in automatic dissolution. Reports current information about members/officers and registered agent.',
 'REPORTING', 'STATE', 'MI',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'MCL § 450.4207 (LLC); MCL § 450.1911 (Corp)', 'https://www.michigan.gov/lara/bureau-list/bcs/annual-reports-and-statements', 1),

('mi-ins-001', 'MI-INS-001', 'Michigan Workers'' Compensation Insurance',
 'Employers with 1 or more employees (with limited exceptions for domestic/agricultural workers) must carry workers'' compensation insurance. Coverage through licensed private insurers or self-insurance. Non-compliance results in fines and stop-work orders.',
 'INSURANCE', 'STATE', 'MI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'MCL § 418.101-418.941 (Worker''s Disability Compensation Act)', 'https://www.michigan.gov/leo/bureaus-agencies/wca', 1),

('mi-ins-002', 'MI-INS-002', 'Michigan Unemployment Insurance',
 'Employers pay UI contributions on the first $9,500 of each employee''s wages. New employer rate is 2.7%. Rates adjusted annually based on experience. Reported quarterly to the Unemployment Insurance Agency.',
 'INSURANCE', 'STATE', 'MI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'MCL § 421.19', 'https://www.michigan.gov/leo/bureaus-agencies/uia/employer', 1);


-- ============================================================
-- SECTION 4: REMAINING 40 STATES + DC COMPLIANCE RULES
-- ============================================================


-- ============================================================
-- ALASKA (AK)
-- No individual income tax. No state sales tax.
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ak-form-001', 'AK-FORM-001', 'Alaska Business Entity Formation',
 'LLCs file Articles of Organization with the Division of Corporations, Business and Professional Licensing ($250 filing fee). Corporations file Articles of Incorporation ($250 filing fee). Must designate a registered agent in Alaska. Foreign entities must register before conducting business in the state.',
 'FORMATION', 'STATE', 'AK',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'AS § 10.50.070 (LLC); AS § 10.06.205 (Corp)', 'https://www.commerce.alaska.gov/web/cbpl/Corporations.aspx', 1),

('ak-tax-001', 'AK-TAX-001', 'Alaska Corporate Income Tax',
 'Alaska imposes a graduated corporate income tax on C-corporations with income attributable to Alaska, ranging from 0% on the first $25,000 to 9.4% on income over $222,000. S-corporations, LLCs, partnerships, and sole proprietorships are not subject to state income tax. There is no individual income tax.',
 'TAXATION', 'STATE', 'AK',
 '["CORPORATION"]',
 NULL, 'AS § 43.20.011', 'https://tax.alaska.gov/programs/programs/index.aspx?60000', 1),

('ak-rep-001', 'AK-REP-001', 'Alaska Biennial Report',
 'All entities registered with the Division of Corporations must file a biennial report by January 2 of the filing year. Corporations pay $100, LLCs pay $100. Reports current officers/members, registered agent, and principal address.',
 'REPORTING', 'STATE', 'AK',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'AS § 10.06.818 (Corp); AS § 10.50.765 (LLC)', 'https://www.commerce.alaska.gov/web/cbpl/Corporations.aspx', 1),

('ak-ins-001', 'AK-INS-001', 'Alaska Workers'' Compensation Insurance',
 'All employers must carry workers'' compensation insurance for employees. Coverage obtained through licensed private insurers or self-insurance approved by the Division of Workers'' Compensation. Failure to carry coverage is a misdemeanor.',
 'INSURANCE', 'STATE', 'AK',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'AS § 23.30.045-23.30.075', 'https://labor.alaska.gov/wc/employer.htm', 1),

('ak-emp-001', 'AK-EMP-001', 'Alaska Unemployment Insurance',
 'Employers must register with the Department of Labor and Workforce Development. UI contributions paid on the first $47,100 of each employee''s wages. New employer rate is approximately 1.0-5.4%. Reported quarterly.',
 'INSURANCE', 'STATE', 'AK',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'AS § 23.20.165-23.20.290', 'https://labor.alaska.gov/estax/', 1);


-- ============================================================
-- ALABAMA (AL)
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('al-form-001', 'AL-FORM-001', 'Alabama Business Entity Formation',
 'LLCs file a Certificate of Formation with the Secretary of State ($200 filing fee). Corporations file a Certificate of Incorporation ($200 filing fee). Must publish notice of formation in a county newspaper. Must designate a registered agent in Alabama.',
 'FORMATION', 'STATE', 'AL',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Ala. Code § 10A-5A-2.01 (LLC); Ala. Code § 10A-2A-2.02 (Corp)', 'https://www.sos.alabama.gov/business-entities', 1),

('al-tax-001', 'AL-TAX-001', 'Alabama Business Income Tax',
 'Corporations pay a corporate income tax of 6.5% on net taxable income. Pass-through entities (LLCs, S-Corps, partnerships) pass income to owners who pay Alabama individual income tax at rates of 2%-5%. Business privilege tax also applies: $0.25 per $1,000 of net worth in Alabama (minimum $100).',
 'TAXATION', 'STATE', 'AL',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'Ala. Code § 40-18-31 (Corp income tax); Ala. Code § 40-14A-22 (Business privilege tax)', 'https://revenue.alabama.gov/business-tax/', 1),

('al-tax-002', 'AL-TAX-002', 'Alabama Sales Tax Registration',
 'Businesses selling tangible personal property must obtain a sales tax license from the Department of Revenue. State sales tax rate is 4%, with local rates adding 1%-7.5%. Remote sellers with $250,000+ in AL sales must collect.',
 'TAXATION', 'STATE', 'AL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Ala. Code § 40-23-2; § 40-23-6', 'https://revenue.alabama.gov/sales-use/', 1),

('al-rep-001', 'AL-REP-001', 'Alabama Annual Report / Business Privilege Tax Return',
 'All entities must file an Annual Report and Business Privilege Tax Return with the Department of Revenue. Due April 15 each year. The report serves as both the annual report and privilege tax filing. Minimum privilege tax is $100.',
 'REPORTING', 'STATE', 'AL',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'Ala. Code § 40-14A-22; § 10A-1-5.32', 'https://revenue.alabama.gov/business-privilege-tax/', 1),

('al-ins-001', 'AL-INS-001', 'Alabama Workers'' Compensation Insurance',
 'Employers with 5 or more employees must carry workers'' compensation insurance. Coverage obtained through licensed private insurers or self-insurance approved by the Department of Labor. Construction employers must carry coverage regardless of employee count.',
 'INSURANCE', 'STATE', 'AL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Ala. Code § 25-5-1 to 25-5-340', 'https://labor.alabama.gov/wc/', 1),

('al-emp-001', 'AL-EMP-001', 'Alabama Unemployment Insurance',
 'Employers must register with the Department of Labor for UI. Contributions paid on the first $8,000 of each employee''s wages. New employer rate is 2.7%. Reported quarterly.',
 'INSURANCE', 'STATE', 'AL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Ala. Code § 25-4-51', 'https://labor.alabama.gov/unemployment/', 1);


-- ============================================================
-- ARKANSAS (AR)
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ar-form-001', 'AR-FORM-001', 'Arkansas Business Entity Formation',
 'LLCs file a Certificate of Organization with the Secretary of State ($50 filing fee online). Corporations file Articles of Incorporation ($50 filing fee). Must designate a registered agent in Arkansas.',
 'FORMATION', 'STATE', 'AR',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Ark. Code § 4-37-201 (LLC); Ark. Code § 4-27-202 (Corp)', 'https://www.sos.arkansas.gov/business-commercial-services-bcs', 1),

('ar-tax-001', 'AR-TAX-001', 'Arkansas Income Tax',
 'Corporations pay a graduated corporate income tax from 1.0% to 5.3% on net income. Pass-through entity income flows to individual returns taxed at 0%-4.4% (2026 rates). Arkansas has adopted a flat income tax phase-in.',
 'TAXATION', 'STATE', 'AR',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'Ark. Code § 26-51-205 (Corp); Ark. Code § 26-51-201 (Individual)', 'https://www.dfa.arkansas.gov/income-tax/', 1),

('ar-tax-002', 'AR-TAX-002', 'Arkansas Sales Tax Registration',
 'Businesses selling tangible personal property must register for a sales tax permit with the Department of Finance and Administration. State rate is 6.5%, with local rates adding up to 5.125%. Remote sellers with $100,000+ in AR sales must collect.',
 'TAXATION', 'STATE', 'AR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Ark. Code § 26-52-301', 'https://www.dfa.arkansas.gov/sales-use-tax/', 1),

('ar-rep-001', 'AR-REP-001', 'Arkansas Annual Franchise Tax Report',
 'All business entities must file an Annual Franchise Tax Report with the Secretary of State by May 1. Franchise tax is $150 for corporations; LLCs pay $150. Report includes officer/member information and registered agent.',
 'REPORTING', 'STATE', 'AR',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'Ark. Code § 26-54-104; § 4-37-602 (LLC)', 'https://www.sos.arkansas.gov/business-commercial-services-bcs', 1),

('ar-ins-001', 'AR-INS-001', 'Arkansas Workers'' Compensation Insurance',
 'Employers with 3 or more employees must carry workers'' compensation insurance. Coverage through licensed private insurers or self-insurance. Construction employers must carry coverage regardless of employee count.',
 'INSURANCE', 'STATE', 'AR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Ark. Code § 11-9-401 to 11-9-414', 'https://www.awcc.state.ar.us/', 1),

('ar-emp-001', 'AR-EMP-001', 'Arkansas Unemployment Insurance',
 'Employers must register with the Division of Workforce Services for UI. Contributions paid on the first $7,000 of each employee''s wages. New employer rate is approximately 3.1%. Reported quarterly.',
 'INSURANCE', 'STATE', 'AR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Ark. Code § 11-10-501', 'https://www.dws.arkansas.gov/employers/', 1);


-- ============================================================
-- ARIZONA (AZ)
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('az-form-001', 'AZ-FORM-001', 'Arizona Business Entity Formation',
 'LLCs file Articles of Organization with the Arizona Corporation Commission ($50 filing fee). Corporations file Articles of Incorporation ($60 filing fee). LLCs must publish Articles of Organization in a newspaper within 60 days of formation. Must designate a statutory agent in Arizona.',
 'FORMATION', 'STATE', 'AZ',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'ARS § 29-3201 (LLC); ARS § 10-202 (Corp); ARS § 29-3202 (publication)', 'https://ecorp.azcc.gov/', 1),

('az-tax-001', 'AZ-TAX-001', 'Arizona Income Tax',
 'Arizona has a flat individual income tax rate of 2.5% (effective 2023). Corporations pay a flat 4.9% corporate income tax on net income. Pass-through entity income flows to individual returns. Minimum corporate tax is $50.',
 'TAXATION', 'STATE', 'AZ',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'ARS § 43-1011 (Individual); ARS § 43-1111 (Corp)', 'https://azdor.gov/business', 1),

('az-tax-002', 'AZ-TAX-002', 'Arizona Transaction Privilege Tax (Sales Tax)',
 'Arizona uses a Transaction Privilege Tax (TPT) rather than a traditional sales tax—it is a tax on the seller for the privilege of doing business. Businesses must obtain a TPT license from the Department of Revenue. State rate is 5.6%, with local rates varying. Remote sellers with $100,000+ in AZ sales must register.',
 'TAXATION', 'STATE', 'AZ',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'ARS § 42-5001 to 42-5076', 'https://azdor.gov/transaction-privilege-tax', 1),

('az-rep-001', 'AZ-REP-001', 'Arizona Annual Report',
 'Corporations must file an Annual Report with the Arizona Corporation Commission by the anniversary month of incorporation. LLCs are not required to file annual reports in Arizona. Corporation filing fee varies.',
 'REPORTING', 'STATE', 'AZ',
 '["CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'ARS § 10-1622 (Corp)', 'https://ecorp.azcc.gov/', 1),

('az-ins-001', 'AZ-INS-001', 'Arizona Workers'' Compensation Insurance',
 'All employers must carry workers'' compensation insurance regardless of employee count. Coverage obtained through licensed private insurers, the State Compensation Fund (SCF), or self-insurance. Non-compliance is a Class 6 felony.',
 'INSURANCE', 'STATE', 'AZ',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'ARS § 23-901 to 23-1091', 'https://www.azica.gov/workers-compensation-home', 1),

('az-emp-001', 'AZ-EMP-001', 'Arizona Unemployment Insurance',
 'Employers must register with the Department of Economic Security for UI. Contributions paid on the first $8,000 of each employee''s wages. New employer rate is 2.0%. Reported quarterly.',
 'INSURANCE', 'STATE', 'AZ',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'ARS § 23-601 to 23-799', 'https://des.az.gov/services/employment/unemployment-employer', 1);


-- ============================================================
-- COLORADO (CO)
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('co-form-001', 'CO-FORM-001', 'Colorado Business Entity Formation',
 'LLCs file Articles of Organization online with the Secretary of State ($50 filing fee). Corporations file Articles of Incorporation ($50 filing fee). Must designate a registered agent in Colorado. Trade names must be registered separately.',
 'FORMATION', 'STATE', 'CO',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'CRS § 7-80-203 (LLC); CRS § 7-102-102 (Corp)', 'https://www.sos.state.co.us/pubs/business/businessHome.html', 1),

('co-tax-001', 'CO-TAX-001', 'Colorado Income Tax',
 'Colorado imposes a flat 4.4% income tax on individuals and corporations. Pass-through entity income flows to individual returns. Corporations must file a Colorado C-Corporation Income Tax Return (Form 112).',
 'TAXATION', 'STATE', 'CO',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'CRS § 39-22-104; CRS § 39-22-301', 'https://tax.colorado.gov/business-income-tax', 1),

('co-tax-002', 'CO-TAX-002', 'Colorado Sales Tax Registration',
 'Businesses selling tangible personal property must obtain a sales tax license from the Department of Revenue ($16 fee). State rate is 2.9%, with various local and special district rates. Colorado has a destination-based sourcing system for remote sellers with $100,000+ in CO sales.',
 'TAXATION', 'STATE', 'CO',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'CRS § 39-26-102 to 39-26-120', 'https://tax.colorado.gov/sales-tax', 1),

('co-rep-001', 'CO-REP-001', 'Colorado Periodic Report',
 'All business entities must file a Periodic Report with the Secretary of State annually. Reports are due in the anniversary month of formation. Filing fee is $10 online. Reports registered agent, principal address, and entity status.',
 'REPORTING', 'STATE', 'CO',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'CRS § 7-90-501', 'https://www.sos.state.co.us/pubs/business/periodicReport.html', 1),

('co-ins-001', 'CO-INS-001', 'Colorado Workers'' Compensation Insurance',
 'All employers with one or more employees must carry workers'' compensation insurance. Coverage through licensed private insurers, Pinnacol Assurance (quasi-state fund), or self-insurance. Non-compliance results in penalties of $500/day.',
 'INSURANCE', 'STATE', 'CO',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'CRS § 8-40-101 to 8-47-209', 'https://cdle.colorado.gov/workers-compensation', 1),

('co-emp-001', 'CO-EMP-001', 'Colorado Unemployment Insurance',
 'Employers must register with the Colorado Department of Labor and Employment for UI. Contributions paid on the first $23,800 of each employee''s wages. New employer rate is 1.7%. Reported quarterly.',
 'INSURANCE', 'STATE', 'CO',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'CRS § 8-76-101 to 8-76-117', 'https://cdle.colorado.gov/employers', 1),

('co-emp-002', 'CO-EMP-002', 'Colorado FAMLI (Family and Medical Leave Insurance)',
 'Effective January 1, 2024, Colorado requires participation in the Family and Medical Leave Insurance (FAMLI) program. Premiums are 0.9% of wages, split 50/50 between employer and employee. Employers with fewer than 10 employees only remit the employee share. Provides up to 12 weeks of paid leave.',
 'EMPLOYMENT', 'STATE', 'CO',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'CRS § 8-13.3-501 to 8-13.3-524', 'https://famli.colorado.gov/', 1);


-- ============================================================
-- CONNECTICUT (CT)
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ct-form-001', 'CT-FORM-001', 'Connecticut Business Entity Formation',
 'LLCs file a Certificate of Organization with the Secretary of State ($120 filing fee). Corporations file a Certificate of Incorporation ($250 filing fee). Must designate a registered agent in Connecticut.',
 'FORMATION', 'STATE', 'CT',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Conn. Gen. Stat. § 34-243g (LLC); Conn. Gen. Stat. § 33-636 (Corp)', 'https://portal.ct.gov/SOTS/Business-Services', 1),

('ct-tax-001', 'CT-TAX-001', 'Connecticut Business Income Tax',
 'Corporations pay a 7.5% corporate income tax on net income. Additionally, a 10% surcharge applies for companies with income over $100 million. Pass-through entity tax (PET) available at 6.99% with offsetting individual credit. Individual income tax rates range from 3% to 6.99%.',
 'TAXATION', 'STATE', 'CT',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'Conn. Gen. Stat. § 12-214 (Corp); § 12-700 (Individual); § 12-699 (PET)', 'https://portal.ct.gov/DRS/Businesses/Business-Tax-Types', 1),

('ct-tax-002', 'CT-TAX-002', 'Connecticut Sales Tax Registration',
 'Businesses making retail sales must register for a Sales and Use Tax Permit with the Department of Revenue Services. State rate is 6.35% (7.75% on certain luxury items). Remote sellers with $100,000+ in CT sales or 200+ transactions must collect.',
 'TAXATION', 'STATE', 'CT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Conn. Gen. Stat. § 12-407 to 12-432', 'https://portal.ct.gov/DRS/Sales-Tax/Sales-and-Use-Tax', 1),

('ct-rep-001', 'CT-REP-001', 'Connecticut Annual Report',
 'All business entities must file an Annual Report with the Secretary of State. Due on the anniversary date of formation. Filing fee is $80 for LLCs and $150 for corporations. Reports current officers/members and registered agent.',
 'REPORTING', 'STATE', 'CT',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'Conn. Gen. Stat. § 33-953 (Corp); § 34-243r (LLC)', 'https://portal.ct.gov/SOTS/Business-Services/Annual-Reports', 1),

('ct-ins-001', 'CT-INS-001', 'Connecticut Workers'' Compensation Insurance',
 'All employers with one or more employees must carry workers'' compensation insurance. Coverage through licensed private insurers or self-insurance. Non-compliance results in fines up to $50,000 and potential criminal penalties.',
 'INSURANCE', 'STATE', 'CT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Conn. Gen. Stat. § 31-275 to 31-355a', 'https://wcc.state.ct.us/', 1),

('ct-emp-001', 'CT-EMP-001', 'Connecticut Unemployment Insurance',
 'Employers must register with the Department of Labor for UI. Contributions paid on the first $15,000 of each employee''s wages. New employer rate is approximately 3.0%. Reported quarterly.',
 'INSURANCE', 'STATE', 'CT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Conn. Gen. Stat. § 31-225', 'https://www.ctdol.state.ct.us/uitax/', 1),

('ct-emp-002', 'CT-EMP-002', 'Connecticut Paid Leave (CTPL)',
 'Connecticut employers with one or more employees must participate in the CT Paid Leave program. Employee contributions at 0.5% of wages. Provides up to 12 weeks of paid family and medical leave. Administered by the CT Paid Leave Authority.',
 'EMPLOYMENT', 'STATE', 'CT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2022-01-01', 'Conn. Gen. Stat. § 31-49e to 31-49t', 'https://ctpaidleave.org/', 1);


-- ============================================================
-- DISTRICT OF COLUMBIA (DC)
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('dc-form-001', 'DC-FORM-001', 'District of Columbia Business Entity Formation',
 'LLCs file Articles of Organization with the Department of Licensing and Consumer Protection (DLCP) ($220 filing fee). Corporations file Articles of Incorporation ($220 filing fee). Must designate a registered agent in DC. All businesses must obtain a Basic Business License (BBL).',
 'FORMATION', 'STATE', 'DC',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'DC Code § 29-802.01 (LLC); DC Code § 29-302.02 (Corp)', 'https://dcra.dc.gov/service/register-business', 1),

('dc-tax-001', 'DC-TAX-001', 'District of Columbia Business Income Tax',
 'Corporations and unincorporated businesses with DC-source income exceeding $12,000 pay franchise tax at 8.25%. Individual income tax rates range from 4% to 10.75%. All businesses must file a DC Franchise Tax Return.',
 'TAXATION', 'STATE', 'DC',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'DC Code § 47-1807.01 to 47-1807.12; DC Code § 47-1808.01', 'https://otr.cfo.dc.gov/page/business-tax', 1),

('dc-tax-002', 'DC-TAX-002', 'District of Columbia Sales Tax Registration',
 'Businesses making retail sales must register for a sales tax certificate with the Office of Tax and Revenue. Sales tax rate is 6% (10% on alcohol, 10.25% on restaurant meals and liquor, 14.95% on parking). Remote sellers with $100,000+ in DC sales or 200+ transactions must collect.',
 'TAXATION', 'STATE', 'DC',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'DC Code § 47-2002', 'https://otr.cfo.dc.gov/page/sales-and-use-tax', 1),

('dc-rep-001', 'DC-REP-001', 'District of Columbia Biennial Report',
 'All business entities must file a Biennial Report with DLCP. Due April 1 of odd-numbered years for domestic entities. Filing fee is $300 for most entities. Reports current officers/members and registered agent.',
 'REPORTING', 'STATE', 'DC',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'DC Code § 29-102.11', 'https://dcra.dc.gov/service/biennial-report', 1),

('dc-ins-001', 'DC-INS-001', 'District of Columbia Workers'' Compensation Insurance',
 'All employers in DC must carry workers'' compensation insurance. Coverage through licensed private insurers or self-insurance. Non-compliance is a misdemeanor with fines up to $10,000 and/or imprisonment.',
 'INSURANCE', 'STATE', 'DC',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'DC Code § 32-1501 to 32-1545', 'https://does.dc.gov/page/workers-compensation', 1),

('dc-emp-001', 'DC-EMP-001', 'District of Columbia Unemployment Insurance',
 'Employers must register with the Department of Employment Services (DOES) for UI. Contributions paid on the first $9,000 of each employee''s wages. New employer rate is 2.7%. Reported quarterly.',
 'INSURANCE', 'STATE', 'DC',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'DC Code § 51-101 to 51-151', 'https://does.dc.gov/page/employer-tax-information', 1),

('dc-emp-002', 'DC-EMP-002', 'DC Paid Family Leave (Universal Paid Leave)',
 'Employers must contribute 0.62% of gross wages to the Universal Paid Leave fund. Provides up to 12 weeks of parental leave, 12 weeks of family leave, 12 weeks of medical leave, and 2 weeks of prenatal leave. Employee contributions are not required.',
 'EMPLOYMENT', 'STATE', 'DC',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2020-07-01', 'DC Code § 32-541.01 to 32-541.12', 'https://does.dc.gov/page/dc-paid-family-leave', 1);


-- ============================================================
-- DELAWARE (DE)
-- No state sales tax.
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('de-form-001', 'DE-FORM-001', 'Delaware Business Entity Formation',
 'LLCs file a Certificate of Formation with the Division of Corporations ($90 filing fee). Corporations file a Certificate of Incorporation ($89 minimum filing fee). Delaware is the most popular incorporation state due to its well-developed business law and Court of Chancery. Must designate a registered agent in Delaware.',
 'FORMATION', 'STATE', 'DE',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, '6 Del. C. § 18-201 (LLC); 8 Del. C. § 101-102 (Corp)', 'https://corp.delaware.gov/', 1),

('de-tax-001', 'DE-TAX-001', 'Delaware Business Income Tax',
 'Corporations pay an 8.7% corporate income tax on income allocated to Delaware. Individual income tax rates range from 2.2% to 6.6%. LLCs with no Delaware operations may not owe income tax but must still pay the annual tax. All entities with a Delaware nexus must file.',
 'TAXATION', 'STATE', 'DE',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, '30 Del. C. § 1902 (Corp); 30 Del. C. § 1102 (Individual)', 'https://revenue.delaware.gov/business-tax-forms/', 1),

('de-tax-002', 'DE-TAX-002', 'Delaware Gross Receipts Tax',
 'Delaware imposes a Gross Receipts Tax on the total gross revenues of businesses in lieu of sales tax. Rates vary by business activity (0.0945% to 1.9914%). Businesses must obtain a license and file monthly returns.',
 'TAXATION', 'STATE', 'DE',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '30 Del. C. § 2301-2322', 'https://revenue.delaware.gov/gross-receipts-tax/', 1),

('de-rep-001', 'DE-REP-001', 'Delaware Annual Report / Franchise Tax',
 'Corporations must file an Annual Report and pay franchise tax by March 1 ($50 minimum for Authorized Shares method, $400 minimum for Assumed Par Value Capital method). LLCs pay a flat $300 annual tax by June 1. No annual report required for LLCs.',
 'REPORTING', 'STATE', 'DE',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, '8 Del. C. § 502 (Corp franchise tax); 6 Del. C. § 18-1107 (LLC annual tax)', 'https://corp.delaware.gov/paytaxes/', 1),

('de-ins-001', 'DE-INS-001', 'Delaware Workers'' Compensation Insurance',
 'All employers must carry workers'' compensation insurance. Coverage through licensed private insurers or self-insurance. Delaware does not have a state fund. Non-compliance results in fines and potential criminal penalties.',
 'INSURANCE', 'STATE', 'DE',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '19 Del. C. § 2301 to 2399', 'https://dia.delawareworks.com/workers-comp/', 1),

('de-emp-001', 'DE-EMP-001', 'Delaware Unemployment Insurance',
 'Employers must register with the Division of Unemployment Insurance for UI. Contributions paid on the first $10,500 of each employee''s wages. New employer rate is approximately 1.8%. Reported quarterly.',
 'INSURANCE', 'STATE', 'DE',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '19 Del. C. § 3301-3374', 'https://ui.delawareworks.com/', 1);


-- ============================================================
-- HAWAII (HI)
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('hi-form-001', 'HI-FORM-001', 'Hawaii Business Entity Formation',
 'LLCs file Articles of Organization with the Department of Commerce and Consumer Affairs (DCCA) ($50 filing fee). Corporations file Articles of Incorporation ($50 filing fee). Must designate a registered agent in Hawaii. All businesses must also register with the Department of Taxation.',
 'FORMATION', 'STATE', 'HI',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'HRS § 428-202 (LLC); HRS § 414-32 (Corp)', 'https://cca.hawaii.gov/breg/', 1),

('hi-tax-001', 'HI-TAX-001', 'Hawaii Income Tax',
 'Corporations pay a graduated corporate income tax from 4.4% to 6.4%. Individual income tax rates range from 1.4% to 11% (one of the highest in the nation). Pass-through entity income flows to individual returns.',
 'TAXATION', 'STATE', 'HI',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'HRS § 235-71 (Corp); HRS § 235-51 (Individual)', 'https://tax.hawaii.gov/geninfo/a2_b2_1income/', 1),

('hi-tax-002', 'HI-TAX-002', 'Hawaii General Excise Tax (GET)',
 'Hawaii imposes a General Excise Tax (GET) on all business activity in lieu of a traditional sales tax. Rate is 4% for most activities (4.5% in Honolulu with surcharge). Applies to gross income, including wholesale and services. All businesses must obtain a GET license ($20).',
 'TAXATION', 'STATE', 'HI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'HRS § 237-1 to 237-45', 'https://tax.hawaii.gov/geninfo/a2_b1_5get/', 1),

('hi-rep-001', 'HI-REP-001', 'Hawaii Annual Report',
 'All business entities must file an Annual Report with the DCCA by the end of the anniversary quarter of formation. Filing fee is $15 for LLCs and $25 for corporations. Reports current officers/members and registered agent.',
 'REPORTING', 'STATE', 'HI',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'HRS § 414-364 (Corp); HRS § 428-210 (LLC)', 'https://cca.hawaii.gov/breg/annual/', 1),

('hi-ins-001', 'HI-INS-001', 'Hawaii Workers'' Compensation Insurance',
 'All employers must carry workers'' compensation insurance. Coverage through licensed private insurers or self-insurance approved by the Department of Labor. Hawaii also uniquely requires employers to provide Temporary Disability Insurance (TDI) and Prepaid Health Care to employees.',
 'INSURANCE', 'STATE', 'HI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'HRS § 386-1 to 386-205; HRS § 392-1 (TDI); HRS § 393-1 (Prepaid Health)', 'https://labor.hawaii.gov/dcd/workers-compensation/', 1),

('hi-emp-001', 'HI-EMP-001', 'Hawaii Unemployment Insurance',
 'Employers must register with the Department of Labor for UI. Contributions paid on the first $59,100 of each employee''s wages (one of the highest wage bases). New employer rate is approximately 5.4%. Reported quarterly.',
 'INSURANCE', 'STATE', 'HI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'HRS § 383-61 to 383-76', 'https://labor.hawaii.gov/ui/', 1);


-- ============================================================
-- IOWA (IA)
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ia-form-001', 'IA-FORM-001', 'Iowa Business Entity Formation',
 'LLCs file a Certificate of Organization with the Secretary of State ($50 filing fee). Corporations file Articles of Incorporation ($50 filing fee). Must designate a registered agent in Iowa. Biennial reports required.',
 'FORMATION', 'STATE', 'IA',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Iowa Code § 489.201 (LLC); Iowa Code § 490.202 (Corp)', 'https://sos.iowa.gov/business/FormsAndFees.html', 1),

('ia-tax-001', 'IA-TAX-001', 'Iowa Income Tax',
 'Iowa has a flat individual income tax rate of 3.8% (effective 2026, phasing down from graduated rates). Corporate income tax is a flat 5.5% (effective 2026, reduced from 8.4%). Pass-through entity income flows to individual returns.',
 'TAXATION', 'STATE', 'IA',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'Iowa Code § 422.5 (Individual); Iowa Code § 422.33 (Corp)', 'https://tax.iowa.gov/businesses', 1),

('ia-tax-002', 'IA-TAX-002', 'Iowa Sales Tax Registration',
 'Businesses making retail sales must obtain a sales tax permit from the Department of Revenue. State rate is 6%, with local option taxes up to 1%. Remote sellers with $100,000+ in IA sales must collect.',
 'TAXATION', 'STATE', 'IA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Iowa Code § 423.1 to 423.58', 'https://tax.iowa.gov/iowa-sales-and-use-tax', 1),

('ia-rep-001', 'IA-REP-001', 'Iowa Biennial Report',
 'All business entities must file a Biennial Report with the Secretary of State. Due by April 1 of odd-numbered years for corporations and even-numbered years for LLCs. Filing fee is $30 for LLCs, $60 for corporations.',
 'REPORTING', 'STATE', 'IA',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'Iowa Code § 490.1622 (Corp); Iowa Code § 489.209 (LLC)', 'https://sos.iowa.gov/business/BiennialReports.html', 1),

('ia-ins-001', 'IA-INS-001', 'Iowa Workers'' Compensation Insurance',
 'All employers with employees must carry workers'' compensation insurance. Coverage through licensed private insurers or self-insurance approved by the Iowa Workers'' Compensation Commissioner. No minimum employee threshold.',
 'INSURANCE', 'STATE', 'IA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Iowa Code § 85.1 to 87.45', 'https://www.iowaworkcomp.gov/', 1),

('ia-emp-001', 'IA-EMP-001', 'Iowa Unemployment Insurance',
 'Employers must register with Iowa Workforce Development for UI. Contributions paid on the first $38,200 of each employee''s wages. New employer rate is 1.0%. Reported quarterly.',
 'INSURANCE', 'STATE', 'IA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Iowa Code § 96.7', 'https://www.iowaworkforcedevelopment.gov/employer-account-information', 1);


-- ============================================================
-- IDAHO (ID)
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('id-form-001', 'ID-FORM-001', 'Idaho Business Entity Formation',
 'LLCs file a Certificate of Organization with the Secretary of State ($100 filing fee). Corporations file Articles of Incorporation ($100 filing fee). Must designate a registered agent in Idaho.',
 'FORMATION', 'STATE', 'ID',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Idaho Code § 30-25-201 (LLC); Idaho Code § 30-29-202 (Corp)', 'https://sos.idaho.gov/business/', 1),

('id-tax-001', 'ID-TAX-001', 'Idaho Income Tax',
 'Idaho has a flat individual income tax rate of 5.695%. Corporate income tax is also 5.695% on net income. Pass-through entity income flows to individual returns. Minimum corporate tax is $20.',
 'TAXATION', 'STATE', 'ID',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'Idaho Code § 63-3024 (Individual); Idaho Code § 63-3025 (Corp)', 'https://tax.idaho.gov/i-1039.cfm', 1),

('id-tax-002', 'ID-TAX-002', 'Idaho Sales Tax Registration',
 'Businesses making retail sales must obtain a seller''s permit from the Idaho State Tax Commission. State rate is 6%. Remote sellers with $100,000+ in ID sales must collect.',
 'TAXATION', 'STATE', 'ID',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Idaho Code § 63-3601 to 63-3645', 'https://tax.idaho.gov/i-2027.cfm', 1),

('id-rep-001', 'ID-REP-001', 'Idaho Annual Report',
 'All business entities must file an Annual Report with the Secretary of State. Due by the end of the anniversary month of formation. No filing fee for the annual report. Reports current officers/members and registered agent.',
 'REPORTING', 'STATE', 'ID',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'Idaho Code § 30-21-608', 'https://sos.idaho.gov/business/', 1),

('id-ins-001', 'ID-INS-001', 'Idaho Workers'' Compensation Insurance',
 'All employers with one or more employees must carry workers'' compensation insurance. Coverage through the State Insurance Fund, licensed private insurers, or self-insurance. Non-compliance is a misdemeanor.',
 'INSURANCE', 'STATE', 'ID',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Idaho Code § 72-101 to 72-806', 'https://iic.idaho.gov/', 1),

('id-emp-001', 'ID-EMP-001', 'Idaho Unemployment Insurance',
 'Employers must register with the Department of Labor for UI. Contributions paid on the first $53,500 of each employee''s wages. New employer rate is approximately 1.0%. Reported quarterly.',
 'INSURANCE', 'STATE', 'ID',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Idaho Code § 72-1349 to 72-1350', 'https://www.labor.idaho.gov/businesses/unemployment-taxes/', 1);


-- ============================================================
-- INDIANA (IN)
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('in-form-001', 'IN-FORM-001', 'Indiana Business Entity Formation',
 'LLCs file Articles of Organization with the Secretary of State ($95 online filing fee). Corporations file Articles of Incorporation ($95 filing fee). Must designate a registered agent in Indiana.',
 'FORMATION', 'STATE', 'IN',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'IC § 23-18-2-4 (LLC); IC § 23-1-21-2 (Corp)', 'https://www.in.gov/sos/business/start-a-business/', 1),

('in-tax-001', 'IN-TAX-001', 'Indiana Income Tax',
 'Indiana has a flat individual income tax rate of 3.05% (2026, phasing down). Corporate income tax is 4.9% on adjusted gross income. County income taxes also apply (ranging from 0.5% to 3.38%). Pass-through entity income flows to individual returns.',
 'TAXATION', 'STATE', 'IN',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'IC § 6-3-2-1 (Individual); IC § 6-3-2-1(b) (Corp)', 'https://www.in.gov/dor/business-tax/', 1),

('in-tax-002', 'IN-TAX-002', 'Indiana Sales Tax Registration',
 'Businesses making retail sales must register for a Registered Retail Merchant Certificate ($25 fee per location). State rate is 7%. Remote sellers with $100,000+ in IN sales or 200+ transactions must collect.',
 'TAXATION', 'STATE', 'IN',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'IC § 6-2.5-1-1 to 6-2.5-13', 'https://www.in.gov/dor/business-tax/sales-tax/', 1),

('in-rep-001', 'IN-REP-001', 'Indiana Business Entity Report',
 'All business entities must file a Business Entity Report biennially with the Secretary of State. Due in the anniversary month of formation in odd or even years depending on entity type. Filing fee is $32 online for most entities.',
 'REPORTING', 'STATE', 'IN',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'IC § 23-0.6-3-1', 'https://www.in.gov/sos/business/entity-reports/', 1),

('in-ins-001', 'IN-INS-001', 'Indiana Workers'' Compensation Insurance',
 'All employers with one or more employees must carry workers'' compensation insurance. Coverage through licensed private insurers or self-insurance. Indiana does not have a state fund. Non-compliance results in fines.',
 'INSURANCE', 'STATE', 'IN',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'IC § 22-3-2-1 to 22-3-12-4', 'https://www.in.gov/wcb/', 1),

('in-emp-001', 'IN-EMP-001', 'Indiana Unemployment Insurance',
 'Employers must register with the Department of Workforce Development for UI. Contributions paid on the first $9,500 of each employee''s wages. New employer rate is 2.5%. Reported quarterly.',
 'INSURANCE', 'STATE', 'IN',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'IC § 22-4-1-1 to 22-4-39-5', 'https://www.in.gov/dwd/employers/', 1);


-- ============================================================
-- KANSAS (KS)
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ks-form-001', 'KS-FORM-001', 'Kansas Business Entity Formation',
 'LLCs file Articles of Organization with the Secretary of State ($160 filing fee online). Corporations file Articles of Incorporation ($90 filing fee). Must designate a resident agent in Kansas.',
 'FORMATION', 'STATE', 'KS',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'KSA § 17-7673 (LLC); KSA § 17-6002 (Corp)', 'https://www.sos.ks.gov/business/business.html', 1),

('ks-tax-001', 'KS-TAX-001', 'Kansas Income Tax',
 'Individual income tax rates range from 3.1% to 5.7%. Corporate income tax is 4% of net income plus a 3% surtax on income over $50,000. Pass-through entity income flows to individual returns.',
 'TAXATION', 'STATE', 'KS',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'KSA § 79-32,110 (Individual); KSA § 79-32,110(c) (Corp)', 'https://www.ksrevenue.gov/business.html', 1),

('ks-tax-002', 'KS-TAX-002', 'Kansas Sales Tax Registration',
 'Businesses making retail sales must register for a sales tax certificate with the Department of Revenue. State rate is 6.5%, with local rates adding up to 4.25%. Remote sellers with $100,000+ in KS sales must collect.',
 'TAXATION', 'STATE', 'KS',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'KSA § 79-3601 to 79-3698', 'https://www.ksrevenue.gov/salesanduse.html', 1),

('ks-rep-001', 'KS-REP-001', 'Kansas Annual Report',
 'All business entities must file an Annual Report with the Secretary of State by the 15th day of the 4th month after the fiscal year end. Filing fee is $55 for corporations, $50 for LLCs. Reports current officers/members and registered agent.',
 'REPORTING', 'STATE', 'KS',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'KSA § 17-7504 (Corp); KSA § 17-76,146 (LLC)', 'https://www.sos.ks.gov/business/annual-reports.html', 1),

('ks-ins-001', 'KS-INS-001', 'Kansas Workers'' Compensation Insurance',
 'All employers must carry workers'' compensation insurance. Coverage through licensed private insurers, the Kansas Workers Compensation Fund, or self-insurance. Non-compliance results in penalties and injunctive action.',
 'INSURANCE', 'STATE', 'KS',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'KSA § 44-501 to 44-575', 'https://www.dol.ks.gov/workers-compensation', 1),

('ks-emp-001', 'KS-EMP-001', 'Kansas Unemployment Insurance',
 'Employers must register with the Department of Labor for UI. Contributions paid on the first $14,000 of each employee''s wages. New employer rate is 2.7%. Reported quarterly.',
 'INSURANCE', 'STATE', 'KS',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'KSA § 44-710', 'https://www.dol.ks.gov/employers', 1);


-- ============================================================
-- KENTUCKY (KY)
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ky-form-001', 'KY-FORM-001', 'Kentucky Business Entity Formation',
 'LLCs file Articles of Organization with the Secretary of State ($40 filing fee). Corporations file Articles of Incorporation ($50 filing fee). Must designate a registered agent in Kentucky. One of the lowest formation filing fees in the country.',
 'FORMATION', 'STATE', 'KY',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'KRS § 275.020 (LLC); KRS § 271B.2-020 (Corp)', 'https://www.sos.ky.gov/bus/business-filings/', 1),

('ky-tax-001', 'KY-TAX-001', 'Kentucky Income Tax',
 'Kentucky has a flat 4.0% individual income tax rate (effective 2025, reduced from 4.5%). Corporate income tax is 5% on net income. The Limited Liability Entity Tax (LLET) is the lesser of 0.095% of gross receipts or 0.75% of gross profits (minimum $175).',
 'TAXATION', 'STATE', 'KY',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'KRS § 141.020 (Individual); KRS § 141.040 (Corp); KRS § 141.0401 (LLET)', 'https://revenue.ky.gov/Business/Pages/default.aspx', 1),

('ky-tax-002', 'KY-TAX-002', 'Kentucky Sales Tax Registration',
 'Businesses making retail sales must register for a sales tax permit with the Department of Revenue. State rate is 6% (no local sales taxes). Remote sellers with $100,000+ in KY sales or 200+ transactions must collect.',
 'TAXATION', 'STATE', 'KY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'KRS § 139.010 to 139.990', 'https://revenue.ky.gov/Business/Sales-Use-Tax/Pages/default.aspx', 1),

('ky-rep-001', 'KY-REP-001', 'Kentucky Annual Report',
 'All business entities must file an Annual Report with the Secretary of State by June 30 each year. Filing fee is $15 for all entity types. Reports current officers/members and registered agent.',
 'REPORTING', 'STATE', 'KY',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'KRS § 271B.16-220 (Corp); KRS § 275.190 (LLC)', 'https://www.sos.ky.gov/bus/business-filings/Pages/AnnualReport.aspx', 1),

('ky-ins-001', 'KY-INS-001', 'Kentucky Workers'' Compensation Insurance',
 'All employers with one or more employees must carry workers'' compensation insurance. Coverage through licensed private insurers, the Kentucky Employers'' Mutual Insurance (KEMI), or self-insurance. Non-compliance results in fines up to $1,000/day.',
 'INSURANCE', 'STATE', 'KY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'KRS § 342.001 to 342.990', 'https://labor.ky.gov/workers-comp/', 1),

('ky-emp-001', 'KY-EMP-001', 'Kentucky Unemployment Insurance',
 'Employers must register with the Office of Unemployment Insurance for UI. Contributions paid on the first $11,100 of each employee''s wages. New employer rate is 2.7%. Reported quarterly.',
 'INSURANCE', 'STATE', 'KY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'KRS § 341.260 to 341.290', 'https://kcc.ky.gov/Employers/Pages/default.aspx', 1);


-- ============================================================
-- LOUISIANA (LA)
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('la-form-001', 'LA-FORM-001', 'Louisiana Business Entity Formation',
 'LLCs file Articles of Organization with the Secretary of State ($100 filing fee). Corporations file Articles of Incorporation ($75 filing fee plus $10/1,000 shares of authorized capital stock, minimum $75). Must designate a registered agent in Louisiana.',
 'FORMATION', 'STATE', 'LA',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'La. R.S. 12:1305 (LLC); La. R.S. 12:1-202 (Corp)', 'https://www.sos.la.gov/BusinessServices/Pages/default.aspx', 1),

('la-tax-001', 'LA-TAX-001', 'Louisiana Income Tax',
 'Individual income tax rates range from 1.85% to 4.25% (2026 rates after reforms). Corporate income tax ranges from 3.5% to 7.5% on a graduated scale. Corporate franchise tax is $1.50 per $1,000 of capital employed in Louisiana (first $300,000 exempt). Pass-through entity income flows to individual returns.',
 'TAXATION', 'STATE', 'LA',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'La. R.S. 47:21-47:290 (Income); La. R.S. 47:601-47:616 (Franchise)', 'https://revenue.louisiana.gov/businesses', 1),

('la-tax-002', 'LA-TAX-002', 'Louisiana Sales Tax Registration',
 'Businesses making retail sales must register for a sales tax certificate with the Department of Revenue. State rate is 4.45%, with local (parish) rates adding 0%-7%. Louisiana has one of the highest combined rates in the nation. Remote sellers with $100,000+ in LA sales or 200+ transactions must collect.',
 'TAXATION', 'STATE', 'LA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'La. R.S. 47:301-47:370', 'https://revenue.louisiana.gov/SalesTax', 1),

('la-rep-001', 'LA-REP-001', 'Louisiana Annual Report',
 'All business entities must file an Annual Report with the Secretary of State. Due by the anniversary date of formation. Filing fee is $30 for LLCs and $75 for corporations. Reports current officers/members and registered agent.',
 'REPORTING', 'STATE', 'LA',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'La. R.S. 12:1-1622 (Corp); La. R.S. 12:1308.1 (LLC)', 'https://www.sos.la.gov/BusinessServices/Pages/default.aspx', 1),

('la-ins-001', 'LA-INS-001', 'Louisiana Workers'' Compensation Insurance',
 'All employers with one or more employees must carry workers'' compensation insurance. Coverage through licensed private insurers, the Louisiana Workers'' Compensation Corporation (LWCC), or self-insurance. Non-compliance results in fines up to $10,000.',
 'INSURANCE', 'STATE', 'LA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'La. R.S. 23:1021 to 23:1415', 'https://www.laworks.net/WorkersComp/OWC_MainMenu.asp', 1),

('la-emp-001', 'LA-EMP-001', 'Louisiana Unemployment Insurance',
 'Employers must register with the Louisiana Workforce Commission for UI. Contributions paid on the first $7,700 of each employee''s wages. New employer rate is approximately 1.16%. Reported quarterly.',
 'INSURANCE', 'STATE', 'LA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'La. R.S. 23:1531 to 23:1713', 'https://www.laworks.net/UnemploymentInsurance.asp', 1);


-- ============================================================
-- MASSACHUSETTS (MA)
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ma-form-001', 'MA-FORM-001', 'Massachusetts Business Entity Formation',
 'LLCs file a Certificate of Organization with the Secretary of the Commonwealth ($500 filing fee). Corporations file Articles of Organization ($275 filing fee). Must designate a registered agent in Massachusetts.',
 'FORMATION', 'STATE', 'MA',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'MGL ch. 156C § 12 (LLC); MGL ch. 156D § 2.02 (Corp)', 'https://www.sec.state.ma.us/cor/', 1),

('ma-tax-001', 'MA-TAX-001', 'Massachusetts Income Tax',
 'Massachusetts has a flat 5.0% individual income tax rate plus a 4% surtax on income over $1,000,000 (the "millionaires tax," effective 2023). Corporate excise tax is 8.0% of net income plus $2.60 per $1,000 of tangible property or net worth (minimum $456). S-Corps pay reduced rates.',
 'TAXATION', 'STATE', 'MA',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'MGL ch. 62 § 4 (Individual); MGL ch. 63 § 39 (Corp)', 'https://www.mass.gov/business-taxes', 1),

('ma-tax-002', 'MA-TAX-002', 'Massachusetts Sales Tax Registration',
 'Businesses making retail sales must register for a sales tax certificate with the Department of Revenue. State rate is 6.25%. No local sales taxes. Remote sellers with $100,000+ in MA sales must collect.',
 'TAXATION', 'STATE', 'MA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'MGL ch. 64H § 1-33', 'https://www.mass.gov/sales-and-use-tax', 1),

('ma-rep-001', 'MA-REP-001', 'Massachusetts Annual Report',
 'All business entities must file an Annual Report with the Secretary of the Commonwealth. Corporations file by the anniversary of incorporation ($125). LLCs file by the anniversary of organization ($500). Reports current officers/members and registered agent.',
 'REPORTING', 'STATE', 'MA',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'MGL ch. 156D § 16.22 (Corp); MGL ch. 156C § 12 (LLC)', 'https://www.sec.state.ma.us/cor/coridx.htm', 1),

('ma-ins-001', 'MA-INS-001', 'Massachusetts Workers'' Compensation Insurance',
 'All employers must carry workers'' compensation insurance if they have one or more employees. Coverage through licensed private insurers or self-insurance. Non-compliance results in fines up to $1,500/day and stop-work orders.',
 'INSURANCE', 'STATE', 'MA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'MGL ch. 152 § 25A-25D', 'https://www.mass.gov/workers-compensation', 1),

('ma-emp-001', 'MA-EMP-001', 'Massachusetts Unemployment Insurance',
 'Employers must register with the Department of Unemployment Assistance for UI. Contributions paid on the first $15,000 of each employee''s wages. New employer rate is approximately 1.87%. Reported quarterly.',
 'INSURANCE', 'STATE', 'MA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'MGL ch. 151A § 14', 'https://www.mass.gov/unemployment-insurance-ui-for-employers', 1),

('ma-emp-002', 'MA-EMP-002', 'Massachusetts Paid Family and Medical Leave (PFML)',
 'All employers must participate in the MA PFML program. Contribution rate is 0.88% of eligible wages (2025), split between employer and employee. Provides up to 26 weeks of combined family and medical leave. Employers with fewer than 25 employees do not pay the employer share.',
 'EMPLOYMENT', 'STATE', 'MA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2021-01-01', 'MGL ch. 175M', 'https://www.mass.gov/pfml', 1);


-- ============================================================
-- MARYLAND (MD)
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('md-form-001', 'MD-FORM-001', 'Maryland Business Entity Formation',
 'LLCs file Articles of Organization with the State Department of Assessments and Taxation (SDAT) ($100 filing fee). Corporations file Articles of Incorporation ($100 filing fee). Must designate a resident agent in Maryland.',
 'FORMATION', 'STATE', 'MD',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Md. Code, Corps. & Assns. § 4A-202 (LLC); § 2-102 (Corp)', 'https://dat.maryland.gov/businesses/', 1),

('md-tax-001', 'MD-TAX-001', 'Maryland Income Tax',
 'Individual income tax rates range from 2.0% to 5.75%, plus county income taxes ranging from 2.25% to 3.2%. Corporate income tax is 8.25% on net income. Pass-through entity income flows to individual returns. PTE tax election available.',
 'TAXATION', 'STATE', 'MD',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'Md. Code, Tax-Gen. § 10-105 (Individual); § 10-304 (Corp)', 'https://www.marylandtaxes.gov/business/index.php', 1),

('md-tax-002', 'MD-TAX-002', 'Maryland Sales Tax Registration',
 'Businesses making retail sales must register for a sales and use tax license with the Comptroller. State rate is 6%. No local sales taxes. Remote sellers with $100,000+ in MD sales or 200+ transactions must collect.',
 'TAXATION', 'STATE', 'MD',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Md. Code, Tax-Gen. § 11-101 to 11-701', 'https://www.marylandtaxes.gov/business/sales-use/', 1),

('md-rep-001', 'MD-REP-001', 'Maryland Annual Report / Personal Property Return',
 'All business entities must file an Annual Report and Personal Property Return with SDAT by April 15. Filing fee is $300 for all entity types. Reports current officers/members, registered agent, and personal property information.',
 'REPORTING', 'STATE', 'MD',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'Md. Code, Corps. & Assns. § 11-101; Md. Code, Tax-Property § 7-236', 'https://dat.maryland.gov/businesses/Pages/Annual-Report-and-Personal-Property-Tax-Returns.aspx', 1),

('md-ins-001', 'MD-INS-001', 'Maryland Workers'' Compensation Insurance',
 'All employers with one or more employees must carry workers'' compensation insurance. Coverage through licensed private insurers, the Chesapeake Employers'' Insurance Company (state fund), or self-insurance. Non-compliance results in fines and criminal penalties.',
 'INSURANCE', 'STATE', 'MD',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Md. Code, Labor & Empl. § 9-401 to 9-1105', 'https://www.wcc.state.md.us/', 1),

('md-emp-001', 'MD-EMP-001', 'Maryland Unemployment Insurance',
 'Employers must register with the Division of Unemployment Insurance for UI. Contributions paid on the first $8,500 of each employee''s wages. New employer rate is 2.3%. Reported quarterly.',
 'INSURANCE', 'STATE', 'MD',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Md. Code, Labor & Empl. § 8-601 to 8-637', 'https://www.dllr.state.md.us/employment/uiemp.shtml', 1);


-- ============================================================
-- MAINE (ME)
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('me-form-001', 'ME-FORM-001', 'Maine Business Entity Formation',
 'LLCs file a Certificate of Formation with the Secretary of State ($175 filing fee). Corporations file Articles of Incorporation ($145 filing fee). Must designate a registered agent in Maine.',
 'FORMATION', 'STATE', 'ME',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, '31 MRSA § 1531 (LLC); 13-C MRSA § 202 (Corp)', 'https://www.maine.gov/sos/cec/corp/', 1),

('me-tax-001', 'ME-TAX-001', 'Maine Income Tax',
 'Individual income tax rates range from 5.8% to 7.15%. Corporate income tax ranges from 3.5% to 8.93% on a graduated scale. Pass-through entity income flows to individual returns.',
 'TAXATION', 'STATE', 'ME',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, '36 MRSA § 5111 (Individual); 36 MRSA § 5200 (Corp)', 'https://www.maine.gov/revenue/taxes/business-taxes', 1),

('me-tax-002', 'ME-TAX-002', 'Maine Sales Tax Registration',
 'Businesses making retail sales must register for a sales tax certificate with Maine Revenue Services. State rate is 5.5% (8% on lodging, 10% on short-term auto rentals). Remote sellers with $100,000+ in ME sales must collect.',
 'TAXATION', 'STATE', 'ME',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '36 MRSA § 1752 to 1866', 'https://www.maine.gov/revenue/taxes/sales-use-tax', 1),

('me-rep-001', 'ME-REP-001', 'Maine Annual Report',
 'All business entities must file an Annual Report with the Secretary of State by June 1 each year. Filing fee is $85 for all entity types. Reports current officers/members and registered agent.',
 'REPORTING', 'STATE', 'ME',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, '13-C MRSA § 1621 (Corp); 31 MRSA § 1641 (LLC)', 'https://www.maine.gov/sos/cec/corp/annual.html', 1),

('me-ins-001', 'ME-INS-001', 'Maine Workers'' Compensation Insurance',
 'All employers with one or more employees must carry workers'' compensation insurance. Coverage through licensed private insurers, the Maine Employers'' Mutual Insurance Company (MEMIC), or self-insurance. Non-compliance results in fines.',
 'INSURANCE', 'STATE', 'ME',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '39-A MRSA § 401 to 420', 'https://www.maine.gov/wcb/', 1),

('me-emp-001', 'ME-EMP-001', 'Maine Unemployment Insurance',
 'Employers must register with the Department of Labor for UI. Contributions paid on the first $12,000 of each employee''s wages. New employer rate is approximately 2.43%. Reported quarterly.',
 'INSURANCE', 'STATE', 'ME',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '26 MRSA § 1221-1228', 'https://www.maine.gov/labor/unemployment/', 1);


-- ============================================================
-- MINNESOTA (MN)
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('mn-form-001', 'MN-FORM-001', 'Minnesota Business Entity Formation',
 'LLCs file Articles of Organization with the Secretary of State ($155 filing fee online). Corporations file Articles of Incorporation ($155 filing fee). Must designate a registered agent in Minnesota.',
 'FORMATION', 'STATE', 'MN',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Minn. Stat. § 322C.0201 (LLC); Minn. Stat. § 302A.115 (Corp)', 'https://www.sos.state.mn.us/business-liens/', 1),

('mn-tax-001', 'MN-TAX-001', 'Minnesota Income Tax',
 'Individual income tax rates range from 5.35% to 9.85% (one of the highest in the nation). Corporate franchise tax is 9.8% of net income. Minimum fee of $0 for S-Corps. Pass-through entity income flows to individual returns.',
 'TAXATION', 'STATE', 'MN',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'Minn. Stat. § 290.06 (Individual); Minn. Stat. § 290.02 (Corp)', 'https://www.revenue.state.mn.us/business-tax', 1),

('mn-tax-002', 'MN-TAX-002', 'Minnesota Sales Tax Registration',
 'Businesses making retail sales must register for a sales tax certificate with the Department of Revenue. State rate is 6.875%, with local rates adding up to 2%. Remote sellers with $100,000+ in MN sales or 200+ transactions must collect.',
 'TAXATION', 'STATE', 'MN',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Minn. Stat. § 297A.61 to 297A.99', 'https://www.revenue.state.mn.us/sales-and-use-tax', 1),

('mn-rep-001', 'MN-REP-001', 'Minnesota Annual Renewal',
 'All business entities must file an Annual Renewal with the Secretary of State by December 31 each year. Filing fee is $0 for LLCs and corporations. Reports current registered agent and office address.',
 'REPORTING', 'STATE', 'MN',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'Minn. Stat. § 302A.821 (Corp); Minn. Stat. § 322C.0210 (LLC)', 'https://www.sos.state.mn.us/business-liens/annual-renewals/', 1),

('mn-ins-001', 'MN-INS-001', 'Minnesota Workers'' Compensation Insurance',
 'All employers must carry workers'' compensation insurance. Coverage through licensed private insurers, the Minnesota Assigned Risk Plan, or self-insurance. Non-compliance is a gross misdemeanor.',
 'INSURANCE', 'STATE', 'MN',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Minn. Stat. § 176.181 to 176.185', 'https://www.dli.mn.gov/workers-compensation', 1),

('mn-emp-001', 'MN-EMP-001', 'Minnesota Unemployment Insurance',
 'Employers must register with the Department of Employment and Economic Development (DEED) for UI. Contributions paid on the first $42,000 of each employee''s wages. New employer rate is approximately 1.0%. Reported quarterly.',
 'INSURANCE', 'STATE', 'MN',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Minn. Stat. § 268.03 to 268.23', 'https://uimn.org/employers/', 1);


-- ============================================================
-- MISSOURI (MO)
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('mo-form-001', 'MO-FORM-001', 'Missouri Business Entity Formation',
 'LLCs file Articles of Organization with the Secretary of State ($50 filing fee online). Corporations file Articles of Incorporation ($58 filing fee). Must designate a registered agent in Missouri.',
 'FORMATION', 'STATE', 'MO',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'RSMo § 347.039 (LLC); RSMo § 351.055 (Corp)', 'https://www.sos.mo.gov/business', 1),

('mo-tax-001', 'MO-TAX-001', 'Missouri Income Tax',
 'Individual income tax rates are 0% to 4.8% (2026, phasing down). Corporate income tax is 4.0% on net income. Pass-through entity income flows to individual returns.',
 'TAXATION', 'STATE', 'MO',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'RSMo § 143.011 (Individual); RSMo § 143.071 (Corp)', 'https://dor.mo.gov/business/', 1),

('mo-tax-002', 'MO-TAX-002', 'Missouri Sales Tax Registration',
 'Businesses making retail sales must register for a sales tax license with the Department of Revenue. State rate is 4.225%, with local rates adding up to 5.763%. Remote sellers with $100,000+ in MO sales must collect.',
 'TAXATION', 'STATE', 'MO',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'RSMo § 144.010 to 144.749', 'https://dor.mo.gov/business/sales/', 1),

('mo-rep-001', 'MO-REP-001', 'Missouri Annual Registration Report',
 'LLCs are not required to file annual reports in Missouri. Corporations must file an Annual Registration Report with the Secretary of State. No filing fee. Due by the anniversary of incorporation.',
 'REPORTING', 'STATE', 'MO',
 '["CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'RSMo § 351.122 (Corp)', 'https://www.sos.mo.gov/business/corporations/annualRpt', 1),

('mo-ins-001', 'MO-INS-001', 'Missouri Workers'' Compensation Insurance',
 'Employers with 5 or more employees must carry workers'' compensation insurance (construction: 1 or more). Coverage through licensed private insurers, the Missouri Employers Mutual Insurance Company, or self-insurance.',
 'INSURANCE', 'STATE', 'MO',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'RSMo § 287.010 to 287.988', 'https://labor.mo.gov/workers-compensation', 1),

('mo-emp-001', 'MO-EMP-001', 'Missouri Unemployment Insurance',
 'Employers must register with the Division of Employment Security for UI. Contributions paid on the first $10,500 of each employee''s wages. New employer rate is approximately 2.511%. Reported quarterly.',
 'INSURANCE', 'STATE', 'MO',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'RSMo § 288.032 to 288.130', 'https://labor.mo.gov/des/employers', 1);


-- ============================================================
-- MISSISSIPPI (MS)
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ms-form-001', 'MS-FORM-001', 'Mississippi Business Entity Formation',
 'LLCs file a Certificate of Formation with the Secretary of State ($50 filing fee). Corporations file Articles of Incorporation ($50 filing fee). Must designate a registered agent in Mississippi.',
 'FORMATION', 'STATE', 'MS',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Miss. Code § 79-29-201 (LLC); Miss. Code § 79-4-2.02 (Corp)', 'https://www.sos.ms.gov/business-services', 1),

('ms-tax-001', 'MS-TAX-001', 'Mississippi Income Tax',
 'Individual income tax is 0% on first $10,000, then 5% on income over $10,000 (phasing to flat 4% by 2026). Corporate income tax is 5% on net income over $10,000. Pass-through entity income flows to individual returns. Franchise tax is $2.50 per $1,000 of capital (minimum $25).',
 'TAXATION', 'STATE', 'MS',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'Miss. Code § 27-7-5 (Individual); § 27-7-23 (Corp); § 27-13-7 (Franchise)', 'https://www.dor.ms.gov/business/business-income-tax', 1),

('ms-tax-002', 'MS-TAX-002', 'Mississippi Sales Tax Registration',
 'Businesses making retail sales must register for a sales tax permit with the Department of Revenue. State rate is 7%. Remote sellers with $250,000+ in MS sales must collect.',
 'TAXATION', 'STATE', 'MS',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Miss. Code § 27-65-1 to 27-65-131', 'https://www.dor.ms.gov/business/sales-and-use-tax', 1),

('ms-rep-001', 'MS-REP-001', 'Mississippi Annual Report',
 'All business entities must file an Annual Report with the Secretary of State by April 15. Filing fee is $0 for LLCs and $25 for corporations. Reports current officers/members and registered agent.',
 'REPORTING', 'STATE', 'MS',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'Miss. Code § 79-4-16.22 (Corp); § 79-29-221 (LLC)', 'https://www.sos.ms.gov/business-services/annual-reports', 1),

('ms-ins-001', 'MS-INS-001', 'Mississippi Workers'' Compensation Insurance',
 'Employers with 5 or more employees must carry workers'' compensation insurance. Coverage through licensed private insurers or self-insurance. Construction and certain hazardous industries require coverage with any employees.',
 'INSURANCE', 'STATE', 'MS',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Miss. Code § 71-3-1 to 71-3-127', 'https://mwcc.ms.gov/', 1),

('ms-emp-001', 'MS-EMP-001', 'Mississippi Unemployment Insurance',
 'Employers must register with the Department of Employment Security for UI. Contributions paid on the first $14,000 of each employee''s wages. New employer rate is 1.0%. Reported quarterly.',
 'INSURANCE', 'STATE', 'MS',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Miss. Code § 71-5-351 to 71-5-393', 'https://mdes.ms.gov/employers/', 1);


-- ============================================================
-- MONTANA (MT)
-- No state sales tax.
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('mt-form-001', 'MT-FORM-001', 'Montana Business Entity Formation',
 'LLCs file Articles of Organization with the Secretary of State ($70 filing fee). Corporations file Articles of Incorporation ($70 filing fee). Must designate a registered agent in Montana.',
 'FORMATION', 'STATE', 'MT',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'MCA § 35-8-202 (LLC); MCA § 35-1-216 (Corp)', 'https://sosmt.gov/business/', 1),

('mt-tax-001', 'MT-TAX-001', 'Montana Income Tax',
 'Individual income tax rates range from 1.0% to 6.75%. Corporate income tax is 6.75% on net income. Pass-through entity income flows to individual returns. Montana has no sales tax.',
 'TAXATION', 'STATE', 'MT',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'MCA § 15-30-2103 (Individual); MCA § 15-31-121 (Corp)', 'https://mtrevenue.gov/taxes/business-taxes/', 1),

('mt-rep-001', 'MT-REP-001', 'Montana Annual Report',
 'All business entities must file an Annual Report with the Secretary of State by April 15. Filing fee is $20 for all entity types. Reports current officers/members and registered agent.',
 'REPORTING', 'STATE', 'MT',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'MCA § 35-1-231 (Corp); MCA § 35-8-208 (LLC)', 'https://sosmt.gov/business/', 1),

('mt-ins-001', 'MT-INS-001', 'Montana Workers'' Compensation Insurance',
 'All employers must carry workers'' compensation insurance. Coverage through the Montana State Fund (quasi-state insurer), licensed private insurers, or self-insurance. Non-compliance results in penalties including closure of the business.',
 'INSURANCE', 'STATE', 'MT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'MCA § 39-71-401 to 39-71-2914', 'https://erd.dli.mt.gov/work-comp-regulations', 1),

('mt-emp-001', 'MT-EMP-001', 'Montana Unemployment Insurance',
 'Employers must register with the Department of Labor and Industry for UI. Contributions paid on the first $43,000 of each employee''s wages. New employer rate is approximately 1.18%. Reported quarterly.',
 'INSURANCE', 'STATE', 'MT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'MCA § 39-51-1103 to 39-51-1126', 'https://uid.dli.mt.gov/employers', 1);


-- ============================================================
-- NEBRASKA (NE)
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ne-form-001', 'NE-FORM-001', 'Nebraska Business Entity Formation',
 'LLCs file a Certificate of Organization with the Secretary of State ($105 filing fee). Corporations file Articles of Incorporation ($60 filing fee plus capital stock fees). Must designate a registered agent in Nebraska. Foreign entities must obtain a Certificate of Authority.',
 'FORMATION', 'STATE', 'NE',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Neb. Rev. Stat. § 21-117 (LLC); Neb. Rev. Stat. § 21-2004 (Corp)', 'https://sos.nebraska.gov/business-services', 1),

('ne-tax-001', 'NE-TAX-001', 'Nebraska Income Tax',
 'Individual income tax rates range from 2.46% to 5.84% (rates being reduced through 2027 per LB 754). Corporate income tax is 5.58% on first $100,000 and 7.25% on income over $100,000 (rates decreasing). Pass-through entity income flows to individual returns.',
 'TAXATION', 'STATE', 'NE',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'Neb. Rev. Stat. § 77-2715.01 (Individual); § 77-2734.02 (Corp)', 'https://revenue.nebraska.gov/businesses', 1),

('ne-tax-002', 'NE-TAX-002', 'Nebraska Sales and Use Tax Registration',
 'Businesses selling tangible personal property or taxable services must register with the Department of Revenue for a sales tax permit. State rate is 5.5%. Local rates may add up to 2% additional. Remote sellers exceeding $100,000 in NE sales or 200 transactions must collect.',
 'TAXATION', 'STATE', 'NE',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Neb. Rev. Stat. § 77-2701 to 77-27,135.01', 'https://revenue.nebraska.gov/businesses/sales-and-use-tax', 1),

('ne-rep-001', 'NE-REP-001', 'Nebraska Biennial Report',
 'Domestic and foreign corporations and LLCs must file a Biennial Report with the Secretary of State. Due by April 1 of odd-numbered years for corporations, even-numbered years for LLCs. Filing fee is $10 for domestic, $25 for foreign entities.',
 'REPORTING', 'STATE', 'NE',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'Neb. Rev. Stat. § 21-125 (LLC); § 21-2022 (Corp)', 'https://sos.nebraska.gov/business-services', 1),

('ne-ins-001', 'NE-INS-001', 'Nebraska Workers'' Compensation Insurance',
 'All employers with one or more employees must carry workers'' compensation insurance. Coverage through licensed insurers or self-insurance with approval from the Nebraska Workers'' Compensation Court. Sole proprietors and partners may elect coverage.',
 'INSURANCE', 'STATE', 'NE',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Neb. Rev. Stat. § 48-145 to 48-1,117', 'https://wcc.nebraska.gov/', 1),

('ne-emp-001', 'NE-EMP-001', 'Nebraska Unemployment Insurance',
 'Employers must register with the Department of Labor for UI. Contributions paid on the first $9,000 of each employee''s wages. New employer rate is 1.25%. Reported quarterly.',
 'INSURANCE', 'STATE', 'NE',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Neb. Rev. Stat. § 48-648 to 48-669', 'https://dol.nebraska.gov/UITax', 1);


-- ============================================================
-- NEW HAMPSHIRE (NH)
-- No individual income tax on wages (interest/dividends tax repealed 2025).
-- No state sales tax.
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('nh-form-001', 'NH-FORM-001', 'New Hampshire Business Entity Formation',
 'LLCs file a Certificate of Formation with the Secretary of State ($100 filing fee). Corporations file Articles of Incorporation ($100 filing fee). Must designate a registered agent in New Hampshire. Foreign entities must register for authority to transact business.',
 'FORMATION', 'STATE', 'NH',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'RSA § 304-C:11 (LLC); RSA § 293-A:2.02 (Corp)', 'https://www.sos.nh.gov/corporations', 1),

('nh-tax-001', 'NH-TAX-001', 'New Hampshire Business Profits Tax',
 'New Hampshire imposes a Business Profits Tax (BPT) at 7.5% on business income exceeding $50,000. Applies to all business organizations. No individual income tax on wages or salaries. The Interest and Dividends Tax was repealed effective January 1, 2025.',
 'TAXATION', 'STATE', 'NH',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'RSA § 77-A:1 to 77-A:22', 'https://www.revenue.nh.gov/taxes-held-state/business-profits-tax', 1),

('nh-tax-002', 'NH-TAX-002', 'New Hampshire Business Enterprise Tax',
 'The Business Enterprise Tax (BET) is imposed at 0.55% on the enterprise value tax base (compensation, interest, and dividends paid). BET paid can be credited against BPT liability. Applies to businesses with gross receipts exceeding $281,000 or enterprise value tax base exceeding $140,000.',
 'TAXATION', 'STATE', 'NH',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'RSA § 77-E:1 to 77-E:14', 'https://www.revenue.nh.gov/taxes-held-state/business-enterprise-tax', 1),

('nh-rep-001', 'NH-REP-001', 'New Hampshire Annual Report',
 'All business entities must file an Annual Report with the Secretary of State. Due by April 1 each year. Filing fee is $100 for corporations and LLCs. Reports current officers/members, registered agent, and principal address.',
 'REPORTING', 'STATE', 'NH',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'RSA § 293-A:16.22 (Corp); RSA § 304-C:85 (LLC)', 'https://www.sos.nh.gov/corporations/annual-reports', 1),

('nh-ins-001', 'NH-INS-001', 'New Hampshire Workers'' Compensation Insurance',
 'All employers with one or more employees must carry workers'' compensation insurance. Coverage through licensed insurers or self-insurance with approval from the Department of Labor. Sole proprietors, partners, and LLC members may elect coverage.',
 'INSURANCE', 'STATE', 'NH',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'RSA § 281-A:1 to 281-A:64', 'https://www.nh.gov/labor/workers-comp/', 1),

('nh-emp-001', 'NH-EMP-001', 'New Hampshire Unemployment Insurance',
 'Employers must register with NH Employment Security for UI. Contributions paid on the first $14,000 of each employee''s wages. New employer rate is 2.7%. Reported quarterly.',
 'INSURANCE', 'STATE', 'NH',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'RSA § 282-A:1 to 282-A:183', 'https://www.nhes.nh.gov/employers/', 1);


-- ============================================================
-- NEW JERSEY (NJ)
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('nj-form-001', 'NJ-FORM-001', 'New Jersey Business Entity Formation',
 'LLCs file a Certificate of Formation with the Division of Revenue and Enterprise Services ($125 filing fee). Corporations file a Certificate of Incorporation ($125 filing fee). Must designate a registered agent in New Jersey. All new businesses must also register with the Division of Revenue for a Business Registration Certificate (NJ-REG, free).',
 'FORMATION', 'STATE', 'NJ',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.J.S.A. § 42:2C-22 (LLC); N.J.S.A. § 14A:2-7 (Corp)', 'https://www.njportal.com/DOR/BusinessFormation', 1),

('nj-tax-001', 'NJ-TAX-001', 'New Jersey Income Tax',
 'Individual income tax rates range from 1.4% to 10.75%. Corporate Business Tax (CBT) rate is 9% on income over $100,000 (6.5% on income up to $50,000, 7.5% on $50,001-$100,000), with a 2.5% surtax on income over $1 million. Minimum tax ranges from $500 to $2,000 based on gross receipts. Pass-through entities may elect to pay entity-level tax.',
 'TAXATION', 'STATE', 'NJ',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'N.J.S.A. § 54:10A-1 to 54:10A-42 (CBT); N.J.S.A. § 54A:1-1 (Income)', 'https://www.nj.gov/treasury/taxation/corp_over.shtml', 1),

('nj-tax-002', 'NJ-TAX-002', 'New Jersey Sales and Use Tax Registration',
 'Businesses selling tangible personal property or taxable services must register for a Certificate of Authority. State rate is 6.625%. Urban Enterprise Zone businesses may collect at reduced 3.3125%. Remote sellers exceeding $100,000 in NJ sales or 200 transactions must collect.',
 'TAXATION', 'STATE', 'NJ',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.J.S.A. § 54:32B-1 to 54:32B-50', 'https://www.nj.gov/treasury/taxation/su_over.shtml', 1),

('nj-rep-001', 'NJ-REP-001', 'New Jersey Annual Report',
 'All business entities must file an Annual Report with the Division of Revenue. Due by the last day of the anniversary month of formation. Filing fee is $75 for LLCs and $25 for corporations. Reports current members/officers and registered agent.',
 'REPORTING', 'STATE', 'NJ',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'N.J.S.A. § 14A:4-5 (Corp); N.J.S.A. § 42:2C-54 (LLC)', 'https://www.njportal.com/DOR/AnnualReports', 1),

('nj-ins-001', 'NJ-INS-001', 'New Jersey Workers'' Compensation Insurance',
 'All employers must carry workers'' compensation insurance. Coverage through licensed insurers or self-insurance with approval from the Department of Banking and Insurance. New Jersey also requires Temporary Disability Insurance (TDI) coverage.',
 'INSURANCE', 'STATE', 'NJ',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.J.S.A. § 34:15-71 to 34:15-146', 'https://www.nj.gov/labor/wc/employer/', 1),

('nj-emp-001', 'NJ-EMP-001', 'New Jersey Unemployment Insurance',
 'Employers must register with the Department of Labor and Workforce Development for UI and related programs. UI contributions paid on the first $42,300 of each employee''s wages. Must also contribute to Temporary Disability Insurance (TDI), Family Leave Insurance (FLI), and Workforce Development Partnership Fund. Reported quarterly.',
 'INSURANCE', 'STATE', 'NJ',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.J.S.A. § 43:21-1 to 43:21-71', 'https://www.nj.gov/labor/employer-services/', 1);


-- ============================================================
-- NEW MEXICO (NM)
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('nm-form-001', 'NM-FORM-001', 'New Mexico Business Entity Formation',
 'LLCs file Articles of Organization with the Secretary of State ($50 filing fee). Corporations file Articles of Incorporation ($100 filing fee). Must designate a registered agent in New Mexico. Foreign entities must obtain a Certificate of Authority.',
 'FORMATION', 'STATE', 'NM',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'NMSA § 53-19-7 (LLC); NMSA § 53-12-2 (Corp)', 'https://www.sos.nm.gov/business-services/', 1),

('nm-tax-001', 'NM-TAX-001', 'New Mexico Income Tax',
 'Individual income tax rates range from 1.7% to 5.9%. Corporate income tax is a flat 5.9% on net income. Pass-through entity income flows to individual returns. New Mexico also imposes a Gross Receipts Tax (GRT) instead of a traditional sales tax.',
 'TAXATION', 'STATE', 'NM',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'NMSA § 7-2-1 to 7-2-33 (Individual); NMSA § 7-2A-1 to 7-2A-14 (Corp)', 'https://www.tax.newmexico.gov/', 1),

('nm-tax-002', 'NM-TAX-002', 'New Mexico Gross Receipts Tax (GRT)',
 'New Mexico imposes a Gross Receipts Tax on businesses for the privilege of doing business. State base rate is 5.0% with local increments bringing total rates from approximately 5.125% to 9.3125% depending on location. Businesses must register with the Taxation and Revenue Department for a CRS identification number.',
 'TAXATION', 'STATE', 'NM',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'NMSA § 7-9-1 to 7-9-115', 'https://www.tax.newmexico.gov/gross-receipts-tax/', 1),

('nm-rep-001', 'NM-REP-001', 'New Mexico Biennial Report',
 'Corporations must file a Biennial Report with the Secretary of State by the 15th day of the 3rd month after the end of the fiscal year, in even-numbered years. LLCs do not currently file reports. Filing fee varies by authorized shares for corporations.',
 'REPORTING', 'STATE', 'NM',
 '["CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'NMSA § 53-5-1 (Corp)', 'https://www.sos.nm.gov/business-services/', 1),

('nm-ins-001', 'NM-INS-001', 'New Mexico Workers'' Compensation Insurance',
 'Employers with 3 or more employees must carry workers'' compensation insurance. Employers with fewer than 3 employees may elect coverage. Coverage through licensed insurers, the New Mexico Mutual Casualty Company, or self-insurance.',
 'INSURANCE', 'STATE', 'NM',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'NMSA § 52-1-1 to 52-1-70', 'https://workerscomp.nm.gov/', 1),

('nm-emp-001', 'NM-EMP-001', 'New Mexico Unemployment Insurance',
 'Employers must register with the Department of Workforce Solutions for UI. Contributions paid on the first $30,800 of each employee''s wages. New employer rate is 2.0%. Reported quarterly.',
 'INSURANCE', 'STATE', 'NM',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'NMSA § 51-1-1 to 51-1-59', 'https://www.dws.state.nm.us/Employers', 1);


-- ============================================================
-- NEVADA (NV)
-- No individual or corporate income tax.
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('nv-form-001', 'NV-FORM-001', 'Nevada Business Entity Formation',
 'LLCs file Articles of Organization with the Secretary of State ($75 filing fee plus $150 business license fee). Corporations file Articles of Incorporation ($75 filing fee). Must designate a registered agent in Nevada. Foreign entities must qualify by filing an Application for Registration.',
 'FORMATION', 'STATE', 'NV',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'NRS § 86.161 (LLC); NRS § 78.030 (Corp)', 'https://www.nvsos.gov/sos/businesses', 1),

('nv-tax-001', 'NV-TAX-001', 'Nevada Commerce Tax',
 'Businesses with Nevada gross revenue exceeding $4 million must pay the Commerce Tax. Rates vary by industry (NAICS code) from 0.051% to 0.331%. Filed annually with the Department of Taxation by the 45th day following the end of the fiscal year. No individual or corporate income tax.',
 'TAXATION', 'STATE', 'NV',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 '2015-07-01', 'NRS § 363C.010 to 363C.500', 'https://tax.nv.gov/FAQs/Commerce_Tax_FAQs/', 1),

('nv-tax-002', 'NV-TAX-002', 'Nevada Sales and Use Tax Registration',
 'Businesses selling tangible personal property must register with the Department of Taxation for a sales tax permit. State rate is 6.85%. County rates may add up to 1.525% additional. Remote sellers exceeding $100,000 in NV sales or 200 transactions must collect.',
 'TAXATION', 'STATE', 'NV',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'NRS § 372.220 to 372.350', 'https://tax.nv.gov/FAQs/Sales_Tax_FAQs/', 1),

('nv-tax-003', 'NV-TAX-003', 'Nevada Modified Business Tax (MBT)',
 'Employers must pay the Modified Business Tax on wages paid to employees. Rate is 1.378% for general businesses on quarterly wages exceeding $50,000, and 2.0% for financial institutions. Mining companies pay a separate Net Proceeds of Minerals Tax. Reported quarterly.',
 'TAXATION', 'STATE', 'NV',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'NRS § 363B.110 (General); NRS § 363A.130 (Financial)', 'https://tax.nv.gov/FAQs/Modified_Business_Tax_FAQs/', 1),

('nv-rep-001', 'NV-REP-001', 'Nevada Annual List of Officers/Managers',
 'Corporations must file an Annual List of Officers and Directors with the Secretary of State ($150 fee). LLCs must file an Annual List of Managers or Managing Members ($150 fee). Due by the last day of the anniversary month of formation. State Business License ($200) must also be renewed annually.',
 'REPORTING', 'STATE', 'NV',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'NRS § 78.150 (Corp); NRS § 86.263 (LLC)', 'https://www.nvsos.gov/sos/businesses/commercial-recordings/annual-lists', 1),

('nv-ins-001', 'NV-INS-001', 'Nevada Workers'' Compensation Insurance',
 'All employers must carry workers'' compensation insurance. Coverage through licensed insurers or self-insurance with approval from the Division of Industrial Relations. Sole proprietors without employees may opt out but must file an exemption.',
 'INSURANCE', 'STATE', 'NV',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'NRS § 616B.627 to 616B.694', 'https://dir.nv.gov/WCS/Home/', 1),

('nv-emp-001', 'NV-EMP-001', 'Nevada Unemployment Insurance',
 'Employers must register with the Department of Employment, Training and Rehabilitation (DETR) for UI. Contributions paid on the first $40,600 of each employee''s wages. New employer rate is 2.95%. Reported quarterly.',
 'INSURANCE', 'STATE', 'NV',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'NRS § 612.535 to 612.645', 'https://ui.nv.gov/ess.html', 1);


-- ============================================================
-- OKLAHOMA (OK)
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ok-form-001', 'OK-FORM-001', 'Oklahoma Business Entity Formation',
 'LLCs file Articles of Organization with the Secretary of State ($100 filing fee). Corporations file a Certificate of Incorporation ($50 filing fee). Must designate a registered agent in Oklahoma. Foreign entities must file an Application for Certificate of Authority.',
 'FORMATION', 'STATE', 'OK',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, '18 Okl. St. § 2004 (LLC); 18 Okl. St. § 1006 (Corp)', 'https://www.sos.ok.gov/business/', 1),

('ok-tax-001', 'OK-TAX-001', 'Oklahoma Income Tax',
 'Individual income tax is a flat rate of 4.75% (reduced from graduated rates). Corporate income tax is 4.0% on net taxable income. Pass-through entity income flows to individual returns.',
 'TAXATION', 'STATE', 'OK',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, '68 Okl. St. § 2355 (Individual); 68 Okl. St. § 2370 (Corp)', 'https://oklahoma.gov/tax/businesses.html', 1),

('ok-tax-002', 'OK-TAX-002', 'Oklahoma Sales and Use Tax Registration',
 'Businesses selling tangible personal property or taxable services must register with the Oklahoma Tax Commission for a sales tax permit. State rate is 4.5%. Local rates may add 1-7% additional. Remote sellers exceeding $100,000 in OK sales must collect.',
 'TAXATION', 'STATE', 'OK',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '68 Okl. St. § 1350 to 1418', 'https://oklahoma.gov/tax/businesses/sales-use-tax.html', 1),

('ok-rep-001', 'OK-REP-001', 'Oklahoma Annual Certificate/Report',
 'Corporations must file an Annual Certificate with the Secretary of State. Due by the anniversary month of incorporation. Filing fee is $25. LLCs do not file annual reports but must maintain a registered agent. Foreign entities file annual certificates.',
 'REPORTING', 'STATE', 'OK',
 '["CORPORATION","S_CORP","NONPROFIT"]',
 NULL, '18 Okl. St. § 1142', 'https://www.sos.ok.gov/business/', 1),

('ok-ins-001', 'OK-INS-001', 'Oklahoma Workers'' Compensation Insurance',
 'Employers with any number of employees must carry workers'' compensation insurance (with limited agricultural and domestic service exceptions). Coverage through licensed insurers, CompSource Mutual, or self-insurance. Oklahoma adopted an opt-out system for qualifying employers (Oklahoma Employee Injury Benefit Act) but this was struck down by the OK Supreme Court in 2016.',
 'INSURANCE', 'STATE', 'OK',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '85A Okl. St. § 1 to 124', 'https://www.ok.gov/wcc/', 1),

('ok-emp-001', 'OK-EMP-001', 'Oklahoma Unemployment Insurance',
 'Employers must register with the Oklahoma Employment Security Commission for UI. Contributions paid on the first $27,000 of each employee''s wages. New employer rate is 1.5%. Reported quarterly.',
 'INSURANCE', 'STATE', 'OK',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '40 Okl. St. § 1-101 to 3-106', 'https://oklahoma.gov/oesc/employers.html', 1);


-- ============================================================
-- OREGON (OR)
-- No state sales tax.
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('or-form-001', 'OR-FORM-001', 'Oregon Business Entity Formation',
 'LLCs file Articles of Organization with the Secretary of State ($100 filing fee). Corporations file Articles of Incorporation ($100 filing fee). Must designate a registered agent in Oregon. All businesses must also register with the Department of Revenue and may need a Business Identification Number (BIN).',
 'FORMATION', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'ORS § 63.047 (LLC); ORS § 60.047 (Corp)', 'https://sos.oregon.gov/business/Pages/register.aspx', 1),

('or-tax-001', 'OR-TAX-001', 'Oregon Income Tax',
 'Individual income tax rates range from 4.75% to 9.9%, plus a 1.5% Statewide Transit Tax on wages over $200,000. Corporate excise tax rate is 6.6% on first $1 million and 7.6% on income above $1 million. Minimum tax ranges from $150 to $100,000 based on Oregon sales. Pass-through entity income flows to individual returns.',
 'TAXATION', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'ORS § 316.037 (Individual); ORS § 317.061 (Corp)', 'https://www.oregon.gov/dor/programs/businesses/Pages/default.aspx', 1),

('or-tax-002', 'OR-TAX-002', 'Oregon Corporate Activity Tax (CAT)',
 'Businesses with Oregon commercial activity exceeding $1 million must pay the Corporate Activity Tax. Rate is $250 plus 0.57% of Oregon commercial activity exceeding $1 million, with a 35% subtraction for certain costs. Filed annually with the Department of Revenue. Oregon has no general state sales tax.',
 'TAXATION', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 '2020-01-01', 'ORS § 317A.100 to 317A.158', 'https://www.oregon.gov/dor/programs/businesses/Pages/corporate-activity-tax.aspx', 1),

('or-rep-001', 'OR-REP-001', 'Oregon Annual Report',
 'All business entities must file an Annual Report with the Secretary of State. Due by the anniversary of formation/registration. Filing fee is $100 for all entity types. Reports current managers/officers and registered agent.',
 'REPORTING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'ORS § 60.787 (Corp); ORS § 63.787 (LLC)', 'https://sos.oregon.gov/business/Pages/annual-report.aspx', 1),

('or-ins-001', 'OR-INS-001', 'Oregon Workers'' Compensation Insurance',
 'All employers with one or more employees must carry workers'' compensation insurance. Coverage through SAIF Corporation (state insurer), licensed private insurers, or self-insurance. Non-compliance results in penalties up to $250 per day.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'ORS § 656.001 to 656.990', 'https://wcd.oregon.gov/employer/Pages/index.aspx', 1),

('or-emp-001', 'OR-EMP-001', 'Oregon Unemployment Insurance',
 'Employers must register with the Oregon Employment Department for UI. Contributions paid on the first $52,800 of each employee''s wages. New employer rate is 2.1%. Also must withhold Oregon Statewide Transit Tax (0.1% of wages) and contribute to Paid Family and Medical Leave Insurance (1% of wages, split employer/employee). Reported quarterly.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'ORS § 657.001 to 657.990; ORS § 657B (Paid Leave Oregon)', 'https://www.oregon.gov/employ/businesses/Pages/default.aspx', 1);


-- ============================================================
-- RHODE ISLAND (RI)
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ri-form-001', 'RI-FORM-001', 'Rhode Island Business Entity Formation',
 'LLCs file Articles of Organization with the Secretary of State ($150 filing fee). Corporations file Articles of Incorporation ($230 filing fee). Must designate a registered agent in Rhode Island. Foreign entities must file for authority to transact business.',
 'FORMATION', 'STATE', 'RI',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'R.I. Gen. Laws § 7-16-4 (LLC); R.I. Gen. Laws § 7-1.2-104 (Corp)', 'https://www.sos.ri.gov/divisions/business-services', 1),

('ri-tax-001', 'RI-TAX-001', 'Rhode Island Income Tax',
 'Individual income tax rates range from 3.75% to 5.99%. Corporate income tax rate is 7.0% on net income, with a minimum tax of $400. Pass-through entity income flows to individual returns.',
 'TAXATION', 'STATE', 'RI',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'R.I. Gen. Laws § 44-30-1 (Individual); R.I. Gen. Laws § 44-11-2 (Corp)', 'https://tax.ri.gov/tax-sections/corporate-tax', 1),

('ri-tax-002', 'RI-TAX-002', 'Rhode Island Sales and Use Tax Registration',
 'Businesses selling tangible personal property or taxable services must register with the Division of Taxation for a sales tax permit. State rate is 7.0%. Remote sellers exceeding $100,000 in RI sales or 200 transactions must collect.',
 'TAXATION', 'STATE', 'RI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'R.I. Gen. Laws § 44-18-1 to 44-18-40', 'https://tax.ri.gov/tax-sections/sales-use-tax', 1),

('ri-rep-001', 'RI-REP-001', 'Rhode Island Annual Report',
 'Corporations and LLCs must file an Annual Report with the Secretary of State. Due by the anniversary of formation for LLCs; by March 1 for corporations. Filing fee is $50 for LLCs and $50 for corporations. Reports current officers/members and registered agent.',
 'REPORTING', 'STATE', 'RI',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'R.I. Gen. Laws § 7-1.2-1302 (Corp); R.I. Gen. Laws § 7-16-67 (LLC)', 'https://www.sos.ri.gov/divisions/business-services', 1),

('ri-ins-001', 'RI-INS-001', 'Rhode Island Workers'' Compensation Insurance',
 'All employers with one or more employees must carry workers'' compensation insurance. Coverage through licensed insurers or self-insurance. Rhode Island also requires Temporary Disability Insurance (TDI) coverage funded by employee payroll deductions.',
 'INSURANCE', 'STATE', 'RI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'R.I. Gen. Laws § 28-29-1 to 28-29-21; § 28-39 (TDI)', 'https://www.dlt.ri.gov/wc/', 1),

('ri-emp-001', 'RI-EMP-001', 'Rhode Island Unemployment Insurance',
 'Employers must register with the Department of Labor and Training for UI. Contributions paid on the first $29,200 of each employee''s wages. New employer rate is approximately 1.19%. Also must contribute to the Job Development Fund (0.21% of taxable wages). Reported quarterly.',
 'INSURANCE', 'STATE', 'RI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'R.I. Gen. Laws § 28-42-1 to 28-44-68', 'https://dlt.ri.gov/employers/employer-tax', 1);


-- ============================================================
-- SOUTH CAROLINA (SC)
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('sc-form-001', 'SC-FORM-001', 'South Carolina Business Entity Formation',
 'LLCs file Articles of Organization with the Secretary of State ($110 filing fee). Corporations file Articles of Incorporation ($135 filing fee). Must designate a registered agent in South Carolina. Foreign entities must obtain a Certificate of Authority.',
 'FORMATION', 'STATE', 'SC',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'S.C. Code § 33-44-202 (LLC); S.C. Code § 33-2-102 (Corp)', 'https://www.sos.sc.gov/business-filings', 1),

('sc-tax-001', 'SC-TAX-001', 'South Carolina Income Tax',
 'Individual income tax rate is a flat 6.4% (transitioning from graduated rates under 2022 reform, reaching 6.2% by 2027). Corporate income tax rate is 5.0% on net income. Pass-through entity income flows to individual returns. An annual license fee of $15 plus 0.1% of capital stock and paid-in surplus applies to corporations.',
 'TAXATION', 'STATE', 'SC',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'S.C. Code § 12-6-510 (Individual); S.C. Code § 12-6-530 (Corp)', 'https://dor.sc.gov/tax/business', 1),

('sc-tax-002', 'SC-TAX-002', 'South Carolina Sales and Use Tax Registration',
 'Businesses selling tangible personal property or taxable services must register with the Department of Revenue for a retail license. State rate is 6.0%. Local rates may add up to 3% additional. Max rate on most items is capped. Remote sellers exceeding $100,000 in SC sales must collect.',
 'TAXATION', 'STATE', 'SC',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'S.C. Code § 12-36-10 to 12-36-2690', 'https://dor.sc.gov/tax/sales-and-use', 1),

('sc-rep-001', 'SC-REP-001', 'South Carolina Annual Report',
 'All corporations and LLCs must file an Annual Report with the Secretary of State. Due by the anniversary of formation. No filing fee for annual reports. Reports current officers/members and registered agent.',
 'REPORTING', 'STATE', 'SC',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'S.C. Code § 33-1-600 (Corp); S.C. Code § 33-44-211 (LLC)', 'https://www.sos.sc.gov/business-filings', 1),

('sc-ins-001', 'SC-INS-001', 'South Carolina Workers'' Compensation Insurance',
 'Employers with 4 or more employees must carry workers'' compensation insurance. Coverage through licensed insurers or self-insurance. Agricultural employers with fewer than specified employees may be exempt.',
 'INSURANCE', 'STATE', 'SC',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'S.C. Code § 42-1-310 to 42-1-560', 'https://wcc.sc.gov/', 1),

('sc-emp-001', 'SC-EMP-001', 'South Carolina Unemployment Insurance',
 'Employers must register with the Department of Employment and Workforce for UI. Contributions paid on the first $14,000 of each employee''s wages. New employer rate is approximately 1.07%. Reported quarterly.',
 'INSURANCE', 'STATE', 'SC',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'S.C. Code § 41-27-10 to 41-42-40', 'https://dew.sc.gov/employers', 1);


-- ============================================================
-- SOUTH DAKOTA (SD)
-- No individual or corporate income tax.
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('sd-form-001', 'SD-FORM-001', 'South Dakota Business Entity Formation',
 'LLCs file Articles of Organization with the Secretary of State ($150 filing fee online). Corporations file Articles of Incorporation ($150 filing fee). Must designate a registered agent in South Dakota. Foreign entities must obtain a Certificate of Authority.',
 'FORMATION', 'STATE', 'SD',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'SDCL § 47-34A-202 (LLC); SDCL § 47-1A-202 (Corp)', 'https://sdsos.gov/business-services/', 1),

('sd-tax-001', 'SD-TAX-001', 'South Dakota Sales and Use Tax Registration',
 'Businesses selling tangible personal property or taxable services must register with the Department of Revenue. State rate is 4.2%. Municipal rates may add up to 2% additional. South Dakota has no individual or corporate income tax. Remote sellers exceeding $100,000 in SD sales or 200 transactions must collect (Wayfair origin state).',
 'TAXATION', 'STATE', 'SD',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'SDCL § 10-45-1 to 10-45-131', 'https://dor.sd.gov/businesses/taxes/sales-use-tax/', 1),

('sd-tax-002', 'SD-TAX-002', 'South Dakota Bank Franchise Tax',
 'Financial institutions doing business in South Dakota are subject to the Bank Franchise Tax at 0.2% to 0.4% of net income in lieu of other business taxes. Non-financial businesses have no income tax obligation.',
 'TAXATION', 'STATE', 'SD',
 '["CORPORATION"]',
 NULL, 'SDCL § 10-43-1 to 10-43-74', 'https://dor.sd.gov/businesses/taxes/bank-franchise-tax/', 1),

('sd-rep-001', 'SD-REP-001', 'South Dakota Annual Report',
 'Domestic and foreign corporations and LLCs must file an Annual Report with the Secretary of State. Due by the first day of the anniversary month of formation. Filing fee is $50 for domestic LLCs and corporations, $50 for foreign entities.',
 'REPORTING', 'STATE', 'SD',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'SDCL § 47-1A-1622 (Corp); SDCL § 47-34A-211 (LLC)', 'https://sdsos.gov/business-services/', 1),

('sd-ins-001', 'SD-INS-001', 'South Dakota Workers'' Compensation Insurance',
 'All employers must carry workers'' compensation insurance. Coverage through licensed insurers or self-insurance with approval from the Department of Labor and Regulation. No state fund available.',
 'INSURANCE', 'STATE', 'SD',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'SDCL § 62-1-1 to 62-8-49', 'https://dlr.sd.gov/workers_compensation/', 1),

('sd-emp-001', 'SD-EMP-001', 'South Dakota Unemployment Insurance',
 'Employers must register with the Department of Labor and Regulation for UI. Contributions paid on the first $15,000 of each employee''s wages. New employer rate is 1.2%. Reported quarterly.',
 'INSURANCE', 'STATE', 'SD',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'SDCL § 61-5-1 to 61-5-37', 'https://dlr.sd.gov/ra/', 1);


-- ============================================================
-- TENNESSEE (TN)
-- No individual income tax on wages (Hall Tax on interest/dividends repealed 2021).
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('tn-form-001', 'TN-FORM-001', 'Tennessee Business Entity Formation',
 'LLCs file Articles of Organization with the Secretary of State ($300 per member, minimum $300). Corporations file a Charter with the Secretary of State ($100 filing fee). Must designate a registered agent in Tennessee. Foreign entities must file an Application for Certificate of Authority.',
 'FORMATION', 'STATE', 'TN',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Tenn. Code § 48-249-202 (LLC); Tenn. Code § 48-12-102 (Corp)', 'https://sos.tn.gov/business-services', 1),

('tn-tax-001', 'TN-TAX-001', 'Tennessee Franchise and Excise Tax',
 'The franchise tax is 0.25% of the greater of net worth or the book value of real/tangible personal property owned in Tennessee (minimum $100). The excise tax is 6.5% of net earnings. Both apply to all entities doing business in Tennessee. No individual income tax on wages. Filed annually.',
 'TAXATION', 'STATE', 'TN',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 NULL, 'Tenn. Code § 67-4-2004 (Excise); Tenn. Code § 67-4-2105 (Franchise)', 'https://www.tn.gov/revenue/taxes/franchise---excise-tax.html', 1),

('tn-tax-002', 'TN-TAX-002', 'Tennessee Sales and Use Tax Registration',
 'Businesses selling tangible personal property or taxable services must register with the Department of Revenue. State rate is 7.0% (4.0% on food). Local rates add 1.5-2.75% additional. Remote sellers exceeding $100,000 in TN sales must collect.',
 'TAXATION', 'STATE', 'TN',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Tenn. Code § 67-6-101 to 67-6-906', 'https://www.tn.gov/revenue/taxes/sales-and-use-tax.html', 1),

('tn-rep-001', 'TN-REP-001', 'Tennessee Annual Report',
 'All business entities must file an Annual Report with the Secretary of State. Due by the first day of the fourth month after the entity''s fiscal year-end. Filing fee is $20 minimum. Reports current officers/members and registered agent.',
 'REPORTING', 'STATE', 'TN',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'Tenn. Code § 48-26-102 (Corp); Tenn. Code § 48-249-1107 (LLC)', 'https://sos.tn.gov/business-services/annual-report', 1),

('tn-ins-001', 'TN-INS-001', 'Tennessee Workers'' Compensation Insurance',
 'Employers with 5 or more employees must carry workers'' compensation insurance (construction industry: 1 or more). Coverage through licensed insurers or self-insurance. Coal mining employers have additional requirements.',
 'INSURANCE', 'STATE', 'TN',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Tenn. Code § 50-6-101 to 50-6-705', 'https://www.tn.gov/workforce/injuries-at-work.html', 1),

('tn-emp-001', 'TN-EMP-001', 'Tennessee Unemployment Insurance',
 'Employers must register with the Department of Labor and Workforce Development for UI. Contributions paid on the first $7,000 of each employee''s wages. New employer rate is 2.7%. Reported quarterly. Tennessee has a premium surcharge that varies annually.',
 'INSURANCE', 'STATE', 'TN',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Tenn. Code § 50-7-301 to 50-7-404', 'https://www.tn.gov/workforce/employers.html', 1);


-- ============================================================
-- UTAH (UT)
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ut-form-001', 'UT-FORM-001', 'Utah Business Entity Formation',
 'LLCs file a Certificate of Organization with the Division of Corporations ($54 filing fee). Corporations file Articles of Incorporation ($70 filing fee). Must designate a registered agent in Utah. Foreign entities must register for authority to transact business.',
 'FORMATION', 'STATE', 'UT',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Utah Code § 48-3a-201 (LLC); Utah Code § 16-10a-202 (Corp)', 'https://corporations.utah.gov/', 1),

('ut-tax-001', 'UT-TAX-001', 'Utah Income Tax',
 'Utah has a flat individual income tax rate of 4.65%. Corporate income tax is also a flat 4.65% on net income. Minimum corporate franchise tax is $100. Pass-through entity income flows to individual returns.',
 'TAXATION', 'STATE', 'UT',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'Utah Code § 59-10-104 (Individual); Utah Code § 59-7-104 (Corp)', 'https://tax.utah.gov/business', 1),

('ut-tax-002', 'UT-TAX-002', 'Utah Sales and Use Tax Registration',
 'Businesses selling tangible personal property or taxable services must register with the Utah State Tax Commission. Combined state and local rate ranges from 6.1% to 9.05% depending on location (state portion is 4.85%). Remote sellers exceeding $100,000 in UT sales or 200 transactions must collect.',
 'TAXATION', 'STATE', 'UT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Utah Code § 59-12-101 to 59-12-2204', 'https://tax.utah.gov/sales', 1),

('ut-rep-001', 'UT-REP-001', 'Utah Annual Renewal',
 'All business entities must file an Annual Renewal with the Division of Corporations. Due by the anniversary of formation. Filing fee is $18 for most entity types. Reports current officers/members and registered agent. Failure to renew results in administrative dissolution.',
 'REPORTING', 'STATE', 'UT',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'Utah Code § 16-10a-1622 (Corp); Utah Code § 48-3a-212 (LLC)', 'https://corporations.utah.gov/', 1),

('ut-ins-001', 'UT-INS-001', 'Utah Workers'' Compensation Insurance',
 'All employers with one or more employees must carry workers'' compensation insurance. Coverage through licensed insurers, the Workers'' Compensation Fund of Utah, or self-insurance. Sole proprietors and partners may elect coverage.',
 'INSURANCE', 'STATE', 'UT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Utah Code § 34A-2-101 to 34A-2-905', 'https://laborcommission.utah.gov/divisions/industrial-accidents/', 1),

('ut-emp-001', 'UT-EMP-001', 'Utah Unemployment Insurance',
 'Employers must register with the Department of Workforce Services for UI. Contributions paid on the first $44,800 of each employee''s wages. New employer rate is approximately 1.1%. Reported quarterly.',
 'INSURANCE', 'STATE', 'UT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Utah Code § 35A-4-301 to 35A-4-508', 'https://jobs.utah.gov/employer/', 1);


-- ============================================================
-- VIRGINIA (VA)
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('va-form-001', 'VA-FORM-001', 'Virginia Business Entity Formation',
 'LLCs file Articles of Organization with the State Corporation Commission ($100 filing fee). Corporations file Articles of Incorporation ($100 filing fee). Must designate a registered agent in Virginia. Foreign entities must obtain a Certificate of Authority ($100 fee).',
 'FORMATION', 'STATE', 'VA',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Va. Code § 13.1-1004 (LLC); Va. Code § 13.1-618 (Corp)', 'https://www.scc.virginia.gov/pages/Business-Entity-Forms', 1),

('va-tax-001', 'VA-TAX-001', 'Virginia Income Tax',
 'Individual income tax rates range from 2.0% to 5.75%. Corporate income tax rate is 6.0% on net Virginia taxable income. Pass-through entity income flows to individual returns. Virginia also has a Pass-Through Entity Tax (PTET) election available.',
 'TAXATION', 'STATE', 'VA',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'Va. Code § 58.1-320 (Individual); Va. Code § 58.1-400 (Corp)', 'https://www.tax.virginia.gov/business', 1),

('va-tax-002', 'VA-TAX-002', 'Virginia Sales and Use Tax Registration',
 'Businesses selling tangible personal property or taxable services must register with the Department of Taxation for a Certificate of Registration. State rate is 4.3% plus 1% local tax (5.3% combined, 6.0-7.0% in certain regions). Remote sellers exceeding $100,000 in VA sales or 200 transactions must collect.',
 'TAXATION', 'STATE', 'VA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Va. Code § 58.1-600 to 58.1-639.21', 'https://www.tax.virginia.gov/sales-and-use-tax', 1),

('va-rep-001', 'VA-REP-001', 'Virginia Annual Report/Registration Fee',
 'LLCs must file an Annual Registration Fee ($50) with the State Corporation Commission by the last day of the anniversary month. Corporations must file an Annual Report ($25) by the last day of the anniversary month. Reports current officers/members and registered agent.',
 'REPORTING', 'STATE', 'VA',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'Va. Code § 13.1-1062.1 (LLC); Va. Code § 13.1-775 (Corp)', 'https://www.scc.virginia.gov/pages/Annual-Report', 1),

('va-ins-001', 'VA-INS-001', 'Virginia Workers'' Compensation Insurance',
 'Employers with 2 or more employees (including part-time) must carry workers'' compensation insurance. Coverage through licensed insurers or self-insurance with approval from the Virginia Workers'' Compensation Commission.',
 'INSURANCE', 'STATE', 'VA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Va. Code § 65.2-100 to 65.2-1310', 'https://www.vwc.state.va.us/', 1),

('va-emp-001', 'VA-EMP-001', 'Virginia Unemployment Insurance',
 'Employers must register with the Virginia Employment Commission for UI. Contributions paid on the first $8,000 of each employee''s wages. New employer rate is 2.5%. Reported quarterly.',
 'INSURANCE', 'STATE', 'VA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Va. Code § 60.2-100 to 60.2-638', 'https://www.vec.virginia.gov/employers', 1);


-- ============================================================
-- VERMONT (VT)
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('vt-form-001', 'VT-FORM-001', 'Vermont Business Entity Formation',
 'LLCs file Articles of Organization with the Secretary of State ($125 filing fee). Corporations file Articles of Incorporation ($125 filing fee). Must designate a registered agent in Vermont. Foreign entities must file for authority to transact business.',
 'FORMATION', 'STATE', 'VT',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, '11 V.S.A. § 4043 (LLC); 11B V.S.A. § 2.02 (Corp)', 'https://sos.vermont.gov/corporations/', 1),

('vt-tax-001', 'VT-TAX-001', 'Vermont Income Tax',
 'Individual income tax rates range from 3.35% to 8.75%. Corporate income tax rates range from 6.0% to 8.5% on net income. Minimum corporate tax is $250. Pass-through entity income flows to individual returns.',
 'TAXATION', 'STATE', 'VT',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, '32 V.S.A. § 5822 (Individual); 32 V.S.A. § 5832 (Corp)', 'https://tax.vermont.gov/business', 1),

('vt-tax-002', 'VT-TAX-002', 'Vermont Sales and Use Tax Registration',
 'Businesses selling tangible personal property or taxable services must register with the Department of Taxes. State rate is 6.0%. Local option taxes of 1% may apply in certain municipalities. Remote sellers exceeding $100,000 in VT sales or 200 transactions must collect.',
 'TAXATION', 'STATE', 'VT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '32 V.S.A. § 9701 to 9781', 'https://tax.vermont.gov/business/sales-and-use-tax', 1),

('vt-rep-001', 'VT-REP-001', 'Vermont Biennial/Annual Report',
 'Corporations must file a Biennial Report with the Secretary of State by the anniversary quarter of formation. LLCs are not required to file periodic reports but must maintain a registered agent. Filing fee is $45 for corporations.',
 'REPORTING', 'STATE', 'VT',
 '["CORPORATION","S_CORP","NONPROFIT"]',
 NULL, '11B V.S.A. § 16.22', 'https://sos.vermont.gov/corporations/', 1),

('vt-ins-001', 'VT-INS-001', 'Vermont Workers'' Compensation Insurance',
 'All employers with one or more employees must carry workers'' compensation insurance. Coverage through licensed insurers or self-insurance. Vermont does not have a state fund. Non-compliance is a criminal offense.',
 'INSURANCE', 'STATE', 'VT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '21 V.S.A. § 601 to 710', 'https://labor.vermont.gov/workers-compensation', 1),

('vt-emp-001', 'VT-EMP-001', 'Vermont Unemployment Insurance',
 'Employers must register with the Department of Labor for UI. Contributions paid on the first $16,100 of each employee''s wages. New employer rate is 1.0%. Reported quarterly.',
 'INSURANCE', 'STATE', 'VT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '21 V.S.A. § 1301 to 1467', 'https://labor.vermont.gov/unemployment-insurance/employers', 1);


-- ============================================================
-- WASHINGTON (WA)
-- No individual or corporate income tax.
-- No state income tax.
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('wa-form-001', 'WA-FORM-001', 'Washington Business Entity Formation',
 'LLCs file a Certificate of Formation with the Secretary of State ($200 filing fee). Corporations file Articles of Incorporation ($180 filing fee). Must designate a registered agent in Washington. All businesses must also obtain a Washington State Business License (UBI number) from the Department of Revenue.',
 'FORMATION', 'STATE', 'WA',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'RCW § 25.15.071 (LLC); RCW § 23B.02.020 (Corp)', 'https://www.sos.wa.gov/corps/', 1),

('wa-tax-001', 'WA-TAX-001', 'Washington Business & Occupation (B&O) Tax',
 'Washington imposes the Business & Occupation Tax on gross receipts (not net income). Rates vary by activity: retailing 0.471%, wholesaling 0.484%, manufacturing 0.484%, services 1.5%. No deduction for costs of doing business. Reported monthly, quarterly, or annually based on volume. Small business B&O tax credit available for businesses with annual B&O liability under $4,320.',
 'TAXATION', 'STATE', 'WA',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'RCW § 82.04.010 to 82.04.920', 'https://dor.wa.gov/taxes-rates/business-occupation-tax', 1),

('wa-tax-002', 'WA-TAX-002', 'Washington Sales and Use Tax Registration',
 'Businesses selling tangible personal property or taxable services must register with the Department of Revenue. State rate is 6.5%. Local rates add 0.5-4.0% additional (combined rates from 7.0% to 10.5%). Remote sellers exceeding $100,000 in WA sales must collect. Washington has no individual or corporate income tax.',
 'TAXATION', 'STATE', 'WA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'RCW § 82.08.010 to 82.08.990', 'https://dor.wa.gov/taxes-rates/retail-sales-tax', 1),

('wa-tax-003', 'WA-TAX-003', 'Washington Capital Gains Tax',
 'Washington imposes a 7.0% tax on the sale or exchange of long-term capital assets exceeding $270,000 (adjusted annually for inflation). Applies to individuals only. Excludes real estate, retirement accounts, livestock, and certain small business interests. Upheld by WA Supreme Court in March 2023.',
 'TAXATION', 'STATE', 'WA',
 '["SOLE_PROPRIETORSHIP","PARTNERSHIP","LLC"]',
 '2022-01-01', 'RCW § 82.87.010 to 82.87.901', 'https://dor.wa.gov/taxes-rates/other-taxes/capital-gains-tax', 1),

('wa-rep-001', 'WA-REP-001', 'Washington Annual Report',
 'All business entities must file an Annual Report with the Secretary of State. Due by the last day of the anniversary month of formation. Filing fee is $60 for LLCs and $60 for corporations. Reports current members/officers and registered agent.',
 'REPORTING', 'STATE', 'WA',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'RCW § 23.95.255', 'https://www.sos.wa.gov/corps/', 1),

('wa-ins-001', 'WA-INS-001', 'Washington Workers'' Compensation Insurance',
 'All employers must provide workers'' compensation coverage through the Washington State Department of Labor & Industries (L&I) or qualify as a self-insurer. Washington is a monopolistic state fund state — private insurance is not available. Both employer and employee contribute to premiums.',
 'INSURANCE', 'STATE', 'WA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'RCW § 51.12.010 to 51.98.070', 'https://www.lni.wa.gov/insurance/', 1),

('wa-emp-001', 'WA-EMP-001', 'Washington Unemployment Insurance and Paid Leave',
 'Employers must register with the Employment Security Department for UI. Contributions paid on the first $67,600 of each employee''s wages. New employer rate varies by industry. Also must participate in Washington Paid Family and Medical Leave (PFML) at 0.74% of wages (employer/employee split). Reported quarterly.',
 'INSURANCE', 'STATE', 'WA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'RCW § 50.24.010 to 50.24.240; RCW § 50A (PFML)', 'https://esd.wa.gov/employer-taxes', 1);


-- ============================================================
-- WISCONSIN (WI)
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('wi-form-001', 'WI-FORM-001', 'Wisconsin Business Entity Formation',
 'LLCs file Articles of Organization with the Department of Financial Institutions ($130 filing fee online). Corporations file Articles of Incorporation ($100 filing fee). Must designate a registered agent in Wisconsin. Foreign entities must obtain a Certificate of Authority.',
 'FORMATION', 'STATE', 'WI',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Wis. Stat. § 183.0202 (LLC); Wis. Stat. § 180.0202 (Corp)', 'https://www.wdfi.org/corporations/', 1),

('wi-tax-001', 'WI-TAX-001', 'Wisconsin Income Tax',
 'Individual income tax rates range from 3.50% to 7.65%. Corporate income/franchise tax rate is 7.9% on net income. Minimum franchise tax for corporations is $25. Pass-through entity income flows to individual returns.',
 'TAXATION', 'STATE', 'WI',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'Wis. Stat. § 71.02 (Individual); Wis. Stat. § 71.23 (Corp)', 'https://www.revenue.wi.gov/Pages/Businesses/New-Background.aspx', 1),

('wi-tax-002', 'WI-TAX-002', 'Wisconsin Sales and Use Tax Registration',
 'Businesses selling tangible personal property or taxable services must register with the Department of Revenue for a seller''s permit. State rate is 5.0%. County taxes of 0.5% may apply (0.1-1.75% in some counties). Remote sellers exceeding $100,000 in WI sales must collect.',
 'TAXATION', 'STATE', 'WI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Wis. Stat. § 77.51 to 77.65', 'https://www.revenue.wi.gov/Pages/SalesAndUse/home.aspx', 1),

('wi-rep-001', 'WI-REP-001', 'Wisconsin Annual Report',
 'All domestic and foreign corporations and LLCs must file an Annual Report with the Department of Financial Institutions. Due by the end of the anniversary quarter for corporations, by the end of the anniversary quarter for LLCs. Filing fee is $25 for all entity types.',
 'REPORTING', 'STATE', 'WI',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'Wis. Stat. § 180.1622 (Corp); Wis. Stat. § 183.0120 (LLC)', 'https://www.wdfi.org/corporations/', 1),

('wi-ins-001', 'WI-INS-001', 'Wisconsin Workers'' Compensation Insurance',
 'Employers with 3 or more employees (or 1 or more for construction) must carry workers'' compensation insurance. Coverage through licensed insurers or self-insurance with approval from the Department of Workforce Development.',
 'INSURANCE', 'STATE', 'WI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Wis. Stat. § 102.01 to 102.89', 'https://dwd.wisconsin.gov/wc/', 1),

('wi-emp-001', 'WI-EMP-001', 'Wisconsin Unemployment Insurance',
 'Employers must register with the Department of Workforce Development for UI. Contributions paid on the first $14,000 of each employee''s wages. New employer rate is 2.5-3.25% depending on industry. Reported quarterly.',
 'INSURANCE', 'STATE', 'WI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Wis. Stat. § 108.01 to 108.26', 'https://dwd.wisconsin.gov/uitax/', 1);


-- ============================================================
-- WEST VIRGINIA (WV)
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('wv-form-001', 'WV-FORM-001', 'West Virginia Business Entity Formation',
 'LLCs file Articles of Organization with the Secretary of State ($100 filing fee). Corporations file Articles of Incorporation ($100 filing fee). Must designate a registered agent in West Virginia. Foreign entities must obtain a Certificate of Authority.',
 'FORMATION', 'STATE', 'WV',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'W. Va. Code § 31B-2-202 (LLC); W. Va. Code § 31D-2-202 (Corp)', 'https://sos.wv.gov/business/', 1),

('wv-tax-001', 'WV-TAX-001', 'West Virginia Income Tax',
 'Individual income tax rates range from 2.36% to 5.12% (rates being phased down under 2023 HB 2526). Corporate net income tax rate is 6.5% on net income apportioned to West Virginia. Pass-through entity income flows to individual returns.',
 'TAXATION', 'STATE', 'WV',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","SOLE_PROPRIETORSHIP"]',
 NULL, 'W. Va. Code § 11-21-1 (Individual); W. Va. Code § 11-24-1 (Corp)', 'https://tax.wv.gov/Business/Pages/default.aspx', 1),

('wv-tax-002', 'WV-TAX-002', 'West Virginia Sales and Use Tax Registration',
 'Businesses selling tangible personal property or taxable services must register with the State Tax Department for a business registration certificate. State rate is 6.0%. Municipal B&O taxes may also apply at the local level. Remote sellers exceeding $100,000 in WV sales or 200 transactions must collect.',
 'TAXATION', 'STATE', 'WV',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'W. Va. Code § 11-15-1 to 11-15-42', 'https://tax.wv.gov/Business/SalesAndUseTax/Pages/SalesAndUseTax.aspx', 1),

('wv-rep-001', 'WV-REP-001', 'West Virginia Annual Report',
 'All business entities must file an Annual Report with the Secretary of State. Due by July 1 each year. Filing fee is $25 for domestic entities and $25 for foreign entities. Reports current officers/members and registered agent.',
 'REPORTING', 'STATE', 'WV',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'W. Va. Code § 31D-16-1622 (Corp); W. Va. Code § 31B-2-211 (LLC)', 'https://sos.wv.gov/business/', 1),

('wv-ins-001', 'WV-INS-001', 'West Virginia Workers'' Compensation Insurance',
 'All employers with one or more employees must carry workers'' compensation insurance. West Virginia transitioned from a monopolistic state fund to a private market system in 2006. Coverage now available through licensed private insurers or self-insurance.',
 'INSURANCE', 'STATE', 'WV',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'W. Va. Code § 23-1-1 to 23-5A-3', 'https://www.wvinsurance.gov/workers-compensation', 1),

('wv-emp-001', 'WV-EMP-001', 'West Virginia Unemployment Insurance',
 'Employers must register with WorkForce West Virginia for UI. Contributions paid on the first $9,000 of each employee''s wages. New employer rate is 2.7%. Reported quarterly.',
 'INSURANCE', 'STATE', 'WV',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'W. Va. Code § 21A-5-1 to 21A-5-26', 'https://workforcewv.org/employers/', 1);


-- ============================================================
-- WYOMING (WY)
-- No individual or corporate income tax.
-- ============================================================

INSERT INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('wy-form-001', 'WY-FORM-001', 'Wyoming Business Entity Formation',
 'LLCs file Articles of Organization with the Secretary of State ($100 filing fee online). Corporations file Articles of Incorporation ($100 filing fee). Must designate a registered agent in Wyoming. Wyoming is known for favorable LLC laws with strong charging order protections.',
 'FORMATION', 'STATE', 'WY',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Wyo. Stat. § 17-29-201 (LLC); Wyo. Stat. § 17-16-202 (Corp)', 'https://sos.wyo.gov/Business/StartBusiness.aspx', 1),

('wy-tax-001', 'WY-TAX-001', 'Wyoming Sales and Use Tax Registration',
 'Businesses selling tangible personal property or taxable services must obtain a sales tax license from the Department of Revenue. State rate is 4.0%. County rates may add up to 2% additional. Wyoming has no individual or corporate income tax. Remote sellers exceeding $100,000 in WY sales or 200 transactions must collect.',
 'TAXATION', 'STATE', 'WY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Wyo. Stat. § 39-15-101 to 39-15-411', 'https://revenue.wyo.gov/tax-types/sales-use-tax', 1),

('wy-rep-001', 'WY-REP-001', 'Wyoming Annual Report',
 'All domestic and foreign business entities must file an Annual Report with the Secretary of State. Due by the first day of the anniversary month of formation. Filing fee is based on assets located in Wyoming: $60 minimum for LLCs ($60 flat), $60 or more for corporations based on assets.',
 'REPORTING', 'STATE', 'WY',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 NULL, 'Wyo. Stat. § 17-16-1630 (Corp); Wyo. Stat. § 17-29-210 (LLC)', 'https://sos.wyo.gov/Business/AnnualReport.aspx', 1),

('wy-ins-001', 'WY-INS-001', 'Wyoming Workers'' Compensation Insurance',
 'All employers must provide workers'' compensation coverage through the Wyoming Workers'' Safety and Compensation Division (state fund). Wyoming is a monopolistic state fund state — private workers'' compensation insurance is not available. Rates are based on industry classification.',
 'INSURANCE', 'STATE', 'WY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Wyo. Stat. § 27-14-101 to 27-14-805', 'https://dws.wyo.gov/dws-division/workers-compensation/', 1),

('wy-emp-001', 'WY-EMP-001', 'Wyoming Unemployment Insurance',
 'Employers must register with the Department of Workforce Services for UI. Contributions paid on the first $30,900 of each employee''s wages. New employer rate is approximately 1.94%. Reported quarterly. Wyoming has no state income tax withholding.',
 'INSURANCE', 'STATE', 'WY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Wyo. Stat. § 27-3-101 to 27-3-706', 'https://dws.wyo.gov/dws-division/ui-tax/', 1);

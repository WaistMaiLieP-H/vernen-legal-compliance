-- Vernen Legal Compliance — Comprehensive Privacy Rules
-- The Complete Book: Data Privacy & Protection for All 50 States + DC + Federal
-- Created: March 17, 2026
--
-- Coverage:
--   Federal: HIPAA, COPPA, CAN-SPAM, GLBA, FERPA, FCRA, VPPA, TCPA, DPPA
--   State: Comprehensive privacy laws (20+ states), data breach notification (all 50),
--     biometric privacy, student privacy, health privacy, financial privacy

-- ============================================================
-- EXPANDED FEDERAL PRIVACY RULES
-- (existing: HIPAA, CAN-SPAM, COPPA — adding the rest)
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

-- GLBA
('fed-priv-004', 'FED-PRIV-004', 'Gramm-Leach-Bliley Act (GLBA) — Financial Privacy',
 'Financial institutions must provide clear privacy notices explaining information-sharing practices. Customers must be given the right to opt out of sharing with non-affiliated third parties. The Safeguards Rule requires written information security plans with administrative, technical, and physical safeguards. Covers banks, securities firms, insurance companies, and other businesses providing financial products/services. FTC Safeguards Rule updated 2023 with enhanced requirements.',
 'PRIVACY', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2000-07-01', '15 USC § 6801-6809; 16 CFR Part 314 (Safeguards Rule)', 'https://www.ftc.gov/legal-library/browse/statutes/gramm-leach-bliley-act', 1),

-- FERPA
('fed-priv-005', 'FED-PRIV-005', 'Family Educational Rights and Privacy Act (FERPA)',
 'Educational institutions receiving federal funding must protect the privacy of student education records. Parents (or eligible students over 18) have the right to inspect, request amendment, and control disclosure of records. Written consent required before releasing personally identifiable information. Directory information may be released without consent if annual notice given and opt-out honored. Violations: loss of federal funding.',
 'PRIVACY', 'FEDERAL', NULL,
 '["NONPROFIT","LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 '1974-08-21', '20 USC § 1232g; 34 CFR Part 99', 'https://www2.ed.gov/policy/gen/guid/fpco/ferpa/index.html', 1),

-- FCRA
('fed-priv-006', 'FED-PRIV-006', 'Fair Credit Reporting Act (FCRA)',
 'Consumer reporting agencies, users of consumer reports, and furnishers of information must comply with FCRA. Users must: have permissible purpose, provide adverse action notices, obtain consumer consent for employment reports. CRAs must: ensure accuracy, limit reporting period (7 years negative, 10 years bankruptcy), investigate disputes within 30 days. Furnishers must: report accurately and investigate disputes. Private right of action: statutory damages $100-$1,000 per violation (willful); actual damages (negligent).',
 'PRIVACY', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '1970-10-26', '15 USC § 1681-1681x; 12 CFR Part 1022', 'https://www.ftc.gov/legal-library/browse/statutes/fair-credit-reporting-act', 1),

-- VPPA
('fed-priv-007', 'FED-PRIV-007', 'Video Privacy Protection Act (VPPA)',
 'Video tape service providers may not disclose personally identifiable information about a consumer''s video viewing habits without written consent. Applies to streaming services, video rental services, and similar providers. Written consent must be distinct and separate from other terms. Private right of action with statutory damages of at least $2,500 per violation. Updated interpretation includes modern streaming services.',
 'PRIVACY', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '1988-11-05', '18 USC § 2710-2711', 'https://www.law.cornell.edu/uscode/text/18/2710', 1),

-- TCPA
('fed-priv-008', 'FED-PRIV-008', 'Telephone Consumer Protection Act (TCPA)',
 'Businesses may not make calls using automatic telephone dialing systems (ATDS) or prerecorded/artificial voice messages to cell phones without prior express consent (written consent for telemarketing). Must maintain do-not-call lists and honor the National Do Not Call Registry. Text messages are treated as calls. Violations: $500-$1,500 per call/text. One of the highest-volume sources of class action litigation.',
 'PRIVACY', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '1991-12-20', '47 USC § 227; 47 CFR Part 64.1200', 'https://www.fcc.gov/general/telemarketing-and-robocalls', 1),

-- DPPA
('fed-priv-009', 'FED-PRIV-009', 'Driver''s Privacy Protection Act (DPPA)',
 'State DMVs and their authorized recipients may not disclose personal information from motor vehicle records without consent or a permissible use. Permissible uses include: insurance claims, litigation, recall notices, employer verification. Prohibits bulk marketing use. Private right of action with actual damages (minimum $2,500 liquidated), punitive damages, and attorney fees for knowing violations.',
 'PRIVACY', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '1994-09-13', '18 USC § 2721-2725', 'https://www.law.cornell.edu/uscode/text/18/2721', 1),

-- FTC Health Breach Notification Rule
('fed-priv-010', 'FED-PRIV-010', 'FTC Health Breach Notification Rule',
 'Vendors of personal health records (PHR) and related entities NOT covered by HIPAA must notify individuals and the FTC following a breach of unsecured personally identifiable health information. 60-day notification deadline for breaches affecting 500+ individuals (plus media notification). Individual notification for smaller breaches. Applies to health apps, fitness trackers, and other non-HIPAA health data holders. Updated 2023 to clarify scope.',
 'PRIVACY', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2009-09-24', '16 CFR Part 318', 'https://www.ftc.gov/legal-library/browse/rules/health-breach-notification-rule', 1),

-- ECPA
('fed-priv-011', 'FED-PRIV-011', 'Electronic Communications Privacy Act (ECPA)',
 'Prohibits unauthorized interception of electronic communications (Title I — Wiretap Act), unauthorized access to stored electronic communications (Title II — Stored Communications Act), and improper use of pen registers and trap-and-trace devices (Title III). Employers monitoring employee communications must comply: consent-based or business-extension exceptions. Private right of action for violations.',
 'PRIVACY', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '1986-10-21', '18 USC § 2510-2522 (Wiretap); § 2701-2712 (SCA); § 3121-3127', 'https://bja.ojp.gov/program/it/privacy-civil-liberties/authorities/statutes/1285', 1);


-- ============================================================
-- STATE COMPREHENSIVE PRIVACY LAWS
-- (States with enacted comprehensive consumer privacy laws)
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

-- California CCPA/CPRA already exists as ca-priv-001

-- Colorado Privacy Act
('co-priv-001', 'CO-PRIV-001', 'Colorado Privacy Act (CPA)',
 'Applies to businesses conducting business in Colorado or targeting Colorado residents AND control/process data of 100,000+ consumers/year OR derive revenue from selling data of 25,000+ consumers. Consumer rights: access, correction, deletion, data portability, opt-out of targeted advertising/sale/profiling. Requires privacy notices, data protection assessments for high-risk processing, and opt-out mechanisms including universal opt-out signals. Enforced by Colorado Attorney General. No private right of action.',
 'PRIVACY', 'STATE', 'CO',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2023-07-01', 'CRS § 6-1-1301 to 6-1-1313', 'https://coag.gov/resources/colorado-privacy-act/', 1),

-- Connecticut Data Privacy Act
('ct-priv-001', 'CT-PRIV-001', 'Connecticut Data Privacy Act (CTDPA)',
 'Applies to businesses conducting business in CT or targeting CT residents AND control/process data of 100,000+ consumers/year OR 25,000+ consumers with revenue from data sales exceeding 25% of gross revenue. Consumer rights: access, correction, deletion, data portability, opt-out of targeted advertising/sale/profiling. Must honor universal opt-out mechanisms by January 1, 2025. Enforced by Attorney General. No private right of action.',
 'PRIVACY', 'STATE', 'CT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2023-07-01', 'Conn. Gen. Stat. § 42-515 to 42-525 (SB 6, 2022)', 'https://portal.ct.gov/AG/Sections/Privacy/The-Connecticut-Data-Privacy-Act', 1),

-- Delaware Personal Data Privacy Act
('de-priv-001', 'DE-PRIV-001', 'Delaware Personal Data Privacy Act',
 'Applies to businesses conducting business in Delaware or targeting Delaware residents AND control/process data of 35,000+ consumers/year OR 10,000+ consumers with revenue from data sales exceeding 20% of gross revenue. Lower thresholds than most states. Consumer rights: access, correction, deletion, data portability, opt-out. Must recognize universal opt-out mechanisms. Effective January 1, 2025. Enforced by Attorney General.',
 'PRIVACY', 'STATE', 'DE',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2025-01-01', 'HB 154 (2023) — Delaware Personal Data Privacy Act', 'https://attorneygeneral.delaware.gov/', 1),

-- Florida Digital Bill of Rights
('fl-priv-001', 'FL-PRIV-001', 'Florida Digital Bill of Rights',
 'Applies to for-profit businesses with global annual revenue exceeding $1 billion AND meet additional criteria (50%+ revenue from digital advertising, operate app store with 250,000+ apps, or operate smart speaker with virtual assistant). Very high thresholds — targets Big Tech companies primarily. Consumer rights: access, deletion, correction, opt-out. Special protections for children. Effective July 1, 2024. Enforced by Attorney General. No private right of action.',
 'PRIVACY', 'STATE', 'FL',
 '["CORPORATION","LLC","S_CORP","PARTNERSHIP"]',
 '2024-07-01', 'Fla. Stat. § 501.701-501.721 (SB 262, 2023)', 'https://myfloridalegal.com/', 1),

-- Indiana Consumer Data Protection Act
('in-priv-001', 'IN-PRIV-001', 'Indiana Consumer Data Protection Act',
 'Applies to businesses conducting business in Indiana or targeting Indiana residents AND control/process data of 100,000+ consumers/year OR 25,000+ consumers with revenue from data sales exceeding 50% of gross revenue. Consumer rights: access, correction, deletion, data portability, opt-out of targeted advertising/sale/profiling. Effective January 1, 2026. Enforced by Attorney General. No private right of action.',
 'PRIVACY', 'STATE', 'IN',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2026-01-01', 'IC § 24-15-1 to 24-15-16 (SB 5, 2023)', 'https://www.in.gov/attorneygeneral/', 1),

-- Iowa Consumer Data Protection Act
('ia-priv-001', 'IA-PRIV-001', 'Iowa Consumer Data Protection Act',
 'Applies to businesses conducting business in Iowa or targeting Iowa residents AND control/process data of 100,000+ consumers/year OR 25,000+ consumers with revenue from data sales exceeding 50% of gross revenue. Consumer rights: access, deletion, data portability, opt-out of targeted advertising/sale. No right to correction (unusual). 90-day cure period. Effective January 1, 2025. Enforced by Attorney General.',
 'PRIVACY', 'STATE', 'IA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2025-01-01', 'Iowa Code § 715D (SF 262, 2023)', 'https://www.iowaattorneygeneral.gov/', 1),

-- Kentucky Consumer Data Protection Act
('ky-priv-001', 'KY-PRIV-001', 'Kentucky Consumer Data Privacy Act',
 'Applies to businesses conducting business in Kentucky or targeting Kentucky residents AND control/process data of 100,000+ consumers/year OR 25,000+ consumers with revenue from data sales exceeding 50% of gross revenue. Consumer rights: access, correction, deletion, data portability, opt-out. 30-day cure period. Effective January 1, 2026. Enforced by Attorney General. No private right of action.',
 'PRIVACY', 'STATE', 'KY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2026-01-01', 'KRS § 367.400-367.498 (HB 15, 2024)', 'https://ag.ky.gov/', 1),

-- Maryland Online Data Privacy Act
('md-priv-001', 'MD-PRIV-001', 'Maryland Online Data Privacy Act (MODPA)',
 'One of the strongest state privacy laws. Applies to businesses conducting business in Maryland or targeting Maryland residents AND control/process data of 35,000+ consumers/year OR 10,000+ consumers with revenue from data sales exceeding 20% of gross revenue. Unique provisions: prohibition on selling sensitive data, data minimization requirements, prohibition on targeted advertising to minors. Effective October 1, 2025. Enforced by Attorney General.',
 'PRIVACY', 'STATE', 'MD',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2025-10-01', 'Md. Code, Com. Law § 14-4601 to 14-4616 (SB 541, 2024)', 'https://www.marylandattorneygeneral.gov/', 1),

-- Minnesota Consumer Data Privacy Act
('mn-priv-001', 'MN-PRIV-001', 'Minnesota Consumer Data Privacy Act',
 'Applies to businesses conducting business in Minnesota or targeting Minnesota residents AND meet processing thresholds. Consumer rights: access, correction, deletion, data portability, opt-out. Includes right to know specific third parties receiving data. Requires data protection assessments. Special protections for minors. Effective July 31, 2025. Enforced by Attorney General.',
 'PRIVACY', 'STATE', 'MN',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2025-07-31', 'Minn. Stat. § 325O (HF 2309, 2024)', 'https://www.ag.state.mn.us/', 1),

-- Montana Consumer Data Privacy Act
('mt-priv-001', 'MT-PRIV-001', 'Montana Consumer Data Privacy Act',
 'Applies to businesses conducting business in Montana or targeting Montana residents AND control/process data of 50,000+ consumers/year OR 25,000+ consumers with revenue from data sales exceeding 25% of gross revenue. Lower threshold (50,000) reflects Montana''s small population. Consumer rights: access, correction, deletion, data portability, opt-out. Effective October 1, 2024. Enforced by Attorney General.',
 'PRIVACY', 'STATE', 'MT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-10-01', 'Mont. Code § 30-14-2801 to 30-14-2817 (SB 384, 2023)', 'https://dojmt.gov/', 1),

-- Nebraska Data Privacy Act
('ne-priv-001', 'NE-PRIV-001', 'Nebraska Data Privacy Act',
 'Applies to businesses conducting business in Nebraska or targeting Nebraska residents AND control/process data of 100,000+ consumers/year OR 25,000+ consumers with revenue from data sales exceeding 25% of gross revenue. Consumer rights: access, correction, deletion, data portability, opt-out. 30-day cure period. Effective January 1, 2025. Enforced by Attorney General.',
 'PRIVACY', 'STATE', 'NE',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2025-01-01', 'Neb. Rev. Stat. § 87-1101 (LB 1074, 2024)', 'https://ago.nebraska.gov/', 1),

-- New Hampshire Privacy Act
('nh-priv-001', 'NH-PRIV-001', 'New Hampshire Privacy Act',
 'Applies to businesses conducting business in New Hampshire or targeting New Hampshire residents AND control/process data of 35,000+ consumers/year OR 10,000+ consumers with revenue from data sales exceeding 25% of gross revenue. Consumer rights: access, correction, deletion, data portability, opt-out. Must recognize universal opt-out. Effective January 1, 2025. Enforced by Attorney General.',
 'PRIVACY', 'STATE', 'NH',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2025-01-01', 'RSA 507-H (SB 255, 2024)', 'https://www.doj.nh.gov/', 1),

-- New Jersey Data Privacy Act
('nj-priv-001', 'NJ-PRIV-001', 'New Jersey Data Privacy Act',
 'Applies to businesses conducting business in New Jersey or targeting New Jersey residents AND control/process data of 100,000+ consumers/year OR 25,000+ consumers with revenue from data sales exceeding 25% of gross revenue. Consumer rights: access, correction, deletion, data portability, opt-out. Special protections for minors under 17. Must recognize universal opt-out mechanisms. Effective January 15, 2025. Enforced by Attorney General.',
 'PRIVACY', 'STATE', 'NJ',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2025-01-15', 'N.J.S.A. 56:8-166 to 56:8-186 (S332, 2024)', 'https://www.nj.gov/oag/', 1),

-- Oregon Consumer Privacy Act
('or-priv-001', 'OR-PRIV-001', 'Oregon Consumer Privacy Act',
 'Applies to businesses conducting business in Oregon or targeting Oregon residents AND control/process data of 100,000+ consumers/year OR 25,000+ consumers with revenue from data sales exceeding 25% of gross revenue. Consumer rights: access, correction, deletion, data portability, opt-out, right to obtain list of third parties. No cure period (unusual — most states offer 30-60 days). Effective July 1, 2024. Enforced by Attorney General.',
 'PRIVACY', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-07-01', 'ORS § 646A.570-646A.604 (SB 619, 2023)', 'https://www.doj.state.or.us/', 1),

-- Tennessee Information Protection Act
('tn-priv-001', 'TN-PRIV-001', 'Tennessee Information Protection Act (TIPA)',
 'Applies to businesses conducting business in Tennessee or targeting Tennessee residents AND exceed $25 million in annual revenue AND control/process data of 175,000+ consumers/year OR 25,000+ consumers with revenue from data sales exceeding 50% of gross revenue. Revenue threshold is unique. Consumer rights: access, correction, deletion, data portability, opt-out. 60-day cure period. Effective July 1, 2025. Enforced by Attorney General.',
 'PRIVACY', 'STATE', 'TN',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2025-07-01', 'T.C.A. § 47-18-3201 to 47-18-3213 (HB 1181, 2023)', 'https://www.tn.gov/attorneygeneral.html', 1),

-- Texas Data Privacy and Security Act
('tx-priv-001', 'TX-PRIV-001', 'Texas Data Privacy and Security Act (TDPSA)',
 'Applies to businesses conducting business in Texas or targeting Texas residents. UNIQUE: no revenue or processing threshold — theoretically covers ALL businesses (though small business exemption exists for businesses classified as small under SBA standards). Consumer rights: access, correction, deletion, data portability, opt-out. 30-day cure period. Effective July 1, 2024. Enforced by Attorney General. Penalties up to $7,500 per violation.',
 'PRIVACY', 'STATE', 'TX',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-07-01', 'Tex. Bus. & Com. Code § 541 (HB 4, 2023)', 'https://www.texasattorneygeneral.gov/', 1),

-- Utah Consumer Privacy Act
('ut-priv-001', 'UT-PRIV-001', 'Utah Consumer Privacy Act (UCPA)',
 'Applies to businesses conducting business in Utah or targeting Utah residents AND have annual revenue of $25 million+ AND control/process data of 100,000+ consumers/year OR derive 50%+ of gross revenue from data sales of 25,000+ consumers. One of the most business-friendly state privacy laws. Consumer rights: access, deletion, data portability, opt-out. No right to correction. No data protection assessment requirement. Effective December 31, 2023. Enforced by Attorney General.',
 'PRIVACY', 'STATE', 'UT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2023-12-31', 'Utah Code § 13-61-101 to 13-61-404 (SB 227, 2022)', 'https://attorneygeneral.utah.gov/', 1),

-- Virginia Consumer Data Protection Act
('va-priv-001', 'VA-PRIV-001', 'Virginia Consumer Data Protection Act (VCDPA)',
 'Applies to businesses conducting business in Virginia or targeting Virginia residents AND control/process data of 100,000+ consumers/year OR 25,000+ consumers with revenue from data sales exceeding 50% of gross revenue. Consumer rights: access, correction, deletion, data portability, opt-out of targeted advertising/sale/profiling. Must conduct data protection assessments. No private right of action. Second comprehensive state privacy law (after CCPA). Effective January 1, 2023. Enforced by Attorney General.',
 'PRIVACY', 'STATE', 'VA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2023-01-01', 'Va. Code § 59.1-575 to 59.1-585', 'https://www.oag.state.va.us/consumer-protection/index.php/data-privacy', 1);


-- ============================================================
-- STATE DATA BREACH NOTIFICATION LAWS — ALL 50 STATES + DC
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('al-priv-001', 'AL-PRIV-001', 'Alabama Data Breach Notification Act',
 'Businesses must notify affected Alabama residents within 45 days of determining a breach of sensitive personally identifying information (name + SSN, driver''s license, financial account, medical info, health insurance info, email/password). Must notify AG if 1,000+ individuals affected. Must implement reasonable security measures. One of the last states to enact (2018).',
 'PRIVACY', 'STATE', 'AL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2018-06-01', 'Ala. Code § 8-38-1 to 8-38-12', 'https://www.alabamaag.gov/', 1),

('ak-priv-001', 'AK-PRIV-001', 'Alaska Personal Information Protection Act',
 'Businesses must notify affected Alaska residents in the most expedient time possible (no specific deadline) after determining a breach of personal information (name + SSN, driver''s license, financial account, passwords). Must notify AG. Must implement reasonable security measures. Disposal requirements for records containing personal information.',
 'PRIVACY', 'STATE', 'AK',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2009-07-01', 'Alaska Stat. § 45.48.010-45.48.090', 'https://law.alaska.gov/', 1),

('az-priv-001', 'AZ-PRIV-001', 'Arizona Data Breach Notification Law',
 'Businesses must notify affected Arizona residents within 45 days of determining a breach of personal information (name + SSN, driver''s license, financial account, health/insurance info, biometric data, passport, taxpayer ID). Must notify AG and credit reporting agencies if 1,000+ individuals affected. Penalties: up to $500,000 per breach ($10,000/day continued noncompliance).',
 'PRIVACY', 'STATE', 'AZ',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2018-08-03', 'A.R.S. § 18-551 to 18-552', 'https://www.azag.gov/consumer/data-breach', 1),

('ar-priv-001', 'AR-PRIV-001', 'Arkansas Personal Information Protection Act',
 'Businesses must notify affected Arkansas residents in the most expedient time reasonable (no specific deadline) after determining a breach. Covers: name + SSN, driver''s license, financial account, medical info, biometric data. Must notify AG if 1,000+ individuals. Must implement and maintain reasonable security procedures.',
 'PRIVACY', 'STATE', 'AR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2005-08-12', 'Ark. Code § 4-110-101 to 4-110-108', 'https://arkansasag.gov/', 1),

('ga-priv-001', 'GA-PRIV-001', 'Georgia Personal Identity Protection Act',
 'Information brokers and data collectors must notify affected Georgia residents in the most expedient time possible after determining a breach of personal information. Must notify AG, consumer reporting agencies, and major media if 10,000+ individuals affected. Covers: name + SSN, driver''s license, financial account, passwords, medical info.',
 'PRIVACY', 'STATE', 'GA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2005-05-05', 'O.C.G.A. § 10-1-910 to 10-1-912', 'https://law.georgia.gov/consumer-protection', 1),

('hi-priv-001', 'HI-PRIV-001', 'Hawaii Security Breach of Personal Information',
 'Businesses must notify affected Hawaii residents without unreasonable delay after determining a breach. Must notify Hawaii Office of Consumer Protection. Covers: name + SSN, driver''s license, financial account, health insurance. Hawaii also requires businesses to take reasonable measures to protect personal information.',
 'PRIVACY', 'STATE', 'HI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2007-01-01', 'HRS § 487N-1 to 487N-7', 'https://cca.hawaii.gov/ocp/', 1),

('id-priv-001', 'ID-PRIV-001', 'Idaho Data Breach Notification',
 'Businesses must notify affected Idaho residents in the most expedient time possible (not to exceed 60 days in most cases) after determining a breach. Must notify AG if 500+ individuals affected. Covers: name + SSN, driver''s license, financial account, medical info, health insurance, biometric data, email credentials.',
 'PRIVACY', 'STATE', 'ID',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2006-07-01', 'Idaho Code § 28-51-104 to 28-51-107', 'https://www.ag.idaho.gov/consumer-protection/', 1),

-- Illinois BIPA already covered in employment; adding breach notification
('il-priv-001', 'IL-PRIV-001', 'Illinois Personal Information Protection Act (PIPA)',
 'Businesses must notify affected Illinois residents in the most expedient time possible after determining a breach. Must notify AG if 500+ individuals affected. Covers: name + SSN, driver''s license, financial account, medical info, health insurance, biometric data, email credentials. Illinois also has BIPA (Biometric Information Privacy Act) — the strongest biometric privacy law in the US with private right of action.',
 'PRIVACY', 'STATE', 'IL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2006-06-27', '815 ILCS 530/1-530/50; 740 ILCS 14 (BIPA)', 'https://www.illinoisattorneygeneral.gov/', 1),

('ks-priv-001', 'KS-PRIV-001', 'Kansas Data Breach Notification',
 'Businesses must notify affected Kansas residents in the most expedient time possible after determining a breach of personal information. Must notify AG if 1,000+ individuals. Covers: name + SSN, driver''s license, financial account. Narrower definition of personal information than many states.',
 'PRIVACY', 'STATE', 'KS',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2006-07-01', 'K.S.A. § 50-7a01 to 50-7a04', 'https://ag.ks.gov/', 1),

('la-priv-001', 'LA-PRIV-001', 'Louisiana Database Security Breach Notification Law',
 'Businesses must notify affected Louisiana residents within 60 days of determining a breach. Must notify AG and consumer reporting agencies. Covers: name + SSN, driver''s license, financial account, biometric data, passport, medical info, health insurance. Requires reasonable security procedures. Penalties: up to $5,000/day for failure to notify.',
 'PRIVACY', 'STATE', 'LA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2006-01-01', 'La. R.S. 51:3071-3077', 'https://www.ag.state.la.us/', 1),

('mi-priv-001', 'MI-PRIV-001', 'Michigan Identity Theft Protection Act',
 'Businesses must notify affected Michigan residents without unreasonable delay (not to exceed 45 days in most cases) after determining a breach. Must notify AG, consumer reporting agencies, and credit bureaus. Covers: name + SSN, driver''s license, financial account, unique biometric data. Requires security measures to protect data.',
 'PRIVACY', 'STATE', 'MI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2007-07-02', 'MCL § 445.61-445.77', 'https://www.michigan.gov/ag/', 1),

('mo-priv-001', 'MO-PRIV-001', 'Missouri Data Breach Notification',
 'Businesses must notify affected Missouri residents without unreasonable delay after determining a breach. Must notify AG if 1,000+ individuals. Covers: name + SSN, driver''s license, financial account, medical info, health insurance. Missouri does not have a comprehensive consumer privacy law.',
 'PRIVACY', 'STATE', 'MO',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2009-08-28', 'Mo. Rev. Stat. § 407.1500', 'https://ago.mo.gov/', 1),

('ms-priv-001', 'MS-PRIV-001', 'Mississippi Data Breach Notification',
 'Businesses must notify affected Mississippi residents without unreasonable delay after determining a breach. Must notify AG if 250+ individuals (lower threshold than most states). Covers: name + SSN, driver''s license, financial account, biometric data, email credentials, health insurance. Passed in 2023.',
 'PRIVACY', 'STATE', 'MS',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2023-07-01', 'Miss. Code § 75-24-29 (HB 1012, 2023)', 'https://www.ago.state.ms.us/', 1),

('nc-priv-001', 'NC-PRIV-001', 'North Carolina Identity Theft Protection Act',
 'Businesses must notify affected North Carolina residents without unreasonable delay after determining a breach. Must notify AG (Consumer Protection Division) if 1,000+ individuals. Must also notify credit bureaus. Covers: name + SSN, driver''s license, financial account. Requires reasonable security procedures for personal information. Includes disposal requirements.',
 'PRIVACY', 'STATE', 'NC',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2005-12-01', 'N.C. Gen. Stat. § 75-61 to 75-66', 'https://ncdoj.gov/protecting-consumers/identity-theft/', 1),

('nd-priv-001', 'ND-PRIV-001', 'North Dakota Data Breach Notification',
 'Businesses must notify affected North Dakota residents in the most expedient time possible after determining a breach. Must notify AG if 250+ individuals (low threshold). Covers: name + SSN, driver''s license, financial account, employer-assigned ID with security code, date of birth. Includes expanded definition of personal information.',
 'PRIVACY', 'STATE', 'ND',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2005-06-01', 'N.D. Cent. Code § 51-30-01 to 51-30-07', 'https://attorneygeneral.nd.gov/', 1),

('ny-priv-001', 'NY-PRIV-001', 'New York SHIELD Act (Stop Hacks and Improve Electronic Data Security)',
 'Businesses holding private information of New York residents must implement reasonable data security safeguards (administrative, technical, physical). Must notify affected residents in the most expedient time possible after a breach. Must notify AG, DFS, and Division of State Police if 500+ individuals. Expanded definition of breach (includes unauthorized access, not just acquisition). One of the strongest breach notification + security laws. Penalties: up to $5,000 per violation or $20/person (capped at $250,000) for failure to notify.',
 'PRIVACY', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2020-03-21', 'N.Y. Gen. Bus. Law § 899-aa; N.Y. State Tech. Law § 208', 'https://ag.ny.gov/resources/organizations/data-breach-reporting', 1),

('oh-priv-001', 'OH-PRIV-001', 'Ohio Data Breach Notification',
 'Businesses must notify affected Ohio residents within 45 days of determining a breach. Must notify AG. Covers: name + SSN, driver''s license, financial account. Ohio also enacted the Data Protection Act (ORC § 1354) which provides an affirmative defense to data breach lawsuits for businesses that maintain a cybersecurity program conforming to an industry-recognized framework (NIST, ISO 27000, HIPAA, etc.).',
 'PRIVACY', 'STATE', 'OH',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2006-02-17', 'Ohio Rev. Code § 1349.19; § 1354 (Data Protection Act)', 'https://www.ohioattorneygeneral.gov/', 1),

('ok-priv-001', 'OK-PRIV-001', 'Oklahoma Security Breach Notification Act',
 'Businesses must notify affected Oklahoma residents without unreasonable delay after determining a breach. Must notify AG. Covers: name + SSN, driver''s license, financial account, health info. Must provide information about steps individuals can take to protect themselves. Oklahoma also has the Oklahoma Computer Crimes Act.',
 'PRIVACY', 'STATE', 'OK',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2006-11-01', '24 Okla. Stat. § 161-166', 'https://www.oag.ok.gov/', 1),

('pa-priv-001', 'PA-PRIV-001', 'Pennsylvania Breach of Personal Information Notification Act',
 'Businesses must notify affected Pennsylvania residents without unreasonable delay after determining a breach. Must notify AG if breach affects 1,000+ individuals. Covers: name + SSN, driver''s license, financial account. Must provide notification to consumer reporting agencies for large breaches. Must implement security procedures for personal information.',
 'PRIVACY', 'STATE', 'PA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2006-06-20', '73 P.S. § 2301-2329', 'https://www.attorneygeneral.gov/taking-action/data-breach/', 1),

('ri-priv-001', 'RI-PRIV-001', 'Rhode Island Identity Theft Protection Act',
 'Businesses must notify affected Rhode Island residents within 45 days of confirmation of a breach. Must notify AG. Must provide up to 12 months of credit monitoring if SSN compromised. Covers: name + SSN, driver''s license, financial account, medical/health insurance info, email credentials. Requires reasonable security measures.',
 'PRIVACY', 'STATE', 'RI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2016-07-02', 'R.I. Gen. Laws § 11-49.3-1 to 11-49.3-6', 'https://riag.ri.gov/', 1),

('sc-priv-001', 'SC-PRIV-001', 'South Carolina Insurance Data Security Act',
 'Insurers, agents, and other entities licensed by the SC Department of Insurance must implement a comprehensive cybersecurity program. Notify the Director of Insurance within 72 hours of a cybersecurity event. South Carolina was one of the first states to adopt NAIC Insurance Data Security Model Law. General businesses: breach notification under existing consumer protection laws.',
 'PRIVACY', 'STATE', 'SC',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2020-01-01', 'S.C. Code § 38-99-10 to 38-99-100; § 39-1-90 (general breach)', 'https://doi.sc.gov/', 1),

('sd-priv-001', 'SD-PRIV-001', 'South Dakota Data Breach Notification',
 'Businesses must notify affected South Dakota residents within 60 days of discovering a breach. Must notify AG if 250+ individuals (one of the lower thresholds). Covers: name + SSN, driver''s license, financial account, health info, biometric data. Must implement and maintain reasonable security procedures. One of the later states to enact (2018).',
 'PRIVACY', 'STATE', 'SD',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2018-07-01', 'SDCL § 22-40-19 to 22-40-26', 'https://consumer.sd.gov/', 1),

('wa-priv-001', 'WA-PRIV-001', 'Washington Data Breach Notification and My Health My Data Act',
 'Businesses must notify affected Washington residents within 30 days of discovering a breach (one of the shortest deadlines). Must notify AG if 500+ individuals. Covers expanded definition of personal information. Washington also enacted the My Health My Data Act (2023) — the strongest state health data privacy law, covering consumer health data outside HIPAA with private right of action. Geofencing around healthcare facilities prohibited.',
 'PRIVACY', 'STATE', 'WA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2020-03-01', 'RCW 19.255.010; RCW 19.373 (My Health My Data Act, 2023)', 'https://www.atg.wa.gov/', 1),

('wv-priv-001', 'WV-PRIV-001', 'West Virginia Data Breach Notification',
 'Businesses must notify affected West Virginia residents without unreasonable delay after determining a breach. Must notify AG and consumer reporting agencies. Covers: name + SSN, driver''s license, financial account. Must implement reasonable security practices.',
 'PRIVACY', 'STATE', 'WV',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2008-06-06', 'W.Va. Code § 46A-2A-101 to 46A-2A-105', 'https://ago.wv.gov/', 1),

('wi-priv-001', 'WI-PRIV-001', 'Wisconsin Data Breach Notification',
 'Businesses must notify affected Wisconsin residents within 45 days of determining a breach. Must notify consumer reporting agencies if breach affects 1,000+ individuals. Covers: name + SSN, driver''s license, financial account, DNA, biometric data. Must implement information security programs. Penalties: up to $100,000 per breach.',
 'PRIVACY', 'STATE', 'WI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2006-03-31', 'Wis. Stat. § 134.98', 'https://www.doj.state.wi.us/', 1),

('wy-priv-001', 'WY-PRIV-001', 'Wyoming Data Breach Notification',
 'Businesses must notify affected Wyoming residents in the most expedient time possible after determining a breach. Must notify AG. Covers: name + SSN, driver''s license, financial account, unique biometric or genetic data, health insurance. Wyoming has one of the most business-friendly regulatory environments but still requires breach notification.',
 'PRIVACY', 'STATE', 'WY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2007-07-01', 'Wyo. Stat. § 40-12-501 to 40-12-509', 'https://ag.wyo.gov/', 1);


-- ============================================================
-- BIOMETRIC PRIVACY LAWS (states with specific biometric statutes)
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

-- Illinois BIPA covered in employment section (il-emp-004)

('tx-priv-002', 'TX-PRIV-002', 'Texas Capture or Use of Biometric Identifier Act (CUBI)',
 'Businesses may not capture a biometric identifier (retina/iris scan, fingerprint, voiceprint, hand/face geometry) without informed consent. Must store, transmit, and protect biometrics using reasonable care. Must destroy within a reasonable time (not to exceed 1 year after purpose expires). No private right of action — AG enforcement only. Penalties: $25,000 per violation.',
 'PRIVACY', 'STATE', 'TX',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2009-09-01', 'Tex. Bus. & Com. Code § 503.001', 'https://www.texasattorneygeneral.gov/', 1),

('wa-priv-002', 'WA-PRIV-002', 'Washington Biometric Privacy Law',
 'Businesses may not enroll a biometric identifier (retina/iris scan, fingerprint, voiceprint, hand/face geometry, any other biological pattern) in a database for a commercial purpose without notice and consent. Must provide mechanism to prevent subsequent use. Reasonable security measures required. No private right of action — AG enforcement only.',
 'PRIVACY', 'STATE', 'WA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2017-07-23', 'RCW 19.375.010-19.375.900', 'https://www.atg.wa.gov/', 1);

-- Vernen Legal Compliance — Comprehensive Licensing Rules
-- The Complete Book: Business & Professional Licensing for All 50 States + DC + Federal
-- Created: March 17, 2026
--
-- Coverage:
--   Federal: FTC, BSA/AML, FDA, DEA, FCC, TTB, EPA, DOT, SEC, FINRA
--   State (all 50 + DC): General business license, contractor licensing,
--     professional licensing (CPA, attorney, engineer, real estate, insurance,
--     healthcare), food service, alcohol, cannabis (where legal), financial services

-- ============================================================
-- EXPANDED FEDERAL LICENSING RULES
-- (existing: FTC Act, BSA/AML — adding the rest)
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

-- FDA Registration
('fed-lic-003', 'FED-LIC-003', 'FDA Food Facility Registration',
 'Domestic and foreign facilities that manufacture, process, pack, or hold food for human or animal consumption in the US must register with the FDA. Registration must be renewed biennially (October 1-December 31 of even years). Must designate a US agent if foreign. Includes dietary supplements, infant formula, food additives. Exemptions: farms, restaurants, retail food establishments.',
 'LICENSING', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2003-12-12', '21 USC § 350d; 21 CFR Part 1 Subpart H', 'https://www.fda.gov/food/registration-food-facilities-and-other-submissions/food-facility-registration', 1),

('fed-lic-004', 'FED-LIC-004', 'FDA Drug Establishment Registration',
 'All domestic and foreign manufacturers, repackers, relabelers, and drug product salvagers of drugs (including biological products) must register establishments and list drugs with the FDA annually. Must file initially within 5 days of beginning operations and renew annually (October 1-December 31). NDC numbers required for all marketed drugs.',
 'LICENSING', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 NULL, '21 USC § 360; 21 CFR Part 207', 'https://www.fda.gov/drugs/drug-approvals-and-databases/drug-establishment-registration-and-drug-listing', 1),

('fed-lic-005', 'FED-LIC-005', 'FDA Medical Device Registration',
 'Establishments involved in the production and distribution of medical devices intended for commercial distribution in the US must register with the FDA and list their devices. Initial registration required before marketing. Annual renewal October 1-December 31. Annual registration fee (~$7,653 for FY2024). Foreign establishments must designate a US agent.',
 'LICENSING', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 NULL, '21 USC § 360; 21 CFR Part 807', 'https://www.fda.gov/medical-devices/how-study-and-market-your-device/device-registration-and-listing', 1),

-- DEA Registration
('fed-lic-006', 'FED-LIC-006', 'DEA Controlled Substance Registration',
 'Any person who manufactures, distributes, dispenses, imports, exports, or conducts research with controlled substances must obtain a DEA registration (DEA Form 224 for practitioners, Form 225 for manufacturers/distributors). Registration is specific to the location and activity. Must be renewed every 3 years (practitioners) or annually (manufacturers/distributors). Registrants must maintain records and submit to inspections.',
 'LICENSING', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '21 USC § 822-824; 21 CFR Part 1301', 'https://www.deadiversion.usdoj.gov/drugreg/', 1),

-- FCC Licensing
('fed-lic-007', 'FED-LIC-007', 'FCC Radio and Communications Licensing',
 'Businesses using radio frequencies (broadcasting, telecommunications, satellite, microwave, two-way radio beyond FRS/GMRS) must obtain appropriate FCC licenses. Broadcast licenses (radio/TV) require full application and public interest showing. Wireless licenses obtained through auction or secondary markets. Annual regulatory fees required. Unauthorized transmission: fines up to $100,000 per violation.',
 'LICENSING', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '47 USC § 301-303; 47 CFR Parts 1-101', 'https://www.fcc.gov/licensing-databases', 1),

-- TTB (Alcohol)
('fed-lic-008', 'FED-LIC-008', 'TTB Alcohol and Tobacco Permits',
 'Businesses manufacturing, importing, or wholesaling alcohol (distilled spirits, wine, beer) or tobacco products must obtain a federal permit from the Alcohol and Tobacco Tax and Trade Bureau (TTB). Brewers file a Brewer''s Notice; distillers and wineries require separate permits. Must also obtain a federal basic permit for importing/wholesaling. Bonds may be required. Subject to federal excise taxes.',
 'LICENSING', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '27 USC § 203-204; 26 USC § 5001-5692; 27 CFR Parts 1-31', 'https://www.ttb.gov/ponl/permits-online', 1),

-- EPA Permits
('fed-lic-009', 'FED-LIC-009', 'EPA Environmental Permits (NPDES, CAA, RCRA)',
 'Businesses with point-source discharges to waters require NPDES permits (Clean Water Act). Stationary sources of air pollutants require Title V operating permits (Clean Air Act). Generators, transporters, and facilities handling hazardous waste require EPA ID numbers and RCRA permits. Many permits are delegated to state agencies. Must maintain records, submit reports, and allow inspections.',
 'LICENSING', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '33 USC § 1342 (CWA/NPDES); 42 USC § 7661a (CAA Title V); 42 USC § 6925 (RCRA)', 'https://www.epa.gov/permits', 1),

-- DOT Operating Authority
('fed-lic-010', 'FED-LIC-010', 'DOT/FMCSA Motor Carrier Operating Authority',
 'Motor carriers transporting passengers or property in interstate commerce must obtain operating authority (MC number) from FMCSA. Must also have a USDOT number for safety identification. Requirements include: minimum insurance levels ($300,000-$5,000,000 depending on cargo), process agents in each state, Unified Carrier Registration, and compliance with Hours of Service, drug testing, and vehicle maintenance standards.',
 'LICENSING', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '49 USC § 13901-13908; 49 CFR Parts 365, 387, 390-399', 'https://www.fmcsa.dot.gov/registration', 1),

-- SEC/FINRA Registration
('fed-lic-011', 'FED-LIC-011', 'SEC/FINRA Broker-Dealer and Investment Adviser Registration',
 'Broker-dealers must register with the SEC (Form BD) and join FINRA. Investment advisers managing $100M+ must register with the SEC (Form ADV); under $100M register with state. Associated persons must pass qualification exams (Series 7, 63, 65, 66, etc.). Must maintain net capital requirements, customer protection rules, and anti-money laundering programs. Annual audited financial statements required.',
 'LICENSING', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 NULL, '15 USC § 78o (Exchange Act § 15); Investment Advisers Act § 203; FINRA Rules', 'https://www.sec.gov/education/smallbusiness/goingpublic/registrationbd', 1),

-- Federal Contractor Registration
('fed-lic-012', 'FED-LIC-012', 'Federal Contractor Registration (SAM.gov)',
 'Businesses seeking federal contracts must register in the System for Award Management (SAM.gov). Registration includes: DUNS/UEI number, NAICS codes, socioeconomic status (small business, woman-owned, veteran-owned, HUBZone, 8(a)), financial information, and certifications. Must renew annually. Required for grants, contracts, and other federal assistance. Small business certifications verified through SBA.',
 'LICENSING', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'FAR 4.1102; 2 CFR Part 25', 'https://sam.gov/', 1);


-- ============================================================
-- STATE LICENSING RULES — ALL 50 STATES + DC
-- ============================================================


-- ============================================================
-- ALABAMA
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('al-lic-001', 'AL-LIC-001', 'Alabama Business Privilege License',
 'All businesses operating in Alabama must obtain a business privilege license from the county probate judge''s office. Annual license tax based on gross receipts. Separate city business licenses also required by most municipalities. Must be renewed annually. Businesses must display license at place of business. Failure to obtain: Class C misdemeanor.',
 'LICENSING', 'STATE', 'AL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Ala. Code § 40-12-1 to 40-12-176', 'https://revenue.alabama.gov/business-license/', 1),

('al-lic-002', 'AL-LIC-002', 'Alabama Contractor Licensing',
 'General contractors performing work valued at $50,000+ must be licensed by the Alabama Licensing Board for General Contractors. Requires: financial statement, experience verification, trade exam, and business/law exam. License classifications by monetary limit ($50K-unlimited) and type (building, highway, municipal/utilities, residential). Subcontractors also require licensing. Annual renewal.',
 'LICENSING', 'STATE', 'AL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'Ala. Code § 34-8-1 to 34-8-27', 'https://genconbd.alabama.gov/', 1),

('al-lic-003', 'AL-LIC-003', 'Alabama Professional Licensing — Healthcare',
 'Healthcare providers must be licensed by their respective boards: physicians (Alabama Board of Medical Examiners), nurses (Alabama Board of Nursing), pharmacists (Alabama Board of Pharmacy), dentists (Alabama Board of Dental Examiners). Must meet education, examination, and continuing education requirements. Telemedicine providers serving AL patients must hold AL license or be registered.',
 'LICENSING', 'STATE', 'AL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Ala. Code § 34 (various chapters by profession)', 'https://www.albme.gov/', 1);


-- ============================================================
-- ALASKA
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ak-lic-001', 'AK-LIC-001', 'Alaska Business License',
 'All businesses operating in Alaska must obtain a state business license from the Department of Commerce, Community, and Economic Development ($50 biennial fee). Covers all commercial activities. Must be renewed every 2 years. Separate endorsements required for certain activities (e.g., tobacco, marijuana). Municipality licenses also required in Anchorage, Fairbanks, Juneau.',
 'LICENSING', 'STATE', 'AK',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Alaska Stat. § 43.70.020', 'https://www.commerce.alaska.gov/web/cbpl/businesslicensing.aspx', 1),

('ak-lic-002', 'AK-LIC-002', 'Alaska Contractor Licensing',
 'General contractors must register with the Department of Labor and Workforce Development. No state-level contractor licensing exam required (one of few states). Must carry workers'' compensation insurance and have a valid business license. Some municipalities (Anchorage, Juneau) have additional local contractor licensing and bonding requirements. Specialty trades (electrical, plumbing, mechanical) require separate state certifications.',
 'LICENSING', 'STATE', 'AK',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'Alaska Stat. § 18.60.700 (specialty); municipal codes', 'https://labor.alaska.gov/lss/bldg.htm', 1);


-- ============================================================
-- ARIZONA
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('az-lic-001', 'AZ-LIC-001', 'Arizona Transaction Privilege Tax License',
 'Arizona does not issue a general business license at the state level but requires a Transaction Privilege Tax (TPT) License for businesses selling taxable goods or services. Obtained from the Arizona Department of Revenue (no fee). Separate city TPT licenses may be required. Must be displayed at place of business. Annual renewal.',
 'LICENSING', 'STATE', 'AZ',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'A.R.S. § 42-5005', 'https://azdor.gov/transaction-privilege-tax/tpt-license', 1),

('az-lic-002', 'AZ-LIC-002', 'Arizona Contractor Licensing (ROC)',
 'All contractors performing work valued at $1,000+ (including labor and materials) must be licensed by the Arizona Registrar of Contractors (ROC). Dual licensing for residential and commercial. Requirements: trade exam, business management exam, workers'' comp/liability insurance, bond ($2,500-$15,000 based on classification). 150+ license classifications. Two-year renewal cycle.',
 'LICENSING', 'STATE', 'AZ',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'A.R.S. § 32-1101 to 32-1170', 'https://roc.az.gov/', 1),

('az-lic-003', 'AZ-LIC-003', 'Arizona Real Estate License',
 'Real estate salespersons and brokers must be licensed by the Arizona Department of Real Estate. Salesperson: 90 hours pre-licensing education, pass exam. Broker: 3 years active salesperson experience, 90 additional hours, pass broker exam. Must carry errors and omissions insurance. Renewal every 2 years with 24 hours continuing education.',
 'LICENSING', 'STATE', 'AZ',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'A.R.S. § 32-2101 to 32-2197', 'https://azre.gov/', 1);


-- ============================================================
-- ARKANSAS
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ar-lic-001', 'AR-LIC-001', 'Arkansas Business License',
 'Arkansas does not have a single state-level general business license. Businesses must register with the Department of Finance and Administration for sales tax permits. Local municipalities require separate business licenses. Professional/occupational licenses issued by individual boards. All businesses must register with the Secretary of State for entity purposes.',
 'LICENSING', 'STATE', 'AR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Various municipal ordinances; Ark. Code § 4-27 (UCC); § 26-52 (sales tax)', 'https://www.sos.arkansas.gov/business-commercial-services-bcs', 1),

('ar-lic-002', 'AR-LIC-002', 'Arkansas Contractor Licensing',
 'Contractors performing work valued at $20,000+ (commercial) or $2,000+ (residential) must be licensed by the Arkansas Contractors Licensing Board. Classifications: building, heavy/highway, mechanical, residential. Requirements: exam, financial statement, proof of insurance, bond. Specialty contractors (electrical, plumbing, HVAC) licensed separately. Biennial renewal.',
 'LICENSING', 'STATE', 'AR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'Ark. Code § 17-25-101 to 17-25-505', 'https://aclb.arkansas.gov/', 1);


-- ============================================================
-- CALIFORNIA
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ca-lic-002', 'CA-LIC-002', 'California Contractor License (CSLB)',
 'All contractors performing work valued at $500+ (labor and materials combined) must be licensed by the Contractors State License Board (CSLB). 44 specialty classifications (C-licenses) and 3 general classifications (A-General Engineering, B-General Building, C-specialty). Requirements: 4 years journey-level experience, trade exam, law/business exam, bond ($25,000), workers'' comp. Active renewal every 2 years. Penalties for unlicensed work: up to $15,000 fine and/or imprisonment.',
 'LICENSING', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'Cal. Bus. & Prof. Code § 7000-7191', 'https://www.cslb.ca.gov/', 1),

('ca-lic-003', 'CA-LIC-003', 'California Professional Engineering License',
 'Professional engineers must be licensed by the Board for Professional Engineers, Land Surveyors, and Geologists. Branches: civil, electrical, mechanical, chemical, industrial, fire protection, etc. Requirements: ABET-accredited degree, pass FE exam, 6 years experience (2 under a licensed PE), pass PE exam. Seal required on all documents. Biennial renewal with continuing education.',
 'LICENSING', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'Cal. Bus. & Prof. Code § 6700-6799', 'https://www.bpelsg.ca.gov/', 1),

('ca-lic-004', 'CA-LIC-004', 'California Real Estate License (DRE)',
 'Real estate salespersons and brokers must be licensed by the California Department of Real Estate. Salesperson: 3 college-level courses, pass exam. Broker: 8 courses, 2 years salesperson experience, pass broker exam. 4-year renewal with 45 hours continuing education. Must carry trust fund bond. CalBRE number must appear on all advertising and solicitation materials.',
 'LICENSING', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'Cal. Bus. & Prof. Code § 10000-10580', 'https://www.dre.ca.gov/', 1),

('ca-lic-005', 'CA-LIC-005', 'California Cannabis Business License',
 'Cannabis businesses (cultivation, manufacturing, distribution, retail, testing, microbusiness) must obtain a license from the Department of Cannabis Control (DCC). Requires local authorization first. Types include: Annual licenses (Type 1-13), Provisional licenses. Background checks, detailed business plans, environmental review, seed-to-sale tracking (METRC). Annual renewal. Cannot operate without both state AND local authorization.',
 'LICENSING', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2018-01-01', 'Cal. Bus. & Prof. Code § 26000-26260', 'https://cannabis.ca.gov/', 1),

('ca-lic-006', 'CA-LIC-006', 'California Insurance License (CDI)',
 'Insurance producers (agents and brokers) must be licensed by the California Department of Insurance. License types: fire, casualty, life-only, accident and health, surplus lines. Requirements: pre-licensing education (40-52 hours), pass exam, background check. Biennial renewal with 24 hours continuing education (including ethics). Must appoint with each insurance company they represent.',
 'LICENSING', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'Cal. Ins. Code § 1631-1809', 'https://www.insurance.ca.gov/0200-industry/0070-producer-licensing/', 1),

('ca-lic-007', 'CA-LIC-007', 'California CPA License',
 'Certified Public Accountants must be licensed by the California Board of Accountancy. Requirements: 150 semester hours education (including 24 in accounting, 24 in business-related subjects), pass Uniform CPA Exam, 12 months general accounting experience under a licensed CPA. Must complete 80 hours of continuing education every 2 years (including ethics, regulatory review, and fraud). Biennial renewal. Can perform attest engagements only with a valid license.',
 'LICENSING', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'Cal. Bus. & Prof. Code § 5000-5158', 'https://www.dca.ca.gov/cba/', 1),

('ca-lic-008', 'CA-LIC-008', 'California Alcohol Beverage License (ABC)',
 'Businesses selling or serving alcoholic beverages must obtain a license from the Department of Alcoholic Beverage Control (ABC). License types: Type 20 (off-sale beer/wine), Type 21 (off-sale general), Type 41 (on-sale beer/wine eating place), Type 47 (on-sale general eating place), Type 48 (on-sale general public premises). Fees: $850-$14,301+ depending on type. Conditional use permits may be required locally. Population-based caps on some license types.',
 'LICENSING', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'Cal. Bus. & Prof. Code § 23000-25762', 'https://www.abc.ca.gov/', 1);


-- ============================================================
-- COLORADO
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('co-lic-001', 'CO-LIC-001', 'Colorado Business License',
 'Colorado does not have a single state-level general business license. Local municipalities require business licenses (Denver, Colorado Springs, Boulder, etc.). State requires sales tax license (free, from Department of Revenue) if selling taxable goods/services. Professional/occupational licenses issued by the Department of Regulatory Agencies (DORA). More than 50 professions regulated.',
 'LICENSING', 'STATE', 'CO',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Various municipal codes; CRS § 12-20-101 et seq. (DORA)', 'https://www.colorado.gov/dora', 1),

('co-lic-002', 'CO-LIC-002', 'Colorado Contractor Licensing',
 'Colorado does not have statewide general contractor licensing. Licensing is handled at the local/municipal level — Denver, Colorado Springs, Aurora, and other cities have their own requirements. Electrical and plumbing licenses ARE issued at the state level by the Department of Regulatory Agencies. State electrical license required for electrical work statewide.',
 'LICENSING', 'STATE', 'CO',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'CRS § 12-115-101 (electrical); municipal codes', 'https://dpo.colorado.gov/Electrical', 1),

('co-lic-003', 'CO-LIC-003', 'Colorado Cannabis Licensing',
 'Colorado was the first state to legalize recreational cannabis (Amendment 64, 2012). Cannabis businesses must obtain a state license from the Marijuana Enforcement Division (MED) AND local license. Types: retail store, cultivation, manufacturing, testing, transporter. Requirements: background check, residency (2 years), financial disclosures, security plans. Seed-to-sale tracking (METRC). Annual renewal.',
 'LICENSING', 'STATE', 'CO',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2014-01-01', 'CRS § 44-10-101 to 44-10-1105', 'https://sbg.colorado.gov/med', 1);


-- ============================================================
-- CONNECTICUT
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ct-lic-001', 'CT-LIC-001', 'Connecticut Business License',
 'Connecticut does not require a single state-level general business license. Businesses must register with the Department of Revenue Services for tax purposes. Local municipalities require business licenses/zoning approvals. Professional and occupational licensing through the Department of Consumer Protection and individual boards. Over 100 professions regulated.',
 'LICENSING', 'STATE', 'CT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Various municipal ordinances; Conn. Gen. Stat. § 20 (professional licensing)', 'https://portal.ct.gov/DCP/License-Services-Division/License-Services', 1),

('ct-lic-002', 'CT-LIC-002', 'Connecticut Home Improvement Contractor Registration',
 'Home improvement contractors must register with the Department of Consumer Protection. No exam required but must provide proof of general liability insurance ($100,000/$300,000 minimum) and auto insurance. New home construction contractors must register separately. Registration number must appear on all contracts and advertisements. Annual renewal.',
 'LICENSING', 'STATE', 'CT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'Conn. Gen. Stat. § 20-418 to 20-432', 'https://portal.ct.gov/DCP/License-Services-Division/All-License-Applications/Home-Improvement-Contractor-Registration', 1);


-- ============================================================
-- DELAWARE
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('de-lic-001', 'DE-LIC-001', 'Delaware Business License',
 'All businesses operating in Delaware must obtain a Delaware Business License from the Division of Revenue ($75 annual fee). Required before commencing business. Separate licenses for specific activities: contractors, food service, alcohol, mortgage lending, etc. Must display license at place of business. Renewable annually by December 31.',
 'LICENSING', 'STATE', 'DE',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '30 Del. C. § 2301-2310', 'https://revenue.delaware.gov/business-license/', 1);


-- ============================================================
-- DISTRICT OF COLUMBIA
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('dc-lic-001', 'DC-LIC-001', 'DC Basic Business License (BBL)',
 'All businesses operating in DC must obtain a Basic Business License from the Department of Licensing and Consumer Protection (DLCP). Endorsements added based on activity type. Requires Certificate of Occupancy from zoning, Clean Hands certificate (no outstanding DC tax liabilities), and registered agent. Biennial renewal. Must display at place of business.',
 'LICENSING', 'STATE', 'DC',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'DC Code § 47-2801 to 47-2855', 'https://dlcp.dc.gov/service/obtain-basic-business-license', 1),

('dc-lic-002', 'DC-LIC-002', 'DC Professional Licensing',
 'DC regulates 90+ professions through the Department of Licensing and Consumer Protection and independent boards. Key professions: physicians (DC Board of Medicine), attorneys (DC Court of Appeals), real estate (DC Real Estate Commission), accountants (DC Board of Accountancy), contractors (DCRA), architects, engineers, nurses, pharmacists. Each has specific education, exam, and continuing education requirements.',
 'LICENSING', 'STATE', 'DC',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'DC Code § 47-2853.01 et seq.', 'https://dlcp.dc.gov/service/professional-licensing', 1);


-- ============================================================
-- FLORIDA
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('fl-lic-001', 'FL-LIC-001', 'Florida Business Tax Receipt (Local)',
 'Florida does not issue a state-level general business license. All counties and most municipalities require a Local Business Tax Receipt (formerly occupational license). Fees vary by jurisdiction and business type. Must be renewed annually. Separate state registrations for tax collection (Department of Revenue). State professional licenses through DBPR.',
 'LICENSING', 'STATE', 'FL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Fla. Stat. § 205.013-205.196', 'https://floridarevenue.com/taxes/taxesfees/Pages/local_option.aspx', 1),

('fl-lic-002', 'FL-LIC-002', 'Florida Contractor Licensing (DBPR/CILB)',
 'General, building, and residential contractors must be licensed by the Construction Industry Licensing Board (CILB) under the Department of Business and Professional Regulation (DBPR). Certified (statewide) or Registered (county). Requirements: 4 years experience, financial statement, trade exam, business exam. Specialty contractors (electrical, plumbing, HVAC, roofing) have separate licensing. Proof of insurance and workers'' comp required. Biennial renewal.',
 'LICENSING', 'STATE', 'FL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'Fla. Stat. § 489.101-489.553', 'https://www.myfloridalicense.com/intentions2.asp?chession=&catid=2', 1),

('fl-lic-003', 'FL-LIC-003', 'Florida Real Estate License',
 'Real estate sales associates and brokers must be licensed by the Florida Real Estate Commission (FREC) under DBPR. Sales associate: 63 hours pre-licensing, pass exam, background check. Broker: 2 years active license, 72 additional hours, pass broker exam. Biennial renewal with 14 hours continuing education. Must hold a valid license to receive commission.',
 'LICENSING', 'STATE', 'FL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'Fla. Stat. § 475.001-475.5018', 'https://www.myfloridalicense.com/', 1),

('fl-lic-004', 'FL-LIC-004', 'Florida Alcohol Beverage License',
 'Businesses selling alcoholic beverages must obtain a license from the Division of Alcoholic Beverages and Tobacco (DABT). License types: COP (consumption on premises), package (off-premises), manufacturer, distributor. Quota licenses (full liquor) are limited in number and transferable (can cost $50,000-$500,000+ on secondary market). Non-quota options available for restaurants (49%+ food revenue). Annual renewal.',
 'LICENSING', 'STATE', 'FL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'Fla. Stat. § 561.01-565.17', 'https://www.myfloridalicense.com/intentions2.asp?catid=4', 1);


-- ============================================================
-- GEORGIA
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ga-lic-001', 'GA-LIC-001', 'Georgia Business License (Local)',
 'Georgia does not require a state-level general business license. Counties and municipalities require a local business license/occupational tax certificate. Fees based on gross receipts or flat fee depending on jurisdiction. Professional licensing handled by the Georgia Secretary of State Professional Licensing Boards Division. Over 40 professions regulated.',
 'LICENSING', 'STATE', 'GA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'O.C.G.A. § 48-13-1 to 48-13-32 (occupation taxes)', 'https://sos.ga.gov/PLB', 1),

('ga-lic-002', 'GA-LIC-002', 'Georgia Contractor Licensing',
 'Georgia requires licensing for specific trades through the Construction Industry Licensing Board: low-voltage, electrical, plumbing, HVAC, utility. General contractors and building contractors are NOT licensed at the state level (local requirements only). Residential contractors performing work over $2,500 must register. Trade-specific exams and insurance required.',
 'LICENSING', 'STATE', 'GA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'O.C.G.A. § 43-14-1 to 43-14-16', 'https://sos.ga.gov/PLB/acrobat/Forms/38%20Applications/Contractor%20Apps.htm', 1);


-- ============================================================
-- HAWAII
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('hi-lic-001', 'HI-LIC-001', 'Hawaii General Excise Tax License',
 'All businesses operating in Hawaii must obtain a General Excise Tax (GET) license from the Department of Taxation ($20 one-time fee). Hawaii does not have a traditional sales tax — the GET is imposed on the gross receipts of all business activities. Rate: 4% (4.5% on Oahu). Must file GET returns monthly, quarterly, or semi-annually based on volume.',
 'LICENSING', 'STATE', 'HI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'HRS § 237-1 to 237-45', 'https://tax.hawaii.gov/geninfo/get/', 1),

('hi-lic-002', 'HI-LIC-002', 'Hawaii Contractor Licensing',
 'Contractors must be licensed by the Department of Commerce and Consumer Affairs (DCCA). Classifications: General Engineering (A), General Building (B), and 27 specialty classifications (C-1 through C-61). Requirements: 4 years experience, trade exam, financial statement, proof of insurance, workers'' comp. Bond required ($5,000-$25,000). Biennial renewal.',
 'LICENSING', 'STATE', 'HI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'HRS § 444-1 to 444-30', 'https://cca.hawaii.gov/pvl/boards/contractor/', 1);


-- ============================================================
-- IDAHO through WYOMING — Core licensing rules
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

-- IDAHO
('id-lic-001', 'ID-LIC-001', 'Idaho Business License',
 'Idaho does not require a state-level general business license. Local cities and counties require business licenses. State requires sales tax permit from Idaho State Tax Commission for businesses selling taxable goods/services. Professional licensing through the Idaho Bureau of Occupational Licenses. Regulated professions include: contractors, real estate, accounting, cosmetology, pharmacy.',
 'LICENSING', 'STATE', 'ID',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Various municipal ordinances; Idaho Code § 54 (professions)', 'https://ibol.idaho.gov/', 1),

('id-lic-002', 'ID-LIC-002', 'Idaho Contractor Registration (Public Works)',
 'Idaho requires contractors to register with the Idaho Contractors Board for public works projects over $50,000. Registration requires: workers'' comp insurance, public works liability insurance, and a performance bond. Private work does not require state licensing, but local jurisdictions may require licenses. Plumbing and HVAC require state licenses.',
 'LICENSING', 'STATE', 'ID',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'Idaho Code § 54-1901 to 54-1922; § 54-2601 (plumbing); § 54-5001 (HVAC)', 'https://dbs.idaho.gov/', 1),

-- ILLINOIS
('il-lic-001', 'IL-LIC-001', 'Illinois Business License',
 'Illinois does not require a state-level general business license. Local municipalities require business licenses (Chicago has one of the most complex systems). State requires registration with the Department of Revenue for sales tax. Professional licensing through the Illinois Department of Financial and Professional Regulation (IDFPR). Over 70 professions regulated.',
 'LICENSING', 'STATE', 'IL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Various municipal ordinances; 225 ILCS (professional regulation)', 'https://idfpr.illinois.gov/', 1),

('il-lic-002', 'IL-LIC-002', 'Illinois Contractor Licensing (Roofing Only at State Level)',
 'Illinois does not have comprehensive statewide general contractor licensing. Roofing contractors must register with the Illinois Department of Labor. Chicago requires general contractor licensing through the city. Plumbing, electrical, and other trades are licensed by their respective state boards. Specialty contractor licensing varies by municipality.',
 'LICENSING', 'STATE', 'IL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '225 ILCS 335 (roofing); Chicago Municipal Code § 4-36', 'https://www.chicago.gov/city/en/depts/bldgs.html', 1),

('il-lic-003', 'IL-LIC-003', 'Illinois Cannabis License',
 'Cannabis businesses must obtain a state license from the Illinois Department of Financial and Professional Regulation (adult-use) or Department of Agriculture (cultivation/infusion). License types: dispensary, cultivation, craft grower, infuser, transporter. Social equity applicant priority. Requirements: background check, financial disclosures, security plan, detailed operating plan. Annual renewal.',
 'LICENSING', 'STATE', 'IL',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 '2020-01-01', '410 ILCS 705 (Cannabis Regulation and Tax Act)', 'https://idfpr.illinois.gov/profs/adultusecan.asp', 1),

-- INDIANA
('in-lic-001', 'IN-LIC-001', 'Indiana Business License',
 'Indiana does not require a state-level general business license. Businesses must register with the Indiana Department of Revenue for tax purposes. Local municipalities may require business licenses. Professional licensing through the Indiana Professional Licensing Agency (PLA). Regulated professions: real estate, accounting, healthcare, plumbing, HVAC.',
 'LICENSING', 'STATE', 'IN',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Various municipal codes; IC § 25 (professions)', 'https://www.in.gov/pla/', 1),

-- IOWA
('ia-lic-001', 'IA-LIC-001', 'Iowa Business License',
 'Iowa does not require a state-level general business license. Local municipalities require licenses. State requires sales tax permit from the Iowa Department of Revenue. Professional licensing through Iowa Professional Licensing Bureau. Regulated professions: accountancy, architecture, cosmetology, engineering, land surveying, nursing home administration, real estate.',
 'LICENSING', 'STATE', 'IA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Various municipal codes; Iowa Code § 272C, 543B-543D', 'https://plb.iowa.gov/', 1),

-- KANSAS
('ks-lic-001', 'KS-LIC-001', 'Kansas Business License',
 'Kansas does not require a state-level general business license. Local municipalities require licenses. State requires sales tax registration from the Kansas Department of Revenue. Contractors are NOT licensed at the state level (one of few states). Local jurisdictions have varied requirements. Professional licensing through respective state boards.',
 'LICENSING', 'STATE', 'KS',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Various municipal codes; K.S.A. § 74 (boards and commissions)', 'https://www.ksrevenue.gov/', 1),

-- KENTUCKY
('ky-lic-001', 'KY-LIC-001', 'Kentucky Business License (Local)',
 'Kentucky does not require a state-level general business license but most cities and counties require an occupational license. Louisville Metro and Lexington-Fayette have comprehensive licensing systems. State professional licensing through various boards under the Kentucky Public Protection Cabinet. Regulated professions: contractors (local only), real estate, accountancy, healthcare.',
 'LICENSING', 'STATE', 'KY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'KRS § 198B (building code); various local ordinances', 'https://ppc.ky.gov/', 1),

-- LOUISIANA
('la-lic-001', 'LA-LIC-001', 'Louisiana Contractor Licensing',
 'Contractors performing work valued at $50,000+ must be licensed by the Louisiana State Licensing Board for Contractors. Classifications: building construction, highway/heavy/utility, residential. Requirements: trade exam, business and law exam, financial statement, workers'' comp, general liability insurance. Separate licensing for mechanical, electrical, and plumbing. Annual renewal.',
 'LICENSING', 'STATE', 'LA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'La. R.S. 37:2150-37:2192', 'https://www.lslbc.louisiana.gov/', 1),

-- MAINE
('me-lic-001', 'ME-LIC-001', 'Maine Business License',
 'Maine does not require a single state-level general business license. Local municipalities require business licenses and permits. Professional licensing through the Office of Professional and Occupational Regulation (OPOR). Regulated professions include: electricians, plumbers, foresters, real estate, architects, engineers, accountants. Cannabis licensing through the Office of Cannabis Policy.',
 'LICENSING', 'STATE', 'ME',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '32 M.R.S.A. (professional licensing); various municipal codes', 'https://www.maine.gov/pfr/professionallicensing/', 1),

-- MARYLAND
('md-lic-001', 'MD-LIC-001', 'Maryland Business License',
 'Maryland does not have a single state-level general business license. Businesses must register with the Comptroller for tax purposes. Local jurisdictions (especially Baltimore City, Montgomery County, Prince George''s County) require business licenses. State requires specific licenses for: alcohol, tobacco, home improvement, real estate, HVAC, plumbing, electrical. Over 30 professions regulated.',
 'LICENSING', 'STATE', 'MD',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Various municipal codes; Md. Code, Bus. Reg.', 'https://dat.maryland.gov/businesses', 1),

('md-lic-002', 'MD-LIC-002', 'Maryland Home Improvement Contractor License (MHIC)',
 'Home improvement contractors must be licensed by the Maryland Home Improvement Commission (MHIC). Requirements: $20,000 bond or equivalent, general liability insurance ($50,000 minimum), workers'' comp (if employees), and registration fee. Subcontractors also need MHIC license if contracting directly with homeowners. Must include MHIC number on all contracts and advertisements. Two-year renewal.',
 'LICENSING', 'STATE', 'MD',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'Md. Code, Bus. Reg. § 8-101 to 8-702', 'https://www.dllr.state.md.us/license/mhic/', 1),

-- MASSACHUSETTS
('ma-lic-001', 'MA-LIC-001', 'Massachusetts Business License',
 'Massachusetts requires a Business Certificate (DBA) filed with the city/town clerk for sole proprietors and partnerships. No state-level general business license. Local municipalities require various permits and licenses. Professional licensing through the Division of Professional Licensure (DPL) and individual boards. Over 30 professions regulated.',
 'LICENSING', 'STATE', 'MA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'MGL ch. 110, § 5 (DBA); various municipal codes', 'https://www.mass.gov/orgs/division-of-professional-licensure', 1),

('ma-lic-002', 'MA-LIC-002', 'Massachusetts Construction Supervisor License',
 'Anyone supervising construction of one- and two-family dwellings or buildings containing one to six units must hold a Construction Supervisor License from the Board of Building Regulations and Standards. License classes: Unrestricted, Restricted, Specialty (sheet metal, roofing, concrete, insulation). Requirements: 3 years experience, exam. Continuing education: 12 hours every 2 years.',
 'LICENSING', 'STATE', 'MA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'MGL ch. 142 (plumbing); 780 CMR (building code)', 'https://www.mass.gov/orgs/board-of-building-regulations-and-standards', 1),

('ma-lic-003', 'MA-LIC-003', 'Massachusetts Cannabis License',
 'Cannabis businesses must obtain a license from the Cannabis Control Commission (CCC). License types: retailer, cultivator, product manufacturer, microbusiness, delivery, social consumption. Priority for social equity and economic empowerment applicants. Requirements: host community agreement, background check, financial disclosures, detailed operational plans. Seed-to-sale tracking. Annual renewal.',
 'LICENSING', 'STATE', 'MA',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 '2018-11-20', 'MGL ch. 94G; 935 CMR 500-502', 'https://masscannabiscontrol.com/', 1),

-- MICHIGAN
('mi-lic-001', 'MI-LIC-001', 'Michigan Business License',
 'Michigan does not require a state-level general business license. Local municipalities require business licenses. Residential builders and maintenance/alteration contractors must be licensed by the Department of Licensing and Regulatory Affairs (LARA). Over 30 professions regulated by LARA. Cannabis licensing through the Cannabis Regulatory Agency.',
 'LICENSING', 'STATE', 'MI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'MCL § 339.101 et seq. (occupational code)', 'https://www.michigan.gov/lara', 1),

('mi-lic-002', 'MI-LIC-002', 'Michigan Residential Builder/Maintenance License',
 'Residential builders performing work on 1-2 family dwellings must be licensed by LARA. Maintenance and alteration contractors also require licensing. Requirements: 60 hours pre-licensing education, exam, workers'' comp insurance, builder''s trust fund escrow. Must provide a written contract to the homeowner for work over $600. Annual renewal.',
 'LICENSING', 'STATE', 'MI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'MCL § 339.2401-339.2412', 'https://www.michigan.gov/lara/bureau-list/bcc/divisions/licensing', 1),

-- MINNESOTA
('mn-lic-001', 'MN-LIC-001', 'Minnesota Business License',
 'Minnesota does not require a state-level general business license. Local municipalities require licenses. State requires sales tax registration with the Department of Revenue. Professional licensing through various boards. Contractors are NOT licensed at the state level for general construction (residential building contractors licensed under MN Stat. § 326B). Electrical and plumbing require state licenses.',
 'LICENSING', 'STATE', 'MN',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Minn. Stat. § 326B (building code); various municipal codes', 'https://www.dli.mn.gov/', 1),

-- MISSISSIPPI
('ms-lic-001', 'MS-LIC-001', 'Mississippi Contractor Licensing',
 'Contractors performing work valued at $50,000+ must be licensed by the Mississippi State Board of Contractors. Classifications: building, highway/heavy, residential. Requirements: exam, financial statement, proof of general liability insurance and workers'' comp. Specialty trades (electrical, plumbing) have separate licensing boards. Annual renewal.',
 'LICENSING', 'STATE', 'MS',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'Miss. Code § 31-3-1 to 31-3-25', 'https://www.msboc.us/', 1),

-- MISSOURI
('mo-lic-001', 'MO-LIC-001', 'Missouri Business License',
 'Missouri does not require a state-level general business license. Local municipalities and counties require business licenses. Kansas City and St. Louis have comprehensive licensing systems. State requires sales tax registration with the Department of Revenue. Professional licensing through the Division of Professional Registration. Over 40 professions regulated.',
 'LICENSING', 'STATE', 'MO',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Various municipal codes; Mo. Rev. Stat. § 324-346 (professions)', 'https://pr.mo.gov/', 1),

-- MONTANA
('mt-lic-001', 'MT-LIC-001', 'Montana Business License',
 'Montana does not require a state-level general business license. Local municipalities require licenses. State professional licensing through the Business Standards Division of the Department of Labor. Regulated professions: electricians, plumbers, architects, engineers, real estate, accountants, cosmetologists, contractors (public works).',
 'LICENSING', 'STATE', 'MT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Mont. Code § 37 (professions and occupations)', 'https://boards.bsd.dli.mt.gov/', 1),

-- NEBRASKA
('ne-lic-001', 'NE-LIC-001', 'Nebraska Contractor Licensing',
 'Nebraska requires contractor registration with the Department of Labor for public works. Separate licensing for: electrical (statewide through State Electrical Division), plumbing (statewide), HVAC (limited municipalities). General contractor licensing is NOT required at the state level. Most municipalities have their own contractor licensing requirements. Omaha and Lincoln have comprehensive systems.',
 'LICENSING', 'STATE', 'NE',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'Neb. Rev. Stat. § 81-829 (electrical); § 71-1101 (plumbing)', 'https://dol.nebraska.gov/', 1),

-- NEVADA
('nv-lic-001', 'NV-LIC-001', 'Nevada State Business License',
 'ALL businesses operating in Nevada must obtain a State Business License from the Secretary of State ($500 initial, $500 annual renewal for corporations; $200 for LLCs). Required before commencing business. Separate from local business licenses (Clark County/Las Vegas, Washoe County/Reno require their own). Professional licensing through various state boards.',
 'LICENSING', 'STATE', 'NV',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'NRS § 76.010-76.210', 'https://www.nvsos.gov/sos/businesses/state-business-license', 1),

('nv-lic-002', 'NV-LIC-002', 'Nevada Contractor License (NSCB)',
 'All contractors must be licensed by the Nevada State Contractors Board (NSCB). Classifications: A-General Engineering, B-General Building, C-Specialty (29 subtypes). Requirements: trade exam, law/business exam, financial statement, workers'' comp, general liability insurance ($100,000/$300,000 minimum), bond ($1,000-$500,000 based on license limit). Monetary limits from $50,000 to unlimited. Biennial renewal.',
 'LICENSING', 'STATE', 'NV',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'NRS § 624.010-624.740', 'https://www.nscb.nv.gov/', 1),

('nv-lic-003', 'NV-LIC-003', 'Nevada Cannabis Licensing',
 'Cannabis businesses must obtain a license from the Cannabis Compliance Board (CCB). License types: cultivation, production, distribution, retail dispensary, testing lab, consumption lounge. Requirements: background check, financial disclosures, detailed operational plan, security plan, local jurisdiction approval. Annual renewal. Seed-to-sale tracking (METRC).',
 'LICENSING', 'STATE', 'NV',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 '2017-07-01', 'NRS § 678A-678D', 'https://ccb.nv.gov/', 1),

-- NEW HAMPSHIRE
('nh-lic-001', 'NH-LIC-001', 'New Hampshire Business License',
 'New Hampshire does not require a state-level general business license. Local municipalities may require licenses. No state sales tax (one of 5 states). Professional licensing through the Office of Professional Licensure and Certification (OPLC). Key regulated professions: electricians, plumbers, real estate, nursing, pharmacy, medicine.',
 'LICENSING', 'STATE', 'NH',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'RSA 310-A (professions); various municipal codes', 'https://www.oplc.nh.gov/', 1),

-- NEW JERSEY
('nj-lic-001', 'NJ-LIC-001', 'New Jersey Business Registration Certificate',
 'All businesses must register with the New Jersey Division of Revenue and Enterprise Services and obtain a Business Registration Certificate (BRC). Required before commencing business. Includes sales tax registration, employer registration, and other state tax registrations. Must be posted at place of business. Must present BRC when applying for local permits.',
 'LICENSING', 'STATE', 'NJ',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.J.S.A. 54:32B-2(ee); Business Registration per P.L. 2001, c.116', 'https://www.nj.gov/treasury/revenue/busregcert.shtml', 1),

('nj-lic-002', 'NJ-LIC-002', 'New Jersey Home Improvement Contractor Registration',
 'Home improvement contractors must register with the Division of Consumer Affairs. New Jersey does NOT have statewide general contractor licensing. HIC registration requires: disclosure of owners/officers, proof of general liability insurance ($500,000 minimum), workers'' comp (if employees). Must provide written contract for work over $500. Registration number must appear on all contracts and advertisements. Biennial renewal.',
 'LICENSING', 'STATE', 'NJ',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'N.J.S.A. 56:8-136 to 56:8-152', 'https://www.njconsumeraffairs.gov/hic/', 1),

-- NEW MEXICO
('nm-lic-001', 'NM-LIC-001', 'New Mexico Contractor Licensing',
 'Contractors must be licensed by the New Mexico Construction Industries Division (CID). License types: General Building (GB-2, GB-98), General Engineering (GE-98), and specialty (GS, EE, MM, LP, etc.). Requirements: exam, 4 years experience, proof of insurance, financial statement. Different tiers by dollar value ($100K-unlimited). Workers'' comp required. Biennial renewal.',
 'LICENSING', 'STATE', 'NM',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'NMSA § 60-13-1 to 60-13-66', 'https://www.rld.nm.gov/construction-industries/', 1),

-- NEW YORK
('ny-lic-001', 'NY-LIC-001', 'New York Business License',
 'New York does not require a single state-level general business license. NYC has its own comprehensive licensing system through the Department of Consumer and Worker Protection (DCWP). Other municipalities require local licenses. State regulates professions through the Department of Education (Office of the Professions) for 50+ professions and the Department of State for real estate, notaries, etc.',
 'LICENSING', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'NY Education Law § 6500-8907 (professions); NYC Admin Code § 20', 'http://www.op.nysed.gov/', 1),

('ny-lic-002', 'NY-LIC-002', 'New York City Home Improvement Contractor License',
 'Home improvement contractors operating in NYC must be licensed by the Department of Consumer and Worker Protection. Requirements: $25,000 bond, proof of workers'' comp and disability insurance, background check. License number must appear on all contracts, advertising, and vehicles. Biennial renewal. Fines for unlicensed work: up to $5,000 first offense.',
 'LICENSING', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'NYC Admin Code § 20-386 to 20-401', 'https://www.nyc.gov/site/dca/businesses/license-checklist-home-improvement-contractor.page', 1),

('ny-lic-003', 'NY-LIC-003', 'New York Cannabis Licensing',
 'Cannabis businesses must obtain a license from the Office of Cannabis Management (OCM). License types: cultivator, processor, distributor, retail dispensary, microbusiness, delivery. Conditional Adult-Use Retail Dispensary (CAURD) licenses prioritize justice-involved and community-based applicants. Requirements: background check, detailed business plans, social equity criteria. Annual renewal.',
 'LICENSING', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 '2023-01-01', 'Cannabis Law (Cannabis Law Article 4); 9 NYCRR Part 116-128', 'https://cannabis.ny.gov/', 1),

-- NORTH CAROLINA
('nc-lic-001', 'NC-LIC-001', 'North Carolina Contractor Licensing',
 'General contractors performing work valued at $30,000+ must be licensed by the North Carolina Licensing Board for General Contractors. License types: Building, Highway/Heavy, Specialty (19 classifications). Requirements: exam, financial statement, proof of insurance. Plumbing, electrical, HVAC, and fire protection have separate state licensing. Annual renewal.',
 'LICENSING', 'STATE', 'NC',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'N.C. Gen. Stat. § 87-1 to 87-15.4', 'https://www.nclbgc.org/', 1),

-- NORTH DAKOTA
('nd-lic-001', 'ND-LIC-001', 'North Dakota Contractor Licensing',
 'Contractors performing work in North Dakota must hold a contractor''s license from the Secretary of State. Requirements: $100 registration fee, proof of workers'' comp, general liability insurance ($300,000 minimum), bond ($2,000-$25,000). Separate licensing for: electrical (ND State Electrical Board), plumbing (ND State Plumbing Board). Annual renewal.',
 'LICENSING', 'STATE', 'ND',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'N.D. Cent. Code § 43-07-01 to 43-07-30', 'https://www.nd.gov/sos/contractorslicenses/', 1),

-- OHIO
('oh-lic-001', 'OH-LIC-001', 'Ohio Business License',
 'Ohio does not require a state-level general business license. Local municipalities (especially Cleveland, Columbus, Cincinnati) require vendor''s licenses and business licenses. State requires a vendor''s license for businesses selling taxable goods/services. Professional licensing through the Ohio Department of Commerce and individual boards. Contractors: no state-level general contractor license (local only).',
 'LICENSING', 'STATE', 'OH',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Ohio Rev. Code § 5739.17 (vendor license); various municipal codes', 'https://com.ohio.gov/', 1),

-- OKLAHOMA
('ok-lic-001', 'OK-LIC-001', 'Oklahoma Contractor Licensing',
 'Oklahoma does not require a statewide general contractor license. Specific trades require licensing: electrical (Oklahoma Construction Industries Board), plumbing (Oklahoma Construction Industries Board), mechanical/HVAC. Some municipalities require contractor licensing. Roofing contractors must register with the Construction Industries Board. Home inspectors require licensing.',
 'LICENSING', 'STATE', 'OK',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '59 Okla. Stat. § 1850.1 (CIB); municipal codes', 'https://ok.gov/cib/', 1),

-- OREGON
('or-lic-001', 'OR-LIC-001', 'Oregon Construction Contractors Board (CCB) License',
 'All contractors must be licensed by the Oregon Construction Contractors Board (CCB). License types: General Contractor, Specialty Contractor, Developer, Limited. Requirements: surety bond ($20,000 for general, $15,000 for specialty, $10,000 for residential), workers'' comp insurance, general liability insurance. Exam NOT required (one of few states). Must carry CCB license number on all contracts and advertising. Biennial renewal.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'ORS § 701.005-701.995', 'https://www.oregon.gov/ccb/', 1),

-- PENNSYLVANIA
('pa-lic-001', 'PA-LIC-001', 'Pennsylvania Home Improvement Contractor Registration',
 'Home improvement contractors must register with the Pennsylvania Attorney General''s office under the Home Improvement Consumer Protection Act. Requirements: proof of general liability insurance ($50,000 minimum), workers'' comp (if employees), no disqualifying criminal history. Registration number must appear on all contracts and advertisements. No exam required. Biennial renewal. Unregistered work: $5,000 fine per violation.',
 'LICENSING', 'STATE', 'PA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '73 P.S. § 517.1-517.18 (HICPA)', 'https://www.attorneygeneral.gov/protect-yourself/home-improvement/', 1),

-- RHODE ISLAND
('ri-lic-001', 'RI-LIC-001', 'Rhode Island Contractor Registration',
 'All contractors performing work valued at $1,000+ must register with the Rhode Island Contractors'' Registration Board. Requirements: proof of workers'' comp and general liability insurance, surety bond ($10,000 for residential), disclosure of principals. Separate licensing for: electrical, plumbing, HVAC (state boards). Annual renewal. Penalties for unregistered work: fines up to $5,000.',
 'LICENSING', 'STATE', 'RI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'R.I. Gen. Laws § 5-65-1 to 5-65-17', 'https://crb.ri.gov/', 1),

-- SOUTH CAROLINA
('sc-lic-001', 'SC-LIC-001', 'South Carolina Contractor Licensing',
 'General and mechanical contractors must be licensed by the South Carolina Contractors'' Licensing Board (CLB). License types: General Contractor (Group 1-5 by dollar limit), Mechanical Contractor (plumbing, HVAC, fire protection), specialty. Requirements: 2 references, financial statement, exam, proof of insurance. Unlimited classification requires net worth over $50,000. Annual renewal.',
 'LICENSING', 'STATE', 'SC',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'S.C. Code § 40-11-10 to 40-11-430', 'https://llr.sc.gov/clb/', 1),

-- SOUTH DAKOTA
('sd-lic-001', 'SD-LIC-001', 'South Dakota Contractor Licensing',
 'South Dakota does NOT require statewide general contractor licensing (one of few states). Electrical and plumbing contractors require state licensing through the State Electrical Commission and Plumbing Commission respectively. Some municipalities (Sioux Falls, Rapid City) require local contractor licenses. Workers'' comp required if employees.',
 'LICENSING', 'STATE', 'SD',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'SDCL § 36-16 (electrical); § 36-25 (plumbing); municipal codes', 'https://dlr.sd.gov/', 1),

-- TENNESSEE
('tn-lic-001', 'TN-LIC-001', 'Tennessee Contractor Licensing',
 'Contractors performing work valued at $25,000+ must be licensed by the Tennessee Board for Licensing Contractors. License classifications: Building Construction (BC), Electrical (CE), Mechanical (CMC, CMP, CMS), Highway/Railroad/Airport (HRA), Municipal/Utility (MU), specialty. Requirements: exam, financial statement, proof of insurance, workers'' comp. Monetary limit classifications ($25K-unlimited). Annual renewal.',
 'LICENSING', 'STATE', 'TN',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'T.C.A. § 62-6-101 to 62-6-512', 'https://www.tn.gov/commerce/regboards/contractor-board.html', 1),

-- TEXAS
('tx-lic-001', 'TX-LIC-001', 'Texas Business License',
 'Texas does not require a state-level general business license. Local municipalities require business licenses (especially Dallas, Houston, San Antonio, Austin). State requires sales tax permit from the Comptroller (free). Texas does NOT license general contractors at the state level — one of the few states. Specific trades (electricians, plumbers, HVAC) are licensed by the Texas Department of Licensing and Regulation (TDLR).',
 'LICENSING', 'STATE', 'TX',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Various municipal codes; Tex. Occ. Code (trade licensing)', 'https://www.tdlr.texas.gov/', 1),

('tx-lic-002', 'TX-LIC-002', 'Texas Trade Licensing (Electricians, Plumbers, HVAC)',
 'Electricians, plumbers, and HVAC technicians must be licensed by the Texas Department of Licensing and Regulation (TDLR). Electricians: apprentice, journeyman, master, and electrical contractor licenses. Plumbers: apprentice, journeyman, tradesman, master licenses. HVAC: technician and contractor licenses. Requirements: experience, exam, insurance. All require continuing education for renewal.',
 'LICENSING', 'STATE', 'TX',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'Tex. Occ. Code § 1301 (plumbing), § 1302 (HVAC), § 1305 (electrical)', 'https://www.tdlr.texas.gov/electricians/electricians.htm', 1),

-- UTAH
('ut-lic-001', 'UT-LIC-001', 'Utah Contractor Licensing',
 'All contractors must be licensed by the Utah Division of Occupational and Professional Licensing (DOPL). Classifications: General Building (B-100), General Engineering (E-100), Residential/Small Commercial (R-100), and 50+ specialty (S-classifications). Requirements: exam, 2 years experience, financial statement, proof of insurance, bond. Continuing education: 6 hours every 2 years. Biennial renewal.',
 'LICENSING', 'STATE', 'UT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'Utah Code § 58-55-101 to 58-55-705', 'https://dopl.utah.gov/contractor/', 1),

-- VERMONT
('vt-lic-001', 'VT-LIC-001', 'Vermont Business License',
 'Vermont does not require a state-level general business license. Local municipalities may require zoning permits. Professional licensing through the Office of Professional Regulation (OPR). Vermont does NOT require statewide general contractor licensing. Electricians and plumbers require state licensing. Over 40 professions regulated by OPR.',
 'LICENSING', 'STATE', 'VT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '26 V.S.A. (professions and occupations); various municipal codes', 'https://sos.vermont.gov/opr/', 1),

-- VIRGINIA
('va-lic-001', 'VA-LIC-001', 'Virginia Contractor Licensing (DPOR)',
 'Contractors performing work valued at $1,000+ (residential) or $1,000+ (commercial) must be licensed by the Department of Professional and Occupational Regulation (DPOR). Three license classes: A (over $120,000), B ($10,000-$120,000), C ($1,000-$10,000). Requirements: exam (Class A and B), experience, financial statement, proof of insurance. 50+ specialty designations. Biennial renewal with continuing education.',
 'LICENSING', 'STATE', 'VA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'Va. Code § 54.1-1100 to 54.1-1121', 'https://www.dpor.virginia.gov/Boards/Contractors', 1),

-- WASHINGTON
('wa-lic-001', 'WA-LIC-001', 'Washington State Business License (UBI)',
 'ALL businesses operating in Washington must register for a Unified Business Identifier (UBI) through the Business Licensing Service ($90 for most). Includes state business license, tax registration, and city endorsements in one application. Some cities have additional licensing through the FileLocal portal. Must renew annually. Must display license at place of business.',
 'LICENSING', 'STATE', 'WA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'RCW 19.02.010-19.02.920', 'https://dor.wa.gov/open-business/apply-business-license', 1),

('wa-lic-002', 'WA-LIC-002', 'Washington Contractor Registration',
 'All contractors must be registered with the Department of Labor and Industries (L&I). Requirements: $12,000 bond (general) or $6,000 (specialty), workers'' comp industrial insurance, current UBI number. No exam required (one of few states). Must provide registration number on all bids, contracts, and advertising. Biennial renewal. Penalties for unregistered work: gross misdemeanor plus fines.',
 'LICENSING', 'STATE', 'WA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'RCW 18.27.010-18.27.990', 'https://lni.wa.gov/licensing-permits/contractors/', 1),

('wa-lic-003', 'WA-LIC-003', 'Washington Cannabis Licensing',
 'Cannabis businesses must obtain a license from the Washington State Liquor and Cannabis Board (LCB). License types: producer, processor, retailer. Requirements: background check, financial disclosures, proposed premises plan, local approval. Social equity program. Seed-to-sale tracking. Annual renewal. Cannot combine licenses (vertical integration limited).',
 'LICENSING', 'STATE', 'WA',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 '2014-07-08', 'RCW 69.50.325-69.50.395', 'https://lcb.wa.gov/mjlicense/marijuana-licensing', 1),

-- WEST VIRGINIA
('wv-lic-001', 'WV-LIC-001', 'West Virginia Contractor Licensing',
 'Contractors performing work valued at $2,500+ must be licensed by the West Virginia Division of Labor, Contractor Licensing Board. Requirements: exam, proof of workers'' comp, general liability insurance ($100,000/$300,000 minimum), bond ($5,000-$25,000). Separate licensing for electrical, plumbing, HVAC, and fire protection. Annual renewal.',
 'LICENSING', 'STATE', 'WV',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'W.Va. Code § 21-11-1 to 21-11-23', 'https://labor.wv.gov/Pages/contractor-licensing.aspx', 1),

-- WISCONSIN
('wi-lic-001', 'WI-LIC-001', 'Wisconsin Contractor Credentials',
 'Wisconsin requires credential registration for dwelling contractors (1-2 family) and dwelling contractors/remodelers with the Department of Safety and Professional Services. Requirements: financial responsibility (bond or proof of net worth), insurance, pass exam (for qualifiers). Separate licensing for: electricians, plumbers, HVAC. Commercial general contractors NOT licensed at state level. Biennial renewal.',
 'LICENSING', 'STATE', 'WI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'Wis. Stat. § 440.73 (dwelling contractors); § 101.87 (master electrician)', 'https://dsps.wi.gov/Pages/Professions/DwellingContractor/Default.aspx', 1),

-- WYOMING
('wy-lic-001', 'WY-LIC-001', 'Wyoming Business License',
 'Wyoming does not require a state-level general business license. Local municipalities may require business licenses. Wyoming does NOT license general contractors at the state level. Electricians and plumbers require state licensing through the Department of Fire Prevention and Electrical Safety. One of the most business-friendly regulatory environments.',
 'LICENSING', 'STATE', 'WY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Various municipal codes; Wyo. Stat. § 33 (professions)', 'https://sos.wyo.gov/Business/', 1);

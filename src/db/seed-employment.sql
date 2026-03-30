-- Vernen Legal Compliance — Comprehensive Employment Rules
-- The Complete Book: Employment Law for All 50 States + DC + Federal
-- Created: March 17, 2026
--
-- This is THE book. Every rule sourced to statute.
-- When the inspector shows up, this is what they carry.
--
-- Coverage:
--   Federal: FMLA, ADEA, Equal Pay Act, PDA, GINA, USERRA, WARN Act,
--            NLRA, EPPA, IRCA, PWFA, PUMP Act
--   State (all 50 + DC): Minimum wage, paid sick leave, paid family leave,
--            anti-discrimination, harassment training, posting requirements,
--            termination/WARN, ban-the-box, non-compete, wage payment timing,
--            break/meal periods, whistleblower, at-will exceptions

-- ============================================================
-- EXPANDED FEDERAL EMPLOYMENT RULES
-- (existing: ADA, OSHA, FLSA, Title VII — adding the rest)
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

-- FMLA
('fed-emp-005', 'FED-EMP-005', 'Family and Medical Leave Act (FMLA)',
 'Employers with 50+ employees within 75 miles must provide up to 12 weeks of unpaid, job-protected leave per year for: birth/adoption/foster placement of a child, serious health condition of employee or immediate family member, qualifying military exigency. 26 weeks for military caregiver leave. Employee must have worked 12 months and 1,250 hours. Must maintain group health benefits during leave.',
 'EMPLOYMENT', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '1993-08-05', '29 USC § 2601-2654; 29 CFR Part 825', 'https://www.dol.gov/agencies/whd/fmla', 1),

-- ADEA
('fed-emp-006', 'FED-EMP-006', 'Age Discrimination in Employment Act (ADEA)',
 'Employers with 20+ employees may not discriminate against individuals age 40 or older in hiring, firing, compensation, terms, conditions, or privileges of employment. Prohibits mandatory retirement (with narrow exceptions for bona fide executives and high policymakers). Waivers of ADEA claims must comply with Older Workers Benefit Protection Act requirements.',
 'EMPLOYMENT', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '1967-12-15', '29 USC § 621-634; 29 CFR Part 1625', 'https://www.eeoc.gov/statutes/age-discrimination-employment-act-1967', 1),

-- Equal Pay Act
('fed-emp-007', 'FED-EMP-007', 'Equal Pay Act of 1963',
 'Employers may not pay different wages to employees of the opposite sex for substantially equal work in the same establishment. Equal work requires equal skill, effort, and responsibility under similar working conditions. Exceptions for seniority, merit, quantity/quality of production, or a factor other than sex. No minimum employee threshold — applies to virtually all employers.',
 'EMPLOYMENT', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '1963-06-10', '29 USC § 206(d); 29 CFR Part 1620', 'https://www.eeoc.gov/statutes/equal-pay-act-1963', 1),

-- Pregnancy Discrimination Act
('fed-emp-008', 'FED-EMP-008', 'Pregnancy Discrimination Act (PDA)',
 'Amendment to Title VII prohibiting discrimination on the basis of pregnancy, childbirth, or related medical conditions. Employers with 15+ employees must treat pregnant employees the same as other employees similar in their ability or inability to work. Must provide same benefits, leave policies, and accommodations as for other temporarily disabled employees.',
 'EMPLOYMENT', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '1978-10-31', '42 USC § 2000e(k); 29 CFR Part 1604.10', 'https://www.eeoc.gov/laws/statutes/pregnancy-discrimination-act', 1),

-- Pregnant Workers Fairness Act
('fed-emp-009', 'FED-EMP-009', 'Pregnant Workers Fairness Act (PWFA)',
 'Employers with 15+ employees must provide reasonable accommodations for known limitations related to pregnancy, childbirth, or related medical conditions, unless the accommodation would cause an undue hardship. Cannot require employees to take leave if another reasonable accommodation is available. Effective June 27, 2023.',
 'EMPLOYMENT', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2023-06-27', 'Pub. L. 117-369; 42 USC § 2000gg; 29 CFR Part 1636', 'https://www.eeoc.gov/wysk/what-you-should-know-about-pregnant-workers-fairness-act', 1),

-- PUMP Act
('fed-emp-010', 'FED-EMP-010', 'PUMP for Nursing Mothers Act',
 'Employers must provide reasonable break time and a private, non-bathroom space for nursing employees to express breast milk for up to one year after childbirth. Applies to all employees covered by the FLSA, not just hourly workers. Employers with fewer than 50 employees may claim undue hardship exemption. Effective December 29, 2022.',
 'EMPLOYMENT', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2022-12-29', '29 USC § 218d; Pub. L. 117-328', 'https://www.dol.gov/agencies/whd/pump-at-work', 1),

-- GINA
('fed-emp-011', 'FED-EMP-011', 'Genetic Information Nondiscrimination Act (GINA)',
 'Employers with 15+ employees may not discriminate based on genetic information (including family medical history) in hiring, firing, compensation, or other employment decisions. Prohibits requesting, requiring, or purchasing genetic information about employees or their family members, with narrow exceptions. Title II covers employment; Title I covers health insurance.',
 'EMPLOYMENT', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2008-05-21', '42 USC § 2000ff; 29 CFR Part 1635', 'https://www.eeoc.gov/statutes/genetic-information-nondiscrimination-act-2008', 1),

-- USERRA
('fed-emp-012', 'FED-EMP-012', 'Uniformed Services Employment and Reemployment Rights Act (USERRA)',
 'All employers regardless of size must reemploy returning service members in the position they would have held had they remained continuously employed (escalator principle). Provides up to 5 years cumulative service protection. Returning members may not be discharged without cause for 180 days (service 31-180 days) or 1 year (service 181+ days). Must maintain health plan coverage for up to 24 months.',
 'EMPLOYMENT', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '1994-10-13', '38 USC § 4301-4335; 20 CFR Part 1002', 'https://www.dol.gov/agencies/vets/programs/userra', 1),

-- WARN Act
('fed-emp-013', 'FED-EMP-013', 'Worker Adjustment and Retraining Notification Act (WARN)',
 'Employers with 100+ full-time employees must provide 60 calendar days advance written notice before plant closings (50+ employees at a single site) or mass layoffs (500+ employees, or 50-499 employees if they constitute 33% of the active workforce at that site). Notice must go to affected workers, state dislocated worker unit, and local government. Penalties: back pay and benefits for each day of violation.',
 'EMPLOYMENT', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 '1989-02-04', '29 USC § 2101-2109; 20 CFR Part 639', 'https://www.dol.gov/agencies/eta/layoffs/warn', 1),

-- NLRA
('fed-emp-014', 'FED-EMP-014', 'National Labor Relations Act (NLRA)',
 'Protects the rights of employees to organize, form or join unions, bargain collectively, and engage in concerted activity for mutual aid or protection. Also protects the right to refrain from such activities. Employers may not interfere with, restrain, or coerce employees in the exercise of these rights. Applies to most private-sector employers. Does not cover government employees, agricultural workers, domestic workers, or independent contractors.',
 'EMPLOYMENT', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '1935-07-05', '29 USC § 151-169', 'https://www.nlrb.gov/guidance/key-reference-materials/national-labor-relations-act', 1),

-- EPPA
('fed-emp-015', 'FED-EMP-015', 'Employee Polygraph Protection Act (EPPA)',
 'Prohibits most private employers from using lie detector tests for pre-employment screening or during employment. Exceptions: federal/state/local government employers, security service firms, pharmaceutical manufacturers/distributors (with restrictions), and ongoing investigations involving economic loss. Must provide written notice of rights.',
 'EMPLOYMENT', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '1988-12-27', '29 USC § 2001-2009; 29 CFR Part 801', 'https://www.dol.gov/agencies/whd/polygraph', 1),

-- IRCA
('fed-emp-016', 'FED-EMP-016', 'Immigration Reform and Control Act (IRCA) — Form I-9 Verification',
 'All employers must verify the identity and employment authorization of every person hired after November 6, 1986 by completing Form I-9 within 3 business days of hire. Must examine acceptable documents. Must retain I-9 for 3 years after hire or 1 year after termination, whichever is later. E-Verify mandatory for federal contractors and in some states. Anti-discrimination provisions prohibit unfair documentary practices.',
 'EMPLOYMENT', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '1986-11-06', '8 USC § 1324a-1324c; 8 CFR Part 274a', 'https://www.uscis.gov/i-9', 1),

-- Federal minimum wage poster
('fed-emp-017', 'FED-EMP-017', 'Federal Workplace Posting Requirements',
 'Employers must display required federal workplace posters where employees can readily see them. Required posters include: FLSA Minimum Wage, OSHA Job Safety and Health, FMLA (50+ employees), EEO (15+ employees), EPPA, USERRA, and E-Verify (if enrolled). Willful violations of poster requirements can result in fines up to $15,080 per violation.',
 'EMPLOYMENT', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '29 USC § 211(c); 29 CFR Part 516; OSHA 29 CFR 1903.2', 'https://www.dol.gov/agencies/whd/posters', 1),

-- EEO-1 Reporting
('fed-emp-018', 'FED-EMP-018', 'EEO-1 Component 1 Report',
 'Private employers with 100+ employees (or federal contractors/subcontractors with 50+ employees and contracts of $50,000+) must annually file the EEO-1 Component 1 report with the EEOC, reporting workforce demographics by job category, race, ethnicity, and sex. Data collected from a single pay period. Failure to file may result in compulsory process.',
 'EMPLOYMENT', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, '42 USC § 2000e-8; 29 CFR Part 1602', 'https://www.eeoc.gov/employers/eeo-1-data-collection', 1),

-- New hire reporting
('fed-emp-019', 'FED-EMP-019', 'Federal New Hire Reporting',
 'All employers must report newly hired and re-hired employees to their state''s State Directory of New Hires within 20 days of hire (or by the next regular payroll date if sooner). Report includes: employee name, SSN, address; employer name, EIN, address. Required by the Personal Responsibility and Work Opportunity Reconciliation Act of 1996 for child support enforcement.',
 'EMPLOYMENT', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '1996-08-22', '42 USC § 653a; State-specific reporting portals', 'https://www.acf.hhs.gov/css/employers/employer-responsibilities/new-hire-reporting', 1);


-- ============================================================
-- STATE EMPLOYMENT RULES — ALL 50 STATES + DC
-- Comprehensive coverage per state
-- ============================================================


-- ============================================================
-- ALABAMA
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('al-emp-001', 'AL-EMP-001', 'Alabama Minimum Wage',
 'Alabama has no state minimum wage law. Federal minimum wage of $7.25/hour applies. Alabama passed Act 2016-18 preempting local governments from establishing minimum wage rates different from state or federal law.',
 'EMPLOYMENT', 'STATE', 'AL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Ala. Code § 25-7-41 (preemption); 29 USC § 206 (federal)', 'https://www.dol.gov/agencies/whd/minimum-wage/state', 1),

('al-emp-002', 'AL-EMP-002', 'Alabama Anti-Discrimination — Age Only',
 'Alabama Age Discrimination in Employment Act prohibits age discrimination by employers with 20+ employees against persons age 40+. Alabama has no comprehensive state civil rights employment act; federal Title VII and ADA provide the primary protections. Limited protections exist under common law wrongful discharge.',
 'EMPLOYMENT', 'STATE', 'AL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Ala. Code § 25-1-20 to 25-1-30', 'https://labor.alabama.gov/', 1),

('al-emp-003', 'AL-EMP-003', 'Alabama Child Labor Law',
 'Minors under 18 require a work permit issued by the issuing officer of the school district. Minors 14-15: limited to 3 hours/school day, 8 hours/non-school day, 18 hours/school week, 40 hours/non-school week. Prohibited occupations for minors include mining, manufacturing explosives, and operating power-driven machinery. No work between 7 PM-7 AM (9 PM June 1-Labor Day).',
 'EMPLOYMENT', 'STATE', 'AL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Ala. Code § 25-8-1 to 25-8-78', 'https://labor.alabama.gov/inspections/child_labor.aspx', 1),

('al-emp-004', 'AL-EMP-004', 'Alabama Workplace Safety — State Plan',
 'Alabama does not operate a state OSHA plan; federal OSHA has exclusive jurisdiction over private-sector workplace safety. Employers must comply with all federal OSHA standards. Alabama does have a voluntary on-site consultation program through the Alabama Department of Labor.',
 'EMPLOYMENT', 'STATE', 'AL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Federal OSHA jurisdiction; Ala. Code § 25-1-1', 'https://labor.alabama.gov/inspections/safety_health.aspx', 1);


-- ============================================================
-- ALASKA
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ak-emp-001', 'AK-EMP-001', 'Alaska Minimum Wage',
 'Alaska minimum wage is $11.73/hour (2024), indexed to CPI annually. Higher than federal. Employers may pay employees under 18 at 50 cents less than the minimum wage during the first 90 days of employment. No tip credit allowed — tipped employees must receive full minimum wage.',
 'EMPLOYMENT', 'STATE', 'AK',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'Alaska Stat. § 23.10.065', 'https://labor.alaska.gov/lss/whact.htm', 1),

('ak-emp-002', 'AK-EMP-002', 'Alaska Overtime Requirements',
 'Alaska requires overtime at 1.5x regular rate for hours over 40/week AND over 8/day, whichever results in greater pay. One of few states with daily overtime. Exemptions mirror federal FLSA exemptions for executive, administrative, professional, and outside sales employees.',
 'EMPLOYMENT', 'STATE', 'AK',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Alaska Stat. § 23.10.060', 'https://labor.alaska.gov/lss/whact.htm', 1),

('ak-emp-003', 'AK-EMP-003', 'Alaska Paid Sick Leave',
 'Effective July 1, 2025, employers with 15+ employees must provide up to 56 hours of paid sick leave per year. Employers with fewer than 15 employees must provide up to 40 hours. Accrual at 1 hour per 30 hours worked. Usable for employee or family member illness, domestic violence, sexual assault, or stalking. Ballot Measure 1 (2024).',
 'EMPLOYMENT', 'STATE', 'AK',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2025-07-01', 'Alaska Ballot Measure 1 (2024); Alaska Stat. § 23.10.400', 'https://labor.alaska.gov/', 1),

('ak-emp-004', 'AK-EMP-004', 'Alaska Human Rights Law — Employment Discrimination',
 'Employers with 1+ employees may not discriminate based on race, religion, color, national origin, age, sex, physical or mental disability, marital status, changes in marital status, pregnancy, or parenthood. Broader than federal law: covers employers with 1+ employees (vs. 15+ for federal) and includes marital status and parenthood. Administered by the Alaska State Commission for Human Rights.',
 'EMPLOYMENT', 'STATE', 'AK',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Alaska Stat. § 18.80.220', 'https://humanrights.alaska.gov/', 1),

('ak-emp-005', 'AK-EMP-005', 'Alaska OSHA — State Plan',
 'Alaska operates an OSHA-approved state plan (AKOSH) covering both private and public sector workers. Employers must comply with Alaska OSH standards, which must be at least as effective as federal OSHA. Alaska adopts most federal standards but has additional state-specific requirements. Administered by the Alaska Department of Labor and Workforce Development.',
 'EMPLOYMENT', 'STATE', 'AK',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Alaska Stat. § 18.60.010-18.60.105', 'https://labor.alaska.gov/lss/oshhome.htm', 1);


-- ============================================================
-- ARIZONA
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('az-emp-001', 'AZ-EMP-001', 'Arizona Minimum Wage',
 'Arizona minimum wage is $14.35/hour (2024), indexed to CPI annually (Proposition 206). Tipped employees: $11.35/hour with a $3.00 tip credit. Employers with fewer than 15 employees were previously exempt but the exemption has expired. Small business exemptions do not apply.',
 'EMPLOYMENT', 'STATE', 'AZ',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'A.R.S. § 23-363', 'https://www.azica.gov/labor-minimum-wage-main-page', 1),

('az-emp-002', 'AZ-EMP-002', 'Arizona Paid Sick Leave (Fair Wages and Healthy Families Act)',
 'All employers must provide paid sick leave. Employers with 15+ employees: up to 40 hours/year. Employers with fewer than 15: up to 24 hours/year. Accrual at 1 hour per 30 hours worked, beginning at date of hire. Usable after 90 days of employment. Covers employee/family member illness, public health emergency, domestic violence, sexual violence, abuse, or stalking.',
 'EMPLOYMENT', 'STATE', 'AZ',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2017-07-01', 'A.R.S. § 23-371 to 23-381 (Prop 206)', 'https://www.azica.gov/labor-paid-sick-leave-background', 1),

('az-emp-003', 'AZ-EMP-003', 'Arizona Employment Discrimination (Arizona Civil Rights Act)',
 'Employers with 15+ employees may not discriminate based on race, color, religion, sex, national origin, age (40+), or disability (physical/mental). The Arizona Civil Rights Act mirrors federal Title VII and ADA. Filed with the Arizona Attorney General Civil Rights Division. Sexual orientation and gender identity: not expressly covered by state law; some municipalities provide local protections.',
 'EMPLOYMENT', 'STATE', 'AZ',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'A.R.S. § 41-1461 to 41-1468', 'https://www.azag.gov/civil-rights', 1),

('az-emp-004', 'AZ-EMP-004', 'Arizona E-Verify Mandate',
 'ALL Arizona employers must use the federal E-Verify system to verify employment eligibility of new hires. Arizona is one of the strictest states — the Legal Arizona Workers Act (2008) mandates E-Verify for all employers, not just federal contractors. Violations can result in probation, suspension, or permanent revocation of business license.',
 'EMPLOYMENT', 'STATE', 'AZ',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2008-01-01', 'A.R.S. § 23-211 to 23-214 (Legal Arizona Workers Act)', 'https://www.azag.gov/consumer/e-verify', 1),

('az-emp-005', 'AZ-EMP-005', 'Arizona Wage Payment — Payday Requirements',
 'Employers must pay employees at least twice per month, no more than 16 days apart. Final wages due within 7 working days of termination or the next regular payday, whichever is sooner. Discharged employees must be paid within 7 working days or the end of the next regular pay period. Unpaid wages accrue treble damages.',
 'EMPLOYMENT', 'STATE', 'AZ',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'A.R.S. § 23-350 to 23-365', 'https://www.azica.gov/labor-wage-payment-background', 1);


-- ============================================================
-- ARKANSAS
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ar-emp-001', 'AR-EMP-001', 'Arkansas Minimum Wage',
 'Arkansas minimum wage is $11.00/hour (effective 2021 per Issue 5, 2018). Exemptions: employers with fewer than 4 employees, tipped employees ($2.63/hour with tip credit to reach $11.00). Federal minimum wage applies to FLSA-covered employers where state exemption applies. State minimum indexed by ballot measure, not CPI.',
 'EMPLOYMENT', 'STATE', 'AR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2021-01-01', 'Ark. Code § 11-4-210; Issue 5 (2018)', 'https://www.labor.arkansas.gov/labor/labor-standards/minimum-wage-information/', 1),

('ar-emp-002', 'AR-EMP-002', 'Arkansas Civil Rights Act — Employment Discrimination',
 'Employers with 9+ employees may not discriminate based on race, religion, national origin, sex, or disability. Broader coverage than federal in some areas (9 vs. 15 employee threshold). Does not explicitly cover sexual orientation or gender identity at state level. Claims filed with the Arkansas Department of Labor or EEOC. Remedies include back pay, reinstatement, and compensatory damages.',
 'EMPLOYMENT', 'STATE', 'AR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Ark. Code § 16-123-101 to 16-123-108', 'https://www.labor.arkansas.gov/', 1),

('ar-emp-003', 'AR-EMP-003', 'Arkansas Wage Payment Requirements',
 'Employers must pay employees at least semi-monthly. Upon discharge, all wages earned are due by the next regular payday. Employees who quit must be paid by the next regular payday. Employers who fail to pay wages on time are liable for the amount of wages due plus an equal amount as liquidated damages.',
 'EMPLOYMENT', 'STATE', 'AR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Ark. Code § 11-4-401 to 11-4-414', 'https://www.labor.arkansas.gov/labor/labor-standards/', 1);


-- ============================================================
-- CALIFORNIA (expanding existing CA-EMP-001)
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ca-emp-002', 'CA-EMP-002', 'California Minimum Wage',
 'California minimum wage is $16.00/hour (2024) for all employers regardless of size. Higher rates in some cities (e.g., San Francisco $18.67, Los Angeles $17.28). Fast food workers: $20.00/hour (AB 1228). Healthcare workers: $18-$23/hour phased schedule (SB 525). No tip credit allowed. Must pay overtime at 1.5x after 8 hours/day or 40 hours/week; 2x after 12 hours/day.',
 'EMPLOYMENT', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'Cal. Labor Code § 1182.12; AB 1228; SB 525', 'https://www.dir.ca.gov/dlse/faq_minimumwage.htm', 1),

('ca-emp-003', 'CA-EMP-003', 'California Paid Sick Leave (Healthy Workplaces, Healthy Families Act)',
 'All employers must provide at least 40 hours (5 days) of paid sick leave per year to employees who work 30+ days in California. Accrual: 1 hour per 30 hours worked or frontloaded. Usable after 90 days. Covers employee/family member illness, preventive care, domestic violence, sexual assault, stalking. Expanded from 3 to 5 days effective January 1, 2024 (SB 616).',
 'EMPLOYMENT', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'Cal. Labor Code § 245-249; SB 616 (2023)', 'https://www.dir.ca.gov/dlse/paid_sick_days.htm', 1),

('ca-emp-004', 'CA-EMP-004', 'California Paid Family Leave (PFL)',
 'California provides up to 8 weeks of partial wage replacement (60-70% of wages) for employees taking leave to bond with a new child, care for a seriously ill family member, or participate in qualifying military exigency. Funded through employee payroll deductions (SDI). No minimum employer size — funded through state insurance. Job protection provided separately under CFRA.',
 'EMPLOYMENT', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2004-07-01', 'Cal. Unemp. Ins. Code § 3300-3306', 'https://edd.ca.gov/en/disability/paid-family-leave/', 1),

('ca-emp-005', 'CA-EMP-005', 'California Fair Employment and Housing Act (FEHA)',
 'Employers with 5+ employees (1+ for harassment claims) may not discriminate based on: race, color, religion, sex (including pregnancy/childbirth), gender identity/expression, sexual orientation, marital status, national origin, ancestry, mental/physical disability, medical condition, genetic information, military/veteran status, age (40+), reproductive health decision-making. Broader than federal law in all respects. Administered by the California Civil Rights Department (CRD). 2-year statute of limitations.',
 'EMPLOYMENT', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Cal. Gov. Code § 12900-12996', 'https://calcivilrights.ca.gov/employment/', 1),

('ca-emp-006', 'CA-EMP-006', 'California Sexual Harassment Training (SB 1343)',
 'Employers with 5+ employees must provide sexual harassment prevention training to ALL employees within 6 months of hire and every 2 years thereafter. Supervisory employees: 2 hours. Non-supervisory employees: 1 hour. Training must include practical examples, prevention of abusive conduct, and information about remedies. Must be provided in the language understood by the employee.',
 'EMPLOYMENT', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2020-01-01', 'Cal. Gov. Code § 12950.1; SB 1343', 'https://calcivilrights.ca.gov/shpt/', 1),

('ca-emp-007', 'CA-EMP-007', 'California Family Rights Act (CFRA)',
 'Employers with 5+ employees must provide up to 12 weeks of unpaid, job-protected leave for: birth/adoption/foster placement, serious health condition of employee or family member (spouse, child, parent, grandparent, grandchild, sibling, domestic partner, parent-in-law), qualifying military exigency. Broader than federal FMLA: covers employers with 5+ employees (vs. 50+) and expands family member definition. Employee must have 12 months service and 1,250 hours.',
 'EMPLOYMENT', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2021-01-01', 'Cal. Gov. Code § 12945.1-12945.2; SB 1383', 'https://calcivilrights.ca.gov/family-medical-pregnancy-leave/', 1),

('ca-emp-008', 'CA-EMP-008', 'California Meal and Rest Break Requirements',
 'Employers must provide: a 30-minute unpaid meal period for employees working 5+ hours (second meal period at 10+ hours); a paid 10-minute rest break for every 4 hours worked (or major fraction thereof). Meal periods must begin before the end of the 5th hour. If an employer fails to provide a required meal/rest break, the employee is entitled to one additional hour of pay at the regular rate for each workday violated.',
 'EMPLOYMENT', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Cal. Labor Code § 226.7, 512; IWC Wage Orders', 'https://www.dir.ca.gov/dlse/faq_mealperiods.htm', 1),

('ca-emp-009', 'CA-EMP-009', 'California Pay Transparency (SB 1162)',
 'Employers with 15+ employees must include pay scale (salary or hourly range) in all job postings. All employers (regardless of size) must provide the pay scale for the current position to current employees upon request. Employers with 100+ employees must submit annual pay data reports to the CRD, broken down by race, ethnicity, and sex. Penalties: $100-$10,000 per violation.',
 'EMPLOYMENT', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2023-01-01', 'Cal. Labor Code § 432.3; SB 1162 (2022)', 'https://calcivilrights.ca.gov/paydatareporting/', 1),

('ca-emp-010', 'CA-EMP-010', 'California Worker Classification — AB 5 (ABC Test)',
 'California uses the ABC test (codified by AB 5, effective 2020) to determine whether a worker is an employee or independent contractor. A worker is presumed to be an employee unless the hiring entity can prove ALL three: (A) the worker is free from control and direction, (B) the work is outside the usual course of the entity''s business, and (C) the worker has an independently established trade or business. Numerous profession-specific exemptions exist under Borello test.',
 'EMPLOYMENT', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2020-01-01', 'Cal. Labor Code § 2775-2787; AB 5 (2019)', 'https://www.dir.ca.gov/dlse/faq_independentcontractor.htm', 1),

('ca-emp-011', 'CA-EMP-011', 'California Ban-the-Box (Fair Chance Act)',
 'Employers with 5+ employees may not ask about conviction history on a job application or before making a conditional offer of employment. After a conditional offer, employer must conduct individualized assessment considering: nature/gravity of offense, time elapsed, nature of the job sought. Must provide written notice and 5 business days to respond before revoking an offer based on conviction history.',
 'EMPLOYMENT', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2018-01-01', 'Cal. Gov. Code § 12952; AB 1008 (2017)', 'https://calcivilrights.ca.gov/fair-chance-act/', 1),

('ca-emp-012', 'CA-EMP-012', 'California WARN Act',
 'Employers with 75+ employees must provide 60 days advance written notice before mass layoff (50+ employees in 30-day period), relocation (100+ miles), or termination (cessation of operations). Broader than federal WARN: covers employers with 75+ (vs. 100+), includes relocation, and has more limited exceptions. Penalties: back pay + benefits + $500/day civil penalty.',
 'EMPLOYMENT', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Cal. Labor Code § 1400-1408', 'https://www.edd.ca.gov/jobs_and_training/Layoff_Services_WARN.htm', 1),

('ca-emp-013', 'CA-EMP-013', 'California Workplace Posting Requirements',
 'Employers must display all required state and federal posters in the workplace. California-specific required postings include: Minimum Wage, Payday Notice, Safety and Health Protection, Workers'' Comp, Whistleblower Protections, EDD Disability/Unemployment, FEHA Discrimination/Harassment, Paid Sick Leave, Paid Family Leave, Transgender Rights, and others. Updated annually. Must be in English and any language spoken by 10%+ of workforce.',
 'EMPLOYMENT', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Various Cal. Labor Code sections; DIR posting requirements', 'https://www.dir.ca.gov/wpnodb.html', 1),

('ca-emp-014', 'CA-EMP-014', 'California Non-Compete Prohibition (SB 699 / AB 1076)',
 'California broadly prohibits non-compete agreements in employment regardless of where and when the contract was signed. SB 699 (2024) makes it unlawful for an employer to enter into or attempt to enforce a non-compete clause, even if signed in another state. AB 1076 codifies Edwards v. Arthur Andersen. Employers must notify current and former employees (separated after 1/1/2022) that their non-compete clauses are void.',
 'EMPLOYMENT', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'Cal. Bus. & Prof. Code § 16600-16607; SB 699; AB 1076', 'https://leginfo.legislature.ca.gov/', 1);


-- ============================================================
-- COLORADO
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('co-emp-001', 'CO-EMP-001', 'Colorado Minimum Wage',
 'Colorado minimum wage is $14.42/hour (2024), indexed to CPI annually. Tipped employees: $11.40/hour with $3.02 tip credit. Denver local minimum: $18.29/hour (2024). Employers must also pay overtime at 1.5x after 40 hours/week, 12 hours/day, or 12 consecutive hours regardless of the start/end time of the workday.',
 'EMPLOYMENT', 'STATE', 'CO',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'CRS § 8-6-109; COMPS Order #39', 'https://cdle.colorado.gov/wage-and-hour-law', 1),

('co-emp-002', 'CO-EMP-002', 'Colorado Paid Sick Leave (Healthy Families and Workplaces Act)',
 'All employers must provide 48 hours of paid sick leave per year. Accrual at 1 hour per 30 hours worked, usable as accrued. Covers: physical/mental illness, medical care, public health emergency, domestic abuse/sexual assault. Supplemental public health emergency leave: up to 80 additional hours during declared emergencies. No minimum employer size.',
 'EMPLOYMENT', 'STATE', 'CO',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2021-01-01', 'CRS § 8-13.3-401 to 8-13.3-414', 'https://cdle.colorado.gov/hfwa', 1),

('co-emp-003', 'CO-EMP-003', 'Colorado FAMLI — Paid Family and Medical Leave Insurance',
 'Colorado FAMLI provides up to 12 weeks (16 weeks for pregnancy/childbirth complications) of paid leave at 90% of wages (up to cap). Funded through shared employer/employee premiums (0.9% of wages, split 50/50). Covers all employers. Self-employed may opt in. Leave reasons: new child bonding, own or family member serious health condition, military qualifying exigency, safe leave (domestic violence/sexual assault).',
 'EMPLOYMENT', 'STATE', 'CO',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'CRS § 8-13.3-501 to 8-13.3-524', 'https://famli.colorado.gov/', 1),

('co-emp-004', 'CO-EMP-004', 'Colorado Anti-Discrimination Act (CADA)',
 'Employers with 1+ employees may not discriminate based on: disability, race, creed, color, sex (including sexual orientation, gender identity, gender expression, and transgender status), religion, age (40-70), national origin, ancestry, marriage to a co-worker. Broader than federal: covers employers with 1+ employees, includes sexual orientation/gender identity, and marriage to co-worker. 300-day filing deadline with Colorado Civil Rights Division.',
 'EMPLOYMENT', 'STATE', 'CO',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'CRS § 24-34-401 to 24-34-406', 'https://ccrd.colorado.gov/', 1),

('co-emp-005', 'CO-EMP-005', 'Colorado Equal Pay for Equal Work Act (SB 19-085)',
 'Employers may not discriminate on the basis of sex (including gender identity) in pay for substantially similar work. Must disclose compensation/benefits in all job postings. Must announce all promotional opportunities to current employees on the same calendar day they are posted externally. Must keep job description and wage rate records for each employee for duration of employment plus 2 years. Violations: back pay, liquidated damages, attorneys'' fees.',
 'EMPLOYMENT', 'STATE', 'CO',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2021-01-01', 'CRS § 8-5-101 to 8-5-104; SB 19-085', 'https://cdle.colorado.gov/equalpaytransparency', 1),

('co-emp-006', 'CO-EMP-006', 'Colorado Non-Compete Restrictions',
 'Colorado severely restricts non-compete agreements. Effective August 10, 2022, non-competes are void unless: (1) for executive/management/professional staff earning $123,750+/year (2024 threshold, adjusted annually); (2) reasonably limited in scope; and (3) employer provides notice of the non-compete to the worker. Non-solicitation agreements are void unless for workers earning $61,875+/year. Must provide pre-hire notice.',
 'EMPLOYMENT', 'STATE', 'CO',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2022-08-10', 'CRS § 8-2-113; HB 22-1317', 'https://cdle.colorado.gov/', 1);


-- ============================================================
-- CONNECTICUT
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ct-emp-001', 'CT-EMP-001', 'Connecticut Minimum Wage',
 'Connecticut minimum wage is $16.35/hour (2025), indexed to Employment Cost Index annually starting 2024. Tipped employees: $6.38/hour. One of the highest state minimum wages. No small-employer exemption. Must also pay overtime at 1.5x for hours over 40/week.',
 'EMPLOYMENT', 'STATE', 'CT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2025-01-01', 'Conn. Gen. Stat. § 31-58(j)', 'https://www.ctdol.state.ct.us/wgwkstnd/wage-hour/minimum-wage.htm', 1),

('ct-emp-002', 'CT-EMP-002', 'Connecticut Paid Sick Leave',
 'Employers with 50+ employees in Connecticut must provide up to 40 hours of paid sick leave per year for "service workers" (broadly defined to cover hourly workers in many industries). Accrual: 1 hour per 40 hours worked. Effective January 1, 2025 (HB 6850), all private employers with 25+ employees must provide paid sick leave; 11+ employees by 2026; 1+ by 2027.',
 'EMPLOYMENT', 'STATE', 'CT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2025-01-01', 'Conn. Gen. Stat. § 31-57s to 31-57w; HB 6850 (2024)', 'https://www.ctdol.state.ct.us/wgwkstnd/sickleave.htm', 1),

('ct-emp-003', 'CT-EMP-003', 'Connecticut Paid Family and Medical Leave (CT PFML)',
 'Connecticut provides up to 12 weeks (14 for pregnancy-related incapacity) of paid leave at up to 95% of wages (capped at 60x state minimum wage). Funded through employee payroll deductions (0.5% of wages). Covers all employers with 1+ employees. Leave reasons: own serious health condition, family member illness, new child bonding, organ/bone marrow donation, military qualifying exigency.',
 'EMPLOYMENT', 'STATE', 'CT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2022-01-01', 'Conn. Gen. Stat. § 31-49e to 31-49t', 'https://ctpaidleave.org/', 1),

('ct-emp-004', 'CT-EMP-004', 'Connecticut Fair Employment Practices Act',
 'Employers with 1+ employees (3+ for most provisions) may not discriminate based on: race, color, religious creed, age, sex, pregnancy, gender identity or expression, sexual orientation, marital status, national origin, ancestry, present or past mental/physical/learning disability, intellectual disability, veteran status, genetic information. One of the broadest state anti-discrimination laws. 300-day filing deadline with CT Commission on Human Rights.',
 'EMPLOYMENT', 'STATE', 'CT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Conn. Gen. Stat. § 46a-51 to 46a-104', 'https://portal.ct.gov/CHRO', 1),

('ct-emp-005', 'CT-EMP-005', 'Connecticut Sexual Harassment Training Mandate',
 'Employers with 3+ employees must provide 2 hours of sexual harassment prevention training to all employees within 6 months of hire. Supervisory employees must receive additional training. Training must be updated if substantive legal changes occur. Employers must provide supplemental training every 10 years. Must provide free of charge and during work hours (or compensated).',
 'EMPLOYMENT', 'STATE', 'CT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2019-10-01', 'Conn. Gen. Stat. § 46a-54(15)(C)', 'https://portal.ct.gov/CHRO/Sexual-Harassment-Prevention-Training', 1);


-- ============================================================
-- DELAWARE
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('de-emp-001', 'DE-EMP-001', 'Delaware Minimum Wage',
 'Delaware minimum wage is $13.25/hour (2024). Tipped employees: $2.23/hour with tip credit. Youth rate: $8.75/hour for employees under 18 during first 90 days. No CPI indexing; increases require legislative action.',
 'EMPLOYMENT', 'STATE', 'DE',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', '19 Del. C. § 902', 'https://dia.delawareworks.com/labor-law/', 1),

('de-emp-002', 'DE-EMP-002', 'Delaware Paid Family and Medical Leave',
 'Effective January 1, 2026, employers with 10+ employees must provide paid parental leave (up to 12 weeks); employers with 25+ must also provide medical, family caregiving, and military leave. Benefits: up to 80% of wages (capped). Funded through employer/employee premiums. Small employers (10-24) provide parental leave only. Under 10 employees may opt in.',
 'EMPLOYMENT', 'STATE', 'DE',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2026-01-01', '19 Del. C. § 3701-3724; HB 2 (2022)', 'https://dia.delawareworks.com/paid-leave/', 1),

('de-emp-003', 'DE-EMP-003', 'Delaware Discrimination in Employment Act (DDEA)',
 'Employers with 4+ employees may not discriminate based on: race, color, religion, sex (including pregnancy), sexual orientation, gender identity, national origin, age (40+), marital status, disability, genetic information, reproductive health decisions, family responsibilities, and status as a victim of domestic violence, sexual offense, or stalking. Very broad protections. 300-day filing deadline with DE Department of Labor.',
 'EMPLOYMENT', 'STATE', 'DE',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '19 Del. C. § 710-718', 'https://dia.delawareworks.com/discrimination/', 1),

('de-emp-004', 'DE-EMP-004', 'Delaware Sexual Harassment Training',
 'Employers with 50+ employees must provide interactive sexual harassment prevention training to all employees within 1 year of hire and every 2 years thereafter. Supervisory employees must receive additional training on their responsibilities to report and address harassment. Must comply with DE Department of Labor model training materials or equivalent.',
 'EMPLOYMENT', 'STATE', 'DE',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2019-01-01', '19 Del. C. § 711A; HB 360 (2018)', 'https://dia.delawareworks.com/discrimination/', 1);


-- ============================================================
-- DISTRICT OF COLUMBIA
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('dc-emp-001', 'DC-EMP-001', 'DC Minimum Wage',
 'DC minimum wage is $17.50/hour (2024), indexed to CPI annually (Initiative 77). Tipped employees: $10.00/hour with tip credit. Highest base minimum wage of any US jurisdiction. No small-employer exemption.',
 'EMPLOYMENT', 'STATE', 'DC',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-07-01', 'DC Code § 32-1003', 'https://does.dc.gov/service/office-wage-hour-compliance', 1),

('dc-emp-002', 'DC-EMP-002', 'DC Paid Family Leave',
 'DC Universal Paid Leave provides: 12 weeks parental leave, 12 weeks family leave, 12 weeks medical leave, 2 weeks pre-natal leave. Benefits: 90% of wages up to $1,118/week (2024). Funded entirely by employer tax (0.26% of wages). Covers all private employers in DC. Administered by the DC Department of Employment Services.',
 'EMPLOYMENT', 'STATE', 'DC',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2020-07-01', 'DC Code § 32-541.01 to 32-541.12', 'https://does.dc.gov/page/dc-paid-family-leave', 1),

('dc-emp-003', 'DC-EMP-003', 'DC Accrued Sick and Safe Leave Act',
 'All employers must provide paid sick leave. 100+ employees: 7 days/year. 25-99 employees: 5 days/year. Under 25 employees: 3 days/year. Accrual: 1 hour per 37/43/87 hours worked (based on size). Tipped employees covered at full minimum wage. Covers own illness, family member care, public health emergencies, and stalking/domestic violence/sexual abuse (safe leave).',
 'EMPLOYMENT', 'STATE', 'DC',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2008-11-13', 'DC Code § 32-531.01 to 32-531.17', 'https://does.dc.gov/page/accrued-sick-and-safe-leave-act', 1),

('dc-emp-004', 'DC-EMP-004', 'DC Human Rights Act — Employment Discrimination',
 'ALL employers (no minimum size) may not discriminate based on 22 protected traits: race, color, religion, national origin, sex, age, marital status, personal appearance, sexual orientation, gender identity/expression, family responsibilities, genetic information, disability, matriculation, political affiliation, credit information, status as a victim of intrafamily offense, place of residence/business, tobacco use, status as unemployed, reproductive health decision, homeless status. One of the most expansive anti-discrimination laws in the US.',
 'EMPLOYMENT', 'STATE', 'DC',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'DC Code § 2-1401.01 to 2-1411.06', 'https://ohr.dc.gov/', 1),

('dc-emp-005', 'DC-EMP-005', 'DC Ban-the-Box (Fair Criminal Record Screening Act)',
 'All employers may not inquire about criminal history on applications or before a conditional offer. After conditional offer, must conduct individualized assessment. Must provide copy of background check and 10 business days to respond before adverse action. DC was one of the first jurisdictions to adopt ban-the-box (2014).',
 'EMPLOYMENT', 'STATE', 'DC',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2014-12-17', 'DC Code § 32-1341 to 32-1346', 'https://ohr.dc.gov/page/fair-criminal-record-screening', 1);


-- ============================================================
-- FLORIDA
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('fl-emp-001', 'FL-EMP-001', 'Florida Minimum Wage',
 'Florida minimum wage is $13.00/hour (2024), rising to $15.00/hour by September 2026 under Amendment 2 (2020). Tipped employees: $9.98/hour with $3.02 tip credit. Indexed to CPI after reaching $15.00. Poster required at all workplaces.',
 'EMPLOYMENT', 'STATE', 'FL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-09-30', 'Fla. Const. Art. X, § 24; Fla. Stat. § 448.110', 'https://floridajobs.org/minimum-wage', 1),

('fl-emp-002', 'FL-EMP-002', 'Florida Civil Rights Act — Employment Discrimination',
 'Employers with 15+ employees may not discriminate based on race, color, religion, sex, pregnancy, national origin, age, disability, marital status, or AIDS/HIV status. Mirrors federal Title VII but adds marital status and AIDS/HIV. Does NOT cover sexual orientation or gender identity at state level (some local ordinances do). 365-day filing deadline with FL Commission on Human Relations.',
 'EMPLOYMENT', 'STATE', 'FL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Fla. Stat. § 760.01-760.11', 'https://fchr.myflorida.com/', 1),

('fl-emp-003', 'FL-EMP-003', 'Florida E-Verify Requirement',
 'Effective July 1, 2023, all public employers and private employers with 25+ employees must use E-Verify to confirm employment eligibility of new hires. Must retain the E-Verify confirmation for at least 3 years. Employers not using E-Verify must maintain I-9 forms for 3 years. Violations: fines, license suspension. SB 1718.',
 'EMPLOYMENT', 'STATE', 'FL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2023-07-01', 'Fla. Stat. § 448.095; SB 1718 (2023)', 'https://www.flgov.com/2023/05/10/governor-ron-desantis-signs-strongest-anti-illegal-immigration-legislation-in-the-country/', 1),

('fl-emp-004', 'FL-EMP-004', 'Florida Whistleblower Protection',
 'Florida''s Whistleblower Act protects both private-sector and public-sector employees from retaliation for reporting or refusing to participate in employer activities that violate a law, rule, or regulation. Private sector: Fla. Stat. § 448.102. Public sector: Fla. Stat. § 112.3187. Must exhaust internal remedies before filing. 2-year statute of limitations for private sector claims.',
 'EMPLOYMENT', 'STATE', 'FL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Fla. Stat. § 448.101-448.105 (private); § 112.3187 (public)', 'https://myfloridalegal.com/', 1);


-- ============================================================
-- GEORGIA
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ga-emp-001', 'GA-EMP-001', 'Georgia Minimum Wage',
 'Georgia state minimum wage is $5.15/hour, but federal FLSA minimum of $7.25/hour applies to most employers. The state rate only applies to employers not covered by FLSA (rare). Georgia does not have a tip credit law, but the federal tip credit applies. No CPI indexing.',
 'EMPLOYMENT', 'STATE', 'GA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'O.C.G.A. § 34-4-3; 29 USC § 206 (federal preemption for covered employers)', 'https://dol.georgia.gov/minimum-wage', 1),

('ga-emp-002', 'GA-EMP-002', 'Georgia Fair Employment Practices Act',
 'Georgia prohibits employment discrimination by the state and its subdivisions but does NOT have a comprehensive private-sector employment discrimination law. Private employers are covered only by federal law (Title VII, ADA, ADEA). O.C.G.A. § 45-19-20 et seq. covers public employment only. Some local ordinances (e.g., Atlanta, Savannah) provide additional protections.',
 'EMPLOYMENT', 'STATE', 'GA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'O.C.G.A. § 45-19-20 to 45-19-45 (public); Federal law governs private sector', 'https://dol.georgia.gov/equal-employment', 1),

('ga-emp-003', 'GA-EMP-003', 'Georgia Wage Payment Requirements',
 'Employers must pay employees at least semi-monthly (twice per month). Upon separation, wages due by the next regular payday. Georgia does not have a state-specific final pay statute with accelerated timelines. Deductions from wages require written authorization. No state law on pay stubs, but federal record-keeping requirements apply.',
 'EMPLOYMENT', 'STATE', 'GA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'O.C.G.A. § 34-7-2', 'https://dol.georgia.gov/wage-and-hour', 1);


-- ============================================================
-- HAWAII
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('hi-emp-001', 'HI-EMP-001', 'Hawaii Minimum Wage',
 'Hawaii minimum wage is $14.00/hour (2024), rising to $16.00 (2026), $17.00 (2027), $18.00 (2028). Tipped employees: $12.75/hour with $1.25 tip credit. Employer must also pay for health insurance (Prepaid Health Care Act) — one of only two states requiring employer-provided health insurance.',
 'EMPLOYMENT', 'STATE', 'HI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'HRS § 387-2; Act 114 (2022)', 'https://labor.hawaii.gov/wsd/minimum-wage/', 1),

('hi-emp-002', 'HI-EMP-002', 'Hawaii Prepaid Health Care Act — Mandatory Employer Health Insurance',
 'Hawaii is the only state requiring private employers to provide health insurance to employees working 20+ hours/week for 4 consecutive weeks. Employer must pay at least 50% of the premium. Employee cost cannot exceed 1.5% of wages. Predates ERISA with a federal exemption. Administered by the Disability Compensation Division.',
 'EMPLOYMENT', 'STATE', 'HI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '1974-06-12', 'HRS § 393-1 to 393-51', 'https://labor.hawaii.gov/dcd/home/about-phc/', 1),

('hi-emp-003', 'HI-EMP-003', 'Hawaii Employment Discrimination Law',
 'Employers with 1+ employees may not discriminate based on: race, sex (including gender identity/expression), sexual orientation, age, religion, color, ancestry, disability, marital status, arrest/court record, domestic/sexual violence victim status, reproductive health decisions, National Guard membership, breastfeeding, credit history. Broadest in the nation for arrest/court record protections. Filed with Hawaii Civil Rights Commission.',
 'EMPLOYMENT', 'STATE', 'HI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'HRS § 378-1 to 378-9', 'https://labor.hawaii.gov/hcrc/', 1),

('hi-emp-004', 'HI-EMP-004', 'Hawaii Paid Sick Leave',
 'Effective January 1, 2025 (SB 2456/Act 186), all employers must provide paid sick leave. Employers with 25+ employees: 40 hours/year. Employers with fewer than 25: phased in. Accrual at 1 hour per 40 hours worked. Covers own illness, family member care, public health emergency, and domestic violence/sexual assault.',
 'EMPLOYMENT', 'STATE', 'HI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2025-01-01', 'HRS § 398 (Act 186, 2024)', 'https://labor.hawaii.gov/', 1);


-- ============================================================
-- IDAHO
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('id-emp-001', 'ID-EMP-001', 'Idaho Minimum Wage',
 'Idaho minimum wage is $7.25/hour, matching the federal rate. No state CPI indexing. No tip credit statute; federal tip credit of $5.12 applies ($2.13 tipped minimum). Idaho preempts local minimum wage ordinances.',
 'EMPLOYMENT', 'STATE', 'ID',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Idaho Code § 44-1502', 'https://www.labor.idaho.gov/businesses/wp-idaho/laws-rules/minimum-wage/', 1),

('id-emp-002', 'ID-EMP-002', 'Idaho Human Rights Act — Employment Discrimination',
 'Employers with 5+ employees may not discriminate based on race, color, religion, sex, national origin, age (40+), or disability. Does NOT cover sexual orientation or gender identity. Filed with the Idaho Human Rights Commission. 1-year filing deadline. Mirrors federal protections but with lower employee threshold (5 vs. 15).',
 'EMPLOYMENT', 'STATE', 'ID',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Idaho Code § 67-5901 to 67-5912', 'https://humanrights.idaho.gov/', 1),

('id-emp-003', 'ID-EMP-003', 'Idaho Wage Payment Requirements',
 'Employers must pay employees at least once per month on a regularly scheduled payday. Upon termination (voluntary or involuntary), wages must be paid by the next regular payday or within 10 business days of demand, whichever is sooner. Deductions allowed only with written authorization or as required by law.',
 'EMPLOYMENT', 'STATE', 'ID',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Idaho Code § 45-601 to 45-617', 'https://www.labor.idaho.gov/', 1);


-- ============================================================
-- ILLINOIS
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('il-emp-001', 'IL-EMP-001', 'Illinois Minimum Wage',
 'Illinois minimum wage is $14.00/hour (2024), rising to $15.00 on January 1, 2025. Tipped employees: $8.40/hour (60% of minimum). Workers under 18 with fewer than 650 hours: $12.00/hour. Chicago minimum wage: $16.20/hour (2024). Cook County minimum: $14.00/hour.',
 'EMPLOYMENT', 'STATE', 'IL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', '820 ILCS 105/4', 'https://labor.illinois.gov/laws-rules/conmed/minimum-wage-law.html', 1),

('il-emp-002', 'IL-EMP-002', 'Illinois Paid Leave for All Workers Act',
 'Effective January 1, 2024, ALL employers must provide at least 40 hours of paid leave per year for any reason (not limited to sick leave). Accrual: 1 hour per 40 hours worked. Usable after 90 days. No documentation required for reason. This is the broadest paid leave law in the country — employees can use it for any purpose. Cook County excluded (has own ordinance).',
 'EMPLOYMENT', 'STATE', 'IL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', '820 ILCS 192; Paid Leave for All Workers Act (2023)', 'https://labor.illinois.gov/laws-rules/conmed/paid-leave.html', 1),

('il-emp-003', 'IL-EMP-003', 'Illinois Human Rights Act — Employment Discrimination',
 'Employers with 1+ employees (15+ for some disability provisions) may not discriminate based on: race, color, religion, sex (including sexual harassment), national origin, ancestry, age (40+), disability, marital status, order of protection status, military status, sexual orientation, gender identity, pregnancy, citizenship status (within limits), arrest record, unfavorable military discharge, work authorization status, conviction record (with restrictions). Administered by IL Department of Human Rights. 300-day filing deadline.',
 'EMPLOYMENT', 'STATE', 'IL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '775 ILCS 5/1-101 to 5/10-104', 'https://dhr.illinois.gov/', 1),

('il-emp-004', 'IL-EMP-004', 'Illinois Biometric Information Privacy Act (BIPA) — Employment',
 'Employers collecting biometric data (fingerprints, facial scans, iris scans, voiceprints, hand geometry) must: provide written notice, obtain written consent, establish retention/destruction policies, and protect data. Private right of action with statutory damages: $1,000/negligent violation, $5,000/intentional or reckless violation. Has generated billions in class-action liability. Applies to timekeeping systems using biometrics.',
 'EMPLOYMENT', 'STATE', 'IL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2008-10-03', '740 ILCS 14/1-14/99', 'https://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=3004', 1),

('il-emp-005', 'IL-EMP-005', 'Illinois Sexual Harassment Prevention Training',
 'ALL employers in Illinois (regardless of size) must provide annual sexual harassment prevention training to all employees. Restaurants and bars have additional requirements (SB 75): supplemental training specific to their industry. Employers must also develop a written sexual harassment policy. Failure to comply: fines up to $5,000 per offense (individual liability possible).',
 'EMPLOYMENT', 'STATE', 'IL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2020-01-01', '775 ILCS 5/2-109; SB 75 (Workplace Transparency Act)', 'https://dhr.illinois.gov/training.html', 1),

('il-emp-006', 'IL-EMP-006', 'Illinois Non-Compete Restriction (Freedom to Work Act)',
 'Non-compete agreements are unenforceable against employees earning $75,000/year or less (threshold increases $5,000/year through 2037). Non-solicitation agreements: unenforceable below $45,000/year. Employer must advise employee to consult counsel and provide 14 calendar days to review. Cannot be enforced if employee was laid off (with limited exceptions). Effective January 1, 2022.',
 'EMPLOYMENT', 'STATE', 'IL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2022-01-01', '820 ILCS 90/1-90/99; SB 672 (2021)', 'https://labor.illinois.gov/', 1);


-- ============================================================
-- INDIANA
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('in-emp-001', 'IN-EMP-001', 'Indiana Minimum Wage',
 'Indiana minimum wage is $7.25/hour, matching the federal rate. No CPI indexing. Tipped employees: $2.13/hour with tip credit. Indiana preempts local governments from setting higher minimum wages (IC 22-2-2-10.5).',
 'EMPLOYMENT', 'STATE', 'IN',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'IC § 22-2-2-4', 'https://www.in.gov/dol/wage-and-hour/minimum-wage/', 1),

('in-emp-002', 'IN-EMP-002', 'Indiana Civil Rights Law — Employment Discrimination',
 'Employers with 6+ employees may not discriminate based on: race, religion, color, sex, disability, national origin, ancestry, veteran status, or age (40-75). Indiana does NOT cover sexual orientation or gender identity at state level. Filed with Indiana Civil Rights Commission. 180-day filing deadline. Older worker protection is capped at age 75 (vs. federal uncapped).',
 'EMPLOYMENT', 'STATE', 'IN',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'IC § 22-9-1-1 to 22-9-1-18', 'https://www.in.gov/icrc/', 1),

('in-emp-003', 'IN-EMP-003', 'Indiana Wage Payment Requirements',
 'Employers must pay employees at least semi-monthly (biweekly or semi-monthly). Upon termination (voluntary or involuntary), wages due by the next regular payday. Employers must provide a statement of deductions with each wage payment. Wage claims must be filed within 2 years.',
 'EMPLOYMENT', 'STATE', 'IN',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'IC § 22-2-5-1 to 22-2-5-2', 'https://www.in.gov/dol/wage-and-hour/', 1);


-- ============================================================
-- IOWA
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ia-emp-001', 'IA-EMP-001', 'Iowa Minimum Wage',
 'Iowa minimum wage is $7.25/hour, matching the federal rate. No CPI indexing. Iowa preempts local minimum wage laws (SF 295, 2017), retroactively voiding higher local minimums in Johnson County, Linn County, Wapello County, and Polk County.',
 'EMPLOYMENT', 'STATE', 'IA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Iowa Code § 91D.1', 'https://www.iwd.iowa.gov/minimum-wage', 1),

('ia-emp-002', 'IA-EMP-002', 'Iowa Civil Rights Act — Employment Discrimination',
 'Employers with 4+ employees may not discriminate based on: race, color, creed, national origin, religion, sex (including pregnancy), sexual orientation, gender identity, age, disability. Iowa covers sexual orientation and gender identity. Filed with Iowa Civil Rights Commission. 300-day filing deadline. One of the earlier states to add sexual orientation/gender identity protections (2007).',
 'EMPLOYMENT', 'STATE', 'IA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Iowa Code § 216.1-216.20', 'https://icrc.iowa.gov/', 1),

('ia-emp-003', 'IA-EMP-003', 'Iowa Wage Payment Collection Law',
 'Employers must pay employees at least monthly on regularly scheduled paydays. Upon discharge, wages due by next regular payday. Upon voluntary quit, wages due by next regular payday. Earned wages become due and payable at regular paydays. Employers liable for liquidated damages (up to wages owed) for intentional failure to pay.',
 'EMPLOYMENT', 'STATE', 'IA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Iowa Code § 91A.1-91A.12', 'https://www.iwd.iowa.gov/labor/wage-payment', 1);


-- ============================================================
-- KANSAS
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ks-emp-001', 'KS-EMP-001', 'Kansas Minimum Wage',
 'Kansas minimum wage is $7.25/hour, matching the federal rate. No state CPI indexing. Tipped employees: $2.13/hour with tip credit. Kansas does not preempt local minimum wage laws, but no locality has adopted a higher rate.',
 'EMPLOYMENT', 'STATE', 'KS',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'K.S.A. § 44-1203', 'https://www.dol.ks.gov/laws-regulations/minimum-wage', 1),

('ks-emp-002', 'KS-EMP-002', 'Kansas Act Against Discrimination — Employment',
 'Employers with 4+ employees may not discriminate based on: race, religion, color, sex, disability, national origin, ancestry, age (18+), military status, or genetic testing results. Does NOT cover sexual orientation or gender identity at state level. Age protection starts at 18 (broader than federal 40+). Filed with Kansas Human Rights Commission. 6-month filing deadline.',
 'EMPLOYMENT', 'STATE', 'KS',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'K.S.A. § 44-1001 to 44-1044', 'https://www.khrc.net/', 1),

('ks-emp-003', 'KS-EMP-003', 'Kansas Wage Payment Act',
 'Employers must pay wages due at least monthly (or at intervals of not greater than one month). Upon termination, all wages due must be paid by the next regular payday. Employers who willfully fail to pay wages are liable for the unpaid wages plus 1% per day penalty (up to 100% of wages owed). Must provide itemized statement of deductions.',
 'EMPLOYMENT', 'STATE', 'KS',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'K.S.A. § 44-314 to 44-327', 'https://www.dol.ks.gov/laws-regulations/wage-payment', 1);


-- ============================================================
-- KENTUCKY
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ky-emp-001', 'KY-EMP-001', 'Kentucky Minimum Wage',
 'Kentucky minimum wage is $7.25/hour, matching the federal rate. Tipped employees: $2.13/hour with tip credit. The state adopted a $7.75/hour minimum in 2020 via executive order but this was struck down as the legislature had not authorized it. Local government preemption in effect.',
 'EMPLOYMENT', 'STATE', 'KY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'KRS § 337.275', 'https://labor.ky.gov/standards/Pages/Minimum-Wage.aspx', 1),

('ky-emp-002', 'KY-EMP-002', 'Kentucky Civil Rights Act — Employment Discrimination',
 'Employers with 8+ employees may not discriminate based on race, color, religion, national origin, sex, age (40+), disability, or smoking status (off-duty tobacco use). Does NOT cover sexual orientation or gender identity at state level. Some local fairness ordinances (Louisville, Lexington, Covington) provide SOGI protections. Filed with Kentucky Commission on Human Rights. 180-day filing deadline.',
 'EMPLOYMENT', 'STATE', 'KY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'KRS § 344.010-344.990', 'https://kchr.ky.gov/', 1),

('ky-emp-003', 'KY-EMP-003', 'Kentucky Wage and Hour — Overtime and Breaks',
 'Kentucky requires overtime at 1.5x regular rate for hours over 40/week (7th consecutive day of work also triggers overtime). Employees must receive a reasonable lunch period of no less than 30 minutes between the 3rd and 5th hour of work. Must provide a 10-minute rest break for every 4 hours worked. One of few states mandating both meal and rest breaks.',
 'EMPLOYMENT', 'STATE', 'KY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'KRS § 337.285 (overtime); KRS § 337.355, 337.365 (breaks)', 'https://labor.ky.gov/standards/Pages/Wage-and-Hour.aspx', 1);


-- ============================================================
-- LOUISIANA
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('la-emp-001', 'LA-EMP-001', 'Louisiana Minimum Wage',
 'Louisiana has no state minimum wage law. Federal minimum wage of $7.25/hour applies. Louisiana passed Act 3 (2012 HB 646) preempting local governments from establishing minimum wage rates. No tip credit statute; federal rules apply.',
 'EMPLOYMENT', 'STATE', 'LA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'La. R.S. 23:642 (preemption); 29 USC § 206 (federal)', 'https://www.laworks.net/', 1),

('la-emp-002', 'LA-EMP-002', 'Louisiana Employment Discrimination Law',
 'Employers with 20+ employees may not discriminate based on race, color, religion, sex, national origin, age (40+), disability, sickle cell trait, pregnancy/childbirth, genetic information, or smoking status (off-duty). Threshold of 20 employees is higher than federal for some protected classes. Does NOT cover sexual orientation or gender identity. Filed with EEOC or state court. 1-year prescriptive period for state claims.',
 'EMPLOYMENT', 'STATE', 'LA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'La. R.S. 23:301-23:369', 'https://www.laworks.net/', 1),

('la-emp-003', 'LA-EMP-003', 'Louisiana Wage Payment Act',
 'Employers must pay employees at least semi-monthly. Upon discharge or resignation, all amounts due must be paid within 15 days of the separation date or the next regular payday, whichever is first. Employers who fail to timely pay may be liable for up to 90 days'' wages as a penalty plus attorney fees.',
 'EMPLOYMENT', 'STATE', 'LA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'La. R.S. 23:631-23:634', 'https://www.laworks.net/Downloads/WagePaymentAct/WagePaymentActStatute.pdf', 1);


-- ============================================================
-- MAINE
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('me-emp-001', 'ME-EMP-001', 'Maine Minimum Wage',
 'Maine minimum wage is $14.15/hour (2024), indexed to CPI annually. Tipped employees: $7.08/hour (50% of minimum). Service employees receiving tips in excess of $175/month may be paid the tipped rate. Overtime at 1.5x after 40 hours/week.',
 'EMPLOYMENT', 'STATE', 'ME',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', '26 M.R.S.A. § 664', 'https://www.maine.gov/labor/labor_laws/minimum_wage.html', 1),

('me-emp-002', 'ME-EMP-002', 'Maine Earned Paid Leave',
 'ALL employers with 10+ employees must provide up to 40 hours of earned paid leave per year for any reason. Accrual: 1 hour per 40 hours worked. Usable after 120 days. One of the broadest paid leave laws — can be used for ANY reason (not limited to sick leave). Effective January 1, 2021.',
 'EMPLOYMENT', 'STATE', 'ME',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2021-01-01', '26 M.R.S.A. § 637', 'https://www.maine.gov/labor/labor_laws/earned_paid_leave.html', 1),

('me-emp-003', 'ME-EMP-003', 'Maine Human Rights Act — Employment Discrimination',
 'ALL employers (no minimum size) may not discriminate based on: race, color, sex (including sexual orientation, gender identity), disability, religion, age, national origin, ancestry, familial status, previous workers'' comp claim, previous whistleblower activity. Covers all employers with 1+ employees. Very broad protections. Filed with Maine Human Rights Commission. 300-day filing deadline.',
 'EMPLOYMENT', 'STATE', 'ME',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '5 M.R.S.A. § 4551-4634', 'https://www.maine.gov/mhrc/', 1),

('me-emp-004', 'ME-EMP-004', 'Maine Paid Family and Medical Leave',
 'Effective May 1, 2026, Maine will provide up to 12 weeks of paid family and medical leave per year. Benefits: up to 90% of average weekly wage (capped). Funded through employer and employee contributions (1% of wages, split 50/50). Covers all employers with 1+ employees. Leave for: own serious health condition, family member care, new child bonding, military qualifying exigency, organ donation, safe leave.',
 'EMPLOYMENT', 'STATE', 'ME',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2026-05-01', '26 M.R.S.A. § 850-A (LD 1964, 2023)', 'https://www.maine.gov/pfml/', 1);


-- ============================================================
-- MARYLAND
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('md-emp-001', 'MD-EMP-001', 'Maryland Minimum Wage',
 'Maryland minimum wage is $15.00/hour (2024) for all employers. Previously phased based on employer size; now uniform. Tipped employees: $3.63/hour with tip credit. Montgomery County: $17.15 (2024). Howard County follows state rate. Indexed to CPI beginning 2025.',
 'EMPLOYMENT', 'STATE', 'MD',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'Md. Code, Lab. & Empl. § 3-413', 'https://www.dllr.state.md.us/labor/wages/wagehrfacts.shtml', 1),

('md-emp-002', 'MD-EMP-002', 'Maryland Healthy Working Families Act — Paid Sick Leave',
 'Employers with 15+ employees must provide up to 40 hours of paid sick and safe leave per year. Under 15 employees: 40 hours unpaid. Accrual: 1 hour per 30 hours worked. Covers: employee/family member illness, maternity/paternity leave, domestic violence/sexual assault. Up to 64 hours may carry over.',
 'EMPLOYMENT', 'STATE', 'MD',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2018-02-12', 'Md. Code, Lab. & Empl. § 3-1301 to 3-1311', 'https://www.dllr.state.md.us/paidleave/', 1),

('md-emp-003', 'MD-EMP-003', 'Maryland Time to Care Act — Paid Family and Medical Leave',
 'Effective July 1, 2026, Maryland will provide up to 12 weeks of paid family and medical leave per year. Benefits: up to 90% of wages (capped at state average weekly wage). Funded through shared employer/employee contributions. Covers all employers with 1+ employees. Includes safe leave. Contributions begin October 1, 2025.',
 'EMPLOYMENT', 'STATE', 'MD',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2026-07-01', 'Md. Code, Lab. & Empl. § 8.3-101 to 8.3-801 (SB 275, 2022)', 'https://www.dllr.state.md.us/employment/famleave/', 1),

('md-emp-004', 'MD-EMP-004', 'Maryland Fair Employment Practices Act',
 'Employers with 15+ employees may not discriminate based on: race, color, religion, sex, sexual orientation, gender identity, age, national origin, marital status, disability, genetic information. Filed with Maryland Commission on Civil Rights. 6-month filing deadline (180 days). Or file directly in state court within 2 years. Mandatory arbitration clauses may be limited.',
 'EMPLOYMENT', 'STATE', 'MD',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Md. Code, State Gov. § 20-601 to 20-610', 'https://mccr.maryland.gov/', 1);


-- ============================================================
-- MASSACHUSETTS
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ma-emp-001', 'MA-EMP-001', 'Massachusetts Minimum Wage',
 'Massachusetts minimum wage is $15.00/hour (2023). Tipped employees: $6.75/hour with tip credit. Sunday/holiday premium pay was phased out by 2023 (previously 1.1x-1.5x). No CPI indexing — increases require legislative action.',
 'EMPLOYMENT', 'STATE', 'MA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2023-01-01', 'MGL ch. 151, § 1', 'https://www.mass.gov/info-details/massachusetts-law-about-minimum-wage', 1),

('ma-emp-002', 'MA-EMP-002', 'Massachusetts Earned Sick Time',
 'All employers must provide earned sick time. 11+ employees: paid. Under 11: unpaid. Up to 40 hours/year. Accrual: 1 hour per 30 hours worked. Usable after 90 days. Covers: own illness/preventive care, care of child/spouse/parent/parent-in-law, domestic violence, sexual assault, stalking. Effective July 1, 2015.',
 'EMPLOYMENT', 'STATE', 'MA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2015-07-01', 'MGL ch. 149, § 148C', 'https://www.mass.gov/info-details/earned-sick-time', 1),

('ma-emp-003', 'MA-EMP-003', 'Massachusetts Paid Family and Medical Leave (PFML)',
 'All employers contribute to state PFML fund. Provides: 20 weeks medical leave, 12 weeks family leave, 26 weeks combined per year. Benefits: 80% of wages up to 50% of state average weekly wage, then 50% above that (capped). Funded through payroll contributions (shared employer/employee). Covers all employers with 1+ employees. Administered by the Department of Family and Medical Leave.',
 'EMPLOYMENT', 'STATE', 'MA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2021-01-01', 'MGL ch. 175M', 'https://www.mass.gov/pfml', 1),

('ma-emp-004', 'MA-EMP-004', 'Massachusetts Anti-Discrimination (Chapter 151B)',
 'Employers with 6+ employees may not discriminate based on: race, color, religious creed, national origin, sex, gender identity, sexual orientation, genetic information, ancestry, age (40+), disability, military service, criminal record (with limits). One of the earliest states to protect sexual orientation (1989) and gender identity (2012). Filed with Massachusetts Commission Against Discrimination (MCAD). 300-day filing deadline.',
 'EMPLOYMENT', 'STATE', 'MA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'MGL ch. 151B, § 4', 'https://www.mass.gov/orgs/massachusetts-commission-against-discrimination', 1),

('ma-emp-005', 'MA-EMP-005', 'Massachusetts Non-Compete Agreement Act',
 'Non-compete agreements must be: limited to 12 months (or 24 months for breach of fiduciary duty), supported by garden-leave pay of at least 50% of highest salary in last 2 years OR other mutually agreed consideration, provided before formal offer or 10 business days before start date (existing employees: 10 days notice + separate consideration). Cannot be enforced against: hourly workers, employees terminated without cause, laid-off employees, minors under 18.',
 'EMPLOYMENT', 'STATE', 'MA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2018-10-01', 'MGL ch. 149, § 24L', 'https://www.mass.gov/info-details/massachusetts-law-about-non-compete-agreements', 1);


-- ============================================================
-- MICHIGAN
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('mi-emp-001', 'MI-EMP-001', 'Michigan Minimum Wage',
 'Michigan minimum wage is $10.33/hour (2024). However, pursuant to Mothering Justice v. Nessel (2024), the original ballot initiative rates may be restored: potentially $14.97/hour by February 2025. Tipped employees: $3.93/hour (to potentially increase). CPI indexing in effect. This area of law is in active flux — verify current rate.',
 'EMPLOYMENT', 'STATE', 'MI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'MCL § 408.384; Mothering Justice v. Nessel (2024)', 'https://www.michigan.gov/leo/bureaus-agencies/wd/wage-hour', 1),

('mi-emp-002', 'MI-EMP-002', 'Michigan Earned Sick Time Act',
 'Following Mothering Justice v. Nessel (2024), Michigan''s Earned Sick Time Act has been restored in its original ballot initiative form. All employers must provide paid sick time: accrual 1 hour per 30 hours worked. Employers with 10+ employees: up to 72 hours/year. Under 10: up to 40 hours paid, 32 unpaid. Covers: illness, domestic violence, sexual assault, public health emergency.',
 'EMPLOYMENT', 'STATE', 'MI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2025-02-21', 'MCL § 408.961-408.978; Mothering Justice v. Nessel (2024)', 'https://www.michigan.gov/leo/', 1),

('mi-emp-003', 'MI-EMP-003', 'Michigan Elliott-Larsen Civil Rights Act — Employment',
 'Employers with 1+ employees may not discriminate based on: religion, race, color, national origin, age, sex (including sexual orientation and gender identity per Rouch World v. Dep''t of Civil Rights, 2022, and subsequent amendment), height, weight, familial status, marital status. Michigan is one of very few states protecting height and weight. Filed with Michigan Department of Civil Rights.',
 'EMPLOYMENT', 'STATE', 'MI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'MCL § 37.2101-37.2804', 'https://www.michigan.gov/mdcr', 1);


-- ============================================================
-- MINNESOTA
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('mn-emp-001', 'MN-EMP-001', 'Minnesota Minimum Wage',
 'Minnesota minimum wage: Large employers (annual gross revenue $500,000+): $10.85/hour (2024). Small employers: $8.85/hour. Workers under 18: $8.85/hour. Training wage: $8.85/hour for first 90 days. CPI indexed annually. Minneapolis: $15.57/hour (2024, all employers). St. Paul: $15.57/hour (2024, large employers).',
 'EMPLOYMENT', 'STATE', 'MN',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'Minn. Stat. § 177.24', 'https://www.dli.mn.gov/business/employment-practices/minimum-wage-minnesota', 1),

('mn-emp-002', 'MN-EMP-002', 'Minnesota Earned Sick and Safe Time',
 'Effective January 1, 2024, ALL employers (regardless of size) must provide at least 48 hours of earned sick and safe time per year. Accrual: 1 hour per 30 hours worked. Frontloading option: 80 hours at start of year. Covers: own illness, family member care, domestic abuse/sexual assault, school/childcare closure, safe time. No waiting period — usable immediately upon accrual.',
 'EMPLOYMENT', 'STATE', 'MN',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'Minn. Stat. § 181.9445-181.9448 (2023 omnibus bill)', 'https://www.dli.mn.gov/sick-and-safe-time', 1),

('mn-emp-003', 'MN-EMP-003', 'Minnesota Paid Family and Medical Leave',
 'Effective January 1, 2026, Minnesota will provide up to 12 weeks of family leave, 12 weeks of medical leave, and 20 weeks combined per year. Benefits: up to 90% of wages (capped). Funded through payroll premiums (0.7% of wages, shared employer/employee). Covers all employers. Premium collection began January 1, 2026.',
 'EMPLOYMENT', 'STATE', 'MN',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2026-01-01', 'Minn. Stat. § 268B.01-268B.30 (2023 omnibus)', 'https://www.dli.mn.gov/paid-leave', 1),

('mn-emp-004', 'MN-EMP-004', 'Minnesota Human Rights Act — Employment Discrimination',
 'Employers with 1+ employees may not discriminate based on: race, color, creed, religion, national origin, sex (including pregnancy, childbirth), sexual orientation (including gender identity), marital status, familial status, disability, public assistance status, age, local human rights commission activity. One of the broadest state anti-discrimination laws. Includes public assistance status (unique). Filed with MN Department of Human Rights. 1-year filing deadline.',
 'EMPLOYMENT', 'STATE', 'MN',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Minn. Stat. § 363A.01-363A.44', 'https://mn.gov/mdhr/', 1),

('mn-emp-005', 'MN-EMP-005', 'Minnesota Non-Compete Ban',
 'Effective July 1, 2023, Minnesota bans all post-employment non-compete agreements. Void and unenforceable regardless of when signed. Applies to employees and independent contractors performing services in Minnesota. Does NOT prohibit non-disclosure agreements, non-solicitation agreements, or non-competes related to sale of business. One of only 4 states with a total ban (with CA, ND, OK).',
 'EMPLOYMENT', 'STATE', 'MN',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2023-07-01', 'Minn. Stat. § 181.988 (SF 3035, 2023)', 'https://www.revisor.mn.gov/statutes/cite/181.988', 1);


-- ============================================================
-- MISSISSIPPI
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ms-emp-001', 'MS-EMP-001', 'Mississippi Minimum Wage',
 'Mississippi has no state minimum wage law. Federal minimum wage of $7.25/hour applies to FLSA-covered employers. No state enforcement mechanism for wage claims beyond federal law.',
 'EMPLOYMENT', 'STATE', 'MS',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'No state minimum wage statute; 29 USC § 206 (federal)', 'https://mdes.ms.gov/', 1),

('ms-emp-002', 'MS-EMP-002', 'Mississippi Employment Discrimination',
 'Mississippi does NOT have a comprehensive state employment discrimination law for private employers. Private-sector employees rely entirely on federal protections (Title VII, ADA, ADEA). Mississippi has limited protections: state employees covered under Miss. Code § 25-9-149 (whistleblower). Some protections for military service members under Miss. Code § 33-1-15.',
 'EMPLOYMENT', 'STATE', 'MS',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Federal law governs private sector; Miss. Code § 25-9-149 (public)', 'https://mdes.ms.gov/', 1),

('ms-emp-003', 'MS-EMP-003', 'Mississippi Wage Payment Requirements',
 'Mississippi requires employers to pay employees at least semi-monthly. No state-specific final pay statute — federal rules apply. Mississippi does have a wage lien statute allowing employees to file liens against employer property for unpaid wages (Miss. Code § 85-7-1 et seq.).',
 'EMPLOYMENT', 'STATE', 'MS',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Miss. Code § 71-1-35 (semi-monthly); § 85-7-1 (wage liens)', 'https://mdes.ms.gov/', 1);


-- ============================================================
-- MISSOURI
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('mo-emp-001', 'MO-EMP-001', 'Missouri Minimum Wage',
 'Missouri minimum wage is $12.30/hour (2024), indexed to CPI annually. Tipped employees: $6.15/hour (50% of minimum). No exemption for small employers. Kansas City and St. Louis may not set local minimums (state preemption). Proposition B (2018) set the schedule.',
 'EMPLOYMENT', 'STATE', 'MO',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'Mo. Rev. Stat. § 290.502', 'https://labor.mo.gov/standards/minimum-wage', 1),

('mo-emp-002', 'MO-EMP-002', 'Missouri Paid Sick Leave (Proposition A)',
 'Effective May 1, 2025, all employers must provide paid sick leave. 15+ employees: 56 hours/year. Under 15: 40 hours/year. Accrual: 1 hour per 30 hours worked. Covers: illness, preventive care, domestic violence, family member care. Proposition A (2024) also increased minimum wage to $13.75 (2025) and $15.00 (2026).',
 'EMPLOYMENT', 'STATE', 'MO',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2025-05-01', 'Mo. Rev. Stat. § 290.600 (Proposition A, 2024)', 'https://labor.mo.gov/', 1),

('mo-emp-003', 'MO-EMP-003', 'Missouri Human Rights Act — Employment Discrimination',
 'Employers with 6+ employees may not discriminate based on: race, color, religion, national origin, sex, ancestry, age (40-70), disability. Age protection capped at 70 (vs. federal uncapped). Does NOT expressly cover sexual orientation or gender identity. 2017 amendment (SB 43) raised the standard for discrimination claims to "motivating factor" (from "contributing factor"). Filed with MO Commission on Human Rights. 180-day filing deadline.',
 'EMPLOYMENT', 'STATE', 'MO',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Mo. Rev. Stat. § 213.010-213.137', 'https://labor.mo.gov/mohumanrights', 1);


-- ============================================================
-- MONTANA
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('mt-emp-001', 'MT-EMP-001', 'Montana Minimum Wage',
 'Montana minimum wage is $10.30/hour (2024), indexed to CPI annually. Businesses with gross annual sales of $110,000 or less: $4.00/hour. No tip credit allowed — tipped employees must receive full minimum wage. One of few states prohibiting tip credit.',
 'EMPLOYMENT', 'STATE', 'MT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'Mont. Code § 39-3-409', 'https://erd.dli.mt.gov/labor-standards/wage-and-hour-payment-act/minimum-wage', 1),

('mt-emp-002', 'MT-EMP-002', 'Montana Wrongful Discharge from Employment Act',
 'Montana is the ONLY state that is not at-will employment. The Wrongful Discharge from Employment Act (1987) prohibits termination without good cause after completion of a probationary period (6 months if not specified by employer). Exceptions: good cause termination, probationary period, and legitimate business reasons. Damages limited to 4 years'' lost wages. This fundamentally changes the employment relationship compared to all other states.',
 'EMPLOYMENT', 'STATE', 'MT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '1987-07-01', 'Mont. Code § 39-2-901 to 39-2-915', 'https://erd.dli.mt.gov/labor-standards/wrongful-discharge', 1),

('mt-emp-003', 'MT-EMP-003', 'Montana Human Rights Act — Employment Discrimination',
 'ALL employers (no minimum size) may not discriminate based on: race, creed, religion, color, national origin, age, physical or mental disability, sex, marital status. Does NOT expressly cover sexual orientation or gender identity (attempts to add have failed). Filed with Montana Human Rights Bureau. 180-day filing deadline.',
 'EMPLOYMENT', 'STATE', 'MT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Mont. Code § 49-1-101 to 49-4-101', 'https://erd.dli.mt.gov/human-rights', 1);


-- ============================================================
-- NEBRASKA
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ne-emp-001', 'NE-EMP-001', 'Nebraska Minimum Wage',
 'Nebraska minimum wage is $12.00/hour (2024), rising to $15.00 by 2026 per Initiative 433 (2022). CPI indexed starting 2027. Tipped employees: must receive at least minimum wage (no tip credit). Employers with 4+ employees are covered.',
 'EMPLOYMENT', 'STATE', 'NE',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'Neb. Rev. Stat. § 48-1203; Initiative 433 (2022)', 'https://dol.nebraska.gov/MinimumWage', 1),

('ne-emp-002', 'NE-EMP-002', 'Nebraska Paid Sick Leave (Initiative 436)',
 'Effective October 1, 2025, employers with 20+ employees must provide up to 56 hours of paid sick leave per year. Under 20 employees: 40 hours. Accrual: 1 hour per 30 hours worked. Covers: own illness, family member care, public health emergency, domestic violence, sexual assault, stalking. Approved by voters in November 2024.',
 'EMPLOYMENT', 'STATE', 'NE',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2025-10-01', 'Neb. Rev. Stat. § 48-2401 (Initiative 436, 2024)', 'https://dol.nebraska.gov/', 1),

('ne-emp-003', 'NE-EMP-003', 'Nebraska Fair Employment Practice Act',
 'Employers with 15+ employees may not discriminate based on: race, color, religion, sex, disability, marital status, national origin, age (40-70), or retaliation. Does NOT cover sexual orientation or gender identity (Lincoln and Omaha have local protections). Filed with Nebraska Equal Opportunity Commission. 300-day filing deadline.',
 'EMPLOYMENT', 'STATE', 'NE',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Neb. Rev. Stat. § 48-1101 to 48-1126', 'https://neoc.nebraska.gov/', 1);


-- ============================================================
-- NEVADA
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('nv-emp-001', 'NV-EMP-001', 'Nevada Minimum Wage',
 'Nevada minimum wage is $12.00/hour (2024, unified — AB 456 eliminated the two-tier system). Previously had different rates depending on whether employer offered health benefits. No tip credit. CPI indexing beginning July 1, 2025.',
 'EMPLOYMENT', 'STATE', 'NV',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-07-01', 'Nev. Const. Art. 15, § 16; NRS § 608.250; AB 456', 'https://labor.nv.gov/Employer/Employer_FAQ_s/', 1),

('nv-emp-002', 'NV-EMP-002', 'Nevada Paid Leave (SB 312)',
 'ALL employers with 50+ employees must provide up to 40 hours of paid leave per benefit year for any reason. Accrual: 0.01923 hours per hour worked. No documentation required for use. One of the broadest paid leave laws — ANY reason (not limited to sick leave). Effective January 1, 2020.',
 'EMPLOYMENT', 'STATE', 'NV',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2020-01-01', 'NRS § 608.0197; SB 312 (2019)', 'https://labor.nv.gov/Employer/Paid_Leave/', 1),

('nv-emp-003', 'NV-EMP-003', 'Nevada Anti-Discrimination Laws',
 'Employers with 15+ employees may not discriminate based on: race, color, religion, sex (including sexual orientation, gender identity/expression), national origin, age (40+), disability, genetic information, use of service animal, opposing unlawful employment practices. Sexual orientation and gender identity added in 1999 and expanded. Filed with Nevada Equal Rights Commission. 300-day filing deadline.',
 'EMPLOYMENT', 'STATE', 'NV',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'NRS § 613.310-613.435', 'https://detr.nv.gov/NERC', 1),

('nv-emp-004', 'NV-EMP-004', 'Nevada Daily Overtime',
 'Nevada requires overtime at 1.5x regular rate for hours over 8 in a 24-hour period if the employee earns less than 1.5x minimum wage ($18.00/hour in 2024). Higher-paid employees: only weekly overtime (40 hours) applies. One of few states with daily overtime. Mutual agreement for 4x10 schedule exempts daily overtime.',
 'EMPLOYMENT', 'STATE', 'NV',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Nev. Const. Art. 15, § 16; NRS § 608.018', 'https://labor.nv.gov/Employer/Employer_FAQ_s/', 1);


-- ============================================================
-- NEW HAMPSHIRE
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('nh-emp-001', 'NH-EMP-001', 'New Hampshire Minimum Wage',
 'New Hampshire repealed its state minimum wage law in 2011 (HB 133). Federal minimum wage of $7.25/hour applies. No state enforcement mechanism; federal FLSA governs. Tipped employees: $3.27/hour with tip credit (45% of federal minimum).',
 'EMPLOYMENT', 'STATE', 'NH',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'RSA 279:21 (repealed 2011); 29 USC § 206 (federal)', 'https://www.nh.gov/labor/inspection/wage-hour/', 1),

('nh-emp-002', 'NH-EMP-002', 'New Hampshire Law Against Discrimination — Employment',
 'Employers with 6+ employees may not discriminate based on: age, sex (including sexual orientation), race, color, marital status, physical or mental disability, religious creed, national origin, gender identity. New Hampshire added sexual orientation in 1997 and gender identity in 2018. Filed with NH Commission for Human Rights. 180-day filing deadline.',
 'EMPLOYMENT', 'STATE', 'NH',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'RSA 354-A:1 to 354-A:26', 'https://www.nh.gov/hrc/', 1),

('nh-emp-003', 'NH-EMP-003', 'New Hampshire Wage Payment Requirements',
 'Employers must pay wages within 8 days after the close of a wage period, or weekly/biweekly on a regular payday. Upon involuntary termination: wages due within 72 hours. Upon voluntary resignation with 1 pay period notice: next regular payday. Without notice: next regular payday. Liquidated damages available for willful violations.',
 'EMPLOYMENT', 'STATE', 'NH',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'RSA 275:43-275:56', 'https://www.nh.gov/labor/inspection/wage-hour/', 1);


-- ============================================================
-- NEW JERSEY
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('nj-emp-001', 'NJ-EMP-001', 'New Jersey Minimum Wage',
 'New Jersey minimum wage is $15.13/hour (2024), CPI indexed annually. Tipped employees: $5.26/hour. Seasonal/small employers (fewer than 6): $13.73 (2024). Agricultural: $12.81 (2024). Workers under 18 with fewer than 5 employees: phased schedule. One of the highest in the nation.',
 'EMPLOYMENT', 'STATE', 'NJ',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'N.J.S.A. 34:11-56a4', 'https://www.nj.gov/labor/wageandhour/tools-resources/minimumwage/', 1),

('nj-emp-002', 'NJ-EMP-002', 'New Jersey Earned Sick Leave',
 'ALL employers must provide up to 40 hours of paid sick leave per year. Accrual: 1 hour per 30 hours worked. Usable after 120 days. Covers: own illness, family member care, school/childcare closure, public health emergency, domestic/sexual violence. No minimum employer size. Effective October 29, 2018.',
 'EMPLOYMENT', 'STATE', 'NJ',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2018-10-29', 'N.J.S.A. 34:11D-1 to 34:11D-11', 'https://www.nj.gov/labor/wageandhour/tools-resources/earned-sick-leave/', 1),

('nj-emp-003', 'NJ-EMP-003', 'New Jersey Family Leave Insurance (FLI) / Temporary Disability Insurance (TDI)',
 'NJ provides: TDI — up to 26 weeks at 85% of wages (capped at ~$1,025/week) for own disability including pregnancy. FLI — up to 12 weeks at 85% of wages for bonding with new child, caring for family member, or supporting family member affected by domestic/sexual violence. Funded through employee payroll deductions. Job protection under NJ FMLA (employers with 30+ employees).',
 'EMPLOYMENT', 'STATE', 'NJ',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.J.S.A. 43:21-25 (TDI); N.J.S.A. 43:21-38 (FLI)', 'https://www.nj.gov/labor/myleavebenefits/', 1),

('nj-emp-004', 'NJ-EMP-004', 'New Jersey Law Against Discrimination (LAD) — Employment',
 'ALL employers (no minimum size) may not discriminate based on: race, creed, color, national origin, nationality, ancestry, age (18+), sex, gender identity/expression, sexual orientation, pregnancy/breastfeeding, disability, genetic information, atypical hereditary cellular or blood trait, marital/civil union/domestic partnership status, familial status, liability for military service, HIV/AIDS status. One of the most comprehensive in the US. No administrative exhaustion required — direct court access. 2-year statute of limitations.',
 'EMPLOYMENT', 'STATE', 'NJ',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.J.S.A. 10:5-1 to 10:5-49', 'https://www.nj.gov/oag/dcr/employment.html', 1);


-- ============================================================
-- NEW MEXICO
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('nm-emp-001', 'NM-EMP-001', 'New Mexico Minimum Wage',
 'New Mexico minimum wage is $12.00/hour (2023). Tipped employees: $3.00/hour with tip credit. Santa Fe: $14.60/hour (2024). Bernalillo County (Albuquerque): $12.00 (follows state). Las Cruces: $12.36 (2024). No CPI indexing at state level.',
 'EMPLOYMENT', 'STATE', 'NM',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2023-01-01', 'NMSA § 50-4-22', 'https://www.dws.state.nm.us/Minimum-Wage-Information', 1),

('nm-emp-002', 'NM-EMP-002', 'New Mexico Healthy Workplaces Act — Paid Sick Leave',
 'ALL employers (regardless of size) must provide up to 64 hours of paid sick leave per year. Accrual: 1 hour per 30 hours worked. Usable immediately. Covers: employee/family member illness, preventive care, domestic abuse, sexual assault. Effective July 1, 2022. One of the more generous sick leave laws (64 hours vs. typical 40).',
 'EMPLOYMENT', 'STATE', 'NM',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2022-07-01', 'NMSA § 50-17-1 to 50-17-12 (HB 20, 2021)', 'https://www.dws.state.nm.us/HWA', 1),

('nm-emp-003', 'NM-EMP-003', 'New Mexico Human Rights Act — Employment Discrimination',
 'Employers with 4+ employees may not discriminate based on: race, age (40+), religion, color, national origin, ancestry, sex (including pregnancy), sexual orientation, gender identity, spousal affiliation, physical/mental disability, serious medical condition. Covers sexual orientation and gender identity since 2003. Filed with NM Human Rights Bureau. 300-day filing deadline.',
 'EMPLOYMENT', 'STATE', 'NM',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'NMSA § 28-1-1 to 28-1-15', 'https://www.dws.state.nm.us/Human-Rights', 1);


-- ============================================================
-- NEW YORK
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ny-emp-001', 'NY-EMP-001', 'New York Minimum Wage',
 'New York minimum wage varies by region: NYC: $16.00/hour (2024). Long Island & Westchester: $16.00/hour. Remainder of state: $15.00/hour (2024). Tipped employees: rates vary by industry and region ($10.65-$13.35). CPI indexed starting 2027. Fast food workers: $16.00 statewide.',
 'EMPLOYMENT', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'N.Y. Labor Law § 652', 'https://dol.ny.gov/minimum-wage', 1),

('ny-emp-002', 'NY-EMP-002', 'New York Paid Sick Leave',
 'ALL employers must provide sick leave. 100+ employees: 56 hours paid. 5-99 employees: 40 hours paid. Under 5 employees with net income $1M+: 40 hours paid. Under 5 with net income under $1M: 40 hours unpaid. Accrual: 1 hour per 30 hours worked. Covers: own illness, family member care, domestic violence/sexual offense/stalking/human trafficking, safe leave.',
 'EMPLOYMENT', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2020-09-30', 'N.Y. Labor Law § 196-b', 'https://dol.ny.gov/paid-sick-leave', 1),

('ny-emp-003', 'NY-EMP-003', 'New York Paid Family Leave (PFL)',
 'New York provides up to 12 weeks of paid family leave at 67% of wages (capped at 67% of state average weekly wage). Funded entirely through employee payroll deductions. Covers: bonding with new child, caring for family member with serious health condition, qualifying military exigency. Administered by employer''s disability benefits carrier. Job protection included.',
 'EMPLOYMENT', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2018-01-01', 'N.Y. Workers'' Comp. Law Art. 9, § 200-242', 'https://paidfamilyleave.ny.gov/', 1),

('ny-emp-004', 'NY-EMP-004', 'New York Human Rights Law — Employment Discrimination',
 'ALL employers (no minimum size, effective 2019) may not discriminate based on: age (18+), race, creed, color, national origin, sexual orientation, gender identity/expression, military status, sex (including pregnancy), disability, predisposing genetic characteristics, marital status, familial status, domestic violence victim status, prior arrest/conviction record (with restrictions), salary history inquiry (prohibited), reproductive health decisions. One of the broadest in the US. Filed with NYS Division of Human Rights (1-year deadline) or directly in court (3-year SOL).',
 'EMPLOYMENT', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.Y. Exec. Law § 290-301 (NY Human Rights Law)', 'https://dhr.ny.gov/', 1),

('ny-emp-005', 'NY-EMP-005', 'New York Sexual Harassment Prevention Training',
 'ALL employers must provide annual interactive sexual harassment prevention training to all employees. Must include: explanation of sexual harassment, examples, information about federal and state protections, complaint processes, and bystander intervention topics. NYC employers with 15+ employees have additional requirements (NYC Local Law 96). Must be provided in the primary language of the employee.',
 'EMPLOYMENT', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2019-10-09', 'N.Y. Labor Law § 201-g; NYC Local Law 96 (2018)', 'https://www.ny.gov/programs/combating-sexual-harassment-workplace', 1),

('ny-emp-006', 'NY-EMP-006', 'New York WARN Act',
 'Employers with 50+ full-time employees must provide 90 days advance written notice (vs. 60 federal) before plant closings, mass layoffs (25+ full-time employees constituting 33% of workforce, or 250+ employees), or major relocations of 50+ miles. Broader than federal: lower thresholds and longer notice period. Penalties: 60 days'' back pay and benefits per employee.',
 'EMPLOYMENT', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.Y. Labor Law § 860-860-i', 'https://dol.ny.gov/warn-act', 1),

('ny-emp-007', 'NY-EMP-007', 'New York Salary Transparency Law',
 'Effective September 17, 2023, ALL employers with 4+ employees must include a compensation range (minimum and maximum salary/hourly rate) in all job advertisements, promotions, and transfer opportunities. Includes postings made by third-party recruiters. Must also include job description if one exists. Penalties: up to $1,000 first violation, $2,000 second, $3,000 subsequent.',
 'EMPLOYMENT', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2023-09-17', 'N.Y. Labor Law § 194-b; S.B. S1326A (2022)', 'https://dol.ny.gov/pay-transparency', 1);


-- ============================================================
-- NORTH CAROLINA
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('nc-emp-001', 'NC-EMP-001', 'North Carolina Minimum Wage',
 'North Carolina minimum wage is $7.25/hour, matching the federal rate. Tipped employees: $2.13/hour with tip credit. NC preempts local governments from setting higher minimum wages. Youth wage: $4.25/hour for employees under 20 during first 90 days.',
 'EMPLOYMENT', 'STATE', 'NC',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.C. Gen. Stat. § 95-25.3', 'https://www.labor.nc.gov/workplace-rights/employee-rights-regarding-time-worked-and-wages-earned/minimum-wage-nc', 1),

('nc-emp-002', 'NC-EMP-002', 'North Carolina Equal Employment Practices Act',
 'NC prohibits discrimination based on race, religion, color, national origin, age, sex, disability by employers with 15+ employees. The NC EEP Act is relatively narrow compared to many states. No coverage for sexual orientation or gender identity. No state administrative agency processes discrimination charges — employees must file with EEOC for federal claims or go directly to state court.',
 'EMPLOYMENT', 'STATE', 'NC',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.C. Gen. Stat. § 143-422.1 to 143-422.3', 'https://www.labor.nc.gov/', 1),

('nc-emp-003', 'NC-EMP-003', 'North Carolina Wage and Hour Act — Payment Requirements',
 'Employers must pay employees at least semi-monthly on regular paydays. Must provide written notice of wage rate, pay schedule, and deduction policies at time of hire. Upon separation: next regular payday. NC allows employees to bring private action for unpaid wages plus liquidated damages (double the amount owed). Must keep records for 3 years.',
 'EMPLOYMENT', 'STATE', 'NC',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.C. Gen. Stat. § 95-25.1 to 95-25.25', 'https://www.labor.nc.gov/workplace-rights/employee-rights-regarding-time-worked-and-wages-earned', 1);


-- ============================================================
-- NORTH DAKOTA
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('nd-emp-001', 'ND-EMP-001', 'North Dakota Minimum Wage',
 'North Dakota minimum wage is $7.25/hour, matching the federal rate. Tipped employees: $4.86/hour (33% less than full minimum). No CPI indexing. ND does not preempt local minimum wage ordinances, but none currently exceed the state rate.',
 'EMPLOYMENT', 'STATE', 'ND',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.D. Cent. Code § 34-06-22', 'https://www.nd.gov/labor/minimum-wage', 1),

('nd-emp-002', 'ND-EMP-002', 'North Dakota Human Rights Act — Employment Discrimination',
 'Employers with 1+ employees may not discriminate based on: race, color, religion, sex, national origin, age (40+), disability, marital status, public assistance status, participation in lawful activity during non-work hours. Does NOT cover sexual orientation or gender identity. Notably covers off-duty lawful activity. Filed with ND Department of Labor. 300-day filing deadline.',
 'EMPLOYMENT', 'STATE', 'ND',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.D. Cent. Code § 14-02.4-01 to 14-02.4-25', 'https://www.nd.gov/labor/human-rights', 1),

('nd-emp-003', 'ND-EMP-003', 'North Dakota Non-Compete — Complete Ban',
 'North Dakota is one of only 4 states (with CA, MN, OK) that completely bans non-compete agreements. Any contract restraining someone from exercising a lawful profession, trade, or business is void. Exception: non-compete in connection with sale of goodwill of a business. Does NOT prohibit non-disclosure or non-solicitation agreements.',
 'EMPLOYMENT', 'STATE', 'ND',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.D. Cent. Code § 9-08-06', 'https://www.legis.nd.gov/cencode/t09c08.pdf', 1);


-- ============================================================
-- OHIO
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('oh-emp-001', 'OH-EMP-001', 'Ohio Minimum Wage',
 'Ohio minimum wage is $10.45/hour (2024) for employers with annual gross receipts of $385,000+. Employers below the threshold: $7.25/hour. Tipped employees: $5.25/hour with tip credit. CPI indexed annually per state constitutional amendment (2006 Issue 2). 14-15 year olds: $7.25/hour.',
 'EMPLOYMENT', 'STATE', 'OH',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'Ohio Const. Art. II, § 34a; Ohio Rev. Code § 4111.02', 'https://com.ohio.gov/divisions-and-programs/industrial-compliance/wage-and-hour/minimum-wage', 1),

('oh-emp-002', 'OH-EMP-002', 'Ohio Civil Rights Act — Employment Discrimination',
 'Employers with 4+ employees may not discriminate based on: race, color, religion, sex (including pregnancy), national origin, disability, age (40+), ancestry, military status. Does NOT cover sexual orientation or gender identity at state level (Columbus, Cleveland, Cincinnati, and others have local protections). Filed with Ohio Civil Rights Commission. 2-year statute of limitations (not 180/300 days like federal).',
 'EMPLOYMENT', 'STATE', 'OH',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Ohio Rev. Code § 4112.01-4112.99', 'https://crc.ohio.gov/', 1),

('oh-emp-003', 'OH-EMP-003', 'Ohio Wage Payment Requirements',
 'Employers must pay employees at least semi-monthly on regular paydays. Upon termination: wages due on the first regular payday following the date of termination (or within 15 days, whichever comes first). Must provide an itemized statement of deductions. Willful failure to pay: liable for amount owed plus 6% damages plus costs/attorney fees.',
 'EMPLOYMENT', 'STATE', 'OH',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Ohio Rev. Code § 4113.15', 'https://com.ohio.gov/divisions-and-programs/industrial-compliance/wage-and-hour/', 1);


-- ============================================================
-- OKLAHOMA
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ok-emp-001', 'OK-EMP-001', 'Oklahoma Minimum Wage',
 'Oklahoma minimum wage is $7.25/hour for employers with 10+ full-time employees at any one location OR annual gross sales exceeding $100,000. Employers below thresholds: $2.00/hour (state rate) but federal FLSA applies if covered. Tipped employees: $2.13/hour with tip credit. Oklahoma preempts local minimum wage laws.',
 'EMPLOYMENT', 'STATE', 'OK',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '40 Okla. Stat. § 197.2-197.16', 'https://www.ok.gov/odol/Wage_and_Hour/Minimum_Wage/', 1),

('ok-emp-002', 'OK-EMP-002', 'Oklahoma Anti-Discrimination Act',
 'Employers with 15+ employees may not discriminate based on: race, color, religion, sex (including pregnancy), national origin, age (40+), disability, genetic information. Mirrors federal protections exactly with same thresholds. Does NOT cover sexual orientation or gender identity. Filed with Oklahoma Office of the Attorney General (human rights unit). 180-day filing deadline.',
 'EMPLOYMENT', 'STATE', 'OK',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '25 Okla. Stat. § 1101-1901', 'https://www.oag.ok.gov/civil-rights', 1),

('ok-emp-003', 'OK-EMP-003', 'Oklahoma Non-Compete — Severe Restrictions',
 'Oklahoma is one of only 4 states (with CA, MN, ND) that broadly restricts non-compete agreements. A person who has been employed as a trade agent, servant, or employee may not be restrained from exercising a lawful profession, trade, or business after termination. Non-solicitation of existing clients using trade secrets IS permitted. Effectively a ban on non-competes with a narrow trade-secret carve-out.',
 'EMPLOYMENT', 'STATE', 'OK',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '15 Okla. Stat. § 217-219A', 'https://www.oscn.net/applications/oscn/index.asp?ftdb=STOKST15', 1);


-- ============================================================
-- OREGON
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('or-emp-001', 'OR-EMP-001', 'Oregon Minimum Wage',
 'Oregon has three-tier minimum wage: Standard: $14.70/hour (2024). Portland metro: $15.95/hour. Nonurban counties: $13.70/hour. CPI indexed annually. No tip credit allowed — tipped employees must receive full minimum wage. Oregon has daily overtime: 1.5x after 10 hours in specific industries (manufacturing, mills, factories).',
 'EMPLOYMENT', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-07-01', 'ORS § 653.025; HB 2391', 'https://www.oregon.gov/boli/workers/pages/minimum-wage.aspx', 1),

('or-emp-002', 'OR-EMP-002', 'Oregon Paid Sick Leave',
 'ALL employers with 10+ employees (6+ in Portland) must provide up to 40 hours of paid sick leave per year. Under 10 (6 in Portland): 40 hours unpaid. Accrual: 1 hour per 30 hours worked (or 1 per 40 hours for employers with fewer than 10). Covers: own illness, family member, public health emergency, domestic violence, harassment, sexual assault, stalking.',
 'EMPLOYMENT', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2016-01-01', 'ORS § 653.601-653.661', 'https://www.oregon.gov/boli/workers/pages/sick-time.aspx', 1),

('or-emp-003', 'OR-EMP-003', 'Oregon Paid Family and Medical Leave Insurance (Paid Leave Oregon)',
 'Oregon provides up to 12 weeks of paid family/medical leave (14 for pregnancy-related conditions). Benefits: up to 100% of wages for lowest earners (capped at 120% of state average weekly wage). Funded through payroll contributions (1% of wages, split 60/40 employee/employer). Covers all employers with 1+ employees. Safe leave included. Effective September 3, 2023.',
 'EMPLOYMENT', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2023-09-03', 'ORS § 657B.010-657B.990', 'https://paidleave.oregon.gov/', 1),

('or-emp-004', 'OR-EMP-004', 'Oregon Anti-Discrimination Laws',
 'ALL employers (1+ employees) may not discriminate based on: race, color, religion, sex (including sexual orientation, gender identity), national origin, marital status, age (18+), disability, family relationships, expunged juvenile record, off-duty tobacco/marijuana use, whistleblower status, workers'' comp claim, military service. Oregon protects age 18+ (broader than federal 40+). Filed with Oregon Bureau of Labor and Industries. 5-year statute of limitations.',
 'EMPLOYMENT', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'ORS § 659A.001-659A.990', 'https://www.oregon.gov/boli/civil-rights/pages/default.aspx', 1),

('or-emp-005', 'OR-EMP-005', 'Oregon Non-Compete Restrictions',
 'Non-compete agreements are voidable unless: (1) employer provides written notice at least 2 weeks before first day of employment; (2) employee is in a professional, technical, or executive position; (3) employee earns at least $113,241/year (2024 threshold, adjusted annually); and (4) limited to 12 months maximum. Must also provide a signed copy to the employee. Effective January 1, 2022.',
 'EMPLOYMENT', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2022-01-01', 'ORS § 653.295', 'https://www.oregon.gov/boli/', 1);


-- ============================================================
-- PENNSYLVANIA
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('pa-emp-001', 'PA-EMP-001', 'Pennsylvania Minimum Wage',
 'Pennsylvania minimum wage is $7.25/hour, matching the federal rate (last increased in 2009). Tipped employees: $2.83/hour with tip credit. Philadelphia: $7.25 (cannot set local minimum due to preemption). Multiple legislative efforts to increase have failed. Overtime at 1.5x for hours over 40/week.',
 'EMPLOYMENT', 'STATE', 'PA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '43 P.S. § 333.104', 'https://www.dli.pa.gov/Individuals/Labor-Management-Relations/llc/minimum-wage/Pages/default.aspx', 1),

('pa-emp-002', 'PA-EMP-002', 'Pennsylvania Human Relations Act — Employment Discrimination',
 'Employers with 4+ employees may not discriminate based on: race, color, religious creed, ancestry, age (40+), sex (including pregnancy), national origin, disability, use of guide/support animal, relationship/association with disabled person, GED vs. diploma, familial status. Does NOT expressly cover sexual orientation or gender identity at state level (Pittsburgh, Philadelphia, and others have local protections). Filed with PA Human Relations Commission. 180-day filing deadline.',
 'EMPLOYMENT', 'STATE', 'PA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '43 P.S. § 951-963', 'https://www.phrc.pa.gov/', 1),

('pa-emp-003', 'PA-EMP-003', 'Pennsylvania Wage Payment and Collection Law',
 'Employers must pay wages on regular paydays designated in advance. Upon separation (voluntary or involuntary): all wages due by the next regular payday. If employer fails to pay: employee can recover wages due plus 25% liquidated damages plus attorney fees and costs. Must provide itemized pay statements. Records must be kept for 3 years.',
 'EMPLOYMENT', 'STATE', 'PA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '43 P.S. § 260.1-260.12', 'https://www.dli.pa.gov/Individuals/Labor-Management-Relations/llc/Pages/Wage-Payment-Collection-Law.aspx', 1);


-- ============================================================
-- RHODE ISLAND
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ri-emp-001', 'RI-EMP-001', 'Rhode Island Minimum Wage',
 'Rhode Island minimum wage is $14.00/hour (2024), rising to $15.00 on January 1, 2025. Tipped employees: $3.89/hour with tip credit. No CPI indexing — increases require legislative action.',
 'EMPLOYMENT', 'STATE', 'RI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'R.I. Gen. Laws § 28-12-3', 'https://dlt.ri.gov/individuals/workplace-protections/minimum-wage', 1),

('ri-emp-002', 'RI-EMP-002', 'Rhode Island Healthy and Safe Families and Workplaces Act — Paid Sick Leave',
 'Employers with 18+ employees must provide up to 40 hours of paid sick and safe leave per year. Under 18 employees: 24 hours unpaid. Accrual: 1 hour per 35 hours worked. Covers: own illness, family member care, school/daycare closure, domestic violence, sexual assault, stalking. Effective July 1, 2018.',
 'EMPLOYMENT', 'STATE', 'RI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2018-07-01', 'R.I. Gen. Laws § 28-57-1 to 28-57-12', 'https://dlt.ri.gov/individuals/workplace-protections/sick-safe-leave', 1),

('ri-emp-003', 'RI-EMP-003', 'Rhode Island Temporary Caregiver Insurance (TCI)',
 'Rhode Island provides up to 6 weeks of paid caregiving leave (bonding with new child or caring for seriously ill family member) at ~60% of wages (capped at ~$1,007/week). Funded through employee payroll deductions. Part of the Temporary Disability Insurance program. Rhode Island was the third state to adopt paid family leave (2014). Job protection for 30 weeks within benefit year.',
 'EMPLOYMENT', 'STATE', 'RI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2014-01-01', 'R.I. Gen. Laws § 28-41-34 to 28-41-42', 'https://dlt.ri.gov/individuals/temporary-disability-insurance/temporary-caregiver-insurance', 1),

('ri-emp-004', 'RI-EMP-004', 'Rhode Island Fair Employment Practices Act',
 'Employers with 4+ employees may not discriminate based on: race, color, religion, sex (including sexual orientation, gender identity/expression), disability, age (40+), country of ancestral origin, domestic abuse victim status, gender identity/expression, homelessness. Rhode Island covers sexual orientation (1995) and gender identity (2001). Filed with RI Commission for Human Rights. 1-year filing deadline.',
 'EMPLOYMENT', 'STATE', 'RI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'R.I. Gen. Laws § 28-5-1 to 28-5-44', 'https://richr.ri.gov/', 1);


-- ============================================================
-- SOUTH CAROLINA
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('sc-emp-001', 'SC-EMP-001', 'South Carolina Minimum Wage',
 'South Carolina has no state minimum wage law. Federal minimum wage of $7.25/hour applies. SC preempts local governments from setting minimum wages (S.C. Code § 6-1-130).',
 'EMPLOYMENT', 'STATE', 'SC',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'No state minimum wage statute; S.C. Code § 6-1-130 (preemption); 29 USC § 206 (federal)', 'https://www.sces.org/', 1),

('sc-emp-002', 'SC-EMP-002', 'South Carolina Human Affairs Law — Employment Discrimination',
 'Employers with 15+ employees may not discriminate based on: race, religion, color, sex (including pregnancy), national origin, age (40+), disability. Mirrors federal protections. Does NOT cover sexual orientation or gender identity. Filed with SC Human Affairs Commission. 180-day filing deadline. Limited state remedies compared to some states.',
 'EMPLOYMENT', 'STATE', 'SC',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'S.C. Code § 1-13-10 to 1-13-110', 'https://www.schac.sc.gov/', 1),

('sc-emp-003', 'SC-EMP-003', 'South Carolina Payment of Wages Act',
 'Employers must provide written notice of wages and pay schedule at time of hire and notify employees 7 days before any change. Upon termination: wages due within 48 hours or the next regular payday (not exceeding 30 days). Employers who fail to pay: liable for treble damages (3x the amount owed). Records: 3 years.',
 'EMPLOYMENT', 'STATE', 'SC',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'S.C. Code § 41-10-10 to 41-10-110', 'https://www.sces.org/', 1);


-- ============================================================
-- SOUTH DAKOTA
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('sd-emp-001', 'SD-EMP-001', 'South Dakota Minimum Wage',
 'South Dakota minimum wage is $11.20/hour (2024), CPI indexed annually. Tipped employees: $5.60/hour (50% of minimum). Youth under 18: $4.775/hour during first 90 days. Established by Initiated Measure 18 (2014). No local government preemption statute.',
 'EMPLOYMENT', 'STATE', 'SD',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'SDCL § 60-11-3', 'https://dlr.sd.gov/employment_laws/minimum_wage.aspx', 1),

('sd-emp-002', 'SD-EMP-002', 'South Dakota Human Relations Act — Employment Discrimination',
 'ALL employers (no minimum size) may not discriminate based on: race, color, creed, religion, sex, ancestry, disability, national origin. Does NOT cover sexual orientation, gender identity, age (federal ADEA applies at 20+ employees), or marital status. Filed with SD Division of Human Rights. 180-day filing deadline. Notably covers all employers regardless of size.',
 'EMPLOYMENT', 'STATE', 'SD',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'SDCL § 20-13-1 to 20-13-56', 'https://dlr.sd.gov/human_rights/', 1);


-- ============================================================
-- TENNESSEE
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('tn-emp-001', 'TN-EMP-001', 'Tennessee Minimum Wage',
 'Tennessee has no state minimum wage law. Federal minimum wage of $7.25/hour applies. Tennessee preempts local governments from establishing minimum wage requirements (T.C.A. § 50-2-112). No state-level tip credit; federal rules apply.',
 'EMPLOYMENT', 'STATE', 'TN',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'No state minimum wage statute; T.C.A. § 50-2-112 (preemption); 29 USC § 206', 'https://www.tn.gov/workforce/employees/labor-laws.html', 1),

('tn-emp-002', 'TN-EMP-002', 'Tennessee Human Rights Act — Employment Discrimination',
 'Employers with 8+ employees may not discriminate based on: race, creed, color, religion, sex, age (40+), national origin, disability. Does NOT cover sexual orientation or gender identity. Tennessee passed a law (SB 1440, 2011) prohibiting local governments from enacting non-discrimination protections broader than state law. Filed with TN Human Rights Commission. 180-day filing deadline.',
 'EMPLOYMENT', 'STATE', 'TN',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'T.C.A. § 4-21-101 to 4-21-1004', 'https://www.tn.gov/humanrights.html', 1),

('tn-emp-003', 'TN-EMP-003', 'Tennessee Wage Regulations',
 'Employers must pay employees at least semi-monthly, with no more than a 5-day delay after end of pay period. Upon separation: next regular payday or within 21 days, whichever occurs last. Must provide an itemized statement of deductions. Tennessee Wage Regulation Act covers employers with 5+ employees. Overtime: follows federal FLSA (no state-specific overtime law).',
 'EMPLOYMENT', 'STATE', 'TN',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'T.C.A. § 50-2-103', 'https://www.tn.gov/workforce/employees/labor-laws.html', 1);


-- ============================================================
-- TEXAS (expanding existing TX-EMP-001)
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('tx-emp-002', 'TX-EMP-002', 'Texas Minimum Wage',
 'Texas minimum wage is $7.25/hour, matching the federal rate. Tipped employees: $2.13/hour with tip credit. Texas preempts local governments from setting minimum wages — Austin''s 2018 attempt was overturned. No CPI indexing.',
 'EMPLOYMENT', 'STATE', 'TX',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Tex. Labor Code § 62.051; Tex. Labor Code § 62.0515 (preemption)', 'https://www.twc.texas.gov/businesses/texas-minimum-wage-law', 1),

('tx-emp-003', 'TX-EMP-003', 'Texas Commission on Human Rights Act — Employment Discrimination',
 'Employers with 15+ employees may not discriminate based on: race, color, disability, religion, sex (including pregnancy), national origin, age (40+), genetic information. Mirrors federal Title VII/ADA/ADEA. Does NOT cover sexual orientation or gender identity. Filed with Texas Workforce Commission Civil Rights Division. 180-day filing deadline. Must file with TWC before going to court.',
 'EMPLOYMENT', 'STATE', 'TX',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Tex. Labor Code § 21.001-21.556', 'https://www.twc.texas.gov/programs/civil-rights-discrimination-complaint', 1),

('tx-emp-004', 'TX-EMP-004', 'Texas Payday Law — Wage Payment Requirements',
 'Employers must pay employees at least semi-monthly for exempt employees, and at least twice per month for non-exempt employees. Upon involuntary separation: wages due within 6 calendar days. Upon voluntary separation: wages due by the next regularly scheduled payday. Overtime: follows federal FLSA. Filed with Texas Workforce Commission. Texas has no state-specific overtime requirement.',
 'EMPLOYMENT', 'STATE', 'TX',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Tex. Labor Code § 61.001-61.095', 'https://www.twc.texas.gov/businesses/texas-payday-law', 1);


-- ============================================================
-- UTAH
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ut-emp-001', 'UT-EMP-001', 'Utah Minimum Wage',
 'Utah minimum wage is $7.25/hour, matching the federal rate. Tipped employees: $2.13/hour with tip credit. Utah preempts local minimum wage laws. No CPI indexing. Youth minimum: $4.25/hour for first 90 days.',
 'EMPLOYMENT', 'STATE', 'UT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Utah Code § 34-40-102', 'https://laborcommission.utah.gov/divisions/antidiscrimination-and-labor/labor/', 1),

('ut-emp-002', 'UT-EMP-002', 'Utah Antidiscrimination Act',
 'Employers with 15+ employees may not discriminate based on: race, color, sex (including pregnancy, childbirth), age (40+), religion, national origin, disability, sexual orientation, gender identity. Utah added sexual orientation and gender identity in 2015 (SB 296, the "Utah Compromise"). Filed with Utah Antidiscrimination and Labor Division. 180-day filing deadline.',
 'EMPLOYMENT', 'STATE', 'UT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Utah Code § 34A-5-101 to 34A-5-112', 'https://laborcommission.utah.gov/divisions/antidiscrimination-and-labor/discrimination/', 1),

('ut-emp-003', 'UT-EMP-003', 'Utah Payment of Wages Requirements',
 'Employers must pay wages within 24 hours of separation if terminated, or by the next regular payday if employee quits. Must pay at least semi-monthly. Employers who fail to timely pay: liable for the amount due plus 5% per day penalty for each day the amount remains unpaid after demand (up to double the wages owed).',
 'EMPLOYMENT', 'STATE', 'UT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Utah Code § 34-28-1 to 34-28-10', 'https://laborcommission.utah.gov/', 1);


-- ============================================================
-- VERMONT
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('vt-emp-001', 'VT-EMP-001', 'Vermont Minimum Wage',
 'Vermont minimum wage is $13.67/hour (2024), CPI indexed annually (but cannot decrease). Tipped employees: $6.84/hour (50% of minimum). Basic wage rate for employees under 18 in first 90 days: $6.84/hour. Overtime at 1.5x for hours over 40/week.',
 'EMPLOYMENT', 'STATE', 'VT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', '21 V.S.A. § 384', 'https://labor.vermont.gov/minimum-wage', 1),

('vt-emp-002', 'VT-EMP-002', 'Vermont Earned Sick Time',
 'ALL employers must provide up to 40 hours of earned sick time per year. Accrual: 1 hour per 52 hours worked. Usable after 1 year of employment (or at date of hire if frontloaded). Covers: own illness, family member care, domestic violence, sexual assault, stalking. Effective January 1, 2017.',
 'EMPLOYMENT', 'STATE', 'VT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2017-01-01', '21 V.S.A. § 481-486', 'https://labor.vermont.gov/earned-sick-time', 1),

('vt-emp-003', 'VT-EMP-003', 'Vermont Fair Employment Practices Act',
 'ALL employers (1+ employees) may not discriminate based on: race, color, religion, national origin, sex (including sexual orientation, gender identity), ancestry, age (18+), place of birth, disability, HIV status, genetic information, crime victim status. Vermont was the second state to add sexual orientation protections (1992). Covers all employers (no minimum size). Filed with VT Human Rights Commission or Attorney General. 1-year filing deadline.',
 'EMPLOYMENT', 'STATE', 'VT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '21 V.S.A. § 495-495h', 'https://hrc.vermont.gov/', 1);


-- ============================================================
-- VIRGINIA
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('va-emp-001', 'VA-EMP-001', 'Virginia Minimum Wage',
 'Virginia minimum wage is $12.41/hour (2025). Tipped employees: $2.13/hour with tip credit. The Virginia Minimum Wage Act (2020) phased increases from $7.25 to $12.00 by 2023. Further increases to $13.50 (2025) and $15.00 (2026) require additional legislative action. No CPI indexing.',
 'EMPLOYMENT', 'STATE', 'VA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2025-01-01', 'Va. Code § 40.1-28.10', 'https://www.doli.virginia.gov/minimum-wage/', 1),

('va-emp-002', 'VA-EMP-002', 'Virginia Human Rights Act — Employment Discrimination',
 'Employers with 5+ employees (15+ for disability) may not discriminate based on: race, color, religion, national origin, sex (including pregnancy, childbirth), age, marital status, sexual orientation, gender identity, disability, veteran status. Virginia added sexual orientation and gender identity in 2020 (Virginia Values Act). Filed with VA Division of Human Rights or Office of Civil Rights. 300-day filing deadline or direct court action within 2 years.',
 'EMPLOYMENT', 'STATE', 'VA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Va. Code § 2.2-3900 to 2.2-3903', 'https://www.oag.state.va.us/programs-initiatives/civil-rights', 1),

('va-emp-003', 'VA-EMP-003', 'Virginia Overtime Wage Act',
 'Effective July 1, 2021, Virginia established its own Overtime Wage Act (previously relied solely on federal FLSA). Employers must pay 1.5x regular rate for hours over 40/week. Creates a private right of action for employees to sue for unpaid overtime. Damages include unpaid wages, liquidated damages, prejudgment interest, and attorney fees. Broader remedies than federal FLSA.',
 'EMPLOYMENT', 'STATE', 'VA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2021-07-01', 'Va. Code § 40.1-29.2', 'https://www.doli.virginia.gov/', 1);


-- ============================================================
-- WASHINGTON
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('wa-emp-001', 'WA-EMP-001', 'Washington Minimum Wage',
 'Washington minimum wage is $16.28/hour (2024), CPI indexed annually. No tip credit — tipped employees must receive full minimum wage. Seattle: $19.97/hour (2024). Tukwila: $20.29 (near airport). SeaTac: $19.71. Washington has one of the highest minimum wages in the US.',
 'EMPLOYMENT', 'STATE', 'WA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'RCW 49.46.020; Initiative 1433', 'https://lni.wa.gov/workers-rights/wages/minimum-wage/', 1),

('wa-emp-002', 'WA-EMP-002', 'Washington Paid Sick Leave',
 'ALL employers must provide at least 1 hour of paid sick leave for every 40 hours worked, with no cap on accrual. Usable after 90 days. Covers: own health, family member care, domestic violence/sexual assault/stalking, workplace/school closure for health-related reasons. No employer-size exemption. Effective January 1, 2018 (Initiative 1433).',
 'EMPLOYMENT', 'STATE', 'WA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2018-01-01', 'RCW 49.46.200-49.46.230; WAC 296-128-600', 'https://lni.wa.gov/workers-rights/leave/paid-sick-leave/', 1),

('wa-emp-003', 'WA-EMP-003', 'Washington Paid Family and Medical Leave (PFML)',
 'Washington provides: up to 12 weeks of family leave, 12 weeks of medical leave, 16 weeks combined per year (18 weeks for pregnancy complications). Benefits: up to 90% of wages (capped at $1,456/week in 2024). Funded through payroll premiums (0.74% of wages, with employer/employee shares varying by size). Covers all employers. Self-employed may opt in. Effective January 1, 2020.',
 'EMPLOYMENT', 'STATE', 'WA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2020-01-01', 'RCW 50A.04-50A.50', 'https://paidleave.wa.gov/', 1),

('wa-emp-004', 'WA-EMP-004', 'Washington Law Against Discrimination (WLAD) — Employment',
 'ALL employers (1+ employees) may not discriminate based on: race, creed, color, national origin, sex (including sexual orientation, gender identity/expression, pregnancy), age (40+), disability, marital status, HIV/Hepatitis C status, citizenship/immigration status, veteran/military status, off-duty use of cannabis. One of the broadest in the US. Washington added off-duty cannabis use protection in 2023. Filed with WA Human Rights Commission. 6-month filing deadline or direct court action.',
 'EMPLOYMENT', 'STATE', 'WA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'RCW 49.60.010-49.60.505', 'https://www.hum.wa.gov/', 1),

('wa-emp-005', 'WA-EMP-005', 'Washington Non-Compete Restrictions',
 'Non-compete agreements are void unless: (1) employee earns $116,593.18+/year (2024, adjusted annually) or independent contractor earns $291,482.95+/year; (2) limited to 18 months; (3) employer pays garden-leave compensation during restricted period if the employee is terminated. Non-competes resulting from layoffs: void unless enforced with garden leave at employee''s base salary. Effective January 1, 2020.',
 'EMPLOYMENT', 'STATE', 'WA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2020-01-01', 'RCW 49.62.010-49.62.900', 'https://lni.wa.gov/', 1);


-- ============================================================
-- WEST VIRGINIA
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('wv-emp-001', 'WV-EMP-001', 'West Virginia Minimum Wage',
 'West Virginia minimum wage is $8.75/hour. Applies to employers with 6+ employees. Tipped employees: $2.62/hour with $6.13 tip credit. Federal rate applies to FLSA-covered employers below the state threshold. No CPI indexing.',
 'EMPLOYMENT', 'STATE', 'WV',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'W.Va. Code § 21-5C-2', 'https://labor.wv.gov/Pages/minimum-wage.aspx', 1),

('wv-emp-002', 'WV-EMP-002', 'West Virginia Human Rights Act — Employment Discrimination',
 'Employers with 12+ employees may not discriminate based on: race, religion, color, national origin, ancestry, sex, age (40+), disability, blindness. Does NOT expressly cover sexual orientation or gender identity. Filed with WV Human Rights Commission. 365-day filing deadline (one of the longest). Higher employee threshold (12) than federal for some protections.',
 'EMPLOYMENT', 'STATE', 'WV',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'W.Va. Code § 5-11-1 to 5-11-20', 'https://hrc.wv.gov/', 1),

('wv-emp-003', 'WV-EMP-003', 'West Virginia Wage Payment and Collection Act',
 'Employers must pay wages at least twice per month (semi-monthly). Upon separation: wages due by the next regular payday. Employers who willfully fail to pay wages: liable for the amount owed plus liquidated damages equal to the amount owed plus reasonable attorney fees. Must provide written statement of deductions.',
 'EMPLOYMENT', 'STATE', 'WV',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'W.Va. Code § 21-5-1 to 21-5-18', 'https://labor.wv.gov/', 1);


-- ============================================================
-- WISCONSIN
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('wi-emp-001', 'WI-EMP-001', 'Wisconsin Minimum Wage',
 'Wisconsin minimum wage is $7.25/hour, matching the federal rate. Tipped employees: $2.33/hour with tip credit. Opportunity employees (under 20): $5.90/hour for first 90 days. Wisconsin preempts local minimum wage laws. No CPI indexing.',
 'EMPLOYMENT', 'STATE', 'WI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Wis. Stat. § 104.01-104.12', 'https://dwd.wisconsin.gov/er/laborstandards/minimumwage.htm', 1),

('wi-emp-002', 'WI-EMP-002', 'Wisconsin Fair Employment Act',
 'Employers with 1+ employees may not discriminate based on: age (40+), race, creed, color, disability, marital status, sex, national origin, ancestry, sexual orientation, arrest/conviction record, military service, use of lawful products off premises during non-work hours, declining to attend meetings about employer''s political/religious opinions, genetic testing. Covers sexual orientation. Filed with WI Department of Workforce Development. 300-day filing deadline.',
 'EMPLOYMENT', 'STATE', 'WI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Wis. Stat. § 111.31-111.395', 'https://dwd.wisconsin.gov/er/civilrights/discrimination/', 1),

('wi-emp-003', 'WI-EMP-003', 'Wisconsin Wage Payment and Collection Law',
 'Employers must pay wages at least monthly (quarterly for certain agricultural workers). Upon termination: wages due by the next regular payday or within 31 days, whichever is earlier. If employee requests earlier payment upon discharge: must pay within 3 days. Must provide itemized statements. Penalties: additional 50% penalty for unreasonable delay plus 100% penalty for intentional violations.',
 'EMPLOYMENT', 'STATE', 'WI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Wis. Stat. § 109.01-109.11', 'https://dwd.wisconsin.gov/er/laborstandards/wageclaim.htm', 1);


-- ============================================================
-- WYOMING
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('wy-emp-001', 'WY-EMP-001', 'Wyoming Minimum Wage',
 'Wyoming minimum wage is $5.15/hour, but federal FLSA minimum of $7.25/hour applies to most employers. The state rate only applies to employers not covered by FLSA (rare). No tip credit statute at state level; federal applies. No CPI indexing.',
 'EMPLOYMENT', 'STATE', 'WY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Wyo. Stat. § 27-4-202', 'https://dws.wyo.gov/dws-division/labor-standards/', 1),

('wy-emp-002', 'WY-EMP-002', 'Wyoming Fair Employment Practices Act',
 'Employers with 2+ employees may not discriminate based on: age (40+), sex, race, creed, color, national origin, ancestry, disability, military status. Does NOT cover sexual orientation or gender identity. Low employee threshold (2+). Filed with Wyoming Department of Workforce Services. 180-day filing deadline.',
 'EMPLOYMENT', 'STATE', 'WY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Wyo. Stat. § 27-9-101 to 27-9-108', 'https://dws.wyo.gov/dws-division/labor-standards/', 1),

('wy-emp-003', 'WY-EMP-003', 'Wyoming Wage Payment Requirements',
 'Employers must pay employees at least semi-monthly. Upon discharge: wages due by the next regular payday. Upon quit: wages due by the next regular payday. Must itemize deductions. Employers who fail to pay: liable for the amount due plus costs and attorney fees. No statutory penalty multiplier.',
 'EMPLOYMENT', 'STATE', 'WY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Wyo. Stat. § 27-4-101 to 27-4-507', 'https://dws.wyo.gov/', 1);

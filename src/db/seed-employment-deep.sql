-- Vernen Legal Compliance — Employment Rules Deep Fill
-- Filling gaps in states with minimal coverage + emerging laws
-- Created: March 17, 2026
--
-- Coverage:
--   Salary history bans, predictive scheduling, drug testing restrictions,
--   workplace violence prevention, heat illness prevention,
--   independent contractor enforcement, wage theft criminalization,
--   jury duty/voting leave, domestic violence leave, bereavement leave,
--   state-specific WARN acts, additional ban-the-box states

-- ============================================================
-- SALARY HISTORY BANS (21 states + DC + territories)
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

-- California already has pay transparency (ca-emp-009)

('co-emp-007', 'CO-EMP-007', 'Colorado Salary History Ban',
 'Employers may not seek or rely on wage history of prospective employees to determine compensation. May not retaliate against applicants who refuse to disclose. Part of the Equal Pay for Equal Work Act. Must include compensation range in all job postings (effective 2021). Violation: $500-$10,000 per violation.',
 'EMPLOYMENT', 'STATE', 'CO',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2021-01-01', 'CRS § 8-5-102; SB 19-085', 'https://cdle.colorado.gov/equalpaytransparency', 1),

('ct-emp-006', 'CT-EMP-006', 'Connecticut Salary History Ban',
 'Employers may not ask about or seek a prospective employee''s wage and salary history. Cannot prohibit employees from voluntarily disclosing. Cannot retaliate against applicants who decline to provide history. Effective January 1, 2019. Part of Connecticut''s broader pay equity framework.',
 'EMPLOYMENT', 'STATE', 'CT',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2019-01-01', 'Conn. Gen. Stat. § 31-40z; PA 18-8', 'https://www.ctdol.state.ct.us/', 1),

('hi-emp-005', 'HI-EMP-005', 'Hawaii Salary History Ban',
 'Employers may not inquire about the salary history of applicants. May not use salary history to determine compensation unless the applicant voluntarily and without prompting discloses. Effective January 1, 2019.',
 'EMPLOYMENT', 'STATE', 'HI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2019-01-01', 'HRS § 378-2.5; SB 2351', 'https://labor.hawaii.gov/', 1),

('il-emp-007', 'IL-EMP-007', 'Illinois Salary History Ban and Pay Transparency',
 'Employers may not screen applicants based on current or prior wages, benefits, or compensation. May not request or require wage history as condition of application, interview, or employment. Effective September 29, 2019. Additionally, effective January 1, 2025 (HB 3129), employers with 15+ employees must include pay scale and benefits in job postings.',
 'EMPLOYMENT', 'STATE', 'IL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2019-09-29', '820 ILCS 112/10 (Equal Pay Act amendment); HB 3129 (2023)', 'https://labor.illinois.gov/', 1),

('md-emp-005', 'MD-EMP-005', 'Maryland Salary History Ban and Pay Transparency',
 'Employers may not seek wage history from applicants or their former employers. May not rely on wage history in determining compensation. Must provide the wage range for a position upon request from applicant. Effective October 1, 2020. Pay Transparency: effective October 1, 2024, all employers must disclose wage range in job postings.',
 'EMPLOYMENT', 'STATE', 'MD',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2020-10-01', 'Md. Code, Lab. & Empl. § 3-304.2; HB 123 (2024)', 'https://www.dllr.state.md.us/', 1),

('ma-emp-006', 'MA-EMP-006', 'Massachusetts Salary History Ban',
 'Employers may not seek the wage or salary history of an applicant from any current or former employer. Applicants may voluntarily disclose after receiving a formal employment offer that includes compensation. One of the first state salary history bans (2018). Part of the Massachusetts Equal Pay Act modernization.',
 'EMPLOYMENT', 'STATE', 'MA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2018-07-01', 'MGL ch. 149, § 105A', 'https://www.mass.gov/info-details/massachusetts-equal-pay-act', 1),

('nj-emp-005', 'NJ-EMP-005', 'New Jersey Salary History Ban and Pay Transparency',
 'Employers may not screen applicants based on salary history or require salary history as a condition of application, interview, or employment. May not seek salary history from current/former employers. Effective January 1, 2020. Additionally, effective June 1, 2025 (SB 2310), employers with 10+ employees must include pay range in all postings.',
 'EMPLOYMENT', 'STATE', 'NJ',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2020-01-01', 'N.J.S.A. 34:6B-20; SB 2310 (2024, pay transparency)', 'https://www.nj.gov/labor/', 1),

('or-emp-006', 'OR-EMP-006', 'Oregon Salary History Ban',
 'Employers may not seek the salary history of an applicant from the applicant or current/former employer before making an offer. May not screen applicants based on salary history. May use salary history to support a wage differential if the differential is based on a bona fide factor. One of the earliest state bans (2017).',
 'EMPLOYMENT', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2017-10-06', 'ORS § 652.220(2)', 'https://www.oregon.gov/boli/', 1),

('wa-emp-006', 'WA-EMP-006', 'Washington Salary History Ban and Pay Transparency',
 'Employers may not seek salary history from applicants or current/former employers. Must disclose the wage scale or salary range of the position and a description of benefits upon the applicant''s request, after the employer has made an offer. Effective July 28, 2019. Pay Transparency (SB 5761, effective 2023): employers with 15+ employees must include pay range in all postings.',
 'EMPLOYMENT', 'STATE', 'WA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2019-07-28', 'RCW 49.58.100-110; SB 5761 (2022)', 'https://lni.wa.gov/', 1),

('va-emp-004', 'VA-EMP-004', 'Virginia Salary History Ban (Public Employers)',
 'State agencies and public employers may not ask about salary history during the application process. Private employers are NOT covered by the state ban (unlike many other states). Some Virginia localities have local ordinances extending to private employers. Effective July 1, 2020.',
 'EMPLOYMENT', 'STATE', 'VA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2020-07-01', 'Va. Code § 2.2-1201.1 (public employers)', 'https://www.dhrm.virginia.gov/', 1);


-- ============================================================
-- PREDICTIVE SCHEDULING LAWS
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('or-emp-007', 'OR-EMP-007', 'Oregon Fair Work Week Act — Predictive Scheduling',
 'Oregon was the first state to enact a statewide predictive scheduling law. Employers with 500+ employees worldwide in retail, hospitality, and food service must: provide written work schedules 14 days in advance, pay predictability pay (1-hour additional for each schedule change with less than 14 days notice), right to rest (10-hour minimum between shifts or 1.5x pay), no retaliation for schedule-related requests. Covers employees making ≤ 2x state minimum wage. Effective July 1, 2018.',
 'EMPLOYMENT', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 '2018-07-01', 'ORS § 653.412-653.477; SB 828 (2017)', 'https://www.oregon.gov/boli/workers/pages/predictive-scheduling.aspx', 1),

('ca-emp-015', 'CA-EMP-015', 'Los Angeles Fair Work Week Ordinance',
 'Retail employers with 300+ employees globally operating in LA must: provide schedules 14 days in advance (10 days initially), offer additional hours to existing part-time employees before hiring new workers, pay predictability premium for schedule changes with less than 14 days notice, right to rest between shifts. Also applies to fast food in LA (separate ordinance). Effective April 1, 2023.',
 'EMPLOYMENT', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 '2023-04-01', 'LAMC § 188.00-188.10 (Fair Work Week); LAMC § 189 (Fast Food)', 'https://wagesla.lacity.org/', 1),

('il-emp-008', 'IL-EMP-008', 'Chicago Fair Workweek Ordinance',
 'Covered employers (100+ employees globally, or 250+ for nonprofits, in building services, healthcare, hotels, manufacturing, restaurants, retail, warehouse) in Chicago must: provide 14-day advance notice of schedules, pay predictability pay for changes (1 hour for additions/schedule changes, 50% for subtractions), right to decline schedule additions with less than 14 days notice, right to rest (10 hours between shifts). Effective July 1, 2020.',
 'EMPLOYMENT', 'STATE', 'IL',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 '2020-07-01', 'Chicago MCC § 1-25-010 through 1-25-090', 'https://www.chicago.gov/city/en/depts/bacp/supp_info/fairworkweek.html', 1),

('ny-emp-008', 'NY-EMP-008', 'NYC Fair Workweek Laws (Fast Food + Retail)',
 'NYC has two predictive scheduling laws. Fast Food (Intro 1396-A): fast food employers with 30+ locations nationally must provide 14-day advance schedules, pay premiums for changes ($10-$75 per change), no clopening shifts without 11-hour gap or $100 premium, offer new shifts to existing workers first. Retail (Intro 1387-A): employers with 20+ employees may not schedule on-call shifts or cancel shifts with less than 72 hours notice. Effective November 2017.',
 'EMPLOYMENT', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 '2017-11-26', 'NYC Admin Code §§ 20-1201 to 20-1272', 'https://www.nyc.gov/site/dca/workers/workersrights/fair-workweek-background.page', 1);


-- ============================================================
-- STATE DRUG TESTING RESTRICTIONS
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ca-emp-016', 'CA-EMP-016', 'California Cannabis and Employment (AB 2188)',
 'Effective January 1, 2024, employers may not discriminate against applicants or employees based on: off-duty cannabis use, or a drug test finding non-psychoactive cannabis metabolites in hair or urine. Employers MAY still: test for psychoactive THC (e.g., oral fluid test), prohibit cannabis possession/use at work, prohibit impairment on the job. Exemptions: building/construction trades, federal contractors, positions requiring federal clearance. Does not affect federal DOT drug testing requirements.',
 'EMPLOYMENT', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'Cal. Gov. Code § 12954; AB 2188 (2022)', 'https://leginfo.legislature.ca.gov/', 1),

('ny-emp-009', 'NY-EMP-009', 'New York Cannabis Employment Protections',
 'The Marijuana Regulation and Taxation Act (MRTA) prohibits employers from refusing to hire, discharging, or discriminating against employees based on legal off-duty cannabis use. Employers may NOT test for cannabis as a condition of employment (with exceptions). Exceptions: federal DOT-regulated positions, positions where cannabis testing is required by federal law or to obtain federal funding, when the employee is impaired at work. No off-duty lawful activity discrimination.',
 'EMPLOYMENT', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2021-03-31', 'N.Y. Labor Law § 201-d; Cannabis Law § 127', 'https://cannabis.ny.gov/', 1),

('nv-emp-005', 'NV-EMP-005', 'Nevada Pre-Employment Marijuana Testing Ban',
 'Nevada prohibits employers from refusing to hire a prospective employee because of a positive marijuana test UNLESS the position is: firefighter, EMT, position requiring operation of a motor vehicle, position that could adversely affect the safety of others, or a position subject to federal DOT testing. First state to broadly ban pre-employment marijuana testing. Effective January 1, 2020.',
 'EMPLOYMENT', 'STATE', 'NV',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2020-01-01', 'NRS § 613.132; AB 132 (2019)', 'https://labor.nv.gov/', 1);


-- ============================================================
-- WORKPLACE VIOLENCE PREVENTION
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ca-emp-017', 'CA-EMP-017', 'California Workplace Violence Prevention (SB 553)',
 'Effective July 1, 2024, virtually ALL California employers must establish and maintain a Workplace Violence Prevention Plan (WVPP). Requirements: written plan, hazard identification/evaluation/correction, violent incident log, training (initial + annual), employee involvement, recordkeeping (5 years). Separate from healthcare-specific SB 1299 (which covers hospitals/clinics). One of the broadest state workplace violence prevention mandates. Exemptions: remote workers, healthcare facilities already subject to Cal/OSHA § 3342.',
 'EMPLOYMENT', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-07-01', 'Cal. Labor Code § 6401.7, 6401.9; SB 553 (2023)', 'https://www.dir.ca.gov/dosh/workplace-violence.html', 1),

('ny-emp-010', 'NY-EMP-010', 'New York Retail Worker Safety Act',
 'Effective March 4, 2025, retail employers with 10+ employees must implement a workplace violence prevention policy and provide annual interactive training to all employees. Employers with 500+ retail employees statewide must additionally install panic buttons (wearable or fixed) by January 1, 2027. Policy must include: risk factors, reporting procedures, retaliation protections. Training: de-escalation, active shooter, use of security alarms.',
 'EMPLOYMENT', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 '2025-03-04', 'N.Y. Labor Law § 27-d; S.B. 8358A (2024)', 'https://dol.ny.gov/', 1);


-- ============================================================
-- HEAT ILLNESS PREVENTION
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ca-emp-018', 'CA-EMP-018', 'California Heat Illness Prevention (Outdoor)',
 'Employers with outdoor workers must provide: access to potable drinking water (at least 1 quart/hour/employee), access to shade when temperature exceeds 80°F, written heat illness prevention plan, training on prevention/recognition/treatment. When temperature exceeds 95°F (High Heat Procedures): mandatory buddy system, pre-shift meetings, increased water/shade access, designated person to call for emergency services. Cal/OSHA indoor heat standard (effective 2024) covers enclosed buildings without adequate cooling.',
 'EMPLOYMENT', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2006-08-21', '8 CCR § 3395 (outdoor); § 3396 (indoor, 2024)', 'https://www.dir.ca.gov/dosh/heatillnessinfo.html', 1),

('wa-emp-007', 'WA-EMP-007', 'Washington Outdoor Heat Exposure Rule',
 'Washington L&I adopted a permanent outdoor heat exposure rule. When temperature reaches 80°F: employers must provide drinking water (1 quart/hour), shade, acclimatization plan for new workers. At 90°F: mandatory 10-minute cool-down rest every 2 hours. At 100°F: mandatory 15-minute rest every hour. Written outdoor heat exposure prevention plan required. Training required. Applies to all outdoor work. One of the more specific state heat rules.',
 'EMPLOYMENT', 'STATE', 'WA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2023-07-17', 'WAC 296-62-095 to 296-62-09560', 'https://lni.wa.gov/safety-health/safety-topics/topics/outdoor-heat-exposure', 1),

('fed-emp-020', 'FED-EMP-020', 'Federal OSHA Heat Illness — National Emphasis Program',
 'OSHA launched a National Emphasis Program (NEP) for heat-related hazards in 2022. While no specific federal heat standard exists yet (proposed rulemaking in progress), OSHA cites employers under the General Duty Clause (Section 5(a)(1)) for heat-related violations. NEP triggers inspections when Heat Index reaches 80°F. Proposed federal standard (expected 2025-2026) would establish: water/rest/shade requirements, acclimatization plans, emergency response procedures, training. Construction and agriculture are highest-risk industries.',
 'EMPLOYMENT', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2022-04-08', 'OSHA NEP CPL 03-00-024; Proposed 29 CFR § 1926.602 (heat)', 'https://www.osha.gov/heat-exposure', 1);


-- ============================================================
-- ADDITIONAL BAN-THE-BOX / FAIR CHANCE STATES
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('co-emp-008', 'CO-EMP-008', 'Colorado Ban-the-Box (Chance to Compete Act)',
 'Employers may not advertise that persons with criminal histories may not apply, or include on an initial application any question about criminal history. After conditional offer, may conduct background check. Must conduct individualized assessment. Effective September 1, 2019 for employers with 11+ employees. Expanded to all employers in 2024.',
 'EMPLOYMENT', 'STATE', 'CO',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2019-09-01', 'CRS § 8-2-130; HB 19-1025', 'https://cdle.colorado.gov/', 1),

('il-emp-009', 'IL-EMP-009', 'Illinois Job Opportunities for Qualified Applicants Act',
 'Employers with 15+ employees may not inquire about criminal history until the applicant has been determined qualified and notified they have been selected for an interview (or, if no interview, until after conditional offer). Exemptions: employers required by law to exclude applicants with certain convictions. Effective January 1, 2015. One of the earlier private-sector ban-the-box laws.',
 'EMPLOYMENT', 'STATE', 'IL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2015-01-01', '820 ILCS 75/1-75/35', 'https://dhr.illinois.gov/', 1),

('ma-emp-007', 'MA-EMP-007', 'Massachusetts CORI Reform / Ban-the-Box',
 'Employers may not ask about criminal history on initial written application. After interview/conditional offer, may conduct Criminal Offender Record Information (CORI) check. Must provide copy to applicant if used adversely. Sealed records and juvenile records may not be used. Misdemeanor convictions: 3-year lookback. Felony convictions: 7-year lookback (some exceptions). Effective November 4, 2010 (first statewide private-sector ban-the-box).',
 'EMPLOYMENT', 'STATE', 'MA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2010-11-04', 'MGL ch. 151B, § 4(9½); CORI Reform Act', 'https://www.mass.gov/cori-reform', 1),

('nj-emp-006', 'NJ-EMP-006', 'New Jersey Opportunity to Compete Act (Ban-the-Box)',
 'Employers with 15+ employees may not make inquiries about criminal history during the initial employment application process. May inquire after the first interview. Must provide written notice of adverse action based on criminal history. Exemptions: law enforcement, corrections, judiciary, positions where criminal history check is required by law. Effective March 1, 2015.',
 'EMPLOYMENT', 'STATE', 'NJ',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2015-03-01', 'N.J.S.A. 34:6B-11 to 34:6B-19', 'https://www.nj.gov/labor/worker-protections/myworkrights/criminalhistory.shtml', 1),

('mn-emp-006', 'MN-EMP-006', 'Minnesota Ban-the-Box',
 'ALL employers (private and public, no minimum size) may not inquire into or consider an applicant''s criminal history on an application or before selecting the applicant for an interview. After conditional offer or interview selection, may inquire. Must conduct individualized assessment. Effective January 1, 2014 for public employers; extended to all private employers effective January 1, 2014.',
 'EMPLOYMENT', 'STATE', 'MN',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2014-01-01', 'Minn. Stat. § 364.021', 'https://mn.gov/mdhr/', 1);


-- ============================================================
-- STATE WARN ACTS (beyond CA and NY already covered)
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('il-emp-010', 'IL-EMP-010', 'Illinois WARN Act',
 'Employers with 75+ full-time employees must provide 60 days notice before plant closings (affecting 50+ employees) or mass layoffs (at least 1/3 of full-time employees AND at least 25 employees, or 250+ employees regardless of percentage). Broader than federal: lower employee threshold (75 vs. 100). Penalties: back pay and benefits for each day of violation, plus $500/day civil penalty to local government.',
 'EMPLOYMENT', 'STATE', 'IL',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, '820 ILCS 65/1-65/99 (IL WARN Act)', 'https://labor.illinois.gov/laws-rules/conmed/warn.html', 1),

('nj-emp-007', 'NJ-EMP-007', 'New Jersey WARN Act (Millville Dallas Airmotive)',
 'One of the strictest state WARN acts. Employers with 100+ full-time employees must provide 90 days advance notice (vs. 60 federal) before mass layoffs (50+ employees at a single establishment). Must provide severance pay equal to 1 week of pay per full year of employment. No exceptions for unforeseeable business circumstances or natural disasters (unlike federal WARN). Effective 2020 amendments significantly expanded protections.',
 'EMPLOYMENT', 'STATE', 'NJ',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 '2020-07-19', 'N.J.S.A. 34:21-1 to 34:21-7', 'https://www.nj.gov/labor/worker-protections/earlywarning/warn/', 1),

('md-emp-006', 'MD-EMP-006', 'Maryland Economic Stabilization Act (Mini-WARN)',
 'Employers with 50+ employees that intend to conduct a reduction in operations affecting 25+ employees must: provide 60 days written notice to affected workers, DLLR, and local government; continue health insurance for affected employees through the notice period; pay displaced workers a voluntary severance (encouraged but not mandatory). Must provide information on unemployment insurance, job training, and re-employment assistance.',
 'EMPLOYMENT', 'STATE', 'MD',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Md. Code, Lab. & Empl. § 11-301 to 11-304', 'https://www.dllr.state.md.us/', 1);


-- ============================================================
-- BEREAVEMENT LEAVE LAWS
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('il-emp-011', 'IL-EMP-011', 'Illinois Child Extended Bereavement Leave Act',
 'Employers with 50+ employees must provide up to 12 weeks of unpaid leave to employees who experience the loss of a child (by death). Also covers loss of pregnancy/stillbirth/miscarriage/unsuccessful assisted reproduction/failed adoption/surrogacy/diagnosis with a terminal illness. Leave must be taken within 60 days of event. Job protection during leave. Effective June 1, 2023.',
 'EMPLOYMENT', 'STATE', 'IL',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 '2023-06-01', '820 ILCS 154/1-154/99 (CEBLA)', 'https://labor.illinois.gov/', 1),

('or-emp-008', 'OR-EMP-008', 'Oregon Bereavement Leave',
 'Under the Oregon Family Leave Act (OFLA), eligible employees may take up to 2 weeks of bereavement leave per deceased family member. May take an additional 2 weeks if another family member dies during the same leave year (total 12 weeks combined OFLA leave). Job protected. Employers with 25+ employees must comply. Separate from Oregon PFML benefits.',
 'EMPLOYMENT', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'ORS § 659A.150-659A.186 (OFLA)', 'https://www.oregon.gov/boli/workers/pages/family-leave.aspx', 1),

('md-emp-007', 'MD-EMP-007', 'Maryland Bereavement Leave',
 'Effective October 1, 2025, employers with 15+ employees must provide at least 5 days of bereavement leave per occurrence for the death of: child, spouse, parent, sibling, grandparent, grandchild, or legal guardian. Leave may be paid or unpaid (at employer''s discretion unless employer has an existing PTO policy). Must be used within specified period after death.',
 'EMPLOYMENT', 'STATE', 'MD',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2025-10-01', 'Md. Code, Lab. & Empl. § 3-802 (HB 699, 2024)', 'https://www.dllr.state.md.us/', 1);


-- ============================================================
-- WAGE THEFT CRIMINALIZATION
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('ca-emp-019', 'CA-EMP-019', 'California Wage Theft Prevention Act',
 'Employers must provide written notice to employees at time of hire containing: rate of pay, overtime rate, allowances claimed as part of minimum wage, regular payday, employer name/address/phone, workers'' comp insurance carrier. Must notify of changes within 7 days. Expanded penalties for wage theft: intentional wage theft is grand theft (felony if over $950). Labor Commissioner can issue citations directly. Employer must post bond if pattern of violations found.',
 'EMPLOYMENT', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2012-01-01', 'Cal. Labor Code § 2810.5; AB 469 (2011); SB 1343', 'https://www.dir.ca.gov/dlse/wage_theft_prevention_act.html', 1),

('co-emp-009', 'CO-EMP-009', 'Colorado Wage Theft Enforcement',
 'Colorado criminalized wage theft effective January 1, 2022 (HB 21-1124). Wage theft (intentional failure to pay wages) is: theft under $2,000: petty offense to misdemeanor; $2,000-$300,000: felony (Class 5/4/3 depending on amount); over $300,000: Class 2 felony. Also provides for treble damages (3x wages owed) in civil actions. Creates wage theft enforcement unit within CDLE.',
 'EMPLOYMENT', 'STATE', 'CO',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2022-01-01', 'CRS § 8-4-120.3; HB 21-1124', 'https://cdle.colorado.gov/', 1),

('mn-emp-007', 'MN-EMP-007', 'Minnesota Wage Theft Prevention',
 'Effective July 1, 2019, wage theft in Minnesota is a criminal offense. Intentional wage theft of $1,000+ is a gross misdemeanor (up to $3,000 fine and 1 year). Theft of $5,000+ in 6 months or $35,000+ in 12 months: felony. Employers must provide written earnings statement with each payment. Written notice of terms at hire. Cannot retaliate against employees reporting wage theft. Penalties multiply for repeat offenders.',
 'EMPLOYMENT', 'STATE', 'MN',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2019-07-01', 'Minn. Stat. § 609.52 subd. 2(17); § 181.032', 'https://www.dli.mn.gov/wage-theft', 1);


-- ============================================================
-- INDEPENDENT CONTRACTOR ENFORCEMENT
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

-- California AB 5 already covered (ca-emp-010)

('ma-emp-008', 'MA-EMP-008', 'Massachusetts Independent Contractor Law (Strictest in US)',
 'Massachusetts uses a 3-prong ABC test that is considered the strictest independent contractor test in the US. A worker is an employee UNLESS ALL three conditions are met: (A) free from control and direction, (B) service is performed outside the employer''s usual course of business, AND (C) worker is customarily engaged in an independently established trade, occupation, or business. Prong B is the key differentiator — makes it nearly impossible to classify workers in the same industry as the hiring entity. Misclassification: treble damages, attorney fees, criminal penalties.',
 'EMPLOYMENT', 'STATE', 'MA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'MGL ch. 149, § 148B', 'https://www.mass.gov/info-details/know-the-law-misclassification', 1),

('nj-emp-008', 'NJ-EMP-008', 'New Jersey ABC Test and Misclassification Penalties',
 'New Jersey uses the ABC test for unemployment and wage/hour claims. Similar to Massachusetts: worker is an employee unless all three prongs met. In 2020, NJ strengthened enforcement: established a task force, increased penalties, and allows stop-work orders for misclassification. Penalties: $5,000 per misclassified employee for first offense; subsequent offenses: additional penalties and potential criminal charges. Also requires posting of notice of employee rights.',
 'EMPLOYMENT', 'STATE', 'NJ',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.J.S.A. 43:21-19(i)(6)(A)-(C); A.B. 5838 (2020)', 'https://www.nj.gov/labor/worker-protections/myworkrights/misclassification.shtml', 1),

('ny-emp-011', 'NY-EMP-011', 'New York Construction Worker Misclassification',
 'New York has specific anti-misclassification provisions for the construction industry. Under the Construction Industry Fair Play Act, construction workers are presumed to be employees unless: (A) free from control/direction AND (B) service is outside the usual course of business AND (C) worker has an independently established business. Penalties: $2,500 per misclassified employee (first offense), $5,000 (subsequent). Criminal penalties: misdemeanor/felony. Stop-work orders. Separate from general employment law.',
 'EMPLOYMENT', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2010-10-26', 'N.Y. Labor Law § 861-d (Construction Industry Fair Play Act)', 'https://dol.ny.gov/construction-industry-fair-play-act', 1);

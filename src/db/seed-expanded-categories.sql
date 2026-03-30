-- Vernen Legal Compliance — Expanded Existing Categories
-- TAXATION, FORMATION, INSURANCE, REPORTING expansions
-- Created: March 17, 2026
--
-- Fills critical gaps in existing categories that every business hits

-- ============================================================
-- EXPANDED FEDERAL TAXATION
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('fed-tax-009', 'FED-TAX-009', 'Federal Estimated Tax Payments (Form 1040-ES / 1120-W)',
 'Businesses and self-employed individuals must make quarterly estimated tax payments if they expect to owe $1,000+ (individuals) or $500+ (corporations) in tax. Due dates: April 15, June 15, September 15, January 15. Underpayment penalty: interest rate on the shortfall. Corporations use Form 1120-W to calculate required installments. Safe harbor: pay 100% of prior year tax (110% for high earners).',
 'TAXATION', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '26 USC § 6654 (individuals); § 6655 (corporations)', 'https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes', 1),

('fed-tax-010', 'FED-TAX-010', 'Federal 1099 Reporting Requirements',
 'Businesses must file information returns: 1099-NEC for non-employee compensation of $600+ (due January 31). 1099-MISC for rents, royalties, other income of $600+. 1099-INT for interest of $10+. 1099-DIV for dividends of $10+. 1099-K for payment card/third-party network transactions meeting thresholds. Must furnish copies to recipients. Penalties: $60-$310 per return (increasing with delay).',
 'TAXATION', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '26 USC § 6041-6050W; IRS Form 1099 series', 'https://www.irs.gov/forms-pubs/about-form-1099-nec', 1),

('fed-tax-011', 'FED-TAX-011', 'Federal W-2 Reporting and Withholding',
 'Employers must furnish Form W-2 to employees by January 31 and file with the Social Security Administration by January 31. Reports wages, tips, compensation, federal/state/local tax withheld, Social Security/Medicare wages. Employers must also file Form W-3 (transmittal). Penalties for late/incorrect W-2s: $60-$310 per form. Electronic filing required if 10+ forms.',
 'TAXATION', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '26 USC § 6051; 26 CFR § 31.6051-1; IRS Form W-2', 'https://www.irs.gov/forms-pubs/about-form-w-2', 1),

('fed-tax-012', 'FED-TAX-012', 'Federal Excise Taxes',
 'Specific industries must pay federal excise taxes: fuel (Form 720), air transportation (7.5% ticket tax), communications (3% tax), heavy vehicle use (Form 2290, $100-$550/year), indoor tanning (10%), medical devices (suspended), alcohol and tobacco (through TTB). Must file quarterly (Form 720) or annually depending on type. Failure to pay: 0.5%/month penalty plus interest.',
 'TAXATION', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '26 USC § 4001-5000C; IRS Form 720', 'https://www.irs.gov/businesses/small-businesses-self-employed/excise-tax', 1),

('fed-tax-013', 'FED-TAX-013', 'Qualified Business Income Deduction (Section 199A)',
 'Owners of pass-through entities (S-Corps, partnerships, LLCs, sole proprietors) may deduct up to 20% of qualified business income (QBI) from taxable income. Subject to limitations based on W-2 wages paid, qualified property, and taxable income thresholds ($182,100 single / $364,200 joint for 2024). Specified service trades or businesses (SSTBs) face additional phase-out. Does not reduce self-employment tax.',
 'TAXATION', 'FEDERAL', NULL,
 '["LLC","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2018-01-01', '26 USC § 199A; IRS Form 8995/8995-A', 'https://www.irs.gov/newsroom/qualified-business-income-deduction', 1),

('fed-tax-014', 'FED-TAX-014', 'Federal Tax Deposit Requirements',
 'Employers must deposit employment taxes (FICA, withheld income tax) on a semi-weekly or monthly schedule based on lookback period. Semi-weekly depositors: deposit by Wednesday (for Wed-Fri pay dates) or Friday (for Sat-Tue pay dates). Monthly depositors: by the 15th of the following month. Must use EFTPS (Electronic Federal Tax Payment System). $100,000 next-day deposit rule. Late deposit penalty: 2%-15% depending on delay.',
 'TAXATION', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '26 USC § 6302; 26 CFR § 31.6302-1; IRS Publication 15', 'https://www.irs.gov/businesses/small-businesses-self-employed/depositing-and-reporting-employment-taxes', 1);


-- ============================================================
-- EXPANDED STATE TAXATION (key states with unique requirements)
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

-- California additional tax rules
('ca-tax-003', 'CA-TAX-003', 'California Income Tax Withholding (PIT)',
 'Employers must withhold California Personal Income Tax (PIT) from employee wages. Rates: 1%-13.3% (highest marginal state rate in the US). Must file quarterly returns (Form DE-9) with EDD. Supplemental wages: 6.6% flat rate (or 10.23% for bonuses over $1 million). Must provide Form W-2 with California withholding amounts.',
 'TAXATION', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Cal. Rev. & Tax. Code § 18501-18510; Cal. Unemp. Ins. Code § 13020-13028', 'https://edd.ca.gov/en/payroll_taxes/rates_and_withholding/', 1),

('ca-tax-004', 'CA-TAX-004', 'California LLC Fee (Gross Receipts)',
 'LLCs with total income of $250,000+ from California sources must pay an annual LLC fee in addition to the $800 franchise tax. Fee schedule: $250K-$499K: $900; $500K-$999K: $2,500; $1M-$4.99M: $6,000; $5M+: $11,790. Due on the 15th day of the 6th month of the taxable year (estimate). True-up on annual return.',
 'TAXATION', 'STATE', 'CA',
 '["LLC"]',
 NULL, 'Cal. Rev. & Tax. Code § 17942', 'https://www.ftb.ca.gov/file/business/types/limited-liability-company/', 1),

-- New York additional taxes
('ny-tax-001', 'NY-TAX-001', 'New York State Income Tax Withholding',
 'Employers must withhold New York state income tax from employee wages. Rates: 4%-10.9% (10.9% on income over $25 million). NYC employers must also withhold NYC income tax (3.078%-3.876%). Yonkers residents: 16.75% surcharge on state tax. Must file quarterly returns (Form NYS-45) with the Department of Taxation and Finance.',
 'TAXATION', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.Y. Tax Law § 671-671-a', 'https://www.tax.ny.gov/bus/wt/wtidx.htm', 1),

('ny-tax-002', 'NY-TAX-002', 'New York Metropolitan Commuter Transportation Mobility Tax (MCTMT)',
 'Employers in the Metropolitan Commuter Transportation District (MCTD — NYC, Rockland, Nassau, Suffolk, Orange, Putnam, Dutchess, Westchester) must pay MCTMT on payroll expense. Rate: 0.34% of payroll for employers with quarterly payroll over $312,500. Self-employed individuals with net earnings from self-employment: 0.34% on income allocated to MCTD. Filed quarterly.',
 'TAXATION', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.Y. Tax Law § 801-807', 'https://www.tax.ny.gov/bus/mctmt/', 1),

-- Texas unique taxes
('tx-tax-003', 'TX-TAX-003', 'Texas No State Income Tax — Implications',
 'Texas has no state personal income tax (TX Const. Art. VIII, § 24-a, approved 2019). Businesses benefit from no state income tax withholding requirements. However, Texas relies heavily on sales tax (6.25% + up to 2% local), property tax (among highest in US — average effective rate ~1.6%), and the franchise tax (margin tax) as alternative revenue sources. Businesses must plan for higher property tax burdens.',
 'TAXATION', 'STATE', 'TX',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'TX Const. Art. VIII, § 24-a; Tex. Tax Code', 'https://comptroller.texas.gov/taxes/', 1),

-- State nexus rules
('fed-tax-015', 'FED-TAX-015', 'Economic Nexus — Post-Wayfair Sales Tax Collection',
 'Following South Dakota v. Wayfair (2018), states may require remote sellers to collect sales tax based on economic activity thresholds without physical presence. Most states: $100,000 in sales OR 200 transactions (some states sales only). Businesses selling across state lines must monitor nexus in each state. Marketplace facilitators (Amazon, Etsy, etc.) must collect in most states. Failure to collect: liability for uncollected tax plus penalties.',
 'TAXATION', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2018-06-21', 'South Dakota v. Wayfair, 585 U.S. 162 (2018); state-specific thresholds', 'https://www.tax.gov/salestax/wayfair/', 1);


-- ============================================================
-- EXPANDED FORMATION RULES
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('fed-form-001', 'FED-FORM-001', 'Federal Entity Classification (Check-the-Box)',
 'Domestic entities with 2+ members default to partnership taxation; single-member entities default to disregarded entity (sole proprietor). Entities may elect different classification using Form 8832. LLCs can elect S-Corp taxation using Form 2553 (due within 75 days of formation or by March 15). Classification affects self-employment tax, payroll, and filing requirements. Once elected, generally cannot change for 60 months.',
 'FORMATION', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 NULL, '26 CFR § 301.7701-1 to 301.7701-3; IRS Form 8832', 'https://www.irs.gov/forms-pubs/about-form-8832', 1),

('fed-form-002', 'FED-FORM-002', 'S-Corporation Election Requirements',
 'To elect S-Corp status, entity must: be a domestic corporation, have only allowable shareholders (individuals, certain trusts, estates — NOT partnerships, corporations, or non-resident aliens), have no more than 100 shareholders, have only one class of stock, not be an ineligible corporation (certain financial institutions, insurance companies). File Form 2553 within 75 days of beginning of tax year or by March 15 for calendar year entities. All shareholders must consent.',
 'FORMATION', 'FEDERAL', NULL,
 '["CORPORATION","S_CORP","LLC"]',
 NULL, '26 USC § 1361-1379; IRS Form 2553', 'https://www.irs.gov/forms-pubs/about-form-2553', 1),

-- Foreign qualification (multi-state operations)
('ca-form-002', 'CA-FORM-002', 'California Foreign Entity Registration',
 'Entities formed outside California that are "transacting intrastate business" in California must register as a foreign entity with the Secretary of State. LLCs: Statement and Designation (Form LLC-5, $70). Corporations: Statement and Designation by Foreign Corporation (Form S&DC-S/N, $100). Must maintain a registered agent in California. Subject to franchise tax ($800 minimum) and Statement of Information filings.',
 'FORMATION', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 NULL, 'Cal. Corp. Code § 2105 (Corp); § 17708.02 (LLC)', 'https://www.sos.ca.gov/business-programs/business-entities/foreign-registration', 1),

('ny-form-001', 'NY-FORM-001', 'New York LLC Publication Requirement',
 'Within 120 days of formation, LLCs and LLPs must publish a copy of the Articles of Organization (or a notice) in two newspapers (one daily, one weekly) in the county where the office is located, for 6 consecutive weeks. Must file a Certificate of Publication with the Department of State after publication. Cost: $200-$2,000+ depending on county. Failure to publish: LLC cannot maintain a lawsuit in NY courts.',
 'FORMATION', 'STATE', 'NY',
 '["LLC","PARTNERSHIP"]',
 NULL, 'N.Y. LLC Law § 206', 'https://dos.ny.gov/forming-limited-liability-company', 1),

('tx-form-002', 'TX-FORM-002', 'Texas Franchise Tax — First Year Reporting',
 'Newly formed Texas entities must file an initial franchise tax report with the Comptroller. First report is due the year after the entity was formed (covers the accounting period from formation through the end of that first year). Even if no tax is due, the report AND the Public Information Report must be filed. Failure to file: entity''s right to transact business may be forfeited by the Secretary of State.',
 'FORMATION', 'STATE', 'TX',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Tex. Tax Code § 171.001; Secretary of State Business Organizations Code', 'https://comptroller.texas.gov/taxes/franchise/filing-requirements.php', 1),

('de-form-002', 'DE-FORM-002', 'Delaware Registered Agent Requirement',
 'All entities formed in Delaware must maintain a registered agent with a physical address in Delaware. The registered agent receives service of process and official state correspondence. Annual franchise tax payment requires registered agent information. Many national registered agent services operate in Delaware specifically for this purpose. Failure to maintain: entity may be voided by the Secretary of State.',
 'FORMATION', 'STATE', 'DE',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, '8 Del. C. § 131-132 (Corp); 6 Del. C. § 18-104 (LLC)', 'https://corp.delaware.gov/', 1),

('fl-form-002', 'FL-FORM-002', 'Florida Sunbiz Annual Report',
 'All business entities (LLCs, corporations, LPs) must file an Annual Report with the Division of Corporations (Sunbiz) between January 1 and May 1 each year. Fee: $138.75 (corporations/LLCs). Reports officer/director/member information, registered agent, and principal address. Late filing: $400 late fee. Failure to file: entity administratively dissolved/revoked. Reinstatement possible within defined time periods.',
 'FORMATION', 'STATE', 'FL',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Fla. Stat. § 607.1622 (Corp); § 605.0212 (LLC)', 'https://dos.fl.gov/sunbiz/manage-business/annual-reports/', 1);


-- ============================================================
-- EXPANDED INSURANCE RULES
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('fed-ins-003', 'FED-INS-003', 'ACA Employer Shared Responsibility (Employer Mandate)',
 'Applicable Large Employers (ALEs — 50+ full-time equivalent employees) must offer minimum essential health coverage that is affordable and provides minimum value to at least 95% of full-time employees and their dependents. Failure to offer: $2,970 per full-time employee (minus 30) in 2024. Offer not affordable/minimum value: $4,460 per employee receiving a premium tax credit. File Forms 1094-C and 1095-C annually.',
 'INSURANCE', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 '2015-01-01', '26 USC § 4980H; 26 CFR § 54.4980H; IRS Form 1094-C/1095-C', 'https://www.irs.gov/affordable-care-act/employers/employer-shared-responsibility-provisions', 1),

('fed-ins-004', 'FED-INS-004', 'Federal Flood Insurance (NFIP)',
 'Businesses located in Special Flood Hazard Areas (SFHA) with federally-backed mortgages MUST carry flood insurance under the National Flood Insurance Program. Standard commercial policy maximum: $500,000 (building) + $500,000 (contents). Private flood insurance may satisfy the requirement. Lenders must force-place flood insurance if borrower fails to maintain. Some communities have not adopted FEMA flood maps — verify with local floodplain manager.',
 'INSURANCE', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '42 USC § 4001-4131; 44 CFR Parts 59-77', 'https://www.fema.gov/flood-insurance', 1),

-- State-specific insurance requirements
('ca-ins-003', 'CA-INS-003', 'California State Disability Insurance (SDI)',
 'All California employers must participate in SDI through payroll deductions from employees (1.1% of wages up to $153,164 in 2024). Provides up to 52 weeks of partial wage replacement for non-work-related illness, injury, or pregnancy. Employers may opt for a voluntary plan (VP) that provides equivalent or better benefits. Managed by EDD. Separate from workers'' compensation.',
 'INSURANCE', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Cal. Unemp. Ins. Code § 2601-3308', 'https://edd.ca.gov/en/disability/', 1),

('ny-ins-001', 'NY-INS-001', 'New York Disability Benefits Law (DBL)',
 'All employers with 1+ employees must provide disability benefits insurance covering off-the-job injuries and illnesses. Benefits: 50% of average weekly wage (capped at $170/week). Duration: up to 26 weeks. Funded through employee payroll deductions and/or employer contributions. Must obtain coverage through a licensed carrier, State Insurance Fund, or self-insurance.',
 'INSURANCE', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.Y. Workers'' Comp. Law § 200-242 (Art. 9)', 'https://www.wcb.ny.gov/content/main/DisabilityBenefits/Employer/aboutDBL.jsp', 1),

('nj-ins-001', 'NJ-INS-001', 'New Jersey Temporary Disability Insurance (TDI)',
 'All employers must provide temporary disability insurance covering non-work-related injuries, illnesses, and pregnancy. Benefits: up to 85% of average weekly wage (capped at $1,025/week in 2024). Duration: up to 26 weeks. Funded through employer and employee payroll contributions. New Jersey was the first state to adopt mandatory TDI (1948).',
 'INSURANCE', 'STATE', 'NJ',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.J.S.A. 43:21-25 to 43:21-56', 'https://www.nj.gov/labor/myleavebenefits/worker/tdi/', 1),

('hi-ins-001', 'HI-INS-001', 'Hawaii Temporary Disability Insurance (TDI)',
 'All employers with 1+ employees must provide TDI for employees working 20+ hours/week for 14+ weeks. Benefits: 58% of average weekly wage (capped at ~$756/week). Duration: up to 26 weeks. Employer must pay at least 50% of premium cost. Hawaii TDI is separate from the Prepaid Health Care Act (which requires health insurance).',
 'INSURANCE', 'STATE', 'HI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'HRS § 392-1 to 392-91', 'https://labor.hawaii.gov/dcd/', 1),

-- Professional liability
('fed-ins-005', 'FED-INS-005', 'Professional Liability Insurance (E&O/Malpractice)',
 'While not universally mandated by federal law, professional liability insurance is effectively required for many licensed professions: medical malpractice (required by most hospitals and many states), legal malpractice (required in OR, ID for malpractice fund), E&O insurance for insurance agents (required by many state insurance departments), E&O for securities professionals (FINRA Rule 3130). Industry standards and licensing boards often mandate coverage levels.',
 'INSURANCE', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'Various state statutes; FINRA Rules; hospital credentialing standards', 'https://www.ama-assn.org/practice-management/sustainability/medical-liability-reform', 1),

-- Contractor bonding
('fed-ins-006', 'FED-INS-006', 'Federal Miller Act — Performance and Payment Bonds',
 'Contractors performing federal construction contracts exceeding $150,000 must furnish performance and payment bonds under the Miller Act. Performance bond: guarantees completion of the contract. Payment bond: guarantees payment to subcontractors and suppliers. Bond amount generally equal to contract price. Subcontractors have 90 days from last labor/materials to file claim. Federal projects only — state equivalents (Little Miller Acts) apply to state/local projects.',
 'INSURANCE', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '40 USC § 3131-3134', 'https://www.sba.gov/federal-contracting/contracting-guide/bonding-requirements', 1);


-- ============================================================
-- EXPANDED REPORTING RULES
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('fed-rep-002', 'FED-REP-002', 'IRS Form 941 — Quarterly Employment Tax Return',
 'Employers must file Form 941 quarterly to report: income taxes withheld, employer and employee Social Security/Medicare taxes, and current quarter adjustments. Due dates: April 30, July 31, October 31, January 31. Must reconcile with Form W-2 annually. Small employers ($1,000 or less annual tax liability) may file Form 944 annually instead. Late filing penalty: 5%/month up to 25%.',
 'REPORTING', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '26 USC § 6011; IRS Form 941', 'https://www.irs.gov/forms-pubs/about-form-941', 1),

('fed-rep-003', 'FED-REP-003', 'OSHA Injury and Illness Recordkeeping (Form 300/300A/301)',
 'Employers with 11+ employees (certain industries exempt) must maintain OSHA Form 300 (Log of Work-Related Injuries and Illnesses) and Form 301 (Incident Report). Form 300A (Annual Summary) must be posted February 1-April 30. Certain high-hazard industries must electronically submit Form 300A data annually. Severe injury/illness reporting: fatality within 8 hours, hospitalization/amputation/eye loss within 24 hours.',
 'REPORTING', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '29 CFR Part 1904', 'https://www.osha.gov/recordkeeping/', 1),

('fed-rep-004', 'FED-REP-004', 'FinCEN Currency Transaction Reports (CTR) and Suspicious Activity Reports (SAR)',
 'Financial institutions must file CTR (Form 112) for cash transactions over $10,000 within 15 days. SARs must be filed within 30 days of detection (60 days if no suspect identified) for transactions of $5,000+ that are suspicious. Must maintain records for 5 years. Applies to banks, credit unions, money services businesses, casinos, securities/futures firms. SAR filing is confidential — must not notify the subject.',
 'REPORTING', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '31 USC § 5313 (CTR); 31 USC § 5318(g) (SAR); 31 CFR § 1010.310-1010.320', 'https://www.fincen.gov/resources/filing-information', 1),

('fed-rep-005', 'FED-REP-005', 'SEC Periodic Reporting (10-K, 10-Q, 8-K)',
 'Public companies registered with the SEC must file: Form 10-K (annual report, due 60-90 days after fiscal year end), Form 10-Q (quarterly report, due 40-45 days after quarter end), Form 8-K (current reports within 4 business days of triggering events). Must comply with Regulation S-X (financial statements), Regulation S-K (non-financial disclosures), and SOX requirements. Insider transactions reported on Form 4 within 2 business days.',
 'REPORTING', 'FEDERAL', NULL,
 '["CORPORATION"]',
 NULL, '15 USC § 78m (Exchange Act § 13); SEC Regulation S-K, S-X', 'https://www.sec.gov/forms', 1),

('fed-rep-006', 'FED-REP-006', 'Annual Return/Report of Employee Benefit Plan (Form 5500)',
 'Sponsors of employee benefit plans (pension, 401(k), health, welfare) with 100+ participants must file Form 5500 annually with the Department of Labor. Small plans (under 100): Form 5500-SF. One-participant plans: Form 5500-EZ. Due by the last day of the 7th month after plan year end (July 31 for calendar year plans). Extension: 2.5 months via Form 5558. Failure to file: $250/day penalty (up to $150,000).',
 'REPORTING', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 NULL, '29 USC § 1024; 29 CFR Part 2520; DOL/IRS Form 5500', 'https://www.dol.gov/agencies/ebsa/employers-and-advisers/plan-administration-and-compliance/reporting-and-filing/form-5500', 1);


-- ============================================================
-- NEW CATEGORY: ENVIRONMENTAL (Federal)
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('fed-env-001', 'FED-ENV-001', 'Clean Air Act — Stationary Source Permits',
 'Facilities emitting air pollutants above major source thresholds must obtain: New Source Review permits (for construction/modification of major sources), Title V Operating Permits (for ongoing operations). Thresholds vary by pollutant and attainment status (100/250 tons/year). Must install Best Available Control Technology (BACT) or Lowest Achievable Emission Rate (LAER). Annual compliance certifications. Most permits administered by state agencies.',
 'ENVIRONMENTAL', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '42 USC § 7401-7671q; 40 CFR Parts 50-97', 'https://www.epa.gov/clean-air-act-overview', 1),

('fed-env-002', 'FED-ENV-002', 'Clean Water Act — NPDES Discharge Permits',
 'Facilities discharging pollutants from point sources into waters of the United States must obtain National Pollutant Discharge Elimination System (NPDES) permits. Covers: industrial discharges, stormwater from construction (1+ acre) and industrial sites, municipal separate storm sewers. Permits set technology-based and water quality-based effluent limits. Must monitor, record, and report discharge data. Administered primarily by states.',
 'ENVIRONMENTAL', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '33 USC § 1251-1387; 40 CFR Parts 122-125', 'https://www.epa.gov/npdes', 1),

('fed-env-003', 'FED-ENV-003', 'RCRA — Hazardous Waste Management',
 'Generators, transporters, and facilities treating, storing, or disposing of hazardous waste must comply with RCRA. Generators classified by volume: Very Small (<100 kg/month), Small (100-1,000 kg/month), Large (1,000+ kg/month). Must obtain EPA ID number, use manifest system, maintain records, meet storage time limits. Large generators: biennial report. TSD facilities require RCRA permits. "Cradle to grave" tracking.',
 'ENVIRONMENTAL', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '42 USC § 6921-6939g; 40 CFR Parts 260-282', 'https://www.epa.gov/rcra', 1),

('fed-env-004', 'FED-ENV-004', 'CERCLA/Superfund — Environmental Liability',
 'Current and former owners/operators of contaminated properties, generators of hazardous substances, and transporters may be held strictly liable for cleanup costs under CERCLA. Liability is joint and several, strict, and retroactive. Innocent landowner, bona fide prospective purchaser, and contiguous property owner defenses available if all appropriate inquiries conducted (Phase I Environmental Site Assessment per ASTM E1527-21). Cleanup costs can be millions.',
 'ENVIRONMENTAL', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '42 USC § 9601-9675; 40 CFR Part 300 (NCP)', 'https://www.epa.gov/superfund', 1),

('fed-env-005', 'FED-ENV-005', 'EPCRA — Emergency Planning and Community Right-to-Know',
 'Facilities storing or using hazardous chemicals above threshold planning quantities must: notify State Emergency Response Commission (SERC) and Local Emergency Planning Committee (LEPC), submit Safety Data Sheets (SDS) or list of chemicals, file annual Tier II inventory reports (March 1 deadline), and report releases exceeding reportable quantities to National Response Center (800-424-8802). Toxic Release Inventory (TRI) reporting required for certain facilities.',
 'ENVIRONMENTAL', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '42 USC § 11001-11050; 40 CFR Parts 350-372', 'https://www.epa.gov/epcra', 1),

('fed-env-006', 'FED-ENV-006', 'TSCA — Toxic Substances Control Act',
 'Manufacturers and importers of chemical substances must submit pre-manufacture notifications (PMNs) to EPA 90 days before manufacturing or importing new chemicals. Must comply with Significant New Use Rules (SNURs). Recordkeeping and reporting for existing chemicals. TSCA Title VI: formaldehyde emission standards for composite wood products. Updated by the Frank R. Lautenberg Chemical Safety Act (2016).',
 'ENVIRONMENTAL', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 NULL, '15 USC § 2601-2697; 40 CFR Parts 700-799', 'https://www.epa.gov/tsca-inventory', 1);


-- ============================================================
-- NEW CATEGORY: ACCESSIBILITY (Federal)
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('fed-acc-001', 'FED-ACC-001', 'ADA Title III — Public Accommodations Accessibility',
 'Private businesses that are public accommodations (12 categories including restaurants, hotels, theaters, retail stores, banks, hospitals, museums, gyms, schools) must: remove architectural barriers in existing facilities where readily achievable, ensure new construction and alterations are accessible, provide auxiliary aids/services for effective communication. DOJ enforcement. Settlements regularly exceed $100,000. Applies regardless of employer size.',
 'ACCESSIBILITY', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '1992-01-26', '42 USC § 12181-12189; 28 CFR Part 36; ADA Standards for Accessible Design', 'https://www.ada.gov/topics/title-iii/', 1),

('fed-acc-002', 'FED-ACC-002', 'Web Accessibility — ADA Digital Compliance',
 'The DOJ has consistently taken the position that websites and mobile applications of public accommodations must be accessible to individuals with disabilities under ADA Title III. Web Content Accessibility Guidelines (WCAG) 2.1 Level AA is the de facto standard. DOJ issued final rule (2024) requiring state/local government websites to comply with WCAG 2.1 AA. Private sector: no specific technical standard mandated, but WCAG 2.1 AA is the safe harbor. ADA website lawsuits exceed 4,000 per year.',
 'ACCESSIBILITY', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '42 USC § 12182; 28 CFR Part 35 (Title II digital rule, 2024); WCAG 2.1', 'https://www.ada.gov/resources/web-guidance/', 1),

('fed-acc-003', 'FED-ACC-003', 'Section 508 — Federal Electronic and Information Technology',
 'Federal agencies and contractors providing electronic and information technology to the federal government must ensure products are accessible to people with disabilities. Applies to: websites, software, hardware, multimedia, telecommunications, and documents. Must conform to the Revised 508 Standards (incorporating WCAG 2.0 Level AA). Affects any business providing technology products/services to federal agencies.',
 'ACCESSIBILITY', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 '2001-06-25', '29 USC § 794d; 36 CFR Part 1194', 'https://www.section508.gov/', 1),

('fed-acc-004', 'FED-ACC-004', 'Fair Housing Act — Accessible Design Requirements',
 'Multi-family housing with 4+ units built for first occupancy after March 13, 1991 must include: accessible building entrance on accessible route, accessible common and public use areas, accessible doors wide enough for wheelchairs, accessible routes into/through dwelling units, light switches/electrical outlets/environmental controls in accessible locations, reinforced bathroom walls for grab bar installation, usable kitchens and bathrooms.',
 'ACCESSIBILITY', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 '1991-03-13', '42 USC § 3604(f)(3)(C); 24 CFR Part 100', 'https://www.hud.gov/program_offices/fair_housing_equal_opp/disabilities/fhefhag', 1);


-- ============================================================
-- NEW CATEGORY: CORPORATE GOVERNANCE
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('fed-gov-001', 'FED-GOV-001', 'Sarbanes-Oxley Act (SOX) — Public Company Governance',
 'Public companies must: maintain internal controls over financial reporting (Section 302/404), ensure auditor independence, establish audit committees, protect whistleblowers, certify financial statements (CEO/CFO personally liable for material misstatements). Section 404 requires annual management assessment and independent audit of internal controls. Criminal penalties for fraud: up to 20 years imprisonment. Applies to public companies and their auditors.',
 'CORPORATE_GOVERNANCE', 'FEDERAL', NULL,
 '["CORPORATION"]',
 '2002-07-30', '15 USC § 7201-7266 (Sarbanes-Oxley Act of 2002)', 'https://www.sec.gov/about/laws/soa2002.pdf', 1),

('de-gov-001', 'DE-GOV-001', 'Delaware Corporate Governance Requirements',
 'Delaware corporations must: hold annual stockholder meetings, maintain accurate books and records, keep a stock ledger and list of stockholders, observe corporate formalities (board meetings, resolutions, minutes), file annual franchise tax returns with the Secretary of State. Directors owe fiduciary duties of care and loyalty under Delaware law. Business judgment rule provides deference to informed, good-faith decisions. Delaware Chancery Court is the primary forum for corporate disputes.',
 'CORPORATE_GOVERNANCE', 'STATE', 'DE',
 '["CORPORATION","S_CORP"]',
 NULL, '8 Del. C. § 211 (meetings), § 220 (inspection rights), § 222-228 (notice/voting)', 'https://corp.delaware.gov/', 1),

('ca-gov-001', 'CA-GOV-001', 'California Corporate Governance — Board Diversity',
 'California previously required publicly held corporations headquartered in CA to have minimum female directors (SB 826, 2018) and directors from underrepresented communities (AB 979, 2020). Both laws were struck down by courts as unconstitutional. However, corporations must still: hold annual shareholder meetings, maintain records, file Statements of Information, and comply with California Corporations Code governance requirements. Board diversity disclosure may still be required under SEC rules.',
 'CORPORATE_GOVERNANCE', 'STATE', 'CA',
 '["CORPORATION","S_CORP"]',
 NULL, 'Cal. Corp. Code § 600 (meetings), § 1500 (records), § 1502 (SOI)', 'https://www.sos.ca.gov/business-programs/business-entities/', 1),

('fed-gov-002', 'FED-GOV-002', 'Corporate Transparency Act — Beneficial Ownership Compliance',
 'Most companies must report beneficial ownership information to FinCEN, including: name, date of birth, address, and identification document of each beneficial owner (25%+ ownership or substantial control). New companies: file within 30 days of formation. Existing companies: ongoing obligation to keep information current (update within 30 days of changes). 23 categories of exempt entities. Willful violation: $500/day civil penalty, up to $10,000 and 2 years criminal penalty.',
 'CORPORATE_GOVERNANCE', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 '2024-01-01', '31 USC § 5336; 31 CFR Part 1010.380', 'https://www.fincen.gov/boi', 1);

-- Vernen Legal Compliance — Oregon Compliance Rules (Part 3)
-- LICENSING, PRIVACY, INSURANCE categories
-- Created: April 5, 2026
--
-- Coverage:
--   LICENSING (40 rules): CCB, OLCC, OHA, professional boards, cannabis, DEQ, real estate
--   PRIVACY (30 rules): OCPA (SB 619), Identity Theft Protection Act, student privacy, biometrics
--   INSURANCE (30 rules): Workers' comp, Paid Leave Oregon, unemployment, health, auto, professional liability

-- ============================================================
-- OREGON LICENSING RULES (40 rules)
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

-- CCB — Construction Contractors Board
('or-lic-001', 'OR-LIC-001', 'Construction Contractors Board License Required',
 'All contractors performing construction work in Oregon must hold an active CCB license before advertising, bidding, or performing work. Includes new construction, remodeling, repair, and demolition. Unlicensed contracting is a Class A misdemeanor with fines up to $5,000 per offense. Applies to general contractors, specialty contractors, and home builders.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 701.021', 'https://www.oregon.gov/ccb/Pages/index.aspx', 1),

('or-lic-002', 'OR-LIC-002', 'CCB Residential Contractor Surety Bond',
 'Residential contractors must maintain a surety bond of $20,000 filed with the CCB. Bond covers damages to property owners for breach of contract, negligent or improper work, and failure to pay subcontractors or suppliers. Bond must remain in force for the duration of the license and two years after expiration.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 701.068', 'https://www.oregon.gov/ccb/Pages/index.aspx', 1),

('or-lic-003', 'OR-LIC-003', 'CCB Commercial Contractor Surety Bond',
 'Commercial general contractors (Category A) must maintain a surety bond of $75,000. Commercial specialty contractors (Category B) must maintain $20,000. Commercial developer contractors must maintain $75,000. Bond protects against breach of contract, negligent work, and unpaid subcontractors or suppliers on commercial projects.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 701.068(3)', 'https://www.oregon.gov/ccb/Pages/index.aspx', 1),

('or-lic-004', 'OR-LIC-004', 'CCB Continuing Education for Contractors',
 'Licensed contractors must complete continuing education requirements each license period. Residential contractors: 16 hours per 2-year period including Oregon laws, lead-based paint, and business practices. Commercial contractors: additional safety and code requirements. Failure to complete CE before renewal results in license lapse.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 701.126', 'https://www.oregon.gov/ccb/Pages/index.aspx', 1),

('or-lic-005', 'OR-LIC-005', 'CCB Workers Compensation Insurance Requirement',
 'All licensed contractors with employees, including part-time and seasonal workers, must carry workers compensation insurance and file proof with the CCB. Sole proprietors and partners may elect exemption by filing a certificate. Failure to maintain coverage results in CCB license suspension and penalties under ORS 656.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 701.035(3)', 'https://www.oregon.gov/ccb/Pages/index.aspx', 1),

-- OLCC — Oregon Liquor and Cannabis Commission
('or-lic-006', 'OR-LIC-006', 'OLCC Full On-Premises Liquor License',
 'Required for establishments selling distilled spirits, wine, and malt beverages for on-premises consumption (bars, restaurants, hotels). Application fee $400, annual renewal fee $400. Requires server education (OLCC alcohol server permit for all servers within 30 days of hire). Background checks for all principals.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 471.155', 'https://www.oregon.gov/olcc/Pages/index.aspx', 1),

('or-lic-007', 'OR-LIC-007', 'OLCC Limited On-Premises Liquor License',
 'For establishments selling only malt beverages (beer), wine, and cider for on-premises consumption. Lower fee structure than full on-premises. Application fee $200, annual renewal $200. Same server education requirements apply. Suitable for brewpubs, wine bars, and small restaurants.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 471.178', 'https://www.oregon.gov/olcc/Pages/index.aspx', 1),

('or-lic-008', 'OR-LIC-008', 'OLCC Off-Premises Liquor License',
 'Required for retail sale of packaged alcohol for off-premises consumption (grocery stores, convenience stores, package stores). Annual renewal required. Must comply with hours-of-sale restrictions (7:00 AM to 2:30 AM). Minors may not sell or serve alcohol. Must post OLCC license visibly.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 471.186', 'https://www.oregon.gov/olcc/Pages/index.aspx', 1),

('or-lic-009', 'OR-LIC-009', 'OLCC Brewery License',
 'Required for manufacturing malt beverages in Oregon. Includes privilege to sell at retail on the licensed premises. May operate up to 5 retail locations. Must comply with federal TTB Brewer Notice requirements concurrently. Annual reporting of production volume required.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 471.220', 'https://www.oregon.gov/olcc/Pages/index.aspx', 1),

('or-lic-010', 'OR-LIC-010', 'OLCC Winery License',
 'Required for manufacturing wine in Oregon. Includes privilege to sell at retail on the licensed premises, at farmers markets, and at up to 5 additional retail locations. Must hold concurrent federal TTB Basic Permit. May self-distribute. Annual production reporting required.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 471.223', 'https://www.oregon.gov/olcc/Pages/index.aspx', 1),

-- Oregon Health Authority
('or-lic-011', 'OR-LIC-011', 'OHA Healthcare Facility License',
 'Hospitals, ambulatory surgical centers, birthing centers, freestanding emergency departments, and special inpatient care facilities must be licensed by Oregon Health Authority. Annual renewal. Subject to unannounced inspections. Must maintain patient rights policies, infection control programs, and quality assurance. Civil penalties up to $500 per day per violation.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 '2024-01-01', 'ORS § 441.015', 'https://www.oregon.gov/oha/PH/PROVIDERPARTNERRESOURCES/Pages/index.aspx', 1),

('or-lic-012', 'OR-LIC-012', 'OHA Long-Term Care Facility License',
 'Nursing facilities, assisted living facilities, residential care facilities, and adult foster homes must be licensed by OHA. Staffing ratios mandated (1:8 for RCFs). Annual surveys and complaint investigations. Administrator must hold valid license. Civil penalties up to $500/day; criminal penalties for egregious violations.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 '2024-01-01', 'ORS § 441.025', 'https://www.oregon.gov/oha/PH/PROVIDERPARTNERRESOURCES/Pages/index.aspx', 1),

-- Professional Licensing Boards
('or-lic-013', 'OR-LIC-013', 'Oregon Plumbing License',
 'Journey-level plumbers must hold a license from the Oregon Building Codes Division. Requires 8,000 hours supervised apprenticeship and passage of state exam. Journeyman license renewed biennially. Continuing education of 16 hours per renewal period. Plumbing contractors must hold separate contractor license and bond. Unlicensed plumbing work subject to civil penalties up to $5,000.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 693.030', 'https://www.oregon.gov/bcd/Pages/index.aspx', 1),

('or-lic-014', 'OR-LIC-014', 'Oregon Electrician License',
 'General supervising, general journeyman, limited, and restricted energy electricians must be licensed by Oregon Building Codes Division. General journeyman requires 8,000 hours apprenticeship plus exam. License renewed annually. Continuing education: 24 hours per 3-year cycle. Electrical contractors must hold separate license.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 479.630', 'https://www.oregon.gov/bcd/Pages/index.aspx', 1),

('or-lic-015', 'OR-LIC-015', 'Oregon Professional Engineer License',
 'Practice of engineering requires licensure from Oregon State Board of Examiners for Engineering and Land Surveying. Requires ABET-accredited degree, passage of FE and PE exams, and 4 years progressive experience. Renewed biennially. 30 PDH hours per biennium. Unlicensed practice is Class A misdemeanor. Firm must hold Certificate of Authorization.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 672.020', 'https://www.oregon.gov/osbeels/Pages/index.aspx', 1),

('or-lic-016', 'OR-LIC-016', 'Oregon Architect License',
 'Practice of architecture requires licensure from Oregon State Board of Architect Examiners. Requires NAAB-accredited degree, completion of AXP (3,740 hours), passage of ARE. Renewed biennially. 24 CE hours per biennium including health/safety/welfare. Firm must register with board.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 671.010', 'https://www.oregon.gov/architectboard/Pages/index.aspx', 1),

('or-lic-017', 'OR-LIC-017', 'Oregon CPA License',
 'Practice of public accounting requires licensure from Oregon Board of Accountancy. Requires 150 semester hours education, passage of Uniform CPA Exam, 1 year supervised experience. Renewed biennially. 80 hours CPE per biennium (minimum 20 per year). Must maintain professional liability insurance or notify clients of lack thereof.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 673.100', 'https://www.oregon.gov/boa/Pages/index.aspx', 1),

-- Real Estate Licensing
('or-lic-018', 'OR-LIC-018', 'Oregon Real Estate Broker License',
 'Engaging in real estate brokerage in Oregon requires licensure from the Oregon Real Estate Agency. Requires 150 hours pre-license education, passage of state and national exam, background check. Initial license valid for 2 years. 30 hours CE for first renewal, then 30 hours per 2-year period. Must work under a principal broker.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 696.022', 'https://www.oregon.gov/rea/Pages/index.aspx', 1),

('or-lic-019', 'OR-LIC-019', 'Oregon Principal Real Estate Broker License',
 'To operate as principal broker (managing broker), must have 3 years active licensure and complete additional education (60 hours broker-level). Principal broker supervises all licensees in office, responsible for trust account compliance, and must maintain errors and omissions insurance for the office.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 696.025', 'https://www.oregon.gov/rea/Pages/index.aspx', 1),

('or-lic-020', 'OR-LIC-020', 'Oregon Property Manager License',
 'Property management in Oregon requires a real estate broker license with property management endorsement. Must complete additional 60 hours property management education. Trust account handling governed by ORS 696.241. Must maintain proper records of all owner funds. Annual trust account reconciliation required.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 696.020', 'https://www.oregon.gov/rea/Pages/index.aspx', 1),

-- Insurance Agent
('or-lic-021', 'OR-LIC-021', 'Oregon Insurance Producer License',
 'Selling, soliciting, or negotiating insurance in Oregon requires a producer license from the Oregon Division of Financial Regulation. Requires pre-licensing education (40 hours per line of authority), passage of state exam, fingerprint-based background check. Renewed biennially. 24 hours CE per biennium including 3 hours ethics.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 744.052', 'https://dfr.oregon.gov/business/licensing/Pages/index.aspx', 1),

-- Auto Dealer
('or-lic-022', 'OR-LIC-022', 'Oregon Motor Vehicle Dealer License',
 'New and used motor vehicle dealers must be licensed by Oregon DMV. Requires established place of business, $50,000 surety bond, proper signage, and compliance with dealer advertising rules. License renewed annually. Must maintain records of all vehicles bought/sold for 5 years. Violations subject to civil penalties up to $25,000.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 822.020', 'https://www.oregon.gov/odot/dmv/Pages/index.aspx', 1),

-- Cannabis Licensing
('or-lic-023', 'OR-LIC-023', 'OLCC Recreational Cannabis Producer License',
 'Cultivation of recreational cannabis requires OLCC license. Micro tier (up to 5,000 sq ft indoor/2,500 outdoor), Tier 1 (5,000-10,000 indoor), Tier 2 (10,001+ indoor). Annual license fee $1,000-$5,750. Must track all plants in Metrc seed-to-sale system. Local government opt-in required. Background checks for all persons with financial interest.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 475B.070', 'https://www.oregon.gov/olcc/marijuana/Pages/default.aspx', 1),

('or-lic-024', 'OR-LIC-024', 'OLCC Recreational Cannabis Processor License',
 'Processing of recreational cannabis (extraction, edibles, concentrates, topicals) requires OLCC processor license. Annual fee $4,750. Must maintain detailed processing records in Metrc. Extraction using hydrocarbons requires additional safety certifications. All products must pass testing for pesticides, heavy metals, solvents, and potency.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 475B.090', 'https://www.oregon.gov/olcc/marijuana/Pages/default.aspx', 1),

('or-lic-025', 'OR-LIC-025', 'OLCC Recreational Cannabis Retailer License',
 'Retail sale of recreational cannabis requires OLCC retailer license. Annual fee $4,750. Must verify age of all customers (21+). No sales between 5:00 AM and midnight. Must use Metrc for all inventory tracking. Cannot be within 1,000 feet of a school. All employees must have OLCC marijuana worker permit.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 475B.110', 'https://www.oregon.gov/olcc/marijuana/Pages/default.aspx', 1),

('or-lic-026', 'OR-LIC-026', 'OLCC Recreational Cannabis Wholesaler License',
 'Wholesale distribution of recreational cannabis requires OLCC wholesaler license. Annual fee $4,750. Must transport in compliance with OLCC rules (manifest, GPS-tracked vehicle, locked container). All transactions logged in Metrc. May not sell to unlicensed entities. Subject to unannounced OLCC inspections.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 475B.100', 'https://www.oregon.gov/olcc/marijuana/Pages/default.aspx', 1),

('or-lic-027', 'OR-LIC-027', 'OHA Medical Cannabis Grow Site Registration',
 'Medical cannabis grow sites must register with Oregon Health Authority. Patient or designated grower may cultivate up to 6 mature plants, 12 immature plants per patient. Must maintain physical security (locked enclosure). Registration renewed annually. Cannot be combined with recreational operations without separate OLCC license.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 475C.792', 'https://www.oregon.gov/oha/PH/DISEASESCONDITIONS/CHRONICDISEASE/MEDICALMARIJUANAPROGRAM/Pages/index.aspx', 1),

-- Home Inspector
('or-lic-028', 'OR-LIC-028', 'Oregon Certified Home Inspector License',
 'Home inspectors must be certified by Oregon Construction Contractors Board. Requires 120 hours approved training, 30 supervised inspections, passage of NHIE exam, and $15,000 surety bond. Certification renewed biennially. 30 hours CE per biennium. Must carry errors and omissions insurance with minimum $100,000 coverage. Must provide written report within 3 business days.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 701.350', 'https://www.oregon.gov/ccb/Pages/index.aspx', 1),

-- Landscape Contractor
('or-lic-029', 'OR-LIC-029', 'Oregon Landscape Contractor License',
 'Landscape contracting businesses must hold a Landscape Contractors Board license. Requires passage of LCB exam, $10,000 surety bond for residential work ($15,000 for commercial), and proof of insurance. License renewed annually. Includes landscape construction, maintenance, and irrigation. Unlicensed work subject to $1,000 fine first offense, $5,000 subsequent.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 671.560', 'https://www.oregon.gov/lcb/Pages/index.aspx', 1),

-- Locksmith
('or-lic-030', 'OR-LIC-030', 'Oregon Locksmith License',
 'Locksmiths must be certified by the Oregon Construction Contractors Board. Requires completion of approved locksmith training program, passage of exam, background check (fingerprint-based), and $10,000 surety bond. License renewed biennially. Must display license number on all advertising. CE requirements per renewal period.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 701.511', 'https://www.oregon.gov/ccb/Pages/index.aspx', 1),

-- Private Investigator/Security
('or-lic-031', 'OR-LIC-031', 'Oregon Private Investigator License',
 'Private investigators must be licensed by Oregon Department of Public Safety Standards and Training (DPSST). Requires 1,500 hours experience or equivalent education, passage of exam, fingerprint background check. License renewed biennially. Must carry $100,000 liability insurance. Unlicensed investigation is a Class C misdemeanor.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 703.405', 'https://www.oregon.gov/dpsst/Pages/index.aspx', 1),

('or-lic-032', 'OR-LIC-032', 'Oregon Private Security License',
 'Private security providers must be licensed by DPSST. Armed guards require additional firearms certification. Executive manager license for company owners/operators. 14 hours pre-assignment training, 8 hours annual in-service. Background check with fingerprints. Must carry $100,000 liability insurance. License renewed biennially.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 181.870', 'https://www.oregon.gov/dpsst/Pages/index.aspx', 1),

-- Pharmacy
('or-lic-033', 'OR-LIC-033', 'Oregon Pharmacy License',
 'Pharmacies must be licensed by the Oregon Board of Pharmacy. Requires pharmacist-in-charge with Oregon RPh license, physical inspection of premises, proper drug storage (USP 795/797/800 compliance). Annual renewal. Subject to unannounced board inspections. Pharmacy technicians must be certified by board. Controlled substance dispensing requires additional DEA registration.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 689.305', 'https://www.oregon.gov/pharmacy/Pages/index.aspx', 1),

-- Veterinary
('or-lic-034', 'OR-LIC-034', 'Oregon Veterinary License',
 'Practice of veterinary medicine requires licensure from Oregon Veterinary Medical Examining Board. Requires DVM from AVMA-accredited school, passage of NAVLE and state jurisprudence exam. Renewed biennially. 30 hours CE per biennium. Veterinary facilities must be registered with board. Telemedicine requires existing VCPR. Unlicensed practice is Class C felony.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 686.040', 'https://www.oregon.gov/ovmeb/Pages/index.aspx', 1),

-- Cosmetology/Barber
('or-lic-035', 'OR-LIC-035', 'Oregon Cosmetology and Barber License',
 'Cosmetologists require licensure from Oregon Health Licensing Agency. Requires graduation from approved program (1,700 hours for cosmetology, 1,350 for barbering, 600 for nail technology, 600 for esthetics). Passage of written and practical exam. Renewed biennially. Facilities must hold separate facility license with health and sanitation inspection.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 690.005', 'https://www.oregon.gov/ohla/Pages/index.aspx', 1),

-- Notary Public
('or-lic-036', 'OR-LIC-036', 'Oregon Notary Public Commission',
 'Notary public commission issued by Oregon Secretary of State. Requires Oregon residency or employment in Oregon, completion of approved education course, passage of exam, $25,000 surety bond. Commission valid for 4 years. Must keep a journal of all notarial acts. Remote online notarization (RON) permitted with additional registration. Fees capped at $10 per notarial act.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 194.300', 'https://sos.oregon.gov/business/Pages/notary-public.aspx', 1),

-- DEQ Environmental Permits
('or-lic-037', 'OR-LIC-037', 'DEQ Air Quality Permit',
 'Oregon DEQ requires air contaminant discharge permits for facilities emitting regulated pollutants. Standard ACDP for major sources, Simple ACDP for smaller sources, General ACDP for common source categories. Title V operating permits for major sources emitting 100+ tons/year of any criteria pollutant. Annual compliance certifications required. Fees based on emissions.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 468A.040', 'https://www.oregon.gov/deq/aq/Pages/default.aspx', 1),

('or-lic-038', 'OR-LIC-038', 'DEQ Water Quality Permit',
 'Discharge of pollutants to waters of the state requires an NPDES or WPCF permit from Oregon DEQ. Includes industrial wastewater, stormwater (construction sites over 1 acre), and municipal separate storm sewer systems. Permits establish effluent limits, monitoring requirements, and reporting schedules. Violations subject to penalties up to $25,000 per day.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 468B.050', 'https://www.oregon.gov/deq/wq/Pages/default.aspx', 1),

-- Building Permits
('or-lic-039', 'OR-LIC-039', 'Local Building Permit Requirement',
 'Building permits required from local jurisdiction for new construction, additions, alterations, and demolition per Oregon Structural Specialty Code. Plan review by certified building official. Inspections at foundation, framing, mechanical, electrical, plumbing, and final stages. Permit expires if work not commenced within 180 days or inspection not requested within 180 days.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 455.020', 'https://www.oregon.gov/bcd/codes-stand/Pages/index.aspx', 1),

-- DEQ Hazardous Waste
('or-lic-040', 'OR-LIC-040', 'DEQ Hazardous Waste Generator Permit',
 'Generators of hazardous waste must obtain EPA ID number from DEQ, comply with storage time limits (90 days for large quantity generators, 270 days for small quantity), maintain manifests for all shipments, and submit biennial reports. Conditionally exempt generators (under 220 lbs/month) have reduced requirements. Land disposal restrictions apply.',
 'LICENSING', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 466.005', 'https://www.oregon.gov/deq/Hazards-and-Cleanup/hw/Pages/default.aspx', 1);

-- ============================================================
-- OREGON PRIVACY RULES (30 rules)
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

-- OCPA — Oregon Consumer Privacy Act (SB 619)
('or-prv-001', 'OR-PRV-001', 'Oregon Consumer Privacy Act Applicability',
 'OCPA applies to persons conducting business in Oregon or producing products/services targeted to Oregon residents who control or process personal data of 100,000+ consumers, or 25,000+ consumers if deriving 25%+ gross revenue from selling personal data. Exempts state/local government, nonprofits, HIPAA-covered entities processing PHI, and entities subject to GLBA.',
 'PRIVACY', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-07-01', 'SB 619 (2023), ORS § 646A.570', 'https://olis.oregonlegislature.gov/liz/2023R1/Measures/Overview/SB619', 1),

('or-prv-002', 'OR-PRV-002', 'OCPA Consumer Right of Access',
 'Consumers have the right to confirm whether a controller is processing their personal data and to obtain a copy of that data. Controller must respond within 45 days (extendable by 45 days with notice). Response must be provided in portable, readily usable format. No charge for first request per 12-month period; reasonable fee for excessive requests.',
 'PRIVACY', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-07-01', 'SB 619 § 3(1)(a), ORS § 646A.572', 'https://olis.oregonlegislature.gov/liz/2023R1/Measures/Overview/SB619', 1),

('or-prv-003', 'OR-PRV-003', 'OCPA Consumer Right of Correction',
 'Consumers have the right to correct inaccuracies in their personal data, taking into account the nature of the data and the purposes of processing. Controller must make commercially reasonable efforts to correct the data within 45 days. Must instruct processors to make corresponding corrections.',
 'PRIVACY', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-07-01', 'SB 619 § 3(1)(b), ORS § 646A.572', 'https://olis.oregonlegislature.gov/liz/2023R1/Measures/Overview/SB619', 1),

('or-prv-004', 'OR-PRV-004', 'OCPA Consumer Right of Deletion',
 'Consumers have the right to delete personal data provided by or obtained about the consumer. Controller must delete data and direct processors to do the same within 45 days. Exceptions for completing transactions, security, legal obligations, and internal uses reasonably aligned with consumer expectations.',
 'PRIVACY', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-07-01', 'SB 619 § 3(1)(c), ORS § 646A.572', 'https://olis.oregonlegislature.gov/liz/2023R1/Measures/Overview/SB619', 1),

('or-prv-005', 'OR-PRV-005', 'OCPA Consumer Right of Data Portability',
 'Consumers have the right to obtain a copy of their personal data in a portable and readily usable format that allows transmission to another controller without hindrance. Format must be machine-readable where technically feasible. Controller may not charge for providing data in electronic format.',
 'PRIVACY', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-07-01', 'SB 619 § 3(1)(d), ORS § 646A.572', 'https://olis.oregonlegislature.gov/liz/2023R1/Measures/Overview/SB619', 1),

('or-prv-006', 'OR-PRV-006', 'OCPA Right to Opt Out of Targeted Advertising',
 'Consumers have the right to opt out of the processing of personal data for purposes of targeted advertising. Controller must provide clear and conspicuous mechanism to opt out. Must honor universal opt-out mechanisms (Global Privacy Control) by January 1, 2026. Cannot use dark patterns to subvert opt-out.',
 'PRIVACY', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-07-01', 'SB 619 § 3(1)(e), ORS § 646A.572', 'https://olis.oregonlegislature.gov/liz/2023R1/Measures/Overview/SB619', 1),

('or-prv-007', 'OR-PRV-007', 'OCPA Right to Opt Out of Sale of Personal Data',
 'Consumers have the right to opt out of the sale of their personal data. Sale defined as exchange of personal data for monetary or other valuable consideration. Controller must provide clear mechanism to exercise right. No requirement to create account to opt out. Must cease sale within 15 business days of request.',
 'PRIVACY', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-07-01', 'SB 619 § 3(1)(e), ORS § 646A.572', 'https://olis.oregonlegislature.gov/liz/2023R1/Measures/Overview/SB619', 1),

('or-prv-008', 'OR-PRV-008', 'OCPA Right to Opt Out of Profiling',
 'Consumers have the right to opt out of profiling that produces legal or similarly significant effects. Profiling means automated processing to evaluate, analyze, or predict personal aspects (economic situation, health, preferences, location, behavior). Controller must conduct data protection assessment before profiling with significant effects.',
 'PRIVACY', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-07-01', 'SB 619 § 3(1)(e), ORS § 646A.572', 'https://olis.oregonlegislature.gov/liz/2023R1/Measures/Overview/SB619', 1),

('or-prv-009', 'OR-PRV-009', 'OCPA 30-Day Cure Period',
 'Before initiating enforcement action, Oregon AG must provide written notice identifying specific violations and 30-day cure period. If controller cures within 30 days and provides express written statement of cure and future compliance, AG shall not initiate action. This cure provision sunsets January 1, 2026, after which AG may proceed directly.',
 'PRIVACY', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-07-01', 'SB 619 § 10, ORS § 646A.586', 'https://olis.oregonlegislature.gov/liz/2023R1/Measures/Overview/SB619', 1),

('or-prv-010', 'OR-PRV-010', 'OCPA AG Enforcement and Penalties',
 'Oregon Attorney General has exclusive enforcement authority under OCPA. No private right of action. Violations treated as unlawful trade practices under ORS 646.607. Civil penalties up to $7,500 per violation. AG may seek injunctive relief, actual damages, and attorney fees. Must consider good faith compliance efforts in determining penalties.',
 'PRIVACY', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-07-01', 'SB 619 § 10, ORS § 646A.586', 'https://olis.oregonlegislature.gov/liz/2023R1/Measures/Overview/SB619', 1),

('or-prv-011', 'OR-PRV-011', 'OCPA Sensitive Data Opt-In Consent',
 'Processing of sensitive data requires prior opt-in consent. Sensitive data includes racial/ethnic origin, religious beliefs, health diagnosis, sexual orientation, citizenship/immigration status, genetic/biometric data, data from known children, and precise geolocation (within 1,750 feet). Consent must be freely given, specific, informed, and unambiguous.',
 'PRIVACY', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-07-01', 'SB 619 § 7, ORS § 646A.580', 'https://olis.oregonlegislature.gov/liz/2023R1/Measures/Overview/SB619', 1),

('or-prv-012', 'OR-PRV-012', 'OCPA Childrens Data Protection',
 'Controllers with actual knowledge they are processing data of children under 13 must comply with COPPA. For children 13-15, must obtain opt-in consent for targeted advertising and sale of data. Cannot process childrens data for profiling. Must conduct data protection assessment for any processing of known childrens data.',
 'PRIVACY', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-07-01', 'SB 619 § 7(3), ORS § 646A.580', 'https://olis.oregonlegislature.gov/liz/2023R1/Measures/Overview/SB619', 1),

('or-prv-013', 'OR-PRV-013', 'OCPA Data Protection Assessment Required',
 'Controllers must conduct and document data protection assessments for processing that presents heightened risk of harm: targeted advertising, sale of personal data, profiling with significant effects, sensitive data processing, and any processing presenting heightened risk. Must weigh benefits against potential consumer harms. Assessments subject to AG subpoena.',
 'PRIVACY', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-07-01', 'SB 619 § 8, ORS § 646A.582', 'https://olis.oregonlegislature.gov/liz/2023R1/Measures/Overview/SB619', 1),

('or-prv-014', 'OR-PRV-014', 'OCPA Privacy Notice Requirements',
 'Controllers must provide reasonably accessible, clear, and meaningful privacy notice disclosing: categories of personal data processed, purposes of processing, categories of third parties data is shared with, consumer rights and how to exercise them, categories of data shared with third parties, and contact information. Must be updated when practices change materially.',
 'PRIVACY', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-07-01', 'SB 619 § 5, ORS § 646A.576', 'https://olis.oregonlegislature.gov/liz/2023R1/Measures/Overview/SB619', 1),

('or-prv-015', 'OR-PRV-015', 'OCPA Controller Processor Contract Requirements',
 'Processing of personal data on behalf of a controller must be governed by written contract specifying: instructions for processing, nature and purpose, type of data, duration, rights and obligations. Processor must maintain confidentiality, delete data on request, make available information to demonstrate compliance, and allow audits.',
 'PRIVACY', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-07-01', 'SB 619 § 6, ORS § 646A.578', 'https://olis.oregonlegislature.gov/liz/2023R1/Measures/Overview/SB619', 1),

('or-prv-016', 'OR-PRV-016', 'OCPA Universal Opt-Out Mechanism',
 'By January 1, 2026, controllers must recognize and honor universal opt-out mechanisms such as Global Privacy Control (GPC). Browser-based or device-based signals that clearly communicate consumer opt-out preference must be treated as valid requests. Controller may not require consumer to submit separate request if universal signal is detected.',
 'PRIVACY', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2026-01-01', 'SB 619 § 3(5), ORS § 646A.572', 'https://olis.oregonlegislature.gov/liz/2023R1/Measures/Overview/SB619', 1),

-- Oregon Identity Theft Protection Act
('or-prv-017', 'OR-PRV-017', 'Data Breach Notification Within 45 Days',
 'Any person who owns or licenses personal information of Oregon consumers must notify affected individuals within 45 days of discovering a breach of security. Notification must include description of incident, type of information compromised, contact information for consumer reporting agencies, and advice to monitor accounts. Delayed notice permitted only for law enforcement investigation.',
 'PRIVACY', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 646A.604', 'https://www.oregonlegislature.gov/bills_laws/ors/ors646A.html', 1),

('or-prv-018', 'OR-PRV-018', 'Breach Notification to Attorney General',
 'If a data breach affects 250 or more Oregon consumers, the entity must notify the Oregon Attorney General simultaneously with consumer notification. Notification must include entity name, nature of breach, number of consumers affected, date of breach and discovery, and steps taken to address the breach. AG may investigate and bring enforcement action.',
 'PRIVACY', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 646A.604(4)', 'https://www.oregonlegislature.gov/bills_laws/ors/ors646A.html', 1),

('or-prv-019', 'OR-PRV-019', 'Social Security Number Protection',
 'Entities may not print an individuals SSN on materials mailed to the individual (unless required by law), require transmission of SSN over an unencrypted internet connection, require SSN to access a website (unless additional authentication is also required), or publicly display more than the last four digits of SSN.',
 'PRIVACY', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 646A.620', 'https://www.oregonlegislature.gov/bills_laws/ors/ors646A.html', 1),

('or-prv-020', 'OR-PRV-020', 'Security Freeze on Consumer Reports',
 'Consumer reporting agencies must place a security freeze on a consumers credit report within 3 business days of receiving a request. Freeze must be lifted or temporarily removed within 3 business days of request. No fee may be charged to place, temporarily lift, or remove a freeze. Protected consumers (minors, incapacitated, protected persons) may also request freezes.',
 'PRIVACY', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 646A.606', 'https://www.oregonlegislature.gov/bills_laws/ors/ors646A.html', 1),

('or-prv-021', 'OR-PRV-021', 'Reasonable Data Security Measures',
 'Entities that own, maintain, or otherwise possess personal information must implement and maintain reasonable safeguards to protect the security, confidentiality, and integrity of personal information. Safeguards must be appropriate to the size and complexity of the entity, nature and scope of activities, and sensitivity of information. Failure constitutes unfair trade practice.',
 'PRIVACY', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 646A.622', 'https://www.oregonlegislature.gov/bills_laws/ors/ors646A.html', 1),

('or-prv-022', 'OR-PRV-022', 'Disposal of Personal Information Records',
 'Entities must take reasonable steps to destroy or arrange for destruction of records containing personal information when records are no longer needed for business purposes. Destruction methods include shredding, erasing, or otherwise rendering personal information unreadable or indecipherable. Applies to both paper and electronic records.',
 'PRIVACY', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 646A.624', 'https://www.oregonlegislature.gov/bills_laws/ors/ors646A.html', 1),

-- Student Privacy
('or-prv-023', 'OR-PRV-023', 'Student Personal Information Protection',
 'Operators of educational technology services used by Oregon K-12 schools may not use student personal information for targeted advertising, build student profiles for non-educational purposes, or sell student information. Must delete data within 45 days of school request. Must maintain reasonable security practices. Schools must provide annual notice to parents of third-party services used.',
 'PRIVACY', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 336.184', 'https://www.oregonlegislature.gov/bills_laws/ors/ors336.html', 1),

-- Employee Monitoring
('or-prv-024', 'OR-PRV-024', 'Employee Monitoring Disclosure',
 'Oregon law prohibits interception of oral, wire, or electronic communications without consent of at least one party. Employers monitoring employee communications (email, phone, internet) should provide clear written notice. While Oregon is one-party consent state for recordings, systematic monitoring programs should be disclosed in employee handbooks.',
 'PRIVACY', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 165.540', 'https://www.oregonlegislature.gov/bills_laws/ors/ors165.html', 1),

-- Health Information
('or-prv-025', 'OR-PRV-025', 'Oregon Health Information Protection',
 'Beyond federal HIPAA requirements, Oregon provides additional protections for health information including HIV/AIDS test results (ORS 433.045), genetic information (ORS 192.535), mental health records (ORS 179.505), and substance abuse records. Healthcare providers must obtain specific authorization for release. Unauthorized disclosure subject to civil liability.',
 'PRIVACY', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 192.553', 'https://www.oregonlegislature.gov/bills_laws/ors/ors192.html', 1),

-- Government Data Sharing
('or-prv-026', 'OR-PRV-026', 'Government Data Sharing Limitations',
 'Oregon public bodies sharing personal information with other entities must enter into data sharing agreements specifying purposes, safeguards, retention periods, and destruction requirements. ORS 192.355 provides over 300 exemptions from public disclosure of specific records. Personally identifiable information in government databases has heightened protection requirements.',
 'PRIVACY', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 192.355', 'https://www.oregonlegislature.gov/bills_laws/ors/ors192.html', 1),

-- Biometric Information
('or-prv-027', 'OR-PRV-027', 'Biometric Information Under OCPA',
 'Biometric data (fingerprints, retina/iris scans, voiceprints, facial geometry) is classified as sensitive data under OCPA requiring opt-in consent before processing. Controllers must disclose specific purpose for collection. Biometric data used for identification purposes in commercial settings requires affirmative consent. Data protection assessment required.',
 'PRIVACY', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-07-01', 'SB 619 § 1(17)(a)(D), ORS § 646A.570', 'https://olis.oregonlegislature.gov/liz/2023R1/Measures/Overview/SB619', 1),

-- Recording Consent
('or-prv-028', 'OR-PRV-028', 'One-Party Consent Recording Law',
 'Oregon is a one-party consent state for recording conversations. A person may record a conversation they are a party to without notifying other parties. However, recording telephone calls where all parties are not notified may violate ORS 165.540(1)(c) in certain contexts. Electronic surveillance of premises without knowledge of at least one party present is prohibited.',
 'PRIVACY', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 165.540', 'https://www.oregonlegislature.gov/bills_laws/ors/ors165.html', 1),

-- OCPA Data Minimization
('or-prv-029', 'OR-PRV-029', 'OCPA Data Minimization Requirement',
 'Controllers must limit collection of personal data to what is adequate, relevant, and reasonably necessary in relation to the disclosed purposes for which data is processed. Cannot collect data beyond what is needed for stated purpose. Must maintain purpose limitation: cannot process for purposes incompatible with original disclosure without additional consent.',
 'PRIVACY', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-07-01', 'SB 619 § 4(2), ORS § 646A.574', 'https://olis.oregonlegislature.gov/liz/2023R1/Measures/Overview/SB619', 1),

-- OCPA Right of Appeal
('or-prv-030', 'OR-PRV-030', 'OCPA Consumer Right of Appeal',
 'Controllers must establish an internal appeal process for consumers whose rights requests are denied. Must respond to appeal within 45 days. Must inform consumer of right to contact Oregon Attorney General if appeal is denied. Appeal process must be clearly described in privacy notice and be no more burdensome than the original request process.',
 'PRIVACY', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-07-01', 'SB 619 § 3(4), ORS § 646A.572', 'https://olis.oregonlegislature.gov/liz/2023R1/Measures/Overview/SB619', 1);

-- ============================================================
-- OREGON INSURANCE RULES (30 rules)
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

-- Workers' Compensation (ORS 656)
('or-ins-001', 'OR-INS-001', 'Mandatory Workers Compensation Coverage',
 'Oregon requires all employers with one or more employees to carry workers compensation insurance. Covers work-related injuries and occupational diseases. Must be obtained through private insurer, SAIF Corporation (state fund), or approved self-insurance. No exception for part-time, temporary, or seasonal workers. Coverage must begin on the first day of employment.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 656.017', 'https://www.oregon.gov/dcbs/Pages/index.aspx', 1),

('or-ins-002', 'OR-INS-002', 'SAIF Corporation State Fund Option',
 'SAIF Corporation is the state-chartered workers compensation insurance carrier available to all Oregon employers. Acts as insurer of last resort when private market coverage unavailable. Rates set annually based on industry classification. Employers may choose SAIF or private carrier. SAIF covers approximately 50% of the Oregon workers compensation market.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 656.407', 'https://www.saif.com/', 1),

('or-ins-003', 'OR-INS-003', 'Workers Compensation Self-Insurance',
 'Employers may self-insure for workers compensation if approved by Oregon Department of Consumer and Business Services. Must demonstrate financial ability to pay claims, maintain excess insurance or security deposit, and comply with claims management standards. Must employ or contract with certified claims examiner. Application requires 3 years audited financial statements.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP"]',
 '2024-01-01', 'ORS § 656.430', 'https://www.oregon.gov/dcbs/Pages/index.aspx', 1),

('or-ins-004', 'OR-INS-004', 'Workers Compensation Noncompliance Penalties',
 'Employers who fail to maintain workers compensation coverage are subject to penalties of $250 per day for each day of noncompliance (doubled if employer had prior knowledge of requirement). Noncomplying employer is personally liable for all claim costs. Workers Compensation Division may issue stop-work orders. Criminal misdemeanor for willful failure to insure.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 656.735', 'https://www.oregon.gov/dcbs/Pages/index.aspx', 1),

('or-ins-005', 'OR-INS-005', 'Workers Compensation Claim Filing',
 'Employee must report injury to employer within 90 days (5 days recommended). Employer must file Form 801 with insurer within 5 days of knowledge. Insurer must accept or deny claim within 60 days. Time-loss benefits begin on 4th day of disability (or 1st day if disability exceeds 14 days or worker is hospitalized). Benefits include medical, time-loss, permanent disability.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 656.262', 'https://www.oregon.gov/dcbs/Pages/index.aspx', 1),

-- Unemployment Insurance (ORS 657)
('or-ins-006', 'OR-INS-006', 'Unemployment Insurance Employer Contributions',
 'Employers must pay unemployment insurance tax on wages paid to employees. Tax rate varies from 0.7% to 5.4% based on employer experience rating. New employer rate is 2.1% for most industries (construction starts at 2.6%). Taxable wage base adjusted annually ($50,900 for 2024). Quarterly reports due by April 30, July 31, October 31, January 31.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 657.505', 'https://www.oregon.gov/employ/Businesses/Tax/Pages/default.aspx', 1),

('or-ins-007', 'OR-INS-007', 'Unemployment Insurance Rate Determination',
 'Employer tax rate determined by experience rating (benefit ratio method). Calculated as total benefits charged to employer account divided by taxable payroll over the preceding rate computation period. Minimum rate 0.7%, maximum 5.4% plus any applicable surcharges. Voluntary contributions may be made by January 31 to reduce rate. Successor employers may inherit predecessor rate.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 657.462', 'https://www.oregon.gov/employ/Businesses/Tax/Pages/default.aspx', 1),

('or-ins-008', 'OR-INS-008', 'Unemployment Insurance Benefit Duration',
 'Eligible workers receive unemployment benefits for up to 26 weeks in a benefit year. Weekly benefit amount is 1.25% of total base-year wages, minimum $172/week, maximum $783/week (2024). Must be able and available for work, actively seeking employment, and registered with iMatchSkills. Benefits subject to state and federal income tax.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 657.150', 'https://www.oregon.gov/employ/Businesses/Tax/Pages/default.aspx', 1),

-- Paid Leave Oregon (ORS 657B)
('or-ins-009', 'OR-INS-009', 'Paid Leave Oregon Contribution Rates',
 'Total contribution rate is 1% of employee wages. Employers with 25+ employees pay 60% (0.6%) and employees pay 40% (0.4%). Employers with fewer than 25 employees are not required to pay employer portion but must collect and remit employee share. Contributions are on wages up to $168,600 (2024, indexed to Social Security wage base). Quarterly reporting and payment required.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 657B.150', 'https://paidleave.oregon.gov/', 1),

('or-ins-010', 'OR-INS-010', 'Paid Leave Oregon Benefit Entitlement',
 'Eligible employees may take up to 12 weeks of paid leave per benefit year for family leave (bonding, family member serious health condition), medical leave (own serious health condition), or safe leave (domestic violence, sexual assault, stalking, harassment). Additional 2 weeks for pregnancy-related conditions. Benefits replace 100% of wages up to 65% of state average weekly wage, then 50% above that, capped at 120% of state AWW.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 657B.020', 'https://paidleave.oregon.gov/', 1),

('or-ins-011', 'OR-INS-011', 'Paid Leave Oregon Employer Notice Requirements',
 'Employers must post model notice from Oregon Employment Department in conspicuous locations. Must provide individual written notice to each employee at hire, annually, and when employee requests leave. Notice must be in English and any language spoken by 10%+ of workforce. Must not retaliate against employees for requesting or taking leave.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 657B.230', 'https://paidleave.oregon.gov/', 1),

('or-ins-012', 'OR-INS-012', 'Paid Leave Oregon Equivalent Plan Option',
 'Employers may apply to Oregon Employment Department for approval of an equivalent plan in lieu of state program. Plan must meet or exceed all state benefits including leave duration, wage replacement, and job protection. Must cover all eligible employees. Approved plans are reviewed annually. Employee share of contribution cannot exceed state rate.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 657B.210', 'https://paidleave.oregon.gov/', 1),

-- Health Insurance
('or-ins-013', 'OR-INS-013', 'Oregon Health Plan Medicaid Expansion',
 'Oregon expanded Medicaid under the ACA covering adults up to 138% FPL. Oregon Health Plan (OHP) administered by Coordinated Care Organizations (CCOs). Employers with workers eligible for OHP may face reduced workforce stability. Understanding Medicaid expansion eligibility helps employers counsel employees on coverage options during open enrollment.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 414.025', 'https://www.oregon.gov/oha/HSD/OHP/Pages/index.aspx', 1),

('or-ins-014', 'OR-INS-014', 'Small Employer Health Insurance SHOP Marketplace',
 'Small employers (1-50 employees) may purchase health insurance through Oregon SHOP marketplace. Plans must meet essential health benefits requirements. Small group market guaranteed issue (no health status underwriting). Rate variation limited to age (3:1), tobacco use (1.5:1), family size, and geography. Small employers may qualify for tax credit if under 25 FTE and average wages under $56,000.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 743B.001', 'https://www.healthcare.gov/small-businesses/employers/', 1),

('or-ins-015', 'OR-INS-015', 'Oregon Continuation Coverage (OR-COBRA)',
 'Oregon mini-COBRA provides continuation coverage for employees of employers with fewer than 20 employees (not subject to federal COBRA). Continuation period up to 9 months. Employer must notify employee of continuation rights within 10 days of qualifying event. Employee must elect within 60 days and may be charged up to 102% of premium. Applies to group health, dental, and vision.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 743B.470', 'https://dfr.oregon.gov/consumers/health/Pages/index.aspx', 1),

('or-ins-016', 'OR-INS-016', 'Large Employer Health Insurance Requirements',
 'Under the ACA, applicable large employers (50+ FTE) must offer minimum essential coverage to 95% of full-time employees (30+ hours/week) and dependents to age 26. Coverage must be affordable (employee contribution for self-only coverage not exceeding 8.39% of household income for 2024). Failure to offer coverage: penalty of $2,970 per FTE (minus 30). Inadequate coverage: $4,460 per affected employee.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","NONPROFIT"]',
 '2024-01-01', 'ORS § 743B.010; 26 USC § 4980H', 'https://dfr.oregon.gov/consumers/health/Pages/index.aspx', 1),

-- Professional Liability
('or-ins-017', 'OR-INS-017', 'Attorney Professional Liability Fund',
 'Oregon is the only state requiring all active members of the Oregon State Bar to participate in the Professional Liability Fund (PLF). PLF provides primary malpractice coverage with $300,000 per claim / $300,000 annual aggregate. Assessment set annually (approximately $3,500-$4,500). Excess coverage available through private market. Cannot opt out while actively practicing.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 9.080(2)', 'https://www.osbplf.org/', 1),

('or-ins-018', 'OR-INS-018', 'Engineer Professional Liability',
 'Oregon does not mandate professional liability insurance for engineers by statute, but OSBEELS may require it as condition of certain project types. Certificate of Authorization holders should carry E&O coverage. Standard minimum recommended: $1,000,000 per claim / $2,000,000 aggregate. Government contracts typically require proof of professional liability insurance.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 672.002', 'https://www.oregon.gov/osbeels/Pages/index.aspx', 1),

('or-ins-019', 'OR-INS-019', 'Accountant Professional Liability',
 'Oregon Board of Accountancy does not mandate professional liability insurance but CPAs must disclose to clients whether they carry such coverage. Firms performing attest services (audits, reviews) should carry E&O insurance. Oregon law requires written disclosure if CPA does not maintain coverage. Standard minimum: $500,000 per claim.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 673.170', 'https://www.oregon.gov/boa/Pages/index.aspx', 1),

('or-ins-020', 'OR-INS-020', 'CCB Contractor General Liability Insurance',
 'Oregon CCB requires licensed contractors to maintain commercial general liability insurance: minimum $500,000 per occurrence / $1,000,000 aggregate for residential contractors; minimum $500,000/$1,000,000 for commercial specialty and $1,000,000/$2,000,000 for commercial general contractors. Proof must be filed with CCB. Lapse results in automatic license suspension.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 701.073', 'https://www.oregon.gov/ccb/Pages/index.aspx', 1),

-- Auto Insurance
('or-ins-021', 'OR-INS-021', 'Mandatory Auto Liability Insurance',
 'Oregon requires all motor vehicle owners to maintain liability insurance with minimum limits of $25,000 per person / $50,000 per accident bodily injury and $20,000 property damage (25/50/20). Uninsured motorist coverage also mandatory at same minimums. Personal injury protection (PIP) minimum $15,000. Proof of insurance must be carried in vehicle. Violation is Class B traffic infraction with minimum $265 fine.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 806.060', 'https://www.oregon.gov/odot/dmv/Pages/index.aspx', 1),

('or-ins-022', 'OR-INS-022', 'Commercial Auto Insurance Requirements',
 'Businesses operating commercial vehicles must carry liability insurance meeting Oregon minimums (25/50/20) plus any additional requirements based on vehicle type. For-hire carriers and freight haulers subject to higher limits under ORS 825. Vehicles over 26,001 lbs GVW must carry $750,000 combined single limit. Hazardous materials carriers: $1,000,000-$5,000,000 depending on cargo.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 825.150', 'https://www.oregon.gov/odot/MCT/Pages/index.aspx', 1),

-- Homeowner/Flood
('or-ins-023', 'OR-INS-023', 'Flood Insurance Requirements',
 'Properties in FEMA-designated Special Flood Hazard Areas (Zone A, V) with federally backed mortgages must maintain flood insurance through NFIP or equivalent private policy. Oregon has significant flood zones along Willamette Valley, Columbia River, and coastal areas. Coverage must be maintained for life of loan. Standard NFIP: up to $250,000 building / $100,000 contents for residential.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 456.555; 42 USC § 4012a', 'https://www.fema.gov/flood-insurance', 1),

-- Cannabis Insurance
('or-ins-024', 'OR-INS-024', 'Cannabis Industry Insurance Requirements',
 'OLCC-licensed cannabis businesses must maintain commercial general liability insurance with minimum $1,000,000 per occurrence / $2,000,000 aggregate. Product liability coverage strongly recommended given testing and consumption risks. Property insurance should include crop coverage. Workers compensation required for all employees. Traditional insurers limited; specialty cannabis insurers available.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'OAR § 845-025-1160', 'https://www.oregon.gov/olcc/marijuana/Pages/default.aspx', 1),

-- Liquor Liability
('or-ins-025', 'OR-INS-025', 'Liquor Liability Insurance',
 'OLCC licensees serving alcohol are subject to Oregon dram shop liability under ORS 471.565 for serving visibly intoxicated patrons or minors. While not required by statute, liquor liability insurance (also called dram shop coverage) is strongly recommended. Typical coverage: $300,000-$1,000,000 per occurrence. Many landlords and municipalities require as lease or permit condition.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2024-01-01', 'ORS § 471.565', 'https://www.oregon.gov/olcc/Pages/index.aspx', 1),

-- Oregon Statewide Transit Tax
('or-ins-026', 'OR-INS-026', 'Oregon Statewide Transit Tax',
 'Employers must withhold statewide transit tax of 0.1% (one-tenth of one percent) from employee wages with no wage ceiling. Applies to all employers regardless of size, including self-employed individuals with Oregon-source income. Reported on quarterly payroll tax returns (Form OQ). Revenue funds public transportation improvements statewide. No employer matching contribution required.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 320.550', 'https://www.oregon.gov/dor/programs/businesses/Pages/statewide-transit-tax.aspx', 1),

-- Workers' Benefit Fund
('or-ins-027', 'OR-INS-027', 'Workers Benefit Fund Assessment',
 'All employers subject to Oregon workers compensation must pay the Workers Benefit Fund assessment. Both employer and employee contribute (rates set annually; 2024: $0.022 per hour worked for each). Funds vocational rehabilitation, reopened claims, retroactive benefits, and preferred worker program. Reported on quarterly combined payroll tax return. Failure to pay subject to penalties.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 656.506', 'https://www.oregon.gov/dcbs/Pages/index.aspx', 1),

-- Disability
('or-ins-028', 'OR-INS-028', 'Oregon Does Not Mandate Short-Term Disability',
 'Oregon does not require employers to carry short-term disability insurance (unlike CA, NJ, NY, HI, RI). However, Paid Leave Oregon (ORS 657B) provides partial wage replacement for medical leave. Employers may offer voluntary STD plans as supplemental benefit. Long-term disability is entirely voluntary. Self-employed may purchase individual policies through private market.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 657B', 'https://paidleave.oregon.gov/', 1),

-- Cyber Insurance
('or-ins-029', 'OR-INS-029', 'Cyber Insurance Considerations Under OCPA',
 'While Oregon does not mandate cyber insurance, the OCPA requirement for reasonable data security measures and 45-day breach notification creates significant financial exposure. Cyber insurance covers breach response costs (forensics, notification, credit monitoring), regulatory defense, and liability. Average breach cost for small businesses: $120,000-$1.2M. Recommended minimum: $1,000,000.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-07-01', 'ORS § 646A.604; SB 619', 'https://dfr.oregon.gov/consumers/Pages/index.aspx', 1),

-- Surety Bond General
('or-ins-030', 'OR-INS-030', 'Oregon Business Surety Bond Requirements Summary',
 'Multiple Oregon professions and business types require surety bonds: contractors ($20K-$75K via CCB), auto dealers ($50K), property managers (per ORS 696), mortgage brokers ($50K via ORS 86A.106), collection agencies ($10K via ORS 697.037), travel agents ($20K), home inspectors ($15K), landscape contractors ($10K-$15K), and locksmiths ($10K). Bond amounts are per-license, not aggregate. Must be renewed with license.',
 'INSURANCE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS §§ 701.068, 822.040, 696.241, 86A.106, 697.037', 'https://www.oregon.gov/ccb/Pages/index.aspx', 1);

-- ============================================================
-- Triple Constraint UPDATE statements
-- Industries: Child Care / Social Services / Public Housing
--             Corrections / Probation & Parole / Reentry
-- Generated: 2026-03-29
-- Source: catalog-3000 persona markdown files
-- ============================================================

-- ============================================================
-- SECTION 1: CHILD CARE / DAY CARE / SOCIAL SERVICES / HOUSING
-- (53 personas)
-- ============================================================

-- A1. Licensing & Regulatory Compliance

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Health & Safety Code 1596.70-1596.899 (California Child Day Care Facilities Act); Cal. HSC 1596.857 (parental access rights); Cal. HSC 1596.859 (public access to licensing reports); 22 CCR Division 12, Chapter 1 (Child Care Center Licensing Regulations); 22 CCR 101152-101239.2 (General Licensing Requirements); 22 CCR 101351-101439.1 (Infant Centers); 45 CFR Part 98 (CCDF Federal Requirements)',
  standards_of_creation = 'CDSS CCLD Policy Interpretation Notices; CDSS Evaluator Manual; Title 22 Division 12 regulatory framework',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); access control on licensing databases; change management for regulatory updates'
WHERE name = 'Community Care Licensing Program Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. HSC 1596.70-1596.899 (Child Day Care Facilities Act); 22 CCR 102351-102423 (Family Child Care Homes); 22 CCR 102416 (staff-child ratios for family child care); Cal. HSC 1597.30-1597.622 (Family Day Care Homes); 22 CCR 102352 (physical environment standards)',
  standards_of_creation = 'CDSS Licensing Evaluator Manual; CCLD Regional Office SOPs; Quarterly Performance Metrics',
  soc_controls = 'SOC 2 (Availability, Processing Integrity); inspection scheduling integrity; complaint tracking systems'
WHERE name = 'Family Child Care Home Licensing Evaluator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Education Code 8482-8484.65 (After School Education and Safety Program Act); Cal. EDC 46120 (expanded learning opportunities); 22 CCR 101151-101239.2 (applicable child care center standards); 5 CCR 18000-18282 (CDE after-school program regulations); Cal. HSC 1596.792 (school-age child care center definition)',
  standards_of_creation = 'CDE After School Division Program Quality Standards; ASES Grant Terms and Conditions',
  soc_controls = 'SOC 2 (Security, Confidentiality); grant compliance tracking; attendance verification systems'
WHERE name = 'After-School Program Licensing Specialist';

-- A2. Background Check & Personnel Compliance

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. HSC 1596.60-1596.609 (TrustLine Registry); Cal. HSC 1596.871 (fingerprint requirements for child care); Cal. HSC 1522 (background check requirements, community care facilities); Cal. HSC 1522.01 (sex offender disclosure); Cal. HSC 1522.04 (fingerprint identification timeline); Cal. HSC 1522.1 (Child Abuse Central Index check); Cal. Penal Code 11105 (DOJ criminal history maintenance); Cal. BPC 18890.2 (online child care job posting TrustLine requirement); 22 CCR 101170 (personnel requirements)',
  standards_of_creation = 'DOJ Applicant Processing Manual; CDSS Background Check Processing SOPs; FBI/DOJ Fingerprint Standards',
  soc_controls = 'SOC 2 Type II (Security, Confidentiality, Privacy); CJIS Security Policy compliance; encrypted transmission of criminal history data; audit trails on all registry queries'
WHERE name = 'TrustLine Registry Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. PEN 11164-11174.3 (Child Abuse and Neglect Reporting Act — CANRA); Cal. PEN 11165.7 (mandated reporter definition — child care workers included); Cal. PEN 11166 (reporting obligation and timeline); Cal. PEN 11166.5 (pre-employment mandated reporter acknowledgment); Cal. PEN 11167.5 (confidentiality of reports); Cal. HSC 1596.8662 (child care provider reporting resources); Cal. BPC 18975 (youth service organization training requirement); 22 CCR 101212 (reporting requirements for licensed facilities)',
  standards_of_creation = 'CDSS Mandated Reporter Training Curriculum; DOJ SS 8572 Reporting Form Standards; County CWS Reporting Protocols',
  soc_controls = 'SOC 2 (Security, Confidentiality, Privacy); CACI database access controls; cross-reporting verification; training completion tracking'
WHERE name = 'Mandated Reporter Compliance Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = '22 CCR 101216 (personnel records requirements); 22 CCR 101216.1 (health screening records); 22 CCR 101216.2 (training documentation); Cal. HSC 1596.866 (preventive health practices training); Cal. HSC 1596.8661 (pediatric first aid, CPR training); 22 CCR 101215.1 (director qualifications); 22 CCR 101216.3 (teacher qualifications); Cal. EDC 8360-8370 (child development permit requirements)',
  standards_of_creation = 'EMSA Pediatric First Aid/CPR Standards; CDE Child Development Permit Matrix; CCLD Personnel File Checklist',
  soc_controls = 'SOC 2 (Confidentiality, Privacy); personnel file access controls; training expiration tracking; credential verification systems'
WHERE name = 'Child Care Personnel Records Manager';

-- A3. Health, Safety & Nutrition

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. HSC 120325-120380 (Immunization Requirements); Cal. HSC 120372 (standardized medical exemption form); Cal. HSC 120335 (required immunizations for child care entry); 17 CCR 6000-6075 (immunization regulations); Cal. HSC 1596.7995 (health and safety training requirements); AAP/APHA/NRC Caring for Our Children (CFOC) National Health and Safety Performance Standards, 4th Ed.; 22 CCR 101220-101226.1 (health-related requirements)',
  standards_of_creation = 'CDPH Immunization Branch Standards; AAP CFOC Standards; CDSS Health & Safety Training Curriculum',
  soc_controls = 'SOC 2 (Processing Integrity, Privacy); immunization registry (CAIR2) access controls; HIPAA-adjacent protections for child health records'
WHERE name = 'Child Care Health Consultant';

UPDATE citizen_catalog SET
  governing_guidelines = '7 CFR Part 226 (CACFP Regulations); 7 CFR 226.6 (state agency responsibilities); 7 CFR 226.15-226.16 (institution/facility meal service requirements); 7 CFR 226.23 (free and reduced-price eligibility); 42 USC 1766 (Child and Adult Care Food Program authorization); Cal. EDC 49490-49560 (Child Nutrition Programs); USDA FNS Instruction 796-2 Rev. 4 (Financial Management); USDA Meal Pattern Requirements (2017 Final Rule)',
  standards_of_creation = 'USDA FNS Management Evaluation Standards; CDE CACFP Administrative Manual; USDA Meal Pattern Documentation Requirements',
  soc_controls = 'SOC 2 (Processing Integrity, Confidentiality); claim reimbursement verification; meal count documentation controls; single audit (2 CFR 200 Subpart F)'
WHERE name = 'CACFP Nutrition Program Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = '22 CCR 101174 (emergency disaster plan requirements); 22 CCR 101174.1 (facility evacuation plan); Cal. HSC 1596.867 (disaster and mass casualty plan); Cal. Gov. Code 8607 (Standardized Emergency Management System — SEMS); Cal. HSC 1596.8661 (emergency training for child care workers); FEMA National Incident Management System (NIMS) guidance',
  standards_of_creation = 'CalOES Emergency Plan Review Criteria; CDSS Emergency Plan Template; FEMA IS-100/IS-700 Training Standards',
  soc_controls = 'SOC 2 (Availability); plan currency verification; drill documentation; emergency contact system integrity'
WHERE name = 'Emergency Preparedness Plan Reviewer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. HSC 17610.5 (Healthy Schools Act — notification requirements); Cal. EDC 17612 (pesticide product use notification); 3 CCR 6690-6784 (pesticide use reporting and notification); Cal. Food & Agricultural Code 13180-13188 (pesticide exposure); 40 CFR Part 170 (EPA Worker Protection Standard — applicable framework); 22 CCR 101238 (facility maintenance and safety)',
  standards_of_creation = 'DPR Notification Compliance Guidance; CDE Healthy Schools Act Implementation Guide; EPA Integrated Pest Management Standards',
  soc_controls = 'SOC 2 (Processing Integrity); notification timing verification; product registration verification; parent notification tracking'
WHERE name = 'Pesticide Exposure Prevention Specialist';

-- A4. Child & Family Services Documentation

UPDATE citizen_catalog SET
  governing_guidelines = '45 CFR Part 98 (Child Care and Development Fund — CCDF); 45 CFR 98.20-98.21 (eligibility determination); Cal. WIC 10271-10290 (CalWORKs Stage 1 child care); Cal. WIC 10370-10382 (Alternative Payment programs); Cal. EDC 8261-8269 (child care eligibility/priority); Cal. EDC 8263 (family fee schedule); 5 CCR 18000-18428 (CDE child care and development regulations); Cal. WIC 11323.2 (CalWORKs child care while in welfare-to-work)',
  standards_of_creation = 'ACF CCDF State Plan Requirements; CDE Funding Terms and Conditions; CDSS CalWORKs Stage 1 Manual; All County Letters (ACLs) and County Fiscal Letters (CFLs)',
  soc_controls = 'SOC 2 (Processing Integrity, Confidentiality, Privacy); income verification controls; attendance tracking systems; fraud detection algorithms'
WHERE name = 'Child Care Subsidy Eligibility Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. WIC 4642 (regional center eligibility assessment); Cal. Gov. Code 95004-95020 (Early Start Program / IDEA Part C); Cal. Gov. Code 95014 (eligible infant/toddler definition); 34 CFR Part 303 (IDEA Part C — Early Intervention); 17 CCR 6501-6508 (developmental screening requirements); AAP Bright Futures Guidelines, 4th Ed. (periodicity schedule); Cal. HSC 124025-124110 (Child Health and Disability Prevention Program — CHDP)',
  standards_of_creation = 'DDS Early Start Assessment Protocols; AAP Bright Futures Screening Tools; First 5 Quality Rating and Improvement System (QRIS) Standards',
  soc_controls = 'SOC 2 (Confidentiality, Privacy, Processing Integrity); FERPA compliance for education records; HIPAA for health records; referral tracking systems'
WHERE name = 'Developmental Screening Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = '22 CCR 101229-101230 (transportation requirements for child care centers); 22 CCR 101174.3 (field trip procedures); Cal. Vehicle Code 545 (school bus requirements); Cal. VEH 2807 (school bus driver requirements); 13 CCR 1200-1294 (school bus and SPAB regulations); Cal. HSC 1596.857 (parental rights — access and information); 22 CCR 101218 (admission agreements — parent authorizations); Cal. EDC 44808 (field trip liability)',
  standards_of_creation = 'CHP SPAB/School Bus Certification Standards; CDSS Transportation Policy Interpretations; AAA School Safety Patrol Standards',
  soc_controls = 'SOC 2 (Security, Processing Integrity); authorization form completeness verification; driver credential validation; vehicle inspection records'
WHERE name = 'Parent Authorization & Transport Safety Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Family Code 7000-7143 (Emancipation of Minors Law); Cal. FAM 7050 (petition for emancipation); Cal. FAM 7120-7123 (rights of emancipated minor); Cal. WIC 391 (transitional independent living plan); Cal. WIC 10609.4 (Extended Foster Care); Judicial Council Form MC-300 (Declaration of Emancipation); 22 CCR 101170 (eligibility for child care services)',
  standards_of_creation = 'Judicial Council Emancipation Petition Standards; CDSS Independent Living Program SOPs; County Probation Department Protocols',
  soc_controls = 'SOC 2 (Confidentiality, Privacy); court record access controls; age verification systems; cross-agency referral tracking'
WHERE name = 'Emancipated Minor Documentation Specialist';

-- ============================================================
-- SECTION B: SOCIAL SERVICES (18 personas)
-- ============================================================

-- B1. Public Assistance & Benefits Administration

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. WIC 11200-11526 (CalWORKs Program); Cal. WIC 11450 (aid computation); Cal. WIC 11523 (CalWORKs Outcomes and Accountability Review); 45 CFR Parts 260-265 (TANF Federal Regulations); 22 CCR 40-000 through 44-400 (CalWORKs regulations); Cal. WIC 10003 (inter-county transfer obligations); Cal. WIC 10006 (staff liaison designation); MPP Division 40-42',
  standards_of_creation = 'CDSS All County Letters (ACLs); All County Information Notices (ACINs); CalWIN/CalSAWS system standards; MPP Division 40-42',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality, Privacy); income verification; identity proofing; SAR-7 reporting compliance; fraud investigation protocols'
WHERE name = 'CalWORKs Eligibility Worker';

UPDATE citizen_catalog SET
  governing_guidelines = '7 CFR Parts 271-285 (SNAP Federal Regulations); 7 CFR 273 (certification of eligible households); Cal. WIC 18900-18930 (Food Stamp/CalFresh provisions); Cal. WIC 18930 (California Food Assistance Program); 22 CCR 63-000 through 63-900 (CalFresh regulations); MPP Division 63; 7 CFR 275 (SNAP Quality Control)',
  standards_of_creation = 'USDA FNS SNAP Quality Control Standards; CDSS CalFresh Program Operations Manual; CalSAWS Data Entry Standards',
  soc_controls = 'SOC 2 (Processing Integrity, Confidentiality); EBT card issuance controls; QC error rate monitoring; Payment Error Rate Measurement (PERM)'
WHERE name = 'CalFresh/SNAP Benefits Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. WIC 14000-14199 (Medi-Cal Program); Cal. WIC 14154 (county administration of eligibility); 42 CFR Parts 430-456 (Medicaid Federal Regulations); 22 CCR 50000-58000 (Medi-Cal Eligibility Regulations); Cal. HSC 1373 (plan contract exceptions for Medi-Cal); 42 USC 1396-1396w-5 (Social Security Act Title XIX); DHCS Medi-Cal Eligibility Procedures Manual',
  standards_of_creation = 'CMS Medicaid Eligibility Quality Control (MEQC); DHCS County Medi-Cal Operations Manual; CalHEERS System Standards',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality, Privacy); HIPAA Security Rule compliance; eligibility verification system; PARIS interstate data matching'
WHERE name = 'Medi-Cal Enrollment Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. WIC 17000-17410 (County General Assistance); Cal. WIC 17001 (county obligation to provide assistance); Cal. WIC 17020 (residency requirements); Cal. WIC 17000.5 (GA for released inmates); County General Assistance Program Ordinances (vary by county); 22 CCR 40-000 (applicable cross-references)',
  standards_of_creation = 'County GA Program Manuals; CDSS GA Reporting Requirements; County Board of Supervisors GA Ordinances',
  soc_controls = 'SOC 2 (Processing Integrity); local audit requirements; residency verification; employability assessment documentation'
WHERE name = 'General Assistance/Relief Caseworker';

UPDATE citizen_catalog SET
  governing_guidelines = '7 CFR Part 246 (WIC Federal Regulations); 7 CFR 246.7 (certification of participants); 7 CFR 246.11 (nutrition education); 42 USC 1786 (Child Nutrition Act — WIC Authorization); Cal. HSC 123275-123370 (California WIC Program); 17 CCR 40500-40870 (WIC program regulations)',
  standards_of_creation = 'USDA FNS WIC Program Management Evaluation Standards; CDPH WIC Local Agency Operations Manual; WIC Information System (WIS) Standards',
  soc_controls = 'SOC 2 (Processing Integrity, Confidentiality); nutritional risk assessment validation; benefit issuance controls; vendor management/monitoring'
WHERE name = 'WIC Program Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = '20 CFR Part 404 Subpart U (representative payee — SSDI); 20 CFR Part 416 Subpart F (representative payee — SSI); 42 USC 405(j) (representative payee provisions); 42 USC 1383(a)(2) (SSI representative payee); SSA Program Operations Manual System (POMS) GN 00502-00599; Cal. WIC 12200-12350 (SSI/SSP California supplement); Cal. Probate Code 2100-2893 (conservatorship — overlap)',
  standards_of_creation = 'SSA Representative Payee Report (Form SSA-6230/SSA-6233); SSA Organizational Payee Accounting Standards; SSA POMS',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); annual accounting requirements; misuse detection; payee suitability screening'
WHERE name = 'SSI/SSDI Representative Payee Specialist';

-- B2. Crisis Intervention & Protective Services

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. PEN 13700-13702 (Domestic Violence Response); Cal. PEN 13750 (Family Justice Centers); Cal. Family Code 6200-6389 (Domestic Violence Prevention Act — DVPA); Cal. WIC 18945 (noncitizen victims eligibility); Cal. Gov. Code 6205-6215 (Safe at Home — Address Confidentiality); 22 CCR 84000-84088 (emergency shelter regulations); 42 USC 10401-10421 (Family Violence Prevention and Services Act — FVPSA); 34 USC 12291 (Violence Against Women Act — VAWA)',
  standards_of_creation = 'CalOES Domestic Violence Program Standards; National Network to End Domestic Violence Data Standards; FVPSA Performance Standards',
  soc_controls = 'SOC 2 Type II (Security, Confidentiality, Privacy); address confidentiality protocols; VAWA confidentiality provisions (34 USC 12291(b)(2)); restricted database access'
WHERE name = 'Domestic Violence Shelter Intake Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. PEN 13823-13823.95 (Sexual Assault Response Team protocols); Cal. PEN 680 (victim notification rights); Cal. Evidence Code 1035-1036.2 (sexual assault counselor-victim privilege); Cal. PEN 11160-11163.6 (mandatory reporting — sexual assault medical examination); 34 USC 12291 (VAWA); 42 USC 10601-10607 (Victims of Crime Act — VOCA); Cal. Gov. Code 13950-13966 (California Victim Compensation Board — CalVCB)',
  standards_of_creation = 'CalOES Rape Crisis Program Standards; SART Protocol Standards; DOJ SAFE Manual (Sexual Assault Forensic Examination)',
  soc_controls = 'SOC 2 (Security, Confidentiality, Privacy); evidentiary privilege protections; forensic evidence chain of custody; VOCA grant compliance'
WHERE name = 'Rape Crisis Center Counselor/Advocate';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. WIC 5150 (72-hour involuntary psychiatric hold); Cal. WIC 5585 (minor 72-hour hold); Cal. WIC 5402 (5150 data collection and reporting); Cal. WIC 5000-5120 (Lanterman-Petris-Short Act — LPS); Cal. WIC 5250 (14-day certification); Cal. WIC 5270.15 (30-day intensive treatment); Cal. WIC 5328 (confidentiality of LPS records); 42 CFR Part 482.61 (CMS Conditions of Participation — psychiatric); Cal. WIC 5982 (CARE Act plans)',
  standards_of_creation = 'DHCS LPS Act Implementation Standards; County Behavioral Health LPS Protocols; Joint Commission Behavioral Health Standards; SAMHSA National Guidelines for Behavioral Health Crisis Care',
  soc_controls = 'SOC 2 Type II (Security, Confidentiality, Privacy); HIPAA Privacy/Security Rules; 42 CFR Part 2 (substance use records — when co-occurring); patient rights verification; hold timeline tracking'
WHERE name = 'Mental Health Crisis Intervention Specialist (5150/5585)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. WIC 18945 (noncitizen trafficking victim eligibility for services); Cal. PEN 236.1-236.2 (human trafficking definitions/penalties); Cal. PEN 13990 (human trafficking law enforcement protocols); 8 USC 1101(a)(15)(T) (T nonimmigrant visa); 8 CFR 214.11 (T-visa eligibility and procedures); 22 USC 7101-7114 (Trafficking Victims Protection Act — TVPA); Cal. Civ. Code 52.5 (trafficking civil action); Cal. Gov. Code 13956(a) (CalVCB eligibility for trafficking victims)',
  standards_of_creation = 'DHS/USCIS T-Visa Processing Standards; CalOES Human Trafficking Program Standards; OVC Model Standards for Serving Victims and Survivors',
  soc_controls = 'SOC 2 Type II (Security, Confidentiality, Privacy); classified victim identity protections; immigration status confidentiality; law enforcement certification (Form I-914B) tracking'
WHERE name = 'Human Trafficking Victim Services Specialist';

-- B3. Substance Abuse & Behavioral Health

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. HSC 11839-11839.34 (Narcotic Treatment Programs); Cal. HSC 11845.5 (SUD treatment record confidentiality); Cal. HSC 11970-11977 (Alcohol and Drug Program Licensing); Cal. WIC 14124.24 (Drug Medi-Cal reimbursable services); 42 CFR Part 2 (Confidentiality of Substance Use Disorder Patient Records); 42 CFR Part 8 (Opioid Treatment Programs); ASAM Criteria, 4th Ed. (level of care determination); 9 CCR 10000-10425 (DHCS SUD Licensing Regulations)',
  standards_of_creation = 'DHCS SUD Provider Certification Standards; ASAM Criteria Multidimensional Assessment; SAMHSA Treatment Improvement Protocols (TIPs); Drug Medi-Cal Organized Delivery System (DMC-ODS) Standards',
  soc_controls = 'SOC 2 Type II (Security, Confidentiality, Privacy); 42 CFR Part 2 enhanced confidentiality; patient consent management; treatment outcome tracking'
WHERE name = 'Substance Abuse Treatment Admission Counselor';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. PEN 1000-1000.8 (Deferred Entry of Judgment — DEJ); Cal. PEN 1210-1210.1 (Proposition 36 — Substance Abuse and Crime Prevention Act); Cal. PEN 1203.044 (drug treatment as condition of probation); Cal. PEN 1211 (drug diversion program quality assurance); Cal. WIC 14124.24 (Drug Medi-Cal treatment services); National Association of Drug Court Professionals (NADCP) Best Practice Standards, Vols. I & II; 42 USC 3796ii (Federal Drug Court Discretionary Grant Program)',
  standards_of_creation = 'NADCP Best Practice Standards; Judicial Council Drug Court Program Standards; SAMHSA Drug Court Evidence-Based Standards; California Drug Court Cost Study Methodology',
  soc_controls = 'SOC 2 (Processing Integrity, Confidentiality); court compliance monitoring systems; drug testing chain of custody; treatment progress verification; graduated sanctions tracking'
WHERE name = 'Drug Court Compliance Coordinator';

-- B4. Disability & Developmental Services

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. WIC 4500-4905 (Lanterman Developmental Disabilities Services Act); Cal. WIC 4642 (eligibility assessment); Cal. WIC 4646 (Individual Program Plan — IPP); Cal. WIC 4712 (fair hearing rights); Cal. WIC 4435 (person-centered service provision); 17 CCR 50600-58680 (DDS Community Services Regulations); Cal. Gov. Code 95004-95020 (Early Start Program); 34 CFR Part 303 (IDEA Part C)',
  standards_of_creation = 'DDS Individual Program Plan (IPP) Standards; Regional Center Performance Contract Standards; DDS Purchase of Service Guidelines; National Core Indicators (NCI)',
  soc_controls = 'SOC 2 (Processing Integrity, Confidentiality, Privacy); IPP timeline compliance tracking; consumer rights protections; service authorization controls; outcome measurement systems'
WHERE name = 'Lanterman Act Regional Center Service Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = '42 USC 12101-12213 (Americans with Disabilities Act — ADA); 29 USC 794 (Section 504 of the Rehabilitation Act); Cal. Gov. Code 11135 (California nondiscrimination in programs); Cal. Gov. Code 12900-12996 (FEHA — disability provisions); 28 CFR Part 35 (ADA Title II — State/Local Government); 28 CFR Part 36 (ADA Title III — Public Accommodations); Cal. WIC 4502 (declaration of rights — developmental disabilities); Cal. CIV 54-55.32 (California Disabled Persons Act)',
  standards_of_creation = 'DOJ ADA Technical Assistance Manuals; EEOC Enforcement Guidance; DOR Vocational Rehabilitation Standards; California Commission on Disability Access Reports',
  soc_controls = 'SOC 2 (Processing Integrity, Confidentiality); ADA complaint tracking; accommodation request processing; accessibility assessment documentation'
WHERE name = 'Disability Rights Compliance Analyst';

-- B5. Housing-Related Social Services

UPDATE citizen_catalog SET
  governing_guidelines = '24 CFR Part 578 (Continuum of Care Program); 24 CFR 578.7(a)(8) (HMIS participation requirement); HUD HMIS Data Standards Manual (current edition); 42 USC 11360-11408 (McKinney-Vento Homeless Assistance Act); Cal. WIC 8257 (Interagency Council on Homelessness); Cal. WIC 11330.5 (CalWORKs housing supports); HUD Data Quality Framework',
  standards_of_creation = 'HUD HMIS Data Standards; HUD System Performance Measures; CoC Governance Charter Standards; HMIS Privacy and Security Standards (HUD Notice CPD-17-01)',
  soc_controls = 'SOC 2 Type II (Security, Confidentiality, Privacy); HMIS user access controls; data quality monitoring; client consent management; de-identification for reporting'
WHERE name = 'HMIS Data Entry Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. WIC 12300-12330 (In-Home Supportive Services Act); Cal. WIC 12301.1 (IHSS reassessment requirements); Cal. WIC 12309 (authorized services determination); 22 CCR 30-700 through 30-784 (IHSS regulations); MPP Division 30; 42 CFR 440.170 (Medicaid home and community-based services); Cal. WIC 12305.7 (IHSS provider enrollment and background checks)',
  standards_of_creation = 'CDSS IHSS Assessment/Authorization Standards; Uniform Assessment Tool; CDSS ACLs on IHSS policy; CMS Home and Community-Based Settings Rule',
  soc_controls = 'SOC 2 (Processing Integrity, Confidentiality, Privacy); functional assessment integrity; provider time verification; payroll controls; fraud detection'
WHERE name = 'IHSS Social Worker';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. WIC 13280 (county refugee social services — CalWORKs plan integration); 45 CFR Part 400 (Refugee Resettlement Program); 8 USC 1521-1524 (Refugee Education Assistance Act); Cal. WIC 13300-13305 (Refugee Cash Assistance); 22 CCR 49-000 through 49-100 (Refugee Programs regulations); ORR Policy Letters and State Letters; Wilson-Fish Alternative Program guidelines (where applicable)',
  standards_of_creation = 'ORR State Plan Requirements; CDSS Refugee Services Operations Manual; Voluntary Agency (VOLAG) Cooperative Agreement Standards; R&P (Reception and Placement) Program Requirements',
  soc_controls = 'SOC 2 (Processing Integrity, Confidentiality, Privacy); immigration status verification; 90-day R&P period tracking; employment outcome monitoring; refugee health screening records'
WHERE name = 'Refugee Resettlement Caseworker';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Military and Veterans Code 970-978 (County Veterans Service Officers); Cal. MVC 972 (CVSO duties); 38 USC 5100-5108 (VA claims processing); 38 CFR Part 3 (VA adjudication regulations); 38 CFR Part 14 (accredited representatives); Cal. MVC 998 (veterans housing programs); 24 CFR Part 576 (Emergency Solutions Grant — veterans component); HUD-VASH Program Operating Requirements',
  standards_of_creation = 'VA Accreditation Standards (38 CFR 14.629); CalVet CVSO Training and Performance Standards; National Association of CVSOs Standards; VA Claims Processing Manual (M21-1)',
  soc_controls = 'SOC 2 (Processing Integrity, Confidentiality, Privacy); VA claims tracking; DD-214 verification; accreditation maintenance; benefits coordination verification'
WHERE name = 'Veterans Services Representative';

-- ============================================================
-- SECTION C: PUBLIC / AFFORDABLE HOUSING (21 personas)
-- ============================================================

-- C1. Federal Housing Programs & Voucher Administration

UPDATE citizen_catalog SET
  governing_guidelines = '24 CFR Part 982 (Section 8 HCV Program); 24 CFR 982.401 (Housing Quality Standards — HQS); 24 CFR 982.516 (family income and composition); 24 CFR 982.551-553 (family obligations/owner obligations); 42 USC 1437f (United States Housing Act — Section 8); HUD PIH Notices (Public and Indian Housing); HUD Guidebook 7420.10G (Housing Choice Voucher Program Guidebook); Cal. HSC 34200-34380 (Housing Authorities Law)',
  standards_of_creation = 'HUD Section Eight Management Assessment Program (SEMAP) Indicators; HUD Financial Management Standards; PHA Administrative Plan Requirements; HUD-50058 Data Collection Standards',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality, Privacy); income verification (EIV system); HAP calculation accuracy; waiting list management; inspection scheduling integrity'
WHERE name = 'Section 8 Housing Choice Voucher Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = '24 CFR Part 960 (Public Housing Admissions and Occupancy); 24 CFR 960.201-206 (eligibility); 24 CFR 960.253-259 (rent determination); 24 CFR Part 966 (Public Housing Lease and Grievance Procedures); 42 USC 1437a-1437z (United States Housing Act); HUD ACOP Requirements; HUD Handbook 7465.1 (Public Housing Occupancy Handbook)',
  standards_of_creation = 'HUD Public Housing Assessment System (PHAS); HUD-50058 Form Standards; PHA ACOP Template Standards; EIV System Access and Use Requirements',
  soc_controls = 'SOC 2 (Processing Integrity, Confidentiality, Privacy); EIV income verification; annual/interim reexamination tracking; flat rent/income-based rent calculation verification'
WHERE name = 'Public Housing Eligibility Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = '24 CFR Part 5 Subpart G (Physical Condition Standards — NSPIRE); 24 CFR 5.703 (NSPIRE standards effective 10/1/2023); HUD NSPIRE Standards (replacing UPCS); 24 CFR 982.401 (HQS for voucher units); 24 CFR 902 (Public Housing Assessment System — physical component); HUD Notice PIH 2023-01 (NSPIRE Implementation); Cal. CIV 1941-1942.5 (implied warranty of habitability)',
  standards_of_creation = 'HUD NSPIRE Inspection Protocol; HUD NSPIRE Deficiency Dictionary; HUD Inspector Training and Certification Standards; REAC Scoring Methodology',
  soc_controls = 'SOC 2 (Processing Integrity, Availability); inspection scheduling randomization; inspector conflict-of-interest screening; score calculation verification; deficiency tracking and resolution'
WHERE name = 'HUD Inspector (REAC/NSPIRE)';

UPDATE citizen_catalog SET
  governing_guidelines = '24 CFR Part 92 (HOME Investment Partnerships Program); 24 CFR 92.252 (rental housing qualification — affordability); 24 CFR 92.254 (homeownership qualification); 24 CFR 92.504 (participating jurisdiction responsibilities); 42 USC 12741-12756 (HOME statutory authority); 2 CFR Part 200 (Uniform Administrative Requirements — single audit); HUD CPD Notices on HOME compliance',
  standards_of_creation = 'HUD HOME Program Compliance Monitoring Guide; HUD IDIS (Integrated Disbursement and Information System) Standards; HUD-40107 Reporting Standards; Affordability Period Monitoring SOPs',
  soc_controls = 'SOC 2 (Processing Integrity, Confidentiality); affordability period tracking; income qualification verification; property standard compliance; IDIS data entry integrity'
WHERE name = 'HOME Program Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = '24 CFR Part 570 (CDBG Program); 24 CFR 570.200-570.210 (eligible activities and national objectives); 24 CFR 570.501-570.506 (subrecipient and financial management); 42 USC 5301-5321 (Housing and Community Development Act); 2 CFR Part 200 (Uniform Guidance — single audit); 24 CFR 570.611 (conflict of interest); HUD CDBG Guide to National Objectives and Eligible Activities',
  standards_of_creation = 'HUD CDBG Performance Measurement Framework; HUD IDIS Reporting Standards; Consolidated Plan/Annual Action Plan Standards; CAPER (Consolidated Annual Performance and Evaluation Report) Standards',
  soc_controls = 'SOC 2 (Processing Integrity); national objective documentation; benefit tracking; subrecipient monitoring; environmental review (24 CFR Part 58) compliance'
WHERE name = 'CDBG Program Compliance Specialist';

-- C2. Tax Credit & Affordable Housing Development

UPDATE citizen_catalog SET
  governing_guidelines = '26 USC 42 (IRC Section 42 — Low-Income Housing Tax Credit); Cal. RTC 12206 (California LIHTC — corporations); Cal. RTC 17058 (California LIHTC — personal income); Cal. RTC 23610.5 (California LIHTC — bank/corp); 26 CFR 1.42-0 through 1.42-19T (IRS LIHTC Regulations); TCAC Regulatory Agreement Requirements; IRS Guide for Completing Form 8823; 4 CCR 10300-10337 (TCAC Qualified Allocation Plan regulations)',
  standards_of_creation = 'TCAC Compliance Monitoring Manual; IRS Form 8823 Guide (Low-Income Housing Credit Agencies Report of Noncompliance); National Council of State Housing Agencies (NCSHA) Recommended Practices; TCAC Annual Owner Certification Standards',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); tenant income certification (TIC) verification; unit inspection protocols; applicable fraction monitoring; 15-year/30-year compliance period tracking; recapture prevention'
WHERE name = 'LIHTC Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Gov. Code 65915-65918 (Density Bonus Law); Cal. Gov. Code 65850 (local zoning authority); Cal. Gov. Code 65583 (housing element requirements); Cal. Gov. Code 65589.5 (Housing Accountability Act); Cal. Gov. Code 65912.114 (streamlined development consistency); Cal. HSC 50093 (lower income household definition); Cal. HSC 50105 (extremely low income); 25 CCR 6900-6924 (HCD Density Bonus regulations)',
  standards_of_creation = 'HCD Density Bonus Law Technical Assistance; Local Inclusionary Housing Ordinance Standards; HCD Housing Element Compliance Review; Affordability Covenant Recording Standards',
  soc_controls = 'SOC 2 (Processing Integrity); affordability covenant tracking; density bonus calculation verification; concession/incentive documentation; annual monitoring compliance'
WHERE name = 'Inclusionary Zoning & Density Bonus Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. HSC 50650-50675 (Community Land Trust provisions); Cal. Gov. Code 65913.16 (Affordable Housing on Faith and Higher Education Lands); Cal. RTC 402.1 (property tax assessment for restricted land); 24 CFR 92.252 (HOME affordability — CLT projects); Cal. CIV 1460-1470 (ground lease provisions); HUD CPD Notice on CLT eligibility for HOME/CDBG',
  standards_of_creation = 'Grounded Solutions Network CLT Standards; HCD Affordability Restriction Recording Standards; CLT Ground Lease Model Standards; Resale Formula Compliance Standards',
  soc_controls = 'SOC 2 (Processing Integrity); ground lease compliance monitoring; resale restriction enforcement; affordability period tracking; stewardship fund management'
WHERE name = 'Community Land Trust Compliance Officer';

-- C3. Fair Housing & Tenant Rights

UPDATE citizen_catalog SET
  governing_guidelines = '42 USC 3601-3619 (Federal Fair Housing Act); 24 CFR Part 100 (HUD Fair Housing Regulations); Cal. Gov. Code 12900-12996 (Fair Employment and Housing Act — FEHA); Cal. Gov. Code 12955-12956.2 (housing discrimination provisions); Cal. CIV 51-53 (Unruh Civil Rights Act); 24 CFR 103 (Fair Housing Complaint Processing); HUD FHEO Investigative Guidance; Cal. Gov. Code 11135 (nondiscrimination in state programs)',
  standards_of_creation = 'HUD FHEO Investigator Manual; CRD Complaint Processing Manual; HUD Conciliation Standards; FHAP (Fair Housing Assistance Program) Performance Standards',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality, Privacy); complaint tracking system integrity; investigation timeline compliance; conciliation/mediation documentation; testing program controls'
WHERE name = 'Fair Housing Investigator';

UPDATE citizen_catalog SET
  governing_guidelines = '42 USC 3604(f) (FHA disability discrimination prohibition); 24 CFR 100.204 (reasonable accommodation); 24 CFR 100.203 (reasonable modification); 29 USC 794 (Section 504 — federally assisted housing); 24 CFR Part 8 (Section 504 regulations for HUD programs); Cal. Gov. Code 12927(c)(1) (reasonable accommodation under FEHA); Cal. CIV 54.1 (access to housing for persons with disabilities); HUD/DOJ Joint Statement on Reasonable Accommodations (2004); HUD/DOJ Joint Statement on Reasonable Modifications (2008)',
  standards_of_creation = 'HUD/DOJ Joint Statements (2004, 2008); FHEO Technical Assistance Standards; Interactive Process Documentation Standards; Medical Verification Standards (limited inquiry)',
  soc_controls = 'SOC 2 (Confidentiality, Privacy, Processing Integrity); medical information confidentiality; interactive process documentation; modification escrow management'
WHERE name = 'Reasonable Accommodation Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = '15 USC 1681-1681x (Fair Credit Reporting Act — FCRA); 16 CFR Part 698 (FCRA regulations); Cal. CIV 1785.1-1786.60 (California Consumer Credit Reporting Agencies Act); Cal. CIV 1785.13 (adverse action notice); Cal. CIV 1947.12 (Tenant Protection Act — rent cap/just cause); Cal. Gov. Code 12955 (source of income discrimination prohibition); Cal. CIV 1946.2 (just cause eviction requirements); FTC Guidance: Using Consumer Reports — What Landlords Need to Know',
  standards_of_creation = 'CFPB FCRA Examination Procedures; FTC Adverse Action Notice Standards; National Apartment Association (NAA) Screening Standards; California Apartment Association (CAA) Compliance Guidelines',
  soc_controls = 'SOC 2 Type II (Security, Confidentiality, Privacy); permissible purpose verification; adverse action notice tracking; dispute resolution process; consumer report disposal (FACTA)'
WHERE name = 'Tenant Screening Compliance Analyst (FCRA)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. CIV 1947.12 (Tenant Protection Act of 2019 — AB 1482, statewide rent cap); Cal. CIV 1946.2 (just cause eviction — AB 1482); Cal. CIV 1947.13 (COVID-19 rental debt provisions — sunset); Local Rent Stabilization Ordinances (SF, LA, Oakland, Berkeley, etc.); Costa-Hawkins Rental Housing Act (Cal. CIV 1954.50-1954.535); Cal. CIV 827 (rent increase notice requirements); Cal. CIV 1942.5 (retaliatory eviction protections)',
  standards_of_creation = 'Local Rent Board Administrative Regulations; AB 1482 Implementation Guidance (CA Attorney General); Annual General Adjustment (AGA) Calculation Standards; Petition and Hearing Procedures',
  soc_controls = 'SOC 2 (Processing Integrity); rent increase calculation verification; just cause documentation; banking/pass-through tracking; petition/hearing record integrity'
WHERE name = 'Rent Stabilization/Rent Control Compliance Analyst';

-- C4. Health & Safety Disclosures

UPDATE citizen_catalog SET
  governing_guidelines = '42 USC 4851-4856 (Residential Lead-Based Paint Hazard Reduction Act — Title X); 24 CFR Part 35 (HUD Lead-Based Paint Regulations); 40 CFR Part 745 (EPA Lead-Based Paint Regulations); 40 CFR 745.80-745.91 (RRP Rule); 40 CFR 745.100-745.119 (disclosure requirements); Cal. HSC 105250-105310 (California lead hazard statutes); 17 CCR 35001-36100 (CDPH lead-related construction regulations); EPA Pamphlet "Protect Your Family From Lead in Your Home"',
  standards_of_creation = 'EPA RRP Certified Firm Standards; HUD Guidelines for the Evaluation and Control of Lead-Based Paint Hazards in Housing (2012 Ed.); EPA/HUD Disclosure Rule Compliance Guide; CDPH Lead-Related Construction Certification Standards',
  soc_controls = 'SOC 2 (Processing Integrity); disclosure timing verification; pre-1978 building identification; EPA firm certification tracking; clearance testing documentation'
WHERE name = 'Lead Paint Disclosure Specialist (EPA RRP)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. CIV 1941-1942.5 (implied warranty of habitability); Cal. CIV 1941.1 (conditions rendering dwelling untenantable); Cal. CIV 1941.3 (deadbolt locks/window security); Cal. HSC 17910-17998.3 (State Housing Law); Cal. HSC 17920.3 (substandard building definition); 24 CCR (California Building Standards Code); 25 CCR 1-100 (HCD housing regulations); Cal. CIV 1942 (tenant remedies for uninhabitable conditions)',
  standards_of_creation = 'HCD Enforcement Advisory Standards; Local Building Inspection Division Protocols; ICC (International Code Council) Property Maintenance Code; California Building Standards Code (Title 24) Compliance',
  soc_controls = 'SOC 2 (Processing Integrity, Availability); inspection scheduling; violation tracking; abatement timeline compliance; re-inspection verification'
WHERE name = 'Habitability & Property Condition Inspector';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. HSC 26100-26148 (Toxic Mold Protection Act); Cal. HSC 26105 (mold disclosure to tenants); Cal. CIV 1102-1102.17 (seller disclosure — residential property); Cal. HSC 17920.3(a)(13) (mold as substandard condition); Cal. CIV 1941.1 (mold rendering dwelling untenantable — judicial interpretation); EPA Guidance: "Mold Remediation in Schools and Commercial Buildings"; IICRC S520 Standard for Professional Mold Remediation',
  standards_of_creation = 'CDPH Statement on Mold Assessment and Remediation; IICRC S520 Standards; AIHA Recognition/Assessment/Remediation Guidance; Cal-OSHA Mold Exposure Standards (8 CCR)',
  soc_controls = 'SOC 2 (Processing Integrity); disclosure timing verification; remediation documentation; clearance testing records; tenant notification tracking'
WHERE name = 'Mold & Environmental Hazard Disclosure Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. CIV 1954.600-1954.605 (Bedbug disclosure requirements — AB 551); Cal. CIV 1954.602 (landlord disclosure of known infestation); Cal. CIV 1954.603 (tenant reporting obligations); Cal. BPC 8500-8698 (Structural Pest Control Act); 16 CCR 1900-2094 (Structural Pest Control Board regulations); Cal. HSC 17920.3 (substandard conditions — pest infestation); EPA IPM Principles guidance',
  standards_of_creation = 'SPCB Inspection and Reporting Standards; National Pest Management Association (NPMA) Best Practices; CDPH Bedbug Management Guidelines; IPM Documentation Standards',
  soc_controls = 'SOC 2 (Processing Integrity); disclosure form tracking; treatment history documentation; re-inspection scheduling; tenant notification verification'
WHERE name = 'Bedbug Disclosure & Pest Management Specialist';

-- C5. Specialized Housing Types

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. CIV 798-799.11 (Mobilehome Residency Law — MRL); Cal. CIV 798.17 (rent increase notice); Cal. CIV 798.55-798.61 (termination of tenancy); Cal. CIV 798.73-798.82 (homeowner sale rights); Cal. HSC 18000-18700 (Mobilehome Parks Act); Cal. HSC 18550 (permit to operate); 25 CCR 1000-1748 (HCD mobilehome park regulations); Cal. CIV 799.1.5 (resident meetings — HOA-like protections)',
  standards_of_creation = 'HCD Mobilehome Park Inspection Standards; HCD Mobilehome Registration and Titling Standards; MRL Compliance Guidance (CA Attorney General); Local Rent Control Ordinances (mobilehome-specific)',
  soc_controls = 'SOC 2 (Processing Integrity); lease/rental agreement compliance tracking; space rent increase verification; sale/transfer documentation; inspection scheduling'
WHERE name = 'Mobile Home Park (MRL) Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = '24 CFR Part 882 Subpart H (HUD SRO Moderate Rehabilitation); Cal. HSC 17958.1 (local building standards — SRO specific); Cal. HSC 17920.3 (substandard building standards); Local SRO Preservation/Conversion Ordinances; Cal. CIV 1941-1942.5 (implied warranty of habitability); Cal. Gov. Code 65583 (housing element — SRO inventory); HUD NSPIRE Standards (SRO-specific protocols)',
  standards_of_creation = 'Local SRO Inspection Protocols; HUD SRO Mod Rehab Program Standards; HCD Building Standards for Residential Hotels; Local Health Department SRO Standards',
  soc_controls = 'SOC 2 (Processing Integrity, Availability); inspection frequency compliance; violation abatement tracking; conversion/demolition prevention monitoring; occupancy standards verification'
WHERE name = 'SRO (Single Room Occupancy) Compliance Inspector';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Gov. Code 65852.2 (ADU statutory framework); Cal. Gov. Code 65852.22 (Junior ADU); Cal. Gov. Code 65852.21 (two-unit residential developments — SB 9); Cal. Gov. Code 65852.24 (Middle Class Housing Act); Cal. Gov. Code 66411.7 (urban lot split — SB 9); 25 CCR 6600-6616 (HCD ADU regulations); Cal. HSC 17950-17958 (State Housing Law — building standards); HCD ADU Handbook (Technical Assistance)',
  standards_of_creation = 'HCD ADU Handbook and Technical Assistance; Local ADU Ordinance Standards; California Building Standards Code (Title 24) for ADUs; HCD 60-Day Review Standards',
  soc_controls = 'SOC 2 (Processing Integrity); permit application completeness; ministerial approval timeline tracking; impact fee deferral tracking; deed restriction verification'
WHERE name = 'ADU (Accessory Dwelling Unit) Permit Specialist';

-- C6. Relocation & Eviction Prevention

UPDATE citizen_catalog SET
  governing_guidelines = '42 USC 4601-4655 (Uniform Relocation Assistance and Real Property Acquisition Policies Act — URA); 49 CFR Part 24 (URA Implementing Regulations); 24 CFR Part 42 (HUD Displacement and Relocation Assistance); Cal. Gov. Code 7260-7277 (California Relocation Assistance Act); 25 CCR 6000-6174 (HCD Relocation Assistance Regulations); Cal. CCP 1263.010-1273.050 (Eminent Domain Law); HUD Handbook 1378 (Tenant Assistance, Relocation, and Real Property Acquisition)',
  standards_of_creation = 'HUD Handbook 1378; FHWA URA/Section 104(d) Guidance; HCD Relocation Plan Requirements; Advisory Services Standards (49 CFR 24.205)',
  soc_controls = 'SOC 2 (Processing Integrity); comparable housing verification; 90-day notice compliance; relocation payment calculation verification; advisory services documentation'
WHERE name = 'Uniform Relocation Act (URA) Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. CIV 1946.2 (just cause eviction — AB 1482); Cal. CIV 1947.12 (rent cap — AB 1482); Cal. CCP 1161-1179a (Unlawful Detainer); Cal. CCP 1161.2 (just cause requirements in UD); 24 CFR Part 576 (Emergency Solutions Grant — homelessness prevention); Cal. WIC 11330.5 (CalWORKs housing supports); Cal. WIC 11330.7 (case management and home visiting); ERA (Emergency Rental Assistance) Program Guidelines',
  standards_of_creation = 'HUD ESG Homelessness Prevention Standards; CDSS Housing and Homelessness Programs Division Standards; Local Right to Counsel Program Standards; Housing is Key Platform Standards',
  soc_controls = 'SOC 2 (Processing Integrity, Confidentiality); rental assistance payment tracking; landlord-tenant mediation documentation; court filing timeline monitoring; legal representation tracking'
WHERE name = 'Eviction Prevention Program Coordinator';

-- ============================================================
-- SECTION 2: CORRECTIONS / PROBATION & PAROLE / REENTRY
-- (79 personas)
-- ============================================================

-- ============================================================
-- A. CORRECTIONS / JAILS / PRISONS (33 personas)
-- ============================================================

-- A1. Intake / Booking / Classification

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 830-832.18 (peace officer/custodial officer authority); Cal. Penal Code ss 4532 (prisoner booking requirements); 15 CCR ss 1006-1029 (Minimum Standards for Local Detention Facilities -- Booking); 15 CCR ss 1050-1055 (Classification procedures); BSCC Title 15 Minimum Jail Standards; POST Basic Course requirements (Title 11 CCR ss 1005)',
  standards_of_creation = 'Booking documents must be completed at time of intake; positive identification verified; medical screening initiated within timeframes; bail/charges accurately recorded; property inventory witnessed and signed; CLETS/NCIC queries documented; photographs and fingerprints per PC ss 7116',
  soc_controls = 'Dual verification of identity; supervisor review within 24 hours; audit trail on all CLETS queries; time-stamped entries; tamper-evident property seals; video recording of booking process'
WHERE name = 'Booking Officer';

UPDATE citizen_catalog SET
  governing_guidelines = '15 CCR ss 3375-3379 (CDCR Classification scoring); 15 CCR ss 1050-1055 (BSCC Minimum Standards -- Classification); ACA Standard 4-4246 through 4-4250 (Classification); CDCR Department Operations Manual (DOM) ss 61010-62080; Cal. Penal Code ss 5068 (classification system mandate)',
  standards_of_creation = 'Objective classification instrument completed within 72 hours of reception; point-based scoring documented; override justifications written and supervisor-approved; reclassification at mandated intervals (annual minimum); housing assignment documented with safety/security rationale',
  soc_controls = 'Supervisor approval of all overrides; automated scoring validation; annual reclassification audits; separation alerts maintained; documentation of inmate interview; committee review records'
WHERE name = 'Classification Officer / Counselor';

UPDATE citizen_catalog SET
  governing_guidelines = '15 CCR ss 3075-3078 (Reception Center processing); CDCR DOM ss 62010 (Reception Center procedures); Cal. Penal Code ss 5068 (reception and diagnosis); CCHCS Health Care Department Operations Manual',
  standards_of_creation = 'Complete intake package within 60 days; medical, dental, mental health screenings per CCHCS timelines; criminal history verified through DOJ; education level assessed; vocational aptitude documented; social history compiled; institutional recommendations prepared for classification committee',
  soc_controls = 'Multi-disciplinary team review; checklist completion verification; medical clearance before transfer; time-stamped processing milestones; supervisor sign-off on final package'
WHERE name = 'Reception Center Intake Coordinator (CDCR)';

-- A2. Medical / Mental Health (Custody)

UPDATE citizen_catalog SET
  governing_guidelines = 'NCCHC Standards for Health Services in Prisons (2018/2022) -- Standards P-A-01 through P-J-03; NCCHC Standard P-E-02 (Receiving screening), P-E-04 (Health assessment); Plata v. Newsom consent decree requirements (medical adequacy); CCHCS Health Care Department Operations Manual; 42 USC ss 1983 (constitutional adequacy of care -- Estelle v. Gamble, 429 U.S. 97); 15 CCR ss 3350-3369 (Health care services); ACA Standards 4-4346 through 4-4398 (Health Care); Cal. Business & Professions Code ss 2000+ (Medical Practice Act)',
  standards_of_creation = 'Health assessments within 14 days of intake; chronic care encounters per clinical guidelines; sick call response within 24 hours of request; documentation in EHRS (Electronic Health Record System); progress notes per SOAP format; medication orders verified by pharmacy; informed consent for procedures documented',
  soc_controls = 'Peer review; clinical quality management committees; CCHCS monitoring visits; NCCHC accreditation audits; malpractice/mortality review; credentialing verification; controlled substance logs; referral tracking'
WHERE name = 'Correctional Physician (MD/DO)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Coleman v. Newsom consent decree (mental health adequacy); CCHCS Mental Health Services Delivery System Program Guide; NCCHC Standard P-G-01 through P-G-08 (Mental Health); APA Practice Guidelines for psychiatric assessment; 15 CCR ss 3360-3369 (Mental health services in custody); Cal. Welfare & Institutions Code ss 5150-5155 (involuntary hold authority); Tarasoff duty to warn',
  standards_of_creation = 'Psychiatric evaluation within 14 days of mental health referral; DSM-5-TR diagnostic formulation documented; medication management notes per encounter; treatment plan updated minimum quarterly; involuntary medication orders per Keyhea v. Rushen procedures; MHCB admission/discharge documented; suicide risk assessment per CDCR MHSDS protocols',
  soc_controls = 'Clinical case conferences; interdisciplinary treatment team (IDTT) documentation; psychotropic medication monitoring; seclusion/restraint incident review; transfer of care documentation; quality improvement data'
WHERE name = 'Correctional Psychiatrist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Coleman v. Newsom decree requirements; CCHCS MHSDS Program Guide (psychological assessment protocols); APA Ethical Principles ss 9.01-9.11 (Assessment); NCCHC Standard P-G-04 (Mental health assessment); 15 CCR ss 3360-3369; Cal. Business & Professions Code ss 2900-2999 (Psychology licensing)',
  standards_of_creation = 'Psychological evaluations with standardized instruments; risk assessments (HCR-20, PCL-R) documented with scoring; competency evaluations per court order; group/individual therapy progress notes; crisis intervention documented in real-time; IDTT participation notes; mental health classification level (CCCMS, EOP, ICF, DSH) documented with clinical rationale',
  soc_controls = 'Supervision of trainees documented; test security maintained; clinical peer review; outcomes tracking; treatment plan compliance monitoring; cultural competency documentation'
WHERE name = 'Correctional Psychologist (PhD/PsyD)';

UPDATE citizen_catalog SET
  governing_guidelines = 'NCCHC Standards P-E-02 (Receiving screening -- typically nurse-administered); CCHCS Nursing Protocol Manual; Cal. Business & Professions Code ss 2700+ (Nursing Practice Act); 15 CCR ss 3350-3369; ACA Standards 4-4346 through 4-4370',
  standards_of_creation = 'Receiving screening at intake (within hours); sick call triage documented; medication administration per MAR (Medication Administration Record); vital signs charted; nursing assessments per protocol; emergency response documented; chronic care nursing encounters per CCHCS timelines',
  soc_controls = 'Two-nurse verification for high-risk medications; controlled substance count logs; supervisor co-signature for LVN assessments; infection control documentation; sharps accountability; needle exchange program records (per AB 186 where applicable)'
WHERE name = 'Correctional Nurse (RN/LVN)';

UPDATE citizen_catalog SET
  governing_guidelines = 'NCCHC Standard P-E-09 (Dental screening), P-E-10 (Dental treatment); CCHCS Dental Services Program Guide; Plata v. Newsom (dental services component); ACA Standard 4-4370 (Dental care); Cal. Business & Professions Code ss 1600+ (Dental Practice Act)',
  standards_of_creation = 'Dental screening within 30 days of intake; treatment plan documented with radiographic evidence; informed consent for extractions/procedures; emergency dental seen within 24 hours; dental charting maintained per ADA standards',
  soc_controls = 'Dental quality management review; credentialing; instrument sterilization logs; radiology safety compliance; patient grievance response tracking'
WHERE name = 'Correctional Dentist (DDS/DMD)';

UPDATE citizen_catalog SET
  governing_guidelines = 'NCCHC Standard P-G-05 (Suicide prevention and intervention); BSCC Title 15 ss 1207-1219 (Suicide prevention in jails); 15 CCR ss 1219 (Suicide prevention standards -- local facilities); NIC/Hayes Suicide Prevention Guidelines (2010/2013); Cal. Penal Code ss 6045 (Training requirements); CDCR DOM Chapter 5, Article 22 (Suicide prevention)',
  standards_of_creation = 'Suicide risk screening at every intake; validated screening instrument documented; safety plan created for at-risk inmates; watch level (1:1, 15-min, 30-min) documented with clinical rationale; near-miss and completed suicide reports per DOJ format; annual program review documented; staff training records maintained',
  soc_controls = 'Watch log verification (actual observations vs. documented); environmental safety audits; cell-check timing analysis; post-incident mortality review; proactive identification tracking; critical incident debriefing documentation'
WHERE name = 'Suicide Prevention Coordinator';

-- A3. Use of Force / Custody Operations

UPDATE citizen_catalog SET
  governing_guidelines = '15 CCR ss 3268-3268.3 (Use of Force -- CDCR); 15 CCR ss 1006, 1029 (Use of Force -- local jails, BSCC); CDCR DOM ss 51020 (Use of Force policy); Cal. Penal Code ss 835a (Peace officer use of force standards -- AB 392); Cal. Penal Code ss 830.5 (Correctional officer peace officer authority); ACA Standard 4-4190 through 4-4203 (Use of Force); POST Perishable Skills Training requirements',
  standards_of_creation = 'Use of force reports completed before end of shift; all force described with specifics (type, duration, justification); medical evaluation of subject documented post-incident; supervisor notified immediately; body-worn camera / fixed camera footage preserved; witness statements obtained; chain of command review within 7 days',
  soc_controls = 'Supervisor review and sign-off; video-to-report reconciliation; executive review for serious force; Office of Inspector General (OIG) oversight; annual use-of-force data analysis; excessive force pattern tracking'
WHERE name = 'Correctional Officer (Line Staff)';

UPDATE citizen_catalog SET
  governing_guidelines = '15 CCR ss 3268-3268.3 (supervisory review of force); CDCR DOM ss 51020.7 (Supervisor responsibilities -- force review); 15 CCR ss 3315-3323 (Disciplinary proceedings supervision); ACA Standards (Supervisory review requirements)',
  standards_of_creation = 'Supervisor''s report completed within 72 hours of force incident; independent assessment of necessity and proportionality documented; evidence collection log completed; camera footage review documented; inmate interview conducted post-incident; recommendations for referral to Internal Affairs documented',
  soc_controls = 'Use-of-force review committee; time-stamp analysis (incident vs. report); video audit; independent reviewer assignment for Level I force; quarterly trend analysis'
WHERE name = 'Correctional Sergeant (Shift Supervisor)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 6126-6133 (OIG oversight authority); CDCR Use of Force Review Board Procedures (DOM ss 51020.17); 15 CCR ss 3268.3 (Administrative review of force); ACA Standard 4-4203 (Force review)',
  standards_of_creation = 'Written findings for each force incident reviewed; classification of force level (immediate/controlled/deadly); sustained/not-sustained/exonerated/unfounded determination documented; recommendations for discipline, training, or policy change; annual statistical report compiled',
  soc_controls = 'Board composition requirements (multi-rank); independence from involved staff; access to unredacted materials; pattern analysis; OIG audit of board decisions'
WHERE name = 'Use of Force Review Board Member';

-- A4. Disciplinary / Grievance / Due Process

UPDATE citizen_catalog SET
  governing_guidelines = '15 CCR ss 3312 (Rules Violation Report -- RVR); 15 CCR ss 3315 (Serious rule violations -- Division A/B offenses); 15 CCR ss 3314 (Administrative rules violations -- Division C-F); CDCR DOM ss 52080 (RVR procedures); Wolff v. McDonnell, 418 U.S. 539 (due process in prison discipline)',
  standards_of_creation = 'RVR issued within 72 hours of discovery; specific factual description; classification of offense level; confidential information documented separately; inmate notified of charges with 24-hour advance of hearing; evidence preserved and logged; witness list compiled',
  soc_controls = 'Supervisor review before service on inmate; hearing officer independence; time-compliance tracking; appeal response monitoring; confidential supplement handling procedures'
WHERE name = 'Rules Violation Report Writer (Correctional Officer)';

UPDATE citizen_catalog SET
  governing_guidelines = '15 CCR ss 3315-3323 (Disciplinary hearing procedures); Wolff v. McDonnell, 418 U.S. 539 (right to call witnesses, written findings); Superintendent v. Hill, 472 U.S. 445 ("some evidence" standard); CDCR DOM ss 52080 (Hearing procedures); In re Jenkins (2010) 50 Cal.4th 1167 (credit loss review)',
  standards_of_creation = 'Written disposition within 5 days of hearing; findings of fact stated with evidentiary basis; "some evidence" standard articulated; penalty proportionality documented; credit forfeiture calculated; appeal rights advised in writing; confidential evidence reviewed in camera with documented rationale',
  soc_controls = 'Independence from charging officer; recording of hearing; written decision quality review; appeal compliance rates; reversal rate analysis; due process checklist completion'
WHERE name = 'Senior Hearing Officer (SHO) / Disciplinary Hearing Officer';

UPDATE citizen_catalog SET
  governing_guidelines = '15 CCR ss 3480-3487 (CDCR Grievance procedures -- revised 2020); 42 USC ss 1997e(a) (Prison Litigation Reform Act -- exhaustion requirement); CDCR DOM Chapter 11 (Grievance process); Armstrong v. Newsom (ADA compliance in grievance process); BSCC Title 15 ss 1073 (Grievance procedure -- local jails)',
  standards_of_creation = 'Grievance acknowledged within 5 business days; investigation documented; response at each level within regulatory timeframes; institutional level response within 60 days; headquarters level within 60 days; screening decisions documented with reasons; interview of grievant documented; remedial action tracked',
  soc_controls = 'Exhaustion tracking (PLRA compliance); time-compliance reporting; trend analysis; third-level review independence; OIG audit; retaliation complaint flagging; ADA/DPP accessible format compliance'
WHERE name = 'Inmate Appeals Coordinator / Grievance Coordinator';

-- A5. PREA / Sexual Safety

UPDATE citizen_catalog SET
  governing_guidelines = '34 USC ss 30301-30309 (Prison Rape Elimination Act of 2003); 28 CFR Part 115 (National Standards to Prevent, Detect, and Respond to Prison Rape); 28 CFR ss 115.11-115.18 (Prevention planning); 28 CFR ss 115.21-115.22 (Evidence and screening); 28 CFR ss 115.31-115.35 (Training and education); 28 CFR ss 115.41-115.43 (Screening for risk); 28 CFR ss 115.51-115.54 (Reporting); 28 CFR ss 115.61-115.68 (Official response); 28 CFR ss 115.71-115.73 (Investigations); 28 CFR ss 115.76-115.78 (Discipline); 28 CFR ss 115.86-115.89 (Data collection and review); 28 CFR ss 115.401-115.403 (Auditing and corrective action); 15 CCR ss 3401.5-3401.7 (CDCR PREA rules)',
  standards_of_creation = 'PREA screening within 72 hours of intake; vulnerability assessment documented; incident reports within prescribed timeframes; investigation initiated within specified hours; evidence collection per sexual assault forensic protocol; victim notification documented; data aggregated for DOJ annual report; corrective action plans written; third-party audit compliance demonstrated',
  soc_controls = 'External audit (3-year cycle); camera placement analysis; staffing plan adequacy review; cross-gender supervision restrictions documented; investigation independence; staff training verification; retaliation monitoring for 90 days post-report'
WHERE name = 'PREA Compliance Manager';

UPDATE citizen_catalog SET
  governing_guidelines = '28 CFR ss 115.71-115.73 (Investigation requirements); 28 CFR ss 115.21 (Evidence protocols); CDCR DOM ss 54040 (PREA investigation procedures); Cal. Penal Code ss 264-269 (Sexual assault statutes); SAFE/SART examination protocols',
  standards_of_creation = 'Investigation initiated immediately upon report; forensic exam offered within specified timeframe; evidence preserved per law enforcement standards; victim and witness interviews conducted and recorded; credibility assessment documented without bias; findings documented (substantiated/unsubstantiated/unfounded); referral to district attorney for criminal prosecution documented; administrative findings separated from criminal',
  soc_controls = 'Investigator independence from facility command; specialized training verification; evidence chain of custody; case file completeness review; prosecution referral tracking; victim advocate involvement documented'
WHERE name = 'PREA Investigator';

-- A6. Inmate Accounts / Commissary

UPDATE citizen_catalog SET
  governing_guidelines = '15 CCR ss 3090-3099 (Trust account management); Cal. Penal Code ss 5007.5 (Inmate trust fund); CDCR DOM ss 51030 (Trust account procedures); Government Accounting Standards Board (GASB) standards; Cal. Government Code ss 12410 (State Controller oversight)',
  standards_of_creation = 'All deposits and withdrawals documented with source/authorization; restitution fine deductions per court order (PC ss 2085.5); victim restitution deductions documented; administrative fees itemized; quarterly statements provided to inmates; release funds calculated at discharge; garnishment orders implemented per court directives',
  soc_controls = 'Dual-signature requirements for disbursements over threshold; monthly reconciliation; State Controller audit; separation of duties (receipt vs. disbursement); transaction audit trail; fraud detection algorithms; grievance response for discrepancies'
WHERE name = 'Inmate Trust Account Officer';

UPDATE citizen_catalog SET
  governing_guidelines = '15 CCR ss 3090-3099 (Commissary operations); Cal. Penal Code ss 5006 (Inmate Welfare Fund); CDCR DOM ss 51030.4 (Commissary); ACA Standard 4-4304 (Commissary)',
  standards_of_creation = 'Inventory records maintained; pricing schedules posted; purchase orders matched to trust account debits; delivery verification documented; spoilage/loss documented; vendor contracts on file; audit of Inmate Welfare Fund expenditures',
  soc_controls = 'Physical inventory counts (monthly); price audit; vendor contract compliance review; fund balance reporting; separation of purchasing and receiving; inmate welfare fund advisory committee minutes'
WHERE name = 'Commissary Manager';

-- A7. Communications Monitoring

UPDATE citizen_catalog SET
  governing_guidelines = '15 CCR ss 3130-3146 (Mail regulations -- CDCR); BSCC Title 15 ss 1063 (Mail -- local jails); Procunier v. Martinez, 416 U.S. 396 (mail censorship limitations); Turner v. Safley, 482 U.S. 78 (rational basis for mail restrictions); Cal. Penal Code ss 4570-4574 (Contraband by mail); Attorney-client mail protections (legal mail opening procedures)',
  standards_of_creation = 'Mail log maintained with date received/processed; rejection notices issued with specific reason and appeal instructions; legal mail opened only in inmate''s presence; contraband seizure documented with evidence tag; publication review decisions documented with Turner analysis; media correspondence policies documented',
  soc_controls = 'Legal mail handling audit; rejection notice compliance; contraband detection log; publication review committee records; correspondence restriction order documentation; staff training on privileged mail'
WHERE name = 'Mail Room Supervisor';

UPDATE citizen_catalog SET
  governing_guidelines = '15 CCR ss 3282 (Telephone access -- CDCR); BSCC Title 15 ss 1064 (Telephone access -- local); FCC Orders on inmate calling rates (47 CFR); Cal. Penal Code ss 636 (Privileged call protections); Attorney-client privilege (recorded call purge requirements); 15 CCR ss 3177 (Visiting -- video visitation component)',
  standards_of_creation = 'Monitoring authorization documented; call logs maintained; privileged call list maintained and updated; recordings purged per retention schedule; content flags documented with supervisor review; intelligence reports from monitoring documented separately; video visitation scheduling and recording logs maintained',
  soc_controls = 'Privileged number list audit; recording retention compliance; warrant requirements for law enforcement access; vendor contract compliance monitoring; rate structure audit; access for hearing-impaired (ADA)'
WHERE name = 'Phone/Video Monitoring Analyst';

-- A8. Special Populations

UPDATE citizen_catalog SET
  governing_guidelines = '15 CCR ss 3378 (STG validation -- CDCR, revised 2015); 15 CCR ss 3341.5(c) (SHU placement for STG); CDCR DOM ss 52070 (STG procedures); Ashker v. Governor (settlement -- SHU reform); Cal. Penal Code ss 186.22 (Criminal street gang statute); 28 CFR Part 23 (Criminal intelligence systems)',
  standards_of_creation = 'Validation based on documented source items (minimum three); each source item described and attached; inmate notified and given opportunity to respond; inactive status review at 6-year intervals; intelligence reports classified per 28 CFR Part 23; debriefing reports documented; STG classification documented with specific behavioral evidence',
  soc_controls = 'Independent departmental review of validation decisions; source item quality audit; debriefing program tracking; SHU/RCGP placement review; confidential information protection; intelligence database purge schedule compliance'
WHERE name = 'Gang Intelligence Officer / Security Threat Group (STG) Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = '42 USC ss 12131-12134 (ADA Title II -- public entities); 28 CFR Part 35 (ADA Title II regulations); Armstrong v. Newsom consent decree (ADA compliance in CDCR); 15 CCR ss 3085 (Reasonable accommodation); CDCR Armstrong Remedial Plan; Section 504 of Rehabilitation Act (29 USC ss 794)',
  standards_of_creation = 'Disability assessment at intake with DPP (Disability Placement Program) code assigned; reasonable accommodation requests processed within 30 days; effective communication documented (sign language, Braille, assisted devices); program access audit documented; physical accessibility barriers logged and remediation tracked; ADA grievance process documented',
  soc_controls = 'Armstrong court monitor visits; accommodation request tracking; denial documentation with interactive process; accessible housing audit; program exclusion justification; staff training records; auxiliary aid logs'
WHERE name = 'ADA Coordinator (Custody)';

UPDATE citizen_catalog SET
  governing_guidelines = '42 USC ss 2000cc (Religious Land Use and Institutionalized Persons Act -- RLUIPA); 15 CCR ss 3210-3215 (Religious programs -- CDCR); BSCC Title 15 ss 1071 (Religious programs -- local); First Amendment (free exercise clause); Holt v. Hobbs, 574 U.S. 352 (RLUIPA substantial burden test); CDCR DOM ss 101060 (Religious program operations)',
  standards_of_creation = 'Religious diet request documented and processed; worship schedule accommodations documented; grooming/appearance exemption requests processed with written decision; religious property approvals documented; volunteer clergy background checks maintained; faith group recognition records; denial decisions with least restrictive means analysis in writing',
  soc_controls = 'RLUIPA strict scrutiny documented for denials; equal treatment across faith groups audited; volunteer screening records; religious property inventory; diet program compliance monitoring'
WHERE name = 'Religious Accommodation Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = '8 USC ss 1226, 1231 (Immigration detention authority); 8 CFR ss 287.7 (Detainer issuance); Cal. Government Code ss 7282-7282.5 (California Values Act -- SB 54/AB 937); Cal. Government Code ss 7283-7283.2 (TRUTH Act -- AB 2792); ICE Form I-247A (Immigration Detainer); DHS Policy Guidance on enforcement priorities',
  standards_of_creation = 'Detainer receipt logged with date/time; TRUTH Act notification to inmate documented; qualifying offense determination documented per Government Code ss 7282.5; ICE interview consent form signed; release notification to ICE documented per applicable policy; attorney notification documented; judicial warrant requirement compliance documented',
  soc_controls = 'California Values Act compliance audit; TRUTH Act consent documentation; detainer response tracking; release timing documentation; attorney access verification; ICE access logs'
WHERE name = 'Immigration Detainer Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Government Code ss 12525 (Death in custody reporting -- AB 1331); 34 USC ss 60105 (Federal Death in Custody Reporting Act -- DCRA); 15 CCR ss 1046 (Death in custody -- local jails); Cal. Penal Code ss 6045 (Investigation of deaths); BSCC Title 15 ss 1046; CDCR DOM ss 55030 (Mortality review)',
  standards_of_creation = 'Scene preservation documented; law enforcement and coroner notified immediately; next of kin notification documented; internal investigation initiated within 24 hours; medical records sequestered; staff interviews completed; toxicology and autopsy results obtained; mortality review completed; DOJ notification within 10 days; annual statistical report filed',
  soc_controls = 'Independent investigation (not by involved staff); coroner jurisdiction respected; OIG oversight; confidential informant information protection; family notification log; evidence preservation chain; external review panel for patterns'
WHERE name = 'Death in Custody Investigator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 3600-3604 (Execution procedures); Cal. Penal Code ss 4800-4806 (Condemned prisoners); 15 CCR ss 3349.7 (Condemned inmate housing); Governor Newsom Executive Order N-09-19 (moratorium on executions); Cal. Constitution Art. V, ss 8 (Clemency power); CDCR DOM ss 62040 (Condemned inmate procedures)',
  standards_of_creation = 'Annual security classification review documented; visiting protocols documented (contact/non-contact); property allowance documented; programming access documented; clemency application processing tracked; legal access documented; medical/mental health care at community standard documented',
  soc_controls = 'Enhanced security procedures documented; legal mail protections verified; media access protocols; clemency processing timeline tracking; specialized staff training records'
WHERE name = 'Condemned Inmate Program Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = '15 CCR ss 3335-3345 (Administrative segregation/SHU); Ashker v. Governor settlement (SHU reform); Madrid v. Gomez (conditions of confinement); ACA Standards 4-4253 through 4-4263 (Segregation); BSCC Title 15 ss 1053-1055 (Administrative segregation -- local); CDCR DOM ss 62080 (Segregation procedures); Mandela Rules (UN Standard Minimum Rules) Rule 43-45 (solitary confinement limits)',
  standards_of_creation = 'Placement order with stated reason; 72-hour administrative review; Institutional Classification Committee review within 30 days; program access documented (minimum out-of-cell time); 180-day maximum review per Ashker; mental health assessment documented; step-down program progress documented',
  soc_controls = 'Classification committee minutes; time-in-segregation tracking; mental health monitoring compliance; program delivery verification; conditions-of-confinement inspection; OIG audits of long-term segregation'
WHERE name = 'Administrative Segregation / Restricted Housing Reviewer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CDCR DOM ss 53070 (Hunger strike procedures); 15 CCR ss 3999 (Medical necessity); World Medical Association Malta Declaration (hunger strikes -- ethical framework); NCCHC Position Statement on hunger strikes; Cal. Penal Code ss 2670 (Force-feeding restrictions -- AB 2640); CCHCS Clinical Guidelines for hunger strike management',
  standards_of_creation = 'Hunger strike documented from first missed meal (9 consecutive meals = designation); daily medical monitoring documented; weight, vitals, labs charted; refusal of treatment documented; informed consent/refusal for IV/nutrition documented; advance directive discussed and documented; CDCR headquarters notification documented; refeeding protocol documented',
  soc_controls = 'Medical monitoring compliance tracking; clinical decision documentation; legal review of force-feeding decisions; media inquiry protocol; family notification; psychological assessment documentation'
WHERE name = 'Hunger Strike Coordinator';

-- A9. Private Prison / Contract Compliance

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 5003.1 (Private prison contracts); Cal. Penal Code ss 5003.5 (Out-of-state transfer); Executive Order on private prison phase-out (EO 13985 / state equivalents); ACA Accreditation Standards (contract requirement); Cal. Public Contract Code ss 10295+ (State contracting standards); Government Code ss 12525 (Death reporting -- applies to contract facilities)',
  standards_of_creation = 'Monthly compliance monitoring reports; staffing ratio verification; incident rate comparison to state facilities; medical care adequacy assessment; PREA audit results documented; financial audit per contract terms; inmate grievance response compliance; program delivery per contract specifications',
  soc_controls = 'Unannounced inspections; OIG oversight; legislative reporting requirements; whistleblower protections; contract penalty documentation; independent medical monitor; annual performance review'
WHERE name = 'Private Prison Contract Compliance Monitor';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 11189-11195 (Interstate Corrections Compact); 18 USC ss 4002 (Federal inmates in state custody); Interstate Corrections Compact Act (each party state); CDCR DOM ss 61080 (Interstate transfer procedures)',
  standards_of_creation = 'Transfer request with sending state classification; receiving state classification assessment; consent documentation; transportation orders; medical records transfer; custody credits calculated; conditions-of-confinement verification at receiving facility',
  soc_controls = 'Classification equivalency verification; medical continuity of care documentation; credit calculation audit; periodic status reports to sending state; return-to-jurisdiction processing'
WHERE name = 'Interstate Corrections Compact Administrator';

-- A10. Inmate Programs

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 2053-2054.2 (Education programs in prison); Cal. Education Code ss 1900-1920 (Correctional education); 15 CCR ss 3000-3375 (Program requirements); CDCR DOM ss 101080 (Educational programs); Every Student Succeeds Act (ESSA) -- Title I, Part D (Neglected and Delinquent); 34 CFR ss 200.90 (Federal education requirements for correctional settings)',
  standards_of_creation = 'Educational assessment at intake (TABE/CASAS); individualized education plan documented; progress tracked quarterly; GED/HiSET testing administered per state standards; college program enrollment documented; credit transcripts maintained; completion certificates issued by accredited entity; participation hours logged',
  soc_controls = 'Teacher credentialing verification; testing integrity protocols; program outcome tracking (completion rates, recidivism impact); credit transfer verification; accreditation maintenance; ADA accessibility of programs'
WHERE name = 'Correctional Education Administrator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 2700-2818 (Prison labor); Cal. Penal Code ss 2933-2935 (Work credit earning); 15 CCR ss 3040-3044 (Inmate work programs); CalPIA Enabling Statute (Penal Code ss 2800-2818); Cal-OSHA standards (Title 8 CCR) applicable to prison work programs; ACA Standard 4-4429 (Work programs)',
  standards_of_creation = 'Work assignment documented with classification approval; safety training documented before assignment; hours tracked for credit calculation; Cal-OSHA compliance documented; CalPIA production records maintained; injury reports filed per Cal-OSHA requirements; work performance evaluations documented; vocational certification tracking',
  soc_controls = 'Safety inspection records; credit calculation audit; Cal-OSHA compliance monitoring; CalPIA financial audit; inmate worker compensation documentation; injury rate tracking; grievance resolution'
WHERE name = 'Inmate Work Program Supervisor';

-- ============================================================
-- B. PROBATION / PAROLE (23 personas)
-- ============================================================

-- B1. Pre-Sentence / Sentencing

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 1203 (Probation -- general authority and PSI requirements); Cal. Penal Code ss 1203.06-1203.09 (Probation eligibility restrictions); California Rules of Court 4.411-4.411.5 (Pre-sentence investigation and report); California Rules of Court 4.420-4.428 (Sentencing criteria); Federal Sentencing Guidelines ss 6A1.1-6A1.3 (PSI in federal cases); 18 USC ss 3552 (Federal pre-sentence investigation); Cal. Penal Code ss 1170(b) (Determinate sentencing -- factors); Victim impact information per Cal. Const. Art. I, ss 28(b) (Marsy''s Law)',
  standards_of_creation = 'PSI completed within 20 judicial days of conviction; social history verified through multiple sources; criminal history verified through DOJ/FBI; risk/needs assessment instrument administered (ORAS, LSI-R, or equivalent); victim impact statement obtained; restitution calculation documented; sentencing recommendation with statutory basis; aggravating/mitigating factors analyzed per Rules of Court 4.421/4.423; financial evaluation for fines/fees documented',
  soc_controls = 'Supervisor review and signature; factual accuracy verification; defendant review and objection opportunity (Cal. Rules of Court 4.411.5); confidential materials handled per PC ss 1203.10; sentencing judge review; appeal record preservation; ORAS/LSI-R scoring validation'
WHERE name = 'Probation Officer -- Pre-Sentence Investigation (PSI)';

UPDATE citizen_catalog SET
  governing_guidelines = 'ABA Guidelines for the Appointment and Performance of Defense Counsel in Death Penalty Cases (Guideline 10.11 -- mitigation); ABA Criminal Justice Standards for Sentencing (3d ed.); Cal. Rules of Court 4.420-4.428 (Sentencing); Cal. Penal Code ss 1170(b)(6) (childhood trauma as mitigating factor -- AB 124); Miller v. Alabama, 567 U.S. 460 (youth as mitigating factor); Cal. Penal Code ss 1385 (Judicial discretion in sentencing enhancements -- SB 81)',
  standards_of_creation = 'Comprehensive social history documented; biopsychosocial assessment; trauma history (ACEs) documented; developmental factors (youth, cognitive impairment) documented; expert declarations obtained; sentencing memorandum with legal authorities; alternative sentencing plan with community resources; letters of support compiled and organized',
  soc_controls = 'Source verification; expert credential verification; privilege protections (work product doctrine); client consent documentation; factual accuracy review; legal authority currency check'
WHERE name = 'Sentencing Consultant / Mitigation Specialist';

-- B2. Probation Supervision

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 1203-1203.4 (Probation conditions and supervision); Cal. Penal Code ss 1203.2 (Modification, revocation, termination); Cal. Penal Code ss 1203.3 (Change in terms of probation); Cal. Rules of Court 4.530-4.541 (Probation revocation proceedings); Morrissey v. Brewer, 408 U.S. 471 (due process in revocation); Gagnon v. Scarpelli, 411 U.S. 778 (right to counsel in revocation); Cal. Penal Code ss 3450-3465 (Mandatory supervision -- PC 1170(h) split sentences); Evidence-Based Practice framework (Risk-Need-Responsivity model)',
  standards_of_creation = 'Supervision plan documented with conditions matched to risk/needs assessment; contact standards based on risk level (high/medium/low); field visits documented; collateral contacts documented; progress notes per supervision contact; violation documentation with graduated sanctions matrix; case plan updated at regular intervals; termination summary at case closure',
  soc_controls = 'Caseload ratio monitoring (per CPOC standards); supervisor case review at prescribed intervals; random field contact audits; compliance with evidence-based practices documented; graduated sanctions consistency audit; use of validated risk assessment; outcomes tracking (completion rates, new arrests, employment)'
WHERE name = 'Probation Officer -- Adult Supervision (Felony)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 1203a (Summary/court probation); Cal. Penal Code ss 1203 (Probation generally); Cal. Penal Code ss 19.8 (Misdemeanor sentencing); Local court rules on misdemeanor probation monitoring',
  standards_of_creation = 'Conditions of probation documented and served; compliance monitoring per court order (may be court-supervised without active probation officer); violation hearing documentation; community service verification; fine payment tracking; progress reports to court; completion certification',
  soc_controls = 'Compliance tracking system; community service hour verification; financial obligation tracking; calendar compliance (hearing dates); court reporting accuracy'
WHERE name = 'Probation Officer -- Adult Supervision (Misdemeanor / Summary)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 1203.2 (Probation revocation proceedings); Cal. Rules of Court 4.530-4.541 (Revocation procedures); Morrissey v. Brewer, 408 U.S. 471; Gagnon v. Scarpelli, 411 U.S. 778; People v. Vickers (2007) 150 Cal.App.4th 631 (violation standard of proof); Cal. Penal Code ss 1203.25 (Custody credits on revocation)',
  standards_of_creation = 'Violation report with specific factual allegations; evidence documented and preserved; witness statements obtained; probable cause assessment; graduated sanctions analysis (was lesser sanction appropriate?); recommendation documented with rationale; custody credits calculated; victim notification per Marsy''s Law',
  soc_controls = 'Supervisor review of violation report; due process checklist (notice, hearing, evidence, counsel); proportionality review; graduated sanctions documentation; time-compliance tracking; appeal documentation'
WHERE name = 'Probation Violation Investigator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 1170(h) (County split sentences); Cal. Penal Code ss 3450-3465 (Mandatory supervision provisions); AB 109 (2011 Realignment Legislation); Cal. Penal Code ss 3455 (Revocation of mandatory supervision); CPOC Evidence-Based Practices framework; SB 678 (Community Corrections Performance Incentive Fund)',
  standards_of_creation = 'Supervision plan aligned with release conditions; risk/needs assessment administered; case plan with measurable goals; contact frequency per risk level; flash incarceration documented per PC ss 3454(c); custody credit calculation for flash incarceration; violation proceedings documented per PC ss 3455; graduated response documentation',
  soc_controls = 'Risk assessment validity; case plan review schedule compliance; flash incarceration authorization tracking; revocation hearing due process documentation; outcomes reporting per SB 678; AB 109 funding accountability'
WHERE name = 'Mandatory Supervision Officer (PC 1170(h))';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 3450-3465 (PRCS provisions); Cal. Penal Code ss 3455 (PRCS revocation); Cal. Penal Code ss 3456 (PRCS conditions); AB 109 (2011 Realignment); People v. Superior Court (Linn) (2015) 234 Cal.App.4th 1426 (PRCS procedures); Williams v. Superior Court (2014) 230 Cal.App.4th 636 (PRCS revocation due process)',
  standards_of_creation = 'CDCR notification of release documented; initial contact within prescribed timeframe; conditions set by CDCR documented with county supplemental conditions; risk/needs assessment; flash incarceration used as intermediate sanction with documentation; revocation petition filed with factual basis; Parole Revocation Extension documented; custody credits calculated',
  soc_controls = 'CDCR-to-county handoff verification; supervision level compliance; flash incarceration authorization log; revocation hearing due process tracking; graduated sanctions consistency; outcomes reporting per SB 678'
WHERE name = 'PRCS Officer (Post-Release Community Supervision)';

-- B3. Parole Supervision

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 3000-3016 (Parole generally); Cal. Penal Code ss 3053-3058 (Conditions of parole); Cal. Penal Code ss 3060-3064 (Parole violation/revocation); 15 CCR ss 3500-3599 (Parole regulations); CDCR DAPO Operations Manual; Morrissey v. Brewer, 408 U.S. 471 (parole revocation due process); In re Prewitt (1972) 8 Cal.3d 470 (parole conditions); Cal. Penal Code ss 3000.08 (State parole vs. PRCS determination)',
  standards_of_creation = 'Parole plan documented prior to release (with proposed residence, employment, program); initial contact within 24 hours of release; conditions served on parolee; supervision level assigned per risk assessment; contact standards documented; GPS/electronic monitoring installation documented when ordered; home visit documented; collateral contact with treatment providers; progress reports to BPH; violation report with graduated response documentation',
  soc_controls = 'Supervisor case review; caseload standards per DAPO policy; GPS monitoring compliance audit; warrantless search documentation; parole hold timeline compliance (PC ss 3056); violation report quality review; BPH submission accuracy; outcomes tracking'
WHERE name = 'Parole Agent (CDCR Division of Adult Parole Operations -- DAPO)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 3040-3046 (BPH authority); Cal. Penal Code ss 3041-3041.5 (Parole suitability -- life terms); Cal. Penal Code ss 3041.7 (Lifer hearing panel requirements); 15 CCR ss 2000-2600 (BPH regulations); In re Lawrence (2008) 44 Cal.4th 1181 (parole suitability standard); In re Shaputis (2008) 44 Cal.4th 1241 (unsuitability factors); In re Prather (2010) 50 Cal.4th 238 (some evidence standard for denial); Marsy''s Law -- Cal. Const. Art. I, ss 28(b) (victim rights at parole hearings); Cal. Penal Code ss 3043 (Victim participation in parole hearings)',
  standards_of_creation = 'Written decision within statutory timeframe; findings addressing each suitability/unsuitability factor per 15 CCR ss 2402; nexus between current dangerousness and commitment offense articulated; programming evidence considered; victim impact considered; risk assessment results (HCR-20, CSRA) documented in decision; next hearing date set per PC ss 3041.5; Governor''s review for certain offenses documented',
  soc_controls = 'En banc review process; Governor''s review for murder cases; habeas corpus petition tracking; Marsy''s Law victim notification compliance; hearing transcript maintained; decision consistency audit; risk assessment instrument validation'
WHERE name = 'Board of Parole Hearings Commissioner';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 3041-3044 (BPH hearing procedures); Cal. Rules of Professional Conduct (State Bar); ABA Standards for Criminal Justice -- Parole; Marsy''s Law compliance obligations; In re Lawrence, In re Shaputis (legal standard application); Due process requirements (Greenholtz v. Inmates, 442 U.S. 1)',
  standards_of_creation = 'Legal memoranda on suitability standards; procedural compliance review of each hearing; petitioner representation quality documentation; victim rights compliance verification; administrative appeal processing; en banc referral documentation; judicial review (habeas) response preparation',
  soc_controls = 'Attorney-client privilege maintenance; conflict of interest screening; continuing legal education compliance; decision quality review; habeas corpus response timeliness'
WHERE name = 'Parole Board Hearing Attorney (BPH Legal)';

-- B4. GPS / Electronic Monitoring

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 1210.7 (GPS monitoring for sex offenders); Cal. Penal Code ss 3004 (GPS for parolees); Cal. Penal Code ss 3010.10 (One-strike sex offender GPS); Jessica''s Law (Proposition 83) GPS requirements; People v. Lysander (GPS scope); Grady v. North Carolina, 575 U.S. 306 (GPS as search under 4th Amendment); 15 CCR ss 3560-3569 (GPS monitoring regulations)',
  standards_of_creation = 'GPS installation documented with device serial number and activation time; inclusion/exclusion zones documented with rationale; alert protocols documented; violation alerts investigated and documented within timeframes; equipment maintenance logged; strap tamper events documented; battery compliance monitoring; removal authorization documented',
  soc_controls = 'Vendor service level agreement compliance; false positive rate tracking; alert response time audit; zone modification approval process; equipment inventory management; data retention compliance; 4th Amendment search documentation'
WHERE name = 'GPS/Electronic Monitoring Supervisor';

-- B5. Drug Testing

UPDATE citizen_catalog SET
  governing_guidelines = '42 CFR Part 2 (Confidentiality of Substance Use Disorder Records); SAMHSA/CSAT Mandatory Guidelines for Federal Workplace Drug Testing (49 FR); Cal. Penal Code ss 1203.1ab (Drug testing as condition of probation); 42 USC ss 290dd-2 (Federal confidentiality of SUD records); CLIA certification requirements (42 CFR Part 493); Chain of custody standards (DOT 49 CFR Part 40 as industry reference)',
  standards_of_creation = 'Random selection methodology documented; chain of custody maintained from collection to result; specimen integrity verified (temperature, adulterant check); confirmation testing for presumptive positives (GC-MS or LC-MS/MS); results documented with cutoff levels; Medical Review Officer (MRO) review for prescription medications; positive result notification to probation/parole officer; records maintained per 42 CFR Part 2 confidentiality',
  soc_controls = 'Chain of custody audit; laboratory CLIA certification verification; random selection algorithm integrity; split specimen availability; MRO qualification verification; 42 CFR Part 2 confidentiality compliance; false positive/negative rate monitoring; vendor contract compliance'
WHERE name = 'Drug Testing Coordinator (Probation/Parole)';

-- B6. Sex Offender Management

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 290-290.024 (Sex Offender Registration Act); Cal. Penal Code ss 290.008-290.012 (Registration requirements); Cal. Penal Code ss 290.45 (Megan''s Law disclosure); Cal. Penal Code ss 290.46 (Megan''s Law internet database); SB 384 (Tiered registration -- effective 2021); SORNA (Sex Offender Registration and Notification Act -- 34 USC ss 20901); Jacob Wetterling Act (42 USC ss 14071); AWA (Adam Walsh Act) compliance requirements',
  standards_of_creation = 'Initial registration documented within 5 working days of release; annual update within 5 working days of birthday; change of address within 5 working days; transient registration every 30 days; campus registration (PC ss 290.01); photo/fingerprint update per statutory schedule; tier assignment documented per SB 384; petition for removal from registry documented with risk assessment',
  soc_controls = 'DOJ database accuracy audit; address verification (field checks); compliance with registration deadlines tracked; failure-to-register prosecution referral; Megan''s Law website accuracy; inter-jurisdictional notification; SB 384 tier review timeline compliance'
WHERE name = 'Sex Offender Registration Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 290.04-290.09 (SARATSO tool requirements); STATIC-99R Coding Manual (Phenix, Fernandez, Harris, Helmus, Hanson); CSRT (Comprehensive Sex Offender Risk Tool) Manual; Cal. Penal Code ss 290.06 (Static tool administration); Cal. Penal Code ss 290.09 (Dynamic and future violence tools); Cal. Penal Code ss 1170.18 (Proposition 47 -- sex offender exclusion); SB 384 (Tier determination using SARATSO scores)',
  standards_of_creation = 'STATIC-99R scored per official coding manual; scoring rationale documented for each item; inter-rater reliability maintained; CSRT and SARATSO dynamic scores documented; training certification maintained; reassessment at prescribed intervals; scores reported to SARATSO Committee; BPH consideration of scores documented; SB 384 tier petition scores documented',
  soc_controls = 'Assessor certification verification; inter-rater reliability studies; scoring quality audit; training recertification schedule; appeal process for contested scores; instrument validation research monitoring'
WHERE name = 'SARATSO/STATIC-99R Assessor';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Welfare & Institutions Code ss 6600-6609.3 (SVPA -- Sexually Violent Predator Act); Cal. WIC ss 6601 (Screening and evaluation procedures); APA Ethical Principles (forensic assessment); Kansas v. Hendricks, 521 U.S. 346 (SVP commitment constitutionality); People v. Superior Court (Ghilotti) (2002) 27 Cal.4th 888; DSH SVP Evaluation Protocol',
  standards_of_creation = 'Two independent evaluators concur for filing; standardized risk assessment instruments administered (STATIC-99R, PCL-R, VRS-SO); diagnosed mental disorder documented with DSM-5-TR criteria; predatory behavior analysis documented; current dangerousness assessment; evaluation report per DSH protocol; court testimony preparation documented; annual review for committed SVPs',
  soc_controls = 'Evaluator independence; peer consultation documented; instrument scoring quality review; court qualification verification; annual update compliance; conditional release evaluation standards'
WHERE name = 'Sexually Violent Predator (SVP) Evaluator';

-- B7. Specialized Supervision

UPDATE citizen_catalog SET
  governing_guidelines = 'Interstate Compact for Adult Offender Supervision (ICAOS Rules -- Ch. 1-8); ICAOS Rule 3.101 (Transfer eligibility); ICAOS Rule 3.103 (Transfer procedures); ICAOS Rule 4.101-4.112 (Supervision and return); Cal. Penal Code ss 11175-11179 (California Uniform Interstate Compact); ICOTS (Interstate Compact Offender Tracking System) protocols',
  standards_of_creation = 'Transfer request completed in ICOTS within 10 business days; probable cause/compliance documentation; receiving state investigation completed within 45 calendar days; reporting instructions documented; supervision conditions translated to receiving state equivalents; violation reporting through ICOTS; retaking warrant procedures documented; quarterly progress reports',
  soc_controls = 'ICOTS data entry accuracy; timeline compliance audit; rejection documentation with appeal process; receiving state investigation quality; violation response timeliness; compact compliance reviews; annual performance audits by Interstate Commission'
WHERE name = 'Interstate Compact Transfer Specialist (ICAOS)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Welfare & Institutions Code ss 200-304 (Juvenile court law); Cal. WIC ss 602 (Delinquency jurisdiction); Cal. WIC ss 654-654.6 (Informal supervision / diversion); Cal. WIC ss 725-737 (Disposition); Cal. WIC ss 777 (Modification of orders); Cal. WIC ss 781, 786, 786.5 (Sealing of juvenile records); Cal. Rules of Court 5.790-5.810 (Juvenile probation); BSCC Title 15 ss 1300-1399 (Juvenile detention standards); SB 439 (Minimum age of juvenile court jurisdiction -- 12); In re Gault, 387 U.S. 1 (juvenile due process)',
  standards_of_creation = 'Social study report per WIC ss 706; risk/needs assessment (JAIS or equivalent); case plan with youth and family input; contact standards per risk level; school attendance monitoring; graduated sanctions documented; wardship termination report; sealing eligibility evaluation per WIC ss 786',
  soc_controls = 'Caseload standards per BSCC; supervisor case reviews; youth voice in case planning documented; family engagement documented; outcome tracking; cultural responsivity documentation; detention alternative tracking (JDAI); seal-eligible record identification'
WHERE name = 'Juvenile Probation Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 1001.36 (Pretrial mental health diversion); Cal. Penal Code ss 1001.35 (Legislative intent); People v. Frahs (2020) 9 Cal.5th 618 (retroactive application); Cal. WIC ss 5150-5155 (Involuntary hold -- related); DHCS Behavioral Health treatment standards; DSM-5-TR diagnostic requirements',
  standards_of_creation = 'Qualifying mental health diagnosis documented by qualified expert; defense motion and court order documented; treatment plan connected to diagnosed condition; treatment provider identified and agreed to participate; progress reports to court at prescribed intervals (minimum every 6 months); completion determination documented; charges dismissed upon successful completion; reinstatement of criminal proceedings documented if unsuccessful',
  soc_controls = 'Diagnostic qualification verification; treatment provider credential check; progress report timeliness; court hearing attendance; victim notification compliance; completion criteria documentation; recidivism tracking post-diversion'
WHERE name = 'Mental Health Diversion Coordinator (PC 1001.36)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 1170.9 (Military service as sentencing factor); Cal. Penal Code ss 1001.80 (Misdemeanor military diversion); Cal. Penal Code ss 1170.91 (Resentencing for military-connected trauma); 38 USC ss 1710-1730 (VA health care eligibility); 10 Core Components of Veterans Treatment Courts (Justice for Vets); Cal. Military & Veterans Code ss 1800+ (State veterans services)',
  standards_of_creation = 'Military service verification (DD-214) documented; service-connected condition assessment; treatment plan incorporating VA and community resources; mentor assignment documented; phase progression documented; compliance monitoring; graduation requirements documented; case closure with veteran services linkage documented',
  soc_controls = 'DD-214 authenticity verification; VA benefits coordination documentation; mentor training records; phase compliance tracking; outcome tracking (housing, employment, recidivism); veteran-specific risk assessment'
WHERE name = 'Veterans Treatment Court Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 1000-1000.8 (Deferred entry of judgment -- drug diversion); Cal. Penal Code ss 1210-1210.1 (Proposition 36 -- SACPA); NADCP 10 Key Components of Drug Courts; NADCP Best Practice Standards (Vols. I and II); Cal. Rules of Court 10.950-10.953 (Collaborative justice courts); 42 USC ss 3796ii (Federal drug court grant requirements -- BJA); Cal. Health & Safety Code ss 11350-11377 (Controlled substance offenses -- diversion eligible)',
  standards_of_creation = 'Eligibility screening documented; clinical assessment (ASAM criteria) documented; phase structure with requirements documented; drug testing schedule documented; treatment attendance verified; court appearance attendance tracked; sanctions and incentives documented; graduation requirements documented; program completion or termination documented; deferred entry of judgment processing',
  soc_controls = 'NADCP best practice compliance audit; clinical assessment quality; drug test integrity; treatment provider credential verification; team staffing minutes; outcome tracking (completion rate, recidivism, employment); grant reporting compliance'
WHERE name = 'Collaborative Court / Drug Court Coordinator';

-- B8. Victim Services

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Const. Art. I, ss 28(b) (Marsy''s Law -- Victims'' Bill of Rights); Cal. Penal Code ss 679.02 (Statutory rights of victims); Cal. Penal Code ss 679.03 (Victim notification of release); Cal. Penal Code ss 3043 (Victim participation in parole hearings); Cal. Penal Code ss 646.92 (Notification of release -- violent offenses); Cal. Penal Code ss 1191.1 (Victim statement at sentencing); Cal. Penal Code ss 1202.4 (Restitution); VOCA (Victims of Crime Act -- 34 USC ss 20101); Cal. Penal Code ss 3058.6 (Victim notification -- parole)',
  standards_of_creation = 'Victim notification of key events (arrest, release, parole hearing, escape, death) documented with method and date; victim impact statement opportunity documented; restitution amount calculated and collection tracked; address confidentiality maintained; safety planning documented; Marsy''s Law compliance at every stage; VINE (Victim Information and Notification Everyday) enrollment offered and documented',
  soc_controls = 'Notification timeline compliance; address confidentiality audit; restitution collection rate tracking; Marsy''s Law compliance checklist; VINE system accuracy; victim satisfaction tracking; staff training on victim trauma'
WHERE name = 'Victim Services Coordinator (Probation/Parole)';

-- B9. Early Termination / Certificate of Rehabilitation

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 1203.3 (Modification/termination of probation); Cal. Penal Code ss 1203.4 (Expungement upon completion/early termination); Cal. Rules of Court 4.530 (Modification of probation); People v. Cookson (1991) 54 Cal.3d 1091 (early termination standards); AB 1950 (limiting felony probation to 2 years, misdemeanor to 1 year)',
  standards_of_creation = 'Compliance summary prepared; risk assessment results documented; recommendation with supporting evidence; victim notification per Marsy''s Law; court hearing documentation; order granting/denying termination; advisement of expungement rights',
  soc_controls = 'Compliance verification accuracy; victim notification documentation; court order processing; expungement advisement tracking; AB 1950 compliance (auto-termination timelines)'
WHERE name = 'Early Termination of Probation Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 4852.01-4852.21 (Certificate of rehabilitation); Cal. Penal Code ss 4852.06 (Period of rehabilitation); Cal. Penal Code ss 4852.13 (Recommendation for pardon); Cal. Penal Code ss 4852.16 (Effect of certificate); Cal. Const. Art. V, ss 8(a) (Governor''s pardon power)',
  standards_of_creation = 'Residency requirement verified (continuous California residency); period of rehabilitation calculated per PC ss 4852.06; petition prepared with supporting evidence of rehabilitation; DOJ background check obtained; community member declarations obtained; court hearing documentation; certificate issued by court; automatic referral to Governor for pardon consideration; pardon application documented',
  soc_controls = 'Residency verification; rehabilitation period calculation accuracy; DOJ record accuracy; hearing transcript maintenance; Governor''s office processing tracking; PC 290 registrant eligibility screening'
WHERE name = 'Certificate of Rehabilitation Analyst';

-- ============================================================
-- C. REENTRY / REHABILITATION (23 personas)
-- ============================================================

-- C1. Reentry Planning / Transitional Services

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 3000(a) (Reentry as critical period); Cal. Penal Code ss 6046-6047 (Rehabilitative programs); AB 109 (2011 Realignment -- county reentry responsibility); SB 618 (Reentry pilot programs); Second Chance Act of 2007 (34 USC ss 60501); 15 CCR ss 3043.5 (Pre-release planning -- CDCR); BSCC Community Corrections Partnership plans',
  standards_of_creation = 'Reentry plan initiated 6-12 months pre-release; needs assessment documented (housing, employment, health, family, education); community resource linkages documented; warm handoff to community provider documented; 72-hour post-release contact documented; 30/60/90-day follow-up documented; plan updated based on progress; case closure summary with outcome data',
  soc_controls = 'Pre-release planning timeline compliance; community provider agreement verification; follow-up contact audit; outcomes tracking (housing stability, employment, recidivism); inter-agency data sharing agreements; client consent documentation; fidelity to evidence-based reentry model'
WHERE name = 'Reentry Case Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 3003(a)-(b) (Residence restrictions); Cal. Penal Code ss 3003.5 (Sex offender residence restrictions -- Jessica''s Law); HUD Continuum of Care standards (24 CFR Part 578); Cal. Health & Safety Code ss 50801+ (Emergency Housing/Transitional Housing); AB 109 Community Corrections Partnership housing requirements; 42 USC ss 11360-11388 (McKinney-Vento Homeless Assistance Act); Fair housing considerations (Government Code ss 12955)',
  standards_of_creation = 'Housing needs assessment documented; placement matched to risk level and conditions (sex offender restrictions, gang considerations); transitional housing program agreement documented; program rules acknowledged; length of stay projections; case management integration documented; housing stability plan; move-out plan and permanent housing linkage; landlord notification compliance where required',
  soc_controls = 'Residence restriction compliance verification; sex offender buffer zone mapping; program compliance monitoring; housing inspection records; HUD compliance (if federally funded); fair housing documentation; grievance process'
WHERE name = 'Transitional Housing Placement Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Workforce Innovation and Opportunity Act (WIOA -- 29 USC ss 3101+); Cal. Labor Code ss 432.7 (Limitation on criminal history inquiries -- pre-hire); AB 1008 (Ban the Box -- Fair Chance Act -- Government Code ss 12952); Cal. Government Code ss 12952 (Fair Chance Act employer obligations); 29 CFR Part 38 (WIOA nondiscrimination); Federal Bonding Program (DOL); Work Opportunity Tax Credit (26 USC ss 51)',
  standards_of_creation = 'Employment assessment documented (skills, work history, barriers); job readiness training completion documented; resume/application assistance documented; job placement documented; employer connection records; Ban the Box compliance coaching documented; Federal Bonding Program application assistance documented; WOTC employer guidance documented; 30/60/90-day employment retention tracked',
  soc_controls = 'Assessment validity; job placement rate tracking; employment retention tracking; employer compliance with Ban the Box; wage verification; WIOA performance reporting; client satisfaction'
WHERE name = 'Employment Readiness Specialist (Reentry)';

-- C2. Education / Vocational (Reentry Context)

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 2053-2054.2 (Education in custody); Cal. Education Code ss 1900-1920 (Correctional education programs); GED Testing Service Policy Manual; ETS HiSET Program Manual; Every Student Succeeds Act (ESSA) Title I Part D; 34 CFR ss 200.90 (Federal requirements); CDCR DOM ss 101080 (Educational programs)',
  standards_of_creation = 'Educational assessment (TABE/CASAS) documented; individualized study plan; instruction hours logged; practice test scores tracked; test registration and accommodation documented; test results documented; certificate issued by testing authority; transcript created; credit toward milestone credits documented per PC ss 2054; post-release education linkage documented',
  soc_controls = 'Test security protocols; instructor credentialing; assessment validity; completion rate tracking; credit calculation accuracy; ADA testing accommodations; post-release outcome tracking'
WHERE name = 'GED/HiSET Program Coordinator (Custody/Reentry)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 2800-2818 (CalPIA); Cal. Labor Code ss 3070-3098 (Apprenticeship); DIR Apprenticeship Standards; Community college articulation agreements; CDCR DOM ss 101080 (Vocational programs); Workforce Innovation and Opportunity Act (WIOA); CTE (Career Technical Education) standards',
  standards_of_creation = 'Training curriculum aligned to industry standards; competency assessments documented; hours logged; safety certifications obtained (OSHA 10/30 where applicable); industry-recognized certificates issued; apprenticeship registration documented with DIR; community college credit articulation documented; job placement linkage documented',
  soc_controls = 'Instructor credential verification; curriculum review; industry advisory board input; equipment safety inspections; completion rate tracking; employment outcome tracking; apprenticeship registration compliance; certificate authenticity verification'
WHERE name = 'Vocational Training Instructor (Custody/Reentry)';

-- C3. Substance Abuse / Behavioral Health (Reentry)

UPDATE citizen_catalog SET
  governing_guidelines = '42 CFR Part 2 (Confidentiality of Substance Use Disorder Records); 42 USC ss 290dd-2 (Federal SUD confidentiality); ASAM Criteria for treatment placement; Cal. Health & Safety Code ss 11758-11758.49 (Drug Medi-Cal); DHCS Counselor Certification Standards; SAMHSA TIP Series (Treatment Improvement Protocols); Cal. Penal Code ss 1210-1210.1 (Proposition 36 -- SACPA treatment); Cal. Penal Code ss 3063.1 (SUD treatment as parole condition); Cal. Business & Professions Code ss 4980-4990.6 (LMFT) / ss 4999.10-4999.90 (LCSW) / ss 4999.100-4999.129 (LPCC)',
  standards_of_creation = 'ASAM-level assessment documented; individualized treatment plan with measurable goals; group/individual session notes; attendance documented; drug test results integrated; progress reports to probation/parole; discharge summary with continuing care plan; relapse prevention plan documented; referral to community treatment documented; 42 CFR Part 2 consent forms',
  soc_controls = 'Counselor certification verification; 42 CFR Part 2 compliance audit; treatment fidelity monitoring; drug test chain of custody; outcomes tracking (completion, relapse, recidivism); Drug Medi-Cal billing compliance; clinical supervision documentation'
WHERE name = 'Substance Abuse Treatment Counselor (Custody/Reentry)';

UPDATE citizen_catalog SET
  governing_guidelines = 'CDCR Rehabilitative Programs requirements; NIC Thinking for a Change (T4C) Program Manual; Moral Reconation Therapy (MRT) certification requirements; Evidence-Based Practice standards (Risk-Need-Responsivity); SAMHSA NREPP (National Registry of Evidence-Based Programs and Practices) -- archive; CrimeSolutions.gov program ratings',
  standards_of_creation = 'Program curriculum fidelity documented; participant pre/post assessment documented; session attendance logged; homework/journal completion tracked; facilitator fidelity checklist per session; program completion certificate issued; referral for additional programming documented; outcome data collected (attitudinal change, behavioral incidents)',
  soc_controls = 'Facilitator certification/training verification; program fidelity monitoring (observation/review); participant feedback collection; completion rate tracking; recidivism outcome tracking; curriculum update compliance'
WHERE name = 'Cognitive Behavioral Therapy (CBT) Program Facilitator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 1203.097(a)(6) (52-week batterer''s program -- if DV related); Court-ordered anger management program standards; SAMHSA TIP 25 (Substance Abuse Treatment and Domestic Violence); Evidence-based anger management curricula (e.g., SAMHSA Anger Management for Substance Abuse and Mental Health Clients)',
  standards_of_creation = 'Enrollment documentation; individualized assessment; session attendance documented (52 weeks for DV per PC ss 1203.097); progress reports to court/probation at intervals; completion certificate with hours; facilitator qualifications documented; termination for non-compliance documented with notice to referring authority',
  soc_controls = 'Attendance verification (sign-in sheets); facilitator credential check; program hour compliance; court reporting accuracy; completion rate tracking; victim safety integration'
WHERE name = 'Anger Management Program Facilitator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 3024 (Mother-infant program -- CDCR); Cal. Family Code ss 3170-3175 (Mandatory custody mediation); Court-ordered parenting program standards; Evidence-based parenting curricula (e.g., Strengthening Families, Nurturing Parenting Program); CDCR Family Visiting Program requirements',
  standards_of_creation = 'Enrollment documentation; parenting skills assessment; session attendance documented; curriculum completion verified; facilitator qualifications on file; progress reports to court/probation; completion certificate; family reunification documentation where applicable',
  soc_controls = 'Curriculum fidelity; attendance verification; facilitator credentials; completion tracking; family court compliance; outcome measurement (family stability, child welfare involvement)'
WHERE name = 'Parenting Program Coordinator';

-- C4. Record Relief / Expungement / Sealing

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 1203.4 (Dismissal after probation); Cal. Penal Code ss 1203.4a (Dismissal without probation -- misdemeanor); Cal. Penal Code ss 1203.4b (Fire camp dismissal); Cal. Penal Code ss 1203.41 (Felony dismissal -- post-prison); Cal. Penal Code ss 1203.42 (Retroactive realignment eligibility); Cal. Penal Code ss 1203.425 (Automatic record relief -- AB 1076); Cal. Penal Code ss 1203.49 (Certificate of rehabilitation -- human trafficking victims)',
  standards_of_creation = 'Eligibility determination documented (offense type, completion status, exclusions); petition prepared with case number and conviction details; DOJ rap sheet obtained and reviewed; declaration of rehabilitation; court order (granted/denied) documented; DOJ notification of court order; employment advisement regarding disclosure obligations; automatic relief tracking per AB 1076/SB 731',
  soc_controls = 'Eligibility screening accuracy; DOJ record accuracy verification; court order processing timeline; DOJ database update verification; client advisement documentation; automatic relief implementation audit (AB 1076 compliance)'
WHERE name = 'Expungement / Dismissal Specialist (PC 1203.4)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 851.91-851.92 (Arrest record sealing); Cal. Penal Code ss 851.87 (Automatic arrest record relief); Cal. Penal Code ss 851.8 (Factual innocence -- arrest sealing); Cal. WIC ss 781, 786, 786.5 (Juvenile record sealing); Cal. Penal Code ss 1001.9 (Diversion completion sealing); SB 393 (Arrest sealing expansion); AB 1076 / SB 731 (Automatic relief provisions)',
  standards_of_creation = 'Arrest record reviewed; eligibility for sealing per statutory criteria documented; petition filed; hearing documentation; court order entered; DOJ notification; law enforcement agency notification; sealed record handling procedures documented; automatic sealing compliance per SB 731; juvenile sealing per WIC ss 786 compliance',
  soc_controls = 'Eligibility screening; DOJ record accuracy; court order processing; law enforcement compliance with sealing order; database update verification; unauthorized access prevention; automatic sealing implementation tracking'
WHERE name = 'Record Sealing Specialist (PC 851.91)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 1170.18 (Proposition 47 -- The Safe Neighborhoods and Schools Act); People v. Rivera (2015) 233 Cal.App.4th 1085 (Prop 47 procedures); People v. Romanowski (2017) 2 Cal.5th 903 (shoplifting reclassification); Cal. Penal Code ss 459.5 (Shoplifting -- new offense); Cal. Penal Code ss 490.2 (Petty theft -- $950 threshold); Cal. Health & Safety Code ss 11350, 11357, 11377 (Drug possession -- reclassified)',
  standards_of_creation = 'Eligibility determination documented (qualifying offense, no disqualifying priors); petition with conviction details and current status; DOJ rap sheet review; resentencing or redesignation order documented; time-served credit calculation; impact on other cases documented (e.g., three strikes); DOJ notification of reclassification; advisement on record relief timeline',
  soc_controls = 'Eligibility screening accuracy; prior record analysis; credit calculation verification; DOJ database update; resentencing timeline compliance; outcome tracking'
WHERE name = 'Proposition 47 Reclassification Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 1172.75 (Invalid prior prison term enhancements); Cal. Penal Code ss 1172.1 (Resentencing -- formerly PC 1170(d)(1)); Original Proposition 36 (Three Strikes Reform Act of 2012 -- PC ss 1170.126); 2024 Proposition 36 (amended sentencing provisions); People v. Superior Court (Kaulick) (2013) 215 Cal.App.4th 1279 (resentencing procedures); People v. Estrada (1965) 63 Cal.2d 740 (ameliorative legislation retroactivity)',
  standards_of_creation = 'Eligibility screening documented; petition filed with commitment offense analysis; dangerousness assessment per statutory criteria; prosecution response documented; hearing documentation; resentencing order with new term calculation; credit recalculation; release order if time served exceeded; DOJ notification; victim notification per Marsy''s Law',
  soc_controls = 'Eligibility accuracy; credit recalculation verification; victim notification compliance; prosecution notice compliance; DOJ database update; release processing timeline; post-release supervision determination'
WHERE name = 'Proposition 36 Resentencing Specialist';

-- C5. Clemency / Compassionate Release

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 1172.2 (Compassionate release -- formerly PC 1170(e)); 15 CCR ss 3076.3-3076.5 (Medical parole); Cal. Penal Code ss 3550-3553 (Medical parole); CDCR DOM ss 73030 (Compassionate release referral); CCHCS medical certification requirements; 18 USC ss 3582(c)(1)(A) (Federal compassionate release -- FIRST STEP Act)',
  standards_of_creation = 'Medical diagnosis documenting terminal illness (within 12 months) or permanent incapacitation; physician certification per statutory requirements; CDCR recommendation to court; parole plan prepared; victim notification documented; court order granting/denying release; BPH medical parole consideration documented; conditions of release set; post-release medical care plan documented',
  soc_controls = 'Medical documentation adequacy review; physician independence; victim notification compliance; court timeline compliance; post-release monitoring plan; revocation criteria documentation; recidivism tracking'
WHERE name = 'Compassionate Release Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 3055 (Elderly parole -- age 50+, 20+ years served); Cal. Penal Code ss 3051 (Youth offender parole -- crime committed under 26); Cal. Penal Code ss 4801(c) (Youth factors in parole consideration); SB 260, SB 261, AB 1308 (Youth offender parole expansion); AB 3234 (Elderly parole); People v. Franklin (2016) 63 Cal.4th 261 (youth offender evidence preservation); Miller v. Alabama, 567 U.S. 460 / Graham v. Florida, 560 U.S. 48 (youth sentencing); In re Palmer (2021) 10 Cal.5th 959 (youth offender parole applicability)',
  standards_of_creation = 'Age/time-served eligibility verified; comprehensive risk assessment; evidence of rehabilitation and maturity documented; youthful factors considered per PC ss 4801(c); institutional programming history documented; reentry plan prepared; BPH hearing conducted with findings; victim notification and participation per Marsy''s Law; Governor''s review for applicable offenses; release conditions set',
  soc_controls = 'Eligibility calculation accuracy; risk assessment instrument validity; hearing transcript maintenance; victim notification compliance; Governor''s review timeline; post-release supervision determination; outcome tracking'
WHERE name = 'Elderly Parole / Youth Offender Parole Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Const. Art. V, ss 8 (Governor''s pardon power); Cal. Penal Code ss 4800-4813 (Pardons); Cal. Penal Code ss 4852.01-4852.21 (Certificate of rehabilitation as pardon pathway); Cal. Penal Code ss 4852.16 (Certificate forwarded to Governor); Executive clemency procedures (Governor''s Office); Cal. Penal Code ss 4800 (Twice-convicted felons require Supreme Court recommendation)',
  standards_of_creation = 'Application with complete personal history; evidence of rehabilitation compiled; community support letters; statement of remorse/accountability; impact on future rights documented (voting, firearms, professional licensing); BPH investigation per Governor''s request; Supreme Court recommendation obtained if twice-convicted; Governor''s decision documented; DOJ notification of pardon',
  soc_controls = 'Application completeness review; BPH investigation quality; Governor''s Office processing timeline; DOJ record update verification; rights restoration documentation; public notification compliance'
WHERE name = 'Governor''s Pardon / Clemency Application Specialist';

-- C6. Credit Earning / Resentencing

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 2930-2935 (Credit earning -- work/good behavior); Cal. Penal Code ss 2054 (Educational merit credits); Cal. Penal Code ss 4019 (Conduct credits -- county jail); Cal. Penal Code ss 2933.05 (Milestone credits); Cal. Penal Code ss 2933.1 (Credit limitations -- violent felonies); Cal. Penal Code ss 2933.3-2933.6 (Credit earning categories); Proposition 57 credit-earning regulations (15 CCR ss 3043-3043.8); AB 965 (milestone credit expansion)',
  standards_of_creation = 'Credit calculation worksheet maintained; program participation hours verified; milestone credit eligibility documented; educational merit credit documented with transcript; good conduct credit calculated per statutory formula; credit limitation documented for excluded offenses; release date recalculated with each credit event; inmate notification of credit status; appeal process for credit denial documented',
  soc_controls = 'Calculation accuracy audit; program participation verification; double-counting prevention; statutory limitation compliance; release date accuracy; judicial review of contested calculations; CDCR headquarters audit'
WHERE name = 'Credit Earning Calculation Specialist';

-- C7. Restorative Justice

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 3450(b)(8) (Restorative justice in community supervision); CDCR Restorative Justice program guidelines; ABA Resolution on Restorative Justice (2019); VOMA/NAFCM Recommended Ethical Guidelines; Victim-centered principles (voluntary participation); Cal. Evidence Code ss 1115-1128 (Mediation confidentiality -- applicable by analogy)',
  standards_of_creation = 'Victim consent documented (voluntary, informed); offender consent documented; facilitator qualifications on file; preparation sessions documented; mediation/dialogue session documented (without verbatim record if confidential); agreement/outcomes documented; follow-up compliance tracked; safety planning for all participants; program evaluation data collected',
  soc_controls = 'Facilitator training certification; victim safety screening; voluntary participation verification; confidentiality protections; outcome tracking; participant satisfaction; trauma-informed practice compliance'
WHERE name = 'Restorative Justice Program Coordinator';

-- C8. Rights Restoration

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Business & Professions Code ss 480-490 (Denial/suspension/revocation for criminal conviction); AB 2138 (Licensing board reform -- limits on conviction-based denial); Cal. Labor Code ss 432.7 (Criminal history limitations); Cal. Business & Professions Code ss 11345.2 (Criteria for rehabilitation); Individual licensing board regulations (e.g., Contractors: 16 CCR ss 869; Nursing: 16 CCR ss 1444); Fair Employment and Housing Act (Government Code ss 12900+)',
  standards_of_creation = 'License eligibility analysis documented; conviction history reviewed against board-specific criteria; evidence of rehabilitation compiled per BPC ss 11345.2; petition to licensing board documented; hearing documentation; board decision documented; appeal documentation; AB 2138 compliance analysis',
  soc_controls = 'Board criteria accuracy; rehabilitation evidence quality; hearing procedural compliance; AB 2138 implementation audit; outcome tracking; appeal timeliness'
WHERE name = 'Occupational Licensing Restoration Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Vehicle Code ss 13350-13392 (License suspension/revocation); Cal. Vehicle Code ss 13352 (DUI-related suspension); Cal. Vehicle Code ss 14601-14601.5 (Driving on suspended license); Cal. Vehicle Code ss 13353.2 (APS hearing); Cal. Vehicle Code ss 12806 (Restricted license requirements); Cal. Insurance Code ss 16000+ (Financial responsibility -- SR-22)',
  standards_of_creation = 'Suspension/revocation basis identified; completion of required programs documented (DUI school, IID installation); SR-22 filing documented; reinstatement fee payment documented; restricted license application if eligible; DMV hearing documentation; court clearance documentation; outstanding fine/fee resolution documented',
  soc_controls = 'Program completion verification; SR-22 filing confirmation; IID installation verification; court order compliance; DMV record accuracy; reinstatement processing timeline'
WHERE name = 'Driver''s License Restoration Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Constitution Art. II, ss 4 (Disqualification while imprisoned for felony); Cal. Elections Code ss 2101, 2106 (Voter eligibility restoration); AB 2466 (2016 -- restoring voting rights to county jail inmates); ACA 6 / Proposition 17 (2020 -- restoring voting rights upon release from state prison, even while on parole); Cal. Penal Code ss 2910.5 (County jail is not state prison -- voting eligible); National Voter Registration Act (52 USC ss 20501)',
  standards_of_creation = 'Voting eligibility determination documented (current status: imprisoned/paroled/probation); voter registration assistance documented; registration form completion; Registrar notification of eligibility restoration; voter information guide provided; poll access for eligible incarcerated persons documented; election participation tracking',
  soc_controls = 'Eligibility determination accuracy; registration processing verification; Proposition 17 compliance; in-custody voting access audit; registration form handling; voter roll accuracy'
WHERE name = 'Voting Rights Restoration Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code ss 29800 (Felon with firearm prohibition); Cal. Penal Code ss 29805 (Specified misdemeanor prohibition -- 10 years); Cal. Penal Code ss 29900 (Violent felony -- lifetime prohibition); 18 USC ss 922(g) (Federal firearms prohibition); Cal. Penal Code ss 1203.4 (Expungement does NOT restore firearm rights for most felonies); Certificate of rehabilitation (may restore some state rights); Governor''s pardon (may restore state rights); ATF Form 4473 (Federal background check); Cal. Penal Code ss 30105 (DOJ Armed Prohibited Persons System -- APPS)',
  standards_of_creation = 'Prohibition basis identified (felony, DV misdemeanor, mental health, restraining order); federal vs. state analysis documented (state relief does not override federal prohibition); pardon pathway analysis; certificate of rehabilitation impact documented; reduction to misdemeanor analysis (PC ss 17(b)); legal memorandum on restoration options; client advisement on continued federal prohibition despite state relief; APPS status documented',
  soc_controls = 'Legal analysis accuracy; dual federal/state framework compliance; client advisement documentation; APPS database verification; ongoing prohibition monitoring; DOJ notification compliance'
WHERE name = 'Firearm Rights Restoration Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Padilla v. Kentucky, 559 U.S. 356 (2010) (duty to advise on immigration consequences); Cal. Penal Code ss 1016.2-1016.3 (Defense obligation to consider immigration consequences); Cal. Penal Code ss 1473.7 (Vacatur for failure to advise on immigration consequences); 8 USC ss 1227(a)(2) (Deportable offenses); 8 USC ss 1182(a)(2) (Inadmissible offenses); 8 USC ss 1101(a)(43) (Aggravated felony definition); Cal. Penal Code ss 18.5 (Misdemeanor sentencing cap at 364 days -- immigration safe harbor); AB 1732 (Expanding PC ss 1473.7 vacatur); Immigration and Nationality Act (INA) removal grounds',
  standards_of_creation = 'Immigration consequences analysis for each plea/conviction; advisement documented on record; safe-haven plea alternatives identified; post-conviction relief analysis (PC ss 1473.7 motion); categorical approach analysis documented (divisible statute, modified categorical approach); immigration-neutral disposition recommendations documented; ICE detainer response analyzed; client advisement documentation; motion to vacate documented with ineffective assistance claim',
  soc_controls = 'Analysis accuracy (categorical approach); Padilla compliance verification; PC ss 1473.7 petition timeliness; client consent documentation; interpreter use documented; coordination with immigration counsel; outcome tracking (deportation prevention)'
WHERE name = 'Immigration Consequences Specialist (Padilla Compliance)';

-- ============================================================
-- END OF FILE
-- Total: 132 UPDATE statements
-- Childcare/Social Services/Housing: 53 personas
-- Corrections/Probation/Reentry: 79 personas
-- ============================================================

-- Vernen Legal Compliance — Industry-Specific: Healthcare
-- The Complete Book: Healthcare Compliance for All 50 States + DC + Federal
-- Created: March 17, 2026
--
-- Coverage:
--   Federal: HIPAA operations, Stark Law, Anti-Kickback, EMTALA, Medicare CoP,
--     42 CFR Part 2, FDA, DEA Schedule compliance, No Surprises Act, HITECH,
--     Conditions of Participation, Telehealth federal, Mental Health Parity
--   State: Medical practice acts, pharmacy regulations, telehealth per state,
--     nurse practitioner scope, corporate practice of medicine doctrine,
--     mandatory reporting, informed consent, medical records retention

-- ============================================================
-- FEDERAL HEALTHCARE RULES
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('fed-hlth-001', 'FED-HLTH-001', 'HIPAA Administrative Simplification — Operational Requirements',
 'Covered entities (health plans, clearinghouses, providers conducting electronic transactions) and business associates must: designate a Privacy Officer and Security Officer, implement Privacy Policies and Procedures, conduct workforce training, execute Business Associate Agreements (BAAs) with all vendors accessing PHI, implement minimum necessary standard, maintain Notice of Privacy Practices, comply with individual rights (access, amendment, accounting of disclosures, restriction requests). Annual risk assessment required under Security Rule.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2003-04-14', '45 CFR Parts 160, 162, 164', 'https://www.hhs.gov/hipaa/index.html', 1),

('fed-hlth-002', 'FED-HLTH-002', 'Stark Law — Physician Self-Referral Prohibition',
 'Physicians may not refer Medicare/Medicaid patients for designated health services (DHS) to entities with which the physician (or immediate family member) has a financial relationship, unless an exception applies. DHS includes: clinical lab, physical therapy, radiology/imaging, DME, home health, outpatient Rx drugs, inpatient/outpatient hospital services. Exceptions: in-office ancillary, employment, personal services, rental, isolated transactions. Violations: denial of payment, refund obligation, civil monetary penalties ($15,000-$100,000), exclusion from federal programs.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '1992-01-01', '42 USC § 1395nn; 42 CFR Part 411 Subpart J', 'https://www.cms.gov/Medicare/Fraud-and-Abuse/PhysicianSelfReferral', 1),

('fed-hlth-003', 'FED-HLTH-003', 'Federal Anti-Kickback Statute (AKS)',
 'Prohibits knowingly and willfully offering, paying, soliciting, or receiving anything of value to induce or reward referrals of items or services reimbursable by federal healthcare programs. Applies to BOTH sides of the transaction. Criminal penalties: up to $100,000 fine and 10 years imprisonment per violation. Civil penalties: $100,000 per violation plus 3x damages. Safe harbors: investment interests, space/equipment rental, personal services, managed care, EHR donations (expired). OIG Advisory Opinions available.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '42 USC § 1320a-7b(b); 42 CFR § 1001.952 (safe harbors)', 'https://oig.hhs.gov/compliance/physician-education/fraud-abuse-laws/', 1),

('fed-hlth-004', 'FED-HLTH-004', 'EMTALA — Emergency Medical Treatment and Labor Act',
 'Hospitals with emergency departments that participate in Medicare must: provide a medical screening examination (MSE) to anyone who comes to the ED requesting treatment, regardless of ability to pay or insurance status. If an emergency medical condition exists, must provide stabilizing treatment or appropriate transfer. Applies to hospital property including parking lots and sidewalks. On-call physicians must respond. Violations: $119,942 per violation (hospitals), $59,973 (physicians), plus exclusion from Medicare.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["CORPORATION","LLC","NONPROFIT"]',
 '1986-08-01', '42 USC § 1395dd; 42 CFR § 489.24', 'https://www.cms.gov/regulations-and-guidance/legislation/emtala', 1),

('fed-hlth-005', 'FED-HLTH-005', 'Medicare Conditions of Participation (CoP)',
 'Hospitals, home health agencies, hospices, ASCs, CORFs, and other providers must meet CMS Conditions of Participation to receive Medicare/Medicaid reimbursement. Requirements include: governing body, quality assessment/performance improvement (QAPI), infection control, patient rights, medical records, pharmaceutical services, nursing services, dietary, physical environment, discharge planning. Deemed status available through accreditation (Joint Commission, DNV, HFAP). Surveyed on 3-year cycle.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["CORPORATION","LLC","NONPROFIT"]',
 NULL, '42 CFR Parts 482 (hospitals), 484 (HHA), 418 (hospice), 416 (ASC)', 'https://www.cms.gov/regulations-and-guidance/legislation/cfr/index', 1),

('fed-hlth-006', 'FED-HLTH-006', '42 CFR Part 2 — Substance Use Disorder Records',
 'Federally-assisted programs providing alcohol/drug abuse diagnosis, treatment, or referral must comply with heightened confidentiality requirements for substance use disorder (SUD) patient records. More restrictive than HIPAA: requires specific written patient consent for most disclosures, prohibits re-disclosure, restricts use in criminal proceedings. Updated 2024 to better align with HIPAA while maintaining stricter protections. Violations: up to $500 first offense, $5,000 subsequent.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '42 USC § 290dd-2; 42 CFR Part 2', 'https://www.samhsa.gov/about-us/who-we-are/laws-regulations/confidentiality-regulations-faqs', 1),

('fed-hlth-007', 'FED-HLTH-007', 'No Surprises Act — Surprise Billing Protections',
 'Effective January 1, 2022: prohibits surprise medical bills for emergency services, non-emergency services at in-network facilities by out-of-network providers, and air ambulance services. Providers must provide good faith estimates to uninsured/self-pay patients. Independent Dispute Resolution (IDR) process for payment disputes between providers and insurers. Providers cannot balance bill patients beyond in-network cost-sharing. Advanced EOBs required.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2022-01-01', 'Pub. L. 116-260, Division BB, Title I; 45 CFR Parts 149, 150', 'https://www.cms.gov/nosurprises', 1),

('fed-hlth-008', 'FED-HLTH-008', 'HITECH Act — Health IT and Breach Notification',
 'Strengthens HIPAA enforcement: breach notification required within 60 days for breaches affecting 500+ individuals (plus HHS/media notification). Individual notification for smaller breaches. Increased penalties: $100-$50,000 per violation (up to $1.5M annually per category). Business associates directly liable under HIPAA. Meaningful Use/Promoting Interoperability incentives for EHR adoption. Information Blocking prohibition (effective 2021).',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2009-02-17', '42 USC § 17901-17953 (HITECH); 45 CFR Part 164 Subpart D', 'https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html', 1),

('fed-hlth-009', 'FED-HLTH-009', 'False Claims Act (FCA) — Healthcare Fraud',
 'Prohibits knowingly submitting false claims to the government for payment. In healthcare: upcoding, unbundling, billing for services not rendered, false cost reports, kickback-tainted claims. Treble damages plus $11,803-$23,607 per false claim. Qui tam (whistleblower) provisions allow private parties to sue on behalf of the government and receive 15-30% of recovery. Largest source of healthcare fraud recoveries ($2.3B in 2023).',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '31 USC § 3729-3733', 'https://www.justice.gov/civil/fraud-statistics', 1),

('fed-hlth-010', 'FED-HLTH-010', 'Mental Health Parity and Addiction Equity Act (MHPAEA)',
 'Group health plans and insurers offering mental health/substance use disorder (MH/SUD) benefits must provide them at parity with medical/surgical benefits. Financial requirements (deductibles, copays) and treatment limitations (visit limits, prior auth) cannot be more restrictive for MH/SUD than for medical/surgical. Quantitative and non-quantitative treatment limitation (NQTL) analysis required. Comparative analysis must be performed and available to regulators on request.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 '2008-10-03', '29 USC § 1185a; 42 USC § 300gg-26; 26 USC § 9812', 'https://www.dol.gov/agencies/ebsa/laws-and-regulations/laws/mental-health-and-substance-use-disorder-parity', 1),

('fed-hlth-011', 'FED-HLTH-011', 'CLIA — Clinical Laboratory Improvement Amendments',
 'ALL laboratories performing testing on human specimens for health assessment must be certified under CLIA. Certificate types: waiver (simple tests), PPM (provider-performed microscopy), moderate complexity, high complexity. Requirements scale with complexity: personnel standards, quality control, proficiency testing, patient test management, quality assessment. Surveyed every 2 years. Penalties: $10,000/day for uncertified labs, $10,000/day for condition-level deficiencies.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '1988-10-31', '42 USC § 263a; 42 CFR Part 493', 'https://www.cms.gov/Regulations-and-Guidance/Legislation/CLIA', 1),

('fed-hlth-012', 'FED-HLTH-012', 'OIG Compliance Program Guidance — Healthcare Entities',
 'The HHS Office of Inspector General (OIG) recommends that all healthcare entities implement compliance programs with 7 elements: (1) written policies/procedures/code of conduct, (2) designated compliance officer, (3) education and training, (4) internal reporting system (hotline), (5) internal monitoring and auditing, (6) enforcement through disciplinary guidelines, (7) prompt response to detected offenses. While not technically mandatory for all providers, CMS requires compliance programs for Medicare Advantage, Part D plans, and SNFs.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'OIG Compliance Program Guidance (various); 42 CFR § 422.503, 423.504 (MA/Part D)', 'https://oig.hhs.gov/compliance/compliance-guidance/', 1),

('fed-hlth-013', 'FED-HLTH-013', 'OSHA Bloodborne Pathogens Standard',
 'Employers with workers who have occupational exposure to blood or other potentially infectious materials (OPIM) must implement an Exposure Control Plan. Requirements: free Hepatitis B vaccination, universal precautions, engineering/work practice controls, PPE, housekeeping, regulated waste disposal, labels/signs, training (initial + annual), post-exposure evaluation, medical recordkeeping (duration of employment + 30 years). Covers: hospitals, clinics, dental offices, labs, funeral homes, first responders.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '1992-03-06', '29 CFR § 1910.1030', 'https://www.osha.gov/bloodborne-pathogens/standards', 1),

('fed-hlth-014', 'FED-HLTH-014', 'Medicare/Medicaid Provider Enrollment',
 'Providers and suppliers must enroll in the Medicare program before submitting claims. CMS-855 forms: 855A (institutional), 855B (clinics/group practices), 855I (individual physicians), 855S (DME suppliers), 855R (reassignment). Revalidation every 3-5 years depending on risk category (limited, moderate, high). Must report changes within 30-90 days. Revocation for: felony conviction, false information, abuse of billing privileges, non-compliance with enrollment requirements.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '42 CFR Part 424 Subpart P; CMS-855 forms', 'https://www.cms.gov/Medicare/Provider-Enrollment-and-Certification/MedicareProviderSupEnroll', 1),

('fed-hlth-015', 'FED-HLTH-015', 'Patient Safety and Quality Improvement Act (PSQIA)',
 'Establishes voluntary patient safety reporting system. Patient Safety Organizations (PSOs) collect, aggregate, and analyze patient safety data. Patient Safety Work Product (PSWP) receives federal privilege and confidentiality protections — cannot be used in civil, criminal, administrative, or disciplinary proceedings. Providers reporting to PSOs receive protections not available for internal quality data. Separate from mandatory state reporting requirements.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]',
 '2005-07-29', '42 USC § 299b-21 to 299b-26; 42 CFR Part 3', 'https://www.hhs.gov/hipaa/for-professionals/patient-safety/index.html', 1),

('fed-hlth-016', 'FED-HLTH-016', 'Telehealth — Federal Requirements',
 'Medicare telehealth: covered under various waivers and the Consolidated Appropriations Act. Originating site requirements (relaxed during PHE, some permanent). Must use interactive audio/video. Prescribing via telehealth: Ryan Haight Act requires at least one in-person exam for controlled substances (DEA special registration for telehealth prescribing under development). Interstate practice: providers generally must be licensed in the patient''s state. Telehealth flexibilities from COVID-19 PHE partially made permanent through 2024 legislation.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '42 USC § 1395m(m); Ryan Haight Act (21 USC § 829(e)); CMS Telehealth List', 'https://www.cms.gov/medicare/coverage/telehealth', 1);


-- ============================================================
-- STATE HEALTHCARE RULES — KEY STATES
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

-- CALIFORNIA
('ca-hlth-001', 'CA-HLTH-001', 'California Corporate Practice of Medicine Doctrine',
 'California prohibits corporations (other than professional medical corporations) from employing physicians or practicing medicine. Known as the Corporate Practice of Medicine (CPOM) doctrine. Lay entities cannot control medical judgment. Exceptions: certain licensed clinics (community clinics, free clinics), health plans, universities, government. Common workaround: management services organization (MSO) model with professional corporation. Violation: practicing medicine without a license (felony).',
 'INDUSTRY_SPECIFIC', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 NULL, 'Cal. Bus. & Prof. Code § 2052, 2400; Cal. Corp. Code § 13401', 'https://www.mbc.ca.gov/', 1),

('ca-hlth-002', 'CA-HLTH-002', 'California Medical Board Licensing and Supervision',
 'Physicians must be licensed by the Medical Board of California (MBC). Requires: USMLE or COMLEX passage, ACGME or AOA residency training (36 months minimum), no disqualifying criminal history. Must complete 50 CME hours per 2-year renewal cycle (including mandatory courses in pain management, geriatric medicine, implicit bias). Supervising physicians: may supervise NPs (standardized procedures required through 2022; independent practice for NPs effective 2023 per AB 890), PAs (delegation of services agreement).',
 'INDUSTRY_SPECIFIC', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Cal. Bus. & Prof. Code § 2000-2529', 'https://www.mbc.ca.gov/licensing/', 1),

('ca-hlth-003', 'CA-HLTH-003', 'California Confidentiality of Medical Information Act (CMIA)',
 'California law providing ADDITIONAL protections beyond HIPAA for medical information. Covers providers, health plans, pharmaceutical companies, and contractors. Requires written authorization for most disclosures (narrower exceptions than HIPAA). Patient may bring private lawsuit for negligent or willful disclosure. Damages: $1,000 per violation (negligent), $5,000 (knowing/willful), plus actual damages and attorney fees. Special protections for: HIV, mental health, genetic information, substance abuse.',
 'INDUSTRY_SPECIFIC', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Cal. Civ. Code § 56-56.37', 'https://oag.ca.gov/privacy/medical-privacy', 1),

('ca-hlth-004', 'CA-HLTH-004', 'California Telehealth Requirements',
 'California requires health plans to cover telehealth services on par with in-person services (AB 32, 2021). Providers must be licensed in California (exceptions for border consultations). Informed consent required for telehealth visits. Audio-only telehealth permitted for Medi-Cal patients. No originating site restrictions. Business license required in jurisdiction where patient is located. Must comply with CMIA for all telehealth records.',
 'INDUSTRY_SPECIFIC', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2021-01-01', 'Cal. Bus. & Prof. Code § 2290.5; Cal. Health & Safety Code § 1374.14', 'https://www.dhcs.ca.gov/provgovpart/Pages/Telehealth.aspx', 1),

-- NEW YORK
('ny-hlth-001', 'NY-HLTH-001', 'New York Corporate Practice of Medicine',
 'New York strictly prohibits the corporate practice of medicine. Only licensed physicians, professional corporations (PCs), and certain authorized entities (hospitals, HMOs, university faculty practice plans) may employ physicians. Management Services Organizations (MSOs) cannot exercise control over clinical decisions. PC must be owned by licensed professionals. Violations: unlawful practice (Class E felony), referral fee restrictions apply.',
 'INDUSTRY_SPECIFIC', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 NULL, 'N.Y. Educ. Law § 6512, 6524; N.Y. Bus. Corp. Law § 1503-1516', 'https://www.op.nysed.gov/professions/medicine', 1),

('ny-hlth-002', 'NY-HLTH-002', 'New York SHIELD Act — Healthcare Data Security',
 'Healthcare entities in New York must comply with the SHIELD Act''s enhanced data security requirements in addition to HIPAA. Must implement a data security program with: reasonable administrative safeguards (employee training, risk assessment), technical safeguards (encryption, intrusion detection), physical safeguards (information disposal, access controls). Breach notification within most expedient time possible. Private right of action not explicit but AG enforcement with penalties up to $5,000/violation.',
 'INDUSTRY_SPECIFIC', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2020-03-21', 'N.Y. Gen. Bus. Law § 899-aa, 899-bb', 'https://ag.ny.gov/resources/organizations/data-breach-reporting', 1),

-- TEXAS
('tx-hlth-001', 'TX-HLTH-001', 'Texas Medical Practice Act',
 'Physicians must be licensed by the Texas Medical Board (TMB). Texas has a relatively permissive corporate practice doctrine — allows corporate employment of physicians with restrictions. Must maintain delegation agreements for PA/NP supervision. Prescriptive authority: physicians may delegate prescribing (including Schedule III-V) to advanced practice providers with proper delegation agreement. 48 CME hours per 2-year renewal (including mandatory topics).',
 'INDUSTRY_SPECIFIC', 'STATE', 'TX',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Tex. Occ. Code § 151-170; 22 TAC Part 9', 'https://www.tmb.state.tx.us/', 1),

('tx-hlth-002', 'TX-HLTH-002', 'Texas Identity Theft Enforcement and Protection Act — Health Data',
 'Texas requires healthcare providers to notify patients within 60 days of discovering a breach of protected health information (when exceeding HIPAA requirements in some respects). Must notify AG if 250+ individuals affected. Texas also has the Texas Medical Records Privacy Act (TMRPA) providing state-level medical privacy protections. Entities handling biometric identifiers must comply with the Texas CUBI Act.',
 'INDUSTRY_SPECIFIC', 'STATE', 'TX',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Tex. Bus. & Com. Code § 521.001-521.151; Tex. Health & Safety Code § 181.001-181.206', 'https://www.texasattorneygeneral.gov/', 1),

-- FLORIDA
('fl-hlth-001', 'FL-HLTH-001', 'Florida Healthcare Licensing and Regulation',
 'Healthcare facilities must be licensed by the Agency for Health Care Administration (AHCA). License types: hospitals (Class I, II, III), ASCs, nursing homes, home health agencies, hospices, clinical labs, birth centers. Physicians licensed by FL Board of Medicine (DOH). Florida permits the corporate practice of medicine (one of the more permissive states). NPs gained independent practice authority in 2020 (after 3,000 supervised clinical hours). Continuing education: 40 hours per 2-year cycle.',
 'INDUSTRY_SPECIFIC', 'STATE', 'FL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Fla. Stat. § 395 (hospitals); § 458 (medicine); § 464 (nursing)', 'https://ahca.myflorida.com/', 1),

-- ILLINOIS
('il-hlth-001', 'IL-HLTH-001', 'Illinois Healthcare Worker Background Check Act',
 'All healthcare employers must conduct fingerprint-based criminal background checks on all applicants for positions with direct patient access. Includes: hospitals, nursing homes, home health agencies, hospices, community integrated living arrangements, and others. Must check: IL State Police, FBI databases, Health Care Worker Registry, sex offender registry, nurse aide registry. Disqualifying offenses: certain felonies within specified lookback periods. Must maintain documentation.',
 'INDUSTRY_SPECIFIC', 'STATE', 'IL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '225 ILCS 46/1-46/95 (Health Care Worker Background Check Act)', 'https://dph.illinois.gov/topics-services/health-care-regulation/health-care-worker-registry.html', 1),

-- MASSACHUSETTS
('ma-hlth-001', 'MA-HLTH-001', 'Massachusetts Patient Safety and Quality Standards',
 'Massachusetts requires all acute care hospitals to report serious reportable events (SREs) to the Betsy Lehman Center for Patient Safety. Must implement patient safety programs. Nurse staffing ratios: ICU mandated at 1:1 or 1:2 depending on acuity. Mandatory infection reporting to DPH. Informed consent requirements codified. Medical records retention: 30 years for hospitals (one of the longest in the US). Healthcare Cost Containment Board monitors spending.',
 'INDUSTRY_SPECIFIC', 'STATE', 'MA',
 '["CORPORATION","LLC","NONPROFIT"]',
 NULL, 'MGL ch. 111 § 203-207; 105 CMR 130.000', 'https://www.mass.gov/topics/hospitals-clinics', 1),

-- GENERAL STATE RULES (apply across many states)
('gen-hlth-001', 'GEN-HLTH-001', 'State Medical Records Retention Requirements',
 'Medical records retention periods vary by state. Common minimums: Adults: 6-10 years from last visit (some states require longer). Minors: until age of majority + state retention period. Medicare: 6 years minimum. Key variations: MA (30 years hospital), CA (10 years), NY (6 years adult, until 19 for minors + 6 years), FL (7 years from last contact), TX (7 years). Must also retain records needed for active litigation. Electronic records subject to same retention. Destruction must be secure (shred/incinerate physical; certified deletion electronic).',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'State-specific statutes; 42 CFR § 482.24(b) (Medicare); CMS CoP', 'https://www.healthit.gov/', 1),

('gen-hlth-002', 'GEN-HLTH-002', 'Mandatory Reporting — Child Abuse and Neglect',
 'ALL 50 states and DC require certain professionals (mandatory reporters) to report suspected child abuse or neglect. Healthcare providers are mandatory reporters in every state. Reporting typically goes to: state child protective services (CPS) and/or law enforcement. Failure to report: criminal penalty in most states (misdemeanor, some states felony). Good faith reporters receive immunity from civil/criminal liability. Must report even if HIPAA would otherwise prohibit disclosure (HIPAA exception for mandatory reporting).',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'CAPTA (42 USC § 5101-5119c); state-specific mandatory reporting statutes', 'https://www.childwelfare.gov/topics/systemwide/laws-policies/statutes/manda/', 1),

('gen-hlth-003', 'GEN-HLTH-003', 'State Nurse Practitioner Scope of Practice',
 'NP scope of practice varies significantly by state. Full practice authority (no physician oversight): 27 states + DC. Reduced practice (collaborative agreement required): 12 states. Restricted practice (supervisory relationship required): 11 states. Full practice states include: AK, AZ, CO, CT, DC, HI, ID, IA, KS, ME, MD, MN, MT, NE, NV, NH, NM, ND, OR, RI, SD, VT, WA, WV, WY, plus CA (as of 2023 with transition period). Prescriptive authority for controlled substances: varies (some states limit schedule). This directly impacts business structure, staffing models, and service delivery.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'State nurse practice acts; AANP Practice Environment Map', 'https://www.aanp.org/advocacy/state/state-practice-environment', 1),

('gen-hlth-004', 'GEN-HLTH-004', 'Interstate Medical Licensure Compact',
 'The IMLC allows eligible physicians to practice in multiple member states through an expedited licensing process. Currently 42 states + DC + Guam are members. Physicians must hold a license in their state of principal licensure (SPL). Requirements: board certification (ABMS or AOBMS), clean history, active practice. Does NOT create a single license — issues individual state licenses through expedited process. Each state license subject to that state''s laws and fees. Compact does not cover DOs in all states.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2017-01-01', 'Interstate Medical Licensure Compact (state compact legislation)', 'https://www.imlcc.org/', 1),

('gen-hlth-005', 'GEN-HLTH-005', 'Pharmacy Benefit Manager (PBM) Regulation',
 'States are increasingly regulating PBMs. As of 2024, 49+ states have some form of PBM legislation. Common requirements: state licensure/registration, fiduciary duty to plan sponsors, disclosure of rebate pass-through, prohibition of spread pricing in Medicaid, prohibition of gag clauses on pharmacists, MAC pricing transparency, prohibition of steering. Federal: FTC enforcement action authority, Congressional oversight. Each state''s PBM laws must be checked individually as requirements vary widely.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["CORPORATION","LLC","S_CORP","PARTNERSHIP"]',
 NULL, 'State PBM licensure acts; FTC authority; Consolidation Appropriations Act provisions', 'https://www.ncsl.org/health/pharmacy-benefit-manager-regulations', 1);


-- ============================================================
-- STATE HEALTHCARE — ALL 50 STATES (Core Requirements)
-- Mandatory reporting, medical records, telehealth
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('al-hlth-001', 'AL-HLTH-001', 'Alabama Healthcare Facility Licensing',
 'Healthcare facilities must be licensed by the Alabama Department of Public Health. Physicians licensed by the Alabama Board of Medical Examiners. Alabama does NOT have a corporate practice of medicine doctrine (one of the more permissive states). NPs require collaborative practice agreements with physicians. Telehealth: must be licensed in Alabama; Alabama Telehealth Act (2016) provides parity for reimbursement.',
 'INDUSTRY_SPECIFIC', 'STATE', 'AL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Ala. Code § 22-21-20 (hospitals); § 34-24-50 (medical practice)', 'https://www.alabamapublichealth.gov/providersandpartners/', 1),

('ak-hlth-001', 'AK-HLTH-001', 'Alaska Healthcare Licensing',
 'Physicians licensed by the Alaska State Medical Board. Alaska grants NPs full practice authority (no physician oversight required). Telehealth: business license required; must be licensed in Alaska unless providing services through a multistate compact. Medical records retention: 7 years adults, until age 21 + 7 years for minors. Alaska Medicaid covers telehealth broadly.',
 'INDUSTRY_SPECIFIC', 'STATE', 'AK',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Alaska Stat. § 08.64 (medicine); § 08.68 (nursing)', 'https://www.commerce.alaska.gov/web/cbpl/ProfessionalLicensing/StateMedicalBoard.aspx', 1),

('az-hlth-001', 'AZ-HLTH-001', 'Arizona Healthcare Regulation',
 'Physicians licensed by the Arizona Medical Board (MD) or Arizona Board of Osteopathic Examiners (DO). Arizona permits corporate employment of physicians. NPs: independent practice authority since 2001 (one of the earliest states). Telehealth: liberal; Arizona Telehealth Act provides parity. Must be licensed in Arizona. Informed consent for telehealth required. Prescribing controlled substances via telehealth: in-person exam requirement with exceptions.',
 'INDUSTRY_SPECIFIC', 'STATE', 'AZ',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'A.R.S. § 32-1401 (medicine); § 32-1601 (nursing); § 36-3601 (telehealth)', 'https://www.azmd.gov/', 1),

('co-hlth-001', 'CO-HLTH-001', 'Colorado Healthcare Regulation',
 'Colorado Department of Regulatory Agencies (DORA) licenses all healthcare professionals. NPs have full practice authority. Colorado has NO corporate practice of medicine doctrine. Telehealth: broadly permitted; parity required for private insurance (SB 20-212). Must be licensed in Colorado. Medical records retention: 10 years for physicians. Mandatory reporting: child abuse, elder abuse, gunshot/stab wounds, certain communicable diseases.',
 'INDUSTRY_SPECIFIC', 'STATE', 'CO',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'CRS § 12-240 (medicine); § 12-255 (nursing); § 10-16-123.4 (telehealth)', 'https://dpo.colorado.gov/Medical', 1),

('ga-hlth-001', 'GA-HLTH-001', 'Georgia Healthcare Regulation',
 'Physicians licensed by the Georgia Composite Medical Board. Georgia has a strict corporate practice of medicine doctrine. NPs must have a protocol agreement with a physician (reduced practice state). Telehealth: permitted but prescribing controlled substances requires prior in-person exam (with exceptions for established patients). Georgia Patient''s Right to Know Act requires disclosure of disciplinary actions.',
 'INDUSTRY_SPECIFIC', 'STATE', 'GA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'O.C.G.A. § 43-34-1 (Composite Medical Board); § 43-26-1 (nursing)', 'https://medicalboard.georgia.gov/', 1),

('mi-hlth-001', 'MI-HLTH-001', 'Michigan Healthcare Regulation',
 'Healthcare facilities licensed by the Michigan Department of Licensing and Regulatory Affairs (LARA). Physicians licensed by the Michigan Board of Medicine. Michigan does NOT have a strong corporate practice of medicine doctrine. NPs require a collaborative agreement with a physician (reduced practice). Certificate of Need required for certain healthcare facilities and services. Telehealth parity: required for Medicaid and private insurance.',
 'INDUSTRY_SPECIFIC', 'STATE', 'MI',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'MCL § 333.16101 et seq. (Public Health Code)', 'https://www.michigan.gov/lara/bureau-list/bpl', 1),

('nj-hlth-001', 'NJ-HLTH-001', 'New Jersey Healthcare Regulation',
 'Physicians licensed by the New Jersey Board of Medical Examiners. New Jersey has a corporate practice of medicine doctrine (enforced). NPs gained independent practice authority effective January 2020 (after 2 years and 2,400 supervised clinical hours). Certificate of Need required for certain facilities and equipment. Medical records retention: 7 years after last visit (adults), 7 years after age of majority (minors). Telehealth: parity required (P.L. 2017, c. 117).',
 'INDUSTRY_SPECIFIC', 'STATE', 'NJ',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'N.J.S.A. 45:9-1 (medicine); N.J.S.A. 26:2H-1 (healthcare facilities)', 'https://www.njconsumeraffairs.gov/med/', 1),

('oh-hlth-001', 'OH-HLTH-001', 'Ohio Healthcare Regulation',
 'Physicians licensed by the State Medical Board of Ohio. Ohio does NOT have a strong corporate practice of medicine doctrine. NPs require a collaborative agreement with a physician (reduced practice). Certificate of Need program covers: LTC beds, hospital beds, cardiac catheterization, open-heart surgery, organ transplantation. Medical records retention: 6 years. Telehealth: broadly permitted; prescribing controlled substances allowed with appropriate safeguards.',
 'INDUSTRY_SPECIFIC', 'STATE', 'OH',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Ohio Rev. Code § 4731 (medicine); § 4723 (nursing); § 3702.51 (CON)', 'https://med.ohio.gov/', 1),

('pa-hlth-001', 'PA-HLTH-001', 'Pennsylvania Healthcare Regulation',
 'Physicians licensed by the Pennsylvania State Board of Medicine. Pennsylvania does NOT have a strong corporate practice of medicine doctrine. NPs require a collaborative agreement (reduced practice state). Act 112 of 2020 expanded NP scope. Healthcare facilities licensed by the Department of Health. Medical records retention: 7 years after last visit. Certificate of Need: abolished in 1996. Telehealth: parity required under Act 15 of 2020.',
 'INDUSTRY_SPECIFIC', 'STATE', 'PA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '63 P.S. § 422.1 (Medical Practice Act); 49 Pa. Code § 18.1', 'https://www.dos.pa.gov/ProfessionalLicensing/BoardsCommissions/Medicine/', 1),

('wa-hlth-001', 'WA-HLTH-001', 'Washington Healthcare Regulation',
 'Washington Department of Health licenses all healthcare professionals and facilities. NPs have full practice authority. Washington does NOT have a corporate practice of medicine doctrine. Telehealth: parity required (SB 5385, 2015); audio-only permitted. Must be licensed in Washington. Certificate of Need still required for hospitals, nursing homes, dialysis, ASCs, and other facilities. Medical records retention: 10 years adults, until age 21 + 3 years for minors.',
 'INDUSTRY_SPECIFIC', 'STATE', 'WA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'RCW 18.71 (medicine); RCW 70.38 (CON); RCW 48.43.735 (telehealth)', 'https://doh.wa.gov/licenses-permits-and-certificates', 1);

-- ============================================================
-- TRIPLE CONSTRAINT UPDATES: Research/Academic, Financial Services, Insurance/Banking/Tax
-- Generated: 2026-03-29
-- Total: 213 personas (60 + 60 + 93)
-- ============================================================

-- ============================================================
-- SECTION 1: RESEARCH / ACADEMIA / MUSEUMS (60 personas)
-- ============================================================

-- A1. GRANTS ADMINISTRATION & SPONSORED RESEARCH (7)

UPDATE citizen_catalog SET
  governing_guidelines = '2 CFR Part 200 (Uniform Guidance); NIH Grants Policy Statement (NIH GPS); NSF PAPPG NSF 25-1; 48 CFR Part 31 (FAR Cost Principles); Single Audit Act Amendments of 1996 (31 U.S.C. 7501-7507); OMB Circular A-21',
  standards_of_creation = 'SF-424 (R&R) Application Guide for NIH; NSF Research.gov submission format; Grants.gov S2S XML schema; DHHS-negotiated F&A rate agreement documentation; Cost-sharing per 2 CFR 200.306',
  soc_controls = 'SOC-ACCESS: Role-based access to eRA Commons, Research.gov; SOC-INTEGRITY: Budget traceable to institutional rate agreements; SOC-RETENTION: 3 years from final expenditure report per 2 CFR 200.334; SOC-AUDIT: Single Audit if federal expenditures exceed $750,000'
WHERE name = 'Research Grants Administrator';

UPDATE citizen_catalog SET
  governing_guidelines = '2 CFR Part 200, Subparts D-F; 48 CFR Part 31 (DOD contracts); CAS for universities receiving $50M+ in federal awards; NIH GPS Chapter 7; NSF Award & Administration Guide; FAR 52.216-7',
  standards_of_creation = 'Federal Financial Report (SF-425); Research Performance Progress Report (RPPR); Effort certification per 2 CFR 200.430; Equipment inventory per 2 CFR 200.313; Subrecipient monitoring per 2 CFR 200.332',
  soc_controls = 'SOC-INTEGRITY: Expenditure-to-budget reconciliation; SOC-ACCESS: Restricted PI and departmental tiers; SOC-RETENTION: 3 years from final FFR; SOC-MONITORING: 90-day closeout per 2 CFR 200.344'
WHERE name = 'Post-Award Grants Accountant';

UPDATE citizen_catalog SET
  governing_guidelines = 'EAR 15 CFR Parts 730-774; ITAR 22 CFR Parts 120-130; OFAC Sanctions 31 CFR Part 500 series; Deemed Export Rule 15 CFR 734.2(b)(2)(ii); Fundamental Research Exclusion 15 CFR 734.8; NSDD-189',
  standards_of_creation = 'Technology Control Plan (TCP); Deemed export assessment documentation; Restricted Party Screening per OFAC SDN List; BIS Form 748-P; DSP-5 for ITAR; Foreign national information forms',
  soc_controls = 'SOC-ACCESS: Access restricted by nationality per TCP; SOC-CLASSIFICATION: Document classification against CCL and USML; SOC-RETENTION: 5 years for EAR per 15 CFR 762.6; 5 years for ITAR per 22 CFR 122.5'
WHERE name = 'Export Control Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Bayh-Dole Act (35 U.S.C. 200-212); 37 CFR Part 401; Stevenson-Wydler Technology Innovation Act (15 U.S.C. 3701-3714); Executive Order 12591; iEdison System reporting requirements',
  standards_of_creation = 'Invention disclosure forms per 37 CFR 401.14(c); Patent prosecution documentation; AUTM model license agreements; Government use rights notification per 37 CFR 401.14(f)(4); iEdison electronic filing',
  soc_controls = 'SOC-INTEGRITY: Invention disclosure within 60 days of conception; SOC-RETENTION: Life of patent plus 6 years; SOC-CONFIDENTIALITY: Restricted until patent filed; SOC-NOTIFICATION: Federal agency notification within 2 months per 37 CFR 401.14(c)(1)'
WHERE name = 'Technology Transfer';

UPDATE citizen_catalog SET
  governing_guidelines = '2 CFR Part 200 (Uniform Guidance); FAR 48 CFR for federal contracts; Agency-specific terms (NIH Standard Terms, NSF GC-1); DFARS 48 CFR Chapter 2 for DOD research; OMB M-21-26',
  standards_of_creation = 'Subaward agreement templates per 2 CFR 200.332; UBMTA/SLA Material Transfer Agreements; Data Use Agreements per HIPAA/Common Rule; Consortium F&A documentation; Cost-sharing verification records',
  soc_controls = 'SOC-ACCESS: Institutional signature authority restricted; SOC-INTEGRITY: Terms negotiation audit trail; SOC-RETENTION: 3 years post-closeout; SOC-MONITORING: Subrecipient risk assessment per 2 CFR 200.332(b); SOC-COMPLIANCE: FFATA reporting'
WHERE name = 'Sponsored Programs Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'OSTP Nelson Memo (2022/2025); NIH Data Management and Sharing Policy (NOT-OD-21-013); NSF PAPPG Chapter II.D.2.i; FAIR Principles; DOE Order 241.1B; HIPAA Privacy Rule 45 CFR Part 164',
  standards_of_creation = 'NIH DMS Plan format; Metadata standards (DDI, DataCite, schema.org); Data repository deposit records (dbGaP, ICPSR, Dryad, Zenodo); De-identification methodology records',
  soc_controls = 'SOC-INTEGRITY: Data provenance from collection through deposit; SOC-ACCESS: Tiered access for sensitive data; SOC-RETENTION: Award duration plus 10 years for NIH-funded data; SOC-ENCRYPTION: PHI/PII encryption per HIPAA'
WHERE name = 'Research Data Steward';

UPDATE citizen_catalog SET
  governing_guidelines = 'NIH RCR Training (NOT-OD-10-019); NSF RCR Requirement (42 U.S.C. 1862o-1); USDA NIFA RCR (7 CFR 3022); 42 CFR Part 93 (Research Misconduct); ORI Framework for Institutional Policies',
  standards_of_creation = 'Training completion records covering 9 RCR core areas; CITI Program completion certificates; Refresher training schedules; Mentored research experience documentation (NSF)',
  soc_controls = 'SOC-TRACKING: Individual completion records linked to award numbers; SOC-RETENTION: Duration of award plus 3 years; SOC-INTEGRITY: Training content version control; SOC-REPORTING: Annual institutional certification to NSF'
WHERE name = 'Research Compliance Training';

-- A2. HUMAN SUBJECTS RESEARCH PROTECTION (5)

UPDATE citizen_catalog SET
  governing_guidelines = 'Common Rule 45 CFR Part 46, Subparts A-E; 21 CFR Parts 50 and 56 for FDA-regulated research; ICH E6(R2) GCP Guidelines; Belmont Report; AAHRPP Standards',
  standards_of_creation = 'IRB application forms (initial, continuing review, amendments); Protocol review with risk-benefit assessment; Quorum and voting records per 45 CFR 46.108; Minutes per 45 CFR 46.115(a)(2); Determination letters',
  soc_controls = 'SOC-INTEGRITY: Documented determination per protocol action; SOC-ACCESS: Records accessible to OHRP/FDA per 45 CFR 46.115(b); SOC-RETENTION: 3 years after completion per 45 CFR 46.115(b); SOC-INDEPENDENCE: Membership per 45 CFR 46.107'
WHERE name = 'IRB Chair';

UPDATE citizen_catalog SET
  governing_guidelines = '45 CFR Part 46 (all subparts); Federalwide Assurance (FWA) per OHRP; AAHRPP Evaluation Instrument; 42 U.S.C. 289; State human subjects protections (e.g., CA Health & Safety Code 24170-24179.5)',
  standards_of_creation = 'FWA application and renewal; HRPP policies and procedures manual; Organizational chart; Annual IRB registration updates; AAHRPP self-assessment; Reliance agreements per NIH sIRB Policy',
  soc_controls = 'SOC-GOVERNANCE: FWA Terms of Assurance compliance; SOC-INTEGRITY: Policy version control; SOC-RETENTION: FWA records for life of program plus 3 years; SOC-REPORTING: OHRP incident reporting'
WHERE name = 'Human Research Protection Program';

UPDATE citizen_catalog SET
  governing_guidelines = '45 CFR 46.116 (Informed Consent); 45 CFR 46.117 (Documentation); 21 CFR 50.20-50.27 (FDA); ICH E6(R2) Section 4.8; 2018 Revised Common Rule; 21 CFR 11 for e-consent',
  standards_of_creation = 'Consent form per 45 CFR 46.116(b) (8 basic, 6 additional elements); Readability 8th grade per NIH/FDA; Consent process documentation; LAR documentation; Short form per 45 CFR 46.117(b)(2)',
  soc_controls = 'SOC-INTEGRITY: IRB-stamped version control; SOC-ACCESS: Participant copy distribution; SOC-RETENTION: 3 years post-study or per FDA requirements; SOC-AUDIT: Consent audit checklist; SOC-TRANSLATION: Certified translation documentation'
WHERE name = 'Informed Consent Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'ICH E6(R2) Section 5.18 (Monitoring); 21 CFR Part 312 (IND); 21 CFR Part 812 (IDE); FDA Guidance: Risk-Based Approach to Monitoring; 21 CFR Part 11',
  standards_of_creation = 'Monitoring visit reports (pre-study, initiation, interim, close-out); Source document verification (SDV) records; Protocol deviation documentation; Regulatory binder audit checklists; Drug accountability records',
  soc_controls = 'SOC-INTEGRITY: 100% consent form audit, risk-proportionate SDV; SOC-ACCESS: Monitor access limited per HIPAA/protocol; SOC-RETENTION: Per 21 CFR 312.62; SOC-REPORTING: Sponsor notification of serious non-compliance'
WHERE name LIKE '%Clinical Research Monitor%';

UPDATE citizen_catalog SET
  governing_guidelines = '42 U.S.C. 241(d) (Certificates of Confidentiality, 21st Century Cures Act Section 2012); NIH Policy NOT-OD-17-109; 45 CFR Part 46; HIPAA Privacy Rule 45 CFR Part 164',
  standards_of_creation = 'Certificate of Confidentiality issuance documentation; Consent form language addressing CoC protections; Disclosure exception documentation; Research team training on CoC protections',
  soc_controls = 'SOC-CONFIDENTIALITY: Prohibition on disclosure in legal proceedings; SOC-INTEGRITY: Documentation of required disclosures and legal basis; SOC-RETENTION: Duration of research plus statutory period; SOC-ACCESS: Identifiers stored separately'
WHERE name = 'Certificate of Confidentiality';

-- A3. ANIMAL RESEARCH COMPLIANCE (2)

UPDATE citizen_catalog SET
  governing_guidelines = 'Animal Welfare Act (7 U.S.C. 2131-2159); 9 CFR Parts 1-4; PHS Policy on Humane Care and Use of Laboratory Animals; Guide for Care and Use (NRC 8th Ed); AVMA Euthanasia Guidelines; AAALAC Rules',
  standards_of_creation = 'IACUC protocol forms; Semiannual program review per PHS Policy IV.B; APHIS Form 7023; OLAW Annual Report; AAALAC Program Description; Veterinary care program documentation',
  soc_controls = 'SOC-INTEGRITY: 3-year protocol cycle with annual continuing review; SOC-ACCESS: Records available to OLAW/USDA; SOC-RETENTION: 3 years per PHS Policy and 9 CFR 2.35; SOC-REPORTING: Prompt OLAW notification of noncompliance'
WHERE name = 'IACUC';

UPDATE citizen_catalog SET
  governing_guidelines = 'PHS Policy IV.A.3.b; 9 CFR 2.33 (AWA AV requirements); Guide for Care Chapter 5; AVMA Euthanasia Guidelines; ACLAM certification standards; State veterinary practice act',
  standards_of_creation = 'Veterinary care program SOPs; Clinical/medical records; Pain/distress assessment documentation; Euthanasia verification records; DEA Schedule II-V controlled substance logs per 21 CFR 1304',
  soc_controls = 'SOC-AUTHORITY: Direct or delegated program authority documented; SOC-INTEGRITY: Medical records contemporaneous; SOC-RETENTION: Minimum 3 years; SOC-CONTROLLED SUBSTANCES: DEA registration and biennial inventory per 21 CFR 1304.11'
WHERE name = 'Attending Veterinarian';

-- A4. RESEARCH INTEGRITY & MISCONDUCT (3)

UPDATE citizen_catalog SET
  governing_guidelines = '42 CFR Part 93 (PHS Research Misconduct); NSF 45 CFR Part 689; Federal Research Misconduct Policy (OSTP 2000); 2 CFR 200.113 (Mandatory Disclosure); ORI Model Policy',
  standards_of_creation = 'Allegation assessment documentation; Inquiry committee report within 60 days per 42 CFR 93.307; Investigation report within 120 days per 42 CFR 93.310; Record sequestration and inventory; Adjudication records',
  soc_controls = 'SOC-INTEGRITY: Record sequestration and chain of custody; SOC-CONFIDENTIALITY: Identity protection per 42 CFR 93.108; SOC-RETENTION: 7 years per 42 CFR 93.317; SOC-REPORTING: ORI notification within 24 hours if immediate hazard'
WHERE name = 'Research Integrity Officer';

UPDATE citizen_catalog SET
  governing_guidelines = '42 CFR Part 50 Subpart F (PHS FCOI); 45 CFR Part 94; NSF PAPPG Chapter IX.A; FDA 21 CFR Part 54; Bayh-Dole Act 37 CFR 401.14(f)',
  standards_of_creation = 'FCOI disclosure forms (SFI >$5,000); FCOI management plans; Committee review and determination records; Public accessibility records per 42 CFR 50.605(a)(5); Travel disclosure; Subrecipient FCOI compliance',
  soc_controls = 'SOC-DISCLOSURE: Prior to expenditure; within 30 days of new SFI per 42 CFR 50.604; SOC-ACCESS: Public reports within 5 business days per 42 CFR 50.605(a)(5)(ii); SOC-RETENTION: 3 years from final expenditure per 42 CFR 50.604(i); SOC-TRAINING: Every 4 years'
WHERE name LIKE '%Conflict of Interest%';

UPDATE citizen_catalog SET
  governing_guidelines = 'ICMJE Recommendations; COPE Core Practices; NIH Public Access Policy (PL 111-8); OSTP Nelson Memo; CRediT Contributor Roles Taxonomy; COPE Retraction Guidelines',
  standards_of_creation = 'Authorship determination records (ICMJE 4 criteria); CRediT contributor roles; ICMJE COI forms; Data availability statements; Clinical trial registration verification; Preprint/postprint version documentation',
  soc_controls = 'SOC-INTEGRITY: Plagiarism screening (iThenticate); SOC-ACCESS: PubMed Central deposit within 12 months; SOC-RETENTION: Underlying data per journal/funder requirements; SOC-AUDIT: Post-publication correction documentation'
WHERE name LIKE '%Publication Ethics%';

-- A5. FACULTY & ACADEMIC PERSONNEL (3)

UPDATE citizen_catalog SET
  governing_guidelines = 'AAUP 1940 Statement on Academic Freedom and Tenure; Regional accreditation standards (WSCUC, HLC, SACSCOC); Title VII (42 U.S.C. 2000e); Title IX (20 U.S.C. 1681); ADA (42 U.S.C. 12101)',
  standards_of_creation = 'Tenure and promotion dossier format; External reviewer solicitation and confidentiality documentation; Committee recommendation records; Tenure clock extension documentation; Grievance documentation',
  soc_controls = 'SOC-CONFIDENTIALITY: External reviewer identity protection; SOC-DUE PROCESS: Notice and hearing per AAUP standards; SOC-RETENTION: Permanent for tenure decisions; 7 years for non-reappointment; SOC-ACCESS: Restricted to review committee'
WHERE name = 'Faculty Affairs';

UPDATE citizen_catalog SET
  governing_guidelines = 'Council of Graduate Schools (CGS) Policy Statement; CGS April 15 Resolution; Regional accreditation standards; NIH Kirschstein NRSA guidelines; NSF GRFP terms; FERPA (20 U.S.C. 1232g)',
  standards_of_creation = 'Admission records; Funding offer letters; Qualifying/comprehensive exam documentation; Dissertation committee records; Progress-to-degree milestones; PHS 2271 training grant appointment forms',
  soc_controls = 'SOC-PRIVACY: FERPA-compliant record handling; SOC-RETENTION: 5-7 years post-graduation, transcripts permanent; SOC-INTEGRITY: Milestone completion with signatures and dates; SOC-AUDIT: Training grant progress via xTrain'
WHERE name = 'Graduate Program Director';

UPDATE citizen_catalog SET
  governing_guidelines = 'NPA Recommended Practices; NIH NRSA stipend levels; FLSA classification determinations; IRS IRC 117, 127 (fellowship vs. salary); J-1 visa requirements (22 CFR Part 62)',
  standards_of_creation = 'Appointment letter with start/end dates, compensation, mentoring; Mentoring plan (NIH F and K awards); Individual Development Plan (myIDP); Annual performance evaluations; Benefits eligibility documentation',
  soc_controls = 'SOC-INTEGRITY: Appointment terms consistent with funding source; SOC-RETENTION: Personnel records 7 years; SOC-ACCESS: Restricted to supervisor, postdoc office, HR; SOC-COMPLIANCE: FLSA classification review'
WHERE name = 'Postdoctoral Affairs';

-- A6. RESEARCH SECURITY (2)

UPDATE citizen_catalog SET
  governing_guidelines = 'NISPOM (32 CFR Part 117); Executive Order 13526; NSDD-189; NSPM-33; ICD 705 (SCIFs); DoD Instruction 5200.39',
  standards_of_creation = 'Facility Clearance (FCL) documentation; Personnel security clearance records; DD Form 254; Security Classification Guides; SCIF accreditation; Foreign travel and contact reports; Insider threat program',
  soc_controls = 'SOC-CLASSIFICATION: Document marking per EO 13526; SOC-ACCESS: Need-to-know determination; SOC-RETENTION: Per classification schedule; declassification review at 10/25 years; SOC-PHYSICAL: SCIF specifications and inspections'
WHERE name LIKE '%Facility Security Officer%';

UPDATE citizen_catalog SET
  governing_guidelines = 'NSPM-33; CHIPS and Science Act Section 10631; NIH NOT-OD-19-114, NOT-OD-21-073; NSF PAPPG Chapter II.C.1.e; DOE Order 486.1A; Common Disclosure Forms',
  standards_of_creation = 'Researcher disclosure review documentation; Foreign talent program screening records; MFTRP risk assessments; Undisclosed foreign funding investigation; Research security training completion; Due diligence reports',
  soc_controls = 'SOC-DISCLOSURE: Pre-award and ongoing verification; SOC-INTEGRITY: Cross-referencing against public databases; SOC-RETENTION: 3 years post-closeout; SOC-REPORTING: Agency notification of undisclosed foreign support'
WHERE name LIKE '%Foreign Influence%';

-- B1. LABORATORY QUALITY & ACCREDITATION (5)

UPDATE citizen_catalog SET
  governing_guidelines = 'ISO/IEC 17025:2017; ISO 9001:2015; ILAC P10 (Metrological Traceability); ILAC G24 (Calibration Intervals); A2LA R101; NVLAP Handbook 150',
  standards_of_creation = 'Quality Manual per ISO 17025:2017 Section 8.2; Document control per Section 8.3; Management review per 8.9; Internal audit reports per 8.8; Corrective action per 8.7; Risk assessment per 8.5',
  soc_controls = 'SOC-INTEGRITY: Document control with unique identifiers, revision history; SOC-ACCESS: Controlled distribution lists; SOC-RETENTION: Minimum duration of accreditation cycle plus 1 cycle; SOC-AUDIT: Annual internal plus accreditation body assessment; SOC-IMPARTIALITY: Risk assessment per Section 4.1'
WHERE name LIKE '%Quality Manager%';

UPDATE citizen_catalog SET
  governing_guidelines = 'CLIA 88 (42 U.S.C. 263a); 42 CFR Part 493; CAP Accreditation Checklists; State clinical laboratory licensure (e.g., CA BFS, NY CLEP); CMS State Operations Manual Appendix C',
  standards_of_creation = 'CMS-116 application; Personnel qualification records per 42 CFR 493.1351-1495; Test menu with complexity categorization; Procedure manual per CLSI GP02-A6; Proficiency testing per 42 CFR 493.801-865',
  soc_controls = 'SOC-PERSONNEL: Qualification verification per complexity level; SOC-INTEGRITY: 2-year PT cycle compliance; SOC-RETENTION: 2-10 years per 42 CFR 493.1105; SOC-AUDIT: CMS/state survey every 2 years or CAP deemed status'
WHERE name = 'CLIA Laboratory Director';

UPDATE citizen_catalog SET
  governing_guidelines = 'ISO/IEC 17025:2017 Sections 6.4-6.5; ILAC P10:07/2020; ILAC P14; ISO/IEC Guide 98-3 (GUM); ANSI/NCSL Z540.3; NIST Handbook 150 (NVLAP)',
  standards_of_creation = 'Calibration certificates per ISO 17025 Section 7.8.4; Measurement uncertainty budgets per GUM; Calibration interval justification per ILAC G24; Equipment IQ/OQ/PQ records; Metrological traceability chain to SI units',
  soc_controls = 'SOC-TRACEABILITY: Unbroken chain to national/international standards; SOC-INTEGRITY: Uncertainty statements on all certificates; SOC-RETENTION: Equipment lifetime plus 1 calibration cycle; SOC-ACCESS: Certificates linked to serial numbers'
WHERE name LIKE '%Metrology Manager%';

UPDATE citizen_catalog SET
  governing_guidelines = '42 CFR 493.801-865 (CLIA PT); ISO/IEC 17043:2023; ISO 13528:2022; CAP COM.30000-30500 series; CMS CLIA analyte-specific criteria',
  standards_of_creation = 'PT enrollment records covering all regulated analytes; Result submission records with testing personnel; Unsuccessful PT investigation and corrective action; Alternative performance assessment records; PT sample handling documentation',
  soc_controls = 'SOC-INTEGRITY: PT tested by routine personnel per 42 CFR 493.801(b); SOC-PROHIBITION: No inter-lab PT communication per 42 CFR 493.801(b)(4); SOC-RETENTION: 2 years per 42 CFR 493.1105(a)(7); SOC-AUDIT: Three consecutive failures trigger sanctions per 42 CFR 493.850'
WHERE name = 'Proficiency Testing Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'ISO/IEC 17011:2017; ISO/IEC 17025:2017; ISO 15189:2022; Accreditation body-specific policies; ILAC/APLAC Mutual Recognition Arrangement',
  standards_of_creation = 'Accreditation application and scope documentation; Self-assessment/gap analysis; Assessment finding response (root cause, corrective action, closure); Scope maintenance records; Surveillance documentation',
  soc_controls = 'SOC-SCOPE: Accredited scope current and accurate; SOC-INTEGRITY: Corrective actions closed within timeframes; SOC-RETENTION: 2 full accreditation cycles; SOC-SYMBOL: Mark usage per accreditation body policy; SOC-AUDIT: Annual surveillance plus reassessment every 2-4 years'
WHERE name = 'Laboratory Accreditation Coordinator';

-- B2. LABORATORY SAFETY & BIOSAFETY (5)

UPDATE citizen_catalog SET
  governing_guidelines = 'OSHA Laboratory Standard 29 CFR 1910.1450; OSHA HazCom 29 CFR 1910.1200 (GHS); EPA RCRA 40 CFR Parts 260-268; NFPA 45; Prudent Practices in the Laboratory (NRC)',
  standards_of_creation = 'Chemical Hygiene Plan per 29 CFR 1910.1450(e); Chemical inventory with SDS per 29 CFR 1910.1200(g); Exposure assessments per 29 CFR 1910.1450(d); Laboratory-specific SOPs; Training records; Medical surveillance',
  soc_controls = 'SOC-ACCESS: CHP available to all per 29 CFR 1910.1450(e)(1); SOC-RETENTION: Exposure records 30 years per 29 CFR 1910.1020; SOC-REVIEW: Annual CHP review per 29 CFR 1910.1450(e)(4); SOC-TRAINING: Initial and refresher documented'
WHERE name = 'Chemical Hygiene Officer';

UPDATE citizen_catalog SET
  governing_guidelines = '10 CFR Part 20 (Radiation Protection); 10 CFR Part 30 (Byproduct Material); 10 CFR Part 33 (Broad Scope); 10 CFR Part 35 (Medical Use); 10 CFR Part 19 (Notices to Workers); State radiation control regulations; NRC Regulatory Guides',
  standards_of_creation = 'Radioactive materials license and amendments; Radiation Safety Committee minutes; Personnel dosimetry records (TLD/OSL); Radioactive material inventory and use logs; Radiation survey records; Waste disposal manifests; Sealed source leak tests per 10 CFR 30.53',
  soc_controls = 'SOC-DOSE: ALARA program; dose limits per 10 CFR 20.1201-1208; SOC-RETENTION: Dosimetry records until license terminated plus 3 years per 10 CFR 20.2106; SOC-REPORTING: NRC per 10 CFR 20.2202-2203; SOC-TRAINING: Annual per 10 CFR 19.12'
WHERE name = 'Radiation Safety Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'NIH Guidelines for Recombinant/Synthetic Nucleic Acid Molecules; 42 CFR Part 73 (HHS Select Agents); 9 CFR Part 121 (USDA Select Agents); 7 CFR Part 340 (APHIS); BMBL 6th Edition (CDC/NIH); WHO Laboratory Biosafety Manual 4th Ed',
  standards_of_creation = 'IBC registration and membership roster; IBC protocol review forms; BSL facility certification (BSL-1 through BSL-4); Risk assessment per BMBL risk group; Biological agent inventory and transfer records; Incident/exposure reports; IBC meeting minutes',
  soc_controls = 'SOC-CONTAINMENT: BSL certification and annual recertification; SOC-ACCESS: BSL-3/BSL-4 access control and training verification; SOC-RETENTION: Per NIH Guidelines Section IV-B-2-a-(7); SOC-REPORTING: NIH/OBA per Section IV-B-2-b; SOC-AUDIT: CDC/USDA select agent inspections'
WHERE name LIKE '%Biosafety%' AND (name LIKE '%Officer%');

UPDATE citizen_catalog SET
  governing_guidelines = '42 CFR Part 73 (HHS Select Agents); 9 CFR Part 121 (USDA Select Agents); USA PATRIOT Act Section 817 (18 U.S.C. 175b); Agricultural Bioterrorism Protection Act (7 U.S.C. 8401); PHS Act Section 351A (42 U.S.C. 262a)',
  standards_of_creation = 'APHIS/CDC Forms 1, 2, 3; Security Risk Assessment documentation; Biosafety Plan for select agents; Incident Response Plan; Agent inventory at vial-level; Agent-specific SOPs',
  soc_controls = 'SOC-SECURITY: DOJ/FBI SRA every 3 years; SOC-ACCESS: Tiered access, escort requirements; SOC-INVENTORY: Annual inventory with discrepancy investigation; SOC-REPORTING: Theft/loss to FSAP and FBI within 24 hours per 42 CFR 73.19'
WHERE name = 'Select Agent';

UPDATE citizen_catalog SET
  governing_guidelines = 'ANSI Z136.1 (Safe Use of Lasers); ANSI Z136.3 (Health Care); ANSI Z136.5 (Educational); ANSI Z136.8 (Research); 29 CFR 1926.54; 21 CFR Parts 1040.10-1040.11 (FDA); IEC 60825-1',
  standards_of_creation = 'Laser safety program per ANSI Z136.1; Laser inventory with classification; Laser-specific SOPs per ANSI Z136.8; Nominal Hazard Zone calculations; Training records for Class 3B/4; Medical surveillance (eye exams)',
  soc_controls = 'SOC-CLASSIFICATION: All lasers classified per ANSI/FDA; SOC-ACCESS: Entryway controls for Class 3B/4; SOC-RETENTION: Training records for employment duration; SOC-AUDIT: Annual inspections per ANSI Z136.1; SOC-INCIDENT: Injury investigation documentation'
WHERE name = 'Laser Safety Officer';

-- B3. GOOD LABORATORY PRACTICES & DATA INTEGRITY (4)

UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR Part 58 (FDA GLP); 40 CFR Part 160 (EPA FIFRA GLP); 40 CFR Part 792 (EPA TSCA GLP); OECD Principles of GLP; OECD Consensus Documents No. 1-19; ICH S7A/S7B',
  standards_of_creation = 'Study plan per 21 CFR 58.120; Study plan amendments per 21 CFR 58.120(b); Raw data records per 21 CFR 58.130; Final report per 21 CFR 58.185; Test/control article characterization per 21 CFR 58.105',
  soc_controls = 'SOC-INTEGRITY: Single Study Director per 21 CFR 58.33; SOC-QA: QA inspections per 21 CFR 58.35; SOC-RETENTION: Per 21 CFR 58.195; SOC-ARCHIVE: Secure limited-access per 21 CFR 58.190; SOC-AUDIT: FDA inspection per 21 CFR 58.15'
WHERE name = 'GLP Study Director';

UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR 58.35 (QAU requirements); 40 CFR 160.35 / 792.35 (EPA QAU); OECD Consensus Document No. 4 (QA and GLP); OECD Advisory Document No. 10 (Computerised Systems)',
  standards_of_creation = 'QA master schedule; Study phase inspection reports; Process-based audit reports; QA statement per 21 CFR 58.35(b)(7); Management notification per 21 CFR 58.35(b)(4); Corrective action tracking',
  soc_controls = 'SOC-INDEPENDENCE: QA separate from study conduct per 21 CFR 58.35(a); SOC-INTEGRITY: Findings reported to management and Study Director; SOC-RETENTION: Same as study records per 21 CFR 58.195; SOC-ACCESS: Available to FDA per 21 CFR 58.35(c)'
WHERE name LIKE '%GLP Quality Assurance%';

UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR Part 11 (Electronic Records/Signatures); FDA Guidance on Electronic Records in Clinical Investigations; EU Annex 11; GAMP 5 2nd Edition; ISO/IEC 17025:2017 Section 7.11; ALCOA+ Principles',
  standards_of_creation = 'Computer system validation (URS, FS, DS, IQ/OQ/PQ); System configuration and change control; User account management; Audit trail review per 21 CFR 11.10(e); Backup and disaster recovery; E-signature management per 21 CFR 11.50',
  soc_controls = 'SOC-INTEGRITY: Audit trail for all data operations per 21 CFR 11.10(e); SOC-ACCESS: Role-based with unique IDs per 21 CFR 11.10(d); SOC-VALIDATION: System validated per 21 CFR 11.10(a); SOC-RETENTION: Electronic records readable throughout retention'
WHERE name LIKE '%LIMS Administrator%';

UPDATE citizen_catalog SET
  governing_guidelines = 'FDA Data Integrity and Compliance with Drug CGMP Guidance (2018); MHRA GxP Data Integrity Guidance (2018); WHO TRS 996 Annex 5; PIC/S PI 041-1; ALCOA+ Principles; ICH E6(R2) Section 5.5',
  standards_of_creation = 'Data integrity risk assessment; Data governance policy and procedures; Data lifecycle mapping; Data integrity investigation reports; Remediation plans and effectiveness verification; Metrics and trending reports',
  soc_controls = 'SOC-INTEGRITY: ALCOA+ compliance verification; SOC-TRACEABILITY: Complete audit trail from raw data to reported results; SOC-ACCESS: Controls preventing unauthorized modification; SOC-REVIEW: Routine data integrity audits; SOC-RETENTION: Original data in durable format'
WHERE name = 'Data Integrity Officer';

-- B4. ENVIRONMENTAL & CLEANROOM CONTROLS (3)

UPDATE citizen_catalog SET
  governing_guidelines = 'EPA RCRA 40 CFR Part 262-268; 40 CFR Part 112 (SPCC); 40 CFR Part 122 (NPDES); EPA Method 8000 series; ISO 14001:2015; State environmental regulations',
  standards_of_creation = 'Environmental monitoring plans; Monitoring data with instrument calibration; Hazardous waste manifests (EPA Form 8700-22) per 40 CFR 262.20; LDR notifications per 40 CFR 268.7; Biennial Report per 40 CFR 262.41; SPCC plans per 40 CFR 112.3',
  soc_controls = 'SOC-RETENTION: Manifests 3 years per 40 CFR 262.40; SOC-REPORTING: Exception reporting per 40 CFR 262.42; SOC-INTEGRITY: Chain of custody for samples; SOC-AUDIT: EPA/state inspections, ISO 14001 surveillance; SOC-TRAINING: RCRA per 40 CFR 262.17(a)(7)'
WHERE name = 'Environmental Monitoring Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'ISO 14644-1:2015; ISO 14644-2:2015; ISO 14644-3:2019; ISO 14644-4:2022; IEST-RP-CC006; IEST-RP-CC034; FDA Aseptic Processing Guidance (2004); USP <797> and <800>',
  standards_of_creation = 'Cleanroom classification test reports per ISO 14644-1 Annex A; HEPA/ULPA filter integrity tests per IEST-RP-CC034; Air velocity and uniformity records; Pressurization records; Environmental monitoring trending; Requalification per ISO 14644-2',
  soc_controls = 'SOC-CLASSIFICATION: Testing at commissioning and requalification per ISO 14644-2; SOC-MONITORING: Per monitoring plan; SOC-RETENTION: Life of cleanroom or GMP requirements; SOC-INTEGRITY: Particle counter calibration per ISO 21501-4'
WHERE name = 'Cleanroom Certification';

UPDATE citizen_catalog SET
  governing_guidelines = 'ICH Q2(R2); USP <1225>; ISO/IEC 17025:2017 Section 7.2; FDA Guidance: Analytical Procedures and Methods Validation (2015); AOAC Single Lab Validation Guidelines; Eurachem Fitness for Purpose Guide (2014)',
  standards_of_creation = 'Validation protocol with predefined acceptance criteria; Validation report (specificity, linearity, range, accuracy, precision, LOD/LOQ, robustness); System suitability tests; Method transfer protocol/report; Stability-indicating method documentation',
  soc_controls = 'SOC-INTEGRITY: Predefined acceptance criteria before execution; SOC-TRACEABILITY: Reference standards traceable to pharmacopeial materials; SOC-RETENTION: Life of method plus regulatory period; SOC-REVALIDATION: Triggered by modification or OOS trending'
WHERE name = 'Method Validation Scientist';

-- B5. SPECIALIZED LABORATORY OPERATIONS (3)

UPDATE citizen_catalog SET
  governing_guidelines = '49 CFR Part 40 (DOT Workplace Drug Testing); SAMHSA Mandatory Guidelines; EPA SW-846 Chapter 1; FBI QA Standards for Forensic DNA; ISO/IEC 17025:2017 Section 7.4; SWGDAM Standards',
  standards_of_creation = 'Chain of custody forms with date/time, custodian, transfer reason, condition; Sample receipt and login; Storage condition monitoring; Sample disposition records; Subsampling documentation; Discrepancy investigation records',
  soc_controls = 'SOC-CONTINUITY: Unbroken documented custody from collection to disposal; SOC-INTEGRITY: Tamper-evident seals documented at each transfer; SOC-ACCESS: Restricted storage with access logs; SOC-RETENTION: Per analytical purpose (forensic: indefinite; environmental: per permit; clinical: 2 years per CLIA)'
WHERE name = 'Chain of Custody Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'USP <1058> (Analytical Instrument Qualification); FDA Process Validation Guidance (2011); GAMP 5; ISO/IEC 17025:2017 Section 6.4; ISPE Baseline Guide; 21 CFR 211.68',
  standards_of_creation = 'User Requirements Specification; Design Qualification; Installation Qualification (IQ); Operational Qualification (OQ); Performance Qualification (PQ); Periodic re-qualification; Change control records',
  soc_controls = 'SOC-QUALIFICATION: Complete IQ/OQ/PQ before regulated service; SOC-INTEGRITY: Pre-approved protocols with acceptance criteria; SOC-RETENTION: Equipment lifetime plus regulatory period; SOC-CHANGE CONTROL: Modification triggers re-qualification'
WHERE name = 'Equipment Validation Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = 'ISO 17034:2016; ISO Guide 33; ISO Guide 35; USP Reference Standards Program; NIST Standard Reference Materials; ISO/IEC 17025:2017 Section 6.4.6',
  standards_of_creation = 'Reference standard receipt and verification; Certificate of Analysis documentation; Storage condition monitoring; Expiration/retest date tracking; Traceability chain (primary to working); In-house working standard preparation records',
  soc_controls = 'SOC-TRACEABILITY: Documented chain from working standard to CRM to SI; SOC-INTEGRITY: Stored per CoA conditions; SOC-RETENTION: Standard lifetime plus one cycle; SOC-INVENTORY: Status tracking (active, expired, quarantined); SOC-AUDIT: ISO 17025/GMP scope'
WHERE name = 'Reference Standards Custodian';

-- C1. COLLECTIONS MANAGEMENT (5)

UPDATE citizen_catalog SET
  governing_guidelines = 'AAM Standards Regarding Collections Stewardship; AAM Code of Ethics for Museums; ARCS Standard Facility Report 3rd Edition; Museum Registration Methods (MRM6); UCC Article 9; State unclaimed property laws',
  standards_of_creation = 'Accession records (deed of gift, board resolution, accession number); Deaccession records; Loan agreements per AAM/ARCS standard forms; Condition reports; Object location tracking; Insurance valuation; Temporary custody receipts',
  soc_controls = 'SOC-INTEGRITY: Accession/deaccession approval chain; SOC-ACCESS: Collections management system role-based access; SOC-RETENTION: Accession/deaccession records permanent; SOC-AUDIT: Annual inventory; SOC-INSURANCE: Valuations updated every 3-5 years'
WHERE name LIKE '%Registrar%';

UPDATE citizen_catalog SET
  governing_guidelines = 'AAM Standards on Unlawful Appropriation (Nazi Era); AAMD Object Registry Guidelines; Washington Conference Principles (1998); Terezin Declaration (2009); National Stolen Property Act (18 U.S.C. 2314-2315); CPIA (19 U.S.C. 2601-2613)',
  standards_of_creation = 'Provenance documentation per AAM format (1933-1945 gap analysis); AAMD Object Registry entries; Due diligence files (Art Loss Register, INTERPOL, FBI NSAF); Country of origin/export review; Gap analysis reports; Claims resolution',
  soc_controls = 'SOC-INTEGRITY: Documented research methodology and sources; SOC-TRANSPARENCY: Nazi-era provenance publicly accessible; SOC-RETENTION: Provenance research files permanent; SOC-DUE DILIGENCE: Pre-acquisition review; SOC-AUDIT: Periodic collection review for undocumented gaps'
WHERE name = 'Provenance Researcher';

UPDATE citizen_catalog SET
  governing_guidelines = 'NAGPRA (25 U.S.C. 3001-3013); 43 CFR Part 10; 2024 Updated NAGPRA Regulations; Archaeological Resources Protection Act (16 U.S.C. 470aa-mm); Antiquities Act (54 U.S.C. 320301-320303)',
  standards_of_creation = 'NAGPRA inventory summaries per 43 CFR 10.9; Summaries per 43 CFR 10.8; Consultation documentation with tribes; Cultural affiliation determinations; Federal Register Notices of Inventory Completion; Repatriation records',
  soc_controls = 'SOC-CONSULTATION: Meaningful consultation per 43 CFR 10.5; SOC-TIMELINE: Inventory completion deadline documentation; SOC-RETENTION: All NAGPRA records permanent; SOC-REPORTING: Annual NPS database updates; SOC-ACCESS: Culturally sensitive restrictions per tribal requests'
WHERE name = 'NAGPRA';

UPDATE citizen_catalog SET
  governing_guidelines = 'CPIA (19 U.S.C. 2601-2613); National Stolen Property Act (18 U.S.C. 2314-2315); ARPA (16 U.S.C. 470aa-mm); Bilateral agreements under CPIA (19 CFR Part 12); EU Regulation 2019/880; UNIDROIT Convention (1995); AAMD Guidelines',
  standards_of_creation = 'CBP Form 3461; Export license documentation; Bilateral agreement compliance analysis; Cultural property declaration per 19 CFR 12.104; ATA Carnet documentation; CITES permits where applicable',
  soc_controls = 'SOC-DOCUMENTATION: Complete export/import chain per CPIA and 19 CFR 12.104; SOC-DUE DILIGENCE: Pre-acquisition country of origin verification; SOC-RETENTION: 5 years per 19 CFR 163.4; SOC-AUDIT: CBP inspection; INTERPOL/FBI checks'
WHERE name = 'Cultural Property Compliance';

UPDATE citizen_catalog SET
  governing_guidelines = 'AAM Standards for Museum Collections Management; AIC Code of Ethics and Guidelines; NPS Museum Handbook Parts I-III; SPNHC Guidelines; RE-ORG Method (ICCROM); ASHRAE Chapter 24',
  standards_of_creation = 'Collection management policy; Integrated pest management plan and monitoring records; Environmental monitoring records (temp, RH, light, pollutants); Disaster preparedness plan; Storage survey records; Handling/movement procedures',
  soc_controls = 'SOC-ENVIRONMENT: Temperature, RH, light monitoring per ASHRAE targets; SOC-IPM: Pest monitoring and treatment documentation; SOC-DISASTER: Plan tested annually; SOC-RETENTION: Policy reviews every 5 years; SOC-AUDIT: AAM accreditation review'
WHERE name = 'Collections Manager';

-- C2. CONSERVATION & PRESERVATION (3)

UPDATE citizen_catalog SET
  governing_guidelines = 'AIC Code of Ethics (1994); AIC Guidelines for Practice; AIC Commentaries; ECCO Professional Guidelines; Venice Charter (1964); Burra Charter (ICOMOS)',
  standards_of_creation = 'Treatment proposal (condition assessment, proposed treatment, materials, justification); Treatment report (before/during/after photography, materials, techniques, reversibility); Examination/analysis records (XRF, FTIR); Client/curator approval',
  soc_controls = 'SOC-INTEGRITY: Treatment documentation contemporaneous per AIC Guidelines; SOC-REVERSIBILITY: Assessment documented per AIC ethical standards; SOC-RETENTION: Treatment records permanent; SOC-PHOTOGRAPHY: Before/during/after standard; SOC-MATERIALS: Product names, manufacturers, lot numbers'
WHERE name = 'Objects Conservator';

UPDATE citizen_catalog SET
  governing_guidelines = 'ISO 14721:2012 (OAIS); ISO 16363:2012 (Trustworthy Digital Repositories); NDSA Levels of Digital Preservation V2.0; PREMIS Data Dictionary; Library of Congress Recommended Formats; FADGI Guidelines; CoreTrustSeal',
  standards_of_creation = 'Digital preservation policy; SIP/AIP/DIP per OAIS; PREMIS preservation metadata; File format characterization (PRONOM/DROID, JHOVE, FITS); Migration/normalization documentation; Fixity checks (MD5, SHA-256, SHA-512); Format obsolescence risk assessments',
  soc_controls = 'SOC-INTEGRITY: Fixity verification on ingest and periodic schedule; SOC-REDUNDANCY: 3 copies, 2 locations per NDSA Level 3+; SOC-RETENTION: Per policy; many permanent; SOC-AUDIT: CoreTrustSeal or ISO 16363; SOC-FORMAT: Migration triggered by obsolescence risk'
WHERE name = 'Digital Preservation Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'ALA Policy on Digital Preservation; ANSI/NISO Z39.48 (Permanence of Paper); ANSI/NISO Z39.77; ISO 11799:2015 (Document Storage); NEDCC Preservation Leaflets; FEMA 386-7',
  standards_of_creation = 'Preservation needs survey; Condition survey records; Reformatting/digitization specifications and QC; Binding and repair treatment documentation; Environmental monitoring plans; Disaster preparedness plan; Deacidification treatment records',
  soc_controls = 'SOC-ENVIRONMENT: Temperature 60-70F, RH 30-50%, light <5 fc storage; SOC-INTEGRITY: Survey methodology documented; SOC-RETENTION: Survey data and treatment records permanent; SOC-DISASTER: Plan reviewed annually; SOC-TRAINING: Emergency response for collections'
WHERE name = 'Preservation Librarian';

-- C3. ARCHIVES & RECORDS MANAGEMENT (5)

UPDATE citizen_catalog SET
  governing_guidelines = 'Federal Records Act (44 U.S.C. Chapters 29, 31, 33); 36 CFR Chapter XII (NARA); OMB/NARA M-23-07; OMB Circular A-130; Presidential Records Act (44 U.S.C. 2201-2209); FISMA',
  standards_of_creation = 'Records schedules (SF-115); File plans and classification schemes; Records inventory; Transfer documentation (SF-258); Destruction documentation (SF-135); Vital records program; Email capture per M-23-07',
  soc_controls = 'SOC-AUTHORITY: NARA-approved schedule before disposition; SOC-INTEGRITY: Records maintaining authenticity; SOC-RETENTION: Per NARA schedule; permanent records transfer to NARA; SOC-AUDIT: NARA RMSA; Inspector General audits; SOC-DESTRUCTION: Documented authorization'
WHERE name LIKE '%Government Archivist%';

UPDATE citizen_catalog SET
  governing_guidelines = 'FOIA (5 U.S.C. 552); FOIA Improvement Act of 2016; Privacy Act (5 U.S.C. 552a); EO 13392; DOJ OIP Guidance; 28 CFR Part 16; State public records laws (e.g., CA Government Code 7920-7931)',
  standards_of_creation = 'FOIA tracking records; Search methodology documentation; Responsive records review; Exemption application (Exemptions 1-9, Foreseeable Harm per 2016 Act); Vaughn Index; Administrative appeal records; Annual FOIA report data',
  soc_controls = 'SOC-TIMELINE: 20 business day response per 5 U.S.C. 552(a)(6)(A); SOC-LOGGING: FOIAonline tracking; SOC-INTEGRITY: Segregability analysis per 5 U.S.C. 552(b); SOC-RETENTION: 6 years after final action; SOC-REPORTING: Annual report to DOJ by March 1'
WHERE name LIKE '%FOIA Officer%';

UPDATE citizen_catalog SET
  governing_guidelines = 'EO 13526 (Classified Information); 32 CFR Part 2001 (ISOO Directive); EO 13526 Section 3.3 (Automatic at 25 years); Section 3.5 (Mandatory Review); CUI Program 32 CFR Part 2002; Kyl-Lott Amendment',
  standards_of_creation = 'Declassification review determination records; Exemption category documentation per EO 13526 Section 3.3(b); Equity identification and referral records; MDR processing records; Redaction documentation; QA review records',
  soc_controls = 'SOC-TIMELINE: 25-year deadline per EO 13526 3.3(a); MDR response within 1 year; SOC-AUTHORITY: Trained authorized reviewers only; SOC-INTEGRITY: Page-level review documentation; SOC-RETENTION: Per NARA classified records schedule; SOC-AUDIT: ISOO annual assessment'
WHERE name = 'Declassification Review';

UPDATE citizen_catalog SET
  governing_guidelines = 'DACS 2nd Edition (SAA); ISAD(G) (ICA); EAD3 schema; EAC-CPF; SAA Code of Ethics; MPLP framework; LCSH; NARA Lifecycle Data Requirements Guide',
  standards_of_creation = 'Finding aids per DACS; EAD-encoded finding aids validated against EAD3; Arrangement documentation; Processing plans; Accession records linked to description; Authority records per EAC-CPF/LCNAF; Restriction documentation',
  soc_controls = 'SOC-STANDARDS: DACS-compliant minimum description; SOC-INTEGRITY: Original order preserved or deviation documented; SOC-ACCESS: Finding aids publicly accessible; SOC-RETENTION: Finding aids permanent; SOC-AUDIT: Periodic description review'
WHERE name = 'Processing Archivist';

UPDATE citizen_catalog SET
  governing_guidelines = 'OHA Principles and Best Practices (2018); OHA Statement on Ethics; SAA Code of Ethics; 45 CFR Part 46 (applicability determination); OHRP oral history guidance (2003); Copyright Act (17 U.S.C. 101 et seq.); State privacy/publicity laws',
  standards_of_creation = 'Informed consent/legal release forms; Interview deed of gift; Pre-interview research; Interview recordings with technical metadata; Transcription and audit-editing; Narrator review and correction; Indexing per DACS/Dublin Core',
  soc_controls = 'SOC-CONSENT: Signed release before researcher access; SOC-PRIVACY: Restricted access for sensitive portions; SOC-RETENTION: Recordings and transcripts permanent; SOC-COPYRIGHT: Ownership clearly documented; SOC-PRESERVATION: Digital preservation per NDSA Levels'
WHERE name = 'Oral History';

-- C4. LIBRARY CATALOGING & METADATA (3)

UPDATE citizen_catalog SET
  governing_guidelines = 'RDA (Resource Description and Access); MARC 21 Format; Dublin Core (ISO 15836); BIBFRAME (LC); IFLA Library Reference Model; NISO Z39.85; LCSH; LCC',
  standards_of_creation = 'Bibliographic records per MARC 21/RDA; Authority records per NACO; Subject analysis per LCSH/SACO; Classification per LCC or DDC; Dublin Core for digital collections; BIBFRAME descriptions; Batch processing documentation',
  soc_controls = 'SOC-STANDARDS: PCC compliance; SOC-INTEGRITY: Authority control maintenance; SOC-ACCESS: Shared via OCLC WorldCat; SOC-RETENTION: Bibliographic records permanent; SOC-AUDIT: Quality review sampling'
WHERE name LIKE '%Catalog Librarian%';

UPDATE citizen_catalog SET
  governing_guidelines = 'ISO 14721:2012 (OAIS); ISO 16363:2012; CoreTrustSeal; NDSA Levels; FAIR Principles; OpenAIRE Guidelines; OSTP Nelson Memo',
  standards_of_creation = 'Repository policies; OAIS-compliant ingest workflow; Metadata schema (Dublin Core, MODS, METS); DOI/Handle persistent identifiers; Embargo management; Usage statistics (COUNTER); Interoperability (OAI-PMH, ResourceSync, SWORD)',
  soc_controls = 'SOC-INTEGRITY: Ingest validation (format, metadata, virus scan); SOC-PERSISTENCE: Persistent identifiers for all deposits; SOC-REDUNDANCY: Backup per NDSA Levels; SOC-RETENTION: Scholarly outputs permanent; SOC-AUDIT: CoreTrustSeal certification'
WHERE name = 'Digital Repository Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'Copyright Act (17 U.S.C. 101 et seq.); Section 107 (Fair Use); Section 108 (Libraries); Section 109 (First Sale); DMCA (17 U.S.C. 512, 1201); Music Modernization Act; ARL Fair Use Code; SAA/ARL Orphan Works Statement',
  standards_of_creation = 'Copyright status determination records; Fair use analysis per 17 U.S.C. 107 four-factor test; Section 108 reproduction request records; Permission/license agreements; Rights metadata per RightsStatements.org; DMCA takedown/counter-notice records',
  soc_controls = 'SOC-ANALYSIS: Documented fair use reasoning per four-factor test; SOC-INTEGRITY: Determination linked to specific work; SOC-RETENTION: Copyright analyses permanent; permissions for license term plus limitations; SOC-NOTICE: DMCA safe harbor compliance'
WHERE name LIKE '%Copyright%';

-- C5. EXHIBITION & INSURANCE (2)

UPDATE citizen_catalog SET
  governing_guidelines = 'AAM Standards for Museum Exhibitions; AAM Facility Report; ICOM Code of Ethics; Immunity from Seizure (22 U.S.C. 2459); Arts and Artifacts Indemnity Act (20 U.S.C. 971-977); ADA (42 U.S.C. 12101); ASHRAE standards',
  standards_of_creation = 'Exhibition agreement/contract documentation; Facility report; Exhibition design and accessibility compliance; Courier authorization and condition reporting; Installation/deinstallation documentation; Government indemnity application; Immunity from seizure application',
  soc_controls = 'SOC-ENVIRONMENT: Exhibition space monitoring per lender requirements; SOC-SECURITY: AAM Facility Report assessment; SOC-INSURANCE: Certificate or indemnity current; SOC-RETENTION: Exhibition records 10 years minimum; SOC-LEGAL: Immunity Federal Register notice 30+ days before opening'
WHERE name = 'Exhibition Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'Arts and Artifacts Indemnity Act (20 U.S.C. 971-977); 45 CFR Part 1160; AAM Standard Facility Report; Inland Marine Insurance standards; IRS 26 U.S.C. 170 (donated art FMV); USPAP; TRIA (15 U.S.C. 6701)',
  standards_of_creation = 'Insurance valuation documentation; Certificate of insurance records (wall-to-wall); Government indemnity application; Claims documentation; Fine arts policy schedule; Risk assessment (transit, exhibition, storage); Appraisal per USPAP',
  soc_controls = 'SOC-VALUATION: FMV updated every 3-5 years; SOC-COVERAGE: No gap (wall-to-wall standard); SOC-RETENTION: Insurance records per statute of limitations (6-10 years); SOC-CLAIMS: Filed within 60-90 days of discovery; SOC-AUDIT: Annual insurance program review'
WHERE name LIKE '%Fine Art Insurance%';

-- ============================================================
-- SECTION 2: FINANCIAL SERVICES (60 personas)
-- ============================================================

-- GROUP 1: BANKING AND DEPOSITORY (6)

UPDATE citizen_catalog SET
  governing_guidelines = 'BSA (31 USC 5311-5332); USA PATRIOT Act (31 CFR 1010-1026); Regulation E (12 CFR 1005); Regulation CC (12 CFR 229); Regulation DD (12 CFR 1030); EFTA (15 USC 1693); Check 21 Act (12 USC 5001-5018); CRA (12 USC 2901)',
  standards_of_creation = 'FFIEC BSA/AML Examination Manual; FFIEC IT Examination Handbook; ABA Banking Standards; NACHA Operating Rules; Federal Reserve Operating Circulars; ANSI X9.100-187; ISO 20022',
  soc_controls = 'SOC 1 Type II (core banking); SOC 2 Type II (data security); FFIEC Cybersecurity Assessment Tool; GLBA Safeguards Rule (16 CFR 314); NIST Cybersecurity Framework; PCI DSS'
WHERE name = 'Bank Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'BSA (31 USC 5311-5332); USA PATRIOT Act Sections 312, 314, 326; 31 CFR 1010.310-312 (CTR); 31 CFR 1020.320 (SAR); OFAC 31 CFR 500-599; Anti-Money Laundering Act of 2020; Corporate Transparency Act; FinCEN CDD Rule (31 CFR 1010.230)',
  standards_of_creation = 'FFIEC BSA/AML Examination Manual; FinCEN SAR Form 111; FinCEN CTR Form 112; ACAMS Best Practices; Wolfsberg Group AML Principles; FATF 40 Recommendations; FinCEN Beneficial Ownership Reporting',
  soc_controls = 'SOC 2 Type II (transaction monitoring); FinCEN Secure Filing System; OFAC Screening validation; Transaction monitoring model validation; Audit trail per 31 CFR 1010.410'
WHERE name LIKE '%BSA/AML Analyst%';

UPDATE citizen_catalog SET
  governing_guidelines = 'UCC Article 4A; Regulation J (12 CFR 210); CHIPS Operating Rules; SWIFT Network Rules; 31 CFR 1010.410(e)-(f) (Travel Rule); OFAC 50% Rule; Dodd-Frank Section 1073 (Remittances)',
  standards_of_creation = 'Federal Reserve Operating Circular 6; SWIFT MT/MX standards; ISO 20022 payment messaging; NACHA Operating Rules; CHIPS Administrative Procedures; Regulation E Model Disclosures',
  soc_controls = 'SOC 1 Type II (funds transfer); Fedwire access controls; SWIFT Customer Security Programme; Real-time OFAC screening; Dual control and callback verification; SWIFT HMAC authentication'
WHERE name = 'Wire Transfer Operations';

UPDATE citizen_catalog SET
  governing_guidelines = 'EFTA (15 USC 1693); Regulation E (12 CFR 1005); NACHA Operating Rules; UCC Article 4A; Federal Reserve Operating Circular 4; Regulation CC (12 CFR 229); 31 CFR 1010.410',
  standards_of_creation = 'NACHA Operating Rules and Guidelines; NACHA ACH File Format; Federal Reserve ACH Operating Circular; Regulation E Model Forms; NACHA Risk Management Framework; Same Day ACH rules',
  soc_controls = 'SOC 1 Type II (ACH processing); SOC 2 Type II (ACH data security); NACHA Third-Party Sender Registration; ACH file validation; Return and exception audit trails; Micro-deposit verification'
WHERE name LIKE '%ACH%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Check 21 Act (12 USC 5001-5018); Regulation CC (12 CFR 229); UCC Articles 3 and 4; Regulation J (12 CFR 210 Subpart A); Federal Reserve Operating Circular 3',
  standards_of_creation = 'ANSI X9.100-187 (Image Quality); ANSI X9.100-180 (MICR); ANSI X9.37 (Image Exchange); ECCHO Operating Rules; Federal Reserve Check Services; IQA standards; Substitute Check Identification',
  soc_controls = 'SOC 1 Type II (check processing); Image capture quality; Duplicate detection; MICR read rate monitoring; Substitute check warranty tracking; Positive pay fraud detection'
WHERE name LIKE '%Check Processing%';

UPDATE citizen_catalog SET
  governing_guidelines = '18 USC 1344 (Bank Fraud); 18 USC 1014 (Loan Fraud); 31 USC 5324 (Structuring); Identity Theft Act (18 USC 1028); FCRA Section 605B; Regulation E Section 1005.11; Check 21 warranty; ChexSystems',
  standards_of_creation = 'FinCEN SAR Narrative Writing Guidelines; ACFE Fraud Examiners Manual; Early Warning Services/ChexSystems standards; FFIEC Authentication Guidance; Identity Theft Red Flags Rule (12 CFR 1022.82)',
  soc_controls = 'SOC 2 Type II (fraud detection); Transaction monitoring alerts; Case management audit trails; Identity verification controls; Positive pay/payee verification; Real-time fraud scoring governance'
WHERE name = 'Banking Fraud Investigator';

-- GROUP 2: LENDING AND CREDIT (10)

UPDATE citizen_catalog SET
  governing_guidelines = 'TILA (15 USC 1601); RESPA (12 USC 2601); Regulation Z (12 CFR 1026); Regulation X (12 CFR 1024); SAFE Act (12 USC 5101); ECOA/Reg B (12 CFR 1002); HMDA/Reg C (12 CFR 1003); Dodd-Frank ATR/QM; Fair Housing Act (42 USC 3601)',
  standards_of_creation = 'CFPB TRID Rule; Fannie Mae Selling Guide; Freddie Mac Seller/Servicer Guide; FHA HUD 4000.1; VA Pamphlet 26-7; URLA Form 1003; Closing Disclosure; Loan Estimate',
  soc_controls = 'SOC 1 Type II (loan origination); SOC 2 Type II (borrower data); GLBA Safeguards; eSign/UETA compliance; QC sampling per GSE requirements; HMDA data integrity'
WHERE name LIKE '%Mortgage Loan Officer%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Regulation Z (12 CFR 1026) TRID timing; Regulation B (12 CFR 1002); Regulation X (12 CFR 1024); ECOA valuation disclosure; Flood Disaster Protection Act (42 USC 4012a); GLBA; Dodd-Frank ATR/QM',
  standards_of_creation = 'Fannie Mae Selling Guide Chapter B3; Freddie Mac Guide; FHA Manual Underwriting; IRS Form 4506-C; VOE/VOD standards; AUS documentation (DU/LP); Appraisal Independence Requirements',
  soc_controls = 'SOC 1 Type II (document management); SOC 2 Type II (PII); Document completeness checklists; Stacking order verification; Third-party verification controls; Pre-closing audit'
WHERE name = 'Mortgage Loan Processor';

UPDATE citizen_catalog SET
  governing_guidelines = 'Dodd-Frank ATR/QM Rule (Reg Z 12 CFR 1026.43); ECOA/Regulation B; Fair Housing Act; HMDA; Interagency Appraisal Guidelines (OCC 2010-42); FHA Direct Endorsement; VA Automatic authority',
  standards_of_creation = 'Fannie Mae Selling Guide (all B-chapters); Freddie Mac Guide; FHA 4000.1 (TOTAL Scorecard); VA Chapter 4; USDA GRH Guidelines; DU/LP findings; USPAP compliance verification',
  soc_controls = 'SOC 1 Type II (AUS); Loan-level QC and pre-funding QC; AUS override documentation; Compensating factor standards; Fraud detection (LoanSafe, FraudGuard); Decision audit trails'
WHERE name = 'Mortgage Underwriter';

UPDATE citizen_catalog SET
  governing_guidelines = 'RESPA Servicing Rules (Reg X 12 CFR 1024.30-.41); TILA Servicing (Reg Z 12 CFR 1026.36, .41); FDCPA (15 USC 1692); SCRA (50 USC 3901); National Mortgage Settlement; CFPB Loss Mitigation Rules; State foreclosure statutes; CARES Act',
  standards_of_creation = 'Fannie Mae Servicing Guide; Freddie Mac Guide; FHA Loss Mitigation Options; Ginnie Mae MBS Guide; CFPB Early Intervention and Continuity; Periodic Statement per Reg Z; Escrow Statement per Reg X; Loss Mitigation Application Standards',
  soc_controls = 'SOC 1 Type II (servicing platform); SOC 2 Type II (borrower data); CFPB examination compliance; Escrow reconciliation; Payment application waterfall; Loss mitigation timeline tracking; Default management audit trails'
WHERE name LIKE '%Mortgage Servic%Compliance%';

UPDATE citizen_catalog SET
  governing_guidelines = 'TILA/Regulation Z; ECOA/Regulation B; FCRA/Regulation V (12 CFR 1022); FDCPA; Military Lending Act (10 USC 987); EFTA/Regulation E; State usury laws; CFPB UDAAP; CAN-SPAM Act',
  standards_of_creation = 'CFPB Model Forms (Reg Z, B, V); Adverse Action Notice per ECOA/FCRA; Risk-Based Pricing Notices; Prescreened solicitation disclosures; Annual credit report disclosures; Credit card agreement filings; Fee disclosures',
  soc_controls = 'SOC 1 Type II (lending platform); SOC 2 Type II (consumer data); Fair lending monitoring; Adverse action accuracy; Rate/fee calculation validation; Disclosure timing controls; Complaint management'
WHERE name = 'Consumer Lending Compliance';

UPDATE citizen_catalog SET
  governing_guidelines = 'TILA/Regulation Z; Consumer Leasing Act/Regulation M (12 CFR 1013); ECOA/Reg B; FCRA/Reg V; FDCPA; FTC Used Car Rule (16 CFR 455); FTC Holder Rule (16 CFR 433); State UCC Article 9; Military Lending Act',
  standards_of_creation = 'FTC Buyers Guide standards; State RISC forms; Lease disclosure per Reg M; GAP waiver disclosures; NADA/AFSA dealer agreement standards; Electronic lien and title (ELT); Yo-yo financing spot delivery notices',
  soc_controls = 'SOC 1 Type II (dealer management integration); SOC 2 Type II (consumer data); Dealer reserve/markup monitoring; Fair lending statistical analysis; Contract funding verification; Title perfection tracking; Repossession compliance'
WHERE name = 'Auto Finance Compliance';

UPDATE citizen_catalog SET
  governing_guidelines = 'FIRREA Title XI (12 USC 3331-3351); Interagency Appraisal Guidelines (OCC 2010-42); Dodd-Frank Section 1471-1472 (Appraiser Independence); ECOA appraisal disclosure; State appraiser licensing; PAVE Task Force',
  standards_of_creation = 'USPAP; Fannie Mae Selling Guide Part B4; Freddie Mac Appraisal Requirements; FHA Protocol (HUD 4000.1 Chapter II.D); VA Pamphlet 26-7 Chapter 10; UAD coding; URAR Form 1004; Hybrid/Desktop Appraisal Standards',
  soc_controls = 'Appraiser Independence Requirements (AIR); AMC quality control; Collateral Underwriter (CU) risk scoring; ROV process; Geographic competency verification; ASC National Registry license verification; UCDP/EAD submission'
WHERE name = 'Real Estate Appraiser';

UPDATE citizen_catalog SET
  governing_guidelines = 'State title insurance statutes; RESPA Section 8 (anti-kickback); TRID closing requirements; State recording statutes; State UCC Article 9; State real property statutes; CFPB Regulation X; Dodd-Frank Section 1450',
  standards_of_creation = 'ALTA Best Practices (7 Pillars); ALTA Policy Forms and Endorsements; ALTA Settlement Statements; ALTA/NSPS Land Title Survey Standards; State closing document requirements; CD preparation standards; Chain of title examination; MERS standards',
  soc_controls = 'SOC 1 Type II (escrow accounting); SOC 2 Type II (NPI protection); ALTA Best Practices certification; Escrow trust account reconciliation; Wire fraud prevention (callback); Closing protection letters; Title plant accuracy'
WHERE name LIKE '%Title Officer%';

UPDATE citizen_catalog SET
  governing_guidelines = 'RESPA Section 4 and 8; Regulation X (12 CFR 1024); TRID Rule/Regulation Z; State escrow licensing; State trust fund handling; FinCEN Real Estate GTO; Corporate Transparency Act; FinCEN AML Rule for Real Estate (31 CFR 1031)',
  standards_of_creation = 'ALTA Best Practices; Closing Disclosure form; HUD-1/HUD-1A (reverse mortgages); State escrow instructions; Proration calculations; Good funds law compliance; IRS Form 1099-S; FIRPTA Form 8288',
  soc_controls = 'SOC 1 Type II (escrow accounting); SOC 2 Type II (wire transfer/NPI); Three-way reconciliation; Segregated trust accounts; Fidelity/surety bonds; Wire fraud prevention; Positive pay/dual authorization; Annual escrow analysis'
WHERE name = 'Escrow Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'HEA Title IV; TILA/Regulation Z (private loans); FCRA/Reg V; FDCPA; SCRA (50 USC 3901); CFPB Larger Participant Rule; State servicer licensing; HEROES/FUTURE Act; IDR regulations (34 CFR 685)',
  standards_of_creation = 'ED Servicer Performance Standards; FSA Servicing Systems Technical Reference; NSLDS reporting; IDR application processing; PSLF certification; Borrower Defense documentation; TPD discharge documentation; Private loan model disclosures',
  soc_controls = 'SOC 1 Type II (servicing platform per ED); SOC 2 Type II (borrower PII); ED annual compliance audit; Payment processing controls; Forbearance/deferment tracking; Credit reporting accuracy; Complaint management; Transfer data integrity'
WHERE name = 'Student Loan Servic';

-- GROUP 3: DEBT COLLECTION AND CREDIT REPORTING (2)

UPDATE citizen_catalog SET
  governing_guidelines = 'FDCPA (15 USC 1692); CFPB Reg F (12 CFR 1006); TCPA (47 USC 227); FCRA Section 623; SCRA (50 USC 3901); State debt collection licensing; State statutes of limitations; State mini-FDCPA; FTC Holder Rule (16 CFR 433)',
  standards_of_creation = 'Reg F Validation Notice; Reg F Limited-Content Message; Itemization per Reg F; Time-barred debt disclosures; Cease communication procedures; Dispute/verification procedures; ACA International standards; DBA International Best Practices',
  soc_controls = 'SOC 2 Type II (debtor data); Call recording monitoring; Contact frequency controls; SOL tracking; Dispute/cease-communication flagging; Letter template version control; Skip tracing validation; TCPA consent management'
WHERE name = 'Debt Collection Compliance';

UPDATE citizen_catalog SET
  governing_guidelines = 'FCRA (15 USC 1681); Regulation V (12 CFR 1022); FACTA; FCRA Sections 611, 623, 605; State credit reporting statutes (CA CCRAA, NY); CFPB Supervisory Authority; FICO/VantageScore governance',
  standards_of_creation = 'Metro 2 Format (CDIA); CDIA reporting guidelines; e-OSCAR automated dispute standards; Automated Universal Dataform; FCRA Section 609 consumer disclosure; Specialty reporting standards; ChexSystems/EWS; Adverse action per ECOA+FCRA',
  soc_controls = 'SOC 2 Type II (consumer data at CRAs); SOC 1 Type II (data processing accuracy); Metro 2 validation; Dispute resolution timeline tracking; Reinvestigation audit trails; Permissible purpose verification; Accuracy monitoring'
WHERE name = 'Credit Reporting Compliance';

-- GROUP 4: SECURITIES AND INVESTMENT (5)

UPDATE citizen_catalog SET
  governing_guidelines = 'Investment Advisers Act of 1940 (15 USC 80b); SEC Rule 206(4)-7 (Compliance); SEC Rule 204-2 (Books/Records); SEC Marketing Rule 206(4)-1; SEC Reg S-P (17 CFR 248); SEC Custody Rule 206(4)-2; SEC Pay-to-Play 206(4)-5; Dodd-Frank Title IV; Reg BI',
  standards_of_creation = 'SEC Form ADV Parts 1, 2A, 2B, CRS; Investment Policy Statement per GIPS (CFA Institute); Client agreement standards; Trade allocation policies; Proxy voting/Form N-PX; Code of Ethics; Marketing compliance per new Marketing Rule; BCP',
  soc_controls = 'SOC 1 Type II (custodian); SOC 2 Type II (adviser platforms); Annual compliance review per Rule 206(4)-7; Surprise custody exam per Rule 206(4)-2; Best execution review; Personal trading monitoring; Performance advertising verification; Cybersecurity program'
WHERE name LIKE '%Registered Investment Adviser%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Securities Exchange Act of 1934 (15 USC 78a); SEC Rules 17a-3, 17a-4; FINRA Rules 3110, 3120 (Supervision); FINRA Rule 2111/Reg BI; FINRA Rule 4511; FINRA Rule 4370 (BCP); FINRA Rule 2210; Reg SHO; Reg NMS; SAR obligations (31 CFR 1023.320)',
  standards_of_creation = 'FINRA U4/U5 forms; SEC Form BD; New Account Form; Trade Confirmations per SEC Rule 10b-10; Account Statements per FINRA 2231; Margin per Reg T; OCC Options Agreement; TRACE reporting; CAT reporting',
  soc_controls = 'SOC 1 Type II (clearing); SOC 2 Type II (trading platform); FINRA Annual Compliance Meeting per Rule 3110(a)(7); Supervisory correspondence review; Branch inspection program; Trade surveillance; WSP maintenance; WORM retention per SEC 17a-4'
WHERE name LIKE '%FINRA Compliance Officer%';

UPDATE citizen_catalog SET
  governing_guidelines = 'SEC Rule 15c3-3 (Customer Protection); SEC Rule 15c6-1 (T+1 Settlement); SEC Rule 17a-13 (Quarterly Securities Exam); FINRA Rule 4210 (Margin); Reg T; DTCC Rules; SEC Rule 204 (Reg SHO close-out)',
  standards_of_creation = 'DTCC settlement processing; SWIFT/ISO 15022 and 20022; FIX Protocol; CUSIP/ISIN identification; Corporate action processing; Dividend/interest payment standards; Proxy distribution; DTC DWAC',
  soc_controls = 'SOC 1 Type II (clearing/settlement); SOC 2 Type II (operations); Daily box count/securities reconciliation; Margin maintenance monitoring; Fail-to-deliver tracking; Customer reserve (15c3-3); Net capital (15c3-1); DTC position reconciliation'
WHERE name LIKE '%Securities Operations%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Investment Company Act of 1940 (15 USC 80a); Securities Act of 1933; SEC Rule 38a-1 (Fund Compliance); SEC Form N-PORT, N-CEN; SEC Liquidity Rule 22e-4; SEC Derivatives Rule 18f-4; SEC Names Rule 35d-1; Dodd-Frank Title IV; CFTC Reg 4.7; Reg S-X',
  standards_of_creation = 'SEC Forms N-1A, N-2, S-1; Prospectus and SAI; Annual/Semi-annual Reports; Form N-PORT; NAV methodology; Board materials and minutes; PPM standards; Subscription/Side Letter; Schedule of Investments',
  soc_controls = 'SOC 1 Type II (fund accounting, transfer agency, custodian); SOC 2 Type II (fund admin technology); NAV oversight; Fair valuation procedures; Compliance testing per Rule 38a-1; Board reporting; Side-by-side management controls; Liquidity monitoring'
WHERE name = 'Investment Fund Compliance';

UPDATE citizen_catalog SET
  governing_guidelines = 'ERISA (29 USC 1001); IRC Sections 401-420; IRC 408/408A (IRAs); IRC 403(b); IRC 457; DOL Fiduciary Rule (PTE 2020-02); SECURE Act/SECURE 2.0; PBGC; DOL Regulation 2550',
  standards_of_creation = 'IRS Form 5500 Series; Summary Plan Description per ERISA 102; Summary Annual Report; Participant Fee Disclosure (404a-5); Benefit Statement per ERISA 105; QDIA notice; Safe Harbor 401(k) notice; RMD documentation; Plan Document/Adoption Agreement; Form 5300',
  soc_controls = 'SOC 1 Type II (recordkeeper/TPA); SOC 2 Type II (participant data); ADP/ACP/Top-Heavy nondiscrimination testing; Contribution/distribution controls; Loan administration; ERISA fidelity bond; Plan audit (100+ participants); Fiduciary process documentation'
WHERE name LIKE '%Retirement Plan Administrator%';

-- GROUP 5: TAX PROFESSIONALS (5)

UPDATE citizen_catalog SET
  governing_guidelines = 'IRC (26 USC); Treasury Circular 230 (31 CFR 10); IRC 6694 (preparer penalties); IRC 7216 (disclosure); AICPA Code of Professional Conduct; State CPA licensing; SOX Section 404; IRC 6662; IRC 6695',
  standards_of_creation = 'AICPA SSTS; IRS Form standards (1040, 1120, 1065, 1041, 990); IRS MeF specifications; AICPA Tax Section Practice Guides; W-2/1099/K-1 preparation; Tax return workpapers; Tax opinion letters per Circular 230; Engagement letters',
  soc_controls = 'SOC 2 Type II (tax preparation platforms); Circular 230 due diligence; Taxpayer identity verification per IRS Pub 5199; E-file authentication; Tax return review and QC; Workpaper retention per IRC 6107 (3 years); Client data encryption; POA Form 2848 management'
WHERE name LIKE '%Certified Public Accountant%' AND name NOT LIKE '%Deep%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Treasury Circular 230 (31 CFR 10); IRC 6694, 6695 (preparer penalties); IRC 7216 (return information); IRC 7525 (practitioner privilege); IRS e-file Provider regulations; State EA practice regulations; AFSP',
  standards_of_creation = 'IRS Form preparation standards; IRS e-file formatting/validation; Representation Forms 2848, 8821; OIC Form 656; Installment Agreement Form 9465, 433; Innocent Spouse Form 8857; CDP/CAP hearing documentation; Penalty abatement standards',
  soc_controls = 'Circular 230 due diligence; IRS e-Services security; Client file retention and security; PTIN management; CE tracking (72 hours/3 years); Engagement letter and fee disclosure; POA authorization management'
WHERE name LIKE '%Enrolled Agent%' AND name NOT LIKE '%Deep%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Treasury Circular 230 (31 CFR 10); IRC (all relevant sections); Tax Court Rules of Practice and Procedure; State bar rules; IRC 7525 (privilege); IRC 6662A (reportable transactions); IRC 6111, 6112 (tax shelter disclosure/list)',
  standards_of_creation = 'ABA Model Rules (tax practice); Tax Court petition/brief standards; IRS Appeals documentation; Tax opinion letter standards per Circular 230; PLR request standards; Closing Agreement Form 906; Estate/gift Forms 706, 709; FBAR/FATCA (FinCEN 114, Form 8938)',
  soc_controls = 'State bar IOLTA controls; Attorney-client privilege protocols; Conflict screening; Engagement letter/scope documentation; Document retention per bar; Tax opinion file documentation; Circular 230 compliance monitoring'
WHERE name = 'Tax Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = 'State income tax statutes (all 50 states + DC); State sales/use tax statutes; State franchise/gross receipts tax; Wayfair nexus (South Dakota v. Wayfair); Multistate Tax Compact; UDITPA; State withholding requirements; State unclaimed property statutes',
  standards_of_creation = 'State-specific tax return forms; Uniform Sales & Use Tax Certificate (MTC); State withholding certificates; State nexus questionnaires; VDA documentation; Apportionment factor calculations; Combined/consolidated return standards; Property tax appeal documentation',
  soc_controls = 'Multi-state filing compliance tracking; Nexus monitoring; Apportionment factor validation; Tax calendar management; State registration/account management; Exemption certificate management; State audit defense documentation'
WHERE name LIKE '%State Tax Compliance%';

UPDATE citizen_catalog SET
  governing_guidelines = 'IRC (26 USC) all provisions; Internal Revenue Manual (IRM); Treasury Regulations (26 CFR); IRC 7602 (examination summons); IRC 6501 (assessment SOL); IRC 6502 (collection SOL); Taxpayer Bill of Rights per IRC 7803(a)(3); IRC 7521; RRA 98',
  standards_of_creation = 'IRM Part 4 (Examining), Part 5 (Collecting), Part 20 (Penalties); Revenue Agent Report; Information Document Request; Notice of Deficiency; Statutory Notice of Determination; Examination workpapers per IRM 4.10.8; Quality Measurement System',
  soc_controls = 'TIGTA audit oversight; IRS quality review program; Taxpayer Advocate Service oversight; Congressional inquiry tracking; ICS/RACS case management; Form 2848/8821 verification; Assessment/collection system access; SOL tracking systems'
WHERE name LIKE '%IRS Revenue Agent%';

-- GROUP 6: INSURANCE (4)

UPDATE citizen_catalog SET
  governing_guidelines = 'State insurance codes (all jurisdictions); NAIC Model Acts; McCarran-Ferguson Act (15 USC 1011); Unfair Claims Settlement Practices Acts; State rate/form filing requirements; GLBA; NAIC Data Security Model Law (#668); State prompt payment; TRIA; Surplus lines',
  standards_of_creation = 'NAIC Annual Statement Blank (SAP); ACORD Forms; ISO policy forms/endorsements; AAIS policy forms; State-mandated provisions; NAIC Market Conduct standards; SAP codification; SERFF filing; State cancellation/nonrenewal standards',
  soc_controls = 'SOC 1 Type II (claims, policy admin); SOC 2 Type II (policyholder data); NAIC Model Audit Rule; Claims reserving/actuarial controls; Underwriting guideline compliance; Market conduct readiness; Producer licensing controls; SIU controls'
WHERE name LIKE '%Insurance Compliance Officer%Property%Casualty%';

UPDATE citizen_catalog SET
  governing_guidelines = 'State Unfair Claims Settlement Practices Acts; State prompt payment/interest penalty; State total loss threshold; State diminished value; State UM/UIM; State no-fault/PIP; State anti-fraud; State adjuster licensing; Federal Odometer Act (49 USC 32701)',
  standards_of_creation = 'NAIC Unfair Claims Settlement Practices Model; CCC/Mitchell/Audatex vehicle valuation; ICAR/OEM repair procedure standards; State total loss documentation; State salvage title; Medical payment review; Subrogation documentation; Rental reimbursement; BI documentation',
  soc_controls = 'SOC 1 Type II (claims management); Claims file documentation standards; Adjuster licensing verification; SIU referral protocols; Total loss valuation validation; Medical bill review vendor oversight; Litigation management; Subrogation recovery tracking'
WHERE name = 'Auto Insurance Claims';

UPDATE citizen_catalog SET
  governing_guidelines = 'State homeowner insurance statutes; National Flood Insurance Act (42 USC 4001); NFIP (44 CFR 59-80); State FAIR Plan statutes; State hurricane/wind/earthquake pool; Biggert-Waters Act; Homeowner Flood Insurance Affordability Act; State valued policy statutes',
  standards_of_creation = 'ISO Homeowners Policy Forms (HO-1 to HO-8); ISO Dwelling Policy Forms (DP-1 to DP-3); NFIP SFIP; Replacement cost estimation; Proof of loss; Contents inventory; Additional living expense; Xactimate scope of loss; State policy jacket requirements',
  soc_controls = 'SOC 1 Type II (policy admin, claims); Catastrophe response protocols; Independent adjuster oversight; Replacement cost vs ACV controls; Flood zone determination; Rebuilding permit/code upgrade tracking; Contents valuation methodology; Managed repair QC'
WHERE name LIKE '%Homeowner%Renter Insurance%';

UPDATE citizen_catalog SET
  governing_guidelines = 'State life insurance statutes; NAIC Annuity Suitability Model (#275); NAIC Data Security Model (#668); SEC Investment Company Act (variable products); FINRA Rule 2330; State insurable interest; NAIC Illustrations Model (#582); NAIC Unclaimed Benefits Act; DOL Fiduciary Rule; IRC 72, 7702',
  standards_of_creation = 'NAIC Life Policy Standards; NAIC Annuity Disclosure Model; Policy Illustration standards (#582); Replacement forms (NAIC #613); Free look disclosure; Suitability documentation; Beneficiary designation; Settlement options; 1035 Exchange; Variable prospectus delivery',
  soc_controls = 'SOC 1 Type II (policy admin, claims); SOC 2 Type II (policyholder data); Suitability review/supervisory controls; Illustration compliance; Death Master File matching; Unclaimed property compliance; Producer licensing verification; Anti-fraud investigation; Prospectus delivery tracking'
WHERE name LIKE '%Life Insurance%Annuity Compliance%';

-- GROUP 7: REAL ESTATE TRANSACTION (2)

UPDATE citizen_catalog SET
  governing_guidelines = 'State real property statutes; State recording statutes; State foreclosure statutes; State landlord-tenant; RESPA (12 USC 2601); TILA (15 USC 1601); Fair Housing Act (42 USC 3601); State UPL opinions; State mechanics lien; State HOA/condo statutes',
  standards_of_creation = 'State bar real property practice standards; Deed drafting (warranty, quitclaim, special warranty); Mortgage/deed of trust drafting; Title opinion letters; Closing document preparation; State sale contract forms; Foreclosure documentation; HOA governing documents; ASTM E1527',
  soc_controls = 'State bar IOLTA audit; Conflict screening; Client identification/verification; Document execution/notarization; Closing fund disbursement; Title examination liability; Wire fraud prevention; Document retention per bar'
WHERE name = 'Real Estate Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = 'RESPA (12 USC 2601) all sections; TILA (15 USC 1601) residential mortgage provisions; TRID Rule; Regulation Z (12 CFR 1026.19, .37, .38); Regulation X (12 CFR 1024.7, .8, .10); CFPB Official Interpretations; CFPB Small Entity Guide',
  standards_of_creation = 'Loan Estimate (content, timing, tolerances); Closing Disclosure (content, timing, delivery); LE-to-CD comparison and tolerance tracking; Changed Circumstances documentation; Construction loan disclosures; Seller disclosure; TRID timing rules; AfBA disclosure',
  soc_controls = 'Disclosure generation system validation; Tolerance tracking and curing; Timing compliance monitoring; Changed circumstances controls; Fee accuracy verification; Closing cost comparison; CFPB examination readiness; Complaint resolution tracking'
WHERE name LIKE '%RESPA%TILA Disclosure%';

-- GROUP 8: BANKRUPTCY (2)

UPDATE citizen_catalog SET
  governing_guidelines = 'Bankruptcy Code (11 USC 101-1532); Federal Rules of Bankruptcy Procedure; Local Rules; 28 USC 586 (US Trustee); BAPCPA 2005; State exemption statutes; Means Test (11 USC 707(b)); State bar rules; 11 USC 110; IRC 108',
  standards_of_creation = 'Official Bankruptcy Forms (Schedules A/B through J); Statement of Financial Affairs Form 107; Means Test Forms 122A/B/C; Chapter 11 Disclosure Statement/Plan; Proof of Claim Form 410; Reaffirmation Form 240A; Credit counseling certificate; Monthly Operating Reports',
  soc_controls = 'CM/ECF electronic filing controls; Debtor identity verification; Asset disclosure verification; Means test validation; Credit counseling provider monitoring; Trustee oversight/reporting; Plan payment distribution; Discharge tracking'
WHERE name = 'Bankruptcy Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = '11 USC 704 (Ch 7 duties); 11 USC 1106 (Ch 11 duties); 11 USC 1302 (Ch 13 duties); 28 USC 586 (US Trustee supervision); Chapter 7 Handbook; Chapter 13 Handbook; 11 USC 547, 548, 544 (avoidance powers)',
  standards_of_creation = 'Chapter 7 Trustee Final Report; Chapter 13 Plan confirmation; Asset investigation/valuation; Abandonment notices per 11 USC 554; Distribution reports; No-asset reports; 341 Meeting documentation; Trustee accounting; Preference/fraudulent transfer demands; Fee applications per 11 USC 330',
  soc_controls = 'US Trustee annual audit/review; Trust account controls; Bond/insurance requirements; Asset liquidation documentation; Claims objection/distribution; Accounting system controls; 341 recording/documentation; Fee court review'
WHERE name = 'Bankruptcy Trustee';

-- GROUP 9: SECURITIES ENFORCEMENT (3)

UPDATE citizen_catalog SET
  governing_guidelines = 'Securities Act of 1933; Securities Exchange Act of 1934; Investment Advisers Act of 1940; Investment Company Act of 1940; Dodd-Frank; SEC Rules of Practice (17 CFR 201); Reg S-P; Reg S-ID; Reg BI; Reg Crowdfunding; Reg D',
  standards_of_creation = 'SEC Examination Priorities; SEC Risk Alerts; SEC Order Instituting Proceedings; SEC Complaint; Wells Notice/Response; Cease-and-Desist; Exam Request Letters; Deficiency Letters; No-Action Letters; Whistleblower program per Dodd-Frank 21F',
  soc_controls = 'SEC EDGAR filing controls; MIDAS (Market Information Data Analytics); National Exam Analytics Tool; Consolidated Audit Trail oversight; XBRL validation; SEC Tips/Complaints/Referrals system; Examination scheduling; Inter-agency coordination'
WHERE name LIKE '%SEC Examiner%';

UPDATE citizen_catalog SET
  governing_guidelines = 'BSA (31 USC 5311-5332); Anti-Money Laundering Act of 2020; Corporate Transparency Act; 31 CFR Chapter X; FinCEN Advisories; USA PATRIOT Act Sections 311-314, 326; OFAC sanctions; FATF Mutual Evaluation',
  standards_of_creation = 'FinCEN BSA E-Filing standards; SAR filing quality; CTR accuracy; Beneficial Ownership Information Report; 314(a) information sharing; 314(b) voluntary sharing; Geographic Targeting Order compliance; FinCEN regulatory guidance',
  soc_controls = 'FinCEN BSA E-Filing security; FinCEN Query access controls; Inter-agency information sharing; SAR confidentiality per 31 USC 5318(g)(2); BSA database audit trails; Examination report quality; Law enforcement coordination'
WHERE name = 'FinCEN Compliance';

UPDATE citizen_catalog SET
  governing_guidelines = 'IEEPA (50 USC 1701); TWEA; OFAC Sanctions Regulations (31 CFR 500-599); SDN List; SSI List; 50% Rule; OFAC Framework for Compliance Commitments (2019); OFAC Enforcement Guidelines; Executive Orders authorizing sanctions',
  standards_of_creation = 'OFAC Sanctions Compliance Program documentation; Screening methodology; License Application standards; Blocked Property Reporting (Form TDF 90-22.50); Rejected Transaction Reporting; VSD standards; Risk Assessment per OFAC Framework; Screening vendor validation; Interdiction review standards',
  soc_controls = 'SOC 2 Type II (screening systems); Real-time and batch screening; SDN/SSI list update frequency; Fuzzy matching governance; Escalation/investigation procedures; Blocked/rejected transaction handling; 5-year retention per OFAC; Coverage gap analysis'
WHERE name = 'OFAC Compliance';

-- GROUP 10: UNCLAIMED PROPERTY AND TREASURY (2)

UPDATE citizen_catalog SET
  governing_guidelines = 'RUUPA 2016; State unclaimed property statutes (all 50 + DC); State dormancy periods; Delaware VDA program; Texas v. New Jersey / Delaware v. New York priority rules; ERISA unclaimed benefits; SEC abandoned property rules',
  standards_of_creation = 'NAUPA Holder Reporting Standard File Format; State electronic filing standards; Due diligence letter requirements; Negative report filing; Aggregate reporting thresholds; Property type classification; VDA documentation; Holder audit response; Claim documentation',
  soc_controls = 'SOC 1 Type II (escheatment processing); Dormancy tracking; Due diligence mailing documentation; Remittance reconciliation; Multi-state compliance tracking; Record retention (10+ years); Audit defense; Owner outreach controls'
WHERE name = 'Unclaimed Property';

UPDATE citizen_catalog SET
  governing_guidelines = '31 CFR Part 356 (auction rules); 31 CFR Part 363 (TreasuryDirect); 31 CFR Part 353 (Series EE/I); 31 CFR Part 357 (book-entry); Government Securities Act (15 USC 78o-5); TRACE reporting (FINRA); IRC 454 (bond tax deferral)',
  standards_of_creation = 'TreasuryDirect account documentation; Savings bond registration; Auction bidding documentation; Fedwire Securities transfer documentation; Form PD F 5336; Savings bond reissue/redemption; Estate claims; 1099-INT tax reporting',
  soc_controls = 'TreasuryDirect authentication; Fedwire Securities Service controls; Primary dealer reporting; Auction participation controls; Book-entry ownership verification; Estate claim verification; CUSIP/ISIN reconciliation; Tax reporting accuracy'
WHERE name = 'Treasury Securities';

-- GROUP 11: CRYPTOCURRENCY (2)

UPDATE citizen_catalog SET
  governing_guidelines = 'FinCEN MSB regulations (31 CFR 1010, 1022); FinCEN FIN-2019-G001; Infrastructure Investment and Jobs Act; State money transmitter licensing; NY BitLicense (23 NYCRR 200); SEC Framework for Investment Contract; CFTC jurisdiction; IRS Notice 2014-21; IRS Rev. Rul. 2019-24; OFAC; Travel Rule; MiCA',
  standards_of_creation = 'FinCEN MSB Registration Form 107; SAR/CTR for crypto; State MTL applications; Blockchain analytics documentation; Wallet attribution methodology; Crypto KYC/CDD; OFAC crypto address screening; Proof of Reserves; Smart contract audit; Tax basis tracking (FIFO/LIFO/HIFO)',
  soc_controls = 'SOC 2 Type II (exchange/custodian); Blockchain analytics validation (Chainalysis, Elliptic); Hot/cold wallet security; Multi-signature authorization; Transaction monitoring; OFAC blockchain screening; Private key management; Smart contract security audit; Proof of Reserves attestation'
WHERE name = 'Cryptocurrency Compliance';

UPDATE citizen_catalog SET
  governing_guidelines = '18 USC 1956-1957 (Money Laundering); 18 USC 1343 (Wire Fraud); 18 USC 1960 (Unlicensed MSB); BSA/AML (crypto); Federal Rules of Evidence; Daubert Standard; Computer Fraud and Abuse Act (18 USC 1030); State computer crime; OFAC crypto addresses',
  standards_of_creation = 'Blockchain transaction tracing methodology; Wallet attribution standards; Exchange subpoena documentation; Transaction flow visualization; Mixing/tumbling identification; Cross-chain tracing; DeFi protocol analysis; NFT provenance; Expert witness reports; Digital evidence chain of custody',
  soc_controls = 'Blockchain analytics tool validation; Evidence preservation and chain of custody; Forensic workstation integrity; Cross-reference validation (on-chain vs off-chain); Attribution confidence scoring; Tool output reproducibility; Methodology peer review; Digital evidence encryption'
WHERE name = 'Blockchain Forensic';

-- GROUP 12: CONSUMER FINANCIAL PROTECTION (2)

UPDATE citizen_catalog SET
  governing_guidelines = 'Dodd-Frank Title X; CFPB Supervisory Authority (banks >$10B); ECOA/Reg B; TILA/Reg Z; RESPA/Reg X; FCRA/Reg V; EFTA/Reg E; FDCPA/Reg F; HMDA/Reg C; UDAAP (12 USC 5531, 5536); Payday/Small Dollar Lending Rule',
  standards_of_creation = 'CFPB Supervision and Examination Manual; Examination Procedures; MRA standards; Consent Order standards; Civil Investigative Demand; Supervisory Letters; HMDA data quality; Fair lending regression/matched-pair; Complaint narrative analysis',
  soc_controls = 'CFPB Complaint Database; HMDA data quality controls; Fair lending statistical model governance; Examination scheduling; Inter-agency coordination; Enforcement action tracking; Institution risk assessment; Consumer complaint resolution monitoring'
WHERE name = 'CFPB Examiner';

UPDATE citizen_catalog SET
  governing_guidelines = 'Housing and Urban Development Act (12 USC 1701x); HUD Housing Counseling (24 CFR 214); Dodd-Frank Section 1014; CFPB Financial Coaching guidance; State credit counseling licensing; FTC CROA (15 USC 1679); 11 USC 109(h) pre-bankruptcy; 11 USC 111',
  standards_of_creation = 'HUD Handbook 7610.1; HUD Form 9902; NFCC Standards; DMP documentation; Pre-purchase counseling certificate; HECM counseling certificate; Housing Action Plan; Financial capability assessment; Credit report review documentation; Budget/spending plan standards',
  soc_controls = 'HUD annual performance review; Client file documentation/confidentiality; Counselor certification tracking; Outcome tracking (9902); DMP account controls; Client fund segregation; Complaint resolution; Quality assurance review program'
WHERE name LIKE '%Housing Counselor%';

-- GROUP 13: FORENSIC AND INVESTIGATIVE (3)

UPDATE citizen_catalog SET
  governing_guidelines = 'Federal fraud statutes (18 USC 1341, 1343, 1344, 1347); Federal Rules of Evidence; State fraud statutes; Daubert/Frye standards; False Claims Act (31 USC 3729); RICO (18 USC 1961-1968); SOX/Dodd-Frank whistleblower provisions',
  standards_of_creation = 'ACFE Fraud Examiners Manual; ACFE Code of Ethics; Forensic examination reports; Document examination methodology; Interview/interrogation documentation; Financial statement fraud analysis; Asset tracing; Fraud risk assessment; Expert witness reports; Forensic data analytics',
  soc_controls = 'Evidence chain of custody; Digital forensic workstation integrity; Interview recording; Report peer review; Conflict screening; Confidentiality/privilege protections; Workpaper standards; Independent verification and validation'
WHERE name = 'Certified Fraud Examiner';

UPDATE citizen_catalog SET
  governing_guidelines = 'AICPA Code of Professional Conduct; Federal Rules of Evidence 702; Daubert Standard; FRCP 26(a)(2); State CPA licensing; SOX (financial statement fraud); PCAOB Standards; State forensic accounting standards',
  standards_of_creation = 'AICPA SSFS; AICPA SSVS; Expert report per FRCP 26(a)(2)(B); Damages calculation methodology; Financial statement reconstruction; Bank record analysis/tracing; Lifestyle analysis/net worth method; Source and application of funds; Business valuation standards',
  soc_controls = 'Forensic workpaper controls; Evidence handling and chain of custody; Analytical procedure documentation; Peer review of forensic opinions; Conflict screening; Independence standards; Digital evidence preservation; Engagement quality review'
WHERE name LIKE '%Forensic Accountant%' AND name NOT LIKE '%Deep%';

UPDATE citizen_catalog SET
  governing_guidelines = '18 USC 1341 (Mail Fraud); 18 USC 1343 (Wire Fraud); 18 USC 1344 (Bank Fraud); 18 USC 1956-1957 (Money Laundering); 18 USC 1028/1028A (Identity Theft); 26 USC 7201-7207 (Tax Fraud); 31 USC 5324 (Structuring); RICO; Fourth Amendment',
  standards_of_creation = 'IRS-CI Special Agent Report; FBI FD-302; DOJ Prosecution Memorandum; Grand Jury Subpoena; Search Warrant Affidavit; Financial analysis (net worth, expenditures, bank deposits); Asset forfeiture per 18 USC 981; MLAT requests; NIST SP 800-86',
  soc_controls = 'Federal law enforcement evidence management; Chain of custody protocols; Classified information handling; Grand jury secrecy (Rule 6(e)); Witness protection controls; OCDETF coordination; FinCEN Query/Treasury Enforcement access; ASCLD forensic lab accreditation'
WHERE name = 'Financial Crimes Investigator';

-- GROUP 14: FINANCIAL PLANNING (2)

UPDATE citizen_catalog SET
  governing_guidelines = 'CFP Board Standards of Professional Conduct; CFP Board Code of Ethics (2019); SEC Reg BI; Investment Advisers Act fiduciary duty; State insurance producer licensing; State securities adviser registration; CFP Board Disciplinary Rules',
  standards_of_creation = 'CFP Board Practice Standards; Financial planning engagement documentation; Comprehensive plan documentation; Investment Policy Statement; Insurance needs analysis; Retirement projections; Estate planning analysis; Tax planning strategy; Education funding analysis; Risk tolerance assessment',
  soc_controls = 'CFP Board ethics review; Client suitability documentation; Compensation/conflict disclosure; Engagement scope documentation; Plan implementation monitoring; Periodic review documentation; Client consent tracking; Referral/co-advisory documentation'
WHERE name = 'Certified Financial Planner';

UPDATE citizen_catalog SET
  governing_guidelines = 'Uniform Probate Code; Uniform Trust Code; State trust and estate statutes; IRC Subtitle B (estate/gift/GST); IRC 2056 (marital deduction); IRC 2503 (annual exclusion); State fiduciary income tax; Uniform Principal and Income Act; State POA statutes; ERISA beneficiary rules',
  standards_of_creation = 'IRS Form 706; IRS Form 709; IRS Form 1041; Trust instrument drafting; Will drafting; POA documentation; Trust accounting per Uniform Principal and Income Act; Fiduciary inventory/accounting; Estate administration; Trust distribution documentation',
  soc_controls = 'State bar trust account controls; Fiduciary accounting controls; Trust asset custody/investment; Beneficiary communication/reporting; Tax filing deadline tracking; Conflict screening; Document execution formalities; Trust administration record retention'
WHERE name LIKE '%Estate and Trust Attorney%';

-- GROUP 15: CREDIT CARD AND PAYMENT (2)

UPDATE citizen_catalog SET
  governing_guidelines = 'PCI DSS v4.0; PCI PA-DSS; PCI P2PE; PCI PIN Security; Card network operating regulations (Visa Core Rules, MC Standards); Regulation E; Regulation Z; EFTA; State data breach notification; GLBA Safeguards',
  standards_of_creation = 'PCI DSS SAQ A through D; PCI DSS ROC; Attestation of Compliance (AOC); ASV scan reports; Penetration test reports; Compensating controls documentation; CDE documentation; Network segmentation validation; Incident response plan; Card network compliance evidence',
  soc_controls = 'SOC 2 Type II (PCI DSS aligned); PCI DSS 12 requirements; Quarterly ASV scanning; Annual penetration testing; Encryption key management; Access control/authentication; Log monitoring/alerting; Incident response testing; Vendor management; Change management'
WHERE name LIKE '%Payment Card Industry Compliance%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Credit CARD Act of 2009; TILA/Regulation Z (open-end credit); FCRA/Reg V; ECOA/Reg B; EFTA/Reg E; Military Lending Act; CFPB UDAAP; State credit card surcharge statutes; CFPB late fee rule; CAN-SPAM; TCPA',
  standards_of_creation = 'Regulation Z Schumer Box; Cardholder agreement content; Periodic statement per Reg Z; Change-in-terms notices; Adverse action per ECOA+FCRA; Annual fee/rate increase notices; Balance transfer/promotional rate disclosure; Rewards terms; Account opening disclosures; Billing error resolution',
  soc_controls = 'SOC 1 Type II (card processing); SOC 2 Type II (cardholder data); Payment posting order per CARD Act; Minimum payment validation; Interest rate validation; Fee assessment compliance; Promotional rate expiration tracking; Overlimit consent; Dispute resolution timeline; Credit line management'
WHERE name = 'Credit Card Issuer Compliance';

-- GROUP 16: FIDUCIARY AND TRUST (1)

UPDATE citizen_catalog SET
  governing_guidelines = 'OCC Comptrollers Handbook (Fiduciary); 12 CFR 9; Uniform Trust Code; Uniform Prudent Investor Act; Uniform Principal and Income Act; State trust company licensing; ERISA; IRC Subchapter J; State fiduciary income tax; Uniform Directed Trust Act',
  standards_of_creation = 'Trust accounting per UPIA/UPAIA; Investment review documentation; Account review/administration; Fiduciary annual report; Trust distribution documentation; Discretionary distribution analysis; Form 1041; Trust termination/distribution; Special needs trust administration; Trust protector documentation',
  soc_controls = 'SOC 1 Type II (trust accounting); SOC 2 Type II (beneficiary data); OCC/FDIC trust examination; Investment performance monitoring; Fiduciary committee review; Account acceptance/termination; Trust asset segregation; Fee calculation/disclosure; Beneficiary communication; Conflict management'
WHERE name LIKE '%Trust Officer%';

-- GROUP 17: INFORMATION SECURITY (2)

UPDATE citizen_catalog SET
  governing_guidelines = 'GLBA Safeguards Rule (16 CFR 314); FFIEC Information Security Handbook; NYDFS 23 NYCRR 500; SEC Reg S-P; SEC Reg S-ID; CFPB Information Security guidance; FTC Safeguards enforcement; State breach notification (all 50); CCPA/CPRA; SWIFT CSP',
  standards_of_creation = 'NIST CSF 2.0; NIST SP 800-53; ISO 27001/27002; CIS Critical Security Controls; FFIEC CAT; NYDFS 500 compliance documentation; Incident response plan; BCP/DR documentation; Vendor risk management; Penetration test/vulnerability reports',
  soc_controls = 'SOC 2 Type II (all five TSC); SOC for Cybersecurity; FFIEC IT Examination; NIST CSF maturity; Access management/identity governance; DLP controls; SIEM; Third-party risk management; Encryption (rest/transit); Security awareness training'
WHERE name LIKE '%Information Security Officer%';

UPDATE citizen_catalog SET
  governing_guidelines = 'FFIEC IT Examination Handbook; ISACA IT Audit Framework; PCAOB AS 2201; SOX Section 404 (ITGC); GLBA safeguards assessment; NYDFS 23 NYCRR 500 audit; IIA International Standards; AICPA SSAE 18',
  standards_of_creation = 'COBIT 2019; ISACA IT Audit Standards; AICPA AT-C 205 (SOC 1); AICPA AT-C 105/205 (SOC 2); NIST SP 800-53A; FFIEC IT Examination work program; IT audit workpapers; Control testing documentation; Exception reporting; Remediation tracking',
  soc_controls = 'SOC 1 Type II evaluation; SOC 2 Type II evaluation; SOC 3 evaluation; ITGC testing; Application controls testing; Change management audit; Access management audit; Database security audit; Network security audit; BCP/DR audit'
WHERE name LIKE '%IT Auditor%Financial%';

-- GROUP 18: EXTERNAL AUDIT (1)

UPDATE citizen_catalog SET
  governing_guidelines = 'SOX; PCAOB AS 1001-3999; AICPA Clarified SAS; AICPA Code of Professional Conduct; SEC Reg S-X; FDIC Part 363; SEC Independence Rules (Rule 2-01); State CPA licensing/peer review; Single Audit Act (2 CFR 200)',
  standards_of_creation = 'PCAOB AS 2201 (ICFR Audit); PCAOB AS 2401 (Fraud); PCAOB AS 2101 (Planning); AICPA Audit Guides (Banking, Investment Companies); GAAP/IFRS/SAP; Audit report standards; Management letter/IC deficiency reporting; SOC examination per AT-C 205, 320',
  soc_controls = 'SOC 1 Type II examination; SOC 2 Type II examination; PCAOB inspection compliance; AICPA peer review; Independence monitoring; Engagement quality review; Audit workpaper documentation/retention; Analytical procedures; Sampling methodology; Subsequent events evaluation'
WHERE name LIKE '%External Auditor%Financial Services%';

-- GROUP 19: GOVERNMENT FINANCIAL OVERSIGHT (3)

UPDATE citizen_catalog SET
  governing_guidelines = 'State banking codes; FFIEC CAMELS Rating System; FFIEC BSA/AML Manual; State money transmitter licensing; State trust company regulations; Dual banking system coordination; State consumer protection; State CRA equivalents',
  standards_of_creation = 'FFIEC Examination Reports; State examination report standards; CAMELS rating documentation; FFIEC Call Report validation; MRA documentation; Consent Order/Cease and Desist; State licensing review; Multi-state coordination (NMLS)',
  soc_controls = 'FFIEC standardized procedures; Examiner independence/conflict controls; Examination scheduling/scope management; Report quality assurance; Inter-agency coordination; Institution risk assessment; Follow-up/enforcement tracking; Confidential supervisory information controls'
WHERE name = 'State Banking Examiner';

UPDATE citizen_catalog SET
  governing_guidelines = 'State insurance codes; NAIC Model Laws; NAIC Financial Condition Examiners Handbook; NAIC Market Regulation Handbook; State unfair trade practices; State unfair claims settlement; State holding company acts; NAIC Risk-Focused Examination; State insurance fraud statutes',
  standards_of_creation = 'NAIC Financial Examination Report; NAIC Market Conduct Report; NAIC Annual Statement verification; SAP compliance; Risk-Based Capital verification; IRIS ratios; Market conduct violations; Company action level events; Holding company registration review',
  soc_controls = 'NAIC examination quality assurance; Examiner independence/rotation; Financial condition monitoring (IRIS, FAST); Market analysis/prioritization; Examination workpapers; Confidential examination information; Inter-state coordination (lead state); Company risk assessment scoring'
WHERE name = 'State Insurance Examiner';

UPDATE citizen_catalog SET
  governing_guidelines = 'Uniform Securities Act (2002); State securities statutes (Blue Sky Laws); State investment adviser registration; NASAA Model Rules; State broker-dealer registration; State franchise/business opportunity; State crowdfunding exemptions; SEC/FINRA coordination',
  standards_of_creation = 'NASAA Examination standards; State IA examination procedures; State BD examination procedures; Form ADV review; State registration/filing review; NASAA coordinated exam protocols; Enforcement action documentation; Investor complaint investigation',
  soc_controls = 'NASAA examination quality; Examiner training/certification; CRD/IARD system verification; State registration database; Complaint tracking/management; Enforcement action tracking; Inter-state coordination (NASAA); Investor restitution fund management'
WHERE name = 'State Securities Examiner';

-- GROUP 20: ANTI-FRAUD AND IDENTITY PROTECTION (1)

UPDATE citizen_catalog SET
  governing_guidelines = 'FCRA Section 605B (identity theft blocks); FCRA Section 609(e); Identity Theft Act (18 USC 1028); FTC Red Flags Rule; FACTA; State identity theft statutes; State credit freeze/thaw; State breach notification; IRS Identity Protection PIN; SSN Fraud Prevention Act',
  standards_of_creation = 'FTC Identity Theft Report; FTC Identity Theft Affidavit / IRS Form 14039; Credit bureau dispute documentation; Police report standards; Fraud alert placement; Credit freeze/thaw documentation; FCRA 609(e) business record request; Account fraud affidavit; ChexSystems dispute; IRS Form 14039',
  soc_controls = 'Identity verification/authentication; Multi-bureau monitoring; Fraud alert management; Credit freeze implementation tracking; Dispute resolution timeline; Document retention for identity theft; Victim assistance case management; Law enforcement coordination'
WHERE name = 'Identity Theft Resolution';

-- ============================================================
-- SECTION 3: INSURANCE / BANKING / TAX DEEP DIVE (93 personas)
-- ============================================================

-- SECTION A: INSURANCE DEEP DIVE (35 personas)

-- A1. Property & Casualty Licensing (3)

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 1625 (license requirement); Cal. Ins. Code 1631 (lines of authority); Cal. Ins. Code 1704 (appointment); Cal. Ins. Code 1749 (40 hours prelicensing); Cal. Ins. Code 1749.33 (24-hour CE, 3 hours ethics); Cal. Ins. Code 1652 (fingerprint/background); 10 CCR 2190-2199; NAIC Model Act #218',
  standards_of_creation = 'CDI-prescribed application with fingerprint card; Proof of prelicensing from CDI-approved provider; CDI examination passing score; Appointment notice Form 441-9; License displayed per 1725; License number on all communications per 1725.5; CE certificates maintained',
  soc_controls = 'C-1: License verification against CDI SLAS; C-2: Appointment filed within 15 days; C-3: Premium trust fund segregation; C-4: E&O insurance maintained; C-5: Advertising review per 1726; I-1: Retention minimum 5 years per Cal. Ins. Code 38.6'
WHERE name = 'Licensed Property Broker';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 1625; Cal. Ins. Code 1631 (casualty lines); Cal. Ins. Code 1704-1705; Cal. Ins. Code 1749 (40 hours casualty); Cal. Ins. Code 769 (agency contract protections); Cal. Ins. Code 783; Cal. Ins. Code 787.1; 10 CCR 2190-2199',
  standards_of_creation = 'Same licensing process as property lines; Written agency/brokerage contract per 769; Contract specifying compensation, termination, book ownership; All binding authority documented in writing',
  soc_controls = 'C-1 through C-5 same as property; C-6: Written binding authority limits; C-7: Claims reporting procedures per carrier; I-2: Agency contract amendments version controlled'
WHERE name = 'Licensed Casualty Broker';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 1625.5 (personal lines); Cal. Ins. Code 1749(a)(3) (20 hours prelicensing); Cal. Ins. Code 1725-1726; Cal. Ins. Code 778.4 (premium financing disclosure); Cal. Ins. Code 10103 (residential declarations); Proposition 103 / Cal. Ins. Code 1861.01-1861.16',
  standards_of_creation = '20-hour prelicensing; Limited to personal lines (homeowners, auto, personal umbrella); Premium financing disclosures per 778.4; Residential declarations per 10103',
  soc_controls = 'C-1: License limited to personal lines; C-8: Premium financing disclosure retained; C-9: Proposition 103 rate compliance verified; I-3: Quote comparison worksheets retained'
WHERE name = 'Personal Lines Broker';

-- A2. Surplus Lines (1)

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 1765 (surplus line broker); Cal. Ins. Code 1763 (diligent search); Cal. Ins. Code 1764.1 (NRRA compliance); Cal. Ins. Code 1776 (penalties); NRRA 15 U.S.C. 8201-8206; 10 CCR 2301-2310',
  standards_of_creation = 'Diligent search from 3+ admitted insurers per 1763; Affidavit filed with SLA; NRRA-eligible nonadmitted insurer; Surplus lines tax at 3% per RTC 12201; Monthly/quarterly SLA filing; Stamping fee; SLA-registered forms',
  soc_controls = 'C-10: Diligent search log with timestamps; C-11: Insurer eligibility against NAIC list; C-12: Tax calculation worksheet per placement; C-13: SLA filing within 60 days; C-14: Premium in fiduciary capacity per 1766; I-4: 5-year retention per 38.6'
WHERE name = 'Surplus Lines Broker';

-- A3. Claims Adjustment (2)

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 11761 (WC adjuster standards); Cal. Ins. Code 790.03 (unfair claims); Cal. Ins. Code 790.03(h) (unfair settlement); 10 CCR 2695.1-2695.17 (Fair Claims Settlement); Cal. Ins. Code 1871-1879 (fraud reporting); NAIC Model Act #900',
  standards_of_creation = 'Claims file within 15 days per 10 CCR 2695.5; Coverage determination within 40 days per 10 CCR 2695.7; Written denials citing specific provisions; Itemized settlement offers; Fraud referrals per 1872.4; WC adjuster training per 11761',
  soc_controls = 'C-15: Claims diary tracking regulatory deadlines; C-16: Authority limits per adjuster; C-17: SIU referral triggers; C-18: Claimant communication log; C-19: Settlement authority documented; I-5: 5 years; WC: lifetime'
WHERE name = 'Insurance Claims Adjuster';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 15009.1 (20-hour prelicensing); Cal. Ins. Code 15011 (license requirements); Cal. Ins. Code 15027 (CDI-approved written contract); Cal. Ins. Code 15028 (prohibited practices, no solicitation <72 hours); Cal. Ins. Code 15028.6 (fiduciary duty); 10 CCR 2698.40-2698.50',
  standards_of_creation = 'CDI-approved contract BEFORE work per 15027; Contract states fee, scope, cancellation rights; 72-hour cooling-off period; No solicitation within 72 hours of disaster; All proceeds in separate fiduciary trust per 15028.6; Apprentice supervised per 15016',
  soc_controls = 'C-20: Contract execution before file activity; C-21: Disaster date tracking for 72-hour ban; C-22: Fiduciary trust account reconciled monthly; C-23: Fee cap compliance (10% during state of emergency); I-6: 5 years after settlement'
WHERE name LIKE '%Public Insurance Adjuster%';

-- A4. Unfair Claims Settlement Practices (1)

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 790.03(h)(1)-(15) (15 enumerated practices); 10 CCR 2695.1-2695.17; 10 CCR 2695.5 (15-day ack, 40-day determination); 10 CCR 2695.7 (prompt fair equitable settlement); 10 CCR 2695.8-2695.10 (property/liability/auto); Cal. Ins. Code 790.15 (Holocaust claims); NAIC Model #900',
  standards_of_creation = 'Written compliance monitoring program; Random claims file audit with statistical validity; Monthly timeliness tracking reports; Complaint root cause analysis; Market conduct examination procedures; Training on all 15 enumerated practices',
  soc_controls = 'C-24: Automated deadlines (15-day, 40-day, 30-day partial); C-25: Random audit at 5%+ closed files; C-26: CDI complaint response tracking; C-27: Market conduct exam workflow; C-28: Denial template review; I-7: 5-year retention'
WHERE name = 'Unfair Claims Settlement';

-- A5. Life Insurance & Life Settlements (2)

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 1626 (life agent); Cal. Ins. Code 1749.33 (24-hour CE); Cal. Ins. Code 10509.900-10509.960 (Annuity Suitability per NAIC #275); Cal. Ins. Code 787.1 (senior designations); Cal. Ins. Code 779.2-779.14 (credit life); Cal. Ins. Code 10236.1-10236.15 (LTC); NAIC #670; NAIC #275',
  standards_of_creation = 'Suitability determination per 10509.900 series; Consumer profile before recommendation; Replacement disclosure CDI Form 2A/2B; Illustration actuary certification per NAIC #582; Policy delivery receipt with free-look disclosure',
  soc_controls = 'C-29: Suitability documented and supervisor-reviewed; C-30: Replacement activity tracked; C-31: Illustration compliance per NAIC; C-32: Senior protections (age 65+ heightened); I-8: Suitability records 5 years per NAIC, 8 recommended'
WHERE name = 'Life Agent';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 10113.1 (Life Settlements Act); Cal. Ins. Code 10113.2 (licensing, disclosure, conduct); Cal. Ins. Code 10113.3 (terminally ill protections); Cal. Ins. Code 10113.2(k) (fiduciary duty); Cal. Ins. Code 10113.2(n) (anti-fraud); 10 CCR 2550-2560',
  standards_of_creation = 'Written disclosure of all settlement offers; Broker compensation disclosed in writing; Medical record release on CDI-approved forms; Competency determination for elderly/terminally ill; 15-day rescission period; STOLI screening documentation',
  soc_controls = 'C-33: All offers documented and disclosed; C-34: Medical info security per HIPAA/CMIA; C-35: STOLI screening per transaction; C-36: Rescission period tracked; I-9: Transaction records 5 years post-settlement'
WHERE name = 'Life Settlement Broker';

-- A6. Bail Bonds (1)

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 1800 (license required); Cal. Ins. Code 1802 (bail agent scope); Cal. Ins. Code 1803 (bail solicitor); Cal. Ins. Code 1811 (fees); Cal. Penal Code 1269-1276 (bail and release); 10 CCR 2080-2089; SB 10/Prop 25',
  standards_of_creation = 'Surety insurer appointment on file with CDI; Bail bond on court-approved form; Collateral receipt for all collateral; Premium at CDI-approved rate (typically 10%); Indemnity agreement signed; Disclosure of premium, collateral, forfeiture consequences',
  soc_controls = 'C-37: Premium rate compliance; C-38: Collateral custodial controls; C-39: Court appearance tracking; C-40: Forfeiture response within 185 days per Cal. Penal Code 1305; I-10: Records 5 years per CDI/surety'
WHERE name = 'Bail Agent';

-- A7. Title Insurance (1)

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 12340-12417 (Title Insurance); Cal. Ins. Code 12340.1 (title insurance defined); Cal. Ins. Code 12401-12401.7 (rate regulation); Cal. Civ. Code 1057-1057.6 (escrow); ALTA Best Practices; ALTA Policy Forms; CFPB TRID',
  standards_of_creation = 'Preliminary title report from title plant; ALTA/CLTA policy forms; Exceptions specifically identified; Recording confirmation; Escrow instructions executed; Settlement statement accurate and balanced; Wire fraud prevention protocols',
  soc_controls = 'C-41: Title plant search with chain of title; C-42: Dual control on escrow disbursement; C-43: Wire instruction callback verification; C-44: Recording tracking; C-45: ALTA Best Practices Pillar 3 (NPI); I-11: Minimum 10 years, many permanent'
WHERE name LIKE '%Title Insurance Underwriter%';

-- A8. Specialty Insurance (3)

UPDATE citizen_catalog SET
  governing_guidelines = 'Federal Crop Insurance Act (7 U.S.C. 1501-1524); 7 CFR Part 400; 7 CFR Part 457; 7 CFR 400.169-400.176 (agent standards); RMA Manager Bulletin; Standard Reinsurance Agreement; Cal. Ins. Code 1625',
  standards_of_creation = 'Valid state license AND RMA-approved training; Acreage reports per RMA deadlines; Production reports with verifiable records; Notice of loss within 72 hours; RMA-prescribed forms; Conflict of interest disclosures',
  soc_controls = 'C-46: RMA training annually; C-47: Sales closing dates tracked per crop/county; C-48: Production verification against FSA/USDA; C-49: Anti-fraud per 7 CFR 400.176; I-12: 3 years after crop year'
WHERE name = 'Crop Insurance Agent';

UPDATE citizen_catalog SET
  governing_guidelines = 'National Flood Insurance Act (42 U.S.C. 4001-4131); Flood Disaster Protection Act (42 U.S.C. 4002); Biggert-Waters Act; Homeowner Flood Insurance Affordability Act; 44 CFR Part 59-77; 44 CFR 62.23 (WYO); NFIP Flood Insurance Manual; FEMA SFIP forms',
  standards_of_creation = 'SFIP on FEMA-prescribed forms; Flood zone determination from FIRM; Elevation Certificate (FEMA Form 086-0-33); 30-day waiting period; Mandatory purchase for federally backed loans in SFHAs; Claims per NFIP Adjuster Claims Manual',
  soc_controls = 'C-50: Flood zone against current FIRM; C-51: Elevation certificate accuracy; C-52: Waiting period compliance; C-53: Mandatory purchase notification; I-13: 5 years per WYO'
WHERE name LIKE '%Flood Insurance%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 10089-10089.55 (CEA Act); Cal. Ins. Code 10081-10088 (Basic Earthquake Policy); Cal. Ins. Code 10089.6 (CEA terms); Cal. Ins. Code 10089.16 (participating insurer); CEA Governing Board Resolutions; CEA Participating Insurer Agreement; CEA Claims Manual',
  standards_of_creation = 'CEA policy through participating insurer only; Offer/declination at every residential renewal per 10089; CEA-prescribed forms (no variation); Deductible options disclosed; Claims per CEA Claims Manual by approved adjusters',
  soc_controls = 'C-54: Offer/declination tracked per residential policy; C-55: CEA form versions current; C-56: Claims authority limited to CEA-approved; I-14: Offer/declination records for examination cycle'
WHERE name LIKE '%Earthquake Authority%';

-- A9. Workers Compensation (2)

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 109 (WC defined); Cal. Ins. Code 676.8 (cancellation notice); Cal. Ins. Code 11750-11760 (rating organizations); Cal. Lab. Code 3200-6002 (WC Act); Cal. Lab. Code 3700 (employer obligation); Cal. Lab. Code 3715 (penalties); 8 CCR 10100-10133; WCIRB Experience Rating Plan',
  standards_of_creation = 'Policy with correct WCIRB classification codes; Experience modification factor from WCIRB; DWC proof of coverage filed; Inception/cancellation reported to WCIRB; Audit provisions for premium adjustment; CIGA assessment per Cal. Ins. Code 1063.5',
  soc_controls = 'C-57: Classification code accuracy; C-58: Experience mod from WCIRB; C-59: DWC filing tracked; C-60: Premium audit within 90 days of expiry; C-61: Cancellation per 676.8 (30/10 day); I-15: 10 years (long-tail)'
WHERE name LIKE '%Workers%Compensation Insurance Specialist%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 11761 (adjuster standards); Cal. Lab. Code 4600-4904 (WC benefits); 8 CCR 10100-10133 (DWC claims admin); 8 CCR 9812 (electronic first reports); Cal. Ins. Code 1877-1877.3 (WC Fraud Reporting Act); WCAB Rules (8 CCR 10300-10995)',
  standards_of_creation = 'First Report within 5 days per DWC; Three-point contact within 1 business day; Benefits within 14 days per Cal. Lab. Code 4650; Compensability within 90 days per 4650; UR per DWC medical treatment guidelines; Fraud referrals per WC Fraud Reporting Act',
  soc_controls = 'C-62: DWC filing deadlines automated; C-63: UR decisions by physician per DWC MTUS; C-64: Benefits per statutory formulas; C-65: Fraud indicators per 1877; I-16: SOL 5 years; death/permanent disability: lifetime'
WHERE name LIKE '%Workers%Compensation Claims%';

-- A10. Commercial/Specialty Liability (6)

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 675.5 (commercial); Cal. Ins. Code 676.2 (cancellation); Cal. Ins. Code 460 (form filing); 10 CCR 2218-2220 (commercial rating); ISO Professional Liability forms; Claims-made vs occurrence trigger; ERP provisions',
  standards_of_creation = 'Application with professional history and prior acts; Risk assessment with underwriting rationale; Claims-made retroactive date stated; ERP provisions disclosed; Rate filing compliance verified',
  soc_controls = 'C-66: Prior acts gap analysis; C-67: Claims-made trigger tracking; C-68: ERP notification at non-renewal; I-17: Claims-made tail plus SOL'
WHERE name LIKE '%Professional Liability%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 675.5; Cal. Corp. Code 317 (indemnification); Securities Act 15 U.S.C. 77k (Section 11); Securities Exchange Act 15 U.S.C. 78j (Section 10(b)); SOX; Dodd-Frank (whistleblower/clawback); Side A/B/C coverage structure',
  standards_of_creation = 'Application with SEC filings, financials, governance questionnaire; Warranty statements by authorized officer; Coverage parts A/B/C delineated; Exclusion review documented; Retention/SIR per side',
  soc_controls = 'C-69: SEC filing review; C-70: Material change notification; C-71: Claims cooperation documented; I-18: 10 years (long-tail securities)'
WHERE name LIKE '%Directors%Officers%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 675.5; CCPA/CPRA (Cal. Civ. Code 1798.100-1798.199); Cal. Civ. Code 1798.82 (breach notification); NAIC Data Security Model (#668); NIST CSF 2.0; PCI DSS; HIPAA; GDPR; SEC Cyber Disclosure (2023)',
  standards_of_creation = 'Cybersecurity posture assessment; Network security controls documented; Incident response plan reviewed; First-party/third-party coverage delineated; Ransomware sublimit/exclusion stated; Retroactive date and prior knowledge exclusion; Breach coach/vendor panel disclosed',
  soc_controls = 'C-72: Pre-bind security assessment; C-73: MFA verification; C-74: Incident response plan verified; C-75: OFAC sanctions screening for ransomware; I-19: 6 years (regulatory cycle)'
WHERE name = 'Cyber Liability';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 675.5; CERCLA 42 U.S.C. 9601-9675 (Superfund); RCRA 42 U.S.C. 6901-6992; Clean Water Act 33 U.S.C. 1251-1387; Cal. Health & Safety Code 25100-25250; Cal. Health & Safety Code 25300-25395; ISO Pollution forms',
  standards_of_creation = 'Phase I/Phase II ESA reviewed; Historical site use documented; Known contamination scheduled; Pollution conditions defined (sudden vs gradual); Regulatory cleanup limits specified; Named insured schedule complete',
  soc_controls = 'C-76: Environmental due diligence retained; C-77: Known conditions accurately reflected; C-78: Defense cost erosion tracking; I-20: 30+ years (latent contamination)'
WHERE name = 'Environmental Liability Insurance';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 675.5; Cal. Civ. Code 1714 (negligence); Cal. Civ. Code 1792-1795.7 (Song-Beverly); Restatement (Third) Products Liability; Consumer Product Safety Act 15 U.S.C. 2051-2089; ISO CGL CG 00 01',
  standards_of_creation = 'Product hazard analysis in underwriting file; 5-year loss history; QC/testing programs evaluated; Products-completed operations aggregate tracked; Recall cost terms defined; International jurisdiction evaluated',
  soc_controls = 'C-79: Product hazard classification; C-80: CPSC recall database checked; C-81: Aggregate tracking separate; I-21: 15 years (long-tail BI)'
WHERE name = 'Product Liability Insurance';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 675.5; Following form vs stand-alone analysis; Drop-down coverage trigger; Underlying insurance schedule verification; SIR vs deductible distinction',
  standards_of_creation = 'Underlying schedule verified for limits, coverage, carrier; Coverage gap analysis; SIR obligations stated; Drop-down conditions documented; Maintenance of underlying disclosed; Defense obligation specified',
  soc_controls = 'C-82: Underlying verified at inception/renewal; C-83: Coverage gap matrix; C-84: Maintenance clause monitored; I-22: Commensurate with longest underlying tail'
WHERE name LIKE '%Umbrella%Excess Insurance%';

-- A11. Reinsurance (2)

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 1781.1-1781.14 (Reinsurance Intermediary Act); Cal. Ins. Code 1781.3 (licensing); Cal. Ins. Code 1781.4 (written authorization); Cal. Ins. Code 1781.5 (10-year retention); NAIC Credit for Reinsurance Model (#785/#786); NAIC RI Model Act (#791)',
  standards_of_creation = 'Written authorization per 1781.4 specifying lines, retention, reinsurer criteria; Placement slips; Premium/loss separate ledger; Funds in fiduciary capacity; Complete records per 1781.5 (10 years after expiration)',
  soc_controls = 'C-85: Authorization scope verified; C-86: Reinsurer security (AM Best, S&P); C-87: Fiduciary fund segregation quarterly; C-88: CDI examination cooperation; I-23: 10 years from expiration per 1781.5'
WHERE name = 'Reinsurance Intermediary-Broker';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 1781.7 (written contract with reinsurer); Cal. Ins. Code 1781.8 (prohibited acts); Cal. Ins. Code 1781.9 (reinsurer due diligence); Cal. Ins. Code 1781.10 (examination authority); NAIC RI Model Act (#791)',
  standards_of_creation = 'Written contract per 1781.7; No binding beyond scope; No retrocession compensation per 1781.8(a); No sub-managers without approval; Annual audit by reinsurer; Board involvement per 1781.9',
  soc_controls = 'C-89: Contract scope verified per transaction; C-90: Retrocession monitored for prohibited compensation; C-91: Annual audit completed; I-24: 10 years same as RI-broker'
WHERE name = 'Reinsurance Intermediary-Manager';

-- A12. Lloyds (1)

UPDATE citizen_catalog SET
  governing_guidelines = 'Lloyds Act 1982; Lloyds Minimum Standards (MS1-MS13); Lloyds Crystal/Delegated Authority Framework; Cal. Ins. Code 1765 (surplus lines for Lloyds); Cal. Ins. Code 1764.1 (Lloyds eligible); NRRA 15 U.S.C. 8201-8206',
  standards_of_creation = 'Binding authority agreement (BAA) with syndicate(s); Coverholder via Lloyds Atlas/Crystal; Risk bound within BAA only; Bordereaux reporting per BAA schedule; Surplus lines compliance per state of risk; UMR per placement',
  soc_controls = 'C-92: BAA scope verified before bind; C-93: Bordereaux deadlines tracked; C-94: Crystal registration current; C-95: Surplus lines per state; I-25: 6 years after policy expiry per Lloyds'
WHERE name LIKE '%Lloyd%Coverholder%';

-- A13. Captive & RRG (2)

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 700 (admission); Vermont Captive Act 8 V.S.A. 6001-6014; Hawaii Captive Act HRS 431:19; IRC 831(b) (micro-captive $2.65M threshold); IRS Notice 2016-66 (transaction of interest)',
  standards_of_creation = 'Feasibility study with actuarial analysis; Business plan filed with domiciliary regulator; Capitalization at statutory minimum; Annual actuarial opinion; Annual audited financials; Licensed captive manager agreement; Risk distribution analysis',
  soc_controls = 'C-96: Actuarial adequacy annually; C-97: Minimum capital/surplus maintained; C-98: Related-party transactions documented; C-99: IRS micro-captive compliance if 831(b); I-26: Life of captive plus 7 years'
WHERE name LIKE '%Captive Insurance%Manager%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Liability Risk Retention Act (15 U.S.C. 3901-3906); Cal. Ins. Code 125-131 (RRGs in California); Cal. Ins. Code 131 (organized as liability insurer); NAIC RRG Registration; NAIC RRG Handbook; Chartering state code',
  standards_of_creation = 'Chartered as liability insurer in domicile state; Registered with CDI before writing CA risks; Members in similar businesses; Annual financials to chartering state and NAIC; Risk management program; Member governance documented',
  soc_controls = 'C-100: Registration verified per state of operation; C-101: Membership homogeneity verified; C-102: Annual financials on time; C-103: Chartering state examination cooperation; I-27: Per chartering state'
WHERE name = 'Risk Retention Group';

-- A14. Insurance Fraud & Subrogation (2)

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 1871-1871.3 (fraud definitions); Cal. Ins. Code 1872.4 (SIU mandatory referral); Cal. Ins. Code 1872.41 (agent referral 60 days); Cal. Ins. Code 1877-1877.3 (WC Fraud Reporting); Cal. Penal Code 548-551; NAIC Antifraud Guidelines',
  standards_of_creation = 'Written anti-fraud plan filed with CDI; SIU staffing adequate; Fraud indicators per claim; CDI Fraud Division referral per 1872.4; Separate investigation file; Evidence chain of custody; Annual fraud statistics per 1872.9',
  soc_controls = 'C-104: Fraud indicator scoring all claims; C-105: SIU referral within 60 days per 1872.41; C-106: CDI referral documentation; C-107: Evidence chain of custody; C-108: Investigator qualifications; I-28: 10 years'
WHERE name LIKE '%SIU Investigator%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 11580(b)(2) (subrogation rights); Cal. Civ. Code 2782 (indemnity); Cal. Ins. Code 995-995.3 (compensation reporting); Made whole doctrine (CA common law); Arbitration Forums Inc.; NASP Best Practices; Anti-subrogation rule',
  standards_of_creation = 'Subrogation potential at FNOL; Recovery demand with proof and liability analysis; Made whole determination before recovery; Arbitration within deadlines; Recovery allocation (deductible to insured first); Separate salvage/subrogation ledger',
  soc_controls = 'C-109: Subrogation flagged at FNOL; C-110: SOL tracked per jurisdiction; C-111: Made whole documented before recovery; C-112: Recovery disbursement (insured deductible priority); I-29: 5 years after recovery'
WHERE name = 'Subrogation Specialist';

-- A15. Bad Faith (1)

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 790.03(h) (15 practices); Gruenberg v. Aetna 9 Cal.3d 566 (1973); Egan v. Mutual of Omaha 24 Cal.3d 809 (1979); Brandt v. Superior Court 37 Cal.3d 813 (1985); Cal. Civ. Code 3294 (punitive damages); Genuine dispute doctrine; Cumis / Cal. Civ. Code 2860',
  standards_of_creation = 'Claims handling audit trail complete and contemporaneous; Coverage analysis memorandum before denial; Reservation of rights timely; Cumis counsel per 2860 when conflict exists; Litigation hold at first indication; Expert retention documentation',
  soc_controls = 'C-113: Contemporaneous documentation (no post-hoc); C-114: Coverage opinion before adverse action; C-115: Litigation hold compliance; C-116: Cumis counsel conflict screening; I-30: Until final resolution including appeals'
WHERE name = 'Bad Faith';

-- A16. Rate Filing & Holding Companies (2)

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 1861.01-1861.16 (Proposition 103 prior approval); Cal. Ins. Code 1861.05 (hearing procedures); Cal. Ins. Code 11750 (rating organizations); Cal. Ins. Code 10236.11-10236.15 (LTC); ASOPs 12, 25, 43; NAIC rate filing guidance',
  standards_of_creation = 'Rate filing on CDI forms with actuarial support; Actuarial memorandum (adequate, not excessive, not discriminatory); Loss triangles and trend analyses; Expense loading; Consumer notification per Prop 103; Public hearing record; Appointed actuary opinion',
  soc_controls = 'C-117: Actuarial certification by FCAS/FSA/MAAA; C-118: CDI approval tracking; C-119: Consumer objection response; C-120: Reserve adequacy with NAIC annual statement; I-31: Examination cycle plus 5 years'
WHERE name LIKE '%Insurance Actuary%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 1215-1215.11 (Holding Company Act); Cal. Ins. Code 1215.2 (acquisition prior approval); Cal. Ins. Code 1215.4 (registration); Cal. Ins. Code 1215.5 (affiliate transactions); Cal. Ins. Code 936.3 (CGAD); Cal. Ins. Code 927.2-927.3 (ORSA); NAIC #440, #505, #305',
  standards_of_creation = 'Annual Form B per 1215.4; Prior approval for material affiliates per 1215.5; Form A for 10%+ acquisition per 1215.2; CGAD annually per 936.3 (June 1); ORSA biennially for $75M+ per 927.2; Internal audit per 900.3; Risk management framework per 929',
  soc_controls = 'C-121: Form B filed timely; C-122: Affiliate transactions pre-approved; C-123: Form A tracked; C-124: CGAD/ORSA deadlines; C-125: Internal audit independence per 900.3; I-32: 5-7 years per CDI cycle'
WHERE name = 'Insurance Holding Company';

-- A17. MGAs & TPAs (2)

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 1735 (MGA definition); Cal. Ins. Code 769 (agency contract); Cal. Ins. Code 816 (no claims authority on commission); Cal. Ins. Code 995-995.3 (compensation reporting); NAIC MGA Model Act (#228)',
  standards_of_creation = 'Written management contract per 1735; Binding authority limits documented; Claims authority documented (subject to 816 prohibition); Quarterly underwriting reports; Annual audit by insurer; No commission-based claims per 816',
  soc_controls = 'C-126: Authority verified per transaction; C-127: Quarterly reporting verified; C-128: Annual audit by insurer; C-129: Section 816 compliance; I-33: Per insurer contract and CDI minimum'
WHERE name = 'Managing General Agent';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 1759-1759.8 (TPA proposed); Cal. Ins. Code 742.24 (MEWA TPA); ERISA 29 U.S.C. 1001-1461; HIPAA 45 CFR 160-164 (health TPAs); NAIC TPA Model Act (#890); Cal. Ins. Code 10718.55',
  standards_of_creation = 'Written administrative services agreement; Fiduciary bond if ERISA; Claims processing procedures manual; Performance standards documented; Annual audit by plan sponsor/insurer; HIPAA BAA for health TPAs; Error rate tracking',
  soc_controls = 'C-130: Agreement scope compliance; C-131: Claims accuracy 97%+; C-132: HIPAA BAA compliance (health); C-133: ERISA fiduciary documented; C-134: Annual performance audit; I-34: Per agreement and ERISA (6 years)'
WHERE name = 'Third Party Administrator';

-- A18. Surplus Lines Tax (1)

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. RTC 12201-12302 (surplus lines tax); Cal. Ins. Code 1775-1776 (reporting/penalties); NRRA 15 U.S.C. 8201-8206 (home state taxation); Cal. Ins. Code 1764.1; SLA Filing Requirements Manual',
  standards_of_creation = 'Tax at 3% for CA risks; Tax remitted to SLA on schedule; Multi-state allocation for NRRA; Stamping fee calculated and remitted; Annual surplus lines tax return; Deficiency assessment response within time',
  soc_controls = 'C-135: Tax calculation verified per placement; C-136: Filing deadlines tracked; C-137: Multi-state allocation documented; C-138: Stamping fee accuracy; I-35: 7 years per RTC'
WHERE name = 'Surplus Lines Tax';

-- SECTION B: BANKING / CREDIT UNIONS DEEP DIVE (28 personas)

-- B1. Chartering & Licensing (4)

UPDATE citizen_catalog SET
  governing_guidelines = 'National Bank Act 12 U.S.C. 21-216d; 12 CFR Part 5; 12 CFR 5.20 (organizing national bank); OCC Comptrollers Licensing Manual; OCC Bulletin 2016-27; Federal Deposit Insurance Act 12 U.S.C. 1811-1835a',
  standards_of_creation = 'Charter application on OCC forms; 3-year business plan; Management biographical info and fingerprints; Capital plan; CRA compliance plan; Organizer qualifications; Newspaper publication; Conditional approval tracking',
  soc_controls = 'C-139: Application completeness; C-140: Management vetting (FDIC, OCC, FBI); C-141: Capital adequacy monitoring through de novo 3 years; C-142: Conditional approval tracked; I-36: Charter records permanent'
WHERE name LIKE '%Bank Charter Compliance%OCC%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Fin. Code 100-5702; Cal. Fin. Code 376 (commissioners bulletin); Cal. Fin. Code 550; FDIC 12 CFR Part 303; FDIC Statement of Policy; Federal Deposit Insurance Act; Cal. Fin. Code 4052 (privacy)',
  standards_of_creation = 'State charter application per DFPI; Simultaneous FDIC deposit insurance application; Business plan, capital plan, management bios; CRA assessment area; BSA/AML program before opening; DFPI examination schedule',
  soc_controls = 'C-143: Dual regulatory approval tracked; C-144: De novo period monitoring (3-7 years); C-145: DFPI reporting deadlines; I-37: Charter records permanent'
WHERE name LIKE '%State-Chartered Bank%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Federal Credit Union Act 12 U.S.C. 1751-1795k; 12 CFR Part 701 (NCUA); Cal. Fin. Code 14000-15604 (CA CU Law); Cal. Fin. Code 14254.5 (branch notification 10 days); Cal. Fin. Code 15204 (merger); NCUA Chartering Manual',
  standards_of_creation = 'Charter application defining FOM; FOM meeting NCUA criteria (common bond/community); Board from membership; Business plan/projections; Bylaws per NCUA model; NCUSIF confirmed',
  soc_controls = 'C-146: FOM verified per new member; C-147: Board governance documented; C-148: NCUSIF reporting tracked; C-149: Branch notification per 14254.5 (10 days); I-38: Charter permanent; FOM for examination cycle'
WHERE name = 'Credit Union Charter';

UPDATE citizen_catalog SET
  governing_guidelines = 'OCC Comptrollers Licensing Manual; FDIC 12 CFR 303; NCUA Chartering Manual; Interagency Statement on De Novo Institutions; Enhanced requirements during de novo period (3-7 years)',
  standards_of_creation = 'Pre-opening examination compliance; Conditional approval conditions satisfied; Enhanced reporting during de novo; Board minutes for all regulatory communications; Capital above well-capitalized; Growth limitations',
  soc_controls = 'C-150: Conditional approval checklist; C-151: Enhanced capital monitoring quarterly; C-152: Growth rate compliance; C-153: Regulatory communication log; I-39: 10 years post de novo end'
WHERE name LIKE '%De Novo%Compliance%';

-- B2. CRA (1)

UPDATE citizen_catalog SET
  governing_guidelines = 'CRA (12 U.S.C. 2901-2908); 12 CFR Part 25 (OCC revised 2024); 12 CFR Part 228 (Fed); 12 CFR Part 345 (FDIC); FFIEC CRA Exam Procedures; OCC/FDIC/Fed Joint Final Rule (Oct 2023)',
  standards_of_creation = 'CRA public file maintained; CRA notice in each lobby; Assessment area delineated; Lending test data (HMDA, small business, small farm, CD); Investment test; Service test; CRA strategic plan if applicable',
  soc_controls = 'C-154: Public file quarterly; C-155: Assessment area updated with branch change; C-156: Geocoding accuracy; C-157: Community development logged; C-158: Examination response documented; I-40: 5 years per FFIEC'
WHERE name = 'CRA Compliance Officer';

-- B3. Fair Lending (1)

UPDATE citizen_catalog SET
  governing_guidelines = 'ECOA (15 U.S.C. 1691-1691f); Regulation B (12 CFR 1002); HMDA (12 U.S.C. 2801-2811); Regulation C (12 CFR 1003); Fair Housing Act (42 U.S.C. 3601-3631); FFIEC Fair Lending Procedures; DOJ 42 U.S.C. 3614',
  standards_of_creation = 'Written fair lending policy; HMDA LAR; HMDA annual submission by March 1; Adverse action notices per Reg B; Government Monitoring Information per 1002.13; Annual fair lending risk assessment; Regression/statistical testing; Comparative file review',
  soc_controls = 'C-159: HMDA accuracy quarterly; C-160: Adverse action delivery tracked; C-161: Statistical testing annually; C-162: Pricing exception monitoring; C-163: Second review for protected class areas; I-41: HMDA LAR 3 years; fair lending 5 years'
WHERE name = 'Fair Lending Compliance';

-- B4. BSA/AML (2)

UPDATE citizen_catalog SET
  governing_guidelines = 'BSA 31 U.S.C. 5311-5332; USA PATRIOT Act Titles III/V; AMLA 2020; 31 CFR Part 1010-1099; 31 CFR 1020; 31 CFR 1010.311-314 (CTR $10K); 31 CFR 1010.320 (SAR); 12 CFR 21.11 (OCC BSA); FFIEC BSA/AML Manual; OFAC SDN; Wolfsberg Principles',
  standards_of_creation = 'Written 5-pillar BSA/AML program; CTR within 15 days for >$10K cash; SAR within 30/60 days for >$5K suspicious; Customer risk rating; EDD for high-risk; 314(a) responses; 314(b) enrollment',
  soc_controls = 'C-164: Automated CTR at $10K; C-165: Transaction monitoring calibrated; C-166: SAR decision documented; C-167: OFAC at account opening and wires; C-168: 314(a) within 2 weeks; C-169: Annual independent testing; C-170: Training records; I-42: 5 years per 31 CFR 1010.430'
WHERE name LIKE '%BSA/AML Compliance Officer%';

UPDATE citizen_catalog SET
  governing_guidelines = 'CIP Rule 31 CFR 1020.220; CDD Final Rule 31 CFR 1010.230; Beneficial Ownership Rule; FinCEN BOI Reporting (Corporate Transparency Act); USA PATRIOT Act Section 326; FFIEC BSA/AML CDD/CIP chapters; FinCEN FIN-2016-G003',
  standards_of_creation = 'CIP: name, DOB, address, ID number; Documentary/non-documentary verification; Beneficial ownership (25% + 1 control person); Customer risk profile at onboarding; Ongoing monitoring/CDD refresh; EDD for high-risk (PEPs, MSBs, foreign correspondents); Negative news screening',
  soc_controls = 'C-171: CIP before account opening; C-172: BO form for all legal entities; C-173: Risk rating at onboarding reviewed periodically; C-174: PEP screening automated; C-175: CDD refresh on risk events; I-43: CIP 5 years after closure; BO 5 years'
WHERE name LIKE '%KYC%';

-- B5. Electronic Banking (4)

UPDATE citizen_catalog SET
  governing_guidelines = 'EFTA 15 U.S.C. 1693-1693r; Regulation E 12 CFR 1005; 1005.6 (consumer liability); 1005.7 (initial disclosures); 1005.11 (error resolution 10/45 days); 1005.18 (prepaid); 1005.20 (gift cards); Remittance Transfer Rule; CFPB Supplement I',
  standards_of_creation = 'Initial disclosure at opening; Periodic statements (monthly/quarterly); Error resolution notice; Provisional credit within 10 business days; 45-day investigation (90 for new/POS/foreign); Written determination; Change in terms 21 days prior',
  soc_controls = 'C-176: Error resolution timeline tracked; C-177: Provisional credit within 10 days; C-178: Unauthorized transfer liability limited; C-179: Disclosure delivery documented; I-44: 2 years per EFTA; 5 years recommended'
WHERE name = 'Regulation E Compliance';

UPDATE citizen_catalog SET
  governing_guidelines = 'TILA 15 U.S.C. 1601-1667f; Regulation Z 12 CFR 1026; 1026.17-1026.24 (disclosures); 1026.32 (HOEPA); 1026.35 (higher-priced); 1026.36 (originator compensation); 1026.37-38 (TRID LE/CD); 1026.43 (ATR/QM); MLA 10 USC 987',
  standards_of_creation = 'LE within 3 business days; CD at least 3 days before consummation; APR per Appendix J; Rescission notice for refinances; Periodic statements 21 days before due; ATR determination documented; HOEPA/higher-priced testing',
  soc_controls = 'C-180: LE delivery tracked; C-181: CD delivery tracked; C-182: APR tolerance testing; C-183: Changed circumstances for revised LE/CD; C-184: ATR/QM retained; C-185: HOEPA testing automated; I-45: 2 years (3 TRID); 5+ recommended'
WHERE name LIKE '%Regulation Z%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Expedited Funds Availability Act 12 U.S.C. 4001-4010; Regulation CC 12 CFR 229; 229.10 (next-day availability); 229.12 (schedule); 229.13 (exceptions); 229.16 (hold notice); 229.30-36 (collection/return); Check 21 Act',
  standards_of_creation = 'Funds availability policy at opening; Hold notices for exceptions; Case-by-case hold with reason; Reasonable cause documented with facts; Substitute check indemnity procedures; Cut-off time posted',
  soc_controls = 'C-186: Hold notices automatic; C-187: Reasonable cause holds supervisor-reviewed; C-188: Availability schedule accuracy; C-189: Cut-off time consistency; I-46: Hold records 2 years minimum; 5 recommended'
WHERE name = 'Regulation CC Compliance';

UPDATE citizen_catalog SET
  governing_guidelines = 'TISA 12 U.S.C. 4301-4313; Regulation DD 12 CFR 1030; 1030.4 (account disclosures: APY, rate, fees); 1030.5 (subsequent); 1030.6 (periodic statements); 1030.8 (advertising); 1030.11 (overdraft); NCUA Part 707',
  standards_of_creation = 'Opening disclosure with APY, rate, fees, minimum balance, compounding; APY per Appendix A formula; Change in terms 30 days; Periodic statements accurate; Advertising APY uniform; Overdraft disclosure per 1030.11',
  soc_controls = 'C-190: APY against Reg DD formula; C-191: Fee schedule accuracy; C-192: Change in terms delivery; C-193: Advertising review before publication; I-47: 2 years per TISA; 5 recommended'
WHERE name LIKE '%Regulation DD%';

-- B6. Consumer Protection (2)

UPDATE citizen_catalog SET
  governing_guidelines = 'Dodd-Frank Section 1031 (12 U.S.C. 5531); Section 1036 (12 U.S.C. 5536); FTC Act Section 5 (15 U.S.C. 45); CFPB UDAAP Examination Manual; CFPB Supervisory Highlights; OCC Bulletin 2004-20; Interagency UDAAP Guidance; Cal. Fin. Code 90002',
  standards_of_creation = 'UDAAP risk assessment across products; Product development UDAAP review; Marketing review for deceptive content; Fee disclosure clarity; Complaint trend analysis; New product UDAAP impact assessment; Third-party vendor monitoring',
  soc_controls = 'C-194: Product development UDAAP checkpoint; C-195: Marketing reviewed before publication; C-196: Complaint data quarterly for patterns; C-197: Fee practices monitored; C-198: Third-party UDAAP compliance; I-48: 5 years'
WHERE name = 'UDAAP Compliance';

UPDATE citizen_catalog SET
  governing_guidelines = 'Regulation E 12 CFR 1005.17 (Opt-in); Regulation DD 12 CFR 1030.11 (overdraft disclosure); CFPB Overdraft Final Rule (2024-2025); OCC Bulletin 2010-15; FDIC FIL-81-2010; FFIEC Overdraft Guidance; UDAAP',
  standards_of_creation = 'Opt-in BEFORE ATM/one-time debit overdraft; Opt-in with Reg E model language; Fee schedule in account agreement; Available balance methodology disclosed; Re-presentment practices documented; Aggregate fee caps documented',
  soc_controls = 'C-199: Opt-in documented per account; C-200: Transaction ordering documented; C-201: Re-presentment monitored; C-202: Chronic overdraft outreach documented; I-49: 5 years'
WHERE name = 'Overdraft Program';

-- B7. ATM/Debit/Mobile/RDC (3)

UPDATE citizen_catalog SET
  governing_guidelines = 'Regulation E 12 CFR 1005; Durbin Amendment 15 U.S.C. 1693o-2; Regulation II 12 CFR 235; Visa Core Rules; Mastercard Rules; PCI DSS; FFIEC Retail Payment Systems',
  standards_of_creation = 'Cardholder agreement with Reg E disclosures; Card issuance security; PIN management; Dispute resolution per Reg E; Network compliance certification; PCI DSS validated annually',
  soc_controls = 'C-203: Reg E error resolution timelines; C-204: Card issuance security (PIN separation, activation); C-205: PCI DSS validated; C-206: Durbin routing (two unaffiliated networks); I-50: 5 years'
WHERE name LIKE '%ATM%Debit Card Compliance%';

UPDATE citizen_catalog SET
  governing_guidelines = 'FFIEC Mobile Financial Services (2016); FFIEC IT Handbook E-Banking; FFIEC Authentication (2021); Reg E/Reg Z mobile applicability; NIST SP 800-63; App store compliance',
  standards_of_creation = 'Mobile security assessment; MFA per FFIEC guidance; Session management/timeout; Device loss/theft procedures; Mobile-specific disclosures; ADA/Section 508 accessibility; App store review procedures',
  soc_controls = 'C-207: MFA enforced; C-208: Security testing before release; C-209: Jailbreak/root detection; C-210: Encryption rest/transit; C-211: Remote wipe for corporate; I-51: 5 years access logs'
WHERE name = 'Mobile Banking Compliance';

UPDATE citizen_catalog SET
  governing_guidelines = 'Check 21 Act 12 U.S.C. 5001-5018; Regulation CC 12 CFR 229 (substitute check); FFIEC RDC Risk Management (2009); UCC Article 4; FFIEC IT Handbook Retail Payments; X9.100-187',
  standards_of_creation = 'RDC agreement executed; Deposit limits by risk profile; Duplicate detection documented; Image quality standards; Customer eligibility criteria; Check destruction/retention communicated; Reg CC availability applied',
  soc_controls = 'C-212: Duplicate detection validated; C-213: Limits by risk tier; C-214: Image quality rejection; C-215: RDC agreement execution verified; I-52: 7 years recommended'
WHERE name = 'Remote Deposit Capture';

-- B8. Wire Transfer & OFAC (1)

UPDATE citizen_catalog SET
  governing_guidelines = '31 CFR Part 501 (OFAC); 31 CFR 1020.410(a) (Travel Rule $3K); IEEPA 50 U.S.C. 1701-1707; TWEA 50 U.S.C. 4301-4341; OFAC SDN/SSI Lists; OFAC 50% Rule; Regulation J 12 CFR 210; UCC 4A; FATF Recommendation 16; SWIFT standards',
  standards_of_creation = 'Travel Rule information for $3K+; OFAC screening at initiation/intermediary/receipt; SDN match handling (block/reject/license); 50% rule applied; OFAC license applications; Correspondent due diligence; Recurring wire authentication',
  soc_controls = 'C-216: OFAC automated at initiation; C-217: Travel Rule completeness; C-218: SDN escalation tested; C-219: 50% rule in algorithms; C-220: Correspondent DD refreshed annually; C-221: Wire callback for large/unusual; I-53: BSA 5 years; OFAC 5 years after unblocking'
WHERE name LIKE '%Wire Transfer%OFAC%';

-- B9. Correspondent Banking & MSBs (2)

UPDATE citizen_catalog SET
  governing_guidelines = 'USA PATRIOT Section 312 (31 CFR 1010.610); Section 313 (31 CFR 1010.630 shell bank prohibition); Section 319(b); FFIEC BSA/AML Correspondent chapter; FinCEN FIN-2014-A007; Wolfsberg Correspondent Principles',
  standards_of_creation = 'Due diligence per correspondent account; Shell bank certification; Correspondent AML program assessed; Jurisdictional risk assessed; Nested/payable-through controls; EDD for high-risk jurisdictions; Annual DD refresh',
  soc_controls = 'C-222: Shell bank certification refreshed; C-223: Correspondent risk rating monitored; C-224: Payable-through controls verified; C-225: Jurisdictional risk updated for FATF; I-54: 5 years after account closure'
WHERE name = 'Correspondent Banking Compliance';

UPDATE citizen_catalog SET
  governing_guidelines = '31 CFR 1010.100(ff) (MSB definition); 31 CFR 1022; 31 CFR 1022.380 (FinCEN registration); Cal. Fin. Code 2000-2176 (Money Transmission Act); Cal. Fin. Code 2030 (license); Cal. Fin. Code 2040 (net worth); FFIEC BSA/AML MSB chapter; FinCEN Form 107',
  standards_of_creation = 'FinCEN registration within 180 days; State license before operations per Fin. Code 2030; BSA/AML program; Agent supervision; Surety bond per state; Net worth per 2040; Biennial FinCEN re-registration',
  soc_controls = 'C-226: FinCEN registration current (biennial); C-227: State license maintained; C-228: Agent supervision operational; C-229: Net worth/surety bond monitored; C-230: BSA independently audited; I-55: BSA 5 years and state law'
WHERE name = 'Money Services Business';

-- B10. Prepaid Cards & Fintech (3)

UPDATE citizen_catalog SET
  governing_guidelines = 'Regulation E 12 CFR 1005.18 (prepaid); CFPB Prepaid Accounts Rule (2017/2019); 1005.18(b) (short/long-form disclosures); 1005.18(e) (overdraft/credit); 1005.20 (gift cards CARD Act); FinCEN BSA; State MTL',
  standards_of_creation = 'Short-form disclosure before acquisition; Long-form available; Fee schedule disclosed; Error resolution rights; Linked credit 30-day waiting per 1005.18(e); Gift card: no inactivity <12 months, expiry >5 years per 1005.20; BSA compliance',
  soc_controls = 'C-231: Short-form accuracy; C-232: Fee matches disclosed; C-233: Gift card compliance; C-234: Linked credit waiting enforced; I-56: 2 years per Reg E minimum'
WHERE name = 'Prepaid Card Compliance';

UPDATE citizen_catalog SET
  governing_guidelines = 'OCC Interpretive Letter #1176; OCC SPNB Framework; FDIC ILC Rule; OCC Bulletin 2013-29 (Third-Party Risk revised 2023); FDIC FIL-44-2008; Interagency Third-Party Guidance (2023); CFPB Larger Participant Rule; Cal. Fin. Code 90002',
  standards_of_creation = 'Bank partnership agreement with clear obligations; CMS extending to fintech; Consumer complaint handling defined; Data security/privacy documented; Model risk per OCC 2011-12 (SR 11-7); Fair lending in AI/ML documented; Third-party audits',
  soc_controls = 'C-235: Third-party risk assessment pre-partnership; C-236: Ongoing monitoring; C-237: Complaint routing tracked; C-238: Model governance with AI/ML bias testing; C-239: Data sharing per agreement; I-57: Per examination cycle'
WHERE name LIKE '%Fintech Partnership%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Dodd-Frank Section 1033 (12 U.S.C. 5533); CFPB Section 1033 Final Rule (2024); FDX API standards; FFIEC IT Handbook Information Security; OAuth 2.0/FAPI; Screen scraping prohibition timeline',
  standards_of_creation = 'Consumer authorization documented; API meeting FAPI/OAuth; Data minimization: only authorized data; Third-party recipient qualification; Consumer revocation mechanism; Data accuracy obligations; Screen scraping phase-out compliance',
  soc_controls = 'C-240: Consumer authorization tracked/revocable; C-241: API security tested; C-242: Recipient qualification verified; C-243: Data sharing logs; C-244: Revocation within required timeframe; I-58: 3 years per CFPB rule'
WHERE name LIKE '%Open Banking%';

-- B11. Mergers & PCA (2)

UPDATE citizen_catalog SET
  governing_guidelines = 'Bank Merger Act 12 U.S.C. 1828(c); Bank Holding Company Act 12 U.S.C. 1841-1850; Change in Control 12 U.S.C. 1817(j); 12 CFR Part 5 (OCC); 12 CFR Part 303 (FDIC); Hart-Scott-Rodino 15 U.S.C. 18a; DOJ Bank Merger Guidelines (2024); CRA in merger; Cal. Fin. Code',
  standards_of_creation = 'Merger application to federal regulator; HHI competitive analysis; CRA performance evaluated; Public notice and comment; Shareholder approval; Integration plan; DOJ antitrust clearance',
  soc_controls = 'C-245: Application tracking (30/60/90-day); C-246: Public comment compliance; C-247: Shareholder vote documentation; C-248: Integration checklist; I-59: Merger records permanent'
WHERE name LIKE '%Bank Merger%Acquisition%';

UPDATE citizen_catalog SET
  governing_guidelines = 'FDIA Section 38 (12 U.S.C. 1831o); 12 CFR Part 6 (OCC PCA); 12 CFR Part 324 (FDIC Basel III); 12 CFR Part 217 (Fed Basel III); 12 CFR Part 702 (NCUA); Basel III (CET1, Tier 1, Total, Leverage); Capital Conservation Buffer 2.5%; PCA categories',
  standards_of_creation = 'Call Report (FFIEC 031/041/051) quarterly; Capital ratios per Basel III; Capital plan maintained; Capital restoration plan if undercapitalized; Board notification of category changes; Dividend/repurchase approval documented',
  soc_controls = 'C-249: Capital ratios quarterly; C-250: PCA category reported; C-251: Capital restoration compliance; C-252: Dividend restrictions enforced; C-253: Board reporting; I-60: 10 years'
WHERE name LIKE '%Prompt Corrective Action%';

-- B12. Stress Testing & Examination (2)

UPDATE citizen_catalog SET
  governing_guidelines = 'Dodd-Frank Section 165(i); 12 CFR Part 252 (Fed); 12 CFR Part 46 (OCC); 12 CFR Part 325 (FDIC); Fed CCAR Instructions; Fed Supervisory Scenarios; SR 15-18; SR 11-7; Tailoring Rule (2019)',
  standards_of_creation = 'Severely adverse/adverse/baseline scenario modeling; 9-quarter capital projections; PPNR modeling; Credit loss by portfolio; Model documentation per SR 11-7; Independent validation; Board approval; Public disclosure',
  soc_controls = 'C-254: Scenario design documented; C-255: Model governance per SR 11-7; C-256: Independent validation; C-257: Board attestation; C-258: Public disclosure timely; I-61: 7 years'
WHERE name LIKE '%Stress Testing%';

UPDATE citizen_catalog SET
  governing_guidelines = '12 U.S.C. 1820 (FDIC exam authority); 12 U.S.C. 1784 (NCUA exam); 12 CFR Part 4 (OCC procedures); FFIEC CAMELS; NCUA CAMEL; FFIEC IT Rating; MRA/MRIA; Consent orders, CMPs',
  standards_of_creation = 'Examination preparation package; Board packages for all exam communications; MRA/MRIA response plans; Findings tracked to resolution; Consent order compliance; Corrective action plans with milestones; Board review documented',
  soc_controls = 'C-259: Request list tracked; C-260: MRA/MRIA remediation tracked; C-261: Board review documented; C-262: Corrective action milestones; I-62: Examination records permanent'
WHERE name LIKE '%Examination Liaison%';

-- B13. CDFI (1)

UPDATE citizen_catalog SET
  governing_guidelines = 'Riegle Act (12 U.S.C. 4701-4718); 12 CFR Part 1805; CDFI Certification Application; CDFI Annual Certification Report (ACR); CDFI Financial Assistance Award; NMTC; CDFI Bond Guarantee',
  standards_of_creation = 'Primary mission of community development; Target market defined/served; Development services provided; Accountability (board representation, advisory); Non-governmental entity; Annual ACR filed; Impact metrics collected',
  soc_controls = 'C-263: Target market tracked/reported; C-264: Board accountability verified; C-265: ACR timely/accurate; C-266: Award compliance tracked; I-63: 10 years for award records'
WHERE name = 'CDFI Certification';

-- SECTION C: TAX PREPARATION / ACCOUNTING (30 personas)

-- C1. Tax Preparer Registration (4)

UPDATE citizen_catalog SET
  governing_guidelines = 'IRC 6109(a)(4) (PTIN requirement); Treasury Decision 9501; 26 CFR 1.6109-2; IRC 6694 (preparer penalties); IRC 6695 (failure penalties); Cal. RTC 19167; IRC 7216 (unauthorized disclosure); Treasury Circular 230; IRS AFSP',
  standards_of_creation = 'PTIN via IRS Form W-12 or online; PTIN renewed annually; PTIN on every return; Copy furnished per IRC 6695(a); Return signed per 6695(b); Taxpayer consent per 7216; Due diligence Form 8867 for EITC/CTC/AOTC/HOH',
  soc_controls = 'C-267: PTIN validity annually; C-268: Preparer signature every return; C-269: Copy to taxpayer with confirmation; C-270: Form 8867 per return; C-271: Disclosure consents before sharing; I-64: 3 years per IRC 6107'
WHERE name LIKE '%PTIN Holder%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. BPC 22250-22259 (CA Tax Preparation Act); Cal. BPC 22251 (registration); Cal. BPC 22253 (60 hours initial, 20 hours CE); Cal. BPC 22255 ($5,000 surety bond); Cal. BPC 22258 (penalties); CTEC Provider Standards; FTB enforcement',
  standards_of_creation = 'CTEC registration before preparing CA returns; 60-hour qualifying education (initial); 20-hour CE annually; $5,000 surety bond; CTEC number on all CA returns; Registration renewed annually',
  soc_controls = 'C-272: CTEC registration current; C-273: Education certificates from CTEC-approved; C-274: Surety bond active $5,000; C-275: CTEC number on all CA returns; I-65: 4 years per FTB'
WHERE name = 'CTEC Registered';

UPDATE citizen_catalog SET
  governing_guidelines = 'Treasury Circular 230 (31 CFR Part 10); 31 CFR 10.3(c) (unlimited practice); 31 CFR 10.6(e) (72 hours CE per 3 years); 31 CFR 10.51 (disreputable conduct); 31 CFR 10.34 (standards); 31 U.S.C. 330; IRS SEE; NAEA Code of Ethics',
  standards_of_creation = 'Passed all 3 parts of SEE; Enrolled agent card from IRS; 72-hour CE per 3-year cycle; Unlimited IRS representation; Circular 230 practice standards; PTIN maintained; Due diligence per 10.34',
  soc_controls = 'C-276: Enrollment verified on IRS database; C-277: CE per 3-year cycle; C-278: Circular 230 compliance (competence, diligence, conflicts); C-279: OPR disciplinary check; I-66: 3 years per Circular 230 and IRC 6107'
WHERE name LIKE '%Enrolled Agent%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. BPC 5000-5158 (Accountancy Act); Cal. BPC 5076 (peer review); Cal. BPC 5076.1 (oversight); 16 CCR 12-99 (CBA regulations); Uniform Accountancy Act (NASBA/AICPA); AICPA Code; AICPA SSTS No. 1-7; Treasury Circular 230; 150-hour education; CBA CE 80 hours per 2 years',
  standards_of_creation = 'CPA license from CBA (education, exam, experience); Biennial renewal with CE; Firm registered per Cal. BPC 5058; Peer review per 5076 (A&A firms); Returns per SSTS and Circular 230; Engagement letter; Work papers supporting all positions',
  soc_controls = 'C-280: CPA active on CBA lookup; C-281: CE verified biennially; C-282: Peer review current; C-283: SSTS in work papers; C-284: Circular 230 compliance; C-285: Engagement letter before services; I-67: 7 years per CBA'
WHERE name LIKE '%Certified Public Accountant%';

-- C2. Tax Representation & Controversy (7)

UPDATE citizen_catalog SET
  governing_guidelines = 'Treasury Circular 230 (31 CFR Part 10); IRS Form 2848; IRS Form 8821; IRC 7521 (taxpayer rights); IRC 7803(a)(3) (Taxpayer Advocate); IRS Publication 1; Taxpayer Bill of Rights; IRM Part 4',
  standards_of_creation = 'Form 2848 filed with IRS CAF; Representative designation verified; Scope defined; Client communication documented; IRS notices tracked and responded; Examination workpapers; Appeals preparation; Statute Form 872 extensions tracked',
  soc_controls = 'C-286: Form 2848 accepted by CAF; C-287: Scope within authority; C-288: IRS deadlines tracked (30/60/90-day); C-289: Statute expiration monitored; C-290: Client communication log; I-68: 7 years after resolution'
WHERE name = 'IRS Audit Representative';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. RTC 19032-19087 (FTB examination); Cal. RTC 19041 (4-year SOL); Cal. RTC 19045 (6-year for 25%+ understatement); Cal. RTC 19057 (NPA); Cal. RTC 19331 (protest); Cal. RTC 19043 (no SOL for fraud); Cal. RTC 19167 (preparer penalties); OTA Rules; FTB Publication 1000',
  standards_of_creation = 'FTB 3520 POA executed; State workpapers per FTB audit standards; Protest within 60 days of NPA per 19331; OTA appeal within 30 days; CA conformity/nonconformity analysis; Amended returns when appropriate',
  soc_controls = 'C-291: FTB 3520 filed and accepted; C-292: FTB deadlines (60-day protest, 30-day appeal); C-293: Conformity analysis documented; C-294: SOL per Cal. RTC 19041; I-69: 7 years from filing or assessment'
WHERE name LIKE '%State Tax Audit Representative%';

UPDATE citizen_catalog SET
  governing_guidelines = 'IRC 7122 (compromise authority); 26 CFR 301.7122-1; IRS Form 656; IRS Form 433-A/B; IRM 5.8 (OIC); IRS Publication 594; Cal. RTC 19443 (FTB OIC); FTB Publication 1153',
  standards_of_creation = 'Form 656 and 433-A/B accurate; Application fee ($205 or waiver); Initial payment (20% lump sum or first installment); RCP calculated; All returns filed; Current estimated payments; 5-year monitoring compliance',
  soc_controls = 'C-295: RCP documented and supportable; C-296: All returns filed verified; C-297: Payment compliance during consideration; C-298: 5-year monitoring tracked; I-70: 7 years after acceptance/rejection'
WHERE name = 'Offer in Compromise';

UPDATE citizen_catalog SET
  governing_guidelines = 'IRC 6159 (installment agreements); IRC 6159(c) (guaranteed IA for $10K or less); 26 CFR 301.6159-1; IRS Form 9465; IRS Form 433-D; IRM 5.14; IRS OPA tool; CSED 10 years per IRC 6502',
  standards_of_creation = 'Form 9465 or online application; 433-A/B if required; Monthly payment to pay within CSED; User fee ($31-$225); All returns filed/current; DDIA or payroll deduction considered',
  soc_controls = 'C-299: CSED tracked per period; C-300: Payment compliance monitored; C-301: Default cure documented; I-71: 7 years after payoff'
WHERE name = 'Installment Agreement';

UPDATE citizen_catalog SET
  governing_guidelines = 'IRC 6015 (joint/several liability relief); IRC 6015(b) (innocent spouse); IRC 6015(c) (separation of liability); IRC 6015(f) (equitable relief); IRS Form 8857; Rev. Proc. 2013-34; IRM 25.15; IRC 6015(e) (Tax Court review)',
  standards_of_creation = 'Form 8857 with detailed narrative; Supporting documentation (financial, abuse, knowledge); 2-year deadline for 6015(b)/(c); No deadline for 6015(f) per Rev. Proc. 2013-34; Non-requesting spouse notification; Tax Court petition if denied (90 days)',
  soc_controls = 'C-302: Filing deadline per relief type; C-303: Evidence organized; C-304: Non-requesting spouse notification; C-305: Tax Court deadline if denial; I-72: 7 years'
WHERE name = 'Innocent Spouse';

UPDATE citizen_catalog SET
  governing_guidelines = 'IRC 6651 (failure to file/pay); IRC 6662 (accuracy-related); IRC 6664(c) (reasonable cause); IRM 20.1 (Penalty Handbook); IRS FTA policy (IRM 20.1.1.3.6.1); Rev. Proc. 84-35; Cal. RTC 19132, 19133',
  standards_of_creation = 'Penalty assessment reviewed for accuracy; Reasonable cause statement with facts; FTA eligibility assessed (3 years clean); Written request to IRS/FTB; Statutory authority cited; Supporting documentation attached',
  soc_controls = 'C-306: Penalty computation verified; C-307: FTA screened first; C-308: Reasonable cause standards met; I-73: 7 years'
WHERE name = 'Penalty Abatement';

UPDATE citizen_catalog SET
  governing_guidelines = 'IRC 6213 (Tax Court petition, 90 days from NOD); IRC 7463 (small case $50K or less); Tax Court Rules of Practice; IRC 6330(d) (CDP 30 days); IRC 6015(e) (innocent spouse 90 days); Tax Court DAWSON system; Circular 230; $50 admission',
  standards_of_creation = 'Petition within 90 days of NOD (150 if outside US); Tax Court Form 1 or 2; $60 filing fee; Stipulated facts; Trial memorandum/brief; Settlement negotiations documented; Post-trial briefs',
  soc_controls = 'C-309: 90-day deadline from NOD mailing; C-310: DAWSON filing confirmed; C-311: Discovery deadlines; C-312: Settlement authority documented; I-74: 10 years after final order'
WHERE name = 'Tax Court Petition';

-- C3. Tax Planning & Opinions (2)

UPDATE citizen_catalog SET
  governing_guidelines = 'Treasury Circular 230 (31 CFR 10.35, 10.37); AICPA SSTS No. 1, 7; IRC 6662 (substantial authority/reasonable basis); IRC 6694 (preparer penalties); IRC 6111, 6112 (reportable transaction disclosure/list)',
  standards_of_creation = 'Written engagement letter; Tax authority analysis (substantial authority, MLTN); Planning memorandum with analysis; Risks and alternatives documented; Reportable transaction analysis per 6111; Material advisor per 6112; Annual review',
  soc_controls = 'C-313: Engagement letter before planning; C-314: Authority analysis per SSTS No. 1; C-315: Reportable transaction screening; C-316: Conflicts disclosed per Circular 230 10.29; I-75: 7 years'
WHERE name = 'Tax Planning Engagement';

UPDATE citizen_catalog SET
  governing_guidelines = 'Treasury Circular 230 (31 CFR 10.37); 10.37(a) (no unreasonable assumptions); 10.37(b) (all relevant facts); 10.37(c) (limitations disclosed); ABA Model Rules 1.1, 2.3; AICPA SSTS No. 7; IRC 6662 (confidence levels); 31 CFR 1.6011-4',
  standards_of_creation = 'Factual assumptions stated and reasonable; Legal analysis addressing all authorities; Confidence level stated (will, should, MLTN, substantial authority); Contrary authority addressed; Limitations disclosed; Third-party reliance addressed; No audit-avoidance assumption',
  soc_controls = 'C-317: Assumptions verified with client; C-318: Legal research documented; C-319: Confidence level appropriate; C-320: Contrary authority included; I-76: Retained permanently by issuer'
WHERE name = 'Tax Opinion Letter';

-- C4. Accounting Engagements (3)

UPDATE citizen_catalog SET
  governing_guidelines = 'SSARS No. 21 (AR-C 80); AICPA Code; CBA licensing; SSARS No. 25 (materiality in compilation)',
  standards_of_creation = 'Engagement letter per AR-C 80.11; No assurance stated; Industry knowledge applied; Financial statements per applicable framework (GAAP, OCBOA, tax basis); Compilation report per AR-C 80; Independence disclosed if impaired; Management responsibility acknowledged',
  soc_controls = 'C-321: Engagement letter before compilation; C-322: Framework identified; C-323: Independence assessed/disclosed; C-324: Report per AR-C 80; I-77: 7 years per CBA'
WHERE name = 'Compilation Engagement';

UPDATE citizen_catalog SET
  governing_guidelines = 'SSARS No. 21 (AR-C 90); AR-C 90.27-62 (inquiries, analytical procedures); AICPA Code (independence required); CBA licensing; SSARS No. 25 (materiality in review)',
  standards_of_creation = 'Engagement letter per AR-C 90; Limited assurance provided; Independence required; Inquiries documented; Analytical procedures documented; Management representation letter; Review report per AR-C 90',
  soc_controls = 'C-325: Independence confirmed; C-326: Engagement letter executed; C-327: Inquiry/analytical documentation complete; C-328: Management representation obtained; C-329: Report per AR-C 90; I-78: 7 years per CBA'
WHERE name = 'Review Engagement';

UPDATE citizen_catalog SET
  governing_guidelines = 'SAS (AU-C sections); AU-C 200, 210, 230, 315, 330, 700; GAAS; PCAOB AS 1001-3315 (public); AICPA Code ET 1.200 (independence); SOX 201-206 (issuer independence); SAS 145 (risk assessment)',
  standards_of_creation = 'Engagement letter per AU-C 210; Planning (materiality, risk, strategy); IC understanding/testing per AU-C 315; Substantive procedures per AU-C 330; Sufficient evidence; Opinion per AU-C 700; Documentation per AU-C 230 (60-day assembly, 5-year retention); Management rep per AU-C 580; Governance per AU-C 260',
  soc_controls = 'C-330: Independence throughout; C-331: Materiality determined; C-332: Risk assessment per SAS 145; C-333: Sufficient evidence; C-334: Documentation within 60 days; C-335: Management rep obtained; C-336: Governance communication; I-79: 5 years AU-C 230 (7 per PCAOB)'
WHERE name = 'Audit Engagement';

-- C5. Attestation & Specialized (2)

UPDATE citizen_catalog SET
  governing_guidelines = 'SSAE (AT-C 105, 205, 210, 215, 320); AICPA SOC 1/2/3 reporting; AICPA Code',
  standards_of_creation = 'Engagement letter specifying type (examination, review, AUP); Subject matter and criteria identified; Examination: sufficient evidence; Review: limited assurance; AUP: findings without opinion; SOC per AT-C 320; Report per applicable section',
  soc_controls = 'C-337: Engagement type classified; C-338: Subject matter/criteria documented; C-339: Evidence per engagement type; C-340: Report per AT-C section; I-80: 7 years'
WHERE name = 'Attestation Engagement';

UPDATE citizen_catalog SET
  governing_guidelines = 'AT-C 215; SSAE No. 19 (general use allowed 2021); AICPA Code; Independence required',
  standards_of_creation = 'Engagement letter with agreed procedures; Procedures performed as specified; Findings reported factually; No opinion/assurance provided (explicit); General use permitted post-SSAE 19; Responsible party acknowledgment',
  soc_controls = 'C-341: Procedures match engagement letter; C-342: Findings factual; C-343: No assurance language; I-81: 7 years'
WHERE name = 'Agreed-Upon Procedures';

-- C6. Forensic Accounting & Valuation (2)

UPDATE citizen_catalog SET
  governing_guidelines = 'AICPA SSFS; AICPA Practice Aid: Forensic Investigations; ACFE Code; ACFE Manual; Federal Rules of Evidence 702 (Daubert); Cal. Evid. Code 720; AICPA Code (if CPA); Consulting vs testifying standards',
  standards_of_creation = 'Engagement letter (investigation, litigation support, expert witness); Investigation plan; Evidence chain of custody; Reproducible methodology; Report per AICPA forensic guidance; Expert report per FRCP 26(a)(2) or Cal. CCP 2034; Working papers supporting conclusions',
  soc_controls = 'C-344: Scope defined (consulting vs testifying); C-345: Evidence chain maintained; C-346: Methodology defensible under Daubert/Kelly; C-347: Expert report disclosure met; I-82: 10+ years per litigation hold'
WHERE name LIKE '%Forensic Accountant%';

UPDATE citizen_catalog SET
  governing_guidelines = 'AICPA SSVS No. 1; USPAP (if real property); NACVA Standards; ASA Business Valuation Standards; IRC 409A (deferred comp); IRC 2031 (estate valuation); Rev. Rul. 59-60; Treasury Reg 20.2031-1 through -8; FMV standard',
  standards_of_creation = 'Engagement letter per SSVS No. 1; Report type (detailed, summary, calculation); Standard of value (FMV, fair value, investment); Premise (going concern, liquidation); Valuation date; Three approaches (income, market, asset/cost); Discounts/premiums (DLOM, DLOC); Conclusion with reconciliation',
  soc_controls = 'C-348: Engagement letter executed; C-349: Standard/premise documented; C-350: Three approaches considered; C-351: Discount/premium support; C-352: Valuation date consistent; I-83: 7 years (longer for estate/gift)'
WHERE name = 'Business Valuation';

-- C7. SOX & PCAOB (3)

UPDATE citizen_catalog SET
  governing_guidelines = 'SOX 2002 (P.L. 107-204); SOX 302, 404(a), 404(b), 802, 906; PCAOB AS 2201, 1301; COSO IC Framework (2013); SEC Rules 13a-14, 15d-14',
  standards_of_creation = 'Management ICFR assessment per SOX 404(a); External auditor integrated audit per PCAOB AS 2201; COSO 17 principles across 5 components; CEO/CFO certifications per 302 and 906; Remediation plans; Audit committee communications per AS 1301',
  soc_controls = 'C-353: COSO across 5 components; C-354: Control testing documented; C-355: Material weakness remediation; C-356: CEO/CFO subcertification cascade; C-357: Retention per SOX 802 (7 years); I-84: 7 years'
WHERE name LIKE '%Sarbanes-Oxley%';

UPDATE citizen_catalog SET
  governing_guidelines = 'SOX Section 104; PCAOB Rule 4000; Rule 4003 (annual for 100+ issuers, triennial for fewer); PCAOB AS 1220; PCAOB QC 1000 (2025); Inspection Report procedures',
  standards_of_creation = 'QC system per QC 1000; EQR per AS 1220 for each issuer; Inspection preparation package; Part I response within 12 months; Part II remediation; Tone at the top documented; Root cause analysis',
  soc_controls = 'C-358: QC system current; C-359: EQR for every issuer; C-360: Inspection remediation tracked; C-361: Root cause analysis; I-85: 7 years per QC 1000'
WHERE name = 'PCAOB Inspection';

UPDATE citizen_catalog SET
  governing_guidelines = 'AICPA Peer Review Standards; Cal. BPC 5076 (peer review); Cal. BPC 5076.1 (oversight); AICPA Peer Review Manual; Three types: System, Engagement, Report; 3-year cycle',
  standards_of_creation = 'Peer review within 3 years; Qualified team captain; System review: entire QC; Engagement review: selected workpapers; Report issued (pass, pass with deficiency, fail); Letter of response; Corrective action; AICPA Board acceptance',
  soc_controls = 'C-362: Review within 3-year cycle; C-363: Team captain qualifications; C-364: Corrective actions verified; C-365: CBA notification (CA requirement); I-86: 6 years per AICPA'
WHERE name = 'Peer Review Specialist';

-- C8. Internal Audit & Management Advisory (2)

UPDATE citizen_catalog SET
  governing_guidelines = 'IIA International Standards (Global Internal Audit Standards 2025); IIA Standard 9.1, 9.4, 9.5, 10.1, 13; IIA Code of Ethics; COSO IC Framework (2013); COSO ERM (2017); SOX 404',
  standards_of_creation = 'Internal audit charter approved by board; Risk-based plan approved annually; Engagement planning (scope, objectives, resources); Fieldwork with sufficient evidence; Findings rated by severity; Report to management/audit committee; Management action plans; Follow-up; QAIP with external every 5 years',
  soc_controls = 'C-366: Charter approved and current; C-367: Independence maintained; C-368: Risk-based coverage adequate; C-369: Findings tracked through remediation; C-370: QAIP (internal annually, external every 5 years); I-87: 7 years'
WHERE name LIKE '%Internal Auditor%';

UPDATE citizen_catalog SET
  governing_guidelines = 'AU-C 265 (IC Matters); AU-C 260 (Governance Communication); PCAOB AS 1305; AICPA Professional Standards; Material weakness vs significant deficiency',
  standards_of_creation = 'Deficiencies identified documented; Classification (MW, SD, other); Written communication of MW/SD required; Management letter for other (discretionary); Constructive recommendations; Management response; Reported to governance per AU-C 260',
  soc_controls = 'C-371: Classification documented/reviewed; C-372: Required communications delivered; C-373: Management response obtained/tracked; I-88: With audit workpapers 5-7 years'
WHERE name = 'Management Letter';

-- C9. Bookkeeping & Payroll (2)

UPDATE citizen_catalog SET
  governing_guidelines = 'SSARS AR-C 70 (Preparation -- non-attest); AICPA Code (if CPA); IRS Pub 15 (if payroll); GAAP or OCBOA; Tax basis accounting; Cal. BPC 5052 (UPL prohibition)',
  standards_of_creation = 'Engagement letter recommended; Financial statements per framework; No assurance legend per AR-C 70; Chart of accounts; Monthly bank reconciliations; Segregation of duties documented; Record retention schedule',
  soc_controls = 'C-374: Scope defined; C-375: Framework on statements; C-376: Bank recs completed/reviewed; C-377: Segregation or compensating controls; I-89: 7 years per IRS'
WHERE name = 'Bookkeeping Service';

UPDATE citizen_catalog SET
  governing_guidelines = 'IRC Chapter 21 (FICA); IRC Chapter 24 (withholding); IRC 3401-3406; IRC 6721-6724 (info return penalties); IRS Form 941; Form 940; Form W-2; Cal. UIC 13000-13090; EDD DE 9/DE 9C; DOL FLSA; IRC 7501 (trust fund); IRC 6672 (trust fund recovery)',
  standards_of_creation = 'Employee classification (W-2 vs 1099); Withholding per W-4/IRS tables; Deposits per IRS schedule; Form 941 quarterly; W-2 by January 31; DE 9/DE 9C quarterly; Trust fund taxes segregated per IRC 7501; Annual reconciliation (941=W-2=W-3)',
  soc_controls = 'C-378: Deposit deadlines tracked; C-379: Classification documented; C-380: W-4 forms current; C-381: Annual reconciliation completed; C-382: Trust fund segregated per IRC 7501; C-383: EDD quarterly tracked; I-90: 4 years IRS / 7 recommended'
WHERE name = 'Payroll Tax Compliance';

-- C10. Sales/Use Tax & Property Tax (2)

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. RTC 6001-7176; Cal. RTC 6051 (sales tax); Cal. RTC 6201 (use tax); Cal. RTC 6091 (sellers permit); Cal. RTC 6452 (failure to collect); South Dakota v. Wayfair (economic nexus); Cal. RTC 6203(c)(4) ($500K threshold); SSUTA; MTC; CDTFA Pub 73',
  standards_of_creation = 'Sellers permit from CDTFA; Taxability determinations documented; Exemption certificates (CDTFA-230); Returns per assigned frequency; Economic nexus analysis for out-of-state; Use tax self-assessed; District tax rates by location',
  soc_controls = 'C-384: Sellers permit active/displayed; C-385: Exemption validity verified; C-386: Filing deadlines tracked; C-387: Economic nexus monitoring; C-388: Tax rate per location (with district); I-91: 4 years per Cal. RTC 7097'
WHERE name LIKE '%Sales%Use Tax Compliance%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Const. Art. XIII A (Prop 13); Cal. RTC 401-469; Cal. RTC 1601-1636 (AAB); Cal. RTC 1603 (July 2 - Sept 15 filing); Cal. RTC 51 (change in ownership); Cal. RTC 69.5 (Prop 19); Cal. RTC 110.1 (Prop 8 decline); SBE Rules 301-326; Assessors Handbook',
  standards_of_creation = 'AAB application within deadline per RTC 1603; Comparable sales analysis; Income approach (income property); Cost approach (special-use); Prop 13 base year analysis; Prop 8 decline evidence; AAB hearing brief; Expert appraiser report',
  soc_controls = 'C-389: Filing deadline (July 2-Sept 15 regular; 60 days supplemental); C-390: Comparable sales sourced; C-391: Methodology appropriate; C-392: AAB hearing preparation documented; I-92: 5 years after resolution'
WHERE name = 'Property Tax Assessment';

-- C11. International Tax Compliance (1)

UPDATE citizen_catalog SET
  governing_guidelines = 'BSA 31 U.S.C. 5314 (FBAR); 31 CFR 1010.350 ($10K aggregate); FinCEN Form 114; FATCA IRC 6038D; Form 8938; IRC 6038 (Form 5471 CFCs); IRC 6038B (Form 8865); IRC 6048 (Form 3520/3520-A foreign trusts); IRC 951-965 (Subpart F/GILTI); IRC 250 (FDII); OECD BEPS; OECD Pillar Two',
  standards_of_creation = 'FBAR via BSA E-Filing by April 15 (Oct 15 extended); Form 8938 with return (thresholds $50K-$600K); Form 5471 per CFC with 10%+ shareholder; Form 8865; Form 3520/3520-A; Subpart F/GILTI calculated; Transfer pricing per IRC 6662(e); Form 8975 country-by-country',
  soc_controls = 'C-393: FBAR deadline tracked; C-394: $10K aggregation monitored; C-395: Form 8938 threshold analysis; C-396: CFC/partnership triggers monitored; C-397: Transfer pricing contemporaneous; C-398: Penalty exposure assessed; I-93: FBAR 6 years; income tax 7 years'
WHERE name LIKE '%International Tax Compliance%';

-- ============================================================
-- VERIFICATION: Count total UPDATE statements
-- Expected: 213 (60 research + 60 financial + 93 insurance/banking/tax)
-- ============================================================

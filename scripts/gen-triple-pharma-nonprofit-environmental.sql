-- Triple Constraint: Pharma/Biotech/Food + Nonprofit/Religious/International + Environmental/Tribal/Cannabis/Gaming
-- 245 Persona Citizens: governing_guidelines + standards_of_creation + soc_controls
-- Generated from catalog-3000 source documents
-- All citations are real statutes, regulations, professional standards, and audit frameworks
-- Date: 2026-03-29


-- ═══════════════════════════════════════════════════════════════
-- PHARMACEUTICAL, BIOTECHNOLOGY & FOOD SAFETY
-- ═══════════════════════════════════════════════════════════════

-- PH-001: Regulatory Affairs Director
UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR Part 314 (Applications for FDA Approval to Market a New Drug — NDA); 21 CFR Part 314 Subpart C (Abbreviated New Drug Applications — ANDA); 21 CFR Part 601 (Licensing of Biological Products — BLA); Federal Food, Drug, and Cosmetic Act (FD&C Act) § 505 (21 USC 355); Biologics Price Competition and Innovation Act (BPCIA) § 351(k) (42 USC 262(k)); FDA Modernization Act § 112 (21 USC 356); Orphan Drug Act (21 USC 360aa-360ee); 21 CFR Part 316 (Orphan Drugs)',
  standards_of_creation = 'FDA Guidance: Content and Format of NDA Applications (CTD/eCTD format — ICH M4); ICH M1 (Medical Dictionary for Regulatory Activities — MedDRA); ICH M2 (Electronic Standards for Transmission of Regulatory Information); ICH M4 (Common Technical Document — CTD); FDA eCTD Technical Conformance Guide; FDA Guidance for Industry: ANDAs — Pharmaceutical Equivalence; RAPS Regulatory Affairs Certification (RAC) Body of Knowledge; FDA Guidance: Biosimilar Product Applications (Purple Book procedures)',
  soc_controls = 'FDA ESG (Electronic Submissions Gateway) validation controls; 21 CFR Part 11 (Electronic Records; Electronic Signatures); SOC 2 Type II (eCTD submission system controls); FDA AIMS (Application Integrity Management System) audit trail; Submission acknowledgment/receipt verification protocols'
WHERE name = 'Regulatory Affairs Director';

-- PH-002: Regulatory Affairs Specialist — CMC
UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR Part 314.50(d)(1) (CMC section of NDA); 21 CFR Parts 210-211 (cGMP for Finished Pharmaceuticals); ICH Q1-Q14 (Quality Guidelines — stability, impurities, specifications, analytical validation); 21 CFR Part 211.186-188 (Master production and control records)',
  standards_of_creation = 'ICH Q1A(R2) (Stability Testing of New Drug Substances and Products); ICH Q2(R1) (Validation of Analytical Procedures); ICH Q3A/Q3B (Impurities in New Drug Substances/Products); ICH Q6A (Specifications: Test Procedures and Acceptance Criteria); ICH Q8(R2) (Pharmaceutical Development); ICH Q12 (Lifecycle Management of CMC Information); FDA Guidance: Quality by Design (QbD) for ANDAs',
  soc_controls = '21 CFR Part 11 (electronic batch records); SOC 2 Type II (LIMS and stability data systems); USP <1058> Analytical Instrument Qualification; Data integrity controls per FDA Data Integrity Guidance (2018)'
WHERE name = 'Regulatory Affairs Specialist — CMC';

-- PH-003: Regulatory Affairs Specialist — Labeling
UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR Part 201 (Drug Labeling); 21 CFR Part 202 (Prescription Drug Advertising); 21 CFR § 314.50(e) (Labeling section of NDA); FD&C Act § 502 (21 USC 352 — Misbranded Drugs); FDA Amendments Act § 901 (DTC advertising requirements); Physician Labeling Rule (PLR) — 21 CFR § 201.56-57',
  standards_of_creation = 'FDA Structured Product Labeling (SPL) format; FDA Guidance: Labeling for Human Prescription Drug and Biological Products; FDA Physician Labeling Rule content requirements; USP standards for drug nomenclature and descriptions; FDA Guidance: Product-Specific Guidances (PSGs) for labeling',
  soc_controls = '21 CFR Part 11 (SPL submission integrity); FDA DailyMed submission validation; SOC 2 Type II (labeling management system); Promotional review committee documentation controls'
WHERE name = 'Regulatory Affairs Specialist — Labeling';

-- PH-004: Patent Attorney — Pharmaceutical
UPDATE citizen_catalog SET
  governing_guidelines = 'Drug Price Competition and Patent Term Restoration Act (Hatch-Waxman Act) (21 USC 355(j)); 35 USC 154 (Patent Term); 35 USC 156 (Patent Term Extension); 35 USC 271(e) (Safe Harbor / Bolar Amendment); 21 CFR § 314.53 (Listing of Patent Information — Orange Book); BPCIA Patent Dance provisions (42 USC 262(l)); 37 CFR Part 1 (USPTO Rules of Practice in Patent Cases)',
  standards_of_creation = 'USPTO Manual of Patent Examining Procedure (MPEP); 37 CFR 1.52-1.58 (Patent application format requirements); USPTO Patent Center electronic filing standards; Orange Book listing procedures (FDA guidance); Purple Book listing procedures for biologics; Paragraph IV certification procedures (ANDA filings)',
  soc_controls = 'USPTO Patent Center authentication and filing controls; 37 CFR 1.4(d) (Electronic signature requirements); Attorney-client privilege documentation protocols; Patent prosecution file wrapper integrity'
WHERE name = 'Patent Attorney — Pharmaceutical';

-- PH-005: Principal Investigator (Clinical Trials)
UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR Part 312 (Investigational New Drug Application — IND); 21 CFR Part 312 Subpart D (Responsibilities of Sponsors and Investigators); 21 CFR § 312.62 (Investigator recordkeeping and record retention); 21 CFR § 312.64 (Investigator reports); 45 CFR Part 46 (Common Rule — Protection of Human Subjects); 42 USC 289 (Federal Policy for Protection of Human Subjects)',
  standards_of_creation = 'ICH E6(R2) (Good Clinical Practice — GCP); ICH E8(R1) (General Considerations for Clinical Studies); ICH E9(R1) (Statistical Principles for Clinical Trials); Declaration of Helsinki (ethical principles for medical research); CITI Program Training requirements; FDA Guidance: Investigator Responsibilities — Protecting the Rights, Safety, and Welfare of Study Subjects',
  soc_controls = '21 CFR Part 11 (electronic case report forms, EDC systems); SOC 2 Type II (electronic data capture — EDC system controls); FDA BIMO (Bioresearch Monitoring) inspection readiness; GCP audit trail requirements per ICH E6(R2) § 5.18; Clinical trial registration (ClinicalTrials.gov) per FDAAA § 801'
WHERE name = 'Principal Investigator (Clinical Trials)';

-- PH-006: Clinical Research Associate (CRA) / Monitor
UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR § 312.50-312.56 (Sponsor responsibilities — monitoring); 21 CFR § 312.68 (FDA inspection of sponsor''s records); ICH E6(R2) § 5.18 (Monitoring); 45 CFR § 46.109 (IRB review of research — monitoring provisions)',
  standards_of_creation = 'ICH E6(R2) § 5.18.1-5.18.7 (Purpose, selection, qualifications of monitors; monitoring procedures); ACRP Certification (CCRA) Body of Knowledge; SoCRA Certification (CCRP) Body of Knowledge; Risk-Based Monitoring per FDA Guidance (2013); TransCelerate Risk-Based Quality Management framework',
  soc_controls = 'SOC 2 Type II (monitoring visit report systems); EDC system audit trail verification; Source data verification (SDV) documentation controls; Investigator site file (ISF) completeness checklists; 21 CFR Part 11 compliance for electronic monitoring reports'
WHERE name = 'Clinical Research Associate (CRA) / Monitor';

-- PH-007: IRB Chair / IRB Administrator
UPDATE citizen_catalog SET
  governing_guidelines = '45 CFR Part 46 Subparts A-D (Common Rule — IRB requirements); 21 CFR Part 56 (Institutional Review Boards); 21 CFR § 56.108 (IRB functions and operations); 21 CFR § 56.109 (IRB review of research); 21 CFR § 56.111 (Criteria for IRB approval of research); 42 USC 289(a) (Federal Policy for Protection of Human Subjects)',
  standards_of_creation = 'OHRP IRB Guidebook; AAHRPP Accreditation Standards (Domain I-III); ICH E6(R2) § 3 (IRB/IEC responsibilities); OHRP Guidance on IRB Continuing Review; SACHRP (Secretary''s Advisory Committee) Recommendations; FDA Information Sheets for IRBs (2024 update)',
  soc_controls = 'AAHRPP accreditation audit requirements; IRB meeting minutes documentation standards; Protocol deviation tracking and reporting systems; SOC 2 Type II (IRB electronic management systems); FWA (Federalwide Assurance) registration (OHRP)'
WHERE name = 'IRB Chair / IRB Administrator';

-- PH-008: Bioethicist — Clinical Research
UPDATE citizen_catalog SET
  governing_guidelines = '45 CFR Part 46 Subparts B-D (Vulnerable populations — pregnant women, prisoners, children); 21 CFR Part 50 (Protection of Human Subjects — informed consent); 21 CFR Part 50 Subpart D (Additional Safeguards for Children); Belmont Report (1979) — Ethical Principles and Guidelines; National Research Act (PL 93-348)',
  standards_of_creation = 'ASBH Core Competencies for Healthcare Ethics Consultation; Belmont Report framework (Respect for Persons, Beneficence, Justice); Nuffield Council on Bioethics Guidelines; CIOMS International Ethical Guidelines for Biomedical Research (2016); UNESCO Universal Declaration on Bioethics and Human Rights; NIH Bioethics Resources guidance documents',
  soc_controls = 'Ethics consultation documentation standards; Conflict of interest disclosure and management protocols; IRB/Ethics committee cross-referencing controls; Vulnerable population protection verification checklists'
WHERE name = 'Bioethicist — Clinical Research';

-- PH-009: Biostatistician — Clinical Trials
UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR § 314.50(d)(5)(vi) (Statistical section of NDA); ICH E9(R1) (Statistical Principles for Clinical Trials — Addendum on Estimands); 21 CFR Part 312 (IND statistical analysis plans); FDA Guidance: Adaptive Designs for Clinical Trials (2019)',
  standards_of_creation = 'ICH E9 (Statistical Principles for Clinical Trials); ICH E9(R1) Addendum (Estimands and Sensitivity Analysis); ICH E10 (Choice of Control Group); ICH E17 (Multi-Regional Clinical Trials); FDA Guidance: Multiple Endpoints in Clinical Trials (2022); ASA Ethical Guidelines for Statistical Practice; CONSORT Statement (reporting of randomized controlled trials)',
  soc_controls = '21 CFR Part 11 (electronic statistical datasets — CDISC standards); CDISC SDTM (Study Data Tabulation Model) validation; CDISC ADaM (Analysis Data Model) validation; SOC 2 Type II (statistical computing environment controls); SAS/R validation per FDA Statistical Software guidance; Define.xml metadata integrity checks'
WHERE name = 'Biostatistician — Clinical Trials';

-- PH-010: Clinical Data Manager
UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR Part 11 (Electronic Records; Electronic Signatures); 21 CFR § 312.62 (Investigator recordkeeping); ICH E6(R2) § 5.5 (Data Management); FDA Guidance: Electronic Source Data in Clinical Investigations (2013)',
  standards_of_creation = 'SCDM Good Clinical Data Management Practices (GCDMP) v6; CDISC CDASH (Clinical Data Acquisition Standards Harmonization); CDISC SDTM (Study Data Tabulation Model); CDISC ODM (Operational Data Model); SCDM Certification (CCDM) Body of Knowledge; FDA Data Standards Catalog (required submission formats)',
  soc_controls = '21 CFR Part 11 compliance (EDC systems); SOC 2 Type II (EDC platform — Medidata, Veeva, Oracle); Database lock procedures and audit trails; Data validation rules (edit checks) documentation; Query management system controls; ALCOA+ data integrity principles (Attributable, Legible, Contemporaneous, Original, Accurate)'
WHERE name = 'Clinical Data Manager';

-- PH-011: Drug Safety Physician
UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR § 312.32 (IND Safety Reporting); 21 CFR § 314.80 (Postmarketing Reporting of Adverse Drug Experiences — NDA); 21 CFR § 314.81 (Other Postmarketing Reports); 21 CFR § 600.80 (Postmarketing Reporting for Biologics); FD&C Act § 505-1 (21 USC 355-1 — REMS)',
  standards_of_creation = 'ICH E2A (Clinical Safety Data Management — Definitions and Standards); ICH E2B(R3) (Electronic Transmission of ICSRs); ICH E2C(R2) (Periodic Benefit-Risk Evaluation Report — PBRER); ICH E2D (Post-Approval Safety Data Management); ICH E2E (Pharmacovigilance Planning); MedDRA coding standards for adverse event classification; CIOMS I-X Working Group Reports',
  soc_controls = 'FDA MedWatch Form 3500A validation; FAERS (FDA Adverse Event Reporting System) submission controls; SOC 2 Type II (safety database systems — Argus, ArisGlobal); Signal detection and analysis audit trails; 15-day/7-day expedited reporting timeline verification; REMS assessment reporting controls'
WHERE name = 'Drug Safety Physician';

-- PH-012: Pharmacovigilance Specialist
UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR § 314.80-81 (NDA postmarketing reporting); 21 CFR § 312.32 (IND safety reporting); 21 CFR § 600.80 (Biologics postmarketing reporting); FDA Safety Reporting Portal requirements; EU Pharmacovigilance Directive 2010/84/EU (for global operations)',
  standards_of_creation = 'ICH E2B(R3) (Individual Case Safety Report — ICSR format); ICH E2A (definitions of adverse events vs. adverse reactions); MedDRA (Medical Dictionary for Regulatory Activities) coding; WHO-ART (for legacy coding); CIOMS Form for ICSR reporting; NCI CTCAE (Common Terminology Criteria for Adverse Events) for oncology',
  soc_controls = 'Safety database (Argus, ArisGlobal) validation and 21 CFR Part 11 compliance; ICSR quality review checklists; Duplicate detection algorithms; Case processing timeline tracking (regulatory clock); Aggregate report generation controls (PSUR/PBRER)'
WHERE name = 'Pharmacovigilance Specialist';

-- PH-013: REMS Program Manager
UPDATE citizen_catalog SET
  governing_guidelines = 'FD&C Act § 505-1 (21 USC 355-1 — Risk Evaluation and Mitigation Strategies); FDA Amendments Act of 2007 (FDAAA) Title IX; 21 CFR § 314.520 (Approval with a REMS); FDA REMS Integration Initiative guidance documents',
  standards_of_creation = 'FDA Guidance: Format and Content of a REMS Document (2017); FDA Guidance: REMS Assessment — Planning and Reporting (2019); Elements to Assure Safe Use (ETASU) implementation specifications; Communication plans format requirements; Medication Guide formatting standards (21 CFR Part 208); FDA REMS@FDA website listing requirements',
  soc_controls = 'REMS knowledge assessment and survey validation; Patient/prescriber enrollment system controls; Pharmacy certification system controls; REMS assessment reporting data integrity; SOC 2 Type II (REMS IT platform); FDA REMS modification tracking'
WHERE name = 'REMS Program Manager';

-- PH-014: Drug Recall Coordinator
UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR Part 7 (Enforcement Policy — Recalls); 21 CFR § 7.40-7.59 (Recall procedures); FD&C Act § 569C (Mandatory Recall Authority — drugs); 21 CFR § 211.198 (Complaint files — triggers for recall consideration); 21 CFR § 314.81(b)(1) (Field Alert Reports — FARs); FDA Recall Classification system (Class I/II/III)',
  standards_of_creation = 'FDA Guidance: Product Recalls Including Removals and Corrections; FDA Recall Initiation documentation requirements; FDA Recall Status Report format; Health Hazard Evaluation (HHE) documentation standards; Press release and public notification templates (FDA format); Recall effectiveness check documentation standards; Distribution records traceability requirements (21 CFR § 211.196)',
  soc_controls = 'FDA RES (Recall Enterprise System) submission controls; Product traceability system audit trails; Customer/wholesaler notification tracking; Recall effectiveness verification documentation; SOC 2 Type II (ERP/distribution systems); Returned product reconciliation controls'
WHERE name = 'Drug Recall Coordinator';

-- PH-015: Quality Assurance Director — Pharmaceutical
UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR Part 210 (cGMP General); 21 CFR Part 211 (cGMP for Finished Pharmaceuticals); 21 CFR Part 4 (cGMP for Combination Products); 21 CFR Part 600 (Biological Products — General); FD&C Act § 501(a)(2)(B) (21 USC 351 — Adulterated drugs); Drug Supply Chain Security Act (DSCSA) (Title II of DQSA)',
  standards_of_creation = 'ICH Q7 (Good Manufacturing Practice for Active Pharmaceutical Ingredients); ICH Q9 (Quality Risk Management); ICH Q10 (Pharmaceutical Quality System); PDA Technical Reports (Parenteral Drug Association); ISPE Baseline Guides (Facility Design, Commissioning/Qualification); USP General Chapters <1> through <1251> (applicable compendia); ASTM E2500 (Specification, Design, and Verification of Pharmaceutical Manufacturing Systems)',
  soc_controls = 'SOC 2 Type II (manufacturing execution systems — MES); 21 CFR Part 11 (electronic batch records, LIMS); Annual Product Quality Review (APQR) documentation; CAPA (Corrective and Preventive Action) system controls; Change control system audit trails; Equipment qualification (IQ/OQ/PQ) documentation; Process validation protocols per FDA Guidance (2011); Data integrity assessments per MHRA/FDA guidance'
WHERE name = 'Quality Assurance Director — Pharmaceutical';

-- PH-016: Quality Control Chemist
UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR § 211.160-211.176 (Laboratory Controls); 21 CFR § 211.194 (Laboratory Records); USP General Chapters (compendial test methods); 21 CFR Part 211.84 (Testing and approval/rejection of components)',
  standards_of_creation = 'ICH Q2(R1) (Validation of Analytical Procedures); USP <621> (Chromatography); USP <1225> (Validation of Compendial Procedures); USP <1226> (Verification of Compendial Procedures); USP <1058> (Analytical Instrument Qualification); ICH Q3A/Q3B/Q3C/Q3D (Impurities — elemental, residual solvents); ASTM methods as applicable; FDA OOS Guidance (Out-of-Specification Results — 2006/2022)',
  soc_controls = '21 CFR Part 11 (LIMS — Laboratory Information Management Systems); ALCOA+ data integrity controls; Instrument qualification and calibration records; OOS/OOT investigation documentation; Sample chain of custody controls; Stability chamber monitoring and alarm systems; Reference standard traceability'
WHERE name = 'Quality Control Chemist';

-- PH-017: Validation Engineer — Pharmaceutical
UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR § 211.68 (Automatic, mechanical, and electronic equipment); 21 CFR § 211.100(a) (Written production/process control procedures); 21 CFR § 211.110 (Sampling and testing of in-process materials); FDA Guidance: Process Validation — General Principles and Practices (2011); 21 CFR Part 11 (Computer System Validation)',
  standards_of_creation = 'FDA Process Validation Guidance (Stages 1-3); ISPE GAMP 5 (Good Automated Manufacturing Practice — computer validation); ISPE Baseline Guide: Commissioning and Qualification; ISPE Cleaning Validation Guide; PDA Technical Report No. 60 (Process Validation); ASTM E2500 (Pharmaceutical Manufacturing Systems Verification); EU Annex 15 (Qualification and Validation — for global operations)',
  soc_controls = 'IQ/OQ/PQ protocol and report documentation controls; Validation master plan tracking; Change control and revalidation triggers; Computer system validation (CSV) lifecycle documentation; 21 CFR Part 11 assessment for each validated system; Periodic review of validated state; Deviation investigation system controls'
WHERE name = 'Validation Engineer — Pharmaceutical';

-- PH-018: GMP Compliance Auditor
UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR Parts 210-211 (cGMP); 21 CFR Part 820 (QSR for combination products); FDA Compliance Program Guidance Manual (CPGM) 7356.002 (Drug Manufacturing Inspections); ICH Q7 (API GMP)',
  standards_of_creation = 'ASQ CQA (Certified Quality Auditor) Body of Knowledge; ISO 19011:2018 (Guidelines for Auditing Management Systems); PIC/S PE 009-16 (GMP Inspection Aide Memoire); FDA PAI (Pre-Approval Inspection) checklist; PDA Technical Report No. 68 (Risk-Based Approach for Vendor Qualification); Supplier qualification audit standards',
  soc_controls = 'Audit program schedule and tracking documentation; CAPA system for audit findings; Audit trail review procedures for electronic systems; Supplier audit rating systems; FDA 483 observation response tracking; Warning letter remediation documentation; Consent decree compliance monitoring'
WHERE name = 'GMP Compliance Auditor';

-- PH-019: DEA Registrant / Controlled Substances Manager
UPDATE citizen_catalog SET
  governing_guidelines = 'Controlled Substances Act (CSA) (21 USC 801-971); 21 CFR Parts 1301-1321 (DEA regulations); 21 CFR § 1304 (Records and Reports of Registrants); 21 CFR § 1305 (DEA Form 222 — Schedule II orders); 21 CFR § 1306 (Prescriptions); 21 CFR § 1307 (Miscellaneous); Combat Methamphetamine Epidemic Act (CMEA)',
  standards_of_creation = 'DEA Pharmacist''s Manual (current edition); DEA Form 222 completion requirements; DEA ARCOS (Automation of Reports and Consolidated Orders System) reporting; DEA Form 106 (theft/loss reporting); DEA Form 41 (destruction documentation); DEA CSOS (Controlled Substance Ordering System) electronic standards; Biennial inventory requirements (21 CFR § 1304.11)',
  soc_controls = 'DEA registration validation; Perpetual inventory tracking systems (Schedule II); Physical inventory reconciliation controls; Vault/safe storage compliance verification; Chain of custody documentation for CII destruction; ARCOS transaction reporting accuracy controls; CSOS digital certificate management'
WHERE name = 'DEA Registrant / Controlled Substances Manager';

-- PH-020: Pharmacist-in-Charge (PIC)
UPDATE citizen_catalog SET
  governing_guidelines = 'State Pharmacy Practice Acts (each state); 21 CFR Parts 1301-1321 (DEA regulations — pharmacy); 21 CFR Part 1306 (Prescription Requirements); Drug Supply Chain Security Act (DSCSA) — serialization/verification; State Prescription Drug Monitoring Program (PDMP) statutes; FD&C Act § 503A/503B (Compounding)',
  standards_of_creation = 'NABP Model State Pharmacy Act (National Association of Boards of Pharmacy); USP <795> (Nonsterile Compounding); USP <797> (Sterile Compounding); USP <800> (Hazardous Drugs — Handling); ASHP (American Society of Health-System Pharmacists) Best Practice Guidelines; State-specific dispensing record requirements; ISMP (Institute for Safe Medication Practices) guidelines',
  soc_controls = 'State Board of Pharmacy inspection compliance; DEA biennial audit requirements; Pharmacy management system (PMS) audit trails; Controlled substance reconciliation documentation; Prescription transfer documentation controls; PDMP reporting system validation; Patient counseling documentation'
WHERE name = 'Pharmacist-in-Charge (PIC)';

-- PH-021: Clinical Pharmacist — Drug Utilization Review
UPDATE citizen_catalog SET
  governing_guidelines = 'Omnibus Budget Reconciliation Act of 1990 (OBRA ''90) DUR requirements; 42 CFR § 456 Subpart K (Drug Use Review — Medicaid); Social Security Act § 1927(g) (DUR program requirements); State Medicaid DUR Board statutes; Medicare Part D MTM (Medication Therapy Management) requirements',
  standards_of_creation = 'ACCP Clinical Pharmacist competency standards; ASHP Guidelines on Medication-Use Evaluation; APhA-ASP Medication Therapy Management standards; DUR criteria development per OBRA ''90; ProDUR (Prospective Drug Use Review) screening criteria; RetroDUR (Retrospective Drug Use Review) analysis standards',
  soc_controls = 'PMS (Pharmacy Management System) DUR alert documentation; ProDUR override documentation requirements; RetroDUR trend analysis and reporting; MTM encounter documentation; SOC 2 Type II (pharmacy benefit systems); CMS Star Rating compliance documentation (Part D)'
WHERE name = 'Clinical Pharmacist — Drug Utilization Review';

-- PH-022: 340B Program Compliance Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'Public Health Service Act § 340B (42 USC 256b); 340B Drug Pricing Program — HRSA Guidelines; ACA § 7101-7102 (340B expansion to additional entity types); HRSA Manufacturer Audit Guidelines; HHS OIG Reports on 340B Program Integrity; State 340B laws (where applicable)',
  standards_of_creation = 'HRSA 340B Program Requirements Guide; HRSA 340B OPAIS (Office of Pharmacy Affairs Information System) registration standards; 340B Prime Vendor Program contract compliance; Apexus/340B University training standards; Split-billing and virtual inventory system requirements; Contract pharmacy arrangement documentation standards; Medicaid exclusion file maintenance (preventing duplicate discounts)',
  soc_controls = 'HRSA annual recertification controls; 340B ceiling price verification; Duplicate discount prevention (Medicaid/340B); Contract pharmacy audit trail documentation; Diversion prevention controls; Manufacturer audit response documentation; SOC 2 Type II (340B inventory management systems — Sentry, MacroHelix)'
WHERE name = '340B Program Compliance Specialist';

-- PH-023: Pharmacy Benefit Manager (PBM) Compliance Officer
UPDATE citizen_catalog SET
  governing_guidelines = 'ERISA § 408(b)(2) (Service provider fee disclosure — DOL); Medicare Part D requirements (42 CFR Part 423); State PBM licensing and transparency statutes; Consolidated Appropriations Act of 2021 (Pharmacy DIR reform); FTC PBM Interim Report recommendations (2024); State PBM fiduciary duty laws (where enacted)',
  standards_of_creation = 'NCPDP (National Council for Prescription Drug Programs) standards; NCPDP SCRIPT Standard (electronic prescribing); CMS Part D reporting requirements; DIR (Direct and Indirect Remuneration) reporting standards; Pharmacy network adequacy documentation; MAC (Maximum Allowable Cost) pricing transparency requirements; Appeals and grievance process documentation standards',
  soc_controls = 'SOC 1 Type II (claims processing system controls); SOC 2 Type II (member data security); NCPDP transaction validation; Rebate pass-through documentation and audit trails; Pharmacy audit procedures and documentation; Spread pricing disclosure controls; CMS compliance program requirements (Part D)'
WHERE name = 'Pharmacy Benefit Manager (PBM) Compliance Officer';

-- PH-024: Expanded Access Program Coordinator
UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR Part 312 Subpart I (Expanded Access — §§ 312.300-312.320); FD&C Act § 561 (21 USC 360bbb — Expanded Access); Right to Try Act (21 USC 360bbb-0a); 21 CFR § 312.310 (Individual patients — emergency/non-emergency); 21 CFR § 312.315 (Intermediate-size patient populations); 21 CFR § 312.320 (Treatment IND/protocol)',
  standards_of_creation = 'FDA Form 3926 (Individual Patient Expanded Access IND); FDA Guidance: Expanded Access — Individual Patients (2017); FDA Guidance: Charging for Investigational Drugs Under an IND (2016); IRB emergency use notification requirements (within 5 working days); Informed consent documentation for expanded access (21 CFR Part 50); Annual IND safety reports for expanded access programs',
  soc_controls = 'FDA IND submission tracking; IRB emergency review documentation; Informed consent version control; Patient outcome reporting controls; Drug accountability tracking (expanded access supply); SAE reporting within 15 calendar days'
WHERE name = 'Expanded Access Program Coordinator';

-- PH-025: Drug Supply Chain Security Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'Drug Supply Chain Security Act (DSCSA) (Title II of PL 113-54); FD&C Act §§ 581-585 (Product identification, tracing, verification); 21 CFR Part 205 (Guidelines for State Licensing of Wholesale Drug Distributors); FDA Guidance: DSCSA Standards for Enhanced Drug Distribution Security (2023+); FDA Guidance: DSCSA Implementation Timeline and Enforcement Discretion',
  standards_of_creation = 'GS1 US National Drug Code (NDC) Directory standards; GS1 GTIN/SGTIN serialization standards; GS1 DataMatrix barcode specifications; EPCIS (Electronic Product Code Information Services) transaction data; FDA product identifier requirements (GTIN, serial number, lot number, expiration date); Transaction information/history/statement (T3) documentation; Verification and returns procedures documentation',
  soc_controls = 'Serialization system validation (21 CFR Part 11); Product verification system (VRS) interoperability testing; SOC 2 Type II (track-and-trace platform); Trading partner authorization and credentialing; Suspect/illegitimate product investigation documentation; FDA reporting of suspect products within 24 hours'
WHERE name = 'Drug Supply Chain Security Specialist';

-- PH-026: Pharmaceutical Wholesaler Compliance Officer
UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR Part 205 (Guidelines for State Licensing of Wholesale Drug Distributors); DSCSA §§ 581-585 (Wholesale distributor requirements); State wholesale drug distributor licensing statutes; 21 CFR Parts 1301-1321 (DEA — controlled substance wholesale distribution); Prescription Drug Marketing Act (PDMA) (21 USC 353)',
  standards_of_creation = 'NABP Verified-Accredited Wholesale Distributors (VAWD) standards; HDMA (Healthcare Distribution Alliance) Pedigree standards; DSCSA trading partner transaction documentation requirements; DEA distributor recordkeeping requirements (21 CFR § 1304); State-specific distributor reporting requirements; Temperature excursion documentation (GDP compliance)',
  soc_controls = 'VAWD accreditation audit requirements; State license maintenance and renewal tracking; DSCSA verification system controls; Cold chain monitoring and documentation; SOC 2 Type II (warehouse management systems); Returns and reverse distribution documentation; Suspicious order monitoring and reporting (DEA)'
WHERE name = 'Pharmaceutical Wholesaler Compliance Officer';

-- PH-027: Medical Science Liaison (MSL)
UPDATE citizen_catalog SET
  governing_guidelines = 'FD&C Act § 502 (21 USC 352 — Misbranding); 21 CFR Part 202 (Prescription Drug Advertising); FDA Guidance: Responding to Unsolicited Requests for Off-Label Information (2011); FDA Guidance: Medical Product Communications That Are Consistent With the FDA-Required Labeling (2018); OIG Compliance Program Guidance for Pharmaceutical Manufacturers (2003)',
  standards_of_creation = 'MSL Society Competency Standards; Medical Affairs Professional Society (MAPS) Standards; Fair balance documentation requirements; Medical information response documentation (standard response letters); Adverse event reporting obligations from field interactions; Speaker program documentation and compliance',
  soc_controls = 'CRM (Customer Relationship Management) system audit trails; Medical information inquiry documentation; Off-label communication avoidance controls; Adverse event capture from medical interactions (5-day reporting to safety); SOC 2 Type II (medical affairs platforms); Sunshine Act reporting (Open Payments) — 42 USC 1320a-7h'
WHERE name = 'Medical Science Liaison (MSL)';

-- PH-028: Government Pricing Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'Medicaid Drug Rebate Program (MDRP) — Social Security Act § 1927 (42 USC 1396r-8); Veterans Health Care Act of 1992 (38 USC 8126 — Federal Ceiling Price); 340B statute (42 USC 256b) — ceiling price relationship; ACA § 2501 (Medicaid rebate increase); 42 CFR Part 447 Subpart I (State Medicaid drug pricing); Federal Supply Schedule (FSS) pricing requirements (48 CFR Part 538)',
  standards_of_creation = 'CMS Drug Data Reporting instructions (DDR); CMS AMP (Average Manufacturer Price) calculation methodology; CMS Best Price determination procedures; VA FSS pricing templates and calculations; Non-FAMP (Non-Federal Average Manufacturer Price) reporting; HRSA 340B ceiling price calculation methodology; Quarterly and monthly pricing data submission standards',
  soc_controls = 'CMS DDR system submission controls; SOC 1 Type II (pricing calculation systems); Government pricing audit trail documentation; Rebate liability estimation and accrual controls; Price recalculation and restatement procedures; Internal audit of pricing data accuracy; OIG self-disclosure protocol compliance'
WHERE name = 'Government Pricing Specialist';

-- PH-029: Environmental Health and Safety Officer — Pharma
UPDATE citizen_catalog SET
  governing_guidelines = 'OSHA 29 CFR 1910.1200 (Hazard Communication — GHS); OSHA 29 CFR 1910.1450 (Laboratory Standard); EPA 40 CFR Parts 260-270 (RCRA Hazardous Waste); EPA 40 CFR Part 302 (CERCLA — reportable quantities); EPA 40 CFR Part 372 (TRI — Toxic Release Inventory); Clean Air Act pharmaceutical MACT standards (40 CFR Part 63 Subpart GGG)',
  standards_of_creation = 'OSHA SDS (Safety Data Sheet) requirements (GHS format); AIHA (American Industrial Hygiene Association) exposure assessment guidance; ISPE Baseline Guide: Risk-Based Manufacture of Pharmaceutical Products (RBMPP); Occupational exposure bands (OEB) for active pharmaceutical ingredients; Containment performance verification protocols; EPA TRI Form R/Form A filing requirements; Pharmaceutical waste disposal documentation (reverse distribution vs. RCRA)',
  soc_controls = 'Exposure monitoring records and trending; Engineering control verification documentation; PPE program documentation; Medical surveillance records (OSHA recordkeeping); Waste manifesting system controls (EPA); Environmental permit compliance tracking; OSHA 300 Log accuracy controls'
WHERE name = 'Environmental Health and Safety Officer — Pharma';

-- PH-030: Computer Systems Validation (CSV) Specialist
UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR Part 11 (Electronic Records; Electronic Signatures); 21 CFR § 211.68 (Automatic, mechanical, and electronic equipment — GMP); EU Annex 11 (Computerised Systems — for global); FDA Guidance: Data Integrity and Compliance with Drug cGMP (2018); Predicate rules requiring electronic record integrity',
  standards_of_creation = 'ISPE GAMP 5 (Good Automated Manufacturing Practice — A Risk-Based Approach to Compliant GxP Computerized Systems); ISPE GAMP Good Practice Guide: Data Integrity by Design; ISPE GAMP Good Practice Guide: Testing of GxP Systems; ISPE GAMP Good Practice Guide: IT Infrastructure Control and Compliance; PIC/S Guidance: Good Practices for Data Management and Integrity (2021); MHRA Data Integrity guidance (2018)',
  soc_controls = '21 CFR Part 11 compliance assessment for each system; SOC 2 Type II for cloud/SaaS GxP systems; Vendor audit and qualification per GAMP; User access management and periodic review; Audit trail review procedures; Backup and disaster recovery validation; Electronic signature policy and controls; Periodic system review documentation'
WHERE name = 'Computer Systems Validation (CSV) Specialist';

-- BT-001: Gene Therapy Regulatory Affairs Specialist
UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR Part 312 (IND requirements — gene therapy specific); 21 CFR Part 600 (Biological Products — General); 21 CFR Part 610 (General Biological Products Standards); 21 CFR Part 1271 (Human Cells, Tissues, and Cellular and Tissue-Based Products — HCT/Ps); FD&C Act § 351 (42 USC 262 — Biologics License Application); NIH Guidelines for Research Involving Recombinant or Synthetic Nucleic Acid Molecules (NIH Guidelines); Public Health Service Act § 361 (42 USC 264 — Regulation of biological products)',
  standards_of_creation = 'FDA Guidance: Chemistry, Manufacturing, and Control (CMC) Information for Human Gene Therapy INDs (2020); FDA Guidance: Human Gene Therapy for Rare Diseases (2020); FDA Guidance: Long Term Follow-Up After Gene Therapy (2020); ICH Q5A-E (Quality guidelines for biological products); ICH S12 (Nonclinical Biodistribution for Gene Therapy Products); USP <1046> (Gene Therapy Products); ISCT (International Society for Cell and Gene Therapy) standards',
  soc_controls = '21 CFR Part 11 (electronic records for IND submissions); FDA ESG submission validation; NIH OBA (Office of Biotechnology Activities) registration controls; IBC (Institutional Biosafety Committee) approval documentation; ClinicalTrials.gov registration verification; SOC 2 Type II (manufacturing and data systems); BIMO inspection readiness documentation'
WHERE name = 'Gene Therapy Regulatory Affairs Specialist';

-- BT-002: Gene Therapy Manufacturing Specialist
UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR Part 211 (cGMP adapted for biologics); 21 CFR Part 600 (General Biological Products Standards); 21 CFR Part 610 (General Biological Products Standards — potency, identity, purity); 21 CFR Part 1271 Subpart D (cGTP — Current Good Tissue Practice); PHS Act § 351 (manufacturing standards for biologics)',
  standards_of_creation = 'FDA Guidance: CMC for Human Gene Therapy INDs (2020); ICH Q5A (Viral Safety Evaluation); ICH Q5B (Analysis of Expression Construct in Cells Used for Production); ICH Q5C (Stability Testing of Biotechnological/Biological Products); ICH Q5D (Derivation and Characterization of Cell Substrates); USP <1046> (Gene Therapy Products); ISPE Gene Therapy Facility Design Guide; PDA Technical Report No. 80 (Cell-Based Therapy)',
  soc_controls = 'Viral vector lot release testing documentation; Certificate of Analysis (CoA) controls for raw materials; Environmental monitoring (EM) trending — cleanroom classification; 21 CFR Part 11 (electronic batch records); SOC 2 Type II (vector manufacturing systems); Chain of identity/custody for patient-specific products (autologous); Comparability study documentation (manufacturing changes)'
WHERE name = 'Gene Therapy Manufacturing Specialist';

-- BT-003: CRISPR/Gene Editing Research Scientist
UPDATE citizen_catalog SET
  governing_guidelines = 'NIH Guidelines for Research Involving Recombinant or Synthetic Nucleic Acid Molecules; 21 CFR Part 312 (IND — therapeutic gene editing); USDA 7 CFR Part 340 (Movement of Organisms Modified — agricultural); EPA 40 CFR Part 725 (Microbial biotechnology — TSCA); National Academies Report: Human Genome Editing — Science, Ethics, and Governance (2017)',
  standards_of_creation = 'NIH Guidelines Appendix B-V (Risk groups and containment levels for rDNA); IBC protocol review standards; ISSCR Guidelines for Stem Cell Research and Clinical Translation (2021) — gene editing provisions; ASGCT (American Society of Gene and Cell Therapy) white papers; Off-target analysis documentation standards (GUIDE-seq, CIRCLE-seq); FDA Guidance: Human Genome Editing Products (draft)',
  soc_controls = 'IBC approval and amendment documentation; NIH OBA incident reporting; Laboratory notebook integrity controls (electronic or paper); Biosafety containment verification; Off-target effect screening documentation; Material transfer agreement compliance; Dual-use research of concern (DURC) self-assessment'
WHERE name = 'CRISPR/Gene Editing Research Scientist';

-- BT-004: Stem Cell Research Compliance Officer
UPDATE citizen_catalog SET
  governing_guidelines = 'NIH Guidelines on Human Stem Cell Research (2009, updated); Executive Order 13505 (Removing Barriers to Responsible Scientific Research Involving Human Stem Cells); 45 CFR Part 46 (Common Rule — human subjects protections for donor consent); 21 CFR Part 1271 (HCT/P regulations for clinical applications); State stem cell research laws (California SB 1260; New York, others); Dickey-Wicker Amendment (annual appropriations — embryo research restrictions)',
  standards_of_creation = 'NIH Human Embryonic Stem Cell Registry listing requirements; ISSCR Guidelines for Stem Cell Research and Clinical Translation (2021); ISSCR Guidelines for the Clinical Translation of Stem Cells (2008); NAS Guidelines for Human Embryonic Stem Cell Research (2005, updated 2010); SCRO (Stem Cell Research Oversight) committee charter and review standards; Donor consent form requirements specific to stem cell derivation; iPSC derivation documentation standards',
  soc_controls = 'SCRO/ESCRO committee approval and continuing review documentation; NIH hESC Registry compliance verification; Donor consent audit trail; Cell line provenance and authentication records; Material transfer agreements for stem cell lines; Conflict of interest disclosure in stem cell research; State-specific reporting requirements (CIRM annual reports)'
WHERE name = 'Stem Cell Research Compliance Officer';

-- BT-005: Institutional Biosafety Committee (IBC) Chair
UPDATE citizen_catalog SET
  governing_guidelines = 'NIH Guidelines for Research Involving Recombinant or Synthetic Nucleic Acid Molecules (Section IV — Roles and Responsibilities); 42 CFR Part 73 (Select Agents and Toxins — CDC); 7 CFR Part 331 (Select Agents and Toxins — APHIS); 9 CFR Part 121 (Select Agents and Toxins — overlap agents); OSHA 29 CFR 1910.1030 (Bloodborne Pathogens); PHS Act § 351A (42 USC 262a — Regulation of Select Agents)',
  standards_of_creation = 'NIH Guidelines Appendix G (IBC — responsibilities, membership, review procedures); BMBL (Biosafety in Microbiological and Biomedical Laboratories) — CDC/NIH, 6th Edition; ABSA (American Biological Safety Association) Professional Competencies; WHO Laboratory Biosafety Manual, 4th Edition (2020); IBC meeting documentation standards; Protocol registration and amendment procedures; Annual IBC report to NIH OBA',
  soc_controls = 'IBC meeting minutes and voting records; Protocol approval and continuing review tracking; Incident/accident/exposure reporting documentation; Biosafety Level (BSL) certification and inspection records; Biological agent inventory and transfer records; Training verification for all personnel; NIH OBA reporting compliance (incidents, new protocols)'
WHERE name = 'Institutional Biosafety Committee (IBC) Chair';

-- BT-006: Biosafety Officer (BSO)
UPDATE citizen_catalog SET
  governing_guidelines = 'OSHA 29 CFR 1910.1030 (Bloodborne Pathogens Standard); OSHA General Duty Clause § 5(a)(1) (29 USC 654); NIH Guidelines (Section IV.B.3 — BSO responsibilities); 42 CFR Part 73 / 7 CFR Part 331 / 9 CFR Part 121 (Select Agent Regulations); DOT 49 CFR Parts 171-180 (Hazardous Materials — infectious substance shipping); IATA Dangerous Goods Regulations (international biological shipping)',
  standards_of_creation = 'BMBL 6th Edition (risk assessment, containment, practices); ABSA International Professional Competencies; ABSA Risk Assessment framework (risk groups, BSL assignment); WHO Laboratory Biosafety Manual, 4th Edition; NIH Design Requirements Manual (DRM) for biomedical labs; Biosafety cabinet certification standards (NSF/ANSI 49); Autoclave validation and biological indicator documentation',
  soc_controls = 'Biological risk assessment documentation for each protocol; BSL facility inspection and certification records; Biosafety cabinet annual certification records; Exposure incident investigation and reporting; Select agent inventory reconciliation; Biological waste treatment verification (autoclave log review); Emergency response plan documentation; Annual biosafety training records'
WHERE name = 'Biosafety Officer (BSO)';

-- BT-007: Select Agent Responsible Official (RO)
UPDATE citizen_catalog SET
  governing_guidelines = '42 CFR Part 73 (Select Agents and Toxins — HHS); 7 CFR Part 331 (Possession, Use, and Transfer of Biological Agents and Toxins — USDA); 9 CFR Part 121 (Possession, Use, and Transfer of Select Agents — USDA overlap); USA PATRIOT Act § 817 (Expansion of BW statute — 18 USC 175b); Public Health Security and Bioterrorism Preparedness and Response Act (PL 107-188, Title II); 42 USC 262a (Regulation of certain biological agents and toxins)',
  standards_of_creation = 'FSAP (Federal Select Agent Program) registration and application procedures; CDC/APHIS Select Agent and Toxin List (current version); FSAP Inspection Checklist; Security Risk Assessment (SRA) — DOJ/FBI; Biosafety/security plans (BSSP) format requirements; Incident response plan (IRP) documentation requirements; Transfer documentation (APHIS/CDC Form 2); Entity and individual registration renewal procedures',
  soc_controls = 'FSAP registration and renewal tracking; Personnel Suitability Assessment (FBI SRA clearance); Select agent inventory verification (biennial or more frequent); Access control and accountability records (who, what, when); Theft/loss/release reporting (42 CFR § 73.19 — within 24 hours); Transfer documentation and recipient verification; Annual drills/exercises documentation; Destruction documentation with dual witness; Physical security system controls (access logs, video)'
WHERE name = 'Select Agent Responsible Official (RO)';

-- BT-008: Radiation Safety Officer (Biotech Context)
UPDATE citizen_catalog SET
  governing_guidelines = '10 CFR Part 20 (Standards for Protection Against Radiation); 10 CFR Part 35 (Medical Use of Byproduct Material — research isotopes); 10 CFR Part 30 (Rules of General Applicability to Domestic Licensing); State radioactive materials license requirements; NRC Regulatory Guides (8-series — occupational radiation protection)',
  standards_of_creation = 'NRC NUREG-1556 Series (Consolidated Guidance for Materials Licensees); NCRP Reports (National Council on Radiation Protection and Measurements); Health Physics Society standards; ALARA program documentation; Radioactive waste disposal documentation (10 CFR Part 20 Subpart K); Personnel dosimetry program documentation; Sealed source leak testing procedures',
  soc_controls = 'NRC license compliance tracking; Personnel dosimetry (TLD/OSL) records; Area surveys and contamination surveys; Radioactive materials inventory and accountability; Waste disposal records and manifests; ALARA review and trending documentation; NRC event reporting (10 CFR § 20.2202-2203); Radiation safety committee meeting minutes'
WHERE name = 'Radiation Safety Officer (Biotech Context)';

-- BT-009: Biotechnology Regulatory Affairs — Agricultural
UPDATE citizen_catalog SET
  governing_guidelines = '7 CFR Part 340 (Movement of Organisms Modified or Produced Through Genetic Engineering — 2020 SECURE Rule); Coordinated Framework for Regulation of Biotechnology (51 FR 23302, 1986); FIFRA § 3 (EPA registration of plant-incorporated protectants — PIPs); FD&C Act § 402/409 (FDA food safety for bioengineered foods); National Environmental Policy Act (NEPA) — Environmental Assessments for field trials; Plant Protection Act (7 USC 7701-7786)',
  standards_of_creation = 'USDA-APHIS BRS permit application requirements (eFile system); APHIS Notification/Permit procedures for regulated articles; EPA PIP experimental use permits (EUP) documentation; FDA Biotechnology Consultation Program procedures (Section 104(h)); USDA Environmental Assessment format requirements; Confined field trial protocols (containment measures, monitoring); Detection method documentation for novel traits; Petition for Nonregulated Status documentation requirements',
  soc_controls = 'APHIS BRS eFile submission and tracking controls; Confined field trial compliance monitoring (APHIS inspections); Devitalization/destruction verification of field trial material; Material accountability (seeds/plant material in/out); Environmental monitoring records; Volunteer plant monitoring (post-harvest); Adverse effects reporting to APHIS; NEPA compliance documentation'
WHERE name = 'Biotechnology Regulatory Affairs — Agricultural';

-- BT-010: Environmental Risk Assessor — Biotechnology
UPDATE citizen_catalog SET
  governing_guidelines = 'FIFRA § 3 (EPA risk assessment for plant-incorporated protectants); TSCA § 5 (EPA review of new microorganisms — 40 CFR Part 725); NEPA (Environmental Impact Statements / Environmental Assessments); Endangered Species Act § 7 (consultation requirements); 40 CFR Part 1500-1508 (CEQ regulations for NEPA); FDA Guidance: Regulation of Intentionally Altered Genomic DNA in Animals (2017)',
  standards_of_creation = 'EPA Framework for Ecological Risk Assessment (EPA/630/R-92/001); EPA Guidelines for Ecological Risk Assessment (1998); USDA-APHIS Environmental Assessment template; EPA Science Advisory Panel (SAP) review standards; Tier 1/Tier 2 ecological testing protocols; Non-target organism effects assessment documentation; Gene flow/outcrossing risk assessment methodology; Post-market environmental monitoring (PMEM) plans',
  soc_controls = 'Environmental data collection and chain of custody; GLP (Good Laboratory Practice — 40 CFR Part 160) for ecotoxicology studies; NEPA document review and public comment tracking; ESA § 7 consultation records; Field monitoring data integrity controls; SOC 2 Type II (environmental data management systems)'
WHERE name = 'Environmental Risk Assessor — Biotechnology';

-- BT-011: Institutional Review Entity (IRE) for DURC
UPDATE citizen_catalog SET
  governing_guidelines = 'USG Policy for Institutional Oversight of DURC (2014); USG Policy for Oversight of LCMRA (Life Sciences Dual Use Research of Concern) (2012); HHS P3CO (Potential Pandemic Pathogen Care and Oversight) Framework (2017); NIH Grants Policy Statement (Dual-Use provisions); National Science Advisory Board for Biosecurity (NSABB) Recommendations',
  standards_of_creation = 'NSABB Proposed Framework for the Oversight of DURC (2007); USG DURC Policy institutional procedures documentation; DURC risk-benefit assessment templates (IRE format); Risk mitigation plan documentation standards; Communication plan for DURC findings; NSABB Guidelines for Biosecurity (2024 update); Institutional DURC policy development standards',
  soc_controls = 'IRE meeting documentation and voting records; DURC identification and reporting (to funding agency within 30 days); Risk mitigation plan implementation tracking; Annual DURC training documentation; Funder notification compliance records; Publication review for dual-use concerns; Incident reporting procedures (misuse or breach)'
WHERE name = 'Institutional Review Entity (IRE) for DURC';

-- BT-012: Research Integrity Officer (RIO)
UPDATE citizen_catalog SET
  governing_guidelines = '42 CFR Part 93 (Public Health Service Policies on Research Misconduct); 45 CFR Part 689 (NSF Research Misconduct); NIH Grants Policy Statement (research integrity requirements); America COMPETES Act § 7009 (42 USC 1862o-1 — Research misconduct); Federal Research Misconduct Policy (65 FR 76260, 2000)',
  standards_of_creation = 'ORI Model Institutional Research Misconduct Policy; ORI Handling Misconduct — Administrative Actions; ORI Assessment, Inquiry, Investigation procedures; ORI Sample Policy for Institutions; AAAS/ORI Research Ethics Program standards; Research Integrity Training requirements (RCR — Responsible Conduct of Research); 42 CFR § 93.300-304 (General responsibilities for compliance)',
  soc_controls = 'Research misconduct allegation tracking; Sequestration of evidence procedures; Inquiry committee documentation (within 60 days); Investigation committee documentation (within 120 days); ORI notification requirements (within 24 hours for misconduct findings); Annual report to ORI; Conflict of interest screening for inquiry/investigation committees; Whistleblower protection documentation'
WHERE name = 'Research Integrity Officer (RIO)';

-- BT-013: Bioethicist — Emerging Technologies
UPDATE citizen_catalog SET
  governing_guidelines = 'Common Rule (45 CFR Part 46) — ethical review of human subjects research; National Research Act (PL 93-348); Belmont Report (1979); ISSCR Guidelines for Stem Cell Research and Clinical Translation (2021); National Academies Reports on Human Genome Editing (2017), Heritable Human Genome Editing (2020); Asilomar Conference principles (historical but foundational)',
  standards_of_creation = 'ASBH Core Competencies for Healthcare Ethics Consultation (adapted to research); Nuffield Council on Bioethics frameworks; UNESCO Universal Declaration on Bioethics and Human Rights (2005); NASEM Responsible Science Report; Ethical frameworks for chimera research, organoid research, synthetic biology; Community engagement and public consultation standards; International Summit on Human Gene Editing consensus statements',
  soc_controls = 'Ethics consultation documentation and audit trail; Conflict of interest disclosures; Public engagement documentation; Cross-referencing with IBC, IRB, SCRO committee approvals; Policy recommendation tracking and implementation'
WHERE name = 'Bioethicist — Emerging Technologies';

-- BT-014: NIH Grants Compliance Officer
UPDATE citizen_catalog SET
  governing_guidelines = '2 CFR Part 200 (Uniform Administrative Requirements — Uniform Guidance); NIH Grants Policy Statement (current fiscal year); 45 CFR Part 75 (HHS implementation of Uniform Guidance); PHS Act § 301 (42 USC 241 — Research Authority); 42 USC 289 (Protection of Human Subjects — federal funding condition); NIH Policy on Late Application Submission; NIH Data Management and Sharing Policy (effective 2023)',
  standards_of_creation = 'NIH SF424 Application Guide; NIH RPG (Research Project Grant) instructions; NIH Grants.gov submission validation standards; NIH eRA Commons requirements; NIH Progress Report (RPPR) format; NIH Financial Status Report (FFR/SF-425) requirements; NIH Invention Reporting (iEdison) requirements (Bayh-Dole Act); NIH Biosketch format requirements; ClinicalTrials.gov registration requirements (FDAAA 801)',
  soc_controls = 'eRA Commons submission and tracking controls; Effort reporting and certification systems; Subrecipient monitoring documentation; NIH Inclusion Enrollment Report verification; Data management and sharing plan compliance tracking; Time and effort reporting controls; Cost sharing documentation; Audit requirements (Single Audit — 2 CFR Part 200 Subpart F)'
WHERE name = 'NIH Grants Compliance Officer';

-- BT-015: Technology Transfer Officer
UPDATE citizen_catalog SET
  governing_guidelines = 'Bayh-Dole Act (35 USC 200-212); 37 CFR Part 401 (Rights to Inventions Made by Nonprofit Organizations and Small Business Firms); Stevenson-Wydler Technology Innovation Act (15 USC 3701-3714); Federal Technology Transfer Act (15 USC 3710); NIH Grants Policy Statement — IP/patent rights provisions; Executive Order 12591 (Facilitating Access to Science and Technology)',
  standards_of_creation = 'iEdison (Interagency Edison) invention disclosure requirements; NIH MTA (Material Transfer Agreement) — UBMTA (Uniform Biological Material Transfer Agreement); NIH Simple Letter Agreement (SLA) for non-profit transfers; AUTM Licensing Survey standards and benchmarks; Inter-Institutional Agreement (IIA) format for multi-site research; CDA/NDA format for industry collaborations; License agreement standard terms and provisions',
  soc_controls = 'Invention disclosure tracking and reporting (iEdison); Patent prosecution and maintenance tracking; MTA execution and compliance tracking; License revenue distribution documentation; Bayh-Dole compliance certification (35 USC 202(c)); Government use rights documentation; SBIR/STTR intellectual property provisions compliance; Export control screening for technology transfers'
WHERE name = 'Technology Transfer Officer';

-- BT-016: Export Control Officer — Biotechnology
UPDATE citizen_catalog SET
  governing_guidelines = 'Export Administration Regulations (EAR) (15 CFR Parts 730-774); EAR Category 1 (Special Materials and Related Equipment — biotoxins, pathogens); EAR Category 2 (Materials Processing — fermenters, bioreactors); International Traffic in Arms Regulations (ITAR) (22 CFR Parts 120-130) — for defense-related biotech; Australia Group Common Control Lists (biological agents, equipment); Biological Weapons Convention (BWC) implementation; OFAC sanctions screening requirements',
  standards_of_creation = 'BIS Commerce Control List (CCL) — ECCN classification procedures; BIS Deemed Export guidance (foreign nationals access); Technology Control Plans (TCP) for foreign national researchers; Restricted Party Screening procedures; License application documentation (BIS-748P); End-use/end-user certification requirements; Voluntary Self-Disclosure (VSD) procedures for violations',
  soc_controls = 'Restricted party screening (Consolidated Screening List); Deemed export assessments for foreign national hires; Technology control plan compliance monitoring; Export license application and tracking; Deemed export training documentation; SOC 2 Type II (export management systems — Visual Compliance, OCR); Voluntary Self-Disclosure documentation; Annual export control training records'
WHERE name = 'Export Control Officer — Biotechnology';

-- BT-017: Clinical Laboratory Director (CLIA)
UPDATE citizen_catalog SET
  governing_guidelines = 'Clinical Laboratory Improvement Amendments (CLIA ''88) (42 USC 263a); 42 CFR Part 493 (Laboratory Requirements); 42 CFR § 493.1407-1495 (Laboratory Director responsibilities by complexity); State clinical laboratory licensing statutes; FDA 21 CFR Part 809 (In Vitro Diagnostic Products); FDA 21 CFR Part 862-892 (Device Classification — diagnostics)',
  standards_of_creation = 'CAP Laboratory Accreditation Checklists (All Common, Chemistry, Molecular Pathology, etc.); CLSI (Clinical and Laboratory Standards Institute) standards (GP26, QMS01-QMS06); CLSI EP (Evaluation Protocols) series for method validation; CLSI C28 (Defining/Verifying Reference Intervals); ISO 15189:2022 (Medical Laboratories — Requirements for Quality and Competence); ASHI (American Society for Histocompatibility) standards (transplant labs)',
  soc_controls = 'CMS CLIA Certificate of Compliance or Accreditation; CAP proficiency testing (PT) performance documentation; Quality Assessment and Quality Improvement documentation; Personnel qualification records and competency assessments; Equipment maintenance and function check documentation; Reagent/media quality control records; Patient test management documentation (pre-analytic, analytic, post-analytic); SOC 2 Type II (LIS — Laboratory Information System)'
WHERE name = 'Clinical Laboratory Director (CLIA)';

-- BT-018: Clinical Laboratory Technical Supervisor
UPDATE citizen_catalog SET
  governing_guidelines = '42 CFR § 493.1449-1457 (Technical Supervisor qualifications and responsibilities); 42 CFR § 493.1251-1299 (Standard-level testing quality requirements); CAP accreditation checklist requirements per discipline; State medical laboratory technologist licensing',
  standards_of_creation = 'CLSI method validation standards (EP05, EP06, EP09, EP15, EP17); CLSI QMS series for quality management; CAP discipline-specific checklist requirements; ASCP Board of Certification (BOC) competency standards; Competency assessment documentation (6 elements per CLIA); Method comparison and correlation study documentation',
  soc_controls = 'Personnel competency assessment records (6 elements: direct observation, monitoring, specimen testing, assessment of problem solving, proficiency testing, checklist); Method validation/verification documentation; Proficiency testing enrollment and performance records; Corrective action documentation for PT failures; New test/method implementation documentation; SOC 2 Type II (LIS controls per section)'
WHERE name = 'Clinical Laboratory Technical Supervisor';

-- BT-019: Clinical Laboratory Quality Manager
UPDATE citizen_catalog SET
  governing_guidelines = '42 CFR § 493.1239-1249 (General Laboratory Systems quality requirements); 42 CFR § 493.801-865 (Proficiency Testing); CAP Quality Management checklist; ISO 15189:2022 (Management requirements — Clauses 5-8)',
  standards_of_creation = 'CLSI QMS01 (Quality Management System: A Model for Laboratory Services); CLSI QMS04 (Laboratory Quality Control Based on Risk Management); CAP Q-Probes and Q-Tracks benchmarking studies; ISO 15189:2022 Clause 7 (Process Requirements); CLSI GP26-A4 (Application of a Quality Management System Model for Laboratory Services); Internal audit program standards',
  soc_controls = 'Quality indicator tracking and trending; Document control system (controlled documents, revision history); Nonconforming event management and CAPA system; Internal audit program documentation; Management review meeting documentation; Customer satisfaction/complaint documentation; Occurrence management and root cause analysis; Accreditation inspection readiness documentation'
WHERE name = 'Clinical Laboratory Quality Manager';

-- BT-020: Biobank Director / Biorepository Manager
UPDATE citizen_catalog SET
  governing_guidelines = '45 CFR Part 46 (Common Rule — human specimens); 21 CFR Part 1271 (HCT/P — tissue banking requirements); HIPAA Privacy Rule (45 CFR Parts 160, 164) — PHI linked to specimens; NIH Genomic Data Sharing Policy (GDS); GINA (Genetic Information Nondiscrimination Act) (42 USC 2000ff); Common Rule 2018 revision § 46.104(d)(4) — biospecimen provisions',
  standards_of_creation = 'ISBER Best Practices for Repositories (4th Edition, 2018); CAP Biorepository Accreditation Checklist; NCI Best Practices for Biospecimen Resources (2016); BRISQ (Biospecimen Reporting for Improved Study Quality) guidelines; SPREC (Standard PREanalytical Code) for biospecimen handling; ISO 20387:2018 (Biobanking — General Requirements); OECD Best Practice Guidelines for Biological Resource Centres',
  soc_controls = 'Specimen collection, processing, and storage SOP documentation; Chain of custody and specimen tracking system (LIMS); Informed consent and donor re-consent tracking; De-identification/coding system integrity controls; Temperature monitoring and alarm system documentation; Quality management system per ISO 20387; Access control and specimen release authorization; Disaster recovery and business continuity plans for specimen storage; SOC 2 Type II (biobank LIMS and data management systems)'
WHERE name = 'Biobank Director / Biorepository Manager';

-- BT-021: Genomic Data Privacy Officer
UPDATE citizen_catalog SET
  governing_guidelines = 'GINA Title I (42 USC 2000ff — Health Insurance provisions); GINA Title II (42 USC 2000ff-1 — Employment provisions); HIPAA Privacy Rule (45 CFR Part 164) — genetic information as PHI; NIH Genomic Data Sharing (GDS) Policy (2023); Common Rule (45 CFR Part 46) — broad consent for genomic research; State genetic privacy laws (California SB 41, New York, others); 21st Century Cures Act § 2063 (identifiability of biospecimens)',
  standards_of_creation = 'EEOC GINA Compliance Manual (Section 22); EEOC Final Rule implementing GINA Title II (29 CFR Part 1635); NIH GDS Policy — Data Submission and Access Procedures; dbGaP (database of Genotypes and Phenotypes) data submission standards; Global Alliance for Genomics and Health (GA4GH) Framework; GA4GH Data Use Ontology (DUO); Genomic data de-identification standards (k-anonymity, l-diversity concepts applied); ELSI (Ethical, Legal, and Social Implications) documentation requirements',
  soc_controls = 'dbGaP controlled access approval tracking; Data use agreement (DUA) execution and compliance; Genomic data encryption standards; Access audit trail for genomic datasets; Re-identification risk assessment documentation; Incident breach notification (HIPAA/state genetic privacy laws); NIH GDS certification and institutional certification; SOC 2 Type II (genomic data platforms); Consent withdrawal processing procedures'
WHERE name = 'Genomic Data Privacy Officer';

-- BT-022: Biological Materials Transfer Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'NIH Guidelines (material transfer provisions); Bayh-Dole Act (35 USC 200-212 — IP rights in transferred materials); Select Agent Regulations (42 CFR Part 73 — transfer of select agents); USDA-APHIS permits (7 CFR Part 330 — plant pest movement); PHS Act § 361 (imports of biological materials); CDC Import Permit Program (42 CFR Part 71.54)',
  standards_of_creation = 'UBMTA (Uniform Biological Material Transfer Agreement) — NIH; SLA (Simple Letter Agreement) for non-profit transfers; AUTM MTA best practices; CDC/APHIS Import Permit applications; USDA APHIS PPQ 526 (permits for plant material); Material Safety Data Sheet (SDS) for biological materials; Shipping documentation per DOT 49 CFR / IATA DG',
  soc_controls = 'MTA execution and tracking system; Incoming/outgoing biological material inventory; Select agent transfer form (APHIS/CDC Form 2) compliance; Import permit compliance tracking; Export control screening (EAR/ITAR for dual-use materials); Chain of custody during shipping; Training documentation for shipping infectious/biological materials'
WHERE name = 'Biological Materials Transfer Specialist';

-- BT-023: Institutional Animal Care and Use Committee (IACUC) Administrator
UPDATE citizen_catalog SET
  governing_guidelines = 'Animal Welfare Act (7 USC 2131-2159); 9 CFR Parts 1-4 (Animal Welfare Regulations — USDA); PHS Policy on Humane Care and Use of Laboratory Animals; Health Research Extension Act (42 USC 289d); Guide for the Care and Use of Laboratory Animals (8th Edition — NRC)',
  standards_of_creation = 'Guide for the Care and Use of Laboratory Animals (the "Guide") — NRC, 8th Edition; AAALAC International Rules of Accreditation; AVMA Guidelines for the Euthanasia of Animals (2020); OLAW PHS Assurance documentation requirements; IACUC protocol review standards (Full Committee or Designated Member); Annual facility inspection documentation; Post-approval monitoring program documentation',
  soc_controls = 'IACUC meeting minutes and protocol review records; USDA annual report documentation; OLAW annual report (Assurance); Veterinary care records; Occupational health and safety program for animal handlers; AAALAC site visit readiness documentation; Protocol noncompliance reporting and CAPA; Semi-annual facility inspection reports; Pain/distress categorization documentation (USDA pain categories)'
WHERE name = 'Institutional Animal Care and Use Committee (IACUC) Administrator';

-- BT-024: Conflict of Interest (COI) Officer — Research
UPDATE citizen_catalog SET
  governing_guidelines = '42 CFR Part 50 Subpart F (PHS Financial Conflict of Interest — FCOI); 45 CFR Part 94 (Responsible Prospective Contractors); NSF Proposal and Award Policies (COI provisions); 2 CFR § 200.318 (Conflict of Interest under Uniform Guidance); State and institutional COI policies; CMS Open Payments (42 USC 1320a-7h) — applicable to clinical researchers',
  standards_of_creation = 'PHS FCOI Final Rule procedures (2011, updated 2024); NIH FCOI tutorial and training certification; FCOI disclosure form standards; Management plan documentation for identified conflicts; Public accessibility of FCOI information (PHS requirement); Subrecipient FCOI certification procedures; Retrospective review procedures for noncompliant disclosures',
  soc_controls = 'FCOI disclosure tracking system; Training completion verification; Management plan implementation monitoring; Public posting of identified financial conflicts (PHS § 50.605); Annual/ongoing disclosure updates; Subrecipient FCOI compliance certification; Retrospective review and corrective action documentation; Reporting to PHS awarding component (within 60 days of identification)'
WHERE name = 'Conflict of Interest (COI) Officer — Research';

-- FS-001: Food Safety Manager / HACCP Team Leader
UPDATE citizen_catalog SET
  governing_guidelines = 'FSMA (Food Safety Modernization Act) — PL 111-353; 21 CFR Part 117 (Current Good Manufacturing Practice, Hazard Analysis, and Risk-Based Preventive Controls for Human Food); 21 CFR Part 120 (Hazard Analysis and Critical Control Point — Juice); 21 CFR Part 123 (HACCP — Seafood); 9 CFR Part 417 (HACCP — Meat and Poultry — FSIS); Codex Alimentarius General Principles of Food Hygiene (CXC 1-1969)',
  standards_of_creation = 'NACMCF (National Advisory Committee on Microbiological Criteria for Foods) HACCP Guidelines; Codex Alimentarius HACCP principles (7 principles, 12 steps); FDA FSMA Preventive Controls Rule guidance documents; GFSI (Global Food Safety Initiative) benchmarked scheme requirements (SQF, BRC, FSSC 22000); FDA Food Safety Plan template and model; Prerequisite Programs documentation standards (SOPs); PCQI (Preventive Controls Qualified Individual) training requirements',
  soc_controls = 'HACCP/Food Safety Plan documentation and annual reanalysis; CCP monitoring records with corrective actions; Verification and validation records (including environmental monitoring); Supplier approval and verification documentation; Recall plan documentation and mock recall records; SOC 2 Type II (food safety data management systems); Internal audit program documentation; Management review records; FDA registration (21 CFR Part 1 Subpart H) and biennial renewal'
WHERE name = 'Food Safety Manager / HACCP Team Leader';

-- FS-002: Preventive Controls Qualified Individual (PCQI)
UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR § 117.126 (Food Safety Plan — PCQI requirement); 21 CFR Part 117 Subparts C and G (Hazard Analysis and Preventive Controls); FSMA § 103 (Hazard Analysis and Risk-Based Preventive Controls); 21 CFR § 117.155-180 (Verification requirements)',
  standards_of_creation = 'FDA/FSPCA (Food Safety Preventive Controls Alliance) PCQI Training Curriculum; FSPCA Model Food Safety Plan forms; Hazard analysis worksheet format; Preventive controls documentation (process, allergen, sanitation, supply-chain); Corrective action and correction procedures documentation; Recall plan content requirements; Verification procedures: monitoring, corrective actions, calibration, product testing, environmental monitoring, supplier',
  soc_controls = 'PCQI qualification documentation (training certificate); Food safety plan signature/dating by PCQI; Monitoring records completeness and timeliness verification; Corrective action records with root cause documentation; Verification records (activities, frequencies, results); Reanalysis documentation (every 3 years minimum or when triggered); Supply-chain program documentation for suppliers'
WHERE name = 'Preventive Controls Qualified Individual (PCQI)';

-- FS-003: Food Manufacturing Quality Assurance Manager
UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR Part 117 Subpart B (cGMP for human food); 21 CFR Part 110 (legacy cGMP — still referenced); 9 CFR Part 416 (Sanitation — FSIS); GFSI benchmarked schemes (SQF Code, BRCGS Food Safety, FSSC 22000); ISO 22000:2018 (Food Safety Management Systems)',
  standards_of_creation = 'SQF Code Edition 9 (2020); BRCGS Global Standard for Food Safety Issue 9; FSSC 22000 Version 6; ISO 22000:2018 (management system requirements); ISO/TS 22002-1 (Prerequisite programmes on food safety — food manufacturing); Codex Alimentarius General Principles of Food Hygiene; AOAC International Official Methods (analytical methods for food)',
  soc_controls = 'GFSI certification audit documentation (annual surveillance, triennial recertification); Nonconformance and CAPA management system; Document control and records management; Internal audit program (minimum annual); Management review records; Customer complaint tracking and trending; Traceability exercise documentation (mock recall — 4-hour target); SOC 2 Type II (quality management IT systems); Environmental monitoring program documentation'
WHERE name = 'Food Manufacturing Quality Assurance Manager';

-- FS-004: Food Microbiologist
UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR Part 117 Subpart C (Hazard Analysis — biological hazards); 9 CFR Part 430 (FSIS Listeria monocytogenes requirements); FDA BAM (Bacteriological Analytical Manual); USDA-FSIS MLG (Microbiology Laboratory Guidebook); FDA FSMA Preventive Controls — environmental monitoring provisions',
  standards_of_creation = 'FDA BAM (official microbiological methods); USDA-FSIS MLG (official FSIS methods); AOAC International Official Methods of Analysis; ISO 17025:2017 (General Requirements for Competence of Testing Laboratories); ISO 7218 (Microbiology of Food and Animal Feed — General Requirements); CLSI/AOAC validation of rapid methods; NACMCF Guidelines for Validation of Microbiological Methods',
  soc_controls = 'Laboratory accreditation (ISO 17025) or FDA LERN (Laboratory Excellence and Response Network); Proficiency testing program participation; Culture collection maintenance and verification; Equipment calibration and maintenance records; Method validation/verification documentation; Environmental monitoring trending and corrective actions; Chain of custody for food samples; Pathogen-positive hold-and-release documentation'
WHERE name = 'Food Microbiologist';

-- FS-005: Food Labeling Compliance Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'FD&C Act § 403 (21 USC 343 — Misbranded Food); 21 CFR Part 101 (Food Labeling — FDA); 9 CFR Part 317 (Labeling — Meat Products — FSIS); 9 CFR Part 381 Subpart N (Labeling — Poultry Products — FSIS); Nutrition Labeling and Education Act (NLEA) (PL 101-535); Food Allergen Labeling and Consumer Protection Act (FALCPA) (PL 108-282); FASTER Act (PL 117-11 — sesame as major allergen); Bioengineered Food Disclosure Standard (7 CFR Part 66 — AMS)',
  standards_of_creation = 'FDA Nutrition Facts Label format (21 CFR § 101.9); FDA Guidance: Food Labeling Guide (2013, updated); USDA-FSIS Labeling Policy Book; USDA-FSIS Label approval procedures (FSIS Form 7234-1); FDA Food Additive and GRAS listing verification; USDA-AMS National Bioengineered Food Disclosure Standard format; Allergen labeling requirements ("Contains" statement or parenthetical); Nutrition facts calculation methods (NLEA database/analytical)',
  soc_controls = 'Label review and approval process documentation; Ingredient statement verification against formulation records; Allergen cross-contact assessment documentation; Nutrition facts panel verification (laboratory analysis or database calculation); Net weight/volume verification program; USDA-FSIS prior label approval documentation; Label change control system; Consumer complaint tracking related to labeling'
WHERE name = 'Food Labeling Compliance Specialist';

-- FS-006: Food Allergen Management Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'FALCPA (PL 108-282 — 8 major allergens + sesame per FASTER Act); 21 CFR § 101.4 (Ingredient statement requirements); 21 CFR Part 117 Subpart C (Allergen preventive controls); 9 CFR § 317.2 / 381.118 (FSIS allergen labeling); FDA Guidance: Allergen Questions and Answers (current); FDA Advisory Committee on Food Allergens recommendations',
  standards_of_creation = 'FDA Allergen Guidance for Industry; GFSI scheme requirements for allergen management (SQF, BRC, FSSC 22000); VITAL (Voluntary Incidental Trace Allergen Labelling) 3.0 Reference Doses; Allergen risk assessment methodology; Allergen cleaning validation protocols; AOAC SMPR (Standard Method Performance Requirements) for allergen testing; Allergen control plan documentation standards',
  soc_controls = 'Allergen mapping and ingredient review documentation; Supplier allergen declarations and questionnaires; Changeover/cleaning verification records; Allergen testing program records (ELISA, lateral flow, PCR); Label verification (allergen declarations); Corrective actions for allergen cross-contact events; Allergen recall readiness documentation'
WHERE name = 'Food Allergen Management Specialist';

-- FS-007: Country of Origin Labeling (COOL) Compliance Officer
UPDATE citizen_catalog SET
  governing_guidelines = 'Agricultural Marketing Act of 1946 § 281-292 (7 USC 1638-1638d); 7 CFR Part 65 (Country of Origin Labeling — Covered Commodities); 7 CFR Part 60 (Country of Origin Labeling — Fish and Shellfish); Farm Security and Rural Investment Act of 2002 § 10816 (COOL mandate); 2008 Farm Bill COOL amendments; 2016 Consolidated Appropriations Act (muscle cuts of beef/pork exemption)',
  standards_of_creation = 'USDA-AMS COOL regulation compliance guides; COOL recordkeeping requirements (country and production method); Retailer placards/labeling format; Supplier declarations and affidavits; Wild-caught vs. farm-raised designation standards (fish/shellfish); Ground product labeling requirements; Production step documentation (born, raised, slaughtered)',
  soc_controls = 'Supplier affidavit/declaration tracking; Retail display compliance verification; USDA-AMS audit and review documentation; Traceability records (from supplier to retail display); Corrective action documentation for labeling errors; Employee training on COOL requirements'
WHERE name = 'Country of Origin Labeling (COOL) Compliance Officer';

-- FS-008: USDA-FSIS Compliance Officer
UPDATE citizen_catalog SET
  governing_guidelines = 'Federal Meat Inspection Act (FMIA) (21 USC 601-695); Poultry Products Inspection Act (PPIA) (21 USC 451-472); Egg Products Inspection Act (EPIA) (21 USC 1031-1056); 9 CFR Parts 301-592 (FSIS regulations); Humane Methods of Slaughter Act (7 USC 1901-1907); 9 CFR Part 500 (Rules of Practice — enforcement actions)',
  standards_of_creation = 'FSIS Directive Series (7000-10000 — inspection procedures); FSIS Inspection Methods guides; FSIS PHIS (Public Health Information System) documentation; PHIS Inspection Task procedures; FSIS NR (Non-compliance Record) documentation standards; FSIS HACCP inspection tasks checklist; Humane handling verification procedures (Directive 6900.2)',
  soc_controls = 'PHIS electronic documentation and reporting; NR (Non-compliance Record) issuance and tracking; NOIE (Notice of Intended Enforcement) procedures; Suspension/withdrawal documentation; FSIS Sampling Program results documentation; In-plant inspection frequency and scheduling documentation; Consumer complaint follow-up records'
WHERE name = 'USDA-FSIS Compliance Officer';

-- FS-009: USDA Accredited Veterinarian
UPDATE citizen_catalog SET
  governing_guidelines = '9 CFR Part 160-162 (National Veterinary Accreditation Program — NVAP); 9 CFR Part 71 (General Provisions — Interstate Livestock Movement); 9 CFR Part 75-80 (Disease-specific regulations — tuberculosis, brucellosis); Animal Health Protection Act (7 USC 8301-8322); State veterinary practice acts; 9 CFR Part 161.4 (Standards for accredited veterinarian duties)',
  standards_of_creation = 'NVAP Accreditation standards (Category I: companion/equine; Category II: all species including food animals); APHIS VS Form 17-140 (Certificate of Veterinary Inspection — CVI); APHIS VS Form 6-22 (Health Certificate for Export); USDA-APHIS Veterinary Services Memoranda; AVMA Model Veterinary Practice Act; State-specific CVI (Certificate of Veterinary Inspection) requirements; NAHMS (National Animal Health Monitoring System) data collection protocols',
  soc_controls = 'NVAP accreditation maintenance and training documentation; USAHA (United States Animal Health Association) standards for CVI issuance; APHIS VS electronic CVI systems (GVL — Global VetLink, VSPS — Veterinary Services Process Streamlining); Health certificate completeness and accuracy verification; Disease testing result documentation and reporting; Reporting of reportable diseases within 24 hours to State Veterinarian; Accreditation audit and renewal documentation'
WHERE name = 'USDA Accredited Veterinarian';

-- FS-010: State Veterinarian
UPDATE citizen_catalog SET
  governing_guidelines = 'State animal health statutes and regulations; Animal Health Protection Act (7 USC 8301-8322) — cooperative agreements; 9 CFR Parts 71-80 (Interstate movement restrictions); OIE/WOAH (World Organisation for Animal Health) Terrestrial Code; National Poultry Improvement Plan (NPIP) (9 CFR Parts 56, 145-147); Swine Health Improvement Plan (SHIP) framework',
  standards_of_creation = 'State-specific import/export animal health requirements; Quarantine order documentation standards; Disease surveillance and outbreak investigation protocols; Indemnity and depopulation documentation (cooperative agreements with APHIS); Animal disease traceability documentation (9 CFR Part 86); Premises registration (National Premises ID — NAIS/ADT)',
  soc_controls = 'Interstate movement permit tracking; Quarantine enforcement documentation; Disease reporting system (NAHRS — National Animal Health Reporting System); Indemnity payment processing and audit trail; Epidemiological investigation records; USDA-APHIS cooperative agreement compliance; Emergency management plan documentation (FAD — Foreign Animal Disease)'
WHERE name = 'State Veterinarian';

-- FS-011: Grain Inspector (FGIS)
UPDATE citizen_catalog SET
  governing_guidelines = 'United States Grain Standards Act (USGSA) (7 USC 71-87k); United States Warehouse Act (USWA) (7 USC 241-273); Agricultural Marketing Act of 1946 (7 USC 1621-1627); 7 CFR Part 800 (General Regulations — Grain Standards); 7 CFR Part 801 (Official Grain Standards — United States); 7 CFR Part 802 (Official Grain Standards — Special)',
  standards_of_creation = 'FGIS Grain Inspection Handbook (Books I-IV); FGIS Equipment Handbook; FGIS Grain Inspection Procedures; Official U.S. Standards for Grain (wheat, corn, soybeans, etc.); Mycotoxin testing procedures (aflatoxin, DON, fumonisin); Protein/oil content determination procedures; Official grade certificate documentation requirements',
  soc_controls = 'FGIS licensing and delegation documentation; Inspection equipment calibration and certification; Sample integrity and chain of custody; Grade certificate accuracy verification; Conflict of interest controls; USDA-AMS audit and compliance review; Proficiency testing program participation (check samples)'
WHERE name = 'Grain Inspector (FGIS)';

-- FS-012: Food Recall Coordinator
UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR Part 7 (Enforcement Policy — Recalls); FD&C Act § 423 (21 USC 350l — Mandatory Recall Authority — FSMA); FMIA § 20 (21 USC 679a — USDA mandatory recall for meat/poultry); FDA Reportable Food Registry (RFR) — FD&C Act § 417 (21 USC 350f); 9 CFR Part 418 (FSIS Recall procedures)',
  standards_of_creation = 'FDA Recall Guidance (Industry guidance on voluntary recalls); FDA Recall Classification (Class I/II/III) criteria; FSIS Recall Directive 8080.1 (Recall of Meat and Poultry Products); FDA Reportable Food Registry (RFR) electronic portal submission; Recall notification format (press release, customer letters); Recall effectiveness check documentation; Root cause analysis documentation for recall events; FDA RFR electronic submission (Safety Reporting Portal)',
  soc_controls = 'Product traceability system (1-up/1-back per FSMA § 204); Customer/distributor notification tracking; Product retrieval and disposition documentation; Recall effectiveness checks (Level A/B/C); Mock recall program documentation (annual minimum); FDA/FSIS coordination and reporting; Consumer complaint correlation analysis; Post-recall corrective action and preventive measures'
WHERE name = 'Food Recall Coordinator';

-- FS-013: Food Defense Coordinator
UPDATE citizen_catalog SET
  governing_guidelines = 'FSMA § 106 (Intentional Adulteration — IA); 21 CFR Part 121 (Mitigation Strategies to Protect Food Against Intentional Adulteration); 21 CFR § 121.130 (Food Defense Plan requirement); Homeland Security Presidential Directive 9 (HSPD-9 — Defense of United States Agriculture and Food); Presidential Policy Directive 21 (PPD-21 — Critical Infrastructure Security and Resilience); FDA FSMA Intentional Adulteration Rule final rule (2016)',
  standards_of_creation = 'FDA Intentional Adulteration Compliance Guidance; CARVER+Shock vulnerability assessment methodology; FDA Food Defense Plan Builder tool format; Mitigation strategies documentation (21 CFR § 121.138); Food defense monitoring procedures; Corrective action procedures for food defense; Reanalysis requirements documentation; FDPQI (Food Defense Plan Qualified Individual) training requirements — FSPCA IA curriculum',
  soc_controls = 'Food defense plan documentation and controlled access; Vulnerability assessment records; Mitigation strategy monitoring records; Corrective action records for food defense deviations; Verification activity records; Reanalysis documentation (triennial minimum); Personnel security measures (background checks, access control); FDPQI qualification documentation (training certificate); Insider threat awareness training records'
WHERE name = 'Food Defense Coordinator';

-- FS-014: USDA Organic Certifying Agent
UPDATE citizen_catalog SET
  governing_guidelines = 'Organic Foods Production Act (OFPA) (7 USC 6501-6523); 7 CFR Part 205 (National Organic Program — NOP); 7 CFR § 205.400-405 (Certification requirements); 7 CFR § 205.501-510 (Accreditation of certifying agents); USDA NOP Handbook',
  standards_of_creation = 'USDA NOP Program Handbook (Instructions, Guidance, Policy Memos); NOP 2601 (Instructions for Organic Inspection); NOP 2609 (Residue Testing); NOP 4009 (National List of Allowed and Prohibited Substances); IOIA (International Organic Inspectors Association) Training Standards; Organic System Plan (OSP) template and requirements; NOP Organic Integrity Database (OID) listing procedures',
  soc_controls = 'NOP accreditation and peer review documentation; Annual inspection and certification records; Organic system plan review and approval; Noncompliance and adverse action documentation; NOP complaint and mediation processes; Residue testing documentation (5% minimum of certified operations); Label review for organic claims; NOP Organic Integrity Database maintenance; Traceability/mass balance audits (organic in vs. organic out)'
WHERE name = 'USDA Organic Certifying Agent';

-- FS-015: Organic Farm Inspector (IOIA)
UPDATE citizen_catalog SET
  governing_guidelines = '7 CFR Part 205 Subpart C (Organic Production and Handling Requirements); 7 CFR § 205.201-207 (Organic production and handling system plan); 7 CFR § 205.300-311 (Organic crop production, livestock, wild crop); 7 CFR Part 205 Subpart G (Administrative — inspections)',
  standards_of_creation = 'IOIA Inspector Training Standards and Continuing Education; NOP 2601 (Organic Inspection Instructions); On-site inspection report format requirements; Exit interview documentation standards; Compliance determination worksheet; Input verification procedures (materials review); Buffer zone and drift mitigation documentation; Transitional period verification (36-month crop; 12-month livestock)',
  soc_controls = 'Inspector qualification and training records; On-site inspection report completeness; Sample collection and chain of custody (residue testing); Photographic documentation standards; Conflict of interest disclosure; Inspector evaluation/peer review; Observation tracking (minor/major/critical)'
WHERE name = 'Organic Farm Inspector (IOIA)';

-- FS-016: Pesticide Registration Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'FIFRA (Federal Insecticide, Fungicide, and Rodenticide Act) (7 USC 136-136y); 40 CFR Parts 150-189 (Pesticide Programs — EPA); 40 CFR Part 152 (Pesticide Registration and Classification Procedures); 40 CFR Part 158 (Data Requirements for Pesticides); FFDCA (21 USC 346a — Tolerances and Exemptions for Pesticide Chemical Residues in Food); FQPA (Food Quality Protection Act) (PL 104-170); Endangered Species Act § 7 (EPA consultation for pesticides)',
  standards_of_creation = 'EPA Pesticide Registration Manual; 40 CFR Part 158 Data Requirements (toxicology, ecotoxicology, environmental fate, product chemistry); EPA Label Review Manual (LRM); EPA PR Notices (Pesticide Registration Notices); EPA Pesticide Label format (FIFRA § 2(q) — labeling requirements); GLP (40 CFR Part 160) for all registration studies; EPA Reregistration and Registration Review procedures; State registration (SLN — Special Local Needs — Section 24(c))',
  soc_controls = 'EPA OPP electronic submission system (OPPIN/PRISM); GLP study compliance and QA documentation; Data compensation and citation tracking (FIFRA § 3(c)(1)(F)); EPA Registration Review docket compliance; Product chemistry analytical method validation; Tolerance petition documentation; Annual production/sales reporting'
WHERE name = 'Pesticide Registration Specialist';

-- FS-017: Pesticide Residue Chemist
UPDATE citizen_catalog SET
  governing_guidelines = '40 CFR Part 180 (Tolerances and Exemptions for Pesticide Chemical Residues in Food); FD&C Act § 408 (21 USC 346a — Tolerances for pesticide residues); 21 CFR Part 120/123 (HACCP — chemical hazard analysis); USDA-AMS PDP program requirements',
  standards_of_creation = 'EPA Residue Chemistry Test Guidelines (OPPTS 860 Series); FDA Pesticide Analytical Manual (PAM) — Volumes I and II; USDA PDP Standard Operating Procedures; AOAC Official Methods (pesticide residue analysis); Multi-Residue Methods (QuEChERS, etc.); Method validation per FDA/EPA/CODEX guidelines; ISO 17025 accreditation for residue laboratories',
  soc_controls = 'Laboratory accreditation (ISO 17025) documentation; Proficiency testing program results; Method validation and LOQ/LOD documentation; Instrument calibration and maintenance records; Chain of custody for samples; Quality control (recovery, blanks, duplicates) documentation; Violation reporting procedures (tolerance exceedances); Database management for residue monitoring results'
WHERE name = 'Pesticide Residue Chemist';

-- FS-018: Worker Protection Standard (WPS) Compliance Officer
UPDATE citizen_catalog SET
  governing_guidelines = 'EPA Worker Protection Standard (WPS) (40 CFR Part 170); FIFRA § 12(a)(2)(G) (Use inconsistent with labeling); OSHA General Duty Clause (29 USC 654); OSHA Field Sanitation Standard (29 CFR 1928.110); EPA Certification and Training requirements (40 CFR Part 171)',
  standards_of_creation = 'EPA WPS How to Comply Manual (2024); EPA WPS Training Materials (EPA-approved curricula); EPA Pesticide Safety Training (annual worker/handler training); Restricted Entry Interval (REI) compliance documentation; Central Posting location requirements; Application Exclusion Zone (AEZ) documentation; Decontamination site documentation; EPA Certified Applicator credential maintenance',
  soc_controls = 'Worker/handler training records (name, date, trainer, EPA number); Application records (within 24 hours of application); Central posting information maintenance; REI notification records; Decontamination supply verification; Emergency medical information packet; PPE maintenance and disposal records; State inspection compliance documentation'
WHERE name = 'Worker Protection Standard (WPS) Compliance Officer';

-- FS-019: Agricultural Water Quality Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'FSMA Produce Safety Rule (21 CFR Part 112); 21 CFR § 112.41-112.50 (Agricultural Water — Produce Safety); Clean Water Act § 402 (33 USC 1342 — NPDES permits); Safe Drinking Water Act (42 USC 300f-300j); EPA 40 CFR Part 141 (National Primary Drinking Water Regulations); State agricultural water use regulations',
  standards_of_creation = 'FDA FSMA Produce Safety Rule — Agricultural Water provisions; FDA Agricultural Water Assessment guidance (final rule 2024); EPA Method 1603 (E. coli in water); EPA Method 1604 (Total coliforms and E. coli in water); Standard Methods for the Examination of Water and Wastewater (APHA/AWWA/WEF); Agricultural water system inspection documentation; Water treatment verification documentation; Die-off and setback interval calculation documentation',
  soc_controls = 'Water testing records (sampling location, date, results); Water system inspection and maintenance records; Corrective action documentation for water quality failures; Agricultural water assessment documentation; Treatment system monitoring records; Laboratory accreditation for water testing; Trend analysis for water quality data; Annual water assessment review documentation'
WHERE name = 'Agricultural Water Quality Specialist';

-- FS-020: Soil Scientist / Agronomist
UPDATE citizen_catalog SET
  governing_guidelines = 'FSMA Produce Safety Rule (21 CFR Part 112 — biological soil amendments of animal origin); 21 CFR § 112.51-60 (Biological soil amendments); 40 CFR Part 503 (Standards for the Use or Disposal of Sewage Sludge — biosolids); USDA-NRCS Conservation Practice Standards; State nutrient management regulations; Clean Water Act § 319 (Nonpoint source pollution)',
  standards_of_creation = 'SSSA Certification (CPSS/CPSC) Body of Knowledge; ASA/ACSESS CCA Certification standards; USDA-NRCS Soil Survey Manual; USDA-NRCS Field Office Technical Guide (FOTG); Nutrient management plan documentation standards; Soil sampling protocols (grid, zone, composite); Laboratory methods (Mehlich-3, Bray, Olsen for phosphorus; KCl for nitrogen); Biological soil amendment of animal origin (BSAAO) treatment verification per FSMA',
  soc_controls = 'Soil testing laboratory accreditation (NAPT — North American Proficiency Testing); Soil sample chain of custody; Nutrient management plan review and update documentation; Manure/compost application records; Composting process verification (time-temperature documentation per FSMA); Environmental compliance records (nutrient runoff prevention); Conservation practice implementation verification'
WHERE name = 'Soil Scientist / Agronomist';

-- FS-021: Veterinary Drug Regulatory Affairs Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'FD&C Act § 512 (21 USC 360b — New Animal Drug Applications — NADA); 21 CFR Part 514 (New Animal Drug Applications); 21 CFR Part 515 (Medicated Feed Mill Licenses); 21 CFR Part 558 (New Animal Drugs for Use in Animal Feeds); Animal Drug User Fee Act (ADUFA) (21 USC 379j-11); Veterinary Feed Directive (VFD) Rule (21 CFR Part 558); Animal Drug Availability Act (ADAA) of 1996',
  standards_of_creation = 'FDA-CVM Guidance for Industry (GFI) series; VICH (Veterinary International Conference on Harmonization) guidelines; VICH GL1-GL56 (harmonized requirements for quality, safety, efficacy); FDA-CVM NADA/ANADA application format requirements; Environmental Assessment for NADAs (21 CFR Part 25); Target Animal Safety documentation (VICH GL43); Human Food Safety assessment for food animal drugs (VICH GL36)',
  soc_controls = 'FDA-CVM electronic submission standards; GLP compliance for animal drug studies (21 CFR Part 58); GMP compliance for animal drug manufacturing (21 CFR Parts 210-211, 225-226); Adverse event reporting (CVM-ADE system); Post-approval monitoring documentation; Withdrawal period verification documentation; SOC 2 Type II (regulatory information management systems)'
WHERE name = 'Veterinary Drug Regulatory Affairs Specialist';

-- FS-022: Food Animal Veterinarian
UPDATE citizen_catalog SET
  governing_guidelines = 'State Veterinary Practice Acts; Veterinary Feed Directive Rule (21 CFR Part 558.6); AMDUCA (Animal Medicinal Drug Use Clarification Act) (21 USC 360b(a)(4)); 21 CFR Part 530 (Extra-label Drug Use in Animals); VCPR (Veterinarian-Client-Patient Relationship) requirements (21 CFR § 530.3(i)); National Residue Program requirements',
  standards_of_creation = 'AVMA Principles of Veterinary Medical Ethics; AVMA Guidelines for the Judicious Use of Antimicrobials; AABP (American Association of Bovine Practitioners) Guidelines; FARAD (Food Animal Residue Avoidance Databank) withdrawal recommendations; Veterinary medical record documentation standards; Extra-label drug use documentation requirements (21 CFR Part 530); VFD documentation and recordkeeping (retain 2 years)',
  soc_controls = 'Veterinary medical records completeness and retention; VFD issuance and record retention documentation; Drug inventory and dispensing records; Withdrawal period compliance verification; VCPR establishment documentation; Residue monitoring cooperation (FSIS National Residue Program); Antimicrobial use reporting (where required by state/federal programs); Treatment records for food animals (individual or herd/flock)'
WHERE name = 'Food Animal Veterinarian';

-- FS-023: Phytosanitary Certificate Officer
UPDATE citizen_catalog SET
  governing_guidelines = 'Plant Protection Act (7 USC 7701-7786); 7 CFR Part 353 (Export Certification); International Plant Protection Convention (IPPC) standards; ISPM (International Standards for Phytosanitary Measures) No. 7 (Phytosanitary Certification System); ISPM No. 12 (Phytosanitary Certificates); Bilateral phytosanitary protocols (country-specific)',
  standards_of_creation = 'APHIS PPQ Treatment Manual; APHIS Phytosanitary Certificate Issuance and Tracking (PCIT) system; ISPM 12 (model phytosanitary certificate format); ISPM 15 (Regulation of Wood Packaging Material in International Trade); Export inspection and certification procedures per commodity; Treatment certification documentation (fumigation, cold treatment, heat treatment); Additional declaration requirements (country-specific)',
  soc_controls = 'PCIT system electronic documentation and audit trail; Inspector qualification and authorization records; Treatment facility approval documentation; Export lot identification and traceability; Phytosanitary certificate cancellation/amendment procedures; APHIS audit of accredited certification programs; Non-compliance notification tracking (from importing countries)'
WHERE name = 'Phytosanitary Certificate Officer';

-- FS-024: Commodity Broker / CFTC Compliance Officer — Agricultural
UPDATE citizen_catalog SET
  governing_guidelines = 'Commodity Exchange Act (CEA) (7 USC 1-27f); CFTC Regulations (17 CFR Parts 1-190); 17 CFR Part 1 (General Regulations Under the CEA); 17 CFR Part 4 (Commodity Pool Operators and Commodity Trading Advisors); Dodd-Frank Act Title VII (OTC Derivatives — agricultural commodity swaps); NFA Compliance Rules; Position Limit Rules (17 CFR Part 150 — agricultural commodity limits)',
  standards_of_creation = 'NFA Compliance Rule 2-9 (Supervision); NFA Compliance Rule 2-29 (Communications with the Public); CME Group Rulebook (agricultural contract specifications); CBOT/CME Agricultural commodity delivery specifications; CFTC Large Trader Reporting requirements (17 CFR Part 17); Warehouse receipt documentation standards; Position reporting and aggregation documentation; Customer account documentation (risk disclosure, customer agreements)',
  soc_controls = 'NFA registration and annual questionnaire compliance; Customer fund segregation documentation (17 CFR Part 1); Daily segregation computation records; Position limit monitoring and compliance documentation; Delivery/settlement documentation controls; Trade reporting to swap data repositories; Anti-manipulation surveillance documentation; SOC 1 Type II (trade execution and clearing systems); Complaint handling and resolution documentation'
WHERE name = 'Commodity Broker / CFTC Compliance Officer — Agricultural';

-- FS-025: USDA Export Program Manager
UPDATE citizen_catalog SET
  governing_guidelines = 'Agricultural Trade Act of 1978 (7 USC 5601-5622); 7 CFR Part 1599 (Food for Progress); 7 CFR Part 1590 (McGovern-Dole Food for Education); USDA Export Enhancement Programs (MAP, FMD, QSP, EMP); Sanitary and Phytosanitary (SPS) Agreement (WTO); TBT (Technical Barriers to Trade) Agreement (WTO)',
  standards_of_creation = 'USDA-FAS program participant agreement requirements; Export documentation package requirements (by destination country); Codex Alimentarius standards (international food trade); Certificate of Free Sale documentation; USDA Grading Certificate documentation (for export quality); Halal/Kosher certification documentation (for eligible markets); APHIS veterinary health certificates for animal product export; Country-specific phytosanitary and import requirements',
  soc_controls = 'FAS program compliance and reporting documentation; Export promotion expenditure audit trails; Market development program activity reports; SPS compliance verification for destination markets; Trade show and promotion event documentation; MAP/FMD program annual claims documentation; Country-specific registration and certification tracking'
WHERE name = 'USDA Export Program Manager';

-- FS-026: Federal Crop Insurance Agent / Loss Adjuster
UPDATE citizen_catalog SET
  governing_guidelines = 'Federal Crop Insurance Act (7 USC 1501-1524); 7 CFR Part 400 (General Administrative Regulations — FCIC); 7 CFR Part 457 (Common Crop Insurance Regulations); 7 CFR Part 460 (Additional Coverage — Whole-Farm Revenue Protection); FCIC Crop Insurance Handbook (CIH); Standard Reinsurance Agreement (SRA) provisions',
  standards_of_creation = 'FCIC Crop Insurance Handbook (CIH); FCIC Loss Adjustment Manual Standards Handbook (LAMSH); Commodity-specific Loss Adjustment Standards (LAS) Handbooks; Actuarial documents (county-level premium rates); Acreage and production reporting requirements; Prevented planting documentation standards; Replant payment documentation; Written Agreements documentation',
  soc_controls = 'Acreage reporting verification (FSA/RMA cross-reference); Production evidence documentation (scale tickets, bin measurements); Loss notice and claims filing timeline compliance; Adjuster qualification and certification records; RMA compliance review documentation; Data mining and spot check audit documentation; Agent/company accountability reviews; SRA program integrity provisions compliance'
WHERE name = 'Federal Crop Insurance Agent / Loss Adjuster';

-- FS-027: Produce Safety Alliance (PSA) Grower Trainer
UPDATE citizen_catalog SET
  governing_guidelines = 'FSMA Produce Safety Rule (21 CFR Part 112); 21 CFR § 112.22 (Qualified exemptions); 21 CFR § 112.21 (Exemption for produce rarely consumed raw); FD&C Act § 419 (21 USC 350h — Standards for Produce Safety); State FSMA implementation agreements',
  standards_of_creation = 'PSA Grower Training Course curriculum; PSA Train-the-Trainer certification requirements; FSMA Produce Safety Rule compliance guidance; On-farm food safety plan documentation (non-mandatory but recommended); Worker training documentation requirements (21 CFR § 112.22); Environmental assessment documentation (Subpart I — domestic/wild animals); Equipment, tools, and buildings inspection documentation (Subpart L)',
  soc_controls = 'PSA Grower Training Course certificates; Worker training records; Farm inspection documentation; Growing, harvesting, packing, and holding records; Visitor log and access control documentation; Corrective action documentation; State regulatory inspection records; Annual environmental assessment updates'
WHERE name = 'Produce Safety Alliance (PSA) Grower Trainer';

-- FS-028: FSMA Foreign Supplier Verification Program (FSVP) Importer
UPDATE citizen_catalog SET
  governing_guidelines = 'FSMA § 301 (Foreign Supplier Verification Programs for Importers); 21 CFR Part 1 Subpart L (Foreign Supplier Verification Programs); 21 CFR § 1.500-1.514 (FSVP requirements); FD&C Act § 805 (21 USC 384a — FSVP); FDA Voluntary Qualified Importer Program (VQIP) (21 CFR Part 1 Subpart C)',
  standards_of_creation = 'FDA FSVP Guidance for Industry; Hazard analysis documentation for imported foods; Supplier evaluation and approval documentation; Verification activity documentation (on-site audits, testing, records review); Corrective action procedures for supplier noncompliance; FSVP Qualified Individual training documentation; Supplier records of compliance with applicable FDA regulations',
  soc_controls = 'FSVP records maintained for 2 years minimum; Supplier approval and monitoring documentation; Foreign supplier audit reports (third-party or FDA-recognized); Verification activity frequency documentation; Corrective action records for supplier failures; Import alert screening; VQIP certification documentation (if applicable); SOC 2 Type II (supplier management systems); FDA prior notice compliance (21 CFR Part 1 Subpart I)'
WHERE name = 'FSMA Foreign Supplier Verification Program (FSVP) Importer';

-- FS-029: Agricultural Safety and Health Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'OSHA 29 CFR 1928 (Occupational Safety and Health Standards for Agriculture); OSHA 29 CFR 1910 (General Industry Standards — applicable where 1928 is silent); EPA WPS (40 CFR Part 170) — pesticide handler safety; OSHA Field Sanitation Standard (29 CFR 1928.110); DOL/WHD: MSPA (Migrant and Seasonal Agricultural Worker Protection Act) (29 USC 1801); State agricultural labor safety regulations',
  standards_of_creation = 'OSHA Agricultural Operations guidance documents; NIOSH Agricultural Safety and Health Topic guidelines; ASABE (American Society of Agricultural and Biological Engineers) standards; ANSI/ASABE S318 — Safety for Agricultural Equipment; Tractor ROPS (Rollover Protective Structures) requirements; Confined space entry procedures for agricultural settings (grain bins, manure pits); Heat illness prevention program documentation (Cal/OSHA model)',
  soc_controls = 'OSHA 300 Log and 301 Incident Report documentation; Worker training records (equipment operation, chemical handling); Safety inspection documentation; PPE program records; Emergency action plan documentation; Heat illness prevention program records; Youth employment compliance (DOL/WHD agricultural exemptions); Hazard communication program documentation'
WHERE name = 'Agricultural Safety and Health Specialist';

-- FS-030: FSMA Third-Party Certification Body Auditor
UPDATE citizen_catalog SET
  governing_guidelines = 'FSMA § 307 (Accreditation of Third-Party Auditors); 21 CFR Part 1 Subpart M (Accreditation of Third-Party Certification Bodies); FD&C Act § 808 (21 USC 384d — Accredited Third-Party Certification); FDA Recognition of Accreditation Bodies; FDA Model Accreditation Standards',
  standards_of_creation = 'FDA Accredited Third-Party Certification Program requirements; ISO/IEC 17065 (Conformity Assessment — Requirements for Bodies Certifying Products, Processes, and Services); ISO 17021 (Conformity Assessment — Requirements for Bodies Providing Audit and Certification); GFSI Benchmarking Requirements (applicable scheme documents); Regulatory audit report documentation standards; Consultative audit report documentation standards; Certification decision documentation',
  soc_controls = 'Accreditation body recognition documentation; Auditor qualification and competency records; Audit scheduling and notification documentation; Nonconformity classification and corrective action tracking; Certification decision records and appeals; FDA notification requirements (serious conditions or noncompliance); Annual surveillance audit documentation; Self-assessment and internal audit documentation'
WHERE name = 'FSMA Third-Party Certification Body Auditor';

-- FS-031: Veterinary Feed Directive (VFD) Compliance Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'Veterinary Feed Directive Rule (21 CFR Part 558); 21 CFR § 558.6 (VFD requirements); 21 CFR Part 225 (Current Good Manufacturing Practice for Medicated Feeds); 21 CFR Part 226 (Current Good Manufacturing Practice for Medicated Premixes); AAFCO Model Feed Bill; Guidance for Industry #213 (Transition from OTC to VFD/Rx)',
  standards_of_creation = 'FDA VFD Form (original, copy, distributor copy); FDA-CVM Guidance for Industry #120 (VFD regulation); AAFCO Official Publication (labeling, ingredient definitions); Medicated feed manufacturing documentation; Feed additive compendium usage; VFD recordkeeping requirements (2 years, original or copy); Feed label documentation per AAFCO model',
  soc_controls = 'VFD original and copy retention (2-year minimum); Medicated feed manufacturing records; Feed ingredient traceability; Sequencing/flushing documentation (to prevent carryover); FDA feed mill inspection readiness; Distributor acknowledgment letters (VFD drugs); AAFCO state registration and licensing compliance'
WHERE name = 'Veterinary Feed Directive (VFD) Compliance Specialist';

-- FS-032: FDA Food Facility Registration Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'FD&C Act § 415 (21 USC 350d — Registration of Food Facilities); 21 CFR Part 1 Subpart H (Registration of Food Facilities); Bioterrorism Act § 305 (PL 107-188 — Food Facility Registration); FSMA § 102 (Registration improvements — biennial renewal, suspension authority); 21 CFR § 1.230-1.235 (Registration requirements and procedures)',
  standards_of_creation = 'FDA FURLS (FDA Unified Registration and Listing System) — Food Facility Registration Module; FDA registration form (Form 3537); U.S. Agent designation requirements (foreign facilities); Biennial renewal procedures (even-numbered years, Oct 1 - Dec 31); Registration update requirements (within 60 days of change); Prior notice of imported food (21 CFR Part 1 Subpart I)',
  soc_controls = 'FDA FURLS system access and submission documentation; Registration number verification and tracking; Biennial renewal calendar and compliance; Registration suspension response documentation; Facility type classification accuracy; U.S. Agent correspondence records (foreign facilities); Prior notice filing compliance'
WHERE name = 'FDA Food Facility Registration Specialist';

-- FS-033: Food Fraud Prevention Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'FSMA § 106 (Intentional Adulteration — economically motivated adulteration); 21 CFR Part 117 (preventive controls — supplier verification for fraud-vulnerable ingredients); FD&C Act § 402 (21 USC 342 — Adulterated Food); EU Regulation 2017/625 (for global operations — official controls on food fraud)',
  standards_of_creation = 'GFSI Position Paper on Food Fraud (2014, updated); SSAFE Food Fraud Vulnerability Assessment Tool; USP Food Fraud Database (Food Chemicals Codex); BRC Issue 9 — Food Fraud Vulnerability Assessment requirements; FSSC 22000 — Food Fraud Prevention requirements; SQF Code — Food Fraud requirements; Vulnerability assessment documentation (CARVER+Shock adapted for EMA); Mitigation strategy documentation',
  soc_controls = 'Vulnerability assessment records (annual review); Supplier approval for fraud-vulnerable ingredients; Analytical testing program for authenticity (isotope ratio, DNA testing, spectroscopy); Supply chain mapping and risk assessment; Whistleblower/tip reporting system; Incident response documentation for suspected fraud; Traceability system validation (mass balance)'
WHERE name = 'Food Fraud Prevention Specialist';

-- FS-034: Food Packaging Compliance Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'FD&C Act § 409 (21 USC 348 — Food Additives — food contact substances); 21 CFR Parts 170-199 (Food Additives — Indirect: food contact substances); 21 CFR Part 174 (General — Indirect Food Additives); 21 CFR Part 175-178 (Adhesives, Coatings, Paper/Paperboard, Adjuvants/Polymers); FDA Food Contact Notification (FCN) program (21 CFR § 170.100-106); PFAS regulations (evolving — state and federal)',
  standards_of_creation = 'FDA Guidance: Preparation of Food Contact Notifications (2002/2007); FDA Guidance: Testing for Migration of Food Contact Substances; FDA Threshold of Regulation (TOR) exemption procedures; ASTM methods for food packaging testing; EU Regulation 10/2011 (plastic food contact materials — for global); Overall migration and specific migration testing protocols; Letter of Guarantee documentation standards',
  soc_controls = 'FCN (Food Contact Notification) submission and effectiveness tracking; Supplier certificates of compliance / Letters of Guarantee; Migration testing records; Condition of use documentation; PFAS compliance screening; Lot-to-lot consistency verification; Packaging specification and change control documentation; SOC 2 Type II (supplier management systems)'
WHERE name = 'Food Packaging Compliance Specialist';

-- FS-035: Dairy Safety Inspector / Pasteurized Milk Ordinance Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'Grade "A" Pasteurized Milk Ordinance (PMO) — FDA/PHS; 21 CFR Part 131 (Milk and Cream — Standards of Identity); 21 CFR Part 133 (Cheeses — Standards of Identity); IMS (Interstate Milk Shippers) List; State milk and dairy licensing statutes; NCIMS Procedures (biennial conference updates)',
  standards_of_creation = 'PMO Standards (current revision); PMO Appendix A-N (administrative procedures, chemical, bacteriological standards); Evaluation of Milk Laboratories (EML — FDA/PHS); Methods of Making Sanitation Ratings (MMSR — FDA/PHS); NCIMS Conference Recommendations; IMS List publishing requirements; Dairy plant sanitation inspection documentation; Farm/bulk tank inspection documentation',
  soc_controls = 'PMO sanitation compliance rating documentation; Milk sampling and testing records (SPC, coliform, somatic cell, antibiotics, temperature); MMSR rating calculation documentation; IMS List compliance verification; Dairy farm inspection records; Plant inspection and HACCP records; Pasteurization equipment testing (HTST, UHT) documentation; State laboratory evaluation records (EML)'
WHERE name = 'Dairy Safety Inspector / Pasteurized Milk Ordinance Specialist';

-- FS-036: Seafood HACCP Specialist
UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR Part 123 (HACCP — Fish and Fishery Products); 21 CFR Part 123 Subpart A (General Provisions — mandatory HACCP for seafood); 21 CFR Part 1240.60 (Molluscan shellfish); NSSP (National Shellfish Sanitation Program) Model Ordinance; Magnuson-Stevens Fishery Conservation and Management Act (wild catch documentation); Lacey Act (16 USC 3371-3378 — seafood traceability/IUU fishing)',
  standards_of_creation = 'FDA Fish and Fisheries Products Hazards and Controls Guidance (4th Edition); FDA Seafood HACCP training curriculum (mandatory — trained individual requirement); NSSP Model Ordinance (shellfish — harvesting, processing, distribution); NOAA Seafood Inspection Program — Certificate of Compliance/Grade Certificate format; Seafood Import Monitoring Program (SIMP) — NOAA (16 CFR Part 300.324); ISSC (Interstate Shellfish Sanitation Conference) procedures',
  soc_controls = 'HACCP plan documentation (species/process-specific); CCP monitoring and corrective action records; Trained individual qualification documentation; Shellfish dealer certification and ICSSL (Interstate Certified Shellfish Shippers List); Shellfish harvest area classification documentation; Temperature monitoring records (cold chain); SIMP import documentation (catch data, chain of custody); NOAA inspection/grade certificate records; Recall plan and mock recall documentation'
WHERE name = 'Seafood HACCP Specialist';

-- FS-037: Cannabis/Hemp Compliance Officer (Food/Agriculture Context)
UPDATE citizen_catalog SET
  governing_guidelines = 'Agriculture Improvement Act of 2018 (Farm Bill § 10113 — Hemp legalization); 7 CFR Part 990 (Domestic Hemp Production Program); FD&C Act § 301 (FDA jurisdiction over hemp-derived CBD in food/dietary supplements); State hemp licensing and testing regulations; 21 CFR Part 101 (labeling — hemp food products); State-specific hemp food regulations',
  standards_of_creation = 'USDA-AMS Hemp Production Program licensing requirements; State hemp regulatory plans (approved by USDA); THC testing methodology (total THC, post-decarboxylation calculation); Certificate of Analysis requirements (potency, heavy metals, pesticides, mycotoxins, residual solvents); Laboratory testing per ISO 17025 accreditation; Product labeling compliance for hemp foods; GMP compliance for CBD/hemp food manufacturing',
  soc_controls = 'State license and USDA plan approval documentation; Lot-level THC testing and compliance records; COA documentation and third-party lab verification; Remediation/disposal documentation for noncompliant lots (>0.3% THC); GPS lot location documentation; Sampling and testing chain of custody; State inspection and compliance records; Product labeling review documentation'
WHERE name = 'Cannabis/Hemp Compliance Officer (Food/Agriculture Context)';

-- FS-038: Food Transportation Sanitary Transport Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'FSMA § 111 (Sanitary Transportation of Human and Animal Food); 21 CFR Part 1 Subpart O (Sanitary Transportation of Human and Animal Food); 49 CFR Parts 171-180 (DOT — Hazardous Materials Transportation — overlap for certain food additives); Sanitary Food Transportation Act of 2005',
  standards_of_creation = 'FDA FSMA Sanitary Transportation Rule compliance guidance; Written procedures documentation for shippers, carriers, loaders, receivers; Temperature monitoring documentation requirements; Vehicle/transportation equipment cleanliness documentation; Prior cargo/prior load documentation; Corrective action procedures for temperature deviations; Training documentation for carrier personnel',
  soc_controls = 'Temperature monitoring records (continuous or check-point); Vehicle inspection and cleaning records; Prior load/prior cargo documentation; Shipper specifications documentation; Carrier compliance agreement documentation; Loading/unloading inspection records; Corrective action documentation for in-transit deviations; Training records for all covered personnel'
WHERE name = 'Food Transportation Sanitary Transport Specialist';

-- FS-039: USDA Grading Inspector
UPDATE citizen_catalog SET
  governing_guidelines = 'Agricultural Marketing Act of 1946 (7 USC 1621-1627); 7 CFR Parts 51-58 (Grading and Inspection — Fruits, Vegetables, Dairy, Livestock, Poultry); 7 CFR Part 54 (Meats, Prepared Meats, Meat Products — Grading); 7 CFR Part 56 (Voluntary Grading of Shell Eggs); 7 CFR Part 58 (Grading and Inspection — Dairy Products)',
  standards_of_creation = 'USDA Grade Standards by commodity (U.S. Extra Fancy, U.S. Fancy, U.S. No. 1, etc.); USDA Grading Manual by commodity; USDA Quality/Yield Grade standards for meat (Prime, Choice, Select); USDA Egg Grading Manual; USDA Dairy Grading Standards; Visual inspection standards and defect tolerances; Instrument grading documentation (camera grading, NIR for composition)',
  soc_controls = 'USDA grading certificate issuance records; Grading equipment calibration documentation; Inspector qualification and annual review; Product lot identification and traceability; Grade appeal procedures documentation; Grading service contract documentation; USDA shield/mark authorization and use tracking'
WHERE name = 'USDA Grading Inspector';

-- FS-040: Animal Welfare Auditor — Food Production
UPDATE citizen_catalog SET
  governing_guidelines = 'Humane Methods of Slaughter Act (7 USC 1901-1907); 9 CFR Part 313 (Humane Slaughter of Livestock); FSIS Directive 6900.2 (Humane Handling and Slaughter); National Chicken Council (NCC) Animal Welfare Guidelines; NAMI/AMI Animal Handling Guidelines; State anti-cruelty statutes (applicable to agricultural operations)',
  standards_of_creation = 'PAACO Auditor Certification standards; Dr. Temple Grandin''s Recommended Animal Handling Guidelines (AMI/NAMI); NCC Animal Welfare Audit Program; UEP (United Egg Producers) Animal Husbandry Guidelines; National Pork Board PQA Plus program; BQA (Beef Quality Assurance) program standards; Global Animal Partnership (GAP) 5-Step rating standards; American Humane Certified standards',
  soc_controls = 'Third-party animal welfare audit documentation; Stunning effectiveness monitoring records; Handling facility design and maintenance records; Employee training documentation (animal handling); Video monitoring system documentation (where applicable); Corrective action records for welfare deviations; FSIS Humane Activities tracking documentation; Seasonal/environmental stress mitigation documentation'
WHERE name = 'Animal Welfare Auditor — Food Production';

-- FS-041: Dietary Supplement GMP Compliance Officer
UPDATE citizen_catalog SET
  governing_guidelines = 'DSHEA (Dietary Supplement Health and Education Act) (PL 103-417); 21 CFR Part 111 (cGMP for Dietary Supplements); 21 CFR Part 101 Subpart D (Specific Requirements for Nutrient Content Claims); FD&C Act § 403(r)(6) (Structure/Function Claims); FD&C Act § 413 (21 USC 350b — New Dietary Ingredient Notification — NDI); FTC Act § 5 (Advertising — supplement claims)',
  standards_of_creation = '21 CFR Part 111 cGMP requirements (specifications, manufacturing, packaging, labeling, holding); FDA NDI (New Dietary Ingredient) notification format; USP Dietary Supplements Compendium standards; NSF/ANSI 173 (Dietary Supplements); NSF International Certified for Sport program; USP Verified Mark program; AHPA (American Herbal Products Association) guidance documents; Identity testing requirements per 21 CFR § 111.75',
  soc_controls = 'Component identity testing records (each incoming lot); In-process and finished product testing records; Master manufacturing records and batch production records; Complaint handling and adverse event (AE) reporting (within 15 days for serious AE); Supplier qualification documentation; Stability testing documentation; Label review and approval documentation; SOC 2 Type II (quality management systems); Reserve sample retention documentation'
WHERE name = 'Dietary Supplement GMP Compliance Officer';

-- FS-042: Agricultural Biotechnology Trait Stewardship Manager
UPDATE citizen_catalog SET
  governing_guidelines = '7 CFR Part 340 (USDA-APHIS — Regulated Articles); FIFRA § 3 (EPA registration of PIPs); Coordinated Framework for Biotechnology; Technology Use Agreements (grower contracts); EPA Insect Resistance Management (IRM) requirements for Bt crops; Refuge requirements (EPA/registrant obligations)',
  standards_of_creation = 'Technology Use Agreement (TUA) compliance documentation; EPA IRM compliance plans (structured refuge, refuge-in-a-bag); Grower compliance monitoring and survey documentation; Trait purity and adventitious presence testing; Stewardship program standard operating procedures; Non-regulated status verification (USDA); Grain channel management documentation (segregation); Remediation plan for non-compliant acres',
  soc_controls = 'Grower signed TUA records; IRM compliance survey documentation; Adventitious presence testing records; Grain handling and identity preservation documentation; Non-compliance investigation and corrective action records; Annual compliance monitoring reports to EPA; Trait detection analytical method documentation; Import approval status verification for export markets'
WHERE name = 'Agricultural Biotechnology Trait Stewardship Manager';


-- ═══════════════════════════════════════════════════════════════
-- NONPROFIT, RELIGIOUS, INTERNATIONAL TRADE & LAW
-- ═══════════════════════════════════════════════════════════════

-- NP-001: Nonprofit Tax Counsel
UPDATE citizen_catalog SET
  governing_guidelines = 'IRC Section 501(c)(3)-(c)(29) — Tax-Exempt Organization Categories; IRC Section 508 — Special Rules for Section 501(c)(3) Organizations; IRC Section 509(a) — Private Foundation Definition; 26 CFR 1.501(c)(3)-1 — Organizational and Operational Tests; 26 CFR 1.508-1 — Notification Requirements; Revenue Procedure 2025-5 (IRS Determination Letter Process); IRS Form 1023 Instructions (Application for Recognition of Exemption); IRS Form 1024 Instructions (Non-501(c)(3) Exemptions); ABA Model Rules 1.1 (Competence), 1.6 (Confidentiality)',
  standards_of_creation = 'IRS Exempt Organizations Continuing Professional Education (CPE) Technical Instruction Program texts; IRS Publication 557 — Tax-Exempt Status for Your Organization; IRS Publication 4220 — Applying for 501(c)(3) Tax-Exempt Status; AICPA Statements on Standards for Tax Services (SSTS); ABA Section of Taxation Standards of Tax Practice; Narrative description of activities must satisfy operational test per 26 CFR 1.501(c)(3)-1(c)',
  soc_controls = 'SOC 2 Type II (IRS e-filing system controls, Pay.gov submission); IRS Cyber Assistant access controls; Taxpayer Identification Number (TIN) verification controls; Document retention per Rev. Proc. 98-25 (electronic recordkeeping); Internal access controls for EIN assignment records'
WHERE name = 'Nonprofit Tax Counsel';

-- NP-002: Form 990 Preparer / Reviewer
UPDATE citizen_catalog SET
  governing_guidelines = 'IRC Section 6033 — Returns Required from Exempt Organizations; IRC Section 6104 — Public Inspection of Form 990; 26 CFR 1.6033-2 — Annual Information Returns; 26 CFR 301.6104(d)-1 through -3 — Public Disclosure Requirements; IRS Form 990/990-EZ/990-PF/990-N Instructions (current year); IRS Schedule A-O Instructions (all applicable schedules); AICPA Code of Professional Conduct Section 1.100 (Integrity and Objectivity); Circular 230 (31 CFR Part 10) — Practice Before the IRS',
  standards_of_creation = 'AICPA Audit and Accounting Guide: Not-for-Profit Entities (AAG-NPO); FASB ASC 958 — Not-for-Profit Entities; FASB ASC 958-605 — Revenue Recognition (Contributions); FASB ASU 2016-14 — Presentation of Financial Statements of Not-for-Profit Entities; IRS Governance and Related Topics — 990 (Good Governance Practices); Schedule B (Schedule of Contributors) preparation standards per 26 CFR 1.6033-2(a)(2)(ii)',
  soc_controls = 'SOC 1 Type II (accounting system processing controls); SOC 2 Type II (e-filing transmission security); IRS Modernized e-File (MeF) system authentication; Practitioner PIN program controls; Data integrity controls for public disclosure copies; Access controls for Schedule B donor information (confidential)'
WHERE name = 'Form 990 Preparer / Reviewer';

-- NP-003: UBIT Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'IRC Sections 511-514 — Unrelated Business Taxable Income; IRC Section 512(a)(6) — Separate UBTI Computation (per activity, post-TCJA); IRC Section 513 — Unrelated Trade or Business Definition; IRC Section 514 — Debt-Financed Property; 26 CFR 1.512(a)-1 through 1.514(c)-2 — UBIT Regulations; IRS Form 990-T Instructions — Exempt Organization Business Income Tax Return; Notice 2018-67 (Interim Guidance on TCJA Parking/Transportation UBIT)',
  standards_of_creation = 'AICPA Audit and Accounting Guide: Not-for-Profit Entities (UBI sections); AICPA Technical Practice Aids for Exempt Organizations; IRS UBIT Training Materials (CPE texts); Allocation methodologies per 26 CFR 1.512(a)-1(c) (dual-use facilities); Fragmentation rule application standards per IRC 513(c)',
  soc_controls = 'SOC 1 Type II (revenue tracking system controls for UBI vs exempt function); Allocation methodology documentation and audit trail; Separate accounting controls for each unrelated trade or business; SOC 2 Type II (data segregation for UBI computation systems)'
WHERE name = 'UBIT Specialist';

-- NP-004: Private Foundation Compliance Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'IRC Section 4940 — Excise Tax on Net Investment Income; IRC Section 4941 — Self-Dealing; IRC Section 4942 — Minimum Distribution Requirements (5%); IRC Section 4943 — Excess Business Holdings; IRC Section 4944 — Jeopardizing Investments; IRC Section 4945 — Taxable Expenditures; 26 CFR 53.4941-53.4945 — Private Foundation Excise Tax Regulations; IRC Section 4946 — Disqualified Persons Definition; IRS Form 990-PF Instructions',
  standards_of_creation = 'Council on Foundations Principles of Accountability; National Standards for U.S. Community Foundations (confirmed by CF Insights); IRS Publication 4221-PF — Compliance Guide for 501(c)(3) Private Foundations; Foundation Financial Officers Group (FFOG) Best Practices; Expenditure responsibility requirements per 26 CFR 53.4945-5',
  soc_controls = 'SOC 1 Type II (grant management and distribution tracking systems); Investment portfolio monitoring controls (jeopardy investment screens); Disqualified person transaction screening controls; SOC 2 Type II (foundation management software access controls); Annual distribution calculation verification controls; Self-dealing transaction detection and prevention controls'
WHERE name = 'Private Foundation Compliance Specialist';

-- NP-005: State Charitable Registration Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'Uniform Registration Statement (URS) — Multi-State Filing; State-specific Charitable Solicitation Acts (41 states + DC require registration); Charleston Principles (2001) — Internet Solicitation Guidelines (NASCO); State AG Annual Financial Reporting Requirements; State-specific exemptions for religious, educational, and small organizations; Model Act Concerning the Solicitation of Funds for Charitable Purposes (NASCO)',
  standards_of_creation = 'Unified Registration Statement Instructions; NASCO Guidelines for Charitable Solicitation Compliance; State-specific form instructions (e.g., NY CHAR500, CA RRF-1/CT-2); Multi-State Filer Project (Standardized Reporting); AICPA State Filing Requirements Reference Guide; BBB Wise Giving Alliance Standards for Charity Accountability (20 standards)',
  soc_controls = 'SOC 2 Type II (electronic filing portal security); State registration database access controls; Renewal calendar management and compliance tracking; Document version control for multi-state filings; Financial statement preparation controls per state-specific thresholds'
WHERE name = 'State Charitable Registration Specialist';

-- NP-006: Professional Fundraiser / Solicitation Counsel
UPDATE citizen_catalog SET
  governing_guidelines = 'State Professional Fundraiser/Solicitor Registration Acts (varies by state); State solicitation contract filing requirements; FTC Telemarketing Sales Rule (16 CFR 310) — Charitable Solicitation Provisions; State Do-Not-Call compliance requirements; Telephone Consumer Protection Act (47 USC 227) — Charitable exemption limits; State percentage-based disclosure requirements for solicitations',
  standards_of_creation = 'Association of Fundraising Professionals (AFP) Code of Ethical Standards; AFP Standards of Professional Practice; Donor Bill of Rights (AFP/AAFRC); National Council of Nonprofits Fundraising Best Practices; State-specific contract templates for fundraiser/charity agreements',
  soc_controls = 'SOC 2 Type II (donor database security — PII, payment card data); PCI DSS (online donation processing); CRM system access controls (Salesforce, Bloomerang, etc.); Solicitation script audit controls; Donor data breach notification compliance per state laws'
WHERE name = 'Professional Fundraiser / Solicitation Counsel';

-- NP-007: Donor Acknowledgment / Gift Administration Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'IRC Section 170(f)(8) — Contemporaneous Written Acknowledgment ($250+); IRC Section 170(f)(12) — Vehicle Donations; IRC Section 6115 — Quid Pro Quo Contribution Disclosure ($75+); 26 CFR 1.170A-13 — Substantiation and Reporting Requirements; IRS Publication 1771 — Charitable Contributions: Substantiation and Disclosure Requirements; IRC Section 170(f)(11) — Appraisal Requirements for Noncash Gifts ($5,000+)',
  standards_of_creation = 'IRS Model Acknowledgment Letter Templates; CASE (Council for Advancement and Support of Education) Reporting Standards; FASB ASC 958-605 — Revenue Recognition for Contributions; IRS Form 8283 Instructions — Noncash Charitable Contributions; Appraisal Standards per IRC 170(f)(11)(E) — Qualified Appraisal requirements; USPAP (Uniform Standards of Professional Appraisal Practice) for noncash valuations',
  soc_controls = 'SOC 2 Type II (donor database, gift processing system); PCI DSS (credit card donation processing); Gift receipt generation audit trail; Quid pro quo fair market value determination controls; Year-end acknowledgment letter generation verification; Vehicle donation Form 1098-C filing controls'
WHERE name = 'Donor Acknowledgment / Gift Administration Specialist';

-- NP-008: Grant Compliance Manager
UPDATE citizen_catalog SET
  governing_guidelines = '2 CFR Part 200 — Uniform Administrative Requirements (Uniform Guidance); 2 CFR 200.300-345 — Post-Federal Award Requirements; 2 CFR 200.400-475 — Cost Principles; 2 CFR 200.500-521 — Audit Requirements (Single Audit Act); FAR 31.2 — Cost Principles for Nonprofits (Federal Contracts); OMB Compliance Supplement (annual update for Single Audit); Agency-specific grant conditions (NIH, NSF, DOE, DOJ, HHS, ED)',
  standards_of_creation = 'AICPA Audit Guide: Government Auditing Standards and Single Audits; GAO Government Auditing Standards (Yellow Book) — 2024 revision; COFAR (Council on Financial Assistance Reform) Implementation Guidance; Grants.gov Application Submission Standards; Federal Funding Accountability and Transparency Act (FFATA) reporting per 2 CFR 170; SF-424 Federal Grant Application Family (SF-424, 424A, 424B)',
  soc_controls = 'SOC 1 Type II (grant accounting system controls); SOC 2 Type II (grants management system access and integrity); Single Audit (OMB Uniform Guidance, 2 CFR 200 Subpart F); Federal Audit Clearinghouse (FAC) submission controls; Time and effort reporting system controls per 2 CFR 200.430; Cost allocation plan and indirect cost rate controls per 2 CFR 200.414'
WHERE name = 'Grant Compliance Manager';

-- NP-009: Single Audit / A-133 Auditor
UPDATE citizen_catalog SET
  governing_guidelines = 'Single Audit Act Amendments of 1996 (31 USC 7501-7507); 2 CFR 200 Subpart F — Audit Requirements; 2 CFR 200.501 — Audit Threshold ($750,000 federal expenditures); GAO Government Auditing Standards (Yellow Book); AICPA AU-C 935 — Compliance Audits; OMB Compliance Supplement (annual)',
  standards_of_creation = 'AICPA Audit Guide: Government Auditing Standards and Single Audits; AICPA SAS (Statements on Auditing Standards) — Risk Assessment Standards; Schedule of Expenditures of Federal Awards (SEFA) preparation standards; Data Collection Form (SF-SAC) instructions; Federal Audit Clearinghouse submission requirements; AICPA Practice Aid: Uniform Guidance Audits',
  soc_controls = 'SOC 2 Type II (audit workpaper management systems); Federal Audit Clearinghouse (FAC) electronic submission controls; Audit independence verification controls (AICPA/Yellow Book); Quality control per AICPA QC Section 10 (System of Quality Control); Peer review requirements per AICPA Standards for Performing and Reporting'
WHERE name = 'Single Audit / A-133 Auditor';

-- NP-010: Fiscal Sponsor Administrator
UPDATE citizen_catalog SET
  governing_guidelines = 'IRS Revenue Ruling 68-489 — Fiscal Sponsorship (Model A: Comprehensive); IRS Revenue Ruling 63-252 — Pre-Approved Grant Relationships; IRC Section 170 — Deductibility of Contributions Through Fiscal Sponsors; 26 CFR 1.507-2(a)(8) — Transfer of Assets Between Exempt Organizations; State charitable trust and fiduciary duty laws; NNFS Guidelines for Comprehensive Fiscal Sponsorship',
  standards_of_creation = 'National Network of Fiscal Sponsors (NNFS) Recommended Practices; Gregory Colvin, "Fiscal Sponsorship: 6 Ways to Do It Right" (Model A-F frameworks); IRS Guidance on fiscal sponsorship arrangements; FASB ASC 958-605 — Contribution recognition for fiscal sponsors; FASB ASC 958-810 — Consolidation considerations for fiscal sponsors',
  soc_controls = 'SOC 1 Type II (fund accounting system — restricted fund tracking); Project-level financial controls and segregation; Variance of purpose restriction monitoring; SOC 2 Type II (project management platform security); Fiduciary compliance monitoring for sponsored projects'
WHERE name = 'Fiscal Sponsor Administrator';

-- NP-011: Nonprofit Financial Controller / CFO
UPDATE citizen_catalog SET
  governing_guidelines = 'FASB ASC 958 — Not-for-Profit Entities (complete topic); FASB ASU 2016-14 — Presentation of Financial Statements; FASB ASC 958-320 — Investments (endowments); FASB ASC 958-720 — Functional Expense Reporting; Uniform Prudent Management of Institutional Funds Act (UPMIFA); State nonprofit corporation act fiduciary duty provisions; AICPA Audit and Accounting Guide: Not-for-Profit Entities',
  standards_of_creation = 'AICPA Financial Reporting Framework for Small- and Medium-Sized Entities (FRF-SME); FASB ASC 958-205 — Net Asset Classification (With/Without Donor Restrictions); FASB ASC 958-225 — Functional Expense Statement; Program vs. Management & General vs. Fundraising allocation methodologies; Joint cost allocation per FASB ASC 958-720-45; Investment management per UPMIFA prudent investor standards',
  soc_controls = 'SOC 1 Type II (fund accounting system — Sage Intacct, Blackbaud, QuickBooks Nonprofit); SOC 2 Type II (financial reporting system security); Bank reconciliation controls; Segregation of duties (authorization, custody, recording); Board-approved budget controls and variance reporting; Investment policy compliance monitoring controls'
WHERE name = 'Nonprofit Financial Controller / CFO';

-- NP-012: Nonprofit Executive Compensation Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'IRC Section 4958 — Excise Taxes on Excess Benefit Transactions (Intermediate Sanctions); IRC Section 4958(c)(1) — Excess Benefit Transaction Definition; 26 CFR 53.4958-4 — Excess Benefit Transaction Rules; 26 CFR 53.4958-6 — Rebuttable Presumption of Reasonableness; IRC Section 162(m) — $1M Deduction Limit (applicable to tax-exempt per TCJA); IRC Section 4960 — Excise Tax on Excess Remuneration ($1M+); Form 990 Part VII, Schedule J — Compensation Reporting Requirements',
  standards_of_creation = 'IRS Rebuttable Presumption Procedure (comparability data, independent body, concurrent documentation); ERI Economic Research Institute Compensation Surveys; GuideStar Nonprofit Compensation Report methodology; 990 Schedule J Instructions — Detailed Compensation Reporting Standards; WorldatWork Nonprofit Compensation Survey Standards',
  soc_controls = 'SOC 2 Type II (compensation management system access); Independent compensation committee controls; Comparability data acquisition and documentation controls; Concurrent documentation requirements per 26 CFR 53.4958-6(c)(3); Board resolution and minutes documentation controls'
WHERE name = 'Nonprofit Executive Compensation Specialist';

-- NP-013: Nonprofit Governance Attorney / Board Advisor
UPDATE citizen_catalog SET
  governing_guidelines = 'Revised Model Nonprofit Corporation Act (RMNCA, 3rd ed.); State nonprofit corporation acts (state-specific); IRS Form 990 Part VI — Governance, Management, and Disclosure; Sarbanes-Oxley Act Section 806 (whistleblower) and 1102 (document destruction) — voluntary nonprofit adoption; State AG oversight authority over charitable assets; IRS Governance and Related Topics — 990 (Good Governance Practices)',
  standards_of_creation = 'BoardSource Recommended Governance Practices; Independent Sector "Principles for Good Governance and Ethical Practice" (33 principles); ABA Guidebook for Directors of Nonprofit Corporations (3rd ed.); National Council of Nonprofits governance toolkits; IRS Life Cycle of a Public Charity / Private Foundation governance requirements',
  soc_controls = 'Board portal system access controls (BoardEffect, Diligent); Board minutes documentation and retention controls; Conflict of interest disclosure tracking systems; Whistleblower policy implementation controls; Document destruction/retention policy enforcement'
WHERE name = 'Nonprofit Governance Attorney / Board Advisor';

-- NP-014: Nonprofit Valuation Specialist (In-Kind / Asset)
UPDATE citizen_catalog SET
  governing_guidelines = 'IRC Section 170(f)(11) — Appraisal Requirements for Noncash Contributions; IRC Section 170(f)(11)(E) — Qualified Appraiser/Qualified Appraisal Definitions; 26 CFR 1.170A-17 — Qualified Appraisal and Appraiser Requirements; Pension Protection Act of 2006 — Enhanced Appraisal Penalties; IRS Notice 2006-96 — Transitional Guidance for Qualified Appraisals; IRS Form 8283 Section B — Noncash Charitable Contributions (Appraiser Declaration)',
  standards_of_creation = 'Uniform Standards of Professional Appraisal Practice (USPAP) — current edition; USPAP Standards Rules 7 and 8 — Personal Property Appraisal; USPAP Standards Rules 1 and 2 — Real Property Appraisal; American Society of Appraisers (ASA) Business Valuation Standards; Art appraisal: IRS Art Advisory Panel procedures; Conservation easement valuation per 26 CFR 1.170A-14',
  soc_controls = 'Appraiser independence verification controls; Appraisal report documentation retention (per IRS 3-year/6-year rules); SOC 2 Type II (valuation software and databases); Qualified appraiser credential verification controls; Fair market value determination methodology documentation'
WHERE name = 'Nonprofit Valuation Specialist (In-Kind / Asset)';

-- NP-015: Lobbying Compliance Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'IRC Section 501(h) — Expenditure Test Election (Lobbying); IRC Section 4911 — Excise Tax on Excess Lobbying Expenditures; IRC Section 162(e) — Lobbying Expense Disallowance; 26 CFR 56.4911-1 through 56.4911-10 — Lobbying Expenditure Regulations; Lobbying Disclosure Act (2 USC 1601-1614); State lobbying registration and reporting requirements (all 50 states); IRS Form 5768 — Election by Section 501(c)(3) Organization to Make Expenditures to Influence Legislation',
  standards_of_creation = 'IRS Publication 4221-PC — Compliance Guide for 501(c)(3) Public Charities (lobbying sections); Alliance for Justice Advocacy Toolkits; Bolder Advocacy "Being a Player" guidelines; Direct vs. Grassroots Lobbying Distinction Standards per 26 CFR 56.4911-2; State-specific lobbying report form instructions',
  soc_controls = 'SOC 2 Type II (advocacy tracking software — CQ, FiscalNote); Lobbying expenditure tracking and allocation controls; Legislative contact logging and documentation; 501(h) election monitoring (approaching expenditure limits); State lobbying registration renewal tracking'
WHERE name = 'Lobbying Compliance Specialist';

-- NP-016: Political Activity Compliance Specialist (501(c)(4)/(c)(6))
UPDATE citizen_catalog SET
  governing_guidelines = 'IRC Section 501(c)(4) — Social Welfare Organizations; IRC Section 501(c)(6) — Business Leagues; IRC Section 527 — Political Organizations; Rev. Rul. 2004-6 — Political Activity by 501(c)(4) Organizations; FEC Advisory Opinions on nonprofit political activity; 11 CFR Part 114 — Corporate and Labor Organization Activity (FEC); IRC Section 4955 — Excise Tax on Political Expenditures by 501(c)(3)',
  standards_of_creation = 'IRS Publication 4221-PC — Compliance Guide (political activity prohibition); FEC Campaign Guide for Corporations and Labor Organizations; IRS Revenue Ruling 2007-41 — Political Campaign Intervention by 501(c)(3); Facts and Circumstances Test for political activity (Rev. Rul. 2004-6); FECA Reporting Standards for PAC/Super PAC affiliates',
  soc_controls = 'SOC 2 Type II (political activity tracking systems); Expenditure classification controls (political vs. issue advocacy); FEC electronic filing system controls; Segregated fund (PAC) financial controls; State election commission reporting controls'
WHERE name = 'Political Activity Compliance Specialist (501(c)(4)/(c)(6))';

-- NP-017: Endowment / Investment Manager (Nonprofit)
UPDATE citizen_catalog SET
  governing_guidelines = 'Uniform Prudent Management of Institutional Funds Act (UPMIFA) — 49 states + DC; FASB ASC 958-320 — Investments Held by Not-for-Profit Entities; FASB ASC 958-205-45 — Net Asset Classification for Endowments; Investment Advisers Act of 1940 (15 USC 80b) — if advising; ERISA Sections 403-404 — if nonprofit pension involved; State charitable trust prudent investor standards',
  standards_of_creation = 'CFA Institute Asset Manager Code of Professional Conduct; National Association of College and University Business Officers (NACUBO) Endowment Study methodology; Commonfund Institute benchmarking standards; Investment Policy Statement (IPS) best practices per UPMIFA Section 3; FASB ASU 2016-14 — Endowment Fund Disclosure Requirements',
  soc_controls = 'SOC 1 Type II (investment custodian and manager controls); SOC 2 Type II (investment reporting platform security); Investment committee governance controls; Spending rate compliance monitoring (per UPMIFA); Underwater endowment notification controls per UPMIFA Section 4(d); Portfolio reconciliation and NAV verification controls'
WHERE name = 'Endowment / Investment Manager (Nonprofit)';

-- NP-018: Donor-Advised Fund Administrator
UPDATE citizen_catalog SET
  governing_guidelines = 'IRC Section 4966 — Excise Taxes on Taxable Distributions (DAFs); IRC Section 4967 — Excise Taxes on Prohibited Benefits (DAFs); IRC Section 170(f)(18) — Substantiation for DAF Contributions; Pension Protection Act of 2006 — DAF statutory framework; 26 CFR 1.170A-9(f)(11) — Supporting Organization Rules (related to DAFs); IRS Form 990 Schedule D Part I — DAF Reporting',
  standards_of_creation = 'National Philanthropic Trust DAF Best Practices; Community Foundation National Standards (DAF section); FASB ASC 958-605 — Contribution Recognition for DAF Contributions; IRS Instructions for Schedule D — DAF information reporting; Variance power exercise documentation standards',
  soc_controls = 'SOC 1 Type II (DAF accounting and grant distribution systems); SOC 2 Type II (online DAF portal security — Fidelity Charitable, Schwab, etc.); Grant recommendation review and approval controls; Prohibited benefit screening controls per IRC 4967; Distribution tracking and minimum activity monitoring; Donor advisory privilege documentation controls'
WHERE name = 'Donor-Advised Fund Administrator';

-- NP-019: Social Enterprise / B-Corp Compliance Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'Model Benefit Corporation Legislation (B Lab); State Benefit Corporation statutes (38 states + DC); State Social Purpose Corporation / Low-Profit LLC (L3C) statutes; IRC Section 501(c)(3) and related purpose limitations (hybrid entities); IRS Guidance on Program-Related Investments (PRIs) per IRC 4944(c); SEC Regulation D — Exempt offerings for social enterprises',
  standards_of_creation = 'B Lab B Impact Assessment (BIA) — certification scoring methodology; Global Impact Investing Network (GIIN) IRIS+ Impact Measurement Standards; UN Sustainable Development Goals (SDG) reporting framework; Benefit Report preparation standards per Model Benefit Corporation Legislation Section 401; Third-party standard selection per Model Legislation Section 102; GRI (Global Reporting Initiative) Standards for nonprofits',
  soc_controls = 'SOC 2 Type II (impact measurement platform security); B Corp recertification documentation controls; Annual benefit report filing and publication controls; Third-party impact assessment verification; Stakeholder governance documentation controls'
WHERE name = 'Social Enterprise / B-Corp Compliance Specialist';

-- NP-020: Volunteer Management / Risk Officer
UPDATE citizen_catalog SET
  governing_guidelines = 'Volunteer Protection Act of 1997 (42 USC 14501-14505); State volunteer immunity statutes (all 50 states — varies); Fair Labor Standards Act (29 USC 201) — Volunteer vs. Employee distinction; 29 CFR 553.101-106 — DOL Volunteer Standards; State workers'' compensation applicability to volunteers (state-specific); Nonprofit Risk Management Center guidelines',
  standards_of_creation = 'DOL Fact Sheet #14A — Non-Profit Organizations and FLSA; Nonprofit Risk Management Center publications; State-specific volunteer waiver form requirements; Background check standards per state law (volunteers working with minors); EEOC Guidance on volunteer classification; AmeriCorps/VISTA volunteer agreement standards (if applicable)',
  soc_controls = 'SOC 2 Type II (volunteer management system — VolunteerHub, Galaxy Digital); Background check vendor SOC controls; Waiver documentation and retention controls; Volunteer hours tracking and FLSA compliance controls; Insurance coverage verification for volunteer activities; Incident reporting and documentation controls'
WHERE name = 'Volunteer Management / Risk Officer';

-- NP-021: Charitable Trust Officer
UPDATE citizen_catalog SET
  governing_guidelines = 'IRC Sections 664 — Charitable Remainder Trusts (CRATs/CRUTs); IRC Section 4947 — Application of Private Foundation Rules to Charitable Trusts; IRC Section 170(f)(2) — Charitable Contributions of Partial Interests; Uniform Trust Code (UTC) — adopted by most states; Restatement (Third) of Trusts — Charitable Trust Provisions; State charitable trust registration requirements (cy pres, state AG oversight); IRS Form 5227 — Split-Interest Trust Information Return',
  standards_of_creation = 'IRS Revenue Procedures for CRT sample documents (Rev. Proc. 2005-52 through 2005-59); American College of Trust and Estate Counsel (ACTEC) Commentaries; Planned Giving Design Center drafting standards; FASB ASC 958-30 — Split-Interest Agreements; National Committee on Planned Giving (now PPG) Standards of Practice',
  soc_controls = 'SOC 1 Type II (trust accounting system controls); SOC 2 Type II (trust administration platform security); Trustee fiduciary compliance monitoring; Annual distribution calculation and payment controls (CRT 5% minimum); IRS Form 5227 filing compliance controls; Remainder interest valuation controls per IRC 7520'
WHERE name = 'Charitable Trust Officer';

-- RO-001: Church Tax Exemption Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'IRC Section 501(c)(3) — Tax-Exempt Status for Religious Organizations; IRC Section 508(c)(1)(A) — Automatic Exemption for Churches (no Form 1023 required); 26 CFR 1.508-1(a)(3)(i) — Mandatory Exception for Churches; IRS 14-Part Test for Church Status (derived from American Guidance Foundation v. United States); IRC Section 6033(a)(3)(A)(i) — Church Filing Exemption (Form 990); IRC Section 512(b)(12) — $1,000 Specific Deduction for Churches (UBIT); Revenue Ruling 59-95 — Integrated Auxiliaries of Churches',
  standards_of_creation = 'IRS Publication 1828 — Tax Guide for Churches and Religious Organizations; IRS Determination Letter Process for churches electing to apply (Form 1023); ECFA (Evangelical Council for Financial Accountability) Standards; Church financial best practices per IRS governance guidance; 14-Part Church Status Determination documentation',
  soc_controls = 'Church financial management system access controls; Segregation of duties for church finances; ECFA compliance monitoring (if member); State charitable exemption documentation controls; Property tax exemption application and renewal controls'
WHERE name = 'Church Tax Exemption Specialist';

-- RO-002: Church Financial Administrator
UPDATE citizen_catalog SET
  governing_guidelines = 'IRC Section 6001 — General Recordkeeping Requirements; IRC Section 3401-3406 — Church as employer (payroll tax); IRC Section 3121(b)(8)(A) — FICA Exemption Election for Churches; IRC Section 3121(w) — Church Election to Waive FICA Exemption (Form 8274); 26 CFR 31.3401 — Employer withholding requirements; State payroll tax and unemployment insurance requirements; Denominational financial reporting requirements (varies)',
  standards_of_creation = 'ECFA Standards 1-7 (Financial Accountability Standards); Church Network (formerly NACBA) Financial Management Standards; AICPA Audit and Accounting Guide: Not-for-Profit Entities (religious org sections); IRS Publication 15-A — Employer''s Supplemental Tax Guide (church employees); Denominational accounting manuals (GCFA for UMC, ECFA for evangelicals, etc.)',
  soc_controls = 'SOC 1 Type II (church accounting software — ACS, Shelby, Planning Center); Offering count and deposit controls (dual custody); Payroll processing controls; SOC 2 Type II (church management system security); Board/elder financial oversight controls; Annual audit or financial review controls per denomination'
WHERE name = 'Church Financial Administrator';

-- RO-003: Minister Compensation / Housing Allowance Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'IRC Section 107 — Rental Value of Parsonages (Minister Housing Allowance); IRC Section 107(2) — Housing Allowance (cash designation); 26 CFR 1.107-1 — Rental Value of Parsonages; IRC Section 1402(a)(8) — Minister Self-Employment Tax (dual status); IRC Section 1402(e) — Exemption from SE Tax for Ministers (Form 4361); IRC Section 3121(b)(8)(A) — FICA Exemption for Church Employees; IRS Revenue Ruling 63-156 — "Minister of the Gospel" definition',
  standards_of_creation = 'IRS Publication 517 — Social Security and Other Information for Members of the Clergy; Church Law & Tax Report guidelines (Richard Hammar); Housing allowance designation resolution requirements (advance, written, reasonable); Fair rental value calculation methodology per Reg. 1.107-1; Dual-status employment documentation standards',
  soc_controls = 'Compensation committee documentation controls; Housing allowance board resolution retention; Dual-status payroll processing controls (employee for income tax, SE for FICA); Form W-2 preparation controls (Box 1 exclusion for housing allowance); Form 4361 filing and documentation controls; Annual housing allowance adequacy review controls'
WHERE name = 'Minister Compensation / Housing Allowance Specialist';

-- RO-004: Church Audit Defense Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'IRC Section 7611 — Restrictions on Church Tax Inquiries and Examinations; IRC Section 7611(a) — Reasonable Belief Requirement; IRC Section 7611(b) — Notice Requirements (2 written notices); IRC Section 7611(c) — Limitation on Period of Inquiries and Examinations; IRC Section 7611(d) — Limitations on Revocation of Tax-Exempt Status; 26 CFR 301.7611-1 — Church Tax Inquiry/Examination Procedures; Church Audit Procedures Act of 1984 (P.L. 98-369, Title X)',
  standards_of_creation = 'IRS Internal Revenue Manual 4.76.6 — Church Tax Inquiries and Examinations; Treasury Inspector General for Tax Administration (TIGTA) church audit compliance reports; ABA Tax Section commentary on IRC 7611; Church Law & Tax compliance documentation standards; Notice of Individual Preclusion Per IRC 7611(d)(2) documentation',
  soc_controls = 'IRS Reasonable Belief threshold documentation (pre-inquiry); Two-notice process verification controls; 5-year examination limitation tracking per IRC 7611(c)(1)(B); High-level Treasury official approval controls per IRC 7611(b)(3); Examination scope limitation enforcement; Document production tracking and privilege assertion controls'
WHERE name = 'Church Audit Defense Specialist';

-- RO-005: Religious Land Use Attorney (RLUIPA)
UPDATE citizen_catalog SET
  governing_guidelines = 'Religious Land Use and Institutionalized Persons Act (42 USC 2000cc); RLUIPA Section 2(a) — Substantial Burden / Land Use (strict scrutiny); RLUIPA Section 2(b) — Nondiscrimination / Equal Terms / Unreasonable Limitations / Exclusions; First Amendment — Free Exercise and Establishment Clauses; Religious Freedom Restoration Act (42 USC 2000bb) — Federal standard; State Religious Freedom Restoration Acts (21 states); Local zoning ordinances and land use regulations',
  standards_of_creation = 'DOJ RLUIPA enforcement guidance documents; DOJ Technical Assistance Letters; Local zoning application and variance procedures; Conditional use permit / special exception application standards; Environmental review under NEPA (if federal involvement); Historic preservation compliance per NHPA Section 106 (if historic property)',
  soc_controls = 'Land use application filing and tracking controls; Zoning hearing documentation and transcript retention; DOJ complaint filing system controls; Court filing document management controls; Public hearing notice compliance verification; Building permit and inspection documentation controls'
WHERE name = 'Religious Land Use Attorney (RLUIPA)';

-- RO-006: Clergy Mandatory Reporting Compliance Officer
UPDATE citizen_catalog SET
  governing_guidelines = 'State mandatory reporting statutes (all 50 states — clergy explicitly included in ~33 states); Child Abuse Prevention and Treatment Act (CAPTA) (42 USC 5101-5119); Clergy-penitent privilege exceptions (varies by state); State definitions of "clergy" and "minister" for reporting purposes; USCCB Charter for Protection of Children and Young People (Catholic); State statutes of limitations for child abuse reporting failures',
  standards_of_creation = 'HHS Children''s Bureau Mandatory Reporter Guidelines; State-specific reporting form requirements (e.g., CPS hotline protocols); Denominational mandatory reporting training curricula; National Child Traumatic Stress Network (NCTSN) reporting guidance; Documentation standards for clergy-penitent privilege assertions; Institutional response protocol documentation',
  soc_controls = 'Mandatory reporter training tracking and certification; Incident reporting system access controls and audit trails; Confidential reporting hotline controls; Background check systems for clergy and volunteers; Report documentation retention per state requirements; Follow-up and case management tracking controls'
WHERE name = 'Clergy Mandatory Reporting Compliance Officer';

-- RO-007: Religious Organization Employment Attorney (Ministerial Exception)
UPDATE citizen_catalog SET
  governing_guidelines = 'First Amendment — Ministerial Exception Doctrine; Hosanna-Tabor Evangelical Lutheran Church v. EEOC, 565 U.S. 171 (2012); Our Lady of Guadalupe School v. Morrissey-Berru, 591 U.S. ___ (2020); Title VII of the Civil Rights Act of 1964 — Religious Organization Exemption (42 USC 2000e-1); IRC Section 3121(b)(8)(A) — Church Employee FICA Exemption; Americans with Disabilities Act — Religious Entity Exemption (42 USC 12113(d)); Age Discrimination in Employment Act — Church application limits',
  standards_of_creation = 'EEOC Compliance Manual Section 12 — Religious Discrimination; Church employment handbook drafting standards; Ministerial function documentation requirements (per Hosanna-Tabor four-factor test); Morrissey-Berru expanded ministerial analysis framework; Religious organization exemption assertion documentation; Employee vs. minister classification documentation',
  soc_controls = 'HR information system access controls; Employee/minister classification documentation retention; Discrimination complaint response protocols; Background check and screening controls; Employment agreement and termination documentation; Religious mission integration documentation controls'
WHERE name = 'Religious Organization Employment Attorney (Ministerial Exception)';

-- RO-008: Religious Immigration Attorney (R-1 Visa)
UPDATE citizen_catalog SET
  governing_guidelines = 'INA Section 101(a)(15)(R) — Religious Worker Nonimmigrant Classification; 8 CFR 214.2(r) — R-1 Visa Requirements; INA Section 203(b)(4) — Special Immigrant Religious Worker (EB-4); 8 CFR 204.5(m) — Special Immigrant Religious Worker Petitions; USCIS Policy Manual Volume 2, Part H — Religious Workers; USCIS Form I-129 Supplement R — Classification for Religious Worker; USCIS Form I-360 — Special Immigrant Religious Worker Petition',
  standards_of_creation = 'USCIS Policy Manual Religious Worker guidance; USCIS Adjudicator''s Field Manual Chapter 32 (R-1); Religious denomination documentation standards; 2-year prior membership/affiliation evidence requirements; Bona fide religious organization verification (IRS determination letter or equivalent); Compensation documentation and support evidence standards',
  soc_controls = 'USCIS ELIS electronic filing system controls; Petition documentation assembly and retention controls; Religious organization verification and site visit preparation; Beneficiary credential verification controls; Compliance with 5-year R-1 maximum stay limitation; Employment authorization document (EAD) tracking'
WHERE name = 'Religious Immigration Attorney (R-1 Visa)';

-- RO-009: Religious School Accreditation Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'State compulsory education laws (all 50 states); State private/religious school registration requirements; Regional accreditation standards (AdvancED/Cognia, WASC, NEASC, etc.); Association of Christian Schools International (ACSI) accreditation standards; National Catholic Educational Association (NCEA) standards; State curriculum minimum requirements for religious exemption schools; FERPA (20 USC 1232g) — if receiving federal funds',
  standards_of_creation = 'Regional accrediting body self-study requirements; ACSI Accreditation Manual (Standards and Indicators); NCEA Assessment Framework; State-specific private school approval standards; Teacher certification requirements (state variances for religious schools); Annual compliance report preparation standards',
  soc_controls = 'Student information system (SIS) access controls; Accreditation documentation retention and management; Teacher credential verification and tracking; State reporting system compliance; Student records privacy controls per FERPA (if applicable); Curriculum compliance monitoring controls'
WHERE name = 'Religious School Accreditation Specialist';

-- RO-010: Sacramental Records Administrator
UPDATE citizen_catalog SET
  governing_guidelines = 'Canon Law (Catholic: Code of Canon Law, Canons 535, 876-878, 1121-1123); State vital records statutes — marriage license requirements; State marriage solemnization statutes (clergy authorization); Uniform Marriage and Divorce Act (NCCUSL); State birth certificate amendment procedures (religious naming ceremonies); State death certificate and burial permit requirements',
  standards_of_creation = 'Diocesan/denominational records management policies; State vital records form completion standards; Catholic Canon Law sacramental register requirements; Marriage license return filing procedures per state; Baptismal/christening certificate issuance standards; Historical records preservation standards (National Archives guidelines)',
  soc_controls = 'Sacramental records physical and digital security controls; Marriage license filing deadline tracking; Vital records office submission verification; Historical records preservation environment controls; Access controls for confidential sacramental records; Digital backup and disaster recovery for parish records'
WHERE name = 'Sacramental Records Administrator';

-- RO-011: Religious Arbitration Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'Federal Arbitration Act (9 USC 1-16); State arbitration statutes (Revised Uniform Arbitration Act, adopted ~35 states); First Amendment — Religious Dispute Doctrine (church property, internal governance); Jones v. Wolf, 443 U.S. 595 (1979) — Neutral Principles Approach; Serbian Eastern Orthodox Diocese v. Milivojevich, 426 U.S. 696 (1976) — Ecclesiastical Abstention; Beth Din of America Rules and Procedures (Jewish arbitration); Sharia arbitration tribunal procedures (varies)',
  standards_of_creation = 'AAA (American Arbitration Association) Rules — Religious Dispute Adaptation; Beth Din Arbitration Agreement templates; Christian Conciliation Service rules (Institute for Christian Conciliation); Denominational dispute resolution procedure manuals; Arbitration award documentation standards per FAA 9 USC 9-11; Enforceability documentation (voluntariness, procedural fairness)',
  soc_controls = 'Arbitration filing and case management system controls; Confidentiality controls for arbitration proceedings; Arbitrator selection and disclosure documentation; Award documentation and retention controls; Court enforcement/confirmation filing controls; Party consent and voluntary participation verification'
WHERE name = 'Religious Arbitration Specialist';

-- RO-012: Faith-Based Initiative Grant Compliance Officer
UPDATE citizen_catalog SET
  governing_guidelines = 'Executive Order 13279 (as amended by EO 13559 and EO 13831) — Equal Treatment of Faith-Based Organizations; 2 CFR Part 200 — Uniform Guidance (applicable to faith-based grantees); 42 USC 604a — Charitable Choice (TANF); Non-discrimination requirements for faith-based grant recipients; Separation of explicitly religious activities from federally funded activities; Beneficiary referral alternative requirements; Agency-specific faith-based implementation rules (HHS 45 CFR 87, DOL 29 CFR 2, HUD 24 CFR 5.109)',
  standards_of_creation = 'White House OFBNP compliance guidance documents; Agency-specific faith-based grantee toolkits; 2 CFR 200 Subpart D — Cost principles for faith-based entities; Separation of religious/secular activity documentation; Written notice to beneficiaries of referral rights; SF-424 application with faith-based certifications',
  soc_controls = 'SOC 1 Type II (grant accounting — separation of religious/secular funds); SOC 2 Type II (grant reporting system access); Segregation of funds controls (federal vs. private religious); Beneficiary rights notification documentation; Time and effort reporting per 2 CFR 200.430; Non-discrimination compliance monitoring; Federal Audit Clearinghouse (FAC) reporting controls'
WHERE name = 'Faith-Based Initiative Grant Compliance Officer';

-- RO-013: Religious Broadcasting Compliance Officer
UPDATE citizen_catalog SET
  governing_guidelines = 'Communications Act of 1934, as amended (47 USC 151 et seq.); FCC Rules Part 73 — Radio Broadcast Services (47 CFR 73); FCC Rules Part 74 — Low Power FM (LPFM) (47 CFR 74); FCC Rules Part 76 — Multichannel Video and Cable (47 CFR 76); FCC Noncommercial Educational (NCE) station rules (47 CFR 73.503, 73.621); FCC Political Broadcasting Rules — Equal Time (47 USC 315); FCC Sponsorship Identification Rules (47 USC 317, 47 CFR 73.1212)',
  standards_of_creation = 'FCC Broadcast Station Annual Regulatory Fees (Form 159); FCC License Renewal Application (Form 303-S); FCC Public Inspection File requirements (47 CFR 73.3526-3527); National Religious Broadcasters (NRB) Code of Ethics; FCC EEO compliance standards (47 CFR 73.2080); FCC Online Public Inspection File (OPIF) uploading standards',
  soc_controls = 'FCC license renewal tracking and calendar controls; Public inspection file completeness monitoring; EEO compliance documentation controls; Political broadcasting log maintenance; FCC electronic filing system (LMS/CDBS) access controls; Broadcast content compliance monitoring (sponsorship ID)'
WHERE name = 'Religious Broadcasting Compliance Officer';

-- RO-014: Cemetery and Burial Compliance Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'FTC Funeral Rule (16 CFR 453) — Price Disclosure Requirements; State cemetery licensing and registration statutes; State trust fund requirements for perpetual care / endowment; State burial permit and death certificate requirements; EPA Rules on cemetery environmental compliance (pesticides, groundwater); State pre-need burial contract statutes; Religious exemption provisions in state funeral/cemetery laws',
  standards_of_creation = 'FTC Funeral Rule General Price List (GPL) requirements; State cemetery annual report filing requirements; Perpetual care trust fund accounting standards; International Cemetery, Cremation and Funeral Association (ICCFA) standards; Cemetery deed and lot conveyance documentation standards; State health department burial permit procedures',
  soc_controls = 'Cemetery records management system controls; Perpetual care trust fund accounting and segregation controls; Pre-need contract trust fund compliance monitoring; Burial permit filing and tracking controls; Environmental compliance monitoring; Consumer complaint documentation and response controls'
WHERE name = 'Cemetery and Burial Compliance Specialist';

-- RO-015: Child Protection Policy Administrator (Religious Institution)
UPDATE citizen_catalog SET
  governing_guidelines = 'CAPTA (42 USC 5101-5119) — Federal child abuse prevention; State mandatory reporting statutes for institutional settings; State background check requirements for youth workers; USCCB Charter for Protection of Children and Young People (Dallas Charter, 2002, revised); Boy Scouts / Youth Serving Organization safe environment standards; State statutes on institutional duty of care for minors; Insurance carrier minimum child protection policy requirements',
  standards_of_creation = 'USCCB Essential Norms for Diocesan Policies (Catholic); Denominational child protection policy templates; Ministry Safe / Praesidium training and screening protocols; Two-adult rule and open-door policy documentation; Background screening vendor standards (NCS, Sterling); Incident reporting form and investigation protocol standards',
  soc_controls = 'Background check system controls and vendor SOC reports; Volunteer/employee screening completion tracking; Training completion and certification tracking; Incident reporting system access and confidentiality controls; SOC 2 Type II (child protection database security); Policy acknowledgment and annual re-certification tracking; Window/door observation compliance monitoring'
WHERE name = 'Child Protection Policy Administrator (Religious Institution)';

-- IT-001: Export Control Officer (BIS/EAR)
UPDATE citizen_catalog SET
  governing_guidelines = 'Export Administration Regulations (EAR) (15 CFR Parts 730-774); 15 CFR 730 — General Information; 15 CFR 736 — General Prohibitions; 15 CFR 740 — License Exceptions; 15 CFR 742 — Control Policy — CCL Based Controls; 15 CFR 744 — Control Policy — End-User and End-Use Based; 15 CFR 748 — License Application Procedures; Commerce Control List (CCL) (15 CFR Part 774, Supplement No. 1); Export Control Reform Act of 2018 (ECRA) (50 USC 4801-4852)',
  standards_of_creation = 'BIS Export Management System (EMS) Guidelines; BIS Decision Tree for License Determination; ECCN (Export Control Classification Number) self-classification procedures; Electronic Export Information (EEI) filing per 15 CFR 758 via AES; BIS-748P Multipurpose Application Form Instructions; BIS Entity List (Supplement No. 4 to 15 CFR Part 744) screening procedures',
  soc_controls = 'SOC 2 Type II (export compliance management system — OCR/Visual Compliance/Descartes); Denied party screening system controls; License determination documentation and audit trail; End-use/end-user verification controls; Technology access controls for deemed exports per 15 CFR 734.13; Export compliance training tracking; Recordkeeping per 15 CFR 762 (5-year retention)'
WHERE name = 'Export Control Officer (BIS/EAR)';

-- IT-002: ITAR Compliance Officer (DDTC)
UPDATE citizen_catalog SET
  governing_guidelines = 'International Traffic in Arms Regulations (ITAR) (22 CFR Parts 120-130); Arms Export Control Act (AECA) (22 USC 2751 et seq.); 22 CFR 120 — General Provisions (USML and definitions); 22 CFR 122 — Registration Requirements; 22 CFR 123 — License/Approvals for Defense Articles; 22 CFR 124 — Agreements (TAAs, MLAs); 22 CFR 125 — License for Technical Data/Defense Services; 22 CFR 126 — General Policies and Provisions (Country restrictions); 22 CFR 127 — Violations and Penalties; United States Munitions List (USML) (22 CFR 121.1)',
  standards_of_creation = 'DDTC Registration (Form DS-2032); DDTC License Application (Form DS-1693/DSP-5); DDTC Technical Assistance Agreement (TAA) preparation; DDTC Manufacturing License Agreement (MLA) preparation; Empowered Official Designation documentation per 22 CFR 120.67; Voluntary Disclosure per 22 CFR 127.12 — Procedures and format; DDTC DECCS (Defense Export Control and Compliance System) filing',
  soc_controls = 'SOC 2 Type II (ITAR compliance management system); Classified and controlled unclassified information (CUI) access controls; NIST SP 800-171 — CUI protection controls; CMMC (Cybersecurity Maturity Model Certification) Level 2+ controls; Empowered official authorization verification; Technology control plan implementation and monitoring; DDTC registration renewal tracking (annual); Visitor access controls for ITAR-controlled facilities'
WHERE name = 'ITAR Compliance Officer (DDTC)';

-- IT-003: Deemed Export Control Specialist
UPDATE citizen_catalog SET
  governing_guidelines = '15 CFR 734.13 — Deemed Export (EAR) — Release of technology to foreign nationals in U.S.; 15 CFR 734.14 — Deemed Re-Export; 22 CFR 120.17 — Deemed Export under ITAR (defense services to foreign persons); 22 CFR 125.2 — Exports of Technical Data (includes deemed); Fundamental Research Exclusion (15 CFR 734.8); Published Information Exclusion (15 CFR 734.7); Educational Information Exclusion (15 CFR 734.9)',
  standards_of_creation = 'BIS Deemed Export FAQs and Guidance; Technology Control Plan (TCP) development standards; Foreign national screening procedures; University/research institution deemed export compliance programs; Deemed Export License Application (BIS-748P with deemed export supplement); DDTC Technology Transfer Documentation',
  soc_controls = 'SOC 2 Type II (IT system access controls — technology segregation); Foreign national identification and screening controls; Physical access controls for controlled technology areas; Network access controls (segregation of controlled data); Visitor management systems for controlled facilities; Research collaboration agreement review controls; HR onboarding controls for foreign national employees'
WHERE name = 'Deemed Export Control Specialist';

-- IT-004: Wassenaar Arrangement / Multilateral Export Control Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'Wassenaar Arrangement on Export Controls for Conventional Arms and Dual-Use Goods and Technologies; Wassenaar Dual-Use List (Basic List and Sensitive/Very Sensitive sublists); Wassenaar Munitions List; Nuclear Suppliers Group (NSG) Guidelines and Trigger List; Missile Technology Control Regime (MTCR) Annex; Australia Group (AG) Common Control Lists (chemical/biological); EAR incorporation of multilateral lists into CCL (15 CFR 774)',
  standards_of_creation = 'Wassenaar Best Practice Documents (licensing, brokering, transit); Regime-specific catch-all control guidance; Cross-referencing between CCL ECCNs and Wassenaar list categories; Multilateral regime participation documentation; End-use certificate templates per regime requirements; Information sharing and denial notification procedures',
  soc_controls = 'Cross-regime classification verification controls; Multi-list screening system (all four regimes); SOC 2 Type II (classification database security); Denial notification tracking per Wassenaar Best Practices; License determination documentation per applicable regime; Interagency coordination documentation controls'
WHERE name = 'Wassenaar Arrangement / Multilateral Export Control Specialist';

-- IT-005: Licensed Customs Broker
UPDATE citizen_catalog SET
  governing_guidelines = '19 USC 1641 — Customs Broker License Requirements; 19 CFR Part 111 — Customs Brokers; 19 CFR 141 — Entry of Merchandise; 19 CFR 142 — Entry Process; 19 CFR 143 — Special Entry Procedures; 19 CFR 152 — Classification and Appraisement of Merchandise; Customs Modernization Act (Mod Act) — Title VI of P.L. 103-182; Informed Compliance and Reasonable Care Standards (19 USC 1484(a))',
  standards_of_creation = 'CBP Informed Compliance Publications; Customs Broker Examination preparation materials; ACE (Automated Commercial Environment) filing standards; CBP Entry Summary (Form 7501) preparation instructions; Power of Attorney (CBP Form 5291) requirements; Broker Compliance Assessment guidelines; CBP Binding Ruling Request procedures (19 CFR 177)',
  soc_controls = 'SOC 2 Type II (customs brokerage software — Descartes, CargoWise, QAD); ACE Portal access controls and authentication; Client records management and 5-year retention per 19 CFR 111.23; License renewal and continuing education tracking; Permit examination and compliance assessment documentation; Financial responsibility controls (broker bond maintenance)'
WHERE name = 'Licensed Customs Broker';

-- IT-006: Import Compliance Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'Tariff Act of 1930, as amended (19 USC 1202 et seq.); Harmonized Tariff Schedule of the United States (HTSUS); 19 CFR 141-159 — Entry, Classification, Appraisement; 19 CFR 162 — Inspection, Search, and Seizure; CBP Reasonable Care Checklist; Country of Origin marking requirements (19 CFR 134); CBP Focused Assessment / Compliance Assessment programs; Trade Facilitation and Trade Enforcement Act of 2015 (TFTEA)',
  standards_of_creation = 'CBP Customs Ruling Online Search System (CROSS) database usage; HTSUS General Rules of Interpretation (GRI 1-6); Classification determination documentation standards; CBP Protest procedures (19 CFR 174); Prior Disclosure procedures (19 CFR 162.74); Importer Security Filing (ISF/10+2) requirements (19 CFR 149)',
  soc_controls = 'SOC 2 Type II (trade compliance management system); ACE account security and Automated Broker Interface (ABI) controls; Classification ruling database and consistency controls; Customs valuation methodology documentation; CBP Focused Assessment preparation controls; Duty payment reconciliation controls; Prior disclosure documentation and filing controls'
WHERE name = 'Import Compliance Specialist';

-- IT-007: Foreign Trade Zone (FTZ) Administrator
UPDATE citizen_catalog SET
  governing_guidelines = 'Foreign-Trade Zones Act of 1934 (19 USC 81a-81u); FTZ Board Regulations (15 CFR Part 400); CBP FTZ Regulations (19 CFR Part 146); 19 CFR 146.1 — FTZ General Provisions; 19 CFR 146.21-146.26 — Admission Procedures; 19 CFR 146.63-146.68 — Entry/Withdrawal Procedures; Annual Report Requirements per 15 CFR 400.49',
  standards_of_creation = 'FTZ Board Application Instructions (new zone/subzone/production authority); CBP FTZ Manual (Blueprint for FTZ Operations); Annual Report to FTZ Board preparation standards; Zone Schedule and Rates documentation; Inventory control and recordkeeping per 19 CFR 146.21; Manufacturing/Production activity reporting per 15 CFR 400.14',
  soc_controls = 'SOC 1 Type II (FTZ inventory management system controls); SOC 2 Type II (zone access and security system); CBP-approved inventory control system; Physical security controls per 19 CFR 146.6; Admission, manipulation, and withdrawal tracking controls; Annual reconciliation and reporting controls; Zone operator bond maintenance'
WHERE name = 'Foreign Trade Zone (FTZ) Administrator';

-- IT-008: Harmonized Tariff Classification Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'Harmonized Tariff Schedule of the United States (HTSUS); International Convention on the Harmonized Commodity Description and Coding System (HS Convention); WCO Harmonized System Nomenclature (HS 2022/2027); General Rules of Interpretation (GRI 1-6) — General Note 1, HTSUS; Additional U.S. Rules of Interpretation; 19 CFR 152 — Classification; 19 CFR 177 — Administrative Rulings (binding rulings)',
  standards_of_creation = 'WCO Explanatory Notes to the Harmonized System; WCO Classification Opinions; WCO Compendium of Classification Opinions; CBP Harmonized Tariff Schedule Reference Tool; CBP Binding Ruling Letter (BRL) request format per 19 CFR 177.2; CBP Informed Compliance Publication: Classification series',
  soc_controls = 'Classification database management and consistency controls; CBP CROSS (Customs Rulings Online Search System) integration; Binding ruling tracking and expiration monitoring; Classification determination documentation audit trail; SOC 2 Type II (tariff database and classification tools); Reclassification change management controls'
WHERE name = 'Harmonized Tariff Classification Specialist';

-- IT-009: Trade Finance Specialist (Letters of Credit)
UPDATE citizen_catalog SET
  governing_guidelines = 'UCP 600 — Uniform Customs and Practice for Documentary Credits (ICC Publication 600); ISBP 821 — International Standard Banking Practice (ICC Publication 821); ISP98 — International Standby Practices (ICC Publication 590); URC 522 — Uniform Rules for Collections (ICC Publication 522); UCC Article 5 — Letters of Credit (domestic); OFAC compliance for trade finance transactions (31 CFR 500-599)',
  standards_of_creation = 'ICC Model Forms for Letters of Credit; SWIFT MT700/MT710/MT760 message standards; ICC Banking Commission Opinions (documentary credit disputes); ISBP document examination standards (151 paragraphs); ICC eUCP Version 2.0 — Electronic Presentation Supplement; Trade document preparation standards per UCP 600 Articles 14-28',
  soc_controls = 'SOC 1 Type II (trade finance processing system controls); SOC 2 Type II (SWIFT access controls); SWIFT Customer Security Programme (CSP) controls; Document examination and discrepancy tracking; OFAC screening for all parties to L/C transactions; Dual control for L/C issuance and amendment; Fraud detection controls per UCP 600 Article 34'
WHERE name = 'Trade Finance Specialist (Letters of Credit)';

-- IT-010: Certificate of Origin Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'USMCA Rules of Origin (19 CFR Part 182); USMCA Certificate of Origin requirements (19 CFR 182.12); CAFTA-DR Origin Rules; US-Korea FTA (KORUS) Origin Rules; US-Australia FTA Origin Rules; Generalized System of Preferences (GSP) origin rules (19 CFR 10.171-10.178); African Growth and Opportunity Act (AGOA) origin requirements; Non-preferential rules of origin (WTO Agreement on Rules of Origin)',
  standards_of_creation = 'USMCA Uniform Regulations regarding Rules of Origin (Chapter 4); CBP Certificate of Origin forms per each FTA; USMCA Certification of Origin data elements; Regional Value Content (RVC) calculation methodologies (transaction value, net cost); Tariff shift analysis documentation; Producer/exporter certification documentation standards',
  soc_controls = 'SOC 2 Type II (origin determination software); Bill of materials and supply chain documentation controls; Producer questionnaire management; Origin certification audit trail; Verification request response controls (customs authority inquiries); FTA utilization tracking and savings documentation'
WHERE name = 'Certificate of Origin Specialist';

-- IT-011: Customs Bond Specialist
UPDATE citizen_catalog SET
  governing_guidelines = '19 CFR Part 113 — CBP Bonds; 19 USC 1623 — Customs Bond Requirements; 31 CFR Part 223 — Surety Companies Doing Business with the United States; Treasury Circular 570 — Approved Sureties; 19 CFR 113.11 — Basic Importation Bond; 19 CFR 113.13 — Continuous Bond (Activity Code 1); 19 CFR 113.62 — Basic Importation and Entry Bond Conditions',
  standards_of_creation = 'CBP Bond Form (CBP Form 301) completion standards; Surety bond sufficiency calculation (duty + tax + fee estimates); Single entry vs. continuous bond determination criteria; Bond rider and amendment documentation; Surety bond adequacy review per CBP guidelines; Bond insufficiency notice response procedures',
  soc_controls = 'Bond management system tracking and renewal controls; Surety financial sufficiency monitoring; Bond claim response and documentation controls; SOC 2 Type II (bond management platform); Treasury Circular 570 surety status verification; Bond cancellation and replacement controls'
WHERE name = 'Customs Bond Specialist';

-- IT-012: OFAC Sanctions Compliance Officer
UPDATE citizen_catalog SET
  governing_guidelines = 'International Emergency Economic Powers Act (IEEPA) (50 USC 1701-1706); Trading with the Enemy Act (TWEA) (50 USC 4301-4341); 31 CFR Parts 500-599 — OFAC Sanctions Regulations (all programs); 31 CFR 501 — Reporting, Procedures and Penalties; Executive Orders establishing sanctions programs; OFAC Specially Designated Nationals and Blocked Persons List (SDN List); OFAC Sectoral Sanctions Identifications (SSI) List; OFAC Consolidated Sanctions List; OFAC 50 Percent Rule',
  standards_of_creation = 'OFAC Framework for Compliance Commitments (2019) — 5 Essential Components; OFAC Frequently Asked Questions and Interpretive Guidance; OFAC Specific License Application procedures; OFAC Voluntary Self-Disclosure procedures (31 CFR 501.601-606); OFAC Enforcement Guidelines (Appendix A to 31 CFR Part 501); Sanctions screening software validation standards',
  soc_controls = 'SOC 2 Type II (sanctions screening platform — Dow Jones, World-Check, Accuity); Real-time and batch screening controls; Interdiction/blocking controls for matched transactions; False positive resolution and documentation; OFAC reporting controls (blocked property reports, rejected transaction reports); Screening list update frequency controls (minimum daily); Sanctions program risk assessment documentation'
WHERE name = 'OFAC Sanctions Compliance Officer';

-- IT-013: FCPA Compliance Officer
UPDATE citizen_catalog SET
  governing_guidelines = 'Foreign Corrupt Practices Act (FCPA) — Anti-Bribery (15 USC 78dd-1 through 78dd-3); FCPA — Accounting/Books and Records (15 USC 78m(b)(2) and 78m(b)(5)); DOJ/SEC FCPA Resource Guide (2020 second edition); DOJ Criminal Division Evaluation of Corporate Compliance Programs (2023 update); SEC Regulation S-K Item 103 — Legal Proceedings disclosure; DOJ Pilot Program on Compensation Incentives and Clawbacks; UN Convention Against Corruption (UNCAC)',
  standards_of_creation = 'DOJ/SEC FCPA Resource Guide hallmarks of effective compliance; DOJ Evaluation of Corporate Compliance Programs (13 topics); ICC Anti-Corruption Rules (ICC Publication); TRACE International Due Diligence Standards; Third-party due diligence documentation standards; Gift, hospitality, and entertainment policy documentation',
  soc_controls = 'SOC 2 Type II (compliance management system); Third-party due diligence screening controls (TRACE, Refinitiv); Gift and entertainment tracking and approval controls; Whistleblower / hotline system controls; Internal investigation documentation controls; Training completion tracking; Books and records accuracy controls per 15 USC 78m(b)(2)'
WHERE name = 'FCPA Compliance Officer';

-- IT-014: UK Bribery Act / International Anti-Corruption Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'UK Bribery Act 2010 (Sections 1-2: Offences; Section 6: Bribery of Foreign Officials; Section 7: Failure to Prevent); UK Ministry of Justice Guidance on "Adequate Procedures" (6 principles); OECD Anti-Bribery Convention (Convention on Combating Bribery of Foreign Public Officials); OECD Good Practice Guidance on Internal Controls, Ethics, and Compliance; EU Anti-Corruption Directive (proposed); French Sapin II Law (Loi Sapin II, Article 17); Canadian Corruption of Foreign Public Officials Act (CFPOA)',
  standards_of_creation = 'UK MOJ Six Principles: Proportionate Procedures, Top-Level Commitment, Risk Assessment, Due Diligence, Communication/Training, Monitoring/Review; OECD Good Practice Guidance compliance program elements; ISO 37001:2016 — Anti-Bribery Management Systems; Transparency International Business Principles for Countering Bribery; Multi-jurisdictional risk assessment documentation; Facilitation payment policy documentation (UK Bribery Act prohibits)',
  soc_controls = 'SOC 2 Type II (global compliance platform); ISO 37001 certification audit controls; Multi-jurisdictional screening system; Global gift and hospitality management controls; Whistleblower system with multi-language support; Third-party risk assessment and monitoring; Annual compliance program effectiveness review'
WHERE name = 'UK Bribery Act / International Anti-Corruption Specialist';

-- IT-015: Trade Remedy Attorney (AD/CVD)
UPDATE citizen_catalog SET
  governing_guidelines = 'Tariff Act of 1930, Title VII (19 USC 1671-1677n) — AD/CVD Statutes; 19 CFR Part 351 — Antidumping and Countervailing Duties (Commerce); 19 CFR Part 207 — ITC Investigation Procedures; 19 USC 1673 — Antidumping Duties (LTFV determination); 19 USC 1671 — Countervailing Duties; 19 USC 1675 — Administrative Reviews (annual); Trade Preferences Extension Act of 2015 — AD/CVD amendments; WTO Anti-Dumping Agreement (Article VI, GATT 1994)',
  standards_of_creation = 'Commerce Department AD/CVD Questionnaire Response Guidelines; ITC Petition Filing Requirements (19 CFR 207.11); Commerce Department Antidumping Manual (2009); Foreign Market Value / Normal Value calculation documentation; Constructed Export Price documentation; ITC Injury Determination analysis frameworks',
  soc_controls = 'Commerce Department ACCESS filing system controls; ITC EDIS (Electronic Document Information System) filing controls; Business Proprietary Information (BPI) protection controls per 19 CFR 351.305; Administrative Protective Order (APO) compliance controls; SOC 2 Type II (trade remedy case management system); Data room access and audit trail controls'
WHERE name = 'Trade Remedy Attorney (AD/CVD)';

-- IT-016: Export Administration / AES Filing Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'Foreign Trade Regulations (FTR) (15 CFR Part 30); 15 CFR 30.2 — General Requirements for Filing EEI; 15 CFR 30.3 — Electronic Export Information Filer Requirements; 15 CFR 30.4 — Filing Exemptions; 15 CFR 30.6 — Filing Timeframes; 15 CFR 30.36 — AES Postdeparture Filing; 15 CFR 30.45 — Penalties for Violations; Census Bureau AESDirect system requirements',
  standards_of_creation = 'Census Bureau AESDirect User Guide; EEI Data Element Standards per 15 CFR 30.6; Shipment Reference Number (SRN) assignment standards; Internal Transaction Number (ITN) documentation; Routed export transaction documentation per 15 CFR 30.3(e); Filing exemption legend requirements per 15 CFR 30.26',
  soc_controls = 'SOC 2 Type II (AES filing system access controls); AESDirect / AESPcLink authentication controls; Pre-shipment filing verification controls; ITN documentation and retention; Post-departure filing compliance monitoring; Fatal and warning error resolution controls; 5-year record retention per 15 CFR 30.10'
WHERE name = 'Export Administration / AES Filing Specialist';

-- IT-017: Embargo / Comprehensive Sanctions Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'OFAC Comprehensive Sanctions Programs (Cuba, Iran, North Korea, Syria, Crimea/Donetsk/Luhansk); Iranian Transactions and Sanctions Regulations (31 CFR Part 560); North Korea Sanctions Regulations (31 CFR Part 510); Cuban Assets Control Regulations (31 CFR Part 515); Syrian Sanctions Regulations (31 CFR Part 542); BIS EAR Country Group E:1 and E:2 restrictions (15 CFR Part 740 Supplement No. 1); ITAR Country Restrictions (22 CFR 126.1)',
  standards_of_creation = 'OFAC program-specific FAQs and interpretive guidance; OFAC General License templates and conditions; Specific License Application preparation per 31 CFR 501.801; Humanitarian exemption documentation (food, medicine — 31 CFR program-specific); Country-specific due diligence enhanced screening procedures; Transshipment/diversion risk assessment documentation',
  soc_controls = 'SOC 2 Type II (enhanced sanctions screening — country-specific modules); Multi-layer screening controls (parties, goods, destinations, end-uses); Vessel and aircraft screening controls (maritime/aviation); Transshipment routing analysis controls; OFAC license condition compliance monitoring; Escalation and blocking/rejecting transaction controls; Comprehensive sanctions program risk assessment'
WHERE name = 'Embargo / Comprehensive Sanctions Specialist';

-- IT-018: End-Use Certificate / End-User Verification Specialist
UPDATE citizen_catalog SET
  governing_guidelines = '15 CFR 744.6 — Restrictions on Certain Activities (General Prohibition 7); 15 CFR 744.2 — Weapons of Mass Destruction (WMD) End-Use Controls; 15 CFR 744.3 — Missile Proliferation End-Use Controls; 15 CFR 744.4 — Chemical/Biological Weapons End-Use Controls; 22 CFR 123.9 — ITAR End-Use Monitoring; Blue Lantern Program (DDTC end-use monitoring); BIS End-Use Check Program (Sentinel, Safeguard, Shield visits)',
  standards_of_creation = 'BIS End-Use Certificate template requirements; DDTC Blue Lantern Check documentation; Foreign government import certificate/delivery verification (IC/DV) standards; BIS Pre-License Check (PLC) and Post-Shipment Verification (PSV) documentation; End-user statement format per destination country requirements; Non-transfer/non-re-export certificate templates',
  soc_controls = 'End-user database management and verification controls; End-use certificate authentication and validation; Blue Lantern Check response coordination controls; BIS end-use check visit documentation; Post-shipment delivery verification tracking; Red flag indicator identification and escalation controls per BIS Supplement No. 3 to 15 CFR 732'
WHERE name = 'End-Use Certificate / End-User Verification Specialist';

-- IT-019: Trade Compliance Auditor
UPDATE citizen_catalog SET
  governing_guidelines = 'CBP Reasonable Care Standard (19 USC 1484(a)); CBP Focused Assessment Program guidelines; BIS Export Compliance Program guidelines; DDTC ITAR Compliance Program guidelines; IIA International Standards for the Professional Practice of Internal Auditing; C-TPAT Minimum Security Criteria (Trade Partnership Against Terrorism); ISO 28000 — Supply Chain Security Management Systems',
  standards_of_creation = 'CBP Compliance Assessment / Focused Assessment audit protocols; BIS Export Management and Compliance Program (EMCP) guidelines; DDTC Compliance Program Guidelines (ITAR Compliance Methodology); IIA Practice Advisories for trade compliance auditing; C-TPAT Security Profile questionnaire and validation standards; Trade compliance gap analysis documentation templates',
  soc_controls = 'SOC 2 Type II (audit management system); Audit workpaper documentation and retention; Corrective action tracking and verification; C-TPAT portal access and security profile controls; Audit independence verification; Management response documentation and follow-up; Continuous monitoring system controls'
WHERE name = 'Trade Compliance Auditor';

-- IT-020: Power of Attorney (Customs) Administrator
UPDATE citizen_catalog SET
  governing_guidelines = '19 CFR 141.31-141.47 — Entry and Power of Attorney; 19 CFR 141.32 — Power of Attorney Requirements; 19 CFR 141.37 — Corporate Power of Attorney (Customs Form 5291); 19 CFR 141.38 — Revocation of Power of Attorney; 19 CFR 141.46 — Nonresident Corporation POA Requirements; 19 USC 1484(a)(1) — Entry of Merchandise (who may make entry)',
  standards_of_creation = 'CBP Form 5291 — Power of Attorney completion standards; Corporate resolution documentation for POA authorization; Nonresident importer POA additional documentation requirements; POA scope limitation documentation; CBP ACE Portal POA electronic management; Revocation notice preparation and filing',
  soc_controls = 'POA management and expiration tracking; Corporate authorization verification controls; ACE Portal POA status monitoring; Revocation processing and confirmation controls; POA document retention per 19 CFR 111.23; Broker-client relationship documentation controls'
WHERE name = 'Power of Attorney (Customs) Administrator';

-- DI-001: Treaty Law Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'Vienna Convention on the Law of Treaties (1969) — Articles 2, 7, 11-17, 26, 31-33, 46-53; U.S. Constitution Article II, Section 2, Clause 2 — Treaty Power; Case Act (1 USC 112b) — International Agreement Reporting; Restatement (Fourth) of Foreign Relations Law — Treaties; Senate Executive Report procedures for treaty advice and consent; State Department Circular 175 (C-175) — Treaty-Making Process; Congressional-Executive Agreements (statutory authority basis)',
  standards_of_creation = 'State Department Treaty Affairs Office procedures (11 FAM 720); UN Treaty Handbook (Office of Legal Affairs); UN Treaty Collection Registration Requirements (Article 102, UN Charter); Vienna Convention interpretation methodology (Articles 31-33); Treaty reservation and declaration documentation; Self-executing vs. non-self-executing treaty analysis per Medellin v. Texas, 552 U.S. 491 (2008)',
  soc_controls = 'State Department treaty database access controls; UN Treaty Collection electronic filing controls; Classified treaty document handling per State Department standards; Treaty ratification instrument safeguarding; Congressional notification tracking per Case Act; Treaty implementation legislation tracking'
WHERE name = 'Treaty Law Specialist';

-- DI-002: International Arbitration Practitioner (ICSID/ICC/LCIA)
UPDATE citizen_catalog SET
  governing_guidelines = 'ICSID Convention (Washington Convention, 1965) — Articles 25-47; ICSID Arbitration Rules (2022 amendments); ICC Arbitration Rules (2021); LCIA Arbitration Rules (2020); UNCITRAL Arbitration Rules (2013 revision); New York Convention on Recognition and Enforcement of Foreign Arbitral Awards (1958); Federal Arbitration Act Chapter 2 (9 USC 201-208) — Convention implementation; IBA Rules on Taking of Evidence in International Arbitration (2020); IBA Guidelines on Conflicts of Interest in International Arbitration (2024)',
  standards_of_creation = 'ICSID Institution Rules and arbitration request filing standards; ICC Request for Arbitration format (Article 4); LCIA Request for Arbitration format (Article 1); UNCITRAL Notes on Organizing Arbitral Proceedings; IBA Rules on Evidence (document production standards); Redfern Schedule preparation standards (document requests); Witness statement and expert report preparation standards',
  soc_controls = 'ICSID Online Filing system controls; ICC Case Connect platform controls; Confidentiality and privilege management controls; Document production platform controls (Relativity, Opus 2); Tribunal communication protocols; Award authentication and certification controls; New York Convention enforcement filing controls'
WHERE name = 'International Arbitration Practitioner (ICSID/ICC/LCIA)';

-- DI-003: Hague Convention Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'Hague Service Convention (1965) — Convention on the Service Abroad of Judicial and Extrajudicial Documents; Hague Evidence Convention (1970) — Convention on the Taking of Evidence Abroad in Civil or Commercial Matters; Hague Child Abduction Convention (1980) — Convention on Civil Aspects of International Child Abduction; International Child Abduction Remedies Act (ICARA) (22 USC 9001-9011); 28 USC 1781 — Transmittal of Letter Rogatory or Request; FRCP Rule 4(f) — Serving Individual in Foreign Country; FRCP Rule 28(b) — Depositions in Foreign Countries',
  standards_of_creation = 'HCCH Practical Handbook on Service Convention Operation; HCCH Practical Handbook on Evidence Convention Operation; HCCH Guide to Good Practice: Child Abduction Convention (Parts I-VI); U.S. Central Authority application forms (ICARA); Model Request for Service Abroad (Hague Form); Letter rogatory preparation standards per FRCP and 28 USC 1781; HCCH Country Profiles and Declarations',
  soc_controls = 'HCCH electronic Apostille Programme (e-APP) controls; Central Authority case management system controls; International return order enforcement tracking; Service of process documentation and proof retention; Evidence request transmission security controls; Child location services coordination controls; Cross-border communication protocol controls'
WHERE name = 'Hague Convention Specialist';

-- DI-004: International Child Custody Attorney (UCCJEA)
UPDATE citizen_catalog SET
  governing_guidelines = 'Uniform Child Custody Jurisdiction and Enforcement Act (UCCJEA) — adopted all 50 states + DC; International Child Abduction Remedies Act (ICARA) (22 USC 9001-9011); Hague Child Abduction Convention (1980) — Articles 3, 12, 13, 20; UCCJEA Section 105 — International Application; Parental Kidnapping Prevention Act (PKPA) (28 USC 1738A); Sean and David Goldman International Child Abduction Prevention and Return Act (22 USC 9101-9141)',
  standards_of_creation = 'UCCJEA Uniform Law Commission Commentary; ICARA Petition preparation standards per 22 USC 9003; HCCH Guide to Good Practice on Mediation (Part V); NCMEC (National Center for Missing & Exploited Children) International Division procedures; State Department Office of Children''s Issues application procedures; Habitual residence determination documentation per case law',
  soc_controls = 'Court case management system controls; International case coordination and communication controls; Child welfare agency liaison documentation; NCMEC case referral tracking; State Department OCIA communication controls; Safe harbor / undertakings documentation; Return order enforcement and compliance monitoring'
WHERE name = 'International Child Custody Attorney (UCCJEA)';

-- DI-005: Foreign Judgment Recognition Attorney
UPDATE citizen_catalog SET
  governing_guidelines = 'Uniform Foreign-Country Money Judgments Recognition Act (2005) — adopted ~30 states; Uniform Foreign Money-Judgments Recognition Act (1962) — still effective in some states; Hilton v. Guyot, 159 U.S. 113 (1895) — Federal comity standard; Restatement (Fourth) of Foreign Relations Law Sections 481-489; New York Convention (arbitral awards) (9 USC 201-208); Inter-American Convention on Extraterritorial Validity of Foreign Judgments (OAS); Full Faith and Credit Clause — domestic only (inapplicable to foreign judgments)',
  standards_of_creation = 'State-specific recognition petition/complaint format; Judgment authentication requirements per target jurisdiction; Apostille/consular legalization per Hague Apostille Convention; Translation certification standards (court-certified translators); Judgment debtor asset discovery procedures; Restatement mandatory and discretionary grounds for non-recognition analysis',
  soc_controls = 'Court filing and case tracking system controls; Foreign judgment authentication verification controls; Translation certification verification; Asset discovery documentation controls; Judgment enforcement tracking; Statute of limitations monitoring per recognition act'
WHERE name = 'Foreign Judgment Recognition Attorney';

-- DI-006: Sovereign Immunity Attorney (FSIA)
UPDATE citizen_catalog SET
  governing_guidelines = 'Foreign Sovereign Immunities Act (FSIA) (28 USC 1602-1611); 28 USC 1603 — Definition of "foreign state" and agencies/instrumentalities; 28 USC 1604 — Immunity of foreign state (general rule); 28 USC 1605 — Exceptions (commercial activity, expropriation, tort, terrorism); 28 USC 1605A — Terrorism Exception (state sponsors); 28 USC 1608 — Service of Process on Foreign State; 28 USC 1610 — Exceptions to Immunity from Attachment/Execution; Bancec doctrine — Separate juridical entity analysis (First National City Bank v. Banco Para el Comercio Exterior de Cuba, 462 U.S. 611 (1983))',
  standards_of_creation = 'FSIA complaint drafting per 28 USC 1330 (subject matter jurisdiction); Service of process per 28 USC 1608 (four-method hierarchy); State Department Statement of Interest procedure; Commercial activity nexus analysis documentation; Terrorism exception certification requirements per 28 USC 1605A(a)(2); Attachment and execution documentation per 28 USC 1610',
  soc_controls = 'Court filing system controls (CM/ECF); Service of process tracking per FSIA methods; State Department coordination documentation; Classified evidence handling controls (terrorism cases); Judgment enforcement against sovereign assets controls; Diplomatic note documentation and retention'
WHERE name = 'Sovereign Immunity Attorney (FSIA)';

-- DI-007: Diplomatic Immunity Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'Vienna Convention on Diplomatic Relations (1961) — Articles 22, 27, 29, 31, 32, 37; Vienna Convention on Consular Relations (1963) — Articles 36, 41, 43; Diplomatic Relations Act (22 USC 254a-254e); International Organizations Immunities Act (IOIA) (22 USC 288 et seq.); State Department Diplomatic Note and Circular Note procedures; 22 CFR Part 91 — Registration and Authentication of Foreign Government Documentation; Persona non grata procedures per VCDR Article 9',
  standards_of_creation = 'State Department Diplomatic and Consular Immunity guidance (Blue Book); State Department Office of Foreign Missions procedures; Immunity determination request procedures; Diplomatic identification card (A/G visa) documentation; Waiver of immunity documentation per VCDR Article 32; Law enforcement notification procedures for diplomatic incidents',
  soc_controls = 'State Department diplomatic immunity verification system; Diplomatic ID card issuance and tracking controls; Law enforcement notification protocol controls; Incident documentation and reporting controls; Insurance compliance monitoring for diplomatic personnel; Persona non grata processing documentation; International organization immunity determination controls'
WHERE name = 'Diplomatic Immunity Specialist';

-- DI-008: International Humanitarian Law (IHL) Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'Geneva Conventions (I-IV, 1949) — Common Article 3; Additional Protocols I and II (1977) to the Geneva Conventions; Hague Regulations Respecting the Laws and Customs of War on Land (1907); Rome Statute of the International Criminal Court (Article 8 — War Crimes); Convention on Certain Conventional Weapons (CCW) and Protocols; Convention on Cluster Munitions (2008); Ottawa Treaty (Anti-Personnel Mine Ban Convention, 1997); U.S. Law of War Manual (DOD, 2016, updated); Customary International Humanitarian Law (ICRC Study, 161 rules)',
  standards_of_creation = 'ICRC Commentary on the Geneva Conventions (updated commentaries); ICRC Guidelines on the Protection of Natural Environment in Armed Conflict; DOD Law of War Manual documentation standards; Military targeting analysis documentation (proportionality, distinction, precaution); Geneva Convention application determination frameworks; Prisoner of war (POW) status determination standards per GC III Article 5; Civilian protection assessment documentation',
  soc_controls = 'Classified document handling controls (military/intelligence); ICRC detention visit documentation controls; Targeting decision documentation and retention; Rules of engagement (ROE) compliance monitoring; Protected person status determination tracking; Evidence preservation for potential war crimes investigation; Cross-reference controls between IHL and criminal accountability'
WHERE name = 'International Humanitarian Law (IHL) Specialist';

-- DI-009: UN Security Council Compliance Officer
UPDATE citizen_catalog SET
  governing_guidelines = 'UN Charter Chapter VII — Action with Respect to Threats to the Peace; UN Security Council Sanctions Committee procedures (1267, 1718, 1737, etc.); UN Security Council Resolution implementation requirements; United Nations Participation Act (22 USC 287c); IEEPA (50 USC 1701) — Domestic implementation authority; Executive Orders implementing UNSC resolutions; OFAC regulations implementing UN sanctions (31 CFR Parts 500-599)',
  standards_of_creation = 'UN Security Council Sanctions Committee reporting templates; UN Panel of Experts methodology standards; State Department UNSC resolution compliance guidance; OFAC correspondence with UN sanctions designations; Arms embargo implementation documentation; Travel ban and asset freeze implementation documentation; Humanitarian exemption request procedures per UNSC resolution provisions',
  soc_controls = 'SOC 2 Type II (sanctions compliance platform — UN list integration); UN Consolidated List screening integration; Sanctions Committee notification and reporting controls; Asset freeze implementation and monitoring controls; Travel ban screening controls; Arms embargo end-use verification controls; Periodic reporting compliance tracking'
WHERE name = 'UN Security Council Compliance Officer';

-- DI-010: International Criminal Tribunal Practitioner
UPDATE citizen_catalog SET
  governing_guidelines = 'Rome Statute of the International Criminal Court (1998) — Articles 5-8bis, 13-21, 53-61, 64-74; ICC Rules of Procedure and Evidence; ICC Elements of Crimes; ICC Regulations of the Court; ICC Regulations of the Registry; Mechanism for International Criminal Tribunals (MICT) Statute and Rules (ICTY/ICTR residual); U.S. War Crimes Act (18 USC 2441); Genocide Convention Implementation Act (18 USC 1091)',
  standards_of_creation = 'ICC Practice Manual; ICC Office of the Prosecutor Policy Papers (preliminary examinations, interests of justice, etc.); ICC Trust Fund for Victims reparations procedures; Defence counsel qualification and assignment standards per ICC Regulations; Victim participation application procedures per ICC Rule 89; ICC e-Court Protocol (electronic filing and document management)',
  soc_controls = 'ICC e-Court electronic filing system controls; Classified/confidential evidence handling controls; Witness protection documentation and security controls; Victim/witness identity protection controls; Defence evidence management and disclosure controls; Reparations order implementation tracking; Inter-state cooperation request tracking'
WHERE name = 'International Criminal Tribunal Practitioner';

-- DI-011: Human Rights Complaint Practitioner (International Bodies)
UPDATE citizen_catalog SET
  governing_guidelines = 'Optional Protocol to the ICCPR (individual complaint mechanism — UN HRC); Convention Against Torture Optional Protocol (CAT complaints); CERD Individual Communications Procedure (Article 14); Inter-American Convention on Human Rights — Articles 44-51 (OAS/IACHR petitions); European Convention on Human Rights — Articles 34-35 (ECHR individual applications); African Charter on Human and Peoples'' Rights — Articles 55-59 (ACHPR); UN Special Procedures complaint mechanism; Universal Periodic Review (UPR) process',
  standards_of_creation = 'UN OHCHR Individual Complaint Procedures Fact Sheets; UN Human Rights Committee Rules of Procedure (CCPR/C/3/Rev.12); IACHR Petition System Regulations (Articles 23-44); ECHR Application Form and Practice Directions; Admissibility criteria documentation (exhaustion of domestic remedies, timeliness); Amicus curiae brief preparation standards per each body; Victim impact statement and evidence compilation standards',
  soc_controls = 'UN OHCHR electronic filing system controls; ECHR electronic filing (eComms) system controls; IACHR petition tracking system controls; Confidential evidence handling per tribunal rules; Witness protection coordination; Interim measures / provisional measures request tracking; Follow-up and compliance monitoring controls'
WHERE name = 'Human Rights Complaint Practitioner (International Bodies)';

-- DI-012: Refugee Status Determination (RSD) Specialist
UPDATE citizen_catalog SET
  governing_guidelines = '1951 Convention Relating to the Status of Refugees — Article 1(A)(2) (refugee definition); 1967 Protocol Relating to the Status of Refugees; INA Section 101(a)(42) — Refugee Definition (8 USC 1101(a)(42)); INA Section 208 — Asylum (8 USC 1158); INA Section 207 — Refugee Admissions (8 USC 1157); 8 CFR Part 208 — Procedures for Asylum and Withholding of Removal; Convention Against Torture (CAT) — Article 3 (non-refoulement); 8 CFR 208.16-208.18 — Withholding and CAT Protection',
  standards_of_creation = 'UNHCR Handbook on Procedures and Criteria for Determining Refugee Status (HCR/1P/4/ENG/REV.4); UNHCR Guidelines on International Protection (Nos. 1-15); USCIS Asylum Officer Basic Training Course (AOBTC) materials; USCIS RAIO Combined Training materials; Country Conditions documentation standards (State Department, UNHCR, credible sources); Credible fear and reasonable fear screening standards per 8 CFR 208.30-208.31; EOIR Practice Manual — Immigration Court filing standards',
  soc_controls = 'USCIS RAPS (Refugee, Asylum, and Parole System) access controls; EOIR Case Access System for Attorneys (ECAS) controls; Confidential case file handling per 8 CFR 208.6; Country conditions database access and update controls; Interpreter qualification and security verification controls; Identity document verification and fraud detection controls; UNHCR registration and case management system (proGres) controls'
WHERE name = 'Refugee Status Determination (RSD) Specialist';

-- DI-013: Statelessness Determination Specialist
UPDATE citizen_catalog SET
  governing_guidelines = '1954 Convention Relating to the Status of Stateless Persons; 1961 Convention on the Reduction of Statelessness; UNHCR Guidelines on Statelessness No. 1-5; INA provisions on nationality and citizenship (8 USC 1401-1504); UN Human Rights Council Resolution 32/5 on Right to Nationality; European Convention on Nationality (1997); UNHCR Global Action Plan to End Statelessness (2014-2024/extended)',
  standards_of_creation = 'UNHCR Handbook on Protection of Stateless Persons (2014); UNHCR Statelessness Determination Procedures guidance; Nationality law research methodology and documentation; Birth registration gap analysis documentation; Stateless population mapping standards; Facilitated naturalization documentation per 1961 Convention',
  soc_controls = 'UNHCR population database (proGres) access controls; Birth registration and identity documentation verification; Nationality law database management; Case file confidentiality and privacy controls; Cross-border coordination documentation controls; Legal status documentation issuance tracking'
WHERE name = 'Statelessness Determination Specialist';

-- DI-014: International Sanctions Compliance Specialist (Non-U.S.)
UPDATE citizen_catalog SET
  governing_guidelines = 'EU Sanctions Regulations (Council Regulations per CFSP decisions); EU Blocking Statute (Regulation (EC) 2271/96 — as updated); UK Sanctions and Anti-Money Laundering Act 2018 (SAMLA); UK Office of Financial Sanctions Implementation (OFSI) guidance; Canadian Special Economic Measures Act (SEMA); Australian Autonomous Sanctions Regulations 2011; UN Security Council Resolution sanctions regimes (cross-ref DI-009)',
  standards_of_creation = 'EU Restrictive Measures Best Practices guidance; UK OFSI General Guidance for Financial Sanctions; Multi-jurisdictional sanctions mapping documentation; Sanctions license application procedures per jurisdiction; Blocking statute compliance analysis documentation; De-listing petition procedures per jurisdiction',
  soc_controls = 'SOC 2 Type II (multi-jurisdictional screening platform — World-Check, Accuity, Dow Jones); EU Consolidated Financial Sanctions List integration; UK OFSI Consolidated List integration; Multi-regime screening overlap analysis controls; License condition compliance tracking per jurisdiction; Blocking statute conflict documentation; Regular screening list update and reconciliation'
WHERE name = 'International Sanctions Compliance Specialist (Non-U.S.)';

-- DI-015: International Labor Standards Specialist (ILO)
UPDATE citizen_catalog SET
  governing_guidelines = 'ILO Declaration on Fundamental Principles and Rights at Work (1998, amended 2022); ILO Core Conventions (C29 Forced Labour, C87 Freedom of Association, C98 Collective Bargaining, C100 Equal Remuneration, C105 Abolition of Forced Labour, C111 Discrimination, C138 Minimum Age, C182 Worst Forms of Child Labour, C155 Occupational Safety, C187 Promotional Framework for OSH); USMCA Labor Chapter (Chapter 23); UFLPA (Uyghur Forced Labor Prevention Act) (19 USC 1307 note); Tariff Act Section 307 — Forced Labor Import Prohibition (19 USC 1307); California Transparency in Supply Chains Act (SB 657); UK Modern Slavery Act 2015',
  standards_of_creation = 'ILO Committee of Experts on the Application of Conventions reporting standards; ILO-IOE Guidelines on Child Labour and OSH; UN Guiding Principles on Business and Human Rights (Ruggie Principles); OECD Due Diligence Guidance for Responsible Business Conduct; SA8000 (Social Accountability International) Certification Standard; UFLPA Strategy and Entity List documentation; Supply chain due diligence documentation per UFLPA enforcement guidance',
  soc_controls = 'SOC 2 Type II (supply chain compliance management platform); Forced labor screening system (CBP Withhold Release Orders list); Supply chain mapping and traceability controls; Third-party social audit verification controls; Worker grievance mechanism documentation; Modern slavery statement preparation and filing controls; UFLPA rebuttable presumption evidence documentation'
WHERE name = 'International Labor Standards Specialist (ILO)';

-- DI-016: Cross-Border Data Transfer Compliance Officer
UPDATE citizen_catalog SET
  governing_guidelines = 'EU General Data Protection Regulation (GDPR) — Articles 44-49 (Chapter V: Transfers); EU-U.S. Data Privacy Framework (DPF) (2023); Standard Contractual Clauses (SCCs) — EU Commission Implementing Decision 2021/914; UK International Data Transfer Agreement (IDTA) and UK Addendum to SCCs; Binding Corporate Rules (BCRs) per GDPR Article 47; APEC Cross-Border Privacy Rules (CBPR) System; Schrems II (CJEU Case C-311/18) — Transfer Impact Assessment requirement; Swiss-U.S. Data Privacy Framework',
  standards_of_creation = 'EDPB Guidelines on Data Transfers (Guidelines 05/2020); EDPB Recommendations on Supplementary Measures (01/2020); Transfer Impact Assessment (TIA) documentation standards; SCC Module selection guidance (C2C, C2P, P2C, P2P); BCR application procedure (EDPB referential); Data Privacy Framework self-certification procedures (ITA); Record of Processing Activities (ROPA) requirements per GDPR Article 30',
  soc_controls = 'SOC 2 Type II (data transfer management platform); SCC execution and management controls; Data Privacy Framework annual re-certification; Transfer Impact Assessment periodic review controls; BCR compliance monitoring and annual audit; Data localization compliance controls; Cross-border data flow mapping and documentation; Data protection officer (DPO) oversight controls'
WHERE name = 'Cross-Border Data Transfer Compliance Officer';

-- DI-017: MLAT / International Legal Cooperation Attorney
UPDATE citizen_catalog SET
  governing_guidelines = 'Bilateral MLATs (U.S. has MLATs with 70+ countries); 18 USC 3512 — Foreign Requests for Assistance in Criminal Investigations; 28 USC 1782 — Assistance to Foreign and International Tribunals; Inter-American Convention on Mutual Assistance in Criminal Matters (OAS); European Convention on Mutual Assistance in Criminal Matters (Strasbourg Convention); U.S.-EU MLAT Agreement (2010); Budapest Convention on Cybercrime — Mutual Assistance provisions (Articles 29-35); CLOUD Act (18 USC 2523) — Cross-Border Data Access',
  standards_of_creation = 'DOJ OIA MLAT Request preparation guidelines; Central Authority request format standards per treaty; 28 USC 1782 application format (ex parte or adversarial); Letters rogatory preparation standards; Foreign evidence authentication requirements (FRE 901, 902); CLOUD Act bilateral agreement documentation; Chain of custody documentation for cross-border evidence',
  soc_controls = 'DOJ OIA case tracking system controls; Classified/sensitive evidence handling per CIPA; Cross-border evidence transmission security controls; Translation certification verification; Dual criminality analysis documentation; Specialty/rule of specialty compliance tracking; CLOUD Act order compliance monitoring'
WHERE name = 'MLAT / International Legal Cooperation Attorney';

-- DI-018: Extradition Attorney
UPDATE citizen_catalog SET
  governing_guidelines = 'Bilateral Extradition Treaties (U.S. has treaties with 100+ countries); 18 USC 3181-3196 — Extradition Statutes; 18 USC 3184 — Fugitive from Foreign Country (judicial role); 18 USC 3186 — Secretary of State Surrender Authority; 18 USC 3190 — Evidence on Hearing (probable cause standard); 18 USC 3195 — Payment of Fees; Restatement (Fourth) of Foreign Relations Law — Extradition sections; Rule of Specialty per treaty provisions',
  standards_of_creation = 'DOJ OIA Extradition Request preparation guidelines; Extradition complaint and warrant procedures per 18 USC 3184; Probable cause hearing documentation standards; Treaty analysis for dual criminality; Certificate of Extraditability preparation; Secretary of State surrender memorandum; Foreign evidence authentication per treaty requirements and FRE',
  soc_controls = 'DOJ OIA case management system controls; INTERPOL Red Notice coordination and tracking; Fugitive location and coordination controls; Bail/detention hearing documentation controls; Rule of specialty compliance monitoring post-surrender; Political offense exception analysis documentation; Treaty obligation tracking and compliance'
WHERE name = 'Extradition Attorney';

-- DI-019: FISA / Foreign Intelligence Surveillance Attorney
UPDATE citizen_catalog SET
  governing_guidelines = 'Foreign Intelligence Surveillance Act (FISA) (50 USC 1801-1885a); 50 USC 1804 — Application for Order (traditional FISA); 50 USC 1805 — Issuance of Order; 50 USC 1861 — Access to Business Records (Section 215, as reformed); FISA Amendments Act of 2008 — Section 702 (50 USC 1881a); USA FREEDOM Act of 2015 — CDR Program reforms; FISA Section 702 Reauthorization Act of 2024; Executive Order 14086 — Safeguards for Signals Intelligence Activities; PPD-28 — Signals Intelligence Activities',
  standards_of_creation = 'FISC Rules of Procedure; DOJ NSD FISA Application preparation standards; Minimization procedures documentation requirements per 50 USC 1801(h); Attorney General Certification procedures (Section 702); FISC amicus curiae appointment standards per 50 USC 1803(i); Intelligence Community targeting procedures; Querying procedures documentation (U.S. person queries)',
  soc_controls = 'FISC classified filing system controls (SCIF requirements); Targeting procedure compliance controls; Minimization procedure implementation controls; Querying procedure audit controls (FBI, NSA, CIA); Section 702 annual certification review controls; ODNI compliance and oversight reporting; PCLOB (Privacy and Civil Liberties Oversight Board) review compliance; Congressional notification and reporting controls (50 USC 1808, 1871, 1881f)'
WHERE name = 'FISA / Foreign Intelligence Surveillance Attorney';

-- DI-020: International Anti-Corruption Attorney (Foreign Dimension)
UPDATE citizen_catalog SET
  governing_guidelines = 'FCPA (15 USC 78dd-1 through 78dd-3) — International enforcement cooperation dimension; UN Convention Against Corruption (UNCAC) — Chapter V (Asset Recovery); Stolen Asset Recovery Initiative (StAR) — World Bank/UNODC; DOJ Kleptocracy Asset Recovery Initiative; 18 USC 981, 1956 — Money laundering and forfeiture (international proceeds); Global Magnitsky Human Rights Accountability Act (22 USC 2656 note); EU Anti-Money Laundering Directives (6AMLD)',
  standards_of_creation = 'UNODC Technical Guide to UNCAC; StAR Asset Recovery Handbook; DOJ/SEC FCPA Resource Guide (international cooperation sections); Transparency International Corruption Perceptions Index methodology; Multi-jurisdictional investigation coordination documentation; Asset tracing and recovery documentation standards; Global Magnitsky sanctions designation petition standards',
  soc_controls = 'SOC 2 Type II (international investigation management platform); Multi-jurisdictional evidence management controls; Asset tracing database access controls; Whistleblower identity protection controls; Cross-border cooperation request tracking; Sanctions designation evidence documentation; Classified and sensitive evidence handling per DOJ standards'
WHERE name = 'International Anti-Corruption Attorney (Foreign Dimension)';

-- DI-021: International Data Privacy Enforcement Liaison
UPDATE citizen_catalog SET
  governing_guidelines = 'EU-U.S. Data Privacy Framework Principles (2023); FTC Act Section 5 — Unfair or Deceptive Acts (privacy enforcement); GDPR Article 77-84 — Remedies, Liability, Penalties; GDPR Article 83 — Administrative Fines (up to 4% global turnover); UK Data Protection Act 2018 — Enforcement provisions; Data Protection Review Court procedures per EO 14086; FTC Privacy Framework enforcement actions and consent decrees',
  standards_of_creation = 'Data Privacy Framework self-certification procedures; FTC Consent Decree compliance documentation; DPA complaint response documentation standards; Cross-border enforcement cooperation documentation (GPA, GPEN); Data breach notification documentation per GDPR Article 33-34; Data Protection Impact Assessment (DPIA) per GDPR Article 35; Data processing agreement documentation per GDPR Article 28',
  soc_controls = 'SOC 2 Type II (privacy management platform — OneTrust, BigID, TrustArc); Privacy Framework annual re-certification verification; DPA inquiry response tracking; Data breach notification timeline compliance (72-hour rule); DPIA documentation and review controls; Consent management platform controls; Privacy rights request fulfillment tracking (DSARs); Cross-border enforcement action tracking'
WHERE name = 'International Data Privacy Enforcement Liaison';


-- ═══════════════════════════════════════════════════════════════
-- ENVIRONMENTAL, TRIBAL, CANNABIS & GAMING
-- ═══════════════════════════════════════════════════════════════

-- ENV-001: CEQA Lead Analyst / Environmental Impact Report Manager
UPDATE citizen_catalog SET
  governing_guidelines = 'California Environmental Quality Act (CEQA) (Cal. Pub. Res. Code 21000-21189); CEQA Guidelines (14 CCR 15000-15387); 14 CCR 15064 (determining significance of environmental effects); 14 CCR 15120-15132 (EIR preparation and content requirements); 14 CCR 15082 (Notice of Preparation); 14 CCR 15088 (evaluation and response to comments); 14 CCR 15091 (findings); 14 CCR 15093 (statement of overriding considerations); Cal. Pub. Res. Code 21167 (statute of limitations for CEQA challenges); Cal. Gov. Code 65300-65303.4 (General Plan consistency)',
  standards_of_creation = 'OPR CEQA Technical Advisories; Association of Environmental Professionals (AEP) CEQA Practice Guidelines; California Air Resources Board (CARB) modeling protocols for air quality analysis; Caltrans Standard Environmental Reference (SER) for transportation projects; California Department of Fish and Wildlife (CDFW) CEQA filing fees (Fish & Game Code 711.4); OPR General Plan Guidelines (environmental element); AEP Environmental Monitor certification standards',
  soc_controls = 'SOC 2 Type II (environmental database integrity, State Clearinghouse filing systems); CEQA Document Portal audit trails; Notice of Determination (NOD) filing verification (County Clerk); Public comment period tracking and completeness verification; Mitigation Monitoring and Reporting Program (MMRP) tracking systems'
WHERE name = 'CEQA Lead Analyst / Environmental Impact Report Manager';

-- ENV-002: NEPA Compliance Specialist / EIS Preparer
UPDATE citizen_catalog SET
  governing_guidelines = 'National Environmental Policy Act (NEPA) (42 USC 4321-4370h); CEQ Regulations (40 CFR 1500-1508, revised 2024); 40 CFR 1502 (EIS content and format); 40 CFR 1501.5 (lead and cooperating agencies); 40 CFR 1502.14 (alternatives including proposed action); 40 CFR 1502.16 (environmental consequences); 40 CFR 1506.6 (public involvement); EPA Section 309 review authority (Clean Air Act 42 USC 7609); Fiscal Responsibility Act of 2023 (NEPA reforms — page limits, timelines); Executive Order 14096 (Revitalizing Our Nation''s Commitment to Environmental Justice)',
  standards_of_creation = 'CEQ NEPA Guidance Documents and Memoranda; EPA NEPA Compliance Guide; Federal Highway Administration (FHWA) Environmental Review Toolkit; Department of Energy NEPA Compliance Guide (DOE Order 451.1B); Bureau of Land Management NEPA Handbook (H-1790-1); Army Corps of Engineers NEPA Implementation Procedures (33 CFR 230); NAEP (National Association of Environmental Professionals) Practice Standards',
  soc_controls = 'SOC 2 Type II (federal environmental review tracking systems); EPA EIS Database (filing and tracking); Federal Register Notice of Intent (NOI) verification; Record of Decision (ROD) audit trails; eNEPA electronic filing system controls; Government Accountability Office (GAO) NEPA compliance audits'
WHERE name = 'NEPA Compliance Specialist / EIS Preparer';

-- ENV-003: Environmental Planning Consultant
UPDATE citizen_catalog SET
  governing_guidelines = 'CEQA (Cal. Pub. Res. Code 21000 et seq.); NEPA (42 USC 4321 et seq.); 14 CCR 15063 (Initial Study); 14 CCR 15070-15075 (Negative Declaration / Mitigated Negative Declaration); 14 CCR 15168 (Program EIR); 14 CCR 15183 (projects consistent with community plan); Cal. Gov. Code 65300 et seq. (General Plan); Sustainable Communities and Climate Protection Act (SB 375, Cal. Gov. Code 65080)',
  standards_of_creation = 'AEP CEQA Guidelines and Best Practices; AICP Code of Ethics and Professional Conduct; APA (American Planning Association) Planning Advisory Service Reports; OPR Technical Advisories on CEQA streamlining; Institute of Environmental Management and Assessment (IEMA) Quality Mark Standards; ISO 14001 (Environmental Management Systems) as framework',
  soc_controls = 'SOC 2 Type II (project management and document control systems); Planning document version control and audit trails; Public notice and comment period verification systems; Mitigation measure tracking databases'
WHERE name = 'Environmental Planning Consultant';

-- ENV-004: Environmental Attorney (CEQA/NEPA Litigation)
UPDATE citizen_catalog SET
  governing_guidelines = 'CEQA (Cal. Pub. Res. Code 21000 et seq.); NEPA (42 USC 4321 et seq.); Cal. Pub. Res. Code 21167-21168.9 (CEQA judicial review); Administrative Procedure Act (5 USC 701-706) (NEPA judicial review); Cal. CCP 1094.5 (administrative mandamus); Standing requirements (Lujan v. Defenders of Wildlife, 504 U.S. 555 (1992)); Exhaustion of administrative remedies (Cal. Pub. Res. Code 21177); ESA citizen suit provision (16 USC 1540(g)); Clean Water Act citizen suit (33 USC 1365); Clean Air Act citizen suit (42 USC 7604)',
  standards_of_creation = 'ABA Model Rules of Professional Conduct (1.1, 1.3, 3.1); State bar environmental law section practice guides; Continuing Seminar of the Bar (CEB) California Environmental Law & Land Use Practice; Environmental Law Institute (ELI) publications and practice standards; Rutter Group CEQA Practice Guide',
  soc_controls = 'Attorney-client privilege audit controls; Case management system access controls; Court filing verification (electronic and physical); Litigation hold and document preservation protocols'
WHERE name = 'Environmental Attorney (CEQA/NEPA Litigation)';

-- ENV-005: Phase I Environmental Site Assessor
UPDATE citizen_catalog SET
  governing_guidelines = 'CERCLA (42 USC 9601-9675) — innocent landowner defense / bona fide prospective purchaser; Small Business Liability Relief and Brownfields Revitalization Act (Pub. L. 107-118); All Appropriate Inquiries Rule (40 CFR 312); CERCLA 101(35)(B) (innocent landowner defense prerequisites); CERCLA 107(r) (contiguous property owner); CERCLA 101(40) (bona fide prospective purchaser); Cal. Health & Safety Code 25300-25395.45 (state Superfund)',
  standards_of_creation = 'ASTM E1527-21 (Standard Practice for Environmental Site Assessments: Phase I); ASTM E2247-16 (vapor intrusion screening); ASTM E1528-22 (transaction screen process); EPA All Appropriate Inquiries Final Rule (70 FR 66070); SBA Standard Operating Procedure 50 10 (environmental review for SBA loans); FDIC/OCC environmental risk guidance for lenders; Qualification: Environmental Professional as defined in 40 CFR 312.10',
  soc_controls = 'SOC 2 Type II (environmental database query systems — EDR, GeoSearch); Historical database search verification (Sanborn maps, city directories, aerial photos); Regulatory database search completeness (federal, state, tribal, local); Report signature and Environmental Professional declaration controls; Client engagement letter and scope limitation documentation'
WHERE name = 'Phase I Environmental Site Assessor';

-- ENV-006: Phase II Environmental Site Assessor
UPDATE citizen_catalog SET
  governing_guidelines = 'CERCLA 42 USC 9604(b) (investigation authority); RCRA 42 USC 6991 et seq. (UST investigation); 40 CFR 312.1(b) (Phase II referenced in AAI rule); State voluntary cleanup program regulations; Cal. Health & Safety Code 25395.90-25395.127 (Brownfield cleanup); Cal. Water Code 13260-13274 (waste discharge requirements)',
  standards_of_creation = 'ASTM E1903-19 (Standard Practice for Environmental Site Assessments: Phase II); ASTM D6169-20 (soil sampling for environmental assessments); EPA SW-846 Test Methods for Evaluating Solid Waste; EPA Soil Screening Guidance (Technical Background Document); State-specific laboratory certification requirements; National Environmental Laboratory Accreditation Program (NELAP/TNI); Professional Geologist (PG) or Professional Engineer (PE) certification required by state',
  soc_controls = 'SOC 2 Type II (laboratory information management systems — LIMS); Chain of custody documentation and verification; Laboratory QA/QC protocols (method blanks, duplicates, matrix spikes); Data validation (EPA data quality objectives — DQO process); Boring log and sample location GPS verification'
WHERE name = 'Phase II Environmental Site Assessor';

-- ENV-007: Remediation Engineer / Corrective Action Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'CERCLA 42 USC 9604-9606 (response authorities); National Contingency Plan (NCP) (40 CFR 300); 40 CFR 300.430 (remedial investigation/feasibility study — RI/FS); RCRA Corrective Action (42 USC 6924(u), (v); 40 CFR 264.100-101); Cal. Health & Safety Code 25356.1 (remedial action plans); Cal. Water Code 13304 (cleanup and abatement orders); Underground Storage Tank regulations (40 CFR 280 Subpart F)',
  standards_of_creation = 'EPA Guidance for Conducting Remedial Investigations and Feasibility Studies (EPA/540/G-89/004); EPA Presumptive Remedies guidance documents; ITRC (Interstate Technology Regulatory Council) Technical and Regulatory Guidance; ASTM E2893-16 (Framework for Greener Cleanups); State-specific remediation standards and cleanup levels; PE licensure required for remediation design in all states',
  soc_controls = 'SOC 2 Type II (remediation monitoring data systems); Groundwater monitoring data integrity verification; Institutional control registry (deed restrictions, environmental covenants); Five-year review tracking (CERCLA 121(c)); EPA Superfund Enterprise Management System (SEMS) data controls'
WHERE name = 'Remediation Engineer / Corrective Action Specialist';

-- ENV-008: Superfund / CERCLA Program Manager
UPDATE citizen_catalog SET
  governing_guidelines = 'CERCLA (42 USC 9601-9675); National Contingency Plan (40 CFR 300); SARA Title III (42 USC 11001-11050) — Emergency Planning and Community Right-to-Know; 40 CFR 300.415 (removal actions); 40 CFR 300.430 (remedial actions); CERCLA 107 (liability framework — strict, joint and several, retroactive); CERCLA 113(f) (contribution actions); CERCLA 122 (settlements — consent decrees, administrative orders); Executive Order 12580 (Superfund Implementation)',
  standards_of_creation = 'EPA Superfund Removal Procedures (ARAR determinations); EPA Community Involvement Handbook; EPA Risk Assessment Guidance for Superfund (RAGS); EPA Hazard Ranking System (HRS) Guidance (40 CFR 300 Appendix A); National Priorities List (NPL) listing procedures; Potentially Responsible Party (PRP) search procedures; EPA Integrated Financial Management System (IFMS) for cost recovery',
  soc_controls = 'SOC 2 Type II (SEMS — Superfund Enterprise Management System); EPA CERCLIS/SEMS database integrity controls; Cost documentation and recovery tracking; Administrative Record file completeness verification; Community notification and involvement audit trails'
WHERE name = 'Superfund / CERCLA Program Manager';

-- ENV-009: Clean Air Act Permit Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'Clean Air Act (CAA) (42 USC 7401-7671q); 40 CFR 52 (State Implementation Plans — SIP); 40 CFR 70-71 (Title V Operating Permits); 40 CFR 51.166 / 52.21 (Prevention of Significant Deterioration — PSD); 40 CFR 51.165 (Nonattainment New Source Review — NNSR); CAA Section 112 (Hazardous Air Pollutants / NESHAPs) (40 CFR 61, 63); CAA Title VI (Stratospheric Ozone Protection) (40 CFR 82); Cal. Health & Safety Code 39000-44384 (California Clean Air Act); BAAQMD Regulation 2 (Permits)',
  standards_of_creation = 'EPA New Source Review Workshop Manual; EPA AP-42 Emission Factors (Compilation of Air Pollutant Emission Factors); EPA Air Quality Modeling Guidelines (40 CFR 51 Appendix W); ASTM D6196 (Air Monitoring); American Meteorological Society / EPA AERMOD modeling system; California Air Resources Board (CARB) emission inventory guidelines; South Coast AQMD Best Available Control Technology (BACT) guidelines',
  soc_controls = 'SOC 2 Type II (Continuous Emissions Monitoring Systems — CEMS data integrity); EPA Compliance and Emissions Data Reporting Interface (CEDRI); Title V annual compliance certification tracking; Deviation reporting and excess emission tracking; CEMS data acquisition and handling systems (40 CFR 75)'
WHERE name = 'Clean Air Act Permit Specialist';

-- ENV-010: Emissions Trading / Carbon Credit Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'CAA Title IV (Acid Rain Program) (42 USC 7651-7651o); 40 CFR 73-78 (Acid Rain Allowance System); Cal. Health & Safety Code 38500-38599 (AB 32 — Global Warming Solutions Act); 17 CCR 95800-96023 (CARB Cap-and-Trade Regulation); Regional Greenhouse Gas Initiative (RGGI) Model Rule; EU ETS Directive 2003/87/EC (for cross-border credit verification); Paris Agreement Article 6 (internationally transferred mitigation outcomes)',
  standards_of_creation = 'CARB Mandatory Reporting Regulation (17 CCR 95100-95163); EPA Greenhouse Gas Reporting Program (40 CFR 98 — Subparts A through UU); Verra VCS Standard v4.5; Gold Standard for the Global Goals Requirements; Climate Action Reserve Program Manual and Protocols; American Carbon Registry Standard; ISO 14064-1/2/3 (Greenhouse Gas Quantification and Verification); ISO 14065 (Bodies Validating/Verifying GHG Assertions)',
  soc_controls = 'SOC 2 Type II (registry systems — CARB CITSS, EPA CAMD); Allowance tracking system integrity (EPA Clean Air Markets Division); CARB Compliance Instrument Tracking System Service (CITSS) controls; Third-party verification body accreditation (ANAB/ANSI); Offset project registry and serial number tracking; Double-counting prevention controls'
WHERE name = 'Emissions Trading / Carbon Credit Specialist';

-- ENV-011: Clean Water Act Permit Manager / NPDES Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'Clean Water Act (CWA) (33 USC 1251-1388); CWA Section 402 (NPDES permits) (33 USC 1342); 40 CFR 122-125 (NPDES permit regulations); 40 CFR 136 (Guidelines for Establishing Test Procedures — analytical methods); 40 CFR 401-471 (Effluent Limitations Guidelines — ELG by industry category); CWA Section 401 (state water quality certification); CWA Section 303(d) (impaired waters list / TMDLs); Cal. Water Code 13000-16104 (Porter-Cologne Water Quality Control Act); Cal. Water Code 13260 (Waste Discharge Requirements — WDR)',
  standards_of_creation = 'EPA NPDES Permit Writers'' Manual; EPA Technical Support Document for Water Quality-Based Toxics Control; EPA TMDL guidance documents; Standard Methods for the Examination of Water and Wastewater (APHA/AWWA/WEF); 40 CFR 136 approved analytical methods; State water board general permit templates (Construction, Industrial, MS4); EPA Whole Effluent Toxicity (WET) test methods',
  soc_controls = 'SOC 2 Type II (Discharge Monitoring Report — DMR data systems); EPA Integrated Compliance Information System (ICIS-NPDES); NetDMR electronic filing system controls; Laboratory QA/QC for permitted discharge analysis; Self-monitoring report verification and exceedance tracking; Spill notification and response documentation'
WHERE name = 'Clean Water Act Permit Manager / NPDES Specialist';

-- ENV-012: Stormwater Compliance Manager
UPDATE citizen_catalog SET
  governing_guidelines = 'CWA Section 402(p) (stormwater regulation) (33 USC 1342(p)); 40 CFR 122.26 (stormwater discharge permits); 40 CFR 450 (Construction and Development Effluent Guidelines); EPA Construction General Permit (CGP) (current NPDES permit); EPA Multi-Sector General Permit (MSGP); Cal. Water Code 13376 (stormwater permits); California Construction General Permit (Order 2022-0057-DWQ); California Industrial General Permit (Order 2014-0057-DWQ); Post-construction stormwater management regulations (MS4 permits)',
  standards_of_creation = 'EPA SWPPP guidance documents; California Stormwater Quality Association (CASQA) BMP Handbooks; Qualified SWPPP Developer (QSD) certification requirements (Cal. Water Board); Qualified SWPPP Practitioner (QSP) certification requirements; RUSLE2 / MUSLE erosion calculation methods; Caltrans Stormwater Quality Handbooks; Low Impact Development (LID) design manuals',
  soc_controls = 'SOC 2 Type II (Stormwater Multiple Application and Report Tracking System — SMARTS); SMARTS electronic filing and Discharge Monitoring Report submission; BMP installation and maintenance inspection logs; Rain event action plan (REAP) trigger and response tracking; Annual report and no-exposure certification verification'
WHERE name = 'Stormwater Compliance Manager';

-- ENV-013: Wetlands Delineation Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'CWA Section 404 (33 USC 1344) — dredge and fill permit; 33 CFR 320-332 (USACE regulatory program); 40 CFR 230 (Section 404(b)(1) Guidelines); Rivers and Harbors Act Section 10 (33 USC 403); Executive Order 11990 (Protection of Wetlands); Rapanos v. United States, 547 U.S. 715 (2006) — jurisdictional scope; Sackett v. EPA, 598 U.S. 651 (2023) — waters of the United States; Cal. Fish & Game Code 1600-1616 (Lake and Streambed Alteration)',
  standards_of_creation = 'USACE Wetlands Delineation Manual (Technical Report Y-87-1, 1987); USACE Regional Supplements to the Delineation Manual (Arid West, Western Mountains, etc.); USFWS National Wetlands Inventory (NWI) mapping standards; Society of Wetland Scientists (SWS) Professional Certification Program; Professional Wetland Scientist (PWS) credential requirements; USACE Jurisdictional Determination (JD) Standard Operating Procedures; Mitigation Banking Instrument requirements (33 CFR 332)',
  soc_controls = 'SOC 2 Type II (USACE Regulatory database — ORM2); GPS/GIS data integrity for delineation boundaries; Wetland data form completeness verification; Mitigation bank credit tracking (RIBITS database); Jurisdictional determination appeal documentation'
WHERE name = 'Wetlands Delineation Specialist';

-- ENV-014: RCRA Hazardous Waste Compliance Manager
UPDATE citizen_catalog SET
  governing_guidelines = 'Resource Conservation and Recovery Act (RCRA) (42 USC 6901-6992k); 40 CFR 260-273 (RCRA Subtitle C — hazardous waste regulations); 40 CFR 262 (generators — LQG, SQG, VSQG); 40 CFR 263 (transporters); 40 CFR 264-265 (treatment, storage, disposal facilities — TSDFs); 40 CFR 268 (land disposal restrictions — LDR); 40 CFR 279 (used oil management); Hazardous and Solid Waste Amendments of 1984 (HSWA); Cal. Health & Safety Code 25100-25250 (Hazardous Waste Control Law); 22 CCR 66260-66270 (California hazardous waste regulations)',
  standards_of_creation = 'EPA RCRA Orientation Manual (EPA530-F-11-003); EPA Hazardous Waste Manifest System (EPA Form 8700-22); e-Manifest system (EPA RCRAInfo); USDOT Hazardous Materials Regulations (49 CFR 171-180); RCRA Training Module guidance documents; DTSC Standardized Permit Application forms; Hazardous waste characterization procedures (40 CFR 261 — listed and characteristic)',
  soc_controls = 'SOC 2 Type II (RCRAInfo database and e-Manifest system); EPA e-Manifest tracking and verification; Biennial Report (40 CFR 262.41) completeness checks; Manifest exception report tracking (40 CFR 262.42); TSDF operating record and closure/post-closure documentation; Land disposal restriction notification and certification tracking'
WHERE name = 'RCRA Hazardous Waste Compliance Manager';

-- ENV-015: Underground Storage Tank (UST) Compliance Officer
UPDATE citizen_catalog SET
  governing_guidelines = 'RCRA Subtitle I (42 USC 6991-6991m); 40 CFR 280 (Technical Standards for USTs); 40 CFR 280 Subpart D (release detection); 40 CFR 280 Subpart F (release response and corrective action); 40 CFR 280 Subpart G (closure); 40 CFR 280 Subpart H (financial responsibility); Energy Policy Act of 2005 (delivery prohibition, secondary containment); Cal. Health & Safety Code 25280-25299.8 (UST regulations); 23 CCR 2610-2727 (California UST regulations)',
  standards_of_creation = 'EPA UST Technical Compendium; Petroleum Equipment Institute (PEI) Recommended Practices (RP100, RP200, RP300, RP900, RP1200); NFPA 30 (Flammable and Combustible Liquids Code); NFPA 30A (Code for Motor Fuel Dispensing); API 1631 (Interior Lining and Periodic Inspection of USTs); STI (Steel Tank Institute) SP001 (inspection of underground tanks); State-specific UST installer/remover certification requirements',
  soc_controls = 'SOC 2 Type II (UST inventory and release tracking databases); Automatic tank gauging (ATG) data integrity and alarm verification; Release detection method compliance monitoring; Financial assurance mechanism verification (insurance, state fund, letter of credit); Closure notification and site assessment documentation'
WHERE name = 'Underground Storage Tank (UST) Compliance Officer';

-- ENV-016: Toxic Release Inventory (TRI) Reporting Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'Emergency Planning and Community Right-to-Know Act (EPCRA) (42 USC 11001-11050); EPCRA Section 313 (TRI reporting) (42 USC 11023); 40 CFR 372 (TRI reporting requirements); EPCRA Section 311-312 (MSDS/SDS and Tier I/II reporting); 40 CFR 370 (Hazardous Chemical Reporting); EPCRA Section 304 (emergency release notification); Pollution Prevention Act of 1990 (42 USC 13101-13109); Cal. Health & Safety Code 25500-25545 (California Accidental Release Prevention — CalARP)',
  standards_of_creation = 'EPA TRI Reporting Forms and Instructions (EPA Form R, Form A); EPA TRI-MEweb electronic reporting system; EPA Toxics Release Inventory Guidance Documents; OSHA Hazard Communication Standard (29 CFR 1910.1200) — GHS SDS format; NAICS code determination for reporting thresholds; EPA de minimis concentration exemptions; Source reduction and recycling activity reporting protocols',
  soc_controls = 'SOC 2 Type II (TRI-MEweb electronic submission system); Central Data Exchange (CDX) authentication and submission verification; Chemical threshold calculation documentation; Trade secret substantiation (40 CFR 350); Annual reporting deadline compliance tracking (July 1)'
WHERE name = 'Toxic Release Inventory (TRI) Reporting Specialist';

-- ENV-017: Asbestos / Lead Abatement Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'Toxic Substances Control Act (TSCA) Title II (Asbestos Hazard Emergency Response Act — AHERA) (15 USC 2641-2656); 40 CFR 763 Subpart E (AHERA — school buildings); CAA Section 112 / NESHAP (40 CFR 61 Subpart M — asbestos demolition/renovation); OSHA Asbestos Standards (29 CFR 1926.1101 construction; 29 CFR 1910.1001 general industry); TSCA Title IV (Lead Exposure Reduction) (15 USC 2681-2692); 40 CFR 745 (Lead-Based Paint — RRP Rule, abatement); HUD Lead Safe Housing Rule (24 CFR 35); Cal. Health & Safety Code 17920.10 (lead hazard disclosure); Cal. Lab. Code 6501.5-6510 (asbestos-related work)',
  standards_of_creation = 'EPA MAP (Model Accreditation Plan) for asbestos (40 CFR 763.90); NIOSH 7400/7402 (asbestos fiber counting methods — PCM/TEM); EPA SW-846 Method 6010/6020 (lead analysis); HUD Guidelines for Evaluation and Control of Lead-Based Paint Hazards; ASTM E2356 (Comprehensive Building Asbestos Survey); ASTM E1605 (Lead in Paint — XRF); State contractor licensing (C-22 Asbestos, C-2 Lead in California)',
  soc_controls = 'SOC 2 Type II (abatement notification and tracking systems); Worker medical surveillance records (29 CFR 1926.1101(m)); Air monitoring data validation (PCM/TEM analysis); Waste shipment record tracking (NESHAP); Clearance testing and re-occupancy certification; Training certification and accreditation verification'
WHERE name = 'Asbestos / Lead Abatement Specialist';

-- ENV-018: Endangered Species Act (ESA) Biologist / Section 7 Consultant
UPDATE citizen_catalog SET
  governing_guidelines = 'Endangered Species Act (ESA) (16 USC 1531-1544); ESA Section 7 (interagency consultation) (16 USC 1536); ESA Section 9 (take prohibition) (16 USC 1538); ESA Section 10 (incidental take permits / HCPs) (16 USC 1539); 50 CFR 402 (interagency cooperation regulations); 50 CFR 17 (endangered and threatened wildlife and plants); 50 CFR 424 (listing, delisting, reclassification); Cal. Endangered Species Act (CESA) (Cal. Fish & Game Code 2050-2098); Cal. Fish & Game Code 3503-3503.5 (nesting bird protections); Migratory Bird Treaty Act (16 USC 703-712); Bald and Golden Eagle Protection Act (16 USC 668-668d)',
  standards_of_creation = 'USFWS Section 7 Consultation Handbook (1998, updated); USFWS Biological Assessment preparation guidelines; USFWS Habitat Conservation Plan Handbook; NMFS ESA Section 7 Consultation Biological Opinion format; CDFW CESA Incidental Take Permit application guidelines; CDFW California Natural Diversity Database (CNDDB) protocols; Wildlife Society Certified Wildlife Biologist standards; Protocol survey guidelines (species-specific — e.g., California red-legged frog, California gnatcatcher)',
  soc_controls = 'SOC 2 Type II (USFWS ECOS — Environmental Conservation Online System); Biological opinion tracking and compliance monitoring; Incidental take statement terms and conditions tracking; HCP implementation monitoring and reporting; Critical habitat designation mapping integrity'
WHERE name = 'Endangered Species Act (ESA) Biologist / Section 7 Consultant';

-- ENV-019: Environmental Insurance Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'CERCLA liability provisions (42 USC 9607) — insurance coverage disputes; CGL policy pollution exclusion case law; Cal. Insurance Code 790.03 (unfair claims practices); Cal. Civil Code 3294 (punitive damages in bad faith); EPA Financial Assurance requirements (40 CFR 264.147, 265.147 — RCRA; 40 CFR 280 Subpart H — UST); State environmental cleanup fund eligibility requirements; Brownfield liability protections (CERCLA 107, state equivalents); Nuclear Regulatory Commission financial assurance (10 CFR 50.75)',
  standards_of_creation = 'ISO (Insurance Services Office) Commercial General Liability forms — pollution exclusion; Pollution Legal Liability (PLL) policy forms; Contractors Pollution Liability (CPL) policy forms; Site-specific environmental insurance underwriting standards; Environmental site assessment reliance letters; Loss reserve estimation for long-tail environmental claims; CPCU/ASLI Environmental Insurance curriculum',
  soc_controls = 'SOC 2 Type II (insurance underwriting and claims systems); Policy issuance and endorsement tracking; Claims documentation and reserve adequacy review; Reinsurance treaty compliance verification; Premium audit and exposure verification'
WHERE name = 'Environmental Insurance Specialist';

-- ENV-020: Brownfield Redevelopment Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'Small Business Liability Relief and Brownfields Revitalization Act (Pub. L. 107-118); CERCLA 104(k) (Brownfields grants); EPA Brownfields Assessment, Revolving Loan Fund, and Cleanup Grants; State Voluntary Cleanup Programs (VCP) (e.g., Cal. H&SC 25395.90-25395.127); RCRA Brownfield Prevention Initiative; HUD Community Development Block Grant (CDBG) environmental review (24 CFR 58); Tax incentive provisions (former IRC 198 — brownfield expensing); EPA All Appropriate Inquiries (40 CFR 312)',
  standards_of_creation = 'EPA Brownfields Grants Guidelines and Application Requirements; ASTM E1527-21 / E1903-19 (Phase I/II ESA for brownfield characterization); State VCP enrollment and completion procedures; Institutional control documentation standards; Environmental covenant requirements (UECA — Uniform Environmental Covenants Act); EPA Green Remediation Best Management Practices; Community involvement plan development requirements',
  soc_controls = 'SOC 2 Type II (EPA Brownfields grants management systems — ACRES); Assessment, Cleanup, and Redevelopment Exchange System (ACRES) data integrity; VCP completion letter/No Further Action (NFA) letter tracking; Institutional control monitoring and enforcement; Grant expenditure and reporting compliance'
WHERE name = 'Brownfield Redevelopment Specialist';

-- ENV-021: Proposition 65 Compliance Specialist (California)
UPDATE citizen_catalog SET
  governing_guidelines = 'Safe Drinking Water and Toxic Enforcement Act of 1986 (Cal. Health & Safety Code 25249.5-25249.14); 27 CCR 25000-28000 (Proposition 65 regulations); 27 CCR 25600-25607.2 (clear and reasonable warnings); 27 CCR 25501 (safe harbor levels — NSRLs and MADLs); OEHHA listed chemicals (updated annually); Cal. Health & Safety Code 25249.7 (enforcement, civil penalties); Private attorney general enforcement provisions; 27 CCR 25903 (burden of proof — business must prove exposure below NSRL/MADL)',
  standards_of_creation = 'OEHHA Proposition 65 Warning Requirements (current Article 6 regulations, effective 2018); OEHHA Safe Harbor Warning content and methods; OEHHA Interpretive Guideline documents; Short-form and long-form warning templates; Product-specific and environmental exposure warning guidance; Internet/catalog/online warning requirements; Exposure assessment methodologies for listed chemicals',
  soc_controls = 'SOC 2 Type II (chemical tracking and warning compliance systems); Listed chemical inventory management; Warning placement and content verification audit trails; 60-day notice of violation tracking (pre-suit requirement); Settlement agreement compliance monitoring'
WHERE name = 'Proposition 65 Compliance Specialist (California)';

-- ENV-022: Groundwater Monitoring Specialist / Hydrogeologist
UPDATE citizen_catalog SET
  governing_guidelines = 'Safe Drinking Water Act (SDWA) (42 USC 300f-300j-27); 40 CFR 141-143 (National Primary/Secondary Drinking Water Regulations); RCRA groundwater monitoring (40 CFR 264.97-264.100); CERCLA groundwater investigation and remediation; Underground Injection Control (UIC) Program (40 CFR 144-148); Cal. Water Code 10720-10737.8 (Sustainable Groundwater Management Act — SGMA); Cal. Water Code 13304 (cleanup and abatement orders — groundwater); 23 CCR 3890-3895 (Well Standards — California)',
  standards_of_creation = 'ASTM D5092 (Design and Installation of Groundwater Monitoring Wells); ASTM D4448 (Sampling Groundwater Monitoring Wells); EPA Low-Flow Ground-Water Sampling Procedures (EPA/540/S-95/504); EPA Statistical Analysis of Groundwater Monitoring Data (EPA/530/R-09/007); USGS National Field Manual for Collection of Water-Quality Data; Professional Geologist (PG) / Certified Hydrogeologist (CHG) licensure requirements; State well construction/destruction standards',
  soc_controls = 'SOC 2 Type II (groundwater data management systems — e.g., GeoTracker in California); GeoTracker/ESI electronic data deliverable (EDD) controls; Laboratory data validation (EPA functional guidelines); Well installation and abandonment documentation; Statistical trend analysis audit trails'
WHERE name = 'Groundwater Monitoring Specialist / Hydrogeologist';

-- TRB-001: Tribal Court Judge / Justice
UPDATE citizen_catalog SET
  governing_guidelines = 'Indian Civil Rights Act (ICRA) (25 USC 1301-1341); Tribal constitutions and law-and-order codes (tribe-specific); ICRA due process and equal protection requirements (25 USC 1302); Violence Against Women Act (VAWA) tribal provisions (25 USC 1304) — special domestic violence criminal jurisdiction; Tribal Law and Order Act of 2010 (TLOA) (25 USC 2801 note); 25 USC 1302(a)(7)(B)-(D) (enhanced sentencing authority under TLOA — up to 3 years); Public Law 280 jurisdictional framework (18 USC 1162; 28 USC 1360); Federal Indian Country criminal jurisdiction (18 USC 1151-1153 — Indian Country Crimes Act, Major Crimes Act); Oliphant v. Suquamish Indian Tribe, 435 U.S. 191 (1978) (criminal jurisdiction limits)',
  standards_of_creation = 'NAICJA Judicial Education Program; National Judicial College tribal court programs; Tribal Court Benchbook programs (tribe-specific); National Center for State Courts tribal court resources; Model Tribal Probate Code (where adopted); Bureau of Indian Affairs Courts of Indian Offenses (CFR Courts) procedural rules (25 CFR 11); NAICJA Ethical Standards for Tribal Court Judges',
  soc_controls = 'SOC 2 Type II (tribal court case management systems — where implemented); Court record integrity and access controls; Full faith and credit recognition documentation (25 USC 1911(d) — ICWA; tribal-state); Judicial recusal and conflict of interest documentation; Sentencing documentation (TLOA enhanced sentencing requirements — law-trained judge, right to counsel, record)'
WHERE name = 'Tribal Court Judge / Justice';

-- TRB-002: Tribal Attorney / General Counsel
UPDATE citizen_catalog SET
  governing_guidelines = 'Indian Self-Determination and Education Assistance Act (ISDEAA) (25 USC 5301-5423); Indian Reorganization Act (IRA) (25 USC 5101-5129); Federal Trust Responsibility doctrine (Seminole Nation v. United States, 316 U.S. 286 (1942)); Tribal sovereign immunity (Michigan v. Bay Mills Indian Community, 572 U.S. 782 (2014)); 25 USC 81 (contracts with Indian tribes — approval requirements); 25 CFR 84 (encumbrances of tribal land); Indian Mineral Leasing Act (25 USC 396a-396g); Indian Long-Term Leasing Act (25 USC 415); Fee-to-trust regulations (25 CFR 151)',
  standards_of_creation = 'ABA Model Rules of Professional Conduct; Federal Bar Association Indian Law Section practice standards; ISDEAA contract/compact negotiation procedures; BIA Manual and Indian Affairs Manual (IAM) — land, probate, enrollment; Tribal General Counsel engagement letter standards; Federal Indian law practitioner guides (Cohen''s Handbook of Federal Indian Law)',
  soc_controls = 'Attorney-client privilege for tribal government; Tribal government document classification and access controls; Federal court filing systems (CM/ECF) for federal Indian law cases; Treaty and compact document preservation; Conflict of interest screening (tribal council, gaming entities, business enterprises)'
WHERE name = 'Tribal Attorney / General Counsel';

-- TRB-003: Tribal Legislative Analyst / Code Drafter
UPDATE citizen_catalog SET
  governing_guidelines = 'Tribal constitution (each tribe''s foundational document); IRA Section 16 (25 USC 5123) — constitutional organization; Tribal legislative procedures (tribe-specific bylaws and rules); Federal preemption analysis (tribal vs. state vs. federal authority); NCAI resolutions and policy positions; Model tribal codes (published by NCAI, Tribal Law & Policy Institute, NARF)',
  standards_of_creation = 'Tribal Law & Policy Institute model code resources; Native American Rights Fund (NARF) code drafting guides; NCAI model tribal ordinance templates; Bureau of Indian Affairs review procedures for constitutional amendments; Tribal codification systems (Title/Chapter/Section); Public comment and tribal member consultation requirements',
  soc_controls = 'Tribal code repository version control; Legislative history documentation; Tribal council meeting minutes and voting record integrity; Constitutional amendment ratification tracking (BIA Secretarial election procedures — 25 CFR 81); Enrolled member notification and access systems'
WHERE name = 'Tribal Legislative Analyst / Code Drafter';

-- TRB-004: Tribal Enrollment Officer
UPDATE citizen_catalog SET
  governing_guidelines = 'Tribal constitutions (enrollment criteria — blood quantum, lineal descent, residency); Santa Clara Pueblo v. Martinez, 436 U.S. 49 (1978) — tribal sovereignty over enrollment; 25 CFR 61-63 (BIA enrollment regulations for federal recognition); Indian Reorganization Act membership provisions; ICRA due process in disenrollment proceedings (25 USC 1302); Carcieri v. Salazar, 555 U.S. 379 (2009) — "under federal jurisdiction" in 1934',
  standards_of_creation = 'BIA Certificate of Degree of Indian Blood (CDIB) procedures; Tribal enrollment application forms and documentation requirements; Genealogical research standards (base rolls, Dawes Rolls, Baker Roll, etc.); DNA testing policies (where adopted); HIPAA compliance for health-related enrollment records; Privacy protections for enrollment records',
  soc_controls = 'SOC 2 Type II (tribal enrollment databases); Identity verification and document authentication; Base roll cross-referencing and genealogical record integrity; Enrollment appeal and due process documentation; Privacy and access controls for enrollment records'
WHERE name = 'Tribal Enrollment Officer';

-- TRB-005: ICWA Specialist / Indian Child Welfare Attorney
UPDATE citizen_catalog SET
  governing_guidelines = 'Indian Child Welfare Act (ICWA) (25 USC 1901-1963); BIA ICWA Regulations (25 CFR 23, effective 2016); 25 USC 1911 (tribal jurisdiction over child custody proceedings); 25 USC 1912 (active efforts, qualified expert witness, beyond reasonable doubt standards); 25 USC 1913 (voluntary proceedings — consent requirements); 25 USC 1915 (placement preferences); 25 USC 1914-1920 (invalidation of improper actions); Haaland v. Brackeen, 599 U.S. 255 (2023) — ICWA constitutionality upheld; Mississippi Band of Choctaw Indians v. Holyfield, 490 U.S. 30 (1989) — domicile; State ICWA implementation statutes (e.g., Cal. Welfare & Institutions Code 224-224.6)',
  standards_of_creation = 'BIA Guidelines for State Courts and Agencies in Indian Child Custody Proceedings (2016); NICWA practice standards and training curriculum; Qualified Expert Witness (QEW) requirements (25 CFR 23.122); ICWA Notice requirements (25 CFR 23.111) — registered mail, return receipt; Tribal membership/eligibility verification procedures; Active efforts documentation standards (25 CFR 23.2); Placement preference documentation',
  soc_controls = 'SOC 2 Type II (ICWA case tracking systems — tribal and state); ICWA notice delivery and response tracking; Tribal intervention documentation and timeline compliance; Placement preference compliance verification; Transfer of jurisdiction documentation (state to tribal court); Qualified Expert Witness credential verification'
WHERE name = 'ICWA Specialist / Indian Child Welfare Attorney';

-- TRB-006: Indian Health Service (IHS) Compliance Officer
UPDATE citizen_catalog SET
  governing_guidelines = 'Indian Health Care Improvement Act (IHCIA) (25 USC 1601-1683); Snyder Act (25 USC 13) — foundational authorization for Indian health services; ISDEAA Title I contracts / Title V compacts (tribal operation of health programs); Indian Self-Governance Amendments of 2000; 42 CFR 136 (Indian Health); HIPAA Privacy, Security, and Breach Notification Rules (45 CFR 160-164); CMS Conditions of Participation (42 CFR 482-485); 42 CFR 136.61 (IHS eligibility); Affordable Care Act (ACA) Indian-specific provisions (exempt from individual mandate penalty, special enrollment)',
  standards_of_creation = 'IHS Indian Health Manual (IHM); IHS Accreditation standards (Joint Commission, AAAHC, DNV GL); IHS Purchased/Referred Care (PRC) procedures; ISDEAA contract/compact reporting requirements; CMS provider enrollment and certification; Tribal health department credentialing standards; IHS RPMS (Resource and Patient Management System) documentation standards',
  soc_controls = 'SOC 2 Type II (IHS electronic health record systems — RPMS/EHR); HIPAA Security Rule implementation (access controls, audit logs, encryption); CMS provider enrollment system controls; IHS Area Office compliance monitoring; Contract Health Service (CHS) utilization review; Accreditation survey and corrective action tracking'
WHERE name = 'Indian Health Service (IHS) Compliance Officer';

-- TRB-007: Tribal Land Trust Specialist / Realty Officer
UPDATE citizen_catalog SET
  governing_guidelines = 'General Allotment Act of 1887 (Dawes Act) (25 USC 331 et seq., largely repealed); Indian Reorganization Act (25 USC 5108 — prohibition of further allotment; 5109 — land acquisition in trust); Indian Land Consolidation Act (ILCA) (25 USC 2201-2221); American Indian Probate Reform Act (AIPRA) (25 USC 2201 note); 25 CFR 150-179 (trust land administration); 25 CFR 151 (land acquisitions — fee-to-trust); 25 CFR 152 (issuance of patents in fee, certificates of competency); 25 CFR 162 (leasing and permitting); 25 CFR 169 (rights-of-way over Indian lands); Cobell v. Salazar settlement (Individual Indian Money trust accounts)',
  standards_of_creation = 'BIA Indian Affairs Manual (IAM) — Real Estate Services; BIA Land Titles and Records Office (LTRO) procedures; BIA appraisal standards (Office of the Special Trustee appraisal); HEARTH Act of 2012 (25 USC 415(h)) — tribal authority to lease without BIA approval; Title Status Report (TSR) preparation standards; Uniform Standards of Professional Appraisal Practice (USPAP) for trust land; Environmental review for trust acquisitions (25 CFR 151.12(b))',
  soc_controls = 'SOC 2 Type II (Trust Asset and Accounting Management System — TAAMS); TAAMS land title record integrity; BIA LTRO title plant documentation controls; Individual Indian Money (IIM) account statements; Lease compliance and revenue distribution tracking; Fee-to-trust application processing timeline tracking'
WHERE name = 'Tribal Land Trust Specialist / Realty Officer';

-- TRB-008: Tribal Water Rights Attorney / Water Resources Manager
UPDATE citizen_catalog SET
  governing_guidelines = 'Winters v. United States, 207 U.S. 564 (1908) — reserved water rights doctrine; Arizona v. California, 373 U.S. 546 (1963) — practicably irrigable acreage (PIA); McCarran Amendment (43 USC 666) — state court adjudication of federal reserved rights; Reclamation Act (43 USC 371 et seq.); Clean Water Act tribal provisions (33 USC 1377 — treatment as state — TAS); Safe Drinking Water Act tribal provisions (42 USC 300j-11); Indian Water Rights Settlement Acts (tribe-specific — e.g., Navajo, Crow, Blackfeet); 25 CFR 171 (Indian irrigation projects); Executive Order 13175 (Consultation with Indian Tribal Governments)',
  standards_of_creation = 'BIA Water Resources Division protocols; Bureau of Reclamation water rights settlement negotiation procedures; Federal water master reporting standards; Western States Water Council tribal water working group guidelines; Hydrological study and water quantification methodologies; Water rights decree/compact implementation procedures; Federal Reserved Water Rights Settlement Act negotiation frameworks',
  soc_controls = 'SOC 2 Type II (water rights tracking and accounting systems); Water delivery measurement and monitoring data integrity; Settlement fund trust account controls; Water rights mapping and GIS database integrity; Inter-governmental compact compliance monitoring'
WHERE name = 'Tribal Water Rights Attorney / Water Resources Manager';

-- TRB-009: Tribal Environmental Director / NHPA Section 106 Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'National Historic Preservation Act (NHPA) Section 106 (54 USC 306108); 36 CFR 800 (Protection of Historic Properties — Section 106 regulations); 36 CFR 800.2(c)(2) — consultation with Indian tribes; NHPA Section 101(d)(2) (Tribal Historic Preservation Officer authority); National Environmental Policy Act (NEPA) — tribal consultation requirements; Archaeological Resources Protection Act (ARPA) (16 USC 470aa-470mm); 25 CFR 262 (protection of archaeological resources); Executive Order 13007 (Indian Sacred Sites); Executive Order 13175 (tribal consultation and coordination); Clean Water Act Section 518 (treatment as state — TAS) (33 USC 1377); Clean Air Act Section 301(d) (tribal authority); 40 CFR 49 (tribal air quality programs)',
  standards_of_creation = 'ACHP Section 106 guidance documents and program comments; NPS National Register Bulletin series (eligibility, nominations); NPS Tribal Historic Preservation Officer program guidelines; Secretary of the Interior''s Standards for Archaeology and Historic Preservation; EPA Indian Program Policy and Tribal Environmental Plan guidance; THPO annual report requirements (NPS); Archaeological survey and documentation standards (SOI Standards)',
  soc_controls = 'SOC 2 Type II (Section 106 electronic tracking systems — e106); National Register of Historic Places database integrity; Confidentiality protections for site locations (NHPA Section 304); Tribal consultation documentation and government-to-government records; ARPA permit tracking and violation reporting; TCPs (Traditional Cultural Properties) and sacred site protection records'
WHERE name = 'Tribal Environmental Director / NHPA Section 106 Specialist';

-- TRB-010: NAGPRA Compliance Officer
UPDATE citizen_catalog SET
  governing_guidelines = 'Native American Graves Protection and Repatriation Act (NAGPRA) (25 USC 3001-3013); 43 CFR 10 (NAGPRA regulations, substantially revised 2024); 43 CFR 10.5-10.7 (consultation, intentional excavation, inadvertent discovery); 43 CFR 10.8-10.12 (inventories, summaries, repatriation); 43 CFR 10.13 (future applicability — new collections); ARPA (16 USC 470aa-470mm); NHPA Section 106 (intersection with NAGPRA); Smithsonian NMAI Repatriation Policy (separate from NAGPRA but parallel)',
  standards_of_creation = 'NPS NAGPRA Guidance documents and training materials; 43 CFR 10 implementation procedures (2024 Final Rule revisions); Federal Register Notice of Inventory Completion / Notice of Intent to Repatriate; Consultation record-keeping requirements; Cultural affiliation determination methodology; NAGPRA Review Committee procedures; Museum/federal agency NAGPRA compliance plan standards',
  soc_controls = 'SOC 2 Type II (NPS NAGPRA database — National NAGPRA Program online database); Federal Register notice publication tracking; Consultation log integrity and tribal response documentation; Inventory and summary completion tracking (museum-by-museum, agency-by-agency); Disposition and transfer documentation; Cultural items handling and storage condition records'
WHERE name = 'NAGPRA Compliance Officer';

-- TRB-011: Tribal Gaming Commissioner / Regulatory Officer
UPDATE citizen_catalog SET
  governing_guidelines = 'Indian Gaming Regulatory Act (IGRA) (25 USC 2701-2721); NIGC Regulations (25 CFR 501-585); 25 CFR 502 (definitions — Class I, II, III gaming); 25 CFR 522-523 (tribal gaming ordinance approval); 25 CFR 542 (Minimum Internal Control Standards — MICS); 25 CFR 543 (MICS for Class II gaming); 25 CFR 547 (technical standards for Class II gaming systems); 25 CFR 556-558 (background investigations for gaming employees); IGRA Section 11(d) — tribal-state gaming compacts (25 USC 2710(d)); Seminole Tribe v. Florida, 517 U.S. 44 (1996) — 11th Amendment limits on compact negotiation suits',
  standards_of_creation = 'NIGC Bulletin series (compliance guidance); NIGC Technical Standards for Class II systems; Tribal-state gaming compact provisions (state-specific); International Association of Gaming Advisors (IAGA) practice standards; Institute for the Study of Gambling & Commercial Gaming resources; NIGC audit guidelines and examination procedures; Tribal gaming ordinance review checklist',
  soc_controls = 'SOC 2 Type II (tribal gaming system controls); NIGC MICS compliance auditing (25 CFR 542/543); Gaming system technical testing and certification; Revenue reporting and distribution controls; Background investigation and licensing database; Independent audit requirements (25 CFR 571)'
WHERE name = 'Tribal Gaming Commissioner / Regulatory Officer';

-- TRB-012: Tribal Gaming Compact Negotiator
UPDATE citizen_catalog SET
  governing_guidelines = 'IGRA Section 11(d) (25 USC 2710(d)) — Class III gaming compact requirements; IGRA good faith negotiation requirement (25 USC 2710(d)(3)); DOI Secretarial procedures for Class III gaming (25 CFR 291) — when state fails to negotiate; 25 USC 2710(d)(8) — DOI approval/disapproval of compacts; Compact renewal and amendment procedures; Revenue sharing provisions (state-specific compact terms); Scope of gaming provisions and exclusivity agreements; Labor relations provisions in compacts; Seminole Tribe v. Florida and subsequent DOI Secretarial procedures',
  standards_of_creation = 'DOI compact submission and review procedures; Federal Register compact notice requirements; State legislative ratification procedures (where required); Compact drafting best practices (NIGA — National Indian Gaming Association); Revenue sharing calculation methodologies; Dispute resolution provisions (arbitration, mediation); Compact amendment and renewal negotiation protocols',
  soc_controls = 'Compact execution and DOI approval documentation; Revenue sharing calculation audit trails; Federal Register publication verification; Compact term compliance monitoring; Exclusivity payment and verification systems'
WHERE name = 'Tribal Gaming Compact Negotiator';

-- TRB-013: Tribal Gaming Auditor
UPDATE citizen_catalog SET
  governing_guidelines = 'IGRA Section 11(b)(2)(F) (25 USC 2710(b)(2)(F)) — independent audit requirement; 25 CFR 571 (monitoring and investigations); 25 CFR 542.3/543.3 (MICS — accounting controls); 25 CFR 571.12 (audit standards — GAAS, Government Auditing Standards); Compact-specific audit requirements; AICPA audit and accounting guide for casinos; Anti-money laundering requirements (31 CFR 1021 — casinos); FinCEN casino SAR/CTR filing requirements',
  standards_of_creation = 'AICPA Audit and Accounting Guide: Casinos (AU-C sections); Government Auditing Standards (Yellow Book) — where federal funds involved; NIGC Annual Audit Submission requirements; CPA licensure and independence requirements; PCAOB standards (where tribal entity has SEC reporting); AICPA Statement on Auditing Standards (SAS) applicable to gaming; NIGC revenue classification guidance (Class II vs. Class III)',
  soc_controls = 'SOC 1 Type II (gaming system financial controls); SOC 2 Type II (gaming data security and availability); MICS testing and exception reporting; Revenue audit trail integrity; Gaming system access controls and segregation of duties; Cash handling and count room controls verification'
WHERE name = 'Tribal Gaming Auditor';

-- TRB-014: Tribal Tax Administrator
UPDATE citizen_catalog SET
  governing_guidelines = 'Tribal sovereign taxing authority (inherent sovereignty); General welfare exclusion (IRS Notice 2014-7; Tribal General Welfare Exclusion Act of 2014); IRC 7871 (Indian tribal governments treated as states for certain tax purposes); Oklahoma Tax Commission v. Citizen Band Potawatomi Indian Tribe, 498 U.S. 505 (1991) — tax collection on trust land; Washington v. Confederated Tribes of Colville, 447 U.S. 134 (1980) — state taxation of non-Indians; Indian Trader statutes (25 USC 261-264); Tribal tax codes (severance, sales, excise, property — tribe-specific); State-tribal tax agreements',
  standards_of_creation = 'Tribal tax code drafting (NCAI/NARF resources); Tribal-state tax compact negotiation frameworks; IRS tribal consultation guidance; Tribal tax exemption certificate procedures; Revenue allocation plans (gaming revenue — IGRA 25 USC 2710(b)(3)); Tribal government financial reporting (GASB or FASB)',
  soc_controls = 'SOC 2 Type II (tribal tax collection and accounting systems); Tax assessment and collection database integrity; Revenue allocation plan compliance tracking; Per capita distribution documentation; Intergovernmental tax agreement compliance monitoring'
WHERE name = 'Tribal Tax Administrator';

-- TRB-015: TERO Director / Tribal Employment Rights Officer
UPDATE citizen_catalog SET
  governing_guidelines = 'Tribal self-governance authority over employment on tribal lands; Morton v. Mancari, 417 U.S. 535 (1974) — Indian preference not racial discrimination; TERO ordinance (tribe-specific); Indian Self-Determination Act employment provisions; Davis-Bacon Act tribal application (40 USC 3141 et seq.); OSHA jurisdiction on tribal lands; Title VII exemptions for tribal employers (42 USC 2000e(b)); ERISA tribal plan exemptions',
  standards_of_creation = 'CTER model TERO ordinance provisions; TERO compliance plan requirements for contractors on tribal lands; Tribal employment preference documentation; TERO fee schedules and compliance inspection procedures; Contractor workforce composition reporting; Tribal member employment verification; TERO hearing and appeal procedures',
  soc_controls = 'SOC 2 Type II (TERO compliance tracking databases); Contractor registration and compliance documentation; Workforce composition reporting and verification; TERO fee collection and disbursement tracking; Complaint and enforcement action documentation'
WHERE name = 'TERO Director / Tribal Employment Rights Officer';

-- TRB-016: Federal Indian Law Attorney / Sovereignty Litigation Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'U.S. Constitution (Indian Commerce Clause, Art. I, § 8, cl. 3; Treaty Clause, Art. II, § 2); Federal trust responsibility doctrine (Cherokee Nation v. Georgia, 30 U.S. 1 (1831) — "domestic dependent nations"); Tribal sovereign immunity (Michigan v. Bay Mills Indian Community, 572 U.S. 782 (2014)); Federal recognition (25 CFR 83 — Procedures for Federal Acknowledgment); Indian Canons of Construction (favorable interpretation); Worcester v. Georgia, 31 U.S. 515 (1832); Williams v. Lee, 358 U.S. 217 (1959) — infringement test; Montana v. United States, 450 U.S. 544 (1981) — tribal jurisdiction over non-Indians; Exhaustion of tribal remedies (National Farmers Union, 471 U.S. 845 (1985)); McGirt v. Oklahoma, 591 U.S. 894 (2020) — reservation boundaries',
  standards_of_creation = 'Cohen''s Handbook of Federal Indian Law (authoritative treatise); ABA Indian Law Section resources; Federal Bar Association Indian Law Section practice materials; NARF case strategy and litigation resources; Tribal Supreme Court Project amicus brief standards; Federal court briefing standards (FRAP, local rules)',
  soc_controls = 'Federal court CM/ECF filing system access controls; Attorney-client privilege for sovereign clients; Treaty document preservation and authentication; Federal recognition petition documentation integrity; Jurisdictional determination analysis documentation'
WHERE name = 'Federal Indian Law Attorney / Sovereignty Litigation Specialist';

-- CAN-001: Cannabis Licensing Attorney / Regulatory Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'Controlled Substances Act (CSA) (21 USC 801 et seq.) — Schedule I federal status (as of March 2026); Cole Memorandum (rescinded 2018 by Sessions Memo, DOJ enforcement posture evolving); Congressional appropriations riders (Rohrabacher-Blumenauer Amendment — medical marijuana); Cal. Business & Professions Code 26000-26260 (Medicinal and Adult-Use Cannabis Regulation and Safety Act — MAUCRSA); 4 CCR 15000-17999 (California DCC regulations); Cal. Health & Safety Code 11357-11362.9 (decriminalization provisions); Oregon ORS 475C (Oregon Cannabis Regulation); Colorado Constitution Art. XVIII, §§ 14, 16 (medical and recreational); State-specific licensing categories (cultivation, manufacturing, distribution, retail, microbusiness, testing lab)',
  standards_of_creation = 'DCC licensing application requirements (4 CCR 15002-15020); State-specific owner/financial interest holder disclosure requirements; Operating plan requirements (premises diagram, security, track-and-trace); Annual license renewal procedures; License type conversion and modification procedures; Local jurisdiction permit coordination requirements; Cannabis appellations program standards (Cal. B&P Code 26063)',
  soc_controls = 'SOC 2 Type II (licensing management systems); Background check and LiveScan processing; License status verification systems; Financial interest holder disclosure tracking; License condition compliance monitoring; Local-state dual licensing coordination'
WHERE name = 'Cannabis Licensing Attorney / Regulatory Specialist';

-- CAN-002: Cannabis Compliance Officer / Director of Compliance
UPDATE citizen_catalog SET
  governing_guidelines = 'State cannabis regulatory codes (e.g., 4 CCR 15000-17999 California); Track-and-trace requirements (e.g., 4 CCR 15048-15050 — METRC in CA, CO, OR, MI, etc.); Packaging and labeling requirements (e.g., 4 CCR 15400-15413); Advertising restrictions (e.g., 4 CCR 15040-15041); Record-keeping requirements (e.g., 4 CCR 15037); Recall procedures (e.g., 4 CCR 15038); Waste disposal requirements (e.g., 4 CCR 15290-15291); Security requirements (e.g., 4 CCR 15042-15046); Employee qualification and training requirements; OSHA workplace safety (29 CFR 1910 — general industry)',
  standards_of_creation = 'State compliance checklist and self-inspection protocols; METRC/BioTrack/Leaf Data Systems user guides and compliance manuals; NCIA (National Cannabis Industry Association) compliance best practices; Cannabis Regulators Association (CANNRA) model provisions; Standard operating procedure (SOP) documentation requirements; Employee training curricula and certification tracking; Internal audit program development standards',
  soc_controls = 'SOC 2 Type II (cannabis ERP/compliance management systems); Track-and-trace system data integrity and reconciliation; Video surveillance system retention and access controls (typically 90-day retention); Visitor log and access control documentation; Inventory reconciliation and discrepancy reporting; Regulatory inspection response documentation'
WHERE name = 'Cannabis Compliance Officer / Director of Compliance';

-- CAN-003: Cannabis Track-and-Trace Administrator
UPDATE citizen_catalog SET
  governing_guidelines = 'State track-and-trace mandate statutes (e.g., Cal. B&P Code 26067-26068); 4 CCR 15048-15050 (California track-and-trace requirements); METRC system rules and protocols (state-specific implementation); Unique Identifier (UID) tag requirements; Package and transfer manifest requirements; Inventory discrepancy reporting thresholds (e.g., any discrepancy in California); Destruction/waste reporting requirements; Lab sample chain-of-custody in track-and-trace',
  standards_of_creation = 'METRC Industry User Guide and Training Materials; BioTrackTHC Compliance Module documentation; State-specific UID tag ordering and application procedures; Batch/lot creation standards; Transfer manifest generation and verification; Reconciliation procedures and variance investigation; API integration standards for third-party cannabis ERP systems',
  soc_controls = 'SOC 2 Type II (METRC/BioTrack platform security); User access management (role-based access); System availability and uptime requirements; Data integrity — immutable transaction logging; Tag activation and association verification; Transfer manifest delivery confirmation; Discrepancy alert and investigation tracking'
WHERE name = 'Cannabis Track-and-Trace Administrator';

-- CAN-004: Cannabis Testing Laboratory Director
UPDATE citizen_catalog SET
  governing_guidelines = 'State laboratory licensing requirements (e.g., Cal. B&P Code 26100-26106); 4 CCR 15700-15733 (California testing laboratory requirements); Mandatory testing categories: cannabinoid potency, terpenes, residual pesticides, residual solvents, heavy metals, microbial impurities, mycotoxins, moisture content/water activity, foreign material; Action levels and specifications (e.g., 4 CCR 15718-15723); Certificate of Analysis (COA) content requirements (e.g., 4 CCR 15726); Laboratory independence requirements (no financial interest in licensees); Proficiency testing (PT) requirements; Method validation requirements',
  standards_of_creation = 'ISO/IEC 17025:2017 (General Requirements for Competence of Testing and Calibration Laboratories); AOAC International cannabis methods (AOAC SMPR 2017.001, 2017.002, etc.); ASTM D8196 (Standard Practice for Determination of Cannabinoids in Cannabis); ASTM D8230 (Microbial Enumeration in Cannabis); USP Chapter <561>, <621>, <2251> (applicable pharmacopeial methods); State-specific method validation requirements (LOD, LOQ, accuracy, precision, specificity); NELAP/TNI standard (where state requires environmental lab accreditation crossover)',
  soc_controls = 'SOC 2 Type II (LIMS — Laboratory Information Management System); Chain of custody documentation (sample receipt to results reporting); Instrument calibration and maintenance logs; Quality control sample tracking (blanks, duplicates, certified reference materials); COA generation controls (reviewer approval, data integrity); Proficiency testing result tracking; Data integrity and anti-fraud controls (R&D vs. compliance testing separation)'
WHERE name = 'Cannabis Testing Laboratory Director';

-- CAN-005: Cannabis Quality Assurance / Quality Control Manager
UPDATE citizen_catalog SET
  governing_guidelines = 'State manufacturing/processing regulations (e.g., 4 CCR 15200-15290); Good Manufacturing Practice (GMP) requirements (where adopted — e.g., some states require for edibles); Cal. Health & Safety Code 113700 et seq. (California Retail Food Code — for edibles); Product recall procedures (state-mandated); Packaging child resistance requirements (16 CFR 1700 — Poison Prevention Packaging Act analogy; state cannabis regulations); Labeling accuracy requirements (THC/CBD content ± allowable variance); Allergen disclosure requirements (for edibles)',
  standards_of_creation = 'ASTM D8244 (Standard Guide for Cannabis/Hemp Operation Compliance and Quality Management Systems); ASTM D8250 (Standard Practice for Good Manufacturing Practice for Cannabis); cGMP principles (21 CFR 111 — dietary supplements as reference model); HACCP principles (for cannabis-infused products manufacturing); ISO 9001:2015 (Quality Management Systems — framework); SQF (Safe Quality Food) standards (where food-grade processing); Batch production record requirements; Product specification and release criteria',
  soc_controls = 'SOC 2 Type II (quality management system data integrity); Batch record review and release documentation; Non-conformance and corrective action tracking (CAPA); Supplier qualification and raw material testing; Product complaint and adverse event tracking; Recall simulation and readiness documentation; Product retention sample management'
WHERE name = 'Cannabis Quality Assurance / Quality Control Manager';

-- CAN-006: Cannabis Occupational Safety Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'OSH Act (29 USC 651-678); OSHA General Duty Clause (Section 5(a)(1)); 29 CFR 1910.1000 (air contaminants — extraction solvents); 29 CFR 1910.106 (flammable liquids — hydrocarbon extraction); 29 CFR 1910.134 (respiratory protection — trimming, extraction); 29 CFR 1910.146 (permit-required confined spaces); NFPA 1 (Fire Code — extraction laboratory); NFPA 45 (Laboratories Using Chemicals); State fire code requirements for extraction (CO2, hydrocarbon, ethanol); Cal. Lab. Code 6300-6719 (Cal/OSHA); 8 CCR 5155 (airborne contaminant PELs — California); State cannabis-specific safety regulations (e.g., 4 CCR 15025 — premises requirements)',
  standards_of_creation = 'OSHA Cannabis Industry safety guidance; NIOSH guidance on cannabis workplace exposures; NFPA 652 (Combustible Dust) — cannabis grinding/processing; American Society of Safety Professionals (ASSP) cannabis safety resources; Industrial ventilation standards (ACGIH — extraction operations); Ergonomic assessment standards (trimming operations); Emergency action plan (29 CFR 1910.38) and fire prevention plan requirements',
  soc_controls = 'SOC 2 Type II (safety management and incident tracking systems); OSHA 300/300A/301 log maintenance; Workplace exposure monitoring data integrity; PPE assignment and training documentation; Emergency drill and evacuation documentation; Workers'' compensation claims tracking; Safety training completion verification'
WHERE name = 'Cannabis Occupational Safety Specialist';

-- CAN-007: Cannabis Tax Accountant / IRC 280E Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'IRC Section 280E — denial of deductions for trafficking in controlled substances; IRC Section 471 — cost of goods sold (COGS) — the primary tax planning mechanism under 280E; Treasury Regulation 1.471-3 (COGS rules for cannabis); IRS Chief Counsel Advice 201504011 (280E application); Californians Helping to Alleviate Medical Problems (CHAMP) v. Commissioner, 128 T.C. 173 (2007); State cannabis excise tax (e.g., Cal. Rev. & Tax. Code 34011-34021.5); State cultivation tax (where applicable); State sales/use tax on cannabis products; FinCEN BSA requirements for cannabis-related financial activity',
  standards_of_creation = 'AICPA cannabis industry guidance; IRS Form 8300 (cash transactions over $10,000); State cannabis tax return forms and instructions; Cost accounting standards for COGS determination under 280E; GAAP/tax basis accounting differences documentation; Cannabis-specific chart of accounts; Tax position documentation (ASC 740-10 uncertain tax positions)',
  soc_controls = 'SOC 2 Type II (accounting system data integrity); Cash management and documentation controls (heavy cash industry); COGS calculation documentation and audit trail; Tax return preparation and filing verification; State excise tax remittance tracking; IRS examination documentation retention'
WHERE name = 'Cannabis Tax Accountant / IRC 280E Specialist';

-- CAN-008: Cannabis Banking Compliance Officer / BSA Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'FinCEN Guidance FIN-2014-G001 (BSA Expectations for Financial Institutions Serving Marijuana-Related Businesses); Bank Secrecy Act (31 USC 5311 et seq.); 31 CFR 1020.320 (SAR filing requirements — cannabis-specific SAR categories); 31 CFR 1010.310-312 (CTR filing requirements); SAFE Banking Act provisions (status as of March 2026); Money laundering statutes (18 USC 1956, 1957); FinCEN SAR filing categories: "Marijuana Limited," "Marijuana Priority," "Marijuana Termination"; State cannabis banking programs (where established); FDIC guidance on serving cannabis businesses; Cole Memo / current DOJ enforcement posture',
  standards_of_creation = 'FinCEN SAR narrative requirements for marijuana-related businesses; Enhanced due diligence procedures for cannabis accounts; Cannabis business verification procedures (license status, compliance history); Ongoing monitoring program requirements; CTR filing for cash-intensive cannabis operations; Account activity monitoring parameters; Risk assessment methodology for cannabis banking programs',
  soc_controls = 'SOC 2 Type II (banking compliance monitoring systems); SAR/CTR filing verification and timeliness tracking; Cannabis client license verification and renewal monitoring; Transaction monitoring system calibration; Enhanced due diligence documentation; Regulatory examination preparation and response'
WHERE name = 'Cannabis Banking Compliance Officer / BSA Specialist';

-- CAN-009: Cannabis Insurance Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'State insurance regulations (admitted vs. surplus/excess lines); Federal illegality impact on insurance (exclusions, coverage disputes); Product liability for cannabis products (strict liability, negligence); General liability for cannabis operations; Property coverage (federal forfeiture risk); Workers'' compensation (mandatory in all states — cannabis not excluded); Directors & Officers (D&O) coverage for cannabis companies; Crop insurance limitations (federal program excludes cannabis); Cal. Insurance Code (general insurance regulations); State cannabis regulations requiring proof of insurance for licensure',
  standards_of_creation = 'Cannabis-specific insurance policy forms (manuscript policies); Product liability coverage assessment methodology; Property valuation for cannabis inventory (market vs. cost); Loss control inspection standards for cannabis facilities; Claims handling procedures (federal illegality complications); Surplus lines filing requirements; Insurance certificate requirements for cannabis license applications',
  soc_controls = 'SOC 2 Type II (underwriting and claims management systems); Policy issuance and endorsement tracking; Claims documentation and investigation; Coverage verification for licensing agencies; Premium audit procedures for cannabis operations; Loss history documentation and experience modification'
WHERE name = 'Cannabis Insurance Specialist';

-- CAN-010: Cannabis Waste Disposal / Environmental Compliance Manager
UPDATE citizen_catalog SET
  governing_guidelines = 'State cannabis waste disposal requirements (e.g., 4 CCR 15290-15291); RCRA hazardous waste regulations (40 CFR 260-273) — applicable to extraction solvents; State hazardous waste regulations (e.g., 22 CCR 66260-66270 California); Clean Water Act — discharge permits for cannabis cultivation; Cannabis cultivation environmental requirements (water diversion, habitat); Cal. Fish & Game Code 12025-12029 (cannabis environmental violations); Cal. Water Code 13260 (waste discharge requirements); State water board cannabis cultivation policy (e.g., SWRCB Cannabis Cultivation Policy, 2019); CDFW Lake and Streambed Alteration (Cal. Fish & Game Code 1602)',
  standards_of_creation = 'Cannabis waste rendering procedures (mixture ratios — typically 50/50 cannabis/non-cannabis waste); Hazardous waste manifesting procedures for extraction solvents; Wastewater discharge characterization and treatment; Stormwater management for outdoor/mixed-light cultivation; Water rights and diversion documentation; Integrated pest management (IPM) plans; Environmental monitoring and reporting protocols',
  soc_controls = 'SOC 2 Type II (waste tracking and environmental monitoring systems); Waste disposal documentation and manifest tracking; Track-and-trace integration for destroyed/waste cannabis; Water quality monitoring data integrity; Pesticide application record-keeping; Environmental compliance audit documentation'
WHERE name = 'Cannabis Waste Disposal / Environmental Compliance Manager';

-- CAN-011: Cannabis Land Use / Zoning Attorney
UPDATE citizen_catalog SET
  governing_guidelines = 'State cannabis licensing requirement for local authorization (e.g., Cal. B&P Code 26200-26200.2); Local zoning ordinances permitting/prohibiting cannabis (varies by jurisdiction); Conditional Use Permit (CUP) processes; Buffer zone requirements (schools, parks, residential — typically 600-1000 feet); CEQA environmental review for cannabis projects; Americans with Disabilities Act — access requirements; State preemption vs. local control analysis; Cal. Gov. Code 65850.5 (local regulatory authority over cannabis); Measure-specific local taxation and zoning initiatives (ballot measures)',
  standards_of_creation = 'Local planning department application procedures; Environmental review for cannabis permits (CEQA categorical exemptions, MND, EIR); Conditional use permit findings of fact requirements; Odor mitigation plans; Community benefit agreements; Traffic impact studies for dispensaries; Neighborhood compatibility assessments',
  soc_controls = 'SOC 2 Type II (planning department permit tracking systems); Permit application completeness verification; Public notice and hearing documentation; Condition of approval compliance tracking; Building/fire code inspection verification; Annual use permit renewal documentation'
WHERE name = 'Cannabis Land Use / Zoning Attorney';

-- CAN-012: Cannabis Delivery Compliance Manager
UPDATE citizen_catalog SET
  governing_guidelines = 'State delivery regulations (e.g., 4 CCR 15400-15427 California retail delivery); Cal. B&P Code 26090 (delivery authorization); Delivery employee requirements (age, training, identification); Vehicle requirements (unmarked, no cannabis signage, GPS-tracked); Delivery inventory limits (per vehicle/per delivery); Cash handling limits during delivery; Delivery-only retail license provisions; Customer age/identity verification requirements (21+); Local delivery ban compliance (prohibited jurisdictions); Track-and-trace manifest requirements for deliveries',
  standards_of_creation = 'Delivery request receipt documentation; Vehicle inspection and compliance checklists; Delivery manifest preparation and reconciliation; GPS route tracking and documentation; Customer verification procedures and documentation; Cash handling and reconciliation protocols; Delivery employee training curricula; Security protocols for delivery operations',
  soc_controls = 'SOC 2 Type II (delivery management and GPS tracking systems); Real-time GPS tracking data integrity; Delivery manifest — track-and-trace system reconciliation; Age verification documentation; Cash handling and deposit audit trails; Delivery employee background check verification; Vehicle inspection and registration tracking'
WHERE name = 'Cannabis Delivery Compliance Manager';

-- CAN-013: Cannabis Social Equity Program Administrator
UPDATE citizen_catalog SET
  governing_guidelines = 'State social equity statutes (e.g., Cal. B&P Code 26240-26249 — California cannabis equity program); Local equity program ordinances (e.g., Los Angeles Social Equity Program; Oakland Equity Permit Program); Cal. B&P Code 26244 (equity applicant criteria — prior cannabis arrest/conviction, low income, residence in disproportionately impacted area); State equity grant and loan programs; Fee waiver and reduction provisions for equity applicants; Technical assistance program requirements; Workforce development provisions; Resentencing provisions (Cal. Health & Safety Code 11361.8 — Prop 64 retroactive relief)',
  standards_of_creation = 'Equity applicant eligibility verification procedures; Arrest/conviction record verification (DOJ RAP sheet); Income verification (area median income thresholds); Disproportionately impacted area mapping and verification (census tract analysis); Grant/loan application and disbursement procedures; Technical assistance program curriculum and delivery; Program outcome measurement and reporting; Annual equity assessment reporting',
  soc_controls = 'SOC 2 Type II (equity program management systems); Applicant eligibility documentation and verification; Grant fund disbursement and expenditure tracking; Program outcome data integrity; Demographic data collection and privacy protections; Equity license status tracking (from application through operational)'
WHERE name = 'Cannabis Social Equity Program Administrator';

-- CAN-014: Cannabis Advertising / Marketing Compliance Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'State cannabis advertising restrictions (e.g., 4 CCR 15040-15041 California); Age-gating requirements (no advertising where 71.6%+ of audience under 21 — California); Health claims prohibitions; Billboard/outdoor advertising restrictions (e.g., Cal. B&P Code 26151-26155); Digital/social media advertising restrictions; Packaging and labeling advertising (branding on product); State attorney general consumer protection authority; FTC Act Section 5 (unfair or deceptive acts) — federal applicability questions; State-specific advertising pre-approval requirements (where applicable); COPPA implications (Children''s Online Privacy Protection Act — audience composition)',
  standards_of_creation = 'State advertising submission and review procedures; Age-gating verification methodology (Nielsen, Comscore data); Advertising content review checklists; Health claim prohibition guidelines; Packaging design review for advertising content; Digital advertising compliance documentation; Influencer/endorsement disclosure requirements; Billboard distance verification from schools, playgrounds',
  soc_controls = 'SOC 2 Type II (marketing asset management and approval systems); Advertising pre-approval workflow documentation; Published advertisement catalog and compliance review records; Audience composition verification; Social media content review and archival; Complaint tracking and response documentation'
WHERE name = 'Cannabis Advertising / Marketing Compliance Specialist';

-- CAN-015: Cannabis Interstate Commerce Compliance Specialist (Emerging)
UPDATE citizen_catalog SET
  governing_guidelines = 'Oregon HB 4089 (2024) — interstate cannabis commerce framework (contingent on federal change); California SB 1326 (2022) — interstate cannabis commerce agreements (contingent); Dormant Commerce Clause considerations; State compact clause implications (U.S. Const. Art. I, § 10, cl. 3); Federal scheduling status and impact on interstate commerce; USDA organic certification applicability (if/when rescheduled); State-specific import/export provisions (emerging); Transportation across state lines — federal/state conflict; Track-and-trace interoperability between state systems',
  standards_of_creation = 'Interstate compact drafting frameworks; Multi-state track-and-trace integration protocols; Transportation manifest requirements (multi-jurisdictional); Quality standard harmonization between states; Testing reciprocity agreements; Licensing reciprocity documentation; Product standard equivalency assessments',
  soc_controls = 'SOC 2 Type II (multi-state compliance tracking); Cross-jurisdictional license verification; Transportation manifest chain-of-custody; Product testing result portability verification; Regulatory change monitoring across jurisdictions; Interstate transaction audit trails'
WHERE name = 'Cannabis Interstate Commerce Compliance Specialist (Emerging)';

-- GAM-001: Gaming Commission Executive Director / Commissioner
UPDATE citizen_catalog SET
  governing_guidelines = 'State gaming control acts (e.g., NRS 463 — Nevada Gaming Control Act; N.J.S.A. 5:12 — Casino Control Act); IGRA (25 USC 2701-2721) — tribal gaming oversight; Wire Act (18 USC 1084) — interstate wagering (DOJ 2018 OLC opinion re: all forms of gambling); Unlawful Internet Gambling Enforcement Act (UIGEA) (31 USC 5361-5367); Professional and Amateur Sports Protection Act (PASPA) — struck down by Murphy v. NCAA, 584 U.S. 453 (2018); State sports betting acts (post-Murphy — state-specific); Interstate compacts for online gaming (e.g., Multi-State Internet Gaming Agreement — NV, NJ, DE, MI); Travel Act (18 USC 1952); Illegal Gambling Business Act (18 USC 1955)',
  standards_of_creation = 'NASPL (North American State and Provincial Lottery Association) standards; International Association of Gaming Regulators (IAGR) best practices; AGEM (Association of Gaming Equipment Manufacturers) standards; Gaming Regulators European Forum (GREF) standards; State-specific regulatory manual and procedures; Gaming policy and procedure manuals; Regulatory hearing procedures and administrative law',
  soc_controls = 'SOC 2 Type II (gaming regulatory information systems); License application processing and tracking; Regulatory hearing documentation and decision records; Enforcement action tracking and penalty assessment; Inter-jurisdictional information sharing agreements; Regulatory compliance inspection scheduling and documentation'
WHERE name = 'Gaming Commission Executive Director / Commissioner';

-- GAM-002: Gaming License Investigator / Background Investigation Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'State gaming license investigation requirements (e.g., NRS 463.170 — Nevada; N.J.A.C. 19:41 — New Jersey); Multi-jurisdictional Personal History Disclosure Form (MPHD); Key employee and primary management official definitions (25 CFR 556 — tribal); Financial suitability standards (net worth, source of funds); Criminal history disqualification criteria (state-specific); Good character, honesty, and integrity requirements; Business entity and holding company investigation requirements; Vendor/supplier licensing investigation; NIGC background investigation requirements (25 CFR 556-558)',
  standards_of_creation = 'Multi-Jurisdictional Personal History Disclosure Form (MPHD) — standardized across states; State-specific supplemental disclosure forms; Criminal background check procedures (FBI, state repositories); Financial analysis and source of funds documentation; Business entity organizational chart and beneficial ownership analysis; Reference interview protocols; Investigation report writing standards; IACLEA (International Association of Campus Law Enforcement Administrators) investigation principles',
  soc_controls = 'SOC 2 Type II (gaming background investigation databases); Criminal history record information (CHRI) handling per 28 CFR 20; Personal financial information security controls; Investigation file access controls and chain of custody; Multi-jurisdictional information sharing security; Applicant notification and due process documentation'
WHERE name = 'Gaming License Investigator / Background Investigation Specialist';

-- GAM-003: Gaming Compliance Officer / Internal Compliance Director
UPDATE citizen_catalog SET
  governing_guidelines = 'State minimum internal control standards (MICS) (e.g., NRS 463.157; NGC Regulation 6); 25 CFR 542 (NIGC MICS for Class III tribal gaming); 25 CFR 543 (NIGC MICS for Class II tribal gaming); State gaming regulations — reporting requirements; Gaming compact compliance provisions; AML/BSA compliance (31 CFR 1021 — casinos); Responsible gaming requirements (state-specific); Self-exclusion program administration; Title 31 compliance (cash transactions, suspicious activity); State-specific advertising and marketing restrictions',
  standards_of_creation = 'NIGC MICS and Tribal Internal Control Standards (TICS); International Gaming Standards Association (IGSA) standards; American Gaming Association (AGA) compliance best practices; Internal control system documentation requirements; Compliance committee charter and meeting procedures; Regulatory reporting calendars and checklists; Incident reporting and escalation procedures; Compliance training curricula',
  soc_controls = 'SOC 1 Type II (gaming financial controls — cage, count, revenue); SOC 2 Type II (gaming system security and data integrity); MICS testing and exception reporting; Surveillance system integration and review; Table games and slot operations controls; Cash handling — cage, vault, count room controls; Player tracking system data integrity; Regulatory filing verification and timeliness'
WHERE name = 'Gaming Compliance Officer / Internal Compliance Director';

-- GAM-004: Casino Controller / Gaming Financial Officer
UPDATE citizen_catalog SET
  governing_guidelines = 'State gaming financial reporting requirements (e.g., NGC Regulation 6.080 — financial reporting; PGCB financial reporting rules); Gross gaming revenue (GGR) calculation and reporting requirements; Gaming tax calculation and remittance (state-specific rates); SEC reporting requirements (if publicly traded — Regulation S-K, S-X); GAAP for gaming — ASC 924 (Entertainment — Casinos); Promotional allowance and complimentary accounting (ASC 924-605); Progressive jackpot liability (ASC 450-20); Multi-property accounting and allocation; Internal Revenue Code — gaming winnings reporting (W-2G, 1099-MISC)',
  standards_of_creation = 'AICPA Audit and Accounting Guide: Casinos; ASC 924 (Entertainment — Casinos) application guidance; State gaming financial report forms and instructions; GGR calculation methodology documentation; Tax return preparation standards (gaming-specific); Progressive jackpot liability tracking; Promotional allowance documentation; Win/loss statement preparation standards',
  soc_controls = 'SOC 1 Type II (financial reporting controls over gaming revenue); Revenue audit trail — slot meter readings, table game drop/count, card game rake; Progressive jackpot funding and payment controls; Complimentary and promotional tracking; Gaming tax calculation and remittance verification; W-2G issuance and IRS reporting controls; Internal audit of financial controls'
WHERE name = 'Casino Controller / Gaming Financial Officer';

-- GAM-005: Gaming AML / BSA Compliance Officer
UPDATE citizen_catalog SET
  governing_guidelines = 'Bank Secrecy Act (31 USC 5311 et seq.); 31 CFR 1021 (Rules for Casinos and Card Clubs); 31 CFR 1021.310 (CTR filing — casinos); 31 CFR 1021.320 (SAR filing — casinos); 31 CFR 1021.210 (AML program requirements for casinos); 31 CFR 1021.410 (recordkeeping for casino transactions); FinCEN Guidance FIN-2007-G003 (casino suspicious activity reporting); Anti-Money Laundering Act of 2020 (AMLA) updates; FATF Recommendations specific to casinos and gambling (Rec. 22, 23); State gaming commission AML regulations (supplemental to federal)',
  standards_of_creation = 'FinCEN SAR Filing Instructions (FinCEN Form 111) — casino-specific narratives; FinCEN CTR Filing Instructions (FinCEN Form 112) — casino transactions; IRS Casino AML/BSA Examination Procedures; AGA Best Practices for AML Compliance; Multiple Transaction Log (MTL) documentation standards; Casino patron identification and verification procedures; Risk-based AML program documentation; Suspicious activity identification training curricula',
  soc_controls = 'SOC 2 Type II (AML monitoring systems — casino); Currency Transaction Report (CTR) aggregation and filing systems; Suspicious Activity Report (SAR) investigation and filing workflow; Multiple Transaction Log (MTL) accuracy and completeness; Player rating system integration with AML monitoring; Cage transaction recording and reporting; Junket and marker activity monitoring; Third-party AML system validation'
WHERE name = 'Gaming AML / BSA Compliance Officer';

-- GAM-006: Gaming Internal Auditor
UPDATE citizen_catalog SET
  governing_guidelines = 'State gaming regulations requiring internal audit function (e.g., NGC Reg. 6.090; 25 CFR 542.3(f)); 25 CFR 542.22 (internal audit standards for Class III tribal gaming); 25 CFR 543.23 (internal audit for Class II gaming); IIA International Standards for the Professional Practice of Internal Auditing; Sarbanes-Oxley Act Section 404 (if publicly traded); COSO Internal Control — Integrated Framework; State MICS testing requirements (quarterly/annual)',
  standards_of_creation = 'IIA Standards (International Professional Practices Framework — IPPF); COSO Framework application to gaming; State gaming commission internal audit requirements and testing schedules; MICS compliance testing procedures (each control standard); Audit work paper documentation standards; Finding classification (material, significant, minor); Corrective action plan tracking; Audit committee reporting format',
  soc_controls = 'SOC 1 Type II (gaming financial control testing); SOC 2 Type II (gaming system security testing); MICS exception identification and tracking; Audit trail independence and integrity; Audit finding remediation verification; Continuous auditing/monitoring system controls; Fraud detection analytics'
WHERE name = 'Gaming Internal Auditor';

-- GAM-007: Gaming Equipment Testing Laboratory Director
UPDATE citizen_catalog SET
  governing_guidelines = 'State gaming equipment certification requirements (e.g., NGC Technical Standards; NJ DGE Technical Standards); 25 CFR 547 (NIGC Technical Standards for Class II Gaming Systems and Equipment); IGSA Gaming Device Standards; GLI (Gaming Laboratories International) Standards (GLI-11, GLI-12, GLI-13, GLI-19, GLI-20, GLI-21, GLI-33); BMM Testlabs standards; Multi-jurisdictional certification processes; RNG (Random Number Generator) testing requirements; Return to Player (RTP) verification; iGaming/remote gaming server certification',
  standards_of_creation = 'GLI-11 (Gaming Devices in Casinos); GLI-12 (Progressive Gaming Devices); GLI-13 (Server-Based Gaming); GLI-19 (Interactive Gaming Systems); GLI-20 (Kiosk-Based Gaming Systems); GLI-21 (Client-Server Systems); GLI-33 (Event Wagering Systems); ISO/IEC 17025 (laboratory accreditation for gaming test labs); ISCE (International Standard for Classification of Equipment); RNG testing methodologies (NIST Statistical Test Suite, Diehard tests)',
  soc_controls = 'SOC 2 Type II (gaming test laboratory systems); ISO/IEC 17025 laboratory accreditation maintenance; Test equipment calibration and maintenance; Software hash verification and source code review controls; RNG certification documentation; Multi-jurisdictional test report distribution and tracking; Configuration management for approved software versions'
WHERE name = 'Gaming Equipment Testing Laboratory Director';

-- GAM-008: Slot Operations Director / Electronic Gaming Manager
UPDATE citizen_catalog SET
  governing_guidelines = 'State slot machine regulations (e.g., NGC Reg. 14 — slot machines; NGC Technical Standards); IGRA Class II/III gaming classification for electronic gaming; State minimum/maximum payout percentages (e.g., Nevada NRS 463.170(5) — 75% minimum); EPROM/firmware verification requirements; Progressive jackpot regulations; Server-based gaming regulations; Multi-station gaming device regulations; 25 CFR 547 (Class II gaming system technical standards); Cashless gaming/ticket-in ticket-out (TITO) regulations; Responsible gaming feature requirements (session time, loss limits)',
  standards_of_creation = 'GLI-11 compliance documentation; Slot floor configuration and game placement documentation; PAR (Probability and Accounting Report) sheet management; Meter reading and verification procedures; Progressive jackpot funding and contribution calculations; Machine conversion and game change documentation; TITO system reconciliation procedures; Slot performance analysis and reporting',
  soc_controls = 'SOC 1 Type II (slot revenue controls); SOC 2 Type II (gaming system access controls); EPROM/firmware verification and chain of custody; Slot accounting system data integrity; Meter variance investigation and documentation; Progressive controller monitoring; Machine access log controls (logic door, main door); Server-based gaming system security'
WHERE name = 'Slot Operations Director / Electronic Gaming Manager';

-- GAM-009: iGaming / Online Gaming Compliance Director
UPDATE citizen_catalog SET
  governing_guidelines = 'State iGaming/online gambling statutes (e.g., NJ Casino Control Act — internet gaming provisions; PA Gaming Act — interactive gaming); UIGEA (31 USC 5361-5367) — payment processing for unlawful internet gambling; Wire Act (18 USC 1084) — interstate wire communications for wagering; State geolocation requirements (physical presence within state borders); Player identity verification requirements (KYC — Know Your Customer); Multi-state internet gaming agreements; Responsible gaming — deposit limits, self-exclusion, cooling-off periods; Player fund segregation requirements (e.g., NJ DGE patron fund segregation); Data privacy — state privacy laws applicable to player data; Age verification (21+ for casino, 18+ for lottery in some states)',
  standards_of_creation = 'GLI-19 (Interactive Gaming Systems); GLI-33 (Event Wagering Systems) — online sports betting; State-specific iGaming technical standards; Geolocation compliance documentation (GeoComply, Locaid standards); KYC/identity verification procedures and documentation; Responsible gaming program design standards; Player fund protection documentation; Cybersecurity standards for gaming platforms (state-specific requirements)',
  soc_controls = 'SOC 2 Type II (iGaming platform security, availability, processing integrity); Geolocation system accuracy and reliability verification; Identity verification system audit trails; Player account management controls; Self-exclusion list synchronization across platforms; Payment processing controls (deposits, withdrawals, chargebacks); Platform availability and incident response; Data encryption — at rest and in transit'
WHERE name = 'iGaming / Online Gaming Compliance Director';

-- GAM-010: Sports Betting Compliance Manager / Sportsbook Director
UPDATE citizen_catalog SET
  governing_guidelines = 'State sports betting statutes (post-Murphy v. NCAA) — state-specific (e.g., NJ N.J.S.A. 5:12A; NY Racing, Pari-Mutuel Wagering and Breeding Law Article 14; CO CRS 44-30); UIGEA (payment processing); Wire Act (18 USC 1084) — interstate communications; State-specific betting type restrictions (in-play, prop bets, college); Integrity monitoring and suspicious wagering reporting; Geolocation requirements (in-state wagering); Advertising restrictions for sports betting; Responsible gaming provisions specific to sports betting; Professional sports league integrity agreements; Data rights/official league data requirements (state-specific)',
  standards_of_creation = 'GLI-33 (Event Wagering Systems); State sports wagering technical standards; Betting market integrity protocols; Odds monitoring and suspicious wagering alert procedures; Event result verification and grading procedures; Voided bet and cancelled event procedures; Patron dispute resolution protocols; Marketing and promotional offering compliance',
  soc_controls = 'SOC 2 Type II (sports betting platform security and integrity); Real-time odds monitoring and manipulation detection; Suspicious wagering activity reporting systems; Results verification and automated settlement controls; Geolocation verification for each wager; Prohibited bettor screening (athletes, insiders, underage); Promotional offer audit trails and liability tracking; In-play betting latency and data integrity controls'
WHERE name = 'Sports Betting Compliance Manager / Sportsbook Director';

-- GAM-011: Responsible Gaming Program Director
UPDATE citizen_catalog SET
  governing_guidelines = 'State responsible gaming requirements (varies by jurisdiction — mandatory in most); AGA Code of Conduct for Responsible Gaming; NCPG Internet Responsible Gambling Standards; State self-exclusion program statutes and regulations; Voluntary exclusion program administration; Employee training requirements for problem gambling identification; Advertising restrictions related to problem gambling; Player protection tools — deposit limits, time limits, reality checks; State problem gambling funding mechanisms (typically % of gaming revenue)',
  standards_of_creation = 'RG Check Responsible Gambling Accreditation Standards (RG Check for Land-Based; RG Check for iGaming); AGA Responsible Gaming best practices; NCPG National Survey on Gambling methodology; NCRG (now ICRG) research-based responsible gaming practices; Problem Gambling Severity Index (PGSI) application; Self-exclusion program administration standards; Training curricula for gaming employees (identification of problem gambling indicators); Patron interaction protocols',
  soc_controls = 'SOC 2 Type II (self-exclusion database management); Self-exclusion list maintenance and cross-property synchronization; Self-exclusion violation detection and response; Player tracking system integration with responsible gaming tools; Deposit/loss limit system enforcement; Problem gambling referral and follow-up documentation; Annual responsible gaming program review and reporting'
WHERE name = 'Responsible Gaming Program Director';

-- GAM-012: Patron Dispute / Gaming Dispute Resolution Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'State patron dispute resolution procedures (e.g., NGC Reg. 7.050 — patron disputes; NJ DGE patron complaint procedures); Tribal gaming compact dispute provisions; State gaming commission investigative authority over patron complaints; Contractual terms and conditions for player participation (house rules); Electronic gaming device malfunction void rules ("Malfunction Voids All Pays"); Sports betting dispute procedures (grading disputes, voided wagers); Online gaming dispute procedures (technical issues, account disputes); State consumer protection statutes applicable to gaming',
  standards_of_creation = 'State gaming commission complaint submission forms and procedures; Internal patron dispute resolution SOPs; Surveillance review procedures for dispute investigation; Table game dispute reconstruction methodology; Electronic gaming device malfunction investigation procedures; Sports bet grading and settlement dispute resolution; Patron communication and documentation standards; Escalation procedures (internal → regulatory)',
  soc_controls = 'SOC 2 Type II (patron complaint tracking systems); Complaint receipt, investigation, and resolution tracking; Surveillance footage preservation for disputed events; Investigation file documentation and chain of custody; Response timeline compliance monitoring; Regulatory referral documentation; Pattern analysis for systemic issues'
WHERE name = 'Patron Dispute / Gaming Dispute Resolution Specialist';

-- GAM-013: Gaming Advertising Compliance Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'State gaming advertising regulations (e.g., NJ DGE advertising regulations; NY Gaming Commission advertising rules); State sports betting advertising restrictions (e.g., NY ban on "first bet free" promotions effective 2024); FTC Act Section 5 (unfair or deceptive advertising); State consumer protection statutes; Truth in advertising requirements; Responsible gaming messaging requirements in advertisements; Prohibited audience targeting (minors, self-excluded persons); Social media and influencer advertising regulations; Affiliate marketing disclosure and compliance; Cross-border advertising restrictions (advertising to non-legal jurisdictions)',
  standards_of_creation = 'AGA Responsible Marketing Code for Sports Wagering; State-specific advertising submission and pre-approval procedures; Advertising content review checklists (responsible gaming disclosures, odds disclosure, terms and conditions); Age-gating and audience composition verification; Influencer disclosure compliance (FTC Endorsement Guides); Promotional offer terms and conditions drafting; Digital advertising compliance documentation; Advertising archive and retention procedures',
  soc_controls = 'SOC 2 Type II (marketing compliance management systems); Advertising pre-approval and submission tracking; Published advertisement catalog and review records; Promotional offer liability tracking; Audience composition analysis documentation; Self-excluded person advertising suppression verification; Regulatory submission and response tracking'
WHERE name = 'Gaming Advertising Compliance Specialist';

-- GAM-014: Lottery Commission Compliance Officer / Lottery Director
UPDATE citizen_catalog SET
  governing_guidelines = 'State lottery acts (e.g., Cal. Gov. Code 8880 — California Lottery Act; NY Tax Law Article 34); MUSL rules and regulations (Powerball, Mega Millions); State lottery commission regulations; Prize payment and claims procedures; Retailer licensing and monitoring; Game integrity requirements; Instant ticket security and printing specifications; Draw game security and independence; iLottery / online lottery regulations (state-specific); Unclaimed prize funds disposition',
  standards_of_creation = 'WLA Security Control Standards; NASPL verification procedures; MUSL game group rules; Lottery security standards (draw procedures, number generation); Instant ticket printing specifications (Scientific Games, IGT standards); Retailer compliance and inspection procedures; Player identification and prize verification for large prizes; Financial control standards for lottery operations',
  soc_controls = 'SOC 1 Type II (lottery revenue and prize payment controls); SOC 2 Type II (lottery system security and integrity); Draw security and independence verification; RNG certification and testing; Instant ticket inventory and distribution tracking; Retailer terminal security and transaction integrity; Prize claim processing and validation; Lottery fund accounting and appropriation compliance'
WHERE name = 'Lottery Commission Compliance Officer / Lottery Director';

-- GAM-015: Gaming Surveillance Director
UPDATE citizen_catalog SET
  governing_guidelines = 'State surveillance regulations (e.g., NGC Reg. 5.160 — surveillance requirements; 25 CFR 542.16/543.16 — MICS surveillance); Camera coverage requirements (table games, count rooms, cage, slot floor, entrances); Recording retention requirements (typically 7-30 days, longer for incidents); Gaming control board access to surveillance recordings; Law enforcement coordination requirements; Employee monitoring and privacy laws; Patron privacy considerations (state-specific); Evidence handling and chain of custody for gaming crimes; Facial recognition and biometric surveillance regulations (emerging)',
  standards_of_creation = 'State-specific surveillance room standards (staffing, equipment, coverage maps); ASIS International gaming security resources; Camera placement and field-of-view documentation; Recording quality standards (resolution, frame rate); Incident documentation and evidence preservation procedures; Surveillance report writing standards; Communication protocols with gaming floor, management, and regulators; Cheating and fraud detection procedures and training',
  soc_controls = 'SOC 2 Type II (surveillance system security and data integrity); Camera system health monitoring and failure notification; Recording retention verification and automated deletion; Access control to surveillance room and recordings; Incident report generation and regulatory notification; Evidence export chain of custody; Surveillance log completeness and review; System redundancy and backup verification'
WHERE name = 'Gaming Surveillance Director';

-- CROSS-001: Tribal-Environmental Intersection — Tribal Environmental Protection Agency Director
UPDATE citizen_catalog SET
  governing_guidelines = 'Clean Water Act Section 518 (33 USC 1377) — Treatment as State (TAS); Clean Air Act Section 301(d) — Tribal Authority; Safe Drinking Water Act tribal provisions; RCRA tribal provisions; CERCLA tribal consultation requirements; NEPA tribal consultation (EO 13175); Tribal Pesticide Program Cooperative Agreements; State-tribal environmental cooperative agreements',
  standards_of_creation = 'EPA Tribal Program guidance documents; EPA Indian Environmental General Assistance Program (IGAP) reporting; Tribal environmental code development resources; EPA TAS determination application procedures',
  soc_controls = 'SOC 2 Type II (tribal environmental data systems); EPA grants management system reporting; Environmental monitoring data quality assurance; Tribal-federal data sharing agreement compliance'
WHERE name = 'Tribal-Environmental Intersection — Tribal Environmental Protection Agency Director';

-- CROSS-002: Tribal-Gaming-AML Intersection — Tribal Casino AML/BSA Compliance Officer
UPDATE citizen_catalog SET
  governing_guidelines = '31 CFR 1021 (BSA rules for casinos) — applies to tribal casinos; IGRA compliance reporting; 25 CFR 542/543 (MICS — AML-related controls); NIGC AML compliance bulletins; Tribal gaming compact AML provisions; FinCEN casino SAR/CTR filing requirements',
  standards_of_creation = 'FinCEN casino compliance guidance; NIGC AML compliance advisory; Tribal gaming commission AML program requirements; IRS casino examination procedures for tribal operations',
  soc_controls = 'SOC 2 Type II (tribal casino AML monitoring systems); CTR/SAR filing systems; Cash transaction monitoring for tribal gaming operations; FinCEN filing verification'
WHERE name = 'Tribal-Gaming-AML Intersection — Tribal Casino AML/BSA Compliance Officer';

-- CROSS-003: Cannabis-Gaming Intersection — Cannabis Consumption Lounge / Casino Compliance Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'Nevada cannabis consumption lounge regulations (NRS 678B); State gaming proximity restrictions; Indoor air quality regulations for consumption; Dual licensing compliance (gaming + cannabis); AML/BSA requirements for cash-intensive dual operations; Employment law — drug testing policies in legalized states vs. gaming employee requirements',
  standards_of_creation = 'Dual-license compliance documentation; Proximity analysis for gaming/cannabis facilities; Air handling and ventilation standards for consumption; Cross-industry employee training',
  soc_controls = 'Dual regulatory reporting and audit trails; Cross-reference compliance monitoring; Cash handling controls for dual operations'
WHERE name = 'Cannabis-Gaming Intersection — Cannabis Consumption Lounge / Casino Compliance Specialist';

-- CROSS-004: Environmental-Cannabis Intersection — Cannabis Cultivation Environmental Compliance Specialist
UPDATE citizen_catalog SET
  governing_guidelines = 'State cannabis cultivation environmental regulations; Cal. Water Code 13149 (cannabis cultivation water policy); CDFW Cal. Fish & Game Code 1602 (streambed alteration); ESA Section 9 take prohibition (coho salmon, steelhead habitat — cannabis cultivation); SWRCB Cannabis Cultivation Policy (2019); County grading and drainage ordinances; State timber harvest rules (for cultivation site clearing)',
  standards_of_creation = 'Cannabis cultivation best management practices (SWRCB); Water diversion and storage documentation; Habitat mitigation plans; Erosion control and stormwater management; Integrated pest management plans',
  soc_controls = 'Water use monitoring and reporting systems; Environmental compliance tracking; CDFW permit compliance documentation; Track-and-trace integration with environmental records'
WHERE name = 'Environmental-Cannabis Intersection — Cannabis Cultivation Environmental Compliance Specialist';

-- Total UPDATE statements: 245

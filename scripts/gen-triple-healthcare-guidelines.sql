-- Healthcare Governing Guidelines backfill
-- These personas have Standards of Creation + SOC Controls but are missing Governing Guidelines

UPDATE citizen_catalog SET governing_guidelines = '42 CFR Part 482 (Hospital CoP — medical staff documentation); State Medical Practice Acts; 42 USC 1395x (Medicare physician services definitions); CMS Conditions of Participation physician authentication requirements' WHERE name = 'Attending Physician (MD/DO)';

UPDATE citizen_catalog SET governing_guidelines = '42 CFR 482.24 (medical record service requirements); 42 CFR 482.12 (governing body — medical staff accountability); CMS Two-Midnight Rule; CMS Conditions of Participation' WHERE name = 'Hospitalist (MD/DO — Hospital Medicine)';

UPDATE citizen_catalog SET governing_guidelines = '42 USC 1395dd (EMTALA); 42 CFR 489.24 (EMTALA implementing regulations); 42 CFR 482.55 (emergency services CoP); state emergency medical treatment statutes' WHERE name = 'Emergency Physician (MD/DO — Emergency Medicine)';

UPDATE citizen_catalog SET governing_guidelines = '42 CFR 482.51 (surgical services CoP); 42 CFR 482.24(c) (operative report requirements); state surgical consent statutes; CMS Conditions of Participation for surgical services' WHERE name = 'Surgeon (MD/DO — any surgical specialty)';

UPDATE citizen_catalog SET governing_guidelines = '42 CFR 482.52 (anesthesia services CoP); CMS anesthesia documentation requirements (pre-evaluation, intraoperative, post-evaluation); state anesthesia practice regulations' WHERE name = 'Anesthesiologist (MD/DO)';

UPDATE citizen_catalog SET governing_guidelines = '42 CFR 482.26 (radiologic services CoP); 21 CFR Part 900 (MQSA); state radiation control statutes; CMS diagnostic imaging documentation requirements' WHERE name = 'Radiologist (MD/DO — Diagnostic or Interventional Radiology)';

UPDATE citizen_catalog SET governing_guidelines = '42 CFR Part 493 (CLIA); 42 CFR 482.27 (laboratory services CoP); state clinical laboratory licensing; federal pathology billing requirements (anti-markup rule)' WHERE name = 'Pathologist (MD/DO — Anatomic and/or Clinical Pathology)';

UPDATE citizen_catalog SET governing_guidelines = '42 CFR Part 2 (Confidentiality of SUD Records); 42 USC 290dd-2; state mental health parity laws; state involuntary commitment statutes (e.g., CA WIC 5150); CMS psychiatric hospital CoP' WHERE name = 'Psychiatrist (MD/DO — Psychiatry)';

UPDATE citizen_catalog SET governing_guidelines = 'State death investigation statutes; state coroner/medical examiner enabling acts; 42 CFR Part 483 (if nursing facility death); CDC/NCHS vital statistics reporting requirements; state mandatory autopsy laws' WHERE name LIKE 'Medical Examiner%';

UPDATE citizen_catalog SET governing_guidelines = '42 CFR 482.23 (nursing services CoP); State Nurse Practice Acts; CMS Conditions of Participation nursing documentation requirements; OSHA Bloodborne Pathogens Standard (29 CFR 1910.1030)' WHERE name = 'Registered Nurse (RN)';

UPDATE citizen_catalog SET governing_guidelines = 'State NP practice acts (independent/collaborative/supervisory); 42 CFR 410.75 (Medicare NP billing); DEA registration requirements (21 CFR 1301); state controlled substance prescribing regulations' WHERE name = 'Nurse Practitioner (NP) / APRN';

UPDATE citizen_catalog SET governing_guidelines = '42 CFR 482.52 (anesthesia services CoP — CRNA requirements); state CRNA practice acts (supervision vs. independent practice); CMS anesthesia supervision requirements; Medicare anesthesia billing rules (42 CFR 414.46)' WHERE name = 'Certified Registered Nurse Anesthetist (CRNA)';

UPDATE citizen_catalog SET governing_guidelines = 'State midwifery practice acts; 42 CFR 405.2468 (Medicare CNM services); state birth center licensure requirements; CMS certified nurse-midwife billing requirements' WHERE name = 'Certified Nurse Midwife (CNM)';

UPDATE citizen_catalog SET governing_guidelines = 'State Nurse Practice Acts (LPN/LVN scope); 42 CFR 483 (LTC nursing services); CMS skilled nursing facility documentation requirements; state medication administration delegation rules' WHERE name LIKE 'Licensed Practical Nurse%';

UPDATE citizen_catalog SET governing_guidelines = 'State EMS Practice Acts; National EMS Scope of Practice Model; 42 CFR 410.40-41 (Medicare ambulance services); HIPAA Privacy Rule applicability to EMS; state patient care report requirements' WHERE name LIKE 'EMT%';

UPDATE citizen_catalog SET governing_guidelines = 'State PA practice acts; 42 CFR 410.74 (Medicare PA services); DEA registration (21 CFR 1301); state supervisory agreement requirements; CMS incident-to billing requirements' WHERE name = 'Physician Assistant (PA-C)';

UPDATE citizen_catalog SET governing_guidelines = '21 CFR Part 900 (MQSA — mammography); 42 CFR 482.26 (radiologic services CoP); state radiologic technologist licensure acts; NRC 10 CFR Part 35 (medical use of byproduct material — nuclear medicine techs)' WHERE name LIKE 'Radiologic Technologist%';

UPDATE citizen_catalog SET governing_guidelines = '42 CFR Part 493 (CLIA); state clinical laboratory personnel requirements; CMS laboratory services documentation requirements; state medical laboratory scientist/technologist licensure' WHERE name LIKE 'Medical Laboratory Scientist%';

UPDATE citizen_catalog SET governing_guidelines = 'State Pharmacy Practice Acts; 21 CFR Parts 1301-1321 (DEA Controlled Substances); 42 CFR 482.25 (hospital pharmacy CoP); USP Chapters 795, 797, 800 (compounding); CMS pharmacy conditions' WHERE name LIKE 'Pharmacist%';

UPDATE citizen_catalog SET governing_guidelines = 'State Physical Therapy Practice Acts; 42 CFR 410.60-61 (Medicare PT services); CMS therapy documentation requirements; Medicare therapy cap/threshold; state direct access laws' WHERE name LIKE 'Physical Therapist%';

UPDATE citizen_catalog SET governing_guidelines = 'State Occupational Therapy Practice Acts; 42 CFR 410.59 (Medicare OT services); CMS OT documentation requirements; state OTA supervision requirements' WHERE name LIKE 'Occupational Therapist%';

UPDATE citizen_catalog SET governing_guidelines = 'State SLP licensure acts; 42 CFR 410.62 (Medicare SLP services); CMS speech-language pathology documentation requirements; IDEA Part B/C (school-based SLP); state telepractice regulations' WHERE name LIKE 'Speech-Language Pathologist%';

UPDATE citizen_catalog SET governing_guidelines = 'State Respiratory Therapy Practice Acts; 42 CFR 410.57 (Medicare respiratory therapy); CMS DME documentation requirements (oxygen, ventilators); state RT licensure requirements' WHERE name LIKE 'Respiratory Therapist%';

UPDATE citizen_catalog SET governing_guidelines = 'State Dental Practice Acts; 42 CFR 441.56 (Medicaid dental EPSDT); OSHA BBP Standard (29 CFR 1910.1030); state dental hygiene supervision requirements; FDA dental device requirements' WHERE name LIKE 'Dentist%';

UPDATE citizen_catalog SET governing_guidelines = 'State Optometry Practice Acts; FTC Eyeglass Rule (16 CFR 456); FTC Contact Lens Rule (16 CFR 315); state therapeutic pharmaceutical agent (TPA) authorization; CMS optometric services coverage' WHERE name LIKE 'Optometrist%';

UPDATE citizen_catalog SET governing_guidelines = 'State Medical Practice Acts; 42 CFR 482.51 (surgical services CoP — ophthalmic surgery); FDA ophthalmic device regulations (21 CFR Part 886); state laser surgery regulations' WHERE name LIKE 'Ophthalmologist%';

UPDATE citizen_catalog SET governing_guidelines = 'State Chiropractic Practice Acts; Medicare chiropractic coverage (42 CFR 410.22); CMS chiropractic documentation requirements (AT modifier); state scope-of-practice limitations' WHERE name LIKE 'Chiropractor%';

UPDATE citizen_catalog SET governing_guidelines = 'State Psychology Licensing Acts; HIPAA Privacy Rule (psychotherapy notes protection); state mandatory reporting requirements (child/elder abuse); state court testimony privilege; Medicare psychology services (42 CFR 410.71)' WHERE name LIKE 'Clinical Psychologist%';

UPDATE citizen_catalog SET governing_guidelines = 'State LCSW licensure acts; HIPAA Privacy Rule; state mandatory reporting requirements; Medicare clinical social work services (42 CFR 410.73); state clinical supervision requirements' WHERE name LIKE 'Licensed Clinical Social Worker%';

UPDATE citizen_catalog SET governing_guidelines = 'State LPC/LMFT licensure acts; HIPAA Privacy Rule; state mandatory reporting requirements; state supervision requirements for provisional licensees; Medicaid behavioral health service documentation' WHERE name LIKE 'LPC / LMFT%';

UPDATE citizen_catalog SET governing_guidelines = '42 CFR Part 2 (SUD records confidentiality); state substance abuse counselor certification acts; SAMHSA regulatory requirements; state mandatory reporting requirements; Medicaid SUD benefit documentation' WHERE name LIKE 'Certified/Licensed Alcohol%';

UPDATE citizen_catalog SET governing_guidelines = 'HIPAA Privacy Rule (45 CFR Part 164 Subpart E); state health information management laws; CMS Conditions of Participation medical record requirements (42 CFR 482.24); state medical record retention statutes' WHERE name LIKE 'HIM Director%';

UPDATE citizen_catalog SET governing_guidelines = 'HIPAA Transaction Code Sets (45 CFR Part 162); CMS ICD-10-CM/PCS Official Guidelines; Medicare Claims Processing Manual; OIG Compliance Program Guidance for hospitals; state coding requirements' WHERE name LIKE 'Medical Coder%';

UPDATE citizen_catalog SET governing_guidelines = 'CMS MS-DRG/APR-DRG system requirements; Medicare Severity adjustment documentation; CMS Conditions of Participation clinical record requirements; OIG physician documentation guidance' WHERE name LIKE 'Clinical Documentation Integrity%';

UPDATE citizen_catalog SET governing_guidelines = 'HITECH Act (42 USC 17901); 45 CFR Part 170 (ONC Health IT Certification); state HIE participation laws; state health data exchange consent requirements' WHERE name LIKE 'HIE Specialist%';

UPDATE citizen_catalog SET governing_guidelines = 'HIPAA Transaction Standards (45 CFR Part 162); CMS Claims Processing Manual; state prompt payment acts; No Surprises Act (P.L. 116-260); state surprise billing laws; Medicare Secondary Payer requirements' WHERE name LIKE 'Medical Billing%';

UPDATE citizen_catalog SET governing_guidelines = 'OIG Compliance Program Guidance; Federal False Claims Act (31 USC 3729); Anti-Kickback Statute (42 USC 1320a-7b); Stark Law (42 USC 1395nn); state healthcare fraud statutes; CMS compliance program requirements' WHERE name LIKE 'Healthcare Compliance Officer%';

UPDATE citizen_catalog SET governing_guidelines = 'Medicare Benefit Policy Manual (CMS Pub. 100-02); state utilization review licensure acts; ERISA (29 USC 1001) for employer-sponsored plans; state external review laws; CMS Condition Code 44 requirements' WHERE name LIKE 'Utilization Review%';

UPDATE citizen_catalog SET governing_guidelines = 'Medicare Advantage requirements (42 CFR Part 422); Medicare Part D (42 CFR Part 423); state HMO/managed care regulations; Mental Health Parity and Addiction Equity Act; ACA essential health benefits' WHERE name LIKE 'Medical Director (Health Plan)%';

UPDATE citizen_catalog SET governing_guidelines = 'HIPAA Privacy Rule (45 CFR Part 164 Subparts A and E); HITECH Act breach notification (45 CFR Part 164 Subpart D); state health privacy laws (where more restrictive); 42 CFR Part 2 (SUD records); GINA (genetic information nondiscrimination)' WHERE name = 'HIPAA Privacy Officer';

UPDATE citizen_catalog SET governing_guidelines = 'HIPAA Security Rule (45 CFR Part 164 Subpart C); HITECH Act (42 USC 17931); CMS EHR Incentive Program security requirements; state health data security breach notification laws; NIST SP 800-66' WHERE name LIKE 'HIPAA Security Officer%';

UPDATE citizen_catalog SET governing_guidelines = 'HITECH Act (42 USC 17901); ONC Health IT Certification (45 CFR Part 170); CMS Promoting Interoperability Program; 21st Century Cures Act information blocking rules (45 CFR Part 171)' WHERE name LIKE 'Health IT Specialist%';

UPDATE citizen_catalog SET governing_guidelines = '42 CFR 482.42 (Infection Prevention CoP); OSHA Bloodborne Pathogens Standard (29 CFR 1910.1030); CMS HAC Reduction Program; state healthcare-associated infection reporting mandates' WHERE name LIKE 'Infection Preventionist%';

UPDATE citizen_catalog SET governing_guidelines = 'Patient Safety and Quality Improvement Act (42 USC 299b-21); state mandatory adverse event reporting laws; TJC Environment of Care/Life Safety standards; CMS QAPI requirements; state patient compensation fund requirements' WHERE name LIKE 'Healthcare Risk Manager%';

UPDATE citizen_catalog SET governing_guidelines = 'CMS Conditions of Participation/Coverage (varies by provider type); state health facility licensure requirements; accrediting organization standards (TJC, AAAHC, HFAP, DNV, CARF); Medicare deemed status requirements' WHERE name = 'Accreditation Coordinator';

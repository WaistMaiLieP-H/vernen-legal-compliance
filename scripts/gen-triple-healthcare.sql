-- Healthcare Triple Constraint Completion
-- Standards of Creation + SOC Controls for all Healthcare personas
-- Each entry: the professional standard that defines HOW documents must be created,
-- and the integrity framework that verifies they were created correctly.

UPDATE citizen_catalog SET
  standards_of_creation = 'AMA Code of Medical Ethics (Opinions 1.2.12, 3.3.1); AMA CPT Documentation Guidelines (E/M standards); TJC RC.01.02.01 (medical record authentication); CMS CoP physician documentation requirements',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); TJC tracer methodology for medical record audit; CMS QAPI program; medical staff peer review under state peer review protection statutes; EHR access audit trails per HIPAA Security Rule'
WHERE name = 'Attending Physician (MD/DO)';

UPDATE citizen_catalog SET
  standards_of_creation = 'SHM Core Competencies in Hospital Medicine; TJC PC.02.01.01 (care planning documentation); CMS Two-Midnight Rule documentation requirements; AMA E/M documentation guidelines',
  soc_controls = 'SOC 2 Type II (Processing Integrity); CMS Utilization Review documentation; TJC tracer audit; discharge summary completion tracking; EHR audit logs; case management concurrent review'
WHERE name = 'Hospitalist (MD/DO — Hospital Medicine)';

UPDATE citizen_catalog SET
  standards_of_creation = 'ACEP Clinical Policies; EMTALA Medical Screening Examination documentation requirements; CMS EMTALA Interpretive Guidelines (State Operations Manual Appendix V); ACS trauma documentation standards',
  soc_controls = 'SOC 2 Type II (Availability, Processing Integrity); EMTALA central log audit; medical screening exam documentation completeness review; transfer certification verification; EHR timestamp integrity for EMTALA compliance windows'
WHERE name = 'Emergency Physician (MD/DO — Emergency Medicine)';

UPDATE citizen_catalog SET
  standards_of_creation = 'ACS Statements on Principles (operative report standards); TJC UP.01.01.01-UP.01.03.01 (Universal Protocol); ASA perioperative documentation standards; state surgical consent requirements',
  soc_controls = 'SOC 2 Type II (Processing Integrity); Universal Protocol compliance auditing (site marking, time-out verification); surgical count documentation; informed consent audit trail; specimen labeling verification; EHR operative report completion tracking'
WHERE name = 'Surgeon (MD/DO — any surgical specialty)';

UPDATE citizen_catalog SET
  standards_of_creation = 'ASA Standards for Basic Anesthetic Monitoring; ASA Practice Guidelines for Pre-Anesthesia Evaluation; TJC PC.03.01.01 (anesthesia care planning); Anesthesia Patient Safety Foundation guidelines',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Availability); anesthesia record completeness audit; pre-anesthesia/post-anesthesia evaluation verification; drug accountability logs; equipment safety checks documentation; AIMS (Anesthesia Information Management System) audit trails'
WHERE name = 'Anesthesiologist (MD/DO)';

UPDATE citizen_catalog SET
  standards_of_creation = 'ACR Practice Parameters and Technical Standards; ACR Appropriateness Criteria; BI-RADS (breast imaging); TJC diagnostic imaging standards; MQSA requirements for mammography',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); MQSA annual facility inspection; ACR accreditation phantom testing; radiologist peer review (RADPEER); critical results communication tracking; PACS audit trails; radiation dose monitoring (DLP/CTDIvol tracking)'
WHERE name = 'Radiologist (MD/DO — Diagnostic or Interventional Radiology)';

UPDATE citizen_catalog SET
  standards_of_creation = 'CAP Laboratory Accreditation Checklists; ASCP Practice Guidelines; NAME Forensic Autopsy Standards; CLSI document standards for laboratory reports',
  soc_controls = 'SOC 2 Type II (Processing Integrity); CAP proficiency testing; CLIA quality control logs; chain of custody documentation; specimen tracking systems; amended report tracking; LIS (Laboratory Information System) audit trails'
WHERE name = 'Pathologist (MD/DO — Anatomic and/or Clinical Pathology)';

UPDATE citizen_catalog SET
  standards_of_creation = 'APA Practice Guidelines; ABPN certification maintenance requirements; TJC behavioral health documentation standards; CMS psychiatric hospital CoP documentation; state involuntary commitment documentation requirements',
  soc_controls = 'SOC 2 Type II (Confidentiality, Processing Integrity); 42 CFR Part 2 consent tracking; involuntary hold documentation audit; seclusion/restraint monitoring and reporting; suicide risk assessment documentation compliance; psychotropic medication consent verification'
WHERE name = 'Psychiatrist (MD/DO — Psychiatry)';

UPDATE citizen_catalog SET
  standards_of_creation = 'NAME Standards for Forensic Autopsy Performance (2016); NAME Accreditation Standards; ABP Forensic Pathology certification; state death investigation statutes; CDC/NCHS cause-of-death certification guidelines',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Security); chain of custody for remains and evidence; autopsy report peer review; death certificate accuracy audit; evidence photography standards; toxicology chain of custody; case file completeness review'
WHERE name LIKE 'Medical Examiner%';

UPDATE citizen_catalog SET
  standards_of_creation = 'ANA Standards of Professional Nursing Practice; ANA Code of Ethics; State Nurse Practice Acts; TJC nursing documentation standards; CMS CoP nursing service requirements (42 CFR 482.23)',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Availability); nursing documentation completeness audits; medication administration record verification (5 Rights); fall risk assessment compliance; skin assessment documentation tracking; EHR nursing flowsheet audit trails'
WHERE name = 'Registered Nurse (RN)';

UPDATE citizen_catalog SET
  standards_of_creation = 'AANP/ANCC certification standards; state NP scope of practice regulations; collaborative practice agreement requirements (state-specific); ANA Scope and Standards of Practice for NPs',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); prescriptive authority audit (DEA/state controlled substance monitoring); collaborative agreement compliance verification; certification maintenance tracking; chart review for independent practice compliance'
WHERE name = 'Nurse Practitioner (NP) / APRN';

UPDATE citizen_catalog SET
  standards_of_creation = 'AANA Standards for Nurse Anesthesia Practice; NBCRNA continued professional certification requirements; Council on Accreditation standards; state supervision/collaboration requirements for CRNAs',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Availability); anesthesia quality metrics tracking; case log verification for recertification; supervision documentation (where required by state); adverse event reporting; controlled substance accountability'
WHERE name = 'Certified Registered Nurse Anesthetist (CRNA)';

UPDATE citizen_catalog SET
  standards_of_creation = 'ACNM Standards for the Practice of Midwifery; AMCB certification requirements; ACME accreditation standards; state midwifery practice acts; AAP/ACOG perinatal care guidelines',
  soc_controls = 'SOC 2 Type II (Processing Integrity); birth outcome tracking and reporting; prenatal visit documentation completeness; collaborative physician consultation documentation; perinatal morbidity/mortality review; newborn screening completion verification'
WHERE name = 'Certified Nurse Midwife (CNM)';

UPDATE citizen_catalog SET
  standards_of_creation = 'State Board of Nursing LPN/LVN scope of practice regulations; NAPNES Standards of Practice; employer-specific competency validation programs; CMS long-term care documentation standards (for SNF-based LVNs)',
  soc_controls = 'SOC 2 Type II (Processing Integrity); medication administration documentation audit; scope-of-practice compliance monitoring; supervised delegation documentation; competency evaluation records; incident reporting compliance'
WHERE name LIKE 'Licensed Practical Nurse%';

UPDATE citizen_catalog SET
  standards_of_creation = 'NREMT certification standards; National EMS Education Standards; state EMS scope of practice regulations; NAEMSP position statements; CAAHEP/CoAEMSP accreditation standards for EMS education',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Availability); patient care report (PCR) completeness audit; protocol compliance review; controlled substance tracking; equipment inspection logs; quality improvement peer review; NEMSIS data submission verification'
WHERE name LIKE 'EMT%';

UPDATE citizen_catalog SET
  standards_of_creation = 'ACHC/TJC/CARF/AOA home health accreditation standards; OASIS-E data collection requirements; CMS Home Health Conditions of Participation; state home health licensure standards',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Availability); OASIS assessment accuracy audit; plan of care timeliness tracking; supervisory visit documentation compliance; aide competency evaluation records; HH-CAHPS survey administration verification'
WHERE name = 'Home Health Agency Compliance Officer';

UPDATE citizen_catalog SET
  standards_of_creation = 'NHPCO Standards of Practice for Hospice Programs; NCP Clinical Practice Guidelines for Quality Palliative Care; CMS Hospice Conditions of Participation; state hospice licensure standards',
  soc_controls = 'SOC 2 Type II (Confidentiality, Processing Integrity); certification/recertification timeliness audit; IDG meeting documentation compliance; bereavement program tracking; hospice election/revocation documentation; CAHPS Hospice Survey administration'
WHERE name = 'Hospice Medical Director';

UPDATE citizen_catalog SET
  standards_of_creation = 'AAAHC Accreditation Handbook for Ambulatory Health Care; TJC Ambulatory Care Standards; CMS ASC Conditions for Coverage; state ASC licensure requirements; AORN Guidelines for Perioperative Practice',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Security); surgical safety checklist compliance audit; infection control surveillance; patient rights documentation verification; quality reporting data validation; transfer agreement currency verification; equipment maintenance documentation'
WHERE name = 'Ambulatory Surgery Center Administrator';

UPDATE citizen_catalog SET
  standards_of_creation = 'NRC Regulatory Guide 8.29 (RSO duties); ANSI N13.1-13.12 (radiation protection standards); HPS (Health Physics Society) professional standards; state radiation control program requirements; AAPM Task Group reports',
  soc_controls = 'SOC 2 Type II (Security, Processing Integrity); personnel dosimetry review and action level tracking; radioactive materials inventory verification; sealed source leak test documentation; NRC inspection readiness; ALARA program documentation; radiation safety committee meeting records'
WHERE name = 'Radiation Safety Officer';

UPDATE citizen_catalog SET
  standards_of_creation = 'SAMHSA TIP (Treatment Improvement Protocol) series; ASAM Criteria for SUD treatment placement; CARF Behavioral Health Standards; TJC Behavioral Health Care Standards; state behavioral health program licensure standards',
  soc_controls = 'SOC 2 Type II (Confidentiality, Processing Integrity); 42 CFR Part 2 consent and disclosure audit; treatment plan review timeliness; crisis intervention documentation; seclusion/restraint data reporting; patient grievance tracking; outcome measurement compliance'
WHERE name = 'Behavioral Health Program Director';

UPDATE citizen_catalog SET
  standards_of_creation = 'ONC Health IT Certification Program standards; Trusted Exchange Framework and Common Agreement (TEFCA); HL7 FHIR implementation standards; state HIE regulations and consent models; CARIN Alliance standards',
  soc_controls = 'SOC 2 Type II (Security, Confidentiality, Privacy); data use agreement compliance monitoring; patient consent management audit; interoperability testing records; breach detection and notification; identity proofing verification; data quality monitoring dashboards'
WHERE name = 'Health Information Exchange Administrator';

UPDATE citizen_catalog SET
  standards_of_creation = 'ATA (American Telemedicine Association) Practice Guidelines; FSMB Model Policy for Appropriate Use of Telemedicine; state telemedicine practice acts; CMS telehealth billing and documentation requirements; DEA telemedicine prescribing requirements',
  soc_controls = 'SOC 2 Type II (Security, Availability, Confidentiality); provider state licensure verification per patient location; informed consent documentation audit; platform security assessment; audio/video recording consent tracking; prescribing compliance monitoring; interstate compact participation verification'
WHERE name = 'Telemedicine Compliance Officer';

UPDATE citizen_catalog SET
  standards_of_creation = 'CAP Laboratory Accreditation Program standards; CLIA certificate and survey requirements; CLSI quality management standards; state clinical laboratory licensure requirements; AABB standards (if blood bank)',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Security); proficiency testing performance review; quality control log verification; personnel competency assessment records; instrument calibration documentation; test validation records; amended report tracking; LIS audit trails'
WHERE name = 'Clinical Laboratory Director';

UPDATE citizen_catalog SET
  standards_of_creation = 'AHRQ Common Formats for patient safety reporting; TJC Sentinel Event Policy; NQF Serious Reportable Events list; state adverse event reporting requirements; IHI safety culture framework',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); Patient Safety Work Product privilege management (Patient Safety Act); root cause analysis completion tracking; safety event classification accuracy; culture of safety survey administration; corrective action implementation verification'
WHERE name = 'Patient Safety Officer';

UPDATE citizen_catalog SET
  standards_of_creation = 'URAC PBM Accreditation standards; NCQA PBM certification; CMS Part D formulary requirements; state PBM transparency law requirements; AMCP Format for Formulary Submissions',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); formulary exception tracking audit; rebate passthrough verification; pharmacy network adequacy monitoring; prior authorization turnaround time compliance; DIR fee transparency documentation; member grievance tracking'
WHERE name = 'Pharmacy Benefit Manager Compliance Officer';

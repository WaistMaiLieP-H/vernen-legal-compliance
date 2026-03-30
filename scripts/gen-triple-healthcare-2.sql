-- Healthcare Triple Constraint Batch 2
-- Remaining 30 healthcare personas: allied health, HIM, compliance, mental health

UPDATE citizen_catalog SET
  standards_of_creation = 'NCCPA certification standards; AAPA Guidelines for Ethical Conduct; state PA practice acts and supervisory agreement requirements; ARC-PA accreditation standards',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); supervisory agreement compliance verification; prescriptive authority audit; DEA registration tracking; scope-of-practice compliance monitoring per state; chart co-signature audit where required'
WHERE name = 'Physician Assistant (PA-C)';

UPDATE citizen_catalog SET
  standards_of_creation = 'ARRT certification and continuing education standards; ACR-AAPM Technical Standards; state radiologic technology licensure requirements; ASRT Practice Standards; FDA mammography personnel requirements (MQSA)',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Security); image quality review programs; radiation dose tracking (DRL compliance); equipment QC documentation; MQSA personnel qualification verification; repeat/reject analysis; PACS audit trails'
WHERE name LIKE 'Radiologic Technologist%';

UPDATE citizen_catalog SET
  standards_of_creation = 'ASCP Board of Certification standards; CLSI document standards; CAP accreditation checklist requirements; state clinical laboratory personnel licensure; AABB standards (blood bank)',
  soc_controls = 'SOC 2 Type II (Processing Integrity); proficiency testing performance tracking; QC Westgard rule compliance; competency assessment documentation (6 elements per CLIA); instrument correlation studies; delta check monitoring; LIS audit trails'
WHERE name LIKE 'Medical Laboratory Scientist%';

UPDATE citizen_catalog SET
  standards_of_creation = 'ACPE accreditation standards; state Board of Pharmacy practice standards; USP Chapters 795, 797, 800 (compounding); ASHP Best Practices; Joint Commission Medication Management standards',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Security); controlled substance inventory reconciliation (DEA compliance); medication error reporting (MERP); USP 797 environmental monitoring; drug utilization review documentation; PDMP query compliance; compounding log verification'
WHERE name LIKE 'Pharmacist%';

UPDATE citizen_catalog SET
  standards_of_creation = 'APTA Guide to Physical Therapist Practice; CAPTE accreditation standards; state PT practice acts; ABPTS specialty certification standards; CMS therapy documentation requirements (8-Minute Rule)',
  soc_controls = 'SOC 2 Type II (Processing Integrity); plan of care certification timeliness; functional outcome measurement documentation (G-codes/FOTO); therapy cap tracking; supervision of PTA documentation; re-evaluation interval compliance'
WHERE name LIKE 'Physical Therapist%';

UPDATE citizen_catalog SET
  standards_of_creation = 'AOTA Standards of Practice for Occupational Therapy; ACOTE accreditation standards; state OT practice acts; NBCOT certification maintenance requirements; CMS OT documentation standards',
  soc_controls = 'SOC 2 Type II (Processing Integrity); treatment plan review compliance; functional outcome documentation; OTA supervision documentation; medical necessity justification audit; therapy utilization monitoring'
WHERE name LIKE 'Occupational Therapist%';

UPDATE citizen_catalog SET
  standards_of_creation = 'ASHA Code of Ethics; ASHA Scope of Practice in Speech-Language Pathology; CAA accreditation standards; state SLP licensure requirements; CMS speech therapy documentation standards',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); treatment plan update compliance; outcome measurement documentation; SLPA supervision documentation; dysphagia evaluation documentation completeness; augmentative communication device justification audit'
WHERE name LIKE 'Speech-Language Pathologist%';

UPDATE citizen_catalog SET
  standards_of_creation = 'AARC Clinical Practice Guidelines; CoARC accreditation standards; NBRC certification and credentialing standards; state RT licensure requirements; CMS ventilator/oxygen documentation standards',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Availability); arterial blood gas QC documentation; ventilator protocol compliance; oxygen therapy documentation; sleep study scoring verification; pulmonary function test calibration records; medication administration records for respiratory drugs'
WHERE name LIKE 'Respiratory Therapist%';

UPDATE citizen_catalog SET
  standards_of_creation = 'ADA Standards for Clinical Practice; CODA accreditation standards; state dental practice acts; OSHA Bloodborne Pathogens compliance; CDC Guidelines for Infection Control in Dental Settings',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Security); radiograph quality and exposure documentation; sterilization monitoring (biological indicator logs); informed consent verification; dental charting completeness; controlled substance log; OSHA exposure incident documentation'
WHERE name LIKE 'Dentist%';

UPDATE citizen_catalog SET
  standards_of_creation = 'AOA Standards of Practice; ASCO accreditation standards; state optometry practice acts; NBEO certification standards; CMS vision care documentation requirements',
  soc_controls = 'SOC 2 Type II (Processing Integrity); instrument calibration records; patient examination documentation completeness; contact lens prescription compliance (FTC Eyeglass Rule/Contact Lens Rule); controlled substance prescribing audit (where TPA authorized); referral documentation for ocular pathology'
WHERE name LIKE 'Optometrist%';

UPDATE citizen_catalog SET
  standards_of_creation = 'AAO Preferred Practice Patterns; ACGME ophthalmology residency standards; state medical board standards; FDA ophthalmic device requirements; OOSS (Ophthalmic Outpatient Surgery Society) guidelines',
  soc_controls = 'SOC 2 Type II (Processing Integrity); surgical consent documentation (IOL selection, bilateral surgery); laser safety documentation; ophthalmic imaging quality review; controlled substance tracking; implant tracking and recall monitoring; post-operative documentation completeness'
WHERE name LIKE 'Ophthalmologist%';

UPDATE citizen_catalog SET
  standards_of_creation = 'CCE (Council on Chiropractic Education) accreditation standards; NBCE certification standards; state chiropractic practice acts; ACA/ICA practice guidelines; evidence-based chiropractic care guidelines',
  soc_controls = 'SOC 2 Type II (Processing Integrity); treatment plan documentation and re-evaluation compliance; X-ray quality and necessity justification; scope-of-practice compliance monitoring; informed consent documentation; utilization review for payer compliance'
WHERE name LIKE 'Chiropractor%';

UPDATE citizen_catalog SET
  standards_of_creation = 'APA Ethical Principles and Code of Conduct; APA Practice Guidelines; EPPP (Examination for Professional Practice in Psychology); state psychology licensure acts; ASPPB (Association of State and Provincial Psychology Boards) guidelines',
  soc_controls = 'SOC 2 Type II (Confidentiality, Processing Integrity); psychotherapy notes segregation compliance (HIPAA); psychological testing security (test material protection); informed consent documentation; mandatory reporting compliance tracking; continuing education verification; supervision documentation for trainees'
WHERE name LIKE 'Clinical Psychologist%';

UPDATE citizen_catalog SET
  standards_of_creation = 'NASW Code of Ethics; ASWB (Association of Social Work Boards) examination standards; state LCSW licensure requirements; CSWE accreditation standards; state clinical supervision requirements',
  soc_controls = 'SOC 2 Type II (Confidentiality, Processing Integrity); clinical supervision hour documentation; mandatory reporting compliance tracking; treatment plan update compliance; client rights notification verification; continuing education tracking; dual relationship documentation'
WHERE name LIKE 'Licensed Clinical Social Worker%';

UPDATE citizen_catalog SET
  standards_of_creation = 'ACA (American Counseling Association) Code of Ethics; AAMFT Code of Ethics; CACREP/COAMFTE accreditation standards; state LPC/LMFT licensure acts; NBCC/AMFTRB certification standards',
  soc_controls = 'SOC 2 Type II (Confidentiality, Processing Integrity); supervision documentation (pre-licensure); informed consent and boundaries documentation; mandatory reporting compliance; continuing education tracking; client termination documentation'
WHERE name LIKE 'LPC / LMFT%';

UPDATE citizen_catalog SET
  standards_of_creation = 'IC&RC (International Certification and Reciprocity Consortium) standards; NAADAC Code of Ethics; state substance abuse counselor certification requirements; SAMHSA TIP series; ASAM Criteria for treatment matching',
  soc_controls = 'SOC 2 Type II (Confidentiality, Processing Integrity); 42 CFR Part 2 consent and disclosure compliance; treatment plan update tracking; group counseling documentation; urine drug screen chain of custody; continuing education verification; clinical supervision documentation'
WHERE name LIKE 'Certified/Licensed Alcohol%';

UPDATE citizen_catalog SET
  standards_of_creation = 'AHIMA Code of Ethics; AHIMA Practice Briefs; TJC IM Standards (Information Management); CMS Conditions of Participation medical record requirements; state health information management regulations',
  soc_controls = 'SOC 2 Type II (Security, Confidentiality, Processing Integrity); medical record completion rate tracking (delinquency monitoring); ROI (Release of Information) authorization verification; record retention compliance; EHR access audit log review; amendment/addendum tracking; record destruction documentation'
WHERE name LIKE 'HIM Director%';

UPDATE citizen_catalog SET
  standards_of_creation = 'AAPC/AHIMA coding certification standards; AMA CPT coding guidelines; CMS ICD-10-CM/PCS Official Guidelines; CMS National Correct Coding Initiative (NCCI); AHA Coding Clinic guidance',
  soc_controls = 'SOC 2 Type II (Processing Integrity); coding accuracy audit (minimum sample size per compliance plan); query response tracking; denial management documentation; compliance hotline reporting; OIG Work Plan risk area monitoring; coding education documentation'
WHERE name LIKE 'Medical Coder%';

UPDATE citizen_catalog SET
  standards_of_creation = 'ACDIS (Association of Clinical Documentation Integrity Specialists) best practices; AHIMA CDI Practice Brief; CMS MS-DRG/APR-DRG documentation requirements; TJC clinical documentation standards',
  soc_controls = 'SOC 2 Type II (Processing Integrity); query compliance rate tracking; physician response rate monitoring; CC/MCC capture rate verification; DRG reconciliation audit; query appropriateness review; CDI productivity and quality metrics'
WHERE name LIKE 'Clinical Documentation Integrity%';

UPDATE citizen_catalog SET
  standards_of_creation = 'ONC Interoperability Standards Advisory; HL7 FHIR Implementation Guides; IHE (Integrating the Healthcare Enterprise) profiles; TEFCA (Trusted Exchange Framework); state HIE participation requirements',
  soc_controls = 'SOC 2 Type II (Security, Availability); data exchange transaction monitoring; patient matching accuracy audit; consent management verification; data quality dashboards; interface error tracking; TEFCA participation compliance'
WHERE name LIKE 'HIE Specialist%';

UPDATE citizen_catalog SET
  standards_of_creation = 'AMBA (American Medical Billing Association) certification standards; CMS Claims Processing Manual; NUCC (National Uniform Claim Committee) standards; state prompt payment act requirements; payer-specific billing guidelines',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); claim denial root cause analysis; timely filing compliance tracking; ERA/EFT reconciliation; patient statement accuracy audit; credit balance monitoring; refund processing documentation'
WHERE name LIKE 'Medical Billing%';

UPDATE citizen_catalog SET
  standards_of_creation = 'HCCA (Health Care Compliance Association) Professional Ethics; OIG Compliance Program Guidance (various provider types); DOJ Evaluation of Corporate Compliance Programs; CMS Compliance Program requirements',
  soc_controls = 'SOC 2 Type II (all five trust service criteria); OIG exclusion screening (monthly LEIE/SAM); compliance hotline administration; internal audit program documentation; board compliance reporting; risk assessment documentation; compliance training tracking; corrective action plan monitoring'
WHERE name LIKE 'Healthcare Compliance Officer%';

UPDATE citizen_catalog SET
  standards_of_creation = 'MCG (Milliman Care Guidelines); InterQual criteria; CMS Medicare Benefit Policy Manual; URAC Utilization Management accreditation standards; state UR licensure requirements',
  soc_controls = 'SOC 2 Type II (Processing Integrity); clinical review determination turnaround time compliance; inter-rater reliability testing; appeal/denial documentation completeness; physician advisor review documentation; concurrent/retrospective review ratio monitoring; CMS Condition Code 44 compliance'
WHERE name LIKE 'Utilization Review%';

UPDATE citizen_catalog SET
  standards_of_creation = 'NCQA Health Plan Accreditation standards; CMS Medicare Advantage/Part D requirements; state insurance department regulations; URAC Health Plan accreditation; AMA Physician Payment Sunshine Act requirements',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); claims adjudication accuracy audit; provider credentialing verification; medical necessity determination documentation; member grievance tracking; network adequacy monitoring; pharmacy benefit audit; STARS quality measure validation'
WHERE name LIKE 'Medical Director (Health Plan)%';

UPDATE citizen_catalog SET
  standards_of_creation = 'HHS OCR HIPAA Privacy Rule guidance; AHIMA Privacy Practice Brief; state health information privacy laws (where more restrictive); AMA Code of Ethics on patient confidentiality; HITRUST CSF privacy controls',
  soc_controls = 'SOC 2 Type II (Privacy, Confidentiality); Notice of Privacy Practices distribution tracking; authorization form compliance audit; minimum necessary standard enforcement; breach risk assessment documentation; Business Associate Agreement inventory; patient access request turnaround compliance; accounting of disclosures log'
WHERE name = 'HIPAA Privacy Officer';

UPDATE citizen_catalog SET
  standards_of_creation = 'NIST SP 800-66 (HIPAA Security Rule implementation); HITRUST CSF; HHS OCR Security Rule guidance; NIST Cybersecurity Framework; state health data security requirements',
  soc_controls = 'SOC 2 Type II (Security, Availability, Confidentiality); annual Security Risk Assessment documentation; access management review (workforce clearance); encryption verification (at rest and in transit); security incident tracking; penetration testing results; workforce security training completion; contingency plan testing documentation'
WHERE name LIKE 'HIPAA Security Officer%';

UPDATE citizen_catalog SET
  standards_of_creation = 'ONC Health IT Certification criteria (45 CFR Part 170); AMIA Clinical Informatics competencies; HL7 CDA/FHIR implementation standards; CMS EHR Incentive Program documentation requirements; TEFCA standards',
  soc_controls = 'SOC 2 Type II (Security, Availability, Processing Integrity); EHR uptime and availability monitoring; clinical decision support rule validation; interface monitoring and error tracking; user access audit; system change management documentation; data migration validation; Meaningful Use/Promoting Interoperability measure tracking'
WHERE name LIKE 'Health IT Specialist%';

UPDATE citizen_catalog SET
  standards_of_creation = 'APIC professional and practice standards; CBIC certification requirements; CDC/HICPAC guideline implementation; WHO infection prevention and control standards; SHEA/IDSA practice guidelines',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Availability); HAI (Healthcare-Associated Infection) surveillance data validation; NHSN reporting compliance; hand hygiene compliance monitoring; environmental cleaning verification; antibiotic stewardship program documentation; outbreak investigation records; construction infection prevention risk assessment'
WHERE name LIKE 'Infection Preventionist%';

UPDATE citizen_catalog SET
  standards_of_creation = 'ASHRM (American Society for Healthcare Risk Management) standards; CPHRM certification requirements; TJC Environment of Care/Life Safety standards; state patient compensation fund requirements; Joint Commission Sentinel Event Policy',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); event reporting system administration; claims and litigation tracking; insurance coverage verification; informed consent audit program; patient complaint tracking; credentialing red flag monitoring; enterprise risk assessment documentation'
WHERE name LIKE 'Healthcare Risk Manager%';

UPDATE citizen_catalog SET
  standards_of_creation = 'Accrediting body standards (TJC, AAAHC, HFAP, DNV, CARF, COA); CMS Conditions of Participation/Coverage; state licensure survey standards; accreditation self-assessment methodology',
  soc_controls = 'SOC 2 Type II (Processing Integrity); continuous readiness assessment tracking; corrective action plan monitoring; tracer methodology compliance; policy review cycle management; survey readiness documentation; mock survey scheduling and results; standards interpretation tracking'
WHERE name = 'Accreditation Coordinator';

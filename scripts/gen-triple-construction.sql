-- Construction/Trades + Healthcare Deeper + Energy/Environment + Technology/Cybersecurity
-- + Education + Real Estate + Transportation + Food/Agriculture
-- Triple Constraint Completion: Standards of Creation + SOC Controls
-- Each entry: the professional standard that defines HOW documents must be created,
-- and the integrity framework that verifies they were created correctly.
-- All standards bodies, certifications, and methodologies are REAL.

-- ============================================================
-- CONSTRUCTION / TRADES (1-15)
-- ============================================================

UPDATE citizen_catalog SET
  standards_of_creation = 'IAPMO Uniform Plumbing Code (UPC) / ICC International Plumbing Code (IPC); ICC Plumbing Inspector P1 certification requirements; state plumbing board licensing standards; ASSE backflow prevention device standards; NFPA 99 medical gas piping (healthcare facilities); UPC Chapter 4 drainage fixture units and trap sizing documentation',
  soc_controls = 'ICC inspection documentation protocols (date, time, inspector ID, code section cited); permit tracking with sequential inspection hold points; re-inspection scheduling and fee documentation; deficiency notice chain of custody; digital photo documentation with GPS/timestamp metadata; inspector conflict-of-interest disclosure; state licensing board continuing education verification'
WHERE name = 'Plumbing Inspector';

UPDATE citizen_catalog SET
  standards_of_creation = 'NFPA 70 (National Electrical Code) interpretation standards; NFPA 70E (Electrical Safety in the Workplace); ICC Electrical Inspector E1 certification; state electrical licensing board examination standards; OSHA 29 CFR 1926 Subpart K (Electrical); UL listing and labeling verification protocols; IEEE 1584 arc flash hazard calculations',
  soc_controls = 'Inspection record management per ICC protocols; code violation tracking with NEC article/section citation; permit compliance verification (rough, final, service); load calculation review documentation; GFCI/AFCI protection verification records; panel schedule review audit trail; electrical plan review documentation; re-inspection tracking with violation clearance confirmation'
WHERE name = 'Electrical Inspector';

UPDATE citizen_catalog SET
  standards_of_creation = 'NFPA 1 (Fire Code); NFPA 13 (Sprinkler Systems); NFPA 72 (National Fire Alarm and Signaling Code); NFPA 101 (Life Safety Code); ICC International Fire Code (IFC); NFPA 25 (Inspection, Testing, Maintenance of Water-Based Fire Protection); NFPA 1031 (Professional Qualifications for Fire Inspector); state fire marshal certification requirements',
  soc_controls = 'Inspection scheduling per occupancy risk classification (NFPA 1 Chapter 13); fire code violation tracking with severity classification and abatement deadlines; Certificate of Occupancy fire clearance documentation; fire protection system acceptance test records; fire watch documentation; Knox Box key management audit trail; fire investigation chain of custody; annual fire inspection completion rate tracking'
WHERE name = 'Fire Marshal / Fire Prevention Officer';

UPDATE citizen_catalog SET
  standards_of_creation = 'ASME A17.1/CSA B44 (Safety Code for Elevators and Escalators); ASME A17.2 (Guide for Inspection); ASME QEI-1 (Qualification of Elevator Inspectors); state elevator safety board licensing requirements; ASCE 7 seismic requirements for elevator systems; ADA accessibility standards for elevators (ADA Standards Section 407)',
  soc_controls = 'Inspection certificate issuance and expiration tracking; Category 1 and Category 5 load test records with calibrated weight documentation; annual and five-year inspection scheduling; maintenance control program (MCP) verification per ASME A17.1 Section 8.6; entrapment incident reporting; modernization code compliance tracking; witnessing documentation for acceptance tests; inspector QEI-1 credential verification'
WHERE name = 'Elevator Inspector';

UPDATE citizen_catalog SET
  standards_of_creation = 'NCCCO (National Commission for the Certification of Crane Operators) certification standards; ASME B30 series (B30.5 Mobile Cranes, B30.3 Tower Cranes, B30.22 Articulating Boom Cranes); OSHA 29 CFR 1926 Subpart CC (Cranes and Derricks in Construction); OSHA competent person and qualified person requirements; ANSI/ASSP A10.28 (Safety Requirements for Work Platforms Suspended from Cranes)',
  soc_controls = 'Operator certification tracking by crane type and capacity with expiration dates; annual and comprehensive crane inspection records per ASME B30 and OSHA; lift plan review documentation (load charts, ground bearing capacity, swing radius); daily pre-operational inspection logs; signal person qualification records; rigging gear inspection documentation; OSHA Assembly/Disassembly Director (A/D) designation records; near-miss and incident reporting'
WHERE name = 'Crane Operator Certification Specialist';

UPDATE citizen_catalog SET
  standards_of_creation = 'EPA 40 CFR 61 Subpart M (National Emission Standards for Asbestos — NESHAP); OSHA 29 CFR 1926.1101 (Asbestos in Construction); AHERA (Asbestos Hazard Emergency Response Act, 40 CFR 763 Subpart E); EPA MAP (Model Accreditation Plan) training requirements; state asbestos contractor licensing; NIOSH 7400/7402 fiber counting methods; ASTM E1368 (visual inspection of asbestos abatement projects)',
  soc_controls = 'Air monitoring chain of custody (personal and area samples with pump calibration records); waste manifest tracking (EPA Asbestos Waste Shipment Record); worker medical surveillance per OSHA 1926.1101(m); negative exposure assessment documentation; daily work area inspection logs; final clearance air monitoring (aggressive sampling); decontamination unit setup/teardown records; project monitor daily reports; notification to EPA/state 10 working days prior'
WHERE name = 'Asbestos Abatement Supervisor';

UPDATE citizen_catalog SET
  standards_of_creation = 'EPA RRP Rule (40 CFR 745 Subpart E — Renovation, Repair, and Painting); HUD Guidelines for the Evaluation and Control of Lead-Based Paint Hazards in Housing (2012 edition); EPA 40 CFR 745 Subpart L (Lead-Based Paint Activities); XRF analyzer certification per EPA performance characteristic sheets; ASTM E1613 (ICP-AES for lead in paint); state lead inspector/assessor licensing requirements',
  soc_controls = 'XRF instrument performance check documentation (NIST reference standards); paint chip and dust wipe sample chain of custody; laboratory accreditation verification (EPA NLLAP recognized lab); clearance examination documentation (dust wipe results vs. EPA/HUD clearance levels); occupant notification and pamphlet distribution records (EPA Renovate Right); project recordkeeping retention (3 years per RRP Rule); abatement report with risk assessment findings'
WHERE name = 'Lead-Based Paint Inspector/Assessor';

UPDATE citizen_catalog SET
  standards_of_creation = 'ASHRAE Standard 202 (Commissioning Process for Buildings and Systems); ASHRAE Guideline 0 (Commissioning Process); ASHRAE 90.1 (Energy Standard for Buildings) mandatory commissioning requirements; state mechanical code compliance; ACG (AABC Commissioning Group) commissioning guidelines; BCA (Building Commissioning Association) best practices; LEED Enhanced Commissioning credit requirements (EA Credit)',
  soc_controls = 'Functional performance test (FPT) records with pass/fail criteria and measured values; commissioning report verification against Owner Project Requirements (OPR) and Basis of Design (BOD); systems manual completeness review; training documentation for operations staff; pre-functional checklist tracking; issues log with resolution documentation and responsible party; seasonal testing scheduling and completion verification; trend data review documentation'
WHERE name = 'HVAC Commissioning Agent';

UPDATE citizen_catalog SET
  standards_of_creation = 'AISC 360 (Specification for Structural Steel Buildings); AWS D1.1 (Structural Welding Code — Steel); IBC Chapter 17 (Special Inspections and Tests); AISC 341 (Seismic Provisions); AISC Code of Standard Practice (AISC 303); ASTM A6 (General Requirements for Rolled Structural Steel); RCSC Specification for Structural Joints Using High-Strength Bolts',
  soc_controls = 'Mill test report (MTR) verification against specification requirements (heat number traceability); certified weld inspection documentation (WPS/PQR/WPQ per AWS D1.1); special inspection records per IBC 1705.2 (structural steel); bolt tensioning verification records (turn-of-nut, calibrated wrench, or direct tension indicator); non-destructive examination (NDE) reports (UT, MT, RT per AWS D1.1 Chapter 6); structural steel fabricator QC documentation; erection tolerance verification records'
WHERE name = 'Structural Steel Inspector';

UPDATE citizen_catalog SET
  standards_of_creation = 'Davis-Bacon Act (40 USC 3141-3148); Davis-Bacon Related Acts; DOL Wage and Hour Division (WHD) All Agency Memoranda (AAMs); 29 CFR Parts 1, 3, and 5 (DOL implementing regulations); state prevailing wage statutes (e.g., CA Labor Code 1720-1861); DOL Wage Determinations (SAM.gov); SCA (Service Contract Act) where applicable; FAR 52.222-6 through 52.222-16',
  soc_controls = 'Certified payroll audit per DOL WH-347 form requirements (weekly submission verification); employee interview documentation (DOL standard questions, on-site and confidential); fringe benefit verification (bona fide plan documentation, annualization calculations); apprenticeship ratio compliance and registration verification; contractor and subcontractor classification review; back-wage computation and payment tracking; cross-check of payroll against daily sign-in sheets; debarment status verification (SAM.gov)'
WHERE name = 'Prevailing Wage Compliance Monitor';

UPDATE citizen_catalog SET
  standards_of_creation = 'EPA NPDES Construction General Permit (CGP) requirements; state Construction General Permit (CGP) conditions; EPA 40 CFR 122.26 (Stormwater Discharge Requirements); SWPPP development per CGP Part 2; state Water Quality Control Board standards; EPA Construction and Development Effluent Limitations Guidelines (40 CFR 450); Caltrans BMP Handbooks (California) or state equivalent',
  soc_controls = 'BMP (Best Management Practice) inspection logs per permit frequency (every 7 days and within 24 hours of qualifying storm events); discharge monitoring reports (visual and analytical); corrective action tracking with 7-day implementation verification; NOI (Notice of Intent) and NOT (Notice of Termination) filing documentation; SWPPP amendment log; rain gauge data and qualifying storm event documentation; sediment basin dewatering records; annual report and fee payment verification'
WHERE name = 'Stormwater Pollution Prevention Inspector';

UPDATE citizen_catalog SET
  standards_of_creation = 'ADA Standards for Accessible Design (28 CFR Part 36, Appendix B/D); ICC/ANSI A117.1 (Accessible and Usable Buildings and Facilities); Fair Housing Act Design and Construction Requirements (24 CFR 100.205); UFAS (Uniform Federal Accessibility Standards) for federally funded projects; state accessibility codes (e.g., California CBC Chapter 11B); PROWAG (Public Rights-of-Way Accessibility Guidelines)',
  soc_controls = 'Barrier documentation with measurements against specific standard section (slope, clear width, reach range, protruding objects); path-of-travel cost calculations for alterations (20% disproportionate cost threshold per 28 CFR 36.403); complaint tracking and response documentation; transition plan progress tracking (Title II public entities); CASp (Certified Access Specialist) inspection reports (California); tactile/visual signage verification records; accessible parking and route inspection documentation'
WHERE name = 'ADA Accessibility Inspector';

UPDATE citizen_catalog SET
  standards_of_creation = 'ASCE 41 (Seismic Evaluation and Retrofit of Existing Buildings); ASCE 7 (Minimum Design Loads); IBC Chapter 34 (Existing Buildings) and IEBC (International Existing Building Code); state mandatory retrofit ordinances (e.g., LA Ordinance 183893/184081, SF AB-2681 soft-story); ATC-20 (Post-Earthquake Safety Evaluation of Buildings); FEMA P-154 (Rapid Visual Screening); ACI 318 (concrete) and AISC 341 (steel) seismic provisions',
  soc_controls = 'Structural observation records per IBC 1704.6 (engineer of record site visits); special inspection documentation per IBC Chapter 17 (concrete, steel, masonry, wood); completion certification with engineer of record statement of conformance; progress inspection milestone tracking; retrofit design peer review documentation; pre-retrofit condition assessment records; anchor bolt and connection testing documentation; as-built verification against retrofit drawings'
WHERE name = 'Seismic Retrofit Inspector';

UPDATE citizen_catalog SET
  standards_of_creation = 'State 811/one-call laws (e.g., CA GC 4216); PHMSA 49 CFR 192 (Gas Pipeline Safety) and 49 CFR 195 (Liquid Pipeline Safety); CGA (Common Ground Alliance) Best Practices v17+; ASCE 38 (Standard Guideline for the Collection and Depiction of Existing Subsurface Utility Data — Quality Levels A-D); state excavator and operator responsibilities; NULCA (National Utility Locating Contractors Association) competency standards',
  soc_controls = 'Locate ticket tracking (one-call ticket number, date/time requested, date/time marked, expiration); positive response documentation (each utility operator response status); damage reporting and root cause analysis (CGA DIRT database categories); locate accuracy measurement (tolerance zone compliance, 18-24 inches typical); vacuum excavation (potholing) verification records for Quality Level A; white-lining (pre-mark) documentation; re-mark request tracking; GPS documentation of located facilities'
WHERE name = 'Underground Utility Locator';

UPDATE citizen_catalog SET
  standards_of_creation = 'OSHA 29 CFR 1926 Subpart L (Scaffolds); ANSI/SIA A92 series (A92.1 Mobile, A92.5 Boom, A92.6 Self-Propelled); OSHA competent person requirements per 1926.451(f)(7); SSFI (Scaffolding, Shoring & Forming Institute) technical bulletins; BS EN 12811 (European scaffold standards for international projects); manufacturer installation instructions and load ratings',
  soc_controls = 'Daily inspection tag system (green/yellow/red) with competent person signature and date; fall protection documentation (guardrail height, toeboards, personal fall arrest system inspection); scaffold modification authorization records (PE-stamped drawings for non-standard configurations); capacity load rating posting verification; competent person training and designation records; scaffold erection/dismantling sequence documentation; weekly weather-event re-inspection records; access point and ladder inspection documentation'
WHERE name = 'Scaffolding Safety Inspector';

-- ============================================================
-- HEALTHCARE DEEPER (16-20)
-- ============================================================

UPDATE citizen_catalog SET
  standards_of_creation = 'OPTN/UNOS Policies (Organ Procurement and Transplantation Network); CMS Conditions of Participation for Organ Transplant Programs (42 CFR 482.68-104); ASTS (American Society of Transplant Surgeons) practice guidelines; AST (American Society of Transplantation) clinical practice guidelines; ABTC (American Board for Transplant Certification) CCTC competency standards; Joint Commission Transplant Safety standards (TS chapters)',
  soc_controls = 'OPTN/UNOS match run documentation and organ offer acceptance/decline tracking; waiting list management audit trail (status changes, time accrual); living donor evaluation documentation per OPTN Policy 14; CMS outcome tracking (1-year patient/graft survival); organ chain of custody from procurement to implant; informed consent verification (donor and recipient); TJC transplant safety tracer methodology; SRTR (Scientific Registry of Transplant Recipients) program-specific report review'
WHERE name = 'Transplant Coordinator';

UPDATE citizen_catalog SET
  standards_of_creation = 'CDC/NHSN (National Healthcare Safety Network) surveillance definitions and protocols; APIC (Association for Professionals in Infection Control) professional competency standards; CMS Conditions of Participation infection control requirements (42 CFR 482.42); TJC IC (Infection Control) chapter standards; WHO hand hygiene guidelines; AAMI ST79 (steam sterilization) and AAMI TIR34 (flexible endoscope reprocessing); OSHA Bloodborne Pathogen Standard (29 CFR 1910.1030)',
  soc_controls = 'HAI (Healthcare-Associated Infection) surveillance data submission to NHSN (CLABSI, CAUTI, SSI, MRSA, CDI); hand hygiene compliance monitoring (direct observation and electronic monitoring); environmental rounding documentation; antibiogram annual publication; outbreak investigation documentation and line listing; construction infection control risk assessment (ICRA) per APIC/ASHE; sterilization biological indicator tracking; employee exposure incident documentation and follow-up per OSHA BBP'
WHERE name = 'Infection Preventionist';

UPDATE citizen_catalog SET
  standards_of_creation = 'ICH-GCP E6(R2) (International Council for Harmonisation Good Clinical Practice); 21 CFR Parts 50 (Informed Consent), 56 (IRBs), and 312 (IND); FDA 21 CFR 11 (Electronic Records/Signatures); OHRP 45 CFR 46 (Common Rule, Protection of Human Subjects); CITI Program training requirements; ACRP (Association of Clinical Research Professionals) competency framework; SoCRA (Society of Clinical Research Associates) certification standards',
  soc_controls = 'IRB/IEC submission tracking and approval documentation; informed consent version control and reconsent tracking; source document verification (SDV) completion logs; adverse event and serious adverse event reporting timelines (24-hour/15-day per 21 CFR 312.32); study drug accountability records (dispensing, returns, destruction); regulatory binder (essential documents per ICH-GCP Section 8) completeness audit; monitoring visit follow-up letter resolution tracking; CAPA documentation for audit findings'
WHERE name = 'Clinical Research Coordinator';

UPDATE citizen_catalog SET
  standards_of_creation = 'FDA 21 CFR 803 (Medical Device Reporting — MDR); FDA 21 CFR 820 (Quality System Regulation / cGMP for devices); ISO 13485 (Medical Devices Quality Management Systems); FDA Unique Device Identification (UDI) system requirements; AAMI/IEC 62366 (Usability Engineering); ECRI Institute hazard alerts and problem reporting; TJC EC.02.04.01 (Medical Equipment Management)',
  soc_controls = 'MDR filing tracking (5-day, 30-day report timelines per 21 CFR 803.50); device complaint investigation documentation (8D or similar root cause methodology); UDI database verification; recall management documentation (FDA recall classification, effectiveness checks); SMDA (Safe Medical Devices Act) semi-annual report tracking; device hazard alert dissemination records; post-market surveillance data collection; clinical engineering preventive maintenance completion tracking'
WHERE name = 'Medical Device Safety Officer';

UPDATE citizen_catalog SET
  standards_of_creation = 'CMS Conditions for Coverage for ESRD Facilities (42 CFR Part 494); CMS ESRD Interpretive Guidance (State Operations Manual Appendix H); AAMI RD52 (Dialysis Fluid Quality); CDC Guidelines for Dialysis Facility Environmental Management; KDOQI (Kidney Disease Outcomes Quality Initiative) Clinical Practice Guidelines; state dialysis facility licensing requirements; CMS ESRD QIP (Quality Incentive Program) measures',
  soc_controls = 'Water treatment system monitoring logs (chlorine/chloramine, bacteria, endotoxin per AAMI standards); patient care plan review and update tracking (monthly interdisciplinary team assessments); CMS ESRD QIP measure performance tracking (Kt/V, vascular access, hospitalization rates); OSHA bloodborne pathogen compliance documentation; machine disinfection and maintenance records; adverse event and infection rate tracking; CROWNWeb data submission verification; patient grievance documentation'
WHERE name = 'Dialysis Facility Administrator';

-- ============================================================
-- ENERGY / ENVIRONMENT (21-26)
-- ============================================================

UPDATE citizen_catalog SET
  standards_of_creation = 'NEC Article 690 (Solar Photovoltaic Systems); NFPA 70 rapid shutdown requirements; IEC 62446 (Grid Connected PV Systems — Commissioning, Documentation, and Maintenance); UL 1741 (Inverters and Converters) and UL 2703 (Mounting Systems); state electrical code amendments for PV; NABCEP (North American Board of Certified Energy Practitioners) PV Installation Professional certification standards; IRC Section 25D documentation requirements',
  soc_controls = 'System commissioning test records (string voltage, insulation resistance, ground continuity); fire department solar access pathway verification; structural attachment inspection documentation; interconnection agreement verification with utility; production monitoring and performance ratio tracking; rapid shutdown compliance testing records; AHJ (Authority Having Jurisdiction) final inspection documentation; inverter firmware version and UL listing verification'
WHERE name = 'Solar Installation Inspector';

UPDATE citizen_catalog SET
  standards_of_creation = 'NERC (North American Electric Reliability Corporation) reliability standards; FERC interconnection requirements; FAA obstruction evaluation (14 CFR Part 77); USFWS Eagle Conservation Plan Guidance and Bald and Golden Eagle Protection Act compliance; state renewable energy siting standards; IEC 61400 series (Wind Energy Generation Systems); OSHA 29 CFR 1910/1926 wind turbine safety; AWEA (now ACP) Operations & Maintenance Recommended Practices',
  soc_controls = 'NERC compliance monitoring and self-certification filings; FAA 7460-1 (Notice of Proposed Construction) and OE/AAA determination tracking; avian and bat mortality monitoring reports (USFWS protocols); noise level monitoring and setback compliance documentation; blade inspection and maintenance records; SCADA system cybersecurity audit per NERC CIP; decommissioning financial assurance verification; community benefit agreement compliance tracking'
WHERE name = 'Wind Energy Compliance Officer';

UPDATE citizen_catalog SET
  standards_of_creation = 'Verra VCS (Verified Carbon Standard) methodologies; Gold Standard for the Global Goals certification; UNFCCC CDM (Clean Development Mechanism) methodologies; ISO 14064 (Greenhouse Gas Quantification and Reporting); ISO 14065 (Requirements for GHG Validation and Verification Bodies); American Carbon Registry (ACR) standards; Climate Action Reserve (CAR) protocols; ICVCM (Integrity Council for the Voluntary Carbon Market) Core Carbon Principles',
  soc_controls = 'Project design document (PDD) validation records; monitoring report verification documentation; registry serialization and retirement tracking (Verra, Gold Standard, ACR, CAR registries); additionality assessment documentation; leakage accounting and quantification records; permanence risk buffer pool contribution tracking; third-party verification body accreditation verification (ISO 14065); double-counting prevention cross-registry checks'
WHERE name = 'Carbon Credit Verification Specialist';

UPDATE citizen_catalog SET
  standards_of_creation = 'RCRA (40 CFR Parts 260-273, Resource Conservation and Recovery Act); EPA Hazardous Waste Manifest requirements (40 CFR 262 Subpart B); DOT 49 CFR Parts 171-180 (Hazardous Materials Transportation); OSHA HAZWOPER (29 CFR 1910.120); EPA Large Quantity Generator requirements (40 CFR 262.17); state hazardous waste transporter registration and permitting; IATA DGR (international air shipment where applicable)',
  soc_controls = 'Uniform Hazardous Waste Manifest (EPA Form 8700-22) tracking with 35/45-day exception reporting; EPA ID number verification for generators, transporters, and TSDFs; DOT placarding and shipping paper verification; vehicle inspection and maintenance documentation; driver training records (DOT HM-181, OSHA HAZWOPER 40-hour + 8-hour refresher); spill response documentation; land disposal restriction (LDR) notification tracking; biennial report (EPA Form 8700-13A/B) filing verification'
WHERE name = 'Hazardous Waste Transporter Compliance Officer';

UPDATE citizen_catalog SET
  standards_of_creation = 'EPA Safe Drinking Water Act (SDWA) implementing regulations (40 CFR Parts 141-143); state drinking water program requirements (primacy agency standards); AWWA (American Water Works Association) standards (B-series treatment chemicals, C-series disinfection); Ten States Standards (Recommended Standards for Water Works); state operator certification requirements per SDWA Section 1419; ANSI/NSF 61 (Drinking Water System Components)',
  soc_controls = 'Consumer Confidence Report (CCR) annual publication and distribution; MCL/MCLG monitoring and reporting per compliance schedules (TCR, LCRR, DBP, IOC, VOC, SOC); CT calculations and disinfection log documentation; turbidity monitoring (continuous and grab samples); sanitary survey corrective action tracking; operator certification and renewal tracking; backflow prevention program documentation; Source Water Assessment follow-up; public notification compliance for violations'
WHERE name = 'Water Treatment Plant Operator';

UPDATE citizen_catalog SET
  standards_of_creation = 'Clean Air Act (CAA) Title V operating permit requirements; EPA 40 CFR Parts 50-97 (Air Quality Standards and Implementation); state implementation plan (SIP) requirements; EPA New Source Review (NSR) and Prevention of Significant Deterioration (PSD) programs; EPA AP-42 (Compilation of Air Emission Factors); 40 CFR 63 (NESHAP/MACT standards); ASTM emission testing methods; state air quality management district rules',
  soc_controls = 'Title V permit compliance certification (annual and semi-annual); continuous emissions monitoring system (CEMS) data quality assurance per 40 CFR 75; stack test report review and method validation (EPA Reference Methods 1-29); emission inventory reporting (annual); deviation reporting (prompt and quarterly/semi-annual); RACT/BACT/LAER technology review documentation; air dispersion modeling documentation (AERMOD/CALPUFF); permit modification tracking (minor, significant, major)'
WHERE name = 'Air Quality Permit Engineer';

-- ============================================================
-- TECHNOLOGY / CYBERSECURITY (27-34)
-- ============================================================

UPDATE citizen_catalog SET
  standards_of_creation = 'CMMC 2.0 (Cybersecurity Maturity Model Certification) assessment requirements per 32 CFR Part 170; NIST SP 800-171 Rev 2/3 (Protecting CUI in Nonfederal Systems); NIST SP 800-172 (Enhanced Security Requirements); DFARS 252.204-7012/7019/7020/7021; CUI Registry categories and marking requirements; C3PAO (Certified Third-Party Assessment Organization) accreditation per Cyber-AB',
  soc_controls = 'SPRS (Supplier Performance Risk System) score verification; POA&M (Plan of Action and Milestones) tracking with 180-day remediation timelines; SSP (System Security Plan) completeness review against 110/130 controls; evidence artifact collection per practice domain; assessment team credential verification (CCA/CCP certifications); network boundary and CUI enclave scope validation; continuous monitoring documentation; DIBCAC assessment coordination records'
WHERE name = 'CMMC Assessor';

UPDATE citizen_catalog SET
  standards_of_creation = 'AICPA Trust Services Criteria (TSC) 2017 — Security, Availability, Processing Integrity, Confidentiality, Privacy; AICPA AT-C Section 205 (Examination Engagements); SSAE 18 (Statements on Standards for Attestation Engagements); AICPA SOC 2 Guide (with 2022 updates); COSO 2013 Internal Control Framework (underlying framework for SOC); AICPA Code of Professional Conduct and independence requirements',
  soc_controls = 'Control testing documentation (inquiry, observation, inspection, re-performance per AICPA methodology); exception tracking with root cause analysis and compensating control evaluation; Type II testing period evidence collection (minimum 6-month observation window); complementary user entity controls (CUEC) and complementary subservice organization controls (CSOC) mapping; management assertion letter verification; description criteria evaluation (DC Section 200); bridge letter gap period assessment; continuous control monitoring evidence'
WHERE name = 'SOC 2 Auditor';

UPDATE citizen_catalog SET
  standards_of_creation = 'HIPAA Security Rule (45 CFR Part 164 Subpart C); HIPAA Privacy Rule (45 CFR Part 164 Subpart E); HITECH Act breach notification requirements; NIST SP 800-66 Rev 2 (Implementing the HIPAA Security Rule); NIST Cybersecurity Framework crosswalk to HIPAA; HHS OCR (Office for Civil Rights) enforcement guidance and FAQ; state health information privacy laws (e.g., CMIA California, SHIELD Act New York)',
  soc_controls = 'Risk analysis documentation per 45 CFR 164.308(a)(1)(ii)(A) (asset inventory, threat identification, vulnerability assessment, risk determination); workforce training completion tracking and phishing simulation results; access management reviews (quarterly access audits, termination procedures); encryption status inventory (at rest and in transit); business associate agreement (BAA) management and annual review; breach risk assessment documentation (four-factor test per HHS guidance); audit log review procedures; contingency plan testing documentation'
WHERE name = 'HIPAA Security Officer';

UPDATE citizen_catalog SET
  standards_of_creation = 'PCI DSS v4.0 (Payment Card Industry Data Security Standard); PCI SSC QSA qualification requirements and Code of Professional Responsibility; PA-DSS/Software Security Framework; PCI P2PE (Point-to-Point Encryption) standard; PCI PIN Security Requirements; PCI Card Production standards; PCI SSC Reporting Instructions and ROC/SAQ templates',
  soc_controls = 'ROC (Report on Compliance) testing procedures per PCI DSS v4.0 (400+ test procedures); ASV (Approved Scanning Vendor) scan result validation; penetration testing scope and methodology documentation (per PCI DSS Requirement 11.4); network segmentation testing verification; compensating control worksheet documentation; cardholder data environment (CDE) scope confirmation and data flow diagrams; customized approach objective/control documentation; interim assessment follow-up tracking'
WHERE name = 'PCI DSS Qualified Security Assessor';

UPDATE citizen_catalog SET
  standards_of_creation = 'FedRAMP Authorization Requirements (Rev 5 baseline); NIST SP 800-53 Rev 5 (Security and Privacy Controls) — Low/Moderate/High baselines; NIST SP 800-53A Rev 5 (Assessing Security and Privacy Controls); FedRAMP 3PAO requirements per A2LA or ANAB accreditation; FedRAMP System Security Plan (SSP) template and OSCAL format; JAB P-ATO and Agency ATO processes',
  soc_controls = 'SAR (Security Assessment Report) documentation per FedRAMP template requirements; SAP (Security Assessment Plan) scope and methodology; POA&M tracking with FedRAMP operational visibility requirements (30/90/180-day remediation); continuous monitoring deliverables (monthly OS/database/web scans, annual penetration test, annual assessment); ConMon (Continuous Monitoring) significant change request documentation; leveraged authorization (reciprocity) evidence mapping; supply chain risk management (SCRM) documentation; incident response plan testing records'
WHERE name = 'FedRAMP Assessor (3PAO)';

UPDATE citizen_catalog SET
  standards_of_creation = 'NIST SP 800-122 (Guide to Protecting PII Confidentiality); OMB Circular A-130 Appendix II (PIA requirements for federal agencies); GDPR Article 35 (Data Protection Impact Assessment); ISO 27701 (Privacy Information Management System); state privacy laws requiring PIAs (CCPA/CPRA risk assessments, Colorado CPA, Virginia CDPA); NIST Privacy Framework; E-Government Act Section 208 (federal PIA mandate)',
  soc_controls = 'PIA completion tracking per system lifecycle (new system, significant modification, periodic review); data mapping and data flow documentation (data inventory, categories, recipients, retention); threshold analysis documentation (PTA to determine PIA necessity); public posting verification (federal PIAs per E-Gov Act); privacy control assessment per NIST SP 800-53 Appendix J; SORN (System of Records Notice) cross-reference verification; vendor/third-party privacy review documentation; privacy incident correlation to PIA gaps'
WHERE name = 'Privacy Impact Assessment Analyst';

UPDATE citizen_catalog SET
  standards_of_creation = 'NIST SP 800-61 Rev 2 (Computer Security Incident Handling Guide); NIST SP 800-86 (Guide to Integrating Forensic Techniques); CISA Federal Incident Notification Guidelines; SANS Incident Handler Handbook; ISO 27035 (Information Security Incident Management); FIRST (Forum of Incident Response and Security Teams) CSIRT framework; US-CERT Federal Incident Reporting requirements; state breach notification laws (50-state matrix)',
  soc_controls = 'Incident classification and severity assignment documentation; chain of custody for forensic evidence (imaging, hashing, storage); timeline reconstruction and indicator of compromise (IOC) documentation; notification compliance tracking (72-hour GDPR, state breach notification statutory deadlines, CISA 24-hour for critical infrastructure); lessons learned/after-action report documentation; playbook execution tracking per incident type; threat intelligence sharing records (STIX/TAXII); retainer and escalation contact verification'
WHERE name = 'Incident Response Team Lead';

UPDATE citizen_catalog SET
  standards_of_creation = 'NIST AI RMF 1.0 (Artificial Intelligence Risk Management Framework); ISO/IEC 42001 (AI Management System); EU AI Act risk classification and conformity assessment requirements; IEEE 7000 series (Ethically Aligned Design); OECD AI Principles; Executive Order 14110 (Safe, Secure, and Trustworthy AI Development — US); ALTAI (Assessment List for Trustworthy AI — EU High-Level Expert Group); state AI legislation (e.g., Colorado SB 205, Illinois AIDA)',
  soc_controls = 'AI system inventory and risk classification documentation; algorithmic impact assessment records; bias and fairness testing documentation (demographic parity, equalized odds metrics); model card and data sheet maintenance; human oversight mechanism verification; transparency and explainability documentation per deployment context; incident monitoring for AI system failures/harms; third-party AI audit coordination; model drift monitoring and retraining governance documentation; data provenance and consent tracking'
WHERE name = 'AI Governance Officer';

-- ============================================================
-- EDUCATION (35-40)
-- ============================================================

UPDATE citizen_catalog SET
  standards_of_creation = 'Title IX of the Education Amendments of 1972 (20 USC 1681); 34 CFR Part 106 (DOE implementing regulations, 2024 Final Rule); OCR (Office for Civil Rights) Case Processing Manual; DOE Dear Colleague Letters and guidance documents; Clery Act intersections (VAWA Section 304 amendments); state Title IX implementing statutes; ATIXA (Association of Title IX Administrators) certification standards',
  soc_controls = 'Formal complaint tracking (receipt, investigation timeline, determination, appeal); supportive measures documentation and provision tracking; investigator and decision-maker training records and annual review; notice of allegations documentation; evidence review period compliance (10 business days per 34 CFR 106.46); hearing documentation and cross-examination records; advisor appointment and notification records; annual Title IX training completion verification; climate survey administration and response tracking'
WHERE name = 'Title IX Coordinator';

UPDATE citizen_catalog SET
  standards_of_creation = 'IDEA (Individuals with Disabilities Education Act, 20 USC 1400-1482); 34 CFR Part 300 (IDEA implementing regulations); Section 504 of the Rehabilitation Act; state special education code and regulations; OSEP (Office of Special Education Programs) guidance and monitoring protocols; CEC (Council for Exceptional Children) professional standards; state Performance Plan/Annual Performance Report (SPP/APR) indicators',
  soc_controls = 'IEP (Individualized Education Program) compliance tracking (timelines: 30-day referral, 60-day evaluation, annual review, triennial reevaluation); procedural safeguards distribution documentation; prior written notice documentation; parent consent tracking (evaluation, initial placement, reevaluation); least restrictive environment (LRE) data reporting; transition planning documentation (age 16+ per IDEA); dispute resolution tracking (mediation, due process, state complaints); SPP/APR indicator data collection and submission'
WHERE name = 'Special Education Director';

UPDATE citizen_catalog SET
  standards_of_creation = 'FERPA (Family Educational Rights and Privacy Act, 20 USC 1232g); 34 CFR Part 99 (FERPA implementing regulations); PTAC (Privacy Technical Assistance Center) guidance documents; DOE Student Privacy Policy Office guidance; COPPA intersections (13 and under); state student privacy laws (e.g., SOPIPA California, NY Education Law 2-d); NIST SP 800-122 (PII protection) applied to education records',
  soc_controls = 'Annual notification documentation (rights notification to parents/eligible students); consent form tracking for disclosure of education records; directory information opt-out processing and verification; record amendment request tracking (hearing documentation if denied); disclosure log maintenance per 34 CFR 99.32 (recipient, legitimate interest, date); school official legitimate educational interest definition and training; vendor/third-party agreement compliance (direct control, audit rights, data destruction); data governance committee meeting documentation'
WHERE name = 'FERPA Compliance Officer';

UPDATE citizen_catalog SET
  standards_of_creation = 'USDA 7 CFR Parts 210 (NSLP), 220 (SBP), 245 (Free/Reduced Price Eligibility); Healthy, Hunger-Free Kids Act of 2010; USDA Dietary Guidelines for Americans (current edition); USDA Food Buying Guide for Child Nutrition Programs; USDA meal pattern requirements and nutrition standards; state department of education nutrition program guidance; USDA Professional Standards for State and Local School Nutrition Program Personnel (required training hours)',
  soc_controls = 'Free and reduced-price application verification (3% sample per 7 CFR 245.6a); direct certification matching documentation; meal count and claiming documentation (point-of-service, edit checks); food safety inspection records (two per year per school); USDA Administrative Review preparation and corrective action tracking; procurement documentation (micro-purchase, small purchase, formal methods per 2 CFR 200); production records and menu certification; food recall response documentation'
WHERE name = 'School Nutrition Program Director';

UPDATE citizen_catalog SET
  standards_of_creation = 'Clery Act (20 USC 1092(f), Jeanne Clery Disclosure of Campus Security Policy and Campus Crime Statistics Act); 34 CFR 668.46 (implementing regulations); VAWA Section 304 amendments (dating violence, domestic violence, stalking); DOE Federal Student Aid Handbook Chapter 13; Clery Center best practices; state campus safety reporting requirements; Timely Warning/Emergency Notification DOE guidance',
  soc_controls = 'Annual Security Report (ASR) publication and distribution verification (October 1 deadline); crime statistics compilation methodology documentation (CSA identification, law enforcement cross-check, Clery geography mapping); CSA (Campus Security Authority) identification and training records; timely warning issuance documentation (decision rationale, distribution method, timing); daily crime log maintenance (two business day entry requirement); missing student notification policy documentation; emergency response and evacuation testing documentation (announced and unannounced); DOE compliance audit response tracking'
WHERE name = 'Clery Act Compliance Officer';

UPDATE citizen_catalog SET
  standards_of_creation = 'Regional accreditor standards (HLC, MSCHE, NECHE, NWCCU, SACSCOC, WSCUC); programmatic accreditor requirements (ABET, AACSB, ACEN, ABA, LCME, CCNE as applicable); CHEA (Council for Higher Education Accreditation) recognition standards; DOE 34 CFR Part 602 (Secretary recognition of accrediting agencies); institutional effectiveness and assessment frameworks; state authorization requirements for distance education (SARA/NC-SARA)',
  soc_controls = 'Self-study report development and evidence repository management; compliance certification tracking (federal requirements, accreditor standards); substantive change notification and approval documentation; assessment of student learning outcomes data collection and analysis; QEP (Quality Enhancement Plan) or equivalent improvement initiative tracking; focused report and monitoring report response documentation; site visit logistics and evidence room preparation; annual institutional profile/update filing; teach-out plan documentation for program closures'
WHERE name = 'Accreditation Liaison Officer';

-- ============================================================
-- REAL ESTATE (41-46)
-- ============================================================

UPDATE citizen_catalog SET
  standards_of_creation = 'Fair Housing Act (42 USC 3601-3619); 24 CFR Part 100 (HUD implementing regulations); HUD Fair Housing Planning Guide; Fair Housing Act Design and Construction Requirements (24 CFR 100.205 — seven design/construction requirements); state fair housing laws (e.g., FEHA California, NYC Human Rights Law); FHEO (Fair Housing and Equal Opportunity) guidance; HUD Disparate Impact Rule (24 CFR 100.500)',
  soc_controls = 'Complaint intake and investigation documentation (HUD/FHEO filing timelines); testing program documentation (paired testing methodology, tester selection, result analysis); affirmative marketing plan compliance tracking; fair housing training completion records (staff, agents, property managers); advertising review documentation (HUD advertising guidance compliance); reasonable accommodation/modification request tracking and response timelines; Analysis of Impediments (AI) or AFH (Assessment of Fair Housing) progress tracking; conciliation agreement compliance monitoring'
WHERE name = 'Fair Housing Compliance Officer';

UPDATE citizen_catalog SET
  standards_of_creation = 'RESPA (Real Estate Settlement Procedures Act, 12 USC 2601-2617); Regulation X (12 CFR Part 1024, CFPB implementing regulations); TILA-RESPA Integrated Disclosure Rule (TRID); Regulation Z (12 CFR Part 1026) mortgage disclosure requirements; CFPB examination procedures for RESPA; HUD-1/Closing Disclosure requirements; state settlement agent licensing requirements; MSA (Marketing Services Agreement) and affiliated business arrangement (AfBA) disclosure requirements',
  soc_controls = 'Loan Estimate timing compliance tracking (3 business days of application); Closing Disclosure timing verification (3 business days before consummation); Section 8 kickback and fee-splitting audit documentation; affiliated business arrangement (AfBA) disclosure tracking; escrow account analysis and annual statement verification; qualified written request (QWR) response tracking (5 business day acknowledgment, 30 business day response); servicing transfer notice compliance; tolerance violation tracking and cure documentation'
WHERE name = 'RESPA Compliance Officer';

UPDATE citizen_catalog SET
  standards_of_creation = 'IAAO (International Association of Assessing Officers) Standard on Mass Appraisal; IAAO Standard on Ratio Studies; USPAP (Uniform Standards of Professional Appraisal Practice) Standards 5 and 6 (mass appraisal); state property tax code and assessment law; state Board of Equalization guidance; IAAO Standard on Property Tax Policy; IAAO Standard on Assessment Appeal; county assessor methodology documentation requirements',
  soc_controls = 'Assessment ratio study analysis (COD, PRD, PRB per IAAO standards); comparable sales verification documentation; income approach documentation (capitalization rate derivation, operating expense analysis); exemption and exclusion eligibility verification (homeowner, veteran, religious, nonprofit); assessment appeal tracking (informal review, assessment appeal board, court); reappraisal cycle compliance tracking; personal property audit documentation (business property statements); change in ownership and new construction reassessment processing documentation'
WHERE name = 'Property Tax Assessment Reviewer';

UPDATE citizen_catalog SET
  standards_of_creation = 'Davis-Stirling Common Interest Development Act (California CC 4000-6150) or equivalent state CID statute; state nonprofit corporation law (as applicable to HOA governance); AICPA Audit and Accounting Guide (Common Interest Realty Associations); FHA/VA project approval requirements (condo/PUD); FHFA condo/co-op project standards; state department of real estate CID filing requirements; reserve study standards per state law (e.g., CAI/APRA National Reserve Study Standards)',
  soc_controls = 'Annual budget and reserve disclosure compliance tracking; board meeting and annual meeting notice/agenda documentation (open meeting requirements); assessment collection and lien enforcement documentation; CC&R and rules enforcement tracking (violation notice, hearing, fine); reserve fund investment policy compliance; architectural review committee documentation; insurance coverage verification (master policy, D&O, fidelity bond); election and voting procedures documentation (secret ballot, inspector of elections per state law); financial audit/review completion tracking'
WHERE name = 'HOA/CID Compliance Manager';

UPDATE citizen_catalog SET
  standards_of_creation = 'FASB ASC 842 (Leases, formerly ASC 840/FAS 13); IASB IFRS 16 (Leases, international); BOMA (Building Owners and Managers Association) measurement standards (ANSI/BOMA Z65.1 for office, Z65.2 for industrial); ASTM lease audit standards; market rent analysis per MAI/SRA appraisal standards; state commercial landlord-tenant law; ADA compliance for commercial leases',
  soc_controls = 'Rent escalation calculation verification (CPI indexing, fixed, percentage rent breakpoint analysis); operating expense reconciliation audit (CAM, tax, insurance pass-throughs); BOMA rentable square footage measurement verification; lease abstract accuracy review (key terms, dates, options, rights); percentage rent breakpoint and gross sales audit; tenant improvement allowance disbursement tracking; lease expiration and option notice deadline tracking; sublease consent and assignment documentation; estoppel certificate verification'
WHERE name = 'Commercial Lease Auditor';

UPDATE citizen_catalog SET
  standards_of_creation = 'State rent stabilization/rent control ordinances (e.g., LA RSO, SF Rent Ordinance, NY HSTPA/ETPA); Costa-Hawkins Rental Housing Act (California) or equivalent state preemption law; AB 1482 (California Tenant Protection Act) or equivalent statewide rent cap; state just cause for eviction requirements; local rent board administrative regulations and guidelines; Ellis Act (California) or equivalent withdrawal provisions',
  soc_controls = 'Annual allowable rent increase calculation and notice documentation; rent registration and filing verification with local rent board; capital improvement petition tracking and tenant notification; banked rent increase tracking; just cause eviction documentation and notice compliance; tenant habitability complaint tracking and response; relocation assistance calculation and payment documentation; Costa-Hawkins/vacancy decontrol applicability analysis; buyout agreement disclosure and filing (where required by local law); annual landlord reporting compliance'
WHERE name = 'Rent Stabilization Compliance Analyst';

-- ============================================================
-- TRANSPORTATION (47-52)
-- ============================================================

UPDATE citizen_catalog SET
  standards_of_creation = 'FMCSA (Federal Motor Carrier Safety Administration) FMCSRs (49 CFR Parts 350-399); FMCSA Safety Audit procedures (49 CFR 385.3); CSA (Compliance, Safety, Accountability) methodology and BASICs; FMCSA Investigative Procedures Manual; FMCSA New Entrant Safety Audit requirements (49 CFR 385.305-337); FMCSA Intervention Model; state partner inspection protocols (MCSAP)',
  soc_controls = 'Driver qualification file audit documentation (49 CFR 391 — application, MVR, medical certificate, road test); hours of service (HOS) compliance review (ELD data analysis per 49 CFR 395); vehicle maintenance file audit (49 CFR 396 — DVIR, annual inspection, systematic maintenance); drug and alcohol testing program review (49 CFR 382 — random rates, MRO documentation, SAP return-to-duty); BASIC score monitoring and data challenge documentation; crash report review and preventability determination; hazmat routing and security plan review'
WHERE name = 'FMCSA Safety Auditor';

UPDATE citizen_catalog SET
  standards_of_creation = 'DOT 49 CFR Parts 171-180 (Hazardous Materials Regulations — HMR); PHMSA (Pipeline and Hazardous Materials Safety Administration) special permits and approvals; IATA Dangerous Goods Regulations (DGR) for air; IMDG Code for ocean; Transport Canada TDG for cross-border; UN Recommendations on the Transport of Dangerous Goods (Model Regulations); DOT ERGO (Emergency Response Guidebook)',
  soc_controls = 'Shipping paper/documentation verification (proper shipping name, UN number, hazard class, packing group); packaging certification tracking (UN marking, DOT specification, periodic retest per 49 CFR 180); driver hazmat endorsement and training records (49 CFR 172 Subpart H — general awareness, function-specific, safety, security); security plan documentation (49 CFR 172.800-804); incident reporting compliance (49 CFR 171.15 immediate, 171.16 written within 30 days); cargo tank and portable tank inspection/requalification tracking; hazmat route plan and permit documentation'
WHERE name = 'Hazmat Transportation Specialist';

UPDATE citizen_catalog SET
  standards_of_creation = 'FRA (Federal Railroad Administration) regulations (49 CFR Parts 200-244); Railroad Safety Improvement Act of 2008; FRA System Safety Program (49 CFR Part 270); FRA Risk Reduction Program (49 CFR Part 271); APTA (American Public Transportation Association) safety standards for commuter rail; state PUC/UTC railroad safety regulations; AAR (Association of American Railroads) Field Manual and Interchange Rules',
  soc_controls = 'Track inspection documentation per 49 CFR 213 (frequency by class, geometry car data, rail flaw detection); signal and train control inspection records (49 CFR 236); locomotive inspection and testing documentation (49 CFR 229); operating practices compliance (49 CFR 217/218 — blue signal protection, radio communication); hours of service law compliance (49 CFR 228); grade crossing safety documentation (49 CFR 234); FRA Form 6180.54/55 accident/incident reporting; railroad bridge inspection records (49 CFR 237)'
WHERE name = 'Railroad Safety Inspector';

UPDATE citizen_catalog SET
  standards_of_creation = 'PHMSA 49 CFR Part 192 (Transportation of Natural and Other Gas by Pipeline); PHMSA 49 CFR Part 195 (Transportation of Hazardous Liquids by Pipeline); Pipeline Safety Improvement Act of 2002 and reauthorizations; API 1160 (Managing System Integrity for Hazardous Liquid Pipelines); ASME B31.8S (Managing System Integrity of Gas Pipelines); NACE SP0169 (Control of External Corrosion on Underground Metallic Pipelines); state pipeline safety program requirements',
  soc_controls = 'Integrity management program (IMP) documentation per 49 CFR 192 Subpart O / 195 Subpart F; in-line inspection (ILI) tool run results and anomaly response tracking; high consequence area (HCA) identification and documentation; cathodic protection survey records (annual pipe-to-soil readings); operator qualification (OQ) records per 49 CFR 192 Subpart N; control room management documentation per 49 CFR 192 Subpart P; public awareness program implementation records; PHMSA annual report and incident report filing (PHMSA F 7100.1/7100.2)'
WHERE name = 'Pipeline Safety Inspector';

UPDATE citizen_catalog SET
  standards_of_creation = 'FMCSA Broker/Forwarder regulations (49 CFR Part 371); FMCSA property broker licensing (49 CFR 365/368, MC/FF authority); BMC-84 (surety bond) or BMC-85 (trust fund agreement) requirements ($75,000 minimum); MAP-21 freight broker registration requirements; 49 USC 14704 (broker liability); state transportation broker licensing (where applicable); FMCSA Unified Registration System (URS)',
  soc_controls = 'Operating authority verification documentation (FMCSA Licensing & Insurance SAFER system); carrier vetting documentation (CSA score review, insurance verification, operating authority status); surety bond/trust fund maintenance verification; written transportation contracts documentation (49 CFR 371.3); record retention compliance (3-year minimum per 49 CFR 371.3); double brokering prevention controls; shipper and carrier payment documentation; BOL (bill of lading) management and discrepancy tracking; carrier insurance certificate monitoring and expiration alerts'
WHERE name = 'Freight Broker Compliance Officer';

UPDATE citizen_catalog SET
  standards_of_creation = 'FMCSA CDL Third-Party Testing Program (49 CFR 383.75); AAMVA (American Association of Motor Vehicle Administrators) CDL testing standards; FMCSA Skills Test Examiner Training Curriculum; state CDL examining authority requirements and agreements; 49 CFR 383 Subpart G (Required Knowledge and Skills); FMCSA CDL Examiner Criteria and Scoring; ELDT (Entry-Level Driver Training) requirements per 49 CFR Part 380 Subpart F',
  soc_controls = 'Examiner certification and recertification tracking; skills test scoring documentation (pre-trip inspection, basic vehicle control, road test); random re-examination rate compliance and documentation; state audit of third-party testing program; test route documentation and approval; examiner observation and covert monitoring records; CDL skills test appointment and scheduling records; test failure documentation and waiting period compliance; ELDT Training Provider Registry (TPR) verification; fraud prevention controls (identity verification, test integrity)'
WHERE name = 'CDL Third-Party Examiner';

-- ============================================================
-- FOOD / AGRICULTURE (53-58)
-- ============================================================

UPDATE citizen_catalog SET
  standards_of_creation = 'FDA FSMA (Food Safety Modernization Act) Preventive Controls for Human Food Rule (21 CFR Part 117); FDA FSMA Preventive Controls for Animal Food Rule (21 CFR Part 507); PCQI (Preventive Controls Qualified Individual) training per FSPCA (Food Safety Preventive Controls Alliance) standardized curriculum; FDA CGMP requirements (21 CFR Part 117 Subpart B); FDA Food Safety Plan requirements; Codex Alimentarius HACCP principles',
  soc_controls = 'Food Safety Plan documentation (hazard analysis, preventive controls, monitoring, corrective actions, verification); supply chain verification program documentation (supplier approval, verification activities per 21 CFR 117 Subpart G); environmental monitoring program records; allergen control program documentation; recall plan and mock recall documentation; sanitation preventive control records; PCQI qualification documentation; FDA facility registration and biennial renewal; corrective action and correction documentation with root cause analysis'
WHERE name = 'FSMA Preventive Controls Qualified Individual';

UPDATE citizen_catalog SET
  standards_of_creation = 'USDA NOP (National Organic Program, 7 CFR Part 205); USDA Organic Regulations; NOP Handbook (guidance documents and instructions); ISO/IEC 17065 (Conformity Assessment — Requirements for Bodies Certifying Products); IFOAM (International Federation of Organic Agriculture Movements) Norms; state organic program requirements; NOP National List of Allowed and Prohibited Substances (7 CFR 205.601-606)',
  soc_controls = 'Organic system plan (OSP) review and approval documentation; annual inspection records (announced and unannounced); residue testing documentation (5% minimum of certified operations); trace-back and mass balance audits; organic certificate issuance and scope verification; noncompliance notification and corrective action tracking; label review and approval documentation; transition period verification (36-month land history); NOP Program Manager approval for certifier accreditation; complaint and adverse action appeal documentation'
WHERE name = 'USDA Organic Certifier';

UPDATE citizen_catalog SET
  standards_of_creation = 'FIFRA (Federal Insecticide, Fungicide, and Rodenticide Act, 7 USC 136); EPA 40 CFR Parts 152-180 (Pesticide Regulations); EPA Worker Protection Standard (40 CFR Part 170); state Department of Pesticide Regulation (DPR) licensing requirements; EPA Certification of Pesticide Applicators Rule (40 CFR Part 171, 2017 revision); state restricted materials permit requirements; EPA RUP (Restricted Use Pesticide) certification categories',
  soc_controls = 'Applicator license and certification tracking (commercial, private, categories/subcategories); continuing education unit (CEU) credit tracking and renewal verification; pesticide use reporting documentation (state mandated, e.g., California PUR); restricted materials permit compliance; Worker Protection Standard compliance (handler/worker training, REI posting, PPE verification); pesticide application record keeping (product, rate, location, date, time, wind speed per state/federal requirements); integrated pest management (IPM) documentation; storage and disposal records per EPA container/containment rule'
WHERE name = 'Pesticide Applicator License Compliance Officer';

UPDATE citizen_catalog SET
  standards_of_creation = 'USDA APHIS Animal Welfare Act regulations (9 CFR Parts 1-4); AWA (Animal Welfare Act, 7 USC 2131-2159); USDA APHIS Animal Care Policy Manual; PHS Policy on Humane Care and Use of Laboratory Animals (research facilities); AAALAC International accreditation standards (Guide for the Care and Use of Laboratory Animals, NRC); IACUC (Institutional Animal Care and Use Committee) protocol review requirements; state anti-cruelty laws and humane officer standards',
  soc_controls = 'USDA APHIS inspection report tracking and corrective action documentation; IACUC protocol review and approval documentation (three-year renewal, annual review, amendments); post-approval monitoring records; veterinary care program documentation; environmental enrichment program records; facility inspection documentation (semi-annual for research institutions); animal inventory and disposition tracking; annual USDA report filing (APHIS Form 7023 — research facilities); noncompliance investigation and reporting documentation; personnel training records (species-specific, occupational health)'
WHERE name = 'Animal Welfare Inspector';

UPDATE citizen_catalog SET
  standards_of_creation = 'Codex Alimentarius HACCP Guidelines (CAC/RCP 1-1969, Rev 4-2003); NACMCF (National Advisory Committee on Microbiological Criteria for Foods) HACCP principles; FDA 21 CFR Part 120 (Juice HACCP); USDA FSIS 9 CFR Part 417 (Meat/Poultry HACCP); FDA Seafood HACCP (21 CFR Part 123); GFSI (Global Food Safety Initiative) recognized scheme requirements (SQF, BRCGS, FSSC 22000); ISO 22000 (Food Safety Management Systems)',
  soc_controls = 'CCP (Critical Control Point) monitoring records with critical limit verification; corrective action documentation for CCP deviations (identification, segregation, cause, preventive measures); HACCP plan validation documentation (initial and annual/significant change); verification activities scheduling and completion (CCP record review, calibration, microbiological testing); pre-requisite program documentation (sanitation SOPs, supplier verification, allergen control); hazard analysis documentation with supporting rationale; HACCP team meeting and annual reassessment records; internal audit documentation per GFSI scheme requirements'
WHERE name = 'HACCP Coordinator';

UPDATE citizen_catalog SET
  standards_of_creation = 'USDA AMS COOL regulations (7 CFR Part 65, Country of Origin Labeling); Agricultural Marketing Act of 1946 as amended by 2002/2008 Farm Bills; USDA AMS COOL compliance guide; Tariff Act (19 USC 1304, marking requirements for imports); FDA labeling requirements (21 CFR Part 101) intersections; CBP (Customs and Border Protection) country of origin determination rules; USDA FSIS labeling requirements for meat/poultry (9 CFR Parts 317/381)',
  soc_controls = 'Supply chain record keeping documentation (country of origin at each point of sale, 1-year retention); supplier origin declarations and certifications; commingled commodity documentation and percentage tracking; retail label accuracy verification (covered commodities: muscle cuts, ground meat, fresh/frozen fruits and vegetables, peanuts, pecans, macadamia nuts, ginseng); USDA AMS audit trail from producer through retail; import documentation cross-reference (CBP entry records, phytosanitary certificates); point-of-sale labeling method verification (placard, label, sign); recordkeeping system adequacy review per USDA COOL regulations'
WHERE name = 'Country of Origin Labeling (COOL) Compliance Specialist';

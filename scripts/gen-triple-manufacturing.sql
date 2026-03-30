-- Manufacturing, Construction, Space Triple Constraint Completion

UPDATE citizen_catalog SET
  governing_guidelines = 'ISO 9001:2015 (QMS requirements); 21 CFR Part 820 (FDA QSR for medical devices); AS9100 (aerospace); IATF 16949 (automotive); industry-specific QMS regulations',
  standards_of_creation = 'ASQ CQM (Certified Quality Manager) certification; ISO 9001 Lead Auditor certification (Exemplar Global/IRCA); IATF 16949 auditor qualification; ASQ Body of Knowledge; ISO 19011 (Guidelines for Auditing Management Systems)',
  soc_controls = 'SOC 2 Type II (Processing Integrity); management review meeting documentation; internal audit program schedule and results; corrective/preventive action tracking (CAPA); customer complaint trending; nonconformance documentation; process performance metrics; third-party certification audit documentation'
WHERE name = 'Quality Management Representative';

UPDATE citizen_catalog SET
  governing_guidelines = 'ISO 19011 (Auditing Management Systems); ISO 9001/14001/45001 audit requirements; industry-specific audit mandates (FDA, FAA, DoD); customer-specific audit requirements',
  standards_of_creation = 'ASQ CQA (Certified Quality Auditor) certification; IRCA/Exemplar Global Lead Auditor certification; RAB QSA qualification; ISO 19011:2018 auditor competence requirements; ASQ Auditing Handbook',
  soc_controls = 'SOC 2 Type II (Processing Integrity); audit plan documentation; evidence collection methodology; finding classification consistency; audit report timeliness; corrective action verification; auditor independence documentation; audit program effectiveness review; inter-auditor calibration'
WHERE name = 'Certified Quality Auditor';

UPDATE citizen_catalog SET
  governing_guidelines = 'ISO 9001:2015; industry-specific quality regulations (21 CFR 820, AS9100, IATF 16949); CPSC product safety requirements; federal/state product liability statutes',
  standards_of_creation = 'ASQ CQE (Certified Quality Engineer) certification; Six Sigma (CSSBB/CSSGB) methodology; AIAG Core Tools (APQP, PPAP, FMEA, MSA, SPC); Juran/Deming quality methodology; Design of Experiments (DOE) standards',
  soc_controls = 'SOC 2 Type II (Processing Integrity); statistical process control documentation; measurement system analysis records; failure mode effects analysis maintenance; process capability studies; inspection/test records; gage R&R documentation; first article inspection records; process audit documentation'
WHERE name = 'Certified Quality Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = 'ISO 9001:2015 Section 7.5 (Documented Information); 21 CFR Part 820 Subpart D (Document Controls); AS9100 Section 7.5; ITAR document control requirements; nuclear QA (10 CFR 50 Appendix B)',
  standards_of_creation = 'AIIM (Association for Information and Image Management) certification; ARMA International Records Management standards; ISO 15489 (Records Management); industry-specific document control standards; electronic signature standards (21 CFR Part 11)',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Security); document approval workflow audit; revision control verification; obsolete document management; distribution control records; electronic records integrity (21 CFR Part 11 compliance); document change request tracking; retention schedule compliance; backup and recovery verification'
WHERE name = 'Document Control Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'ISO 9001:2015 Section 8.4 (Control of Externally Provided Processes); IATF 16949 Section 8.4; DFARS 252.246-7008 (source inspection); FDA 21 CFR 820.50 (purchasing controls); AS9100 supplier requirements',
  standards_of_creation = 'ASQ CSQP (Certified Supplier Quality Professional) certification; AIAG Supplier Quality Requirements; IATF 16949 supplier development methodology; AS9100 supplier approval standards; ISO 19011 supplier audit methodology',
  soc_controls = 'SOC 2 Type II (Processing Integrity); supplier audit documentation; incoming inspection records; supplier CAPA tracking; approved supplier list management; supplier performance scorecards; material certification verification; PPAP/FAI documentation; supplier risk assessment; conflict minerals due diligence (Dodd-Frank Section 1502)'
WHERE name = 'Supplier Quality Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Clean Air Act; Clean Water Act; RCRA; TSCA; EPCRA (42 USC 11001); state environmental statutes; EPA regulations (40 CFR); ISO 14001 requirements',
  standards_of_creation = 'ISO 14001:2015 (Environmental Management Systems); BEAC (Board of EHS Auditor Certifications) standards; CHMM certification; QEP designation; EPA sector-specific compliance guidance; state environmental audit privilege statutes',
  soc_controls = 'SOC 2 Type II (Processing Integrity); environmental permit tracking; emissions monitoring records; waste manifest documentation; spill prevention plan verification; environmental audit schedule and results; regulatory reporting deadline management; pollution prevention documentation; ISO 14001 internal audit program'
WHERE name = 'Environmental Compliance Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'OSHA Hazard Communication Standard (29 CFR 1910.1200); RCRA (42 USC 6901); DOT Hazardous Materials Regulations (49 CFR 171-180); TSCA; state hazmat regulations; EPA RMP (40 CFR Part 68)',
  standards_of_creation = 'CHMM (Certified Hazardous Materials Manager) certification; IHMM standards; GHS (Globally Harmonized System) classification; NFPA 704 requirements; OSHA HazWOPER standards (29 CFR 1910.120); DOT hazmat employee training (49 CFR 172.704)',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Security); SDS (Safety Data Sheet) inventory and accessibility audit; hazmat training documentation; emergency response plan drills; container labeling compliance; DOT shipping paper verification; waste characterization records; Tier II reporting compliance; RMP audit documentation'
WHERE name = 'Hazardous Materials Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'CPSC (Consumer Product Safety Act 15 USC 2051); CPSIA; state product liability statutes; EU General Product Safety Directive (if export); UL/ETL/CSA certification requirements; FDA product safety (for applicable products)',
  standards_of_creation = 'BCSP CSP (Certified Safety Professional) certification; UL Standards development; ISO 12100 (Safety of Machinery); ANSI/AAMI standards (medical devices); ASTM product safety standards; IEC 62368-1 (IT/AV equipment)',
  soc_controls = 'SOC 2 Type II (Processing Integrity); product testing and certification records; safety risk assessment documentation (FMEA, FTA); field incident tracking and trending; product safety review meeting minutes; regulatory testing lab accreditation verification; safety certification mark compliance; consumer complaint analysis'
WHERE name = 'Product Safety Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CPSC recall requirements (15 USC 2064); NHTSA recall authority (49 USC 30118); FDA recall authority (21 USC 360h); CPSIA Section 15(b) mandatory reporting; state lemon laws',
  standards_of_creation = 'CPSC Recall Handbook; NHTSA Part 573 defect reporting; FDA Recall Guidance documents; ISO 10393 (Product Recall Guidelines); company-specific recall procedures per QMS',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Availability); recall notification effectiveness tracking; product traceability system audit; corrective action implementation verification; regulatory agency reporting timeliness; consumer response tracking; recall completion rate monitoring; root cause investigation documentation; inventory quarantine and disposition records'
WHERE name = 'Recall Compliance Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'Industry-specific: FDA (21 CFR various parts), EPA, FCC, OSHA, CPSC, DOT/NHTSA, FAA; international: EU MDR/IVDR, REACH, RoHS; state regulatory requirements',
  standards_of_creation = 'RAC (Regulatory Affairs Certification) by RAPS; TOPRA certification (EU); agency-specific submission standards (FDA eCTD, 510(k), PMA, IDE); EU CE marking procedures; regulatory intelligence methodology',
  soc_controls = 'SOC 2 Type II (Processing Integrity); regulatory submission tracking; approval/clearance documentation; post-market surveillance records; regulatory correspondence management; label review documentation; advertising/promotional material review; regulatory change impact assessment; registration/listing maintenance'
WHERE name = 'Regulatory Affairs Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'OSHA general industry/construction standards; state manufacturing safety regulations; EPA emissions standards; industry-specific manufacturing requirements (GMP, cGMP); ITAR/EAR for defense manufacturing',
  standards_of_creation = 'SME (Society of Manufacturing Engineers) CMfgE certification; ASQ certifications (CQE, CSSBB); AIAG manufacturing standards; ASME standards; AWS welding standards; lean manufacturing methodology (Toyota Production System)',
  soc_controls = 'SOC 2 Type II (Processing Integrity); process validation documentation (IQ/OQ/PQ); work instruction revision control; training qualification records; equipment maintenance records; first article inspection; production part approval process; in-process inspection records; deviation and nonconformance tracking'
WHERE name = 'Manufacturing Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = 'ISO/IEC 17025 (Testing and Calibration Labs); 21 CFR Part 820.72 (Inspection, measuring, and test equipment); ANSI/NCSL Z540.3; nuclear calibration (10 CFR 50 Appendix B); ITAR calibration requirements',
  standards_of_creation = 'ASQ CCT (Certified Calibration Technician) certification; NIST traceability requirements; ISO/IEC 17025 accreditation; A2LA/NVLAP laboratory accreditation; ANSI/NCSL Z540.3 methodology; measurement uncertainty calculation (GUM)',
  soc_controls = 'SOC 2 Type II (Processing Integrity); calibration schedule compliance; out-of-tolerance investigation and impact assessment; measurement uncertainty documentation; NIST traceability chain; calibration certificate review; equipment identification and status labeling; environmental condition monitoring; calibration recall system audit'
WHERE name = 'Calibration/Metrology Technician';

UPDATE citizen_catalog SET
  governing_guidelines = 'FDA 21 CFR Part 820 (Design Controls, Process Validation); cGMP requirements; EU MDR Annex I (medical devices); ICH Q8/Q9/Q10 (pharmaceutical); ISO 13485 process validation requirements',
  standards_of_creation = 'ASQ CQE/CSSBB methodology; FDA Process Validation Guidance (2011); ISPE GAMP 5 (computerized systems); IQ/OQ/PQ protocol standards; statistical methods for validation (ASTM E2709, E2810)',
  soc_controls = 'SOC 2 Type II (Processing Integrity); validation protocol documentation (IQ/OQ/PQ); validation report approval; continued process verification data; revalidation trigger criteria; change control impact assessment; validation master plan compliance; equipment qualification records; cleaning validation documentation'
WHERE name = 'Process Validation Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = 'EAR (15 CFR 730-774); ITAR (22 CFR 120-130); OFAC sanctions (31 CFR Parts 500-599); Anti-Boycott regulations; Customs regulations (19 CFR); Foreign Trade Zone regulations',
  standards_of_creation = 'NCMA trade compliance certification; BIS/DDTC export guidance; CUSECO certification (Customs); C-TPAT participation standards; AEO (Authorized Economic Operator) for EU trade; FTZ Board requirements',
  soc_controls = 'SOC 2 Type II (Security, Processing Integrity); export classification documentation; denied party screening records; license determination and application tracking; deemed export controls; end-use/end-user verification; technology transfer documentation; voluntary self-disclosure documentation; import/export record retention (5 years)'
WHERE name = 'Trade Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Trademark Counterfeiting Act (18 USC 2320); Lanham Act (15 USC 1051); DFARS 252.246-7007/7008 (counterfeit parts); FAA counterfeit parts requirements; EU Anti-Counterfeiting Trade Agreement; SAE AS6174/AS6081',
  standards_of_creation = 'SAE AS6081 (Counterfeit Electronic Parts — Avoidance); SAE AS6174 (Counterfeit Materiel); GIDEP (Government-Industry Data Exchange Program) standards; ERAI reporting standards; ICC International Chamber of Commerce BASCAP methodology',
  soc_controls = 'SOC 2 Type II (Security, Processing Integrity); incoming inspection for counterfeit detection; supply chain traceability documentation; GIDEP alert review and response; authentication testing records (XRF, decapsulation, electrical testing); suspect/counterfeit material quarantine; supplier risk assessment for counterfeit; OCM/OEM verification documentation; serialization and track-and-trace systems'
WHERE name = 'Anti-Counterfeit Program Manager';

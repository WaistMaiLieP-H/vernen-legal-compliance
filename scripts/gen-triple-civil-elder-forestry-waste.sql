-- ============================================================================
-- Triple Constraint UPDATE Statements
-- Civil Engineering/Surveying/Planning (55 personas)
-- Elder Care/Veterinary/Funeral (58 personas)
-- Forestry/Fishing/Mining/Diving (53 personas)
-- Waste/Water/Pest/Towing (55 personas)
-- Generated: 2026-03-29
-- Total: 221 personas
-- Uses WHERE name = 'exact name' (NO LIKE patterns)
-- governing_guidelines: statute/regulation creating the document obligation
-- standards_of_creation: professional standard defining HOW documents must be created
-- soc_controls: integrity/security framework verifying documents were created correctly
-- All statutes, standards bodies, certifications, and methodologies are REAL.
-- ============================================================================

-- ============================================================================
-- SECTION 1: CIVIL ENGINEERING / PUBLIC INFRASTRUCTURE (21 Personas)
-- ============================================================================

-- A1. Structural / Bridge Engineering

UPDATE citizen_catalog SET
  governing_guidelines = '23 CFR Part 650 Subpart C (NBIS); FHWA Bridge Inspector''s Reference Manual (FHWA-NHI-12-049); NBIS Final Rule 23 CFR 650.305-650.313 (2022 update); AASHTO Manual for Bridge Evaluation (MBE) 3rd Edition',
  standards_of_creation = 'FHWA Coding Guide — Recording and Coding Guide for SI&A; AASHTO MBE Section 4 (Inspection procedures); FHWA Technical Advisory T 5140.21; 23 CFR 650.311 (Inspection frequency and procedures)',
  soc_controls = 'SOC 2 PI1.1 (accuracy of condition ratings and element-level data); SOC 2 CC6.1 (logical access controls over NBI database entries); SOC 2 A1.1 (timely submission of inspection data to FHWA); SOC 2 CC8.1 (change management — updates to bridge condition ratings)'
WHERE name = 'National Bridge Inspection Standards (NBIS) Certified Bridge Inspector';

UPDATE citizen_catalog SET
  governing_guidelines = 'AASHTO LRFD Bridge Design Specifications 9th Edition (2020); AASHTO Guide Specifications for LRFD Seismic Bridge Design 2nd Edition; Caltrans Seismic Design Criteria (SDC) Version 2.0; NCEES Model Rules of Professional Conduct Section 240.15',
  standards_of_creation = 'AASHTO LRFD Bridge Design Specifications Section 1; FHWA Bridge Preservation Guide (FHWA-HIF-18-022); ACI 318-19 (Structural Concrete); AISC 360-22 (Structural Steel Buildings)',
  soc_controls = 'SOC 2 PI1.2 (structural calculation verification); SOC 2 CC6.3 (PE seal and signature authentication); SOC 2 CC8.1 (design revision control); SOC 2 A1.2 (recovery of structural design files)'
WHERE name = 'Licensed Professional Engineer — Structural/Bridge';

UPDATE citizen_catalog SET
  governing_guidelines = 'ASCE/SEI 41-17 (Seismic Evaluation and Retrofit of Existing Buildings); FEMA P-2006 (Example Application Guide for ASCE/SEI 41-13); Caltrans Seismic Design Criteria (SDC) Version 2.0; California Government Code 8875 (Seismic Retrofit Programs)',
  standards_of_creation = 'ASCE/SEI 41-17 Chapter 7 (Analysis procedures and acceptance criteria); ASCE/SEI 7-22 (Minimum Design Loads); ACI 440.2R-17 (Externally Bonded FRP Systems); Caltrans Bridge Design Aids Section 20 (Seismic Retrofit)',
  soc_controls = 'SOC 2 PI1.1 (seismic analysis accuracy); SOC 2 CC3.1 (seismic hazard identification); SOC 2 CC6.3 (PE seal authentication on retrofit plans); SOC 2 A1.1 (emergency access to retrofit records)'
WHERE name = 'Licensed Professional Engineer — Seismic Retrofit Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'ASTM C31/C31M (Making and Curing Concrete Test Specimens); ASTM C39/C39M (Compressive Strength of Cylindrical Concrete Specimens); AASHTO T 22; AASHTO R 18 (QMS for Construction Materials Testing Labs); ISO/IEC 17025:2017',
  standards_of_creation = 'ASTM E329 (Agencies Engaged in Construction Inspection/Testing); ACI 318-19 Chapter 26 (Inspection and testing); AASHTO M 320 (Performance-Graded Asphalt Binder); ASTM A615/A615M (Carbon-Steel Bars for Concrete Reinforcement)',
  soc_controls = 'SOC 2 PI1.1 (test result accuracy and calibration traceability); SOC 2 CC6.1 (LIMS controls); SOC 2 CC4.1 (proficiency testing and inter-laboratory comparison); SOC 2 CC8.1 (test method revisions)'
WHERE name = 'Licensed Professional Engineer — Materials Testing / Certified Materials Testing Technician';

-- A2. Highway / Road Design and Traffic Engineering

UPDATE citizen_catalog SET
  governing_guidelines = 'AASHTO Green Book 7th Edition (2018); FHWA MUTCD 11th Edition (2023); 23 CFR Part 625 (Design Standards for Highways); State Highway Design Manuals (e.g., Caltrans Highway Design Manual 7th Edition)',
  standards_of_creation = 'AASHTO Green Book Chapters 1-10; AASHTO Roadside Design Guide 4th Edition; FHWA Flexibility in Highway Design (FHWA-PD-97-062); 23 CFR 627 (Value Engineering for Federal-aid projects over $25M)',
  soc_controls = 'SOC 2 PI1.2 (design calculation verification); SOC 2 CC6.3 (PE seal and signature authentication); SOC 2 CC8.1 (plan revision tracking); SOC 2 CC2.1 (stakeholder coordination documentation)'
WHERE name = 'Licensed Professional Engineer — Highway/Transportation Design';

UPDATE citizen_catalog SET
  governing_guidelines = 'FHWA MUTCD 11th Edition (2023); Highway Capacity Manual 7th Edition (TRB 2022); ITE Trip Generation Manual 11th Edition; AASHTO Highway Safety Manual 1st Edition (2010)',
  standards_of_creation = 'MUTCD Part 6 (Temporary Traffic Control); HCM Chapters 16-23 (Intersection/freeway analysis); ITE Transportation Impact Analysis guidelines; NACTO Urban Street Design Guide',
  soc_controls = 'SOC 2 PI1.1 (traffic model calibration and validation); SOC 2 CC6.1 (traffic signal management system controls); SOC 2 A1.1 (real-time traffic management system uptime); SOC 2 CC3.2 (safety analysis documentation)'
WHERE name = 'Licensed Professional Engineer — Traffic / Professional Traffic Operations Engineer (PTOE)';

UPDATE citizen_catalog SET
  governing_guidelines = 'AASHTO Guide for Design of Pavement Structures (1993) / AASHTO MEPDG; FHWA LTPP Program Standards; ASTM D6433 (PCI Surveys); AASHTO T 283 (Resistance of Asphalt Mixtures to Moisture-Induced Damage)',
  standards_of_creation = 'ASTM D6433 Section 7 (PCI survey procedures); AASHTO R 48; FHWA Pavement Preservation Compendium II (FHWA-IF-06-049); State pavement management system protocols (e.g., Caltrans PaveM)',
  soc_controls = 'SOC 2 PI1.1 (PCI data accuracy); SOC 2 CC8.1 (pavement condition database updates); SOC 2 A1.2 (historical pavement data recovery); SOC 2 CC4.1 (pavement deterioration trend analysis)'
WHERE name = 'Licensed Professional Engineer — Pavement / Pavement Management Specialist';

-- A3. Water / Wastewater / Stormwater Infrastructure

UPDATE citizen_catalog SET
  governing_guidelines = 'Clean Water Act 33 USC 1251 et seq.; Safe Drinking Water Act 42 USC 300f et seq.; 40 CFR Part 122 (NPDES); AWWA Standards (C-series pipe, M-series manuals); State Water Board MS4 permits',
  standards_of_creation = 'AWWA C600 (Installation of Ductile-Iron Mains); AWWA C651 (Disinfecting Water Mains); AWWA M22 (Sizing Water Service Lines and Meters); 10 States Standards (GLUMRB)',
  soc_controls = 'SOC 2 PI1.1 (water quality test result accuracy); SOC 2 CC6.1 (SCADA system controls); SOC 2 A1.1 (24/7 water system monitoring); SOC 2 C1.1 (critical infrastructure vulnerability data)'
WHERE name = 'Licensed Professional Engineer — Water Resources';

UPDATE citizen_catalog SET
  governing_guidelines = 'Clean Water Act 33 USC 1342 (NPDES permits); 40 CFR Part 122.26 (Storm water discharges); 40 CFR Part 35 Subpart E; EPA Guide for SSES (EPA/625/6-91/030); California SWRCB Order 2006-0003',
  standards_of_creation = 'NASSCO PACP coding standards; ASTM F2550 (Locating Leaks Using Smoke Testing); WEF Manual of Practice No. 7; 10 States Standards (GLUMRB)',
  soc_controls = 'SOC 2 PI1.1 (CCTV inspection data coding accuracy); SOC 2 CC6.1 (collection system SCADA controls); SOC 2 A1.1 (SSO reporting systems); SOC 2 CC4.1 (I/I trending and SSO frequency tracking)'
WHERE name = 'Licensed Professional Engineer — Wastewater/Collection Systems';

UPDATE citizen_catalog SET
  governing_guidelines = 'Clean Water Act 402(p); 40 CFR Part 122.26; California CGP Order 2022-0057-DWQ; EPA Multi-Sector General Permit (MSGP) for Industrial Stormwater',
  standards_of_creation = 'State SWPPP preparation guidelines (e.g., Caltrans Storm Water Quality Handbooks); C.3 provisions of regional MS4 permits; EPA BMP fact sheets; CASQA BMP Handbooks',
  soc_controls = 'SOC 2 PI1.1 (BMP inspection and monitoring data accuracy); SOC 2 CC4.1 (stormwater sampling and discharge monitoring); SOC 2 CC2.1 (NOI/NOT filing and permit reporting); SOC 2 A1.1 (real-time discharge monitoring data)'
WHERE name = 'Certified Professional in Stormwater Quality (CPSWQ) / Qualified SWPPP Developer (QSD)';

-- A4. Utility Infrastructure

UPDATE citizen_catalog SET
  governing_guidelines = '49 CFR Part 192 (Gas Pipeline Minimum Federal Safety Standards); ASME B31.8 (Gas Transmission and Distribution Piping); API 1160 (Hazardous Liquid Pipelines); California PUC GO 112-F',
  standards_of_creation = '49 CFR 192.517 (Test records for transmission lines); ASME B31.8 Chapter VIII (Corrosion Control); API 1163 (In-Line Inspection Systems Qualification); NACE SP0169 (External Corrosion Control)',
  soc_controls = 'SOC 2 PI1.1 (pressure test and leak survey data accuracy); SOC 2 CC6.1 (SCADA and pipeline control system security); SOC 2 A1.1 (24/7 gas leak detection); SOC 2 C1.1 (critical infrastructure location data)'
WHERE name = 'Licensed Professional Engineer — Pipeline / Gas Distribution';

UPDATE citizen_catalog SET
  governing_guidelines = 'NERC Reliability Standards (FAC, TPL, PRC series); NESC ANSI C2-2023; IEEE C2; California PUC GO 95, GO 128, GO 165; 18 CFR Part 40 (FERC Electric Reliability Standards)',
  standards_of_creation = 'IEEE 80-2013 (AC Substation Grounding); IEEE 1547-2018 (Distributed Energy Resources Interconnection); NFPA 70 (NEC 2023); NERC FAC-008 (Facility Ratings methodology)',
  soc_controls = 'SOC 2 CC6.1 (SCADA/EMS system controls); SOC 2 A1.1 (grid reliability and restoration planning); SOC 2 C1.1 (CEII); SOC 2 CC3.1 (wildfire and grid safety risk management)'
WHERE name = 'Licensed Professional Engineer — Power Systems / Electrical Grid';

UPDATE citizen_catalog SET
  governing_guidelines = 'BICSI TDMM 14th Edition; ANSI/TIA-568; ANSI/TIA-758-B; 47 CFR Part 68; FCC Broadband Infrastructure Standards',
  standards_of_creation = 'ANSI/TIA-568.3-D (Optical Fiber Cabling); ANSI/TIA-758-B Section 5 (Outside plant fiber); ANSI/TIA-526-14-C (Optical Power Loss Measurements); BICSI OSP Design Reference Manual 6th Edition',
  soc_controls = 'SOC 2 CC6.1 (network management system controls); SOC 2 A1.1 (fiber network uptime and redundancy); SOC 2 C1.1 (network architecture and routing data); SOC 2 CC6.4 (physical security of fiber optic infrastructure)'
WHERE name = 'Licensed Professional Engineer — Telecommunications / Registered Communications Distribution Designer (RCDD)';

-- A5. Geotechnical Engineering

UPDATE citizen_catalog SET
  governing_guidelines = 'California BPC 6736 (Geotechnical engineering definition); ASCE/G-I Standard of Practice for Geotechnical Site Characterization; ASTM D1586 (SPT); ASTM D2487 (USCS); IBC 2021 Chapter 18 (Soils and Foundations)',
  standards_of_creation = 'ASTM D1586 (SPT boring procedures); ASTM D2850 (Unconsolidated-Undrained Triaxial Compression); ASTM D4318 (Atterberg Limits); FHWA Subsurface Investigation Guidance (FHWA-NHI-01-031); Caltrans Geotechnical Manual',
  soc_controls = 'SOC 2 PI1.1 (soil test data accuracy and lab calibration); SOC 2 CC6.3 (PE/GE seal authentication); SOC 2 CC8.1 (boring log revision control); SOC 2 A1.2 (historical geotechnical data recovery)'
WHERE name = 'Licensed Professional Engineer — Geotechnical / Licensed Geotechnical Engineer (GE, California-specific)';

UPDATE citizen_catalog SET
  governing_guidelines = 'California BPC 7832 (Geology practice act); CCR Title 16 Division 29; ASCE/G-I 67-19; CGS Notes 44-52 (Engineering geology report preparation)',
  standards_of_creation = 'CGS Note 44 (Preparing Engineering Geologic Reports); CGS Note 48 (Review Checklist); ASTM D420 (Site Characterization); FEMA P-749 (Earthquake-Resistant Design Concepts)',
  soc_controls = 'SOC 2 PI1.1 (geologic mapping and hazard assessment accuracy); SOC 2 CC6.3 (CEG/PG seal authentication); SOC 2 CC3.1 (geologic hazard identification); SOC 2 A1.2 (geologic survey and mapping data recovery)'
WHERE name = 'Certified Engineering Geologist (CEG) / Professional Geologist (PG)';

-- A6. Construction Management and Inspection

UPDATE citizen_catalog SET
  governing_guidelines = 'CMAA Standards of Practice (2019); FAR Part 36 (Construction and Architect-Engineer Contracts); State DOT Construction Manuals (e.g., Caltrans); AIA A201-2017 (General Conditions)',
  standards_of_creation = 'CMAA A-1 (Agreement — Owner and CM); CSI MasterFormat 2018; Caltrans Construction Manual Section 5 (Contract Administration); AGC Contract Documents',
  soc_controls = 'SOC 2 PI1.1 (progress reporting and quantity tracking accuracy); SOC 2 CC6.1 (construction management information system controls); SOC 2 CC2.1 (RFI/submittal tracking); SOC 2 CC8.1 (change order processing)'
WHERE name = 'Licensed Professional Engineer — Construction Management / Resident Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = 'California Labor Code 1726 (public works inspection); ICC Certification Programs; ACI CP-1 (Concrete Field Testing Technician); NICET certification levels I-IV',
  standards_of_creation = 'State DOT Standard Specifications (e.g., Caltrans 2024); Local agency standard specifications; ASTM test method standards; State/local daily inspection report format requirements',
  soc_controls = 'SOC 2 PI1.1 (daily report accuracy and completeness); SOC 2 CC6.1 (inspection database access controls); SOC 2 CC4.1 (inspection frequency compliance); SOC 2 CC2.1 (non-conformance notice documentation)'
WHERE name = 'Certified Construction Inspector / Public Works Inspector';

UPDATE citizen_catalog SET
  governing_guidelines = 'Davis-Bacon Act 40 USC 3141-3148; 29 CFR Parts 1, 3, 5; California Labor Code 1720-1861 (Prevailing Wage Law); CCR Title 8 16000-16802',
  standards_of_creation = 'DOL WHD Form WH-347 (Certified Payroll Report); California DIR Form A-1-131; 29 CFR 5.5 (Contract provisions); California Labor Code 1776 (Payroll records requirements)',
  soc_controls = 'SOC 2 P1.1 (worker personal information protection); SOC 2 PI1.1 (payroll calculation accuracy); SOC 2 CC6.1 (payroll database access controls); SOC 2 CC4.1 (wage rate compliance monitoring)'
WHERE name = 'Prevailing Wage Compliance Officer / Labor Compliance Program Administrator';

UPDATE citizen_catalog SET
  governing_guidelines = 'AIA E203-2013 (BIM and Digital Data Exhibit); AGC BIMForum LOD Specification; State DOT as-built requirements (e.g., Caltrans Plans Preparation Manual); Local agency as-built drawing submittal standards',
  standards_of_creation = 'AIA E203-2013 Section 3 (Digital data requirements); State DOT CAD standards (e.g., Caltrans CADD Users Manual); ISO 19650-1:2018; Local GIS data submittal standards',
  soc_controls = 'SOC 2 CC6.1 (CAD/BIM file management controls); SOC 2 CC8.1 (drawing revision control and version tracking); SOC 2 PI1.1 (dimensional accuracy and completeness); SOC 2 A1.2 (long-term digital preservation)'
WHERE name = 'As-Built Drawing Coordinator / CAD/BIM Manager';

-- A7. Environmental Review for Infrastructure

UPDATE citizen_catalog SET
  governing_guidelines = 'CEQA PRC 21000-21189; CEQA Guidelines CCR Title 14 Division 6 Chapter 3; OPR CEQA Technical Advisories; State Clearinghouse procedures PRC 21082.1',
  standards_of_creation = 'CEQA Guidelines 15063 (Initial Study); CEQA Guidelines 15126 (EIR content); CEQA Guidelines 15168 (Program EIR); CEQA Guidelines 15300-15333 (Categorical Exemptions)',
  soc_controls = 'SOC 2 PI1.1 (environmental impact analysis accuracy); SOC 2 CC2.1 (public notice and comment period documentation); SOC 2 CC6.1 (environmental document management controls); SOC 2 A1.1 (public access to CEQA documents)'
WHERE name = 'CEQA Environmental Analyst / Senior Environmental Planner';

UPDATE citizen_catalog SET
  governing_guidelines = 'NEPA 42 USC 4321-4347; 40 CFR Parts 1500-1508 (CEQ NEPA regulations); 23 CFR Part 771 (FHWA/FTA Environmental Impact); Section 4(f) DOT Act 49 USC 303',
  standards_of_creation = '40 CFR 1502 (EIS content requirements); 40 CFR 1501.5 (Categorical exclusion criteria); FHWA Technical Advisory T 6640.8A; 23 CFR 771.117 (FHWA categorical exclusions)',
  soc_controls = 'SOC 2 PI1.1 (environmental analysis methodology accuracy); SOC 2 CC2.1 (Federal Register notices, public hearing records); SOC 2 CC6.1 (federal environmental database access controls); SOC 2 A1.1 (public access to federal environmental documents)'
WHERE name = 'NEPA Environmental Specialist / Federal Environmental Compliance Officer';

-- A8. Right-of-Way and Public Access

UPDATE citizen_catalog SET
  governing_guidelines = 'Uniform Relocation Act 42 USC 4601-4655; 49 CFR Part 24; 23 CFR Part 710 (Right-of-Way and Real Estate); California CCP 1230.010 et seq. (Eminent domain)',
  standards_of_creation = 'FHWA Real Estate Acquisition Guide for Local Public Agencies; USPAP; 49 CFR 24.102 (Notice to owner); 49 CFR 24.104 (Negotiation — just compensation)',
  soc_controls = 'SOC 2 P1.1 (property owner personal/financial information protection); SOC 2 PI1.1 (appraisal and offer documentation accuracy); SOC 2 CC6.1 (property acquisition database controls); SOC 2 CC2.1 (required notice and negotiation documentation)'
WHERE name = 'Senior Right-of-Way Agent (SR/WA) / Right-of-Way Acquisition Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'ADA 42 USC 12131-12165 (Title II); 28 CFR Part 35; Section 504 Rehabilitation Act 29 USC 794; FHWA ADA/Section 504 guidance; U.S. Access Board PROWAG',
  standards_of_creation = '28 CFR 35.150(d) (Transition plan requirements); PROWAG R301-R310 (Pedestrian access route); MUTCD Section 4E (Accessible pedestrian signals); ADA Standards for Accessible Design (2010)',
  soc_controls = 'SOC 2 PI1.1 (barrier inventory and schedule accuracy); SOC 2 CC2.1 (public input and grievance procedure documentation); SOC 2 CC4.1 (transition plan implementation tracking); SOC 2 A1.1 (public access to transition plan documents)'
WHERE name = 'ADA Transition Plan Coordinator / Accessibility Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'California Streets and Highways Code 660-734; State DOT Encroachment Permits Manual (e.g., Caltrans 2022); Local agency encroachment permit ordinances; MUTCD Part 6 (Temporary Traffic Control)',
  standards_of_creation = 'State DOT encroachment permit application forms and standard conditions; Traffic control plan requirements per MUTCD; Insurance and bonding requirements; Utility coordination protocols',
  soc_controls = 'SOC 2 PI1.1 (permit conditions compliance tracking); SOC 2 CC6.1 (permit tracking database controls); SOC 2 CC4.1 (permit condition compliance inspections); SOC 2 CC2.1 (inter-agency coordination documentation)'
WHERE name = 'Encroachment Permit Engineer / Permit Compliance Officer';

-- A9. Asset Management

UPDATE citizen_catalog SET
  governing_guidelines = 'ISO 55000:2014; ISO 55001:2014; 23 USC 119 (National Highway Performance Program); AASHTO TAMG 2nd Edition; MAP-21 / FAST Act / BIL asset management provisions',
  standards_of_creation = 'ISO 55001:2014 Clause 7.5 (Documented information); 23 CFR Part 515 (Asset management plans for NHS); AASHTO TAMG Chapter 5; GASB Statement 34 (infrastructure reporting)',
  soc_controls = 'SOC 2 PI1.1 (asset inventory and condition data accuracy); SOC 2 CC6.1 (asset management information system controls); SOC 2 A1.2 (historical asset data and lifecycle cost recovery); SOC 2 CC4.1 (asset deterioration modeling)'
WHERE name = 'Certified Infrastructure Asset Manager / Asset Management Engineer';

-- ============================================================================
-- SECTION 2: LAND SURVEYING / MAPPING / GIS (17 Personas)
-- ============================================================================

-- B1. Boundary and Title Surveying

UPDATE citizen_catalog SET
  governing_guidelines = 'California BPC 8700-8805 (Professional Land Surveyors Act); NSPS Model Standards of Practice; CCR Title 16 Division 5; State surveying practice statutes',
  standards_of_creation = 'State minimum standards for land surveys; ALTA/NSPS Land Title Survey Standards (2021); California BPC 8762-8773 (recording requirements); FGDC-STD-007.4-2002 (Cadastral Surveys)',
  soc_controls = 'SOC 2 PI1.1 (measurement accuracy and positional tolerance compliance); SOC 2 CC6.3 (PLS seal and signature authentication); SOC 2 CC8.1 (survey revision and amendment tracking); SOC 2 A1.2 (survey record archival and retrieval)'
WHERE name = 'Professional Land Surveyor (PLS) / Licensed Land Surveyor (LLS)';

UPDATE citizen_catalog SET
  governing_guidelines = 'ALTA/NSPS Land Title Survey Standards (adopted February 23, 2021); ALTA/NSPS Table A (Optional items); State supplemental ALTA survey requirements; Title insurance underwriter survey requirements',
  standards_of_creation = 'ALTA/NSPS 2021 Section 3 (Survey standards and specifications); Section 5 (Descriptions, plats, maps); Section 6 (Certifications and deliverables); State-specific ALTA certification language',
  soc_controls = 'SOC 2 PI1.1 (positional accuracy per ALTA standards); SOC 2 CC6.3 (PLS seal authentication for title insurance reliance); SOC 2 CC2.1 (certification language accuracy); SOC 2 P1.1 (property owner information protection)'
WHERE name = 'Professional Land Surveyor (PLS) — ALTA/NSPS Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'BLM Manual of Surveying Instructions (2009); 43 USC 751-773 (PLSS); 43 CFR Part 9180 (Cadastral Survey Authority); BLM Cadastral Survey Policies and Procedures',
  standards_of_creation = 'BLM Manual Chapter 3 (Initial Point, Baselines, Principal Meridians); BLM Manual Chapter 7 (Resurveys); BLM Cadastral Survey Standards Special Instructions format; FGDC Cadastral Data Content Standard',
  soc_controls = 'SOC 2 PI1.1 (PLSS coordinate and monument accuracy); SOC 2 CC6.1 (federal land records database controls); SOC 2 A1.2 (historical survey record preservation); SOC 2 CC8.1 (resurvey documentation)'
WHERE name = 'Cadastral Surveyor / BLM Cadastral Survey Specialist';

-- B2. Subdivision and Mapping

UPDATE citizen_catalog SET
  governing_guidelines = 'Subdivision Map Act California Gov. Code 66410-66499.58; State BPC surveying practice provisions; County subdivision ordinances; Local agency subdivision requirements',
  standards_of_creation = 'Subdivision Map Act map preparation requirements (Gov. Code 66434); County Surveyor map checking standards; State Board of Equalization mapping standards; Local agency COA compliance',
  soc_controls = 'SOC 2 PI1.1 (lot dimensions and area calculation accuracy); SOC 2 CC6.3 (PLS seal and county recorder acceptance); SOC 2 CC8.1 (map amendment and correction tracking); SOC 2 CC2.1 (agency review coordination)'
WHERE name = 'Professional Land Surveyor (PLS) — Subdivision Mapping';

UPDATE citizen_catalog SET
  governing_guidelines = 'Subdivision Map Act parcel map provisions (Gov. Code 66445-66450); County parcel map ordinances; State subdivision regulations; Local agency tentative parcel map requirements',
  standards_of_creation = 'Subdivision Map Act parcel map content requirements; County Surveyor checking standards; Title report review requirements; Monumentation standards per state law',
  soc_controls = 'SOC 2 PI1.1 (parcel dimension and legal description accuracy); SOC 2 CC6.3 (PLS seal authentication); SOC 2 CC2.1 (advisory agency processing documentation); SOC 2 CC8.1 (parcel map amendment tracking)'
WHERE name = 'Professional Land Surveyor (PLS) — Parcel Map Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'California BPC 8762-8773 (Records of Survey); California BPC 8772-8773 (Corner Records); County Surveyor review standards; State Board regulations on mandatory filing triggers',
  standards_of_creation = 'State-prescribed Record of Survey content/format (California BPC 8764); State-prescribed Corner Record content/format (California BPC 8773); County Surveyor submission requirements; Basis of bearings, monuments found/set, discrepancy notes',
  soc_controls = 'SOC 2 PI1.1 (monument position and reference accuracy); SOC 2 CC6.3 (PLS seal and recorder filing authentication); SOC 2 A1.2 (recorded survey document retrieval); SOC 2 CC8.1 (amendment record tracking)'
WHERE name = 'Professional Land Surveyor (PLS) — Record of Survey';

-- B3. Construction and Topographic Surveying

UPDATE citizen_catalog SET
  governing_guidelines = 'State PLS Act provisions on construction staking; State DOT Survey Manual (e.g., Caltrans Surveys Manual); AASHTO Guide for Design-Build Procurement; Contract specifications for survey control',
  standards_of_creation = 'State DOT survey accuracy standards (e.g., Caltrans Surveys Manual Chapter 4); FGDC-STD-007.1-1998 (Geospatial Positioning Accuracy); Project-specific staking tolerances; AASHTO survey accuracy requirements',
  soc_controls = 'SOC 2 PI1.1 (staking position accuracy and tolerance compliance); SOC 2 CC6.1 (survey data management controls); SOC 2 CC8.1 (field revision documentation); SOC 2 CC2.1 (cut sheet and staking report distribution)'
WHERE name = 'Construction Surveyor / Survey Party Chief (PLS or under PLS direction)';

UPDATE citizen_catalog SET
  governing_guidelines = 'State PLS Act provisions on topographic surveying; ASPRS Positional Accuracy Standards for Digital Geospatial Data (2015); USGS Standards for Digital Elevation Models; FGDC-STD-007.3-1998 (NSSDA)',
  standards_of_creation = 'ASPRS Positional Accuracy Standards Table 2 (Vertical accuracy classes); USGS NMAS; State DOT topographic survey specifications; ASCE 38-22 (Investigating Existing Utilities)',
  soc_controls = 'SOC 2 PI1.1 (elevation data and contour accuracy); SOC 2 CC6.3 (PLS seal on topographic deliverables); SOC 2 CC8.1 (topographic data revision tracking); SOC 2 A1.2 (topographic dataset archival and access)'
WHERE name = 'Professional Land Surveyor (PLS) — Topographic Survey';

-- B4. Geodetic and Geospatial Surveying

UPDATE citizen_catalog SET
  governing_guidelines = 'NGS specifications (FGDC-STD-007); NGS Input Formats and Specifications (Bluebooking); NOAA Technical Memoranda NOS NGS series; State geodetic control standards',
  standards_of_creation = 'FGDC-STD-007.1-1998 (Reporting Methodology); NGS Guidelines for GPS-Derived Ellipsoid Heights (NOAA TM NOS NGS 58); NGS Guidelines for GPS-Derived Orthometric Heights (NOS NGS 59); NSRS modernization standards (NATRF2022/NAPGD2022)',
  soc_controls = 'SOC 2 PI1.1 (positional accuracy per geodetic network order/class); SOC 2 CC6.1 (geodetic database and CORS station data controls); SOC 2 A1.2 (geodetic control monument preservation); SOC 2 CC8.1 (datum transformation documentation)'
WHERE name = 'Professional Land Surveyor (PLS) — Geodetic Control';

UPDATE citizen_catalog SET
  governing_guidelines = 'GISCI Certified GIS Professional (GISP) standards; OGC Standards (WMS, WFS, WCS, GML, GeoJSON); ISO 19115:2014 (Geographic information — Metadata); FGDC CSDGM; Executive Order 12906 (NSDI)',
  standards_of_creation = 'ISO 19115-1:2014 (Metadata — Fundamentals); ISO 19157:2013 (Data quality); FGDC-STD-001-1998 (CSDGM); OGC Encoding Standards (GML 3.3, KML 2.3, GeoPackage 1.3)',
  soc_controls = 'SOC 2 PI1.1 (spatial data accuracy and attribute completeness); SOC 2 CC6.1 (GIS database and web service access controls); SOC 2 A1.1 (GIS web service uptime and redundancy); SOC 2 C1.1 (sensitive geographic data access restrictions)'
WHERE name = 'Geographic Information Systems Professional (GISP) / GIS Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'ASPRS Positional Accuracy Standards for Digital Geospatial Data (2015); ASPRS LiDAR Guidelines; USGS Lidar Base Specification Version 2.1 (2023); ASPRS CP/CMS-RS certification requirements',
  standards_of_creation = 'ASPRS Positional Accuracy Standards Tables 1-3; USGS Lidar Base Specification Section 4 (Acquisition); ASPRS LAS Format Specification (1.4-R15); FGDC-STD-007.3-1998 (NSSDA)',
  soc_controls = 'SOC 2 PI1.1 (point cloud accuracy and classification); SOC 2 CC6.1 (LiDAR/imagery data management controls); SOC 2 A1.2 (massive dataset storage and retrieval); SOC 2 C1.1 (high-resolution imagery access restrictions)'
WHERE name = 'Certified Photogrammetrist (CP) / LiDAR Mapping Specialist';

-- B5. Floodplain, Wetland, and Hydrographic Surveying

UPDATE citizen_catalog SET
  governing_guidelines = 'National Flood Insurance Act 42 USC 4001-4131; 44 CFR Parts 59-78 (NFIP); FEMA Guidelines and Specifications for Flood Hazard Mapping Partners (2020); ASFPM CFM certification requirements',
  standards_of_creation = 'FEMA Guidelines Appendix A-M; FEMA Procedure Memoranda for Flood Risk Analysis and Mapping; FEMA FIRM production standards; FEMA LOMA/LOMR application requirements',
  soc_controls = 'SOC 2 PI1.1 (BFE and floodplain boundary accuracy); SOC 2 CC6.1 (FEMA Map Service Center database controls); SOC 2 A1.1 (flood map data public access); SOC 2 CC2.1 (appeal and comment period documentation)'
WHERE name = 'Certified Floodplain Manager (CFM) / FEMA Floodplain Mapping Engineer (PE)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Clean Water Act 404 33 USC 1344; USACE Wetlands Delineation Manual (1987); USACE Regional Supplements; EPA/USACE Navigable Waters Protection Rule',
  standards_of_creation = 'USACE 1987 Delineation Manual Section D (Routine determination); USACE Regional Supplement Section 5; USACE JD form requirements; USACE ENG Form 6116 (Wetland Determination Data Form)',
  soc_controls = 'SOC 2 PI1.1 (boundary delineation accuracy and data point reliability); SOC 2 CC6.1 (wetland database and GIS data controls); SOC 2 CC2.1 (USACE coordination and JD documentation); SOC 2 A1.2 (wetland delineation record archival)'
WHERE name = 'Professional Wetland Scientist (PWS) / Certified Wetland Delineation Specialist with PLS survey integration';

UPDATE citizen_catalog SET
  governing_guidelines = 'IHO S-44 6th Edition (2020); IHO S-5A/S-5B (Competence Standards); NOAA HSSD 2023; USACE EM 1110-2-1003 (Hydrographic Surveying)',
  standards_of_creation = 'IHO S-44 Table 1 (Minimum standards by order); NOAA HSSD Chapters 3-5; IHO S-57 (Digital Hydrographic Data Transfer); IHO S-100/S-102 (Universal Hydrographic Data Model)',
  soc_controls = 'SOC 2 PI1.1 (bathymetric data accuracy per IHO order); SOC 2 CC6.1 (hydrographic database and chart data controls); SOC 2 A1.2 (nautical chart correction and update distribution); SOC 2 CC8.1 (survey dataset versioning)'
WHERE name = 'Certified Hydrographic Surveyor (Cat A or B per IHO) / Professional Land Surveyor (PLS) — Hydrographic';

-- B6. Specialty and Industry-Specific Surveying

UPDATE citizen_catalog SET
  governing_guidelines = 'State property law (easement creation, appurtenant vs. in gross, prescriptive); ALTA/NSPS 2021 Table A Item 4 (Easements); State recording requirements; Utility company and public agency easement standards',
  standards_of_creation = 'State-specific legal description drafting standards for easements; ALTA/NSPS 2021 Section 5.B.ii (Easement depiction); Title company survey requirements for insuring easements; State recording statutes',
  soc_controls = 'SOC 2 PI1.1 (easement boundary location accuracy); SOC 2 CC6.3 (PLS seal on easement survey and legal description); SOC 2 P1.1 (property owner information protection); SOC 2 CC2.1 (title company coordination documentation)'
WHERE name = 'Professional Land Surveyor (PLS) — Easement/Right-of-Way';

UPDATE citizen_catalog SET
  governing_guidelines = 'General Mining Law of 1872 30 USC 22-54; BLM Manual of Surveying Instructions (2009) Chapter 10; 43 CFR Part 3860 (Mineral Patent Surveys); State oil and gas commission regulations',
  standards_of_creation = 'BLM Manual Chapter 10 (Mineral survey procedures); 43 CFR 3861 (Survey requirements for mineral patent); State oil well survey requirements (e.g., California DOGGR); AAPG survey standards',
  soc_controls = 'SOC 2 PI1.1 (claim boundary and well location accuracy); SOC 2 CC6.1 (BLM mining claim database controls); SOC 2 A1.2 (historical mining/mineral survey records); SOC 2 CC6.3 (PLS seal authentication for patent application)'
WHERE name = 'Professional Land Surveyor (PLS) — Mining/Mineral Survey';

UPDATE citizen_catalog SET
  governing_guidelines = '49 CFR Part 192 (Gas pipeline ROW); FERC 18 CFR Part 157 (Pipeline ROW); State PUC pipeline and utility ROW requirements; ASCE 38-22 (Investigating Existing Utilities)',
  standards_of_creation = 'ASCE 38-22 Quality Levels A-D (Utility investigation); One-Call/USA North 811 marking standards; State-specific utility easement description standards; Project-specific corridor survey specifications',
  soc_controls = 'SOC 2 PI1.1 (utility location accuracy per ASCE quality level); SOC 2 CC6.1 (utility mapping database controls); SOC 2 C1.1 (critical infrastructure location data protection); SOC 2 CC2.1 (utility coordination and conflict resolution documentation)'
WHERE name = 'Professional Land Surveyor (PLS) — Utility/Pipeline/Infrastructure Route';

UPDATE citizen_catalog SET
  governing_guidelines = 'California BPC 8771 (Monument preservation); California Penal Code 605 (Monument destruction); Local agency monument preservation ordinances; FGDC geodetic control standards',
  standards_of_creation = 'State Corner Record format and content requirements; State monument preservation procedures per DOT/public works; County Surveyor monument inventory/tracking standards; FGDC-STD-007 geodetic control documentation',
  soc_controls = 'SOC 2 PI1.1 (monument position recovery accuracy); SOC 2 CC6.3 (PLS seal on corner records); SOC 2 A1.2 (monument database and historical record access); SOC 2 CC8.1 (monument disturbance and replacement tracking)'
WHERE name = 'Professional Land Surveyor (PLS) — Monument Preservation';

-- ============================================================================
-- SECTION 3: URBAN PLANNING / ZONING (17 Personas)
-- ============================================================================

-- C1. Comprehensive and Long-Range Planning

UPDATE citizen_catalog SET
  governing_guidelines = 'California Gov. Code 65300-65303.4; OPR General Plan Guidelines (2017); APA PAS reports on comprehensive planning; AICP Code of Ethics and Professional Conduct',
  standards_of_creation = 'Gov. Code 65302 (Mandatory elements: land use, circulation, housing, conservation, open-space, noise, safety, environmental justice); OPR General Plan Guidelines Chapter 4; Gov. Code 65300.5 (Internal consistency); Public participation requirements',
  soc_controls = 'SOC 2 PI1.1 (demographic data and projection accuracy); SOC 2 CC2.1 (public hearing notices, comment records, adoption documentation); SOC 2 A1.1 (public access to general plan documents); SOC 2 CC8.1 (amendment tracking and consistency analysis)'
WHERE name = 'AICP-Certified Planner — Long-Range Planning / General Plan Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'California Gov. Code 65450-65457; General plan consistency requirements; CEQA requirements for specific plan adoption; Local agency specific plan procedures',
  standards_of_creation = 'Gov. Code 65451 (Specific plan content: land use, infrastructure, development standards, implementation); State consistency requirements; EIR or programmatic environmental review standards; Phasing and financing plan documentation',
  soc_controls = 'SOC 2 PI1.1 (land use data and infrastructure capacity analysis accuracy); SOC 2 CC2.1 (public hearing and adoption documentation); SOC 2 A1.1 (public access to specific plan documents); SOC 2 CC8.1 (specific plan amendment tracking)'
WHERE name = 'AICP-Certified Planner — Specific Plan / Area Plan Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'California Gov. Code 65580-65589.11 (Housing Element Law); Gov. Code 65584-65584.09 (RHNA methodology); HCD Housing Element Compliance Review Guidelines; AB 72 (HCD enforcement authority)',
  standards_of_creation = 'Gov. Code 65583 (Housing element content: needs assessment, constraints analysis, sites inventory, programs); HCD Building Blocks methodology; AFFH analysis (AB 686); APR format per HCD',
  soc_controls = 'SOC 2 PI1.1 (RHNA allocation data and sites inventory accuracy); SOC 2 CC2.1 (HCD review correspondence and compliance certification); SOC 2 CC4.1 (annual progress report tracking); SOC 2 A1.1 (public access to housing element documents)'
WHERE name = 'AICP-Certified Planner — Housing Policy / Housing Element Specialist';

-- C2. Zoning and Entitlements

UPDATE citizen_catalog SET
  governing_guidelines = 'California Gov. Code 65800-65912; Local zoning ordinance; State Planning and Zoning Law Gov. Code 65000 et seq.; Standard State Zoning Enabling Act (SZEA) legacy framework',
  standards_of_creation = 'Local zoning ordinance — use regulations, development standards, procedures; Zoning consistency with general plan (Gov. Code 65860); Notice and hearing requirements per state law; Findings of fact requirements for discretionary decisions',
  soc_controls = 'SOC 2 PI1.1 (zoning determination accuracy); SOC 2 CC2.1 (public notice, hearing record, decision documentation); SOC 2 CC6.1 (zoning database and permit tracking controls); SOC 2 CC8.1 (zoning amendment and text change tracking)'
WHERE name = 'Zoning Administrator / Zoning Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'California Gov. Code 65901-65906 (CUP); Local zoning ordinance CUP provisions; State hearing and notice requirements; CEQA/NEPA compliance for CUP issuance',
  standards_of_creation = 'Local CUP application form and submittal requirements; Required findings of fact per local ordinance; Conditions of approval standard format; Environmental determination documentation per CEQA',
  soc_controls = 'SOC 2 PI1.1 (project description and findings accuracy); SOC 2 CC2.1 (notice, hearing, and appeal documentation); SOC 2 CC6.1 (permit tracking system controls); SOC 2 A1.1 (public access to CUP records)'
WHERE name = 'Associate/Senior Planner — Conditional Use Permit Analysis';

UPDATE citizen_catalog SET
  governing_guidelines = 'California Gov. Code 65906 (Variance); Local zoning ordinance variance provisions; Constitutional unnecessary hardship / special circumstances standards; Topanga Assn. v. County of Los Angeles precedent',
  standards_of_creation = 'Required findings: special circumstances, no special privilege, general plan consistency, not injurious; Staff report format and analysis requirements; Notice and hearing documentation; Environmental review documentation',
  soc_controls = 'SOC 2 PI1.1 (hardship/special circumstances analysis accuracy); SOC 2 CC2.1 (hearing record and decision documentation); SOC 2 CC6.1 (permit tracking system controls); SOC 2 A1.1 (public access to variance records)'
WHERE name = 'Planner — Variance/Adjustment Analysis';

-- C3. Environmental Review and Compliance (Planning)

UPDATE citizen_catalog SET
  governing_guidelines = 'CEQA PRC 21000-21189; CEQA Guidelines CCR Title 14 Division 6 Chapter 3; OPR CEQA Technical Advisories; Judicial interpretation of CEQA requirements',
  standards_of_creation = 'CEQA Guidelines 15063 (Initial Study); 15070-15075 (ND/MND); 15120-15132 (EIR content); 15300-15333 (Categorical Exemptions); 15183 (Consistency with community plan/general plan/zoning)',
  soc_controls = 'SOC 2 PI1.1 (environmental analysis accuracy and substantial evidence); SOC 2 CC2.1 (public review period, comment response, NOD/NOC filing); SOC 2 CC6.1 (CEQA document management controls); SOC 2 A1.1 (State Clearinghouse filing and public access)'
WHERE name = 'AICP-Certified Planner / Environmental Planner — CEQA Lead';

UPDATE citizen_catalog SET
  governing_guidelines = 'ITE Transportation Impact Analysis for Site Development (2010); ITE Trip Generation Manual 11th Edition; Highway Capacity Manual 7th Edition; Local agency TIA guidelines; SB 743 (VMT-based analysis)',
  standards_of_creation = 'ITE TIA methodology; Local agency TIA scoping agreement and format; OPR Technical Advisory on SB 743 implementation; HCM intersection and segment analysis methodologies',
  soc_controls = 'SOC 2 PI1.1 (traffic model calibration, trip generation, VMT calculation accuracy); SOC 2 CC6.3 (PE seal on TIA documents); SOC 2 CC2.1 (agency review and comment response); SOC 2 CC8.1 (TIA revision and addendum tracking)'
WHERE name = 'Licensed Professional Engineer (PE, Traffic) / AICP Planner — Transportation';

-- C4. Development Finance and Special Districts

UPDATE citizen_catalog SET
  governing_guidelines = 'California Gov. Code 66000-66025 (Mitigation Fee Act); GFOA Best Practices; Proposition 218 (California); AICP standards for economic analysis',
  standards_of_creation = 'APA PAS methodology for fiscal impact analysis; Gov. Code 66001 (Nexus study requirements); Gov. Code 66006 (Fee accounting and reporting); GFOA recommended practices for capital planning',
  soc_controls = 'SOC 2 PI1.1 (revenue/cost projection accuracy); SOC 2 CC2.1 (public disclosure of fee studies); SOC 2 CC6.1 (financial modeling system controls); SOC 2 CC4.1 (fee collection and expenditure tracking)'
WHERE name = 'Fiscal Impact Analyst / Public Finance Planner (AICP)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Mello-Roos Community Facilities Act 1982 California Gov. Code 53311-53368.3; CDIAC reporting requirements; Gov. Code 53345.1 (Special tax report); Local agency CFD policies',
  standards_of_creation = 'Mello-Roos Act procedural requirements (resolution of intention, hearing, election, levy); Rate and Method of Apportionment (RMA) documentation; Annual special tax levy calculation and reporting; CDIAC annual reporting format',
  soc_controls = 'SOC 2 PI1.1 (special tax calculation accuracy); SOC 2 CC2.1 (property owner notification and election documentation); SOC 2 CC6.1 (tax levy database and financial reporting controls); SOC 2 P1.1 (property owner financial information protection)'
WHERE name = 'Community Facilities District (CFD) Administrator / Special Tax Consultant';

UPDATE citizen_catalog SET
  governing_guidelines = 'California Gov. Code 65864-65869.5; Local agency development agreement ordinances; Vested rights doctrine and statutory vesting map provisions; General plan consistency requirements',
  standards_of_creation = 'Gov. Code 65865.2 (Development agreement content); Required provisions: duration, permitted uses, density, maximum height, percentage of reservation/dedication; Periodic review per 65865.1; Environmental review requirements',
  soc_controls = 'SOC 2 PI1.1 (vested rights and obligations accuracy); SOC 2 CC2.1 (public hearing and execution documentation); SOC 2 CC6.1 (development agreement tracking controls); SOC 2 CC4.1 (periodic compliance review documentation)'
WHERE name = 'Senior Planner / City Attorney — Development Agreements';

-- C5. Land Conservation

UPDATE citizen_catalog SET
  governing_guidelines = 'Williamson Act California Gov. Code 51200-51297.4; CCR Title 14 Division 2 Chapter 6; DOC Williamson Act Status Reports; Local agency implementing ordinances',
  standards_of_creation = 'Gov. Code 51231 (Contract content); Gov. Code 51245-51245.3 (Cancellation procedures); DOC uniform rules for contract administration; Annual filing per Gov. Code 51292',
  soc_controls = 'SOC 2 PI1.1 (contract acreage and valuation accuracy); SOC 2 CC2.1 (contract execution, renewal, cancellation documentation); SOC 2 CC6.1 (agricultural preserve database controls); SOC 2 CC4.1 (compatible use compliance and annual review)'
WHERE name = 'Agricultural Preserve Administrator / Senior Planner — Conservation';

-- C6. Coastal and Airport Land Use

UPDATE citizen_catalog SET
  governing_guidelines = 'California Coastal Act PRC 30000-30900; CCR Title 14 Division 5.5; Local Coastal Program (LCP); CCC Administrative Regulations 14 CCR 13001-13577',
  standards_of_creation = 'Coastal Act 30600 (CDP requirements); Coastal Act 30604 (Permit issuance findings); LCP consistency analysis; CCC application completeness standards (14 CCR 13053.5)',
  soc_controls = 'SOC 2 PI1.1 (coastal resource impact analysis accuracy); SOC 2 CC2.1 (CCC hearing, appeal, public access documentation); SOC 2 CC6.1 (permit tracking and LCP database controls); SOC 2 A1.1 (public access to coastal development records)'
WHERE name = 'Coastal Planner / Coastal Development Permit Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'California PUC 21670-21679.5 (ALUC authority); Caltrans California Airport Land Use Planning Handbook (2011); FAR Part 77 (Navigable Airspace); 14 CFR Part 150 (Airport Noise Compatibility)',
  standards_of_creation = 'Caltrans Handbook Chapters 3-4 (Noise and safety compatibility criteria); ALUC compatibility plan policies and criteria; FAR Part 77 obstruction evaluation; 14 CFR 150 Noise Exposure Maps and Noise Compatibility Programs',
  soc_controls = 'SOC 2 PI1.1 (noise contour and safety zone mapping accuracy); SOC 2 CC2.1 (ALUC referral and consistency determination documentation); SOC 2 CC6.1 (compatibility plan database controls); SOC 2 A1.1 (public access to compatibility determinations)'
WHERE name = 'Airport Land Use Compatibility Planner / ALUC Staff Planner';

-- C7. Design Review and Special Housing

UPDATE citizen_catalog SET
  governing_guidelines = 'Local design review ordinances and design guidelines; California Gov. Code 65913.4 (SB 35); AIA Urban Design Committee guidelines; AICP ethical standards for subjective design review',
  standards_of_creation = 'Local adopted design guidelines (massing, materials, architectural character); Secretary of Interior''s Standards for Rehabilitation; Form-based code provisions; Objective design standards per Gov. Code 65913.4(a)',
  soc_controls = 'SOC 2 PI1.1 (design standard compliance analysis accuracy); SOC 2 CC2.1 (design review hearing records and conditions); SOC 2 CC6.1 (design review project tracking controls); SOC 2 A1.1 (public access to design review records)'
WHERE name = 'Design Review Planner / Urban Design Specialist (AICP / AIA affiliate)';

UPDATE citizen_catalog SET
  governing_guidelines = 'California Gov. Code 65913.4 (SB 35); HCD SB 35 Guidelines (2018); Gov. Code 65852.2 (ADU law); Gov. Code 65852.22 (JADU); AB 2011 / SB 6 (2022)',
  standards_of_creation = 'SB 35 eligibility checklist per HCD guidelines; Objective design/development standard compliance documentation; ADU/JADU compliance checklist per state law; Labor compliance requirements per SB 35',
  soc_controls = 'SOC 2 PI1.1 (eligibility determination accuracy); SOC 2 CC2.1 (application completeness and timeline compliance); SOC 2 CC4.1 (streamlined processing timeline adherence); SOC 2 A1.1 (public access to streamlining determinations)'
WHERE name = 'Housing Compliance Planner — SB 35 Streamlining Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Local inclusionary housing ordinances; California HSC 50000 et seq.; 24 CFR Part 92 (HOME); LIHTC 26 USC 42; CTCAC regulations',
  standards_of_creation = 'Local affordability restriction documentation requirements; Regulatory agreement and deed restriction format; Annual income certification and monitoring report requirements; HCD/CTCAC compliance monitoring forms',
  soc_controls = 'SOC 2 PI1.1 (income verification and rent calculation accuracy); SOC 2 P1.1 (tenant income and personal information protection); SOC 2 CC4.1 (annual compliance review and reporting); SOC 2 CC6.1 (affordable housing database access controls)'
WHERE name = 'Affordable Housing Compliance Officer / Inclusionary Housing Monitor';

-- C8. Growth Management and Community Benefits

UPDATE citizen_catalog SET
  governing_guidelines = 'State growth management statutes (e.g., California SB 375); Gov. Code 65302.4 (Air quality/GHG); RTP/SCS; CEQA Guidelines 15064.3 (VMT criteria)',
  standards_of_creation = 'Growth management element format per state/local requirements; APF ordinance analysis documentation; Urban growth boundary / urban limit line documentation; Capital improvement program (CIP) integration',
  soc_controls = 'SOC 2 PI1.1 (growth projection and capacity analysis accuracy); SOC 2 CC2.1 (growth management policy adoption documentation); SOC 2 CC4.1 (growth indicator tracking and reporting); SOC 2 A1.1 (public access to growth data)'
WHERE name = 'AICP-Certified Planner — Growth Management';

UPDATE citizen_catalog SET
  governing_guidelines = 'Local CBA enabling ordinances; Partnership for Working Families best practices; California Labor Code 1720 et seq. (Prevailing wage tied to CBAs); Local hire and workforce development ordinances',
  standards_of_creation = 'CBA negotiation and execution documentation; Community benefit performance metrics and reporting; Local hire/apprenticeship tracking documentation; Annual compliance monitoring report format',
  soc_controls = 'SOC 2 PI1.1 (benefit delivery tracking accuracy); SOC 2 CC2.1 (community reporting and transparency documentation); SOC 2 CC4.1 (benefit compliance tracking); SOC 2 P1.1 (worker personal information in local hire tracking)'
WHERE name = 'CBA Compliance Analyst / Community Development Planner';

UPDATE citizen_catalog SET
  governing_guidelines = 'Subdivision Map Act California Gov. Code 66410-66499.58; Local subdivision ordinance; CEQA requirements for subdivision approval; Gov. Code 66473.5 (general plan consistency)',
  standards_of_creation = 'Subdivision Map Act application requirements (tentative map content per 66434); Local agency tentative map application form; Conditions of approval standard format; Environmental determination documentation',
  soc_controls = 'SOC 2 PI1.1 (lot configuration and infrastructure analysis accuracy); SOC 2 CC2.1 (hearing, condition, appeal documentation); SOC 2 CC6.1 (subdivision tracking system controls); SOC 2 CC4.1 (condition compliance tracking)'
WHERE name = 'Associate/Senior Planner — Subdivision Review';

-- ============================================================================
-- SECTION 4: ELDER CARE / AGING (23 Personas)
-- ============================================================================

-- A1. Facility Administration & Licensing

UPDATE citizen_catalog SET
  governing_guidelines = '42 CFR Part 483 (Requirements for LTC Facilities); 42 CFR 483.70 (Administration); 42 CFR 483.75 (QAPI); Cal. HSC 1250 et seq. (Health Facility Licensing); Cal. HSC 1265-1268.5; 22 CCR Division 5; 22 CCR 72501-72527',
  standards_of_creation = 'State-approved AIT program (1,000 hours); NAB examination; California LNHA license; 40 hours CE per 2-year cycle; DOJ/FBI Live Scan background check',
  soc_controls = 'CMS-2567 Statement of Deficiencies reviewed by CMS; CDPH facility inspection independent of facility management; QAPI program self-assessment with external survey verification; staffing ratio compliance per Cal. HSC 1276.2 audited separately'
WHERE name = 'Skilled Nursing Facility Administrator (LNHA/NHA)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. HSC 1569 et seq. (RCFE); Cal. HSC 1569.62 (Training Requirements); Cal. HSC 1569.269 (Resident Rights); Cal. HSC 1569.682 (Transfer Notification); Cal. HSC 1569.695 (Emergency Plans); 22 CCR Division 6 Chapter 8; 22 CCR 87101-87972',
  standards_of_creation = 'RCFE Administrator Certification Program (80 hours initial, 40 hours CE per 2 years); CDSS certification examination; DOJ/FBI clearance; First aid/CPR certification; Annual fire clearance',
  soc_controls = 'CDSS licensing and inspection independent of facility; resident rights documentation per HSC 1569.269; theft/loss program per HSC 1569.153; emergency plan compliance per HSC 1569.695 reviewed by fire authority separately'
WHERE name = 'Assisted Living / RCFE Administrator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. HSC 1771 et seq. (Continuing Care Contracts); Cal. HSC 1771.7 (Resident Civil Rights); Cal. HSC 1788 (Required Contract Contents); Cal. HSC 1793.80-1793.81 (Closure Notification); Cal. Insurance Code (Financial solvency); 42 CFR Part 483 (SNF component)',
  standards_of_creation = 'LNHA license (if SNF component); CCRC-specific administrator certification; Multi-level care management experience; Background check clearance',
  soc_controls = 'CDSS oversight of continuing care contracts; CDI reviews financial solvency reserves; CCRC contracts require 18 elements per HSC 1788; closure notification 120/90-day requirements per HSC 1793.80-1793.81; actuarial studies by independent actuary'
WHERE name = 'Continuing Care Retirement Community (CCRC) Executive Director';

-- A2. Clinical Care & Nursing

UPDATE citizen_catalog SET
  governing_guidelines = '42 CFR 483.35 (Nursing Services); 42 CFR 483.21 (Comprehensive Person-Centered Care Planning); Cal. HSC 1276.2 (Staffing Ratios); 16 CCR 1443.5 (Scope of Practice RN); Cal. BPC 2725 (Nursing Practice Act); 22 CCR 72309-72329',
  standards_of_creation = 'Active California RN license (BRN); BSN minimum; 1 year supervisory nursing experience in LTC; Current CPR/BLS; 30 hours CE per 2-year cycle',
  soc_controls = 'Staffing ratio compliance per Cal. HSC 1276.2 audited by CDPH; MDS 3.0 assessment accuracy verified by CMS; fall prevention documentation reviewed during survey; infection control surveillance independently verified'
WHERE name = 'Director of Nursing (DON) — Long-Term Care';

UPDATE citizen_catalog SET
  governing_guidelines = '42 CFR 483.30 (Physician Services); 42 CFR 483.40 (Behavioral Health); Cal. BPC 2050-2079 (Medical Practice Act); 16 CCR 1356 (Unprofessional Conduct); Cal. HSC 1261.4 (SNF Medical Director); AMA Code of Medical Ethics',
  standards_of_creation = 'MD/DO from accredited school; Completed residency in Internal Medicine or Family Medicine; Active California medical license; DEA registration; Board certification (ABIM or ABFM); 50 CME hours per renewal cycle',
  soc_controls = 'Physician orders verified by pharmacist (monthly drug regimen review); POLST forms per Cal. HSC 1861 et seq.; psychotropic drug justifications per CMS F-Tag requirements; death certificate attestation per CDPH vital records'
WHERE name = 'Geriatrician / Attending Physician — Long-Term Care';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. BPC 2859-2895 (Vocational Nursing Practice Act); 16 CCR 2540-2594 (BVNPT Regulations); 22 CCR Division 5 (SNF Nursing Standards); 42 CFR 483.35 (Nursing Services)',
  standards_of_creation = 'State-approved LVN program (12-18 months); NCLEX-PN examination; Active California LVN license; DOJ/FBI clearance; 30 hours CE per renewal cycle',
  soc_controls = 'MAR entries verified by RN or DON; wound care treatment records reviewed during survey; incident/accident reports investigated independently; blood glucose monitoring calibrated and documented'
WHERE name = 'Licensed Vocational Nurse (LVN) — Long-Term Care';

UPDATE citizen_catalog SET
  governing_guidelines = '42 CFR 483.35(d) (Nurse Aide Requirements); 42 CFR Part 483 Subpart D (Training and Competency); Cal. HSC 1337-1338 (CNA Certification); 22 CCR 71835-71841 (Nurse Assistant Training)',
  standards_of_creation = 'State-approved CNA program (minimum 160 hours: 60 classroom, 100 clinical); State competency evaluation (written + skills); California Nurse Aide Registry listing; DOJ/FBI clearance; 48 hours in-service per 2-year cycle',
  soc_controls = 'ADL documentation verified during survey; repositioning/turning schedules audited for compliance; incident reports investigated by DON separately; restorative nursing documentation tied to care plan goals'
WHERE name = 'Certified Nursing Assistant (CNA)';

UPDATE citizen_catalog SET
  governing_guidelines = '42 CFR Part 418 (Hospice Conditions of Participation); 42 CFR 418.54 (Initial and Comprehensive Assessment); Cal. HSC 1339.31-1339.44 (Hospice Licensure); Cal. HSC 1746-1749; Cal. HSC 442-442.5; Cal. HSC 443.1-443.19 (End of Life Option Act)',
  standards_of_creation = 'Active California MD/DO license; Board certification HPM (ABMS subspecialty); DEA registration (Schedule II-V); 50 CME hours per renewal cycle',
  soc_controls = 'Certification of terminal illness by two physicians; IDG care plan reviewed independently; controlled substance records reconciled; bereavement services per HSC 1746(a) (1 year minimum); death certificates per CDPH requirements'
WHERE name = 'Hospice Medical Director';

UPDATE citizen_catalog SET
  governing_guidelines = '42 CFR 418.64 (Core Services — nursing); 42 CFR 418.56 (Interdisciplinary Group); Cal. HSC 1339.44 (Hospice Staffing); Cal. BPC 2725 (Nursing Practice Act)',
  standards_of_creation = 'Active California RN license; CHPN certification preferred; Hospice orientation and competency training; 30 hours CE per renewal cycle',
  soc_controls = 'Care plan updates verified at IDG meetings; symptom management documented against plan goals; medication reconciliation reviewed by pharmacist; death pronouncement documentation per state requirements'
WHERE name = 'Hospice Registered Nurse Case Manager';

-- A3. Protective Services & Legal Advocacy

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. WIC 15600 et seq. (Elder Abuse Civil Protection Act); Cal. WIC 15630-15634 (Mandated Reporting); Cal. WIC 15640 (Report to Law Enforcement); Cal. WIC 15650-15658; Cal. WIC 15763 (24/7 Emergency Response)',
  standards_of_creation = 'MSW or BSW from accredited program; State social worker classification; DOJ/FBI clearance; Specialized elder abuse investigation training; Mandated reporter training (AB 1432)',
  soc_controls = 'SOC 341 reports cross-reported to law enforcement per WIC 15640; safety assessments independent of service plans; confidentiality per WIC 15633; financial abuse reports per WIC 15630.1-15630.2 filed separately from general abuse reports'
WHERE name = 'Adult Protective Services (APS) Social Worker';

UPDATE citizen_catalog SET
  governing_guidelines = '42 USC 3058g (Older Americans Act Title VII); 45 CFR Part 1324; Cal. WIC 9700-9742 (Long-Term Care Ombudsman Act); Cal. HSC 1439.6 (Transfer/Discharge Notices); Cal. HSC 1569.686 (RCFE Closure Notice)',
  standards_of_creation = 'State-certified Ombudsman training (36 hours initial); 18 hours annual training; DOJ/FBI clearance; Designation by State LTCO; Conflict of interest screening',
  soc_controls = 'Complaint investigation reports independent of facility; facility visit logs maintained separately; referrals to licensing agencies and law enforcement documented; systemic advocacy reports to ACL; resident council meeting records'
WHERE name = 'Long-Term Care Ombudsman';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. BPC 6500-6592 (Professional Fiduciaries Act); Cal. Probate Code 1800 et seq. (Conservatorships); Cal. Probate Code 2356.5 (LPS Conservatorship); Cal. Probate Code 4126; Cal. Probate Code 4206; 16 CCR 4560-4582',
  standards_of_creation = 'Licensed Professional Fiduciary (LPF); 30 hours pre-licensing education; Professional Fiduciaries Bureau examination; $50,000 surety bond minimum; DOJ/FBI clearance; 15 hours CE per year',
  soc_controls = 'Biennial court accountings per Probate Code 2620; inventories and appraisals per Probate Code 2610; surety bond independently verified; court-filed status reports; real property management documents reviewed by court'
WHERE name = 'Professional Fiduciary / Conservator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Rules of Professional Conduct; Cal. Probate Code Divisions 4-4.7; Cal. WIC 15657.03 (Protective Orders for Elders); Cal. WIC 15657.8 (Settlement Agreements); Cal. Probate Code 4458; ABA Model Rules; NAELA Standards',
  standards_of_creation = 'JD from ABA-accredited law school; Active California State Bar membership; CELA certification optional; 25 hours MCLE per 3-year period (including 4 ethics, 1 competence)',
  soc_controls = 'Powers of attorney per Probate Code 4126/4400-4465; advance directives per Probate Code 4700-4701; Medi-Cal asset protection reviewed by DHCS; elder abuse restraining orders per WIC 15657.03 issued by court independently'
WHERE name = 'Elder Law Attorney';

-- A4. Regulatory Compliance & Assessment

UPDATE citizen_catalog SET
  governing_guidelines = '42 CFR Part 488 (Survey, Certification, Enforcement); 42 CFR 488.26 (Surveyor Qualifications); Cal. HSC 1254 (State Inspection Duty); Cal. HSC 1266; State Operations Manual (SOM) CMS Pub. 100-07; Appendix PP',
  standards_of_creation = 'Licensed health professional (RN, pharmacist, dietitian); 2 years clinical experience; CMS SMQT; Basic Surveyor Training Course; Annual training updates; CDPH or CMS employment',
  soc_controls = 'CMS-2567 findings independent of facility self-assessment; scope and severity grids per CMS methodology; immediate jeopardy findings trigger separate enforcement; IDR documentation separate from survey; CMP recommendations reviewed by CMS independently'
WHERE name = 'CMS/CDPH Health Facility Surveyor';

UPDATE citizen_catalog SET
  governing_guidelines = '42 CFR 483.20 (Resident Assessment — RAI); CMS RAI Manual Version 3.0; 42 CFR 483.21 (Comprehensive Care Planning); MDS 3.0 Coding Specifications',
  standards_of_creation = 'Active RN or LVN license (RN preferred); RAC-CT from AANAC; MDS 3.0 training program; Annual RAI update training',
  soc_controls = 'MDS assessments (admission, quarterly, annual, significant change) validated by CMS; CAA/CAT triggers independently verified; Quality Measure reports generated by CMS from transmitted data; transmission validation reports; correction documentation audited'
WHERE name = 'MDS Coordinator / RAI Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = '42 CFR Parts 430-456 (Medicaid/Medi-Cal); Cal. WIC 14000 et seq. (Medi-Cal Program); 22 CCR Division 3 (Medi-Cal Regulations); 42 USC 1396; Cal. WIC 14006-14011 (Eligibility Standards)',
  standards_of_creation = 'County eligibility worker classification; State-administered training program; Annual continuing training; DOJ clearance',
  soc_controls = 'Eligibility determinations subject to fair hearing; Share of Cost calculations audited by DHCS; asset/income verification from independent sources; spousal impoverishment calculations per federal formula; estate recovery notices issued by state independently'
WHERE name = 'Medi-Cal / Medicare Eligibility Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Insurance Code 785 (Duty of Honesty to Seniors 65+); Cal. Insurance Code 10230-10237.6 (LTC Insurance Act); NAIC LTC Insurance Model Act; 10 CCR 2222-2222.42',
  standards_of_creation = 'California Property & Casualty or Life & Health license; State licensing examination; Dedicated LTC claims adjuster training; 24 hours CE per renewal cycle; Fair Claims Settlement Practices certification',
  soc_controls = 'Benefit trigger assessments (ADL deficiency) documented independently; claims adjudication reviewed per 10 CCR 2695.1-2695.17; denial/appeal documentation maintained separately; annual premium rate increase reviewed by CDI independently'
WHERE name = 'Long-Term Care Insurance Claims Adjuster';

-- A5. Social Work & Discharge Planning

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. BPC 4996-4996.22 (Clinical Social Worker Practice Act); 16 CCR 1870-1874; 42 CFR 483.40 (Behavioral Health in LTC); NASW Standards for Social Work with Older Adults',
  standards_of_creation = 'MSW from CSWE-accredited program; 3,000 hours supervised clinical experience; ASWB Clinical examination; Active California LCSW license; 36 hours CE per 2-year cycle',
  soc_controls = 'Psychosocial assessments reviewed during survey; discharge planning per HSC 1262.5 verified independently; depression screening (PHQ-9) scores tracked; abuse/neglect screening documentation separate from clinical records'
WHERE name = 'Licensed Clinical Social Worker (LCSW) — Geriatric';

UPDATE citizen_catalog SET
  governing_guidelines = '42 CFR 482.43 (Discharge Planning — Hospitals); 42 CFR 483.15(c) (Transfer and Discharge Rights — LTC); Cal. HSC 1262-1262.5; Cal. HSC 1439.6 (Written Notice); Medicare Conditions of Participation — Utilization Review',
  standards_of_creation = 'RN, LCSW, or equivalent licensed health professional; ACM or CCM preferred; Facility-specific orientation and competency training',
  soc_controls = 'Medicare Important Message notices (IM/CMS-R-193) documented; transfer documents and bed-hold notices per HSC 1439.6; post-acute care referral records verified; patient choice documentation maintained; appeal/grievance records separate from discharge file'
WHERE name = 'Discharge Planner / Utilization Review Coordinator';

-- A6. Pharmacy & Medication Management

UPDATE citizen_catalog SET
  governing_guidelines = '42 CFR 483.45 (Pharmacy Services); 42 CFR 483.45(c) (Monthly Drug Regimen Review); Cal. BPC 4000 et seq.; 16 CCR 1707-1793; CMS F-Tags F755-F761',
  standards_of_creation = 'PharmD from ACPE-accredited program; Active California pharmacist license; CGP from CCGP preferred; DEA registration; 30 hours CE per 2-year cycle',
  soc_controls = 'Monthly drug regimen reviews per 42 CFR 483.45(c); medication error reports investigated separately; controlled substance reconciliation; psychotropic medication consent verified; GDR documentation reviewed during survey'
WHERE name = 'Consultant Pharmacist — Long-Term Care';

-- A7. Specialized Assessments & Fraud Investigation

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. BPC 2900-2999 (Psychology Licensing Law); 16 CCR 1380-1399; Cal. Probate Code 2356.5 (Major Neurocognitive Disorder); APA Practice Guidelines for Dementia Assessment; Houston Conference Guidelines',
  standards_of_creation = 'Doctoral degree (PhD/PsyD) with neuropsychology specialization; APA-accredited internship; 2-year postdoctoral fellowship; Active California psychologist license; ABPP Board Certification preferred; 36 hours CE per 2-year cycle',
  soc_controls = 'Capacity determination reports per Probate Code 2356.5 reviewed by court; standardized cognitive batteries documented; testamentary capacity evaluations independent of requesting party; serial tracking assessments compared longitudinally'
WHERE name = 'Neuropsychologist — Dementia/Cognitive Assessment';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. WIC 15630.1 (Financial Institution Mandated Reporting); Cal. WIC 15630.2 (Broker-Dealer Reporting); Cal. Penal Code 368 (Elder Abuse Criminal); 18 USC 1341/1343 (Wire/Mail Fraud); FINRA Rule 2165',
  standards_of_creation = 'Law enforcement academy training or regulatory investigator classification; CFE from ACFE; Specialized elder financial abuse training; DOJ clearance; FINRA registration (if securities-related)',
  soc_controls = 'SARs filed independently by financial institutions; mandated financial abuse reports per WIC 15630.1; asset tracing documentation separate from investigation; prosecution referral packages reviewed by DA independently; victim restitution calculated separately'
WHERE name = 'Senior Fraud Investigator / Financial Crimes Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'ALCA Standards of Practice; ALCA Code of Ethics; Underlying professional license standards (RN: BPC 2725; LCSW: BPC 4996); Cal. Probate Code (when court-appointed)',
  standards_of_creation = 'Underlying clinical license (RN, LCSW, or equivalent); CMC from National Academy of Certified Care Managers; ALCA membership; Relevant CE per underlying license',
  soc_controls = 'Comprehensive geriatric assessments documented against validated tools; facility evaluation reports independent of referral source; court reports (when court-appointed) reviewed by judge; cost-of-care projections based on actuarial methods'
WHERE name = 'Geriatric Care Manager (Aging Life Care Professional)';

-- ============================================================================
-- SECTION 5: VETERINARY MEDICINE (16 Personas)
-- ============================================================================

-- B1. Veterinary Clinical Practice

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. BPC 4811 (Veterinary Medicine Practice Act); Cal. BPC 4825-4830 (Licensure); Cal. BPC 4826 (Definition of Practice); Cal. BPC 4826.6 (VCPR); 16 CCR 2000-2099; 21 CFR Part 1301 (DEA); AVMA Principles of Ethics',
  standards_of_creation = 'DVM/VMD from AVMA-accredited college (BPC 4846(1)); NAVLE examination; California State Board Examination; Active California veterinary license; DEA registration (Schedule II-V); 36 hours CE per 2-year cycle',
  soc_controls = 'Medical records per 16 CCR 2032.3; controlled substance logs per 21 CFR Part 1304; rabies vaccination certificates per Cal. HSC 121690-121700; euthanasia records require consent documentation; VCPR must exist before treatment'
WHERE name = 'Licensed Veterinarian (DVM)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. BPC 4841.5 (RVT Registration); Cal. BPC 4840-4843 (Veterinary Technician Practice); 16 CCR 2030-2039 (Duties and Supervision); AVMA-CVTEA Standards',
  standards_of_creation = 'AVMA-CVTEA accredited program graduate; VTNE examination; California RVT examination; Active California RVT registration; DOJ/FBI clearance; 20 hours CE per 2-year cycle',
  soc_controls = 'All tasks under DVM supervision; anesthesia monitoring records signed by supervising DVM; medication administration records verified; patient intake/triage documented per 16 CCR 2032.3'
WHERE name = 'Registered Veterinary Technician (RVT)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. BPC 4826 (Scope of Practice); AVMA Guidelines for Veterinary Specialty Organizations; Relevant specialty college standards (e.g., ACVS); 16 CCR 2032.3 (Medical Records)',
  standards_of_creation = 'DVM/VMD degree; Active California license; AVMA-approved residency (3-5 years); Board certification by AVMA-recognized specialty (Diplomate); Specialty-specific CE (40-80 hours per cycle)',
  soc_controls = 'Specialist consultation reports documented per 16 CCR 2032.3; referral correspondence between primary and specialty DVM; specialty surgical operative reports; clinical trial documentation per IACUC protocols'
WHERE name = 'Veterinary Specialist (Board-Certified)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. BPC 4826 (Veterinary Practice); 16 CCR 2032.3 (Medical Records); ACVECC Standards of Practice; AVMA Guidelines for Emergency and Critical Care',
  standards_of_creation = 'DVM/VMD degree; Active California license; ACVECC Diplomate preferred; Emergency/critical care training; DEA registration',
  soc_controls = 'Emergency intake/triage records timestamped; critical care monitoring documented continuously; euthanasia consent and records (emergency); controlled substance emergency use per DEA requirements; client communication records maintained'
WHERE name = 'Emergency/Critical Care Veterinarian';

-- B2. Regulatory & Public Health

UPDATE citizen_catalog SET
  governing_guidelines = '9 CFR Parts 1-4 (Animal Welfare Act); 9 CFR Parts 71-80 (Interstate Transport); 9 CFR Parts 145-147 (NPIP); 7 USC 2131-2159 (AWA); 21 USC 101-135 (Federal Meat Inspection Act); USDA-APHIS NVAP; Cal. FAC 10724',
  standards_of_creation = 'DVM/VMD; Active state license; USDA NVAP accreditation (Category I or II); APHIS orientation/training modules; Species-specific endorsements',
  soc_controls = 'USDA Form 7001 inspection reports filed directly with APHIS; health certificates independently verified by destination state; NPIP certificates per separate APHIS program; disease investigation reports per OIE standards'
WHERE name = 'USDA Veterinary Medical Officer (VMO) / Accredited Veterinarian';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. FAC 529 (Lab Coordination); Cal. FAC 9501-10002 (Animal Disease Control); Cal. FAC 10724 (Health Certificates); Cal. FAC 14405 (Coordination with USDA/FDA/CDC); Cal. FAC 18851 (4-D Rule); 3 CCR Division 2',
  standards_of_creation = 'DVM/VMD; Active California license; California state civil service appointment; Specialized epidemiology and surveillance training',
  soc_controls = 'Quarantine orders enforceable by law; brand inspection documents separate from health certificates; disease outbreak response per OIE protocols; foreign animal disease investigation per USDA/FADDL coordination; laboratory results from accredited labs'
WHERE name = 'State Veterinarian / CDFA Veterinary Staff';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. HSC 121575-121700 (Rabies Control); Cal. HSC 121690 (Vaccination Requirements); Cal. HSC 121700 (Quarantine Authority); 3 CCR 2606 (Quarantine Regulations); NASPHV Compendium of Rabies Prevention',
  standards_of_creation = 'DVM/VMD preferred; County health officer designation or delegation; Rabies control training certification; Authority under county health officer powers',
  soc_controls = 'Animal bite reports mandatory; quarantine orders issued independently of animal owner; rabies specimen submission to state lab; post-exposure prophylaxis coordination with local health officer; euthanasia orders for suspected rabid animals reviewed by veterinarian'
WHERE name = 'Veterinary Public Health Officer / Rabies Control Officer';

-- B3. Animal Welfare & Protection

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code 597-600 (Animal Cruelty); Cal. Penal Code 597.1 (Seizure Authority); Cal. FAC 30501-32003 (Dog Licensing); Cal. Civil Code 1834-1834.5 (Shelter Adoption); Cal. Penal Code 830.9 (Peace Officer Powers); 16 CCR 2000 et seq.',
  standards_of_creation = 'California Animal Control Academy training; PC 830.9 certification (for humane officers); First aid for animals; DOJ/FBI clearance; Euthanasia certification (if performing); Annual in-service training',
  soc_controls = 'Cruelty investigation reports filed with DA; evidence chain of custody maintained independently; court seizure warrants served by peace officer; dangerous animal determinations subject to hearing; stray hold periods per state law enforced'
WHERE name = 'Animal Control Officer / Humane Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'AVMA Guidelines for Veterinary Forensic Investigations; Cal. Penal Code 597 (Animal Cruelty); 9 CFR Parts 1-4 (AWA for institutional animals); IVFSA Standards',
  standards_of_creation = 'DVM/VMD; Active California license; Specialized veterinary forensic pathology training; Evidence collection and chain of custody training; Expert witness qualification',
  soc_controls = 'Forensic examination reports independent of requesting party; necropsy reports per NAME-equivalent standards; evidence chain of custody separate from investigation; toxicology analysis by independent laboratory; courtroom testimony preparation documented'
WHERE name = 'Veterinary Forensic Examiner';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Civil Code 1834-1834.5 (Shelter Adoption); Cal. FAC 30501-31683 (Dog Control); Cal. FAC 31751-31752 (Euthanasia Standards); Cal. Penal Code 599d (Reporting); Asilomar Accords; Cal. FAC 17005-17006 (Shelter Reporting)',
  standards_of_creation = 'CAWA preferred; Euthanasia by injection certification; DOJ/FBI clearance; Municipal/county appointment',
  soc_controls = 'Shelter statistics per Asilomar Accords definitions; annual reporting per PC 599d; euthanasia protocols per FAC 31751-31752 reviewed independently; live release rates tracked publicly; spay/neuter compliance documented'
WHERE name = 'Animal Shelter Director / Manager';

-- B4. Specialty Veterinary Regulation

UPDATE citizen_catalog SET
  governing_guidelines = '21 USC 821-831 (Controlled Substances Act Registration); 21 CFR Parts 1301-1305; Cal. HSC 11150-11165; Cal. BPC 4170 (Dispensing); Cal. BPC 208 (CURES enrollment)',
  standards_of_creation = 'Active DVM/VMD license; DEA registration (Form 224); CURES enrollment per BPC 208; Biennial DEA renewal',
  soc_controls = 'DEA Form 222 for Schedule II orders; Form 41 for destruction with witness; Form 106 for theft/loss; perpetual inventory reconciled; CURES reporting per BPC 208; annual inventory per 21 CFR 1304.11; waste/destruction requires witness documentation'
WHERE name = 'DEA Veterinary Controlled Substance Registrant / Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = '9 CFR Parts 1-4 (AWA exhibition); 7 USC 2131 (AWA exhibitors); 50 CFR Parts 10-24 (USFWS Wildlife); Cal. FGC 2116-2190 (Restricted Species); 14 CCR 671; AZA Accreditation Standards; AAZV Guidelines',
  standards_of_creation = 'DVM/VMD; Active California license; ACZM Diplomate preferred; USDA accreditation; USFWS permits for endangered species; DEA registration',
  soc_controls = 'USDA exhibition license inspection independent; ESA compliance per USFWS permits; CITES documentation for international wildlife; AZA SSP records maintained per AZA standards; quarantine protocols independently verified'
WHERE name = 'Zoo/Exotic Animal Veterinarian';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. BPC 19400-19667 (Horse Racing Law); 4 CCR 1841-1846 (CHRB Veterinary Regulations); Cal. BPC 4826; RMTC National Uniform Medication Program; AAEP Guidelines',
  standards_of_creation = 'DVM/VMD; Active California license; CHRB commission appointment (for racing vets); ABVP Equine Practice certification preferred; DEA registration; Racing pharmacology training',
  soc_controls = 'Pre-race and post-race examination records documented independently; drug testing chain of custody per CHRB; out-of-competition testing records; equine injury/breakdown reports filed with CHRB; trainer medication violation reports separate from vet records'
WHERE name = 'Equine Veterinarian / Racing Commission Veterinarian';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. BPC 4000 et seq. (Pharmacy Law); Cal. BPC 4905 (Small Vet Premises Exemption); Cal. BPC 4920.2 (Animal Blood Products); 16 CCR 1707-1793; 21 CFR Part 530 (Extra-Label Drug Use); AVMA Guidelines on Compounding',
  standards_of_creation = 'PharmD from ACPE-accredited program; Active California pharmacist license; Veterinary pharmacy specialty training; DEA registration; 30 hours CE per renewal cycle',
  soc_controls = 'Compounding records per Board of Pharmacy standards; controlled substance dispensing per 21 CFR; extra-label drug use documented per 21 CFR Part 530; pharmacy inspection reports by Board of Pharmacy; drug recall and adverse event documentation'
WHERE name = 'Veterinary Pharmacist / Veterinary Pharmacy Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'AAFCO Model Bill and Regulations; 21 CFR Part 501 (Animal Food Labeling); 21 CFR Part 582/584 (GRAS for Animal Use); Cal. FAC 14900-14930 (Commercial Feed Act); FDA FSMA Animal Food Rule',
  standards_of_creation = 'Bachelor''s in animal science, chemistry, or related; AAFCO Feed Inspector training; State regulatory inspector appointment (CDFA); Annual AAFCO training conference',
  soc_controls = 'Guaranteed analysis verification by independent laboratory; ingredient declaration audited against AAFCO profiles; manufacturing facility inspections per FSMA; product registration documents reviewed by CDFA; consumer complaint investigations documented separately'
WHERE name = 'AAFCO Feed/Supplement Compliance Inspector';

UPDATE citizen_catalog SET
  governing_guidelines = '28 CFR Part 35 (ADA Title II); 28 CFR Part 36 (ADA Title III); 42 USC 3601-3631 (Fair Housing Act); 24 CFR 100.204 (Reasonable Accommodation); 14 CFR Part 382 (ACAA); Cal. Civil Code 54.1-54.2; Cal. Penal Code 365.7',
  standards_of_creation = 'Licensed mental health professional (for ESA letters); Established therapeutic relationship; DVM for health certification; Familiarity with ADA, FHA, and state service animal laws',
  soc_controls = 'ESA letters require established therapeutic relationship; fraudulent representation per PC 365.7 enforced separately; housing accommodation verified by HUD standards; airline documentation per ACAA 2021 amendments; ADA compliance records maintained independently'
WHERE name = 'Service Animal / ESA Documentation Specialist';

-- ============================================================================
-- SECTION 6: FUNERAL / MORTUARY / DEATH SERVICES (19 Personas)
-- ============================================================================

-- C1. Funeral Direction & Establishment Operations

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. BPC 7615-7636 (Funeral Directors); Cal. BPC 7622 (Examination); Cal. BPC 7622.2 (Establishment Requirement); Cal. BPC 7685.2 (GPL Requirement); Cal. BPC 7725 (Annual Renewal); 16 CFR Part 453 (FTC Funeral Rule)',
  standards_of_creation = 'Associate degree or equivalent (BPC 7619); California funeral director examination (BPC 7622); Active California funeral director license; Licensed funeral establishment (BPC 7622.2); DOJ clearance',
  soc_controls = 'FTC GPL per 16 CFR 453.2 must be provided before contract; itemized statement per 16 CFR 453.2(b)(5); pre-need trust requirements per BPC 7737; contagious disease reporting per HSC 7302; Bureau inspection per BPC 7607'
WHERE name = 'Licensed Funeral Director';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. BPC 7640-7671 (Embalmers); Cal. BPC 7646-7650 (Requirements); Cal. BPC 7666 (2-year Apprenticeship); Cal. BPC 7717 (Anti-Kickback); 16 CCR 1200-1280; OSHA 29 CFR 1910.1048 (Formaldehyde); Cal/OSHA 8 CCR 5217',
  standards_of_creation = 'Accredited mortuary science program graduation; 2-year apprenticeship (BPC 7666); California embalmer examination; Active California embalmer license; OSHA formaldehyde exposure training; DOJ clearance',
  soc_controls = 'Written embalming authorization required; embalming case reports documented; formaldehyde exposure monitoring per OSHA; PPE records maintained; contagious case reporting per HSC 7302; chain of custody for remains documented'
WHERE name = 'Licensed Embalmer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. BPC 7613.5 (Licensed Personnel); Cal. BPC 7622.2 (Licensed Establishment); Cal. BPC 7629 (Misleading Names); Cal. BPC 7630 (License Assignment — audit required); Cal. BPC 7631 (Temporary License on Death); Cal. BPC 7607 (Inspection Authority)',
  standards_of_creation = 'Active funeral director or embalmer license; Licensed establishment per BPC 7622.2; Establishment inspection per BPC 7607; Audit report for assignment per BPC 7630; DOJ clearance',
  soc_controls = 'Bureau inspection reports per BPC 7607; FTC Funeral Rule compliance (GPL posted, available by phone, provided at arrangement); trust account records for pre-need contracts; employee licensure verification; consumer complaint response records'
WHERE name = 'Funeral Establishment Manager / Licensee-in-Charge';

-- C2. Cremation & Alternative Disposition

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. BPC 7672 (Cremated Remains Disposer); Cal. BPC 7712.5 (Crematory License); Cal. BPC 7712.9 ($750 Annual Charge); Cal. HSC 7054.7 (Cremation Procedures); Cal. HSC 7111 (Authorization); Cal. HSC 103050-103055; Local AQMD Rules',
  standards_of_creation = 'Crematory license per BPC 7712.5; Knowledge/experience per Bureau standards; Financial responsibility; Air quality permit from local AQMD; Annual regulatory charge ($750); Facility inspection compliance',
  soc_controls = 'Written cremation authorization per HSC 7111 required; identification verification separate from authorization; air quality permits and emissions monitored by AQMD independently; pacemaker/prosthetic removal documented; chain of custody for remains maintained throughout'
WHERE name = 'Crematory Operator / Licensee';

UPDATE citizen_catalog SET
  governing_guidelines = 'Green Burial Council Standards and Certification; Cal. HSC 7100 et seq. (Disposition of Human Remains); Cal. HSC 8340 et seq. (Cemetery Act); Local health department regulations; CEQA where applicable',
  standards_of_creation = 'Green Burial Council Certified Provider training; Knowledge of local environmental/health regulations; Cemetery or funeral director license; Ongoing GBC education',
  soc_controls = 'Chemical-free preparation verification (no embalming); burial depth and location compliance per local health; environmental impact documentation; GPS/survey plot records; consumer disclosure of alternatives to traditional burial'
WHERE name = 'Green/Natural Burial Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. HSC 7054.7 (Hydrolysis Procedures); Cal. BPC 7672(a) (Hydrolyzed Human Remains language); Cal. Water Code (Effluent discharge); Local POTW permits',
  standards_of_creation = 'Crematory or funeral establishment license; Equipment-specific operation training; Wastewater discharge permit compliance; CDPH approval for hydrolysis equipment',
  soc_controls = 'Hydrolysis authorization forms documented; effluent monitoring and discharge per POTW permit; remains identification verification maintained; chain of custody records; wastewater permit compliance monitored by local sewer authority independently'
WHERE name = 'Alkaline Hydrolysis (Water Cremation) Technician';

-- C3. Death Registration & Vital Records

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. HSC 102100-103150 (Vital Records); Cal. HSC 102875 (Death Certificate Two-Section Structure); Cal. HSC 103526 (Certified Copy Processing); Cal. HSC 103625 (Fees); 45 CFR Part 164 (HIPAA); CDC/NCHS Model State Vital Statistics Act',
  standards_of_creation = 'County or city appointment as deputy registrar; Training by CDPH Vital Records Branch; Background clearance; CA-EDRS certification',
  soc_controls = 'Death certificates per HSC 102875 two-section structure (fact of death + medical cause); amendments/corrections documented; certified copy issuance per HSC 103526 tracked; delayed registration documented; SSA death notification filed separately'
WHERE name = 'Deputy Local Registrar / Vital Records Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Gov. Code 27460-27521 (Coroner Duties); Cal. Gov. Code 27491 (Cases Requiring Investigation); Cal. HSC 102850-102870 (Medical Certification of Death); Cal. Penal Code 187-199; NAME Standards; Cal. Gov. Code 27460',
  standards_of_creation = 'Medical examiner: MD/DO with forensic pathology board certification (ABP); Coroner: elected/appointed county official; Forensic pathology fellowship (for MEs); NAME accreditation compliance; Medicolegal death investigation training',
  soc_controls = 'Autopsy reports per NAME standards; toxicology analysis by independent laboratory; manner/cause determination independent of requesting party; evidence collection per law enforcement standards; scene investigation documentation maintained separately from autopsy'
WHERE name = 'Coroner / Medical Examiner';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. HSC 102875 (Death Certificate Medical Section); Cal. HSC 102850 (Physician Certification of Cause); 42 CFR Part 418 (Hospice CoP); WHO ICD-10 Cause of Death Coding; CDC Physicians'' Handbook on Medical Certification of Death',
  standards_of_creation = 'Active California MD/DO license; Training in cause-of-death certification (CDC guidelines); Understanding of ICD-10 coding; Hospice attending physician designation (if hospice patient)',
  soc_controls = 'Death certificate medical certification per CDC cause-of-death chain; pronouncement of death records documented; amendments to cause of death tracked; CA-EDRS electronic submission verified; contributing conditions documented per WHO guidelines'
WHERE name = 'Hospice/Palliative Certifying Physician (Death Certificate)';

-- C4. Pre-Need, Financial & Insurance

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. BPC 7735-7746 (Pre-Need Funeral Arrangements); Cal. BPC 7685.2 (GPL Before Contract); Cal. BPC 7737 (Trust Requirements); 16 CFR 453 (FTC Funeral Rule); Cal. Insurance Code (Insurance-funded pre-need)',
  standards_of_creation = 'Licensed funeral director or registered pre-need sales agent; Training in pre-need regulations; California insurance agent license (if insurance-funded); Familiarity with BPC 7737 trust requirements; DOJ clearance',
  soc_controls = 'Trust account documentation per BPC 7737; GPL provided at pre-need arrangement; consumer cancellation/refund records; price guarantee/non-guarantee disclosures; annual trust fund reporting'
WHERE name = 'Pre-Need Funeral Sales Counselor';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Insurance Code 10110-10127 (Life Insurance); Cal. Insurance Code 10295-10295.9 (Accelerated Death Benefits); Cal. Insurance Code 10172.5 (Unfair Claims Practices); 10 CCR 2695.1-2695.17 (Fair Claims Settlement); NAIC Model Act',
  standards_of_creation = 'California insurance adjuster license or claims examiner designation; AIC or equivalent; Fair Claims Settlement Practices training; 24 hours CE per renewal cycle; DOJ clearance',
  soc_controls = 'Death certificate verification required; beneficiary verification documented; contestability period investigation (2-year) records; accelerated death benefit per INS 10295; claims denial/appeal documentation separate; Social Security death index verification'
WHERE name = 'Life Insurance Death Claims Adjuster';

UPDATE citizen_catalog SET
  governing_guidelines = '38 USC 2301-2308 (Burial Benefits); 38 CFR Part 38 (National Cemeteries); 38 CFR Part 39 (Aid to States); 38 CFR 3.1600-3.1612 (Burial Allowance); VA Form 21P-530; VA Form 40-1330',
  standards_of_creation = 'VA employment or accredited VSO representative; VA training on burial benefits; Understanding of DD-214; Federal background clearance',
  soc_controls = 'DD-214 verification per VA records; burial allowance determinations per 38 CFR 3.1600-3.1612; headstone/marker applications verified; Presidential Memorial Certificate requests tracked; National cemetery pre-need eligibility per VA Form 40-10007'
WHERE name = 'Veterans Burial Benefits Specialist';

-- C5. Cemetery Management & Regulation

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. HSC 8100-8804 (Cemetery Act); Cal. HSC 8340 et seq.; Cal. BPC 7613.5 (Licensed Cemetery Personnel); Cal. BPC 7730.10 ($750/cemetery Annual Charge); Cal. BPC 7607 (Inspection Authority); 16 CCR 1200-1280',
  standards_of_creation = 'Cemetery manager license from Cemetery and Funeral Bureau; Knowledge/experience per Bureau standards; DOJ clearance; Annual regulatory charge payment',
  soc_controls = 'Bureau inspection reports per BPC 7607; interment records maintained permanently; endowment care fund records audited; disinterment/reinterment permits per HSC 7500; plot ownership deeds recorded; annual regulatory filings'
WHERE name = 'Cemetery Manager / Cemetery Authority';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. HSC 7500-7527 (Disinterment); Cal. HSC 7500 (Health Officer Permit Required); Cal. HSC 7501 (Court Order); Cal. HSC 7054 (Treatment of Human Remains); Local health department regulations',
  standards_of_creation = 'Licensed funeral director or cemetery operator; Local health officer permit per HSC 7500; OSHA/Cal-OSHA biohazard training; Court order processing per HSC 7501',
  soc_controls = 'Health officer permit per HSC 7500 issued independently; court orders per HSC 7501 for contested disinterments; chain of custody for disinterred remains; identification verification maintained; transit permits for inter-jurisdictional transfers'
WHERE name = 'Disinterment/Reinterment Specialist';

-- C6. Body Donation & Anatomical Gifts

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. HSC 7150-7158 (Uniform Anatomical Gift Act); Cal. HSC 7150.45 (OPO Coordination); Cal. HSC 7155.5 (Donor Registry); 42 CFR Part 486 Subpart G (OPOs); AATB Standards 14th ed.; FDA 21 CFR Parts 1270-1271 (HCT/Ps)',
  standards_of_creation = 'CTBS from AATB; AATB accreditation for program; FDA registration per 21 CFR Part 1271; Medical director oversight (MD/DO); Background clearance',
  soc_controls = 'Donor registry per HSC 7155.5; donor screening/testing per AATB standards; tissue recovery records maintained; adverse reaction reporting per FDA MedWatch; chain of custody for anatomical specimens; research institution agreements documented'
WHERE name = 'Anatomical Gift Program Director';

UPDATE citizen_catalog SET
  governing_guidelines = '42 CFR Part 486 Subpart G (OPO Conditions for Coverage); 42 USC 274 (OPOs); NOTA 42 USC 273-274e; UNOS Policies; Cal. HSC 7150-7158 (Anatomical Gift Act)',
  standards_of_creation = 'CPTC from ABTC; Bachelor''s in healthcare or science; Clinical organ donation experience; UNOS-designated OPO employment; Continuing education per ABTC',
  soc_controls = 'Organ allocation per UNOS policies (independent of OPO); donor evaluation records maintained; hospital notification/referral compliance tracked; DCD protocol documentation; time-critical documentation (organ viability windows); regulatory reports to CMS/HRSA filed separately'
WHERE name = 'Organ Procurement Organization (OPO) Coordinator';

-- C7. Body Transport

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. HSC 7100-7117 (Duty of Disposition); Cal. HSC 103050-103055 (Transit Permits); Cal. HSC 7357 (Transportation of Dead Bodies); 49 CFR Part 171-180 (PHMSA); IATA Dangerous Goods Regulations (air transport)',
  standards_of_creation = 'Licensed funeral director or authorized removal agent; Valid driver''s license; First Call/removal service training; OSHA/Cal-OSHA bloodborne pathogen training; IATA certification (international air)',
  soc_controls = 'Transit permits per HSC 103050; chain of custody documentation maintained; body identification verification at each transfer; airline/carrier compliance per IATA; consulate documentation for international repatriation; hazardous materials handling records for embalmed remains'
WHERE name = 'Funeral Transport / Removal Service Operator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. HSC 7100-7117 (Duty of Disposition); Cal. HSC 7104 (County Duty for Unclaimed Remains); Cal. Gov. Code 27460 et seq. (Coroner Duties); Cal. HSC 7054.6 (Unclaimed Cremated Remains); 22 CCR Division 5',
  standards_of_creation = 'County coroner/public administrator staff or designee; Licensed funeral director (contracted); Training on public indigent burial procedures; County employment background clearance',
  soc_controls = 'Public notice/due diligence search documented; county indigent burial/cremation per HSC 7104; public administrator disposition orders; unidentified decedent records (DNA, fingerprints, dental); annual reporting of unclaimed remains; storage compliance tracked'
WHERE name = 'Unclaimed Remains Administrator';

-- C8. Religious & Cultural Compliance

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. HSC 7100 (Right to Control Disposition); Cal. Gov. Code 12926 (Religious Accommodation); First Amendment / RLUIPA; Denominational requirements (Jewish Chevra Kadisha, Islamic Ghusl, Catholic Canon Law, Hindu/Buddhist cremation); Cal. HSC 7054',
  standards_of_creation = 'Training in religious burial/disposition per tradition; Funeral director or cemetery license; Cultural competency certification; Coordination with religious authorities',
  soc_controls = 'Expedited burial authorization (24-hour requirements — Jewish, Islamic) documented; religious preparation documentation (Tahara, Ghusl); cremation authorization/prohibition per religious law; religious cemetery section compliance; accommodation request and fulfillment records'
WHERE name = 'Religious Burial Compliance Coordinator';

-- ============================================================================
-- SECTION 7: FORESTRY (12 Personas)
-- ============================================================================

-- A1. Timber Harvest Planning & Operations

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. PRC 4582-4587 (THP preparation); Cal. PRC 4571-4576.1 (Timber Operator Licensing); 14 CCR 895-1115 (California Forest Practice Rules); 36 CFR 219 (National Forest System); SAF Code of Ethics',
  standards_of_creation = 'THPs must contain watershed assessment, cumulative impacts, species surveys, RPF certification signature; 14 CCR 1032-1038 (THP content); Plans filed on Board-prescribed forms with RPF stamp; 3-year minimum retention',
  soc_controls = 'RPF who prepares THP cannot serve as CAL FIRE reviewer (segregation); RPF license number on all documents; CAL FIRE PHI is independent verification; multi-agency review (CDFW, RWQCB, CGS) creates three-party check'
WHERE name = 'Registered Professional Forester (RPF)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. PRC 4571 (License required); Cal. PRC 4572 (Application form); Cal. PRC 4573-4574 (Denial/suspension/revocation; 2-year validity); 14 CCR 1020-1104 (Operational standards)',
  standards_of_creation = 'License application on Board-prescribed form with workers'' comp proof; daily operations logs referencing THP number and harvest unit; erosion control completion reports within 1 year; equipment maintenance/calibration logs',
  soc_controls = 'LTO cannot self-certify THP compliance (RPF or CAL FIRE required); LTO license number on all load tickets and scaling records; PRC 4576.1 bars alter egos from operating under suspended license'
WHERE name = 'Licensed Timber Operator (LTO)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. PRC 4581-4610 (CAL FIRE review and approval); 14 CCR 1037-1038 (Review Team and PHI procedures); Cal. PRC 4604-4604.5 (Post-harvest stocking standards)',
  standards_of_creation = 'PHI reports on standardized CAL FIRE forms; inspection findings reference specific THP conditions by number; Notices of Violation cite specific Forest Practice Rule sections; annual program reports per PRC 4629.9',
  soc_controls = 'Inspector cannot have financial interest in timber operation; multi-disciplinary Review Team (RPF, geologist, biologist, water quality); enforcement actions require supervisor approval above inspector level'
WHERE name = 'CAL FIRE Forester / Resource Protection Inspector';

-- A2. Fire Management & Prescribed Burns

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. PRC 4477 (Burn Boss certification); Cal. PRC 4491-4494 (Prescribed burn permits/liability); Cal. PRC 4500 (Burn Boss defined); NWCG PMS 310-1; Cal. HSC 41801-41815 (Smoke management)',
  standards_of_creation = 'Prescribed burn plan with ignition, contingency, smoke management plans; go/no-go checklist (weather, fuel moisture, AQI); post-burn monitoring reports with photos and acres-burned certification; Smoke Management Plan filed with AQMD',
  soc_controls = 'Burn Boss independent of air quality permitting authority; weather observations from certified station or qualified observer (separate role); post-burn assessment by person other than Burn Boss'
WHERE name = 'Certified Burn Boss';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. PRC 4102-4104 (Fire prevention authority); NFPA 921 (Fire and Explosion Investigations); NFPA 1033 (Fire Investigator Qualifications); 18 U.S.C. 1855 (Federal arson on federal lands)',
  standards_of_creation = 'Origin and cause determination reports per NFPA 921 systematic methodology; chain of custody for physical evidence; photo/video with GPS coordinates and timestamps; witness interview transcripts with Miranda warnings where applicable',
  soc_controls = 'Investigator cannot be suppression incident commander (conflict); evidence custodian separate from investigator; peer review of origin/cause determination before classification'
WHERE name = 'Wildfire Investigator / Fire Prevention Officer';

-- A3. Environmental Compliance & Species Protection

UPDATE citizen_catalog SET
  governing_guidelines = '16 U.S.C. 1531-1544 (ESA); 50 CFR 17 (USFWS Endangered/Threatened); Cal. FGC 2050-2098 (CESA); 14 CCR 895.1 (Sensitive species in THPs); USFWS HCP Handbook',
  standards_of_creation = 'Pre-harvest species surveys using USFWS/CDFW-approved protocols (e.g., NSO protocol); biological assessments with population estimates, habitat maps, impact analysis; ITP applications with mitigation ratios; annual HCP monitoring reports',
  soc_controls = 'Biologist conducting surveys cannot approve the THP; USFWS/CDFW must independently concur with "no take" determinations; peer review required for federally listed species determinations'
WHERE name = 'Wildlife Biologist (Forestry-Qualified)';

UPDATE citizen_catalog SET
  governing_guidelines = '40 CFR 122 (NPDES); Cal. Water Code 13260-13274 (Waste Discharge Requirements); 14 CCR 923-923.9 (Watercourse/Lake Protection in Forest Practice Rules); CWA Section 402',
  standards_of_creation = 'Erosion control plans with site-specific BMPs mapped to soil types; water quality monitoring data with chain-of-custody; streamside management zone delineation with survey-grade measurements; post-storm inspection reports within 48 hours',
  soc_controls = 'CPESC designs controls; separate party (RWQCB or lead agency) verifies installation; water quality sampling by certified laboratory with accreditation number on reports; monitoring data submitted to operator and regulatory agency simultaneously'
WHERE name = 'Certified Erosion and Sediment Control Specialist (CPESC)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. FAC 11401-12408 (Pesticide Use Enforcement); 3 CCR 6000-6784 (Pesticide Regulatory Program); 7 U.S.C. 136-136y (FIFRA); 40 CFR 152-186 (EPA Pesticide Regulations); Cal. BPC 11401-11512 (PCA licensing)',
  standards_of_creation = 'Pesticide Use Reports (PURs) filed monthly with County Ag Commissioner; written recommendations (PCA) must precede restricted material use; application records: product, EPA reg number, rate, method, area, applicator ID; Restricted Materials Permits',
  soc_controls = 'PCA who writes recommendation cannot also be applicator (Cal. FAC 12003); County Ag Commissioner independently inspects; DPR maintains statewide database for cross-referencing use'
WHERE name = 'Registered Herbicide Applicator / Pest Control Advisor (PCA)';

-- A4. Archaeological & Cultural Resources

UPDATE citizen_catalog SET
  governing_guidelines = '16 U.S.C. 470 et seq. (NHPA Section 106); 36 CFR 800 (Section 106 Review); Cal. PRC 5097.9-5097.998 (Native American heritage); 14 CCR 929.1 (Archaeological survey in THPs); ARPA 16 U.S.C. 470aa-mm',
  standards_of_creation = 'Archaeological survey reports per Secretary of Interior Standards; DPR 523 series forms filed with Information Centers; tribal consultation documentation with certified mail receipts; treatment plans for inadvertent discoveries with stop-work protocols',
  soc_controls = 'RPA must meet Secretary of Interior Professional Qualification Standards (36 CFR 61); NAHC consultation independent of RPA; lead federal agency must concur with findings — RPA cannot self-approve'
WHERE name = 'Registered Professional Archaeologist (RPA)';

-- A5. Carbon Markets & Forest Credits

UPDATE citizen_catalog SET
  governing_guidelines = '17 CCR 95802-95990 (Cap-and-Trade — forest offset protocols); CARB U.S. Forest Projects Protocol; ISO 14064-3 (GHG Verification); ISO 14065 (Validation/Verification Bodies)',
  standards_of_creation = 'Offset project design documents with baseline carbon stocks; verification statements with 5% materiality threshold; site visit reports with sampling methodology; annual monitoring reports with allometric equations and plot data',
  soc_controls = 'Verifier cannot have provided consulting to project developer; CARB must accredit verification body (separate from individual); conflict-of-interest attestation before each engagement; rotation requirement: verification body rotates every 6 years'
WHERE name = 'Forest Carbon Offset Verifier';

-- A6. Forest Road & Biomass

UPDATE citizen_catalog SET
  governing_guidelines = '36 CFR 212 (Forest Service Travel Management); 14 CCR 923.1-923.9 (Road construction in Forest Practice Rules); Cal. PRC 4582(g) (Road plans in THPs); CWA Section 404 (Wetland fill for road crossings)',
  standards_of_creation = 'Road construction plans with engineering specifications (grade, width, drainage); watercourse crossing designs stamped by licensed civil engineer; road use agreements with maintenance schedules; decommissioning plans for temporary roads',
  soc_controls = 'Design engineer cannot self-inspect final construction; road use permits require multi-agency sign-off (Forest Service, county, fish/wildlife); annual road condition surveys by independent inspector'
WHERE name = 'Forest Road Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. PRC 25500-25542 (Energy facility siting); Cal. HSC 40000-44390 (Air quality — emissions); 40 CFR 60 (New Source Performance Standards); Cal. PUC 399.20 (BioMAT program)',
  standards_of_creation = 'Air emissions monitoring reports (CEMS data, stack test results); fuel source documentation (forest biomass origin, chain of custody); quarterly compliance reports to AQMD with emission calculations; annual Title V permit compliance certifications',
  soc_controls = 'CEMS data transmitted directly to regulatory agency (cannot be operator-filtered); independent third-party stack testing required; fuel source verification separate from facility operations'
WHERE name = 'Biomass Energy Facility Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. FAC 6301-6363 (Nursery inspection); Cal. FAC 5301-5363 (Pest cleanliness certificates); 7 CFR 352 (USDA Plant Quarantine); Cal. PRC 4531 (Christmas tree harvest exemptions)',
  standards_of_creation = 'Nursery inspection certificates with pest/disease findings; phytosanitary certificates for interstate shipment; pesticide use records per DPR requirements; exemption notices filed with CAL FIRE',
  soc_controls = 'County inspector independent of grower; CDFA oversight of county inspector program; USDA-APHIS separate authority for interstate/export certificates'
WHERE name = 'Christmas Tree Farm Inspector / Nursery Inspector';

-- ============================================================================
-- SECTION 8: FISHERIES / AQUACULTURE (13 Personas)
-- ============================================================================

UPDATE citizen_catalog SET
  governing_guidelines = '16 U.S.C. 1801-1891d (Magnuson-Stevens Act); 50 CFR 600 (MSA Provisions); 50 CFR 622-697 (Species-specific FMP); National Standard Guidelines 50 CFR 600.310-600.355',
  standards_of_creation = 'FMPs with MSY/OY calculations, stock assessments; ACL and accountability measure documentation; EIS per NEPA for FMP amendments; SAFE reports',
  soc_controls = 'SSC provides independent stock assessment review; Council staff cannot override SSC scientific determinations; public comment and NMFS final approval separate from Council drafting'
WHERE name = 'NOAA Fisheries Management Plan Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. FGC 7850-7863 (Commercial fishing license); Cal. FGC 8100-8112 (Limited entry); Cal. FGC 8230-8280.2 (Species permits); Cal. FGC 8429 (Perjury statements); 14 CCR 149-196',
  standards_of_creation = 'License applications with vessel ID, gear type, fishery declarations; transfer applications with fair market value per FGC 8102; renewal with catch history verification; limited entry transfers requiring Commission approval',
  soc_controls = 'CDFW issues license; Fish and Game Commission sets policy (separate); FGC 8429: false statements are perjury; FGC 12002.8: permanent revocation for specified violations (enforcement separate from licensing)'
WHERE name = 'State Commercial Fishing License Administrator';

UPDATE citizen_catalog SET
  governing_guidelines = '16 U.S.C. 1853(b)(8) (Observer requirements); 50 CFR 660.140-660.160 (West Coast observer program); MSA Section 303(b)(8); NMFS National Observer Program standards',
  standards_of_creation = 'Catch composition data forms (species, weight, disposition); bycatch/discard logs with species ID and condition codes; protected species interaction reports; sampling protocols with random methodology',
  soc_controls = 'Observer is NMFS-deployed, not vessel-hired (independence); observer data transmitted directly to NMFS; observer cannot be crew member or have financial interest in catch; debriefing by NMFS staff verifies data quality'
WHERE name = 'Fisheries Catch Monitor / At-Sea Observer';

UPDATE citizen_catalog SET
  governing_guidelines = '50 CFR 660.13 (West Coast VMS requirements); 16 U.S.C. 1861 (MSA enforcement); NOAA VMS Program Requirements; Coast Guard VMS regulations for HMS fisheries',
  standards_of_creation = 'VMS unit installation certification (type-approved only); position reports at prescribed intervals (minimum hourly); power-down exemption requests documented; VMS declaration reports (fishery, gear type) before each trip',
  soc_controls = 'VMS transmits directly to NOAA OLE — vessel operator cannot alter; type-approval by independent laboratory; VMS data cross-referenced with dealer reports and observer data (three-way check)'
WHERE name = 'Vessel Monitoring System (VMS) Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR 123 (Fish and Fishery Products HACCP); 21 CFR 1240.60 (Molluscan shellfish); FDA Fish and Fisheries Products Hazards and Controls Guidance; NOAA Seafood Inspection Program',
  standards_of_creation = 'HACCP plans with hazard analysis, CCP identification, critical limits, monitoring; corrective action records; verification records (calibration, review, sampling); sanitation monitoring records',
  soc_controls = 'HACCP plan developed by FDA-trained individual; monitoring personnel separate from corrective action authority; annual reassessment of HACCP plan; FDA inspectors independently verify plan adequacy'
WHERE name = 'HACCP-Trained Seafood Processor';

UPDATE citizen_catalog SET
  governing_guidelines = '50 CFR 300.321-300.325 (SIMP Rule); 16 U.S.C. 3371-3378 (Lacey Act); Executive Order 13840 (IUU Fishing); CITES',
  standards_of_creation = 'IFTP applications; catch/landing documentation (vessel ID, species, gear, area, date); chain of custody records from harvest through entry; NMFS ACE filing data',
  soc_controls = 'Importer of record legally responsible (cannot delegate); CBP electronic filing creates independent government record; NOAA OLE audits supply chain against landing records; CITES permits require both exporting and importing authority sign-off'
WHERE name = 'SIMP Compliance Specialist (Seafood Import Monitoring Program)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. FGC 15100-15105 (Aquaculture registration); 33 U.S.C. 1311/1342 (NPDES for aquaculture); 40 CFR 451 (CAAP effluent guidelines); Cal. FGC 15200-15202 (Disease control); Section 10/404 permits',
  standards_of_creation = 'CDFW registration (species, location, methods); NPDES discharge monitoring reports; disease management plans with veterinarian certification; broodstock source documentation',
  soc_controls = 'CDFW registration separate from RWQCB discharge permitting; disease testing by accredited veterinary laboratory; Army Corps permit requires separate NEPA review; effluent monitoring samples analyzed by certified laboratory'
WHERE name = 'Aquaculture Facility Manager / Permit Holder';

UPDATE citizen_catalog SET
  governing_guidelines = 'NSSP Model Ordinance; 21 CFR 1240.60 (Molluscan shellfish); FDA Guide for Control of Molluscan Shellfish; ISSC Constitution and Bylaws',
  standards_of_creation = 'Growing area classification surveys (water quality, shoreline); dealer certification with ICSSL number; harvest area patrol logs with closure/opening documentation; biotoxin monitoring (PSP, DSP, ASP) with lab accreditation',
  soc_controls = 'State shellfish authority classifies growing areas (harvesters cannot self-classify); ISSC biennial review of each state program; biotoxin testing by state laboratory not harvester; dealer certificates require separate inspection from harvest area classification'
WHERE name = 'Shellfish Sanitation Program Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. FGC 2850-2863 (MLPA); 16 U.S.C. 1431-1445c-1 (NMSA); 14 CCR 632 (MPA regulations); 15 CFR 922 (NMS regulations)',
  standards_of_creation = 'Patrol and surveillance reports with GPS track logs; violation notices citing specific MPA boundaries; evidence documentation (photographs, GPS, catch inventories); monthly/quarterly enforcement summary reports',
  soc_controls = 'Enforcement separate from MPA designation process; citation authority requires commission-level adjudication for major violations; evidence chain of custody with independent custodian'
WHERE name = 'Marine Protected Area Enforcement Officer';

UPDATE citizen_catalog SET
  governing_guidelines = '16 U.S.C. 1361-1423h (MMPA); 50 CFR 216 (Taking of Marine Mammals); 50 CFR 229 (Commercial Fisheries Authorization); MMPA Section 118',
  standards_of_creation = 'Marine mammal interaction reports (MMIR) within 48 hours; authorization certificates for Category I/II fisheries; Take Reduction Plan monitoring reports; serious injury/mortality determination documentation',
  soc_controls = 'Fisherman reports interaction; NMFS independently determines serious injury/mortality; Take Reduction Teams multi-stakeholder (scientists, fishermen, conservationists); observer program provides independent verification'
WHERE name = 'Marine Mammal Biologist / Interaction Monitor';

UPDATE citizen_catalog SET
  governing_guidelines = '46 U.S.C. 4501-4508 (Commercial Fishing Vessel Safety); 46 CFR 28 (Commercial Fishing Industry Vessels); NVIC 5-86; 33 CFR 151 (Vessel discharge)',
  standards_of_creation = 'Commercial Fishing Vessel Safety Examination (decal) documentation; survival craft equipment inspection checklists; stability test/assessment documentation; drill conductor qualification records and drill logs',
  soc_controls = 'USCG examiner is independent federal authority; vessel owner cannot self-certify; annual re-examination required; casualty investigation separate from examination function'
WHERE name = 'Coast Guard Commercial Fishing Vessel Examiner';

UPDATE citizen_catalog SET
  governing_guidelines = '16 U.S.C. 4701-4751 (Nonindigenous Aquatic Nuisance Prevention and Control Act); Executive Order 13112 (Invasive Species); Cal. FGC 2300-2302; 33 CFR 151.2000-151.2060 (Ballast water)',
  standards_of_creation = 'Ballast water management plans and exchange/treatment logs; AIS monitoring survey reports with species ID protocols; rapid response action plans with containment documentation; vessel hull inspection reports (biofouling)',
  soc_controls = 'Ballast water management verified by Coast Guard (independent); AIS identification requires taxonomic expert confirmation; monitoring data reported to national AIS database (USGS NAS)'
WHERE name = 'Fisheries Aquatic Invasive Species (AIS) Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Treaty rights (e.g., Stevens Treaties, Boldt Decision); 25 U.S.C. 2701 et seq.; 25 CFR 241-249 (Indian fishing); Pacific Salmon Treaty 16 U.S.C. 3631-3644; U.S. v. Washington, Parravano v. Babbitt',
  standards_of_creation = 'Tribal harvest allocation tracking with court-decree citation; tribal member fishing permits and ceremonial use authorizations; co-management agreements with state/federal agencies; salmon spawning survey data shared under treaty frameworks',
  soc_controls = 'Tribal fish commission is sovereign authority (independent of state); court master or mediator reviews allocation disputes; data sharing protocols prevent unilateral allocation changes'
WHERE name = 'Tribal Fisheries Manager';

-- ============================================================================
-- SECTION 9: MINING (14 Personas)
-- ============================================================================

UPDATE citizen_catalog SET
  governing_guidelines = '30 U.S.C. 21-54 (General Mining Law 1872); 43 CFR 3700-3870 (Mining claims administration); 43 CFR 3809 (Surface Management — Prevention of Unnecessary Degradation); FLPMA Section 314',
  standards_of_creation = 'Location notices with legal description (metes and bounds or PLSS); annual maintenance fee records ($165/claim) or small miner affidavit; notice-level vs. plan-level surface disturbance classification; mineral examination reports',
  soc_controls = 'BLM adjudicates claims (claimant cannot self-validate); county recorder filing required in addition to BLM (dual record); mineral examiner is certified BLM specialist; environmental review (NEPA) separate from claims adjudication'
WHERE name = 'BLM Mining Claims Adjudicator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. PRC 2710-2796.5 (SMARA); Cal. PRC 2770 (Permit + reclamation plan + financial assurance); Cal. PRC 2772-2772.1 (Reclamation plan content); Cal. PRC 2773.1-2773.4 (Financial assurance); Cal. PRC 2774 (Annual inspections); 14 CCR 3500-3706',
  standards_of_creation = 'Reclamation plans on lead agency forms with end-use specifications; financial assurance cost estimates reviewed by state (PRC 2773.4); annual inspection reports on standardized forms; annual mine production/status reports per PRC 2207',
  soc_controls = 'Lead agency permits; OMR (state) reviews reclamation plans independently (PRC 2772.1); financial assurance reviewed by both lead agency and state; annual inspection by lead agency with state independent inspections; PRC 2774.1 escalation if lead agency fails'
WHERE name = 'SMARA Lead Agency Mine Inspector (California)';

UPDATE citizen_catalog SET
  governing_guidelines = '30 U.S.C. 801-965 (Federal Mine Safety and Health Act 1977); 30 CFR 46 (Training — Non-Metal/Metal); 30 CFR 48 (Training — Coal); 30 CFR 56-57 (Metal/Non-Metal Safety); 30 CFR 70-90 (Coal Safety)',
  standards_of_creation = 'Inspection reports (Form 7000-2) with citation/order numbers; citations with section violated, standard, gravity, negligence; imminent danger orders (Section 107(a)); special assessment documentation',
  soc_controls = 'MSHA inspector is federal employee (independent of operator); inspector cannot accept employment from inspected mine for 1 year; contested citations reviewed by Federal Mine Safety and Health Review Commission; miner representatives have walk-around rights'
WHERE name = 'MSHA Mine Inspector';

UPDATE citizen_catalog SET
  governing_guidelines = '30 CFR 46 (Training — Metal/Non-Metal surface); 30 CFR 48 (Training — Coal and underground); 30 CFR 46.3-46.11 (New miner, annual refresher, task training); 30 CFR 48.3-48.11 (Coal mine training)',
  standards_of_creation = 'MSHA Form 5000-23 (Training Plan — approved by MSHA District Manager); training certificates with trainee, date, instructor, duration, subjects; competent person designation records; annual refresher records (8 hours/year)',
  soc_controls = 'Training plan approved by MSHA (independent of operator); instructor must be MSHA-approved or competent person; training records at mine site AND available to MSHA; new miner training completed BEFORE work assignment (temporal control)'
WHERE name = 'Mine Safety Training Coordinator (Part 46/48)';

UPDATE citizen_catalog SET
  governing_guidelines = '30 CFR 49 (Mine Rescue Teams); 30 U.S.C. 825 (Mine rescue requirements); MSHA Mine Rescue Handbook; NFPA 1006 Chapter 10',
  standards_of_creation = 'Team certification records (minimum 5 members + alternates); quarterly practice drill documentation with scenarios; breathing apparatus inspection/test records; contest scores and skill maintenance records',
  soc_controls = 'Team must practice quarterly (temporal requirement); MSHA certifies team eligibility (independent of operator); equipment testing by certified technician per manufacturer specifications; post-incident critiques reviewed by MSHA separately'
WHERE name = 'Certified Mine Rescue Team Captain';

UPDATE citizen_catalog SET
  governing_guidelines = '30 CFR 70-71 (Coal respirable dust); 30 CFR 90 (Pneumoconiosis miners); 30 CFR 56.5001/57.5001 (Metal/Non-Metal exposure limits); NIOSH Method 0600; NIOSH Method 7500 (Silica)',
  standards_of_creation = 'Personal dust sampler records (CMDPSU); sampling results with mine ID, occupation code, location, shift; corrective action plans when exceeding standards (2.0 mg/m3 coal; PEL for silica); medical surveillance referral documentation',
  soc_controls = 'Operator collects samples; MSHA independently validates via own sampling; laboratory analysis by MSHA Pittsburgh SHTC; CMDPSU data electronically transmitted (tamper-resistant); Part 90 miners have right to transfer at full pay'
WHERE name = 'Respirable Dust Sampling Technician / Industrial Hygienist';

UPDATE citizen_catalog SET
  governing_guidelines = '30 CFR 75.300-75.388 (Ventilation — underground coal); 30 CFR 75.321-75.323 (Methane testing); 30 CFR 22 (Approved methane detectors); 30 CFR 27 (Methane testing systems)',
  standards_of_creation = 'Pre-shift methane examination records (certified person); AMS calibration records; ventilation system monitoring data logs; weekly methane liberation measurements',
  soc_controls = 'Pre-shift examiner must be certified under state law (not self-appointed); AMS alerts transmitted to surface independent of underground; methane >1% requires withdrawal (automatic, non-discretionary); MSHA verification sampling independent of operator'
WHERE name = 'Mine Methane Monitoring Specialist (Coal)';

UPDATE citizen_catalog SET
  governing_guidelines = '30 CFR 75.200-75.223 (Roof control — coal); 30 CFR 57.3000-57.3461 (Ground support — metal/non-metal); 30 CFR 77.1000-77.1014 (Surface slope stability); SME Mining Engineering Handbook',
  standards_of_creation = 'Roof control plans approved by MSHA District Manager; ground support design calculations with engineering stamp; convergence monitoring data with alert thresholds; geotechnical assessment reports for new development',
  soc_controls = 'Ground control plan requires MSHA approval (independent review); engineering stamp from licensed PE creates personal liability; monitoring data reviewed by both site engineer and MSHA; bolt pattern modifications require plan amendment'
WHERE name = 'Mining Engineer / Ground Control Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = '30 CFR 75.1200-75.1204 (Mine maps — coal); 30 CFR 57.8500-57.8530 (Mine maps — metal/non-metal); 43 CFR 3830 (Mining claim location); State professional surveying licensure acts',
  standards_of_creation = 'Mine maps updated every 6 months (30 CFR 75.1200) with survey-grade accuracy; maps show workings, pillars, elevations, drainage, adjacent mines, surface features; licensed surveyor stamp and date; digital mine model with coordinate reference system',
  soc_controls = 'Surveyor must be licensed professional (not self-certified); map updates submitted to MSHA (government copy independent of operator); adjacent mine workings independently verified (inundation risk); 30 CFR 75.1200 requires registered engineer/surveyor certification'
WHERE name = 'Mine Surveyor / Cartographer';

UPDATE citizen_catalog SET
  governing_guidelines = '33 U.S.C. 1251-1387 (CWA); 40 CFR 440 (Ore Mining/Dressing); 40 CFR 434 (Coal Mining); 40 CFR 122 (NPDES); Cal. Water Code 13260-13274 (WDR)',
  standards_of_creation = 'NPDES DMRs (monthly/quarterly); SWPPPs with BMP descriptions; acid mine drainage monitoring (pH, metals, sulfate, flow); annual compliance summary reports',
  soc_controls = 'Sampling by ELAP-certified laboratory; DMRs submitted to EPA/RWQCB directly; split samples available for RWQCB verification; compliance schedule milestones enforced by consent order if needed'
WHERE name = 'Mining Water Discharge Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = '30 CFR 77.216-77.216-5 (MSHA impoundment inspection); State dam safety statutes (Cal. Water Code 6000-6500); FEMA 93 (Federal Guidelines for Dam Safety); GISTM (2020); ICOLD Bulletins',
  standards_of_creation = 'Dam safety inspection reports (annual minimum, quarterly for high-hazard); instrumentation monitoring records (piezometers, inclinometers, seepage weirs); EAPs with inundation maps; annual dam safety review by independent qualified engineer',
  soc_controls = 'Independent engineer review (not same firm that designed dam); GISTM requires Independent Tailings Review Board for high/extreme consequence dams; MSHA inspection separate from operator monitoring; EAP shared with local emergency management'
WHERE name = 'Tailings Dam Safety Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = '27 CFR 555 (Commerce in Explosives — ATF); 30 CFR 56.6000-56.6905 / 57.6000-57.6905 (Explosives — MSHA); 30 CFR 75.1300-75.1328 (Underground coal blasting); 18 U.S.C. 841-848; State blasting license requirements',
  standards_of_creation = 'ATF Federal Explosives License/Permit records; magazine inspection logs (temperature, inventory, security); blast design records (hole layout, charge weight, delay sequence, standoff); seismograph monitoring records; daily explosives inventory',
  soc_controls = 'ATF license separate from MSHA blasting authorization; magazine inventory requires two-person check; seismograph records independent of blaster (third-party monitoring); pre-blast survey of nearby structures by independent party'
WHERE name = 'Licensed Blaster / Explosives Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = '30 U.S.C. 181-287 (Mineral Leasing Act); 30 CFR 200-299 (ONRR regulations); 25 CFR 211-227 (Indian mineral leasing); FOGRMA',
  standards_of_creation = 'Production reports (ONRR Form 4054 equivalent); royalty payment reports with value calculations; audit work papers with sampling methodology; Indian mineral lease compliance documentation',
  soc_controls = 'ONRR separate from BLM (revenue collection independent of land management); state auditors may audit under cooperative agreements; royalty calculations verified against independent price references; Indian trust obligations add fiduciary layer'
WHERE name = 'Mineral Royalty Auditor';

UPDATE citizen_catalog SET
  governing_guidelines = '15 CFR 730-774 (Export Administration Regulations — EAR); 50 U.S.C. 4801-4852 (ECRA); Executive Order 13817 (Critical Minerals); Defense Production Act Title III',
  standards_of_creation = 'Export license applications (BIS Form 748P); commodity classification records (ECCN determination); end-user certificates and end-use statements; annual self-assessment of export compliance program',
  soc_controls = 'BIS license determination independent of exporter; denied parties screening required before each transaction; record retention 5 years (15 CFR 762); compliance officer cannot also be shipping/logistics decision-maker'
WHERE name = 'Rare Earth / Critical Mineral Export Compliance Officer';

-- ============================================================================
-- SECTION 10: COMMERCIAL DIVING / UNDERWATER (14 Personas)
-- ============================================================================

UPDATE citizen_catalog SET
  governing_guidelines = 'ADCI Consensus Standards for Commercial Diving; 29 CFR 1910.401-1910.441 (OSHA Commercial Diving); 29 CFR 1926.605 (Marine Operations); IMCA D 014',
  standards_of_creation = 'ADCI certification cards with classification (Surface-Supplied Air, Mixed Gas, Bell/Sat); dive log entries per ADCI format; pre-dive checklists with equipment verification and gas analysis; post-dive reports with decompression compliance',
  soc_controls = 'Certification by ADCI (independent of employer); diving supervisor must verify qualification before each dive (separate role); dive log entries reviewed and signed by both diver and supervisor; medical fitness verified by independent physician'
WHERE name = 'ADCI Commercial Diver';

UPDATE citizen_catalog SET
  governing_guidelines = 'ADCI Medical Standards; UHMS Guidelines for Commercial Diver Medical Examinations; 29 CFR 1910.411 (OSHA medical requirements); 46 CFR 197.210 (USCG OCS); DMAC Medical Guidance',
  standards_of_creation = 'Annual diving medical examination on ADCI-approved forms; fitness-to-dive certificates with limitations; audiometric testing records; pulmonary function tests (FVC, FEV1); chest X-ray and EKG per age-based protocols',
  soc_controls = 'DME must be physician trained in diving medicine (not company medic); medical records maintained by physician not employer (HIPAA); fitness certificate provided without full medical details (information barrier); return-to-dive clearance requires independent DME'
WHERE name = 'Diving Medical Examiner (DME)';

UPDATE citizen_catalog SET
  governing_guidelines = '29 CFR 1910.410 (Dive team qualifications); 29 CFR 1910.421-423 (Pre-dive, during, post-dive procedures); ADCI Consensus Standards Chapter 3; 46 CFR 197.400-197.488 (USCG OCS)',
  standards_of_creation = 'Dive plans with emergency procedures, decompression schedules, gas supply calculations; pre-dive briefing documentation; real-time dive monitoring logs (depth, time, gas supply, comms); post-dive decompression records; dive safety manual',
  soc_controls = 'Supervisor on-site and not diving (29 CFR 1910.410); supervisor holds independent authority to abort (cannot be overridden by client); standby diver separate from working diver; records retained 5 years (29 CFR 1910.440)'
WHERE name = 'Diving Supervisor';

UPDATE citizen_catalog SET
  governing_guidelines = 'OSHA Scientific Diving Exemption 29 CFR 1910.401(a)(2)(iv); AAUS Standards for Scientific Diving; Organizational scientific diving program manual; OSHA Letter of Interpretation',
  standards_of_creation = 'Scientific diving program manual with institution-specific protocols; diver authorization records (depth, conditions, task limitations); dive plan approval forms (DSO signature); incident/accident reports per AAUS; annual program review documentation',
  soc_controls = 'DSO has authority to suspend any diver or operation (independent of PI); DSO cannot be overridden by research PI; Diving Control Board provides oversight of DSO; AAUS organizational member peer review'
WHERE name = 'Diving Safety Officer (DSO) — Scientific Diving';

UPDATE citizen_catalog SET
  governing_guidelines = 'ASME PVHO-1 (Pressure Vessels for Human Occupancy); NFPA 99 Chapter 14 (Hyperbaric Facilities); 29 CFR 1910.430 (Equipment); NBDHMT certification standards; CGA G-4 (Oxygen)',
  standards_of_creation = 'Chamber inspection reports per PVHO-1 schedules (visual, hydrostatic, NDE); pressure test records with gauge calibration certificates; oxygen system cleaning/maintenance records; treatment table records; fire safety inspection records',
  soc_controls = 'PVHO-1 inspection by ASME-authorized inspector (independent of operator); oxygen system maintenance by certified O2-clean technician; chamber operations require minimum 2 qualified operators; NBDHMT certification renewed independently of employer'
WHERE name = 'Hyperbaric Chamber Operator / Technician';

UPDATE citizen_catalog SET
  governing_guidelines = 'ADCI Consensus Standards Chapter 10 (Saturation Diving); IMCA D 024 (Diving Equipment Systems Inspection); 46 CFR 197.300-197.488 (USCG OCS); DNV-OS-E402; Flag state regulations',
  standards_of_creation = 'Saturation system daily status reports (living chamber, bell, TUP, gas storage); excursion dive records from saturation depth; life support monitoring logs (ppO2, ppCO2, temperature, humidity); bell run sheets; decompression schedules per approved tables',
  soc_controls = 'LST separate role from diving supervisor; gas analysis by calibrated instruments with independent verification; saturation system has independent emergency gas/power; bell deployment requires supervisor AND bellman confirmation (two-party)'
WHERE name = 'Saturation Diving System Superintendent';

UPDATE citizen_catalog SET
  governing_guidelines = 'AWS D3.6M (Underwater Welding); ADCI Consensus Standards Chapter 8; ASME Section IX (Welding Qualifications); API 1104 (Pipeline welding — underwater); 29 CFR 1910.252-1910.255',
  standards_of_creation = 'WPQ per AWS D3.6M (wet/dry/habitat classification); WPS with essential variables; weld inspection reports (visual, MT, UT); electrode lot traceability records; post-weld NDE reports by separate qualified inspector',
  soc_controls = 'Welder qualifies procedure; separate inspector verifies weld (AWS D3.6M); NDE inspector holds separate ASNT Level II/III certification; hyperbaric conditions require additional qualification; client engineer must approve WPS before production'
WHERE name = 'Underwater Welder (Certified)';

UPDATE citizen_catalog SET
  governing_guidelines = '27 CFR 555 (Explosives — ATF); 33 U.S.C. 401-426 (Rivers and Harbors Act); 29 CFR 1910.109 (Explosives); ADCI Consensus Standards Chapter 9; 33 CFR 334 (Danger zones)',
  standards_of_creation = 'Demolition plans with charge calculations, safety zones, marine life mitigation; ATF explosives license/permit documentation; NMFS/USFWS biological opinion; post-blast survey reports; Notice to Mariners documentation',
  soc_controls = 'ATF license independent of ADCI certification; marine mammal observer separate from demolition team; Army Corps permit for navigable waters; demolition plan requires client engineer, diving supervisor, AND regulatory approval'
WHERE name = 'Underwater Demolition Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'IMCA R 004 (Safe/Efficient Operation of ROVs); IMCA C 004 (Entry Level Competence); IMCA R 018 (Cable-Operated Tooling); API RP 17H (ROV Interfaces); DNV-ST-0194',
  standards_of_creation = 'ROV operation logs (dive number, depth, duration, tasks, anomalies); video/still records with metadata (coordinates, heading, time); equipment maintenance per manufacturer specs; tooling calibration records; mobilization/demobilization checklists',
  soc_controls = 'ROV pilot competency assessed by IMCA scheme (independent of employer); video data stored independently (client cannot edit); equipment maintenance by qualified technician separate from pilot during operations; classification society surveys of ROV systems'
WHERE name = 'ROV Pilot/Technician';

UPDATE citizen_catalog SET
  governing_guidelines = 'ASNT SNT-TC-1A (Personnel Qualification); AWS D1.5 (Bridge Welding — underwater); 49 CFR 192/195 (Pipeline Safety — underwater crossings); 23 CFR 650.311 (NBIS — underwater elements); FEMA 93 / FERC Dam Safety; API 1160',
  standards_of_creation = 'NDT reports per ASNT methodology (UT, MT, VT, CP survey); bridge underwater inspection per NBIS format; pipeline anomaly reports with repair recommendations; dam face inspection with photo/video; cathodic protection survey records',
  soc_controls = 'NDT inspector certified ASNT Level II/III (independent of contractor); bridge inspection requires NBIS-qualified team leader; pipeline reports submitted to PHMSA (federal oversight); dam reports to FERC/state dam safety (independent review)'
WHERE name = 'Underwater NDT Inspector (Bridge, Pipeline, Dam)';

UPDATE citizen_catalog SET
  governing_guidelines = '33 U.S.C. 401-426 (Rivers and Harbors Act); OPA 90 (Oil Pollution Act); 46 U.S.C. Chapter 805 (Salvage); International Convention on Salvage 1989; USCG 33 CFR 155 (Salvage and Marine Firefighting)',
  standards_of_creation = 'Salvage plan with risk assessment and environmental sensitivity mapping; Lloyd''s Open Form or contract documentation; daily salvage operations reports; environmental monitoring records; final salvage report with cost accounting',
  soc_controls = 'USCG FOSC oversight during pollution-risk salvage; salvage master independent of vessel owner/underwriter; environmental compliance monitored by NOAA Scientific Support Coordinator; admiralty court jurisdiction for disputes'
WHERE name = 'Marine Salvage Master';

UPDATE citizen_catalog SET
  governing_guidelines = '33 U.S.C. 1344 (CWA Section 404); 33 CFR 320-332 (Army Corps permit program); Cal. PRC 30000-30900 (California Coastal Act); 29 CFR 1926 Subpart S (Caissons); API RP 2A-WSD',
  standards_of_creation = 'Army Corps Section 10/404 permit applications with mitigation plans; construction dive plans integrated with marine construction schedule; as-built surveys (bathymetric, structural); environmental mitigation monitoring reports; marine construction safety plans per OSHA',
  soc_controls = 'Army Corps review includes multi-agency consultation (USFWS, NMFS, EPA); construction quality verified by client''s marine warranty surveyor; environmental mitigation monitored by third-party biologist; OSHA retains independent inspection authority'
WHERE name = 'Marine Construction Project Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'NFPA 1006 Chapter 9 (Water Rescue — Dive Operations); NFPA 1670 (Technical Search and Rescue); OSHA General Duty Clause Section 5(a)(1); ERDI Public Safety Diver Standards; State POST standards',
  standards_of_creation = 'SOPs manual; training records with skill proficiency; evidence recovery dive logs with chain of custody; equipment inspection/maintenance records; after-action reports for each deployment',
  soc_controls = 'Evidence recovered by diver documented by separate evidence technician; dive team leader manages safety, investigating officer manages evidence (separate roles); training certified by external agency (ERDI, NAUI-PS, PADI-PS); equipment per manufacturer schedule'
WHERE name = 'Public Safety Dive Team Leader';

UPDATE citizen_catalog SET
  governing_guidelines = 'U.S. Navy Diving Manual (SS521-AG-PRO-010); NAVSEA Technical Manuals; OPNAVINST 3150.27 (Navy Diving Program); MILSPEC/MILSTD for diving equipment; NATO STANAG 1432',
  standards_of_creation = 'Navy dive logs per U.S. Navy Diving Manual format; equipment maintenance per PMS; decompression records per Navy tables or VVAL-18 algorithm; diving system certification records; DCI treatment records per Navy Treatment Tables',
  soc_controls = 'DMO separate from diving supervisor; SUPDIVE authorization for non-standard operations; equipment certification by Navy-authorized activity (not ship''s force); post-dive physicals by independent medical officer'
WHERE name = 'Navy / Military Diving Supervisor';

UPDATE citizen_catalog SET
  governing_guidelines = '29 CFR 1910.401-441 (OSHA Commercial Diving); 30 CFR 250 (BSEE OCS — diving components); ADCI Consensus Standards (company management chapter); IMCA SEL 034; ISNetworld/Avetta contractor qualification',
  standards_of_creation = 'Company diving safety manual (reviewed annually); annual safety statistics (DART, TRIR, diving incident rates); insurance certificates (diving-specific professional liability); contractor pre-qualification packages; MOC documentation for non-routine operations',
  soc_controls = 'Safety manager cannot also serve as project manager on same operation; OSHA retains inspection authority (independent of ADCI membership); BSEE independently inspects OCS diving; client audit rights in contract (third-party verification)'
WHERE name = 'Diving Contractor Safety Manager / HSE Manager';

UPDATE citizen_catalog SET
  governing_guidelines = '30 CFR 250.1600-250.1628 (BSEE Diving regulations); BSEE NTL 2009-G40; UK Diving at Work Regulations 1997 / ACOP L104; NORSOK U-100; ISO 15138 (Offshore diving design)',
  standards_of_creation = 'Safety case documents with formal risk assessment (bow-tie, HAZID); demonstration of ALARP for residual risks; emergency response plans specific to diving; performance standards for safety-critical elements; bridging documents between contractor and operator',
  soc_controls = 'Safety case reviewed by client''s independent diving representative; BSEE retains approval authority for OCS operations; independent verification of safety-critical elements; bridging document requires both contractor and operator sign-off'
WHERE name = 'Offshore Diving Safety Case Author (BSEE/OSHA Compliance)';

-- ============================================================================
-- SECTION 11: WASTE MANAGEMENT / SANITATION (15 Personas)
-- ============================================================================

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. PRC 44001-44018 (Solid Waste Facility Permits); PRC 43200-43209 (LEA Certification); PRC 40000 et seq. (Integrated Waste Management Act); 27 CCR 20005-21900; 40 CFR 258 (Federal Municipal Solid Waste Landfills)',
  standards_of_creation = 'Facility permit applications per PRC 44004; operating records per 27 CCR 20510 (daily log, tonnage, special waste); monitoring reports per 27 CCR 20380-20435; closure/post-closure plans per 27 CCR 21769-21900',
  soc_controls = 'Operator prepares reports; LEA reviews/issues permits (PRC 44009); CalRecycle concurs/objects within 60 days; RWQCB issues separate waste discharge requirements; financial assurance reviewed independently (27 CCR 22200-22230)'
WHERE name = 'Solid Waste Facility Operator';

UPDATE citizen_catalog SET
  governing_guidelines = 'PRC 43000-43101 (Regulatory Reform); PRC 40060 (Landfill Siting Near Water); Water Code 13260 (Waste Discharge Reports); 27 CCR 20380-20435 (Environmental Monitoring); CEQA PRC 21151.1',
  standards_of_creation = 'Groundwater monitoring per 27 CCR 20415 (quarterly/semi-annual); gas monitoring per 27 CCR 20921-20935; corrective action plans per 27 CCR 20430; CEQA documents per PRC 21151.1 (mandatory EIR)',
  soc_controls = 'Monitoring by facility; reviewed by LEA and RWQCB independently; corrective action requires RWQCB approval separate from LEA; third-party laboratory for water quality; Professional Geologist or Engineer certification on monitoring reports'
WHERE name = 'Environmental Compliance Officer / Environmental Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'PRC 44001-44018 (Facility Permits); 14 CCR 17850-17896.6 (Compostable Materials Handling); PRC 42649.82 (SB 1383 Organic Waste Recycling); 27 CCR 20690 (Water Quality Protection)',
  standards_of_creation = 'Permit applications per 14 CCR 17855; pathogen reduction verification per 14 CCR 17868.3; temperature monitoring logs per 14 CCR 17868.3.1; SB 1383 compliance records per 14 CCR 18993-18995',
  soc_controls = 'Operator maintains records; LEA inspects and enforces; CalRecycle concurrence on permits; RWQCB issues discharge requirements separately; third-party testing for pathogen/metals compliance'
WHERE name = 'Composting Facility Operator / Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSC 25100-25259 (Hazardous Waste Control Act); HSC 25200-25205 (Facility Permits); 22 CCR 66260-66270; 40 CFR 260-272 (Federal RCRA); HSC 25404 (Unified Program/CUPA)',
  standards_of_creation = 'Part A/B permit applications per 22 CCR 66270; waste analysis plans per 22 CCR 66264.13; contingency plans per 22 CCR 66264.50-56; closure/post-closure per 22 CCR 66264.110-120; biennial reports per 22 CCR 66264.75',
  soc_controls = 'DTSC issues permits; EPA retains oversight; financial assurance reviewed independently (22 CCR 66264.140-151); waste analysis by certified laboratory; DTSC facility inspection separate from self-monitoring'
WHERE name = 'Hazardous Waste Facility Manager / Operator';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSC 25163-25169.9 (Transporter Registration); HSC 25160 (Manifest); HSC 25166.5 (Two-Year Registration); HSC 25169 (Financial Responsibility); HSC 25169.7-25169.9 (Driver Qualifications); 22 CCR 66263; 49 CFR 171-180',
  standards_of_creation = 'Uniform Hazardous Waste Manifest per HSC 25160; transporter registration per HSC 25165; financial responsibility per HSC 25169; driver qualification files per 49 CFR 391; vehicle inspection per 49 CFR 396',
  soc_controls = 'Three-party chain of custody on every manifest (generator/transporter/facility); DTSC registers transporters; DOJ runs background checks per HSC 25169.9; CHP inspects vehicles independently; insurance/bond verification separate from registration'
WHERE name = 'Registered Hazardous Waste Transporter';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSC 25100-25250 (Generator Requirements); HSC 25507 (Business Plans); HSC 25404 (Unified Program); 22 CCR 66262 (Generator Standards); 40 CFR 262',
  standards_of_creation = 'EPA ID number application (Form 8700-12); waste determinations per 22 CCR 66262.11; manifest completion per HSC 25160; biennial reports per 22 CCR 66262.41; business plans per HSC 25507; training records per 22 CCR 66265.16',
  soc_controls = 'Generator self-classifies; DTSC can reclassify; CUPA inspects generators; DTSC audits CUPAs; manifest chain requires independent transporter/facility signatures; lab characterization independent of generator determination'
WHERE name = 'Hazardous Waste Generator Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSC 117600-118360 (Medical Waste Management Act); HSC 117715 (Permit definition); HSC 117820 (Management Program); HSC 118029 (Hauler Registration); HSC 118135-118235 (Offsite Treatment); HSC 118340 (Prohibited Activities)',
  standards_of_creation = 'Medical waste management plans per HSC 117935; treatment facility permit applications per HSC 118155; emergency action plans per HSC 118235; tracking documents per HSC 118040; generator registration per HSC 117995',
  soc_controls = 'Generator tracks; transporter holds separate registration (HSC 118029); treatment facility requires independent permit (HSC 118135); CDPH reviews compliance history (HSC 118160); enforcement agency can condition permits independently (HSC 118190)'
WHERE name = 'Medical Waste Management Officer / Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'PRC 42463-42479 (Electronic Waste Recycling Act); PRC 42464 (Recycling Fee); PRC 42464.3 (Info Sharing); PRC 42465.2 (Manufacturer Reporting); PRC 42474 (Civil Liability); HSC 25214.10-25214.10.2',
  standards_of_creation = 'Manufacturer reports per PRC 42465.2 (annually); recycler approval applications per PRC 42479; fee collection records per PRC 42464; export documentation per PRC 42476.5; payment claim documentation',
  soc_controls = 'CDTFA collects fees; CalRecycle administers program; DTSC regulates hazardous components — three separate agencies (PRC 42464.3); recycler approval separate from fee collection; manufacturer reporting independently verified'
WHERE name = 'E-Waste Recycling Program Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSC 25250-25250.30 (Used Oil Recycling Act); HSC 25250.7 (Contamination Prohibition); HSC 25250.16 (Recycler Authorization); HSC 25250.17 (Biennial Reporting); HSC 25250.18-25250.19 (Transport/Testing); PRC 48600-48691',
  standards_of_creation = 'Recycler authorization per HSC 25250.16; biennial reports per HSC 25250.17; certification forms per HSC 25250.18; test results per HSC 25250.19; pre-shipment testing per HSC 25250.29',
  soc_controls = 'DTSC authorizes recyclers; CalRecycle administers collection; testing before transport is independent checkpoint (HSC 25250.19); generator/transporter/recycler each have separate obligations; out-of-state facilities require independent registration'
WHERE name = 'Used Oil Program Manager / Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'PRC 42860-42899 (Tire Recycling Act); PRC 42885.5 (Five-Year Plan); PRC 42889 (Tire Fee Revenue); 14 CCR 18450-18474',
  standards_of_creation = 'Waste tire hauler registration per 14 CCR 18456; tire manifest/tracking per 14 CCR 18459; storage facility permits per 14 CCR 18462; five-year plan compliance per PRC 42885.5',
  soc_controls = 'CalRecycle registers haulers and inspects storage sites independently; CDTFA administers tire fee collection separately; hauler manifest chain: generator to hauler to end-use; storage site inspection separate from hauler registration'
WHERE name = 'Waste Tire Program Manager / Hauler';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSC 114960-115185 (Radiation Control); HSC 115000.1 (Definitions); HSC 115005 (State Management Plan); HSC 115010 (Land Disposal License); HSC 115250-115261 (Southwestern Compact); 10 CFR 20, 30, 40, 61',
  standards_of_creation = 'License applications per HSC 115010 (seven requirements); financial reports per HSC 115040; waste characterization per 10 CFR 61.55-61.56; manifest/tracking per 10 CFR 20.2006; emergency procedures per 10 CFR 20.1801-1802',
  soc_controls = 'CDPH licenses; NRC retains federal oversight; financial assurance reviewed independently (HSC 115040); advisory committee per HSC 115055; interstate compact governance per HSC 115255; independent contamination assessment per HSC 115185'
WHERE name = 'Radioactive Waste / Radiation Safety Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'PRC 44017 (WTE Operating Procedures); PRC 44150 (Transformation Facility Permit); PRC 44152 (CalRecycle Concurrence); PRC 40201 (Transformation definition); HSC 39000 et seq. (Air Quality — CARB); 40 CFR 60 Subpart Eb/AAAA',
  standards_of_creation = 'Facility permit with energy conversion provisions per PRC 44017; air emission monitoring per CARB; ash disposal characterization per 22 CCR 66262.11; diversion credit calculations per PRC 41780',
  soc_controls = 'LEA issues permit; CalRecycle must concur in writing (PRC 44152); CARB regulates air emissions independently; RWQCB regulates water discharge independently; ash characterization laboratory independent of facility'
WHERE name = 'Waste-to-Energy (WTE) Facility Compliance Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'PRC 42040-42060 (Extended Producer Responsibility); PRC 42051.1 (PRO Plan Approval); SB 54 (Plastic Pollution Prevention Act); PRC 42420.1 (Covered Material); PRC 42986-42990.1 (Mattress Recycling)',
  standards_of_creation = 'PRO plans per PRC 42051.1; annual budget and plan submissions per PRC 42051.1(a); compliance reports per PRC 42990.1 (annual, public); brand/trademark registration per PRC 42420.1; source reduction targets and recycling rate documentation',
  soc_controls = 'Producers fund; CalRecycle approves plans and audits; PRO is independent entity from individual producers; advisory committee reviews per PRC 42990.1; annual public reporting creates transparency checkpoint'
WHERE name = 'EPR Program Compliance Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'PRC 41780-41821.5 (Source Reduction and Recycling); PRC 41821 (Annual Reporting); PRC 41821.5 (Disposal Reporting); PRC 42649.82 (SB 1383 Organic Waste); 14 CCR 18993-18995; AB 939 (50% Diversion)',
  standards_of_creation = 'Source Reduction and Recycling Elements per PRC 41780; annual reports per PRC 41821; disposal tonnage reports per PRC 41821.5; SB 1383 implementation records per 14 CCR 18993; edible food recovery documentation',
  soc_controls = 'Jurisdiction prepares; CalRecycle reviews and approves; disposal facility operators report independently (PRC 41821.5); CalRecycle can issue compliance orders; SB 1383 enforcement by jurisdiction with CalRecycle oversight'
WHERE name = 'Recycling / Diversion Program Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'PRC 41821.3 (Inert Waste); PRC 41781.3 (Beneficial Reuse); 14 CCR 17381-17383 (C&D Debris Recycling); CALGreen Code Title 24 Part 11 Section 5.408',
  standards_of_creation = 'Waste management plans per CALGreen 5.408; diversion documentation and receipts; inert waste facility reporting per PRC 41821.3; beneficial reuse authorization per PRC 41781.3',
  soc_controls = 'Contractor prepares plan; local building dept reviews; recycling facility reports independently to CalRecycle; LEA inspects C&D facilities separately; third-party weight tickets verify diversion claims'
WHERE name = 'C&D Recycling Compliance Manager';

-- ============================================================================
-- SECTION 12: WATER / WASTEWATER TREATMENT (15 Personas)
-- ============================================================================

UPDATE citizen_catalog SET
  governing_guidelines = 'HSC 116270-116762 (California Safe Drinking Water Act); HSC 116330 (Local Primacy); HSC 116600 (Operator Certification); 22 CCR 63750-64703; 23 CCR 3680-3699; 40 CFR 141-143 (Federal SDWA/NPDWR)',
  standards_of_creation = 'Operator certification per HSC 116600 and 23 CCR 3680; Consumer Confidence Reports per 40 CFR 141.153 (annual); water quality monitoring per 22 CCR 64400-64500; treatment technique compliance per 22 CCR 64650-64660; monthly operating reports',
  soc_controls = 'Operator certified by SWRCB; certified laboratory performs analysis independently; CCR delivered to consumers (transparency); SWRCB conducts sanitary surveys (every 3-5 years); operator grade must match facility classification'
WHERE name = 'Certified Water Treatment Operator (Grades T1-T5)';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSC 116600 (Operator Certification); 23 CCR 3680-3699; HSC 116277 (Lead Sampling in Schools); 22 CCR 64572-64578 (Distribution System); 40 CFR 141.80-141.90 (Lead and Copper Rule)',
  standards_of_creation = 'Distribution system monitoring plans; lead/copper sampling per 40 CFR 141.86-141.90; school lead sampling per HSC 116277; system flushing/maintenance records; cross-connection control program records',
  soc_controls = 'Operator certified independently by SWRCB; lead sampling by certified laboratory; school outreach per HSC 116277 documented separately; local health department may inspect independently'
WHERE name = 'Certified Water Distribution Operator (Grades D1-D5)';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSC 116810 (Backflow Testing Qualification); 17 CCR 7583-7605 (Cross-Connection Control); AWWA M14 (Backflow Prevention); Local water purveyor ordinances',
  standards_of_creation = 'Test reports per 17 CCR 7605 (annual testing); tester certification per HSC 116810; test gauge calibration records (annual, certified); installation inspection reports; hazard assessment surveys',
  soc_controls = 'Tester certified independently; cannot test own installed assemblies; local water purveyor maintains program separately; test gauge calibration by independent certified laboratory; SWRCB sets standards, local agencies enforce'
WHERE name = 'Certified Backflow Prevention Assembly Tester';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSC 116330 (Local Primacy Delegation); 22 CCR 64100-64115 (Sanitary Survey Requirements); 40 CFR 142.16 (State Primacy — Sanitary Survey Frequency)',
  standards_of_creation = 'Sanitary survey reports per 22 CCR 64100 (8-component evaluation); deficiency notices and corrective action tracking; significant deficiency reports per 40 CFR 142.16; follow-up compliance verification',
  soc_controls = 'Inspector employed by primacy agency (independent of water system); results reported to SWRCB separately from system self-reporting; corrective actions tracked independently until closure; public notification for significant deficiencies'
WHERE name = 'Sanitary Survey Inspector / Water System Evaluator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Water Code 13625-13628 (Wastewater Operator Certification); Water Code 13625 (Chief Plant Operator); Water Code 13628 (Triennial Renewal); 23 CCR 3670-3679; 40 CFR 122-125 (NPDES)',
  standards_of_creation = 'Operator certification per Water Code 13625-13628 (triennial renewal); monthly DMRs per NPDES permit; annual facility reports; process control records and daily logs; sludge/biosolids per 40 CFR 503',
  soc_controls = 'SWRCB certifies operators; RWQCB issues discharge permits (separate); chief plant operator per Water Code 13625(a); DMRs signed by certified operator reviewed by RWQCB; laboratory analysis by ELAP-certified lab; operator grade matches facility'
WHERE name = 'Certified Wastewater Treatment Plant Operator (Grades I-V)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Water Code 13260 (Discharge Reports); Water Code 13370.5 (Federal Pretreatment); Water Code 13385 (Civil Liability); Water Code 13399.30/13399.43 (Storm Water NPDES); 40 CFR 122-125; 40 CFR 403 (Pretreatment)',
  standards_of_creation = 'NPDES permit applications per Water Code 13260; DMRs per permit schedule; SWPPPs; industrial pretreatment program per 40 CFR 403; spill prevention plans; annual pretreatment reports',
  soc_controls = 'RWQCB issues permits; EPA retains oversight per CWA 402; discharger self-monitors; RWQCB verifies through inspections; storm water per Water Code 13399.30; civil liability per Water Code 13385 (strict, per-day); pretreatment: POTW enforces, RWQCB oversees'
WHERE name = 'NPDES Compliance Manager / Industrial Pretreatment Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'SWRCB Order 2006-0003-DWQ (Statewide Sanitary Sewer WDR); SWRCB Order 2022-0103-DWQ (Updated SSO Reporting); Local sewer lateral ordinances; NASSCO PACP/LACP/MACP',
  standards_of_creation = 'CCTV inspection reports per NASSCO PACP; sewer lateral inspection reports; SSO reports per SWRCB Order; collection system management plans; grease interceptor inspection records',
  soc_controls = 'Inspector certified by NASSCO (independent); SSO reporting to SWRCB within 2 hours; local district enforces laterals; RWQCB enforces collection system WDR; grease interceptor inspection separate from collection system inspection'
WHERE name = 'Sewer Lateral Inspector / Collection System Operator';

UPDATE citizen_catalog SET
  governing_guidelines = 'AWWA C700-C715 (Water Meter Standards); AWWA M6 (Water Meters); 17 CCR 7500-7605; NIST Handbook 44 (Measuring Devices)',
  standards_of_creation = 'Meter test reports per AWWA M6 (accuracy at low/mid/high flow); calibration certificates traceable to NIST; test bench calibration records; meter replacement/installation records; large meter testing per AWWA C704',
  soc_controls = 'Tester operates independently of billing department; calibration traceable to NIST (external reference); test results against AWWA accuracy standards (independent threshold); customer dispute testing by separate tester'
WHERE name = 'Water Meter Tester / Metrologist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Water Code 6000-6200 (Dams and Reservoirs); Water Code 6102.5 (Risk-Based Inspection); Water Code 6103 (Risk-Informed Decision Making); 23 CCR 300-362; FEMA P-93',
  standards_of_creation = 'Inspection reports per Water Code 6102.5; risk assessment per Water Code 6103; emergency action plans per 23 CCR 335; inundation maps per Water Code 6160-6162; instrumentation/monitoring records',
  soc_controls = 'DSOD inspects independently of dam owner; risk classification determines frequency (Water Code 6102.5); national dam safety orgs consulted per Water Code 6103; EAPs reviewed by OES separately; owner monitoring separate from state inspection'
WHERE name = 'Dam Safety Inspector / Dam Safety Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Water Code 8000-9502 (Flood Control); Water Code 16101 (Municipal Storm Sewer NPDES); Gov. Code 8589.5 (Dam Failure Inundation); 33 CFR 208.10 (Federal Levee Inspection); USACE ER 500-1-1',
  standards_of_creation = 'Periodic inspection reports per USACE standards; levee system evaluation reports; flood control maintenance records; encroachment permit documentation; O&M manuals per USACE requirements',
  soc_controls = 'USACE inspects federally authorized levees; DWR inspects state levees; local maintaining agency separate from inspection authority; FEMA accredits levees for NFIP independently; annual certification by local agency separate from inspection'
WHERE name = 'Flood Control Inspector / Levee Safety Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Water Code 13500-13557 (Water Recycling); 22 CCR 60301-60357 (Recycling Criteria); HSC 116551 (Indirect Potable Reuse); 40 CFR 141 (Federal SDWA for IPR/DPR)',
  standards_of_creation = 'Engineering reports per 22 CCR 60323; permit applications per Water Code 13523; Title 22 monitoring per 22 CCR 60321; use area inspection records; cross-connection control for dual-plumbed systems',
  soc_controls = 'DDW reviews engineering reports; RWQCB issues permits (dual review); recycled water producer separate from end users; independent laboratory monitoring per Title 22; cross-connection control inspected separately'
WHERE name = 'Water Recycling Program Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'Water Code 10720-10737 (SGMA); Water Code 13260 (Groundwater Monitoring); 23 CCR 350-354; 27 CCR 20380-20435 (Groundwater at Waste Sites); GAMA Program',
  standards_of_creation = 'GSPs per Water Code 10727; monitoring well construction/destruction reports per DWR; quarterly/semi-annual monitoring reports; GAMA sampling and analysis records; well completion reports per Water Code 13750-13755',
  soc_controls = 'GSA prepares GSP; DWR reviews independently; monitoring by certified professionals; laboratory by ELAP-certified lab; RWQCB oversight separate from GSA; well drillers licensed independently (C-57)'
WHERE name = 'Groundwater Monitoring Specialist / Hydrogeologist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Water Code 10608-10608.64 (Water Conservation Act 2009 — SBx7-7); Water Code 10610-10657 (Urban Water Management Plans); Water Code 1011; Executive Orders on Drought; 23 CCR 862-864',
  standards_of_creation = 'UWMPs per Water Code 10610 (every 5 years); water loss audits per Water Code 10608.34; drought contingency plans; water budget reports per Water Code 10631; conservation program effectiveness reporting',
  soc_controls = 'Water agency prepares UWMP; DWR reviews; SWRCB enforces conservation mandates independently; water loss audits use AWWA methodology (external standard); public review period for UWMPs (transparency checkpoint)'
WHERE name = 'Water Conservation Program Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'Water Code 13142.5 (Ocean Waters Discharge); SWRCB Ocean Plan Amendment for Desalination (2015); Coastal Act Section 30000 et seq.; 40 CFR 122-125 (NPDES for Brine)',
  standards_of_creation = 'Coastal development permit applications; NPDES permit for brine/concentrate discharge; intake/outfall technology assessment per Ocean Plan Amendment; marine life mortality studies; energy minimization plans',
  soc_controls = 'CCC reviews coastal impacts; RWQCB reviews water quality (dual jurisdiction); SWRCB Ocean Plan sets intake technology standards independently; marine biological assessment by independent consultant; CEQA/NEPA review separate from permit issuance'
WHERE name = 'Desalination Plant Compliance Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'Water Code 1200-1851 (Appropriative Water Rights); Water Code 2500-2900 (Statutory Adjudications); Water Code 1011 (Water Conservation and Transfer); 23 CCR 650-862',
  standards_of_creation = 'Water right applications per Water Code 1250-1260; annual water use reports per Water Code 5100-5108; adjudication petitions and decrees; water transfer/change petitions per Water Code 1700-1707; proof of beneficial use per Water Code 1600-1610',
  soc_controls = 'SWRCB adjudicates rights; courts handle statutory adjudications (separate forums); applicant bears burden of proof; CEQA required for new appropriations; protests from other water rights holders (adversarial checkpoint)'
WHERE name = 'Water Rights Analyst / Specialist';

-- ============================================================================
-- SECTION 13: PEST CONTROL (12 Personas)
-- ============================================================================

UPDATE citizen_catalog SET
  governing_guidelines = 'BPC 8500-8698.2 (Structural Pest Control Act); BPC 8520.1 (Public Protection Priority); BPC 8550 (Unlicensed Practice); BPC 8560 (Branch Licensing); BPC 8663 (Subcontractor Violations); 16 CCR 1970-1999; 3 CCR 6000-6784',
  standards_of_creation = 'Fumigation notice per 3 CCR 6784; fumigation clearance per 3 CCR 6780; pesticide use reports per FAC 12988 (monthly to County Ag Commissioner); warning signs/placards per 3 CCR 6784; clearance device readings; worker safety per 3 CCR 6700-6740',
  soc_controls = 'Operator licensed by SPCB; DPR regulates pesticide use (dual per BPC 8698.2); fumigation notice to occupants separate from clearance; clearance by licensed operator required before re-entry; County Ag Commissioner enforces use reporting independently'
WHERE name = 'Licensed Structural Pest Control Operator, Branch 1';

UPDATE citizen_catalog SET
  governing_guidelines = 'BPC 8500-8698.2 (Structural Pest Control Act); BPC 8514 (Branch 2/3 Documents); BPC 8538 (Written Notice to Owner/Tenant); BPC 8560 (Branch Licensing); 16 CCR 1970-1999; 3 CCR 6000-6784',
  standards_of_creation = 'Pest control contract per BPC 8514 (no work without signed contract); written notices per BPC 8538 (clear disclosure); pesticide use reports per FAC 12988; service records and treatment documentation; IPM plans where applicable',
  soc_controls = 'SPCB licenses operator; DPR regulates products; written notice to owner AND tenant (BPC 8538 — dual notification); contract must precede work (BPC 8514); pesticide use reported to County Ag Commissioner independently'
WHERE name = 'Licensed Structural Pest Control Operator, Branch 2';

UPDATE citizen_catalog SET
  governing_guidelines = 'BPC 8516 (WDO Inspection/Report); BPC 8519 (Certification of Absence/Presence); BPC 8514 (Contract Requirements); BPC 8560 (Branch Licensing); 16 CCR 1996-1996.6 (WDO Report Standards)',
  standards_of_creation = 'WDO inspection reports per BPC 8516 (standardized form per 16 CCR 1996); Section 1 findings: active infestation requiring treatment; Section 2 findings: conditions conducive; certification per BPC 8519; completion notices per 16 CCR 1996.4',
  soc_controls = 'Inspector licensed by SPCB; Section 1 vs. Section 2 creates priority framework; completion notice separate from inspection; real estate transactions: WDO report delivered to all parties independently; SPCB can discipline for inaccurate reports (BPC 8662)'
WHERE name = 'Licensed Structural Pest Control Operator, Branch 3 (WDO Inspector)';

UPDATE citizen_catalog SET
  governing_guidelines = 'BPC 8505-8505.17 (Company Registration); BPC 8514 (Company Document Obligations); BPC 8516 (Company WDO Obligations); BPC 8538 (Written Notice); BPC 8662 (Disciplinary Actions); BPC 8674 (Fee Schedule); 16 CCR 1937-1950',
  standards_of_creation = 'Company registration application and renewal; branch office registration per 16 CCR 1937; company-issued inspection reports and contracts; insurance/bond documentation; employee qualification records',
  soc_controls = 'Company registered separately from individual operator licenses; SPCB Education and Enforcement Fund per BPC 8505.17; disciplinary actions against company separate from individual (BPC 8662); insurance requirements verified independently'
WHERE name = 'Registered Pest Control Company / Company Branch Office Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'FAC 12001-12051 (PCA Licensing); FAC 12021 (Application); FAC 12023 (Refusal/Revocation); FAC 12031 (County Registration); FAC 12035 (County Discipline); FAC 12051 (Unlicensed Practice); 3 CCR 6000 et seq.',
  standards_of_creation = 'Written pest management recommendations per FAC 12001; county registration per FAC 12031 (each county); recommendation records per 3 CCR 6552; continuing education records; written IPM recommendations',
  soc_controls = 'DPR licenses statewide; County Ag Commissioner registers locally (FAC 12031/12035); adviser makes recommendation, applicator applies (separation); county can independently suspend (FAC 12035); written recommendation required before restricted material'
WHERE name = 'Licensed Agricultural Pest Control Adviser';

UPDATE citizen_catalog SET
  governing_guidelines = 'FAC 14006.5 (Restricted Materials Permit); FAC 14006.6 (Exceptions); FAC 12988 (Pesticide Use Reporting); 3 CCR 6400-6484; 3 CCR 6624-6628',
  standards_of_creation = 'Restricted materials permit application per FAC 14006.5; pesticide use reports per FAC 12988 (within 7 days); pre-application site evaluation; notification records per 3 CCR 6432; application records per 3 CCR 6624',
  soc_controls = 'County Ag Commissioner issues permits; DPR sets restricted materials list (FAC 14006.5); PCA recommendation required (separate professional); use reports filed independently; commissioner can deny based on local conditions (FAC 14006.6)'
WHERE name = 'Restricted Materials Permit Holder / Certified Applicator';

UPDATE citizen_catalog SET
  governing_guidelines = 'FAC 12101-12131 (Pest Control Dealer Licensing); FAC 12101.5 (Designated Agent); FAC 11402 (License Definition); 3 CCR 6302-6360',
  standards_of_creation = 'Dealer license application/renewal; designated agent qualification per FAC 12101.5; sales records for restricted materials per 3 CCR 6302; inventory tracking records; customer verification records',
  soc_controls = 'DPR licenses dealers; County Ag Commissioner inspects locally; designated agent qualified independently (FAC 12101.5); restricted material sales only to permitted buyers; sales records auditable by DPR and County independently'
WHERE name = 'Licensed Pest Control Dealer';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSC 2000-2093 (Mosquito Abatement and Vector Control Districts); HSC 116110-116115 (Vector Control); 3 CCR 6000 et seq.; FAC 12988; NPDES Permit for Larvicide/Adulticide',
  standards_of_creation = 'District annual work plans; surveillance/monitoring reports (trap data, disease testing); pesticide use reports per FAC 12988; NPDES compliance records; public notification records; resistance monitoring data',
  soc_controls = 'District operates independently; CDPH provides disease surveillance; DPR regulates pesticide use separately; NPDES permit from RWQCB (third authority); public notification independent of application decision'
WHERE name = 'Vector Control Technician / District Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'Fish & Game Code 4150-4156 (Depredation Permits); 14 CCR 472-475 (Trapping); FGC 4180-4184 (Trap Registration); 3 CCR 6000 et seq. (Rodenticides); FAC 12978.7 (Anticoagulant Restrictions); MBTA 16 USC 703-712',
  standards_of_creation = 'Depredation permits per FGC 4152; trap registration per FGC 4180; wildlife removal logs and disposition records; pesticide use reports for rodenticides per FAC 12988; bird management compliance (MBTA permits)',
  soc_controls = 'CDFW issues depredation permits; DPR regulates chemical methods (separate); USFWS oversees migratory birds independently (MBTA); trap registration independent of licensing; humane treatment standards enforced separately'
WHERE name = 'Licensed Wildlife Control Operator';

UPDATE citizen_catalog SET
  governing_guidelines = '3 CCR 6700-6740 (Worker Safety/WPS); FAC 12980-12988; 40 CFR 170 (Federal WPS); 8 CCR 5194 (Cal/OSHA Hazard Communication); Lab. Code 6300 et seq.',
  standards_of_creation = 'Worker safety training records per 3 CCR 6724; central notification posting per 3 CCR 6724; pesticide illness/injury reports per 3 CCR 6728; SDS maintenance; REI posting records; PPE records; handler/worker training verification',
  soc_controls = 'DPR sets WPS standards; County Ag Commissioner enforces (separate); Cal/OSHA enforces worker safety independently; illness reports to County AND physician (dual); training by employer, verified by County during inspection'
WHERE name = 'Pesticide Safety Officer / WPS Compliance Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSC 17608-17610 (Healthy Schools Act 2000); Education Code 17610-17613 (School IPM); 3 CCR 6690-6700 (School Pesticide Use); FAC 12988; EPA PRN 2002-1 (School IPM Guidance)',
  standards_of_creation = 'Annual pesticide use notification to parents/staff per Education Code 17612; IPM plans per HSC 17608; warning sign posting per Education Code 17610; pesticide use reports per FAC 12988; 72-hour pre-application notification; alternative methods assessment',
  soc_controls = 'School district designates coordinator; DPR enforces pesticide rules independently; parent/staff notification separate from application decision (transparency); County Ag Commissioner can inspect independently; CDE oversees education facility compliance separately'
WHERE name = 'School IPM Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = '16 CCR 1970.4 (Vehicle Equipment Requirements); 3 CCR 6600 (Equipment Inspection); BPC 8538 (Company Vehicle Identification); CVC 27907 (Vehicle Marking)',
  standards_of_creation = 'Vehicle inspection records per 16 CCR 1970.4; equipment calibration records per 3 CCR 6600; vehicle identification/marking compliance; safety equipment inventory; spill kit inspection records',
  soc_controls = 'SPCB sets vehicle standards; County Ag Commissioner inspects equipment; DPR regulates calibration separately; vehicle marking enforceable by multiple agencies'
WHERE name = 'Pest Control Vehicle Inspector / Equipment Compliance Officer';

-- ============================================================================
-- SECTION 14: TOWING / VEHICLE RECOVERY (13 Personas)
-- ============================================================================

UPDATE citizen_catalog SET
  governing_guidelines = 'VEH 2430.1 (Tow Truck Driver Definition); VEH 2430.3 (Driver Notification — Employer/DMV); VEH 2432-2432.3 (Driver Application/Local Authority); VEH 22513 (Solicitation Prohibition); VEH 22513.1 (Vehicle Receipt); VEH 24605 (Lamps); VEH 27907 (ID Display)',
  standards_of_creation = 'Driver application per VEH 2432; employer notification per VEH 2430.3; DMV notification per VEH 2430.3; vehicle receipt per VEH 22513.1 (name, address, phone, conditions); equipment per VEH 24605; vehicle marking per VEH 27907',
  soc_controls = 'CHP certifies for rotation; local agencies regulate locally (VEH 2432.3); driver must notify BOTH employer AND DMV (VEH 2430.3); vehicle receipt creates chain-of-custody (VEH 22513.1); solicitation at accidents is criminal (VEH 22513)'
WHERE name = 'Certified Tow Truck Driver';

UPDATE citizen_catalog SET
  governing_guidelines = 'VEH 2430.1-2432.3; VEH 22651-22651.07 (Vehicle Removal Authority); VEH 21718-21719 (Freeway Removal); 13 CCR 1050-1069 (CHP Tow Regulations); CHP HPM 81.3',
  standards_of_creation = 'CHP rotation application and inspection records per HPM 81.3; annual tow truck inspection reports; equipment standards compliance; storage facility inspection records; insurance/bond per 13 CCR 1052; response time logs',
  soc_controls = 'CHP inspects trucks annually (independent); rotation assignment by CHP dispatch (independent of tow company); storage facility inspected separately; insurance verified independently; DMV records check per VEH 2430.3'
WHERE name = 'CHP Tow Rotation Coordinator / Tow Company Rotation Participant';

UPDATE citizen_catalog SET
  governing_guidelines = 'VEH 2430.1-2432.3 (Business Requirements); VEH 22651.07 (Rate/Fee Disclosure); VEH 22524.5 (Insurance Tow Charges); VEH 34631.5 (Motor Carrier Liability); Local tow franchise/permit per VEH 21100',
  standards_of_creation = 'Business license/permit applications; rate schedule posting per VEH 22651.07; insurance certificates per VEH 34631.5; employee driver files per VEH 2430.3; vehicle fleet inspection records; tow billing documentation',
  soc_controls = 'CHP inspects for rotation; local jurisdiction issues business permit (dual authority); rate schedules must be posted (VEH 22651.07); insurance carrier verified independently; employee background checks reported to DMV (VEH 2430.3)'
WHERE name = 'Tow Company Business Manager / Owner';

UPDATE citizen_catalog SET
  governing_guidelines = 'VEH 22651-22654 (Vehicle Removal Authority); VEH 22651.07 (Charge Disclosure); VEH 14602.6 (Impound — Suspended License); VEH 14602.7-14602.8 (Court Order/DUI); VEH 22659.5 (Nuisance Vehicle); VEH 23109.2 (Exhibition of Speed); VEH 23118 (DUI Forfeiture)',
  standards_of_creation = 'CHP 180 form (Authorization for Tow); vehicle impound reports per VEH 22651; stored vehicle notification per VEH 22852; 30-day DUI hold per VEH 14602.6; evidence hold documentation; vehicle release authorization; nuisance seizure per VEH 22659.5',
  soc_controls = 'Peace officer authorizes; tow company executes (separation); stored vehicle notification independent of impound (VEH 22852); DUI holds: officer initiates, court reviews (VEH 23118); evidence holds: law enforcement controls release; post-storage hearing per VEH 22852'
WHERE name = 'Law Enforcement Tow Coordinator / Property and Evidence Tow Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'VEH 22651-22654 (Vehicle Removal from Highway); VEH 22654 (Abandoned Vehicle Removal); VEH 22669-22670 (Disposal); VEH 22851.3 (Unclaimed Vehicles); Gov. Code 38771-38773 (Municipal Authority)',
  standards_of_creation = 'Abandoned vehicle abatement notices per VEH 22654; vehicle valuation per VEH 22670 ($500 threshold); DMV registration search records; owner/lienholder notification per VEH 22851.3; disposal authorization records; annual reports',
  soc_controls = 'Peace officer/employee tags vehicle; separate removal authorization process; DMV search independent of tagging; owner notification before disposal (due process); valuation determines lien sale vs. disposal (VEH 22670); local programs under state authority'
WHERE name = 'Abandoned Vehicle Abatement Program Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'VEH 21719 (Emergency Vehicle Removal); Gov. Code 8550-8668 (California Emergency Services Act); CHP Emergency Tow Protocols; 19 CCR 2400-2450',
  standards_of_creation = 'Emergency tow authorization records; OES activation documentation; vehicle disposition records under emergency authority; cost recovery documentation; after-action reports',
  soc_controls = 'OES declares emergency; CHP coordinates tow (dual authority); emergency authority is time-limited (separate from routine); cost recovery reviewed independently; after-action reports separate from operational records'
WHERE name = 'OES (Office of Emergency Services) Tow Program Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'VEH 22658 (Private Property Vehicle Removal); VEH 22651.07 (Charge Disclosure); VEH 22524.5 (Insurer Charges); CVC 3068-3074 (Possessory Liens); Local PPI ordinances per VEH 21100',
  standards_of_creation = 'Written authorization from property owner/agent per VEH 22658; signage compliance documentation; vehicle condition documentation at tow; stored vehicle notification per VEH 22852; rate schedule compliance per VEH 22651.07; photographic evidence',
  soc_controls = 'Property owner authorizes; tow company executes (separation per VEH 22658); signage must pre-exist tow; stored vehicle notification independent of authorization; owner can request post-storage hearing; rate limitations apply regardless of private authorization'
WHERE name = 'Private Property Tow / PPI Authorization Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'CVC 3068-3074 (Possessory Liens — Vehicle); VEH 22670 (Lien Sale — $500 Threshold); VEH 10652.5 (Lien Holder Notification); VEH 22851.3 (Low-Value Vehicle Disposal); 13 CCR 225-225.50 (DMV Lien Sale)',
  standards_of_creation = 'Lien sale application to DMV per CVC 3068; certified mail notification per VEH 10652.5; vehicle valuation per VEH 22670; 15-day/30-day waiting period compliance; publication notices (over threshold); DMV title transfer documentation; auction records and proceeds accounting',
  soc_controls = 'Lienholder applies; DMV authorizes sale (separate); registered owner notification by certified mail; value determination triggers different paths (VEH 22670); waiting periods mandatory due process; proceeds: costs first, excess to owner (statutory distribution)'
WHERE name = 'Lien Sale Processor / Vehicle Lien Clerk';

UPDATE citizen_catalog SET
  governing_guidelines = 'VEH 22651.07 (Storage Charge Requirements); VEH 22513.1 (Vehicle Documentation at Receipt); VEH 22524.5 (Insurance Tow/Storage); 13 CCR 1050-1069 (Storage Facility Requirements); Local zoning and use permits',
  standards_of_creation = 'Vehicle receipt per VEH 22513.1 (all conditions recorded); storage rate schedules per VEH 22651.07 (posted and disclosed); vehicle inventory/condition reports; security/access logs; insurance documentation; facility license/permit; 24-hour release availability records',
  soc_controls = 'CHP inspects storage facilities; local jurisdiction issues use permits (dual); rate schedules posted independently of billing; vehicle condition documented at receipt (baseline); 24-hour release per VEH 22651.07; insurance charges subject to insurer review per VEH 22524.5'
WHERE name = 'Vehicle Storage Facility (VSF) Operator / Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'BPC 7500-7511 (Repossession Agency Act); BPC 7502 (License Required); BPC 7505.1-7505.3 (Qualified Certificate Holder); BPC 7507.4 (No Payment in Lieu); BPC 7507.9 (Personal Effects); BPC 7507.10 (Notice of Seizure — 48 Hours); BPC 7508-7508.6 (Prohibited Acts)',
  standards_of_creation = 'License/registration per BPC 7503; notice of seizure per BPC 7507.10 (within 48 hours); personal effects inventory per BPC 7507.9; repossession assignment documentation; collateral condition reports; QCH designation per BPC 7505.1',
  soc_controls = 'BSIS licenses agencies; DMV records vehicle title (separate); seizure notice within 48 hours (due process per BPC 7507.10); personal effects inventoried (BPC 7507.9); no payment demand in lieu (BPC 7507.4); false representations prohibited (BPC 7508.3); license conspicuously displayed'
WHERE name = 'Licensed Repossession Agent / Qualified Certificate Holder';

UPDATE citizen_catalog SET
  governing_guidelines = 'BPC 7500-7511 (Repossession Agency Act); BPC 7508.2 (Prohibited Acts — Skip Recovery); BPC 7508.3 (False Representations); CVC 3068-3074 (Vehicle Lien Enforcement); Commercial Code 9609 (Self-Help — No Breach of Peace)',
  standards_of_creation = 'Assignment documentation from lienholder; vehicle location/skip trace records; recovery documentation (time, place, conditions); breach of peace avoidance documentation; law enforcement notification records; debtor contact records',
  soc_controls = 'Lienholder assigns; agent recovers (separation); no breach of peace (independent legal standard); law enforcement may be present but does not authorize civil repossession; all prohibited acts under BPC 7508.2 apply to skip recovery'
WHERE name = 'Skip Tow Investigator / Recovery Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'VEH 22513 (Solicitation at Accidents — Misdemeanor); VEH 22513.1 (Vehicle Documentation at Receipt); VEH 21719 (Emergency Roadway Clearance); VEH 22651 (Law Enforcement Removal); CHP HPM 81.3',
  standards_of_creation = 'Scene arrival documentation (time, authorization); vehicle condition per VEH 22513.1; law enforcement authorization records; anti-solicitation compliance; hazardous materials notification if applicable; tow destination records',
  soc_controls = 'Law enforcement controls scene; tow operator responds on assignment (not self-dispatched); VEH 22513 makes solicitation criminal (strict prohibition); vehicle condition documented at scene (independent baseline); rotation dispatch creates assignment record'
WHERE name = 'Accident Scene Tow Operator';

UPDATE citizen_catalog SET
  governing_guidelines = 'VEH 34631.5 (Motor Carrier Liability); VEH 21719 (Emergency Roadway Clearance); 49 CFR 390-399 (Federal Motor Carrier Safety Regulations); CHP HPM 81.3 (Heavy Rotation); Caltrans Encroachment Permits',
  standards_of_creation = 'Heavy-duty tow permits and certifications; motor carrier operating authority per VEH 34631.5; equipment certification records (crane, rotator); CDL qualification files per 49 CFR 391; insurance documentation (higher minimums); Caltrans encroachment permits; hazmat response certifications',
  soc_controls = 'CHP assigns heavy rotation; FMCSA regulates carrier safety (dual authority); CDL verified by DMV independently; insurance minimums higher (VEH 34631.5); equipment inspections by CHP separate from FMCSA; Caltrans permits independent of CHP rotation'
WHERE name = 'Heavy-Duty Tow / Recovery Operator';

-- ============================================================================
-- END OF FILE
-- 221 UPDATE statements across 4 industries (14 sections)
-- All statutes, standards, certifications, and SOC controls are REAL.
-- ============================================================================

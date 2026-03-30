-- Governing guidelines UPDATE statements for 252 citizen_catalog personas
-- Only updating governing_guidelines (standards_of_creation and soc_controls already populated)
-- Generated 2026-03-29

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Vehicle Code Section 11700-11738; CA Bus & Prof Code Section 17200; 16 CFR Part 455 (FTC Used Car Rule); TILA 15 USC Section 1601; CA Civ Code Section 1793.2 (Song-Beverly Consumer Warranty Act); 49 USC Section 32702 (Federal Odometer Act)'
WHERE name = 'Licensed Motor Vehicle Dealer (Principal)';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Vehicle Code Section 11800-11824; CA Bus & Prof Code Section 17200; 16 CFR Part 455 (FTC Used Car Rule); CA Civ Code Section 1793.2; CA Vehicle Code Section 11812 (salesperson license requirements)'
WHERE name = 'Licensed Vehicle Salesperson';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Vehicle Code Section 11700-11738; CA Vehicle Code Section 11735 (autobroker endorsement); CA Bus & Prof Code Section 17200; 16 CFR Part 455; TILA 15 USC Section 1601; CA Civ Code Section 1793.2'
WHERE name = 'Licensed Autobroker (Dealer with Autobroker Endorsement)';

UPDATE citizen_catalog SET
  governing_guidelines = 'TILA 15 USC Section 1601; Regulation Z 12 CFR Part 1026; ECOA 15 USC Section 1691; Regulation B 12 CFR Part 1002; CA Civ Code Section 1795.5; CA Vehicle Code Section 11709.2; GLBA 15 USC Section 6801; FTC Safeguards Rule 16 CFR Part 314'
WHERE name = 'Dealership Finance and Insurance Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Vehicle Code Section 11700-11738; FTC Act 15 USC Section 45; CA Bus & Prof Code Section 17200-17210; TILA 15 USC Section 1601; ECOA 15 USC Section 1691; CAN-SPAM Act 15 USC Section 7701; TCPA 47 USC Section 227'
WHERE name = 'Automotive Dealership Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Vehicle Code Section 4150-4234; CA Vehicle Code Section 5900-5920 (title transfers); 49 USC Section 32705 (odometer disclosure); CA Revenue & Tax Code Section 6052 (use tax); CA Vehicle Code Section 11713 (dealer requirements)'
WHERE name = 'Automotive Title and Registration Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Vehicle Code Section 11700-11738; CA Vehicle Code Section 12100-12121 (transportation of vehicles); UCC Article 2 (CA Com Code Section 2101); CA Vehicle Code Section 11713.1 (wholesale restrictions); 49 USC Section 32702'
WHERE name = 'Wholesale Vehicle Transaction Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Vehicle Code Section 11713 (dealer disclosure requirements); 16 CFR Part 455 (FTC Used Car Rule); CA Civ Code Section 1793.2; 49 USC Section 32702 (odometer fraud); CA Vehicle Code Section 9990 (salvage disclosure); CA Bus & Prof Code Section 17200'
WHERE name = 'Vehicle Disclosure Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Magnuson-Moss Warranty Act 15 USC Section 2301; CA Civ Code Section 1790-1795.8 (Song-Beverly Consumer Warranty Act); FTC Rule 16 CFR Part 700-703 (warranty rules); CA Civ Code Section 1793.2 (lemon law); UCC Article 2 (CA Com Code Section 2314-2315)'
WHERE name = 'Automotive Warranty Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Bus & Prof Code Section 9880-9889.68 (Bureau of Automotive Repair); 16 CCR Section 3303-3396; CA Bus & Prof Code Section 17200; CA Civ Code Section 1794.4 (repair facility standards); FTC Act 15 USC Section 45'
WHERE name = 'Registered Automotive Repair Dealer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Bus & Prof Code Section 9880-9889.68; 16 CCR Section 3351-3360 (written estimates); CA Civ Code Section 1794.4; CA Bus & Prof Code Section 17200; CA Bus & Prof Code Section 9884 (written estimate requirements)'
WHERE name = 'Automotive Repair Service Writer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Bus & Prof Code Section 9880-9889.68; 16 CCR Section 3303-3396; CA Health & Safety Code Section 25100-25258 (hazardous waste); EPA 40 CFR Part 262; OSHA 29 CFR Part 1910 (general industry safety); CA Labor Code Section 6300-6413.5 (Cal/OSHA)'
WHERE name = 'Collision Repair Technician / Auto Body Repair Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Bus & Prof Code Section 9880-9889.68; NHTSA 49 CFR Part 574 (tire identification); TREAD Act 49 USC Section 30117; CA Vehicle Code Section 27460-27465 (tire tread depth); OSHA 29 CFR Part 1910.177 (tire servicing); CA Health & Safety Code Section 42400 (waste tire disposal)'
WHERE name = 'Tire Dealer and Service Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Health & Safety Code Section 44000-44100; 16 CCR Section 3340-3400 (BAR smog check regulations); CA Vehicle Code Section 9889.66-9889.68; Clean Air Act 42 USC Section 7401; CA Health & Safety Code Section 43000-43031'
WHERE name = 'Licensed Smog Check Station Operator';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Health & Safety Code Section 44000-44100; 16 CCR Section 3340-3400; CA Bus & Prof Code Section 9880.1 (smog technician licensing); CA Health & Safety Code Section 44012 (inspector certification); Clean Air Act 42 USC Section 7401'
WHERE name = 'Qualified Smog Check Technician / Smog Check Inspector';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Health & Safety Code Section 44014-44015 (referee functions); 16 CCR Section 3340-3400; CA Bus & Prof Code Section 9886 (BAR referee authority); CA Vehicle Code Section 9889.66; CA Health & Safety Code Section 44000-44100'
WHERE name = 'BAR Referee / Smog Check Referee';

UPDATE citizen_catalog SET
  governing_guidelines = 'Clean Air Act 42 USC Section 7541 (aftermarket parts); EPA 40 CFR Part 85 (emissions parts certification); CA Health & Safety Code Section 43100-43105 (CARB certification); 13 CCR Section 2222-2226; CA Vehicle Code Section 27156'
WHERE name = 'Emissions Parts Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Vehicle Code Section 26100-26104 (brakes); CA Vehicle Code Section 24600-24617 (lamps); 16 CCR Section 3303-3396; CA Bus & Prof Code Section 9880-9889.68; FMVSS 49 CFR Part 571 Standards 105, 108, 135'
WHERE name = 'Licensed Brake and Lamp Adjuster/Inspector';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Vehicle Code Section 11515-11520 (salvage certificates); CA Vehicle Code Section 9990-9993 (rebuilt/salvage disclosure); 49 CFR Part 571 (FMVSS compliance); CA Vehicle Code Section 5505 (revived salvage); 13 CCR Section 260.02'
WHERE name = 'Salvage/Rebuilt Vehicle Inspector';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Vehicle Code Section 22658 (towing authorization); CA Civ Code Section 3068-3072 (lien sale); CA Vehicle Code Section 22651-22856; CA Bus & Prof Code Section 7500-7500.5 (tow operator registration); 16 CCR Section 3370-3376'
WHERE name = 'Tow Operator / Lien Sale Processor';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Vehicle Code Section 38750 (autonomous vehicles); 13 CCR Section 227-228 (CA DMV AV testing regulations); 49 USC Section 30101 (NHTSA authority); SAE J3016 automation levels; NHTSA AV Policy Framework'
WHERE name = 'Autonomous Vehicle Testing Program Director';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Vehicle Code Section 38750; 13 CCR Section 228.06-228.28 (deployment permits); 49 CFR Part 571 (FMVSS); NHTSA Standing General Order 2021-01; CA Public Utilities Code Section 5430-5443.5 (AV passenger service)'
WHERE name = 'Autonomous Vehicle Deployment Program Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Vehicle Code Section 38750; 13 CCR Section 228.20 (remote operator requirements); NHTSA 49 CFR Part 571; CA Public Utilities Code Section 5430-5443.5; FCC 47 CFR Part 95 (communications); SAE J3016'
WHERE name = 'Autonomous Vehicle Remote Operator';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Vehicle Code Section 38750; NHTSA 49 CFR Part 571 (FMVSS); ISO 26262 (functional safety); ISO 21448 (SOTIF); 13 CCR Section 227-228; UN Regulation No. 157 (automated lane keeping); SAE J3016'
WHERE name = 'Autonomous Vehicle Safety Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = 'NIST Cybersecurity Framework; ISO/SAE 21434 (automotive cybersecurity); UN Regulation No. 155 (cybersecurity management); 49 CFR Part 571; CA Civ Code Section 1798.82 (breach notification); FCC 47 CFR Part 15'
WHERE name = 'Connected/Autonomous Vehicle Cybersecurity Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CCPA CA Civ Code Section 1798.100-1798.199.100; GDPR (EU 2016/679); CA Vehicle Code Section 38750; SPY Car Act (proposed); Driver Privacy Act 49 USC Section 32505; FTC Act 15 USC Section 45'
WHERE name = 'Connected Vehicle Data Privacy Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Insurance Code Section 1861.02 (rate regulation); CCPA CA Civ Code Section 1798.100; CA Insurance Code Section 11628 (auto insurance rating factors); Driver Privacy Act 49 USC Section 32505; FTC Act 15 USC Section 45; GLBA 15 USC Section 6801'
WHERE name = 'Telematics and UBI Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Public Utilities Code Section 5430-5443.5 (TNC regulations); CPUC Decision 13-09-045; 49 USC Section 30101 (vehicle safety); CA Labor Code Section 2775-2787 (AB 5 worker classification); CA Insurance Code Section 11629.7'
WHERE name = 'Transportation Network Company Compliance Director';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Public Utilities Code Section 5430-5443.5; CA Vehicle Code Section 21200-21212 (bicycle rules); CPUC General Order 175; CA Civ Code Section 1798.100 (CCPA); CA Gov Code Section 65302 (local planning); ADA 42 USC Section 12101'
WHERE name = 'Shared Mobility Compliance Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Vehicle Code Section 21220-21235 (electric scooters); CA Public Utilities Code Section 5430-5443.5; CPSC 16 CFR Part 1512 (bicycle regulations); ADA 42 USC Section 12101; local franchise/permit ordinances; CA Gov Code Section 65302'
WHERE name = 'Micromobility Fleet Compliance Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Vehicle Code Section 9882.6 (right to repair); Magnuson-Moss Warranty Act 15 USC Section 2302(c); FTC Nixing the Fix Report; EPA Clean Air Act Section 203(a); CA Bus & Prof Code Section 9880-9889.68; Copyright Act 17 USC Section 1201 (DMCA exemptions)'
WHERE name = 'Vehicle Right to Repair Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Health & Safety Code Section 1596.60-1596.609 (TrustLine); CA Penal Code Section 11105.3 (criminal background checks); CA DOJ TrustLine regulations; CA Health & Safety Code Section 1597.54; 42 USC Section 9858f (CCDBG background checks)'
WHERE name = 'TrustLine Registry Background Check Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Penal Code Section 11164-11174.3 (CANRA mandated reporting); CAPTA 42 USC Section 5101-5119; CA Health & Safety Code Section 1596.866 (childcare mandated reporter training); 45 CFR Part 1340; CA Welf & Inst Code Section 300'
WHERE name = 'Mandated Reporter Training & Compliance Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Health & Safety Code Section 1596.60-1597.622; 22 CCR Section 101152-101239.2 (personnel records); CA Labor Code Section 226 (wage records); CA Health & Safety Code Section 1596.866 (training requirements); 45 CFR Part 98 (CCDF)'
WHERE name = 'Child Care Personnel Records & Training Compliance Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Health & Safety Code Section 1596.7995 (CCHC requirements); 22 CCR Section 101200-101239.2; CA Health & Safety Code Section 120325-120395 (immunization); AAP CFOC Standards 4th Edition; 45 CFR Part 98.41'
WHERE name = 'Child Care Health Consultant (CCHC)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Richard B. Russell National School Lunch Act 42 USC Section 1751; Child Nutrition Act 42 USC Section 1771; 7 CFR Part 226 (CACFP regulations); CA Education Code Section 49490-49560; CA Health & Safety Code Section 113700-114437 (food safety)'
WHERE name = 'Child and Adult Care Food Program (CACFP) Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Health & Safety Code Section 1596.60-1597.622; 22 CCR Section 101174 (disaster/emergency plans); CA Gov Code Section 8550-8668 (CA Emergency Services Act); FEMA CPG 101; 45 CFR Part 98.41(a)(1)(iv) (CCDF emergency preparedness)'
WHERE name = 'Child Care Emergency Preparedness Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Education Code Section 17610-17614 (Healthy Schools Act); CA Food & Agric Code Section 13180-13188; 3 CCR Section 6690-6692 (pest management in schools); FIFRA 7 USC Section 136; 40 CFR Part 152-180 (EPA pesticide regulations)'
WHERE name = 'Pesticide Notification & Exposure Prevention Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Welf & Inst Code Section 10271-10290 (child care subsidy); 45 CFR Part 98 (CCDF); CA Education Code Section 8200-8498 (state preschool); CA Welf & Inst Code Section 11320-11329 (CalWORKs Stage 1); 42 USC Section 9858 (CCDBG Act)'
WHERE name = 'Child Care Subsidy Eligibility Determination Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'IDEA Part C 20 USC Section 1431-1444 (early intervention); CA Gov Code Section 95000-95029 (Early Start); CA Education Code Section 56300-56392 (SELPA); 34 CFR Part 303; CA Health & Safety Code Section 124025-124110 (CHDP)'
WHERE name = 'Developmental Screening & Assessment Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Health & Safety Code Section 1596.60-1597.622; 22 CCR Section 101229-101229.1 (child sign-in/sign-out); CA Education Code Section 39831.5 (pupil transportation); 49 CFR Part 571 (child passenger safety); 22 CCR Section 101161.1 (parental consent)'
WHERE name = 'Parent Authorization & Child Transport Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Family Code Section 7000-7135 (emancipation of minors); CA Welf & Inst Code Section 10062; CA Labor Code Section 1286-1312 (minor employment); CA Education Code Section 46300 (compulsory education); McKinney-Vento Act 42 USC Section 11431'
WHERE name = 'Emancipated Minor Services Documentation Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Welf & Inst Code Section 11200-11526 (CalWORKs); 42 USC Section 601-619 (TANF); 45 CFR Parts 260-265 (TANF regulations); CA MPP Section 40-100-44-400 (CalWORKs policy); CA Welf & Inst Code Section 11320 (welfare-to-work)'
WHERE name = 'CalWORKs Eligibility Determination Worker';

UPDATE citizen_catalog SET
  governing_guidelines = 'Food and Nutrition Act 7 USC Section 2011-2036; 7 CFR Part 273 (SNAP certification); CA Welf & Inst Code Section 18900-18930 (CalFresh); CA MPP Section 63-100-63-504; CA Welf & Inst Code Section 18901.5 (categorical eligibility)'
WHERE name = 'CalFresh (SNAP) Eligibility & Issuance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Social Security Act Title XIX 42 USC Section 1396; 42 CFR Parts 430-456 (Medicaid); CA Welf & Inst Code Section 14000-14199 (Medi-Cal); 22 CCR Section 50000-58999; Affordable Care Act 42 USC Section 18001; CA Welf & Inst Code Section 14005.7'
WHERE name = 'Medi-Cal Eligibility & Enrollment Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Welf & Inst Code Section 17000-17410 (county general assistance); CA Welf & Inst Code Section 17001 (county obligation to indigents); CA Gov Code Section 25550-25554; 42 USC Section 1381 (SSI coordination); CA MPP Section 48-001-48-300'
WHERE name = 'General Assistance / General Relief Caseworker';

UPDATE citizen_catalog SET
  governing_guidelines = 'Child Nutrition Act 42 USC Section 1786 (WIC); 7 CFR Part 246 (WIC regulations); CA Health & Safety Code Section 123275-123370 (CA WIC program); CA Penal Code Section 12022.6 (WIC fraud); 42 USC Section 1786(f)(1)(C) (nutrition education)'
WHERE name = 'Women, Infants, and Children (WIC) Program Nutrition Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Social Security Act Title II 42 USC Section 405(j) (representative payee); Social Security Act Title XVI 42 USC Section 1383(a)(2); 20 CFR Part 404 Subpart U; 20 CFR Part 416 Subpart F; SSA POMS GN 00502; CA Welf & Inst Code Section 14005.11'
WHERE name = 'SSI/SSDI Representative Payee Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'VAWA 34 USC Section 12291; CA Fam Code Section 6200-6389 (DVPA); CA Penal Code Section 273.5-273.75; 42 USC Section 11381-11389 (HUD ESG); CA Health & Safety Code Section 124250; CA Civ Code Section 1946.7 (lease termination); CA Evid Code Section 1037-1037.8'
WHERE name = 'Domestic Violence Shelter Intake & Documentation Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Penal Code Section 264.2-264.4 (SART); CA Evid Code Section 1035-1036.2 (counselor privilege); VAWA 34 USC Section 12291; CA Penal Code Section 13823.5-13823.95 (SAFE exam standards); 42 USC Section 10603 (VOCA); CA Penal Code Section 679.04'
WHERE name = 'Sexual Assault Counselor / Rape Crisis Center Advocate';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Welf & Inst Code Section 5150-5157 (involuntary psychiatric hold); CA Welf & Inst Code Section 5250 (14-day certification); CA Welf & Inst Code Section 5008 (definitions); Lanterman-Petris-Short Act CA Welf & Inst Code Section 5000-5550; 42 CFR Part 482.61'
WHERE name = 'Psychiatric Crisis Intervention / 5150 Evaluation Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'TVPA 22 USC Section 7101-7114; 8 USC Section 1101(a)(15)(T) (T-visa); 8 CFR Section 214.11; CA Penal Code Section 236.1-236.4 (human trafficking); VOCA 34 USC Section 20101; CA Civ Code Section 52.5 (trafficking civil action); CA Penal Code Section 13519.14'
WHERE name = 'Human Trafficking Victim Services & T-Visa Documentation Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Health & Safety Code Section 11150-11180 (controlled substances); 42 CFR Part 2 (SUD confidentiality); 42 USC Section 290dd-2; HIPAA 45 CFR Parts 160, 164; CA Health & Safety Code Section 11758-11758.49 (DHCS SUD licensing); 21 CFR Part 1301'
WHERE name = 'Substance Use Disorder (SUD) Treatment Admission Counselor';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Penal Code Section 1210-1210.1 (Proposition 36); CA Penal Code Section 1000-1000.6 (deferred entry of judgment); 42 USC Section 3797u (RSAT); Substance Abuse and Crime Prevention Act; CA Health & Safety Code Section 11999.4-11999.12'
WHERE name = 'Drug Court Program Compliance & Case Management Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Lanterman Developmental Disabilities Services Act CA Welf & Inst Code Section 4500-4905; 22 CCR Section 54300-54370; IDEA 20 USC Section 1400; ADA 42 USC Section 12101; CA Gov Code Section 95000-95029 (Early Start); Olmstead v. L.C. 527 US 581'
WHERE name = 'Regional Center Service Coordinator (Lanterman Developmental Disabilities Act)';

UPDATE citizen_catalog SET
  governing_guidelines = 'ADA 42 USC Section 12101-12213; Section 504 Rehabilitation Act 29 USC Section 794; CA Gov Code Section 11135; Unruh Civil Rights Act CA Civ Code Section 51; CA Gov Code Section 12900-12996 (FEHA); IDEA 20 USC Section 1400; 28 CFR Part 35-36'
WHERE name = 'Disability Rights & Accessibility Compliance Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'McKinney-Vento Homeless Assistance Act 42 USC Section 11301-11408; 24 CFR Part 578 (CoC Program); HUD HMIS Data Standards; 42 USC Section 11360-11360a (HEARTH Act); CA Welf & Inst Code Section 16521-16525; HMIS Privacy Notice requirements'
WHERE name = 'Homeless Management Information System (HMIS) Data Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Welf & Inst Code Section 12300-12318 (IHSS program); 42 CFR Part 440.180 (HCBS personal care); CA MPP Section 30-700-30-785; Olmstead v. L.C. 527 US 581; CA Welf & Inst Code Section 12301.6 (provider enrollment); FLSA 29 USC Section 213(a)(15)'
WHERE name = 'In-Home Supportive Services (IHSS) Social Worker / Care Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Refugee Act 8 USC Section 1521-1524; 45 CFR Part 400 (ORR refugee program); INA 8 USC Section 1101; CA Welf & Inst Code Section 13275-13283 (CA refugee assistance); 8 USC Section 1522 (resettlement authorization); Wilson-Fish Alternative Program'
WHERE name = 'Refugee Resettlement & Integration Caseworker';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Military & Veterans Code Section 690-695 (CVSO authority); 38 USC Section 5901-5905 (VA accreditation); 38 CFR Part 14 (legal services); CA Military & Veterans Code Section 972-978.3; GI Bill 38 USC Chapter 33; 38 USC Section 1110-1131 (compensation)'
WHERE name = 'County Veterans Service Officer (CVSO) / Veterans Services Representative';

UPDATE citizen_catalog SET
  governing_guidelines = 'United States Housing Act 42 USC Section 1437f (Section 8); 24 CFR Part 982 (HCV program); CA Health & Safety Code Section 34200-34396; Fair Housing Act 42 USC Section 3601-3619; HUD PIH Notices; 24 CFR Section 982.401 (HQS)'
WHERE name = 'Section 8 Housing Choice Voucher (HCV) Program Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'United States Housing Act 42 USC Section 1437; 24 CFR Part 960 (admission/continued occupancy); 24 CFR Part 966 (lease/grievance); Fair Housing Act 42 USC Section 3601-3619; VAWA 34 USC Section 12491; CA Health & Safety Code Section 34200-34396'
WHERE name = 'Public Housing Admissions & Continued Occupancy Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'United States Housing Act 42 USC Section 1437; 24 CFR Part 5 Subpart G (physical condition standards); HUD NSPIRE Inspection Standards 24 CFR Section 5.703; UPCS 24 CFR Section 200.857; CA Health & Safety Code Section 17920-17928 (habitability)'
WHERE name = 'HUD Real Estate Assessment Center (REAC) / NSPIRE Inspector';

UPDATE citizen_catalog SET
  governing_guidelines = 'HOME Investment Partnerships Act 42 USC Section 12741-12756; 24 CFR Part 92; CA Health & Safety Code Section 50896-50896.3; Davis-Bacon Act 40 USC Section 3141-3148; URA 42 USC Section 4601; 24 CFR Section 92.252-92.254 (affordability)'
WHERE name = 'HOME Investment Partnerships Program Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Housing and Community Development Act 42 USC Section 5301-5321; 24 CFR Part 570 (CDBG); OMB Uniform Guidance 2 CFR Part 200; Davis-Bacon Act 40 USC Section 3141-3148; Fair Housing Act 42 USC Section 3601; National Environmental Policy Act 42 USC Section 4321'
WHERE name = 'Community Development Block Grant (CDBG) Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'IRC Section 42 (low-income housing tax credit); 26 CFR Section 1.42; CA Revenue & Tax Code Section 12206 (CA LIHTC); CA Health & Safety Code Section 50199-50199.22 (TCAC); IRS Form 8823; Fair Housing Act 42 USC Section 3601-3619'
WHERE name = 'Low-Income Housing Tax Credit (LIHTC) Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Gov Code Section 65915-65918 (density bonus law); CA Gov Code Section 65850-65863.13; CA Health & Safety Code Section 50079.5 (income limits); Housing Accountability Act CA Gov Code Section 65589.5; Palmer/Sixth Street Properties v. City of LA (2009) 175 Cal.App.4th 1396'
WHERE name = 'Inclusionary Zoning & Density Bonus Compliance Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Civ Code Section 817-817.4 (conservation easements); CA Gov Code Section 65913.4 (SB 35 streamlining); CA Health & Safety Code Section 50079.5; IRS Revenue Ruling 2006-27 (CLT tax treatment); Fair Housing Act 42 USC Section 3601; URA 42 USC Section 4601'
WHERE name = 'Community Land Trust (CLT) Stewardship & Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Fair Housing Act 42 USC Section 3601-3619; 24 CFR Part 100 (HUD fair housing regulations); CA Gov Code Section 12955-12956.2 (FEHA housing); Unruh Civil Rights Act CA Civ Code Section 51; ADA 42 USC Section 12101; CA Gov Code Section 12900-12996'
WHERE name = 'Fair Housing Complaint Investigator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Fair Housing Act 42 USC Section 3604(f)(3)(B) (reasonable accommodation); ADA 42 USC Section 12101-12213; Section 504 29 USC Section 794; CA Gov Code Section 12927(c)(1) (FEHA reasonable accommodation); 24 CFR Section 100.204; CA Civ Code Section 54.1-54.3'
WHERE name = 'Reasonable Accommodation / Reasonable Modification Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'FCRA 15 USC Section 1681; FTC 16 CFR Part 698; Fair Housing Act 42 USC Section 3601-3619; CA Civ Code Section 1785-1786.60 (CCRAA); CA Civ Code Section 1785.13 (tenant screening reports); ECOA 15 USC Section 1691; CA Gov Code Section 12955'
WHERE name = 'Tenant Screening & Fair Credit Reporting Act (FCRA) Compliance Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Civ Code Section 1947.12 (AB 1482 Tenant Protection Act); CA Civ Code Section 1946.2 (just cause eviction); local rent stabilization ordinances; Costa-Hawkins Rental Housing Act CA Civ Code Section 1954.50-1954.535; CA Civ Code Section 827'
WHERE name = 'Rent Stabilization & Rent Control Compliance Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'Residential Lead-Based Paint Hazard Reduction Act 42 USC Section 4851-4856; EPA RRP Rule 40 CFR Part 745; 24 CFR Part 35 (HUD lead paint); CA Health & Safety Code Section 105250-105310; 17 CCR Section 35001-36100; CA Civ Code Section 1102 (disclosure)'
WHERE name = 'Lead-Based Paint Disclosure & Renovation, Repair, Painting (RRP) Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Civ Code Section 1941-1942.5 (habitability/repair); CA Health & Safety Code Section 17920.3 (substandard building); CA Civ Code Section 1942.4; CA Code Civ Proc Section 1161 (unlawful detainer); CA Health & Safety Code Section 17958.8; local building/housing codes'
WHERE name = 'Habitability & Residential Property Condition Inspector';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Health & Safety Code Section 26100-26155 (toxic mold); CA Civ Code Section 1102-1102.17 (transfer disclosure); CA Health & Safety Code Section 17920.3; EPA 40 CFR Part 745 (lead and mold); OSHA 29 CFR Section 1926.1101 (asbestos); ASHRAE 62.1'
WHERE name = 'Mold & Indoor Environmental Hazard Disclosure Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Civ Code Section 1942.5 (retaliation prohibition); CA Civ Code Section 1941-1941.2 (habitability); CA Health & Safety Code Section 17920.3; CA Civ Code Section 1954.600-1954.605 (bedbug notice); local IPM ordinances; EPA 40 CFR Part 152'
WHERE name = 'Bedbug Disclosure & Integrated Pest Management (IPM) Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Civ Code Section 798-799.11 (Mobilehome Residency Law); CA Health & Safety Code Section 18000-18153.5 (mobilehome standards); 25 CCR Section 1000-1098 (HCD mobilehome regulations); CA Civ Code Section 798.17 (utility charges); CA Civ Code Section 798.56 (termination of tenancy)'
WHERE name = 'Mobilehome Residency Law (MRL) Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Health & Safety Code Section 17958.8 (local building standards); CA Health & Safety Code Section 17920.3 (substandard building); 24 CCR Part 2 (CBC); SRO local ordinances; CA Civ Code Section 1941 (habitability); Fair Housing Act 42 USC Section 3601'
WHERE name = 'SRO (Single Room Occupancy) Housing Compliance Inspector';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Gov Code Section 65852.2-65852.22 (ADU law); CA Health & Safety Code Section 17958.8; 24 CCR Part 2 (CBC); CA Gov Code Section 65852.150 (JADU); CA Gov Code Section 65852.27; local ADU ordinances; SB 9 CA Gov Code Section 65852.21'
WHERE name = 'Accessory Dwelling Unit (ADU) Permit & Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Uniform Relocation Assistance and Real Property Acquisition Policies Act 42 USC Section 4601-4655; 49 CFR Part 24; CA Gov Code Section 7260-7277 (CA Relocation Assistance Act); 24 CFR Part 42; 24 CFR Section 92.353 (HOME URA); 25 CCR Section 6000-6180'
WHERE name = 'Uniform Relocation Assistance & Real Property Acquisition Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Civ Code Section 1947.12 (AB 1482); CA Gov Code Section 8588.3-8588.5 (emergency rental assistance); ERA 15 USC Section 9058a-9058d; CA Code Civ Proc Section 1161 (unlawful detainer); CA Civ Code Section 1946.2; CARES Act Section 4024'
WHERE name = 'Eviction Prevention & Rental Assistance Program Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Title IX Education Amendments 20 USC Section 1681-1688; 34 CFR Part 106 (Title IX regulations); Clery Act 20 USC Section 1092(f); VAWA Campus SaVE Act 34 USC Section 12291; CA Education Code Section 66250-66271; Title VII 42 USC Section 2000e'
WHERE name = 'Title IX Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'FAR 48 CFR Parts 1-53; DFARS 48 CFR Parts 201-253; Competition in Contracting Act 41 USC Section 3301; Tucker Act 28 USC Section 1491; Contract Disputes Act 41 USC Section 7101-7109; Small Business Act 15 USC Section 631'
WHERE name = 'A1-01. Government Contracts Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = 'FAR 48 CFR Parts 1-53; DFARS 48 CFR Parts 201-253; FAR Part 1.602 (CO authority); FAR Part 42 (contract administration); FAR Part 43 (contract modifications); OFPP Policy Letters; 41 USC Section 2101 (Procurement Integrity Act)'
WHERE name = 'A1-02. Contracting Officer (CO) / Contracting Officer''s Representative (COR)';

UPDATE citizen_catalog SET
  governing_guidelines = 'FAR 48 CFR Parts 1-53; CICA 41 USC Section 3301; FAR Part 15 (contracting by negotiation); FAR Part 12 (commercial acquisitions); FAR Part 19 (small business programs); 10 USC Section 3201-3208 (defense procurement); OMB Circular A-76'
WHERE name = 'A1-03. Government Contracts Specialist / Procurement Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'FAR Part 30 (CAS administration); FAR Part 31 (contract cost principles); 48 CFR Chapter 99 (Cost Accounting Standards); 10 USC Section 3841 (DCAA authority); FAR Part 42 (contract administration); OMB Circular A-122'
WHERE name = 'A2-04. Defense Contract Auditor (DCAA)';

UPDATE citizen_catalog SET
  governing_guidelines = 'FAR Part 15 Subpart 15.4 (pricing); FAR Part 31 (cost principles); TINA 10 USC Section 3702 (Truth in Negotiations Act); DFARS 215.404 (weighted guidelines profit); FAR Part 30 (CAS); 48 CFR Chapter 99'
WHERE name = 'A2-05. Cost/Price Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'NISPOM 32 CFR Part 117; EO 13526 (classified national security information); EO 12829 (NISP); ICD 705 (SCIF standards); ITAR 22 CFR Parts 120-130; FAR Part 4.402; NIST SP 800-53'
WHERE name = 'A3-08. Industrial Security Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'ICD 704 (personnel security standards); ICD 705 (SCIF accreditation); NISPOM 32 CFR Part 117; EO 12968 (access to classified information); SEAD 4 (reporting requirements); 50 USC Section 3341 (ODNI security clearance)'
WHERE name = 'A3-09. Special Security Officer (SSO)';

UPDATE citizen_catalog SET
  governing_guidelines = 'EO 13467 (suitability/security); EO 12968 (classified access); SEAD 4 (reporting requirements); 5 CFR Part 731 (suitability); 5 CFR Part 1400 (national security positions); NISPOM 32 CFR Part 117; ICD 704'
WHERE name = 'A3-10. Personnel Security Specialist / Adjudicator';

UPDATE citizen_catalog SET
  governing_guidelines = 'ITAR 22 CFR Parts 120-130; Arms Export Control Act 22 USC Section 2751; EAR 15 CFR Parts 730-774; DDTC registration; ITAR Section 122.1; AECA Section 38; NISPOM 32 CFR Part 117 Chapter 10'
WHERE name = 'A4-11. ITAR Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'EAR 15 CFR Parts 730-774; Export Control Reform Act 50 USC Section 4801-4861; ECRA Section 4811; BIS Entity List 15 CFR Part 744 Supplement 4; EAR Section 734.2 (scope); 50 USC Section 4819 (enforcement); OFAC 31 CFR Part 500-599'
WHERE name = 'A4-12. EAR/Export Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Tariff Act 19 USC Section 1202-1681; Customs Modernization Act 19 USC Section 1484; 19 CFR Parts 141-199 (CBP regulations); Trade Facilitation and Trade Enforcement Act; CTPAT 19 CFR Section 163.12; ITAR 22 CFR Parts 120-130; EAR 15 CFR Parts 730-774'
WHERE name = 'A4-13. Customs/Trade Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'FAR Part 46 (quality assurance); DFARS Part 246; 10 USC Section 2461 (DCMA authority); MIL-STD-1916; AS9100D; FAR Section 42.302 (contract administration functions); DCMA Instruction 8210.1'
WHERE name = 'A5-14. DCMA Quality Assurance Representative (QAR)';

UPDATE citizen_catalog SET
  governing_guidelines = 'DFARS 252.204-7012 (safeguarding CDI); DFARS 252.204-7021 (CMMC requirements); NIST SP 800-171; NIST SP 800-172; 32 CFR Part 170 (CMMC program); FAR 52.204-21 (basic safeguarding); 10 USC Section 3901 note'
WHERE name = 'A5-15. CMMC Assessor / CMMC Registered Practitioner';

UPDATE citizen_catalog SET
  governing_guidelines = 'DFARS Part 234 (major system acquisition); DoD Instruction 5000.02; FAR Part 34 (major system acquisition); 10 USC Section 4201-4232 (acquisition); MIL-STD-882E (system safety); ISO 15288 (systems engineering lifecycle)'
WHERE name = 'A5-16. Systems Engineer (Defense Programs)';

UPDATE citizen_catalog SET
  governing_guidelines = '10 USC Section 1034 (military whistleblower); 5 USC Section 552a (Privacy Act); 32 CFR Part 310 (DoD Privacy Program); 36 CFR Part 1236 (NARA electronic records); DoD Instruction 5015.02 (records management); 44 USC Section 3101-3107'
WHERE name = 'A6-17. Military Records Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = '38 USC Section 5901-5905 (VA accreditation); 38 CFR Part 14 (legal services); 38 USC Section 1110-1131 (compensation); 38 USC Chapter 33 (Post-9/11 GI Bill); 38 USC Section 5103A (duty to assist); USERRA 38 USC Section 4301-4335'
WHERE name = 'A6-18. Veterans Benefits Attorney / Veterans Service Representative';

UPDATE citizen_catalog SET
  governing_guidelines = 'UCMJ 10 USC Section 801-946 (Uniform Code of Military Justice); MCM (Manual for Courts-Martial); 10 USC Section 827 (detail of counsel); 10 USC Section 867 (CAAF review); Military Commissions Act 10 USC Section 948a-950t; DoD Instruction 5525.07'
WHERE name = 'A6-19. Military Justice Attorney (JAG / Civilian Defense Counsel)';

UPDATE citizen_catalog SET
  governing_guidelines = 'HIPAA 45 CFR Parts 160, 164; 10 USC Section 1071-1110b (military medical care); 32 CFR Part 199 (TRICARE); DoD Instruction 6040.45 (DoD health records); 42 USC Section 290dd-2 (SUD confidentiality); Privacy Act 5 USC Section 552a'
WHERE name = 'A6-20. Military Medical Records Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Arms Export Control Act 22 USC Section 2761-2799 (FMS authority); ITAR 22 CFR Parts 120-130; DSCA Policy 22 USC Section 2762; FAR Part 25 (foreign acquisition); DFARS Part 225; 10 USC Section 2341-2350 (NATO mutual support)'
WHERE name = 'A7-21. Foreign Military Sales (FMS) Program Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'Small Business Act 15 USC Section 631-657; FAR Part 19 (small business programs); SBA regulations 13 CFR Parts 121-127; 15 USC Section 637 (set-asides); FAR Section 19.702 (subcontracting plans); DFARS Part 219'
WHERE name = 'A7-23. Small Business Liaison Officer (SBLO) / Small Business Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'FAR Part 42 Subpart 42.15 (contractor performance); FAR 42.1502 (performance evaluation policy); DFARS 242.1503; 41 USC Section 2313 (contractor database); FAR 42.1503 (CPARS procedures); OFPP Policy Letter 11-01'
WHERE name = 'A7-24. Contractor Performance Assessment Reporting System (CPARS) Assessor';

UPDATE citizen_catalog SET
  governing_guidelines = '35 USC Section 101-390 (Patent Act); 37 CFR Part 1 (USPTO patent rules); MPEP (Manual of Patent Examining Procedure); Leahy-Smith America Invents Act; Patent Cooperation Treaty 35 USC Section 351-376; 35 USC Section 112 (specification requirements)'
WHERE name = 'B1-01. Patent Attorney (Prosecution)';

UPDATE citizen_catalog SET
  governing_guidelines = '35 USC Section 101-390; 37 CFR Part 1; 37 CFR Section 11.6 (patent agent registration); MPEP; 35 USC Section 115 (oath/declaration); 35 USC Section 119-120 (priority); Patent Law Treaties Implementation Act'
WHERE name = 'B1-02. Patent Agent';

UPDATE citizen_catalog SET
  governing_guidelines = '35 USC Section 101-390; 37 CFR Part 1; MPEP (Manual of Patent Examining Procedure); 35 USC Section 102 (novelty); 35 USC Section 103 (non-obviousness); 35 USC Section 112 (specification); 5 USC Section 7321 (political activity restrictions)'
WHERE name = 'B1-03. Patent Examiner';

UPDATE citizen_catalog SET
  governing_guidelines = '35 USC Section 271-273 (infringement); 35 USC Section 281-285 (patent remedies); 28 USC Section 1338 (patent jurisdiction); 28 USC Section 1295 (Federal Circuit); Hatch-Waxman Act 21 USC Section 355; BPCIA 42 USC Section 262(l)'
WHERE name = 'B1-04. Patent Litigation Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = '35 USC Section 101-390; ASC Uniform Standards of Professional Appraisal Practice (USPAP); IRC Section 482 (transfer pricing); IRS Rev. Proc. 69-21; FASB ASC 805 (business combinations); Daubert v. Merrell Dow 509 US 579 (expert reliability)'
WHERE name = 'B1-05. Patent Valuation Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'Patent Cooperation Treaty 35 USC Section 351-376; Paris Convention; Hague Agreement; EPC (European Patent Convention); 37 CFR Part 1 Subpart F (PCT); WIPO Budapest Treaty; PLT (Patent Law Treaty)'
WHERE name = 'B1-06. International Patent Specialist (PCT/Foreign Filing)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Lanham Act 15 USC Section 1051-1141 (Trademark Act); 37 CFR Part 2 (USPTO trademark rules); TMEP (Trademark Manual of Examining Procedure); 15 USC Section 1057 (registration certificates); 15 USC Section 1065 (incontestability)'
WHERE name = 'B2-07. Trademark Attorney (Prosecution)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Lanham Act 15 USC Section 1063-1064 (opposition/cancellation); 37 CFR Part 2 Subpart D (TTAB proceedings); TBMP (Trademark Board Manual of Procedure); 15 USC Section 1071 (judicial review); TTAB Standard Protective Order'
WHERE name = 'B2-08. Trademark Trial and Appeal Board (TTAB) Practitioner';

UPDATE citizen_catalog SET
  governing_guidelines = 'Madrid Protocol 15 USC Section 1141; 37 CFR Part 7 (international registration); WIPO Madrid Agreement; Nice Classification; Lanham Act 15 USC Section 1051; Paris Convention Article 6bis; Singapore Treaty'
WHERE name = 'B2-09. International Trademark Specialist (Madrid Protocol)';

UPDATE citizen_catalog SET
  governing_guidelines = 'DMCA 17 USC Section 512 (safe harbors); 17 USC Section 1201-1205 (anti-circumvention); Copyright Act 17 USC Section 101-1401; EU Copyright Directive 2019/790; 37 CFR Part 201 (Copyright Office rules); WIPO Copyright Treaty'
WHERE name = 'B3-11. DMCA/Digital Rights Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Defend Trade Secrets Act 18 USC Section 1831-1839; CA Civ Code Section 3426-3426.11 (CUTSA); Uniform Trade Secrets Act; Economic Espionage Act 18 USC Section 1831; TRIPS Agreement Article 39; Restatement (Third) Unfair Competition Section 39-45'
WHERE name = 'B4-12. Trade Secret Counsel';

UPDATE citizen_catalog SET
  governing_guidelines = 'Defend Trade Secrets Act 18 USC Section 1831-1839; CUTSA CA Civ Code Section 3426; Restatement (Second) Contracts; UCC Article 2; CA Labor Code Section 2860 (employee inventions); CA Bus & Prof Code Section 16600 (non-compete restrictions)'
WHERE name = 'B4-13. NDA/Confidentiality Agreement Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = '35 USC Section 261 (patent assignment/licensing); Lanham Act 15 USC Section 1060 (trademark licensing); Copyright Act 17 USC Section 201(d) (copyright transfers); UCC Article 9 (secured transactions in IP); Bayh-Dole Act 35 USC Section 200-212; IRC Section 482'
WHERE name = 'B5-14. IP Licensing Attorney / Licensing Executive';

UPDATE citizen_catalog SET
  governing_guidelines = 'AICPA AT-C Section 315 (agreed-upon procedures); AICPA AU-C Section 700; UCC Article 2A (leases); 35 USC Section 261; Lanham Act 15 USC Section 1060; Copyright Act 17 USC Section 101-1401; GAAS; FASB ASC 606 (revenue recognition)'
WHERE name = 'B5-15. IP Royalty Auditor';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Insurance Code Section 100-12419; state insurance codes; McCarran-Ferguson Act 15 USC Section 1011-1015; NAIC Model Act for IP Insurance; 35 USC Section 271-285 (patent infringement damages); Lanham Act 15 USC Section 1117 (trademark damages)'
WHERE name = 'B5-16. IP Insurance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = '35 USC Section 311-319 (Inter Partes Review); 37 CFR Part 42 Subpart B (IPR rules); AIA Trial Practice Guide; 35 USC Section 314 (institution standard); 35 USC Section 316 (conduct of IPR); 28 USC Section 1295 (Federal Circuit appeal)'
WHERE name = 'B6-17. Inter Partes Review (IPR) Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'ICANN UDRP Policy; WIPO Supplemental Rules for UDRP; Lanham Act 15 USC Section 1125(d) (ACPA); Uniform Rapid Suspension (URS); ICANN Registrar Accreditation Agreement; WIPO Arbitration and Mediation Center Rules'
WHERE name = 'B6-18. Domain Name Dispute Specialist (UDRP)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Copyright Act 17 USC Section 101-1401; GPL/LGPL/Apache/MIT license terms; DMCA 17 USC Section 1201; EU Copyright Directive 2019/790; OSI Open Source Definition; FSF Free Software Definition; CA Bus & Prof Code Section 16600'
WHERE name = 'B7-19. Open Source Compliance Attorney / Officer';

UPDATE citizen_catalog SET
  governing_guidelines = '35 USC Section 271 (patent infringement); 35 USC Section 282 (presumption of validity); 35 USC Section 112 (claim construction); Markman v. Westview 517 US 370; KSR v. Teleflex 550 US 398 (obviousness); Alice v. CLS Bank 573 US 208 (patentable subject matter)'
WHERE name = 'B7-20. Freedom-to-Operate (FTO) Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'CCPA CA Civ Code Section 1798.100-1798.199.100; GDPR EU Regulation 2016/679; HIPAA 45 CFR Parts 160, 164; GLBA 15 USC Section 6801-6809; COPPA 15 USC Section 6501-6506; FERPA 20 USC Section 1232g; FTC Act 15 USC Section 45'
WHERE name = 'C1-01. Data Protection Officer (DPO) / Chief Privacy Officer (CPO)';

UPDATE citizen_catalog SET
  governing_guidelines = 'GDPR EU Regulation 2016/679; EU-US Data Privacy Framework; Standard Contractual Clauses 2021/914; ePrivacy Directive 2002/58/EC; GDPR Articles 44-49 (international transfers); UK GDPR; Schrems II (C-311/18)'
WHERE name = 'C1-02. GDPR Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'COPPA 15 USC Section 6501-6506; FTC COPPA Rule 16 CFR Part 312; CA Privacy Rights for Minors CA Bus & Prof Code Section 22580-22582; CIPA 47 USC Section 254(h)(5); FERPA 20 USC Section 1232g; Age Appropriate Design Code CA Civ Code Section 1798.99.28-1798.99.40'
WHERE name = 'C1-04. Children''s Privacy Specialist (COPPA)';

UPDATE citizen_catalog SET
  governing_guidelines = 'IL BIPA 740 ILCS 14; TX CUBI TX Bus & Com Code Section 503.001; WA Biometric Privacy HB 1493; CCPA CA Civ Code Section 1798.100 (biometric as personal information); GDPR Article 9 (special categories); HIPAA 45 CFR Section 164.514'
WHERE name = 'C1-05. Biometric Privacy Compliance Specialist (BIPA)';

UPDATE citizen_catalog SET
  governing_guidelines = 'AICPA SSAE 18 (AT-C Section 105, 205, 320); AICPA TSP Section 100 (Trust Services Criteria); SOC 2 Type II; ISAE 3402; SOX Act 15 USC Section 7201-7266 (where applicable); PCAOB Standards; AICPA Code of Professional Conduct'
WHERE name = 'C2-07. SOC 2 Auditor / IT Audit Professional';

UPDATE citizen_catalog SET
  governing_guidelines = 'CFAA 18 USC Section 1030; ECPA 18 USC Section 2510-2522; CA Penal Code Section 502 (computer crimes); PCI DSS v4.0; NIST SP 800-115 (technical guide to testing); CISA directives; state computer fraud statutes'
WHERE name = 'C2-08. Penetration Tester / Ethical Hacker';

UPDATE citizen_catalog SET
  governing_guidelines = 'NIST SP 800-30 (risk assessment); NIST SP 800-115 (technical guide to testing); CVE/CVSS standards; CISA BOD directives; PCI DSS v4.0 Requirement 11; HIPAA 45 CFR Section 164.308(a)(1) (security risk analysis); ISO 27001 Annex A'
WHERE name = 'C2-09. Vulnerability Assessment Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'NIST SP 800-61 (incident handling); FISMA 44 USC Section 3551; CISA BOD 22-01 (known exploited vulnerabilities); HIPAA 45 CFR Section 164.308(a)(6) (security incident procedures); CCPA CA Civ Code Section 1798.82 (breach notification); 18 USC Section 1030 (CFAA)'
WHERE name = 'C2-10. Incident Response Manager / CSIRT Lead';

UPDATE citizen_catalog SET
  governing_guidelines = 'FedRAMP Authorization Act 44 USC Section 3607-3616; FISMA 44 USC Section 3551; NIST SP 800-53; FedRAMP Rev 5 Baselines; OMB Circular A-130; CISA Cloud Security Technical Reference Architecture'
WHERE name = 'C2-11. FedRAMP Assessor / 3PAO';

UPDATE citizen_catalog SET
  governing_guidelines = 'FISMA 44 USC Section 3551-3558; NIST SP 800-53 (security controls); NIST SP 800-37 (risk management framework); OMB Circular A-130; FIPS 199 (impact categorization); FIPS 200 (minimum security requirements); 44 USC Section 3554'
WHERE name = 'C2-12. FISMA Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'EU AI Act (Regulation 2024/1689); NIST AI Risk Management Framework; EO 14110 (Safe, Secure, Trustworthy AI); CA SB 1047 (proposed); OECD AI Principles; FTC Act 15 USC Section 45 (unfair/deceptive AI); CCPA CA Civ Code Section 1798.185(a)(16)'
WHERE name = 'C3-13. AI Ethics Officer / Responsible AI Lead';

UPDATE citizen_catalog SET
  governing_guidelines = 'EU AI Act (Regulation 2024/1689) Article 9 (risk management); NIST AI RMF; NYC Local Law 144 (automated employment decisions); CO SB 21-169 (insurance AI); IL AIDA 820 ILCS 42; EEOC guidance on AI and Title VII; ECOA 15 USC Section 1691'
WHERE name = 'C3-14. Algorithmic Impact Assessment Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'EU AI Act (Regulation 2024/1689) Article 11 (technical documentation); NIST AI RMF; IEEE 7001 (AI transparency); ISO/IEC 42001 (AI management systems); FTC Act 15 USC Section 45; OMB M-24-10 (federal AI governance)'
WHERE name = 'C3-15. AI Model Documentation Specialist / ML Engineer (Governance)';

UPDATE citizen_catalog SET
  governing_guidelines = 'FedRAMP Authorization Act 44 USC Section 3607-3616; NIST SP 800-144 (cloud computing); NIST SP 800-53; CSA CCM (Cloud Controls Matrix); ISO 27017 (cloud security); ISO 27018 (cloud PII); CCPA CA Civ Code Section 1798.100; SOC 2'
WHERE name = 'C4-16. Cloud Security Architect / Cloud Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'UCC Article 2 (CA Com Code Section 2101); CCPA CA Civ Code Section 1798.100; GDPR Articles 28, 44-49; FISMA 44 USC Section 3551; FedRAMP requirements; HIPAA BAA 45 CFR Section 164.504(e); FAR 52.239-1 (cloud computing services)'
WHERE name = 'C4-17. Cloud Service Agreement Reviewer / IT Contracts Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'UCC Article 2; ITIL Service Level Management; ISO 20000 (IT service management); FedRAMP Continuous Monitoring; HIPAA 45 CFR Section 164.308(a)(8) (performance evaluation); PCI DSS v4.0 Requirement 12.8; NIST SP 800-53 SA-9'
WHERE name = 'C4-18. SLA Compliance Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'Copyright Act 17 USC Section 101-1401; UCC Article 2B (proposed); BSA/SIIA audit standards; EULA enforcement (ProCD v. Zeidenberg 86 F.3d 1447); DMCA 17 USC Section 1201; Oracle v. Google 593 US 1; FASB ASC 350-40 (internal-use software)'
WHERE name = 'C5-19. Software License Compliance Auditor';

UPDATE citizen_catalog SET
  governing_guidelines = 'NIST SP 800-218 (Secure Software Development Framework); OWASP standards; EO 14028 (Improving Cybersecurity); CISA Secure by Design; ISO 27034 (application security); PCI DSS v4.0 Requirement 6; NIST SP 800-53 SA-11'
WHERE name = 'C5-20. Code Auditor / Software Security Reviewer';

UPDATE citizen_catalog SET
  governing_guidelines = 'NIST SP 800-53 SC-8 (transmission confidentiality); OWASP API Security Top 10; OAuth 2.0 (RFC 6749); OpenAPI Specification; PCI DSS v4.0 Requirements 4, 6; HIPAA 45 CFR Section 164.312(e)(1) (transmission security); FedRAMP SI controls'
WHERE name = 'C5-21. API Compliance / Integration Security Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'ADA 42 USC Section 12101-12213; Section 508 29 USC Section 794d; WCAG 2.1/2.2 (W3C); CA Gov Code Section 11135; Unruh Civil Rights Act CA Civ Code Section 51; 36 CFR Part 1194 (Section 508 standards); EN 301 549 (EU accessibility)'
WHERE name = 'C6-22. Accessibility Compliance Specialist (WCAG/ADA)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Federal Records Act 44 USC Section 3101-3107; 36 CFR Parts 1220-1239 (NARA regulations); HIPAA 45 CFR Section 164.530(j) (retention); SOX Act 15 USC Section 7201 (financial record retention); IRS IRC Section 6501 (tax records); CA Civ Code Section 1798.105 (CCPA deletion)'
WHERE name = 'C7-23. Data Retention / Records Management Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'GDPR Articles 26, 28 (controller/processor agreements); CCPA CA Civ Code Section 1798.140(j) (service provider); Standard Contractual Clauses 2021/914; HIPAA BAA 45 CFR Section 164.504(e); GLBA 15 USC Section 6801; UK GDPR; Swiss DPA'
WHERE name = 'C7-24. Data Processing Agreement (DPA) Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'ePrivacy Directive 2002/58/EC; GDPR Articles 6-7 (consent); CCPA CA Civ Code Section 1798.120 (opt-out right); CPRA CA Civ Code Section 1798.135; COPPA 16 CFR Part 312; IAB Transparency and Consent Framework; CNIL cookie guidelines'
WHERE name = 'C7-25. Cookie Consent / Consent Management Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'UCC Article 2 (CA Com Code Section 2101); Copyright Act 17 USC Section 101-1401; CCPA CA Civ Code Section 1798.100; GDPR; CFAA 18 USC Section 1030; UCITA (where adopted); CLOUD Act 18 USC Section 2713; FTC Act 15 USC Section 45'
WHERE name = 'C8-26. Technology Transactions Attorney / IT Counsel';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Bus & Prof Code Section 19500-19907 (CA Hotel Licensing); CA Health & Safety Code Section 113700-114437 (food safety); CA Labor Code Section 6300-6413.5 (Cal/OSHA); ADA 42 USC Section 12181-12189 (public accommodations); CA Fire Code 24 CCR Part 9'
WHERE name = 'Hotel Licensing Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Revenue & Tax Code Section 7280-7283 (transient occupancy tax); IRC Section 3402 (withholding); local TOT ordinances; CA Revenue & Tax Code Section 7284.6 (reporting); CA Const Article XIIIC (Proposition 218 local tax authority)'
WHERE name = 'Transient Occupancy Tax Administrator';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Civ Code Section 1863 (hotel register); CA Revenue & Tax Code Section 7280 (TOT records); CCPA CA Civ Code Section 1798.100; PCI DSS v4.0 (payment card data); CA Civ Code Section 1798.82 (breach notification); CA Bus & Prof Code Section 19568'
WHERE name = 'Guest Registration Records Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'Local short-term rental ordinances; CA Gov Code Section 65850 (local zoning); CA Revenue & Tax Code Section 7280 (TOT); CA Bus & Prof Code Section 17200; CA Health & Safety Code Section 17920.3 (building standards); CA Civ Code Section 1940-1954.06'
WHERE name = 'Short-Term Rental Permit Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Revenue & Tax Code Section 7280-7283 (TOT); IRC Section 280A (vacation home deduction); local STR tax ordinances; CA Revenue & Tax Code Section 19504 (information returns); CA Franchise Tax Board requirements; IRS Schedule E/C reporting'
WHERE name = 'Short-Term Rental Tax Compliance Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Bus & Prof Code Section 11000-11288 (subdivided lands); CA Civ Code Section 1242-1244 (timeshare regulation); TILA 15 USC Section 1601; FTC Act 15 USC Section 45; Interstate Land Sales Full Disclosure Act 15 USC Section 1701-1720; CA Bus & Prof Code Section 11024'
WHERE name = 'Timeshare Disclosure Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Fire Code 24 CCR Part 9; NFPA 1 (Fire Code); NFPA 101 (Life Safety Code); CA Health & Safety Code Section 13000-13250; NFPA 72 (fire alarm); NFPA 13 (sprinkler systems); CA Code of Regs Title 19 (fire prevention)'
WHERE name = 'Fire Marshal — Hospitality Division';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Health & Safety Code Section 17920.3 (building standards); 24 CCR Part 2 (CBC); OSHA 29 CFR Part 1910 (general industry); CA Labor Code Section 6300-6413.5 (Cal/OSHA); ADA 42 USC Section 12181-12189; CA Health & Safety Code Section 113700-114437'
WHERE name = 'Hotel Safety Inspection Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Health & Safety Code Section 115920-116070 (swimming pool safety); 22 CCR Section 65501-65551 (public pools); CA Building Code 24 CCR Chapter 31B; Virginia Graeme Baker Pool and Spa Safety Act 15 USC Section 8001-8008; CA Health & Safety Code Section 115922'
WHERE name = 'Environmental Health Specialist — Aquatic Facilities';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Health & Safety Code Section 13260-13263 (CO detectors); CA Health & Safety Code Section 17926 (gas safety); 24 CCR Part 2 (CBC); NFPA 54 (National Fuel Gas Code); CA Health & Safety Code Section 18897.3; 49 CFR Part 192 (pipeline safety)'
WHERE name = 'Carbon Monoxide and Gas Safety Compliance Inspector';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Food & Agric Code Section 12200-12380 (pest control); 3 CCR Section 6000-6780 (DPR regulations); FIFRA 7 USC Section 136; EPA 40 CFR Part 152-180; CA Bus & Prof Code Section 8550-8593 (structural pest control); CA Health & Safety Code Section 17920.3'
WHERE name = 'Integrated Pest Management Compliance Officer — Lodging';

UPDATE citizen_catalog SET
  governing_guidelines = 'OSHA 29 CFR Part 1910 (general industry); CA Labor Code Section 6300-6413.5 (Cal/OSHA); 8 CCR Section 3200-3400 (general safety orders); OSHA 29 CFR Section 1910.1200 (HazCom); CA Health & Safety Code Section 25500-25545 (hazardous materials); CA Labor Code Section 6400'
WHERE name = 'Housekeeping Safety Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'ASHRAE Standard 188 (Legionella); CA Health & Safety Code Section 116270-116753 (safe drinking water); 22 CCR Section 64400-64480; EPA 40 CFR Part 141 (Safe Drinking Water Act); CA Health & Safety Code Section 115920 (pool safety); CDC guidelines for water management'
WHERE name = 'Water Management Program Manager — Hospitality';

UPDATE citizen_catalog SET
  governing_guidelines = 'ADA 42 USC Section 12181-12189 (public accommodations); 28 CFR Part 36 (ADA public accommodations); ADA Standards for Accessible Design; CA Civ Code Section 54-55.3 (disabled access); CA Gov Code Section 4450-4461; 24 CCR Chapter 11B'
WHERE name = 'ADA Accessibility Compliance Specialist — Lodging';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Civ Code Section 1859-1867 (innkeeper liability); CA Civ Code Section 1865 (property limitation); CA Bus & Prof Code Section 19568; UCC Article 7 (bailments); CA Civ Code Section 846 (recreational use immunity); CA Code Civ Proc Section 335.1 (statute of limitations)'
WHERE name = 'Innkeeper''s Liability Claims Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'FTC Act 15 USC Section 45 (unfair/deceptive practices); CA Bus & Prof Code Section 17200-17210; CA Bus & Prof Code Section 17500 (false advertising); CA Civ Code Section 1770 (Consumer Legal Remedies Act); TILA Regulation Z 12 CFR Part 1026; state drip pricing laws'
WHERE name = 'Resort Fee / Mandatory Fee Disclosure Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Insurance Code Section 100-12419; McCarran-Ferguson Act 15 USC Section 1011; OSHA 29 CFR Part 1910; CA Labor Code Section 3200-6208 (workers comp); CA Civ Code Section 1714 (general negligence); ADA 42 USC Section 12181; TRIA 15 USC Section 6701'
WHERE name = 'Hospitality Risk & Insurance Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'TVPA 22 USC Section 7101-7114; CA Penal Code Section 236.1 (human trafficking); CA Gov Code Section 12950.3 (SB 1343); CA Civ Code Section 52.6 (posting requirements); FAR 52.222-50 (combating trafficking); CA Penal Code Section 11225.5 (lodging)'
WHERE name = 'Human Trafficking Prevention Compliance Officer — Hospitality';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Labor Code Section 4350-4354 (hotel housekeeping safety); CA Labor Code Section 6300-6413.5 (Cal/OSHA); 8 CCR Section 3200-3400; CA Labor Code Section 510 (overtime); CA Labor Code Section 226 (wage statements); SB 525 (health care worker wages where applicable)'
WHERE name = 'Hotel Worker Protection Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Labor Code Section 6400-6413.5 (workplace safety); 8 CCR Section 3342 (panic buttons/personal safety devices); OSHA 29 CFR Part 1910; CA Gov Code Section 12950.3 (harassment prevention); CA Labor Code Section 230 (victim accommodation)'
WHERE name = 'Employee Personal Safety Device Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Labor Code Section 6401.7-6401.9 (SB 553 Workplace Violence Prevention Plan); 8 CCR Section 3342; OSHA 29 CFR Part 1910; Cal/OSHA Guidelines for Workplace Security; CA Penal Code Section 527.6 (workplace violence restraining order); CA Labor Code Section 6400'
WHERE name = 'Workplace Violence Prevention Plan Manager — Hospitality';

UPDATE citizen_catalog SET
  governing_guidelines = 'FLSA 29 USC Section 201-219; CA Labor Code Section 200-558 (wage/hour); CA IWC Wage Orders (8 CCR Section 11000-11170); CA Labor Code Section 226 (wage statements); CA Labor Code Section 510 (overtime); 29 CFR Part 531 (tip credit); CA Labor Code Section 351 (tips)'
WHERE name = 'Hospitality Wage & Hour Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'FTC Franchise Rule 16 CFR Part 436; CA Corp Code Section 31000-31516 (CA Franchise Relations Act); CA Corp Code Section 31100-31406 (Franchise Investment Law); TILA 15 USC Section 1601; SBA regulations 13 CFR Part 120; Lanham Act 15 USC Section 1055 (trademark licensing)'
WHERE name = 'Hotel Franchise Compliance Auditor';

UPDATE citizen_catalog SET
  governing_guidelines = 'FTC Act 15 USC Section 45; CA Bus & Prof Code Section 17200-17210; CA Bus & Prof Code Section 17500 (false advertising); AAA Hotel Diamond Rating standards; Forbes Travel Guide Star Rating criteria; CA Civ Code Section 1770 (CLRA)'
WHERE name = 'Hotel Quality / Star-Diamond Rating Compliance Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'UCC Article 2 (CA Com Code Section 2101); CA Civ Code Section 1636-1701 (contracts); CA Corp Code Section 17701 (LLC operating agreements); GAAP/FASB ASC 842 (lease accounting); CA Revenue & Tax Code Section 17941; Uniform System of Accounts for the Lodging Industry'
WHERE name = 'Hotel Management Agreement (HMA) Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Local home-sharing ordinances; CA Gov Code Section 65850 (zoning); CA Revenue & Tax Code Section 7280 (TOT); CA Bus & Prof Code Section 17200; CA Health & Safety Code Section 17920.3; CCPA CA Civ Code Section 1798.100; CA Civ Code Section 1940-1954.06'
WHERE name = 'Home-Sharing Host Registration Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Health & Safety Code Section 17920.3 (habitability); CA Fire Code 24 CCR Part 9; CA Health & Safety Code Section 13113.7 (smoke detectors); CA Health & Safety Code Section 13260 (CO detectors); local STR safety ordinances; NFPA 101 (Life Safety Code)'
WHERE name = 'Short-Term Rental Safety Inspector';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Civ Code Section 1940-1954.06 (landlord/tenant); local vacation rental ordinances; CA Rev & Tax Code Section 7280 (TOT); CA Bus & Prof Code Section 17200; CA Health & Safety Code Section 17920.3; CA Bus & Prof Code Section 10130-10175 (real estate licensing); Fair Housing Act 42 USC Section 3601'
WHERE name = 'Vacation Rental Property Manager — Regulatory Compliance';

UPDATE citizen_catalog SET
  governing_guidelines = 'Clean Water Act 33 USC Section 1251-1387; Clean Air Act 42 USC Section 7401-7671; RCRA 42 USC Section 6901-6992; CA Health & Safety Code Section 25100-25258 (hazardous waste); CEQA CA Pub Resources Code Section 21000-21189; CA Water Code Section 13000'
WHERE name = 'Hospitality Environmental Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Pub Resources Code Section 25402.10 (AB 802 benchmarking); CA Health & Safety Code Section 25400-25430; EISA Section 431-435 42 USC Section 8253; ASHRAE Standard 90.1; CA Title 24 Part 6 (energy efficiency); EPA ENERGY STAR Portfolio Manager'
WHERE name = 'Energy Benchmarking Compliance Officer — Hospitality';

UPDATE citizen_catalog SET
  governing_guidelines = 'Clean Water Act 33 USC Section 1342 (NPDES); CA Water Code Section 13260-13269 (waste discharge); 40 CFR Part 122 (NPDES permits); CA Health & Safety Code Section 113700-114437 (FOG in food facilities); local FOG ordinances; EPA MS4 stormwater permits'
WHERE name = 'Stormwater and Fats/Oils/Grease (FOG) Compliance Officer — Hospitality';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Bus & Prof Code Section 23000-25762 (Alcoholic Beverage Control Act); 4 CCR Section 50-79 (ABC regulations); 27 USC Section 201-212 (Federal Alcohol Administration Act); TTB regulations 27 CFR Parts 1-31; CA Bus & Prof Code Section 25602 (dram shop); 21 USC Section 1036'
WHERE name = 'Alcohol Beverage Control Compliance Manager — Hospitality';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Health & Safety Code Section 113700-114437 (California Retail Food Code); 21 CFR Part 110 (food cGMP); FDA Food Safety Modernization Act 21 USC Section 2201; CA Bus & Prof Code Section 23000-25762 (ABC minibar); CA Rev & Tax Code Section 6359 (food tax exemptions)'
WHERE name = 'In-Room Dining & Minibar Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Health & Safety Code Section 113700-114437 (CA Retail Food Code); CA Bus & Prof Code Section 23000-25762 (ABC); OSHA 29 CFR Part 1910; CA Fire Code 24 CCR Part 9; CA Labor Code Section 6300-6413.5 (Cal/OSHA); FDA Food Code; ADA 42 USC Section 12181-12189'
WHERE name = 'Banquet & Catering Operations Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Health & Safety Code Section 19160-19168 (seismic retrofit); CA Gov Code Section 8875-8875.95 (unreinforced masonry); 24 CCR Part 2 (CBC seismic provisions); ASCE 7 (minimum design loads); CA Gov Code Section 8893; local seismic retrofit ordinances'
WHERE name = 'Seismic Retrofit Compliance Officer — Hotel/Lodging';

UPDATE citizen_catalog SET
  governing_guidelines = 'PCI DSS v4.0; CCPA CA Civ Code Section 1798.100; CA Civ Code Section 1798.82 (breach notification); GLBA 15 USC Section 6801 (financial privacy); CFAA 18 USC Section 1030; NIST Cybersecurity Framework; CA Civ Code Section 1798.91.04 (IoT security SB 327)'
WHERE name = 'Hospitality Cybersecurity & POS Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'ADA 42 USC Section 12181-12189; 28 CFR Part 36 Section 36.302 (reservation modifications); DOJ ADA guidance on reservations; CA Civ Code Section 54-55.3; 24 CCR Chapter 11B; WCAG 2.1 (online booking accessibility); CA Gov Code Section 11135'
WHERE name = 'Accessible Room Reservation Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = '24 CCR Parts 1-12 (California Building Standards Code); CA Health & Safety Code Section 17920-17928; OSHA 29 CFR Part 1926 (construction); CA Labor Code Section 6500-6510 (construction safety orders); ADA 42 USC Section 12183 (new construction); CA Bus & Prof Code Section 7000-7191 (CSLB)'
WHERE name = 'Hotel Construction & Renovation Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Gov Code Section 8550-8668 (CA Emergency Services Act); FEMA CPG 101; CA Health & Safety Code Section 13000 (fire prevention); ADA 42 USC Section 12181 (evacuation); OSHA 29 CFR Section 1910.38 (emergency action plans); CA Fire Code 24 CCR Part 9'
WHERE name = 'Emergency Preparedness Manager — Hospitality';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Civ Code Section 1630-1632 (bailments); CA Vehicle Code Section 22650-22856 (towing/parking); CA Civ Code Section 1865 (innkeeper property limits); UCC Article 7; CA Bus & Prof Code Section 7500 (tow operator); CA Civ Code Section 2840-2847 (pledge)'
WHERE name = 'Valet & Parking Liability Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Bus & Prof Code Section 7301-7399 (Barbering and Cosmetology Act); 16 CCR Section 900-997; CA Health & Safety Code Section 113700-114437 (food prep in spa); FDA 21 CFR Part 701 (cosmetic labeling); OSHA 29 CFR Part 1910; CA Bus & Prof Code Section 4600-4621 (massage therapy)'
WHERE name = 'Spa & Wellness Regulatory Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'FCC 47 CFR Parts 15, 64, 68 (telecommunications); Telecommunications Act 47 USC Section 151-615; CA Public Utilities Code Section 2881-2896; CCPA CA Civ Code Section 1798.100; FCC TCPA 47 USC Section 227; ADA 42 USC Section 12181 (TRS); FCC E-911 requirements'
WHERE name = 'Hotel Telecommunications & WiFi Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Revenue & Tax Code Section 50-5911 (property tax); CA Const Article XIIIA (Proposition 13); CA Revenue & Tax Code Section 401-481 (assessment); CA Rev & Tax Code Section 531 (change in ownership); CA Rev & Tax Code Section 69.5 (Prop 19); local assessment appeal procedures'
WHERE name = 'Hospitality Real Property Tax Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'ADA 42 USC Section 12141-12165 (public transportation); 49 CFR Parts 37-38 (DOT ADA regulations); CA Gov Code Section 4500 (accessibility); CA Pub Utilities Code Section 99155 (paratransit); Air Carrier Access Act 49 USC Section 41705; 14 CFR Part 382'
WHERE name = 'Accessible Transportation Compliance Officer — Hospitality';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Bus & Prof Code Section 17550-17557.5 (Seller of Travel Act); CA Bus & Prof Code Section 17550.11 (registration); FTC Act 15 USC Section 45; DOT 49 USC Section 41712 (unfair practices); CA Civ Code Section 1770 (CLRA); 14 CFR Part 399 (airline consumer protection)'
WHERE name = 'Seller of Travel Registration Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Bus & Prof Code Section 17550.15 (trust account/bond requirements); CA Insurance Code Section 1800-1807; CA Bus & Prof Code Section 17550.23; IATA Resolution 812 (agent financial standards); 14 CFR Part 399; state travel agent bonding statutes'
WHERE name = 'Travel Agency Surety Bond Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Bus & Prof Code Section 17550-17557.5 (Seller of Travel); DOT 14 CFR Part 380 (charter operations); 49 USC Section 41102 (air carrier certification); ASTA Code of Ethics; CA Code of Regs Title 16 Section 2630-2640; OSHA 29 CFR Part 1910 (adventure operations)'
WHERE name = 'Tour Operator License & Safety Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'ARC Agent Reporting Agreement; ARC Industry Agent''s Handbook; 14 CFR Part 399 (airline consumer protection); DOT 49 USC Section 41712; IATA Resolution 800 (accreditation); BSP rules; 49 USC Section 41102 (ticketing agent requirements)'
WHERE name = 'Airlines Reporting Corporation (ARC) Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Insurance Code Section 1760-1780 (travel insurance); NAIC Travel Insurance Model Act; CA Insurance Code Section 1760.1 (travel insurance definitions); McCarran-Ferguson Act 15 USC Section 1011; FTC Act 15 USC Section 45; state insurance producer licensing'
WHERE name = 'Travel Insurance Product & Distribution Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'DOT 14 CFR Part 259 (airline consumer protections); DOT 49 USC Section 41712 (unfair practices); FTC Act 15 USC Section 45; CA Bus & Prof Code Section 17550 (Seller of Travel refund rules); CA Civ Code Section 1770 (CLRA); EU Regulation 261/2004 (flight compensation)'
WHERE name = 'Travel Refund & Cancellation Rights Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'FTC Act 15 USC Section 45 (deceptive practices); CA Bus & Prof Code Section 17200-17210; CCPA CA Civ Code Section 1798.100 (loyalty data); DOT 14 CFR Part 399 (airline FFP); CA Civ Code Section 1749.4-1749.65 (gift card/loyalty); IRC Section 451(c) (advance payment recognition)'
WHERE name = 'Travel Loyalty Program Regulatory Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Passenger Vessel Services Act 46 USC Section 55103; Jones Act 46 USC Section 30104; CDC 42 CFR Part 71 (vessel sanitation); USCG 46 CFR Parts 70-79 (passenger vessel inspection); 46 USC Section 8103 (manning requirements); PVSA cabotage rules'
WHERE name = 'Passenger Vessel Services Act (PVSA) Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'USCG 46 CFR Parts 70-79 (passenger vessel safety); IMO SOLAS Convention; CDC Vessel Sanitation Program 42 CFR Part 71; 46 USC Section 30104 (Jones Act negligence); OSHA maritime 29 CFR Part 1918; DOT 49 CFR Part 176 (hazmat on vessels)'
WHERE name = 'Shore Excursion Safety & Liability Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'INA 8 USC Section 1185 (travel documentation); 22 CFR Part 51 (passports); 8 CFR Parts 212-215 (visa requirements); 22 USC Section 2714 (passport fraud); TSA 49 CFR Part 1540 (travel identification); REAL ID Act 6 USC Section 202; CA Bus & Prof Code Section 17550'
WHERE name = 'Travel Document & Passport/Visa Facilitation Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'OSHA 29 CFR Part 1910 (general industry safety); CA Labor Code Section 6300-6413.5 (Cal/OSHA); ASTM F24 (amusement rides/adventure tourism); CA Civ Code Section 1714 (general negligence); CA Civ Code Section 1812.80-1812.98 (outdoor guides); state adventure tourism licensing'
WHERE name = 'Adventure Tourism Safety & Risk Management Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Civ Code Section 846 (recreational use immunity); CA Food & Agric Code Section 52000-59311; CA Gov Code Section 65800 (zoning); CA Lab Code Section 6300-6413.5 (Cal/OSHA); USDA National Organic Program 7 CFR Part 205; CA Health & Safety Code Section 113700-114437 (food safety)'
WHERE name = 'Agritourism Liability & Regulatory Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'NHPA 54 USC Section 300101-320303 (National Historic Preservation Act); 36 CFR Part 800 (Section 106 review); CA Pub Resources Code Section 5020-5029.5 (CA Register); CEQA CA Pub Resources Code Section 21084.1; NAGPRA 25 USC Section 3001-3013; NPS 36 CFR Part 68'
WHERE name = 'Heritage Tourism & Cultural Resource Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'NHPA 54 USC Section 300101-320303; NAGPRA 25 USC Section 3001-3013; ARPA 16 USC Section 470aa-470mm (Archaeological Resources Protection); AIRFA 42 USC Section 1996 (American Indian Religious Freedom); Wilderness Act 16 USC Section 1131; 36 CFR Part 2 (NPS rules)'
WHERE name = 'Sensitive Site Tourism Ethics & Protocol Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'OMB Uniform Guidance 2 CFR Part 200; GASB standards; CA Gov Code Section 12410-12480 (State Controller); CA Gov Code Section 26880-26922 (county fiscal); 31 USC Section 7501-7507 (Single Audit Act); IRS IRC Section 501(c)(6) (DMO tax status)'
WHERE name = 'DMO Fiscal & Program Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'OMB Uniform Guidance 2 CFR Part 200; CDBG 42 USC Section 5301 (where applicable); EDA grants 42 USC Section 3121; Single Audit Act 31 USC Section 7501-7507; CA Gov Code Section 12410 (state grants); CA Arts Council grant regulations'
WHERE name = 'Tourism Grant Compliance & Reporting Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'IRS IRC Section 274 (entertainment deductions); IRS Publication 463 (travel expenses); FCPA 15 USC Section 78dd-1 (anti-bribery); UK Bribery Act 2010; FTC Act 15 USC Section 45; CA Bus & Prof Code Section 17200; DOL FLSA 29 USC Section 201 (compensable travel time)'
WHERE name = 'Incentive Travel Program Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CCPA CA Civ Code Section 1798.100; GDPR EU Regulation 2016/679; EU PNR Directive 2016/681; CBP 19 CFR Part 122 (advance passenger information); TSA 49 CFR Part 1540; Privacy Shield/DPF frameworks; APIS 19 USC Section 1431'
WHERE name = 'Travel Data / PNR Privacy Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CCPA CA Civ Code Section 1798.100; PCI DSS v4.0; DOT 14 CFR Part 399 (price transparency); FTC Act 15 USC Section 45 (online deception); ADA 42 USC Section 12181 (digital accessibility); ECPA 18 USC Section 2510; CA Bus & Prof Code Section 22575-22579 (CalOPPA)'
WHERE name = 'Travel Technology Platform Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'OSHA 29 CFR Part 1910 (duty of care); CA Labor Code Section 6300-6413.5 (Cal/OSHA); FCPA 15 USC Section 78dd-1; ISOS/WorldAware standards; ISO 31030 (travel risk management); CA Civ Code Section 1714 (duty of care); UK Health and Safety at Work Act 1974'
WHERE name = 'Travel Risk & Duty of Care Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'ADA 42 USC Section 12101-12213; Air Carrier Access Act 49 USC Section 41705; 14 CFR Part 382 (airline accessibility); 49 CFR Parts 37-38 (DOT ADA); CA Civ Code Section 54-55.3; WCAG 2.1 (digital accessibility); UN CRPD Article 9'
WHERE name = 'Accessible Tourism Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CDC 42 CFR Part 70-71 (quarantine/interstate/foreign); WHO International Health Regulations; CA Health & Safety Code Section 120100-120295 (communicable disease); IHR 2005; HIPAA 45 CFR Parts 160, 164; 42 USC Section 264 (quarantine authority)'
WHERE name = 'Travel Health & Medical Clearance Documentation Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Bus & Prof Code Section 26000-26231 (MAUCRSA); 4 CCR Section 15000-15999 (DCC regulations); CA Health & Safety Code Section 11357-11362.9; CA Revenue & Tax Code Section 34010-34021.5 (cannabis excise tax); CSA 21 USC Section 801 (federal); Cole Memorandum considerations'
WHERE name = 'Cannabis Tourism Regulatory Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Bus & Prof Code Section 23000-25762 (ABC Act); 27 USC Section 201-212 (FAA Act); TTB regulations 27 CFR Parts 1-31; CA Food & Agric Code Section 24800-25007; 4 CCR Section 50-79 (ABC regulations); CA Bus & Prof Code Section 25602 (dram shop liability)'
WHERE name = 'Wine & Spirits Tourism Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Bus & Prof Code Section 17550-17557.5 (Seller of Travel); ADA 42 USC Section 12181-12189 (stadium/venue); CA Gov Code Section 65850 (event zoning); local special event permits; CA Health & Safety Code Section 113700-114437 (food safety); OSHA 29 CFR Part 1910'
WHERE name = 'Sports Tourism & Event Travel Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Bus & Prof Code Section 2052 (medical practice regulation); CA Bus & Prof Code Section 17550 (Seller of Travel); FTC Act 15 USC Section 45 (deceptive practices); state medical tourism disclosure laws; HIPAA 45 CFR Parts 160, 164; Joint Commission international standards'
WHERE name = 'Medical Tourism Facilitator Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'RFRA 42 USC Section 2000bb (Religious Freedom Restoration Act); First Amendment religious accommodations; ADA 42 USC Section 12181; CA Bus & Prof Code Section 17550 (Seller of Travel); local tourism ordinances; CA Gov Code Section 12926 (FEHA religious accommodation)'
WHERE name = 'Religious & Pilgrimage Tourism Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'FERPA 20 USC Section 1232g; COPPA 15 USC Section 6501-6506; Title IX 20 USC Section 1681; CA Education Code Section 35330 (field trips); CA Education Code Section 49010-49014 (fees); State Department 22 CFR Part 62 (J-visa exchange programs); 8 CFR Part 214.2(f) (F-visa)'
WHERE name = 'Student & Educational Travel Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'ADA 42 USC Section 12101-12213; Air Carrier Access Act 49 USC Section 41705; 14 CFR Part 382; 49 CFR Parts 37-38; Rehabilitation Act Section 504 29 USC Section 794; CA Civ Code Section 54-55.3; UN CRPD; WCAG 2.1'
WHERE name = 'Accessible Travel Planning Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Gov Code Section 65850 (local zoning permits); CA Fire Code 24 CCR Part 9; CA Health & Safety Code Section 113700-114437 (food safety); local special event ordinances; CA Bus & Prof Code Section 23000 (ABC temporary permits); OSHA 29 CFR Part 1910'
WHERE name = 'Special Event Permit Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Health & Safety Code Section 115000-115060 (mass gathering); CA Fire Code 24 CCR Part 9; CA Gov Code Section 8550-8668 (emergency services); local mass gathering ordinances; NFPA 102 (assembly occupancies); OSHA 29 CFR Part 1910.36-38 (means of egress)'
WHERE name = 'Mass Gathering Permit & Public Safety Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Health & Safety Code Section 113700-114437 (California Retail Food Code); CA Health & Safety Code Section 114295-114340 (temporary food facilities); FDA Food Code; 21 CFR Part 110 (food cGMP); local county environmental health permits; CA Health & Safety Code Section 114332.2'
WHERE name = 'Temporary Food Facility (TFF) Permit Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Bus & Prof Code Section 23000-25762 (ABC Act); CA Bus & Prof Code Section 24045-24045.6 (temporary licenses); 4 CCR Section 60-67 (ABC temporary permit regulations); 27 USC Section 201-212 (FAA Act); TTB 27 CFR Part 1; local alcohol permit requirements'
WHERE name = 'Temporary Liquor License / Event Alcohol Permit Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Vehicle Code Section 21100-21107 (local traffic regulation); MUTCD (Manual on Uniform Traffic Control Devices); CA Streets & Highways Code Section 1460-1496; local encroachment permit ordinances; CA Gov Code Section 65850; ADA 42 USC Section 12101 (pedestrian access)'
WHERE name = 'Event Street Closure & Traffic Management Permit Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Local noise ordinances; CA Health & Safety Code Section 46000-46080 (noise control); CA Gov Code Section 65302(f) (noise element); CA Code of Regs Title 24 Part 2 Appendix Chapter 12 (sound transmission); EPA Noise Control Act 42 USC Section 4901; OSHA 29 CFR Section 1910.95'
WHERE name = 'Event Sound & Noise Ordinance Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Bus & Prof Code Section 7580-7599 (private security); 16 CCR Section 601-699; CA Penal Code Section 837 (citizen arrest authority); CA Penal Code Section 12020-12040 (weapons); DHS SAFETY Act 6 USC Section 441-444; ASIS PSO.1 (security management)'
WHERE name = 'Event Security Plan & Operations Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'NFPA 102 (assembly occupancies); CA Fire Code 24 CCR Part 9; IBC/CBC Chapter 10 (means of egress); OSHA 29 CFR Section 1910.36-38; CA Health & Safety Code Section 115000-115060 (mass gathering); local fire marshal crowd capacity orders'
WHERE name = 'Crowd Management & Flow Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Health & Safety Code Section 1797-1799.207 (EMS Act); 22 CCR Section 100144-100184 (LEMSA); OSHA 29 CFR Section 1910.151 (medical services); CA Health & Safety Code Section 115000-115060 (mass gathering medical); NFPA 3000 (active shooter/hostile event); local EMS protocols'
WHERE name = 'Event Medical Plan & EMS Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Health & Safety Code Section 12500-12728 (explosives); CA Fire Code 24 CCR Part 56 (fireworks); CA Health & Safety Code Section 12700 (fireworks); NFPA 1123 (outdoor display fireworks); NFPA 1126 (proximate audience pyrotechnics); BATFE 27 CFR Part 555'
WHERE name = 'Pyrotechnics & Special Effects Permit Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Fire Code 24 CCR Part 9; CA Health & Safety Code Section 13000-13250; NFPA 102 (assembly); NFPA 5000 (building construction); 24 CCR Part 2 (CBC temporary structures); CA Health & Safety Code Section 18938.5 (temporary structures); OSHA 29 CFR Part 1926 (construction)'
WHERE name = 'Event Fire Safety & Temporary Structure Inspection Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'DHS SAFETY Act 6 USC Section 441-444; Presidential Policy Directive PPD-21; NFPA 3000 (active shooter/hostile event); CA Gov Code Section 8550-8668 (emergency services); Homeland Security Act 6 USC Section 101; CISA directives; NRF (National Response Framework)'
WHERE name = 'Event Counter-Terrorism & Hostile Event Preparedness Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'UCC Article 2A (leases/CA Com Code Section 10101); CA Civ Code Section 1636-1701 (contracts); ADA 42 USC Section 12181-12189; CA Fire Code 24 CCR Part 9; OSHA 29 CFR Part 1910; local zoning/occupancy; CA Bus & Prof Code Section 7000-7191 (CSLB contractor licensing)'
WHERE name = 'Convention Center Contract & Operations Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'UCC Article 2 (CA Com Code Section 2101); CA Bus & Prof Code Section 17200-17210; FTC Act 15 USC Section 45; ADA 42 USC Section 12181-12189; CA Labor Code Section 6300-6413.5 (Cal/OSHA); CA Fire Code 24 CCR Part 9; Lanham Act 15 USC Section 1125 (trade show IP)'
WHERE name = 'Trade Show Exhibitor Agreement & Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Health & Safety Code Section 115000-115060 (mass gathering); NFPA 102 (assembly occupancies); CA Fire Code 24 CCR Part 9; ADA 42 USC Section 12181-12189; OSHA 29 CFR Part 1910; CA Health & Safety Code Section 113700-114437 (food safety); ASTM F1193 (amusement ride safety)'
WHERE name = 'Sports Venue Safety & Regulatory Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Insurance Code Section 100-12419; McCarran-Ferguson Act 15 USC Section 1011; CA Civ Code Section 1714 (general negligence); TRIA 15 USC Section 6701 (terrorism risk insurance); CA Labor Code Section 3200-6208 (workers comp); CGL policy standard ISO forms'
WHERE name = 'Event Insurance & Risk Transfer Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Labor Code Section 7900-7932 (amusement ride safety); 8 CCR Section 344.6-344.82 (DOSH ride inspection); ASTM F24 Committee standards; CA Health & Safety Code Section 115000-115060; OSHA 29 CFR Part 1910; CPSC 16 CFR Part 1500 (inflatable devices)'
WHERE name = 'Amusement Ride & Inflatable Device Inspection Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Health & Safety Code Section 113700-114437 (CA Retail Food Code); CA Health & Safety Code Section 114295-114340 (TFF permits); CA Vehicle Code Section 22456-22459 (mobile food facilities); local vendor permit ordinances; CA Bus & Prof Code Section 17200; OSHA 29 CFR Part 1910'
WHERE name = 'Event Vendor & Mobile Food Facility Permit Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'ADA 42 USC Section 12181-12189 (public accommodations); 28 CFR Part 36 (ADA regulations); CA Civ Code Section 54-55.3 (disabled access); CA Gov Code Section 4450-4461; 24 CCR Chapter 11B; WCAG 2.1 (digital accessibility); Section 504 29 USC Section 794'
WHERE name = 'Event ADA Accessibility Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'ADA 42 USC Section 12181-12189; FCC 47 CFR Part 64 Subpart F (TRS); CA Gov Code Section 11135; 28 CFR Part 36 Section 36.303 (auxiliary aids); CA Civ Code Section 54.8 (ASL interpreters); WCAG 2.1; Section 508 29 USC Section 794d'
WHERE name = 'Event Communication Access Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'ADA 42 USC Section 12181-12189; Section 508 29 USC Section 794d; WCAG 2.1/2.2; CA Gov Code Section 11135; CA Civ Code Section 54-55.3; EN 301 549 (EU digital accessibility); FCC 47 USC Section 255 (telecom accessibility)'
WHERE name = 'Event Digital Accessibility & Inclusion Technology Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'FAA 14 CFR Part 107 (small UAS); FAA Part 107.39 (operations over people); 49 USC Section 44809 (recreational UAS); FAA COA/Section 107.200 waiver requirements; CA Civ Code Section 1708.8 (drone privacy); state/local UAS ordinances; LAANC authorization'
WHERE name = 'Unmanned Aircraft Systems (UAS) Event Operations Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Local filming permit ordinances; CA Gov Code Section 65850; FAA 14 CFR Part 107 (drone filming); Copyright Act 17 USC Section 101-1401; CA Civ Code Section 3344 (right of publicity); CA Civ Code Section 1708.8 (invasion of privacy); First Amendment considerations'
WHERE name = 'Event Filming & Photography Permit Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Pub Resources Code Section 42000-42027 (integrated waste management); CalRecycle SB 1383 (organic waste diversion); CA Pub Resources Code Section 41780-41786 (diversion mandates); RCRA 42 USC Section 6901; EPA 40 CFR Part 258 (landfill standards); local zero waste ordinances'
WHERE name = 'Event Waste Diversion & Environmental Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Bus & Prof Code Section 23000-25762 (ABC Act); 4 CCR Section 50-79 (ABC regulations); CA Bus & Prof Code Section 25602 (dram shop liability); CA Bus & Prof Code Section 25658 (furnishing to minor); CA Penal Code Section 647(f) (public intoxication); RAMP guidelines'
WHERE name = 'Event On-Site Alcohol Service Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Health & Safety Code Section 38500-38599 (Global Warming Solutions Act AB 32); CARB Cap-and-Trade 17 CCR Section 95800-96023; CA Pub Resources Code Section 42000 (waste diversion); ISO 14064 (GHG accounting); EPA 40 CFR Part 98 (GHG reporting); SB 253 Climate Corporate Data Accountability Act'
WHERE name = 'Event Sustainability & Carbon Offset Verification Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CCPA CA Civ Code Section 1798.100-1798.199.100; GDPR EU Regulation 2016/679 (where applicable); CA Civ Code Section 1798.82 (breach notification); PCI DSS v4.0 (payment data); FTC Act 15 USC Section 45; CAN-SPAM Act 15 USC Section 7701; TCPA 47 USC Section 227'
WHERE name = 'Event Registration & Attendee Data Privacy Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'FCC 47 CFR Parts 73-74 (broadcasting); FCC 47 USC Section 325 (retransmission consent); Copyright Act 17 USC Section 101-1401; DMCA 17 USC Section 512; CA Civ Code Section 3344 (right of publicity); ECPA 18 USC Section 2510; FCC 47 CFR Part 64'
WHERE name = 'Event Live-Streaming & Broadcast Regulatory Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'NIST Cybersecurity Framework; PCI DSS v4.0; CCPA CA Civ Code Section 1798.100; CFAA 18 USC Section 1030; FCC 47 CFR Part 15 (wireless devices); CA Civ Code Section 1798.82 (breach notification); CA Civ Code Section 1798.91.04 (IoT security SB 327)'
WHERE name = 'Event Cybersecurity & Temporary Network Operations Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Health & Safety Code Section 115000-115060 (mass gathering); CA Health & Safety Code Section 113700-114437 (food safety); CA Bus & Prof Code Section 23000 (ABC); CA Fire Code 24 CCR Part 9; CA Labor Code Section 7900 (amusement rides); local comprehensive event ordinances; ADA 42 USC Section 12181'
WHERE name = 'Festival & Fair Comprehensive Permit Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Wilderness Act 16 USC Section 1131-1136; NEPA 42 USC Section 4321-4347; BLM 43 CFR Part 8300-8370 (special recreation permits); NPS 36 CFR Part 1-7 (park regulations); USFS 36 CFR Part 251 (special use permits); CA Pub Resources Code Section 5001-5019.5 (state parks); CWA 33 USC Section 1344'
WHERE name = 'Outdoor & Wilderness Event Permit Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CCPA CA Civ Code Section 1798.100; GDPR EU Regulation 2016/679; FCC 47 CFR Parts 73-74 (broadcasting); FTC Act 15 USC Section 45; ADA 42 USC Section 12181 (digital accessibility); Copyright Act 17 USC Section 101; ECPA 18 USC Section 2510; CAN-SPAM 15 USC Section 7701'
WHERE name = 'Virtual & Hybrid Event Regulatory Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'FECA 52 USC Section 30101-30146 (federal campaign finance); CA Gov Code Section 81000-91014 (Political Reform Act); CA Elec Code Section 18000-18700; First Amendment assembly/petition rights; BCRA 52 USC Section 30104; Lobbying Disclosure Act 2 USC Section 1601-1614; FCC 47 USC Section 315 (equal time)'
WHERE name = 'Political & Advocacy Event Regulatory Compliance Officer';

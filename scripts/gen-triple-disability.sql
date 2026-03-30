-- Disability, Workers Comp, OSHA Triple Constraint Completion

UPDATE citizen_catalog SET
  governing_guidelines = 'Americans with Disabilities Act (42 USC 12101); ADA Amendments Act of 2008; Section 504 of Rehabilitation Act; CA FEHA (Gov. Code 12900); EEOC Title I regulations (29 CFR Part 1630)',
  standards_of_creation = 'EEOC Enforcement Guidance on Reasonable Accommodation; ABA Model Rules of Professional Conduct; State Bar specialty certification in employment/labor law; SHRM Body of Competency and Knowledge',
  soc_controls = 'SOC 2 Type II (Confidentiality, Processing Integrity); interactive process documentation audit; reasonable accommodation request tracking; medical information segregation verification (Genetic Information Nondiscrimination Act compliance); litigation hold documentation; privilege log maintenance'
WHERE name = 'Attorney -- ADA/Disability Employment Law';

UPDATE citizen_catalog SET
  governing_guidelines = 'ADA Title I (42 USC 12111); 29 CFR Part 1630; Executive Order 13164 (federal sector); EEOC Management Directive 715; Section 501 of Rehabilitation Act',
  standards_of_creation = 'EEOC Resource Guide on Reasonable Accommodation; SHRM Workplace Accommodation Standards; Job Accommodation Network (JAN) methodology; Office of Disability Employment Policy best practices',
  soc_controls = 'SOC 2 Type II (Confidentiality, Processing Integrity); interactive process documentation tracking; accommodation request turnaround time monitoring; medical records segregation audit; MD-715 reporting compliance; complaint tracking and resolution documentation; barrier analysis methodology documentation'
WHERE name = 'EEO Specialist / ADA Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'FMLA (29 USC 2601); ADA interactive process requirements; CA CFRA (Gov. Code 12945.2); state paid family leave laws; USERRA (38 USC 4301); Pregnancy Discrimination Act',
  standards_of_creation = 'SHRM Body of Applied Skills and Knowledge; DMEC (Disability Management Employer Coalition) standards; CLMS (Certified Leave Management Specialist) certification; employer leave policy frameworks',
  soc_controls = 'SOC 2 Type II (Confidentiality, Processing Integrity); FMLA eligibility verification documentation; leave tracking system accuracy audit; fitness-for-duty certification management; return-to-work program documentation; medical certification review process; leave interference/retaliation monitoring'
WHERE name = 'HR Specialist -- Disability & Leave Management';

UPDATE citizen_catalog SET
  governing_guidelines = 'State occupational medicine practice acts; 42 USC 12112(d) (ADA medical examinations); OSHA medical surveillance standards (29 CFR 1910/1926); Federal Motor Carrier Safety regulations (49 CFR 391)',
  standards_of_creation = 'ACOEM (American College of Occupational and Environmental Medicine) Practice Guidelines; AMA Guides to the Evaluation of Permanent Impairment; ABPM (American Board of Preventive Medicine) certification standards; state IME practice regulations',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); IME report completeness and timeliness audit; AMA Guides methodology compliance review; medical opinion documentation standards; conflict of interest disclosure; exam recording consent documentation; report authentication and chain of custody'
WHERE name = 'Physician -- Occupational Medicine / Independent Medical Examiner';

UPDATE citizen_catalog SET
  governing_guidelines = 'ADA Title II (42 USC 12131); 28 CFR Part 35; Section 504 of Rehabilitation Act; state government accessibility requirements; DOJ ADA Title II Technical Assistance Manual',
  standards_of_creation = 'DOJ ADA Best Practices Tool Kit for State and Local Governments; ADA National Network technical assistance; ICMA public administration standards; self-evaluation and transition plan requirements per 28 CFR 35.105',
  soc_controls = 'SOC 2 Type II (Processing Integrity); ADA self-evaluation documentation; transition plan progress monitoring; grievance procedure accessibility audit; program access verification; effective communication assessment; website accessibility monitoring (WCAG compliance)'
WHERE name = 'ADA Coordinator -- Public Entity';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Gov. Code 4459.5 (CASp certification); ADA Standards for Accessible Design (28 CFR Part 36); CA Building Code Chapter 11B; Fair Housing Act accessibility requirements; DOJ 2010 ADA Standards',
  standards_of_creation = 'DSA (Division of the State Architect) CASp certification standards; ICC A117.1 (Accessible and Usable Buildings); ADA/ABA Accessibility Guidelines (ADAAG); ANSI A117.1; California Access Compliance Reference Manual',
  soc_controls = 'SOC 2 Type II (Processing Integrity); CASp inspection report documentation standards; barrier identification and remediation tracking; construction documents accessibility review checklist; post-construction verification; CASp certificate of inspection issuance tracking; qualified expert determination documentation'
WHERE name = 'Certified Access Specialist (CASp) / ADA Compliance Consultant';

UPDATE citizen_catalog SET
  governing_guidelines = 'ADA Standards for Accessible Design; CA Building Code Chapter 11B; Fair Housing Act Design and Construction Requirements; ICC A117.1; state architectural licensure acts',
  standards_of_creation = 'AIA (American Institute of Architects) Code of Ethics; NCARB certification standards; Universal Design principles (Center for Universal Design); ANSI A117.1; state Board of Architecture practice standards',
  soc_controls = 'SOC 2 Type II (Processing Integrity); accessibility plan review documentation; code compliance verification at each construction phase; post-occupancy evaluation; accessible route calculations; signage and wayfinding compliance; building permit accessibility sign-off'
WHERE name = 'Licensed Architect (Accessibility Specialization)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Section 504 of Rehabilitation Act (29 USC 794); 34 CFR Part 104; ADA Title II; IDEA interface with Section 504; OCR complaint resolution requirements',
  standards_of_creation = 'OCR Section 504 compliance guidance documents; AHEAD (Association on Higher Education and Disability) standards (if postsecondary); state education department Section 504 implementation guides; Free Appropriate Public Education (FAPE) documentation requirements',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); Section 504 plan development and review compliance; eligibility determination documentation; accommodation implementation tracking; grievance procedure documentation; annual notification compliance; OCR data collection requirements'
WHERE name = 'Section 504 Compliance Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'IDEA (20 USC 1400); 34 CFR Part 300; CA Education Code Title 2; state special education regulations; Section 504 coordination',
  standards_of_creation = 'CEC (Council for Exceptional Children) Professional Standards; NASDSE (National Association of State Directors of Special Education) guidance; state special education administrative standards; IEP development guidelines per 34 CFR 300.320',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); IEP compliance timeline tracking; procedural safeguard distribution documentation; evaluation timeline compliance; transition plan documentation (age 16+); due process hearing record maintenance; state performance plan indicator monitoring; disproportionality data analysis'
WHERE name = 'Director of Special Education / LEA IDEA Administrator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Rehabilitation Act Title I (29 USC 720); WIOA Title IV; CA Welfare & Institutions Code Division 10 (DOR); 34 CFR Part 361; state vocational rehabilitation regulations',
  standards_of_creation = 'CRCC (Commission on Rehabilitation Counselor Certification) Code of Ethics; CACREP rehabilitation counseling standards; RSA (Rehabilitation Services Administration) policy directives; Individualized Plan for Employment (IPE) development standards',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); IPE development timeline compliance; informed choice documentation; case closure documentation; eligibility determination process audit; order of selection documentation; VR case management system audit trails; RSA-911 reporting compliance'
WHERE name = 'Vocational Rehabilitation Counselor (DOR)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Lanterman Developmental Disabilities Services Act (CA WIC 4500-4905); 42 CFR Part 435 (Medicaid HCBS); CA Title 17 regulations; HCBS Settings Rule (42 CFR 441.301(c)(4))',
  standards_of_creation = 'DDS (Department of Developmental Services) directives; Regional Center contractual standards; ARCA (Association of Regional Center Agencies) best practices; Person-Centered Planning standards per HCBS Settings Rule',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); Individual Program Plan (IPP) development and annual review tracking; purchase of service (POS) authorization documentation; consumer rights notification compliance; vendorization and rate documentation; special incident reporting; NCI (National Core Indicators) survey participation'
WHERE name = 'Service Coordinator -- Regional Center (Lanterman Act)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Rehabilitation Act Title VII (29 USC 796); WIOA Title IV; CA Welfare & Institutions Code (Independent Living Centers); 45 CFR Part 1329',
  standards_of_creation = 'NCIL (National Council on Independent Living) standards; SILC (Statewide Independent Living Council) state plan; ACL (Administration for Community Living) reporting standards; IL philosophy and peer counseling methodology documentation',
  soc_controls = 'SOC 2 Type II (Processing Integrity); consumer service record documentation; IL plan development and tracking; advocacy outcome documentation; 704 Annual Performance Report compliance; consumer satisfaction data collection; peer counseling session documentation'
WHERE name = 'Independent Living Counselor / Peer Counselor';

UPDATE citizen_catalog SET
  governing_guidelines = 'ADA Titles I-III (assistive technology as reasonable accommodation); Section 508 of Rehabilitation Act (29 USC 794d); Assistive Technology Act (29 USC 3001); IDEA AT provisions',
  standards_of_creation = 'RESNA (Rehabilitation Engineering and Assistive Technology Society of North America) ATP certification standards; RESNA Code of Ethics; IACET continuing education standards for ATPs; manufacturer-specific training requirements',
  soc_controls = 'SOC 2 Type II (Processing Integrity); AT assessment documentation; device trial documentation; funding justification records; outcome measurement tracking; device abandonment monitoring; maintenance and repair documentation; consumer training records'
WHERE name = 'Assistive Technology Professional (ATP) -- RESNA Certified';

UPDATE citizen_catalog SET
  governing_guidelines = 'Section 508 of Rehabilitation Act (29 USC 794d); ADA Title III (web accessibility); WCAG 2.1/2.2 (referenced by DOJ); CA Gov. Code 7405 (state web accessibility); EU Web Accessibility Directive (for international scope)',
  standards_of_creation = 'W3C WCAG 2.1 AA/AAA Success Criteria; WAI-ARIA Authoring Practices; IAAP (International Association of Accessibility Professionals) CPWA/WAS certification; Section 508 ICT Testing Baseline; Trusted Tester methodology',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Availability); automated accessibility scanning (axe-core, WAVE, Lighthouse); manual VPAT/ACR verification; screen reader testing documentation; keyboard navigation audit; color contrast verification; PDF accessibility audit; remediation tracking and regression testing'
WHERE name = 'Digital Accessibility Analyst / WCAG Compliance Auditor';

-- Workers Compensation personas

UPDATE citizen_catalog SET
  governing_guidelines = 'State Workers Compensation Acts (e.g., CA Labor Code Division 4); 8 CCR Title 8 (CA); NCCI classification system; state WC fee schedules; Longshore and Harbor Workers Compensation Act (33 USC 901) where applicable',
  standards_of_creation = 'IAIABC (International Association of Industrial Accident Boards and Commissions) standards; NCCI Experience Rating Plan Manual; state WC adjuster licensing requirements; AMA Guides to the Evaluation of Permanent Impairment (designated edition per state)',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); claims reserve accuracy audit; medical treatment utilization review documentation; benefit calculation verification; vocational rehabilitation referral tracking; penalty and interest tracking; claims diary compliance; FROI/SROI electronic reporting verification'
WHERE name = 'Claims Examiner / Claims Adjuster -- Workers Compensation';

UPDATE citizen_catalog SET
  governing_guidelines = 'State insurance codes (WC chapter); NAIC Workers Compensation Model Acts; state rate filing requirements; federal terrorism risk insurance (TRIA); state assigned risk/residual market rules',
  standards_of_creation = 'NCCI Basic Manual for Workers Compensation; state rating bureau classification guides; CPCU/ARM designation standards (The Institutes); actuarial standards of practice (ASB); state DOI filing requirements',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Security); classification code accuracy audit; experience modification rate verification; premium audit documentation; retrospective rating plan compliance; schedule credit/debit justification; policy form compliance review; state filing approval tracking'
WHERE name = 'Underwriter -- Workers Compensation Insurance';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Labor Code 3700-3705 (self-insurance requirements); 8 CCR 15200-15500 (CA self-insurance regulations); State self-insurance certification requirements; excess insurance requirements',
  standards_of_creation = 'OSIP (Office of Self-Insurance Plans) reporting standards; state self-insurance advisory committee guidelines; GASB standards for WC liability recognition (government self-insurers); actuarial certification standards for self-insured reserves',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Security); annual report filing compliance; security deposit adequacy verification; claims administration audit; actuarial study documentation; excess carrier notification compliance; TPA (Third Party Administrator) oversight documentation; self-insured group annual report'
WHERE name = 'Workers Compensation Self-Insurance Administrator';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Labor Code 4600-4604.5 (treating physician obligations); 8 CCR 9780-9795 (CA Medical Treatment Utilization Schedule); state WC medical fee schedule; AMA Guides (designated edition per state jurisdiction)',
  standards_of_creation = 'ACOEM Practice Guidelines (adopted as MTUS in CA); Evidence-Based Medicine methodology; AMA Guides to the Evaluation of Permanent Impairment; state WC medical reporting forms (PR-1, PR-2, PR-3, PR-4 in CA)',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); treatment request documentation completeness; MTUS/ACOEM guideline adherence audit; medical report timeliness tracking; RFA (Request for Authorization) documentation; utilization review decision compliance; medical-legal reporting accuracy'
WHERE name = 'Primary Treating Physician -- Workers Compensation';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Labor Code 4610-4610.6 (utilization review); 42 USC 1320c (Medicare QIO parallel); state UR licensing requirements; ERISA UR requirements for self-funded plans',
  standards_of_creation = 'URAC Utilization Management Accreditation standards; ACOEM Practice Guidelines (MTUS); state-specific UR timeframe and process requirements; Maximus Federal Services contract standards (for federal programs)',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); UR decision turnaround time compliance; physician reviewer qualification verification; modification/delay/denial documentation audit; peer-to-peer review documentation; appeal tracking; inter-rater reliability testing'
WHERE name = 'Independent Medical Reviewer -- Maximus Federal Services (contracted)';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Labor Code 4616-4616.7 (Medical Provider Networks); 8 CCR 9767.1-9767.16 (MPN regulations); state WC MPN requirements; continuity of care requirements',
  standards_of_creation = 'DWC (Division of Workers Compensation) MPN filing requirements; network adequacy standards per 8 CCR 9767.5; geo-access mapping methodology; MPN continuity of care policy documentation',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Availability); MPN access standards compliance monitoring; provider credentialing verification; MPN notice distribution tracking; employee choice documentation; dispute resolution process tracking; annual MPN plan review documentation; DWC filing compliance'
WHERE name = 'MPN Contact Person / Network Administrator';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Labor Code 139.2 (QME system); 8 CCR 1-200 (QME regulations); state medical examiner designation requirements; AMA Guides (designated edition)',
  standards_of_creation = 'DWC QME appointment standards; AMA Guides to the Evaluation of Permanent Impairment; ACOEM reporting guidelines; QME continuing education requirements; comprehensive medical-legal evaluation standards per 8 CCR 49-49.9',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); QME panel selection documentation; evaluation appointment notice compliance; medical-legal report content requirements audit; document disclosure compliance; communication prohibition documentation; QME reappointment qualification tracking; evaluation timeline compliance'
WHERE name = 'Qualified Medical Evaluator';

-- OSHA personas

UPDATE citizen_catalog SET
  governing_guidelines = 'OSH Act (29 USC 651); 29 CFR 1904 (OSHA Recordkeeping); state OSHA plan requirements; ANSI Z10 (Occupational H&S Management)',
  standards_of_creation = 'BCSP (Board of Certified Safety Professionals) CSP/ASP certification standards; ASSE/ASSP (American Society of Safety Professionals) Body of Knowledge; AIHA (American Industrial Hygiene Association) competency standards; OSHA VPP (Voluntary Protection Programs) criteria',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Availability); OSHA 300/300A/301 log accuracy audit; injury/illness classification verification; annual posting compliance; OSHA inspection documentation; safety training documentation (sign-off, competency); hazard assessment documentation; PPE assessment records; emergency action plan drill records'
WHERE name LIKE 'Telecommunications Relay%';

UPDATE citizen_catalog SET
  governing_guidelines = 'ADA Title III (28 CFR 36.302(c)); CA Civil Code 54.1-54.2 (service animal access); FHA service/support animal provisions; DOT Air Carrier Access Act (14 CFR Part 382) for air travel; state service animal fraud statutes',
  standards_of_creation = 'DOJ ADA Service Animal Guidance (Revised Requirements 2011); HUD FHEO guidance on assistance animals; ADI (Assistance Dogs International) program accreditation standards; IGDF (International Guide Dog Federation) standards; state-specific service animal certification (where applicable)',
  soc_controls = 'SOC 2 Type II (Processing Integrity); service animal documentation verification; reasonable accommodation request processing; interactive process documentation; handler training record verification; public entity/place of public accommodation complaint tracking; fraudulent representation investigation'
WHERE name = 'ADA Service Animal Compliance Advisor';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Vehicle Code 22511.55-22511.59 (disabled person parking); CA Health & Safety Code 114260 (placard issuance); ADA parking requirements; state DMV disabled placard/plate regulations',
  standards_of_creation = 'DMV REG 195 (CA Application for Disabled Person Placard or Plates) processing standards; medical certification requirements; ADA Accessibility Guidelines parking space calculations; state placard fraud investigation procedures',
  soc_controls = 'SOC 2 Type II (Processing Integrity); medical certification verification; placard issuance and renewal tracking; fraud referral documentation; parking enforcement coordination records; temporary vs permanent placard tracking; deceased placard holder cancellation process'
WHERE name = 'Disabled Persons Parking Placard Program Administrator';

UPDATE citizen_catalog SET
  governing_guidelines = 'ABLE Act (26 USC 529A); CA Government Code 4875-4887 (CalABLE); state ABLE program enabling statutes; SSA POMS SI 01130.740 (ABLE account treatment); Medicaid ABLE provisions',
  standards_of_creation = 'National ABLE Alliance program standards; CalABLE Account Agreement terms; IRS ABLE account contribution and distribution rules; SSA guidance on ABLE account interaction with SSI/SSDI; state ABLE program administrator certification',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Security); contribution limit tracking ($18,000/yr + employed individual exception); qualified disability expense verification; Medicaid payback provision documentation; SSI resource exclusion compliance; tax reporting (Form 1099-QA/5498-QA); account beneficiary eligibility verification; rollover documentation'
WHERE name = 'ABLE Account / CalABLE Program Specialist';

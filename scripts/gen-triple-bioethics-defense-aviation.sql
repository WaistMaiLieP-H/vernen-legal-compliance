-- ============================================================
-- TRIPLE CONSTRAINT UPDATE: Bioethics/Genetics/Transplant (58)
--                          Defense/IP/Technology (71)
--                          Aviation/Maritime/Transport (71)
-- Generated: 2026-03-29
-- Total: 200 personas
-- ============================================================

-- ============================================================
-- SECTION 1: BIOETHICS / GENETICS / ORGAN & TISSUE TRANSPLANT
-- ============================================================

-- A1: IRB Administration & Oversight

UPDATE citizen_catalog SET
  governing_guidelines = '45 CFR 46 Subparts A-E (Common Rule); 21 CFR 56 (FDA IRB Requirements); 45 CFR 46.107 (IRB Membership); 45 CFR 46.109 (IRB Review); AAHRPP Accreditation Standards Domain I Element I.1.A',
  standards_of_creation = 'AAHRPP accreditation; documented quorum per 45 CFR 46.108(b); written procedures per 45 CFR 46.103(b)(4); meeting minutes documenting attendance, votes, and findings under 45 CFR 46.111',
  soc_controls = 'SOC 2 Type II CC6.1 (logical access to IRB records), CC6.3 (authorized protocol file access); document retention minimum 3 years post-study per 45 CFR 46.115(b); audit trail for all approval/disapproval decisions'
WHERE name = 'IRB Chairperson';

UPDATE citizen_catalog SET
  governing_guidelines = '45 CFR 46.103 (Federalwide Assurance); 45 CFR 46.115 (IRB Records); 21 CFR 56.115 (FDA IRB Records); NIH Single IRB Policy NOT-OD-16-094; AAHRPP Standard I-9 (Recordkeeping)',
  standards_of_creation = 'FWA documentation and annual renewal; IRB registration (IORG number maintenance); protocol tracking logs with regulatory milestones; sIRB reliance agreements per NIH mandate',
  soc_controls = 'SOC 2 Type II CC7.2 (monitoring IRB submission systems), CC8.1 (change management for protocol amendments); electronic submission system audit logs; version control for all protocol documents'
WHERE name LIKE 'IRB Coordinator%';

UPDATE citizen_catalog SET
  governing_guidelines = '45 CFR 46 Subparts A-E (full Common Rule); AAHRPP Accreditation Standards Domains I-III; OHRP Guidance on Written IRB Procedures; 45 CFR 46.103(b) (Institutional assurance requirements)',
  standards_of_creation = 'AAHRPP accreditation; institutional policies and procedures manual; HRPP organizational chart; annual program evaluation reports; institutional conflict of interest management plans',
  soc_controls = 'SOC 2 Type II CC1.1 (COSO-based control environment), CC3.1 (risk assessment for research operations); segregation of duties between IRB review and institutional administration; whistleblower/complaint mechanisms per AAHRPP Domain I'
WHERE name LIKE 'Human Research Protection Program%';

UPDATE citizen_catalog SET
  governing_guidelines = '42 CFR Part 93 (PHS Research Misconduct); 45 CFR 46.103(b)(5) (compliance with approved protocols); NSF Award Conditions Chapter VII; NIH Grants Policy Statement Section 4.1.11; America COMPETES Act § 7009',
  standards_of_creation = 'Research misconduct investigation procedures (inquiry, investigation, adjudication); sequestration of evidence protocols; finding notifications with due process; RCR training curricula and completion tracking',
  soc_controls = 'SOC 2 Type II CC6.2 (restricted access to investigation files), CC7.4 (incident response for misconduct allegations); confidentiality protections for complainants and respondents; chain of custody for research data'
WHERE name LIKE 'Research Compliance Officer%';

UPDATE citizen_catalog SET
  governing_guidelines = '45 CFR 46.109(e) (Continuing review); 45 CFR 46.115 (IRB records of continuing review); FDA Guidance: IRB Continuing Review After Clinical Investigation Approval (2012); AAHRPP Element II.4.A',
  standards_of_creation = 'Continuing review applications with enrollment data and adverse event summaries; risk-benefit reassessment at intervals not exceeding 12 months; study closure reports; expedited continuing review criteria documentation',
  soc_controls = 'SOC 2 Type II CC7.1 (detection of overdue reviews), CC7.3 (escalation of lapsed approvals); automated expiration tracking systems; suspension/termination documentation procedures'
WHERE name LIKE 'Continuing Review Analyst%';

UPDATE citizen_catalog SET
  governing_guidelines = 'ASBH Core Competencies for Healthcare Ethics Consultation 2nd ed.; 45 CFR 46.111 (Criteria for IRB approval); Belmont Report (1979); Declaration of Helsinki (WMA 2013); Nuffield Council on Bioethics Guidelines',
  standards_of_creation = 'Ethics consultation notes with identified issues, analysis framework, and recommendations; community advisory board minutes; ethical analysis of risk-benefit ratios; cultural competency assessments for international protocols',
  soc_controls = 'SOC 2 Type II CC1.4 (competency evaluation), CC2.2 (communication of ethics findings); documentation of qualifications and ongoing education; recusal documentation where conflicts exist'
WHERE name LIKE '%Ethics Consultant%' AND (name LIKE '%Clinical%' OR name LIKE '%Research%');

UPDATE citizen_catalog SET
  governing_guidelines = 'NIH Policy on Use of Single IRB for Multi-Site Research (effective 1/25/2018); 45 CFR 46.114 (Cooperative research revised 2018); NOT-OD-16-094; SMART IRB Master Reliance Agreement framework',
  standards_of_creation = 'Reliance agreements between reviewing and relying institutions; communication plans for adverse events and deviations; jurisdictional review documentation; local context review checklists',
  soc_controls = 'SOC 2 Type II CC6.6 (system boundaries for multi-site data), CC9.1 (risk mitigation for reliance relationships); interinstitutional data sharing security protocols; audit trail for reliance agreement execution'
WHERE name LIKE 'sIRB%';

-- A2: Informed Consent & Participant Protections

UPDATE citizen_catalog SET
  governing_guidelines = '45 CFR 46.116 (General requirements for informed consent revised 2018); 45 CFR 46.117 (Documentation of informed consent); 21 CFR 50.25 (FDA informed consent elements); 21 CFR 50.27; OHRP Guidance on Informed Consent (2024)',
  standards_of_creation = 'Consent documents at 8th-grade reading level per OHRP; required elements per 45 CFR 46.116; key information presentation per 2018 Common Rule revision 46.116(b)(1); broad consent per 46.116(d); short form consent with witness for non-English speakers',
  soc_controls = 'SOC 2 Type II CC6.1 (access controls for consent documents), CC2.3 (communication to participants); version control with IRB-stamped dates; eConsent platform validation per FDA Guidance on Electronic Consent (2016)'
WHERE name LIKE 'Informed Consent Coordinator%';

UPDATE citizen_catalog SET
  governing_guidelines = '45 CFR 164.508 (Authorization required); 45 CFR 164.512(i) (Research purposes); 45 CFR 164.514(e) (Limited data set); 45 CFR 46.116(c)(7)-(8); NIH Certificate of Confidentiality Policy Section 301(d) PHS Act',
  standards_of_creation = 'HIPAA research authorization forms (compound authorization prohibited per 164.508(b)(3)); waiver of authorization documentation per 164.512(i)(2); de-identification per 164.514; Certificate of Confidentiality issuance; limited data set agreements per 164.514(e)(4)',
  soc_controls = 'SOC 2 Type II CC6.5 (disposal of PHI), CC6.7 (restriction to authorized research uses); accounting of disclosures per 164.528; breach notification per 164.404-410; minimum necessary standard per 164.502(b)'
WHERE name LIKE 'Research Privacy Officer%';

UPDATE citizen_catalog SET
  governing_guidelines = '45 CFR 46 Subpart B (pregnant women, fetuses, neonates); Subpart C (prisoners); Subpart D (children); 21 CFR 50 Subpart D (FDA children protections); 45 CFR 46.111(b) (vulnerable populations)',
  standards_of_creation = 'Prisoner research category determination per 45 CFR 46.306(a)(2); parental permission and child assent per 46.408; pregnancy-specific risk assessment; LAR determinations per state law; capacity assessment documentation for cognitively impaired',
  soc_controls = 'SOC 2 Type II CC1.3 (oversight for vulnerable populations), CC3.4 (elevated risk assessment); prisoner representative on IRB per 46.304; enhanced monitoring for minimal-risk determinations involving children; re-consent triggers documented'
WHERE name LIKE 'Special Populations Research%';

UPDATE citizen_catalog SET
  governing_guidelines = '45 CFR 46.111(a)(3) (Equitable selection); FDA Guidance: Recruiting Study Subjects (1998/2014); OHRP Guidance on IRB Review of Research Involving Payment (2019); FTC Act § 5; NIH Inclusion Policy NOT-OD-18-014',
  standards_of_creation = 'IRB-approved recruitment materials; prorated payment/compensation schedules; inclusion/exclusion criteria justification; diversity enrollment tracking per NIH policy; ClinicalTrials.gov recruitment status updates',
  soc_controls = 'SOC 2 Type II CC2.2 (truthfulness of recruitment communications), CC7.2 (monitoring enrollment targets); pre-screening privacy documentation; social media recruitment audit trail'
WHERE name LIKE 'Recruitment%Retention%';

UPDATE citizen_catalog SET
  governing_guidelines = 'NIH Policy for Data and Safety Monitoring (1998/2000); FDA Guidance: Clinical Trial Data Monitoring Committees (2006); ICH E6(R2) GCP § 5.5.2; ICH E9 Statistical Principles; 21 CFR 312.32 (IND safety reporting)',
  standards_of_creation = 'DSMB charter with statistical analysis plan for interim analyses; closed and open session meeting minutes; interim safety reports with stopping boundary analyses; unblinding procedures and documentation',
  soc_controls = 'SOC 2 Type II CC6.1 (firewalled DSMB-only access to unblinded data), CC6.3 (segregation of blinded/unblinded data); independence documentation; secure data transfer protocols; sealed unblinding envelopes or electronic equivalent'
WHERE name LIKE 'DSMB%';

UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR 50.24 (Exception from informed consent for emergency research); FDA Guidance: Exception from Informed Consent for Emergency Research (2013); 45 CFR 46.101(i); community consultation per 21 CFR 50.24(a)(7)',
  standards_of_creation = 'Community consultation plans and execution documentation; public disclosure notices pre- and post-study; independent data monitoring committee documentation; family notification within therapeutic window; FDA/IRB notification within 5 business days',
  soc_controls = 'SOC 2 Type II CC7.4 (incident response in emergency settings), CC2.1 (public disclosure compliance); time-stamped consent exception documentation; independent physician concurrence; IND/IDE safety reporting within 24 hours'
WHERE name LIKE 'EFIC%';

-- A3: Research Data Integrity & Reporting

UPDATE citizen_catalog SET
  governing_guidelines = 'ICH E6(R2) Good Clinical Practice Guidelines §§ 4.1-4.13; 21 CFR 312 (IND); 21 CFR 812 (IDE); 21 CFR 11 (Electronic Records/Signatures); ACRP Certification Standards (CCRC)',
  standards_of_creation = 'Source document worksheets aligned to protocol visit schedules; Case Report Forms with source data verification; regulatory binder maintenance (1572 forms, financial disclosures, CVs); protocol deviation documentation',
  soc_controls = 'SOC 2 Type II CC6.1 (access to EDC systems), CC8.1 (change control for CRF modifications); 21 CFR Part 11 compliance for electronic signatures and audit trails; source document verification procedures; drug/device accountability logs'
WHERE name LIKE 'Clinical Research Coordinator%';

UPDATE citizen_catalog SET
  governing_guidelines = 'FDAAA 801 (42 U.S.C. § 282(j)); 42 CFR Part 11 (Clinical Trials Registration Final Rule 2016); ICMJE Statement on Registration; WHO ICTRP standards',
  standards_of_creation = 'Registration within 21 days of first enrollment; 40+ required data elements per 42 CFR 11.28; results reporting within 12 months of primary completion; adverse event summary tables per 42 CFR 11.48(a)(5)',
  soc_controls = 'SOC 2 Type II CC7.1 (monitoring registration deadlines), CC2.3 (public information accuracy); PRS account access controls; responsible party designation; civil monetary penalties tracking ($10,000/day per FDAAA)'
WHERE name LIKE 'ClinicalTrials.gov%';

UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR Part 11 (Electronic records/signatures); ICH E6(R2) GCP § 5.5; SCDM Good Clinical Data Management Practices v4; CDISC Standards (CDASH, SDTM, ADaM); FDA Guidance: Electronic Source Data (2013)',
  standards_of_creation = 'Database design specifications and validation rules; Data Management Plans with data flow diagrams; query management logs; database lock procedures; data transfer agreements with specifications',
  soc_controls = 'SOC 2 Type II CC6.1 (role-based EDC access), CC6.6 (audit trails for data modifications), CC8.1 (change management); complete audit trail for every data point change; backup and disaster recovery; validation documentation for computerized systems'
WHERE name LIKE 'Clinical Research Data Manager%';

UPDATE citizen_catalog SET
  governing_guidelines = '42 CFR Part 50 Subpart F (PHS Objectivity in Research); 45 CFR Part 94 (PHS Contractors); NSF Award Conditions Chapter IV; FDA 21 CFR 54 (Financial Disclosure by Clinical Investigators); AAMC/AAU COI Guidelines',
  standards_of_creation = 'Significant Financial Interest disclosure forms ($5,000 threshold); FCOI management plans with conditions/restrictions; FCOI reports to NIH (initial, annual, retrospective); investigator training every 4 years; public accessibility within 5 business days of request',
  soc_controls = 'SOC 2 Type II CC6.2 (restricted access to financial disclosures), CC1.3 (management oversight of COI review); conflict of interest committee documentation; retrospective review and corrective action; subrecipient FCOI monitoring'
WHERE name LIKE 'Conflict of Interest Officer%';

UPDATE citizen_catalog SET
  governing_guidelines = '42 CFR Part 93 (PHS Research Misconduct); 42 CFR 93.104 (fabrication, falsification, plagiarism); 42 CFR 93.300-93.318 (institution responsibilities); NSF 45 CFR 689; OSTP Policy on Research Misconduct (2000)',
  standards_of_creation = 'Allegation assessment documentation; sequestration of research data and documents; inquiry report within 60 days per 42 CFR 93.307; investigation report within 120 days per 93.310; respondent opportunity to comment; ORI notification within 24 hours if risk of harm',
  soc_controls = 'SOC 2 Type II CC6.2 (confidential access controls), CC7.4 (incident response); chain of custody for evidence; confidentiality protections for all parties; segregation of duties (RIO cannot serve as investigator)'
WHERE name LIKE 'Research Integrity Officer%';

-- A4: International & Community Research Ethics

UPDATE citizen_catalog SET
  governing_guidelines = 'Declaration of Helsinki (WMA 2013 paragraphs 1-37); CIOMS International Ethical Guidelines (2016); ICH E6(R2) GCP; Nuffield Council on Bioethics (2002); 45 CFR 46.101(h) (equivalent protections)',
  standards_of_creation = 'Country-specific regulatory approval documentation; local ethics committee review records; community engagement and benefit-sharing agreements; post-trial access plans; cultural adaptation and translation/back-translation certification',
  soc_controls = 'SOC 2 Type II CC9.2 (vendor/partner management for international sites), CC2.1 (cross-jurisdictional communication); dual review documentation (U.S. IRB + local ethics committee); export control compliance for biological materials; data sovereignty compliance'
WHERE name LIKE 'International Research Ethics%';

UPDATE citizen_catalog SET
  governing_guidelines = 'OHRP Guidance on Community-Based Participatory Research; NIH Community Engagement Principles (CTSA); PCORI Engagement Rubric; 21 CFR 50.24(a)(7)(i) (community consultation for EFIC); EPA Environmental Justice Model',
  standards_of_creation = 'CAB charter with membership criteria and terms; meeting agendas, minutes, and action items; community feedback incorporation documentation; plain-language research summaries; community benefit agreements and tracking',
  soc_controls = 'SOC 2 Type II CC2.2 (communication quality and accessibility), CC1.4 (competency of engagement); stipend/compensation documentation; accessibility compliance for meeting materials; grievance documentation and resolution tracking'
WHERE name = 'Community Engagement%' OR name LIKE '%CAB Coordinator%' OR name LIKE '%Community Advisory Board';

UPDATE citizen_catalog SET
  governing_guidelines = '42 U.S.C. § 241(d) (Authority for Certificates of Confidentiality); NIH Policy NOT-OD-17-109; Section 2012 of 21st Century Cures Act (automatic issuance for federally funded); 45 CFR 46.116(b)(2)',
  standards_of_creation = 'Certificate issuance documentation (automatic for NIH-funded, application-based for non-federal); participant notification language in consent; disclosure exceptions documentation; research staff training on CoC protections',
  soc_controls = 'SOC 2 Type II CC6.5 (protection of identifiable sensitive information), CC6.7 (restrictions on disclosure); legal response protocols for subpoenas; institutional CoC data handling policy; breach response for CoC-protected information'
WHERE name = 'Certificate of Confidentiality';

-- B1: Clinical Genetics & Genetic Counseling

UPDATE citizen_catalog SET
  governing_guidelines = 'ABGC Practice-Based Competencies (2019); ACGC Standards of Accreditation; NSGC Code of Ethics; State Genetic Counselor Licensure Acts (CA Bus. & Prof. Code § 2195-2199); GINA Title II 42 U.S.C. § 2000ff',
  standards_of_creation = 'Three-generation pedigree minimum; risk assessment using validated models (BRCAPRO, Tyrer-Cuzick, Penn II); pre-test and post-test counseling notes; variant interpretation per ACMG/AMP guidelines; referral documentation',
  soc_controls = 'SOC 2 Type II CC6.1 (access controls for genetic information), CC6.5 (disposal of genetic records); GINA compliance verification; continuing education (25 CEUs per 5-year cycle per ABGC); licensure renewal tracking'
WHERE name = 'Genetic Counselor%' AND name NOT LIKE '%Prenatal';

UPDATE citizen_catalog SET
  governing_guidelines = 'ACMG Standards and Guidelines for Clinical Genetics Laboratories; ACMG/AMP Variant Interpretation Standards (Richards et al. 2015); ACMG SF v3.2 Secondary Findings; ABMGG Certification Standards; CMS CLIA 42 CFR 493 Subpart M',
  standards_of_creation = 'Clinical genetics evaluation with dysmorphology assessment; genetic test ordering with clinical justification; variant interpretation per ACMG/AMP five-tier classification; ACMG secondary findings reporting (73 genes); lab selection criteria',
  soc_controls = 'SOC 2 Type II CC1.4 (board certification maintenance), CC6.1 (genetic data access); ABMGG MOC compliance; peer review of variant interpretations; quality assurance for test selection and results communication'
WHERE name LIKE 'Medical Geneticist%';

UPDATE citizen_catalog SET
  governing_guidelines = 'CPIC Guidelines (27+ gene-drug pairs); DPWG Guidelines; FDA Table of Pharmacogenomic Biomarkers in Drug Labeling; ACMG Policy Statement on Pharmacogenomic Testing; ASHP Guidelines on Pharmacogenomics Implementation',
  standards_of_creation = 'Pharmacogenomic test result interpretation with actionable recommendations; drug-gene interaction alerts in EHR; clinical decision support documentation; dose adjustment documentation based on metabolizer status; patient education materials',
  soc_controls = 'SOC 2 Type II CC6.1 (access to pharmacogenomic data in EHR), CC8.1 (change management for CDS rules); CPIC level of evidence documentation; alert fatigue monitoring and override documentation; integration validation with pharmacy systems'
WHERE name LIKE 'Pharmacogenomics%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Newborn Screening Saves Lives Reauthorization Act 42 U.S.C. § 300b; ACHDNC Recommended Uniform Screening Panel (37 core, 26 secondary conditions); ACMG ACT Sheets and Algorithms; State NBS Laws; CLSI NBS Standards (NBS01-03)',
  standards_of_creation = 'Specimen collection documentation (24-48 hours after birth); screening result reports; short-term follow-up tracking; long-term follow-up outcome documentation; residual dried blood spot policies; parent notification',
  soc_controls = 'SOC 2 Type II CC7.1 (critical results requiring immediate action), CC7.3 (escalation for positive screens); critical value reporting timelines; lost-to-follow-up tracking; opt-out documentation for states allowing refusal'
WHERE name = 'Newborn Screening';

UPDATE citizen_catalog SET
  governing_guidelines = 'ACOG Practice Bulletin No. 226 (Fetal Chromosomal Abnormalities 2020); ACMG/ACOG/NSGC/SMFM Joint Position on Expanded Carrier Screening (2021); ACOG Opinion No. 793 (Cell-Free DNA 2020); ISPD Guidelines; state prenatal consent laws',
  standards_of_creation = 'Pre-test counseling for screening vs. diagnostic testing; cfDNA screening results with limitations disclosure; amniocentesis/CVS consent and results; chromosomal microarray per ACMG guidelines; non-directive options counseling per NSGC Ethics',
  soc_controls = 'SOC 2 Type II CC2.2 (non-directive counseling documentation), CC6.1 (fetal genetic data access); informed consent for invasive procedures with risk quantification; clinically appropriate results disclosure; psychosocial referral documentation'
WHERE name LIKE 'Prenatal Genetic%';

UPDATE citizen_catalog SET
  governing_guidelines = 'ACMG/AMP/ASCO Somatic Variant Interpretation Standards (Li et al. 2017); NCCN Genetic/Familial High-Risk Assessment Guidelines; CAP/IASLC/AMP Molecular Testing Guideline; AMP Clinical Practice Guidelines; CMS Coverage Determinations for tumor genomic profiling',
  standards_of_creation = 'Tumor genomic profiling reports with 4-tier somatic variant classification; germline vs. somatic distinction; therapy recommendations tied to evidence levels (FDA-approved, clinical trial, off-label); molecular tumor board minutes; TMB and MSI reporting',
  soc_controls = 'SOC 2 Type II CC6.1 (access to genomic sequencing data), CC1.4 (board qualifications for interpretation); proficiency testing per CAP requirements; turnaround time monitoring; EHR integration validation for genomic results'
WHERE name = 'Tumor%' OR name LIKE '%Oncogenomics%' OR name LIKE '%Cancer Genomics';

-- B2: Genetic Data Privacy & Compliance

UPDATE citizen_catalog SET
  governing_guidelines = 'GINA Pub. L. 110-233 (2008); GINA Title I 42 U.S.C. § 2000ff (health insurance); GINA Title II 42 U.S.C. § 2000ff-1 through ff-11 (employment); 29 CFR 1635 (EEOC Final Regulations); HIPAA Privacy Rule amendments for genetic information',
  standards_of_creation = 'Employer safe harbor notices; wellness program genetic information exception documentation; inadvertent acquisition remediation; health plan underwriting restriction compliance; HR/benefits staff GINA training; complaint investigation documentation',
  soc_controls = 'SOC 2 Type II CC6.1 (access restrictions to genetic information in employment files), CC6.2 (separate storage per 29 CFR 1635.9); firewall between genetic information and employment decisions; insurance underwriting audit trail; remediation tracking'
WHERE name = 'GINA Compliance';

UPDATE citizen_catalog SET
  governing_guidelines = 'State genetic privacy laws (CA Cal. Civ. Code § 56.17; IL 410 ILCS 513; FL Stat. § 760.40); CalGINA (SB 41 2011); state biometric laws (IL BIPA 740 ILCS 14); CCPA/CPRA genetic data provisions Cal. Civ. Code § 1798.140(b)',
  standards_of_creation = 'State-by-state compliance matrices; consumer rights documentation (access, deletion, opt-out); DTC genetic testing company assessments; privacy impact assessments; state AG notification for genetic data breaches',
  soc_controls = 'SOC 2 Type II CC6.5 (genetic data disposal per state requirements), CC6.7 (jurisdictional compliance); multi-state regulatory tracking; consumer request response timelines; vendor assessment for third-party genetic data processors'
WHERE name = 'State Genetic Privacy';

UPDATE citizen_catalog SET
  governing_guidelines = 'NIH Genomic Data Sharing Policy NOT-OD-14-124; NIH GDS Institutional Certification; dbGaP Data Access Request procedures; GA4GH Framework for Responsible Sharing (2014); NIH Data Management and Sharing Policy (effective 1/25/2023)',
  standards_of_creation = 'Institutional Certification for GDS compliance; Genomic Summary Results vs. individual-level data sharing plans; Data Use Limitation coding; dbGaP Data Access Requests; Data Use Certification agreements; DMS Plans per 2023 policy',
  soc_controls = 'SOC 2 Type II CC6.6 (system boundary controls for genomic repositories), CC9.1 (risk management for data sharing); approved user tracking and annual recertification; data destruction certification; incident reporting for unauthorized access or re-identification'
WHERE name LIKE 'Genomic Data%Sharing%';

UPDATE citizen_catalog SET
  governing_guidelines = 'DNA Identification Act of 1994 42 U.S.C. § 14131-14134; FBI QAS for Forensic DNA Testing Laboratories (2020); FBI QAS for DNA Databasing Laboratories (2020); NDIS Operational Procedures Section 5; Rapid DNA Act of 2017 Pub. L. 115-50',
  standards_of_creation = 'DNA profile upload meeting NDIS acceptance criteria; chain of custody for samples; QA audit reports (annual external + semiannual internal); expungement request processing; familial DNA searching policy; Rapid DNA booking station compliance',
  soc_controls = 'SOC 2 Type II CC6.1 (CODIS terminal access), CC6.3 (role-based authorized CODIS users only); FBI CODIS audit every 2 years; ASCLD/ANAB accreditation maintenance; unauthorized access incident reporting to FBI CODIS Unit'
WHERE name LIKE 'CODIS%';

UPDATE citizen_catalog SET
  governing_guidelines = 'FTC Act § 5 (unfair/deceptive acts applied to DTC genetic claims); FDA Guidance: Direct-to-Consumer Tests; FTC Consent Decrees (1Health.io/Vitagene 2023); state DTC genetic testing laws; CCPA/CPRA (genetic data as sensitive PI, opt-in required)',
  standards_of_creation = 'Consumer consent documentation (specific, informed, revocable); privacy policy disclosures for genetic data retention/sharing/secondary use; de-identification documentation; law enforcement access policy; research opt-in/opt-out; data deletion verification',
  soc_controls = 'SOC 2 Type II CC6.5 (retention and deletion controls), CC2.3 (transparency of data practices); FTC consent decree compliance monitoring; third-party data sharing audit trail; re-identification risk assessments; account deletion verification'
WHERE name LIKE 'Direct-to-Consumer Genetic%';

-- B3: Gene Therapy & Advanced Genomics

UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR 312 (IND for gene therapy); 21 CFR 600/610 (Biologics); FDA Guidance: Long-Term Follow-Up After Gene Therapy (2020); FDA Guidance: CMC for Gene Therapy INDs (2020); NIH Guidelines for Recombinant Nucleic Acid (2019)',
  standards_of_creation = 'IND applications with gene therapy modules (product characterization, vector design, manufacturing); 15-year long-term follow-up protocols for integrating vectors; gene therapy-specific informed consent; annual IND reports; IBC review documentation',
  soc_controls = 'SOC 2 Type II CC6.1 (access to gene therapy manufacturing data), CC3.1 (risk assessment for novel therapies); BSL-2+ facility documentation; expedited adverse event reporting (15-day/7-day per 21 CFR 312.32); vector shedding data management'
WHERE name LIKE 'Gene Therapy%Regulatory%';

UPDATE citizen_catalog SET
  governing_guidelines = 'NIH Guidelines for Recombinant Nucleic Acid Molecules Section III; FDA Guidance: Human Gene Therapy Products Incorporating Genome Editing (2022); National Academies Human Genome Editing (2017); WHO Expert Advisory Committee (2021); Oviedo Convention',
  standards_of_creation = 'IBC registration and review for genome editing protocols; off-target analysis and mitigation; somatic vs. germline distinction documentation; enhanced informed consent (mosaicism, off-target effects); DURC assessment; guide RNA and delivery system specifications',
  soc_controls = 'SOC 2 Type II CC3.2 (risk identification for novel technologies), CC6.1 (access controls for editing protocols); IBC protocol registration and annual review; DURC institutional review; international export control for genome editing reagents'
WHERE name LIKE 'CRISPR%';

UPDATE citizen_catalog SET
  governing_guidelines = '42 CFR 493 (CLIA Laboratory Requirements); 42 CFR 493.1443-1495 (high-complexity testing personnel); CAP Laboratory Accreditation Checklists (Molecular Pathology, Cytogenetics); ACMG Standards for Clinical Genetics Laboratories; FDA LDT Final Rule (2024)',
  standards_of_creation = 'Test validation (analytical validity: sensitivity, specificity, precision); clinical validity evidence; SOPs for each assay; QC/QA documentation (daily QC, proficiency testing); CLIA-compliant test reports per 42 CFR 493.1291; variant classification per ACMG/AMP',
  soc_controls = 'SOC 2 Type II CC1.4 (lab director qualifications per 42 CFR 493.1443), CC7.1 (QC monitoring and deviation detection); CAP proficiency testing; biennial CLIA inspection readiness; equipment calibration logs; competency assessment (6-month and annual)'
WHERE name LIKE 'Genetic Testing Laboratory Director%';

UPDATE citizen_catalog SET
  governing_guidelines = 'ACMG Standards for mitochondrial DNA testing; ACMG/AMP Variant Interpretation Standards applied to mtDNA (heteroplasmy); MITOMAP database curation standards; 42 CFR 493 (CLIA high-complexity); ClinGen Mitochondrial Disease Expert Panel',
  standards_of_creation = 'Heteroplasmy quantification with tissue-specific considerations; maternal inheritance counseling documentation; nuclear gene vs. mtDNA testing strategy; whole mitochondrial genome sequencing reports; phenotype-genotype correlation',
  soc_controls = 'SOC 2 Type II CC1.4 (specialized expertise requirements), CC6.1 (access to mtDNA databases); proficiency testing for mtDNA variant calling; reference sample documentation and validation; tissue selection documentation (blood vs. muscle vs. urine)'
WHERE name LIKE 'Mitochondrial%';

-- C1: Organ Procurement & Allocation

UPDATE citizen_catalog SET
  governing_guidelines = '42 CFR 486 Subpart G (OPO Conditions for Coverage); 42 U.S.C. § 273 (National Organ Transplant Act); CMS OPO Final Rule (2021 outcome-based metrics); OPTN Final Rule 42 CFR Part 121; AOPO Standards',
  standards_of_creation = 'OPO certification/recertification every 4 years per CMS; organ yield performance metrics (donation rate, transplantation rate per 2021 rule); donor hospital development agreements; DCD protocol documentation; outcome data submissions',
  soc_controls = 'SOC 2 Type II CC1.1 (governance), CC3.1 (risk assessment for organ recovery), CC7.2 (performance monitoring against CMS metrics); CMS survey readiness; corrective action plans for failing metrics; conflict of interest per NOTA'
WHERE name LIKE 'OPO%Executive%';

UPDATE citizen_catalog SET
  governing_guidelines = '42 CFR Part 121 (OPTN Final Rule); OPTN Policies Section 5; 42 U.S.C. § 274 (OPTN); OPTN Policy 5.5 (Kidney KDPI/EPTS); Policy 5.3 (Lung LAS); Policy 5.6 (Liver MELD/PELD)',
  standards_of_creation = 'Match run documentation with allocation sequence; offer acceptance/refusal with reason codes; allocation exception documentation; organ-specific scoring (KDPI, EPTS, LAS, MELD/PELD, heart tiers); time-stamped DonorNet offer logs',
  soc_controls = 'SOC 2 Type II CC6.1 (DonorNet access controls), CC7.1 (monitoring allocation compliance); real-time organ tracking; OPTN policy deviation reporting; system downtime contingency procedures'
WHERE name LIKE 'Organ Allocation%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Revised Uniform Anatomical Gift Act (2006, 48+ states); state UAGA enactments; 42 CFR 482.45 (Hospital Conditions of Participation organ donation); CMS Interpretive Guidelines; OPTN Policy 2.0; first-person authorization/donor registry laws',
  standards_of_creation = 'Donor authorization forms with legally sufficient signatures per state UAGA; first-person authorization verification; next-of-kin hierarchy per state UAGA priority classes; medical examiner/coroner release; hospital notification compliance per 42 CFR 482.45',
  soc_controls = 'SOC 2 Type II CC2.1 (family communication documentation), CC6.1 (donor registry access); time-stamped referral and authorization process; state donor registry verification audit trail; sensitivity training documentation'
WHERE name LIKE 'Donor Authorization%';

UPDATE citizen_catalog SET
  governing_guidelines = 'OPTN Policies Chapter 2 (Deceased Donor Procurement); PHS Guideline for Reducing HIV/HBV/HCV Transmission (2020); OPTN Policy 2.4 (Blood Type); Policy 2.6 (Infectious Disease Screening); AOPO Standards; FDA 21 CFR 1271.50',
  standards_of_creation = 'Donor medical/social history questionnaire; infectious disease testing panels (NAT + serological per PHS); donor risk assessment designation (PHS increased risk vs. standard); organ-specific function assessment; hemodynamic management documentation',
  soc_controls = 'SOC 2 Type II CC7.1 (critical value reporting for donor labs), CC3.2 (risk identification for disease transmission); time-critical result protocols; PHS increased risk documentation and recipient consent; blood type two independent determinations per OPTN'
WHERE name = 'Donor Management Physician%' OR name LIKE '%OPO Medical Director%' OR name LIKE '%Donor Medical Evaluation';

UPDATE citizen_catalog SET
  governing_guidelines = 'OPTN Policy 16.0 (Organ Procurement and Preservation); OPTN Policy 5.0 (cold ischemia time); UNOS Organ Center procedures; DOT Hazardous Materials 49 CFR 173.134; FAA Advisory Circular on Transport of Organs',
  standards_of_creation = 'Organ packaging and labeling per OPTN; cold ischemia time tracking (cross-clamp to reperfusion); transportation itinerary with backup plans; machine perfusion parameters and monitoring; organ condition assessment at procurement and receipt; chain of custody OR to OR',
  soc_controls = 'SOC 2 Type II CC7.1 (monitoring transport conditions), CC7.3 (escalation for delays); GPS/tracking for organ shipments; temperature monitoring and logging; contingency procedures for transport failures'
WHERE name LIKE 'Organ Transport%';

UPDATE citizen_catalog SET
  governing_guidelines = 'CMS Conditions of Participation 42 CFR 482.98 (living donor requirements); OPTN Policies Chapter 14; OPTN Policy 14.3 (ILDA requirements); ASTS/AST Consensus on Living Organ Donation; OPTN Policy 14.2 (Informed Consent of Living Donors)',
  standards_of_creation = 'Independent psychosocial evaluation (separate from recipient team); medical evaluation per OPTN minimums; informed consent with all 14 OPTN-required elements per Policy 14.2; financial impact counseling; right to withdraw documentation; living donor follow-up (6mo, 1yr, 2yr)',
  soc_controls = 'SOC 2 Type II CC1.3 (independence from recipient team), CC2.1 (uncoerced consent verification); separation of living donor and recipient teams; coercion screening documentation; OPTN living donor follow-up compliance tracking'
WHERE name LIKE 'Living Donor Advocate%';

-- C2: Transplant Center Operations

UPDATE citizen_catalog SET
  governing_guidelines = '42 CFR 482.68-482.104 (CMS Conditions of Participation for Transplant Centers); 42 CFR 482.72 (OPTN membership); 42 CFR 482.80 (data submission); 42 CFR 482.82 (patient/living donor rights); OPTN Bylaws Appendix D; SRTR Program-Specific Reports',
  standards_of_creation = 'CMS certification/recertification documentation; QAPI program documentation; outcome data reports (1-year patient and graft survival vs. expected); corrective action for below-expected outcomes; program volume and activity reports',
  soc_controls = 'SOC 2 Type II CC1.1 (governance and oversight), CC7.2 (outcome monitoring and SRTR flag response); CMS survey readiness and corrective action tracking; SRTR flagging response documentation; peer review of transplant decision-making'
WHERE name = 'Transplant Program Director';

UPDATE citizen_catalog SET
  governing_guidelines = 'OPTN Bylaws Appendix D (primary transplant surgeon requirements); CMS 42 CFR 482.98(d) (surgeon qualifications); ASTS Fellowship Training Standards; OPTN Policy 14.4 (Living Donor Surgical Requirements); state medical licensure; ACS Standards',
  standards_of_creation = 'Operative reports with required elements (findings, procedure, specimens, complications); organ acceptance criteria documentation; back-table inspection at procurement; surgical informed consent with transplant-specific elements; Clavien-Dindo complication classification',
  soc_controls = 'SOC 2 Type II CC1.4 (credential verification per OPTN pathways), CC7.2 (outcome monitoring); surgical volume maintenance per OPTN; peer review of surgical outcomes; morbidity and mortality conference documentation'
WHERE name = 'Transplant Surgeon';

UPDATE citizen_catalog SET
  governing_guidelines = 'OPTN Bylaws Appendix D (primary transplant physician); CMS 42 CFR 482.98(e) (physician qualifications); organ-specific society guidelines (KDIGO, AASLD, ISHLT); OPTN Policies Chapter 3 (Candidate Waiting List); Policy 3.6 (Waiting time modification)',
  standards_of_creation = 'Pre-transplant evaluation per organ-specific protocols; transplant candidacy determination with selection committee minutes; waiting list registration (OPTN forms); post-transplant immunosuppression and monitoring; rejection episode documentation; long-term follow-up per OPTN',
  soc_controls = 'SOC 2 Type II CC1.4 (specialty qualifications per OPTN pathways), CC7.2 (patient outcome monitoring); selection committee documentation; waiting list status change justification; OPTN data submission compliance'
WHERE name = 'Transplant Nephrologist%' OR name LIKE '%Transplant Hepatologist%' OR name LIKE '%Transplant Cardiologist%' OR name LIKE '%Transplant Physician';

UPDATE citizen_catalog SET
  governing_guidelines = '42 CFR 482.98(f) (CMS psychosocial evaluation); OPTN Policy 14.3 (living donor psychosocial evaluation); NASW Standards for Health Care Settings; ASTS/AST Psychosocial Evaluation Guidelines; CMS Interpretive Guidelines; OPTN Policy 3.2',
  standards_of_creation = 'Psychosocial evaluation reports (substance use, mental health, social support, adherence risk); financial assessment; caregiver assessment; advance directive counseling; living donor psychosocial evaluation independent of recipient team; substance use treatment verification',
  soc_controls = 'SOC 2 Type II CC6.1 (access controls for psychosocial records), CC2.1 (communication of psychosocial concerns); licensure verification (state social work license); selection committee participation documentation; follow-up compliance tracking'
WHERE name = 'Transplant Social Worker';

UPDATE citizen_catalog SET
  governing_guidelines = 'CMS 42 CFR 482.94 (transplant-specific financial requirements); OPTN Policy 3.2 (insurance/financial review); Medicare Secondary Payer rules 42 CFR 411; ACA § 1557 (nondiscrimination); state Medicaid transplant coverage policies',
  standards_of_creation = 'Insurance verification and authorization (pre-transplant, transplant, post-transplant); Medicare/Medicaid eligibility determination; estimated cost disclosure; pharmaceutical assistance tracking; living donor expense reimbursement; financial hardship assessment',
  soc_controls = 'SOC 2 Type II CC6.1 (access to financial records), CC2.2 (transparent communication of financial obligations); non-discrimination documentation; insurance authorization timeline tracking; medication coverage gap identification and mitigation'
WHERE name = 'Transplant Financial';

UPDATE citizen_catalog SET
  governing_guidelines = 'ASHI Standards for Accredited Laboratories 7th ed.; 42 CFR 493 (CLIA Histocompatibility); OPTN Policy 4.0 (Histocompatibility Testing); OPTN Policy 4.6 (Crossmatch requirements); UNOS/OPTN CPRA algorithm; ASHI/CAP Proficiency Testing Standards',
  standards_of_creation = 'HLA typing reports (molecular/NGS); antibody screening and identification (Luminex single-antigen bead); virtual crossmatch assessment; physical crossmatch results (flow cytometry, CDC); CPRA calculation; unacceptable antigen listing for OPTN',
  soc_controls = 'SOC 2 Type II CC6.1 (HLA laboratory system access), CC7.1 (quality control for HLA testing); ASHI accreditation survey compliance; proficiency testing for HLA typing and antibody detection; crossmatch turnaround time monitoring'
WHERE name LIKE 'HLA Laboratory Director%';

UPDATE citizen_catalog SET
  governing_guidelines = 'CMS 42 CFR 482.25 (pharmacy services); KDIGO Clinical Practice Guideline for Kidney Transplant Recipients; AST/ASTS immunosuppression guidelines; ISHLT heart/lung immunosuppression guidelines; FDA REMS programs; USP Chapter 797/800',
  standards_of_creation = 'Immunosuppression protocol documentation (induction, maintenance, rejection treatment); drug level monitoring (tacrolimus, cyclosporine, sirolimus, MPA); drug interaction screening; medication therapy management; adherence assessment; biosimilar conversion documentation',
  soc_controls = 'SOC 2 Type II CC6.1 (access to medication records), CC7.1 (therapeutic drug monitoring alerts); REMS compliance documentation; critical value reporting for drug levels; medication error reporting and root cause analysis'
WHERE name LIKE 'Transplant%Pharmacist%';

-- C3: Tissue Banking & Specialized Transplantation

UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR 1271 (HCT/Ps); 21 CFR 1271.150 (Current Good Tissue Practice CGTP); 21 CFR 1271.45 (donor eligibility tissue); AATB Standards for Tissue Banking 15th ed.; state tissue banking licensure; FDA Guidance: Eligibility Determination for Donors (2007)',
  standards_of_creation = 'Tissue establishment registration (FDA Form 3356); donor eligibility per 21 CFR 1271.50; tissue processing and preservation records; QMS per CGTP 21 CFR 1271.150-1271.320; tissue tracking donor-to-recipient per 1271.290; adverse reaction reports per 1271.350',
  soc_controls = 'SOC 2 Type II CC6.1 (tissue tracking access), CC7.1 (quality monitoring and CAPA), CC8.1 (process change control); FDA biennial inspection readiness; AATB accreditation compliance; recall procedures; environmental monitoring of tissue storage'
WHERE name LIKE 'Tissue Bank Director%';

UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR 1271 (HCT/P requirements); FDA Guidance: Cord Blood Regulatory Framework (BLA vs. 361 pathway); FACT-NetCord International Standards; AABB Standards for Cellular Therapy; C.W. Bill Young Cell Transplantation Program; state cord blood disclosure laws',
  standards_of_creation = 'Maternal donor consent and medical history; collection documentation (volume, timing, method); processing records (volume reduction, cryopreservation); HLA typing and cell count characterization; storage and inventory management; BLA compliance for licensed units',
  soc_controls = 'SOC 2 Type II CC6.1 (inventory management access), CC7.1 (storage monitoring temperature alarms); FDA BLA inspection compliance; FACT accreditation survey readiness; cryogenic continuous temperature recording; product identity verification'
WHERE name = 'Cord Blood Bank';

UPDATE citizen_catalog SET
  governing_guidelines = 'EBAA Medical Standards (2023); EBAA Accreditation Standards; 21 CFR 1271 (HCT/P corneal tissue); FDA Guidance: Donor Eligibility for Corneal Tissue; UAGA eye/corneal provisions; state eye banking licensure',
  standards_of_creation = 'Corneal donor evaluation (slit-lamp specular microscopy, endothelial cell count); donor medical history and eligibility per EBAA Standards; tissue processing and preservation documentation; suitability determination; adverse reaction reporting to EBAA/FDA; distribution records',
  soc_controls = 'SOC 2 Type II CC6.1 (tissue tracking access), CC7.1 (quality monitoring cell count thresholds); EBAA accreditation every 3 years; FDA inspection readiness; environmental monitoring; recall and lookback investigation procedures'
WHERE name LIKE 'Eye Bank%';

UPDATE citizen_catalog SET
  governing_guidelines = 'OPTN Policy 13.0 (Kidney Paired Donation KPD); Policy 13.3 (KPD candidate eligibility); Policy 13.6 (non-directed living donor chains); Charlie W. Norwood Living Organ Donation Act Pub. L. 110-144; NOTA § 301 paired exchange exemption',
  standards_of_creation = 'KPD candidate and donor pair registration; compatibility analysis and match run documentation; multi-center coordination agreements; non-directed (altruistic) donor documentation; bridge donor documentation; shipping logistics for chain scenarios',
  soc_controls = 'SOC 2 Type II CC6.1 (KPD database access controls), CC7.1 (monitoring chain completion); chain break contingency documentation; multi-center communication protocols; OPTN KPD data submission compliance'
WHERE name LIKE 'Paired Kidney Exchange%';

UPDATE citizen_catalog SET
  governing_guidelines = 'NOTA § 301 42 U.S.C. § 274e (prohibition of organ sales); Declaration of Istanbul (2008/2018); WHO Guiding Principles on Organ Transplantation (2010); OPTN Policy 18.0; Trafficking Victims Protection Act 22 U.S.C. § 7101; UN Palermo Protocol',
  standards_of_creation = 'International transplant recipient evaluation (tourism screening); organ source verification for overseas transplants; suspicious activity reporting; institutional policy on evaluation/treatment of overseas transplant patients; compliance training; due diligence for international partnerships',
  soc_controls = 'SOC 2 Type II CC3.1 (risk assessment for organ trafficking), CC7.4 (incident reporting); staff training verification on trafficking indicators; mandatory reporting to law enforcement; international partnership audit procedures'
WHERE name LIKE 'Organ Trafficking%';

UPDATE citizen_catalog SET
  governing_guidelines = '42 U.S.C. § 274 (SRTR authorization); 42 CFR 121.11 (OPTN data requirements); SRTR Technical Methods; CMS 42 CFR 482.80 (data submission); SRTR Program-Specific Report methodology; OPTN MPSC review criteria',
  standards_of_creation = 'Program-Specific Reports generation and interpretation; risk-adjustment model documentation (Cox proportional hazards, competing risks); flagging criteria (p < 0.05); waiting list mortality and post-transplant survival analyses; organ acceptance rate patterns; living donor outcomes tracking',
  soc_controls = 'SOC 2 Type II CC7.2 (performance monitoring systems), CC6.6 (data transmission security to SRTR); OPTN data submission accuracy verification; MPSC performance review response documentation; data quality audits and corrections'
WHERE name LIKE 'SRTR%';

-- C4: Post-Transplant & Immunosuppression Management

UPDATE citizen_catalog SET
  governing_guidelines = 'AST Infectious Diseases Guidelines for Transplant Recipients; AST/IDSA Vaccination Guidelines for SOT Candidates/Recipients; PHS Guideline for Reducing HIV/HBV/HCV Transmission (2020); OPTN Policy 15.0 (DTAC reporting); OPTN Policy 2.9',
  standards_of_creation = 'Pre-transplant infectious disease screening (CMV, EBV, HIV, HBV, HCV, TB, endemic mycoses); post-transplant prophylaxis protocols (CMV, PJP, fungal); disease transmission event investigation reports; DTAC notification; vaccination records for immunosuppressed',
  soc_controls = 'SOC 2 Type II CC7.4 (incident response for disease transmission), CC7.1 (monitoring prophylaxis compliance); DTAC reporting compliance (24-hour for urgent); prophylaxis duration and de-escalation documentation; outbreak investigation procedures'
WHERE name = 'Transplant Infectious Disease';

UPDATE citizen_catalog SET
  governing_guidelines = 'Banff Classification of Renal Allograft Pathology (2022); ISHLT Standardized Cardiac Biopsy Grading (2004/2013); Banff Schema for Liver (RAI); CAP Protocol for Transplant Nephrectomy/Hepatectomy; ISHLT Lung Rejection Classification (2007); C4d/AMR classification',
  standards_of_creation = 'Protocol biopsy reports using standardized grading (Banff for kidney, ISHLT for heart); adequacy assessment (minimum tissue requirements); immunofluorescence/IHC results (C4d, SV40, BK); differential diagnosis (rejection vs. infection vs. recurrence); digital pathology documentation',
  soc_controls = 'SOC 2 Type II CC1.4 (specialty qualifications), CC7.1 (turnaround time often stat); peer review of rejection grading; proficiency testing for transplant pathology; correlation conferences between pathology and clinical teams'
WHERE name = 'Transplant Pathologist';

UPDATE citizen_catalog SET
  governing_guidelines = 'ITNS Core Competencies for Transplant Nurses; CMS 42 CFR 482.96 (patient/living donor follow-up); OPTN Policy 18.1 (post-transplant follow-up data collection); OPTN Bylaws (data submission timelines); ANA Standards of Nursing Practice; State Nurse Practice Acts',
  standards_of_creation = 'Post-transplant visit documentation (labs, vitals, medication review, adherence); OPTN follow-up form completion (6-month, annual, event-driven); patient education (medication management, infection prevention, cancer screening); adherence monitoring; transition of care documentation',
  soc_controls = 'SOC 2 Type II CC7.1 (monitoring follow-up compliance rates), CC7.3 (escalation for lost-to-follow-up); OPTN data submission compliance tracking; lost-to-follow-up recovery procedures; patient portal access audit trail'
WHERE name LIKE 'Transplant Nurse Coordinator%';

-- ============================================================
-- SECTION 2: DEFENSE CONTRACTING / IP / TECHNOLOGY
-- ============================================================

-- A1: Contract Formation & Administration

UPDATE citizen_catalog SET
  governing_guidelines = 'FAR 48 CFR Ch. 1; DFARS 48 CFR Ch. 2; ABA Model Rules 1.1 (Competence), 1.6 (Confidentiality), 1.13 (Organization as Client); Competition in Contracting Act 41 U.S.C. 3301-3308; Truth in Negotiations Act 10 U.S.C. 3701-3708',
  standards_of_creation = 'J.D. from ABA-accredited law school; bar admission; specialized FAR/DFARS procurement law knowledge; document retention per FAR 4.703 (6-year retention)',
  soc_controls = 'SOC 2 CC6.1 (access control to classified contract data); CC2.3 (confidentiality commitments); document retention per FAR 4.703; attorney-client privilege documentation; conflict screening records'
WHERE name = 'Government Contracts Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = 'FAR Part 1.602 (CO Authority); DFARS 201.602; DoD Instruction 5000.72 (COR Certification); FAR Part 42 (Contract Administration); OMB Circular A-123 (Enterprise Risk Management)',
  standards_of_creation = 'FAC-C certification (Federal Acquisition Certification in Contracting); DAU courses (CON 090, 100, 200, 360); minimum education/experience per FAR 1.603',
  soc_controls = 'SOC 2 CC5.1 (segregation of duties); CC6.1 (authorization controls for contract modifications); CC7.2 (audit trail for contract actions)'
WHERE name = 'Contracting Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'FAR Parts 5-6 (Publicizing/Competition); FAR Part 15 (Contracting by Negotiation); FAR Part 19 (Small Business Programs); Small Business Act 15 U.S.C. 631 et seq.; NCMA CMBOK',
  standards_of_creation = 'FAC-C or NCMA Certified Federal Contracts Manager (CFCM); bachelor''s degree; 24 semester hours business disciplines per FAR 1.603-1',
  soc_controls = 'SOC 2 CC7.1 (source selection documentation integrity); CC7.2 (bid evaluation audit trails); CC4.1 (small business compliance monitoring)'
WHERE name LIKE 'Government Contracts Specialist%';

-- A2: Cost Accounting & Financial

UPDATE citizen_catalog SET
  governing_guidelines = 'DCAA Contract Audit Manual DoD 7640.02; Cost Accounting Standards 48 CFR Ch. 99; FAR Part 31 (Cost Principles); FAR Part 30 (CAS Administration); GAGAS/Yellow Book GAO-21-368G; TINA 10 U.S.C. 3701',
  standards_of_creation = 'Bachelor''s in accounting/finance; CPA preferred; DCAA-specific training; GAGAS independence standards compliance',
  soc_controls = 'SOC 2 CC1.3 (auditor independence); CC7.1 (working paper integrity); evidence retention per DCAM 4-300; CC7.2 (sampling methodology documentation)'
WHERE name LIKE 'Defense Contract Auditor%';

UPDATE citizen_catalog SET
  governing_guidelines = 'FAR Part 15.4 (Contract Pricing); FAR Table 15-2; DFARS 215.404 (Weighted Guidelines); CAS 401-420; DoD Contract Pricing Reference Guides Volumes 1-5',
  standards_of_creation = 'Certified Cost Estimator/Analyst (CCEA) from ICA or equivalent; DAU coursework (BCF 103, BCF 206); bachelor''s in quantitative discipline',
  soc_controls = 'SOC 2 CC7.1 (cost data validation); CC7.2 (proposal adequacy review documentation); CC4.1 (defective pricing analysis records)'
WHERE name = 'Cost%Price Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'AICPA Professional Standards (AU-C Sections); GAGAS GAO-21-368G; CAS 401-420; FAR Part 31; Sarbanes-Oxley Act 15 U.S.C. 7201 et seq.; AICPA Code of Professional Conduct ET Sections 1.100-1.700',
  standards_of_creation = 'CPA license; 150 credit hours; uniform CPA exam; continuing education per state; GAGAS CPE (24 hours/year government-specific)',
  soc_controls = 'SOC 2 CC7.1 (financial statement integrity); CC5.2 (internal control assessment); CC1.3 (independence documentation); CC7.3 (engagement quality review)'
WHERE name = 'Certified Public Accountant%Government Contractor';

-- A3: Security & Clearance

UPDATE citizen_catalog SET
  governing_guidelines = 'NISPOM 32 CFR Part 117; DoD Manual 5220.22-M; Executive Order 13526 (Classified National Security Information); ICD 705 (SCIF Standards); DCSA Industrial Security Letters',
  standards_of_creation = 'FSO certification through DCSA (IS011.16, IS030.CU); U.S. citizenship; active security clearance; NISPOM training completion',
  soc_controls = 'SOC 2 CC6.1-CC6.4 (classified information access, visitor control, security container management); CC6.6 (visitor control); CC7.3 (security incident reporting)'
WHERE name = 'Facility Security Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'NISPOM 32 CFR Part 117; Executive Order 12968 (Access to Classified Information); 5 CFR Part 731 (Suitability); SEAD 4 (Adjudicative Guidelines); ASIS International Standards (PSC.1, SPC.1)',
  standards_of_creation = 'Industrial Security Professional (ISP) from DCSA; Certified Protection Professional (CPP) from ASIS; bachelor''s preferred',
  soc_controls = 'SOC 2 CC6.1 (personnel security processing); CC6.2 (access determination documentation); CC4.1 (continuous evaluation monitoring); CC7.3 (adverse information reporting)'
WHERE name = 'Industrial Security Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'ICD 704 (Personnel Security Standards); ICD 705 (SCIF Standards); ICD 503 (IC IT Systems Security); DCID 6/4 (SCI Access); DoD Manual 5105.21 Vol. 3 (SCI Administrative Security)',
  standards_of_creation = 'TS/SCI clearance; SSO training per DNI standards; U.S. citizenship; specialized briefing/debriefing qualifications',
  soc_controls = 'SOC 2 CC6.1 (SCI access management); CC6.4 (SCIF physical security); CC6.2 (indoctrination/debriefing records); CC7.3 (foreign contact reporting)'
WHERE name = 'Special Security Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'SEAD 4 (13 adjudicative criteria); Executive Order 13467 (Suitability/Security Processes); 5 CFR Part 731 (Suitability); Federal Investigative Standards; Continuous Vetting SEAD 6',
  standards_of_creation = 'DCSA adjudicator training; U.S. citizenship; security clearance; adjudicative coursework completion; whole-person evaluation methodology',
  soc_controls = 'SOC 2 CC7.1 (background investigation review); CC7.2 (adjudicative decision documentation); CC2.2 (due process notification); CC7.3 (appeal record management)'
WHERE name LIKE 'Personnel Security Specialist%';

-- A4: Export Controls & International Trade

UPDATE citizen_catalog SET
  governing_guidelines = 'ITAR 22 CFR Parts 120-130; Arms Export Control Act 22 U.S.C. 2751 et seq.; USML 22 CFR Part 121; DDTC Guidelines for Preparing Agreements; DoD Instruction 2040.02 (International Transfers)',
  standards_of_creation = 'Bachelor''s minimum; ITAR-specific training (SIA, DTSA); U.S. Person per 22 CFR 120.62; company empowered official designation',
  soc_controls = 'SOC 2 CC6.1 (technology transfer authorization); CC6.3 (deemed export monitoring); CC4.1 (end-use monitoring); CC7.3 (violation self-disclosure documentation)'
WHERE name = 'ITAR Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'EAR 15 CFR Parts 730-774; Commerce Control List 15 CFR Part 774 Supplement 1; Entity List 15 CFR Part 744 Supplement 4; Denied Persons List 15 CFR Part 764 Supplement 2; EAR Part 762 (5-year recordkeeping)',
  standards_of_creation = 'Certified U.S. Export Compliance Officer (CUSECO) or equivalent; BIS training; ECCN classification knowledge; bachelor''s degree',
  soc_controls = 'SOC 2 CC7.1 (export classification records); CC7.2 (license determination documentation); CC6.1 (denied party screening); CC6.3 (deemed export controls)'
WHERE name = 'EAR%Export Compliance';

UPDATE citizen_catalog SET
  governing_guidelines = 'Customs Modernization Act 19 U.S.C. 1484; Trade Agreements Act 19 U.S.C. 2501 et seq.; FAR 25.4 (Trade Agreements); DFARS 225 (Foreign Acquisition); C-TPAT Standards',
  standards_of_creation = 'Licensed Customs Broker (LCB) or Certified Customs Specialist (CCS); CBP examination; specialized trade compliance training',
  soc_controls = 'SOC 2 CC7.1 (country of origin records); CC7.2 (trade agreement compliance); CC4.1 (import/export record retention); CC6.1 (sanctions screening)'
WHERE name = 'Customs%Trade Compliance';

-- A5: Quality Assurance & Technical

UPDATE citizen_catalog SET
  governing_guidelines = 'DCMA Manual 2301-01 (Quality Assurance); MIL-STD-1916; AS9100 (Aerospace QMS); ISO 9001:2015; FAR Part 46; DFARS 246 (Quality Assurance)',
  standards_of_creation = 'DCMA-specific QA training; ASQ certifications (CQA, CQE) preferred; engineering/technical degree; government inspection authority',
  soc_controls = 'SOC 2 CC7.1 (inspection and acceptance documentation); CC7.2 (nonconformance tracking); CC4.1 (corrective action verification); CC7.3 (product acceptance records)'
WHERE name LIKE 'DCMA Quality Assurance%';

UPDATE citizen_catalog SET
  governing_guidelines = 'CMMC 2.0 Framework 32 CFR Part 170; NIST SP 800-171 Rev. 2; NIST SP 800-172 (Enhanced CUI); DFARS 252.204-7012 (Safeguarding Covered Defense Information); DFARS 252.204-7019/7020/7021 (CMMC Assessment)',
  standards_of_creation = 'CMMC Certified Assessor (CCA) from Cyber AB; CAICO training; background check; no organizational conflict of interest; annual renewal',
  soc_controls = 'SOC 2 CC6.1 (CUI handling); CC6.2 (access control verification); CC7.3 (incident response plan review); CC7.1 (system security plan evaluation)'
WHERE name LIKE 'CMMC Assessor%';

UPDATE citizen_catalog SET
  governing_guidelines = 'DoD Instruction 5000.02 (Adaptive Acquisition Framework); MIL-STD-881F (WBS); ISO/IEC/IEEE 15288:2015 (Systems Life Cycle); INCOSE Systems Engineering Handbook; DoDAF 2.02',
  standards_of_creation = 'INCOSE Certified Systems Engineering Professional (CSEP); DAU ENG certification; bachelor''s in engineering; security clearance as required',
  soc_controls = 'SOC 2 CC8.1 (configuration management); CC7.2 (change control documentation); CC7.1 (technical review records); CC7.3 (system requirements traceability)'
WHERE name = 'Systems Engineer%Defense';

-- A6: Military Personnel & Veterans

UPDATE citizen_catalog SET
  governing_guidelines = '10 U.S.C. 1506 (Personnel Files); 36 CFR Part 1228 (Federal Records Disposition); DoD Instruction 1336.01 (DD-214); Privacy Act 5 U.S.C. 552a; AR 600-8-104 (Army Personnel Records)',
  standards_of_creation = 'Federal service training; NPRC certification; background investigation; CRM from ICRM preferred',
  soc_controls = 'SOC 2 CC6.5 (PII protection); CC6.1 (records access authorization); CC7.2 (modification audit trails); CC4.1 (retention schedule compliance)'
WHERE name = 'Military Records Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = '38 U.S.C. (Veterans Benefits); 38 CFR Parts 3, 4, 19, 20 (VA Adjudication/Appeals); VA M21-1 (Adjudication Procedures Manual); CAVC Rules of Practice; VA accreditation 38 CFR 14.629',
  standards_of_creation = 'J.D. + bar admission (attorneys); VA accreditation; CLE in veterans law; CAVC bar admission for appeals',
  soc_controls = 'SOC 2 CC6.5 (claims file confidentiality); CC7.2 (evidence submission tracking); CC4.1 (appeal deadline management); CC7.1 (fiduciary documentation)'
WHERE name LIKE 'Veterans Benefits Attorney%';

UPDATE citizen_catalog SET
  governing_guidelines = 'UCMJ 10 U.S.C. 801-946a; Manual for Courts-Martial (Executive Order); Rules for Courts-Martial; Military Rules of Evidence; AR 27-10/JAGMAN/AFI 51-201',
  standards_of_creation = 'J.D. from ABA-accredited law school; bar admission; JAG commission (military) or civilian authorization; security clearance',
  soc_controls = 'SOC 2 CC6.1 (classified evidence handling); CC6.5 (attorney-client privilege); CC7.1 (chain of custody); CC7.2 (appellate record integrity)'
WHERE name LIKE 'Military Justice Attorney%';

UPDATE citizen_catalog SET
  governing_guidelines = 'HIPAA 45 CFR Parts 160, 164; DoD Instruction 6040.45 (Service Treatment Record); AR 40-66 (Medical Record Administration); 10 U.S.C. 1071-1110b (TRICARE); 38 CFR Part 17 (VA Medical Benefits)',
  standards_of_creation = 'RHIA or RHIT certification (AHIMA); military-specific medical records training; HIPAA compliance training; security clearance as required',
  soc_controls = 'SOC 2 CC6.1, CC6.5 (PHI access controls); CC7.2 (medical record amendment procedures); CC6.3 (minimum necessary compliance); CC7.3 (breach notification protocols)'
WHERE name = 'Military Medical Records';

-- A7: Specialized Defense

UPDATE citizen_catalog SET
  governing_guidelines = 'Arms Export Control Act 22 U.S.C. 2751 et seq.; Foreign Assistance Act 22 U.S.C. 2151 et seq.; SAMM DSCA Manual 5105.38-M; DoD Instruction 5132.14 (Security Cooperation); ITAR 22 CFR 120-130',
  standards_of_creation = 'DSCA training (SC-101 through SC-400); DAU international acquisition certification; security clearance; program management experience',
  soc_controls = 'SOC 2 CC4.1 (end-use monitoring); CC7.1 (offset agreement tracking); CC7.2 (congressional notification records); CC6.1 (technology transfer controls)'
WHERE name = 'Foreign Military Sales';

UPDATE citizen_catalog SET
  governing_guidelines = 'FAR Subpart 9.5 (Organizational Conflicts of Interest); DFARS 209.571 (OCI in MDAPs); FAR 3.104 (Procurement Integrity Act 41 U.S.C. 2101-2107); GAO Bid Protest Decisions (OCI case law)',
  standards_of_creation = 'Government contracts background; legal or compliance degree; OCI-specific training; mitigation plan development understanding',
  soc_controls = 'SOC 2 CC7.1 (OCI screening documentation); CC7.2 (mitigation plan records); CC1.3 (recusal documentation); CC4.1 (subcontractor OCI flow-down verification)'
WHERE name LIKE 'Organizational Conflict of Interest%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Small Business Act 15 U.S.C. 631 et seq.; FAR Part 19; DFARS Part 219; 13 CFR Parts 121, 124, 125, 126, 127 (SBA Size/Programs); DoD Instruction 4205.01',
  standards_of_creation = 'SBA training; FAR/DFARS small business certification; DAU CON 260; understanding of 8(a), HUBZone, SDVOSB, WOSB programs',
  soc_controls = 'SOC 2 CC4.1 (subcontracting plan compliance monitoring); CC7.1 (good faith effort documentation); CC7.2 (ISR/SSR reporting accuracy); CC7.3 (mentor-protege agreement records)'
WHERE name LIKE 'Small Business Liaison%';

UPDATE citizen_catalog SET
  governing_guidelines = 'FAR Part 42.15 (Contractor Performance Information); DFARS 242.15; CPARS Guidance for Assessing Agencies v2.0; FAR 42.1502; OMB Memoranda on Past Performance',
  standards_of_creation = 'Contracting or program management background; CPARS system training; Assessing Official Representative (AOR) designation; evaluation criteria understanding',
  soc_controls = 'SOC 2 CC1.3 (evaluation objectivity); CC2.2 (contractor response period tracking); CC7.1 (narrative substantiation); CC7.2 (review chain documentation)'
WHERE name = 'CPARS';

-- B1: Patent Law

UPDATE citizen_catalog SET
  governing_guidelines = '35 U.S.C. 101-103 (Patentability), 112 (Specification), 131-135 (Examination); 37 CFR Parts 1, 11, 42; MPEP; ABA Model Rules; USPTO Rules 37 CFR 11.101-11.804',
  standards_of_creation = 'J.D. from ABA-accredited law school; state bar admission; USPTO registration (Patent Bar 37 CFR 11.7); technical degree in science/engineering',
  soc_controls = 'SOC 2 CC7.1 (inventor declaration verification); CC7.2 (prior art search documentation); CC1.3 (duty of disclosure per 37 CFR 1.56); CC7.3 (prosecution history integrity)'
WHERE name = 'Patent Attorney%Prosecution';

UPDATE citizen_catalog SET
  governing_guidelines = '35 U.S.C. (Patent Act); 37 CFR Part 11 (Representation Before USPTO); MPEP; USPTO Rules 37 CFR 11.101-11.804; Patent Cooperation Treaty Rules',
  standards_of_creation = 'USPTO registration (Patent Bar); bachelor''s in recognized technical subject per 37 CFR 11.7(b); continuing education',
  soc_controls = 'SOC 2 CC1.1 (scope limitation documentation); CC6.5 (client file management); CC4.1 (docketing system controls)'
WHERE name = 'Patent Agent';

UPDATE citizen_catalog SET
  governing_guidelines = '35 U.S.C. 101-103, 112, 131-135; MPEP; Patent Examination Guidelines; Alice/Mayo Framework (101 eligibility); KSR International v. Teleflex (obviousness)',
  standards_of_creation = 'Bachelor''s in relevant technical field; USPTO training academy completion; GS-scale employment; art unit specialization',
  soc_controls = 'SOC 2 CC7.1 (prior art search methodology); CC7.2 (office action consistency); CC7.3 (interference/derivation records); CC4.1 (pendency tracking)'
WHERE name = 'Patent Examiner';

UPDATE citizen_catalog SET
  governing_guidelines = '35 U.S.C. 271-299 (Infringement); Federal Rules of Civil Procedure; Federal Circuit Rules; Local Patent Rules (N.D. Cal., E.D. Tex., D. Del., W.D. Tex.); Markman v. Westview; 35 U.S.C. 284-285 (Damages, Exceptional Cases)',
  standards_of_creation = 'J.D.; state bar admission; Federal Circuit bar admission; technical background preferred; patent litigation experience',
  soc_controls = 'SOC 2 CC6.5 (protective order compliance); CC7.1 (claim construction record integrity); CC7.2 (damages model documentation); CC6.1 (e-discovery controls)'
WHERE name = 'Patent Litigation Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = 'ASA Business Valuation Standards; IRS Revenue Ruling 59-60; FASB ASC 805 (Business Combinations intangible asset valuation); FASB ASC 350 (Intangibles); USPAP; Georgia-Pacific 15-factor royalty test',
  standards_of_creation = 'ASA Accredited Senior Appraiser; CFA or CPA preferred; specialized IP valuation training; USPAP compliance',
  soc_controls = 'SOC 2 CC7.1 (valuation methodology documentation); CC7.2 (comparable transaction analysis); CC1.3 (independence certification); CC7.3 (market data source verification)'
WHERE name = 'Patent Valuation';

UPDATE citizen_catalog SET
  governing_guidelines = 'Patent Cooperation Treaty (WIPO); PCT Administrative Instructions; PCT Applicant''s Guide; European Patent Convention Articles 52-57, 75-95; Paris Convention; Hague Agreement',
  standards_of_creation = 'USPTO registration plus PCT filing experience; European Patent Attorney qualification optional; foreign filing license compliance knowledge',
  soc_controls = 'SOC 2 CC4.1 (priority date management); CC7.2 (national phase deadline tracking); CC6.1 (foreign filing license compliance); CC7.1 (translation accuracy verification)'
WHERE name LIKE 'International Patent Specialist%';

-- B2: Trademark Law

UPDATE citizen_catalog SET
  governing_guidelines = 'Lanham Act 15 U.S.C. 1051-1141n; 37 CFR Part 2 (Trademark Rules); TMEP (Trademark Manual of Examining Procedure); Nice Agreement; ABA Model Rules',
  standards_of_creation = 'J.D.; state bar admission; trademark prosecution experience; USPTO e-filing proficiency',
  soc_controls = 'SOC 2 CC7.1 (specimen adequacy review); CC7.2 (likelihood of confusion analysis); CC7.3 (declaration verification); CC4.1 (renewal deadline management)'
WHERE name = 'Trademark Attorney%Prosecution';

UPDATE citizen_catalog SET
  governing_guidelines = '15 U.S.C. 1063 (Opposition), 1064 (Cancellation), 1068 (TTAB Authority); TBMP (Trademark Board Manual of Procedure); 37 CFR Part 2 Subpart D; Federal Rules of Evidence as applied in TTAB',
  standards_of_creation = 'J.D.; bar admission; TTAB litigation experience; discovery understanding in TTAB proceedings',
  soc_controls = 'SOC 2 CC4.1 (filing deadline management); CC7.1 (discovery response documentation); CC7.2 (trial evidence integrity); CC7.3 (settlement agreement records)'
WHERE name = 'TTAB%Practitioner';

UPDATE citizen_catalog SET
  governing_guidelines = 'Madrid Protocol; Madrid Agreement Concerning International Registration of Marks; Common Regulations Under Madrid; WIPO Guide to International Registration; Nice Classification 12th ed.',
  standards_of_creation = 'J.D. or equivalent foreign qualification; Madrid Protocol filing experience; WIPO Madrid System training; multi-jurisdictional trademark knowledge',
  soc_controls = 'SOC 2 CC4.1 (basic mark dependency monitoring); CC7.2 (designation acceptance tracking); CC7.1 (renewal centralization); CC7.3 (scope of protection documentation)'
WHERE name LIKE 'International Trademark%';

-- B3: Copyright & Digital Rights

UPDATE citizen_catalog SET
  governing_guidelines = 'Copyright Act 17 U.S.C. 101-1401; Copyright Office Regulations 37 CFR Parts 201-204; Compendium of Copyright Office Practices 3rd ed.; DMCA 17 U.S.C. 512, 1201-1205; Berne Convention',
  standards_of_creation = 'J.D.; state bar admission; copyright law specialization; Copyright Office registration filing experience',
  soc_controls = 'SOC 2 CC7.1 (registration application accuracy); CC6.4 (work deposit management); CC7.2 (licensing term documentation); CC7.3 (infringement evidence preservation)'
WHERE name = 'Copyright Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = 'DMCA 17 U.S.C. 512 (Safe Harbor); 17 U.S.C. 512(c)(2) (Designated Agent); Copyright Claims Board Rules 37 CFR Part 232; EU Digital Services Act Regulation 2022/2065; EU Copyright Directive 2019/790 Article 17',
  standards_of_creation = 'DMCA compliance training; designated agent registration with Copyright Office; content moderation policy development experience',
  soc_controls = 'SOC 2 CC7.1 (takedown processing); CC7.2 (counter-notification tracking); CC4.1 (repeat infringer policy); CC7.3 (safe harbor compliance records)'
WHERE name LIKE 'DMCA%';

-- B4: Trade Secrets & Confidential Info

UPDATE citizen_catalog SET
  governing_guidelines = 'Defend Trade Secrets Act 18 U.S.C. 1836-1839; Uniform Trade Secrets Act (state adoptions); Economic Espionage Act 18 U.S.C. 1831-1832; Restatement (Third) Unfair Competition §§ 39-45; ITC Section 337',
  standards_of_creation = 'J.D.; state bar admission; trade secret litigation experience; understanding of reasonable measures requirements',
  soc_controls = 'SOC 2 CC7.1 (trade secret identification/cataloging); CC6.1 (reasonable measures documentation); CC6.2 (access restriction records); CC7.3 (exit interview/departure protocols)'
WHERE name = 'Trade Secret Counsel';

UPDATE citizen_catalog SET
  governing_guidelines = 'State contract law (Restatement (Second) of Contracts); DTSA 18 U.S.C. 1836 (whistleblower immunity notice requirement); Uniform Trade Secrets Act; FTC guidance on non-compete/NDA limitations; SEC Regulation FD (public company NDAs)',
  standards_of_creation = 'J.D. (for drafting); paralegal certification (for management); NCMA contract management certification; NDA template library maintenance',
  soc_controls = 'SOC 2 CC7.1 (NDA execution tracking); CC4.1 (expiration/renewal monitoring); CC7.2 (scope limitation documentation); CC7.3 (breach notification procedures)'
WHERE name = 'NDA%Confidentiality Agreement';

-- B5: IP Licensing & Transactions

UPDATE citizen_catalog SET
  governing_guidelines = '35 U.S.C. 261 (Patent Assignment); 15 U.S.C. 1060 (Trademark Assignment); 17 U.S.C. 201-205 (Copyright Transfer); UCC Article 9 (security interests in IP); DOJ/FTC Antitrust Guidelines for IP Licensing; LES Licensing Fundamentals',
  standards_of_creation = 'J.D.; state bar admission; IP transaction experience; Certified Licensing Professional (CLP) optional; LES membership',
  soc_controls = 'SOC 2 CC7.1 (assignment recordation verification); CC7.2 (royalty calculation audit trails); CC4.1 (sublicense tracking); CC7.3 (termination clause monitoring)'
WHERE name LIKE 'IP Licensing Attorney%';

UPDATE citizen_catalog SET
  governing_guidelines = 'AICPA Attestation Standards (AT-C Sections); FASB ASC 606 (Revenue from Contracts); FASB ASC 842 (Leases embedded IP licenses); license agreement audit rights clauses; IRS Transfer Pricing Rules 26 U.S.C. 482; Treasury Reg. 1.482',
  standards_of_creation = 'CPA license; royalty audit experience; understanding of IP license structures; forensic accounting skills preferred',
  soc_controls = 'SOC 2 CC7.1 (royalty calculation verification); CC7.2 (sales reporting accuracy testing); CC4.1 (underpayment detection); CC7.3 (audit rights enforcement documentation)'
WHERE name = 'IP Royalty Auditor';

UPDATE citizen_catalog SET
  governing_guidelines = 'State insurance regulations; AIPLA Guidelines for IP Insurance; Lloyd''s IP Insurance Frameworks; FASB ASC 944 (Financial Services Insurance); IP insurance policy forms (defense cost, abatement, pursuit/enforcement)',
  standards_of_creation = 'Insurance licensing (state-specific); Chartered Property Casualty Underwriter (CPCU) or equivalent; IP litigation knowledge; claims adjustment experience',
  soc_controls = 'SOC 2 CC7.1 (policy coverage documentation); CC7.2 (claims processing records); CC7.3 (coverage determination analysis); CC4.1 (premium calculation verification)'
WHERE name = 'IP Insurance';

-- B6: IP Disputes & Enforcement

UPDATE citizen_catalog SET
  governing_guidelines = '35 U.S.C. 311-319 (Inter Partes Review); 37 CFR Part 42 Subpart B; PTAB Trial Practice Guide; Fintiv factors (NHK-Fintiv); Federal Circuit precedent on IPR',
  standards_of_creation = 'USPTO registration (Patent Bar); J.D. preferred; PTAB trial experience; technical expertise in relevant art',
  soc_controls = 'SOC 2 CC4.1 (petition filing deadline management); CC7.1 (claim chart accuracy); CC7.2 (expert declaration integrity); CC7.3 (settlement agreement records)'
WHERE name LIKE 'Inter Partes Review%';

UPDATE citizen_catalog SET
  governing_guidelines = 'ICANN Uniform Domain-Name Dispute-Resolution Policy; UDRP Rules of Procedure; WIPO UDRP Overview 3.0; Uniform Rapid Suspension System; Anti-Cybersquatting Consumer Protection Act 15 U.S.C. 1125(d)',
  standards_of_creation = 'J.D. or equivalent; WIPO-panelist certification (for panelists); domain name dispute resolution experience; trademark law background',
  soc_controls = 'SOC 2 CC7.1 (complaint filing documentation); CC7.2 (respondent notification tracking); CC7.3 (panel decision compliance); CC4.1 (registrar transfer verification)'
WHERE name LIKE 'Domain Name Dispute%';

-- B7: Open Source & Software IP

UPDATE citizen_catalog SET
  governing_guidelines = 'Open Source Definition (OSD); GNU GPL v2, v3; Apache License 2.0; MIT License, BSD Licenses; OpenChain Specification ISO/IEC 5230:2020; SPDX Specification ISO/IEC 5962:2021',
  standards_of_creation = 'J.D. (for attorneys); OpenChain Conformance certification; software development background; SBOM expertise',
  soc_controls = 'SOC 2 CC7.1 (license compatibility analysis); CC7.2 (SBOM generation and verification); CC4.1 (copyleft obligation tracking); CC7.3 (contribution agreement management)'
WHERE name = 'Open Source Compliance';

UPDATE citizen_catalog SET
  governing_guidelines = '35 U.S.C. 271 (Infringement); Doctrine of Equivalents case law; Prosecution History Estoppel; MPEP Chapter 2100 (Patentability); WIPO patent landscape analysis guidelines',
  standards_of_creation = 'USPTO registration preferred; technical degree; patent search expertise; claim interpretation training; FTO report drafting experience',
  soc_controls = 'SOC 2 CC7.1 (search methodology documentation); CC7.2 (claim chart analysis records); CC7.3 (risk rating consistency); CC1.3 (non-infringement/invalidity opinion integrity)'
WHERE name LIKE 'Freedom-to-Operate%';

-- C1: Data Privacy & Protection

UPDATE citizen_catalog SET
  governing_guidelines = 'GDPR Regulation (EU) 2016/679 Articles 37-39 (DPO); CCPA/CPRA Cal. Civ. Code 1798.100 et seq.; HIPAA Privacy Rule 45 CFR Part 164 Subpart E; COPPA 16 CFR Part 312; NIST Privacy Framework 1.0',
  standards_of_creation = 'CIPP/E, CIPP/US, or CIPM certification (IAPP); J.D. or equivalent for legal DPOs; expert knowledge per GDPR Art. 37(5); independence per GDPR Art. 38(3)',
  soc_controls = 'SOC 2 CC7.1 (data processing activity records per GDPR Art. 30); CC7.2 (DPIA management); CC2.2 (data subject rights fulfillment); CC7.3 (breach notification records)'
WHERE name LIKE 'Data Protection Officer%';

UPDATE citizen_catalog SET
  governing_guidelines = 'GDPR Regulation (EU) 2016/679 all articles; EDPB Guidelines and Opinions; Standard Contractual Clauses Commission Decision 2021/914; EU-US Data Privacy Framework; ePrivacy Directive 2002/58/EC',
  standards_of_creation = 'CIPP/E certification (IAPP); EU member state implementing legislation knowledge; DPA interaction experience; GDPR Art. 37(5) expertise',
  soc_controls = 'SOC 2 CC7.1 (lawful basis documentation); CC6.1 (cross-border transfer mechanism records); CC7.2 (consent management platform controls); CC7.3 (data mapping documentation)'
WHERE name = 'GDPR Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CCPA Cal. Civ. Code 1798.100-1798.199.100; CPRA Proposition 24; CPPA Regulations 11 CCR Division 6; Cal. AG CCPA Enforcement Actions; CCPA Final Regulations 11 CCR 7000-7102',
  standards_of_creation = 'CIPP/US certification (IAPP); California privacy law expertise; data mapping and classification experience; CPPA regulatory familiarity',
  soc_controls = 'SOC 2 CC2.2 (consumer rights request processing); CC7.1 (opt-out mechanism verification); CC7.2 (data sale/sharing disclosure documentation); CC7.3 (service provider contract review)'
WHERE name LIKE 'CCPA%Privacy Analyst%';

UPDATE citizen_catalog SET
  governing_guidelines = 'COPPA 15 U.S.C. 6501-6506; COPPA Rule 16 CFR Part 312; FTC COPPA FAQ and Guidance; COPPA Safe Harbor Programs (kidSAFE, ESRB, TRUSTe/TrustArc); FTC Enforcement Actions and Consent Decrees',
  standards_of_creation = 'COPPA certification through safe harbor or equivalent; child-directed content expertise; verifiable parental consent mechanism knowledge',
  soc_controls = 'SOC 2 CC6.1 (age verification mechanisms); CC7.1 (parental consent records); CC6.3 (data minimization for children); CC7.3 (safe harbor compliance records)'
WHERE name LIKE 'Children%Privacy%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Illinois BIPA 740 ILCS 14; Texas CUBI Act Tex. Bus. & Com. Code 503.001; Washington Biometric Identifiers Act RCW 19.375; CCPA/CPRA biometric provisions; GDPR Art. 9 (biometric data); NIST SP 800-76',
  standards_of_creation = 'Privacy law specialization; biometric technology knowledge; class action litigation awareness; multi-jurisdiction biometric law expertise',
  soc_controls = 'SOC 2 CC7.1 (written informed consent documentation); CC4.1 (biometric data retention/destruction schedules); CC6.1 (third-party disclosure records); CC6.5 (biometric template security)'
WHERE name LIKE 'Biometric Privacy%';

-- C2: Cybersecurity & Compliance

UPDATE citizen_catalog SET
  governing_guidelines = 'NIST Cybersecurity Framework 2.0; NIST SP 800-53 Rev. 5; ISO/IEC 27001:2022; ISO/IEC 27002:2022; COBIT 2019; CIS Controls v8',
  standards_of_creation = 'CISSP ((ISC)2), CISM (ISACA), or equivalent; bachelor''s in CS/IT; executive management experience; continuous CPE requirements',
  soc_controls = 'SOC 2 CC1.1 (security program governance); CC3.1 (risk assessment); CC5.1 (security policy management); CC7.3 (incident response oversight); CC9.2 (vendor security management)'
WHERE name LIKE 'Chief Information Security Officer%';

UPDATE citizen_catalog SET
  governing_guidelines = 'AICPA SSAE 18 (AT-C Section 105, 205, 320); AICPA Trust Services Criteria 2017; AICPA SOC 2 Reporting Guide; ISACA IT Audit Framework; COBIT 2019; ISO/IEC 27001:2022',
  standards_of_creation = 'CPA license (for SOC 2 report issuance); CISA (ISACA) for IT auditors; SSAE 18 training; SOC 2 engagement experience; independence per AICPA',
  soc_controls = 'Trust services criteria evaluation (all CC categories); CC7.1 (control testing documentation); CC7.2 (exception identification and reporting); CC7.3 (management assertion verification)'
WHERE name LIKE 'SOC 2 Auditor%';

UPDATE citizen_catalog SET
  governing_guidelines = 'PTES (Penetration Testing Execution Standard); OWASP Testing Guide v4.2; NIST SP 800-115 (Security Testing); CREST Penetration Testing Guide; PCI DSS Requirement 11.3; CBEST/TIBER-EU',
  standards_of_creation = 'OSCP (Offensive Security), GPEN (GIAC), CEH (EC-Council), or CREST CRT/CCT; rules of engagement documentation; scope definition; legal authorization',
  soc_controls = 'SOC 2 CC6.1 (scope authorization); CC7.1 (vulnerability finding classification); CC7.2 (remediation verification); CC6.5 (report chain of custody); CC7.3 (retesting documentation)'
WHERE name LIKE 'Penetration Tester%';

UPDATE citizen_catalog SET
  governing_guidelines = 'NIST SP 800-40 Rev. 4 (Patch and Vulnerability Management); CVSS v4.0 (FIRST); CVE (MITRE); NIST SP 800-53 Rev. 5 RA family; BOD 22-01 (CISA Known Exploited Vulnerabilities); ISO/IEC 27005:2022',
  standards_of_creation = 'CompTIA Security+, CEH, or GIAC certifications; vulnerability scanning tool expertise (Nessus, Qualys, Rapid7); CVSS scoring proficiency',
  soc_controls = 'SOC 2 CC7.1 (scan scheduling and coverage); CC7.2 (vulnerability prioritization); CC4.1 (remediation tracking); CC7.3 (false positive management)'
WHERE name = 'Vulnerability Assessment';

UPDATE citizen_catalog SET
  governing_guidelines = 'NIST SP 800-61 Rev. 2 (Incident Handling); NIST SP 800-86 (Forensic Techniques); CISA CIRCIA 6 U.S.C. 681b; FIRST CSIRT Services Framework 2.1; ISO/IEC 27035:2023; GDPR Art. 33-34 (Breach Notification)',
  standards_of_creation = 'GCIH (GIAC), ECIH (EC-Council), or equivalent; incident handling experience; forensic tool proficiency; legal hold understanding',
  soc_controls = 'SOC 2 CC7.1 (incident classification); CC7.2 (evidence chain of custody); CC7.3 (notification timeline tracking); CC4.1 (post-incident review records); CC2.3 (communication logs)'
WHERE name LIKE 'Incident Response Manager%';

UPDATE citizen_catalog SET
  governing_guidelines = 'FedRAMP Authorization Act (FY2023 NDAA); FedRAMP Security Assessment Framework; NIST SP 800-53 Rev. 5 (Low/Moderate/High baselines); NIST SP 800-37 Rev. 2 (RMF); FedRAMP Continuous Monitoring Guide; A2LA accreditation requirements',
  standards_of_creation = 'A2LA accreditation (for 3PAO organizations); CISSP/CISA individual certification; FedRAMP-specific training; ISO 17020/17025 compliance',
  soc_controls = 'SOC 2 CC7.1 (security control assessment); CC4.1 (POA&M tracking); CC7.2 (continuous monitoring records); CC7.3 (authorization package integrity)'
WHERE name LIKE 'FedRAMP%';

UPDATE citizen_catalog SET
  governing_guidelines = 'FISMA 44 U.S.C. 3551-3558; NIST SP 800-37 Rev. 2 (RMF); NIST SP 800-53 Rev. 5; NIST SP 800-171 Rev. 2 (CUI); OMB Circular A-130; FIPS 199, FIPS 200',
  standards_of_creation = 'CISSP, CISM, or CAP certification; federal IT security experience; NIST RMF training; ATO package development experience',
  soc_controls = 'SOC 2 CC7.1 (system security plan management); CC4.1 (POA&M lifecycle tracking); CC7.2 (continuous monitoring reports); CC7.3 (ATO documentation integrity)'
WHERE name = 'FISMA Compliance';

-- C3: AI Governance & Ethics

UPDATE citizen_catalog SET
  governing_guidelines = 'EU AI Act Regulation (EU) 2024/1689; NIST AI Risk Management Framework 1.0; IEEE 7000-2021; IEEE 7010-2020 (Wellbeing Impact Assessment); OECD AI Principles (2019/2024); Executive Order 14110 (2023); OMB M-24-10',
  standards_of_creation = 'Multidisciplinary background (ethics, CS, law, social science); AI ethics certification programs; AI lifecycle understanding; stakeholder engagement methodology',
  soc_controls = 'SOC 2 CC3.1 (AI system risk classification); CC1.3 (ethical review board records); CC7.1 (bias testing methodology and results); CC7.2 (human oversight mechanism documentation)'
WHERE name LIKE 'AI Ethics Officer%';

UPDATE citizen_catalog SET
  governing_guidelines = 'EU AI Act Articles 9-15 (High-Risk AI); NIST AI RMF 1.0 Govern/Map/Measure/Manage; NYC Local Law 144 (Automated Employment Decisions); Colorado AI Act SB 24-205; Canada AIDA; White House AI Bill of Rights (2022)',
  standards_of_creation = 'Data science/statistics background; AI fairness metrics expertise; regulatory impact assessment experience; algorithmic auditing methodology training',
  soc_controls = 'SOC 2 CC7.1 (assessment methodology documentation); CC7.2 (disparate impact testing records); CC4.1 (mitigation measure tracking); CC2.2 (stakeholder notification records)'
WHERE name = 'Algorithmic Impact Assessment';

UPDATE citizen_catalog SET
  governing_guidelines = 'NIST AI RMF 1.0; EU AI Act Article 11 (Technical Documentation), Article 13 (Transparency); Model Cards (Mitchell et al. 2019); Datasheets for Datasets (Gebru et al. 2021); IEEE P2894; NIST SP 800-218A (SSDF for AI)',
  standards_of_creation = 'ML engineering background; model documentation expertise; ML lifecycle understanding; MLOps and model registry familiarity',
  soc_controls = 'SOC 2 CC8.1 (model versioning and lineage records); CC7.1 (training data documentation); CC7.2 (performance metric tracking); CC4.1 (drift detection records)'
WHERE name LIKE 'AI Model Documentation%';

-- C4: Cloud & Infrastructure

UPDATE citizen_catalog SET
  governing_guidelines = 'CSA Cloud Controls Matrix v4.0; CSA STAR Certification; ISO/IEC 27017:2015 (Cloud Security); ISO/IEC 27018:2019 (PII in Public Cloud); NIST SP 800-144; Shared Responsibility Model documentation',
  standards_of_creation = 'CCSP ((ISC)2), CCSK (CSA), or cloud-native certifications (AWS SAP, Azure Solutions Architect); cloud architecture experience; multi-cloud knowledge',
  soc_controls = 'SOC 2 CC6.1 (cloud configuration management); CC7.1 (shared responsibility documentation); CC6.4 (data residency controls); CC6.2 (cloud access management); CC6.3 (tenant isolation verification)'
WHERE name LIKE 'Cloud Security Architect%';

UPDATE citizen_catalog SET
  governing_guidelines = 'CSA Code of Conduct for GDPR; ISO/IEC 19086 (Cloud SLA Framework); NIST SP 800-146 (Cloud Computing); Uptime Institute Tier Standards; ITIL 4 Service Level Management',
  standards_of_creation = 'J.D. or IT contracts certification; cloud technology knowledge; SLA negotiation experience; vendor management background',
  soc_controls = 'SOC 2 CC7.1 (SLA metric definition); CC7.2 (performance monitoring records); CC7.3 (exit strategy and data portability); CC9.2 (subprocessor management)'
WHERE name LIKE 'Cloud Service Agreement%';

UPDATE citizen_catalog SET
  governing_guidelines = 'ITIL 4 Foundation and Service Level Management; ISO/IEC 20000-1:2018 (IT Service Management); ISO/IEC 19086-1:2016 (Cloud SLA); COBIT 2019 APO09; industry-specific SLA benchmarks',
  standards_of_creation = 'ITIL 4 Foundation/Managing Professional; HDI certification; service level management experience; performance metrics expertise',
  soc_controls = 'SOC 2 CC7.1 (SLA performance measurement); CC7.2 (breach/credit tracking); CC7.3 (reporting accuracy verification); CC4.1 (continuous improvement records)'
WHERE name = 'SLA Compliance Analyst';

-- C5: Software & Development

UPDATE citizen_catalog SET
  governing_guidelines = 'BSA Software Asset Management Guidelines; ISO/IEC 19770-1:2017 (IT Asset Management); ITIL 4 SAM Practice; vendor-specific license agreements (Microsoft SPLA, Oracle LMA, SAP audit rights); Copyright Act 17 U.S.C. 101 et seq.',
  standards_of_creation = 'Certified Software Asset Manager (CSAM); ITIL SAM certification; vendor-specific licensing expertise; audit methodology training',
  soc_controls = 'SOC 2 CC7.1 (license entitlement reconciliation); CC7.2 (deployment discovery records); CC4.1 (true-up documentation); CC7.3 (compliance gap analysis)'
WHERE name = 'Software License Compliance';

UPDATE citizen_catalog SET
  governing_guidelines = 'OWASP Code Review Guide 2.0; OWASP ASVS 4.0; NIST SP 800-218 (SSDF); CWE (MITRE); IEEE 730-2014 (Software Quality Assurance); SEI CERT Coding Standards',
  standards_of_creation = 'GWAPT (GIAC), CSSLP ((ISC)2), or equivalent; secure coding experience; SAST/DAST tool proficiency; code review methodology training',
  soc_controls = 'SOC 2 CC7.1 (code review coverage); CC7.2 (vulnerability classification); CC4.1 (remediation verification); CC7.3 (third-party library risk assessment)'
WHERE name LIKE 'Code Auditor%';

UPDATE citizen_catalog SET
  governing_guidelines = 'OWASP API Security Top 10 (2023); OpenAPI Specification 3.1; OAuth 2.0 (RFC 6749) and OpenID Connect; PSD2 (financial APIs EU); FHIR (healthcare APIs); API Terms of Use frameworks',
  standards_of_creation = 'API security certification or training; OAuth/OIDC implementation experience; API gateway management expertise; rate limiting and abuse prevention knowledge',
  soc_controls = 'SOC 2 CC6.1 (API authentication/authorization); CC7.1 (rate limiting configuration); CC8.1 (API versioning management); CC7.2 (terms of use enforcement)'
WHERE name LIKE 'API Compliance%';

-- C6: Digital Accessibility

UPDATE citizen_catalog SET
  governing_guidelines = 'WCAG 2.2 Levels A/AA/AAA; ADA 42 U.S.C. 12101 et seq.; Section 508 29 U.S.C. 794d; EN 301 549 (European); DOJ ADA Title II Web Accessibility Rule (2024); ATAG 2.0',
  standards_of_creation = 'IAAP CPACC; Web Accessibility Specialist (WAS); assistive technology testing experience; WCAG audit methodology',
  soc_controls = 'SOC 2 CC7.1 (accessibility audit documentation); CC7.2 (VPAT/ACR records); CC4.1 (remediation tracking); CC7.3 (user testing records)'
WHERE name LIKE 'Accessibility Compliance%';

-- C7: Data Governance & Records Management

UPDATE citizen_catalog SET
  governing_guidelines = 'ARMA GARP Principles; ISO 15489-1:2016 (Records Management); NARA regulations 36 CFR Chapter XII; GDPR Art. 5(1)(e) (Storage Limitation); CCPA 1798.105 (Right to Deletion); Zubulake v. UBS Warburg (litigation hold)',
  standards_of_creation = 'Certified Records Manager (CRM) from ICRM; Information Governance Professional (IGP) from ARMA; records management experience; legal hold expertise',
  soc_controls = 'SOC 2 CC7.1 (retention schedule documentation); CC7.2 (destruction certification); CC4.1 (litigation hold management); CC6.3 (data classification enforcement)'
WHERE name LIKE 'Data Retention%';

UPDATE citizen_catalog SET
  governing_guidelines = 'GDPR Art. 28 (Processor Requirements); Standard Contractual Clauses Commission Decision 2021/914; EDPB Guidelines 07/2020 (Controller/Processor); UK IDTA; CCPA Service Provider requirements Cal. Civ. Code 1798.140(ag)',
  standards_of_creation = 'CIPP/E or CIPM certification; contract law background; GDPR Art. 28 compliance expertise; cross-border data transfer experience',
  soc_controls = 'SOC 2 CC7.1 (DPA clause completeness); CC7.2 (subprocessor authorization tracking); CC6.1 (data transfer mechanism documentation); CC7.3 (audit rights exercise records)'
WHERE name LIKE 'Data Processing Agreement%';

UPDATE citizen_catalog SET
  governing_guidelines = 'ePrivacy Directive 2002/58/EC Article 5(3); GDPR Art. 7 (Consent); EDPB Guidelines 05/2020 (Consent); IAB TCF v2.2; CNIL Cookie Guidelines; Planet49 CJEU C-673/17',
  standards_of_creation = 'Privacy certification (CIPP/E preferred); consent management platform expertise; cookie categorization knowledge; A/B testing compliance methodology',
  soc_controls = 'SOC 2 CC7.1 (consent collection records); CC7.2 (cookie audit documentation); CC2.2 (consent withdrawal processing); CC7.3 (third-party cookie tracking)'
WHERE name LIKE 'Cookie Consent%';

-- C8: Terms of Service & Platform Governance

UPDATE citizen_catalog SET
  governing_guidelines = 'UCITA (where adopted); UCC Article 2 and 2A (software/technology); DMCA 17 U.S.C. 512; CAN-SPAM Act 15 U.S.C. 7701 et seq.; E-SIGN Act 15 U.S.C. 7001; State UDAP statutes',
  standards_of_creation = 'J.D.; state bar admission; technology transactions specialization; SaaS/cloud contracting experience',
  soc_controls = 'SOC 2 CC7.1 (terms of service legal review records); CC8.1 (contract version management); CC7.2 (enforceability analysis); CC4.1 (regulatory change monitoring)'
WHERE name LIKE 'Technology Transactions Attorney%';

UPDATE citizen_catalog SET
  governing_guidelines = 'FTC Act Section 5 (Unfair/Deceptive Acts); GDPR Art. 12-14 (Transparent Information); CCPA 1798.100(b) (Privacy Policy); COPPA Rule 16 CFR 312.4 (Notice); CalOPPA Cal. Bus. & Prof. Code 22575-22579; NIST Privacy Framework',
  standards_of_creation = 'CIPP/US or CIPP/E; technical writing background; legal drafting skills; UX writing competency for layered privacy notices',
  soc_controls = 'SOC 2 CC7.1 (policy accuracy verification); CC8.1 (update tracking and versioning); CC7.2 (regulatory requirement mapping); CC7.3 (readability testing records)'
WHERE name LIKE 'Privacy Policy Analyst%';

-- ============================================================
-- SECTION 3: AVIATION / MARITIME / COMMERCIAL TRANSPORT
-- ============================================================

-- A1: Airworthiness & Aircraft Certification

UPDATE citizen_catalog SET
  governing_guidelines = '49 USC § 44702 (Certificate issuance); 14 CFR Part 21 (Certification procedures); 14 CFR Part 21 Subpart H (Airworthiness Certificates); FAA Order 8110.4 (Type Certification); FAA Order 8100.15 (ODA)',
  standards_of_creation = 'SAE AS9100 (Aerospace QMS); FAA AC 21-40 (STC Application Guide); ISO 9001:2015 (production approval holders)',
  soc_controls = 'Document integrity verification; configuration management traceability; serial number tracking; revision control; type certificate data integrity'
WHERE name = 'Designated Engineering Representative';

UPDATE citizen_catalog SET
  governing_guidelines = '14 CFR § 183.33 (Designated Airworthiness Representative); 14 CFR Part 21 Subpart H; FAA Order 8100.8 (Designee Management Handbook); FAA Order 8130.2 (Airworthiness Certification)',
  standards_of_creation = 'FAA Form 8130-6 (Airworthiness Certificate Application); FAA Form 8130-3 (Authorized Release Certificate); AC 21-12',
  soc_controls = 'Certificate authenticity verification; delegation authority validation; issuance tracking; expiration monitoring'
WHERE name = 'Designated Airworthiness Representative';

UPDATE citizen_catalog SET
  governing_guidelines = '14 CFR Part 21 (Certification); 14 CFR Part 25 (Transport Category); 14 CFR Part 23 (Normal Category); 14 CFR Part 27/29 (Rotorcraft); 14 CFR Part 33 (Engines); Part 35 (Propellers); FAA Order 8110.4',
  standards_of_creation = 'SAE ARP4754A (Civil Aircraft Development); SAE ARP4761 (Safety Assessment); RTCA DO-178C (Software in Airborne Systems); RTCA DO-254 (Airborne Electronic Hardware)',
  soc_controls = 'Design data integrity; test data preservation; compliance finding traceability; type design configuration control'
WHERE name = 'Aircraft Certification Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = '14 CFR Part 21 Subpart F (Production Under Type Certificate); Subpart G (Production Certificates); Subpart K (Parts Manufacturer Approvals); FAA Order 8120.22',
  standards_of_creation = 'SAE AS9100 Rev D (Aviation/Space/Defense QMS); SAE AS9110 (Aviation Maintenance Organizations); SAE AS9120 (Aviation Distributors)',
  soc_controls = 'Production quality system audit trails; nonconformance tracking; supplier quality records; serialization/traceability'
WHERE name = 'Production Approval Holder';

-- A2: Aircraft Maintenance & Inspection

UPDATE citizen_catalog SET
  governing_guidelines = '14 CFR Part 43 (Maintenance/Rebuilding/Alteration); 14 CFR § 43.9 (Maintenance records); § 43.11 (Inspection records); § 43.12 (Falsification); 14 CFR Part 65 Subpart D (Mechanics)',
  standards_of_creation = 'FAA AC 43.9-1 (Maintenance Records); FAA AC 43-9C; ATA iSpec 2200 (Documentation Standards); ATA Spec 100',
  soc_controls = 'Maintenance record integrity (return-to-service entries); work order documentation; parts installation traceability; logbook entry verification'
WHERE name LIKE 'Aviation Maintenance Technician%';

UPDATE citizen_catalog SET
  governing_guidelines = '14 CFR § 65.91-95 (Inspection Authorizations); 14 CFR § 43.3(a)(4); 14 CFR Part 43 Appendix D; FAA Order 8900.1 Vol. 5 Ch. 2',
  standards_of_creation = 'FAA AC 43-204 (Visual Inspection); manufacturer inspection checklists per TCDS; FAA Form 337 (Major Repair and Alteration)',
  soc_controls = 'Inspection finding documentation; discrepancy list integrity; signoff authority validation; annual activity audit'
WHERE name LIKE 'Inspection Authorization%';

UPDATE citizen_catalog SET
  governing_guidelines = '14 CFR Part 145 (Repair Stations); 14 CFR § 145.209; § 145.211 (Quality control); § 145.219 (Recordkeeping); FAA Order 8900.1 Vol. 2 Ch. 25',
  standards_of_creation = 'SAE AS9110 (Aviation Maintenance QMS); EASA Part 145 (dual-certified); repair station operations specifications and capability list',
  soc_controls = 'Work order traceability; tool calibration records; employee training/authorization records; quality escapes tracking; customer return documentation'
WHERE name = 'Repair Station Quality Manager';

UPDATE citizen_catalog SET
  governing_guidelines = '14 CFR Part 39 (Airworthiness Directives); 14 CFR § 91.403 (General maintenance responsibilities); 14 CFR § 91.417 (Maintenance records); 49 USC § 44709',
  standards_of_creation = 'FAA AD format per 14 CFR Part 39; manufacturer service bulletins; EASA ADs for foreign components',
  soc_controls = 'AD applicability determination traceability; compliance date tracking; recurring AD scheduling; terminating action documentation'
WHERE name LIKE 'Airworthiness Directive%';

UPDATE citizen_catalog SET
  governing_guidelines = '14 CFR § 91.213 (Inoperative instruments); 14 CFR § 121.628; 14 CFR § 135.179; FAA Order 8900.1 Vol. 4 Ch. 4 (MEL/MMEL); FAA Order 8400.10',
  standards_of_creation = 'MMEL Policy Letter series; FAA Master MEL per aircraft type; MMEL/MEL Revision Process per OpSpec D095',
  soc_controls = 'MEL item deferral tracking; repair interval compliance; dispatch deviation guide accuracy; revision currency verification'
WHERE name = 'MEL%CDL Program Manager';

-- A3: Pilot & Crew Certification

UPDATE citizen_catalog SET
  governing_guidelines = '14 CFR Part 67 (Medical Standards); 14 CFR § 67.401-413 (Special Issuance); 49 USC § 44703; FAA Order 8520.2 (AME Guide)',
  standards_of_creation = 'Guide for Aviation Medical Examiners; FAA Form 8500-8 (Airman Medical Application); MedXPress electronic system; BasicMed per 14 CFR § 68',
  soc_controls = 'Medical record confidentiality (HIPAA + FAA); certificate authenticity verification; special issuance tracking; denial/appeal documentation'
WHERE name = 'Aviation Medical Examiner';

UPDATE citizen_catalog SET
  governing_guidelines = '14 CFR Part 61 (Pilots, Flight Instructors, Ground Instructors); 14 CFR Part 61 Subparts A-K; FAA Order 8900.2 (Designee Handbook); FAA PTS/ACS',
  standards_of_creation = 'Airman Certification Standards per certificate/rating; FAA Form 8710-1 (Airman Certificate Application); IACRA',
  soc_controls = 'Practical test documentation integrity; applicant eligibility verification; certificate issuance tracking; examiner performance monitoring'
WHERE name = 'Designated Pilot Examiner';

UPDATE citizen_catalog SET
  governing_guidelines = '14 CFR § 119.69/119.71 (Management personnel); 14 CFR Part 121 Subpart N (Training); Part 121 Subpart O (Crewmember Qualifications); 14 CFR Part 135 Subpart H; 14 CFR Part 117 (Flight and Duty Limitations)',
  standards_of_creation = 'Approved Training Program per OpSpecs; Line Operational Simulations per AC 120-90; Advanced Qualification Program per AC 120-54',
  soc_controls = 'Training record completeness; recency of experience tracking; crew qualification status; duty time limitation compliance'
WHERE name LIKE 'Chief Pilot%';

UPDATE citizen_catalog SET
  governing_guidelines = '14 CFR § 121.404 (CRM training compliance); 14 CFR § 121.419-421 (Pilot training); AC 120-51 (Crew Resource Management Training)',
  standards_of_creation = 'ICAO Doc 9683 (Human Factors Training Manual); AC 120-51E (CRM Training); LOSA methodology per AC 120-90',
  soc_controls = 'Training completion tracking; behavioral marker assessment records; LOSA data confidentiality; recurrent training scheduling'
WHERE name LIKE 'Crew Resource Management%';

-- A4: Airline Operations & Certificates

UPDATE citizen_catalog SET
  governing_guidelines = '14 CFR Part 5 (Safety Management Systems); 14 CFR § 119.8 (SMS); AC 120-92 (SMS for Aviation Service Providers); ICAO Annex 19 (Safety Management); FAA Order 8000.369',
  standards_of_creation = 'SMS Manual per 14 CFR Part 5; Safety Risk Management process documentation; Safety Assurance audit protocols; ICAO Doc 9859 (Safety Management Manual)',
  soc_controls = 'Hazard report confidentiality; safety data protection per 14 CFR § 193; risk assessment traceability; corrective action tracking'
WHERE name LIKE 'Director of Safety%';

UPDATE citizen_catalog SET
  governing_guidelines = '14 CFR Part 119 (Certification: Air Carriers); 14 CFR Part 121 (Domestic/Flag/Supplemental Operations); 14 CFR Part 135 (Commuter/On-Demand); FAA Order 8900.1',
  standards_of_creation = 'Operations Specifications per Part 119; General Operations Manual; company operations manuals per 14 CFR § 121.133/§ 135.21',
  soc_controls = 'OpSpecs revision tracking; manual currency verification; certificate holder responsibility documentation; exemption/deviation tracking'
WHERE name = 'Air Carrier Certificate';

UPDATE citizen_catalog SET
  governing_guidelines = '14 CFR § 13.401 (FOQA Program); AC 120-82 (FOQA); 14 CFR § 193 (Protection of Voluntarily Submitted Information); 49 USC § 44735',
  standards_of_creation = 'FOQA program documentation per AC 120-82; flight data analysis event set definitions; ICAO Doc 10000 (Flight Data Analysis Manual)',
  soc_controls = 'Flight data recorder download integrity; de-identification protocols; aggregate data protection per § 193; event trigger validation'
WHERE name LIKE 'FOQA%';

-- A5: Air Traffic & Communications

UPDATE citizen_catalog SET
  governing_guidelines = '14 CFR Part 65 Subpart B (ATC Tower Operators); FAA Order 7110.65 (Air Traffic Control); FAA Order 7210.3 (Facility Operation); 49 USC § 44506',
  standards_of_creation = 'FAA Order 7110.65 communication phraseology; FAA Order 7210.56 (Air Traffic Quality Assurance); ATC audio recording standards per 7210.3',
  soc_controls = 'ATC communication recording preservation (45-day minimum, 15 months for incidents); playback integrity; controller certification tracking'
WHERE name = 'Air Traffic Control';

UPDATE citizen_catalog SET
  governing_guidelines = '14 CFR Part 87 (via FCC 47 CFR Part 87 Aviation Services); FAA Order 6000.15 (NAS Facilities Maintenance); RTCA DO-260B (ADS-B standards)',
  standards_of_creation = 'RTCA standards (DO-181E ACARS, DO-260B ADS-B, DO-278A ground systems); ARINC standards (429, 629, 664); EUROCAE ED-76A',
  soc_controls = 'System availability monitoring; data link integrity verification; frequency assignment records; equipment certification tracking'
WHERE name = 'Aviation Communications Systems';

-- A6: Airport & Security

UPDATE citizen_catalog SET
  governing_guidelines = '49 CFR Part 1542 (Airport Security); 49 CFR § 1542.101 (Airport Security Program); 49 CFR § 1542.201-209 (Personnel identification); 49 USC § 44903; TSA ASP requirements',
  standards_of_creation = 'Airport Security Program per 49 CFR § 1542.101; Security Directive implementation protocols; TSA Information Circular compliance',
  soc_controls = 'SSI handling per 49 CFR Part 1520; badge/credential system integrity; access control audit trails; background check record protection'
WHERE name = 'Airport Security Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = '49 USC § 44901 (Screening passengers); 49 CFR Part 1540 (Civil Aviation Security General); 49 CFR Part 1544 (Aircraft Operator Security); 49 CFR Part 1546 (Foreign Air Carrier); TSA Management Directives',
  standards_of_creation = 'Screening Standard Operating Procedures; covert testing protocols; TSA Performance Accountability Standards',
  soc_controls = 'SSI document control; screener performance records; covert test results protection; regulatory enforcement action tracking'
WHERE name = 'TSA Federal Security Director';

UPDATE citizen_catalog SET
  governing_guidelines = '14 CFR Part 150 (Airport Noise Compatibility); 14 CFR Part 161 (Noise/Access Restrictions); 49 USC § 47504 (Noise Compatibility Planning); FAA Order 5100.38 (AIP Handbook)',
  standards_of_creation = 'FAA AC 150/5020-1 (Noise Planning); INM/AEDT noise modeling standards; Part 150 NEM format requirements',
  soc_controls = 'Noise measurement data integrity; modeling parameter documentation; public comment record preservation; land use compatibility tracking'
WHERE name = 'Airport Noise';

-- A7: UAS / Drone Operations

UPDATE citizen_catalog SET
  governing_guidelines = '14 CFR Part 107 (Small UAS); 14 CFR § 107.12 (Remote pilot certificate); 14 CFR Part 89 (Remote Identification); FAA Reauthorization Act of 2024 UAS provisions',
  standards_of_creation = 'FAA Form 8710-13 (Remote Pilot Application); Part 107 waiver application per § 107.200; Remote ID broadcast module standards per Part 89',
  soc_controls = 'Registration database accuracy; waiver condition tracking; operational area authorization records; Remote ID compliance verification'
WHERE name LIKE 'Remote Pilot%';

UPDATE citizen_catalog SET
  governing_guidelines = '14 CFR Part 107 Subpart D (Waivers); 14 CFR § 91.113 (Right-of-way); FAA UAS Integration Pilot Program successors; ASTM F3322 (sUAS Parachutes)',
  standards_of_creation = 'ASTM F3411 (Remote ID); ASTM F3548 (UAS Traffic Management); JARUS SORA (Specific Operations Risk Assessment); EASA risk assessment for cross-border operations',
  soc_controls = 'Safety case documentation; risk assessment traceability; detect-and-avoid system validation records; ground risk buffer calculations'
WHERE name = 'UAS Integration Safety';

-- A8: Aviation Hazmat & Insurance

UPDATE citizen_catalog SET
  governing_guidelines = '49 CFR Parts 171-175 (Hazmat Regulations air transport); 14 CFR § 121.433a (Hazmat training); 14 CFR § 135.505; ICAO Doc 9284 (Dangerous Goods by Air); IATA Dangerous Goods Regulations',
  standards_of_creation = 'IATA DGR packing instructions; Shipper''s Declaration for Dangerous Goods (IATA format); training curriculum per 49 CFR § 172.704',
  soc_controls = 'Training record retention 3 years per § 172.704(d); shipper declaration verification; acceptance checklist completion; incident reporting'
WHERE name LIKE 'Dangerous Goods Training%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Warsaw Convention/Montreal Convention (international liability); 49 USC § 44112 (Aircraft liability limitation); state insurance codes; Aviation Insurance Association guidelines',
  standards_of_creation = 'Lloyd''s LAUA policy forms; AVN series endorsements (AVN48B war risk, AVN67B cyber); AAIS aviation forms',
  soc_controls = 'Policy document integrity; claims file preservation; loss run accuracy; subrogation documentation; reinsurance treaty compliance'
WHERE name = 'Aviation Insurance';

UPDATE citizen_catalog SET
  governing_guidelines = '49 USC § 44103-44108 (Registration/recordation); 14 CFR Part 47 (Aircraft Registration); 14 CFR Part 49 (Recording Titles/Security Documents); Cape Town Convention and Aircraft Protocol',
  standards_of_creation = 'FAA Form 8050-1 (Registration Application); FAA Form 8050-2 (Bill of Sale); International Registry filing requirements; UCC-1 financing statements',
  soc_controls = 'Title chain verification; lien search documentation; registration currency; international registry priority filing'
WHERE name LIKE 'Aircraft Transaction Attorney%';

-- A9: NTSB Investigation

UPDATE citizen_catalog SET
  governing_guidelines = '49 USC § 1131-1134 (NTSB investigation authority); 49 CFR Part 830 (Accident/Incident Notification); 49 CFR Part 831 (Investigation Procedures); NTSB Order 6200.3',
  standards_of_creation = 'NTSB Form 6120.1 (Accident/Incident Report); ICAO Annex 13 (Aircraft Accident Investigation); CVR/FDR readout standards',
  soc_controls = 'Party system confidentiality; CVR 2-year destruction rule per 49 USC § 1114(c); factual report vs. analysis separation; draft report protection'
WHERE name = 'NTSB%Aviation Accident';

-- ============================================================
-- MARITIME (Section B)
-- ============================================================

-- B1: Vessel Documentation & Certification

UPDATE citizen_catalog SET
  governing_guidelines = '46 USC Chapter 33 (Vessel Inspection); 46 CFR Subchapter D (Tank Vessels); Subchapter H (Passenger Vessels); Subchapter I (Cargo Vessels); Subchapter T/K (Small Passenger); USCG Marine Safety Manual Vol. II',
  standards_of_creation = 'Certificate of Inspection format per 46 CFR § 31.40; CG-835 (Stability letter); NVIC series',
  soc_controls = 'Inspection finding documentation; deficiency tracking; vessel condition verification; COI expiration monitoring; detention/no-sail order documentation'
WHERE name = 'Coast Guard Marine Inspector';

UPDATE citizen_catalog SET
  governing_guidelines = '46 USC Chapter 121 (Documentation of Vessels); 46 CFR Part 67; 46 USC § 12103 (General eligibility); 46 USC § 31301-31343 (Preferred Mortgages)',
  standards_of_creation = 'CG-1258 (Application for Certificate of Documentation); CG-1340 (Bill of Sale); First Preferred Ship Mortgage filing requirements',
  soc_controls = 'Citizenship eligibility verification; chain-of-title documentation; mortgage priority recording; endorsement accuracy (coastwise, fishery, registry)'
WHERE name LIKE 'National Vessel Documentation%';

UPDATE citizen_catalog SET
  governing_guidelines = '46 USC § 3316 (Classification societies authority from USCG); SOLAS Convention Chapter II-1; IACS Unified Requirements; IMO MSC.1/Circ.-series',
  standards_of_creation = 'ABS Rules for Building and Classing Steel Vessels; DNV Rules for Classification; Lloyd''s Register Rules; IACS Procedural Requirements',
  soc_controls = 'Survey report integrity; class notation accuracy; condition of class tracking; overdue survey monitoring; class suspension/withdrawal documentation'
WHERE name = 'Classification Society Surveyor';

UPDATE citizen_catalog SET
  governing_guidelines = 'IMO Res. A.739(18) (RO Authorization Guidelines); IMO MSC/MEPC.4/Circ.1 (RO Code); 46 CFR Part 8 (Vessel Inspection Alternatives); USCG-RO Agreements',
  standards_of_creation = 'IACS Quality System Certification Scheme; ISO 9001:2015 (applied to RO operations); RO audit and survey procedures',
  soc_controls = 'Delegation of authority documentation; RO performance monitoring; non-conformity tracking; statutory certificate issuance records'
WHERE name = 'Recognized Organization%Auditor';

-- B2: Crew Licensing & Manning

UPDATE citizen_catalog SET
  governing_guidelines = '46 USC Chapters 71-77 (Licenses/Certificates/Documents); 46 CFR Part 10 (MMC); Part 11 (Officer Endorsements); Part 12 (Rating Endorsements); STCW Convention and Code',
  standards_of_creation = 'CG-719B (MMC Application); STCW certificates of competency; sea service verification per 46 CFR § 10.232; medical/physical exam per Part 10 Subpart C',
  soc_controls = 'Credential authenticity; sea service record verification; training course approval records; drug testing compliance; TWIC integration'
WHERE name LIKE 'Merchant Mariner Credential%';

UPDATE citizen_catalog SET
  governing_guidelines = '46 CFR Part 10 Subpart D (Training); STCW Regulation I/6-I/8 (Training and assessment); NVIC 03-14 (Officer endorsement renewal); 46 CFR § 10.402-10.407 (Approved courses)',
  standards_of_creation = 'USCG-approved course program standards; STCW Model Courses (IMO series); simulator training per STCW Regulation I/12',
  soc_controls = 'Course approval documentation; instructor qualification records; student assessment records; simulator validation; refresher/revalidation tracking'
WHERE name LIKE 'Maritime Training Provider%';

UPDATE citizen_catalog SET
  governing_guidelines = '46 USC § 8101-8106 (Manning requirements); 46 CFR Part 15 (Manning); ILO Maritime Labour Convention 2006; STCW Regulation II/1-II/5, III/1-III/7',
  standards_of_creation = 'Certificate of Manning (minimum safe manning); crew list format per USCG; MLC Declaration of Maritime Labour Compliance',
  soc_controls = 'Manning level verification; watch schedule documentation; rest hour recording per STCW A-VIII/1; crew change documentation'
WHERE name LIKE 'Vessel Manning%';

-- B3: Port State Control & Inspections

UPDATE citizen_catalog SET
  governing_guidelines = '33 CFR Part 160 (Ports and Waterways Safety); USCG PSC Policy Letters; IMO Res. A.1138(31) (Port State Control Procedures); Paris MOU; Tokyo MOU',
  standards_of_creation = 'Port State Control examination checklist; CG-5437 (Report of Boarding); IMO GISIS PSC module data entry standards',
  soc_controls = 'Inspection report integrity; deficiency classification accuracy; detention decision documentation; targeted inspection criteria transparency'
WHERE name = 'Port State Control Inspector';

UPDATE citizen_catalog SET
  governing_guidelines = 'IMO III Code (Implementation of IMO Instruments); IMO Res. A.1070(28) (Member State Audit Scheme); 46 USC Chapter 33; 46 CFR Subchapter Q',
  standards_of_creation = 'Flag State Audit Report format per III Code; USCG Marine Safety Manual Vol. I-III; corrective action plan format',
  soc_controls = 'Audit finding traceability; corrective action verification; statutory certificate tracking; casualty investigation documentation'
WHERE name LIKE 'Flag State Inspector%';

-- B4: Maritime Safety Management

UPDATE citizen_catalog SET
  governing_guidelines = 'SOLAS Chapter IX (Management for Safe Operation); ISM Code IMO Res. A.741(18); 33 CFR Part 96 (U.S. implementation); USCG NVIC 2-98',
  standards_of_creation = 'Safety Management System Manual; Document of Compliance/Safety Management Certificate format; ISM Code audit checklist per IMO Res. A.1118(30)',
  soc_controls = 'SMS document version control; nonconformity/observation tracking; internal audit scheduling; management review documentation; master''s overriding authority documentation'
WHERE name = 'ISM Code%' OR name LIKE '%Designated Person Ashore%' OR name LIKE '%DPA';

UPDATE citizen_catalog SET
  governing_guidelines = 'SOLAS Chapter XI-2 (Maritime Security); ISPS Code Parts A and B; 33 CFR Part 104 (Vessels); 33 CFR Part 105 (Facilities); MTSA 46 USC § 70101 et seq.',
  standards_of_creation = 'Vessel Security Plan per ISPS Part A § 9; Facility Security Plan per 33 CFR § 105.400; security assessment methodology per ISPS Part B',
  soc_controls = 'Security plan SSI handling; security drill/exercise documentation; Declaration of Security records; MARSEC level change documentation; continuous synopsis record'
WHERE name = 'ISPS Code%' OR name LIKE '%Company Security Officer%' OR name LIKE '%CSO';

UPDATE citizen_catalog SET
  governing_guidelines = '49 USC § 1131 (NTSB marine investigation); 46 CFR Part 4 (Marine Casualties); IMO Casualty Investigation Code Res. MSC.255(84); 46 USC § 6301-6308',
  standards_of_creation = 'NTSB marine accident report format; 46 CFR § 4.05 (casualty notice/voyage records); CG-2692 (Report of Marine Accident); IMO-GISIS Casualty Module',
  soc_controls = 'Evidence preservation; witness statement protection; VDR data integrity; drug/alcohol test chain of custody; preliminary report timing'
WHERE name = 'Maritime Accident Investigator';

-- B5: Cargo & Commercial Documentation

UPDATE citizen_catalog SET
  governing_guidelines = '46 USC Chapter 411 (Shipping Act prohibitions); 46 CFR Part 515 (Ocean Transportation Intermediaries); 19 CFR Part 4 (Vessels in Trade); Hague-Visby Rules/Hamburg Rules/Rotterdam Rules; COGSA 46 USC § 30701 note',
  standards_of_creation = 'Bill of Lading standard forms (Congenbill, BIMCO); Sea Waybill format; ISF 10+2 data requirements; AMS filing standards',
  soc_controls = 'Bill of lading authenticity (negotiable instrument); cargo manifest accuracy; customs filing timeliness; freight rate confidentiality'
WHERE name LIKE 'Ship%s Agent%';

UPDATE citizen_catalog SET
  governing_guidelines = 'English common law/NY arbitration; BIMCO standard form charter parties; Hague-Visby Rules; 46 USC Chapter 405 (Tariffs/Service Contracts); LMAA Terms',
  standards_of_creation = 'BIMCO charter party forms (GENCON, NYPE, BALTIME, SHELLTIME, ASBATANKVOY); fixture recap/note requirements; chartering terms per BIMCO',
  soc_controls = 'Charter party execution verification; fixture recap accuracy; laytime calculation documentation; demurrage/dispatch accounting; arbitration record preservation'
WHERE name = 'Charter Party Broker';

UPDATE citizen_catalog SET
  governing_guidelines = 'Marine Insurance Act 1906 (UK global standard); 46 USC Chapter 301 (General Liability); Institute Cargo Clauses (A)(B)(C); International Group Agreement (P&I pooling); OPA 90 (COFR requirements)',
  standards_of_creation = 'Institute Cargo Clauses format; Certificate of Insurance/Cover Note format; P&I Club Rules and By-laws; COFR per OPA 90',
  soc_controls = 'Policy document integrity; claims file chain of custody; survey report independence; subrogation documentation; reinsurance treaty tracking'
WHERE name LIKE 'Marine Cargo Insurance%';

UPDATE citizen_catalog SET
  governing_guidelines = '28 USC § 1333 (Admiralty jurisdiction); FRCP Supplemental Rules A-G; Limitation of Liability Act 46 USC Chapter 305; Jones Act 46 USC § 30104; LHWCA 33 USC § 901-950; Salvage Act 46 USC Chapter 313',
  standards_of_creation = 'Verified complaint format (Supplemental Rule C arrest); limitation petition format (Rule F); maritime lien documentation; general average declaration (York-Antwerp Rules)',
  soc_controls = 'In rem/in personam filing requirements; vessel arrest documentation; limitation fund calculation; general average security documentation'
WHERE name = 'Admiralty%Maritime Claims';

-- B6: Environmental & Pollution

UPDATE citizen_catalog SET
  governing_guidelines = 'MARPOL Annex I (Oil); Annex II (Noxious Liquids); Annex IV (Sewage); Annex V (Garbage); Annex VI (Air Pollution/Energy Efficiency); 33 CFR Part 151; 33 CFR Part 155',
  standards_of_creation = 'Oil Record Book Part I (Machinery) and Part II (Cargo/Ballast); Garbage Record Book per MARPOL Annex V; IOPP Certificate format; Ship Energy Efficiency Management Plan',
  soc_controls = 'Record book entry integrity (sequential, indelible, signed); IOPP survey compliance; emission monitoring data; garbage disposal log accuracy'
WHERE name LIKE 'MARPOL Compliance%';

UPDATE citizen_catalog SET
  governing_guidelines = 'BWM Convention; 33 CFR Part 151 Subparts C and D (Ballast Water); EPA Vessel General Permit/VIDA; 46 USC § 3503a (Ballast water management)',
  standards_of_creation = 'Ballast Water Management Plan per BWM Regulation B-1; Ballast Water Record Book per B-2; BWM Certificate; type approval certificates for BWM systems',
  soc_controls = 'Ballast water exchange/treatment documentation; sediment management records; sampling/testing records; system maintenance logs'
WHERE name = 'Ballast Water';

UPDATE citizen_catalog SET
  governing_guidelines = 'OPA 90 33 USC § 2701 et seq.; CWA § 311 (Discharge of oil); CERCLA (Hazardous substances); 33 CFR Part 153; National Contingency Plan 40 CFR Part 300',
  standards_of_creation = 'Vessel Response Plan per 33 CFR Part 155 Subpart D; Facility Response Plan per 40 CFR Part 112; ICS documentation; NRDA protocols',
  soc_controls = 'Spill notification timeliness (NRC reporting); response action documentation; OSRO classification records; cost documentation for OSLTF claims'
WHERE name = 'Marine Pollution Response';

-- B7: Longshoreman & Harbor Worker

UPDATE citizen_catalog SET
  governing_guidelines = '29 CFR Part 1915 (Shipyard Employment); 29 CFR Part 1917 (Marine Terminals); 29 CFR Part 1918 (Longshoring); OSH Act § 5(a) (General Duty Clause)',
  standards_of_creation = 'OSHA FOM inspection documentation; citation and penalty format; abatement verification records',
  soc_controls = 'Inspection record integrity; citation accuracy; employer response documentation; abatement tracking; settlement/contest records'
WHERE name = 'OSHA Maritime Safety';

UPDATE citizen_catalog SET
  governing_guidelines = 'LHWCA 33 USC § 901-950; 20 CFR Part 702 (LHWCA Administration); Extensions: Defense Base Act, Outer Continental Shelf Lands Act, Nonappropriated Fund Instrumentalities Act',
  standards_of_creation = 'LS-202 (Employer''s First Report); LS-203 (Employee''s Claim); LS-18 (Pre-Hearing Statement); ALJ decision format',
  soc_controls = 'Claim file integrity; medical record protection; compensation calculation documentation; employer/insurer reporting compliance; statute of limitations tracking'
WHERE name = 'Longshore%Harbor Workers%Compensation';

-- ============================================================
-- COMMERCIAL TRANSPORTATION (Section C)
-- ============================================================

-- C1: CDL & Driver Qualification

UPDATE citizen_catalog SET
  governing_guidelines = '49 USC § 31136-31149 (Motor Carrier Safety); 49 CFR Part 385 (Safety Fitness); Part 386 (FMCSA Proceedings); Part 390 (General FMCSR); FMCSA Compliance Review procedures',
  standards_of_creation = 'Safety audit report per 49 CFR § 385.3; compliance review report format; safety rating methodology (satisfactory/conditional/unsatisfactory); CSA BASIC scoring',
  soc_controls = 'Investigation documentation integrity; safety rating determination traceability; enforcement action records; out-of-service order documentation'
WHERE name = 'FMCSA Safety Investigator';

UPDATE citizen_catalog SET
  governing_guidelines = '49 CFR Part 383 (CDL Standards); 49 CFR § 383.71-383.73 (Application/testing); § 383.91-383.95 (Knowledge/skills tests); Part 384 (State CDL Compliance); CDLIS',
  standards_of_creation = 'CDL knowledge test standards per Appendix to Part 383; CDL skills test (vehicle inspection, basic controls, road test); CDLIS record format; state CDL application forms',
  soc_controls = 'Test integrity; CDLIS record accuracy; disqualification tracking; endorsement/restriction documentation; interstate compact compliance'
WHERE name = 'CDL Examiner';

UPDATE citizen_catalog SET
  governing_guidelines = '49 CFR Part 391 Subpart E (Physical Qualifications); 49 CFR § 391.41-391.49; NRCME per 49 CFR Part 390.5; FMCSA Medical Review Board guidance',
  standards_of_creation = 'MCSA-5875 (Medical Examination Report); MCSA-5876 (Medical Examiner''s Certificate); NRCME training and testing standards; vision/hearing exemption requirements',
  soc_controls = 'Medical record confidentiality (HIPAA + FMCSA); NRCME reporting requirements; certificate validity tracking; exemption condition monitoring'
WHERE name LIKE 'FMCSA%Medical Examiner%';

UPDATE citizen_catalog SET
  governing_guidelines = '49 CFR Part 391 (Driver Qualifications); 49 CFR § 391.51 (DQ file general requirements); § 391.23 (Previous employment investigation); § 391.25 (Annual inquiry/review); § 391.27 (Record of violations)',
  standards_of_creation = 'Driver qualification file checklist per § 391.51; road test form per § 391.31(e); annual MVR review documentation; previous employer inquiry documentation',
  soc_controls = 'File completeness verification; document retention 3 years after employment per § 391.51(b); annual MVR review tracking; employment history gap analysis'
WHERE name = 'Driver Qualification File';

-- C2: Hours of Service & ELD

UPDATE citizen_catalog SET
  governing_guidelines = '49 CFR Part 395 (Hours of Service); § 395.1 (Scope); § 395.3 (Property-carrying max driving); § 395.5 (Passenger-carrying max driving); § 395.8 (RODS); 49 USC § 31136',
  standards_of_creation = 'RODS grid format per § 395.8; supporting documents per § 395.11; HOS exemption documentation (short-haul, adverse driving)',
  soc_controls = 'RODS accuracy verification; supporting document correlation; exemption eligibility documentation; violation identification and tracking'
WHERE name LIKE 'Hours of Service%Compliance%';

UPDATE citizen_catalog SET
  governing_guidelines = '49 CFR Part 395 Subpart B (ELDs); § 395.22 (Motor carrier responsibilities); § 395.24 (Driver responsibilities); § 395.26 (Data automatically recorded); § 395.30 (Submissions/edits); Appendix A to Subpart B',
  standards_of_creation = 'ELD Technical Specifications per Appendix A; ELD self-certification and FMCSA registry; data transfer standards (Bluetooth, USB, Web); malfunction and diagnostic event documentation',
  soc_controls = 'ELD data integrity (tamper detection); data transfer accuracy; malfunction reporting; unidentified driver profile management; data retention 6 months per § 395.8(k)'
WHERE name LIKE 'ELD%Technical Compliance%';

-- C3: Vehicle Inspection & Maintenance

UPDATE citizen_catalog SET
  governing_guidelines = '49 CFR Part 396 (Inspection/Repair/Maintenance); Part 393 (Parts and Accessories); § 396.9 (Inspection in operation); CVSA North American Standard Inspection Program; CVSA Out-of-Service Criteria',
  standards_of_creation = 'CVSA inspection levels I-VIII; Driver/Vehicle Examination Report form; out-of-service report format; CVSA decal standards',
  soc_controls = 'Inspection report accuracy; out-of-service order documentation; SAFETYNET/MCMIS data entry; violation code accuracy; inspector certification tracking'
WHERE name LIKE 'DOT Roadside Inspector%';

UPDATE citizen_catalog SET
  governing_guidelines = '49 CFR Part 396 (Inspection/Repair/Maintenance); § 396.3; § 396.11 (DVIR); § 396.12 (Periodic inspection); § 396.13 (Driver inspection); § 396.17; Appendix G (Minimum periodic inspection standards)',
  standards_of_creation = 'DVIR format per § 396.11; systematic vehicle maintenance program; annual inspection per Appendix G criteria; brake inspector qualification per § 396.25',
  soc_controls = 'DVIR completion tracking; maintenance schedule compliance; repair documentation chain; annual inspection records; brake inspector qualification records'
WHERE name LIKE 'Fleet Maintenance Manager%';

UPDATE citizen_catalog SET
  governing_guidelines = '23 USC § 127 (Vehicle weight limitations Interstate); 23 CFR Part 658 (Truck Size and Weight); 49 CFR Part 393 Subpart B; state vehicle code weight/dimension limits; STAA provisions',
  standards_of_creation = 'Weigh-in-motion system calibration standards; static scale certification (NTEP/state metrology); size and weight permit formats; overweight citation format',
  soc_controls = 'Scale calibration records; WIM system accuracy documentation; permit tracking; citation records; PrePass/bypass eligibility records'
WHERE name LIKE 'Weigh Station%';

-- C4: Hazmat Transportation

UPDATE citizen_catalog SET
  governing_guidelines = '49 CFR Part 385 Subpart E (Hazmat Safety Permits); Part 397 (Hazmat Driving/Parking); Parts 171-180 (Hazmat Regulations); 49 USC § 5101-5128 (Transportation of Hazmat)',
  standards_of_creation = 'Hazmat safety permit application per § 385.403; route plan per § 397.101; communication plan requirements; PHMSA special permit application',
  soc_controls = 'Permit condition compliance; route plan adherence documentation; communication plan testing; incident reporting per § 171.15-171.16; training record tracking'
WHERE name = 'Hazmat Safety Permit';

UPDATE citizen_catalog SET
  governing_guidelines = '49 CFR Part 172 Subpart H (Training); § 172.704 (Training requirements); § 177.800-177.854 (Carriage by highway); § 172.200 Subpart C (Shipping papers); § 172.300 Subpart D (Marking), E (Labeling), F (Placarding)',
  standards_of_creation = 'Training curriculum per § 172.704 (general awareness, function-specific, safety, security, driver); shipping paper format per § 172.200; hazmat employee training record per § 172.704(d)',
  soc_controls = 'Training record retention 3 years per § 172.704(d); shipping paper accuracy; marking/labeling/placarding verification; security plan documentation per § 172.802'
WHERE name = 'Hazmat Training and Compliance';

-- C5: Drug & Alcohol Testing

UPDATE citizen_catalog SET
  governing_guidelines = '49 CFR Part 40 (DOT Drug and Alcohol Testing); 49 CFR Part 382 (Controlled Substances and Alcohol); 49 USC § 31306; DOT ODAPC rule interpretations',
  standards_of_creation = 'Federal Drug Testing Custody and Control Form (CCF); DOT Alcohol Testing Form (ATF); MRO report format; SAP evaluation format; Drug and Alcohol Clearinghouse query requirements',
  soc_controls = 'Chain of custody integrity; test result confidentiality; Clearinghouse reporting timeliness; random testing rate compliance; SAP referral documentation; return-to-duty testing'
WHERE name LIKE 'Drug and Alcohol Program Manager%';

UPDATE citizen_catalog SET
  governing_guidelines = '49 CFR Part 40 Subpart G (Medical Review Officers); § 40.121-40.165 (MRO responsibilities); SAMHSA Mandatory Guidelines for Federal Workplace Drug Testing; DOT MRO Guidelines',
  standards_of_creation = 'MRO verification report format; split specimen request documentation; verification interview records; dilute specimen handling documentation',
  soc_controls = 'Verification decision documentation; medical information confidentiality; split specimen chain of custody; reporting timeliness; MRO certification currency'
WHERE name LIKE 'Medical Review Officer%MRO%';

-- C6: Freight Brokerage & Cargo

UPDATE citizen_catalog SET
  governing_guidelines = '49 USC § 13904 (Broker registration); 49 CFR Part 371 (Brokers of Property); § 387.307 (Financial responsibility); Part 366 (Process Agent); MAP-21/FAST Act broker provisions',
  standards_of_creation = 'OP-1 (Application for Motor Property Carrier/Broker Authority); BMC-84 (Surety bond) or BMC-85 (Trust fund); BOC-3 (Process Agent); broker-carrier agreement format',
  soc_controls = 'Authority registration currency; surety bond/trust fund sufficiency; carrier vetting documentation; rate confirmation accuracy; payment record keeping'
WHERE name LIKE 'Licensed Freight Broker%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Carmack Amendment 49 USC § 14706; 49 CFR Part 370 (Loss and Damage Claims); Uniform Straight Bill of Lading; NMFC (National Motor Freight Classification)',
  standards_of_creation = 'Claim filing per 49 CFR § 370.3 (minimum requirements); salvage documentation; inspection report format; concealed damage notice requirements',
  soc_controls = 'Claim acknowledgment timeliness (30 days per § 370.5); investigation documentation; disposition timeliness (120 days per § 370.9); payment/denial record keeping'
WHERE name = 'Cargo Claims Adjuster';

-- C7: Railroad Safety

UPDATE citizen_catalog SET
  governing_guidelines = '49 USC § 20101-20167 (Railroad Safety); 49 CFR Part 213 (Track Safety); Part 229 (Locomotive Safety); Part 232 (Brake Systems); Part 238 (Passenger Equipment); Part 240/242 (Engineer/Conductor Certification)',
  standards_of_creation = 'FRA inspection report format (Form FRA F 6180 series); violation report format; civil penalty schedule per Appendix A to Part 209',
  soc_controls = 'Inspection documentation integrity; violation tracking; penalty assessment accuracy; railroad response documentation; abatement tracking'
WHERE name = 'FRA Railroad Safety Inspector';

UPDATE citizen_catalog SET
  governing_guidelines = '49 CFR Part 217 (Operating Rules); Part 218 (Operating Practices); Part 220 (Communications); Part 228 (Hours of Service Railroad); GCOR/NORAC',
  standards_of_creation = 'Operating rulebook format per § 217.9; operational test/inspection per § 217.9(b); hours of service records per Part 228',
  soc_controls = 'Rule book currency verification; operational test documentation; employee qualification records; hours of service compliance tracking'
WHERE name = 'Railroad Operating Rules';

UPDATE citizen_catalog SET
  governing_guidelines = '49 CFR Part 174 (Carriage by Rail); § 174.9 (Safety/security inspection); Parts 171-173 (General/Shipping/Packaging); Part 179 (Tank Car Specs); 49 USC § 20104 (Emergency Orders)',
  standards_of_creation = 'Shipping paper requirements per Part 172; tank car qualification/maintenance per Part 180; train consist per AAR Circular OT-55; emergency response plans for key train routes',
  soc_controls = 'Consist accuracy; routing analysis documentation; tank car qualification records; emergency response plan maintenance; incident reporting per § 171.15-171.16'
WHERE name = 'Railroad Hazmat Compliance';

-- C8: Transit & Rideshare

UPDATE citizen_catalog SET
  governing_guidelines = '49 USC § 5329 (Public Transportation Safety); 49 CFR Part 673 (PTASP); Part 674 (State Safety Oversight); FTA National Public Transportation Safety Plan; MAP-21/FAST Act transit safety',
  standards_of_creation = 'PTASP per 49 CFR Part 673; safety performance targets; hazard identification/risk assessment methodology; accident/incident reporting per NTD',
  soc_controls = 'Safety plan annual review documentation; hazard log maintenance; corrective action tracking; NTD safety data reporting accuracy; SSO audit response documentation'
WHERE name LIKE 'Transit Authority Safety%';

UPDATE citizen_catalog SET
  governing_guidelines = '49 CFR Part 674 (State Safety Oversight); 49 USC § 5329(e) (SSO Program); FTA SSO Program Standard; state-specific SSO program standards',
  standards_of_creation = 'SSO program standard per § 674.27; triennial audit report format; investigation report format; CAP tracking documentation',
  soc_controls = 'Audit finding documentation; investigation report integrity; corrective action tracking; RTSGP certification; annual reporting'
WHERE name LIKE 'State Safety Oversight%';

UPDATE citizen_catalog SET
  governing_guidelines = 'State TNC legislation (CA PUC § 5430-5443); CPUC Decision D.13-09-045 and successors; state insurance requirements for TNCs; municipal operating permits; ADA 49 CFR Part 37',
  standards_of_creation = 'TNC operating permit application (state-specific); driver background check documentation; vehicle inspection certification; annual compliance report per PUC',
  soc_controls = 'Driver background check record integrity; vehicle inspection tracking; insurance coverage verification (period 1/2/3); incident reporting; accessibility compliance documentation'
WHERE name LIKE 'TNC%Compliance%';

-- C9: Intermodal & Cross-Sector

UPDATE citizen_catalog SET
  governing_guidelines = '49 CFR Part 396 Subpart D (Intermodal Equipment Providers); § 396.60-396.64; MAP-21 IEP provisions; FMCSA IEP registration requirements',
  standards_of_creation = 'IEP systematic inspection and maintenance program per § 396.60; driver pre-trip inspection report per § 396.62; IEP registration/annual filing',
  soc_controls = 'Inspection and maintenance program documentation; pre-trip report tracking; roadside inspection result tracking; IEP-carrier responsibility documentation'
WHERE name LIKE 'Intermodal Equipment Provider%';

UPDATE citizen_catalog SET
  governing_guidelines = '49 CFR Part 192 (Natural Gas Pipeline); Part 195 (Hazardous Liquids Pipeline); Part 199 (Drug and Alcohol Testing); 49 USC § 60101-60141 (Pipeline Safety); Pipeline Safety Improvement Act of 2002',
  standards_of_creation = 'Integrity management program per § 192.903-192.951; Operator Qualification program per Part 192 Subpart N; PHMSA Form 7000-1 (Accident/Incident Report)',
  soc_controls = 'Inspection record integrity; IMP documentation; OQ records; accident/incident reporting; anomaly assessment documentation'
WHERE name LIKE 'PHMSA Pipeline Safety%';

-- ============================================================
-- END OF FILE: 200 personas updated
-- ============================================================

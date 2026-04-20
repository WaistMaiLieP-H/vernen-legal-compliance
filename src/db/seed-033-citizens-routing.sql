-- Seed 033: ~/citizens/ Directory → Platform Routing Engine
-- Registers all 40+ ~/citizens/ directory Citizens into:
--   1. citizen_catalog (identity + domain)
--   2. citizen_skills  (primary audit skill per citizen)
--   3. citizen_routing_index (document type → citizen O(1) routing)
--
-- Run via db.batch([db.prepare("...")]) per statement — NOT db.exec().
-- Naming: citizen_name in DB = folder name from ~/citizens/ directory.
-- doc_type format: hyphenated to match CUSTOS NAICS_ROUTING keys.
--
-- Created: 2026-04-20

-- =============================================================================
-- 1. CITIZEN CATALOG — Identity Registration
-- =============================================================================

INSERT OR IGNORE INTO citizen_catalog (id, name, trademark, domain, industry, category, description, derivation, workers, governance_type, capabilities)
VALUES
  ('cat-ca-family-law', 'CA_Family_Law_Litigator', 'CA Family Law Litigator™', 'California Family Law', 'LEGAL', 'California Litigation', 'Family dissolution, custody, support, DVRO, and domestic relations under California Family Code', 'Licensed attorney-level competency in CA Family Code §§ 2000–7900', '[]', 'INDEPENDENT', '["dvro-audit","fl-form-audit","custody-audit","dissolution-audit"]'),
  ('cat-ca-criminal', 'CA_Criminal_Law_Specialist', 'CA Criminal Law Specialist™', 'California Criminal Law', 'LEGAL', 'California Litigation', 'Criminal defense, prosecution standards, Brady/Pitchess, Penal Code compliance', 'CA Penal Code §§ 1–34000 + Fed. R. Crim. P.', '[]', 'INDEPENDENT', '["criminal-complaint-audit","warrant-audit","pitchess-audit"]'),
  ('cat-ca-labor', 'CA_Labor_Employment_Litigator', 'CA Labor Employment Litigator™', 'California Labor & Employment', 'LEGAL', 'California Litigation', 'Wage claims, DLSE hearings, FEHA/EEOC charges, wrongful termination, CFRA/FMLA', 'CA Labor Code + FEHA Gov. Code § 12900 et seq.', '[]', 'INDEPENDENT', '["wage-claim-audit","eeoc-charge-audit","feha-audit"]'),
  ('cat-ca-workers-comp', 'CA_Workers_Compensation_Litigator', 'CA Workers Compensation Litigator™', 'California Workers Compensation', 'LEGAL', 'California Litigation', 'WCAB proceedings, QME/AME disputes, DWC forms, permanent disability ratings', 'CA Labor Code §§ 3200–6002; 8 CCR §§ 10300–10999', '[]', 'INDEPENDENT', '["wcab-audit","dwc-form-audit","qme-audit"]'),
  ('cat-ca-civil', 'CA_Civil_Litigator', 'CA Civil Litigator™', 'California Civil Litigation', 'LEGAL', 'California Litigation', 'General civil complaints, motions, discovery, summary judgment, appeals', 'Cal. CCP §§ 335–1062; Cal. Rules of Court', '[]', 'INDEPENDENT', '["civil-complaint-audit","motion-audit","judgment-audit"]'),
  ('cat-ca-discovery', 'CA_Discovery_Specialist', 'CA Discovery Specialist™', 'California Discovery', 'LEGAL', 'California Litigation', 'Subpoenas, interrogatories, RFA, RFP, depositions, privilege logs, protective orders', 'Cal. CCP §§ 2016.010–2036.050', '[]', 'INDEPENDENT', '["subpoena-audit","discovery-audit"]'),
  ('cat-ca-consumer', 'CA_Consumer_Protection_Litigator', 'CA Consumer Protection Litigator™', 'California Consumer Protection', 'LEGAL', 'California Litigation', 'UCL, CLRA, CCPA, FTC Act, auto dealer fraud, lemon law', 'Bus. & Prof. Code §§ 17200–17210; Civil Code §§ 1750–1784', '[]', 'INDEPENDENT', '["ucl-audit","clra-audit","consumer-complaint-audit"]'),
  ('cat-ca-med-mal', 'CA_Medical_Malpractice_Litigator', 'CA Medical Malpractice Litigator™', 'California Medical Malpractice', 'LEGAL', 'California Litigation', 'Medical negligence, MICRA, expert declarations, standard of care analysis', 'MICRA (CCP § 340.5); Health & Safety Code § 1280', '[]', 'INDEPENDENT', '["medical-malpractice-audit","medical-record-audit"]'),
  ('cat-ca-med-privacy', 'CA_Medical_Privacy_Officer', 'CA Medical Privacy Officer™', 'California Medical Privacy', 'LEGAL', 'California Compliance', 'HIPAA, CMIA, PHI breach notifications, medical record access rights', 'HIPAA 45 CFR §§ 160-164; Cal. Civil Code § 56 et seq. (CMIA)', '[]', 'INDEPENDENT', '["hipaa-audit","cmia-audit","phi-audit"]'),
  ('cat-ca-real-estate', 'CA_Real_Estate_Attorney', 'CA Real Estate Attorney™', 'California Real Estate', 'LEGAL', 'California Litigation', 'Deeds, title disputes, UD proceedings, mechanics liens, DRE compliance', 'Cal. Civil Code §§ 1006–1095; CCP §§ 1159–1179a', '[]', 'INDEPENDENT', '["deed-audit","ud-audit","real-estate-disclosure-audit"]'),
  ('cat-ca-telecom', 'CA_Telecom_Privacy_Litigator', 'CA Telecom Privacy Litigator™', 'California Telecom & Privacy', 'LEGAL', 'California Litigation', 'SIM swap fraud, CPUC complaints, CIPA violations, ECPA, wiretap', 'CIPA (Penal Code §§ 630–638.55); CPUC Pub. Util. Code § 2891', '[]', 'INDEPENDENT', '["sim-swap-audit","cpuc-audit","wiretap-audit"]'),
  ('cat-ca-victim-comp', 'CA_Victim_Compensation_Litigator', 'CA Victim Compensation Litigator™', 'California Victim Compensation', 'LEGAL', 'California Litigation', 'CalVCB applications, restitution orders, victim advocate letters', 'Cal. Gov. Code §§ 13950–13965', '[]', 'INDEPENDENT', '["calvcb-audit","victim-declaration-audit"]'),
  ('cat-ca-mental-health', 'CA_Mental_Health_Litigator', 'CA Mental Health Litigator™', 'California Mental Health Law', 'LEGAL', 'California Litigation', '5150/5250 holds, LPS conservatorship, Riese hearings, DMH proceedings', 'Cal. WIC §§ 5150–5250; LPS Act §§ 5000–5550', '[]', 'INDEPENDENT', '["5150-audit","5250-audit","lps-audit"]'),
  ('cat-ca-elder', 'CA_Elder_Law_Litigator', 'CA Elder Law Litigator™', 'California Elder Law', 'LEGAL', 'California Litigation', 'Elder abuse, APS reports, nursing home violations, elder financial fraud', 'Cal. WIC §§ 15600–15675 (EADACPA)', '[]', 'INDEPENDENT', '["elder-abuse-audit","aps-audit"]'),
  ('cat-ca-probate', 'CA_Probate_Conservatorship_Litigator', 'CA Probate Conservatorship Litigator™', 'California Probate & Conservatorship', 'LEGAL', 'California Litigation', 'Conservatorship petitions, probate proceedings, letters, wills, trust disputes', 'Cal. Probate Code §§ 1000–21705', '[]', 'INDEPENDENT', '["conservatorship-audit","probate-audit","will-audit"]'),
  ('cat-ca-conservator-inv', 'CA_Conservator_Investigator', 'CA Conservator Investigator™', 'California Conservatorship Investigation', 'LEGAL', 'California Investigation', 'Forensic investigation of conservatorship proceedings, letters validity, secret conservatorship detection', 'Cal. Probate Code §§ 1821–1830; LPS Act §§ 5350–5371', '[]', 'INDEPENDENT', '["conservatorship-investigation-audit","letters-validity-audit"]'),
  ('cat-ca-disability', 'CA_Disability_Rights_Litigator', 'CA Disability Rights Litigator™', 'California Disability Rights', 'LEGAL', 'California Litigation', 'ADA Title II/III, § 504, Unruh Act, DDS proceedings, accommodation disputes', 'ADA 42 USC §§ 12101–12213; Unruh Act Civil Code § 51', '[]', 'INDEPENDENT', '["ada-audit","accommodation-audit","unruh-audit"]'),
  ('cat-ca-immigration', 'CA_Immigration_Litigator', 'CA Immigration Litigator™', 'California Immigration', 'LEGAL', 'California Litigation', 'Asylum, removal defense, USCIS forms, naturalization, DACA', '8 USC §§ 1101–1537; 8 CFR §§ 100–1400', '[]', 'INDEPENDENT', '["asylum-audit","removal-audit","uscis-form-audit"]'),
  ('cat-ca-vehicle', 'CA_Vehicle_Code_Specialist', 'CA Vehicle Code Specialist™', 'California Vehicle Code', 'LEGAL', 'California Compliance', 'Traffic citations, DMV hearings, SR-22, license suspensions, accident reports', 'Cal. Vehicle Code §§ 1–42002', '[]', 'INDEPENDENT', '["traffic-citation-audit","dmv-audit","sr22-audit"]'),
  ('cat-ca-admin-law', 'CA_Administrative_Law_Specialist', 'CA Administrative Law Specialist™', 'California Administrative Law', 'LEGAL', 'California Litigation', 'OAH hearings, administrative complaints, agency appeals, ALJ decisions', 'Cal. Gov. Code §§ 11500–11529 (APA)', '[]', 'INDEPENDENT', '["oah-audit","administrative-appeal-audit"]'),
  ('cat-ca-healthcare-fraud', 'CA_Healthcare_Fraud_Litigator', 'CA Healthcare Fraud Litigator™', 'California Healthcare Fraud', 'LEGAL', 'California Litigation', 'Medical billing fraud, Medi-Cal upcoding, CMS-1500/UB-04 analysis, False Claims Act', '18 USC § 1347; 31 USC § 3729; Cal. Gov. Code § 12650', '[]', 'INDEPENDENT', '["billing-fraud-audit","medi-cal-audit","cms1500-audit"]'),
  ('cat-ca-civil-rights', 'CA_Civil_Rights_Litigator', 'CA Civil Rights Litigator™', 'California Civil Rights', 'LEGAL', 'California Litigation', 'Bane Act, Ralph Act, Unruh Act, FEHA, § 1983 state-level claims', 'Cal. Civil Code §§ 51–52.5; Cal. Gov. Code § 12900 et seq.', '[]', 'INDEPENDENT', '["bane-act-audit","civil-rights-complaint-audit"]'),
  ('cat-ca-civil-rights-compliance', 'CA_Civil_Rights_Compliance_Specialist', 'CA Civil Rights Compliance Specialist™', 'California Civil Rights Compliance', 'LEGAL', 'California Compliance', 'Title II/III ADA audits, EEO reporting, organizational civil rights compliance', 'ADA; FEHA; Title VI/VII', '[]', 'INDEPENDENT', '["civil-rights-compliance-audit","eeo-report-audit"]'),
  ('cat-ca-constitutional', 'CA_Constitutional_Law_Specialist', 'CA Constitutional Law Specialist™', 'California Constitutional Law', 'LEGAL', 'California Litigation', 'Writs of mandate, constitutional challenges, appellate briefs, amicus', 'Cal. Const. Art. I–XXXV; CCP §§ 1085–1094.8', '[]', 'INDEPENDENT', '["writ-of-mandate-audit","constitutional-challenge-audit"]'),
  ('cat-ca-first-amendment', 'CA_First_Amendment_Litigator', 'CA First Amendment Litigator™', 'California First Amendment', 'LEGAL', 'California Litigation', 'Free speech, PRA complaints, CPRA requests, prior restraint, defamation', 'Cal. Const. Art. I §§ 2–3; Gov. Code § 7920 et seq. (CPRA)', '[]', 'INDEPENDENT', '["pra-complaint-audit","prior-restraint-audit","cpra-audit"]'),
  ('cat-ca-product-liability', 'CA_Product_Liability_Litigator', 'CA Product Liability Litigator™', 'California Product Liability', 'LEGAL', 'California Litigation', 'Strict liability, negligence, CPSC recalls, defective product claims', 'Greenman v. Yuba Power (1963); Cal. Civil Code § 1714', '[]', 'INDEPENDENT', '["product-liability-audit","recall-audit"]'),
  ('cat-ca-forensic-doc', 'CA_Forensic_Document_Specialist', 'CA Forensic Document Specialist™', 'Forensic Document Examination', 'LEGAL', 'California Forensics', 'Universal forensic document examiner: all document types, all jurisdictions, authentication, fraud detection', 'Cal. Evid. Code §§ 1400–1454; Fed. R. Evid. 901–903', '[]', 'INDEPENDENT', '["forensic-document-audit"]'),
  ('cat-ca-records-auth', 'CA_Records_Authentication_Specialist', 'CA Records Authentication Specialist™', 'Records Authentication', 'LEGAL', 'California Forensics', 'Universal records authenticator: public records, court records, chain of custody, certification', 'Cal. Evid. Code §§ 1530–1560; Gov. Code §§ 6250–6276 (CPRA)', '[]', 'INDEPENDENT', '["records-authentication-audit"]'),
  ('cat-ca-building', 'CA_Building_Official', 'CA Building Official™', 'California Building & Construction', 'LEGAL', 'California Compliance', 'Building permits, code enforcement, stop-work orders, certificates of occupancy', 'Cal. Health & Safety Code § 19825; CBC § 105.1', '[]', 'INDEPENDENT', '["building-permit-audit","code-enforcement-audit"]'),
  ('cat-ca-structural-eng', 'CA_Structural_Engineer', 'CA Structural Engineer™', 'California Structural Engineering', 'ENGINEERING', 'California Compliance', 'Structural reports, seismic analysis, soils reports, engineering declarations', 'Cal. Bus. & Prof. Code §§ 6700–6799; Field Act; Riley Act', '[]', 'INDEPENDENT', '["structural-report-audit","seismic-audit"]'),
  ('cat-ca-contractor', 'CA_Licensed_Contractor', 'CA Licensed Contractor™', 'California Contracting', 'LEGAL', 'California Compliance', 'CSLB licensing, mechanics liens, contractor agreements, notice of completion', 'Cal. Bus. & Prof. Code §§ 7000–7191 (CSLL)', '[]', 'INDEPENDENT', '["mechanics-lien-audit","cslb-audit"]'),
  ('cat-ca-ceqa', 'CA_CEQA_Consultant', 'CA CEQA Consultant™', 'California Environmental', 'LEGAL', 'California Compliance', 'CEQA documents, EIRs, negative declarations, notices of determination', 'Cal. Pub. Resources Code §§ 21000–21189.57; 14 CCR §§ 15000–15387', '[]', 'INDEPENDENT', '["ceqa-audit","eir-audit"]'),
  ('cat-ca-energy', 'CA_Energy_Policy_Specialist', 'CA Energy Policy Specialist™', 'California Energy Policy', 'LEGAL', 'California Compliance', 'CPUC filings, utility tariffs, net metering, energy contracts', 'Cal. Pub. Util. Code §§ 451–762; CPUC General Orders', '[]', 'INDEPENDENT', '["cpuc-filing-audit","energy-contract-audit"]'),
  ('cat-ca-food-safety', 'CA_Food_Safety_Specialist', 'CA Food Safety Specialist™', 'California Food Safety', 'LEGAL', 'California Compliance', 'CDFA reports, FDA complaints, food facility permits, recall notices', 'Cal. Health & Safety Code §§ 113700–114437 (Retail Food Code)', '[]', 'INDEPENDENT', '["food-safety-audit","cdfa-audit"]'),
  ('cat-ca-retail-food', 'CA_Retail_Food_Inspector', 'CA Retail Food Inspector™', 'California Retail Food', 'LEGAL', 'California Compliance', 'Restaurant inspection reports, health code violations, permit compliance', 'Cal. Health & Safety Code § 113700 et seq.', '[]', 'INDEPENDENT', '["restaurant-inspection-audit","health-code-audit"]'),
  ('cat-ca-weights', 'CA_Weights_Measures_Inspector', 'CA Weights Measures Inspector™', 'California Weights & Measures', 'LEGAL', 'California Compliance', 'Scale certifications, measurement violations, CDFA weights and measures reports', 'Cal. Bus. & Prof. Code §§ 12001–12107', '[]', 'INDEPENDENT', '["weights-measures-audit","scale-certification-audit"]'),
  ('cat-us-fed-civil-rights', 'US_Federal_Civil_Rights_Litigator', 'US Federal Civil Rights Litigator™', 'US Federal Civil Rights', 'LEGAL', 'Federal Litigation', '42 USC § 1983 complaints, Title VI/VII, federal civil rights filings, NDCA and 9th Circuit', '42 USC §§ 1983–1988; 28 USC § 1331', '[]', 'INDEPENDENT', '["section-1983-audit","federal-civil-rights-audit"]'),
  ('cat-us-fed-ssa', 'US_Federal_Social_Security_Litigator', 'US Federal Social Security Litigator™', 'US Federal Social Security', 'LEGAL', 'Federal Litigation', 'SSDI/SSI claims, ALJ hearings, SSA denials and appeals, 42 USC § 405(g)', '42 USC §§ 401–434; 20 CFR §§ 404.900–999', '[]', 'INDEPENDENT', '["ssdi-audit","ssa-denial-audit","alj-decision-audit"]'),
  ('cat-us-fed-erisa', 'US_Federal_ERISA_Litigator', 'US Federal ERISA Litigator™', 'US Federal ERISA', 'LEGAL', 'Federal Litigation', 'Pension disputes, plan documents, benefit denials, Form 5500, ERISA § 502 actions', '29 USC §§ 1001–1461 (ERISA)', '[]', 'INDEPENDENT', '["erisa-audit","pension-audit","plan-document-audit"]'),
  ('cat-us-fed-financial-fraud', 'US_Federal_Financial_Fraud_Litigator', 'US Federal Financial Fraud Litigator™', 'US Federal Financial Fraud', 'LEGAL', 'Federal Litigation', 'Wire fraud, bank fraud, identity theft, forensic accounting, SAR analysis', '18 USC §§ 1341, 1343, 1347; 31 USC § 5318', '[]', 'INDEPENDENT', '["financial-fraud-audit","wire-fraud-audit","sar-audit"]'),
  ('cat-us-fed-housing', 'US_Federal_Housing_Litigator', 'US Federal Housing Litigator™', 'US Federal Housing', 'LEGAL', 'Federal Litigation', 'FHA complaints, HUD filings, fair housing discrimination charges', '42 USC §§ 3601–3619 (Fair Housing Act)', '[]', 'INDEPENDENT', '["fha-audit","hud-audit","fair-housing-audit"]'),
  ('cat-us-fed-tax', 'US_Federal_Tax_Litigator', 'US Federal Tax Litigator™', 'US Federal Tax', 'LEGAL', 'Federal Litigation', 'IRS notices, Tax Court petitions, offers in compromise, IRS liens/levies', '26 USC (IRC); 28 USC § 7441 (Tax Court)', '[]', 'INDEPENDENT', '["irs-notice-audit","tax-court-audit","irs-lien-audit"]'),
  ('cat-ca-tax', 'CA_Tax_Specialist', 'CA Tax Specialist™', 'California Tax', 'LEGAL', 'California Compliance', 'FTB notices, CDTFA filings, state tax audits and appeals', 'Cal. Rev. & Tax. Code; Cal. Gov. Code § 15570 et seq.', '[]', 'INDEPENDENT', '["ftb-audit","cdtfa-audit","state-tax-audit"]'),
  ('cat-ca-insurance', 'CA_Insurance_Compliance_Litigator', 'CA Insurance Compliance Litigator™', 'California Insurance', 'LEGAL', 'California Litigation', 'Bad faith claims, CDI complaints, coverage disputes, unfair claims practices', 'Cal. Ins. Code §§ 790–790.15; 10 CCR § 2695', '[]', 'INDEPENDENT', '["insurance-claim-audit","bad-faith-audit","cdi-complaint-audit"]'),
  ('cat-ca-law-enforcement', 'CA_Law_Enforcement_Procedures_Specialist', 'CA Law Enforcement Procedures Specialist™', 'California Law Enforcement', 'LEGAL', 'California Forensics', 'Internal affairs, use of force, booking records, Brady lists, Pitchess procedures', 'Cal. Penal Code §§ 832.5–832.8; Gov. Code §§ 3300–3313 (POBRA)', '[]', 'INDEPENDENT', '["internal-affairs-audit","use-of-force-audit","booking-audit"]');


-- =============================================================================
-- 2. CITIZEN SKILLS — Primary Audit Skill per Citizen
-- =============================================================================

INSERT OR IGNORE INTO citizen_skills (id, citizen_name, skill_slug, name, description, skill_type, governing_standards, audit_triggers, output_protocol, version, is_active, installed_at)
VALUES
  ('skill-fl-001', 'CA_Family_Law_Litigator', 'family-law-document-audit', 'California Family Law Document Audit', 'Audits family law filings, orders, and domestic relations documents for CA Family Code compliance, DVPA requirements, and procedural integrity', 'AUDIT', '["CA Family Code §§ 2000-7900","CRC Rules 5.1-5.500","DVPA §§ 6200-6460"]', '["dvro","fl-form","ex-parte","fl-305","fl-150","fl-310","fl-300","fl-311","fl-341","temporary-orders","dissolution-filing","stipulation","custody-order","visitation-order","child-support-order","paternity-filing"]', 'CA_FAMILY_LAW_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-crim-001', 'CA_Criminal_Law_Specialist', 'criminal-law-document-audit', 'California Criminal Law Document Audit', 'Audits criminal complaints, warrants, motions, and plea agreements for CA Penal Code compliance, Brady/Giglio obligations, and constitutional requirements', 'AUDIT', '["CA Penal Code §§ 806-821","Brady v. Maryland 373 US 83","CA Penal Code § 1054.1"]', '["criminal-complaint","arrest-warrant","search-warrant","indictment","information","plea-agreement","pitchess-motion","brady-demand","motion-to-suppress","section-1001-petition","criminal-appeal"]', 'CA_CRIMINAL_LAW_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-labor-001', 'CA_Labor_Employment_Litigator', 'labor-employment-document-audit', 'California Labor & Employment Document Audit', 'Audits employment contracts, EEOC charges, DFEH complaints, and wage claims for CA Labor Code and FEHA compliance', 'AUDIT', '["CA Labor Code §§ 98-98.7","FEHA Gov. Code § 12960","42 USC § 2000e-5","29 CFR § 1601.9"]', '["employment-contract","wage-claim","eeoc-charge","dfeh-complaint","crd-complaint","wrongful-termination-complaint","wage-theft-claim","fmla-cfra-form","union-grievance","retaliation-claim"]', 'CA_LABOR_EMPLOYMENT_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-wc-001', 'CA_Workers_Compensation_Litigator', 'workers-compensation-document-audit', 'California Workers Compensation Document Audit', 'Audits DWC forms, WCAB petitions, QME reports, and benefit claims for CA Labor Code and 8 CCR compliance', 'AUDIT', '["CA Labor Code § 5401","CA Labor Code §§ 4060-4067","8 CCR §§ 10300-10999"]', '["dwc-1-form","wcab-petition","wcab-form","qme-report","panel-qme-request","work-status-report","wage-loss-claim","td-benefit-claim","pd-rating","compromise-and-release"]', 'CA_WORKERS_COMP_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-civil-001', 'CA_Civil_Litigator', 'civil-litigation-document-audit', 'California Civil Litigation Document Audit', 'Audits civil complaints, motions, and judgments for CA CCP compliance, pleading standards, and procedural requirements', 'AUDIT', '["Cal. CCP §§ 335-1062","Cal. Rules of Court"]', '["civil-complaint","answer","cross-complaint","demurrer","motion-to-strike","motion-for-summary-judgment","writ-of-execution","notice-of-appeal","appellate-brief"]', 'CA_CIVIL_LITIGATION_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-disc-001', 'CA_Discovery_Specialist', 'discovery-document-audit', 'California Discovery Document Audit', 'Audits subpoenas, interrogatories, RFAs, and deposition notices for CA CCP discovery compliance', 'AUDIT', '["Cal. CCP §§ 2016.010-2036.050"]', '["subpoena","subpoena-duces-tecum","interrogatories","request-for-admission","request-for-production","deposition-notice","privilege-log","protective-order","discovery-motion"]', 'CA_DISCOVERY_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-consumer-001', 'CA_Consumer_Protection_Litigator', 'consumer-protection-document-audit', 'California Consumer Protection Document Audit', 'Audits UCL/CLRA demands, FTC complaints, and consumer protection filings for CA Business & Professions Code compliance', 'AUDIT', '["Bus. & Prof. Code §§ 17200-17210","Civil Code §§ 1750-1784","Cal. Vehicle Code § 11713.18"]', '["consumer-complaint","dca-complaint","ftc-complaint","ucl-complaint","clra-demand","lemon-law-filing","auto-dealer-complaint"]', 'CA_CONSUMER_PROTECTION_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-medmal-001', 'CA_Medical_Malpractice_Litigator', 'medical-malpractice-document-audit', 'California Medical Malpractice Document Audit', 'Audits medical records, malpractice complaints, and expert declarations for MICRA compliance and standard of care requirements', 'AUDIT', '["MICRA CCP § 340.5","Cal. Health & Safety Code § 1280","Cal. Civil Code § 3333.2"]', '["medical-record","medical-malpractice-complaint","surgical-report","operative-report","hospital-discharge-summary","radiology-report","pathology-report","disability-evaluation"]', 'CA_MEDICAL_MALPRACTICE_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-medpriv-001', 'CA_Medical_Privacy_Officer', 'medical-privacy-document-audit', 'California Medical Privacy Document Audit', 'Audits HIPAA releases, PHI disclosures, and breach notifications for HIPAA and CMIA compliance', 'AUDIT', '["HIPAA 45 CFR §§ 160-164","Cal. Civil Code § 56 et seq. (CMIA)","HITECH Act § 13402"]', '["hipaa-release","medical-authorization","phi-disclosure-log","breach-notification","cmia-complaint"]', 'CA_MEDICAL_PRIVACY_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-re-001', 'CA_Real_Estate_Attorney', 'real-estate-document-audit', 'California Real Estate Document Audit', 'Audits deeds, purchase agreements, leases, and UD complaints for CA Civil Code and CCP compliance', 'AUDIT', '["Cal. Civil Code §§ 1006-1095","Cal. CCP §§ 1159-1179a","Cal. Gov. Code § 27201"]', '["deed","grant-deed","trust-deed","purchase-agreement","escrow-instruction","title-report","residential-lease","notice-to-quit","unlawful-detainer-complaint","real-estate-disclosure","mechanics-lien"]', 'CA_REAL_ESTATE_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-telecom-001', 'CA_Telecom_Privacy_Litigator', 'telecom-privacy-document-audit', 'California Telecom & Privacy Document Audit', 'Audits SIM swap complaints, phone records, CPUC filings, and wiretap complaints for CIPA and CPUC compliance', 'AUDIT', '["CIPA Penal Code §§ 630-638.55","47 USC § 222","Cal. Pub. Util. Code § 2891","47 CFR § 64.2010"]', '["phone-record","call-log","sim-swap-complaint","carrier-disclosure","cpuc-complaint","fcc-complaint","wiretap-complaint","geolocation-record","cipa-complaint"]', 'CA_TELECOM_PRIVACY_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-vc-001', 'CA_Victim_Compensation_Litigator', 'victim-compensation-document-audit', 'California Victim Compensation Document Audit', 'Audits CalVCB applications, victim declarations, and restitution orders for Gov. Code §§ 13950-13965 compliance', 'AUDIT', '["Cal. Gov. Code §§ 13950-13965","Cal. Penal Code § 679.026"]', '["calvcb-application","victim-comp-form","victim-declaration","restitution-order","calvcb-appeal","victim-advocate-letter","vcgcb-form"]', 'CA_VICTIM_COMPENSATION_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-mh-001', 'CA_Mental_Health_Litigator', 'mental-health-document-audit', 'California Mental Health Document Audit', 'Audits 5150/5250 holds, LPS conservatorship petitions, and psychiatric evaluations for WIC compliance', 'AUDIT', '["Cal. WIC § 5150","Cal. WIC § 5250","LPS Act §§ 5000-5550"]', '["5150-hold","5250-hold","mental-health-record","psychiatric-evaluation","lps-conservatorship","mental-health-court-filing","voluntary-admission"]', 'CA_MENTAL_HEALTH_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-elder-001', 'CA_Elder_Law_Litigator', 'elder-law-document-audit', 'California Elder Law Document Audit', 'Audits elder abuse reports, APS filings, and nursing home complaints for EADACPA compliance', 'AUDIT', '["Cal. WIC §§ 15600-15675 (EADACPA)","Cal. Penal Code §§ 368, 368.5"]', '["elder-abuse-report","adult-protective-services-report","elder-abuse-complaint","conservatorship-petition","nursing-home-complaint"]', 'CA_ELDER_LAW_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-probate-001', 'CA_Probate_Conservatorship_Litigator', 'probate-conservatorship-document-audit', 'California Probate & Conservatorship Document Audit', 'Audits conservatorship petitions, letters, wills, and probate filings for CA Probate Code compliance', 'AUDIT', '["Cal. Probate Code §§ 1800-1897","Cal. Probate Code § 1821","Cal. Probate Code § 1830"]', '["conservatorship-petition","probate-petition","letters-conservatorship","letters-testamentary","will","inventory-appraisal","accounting","capacity-declaration","court-investigator-report"]', 'CA_PROBATE_CONSERVATORSHIP_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-ci-001', 'CA_Conservator_Investigator', 'conservatorship-investigation-audit', 'Conservatorship Investigation Audit', 'Forensic investigation of conservatorship legitimacy, letters validity, secret conservatorship detection, and jurisdictional basis', 'AUDIT', '["Cal. Probate Code §§ 1821-1830","LPS Act §§ 5350-5371","Cal. Probate Code § 2750"]', '["conservatorship-petition","letters-conservatorship","capacity-declaration","court-investigator-report","financial-account-record"]', 'CA_CONSERVATOR_INVESTIGATION_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-dr-001', 'CA_Disability_Rights_Litigator', 'disability-rights-document-audit', 'California Disability Rights Document Audit', 'Audits ADA, § 504, and Unruh Act complaints and accommodation requests', 'AUDIT', '["42 USC §§ 12131-12134 (ADA Title II)","42 USC §§ 12181-12189 (ADA Title III)","Cal. Civil Code § 51 (Unruh)"]', '["ada-complaint","section-504-complaint","accommodation-request","disability-discrimination-charge"]', 'CA_DISABILITY_RIGHTS_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-imm-001', 'CA_Immigration_Litigator', 'immigration-document-audit', 'California Immigration Document Audit', 'Audits USCIS forms, asylum applications, removal orders, and immigration court filings for INA compliance', 'AUDIT', '["8 USC §§ 1101-1537","8 CFR §§ 100-1400","INA § 208"]', '["i-485","i-130","i-765","i-589","i-751","uscis-notice","immigration-court-filing","asylum-application","removal-order","naturalization-application"]', 'CA_IMMIGRATION_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-vc2-001', 'CA_Vehicle_Code_Specialist', 'vehicle-code-document-audit', 'California Vehicle Code Document Audit', 'Audits traffic citations, DMV records, license suspensions, and SR-22 filings for CVC compliance', 'AUDIT', '["Cal. Vehicle Code §§ 1-42002","Cal. Gov. Code § 11500 (DMV hearings)"]', '["traffic-citation","dmv-record","dmv-suspension-notice","sr-22","vehicle-registration","title-document","dmv-hearing-request"]', 'CA_VEHICLE_CODE_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-admin-001', 'CA_Administrative_Law_Specialist', 'administrative-law-document-audit', 'California Administrative Law Document Audit', 'Audits OAH filings, administrative complaints, and agency appeals for CA APA compliance', 'AUDIT', '["Cal. Gov. Code §§ 11500-11529 (APA)","Cal. Gov. Code § 11523"]', '["oah-filing","administrative-complaint","oah-notice-of-hearing","oah-proposed-decision","administrative-subpoena","administrative-appeal"]', 'CA_ADMINISTRATIVE_LAW_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-hcf-001', 'CA_Healthcare_Fraud_Litigator', 'healthcare-fraud-document-audit', 'California Healthcare Fraud Document Audit', 'Audits medical billing records, CMS-1500 forms, and Medi-Cal claims for False Claims Act and 18 USC § 1347 violations', 'AUDIT', '["18 USC § 1347","31 USC § 3729 (FCA)","Cal. Gov. Code § 12650","42 USC § 1320a-7b(a)"]', '["medical-billing-record","medicare-billing-record","medi-cal-claim","cms-1500","ub-04"]', 'CA_HEALTHCARE_FRAUD_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-cr-001', 'CA_Civil_Rights_Litigator', 'california-civil-rights-document-audit', 'California Civil Rights Document Audit', 'Audits Bane Act, Ralph Act, and Unruh Act complaints for CA civil rights compliance', 'AUDIT', '["Cal. Civil Code §§ 51-52.5","Cal. Civil Code § 51.7 (Ralph Act)","Cal. Civil Code § 52.1 (Bane Act)"]', '["bane-act-complaint","unruh-act-complaint","civil-rights-court-filing","dfeh-complaint","crd-complaint"]', 'CA_CIVIL_RIGHTS_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-const-001', 'CA_Constitutional_Law_Specialist', 'constitutional-law-document-audit', 'California Constitutional Law Document Audit', 'Audits writs of mandate, constitutional challenges, and appellate briefs for CA Const. and CCP compliance', 'AUDIT', '["Cal. Const. Art. I","Cal. CCP §§ 1085-1094.8"]', '["petition-for-writ","writ-of-mandate","writ-of-prohibition","demurrer-constitutional","appellate-brief","amicus-brief"]', 'CA_CONSTITUTIONAL_LAW_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-fa-001', 'CA_First_Amendment_Litigator', 'first-amendment-document-audit', 'California First Amendment Document Audit', 'Audits PRA/CPRA requests, free speech filings, and defamation complaints for First Amendment compliance', 'AUDIT', '["Cal. Const. Art. I §§ 2-3","Cal. Gov. Code § 7920 et seq. (CPRA)"]', '["public-records-request","pra-complaint","first-amendment-complaint","prior-restraint-challenge","defamation-complaint"]', 'CA_FIRST_AMENDMENT_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-pl-001', 'CA_Product_Liability_Litigator', 'product-liability-document-audit', 'California Product Liability Document Audit', 'Audits product liability complaints, CPSC recall notices, and expert reports for strict liability compliance', 'AUDIT', '["Cal. Civil Code § 1714","Greenman v. Yuba Power (1963)","15 USC § 2064 (CPSC)"]', '["product-liability-complaint","recall-notice","cpsc-complaint","defective-product-claim"]', 'CA_PRODUCT_LIABILITY_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-foren-001', 'CA_Forensic_Document_Specialist', 'forensic-document-authentication-audit', 'Forensic Document Authentication Audit', 'Universal forensic examination of any document type for authentication, anti-dating, forgery, and chain of custody', 'AUDIT', '["Cal. Evid. Code §§ 1400-1454","Fed. R. Evid. 901-903","Cal. Penal Code § 134"]', '["*"]', 'CA_FORENSIC_DOCUMENT_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-auth-001', 'CA_Records_Authentication_Specialist', 'records-authentication-audit', 'Records Authentication Audit', 'Universal records authentication: public records, court records, chain of custody verification, certified copy standards', 'AUDIT', '["Cal. Evid. Code §§ 1530-1560","Cal. Gov. Code §§ 6250-6276 (CPRA)","Cal. Evid. Code § 1280"]', '["*"]', 'CA_RECORDS_AUTHENTICATION_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-build-001', 'CA_Building_Official', 'building-code-document-audit', 'California Building Code Document Audit', 'Audits building permits, stop-work orders, and code enforcement notices for CBC and H&S Code compliance', 'AUDIT', '["Cal. Health & Safety Code § 19825","CBC § 105.1","Cal. Gov. Code § 65850"]', '["building-permit","code-enforcement-notice","stop-work-order","certificate-of-occupancy","inspection-report"]', 'CA_BUILDING_CODE_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-struct-001', 'CA_Structural_Engineer', 'structural-engineering-document-audit', 'Structural Engineering Document Audit', 'Audits structural reports and engineering declarations for Field Act, Riley Act, and CSLL compliance', 'AUDIT', '["Cal. Educ. Code §§ 17280-17317 (Field Act)","Cal. Health & Safety Code § 19160 (Riley Act)"]', '["structural-report","engineering-declaration","soils-report","seismic-report"]', 'CA_STRUCTURAL_ENGINEERING_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-contr-001', 'CA_Licensed_Contractor', 'contractor-document-audit', 'California Contractor Document Audit', 'Audits CSLB licenses, contractor agreements, mechanics liens, and notices of completion for CSLL compliance', 'AUDIT', '["Cal. Bus. & Prof. Code §§ 7000-7191 (CSLL)","Cal. Civil Code § 8000 et seq. (mechanics liens)"]', '["contractor-agreement","mechanics-lien","lien-release","notice-of-completion","change-order"]', 'CA_CONTRACTOR_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-ceqa-001', 'CA_CEQA_Consultant', 'ceqa-document-audit', 'CEQA Document Audit', 'Audits EIRs, negative declarations, and CEQA notices for CA Public Resources Code compliance', 'AUDIT', '["Cal. Pub. Resources Code §§ 21000-21189.57","14 CCR §§ 15000-15387"]', '["ceqa-document","eir","mitigated-negative-declaration","notice-of-determination","notice-of-exemption","ceqa-comment"]', 'CA_CEQA_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-energy-001', 'CA_Energy_Policy_Specialist', 'energy-policy-document-audit', 'California Energy Policy Document Audit', 'Audits CPUC filings, utility tariffs, and energy contracts for Cal. Pub. Util. Code compliance', 'AUDIT', '["Cal. Pub. Util. Code §§ 451-762","CPUC General Orders"]', '["cpuc-filing","puc-application","utility-tariff","energy-contract","net-metering-application"]', 'CA_ENERGY_POLICY_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-food-001', 'CA_Food_Safety_Specialist', 'food-safety-document-audit', 'California Food Safety Document Audit', 'Audits CDFA reports, FDA complaints, food facility permits, and recall notices for H&S Code compliance', 'AUDIT', '["Cal. Health & Safety Code §§ 113700-114437","CA Retail Food Code"]', '["food-safety-inspection","food-facility-permit","cdfa-report","fda-complaint","food-violation-notice"]', 'CA_FOOD_SAFETY_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-rfood-001', 'CA_Retail_Food_Inspector', 'retail-food-inspection-audit', 'Retail Food Inspection Document Audit', 'Audits restaurant inspection reports and health code violations for local environmental health department compliance', 'AUDIT', '["Cal. Health & Safety Code § 113700 et seq.","Cal. Health & Safety Code § 114377"]', '["restaurant-inspection-report","retail-food-permit","health-code-violation","cdph-report"]', 'CA_RETAIL_FOOD_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-wm-001', 'CA_Weights_Measures_Inspector', 'weights-measures-document-audit', 'Weights & Measures Document Audit', 'Audits scale certifications, measurement violation notices, and CDFA weights/measures reports', 'AUDIT', '["Cal. Bus. & Prof. Code §§ 12001-12107","Cal. Food & Agricultural Code § 12029"]', '["weights-measures-inspection","scale-certification","measurement-violation-notice","cdfa-wm-report"]', 'CA_WEIGHTS_MEASURES_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-usfcr-001', 'US_Federal_Civil_Rights_Litigator', 'federal-civil-rights-document-audit', 'US Federal Civil Rights Document Audit', 'Audits § 1983 complaints, Title VI/VII filings, IFP applications, and federal civil rights documents for constitutional compliance', 'AUDIT', '["42 USC § 1983","42 USC § 2000e-5","28 USC § 1915","Wilson v. Garcia 471 US 261 (1985)"]', '["section-1983-complaint","title-vi-complaint","title-vii-complaint","civil-rights-complaint","ndca-filing","federal-court-filing","pro-se-complaint","ifp-application","habeas-petition","ninth-circuit-brief"]', 'US_FEDERAL_CIVIL_RIGHTS_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-ssa-001', 'US_Federal_Social_Security_Litigator', 'social-security-document-audit', 'US Social Security Document Audit', 'Audits SSDI/SSI applications, ALJ decisions, SSA denials and appeals for 42 USC and 20 CFR compliance', 'AUDIT', '["42 USC §§ 401-434","20 CFR §§ 404.900-999","42 USC § 405(g)"]', '["ssa-form","ssdi-application","ssi-application","ssa-denial","ssa-appeal","ssa-hearing-request","alj-decision","ssa-827","ssa-3373","ssa-3369","ssa-16-bk"]', 'US_SOCIAL_SECURITY_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-erisa-001', 'US_Federal_ERISA_Litigator', 'erisa-document-audit', 'US ERISA Document Audit', 'Audits pension plan documents, ERISA benefit denials, Form 5500 filings, and § 502 complaints', 'AUDIT', '["29 USC §§ 1001-1461 (ERISA)","29 USC § 1022 (SPD)","29 USC § 1132 (§ 502)"]', '["pension-document","erisa-complaint","plan-document","401k-statement","pension-statement","benefit-denial-letter","dol-filing","form-5500","pension-audit"]', 'US_ERISA_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-ffr-001', 'US_Federal_Financial_Fraud_Litigator', 'financial-fraud-document-audit', 'US Financial Fraud Document Audit', 'Audits financial fraud complaints, SARs, forensic accounting reports, and wire fraud filings', 'AUDIT', '["18 USC §§ 1341, 1343, 1347","31 USC § 5318 (BSA)","31 USC § 3729 (FCA)"]', '["financial-fraud-complaint","wire-fraud-filing","bank-record","forensic-accounting-report","suspicious-activity-report","identity-theft-complaint"]', 'US_FINANCIAL_FRAUD_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-housing-001', 'US_Federal_Housing_Litigator', 'federal-housing-document-audit', 'US Federal Housing Document Audit', 'Audits FHA complaints, HUD filings, and fair housing discrimination charges for Fair Housing Act compliance', 'AUDIT', '["42 USC §§ 3601-3619 (FHA)","24 CFR Part 100"]', '["fha-complaint","hud-complaint","fair-housing-complaint","housing-discrimination-charge"]', 'US_FEDERAL_HOUSING_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-fedtax-001', 'US_Federal_Tax_Litigator', 'federal-tax-document-audit', 'US Federal Tax Document Audit', 'Audits IRS notices, Tax Court petitions, liens/levies, and offers in compromise for IRC compliance', 'AUDIT', '["26 USC (IRC)","28 USC § 7441","26 USC § 6212","26 USC § 6303"]', '["irs-notice","tax-court-petition","irs-audit-response","irs-lien","irs-levy","form-1040","form-w-2","form-1099","irs-appeal","offer-in-compromise"]', 'US_FEDERAL_TAX_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-catax-001', 'CA_Tax_Specialist', 'california-tax-document-audit', 'California Tax Document Audit', 'Audits FTB notices, CDTFA filings, and state tax appeals for CA Revenue & Taxation Code compliance', 'AUDIT', '["Cal. Rev. & Tax. Code","Cal. Gov. Code § 15570 et seq."]', '["ftb-notice","cdtfa-filing","state-tax-return","ftb-audit-response","ftb-appeal","payroll-tax-filing"]', 'CA_TAX_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-ins-001', 'CA_Insurance_Compliance_Litigator', 'insurance-compliance-document-audit', 'California Insurance Compliance Document Audit', 'Audits insurance claims, CDI complaints, and bad faith filings for CA Insurance Code and 10 CCR § 2695 compliance', 'AUDIT', '["Cal. Ins. Code §§ 790-790.15","10 CCR § 2695"]', '["insurance-policy","insurance-claim","claim-denial-letter","cdi-complaint","bad-faith-complaint","coverage-dispute","proof-of-loss"]', 'CA_INSURANCE_COMPLIANCE_AUDIT_REPORT', 1, 1, datetime('now')),
  ('skill-le-001', 'CA_Law_Enforcement_Procedures_Specialist', 'law-enforcement-procedures-audit', 'California Law Enforcement Procedures Document Audit', 'Audits internal affairs reports, use of force, booking records, and Brady lists for POBRA and Penal Code compliance', 'AUDIT', '["Cal. Penal Code §§ 832.5-832.8","Cal. Gov. Code §§ 3300-3313 (POBRA)","CLETS Policy Manual"]', '["police-report","incident-report","internal-affairs-report","use-of-force-report","booking-record","jail-intake-record","brady-list","personnel-complaint","dispatch-log","arrest-warrant","search-warrant"]', 'CA_LAW_ENFORCEMENT_PROCEDURES_AUDIT_REPORT', 1, 1, datetime('now'));


-- =============================================================================
-- 3. CITIZEN ROUTING INDEX — Document Type → Citizen O(1) Resolution
-- =============================================================================
-- Priority scale: 95=specialist, 85=primary, 75=secondary, 60=fallback
-- jurisdiction: "*" = any jurisdiction; "CA" = California state; "FEDERAL" = federal

INSERT OR IGNORE INTO citizen_routing_index (id, doc_type, jurisdiction, category, citizen_name, skill_slug, priority, standard_ids, cross_ref_paths)
VALUES

  -- Family Law
  ('ri-fl-001', 'dvro', 'CA', 'family-law', 'CA_Family_Law_Litigator', 'family-law-document-audit', 95, '[]', '[]'),
  ('ri-fl-002', 'fl-form', 'CA', 'family-law', 'CA_Family_Law_Litigator', 'family-law-document-audit', 90, '[]', '[]'),
  ('ri-fl-003', 'fl-150', 'CA', 'family-law', 'CA_Family_Law_Litigator', 'family-law-document-audit', 95, '[]', '[]'),
  ('ri-fl-004', 'fl-300', 'CA', 'family-law', 'CA_Family_Law_Litigator', 'family-law-document-audit', 95, '[]', '[]'),
  ('ri-fl-005', 'fl-305', 'CA', 'family-law', 'CA_Family_Law_Litigator', 'family-law-document-audit', 95, '[]', '[]'),
  ('ri-fl-006', 'fl-310', 'CA', 'family-law', 'CA_Family_Law_Litigator', 'family-law-document-audit', 95, '[]', '[]'),
  ('ri-fl-007', 'fl-311', 'CA', 'family-law', 'CA_Family_Law_Litigator', 'family-law-document-audit', 95, '[]', '[]'),
  ('ri-fl-008', 'fl-341', 'CA', 'family-law', 'CA_Family_Law_Litigator', 'family-law-document-audit', 95, '[]', '[]'),
  ('ri-fl-009', 'ex-parte', 'CA', 'family-law', 'CA_Family_Law_Litigator', 'family-law-document-audit', 90, '[]', '[]'),
  ('ri-fl-010', 'temporary-orders', 'CA', 'family-law', 'CA_Family_Law_Litigator', 'family-law-document-audit', 90, '[]', '[]'),
  ('ri-fl-011', 'dissolution-filing', 'CA', 'family-law', 'CA_Family_Law_Litigator', 'family-law-document-audit', 90, '[]', '[]'),
  ('ri-fl-012', 'custody-order', 'CA', 'family-law', 'CA_Family_Law_Litigator', 'family-law-document-audit', 90, '[]', '[]'),
  ('ri-fl-013', 'visitation-order', 'CA', 'family-law', 'CA_Family_Law_Litigator', 'family-law-document-audit', 90, '[]', '[]'),
  ('ri-fl-014', 'child-support-order', 'CA', 'family-law', 'CA_Family_Law_Litigator', 'family-law-document-audit', 90, '[]', '[]'),
  ('ri-fl-015', 'paternity-filing', 'CA', 'family-law', 'CA_Family_Law_Litigator', 'family-law-document-audit', 85, '[]', '[]'),
  ('ri-fl-016', 'stipulation', 'CA', 'family-law', 'CA_Family_Law_Litigator', 'family-law-document-audit', 80, '[]', '[]'),

  -- Criminal Law
  ('ri-crim-001', 'criminal-complaint', 'CA', 'criminal', 'CA_Criminal_Law_Specialist', 'criminal-law-document-audit', 95, '[]', '[]'),
  ('ri-crim-002', 'pitchess-motion', 'CA', 'criminal', 'CA_Criminal_Law_Specialist', 'criminal-law-document-audit', 95, '[]', '[]'),
  ('ri-crim-003', 'brady-demand', '*', 'criminal', 'CA_Criminal_Law_Specialist', 'criminal-law-document-audit', 95, '[]', '[]'),
  ('ri-crim-004', 'motion-to-suppress', '*', 'criminal', 'CA_Criminal_Law_Specialist', 'criminal-law-document-audit', 90, '[]', '[]'),
  ('ri-crim-005', 'section-1001-petition', 'CA', 'criminal', 'CA_Criminal_Law_Specialist', 'criminal-law-document-audit', 90, '[]', '[]'),
  ('ri-crim-006', 'plea-agreement', '*', 'criminal', 'CA_Criminal_Law_Specialist', 'criminal-law-document-audit', 85, '[]', '[]'),
  ('ri-crim-007', 'sentencing-brief', '*', 'criminal', 'CA_Criminal_Law_Specialist', 'criminal-law-document-audit', 85, '[]', '[]'),
  ('ri-crim-008', 'criminal-appeal', '*', 'criminal', 'CA_Criminal_Law_Specialist', 'criminal-law-document-audit', 85, '[]', '[]'),
  ('ri-crim-009', 'felony-complaint', 'CA', 'criminal', 'CA_Criminal_Law_Specialist', 'criminal-law-document-audit', 95, '[]', '[]'),
  ('ri-crim-010', 'misdemeanor-complaint', 'CA', 'criminal', 'CA_Criminal_Law_Specialist', 'criminal-law-document-audit', 95, '[]', '[]'),

  -- Law Enforcement Procedures
  ('ri-le-001', 'police-report', 'CA', 'law-enforcement', 'CA_Law_Enforcement_Procedures_Specialist', 'law-enforcement-procedures-audit', 90, '[]', '[]'),
  ('ri-le-002', 'incident-report', 'CA', 'law-enforcement', 'CA_Law_Enforcement_Procedures_Specialist', 'law-enforcement-procedures-audit', 90, '[]', '[]'),
  ('ri-le-003', 'internal-affairs-report', 'CA', 'law-enforcement', 'CA_Law_Enforcement_Procedures_Specialist', 'law-enforcement-procedures-audit', 95, '[]', '[]'),
  ('ri-le-004', 'use-of-force-report', 'CA', 'law-enforcement', 'CA_Law_Enforcement_Procedures_Specialist', 'law-enforcement-procedures-audit', 95, '[]', '[]'),
  ('ri-le-005', 'booking-record', 'CA', 'law-enforcement', 'CA_Law_Enforcement_Procedures_Specialist', 'law-enforcement-procedures-audit', 90, '[]', '[]'),
  ('ri-le-006', 'arrest-warrant', 'CA', 'law-enforcement', 'CA_Law_Enforcement_Procedures_Specialist', 'law-enforcement-procedures-audit', 90, '[]', '[]'),
  ('ri-le-007', 'search-warrant', 'CA', 'law-enforcement', 'CA_Law_Enforcement_Procedures_Specialist', 'law-enforcement-procedures-audit', 90, '[]', '[]'),
  ('ri-le-008', 'cad-report', 'CA', 'law-enforcement', 'CA_Law_Enforcement_Procedures_Specialist', 'law-enforcement-procedures-audit', 90, '[]', '[]'),
  ('ri-le-009', 'brady-list', 'CA', 'law-enforcement', 'CA_Law_Enforcement_Procedures_Specialist', 'law-enforcement-procedures-audit', 95, '[]', '[]'),

  -- Labor & Employment
  ('ri-lab-001', 'eeoc-charge', '*', 'labor-employment', 'CA_Labor_Employment_Litigator', 'labor-employment-document-audit', 95, '[]', '[]'),
  ('ri-lab-002', 'dfeh-complaint', 'CA', 'labor-employment', 'CA_Labor_Employment_Litigator', 'labor-employment-document-audit', 95, '[]', '[]'),
  ('ri-lab-003', 'wage-claim', 'CA', 'labor-employment', 'CA_Labor_Employment_Litigator', 'labor-employment-document-audit', 95, '[]', '[]'),
  ('ri-lab-004', 'employment-contract', '*', 'labor-employment', 'CA_Labor_Employment_Litigator', 'labor-employment-document-audit', 85, '[]', '[]'),
  ('ri-lab-005', 'wrongful-termination-complaint', 'CA', 'labor-employment', 'CA_Labor_Employment_Litigator', 'labor-employment-document-audit', 90, '[]', '[]'),
  ('ri-lab-006', 'union-grievance', '*', 'labor-employment', 'CA_Labor_Employment_Litigator', 'labor-employment-document-audit', 85, '[]', '[]'),
  ('ri-lab-007', 'fmla-cfra-form', '*', 'labor-employment', 'CA_Labor_Employment_Litigator', 'labor-employment-document-audit', 85, '[]', '[]'),

  -- Workers Comp
  ('ri-wc-001', 'dwc-1-form', 'CA', 'workers-compensation', 'CA_Workers_Compensation_Litigator', 'workers-compensation-document-audit', 95, '[]', '[]'),
  ('ri-wc-002', 'wcab-petition', 'CA', 'workers-compensation', 'CA_Workers_Compensation_Litigator', 'workers-compensation-document-audit', 95, '[]', '[]'),
  ('ri-wc-003', 'qme-report', 'CA', 'workers-compensation', 'CA_Workers_Compensation_Litigator', 'workers-compensation-document-audit', 95, '[]', '[]'),
  ('ri-wc-004', 'compromise-and-release', 'CA', 'workers-compensation', 'CA_Workers_Compensation_Litigator', 'workers-compensation-document-audit', 90, '[]', '[]'),
  ('ri-wc-005', 'td-benefit-claim', 'CA', 'workers-compensation', 'CA_Workers_Compensation_Litigator', 'workers-compensation-document-audit', 90, '[]', '[]'),

  -- Civil Litigation
  ('ri-civil-001', 'civil-complaint', 'CA', 'civil-litigation', 'CA_Civil_Litigator', 'civil-litigation-document-audit', 90, '[]', '[]'),
  ('ri-civil-002', 'answer', 'CA', 'civil-litigation', 'CA_Civil_Litigator', 'civil-litigation-document-audit', 85, '[]', '[]'),
  ('ri-civil-003', 'demurrer', 'CA', 'civil-litigation', 'CA_Civil_Litigator', 'civil-litigation-document-audit', 90, '[]', '[]'),
  ('ri-civil-004', 'motion-for-summary-judgment', '*', 'civil-litigation', 'CA_Civil_Litigator', 'civil-litigation-document-audit', 85, '[]', '[]'),

  -- Discovery
  ('ri-disc-001', 'subpoena', '*', 'discovery', 'CA_Discovery_Specialist', 'discovery-document-audit', 95, '[]', '[]'),
  ('ri-disc-002', 'subpoena-duces-tecum', '*', 'discovery', 'CA_Discovery_Specialist', 'discovery-document-audit', 95, '[]', '[]'),
  ('ri-disc-003', 'interrogatories', '*', 'discovery', 'CA_Discovery_Specialist', 'discovery-document-audit', 90, '[]', '[]'),
  ('ri-disc-004', 'deposition-notice', '*', 'discovery', 'CA_Discovery_Specialist', 'discovery-document-audit', 90, '[]', '[]'),
  ('ri-disc-005', 'protective-order', '*', 'discovery', 'CA_Discovery_Specialist', 'discovery-document-audit', 85, '[]', '[]'),

  -- Consumer Protection
  ('ri-cons-001', 'consumer-complaint', '*', 'consumer-protection', 'CA_Consumer_Protection_Litigator', 'consumer-protection-document-audit', 90, '[]', '[]'),
  ('ri-cons-002', 'ucl-complaint', 'CA', 'consumer-protection', 'CA_Consumer_Protection_Litigator', 'consumer-protection-document-audit', 95, '[]', '[]'),
  ('ri-cons-003', 'clra-demand', 'CA', 'consumer-protection', 'CA_Consumer_Protection_Litigator', 'consumer-protection-document-audit', 95, '[]', '[]'),
  ('ri-cons-004', 'lemon-law-filing', 'CA', 'consumer-protection', 'CA_Consumer_Protection_Litigator', 'consumer-protection-document-audit', 95, '[]', '[]'),

  -- Medical Malpractice
  ('ri-mm-001', 'medical-record', '*', 'health-care', 'CA_Medical_Malpractice_Litigator', 'medical-malpractice-document-audit', 85, '[]', '[]'),
  ('ri-mm-002', 'medical-malpractice-complaint', 'CA', 'health-care', 'CA_Medical_Malpractice_Litigator', 'medical-malpractice-document-audit', 95, '[]', '[]'),
  ('ri-mm-003', 'surgical-report', '*', 'health-care', 'CA_Medical_Malpractice_Litigator', 'medical-malpractice-document-audit', 90, '[]', '[]'),

  -- Medical Privacy
  ('ri-mp-001', 'hipaa-release', '*', 'medical-privacy', 'CA_Medical_Privacy_Officer', 'medical-privacy-document-audit', 95, '[]', '[]'),
  ('ri-mp-002', 'phi-disclosure-log', '*', 'medical-privacy', 'CA_Medical_Privacy_Officer', 'medical-privacy-document-audit', 95, '[]', '[]'),
  ('ri-mp-003', 'breach-notification', '*', 'medical-privacy', 'CA_Medical_Privacy_Officer', 'medical-privacy-document-audit', 95, '[]', '[]'),

  -- Real Estate
  ('ri-re-001', 'deed', 'CA', 'real-estate', 'CA_Real_Estate_Attorney', 'real-estate-document-audit', 95, '[]', '[]'),
  ('ri-re-002', 'grant-deed', 'CA', 'real-estate', 'CA_Real_Estate_Attorney', 'real-estate-document-audit', 95, '[]', '[]'),
  ('ri-re-003', 'purchase-agreement', 'CA', 'real-estate', 'CA_Real_Estate_Attorney', 'real-estate-document-audit', 90, '[]', '[]'),
  ('ri-re-004', 'unlawful-detainer-complaint', 'CA', 'real-estate', 'CA_Real_Estate_Attorney', 'real-estate-document-audit', 95, '[]', '[]'),
  ('ri-re-005', 'mechanics-lien', 'CA', 'real-estate', 'CA_Real_Estate_Attorney', 'real-estate-document-audit', 90, '[]', '[]'),
  ('ri-re-006', 'residential-lease', 'CA', 'real-estate', 'CA_Real_Estate_Attorney', 'real-estate-document-audit', 85, '[]', '[]'),

  -- Telecom & Privacy
  ('ri-tc-001', 'sim-swap-complaint', '*', 'telecommunications', 'CA_Telecom_Privacy_Litigator', 'telecom-privacy-document-audit', 95, '[]', '[]'),
  ('ri-tc-002', 'phone-record', '*', 'telecommunications', 'CA_Telecom_Privacy_Litigator', 'telecom-privacy-document-audit', 85, '[]', '[]'),
  ('ri-tc-003', 'cpuc-complaint', 'CA', 'telecommunications', 'CA_Telecom_Privacy_Litigator', 'telecom-privacy-document-audit', 90, '[]', '[]'),
  ('ri-tc-004', 'wiretap-complaint', '*', 'telecommunications', 'CA_Telecom_Privacy_Litigator', 'telecom-privacy-document-audit', 95, '[]', '[]'),
  ('ri-tc-005', 'cipa-complaint', 'CA', 'telecommunications', 'CA_Telecom_Privacy_Litigator', 'telecom-privacy-document-audit', 95, '[]', '[]'),

  -- Victim Compensation
  ('ri-vc-001', 'calvcb-application', 'CA', 'victim-compensation', 'CA_Victim_Compensation_Litigator', 'victim-compensation-document-audit', 95, '[]', '[]'),
  ('ri-vc-002', 'victim-declaration', 'CA', 'victim-compensation', 'CA_Victim_Compensation_Litigator', 'victim-compensation-document-audit', 90, '[]', '[]'),
  ('ri-vc-003', 'calvcb-appeal', 'CA', 'victim-compensation', 'CA_Victim_Compensation_Litigator', 'victim-compensation-document-audit', 95, '[]', '[]'),
  ('ri-vc-004', 'restitution-order', 'CA', 'victim-compensation', 'CA_Victim_Compensation_Litigator', 'victim-compensation-document-audit', 90, '[]', '[]'),

  -- Mental Health
  ('ri-mh-001', '5150-hold', 'CA', 'mental-health', 'CA_Mental_Health_Litigator', 'mental-health-document-audit', 95, '[]', '[]'),
  ('ri-mh-002', '5250-hold', 'CA', 'mental-health', 'CA_Mental_Health_Litigator', 'mental-health-document-audit', 95, '[]', '[]'),
  ('ri-mh-003', 'psychiatric-evaluation', '*', 'mental-health', 'CA_Mental_Health_Litigator', 'mental-health-document-audit', 85, '[]', '[]'),
  ('ri-mh-004', 'lps-conservatorship', 'CA', 'mental-health', 'CA_Mental_Health_Litigator', 'mental-health-document-audit', 95, '[]', '[]'),

  -- Probate & Conservatorship
  ('ri-prob-001', 'conservatorship-petition', 'CA', 'probate', 'CA_Probate_Conservatorship_Litigator', 'probate-conservatorship-document-audit', 95, '[]', '[]'),
  ('ri-prob-002', 'letters-conservatorship', 'CA', 'probate', 'CA_Probate_Conservatorship_Litigator', 'probate-conservatorship-document-audit', 95, '[]', '[]'),
  ('ri-prob-003', 'probate-petition', 'CA', 'probate', 'CA_Probate_Conservatorship_Litigator', 'probate-conservatorship-document-audit', 90, '[]', '[]'),
  ('ri-prob-004', 'will', 'CA', 'probate', 'CA_Probate_Conservatorship_Litigator', 'probate-conservatorship-document-audit', 85, '[]', '[]'),
  ('ri-prob-005', 'capacity-declaration', 'CA', 'probate', 'CA_Probate_Conservatorship_Litigator', 'probate-conservatorship-document-audit', 90, '[]', '[]'),

  -- Conservatorship Investigation (higher priority for forensic docs)
  ('ri-ci-001', 'letters-conservatorship', 'CA', 'probate-forensics', 'CA_Conservator_Investigator', 'conservatorship-investigation-audit', 90, '[]', '[]'),
  ('ri-ci-002', 'conservatorship-petition', 'CA', 'probate-forensics', 'CA_Conservator_Investigator', 'conservatorship-investigation-audit', 85, '[]', '[]'),

  -- Disability Rights
  ('ri-dr-001', 'ada-complaint', '*', 'disability-rights', 'CA_Disability_Rights_Litigator', 'disability-rights-document-audit', 95, '[]', '[]'),
  ('ri-dr-002', 'section-504-complaint', '*', 'disability-rights', 'CA_Disability_Rights_Litigator', 'disability-rights-document-audit', 95, '[]', '[]'),
  ('ri-dr-003', 'accommodation-request', '*', 'disability-rights', 'CA_Disability_Rights_Litigator', 'disability-rights-document-audit', 90, '[]', '[]'),

  -- Immigration
  ('ri-imm-001', 'i-589', '*', 'immigration', 'CA_Immigration_Litigator', 'immigration-document-audit', 95, '[]', '[]'),
  ('ri-imm-002', 'i-485', '*', 'immigration', 'CA_Immigration_Litigator', 'immigration-document-audit', 90, '[]', '[]'),
  ('ri-imm-003', 'removal-order', '*', 'immigration', 'CA_Immigration_Litigator', 'immigration-document-audit', 95, '[]', '[]'),
  ('ri-imm-004', 'asylum-application', '*', 'immigration', 'CA_Immigration_Litigator', 'immigration-document-audit', 95, '[]', '[]'),

  -- Vehicle Code
  ('ri-vc2-001', 'traffic-citation', 'CA', 'vehicle-code', 'CA_Vehicle_Code_Specialist', 'vehicle-code-document-audit', 95, '[]', '[]'),
  ('ri-vc2-002', 'dmv-record', 'CA', 'vehicle-code', 'CA_Vehicle_Code_Specialist', 'vehicle-code-document-audit', 90, '[]', '[]'),
  ('ri-vc2-003', 'dmv-suspension-notice', 'CA', 'vehicle-code', 'CA_Vehicle_Code_Specialist', 'vehicle-code-document-audit', 95, '[]', '[]'),
  ('ri-vc2-004', 'sr-22', 'CA', 'vehicle-code', 'CA_Vehicle_Code_Specialist', 'vehicle-code-document-audit', 90, '[]', '[]'),

  -- Administrative Law
  ('ri-al-001', 'oah-filing', 'CA', 'administrative', 'CA_Administrative_Law_Specialist', 'administrative-law-document-audit', 95, '[]', '[]'),
  ('ri-al-002', 'administrative-complaint', 'CA', 'administrative', 'CA_Administrative_Law_Specialist', 'administrative-law-document-audit', 90, '[]', '[]'),
  ('ri-al-003', 'administrative-appeal', 'CA', 'administrative', 'CA_Administrative_Law_Specialist', 'administrative-law-document-audit', 90, '[]', '[]'),

  -- Healthcare Fraud
  ('ri-hcf-001', 'cms-1500', '*', 'healthcare-fraud', 'CA_Healthcare_Fraud_Litigator', 'healthcare-fraud-document-audit', 95, '[]', '[]'),
  ('ri-hcf-002', 'medi-cal-claim', 'CA', 'healthcare-fraud', 'CA_Healthcare_Fraud_Litigator', 'healthcare-fraud-document-audit', 95, '[]', '[]'),
  ('ri-hcf-003', 'medical-billing-record', '*', 'healthcare-fraud', 'CA_Healthcare_Fraud_Litigator', 'healthcare-fraud-document-audit', 90, '[]', '[]'),

  -- Insurance
  ('ri-ins-001', 'insurance-claim', 'CA', 'insurance', 'CA_Insurance_Compliance_Litigator', 'insurance-compliance-document-audit', 95, '[]', '[]'),
  ('ri-ins-002', 'cdi-complaint', 'CA', 'insurance', 'CA_Insurance_Compliance_Litigator', 'insurance-compliance-document-audit', 95, '[]', '[]'),
  ('ri-ins-003', 'bad-faith-complaint', 'CA', 'insurance', 'CA_Insurance_Compliance_Litigator', 'insurance-compliance-document-audit', 95, '[]', '[]'),
  ('ri-ins-004', 'insurance-policy', 'CA', 'insurance', 'CA_Insurance_Compliance_Litigator', 'insurance-compliance-document-audit', 85, '[]', '[]'),

  -- Federal Civil Rights (§ 1983)
  ('ri-fcr-001', 'section-1983-complaint', 'FEDERAL', 'federal-civil-rights', 'US_Federal_Civil_Rights_Litigator', 'federal-civil-rights-document-audit', 95, '[]', '[]'),
  ('ri-fcr-002', 'ifp-application', 'FEDERAL', 'federal-civil-rights', 'US_Federal_Civil_Rights_Litigator', 'federal-civil-rights-document-audit', 90, '[]', '[]'),
  ('ri-fcr-003', 'habeas-petition', '*', 'federal-civil-rights', 'US_Federal_Civil_Rights_Litigator', 'federal-civil-rights-document-audit', 90, '[]', '[]'),
  ('ri-fcr-004', 'ndca-filing', 'FEDERAL', 'federal-civil-rights', 'US_Federal_Civil_Rights_Litigator', 'federal-civil-rights-document-audit', 90, '[]', '[]'),

  -- Social Security
  ('ri-ssa-001', 'ssdi-application', 'FEDERAL', 'social-security', 'US_Federal_Social_Security_Litigator', 'social-security-document-audit', 95, '[]', '[]'),
  ('ri-ssa-002', 'ssa-denial', 'FEDERAL', 'social-security', 'US_Federal_Social_Security_Litigator', 'social-security-document-audit', 95, '[]', '[]'),
  ('ri-ssa-003', 'alj-decision', 'FEDERAL', 'social-security', 'US_Federal_Social_Security_Litigator', 'social-security-document-audit', 95, '[]', '[]'),
  ('ri-ssa-004', 'ssa-appeal', 'FEDERAL', 'social-security', 'US_Federal_Social_Security_Litigator', 'social-security-document-audit', 90, '[]', '[]'),

  -- ERISA
  ('ri-er-001', 'erisa-complaint', 'FEDERAL', 'erisa', 'US_Federal_ERISA_Litigator', 'erisa-document-audit', 95, '[]', '[]'),
  ('ri-er-002', 'pension-document', 'FEDERAL', 'erisa', 'US_Federal_ERISA_Litigator', 'erisa-document-audit', 90, '[]', '[]'),
  ('ri-er-003', 'benefit-denial-letter', 'FEDERAL', 'erisa', 'US_Federal_ERISA_Litigator', 'erisa-document-audit', 90, '[]', '[]'),
  ('ri-er-004', 'form-5500', 'FEDERAL', 'erisa', 'US_Federal_ERISA_Litigator', 'erisa-document-audit', 85, '[]', '[]'),

  -- Financial Fraud
  ('ri-ff-001', 'financial-fraud-complaint', 'FEDERAL', 'financial-fraud', 'US_Federal_Financial_Fraud_Litigator', 'financial-fraud-document-audit', 95, '[]', '[]'),
  ('ri-ff-002', 'suspicious-activity-report', 'FEDERAL', 'financial-fraud', 'US_Federal_Financial_Fraud_Litigator', 'financial-fraud-document-audit', 95, '[]', '[]'),
  ('ri-ff-003', 'identity-theft-complaint', '*', 'financial-fraud', 'US_Federal_Financial_Fraud_Litigator', 'financial-fraud-document-audit', 90, '[]', '[]'),

  -- Federal Housing
  ('ri-fh-001', 'fha-complaint', 'FEDERAL', 'federal-housing', 'US_Federal_Housing_Litigator', 'federal-housing-document-audit', 95, '[]', '[]'),
  ('ri-fh-002', 'hud-complaint', 'FEDERAL', 'federal-housing', 'US_Federal_Housing_Litigator', 'federal-housing-document-audit', 95, '[]', '[]'),
  ('ri-fh-003', 'fair-housing-complaint', '*', 'federal-housing', 'US_Federal_Housing_Litigator', 'federal-housing-document-audit', 95, '[]', '[]'),

  -- Federal Tax
  ('ri-ft-001', 'irs-notice', 'FEDERAL', 'federal-tax', 'US_Federal_Tax_Litigator', 'federal-tax-document-audit', 95, '[]', '[]'),
  ('ri-ft-002', 'tax-court-petition', 'FEDERAL', 'federal-tax', 'US_Federal_Tax_Litigator', 'federal-tax-document-audit', 95, '[]', '[]'),
  ('ri-ft-003', 'irs-lien', 'FEDERAL', 'federal-tax', 'US_Federal_Tax_Litigator', 'federal-tax-document-audit', 90, '[]', '[]'),

  -- State Tax
  ('ri-ct-001', 'ftb-notice', 'CA', 'state-tax', 'CA_Tax_Specialist', 'california-tax-document-audit', 95, '[]', '[]'),
  ('ri-ct-002', 'cdtfa-filing', 'CA', 'state-tax', 'CA_Tax_Specialist', 'california-tax-document-audit', 90, '[]', '[]'),
  ('ri-ct-003', 'ftb-appeal', 'CA', 'state-tax', 'CA_Tax_Specialist', 'california-tax-document-audit', 90, '[]', '[]'),

  -- Building & Construction
  ('ri-bc-001', 'building-permit', 'CA', 'building-construction', 'CA_Building_Official', 'building-code-document-audit', 95, '[]', '[]'),
  ('ri-bc-002', 'stop-work-order', 'CA', 'building-construction', 'CA_Building_Official', 'building-code-document-audit', 95, '[]', '[]'),
  ('ri-bc-003', 'code-enforcement-notice', 'CA', 'building-construction', 'CA_Building_Official', 'building-code-document-audit', 90, '[]', '[]'),
  ('ri-bc-004', 'mechanics-lien', 'CA', 'building-construction', 'CA_Licensed_Contractor', 'contractor-document-audit', 90, '[]', '[]'),
  ('ri-bc-005', 'contractor-agreement', 'CA', 'building-construction', 'CA_Licensed_Contractor', 'contractor-document-audit', 85, '[]', '[]'),

  -- CEQA / Environmental
  ('ri-ceqa-001', 'eir', 'CA', 'environmental', 'CA_CEQA_Consultant', 'ceqa-document-audit', 95, '[]', '[]'),
  ('ri-ceqa-002', 'ceqa-document', 'CA', 'environmental', 'CA_CEQA_Consultant', 'ceqa-document-audit', 90, '[]', '[]'),
  ('ri-ceqa-003', 'notice-of-determination', 'CA', 'environmental', 'CA_CEQA_Consultant', 'ceqa-document-audit', 85, '[]', '[]'),

  -- Food Safety
  ('ri-fs-001', 'food-safety-inspection', 'CA', 'food-safety', 'CA_Retail_Food_Inspector', 'retail-food-inspection-audit', 95, '[]', '[]'),
  ('ri-fs-002', 'restaurant-inspection-report', 'CA', 'food-safety', 'CA_Retail_Food_Inspector', 'retail-food-inspection-audit', 95, '[]', '[]'),
  ('ri-fs-003', 'health-code-violation', 'CA', 'food-safety', 'CA_Retail_Food_Inspector', 'retail-food-inspection-audit', 90, '[]', '[]'),

  -- Vehicle Code
  ('ri-veh-001', 'traffic-citation', 'CA', 'vehicle', 'CA_Vehicle_Code_Specialist', 'vehicle-code-document-audit', 95, '[]', '[]'),
  ('ri-veh-002', 'dmv-suspension-notice', 'CA', 'vehicle', 'CA_Vehicle_Code_Specialist', 'vehicle-code-document-audit', 95, '[]', '[]');

-- ============================================================
-- SEED 029: VERITAS-0 Domain Expansions
-- Insurance, Employment, Court Filings, Law Enforcement,
-- Financial Instruments, Government Benefits, Real Property
-- Created: 2026-03-18
-- Purpose: Domain-specific authentication standards so VERITAS-0
--          can audit documents in their native language.
-- ============================================================


-- ============================================================
-- SECTION 1: INSURANCE DOCUMENT STANDARDS
-- ============================================================

INSERT OR IGNORE INTO governing_standards
  (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title,
   description, requirements, key_sections, document_types, skill_slugs,
   enforcement_body, enforcement_url, private_right_of_action,
   statute_of_limitations, damages_available, effective_date, last_amended,
   source_url, is_active, created_at, updated_at)
VALUES

('std_ver_010', 'VERITAS-0', 'STATE_STATUTE', 'CA',
 'CA Insurance Code §§ 381, 382, 530-534, 790-790.15, 2695.1-2695.12', 'CA INS Doc Standards',
 'California Insurance Code — Policy and Claims Document Standards',
 'California standards for insurance policy documents, claims handling correspondence, denial letters, EOBs, and cancellation notices. Policies must contain specific mandatory provisions (INS 381-382). Claims handling must follow Fair Claims Settlement Practices (10 CCR 2695.1-2695.12) including specific timeframes, written notice requirements, and itemized denial explanations. Denial letters missing specific statutory citations, claim numbers, or appeal deadlines are structurally non-compliant.',
 '["Policy declarations page with coverage limits, deductibles, named insured, policy period","Mandatory policy provisions per INS 381-382","Claims acknowledgment within 15 days (10 CCR 2695.5(e))","Written status updates every 30 days during investigation","Written denial with specific reasons and policy provisions cited","Itemized claim payment explanation","Cancellation notice 30 days (nonpayment: 10 days) with specific language","Nonrenewal notice 60 days before expiration","Proof of loss forms within 15 days of request","Good faith settlement within 85 days of proof of claim"]',
 '[{"section":"INS 381-382","description":"Mandatory policy provisions"},{"section":"INS 530-534","description":"Policy form filing and approval requirements"},{"section":"INS 790-790.15","description":"Unfair Practices Act — prohibited insurance practices"},{"section":"10 CCR 2695.1-2695.12","description":"Fair Claims Settlement Practices Regulations"},{"section":"INS 676","description":"Cancellation notice requirements"},{"section":"INS 678","description":"Nonrenewal notice requirements"}]',
 '["insurance_policy","declarations_page","eob","denial_letter","cancellation_notice","nonrenewal_notice","claims_correspondence","proof_of_loss"]',
 '["insurance-document-authentication","claims-correspondence-validation","denial-letter-audit"]',
 'California Department of Insurance', 'https://www.insurance.ca.gov/',
 1, '2 years (unfair practices); 4 years (breach of contract)', '{"actual":true,"statutory":true,"punitive":true,"attorney_fees":true,"injunctive":true}',
 NULL, NULL,
 'https://leginfo.legislature.ca.gov/faces/codes_displayexpandedbranch.xhtml?tocCode=INS', 1, datetime('now'), datetime('now')),

-- NAIC Model Standards
('std_ver_011', 'VERITAS-0', 'PROFESSIONAL_STANDARD', 'US',
 'NAIC Unfair Claims Settlement Practices Model Act (Model #900)', 'NAIC Model 900',
 'NAIC Unfair Claims Settlement Practices — National Baseline',
 'National Association of Insurance Commissioners model act adopted in some form by all 50 states. Defines minimum standards for claims handling including prompt investigation, fair settlement, and documented denial. Provides the national baseline against which state-specific insurance document requirements are measured. Insurance documents from any state should meet at minimum these standards.',
 '["Prompt investigation upon receiving proof of loss","Affirm or deny coverage within reasonable time","Written denial with specific reasons","Not compelling insured to litigate by offering substantially less","Prompt payment of settled claims","Not requiring unnecessary documentation","Written notice of claim denial or offer","Documented investigation file"]',
 '[{"section":"Section 4","description":"Unfair Claims Settlement Practices — 16 prohibited practices"},{"section":"Section 5","description":"General business practice determination"},{"section":"Section 6","description":"Penalties and enforcement"}]',
 '["insurance_claim","denial_letter","settlement_offer","claims_investigation","eob"]',
 '["insurance-document-authentication","claims-handling-baseline-check"]',
 'National Association of Insurance Commissioners', 'https://content.naic.org/',
 0, NULL, NULL,
 NULL, NULL,
 'https://content.naic.org/', 1, datetime('now'), datetime('now')),


-- ============================================================
-- SECTION 2: EMPLOYMENT & WORKERS COMP DOCUMENT STANDARDS
-- ============================================================

-- CA Labor Code — Wage Statements
('std_ver_012', 'VERITAS-0', 'STATE_STATUTE', 'CA',
 'CA Labor Code §§ 226, 226.7, 1174, 1198.5, 2810.5', 'CA LAB Wage Docs',
 'California Labor Code — Wage Statement and Employment Document Standards',
 'California requirements for itemized wage statements, personnel file access, and employment documentation. Wage statements (pay stubs) must contain 9 mandatory fields per LAB 226(a). Missing or inaccurate wage statements trigger statutory penalties of $50 for first violation, $100 for subsequent, plus costs and attorney fees. Employment documents must be provided in employee primary language when available.',
 '["9 mandatory wage statement fields per LAB 226(a)","Gross wages earned","Total hours worked (for hourly/piece-rate employees)","Number of piece-rate units and applicable piece rate","All deductions with itemization","Net wages earned","Inclusive dates of pay period","Employee name and last four SSN digits","Employer legal name and address","All applicable hourly rates and corresponding hours","Personnel file access within 30 days of request (LAB 1198.5)","Wage notice at hire per LAB 2810.5"]',
 '[{"section":"LAB 226(a)","description":"Itemized wage statement — 9 mandatory fields"},{"section":"LAB 226(e)","description":"Penalties for noncompliant wage statements"},{"section":"LAB 226.7","description":"Rest and meal period documentation"},{"section":"LAB 1174","description":"Payroll record retention requirements (3 years)"},{"section":"LAB 1198.5","description":"Personnel file inspection rights"},{"section":"LAB 2810.5","description":"Wage notice at time of hire"}]',
 '["wage_statement","pay_stub","payroll_record","personnel_file","wage_notice","employment_agreement"]',
 '["employment-document-authentication","wage-statement-validation","payroll-compliance-check"]',
 'California Labor Commissioner (DLSE)', 'https://www.dir.ca.gov/dlse/',
 1, '3 years', '{"actual":true,"statutory":"$50 first violation, $100 subsequent, per employee per pay period","attorney_fees":true}',
 NULL, NULL,
 'https://leginfo.legislature.ca.gov/faces/codes_displayexpandedbranch.xhtml?tocCode=LAB', 1, datetime('now'), datetime('now')),

-- Workers Comp Document Standards
('std_ver_013', 'VERITAS-0', 'STATE_STATUTE', 'CA',
 'CA Labor Code §§ 3700-3706, 4600-4604.5, 5400-5406; 8 CCR 9785-9795', 'CA Workers Comp Docs',
 'California Workers Compensation — Documentation Standards',
 'California workers compensation claim documentation requirements including DWC-1 claim form, medical reporting standards (PR-1 through PR-4), employer posting requirements, and benefit notice formats. First Report of Injury must be filed within 5 days. Medical reports must follow specific format per 8 CCR 9785. Provider must use approved treatment guidelines (MTUS). Documents missing DWC form numbers, claim numbers, or using non-standard medical reporting formats are non-compliant.',
 '["DWC-1 Workers Compensation Claim Form — mandatory content","First Report of Injury — employer filing within 5 days","PR-1 through PR-4 medical report formats (8 CCR 9785)","Medical-Legal Report format (8 CCR 9795)","MTUS (Medical Treatment Utilization Schedule) guidelines","Benefit notices — temporary disability, permanent disability","Claims administrator contact and claim number on all correspondence","Employer posting requirements — notice of workers comp coverage","Utilization Review determination notice format","Independent Medical Review request form"]',
 '[{"section":"LAB 3700-3706","description":"Employer obligation to secure workers comp coverage"},{"section":"LAB 4600-4604.5","description":"Medical treatment rights and provider requirements"},{"section":"LAB 5400-5406","description":"Filing requirements and statute of limitations"},{"section":"8 CCR 9785","description":"Reporting duties of treating physician — PR-1 through PR-4 format"},{"section":"8 CCR 9795","description":"Medical-Legal Report format requirements"},{"section":"8 CCR 9792.6-9792.15","description":"Utilization Review — decision notice requirements"}]',
 '["dwc_claim_form","first_report_of_injury","medical_report_pr","benefit_notice","utilization_review","medical_legal_report"]',
 '["employment-document-authentication","workers-comp-document-validation","medical-report-format-check"]',
 'California Division of Workers Compensation', 'https://www.dir.ca.gov/dwc/',
 1, '1 year from injury (5 years for specific exposures)', '{"actual":true,"statutory":true,"attorney_fees":true}',
 NULL, NULL,
 'https://www.dir.ca.gov/dwc/', 1, datetime('now'), datetime('now')),


-- ============================================================
-- SECTION 3: COURT FILING & LEGAL DOCUMENT STANDARDS
-- ============================================================

-- CA Rules of Court — Document Format
('std_ver_014', 'VERITAS-0', 'COURT_RULE', 'CA',
 'California Rules of Court, Rules 2.100-2.119 (Format of Filed Documents)', 'CA CRC Format',
 'California Rules of Court — Document Formatting Standards',
 'California court rules governing the physical format of every document filed in state court. Specifies paper size, margins, line spacing, font requirements, page numbering, footer content, paper quality, and binding. Documents violating these standards may be rejected by the clerk. Forensically, court documents not meeting these specific formatting requirements are suspect as non-genuine or improperly prepared.',
 '["Paper size: 8.5 x 11 inches only","Margins: 1 inch on all sides minimum","Line spacing: at least double-spaced (except quotes and footnotes)","Font: proportionally spaced (12-point minimum) or fixed (10-pitch)","Page numbering: consecutive at bottom of each page","Footer: case name or number on each page","Paper quality: unglazed, white, opaque, standard weight","Binding: unbound or two-hole punched at top","Line numbers: required on left margin (numbered 1-28)","Caption: full case title and case number","Signature block: attorney name, SBN, address, phone, email","Proof of service attached"]',
 '[{"section":"Rule 2.100","description":"Form and format of papers — general"},{"section":"Rule 2.102","description":"Paper size and quality"},{"section":"Rule 2.104","description":"Margins and spacing"},{"section":"Rule 2.105","description":"Font size and style"},{"section":"Rule 2.108","description":"Footer and page numbering"},{"section":"Rule 2.110","description":"Format of first page — caption requirements"},{"section":"Rule 2.111","description":"Format of subsequent pages"},{"section":"Rule 2.112","description":"Exhibits — attachment format"},{"section":"Rule 2.119","description":"Papers to be filed under seal"}]',
 '["court_filing","motion","complaint","answer","declaration","proof_of_service","court_order","judgment","stipulation"]',
 '["court-document-authentication","filing-format-validation","caption-verification"]',
 'California Judicial Council', 'https://www.courts.ca.gov/rules.htm',
 0, NULL, NULL,
 NULL, NULL,
 'https://www.courts.ca.gov/rules.htm', 1, datetime('now'), datetime('now')),

-- Federal Court Filing — FRCP/Local Rules
('std_ver_015', 'VERITAS-0', 'COURT_RULE', 'US',
 'FRCP 10, 11; Federal Rules of Appellate Procedure 32; Local Rules (district-specific)', 'FRCP Format',
 'Federal Rules of Civil Procedure — Document Format and Signing Requirements',
 'Federal court document formatting requirements including caption format, numbered paragraphs, signing requirements (FRCP 11 — attorney certifications), and local rule supplements. FRCP 11 signature constitutes certification that the filing is not frivolous, has evidentiary support, and is not filed for improper purpose. Documents filed without proper FRCP 11 certification or violating local formatting rules are non-compliant. Each district has supplemental local rules.',
 '["Caption with court name, parties, case number, document title","Numbered paragraphs for all claims and defenses","FRCP 11 signature — certification of non-frivolousness, evidentiary support","Attorney identification: name, bar number, address, phone, email","CM/ECF electronic filing requirements","PDF/A format for electronic filings","Font: 14-point preferred (varies by local rule)","Margins: 1 inch minimum (varies by local rule)","Line spacing: double-spaced (varies by local rule)","Certificate of service","Proposed order format requirements"]',
 '[{"section":"FRCP 10","description":"Form of Pleadings — caption, paragraphs, exhibits"},{"section":"FRCP 11","description":"Signing Pleadings — certifications and sanctions"},{"section":"FRAP 32","description":"Form of Briefs, Appendices, and Other Papers"},{"section":"Local Rules","description":"District-specific supplemental format requirements"}]',
 '["federal_complaint","federal_motion","federal_brief","federal_order","federal_judgment","federal_declaration"]',
 '["court-document-authentication","federal-filing-format-validation","frcp11-certification-check"]',
 'Federal Judiciary / Administrative Office of the Courts', 'https://www.uscourts.gov/rules-policies',
 0, NULL, NULL,
 NULL, NULL,
 'https://www.uscourts.gov/rules-policies/current-rules-practice-procedure', 1, datetime('now'), datetime('now')),

-- Judicial Council Mandatory Forms
('std_ver_016', 'VERITAS-0', 'COURT_RULE', 'CA',
 'California Rules of Court, Rule 1.31; Government Code § 68511', 'CA JC Forms',
 'California Judicial Council Mandatory and Optional Forms',
 'The Judicial Council of California publishes mandatory and optional court forms. Mandatory forms MUST be used — a court filing using a non-Judicial Council form when a mandatory form exists may be rejected. Each form has a specific form number (e.g., FL-100, SC-100, CR-101), revision date, and required fields. Forensic value: form number, revision date, and required fields can be verified against the Judicial Council catalog. Outdated form revisions, incorrect form numbers, or missing mandatory fields indicate non-genuine or improperly prepared filings.',
 '["Mandatory forms must be used when available","Form number identification (e.g., FL-100, SC-100)","Current revision date verification","All required fields completed","Proper court name and address","Case number in correct position","Signature and date requirements","Footer with form number and revision date","Page numbering per form specification","Correct form for proceeding type"]',
 '[{"section":"CRC Rule 1.31","description":"Use of Judicial Council forms — mandatory vs. optional"},{"section":"Gov Code 68511","description":"Judicial Council authority to prescribe forms"},{"section":"Form Catalog","description":"Complete catalog of mandatory and optional forms"}]',
 '["judicial_council_form","family_law_form","small_claims_form","civil_form","criminal_form","probate_form"]',
 '["court-document-authentication","jc-form-validation","form-revision-verification"]',
 'California Judicial Council', 'https://www.courts.ca.gov/forms.htm',
 0, NULL, NULL,
 NULL, NULL,
 'https://www.courts.ca.gov/forms.htm', 1, datetime('now'), datetime('now')),


-- ============================================================
-- SECTION 4: LAW ENFORCEMENT DOCUMENT STANDARDS
-- ============================================================

-- POST Standards for Police Reports
('std_ver_017', 'VERITAS-0', 'STATE_REGULATION', 'CA',
 'CA Penal Code §§ 13012, 13020; 11 CCR 999.1-999.2; POST Administrative Manual', 'CA POST Reports',
 'California POST — Law Enforcement Reporting Standards',
 'Peace Officers Standards and Training (POST) requirements for law enforcement reports and documentation. Incident reports must contain specific fields including reporting officer identification (badge number, serial, department), incident classification codes (UCR/NIBRS), date/time/location, narrative structure, approval chain, and case number format. Reports lacking officer identification, using non-standard classification codes, or missing approval signatures are structurally non-compliant.',
 '["Reporting officer identification (name, badge/serial, department, rank)","Supervisor approval signature","Incident classification (UCR/NIBRS codes)","Date, time, location (address + beat/district)","Case/report number in department format","Victim/witness/suspect identification fields","Narrative structure (chronological, first-person)","Evidence documentation and chain of custody","Miranda advisement documentation","Use of force reporting (specific form requirements)","Supplemental report format","Cross-reference to related reports"]',
 '[{"section":"PC 13012","description":"Uniform crime reporting — mandatory data"},{"section":"PC 13020","description":"Domestic violence incident report requirements"},{"section":"11 CCR 999.1","description":"POST minimum standards for training"},{"section":"POST Admin Manual","description":"Administrative and reporting standards"}]',
 '["police_report","incident_report","arrest_report","use_of_force_report","supplemental_report","domestic_violence_report","traffic_collision_report"]',
 '["law-enforcement-document-authentication","police-report-format-validation","officer-identification-check"]',
 'California Commission on Peace Officer Standards and Training', 'https://post.ca.gov/',
 0, NULL, NULL,
 NULL, NULL,
 'https://post.ca.gov/', 1, datetime('now'), datetime('now')),

-- CHP 555 Traffic Collision Report
('std_ver_018', 'VERITAS-0', 'STATE_REGULATION', 'CA',
 'CA Vehicle Code § 20008; CHP 555 Form Standard', 'CHP 555',
 'California Traffic Collision Report (CHP 555) — Format Standards',
 'Standardized California traffic collision report form (CHP 555) used by all law enforcement agencies statewide. Specific field layout, coding standards (collision type, weather, lighting, road conditions), party identification, and narrative requirements. SWITRS (Statewide Integrated Traffic Records System) data elements must be accurately coded. The CHP 555 is a mandatory form — agencies cannot substitute alternative formats. Form number and current revision must appear on every page.',
 '["CHP 555 form number and revision date on each page","SWITRS coding for all categorical fields","Party identification (driver, pedestrian, cyclist, passenger)","Vehicle identification (year, make, model, VIN, license plate)","Location coding (primary road, distance, direction from intersection)","Collision diagram with measurements","Officer identification and badge number","Report approval signature","Narrative in specific format","Associated persons information","Insurance information for all parties"]',
 '[{"section":"VEH 20008","description":"Duty to report traffic collision — injury/death/property damage"},{"section":"CHP 555 Manual","description":"Field-by-field completion instructions"},{"section":"SWITRS","description":"Statewide Integrated Traffic Records System — coding standards"}]',
 '["traffic_collision_report","chp_555","accident_report","hit_and_run_report"]',
 '["law-enforcement-document-authentication","collision-report-validation","switrs-coding-check"]',
 'California Highway Patrol', 'https://www.chp.ca.gov/',
 0, NULL, NULL,
 NULL, NULL,
 'https://www.chp.ca.gov/', 1, datetime('now'), datetime('now')),


-- ============================================================
-- SECTION 5: GOVERNMENT BENEFITS DOCUMENT STANDARDS
-- ============================================================

-- SSA Document Standards
('std_ver_019', 'VERITAS-0', 'FEDERAL_REGULATION', 'US',
 '42 USC §§ 402-434; 20 CFR Parts 404, 416; SSA POMS', 'SSA Doc Standards',
 'Social Security Administration — Correspondence and Determination Document Standards',
 'SSA correspondence standards for benefit determinations, denial notices, disability decisions, and overpayment notices. SSA letters must include claim number, field office identification, decision-maker name or unit, specific statutory/regulatory citations for denials, appeal rights with deadlines (60 days), and contact information. Letters from SSA lacking these elements are either non-genuine or procedurally deficient. The POMS (Program Operations Manual System) defines internal processing standards.',
 '["Claim number (SSN-suffix format) on all correspondence","Field office identification (name, address, phone)","Decision-maker identification (name or unit designation)","Specific statutory citations for denials or determinations","Appeal rights with 60-day deadline clearly stated","Four levels of appeal described (reconsideration, hearing, Appeals Council, federal court)","Overpayment notice with calculation methodology","Representative payee correspondence requirements","Disability determination with medical evidence summary","Continuing disability review notice format"]',
 '[{"section":"42 USC 402-434","description":"Benefit entitlement provisions"},{"section":"20 CFR 404","description":"Federal Old-Age, Survivors and Disability Insurance"},{"section":"20 CFR 416","description":"Supplemental Security Income"},{"section":"POMS GN 04000","description":"Notices — content and format requirements"},{"section":"POMS DI 28000","description":"Disability determination notices"}]',
 '["ssa_determination","ssa_denial","disability_decision","overpayment_notice","ssa_correspondence","benefit_statement","medicare_notice"]',
 '["government-benefits-document-authentication","ssa-correspondence-validation","appeal-rights-verification"]',
 'Social Security Administration', 'https://www.ssa.gov/',
 0, NULL, NULL,
 NULL, NULL,
 'https://www.ssa.gov/', 1, datetime('now'), datetime('now')),

-- CalVCB Document Standards
('std_ver_020', 'VERITAS-0', 'STATE_STATUTE', 'CA',
 'CA Government Code §§ 13950-13966; 2 CCR 649.1-649.76', 'CalVCB Doc Standards',
 'California Victim Compensation Board — Application and Determination Document Standards',
 'CalVCB application processing and determination notice requirements. Applications must be filed within specified timeframes. Determination notices must include specific findings, statutory citations, appeal rights (30 days for judicial review per Gov Code 13960), evidence considered, and restitution calculations. Letters lacking application numbers, hearing officer identification, or specific denial reasons are procedurally deficient.',
 '["Application number on all correspondence","Determination with specific findings of fact","Statutory citations for approvals and denials","Appeal rights with 30-day deadline (Gov Code 13960)","Evidence considered and weighed","Restitution/compensation calculation methodology","Hearing officer identification","Victim notification requirements","Law enforcement report verification","Medical documentation requirements","Emergency award procedures and notices"]',
 '[{"section":"Gov Code 13950-13954","description":"Definitions and eligibility requirements"},{"section":"Gov Code 13955-13957","description":"Grounds for denial and reduction"},{"section":"Gov Code 13958-13960","description":"Hearing and judicial review procedures"},{"section":"Gov Code 13961-13966","description":"Recovery and restitution"},{"section":"2 CCR 649.1-649.76","description":"CalVCB implementing regulations"}]',
 '["calvcb_application","calvcb_determination","calvcb_denial","calvcb_appeal","victim_compensation_notice"]',
 '["government-benefits-document-authentication","calvcb-determination-validation","victim-rights-compliance"]',
 'California Victim Compensation Board', 'https://victims.ca.gov/',
 1, '30 days for judicial review (Gov Code 13960)', '{"actual":true,"injunctive":true}',
 NULL, NULL,
 'https://victims.ca.gov/', 1, datetime('now'), datetime('now')),


-- ============================================================
-- SECTION 6: REAL PROPERTY DOCUMENT STANDARDS
-- ============================================================

-- CA Recording Standards
('std_ver_021', 'VERITAS-0', 'STATE_STATUTE', 'CA',
 'CA Government Code §§ 27201-27387; CA Civil Code §§ 1169-1231', 'CA Recording Standards',
 'California County Recorder — Document Recording Format Standards',
 'California standards for recordable documents (deeds, liens, notices, abstracts). Government Code 27201 specifies physical format: paper size (8.5x11 or 8.5x14), margins (minimum requirements for recorder stamps), font size (minimum 10-point), and content requirements. Documents must include grantor/grantee names, legal description, notary acknowledgment, documentary transfer tax statement, and APN. Non-conforming documents may be rejected for recording or recorded with a surcharge.',
 '["Paper size: 8.5 x 11 or 8.5 x 14 inches","Top margin: 2.5 inches (first page) for recorder stamps","Side margins: 0.5 inch minimum","Font: 8-point minimum (10-point preferred)","Grantor and grantee names (matching notary acknowledgment)","Legal description of property","Notary acknowledgment or proof of execution","Documentary Transfer Tax statement or exemption","Assessor Parcel Number (APN)","Return address for recorded document","Original signatures (not photocopies)","Page numbering on multi-page documents","No colored paper, no carbon copies"]',
 '[{"section":"Gov Code 27201","description":"Recording requirements — format and content"},{"section":"Gov Code 27279","description":"Documentary transfer tax declaration"},{"section":"Gov Code 27287-27322","description":"Fees and surcharges for non-conforming documents"},{"section":"CIV 1169-1185","description":"Grants — form, execution, delivery"},{"section":"CIV 1213-1231","description":"Recording — constructive notice, priority"}]',
 '["grant_deed","quitclaim_deed","trust_deed","deed_of_trust","lien","abstract_of_judgment","notice_of_default","reconveyance","lis_pendens","easement"]',
 '["real-property-document-authentication","recording-format-validation","notary-verification","deed-content-check"]',
 'California County Recorders Association', 'https://www.crecorders.com/',
 0, NULL, NULL,
 NULL, NULL,
 'https://leginfo.legislature.ca.gov/faces/codes_displayexpandedbranch.xhtml?tocCode=GOV', 1, datetime('now'), datetime('now')),

-- Title Insurance / ALTA Standards
('std_ver_022', 'VERITAS-0', 'PROFESSIONAL_STANDARD', 'US',
 'ALTA Title Insurance Forms; ALTA Best Practices Framework', 'ALTA Standards',
 'American Land Title Association — Title Document Standards',
 'ALTA standards for title insurance commitments, policies, endorsements, and closing documents. ALTA forms have specific numbered sections, mandatory language, and defined terms. The ALTA Best Practices Framework (7 pillars) defines operational standards for title companies including document security, escrow handling, and settlement procedures. Title documents not using current ALTA form numbers or containing non-standard language modifications are forensically significant.',
 '["ALTA Commitment for Title Insurance — Schedule A (terms) and Schedule B (exceptions)","ALTA Owner Policy — standard numbered conditions","ALTA Loan Policy — standard numbered conditions","ALTA endorsement forms (numbered, specific language)","Settlement Statement / Closing Disclosure","Escrow instructions format","Wire transfer verification procedures","Document recording confirmation","Title search and examination standards","7 ALTA Best Practices Pillars"]',
 '[{"section":"ALTA Commitment","description":"Schedule A and B — terms and exceptions format"},{"section":"ALTA Owner Policy","description":"Standard conditions and coverage provisions"},{"section":"ALTA Loan Policy","description":"Lender coverage conditions"},{"section":"Best Practice 1","description":"Licensing — maintain required licenses"},{"section":"Best Practice 2","description":"Escrow Accounting — proper handling of funds"},{"section":"Best Practice 3","description":"Privacy and Security — protect NPI"},{"section":"Best Practice 7","description":"Consumer Complaints — resolution procedures"}]',
 '["title_commitment","title_policy","title_endorsement","settlement_statement","closing_disclosure","escrow_instructions","preliminary_title_report"]',
 '["real-property-document-authentication","title-document-validation","alta-form-verification"]',
 'American Land Title Association', 'https://www.alta.org/',
 0, NULL, NULL,
 NULL, NULL,
 'https://www.alta.org/', 1, datetime('now'), datetime('now')),


-- ============================================================
-- SECTION 7: FINANCIAL INSTRUMENT STANDARDS
-- ============================================================

-- Treasury Securities Standards
('std_ver_023', 'VERITAS-0', 'FEDERAL_REGULATION', 'US',
 '31 CFR Parts 306, 315, 353, 363; 31 USC § 3105', 'Treasury Securities',
 'U.S. Treasury Securities — Document and Correspondence Standards',
 'Federal standards for Treasury bonds, notes, bills, and savings bonds documentation. Governs issuance records, ownership registration, redemption procedures, and correspondence from the Bureau of the Fiscal Service. Treasury correspondence must include customer identification numbers, request tracking numbers, specific determination language, and dispute/appeal mechanisms. Correspondence that produces contradictory results for the same inquiry, assigns multiple customer numbers to the same individual, or lacks signatory accountability violates these standards.',
 '["Customer identification number consistency (single number per individual)","Request tracking number in sequential format","Determination language with specific factual basis","Dispute mechanism for adverse determinations","Signatory accountability (name, title, division)","Bond identification details (series, denomination, issue date, serial number)","Ownership registration verification methodology","Redemption value calculation transparency","Privacy Act disclosure requirements","Consistent letterhead within correspondence series","Address verification before correspondence","Response consistency for identical inquiries"]',
 '[{"section":"31 CFR 306","description":"General Regulations Governing Treasury Securities"},{"section":"31 CFR 315","description":"Regulations Governing U.S. Savings Bonds, Series A-E"},{"section":"31 CFR 353","description":"Regulations Governing Savings Bonds, Series EE and HH"},{"section":"31 CFR 363","description":"Regulations Governing Securities Held in TreasuryDirect"},{"section":"31 USC 3105","description":"Savings Bonds — statutory authority"}]',
 '["savings_bond","treasury_note","treasury_bill","treasury_bond","treasury_correspondence","treasury_hunt_response","treasury_securities_statement"]',
 '["treasury-correspondence-validation","treasury-securities-authentication","customer-identity-consistency-check"]',
 'Bureau of the Fiscal Service', 'https://www.treasurydirect.gov/',
 0, NULL, NULL,
 NULL, NULL,
 'https://www.treasurydirect.gov/', 1, datetime('now'), datetime('now')),

-- ECOA Adverse Action Notices
('std_ver_024', 'VERITAS-0', 'FEDERAL_STATUTE', 'US',
 '15 USC §§ 1691-1691f; 12 CFR Part 1002 (Regulation B)', 'ECOA/Reg B',
 'Equal Credit Opportunity Act / Regulation B — Adverse Action Notice Standards',
 'Federal requirements for adverse action notices when credit is denied or terms changed. Notices must contain specific reasons for denial (not generic categories), applicant rights, ECOA notice, creditor identification, and consumer reporting agency identification if report was used. Notice must be provided within 30 days of adverse action. Notices using vague reasons, missing agency contact information, or lacking specific ECOA rights language are non-compliant.',
 '["Specific reasons for adverse action (not generic)","Statement of applicant rights under ECOA","Creditor name and address","Consumer reporting agency name, address, phone (if report used)","Statement that agency did not make credit decision","Right to obtain free credit report within 60 days","Right to dispute accuracy of information","Provided within 30 days of adverse action","ECOA anti-discrimination notice","Signature or authorized representative identification"]',
 '[{"section":"15 USC 1691(d)","description":"Adverse action notice requirements"},{"section":"12 CFR 1002.9","description":"Notifications — specific reasons and timing"},{"section":"12 CFR 1002.9(a)(2)","description":"Content of adverse action notice"},{"section":"Appendix C","description":"Sample notification forms"}]',
 '["adverse_action_notice","credit_denial","credit_application_response","counteroffer"]',
 '["financial-document-authentication","adverse-action-notice-validation","ecoa-compliance-check"]',
 'Consumer Financial Protection Bureau', 'https://www.consumerfinance.gov/rules-policy/regulations/1002/',
 1, '2 years', '{"actual":true,"statutory":"Individual: $10,000; Class: lesser of $500,000 or 1% of net worth","punitive":true,"attorney_fees":true}',
 '1974-10-28', '2024-01-01',
 'https://www.consumerfinance.gov/rules-policy/regulations/1002/', 1, datetime('now'), datetime('now')),


-- ============================================================
-- SECTION 8: DMV / MOTOR VEHICLE TITLE STANDARDS
-- ============================================================

-- CA DMV Title and Registration Forms
('std_ver_025', 'VERITAS-0', 'STATE_REGULATION', 'CA',
 'CA Vehicle Code §§ 4150-4166, 5600-5610, 9250-9265; 13 CCR 150-156', 'CA DMV Forms',
 'California DMV — Title, Registration, and Transfer Document Standards',
 'California DMV form standards for vehicle titles (pink slips), registration cards, transfer documents, and dealer reports. Each DMV form has a specific REG number, revision date, and mandatory fields. Title documents (Certificate of Title) have security features including watermarks, microprinting, and sequential numbering. Registration cards must contain specific VIN, plate, owner, and lienholder information. DMV forms with incorrect revision dates, missing security features, or non-matching VIN/plate combinations are forensically significant.',
 '["Certificate of Title security features (watermark, microprinting, sequential number)","REG form numbers and current revision dates","VIN, license plate, and registered owner consistency","Lienholder recording on title and registration","Transfer date and odometer reading","Smog certification status","Registration expiration date","Fees paid and payment method","Vehicle description (year, make, model, body type, engine)","Planned Non-Operation (PNO) status recording","Salvage, junk, revived salvage branding","Duplicate title indicators"]',
 '[{"section":"VEH 4150-4166","description":"Title issuance and content requirements"},{"section":"VEH 5600-5610","description":"Transfer of title — timing and procedures"},{"section":"VEH 9250-9265","description":"Registration and weight fees"},{"section":"13 CCR 150-156","description":"Vehicle registration implementing regulations"}]',
 '["certificate_of_title","registration_card","reg_51_report_of_sale","reg_262_transfer","reg_553_bill_of_sale","reg_227_application","dmv_form"]',
 '["auto-sale-document-authentication","dmv-form-validation","title-security-feature-check","vin-consistency-verification"]',
 'California Department of Motor Vehicles', 'https://www.dmv.ca.gov/',
 0, NULL, NULL,
 NULL, NULL,
 'https://www.dmv.ca.gov/portal/handbook/vehicle-industry-registration-procedures-manual/', 1, datetime('now'), datetime('now'));


-- ============================================================
-- SECTION 9: CROSS-REFERENCES FOR NEW STANDARDS
-- ============================================================

-- Insurance: CA INS ↔ NAIC Model
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_ver_004', 'std_ver_010', 'std_ver_011', 'IMPLEMENTS', 'California Insurance Code implements and extends NAIC Model 900 unfair claims practices standards.', datetime('now'));

-- Workers Comp ↔ Medical Doc Standards
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_ver_005', 'std_ver_013', 'std_ver_007', 'REQUIRES', 'Workers comp medical reports must also comply with HIPAA documentation standards for provider identification and coding.', datetime('now'));

-- CA Court Format ↔ JC Mandatory Forms
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_ver_006', 'std_ver_014', 'std_ver_016', 'SUPPLEMENTS', 'CRC format rules apply to all filings; JC mandatory forms have additional specific format requirements.', datetime('now'));

-- Federal Court ↔ CA Court
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_ver_007', 'std_ver_015', 'std_ver_014', 'REFERENCES', 'State and federal court formatting standards differ but both are needed for removal/remand cases crossing jurisdictions.', datetime('now'));

-- SSA ↔ CalVCB
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_ver_008', 'std_ver_019', 'std_ver_020', 'REFERENCES', 'SSA disability determinations may be referenced in CalVCB victim compensation applications as evidence of incapacity.', datetime('now'));

-- Real Property Recording ↔ ALTA
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_ver_009', 'std_ver_021', 'std_ver_022', 'SUPPLEMENTS', 'County recording standards govern physical document format; ALTA standards govern title insurance document content and procedures.', datetime('now'));

-- Treasury Securities ↔ ECOA Adverse Action
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_ver_010', 'std_ver_023', 'std_ver_024', 'REFERENCES', 'Treasury securities ownership disputes may involve credit decisions triggering ECOA adverse action notice requirements.', datetime('now'));

-- ECOA ↔ FDCPA
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_ver_011', 'std_ver_024', 'std_ver_008', 'REFERENCES', 'Credit denial (ECOA) that later becomes debt collection (FDCPA) — denied credit cannot create a valid debt to collect.', datetime('now'));

-- CA DMV Forms ↔ CA VEH Dealer
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_ver_012', 'std_ver_025', 'std_ver_002', 'SUPPLEMENTS', 'DMV form standards supplement dealer disclosure requirements — dealer must use correct DMV forms with current revision dates.', datetime('now'));

-- POST Reports ↔ CalVCB
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_ver_013', 'std_ver_017', 'std_ver_020', 'REFERENCES', 'CalVCB requires verified law enforcement report — POST reporting standards define what constitutes a valid report for CalVCB purposes.', datetime('now'));

-- CHP 555 ↔ POST Reports
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_ver_014', 'std_ver_018', 'std_ver_017', 'IMPLEMENTS', 'CHP 555 is the specific implementation of POST reporting standards for traffic collisions.', datetime('now'));

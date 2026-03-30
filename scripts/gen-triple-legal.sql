-- Legal/Courts Industry: Triple Constraint Completion
-- Governing Guidelines + Standards of Creation + SOC Controls
-- 68 personas across 21 groups: judicial officers, court admin, legal practitioners,
-- support professionals, investigators, ADR, law enforcement, specialized court roles,
-- forensic experts, child welfare, regulatory bodies, fiduciaries, support enforcement,
-- technology/records, self-help, federal specialized, legal aid, specialty document,
-- compliance/oversight, real property, and indigent defense.
-- All statutes, standards bodies, certifications, and audit methodologies are REAL.

-- ============================================================
-- GROUP 1: JUDICIAL OFFICERS (Personas 1-4)
-- ============================================================

UPDATE citizen_catalog SET
  governing_guidelines = 'California Constitution Art. VI; California Code of Judicial Ethics (Canons 1-5); California Rules of Court (Titles 1-10); Cal. Code Civ. Proc. §§ 170-170.9 (disqualification); Cal. Penal Code §§ 1200-1210 (sentencing); Cal. Family Code §§ 2000-3200 (family law orders); 28 U.S.C. § 455 (federal disqualification parallel)',
  standards_of_creation = 'Judicial Council mandatory forms (FL, CR, MC, SC series); California Rules of Court Rule 2.30 (form/format requirements); NCSC CourTools performance measures; ABA Model Code of Judicial Conduct; local court rules (county-specific)',
  soc_controls = 'Case Management System audit trails (Tyler Odyssey, CMS); digital signature verification on orders; minute order authentication; court seal requirements (Gov. Code § 69844); record retention per Gov. Code § 68152; judicial workload reporting (Judicial Council); ex parte communication disclosure compliance'
WHERE name LIKE '%Judge of the Superior Court%';

UPDATE citizen_catalog SET
  governing_guidelines = 'California Constitution Art. VI, §§ 10-14; California Rules of Court, Title 8 (Appellate Rules); Cal. Rules of Court 8.100-8.1125; Cal. Code Civ. Proc. §§ 901-923 (appellate jurisdiction); Cal. Penal Code §§ 1235-1260 (criminal appeals)',
  standards_of_creation = 'Cal. Rules of Court 8.204 (opinion format); Cal. Style Manual (published opinions); Cal. Rules of Court 8.1105-8.1125 (publication rules); ABA Standards for Appellate Courts',
  soc_controls = 'Appellate Courts Case Management System (ACCMS); published opinion authentication; filing timestamp verification; slip opinion vs. bound volume reconciliation; opinion depublication tracking; rehearing petition processing audit'
WHERE name LIKE '%Associate Justice%Court of Appeal%';

UPDATE citizen_catalog SET
  governing_guidelines = '28 U.S.C. §§ 631-639 (Federal Magistrates Act); Federal Rules of Civil Procedure; Federal Rules of Criminal Procedure; Federal Rules of Evidence; local court rules (district-specific)',
  standards_of_creation = 'Administrative Office forms (AO series); CM/ECF filing standards; Federal Judicial Center guidelines; local rules for report and recommendation format',
  soc_controls = 'CM/ECF electronic filing audit trail; PACER access logging; digital signature certificates (CJIS standards); federal records retention (28 U.S.C. § 457); R&R adoption/rejection tracking; consent jurisdiction verification'
WHERE name LIKE '%Magistrate Judge%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Gov. Code §§ 11340-11529 (California APA); 5 U.S.C. §§ 554-557 (Federal APA); 42 U.S.C. § 405(b) (SSA hearings); Cal. Gov. Code §§ 11500-11529 (state hearing procedures); agency-specific regulations',
  standards_of_creation = 'OAH decision format requirements; SSA HALLEX procedures manual; Model State APA (Uniform Law Commission); agency precedential decision standards',
  soc_controls = 'Hearing recording/transcription systems; evidence exhibit tracking; decision issuance timestamps; administrative record certification; ex parte contact prohibition compliance; recusal documentation'
WHERE name LIKE '%Administrative Law Judge%';

-- ============================================================
-- GROUP 2: COURT ADMINISTRATION (Personas 5-9)
-- ============================================================

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Gov. Code §§ 69840-69856 (county clerk duties); Cal. Gov. Code §§ 68150-68153 (record retention); Cal. Rules of Court 2.100-2.119 (filing requirements); 28 U.S.C. §§ 751-757 (federal clerks); Cal. Code Civ. Proc. §§ 1010-1013a (service/filing)',
  standards_of_creation = 'Cal. Rules of Court 2.100 (paper format); Cal. Rules of Court 2.250-2.259 (e-filing standards); Judicial Council form numbering/versioning; local filing requirements (county-specific); NARA records management standards (federal)',
  soc_controls = 'Filed-stamp authentication (Gov. Code § 69844); case index integrity (Cal. Rules of Court 2.300); e-filing system audit trails; certified copy authentication; seal of court verification; record destruction logs (Gov. Code § 68152); conformed copy tracking'
WHERE name LIKE '%Clerk of the Superior Court%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Gov. Code §§ 69894-69898 (CEO duties); Cal. Rules of Court 10.600-10.670 (court administration); Trial Court Financial Policies and Procedures Manual; Government Code §§ 77000-77655 (Trial Court Funding Act)',
  standards_of_creation = 'NACM Core Competency Curriculum; NCSC CourTools performance standards; Judicial Council reporting requirements; court strategic plan standards',
  soc_controls = 'Case management system access controls; financial audit compliance (Gov. Code § 77206); juror management system integrity; facilities security standards; IT system disaster recovery plans; annual budget reporting verification; caseflow management metrics'
WHERE name LIKE '%Court Executive Officer%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Bus. & Prof. Code §§ 8000-8050 (CSR licensing); Cal. Code Civ. Proc. §§ 269-274 (reporter duties); Cal. Gov. Code §§ 69941-69960 (official reporters); Cal. Rules of Court 2.950-2.958 (transcript format); 28 U.S.C. § 753 (federal court reporters)',
  standards_of_creation = 'Cal. Rules of Court 2.952 (transcript format requirements); NCRA Guidelines for Professional Practice; realtime certification standards (RMR, RDR, RR); ASCII/electronic transcript format standards; Cal. Code Civ. Proc. § 273 (transcript certification)',
  soc_controls = 'Steno note retention (Gov. Code § 69955); transcript certification authentication; realtime feed accuracy verification; original notes vs. transcript reconciliation; CSR license verification; daily copy request tracking; appeal transcript completion deadline compliance'
WHERE name LIKE '%Shorthand Reporter%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Gov. Code §§ 68560-68566 (interpreter requirements); Cal. Evidence Code §§ 750-755 (interpreter qualifications); Cal. Rules of Court 2.890-2.895; Court Interpreters Act (28 U.S.C. §§ 1827-1828, federal); Cal. Gov. Code § 68561 (oath requirements)',
  standards_of_creation = 'Judicial Council interpreter certification exam standards; NAJIT Code of Ethics and Professional Responsibilities; Cal. Rules of Court 2.890 (qualifications); simultaneous/consecutive interpretation protocols',
  soc_controls = 'Interpreter oath on record; credential verification before proceeding; waiver of interpreter documentation; complaint/discipline tracking; language access plan compliance; continuing education hour verification'
WHERE name LIKE '%Court Interpreter%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Code Civ. Proc. §§ 190-237 (jury selection); Cal. Penal Code §§ 893-904 (grand jury); 28 U.S.C. §§ 1861-1878 (Federal Jury Selection and Service Act); Cal. Rules of Court 2.1000-2.1070',
  standards_of_creation = 'Judicial Council jury forms (JURY series); master jury list creation standards; juror qualification questionnaire standards; ABA Principles for Juries and Jury Trials',
  soc_controls = 'Source list cross-referencing (DMV/voter rolls); random selection algorithm verification; juror qualification/disqualification audit trail; one-day/one-trial compliance tracking; hardship excuse documentation; juror compensation disbursement records'
WHERE name LIKE '%Jury%Commissioner%';

-- ============================================================
-- GROUP 3: LEGAL PRACTITIONERS (Personas 10-17)
-- ============================================================

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Bus. & Prof. Code §§ 6000-6228 (State Bar Act); California Rules of Professional Conduct (Rules 1.0-8.5); Cal. Code Civ. Proc. (civil procedure); Cal. Rules of Court 3.10-3.2120 (civil rules); Cal. Code Civ. Proc. § 128.7 (sanctions for frivolous filings)',
  standards_of_creation = 'Cal. Rules of Court 2.100-2.119 (document format); Cal. Rules of Court 3.1110-3.1116 (motion format); local court rules (county formatting); ABA Civil Discovery Standards; Cal. Code Civ. Proc. §§ 2016.010-2036.050 (discovery)',
  soc_controls = 'State Bar license verification (active/inactive/suspended); MCLE compliance (Bus. & Prof. Code § 6070); client trust account auditing (Rules of Prof. Conduct 1.15); malpractice insurance verification; Cal. Rules of Court 9.7 (attorney identification number); conflict of interest screening documentation'
WHERE name LIKE '%Attorney at Law%Counselor at Law%Civil%';

UPDATE citizen_catalog SET
  governing_guidelines = 'U.S. Constitution, 6th Amendment (right to counsel); Cal. Penal Code §§ 686-700.1 (defendant rights); Cal. Penal Code §§ 1016-1016.5 (pleas); Cal. Rules of Professional Conduct (Rules 1.0-8.5); Cal. Penal Code §§ 1203-1203.4 (probation); Strickland v. Washington, 466 U.S. 668 (ineffective assistance standard)',
  standards_of_creation = 'Cal. Rules of Court 4.100-4.700 (criminal rules); Judicial Council criminal forms (CR series); ABA Standards for Criminal Justice; ABA Ten Principles of a Public Defense Delivery System; Cal. Penal Code § 1018 (plea withdrawal standards)',
  soc_controls = 'State Bar license verification; indigency determination records (Pen. Code § 987); conflict of interest screening; attorney-client privilege logs; ineffective assistance claims audit trail; speedy trial compliance tracking; jail visit documentation'
WHERE name LIKE '%Criminal Defense%Public Defender%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Gov. Code §§ 26500-26507 (DA duties); Cal. Penal Code §§ 681-695 (prosecution powers); Brady v. Maryland, 373 U.S. 83 (disclosure obligations); Cal. Penal Code §§ 1054-1054.7 (discovery obligations); Cal. Rules of Professional Conduct 3.8 (special responsibilities); Cal. Penal Code §§ 1170-1170.95 (sentencing)',
  standards_of_creation = 'Judicial Council criminal forms (CR series); CDAA Uniform Crime Charging Standards; NDAA National Prosecution Standards; Brady/Giglio disclosure checklists; charging document format (Cal. Penal Code §§ 948-960)',
  soc_controls = 'Brady compliance tracking systems; evidence chain of custody documentation; victim notification compliance (Marsy''s Law, Cal. Const. Art. I, § 28); conviction integrity unit review; prosecutorial discretion documentation; discovery disclosure logging'
WHERE name = 'Prosecutor / District Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = 'California Family Code (entire code); Cal. Family Code §§ 210-215 (general provisions); Cal. Family Code §§ 2000-2129 (dissolution); Cal. Family Code §§ 3000-3465 (custody); Cal. Family Code §§ 4000-4339 (child/spousal support); Cal. Family Code §§ 6200-6390 (DVPA); Cal. Rules of Court 5.2-5.700 (family rules)',
  standards_of_creation = 'Judicial Council family law forms (FL series); Cal. Rules of Court 5.111-5.125 (document format); Elkins Family Law Task Force recommendations; DissoMaster/XSpouse support calculation standards; UCCJEA compliance (Fam. Code §§ 3400-3465)',
  soc_controls = 'Board of Legal Specialization certification verification; mandatory disclosure compliance (Fam. Code §§ 2100-2113); CLETS restraining order database entry; child custody mediation compliance (Fam. Code § 3170); income and expense declaration verification; DVRO service confirmation tracking'
WHERE name LIKE '%Family Law%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Immigration and Nationality Act (8 U.S.C. § 1101 et seq.); 8 C.F.R. (immigration regulations); 8 U.S.C. § 1229a (removal proceedings); 8 C.F.R. § 1003.102 (practitioner discipline); Cal. Bus. & Prof. Code §§ 6400-6416 (immigration consultant regulation)',
  standards_of_creation = 'USCIS form standards (I-series forms); EOIR Practice Manual; BIA appellate brief format; country conditions documentation standards; asylum application standards (I-589)',
  soc_controls = 'EOIR attorney registration; E-Verify/SAVE system verification; BIA/EOIR discipline history; USCIS receipt tracking; interpreter certification for proceedings; filing deadline compliance (motion to reopen/reconsider windows)'
WHERE name LIKE '%Immigration%';

UPDATE citizen_catalog SET
  governing_guidelines = '11 U.S.C. §§ 101-1532 (Bankruptcy Code); Federal Rules of Bankruptcy Procedure; 28 U.S.C. §§ 151-159 (bankruptcy courts); local bankruptcy rules (district-specific); 11 U.S.C. § 707(b) (means test)',
  standards_of_creation = 'Official Bankruptcy Forms (B series); Bankruptcy Rules 1002-1021 (petition requirements); BAPCPA compliance standards; Schedules A/B through J format; Statement of Financial Affairs format',
  soc_controls = 'CM/ECF filing verification; credit counseling certificate verification (11 U.S.C. § 109(h)); means test calculation audit; asset disclosure completeness review; trustee reporting standards compliance; automatic stay violation tracking'
WHERE name LIKE '%Bankruptcy%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Probate Code §§ 1-21700 (entire code); Cal. Probate Code §§ 6100-6390 (wills); Cal. Probate Code §§ 15000-18201 (trusts); Cal. Probate Code §§ 1800-2901 (conservatorships/guardianships); Cal. Probate Code §§ 4000-4545 (powers of attorney); Cal. Probate Code §§ 8000-12591 (estate administration)',
  standards_of_creation = 'Judicial Council probate forms (DE, GC, PR series); Cal. Probate Code §§ 6110-6113 (will execution requirements); Cal. Probate Code §§ 15200-15212 (trust creation requirements); Uniform Trust Code standards; ACTEC Commentary on Model Rules',
  soc_controls = 'Board of Legal Specialization certification verification; notarization verification; witness attestation compliance; trust registration/certification; bond requirements (Prob. Code §§ 8480-8488); inventory and appraisal verification (Prob. Code § 8800); fiduciary duty compliance documentation'
WHERE name = 'Estate Planning / Probate Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Rules of Court Title 8 (Appellate Rules); Cal. Code Civ. Proc. §§ 901-923; Cal. Rules of Court 8.200-8.272 (civil appeals); Cal. Rules of Court 8.300-8.368 (criminal appeals); Cal. Rules of Court 8.380-8.392 (habeas corpus)',
  standards_of_creation = 'Cal. Rules of Court 8.204 (brief format — strict page/word limits); Cal. Rules of Court 8.144 (record format); Cal. Rules of Court 8.212 (appendix requirements); Cal. Style Manual (citation format); ABA Standards for Appellate Practice',
  soc_controls = 'Board of Legal Specialization certification verification; TrueFiling electronic submission audit; appendix completeness verification; timeliness compliance (jurisdictional deadlines); certificate of word count/compliance; record augmentation tracking'
WHERE name LIKE '%Appellate%Specialist%';

-- ============================================================
-- GROUP 4: LEGAL SUPPORT PROFESSIONALS (Personas 18-22)
-- ============================================================

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Bus. & Prof. Code §§ 6450-6456 (paralegal definition/requirements); Cal. Rules of Professional Conduct (attorney supervision); Cal. Bus. & Prof. Code § 6452 (education/experience requirements); ABA Model Guidelines for Utilization of Paralegal Services',
  standards_of_creation = 'NALA Model Standards and Guidelines; NFPA Model Code of Ethics; ABA Guidelines for Approval of Paralegal Education Programs; Cal. Bus. & Prof. Code § 6450(c) (task limitations); document preparation under attorney supervision standards',
  soc_controls = 'MCLE compliance (Cal. Bus. & Prof. Code § 6452); supervising attorney identification on documents; UPL compliance (no independent legal advice); work product documentation and tracking; NALA CP or NFPA RP certification verification'
WHERE name = 'Paralegal / Legal Assistant';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Bus. & Prof. Code §§ 6400-6416 (LDA registration); Cal. Bus. & Prof. Code § 6400(c) (scope limitations); Cal. Bus. & Prof. Code § 6411 (bond requirement); Cal. Bus. & Prof. Code § 6413 (prohibited acts)',
  standards_of_creation = 'County registration standards; disclosure statement requirements (B&P § 6410.5); self-help form completion standards; Judicial Council form adherence',
  soc_controls = 'County registration verification; bond verification ($25,000 minimum); UPL compliance monitoring; client disclosure documentation; 2-year registration renewal tracking; complaint history review'
WHERE name LIKE '%Legal Document Assistant%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Code Civ. Proc. §§ 413.10-417.40 (service of process); Cal. Code Civ. Proc. §§ 415.10-415.95 (manner of service); Cal. Bus. & Prof. Code §§ 22350-22360 (registration); Cal. Code Civ. Proc. §§ 1005-1005.5 (notice requirements); Federal Rules of Civil Procedure Rule 4 (federal service)',
  standards_of_creation = 'Proof of service format (Judicial Council POS forms); Cal. Code Civ. Proc. §§ 417.10-417.40 (proof of service requirements); due diligence declaration standards; substituted service affidavit standards',
  soc_controls = 'County registration verification; bond verification (CCP § 995.710); GPS/timestamp verification (modern services); service attempt log documentation; proof of service filing verification; sub-service declaration completeness audit'
WHERE name LIKE '%Process Server%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Gov. Code §§ 8200-8230 (notary appointment); Cal. Gov. Code §§ 8200-8228 (notary duties); Cal. Civ. Code §§ 1185-1197 (acknowledgments); Cal. Gov. Code § 8202 (oath/bond requirements); Cal. Gov. Code §§ 8205-8206 (journal requirements)',
  standards_of_creation = 'Cal. Gov. Code § 8202 (commission standards); Cal. Gov. Code § 8205 (journal entry requirements); Cal. Civ. Code § 1189 (acknowledgment certificate form); Cal. Gov. Code § 8206 (thumbprint requirements); NNA Best Practices standards; Remote Online Notarization standards (where applicable)',
  soc_controls = 'Sequential journal entries (Gov. Code § 8206); satisfactory evidence of identity (Civ. Code § 1185); commission expiration tracking; seal/stamp authentication; bond verification ($15,000); error and omissions insurance ($30,000); thumbprint journal requirement; Secretary of State commission verification'
WHERE name = 'Notary Public';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Rules of Court 2.100-2.119 (format compliance); local court rules (county-specific formatting); attorney supervision requirements; Cal. Bus. & Prof. Code § 6125 (UPL prohibition)',
  standards_of_creation = 'NALS certification standards; LSI Legal Procedures Manual; court-specific formatting guides; document management system protocols; e-filing system proficiency standards',
  soc_controls = 'Document version control; filing deadline tracking systems; calendar management audit trails; confidentiality/NDA compliance; NALS ALS/PLS/PP certification verification; e-filing rejection rate monitoring'
WHERE name LIKE '%Legal Secretary%';

-- ============================================================
-- GROUP 5: COURT-APPOINTED / INVESTIGATIVE OFFICERS (Personas 23-27)
-- ============================================================

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code §§ 1203-1203.4 (probation); Cal. Welf. & Inst. Code §§ 200-987 (juvenile); Cal. Penal Code §§ 1202-1202.5 (restitution); Cal. Rules of Court 4.410-4.480 (sentencing rules); Cal. Penal Code §§ 3000-3064 (parole supervision for realignment)',
  standards_of_creation = 'Cal. Rules of Court 4.411-4.411.5 (probation report format); BSCC standards and training; risk/needs assessment instrument standards (COMPAS, Static-99); Judicial Council sentencing forms (CR series); victim impact statement collection standards',
  soc_controls = 'CLETS/CJIS access controls; case management system audit trails; drug testing chain of custody; GPS monitoring records; restitution payment tracking; probation violation documentation; caseload compliance reporting per BSCC standards'
WHERE name LIKE '%Probation Officer%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Probate Code §§ 1454-1455 (investigation duties); Cal. Probate Code §§ 1826-1851 (conservatorship investigations); Cal. Probate Code §§ 1513-1516 (guardianship investigations); Cal. Rules of Court 7.1050-7.1060; Cal. Probate Code § 1850 (biennial review)',
  standards_of_creation = 'Cal. Rules of Court 7.1050 (report format); Judicial Council guardianship/conservatorship forms (GC series); interview and investigation protocol standards; capacity assessment documentation standards; least restrictive alternative analysis framework',
  soc_controls = 'Investigation scheduling compliance (180-day/annual/biennial); conservatee contact verification; report confidentiality controls; conflict of interest disclosure; court-ordered investigation tracking; conservatee rights advisement documentation'
WHERE name = 'Court Investigator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Family Code §§ 3110-3118 (custody evaluation); Cal. Family Code § 3111 (evaluator qualifications); Cal. Family Code §§ 3170-3188 (mediation/recommending counseling); Cal. Rules of Court 5.220 (FCS counselor standards); Cal. Rules of Court 5.225 (private evaluator standards); Cal. Fam. Code § 3042 (child''s wishes)',
  standards_of_creation = 'Cal. Rules of Court 5.220 (report format); AFCC Model Standards of Practice for Child Custody Evaluation; APA Guidelines for Child Custody Evaluations; Cal. Fam. Code § 3118 (report requirements); Uniform Standards of Practice (Judicial Council)',
  soc_controls = 'Evaluator qualification verification; training compliance (Cal. Rules of Court 5.230); complaint tracking (Cal. Fam. Code § 3110.5); report distribution controls; conflict of interest screening; ex parte communication prohibition compliance; evaluation methodology documentation'
WHERE name = 'Custody Evaluator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Family Code §§ 3150-3153 (minor''s counsel); Cal. Code Civ. Proc. §§ 372-376 (GAL appointment); Cal. Rules of Court 5.240-5.242 (minor''s counsel duties); Cal. Probate Code §§ 1470-1471 (probate GAL); CAPTA requirements (federal child welfare)',
  standards_of_creation = 'Cal. Rules of Court 5.242 (duties/report format); ABA Standards for Attorneys Representing Children; NACC Recommendations for Legal Representation of Children; best interests investigation framework',
  soc_controls = 'Appointment order verification; training compliance (Cal. Rules of Court 5.242); fee approval by court; contact log with minor documentation; confidentiality protections; independent investigation documentation; position statement filing compliance'
WHERE name = 'Guardian ad Litem / Minor''s Counsel';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Welf. & Inst. Code §§ 100-108 (CASA authorization); Cal. Rules of Court 5.655 (CASA role); CASA Quality Assurance standards; 42 U.S.C. § 5106a (CAPTA federal requirements)',
  standards_of_creation = 'National CASA Standards for Programs; California CASA Program Standards; court report format requirements; investigation and advocacy guidelines',
  soc_controls = 'Background check (DOJ/FBI LiveScan); 30-hour training verification; supervisor review of reports; continuing education tracking; case documentation standards; volunteer hours and contact log verification'
WHERE name = 'Court Appointed Special Advocate';

-- ============================================================
-- GROUP 6: ALTERNATIVE DISPUTE RESOLUTION (Personas 28-30)
-- ============================================================

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Evidence Code §§ 1115-1128 (mediation confidentiality); Cal. Code Civ. Proc. §§ 1775-1775.15 (DRPA); Cal. Rules of Court 3.891-3.898 (civil mediation); Cal. Family Code §§ 3160-3186 (family mediation); Cal. Rules of Court 5.210-5.215 (family mediation rules)',
  standards_of_creation = 'Cal. Rules of Court 3.893 (mediator qualifications); Model Standards of Conduct for Mediators (ABA/AAA/ACR); ACR Standards for Mediator Certification Programs; mediation agreement format standards; confidentiality notice requirements',
  soc_controls = 'Mediator qualification verification; training hour documentation; mediation agreement execution verification; confidentiality compliance; statistical reporting (completion rates); mediation session scheduling and attendance tracking'
WHERE name LIKE '%Mediator%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Code Civ. Proc. §§ 1280-1294.4 (California Arbitration Act); Federal Arbitration Act (9 U.S.C. §§ 1-16); Cal. Code Civ. Proc. §§ 1141.10-1141.32 (judicial arbitration); Cal. Ethics Standards for Neutral Arbitrators; Cal. Rules of Court 3.810-3.830 (judicial arbitration)',
  standards_of_creation = 'Cal. Code Civ. Proc. § 1283.4 (award format); AAA Commercial Arbitration Rules; JAMS Comprehensive Arbitration Rules; Cal. Ethics Standards (disclosure requirements); award form and content requirements',
  soc_controls = 'Arbitrator disclosure compliance (CCP § 1281.85); award confirmation/vacation procedures; hearing record retention; conflict of interest screening; arbitrability determination documentation; fee deposit and accounting transparency'
WHERE name LIKE '%Arbitrator%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Constitution Art. VI, § 21 (temporary judges); Cal. Code Civ. Proc. §§ 638-645 (references); Cal. Rules of Court 2.830-2.834 (temporary judges); Cal. Rules of Court 3.900-3.924 (references); Cal. Code of Judicial Ethics (applicable to temporary judges)',
  standards_of_creation = 'Cal. Rules of Court 2.831 (stipulation format); statement of decision format (CCP § 632); order/judgment format per local rules; oath of office requirements',
  soc_controls = 'Stipulation verification; oath on record; State Bar active license verification; judicial ethics compliance; fee arrangement transparency; scope of reference order compliance tracking'
WHERE name = 'Private Judge';

-- ============================================================
-- GROUP 7: LAW ENFORCEMENT / CORRECTIONS (Personas 31-35)
-- ============================================================

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code §§ 830-832.19 (peace officer classifications); Cal. Penal Code §§ 836-851 (arrest authority); Cal. Gov. Code § 12525.5 (AB 953, RIPA); Cal. Penal Code §§ 1523-1542 (search warrants); Cal. Penal Code §§ 11164-11174.3 (mandatory reporting); Brady v. Maryland; Pitchess v. Superior Court (personnel records)',
  standards_of_creation = 'POST Basic Certificate standards; POST Report Writing course standards; Cal. Penal Code §§ 1525-1526 (warrant affidavit format); evidence collection/chain of custody protocols; use of force reporting standards (Gov. Code § 7286); arrest report/crime report format (agency SOPs)',
  soc_controls = 'POST certification verification; body-worn camera audit (Pen. Code § 832.18); CLETS/NCIC access logging; evidence management system (property/evidence tracking); internal affairs investigation records; Brady/Pitchess file maintenance; RIPA stop data reporting compliance; SB 1421 disclosure compliance'
WHERE name = 'Law Enforcement Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Constitution Art. I, § 28 (Marsy''s Law); Cal. Penal Code §§ 679-680.4 (victim rights); Cal. Gov. Code §§ 13950-13966 (CalVCB); 34 U.S.C. §§ 20101-20111 (VOCA); Cal. Penal Code §§ 1191-1191.25 (victim notification); Cal. Penal Code § 1202.4 (restitution)',
  standards_of_creation = 'CalVCB application standards; victim impact statement guidelines; VOCA grant compliance documentation; restitution calculation worksheets; safety planning documentation standards; OVC TTAC standards',
  soc_controls = 'Victim notification tracking/logging; CalVCB application processing audit; restitution disbursement tracking; confidential address program compliance; mandatory reporting compliance; VINE notification system verification; Marsy''s Law rights advisement documentation'
WHERE name LIKE '%Victim Advocate%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Gov. Code §§ 26600-26664 (sheriff duties); Cal. Code Civ. Proc. §§ 681.010-724.260 (enforcement of judgments); Cal. Penal Code §§ 4000-4030 (county jails); Cal. Code Civ. Proc. §§ 415.10-415.95 (service of process); Cal. Family Code §§ 6380-6389 (DVRO enforcement)',
  standards_of_creation = 'Levy/attachment documentation standards; service of process proof format; eviction/lockout documentation; court security incident reports; inmate classification/housing documents',
  soc_controls = 'POST certification; writ of execution tracking; levy/sale accounting; court security access logs; inmate management system records; body-worn camera (court facility); property auction notice and proceeds documentation'
WHERE name = 'Sheriff / Marshal';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code §§ 3000-3064 (parole); Cal. Penal Code §§ 3040.1-3044 (parole conditions); Cal. Penal Code §§ 3450-3465 (PRCS — Post-Release Community Supervision); 15 CCR §§ 2000-2695 (CDCR regulations); Cal. Penal Code § 1170(d) (resentencing)',
  standards_of_creation = 'CDCR Form 1502 (Notice of Parole Conditions); BPH hearing documentation standards; risk assessment tools (CSRA, Static-99R); violation report format; parole plan documentation standards',
  soc_controls = 'SOMS (Strategic Offender Management System); GPS/electronic monitoring records; drug testing chain of custody; parole hearing recording; CLETS warrant verification; victim notification (Pen. Code § 3058.8); Proposition 57 early release compliance tracking'
WHERE name = 'Parole Agent';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Penal Code §§ 11050-11055 (state crime lab); Cal. Evidence Code §§ 720-723 (expert testimony); Cal. Penal Code § 1417.1 (post-conviction DNA testing); NAS Report on Forensic Science (2009); DOJ Uniform Guidelines for Forensic Labs',
  standards_of_creation = 'ISO/IEC 17025 (testing lab competence); ASCLD/LAB accreditation standards; SWGDAM guidelines (DNA); OSAC standards (NIST); chain of custody documentation; lab report format standards',
  soc_controls = 'Laboratory accreditation verification (ANAB/A2LA); evidence chain of custody; proficiency testing records; instrument calibration logs; case file review/peer review; analyst certification/training records; root cause analysis for nonconformances'
WHERE name = 'Forensic Scientist';

-- ============================================================
-- GROUP 8: SPECIALIZED COURT ROLES (Personas 36-39)
-- ============================================================

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Code Civ. Proc. §§ 564-570 (receivership); Cal. Health & Safety Code § 17980.7 (health/safety receiverships); Cal. Rules of Court 3.1175-3.1184; Cal. Corp. Code § 1803 (corporate receivership); Cal. Code Civ. Proc. § 568 (receiver powers)',
  standards_of_creation = 'Cal. Rules of Court 3.1179 (report format); California Receivers Forum Best Practices; bond/oath documentation; monthly/quarterly reporting standards; asset disposition documentation',
  soc_controls = 'Court approval for all major actions; bond verification; accounting/financial reporting; asset inventory audit; fee petition review; real property management documentation; receivership estate bank account reconciliation'
WHERE name = 'Court-Appointed Receiver';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Code Civ. Proc. §§ 638-645 (references); Federal Rules of Civil Procedure Rule 53; Cal. Rules of Court 3.900-3.924; court order defining scope of appointment',
  standards_of_creation = 'Report and recommendation format; findings of fact/conclusions of law format; discovery dispute resolution documentation; fee statement format',
  soc_controls = 'Appointment order scope compliance; fee reasonableness review; report filing timeliness; ex parte communication prohibition; conflict of interest disclosure; evidentiary hearing documentation'
WHERE name = 'Special Master';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Insurance Code §§ 1800-1822 (bail bond regulation); Cal. Penal Code §§ 1268-1308 (bail provisions); Cal. Insurance Code § 1802 (license requirements); 10 CCR §§ 2050-2114 (bail agent regulations); Cal. Penal Code §§ 1305-1306 (forfeiture/exoneration)',
  standards_of_creation = 'Bail bond form (CDI-approved); collateral documentation standards; forfeiture/exoneration motion format; summary judgment motion format (Pen. Code § 1305); power of attorney documentation',
  soc_controls = 'CDI license verification; surety company authorization; bail bond premium accounting; collateral return tracking; fugitive recovery documentation; continuing education compliance; forfeiture tolling and extension tracking'
WHERE name LIKE '%Bail%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Bus. & Prof. Code §§ 8000-8050; Cal. Code Civ. Proc. §§ 2025.010-2025.620 (deposition procedures); Cal. Code Civ. Proc. § 2025.320 (deposition officer duties); Cal. Code Civ. Proc. §§ 2025.510-2025.550 (transcript)',
  standards_of_creation = 'Cal. Code Civ. Proc. § 2025.540 (transcript format); CSR certification requirements; deposition transcript certification standards; exhibit handling and marking protocols; videography synchronization standards',
  soc_controls = 'CSR license verification; oath administration on record; original transcript retention; errata sheet processing; exhibit chain of custody; confidentiality order compliance; transcript delivery deadline tracking'
WHERE name = 'Certified Shorthand Reporter (Deposition)';

-- ============================================================
-- GROUP 9: EXPERT AND FORENSIC PROFESSIONALS (Personas 40-44)
-- ============================================================

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Evidence Code §§ 720-723 (expert witness qualifications); Cal. Evidence Code §§ 801-805 (expert opinion); Daubert v. Merrell Dow (federal reliability standard); Sargon Enterprises v. USC (California reliability standard); Cal. Code Civ. Proc. §§ 2034.210-2034.310 (expert discovery); Federal Rules of Evidence 702-706',
  standards_of_creation = 'Cal. Code Civ. Proc. § 2034.260 (expert report format); FRCP 26(a)(2)(B) (federal expert report requirements); discipline-specific report standards (ASTM, IEEE, AMA); CV/qualification documentation standards; fee schedule disclosure requirements',
  soc_controls = 'Credential verification (licenses, certifications, publications); methodology validation (peer review, error rates, general acceptance); prior testimony tracking (impeachment database exposure); conflict of interest screening; engagement letter/retention agreement; document retention for work product'
WHERE name LIKE '%Expert Witness%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Bus. & Prof. Code §§ 5000-5158 (accountancy act); AICPA Professional Standards (AU-C, AT-C); ACFE Code of Ethics; Cal. Family Code §§ 2100-2113 (mandatory financial disclosures); 18 U.S.C. §§ 1341-1348 (federal fraud statutes, context)',
  standards_of_creation = 'AICPA Statement on Standards for Forensic Services; ACFE Fraud Examiners Manual; NACVA Professional Standards; Cal. Code Civ. Proc. § 2034.260 (expert report format); business valuation standards (ASA, NACVA); forensic report writing standards',
  soc_controls = 'CPA license verification; CFE certification verification; continuing education compliance; work paper retention (7 years minimum); engagement letter documentation; independence/conflict screening; tracing methodology documentation'
WHERE name LIKE '%Forensic Accountant%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Bus. & Prof. Code §§ 2900-2999 (psychology licensing); Cal. Bus. & Prof. Code §§ 2000-2529 (medical practice act — psychiatrists); Cal. Evidence Code § 730 (court-appointed expert); Cal. Penal Code §§ 1026-1027 (NGI); Cal. Penal Code §§ 1367-1372 (competency to stand trial); Cal. Welf. & Inst. Code §§ 5150-5587 (LPS conservatorship); APA Ethical Principles and Code of Conduct',
  standards_of_creation = 'APA Specialty Guidelines for Forensic Psychology; AAPL Practice Guidelines (psychiatrists); Cal. Rules of Court 5.220 (custody evaluation standards); competency evaluation report standards; risk assessment report format (HCR-20, PCL-R, Static-99); capacity/conservatorship evaluation standards',
  soc_controls = 'License verification (BOP/MBC); board certification verification (ABPP/ABPN); continuing education compliance; Tarasoff duty compliance documentation; informed consent documentation; record retention (BOP minimum 7 years); test security protocols; dual-role prohibition compliance'
WHERE name = 'Forensic Psychologist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Evidence Code § 720 (expert qualification); Cal. Evidence Code §§ 1410-1421 (authentication); Federal Rules of Evidence 901(b)(3) (handwriting comparison); ASTM E444 (scope of work for forensic document examination); SWGDOC standards',
  standards_of_creation = 'ASTM E1658 (examination and reporting standards); SWGDOC Standard for Examination of Handwriting; SWGDOC Standard for Examination of Documents for Alterations; ABFDE certification standards; ISO/IEC 17025 (if accredited lab)',
  soc_controls = 'ABFDE board certification verification; proficiency test records; evidence handling/chain of custody; instrument calibration records; peer review of reports; case file documentation standards; microscopy and imaging equipment validation'
WHERE name = 'Forensic Document Examiner';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Bus. & Prof. Code §§ 11300-11423 (real estate appraisers); Cal. Code Civ. Proc. §§ 873.010-873.290 (partition referee); Cal. Probate Code §§ 8900-8924 (probate appraisal); USPAP (Uniform Standards of Professional Appraisal Practice); Cal. Family Code § 2552 (community property valuation)',
  standards_of_creation = 'USPAP Standards Rules 1-2 (real property); USPAP Standards Rules 7-8 (personal property); Probate Referee inventory and appraisal format (DE-160); partition referee report format; Judicial Council Form DE-160/161',
  soc_controls = 'BREA license verification; USPAP compliance review; appraisal management company oversight; comparable sales verification; assignment conditions documentation; workfile retention (5 years minimum); appraiser independence compliance'
WHERE name = 'Court-Appointed Appraiser';

-- ============================================================
-- GROUP 10: CHILD WELFARE / FAMILY SERVICES (Personas 45-46)
-- ============================================================

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Welf. & Inst. Code §§ 300-395 (dependency); Cal. Penal Code §§ 11164-11174.3 (CANRA — mandatory reporting); Cal. Welf. & Inst. Code §§ 309-319 (detention/jurisdiction); 42 U.S.C. §§ 5101-5119c (CAPTA, federal); Cal. Welf. & Inst. Code §§ 360-366.3 (disposition/review); ICWA (25 U.S.C. §§ 1901-1963)',
  standards_of_creation = 'SDM (Structured Decision Making) assessment tools; Judicial Council dependency forms (JV series); CWS/CMS case documentation standards; CDSS Manual of Policy and Procedures (MPP); case plan development standards; ICWA compliance documentation',
  soc_controls = 'CWS/CMS system audit trails; CACI (Child Abuse Central Index) reporting compliance; background check (DOJ/FBI); supervised visitation documentation; court report filing timeliness; federal CFSR (Child and Family Services Review) metrics; reasonable efforts documentation'
WHERE name = 'Child Protective Services Social Worker';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Family Code §§ 8500-9340 (adoption); Cal. Family Code §§ 8600-8625 (independent adoption); Cal. Family Code §§ 8700-8720 (agency adoption); Cal. Family Code §§ 8900-8926 (intercountry adoption); 42 U.S.C. §§ 14901-14954 (Intercountry Adoption Act); ICPC (Interstate Compact on Placement of Children)',
  standards_of_creation = 'Cal. Family Code § 8715 (home study requirements); Judicial Council adoption forms (ADOPT series); home study report format standards; consent/relinquishment documentation; ICPC documentation standards; post-placement supervision report format',
  soc_controls = 'Agency licensing verification (CDSS); home study completion tracking; background check compliance (DOJ/FBI/CACI); consent validity verification; post-placement visit documentation; sealed record compliance (Fam. Code § 9200); Hague Convention compliance (intercountry)'
WHERE name = 'Adoption Social Worker';

-- ============================================================
-- GROUP 11: REGULATORY / LICENSING BODIES (Personas 47-48)
-- ============================================================

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Bus. & Prof. Code §§ 6000-6228; Rules of Procedure of the State Bar Court; Standards for Attorney Sanctions (State Bar Court); Cal. Rules of Court 9.10-9.20 (State Bar Court); ABA Model Rules for Lawyer Disciplinary Enforcement',
  standards_of_creation = 'Notice of Disciplinary Charges format; State Bar Court rules (hearing/review procedures); stipulation format; disciplinary decision format; public records database standards',
  soc_controls = 'Complaint tracking (State Bar Case Management); investigation documentation; hearing transcript records; disciplinary order publication; probation monitoring; Client Security Fund claims processing; disposition timeline compliance'
WHERE name = 'State Bar Prosecutor';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Constitution Art. VI, § 18; Cal. Rules of Court 10.700-10.704; CJP Rules of Procedure; Cal. Gov. Code §§ 68701-68755; ABA Model Rules for Judicial Disciplinary Enforcement',
  standards_of_creation = 'CJP complaint investigation standards; formal proceedings format; advisory letter format; public/private discipline documentation; annual report standards',
  soc_controls = 'Complaint tracking; confidentiality of proceedings (Cal. Const. Art. VI, § 18(i)); investigation documentation; discipline publication; judge monitoring compliance; statistical reporting on complaint disposition'
WHERE name = 'Judicial Performance Commission Investigator';

-- ============================================================
-- GROUP 12: FIDUCIARY / APPOINTED REPRESENTATIVES (Personas 49-52)
-- ============================================================

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Probate Code §§ 1800-2893 (conservatorship); Cal. Probate Code §§ 2400-2423 (temporary conservatorship); Cal. Bus. & Prof. Code §§ 6500-6592 (Professional Fiduciaries Act); Cal. Probate Code §§ 1850-1851 (biennial review); Cal. Probate Code §§ 2620-2628 (accounting); Cal. Welf. & Inst. Code §§ 5350-5372 (LPS conservatorship)',
  standards_of_creation = 'Judicial Council conservatorship forms (GC series); Cal. Probate Code § 2620 (accounting format); Cal. Probate Code § 1821 (petition requirements); care plan documentation standards; court investigator report response standards; Professional Fiduciaries Bureau standards',
  soc_controls = 'Professional Fiduciary license verification (DCA); bond verification (Prob. Code §§ 2320-2334); annual accounting review; court investigator biennial review; conservatee contact verification; asset inventory verification; Regional Center notification compliance (DD conservatorships); least restrictive alternative reassessment'
WHERE name = 'Conservator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Probate Code §§ 1500-1613 (guardianship); Cal. Family Code §§ 7500-7507 (court appointment); Cal. Probate Code § 1510 (nomination); Cal. Probate Code §§ 1513-1516 (investigation); Cal. Probate Code §§ 2620-2628 (accounting — estate); Cal. Welf. & Inst. Code § 360(a) (dependency guardianship)',
  standards_of_creation = 'Judicial Council guardianship forms (GC series); guardianship petition format (Prob. Code § 1510); background check documentation; care plan format; accounting format (if estate)',
  soc_controls = 'Background check (DOJ/FBI/CACI); home evaluation documentation; court investigator review; annual accounting (estate guardianship); bond verification (estate); school enrollment/medical consent documentation; minor''s welfare review compliance'
WHERE name = 'Guardian';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Probate Code §§ 15000-18201 (Trust Law); Cal. Probate Code §§ 16000-16015 (trustee duties); Cal. Probate Code §§ 16060-16064 (duty to report); Cal. Probate Code §§ 17200-17210 (court proceedings); Cal. Bus. & Prof. Code §§ 6500-6592 (Professional Fiduciaries Act); Uniform Trust Code (advisory)',
  standards_of_creation = 'Judicial Council trust forms (DE series — trust administration); Cal. Probate Code § 16063 (accounting format); trust distribution documentation; investment policy standards (Prudent Investor Rule, Prob. Code §§ 16045-16054); tax return preparation (Form 1041)',
  soc_controls = 'Professional Fiduciary license verification; bond verification (if court-ordered); annual accounting requirements; beneficiary notification compliance; asset inventory verification; tax compliance; investment performance documentation; duty of loyalty compliance audit'
WHERE name = 'Trustee';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Probate Code §§ 8000-12591 (estate administration); Cal. Probate Code §§ 8400-8405 (executor appointment); Cal. Probate Code §§ 8440-8469 (administrator appointment); Cal. Probate Code §§ 9000-9399 (creditor claims); Cal. Probate Code §§ 10800-10850 (compensation); Cal. Probate Code §§ 12200-12207 (distribution)',
  standards_of_creation = 'Judicial Council probate forms (DE series); Inventory and Appraisal (DE-160/161); final accounting format (Prob. Code § 10900); petition for distribution format; creditor claim acceptance/rejection; tax clearance documentation',
  soc_controls = 'Letters Testamentary/Administration authentication; bond verification (Prob. Code § 8480); inventory filing deadline compliance (4 months); creditor notice compliance (Prob. Code § 9050); final accounting review; distribution receipt documentation; estate tax return (Form 706) filing verification'
WHERE name = 'Personal Representative / Executor';

-- ============================================================
-- GROUP 13: SUPPORT ENFORCEMENT (Personas 53-54)
-- ============================================================

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Family Code §§ 4000-4339 (child support); Cal. Family Code §§ 4050-4076 (guideline support); Cal. Family Code §§ 4200-4204 (spousal support); Cal. Rules of Court 5.300-5.375 (commissioner proceedings); Cal. Family Code §§ 10000-10015 (family law facilitator); 42 U.S.C. §§ 651-669b (Title IV-D federal)',
  standards_of_creation = 'Judicial Council support forms (FL series); DissoMaster calculation printout standards; Cal. Family Code § 4056 (temporary support); stipulation/order format; income and expense declaration verification',
  soc_controls = 'Commissioner appointment verification; guideline calculation audit; income verification procedures; DCSS compliance reporting; case tracking/management; de novo hearing right notification; support modification timeline compliance'
WHERE name = 'Child Support Commissioner';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Family Code §§ 17000-17800 (DCSS); Cal. Family Code §§ 5200-5208 (wage assignment); Cal. Family Code §§ 17400-17406 (enforcement tools); 42 U.S.C. §§ 651-669b (Title IV-D); Cal. Family Code § 4506 (UIFSA — interstate enforcement); Cal. Family Code §§ 17500-17528 (license suspension)',
  standards_of_creation = 'DCSS standardized forms; Federal OCSE forms (IV-D application); wage assignment documentation; tax intercept documentation; license suspension notice format; interstate enforcement documentation (UIFSA)',
  soc_controls = 'SDU (State Disbursement Unit) payment tracking; Federal Case Registry reporting; FPLS (Federal Parent Locator Service) access logging; arrears calculation verification; compliance with due process notices; TANF/CalWORKs coordination; enforcement action documentation and escalation tracking'
WHERE name = 'DCSS Enforcement Officer';

-- ============================================================
-- GROUP 14: TECHNOLOGY / RECORDS (Personas 55-56)
-- ============================================================

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Rules of Court 2.250-2.259 (e-filing); Cal. Rules of Court 2.500-2.507 (e-business); Judicial Council IT governance policies; CJIS Security Policy (criminal justice information); Cal. Gov. Code §§ 68150-68153 (record retention); Cal. Rules of Court 10.660 (technology planning)',
  standards_of_creation = 'Judicial Council e-filing technical standards; ECF (Electronic Case Filing) specifications; NIEM (National Information Exchange Model) standards; GS1 standards for court document identifiers; PDF/A standards for long-term document preservation; digital signature standards (X.509)',
  soc_controls = 'SOC 2 Type II (case management vendors); CJIS Security Policy compliance; access control audit (role-based); data backup/disaster recovery verification; e-filing system uptime/integrity monitoring; digital certificate management; encryption standards compliance; penetration testing records'
WHERE name = 'Court IT Director';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Gov. Code §§ 68150-68153 (record retention schedules); Cal. Gov. Code §§ 12270-12279 (State Archives); Cal. Rules of Court 10.854 (records management); NARA standards (federal courts); Cal. Gov. Code § 68152 (destruction authorization)',
  standards_of_creation = 'Judicial Council Record Retention Schedule; ARMA Generally Accepted Recordkeeping Principles; microfilm/digital imaging standards (AIIM); PDF/A long-term preservation standards; metadata schema for court records; redaction standards (CRC 1.201)',
  soc_controls = 'Retention schedule compliance; destruction authorization documentation; certified copy authentication; public access vs. sealed record controls; migration/format conversion verification; chain of custody for physical records; disaster recovery/backup verification; records transfer to State Archives documentation'
WHERE name = 'Court Records Manager';

-- ============================================================
-- GROUP 15: SELF-REPRESENTED LITIGANT SUPPORT (Persona 57)
-- ============================================================

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Gov. Code § 68651 (self-help center authorization); Cal. Rules of Court 10.960 (self-help center standards); Cal. Family Code §§ 10000-10015 (family law facilitator); ABA Standards for the Provision of Civil Legal Aid; Cal. Rules of Court 10.960(b) (scope of services)',
  standards_of_creation = 'Self-help information packet standards; Judicial Council plain-language form instructions; workshop curriculum standards; referral documentation; limited scope representation standards',
  soc_controls = 'Service delivery metrics; UPL compliance (information vs. advice line); client count/demographic tracking; referral tracking; outcome data collection; language access compliance documentation'
WHERE name = 'Self-Help Center Attorney';

-- ============================================================
-- GROUP 16: FEDERAL SPECIALIZED (Personas 58-60)
-- ============================================================

UPDATE citizen_catalog SET
  governing_guidelines = '11 U.S.C. §§ 321-333 (trustee duties); 11 U.S.C. §§ 701-704 (Chapter 7 trustee); 11 U.S.C. §§ 1302-1303 (Chapter 13 trustee); 28 U.S.C. §§ 581-589a (U.S. Trustee Program); USTP Handbook for Chapter 7 Trustees; USTP Handbook for Chapter 13 Trustees',
  standards_of_creation = 'Trustee final report format; distribution report format; asset investigation documentation; 341 meeting documentation; means test review documentation; adversary proceeding standards',
  soc_controls = 'U.S. Trustee oversight; bond verification; Trustee Information Program (TIP) compliance; asset disposition tracking; distribution auditing; fee reasonableness review; undisclosed asset investigation documentation'
WHERE name = 'U.S. Bankruptcy Trustee';

UPDATE citizen_catalog SET
  governing_guidelines = '18 U.S.C. §§ 3601-3607 (probation); 18 U.S.C. §§ 3141-3156 (pretrial services/bail); 18 U.S.C. §§ 3551-3586 (sentencing); U.S. Sentencing Guidelines Manual; Judicial Conference policies; 18 U.S.C. § 3553(a) (sentencing factors)',
  standards_of_creation = 'Presentence Investigation Report (PSR) format (USSG); pretrial services report format; supervision plan standards; violation report format; risk assessment tools (PCRA); post-Booker reporting requirements',
  soc_controls = 'PACTS (Probation and Pretrial Services Automated Case Tracking System); drug testing documentation; GPS/electronic monitoring records; home contact verification; USSG calculation worksheet audit; confidential PSR access controls; conditions of supervision modification tracking'
WHERE name = 'Federal Probation Officer';

UPDATE citizen_catalog SET
  governing_guidelines = '8 U.S.C. § 1101 et seq. (INA); 8 C.F.R. Part 1003 (EOIR regulations); 8 U.S.C. § 1229a (removal proceedings); EOIR Immigration Court Practice Manual; 8 U.S.C. § 1158 (asylum); 8 U.S.C. § 1227 (deportability)',
  standards_of_creation = 'EOIR forms (EOIR-26, EOIR-28, etc.); Immigration Court Practice Manual formatting; oral decision transcription standards; written decision format; master calendar/individual hearing procedures',
  soc_controls = 'EOIR CASE system audit trails; hearing recording/transcription; filing receipt verification; interpretation quality monitoring; case completion metrics; BIA appeal record preparation; bond hearing documentation compliance'
WHERE name = 'Immigration Judge';

-- ============================================================
-- GROUP 17: LEGAL AID / ACCESS TO JUSTICE (Persona 61)
-- ============================================================

UPDATE citizen_catalog SET
  governing_guidelines = '42 U.S.C. §§ 2996-2996l (Legal Services Corporation Act); LSC Regulations (45 C.F.R. Parts 1600-1644); Cal. Bus. & Prof. Code §§ 6210-6228 (IOLTA); Cal. Rules of Court 10.1050 (Legal Services Trust Fund); LSC case restrictions (45 C.F.R. § 1617); State Bar attorney obligations',
  standards_of_creation = 'LSC Performance Criteria; ABA Standards for Providers of Civil Legal Aid; Case Management System documentation standards; intake/eligibility determination standards; case outcome reporting; grant compliance documentation',
  soc_controls = 'LSC fiscal compliance audit; case statistical reporting (CSR); income eligibility verification; PAI (Private Attorney Involvement) compliance; client satisfaction surveys; grant reporting compliance; IOLTA trust account reconciliation'
WHERE name = 'Legal Aid Attorney';

-- ============================================================
-- GROUP 18: SPECIALTY DOCUMENT ROLES (Personas 62-64)
-- ============================================================

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Evidence Code §§ 751-755 (translation in proceedings); Cal. Gov. Code §§ 68560-68566 (language access); Hague Convention (foreign documents); 8 C.F.R. § 103.2(b)(3) (USCIS translation requirements); Cal. Rules of Court 3.1110(g) (translated document requirements)',
  standards_of_creation = 'ATA Code of Ethics and Professional Practice; ATA certification standards; USCIS translation certification format; apostille/authentication standards; court-certified translation format; sworn translation declaration',
  soc_controls = 'ATA certification verification; translator declaration of accuracy; original vs. translation reconciliation; credential verification for specialty terms; quality assurance review; back-translation verification for critical documents'
WHERE name = 'Certified Legal Translator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Rules of Court 2.250-2.261 (e-filing rules); Cal. Rules of Court 2.252 (EFSP certification); Cal. Rules of Court 2.256 (responsibilities); Cal. Gov. Code § 68150 (electronic records); local e-filing rules (county-specific)',
  standards_of_creation = 'Judicial Council EFSP certification standards; electronic filing format specifications (PDF, PDF/A); filing envelope metadata standards; service of process electronic standards; accessibility compliance (ADA); document size/naming conventions',
  soc_controls = 'EFSP certification maintenance; filing timestamp integrity; system uptime monitoring; rejection/acceptance tracking; data encryption in transit/at rest; SOC 2 Type II compliance (vendor); filing fee collection/remittance audit'
WHERE name = 'Electronic Filing Service Provider';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Code Civ. Proc. § 2025.340 (video deposition); Cal. Code Civ. Proc. § 2025.620 (use at trial); Federal Rules of Civil Procedure 30(b)(3); Cal. Rules of Court 2.1040 (technology in courtroom)',
  standards_of_creation = 'NCRA Guidelines for Video Deposition; CLVS certification standards; time-stamping/synchronization standards; opening/closing statement format (on-record); storage/preservation standards; chain of custody documentation',
  soc_controls = 'CLVS certification verification; video integrity verification (hash/checksum); storage medium chain of custody; synchronization accuracy audit; equipment calibration records; original media preservation and backup documentation'
WHERE name = 'Legal Videographer';

-- ============================================================
-- GROUP 19: COMPLIANCE / OVERSIGHT (Personas 65-66)
-- ============================================================

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Gov. Code §§ 15150-15167 (CLETS); CJIS Security Policy (FBI); 28 C.F.R. Part 20 (criminal justice information); Cal. Penal Code §§ 11105-11105.2 (criminal history access); Cal. Penal Code §§ 13300-13305 (criminal record dissemination); Cal. Family Code § 6380 (DVRO database entry)',
  standards_of_creation = 'CLETS message format standards; NCIC entry/validation standards; wanted person entry format; restraining order entry format; criminal history record format; system security plan documentation',
  soc_controls = 'CJIS Security Policy audit (triennial); CLETS user access logging; hit confirmation procedures; data quality audits (NCIC validation); background check for all users; training certification (CJIS Level 4); physical security of terminals; network security (encryption requirements)'
WHERE name = 'CLETS Administrator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Americans with Disabilities Act, Title II (42 U.S.C. §§ 12131-12165); Section 504, Rehabilitation Act (29 U.S.C. § 794); Cal. Gov. Code § 11135 (state nondiscrimination); Cal. Rules of Court 1.100 (disability accommodation); 28 C.F.R. Part 35 (ADA Title II regulations); Cal. Civ. Code §§ 51-53 (Unruh Civil Rights Act)',
  standards_of_creation = 'ADA accommodation request form standards; effective communication policy documentation; auxiliary aids documentation; grievance procedure standards; self-evaluation/transition plan format; Web Content Accessibility Guidelines (WCAG 2.1 AA)',
  soc_controls = 'Accommodation request tracking; grievance resolution documentation; physical access audit; digital accessibility audit (WCAG); interpreter/CART service tracking; training compliance; ADA self-evaluation update cycle documentation'
WHERE name = 'ADA Compliance Officer';

-- ============================================================
-- GROUP 20: REAL PROPERTY / TITLE (Persona 67)
-- ============================================================

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Insurance Code §§ 12340-12419 (title insurance); Cal. Financial Code §§ 17000-17655 (escrow law); Cal. Civ. Code §§ 1057-1057.7 (preliminary change of ownership); RESPA (12 U.S.C. §§ 2601-2617); Cal. Code Civ. Proc. §§ 405-405.61 (lis pendens)',
  standards_of_creation = 'ALTA title commitment/policy format; ALTA Closing Protection Letters; preliminary title report format; closing disclosure/settlement statement; recording document requirements; chain of title documentation',
  soc_controls = 'CDI license verification; escrow trust account auditing; recording verification; title plant maintenance; fidelity bond requirements; SOC 1/SOC 2 (title company systems); lis pendens expungement tracking'
WHERE name = 'Title Officer';

-- ============================================================
-- GROUP 21: INDIGENT DEFENSE OVERSIGHT (Persona 68)
-- ============================================================

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Gov. Code §§ 27700-27712 (public defender); Cal. Penal Code §§ 987-987.9 (right to counsel); Strickland v. Washington, 466 U.S. 668; ABA Ten Principles of a Public Defense Delivery System; Cal. Penal Code § 1241 (appellate representation); Gideon v. Wainwright, 372 U.S. 335',
  standards_of_creation = 'ABA Standards for Criminal Justice (Defense Function); NLADA Performance Guidelines for Criminal Defense; caseload standards (ABA/NLADA); conflict case assignment protocols; qualification standards for serious felony/capital cases; training standards',
  soc_controls = 'Caseload monitoring; conflict screening; client contact documentation; training compliance tracking; performance evaluation; habeas/IAC claim tracking; budget/resource allocation transparency; weighted caseload study compliance'
WHERE name = 'Public Defender Administrator';

-- Conservatorship & Guardianship — FULL Triple Constraint Build
-- These are not generic fills. These are the actual California Probate Code
-- sections, Professional Fiduciary Act requirements, and court investigation
-- standards that govern conservatorships and guardianships.
-- If there's a conservatorship over Michael, these are the standards
-- it must have complied with.

-- ============================================================
-- citizen-00971: Professional Fiduciary / Conservator
-- ============================================================
UPDATE citizen_catalog SET
  governing_guidelines = 'California Professional Fiduciaries Act (Bus. & Prof. Code Sections 6500-6592); California Probate Code Sections 1800-2893 (Conservatorship); Probate Code Sections 2400-2586 (Powers and Duties of Guardian or Conservator); Probate Code Section 2401 (standard of care); Probate Code Section 2101 (fiduciary duties); Probate Code Sections 2620-2628 (accounting requirements); Probate Code Section 1850 (notice requirements); Probate Code Section 1860 (citation for failure to account); Professional Fiduciaries Bureau regulations (16 CCR Sections 4400-4560); Probate Code Section 2540 (substituted judgment); Probate Code Section 2355 (medical consent authority); Probate Code Section 1834 (capacity declaration requirements)',
  standards_of_creation = 'Professional Fiduciaries Bureau (PFB) licensing requirements (Bus. & Prof. Code Section 6530); PFB continuing education (16 CCR Section 4480 — 15 hours annually including 3 hours ethics); National Guardianship Association Standards of Practice; California State Association of Public Administrators/Public Guardians/Public Conservators (CSAC-PAPGPC) best practices; Judicial Council Forms GC-400 series (conservatorship petitions, orders, accountings); Probate Code Section 1456 (court investigator qualifications); AICPA Trust Services Criteria for fiduciary accounting; Uniform Trust Code provisions adopted in California',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality, Security); Probate Code Section 2620 accounting compliance audit (annual accounting to court); bond adequacy verification (Probate Code Section 2320); Letters of Conservatorship validity tracking; court order compliance documentation; conservatee property inventory verification (Probate Code Section 2610 — 90-day deadline); Probate Code Section 2352 care plan documentation; restricted account compliance (Probate Code Section 2453); real property transaction court approval tracking (Probate Code Section 2540); fee petition documentation (Probate Code Section 2623); conservator self-dealing prohibition enforcement (Probate Code Section 2401.3); PFB complaint tracking; annual well-being report documentation',
  document_types = 'Petition for Appointment of Conservator (GC-310); Order Appointing Conservator (GC-340); Letters of Conservatorship (GC-350); Capacity Declaration (GC-335); Conservatorship Care Plan; Inventory and Appraisal (GC-040/041); Annual Accounting (GC-400/401/402/405); Conservatee Status Report; Bond documentation; Notice of Hearing (GC-020); Citation to Appear (GC-012); Petition for Special Notice (GC-035); Order Authorizing Sale of Real Property; Petition for Substituted Judgment (GC-385); Conservator Fees Petition; Court Investigator Report; Ex Parte Petition (GC-110); Annual Review Report; Notice to Conservatee of Rights'
WHERE name = 'Professional Fiduciary / Conservator';

-- ============================================================
-- citizen-02205: Professional Conservator / Public Guardian-Conservator
-- ============================================================
UPDATE citizen_catalog SET
  governing_guidelines = 'California Probate Code Sections 1800-2893 (Conservatorship); Probate Code Sections 2900-2903 (Public Guardian); Government Code Sections 27430-27443 (Public Guardian powers and duties); Welfare & Institutions Code Section 5350-5372 (LPS Conservatorship); Probate Code Section 1801 (grounds for conservatorship); Probate Code Section 1801.5 (limited conservatorship — developmental disability); Probate Code Section 1820 (petition requirements); Probate Code Section 1826 (court investigator duties); Probate Code Section 1827.5 (regional center director duties for limited conservatorship); Probate Code Section 1850-1852 (notice requirements — must serve conservatee, relatives, and other interested persons); Probate Code Section 1860 (verified account requirement); Probate Code Section 1863 (removal of conservator); Government Code Section 27430 (Public Guardian as conservator of last resort)',
  standards_of_creation = 'California State Association of Public Administrators/Public Guardians/Public Conservators (CSAC-PAPGPC) standards; National Guardianship Association Standards of Practice (7th edition); Third National Guardianship Summit standards; Judicial Council of California Forms GC-series (mandatory forms); California Rules of Court Rules 7.1050-7.1063 (probate conservatorship rules); Government Code Section 27434 (Public Guardian investigation standards); Probate Code Section 1826(a) (court investigator report content requirements — capacity, alternatives, appropriateness, living situation, care needs)',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality, Security); Probate Code Section 2610 inventory filing deadline compliance (90 days from appointment); Probate Code Section 2620 annual accounting court submission tracking; bond amount adequacy review; Probate Code Section 1850 notice service verification (personal service on conservatee required); court investigator biennial review compliance; conservatee rights notification documentation (Probate Code Section 1828 — 8 specific rights including right to counsel, right to jury trial, right to communicate); HIPAA compliance for medical decision-making authority; restricted account compliance (blocked accounts); real property disposition court approval verification; fee reasonableness documentation; caseload tracking per Public Guardian office standards; conservatee complaint investigation documentation',
  document_types = 'Petition for Appointment of Conservator (GC-310); Citation (GC-020); Order Appointing Conservator (GC-340); Letters of Conservatorship (GC-350); Capacity Declaration — Conservatorship (GC-335); Court Investigator Report (Probate Code Section 1826); Inventory and Appraisal (GC-040/041); Annual Accounting (GC-400 series); Status Report; Care Plan; Bond; Notice of Conservatee Rights (Probate Code Section 1828); Petition for Instructions (GC-375); Petition for Removal of Conservator (GC-350); Petition for Termination of Conservatorship (GC-385); Regional Center Report (for limited conservatorship); LPS Conservatorship Petition (if cross-referred); Public Guardian Investigation Report; Annual Well-Being Report'
WHERE name = 'Professional Conservator / Public Guardian-Conservator';

-- ============================================================
-- citizen-02206: Legal Guardian / Guardian of Minor's Person and/or Estate
-- ============================================================
UPDATE citizen_catalog SET
  governing_guidelines = 'California Probate Code Sections 1500-1612 (Guardianship of the Person); Probate Code Sections 2100-2694 (Guardianship of the Estate); Probate Code Section 1510 (who may be appointed guardian); Probate Code Section 1513 (nomination by parent); Probate Code Section 1514 (preference in appointment); Probate Code Section 1516 (nonrelative guardian — ICWA compliance); Family Code Section 3041 (custody to nonparent — detriment finding required); Probate Code Section 1601-1603 (termination of guardianship); Probate Code Section 1500.1 (temporary guardianship); ICWA (25 USC 1901 — Indian Child Welfare Act, if applicable); Probate Code Section 2620 (guardian accounting requirements)',
  standards_of_creation = 'Judicial Council Forms GC-210 series (guardianship petitions and orders); California Rules of Court Rules 7.1002-7.1024 (guardianship proceedings); Probate Code Section 1513.2 (criminal background check requirements for guardians); DCFS/CPS coordination standards where child is a dependent; Probate Code Section 1543 (court investigator report requirements for guardianship); Family Code Section 3041 detriment finding documentation; ICWA inquiry and notice requirements (Cal. Rules of Court Rule 5.481); education and health care decision-making authority documentation',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); guardianship petition completeness verification; notice and citation service documentation; background check (LiveScan) completion tracking; court investigator report timeliness; Letters of Guardianship validity monitoring; inventory filing compliance (90 days); annual accounting submission tracking; education enrollment and health insurance verification for ward; ICWA inquiry documentation; visitation order compliance; guardian bond adequacy; estate management documentation; change of ward residence notification compliance; annual review hearing compliance'
WHERE name LIKE 'Legal Guardian%';

-- ============================================================
-- citizen-02283: Conservatorship Investigator
-- ============================================================
UPDATE citizen_catalog SET
  governing_guidelines = 'California Probate Code Section 1826 (court investigator duties — initial investigation); Probate Code Section 1851 (biennial review requirements); Probate Code Section 1850 (notice requirements investigator must verify); Probate Code Section 1827 (investigator report content requirements); Probate Code Section 1828 (conservatee rights the investigator must verify were communicated); Probate Code Section 1826(a)(1)-(7) (mandatory investigation elements: whether conservatorship is appropriate, whether less restrictive alternatives exist, capacity assessment, living situation, care needs, wishes of proposed conservatee, appropriateness of proposed conservator)',
  standards_of_creation = 'California Rules of Court Rules 7.1060-7.1063 (court investigator qualifications and duties); Judicial Council Form GC-330 (confidential supplemental information); Probate Code Section 1454 (qualifications of court investigators — training, experience, independence); National Guardianship Association investigation standards; California Court Investigators Association best practices; interview methodology for assessing capacity (structured clinical interview standards); ABA Commission on Law and Aging investigation guidelines',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); mandatory in-person interview with proposed conservatee documentation; interview with proposed conservator documentation; collateral contact documentation (family, caregivers, physicians); alternative-to-conservatorship analysis documentation; capacity assessment methodology documentation; rights advisement verification (Probate Code Section 1828 — right to appear, right to jury trial, right to counsel, right to be represented by public defender, right to have matter set for rehearing); report filing timeliness (15 days before hearing per local rules); biennial review investigation documentation; follow-up on prior investigation recommendations; confidential report handling protocols'
WHERE name = 'Conservatorship Investigator';

-- ============================================================
-- citizen-02308: Limited Conservatorship Investigator (DD)
-- ============================================================
UPDATE citizen_catalog SET
  governing_guidelines = 'California Probate Code Section 1801.5 (limited conservatorship for developmentally disabled adults); Probate Code Section 1827.5 (regional center director duties); Probate Code Sections 2351.5 (powers that may be granted in limited conservatorship — 7 specific powers); Welfare & Institutions Code Sections 4500-4905 (Lanterman Act — rights of persons with developmental disabilities); Probate Code Section 1828 (conservatee rights); Probate Code Section 1826 (investigation requirements); Probate Code Section 1830 (limited conservatorship petition requirements); WIC Section 4418 (right to least restrictive environment); WIC Section 4502 (rights of persons with developmental disabilities — enumerated); Government Code Section 95000-95029 (Early Intervention Services Act)',
  standards_of_creation = 'California Department of Developmental Services (DDS) policies on conservatorship; Regional Center assessment standards for limited conservatorship recommendation; Probate Code Section 1827.5 (regional center report must address: nature and degree of disability, recommended specific powers, alternatives to conservatorship, Individual Program Plan); California Rules of Court Rule 7.1060 (investigator qualifications); Judicial Council Forms GC-310, GC-312 (limited conservatorship petition forms); Self-Determination Program requirements (WIC Section 4685.8); Person-Centered Planning standards per HCBS Settings Rule',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); mandatory in-person interview with proposed limited conservatee; regional center report verification and review; Individual Program Plan (IPP) review — conservatorship must be consistent with IPP goals; assessment of each of the 7 specific powers (fix residence, access confidential records, consent to medical treatment, contract, consent to marriage, control social/sexual contacts, make educational decisions); alternatives-to-conservatorship documentation (supported decision-making, power of attorney, representative payee); rights advisement verification (all rights under Probate Code Section 1828 PLUS Lanterman Act rights under WIC Section 4502); biennial review documentation; least restrictive alternative analysis; conservatee participation in proceedings documentation'
WHERE name = 'Limited Conservatorship Investigator (DD)';

-- ============================================================
-- citizen-02561: CASA Volunteer / Guardian ad Litem
-- ============================================================
UPDATE citizen_catalog SET
  governing_guidelines = 'California Rules of Court Rule 5.655 (CASA program standards); Welfare & Institutions Code Section 100-109 (CASA enabling statute); 42 USC 5106a (CAPTA — Court Appointed Special Advocate provisions); Probate Code Section 1470-1474 (court-appointed counsel for conservatees); Family Code Section 3150-3153 (appointment of counsel for child); Cal. Rules of Court Rule 5.662 (Guardian ad Litem in juvenile proceedings)',
  standards_of_creation = 'National CASA/GAL Association Standards for Local Programs; California CASA Association training standards (30-hour pre-service training minimum); CASA volunteer screening requirements (background check, personal references, interview); National CASA Quality Assurance standards; Judicial Council appointment order requirements; CASA report writing standards (factual, child-focused, recommendation-supported)',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); CASA volunteer screening and training completion verification; case assignment documentation; court report filing timeliness; monthly contact with child documentation; collateral contact logs (teachers, therapists, foster parents, social workers); supervisory review of CASA reports before filing; confidentiality agreement enforcement; case closure documentation; outcome tracking; volunteer continuing education compliance; conflict of interest screening'
WHERE name LIKE 'CASA Volunteer%';

-- ============================================================
-- citizen-02563: Guardianship Attorney
-- ============================================================
UPDATE citizen_catalog SET
  governing_guidelines = 'California Probate Code Sections 1500-1612 (Guardianship); Probate Code Sections 2100-2694 (Estate Management); Probate Code Section 1470-1474 (appointment of counsel); California Rules of Professional Conduct Rules 1.2, 1.4, 1.14 (client with diminished capacity); Probate Code Section 1510 (who may be appointed); Family Code Section 3041 (nonparent custody — detriment standard); ICWA (25 USC 1901-1963); Probate Code Section 2357 (independent exercise of powers); Probate Code Section 2540-2545 (substituted judgment); Probate Code Section 2580-2586 (independent administration)',
  standards_of_creation = 'State Bar of California certification standards (Certified Legal Specialist in Estate Planning, Trust and Probate Law); ABA Standards of Practice for Lawyers Representing Children in Custody Cases; ABA Model Rules 1.14 (Client with Diminished Capacity); California State Bar Rules of Professional Conduct; Judicial Council mandatory forms compliance; ICWA compliance documentation standards; elder and dependent adult abuse mandatory reporting obligations (WIC Section 15630)',
  soc_controls = 'SOC 2 Type II (Confidentiality, Processing Integrity); client conflict screening; petition completeness verification; notice and citation service documentation; court hearing preparation and appearance tracking; accounting review and filing; Letters of Guardianship/Conservatorship validity monitoring; bond compliance; fee petition documentation and court approval; client communication logs; trust and estate asset management oversight; mandatory reporting compliance tracking; IOLTA trust account reconciliation; case file retention compliance'
WHERE name LIKE 'Guardianship Attorney%';

-- ============================================================
-- Tangential Coverage — fill gaps in related roles
-- ============================================================

-- Guardian ad Litem / Minor's Counsel
UPDATE citizen_catalog SET
  governing_guidelines = 'California Family Code Sections 3150-3153 (appointment of counsel to represent child); Cal. Rules of Court Rule 5.240-5.242 (duties of minor''s counsel); Probate Code Section 1470 (appointment of counsel for conservatee/ward); Family Code Section 3151 (minor''s counsel duties — enumerated); Family Code Section 3153 (compensation of minor''s counsel); Cal. Rules of Court Rule 5.660 (guardian ad litem in family law); Evidence Code Section 730 (court-appointed expert — when GAL has evaluation role)'
WHERE name LIKE 'Guardian ad Litem%' AND industry = 'Legal Courts';

-- Forensic CPA/CFE — conservatorship accounting coverage
UPDATE citizen_catalog SET
  governing_guidelines = COALESCE(governing_guidelines, '') || '; California Probate Code Sections 2620-2628 (conservatorship accounting requirements); Probate Code Section 1060 (accounting standards); Probate Code Section 2620.2 (simplified accounting for small estates); California Rules of Court Rule 7.575 (format of accounts)'
WHERE name LIKE 'Forensic CPA%' AND governing_guidelines NOT LIKE '%conservatorship%';

-- ============================================================
-- NEW STANDARD: Probate Code Conservatorship (add to standards library)
-- ============================================================

INSERT OR IGNORE INTO governing_standards (
  id, citizen_name, standard_type, jurisdiction, citation, short_cite, title, description,
  requirements, key_sections, document_types, skill_slugs,
  enforcement_body, private_right_of_action, effective_date, is_active, created_at, updated_at
) VALUES (
  'std-probate-conservatorship-001',
  'Professional Conservator / Public Guardian-Conservator',
  'STATUTE',
  'CA',
  'California Probate Code Sections 1800-2893',
  'Prob. Code 1800-2893',
  'California Probate Conservatorship',
  'Comprehensive statutory framework governing conservatorship of the person and estate in California. Establishes grounds for appointment, powers and duties of conservators, accounting requirements, rights of conservatees, court oversight, and termination procedures.',
  '["Petition must allege specific factual basis for incapacity (Section 1801)","Notice must be personally served on proposed conservatee (Section 1824)","Proposed conservatee has right to counsel, jury trial, and to appear (Section 1828)","Court investigator must conduct investigation and file report (Section 1826)","Conservator must file inventory within 90 days (Section 2610)","Conservator must file annual accounting (Section 2620)","Court investigator must conduct biennial review (Section 1851)","Conservator must post bond unless waived (Section 2320)","Limited conservatorship requires assessment of 7 specific powers (Section 2351.5)","Conservatee retains all rights not specifically removed by court order","Conservator must follow care plan","Real property transactions require court approval (Section 2540)","Conservator fees require court approval (Section 2623)","Removal for cause permitted (Section 2650)","Termination upon conservatee death, restoration of capacity, or court order (Section 1860)"]',
  '["Section 1800 (definitions)","Section 1801 (grounds — unable to provide for personal needs or manage financial resources)","Section 1801.5 (limited conservatorship — developmental disability)","Section 1820 (petition requirements)","Section 1824 (notice requirements)","Section 1826 (court investigator duties)","Section 1827.5 (regional center duties for limited conservatorship)","Section 1828 (conservatee rights)","Section 1830 (limited conservatorship specific provisions)","Section 1834 (capacity declaration)","Section 1850-1852 (notice to relatives and interested persons)","Section 1851 (biennial review)","Section 2101 (fiduciary duties)","Section 2320 (bond requirements)","Section 2351.5 (7 powers in limited conservatorship)","Section 2355 (medical consent authority)","Section 2400-2586 (powers and duties)","Section 2540 (substituted judgment)","Section 2610 (inventory)","Section 2620-2628 (accounting)","Section 2650-2654 (removal)","Section 2893 (termination)"]',
  '["Petition for Appointment of Conservator (GC-310)","Order Appointing Conservator (GC-340)","Letters of Conservatorship (GC-350)","Capacity Declaration (GC-335)","Court Investigator Report","Inventory and Appraisal (GC-040/041)","Annual Accounting (GC-400 series)","Care Plan","Bond","Notice of Hearing (GC-020)","Conservatee Rights Notification","Petition for Instructions","Petition for Removal","Petition for Termination","Biennial Review Report","Regional Center Report (limited conservatorship)"]',
  '["probate-conservatorship-audit"]',
  'California Superior Court, Probate Division',
  1,
  '1957-01-01',
  1,
  datetime('now'),
  datetime('now')
);

-- Guardianship standard
INSERT OR IGNORE INTO governing_standards (
  id, citizen_name, standard_type, jurisdiction, citation, short_cite, title, description,
  requirements, key_sections, document_types, skill_slugs,
  enforcement_body, private_right_of_action, effective_date, is_active, created_at, updated_at
) VALUES (
  'std-probate-guardianship-001',
  'Legal Guardian / Guardian of Minor''s Person and/or Estate',
  'STATUTE',
  'CA',
  'California Probate Code Sections 1500-1612',
  'Prob. Code 1500-1612',
  'California Probate Guardianship',
  'Statutory framework governing guardianship of minors in California. Establishes who may petition, appointment standards, guardian duties, accounting requirements, and termination upon minor reaching majority.',
  '["Petition must identify parents and state why guardianship is necessary (Section 1510)","Parent nomination creates preference (Section 1513)","Background check required for non-relative guardians (Section 1513.2)","Court investigator must investigate and report (Section 1543)","Nonparent custody requires detriment finding under Family Code Section 3041","ICWA inquiry required for all children (Cal. Rules of Court Rule 5.481)","Guardian must file inventory within 90 days","Guardian must file accounting if managing estate","Guardianship terminates at age 18 (Section 1600)","Letters of Guardianship must be issued before guardian can act"]',
  '["Section 1500 (definitions)","Section 1510 (who may petition)","Section 1513 (parent nomination)","Section 1513.2 (background check)","Section 1514 (preference in appointment)","Section 1516 (nonrelative guardian)","Section 1543 (court investigation)","Section 1600-1612 (termination)","Family Code Section 3041 (detriment standard)","ICWA 25 USC 1901-1963 (Indian child provisions)"]',
  '["Petition for Appointment of Guardian (GC-210)","Order Appointing Guardian (GC-240)","Letters of Guardianship (GC-250)","Court Investigator Report","Inventory and Appraisal","Accounting","Consent or Nomination by Parent","Background Check Results (LiveScan)","ICWA-010/020/030 (Indian Child Inquiry)","Bond","Notice of Hearing","Petition for Termination"]',
  '["probate-guardianship-audit"]',
  'California Superior Court, Probate Division',
  1,
  '1957-01-01',
  1,
  datetime('now'),
  datetime('now')
);

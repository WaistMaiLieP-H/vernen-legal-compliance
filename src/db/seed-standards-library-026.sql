-- ═══════════════════════════════════════════════════════════════════════════
-- GOVERNING STANDARDS LIBRARY — CROSS-REFERENCE SEED DATA (BATCH 26)
-- ═══════════════════════════════════════════════════════════════════════════
-- Links between related standards across all 16 Citizens.
-- Relationship types: IMPLEMENTS, SUPERSEDES, SUPPLEMENTS, CONFLICTS,
-- INTERPRETS, REQUIRES, REFERENCES.
-- Generated: March 18, 2026
-- ═══════════════════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════════════════
-- 1. SUPPLEMENTS — State law supplements federal law
-- ═══════════════════════════════════════════════════════════════════════════

INSERT INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes) VALUES

-- FISCARA: California financial protections supplement federal
('xref_001', 'std_fis_045', 'std_fis_040', 'SUPPLEMENTS', 'Rosenthal Fair Debt Collection Practices Act supplements federal FDCPA with broader coverage including original creditors'),
('xref_002', 'std_fis_045', 'std_fis_041', 'SUPPLEMENTS', 'Rosenthal supplements FDCPA harassment provisions with California-specific protections'),
('xref_003', 'std_fis_045', 'std_fis_042', 'SUPPLEMENTS', 'Rosenthal supplements FDCPA false representation provisions'),
('xref_004', 'std_fis_045', 'std_fis_043', 'SUPPLEMENTS', 'Rosenthal supplements FDCPA unfair practices provisions'),
('xref_005', 'std_fis_045', 'std_fis_044', 'SUPPLEMENTS', 'Rosenthal supplements FDCPA validation of debts provisions'),
('xref_006', 'std_fis_046', 'std_fis_034', 'SUPPLEMENTS', 'CA Consumer Credit Reporting Agencies Act supplements federal FCRA with additional consumer protections'),
('xref_007', 'std_fis_047', 'std_fis_035', 'SUPPLEMENTS', 'CA credit reporting accuracy requirements supplement FCRA accuracy provisions'),
('xref_008', 'std_fis_048', 'std_fis_036', 'SUPPLEMENTS', 'CA credit dispute procedures supplement FCRA dispute resolution requirements'),
('xref_009', 'std_fis_060', 'std_fis_053', 'SUPPLEMENTS', 'CA Homeowner Bill of Rights supplements federal RESPA with state-specific mortgage protections'),
('xref_010', 'std_fis_060', 'std_fis_054', 'SUPPLEMENTS', 'CA HBOR supplements RESPA servicing provisions with dual-tracking prohibition'),

-- REGULIS: California housing law supplements federal
('xref_011', 'std_reg_097', 'std_reg_098', 'SUPPLEMENTS', 'FEHA housing provisions supplement Federal Fair Housing Act with additional protected classes'),
('xref_012', 'std_reg_094', 'std_reg_098', 'SUPPLEMENTS', 'CA retaliatory eviction protections supplement FHA anti-retaliation provisions'),
('xref_013', 'std_reg_089', 'std_reg_098', 'SUPPLEMENTS', 'AB 1482 Tenant Protection Act supplements FHA by providing rent caps and just cause eviction'),
('xref_014', 'std_reg_154', 'std_reg_155', 'SUPPLEMENTS', 'CA WARN Act supplements federal WARN Act with broader coverage and lower thresholds'),

-- REGULIS: Local rent ordinances supplement state
('xref_015', 'std_reg_150', 'std_reg_089', 'SUPPLEMENTS', 'LA Rent Stabilization Ordinance supplements AB 1482 with stricter local rent control'),
('xref_016', 'std_reg_151', 'std_reg_089', 'SUPPLEMENTS', 'San Jose Apartment Rent Ordinance supplements AB 1482 with local protections'),
('xref_017', 'std_reg_152', 'std_reg_089', 'SUPPLEMENTS', 'Richmond Rent Ordinance supplements AB 1482 with local rent stabilization'),
('xref_018', 'std_reg_153', 'std_reg_089', 'SUPPLEMENTS', 'Mountain View CSFRA supplements AB 1482 with community stabilization provisions'),

-- PRIVAXIS: California privacy supplements federal
('xref_019', 'std_pri_009', 'std_pri_017', 'SUPPLEMENTS', 'CCPA supplements HIPAA by providing broader consumer data privacy rights beyond health data'),
('xref_020', 'std_pri_010', 'std_pri_018', 'SUPPLEMENTS', 'CCPA consumer rights supplement HIPAA individual rights with opt-out and deletion'),
('xref_021', 'std_pri_034', 'std_pri_017', 'SUPPLEMENTS', 'CA Data Breach Notification Act supplements HIPAA breach notification with broader entity coverage'),
('xref_022', 'std_pri_036', 'std_pri_017', 'SUPPLEMENTS', 'CA Confidentiality of Medical Information Act supplements HIPAA with state-specific health privacy'),
('xref_023', 'std_pri_036', 'std_pri_019', 'SUPPLEMENTS', 'CMIA supplements HIPAA Privacy Rule with California-specific medical information protections'),
('xref_024', 'std_pri_033', 'std_pri_009', 'SUPPLEMENTS', 'CalOPPA supplements CCPA with online-specific privacy disclosure requirements'),
('xref_025', 'std_pri_035', 'std_pri_009', 'SUPPLEMENTS', 'CA Constitutional right to privacy supplements CCPA as foundational privacy protection'),

-- ADVOCIS: State victim/family law supplements federal
('xref_026', 'std_adv_055', 'std_adv_056', 'SUPPLEMENTS', 'CA DV Response Protocol supplements federal VAWA with state-specific enforcement mechanisms'),
('xref_027', 'std_adv_058', 'std_adv_056', 'SUPPLEMENTS', 'FC 3044 DV Rebuttable Presumption supplements VAWA with custody-specific DV protections'),
('xref_028', 'std_adv_051', 'std_adv_052', 'SUPPLEMENTS', 'Marsys Law (constitutional) supplements PC 679-680 victim rights implementation with constitutional force'),

-- ETHICARA: State reporting supplements federal
('xref_029', 'std_eth_062', 'std_eth_063', 'SUPPLEMENTS', 'CANRA supplements elder abuse reporting with child-specific mandatory reporting requirements'),

-- ═══════════════════════════════════════════════════════════════════════════
-- 2. INTERPRETS — Case law interprets statutes
-- ═══════════════════════════════════════════════════════════════════════════

-- Family law case interpretations
('xref_030', 'std_case_001', 'std_adv_057', 'INTERPRETS', 'Troxel v. Granville interprets parental fundamental right in best interest determinations'),
('xref_031', 'std_case_012', 'std_adv_063', 'INTERPRETS', 'In re Marriage of Brown interprets community property division for pension benefits'),
('xref_032', 'std_case_013', 'std_adv_064', 'INTERPRETS', 'Family law case interprets child support guidelines calculation methodology'),
('xref_033', 'std_case_014', 'std_adv_058', 'INTERPRETS', 'Family law case interprets DV rebuttable presumption under FC 3044'),
('xref_034', 'std_case_015', 'std_adv_065', 'INTERPRETS', 'Family law case interprets fiduciary duties between spouses'),
('xref_035', 'std_case_054', 'std_adv_057', 'INTERPRETS', 'Burgess v. Burgess interprets best interest standard in custody move-away cases'),
('xref_036', 'std_case_054', 'std_adv_062', 'INTERPRETS', 'Burgess interprets UCCJEA jurisdiction implications in relocation disputes'),
('xref_037', 'std_case_001', 'std_adv_078', 'INTERPRETS', 'Troxel interprets 14th Amendment substantive due process for parental rights'),

-- Section 1983 / civil rights case interpretations
('xref_038', 'std_case_002', 'std_adv_083', 'INTERPRETS', 'Monroe v. Pape interprets 14th Amendment via Section 1983 against state actors'),
('xref_039', 'std_case_003', 'std_adv_083', 'INTERPRETS', 'Monell interprets 14th Amendment: municipalities liable under Section 1983 for policy/custom'),
('xref_040', 'std_case_035', 'std_adv_083', 'INTERPRETS', 'Qualified immunity case interprets 14th Amendment Section 1983 defense doctrine'),
('xref_041', 'std_case_036', 'std_adv_083', 'INTERPRETS', 'QI case interprets clearly established law standard under Section 1983'),
('xref_042', 'std_case_037', 'std_adv_083', 'INTERPRETS', 'QI case interprets scope of qualified immunity in Section 1983 actions'),

-- 4th Amendment case interpretations
('xref_043', 'std_case_005', 'std_adv_079', 'INTERPRETS', 'Graham v. Connor interprets 4th Amendment objective reasonableness for use of force'),
('xref_044', 'std_case_007', 'std_adv_079', 'INTERPRETS', 'Terry v. Ohio interprets 4th Amendment reasonable suspicion for stop and frisk'),
('xref_045', 'std_case_010', 'std_adv_079', 'INTERPRETS', 'Carpenter v. US interprets 4th Amendment warrant requirement for cell-site location data'),
('xref_046', 'std_case_022', 'std_adv_079', 'INTERPRETS', 'Katz v. US interprets 4th Amendment reasonable expectation of privacy'),
('xref_047', 'std_case_025', 'std_adv_079', 'INTERPRETS', 'Mapp v. Ohio interprets 4th Amendment exclusionary rule applicable to states'),

-- 5th Amendment case interpretations
('xref_048', 'std_case_006', 'std_adv_080', 'INTERPRETS', 'Miranda v. Arizona interprets 5th Amendment right against self-incrimination during custodial interrogation'),

-- Criminal procedure case interpretations
('xref_049', 'std_case_004', 'std_adv_081', 'INTERPRETS', 'Brady v. Maryland interprets 6th Amendment due process requiring prosecution disclosure of exculpatory evidence'),
('xref_050', 'std_case_009', 'std_adv_073', 'INTERPRETS', 'Daubert v. Merrell Dow interprets Evidence Code standards for admissibility of expert testimony'),

-- Therapist duty / mental health case interpretations
('xref_051', 'std_case_008', 'std_eth_068', 'INTERPRETS', 'Tarasoff v. Regents interprets duty to warn/protect when patient poses serious threat'),
('xref_052', 'std_case_008', 'std_eth_067', 'INTERPRETS', 'Tarasoff interprets limits of psychotherapist-patient privilege when danger exists'),

-- Housing case interpretations
('xref_053', 'std_case_011', 'std_reg_092', 'INTERPRETS', 'Green v. Superior Court interprets implied warranty of habitability under CC 1941-1942.5'),
('xref_054', 'std_case_020', 'std_reg_098', 'INTERPRETS', 'Jones v. Mayer interprets Federal Fair Housing Act prohibition on racial discrimination in housing'),
('xref_055', 'std_case_053', 'std_reg_098', 'INTERPRETS', 'Fair Housing Council v. Roommates.com interprets FHA application to online housing platforms'),

-- Employment case interpretations
('xref_056', 'std_case_016', 'std_reg_097', 'INTERPRETS', 'McDonnell Douglas interprets burden-shifting framework for employment discrimination claims under FEHA'),
('xref_057', 'std_case_044', 'std_reg_097', 'INTERPRETS', 'Bostock v. Clayton County interprets Title VII sex discrimination to include sexual orientation and gender identity'),
('xref_058', 'std_case_046', 'std_reg_157', 'INTERPRETS', 'Brinker v. Superior Court interprets employer obligations for meal and rest break timing and provision'),
('xref_059', 'std_case_047', 'std_reg_158', 'INTERPRETS', 'Dynamex Operations West interprets ABC test for independent contractor classification under AB 5'),
('xref_060', 'std_case_048', 'std_reg_156', 'INTERPRETS', 'Iskanian v. CLS Transportation interprets PAGA representative action standing and arbitration waivers'),

-- Consumer/financial case interpretations
('xref_061', 'std_case_049', 'std_fis_034', 'INTERPRETS', 'Standing case interprets Article III standing requirements for FCRA statutory damages claims'),
('xref_062', 'std_case_050', 'std_fis_035', 'INTERPRETS', 'Standing case interprets FCRA accuracy provisions and concrete injury requirement'),
('xref_063', 'std_case_051', 'std_fis_046', 'INTERPRETS', 'Rosenbach v. Six Flags interprets biometric privacy standing requirements'),

-- Privacy case interpretations
('xref_064', 'std_case_010', 'std_pri_035', 'INTERPRETS', 'Carpenter interprets CA constitutional privacy right in context of digital surveillance'),
('xref_065', 'std_case_022', 'std_pri_035', 'INTERPRETS', 'Katz interprets reasonable expectation of privacy foundational to CA constitutional privacy'),

-- Dependency / child welfare case interpretations
('xref_066', 'std_case_001', 'std_adv_067', 'INTERPRETS', 'Troxel interprets parental rights implications in CPS/dependency proceedings under WIC 300'),
('xref_067', 'std_case_013', 'std_adv_072', 'INTERPRETS', 'Family law case interprets ICWA applicability in custody and dependency proceedings'),

-- Additional case law connections
('xref_068', 'std_case_002', 'std_reg_173', 'INTERPRETS', 'Monroe v. Pape interprets relationship between Section 1983 and Government Tort Claims Act'),
('xref_069', 'std_case_009', 'std_adv_074', 'INTERPRETS', 'Daubert interprets expert opinion evidence admissibility standards under Evidence Code'),

-- ═══════════════════════════════════════════════════════════════════════════
-- 3. IMPLEMENTS — Regulations implement statutes
-- ═══════════════════════════════════════════════════════════════════════════

-- Federal financial regulations implementing statutes
('xref_070', 'std_fis_050', 'std_fis_051', 'IMPLEMENTS', 'Regulation Z implements Truth in Lending Act disclosure and APR calculation requirements'),
('xref_071', 'std_fis_053', 'std_fis_054', 'IMPLEMENTS', 'Regulation X implements RESPA servicing and escrow requirements'),
('xref_072', 'std_fis_056', 'std_fis_057', 'IMPLEMENTS', 'Regulation B implements ECOA anti-discrimination requirements in credit transactions'),

-- State housing regulations implementing statutes
('xref_073', 'std_reg_100', 'std_reg_089', 'IMPLEMENTS', 'Unlawful detainer procedures implement AB 1482 just cause eviction requirements'),
('xref_074', 'std_reg_100', 'std_reg_092', 'IMPLEMENTS', 'Unlawful detainer defense procedures implement habitability defense under CC 1941-1942.5'),
('xref_075', 'std_reg_093', 'std_reg_092', 'IMPLEMENTS', 'Security deposit regulations implement habitability standards for deposit deductions'),

-- Privacy regulations implementing statutes
('xref_076', 'std_pri_010', 'std_pri_009', 'IMPLEMENTS', 'CCPA consumer rights provisions implement CCPA statutory framework for data access and deletion'),
('xref_077', 'std_pri_011', 'std_pri_009', 'IMPLEMENTS', 'CCPA business obligations implement statutory compliance requirements'),
('xref_078', 'std_pri_019', 'std_pri_017', 'IMPLEMENTS', 'HIPAA Privacy Rule implements HIPAA statutory framework for protected health information'),
('xref_079', 'std_pri_020', 'std_pri_017', 'IMPLEMENTS', 'HIPAA Security Rule implements HIPAA requirements for electronic PHI safeguards'),

-- Victim rights implementation
('xref_080', 'std_adv_052', 'std_adv_051', 'IMPLEMENTS', 'PC 679-680 victim rights procedures implement Marsys Law constitutional mandates'),
('xref_081', 'std_adv_053', 'std_adv_051', 'IMPLEMENTS', 'Victim restitution provisions implement Marsys Law right to restitution'),
('xref_082', 'std_adv_054', 'std_adv_051', 'IMPLEMENTS', 'CalVCB implements Marsys Law victim compensation mandate through administrative process'),

-- Employment regulation implementation
('xref_083', 'std_reg_158', 'std_reg_156', 'IMPLEMENTS', 'AB 5 worker classification implements framework affecting PAGA representative action standing'),
('xref_084', 'std_reg_179', 'std_adv_079', 'IMPLEMENTS', 'RIPA implements 4th Amendment standards for law enforcement stop data collection and reporting'),

-- ═══════════════════════════════════════════════════════════════════════════
-- 4. REQUIRES — One standard requires compliance with another
-- ═══════════════════════════════════════════════════════════════════════════

-- Housing compliance chains
('xref_085', 'std_reg_099', 'std_reg_098', 'REQUIRES', 'Section 8 voucher program requires compliance with Federal Fair Housing Act nondiscrimination'),
('xref_086', 'std_reg_099', 'std_reg_097', 'REQUIRES', 'Section 8 administration requires compliance with FEHA housing discrimination protections'),
('xref_087', 'std_reg_099', 'std_reg_092', 'REQUIRES', 'Section 8 housing requires compliance with habitability standards under CC 1941-1942.5'),
('xref_088', 'std_reg_089', 'std_reg_093', 'REQUIRES', 'AB 1482 requires compliance with security deposit limits and return procedures'),
('xref_089', 'std_reg_100', 'std_reg_094', 'REQUIRES', 'Unlawful detainer proceedings require evaluation of retaliatory eviction defense'),

-- Financial compliance chains
('xref_090', 'std_fis_058', 'std_fis_034', 'REQUIRES', 'BSA/AML compliance requires FCRA-compliant customer identification and verification'),
('xref_091', 'std_fis_053', 'std_fis_050', 'REQUIRES', 'RESPA disclosures require coordination with TILA disclosure requirements'),
('xref_092', 'std_fis_061', 'std_fis_040', 'REQUIRES', 'SCRA requires FDCPA collectors to verify active duty status before collection actions'),

-- Privacy compliance chains
('xref_093', 'std_pri_017', 'std_pri_020', 'REQUIRES', 'HIPAA requires implementation of Security Rule safeguards for electronic PHI'),
('xref_094', 'std_pri_009', 'std_pri_034', 'REQUIRES', 'CCPA requires compliance with CA Data Breach Notification Act for security incidents'),
('xref_095', 'std_pri_039', 'std_pri_009', 'REQUIRES', 'GDPR cross-border transfers require evaluation of CCPA adequacy for California consumers'),

-- Mandatory reporting chains
('xref_096', 'std_eth_060', 'std_eth_062', 'REQUIRES', 'Medical Practice Act requires compliance with CANRA mandatory child abuse reporting'),
('xref_097', 'std_eth_060', 'std_eth_063', 'REQUIRES', 'Medical Practice Act requires compliance with elder abuse mandatory reporting'),
('xref_098', 'std_eth_068', 'std_eth_067', 'REQUIRES', 'Tarasoff duty to warn requires evaluation of psychotherapist privilege limitations'),
('xref_099', 'std_eth_069', 'std_eth_060', 'REQUIRES', 'LPS 5150 involuntary hold requires Medical Practice Act compliance for evaluation'),
('xref_100', 'std_eth_077', 'std_eth_060', 'REQUIRES', 'EMTALA emergency treatment requires Medical Practice Act licensed practitioners'),

-- Family law compliance chains
('xref_101', 'std_adv_057', 'std_adv_058', 'REQUIRES', 'Best interest determination requires evaluation of DV rebuttable presumption under FC 3044'),
('xref_102', 'std_adv_057', 'std_adv_064', 'REQUIRES', 'Best interest standard requires child support guideline compliance'),
('xref_103', 'std_adv_062', 'std_adv_057', 'REQUIRES', 'UCCJEA jurisdiction determination requires best interest of child analysis'),
('xref_104', 'std_adv_067', 'std_eth_062', 'REQUIRES', 'WIC 300 dependency proceedings require CANRA mandatory reporting compliance'),
('xref_105', 'std_adv_072', 'std_adv_067', 'REQUIRES', 'ICWA requires compliance with WIC 300 dependency standards plus additional tribal protections'),

-- Environmental compliance chains
('xref_106', 'std_reg_169', 'std_reg_170', 'REQUIRES', 'CEQA compliance may require concurrent NEPA review for federally connected projects'),
('xref_107', 'std_reg_169', 'std_reg_171', 'REQUIRES', 'CEQA review requires Clean Water Act compliance evaluation for water quality impacts'),
('xref_108', 'std_reg_169', 'std_reg_172', 'REQUIRES', 'CEQA review requires Clean Air Act compliance evaluation for air quality impacts'),

-- Government transparency chains
('xref_109', 'std_reg_178', 'std_reg_177', 'REQUIRES', 'Brown Act open meeting compliance requires Public Records Act compliance for meeting materials'),

-- ═══════════════════════════════════════════════════════════════════════════
-- 5. REFERENCES — General cross-references between related standards
-- ═══════════════════════════════════════════════════════════════════════════

-- Cross-citizen housing references
('xref_110', 'std_reg_092', 'std_reg_094', 'REFERENCES', 'Habitability standards and retaliatory eviction protections frequently invoked together as tenant defenses'),
('xref_111', 'std_reg_089', 'std_reg_090', 'REFERENCES', 'AB 1482 Tenant Protection Act operates within Costa-Hawkins vacancy decontrol framework'),
('xref_112', 'std_reg_089', 'std_reg_091', 'REFERENCES', 'AB 1482 just cause requirements interact with Ellis Act withdrawal provisions'),
('xref_113', 'std_reg_090', 'std_reg_091', 'REFERENCES', 'Costa-Hawkins vacancy decontrol and Ellis Act withdrawal are companion landlord protection statutes'),
('xref_114', 'std_reg_098', 'std_reg_099', 'REFERENCES', 'Federal Fair Housing Act nondiscrimination principles apply to Section 8 source-of-income protections'),

-- Cross-citizen DV/family law references
('xref_115', 'std_adv_055', 'std_eth_062', 'REFERENCES', 'DV response protocols cross-reference CANRA for co-occurring child abuse in DV situations'),
('xref_116', 'std_adv_056', 'std_adv_055', 'REFERENCES', 'Federal VAWA framework references state DV response protocol implementation'),
('xref_117', 'std_adv_058', 'std_adv_057', 'REFERENCES', 'DV rebuttable presumption directly referenced in best interest of child determinations'),
('xref_118', 'std_adv_063', 'std_adv_065', 'REFERENCES', 'Community property division references interspousal fiduciary duties for asset disclosure'),
('xref_119', 'std_adv_072', 'std_adv_062', 'REFERENCES', 'ICWA jurisdiction provisions reference UCCJEA for interstate custody jurisdiction coordination'),

-- Cross-citizen privacy/technology references
('xref_120', 'std_pri_023', 'std_pri_009', 'REFERENCES', 'TCPA telemarketing restrictions reference CCPA consent framework for consumer communications'),
('xref_121', 'std_pri_024', 'std_pri_023', 'REFERENCES', 'TCPA robocall provisions reference TCPA general telemarketing framework'),
('xref_122', 'std_pri_035', 'std_adv_079', 'REFERENCES', 'CA constitutional privacy right references 4th Amendment as parallel protection'),
('xref_123', 'std_pri_009', 'std_pri_039', 'REFERENCES', 'CCPA references GDPR as comparative framework for consumer data protection'),

-- Cross-citizen employment references
('xref_124', 'std_reg_156', 'std_reg_157', 'REFERENCES', 'PAGA representative actions frequently reference meal and rest break violations'),
('xref_125', 'std_reg_156', 'std_reg_158', 'REFERENCES', 'PAGA claims frequently reference AB 5 misclassification as underlying violation'),
('xref_126', 'std_reg_157', 'std_reg_159', 'REFERENCES', 'Meal and rest break requirements reference prevailing wage standards on public works projects'),
('xref_127', 'std_reg_158', 'std_reg_159', 'REFERENCES', 'AB 5 independent contractor test references prevailing wage compliance for construction'),

-- Cross-citizen government accountability references
('xref_128', 'std_reg_173', 'std_adv_083', 'REFERENCES', 'Government Tort Claims Act references 14th Amendment as parallel federal remedy via Section 1983'),
('xref_129', 'std_reg_174', 'std_adv_078', 'REFERENCES', 'Anti-SLAPP statute references First Amendment protected speech and petition activity'),
('xref_130', 'std_reg_179', 'std_adv_083', 'REFERENCES', 'RIPA racial profiling data references 14th Amendment equal protection requirements'),
('xref_131', 'std_reg_177', 'std_adv_078', 'REFERENCES', 'Public Records Act references First Amendment right of access to government information'),

-- Cross-citizen medical/legal references
('xref_132', 'std_eth_064', 'std_eth_060', 'REFERENCES', 'Medical malpractice/MICRA references Medical Practice Act standard of care requirements'),
('xref_133', 'std_eth_071', 'std_eth_069', 'REFERENCES', 'Competency to stand trial evaluation references LPS 5150 involuntary treatment framework'),
('xref_134', 'std_eth_067', 'std_pri_017', 'REFERENCES', 'Psychotherapist privilege references HIPAA privacy protections for mental health records'),
('xref_135', 'std_eth_069', 'std_adv_082', 'REFERENCES', 'LPS 5150 involuntary hold references 8th Amendment cruel and unusual punishment protections'),

-- Cross-citizen evidence/procedure references
('xref_136', 'std_adv_073', 'std_adv_074', 'REFERENCES', 'Evidence Code general provisions reference expert opinion evidence admissibility standards'),
('xref_137', 'std_adv_075', 'std_adv_076', 'REFERENCES', 'Evidence Code hearsay rules reference business records exception provisions'),
('xref_138', 'std_adv_077', 'std_adv_073', 'REFERENCES', 'Evidence Code privilege provisions reference general evidence admissibility framework'),
('xref_139', 'std_adv_073', 'std_adv_081', 'REFERENCES', 'Evidence Code admissibility references 6th Amendment confrontation clause requirements'),

-- Cross-citizen immigration references
('xref_140', 'std_reg_104', 'std_adv_056', 'REFERENCES', 'Immigration law references VAWA for immigration relief provisions for DV victims'),
('xref_141', 'std_reg_104', 'std_adv_083', 'REFERENCES', 'Immigration enforcement references 14th Amendment equal protection for noncitizen rights'),

-- Cross-citizen insurance/financial references
('xref_142', 'std_reg_116', 'std_eth_060', 'REFERENCES', 'Insurance law references Medical Practice Act for medical necessity determinations'),
('xref_143', 'std_reg_116', 'std_fis_034', 'REFERENCES', 'Insurance underwriting references FCRA for consumer report usage in risk assessment'),

-- Cross-citizen real estate/financial references
('xref_144', 'std_reg_128', 'std_fis_050', 'REFERENCES', 'Real estate consumer protections reference TILA disclosure requirements for mortgage transactions'),
('xref_145', 'std_reg_128', 'std_fis_053', 'REFERENCES', 'Real estate transaction requirements reference RESPA settlement procedures'),

-- Cross-citizen environmental/government references
('xref_146', 'std_reg_170', 'std_reg_169', 'REFERENCES', 'NEPA federal environmental review references CEQA as state-level equivalent process'),
('xref_147', 'std_reg_171', 'std_reg_172', 'REFERENCES', 'Clean Water Act references Clean Air Act as companion environmental protection statute'),

-- Infrastructure/platform references
('xref_148', 'std_syn_001', 'std_int_001', 'REFERENCES', 'SYNAPSE standards reference INTEGRA data integration standards for cross-system compliance'),
('xref_149', 'std_met_001', 'std_sen_001', 'REFERENCES', 'METRICS standards reference SENTINEL audit standards for compliance measurement'),
('xref_150', 'std_for_001', 'std_sen_001', 'REFERENCES', 'FORGE build standards reference SENTINEL security audit requirements'),

-- Additional cross-references for completeness
('xref_151', 'std_fis_040', 'std_fis_056', 'REFERENCES', 'FDCPA debt collection references ECOA nondiscrimination in credit practices'),
('xref_152', 'std_reg_097', 'std_reg_156', 'REFERENCES', 'FEHA employment discrimination claims frequently pursued alongside PAGA representative actions'),
('xref_153', 'std_adv_055', 'std_adv_058', 'REFERENCES', 'DV response protocol references FC 3044 rebuttable presumption for custody determinations'),
('xref_154', 'std_eth_077', 'std_eth_064', 'REFERENCES', 'EMTALA emergency treatment obligation references MICRA medical malpractice framework'),
('xref_155', 'std_pri_036', 'std_eth_067', 'REFERENCES', 'CMIA medical information confidentiality references psychotherapist privilege protections');

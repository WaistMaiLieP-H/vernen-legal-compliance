-- Vernen Legal Compliance — Industry-Specific: Construction
-- The Complete Book: Construction Industry Compliance
-- Created: March 17, 2026
--
-- From a UA Local 342 plumber who knows what the inspector carries.
-- Every rule sourced to statute. Every standard discoverable.
--
-- Coverage:
--   Federal: OSHA 1926, Davis-Bacon, Miller Act, EPA Lead/Asbestos,
--     OSHA Silica, OSHA Fall Protection, Confined Spaces, Crane/Derrick,
--     Hazard Communication, Multi-Employer Doctrine
--   State: Prevailing wage, lien laws, prompt payment acts,
--     safety training requirements, apprenticeship standards

-- ============================================================
-- FEDERAL CONSTRUCTION RULES
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('fed-con-001', 'FED-CON-001', 'OSHA Construction Standards (29 CFR 1926) — General Requirements',
 'All construction employers must comply with OSHA Construction Industry Standards. Requirements include: written safety and health program, competent person designation for each hazard area, safety training (initial + ongoing), hazard communication program, personal protective equipment assessment and provision, injury/illness recordkeeping (Form 300/300A/301 for 11+ employees). General Duty Clause (Section 5(a)(1)) requires workplaces free from recognized hazards. Construction is OSHA''s most-cited industry.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '29 CFR Part 1926 Subpart C; 29 USC § 654(a)(1)', 'https://www.osha.gov/construction', 1),

('fed-con-002', 'FED-CON-002', 'OSHA Fall Protection (Subpart M) — #1 Cited Standard',
 'Employers must provide fall protection at heights of 6 feet or more in construction (vs. 4 feet general industry). Methods: guardrail systems (42" top rail, 21" mid rail), safety net systems, personal fall arrest systems (PFAS). Each method has specific engineering requirements. Covers: leading edges, hoist areas, holes, formwork/reinforcing steel, ramps/runways, excavations, dangerous equipment, overhand bricklaying, roofing, precast concrete, wall openings, residential construction. #1 most-cited OSHA standard every year.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '29 CFR 1926 Subpart M (§ 1926.500-503)', 'https://www.osha.gov/fall-protection', 1),

('fed-con-003', 'FED-CON-003', 'OSHA Scaffolding Standards (Subpart L)',
 'All scaffolds must be capable of supporting 4x the intended load (safety factor). Platforms must be fully planked. Guardrails required at 10+ feet. Competent person must inspect before each shift and after weather events. Scaffold erectors must receive training. Specific requirements for: supported scaffolds, suspended scaffolds, aerial lifts, ladder jack scaffolds. #2-3 most-cited OSHA standard. Cross-bracing cannot serve as top rail.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '29 CFR 1926 Subpart L (§ 1926.450-454)', 'https://www.osha.gov/scaffolding', 1),

('fed-con-004', 'FED-CON-004', 'OSHA Excavation and Trenching (Subpart P)',
 'Excavations 5+ feet deep require protective systems: sloping/benching, shoring, or trench boxes/shields. Must be designed by a competent person (20+ feet requires registered professional engineer). Competent person must inspect daily and after rain/vibration/changes. Access/egress (ladder, ramp, stairway) within 25 feet of lateral travel. Utilities must be located before digging (811/Call Before You Dig). Trench cave-ins kill ~40 workers/year — one of the most lethal hazards.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '29 CFR 1926 Subpart P (§ 1926.650-652)', 'https://www.osha.gov/trenching', 1),

('fed-con-005', 'FED-CON-005', 'OSHA Electrical Safety — Construction (Subpart K)',
 'Construction electrical requirements: GFCI protection for all 120-volt, 15/20-amp receptacles on construction sites (or assured equipment grounding conductor program). Lockout/tagout for electrical systems. Clearance distances from overhead power lines (10 feet for up to 50kV). Proper use of extension cords (no daisy-chaining, hard-service or extra-hard-service rated). Temporary wiring requirements. All electrical work performed by qualified persons.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '29 CFR 1926 Subpart K (§ 1926.400-449)', 'https://www.osha.gov/electrical', 1),

('fed-con-006', 'FED-CON-006', 'OSHA Crane and Derrick Standards (Subpart CC)',
 'Comprehensive crane safety rules effective 2010. Requires: certified crane operators (NCCCO, CIC, NCCER, or OECP certification), annual inspections by qualified persons, pre-shift inspections by operators, assembly/disassembly directed by qualified/competent person, ground conditions adequate for crane loads, prohibited zone around power lines (20 feet for up to 350kV), signal person qualification, rigger qualification. Applies to all cranes and derricks in construction.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2010-11-08', '29 CFR 1926 Subpart CC (§ 1926.1400-1442)', 'https://www.osha.gov/cranes-derricks', 1),

('fed-con-007', 'FED-CON-007', 'OSHA Silica Standard — Respirable Crystalline Silica',
 'Construction employers must limit worker exposure to respirable crystalline silica to 50 μg/m³ (PEL) as an 8-hour TWA. Table 1 provides specified control measures for 18 common construction tasks (cutting, grinding, drilling concrete/masonry/stone). If not following Table 1: exposure assessment, engineering controls, respiratory protection, medical surveillance, written exposure control plan required. Medical exams every 3 years for exposed workers. Silicosis is incurable and irreversible.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2017-06-23', '29 CFR § 1926.1153', 'https://www.osha.gov/silica-crystalline', 1),

('fed-con-008', 'FED-CON-008', 'OSHA Confined Space in Construction',
 'Construction employers must: identify all permit-required confined spaces (PRCS), inform exposed employees of hazards, develop written permit space programs for entry, designate entry supervisors and attendants, provide rescue services, provide atmospheric monitoring, ventilation, and PPE. Permit-required spaces have: hazardous atmosphere, engulfment hazard, converging walls, or other serious safety/health hazard. Competent person must evaluate each space. Effective May 4, 2015.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2015-08-03', '29 CFR 1926 Subpart AA (§ 1926.1201-1213)', 'https://www.osha.gov/confined-spaces', 1),

('fed-con-009', 'FED-CON-009', 'OSHA Hazard Communication (HazCom/GHS) — Construction',
 'Employers must: develop a written Hazard Communication Program, maintain Safety Data Sheets (SDS) for all hazardous chemicals on site (accessible within each shift), label all containers with GHS-compliant labels, train employees on chemical hazards before initial exposure and when new hazards introduced. Construction-specific: multi-employer sites require coordination between GCs and subs. GHS labels: pictograms, signal words, hazard/precautionary statements, product identifier.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '29 CFR § 1926.59; 29 CFR § 1910.1200 (incorporated by reference)', 'https://www.osha.gov/hazcom', 1),

('fed-con-010', 'FED-CON-010', 'Davis-Bacon Act — Federal Prevailing Wage',
 'Contractors and subcontractors on federal construction contracts over $2,000 must pay workers no less than the locally prevailing wages and fringe benefits as determined by the DOL. Wage determinations are project-specific by county and type of construction (building, highway, heavy, residential). Must: post wage determination at the site, submit certified weekly payrolls (WH-347), maintain 3-year payroll records. Updated 2023 rule: restored 30% survey rule, updated definitions. Violations: withholding of contract payments, debarment (3 years).',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '40 USC § 3141-3148; 29 CFR Parts 1, 3, 5', 'https://www.dol.gov/agencies/whd/government-contracts/construction', 1),

('fed-con-011', 'FED-CON-011', 'OSHA Multi-Employer Citation Policy',
 'On multi-employer construction worksites, OSHA may cite employers in 4 categories: (1) Creating employer — caused the hazard; (2) Exposing employer — employees exposed to the hazard; (3) Correcting employer — responsibility for correcting the hazard; (4) Controlling employer — general supervisory authority over the worksite (usually the GC). GCs can be cited for sub''s violations if they had the ability to detect and require correction. This is why GCs walk the site with the book.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'OSHA Directive CPL 02-00-124 (Multi-Employer Citation Policy)', 'https://www.osha.gov/enforcement/directives/cpl-02-00-124', 1),

('fed-con-012', 'FED-CON-012', 'EPA Lead Renovation, Repair and Painting (RRP) Rule',
 'Firms performing renovation, repair, or painting activities that disturb lead-based paint in pre-1978 housing and child-occupied facilities must: be EPA-certified, use certified renovators, follow lead-safe work practices (containment, HEPA vacuum, wet methods, prohibited practices), provide Lead Hazard Information Pamphlet to occupants, maintain records for 3 years. Firms must apply for certification ($300, 5-year renewal). Renovator certification requires 8-hour course + 4-hour refresher every 5 years.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2010-04-22', '40 CFR Part 745 Subpart E; 15 USC § 2682', 'https://www.epa.gov/lead/lead-renovation-repair-and-painting-program', 1),

('fed-con-013', 'FED-CON-013', 'EPA Asbestos NESHAP — Demolition and Renovation',
 'Before demolition or renovation of commercial buildings, facility owners/operators must: conduct thorough asbestos inspection by accredited inspector, notify the appropriate state agency and EPA 10 working days before demolition/renovation involving regulated asbestos-containing material (RACM). Removal of RACM must follow specific work practices: wet methods, intact removal, no visible emissions, proper disposal at approved landfill. AHERA covers schools. Individuals must be trained and licensed.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '40 CFR Part 61 Subpart M (NESHAP); 40 CFR Part 763 (AHERA)', 'https://www.epa.gov/asbestos', 1),

('fed-con-014', 'FED-CON-014', 'OSHA 10-Hour and 30-Hour Training Requirements',
 'OSHA 10-Hour (workers) and 30-Hour (supervisors/foremen) Outreach Training are widely required. Federal: not universally mandated by OSHA regulations, but required on many federal projects and by many GCs contractually. State mandates: CT, MA, MO, NH, NV, NY, PA, RI require OSHA 10/30 for specific construction work. NYC: Site Safety Training (SST) card required (62 hours). Topics: OSHA Focus Four (falls, struck-by, caught-in/between, electrocution), PPE, scaffolding, excavation, cranes.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'OSHA Outreach Training Program (voluntary); state-specific mandates', 'https://www.osha.gov/training/outreach', 1),

('fed-con-015', 'FED-CON-015', 'Stormwater Pollution Prevention Plan (SWPPP) — Construction',
 'Construction sites disturbing 1+ acre (or less than 1 acre if part of a larger plan) must obtain a NPDES Construction General Permit (CGP) and develop a SWPPP. Must: identify potential stormwater pollutants, describe BMPs (silt fences, sediment basins, stabilized entrances, erosion control blankets), inspect BMPs at least every 7 days and within 24 hours of 0.25"+ rain, maintain inspection records, file Notice of Intent (NOI) before construction and Notice of Termination (NOT) after final stabilization.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '33 USC § 1342; 40 CFR § 122.26; EPA CGP', 'https://www.epa.gov/npdes/stormwater-discharges-construction-activities', 1),

('fed-con-016', 'FED-CON-016', 'OSHA Personal Protective Equipment — Construction (Subpart E)',
 'Employers must: assess the workplace for hazards requiring PPE, select appropriate PPE, provide PPE at no cost to employees (except everyday clothing, weather gear, and non-specialty safety glasses/shoes if allowed off-site), ensure proper fitting and use, train employees on when/what/how to use PPE. Construction-specific: hard hats (ANSI Z89.1), safety glasses/goggles (ANSI Z87.1), high-visibility vests (ANSI 107), steel-toe boots, hearing protection (85+ dBA TWA), respiratory protection (fit-tested).',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '29 CFR 1926 Subpart E (§ 1926.95-107)', 'https://www.osha.gov/personal-protective-equipment', 1),

('fed-con-017', 'FED-CON-017', 'Federal Prompt Payment Act — Construction',
 'Federal agencies must pay construction contractors within 14 days of receipt of a proper payment request. Prime contractors must pay subcontractors within 7 days of receiving payment from the government. Interest on late payments: Treasury rate + 1%. Retainage: generally limited to 10% and must be released promptly upon substantial completion. Does not apply to state/local projects (state prompt payment acts govern). Disputes resolved through Contract Disputes Act.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '31 USC § 3901-3907; FAR Part 32.9', 'https://www.dol.gov/agencies/whd/government-contracts/construction', 1);


-- ============================================================
-- STATE CONSTRUCTION RULES — KEY STATES
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

-- CALIFORNIA
('ca-con-001', 'CA-CON-001', 'California Prevailing Wage (Labor Code § 1720-1861)',
 'All public works projects (state/local funded, $1,000+ for construction, $25,000+ for alteration/repair) require payment of prevailing wages as determined by DIR. Rates posted at jobsite. Certified payroll records (CPR) submitted to the awarding body and available to public upon request. Contractor must be registered with DIR to bid/perform public work. Apprenticeship requirements: hire registered apprentices for public works. Penalties: $200/day per worker for violations, plus debarment.',
 'INDUSTRY_SPECIFIC', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'Cal. Labor Code § 1720-1861; 8 CCR § 16000-16802', 'https://www.dir.ca.gov/oprl/DPreWageDetermination.htm', 1),

('ca-con-002', 'CA-CON-002', 'California Mechanics Lien Law',
 'Contractors, subcontractors, and suppliers who furnish labor or materials for improvement of real property may file a mechanics lien. Preliminary notice (20-day) required from subcontractors/suppliers within 20 days of first furnishing. Direct contractors: no prelim needed. Must file lien within 90 days of completion. Lien priority: relates back to commencement of work. Must enforce by filing suit within 90 days of recording. Stop payment notices available for private and public works.',
 'INDUSTRY_SPECIFIC', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'Cal. Civ. Code § 8000-9566', 'https://www.cslb.ca.gov/consumers/legal_issues_for_consumers/mechanics_lien/', 1),

('ca-con-003', 'CA-CON-003', 'Cal/OSHA Construction Safety Orders',
 'California operates a state OSHA plan (Cal/OSHA) with construction safety standards that are at least as effective as — and in many cases stricter than — federal OSHA. Key differences: Injury and Illness Prevention Program (IIPP) required for ALL employers (no federal equivalent), heat illness prevention standard (outdoor work), wildfire smoke protection, specific tunnel safety orders. Penalties: up to $25,000 per serious violation ($70,000+ for repeat/willful). Cal/OSHA can issue Order Prohibiting Use (OPU) to shut down imminent hazards.',
 'INDUSTRY_SPECIFIC', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'Cal. Labor Code § 6300-6719; 8 CCR Title 8 (Construction Safety Orders)', 'https://www.dir.ca.gov/dosh/', 1),

-- NEW YORK
('ny-con-001', 'NY-CON-001', 'New York Labor Law § 240 — Scaffold Law (Absolute Liability)',
 'New York''s Scaffold Law imposes ABSOLUTE LIABILITY on property owners and general contractors for gravity-related injuries to construction workers (falls from height, struck by falling objects). One of only two states (with Illinois to lesser extent) with absolute liability. No comparative negligence defense available. Covers: scaffolds, hoists, stays, ladders, slings, hangers, blocks, pulleys, ropes, irons, brackets, and other devices. Significantly impacts insurance costs and construction economics in New York.',
 'INDUSTRY_SPECIFIC', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'N.Y. Labor Law § 240(1) (Scaffold Law); § 241(6)', 'https://dol.ny.gov/', 1),

('ny-con-002', 'NY-CON-002', 'NYC Site Safety Training (SST) Card Requirement',
 'ALL construction workers on NYC construction sites must hold a Site Safety Training (SST) card. Total: 62 hours minimum (40-hour SST course + OSHA 30-hour + additional electives). Effective September 1, 2020 (fully phased in). Applies to jobs requiring a Construction Superintendent, Site Safety Coordinator, or Site Safety Manager. SST cards issued by NYC DOB-approved training providers. Failure to carry valid card: stop work order, fines.',
 'INDUSTRY_SPECIFIC', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2020-09-01', 'NYC Admin Code § 28-502; Local Law 196 of 2017', 'https://www1.nyc.gov/site/buildings/safety/site-safety-training.page', 1),

('ny-con-003', 'NY-CON-003', 'New York Prevailing Wage',
 'Public works projects require payment of prevailing wages and supplements as established by the NYS DOL. Covers: all public work contracts (no minimum threshold). Must submit certified payrolls. Original contractor must obtain waivers of lien from subs before final payment. Apprenticeship requirements on public works. Penalties: contractor debarment (5 years), criminal prosecution for willful violations, interest on underpayments.',
 'INDUSTRY_SPECIFIC', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'N.Y. Labor Law Art. 8 (§ 220); 12 NYCRR Part 220', 'https://dol.ny.gov/public-work-and-prevailing-wage', 1),

-- TEXAS
('tx-con-001', 'TX-CON-001', 'Texas Construction Trust Fund Act',
 'Construction payments received by a contractor or subcontractor on a construction project are trust funds for the benefit of those who labored or furnished materials for the project. Misapplication of trust funds (using project funds for other projects or personal use) is a criminal offense: misdemeanor (under $500), state jail felony ($500-$20,000), third-degree felony ($20,000-$100,000), second-degree felony ($100,000+), first-degree felony ($200,000+). Property owners making direct payment are also subject.',
 'INDUSTRY_SPECIFIC', 'STATE', 'TX',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'Tex. Prop. Code § 162.001-162.033', 'https://statutes.capitol.texas.gov/Docs/PR/htm/PR.162.htm', 1),

('tx-con-002', 'TX-CON-002', 'Texas Mechanic''s and Materialman''s Lien',
 'Texas provides constitutional lien rights for those who furnish labor/materials for construction. Original contractors: file affidavit lien within 4th month after indebtedness accrues. Subcontractors/suppliers: must send notice to owner on or before 15th day of 2nd month after unpaid labor/materials provided, then file lien within 4th month. Residential homestead: additional protections (must have signed contract, cannot force sale except for original contract). Texas lien law is among the most complex in the US.',
 'INDUSTRY_SPECIFIC', 'STATE', 'TX',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'Tex. Prop. Code § 53.001-53.260; TX Const. Art. XVI, § 37', 'https://statutes.capitol.texas.gov/Docs/PR/htm/PR.53.htm', 1),

-- FLORIDA
('fl-con-001', 'FL-CON-001', 'Florida Construction Lien Law',
 'Contractors, subs, and suppliers can claim a construction lien on improved real property. Must serve Notice to Owner (NTO) within 45 days of first furnishing. Claim of Lien must be recorded within 90 days of final furnishing (or completion of contract). Must commence enforcement action within 1 year of recording. Contractors who receive payment but fail to pay subcontractors: may be subject to lien transfer, suspension of license, or criminal prosecution (theft). Florida is a "direct payment" state — owners can pay subs directly.',
 'INDUSTRY_SPECIFIC', 'STATE', 'FL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'Fla. Stat. § 713.001-713.37', 'https://www.myfloridalicense.com/', 1),

-- ILLINOIS
('il-con-001', 'IL-CON-001', 'Illinois Prevailing Wage Act',
 'All public works projects (state, county, city, township, school district, etc.) require payment of prevailing wages. No minimum contract amount. Certified payroll records must be submitted monthly. Must keep records for 5 years. Apprenticeship utilization requirements. Penalties: contractor barred from public work for 4 years for violations, plus back wages owed. Illinois Department of Labor determines prevailing rates by county for over 100 trade classifications.',
 'INDUSTRY_SPECIFIC', 'STATE', 'IL',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '820 ILCS 130/0.01-130/12', 'https://labor.illinois.gov/laws-rules/conmed/prevailing-wage-act.html', 1),

-- PENNSYLVANIA
('pa-con-001', 'PA-CON-001', 'Pennsylvania Prevailing Wage Act',
 'Public construction projects over $25,000 require payment of prevailing wages as determined by the PA Secretary of Labor. Applies to: construction, reconstruction, demolition, alteration, repair of public buildings/works. Certified payrolls required. Apprenticeship requirements apply. Penalties: debarment (3 years), criminal penalties for willful violations. Pennsylvania''s prevailing wage has been subject to frequent legislative debate.',
 'INDUSTRY_SPECIFIC', 'STATE', 'PA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '43 P.S. § 165-1 to 165-17 (Prevailing Wage Act)', 'https://www.dli.pa.gov/Individuals/Labor-Management-Relations/llc/prevailing-wage/Pages/default.aspx', 1),

-- WASHINGTON
('wa-con-001', 'WA-CON-001', 'Washington Prevailing Wage',
 'All public works projects require payment of prevailing wages as determined by the Department of Labor & Industries (L&I). No minimum threshold. Includes fringe benefits. Intent to pay prevailing wages must be filed before work begins; affidavit of wages paid must be filed before final payment. Apprenticeship utilization requirements (15% minimum on projects over $1M). Retainage: limited to 5% and must be held in interest-bearing escrow.',
 'INDUSTRY_SPECIFIC', 'STATE', 'WA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'RCW 39.12 (Prevailing Wage); WAC 296-127', 'https://lni.wa.gov/licensing-permits/public-works-projects/', 1),

-- GENERAL — State Prompt Payment Acts
('gen-con-001', 'GEN-CON-001', 'State Prompt Payment Acts — Construction',
 'Nearly all states have prompt payment acts requiring timely payment on construction projects. Common provisions: owner must pay GC within 14-30 days of billing; GC must pay subs within 7-14 days of receiving payment. Interest on late payments: varies (1-2%/month in many states). Retainage limits: 5-10% in most states, must be released upon substantial completion. Key states: CA (30/7 days), NY (30/7 days), TX (35/7 days), FL (25/10 days), IL (30/15 days). These laws exist because construction payment abuse was endemic.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'State-specific prompt payment statutes; see AGC/ABC state-by-state guides', 'https://www.agc.org/', 1),

('gen-con-002', 'GEN-CON-002', 'State Little Miller Acts — Public Project Bonding',
 'Most states have "Little Miller Acts" requiring performance and payment bonds on state/local public construction projects. Thresholds vary: some states at $0 (all public work), others at $25,000-$100,000+. Bond amounts typically 100% of contract value for both performance and payment. Subcontractors'' and suppliers'' claims against the payment bond typically must be filed within 90-120 days of last furnishing. Federal Miller Act ($150,000 threshold) covers federal projects only.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'State-specific bonding statutes; 40 USC § 3131 (federal Miller Act)', 'https://www.sba.gov/federal-contracting/contracting-guide/bonding-requirements', 1),

('gen-con-003', 'GEN-CON-003', 'Apprenticeship Standards — Federal and State',
 'Registered apprenticeship programs must comply with federal (DOL Office of Apprenticeship) or state apprenticeship agency standards. Requirements: minimum 2,000 hours OJT + related technical instruction (RTI), progressive wage schedule (starting at ~50-60% of journey rate), written apprenticeship agreement. Public works projects in many states require employment of registered apprentices (ratios vary: 1 apprentice per 5 journeyworkers is common). Union programs: JATC-administered. Non-union: program sponsor-administered.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '29 CFR Part 29 (federal); state apprenticeship acts', 'https://www.apprenticeship.gov/', 1);

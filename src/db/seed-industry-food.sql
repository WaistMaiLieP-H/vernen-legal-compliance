-- Vernen Legal Compliance — Industry-Specific: Food & Restaurant
-- The Complete Book: Food Industry Compliance
-- Created: March 17, 2026
--
-- Coverage:
--   Federal: FDA Food Code, FSMA, USDA, allergen labeling, nutrition labeling,
--     food facility registration, HACCP, food defense
--   State: Health department permits, food handler certifications, cottage food
--     laws, alcohol service training, restaurant-specific employment rules

-- ============================================================
-- FEDERAL FOOD INDUSTRY RULES
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('fed-food-001', 'FED-FOOD-001', 'FDA Food Safety Modernization Act (FSMA) — Preventive Controls',
 'Food facilities (manufacturers, processors, packers, holders) must implement preventive controls for human food. Requirements: written food safety plan, hazard analysis, preventive controls (process, allergen, sanitation, supply chain, recall plan), monitoring procedures, corrective actions, verification activities, recordkeeping. PCQI (Preventive Controls Qualified Individual) required to develop and oversee the plan. Exemptions: farms, retail food establishments, very small businesses (qualified exemption with modified requirements). FDA inspects based on risk.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2016-09-19', '21 CFR Part 117 (Human Food); 21 USC § 350g', 'https://www.fda.gov/food/food-safety-modernization-act-fsma/fsma-final-rule-preventive-controls-human-food', 1),

('fed-food-002', 'FED-FOOD-002', 'FDA Food Code — Model for Retail Food Safety',
 'The FDA Food Code is a model code (not directly enforceable federally) that state and local jurisdictions adopt to regulate retail food establishments (restaurants, grocery stores, institutional food service). Covers: food source/condition, employee health/hygiene, food temperature control (danger zone: 41-135°F), equipment/facility sanitation, pest control, HACCP for specialized processes. Most states/counties adopt the Food Code with modifications. Inspected by local health departments 1-4 times/year based on risk.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'FDA Food Code 2022; adopted by reference in state/local codes', 'https://www.fda.gov/food/retail-food-protection/fda-food-code', 1),

('fed-food-003', 'FED-FOOD-003', 'FSMA Produce Safety Rule',
 'Farms growing, harvesting, packing, or holding fruits and vegetables (covered produce) consumed raw must meet science-based standards for: agricultural water quality, biological soil amendments (composting, application intervals), worker health and hygiene, domesticated and wild animals, equipment/tools/buildings sanitation. Exemptions: produce rarely consumed raw, farms with less than $25,000 annual produce sales, qualified exemption for farms with less than $500,000 sales and majority sold directly.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2016-01-26', '21 CFR Part 112; 21 USC § 350h', 'https://www.fda.gov/food/food-safety-modernization-act-fsma/fsma-final-rule-produce-safety', 1),

('fed-food-004', 'FED-FOOD-004', 'FALCPA — Food Allergen Labeling',
 'The Food Allergen Labeling and Consumer Protection Act requires that food labels clearly identify the presence of any of the 9 major food allergens: milk, eggs, fish, crustacean shellfish, tree nuts, peanuts, wheat, soybeans, and sesame (added 2023 by FASTER Act). Must declare in ingredient list or "Contains" statement. Applies to all packaged foods regulated by FDA. Undeclared allergen is the #1 reason for food recalls. Restaurant menus: not federally required but strongly recommended; some states/cities mandate allergen disclosure.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2006-01-01', '21 USC § 343(w); FASTER Act (Pub. L. 117-11, 2021)', 'https://www.fda.gov/food/food-labeling-nutrition/food-allergies', 1),

('fed-food-005', 'FED-FOOD-005', 'FDA Nutrition Labeling Requirements',
 'Most packaged foods must bear a Nutrition Facts label. Updated format (2020): larger serving sizes reflecting actual consumption, updated Daily Values, added line for "Added Sugars," added Vitamin D and Potassium. Compliance: manufacturers with $10M+ annual food sales compliant since 2020; smaller manufacturers since 2021. Menu labeling: chain restaurants/similar retail food establishments with 20+ locations must disclose calorie counts on menus and provide additional nutrition information upon request.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '21 CFR Part 101; 21 USC § 343(q); ACA § 4205 (menu labeling)', 'https://www.fda.gov/food/food-labeling-nutrition/nutrition-facts-label', 1),

('fed-food-006', 'FED-FOOD-006', 'USDA Meat, Poultry, and Egg Products Inspection',
 'Establishments slaughtering or processing meat (FMIA), poultry (PPIA), or egg products (EPIA) for commercial distribution must be inspected by USDA FSIS. Requires: grant of federal inspection, HACCP plan, Sanitation SOPs, continuous or daily FSIS inspection presence. State-inspected plants: may sell only within the state (or participate in Cooperative Interstate Shipment program). Custom-exempt: for owner''s personal use only. USDA mark of inspection required on all inspected products.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '21 USC § 601-695 (FMIA); 21 USC § 451-472 (PPIA); 21 USC § 1031-1056 (EPIA)', 'https://www.fsis.usda.gov/', 1),

('fed-food-007', 'FED-FOOD-007', 'HACCP — Mandatory for Specific Food Industries',
 'Hazard Analysis and Critical Control Points (HACCP) plans are mandatory for: seafood processing (21 CFR Part 123), juice processing (21 CFR Part 120), and USDA-inspected meat and poultry facilities (9 CFR Part 417). 7 HACCP principles: (1) conduct hazard analysis, (2) identify CCPs, (3) establish critical limits, (4) monitoring procedures, (5) corrective actions, (6) verification procedures, (7) recordkeeping. For other food facilities, FSMA preventive controls have largely replaced voluntary HACCP.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '21 CFR Part 120 (juice), Part 123 (seafood); 9 CFR Part 417 (meat/poultry)', 'https://www.fda.gov/food/guidance-regulation-food-and-dietary-supplements/hazard-analysis-critical-control-point-haccp', 1),

('fed-food-008', 'FED-FOOD-008', 'FSMA Foreign Supplier Verification Program (FSVP)',
 'Importers of food for humans and animals must verify that foreign suppliers produce food meeting US safety standards. Requirements: hazard analysis, evaluation and approval of foreign suppliers, verification activities (on-site audits, sampling/testing, review of supplier food safety records), corrective actions, recordkeeping. Must have FSVP importer identified at time of entry. Applies to all importers unless food is from a supplier subject to certain exemptions.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 '2017-05-30', '21 CFR Part 1 Subpart L; 21 USC § 384a', 'https://www.fda.gov/food/food-safety-modernization-act-fsma/fsma-final-rule-foreign-supplier-verification-programs-fsvp-importers-food-humans-and-animals', 1),

('fed-food-009', 'FED-FOOD-009', 'Food Defense — Intentional Adulteration Rule',
 'Facilities with over $10M in annual sales and specific processes (bulk liquid receiving/loading, liquid storage/handling, secondary ingredient handling, mixing/similar activities) must implement a food defense plan to protect against intentional adulteration. Requirements: vulnerability assessment, mitigation strategies, monitoring, corrective actions, verification, training, recordkeeping. Exemptions: farms, very small businesses (qualified), facilities solely engaged in packing/holding/warehousing.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["CORPORATION","LLC","S_CORP","PARTNERSHIP"]',
 '2019-07-26', '21 CFR Part 121; 21 USC § 350i', 'https://www.fda.gov/food/food-safety-modernization-act-fsma/fsma-final-rule-mitigation-strategies-protect-food-against-intentional-adulteration', 1),

('fed-food-010', 'FED-FOOD-010', 'FDA Food Traceability Rule (FSMA 204)',
 'Effective January 20, 2026, persons who manufacture, process, pack, or hold foods on the Food Traceability List (FTL) must maintain additional traceability records. FTL includes: leafy greens, melons, tomatoes, peppers, sprouts, tropical tree fruits, fresh herbs, finfish, crustaceans, mollusks, ready-to-eat deli salads, fresh-cut produce, shell eggs, nut butters, and cheeses. Must assign and record Key Data Elements (KDEs) at Critical Tracking Events (CTEs). Records must be available to FDA within 24 hours.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2026-01-20', '21 CFR Part 1 Subpart S; 21 USC § 2223', 'https://www.fda.gov/food/food-safety-modernization-act-fsma/fsma-final-rule-requirements-additional-traceability-records-certain-foods', 1);


-- ============================================================
-- STATE FOOD & RESTAURANT RULES
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('gen-food-001', 'GEN-FOOD-001', 'State Health Department Food Service Permits',
 'ALL 50 states require food service establishments (restaurants, cafeterias, catering, food trucks, temporary events) to obtain a food service permit/license from the state or local health department. Requirements: pre-opening inspection, compliance with adopted Food Code, certified food protection manager (Certified Food Protection Manager exam — ServSafe, NRFSP, etc.), plan review for new construction/renovation. Inspected 1-4 times/year. Violations: scored/graded (letter grades in LA County, NYC; numeric in others). Critical violations require immediate correction.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'State-specific food service licensing acts; FDA Food Code as adopted', 'https://www.fda.gov/food/retail-food-protection/retail-food-program-regulatory-standards', 1),

('gen-food-002', 'GEN-FOOD-002', 'State Food Handler Certification Requirements',
 'Many states require food handlers (all food service employees) to obtain a food handler card/certificate within a specified period of hire. Requirements vary: CA (all food handlers within 30 days), TX (all within 60 days), IL (within 30 days), AZ (within 30 days), OR (all employees), NY (no state mandate but local requirements). Training: 2-4 hour course covering food safety, personal hygiene, cross-contamination, temperature control, allergens. Valid 2-5 years. Cost: $10-$25 typically.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'State food handler certification statutes (CA Health & Safety Code § 113948; TX Health & Safety Code § 438; etc.)', 'https://www.fda.gov/food', 1),

('gen-food-003', 'GEN-FOOD-003', 'State Cottage Food Laws',
 'ALL 50 states have enacted cottage food laws allowing individuals to produce and sell certain homemade food products from their home kitchen without a commercial food license. Allowable products (typically): baked goods, jams/jellies, candy, honey, dried herbs, dry mixes, granola, popcorn. NOT typically allowed: potentially hazardous foods (meat, dairy, cut produce). Sales limits vary: $25,000-$75,000 annually in most states. Labeling: name/address, ingredients, allergens, "Made in a home kitchen" disclaimer. Some states allow online and farmers market sales; others restrict to in-person.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["SOLE_PROPRIETORSHIP","LLC"]',
 NULL, 'State cottage food acts (all 50 states have enacted; varies significantly)', 'https://foodpreneurs.com/cottage-food-laws/', 1),

('gen-food-004', 'GEN-FOOD-004', 'Responsible Alcohol Service Training',
 'Many states require or strongly incentivize responsible alcohol service training for servers, bartenders, and managers in establishments selling/serving alcohol. Mandatory training states: AK, CA, DC, DE, HI, IL, ME, MT, NH, NM, NY, OH, OK, OR, PA, RI, TX, UT, WA, and others. Programs: TIPS, ServSafe Alcohol, state-specific certifications. Topics: checking ID, recognizing intoxication, legal liability (dram shop laws), refusing service. Dram shop liability: 43 states + DC impose some form of liability on establishments serving visibly intoxicated persons.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'State-specific alcohol server training requirements; dram shop statutes', 'https://www.alcoholpolicy.niaaa.nih.gov/', 1),

-- California specifics
('ca-food-001', 'CA-FOOD-001', 'California Retail Food Code',
 'California has adopted and modified the FDA Food Code as the California Retail Food Code (CalCode). Enforced by county environmental health departments. Unique California requirements: allergen awareness training (SB 1172, 2025), choking hazard poster requirement, trans fat restrictions, California Proposition 65 warnings for certain food products/services, smoking prohibition in outdoor dining areas. Letter grading not statewide but required in some counties (LA County pioneered A/B/C grading).',
 'INDUSTRY_SPECIFIC', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'Cal. Health & Safety Code § 113700-114437 (CalCode)', 'https://www.cdph.ca.gov/Programs/CEH/DFDCS/Pages/FDBPrograms/FoodSafetyProgram.aspx', 1),

('ca-food-002', 'CA-FOOD-002', 'California Proposition 65 — Food and Restaurant',
 'Restaurants and food businesses must provide warnings if they expose consumers to chemicals known to cause cancer or reproductive harm. Acrylamide warning: required for fried/baked/roasted foods. Lead: coffee, chocolate, some supplements. BPA: canned goods. Safe harbor levels exist for many chemicals. Penalty: $2,500 per day per violation (private attorneys general may bring suit). Proposition 65 litigation against food companies is a major industry in California.',
 'INDUSTRY_SPECIFIC', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'Cal. Health & Safety Code § 25249.5-25249.14 (Prop 65)', 'https://oehha.ca.gov/proposition-65', 1),

-- New York specifics
('ny-food-001', 'NY-FOOD-001', 'NYC Restaurant Letter Grading',
 'NYC Department of Health and Mental Hygiene (DOHMH) inspects restaurants and assigns letter grades (A, B, C) based on violation points. Grade must be posted at the entrance. A: 0-13 points, B: 14-27 points, C: 28+ points. Restaurants receiving B or C may request re-inspection. NYC has the most visible restaurant grading system in the US. Violations categorized as: critical (food safety risk), general (sanitation), and public health hazard (imminent health risk — causes immediate closure).',
 'INDUSTRY_SPECIFIC', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2010-07-01', 'NYC Admin Code § 81.51; NYC Health Code § 81.51', 'https://www.nyc.gov/site/doh/business/food-operators/letter-grading-for-restaurants.page', 1),

-- Texas specifics
('tx-food-001', 'TX-FOOD-001', 'Texas Food Establishment Rules',
 'Texas Department of State Health Services (DSHS) licenses food establishments (Chapter 228). Requires certified food manager on each shift. All food handlers must complete approved food handler training within 60 days of hire. Texas has a separate cottage food law (Texas Cottage Food Law, revised 2019 and 2021) allowing $75,000 annual sales. Mobile food units require separate permits. Texas Alcoholic Beverage Commission (TABC) regulates all alcohol sales. TABC certification required for servers.',
 'INDUSTRY_SPECIFIC', 'STATE', 'TX',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '25 TAC Chapter 228; Tex. Health & Safety Code § 437', 'https://www.dshs.texas.gov/food-establishments', 1);

-- Vernen Legal Compliance — Oregon State Rules (Batch 4)
-- ENVIRONMENTAL, CONSUMER_PROTECTION, HEALTHCARE, REAL_ESTATE, CANNABIS
-- Created: April 5, 2026
--
-- 100 rules covering Oregon-specific compliance obligations
-- Real ORS citations, substantive descriptions with thresholds and penalties

-- ============================================================
-- ENVIRONMENTAL (30 rules) — or-env-001 through or-env-030
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-env-001', 'OR-ENV-001', 'DEQ Air Contaminant Discharge Permit (ACDP)',
 'Any facility that emits air contaminants must obtain an Air Contaminant Discharge Permit from Oregon DEQ before commencing operations. Permits specify emission limits, monitoring requirements, and reporting obligations. Major sources exceeding 100 tons/year of any criteria pollutant require Title V Federal Operating Permits. Annual permit fees range from $575 to over $90,000 based on emissions. Failure to obtain a permit: civil penalties up to $10,000/day per violation.',
 'ENVIRONMENTAL', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 468A.040; ORS § 468A.050; OAR 340-216', 'https://www.oregon.gov/deq/aq/Pages/Permits.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-env-002', 'OR-ENV-002', 'Air Quality Standards — Criteria Pollutant Compliance',
 'Oregon adopts federal NAAQS for six criteria pollutants (PM2.5, PM10, ozone, SO2, NO2, CO, lead) plus state-specific standards for reduced sulfur compounds. The Portland-Vancouver and Medford areas have historically been nonattainment for PM2.5 and ozone. Sources in nonattainment areas face stricter Lowest Achievable Emission Rate (LAER) requirements and must obtain emission offsets at 1.15:1 ratio. DEQ monitors via 40+ ambient air monitoring stations statewide.',
 'ENVIRONMENTAL', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 468A.025; OAR 340-202; 40 CFR Part 50', 'https://www.oregon.gov/deq/aq/Pages/Air-Quality-Standards.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-env-003', 'OR-ENV-003', 'NPDES Water Quality Discharge Permits',
 'Any point source discharge of pollutants to waters of the state requires a National Pollutant Discharge Elimination System (NPDES) permit from Oregon DEQ under delegated CWA authority. Individual permits set facility-specific effluent limits; general permits cover categories like stormwater and aquaculture. Permit terms are 5 years maximum. Applications must be submitted 180 days before discharge commences. Violations carry civil penalties up to $10,000/day and criminal penalties up to $25,000/day for knowing violations.',
 'ENVIRONMENTAL', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 468B.050; OAR 340-045; 33 USC § 1342', 'https://www.oregon.gov/deq/wq/Pages/WQ-Permits.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-env-004', 'OR-ENV-004', 'Water Quality Standards — Temperature and Toxics',
 'Oregon water quality standards set numeric criteria for temperature (e.g., 18°C for salmon/steelhead core cold water habitat), dissolved oxygen (minimum 8.0 mg/L for cold-water aquatic life), pH (6.5-8.5), turbidity, and 126 toxic pollutants. The 303(d) list identifies 1,900+ impaired water body segments. Dischargers to impaired waters must meet wasteload allocations in Total Maximum Daily Loads (TMDLs). Temperature trading allowed under OAR 340-039.',
 'ENVIRONMENTAL', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 468B.035; OAR 340-041', 'https://www.oregon.gov/deq/wq/Pages/WQ-Standards.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-env-005', 'OR-ENV-005', 'Hazardous Waste Generator Requirements',
 'Oregon DEQ administers RCRA hazardous waste regulations. Generators must determine if waste is hazardous (listed or characteristic), obtain an EPA ID number, and comply with accumulation time limits: Large Quantity Generators (>1,000 kg/month) — 90 days; Small Quantity Generators (100-1,000 kg/month) — 270 days; Very Small Quantity Generators (<100 kg/month) — 1,000 kg accumulation cap. Manifest required for all off-site shipments. Annual reporting due March 1 for LQGs. Civil penalties up to $10,000/day.',
 'ENVIRONMENTAL', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 466.005-466.385; OAR 340-100 through 340-120', 'https://www.oregon.gov/deq/Hazards-and-Cleanup/hw/Pages/default.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-env-006', 'OR-ENV-006', 'Hazardous Waste Treatment, Storage, and Disposal Facility Permits',
 'Facilities that treat, store, or dispose of hazardous waste must obtain a DEQ hazardous waste facility permit. Permit applications require Part A (general info) and Part B (detailed technical information including groundwater monitoring, closure plan, financial assurance). Financial assurance for closure/post-closure required — typically via surety bond, letter of credit, or insurance. Corrective action required for releases. Permit terms up to 10 years with renewal.',
 'ENVIRONMENTAL', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 466.075-466.195; OAR 340-102; 40 CFR Part 264-265', 'https://www.oregon.gov/deq/Hazards-and-Cleanup/hw/Pages/Permits.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-env-007', 'OR-ENV-007', 'Underground Storage Tank Registration and Compliance',
 'All USTs containing petroleum products or hazardous substances must be registered with Oregon DEQ and carry $1 million per occurrence/$2 million aggregate financial responsibility. Tanks must have spill prevention, overfill protection, and release detection. Existing single-wall USTs required to upgrade to double-wall or add secondary containment. Owners must conduct monthly release detection monitoring. Confirmed releases require 24-hour notification to DEQ, followed by site assessment and cleanup. Annual tank fees: $90-$150/tank.',
 'ENVIRONMENTAL', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 466.706-466.995; OAR 340-150', 'https://www.oregon.gov/deq/Hazards-and-Cleanup/ust/Pages/default.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-env-008', 'OR-ENV-008', 'Forest Practices Act — Notification and Permit Requirements',
 'All commercial forest operations (timber harvesting, road construction, site preparation, reforestation) on non-federal land require written notification to ODF at least 15 days before operations begin. Operations in sensitive areas (steep slopes, near streams, in slide-prone areas) require a written plan approved by ODF. Violations: civil penalties up to $5,000 for first offense, $10,000 for subsequent offenses. ODF conducts field inspections on approximately 25% of all notifications.',
 'ENVIRONMENTAL', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 527.610-527.770; OAR 629-600 through 629-680', 'https://www.oregon.gov/odf/working/Pages/fpa.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-env-009', 'OR-ENV-009', 'Forest Practices Act — Reforestation Requirements',
 'After timber harvest, landowners must reforest within 2 years (or apply for 1-year extension). Minimum stocking standards: 200 free-to-grow trees per acre within 6 years of harvest for most sites. Species must be commercially valuable and suited to the site. Clearcut units exceeding 120 acres require a written plan. ODF conducts stocking surveys at year 1 and year 5. Failure to reforest: ODF may reforest and bill the landowner, plus civil penalties.',
 'ENVIRONMENTAL', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 527.745; OAR 629-610', 'https://www.oregon.gov/odf/working/Pages/reforestation.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-env-010', 'OR-ENV-010', 'Forest Practices Act — Riparian Buffer Zones',
 'Mandatory vegetation retention buffers along streams during forestry operations. Large Type F (fish-bearing) streams: no harvest within 20 feet, limited harvest 20-100 feet (must retain 40-60 sq ft basal area/acre). Small Type F streams: no harvest within 20 feet. Type N (non-fish) streams: equipment exclusion zone of 10 feet. Type D (domestic water) streams: 100-foot buffer. These buffers protect water temperature, large wood recruitment, and bank stability critical for salmon habitat.',
 'ENVIRONMENTAL', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 527.765; OAR 629-640-0000 through 629-640-0400', 'https://www.oregon.gov/odf/working/Pages/riparian-rules.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-env-011', 'OR-ENV-011', 'Statewide Land Use Planning — Urban Growth Boundaries',
 'Under Oregon Goal 14, every city must establish an Urban Growth Boundary (UGB) separating urban from rural land. Development is concentrated inside UGBs; land outside is preserved for farm, forest, and rural uses. UGB amendments require demonstration of need for 20-year land supply and compliance with all 19 statewide planning goals. Cities must complete periodic review every 7-18 years. DLCD and LCDC oversee compliance. Appeals go to LUBA within 21 days of final decision.',
 'ENVIRONMENTAL', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 197.005-197.860; OAR 660-024', 'https://www.oregon.gov/lcd/UP/Pages/Urban-Growth-Boundaries.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-env-012', 'OR-ENV-012', 'Land Use Planning — Measure 37/49 Property Claims',
 'Measure 49 (2007) replaced Measure 37, allowing landowners who acquired property before a land use regulation to claim up to 3 home sites (10 for pre-1973 ownership) if the regulation reduced fair market value. Claims are filed with DLCD. Express claims (1-3 lots) processed administratively; conditional claims (4-10 lots) require appraisal showing value reduction. Deadline for Measure 49 claims has passed but existing approved claims remain valid and transferable with the land.',
 'ENVIRONMENTAL', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 195.300-195.336 (Measure 49); former ORS § 197.352 (Measure 37)', 'https://www.oregon.gov/lcd/measure49/Pages/index.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-env-013', 'OR-ENV-013', 'Oregon Bottle Bill — Beverage Container Deposit Return',
 'Oregon pioneered container deposit legislation in 1971. Current deposit: 10 cents per container (increased from 5 cents in 2017 when redemption fell below 80%). Applies to beer, malt beverages, water, flavored water, and soft drinks in glass, metal, or plastic containers. Retailers must accept returns or pay into the BottleDrop network. Distributors fund the system. Unredeemed deposits go to Oregon Beverage Recycling Cooperative. Current redemption rate exceeds 86%. Retailers within 1 mile of a BottleDrop center may refuse returns.',
 'ENVIRONMENTAL', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 459A.700-459A.740; OAR 340-090-0010 through 340-090-0080', 'https://www.oregon.gov/deq/recycling/Pages/Bottle-Bill.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-env-014', 'OR-ENV-014', 'E-Waste Recycling — Oregon E-Cycles Program',
 'Manufacturers selling covered electronic devices (computers, monitors, TVs, printers) in Oregon must participate in a DEQ-approved collection and recycling program or operate an approved independent plan. Manufacturers pay fees to fund free collection at 100+ sites statewide. Covered devices must be recycled by certified processors (R2 or e-Stewards). Annual reporting of collection volumes required by April 1. Manufacturer registration required before selling. Civil penalties up to $10,000/day for non-compliance.',
 'ENVIRONMENTAL', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 459A.300-459A.365; OAR 340-098-0000 through 340-098-0100', 'https://www.oregon.gov/deq/ecycles/Pages/default.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-env-015', 'OR-ENV-015', 'PaintCare Oregon — Paint Stewardship Program',
 'Oregon was the first state to enact paint stewardship (2009). Manufacturers of architectural paint sold in Oregon must participate in the PaintCare program. Post-consumer paint is collected at 180+ drop-off sites statewide. Assessment fee added at point of sale: $0.00 (half-pint or less) to $0.99 (5 gallons). Collected latex paint is recycled into new paint; oil-based paint used as fuel. Annual program plan and report required to DEQ. Program collects 3+ million gallons annually.',
 'ENVIRONMENTAL', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 459A.820-459A.855; OAR 340-098-0300 through 340-098-0390', 'https://www.oregon.gov/deq/recycling/Pages/Paint.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-env-016', 'OR-ENV-016', 'Stormwater Management — 1200-Z Industrial General Permit',
 'Industrial facilities in 29 SIC code categories must obtain a 1200-Z NPDES general permit for stormwater discharges. Requires development of a Stormwater Pollution Control Plan (SWPCP), quarterly visual monitoring, semi-annual benchmark monitoring for sector-specific pollutants, and annual reporting. Benchmark exceedances trigger corrective action and enhanced monitoring. Impaired-waters facilities face numeric effluent limits. Permit fee: $1,200/year for most facilities. No-exposure certification available if materials fully sheltered.',
 'ENVIRONMENTAL', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 468B.050; OAR 340-045-0033; DEQ 1200-Z General Permit', 'https://www.oregon.gov/deq/wq/wqpermits/Pages/Stormwater-Industrial.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-env-017', 'OR-ENV-017', 'Construction Stormwater — 1200-C General Permit',
 'Construction sites disturbing 1 or more acres of land (or part of a larger common plan of development) must obtain a 1200-C NPDES permit before ground disturbance. Requires an Erosion and Sediment Control Plan (ESCP), site inspections every 7 calendar days and within 24 hours of 0.5 inches of rain, and stabilization of exposed soil within 7 days of final grading. Turbidity benchmark: 280 NTU. Permit fee: $1,200 initial + annual fee. Must file Notice of Termination after final stabilization.',
 'ENVIRONMENTAL', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 468B.050; OAR 340-045-0033; DEQ 1200-C General Permit', 'https://www.oregon.gov/deq/wq/wqpermits/Pages/Stormwater-Construction.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-env-018', 'OR-ENV-018', 'Asbestos Abatement Requirements',
 'Before demolition or renovation of structures built before 1981, a thorough asbestos inspection by an Oregon-licensed inspector is required. If asbestos-containing material (ACM) is found, removal must be performed by licensed abatement contractors following DEQ notification (10 working days before project start for demolition, 10 days for renovation involving >260 linear feet, >160 sq ft, or >35 cu ft). Waste must go to DEQ-approved landfill. Worker licensing: $50 annual fee. Contractor licensing: $250 annual fee.',
 'ENVIRONMENTAL', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 468A.720; OAR 340-248-0005 through 340-248-0280', 'https://www.oregon.gov/deq/aq/Pages/Asbestos.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-env-019', 'OR-ENV-019', 'Lead-Based Paint Abatement and Renovation',
 'Oregon Health Authority licenses lead-based paint activities: inspectors, risk assessors, supervisors, workers, and project designers. RRP Rule: contractors performing renovation, repair, or painting in pre-1978 housing/child-occupied facilities must be EPA or OHA certified, use lead-safe work practices, and provide EPA pamphlet "Protect Your Family From Lead in Your Home." Abatement projects require 5-day advance notification to OHA. Clearance testing required after abatement. Penalties: up to $1,000/day civil; criminal penalties for knowing violations.',
 'ENVIRONMENTAL', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 431A.255-431A.330; OAR 333-069; 40 CFR Part 745', 'https://www.oregon.gov/oha/PH/HEALTHYENVIRONMENTS/LEADPOISONING/Pages/index.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-env-020', 'OR-ENV-020', 'Oregon Clean Fuels Program',
 'Oregon Clean Fuels Program requires fuel importers and producers to reduce the carbon intensity (CI) of transportation fuels by 10% below 2015 levels by 2025, with a trajectory toward 37% reduction by 2035. Obligated parties (fuel importers/producers) must meet declining CI benchmarks or purchase credits. Credits generated by low-CI fuels (electricity, renewable diesel, biodiesel, hydrogen). Quarterly reporting required. Credit trading market administered by DEQ. Non-compliance penalty: deficit carryover at 5% premium.',
 'ENVIRONMENTAL', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 468A.260-468A.277; OAR 340-253', 'https://www.oregon.gov/deq/ghgp/cfp/Pages/default.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-env-021', 'OR-ENV-021', 'Climate Protection Program — Cap and Reduce',
 'Oregon Climate Protection Program (CPP) caps and reduces greenhouse gas emissions from fossil fuels used in Oregon, targeting 50% below 1990 levels by 2035 and 90% by 2050. Regulated entities (fuel suppliers, natural gas utilities, large stationary sources emitting 25,000+ MTCO2e/year) receive declining compliance obligations. Entities may use Community Climate Investment credits (funding projects in environmental justice communities) to meet up to portion of obligations. DEQ administers. First compliance period: 2022-2024.',
 'ENVIRONMENTAL', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 468A.200-468A.260; OAR 340-271', 'https://www.oregon.gov/deq/ghgp/cpp/Pages/default.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-env-022', 'OR-ENV-022', 'Ballast Water Management — Invasive Species Prevention',
 'Vessels entering Oregon waters must manage ballast water to prevent introduction of aquatic invasive species. Ships must exchange ballast water at least 200 nautical miles offshore in water 2,000+ meters deep, or use a USCG-approved ballast water management system meeting <10 living organisms/mL standard. 24-hour advance reporting to DEQ required before discharge. Vessels must maintain ballast water management plans and record books. Oregon coordinates with Pacific states through Pacific Ballast Water Group. Penalties up to $5,000/day.',
 'ENVIRONMENTAL', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 783.620-783.640; OAR 340-143', 'https://www.oregon.gov/deq/wq/Pages/Ballast-Water.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-env-023', 'OR-ENV-023', 'Agricultural Water Rights — Prior Appropriation System',
 'Oregon follows the prior appropriation doctrine: first in time, first in right. All surface water and groundwater use requires a water right permit from the Oregon Water Resources Department (OWRD). Application process: initial review (completeness), public interest review, proposed final order, permit issuance, proof of beneficial use, water right certificate. Transfer of water rights requires OWRD approval. Groundwater wells must be constructed by licensed well constructors and reported within 30 days. Water right holders must report actual use when requested.',
 'ENVIRONMENTAL', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 537.010-537.990; OAR 690-300 through 690-410', 'https://www.oregon.gov/owrd/Pages/index.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-env-024', 'OR-ENV-024', 'Renewable Portfolio Standard — Utility Clean Energy Targets',
 'Oregon RPS requires large utilities (PGE, PacifiCorp) to supply 50% of retail electricity from renewable sources by 2040. HB 2021 (2021) goes further: 100% clean electricity by 2040 (80% by 2030, 90% by 2035). Small utilities: 10% by 2025. Community-based renewable energy projects receive 2x credit. Eligible sources: wind, solar, geothermal, wave energy, biomass, small hydro. Non-compliance: alternative compliance payment of $50/MWh. Annual compliance reporting to Oregon PUC.',
 'ENVIRONMENTAL', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 469A.005-469A.210; HB 2021 (2021)', 'https://www.oregon.gov/energy/energy-oregon/Pages/Renewable-Portfolio-Standard.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-env-025', 'OR-ENV-025', 'Solar and Renewable Energy Incentives — Net Metering and Community Solar',
 'Oregon requires utilities to offer net metering for customer-owned solar up to 25 kW (residential) and 2 MW (commercial). Customer receives retail-rate credit for excess generation, carried forward monthly, with annual true-up. Community Solar Program (SB 1547) allows customers to subscribe to shared solar projects and receive bill credits. Solar + Storage Rebate Program provides up to $5,000 for solar and $2,500 for paired storage (income-qualified: up to $15,000). Oregon solar access laws protect rights to sunlight.',
 'ENVIRONMENTAL', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 757.300 (net metering); SB 1547 (community solar); ORS § 105.880 (solar access)', 'https://www.oregon.gov/energy/energy-oregon/Pages/Solar.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-env-026', 'OR-ENV-026', 'Energy Efficiency Standards — Oregon Reach Code and Building Codes',
 'Oregon adopts energy codes exceeding federal standards. Commercial buildings must comply with ASHRAE 90.1-2019 as minimum; Reach Code targets 60% energy reduction from 2004 baseline by 2030. New residential construction must meet Oregon Residential Specialty Code with prescriptive or performance energy paths. Solar-ready requirements for new commercial buildings over 10,000 sq ft. EV-ready requirements for new multifamily (40% of spaces) and commercial buildings. Oregon Building Codes Division enforces through local jurisdictions.',
 'ENVIRONMENTAL', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 455.500; ORS § 455.010; OAR 918-460 through 918-480', 'https://www.oregon.gov/bcd/codes-stand/Pages/energy-efficiency.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-env-027', 'OR-ENV-027', 'Vehicle Emissions Testing — DEQ Clean Air Stations',
 'Vehicles registered in the Portland-metro and Medford-Ashland areas must pass DEQ emissions testing every 2 years. Testing is On-Board Diagnostics (OBD-II) based for 1996+ vehicles. Exempt vehicles: those newer than 4 model years old, electric/hybrid-electric, motorcycles, diesels over 8,500 lbs GVWR. Test cost: $0 (free since 2020, funded by registration fees). Vehicles that fail must be repaired; repair cost waiver available at $1,000+ in qualifying repairs. Moving out of testing area does not eliminate current-due test.',
 'ENVIRONMENTAL', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 468A.350-468A.400; OAR 340-256', 'https://www.oregon.gov/deq/Vehicle-Inspection/Pages/default.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-env-028', 'OR-ENV-028', 'Greenhouse Gas Reporting — Mandatory Annual Emissions Reporting',
 'Facilities and fuel suppliers emitting or supplying 2,500+ MTCO2e/year must report greenhouse gas emissions annually to DEQ by March 31. Reporting uses EPA protocols (40 CFR Part 98) with Oregon-specific adjustments. Covered sources include power plants, industrial facilities, fuel importers, natural gas utilities, and landfills. Third-party verification required for reporters above 25,000 MTCO2e/year. Data published in the Oregon GHG Reporting Program database. Penalties for late or inaccurate reporting up to $10,000/day.',
 'ENVIRONMENTAL', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 468A.280; OAR 340-215', 'https://www.oregon.gov/deq/ghgp/Pages/GHG-Reporting.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-env-029', 'OR-ENV-029', 'Solid Waste Management — Disposal Site Permits and Material Recovery',
 'Oregon requires all solid waste disposal sites (landfills, transfer stations, composting facilities) to obtain DEQ permits. Oregon set a 2025 material recovery goal of 55%. Generators of more than 8 cubic yards/week of solid waste must source-separate recyclables. Food waste generators producing 1,000+ lbs/week must arrange for recovery or composting (SB 263, 2025 phase-in). Disposal fees include a per-ton surcharge funding DEQ programs. Landfills must have financial assurance for closure and 30-year post-closure care.',
 'ENVIRONMENTAL', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 459.005-459.992; OAR 340-093 through 340-097', 'https://www.oregon.gov/deq/recycling/Pages/default.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-env-030', 'OR-ENV-030', 'Brownfield and Voluntary Cleanup Program',
 'Oregon DEQ Voluntary Cleanup Program allows property owners and prospective purchasers to assess and clean up contaminated properties under DEQ oversight with liability protections upon completion. Participation fee: $5,000 initial + hourly oversight fees ($144/hour). Upon satisfactory completion, DEQ issues a No Further Action determination or approval of institutional/engineering controls. Brownfield Redevelopment Fund provides loans and grants up to $200,000 for assessment and $1M for cleanup. Environmental liability protection through prospective purchaser agreements.',
 'ENVIRONMENTAL', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 465.200-465.545; OAR 340-122-0010 through 340-122-0115', 'https://www.oregon.gov/deq/Hazards-and-Cleanup/CleanUp/Pages/Voluntary-Cleanup.aspx', 1);

-- ============================================================
-- CONSUMER PROTECTION (25 rules) — or-cons-001 through or-cons-025
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cons-001', 'OR-CONS-001', 'Unlawful Trade Practices Act — General Prohibition',
 'Oregon UTPA prohibits unfair or deceptive conduct in trade or commerce. Covers false representations about goods/services, bait-and-switch, failure to deliver promised goods, and unconscionable business practices. Oregon DOJ has enforcement authority with civil penalties up to $25,000 per willful violation. Private right of action: consumers may recover actual damages or $200 (whichever is greater) plus attorney fees. Class actions permitted. No requirement to prove reliance if practice is capable of deceiving a reasonable consumer.',
 'CONSUMER_PROTECTION', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 646.605-646.656', 'https://www.doj.state.or.us/consumer-protection/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cons-002', 'OR-CONS-002', 'Unlawful Trade Practices — Specific Prohibited Conduct',
 'UTPA specifically prohibits: representing goods as new when reconditioned; disparaging competitors by false representation; advertising goods without intent to supply reasonably expected demand; making false claims about price reductions; representing a sale as wholesale when it is retail; failing to disclose known material defects; and substituting inferior goods. Willful violations: up to $25,000 penalty per violation. Pattern of violations allows DOJ to seek injunctive relief plus disgorgement of profits.',
 'CONSUMER_PROTECTION', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 646.608', 'https://www.oregonlegislature.gov/bills_laws/ors/ors646.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cons-003', 'OR-CONS-003', 'Oregon Lemon Law — New Motor Vehicle Warranties',
 'Oregon Lemon Law covers new motor vehicles with a manufacturer warranty. If a substantial defect is not repaired after a reasonable number of attempts (4 repair attempts for the same defect, or 2 attempts for a defect likely to cause death/serious injury, or vehicle out of service for 30+ business days cumulative in first 24 months or 24,000 miles), manufacturer must replace the vehicle or refund the purchase price less a reasonable allowance for use. Consumer must first participate in manufacturer-sponsored arbitration if available. Filing with DOJ required.',
 'CONSUMER_PROTECTION', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 646A.400-646A.418', 'https://www.doj.state.or.us/consumer-protection/motor-vehicles/lemon-laws/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cons-004', 'OR-CONS-004', 'Manufactured Dwelling Tenant Protections',
 'Tenants in manufactured dwelling parks have extensive protections under Oregon law. Landlords may not terminate tenancy without cause (ORS 90.630). Rent increases limited to once per 12 months with 90-day written notice. Park closures require 365-day notice and payment of relocation costs ($5,000-$9,000 per home depending on size). Landlords must offer 12-month rental agreements. Tenant has right of first refusal if park is sold. Park must maintain roads, common areas, water, and sewer. Retaliatory eviction prohibited.',
 'CONSUMER_PROTECTION', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 90.100-90.875; ORS § 90.505-90.875 (manufactured dwellings)', 'https://www.oregonlegislature.gov/bills_laws/ors/ors090.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cons-005', 'OR-CONS-005', 'Debt Collection Practices — Oregon Restrictions',
 'Oregon supplements federal FDCPA with additional debt collection restrictions. Debt collectors may not: contact debtor at unusual times (before 8 AM or after 9 PM); communicate with debtor at their place of employment if employer prohibits; use profane or obscene language; threaten violence; contact debtor after receiving written cease-and-desist; or add unauthorized charges. Oregon statute of limitations on debt: 6 years for written contracts, 6 years for open accounts. Violations: actual damages plus $200 statutory damages and attorney fees.',
 'CONSUMER_PROTECTION', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 646.639; ORS § 646.641; 15 USC § 1692', 'https://www.doj.state.or.us/consumer-protection/debt-collection/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cons-006', 'OR-CONS-006', 'Telephone Solicitation — Do Not Call and Registration',
 'Telemarketers must register with the Oregon DOJ before soliciting Oregon consumers. Registration fee: $100/year. Must comply with Oregon Do Not Call list ($500 annual subscription fee from DOJ). Calls prohibited before 9 AM and after 9 PM, and on Sundays before noon. Caller must identify themselves, the business, and purpose within first 30 seconds. Automated/prerecorded messages require prior express consent. Exemptions: established business relationship (18 months), charitable organizations. Violations: $25,000 per call.',
 'CONSUMER_PROTECTION', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 646.561-646.578; OAR 137-020-0800 through 137-020-0860', 'https://www.doj.state.or.us/consumer-protection/phone-internet-tv/telemarketing/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cons-007', 'OR-CONS-007', 'Elder Financial Abuse — Mandatory Reporting and Civil Remedies',
 'Oregon law protects vulnerable persons (65+ or adults with disabilities) from financial exploitation. Financial institutions, securities professionals, and care providers are mandatory reporters — must report suspected financial abuse to DHS Adult Protective Services within 24 hours. Financial institutions may delay transactions up to 15 business days if exploitation suspected. Civil cause of action: victim may recover treble damages plus attorney fees. Criminal financial exploitation: Class A misdemeanor to Class B felony depending on amount.',
 'CONSUMER_PROTECTION', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 124.100-124.140; ORS § 124.050-124.095 (financial exploitation)', 'https://www.doj.state.or.us/consumer-protection/elder-abuse/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cons-008', 'OR-CONS-008', 'Price Gouging During Emergency — Prohibition on Unconscionable Pricing',
 'During a declared abnormal disruption of the market (governor-declared emergency), sellers may not charge unconscionably excessive prices for essential consumer goods (food, fuel, water, ice, pharmaceuticals, medical supplies, building materials, transportation). Price increases above 15% of pre-emergency levels are presumed unconscionable unless justified by increased costs. Applies for 180 days after declaration (extendable). Violations: UTPA remedies plus $25,000 civil penalty per violation. DOJ enforcement authority.',
 'CONSUMER_PROTECTION', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 401.965', 'https://www.doj.state.or.us/consumer-protection/price-gouging/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cons-009', 'OR-CONS-009', 'Gift Card Protections — No Expiration and Dormancy Fee Limits',
 'Oregon prohibits expiration dates on gift cards, gift certificates, and store credits. No dormancy fees, service fees, or inactivity charges may be imposed on gift cards with a face value of $5 or less. For cards over $5, inactivity fees may only be charged after 24 months of no activity and must be disclosed at point of sale. Cash redemption required for balances under $5 upon consumer request. Prepaid phone cards exempt. Promotional cards (zero cost to consumer) may have expiration if clearly disclosed. Violations: UTPA penalties.',
 'CONSUMER_PROTECTION', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 646A.274-646A.278', 'https://www.oregonlegislature.gov/bills_laws/ors/ors646A.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cons-010', 'OR-CONS-010', 'Truth in Lending — Oregon Supplement to Federal TILA',
 'Oregon supplements federal Truth in Lending Act with additional disclosure requirements. Maximum interest rates: 12% per annum for consumer transactions unless licensed lender or exempt. Oregon usury laws apply to non-exempt consumer credit transactions. Disclosure of APR, finance charges, total of payments, and payment schedule required before consummation. Oregon Consumer Finance Act requires licensing for consumer lenders making loans under $50,000. License application fee: $400; annual renewal: $200. Penalties: void excess charges plus refund.',
 'CONSUMER_PROTECTION', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 725.010-725.370 (Consumer Finance Act); ORS § 82.010 (interest rates)', 'https://dfr.oregon.gov/business/licensing/consumer-finance', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cons-011', 'OR-CONS-011', 'Home Solicitation Sales — Three-Day Right of Rescission',
 'Sales of goods or services over $25 made at the buyer home, workplace, or temporary seller location (not sellers permanent place of business) are home solicitation sales. Buyer has an unconditional right to cancel within 3 business days. Seller must provide two copies of a written cancellation notice at time of sale in the same language as the oral presentation. If seller fails to provide notice, cancellation period extends to 1 year. Upon cancellation, seller must refund all payments within 10 business days.',
 'CONSUMER_PROTECTION', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 83.710-83.750', 'https://www.doj.state.or.us/consumer-protection/purchases-contracts/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cons-012', 'OR-CONS-012', 'Funeral Practices — Pricing Disclosure and Consumer Rights',
 'Oregon requires funeral service practitioners to provide an itemized General Price List (GPL) to all persons inquiring about funeral arrangements. GPL must be offered before discussion of specific goods/services. Casket price list and outer burial container price list required if those items are offered. Consumers have the right to select individual goods/services; no package-only pricing permitted. Embalming may not be performed without prior authorization. Third-party merchandise accepted without penalty. Oregon Mortuary and Cemetery Board enforces.',
 'CONSUMER_PROTECTION', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 692.180; OAR 830-040; 16 CFR Part 453 (FTC Funeral Rule)', 'https://www.oregon.gov/omcb/Pages/index.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cons-013', 'OR-CONS-013', 'Health Spa Contracts — Cancellation and Refund Rights',
 'Health spa/gym contracts in Oregon must be in writing. Maximum contract term: 3 years. Consumer has 3-business-day unconditional cancellation right. After 3 days, consumer may cancel with 30-day written notice if: facility moves more than 5 miles, consumer moves 25+ miles away, or consumer becomes permanently disabled. Prepaid unused membership must be refunded within 30 days less reasonable administrative fee (max 10% or $100). Automatic renewal requires 30-day advance written notice. Facilities must maintain $50,000 surety bond.',
 'CONSUMER_PROTECTION', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 646A.030-646A.040', 'https://www.doj.state.or.us/consumer-protection/purchases-contracts/health-clubs/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cons-014', 'OR-CONS-014', 'Credit Services Organizations — Registration and Prohibited Practices',
 'Organizations that represent they can improve consumer credit records, obtain credit, or provide advice on credit must register with Oregon DOJ before conducting business. Registration fee: $1,000; $100,000 surety bond required. Prohibited: charging fees before services are fully performed; making false claims about ability to improve credit; advising consumers to make false statements to credit reporting agencies. Consumer has 5-business-day right to cancel. Written contract required disclosing all terms, total cost, and cancellation rights.',
 'CONSUMER_PROTECTION', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 646A.020-646A.028', 'https://www.doj.state.or.us/consumer-protection/credit-debt/credit-repair/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cons-015', 'OR-CONS-015', 'Charitable Solicitation Registration',
 'Charitable organizations soliciting contributions in Oregon must register with the Oregon DOJ Charitable Activities Section before soliciting. Annual registration; financial reporting on IRS Form 990 (or Oregon-specific form for unincorporated charities). Professional fundraisers and fund-raising counsel must register separately ($200 fee) and post $25,000 surety bond. Solicitations must disclose: organization name, purpose, and whether contributions are tax-deductible. Organizations receiving <$25,000/year from public sources may be exempt. Annual renewal by November 15.',
 'CONSUMER_PROTECTION', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 128.801-128.898', 'https://www.doj.state.or.us/charitable-activities/registering-a-charity/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cons-016', 'OR-CONS-016', 'Automatic Renewal and Continuous Service Offers',
 'Businesses offering automatic renewal or continuous service must clearly and conspicuously disclose the terms before the consumer agrees: the fact that the subscription will auto-renew, the cancellation policy, the recurring charges, and the length of the renewal term. Affirmative consent required. Must provide an easy-to-use cancellation mechanism (no harder than the method used to sign up). Must send reminder notice 15-45 days before renewal for contracts of 1 year or longer. Violations are unlawful trade practices under UTPA.',
 'CONSUMER_PROTECTION', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 646A.295', 'https://www.oregonlegislature.gov/bills_laws/ors/ors646A.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cons-017', 'OR-CONS-017', 'Data Breach Notification — Oregon Consumer Information Protection Act',
 'Any person that owns or licenses personal information of Oregon consumers must notify affected individuals within 45 days of discovering a breach of security. If breach affects 250+ Oregon consumers, must also notify Oregon DOJ. Notification must include: description of the incident, type of information compromised, contact information for the business, and recommended protective measures. Personal information includes: SSN, driver license, financial account numbers, health information, and biometric data. Substitute notice allowed if direct notice would cost >$250,000 or affect 350,000+ people.',
 'CONSUMER_PROTECTION', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 646A.600-646A.628', 'https://www.doj.state.or.us/consumer-protection/id-theft-data-breaches/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cons-018', 'OR-CONS-018', 'Identity Theft Protection — Security Freeze and Consumer Rights',
 'Oregon consumers have the right to place a security freeze on their credit report at no charge. Credit reporting agencies must place the freeze within 1 business day of electronic request (3 days for mail). Freeze must be temporarily lifted within 1 business day of request. Businesses must develop, implement, and maintain reasonable safeguards to protect personal information. Oregon Identity Theft Passport program through DOJ provides documentation for identity theft victims to present to law enforcement.',
 'CONSUMER_PROTECTION', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 646A.602-646A.628', 'https://www.doj.state.or.us/consumer-protection/id-theft-data-breaches/identity-theft-prevention/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cons-019', 'OR-CONS-019', 'Used Vehicle Warranty — Buyer Guide Requirements',
 'Oregon dealers selling used vehicles must post the FTC Buyers Guide on every used vehicle, disclosing whether the vehicle is sold "as is" or with a warranty. Oregon further requires dealers to disclose known material defects and whether the vehicle has been in a major accident. Odometer fraud is a Class C felony. Title branding required for salvage, rebuilt, flood-damaged, or lemon law buyback vehicles. Dealer must provide title history disclosure. Violations: UTPA penalties plus private action for damages.',
 'CONSUMER_PROTECTION', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 646A.090; ORS § 803.105 (title branding); 16 CFR Part 455', 'https://www.doj.state.or.us/consumer-protection/motor-vehicles/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cons-020', 'OR-CONS-020', 'Rent-to-Own Agreements — Consumer Protections',
 'Rent-to-own agreements (rental-purchase) are regulated under ORS 646A.700. Agreements must disclose: cash price of the property, total number and amount of payments, total cost if all payments made, and a clear statement that consumer does not own the property until all payments are made. Early purchase option must be offered. Merchant may not collect a security deposit. Property must be in good working condition. Excessive late fees prohibited. Consumer may reinstate agreement within specified periods after voluntary surrender.',
 'CONSUMER_PROTECTION', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 646A.700-646A.738', 'https://www.oregonlegislature.gov/bills_laws/ors/ors646A.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cons-021', 'OR-CONS-021', 'Motor Vehicle Dealer Licensing and Bond Requirements',
 'Motor vehicle dealers must hold a current Oregon DMV dealer certificate. Application requires: $50,000 surety bond, proof of business premises, liability insurance, and background check. Certificate renewed annually. Dealers must maintain records of all transactions for 5 years. Curbstoning (selling vehicles without a dealer license) is a Class A misdemeanor. Temporary permits limited to 20 vehicles per day. DMV may suspend or revoke for UTPA violations, bond deficiency, or failure to maintain premises.',
 'CONSUMER_PROTECTION', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 822.005-822.045; OAR 735-150', 'https://www.oregon.gov/odot/dmv/pages/dealer.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cons-022', 'OR-CONS-022', 'Predatory Lending Protections — High-Cost Home Loans',
 'Oregon regulates high-cost home loans (APR exceeds APOR by 6.5% for first lien, 8.5% for subordinate lien, or points/fees exceed 5% of total loan amount). Prohibited practices: balloon payments in first 7 years, negative amortization, prepayment penalties after 36 months, financing of credit insurance, lending without regard to ability to repay. Mandatory pre-loan counseling from HUD-approved counselor. Violations: loan is voidable, borrower may recover all amounts paid plus attorney fees.',
 'CONSUMER_PROTECTION', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 86A.198-86A.218', 'https://dfr.oregon.gov/consumer/mortgage', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cons-023', 'OR-CONS-023', 'Payday and Title Lending — Oregon Consumer Finance Protections',
 'Oregon caps payday loans at $50,000 with 36% annual interest rate cap (inclusive of all fees). Minimum loan term: 31 days. Maximum of 2 outstanding payday loans per borrower at any time. Title loans prohibited (Oregon does not authorize vehicle title lending). Lenders must verify borrower income and existing payday loan obligations via statewide database. 1-business-day right of rescission. Lenders must be licensed by Oregon DCBS. Database check fee: $5 max per loan. Violations: $10,000 civil penalty per occurrence.',
 'CONSUMER_PROTECTION', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 725A.010-725A.084', 'https://dfr.oregon.gov/consumer/payday', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cons-024', 'OR-CONS-024', 'Oregon Consumer Privacy Act (OCPA)',
 'Effective July 1, 2024, OCPA grants Oregon consumers the right to: know what personal data is collected, delete personal data, correct inaccuracies, data portability, and opt out of sale/targeted advertising/profiling. Applies to businesses controlling/processing data of 100,000+ Oregon consumers, or 25,000+ consumers if 25%+ revenue from data sales. 45-day response deadline. No private right of action; Oregon DOJ exclusive enforcement. 30-day cure period (expires January 1, 2026). Civil penalties up to $7,500 per violation.',
 'CONSUMER_PROTECTION', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-07-01', 'ORS § 646A.570-646A.589 (SB 619, 2023)', 'https://www.doj.state.or.us/consumer-protection/consumer-privacy/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cons-025', 'OR-CONS-025', 'Manufactured Dwelling Park Closure — Relocation Assistance',
 'When a manufactured dwelling park closes or converts to another use, the landlord must provide 365 days advance written notice to all tenants and the Office of Manufactured Dwelling Park Community Relations. Landlord must pay each household relocation assistance: $5,000 for a single-section home, $7,000 for a double-section home, and $9,000 for a triple-section home. If the home cannot be moved, landlord pays fair market value. Tenants have right to form a homeowners association and exercise right of first refusal for park purchase.',
 'CONSUMER_PROTECTION', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 90.645; ORS § 90.655; ORS § 90.842-90.850', 'https://www.oregon.gov/ohcs/compliance-and-education/Pages/manufactured-dwelling-park.aspx', 1);

-- ============================================================
-- HEALTHCARE (20 rules) — or-health-001 through or-health-020
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-health-001', 'OR-HEALTH-001', 'Oregon Health Authority — Healthcare Facility Licensing',
 'All hospitals, ambulatory surgical centers, freestanding birthing centers, long-term care facilities, residential care facilities, and outpatient renal dialysis facilities must be licensed by the Oregon Health Authority (OHA). License applications require demonstration of compliance with life safety, staffing, governance, and quality standards. Initial survey conducted before licensure. Surveys at least every 15 months thereafter. License non-transferable. Civil penalties up to $500/day for operating without a license. Emergency suspension authority for imminent danger.',
 'HEALTHCARE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 441.015-441.990; OAR 333-500 through 333-560', 'https://www.oregon.gov/oha/ph/providerpartnerresources/healthcareprovidersfacilities/Pages/index.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-health-002', 'OR-HEALTH-002', 'Coordinated Care Organizations — Medicaid Managed Care',
 'Oregon delivers Medicaid benefits through 16 regional Coordinated Care Organizations (CCOs). CCOs must provide physical, behavioral, and dental health services under a global budget with per-member-per-month capitation. CCOs must meet quality metrics tied to financial incentives: controlling diabetes (HbA1c testing), depression screening, childhood immunization rates, dental sealants, and emergency department utilization. Community Advisory Councils required. Spending on health-related services (housing, food security) encouraged. CCO contracts renewed every 5 years through competitive procurement.',
 'HEALTHCARE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 414.570-414.700; OAR 410-141', 'https://www.oregon.gov/oha/hsd/ohp/pages/coordinated-care-organizations.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-health-003', 'OR-HEALTH-003', 'Mental Health Parity — Coverage Equity Requirements',
 'Oregon requires health insurers to provide coverage for mental health and substance use disorders that is no more restrictive than coverage for medical/surgical conditions in terms of financial requirements (copays, deductibles, coinsurance, out-of-pocket limits), quantitative treatment limitations (visit limits, day limits), and non-quantitative treatment limitations (prior authorization, step therapy, network adequacy). Specific mandate: coverage for autism spectrum disorder treatment through age 25 with no annual or lifetime dollar limit. DCBS enforces through market conduct exams.',
 'HEALTHCARE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 743A.168; ORS § 743A.190 (autism); 42 USC § 18031(j)', 'https://dfr.oregon.gov/healthrates/parity', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-health-004', 'OR-HEALTH-004', 'Reproductive Health Equity Act — Comprehensive Coverage Mandate',
 'Oregon Reproductive Health Equity Act (2017) requires all insurance plans (including Medicaid) to cover reproductive health services with no cost-sharing: contraception (all FDA-approved methods), abortion, prenatal care, postpartum care, breast cancer screening, and STI screening and treatment. Applies to commercial insurance, CCOs, and state employee plans. Coverage must extend to individuals regardless of immigration status under the Oregon Health Plan. No religious or moral exemption for employers. State funds cover costs not paid by federal dollars.',
 'HEALTHCARE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 743A.067 (HB 3391, 2017)', 'https://www.oregon.gov/oha/ph/healthypeoplefamilies/reproductivesexualhealth/Pages/index.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-health-005', 'OR-HEALTH-005', 'Prescription Drug Price Transparency',
 'Oregon requires pharmaceutical manufacturers to report to DCBS when they increase the list price of a prescription drug by 10% or more within a 12-month period, or when a new specialty drug is introduced at a wholesale acquisition cost exceeding $670/month. Reports must include: justification for the increase, R&D costs, marketing costs, net profit, and factors contributing to the pricing decision. Reports due 30 days before the effective date of the increase. DCBS publishes an annual report on drug pricing trends. Civil penalty up to $10,000/day for failure to report.',
 'HEALTHCARE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 646A.689 (HB 4005, 2018)', 'https://dfr.oregon.gov/drugtransparency', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-health-006', 'OR-HEALTH-006', 'Surprise Billing Protections — Out-of-Network Emergency and Ancillary Care',
 'Oregon law prohibits balance billing (surprise billing) for emergency services at out-of-network facilities, and for ancillary services (anesthesiology, pathology, radiology, neonatology, and assistant surgeons) at in-network facilities provided by out-of-network providers. Patient responsible only for in-network cost-sharing amounts. Disputes between insurer and provider resolved through baseball-style arbitration (each party submits a final offer, arbitrator selects one). Arbitration filing fee: $500 (split between parties). Applies to commercial insurance; does not preempt ERISA self-funded plans.',
 'HEALTHCARE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 743B.287; ORS § 743B.288', 'https://dfr.oregon.gov/consumers/health/surprise-billing', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-health-007', 'OR-HEALTH-007', 'Telehealth Parity — Coverage and Reimbursement',
 'Oregon requires health insurers to cover telehealth services (audio-visual and audio-only) on the same basis as in-person services with no additional restrictions on location, provider type, or technology platform beyond what is clinically appropriate. Reimbursement must be at rates no less than in-person equivalent. No facility fee for telehealth originating sites. Patients may receive telehealth from their home. Audio-only telephone visits covered for behavioral health and chronic disease management. CCOs must include telehealth in provider networks. Applies to commercial and Medicaid plans.',
 'HEALTHCARE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 743A.058; OAR 410-141-3566 (Medicaid)', 'https://www.oregon.gov/oha/hsd/ohp/pages/telehealth.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-health-008', 'OR-HEALTH-008', 'Healthcare Interpreter Requirements',
 'Healthcare facilities receiving state funds or serving Medicaid patients must provide qualified or certified healthcare interpreters at no cost to the patient. Oregon Health Authority maintains a registry of qualified interpreters. Interpreters must pass written and oral proficiency exams (OHA certification) or hold national certification (NBCMI or CCHI). Minimum 60 hours of healthcare interpreter training. Telephone interpreting acceptable when in-person not available. Reimbursement for Medicaid interpretation services at established rates. Failure to provide: potential Title VI violation and OHA sanctions.',
 'HEALTHCARE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 413.550-413.558; OAR 410-141-3515; OAR 333-002', 'https://www.oregon.gov/oha/oei/Pages/hci-program.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-health-009', 'OR-HEALTH-009', 'Advance Directives and POLST — Physician Orders for Life-Sustaining Treatment',
 'Oregon pioneered the POLST form (Physician Orders for Life-Sustaining Treatment), a medical order signed by a healthcare professional that documents patient preferences for CPR, medical interventions, antibiotics, and nutrition. POLST is valid across all healthcare settings and must be honored by EMS and facilities. Distinct from advance directives (living wills and healthcare power of attorney under ORS 127). Healthcare facilities must ask about and document advance directives at admission. POLST registry maintained by OHA for electronic access by authorized providers.',
 'HEALTHCARE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 127.505-127.660 (advance directives); ORS § 127.663-127.684 (POLST)', 'https://www.oregon.gov/oha/ph/providerpartnerresources/emstraumasystems/pages/polst.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-health-010', 'OR-HEALTH-010', 'Informed Consent — Patient Authorization Requirements',
 'Oregon requires informed consent before any medical procedure, treatment, or surgery. The healthcare provider must disclose: the nature of the proposed procedure, the risks and benefits, alternative treatments and their risks, and the consequences of refusing treatment. Consent must be voluntary and given by a competent adult (or legal guardian for minors). Written consent required for surgical procedures. For procedures with significant risk, documentation must specifically list material risks. Failure to obtain informed consent: grounds for medical negligence action under ORS 677.097.',
 'HEALTHCARE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 677.097; OAR 847-010-0100', 'https://www.oregonlegislature.gov/bills_laws/ors/ors677.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-health-011', 'OR-HEALTH-011', 'Patient Access to Medical Records',
 'Under Oregon law, patients have the right to inspect and obtain copies of their medical records within 30 days of a written request (consistent with HIPAA). Providers may charge a reasonable cost-based fee: no more than $0.25/page for paper copies. Electronic copies must be provided in the format requested if readily producible. Providers may not withhold records due to unpaid medical bills. Mental health records: 5 additional working days allowed for review before release. Summary of records must be provided if requested. Denial of access may be appealed to OHA.',
 'HEALTHCARE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 192.553-192.581; 45 CFR § 164.524', 'https://www.oregonlegislature.gov/bills_laws/ors/ors192.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-health-012', 'OR-HEALTH-012', 'Healthcare Facility Seismic Requirements',
 'Oregon requires hospitals to meet seismic safety standards. SB 784 (2001) mandated that all Oregon hospitals evaluate structural vulnerability and develop plans to meet ASCE 41 "Immediate Occupancy" performance level for acute care areas and "Life Safety" for non-acute areas. Phase 1 (high-risk evaluation) completed by 2007. Hospitals must achieve at least "Life Safety" performance by 2032 for buildings not meeting minimum standards. OHA tracks compliance. Estimated statewide cost: $1-2 billion. Noncompliant facilities must disclose seismic risk to patients.',
 'HEALTHCARE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 455.400; SB 784 (2001); OAR 333-535', 'https://www.oregon.gov/oha/ph/providerpartnerresources/healthcareprovidersfacilities/pages/hospital-seismic.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-health-013', 'OR-HEALTH-013', 'Nurse Staffing — Minimum Standards and Committee Requirements',
 'Oregon HB 2800 (2023) established minimum nurse-to-patient staffing ratios: medical/surgical 1:4, step-down/intermediate care 1:3, ICU/critical care 1:2, emergency department 1:4, labor and delivery 1:2, postpartum 1:5 (mother-baby couplets 1:3). Hospitals must establish a hospital nurse staffing committee (at least 50% direct-care RNs) to develop staffing plans. Hospitals must post current staffing levels publicly. OHA may impose civil penalties up to $10,000 per violation for staffing below minimums. Mandatory overtime for nurses prohibited except during declared emergencies.',
 'HEALTHCARE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 441.152-441.177; HB 2800 (2023); OAR 333-510', 'https://www.oregon.gov/oha/ph/providerpartnerresources/healthcareprovidersfacilities/pages/nurse-staffing.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-health-014', 'OR-HEALTH-014', 'Pharmacy Benefit Manager Regulation',
 'Oregon regulates Pharmacy Benefit Managers (PBMs) under DCBS oversight. PBMs must register with the state. Prohibited practices: claw-back provisions (charging pharmacies retroactively), spread pricing without disclosure, and gag clauses preventing pharmacists from informing patients of lower-cost alternatives. PBMs must pass through at least 85% of manufacturer rebates to insurers/plan sponsors (or demonstrate equivalent cost savings). Annual reporting of aggregate rebate data to DCBS. Maximum allowable cost (MAC) appeals process required for pharmacies. Civil penalties up to $5,000 per violation.',
 'HEALTHCARE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 735.530-735.538; HB 2185 (2021)', 'https://dfr.oregon.gov/business/reg/pbm', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-health-015', 'OR-HEALTH-015', 'Oregon Death with Dignity Act',
 'Oregon pioneered physician-assisted death (1997). Terminally ill Oregon residents with 6 months or less to live may request a prescription for life-ending medication. Requirements: patient must be 18+, Oregon resident, competent, diagnosed by 2 physicians, make 2 oral requests (15 days apart) and 1 written request (2 witnesses), and be informed of alternatives (palliative care, hospice). Attending physician must refer to consulting physician. 48-hour waiting period after written request before prescription. OHA publishes annual statistical report. ~370 prescriptions written annually.',
 'HEALTHCARE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 127.800-127.897', 'https://www.oregon.gov/oha/ph/providerpartnerresources/evaluationresearch/deathwithdignityact/pages/index.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-health-016', 'OR-HEALTH-016', 'Mental Health and Substance Use Disorder Treatment — Patient Rights',
 'Patients receiving mental health or substance use disorder treatment in Oregon facilities have specific rights: refuse treatment (except emergency holds), participate in treatment planning, access to advocacy services (Oregon Disability Rights), communicate freely with legal counsel and Disability Rights Oregon, protection from unnecessary restraint/seclusion (restraint limited to emergencies, maximum 4 hours per episode, physician review within 1 hour). Facilities must post patient rights. OHA investigates complaints. Civil commitment requires judicial review within 5 judicial days.',
 'HEALTHCARE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 426.005-426.395 (civil commitment); ORS § 430.210-430.306 (patient rights)', 'https://www.oregon.gov/oha/hsd/amh/pages/index.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-health-017', 'OR-HEALTH-017', 'Healthcare Workforce — Provider Licensing and Reciprocity',
 'Oregon Health Licensing Office (under OHA) and Oregon Medical Board license all healthcare providers. Physicians: Oregon Medical Board license required, 75 CME hours per 3-year cycle. Nurses: Oregon State Board of Nursing, compact state member (eNLC effective July 2024) allowing compact license holders to practice. Physician Assistants: collaborative agreement no longer required (HB 3036, 2021) — PAs practice with established competencies. Psychologists: 1,500 supervised hours post-doctoral. Pharmacists: 1,500 intern hours. Background check required for all health profession applicants.',
 'HEALTHCARE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 677.010-677.990 (medical); ORS § 678.010-678.445 (nursing); ORS § 689.005-689.995 (pharmacy)', 'https://www.oregon.gov/oha/ph/hlp/pages/index.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-health-018', 'OR-HEALTH-018', 'Hospital Community Benefit and Financial Assistance',
 'Oregon nonprofit hospitals must adopt and publicize a financial assistance policy (charity care). Under HB 3076 (2019), hospitals must screen uninsured patients for Oregon Health Plan eligibility and financial assistance before pursuing debt collection. Hospitals must provide at least 60 days notice before sending accounts to collections. Write-off required for patients below 200% federal poverty level. Sliding scale for patients at 200-400% FPL. Annual community benefit report filed with OHA including charity care, community health improvement, and health professions education spending.',
 'HEALTHCARE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 442.360-442.372; HB 3076 (2019)', 'https://www.oregon.gov/oha/hpa/analytics/pages/hospital-reporting.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-health-019', 'OR-HEALTH-019', 'Healthcare Cost Growth Target — State Benchmark Program',
 'Oregon established a statewide healthcare cost growth target: growth in total healthcare spending per capita may not exceed 3.4% per year (2021-2025), declining to 3.0% (2026-2030). Applies to payers (commercial insurers, CCOs, Medicare Advantage, PBMs) and large provider organizations. Cost Growth Target Program under OHA analyzes spending data, identifies entities exceeding targets, and may require performance improvement plans. Public reporting of entity-level cost data. No direct financial penalties initially; accountability through transparency and technical assistance. Annual reports to legislature.',
 'HEALTHCARE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 442.386; HB 2010 (2019); OAR 409-065', 'https://www.oregon.gov/oha/hpa/hp/pages/sustainable-health-care-cost-growth-target.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-health-020', 'OR-HEALTH-020', 'Health Information Exchange — Privacy and Consent',
 'Oregon Health Information Technology Program facilitates health information exchange (HIE) through Oregon Connects. Patient consent model: opt-out (patients may choose to restrict access). Providers accessing HIE must have treatment relationship with patient. Data sharing governed by OHA-approved policies addressing authentication, audit logging, breach notification, and minimum necessary standard. Behavioral health records require specific patient authorization per 42 CFR Part 2 (substance use disorder). All HIE participants must execute data use agreements. Annual privacy/security assessments required.',
 'HEALTHCARE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 413.300-413.310; OAR 943-120; 42 CFR Part 2', 'https://www.oregon.gov/oha/hpa/ohit/pages/index.aspx', 1);

-- ============================================================
-- REAL ESTATE & HOUSING (15 rules) — or-real-001 through or-real-015
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-real-001', 'OR-REAL-001', 'Oregon Fair Housing Act — Protected Classes and Prohibited Discrimination',
 'Oregon Fair Housing Act extends federal Fair Housing Act with additional protected classes: marital status, familial status, source of income, sexual orientation, gender identity, and domestic violence survivor status (in addition to federal protections for race, color, national origin, religion, sex, disability, and familial status). Applies to sale, rental, financing, advertising, and provision of housing services. Oregon Bureau of Labor and Industries (BOLI) investigates complaints. Administrative penalties up to $100,000 for pattern/practice discrimination. 1-year filing deadline.',
 'REAL_ESTATE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 659A.421-659A.450; OAR 839-005-0100 through 839-005-0200', 'https://www.oregon.gov/boli/civil-rights/Pages/housing.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-real-002', 'OR-REAL-002', 'Rent Stabilization — Annual Increase Cap (SB 608)',
 'Oregon became the first state to enact statewide rent stabilization (SB 608, 2019). Annual rent increases capped at 7% plus the Consumer Price Index (CPI) for West Region, or 10%, whichever is lower. Exemptions: buildings less than 15 years old, government-subsidized housing, and the first tenancy after voluntary vacancy. Landlords must provide 90-day written notice for any rent increase. No cap on initial rent amount for new tenancies. Violations: tenant may recover 3 months rent plus actual damages. BOLI enforcement. No local rent control ordinances permitted.',
 'REAL_ESTATE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 90.323 (SB 608, 2019)', 'https://www.oregonlegislature.gov/bills_laws/ors/ors090.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-real-003', 'OR-REAL-003', 'Just Cause Eviction Requirements',
 'After the first year of occupancy, landlords may only terminate a month-to-month tenancy for cause. Qualifying causes: nonpayment of rent (10-day notice to pay or vacate, increased to 13 days for late rent after grace period), material lease violation (30-day notice with 14-day cure period), criminal activity on premises, owner move-in (90-day notice), demolition/renovation (120-day notice with relocation payment), or sale of property to buyer who intends to occupy (90-day notice). Landlord-cause terminations (owner move-in, demolition, sale) require payment of 1 month rent as relocation assistance.',
 'REAL_ESTATE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 90.427; ORS § 90.392 (SB 608, 2019)', 'https://www.oregonlegislature.gov/bills_laws/ors/ors090.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-real-004', 'OR-REAL-004', 'Residential Landlord-Tenant Act — Core Obligations',
 'Oregon Landlord-Tenant Act (ORS Chapter 90) governs all residential tenancies. Landlord obligations: maintain premises in habitable condition, comply with building/housing codes, keep common areas safe and clean, maintain plumbing/heating/electrical in good working order, provide running water and reasonable heat. Tenant obligations: keep premises clean and safe, use facilities reasonably, dispose of garbage properly, not deliberately or negligently damage premises. Lease must disclose: landlord name and address, security deposit terms, and designated agent for service.',
 'REAL_ESTATE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 90.100-90.465', 'https://www.oregonlegislature.gov/bills_laws/ors/ors090.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-real-005', 'OR-REAL-005', 'Security Deposit Limits and Return Requirements',
 'Oregon does not cap security deposit amounts (no statutory maximum), but deposits must be reasonable in relation to the rental agreement. Landlord must provide a written accounting of any deductions within 31 days of tenancy termination and return of possession. Refund of unused portion due within 31 days. If landlord fails to provide accounting or refund within 31 days, tenant may recover twice the amount wrongfully withheld. Prepaid rent is not a security deposit. Landlord must keep deposits in a trust account or post a surety bond. Non-refundable fees must be clearly labeled.',
 'REAL_ESTATE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 90.300; ORS § 90.302', 'https://www.oregonlegislature.gov/bills_laws/ors/ors090.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-real-006', 'OR-REAL-006', 'Rental Application Screening — Fee Limits and Criteria Disclosure',
 'Landlords may charge a screening fee not exceeding the actual average cost of screening applicants (currently approximately $50-75). Before accepting the fee, landlord must provide written screening criteria including: minimum income, credit history requirements, criminal history standards, rental history requirements, and any other factors. Applicant must be informed of right to dispute screening results. Landlord may not consider criminal history for arrest without conviction, juvenile records, or expunged records. Low-barrier screening criteria encouraged for government-subsidized units. Excess fees must be refunded.',
 'REAL_ESTATE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 90.295; ORS § 90.303', 'https://www.oregonlegislature.gov/bills_laws/ors/ors090.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-real-007', 'OR-REAL-007', 'Habitability Standards — Implied Warranty of Habitability',
 'Every residential rental in Oregon carries an implied warranty of habitability. Minimum standards include: weatherproof exterior, functioning plumbing (hot and cold running water), adequate heating (capable of maintaining 68°F), working electrical systems, working smoke and carbon monoxide detectors, locks on exterior doors, absence of pest infestation, and compliance with applicable building and housing codes. Tenant remedy for breach: repair-and-deduct (up to $300 or one month rent), rent escrow through court, or termination with 30-day notice after landlord fails to repair within 7 days of notice.',
 'REAL_ESTATE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 90.320; ORS § 90.365; ORS § 90.368', 'https://www.oregonlegislature.gov/bills_laws/ors/ors090.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-real-008', 'OR-REAL-008', 'Lead Paint Disclosure — Pre-1978 Properties',
 'Sellers and landlords of residential properties built before 1978 must disclose known lead-based paint hazards and provide the EPA pamphlet "Protect Your Family From Lead in Your Home." Buyers have a 10-day opportunity to conduct a lead inspection (can be waived). Seller must disclose any known lead-based paint or lead-based paint hazards, and provide available records/reports. Oregon-specific: OHA maintains a lead-poisoned children registry and investigates homes of children with blood lead levels ≥3.5 μg/dL (lowered from 5 μg/dL in 2021). Penalties: up to $19,507 per violation (federal, adjusted for inflation).',
 'REAL_ESTATE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 431A.255; 42 USC § 4852d; 24 CFR Part 35; 40 CFR Part 745', 'https://www.oregon.gov/oha/ph/healthyenvironments/leadpoisoning/pages/index.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-real-009', 'OR-REAL-009', 'Mold Disclosure — Landlord and Seller Obligations',
 'Oregon requires landlords to disclose known mold conditions that may pose a health risk. Sellers must disclose known material defects including mold contamination on the Oregon Residential Property Disclosure Statement. Landlords must respond to tenant mold complaints within a reasonable time and remediate if the mold results from a maintenance failure (e.g., roof leak, plumbing leak). No specific Oregon mold standards for residential properties, but OHA recommends indoor mold levels not exceed outdoor levels. Tenant cannot withhold rent for mold caused by tenant behavior (e.g., inadequate ventilation).',
 'REAL_ESTATE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 105.464 (seller disclosure); ORS § 90.320 (landlord habitability)', 'https://www.oregonlegislature.gov/bills_laws/ors/ors105.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-real-010', 'OR-REAL-010', 'Home Energy Score — Mandatory Disclosure for Portland Home Sales',
 'City of Portland requires a Home Energy Score for all single-family homes listed for sale (effective January 1, 2018). Sellers must obtain a score from a DOE-certified assessor before listing. Score (1-10 scale) disclosed on listing and provided to buyer with estimated energy costs and recommended improvements. Cost: approximately $150-250 per assessment. State of Oregon: voluntary Home Energy Scoring program through Energy Trust of Oregon. Oregon Building Codes Division considering statewide energy scoring requirements for commercial and multifamily properties.',
 'REAL_ESTATE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'Portland City Code 17.108; Oregon SB 327 (2013) (voluntary state program)', 'https://www.portland.gov/bps/home-energy-score', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-real-011', 'OR-REAL-011', 'Source of Income Discrimination Protection',
 'Oregon prohibits landlords from discriminating against applicants or tenants based on source of income, including Section 8 Housing Choice Vouchers, Social Security, disability benefits, child support, veterans benefits, and any other lawful source of income. Landlords must evaluate applicants using the same criteria regardless of income source. Landlord may still verify that total income meets reasonable income-to-rent ratio. Exemptions: owner-occupied buildings with 4 or fewer units. Violations: BOLI complaint (1 year deadline) with compensatory and punitive damages available. Private right of action also available.',
 'REAL_ESTATE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 659A.421(2)(h); SB 291 (2013)', 'https://www.oregon.gov/boli/civil-rights/Pages/housing.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-real-012', 'OR-REAL-012', 'Domestic Violence Tenant Protections',
 'Tenants who are victims of domestic violence, sexual assault, or stalking have specific protections. Tenant may terminate lease with 14-day written notice and documentation (protective order, police report, or written statement from qualified third party). Landlord may not penalize or evict based on DV incidents on the premises. Tenant may request lock change at own expense; landlord must comply within 24 hours. Perpetrator may be removed from lease. Lease termination under this section: no early termination penalty; tenant liable for rent only through date of termination plus 14 days.',
 'REAL_ESTATE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 90.449; ORS § 90.453; ORS § 90.456; ORS § 90.459', 'https://www.oregonlegislature.gov/bills_laws/ors/ors090.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-real-013', 'OR-REAL-013', 'Manufactured Dwelling Park Tenant Rights and Purchase Opportunities',
 'Manufactured dwelling park tenants have extensive rights under ORS 90.505-90.875. Rent increases: 90-day written notice, once per 12-month period, must itemize capital improvements separately. Landlord may not prohibit "For Sale" signs on homes. Tenant may sell home in place; buyer has right to tenancy if they meet reasonable screening criteria. If park is offered for sale, tenant association or nonprofit has 14-day right to match any bona fide offer. Park rules must be reasonable and uniformly enforced. Landlord must maintain roads, water, sewer, and common areas in safe condition.',
 'REAL_ESTATE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 90.505-90.875; ORS § 90.842-90.850 (opportunity to purchase)', 'https://www.oregon.gov/ohcs/compliance-and-education/pages/manufactured-dwelling-park.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-real-014', 'OR-REAL-014', 'Short-Term Rental Regulation — State Framework and Local Authority',
 'Oregon authorizes local governments to regulate short-term rentals (STRs) within their jurisdictions. Portland: STR operator license required ($178/year), 2% Multnomah County lodging tax + 6% Portland transient lodging tax + state lodging tax. Operator must be primary resident for Type A (hosted) rentals; Type B (unhosted) limited by permit caps per neighborhood. Fire and safety inspections required. Other cities (Bend, Ashland, Hood River) have various cap, licensing, and zoning requirements. State transient lodging tax: 1.8%. Platforms must collect/remit taxes.',
 'REAL_ESTATE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 320.300-320.365 (transient lodging tax); Portland City Code 33.207', 'https://www.portland.gov/revenue/str-tax', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-real-015', 'OR-REAL-015', 'Property Seller Disclosure — Residential Property Disclosure Statement',
 'Oregon sellers of residential property (1-4 units) must provide a completed Seller Property Disclosure Statement to buyer before acceptance of an offer. Disclosure covers: structural conditions, water/sewer, insulation, environmental hazards (lead, asbestos, radon, underground storage tanks), neighborhood conditions (noise, zoning, HOA), and any known material defects. Seller signs under penalty of ORS 646.608 (UTPA). Buyer has 5 business days after receipt to revoke the offer. Exemptions: foreclosure sales, court-ordered sales, first sale of new construction. Nondisclosure: buyer may recover damages and attorney fees.',
 'REAL_ESTATE', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 105.464-105.490', 'https://www.oregonlegislature.gov/bills_laws/ors/ors105.html', 1);

-- ============================================================
-- CANNABIS (10 rules) — or-cann-001 through or-cann-010
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cann-001', 'OR-CANN-001', 'OLCC Marijuana Licensing — Producer, Processor, Wholesaler, Retailer',
 'Oregon Liquor and Cannabis Commission (OLCC) issues four license types: Producer (indoor/outdoor/mixed, micro tier ≤5,000 sq ft canopy or standard), Processor, Wholesaler, and Retailer. Application fee: $250 (micro) to $4,750 (standard producer). Annual license renewal: $1,000 (micro) to $5,750 (standard producer/retailer). All applicants must pass background checks (no felony convictions within past 5 years for producers/processors, 3 years for retailers). Premises must comply with local land use requirements. License non-transferable; change of ownership requires new application.',
 'CANNABIS', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 475C.005-475C.989; OAR 845-025-1000 through 845-025-8590', 'https://www.oregon.gov/olcc/marijuana/pages/default.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cann-002', 'OR-CANN-002', 'METRC — Mandatory Seed-to-Sale Tracking System',
 'All OLCC licensees must use the Marijuana Enforcement Tracking Reporting Compliance (METRC) system to track all marijuana items from seed/immature plant through harvest, processing, transfer, and sale. Each plant receives a unique RFID tag. Inventory reconciliation required monthly; discrepancies exceeding 3% of inventory value must be reported to OLCC within 72 hours. METRC entries must be made within 24 hours of the tracked event. System access: $40/month per license. OLCC inspectors conduct unannounced audits reconciling physical inventory against METRC records. Discrepancies may result in license suspension.',
 'CANNABIS', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 475C.097; OAR 845-025-7500 through 845-025-7590', 'https://www.oregon.gov/olcc/marijuana/pages/metrc.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cann-003', 'OR-CANN-003', 'Cannabis Testing Requirements — Mandatory Laboratory Analysis',
 'All marijuana items must pass testing by an ORELAP-accredited laboratory before retail sale. Required tests: potency (THC/CBD/CBN), pesticides (59 analytes), heavy metals (arsenic, cadmium, lead, mercury), residual solvents, microbials (total yeast/mold, E. coli, Salmonella), mycotoxins (aflatoxins and ochratoxin A), moisture content, and water activity. Batch sampling protocols: 1 sample per 15 lbs of flower, 1 per batch of concentrates/edibles. Failed batches may be remediated and retested (except pesticide/heavy metal failures, which require destruction). Labs must report results to METRC within 2 business days.',
 'CANNABIS', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 475C.544-475C.548; OAR 845-025-5000 through 845-025-5800', 'https://www.oregon.gov/olcc/marijuana/pages/testing.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cann-004', 'OR-CANN-004', 'Cannabis Packaging and Labeling Requirements',
 'All marijuana items sold at retail must be in child-resistant, opaque, resealable packaging. Labels must include: licensee information, harvest/process date, batch/lot number, net weight, potency results (THC and CBD in mg and percentage), universal marijuana symbol, required warnings ("For use only by adults 21+" and health warnings), and ingredients list for edibles. Edibles: maximum 50mg THC per package for recreational (5mg per serving). No packaging that appeals to minors (cartoon characters, candy-like appearance). Labels must be legible (minimum 8-point font). METRC tag number required.',
 'CANNABIS', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 475C.525; OAR 845-025-7000 through 845-025-7180', 'https://www.oregon.gov/olcc/marijuana/pages/packaging-labeling.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cann-005', 'OR-CANN-005', 'Cannabis Advertising Restrictions',
 'OLCC-licensed marijuana businesses face strict advertising restrictions. Prohibited: advertising on TV, radio, billboards, or print media unless the advertiser can demonstrate that 70%+ of the audience is 21+. No advertising within 1,000 feet of schools, playgrounds, or recreation centers. No false or misleading health/medical claims. No testimonials from celebrities or athletes. No depictions of minors. All advertising must include the universal marijuana symbol and "Do not operate a vehicle or machinery under the influence of marijuana." Website age-gate (21+) required. Social media: OLCC guidance permits if platform allows.',
 'CANNABIS', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 475C.505-475C.513; OAR 845-025-8000 through 845-025-8080', 'https://www.oregon.gov/olcc/marijuana/pages/advertising.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cann-006', 'OR-CANN-006', 'Local Government Opt-Out and Opt-In Provisions',
 'Oregon law allows cities and counties to prohibit licensed marijuana businesses through local ordinance or ballot measure. As of 2024, approximately 75% of Oregon counties have opted out of retail sales. Local governments that allow marijuana businesses may impose an additional local tax of up to 3% on retail sales. Local land use and zoning requirements apply in addition to state licensing. Voters in opted-out jurisdictions may reverse the ban by ballot measure at any general election. Local governments may also adopt time, place, and manner regulations more restrictive than state law.',
 'CANNABIS', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 475C.816-475C.824; ORS § 475C.836', 'https://www.oregon.gov/olcc/marijuana/pages/local-government.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cann-007', 'OR-CANN-007', 'Cannabis Social Equity Program',
 'Oregon HB 4016 (2022) established a Social Equity in Cannabis program. Eligible applicants: individuals from communities disproportionately impacted by marijuana prohibition (zip codes with high arrest rates), individuals with prior marijuana convictions, and veterans. Benefits: reduced licensing fees (50-75% reduction), priority application processing, technical assistance, and access to social equity fund grants (up to $25,000). Fund supported by 10% of marijuana tax revenues. OLCC administers. Requires applicants to be Oregon residents for 2+ years. Program goals: 15% of new licenses to social equity applicants by 2027.',
 'CANNABIS', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 475C.726-475C.756; HB 4016 (2022)', 'https://www.oregon.gov/olcc/marijuana/pages/social-equity.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cann-008', 'OR-CANN-008', 'Interstate Cannabis Commerce — Oregon Framework for Federal Authorization',
 'Oregon SB 582 (2019) authorized the governor to enter into agreements with other states for interstate marijuana commerce, contingent on federal authorization. OLCC may adopt rules for interstate transfers including: tracking integration with other state systems, testing reciprocity agreements, tax collection protocols, and product safety harmonization. As of 2024, no interstate commerce has occurred due to continued federal Schedule I classification. OLCC has drafted preliminary framework rules. If federal law changes, Oregon positioned as first mover. Interstate transport would require federal DOT compliance for commercial vehicles.',
 'CANNABIS', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 475C.800-475C.810; SB 582 (2019)', 'https://www.oregonlegislature.gov/bills_laws/ors/ors475C.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cann-009', 'OR-CANN-009', 'Marijuana Tax Structure — 17% State Tax Plus Local Option',
 'Oregon imposes a 17% retail marijuana tax on the sale of recreational marijuana items at the point of sale. Tax collected by retailers and remitted to the Oregon Department of Revenue quarterly. Revenue distribution: 40% to Common School Fund, 20% to mental health/alcoholism/drug services, 15% to Oregon State Police, 10% to cities (pro rata by licensed retailers), 10% to counties, and 5% to Oregon Health Authority for alcohol/drug abuse prevention. Local governments may impose additional tax up to 3%. Medical marijuana cardholders exempt from state tax. Annual revenue: approximately $180 million.',
 'CANNABIS', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 475C.700-475C.710; ORS § 475C.836 (local tax)', 'https://www.oregon.gov/dor/programs/businesses/pages/marijuana.aspx', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('or-cann-010', 'OR-CANN-010', 'Cannabis Worker Safety — Pesticide Exposure and Ergonomic Hazards',
 'Oregon OSHA applies general duty clause and specific standards to cannabis workplaces. Employers must develop Hazard Communication programs (GHS-aligned SDSs) for all chemicals used. Pesticide applicators must hold ODA pesticide applicator license; only Oregon-approved pesticides may be used on cannabis (list maintained by ODA). Worker Protection Standard (WPS) applies: 24-hour restricted entry intervals after application, PPE requirements, decontamination supplies. Ergonomic hazards from trimming: employers should implement rotation schedules, ergonomic tools, and rest breaks. Heat illness prevention required for outdoor grow operations (OAR 437-002-0156).',
 'CANNABIS', 'STATE', 'OR',
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 '2024-01-01', 'ORS § 654.001-654.991 (OR-OSHA); OAR 437-002; ORS § 634.006 (pesticides)', 'https://osha.oregon.gov/Pages/index.aspx', 1);

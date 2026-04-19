-- Maine State Compliance Rules
-- Source: Maine Revised Statutes Annotated (MRSA)
-- All entity types unless otherwise specified

-- ============================================================
-- FORMATION (20 rules) - MRSA Title 13-C, 13-B, 31
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-form-001', 'ME-FORM-001', 'Articles of Incorporation Filing', 'Domestic business corporations must file articles of incorporation with the Maine Secretary of State pursuant to MRSA Title 13-C §202. Articles must include corporate name, number of authorized shares, registered agent, and incorporator information.', 'FORMATION', 'STATE', 'ME', '["CORPORATION","S_CORP"]', '2024-01-01', 'MRSA Title 13-C §202', 'https://legislature.maine.gov/statutes/13-C/title13-Csec202.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-form-002', 'ME-FORM-002', 'LLC Certificate of Formation', 'Limited liability companies must file a certificate of formation with the Secretary of State under MRSA Title 31 §1531. Filing fee is $175. Certificate must designate registered agent with Maine address.', 'FORMATION', 'STATE', 'ME', '["LLC"]', '2024-01-01', 'MRSA Title 31 §1531', 'https://legislature.maine.gov/statutes/31/title31sec1531.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-form-003', 'ME-FORM-003', 'Annual Report Filing', 'All Maine business entities must file an annual report with the Secretary of State by June 1 each year. Filing fee is $85 for domestic entities and $150 for foreign entities. Late filing incurs $50 penalty per MRSA Title 13-C §1621.', 'FORMATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 13-C §1621', 'https://legislature.maine.gov/statutes/13-C/title13-Csec1621.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-form-004', 'ME-FORM-004', 'Registered Agent Requirement', 'Every Maine entity must continuously maintain a registered agent with a physical street address in Maine pursuant to MRSA Title 5 §105. Agent may be an individual resident or authorized business entity.', 'FORMATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 5 §105', 'https://legislature.maine.gov/statutes/5/title5sec105.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-form-005', 'ME-FORM-005', 'Corporate Name Reservation', 'Business names may be reserved for 120 days by filing application with Secretary of State per MRSA Title 13-C §402. Name must be distinguishable from existing entities and contain corporate identifier.', 'FORMATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","NONPROFIT"]', '2024-01-01', 'MRSA Title 13-C §402', 'https://legislature.maine.gov/statutes/13-C/title13-Csec402.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-form-006', 'ME-FORM-006', 'Trade Name (DBA) Registration', 'Persons conducting business under an assumed name must file a certificate with the municipal clerk where business is conducted pursuant to MRSA Title 31 §2. Filing protects exclusive use within municipality.', 'FORMATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'MRSA Title 31 §2', 'https://legislature.maine.gov/statutes/31/title31sec2.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-form-007', 'ME-FORM-007', 'Foreign Entity Authority to Transact Business', 'Foreign corporations transacting business in Maine must obtain certificate of authority from Secretary of State per MRSA Title 13-C §1501. Application fee is $250. Penalty for unauthorized transaction is $500/year.', 'FORMATION', 'STATE', 'ME', '["CORPORATION","S_CORP"]', '2024-01-01', 'MRSA Title 13-C §1501', 'https://legislature.maine.gov/statutes/13-C/title13-Csec1501.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-form-008', 'ME-FORM-008', 'Foreign LLC Registration', 'Foreign limited liability companies must register with Secretary of State before transacting business in Maine pursuant to MRSA Title 31 §1621. Filing fee is $250.', 'FORMATION', 'STATE', 'ME', '["LLC"]', '2024-01-01', 'MRSA Title 31 §1621', 'https://legislature.maine.gov/statutes/31/title31sec1621.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-form-009', 'ME-FORM-009', 'Benefit Corporation Election', 'Maine recognizes benefit corporations under MRSA Title 13-C Chapter 18. Articles must state purpose includes creating general public benefit. Annual benefit report required and must be posted publicly.', 'FORMATION', 'STATE', 'ME', '["CORPORATION"]', '2024-01-01', 'MRSA Title 13-C §1802', 'https://legislature.maine.gov/statutes/13-C/title13-Csec1802.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-form-010', 'ME-FORM-010', 'Nonprofit Corporation Formation', 'Nonprofit corporations are formed under MRSA Title 13-B §401. Articles must specify whether public benefit, mutual benefit, or religious. Filing fee is $40.', 'FORMATION', 'STATE', 'ME', '["NONPROFIT"]', '2024-01-01', 'MRSA Title 13-B §401', 'https://legislature.maine.gov/statutes/13-B/title13-Bsec401.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-form-011', 'ME-FORM-011', 'General Partnership Statement of Authority', 'General partnerships may file statement of partnership authority with Secretary of State under MRSA Title 31 §1023. Filing provides constructive notice of partner authority.', 'FORMATION', 'STATE', 'ME', '["PARTNERSHIP"]', '2024-01-01', 'MRSA Title 31 §1023', 'https://legislature.maine.gov/statutes/31/title31sec1023.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-form-012', 'ME-FORM-012', 'Limited Partnership Certificate', 'Limited partnerships must file certificate of limited partnership with Secretary of State pursuant to MRSA Title 31 §1351. Must identify general partners and registered agent.', 'FORMATION', 'STATE', 'ME', '["PARTNERSHIP"]', '2024-01-01', 'MRSA Title 31 §1351', 'https://legislature.maine.gov/statutes/31/title31sec1351.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-form-013', 'ME-FORM-013', 'Limited Liability Partnership Registration', 'LLPs must file statement of qualification with Secretary of State per MRSA Title 31 §1071 and renew annually. Provides partner liability shield.', 'FORMATION', 'STATE', 'ME', '["PARTNERSHIP"]', '2024-01-01', 'MRSA Title 31 §1071', 'https://legislature.maine.gov/statutes/31/title31sec1071.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-form-014', 'ME-FORM-014', 'Professional Corporation Formation', 'Licensed professionals may form professional corporations under MRSA Title 13 §723. All shareholders must be licensed in the same profession. Annual report required.', 'FORMATION', 'STATE', 'ME', '["CORPORATION"]', '2024-01-01', 'MRSA Title 13 §723', 'https://legislature.maine.gov/statutes/13/title13sec723.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-form-015', 'ME-FORM-015', 'Corporate Bylaws Adoption', 'Maine corporations must adopt bylaws governing internal affairs pursuant to MRSA Title 13-C §206. Bylaws are not filed but must be maintained at principal office.', 'FORMATION', 'STATE', 'ME', '["CORPORATION","S_CORP"]', '2024-01-01', 'MRSA Title 13-C §206', 'https://legislature.maine.gov/statutes/13-C/title13-Csec206.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-form-016', 'ME-FORM-016', 'LLC Operating Agreement', 'Maine LLCs may adopt written, oral, or implied operating agreements per MRSA Title 31 §1521. Agreement governs member relationships, distributions, and management.', 'FORMATION', 'STATE', 'ME', '["LLC"]', '2024-01-01', 'MRSA Title 31 §1521', 'https://legislature.maine.gov/statutes/31/title31sec1521.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-form-017', 'ME-FORM-017', 'Articles of Dissolution', 'Voluntary dissolution requires filing articles of dissolution with Secretary of State per MRSA Title 13-C §1403. Must include statement that debts have been paid or provided for.', 'FORMATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP"]', '2024-01-01', 'MRSA Title 13-C §1403', 'https://legislature.maine.gov/statutes/13-C/title13-Csec1403.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-form-018', 'ME-FORM-018', 'Certificate of Good Standing', 'Entities may obtain certificate of existence/good standing from Secretary of State for $30 per MRSA Title 13-C §128. Required for many financial and contractual transactions.', 'FORMATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","NONPROFIT"]', '2024-01-01', 'MRSA Title 13-C §128', 'https://legislature.maine.gov/statutes/13-C/title13-Csec128.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-form-019', 'ME-FORM-019', 'Administrative Dissolution', 'Secretary of State may administratively dissolve entities for failure to file annual reports or maintain registered agent for 60 days under MRSA Title 13-C §1421. Reinstatement requires curing default.', 'FORMATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","NONPROFIT"]', '2024-01-01', 'MRSA Title 13-C §1421', 'https://legislature.maine.gov/statutes/13-C/title13-Csec1421.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-form-020', 'ME-FORM-020', 'Conversion and Domestication', 'Maine entities may convert to other entity types or domesticate from other jurisdictions under MRSA Title 13-C §953. Plan of conversion must be approved by required vote.', 'FORMATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]', '2024-01-01', 'MRSA Title 13-C §953', 'https://legislature.maine.gov/statutes/13-C/title13-Csec953.html', 1);

-- ============================================================
-- TAXATION (30 rules) - MRSA Title 36
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-tax-001', 'ME-TAX-001', 'Corporate Income Tax', 'Maine imposes corporate income tax with graduated rates from 3.5% to 8.93% on Maine taxable income per MRSA Title 36 §5200. Top rate applies to income over $3.5 million.', 'TAXATION', 'STATE', 'ME', '["CORPORATION","S_CORP"]', '2024-01-01', 'MRSA Title 36 §5200', 'https://legislature.maine.gov/statutes/36/title36sec5200.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-tax-002', 'ME-TAX-002', 'Personal Income Tax', 'Maine imposes graduated personal income tax with rates from 5.8% to 7.15% per MRSA Title 36 §5111. Applies to residents on worldwide income and nonresidents on Maine-source income.', 'TAXATION', 'STATE', 'ME', '["SOLE_PROPRIETORSHIP","LLC","PARTNERSHIP","S_CORP"]', '2024-01-01', 'MRSA Title 36 §5111', 'https://legislature.maine.gov/statutes/36/title36sec5111.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-tax-003', 'ME-TAX-003', 'Sales and Use Tax', 'Maine imposes 5.5% sales tax on tangible personal property and certain services per MRSA Title 36 §1811. Sellers must register with Maine Revenue Services and remit monthly or quarterly.', 'TAXATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'MRSA Title 36 §1811', 'https://legislature.maine.gov/statutes/36/title36sec1811.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-tax-004', 'ME-TAX-004', 'Service Provider Tax', 'Maine imposes 6% service provider tax on telecommunications, cable/satellite TV, fabrication, rental of video media, and extended warranties per MRSA Title 36 §2552.', 'TAXATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'MRSA Title 36 §2552', 'https://legislature.maine.gov/statutes/36/title36sec2552.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-tax-005', 'ME-TAX-005', 'Lodging Tax', 'Maine imposes 9% sales tax on prepared food and lodging (rental of living quarters less than 28 days) per MRSA Title 36 §1811. Higher than general sales tax rate.', 'TAXATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP"]', '2024-01-01', 'MRSA Title 36 §1811', 'https://legislature.maine.gov/statutes/36/title36sec1811.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-tax-006', 'ME-TAX-006', 'Property Tax (Mill Rate)', 'Real and personal property is taxed at the local level based on mill rates set by each municipality per MRSA Title 36 §502. Assessments must be at just value.', 'TAXATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 36 §502', 'https://legislature.maine.gov/statutes/36/title36sec502.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-tax-007', 'ME-TAX-007', 'Estate Tax', 'Maine imposes estate tax on estates exceeding $6.8 million exemption (2024) with rates 8% to 12% per MRSA Title 36 §4102. Maine return required even if no federal return.', 'TAXATION', 'STATE', 'ME', '["SOLE_PROPRIETORSHIP"]', '2024-01-01', 'MRSA Title 36 §4102', 'https://legislature.maine.gov/statutes/36/title36sec4102.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-tax-008', 'ME-TAX-008', 'Wild Blueberry Tax', 'Maine imposes a unique tax of 1.5 cents per pound on wild blueberries processed or sold in Maine per MRSA Title 36 §4303. Funds support Wild Blueberry Commission research and promotion.', 'TAXATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'MRSA Title 36 §4303', 'https://legislature.maine.gov/statutes/36/title36sec4303.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-tax-009', 'ME-TAX-009', 'Forest Products Tax', 'Maine imposes excise tax on commercial harvesters of forest products per MRSA Title 36 §2721. Rate varies by species. Funds support forest research.', 'TAXATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'MRSA Title 36 §2721', 'https://legislature.maine.gov/statutes/36/title36sec2721.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-tax-010', 'ME-TAX-010', 'Insurance Premiums Tax', 'Insurers must pay 2% premium tax on gross direct premiums written in Maine per MRSA Title 36 §2513. Domestic insurers pay reduced rate.', 'TAXATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP"]', '2024-01-01', 'MRSA Title 36 §2513', 'https://legislature.maine.gov/statutes/36/title36sec2513.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-tax-011', 'ME-TAX-011', 'Real Estate Transfer Tax', 'Maine imposes real estate transfer tax of $2.20 per $500 of value, split between buyer and seller per MRSA Title 36 §4641-A. Filed with Registry of Deeds.', 'TAXATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'MRSA Title 36 §4641-A', 'https://legislature.maine.gov/statutes/36/title36sec4641-A.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-tax-012', 'ME-TAX-012', 'Cigarette Tax', 'Maine imposes $2.00 per pack tax on cigarettes per MRSA Title 36 §4365. Distributors must obtain license and affix tax stamps.', 'TAXATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP"]', '2024-01-01', 'MRSA Title 36 §4365', 'https://legislature.maine.gov/statutes/36/title36sec4365.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-tax-013', 'ME-TAX-013', 'Other Tobacco Products Tax', 'Maine imposes 43% wholesale tax on other tobacco products and 81% on smokeless tobacco per MRSA Title 36 §4403.', 'TAXATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP"]', '2024-01-01', 'MRSA Title 36 §4403', 'https://legislature.maine.gov/statutes/36/title36sec4403.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-tax-014', 'ME-TAX-014', 'Gasoline Excise Tax', 'Maine imposes 30 cents per gallon excise tax on gasoline per MRSA Title 36 §2903. Distributors must be licensed and file monthly returns.', 'TAXATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP"]', '2024-01-01', 'MRSA Title 36 §2903', 'https://legislature.maine.gov/statutes/36/title36sec2903.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-tax-015', 'ME-TAX-015', 'Withholding Tax', 'Employers must withhold Maine income tax from employee wages and remit per MRSA Title 36 §5250. Returns filed quarterly with annual reconciliation (Form W-3ME).', 'TAXATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 36 §5250', 'https://legislature.maine.gov/statutes/36/title36sec5250.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-tax-016', 'ME-TAX-016', 'Pass-Through Entity Withholding', 'Pass-through entities must withhold Maine income tax on distributive shares of nonresident members per MRSA Title 36 §5250-B at top individual rate.', 'TAXATION', 'STATE', 'ME', '["LLC","S_CORP","PARTNERSHIP"]', '2024-01-01', 'MRSA Title 36 §5250-B', 'https://legislature.maine.gov/statutes/36/title36sec5250-B.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-tax-017', 'ME-TAX-017', 'Estimated Tax Payments', 'Corporations and individuals expecting to owe more than $1,000 must make quarterly estimated payments per MRSA Title 36 §5228. Due April 15, June 15, September 15, January 15.', 'TAXATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'MRSA Title 36 §5228', 'https://legislature.maine.gov/statutes/36/title36sec5228.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-tax-018', 'ME-TAX-018', 'Use Tax on Out-of-State Purchases', 'Maine residents and businesses must pay 5.5% use tax on items purchased out-of-state for use in Maine per MRSA Title 36 §1861. Reported on income tax return.', 'TAXATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 36 §1861', 'https://legislature.maine.gov/statutes/36/title36sec1861.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-tax-019', 'ME-TAX-019', 'Sales Tax Resale Certificate', 'Retailers purchasing goods for resale must obtain resale certificate from Maine Revenue Services per MRSA Title 36 §1754-B. Must be renewed periodically based on sales volume.', 'TAXATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'MRSA Title 36 §1754-B', 'https://legislature.maine.gov/statutes/36/title36sec1754-B.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-tax-020', 'ME-TAX-020', 'Marketplace Facilitator Tax Collection', 'Marketplace facilitators with Maine sales exceeding $100,000 must collect and remit sales tax on behalf of marketplace sellers per MRSA Title 36 §1951-C.', 'TAXATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP"]', '2024-01-01', 'MRSA Title 36 §1951-C', 'https://legislature.maine.gov/statutes/36/title36sec1951-C.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-tax-021', 'ME-TAX-021', 'Economic Nexus Threshold', 'Remote sellers with Maine sales exceeding $100,000 must collect and remit Maine sales tax per MRSA Title 36 §1754-B(1-A). No transaction count threshold.', 'TAXATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP"]', '2024-01-01', 'MRSA Title 36 §1754-B', 'https://legislature.maine.gov/statutes/36/title36sec1754-B.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-tax-022', 'ME-TAX-022', 'Personal Property Tax', 'Maine taxes business personal property at local mill rates per MRSA Title 36 §601. Annual declaration required by April 1 to municipal assessor.', 'TAXATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'MRSA Title 36 §601', 'https://legislature.maine.gov/statutes/36/title36sec601.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-tax-023', 'ME-TAX-023', 'BETR (Business Equipment Tax Reimbursement)', 'Businesses may claim reimbursement for personal property tax paid on qualified business equipment per MRSA Title 36 §6651. Application due December 31.', 'TAXATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'MRSA Title 36 §6651', 'https://legislature.maine.gov/statutes/36/title36sec6651.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-tax-024', 'ME-TAX-024', 'BETE (Business Equipment Tax Exemption)', 'Qualified business property placed in service after April 1, 2008 is exempt from local property tax per MRSA Title 36 §691. Annual declaration required.', 'TAXATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'MRSA Title 36 §691', 'https://legislature.maine.gov/statutes/36/title36sec691.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-tax-025', 'ME-TAX-025', 'Pine Tree Development Zone Tax Benefits', 'Qualified businesses in Pine Tree Development Zones receive sales/use tax exemption, employment tax increment financing, and corporate tax credits per MRSA Title 30-A §5250-I.', 'TAXATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP"]', '2024-01-01', 'MRSA Title 30-A §5250-I', 'https://legislature.maine.gov/statutes/30-A/title30-Asec5250-I.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-tax-026', 'ME-TAX-026', 'Educational Opportunity Tax Credit', 'Maine residents who graduated from accredited Maine schools may claim credit for student loan payments per MRSA Title 36 §5217-D. Replaced by Student Loan Repayment Tax Credit.', 'TAXATION', 'STATE', 'ME', '["SOLE_PROPRIETORSHIP"]', '2024-01-01', 'MRSA Title 36 §5217-D', 'https://legislature.maine.gov/statutes/36/title36sec5217-D.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-tax-027', 'ME-TAX-027', 'Research Expense Tax Credit', 'Businesses may claim credit for qualified research expenses conducted in Maine per MRSA Title 36 §5219-K. Credit is 5% of excess over base amount.', 'TAXATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP"]', '2024-01-01', 'MRSA Title 36 §5219-K', 'https://legislature.maine.gov/statutes/36/title36sec5219-K.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-tax-028', 'ME-TAX-028', 'Mahogany Quahog Tax', 'Maine imposes excise tax on harvesting mahogany quahogs (ocean quahogs) per MRSA Title 36 §4691. Funds support resource management.', 'TAXATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'MRSA Title 36 §4691', 'https://legislature.maine.gov/statutes/36/title36sec4691.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-tax-029', 'ME-TAX-029', 'Potato Tax', 'Maine imposes tax on potatoes packed for sale per MRSA Title 36 §4604. Funds support Maine Potato Board promotion and research.', 'TAXATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'MRSA Title 36 §4604', 'https://legislature.maine.gov/statutes/36/title36sec4604.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-tax-030', 'ME-TAX-030', 'Tax Return Filing Deadline', 'Corporate income tax returns due 15th day of 4th month after year-end per MRSA Title 36 §5227. Individual returns due April 15. Extensions available with payment.', 'TAXATION', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'MRSA Title 36 §5227', 'https://legislature.maine.gov/statutes/36/title36sec5227.html', 1);

-- ============================================================
-- EMPLOYMENT (60 rules) - MRSA Title 26, Title 5
-- ============================================================
INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-001', 'ME-EMP-001', 'Minimum Wage', 'Maine minimum wage is $14.15/hour effective January 1, 2024, indexed annually to CPI per MRSA Title 26 §664. Higher than federal minimum.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 26 §664', 'https://legislature.maine.gov/statutes/26/title26sec664.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-002', 'ME-EMP-002', 'Tipped Employee Minimum Wage', 'Tipped employees must receive direct cash wage of at least $7.08/hour (50% of minimum) plus tips equaling minimum wage per MRSA Title 26 §664. Employer must make up difference.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'MRSA Title 26 §664', 'https://legislature.maine.gov/statutes/26/title26sec664.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-003', 'ME-EMP-003', 'Overtime Pay', 'Employees must be paid 1.5x regular rate for hours over 40 in a workweek per MRSA Title 26 §664(3). Salary threshold for exempt employees is $42,450/year (2024).', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 26 §664', 'https://legislature.maine.gov/statutes/26/title26sec664.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-004', 'ME-EMP-004', 'Meal Break Requirement', 'Employees who work more than 6 consecutive hours must be offered 30-minute unpaid meal break per MRSA Title 26 §601. Required unless emergency or fewer than 3 employees on duty.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 26 §601', 'https://legislature.maine.gov/statutes/26/title26sec601.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-005', 'ME-EMP-005', 'Earned Paid Leave', 'Employers with more than 10 employees must provide 1 hour of paid leave per 40 hours worked, up to 40 hours/year per MRSA Title 26 §637. Usable for any reason.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2021-01-01', 'MRSA Title 26 §637', 'https://legislature.maine.gov/statutes/26/title26sec637.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-006', 'ME-EMP-006', 'Paid Family and Medical Leave Program', 'Maine PFML program enacted 2023; benefits begin May 1, 2026. Covered workers receive up to 12 weeks paid leave for family or medical reasons per MRSA Title 26 §850-A. Funded by 1% payroll contribution.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2026-05-01', 'MRSA Title 26 §850-A', 'https://legislature.maine.gov/statutes/26/title26sec850-A.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-007', 'ME-EMP-007', 'PFML Payroll Contributions', 'Beginning January 1, 2025, employers must collect 1% of wages (split with employees for employers of 15+) per MRSA Title 26 §850-B. Quarterly remittance to Maine Department of Labor.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2025-01-01', 'MRSA Title 26 §850-B', 'https://legislature.maine.gov/statutes/26/title26sec850-B.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-008', 'ME-EMP-008', 'Maine Family Medical Leave', 'Employers with 15+ employees must provide up to 10 weeks unpaid family medical leave in 2-year period per MRSA Title 26 §844. Job protection guaranteed.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 26 §844', 'https://legislature.maine.gov/statutes/26/title26sec844.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-009', 'ME-EMP-009', 'Maine Human Rights Act - Employment Discrimination', 'Prohibits employment discrimination based on race, color, sex, sexual orientation, gender identity, age, religion, ancestry, national origin, or disability per MRSA Title 5 §4571. Covers employers with 15+ employees.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 5 §4571', 'https://legislature.maine.gov/statutes/5/title5sec4571.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-010', 'ME-EMP-010', 'Maine Human Rights Commission Filing', 'Discrimination complaints must be filed with Maine Human Rights Commission within 300 days of alleged discrimination per MRSA Title 5 §4611. Right-to-sue letter required before court action.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 5 §4611', 'https://legislature.maine.gov/statutes/5/title5sec4611.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-011', 'ME-EMP-011', 'Equal Pay Law', 'Employers must pay equal wages for comparable work regardless of sex per MRSA Title 26 §628. Prohibits pay differentials except for bona fide factors.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 26 §628', 'https://legislature.maine.gov/statutes/26/title26sec628.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-012', 'ME-EMP-012', 'Pay History Inquiry Ban', 'Employers may not inquire about applicant compensation history before offer with compensation per MRSA Title 26 §628-A. Violations carry civil penalties.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 26 §628-A', 'https://legislature.maine.gov/statutes/26/title26sec628-A.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-013', 'ME-EMP-013', 'Ban the Box - Criminal History', 'Employers may not request criminal history information on initial application per MRSA Title 5 §4574-B (2021). Inquiry permitted later in process with limitations.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2022-10-18', 'MRSA Title 5 §4574-B', 'https://legislature.maine.gov/statutes/5/title5sec4574-B.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-014', 'ME-EMP-014', 'Noncompete Restrictions', 'Noncompete agreements prohibited for employees earning at or below 400% of federal poverty level per MRSA Title 26 §599-A. Must be disclosed before offer and signed before start date.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2019-09-19', 'MRSA Title 26 §599-A', 'https://legislature.maine.gov/statutes/26/title26sec599-A.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-015', 'ME-EMP-015', 'Restrictive Employment Agreements - Notice', 'Employers must disclose noncompete requirement in job posting and provide agreement at least 3 business days before employee must sign per MRSA Title 26 §599-A.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2019-09-19', 'MRSA Title 26 §599-A', 'https://legislature.maine.gov/statutes/26/title26sec599-A.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-016', 'ME-EMP-016', 'No Restraint of Trade for Low-Wage Workers', 'Restrictive employment agreements unenforceable against workers earning less than 400% federal poverty level per MRSA Title 26 §599-A.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2019-09-19', 'MRSA Title 26 §599-A', 'https://legislature.maine.gov/statutes/26/title26sec599-A.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-017', 'ME-EMP-017', 'Cannabis Off-Duty Use Protection', 'Employers may not refuse to employ or discriminate against persons over 21 based on off-duty consumption of marijuana per MRSA Title 28-B §112. Exceptions for safety-sensitive positions and federal contractors.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2018-02-01', 'MRSA Title 28-B §112', 'https://legislature.maine.gov/statutes/28-B/title28-Bsec112.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-018', 'ME-EMP-018', 'Whistleblower Protection Act', 'Maine Whistleblowers Protection Act prohibits retaliation against employees reporting violations of law or unsafe practices per MRSA Title 26 §831-840.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 26 §831', 'https://legislature.maine.gov/statutes/26/title26sec831.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-019', 'ME-EMP-019', 'Severance Pay - Plant Closing', 'Maine WARN Act requires severance of 1 week per year of service for employees of plants with 100+ employees that relocate or close per MRSA Title 26 §625-B. 60-day notice required.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]', '2024-01-01', 'MRSA Title 26 §625-B', 'https://legislature.maine.gov/statutes/26/title26sec625-B.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-020', 'ME-EMP-020', 'Workers Compensation Insurance', 'All employers must maintain workers compensation insurance per MRSA Title 39-A §401. Failure subject to civil and criminal penalties.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 39-A §401', 'https://legislature.maine.gov/statutes/39-A/title39-Asec401.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-021', 'ME-EMP-021', 'Workplace Sexual Harassment Training', 'Employers with 15+ employees must provide sexual harassment training to all employees within 1 year of hire and supervisors within additional training per MRSA Title 26 §807.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 26 §807', 'https://legislature.maine.gov/statutes/26/title26sec807.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-022', 'ME-EMP-022', 'Domestic Violence Leave', 'Employers with 15+ employees must provide reasonable and necessary leave for victims of domestic violence, sexual assault, or stalking per MRSA Title 26 §850. May be paid or unpaid.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 26 §850', 'https://legislature.maine.gov/statutes/26/title26sec850.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-023', 'ME-EMP-023', 'Agricultural Worker Protection', 'Agricultural workers covered by Maine wage and hour laws with limited exceptions per MRSA Title 26 §663. Must be paid minimum wage with limited overtime exemptions.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'MRSA Title 26 §663', 'https://legislature.maine.gov/statutes/26/title26sec663.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-024', 'ME-EMP-024', 'Pay Frequency', 'Employees must be paid at regular intervals not exceeding 16 days per MRSA Title 26 §621-A. Final wages due no later than next regular payday.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 26 §621-A', 'https://legislature.maine.gov/statutes/26/title26sec621-A.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-025', 'ME-EMP-025', 'Final Paycheck', 'Final wages must be paid by next regular payday or within 2 weeks of demand, whichever is earlier per MRSA Title 26 §626. Includes accrued vacation if employer policy provides for it.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 26 §626', 'https://legislature.maine.gov/statutes/26/title26sec626.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-026', 'ME-EMP-026', 'Wage Statement Requirements', 'Employers must provide written statement of wages, hours, and deductions with each payment per MRSA Title 26 §665.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 26 §665', 'https://legislature.maine.gov/statutes/26/title26sec665.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-027', 'ME-EMP-027', 'Personnel File Access', 'Employees and former employees have right to inspect personnel file once per year per MRSA Title 26 §631. Employer must provide within 10 business days.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 26 §631', 'https://legislature.maine.gov/statutes/26/title26sec631.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-028', 'ME-EMP-028', 'New Hire Reporting', 'Employers must report new hires to Maine Department of Health and Human Services within 7 days per MRSA Title 19-A §2154. Used for child support enforcement.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 19-A §2154', 'https://legislature.maine.gov/statutes/19-A/title19-Asec2154.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-029', 'ME-EMP-029', 'Child Labor - Work Permits', 'Minors under 16 must obtain work permit before employment per MRSA Title 26 §771. Restrictions on hours and hazardous occupations.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 26 §771', 'https://legislature.maine.gov/statutes/26/title26sec771.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-030', 'ME-EMP-030', 'Child Labor - Hours Restrictions', 'Minors under 16 limited to 3 hours/school day, 8 hours/non-school day, 18 hours/school week, 40 hours/non-school week per MRSA Title 26 §774.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 26 §774', 'https://legislature.maine.gov/statutes/26/title26sec774.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-031', 'ME-EMP-031', 'Smoke-Free Workplace', 'Smoking prohibited in enclosed places of employment per MRSA Title 22 §1580-A. Employers must post signs and prohibit smoking.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 22 §1580-A', 'https://legislature.maine.gov/statutes/22/title22sec1580-A.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-032', 'ME-EMP-032', 'Lactation Accommodation', 'Employers must provide unpaid break time and private space (not bathroom) for nursing employees to express breast milk for up to 3 years per MRSA Title 26 §604.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 26 §604', 'https://legislature.maine.gov/statutes/26/title26sec604.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-033', 'ME-EMP-033', 'Pregnancy Accommodation', 'Employers with 15+ employees must provide reasonable accommodations for pregnancy, childbirth, and related conditions per MRSA Title 5 §4572-A.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2019-09-19', 'MRSA Title 5 §4572-A', 'https://legislature.maine.gov/statutes/5/title5sec4572-A.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-034', 'ME-EMP-034', 'Jury Duty Leave', 'Employers must allow time off for jury service and may not penalize employees per MRSA Title 14 §1218. Wages need not be paid.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 14 §1218', 'https://legislature.maine.gov/statutes/14/title14sec1218.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-035', 'ME-EMP-035', 'Military Leave', 'Employers must provide unpaid leave for state and federal military service and reinstate returning service members per MRSA Title 26 §811.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 26 §811', 'https://legislature.maine.gov/statutes/26/title26sec811.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-036', 'ME-EMP-036', 'Voting Leave', 'Employers must allow employees reasonable time off to vote per MRSA Title 21-A §753. Employer may specify hours.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 21-A §753', 'https://legislature.maine.gov/statutes/21-A/title21-Asec753.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-037', 'ME-EMP-037', 'Veterans Hiring Preference', 'Public employers must provide hiring preference for qualified veterans per MRSA Title 5 §7054.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","NONPROFIT"]', '2024-01-01', 'MRSA Title 5 §7054', 'https://legislature.maine.gov/statutes/5/title5sec7054.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-038', 'ME-EMP-038', 'Background Checks - FCRA Compliance', 'Employers conducting background checks must comply with federal FCRA and provide candidate disclosure per MRSA Title 5 §4574-B.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 5 §4574-B', 'https://legislature.maine.gov/statutes/5/title5sec4574-B.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-039', 'ME-EMP-039', 'Drug Testing Restrictions', 'Maine Substance Abuse Testing Law restricts employee drug testing per MRSA Title 26 §681-690. Written policy and Department of Labor approval required.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 26 §681', 'https://legislature.maine.gov/statutes/26/title26sec681.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-040', 'ME-EMP-040', 'Employee Handbook Substance Testing', 'Employers must have written substance testing policy approved by Maine Department of Labor before testing per MRSA Title 26 §683.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 26 §683', 'https://legislature.maine.gov/statutes/26/title26sec683.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-041', 'ME-EMP-041', 'Independent Contractor Classification', 'Maine uses ABC test for independent contractor classification per MRSA Title 26 §1043(11)(E). Misclassification subjects employer to penalties.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 26 §1043', 'https://legislature.maine.gov/statutes/26/title26sec1043.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-042', 'ME-EMP-042', 'Posters - Required Workplace Notices', 'Employers must post Maine workplace posters including minimum wage, child labor, sexual harassment, workers comp, and unemployment per MRSA Title 26 §42.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 26 §42', 'https://legislature.maine.gov/statutes/26/title26sec42.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-043', 'ME-EMP-043', 'Direct Deposit', 'Direct deposit may not be required as condition of employment without employee consent per MRSA Title 26 §663.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 26 §663', 'https://legislature.maine.gov/statutes/26/title26sec663.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-044', 'ME-EMP-044', 'Wage Deductions', 'Employer wage deductions limited to those required by law or authorized in writing by employee per MRSA Title 26 §635.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 26 §635', 'https://legislature.maine.gov/statutes/26/title26sec635.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-045', 'ME-EMP-045', 'Day of Rest', 'Employees in mercantile establishments entitled to one day of rest in seven per MRSA Title 26 §603.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'MRSA Title 26 §603', 'https://legislature.maine.gov/statutes/26/title26sec603.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-046', 'ME-EMP-046', 'Sunday Premium Pay - Retail', 'Retail employees working Sunday must be paid 1.5x regular rate (with limited exceptions) per MRSA Title 26 §603.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'MRSA Title 26 §603', 'https://legislature.maine.gov/statutes/26/title26sec603.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-047', 'ME-EMP-047', 'Genetic Information Discrimination', 'Maine Human Rights Act prohibits employment discrimination based on genetic information per MRSA Title 5 §19302.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 5 §19302', 'https://legislature.maine.gov/statutes/5/title5sec19302.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-048', 'ME-EMP-048', 'Sexual Orientation and Gender Identity Protection', 'Maine prohibits employment discrimination based on sexual orientation or gender identity per MRSA Title 5 §4553. Maine was first state to pass such law in 2005.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2005-12-28', 'MRSA Title 5 §4553', 'https://legislature.maine.gov/statutes/5/title5sec4553.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-049', 'ME-EMP-049', 'Age Discrimination', 'Employment discrimination based on age prohibited for employees 40 and older per MRSA Title 5 §4572.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 5 §4572', 'https://legislature.maine.gov/statutes/5/title5sec4572.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-050', 'ME-EMP-050', 'Disability Accommodation', 'Employers must provide reasonable accommodations for employees with disabilities per MRSA Title 5 §4572.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 5 §4572', 'https://legislature.maine.gov/statutes/5/title5sec4572.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-051', 'ME-EMP-051', 'Religious Accommodation', 'Employers must reasonably accommodate religious practices unless undue hardship per MRSA Title 5 §4572.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 5 §4572', 'https://legislature.maine.gov/statutes/5/title5sec4572.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-052', 'ME-EMP-052', 'Service Letter Law', 'Discharged employees may request statement of reasons for termination from employer per MRSA Title 26 §630. Must be provided within 15 days of written request.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 26 §630', 'https://legislature.maine.gov/statutes/26/title26sec630.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-053', 'ME-EMP-053', 'Polygraph Restrictions', 'Employers may not require polygraph tests as condition of employment per MRSA Title 32 §7166.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 32 §7166', 'https://legislature.maine.gov/statutes/32/title32sec7166.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-054', 'ME-EMP-054', 'Employee Social Media Privacy', 'Employers may not require employees to disclose social media passwords or accept friend requests per MRSA Title 26 §615. Limited exceptions for investigations.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2015-10-15', 'MRSA Title 26 §615', 'https://legislature.maine.gov/statutes/26/title26sec615.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-055', 'ME-EMP-055', 'Right to Work - Union Security', 'Maine is not a right-to-work state; union security agreements permitted per MRSA Title 26 §979-G.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 26 §979-G', 'https://legislature.maine.gov/statutes/26/title26sec979-G.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-056', 'ME-EMP-056', 'Public Sector Collective Bargaining', 'State and municipal employees have right to collectively bargain per MRSA Title 26 §961-974.', 'EMPLOYMENT', 'STATE', 'ME', '["NONPROFIT"]', '2024-01-01', 'MRSA Title 26 §961', 'https://legislature.maine.gov/statutes/26/title26sec961.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-057', 'ME-EMP-057', 'Workplace Bullying Studies', 'Maine commissioned workplace bullying studies and supports anti-bullying policies per MRSA Title 26 §606.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'MRSA Title 26 §606', 'https://legislature.maine.gov/statutes/26/title26sec606.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-058', 'ME-EMP-058', 'Tip Pooling', 'Tip pooling permitted only among employees who customarily receive tips per MRSA Title 26 §664. Employers may not retain tips.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'MRSA Title 26 §664', 'https://legislature.maine.gov/statutes/26/title26sec664.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-059', 'ME-EMP-059', 'Service Charges vs Tips', 'Mandatory service charges are not tips and may be retained by employer if disclosed per MRSA Title 26 §664.', 'EMPLOYMENT', 'STATE', 'ME', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'MRSA Title 26 §664', 'https://legislature.maine.gov/statutes/26/title26sec664.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('me-emp-060', 'ME-EMP-060', 'OSHA - State Plan', 'Maine has state OSHA plan covering public sector. Private sector covered by federal OSHA per MRSA Title 26 §565.', 'EMPLOYMENT', 'STATE', 'ME', '["NONPROFIT"]', '2024-01-01', 'MRSA Title 26 §565', 'https://legislature.maine.gov/statutes/26/title26sec565.html', 1);

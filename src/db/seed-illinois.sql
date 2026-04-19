-- Illinois Compliance Rules Seed
-- Citations: Illinois Compiled Statutes (ILCS)
-- Generated for Vernen Legal Compliance Platform

-- ============================================================
-- FORMATION (25 rules) - il-form-001 through il-form-025
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('il-form-001', 'IL-FORM-001', 'Illinois Business Corporation Act of 1983', 'Illinois corporations are governed by the Business Corporation Act of 1983, which sets requirements for incorporation, governance, shareholder rights, mergers, and dissolution. Articles of incorporation must be filed with the Illinois Secretary of State.', 'FORMATION', 'STATE', 'IL', '["CORPORATION","S_CORP"]', '1984-07-01', '805 ILCS 5/', 'https://www.ilga.gov/legislation/ilcs/ilcs5.asp?ActID=2273', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('il-form-002', 'IL-FORM-002', 'Articles of Incorporation Filing', 'Domestic corporations must file Articles of Incorporation (Form BCA 2.10) with the Illinois Secretary of State, including corporate name, purpose, registered agent and office, authorized shares, and incorporator information.', 'FORMATION', 'STATE', 'IL', '["CORPORATION","S_CORP"]', '1984-07-01', '805 ILCS 5/2.10', 'https://www.ilsos.gov/departments/business_services/forms.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('il-form-003', 'IL-FORM-003', 'Corporate Name Requirements', 'Illinois corporate names must contain "Corporation," "Company," "Incorporated," "Limited," or an abbreviation, and must be distinguishable from other entities on file with the Secretary of State.', 'FORMATION', 'STATE', 'IL', '["CORPORATION","S_CORP"]', '1984-07-01', '805 ILCS 5/4.05', 'https://www.ilga.gov/legislation/ilcs/ilcs4.asp?DocName=080500050HArt%2E+4&ActID=2273', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('il-form-004', 'IL-FORM-004', 'Registered Agent Requirement (Corporations)', 'Every Illinois corporation must continuously maintain a registered agent and registered office in Illinois. The registered agent may be an individual resident or a business entity authorized to do business in Illinois.', 'FORMATION', 'STATE', 'IL', '["CORPORATION","S_CORP"]', '1984-07-01', '805 ILCS 5/5.05', 'https://www.ilga.gov/legislation/ilcs/ilcs4.asp?DocName=080500050HArt%2E+5&ActID=2273', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('il-form-005', 'IL-FORM-005', 'Corporate Annual Report', 'Illinois corporations must file an annual report with the Secretary of State each year before the first day of the corporation''s anniversary month, with a $75 filing fee plus franchise tax computation.', 'FORMATION', 'STATE', 'IL', '["CORPORATION","S_CORP"]', '1984-07-01', '805 ILCS 5/14.05', 'https://www.ilsos.gov/corporatellc/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('il-form-006', 'IL-FORM-006', 'Illinois Limited Liability Company Act', 'Illinois LLCs are governed by the Limited Liability Company Act, covering formation, member rights, management, fiduciary duties, dissolution, and series LLCs.', 'FORMATION', 'STATE', 'IL', '["LLC"]', '1994-01-01', '805 ILCS 180/', 'https://www.ilga.gov/legislation/ilcs/ilcs5.asp?ActID=2275', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('il-form-007', 'IL-FORM-007', 'LLC Articles of Organization', 'Illinois LLCs must file Articles of Organization (Form LLC-5.5) with the Secretary of State, including LLC name, registered agent, principal place of business, purpose, and management structure. Filing fee is $150.', 'FORMATION', 'STATE', 'IL', '["LLC"]', '1994-01-01', '805 ILCS 180/5-5', 'https://www.ilsos.gov/publications/business_services/llcforms.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('il-form-008', 'IL-FORM-008', 'LLC Name Requirements', 'Illinois LLC names must contain "Limited Liability Company," "L.L.C.," or "LLC," and must be distinguishable from other entities on the Secretary of State''s records.', 'FORMATION', 'STATE', 'IL', '["LLC"]', '1994-01-01', '805 ILCS 180/1-10', 'https://www.ilga.gov/legislation/ilcs/ilcs4.asp?DocName=080501800HArt%2E+1&ActID=2275', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('il-form-009', 'IL-FORM-009', 'LLC Registered Agent', 'Every Illinois LLC must maintain a registered agent and registered office in Illinois. The registered agent must be available to accept service of process during normal business hours.', 'FORMATION', 'STATE', 'IL', '["LLC"]', '1994-01-01', '805 ILCS 180/1-35', 'https://www.ilga.gov/legislation/ilcs/ilcs4.asp?DocName=080501800HArt%2E+1&ActID=2275', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('il-form-010', 'IL-FORM-010', 'LLC Annual Report', 'Illinois LLCs must file an annual report with the Secretary of State by the first day of the anniversary month each year, with a $75 filing fee. Failure to file results in administrative dissolution.', 'FORMATION', 'STATE', 'IL', '["LLC"]', '1994-01-01', '805 ILCS 180/50-1', 'https://www.ilsos.gov/corporatellc/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('il-form-011', 'IL-FORM-011', 'Series LLC', 'Illinois permits Series LLCs, allowing one LLC to establish separate series with distinct assets, liabilities, members, and managers. Each series provides liability protection from other series if statutory requirements are met.', 'FORMATION', 'STATE', 'IL', '["LLC"]', '2005-08-16', '805 ILCS 180/37-40', 'https://www.ilga.gov/legislation/ilcs/ilcs4.asp?DocName=080501800HArt%2E+37&ActID=2275', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('il-form-012', 'IL-FORM-012', 'General Not For Profit Corporation Act', 'Illinois nonprofits are governed by the General Not For Profit Corporation Act of 1986, addressing formation, governance, members, directors, mergers, and dissolution.', 'FORMATION', 'STATE', 'IL', '["NONPROFIT"]', '1987-01-01', '805 ILCS 105/', 'https://www.ilga.gov/legislation/ilcs/ilcs5.asp?ActID=2280', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('il-form-013', 'IL-FORM-013', 'Nonprofit Articles of Incorporation', 'Illinois nonprofits must file Articles of Incorporation (Form NFP 102.10) with the Secretary of State, identifying the corporation as not-for-profit, stating purposes, and naming initial directors. Filing fee is $50.', 'FORMATION', 'STATE', 'IL', '["NONPROFIT"]', '1987-01-01', '805 ILCS 105/102.10', 'https://www.ilsos.gov/publications/business_services/nfpforms.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('il-form-014', 'IL-FORM-014', 'Nonprofit Annual Report', 'Illinois nonprofit corporations must file an annual report with the Secretary of State by the first day of the anniversary month with a $10 filing fee.', 'FORMATION', 'STATE', 'IL', '["NONPROFIT"]', '1987-01-01', '805 ILCS 105/114.05', 'https://www.ilsos.gov/corporatellc/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('il-form-015', 'IL-FORM-015', 'Charitable Trust Act Registration', 'Charitable organizations soliciting in Illinois must register with the Illinois Attorney General''s Charitable Trust Bureau under the Charitable Trust Act and Solicitation for Charity Act.', 'FORMATION', 'STATE', 'IL', '["NONPROFIT"]', '1961-01-01', '760 ILCS 55/', 'https://www.illinoisattorneygeneral.gov/charities/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('il-form-016', 'IL-FORM-016', 'Uniform Partnership Act', 'Illinois general partnerships are governed by the Uniform Partnership Act (1997), covering partner relationships, fiduciary duties, dissolution, and winding up.', 'FORMATION', 'STATE', 'IL', '["PARTNERSHIP"]', '2003-01-01', '805 ILCS 206/', 'https://www.ilga.gov/legislation/ilcs/ilcs5.asp?ActID=2276', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('il-form-017', 'IL-FORM-017', 'Limited Partnership Act', 'Illinois limited partnerships are governed by the Uniform Limited Partnership Act (2001), requiring filing of a Certificate of Limited Partnership with the Secretary of State.', 'FORMATION', 'STATE', 'IL', '["PARTNERSHIP"]', '2005-01-01', '805 ILCS 215/', 'https://www.ilga.gov/legislation/ilcs/ilcs5.asp?ActID=2277', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('il-form-018', 'IL-FORM-018', 'Limited Liability Partnership Registration', 'Illinois general partnerships may register as LLPs by filing a Statement of Qualification with the Secretary of State, providing partners with limited liability protection.', 'FORMATION', 'STATE', 'IL', '["PARTNERSHIP"]', '2003-01-01', '805 ILCS 206/1001', 'https://www.ilsos.gov/publications/business_services/llpforms.html', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('il-form-019', 'IL-FORM-019', 'Foreign Corporation Qualification', 'Foreign corporations transacting business in Illinois must obtain a Certificate of Authority from the Secretary of State by filing an Application for Authority (BCA 13.15) and providing a certificate of good standing.', 'FORMATION', 'STATE', 'IL', '["CORPORATION","S_CORP"]', '1984-07-01', '805 ILCS 5/13.05', 'https://www.ilga.gov/legislation/ilcs/ilcs4.asp?DocName=080500050HArt%2E+13&ActID=2273', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('il-form-020', 'IL-FORM-020', 'Foreign LLC Registration', 'Foreign LLCs transacting business in Illinois must register with the Secretary of State by filing an Application for Admission to Transact Business (Form LLC-45.5) with a $150 filing fee.', 'FORMATION', 'STATE', 'IL', '["LLC"]', '1994-01-01', '805 ILCS 180/45-5', 'https://www.ilga.gov/legislation/ilcs/ilcs4.asp?DocName=080501800HArt%2E+45&ActID=2275', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('il-form-021', 'IL-FORM-021', 'Assumed Business Name Filing', 'Sole proprietors and partnerships operating under a name other than the owner''s legal name must file an Assumed Business Name certificate with the county clerk where the business operates.', 'FORMATION', 'COUNTY', 'IL', '["SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '1941-01-01', '805 ILCS 405/', 'https://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=2270', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('il-form-022', 'IL-FORM-022', 'Benefit Corporation', 'Illinois recognizes Benefit Corporations under the Benefit Corporation Act, allowing for-profit corporations to pursue general public benefit alongside profit, with annual benefit reporting requirements.', 'FORMATION', 'STATE', 'IL', '["CORPORATION"]', '2013-01-01', '805 ILCS 40/', 'https://www.ilga.gov/legislation/ilcs/ilcs5.asp?ActID=3320', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('il-form-023', 'IL-FORM-023', 'Professional Service Corporation Act', 'Licensed professionals in Illinois (physicians, attorneys, accountants, etc.) may incorporate under the Professional Service Corporation Act, requiring all shareholders to be licensed in the rendered profession.', 'FORMATION', 'STATE', 'IL', '["CORPORATION"]', '1970-01-01', '805 ILCS 10/', 'https://www.ilga.gov/legislation/ilcs/ilcs5.asp?ActID=2274', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('il-form-024', 'IL-FORM-024', 'Administrative Dissolution', 'The Illinois Secretary of State may administratively dissolve corporations and LLCs that fail to file annual reports, fail to maintain a registered agent, or fail to pay franchise tax for 60 days after due.', 'FORMATION', 'STATE', 'IL', '["LLC","CORPORATION","S_CORP","NONPROFIT"]', '1984-07-01', '805 ILCS 5/12.35', 'https://www.ilga.gov/legislation/ilcs/ilcs4.asp?DocName=080500050HArt%2E+12&ActID=2273', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('il-form-025', 'IL-FORM-025', 'Corporate Reinstatement', 'Administratively dissolved Illinois corporations and LLCs may apply for reinstatement by filing all delinquent reports, paying franchise tax, penalties, and a reinstatement fee within five years of dissolution.', 'FORMATION', 'STATE', 'IL', '["LLC","CORPORATION","S_CORP","NONPROFIT"]', '1984-07-01', '805 ILCS 5/12.45', 'https://www.ilga.gov/legislation/ilcs/ilcs4.asp?DocName=080500050HArt%2E+12&ActID=2273', 1);

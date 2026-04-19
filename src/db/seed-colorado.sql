-- Colorado Compliance Rules Seed
-- ~300 rules across all categories
-- Employment IDs start at co-emp-101 (co-emp-001 through co-emp-010 already exist)

-- ============================================================
-- FORMATION (25 rules)
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-form-001', 'CO-FORM-001', 'Colorado Business Corporation Act — Articles of Incorporation', 'Corporations must file Articles of Incorporation with the Colorado Secretary of State under the Colorado Business Corporation Act. Must include corporate name, registered agent, principal office, share structure, and incorporator information.', 'FORMATION', 'STATE', 'CO', '["CORPORATION","S_CORP"]', '2024-01-01', 'C.R.S. § 7-102-101 et seq.', 'https://leg.colorado.gov/colorado-revised-statutes', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-form-002', 'CO-FORM-002', 'Colorado LLC Act — Articles of Organization', 'Limited liability companies must file Articles of Organization with the Colorado Secretary of State under the Colorado Limited Liability Company Act. Must include LLC name, registered agent, principal office, and organizer information.', 'FORMATION', 'STATE', 'CO', '["LLC"]', '2024-01-01', 'C.R.S. § 7-80-201', 'https://leg.colorado.gov/colorado-revised-statutes', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-form-003', 'CO-FORM-003', 'Colorado Periodic Report Filing', 'All Colorado entities must file a Periodic Report annually with the Secretary of State. Filing fee is $10. Failure to file results in entity becoming "Noncompliant" and ultimately delinquent status.', 'FORMATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","NONPROFIT","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 7-90-501', 'https://www.sos.state.co.us/biz/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-form-004', 'CO-FORM-004', 'Colorado Registered Agent Requirement', 'Every Colorado entity must continuously maintain a registered agent with a physical street address (not a P.O. Box) in Colorado. Agent must be available during normal business hours to accept service of process.', 'FORMATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","NONPROFIT","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 7-90-701', 'https://www.sos.state.co.us/biz/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-form-005', 'CO-FORM-005', 'Colorado Trade Name Registration', 'Persons or entities transacting business under a name other than their true name must register the trade name with the Colorado Secretary of State. Registration is valid until withdrawn.', 'FORMATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 7-71-101 et seq.', 'https://www.sos.state.co.us/biz/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-form-006', 'CO-FORM-006', 'Colorado Public Benefit Corporation', 'Colorado public benefit corporations must identify a specific public benefit purpose and balance that purpose with shareholder interests. Annual benefit reports required.', 'FORMATION', 'STATE', 'CO', '["CORPORATION"]', '2024-01-01', 'C.R.S. § 7-101-501 et seq.', 'https://leg.colorado.gov/colorado-revised-statutes', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-form-007', 'CO-FORM-007', 'Colorado Nonprofit Corporation Act', 'Nonprofit corporations must file Articles of Incorporation under the Colorado Revised Nonprofit Corporation Act. Must specify whether membership or non-membership corporation.', 'FORMATION', 'STATE', 'CO', '["NONPROFIT"]', '2024-01-01', 'C.R.S. § 7-121-101 et seq.', 'https://leg.colorado.gov/colorado-revised-statutes', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-form-008', 'CO-FORM-008', 'Colorado Uniform Partnership Act', 'General partnerships in Colorado are governed by the Colorado Uniform Partnership Act. Statement of Partnership Authority may be filed but is not required.', 'FORMATION', 'STATE', 'CO', '["PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 7-64-101 et seq.', 'https://leg.colorado.gov/colorado-revised-statutes', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-form-009', 'CO-FORM-009', 'Colorado Limited Partnership Filing', 'Limited partnerships must file a Certificate of Limited Partnership with the Secretary of State identifying general partners and the registered agent.', 'FORMATION', 'STATE', 'CO', '["PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 7-62-201', 'https://leg.colorado.gov/colorado-revised-statutes', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-form-010', 'CO-FORM-010', 'Colorado LLP Registration', 'Limited liability partnerships must file a Statement of Registration with the Secretary of State to obtain LLP status and partner liability shield.', 'FORMATION', 'STATE', 'CO', '["PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 7-64-1002', 'https://leg.colorado.gov/colorado-revised-statutes', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-form-011', 'CO-FORM-011', 'Colorado Foreign Entity Authority', 'Foreign entities transacting business in Colorado must file a Statement of Foreign Entity Authority with the Secretary of State and maintain a registered agent in Colorado.', 'FORMATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","NONPROFIT","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 7-90-801', 'https://www.sos.state.co.us/biz/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-form-012', 'CO-FORM-012', 'Colorado Entity Name Availability', 'Entity names must be distinguishable from other entity names on record with the Colorado Secretary of State. Name reservations valid for 120 days.', 'FORMATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","NONPROFIT","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 7-90-601', 'https://www.sos.state.co.us/biz/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-form-013', 'CO-FORM-013', 'Colorado Corporate Bylaws', 'Colorado corporations must adopt bylaws governing the management of the corporation. Bylaws may be adopted by incorporators or initial board.', 'FORMATION', 'STATE', 'CO', '["CORPORATION","S_CORP"]', '2024-01-01', 'C.R.S. § 7-102-106', 'https://leg.colorado.gov/colorado-revised-statutes', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-form-014', 'CO-FORM-014', 'Colorado LLC Operating Agreement', 'Colorado LLCs may adopt an operating agreement governing relations among members and managers. Oral or implied agreements are permitted but written is recommended.', 'FORMATION', 'STATE', 'CO', '["LLC"]', '2024-01-01', 'C.R.S. § 7-80-108', 'https://leg.colorado.gov/colorado-revised-statutes', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-form-015', 'CO-FORM-015', 'Colorado Corporate Stock Issuance', 'Colorado corporations must authorize and issue stock in accordance with their articles. Board must determine consideration for stock issuance.', 'FORMATION', 'STATE', 'CO', '["CORPORATION","S_CORP"]', '2024-01-01', 'C.R.S. § 7-106-201', 'https://leg.colorado.gov/colorado-revised-statutes', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-form-016', 'CO-FORM-016', 'Colorado Corporate Records Maintenance', 'Corporations must maintain accurate books and records including minutes of shareholder and director meetings, accounting records, and shareholder records.', 'FORMATION', 'STATE', 'CO', '["CORPORATION","S_CORP"]', '2024-01-01', 'C.R.S. § 7-116-101', 'https://leg.colorado.gov/colorado-revised-statutes', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-form-017', 'CO-FORM-017', 'Colorado Annual Shareholder Meeting', 'Colorado corporations must hold annual shareholder meetings as specified in bylaws. Failure does not invalidate corporate actions but may trigger court-ordered meeting.', 'FORMATION', 'STATE', 'CO', '["CORPORATION","S_CORP"]', '2024-01-01', 'C.R.S. § 7-107-101', 'https://leg.colorado.gov/colorado-revised-statutes', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-form-018', 'CO-FORM-018', 'Colorado Director Standards of Conduct', 'Colorado corporate directors must discharge duties in good faith, with the care of an ordinarily prudent person, and in a manner reasonably believed to be in the best interests of the corporation.', 'FORMATION', 'STATE', 'CO', '["CORPORATION","S_CORP","NONPROFIT"]', '2024-01-01', 'C.R.S. § 7-108-401', 'https://leg.colorado.gov/colorado-revised-statutes', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-form-019', 'CO-FORM-019', 'Colorado Dissolution by Filing', 'Colorado entities may dissolve by filing Articles of Dissolution with the Secretary of State after winding up business affairs.', 'FORMATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","NONPROFIT","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 7-114-101', 'https://leg.colorado.gov/colorado-revised-statutes', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-form-020', 'CO-FORM-020', 'Colorado Conversion of Entity', 'Colorado entities may convert to other entity forms by filing a Statement of Conversion with the Secretary of State.', 'FORMATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 7-90-201', 'https://leg.colorado.gov/colorado-revised-statutes', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-form-021', 'CO-FORM-021', 'Colorado Merger Filing', 'Mergers between Colorado entities require filing Articles of Merger with the Secretary of State after approval by each constituent entity.', 'FORMATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","NONPROFIT","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 7-90-203.7', 'https://leg.colorado.gov/colorado-revised-statutes', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-form-022', 'CO-FORM-022', 'Colorado Cooperative Association', 'Colorado cooperatives must file Articles of Incorporation under the Colorado Cooperative Act and operate on cooperative principles.', 'FORMATION', 'STATE', 'CO', '["NONPROFIT","CORPORATION"]', '2024-01-01', 'C.R.S. § 7-55-101 et seq.', 'https://leg.colorado.gov/colorado-revised-statutes', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-form-023', 'CO-FORM-023', 'Colorado Professional Service Corporation', 'Licensed professionals forming a professional corporation in Colorado must comply with the Colorado Corporations and Associations Act professional service provisions.', 'FORMATION', 'STATE', 'CO', '["CORPORATION","S_CORP"]', '2024-01-01', 'C.R.S. § 12-2-127', 'https://leg.colorado.gov/colorado-revised-statutes', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-form-024', 'CO-FORM-024', 'Colorado Series LLC Recognition', 'Colorado does not currently authorize Series LLCs as a separate entity form. Foreign Series LLCs may register but each protected series may need separate registration.', 'FORMATION', 'STATE', 'CO', '["LLC"]', '2024-01-01', 'C.R.S. § 7-80-101 et seq.', 'https://leg.colorado.gov/colorado-revised-statutes', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-form-025', 'CO-FORM-025', 'Colorado Beneficial Ownership State Filing', 'While federal CTA reporting is paused, Colorado entities should monitor state-level beneficial ownership reporting proposals and federal reactivation.', 'FORMATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP"]', '2024-01-01', 'C.R.S. § 7-90-501', 'https://www.sos.state.co.us/biz/', 1);

-- ============================================================
-- TAXATION (35 rules)
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-001', 'CO-TAX-001', 'Colorado State Income Tax — Flat Rate', 'Colorado imposes a flat 4.4% state income tax on individuals and corporations. Rate set by statute and subject to TABOR refund mechanisms.', 'TAXATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 39-22-104', 'https://tax.colorado.gov/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-002', 'CO-TAX-002', 'Colorado Corporate Income Tax', 'C corporations doing business in Colorado pay 4.4% corporate income tax on Colorado-source income. Apportionment based on single sales factor.', 'TAXATION', 'STATE', 'CO', '["CORPORATION","S_CORP"]', '2024-01-01', 'C.R.S. § 39-22-301', 'https://tax.colorado.gov/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-003', 'CO-TAX-003', 'Colorado State Sales Tax', 'Colorado imposes a 2.9% state sales tax on retail sales of tangible personal property and certain services. Among lowest state rates in nation.', 'TAXATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 39-26-106', 'https://tax.colorado.gov/sales-use-tax', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-004', 'CO-TAX-004', 'Colorado Home Rule Local Sales Tax', 'Colorado has 70+ home rule cities that self-administer sales tax with their own rules, exemptions, and filing requirements separate from state. Most complex sales tax environment in nation.', 'TAXATION', 'LOCAL', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'Colo. Const. art. XX, § 6', 'https://tax.colorado.gov/sales-use-tax-rates', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-005', 'CO-TAX-005', 'Colorado SUTS — Sales and Use Tax System', 'Colorado SUTS provides a single point of remittance for state-collected and many home rule jurisdictions. Use of SUTS is encouraged but not all home rule cities participate.', 'TAXATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 39-26-802.7', 'https://tax.colorado.gov/SUTS', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-006', 'CO-TAX-006', 'Colorado Use Tax', 'Use tax applies to taxable items purchased without payment of Colorado sales tax. Rate matches local sales tax rate at point of use.', 'TAXATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 39-26-202', 'https://tax.colorado.gov/sales-use-tax', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-007', 'CO-TAX-007', 'Colorado Economic Nexus — Remote Sellers', 'Out-of-state retailers with more than $100,000 in Colorado sales must collect and remit Colorado sales tax under economic nexus rules.', 'TAXATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 39-26-102(3)(b)', 'https://tax.colorado.gov/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-008', 'CO-TAX-008', 'Colorado Marketplace Facilitator Law', 'Marketplace facilitators with more than $100,000 in Colorado sales must collect and remit sales tax on behalf of marketplace sellers.', 'TAXATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 39-26-102(5.7)', 'https://tax.colorado.gov/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-009', 'CO-TAX-009', 'Colorado Retail Delivery Fee', 'Colorado imposes a retail delivery fee (currently $0.29) on each retail delivery by motor vehicle to a Colorado address that includes at least one item subject to sales tax.', 'TAXATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 43-4-218', 'https://tax.colorado.gov/retail-delivery-fee', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-010', 'CO-TAX-010', 'Colorado TABOR — Taxpayer Bill of Rights', 'TABOR is a Colorado constitutional amendment requiring voter approval for new taxes, tax rate increases, debt issuance, and revenue retention above formula limits. Unique among states.', 'TAXATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'Colo. Const. art. X, § 20', 'https://leg.colorado.gov/agencies/legislative-council-staff/tabor', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-011', 'CO-TAX-011', 'Colorado TABOR Refunds', 'When state revenue exceeds TABOR limits, the excess must be refunded to taxpayers via mechanisms set by the General Assembly (sales tax refund, temporary income tax rate reductions, etc.).', 'TAXATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'Colo. Const. art. X, § 20(7)', 'https://leg.colorado.gov/agencies/legislative-council-staff/tabor', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-012', 'CO-TAX-012', 'Colorado Property Tax — Residential Assessment Rate', 'Residential property in Colorado is assessed at a rate set by the legislature (subject to TABOR/Gallagher considerations). Property tax is a major local revenue source.', 'TAXATION', 'LOCAL', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'C.R.S. § 39-1-104.2', 'https://cdola.colorado.gov/property-taxation', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-013', 'CO-TAX-013', 'Colorado Commercial Property Tax Assessment', 'Commercial and nonresidential property in Colorado is assessed at 27.9% of actual value (subject to legislative changes).', 'TAXATION', 'LOCAL', 'CO', '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 39-1-104', 'https://cdola.colorado.gov/property-taxation', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-014', 'CO-TAX-014', 'Colorado Personal Property Tax', 'Business personal property in Colorado is subject to property tax. Exemption applies for businesses with personal property below the statutory threshold.', 'TAXATION', 'LOCAL', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 39-3-119.5', 'https://cdola.colorado.gov/property-taxation', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-015', 'CO-TAX-015', 'Colorado Severance Tax — Oil and Gas', 'Colorado imposes a severance tax on oil and gas production at graduated rates based on gross income from production.', 'TAXATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 39-29-105', 'https://tax.colorado.gov/severance-tax', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-016', 'CO-TAX-016', 'Colorado Severance Tax — Coal', 'Colorado imposes a severance tax on coal production based on tons produced and quarterly indexing.', 'TAXATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 39-29-106', 'https://tax.colorado.gov/severance-tax', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-017', 'CO-TAX-017', 'Colorado Severance Tax — Metallic Minerals', 'Colorado imposes a severance tax on the gross income from extraction of metallic minerals (gold, silver, molybdenum, etc.).', 'TAXATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 39-29-103', 'https://tax.colorado.gov/severance-tax', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-018', 'CO-TAX-018', 'Colorado Marijuana Excise Tax', 'Colorado imposes a 15% excise tax on the first sale or transfer of unprocessed retail marijuana from cultivation to retail facility.', 'TAXATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 39-28.8-302', 'https://tax.colorado.gov/marijuana-taxes', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-019', 'CO-TAX-019', 'Colorado Marijuana Special Sales Tax', 'Colorado imposes a 15% special sales tax on retail marijuana sales in addition to standard sales tax.', 'TAXATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 39-28.8-202', 'https://tax.colorado.gov/marijuana-taxes', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-020', 'CO-TAX-020', 'Colorado No Estate Tax', 'Colorado has no state estate tax or inheritance tax; the state estate tax was repealed and is tied to the federal estate tax credit which no longer exists.', 'TAXATION', 'STATE', 'CO', '["SOLE_PROPRIETORSHIP","LLC","CORPORATION","S_CORP","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 39-23.5-102', 'https://tax.colorado.gov/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-021', 'CO-TAX-021', 'Colorado Lodging Tax', 'Counties and municipalities may impose lodging/accommodations taxes on short-term rentals and hotels in addition to state sales tax.', 'TAXATION', 'LOCAL', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 30-11-107.5', 'https://tax.colorado.gov/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-022', 'CO-TAX-022', 'Colorado Local Occupational Privilege Tax', 'Several Colorado cities (Denver, Aurora, Glendale, Greenwood Village, Sheridan) impose an occupational privilege tax (OPT) on employees and employers working in the city.', 'TAXATION', 'LOCAL', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'Denver Rev. Mun. Code § 53-31', 'https://www.denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Department-of-Finance/Treasury/Business-Tax-Information', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-023', 'CO-TAX-023', 'Colorado Withholding Tax', 'Employers must withhold Colorado income tax from wages paid to Colorado employees and remit to the Department of Revenue based on filing frequency.', 'TAXATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'C.R.S. § 39-22-604', 'https://tax.colorado.gov/withholding-tax', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-024', 'CO-TAX-024', 'Colorado Pass-Through Entity Tax (SALT Cap Workaround)', 'Colorado allows pass-through entities to elect to pay state income tax at the entity level, providing a federal SALT cap workaround.', 'TAXATION', 'STATE', 'CO', '["LLC","S_CORP","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 39-22-340', 'https://tax.colorado.gov/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-025', 'CO-TAX-025', 'Colorado Estimated Tax Payments', 'Individuals and corporations expecting to owe more than $1,000 in Colorado income tax must make quarterly estimated payments.', 'TAXATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 39-22-606', 'https://tax.colorado.gov/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-026', 'CO-TAX-026', 'Colorado Sales Tax License', 'Businesses making retail sales in Colorado must obtain a Colorado Sales Tax License from the Department of Revenue. Standard license is $16 plus $50 deposit.', 'TAXATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 39-26-103', 'https://tax.colorado.gov/sales-tax-license', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-027', 'CO-TAX-027', 'Colorado Cigarette and Tobacco Tax', 'Colorado imposes excise taxes on cigarettes, other tobacco products, and nicotine products. Voter-approved Proposition EE increased rates significantly.', 'TAXATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 39-28-103', 'https://tax.colorado.gov/cigarette-tobacco-and-nicotine-products', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-028', 'CO-TAX-028', 'Colorado Liquor Excise Tax', 'Colorado imposes liquor excise taxes on alcoholic beverages at varying rates based on type (beer, wine, spirits) and alcohol content.', 'TAXATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 44-3-503', 'https://tax.colorado.gov/liquor-excise-tax', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-029', 'CO-TAX-029', 'Colorado Gasoline and Special Fuel Tax', 'Colorado imposes excise taxes on gasoline and special fuels used in motor vehicles, dedicated to highway funding.', 'TAXATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 39-27-102', 'https://tax.colorado.gov/fuel-tax', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-030', 'CO-TAX-030', 'Colorado Insurance Premium Tax', 'Insurance companies pay a premium tax on Colorado premiums in lieu of Colorado income tax on insurance operations.', 'TAXATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP"]', '2024-01-01', 'C.R.S. § 10-3-209', 'https://doi.colorado.gov/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-031', 'CO-TAX-031', 'Colorado Conservation Easement Tax Credit', 'Colorado offers a state income tax credit for the donation of qualified conservation easements, subject to caps and recapture rules.', 'TAXATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 39-22-522', 'https://tax.colorado.gov/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-032', 'CO-TAX-032', 'Colorado Enterprise Zone Tax Credits', 'Businesses located in designated Colorado enterprise zones may qualify for investment, jobs, and other state tax credits.', 'TAXATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 39-30-104', 'https://choosecolorado.com/programs-initiatives/enterprise-zones/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-033', 'CO-TAX-033', 'Colorado Job Growth Incentive Tax Credit', 'Colorado offers a performance-based job growth incentive tax credit for businesses creating qualifying net new jobs in Colorado.', 'TAXATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 39-22-531', 'https://choosecolorado.com/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-034', 'CO-TAX-034', 'Colorado Sales Tax Exemption — Manufacturing', 'Colorado exempts machinery used directly and predominantly in manufacturing tangible personal property for sale from sales and use tax.', 'TAXATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 39-26-709', 'https://tax.colorado.gov/sales-tax-exemptions', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-tax-035', 'CO-TAX-035', 'Colorado Annual Income Tax Return Due Date', 'Colorado individual and corporate income tax returns are due on the 15th day of the fourth month following the close of the taxable year (April 15 for calendar year).', 'TAXATION', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]', '2024-01-01', 'C.R.S. § 39-22-608', 'https://tax.colorado.gov/', 1);

-- ============================================================
-- EMPLOYMENT (70 rules) — IDs start at co-emp-101
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-emp-101', 'CO-EMP-101', 'Colorado Minimum Wage 2024', 'Colorado minimum wage is $14.42 per hour effective January 1, 2024 ($11.40 for tipped employees). Adjusted annually for inflation. Some local jurisdictions (Denver) have higher rates.', 'EMPLOYMENT', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'Colo. Const. art. XVIII, § 15; C.R.S. § 8-6-106', 'https://cdle.colorado.gov/laws-regulations-guidance/wage-and-hour-laws', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-emp-102', 'CO-EMP-102', 'Denver Local Minimum Wage', 'Denver imposes a local minimum wage higher than the state rate, adjusted annually. Employers performing work in Denver must pay the Denver rate for hours worked in the city.', 'EMPLOYMENT', 'LOCAL', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'Denver Rev. Mun. Code § 58-16', 'https://www.denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Denver-Labor', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-emp-103', 'CO-EMP-103', 'Colorado COMPS Order — Overtime', 'Under the Colorado Overtime and Minimum Pay Standards (COMPS) Order, employees must receive overtime at 1.5x regular rate for hours over 40 per workweek, over 12 per day, or over 12 consecutive hours.', 'EMPLOYMENT', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', '7 CCR 1103-1 (COMPS Order)', 'https://cdle.colorado.gov/laws-regulations-guidance/comps-order', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-emp-104', 'CO-EMP-104', 'Colorado COMPS — Meal Periods', 'Under the COMPS Order, employees who work shifts of more than 5 hours must be provided with a 30-minute uninterrupted meal period.', 'EMPLOYMENT', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', '7 CCR 1103-1 Rule 5.1', 'https://cdle.colorado.gov/laws-regulations-guidance/comps-order', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-emp-105', 'CO-EMP-105', 'Colorado COMPS — Rest Periods', 'Under the COMPS Order, employees must be provided 10-minute paid rest periods for every 4 hours worked or major fraction thereof.', 'EMPLOYMENT', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', '7 CCR 1103-1 Rule 5.2', 'https://cdle.colorado.gov/laws-regulations-guidance/comps-order', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-emp-106', 'CO-EMP-106', 'Colorado HFWA — Paid Sick Leave Accrual', 'Under the Healthy Families and Workplaces Act (HFWA), employees accrue 1 hour of paid sick leave per 30 hours worked, up to 48 hours per year.', 'EMPLOYMENT', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'C.R.S. § 8-13.3-403', 'https://cdle.colorado.gov/hfwa', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-emp-107', 'CO-EMP-107', 'Colorado HFWA — Permitted Uses', 'HFWA paid sick leave may be used for the employee or family member''s illness, preventive care, mental or physical health, domestic violence, public health emergencies, and care of family members.', 'EMPLOYMENT', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'C.R.S. § 8-13.3-404', 'https://cdle.colorado.gov/hfwa', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-emp-108', 'CO-EMP-108', 'Colorado HFWA — Public Health Emergency Leave', 'During a declared public health emergency, employers must supplement existing sick leave to ensure full-time employees have access to up to 80 hours of paid leave.', 'EMPLOYMENT', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'C.R.S. § 8-13.3-405', 'https://cdle.colorado.gov/hfwa', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-emp-109', 'CO-EMP-109', 'Colorado FAMLI — Premium Contributions', 'The Family and Medical Leave Insurance (FAMLI) program is funded by a 0.9% premium on wages, split equally between employer and employee for employers with 10+ employees.', 'EMPLOYMENT', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'C.R.S. § 8-13.3-507', 'https://famli.colorado.gov/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-emp-110', 'CO-EMP-110', 'Colorado FAMLI — Benefit Eligibility', 'Eligible workers may receive up to 12 weeks of paid family and medical leave per year (16 weeks for pregnancy/childbirth complications) at up to 90% of wages.', 'EMPLOYMENT', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'C.R.S. § 8-13.3-505', 'https://famli.colorado.gov/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-emp-111', 'CO-EMP-111', 'Colorado FAMLI — Job Protection', 'Workers who have been with their employer for at least 180 days are entitled to job protection during FAMLI leave.', 'EMPLOYMENT', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'C.R.S. § 8-13.3-509', 'https://famli.colorado.gov/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-emp-112', 'CO-EMP-112', 'Colorado Equal Pay for Equal Work — Salary Range Disclosure', 'Under the Equal Pay for Equal Work Act, employers must include the pay range and benefits in every job posting for positions performed in Colorado. Strongest pay transparency law in the nation.', 'EMPLOYMENT', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'C.R.S. § 8-5-201', 'https://cdle.colorado.gov/equalpaytransparency', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-emp-113', 'CO-EMP-113', 'Colorado Equal Pay — Promotion Notification', 'Employers must notify all Colorado employees of promotional opportunities and post information about the promotional process before making promotion decisions.', 'EMPLOYMENT', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'C.R.S. § 8-5-201(2)', 'https://cdle.colorado.gov/equalpaytransparency', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-emp-114', 'CO-EMP-114', 'Colorado Equal Pay — Wage Discrimination Prohibition', 'Employers may not pay employees of one sex less than employees of another sex for substantially similar work, except based on enumerated bona fide factors.', 'EMPLOYMENT', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'C.R.S. § 8-5-102', 'https://cdle.colorado.gov/equalpaytransparency', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-emp-115', 'CO-EMP-115', 'Colorado Equal Pay — Job Opportunity Records', 'Employers must keep records of job descriptions and wage rate history for each employee for the duration of employment plus two years after end of employment.', 'EMPLOYMENT', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'C.R.S. § 8-5-202', 'https://cdle.colorado.gov/equalpaytransparency', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-emp-116', 'CO-EMP-116', 'Colorado CADA — Employment Discrimination', 'The Colorado Anti-Discrimination Act prohibits discrimination in employment based on disability, race, creed, color, sex, sexual orientation, gender identity, religion, age, national origin, ancestry, or marriage to a coworker.', 'EMPLOYMENT', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'C.R.S. § 24-34-402', 'https://ccrd.colorado.gov/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-emp-117', 'CO-EMP-117', 'Colorado POWR Act — Harassment Standard', 'The Protecting Opportunities and Workers'' Rights (POWR) Act lowered the standard for harassment claims, eliminating the "severe or pervasive" requirement under state law.', 'EMPLOYMENT', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'C.R.S. § 24-34-402(1)(a)', 'https://ccrd.colorado.gov/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-emp-118', 'CO-EMP-118', 'Colorado Noncompete Near-Ban (HB 22-1317)', 'Colorado largely prohibits noncompete agreements except for highly compensated workers (above the threshold, currently $123,750) and in narrow circumstances (sale of business, trade secret protection).', 'EMPLOYMENT', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'C.R.S. § 8-2-113', 'https://cdle.colorado.gov/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-emp-119', 'CO-EMP-119', 'Colorado Noncompete — Notice Requirement', 'Employers must provide noncompete agreements to prospective employees before acceptance of an offer and to current employees at least 14 days before effective date.', 'EMPLOYMENT', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'C.R.S. § 8-2-113(4)', 'https://cdle.colorado.gov/', 1);

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES
('co-emp-120', 'CO-EMP-120', 'Colorado Customer Nonsolicitation Threshold', 'Customer nonsolicitation agreements are enforceable only against highly compensated workers earning at least 60% of the highly compensated worker threshold.', 'EMPLOYMENT', 'STATE', 'CO', '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]', '2024-01-01', 'C.R.S. § 8-2-113(2)(b)', 'https://cdle.colorado.gov/', 1);

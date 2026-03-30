-- Vernen Legal Compliance — Industry-Specific: Financial Services
-- The Complete Book: Financial Services Compliance
-- Created: March 17, 2026
--
-- Coverage:
--   Federal: Dodd-Frank, TILA, RESPA, ECOA, FCRA (operational), CFPB,
--     BSA/AML (operational), OFAC, SOX (operational), FINRA, SEC,
--     Community Reinvestment Act, FDIC/OCC requirements
--   State: Money transmitter licensing, lending laws, usury limits,
--     state banking regulations, collection practices

-- ============================================================
-- FEDERAL FINANCIAL SERVICES RULES
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('fed-fin-001', 'FED-FIN-001', 'Truth in Lending Act (TILA) / Regulation Z',
 'Creditors must provide clear, standardized disclosure of credit terms to consumers. Requires: APR disclosure, finance charges, payment schedule, total of payments, right of rescission (3 days for home-secured transactions). Covers: credit cards, mortgages, auto loans, personal loans. Ability-to-Repay (ATR) requirement for residential mortgages. Qualified Mortgage (QM) safe harbor. Penalties: statutory damages ($100-$5,000 individual, up to $1M class action), plus actual damages and attorney fees.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '15 USC § 1601-1667f; 12 CFR Part 1026 (Reg Z)', 'https://www.consumerfinance.gov/rules-policy/regulations/1026/', 1),

('fed-fin-002', 'FED-FIN-002', 'Real Estate Settlement Procedures Act (RESPA) / Regulation X',
 'Mortgage lenders and servicers must: provide Loan Estimate within 3 business days of application, provide Closing Disclosure 3 days before closing, use TRID integrated disclosures (since 2015). Prohibits: kickbacks/referral fees for settlement services, requiring specific title insurance companies (with exceptions), fee-splitting except for actual services rendered. Mortgage servicers: must acknowledge QWR within 5 days, respond within 30 days, provide loss mitigation options before foreclosure.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 NULL, '12 USC § 2601-2617; 12 CFR Part 1024 (Reg X)', 'https://www.consumerfinance.gov/rules-policy/regulations/1024/', 1),

('fed-fin-003', 'FED-FIN-003', 'Equal Credit Opportunity Act (ECOA) / Regulation B',
 'Creditors may not discriminate against credit applicants on the basis of: race, color, religion, national origin, sex (including sexual orientation and gender identity per CFPB interpretation), marital status, age (if applicant has capacity), receipt of public assistance, or good faith exercise of rights under the Consumer Credit Protection Act. Must: provide reasons for adverse action within 30 days, retain records for 25 months. Applies to ALL creditors — banks, retailers, credit card companies, finance companies.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '15 USC § 1691-1691f; 12 CFR Part 1002 (Reg B)', 'https://www.consumerfinance.gov/rules-policy/regulations/1002/', 1),

('fed-fin-004', 'FED-FIN-004', 'Dodd-Frank Wall Street Reform — Key Provisions',
 'Comprehensive financial reform (2010): created CFPB for consumer financial protection, established Financial Stability Oversight Council (FSOC), Volcker Rule (restricts proprietary trading by banks), orderly liquidation authority, derivatives regulation (Title VII — cleared through exchanges), enhanced prudential standards for SIFIs ($250B+ total assets), stress testing requirements, risk retention for securitizers (5%), SOX-like whistleblower protections. Affects banks, broker-dealers, insurance companies, payment processors.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["CORPORATION","LLC","S_CORP","PARTNERSHIP"]',
 '2010-07-21', '12 USC § 5301-5641 (Dodd-Frank Act)', 'https://www.cftc.gov/LawRegulation/DoddFrankAct/index.htm', 1),

('fed-fin-005', 'FED-FIN-005', 'BSA/AML Compliance Program Requirements — Financial Institutions',
 'Financial institutions must implement and maintain a BSA/AML compliance program with 5 pillars: (1) internal policies/procedures/controls, (2) designated BSA compliance officer, (3) ongoing employee training, (4) independent testing/audit, (5) risk-based Customer Due Diligence (CDD) procedures including beneficial ownership identification. Customer Identification Program (CIP) required. Enhanced Due Diligence (EDD) for high-risk customers. Suspicious Activity Reports (SARs) must be filed within 30 days.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 NULL, '31 USC § 5311-5332; 31 CFR Chapter X; FinCEN CDD Rule', 'https://www.fincen.gov/resources/statutes-and-regulations', 1),

('fed-fin-006', 'FED-FIN-006', 'OFAC Sanctions Compliance',
 'ALL US persons (including financial institutions and businesses) must comply with OFAC economic sanctions programs. Must: screen transactions and customers against the Specially Designated Nationals (SDN) List, blocked persons lists, and sectoral sanctions. Must block/reject prohibited transactions. Financial institutions must report blocked property annually. Risk-based compliance programs expected. Penalties: up to $361,000 per violation (civil), $1M and 20 years imprisonment (criminal). Strict liability — no intent required for civil penalties.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, '50 USC § 1701-1706 (IEEPA); 31 CFR Part 501', 'https://ofac.treasury.gov/', 1),

('fed-fin-007', 'FED-FIN-007', 'CFPB Unfair, Deceptive, or Abusive Acts or Practices (UDAAP)',
 'The CFPB has authority to take action against entities engaging in unfair, deceptive, or abusive acts or practices in consumer financial services. Unfair: causes/likely to cause substantial injury not reasonably avoidable and not outweighed by benefits. Deceptive: misleading representation/omission likely to mislead reasonable consumer. Abusive: materially interferes with consumer ability to understand terms OR takes unreasonable advantage of lack of understanding/inability to protect interests/reasonable reliance. Applies to all consumer financial products/services.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 '2011-07-21', '12 USC § 5531, 5536', 'https://www.consumerfinance.gov/compliance/supervision-examinations/unfair-deceptive-or-abusive-acts-or-practices-udaaps/', 1),

('fed-fin-008', 'FED-FIN-008', 'Fair Debt Collection Practices Act (FDCPA)',
 'Third-party debt collectors may not: call before 8 AM or after 9 PM, call the workplace if told not to, use threats/profanity/harassment, make false representations about debts, contact consumers who have requested in writing to cease communication (except to confirm cessation or notify of specific actions). Must: validate debts within 5 days of initial contact (written notice with amount, creditor name, dispute rights). CFPB Reg F (2021): added email/text rules, 7-day call frequency limit per debt. Penalties: $1,000 statutory per case, plus actual damages, attorney fees.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, '15 USC § 1692-1692p; 12 CFR Part 1006 (Reg F)', 'https://www.consumerfinance.gov/rules-policy/regulations/1006/', 1),

('fed-fin-009', 'FED-FIN-009', 'Electronic Fund Transfer Act (EFTA) / Regulation E',
 'Financial institutions offering electronic fund transfer services must: provide initial disclosures of terms and fees, provide periodic statements, limit consumer liability for unauthorized transfers ($50 if reported within 2 business days, $500 within 60 days, unlimited after), investigate error claims within 10 business days (45 for new accounts), provide provisional credit during investigation. Covers: ATM, debit card, direct deposit, recurring payments, P2P transfers, prepaid accounts. Reg E updated 2016 for prepaid accounts.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 NULL, '15 USC § 1693-1693r; 12 CFR Part 1005 (Reg E)', 'https://www.consumerfinance.gov/rules-policy/regulations/1005/', 1),

('fed-fin-010', 'FED-FIN-010', 'Community Reinvestment Act (CRA)',
 'Banks and thrifts must meet the credit needs of the communities in which they operate, including low- and moderate-income (LMI) neighborhoods. Regulators evaluate CRA performance on: lending test, investment test, and service test. Ratings: Outstanding, Satisfactory, Needs to Improve, Substantial Noncompliance. Poor CRA ratings can block: mergers, acquisitions, branch openings, other regulatory approvals. Updated 2023 rules (effective 2024-2026): expanded assessment areas, new metrics for retail lending.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["CORPORATION","LLC"]',
 '1977-10-12', '12 USC § 2901-2908; 12 CFR Part 25 (OCC), Part 228 (FRB), Part 345 (FDIC)', 'https://www.ffiec.gov/cra/', 1),

('fed-fin-011', 'FED-FIN-011', 'Payment Card Industry Data Security Standard (PCI DSS)',
 'While not a federal law, PCI DSS is effectively mandatory for all businesses that accept, process, store, or transmit credit card data. Enforced through card network contracts (Visa, Mastercard, Amex, Discover). 12 requirements covering: firewalls, encryption, access control, monitoring, vulnerability management, security policies. 4 compliance levels based on transaction volume. Level 1 (6M+ transactions): requires annual on-site assessment by Qualified Security Assessor (QSA). Non-compliance: fines of $5,000-$100,000/month plus liability for fraud losses.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP","NONPROFIT"]',
 NULL, 'PCI SSC DSS v4.0 (2022); card network operating regulations', 'https://www.pcisecuritystandards.org/', 1);


-- ============================================================
-- STATE FINANCIAL SERVICES — MONEY TRANSMITTER LICENSING
-- (Most commonly needed state financial license)
-- ============================================================

INSERT OR IGNORE INTO compliance_rules (id, code, title, description, category, level, state, entity_types, effective_date, source, source_url, is_active) VALUES

('gen-fin-001', 'GEN-FIN-001', 'State Money Transmitter Licensing',
 'ALL 50 states (except Montana) plus DC require a license for money transmission activities (sending money, currency exchange, payment processing, stored value/prepaid, cryptocurrency/virtual currency exchange in many states). Requirements typically include: surety bond ($25,000-$5,000,000 depending on state and volume), net worth minimums ($25,000-$1,000,000), background checks, audited financials, BSA/AML program, state exam every 1-3 years. NMLS (Nationwide Multistate Licensing System) used in most states. Application process: 3-12 months. State-by-state licensing is the #1 barrier for fintech companies.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 NULL, 'ULC Uniform Money Services Act; state-specific money transmitter acts; NMLS', 'https://www.csbs.org/nmls', 1),

('ca-fin-001', 'CA-FIN-001', 'California Digital Financial Assets Law (DFAL)',
 'Effective July 1, 2025, California requires a license from the Department of Financial Protection and Innovation (DFPI) for businesses engaged in digital financial asset (cryptocurrency) business activity with California residents. Covers: exchange, transfer, storage/custody, buying/selling, lending/borrowing, issuance of stablecoins. Exemptions: banks, licensed money transmitters (separate license), certain payment processors. Requirements: application, background check, financial statements, cybersecurity program.',
 'INDUSTRY_SPECIFIC', 'STATE', 'CA',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 '2025-07-01', 'Cal. Fin. Code § 3100-3803 (AB 39, 2023)', 'https://dfpi.ca.gov/', 1),

('ny-fin-001', 'NY-FIN-001', 'New York BitLicense',
 'New York requires a BitLicense from the Department of Financial Services (DFS) for any business involving virtual currency activities with NY residents. Covers: receiving/transmitting, storing/holding/custody, buying/selling, performing exchange, controlling/administering/issuing virtual currency. Requirements: detailed application ($5,000 fee), cybersecurity program (23 NYCRR 500), BSA/AML compliance, consumer protection, capital requirements, annual audited financials. One of the strictest crypto licensing regimes. Limited purpose trust charter available as alternative.',
 'INDUSTRY_SPECIFIC', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 '2015-08-08', '23 NYCRR Part 200 (BitLicense)', 'https://www.dfs.ny.gov/virtual_currency_businesses', 1),

('ny-fin-002', 'NY-FIN-002', 'New York DFS Cybersecurity Regulation (23 NYCRR 500)',
 'ALL entities licensed by the NY DFS (banks, insurance companies, money transmitters, etc.) must implement a cybersecurity program. Requirements: written cybersecurity policy, CISO designation, risk assessment, penetration testing and vulnerability assessment, access privileges management, application security, audit trail, data governance/classification, encryption (in transit and at rest), incident response plan, third-party service provider security, multi-factor authentication, 72-hour breach notification to DFS. Updated 2023 with enhanced requirements.',
 'INDUSTRY_SPECIFIC', 'STATE', 'NY',
 '["LLC","CORPORATION","S_CORP","PARTNERSHIP"]',
 '2017-03-01', '23 NYCRR Part 500', 'https://www.dfs.ny.gov/industry_guidance/cybersecurity', 1),

('gen-fin-002', 'GEN-FIN-002', 'State Usury and Lending Rate Limits',
 'Most states set maximum interest rates for consumer and commercial loans. Rates vary widely: some states (SD, DE, UT) have no usury caps for certain lenders. Others strictly limit rates: NY (16% civil, 25% criminal), CA (10% or 5% above Fed Reserve rate for personal loans), IL (9%), TX (18% or varying formula). Federal preemption: national banks may export their home state''s rate (Marquette). State-chartered lenders: subject to state where borrower is located. Usurious loans: may be voided, principal-only recovery, or criminal penalties.',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'State usury statutes; Marquette Nat. Bank v. First of Omaha, 439 U.S. 299 (1978)', 'https://www.ncsl.org/financial-services/statewide-usury-laws', 1),

('gen-fin-003', 'GEN-FIN-003', 'State Debt Collection Licensing and Regulation',
 'Most states require debt collectors to be licensed or registered. Requirements vary: surety bond ($5,000-$100,000), background checks, net worth minimums, disclosures. Many states have their own Fair Debt Collection Practices Acts with additional protections beyond federal FDCPA. Key state laws: CA (Rosenthal Act — covers original creditors), NY (requires licensing, additional consumer protections), TX (requires surety bond), MA (strict regulations). Statute of limitations on debt collection varies by state (3-10 years).',
 'INDUSTRY_SPECIFIC', 'FEDERAL', NULL,
 '["LLC","CORPORATION","S_CORP","SOLE_PROPRIETORSHIP","PARTNERSHIP"]',
 NULL, 'State debt collection licensing acts; CA Civ. Code § 1788 (Rosenthal); NY Gen. Bus. Law Art. 29-H', 'https://www.ncsl.org/financial-services/consumer-finance-legislation-database', 1);

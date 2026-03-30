-- Triple constraint UPDATE statements for 409 citizen_catalog personas
-- Generated 2026-03-29

UPDATE citizen_catalog SET
  governing_guidelines = '14 CFR Parts 91, 121, 135; FAA Order 8900.1; AC 91-67; 49 USC Section 44701',
  standards_of_creation = 'FAA MEL/CDL Master Minimum Equipment List standards; MMEL Policy Letters; A4A/ATA iSpec 2200',
  soc_controls = 'FSDO audit program; OpSpec compliance review; MEL deviation tracking and documentation controls'
WHERE name = 'MEL/CDL Program Manager';

UPDATE citizen_catalog SET
  governing_guidelines = '49 USC Section 1131-1154; 49 CFR Part 831; 49 CFR Part 845; ICAO Annex 13',
  standards_of_creation = 'NTSB Academy investigation methodology; ISASI standards; FAA Order 8020.11C',
  soc_controls = 'Party system documentation protocols; factual report peer review; probable cause audit trail; evidence chain of custody'
WHERE name = 'NTSB Aviation Accident Investigator';

UPDATE citizen_catalog SET
  governing_guidelines = '46 USC (Shipping); Jones Act 46 USC Section 30104; DOHSA 46 USC Section 30302; Limitation of Liability Act 46 USC Section 30505; UNCLOS',
  standards_of_creation = 'Maritime Law Association standards; CMI model rules; Lloyd''''s maritime arbitration standards',
  soc_controls = 'Admiralty case file documentation; vessel documentation verification; maritime lien priority audit; limitation fund accounting controls'
WHERE name = 'Admiralty / Maritime Claims Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = 'GINA (42 USC Section 2000ff); 29 CFR Part 1635; HIPAA Genetic Information 45 CFR Section 164.502',
  standards_of_creation = 'EEOC GINA enforcement guidance; ASHG policy standards; NIH Genomic Data Sharing Policy',
  soc_controls = 'GINA complaint investigation protocols; genetic information firewall audit; health plan underwriting review; employment decision documentation'
WHERE name = 'Genetic Information Nondiscrimination Act Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'National Organ Transplant Act 42 USC Section 274; OPTN Final Rule 42 CFR Part 121; CMS CoP 42 CFR Section 482.68-Section 482.104',
  standards_of_creation = 'UNOS/OPTN policies; ASTS practice standards; AST clinical practice guidelines; ACGME transplant fellowship requirements',
  soc_controls = 'OPTN compliance audit; CMS transplant outcome review; organ offer documentation; waitlist management controls; informed consent verification'
WHERE name = 'Transplant Physician (organ-specific medical specialist)';

UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR Parts 1270-1271 (HCT/Ps); PHS Act Section 361; FDA CGTP requirements',
  standards_of_creation = 'AATB Standards for Tissue Banking; FACT-JACIE standards; ISO 34362; AABB cellular therapy standards',
  soc_controls = 'FDA establishment inspection readiness; donor eligibility audit; tissue tracking and traceability; adverse reaction reporting; storage/distribution controls'
WHERE name = 'Tissue Bank Medical Director / Tissue Establishment Director';

UPDATE citizen_catalog SET
  governing_guidelines = 'Securities Act of 1933; CEA 7 USC Section 1; FinCEN MSB 31 CFR Section 1010; state money transmitter laws',
  standards_of_creation = 'AICPA AT-C Section 205; SSAE 18; SOC 2 Type II; AICPA stablecoin attestation guidance',
  soc_controls = 'Monthly reserve attestation; proof of reserves reconciliation; custodian verification; reserve composition audit; redemption testing'
WHERE name = 'Stablecoin Reserve Auditor / Attestation Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'BSA 31 USC Section 5311; Wyoming WS Section 34-29-104; NYDFS BitLicense 23 NYCRR Part 200',
  standards_of_creation = 'NIST SP 800-57; FIPS 140-3; CryptoCurrency Security Standard (CCSS); BIP-39/BIP-32',
  soc_controls = 'Key ceremony audit; multi-signature verification; HSM tamper-evidence; backup/recovery testing; segregation of duties controls'
WHERE name = 'Cryptocurrency Wallet Recovery Specialist / Key Management Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Wyoming DAO LLC Act WS Section 17-31; Vermont BBLLC Act 11 VSA Section 4173; Securities Act Section 5; UCC Article 12',
  standards_of_creation = 'OpenZeppelin smart contract standards; ERC-20/ERC-721; COALA DAO Model Law; a16z governance frameworks',
  soc_controls = 'Smart contract audit (formal verification); governance proposal documentation; token holder voting records; treasury management controls'
WHERE name = 'Decentralized Autonomous Organization Legal Counsel';

UPDATE citizen_catalog SET
  governing_guidelines = 'FATF Recommendation 16 (Travel Rule); FinCEN 31 CFR Section 1010.410; EU MiCA; 5AMLD/6AMLD',
  standards_of_creation = 'FATF Virtual Asset guidance; IVMS101 data standard; TRISA protocol; ISO 20022',
  soc_controls = 'Travel rule compliance testing; VASP counterparty verification; sanctions screening (OFAC/EU/UN); transaction monitoring controls'
WHERE name = 'International Crypto Transfer Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'SEC Staff Accounting Bulletin; PCAOB AS 2201; state digital asset regulations',
  standards_of_creation = 'AICPA AT-C Section 205; Merkle tree proof standards; SSAE 18; CPA cryptoasset attestation guidance',
  soc_controls = 'Cryptographic proof verification; on-chain/off-chain reconciliation; wallet verification; snapshot timing controls; materiality documentation'
WHERE name = 'Proof of Reserves Attestation Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'FTC Act Section 5; SEC Marketing Rule 206(4)-1; FINRA Rule 2210; UK FCA PS22/10; state consumer protection',
  standards_of_creation = 'FTC Endorsement Guides 16 CFR Part 255; NAD/NARB standards; IAB digital advertising standards',
  soc_controls = 'Marketing pre-approval workflow; testimonial disclosure audit; performance claim substantiation; social media monitoring; risk disclaimer verification'
WHERE name = 'Cryptocurrency Marketing and Advertising Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'OCC 2023-17; FDIC FIL-44-2008; Federal Reserve SR 13-19; state bank partnership laws',
  standards_of_creation = 'FFIEC IT Examination Handbook; AICPA SOC 2; BITS Framework; ABA BaaS practices',
  soc_controls = 'Partner bank oversight audit; middleware compliance testing; complaint routing verification; BSA/AML delegation controls; regulatory reporting reconciliation'
WHERE name = 'Banking-as-a-Service Partnership Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'National Bank Act 12 USC Section 1; OCC Special Purpose Charter framework; state fintech sandbox laws; CSBS Vision 2020',
  standards_of_creation = 'OCC Licensing Manual; CSBS Model Regulatory Framework; NMLS standards',
  soc_controls = 'Charter condition tracking; capital adequacy monitoring; CRA commitment documentation; examination preparation; conditional approval milestone audit'
WHERE name = 'Fintech Charter Compliance Officer (OCC/State)';

UPDATE citizen_catalog SET
  governing_guidelines = 'OCC 2023-17; FDIC FIL-44-2008; Federal Reserve SR 13-19; FFIEC IT guidance; EU DORA',
  standards_of_creation = 'FFIEC IT Examination Handbook; ISO 27001; NIST CSF; BITS SIG; SOC 2 Type II',
  soc_controls = 'Vendor risk assessment scoring; fourth-party risk identification; contract compliance monitoring; BCP testing; DPIA documentation'
WHERE name = 'Third-Party Technology Risk Manager (Financial Services)';

UPDATE citizen_catalog SET
  governing_guidelines = 'PCI DSS v4.0; PCI SSC QSA Qualification Requirements; state breach notification laws; GLBA Safeguards Rule',
  standards_of_creation = 'PCI SSC QSA Program Guide; PA-DSS; PCI P2PE; PCI Card Production; ASV Program Guide',
  soc_controls = 'QSA quality assurance program; ROC documentation; compensating control validation; sampling methodology; evidence retention controls'
WHERE name = 'PCI-DSS Qualified Security Assessor (QSA)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Federal Reserve Reg J 12 CFR Part 210; FedNow Operating Rules; NACHA Rules; Reg E 12 CFR Part 1005',
  standards_of_creation = 'ISO 20022; FedNow participation requirements; TCH RTP Network rules; NACHA instant payment standards',
  soc_controls = 'Real-time fraud monitoring; exception handling audit; settlement finality verification; Reg E error resolution; sanction screening latency testing'
WHERE name = 'Instant Payments Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Card Brand Operating Regulations (Visa/MC/Amex); PCI DSS v4.0; state money transmitter laws; BSA/AML 31 CFR Section 1010',
  standards_of_creation = 'Visa PayFac model; Mastercard PF Program Guide; NACHA Third-Party Sender rules; ETA PayFac guidelines',
  soc_controls = 'Sub-merchant due diligence audit; transaction monitoring; chargeback management; PCI validation; MCC accuracy review'
WHERE name = 'Payment Facilitator Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Reg E 12 CFR Part 1005; state money transmitter laws; PCI DSS v4.0; CFPB Larger Participant Rule; EU PSD2',
  standards_of_creation = 'EMVCo tokenization; FIDO authentication standards; PCI Mobile Payment Acceptance; ISO 12812',
  soc_controls = 'Mobile app security testing; tokenization audit; Reg E error resolution tracking; biometric authentication controls; dispute documentation'
WHERE name = 'Digital Wallet / Mobile Payment Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Reg E Subpart B 12 CFR Section 1005.18; FinCEN Prepaid Access 31 CFR Section 1010.100(ff); CFPB Prepaid Rule; state MTL',
  standards_of_creation = 'CFPB Prepaid model disclosures; network brand standards; NACHA prenote standards',
  soc_controls = 'Fee disclosure audit; Reg E short-form/long-form testing; load limit monitoring; SAR filing; expiration/inactivity fee documentation'
WHERE name = 'Prepaid Access Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'TILA/Reg Z 12 CFR Part 1026; ECOA/Reg B 12 CFR Part 1002; state lending licenses; OCC third-party guidance; CFPB enforcement',
  standards_of_creation = 'Responsible lending principles (CRL); FFIEC Examination Manual; marketplace lending best practices',
  soc_controls = 'True lender analysis; rate/fee disclosure audit; fair lending testing; partner bank oversight; adverse action notice compliance'
WHERE name = 'Embedded Finance / Platform Lending Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'TILA/Reg Z 12 CFR Part 1026; CFPB BNPL Interpretive Rule; state lending/BNPL laws; FTC Act Section 5; ECOA/Reg B',
  standards_of_creation = 'CFPB BNPL market report standards; responsible lending principles; Reg Z periodic statement requirements',
  soc_controls = 'Dispute resolution audit; late fee disclosure verification; credit reporting accuracy; autopay authorization documentation; merchant integration testing'
WHERE name = 'BNPL Program Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA FCC Section Section 22470-22479.5; NV SB 290; CFPB advisory opinions; state lending/MTL laws',
  standards_of_creation = 'FiSCA EWA Best Practices; responsible EWA design principles; CFPB Sandbox no-action letter conditions',
  soc_controls = 'Tip/fee transparency audit; payroll integration controls; consumer repayment documentation; state licensing tracking; complaint resolution'
WHERE name = 'Earned Wage Access Program Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Investment Advisers Act of 1940 15 USC Section 80b; SEC Reg BI; SEC Robo-Adviser Guidance IM-2017-02; DOL fiduciary rule',
  standards_of_creation = 'CFP Board fiduciary standards; CFA Institute Standards; SEC/FINRA examination priorities; GIPS',
  soc_controls = 'Algorithm suitability testing; rebalancing audit trail; risk profile documentation; ADV Part 2A compliance; best execution monitoring'
WHERE name = 'Automated Investment Advisor Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'ECOA/Reg B 12 CFR Part 1002; FCRA 15 USC Section 1681; SR 11-7; CFPB adverse action requirements; EU AI Act',
  standards_of_creation = 'OCC Model Risk Handbook; FFIEC Model Risk guidance; NIST AI RMF; IEEE 7010; SR 11-7 validation',
  soc_controls = 'Model validation documentation; disparate impact testing; adverse action reason code audit; model drift monitoring; explainability assessment; champion-challenger testing'
WHERE name = 'AI/ML Credit Model Compliance Officer / Model Risk Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'OCC/Fed/FDIC technology guidance; FFIEC IT Handbook; state fintech regulations; EU DORA; SEC Rule 17a-4',
  standards_of_creation = 'ISO 27001; SOC 2 Type II; NIST CSF; ISACA COBIT; RegTech Council standards',
  soc_controls = 'RegTech validation testing; false positive/negative monitoring; regulatory mapping accuracy; data quality controls; change management documentation'
WHERE name = 'Regulatory Technology Compliance and Validation Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'State fintech sandbox laws (AZ HB 2434, WY SF 0111, UT HB 378); CFPB Trial Disclosure; OCC Innovation Framework',
  standards_of_creation = 'CSBS Innovation Framework; GFIN standards; FCA Regulatory Sandbox guidance',
  soc_controls = 'Sandbox condition tracking; consumer protection safeguard verification; reporting obligation audit; exit/transition planning; risk mitigation controls'
WHERE name = 'Fintech Sandbox Program Compliance Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'Dodd-Frank Section 1073; Reg E Subpart B 12 CFR Section 1005.30-36; BSA/AML 31 USC Section 5311; FATF Rec 16; state MTL',
  standards_of_creation = 'World Bank Remittance Principles; CPMI-IOSCO cross-border standards; SWIFT gpi; ISO 20022',
  soc_controls = 'Remittance disclosure accuracy audit; exchange rate transparency; error resolution testing; sanctions screening documentation; correspondent bank due diligence'
WHERE name = 'International Remittance Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Securities Act Section 4(a)(6); Reg CF 17 CFR Section 227; SEC Form Funding Portal; FINRA Funding Portal Rules',
  standards_of_creation = 'FINRA Funding Portal standards; SEC Reg CF compliance guide; CfPA best practices',
  soc_controls = 'Issuer due diligence documentation; investment limit verification; communication channel monitoring; annual report tracking; bad actor disqualification screening'
WHERE name = 'Crowdfunding Portal Compliance Officer (Registered Funding Portal)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Reg CF 17 CFR Section 227; Securities Act Section 4(a)(6); JOBS Act Title III; SEC Form C',
  standards_of_creation = 'FINRA funding portal rules; SEC Reg CF guidance; AICPA review/audit for Reg CF issuers',
  soc_controls = 'Offering limit compliance ($5M); investor limit calculation; Form C accuracy; financial statement requirements; ongoing reporting tracking'
WHERE name = 'Reg CF Offering Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Reg A+ 17 CFR Section 230.251-263; Securities Act Section 3(b)(2); JOBS Act Title IV; SEC Form 1-A; state Blue Sky coordination',
  standards_of_creation = 'SEC Reg A+ guidance; NASAA Coordinated Review Program; AICPA audit for Reg A+ issuers',
  soc_controls = 'Offering circular accuracy; Tier 1/Tier 2 limit compliance; ongoing reporting (1-K, 1-SA, 1-U); investor qualification; state filing coordination'
WHERE name = 'Reg A+ Offering Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Reg D 17 CFR Section 230.500-508; Securities Act Section 4(a)(2); SEC Form D; state Blue Sky notice; Rule 506(b)/506(c)',
  standards_of_creation = 'SEC Reg D guidance; NASAA Model Accredited Investor Exemption; ABA Private Placement Practices',
  soc_controls = 'Accredited investor verification; Form D filing compliance; general solicitation restrictions audit; bad actor screening; state notice filing tracking'
WHERE name = 'Private Placement Compliance Officer (Reg D)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Securities Act Rule 501(a); SEC 2020 accredited investor amendments; Reg D Rule 506(c) verification requirements',
  standards_of_creation = 'SEC verification methods guidance; third-party verification service standards; FINRA investor verification practices',
  soc_controls = 'Income/net worth verification documentation; professional certification verification; entity qualification testing; letter retention; re-verification timing controls'
WHERE name = 'Accredited Investor Verification Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Uniform Securities Act (2002); state securities statutes (e.g., CA Corp Code Section 25000); NASAA Model Rules; SEC Reg D coordination',
  standards_of_creation = 'NASAA examination standards; NASAA Model Rules; state administrator guidance; FINRA/NASAA coordination',
  soc_controls = 'State registration/exemption filing audit; merit review compliance; broker-dealer registration tracking; enforcement monitoring; fee documentation'
WHERE name = 'State Securities (Blue Sky) Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Securities Act of 1933; TILA/Reg Z; ECOA/Reg B; state lending licenses; CFPB oversight; Reg AB II',
  standards_of_creation = 'SEC registered platform requirements; responsible lending principles; LendIt industry standards',
  soc_controls = 'Loan origination disclosure audit; platform note registration; fair lending testing; default rate reporting; investor suitability documentation'
WHERE name = 'Peer-to-Peer Lending Platform Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA SB 1235/CA FCC Section 22800; NY Commercial Finance Disclosure Law; FTC Act Section 5; UCC Article 9',
  standards_of_creation = 'SBFA best practices; responsible commercial financing principles; state disclosure form standards',
  soc_controls = 'APR-equivalent disclosure accuracy; stacking prevention controls; reconciliation documentation; collection practices audit; broker compensation disclosure'
WHERE name = 'Merchant Cash Advance Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'State commercial financing disclosure laws; UCC Article 9; state lending licenses; FTC Act Section 5; SBA size standards',
  standards_of_creation = 'Responsible commercial financing principles; SBFA best practices; state RBF disclosure standards',
  soc_controls = 'Revenue share calculation audit; repayment cap verification; disclosure accuracy testing; collection controls; financial covenant monitoring'
WHERE name = 'Revenue-Based Financing (RBF) Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'UCC Article 9; state commercial financing disclosure laws; FTC Holder Rule 16 CFR Section 433; state factoring licenses',
  standards_of_creation = 'IFA standards; FCI General Rules; AICPA factoring audit guidance',
  soc_controls = 'Notice of assignment verification; UCC filing accuracy; reserve account reconciliation; debtor notification controls; aging report accuracy review'
WHERE name = 'Factoring / Accounts Receivable Finance Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'UCC Article 2A; TILA/Reg M; state equipment leasing regulations; FASB ASC 842; IRC Section 168 MACRS',
  standards_of_creation = 'ELFA standards; FASB ASC 842 guidance; IRS lease classification standards',
  soc_controls = 'Lease vs. purchase classification audit; residual value documentation; end-of-term compliance; UCC filing controls; FMV appraisal documentation; tax benefit verification'
WHERE name = 'Equipment Finance and Leasing Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'IRC Section 1400Z-1/Section 1400Z-2; Treasury Reg Section 1.1400Z2; IRS Form 8996/8997',
  standards_of_creation = 'IRS OZ program guidance; CDFI Fund OZ reporting; NCSHA OZ standards',
  soc_controls = '90% asset test compliance; holding period tracking; substantial improvement documentation; Form 8996 certification; investor gain deferral documentation'
WHERE name = 'Opportunity Zone Fund Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Small Business Investment Act 15 USC Section 681; 13 CFR Parts 107/121; SBA SOP 10 09',
  standards_of_creation = 'SBA SBIC examination standards; AICPA SBIC audit guide; ILPA principles; SBA SOPs',
  soc_controls = 'Leverage ratio monitoring; SBA annual examination prep; portfolio company size verification; capital impairment testing; Form 468/1031 documentation'
WHERE name = 'SBIC Regulatory Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Investment Advisers Act Section 203(l); SEC Rule 203(l)-1; Dodd-Frank Title IV; state blue sky laws; Form ADV',
  standards_of_creation = 'ILPA Principles; NVCA model legal documents; SEC exempt reporting adviser guidance; AICPA investment company audit guide',
  soc_controls = 'Qualifying investment percentage testing; non-qualifying basket monitoring; leverage/redemption restrictions; Form ADV accuracy; LP disclosure documentation'
WHERE name = 'VC Fund Regulatory Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Securities Act (Reg D, Reg A+, Reg CF); state securities laws; JOBS Act; Reg AB II',
  standards_of_creation = 'SEC crowdfunding guidance; NCREIF standards; USPAP valuation; AICPA real estate fund guide',
  soc_controls = 'Property valuation documentation; investor suitability verification; offering document accuracy; distribution calculation controls; property management reporting'
WHERE name = 'Real Estate Crowdfunding Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'FTC Act Section 5; state consumer protection statutes; state charitable solicitation registration; AG authority',
  standards_of_creation = 'FTC Crowdfunding guidance; BBB Wise Giving Alliance; state AG charitable solicitation standards',
  soc_controls = 'Campaign promise fulfillment tracking; fee disclosure verification; refund/dispute audit; charitable solicitation registration; creator identity verification'
WHERE name = 'Donation and Rewards Crowdfunding Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'SEC Climate Disclosure Rules; EU Green Bond Standard; EU Taxonomy; TCFD; SEC ESG naming rule',
  standards_of_creation = 'ICMA Green Bond Principles; CBI Climate Bonds Standard; GRI Standards; SASB; ISSB IFRS S1/S2',
  soc_controls = 'Use of proceeds verification; green bond impact reporting; second-party opinion validation; taxonomy alignment testing; greenwashing risk assessment'
WHERE name = 'ESG and Green Bond Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'NHPA Section 106 (54 USC Section 306108); Secretary of Interior''''s Standards; 36 CFR Parts 60, 63, 68, 800; state historic preservation acts',
  standards_of_creation = 'Secretary of Interior''''s Standards and Guidelines; NPS Preservation Briefs; ACHP Section 106 guidance; APA standards',
  soc_controls = 'Section 106 consultation documentation; SHPO/THPO coordination records; adverse effect determination; HTC compliance; preservation easement monitoring'
WHERE name = 'Historic Preservation Planner / Qualified Professional per Secretary of Interior''s Standards';

UPDATE citizen_catalog SET
  governing_guidelines = 'Title VII 42 USC Section 2000e; ADA 42 USC Section 12101; ADEA 29 USC Section 621; Equal Pay Act 29 USC Section 206(d); GINA; 29 CFR Parts 1600-1699',
  standards_of_creation = 'EEOC Compliance Manual; EEOC Enforcement Guidance; 29 CFR Part 1614; SHRM investigation standards',
  soc_controls = 'Charge investigation documentation; position statement review; statistical analysis methodology; reasonable cause audit trail; conciliation documentation'
WHERE name = 'Equal Employment Opportunity Investigator';

UPDATE citizen_catalog SET
  governing_guidelines = '42 USC Section 1983; 42 USC Section 1988; Monell v. Dep''''t of Social Services; qualified immunity doctrine; 14th Amendment',
  standards_of_creation = 'Federal Judicial Center Section 1983 guidance; ACLU litigation standards; ABA Section of Civil Rights',
  soc_controls = 'Constitutional violation documentation; exhaustion verification; statute of limitations tracking; qualified immunity analysis; fee petition documentation'
WHERE name = 'Civil Rights Litigator (Section 1983)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Bivens v. Six Unknown Named Agents; FTCA 28 USC Section 2671; 5th Amendment; 4th Amendment; 8th Amendment',
  standards_of_creation = 'Federal Judicial Center Bivens guidance; DOJ Civil Division standards; ABA Federal Practice Manual',
  soc_controls = 'Constitutional violation documentation; new context/special factors analysis; alternative remedies exhaustion; sovereign immunity analysis; administrative claim tracking'
WHERE name = 'Federal Constitutional Tort Litigator (Bivens)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Voting Rights Act of 1965 (52 USC Section 10301); NVRA; HAVA; 14th/15th Amendments; state election codes',
  standards_of_creation = 'DOJ Voting Section standards; EAC Election Administration guidelines; ABA Election Law standards; Brennan Center practices',
  soc_controls = 'Section 2 analysis documentation; redistricting compliance; voter roll maintenance review; polling place accessibility; election challenge documentation'
WHERE name = 'Voting Rights Litigator / Election Law Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = '14th Amendment Equal Protection; 42 USC Section 1983; strict/intermediate scrutiny/rational basis; Title VI 42 USC Section 2000d',
  standards_of_creation = 'ABA Constitutional Litigation standards; Federal Judicial Center classification analysis; ACLU equal protection standards',
  soc_controls = 'Classification analysis documentation; scrutiny level determination; statistical disparity methodology; comparator identification; compelling interest analysis'
WHERE name = 'Equal Protection Clause Litigator / Constitutional Law Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = '1st Amendment; 42 USC Section 1983; Pickering/Connick balancing test; Garcetti v. Ceballos',
  standards_of_creation = 'ABA First Amendment litigation standards; Reporters Committee guidelines; ACLU First Amendment Project',
  soc_controls = 'Protected activity identification; causal connection evidence; temporal proximity analysis; retaliatory motive evidence; chilling effect assessment'
WHERE name = 'First Amendment Retaliation Litigator';

UPDATE citizen_catalog SET
  governing_guidelines = '42 USC Section 14141; 34 USC Section 12601; Title VI 42 USC Section 2000d; ADA Title II; Violent Crime Control Act',
  standards_of_creation = 'DOJ Civil Rights Division Special Litigation protocols; consent decree monitoring standards; DOJ investigation methodology',
  soc_controls = 'Pattern or practice investigation documentation; statistical analysis methodology; witness interview protocols; consent decree monitoring; technical assistance documentation'
WHERE name = 'DOJ Civil Rights Division Investigator (Special Litigation Section)';

UPDATE citizen_catalog SET
  governing_guidelines = '14th Amendment; Title VI 42 USC Section 2000d; CA Penal Code Section 13519.4; RIPA CA Gov Code Section 12525.5',
  standards_of_creation = 'DOJ Guidance on Use of Race; PERF Biased Policing guidance; IACP policy standards; CALEA standards',
  soc_controls = 'Stop data collection and analysis; statistical disparity testing; early warning system monitoring; complaint pattern analysis; bias training documentation'
WHERE name = 'Racial Profiling Analyst / Biased Policing Data Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = '8th Amendment; 42 USC Section 1983; PLRA 42 USC Section 1997e; ADA Title II; RLUIPA 42 USC Section 2000cc; Estelle v. Gamble',
  standards_of_creation = 'ABA Standards (Treatment of Prisoners); NCCHC Standards; ACA accreditation; DOJ CRIPA investigation standards',
  soc_controls = 'Conditions documentation; medical care adequacy audit; grievance system review; use of force review; restrictive housing monitoring; consent decree tracking'
WHERE name = 'Prisoners'' Rights Attorney / Correctional Conditions Litigator';

UPDATE citizen_catalog SET
  governing_guidelines = '4th Amendment; PREA 34 USC Section 30301; 42 USC Section 1983; state custodial search statutes; Florence v. Board of Chosen Freeholders',
  standards_of_creation = 'DOJ PREA Standards 28 CFR Part 115; ACA accreditation; NCCHC screening standards',
  soc_controls = 'Search policy compliance audit; PREA documentation; cross-gender search restrictions; body cavity search authorization controls; strip search justification review'
WHERE name = 'Custodial Search Policy Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Brown v. Board; 14th Amendment; Title IV 42 USC Section 2000c; Title VI 42 USC Section 2000d; court-ordered decrees',
  standards_of_creation = 'DOJ desegregation guidance; OCR compliance standards; Swann/Green factors analysis',
  soc_controls = 'Student assignment data analysis; faculty diversity monitoring; resource equity audit; magnet program review; unitary status documentation; court reporting compliance'
WHERE name = 'Desegregation Order Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Executive Order 14096; Title VI 42 USC Section 2000d; NEPA 42 USC Section 4321; Clean Air Act; EPA EJ 2030 Agenda',
  standards_of_creation = 'EPA Environmental Justice guidance; CEQ NEPA EJ guidance; EJSCREEN; CalEnviroScreen',
  soc_controls = 'Disparate impact analysis; cumulative impact assessment; community engagement documentation; permit review EJ analysis; mitigation measure tracking'
WHERE name = 'Environmental Justice Compliance Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'Matthew Shepard Act 18 USC Section 249; 42 USC Section 3631; state hate crime statutes; FBI UCR Hate Crime Statistics Act',
  standards_of_creation = 'FBI UCR Hate Crime Guidelines; IACP investigation standards; ADL/SPLC methodologies; DOJ CRS protocols',
  soc_controls = 'Bias motivation evidence documentation; enhanced penalty qualification; victim impact documentation; statistical trend analysis; community notification compliance'
WHERE name = 'Hate Crime / Bias Crime Investigator';

UPDATE citizen_catalog SET
  governing_guidelines = '4th Amendment (Graham v. Connor); 14th Amendment; 42 USC Section 1983; Tennessee v. Garner; state use of force statutes',
  standards_of_creation = 'IACP National Consensus Policy; PERF Guiding Principles; DOJ Use of Force Policy; CALEA Chapter 1',
  soc_controls = 'Force incident documentation audit; de-escalation assessment; proportionality analysis; BWC review protocol; administrative/criminal parallel tracking; early intervention monitoring'
WHERE name = 'Use of Force Review Analyst / Force Investigation Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = '28 USC Section 2254; 28 USC Section 2255; AEDPA; state post-conviction statutes; Brady v. Maryland',
  standards_of_creation = 'Innocence Project standards; ABA Wrongful Conviction guidelines; National Registry of Exonerations; NACDL standards',
  soc_controls = 'Actual innocence evidence documentation; DNA testing procedures; Brady/Giglio violation identification; IAC analysis; newly discovered evidence documentation'
WHERE name = 'Post-Conviction / Innocence Project Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = 'ICCPR Optional Protocol; ICESCR OP; CAT OP; CEDAW OP; CRPD OP; UN treaty body rules',
  standards_of_creation = 'UN OHCHR individual complaint guidance; treaty body jurisprudence; Geneva Academy model submissions',
  soc_controls = 'Domestic remedies exhaustion documentation; admissibility checklist; victim status verification; state party response tracking; decision implementation monitoring'
WHERE name = 'UN Individual Complaint Procedure Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'American Convention on Human Rights; IACHR Rules of Procedure; Inter-American Court Statute; OAS Charter; Protocol of San Salvador',
  standards_of_creation = 'IACHR petition guidance; Inter-American Court practice directions; CEJIL litigation standards',
  soc_controls = 'Petition admissibility documentation; domestic remedies exhaustion; precautionary measures procedures; merits hearing preparation; compliance monitoring'
WHERE name = 'Inter-American Human Rights System Litigator';

UPDATE citizen_catalog SET
  governing_guidelines = 'TVPA 22 USC Section 7101; 18 USC Section 1589-1592; Palermo Protocol; state trafficking statutes',
  standards_of_creation = 'DOJ Human Trafficking Prosecution Unit standards; DHS Blue Campaign; OSCE/ODIHR guidance; IOM victim identification',
  soc_controls = 'Victim identification and certification; T-visa/U-visa tracking; trauma-informed interview protocols; multi-agency coordination; restitution calculation'
WHERE name = 'Human Trafficking Investigation Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Tariff Act Section 307 (19 USC Section 1307); Uyghur Forced Labor Prevention Act; ILO Convention 29/105; 18 USC Section 1589; CA Supply Chains Act',
  standards_of_creation = 'ILO Forced Labour indicators; CBP WRO guidance; DOL ILAB standards; UN Guiding Principles on Business and Human Rights',
  soc_controls = 'Supply chain mapping; WRO compliance; forced labor indicator assessment; import documentation audit; remediation plan tracking; worker interview methodology'
WHERE name = 'Forced Labor Investigation Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Dodd-Frank Section 1502; SEC Rule 13p-1; EU Conflict Minerals Regulation 2017/821; OECD Due Diligence Guidance',
  standards_of_creation = 'RMI RMAP; OECD Five-Step Framework; LBMA Responsible Gold Guidance; CFSI Conflict-Free Smelter Program',
  soc_controls = 'RCOI documentation; CMRT audit; smelter/refiner due diligence; Form SD filing; supply chain traceability verification'
WHERE name = 'Conflict Minerals Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Global Magnitsky Act 22 USC Section 2656; EO 13818; OFAC SDN List; EU Global Human Rights Sanctions; UK Sanctions Act 2018',
  standards_of_creation = 'OFAC sanctions compliance framework; Treasury designation criteria; State Department human rights reporting',
  soc_controls = 'Sanctions screening documentation; designation evidence compilation; property blocking compliance; license application tracking; beneficial ownership analysis'
WHERE name = 'Global Magnitsky Sanctions Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Rome Statute of the ICC; Geneva Conventions I-IV; Additional Protocols I-II; Genocide Convention; Customary IHL',
  standards_of_creation = 'ICC OTP Policy Papers; UN Commission of Inquiry methodology; Berkeley Protocol; Hague Principles',
  soc_controls = 'Crime base evidence documentation; command responsibility analysis; complementarity assessment; witness protection; digital evidence preservation; victim participation documentation'
WHERE name = 'International Criminal Law Investigator / War Crimes Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'UN Convention Against Torture; Istanbul Protocol; Geneva Conventions Common Article 3; 18 USC Section 2340',
  standards_of_creation = 'Istanbul Protocol (2022 revision); WMA Declaration of Tokyo; IRCT standards; PHR methodology',
  soc_controls = 'Physical/psychological examination documentation; medico-legal report compliance; photographic evidence protocols; informed consent; examiner independence verification'
WHERE name = 'Forensic Medical Examiner (Torture Documentation) / Istanbul Protocol Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'International Convention on Enforced Disappearance; ICCPR Art 6/7; UN Declaration on Enforced Disappearance; Rome Statute Art 7(1)(i)',
  standards_of_creation = 'UN Committee on Enforced Disappearances guidance; WGEID methods; ICRC missing persons standards; EAAF methodology',
  soc_controls = 'Urgent action documentation; habeas corpus records; forensic identification protocols; family notification; DNA database management; truth commission documentation'
WHERE name = 'Enforced Disappearance Documentation Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'ICCPR Article 6; UN Minnesota Protocol (2016); UN Principles on Extra-legal Executions; Rome Statute',
  standards_of_creation = 'Minnesota Protocol (2016); WHO/PAHO autopsy standards; NAME forensic pathology standards',
  soc_controls = 'Scene investigation documentation; autopsy protocol compliance; ballistics analysis; witness protection; chain of evidence controls; independent investigation verification'
WHERE name = 'Unlawful Killing Investigation Specialist / Minnesota Protocol Examiner';

UPDATE citizen_catalog SET
  governing_guidelines = 'UNDRIP; ILO Convention 169; NAGPRA 25 USC Section 3001; NHPA Section 106; AIRFA; state tribal consultation requirements',
  standards_of_creation = 'UN Expert Mechanism on Indigenous Peoples; ILO CEACR observations; ACHP tribal consultation guidance; NCAI policy standards',
  soc_controls = 'FPIC documentation; tribal consultation records; sacred site protection; NAGPRA repatriation; cultural resource impact assessment controls'
WHERE name = 'Indigenous Peoples'' Rights Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CRPD; CRPD Optional Protocol; ADA 42 USC Section 12101; Rehabilitation Act Section 504; state disability rights statutes',
  standards_of_creation = 'UN CRPD Committee General Comments; WHO World Report on Disability; Disability Rights International methodology',
  soc_controls = 'CRPD periodic reporting; reasonable accommodation documentation; accessibility audit methodology; legal capacity review; independent living monitoring'
WHERE name = 'Convention on the Rights of Persons with Disabilities (CRPD) Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'CRC; CRC Optional Protocols; state child welfare statutes; CAPTA 42 USC Section 5101; ICWA 25 USC Section 1901',
  standards_of_creation = 'UN CRC Committee General Comments; UNICEF Implementation Handbook; child rights impact assessment methodology',
  soc_controls = 'Best interests determination documentation; child participation documentation; periodic reporting; juvenile justice audit; child protection system review'
WHERE name = 'CRC Compliance Analyst / Children''s Rights Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CEDAW; VAWA 34 USC Section 12291; Title IX 20 USC Section 1681; state gender equity statutes',
  standards_of_creation = 'CEDAW Committee General Recommendations; UN Women guidance; Beijing Platform for Action indicators',
  soc_controls = 'CEDAW periodic reporting; GBV data collection; pay equity audit methodology; workplace discrimination investigation; gender impact assessment'
WHERE name = 'Women''s Rights Investigator / CEDAW Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Yogyakarta Principles; ICCPR Art 2/17/26; Bostock v. Clayton County; state LGBTQ+ nondiscrimination statutes',
  standards_of_creation = 'UN Free & Equal standards; Yogyakarta Principles +10; ILGA World methodology; HRC Corporate Equality Index',
  soc_controls = 'Discrimination complaint documentation; conversion therapy prohibition monitoring; legal gender recognition compliance; anti-bullying policy audit; SOGIESC data methodology'
WHERE name = 'LGBTQ+ Human Rights Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'FCA 31 USC Section 3729-3733; 31 USC Section 3730 Qui Tam Provisions; FERA 2009; ACA Section 6402; state false claims acts',
  standards_of_creation = 'DOJ FCA enforcement guidance; DOJ Evaluation of Corporate Compliance; TAF litigation standards; ABA Whistleblower committee',
  soc_controls = 'Qui tam filing and seal compliance; relator privilege documentation; materiality/scienter analysis; government intervention tracking; anti-retaliation verification'
WHERE name = 'False Claims Act / Qui Tam Litigator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Dodd-Frank Section 922 (15 USC Section 78u-6); SEC Rule 21F; Exchange Act Section 10(b); SOX Section 806',
  standards_of_creation = 'SEC Office of Whistleblower guidance; SEC enforcement manual; FINRA arbitration standards',
  soc_controls = 'TCR submission documentation; confidentiality protection; related action tracking; award eligibility; anti-retaliation documentation; SEC cooperation credit analysis'
WHERE name = 'SEC Whistleblower Counsel / Securities Fraud Whistleblower Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = 'IRC Section 7623; Tax Relief and Health Care Act of 2006; IRS Whistleblower Office procedures; IRC Section 6103',
  standards_of_creation = 'IRS Whistleblower Office guidance; IRS Form 211 standards; Tax Court whistleblower jurisdiction',
  soc_controls = 'Form 211 documentation; tax underpayment calculation; collected proceeds tracking; award percentage determination; confidentiality protection; Tax Court petition documentation'
WHERE name = 'Tax Fraud Whistleblower Counsel';

UPDATE citizen_catalog SET
  governing_guidelines = 'OSH Act Section 11(c); SOX Section 806; AIR21 Section 42121; STAA Section 31105; 22+ federal whistleblower statutes',
  standards_of_creation = 'OSHA Whistleblower Investigations Manual; OSHA WPP standards; DOL Administrative Review Board precedent',
  soc_controls = 'Complaint intake documentation; protected activity verification; adverse action causation analysis; statute of limitations compliance; investigation timeline; remedial order enforcement'
WHERE name = 'OSHA Whistleblower Protection Program Investigator';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Labor Code Section 1102.5; CA Gov Code Section 8547; CA H&S Code Section 1278.5; CA Labor Code Section 98.6; CA Gov Code Section 12650',
  standards_of_creation = 'CA DLSE retaliation standards; CA AG whistleblower guidance; CA Whistleblower Protection Act implementation',
  soc_controls = 'Retaliation complaint documentation; protected disclosure verification; adverse action timeline; identity protection; remedy election tracking; damages calculation'
WHERE name = 'California Whistleblower Protection Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = 'FCA 31 USC Section 3729; Anti-Kickback 42 USC Section 1320a-7b; Stark Law 42 USC Section 1395nn; ACA Section 6402; SOX Section 806; state FCA',
  standards_of_creation = 'DOJ Civil Division healthcare fraud guidance; HHS-OIG compliance guidance; TAF healthcare fraud standards',
  soc_controls = 'Qui tam seal compliance; billing pattern analysis; kickback arrangement documentation; medical necessity review; government intervention tracking; relator share calculation'
WHERE name = 'Healthcare Fraud Whistleblower / Qui Tam Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = 'FCA 31 USC Section 3729; 10 USC procurement; DFARS; TINA 10 USC Section 3702; Major Fraud Act 18 USC Section 1031; DCAA audit authority',
  standards_of_creation = 'DOJ Civil Division FCA priorities; DCAA Contract Audit Manual; DOD-OIG investigation standards; GAO bid protest standards',
  soc_controls = 'Contract billing accuracy audit; cost accounting compliance; TINA defective pricing; tech data rights verification; qui tam seal; contractor self-disclosure documentation'
WHERE name = 'Defense Procurement Fraud / Qui Tam Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = 'Clean Air Act Section 7622; Clean Water Act Section 1367; SDWA Section 300j-9(i); TSCA Section 2622; CERCLA Section 9610; RCRA Section 6971',
  standards_of_creation = 'EPA whistleblower enforcement guidance; OSHA environmental whistleblower manual; Environmental Integrity Project standards',
  soc_controls = 'Environmental violation documentation; protected activity timeline; adverse action causation; statute of limitations tracking; EPA/OSHA coordination; remedial order compliance'
WHERE name = 'Environmental Whistleblower Protection Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = 'Energy Reorganization Act Section 211 (42 USC Section 5851); Nuclear Waste Policy Act; NRC 10 CFR Part 50.7; SOX Section 806',
  standards_of_creation = 'NRC Allegation Program guidance; OSHA nuclear whistleblower standards; DOE whistleblower protection guidance',
  soc_controls = 'Safety concern documentation; NRC allegation tracking; chilling effect assessment; adverse action causation; corrective action verification; confidentiality controls'
WHERE name = 'Nuclear/Energy Whistleblower Protection Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = 'AIR21 49 USC Section 42121; SOX Section 806; FAA whistleblower protection; 14 CFR Part 13',
  standards_of_creation = 'OSHA AIR21 investigation manual; FAA Safety Hotline procedures; ASAP standards',
  soc_controls = 'Aviation safety concern documentation; protected activity verification; adverse action causation; airline retaliation tracking; FAA coordination; remedial order compliance'
WHERE name = 'AIR21 Whistleblower Protection Attorney / Aviation Safety Whistleblower Counsel';

UPDATE citizen_catalog SET
  governing_guidelines = 'Pipeline Safety Improvement Act Section 60129 (49 USC Section 60129); NTSSA Section 1413; OSHA investigation authority; PHMSA enforcement',
  standards_of_creation = 'OSHA pipeline whistleblower standards; PHMSA enforcement guidance; API pipeline safety standards',
  soc_controls = 'Pipeline safety violation documentation; protected activity verification; adverse action timeline; PHMSA coordination records; remedial order tracking; confidentiality controls'
WHERE name = 'Pipeline Safety Whistleblower Counsel';

UPDATE citizen_catalog SET
  governing_guidelines = 'Dodd-Frank Section 922; FCA Section 3730(b) seal; IRC Section 6103; 18 USC Section 1905; state shield laws',
  standards_of_creation = 'ABA whistleblower ethics guidance; Government Accountability Project practices; National Whistleblower Center standards',
  soc_controls = 'Seal compliance monitoring; identity redaction protocols; privilege log maintenance; confidential witness protection; secure communication controls; anti-retaliation monitoring'
WHERE name = 'Whistleblower Confidentiality / Identity Protection Counsel';

UPDATE citizen_catalog SET
  governing_guidelines = 'DOJ Evaluation of Corporate Compliance (2023); USSG Section 8B2.1; SOX; FCPA; state compliance requirements',
  standards_of_creation = 'DOJ CCE evaluation criteria; USSC Organizational Guidelines; SCCE standards; ISO 37301',
  soc_controls = 'Compliance program effectiveness assessment; tone-at-top documentation; third-party due diligence; training tracking; investigation protocol audit; hotline testing'
WHERE name = 'Corporate Compliance Officer / DOJ Evaluation Criteria Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Dodd-Frank Section 922 15 USC Section 78u-6(b)-(c); FCA Section 3730(d); IRC Section 7623(b); CFTC whistleblower rules',
  standards_of_creation = 'SEC whistleblower award guidance; IRS Whistleblower Office procedures; DOJ relator share guidelines',
  soc_controls = 'Collected proceeds calculation; award percentage determination; related action identification; reduction factor analysis; tax implications documentation; appeals tracking'
WHERE name = 'Whistleblower Award / Bounty Calculation Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Federal Power Act 16 USC Section 791a; PURPA; Energy Policy Act 2005; NERC Reliability Standards; FERC 18 CFR; state PUC regulations',
  standards_of_creation = 'NERC CMEP; FERC compliance standards; EEI guidance; ISO/RTO market rules',
  soc_controls = 'NERC CIP audit; FERC filing accuracy; reliability self-certification; market manipulation monitoring; compliance program effectiveness assessment'
WHERE name = 'Energy/Utility Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Telecommunications Act of 1996 47 USC Section 151; Communications Act of 1934; FCC Rules 47 CFR; TCPA 47 USC Section 227; CALEA',
  standards_of_creation = 'FCC compliance guidance; ATIS standards; TIA standards; CTIA practices; ITU recommendations',
  soc_controls = 'FCC filing compliance; TCPA consent documentation; CPNI protection verification; USF contribution accuracy; intercarrier compensation compliance'
WHERE name = 'Telecommunications Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = '49 USC Section 44701; 14 CFR Parts 21, 25, 43, 91, 121, 135, 145; ICAO Annexes; FAA Order 8900.1',
  standards_of_creation = 'FAA SAS; SMS per 14 CFR Part 5; IOSA; IS-BAO',
  soc_controls = 'FAA certificate management audit; AD compliance tracking; SMS hazard identification; maintenance program compliance; pilot training records verification'
WHERE name = 'Aviation Compliance Officer / Aviation Safety Inspector';

UPDATE citizen_catalog SET
  governing_guidelines = 'FDCA 21 USC Section 301; FDA 21 CFR Parts 200-680; Drug Supply Chain Security Act; PDMA; state pharmacy laws',
  standards_of_creation = 'FDA cGMP 21 CFR Parts 210-211; ICH Q7-Q12; USP standards; ISPE Baseline Guides',
  soc_controls = 'FDA inspection readiness; cGMP audit; CAPA effectiveness; product complaint trending; supply chain integrity; pharmacovigilance reporting'
WHERE name = 'Pharmaceutical/Life Sciences Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Atomic Energy Act 42 USC Section 2011; Energy Reorganization Act; NRC 10 CFR Parts 20, 50, 52, 70; state agreement program',
  standards_of_creation = 'NRC Inspection Manual; INPO standards; NEI guidance; ANS standards; ASME NQA-1',
  soc_controls = 'NRC inspection preparation; safety culture assessment; corrective action audit; emergency preparedness evaluation; radiation protection review; QA program controls'
WHERE name = 'Nuclear Regulatory Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'FSMA 21 USC Section 2201; FDCA; FDA 21 CFR Parts 1, 117-121; USDA FSIS 9 CFR; state food safety codes',
  standards_of_creation = 'FDA FSMA Preventive Controls; HACCP; GFSI standards (SQF, BRC, FSSC 22000); ISO 22000',
  soc_controls = 'HACCP plan validation; preventive controls verification; supplier verification audit; food defense review; recall readiness; allergen control documentation'
WHERE name = 'Food Safety Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'PCI DSS v4.0; PCI SSC QSA Qualification Requirements; GLBA Safeguards Rule; state breach notification laws',
  standards_of_creation = 'PCI SSC QSA Program Guide; PA-DSS; PCI P2PE; ASV Program Guide; PCI 3DS',
  soc_controls = 'QSA quality assurance; ROC template compliance; compensating control evaluation; sampling methodology; evidence retention controls'
WHERE name = 'PCI Qualified Security Assessor (QSA)';

UPDATE citizen_catalog SET
  governing_guidelines = 'IIA International Standards for Internal Auditing; SOX Section 404; FDICIA Section 36; state audit committee requirements',
  standards_of_creation = 'IIA QAIP; IIA Implementation Guides; COSO Internal Control Framework; IPPF',
  soc_controls = 'QAIP self/external assessment; IIA Standards conformance; engagement supervision review; internal audit charter compliance; CAE reporting verification'
WHERE name = 'Internal Audit Quality Assurance Reviewer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Securities Act of 1933; Exchange Act of 1934; SOX 15 USC Section 7201; PCAOB Rules; SEC Reg S-X',
  standards_of_creation = 'PCAOB Auditing Standards; PCAOB Ethics/Independence Rules; SEC independence requirements; AICPA Code of Conduct',
  soc_controls = 'PCAOB inspection readiness; EQR documentation; independence monitoring; audit documentation (AS 1215); fraud risk (AS 2401); ICFR audit (AS 2201)'
WHERE name = 'External Auditor (Engagement Partner — Public Company)';

UPDATE citizen_catalog SET
  governing_guidelines = 'AICPA Professional Standards; state accountancy laws; SSARS; Yellow Book; ERISA Section 103',
  standards_of_creation = 'AICPA SAS; AICPA Code of Conduct; AICPA Peer Review Standards; SSARS',
  soc_controls = 'AICPA peer review compliance; SQMS quality management; independence documentation; audit documentation retention; risk assessment procedures; representation letter controls'
WHERE name = 'External Auditor (Non-Issuer / Private Company)';

UPDATE citizen_catalog SET
  governing_guidelines = 'AICPA SSAE 18 (AT-C Section 105/Section 205/Section 320); AICPA SOC 1/2/3 guides; SOC for Cybersecurity; SOC for Supply Chain',
  standards_of_creation = 'AICPA Trust Services Criteria; COSO Internal Control; AICPA SOC 2 Type I/II guide; HITRUST CSF',
  soc_controls = 'Trust services criteria testing; control description accuracy; CUEC/subservice org controls; management assertion verification; report documentation'
WHERE name = 'SOC Report Practitioner (SOC 1, SOC 2, SOC 3, SOC for Cybersecurity, SOC for Supply Chain)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Government Auditing Standards (Yellow Book); Inspector General Act; Single Audit Act 31 USC Section 7501; 2 CFR Part 200 Subpart F; CIGIE',
  standards_of_creation = 'GAO Yellow Book; CIGIE Quality Standards; OMB Compliance Supplement; AICPA government audit guidance',
  soc_controls = 'Yellow Book independence documentation; single audit compliance testing; ICOC assessment; audit finding follow-up; report quality review'
WHERE name = 'Government Auditor (GAO / OIG / State Auditor)';

UPDATE citizen_catalog SET
  governing_guidelines = 'PCAOB AS 1220; AICPA SQMS No. 2; SOX Section 103; PCAOB Rule 3211',
  standards_of_creation = 'PCAOB EQR standards; AICPA SQMS; PCAOB inspection guidance on EQR',
  soc_controls = 'EQR documentation of significant judgments; concurring approval review; independence verification; consultation review; completion before report release'
WHERE name = 'Engagement Quality Reviewer (EQR)';

UPDATE citizen_catalog SET
  governing_guidelines = 'AICPA Peer Review Standards; AICPA PR Board guidance; state board peer review requirements',
  standards_of_creation = 'AICPA Peer Review Program Manual; AICPA PR Standards Interpretations; AICPA PR Board procedures',
  soc_controls = 'Engagement selection methodology; report acceptance process; corrective action tracking; reviewer qualification verification; firm representation completeness'
WHERE name = 'Peer Reviewer (AICPA Peer Review Program)';

UPDATE citizen_catalog SET
  governing_guidelines = 'IRC 26 USC; Treasury Reg 26 CFR; state tax codes; Circular 230 31 CFR Part 10; AICPA SSTS',
  standards_of_creation = 'AICPA SSTS; IRS Examination Techniques handbook; state examination standards; AICPA Tax Practice Guides',
  soc_controls = 'Tax return accuracy review; IRS examination response; statute of limitations tracking; tax position documentation (ASC 740); preparer due diligence verification'
WHERE name = 'Tax Compliance Specialist / Tax Auditor';

UPDATE citizen_catalog SET
  governing_guidelines = 'Clean Air Act 42 USC Section 7401; Clean Water Act 33 USC Section 1251; RCRA 42 USC Section 6901; CERCLA 42 USC Section 9601; NEPA; ISO 14001',
  standards_of_creation = 'ISO 14001; ISO 14015; EPA Audit Policy; ASTM E1527 Phase I; ASTM E1903 Phase II',
  soc_controls = 'Environmental compliance audit protocols; permit compliance verification; waste manifest tracking; emission data validation; corrective action tracking; EMS conformity assessment'
WHERE name = 'Environmental Auditor';

UPDATE citizen_catalog SET
  governing_guidelines = 'ISO 9001:2015; AS9100D; IATF 16949; 21 CFR Part 820; FAR/DFARS quality clauses',
  standards_of_creation = 'ISO 19011; ISO/IEC 17021-1; IAF mandatory documents; IAQG OASIS standards',
  soc_controls = 'QMS audit program; nonconformance trending; CAPA effectiveness verification; management review completeness; supplier audit program; process audit documentation'
WHERE name = 'Quality Auditor (ISO 9001 / AS9100 / IATF 16949)';

UPDATE citizen_catalog SET
  governing_guidelines = 'OSH Act 29 USC Section 651; OSHA 29 CFR Parts 1903-1990; MSHA 30 CFR; ISO 45001; PSM 29 CFR Section 1910.119',
  standards_of_creation = 'ISO 45001; ANSI/ASSP Z10; OSHA VPP criteria; CSA Z1000',
  soc_controls = 'OH&S management system audit; OSHA 300 Log verification; hazard ID/risk assessment review; incident investigation audit; training effectiveness controls'
WHERE name = 'Health & Safety Auditor';

UPDATE citizen_catalog SET
  governing_guidelines = 'ISO/IEC 27001:2022; GDPR; CCPA/CPRA; GLBA; HIPAA Security Rule; FISMA',
  standards_of_creation = 'ISO/IEC 27001:2022; ISO/IEC 27002:2022; ISO 19011; ISACA ITAF; NIST SP 800-53',
  soc_controls = 'ISMS audit program; Annex A control testing; risk assessment review; SoA verification; security incident audit; management review documentation'
WHERE name = 'Information Security Auditor (ISO 27001)';

UPDATE citizen_catalog SET
  governing_guidelines = 'SEC Climate Disclosure Rules; EU CSRD; EU Taxonomy; ISSB IFRS S1/S2; CA SB 253/261',
  standards_of_creation = 'GRI Standards; SASB Standards; ISSB; TCFD; AA1000 Assurance; ISAE 3000',
  soc_controls = 'ESG data quality verification; Scope 1/2/3 emissions audit; materiality assessment; assurance documentation; greenwashing risk assessment; double materiality analysis'
WHERE name = 'Sustainability / ESG Auditor';

UPDATE citizen_catalog SET
  governing_guidelines = 'Dodd-Frank Section 165; Basel III/IV; OCC Heightened Standards 12 CFR Part 30 App D; state insurance risk requirements',
  standards_of_creation = 'COSO ERM Framework; ISO 31000; BCBS 239; IIF ERM Principles; RIMS Risk Maturity Model',
  soc_controls = 'ERM framework effectiveness; risk appetite compliance; board risk reporting accuracy; stress testing adequacy; risk culture assessment; capital adequacy monitoring'
WHERE name = 'Chief Risk Officer (CRO)';

UPDATE citizen_catalog SET
  governing_guidelines = 'SOX Section 302/404; COSO; Basel III; NAIC ORSA; state corporate governance requirements',
  standards_of_creation = 'COSO ERM Framework (2017); ISO 31000:2018; IRM ERM standards; RIMS Risk Maturity Model',
  soc_controls = 'Risk register completeness; risk assessment validation; KRI monitoring; scenario analysis documentation; risk tolerance testing; emerging risk identification'
WHERE name = 'Enterprise Risk Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'Basel II/III Pillar 1 (op risk capital); BCBS 195; OCC 2003-1; FFIEC operational risk guidance',
  standards_of_creation = 'Basel AMA/SMA frameworks; IOR Sound Practice Guidance; COSO; ORX loss data standards',
  soc_controls = 'RCSA program; operational loss event collection; scenario analysis documentation; KRI monitoring; process mapping; control testing documentation'
WHERE name = 'Operational Risk Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'Basel III FRTB; Dodd-Frank Title VII; BCBS 352/457; SEC Rule 15c3-1; CFTC margin requirements',
  standards_of_creation = 'FRTB standardized/IMA; RiskMetrics methodology; ISDA standards; GARP FRM body of knowledge',
  soc_controls = 'VaR backtesting; stress testing documentation; P&L attribution; trading limit monitoring; model validation; market data quality controls'
WHERE name = 'Market Risk Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'Basel III credit risk; IFRS 9/ASC 326 CECL; OCC Loan Review; ECOA/Reg B; FCRA',
  standards_of_creation = 'Basel IRB standards; IFRS 9 ECL methodology; Moody''''s/S&P methodologies; CECL guidance; CFA credit analysis',
  soc_controls = 'Credit model validation; CECL/ALLL adequacy; concentration risk monitoring; credit policy audit; loan review documentation; watchlist management'
WHERE name = 'Credit Risk Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'Basel III LCR/NSFR; Dodd-Frank Section 165(b)(1)(A)(iv); BCBS 144/188; Fed Reg YY; OCC Liquidity guidance',
  standards_of_creation = 'Basel III LCR/NSFR; BCBS Liquidity Management Principles; ALM best practices',
  soc_controls = 'LCR/NSFR calculation verification; liquidity stress testing; CFP audit; intraday liquidity monitoring; cash flow projection accuracy; early warning indicators'
WHERE name = 'Liquidity Risk Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'OCC 2011-12/Fed SR 11-7; BCBS 239; IFRS 9/CECL model requirements; Basel III IRB standards',
  standards_of_creation = 'SR 11-7 guidance; OCC Model Risk Handbook; BCBS model risk; IIF model risk principles',
  soc_controls = 'Model inventory completeness; validation documentation; performance monitoring; limitation documentation; change management controls; challenger model testing'
WHERE name = 'Model Risk Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'OCC 2023-17; FDIC FIL-44-2008; Fed SR 13-19; FFIEC guidance; NYDFS 23 NYCRR 500.11; EU DORA',
  standards_of_creation = 'FFIEC IT Handbook; SIG/SIG Lite; ISO 27001; NIST CSF; Shared Assessments Program',
  soc_controls = 'Vendor risk assessment program; fourth-party identification; contract compliance monitoring; BCP testing; concentration risk analysis; performance metrics documentation'
WHERE name = 'Third-Party / Vendor Risk Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'SEC disclosure requirements (10-K risk factors); SOX; Dodd-Frank; FTC Act Section 5; state consumer protection',
  standards_of_creation = 'IIF Reputational Risk framework; COSO ERM; ISO 31000; PRMIA standards; RIMS maturity model',
  soc_controls = 'Reputational risk event monitoring; social media monitoring; stakeholder sentiment analysis; crisis preparedness assessment; brand risk tracking; ESG reputational impact documentation'
WHERE name = 'Reputational Risk Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'FFIEC BCM Handbook; NFPA 1600; OCC Heightened Standards; HIPAA contingency planning; NERC CIP-009',
  standards_of_creation = 'ISO 22301; NFPA 1600; BCI Good Practice Guidelines; DRII Professional Practices; ASIS SPC.1',
  soc_controls = 'BIA completeness; BCP testing documentation; RTO/RPO verification; crisis communication review; supply chain continuity; plan maintenance tracking'
WHERE name = 'Business Continuity Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'FFIEC IT Handbook; HIPAA Section 164.308(a)(7); SOX IT controls; NERC CIP-009; FISMA',
  standards_of_creation = 'ISO 22301; NIST SP 800-34; DRII Professional Practices; Uptime Institute tier standards; TIA-942',
  soc_controls = 'DR plan testing documentation; RTO/RPO verification; backup/restoration testing; alternate site readiness; data replication integrity; DR plan annual review'
WHERE name = 'Disaster Recovery Specialist (IT)';

UPDATE citizen_catalog SET
  governing_guidelines = 'OSHA 29 CFR Section 1910.38; SEC Reg FD; FEMA NIMS; state emergency laws; HIPAA breach notification',
  standards_of_creation = 'NIMS/ICS standards; ISO 22361; BCI Crisis Management; PRSA crisis standards; CERC',
  soc_controls = 'Crisis management plan testing; media response protocol; stakeholder notification procedures; post-incident review; crisis simulation records; communication approval chain'
WHERE name = 'Crisis Manager / Crisis Communication Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'State insurance regulations; NAIC Model Laws; RIMS guidance; ERISA; contractual insurance requirements',
  standards_of_creation = 'RIMS Risk Management Standards; ARM body of knowledge; ISO 31000; IRMI coverage analysis',
  soc_controls = 'Insurance program adequacy review; coverage gap analysis; claims management documentation; broker performance evaluation; risk retention analysis; allocation methodology'
WHERE name = 'Risk Manager (Corporate Insurance Buyer)';

UPDATE citizen_catalog SET
  governing_guidelines = 'NAIC Model Laws; state insurance regulations; ASOPs; Dodd-Frank FSOC; SOX (if publicly traded)',
  standards_of_creation = 'ASOPs 1-56; CERA standards; SOA/CAS syllabus; AAA practice notes; IAA risk management',
  soc_controls = 'Actuarial opinion compliance; reserve adequacy review; pricing model validation; ERM quantification; assumption documentation; peer review controls'
WHERE name = 'Actuary (ERM / Insurance)';

UPDATE citizen_catalog SET
  governing_guidelines = 'State unfair claims settlement practices acts; NAIC Model 900; ERISA Section 502; state DOI regulations',
  standards_of_creation = 'NAIC Claims Handling guidance; CPCU claims body of knowledge; CLM standards',
  soc_controls = 'Claims handling timeliness audit; statutory compliance documentation; bad faith review; subrogation tracking; reserve adequacy; documentation completeness'
WHERE name = 'Claims Compliance Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'State underwriting regulations; NAIC Model Laws; FCRA; Unfair Trade Practices Act; state rate filing; GINA',
  standards_of_creation = 'NAIC underwriting standards; CPCU underwriting knowledge; ISO rating standards; actuarial rate-making (ASOP)',
  soc_controls = 'Underwriting guideline audit; rate filing accuracy; adverse decision documentation; credit score compliance; discriminatory practice testing; file documentation completeness'
WHERE name = 'Underwriting Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Dodd-Frank Title VII; Basel III; FEMA; state banking regulations; ISDA requirements; SEC Rule 2a-7',
  standards_of_creation = 'AFP risk management standards; GARP treasury risk management; ISO 31000; CFA fixed income/derivatives',
  soc_controls = 'FX/IR hedging effectiveness; counterparty credit exposure monitoring; cash management risk assessment; investment policy compliance; bank diversification audit; liquidity position documentation'
WHERE name = 'Treasury Risk Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'Basel III/IV capital requirements; SR 11-7; FRTB; IFRS 9/CECL; Dodd-Frank stress testing',
  standards_of_creation = 'FRM body of knowledge; PRM standards; GARP model validation; Basel model risk guidance; CFA quantitative methods',
  soc_controls = 'Model validation documentation; backtesting methodology; stress scenario design; performance metrics; assumption sensitivity analysis; code review and version control'
WHERE name = 'Quantitative Risk Analyst / Risk Modeler';

UPDATE citizen_catalog SET
  governing_guidelines = 'SOX; GDPR; HIPAA; GLBA; FISMA; CCPA/CPRA; PCI DSS; industry-specific regulations',
  standards_of_creation = 'OCEG GRC Capability Model; ISACA COBIT; ISO 37301; NIST CSF; COSO; IIA standards',
  soc_controls = 'GRC maturity assessment; policy governance lifecycle; control testing management; regulatory change tracking; risk assessment integration; compliance training effectiveness'
WHERE name = 'GRC Program Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'All applicable federal/state regulations per scope; Dodd-Frank; ACA; SEC/FINRA changes; state legislative tracking',
  standards_of_creation = 'OCEG regulatory change standards; Thomson Reuters Regulatory Intelligence; Wolters Kluwer compliance change management',
  soc_controls = 'Change identification and tracking; impact assessment documentation; implementation milestone tracking; stakeholder communication; post-implementation verification; horizon scanning'
WHERE name = 'Regulatory Change Management Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'SOX Section 302/404; FDICIA Section 36; OCC Heightened Standards; HIPAA policies; ISO management system documentation',
  standards_of_creation = 'OCEG policy management; ISO 9001 Section 7.5 document control; ARMA information governance; AIIM document management',
  soc_controls = 'Policy lifecycle management; version control/approval workflow; distribution/acknowledgment tracking; periodic review compliance; exception documentation; effectiveness measurement'
WHERE name = 'Policy & Procedure Governance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'ADA Title II/III 42 USC Section 12131-12189; Section 504; FCC 47 CFR Part 64; state CART regulations; 28 CFR Part 35',
  standards_of_creation = 'NCRA CART Guidelines; ADA Best Practices for courts; HLAA CART best practices',
  soc_controls = 'CART accuracy rate verification (98% minimum); real-time delay monitoring; ADA accommodation documentation; equipment reliability testing; provider qualification verification'
WHERE name = 'Communication Access Realtime Translation (CART) Provider';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 8000-8053; CA CCP Section 2025; state court reporter licensing requirements',
  standards_of_creation = 'NCRA standards; CA Court Reporters Board standards; AAERT recording standards; RPR/RMR/RDR certification',
  soc_controls = 'Transcript accuracy audit; CSR staffing compliance; record retention; equipment calibration; confidentiality controls; regulatory filing compliance'
WHERE name = 'Shorthand Reporting Corporation Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'FRE 702; Daubert v. Merrell Dow; state evidence codes; FRCP 26(a)(2); CA Evidence Code Section 720',
  standards_of_creation = 'Daubert/Frye reliability standards; field-specific standards; AAFS forensic standards; ABA expert guidelines',
  soc_controls = 'Expert qualification documentation; methodology reliability verification; opinion basis documentation; bias/conflict disclosure; report peer review; testimony consistency audit'
WHERE name = 'Court-Appointed Expert';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA CCP Section 128(a)(4); state contempt powers; court inherent authority; CA Family Code Section 1101; state property transfer statutes',
  standards_of_creation = 'State judicial council guidelines; court-appointed fiduciary standards; title company coordination; ABA fiduciary guidance',
  soc_controls = 'Court order compliance documentation; property transfer verification; service of process documentation; fee petition documentation; accounting controls'
WHERE name = 'Elisor (Court-Appointed Document Executor)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Federal Arbitration Act 9 USC Section 1; state arbitration acts (e.g., CA CCP Section 1280); RUAA; consumer arbitration regulations',
  standards_of_creation = 'AAA/ICDR rules; JAMS rules; CPR Institute rules; ABA Model Standards for ADR; ICC arbitration',
  soc_controls = 'Arbitrator/mediator qualification verification; case administration documentation; fee transparency; consumer fairness compliance; conflict screening; award documentation'
WHERE name = 'ADR Provider Organization Administrator';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 6400-6415; CA CCP Section 1161-1179a; state UPL restrictions; local rent control ordinances',
  standards_of_creation = 'CA DCA registration requirements; county clerk filing standards; court self-help coordination',
  soc_controls = 'Registration/bond compliance; service limitation documentation; client disclosure requirements; fee schedule compliance; document accuracy audit; UPL boundary compliance'
WHERE name = 'Unlawful Detainer Assistant';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 6400-6415; state UPL statutes; court form requirements; CA Rules of Court',
  standards_of_creation = 'CA DCA LDP registration; court self-help standards; CALDA best practices',
  soc_controls = 'Registration/bond verification; client disclosure documentation; service scope compliance; document accuracy review; fee disclosure controls; complaint handling'
WHERE name = 'Legal Document Preparer';

UPDATE citizen_catalog SET
  governing_guidelines = '6th/7th Amendment; FRCP 47; 28 USC Section 1861; Batson v. Kentucky; state jury statutes; ABA Model Rules 3.4/8.4',
  standards_of_creation = 'ASTC Professional Standards; ABA jury trial standards; ASTC ethics code; trial science methodology',
  soc_controls = 'Juror research methodology; voir dire documentation; mock trial protocols; Batson compliance; data privacy controls; billing transparency'
WHERE name = 'Jury Consultant / Trial Consultant';

UPDATE citizen_catalog SET
  governing_guidelines = 'State notary statutes (e.g., CA Gov Code Section 8200-8230); RULONA; Secretary of State regulations; state retention laws',
  standards_of_creation = 'NNA standards; state SOS notary guidance; MISMO standards; ALTA best practices',
  soc_controls = 'Journal entry completeness audit; ID verification documentation; signature comparison records; retention compliance; journal security; error correction documentation'
WHERE name = 'Notary Journal/Records Compliance Auditor';

UPDATE citizen_catalog SET
  governing_guidelines = 'State RON laws (VA Code Section 47.1-2, FL Section 117.265); MISMO RON standards; E-SIGN Act 15 USC Section 7001; UETA; state digital signature laws',
  standards_of_creation = 'MISMO RON standards; NNA remote notarization guidance; state RON technology requirements; ALTA RON practices',
  soc_controls = 'RON platform security audit; identity proofing verification; audio-video recording retention; tamper-evident certification; credential analysis; session recording controls'
WHERE name = 'Online Notarization Platform/Depository Administrator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Hague Apostille Convention 1961; 22 USC Section 2658; state SOS apostille regulations',
  standards_of_creation = 'Hague Conference guidance; U.S. State Dept authentication standards; state SOS procedures',
  soc_controls = 'Document authentication chain verification; apostille certificate accuracy; issuing authority validation; turnaround compliance; fee adherence; international tracking controls'
WHERE name = 'Apostille Processing Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = '22 USC Section 2658; 22 CFR Part 131; state authentication statutes; bilateral treaty requirements',
  standards_of_creation = 'U.S. State Dept authentication guidance; consular corps requirements; state SOS certification standards',
  soc_controls = 'Authentication chain completeness; consular legalization tracking; document certification accuracy; country-specific compliance; fee adherence; processing timeline documentation'
WHERE name = 'Document Authentication Specialist (Non-Hague)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Vienna Convention on Consular Relations 1963; 22 USC Section 4215; 22 CFR Part 92; bilateral consular treaties',
  standards_of_creation = '7 FAM 700 (Foreign Affairs Manual); consular notarial standards; international notarization practices',
  soc_controls = 'Consular officer authority verification; foreign language handling; fee compliance; notarial act recording; jurisdiction verification; chain of custody controls'
WHERE name = 'Consular Notarization Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'State notary bond requirements (e.g., CA Gov Code Section 8212); state surety bond regulations; RULONA bond provisions',
  standards_of_creation = 'NNA bond compliance guidance; SFAA surety standards; state SOS bond requirements',
  soc_controls = 'Bond amount adequacy; bond renewal tracking; surety company authorization verification; claim history documentation; cancellation notification; commission/bond alignment controls'
WHERE name = 'Notary Bond Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'State notary E&O requirements; state insurance department regulations; RULONA insurance provisions',
  standards_of_creation = 'NNA E&O guidance; state insurance department compliance; professional liability industry standards',
  soc_controls = 'Coverage adequacy verification; policy renewal tracking; claims history documentation; coverage gap analysis; retroactive/tail coverage; premium payment documentation'
WHERE name = 'Notary E&O Insurance Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'State notary statutes (e.g., CA Gov Code Section 8200-8230); RULONA; SOS regulations; NNA standards',
  standards_of_creation = 'NNA compliance audit methodology; state SOS examination standards; MISMO verification; ALTA standards',
  soc_controls = 'Notary commission verification; journal completeness audit; signature/seal compliance; E&O/bond status; RON compliance; disciplinary history review'
WHERE name = 'Notary Compliance Auditor';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 7000-7191; CA Labor Code; 16 CCR Section 800-873; prevailing wage CA Labor Code Section 1720',
  standards_of_creation = 'CSLB licensing standards; ICC building codes; OSHA 29 CFR Part 1926; Cal/OSHA Title 8; NASCLA standards',
  soc_controls = 'CSLB license verification; workers'''' comp insurance compliance; bond verification; building permit documentation; safety program audit; subcontractor license verification'
WHERE name = 'Licensed Contractor (General Engineering / General Building / Specialty)';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Insurance Code Section 1621-1758.993; 10 CCR Section 2186-2192; NAIC Producer Licensing Model Act',
  standards_of_creation = 'CDI licensing standards; NAIC producer standards; NAIFA ethical standards; state CE requirements',
  soc_controls = 'License/CE compliance tracking; client suitability documentation; E&O verification; premium trust account audit; appointment verification; disclosure controls'
WHERE name = 'Licensed Insurance Agent / Broker / Producer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 6500-6592; CA Probate Code; 16 CCR Section 4400-4580; CA Rules of Court 7.1050-7.1063',
  standards_of_creation = 'Professional Fiduciaries Bureau standards; NGA standards; ABA Model Act for guardianship; AICPA fiduciary accounting',
  soc_controls = 'Fiduciary accounting compliance; bond/insurance verification; court reporting timeliness; asset management audit; fee petition documentation; conflict screening'
WHERE name = 'Licensed Professional Fiduciary';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 6000-6238; CA Rules of Professional Conduct; ABA Model Rules; CA Rules of Court',
  standards_of_creation = 'State Bar of California standards; ABA competence standards; MCLE requirements; IOLTA rules',
  soc_controls = 'State Bar status verification; MCLE compliance; IOLTA trust account audit; conflict screening; malpractice insurance verification; disciplinary history review'
WHERE name = 'Attorney at Law / Member of the State Bar of California';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 8000-8053; CA CCP Section 2025; CA Gov Code Section 69941-69955',
  standards_of_creation = 'CA Court Reporters Board standards; NCRA certification (RPR/RMR/RDR/CLVS); AAERT standards',
  soc_controls = 'Certification verification; transcript accuracy compliance; record retention; equipment certification; CE tracking; fee schedule adherence'
WHERE name = 'Licensed Court Reporter (cross-reference with A1-01)';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 1600-1976; 16 CCR Division 10; HIPAA; OSHA BBP Standard',
  standards_of_creation = 'Dental Board of CA standards; ADA Standards for Dental Practice; CDT coding; OSAP infection control',
  soc_controls = 'License verification; infection control audit; radiographic safety; CURES compliance; CE compliance; patient record documentation'
WHERE name = 'Licensed Dentist (DDS/DMD)';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 2700-2838.4; 16 CCR Division 14; HIPAA; state nurse practice acts; Nurse Licensure Compact',
  standards_of_creation = 'CA BRN standards; ANA Nursing Standards; ANCC certification; NCSBN Model Practice Act',
  soc_controls = 'License verification; scope of practice compliance; medication administration audit; CE tracking; documentation standards; disciplinary history review'
WHERE name = 'Registered Nurse / Licensed Vocational Nurse';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 4000-4427; 16 CCR Division 17; 21 CFR; CSA 21 USC Section 801; HIPAA',
  standards_of_creation = 'CA Board of Pharmacy standards; ACPE CE; NABP standards; USP 795/797/800; ASHP guidelines',
  soc_controls = 'License verification; controlled substance inventory (DEA); compounding compliance; CURES compliance; medication error reporting; CE tracking'
WHERE name = 'Licensed Pharmacist (RPh/PharmD)';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 4925-4979; 16 CCR Division 13.7; HIPAA',
  standards_of_creation = 'CA Acupuncture Board standards; NCCAOM certification; CNT standards; WHO acupuncture guidelines',
  soc_controls = 'License verification; clean needle technique compliance; scope of practice documentation; CE tracking; informed consent; infection control audit'
WHERE name = 'Licensed Acupuncturist (L.Ac.)';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 1000-1070; 16 CCR Division 4; HIPAA; workers'''' comp treatment guidelines',
  standards_of_creation = 'CA Board of Chiropractic Examiners standards; CCE accreditation; NBCE standards; ACA/ICA guidelines',
  soc_controls = 'License verification; scope compliance; radiographic safety; CE tracking; documentation standards; billing accuracy audit'
WHERE name = 'Licensed Doctor of Chiropractic (D.C.)';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 3000-3167; 16 CCR Division 15; HIPAA; FDA 21 CFR 801',
  standards_of_creation = 'CA Board of Optometry standards; AOA Practice Guidelines; ARBO standards; NBEO standards',
  soc_controls = 'License verification; TPA certification; scope documentation; CE compliance; patient records; controlled substance prescribing compliance'
WHERE name = 'Licensed Optometrist (O.D.)';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 2600-2697; 16 CCR Division 13.2; HIPAA; Medicare/Medicaid CoP',
  standards_of_creation = 'CA PT Board standards; APTA practice guidelines; ABPTS specialization; FSBPT standards',
  soc_controls = 'License verification; scope compliance; care plan documentation; CE compliance; supervision ratio compliance; outcome measurement'
WHERE name = 'Licensed Physical Therapist (PT/DPT)';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 2530-2538.8; 16 CCR Division 13.3; IDEA; HIPAA; Medicare conditions',
  standards_of_creation = 'ASHA certification (CCC-SLP/CCC-A); CA SLPAB standards; ASHA Practice Portal; AAA guidelines',
  soc_controls = 'License/certification verification; scope compliance; clinical fellowship supervision documentation; CE compliance; patient documentation; telepractice compliance'
WHERE name = 'Licensed Speech-Language Pathologist (SLP) / Audiologist (AuD)';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 4980-4990.30; 16 CCR Division 18; HIPAA; Tarasoff duty; mandatory reporting laws',
  standards_of_creation = 'CA BBS LMFT standards; AAMFT Code of Ethics; AMFTRB standards; COAMFTE accreditation',
  soc_controls = 'License verification; supervised experience documentation; CE compliance; mandatory reporting; confidentiality/Tarasoff compliance; client documentation'
WHERE name = 'Licensed Marriage and Family Therapist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 4999.10-4999.129; 16 CCR Division 18; HIPAA; mandatory reporting laws',
  standards_of_creation = 'CA BBS LPCC standards; ACA Code of Ethics; NBCC certification; CACREP accreditation',
  soc_controls = 'License verification; supervised experience documentation; CE compliance; scope compliance; mandatory reporting; client documentation'
WHERE name = 'Licensed Professional Clinical Counselor';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 7301-7441; 16 CCR Division 9; OSHA BBP Standard',
  standards_of_creation = 'CA Board of Barbering and Cosmetology standards; NACCAS accreditation; state sanitation standards; Milady standards',
  soc_controls = 'License verification; sanitation/disinfection compliance; health and safety inspection; CE compliance; chemical safety documentation; client record controls'
WHERE name = 'Licensed Barber / Licensed Cosmetologist';

UPDATE citizen_catalog SET
  governing_guidelines = 'State auctioneer licensing (varies by state); UCC Article 2 Section 2-328; FTC Act Section 5; state consumer protection',
  standards_of_creation = 'NAA Code of Ethics; CAI certification standards; state auction regulations; UCC sale by auction',
  soc_controls = 'Auction conduct documentation; buyer/seller disclosure; trust account management; advertising accuracy; bid recording; post-sale settlement documentation'
WHERE name = 'Auctioneer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Labor Code Section 1700-1700.47; 8 CCR Section 12000-12002; SAG-AFTRA franchise standards',
  standards_of_creation = 'CA Labor Commissioner standards; SAG-AFTRA/AEA agency standards; ATA standards',
  soc_controls = 'License verification; fee/commission compliance (10% limit); contract compliance; trust account audit; minor protections (Coogan Law); client disclosure'
WHERE name = 'Talent Agency Licensee';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Labor Code Section 4060-4068; 8 CCR Section Section 30-36; AMA Guides 5th ed.; CA WCAB rules; MTUS',
  standards_of_creation = 'CA DWC Medical Unit QME/AME standards; AMA Guides methodology; ACOEM Guidelines; MTUS evidence-based guidelines',
  soc_controls = 'AME panel selection compliance; AMA Guides impairment rating; report completeness; medical record review; apportionment analysis; rebuttal compliance'
WHERE name = 'Agreed Medical Evaluator';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Labor Code Section 4060-4068; 8 CCR Section Section 10150-10166; AMA Guides 5th ed.; CA PDRS; LC Section 4658',
  standards_of_creation = 'DWC DEU rating manual; AMA Guides methodology; WCAB en banc decisions; DEU training',
  soc_controls = 'PD rating calculation audit; apportionment verification; AMA Guides accuracy; FEC rank compliance; DFEC adjustment verification; file completeness'
WHERE name = 'Disability Evaluation Analyst -- Disability Evaluation Unit';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Labor Code Division 4 Section 3200-6002; 8 CCR Section Section 9700-10995; CA Rules of Professional Conduct; LC Section 4906',
  standards_of_creation = 'State Bar workers'''' comp specialization; CAAA litigation standards; WCAB practice guidance; MCLE specialty requirements',
  soc_controls = 'Fee agreement compliance (LC Section 4906); lien filing timeliness; WCAB filing compliance; settlement documentation; discovery compliance; case management'
WHERE name = 'Attorney -- Workers Compensation (Applicant Side)';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Labor Code Division 4 Section 3200-6002; 8 CCR Section Section 9700-10995; CA Rules of Professional Conduct; LC Section 4903.05',
  standards_of_creation = 'State Bar workers'''' comp specialization; employer defense standards; WCAB practice guidance; DWC UR/IMR standards',
  soc_controls = 'Client reporting/billing compliance; discovery response timeliness; WCAB filing compliance; lien resolution documentation; UR defense; case reserve accuracy'
WHERE name = 'Attorney -- Workers Compensation (Defense)';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Labor Code Section 3850-3864; LC Section 3856; CA Civil Code Section 1431.2; state subrogation statutes',
  standards_of_creation = 'NASP standards; workers'''' comp subrogation practices; third-party settlement allocation methodology',
  soc_controls = 'Subrogation lien calculation audit; credit/offset documentation; settlement allocation; lien filing timeliness; litigation cost tracking; recovery distribution compliance'
WHERE name = 'Workers Compensation Subrogation Analyst / Recovery Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Labor Code Section 4903-4903.6; 8 CCR Section Section 10770-10779; LC Section 4903.05; DWC fee schedule; OMFS',
  standards_of_creation = 'DWC Official Medical Fee Schedule; OMFS billing standards; CPT/ICD-10 coding; DWC lien filing requirements',
  soc_controls = 'Lien filing compliance (activation fee); billing accuracy; fee schedule compliance; CPT code accuracy audit; lien conference documentation; resolution tracking'
WHERE name = 'Lien Representative / Medical-Legal Billing Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Labor Code Section 4700-4707; LC Section 4701/Section 4702; LC Section 4703.5 burial allowance; 8 CCR dependency determinations',
  standards_of_creation = 'DWC death benefits administration; WCAB dependency procedures; actuarial present value standards',
  soc_controls = 'Dependency verification; death benefit calculation audit; burial allowance compliance; payment schedule accuracy; minor dependent trust; statute of limitations compliance'
WHERE name = 'Workers Compensation Death Benefits Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Labor Code Section 4553/Section 4553.1; 8 CCR S&W petition requirements; WCAB rules of practice',
  standards_of_creation = 'WCAB S&W misconduct petition standards; Cal/OSHA violation cross-reference; safety regulation analysis',
  soc_controls = 'S&W petition filing compliance; employer knowledge evidence documentation; Cal/OSHA citation cross-reference; penalty calculation audit; insurance analysis; discovery documentation'
WHERE name = 'Attorney / Investigator -- Serious & Willful Misconduct Claims';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Labor Code Section 4658.5-4658.7; ADA reasonable accommodation; FMLA; LC Section 139.48; 8 CCR Section 10133.31-10133.60',
  standards_of_creation = 'CDMS standards; CARF vocational rehabilitation; JAN guidance; ABVE standards',
  soc_controls = 'RTW program documentation; modified/alternative work tracking; SJDB voucher compliance; interactive process documentation; accommodation tracking; FCE controls'
WHERE name = 'Return-to-Work (RTW) Coordinator / Disability Management Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Labor Code Section 6300-6719; 8 CCR Title 8; 29 CFR Parts 1910/1926; PSM 8 CCR Section 5189',
  standards_of_creation = 'Cal/OSHA Policies and Procedures Manual; DOSH inspection protocols; BCSP certification; ASSP standards; AIHA methodology',
  soc_controls = 'Cal/OSHA inspection documentation; citation issuance compliance; abatement verification; exposure assessment methodology; accident investigation; penalty calculation accuracy'
WHERE name = 'Safety Engineer / Industrial Hygienist -- Cal/OSHA Division of Occupational Safety and Health (DOSH)';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Labor Code Section 6300-6719; 8 CCR Title 8; Cal/OSHA P&P Manual; Gov Code Section 19800',
  standards_of_creation = 'DOSH District Manager standards; Cal/OSHA enforcement manual; CSHO program; OSHA Federal-State framework',
  soc_controls = 'District enforcement metrics; inspection quality assurance; citation review/approval; staff training; abatement tracking; interagency coordination'
WHERE name = 'Cal/OSHA District Manager';

UPDATE citizen_catalog SET
  governing_guidelines = '29 CFR Part 1904; 8 CCR Section 14300; OSHA Form 300/300A/301; SB 553 recordkeeping; electronic submission rules',
  standards_of_creation = 'OSHA Recordkeeping Guidelines; BLS Survey methodology; OSHA e-submission standards; Cal/OSHA Log 300 guidance',
  soc_controls = 'OSHA 300 Log accuracy audit; recordable injury classification; annual 300A posting; electronic submission timeliness; privacy case management; first aid determination documentation'
WHERE name = 'Safety Recordkeeper / OSHA 300 Log Administrator';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Labor Code Section 6401.7/Section 6401.9 (SB 553); 8 CCR Section 3342; OSHA General Duty Clause',
  standards_of_creation = 'Cal/OSHA WVPP guidance; ASIS Workplace Violence Prevention; OSHA WVP Recommendations; NIOSH WVP',
  soc_controls = 'WVPP plan completeness; violent incident log; employee training documentation; hazard assessment tracking; annual review compliance; employee involvement documentation'
WHERE name = 'WVPP Coordinator / Safety Manager (SB 553 Compliance)';

UPDATE citizen_catalog SET
  governing_guidelines = '29 CFR Section 1910.1200 (HazCom/GHS); 8 CCR Section 5194; Prop 65 CA H&S Code Section 25249.5; TSCA 15 USC Section 2601',
  standards_of_creation = 'GHS standards; OSHA HazCom guidance; ANSI Z400.1/Z129.1; NIOSH chemical safety',
  soc_controls = 'SDS library completeness/currency; container labeling compliance; employee training documentation; chemical inventory accuracy; exposure monitoring; Prop 65 warning compliance'
WHERE name = 'HazCom Program Coordinator / Chemical Safety Officer';

UPDATE citizen_catalog SET
  governing_guidelines = '29 CFR Section 1910.119 (PSM); 8 CCR Section 5189; EPA RMP 40 CFR Part 68; CA CalARP; OSHA NEP for PSM',
  standards_of_creation = 'CCPS guidelines; API RP 750/752/754; NFPA 30/45/68; IEC 61511; ISA 84; RAGAGEP',
  soc_controls = 'PSI completeness audit; PHA revalidation compliance; MOC documentation review; incident investigation thoroughness; MI program audit; emergency response testing'
WHERE name = 'Process Safety Engineer / PSM Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = '29 CFR Section 1910.147 (LOTO); 8 CCR Section 3314; OSHA Machine Guarding 29 CFR Section 1910.212; NFPA 70E',
  standards_of_creation = 'OSHA LOTO guidance; ANSI/ASSE Z244.1; NFPA 70E; machine-specific energy control procedures',
  soc_controls = 'LOTO procedure audit per machine; annual periodic inspection; authorized/affected training; group LOTO compliance; contractor coordination; energy source identification verification'
WHERE name = 'LOTO Program Coordinator / Maintenance Safety Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = '29 CFR Section 1910.146; 8 CCR Section 5156-5159; 29 CFR Section 1926 Subpart AA; Cal/OSHA Title 8',
  standards_of_creation = 'OSHA confined space guidance; ANSI/ASSE Z117.1; NFPA 350; NIOSH criteria; rescue service evaluation standards',
  soc_controls = 'Permit space inventory audit; entry permit documentation; atmospheric monitoring calibration; rescue evaluation; training documentation; reclassification documentation'
WHERE name = 'Confined Space Program Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = '29 CFR Section 1926 Subpart M; 29 CFR Section 1910 Subpart D; 8 CCR Section 1669-1672; ANSI Z359 series',
  standards_of_creation = 'ANSI/ASSP Z359.0-Z359.15; OSHA fall protection guidance; PFAS manufacturer standards; competent person qualifications',
  soc_controls = 'Fall protection plan audit; equipment inspection documentation; training records; anchorage certification; rescue plan documentation; incident investigation controls'
WHERE name = 'Fall Protection Competent Person / Safety Manager';

UPDATE citizen_catalog SET
  governing_guidelines = '29 CFR Section 1910.134; 8 CCR Section 5144; NIOSH 42 CFR Part 84; OSHA APF tables',
  standards_of_creation = 'OSHA Respiratory Protection guidance; ANSI Z88.2; NIOSH respirator selection; AIHA exposure assessment',
  soc_controls = 'Written program audit; medical evaluation documentation; fit testing records; respirator selection rationale; training documentation; IDLH procedure compliance'
WHERE name = 'Respiratory Protection Program Manager';

UPDATE citizen_catalog SET
  governing_guidelines = '29 CFR Section 1910.95; 8 CCR Section 5095-5100; MSHA 30 CFR Part 62; OSHA Tech Manual Ch 5',
  standards_of_creation = 'OSHA HCA guidance; NIOSH noise criteria; ANSI S3.6; CAOHC certification; AIHA noise measurement',
  soc_controls = 'Noise dosimetry documentation; audiometric testing audit; STS tracking; HPD fit documentation; training records; program effectiveness evaluation'
WHERE name = 'Hearing Conservation Program Administrator / Industrial Audiologist';

UPDATE citizen_catalog SET
  governing_guidelines = '29 CFR Section 1910.1030 (BBP); 8 CCR Section 5193; Needlestick Safety Act; OSHA sharps recordkeeping',
  standards_of_creation = 'OSHA BBP guidance; CDC/HICPAC guidelines; APIC standards; OSAP infection control',
  soc_controls = 'Exposure Control Plan audit; HepB vaccination documentation; post-exposure records; sharps injury log; annual plan review; engineering controls evaluation'
WHERE name = 'Infection Control / BBP Program Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = '8 CCR Section 3395; OSHA General Duty Clause; OSHA NEP for Heat; proposed federal heat standard',
  standards_of_creation = 'Cal/OSHA Heat Illness guidance; NIOSH Heat Stress Criteria; ACGIH TLVs; WBGT measurement',
  soc_controls = 'Written HIPP audit; training documentation; water/shade/rest verification; high heat procedures; acclimatization documentation; emergency response procedures'
WHERE name = 'Heat Illness Prevention Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = '8 CCR Section 5141.1; Cal/OSHA emergency regulations; AQI monitoring requirements; OSHA General Duty Clause',
  standards_of_creation = 'Cal/OSHA wildfire smoke guidance; EPA AQI standards; NIOSH N95 guidance; AIHA exposure assessment',
  soc_controls = 'AQI monitoring documentation; N95 program compliance; employee communication procedures; HVAC filtration verification; training documentation; exposure assessment controls'
WHERE name = 'Wildfire Smoke / Air Quality Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = '29 CFR Section 1910.132-138; 8 CCR Section 3380-3387; ANSI/ISEA PPE standards; NFPA PPE standards',
  standards_of_creation = 'ANSI/ISEA Z87.1/Z89.1/105/107; NFPA PPE standards; OSHA PPE guidance; ISO 20471',
  soc_controls = 'PPE hazard assessment documentation; selection rationale; training/fit documentation; inspection/replacement records; certification verification; employer-provided cost compliance'
WHERE name = 'Safety Professional -- PPE Program Manager';

UPDATE citizen_catalog SET
  governing_guidelines = '29 CFR Section 1910.38/39; 8 CCR Section 3220-3221; NFPA 1; OSHA 29 CFR Section 1910.155-165; local fire codes',
  standards_of_creation = 'NFPA 1/10/25/72/101; OSHA emergency planning guidance; ICS/NIMS; FM Global standards',
  soc_controls = 'EAP completeness audit; fire prevention plan review; evacuation drill documentation; extinguisher inspection; alarm testing; employee training and role assignment'
WHERE name = 'Emergency Preparedness / Fire Prevention Plan Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = '8 CCR Section 5110; OSHA General Duty Clause; ADA reasonable accommodation; Cal/OSHA ergonomic guidelines',
  standards_of_creation = 'ANSI/HFES 100; ISO 11228 series; NIOSH Lifting Equation; RULA/REBA; ACGIH TLV for HAL',
  soc_controls = 'Ergonomic risk assessment documentation; workstation evaluation records; RMI tracking; engineering/admin controls; training documentation; program effectiveness evaluation'
WHERE name = 'Ergonomist / Safety Professional -- Repetitive Motion Injury Prevention';

UPDATE citizen_catalog SET
  governing_guidelines = 'OSHA General Duty Clause 29 USC Section 654(a)(1); 29 CFR Section 1910/1926; 8 CCR Title 8; ANSI/ASSP Z590.3',
  standards_of_creation = 'OSHA JHA guidance (OSHA 3071); ANSI/ASSP Z590.3; NIOSH Hierarchy of Controls; AIHA exposure assessment',
  soc_controls = 'JSA/JHA documentation completeness; hazard identification verification; control implementation tracking; periodic review compliance; employee participation; change-triggered update controls'
WHERE name = 'Safety Analyst -- Job Safety Analysis / JHA Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Labor Code Section 6354; OSHA Consultation Program 29 CFR Part 1908; 8 CCR Title 8',
  standards_of_creation = 'OSHA Consultation P&P Manual; Cal/OSHA Consultation standards; VPP/SHARP criteria; OSHA 21(d)',
  soc_controls = 'Consultation visit documentation; hazard correction tracking; serious hazard abatement; SHARP qualification; confidentiality compliance; recommendation follow-up'
WHERE name = 'Safety Consultant -- Cal/OSHA Consultation Service';

UPDATE citizen_catalog SET
  governing_guidelines = 'Federal Power Act 16 USC Section 791a; PURPA; state PUC statutes; FERC 18 CFR',
  standards_of_creation = 'NARUC regulatory analysis standards; FERC rate-making standards; state PUC filing requirements; EEI guidance',
  soc_controls = 'Rate case analysis documentation; tariff compliance audit; filing accuracy; cost-of-service methodology; regulatory proceeding tracking; consumer impact analysis'
WHERE name = 'Public Utility Regulatory Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'FERC 18 CFR; state PUC rate-making; PURPA; Federal Power Act; NARUC; GASB 62',
  standards_of_creation = 'NARUC rate design standards; FERC Uniform System of Accounts; AWWA rate design; EEI financial reporting',
  soc_controls = 'Cost-of-service calculation audit; rate design methodology; revenue requirement analysis; rate base verification; depreciation compliance; customer class allocation'
WHERE name = 'Utility Rate Engineer (P.E. preferred)';

UPDATE citizen_catalog SET
  governing_guidelines = 'State PUC billing regulations; CPUC General Orders; state consumer protection; tariff requirements; LIHEAP',
  standards_of_creation = 'NARUC consumer services; utility billing system standards; AGA/EEI/AWWA billing practices',
  soc_controls = 'Billing accuracy audit; meter reading validation; rate application verification; complaint resolution tracking; CARE/FERA compliance; disconnection procedure compliance'
WHERE name = 'Utility Billing Compliance Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'NIST Smart Grid Framework; FERC Order 2222; state PUC AMI orders; NERC CIP; FCC 47 CFR',
  standards_of_creation = 'NIST IR 7628; IEEE 2030; IEC 61968/61970; ANSI C12; OpenADR 2.0',
  soc_controls = 'AMI data quality verification; cybersecurity testing; customer data privacy; meter accuracy calibration; demand response compliance; communication reliability documentation'
WHERE name = 'Smart Grid/Advanced Metering Infrastructure (AMI) Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Energy Policy Act 2005 Section 215; FERC Order 693; NERC Rules of Procedure; NERC CIP/FAC/MOD/TPL standards',
  standards_of_creation = 'NERC CMEP; NERC Reliability Standards; ERO Enterprise Practice Guides; regional entity guidance',
  soc_controls = 'NERC self-certification; spot check preparation; compliance audit documentation; mitigation plan tracking; ICP effectiveness; violation self-reporting'
WHERE name = 'NERC Reliability Compliance Officer / Compliance Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'Federal Power Act; Natural Gas Act; FERC 18 CFR; APA; PURPA; Energy Policy Act 2005',
  standards_of_creation = 'FERC practice standards; ABA Energy Law standards; FERC Rules 18 CFR Part 385; NARUC legal standards',
  soc_controls = 'FERC filing compliance; rate case litigation documentation; enforcement response; compliance calendar; tariff interpretation; administrative hearing preparation'
WHERE name = 'FERC Regulatory Attorney / Energy Regulatory Counsel';

UPDATE citizen_catalog SET
  governing_guidelines = 'NERC TPL Standards; FERC Order 1000/890; state transmission planning; regional ISO/RTO protocols; IEEE 762/1366',
  standards_of_creation = 'NERC TPL Standards; IEEE C57/C62; ASCE Manual 74; NESC; CIGRE technical brochures',
  soc_controls = 'Transmission planning study documentation; reliability assessment; N-1/N-2 contingency analysis; cost allocation methodology; interconnection compliance; model validation'
WHERE name = 'Transmission Planning Engineer (P.E.)';

UPDATE citizen_catalog SET
  governing_guidelines = 'FERC Orders 2222/2003/845; PURPA Section 210; state interconnection standards; IEEE 1547; NERC FAC',
  standards_of_creation = 'IEEE 1547/1547.1; UL 1741/1741SA; NERC FAC-001/FAC-002; ISO/RTO procedures; SAE J3072',
  soc_controls = 'Interconnection application processing; technical screening documentation; system impact study; commissioning/witness testing; anti-islanding verification; DER monitoring compliance'
WHERE name = 'Grid Interconnection Engineer / Distributed Energy Resources (DER) Integration Engineer (P.E.)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Atomic Energy Act 42 USC Section 2011; NRC 10 CFR Parts 20, 50, 52, 54, 70, 72; Energy Reorganization Act',
  standards_of_creation = 'NRC Inspection Manual; NUREG guidance; INPO objectives; NEI guidance; ANS standards; ASME NQA-1',
  soc_controls = 'NRC inspection preparation; license amendment documentation; tech spec compliance; corrective action audit; 50.59 screening; 10 CFR 50.72/50.73 reporting'
WHERE name = 'Nuclear Regulatory Compliance Specialist / NRC Licensing Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = '10 CFR Part 50 Appendix B; ASME NQA-1; 10 CFR Part 21; NRC Reg Guide 1.28; DOE Order 414.1D',
  standards_of_creation = 'ASME NQA-1-2008/2009 Addenda; NRC Reg Guides (1.28/1.33/1.144); INPO SOER; NEI QA guidance; ISO 19443',
  soc_controls = 'NQA-1 program audit; supplier quality audit; nonconformance reporting; corrective action effectiveness; calibration compliance; document control'
WHERE name = 'Nuclear Quality Assurance Manager / Nuclear QA/QC Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = 'SDWA (underground injection); Clean Water Act; OPA 90; BSEE 30 CFR Part 250; state oil and gas commission regulations',
  standards_of_creation = 'SPE standards; API RP 10B/53/65; BSEE SEMS II; state drilling permit requirements; AAPG standards',
  soc_controls = 'Well design documentation; production data reporting; reserve estimation audit; environmental compliance; well integrity testing; regulatory filing accuracy'
WHERE name = 'Petroleum Engineer (P.E.)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Pipeline Safety Improvement Act 49 USC Section 60101; PHMSA 49 CFR Parts 190-199; state pipeline safety regulations',
  standards_of_creation = 'ASME B31.4/B31.8; API 1160/1163; NACE SP0169; CSA Z662; INGAA standards',
  soc_controls = 'IMP audit; inline inspection analysis; hydrostatic testing documentation; leak detection verification; class location management; MAOP validation'
WHERE name = 'Pipeline Safety Engineer / Pipeline Integrity Engineer (P.E.)';

UPDATE citizen_catalog SET
  governing_guidelines = '49 USC Section 60101-60503; 49 CFR Parts 190-199; Pipeline Safety Improvement Act; PIPES Act',
  standards_of_creation = 'PHMSA enforcement guidance; pipeline operator protocols; API pipeline standards; ASME B31 series',
  soc_controls = 'Operator qualification audit; drug/alcohol testing compliance; emergency response plan; damage prevention program; annual report filing; incident reporting compliance'
WHERE name = 'PHMSA Compliance Officer / Pipeline Regulatory Compliance Manager';

UPDATE citizen_catalog SET
  governing_guidelines = '49 CFR Section 192/195; PHMSA integrity management; state pipeline corrosion regulations; EPA UST 40 CFR Part 280',
  standards_of_creation = 'NACE/AMPP SP0169/SP0177/SP0188; API 570/571/580/581; ASME PCC-2; AMPP certification',
  soc_controls = 'Cathodic protection survey documentation; close interval survey records; pipe-to-soil monitoring; coating assessment; corrosion coupon analysis; rectifier monitoring'
WHERE name = 'Corrosion Engineer / Cathodic Protection Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'BSEE 30 CFR Part 250; state oil and gas drilling regulations; EPA UIC 40 CFR Parts 144-148; API well construction',
  standards_of_creation = 'API RP 10B/53/65; IADC drilling standards; IWCF well control certification; state permit requirements',
  soc_controls = 'Well permit compliance; drilling operations inspection; well control equipment testing; casing/cementing verification; environmental documentation; daily drilling report accuracy'
WHERE name = 'Well Inspector / Drilling Inspector';

UPDATE citizen_catalog SET
  governing_guidelines = 'Clean Air Act 42 USC Section 7401; 40 CFR Parts 50-97; Title V; NSR/PSD; state SIPs; local AQMD rules',
  standards_of_creation = 'EPA AP-42; NSPS standards; NESHAP/MACT; state AQMD permits; CEMS 40 CFR Part 60/75',
  soc_controls = 'Emission inventory accuracy; permit condition compliance; CEMS data validation; Title V certification; NSR/PSD applicability; emission calculation methodology'
WHERE name = 'Air Quality Engineer / Permit Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'EPA GHG Reporting 40 CFR Part 98; CA Cap-and-Trade 17 CCR Section 95800; EU ETS; Paris Agreement NDCs',
  standards_of_creation = 'GHG Protocol (WRI/WBCSD); ISO 14064; IPCC Guidelines; ARB MRR; ISAE 3410',
  soc_controls = 'GHG emissions calculation audit; verification body accreditation; Scope 1/2/3 boundary documentation; allowance tracking; offset validation; MRR verification'
WHERE name = 'Greenhouse Gas (GHG) Verification Specialist / Carbon Compliance Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'Clean Water Act Section 402 NPDES; 40 CFR Parts 122-136; state NPDES programs; MS4 permits',
  standards_of_creation = 'EPA NPDES guidance; SWPPP standards; WEF/ASCE wastewater standards; state water board requirements',
  soc_controls = 'NPDES permit audit; DMR accuracy; SWPPP verification; sampling QA/QC; BMP effectiveness; pretreatment compliance'
WHERE name = 'Stormwater/Wastewater Compliance Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = 'FERC 18 CFR; PURPA Section 210; state RPS/CES; ISO/RTO market rules; state PUC contract approval; UCC Article 2',
  standards_of_creation = 'EEI Master Power Purchase Agreement; ISDA standards; ISO/RTO rules; ACORE PPA practices; RE100 standards',
  soc_controls = 'PPA term compliance monitoring; delivery obligation tracking; price adjustment audit; curtailment documentation; REC tracking; contract renewal documentation'
WHERE name = 'Power Purchase Agreement Analyst / Energy Contracts Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Title 24 Part 6 (Energy Code); 24 CCR Section 100-180; Title 24 Part 11 (CALGreen); CEC compliance',
  standards_of_creation = 'CEC Residential/Nonresidential Compliance Manuals; HERS Rater certification; RESNET/HERS Index; CalCERTS/CHEERS',
  soc_controls = 'Energy compliance documentation (CF-1R/CF-2R/CF-3R); HERS field verification; prescriptive/performance compliance; solar-ready/PV requirements; acceptance testing'
WHERE name = 'Title 24 Energy Compliance Analyst / HERS Rater (Home Energy Rating System)';

UPDATE citizen_catalog SET
  governing_guidelines = 'FERC interconnection rules; state RPS/CES; NEPA/CEQA; IRC Section 45/Section 48 (PTC/ITC); state siting; IRA provisions',
  standards_of_creation = 'IEEE 1547; IEC 61215/61730; IEC 61400; ASCE 7; NABCEP certification; UL 1741/2703',
  soc_controls = 'Interconnection study compliance; environmental assessment documentation; permit tracking; commissioning testing; performance monitoring; tax credit qualification'
WHERE name = 'Solar/Wind Project Engineer / Renewable Energy Project Developer (P.E.)';

UPDATE citizen_catalog SET
  governing_guidelines = 'NEVI Formula Program; 23 CFR Part 680; NEC Article 625; state building/electrical codes; ADA; CARB',
  standards_of_creation = 'SAE J1772/J3068/J3400; CHAdeMO/CCS; UL 2594/2202; NFPA 70; ISO 15118; OCPP',
  soc_controls = 'EVSE code compliance; ADA accessibility; NEVI program compliance; uptime monitoring; payment interoperability testing; safety certification documentation'
WHERE name = 'Electric Vehicle Supply Equipment (EVSE) Engineer / EV Infrastructure Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = '29 CFR Section 1910.119 (PSM); 8 CCR Section 5189; EPA RMP 40 CFR Part 68; CA CalARP; OSHA NEP for PSM',
  standards_of_creation = 'CCPS guidelines; API RP 750/752/754; NFPA 30/45/68; IEC 61511; ISA 84; RAGAGEP',
  soc_controls = 'PSI completeness audit; PHA revalidation compliance; MOC documentation review; incident investigation thoroughness; MI program audit; emergency response testing'
WHERE name = 'Energy Industry Safety Engineer / Process Safety Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Federal Mine Safety and Health Act 30 USC Section 801; MSHA 30 CFR Parts 40-100; MINER Act; state mining regulations',
  standards_of_creation = 'MSHA Part 46/48 training; NIOSH mining safety guidance; SME standards; ISEE explosives safety',
  soc_controls = 'MSHA inspection preparation; training plan compliance; accident reporting; roof control plan audit; ventilation compliance; emergency response documentation'
WHERE name = 'Mine Safety and Health Inspector / MSHA Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'OSHA HAZWOPER 29 CFR Section 1910.120; EPCRA/SARA Title III 42 USC Section 11001; CERCLA; DOT 49 CFR Parts 171-180',
  standards_of_creation = 'NFPA 471/472/473; OSHA HAZWOPER guidance; NRT-1; ICS/NIMS; EPA NCP 40 CFR Part 300',
  soc_controls = 'HAZWOPER training compliance; emergency response plan testing; Tier II reporting; LEPC coordination; medical surveillance; equipment inspection; incident documentation'
WHERE name = 'Emergency Response Coordinator / HAZMAT Response Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Atomic Energy Act; Nuclear Waste Policy Act 42 USC Section 10101; NRC 10 CFR Parts 20/61/71; EPA 40 CFR Part 191; DOE Order 435.1',
  standards_of_creation = 'NRC regulatory guides; DOE STD-5820; IAEA Safety Standards (GSR Part 5); ANSI/HPS N13.12; NEI decommissioning',
  soc_controls = 'Waste classification documentation; transportation packaging compliance; disposal WAC compliance; radiation exposure monitoring; waste minimization; manifest tracking'
WHERE name = 'Radioactive Waste Management Specialist / Rad Waste Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = 'State PE licensing; NCEES Model Law; NEC NFPA 70; NESC IEEE C2; IEEE power engineering standards; NERC',
  standards_of_creation = 'IEEE Power & Energy Society standards; NFPA 70/70E; NESC; NCEES PE Electrical examination; state board requirements',
  soc_controls = 'PE license verification; engineering drawing review; power system study documentation; code compliance analysis; construction observation; professional liability documentation'
WHERE name = 'Professional Engineer — Electrical / Power Systems (P.E.)';

UPDATE citizen_catalog SET
  governing_guidelines = 'FERC anti-manipulation 18 CFR Part 1c; FERC Order 844; EPA emissions trading; ISO/RTO tariffs; Energy Policy Act 2005 Section 1283',
  standards_of_creation = 'FERC market behavior rules; ISO/RTO monitoring standards; FERC enforcement guidance; EPSA market design',
  soc_controls = 'Market transaction documentation; trading limit compliance; FERC EQR filing; manipulation monitoring; physical scheduling verification; market power mitigation'
WHERE name = 'Energy Market Compliance Analyst / ISO Market Participant Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'FERC USoA 18 CFR Part 101; GASB 62; ASC 980; state PUC accounting; SOX (if public)',
  standards_of_creation = 'FERC accounting guidance; NARUC regulatory standards; AICPA utility audit guide; EEI financial reporting',
  soc_controls = 'FERC account classification audit; regulatory asset/liability verification; rate base review; depreciation compliance; fuel cost adjustment audit; affiliate transaction documentation'
WHERE name = 'Energy Industry Financial Auditor (CPA) / Utility Regulatory Accountant';

UPDATE citizen_catalog SET
  governing_guidelines = 'State insurance regulations; NAIC Model Laws; FERC/NERC insurance requirements; NRC 10 CFR Part 140; Price-Anderson Act',
  standards_of_creation = 'ISO/CGL energy endorsements; surplus lines standards; FM Global property loss prevention; reinsurance treaty standards',
  soc_controls = 'Energy risk assessment documentation; property valuation methodology; business interruption calculation; catastrophe modeling; coverage adequacy; loss control inspection'
WHERE name = 'Energy Insurance Underwriter / Risk Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = 'SMCRA 30 USC Section 1201; 30 CFR Parts 700-899; CERCLA; state mining reclamation; BLM 43 CFR Part 3800',
  standards_of_creation = 'OSM reclamation standards; SMCRA performance standards; ASTM reclamation testing; SER standards; state bonding requirements',
  soc_controls = 'Reclamation plan compliance; bond adequacy review; revegetation monitoring; water quality monitoring; topsoil documentation; final bond release documentation'
WHERE name = 'Reclamation Specialist / Mine Closure Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA PUC Section 8386; CPUC General Orders 95/128/165/166; CA PRC Section 4291; AB 1054/SB 901',
  standards_of_creation = 'CPUC Wildfire Safety Division standards; OEIS review criteria; IEEE C2 NESC; EEI utility practices',
  soc_controls = 'WMP compliance audit; vegetation management documentation; system hardening tracking; PSPS documentation; ignition investigation; de-energization notification compliance'
WHERE name = 'Wildfire Mitigation Compliance Officer / Utility Wildfire Safety Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'FERC Order 841/2222; NEC Article 706; NFPA 855; state fire marshal BESS requirements; IRS IRC Section 48E ITC',
  standards_of_creation = 'NFPA 855; UL 9540/9540A; IEEE 1547/2030; IEC 62619/62620; DNV battery standards; SAE J2464',
  soc_controls = 'BESS installation compliance; thermal runaway testing; fire suppression verification; commissioning testing; performance monitoring; degradation tracking'
WHERE name = 'Battery Energy Storage Systems (BESS) Engineer / Energy Storage Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Seismic Safety Act; Alquist-Priolo Act; ASCE 7 seismic provisions; IBC/CBC; Seismic Hazards Mapping Act',
  standards_of_creation = 'ASCE 7; ACI 318/530; AISC 341; NGA-West2; FEMA P-58/P-695; ATC seismic guidelines; CBC',
  soc_controls = 'Seismic hazard analysis documentation; structural design review; retrofit compliance; ASCE 41 evaluation; performance-based design; liquefaction analysis controls'
WHERE name = 'Seismic Safety / Earthquake Engineering Compliance Specialist (P.E.)';

UPDATE citizen_catalog SET
  governing_guidelines = 'NHPA Section 106 (54 USC Section 306108); 36 CFR Part 800; NAGPRA 25 USC Section 3001; ARPA 16 USC Section 470aa; EO 13007; NEPA',
  standards_of_creation = 'ACHP Section 106 guidance; NPS Cultural Resource Management; Secretary of Interior''''s Standards; RPA standards; tribal consultation protocols',
  soc_controls = 'Section 106 consultation documentation; APE determination; SHPO/THPO coordination; tribal consultation records; inadvertent discovery protocols; MOA/PA monitoring'
WHERE name = 'Tribal and Cultural Resources Compliance Specialist / Section 106 Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'ESA 16 USC Section 1531; NEPA; CWA Section 404; MBTA; Bald and Golden Eagle Protection Act; CA ESA Fish & Game Code Section 2050; CEQA',
  standards_of_creation = 'USFWS Section 7 consultation guidance; HCP Handbook; CDFW CESA guidance; CEQA biological standards; TWS/ESA professional standards',
  soc_controls = 'Biological assessment documentation; Section 7 consultation records; ITP/HCP compliance; critical habitat analysis; mitigation tracking; monitoring report documentation'
WHERE name = 'Endangered Species Act Compliance Specialist / Biological Resources Consultant';

UPDATE citizen_catalog SET
  governing_guidelines = 'SEC Climate Disclosure Rules; EU CSRD/ESRS; CA SB 253/261; ISSB IFRS S1/S2; EU Taxonomy; TCFD',
  standards_of_creation = 'GRI Standards; SASB Standards; ISSB; TCFD; UN SDG framework; CDP reporting; SBTi',
  soc_controls = 'ESG data quality management; Scope 1/2/3 verification; materiality assessment documentation; ESG risk integration; stakeholder engagement; third-party assurance readiness'
WHERE name = 'Chief Sustainability Officer / ESG Reporting Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'State workers'''' comp statutes; state athlete agent laws; CBA provisions; ADA; FMLA; state disability benefits',
  standards_of_creation = 'League CBA disability/injury provisions; NFLPA/MLBPA/NBPA standards; state athletic injury guidance',
  soc_controls = 'Injury reporting compliance; disability benefit calculation; CBA provision audit; multi-state jurisdictional analysis; return-to-play documentation; long-term disability tracking'
WHERE name = 'Sports League Workers'' Compensation & Disability Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'BSA 31 USC Section 5311; USA PATRIOT Act; FinCEN 31 CFR Chapter X; OFAC; AML Act of 2020; Corporate Transparency Act',
  standards_of_creation = 'FFIEC BSA/AML Examination Manual; FinCEN guidance; FATF Recommendations; Wolfsberg Group; ACAMS certification',
  soc_controls = 'SAR filing quality review; CTR accuracy; CDD/EDD documentation; OFAC screening effectiveness; transaction monitoring tuning; independent BSA/AML testing'
WHERE name = 'Bank Secrecy Act / Anti-Money Laundering Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'Reg J 12 CFR Part 210; UCC Article 4A; BSA Travel Rule 31 CFR Section 1010.410; OFAC; Fedwire/CHIPS rules; Reg E',
  standards_of_creation = 'Fedwire operating circulars; CHIPS rules; SWIFT standards; ISO 20022; NACHA rules; FFIEC guidance',
  soc_controls = 'OFAC screening documentation; Travel Rule compliance; authorization controls; Fedwire/CHIPS reconciliation; fraud monitoring; wire request documentation'
WHERE name = 'Wire Transfer / Funds Transfer Operations Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'TILA/Reg Z 12 CFR Part 1026; RESPA/Reg X 12 CFR Part 1024; SAFE Act 12 USC Section 5101; ECOA/Reg B; HMDA/Reg C; ATR/QM',
  standards_of_creation = 'NMLS licensing standards; CFPB TRID guidance; MBA origination standards; FHA/VA/USDA requirements',
  soc_controls = 'TRID disclosure timing/accuracy; ATR/QM determination; NMLS compliance; HMDA LAR accuracy; fair lending testing; loan file completeness'
WHERE name = 'Mortgage Loan Originator (MLO)';

UPDATE citizen_catalog SET
  governing_guidelines = 'TILA/Reg Z; ECOA/Reg B; FCRA; UDAAP Dodd-Frank Section 1031; SCRA; MLA; state lending laws; CFPB enforcement',
  standards_of_creation = 'CFPB examination manual; FFIEC consumer compliance procedures; ABA/CBA consumer lending guidance',
  soc_controls = 'Adverse action compliance; APR/finance charge accuracy; disclosure timing audit; fair lending testing; SCRA/MLA compliance; complaint management'
WHERE name = 'Consumer Lending / Credit Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'TILA/Reg Z; ECOA/Reg B; FCRA; CFPB indirect auto guidance; state motor vehicle financing; SCRA; MLA',
  standards_of_creation = 'CFPB auto lending procedures; AFSA/NADA compliance; state DMV title/lien requirements; BHPH guidance',
  soc_controls = 'Dealer reserve fair lending analysis; GAP product compliance; add-on disclosure audit; TILA accuracy; title perfection tracking; repossession compliance'
WHERE name = 'Auto Finance / Indirect Lending Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'FCRA 15 USC Section 1681; FCRA Section 623 Furnisher duties; Reg V 12 CFR Part 1022; ECOA/Reg B; state credit reporting laws',
  standards_of_creation = 'CFPB Furnisher compliance guidance; Metro 2 format (CDIA); CDIA data reporting; E-OSCAR requirements',
  soc_controls = 'Metro 2 accuracy audit; dispute investigation compliance (30-day); AUD code accuracy; consumer notification; data integrity controls; CFPB examination readiness'
WHERE name = 'Credit Reporting / Data Furnisher Compliance Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'Investment Company Act of 1940 15 USC Section 80a; Investment Advisers Act; SEC Rules 2a-7/22c-1/38a-1; Reg S-X',
  standards_of_creation = 'SEC fund compliance guidance; ICI Compliance Program standards; AICPA investment company audit guide; Rule 38a-1 requirements',
  soc_controls = 'Fund compliance program annual review; portfolio compliance testing; NAV calculation accuracy; prospectus/SAI compliance; board reporting; CCO annual report'
WHERE name = 'Fund Compliance Officer (Mutual Fund / ETF / Private Fund)';

UPDATE citizen_catalog SET
  governing_guidelines = 'State income/franchise tax codes; state sales/use tax; Multistate Tax Compact; P.L. 86-272; Wayfair nexus standards',
  standards_of_creation = 'MTC model statutes; COST compliance guidance; AICPA SALT guides; state DOR guidance; UDITPA',
  soc_controls = 'Nexus analysis documentation; apportionment calculation audit; sales/use tax exemption management; state filing tracking; VDA documentation; audit defense preparation'
WHERE name = 'State and Local Tax (SALT) Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'State insurance codes; NAIC Model Laws; ISO property forms; state rate filing; Valued Policy Laws; state claims handling',
  standards_of_creation = 'ISO Commercial Property forms; CPCU property knowledge; IICRC restoration; Xactimate estimation; NFPA investigation',
  soc_controls = 'Property valuation methodology; coverage determination documentation; claims investigation controls; subrogation evaluation; reserve adequacy; catastrophe response compliance'
WHERE name = 'Property Insurance Underwriter / Claims Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'BSA 31 USC Section 5311; AML Act of 2020; FinCEN 31 CFR Chapter X; USA PATRIOT Act; Corporate Transparency Act; OFAC',
  standards_of_creation = 'FFIEC BSA/AML Examination Manual; FinCEN guidance/advisories; Treasury OTFI standards; FATF Methodology',
  soc_controls = 'BSA examination procedures; SAR quality assessment; beneficial ownership testing; 314(a)/314(b) information sharing; examination reporting; enforcement referral controls'
WHERE name = 'FinCEN BSA Compliance Examiner / FinCEN Intelligence Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'BSA 31 USC Section 5311; FinCEN FIN-2019-G001; state MTL; NYDFS BitLicense 23 NYCRR Part 200; IRS Notice 2014-21',
  standards_of_creation = 'FATF Virtual Asset guidance; FinCEN MSB registration; NYDFS virtual currency standards; CCSS; AICPA digital asset guidance',
  soc_controls = 'Blockchain analytics and transaction monitoring; OFAC/blockchain address screening; KYC/CDD for crypto customers; cold/hot wallet controls; SAR filing; travel rule compliance'
WHERE name = 'Cryptocurrency / Digital Asset Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Dodd-Frank Title X; ECOA/Reg B; HMDA/Reg C; TILA/Reg Z; FCRA; UDAAP; state fair lending; CRA; Interagency Fair Lending',
  standards_of_creation = 'CFPB Supervision Manual; Interagency Fair Lending Examination Procedures; FFIEC HMDA procedures; DOJ pattern or practice guidance',
  soc_controls = 'Fair lending statistical analysis; HMDA data integrity testing; redlining assessment; disparate impact/treatment analysis; pricing exception audit; CMS evaluation'
WHERE name = 'CFPB Supervisory Examiner / Fair Lending Examiner';

UPDATE citizen_catalog SET
  governing_guidelines = 'IRC Subtitle B (Estate/Gift Tax); IRC Section Section 2001-2704; Uniform Trust Code; UPC; state probate codes; ERISA',
  standards_of_creation = 'ACTEC practice standards; ABA RPTE Law Section; AICPA estate tax guide; state bar estate specialization',
  soc_controls = 'Trust document standards; Form 706 accuracy; trust administration compliance; fiduciary duty documentation; beneficiary notification; annual trust accounting'
WHERE name = 'Estate Planning / Trust and Estates Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = 'PCI DSS v4.0; GLBA Safeguards Rule; state breach notification; CCPA/CPRA; card brand operating regulations; NACHA',
  standards_of_creation = 'PCI SSC standards (DSS, PA-DSS, P2PE, 3DS); NIST CSF; ISO 27001; card brand programs; EMVCo',
  soc_controls = 'PCI DSS self-assessment/ROC compliance; vulnerability scanning; penetration testing; incident response testing; cardholder data flow documentation; compensating control validation'
WHERE name = 'PCI DSS Compliance Officer / Payment Systems Compliance Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'State banking statutes; FDIC Act; Federal Reserve Act; BSA; CRA; state consumer protection; CSBS accreditation',
  standards_of_creation = 'FFIEC UFIRS (CAMELS); CSBS Accreditation Standards; FFIEC examination handbooks; state DFI procedures',
  soc_controls = 'CAMELS rating methodology; capital adequacy assessment; asset quality review; management assessment; earnings analysis; liquidity/sensitivity testing'
WHERE name = 'State Bank Examiner / Financial Institution Examiner';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Civil Code Section 1812.80-1812.98; FTC Act Section 5; state health club licensing; ADA; OSHA',
  standards_of_creation = 'IHRSA standards; AED/CPR certification; NSCA facility guidelines; ACSM Standards',
  soc_controls = 'Membership contract compliance; cancellation/refund audit; facility safety inspection; AED maintenance; staff certification; financial disclosure compliance'
WHERE name = 'Health Club Owner/Operator';

UPDATE citizen_catalog SET
  governing_guidelines = 'FDA 21 CFR Parts 1040.20/1040.30; FTC tanning rules; state regulations; CA H&S Code Section 22706 (minors ban)',
  standards_of_creation = 'FDA UV radiation standards; state DoH tanning regulations; AAD sun safety; WHO UV guidelines',
  soc_controls = 'Equipment compliance (timer/exposure); minor prohibition enforcement; eye protection provision; staff training; sanitation; consumer disclosure/consent'
WHERE name = 'Tanning Facility Owner/Operator';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 7301-7441; 16 CCR Division 9; OSHA BBP Standard; state sanitation codes',
  standards_of_creation = 'CA Board of Barbering and Cosmetology standards; NACCAS accreditation; state sanitation standards; Milady standards',
  soc_controls = 'License verification; sanitation audit; chemical safety documentation; CE compliance; client consultation documentation; equipment maintenance controls'
WHERE name = 'Licensed Cosmetologist';

UPDATE citizen_catalog SET
  governing_guidelines = 'State body art regulations; CA H&S Code Section 119300-119328; local permits; FDA 21 CFR Part 73/74; OSHA BBP',
  standards_of_creation = 'SPCP standards; AAM standards; bloodborne pathogen training; state health department guidelines',
  soc_controls = 'Practitioner certification; informed consent documentation; sterilization/spore testing; color additive safety; adverse reaction reporting; infection control compliance'
WHERE name = 'Permanent Makeup Artist / Microblading Technician';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 7301-7441; 16 CCR Division 9; state establishment licensing; OSHA; ADA',
  standards_of_creation = 'CA Board establishment standards; OSHA salon safety guidance; state fire marshal requirements; ADA facility standards',
  soc_controls = 'Establishment license verification; booth rental vs employee classification; sanitation inspection; workers'''' comp coverage; IC compliance; fire/safety compliance'
WHERE name = 'Cosmetology/Barbering Establishment Owner';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 7301-7441; state booth rental regulations; IRS IRC Section 3401/Section 3121; CA AB 5/ABC test; state tax',
  standards_of_creation = 'CA Board booth rental guidance; IRS worker classification guidance; state EDD standards; CPA practice guidelines',
  soc_controls = 'Worker classification audit (employee vs IC); booth rental agreement compliance; tax withholding/1099; IC documentation; insurance coverage; establishment license compliance'
WHERE name = 'Salon Booth Rental Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA H&S Code Section 119300-119328; local county body art regulations; OSHA BBP 29 CFR Section 1910.1030; FDA 21 CFR Parts 73/74',
  standards_of_creation = 'APT standards; OSHA BBP guidance; EPA-registered disinfectants; autoclave spore testing; ASTM sterilization',
  soc_controls = 'Registration/permit verification; autoclave spore documentation; informed consent records; sharps disposal; infection control audit; client aftercare documentation'
WHERE name = 'Registered Body Art Practitioner -- Tattoo';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA H&S Code Section 119300-119328; local county regulations; OSHA BBP 29 CFR Section 1910.1030; FDA device classification (jewelry)',
  standards_of_creation = 'APP standards; OSHA BBP guidance; sterilization standards; ASTM F136/ISO 5832-1 jewelry standards',
  soc_controls = 'Registration/permit verification; autoclave spore testing; jewelry material verification; informed consent; age verification (minors); infection control compliance'
WHERE name = 'Registered Body Art Practitioner -- Piercing';

UPDATE citizen_catalog SET
  governing_guidelines = 'OSHA BBP 29 CFR Section 1910.1030; 8 CCR Section 5193; Needlestick Safety Act; CDC/HICPAC guidelines; CMS CoP',
  standards_of_creation = 'CDC/HICPAC guidelines; APIC standards; OSHA BBP guidance; SHEA/IDSA recommendations; state health department guidance',
  soc_controls = 'Exposure Control Plan annual review; HepB vaccination program; post-exposure follow-up; sharps injury log; engineering controls evaluation; employee training records'
WHERE name = 'Infection Control Officer / Bloodborne Pathogen Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'State medical practice acts (laser as device); FDA 21 CFR Parts 1040.10/1040.11; CA B&P Code Section 2023/2054; OSHA laser safety',
  standards_of_creation = 'ANSI Z136.3; FDA CDRH laser classification; state medical board laser supervision; ASLMS practice standards',
  soc_controls = 'Medical director oversight documentation; laser equipment registration; operator training; informed consent; adverse event reporting; treatment record/photo documentation'
WHERE name = 'Laser Tattoo Removal Facility Director';

UPDATE citizen_catalog SET
  governing_guidelines = 'State body art health and safety regulations; OSHA BBP Standard; state consumer protection; FTC Act Section 5',
  standards_of_creation = 'APP/APT aftercare standards; CDC wound care guidelines; FDA OTC topical labeling; professional association guidance',
  soc_controls = 'Aftercare instruction distribution; adverse reaction follow-up; product safety/labeling; client communication records; infection monitoring; quality improvement documentation'
WHERE name = 'Client Aftercare Documentation Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = '18 USC Section 841-Section 848; 27 CFR Part 555; ATF regulations; OSHA 29 CFR Section 1910.109; DOT 49 CFR Parts 171-180',
  standards_of_creation = 'ATF P 5400.7; IME safety library; NFPA 495; ISEE Blasters'''' Handbook',
  soc_controls = 'ATF license compliance; magazine storage inspection; acquisition/disposition records; employee possessor verification; inventory reconciliation; theft/loss reporting'
WHERE name = 'Federal Explosives Licensee / Responsible Person';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA H&S Code Section 12000-12312; 19 CCR Division 1 Chapter 10; Cal/OSHA Title 8; local fire marshal permits; DOT 49 CFR',
  standards_of_creation = 'CAL FIRE OSFM explosives standards; NFPA 495; IME safety library; Cal/OSHA explosives safety orders',
  soc_controls = 'State permit verification; magazine compliance; blasting plan documentation; inventory control; seismograph records; local authority coordination'
WHERE name = 'California Explosives Permit Holder';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA H&S Code Section 12500-12728; 19 CCR Division 1 Chapter 6; OSHA General Duty Clause; DOT 49 CFR; NFPA 1123/1126',
  standards_of_creation = 'NFPA 1123/1126; CA OSFM pyrotechnic standards; PGI safety standards; BATFE permit requirements',
  soc_controls = 'Operator license verification; display site safety plan; crowd distance compliance; insurance verification; post-display inspection; incident reporting'
WHERE name = 'Licensed Pyrotechnic Operator / Proximate Audience Display Operator';

UPDATE citizen_catalog SET
  governing_guidelines = '49 CFR Parts 171-180; 49 CFR Part 383/391 CDL; TSA security threat assessment; DOT HM-232; FMCSA',
  standards_of_creation = 'DOT HMR guidance; FMCSA CDL testing; TSA TWIC/HME requirements; ERG; NTTC/TCA safety standards',
  soc_controls = 'CDL-H endorsement verification; TSA background check; vehicle inspection documentation; shipping papers/placarding; route planning; emergency response training records'
WHERE name = 'Hazardous Materials CDL Driver -- Explosives (Class 1)';

UPDATE citizen_catalog SET
  governing_guidelines = 'MSHA 30 CFR Parts 56-57/75-77; 27 CFR Part 555 ATF; state blasting regulations; OSHA 29 CFR Section 1926 Subpart U',
  standards_of_creation = 'ISEE Blasters'''' Handbook; MSHA blasting training; IME safety library; NFPA 495; state blaster certification',
  soc_controls = 'Blaster certification verification; blast plan documentation; seismograph monitoring; misfire procedures; magazine compliance; explosive inventory reconciliation'
WHERE name = 'Mine Blaster / Shot Firer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Financial Code Section 3080-3099; CA B&P Code Section 7521 PPO; DOT 49 CFR; state armored car regulations; FMCSA',
  standards_of_creation = 'BSIS armored car licensing; ASIS armored car operations; insurance bonding; cash handling standards (Fed/USSS)',
  soc_controls = 'Operator license verification; employee background check; cash handling audit; GPS/route documentation; insurance/bond verification; incident reporting'
WHERE name = 'Armored Contract Carrier Operator';

UPDATE citizen_catalog SET
  governing_guidelines = 'PCI PTS; PCI DSS v4.0; BSA/AML; state ATM regulations; ADA; Reg E 12 CFR Part 1005; UL 291',
  standards_of_creation = 'PCI PTS device security; ATMIA standards; UL 291; ESTA CIT standards; manufacturer service manuals',
  soc_controls = 'PCI PTS compliance; cash replenishment reconciliation; tamper detection inspection; encryption key management; ADA verification; maintenance log documentation'
WHERE name = 'ATM Servicing Technician / ATM First Line Maintenance';

UPDATE citizen_catalog SET
  governing_guidelines = 'ECPA 18 USC Section 2510-2522; state surveillance laws; CA Penal Code Section 637-638.55; BIPA-type statutes; GDPR',
  standards_of_creation = 'ASIS electronic security standards; SIA standards; ONVIF video standards; state privacy frameworks',
  soc_controls = 'Consent/notice documentation; data retention policy; access control audit; recording storage security; privacy impact assessment; regulatory disclosure compliance'
WHERE name = 'Electronic Monitoring Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA W&I Code Section 300-395; CAPTA 42 USC Section 5101; ICWA 25 USC Section 1901; Title IV-E/IV-B; HIPAA; Tarasoff',
  standards_of_creation = 'NASW Code of Ethics; NASW Child Welfare Standards; CWLA Standards; state DSS policies; ASWB standards',
  soc_controls = 'Child safety assessment documentation; ICPC compliance; case plan quality; mandatory reporting; caseload standards; placement stability tracking'
WHERE name = 'Social Worker / Children''s Social Services Worker';

UPDATE citizen_catalog SET
  governing_guidelines = 'PHS Act 42 USC Section 201; HIPAA; state communicable disease reporting; 42 CFR Part 70/71; FERPA',
  standards_of_creation = 'CDC MMWR case definitions; CSTE position statements; WHO IHR (2005); CIFOR; CEPH standards',
  soc_controls = 'Surveillance data quality; outbreak investigation documentation; case definition compliance; statistical methodology validation; privacy controls; publication accuracy'
WHERE name = 'Epidemiologist (state/local/federal public health)';

UPDATE citizen_catalog SET
  governing_guidelines = 'State nurse practice acts; CA B&P Code Section 2818 PHN certification; state public health statutes; HIPAA; Title V MCH',
  standards_of_creation = 'ACHNE standards; QUAD Council PHN competencies; ANA PHN standards; PHN certification requirements',
  soc_controls = 'PHN certification verification; communicable disease investigation; immunization program compliance; home visit documentation; community health assessment; mandatory reporting compliance'
WHERE name = 'Public Health Nurse (PHN)';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 2700-2838.4; 16 CCR Division 14; HIPAA; state nurse practice acts; Nurse Licensure Compact',
  standards_of_creation = 'CA BRN standards; ANA Nursing Standards; ANCC certification; NCSBN Model Practice Act',
  soc_controls = 'License verification; scope of practice compliance; medication administration audit; CE tracking; documentation standards; disciplinary history review'
WHERE name = 'Home Health Registered Nurse (RN — Home Health)';

UPDATE citizen_catalog SET
  governing_guidelines = 'CMS 42 CFR Part 483; state NHA licensing; ADA; HIPAA; state LTC regulations; OBRA 1987',
  standards_of_creation = 'NAB standards; CMS SOM Appendix PP; AHCA quality; TJC/ACHC/CARF accreditation',
  soc_controls = 'CMS survey readiness; quality measure compliance; staffing documentation; resident rights; abuse/neglect prevention; financial management controls'
WHERE name = 'Nursing Home Administrator (Licensed NHA)';

UPDATE citizen_catalog SET
  governing_guidelines = '38 USC; 38 CFR Part 3/4; VA M21-1; VASRD; AMA Guides',
  standards_of_creation = 'VA C&P Examination standards; DBQ requirements; VBA training; VASRD methodology; VA clinical practice guidelines',
  soc_controls = 'DBQ completeness audit; VASRD rating criteria application; medical opinion adequacy; examination quality review; nexus opinion documentation; remand compliance tracking'
WHERE name = 'Compensation & Pension (C&P) Examiner';

UPDATE citizen_catalog SET
  governing_guidelines = 'State forensic psychiatry practice acts; Daubert/Frye standards; state competency/insanity statutes; HIPAA; Tarasoff; 42 CFR Part 2',
  standards_of_creation = 'AAPL Practice Guidelines; APA Practice Guidelines; ABPN board certification; forensic fellowship standards; AAPL ethics',
  soc_controls = 'Forensic evaluation methodology; competency assessment compliance; risk assessment validation; expert opinion documentation; confidentiality analysis; court report quality'
WHERE name = 'Forensic Psychiatrist (MD — Psychiatry, Forensic Psychiatry subspecialty)';

UPDATE citizen_catalog SET
  governing_guidelines = 'HCQIA 42 USC Section 11101; state peer review statutes; CA B&P Code Section 805; TJC MS standards; state medical practice acts',
  standards_of_creation = 'TJC Medical Staff Standards; CMS CoP; AMA peer review guidelines; state medical board standards',
  soc_controls = 'Peer review committee documentation; HCQIA compliance (due process); Section 805 reporting; FPPE; OPPE; data-driven decision documentation'
WHERE name = 'Peer Review Physician / Medical Staff Peer Review Committee Chair';

UPDATE citizen_catalog SET
  governing_guidelines = 'State dietitian licensing; CMS nutrition CoP; Medicare MNT benefit; state food service regulations; HIPAA; USDA',
  standards_of_creation = 'AND Standards of Practice; CDR standards; ASPEN nutrition support; CMS MNT guidelines',
  soc_controls = 'RDN credential verification; nutrition care process documentation; MNT billing compliance; protocol adherence; food safety audit; patient outcome tracking'
WHERE name = 'Registered Dietitian Nutritionist (RDN)';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 2530-2538.8; state audiology practice acts; HIPAA; FDA hearing device regulations; Medicare; IDEA',
  standards_of_creation = 'ASHA CCC-A certification; AAA practice guidelines; ABA accreditation; FDA hearing aid regulations; state dispensing standards',
  soc_controls = 'License/certification verification; audiometric equipment calibration; hearing aid fitting documentation; infection control; scope compliance; patient outcome documentation'
WHERE name = 'Audiologist (AuD)';

UPDATE citizen_catalog SET
  governing_guidelines = 'State podiatric medicine practice acts; CA B&P Code Section 2460-2499.5; HIPAA; Medicare/Medicaid; DEA; state prescription monitoring',
  standards_of_creation = 'CPME accreditation; ABFAS/ABPS certification; APMA practice guidelines; ACFAS surgical standards',
  soc_controls = 'License verification; surgical privilege documentation; controlled substance compliance; infection control; medical record documentation; CE compliance'
WHERE name = 'Podiatrist (DPM — Doctor of Podiatric Medicine)';

UPDATE citizen_catalog SET
  governing_guidelines = 'NRC 10 CFR Parts 20/35; state radiation control; FDA 21 CFR Parts 312/361; CMS radiologic requirements',
  standards_of_creation = 'SNMMI practice guidelines; NMTCB/ARRT certification; ACR practice parameters; NRC licensee guidance; AAPM QA',
  soc_controls = 'Radioactive material handling; dose calibrator QA; patient dose verification; RSO coordination; image quality audit; continuing competency documentation'
WHERE name = 'Nuclear Medicine Technologist (CNMT)';

UPDATE citizen_catalog SET
  governing_guidelines = 'National Organ Transplant Act 42 USC Section 274; OPTN Final Rule 42 CFR Part 121; CMS OPO CoC 42 CFR Part 486; Uniform Anatomical Gift Act',
  standards_of_creation = 'UNOS/OPTN policies; AOPO standards; CMS OPO standards; AATB standards; NATCO certification',
  soc_controls = 'Donor referral timeliness; consent/authorization compliance; organ allocation compliance (match run); donor management documentation; family support documentation; ischemic time tracking'
WHERE name = 'Organ Procurement Coordinator / Transplant Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'OSHA Medical Surveillance 29 CFR Part 1910 Subpart Z; FMLA certification; ADA fitness for duty; state WC guidelines; DOT 49 CFR Part 391',
  standards_of_creation = 'ACOEM Practice Guidelines; ABPM/ABOM certification; NIOSH exposure criteria; DOT FMCSA physical standards; state WC guidelines',
  soc_controls = 'Medical surveillance compliance; fitness-for-duty documentation; DOT physical accuracy; exposure history documentation; return-to-work documentation; OSHA recordable causation'
WHERE name = 'Occupational Medicine Physician (MD/DO)';

UPDATE citizen_catalog SET
  governing_guidelines = 'State dental/medical practice acts; CA B&P Code Section 1600-1976; DEA registration; state anesthesia permits; HIPAA; CMS surgical conditions',
  standards_of_creation = 'AAOMS Parameters of Care; ADA/CDABO standards; ABOMS certification; TJC ambulatory surgery; AAOMS anesthesia',
  soc_controls = 'Surgical privilege documentation; anesthesia permit compliance; infection control audit; controlled substance prescribing; informed consent; surgical outcome tracking'
WHERE name = 'Oral and Maxillofacial Surgeon (OMS — DDS/DMD, often MD)';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 1900-1966.6; state dental hygiene practice acts; HIPAA; OSHA BBP; state supervision requirements',
  standards_of_creation = 'Dental Hygiene Board of CA; ADHA Standards; CDHA guidelines; NBDHE standards',
  soc_controls = 'License verification; scope compliance; supervision documentation; infection control audit; radiographic safety; patient assessment documentation'
WHERE name = 'Registered Dental Hygienist (RDH)';

UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR Parts 600-680; 42 CFR Part 493 CLIA; state clinical lab regulations; FDA Blood Establishment; PHS Act Section 351',
  standards_of_creation = 'AABB Standards; CAP accreditation (transfusion medicine); FDA CGMP for blood; WHO blood safety guidelines',
  soc_controls = 'FDA inspection readiness; donor eligibility audit; blood product testing; transfusion reaction investigation; temperature monitoring; lookback procedure documentation'
WHERE name = 'Blood Bank Medical Director / Transfusion Medicine Specialist (MD — BB/TM subspecialty); Blood Bank Technologist (BB(ASCP))';

UPDATE citizen_catalog SET
  governing_guidelines = 'ACA Section 1311(c)(1)(E); CMS Star Ratings; state managed care regulations; ERISA; Mental Health Parity Act',
  standards_of_creation = 'NCQA HEDIS Technical Specifications; NCQA Accreditation; CMS Quality Rating; URAC accreditation; AHRQ quality indicators',
  soc_controls = 'HEDIS measure calculation accuracy; data collection methodology; medical record review audit; rate validation; improvement intervention documentation; NCQA accreditation compliance'
WHERE name = 'HEDIS Analyst / Managed Care Quality Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'CMS CoP; OSHA healthcare standards; state hospital licensing; TJC EC/LS standards; NFPA 99/101; EPA regulated waste',
  standards_of_creation = 'TJC Environment of Care; NFPA 99/101; OSHA hospital safety; ASSE healthcare facility; ASHE compliance guidance',
  soc_controls = 'EC rounding documentation; life safety compliance; hazmat/waste management; utility systems management; medical equipment management; safety committee documentation'
WHERE name = 'Healthcare Safety Officer / Environment of Care Director';

UPDATE citizen_catalog SET
  governing_guidelines = 'HIPAA 42 USC Section 1320d; ACA; Anti-Kickback 42 USC Section 1320a-7b; Stark Law 42 USC Section 1395nn; EMTALA; FCA; state licensing; state medical practice acts',
  standards_of_creation = 'AHLA health law standards; ABA Health Law Section; HCCA compliance guidance; state bar health law specialization',
  soc_controls = 'Regulatory compliance assessment; HIPAA privacy/security audit; Stark/AKS arrangement review; corporate practice analysis; M&A due diligence; litigation risk documentation'
WHERE name = 'Healthcare Attorney / Health Law Counsel';

UPDATE citizen_catalog SET
  governing_guidelines = 'ACGME Institutional Requirements; CMS GME 42 CFR Section 413.75-Section 413.83; state medical education; LCME; VA GME affiliations',
  standards_of_creation = 'ACGME Common/Specialty Requirements; NRMP Match rules; ECFMG certification; ACGME CLER; AAMC GME funding',
  soc_controls = 'ACGME accreditation compliance; resident duty hours monitoring; program evaluation documentation; milestone assessment tracking; GME funding compliance (IME/DME); sponsoring institution report'
WHERE name = 'GME Director / DIO';

UPDATE citizen_catalog SET
  governing_guidelines = 'State nurse practice acts (APRN); CA B&P Code Section 2835-2837; DEA; state prescriptive authority; HIPAA; mandatory reporting; 42 CFR Part 2',
  standards_of_creation = 'ANCC PMHNP certification; ISPN practice guidelines; ANA Psychiatric-Mental Health standards; state BRN APRN standards',
  soc_controls = 'APRN credential verification; prescriptive authority compliance; CURES compliance; collaborative practice documentation; patient assessment documentation; CE compliance'
WHERE name = 'Psychiatric Mental Health Nurse Practitioner (PMHNP)';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Insurance Code Section 1621-1758.993; 10 CCR Section 2186-2192; NAIC Producer Licensing; state property insurance regulations',
  standards_of_creation = 'CDI licensing; CPCU property knowledge; CIC certification; state CE requirements; AINS',
  soc_controls = 'License/appointment verification; surplus lines compliance; trust account audit; disclosure documentation; E&O coverage; CE tracking'
WHERE name = 'Property Broker-Agent (Property Lines)';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Insurance Code Section 1621-1758.993; 10 CCR Section 2186-2192; NAIC Producer Licensing; state casualty regulations',
  standards_of_creation = 'CDI licensing; CPCU casualty knowledge; CIC standards; state CE; WC specialist certification',
  soc_controls = 'License/appointment verification; coverage placement documentation; claims reporting compliance; trust account audit; E&O coverage; CE tracking'
WHERE name = 'Casualty Broker-Agent (Casualty Lines)';

UPDATE citizen_catalog SET
  governing_guidelines = 'State UCSPA; NAIC Model 900; state DOI regulations; state bad faith statutes; ADA/FMLA',
  standards_of_creation = 'NAIC Model Act compliance; ISO claims handling; CLM standards; CPCU/AIC claims knowledge',
  soc_controls = 'Claims timeliness audit; statutory notice compliance; denial documentation; SIU referral audit; bad faith review; policyholder communication documentation'
WHERE name = 'Claims Compliance Officer / UCSPA Compliance Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'State title insurance statutes; CA Insurance Code Section 12340-12419; RESPA/Reg X; CFPB TRID; ALTA standards',
  standards_of_creation = 'ALTA Best Practices Framework; ALTA title forms; state rating/filing requirements; CLTA standards',
  soc_controls = 'Title search quality audit; exception documentation; closing/settlement accuracy; escrow reconciliation; ALTA Best Practices compliance; premium filing compliance'
WHERE name = 'Title Insurance Officer / Title Underwriter';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Insurance Code Section 10089-10089.54; CEA Plan of Operations; state earthquake insurance regulations; NAIC catastrophe standards',
  standards_of_creation = 'CEA participating insurer requirements; CEA rate methodology; ISO earthquake forms; NAIC catastrophe modeling',
  soc_controls = 'CEA participation compliance; loss mitigation documentation; rate/premium accuracy; policyholder notification; claims handling protocol; catastrophe response plan'
WHERE name = 'CEA Participating Insurer Agent / Earthquake Insurance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Securities Act/Exchange Act; SOX; Dodd-Frank; state corporate governance; ERISA Section 502; state insurance regulations',
  standards_of_creation = 'ISO Management Liability forms; D&O Diary industry guidance; PLI underwriting; RIMS D&O guidance',
  soc_controls = 'D&O application accuracy; securities litigation exposure analysis; corporate governance assessment; claims-made management; retention/limit adequacy; renewal documentation'
WHERE name = 'D&O Underwriter / Management Liability Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CERCLA 42 USC Section 9601; RCRA; Clean Water Act; Clean Air Act; state environmental liability; ISO pollution exclusion',
  standards_of_creation = 'ISO Pollution Liability forms; ASTM Phase I/II ESA; Environmental Professional''''s Guide; site assessment standards',
  soc_controls = 'Environmental risk assessment; site condition report review; pollution exclusion analysis; historical land use investigation; claims trigger analysis; remediation cost estimation'
WHERE name = 'Environmental Liability Underwriter / Pollution Legal Liability Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Restatement (Third) Products Liability; state products liability; CPSIA; CPSC regulations; FDA product regulations',
  standards_of_creation = 'ISO CGL/Products Liability forms; product recall insurance; CPSC recall database; industry loss experience; risk engineering inspection',
  soc_controls = 'Product classification accuracy; hazard analysis documentation; loss history review; recall exposure assessment; premium adequacy; risk engineering inspection documentation'
WHERE name = 'Product Liability Underwriter';

UPDATE citizen_catalog SET
  governing_guidelines = 'State insurance regulations; ISO Umbrella/Excess forms; follow-form provisions; state surplus lines; reinsurance treaties',
  standards_of_creation = 'ISO Commercial Umbrella/Excess forms; IRMI umbrella/excess analysis; Swiss Re/Munich Re guidelines; ALM standards',
  soc_controls = 'Underlying coverage verification; drop-down exposure analysis; SIR adequacy; following form vs stand-alone analysis; aggregate tracking; premium allocation documentation'
WHERE name = 'Umbrella/Excess Liability Underwriter';

UPDATE citizen_catalog SET
  governing_guidelines = 'State subrogation statutes; Made Whole Doctrine; Common Fund Doctrine; ERISA preemption; state WC subrogation; collateral source rules',
  standards_of_creation = 'NASP standards; Arbitration Forums; ISO subrogation standards; CLM subrogation practices; state-specific guidance',
  soc_controls = 'Subrogation identification audit; lien calculation accuracy; recovery allocation compliance; statute of limitations tracking; arbitration documentation; net recovery reporting'
WHERE name = 'Subrogation Recovery Specialist / Subrogation Counsel';

UPDATE citizen_catalog SET
  governing_guidelines = 'National Bank Act 12 USC Section 1; OCC 12 CFR Parts 1-199; Dodd-Frank; BSA; CRA; BHC Act',
  standards_of_creation = 'OCC Comptroller''''s Handbook; FFIEC procedures; OCC Heightened Standards 12 CFR Part 30 App D; ABA compliance',
  soc_controls = 'OCC examination preparation; charter compliance; BSA program audit; CRA review; capital adequacy; ERM documentation'
WHERE name = 'National Bank Charter Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CRA 12 USC Section 2901; CRA regulations 12 CFR Parts 25/228/345; OCC/Fed/FDIC CRA final rules; HMDA',
  standards_of_creation = 'Interagency CRA examination procedures; OCC/Fed/FDIC CRA Q&A; FFIEC CRA evaluation; NCRC practices',
  soc_controls = 'CRA data collection/reporting; lending/investment/service test documentation; assessment area delineation; community development tracking; strategic plan compliance; performance evaluation preparation'
WHERE name = 'Community Reinvestment Act (CRA) Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'ECOA 15 USC Section 1691/Reg B 12 CFR Part 1002; Fair Housing Act 42 USC Section 3601; HMDA/Reg C 12 CFR Part 1003; Dodd-Frank Section 1071',
  standards_of_creation = 'FFIEC Interagency Fair Lending Procedures; CFPB ECOA procedures; DOJ fair lending guidance; HMDA Filing Instructions',
  soc_controls = 'Fair lending statistical analysis; HMDA LAR data integrity; redlining assessment; pricing exception audit; adverse action compliance; CMS documentation'
WHERE name = 'Fair Lending Officer / ECOA-HMDA Compliance Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'BSA 31 USC Section 5311; USA PATRIOT Act; FinCEN 31 CFR Chapter X; OFAC; AML Act of 2020; CDD Rule',
  standards_of_creation = 'FFIEC BSA/AML Manual; FinCEN guidance; FATF 40 Recommendations; Wolfsberg Group; ACAMS body of knowledge',
  soc_controls = 'BSA/AML 5-pillar program assessment; SAR quality/timeliness; CTR accuracy; CDD/EDD audit; OFAC screening; independent testing documentation'
WHERE name = 'Bank Secrecy Act / Anti-Money Laundering Officer (BSA Officer)';

UPDATE citizen_catalog SET
  governing_guidelines = 'EFTA 15 USC Section 1693/Reg E 12 CFR Part 1005; Dodd-Frank; Durbin Amendment; NACHA Rules',
  standards_of_creation = 'CFPB Reg E procedures; FFIEC Retail Payment Systems handbook; NACHA Rules; Fed operating circulars',
  soc_controls = 'Error resolution compliance (10/45-day); initial disclosure accuracy; change-in-terms notice; unauthorized transfer liability; periodic statement accuracy; overdraft opt-in compliance'
WHERE name = 'Electronic Fund Transfer (Reg E) Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'TILA 15 USC Section 1601/Reg Z 12 CFR Part 1026; CARD Act; HOEPA; ATR/QM; TRID',
  standards_of_creation = 'CFPB Reg Z procedures; FFIEC consumer compliance handbook; CFPB TRID/ATR/QM/CARD Act guidance',
  soc_controls = 'APR/finance charge accuracy; disclosure timing; TRID LE/CD audit; rescission compliance; rate lock documentation; advertising compliance'
WHERE name = 'Truth in Lending (Reg Z) Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'EFAA 12 USC Section 4001/Reg CC 12 CFR Part 229; Check 21 Act; state UCC Article 4; Fed operating circulars',
  standards_of_creation = 'FFIEC Reg CC procedures; Fed Reg CC commentary; ABA Reg CC guidance; Check 21 imaging standards',
  soc_controls = 'Funds availability schedule compliance; exception hold documentation; large deposit/new account hold; case-by-case hold notice; returned check processing; substitute check compliance'
WHERE name = 'Funds Availability (Reg CC) Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'TISA 12 USC Section 4301/Reg DD 12 CFR Part 1030; state deposit regulations; EFTA/Reg E interaction',
  standards_of_creation = 'CFPB Reg DD procedures; FFIEC compliance handbook; ABA deposit compliance; FDIC deposit insurance compliance',
  soc_controls = 'APY calculation accuracy; disclosure completeness; periodic statement compliance; advertising verification; fee schedule accuracy; early withdrawal penalty disclosure'
WHERE name = 'Truth in Savings (Reg DD) Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'EFTA/Reg E Section 1005.17; TISA/Reg DD; UDAAP; OCC/Fed/FDIC overdraft guidance; CFPB overdraft/NSF guidance',
  standards_of_creation = 'CFPB overdraft examination guidance; Interagency overdraft guidance; ABA overdraft compliance; CFPB Consumer Circular on overdraft',
  soc_controls = 'Opt-in/opt-out documentation; overdraft fee disclosure; re-presentment NSF practices; posting order analysis; excessive fee monitoring; consumer complaint tracking'
WHERE name = 'Overdraft / NSF Program Compliance Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'TILA/CARD Act 15 USC Section 1637; Reg Z Subpart G; Durbin Amendment Reg II; FCRA; ECOA/Reg B; UDAAP; PCI DSS',
  standards_of_creation = 'CFPB credit card procedures; card brand operating regulations; PCI DSS; FFIEC consumer compliance handbook',
  soc_controls = 'CARD Act pricing restrictions; Schumer Box accuracy; ability-to-pay assessment; billing error resolution; rewards compliance; interchange fee regulation'
WHERE name = 'Card Services Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'EFTA/Reg E; ECOA/Reg B; ADA/WCAG; state digital banking; FFIEC social media/mobile guidance; UDAAP; CFPB tech sprint',
  standards_of_creation = 'FFIEC IT Handbook; WCAG 2.1 AA; CFPB digital marketing/servicing; FDIC digital banking guidance',
  soc_controls = 'Mobile/online accessibility audit; digital disclosure delivery; E-SIGN consent verification; app store compliance; assistive technology testing; data security controls'
WHERE name = 'Digital Banking / Mobile Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'BSA Travel Rule 31 CFR Section 1010.410; OFAC sanctions; UCC Article 4A; Reg J; Fedwire/CHIPS; EU wire transfer regulation',
  standards_of_creation = 'FFIEC BSA/AML wire procedures; OFAC compliance framework; SWIFT due diligence; Wolfsberg wire guidance',
  soc_controls = 'OFAC screening hit resolution; Travel Rule completeness; wire authorization controls; suspicious activity monitoring; correspondent bank due diligence; wire fraud prevention'
WHERE name = 'Wire Transfer Compliance Officer / Sanctions Screening Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'BSA/AML 31 USC Section 5311; USA PATRIOT Act Section 312 (EDD); OFAC; FinCEN CDD Rule; FATF Rec 13',
  standards_of_creation = 'FFIEC BSA/AML correspondent banking procedures; Wolfsberg Correspondent Banking Principles; FATF guidance; Basel Committee standards',
  soc_controls = 'Correspondent bank due diligence (CBDDQ); nested/payable-through monitoring; OFAC screening; KYC for respondent banks; transaction monitoring; periodic relationship review'
WHERE name = 'Correspondent Banking / Foreign Financial Institution Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'BSA 31 USC Section 5311; FinCEN MSB 31 CFR Section 1010/1022; state MTL laws; USA PATRIOT Act; CFPB Remittance Rule',
  standards_of_creation = 'FinCEN MSB registration guidance; CSBS Model Money Transmission Act; NMLS MSB standards; state DFI licensing',
  soc_controls = 'FinCEN MSB registration compliance; state licensing/renewal tracking; BSA/AML audit; agent oversight; SAR/CTR filing; surety bond/permissible investments compliance'
WHERE name = 'MSB Registration / Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Reg E Subpart B Section 1005.18; FinCEN Prepaid Access; state MTL; state escheatment; CFPB prepaid rule',
  standards_of_creation = 'CFPB Prepaid Account standards; FinCEN prepaid guidance; NACHA rules; card brand standards; escheatment guidance',
  soc_controls = 'Fee disclosure compliance; Reg E error resolution; escheatment compliance; load/transaction limits; BSA/AML program; cardholder agreement documentation'
WHERE name = 'Prepaid Card / Stored Value Program Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'OCC 2023-17; FDIC FIL-44-2008; Fed SR 13-19; state fintech/lending licensing; CFPB enforcement; true lender rules',
  standards_of_creation = 'FFIEC third-party risk guidance; OCC fintech charter; CSBS fintech regulatory; state DFI partnership guidance',
  soc_controls = 'True lender analysis; partner bank oversight; compliance delegation audit; consumer complaint routing; BSA/AML coordination; regulatory examination coordination'
WHERE name = 'Fintech / Bank Partnership Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Bank Merger Act 12 USC Section 1828(c); BHC Act 12 USC Section 1841; Change in Bank Control Act; CRA; Hart-Scott-Rodino; FDIC Act',
  standards_of_creation = 'OCC/Fed/FDIC merger application standards; competitive analysis HHI methodology; CRA merger review; state DFI application requirements',
  soc_controls = 'Merger application compliance; competitive impact analysis; CRA evaluation/commitment documentation; customer notification; systems integration compliance; regulatory approval tracking'
WHERE name = 'Bank M&A Regulatory Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'State/federal banking examination authority; OCC/Fed/FDIC/NCUA powers; BSA/CRA/consumer compliance examination',
  standards_of_creation = 'FFIEC examination process; OCC Comptroller''''s Handbook; Fed Commercial Bank Manual; FDIC Risk Management Manual',
  soc_controls = 'Examination preparation documentation; information request tracking; MRA/MRIA remediation tracking; ROE response; corrective action monitoring; board reporting on findings'
WHERE name = 'Regulatory Examination Management Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'IRC 26 USC; Treasury Circular 230 31 CFR Part 10; IRS Practitioner Rules; state tax practitioner regulations',
  standards_of_creation = 'AICPA SSTS; Circular 230 standards; EA examination standards; state CPA/EA practice standards; Form 2848 procedures',
  soc_controls = 'Circular 230 due diligence; Form 2848 authorization documentation; representation scope documentation; client communication records; conflict screening; practitioner conduct'
WHERE name = 'IRS Authorized Representative (EA/CPA/Attorney)';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Revenue & Taxation Code; CA FTB regulations; state administrative procedure; OTA rules; multistate tax compact',
  standards_of_creation = 'CA FTB audit procedures; OTA practice standards; COST controversy guidance; state CPA practice standards',
  soc_controls = 'FTB audit response documentation; protest/appeal filing; statute of limitations tracking; OTA hearing preparation; settlement documentation; IDR response'
WHERE name = 'FTB Audit Representative / State Tax Controversy Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'IRC 26 USC; Tax Court Rules of Practice; 28 USC Section 1346; state tax court rules; Tucker Act; Flora rule; Section 7463',
  standards_of_creation = 'U.S. Tax Court admission standards; Tax Court Rules; ABA Tax Section litigation; state OTA/tax court practice',
  soc_controls = 'Petition filing compliance; stipulation documentation; trial preparation; settlement/closing agreement review; appeal right documentation; statutory notice response timing'
WHERE name = 'Tax Court Practitioner / Tax Litigation Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'IRC 26 USC; Treasury Regulations; Circular 230; AICPA SSTS; state tax codes; international tax treaties',
  standards_of_creation = 'AICPA Tax Planning standards; Circular 230 best practices; ABA Tax Section; CFP tax planning; CPA/EA practice standards',
  soc_controls = 'Tax position documentation (ASC 740); economic substance analysis; reportable transaction disclosure; planning implementation; engagement letter compliance; conflict screening'
WHERE name = 'Tax Planning Advisor (CPA/EA/Attorney)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Circular 230 Section 10.35/10.37; IRC; Treasury Regulations; ABA Formal Ethics Opinions; state bar ethics; AICPA SSTS',
  standards_of_creation = 'Circular 230 tax opinion standards; ABA Tax Section opinion standards; AICPA SSTS No. 1; state bar tax opinion guidance',
  soc_controls = 'Opinion letter methodology; factual representation verification; legal authority analysis; confidence level determination; limitation/assumption disclosure; engagement scope documentation'
WHERE name = 'Tax Opinion Practitioner (Attorney/CPA)';

UPDATE citizen_catalog SET
  governing_guidelines = 'AICPA SSARS (AR-C Section 60-Section 90); state accountancy laws; AICPA Professional Standards; Circular 230 (if tax); state licensing',
  standards_of_creation = 'AICPA SSARS compilation standards; AICPA Code of Conduct; state board standards; AICPA Peer Review Standards',
  soc_controls = 'Compilation report compliance; management representation documentation; independence assessment; known departure disclosure; engagement letter compliance; professional standards adherence'
WHERE name = 'Compilation Accountant (CPA)';

UPDATE citizen_catalog SET
  governing_guidelines = 'SOX Section 302/404; PCAOB AS 2201; SEC ICFR rules; COSO Internal Control; FDICIA Section 36',
  standards_of_creation = 'COSO Internal Control (2013); PCAOB AS 2201; SEC interpretive guidance; COBIT IT controls; IIA IPPF',
  soc_controls = 'Control design/OE testing; material weakness assessment; management assessment documentation; remediation tracking; ITGC testing; entity-level controls evaluation'
WHERE name = 'SOX Compliance / Internal Controls Over Financial Reporting (ICFR) Auditor';

UPDATE citizen_catalog SET
  governing_guidelines = 'AICPA Standards for PR; state board PR requirements; AICPA PR Board Guidance',
  standards_of_creation = 'AICPA PR Program Manual; AICPA PR Standards Interpretations; administering entity standards; state board requirements',
  soc_controls = 'Engagement selection methodology; system review procedures; report issuance quality; finding evaluation; corrective action tracking; team captain qualification verification'
WHERE name = 'AICPA Peer Review Team Captain / Administering Entity Liaison';

UPDATE citizen_catalog SET
  governing_guidelines = 'State bookkeeping regulations (UPL boundaries); Circular 230 (if tax prep); state tax preparer regs; state payroll tax; DOL wage and hour',
  standards_of_creation = 'AIPB standards; NACPB standards; QuickBooks/Xero certification; state tax preparer CE requirements',
  soc_controls = 'Bank reconciliation accuracy; AP/AR accuracy; payroll tax filing compliance; record retention; chart of accounts consistency; data backup and security'
WHERE name = 'Bookkeeper / Accounting Service Provider';

UPDATE citizen_catalog SET
  governing_guidelines = 'State property tax codes (e.g., CA R&T Code Section 51-5909); state assessment appeal rules; Prop 13; IAAO standards',
  standards_of_creation = 'IAAO mass appraisal standards; IAAO assessment practices; state appeal procedures; USPAP; ASA appraisal standards',
  soc_controls = 'Assessment value analysis; comparable property identification; appeal filing compliance; hearing preparation; reduction calculation methodology; deadline tracking'
WHERE name = 'Property Tax Appeal Agent / Assessment Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'IRC Section Section 861-999; FATCA IRC Section Section 1471-1474; FBAR 31 USC Section 5314; CRS OECD; tax treaties; OECD BEPS; IRC Section Section 6038-6046A',
  standards_of_creation = 'OECD Model Tax Convention; OECD BEPS Action Plans; IRS FATCA guidance; CRS Implementation Handbook; IRS Forms 5471/5472/8865/8858/FBAR instructions',
  soc_controls = 'FATCA/CRS reporting compliance; information return accuracy; transfer pricing documentation; treaty benefit eligibility; withholding tax compliance; PE analysis'
WHERE name = 'International Tax / Information Reporting Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA W&I Code Section 100-107; CAPTA 42 USC Section 5101; CASA enabling statutes; ICWA; VOCA',
  standards_of_creation = 'National CASA/GAL Association standards; CA CASA standards; CWLA Standards; state judicial council CASA rules',
  soc_controls = 'Volunteer screening/training compliance; case assignment documentation; court report quality review; visit frequency compliance; supervisor oversight; outcome tracking'
WHERE name = 'CASA Volunteer / CASA Program Director';

UPDATE citizen_catalog SET
  governing_guidelines = 'State psychology practice acts; CA B&P Code Section 2900-2999; Daubert/Frye; state forensic evaluation statutes; HIPAA; Tarasoff',
  standards_of_creation = 'APA Specialty Guidelines for Forensic Psychology; APA Ethical Principles; ABPP certification; state board standards; forensic assessment instruments (PCL-R/HCR-20)',
  soc_controls = 'Forensic evaluation methodology; informed consent/notification; test selection/administration compliance; data foundation for opinions; report peer review; CE compliance'
WHERE name = 'Licensed Psychologist (Forensic) / Psychiatrist (Forensic)';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA W&I Code Section 300-395; CAPTA 42 USC Section 5101; ICWA 25 USC Section 1901; Titles IV-E/IV-B; state CPS investigation standards; mandatory reporter statutes',
  standards_of_creation = 'NASW Child Welfare Standards; SDM model; state DSS investigation protocols; CWLA Standards; Signs of Safety',
  soc_controls = 'Investigation completeness; safety assessment compliance; SDM risk assessment; ICWA inquiry documentation; case plan timeliness; court report quality; mandatory reporting compliance'
WHERE name = 'Social Worker / Children''s Social Worker / CPS Investigator';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 6077-6095; CA Rules of Procedure of the State Bar; ABA Model Rules for Lawyer Disciplinary Enforcement',
  standards_of_creation = 'State Bar discipline system standards; ABA Sanctions Standards; State Bar Rules of Procedure; OCTC investigation standards',
  soc_controls = 'Complaint investigation documentation; clear and convincing evidence compliance; State Bar Court preparation; stipulated resolution documentation; probation monitoring; public discipline tracking'
WHERE name = 'Deputy Trial Counsel / Chief Trial Counsel';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Constitution Article VI Section 18; CA Rules of CJP; 28 USC Section 351; CA Code of Judicial Ethics; ABA Model Code of Judicial Conduct',
  standards_of_creation = 'CJP Rules of Procedure; ABA Rules for Judicial Discipline; state judicial conduct standards; National Judicial College ethics',
  soc_controls = 'Judicial misconduct investigation documentation; preliminary investigation procedures; formal proceedings compliance; confidentiality controls; witness protocols; disposition recommendation'
WHERE name = 'Commission Attorney / Investigator, Commission on Judicial Performance';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Probate Code Section 8000-12591; UPC; state estate administration; IRC Section Section 2001-2704; HIPAA decedent records',
  standards_of_creation = 'State bar estate guidance; ACTEC practice standards; AICPA fiduciary accounting; state judicial council forms; Uniform Trust Code',
  soc_controls = 'Estate inventory and appraisal; creditor claims administration; estate tax return compliance; fiduciary duty documentation; beneficiary notification; accounting and distribution'
WHERE name = 'Executor / Administrator / Personal Representative of Estate';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Family Code Section 4000-5700; Title IV-D 42 USC Section 651; UIFSA; state child support guidelines; OCSE regulations',
  standards_of_creation = 'OCSE federal compliance standards; IV-D performance standards; state DCSS policies; UIFSA guidelines',
  soc_controls = 'Guideline calculation audit; income verification; enforcement action compliance; interstate coordination; payment processing accuracy; case closure documentation'
WHERE name = 'Department of Child Support Services (DCSS) Caseworker / Enforcement Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Rules of Court Title 2; state judicial council technology standards; CJIS Security Policy; ADA/WCAG; NIST CSF',
  standards_of_creation = 'NCSC Court Technology Standards; OASIS LegalXML; NIEM Justice Domain; CJIS Security Policy; NODS',
  soc_controls = 'CMS audit; CJIS compliance; e-filing security testing; digital accessibility; data backup/DR; records retention compliance'
WHERE name = 'Court Technology Officer (CTO) / Director of Court Information Technology';

UPDATE citizen_catalog SET
  governing_guidelines = 'LSC Act 42 USC Section 2996; LSC regulations 45 CFR Parts 1600-1644; state legal aid eligibility; ABA Model Rules; VAWA',
  standards_of_creation = 'LSC Performance Criteria; ABA Standards for Civil Legal Aid; state access to justice standards; NLADA standards',
  soc_controls = 'LSC eligibility determination; case acceptance documentation; timekeeping compliance; conflict screening; outcome reporting; grant compliance'
WHERE name = 'Staff Attorney (Legal Aid) / Managing Attorney (Legal Services)';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Rules of Court 2.250-2.261; state e-filing mandates; E-SIGN Act; UETA; ADA accessibility',
  standards_of_creation = 'OASIS LegalXML ECF; state judicial council e-filing standards; NODS; NCSC electronic filing guidance',
  soc_controls = 'E-filing availability monitoring; document format compliance; filing fee accuracy; electronic service delivery; system security; accessibility compliance'
WHERE name = 'EFSP Manager / E-Filing Administrator';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Penal Code Section 11105-11106; DOJ CLETS PPP; FBI CJIS Security Policy; 28 CFR Part 20; NCIC Operating Manual',
  standards_of_creation = 'FBI CJIS Security Policy; CA DOJ CLETS PPP; NCIC Operating Manual; Nlets standards; CA DOJ CJIS Compliance',
  soc_controls = 'CJIS Security Policy audit; CLETS access authorization; personnel screening; physical security of terminals; audit log review; misuse investigation documentation'
WHERE name = 'CLETS Terminal Agency Coordinator (TAC) / CJIS Systems Officer (CSO)';

UPDATE citizen_catalog SET
  governing_guidelines = 'ADA Titles II/III 42 USC Section 12131-12189; Section 504; CA Gov Code Section 11135; state court accessibility rules; 28 CFR Parts 35/36',
  standards_of_creation = 'DOJ ADA Title II guidance; Judicial Council accessibility standards; NCSC court accessibility; WCAG 2.1 AA; ADATA',
  soc_controls = 'ADA accommodation documentation; facility accessibility audit; communication access compliance; website accessibility testing; staff ADA training; grievance procedure compliance'
WHERE name = 'ADA Coordinator / Court Access Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'State PE/SE licensing; CA B&P Code Section 6700-6799; IBC/CBC; ASCE 7; ACI 318; AISC 360',
  standards_of_creation = 'NCEES SE examination; SEAOC standards; ASCE 7; ACI 318/530; AISC 341/360; state board standards',
  soc_controls = 'SE license verification; structural calculation review; seismic design compliance; plan check documentation; construction observation; professional liability documentation'
WHERE name = 'Licensed Structural Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = 'State PE licensing; CA B&P Code Section 6700-6799; Clean Water Act; subdivision map requirements; state transportation design',
  standards_of_creation = 'NCEES PE Civil examination; ASCE standards; state DOT design manuals; local grading/drainage requirements',
  soc_controls = 'PE license verification; civil design review; grading/drainage compliance; SWPPP compliance; subdivision compliance; professional liability documentation'
WHERE name = 'Licensed Civil Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = 'State PE licensing; CA Mechanical Code Title 24 Part 4; ASHRAE standards; EPA 608/609; 40 CFR Part 82',
  standards_of_creation = 'ASHRAE 90.1/62.1/55; NCEES PE Mechanical; SMACNA standards; ASME codes; Title 24 Part 6; IMC',
  soc_controls = 'PE license verification; HVAC design review; energy code compliance; refrigerant management; commissioning documentation; Title 24 mechanical compliance'
WHERE name = 'Licensed Mechanical/HVAC Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = 'State PE licensing; NEC NFPA 70; NESC IEEE C2; state electrical code; Title 24 Part 3; IEEE standards',
  standards_of_creation = 'NCEES PE Electrical; IEEE standards; NFPA 70/70E; NESC; state board standards; UL listing',
  soc_controls = 'PE license verification; electrical design review; NEC compliance; arc flash study; short circuit/coordination study; Title 24 electrical compliance'
WHERE name = 'Licensed Electrical Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = 'State PE licensing; NFPA 1/13/14/20/25/72/101; IBC/CBC fire/life safety; state fire marshal; CA H&S Code',
  standards_of_creation = 'NCEES PE Fire Protection; NFPA codes; SFPE Engineering Guide; FM Global standards; UL fire protection',
  soc_controls = 'PE license verification; fire protection design review; NFPA 13 sprinkler compliance; NFPA 72 alarm compliance; means of egress analysis; life safety compliance'
WHERE name = 'Licensed Fire Protection Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 7000-7191; OSHA 29 CFR Part 1926; Cal/OSHA Title 8; prevailing wage CA Labor Code Section 1720; state building codes',
  standards_of_creation = 'CSLB licensing; ICC building codes; OSHA construction safety; NAHB/AGC/ABC standards; CMAA construction management',
  soc_controls = 'CSLB license verification; building permit compliance; safety program audit; WC/bond verification; subcontractor management; project documentation'
WHERE name = 'Licensed General Contractor';

UPDATE citizen_catalog SET
  governing_guidelines = 'State mechanics'''' lien statutes; Miller Act 40 USC Section 3131; FAR Part 33; UCC; state prompt payment acts',
  standards_of_creation = 'AACE cost engineering; AIA contract documents; ConsensusDocs; SCL Delay and Disruption Protocol; RP 29R-03',
  soc_controls = 'Claim documentation/contemporaneous records; critical path delay analysis; change order pricing audit; notice requirement compliance; expert report methodology; dispute resolution controls'
WHERE name = 'Construction Claims Specialist / Consultant';

UPDATE citizen_catalog SET
  governing_guidelines = 'State plumbing license statutes; UPC/IPC; CA Plumbing Code Title 24 Part 5; Safe Drinking Water Act; state backflow regulations',
  standards_of_creation = 'IAPMO UPC; ICC IPC; ASSE product standards; ASPE Plumbing Engineering Handbook; UA training standards',
  soc_controls = 'License verification; code compliance inspection; backflow testing; medical gas certification (if applicable); water heater compliance; permit documentation'
WHERE name = 'Licensed Master Plumber';

UPDATE citizen_catalog SET
  governing_guidelines = 'State electrician licensing; NEC NFPA 70; state electrical code; Cal/OSHA 8 CCR Section 2299-2599; NFPA 70E; Title 24 Part 3',
  standards_of_creation = 'NFPA 70 NEC; NFPA 70E; IBEW/NJATC training standards; state certification examination; UL listing standards',
  soc_controls = 'License/certification verification; NEC compliance inspection; GFCI/AFCI compliance; panel schedule documentation; load calculation verification; permit and inspection documentation'
WHERE name = 'Licensed Electrician (Journeyperson/Master)';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 7000-7191 (C-20); CA Mechanical Code; Title 24 Part 6; EPA 608; ASHRAE standards',
  standards_of_creation = 'CSLB C-20 licensing; ASHRAE 90.1/62.1; SMACNA installation; NATE certification; EPA 608 certification; Title 24 compliance',
  soc_controls = 'License verification; refrigerant handling (EPA 608); energy code testing; duct leakage testing; commissioning documentation; permit/inspection controls'
WHERE name = 'Licensed HVAC Contractor';

UPDATE citizen_catalog SET
  governing_guidelines = 'National Apprenticeship Act 29 USC Section 50; DOL 29 CFR Part 29/30; CA Labor Code Section 3070-3098; ERISA (training funds)',
  standards_of_creation = 'DOL Office of Apprenticeship standards; state DAS requirements; JATC/AJATC training; NCCER; trade-specific (UA/IBEW/IUEC) training',
  soc_controls = 'Apprentice ratio compliance; training hour documentation; RSI records; OJT rotation compliance; wage progression verification; completion/certification tracking'
WHERE name = 'Apprenticeship Coordinator / Training Director';

UPDATE citizen_catalog SET
  governing_guidelines = 'ERISA 29 USC Section 1001; Taft-Hartley 29 USC Section 186(c); DOL EBSA regulations; IRC Section 501(c)(9); LMRDA',
  standards_of_creation = 'DOL EBSA compliance guidance; AICPA Employee Benefit Plan Audit Guide; IFEBP trustee education; ISCEBS certification',
  soc_controls = 'Trust fund financial audit; ERISA fiduciary compliance; Form 5500 accuracy; contribution collection audit; benefit payment accuracy; trustee conflict documentation'
WHERE name = 'Union Trust Fund Administrator';

UPDATE citizen_catalog SET
  governing_guidelines = 'State/local green building mandates; CALGreen Title 24 Part 11; ASHRAE 90.1/189.1; local sustainability ordinances',
  standards_of_creation = 'USGBC LEED Rating System; LEED AP credential maintenance; ASHRAE/IES 90.1; WELL Building; GBCI certification',
  soc_controls = 'LEED credit documentation; energy modeling verification; commissioning compliance; materials documentation (EPDs/HPDs); IEQ testing; certification submission quality'
WHERE name = 'LEED Accredited Professional';

UPDATE citizen_catalog SET
  governing_guidelines = 'OSHA 29 CFR Part 1926; Cal/OSHA Title 8 Construction Safety Orders; EM 385-1-1 USACE; ANSI/ASSP A10 series',
  standards_of_creation = 'OSHA 30-hour Construction; ANSI/ASSP A10 series; BCSP (CSP/CHST); AGC safety; USACE EM 385-1-1',
  soc_controls = 'Daily safety inspection documentation; toolbox talk records; incident investigation; subcontractor prequalification; crane/scaffold inspection; site-specific safety plan compliance'
WHERE name = 'Construction Site Safety Manager';

UPDATE citizen_catalog SET
  governing_guidelines = '14 CFR Part 400-499 FAA/AST; Range Commander''''s Council standards; NASA Range Safety; 10 USC Section 2681',
  standards_of_creation = 'AFSPCMAN 91-710; RCC 319/321; NASA-STD-8719.24; FAA/AST launch site safety',
  soc_controls = 'Flight safety analysis; range instrumentation verification; public risk assessment; FTS testing; launch commit criteria; post-mission safety report'
WHERE name = 'Range Safety Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Communications Act of 1934; 47 CFR Part 25; ITU Radio Regulations; ORBIT Act; NTIA coordination',
  standards_of_creation = 'ITU Radio Regulations; FCC satellite licensing guidance; ITU-R Recommendations (S series); CEPT standards',
  soc_controls = 'FCC satellite license documentation; ITU coordination/notification; orbit debris mitigation; transponder frequency coordination; reporting compliance; license modification controls'
WHERE name = 'FCC Satellite Communications Licensing Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = '47 USC Section 301/303; FCC 47 CFR Parts 2/25/73/90/95/97/101; ITU Radio Regulations; NTIA Manual',
  standards_of_creation = 'ITU Radio Regulations; IEEE EMC standards; NTIA Spectrum Management; FCC Technical Advisory Committee; ANSI C63',
  soc_controls = 'Spectrum coordination documentation; interference analysis; frequency assignment records; EMC testing; ITU notification compliance; spectrum efficiency analysis'
WHERE name = 'Spectrum Coordination Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = 'ITAR 22 CFR Parts 120-130; Arms Export Control Act 22 USC Section 2778; EAR 15 CFR Parts 730-774; DDTC regulations',
  standards_of_creation = 'DDTC compliance guidance; SIA best practices; NDIA export control standards; DoD ITAR guidance',
  soc_controls = 'ITAR registration; TAA/MLA documentation; deemed export controls; DDTC annual report; classification determination; violation self-disclosure documentation'
WHERE name = 'ITAR Empowered Official — Space Technology';

UPDATE citizen_catalog SET
  governing_guidelines = 'NASA FAR Supplement 48 CFR Part 1800; FAR 48 CFR; NASA NPR 5000/7120; SBIR/STTR; Buy American; ITAR',
  standards_of_creation = 'NASA FAR Supplement; NASA Procurement Regulations; NPR 5000.4/NPR 7120.5; DCAA audit standards',
  soc_controls = 'Contract deliverable compliance; EVMS audit; DCAA incurred cost submission; small business subcontracting; property management; OCI documentation'
WHERE name = 'NASA Contract Compliance Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'NASA-STD-8739 series; MIL-STD-1540E; NASA-STD-5009; ECSS standards; 14 CFR Part 460',
  standards_of_creation = 'NASA Technical Standards Program; AS9100D; ECSS-Q-ST series; MIL-STD-1540E; NASA-STD-8739; ISO 22734',
  soc_controls = 'Mission assurance audit; parts/materials qualification; test verification documentation; anomaly reporting; configuration management; supplier quality assessment'
WHERE name = 'Space Systems Quality Assurance Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Outer Space Treaty Article IX; COSPAR Planetary Protection Policy; NASA NPR 8020.12D; ITU Radio Regulations',
  standards_of_creation = 'COSPAR PP categories I-V; NASA PP standards; ESA PP requirements; ISO 16290; bioburden assay standards',
  soc_controls = 'Bioburden assay documentation; clean room protocol compliance; contamination assessment; mission categorization; organic inventory; sterilization validation'
WHERE name = 'Planetary Protection Officer / Compliance Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = '10 USC Section 2274; Space Policy Directive 3; ITU Radio Regulations; UN Space Debris Mitigation Guidelines; 51 USC',
  standards_of_creation = 'USSPACECOM conjunction assessment; NASA CARA; ISO 24113; IADC Space Debris Guidelines; CCSDS orbit data standards',
  soc_controls = 'Conjunction assessment documentation; debris mitigation compliance; space object catalog maintenance; maneuver planning; data sharing compliance; collision avoidance controls'
WHERE name = 'Space Situational Awareness Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = '14 CFR Part 67; 14 CFR Part 460; NASA-STD-3001; 10 USC Section 1074; ICAO Annex 1',
  standards_of_creation = 'AsMA standards; NASA-STD-3001 Human Integration Design; FAA AME Guide; NATO STANAG 3526',
  soc_controls = 'Aeromedical certification documentation; in-flight medical event reporting; crew health monitoring; radiation exposure tracking; fatigue risk management; fitness-for-duty evaluation'
WHERE name = 'Flight Surgeon / Aerospace Medical Officer';

UPDATE citizen_catalog SET
  governing_guidelines = '51 USC Section 60101-60162; 15 CFR Part 960; ITAR/EAR (if applicable); state privacy laws',
  standards_of_creation = 'NOAA Commercial Remote Sensing licensing; CEOS cal/val standards; OGC standards; FGDC metadata; ASPRS accuracy',
  soc_controls = 'NOAA license condition compliance; data distribution restriction audit; shutter control compliance; operational orbit notification; annual reporting; imaging restriction documentation'
WHERE name = 'NOAA Remote Sensing License Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'State surplus lines; 1972 Liability Convention; Outer Space Treaty; FAA financial responsibility 14 CFR Part 440',
  standards_of_creation = 'Space insurance market standards (Lloyd''''s/Aon/Marsh); FAA/AST financial responsibility; launch vehicle reliability databases',
  soc_controls = 'Launch risk assessment; satellite anomaly history; underwriting technical evaluation; claims methodology; premium calculation audit; policy wording review'
WHERE name = 'Space Insurance Underwriter';

UPDATE citizen_catalog SET
  governing_guidelines = 'State advance directive statutes (CA Probate Code Section 4700-4701; CA W&I Code Section 5000); HIPAA; state involuntary treatment; ADA; Olmstead',
  standards_of_creation = 'SAMHSA advance directive guidance; Bazelon Center MHAD provisions; state bar mental health law; NAMI practices',
  soc_controls = 'MHAD execution compliance (witness/notarization); capacity assessment documentation; agent authority verification; provider notification; revocation tracking; conflict resolution procedures'
WHERE name = 'Mental Health Advance Directive (MHAD) Facilitator / Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = '2 CFR Part 200 (Uniform Guidance); OMB Circulars A-21/A-110/A-133; FAR Part 31; Single Audit Act',
  standards_of_creation = 'OMB Uniform Guidance implementation; COGR cost accounting; NACUBO financial management; agency-specific post-award standards',
  soc_controls = 'Cost allowability/allocability review; effort reporting audit; cost sharing documentation; subrecipient monitoring; F&A rate compliance; financial report accuracy'
WHERE name = 'Post-Award Financial Analyst / Grants Accountant';

UPDATE citizen_catalog SET
  governing_guidelines = 'HIPAA; FERPA; 45 CFR Part 46; NIH Data Management and Sharing Policy; GDPR; FAR 52.227',
  standards_of_creation = 'FAIR Data Principles; NIH DMS policy; DMPTool guidance; DataCite metadata; DDI; OAIS ISO 14721',
  soc_controls = 'Data management plan compliance; de-identification verification; data sharing agreement documentation; metadata quality audit; retention/destruction schedule; access control/audit trail'
WHERE name = 'Research Data Manager / Data Steward';

UPDATE citizen_catalog SET
  governing_guidelines = '45 CFR Part 46 (Common Rule); 21 CFR Parts 50/56 (FDA); HIPAA Privacy Rule; Belmont Report',
  standards_of_creation = 'OHRP IRB guidance; FDA IRB guidance; AAHRPP accreditation; ICH GCP E6(R2); CIP certification; CIOMS',
  soc_controls = 'Protocol review documentation; informed consent adequacy; continuing review compliance; adverse event reporting; conflict of interest management; IRB meeting minutes/voting'
WHERE name = 'Institutional Review Board Chair / IRB Member';

UPDATE citizen_catalog SET
  governing_guidelines = '45 CFR Part 46; 21 CFR Parts 50/56; HIPAA; NSF Award Terms; NIH Grants Policy; PHS FCOI 42 CFR Part 50 Subpart F; ITAR/EAR',
  standards_of_creation = 'AAHRPP accreditation; OHRP Compliance Oversight; CITI Program training; APLU/AAU research compliance; COGR guidance',
  soc_controls = 'HRPP quality improvement; IRB audit program; FCOI management; research misconduct procedures; regulatory correspondence tracking; training compliance'
WHERE name = 'HRPP Director / Director of Research Compliance';

UPDATE citizen_catalog SET
  governing_guidelines = '21 CFR Part 58 (GLP); EPA 40 CFR Part 160 (FIFRA GLP); OECD GLP Principles; ICH guidelines',
  standards_of_creation = 'FDA GLP regulations; OECD GLP Principles; EPA GLP standards; WHO GLP handbook; QAU standards per 21 CFR Section 58.35',
  soc_controls = 'Study plan/protocol audit; raw data integrity; facility/equipment inspection; QA schedule; study report accuracy; archive/specimen storage controls'
WHERE name = 'GLP QA Unit Manager / QA Auditor';

UPDATE citizen_catalog SET
  governing_guidelines = 'Communications Act of 1934 47 USC Section 301; FCC Rules 47 CFR; Telecommunications Act of 1996; ITU Radio Regulations; NTIA',
  standards_of_creation = 'FCC licensing procedures; ITU Radio Regulations; FCC ULS; NTIA spectrum management standards',
  soc_controls = 'FCC license application documentation; spectrum coordination records; license renewal tracking; frequency coordination; site registration; FCC reporting obligations'
WHERE name = 'FCC Licensing Specialist / Spectrum Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = '47 USC Section 301/303; FCC 47 CFR Parts 1-2/15/22-27/90/95/97/101; ITU Radio Regulations; IEEE/ANSI RF exposure; FAA 47 CFR Part 17',
  standards_of_creation = 'IEEE 802.xx; ITU-R Recommendations; ANSI C95.1/C63; FCC OET Bulletins; NTIA Redbook; 3GPP',
  soc_controls = 'RF exposure compliance (FCC OET-65); frequency coordination documentation; interference mitigation; antenna structure registration; spectrum utilization analysis; emission measurement'
WHERE name = 'RF Spectrum Engineer / Spectrum Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'Telecommunications Act Section 332(c)(7); FCC Shot Clock; NEPA/NHPA Section 106; FAA 14 CFR Part 77; local zoning; FCC OET-65',
  standards_of_creation = 'FCC Wireless Infrastructure rules; CTIA siting practices; TIA-222; FCC Environmental review; ACEG collocation',
  soc_controls = 'Zoning application compliance; Section 106 historic preservation review; NEPA categorical exclusion; RF exposure reports; FAA determination (7460-1); lease compliance'
WHERE name = 'Cell Site Regulatory Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Telecommunications Act Section 254; 47 CFR Part 54; E-Rate rules; FCC E-Rate orders; CIPA',
  standards_of_creation = 'USAC E-Rate guidance; FCC E-Rate rules; state E-Rate coordination; CIPA requirements; USAC invoice procedures',
  soc_controls = 'Form 470/471 filing compliance; competitive bidding documentation; CIPA compliance; Form 486/474 confirmation; invoice processing; document retention'
WHERE name = 'E-Rate Program Administrator / USAC Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Telecommunications Act Section 254; 47 CFR Part 54; FCC contribution methodology; Form 499-A/499-Q',
  standards_of_creation = 'USAC contribution guidance; FCC USF contribution factor; telecom revenue classification; USAC audit procedures',
  soc_controls = 'Revenue reporting accuracy (Form 499); contribution factor calculation; true-up compliance; VoIP assessment; audit response documentation; filing deadline compliance'
WHERE name = 'Universal Service Fund Contribution Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'Telecommunications Act Section 222 (47 USC Section 222); FCC CPNI Rules 47 CFR Section 64.2001-64.2011; state telecom privacy; TCPA',
  standards_of_creation = 'FCC CPNI compliance guidance; FCC enforcement advisories; carrier CPNI program standards; TCA privacy practices',
  soc_controls = 'Annual CPNI certification; customer authentication procedures; sales/marketing use controls; breach notification; employee access monitoring; opt-in/opt-out documentation'
WHERE name = 'Customer Proprietary Network Information Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'TCPA 47 USC Section 227; FCC TCPA rules 47 CFR Part 64; TSR 16 CFR Part 310; TRACED Act; state robocall laws; DNC',
  standards_of_creation = 'FCC TCPA declaratory rulings; FTC TSR guidance; DMA/ANA practices; STIR/SHAKEN framework; state DNC compliance',
  soc_controls = 'Prior express written consent documentation; DNC list management; ATDS compliance; STIR/SHAKEN authentication; calling time restrictions; opt-out processing'
WHERE name = 'TCPA Compliance Manager / Anti-Robocall Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Telecommunications Act Section 201(b); FCC Truth-in-Billing 47 CFR Section 64.2400-2401; state telecom billing; FTC cramming rules',
  standards_of_creation = 'FCC Truth-in-Billing standards; state PUC billing standards; ATIS billing standards; TCA billing practices',
  soc_controls = 'Bill format compliance; cramming prevention; LEC/CLEC billing accuracy; third-party charge authorization; billing dispute resolution; rate disclosure'
WHERE name = 'Telecommunications Billing Compliance Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'CALEA 47 USC Section 1001; 47 CFR Part 229; Wiretap Act 18 USC Section 2510; Pen Register Act 18 USC Section 3121; FISA',
  standards_of_creation = 'FCC CALEA compliance; ATIS lawful intercept standards; ETSI LI standards; 3GPP lawful intercept; DOJ/FBI CALEA technical requirements',
  soc_controls = 'CALEA capability compliance; lawful intercept provisioning; court order verification; intercept data delivery accuracy; capability gap remediation; audit trail/confidentiality'
WHERE name = 'Lawful Intercept Compliance Engineer / CALEA Technical Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = '47 USC Section 615a-1; FCC E911 Rules 47 CFR Parts 9/20/64; Kari''''s Law 47 USC Section 623; RAY BAUM''''s Act Section 506; state 911 statutes',
  standards_of_creation = 'NENA i3 NG911; NENA/APCO standards; FCC 911 compliance; state 911 authority requirements; ATIS emergency services',
  soc_controls = 'E911/NG911 ALI accuracy; dispatchable location compliance; Kari''''s Law direct dialing; RAY BAUM''''s Act location; PSAP connectivity testing; 911 fee remittance'
WHERE name = '911/E911 Compliance Manager';

UPDATE citizen_catalog SET
  governing_guidelines = '47 USC Section 321/325/606; FCC EAS Rules 47 CFR Part 11; IPAWS; WARN Act; state EAS plans',
  standards_of_creation = 'FCC EAS rules; FEMA IPAWS standards; state EAS committee plans; CAP standard; CSRIC recommendations',
  soc_controls = 'EAS equipment testing; Monthly/Weekly Test compliance; CAP equipment verification; state EAS plan adherence; IPAWS certification; log retention'
WHERE name = 'EAS/WEA Compliance Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Telecommunications Act Section 251/252; FCC 47 CFR Parts 20/51; state PUC interconnection; ICA terms',
  standards_of_creation = 'FCC interconnection guidance; state PUC model ICAs; ATIS interconnection; OBF standards; LNPA guidelines',
  soc_controls = 'ICA compliance audit; collocation documentation; access charge accuracy; number portability compliance; meet-point reconciliation; dispute resolution controls'
WHERE name = 'Interconnection Agreement Manager / Wholesale Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'ITR; FCC international rules 47 CFR Part 63/64; ITU Constitution/Convention; WTO Basic Telecom Agreement; Cable Landing License Act',
  standards_of_creation = 'ITU standards; FCC international compliance guidance; international settlement rate standards; submarine cable standards; OECD telecom guidance',
  soc_controls = 'Section 214 authorization; international settlement compliance; foreign ownership (Section 310(b)) documentation; submarine cable license; international traffic reporting; CPNI international controls'
WHERE name = 'International Telecommunications Compliance Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'Telecommunications Act Section 706; FCC Broadband DATA Act; FCC Form 477; BDC; BEAD; Digital Equity Act; state broadband mapping',
  standards_of_creation = 'FCC BDC filing standards; NTIA BEAD guidance; FCC broadband labeling rules; state broadband authority requirements',
  soc_controls = 'BDC filing accuracy; broadband label compliance; BEAD grant compliance; speed/latency verification; coverage map challenge documentation; digital equity compliance'
WHERE name = 'Broadband Compliance Reporting Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'FCC VoIP framework 47 CFR Parts 9/54/64; CALEA; E911; USF contribution; TRS contribution; state VoIP regulations; CPNI',
  standards_of_creation = 'FCC interconnected VoIP compliance; NENA VoIP E911 standards; ATIS VoIP standards; state PUC VoIP registration',
  soc_controls = 'E911 compliance; USF/TRS contribution filing; CPNI protection; CALEA capability; state registration compliance; outage reporting controls'
WHERE name = 'VoIP Regulatory Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CDA Section 230 (47 USC Section 230); First Amendment; DMCA 17 USC Section 512; FOSTA-SESTA; state content moderation; EU DSA; GDPR',
  standards_of_creation = 'ABA Internet law; Stanford CIS intermediary liability; Santa Clara Principles; Christchurch Call; GIFCT technical standards',
  soc_controls = 'Content moderation policy documentation; Section 230 immunity analysis; DMCA takedown compliance; transparency reporting; user appeal process; government request documentation'
WHERE name = 'Platform Liability & Content Compliance Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = 'FCC Open Internet rules; Restoring Internet Freedom Order; state net neutrality (CA SB 822); EU Net Neutrality; Telecommunications Act Section 706',
  standards_of_creation = 'BEREC Net Neutrality guidelines; FCC transparency requirements; state net neutrality standards; BITAG papers',
  soc_controls = 'Network management practice documentation; transparency/disclosure compliance; paid prioritization analysis; reasonable management justification; interconnection documentation; speed/performance disclosure'
WHERE name = 'Open Internet Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 7580-7599.76; 16 CCR Division 7; state security company licensing; BSIS regulations',
  standards_of_creation = 'BSIS PPO licensing; ASIS International standards; state guard training (Powers to Arrest/WMD/Baton/Firearms); CPP/PSP certification',
  soc_controls = 'PPO license verification; guard registration compliance; training documentation; uniform/badge compliance; client contract documentation; incident report controls'
WHERE name = 'Private Patrol Operator / Licensed Security Company Owner';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 7580-7599.76; 16 CCR Division 7; BSIS guard registration; OSHA workplace safety',
  standards_of_creation = 'BSIS guard registration standards; Powers to Arrest training; WMD awareness training; ASIS security officer standards',
  soc_controls = 'Guard card verification; Powers to Arrest completion; annual WMD training; background check compliance; uniform compliance; incident reporting documentation'
WHERE name = 'Registered Security Guard / Security Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 7583.2; 16 CCR Division 7 firearms training; CA Penal Code Section 25400/26150; state armed guard regulations',
  standards_of_creation = 'BSIS firearms permit standards; NRA/state firearms training; BSIS-approved course; state re-qualification; DOJ background check standards',
  soc_controls = 'Firearms permit verification; training/re-qualification documentation; weapons storage/transport; use of force reporting; ammunition accounting; background/psychological evaluation controls'
WHERE name = 'Armed Security Officer / Firearms Qualified Security Guard';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 7590-7599.76; 16 CCR Division 7; state alarm company licensing; local alarm ordinances; UL 2050',
  standards_of_creation = 'BSIS alarm company licensing; UL 2050; CANASA standards; ESA/SIA installation; UL 827/1076',
  soc_controls = 'Alarm company license verification; installer qualification; false alarm reduction; monitoring station compliance; customer contract disclosure; permit/registration tracking'
WHERE name = 'Alarm Company Operator / Licensed Alarm Business Owner';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA Penal Code Section 630-638.55; ECPA 18 USC Section 2510; state video surveillance laws; workplace monitoring; BIPA-type statutes; CA Labor Code Section 435',
  standards_of_creation = 'ASIS video surveillance standards; SIA standards; ONVIF video management; state privacy frameworks',
  soc_controls = 'Surveillance notice/consent; recording retention/destruction; access control audit; privacy impact assessment; workplace monitoring policy; data security controls'
WHERE name = 'Electronic Surveillance Compliance Officer / Video Monitoring Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 7583.37; 16 CCR Division 7; state executive protection licensing; concealed carry laws',
  standards_of_creation = 'BSIS proprietary security; ASIS Close Protection CP standard; ATAP threat assessment; DSS protective intelligence; CPP/PCI certification',
  soc_controls = 'Protection detail documentation; threat assessment methodology; advance survey documentation; route planning; client privacy protection; emergency action plan controls'
WHERE name = 'Executive Protection Agent / Close Protection Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 7580-7599.76; state event security; local special event permits; OSHA crowd management; ADA; fire marshal occupancy',
  standards_of_creation = 'ASIS Event Security standard; FEMA Special Events; ICS/NIMS; DHS Soft Target/Crowded Places guide; NCS4 standards',
  soc_controls = 'Event security plan documentation; crowd management procedures; access control documentation; emergency evacuation plan; after-action report; staffing/communication controls'
WHERE name = 'Event Security Director / Security Operations Planner';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 6980-6980.13; 16 CCR Division 7; state locksmith licensing; BSIS regulations; UL 437',
  standards_of_creation = 'BSIS locksmith license; ALOA standards; BHMA/ANSI A156 series; UL 437; state CE requirements',
  soc_controls = 'License verification; key control documentation; work authorization verification; customer identity verification; access control system documentation; insurance/bond compliance'
WHERE name = 'Licensed Locksmith / Physical Access Security Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'State security consultant regulations; CA B&P Code Section 7580-7599.76; OSHA workplace violence; HIPAA physical; NERC CIP; PCI DSS',
  standards_of_creation = 'ASIS Risk Assessment RA standard; ASIS Physical Security; CARVER+Shock; DHS infrastructure assessment; CPP certification; FEMA THIRA',
  soc_controls = 'Security risk assessment methodology; vulnerability assessment; threat analysis documentation; countermeasure recommendations; cost-benefit analysis; reassessment scheduling'
WHERE name = 'Security Risk Assessment Consultant';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 7512-7573; 16 CCR Division 7; state PI licensing; ECPA; state wiretapping; CA Penal Code Section 630-638.55',
  standards_of_creation = 'BSIS PI licensing; WAD standards; CII background check; ASIS investigative standards',
  soc_controls = 'PI license verification; investigative report documentation; evidence chain of custody; surveillance legality; subcontractor licensing; client confidentiality controls'
WHERE name = 'Licensed Private Investigator / PI Agency Owner';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 7525-7539; 16 CCR Division 7; BSIS QM qualification; state PI agency management requirements',
  standards_of_creation = 'BSIS QM standards; PI industry management practices; ASIS agency management; state QM experience/examination requirements',
  soc_controls = 'QM qualification documentation; agency compliance oversight; employee licensing verification; complaint handling; operational policy management; regulatory reporting'
WHERE name = 'Qualified Manager — Private Investigation Agency';

UPDATE citizen_catalog SET
  governing_guidelines = 'State PI licensing; CA Penal Code Section 630-638.55; state privacy laws; ECPA; trespass laws; drone regulations 14 CFR Part 107',
  standards_of_creation = 'BSIS investigator standards; ASIS surveillance ethics; GPS tracking legal standards; FAA Part 107; privacy compliance guidelines',
  soc_controls = 'Surveillance activity documentation; legal boundary compliance; recording consent; GPS authorization; evidence preservation; chain of custody controls'
WHERE name = 'Surveillance Specialist / Field Investigator';

UPDATE citizen_catalog SET
  governing_guidelines = 'FDCPA 15 USC Section 1692; FCRA; GLBA; ECPA; DPPA 18 USC Section 2721; state PI laws',
  standards_of_creation = 'ACA International skip tracing; ASIS investigative standards; DPPA compliance guidance; FCRA permissible purpose standards',
  soc_controls = 'FCRA permissible purpose documentation; DPPA compliance; database access authorization; contact documentation; pretexting prohibition; privacy compliance'
WHERE name = 'Skip Trace Investigator / Person Locator';

UPDATE citizen_catalog SET
  governing_guidelines = 'State PI licensing (where applicable); ECPA; CFAA 18 USC Section 1030; state trade secret laws DTSA/UTSA; SEC insider trading',
  standards_of_creation = 'ASIS corporate investigation standards; ACFE Fraud Examiners Manual; SCIP competitive intelligence ethics',
  soc_controls = 'Investigation methodology documentation; evidence handling; witness interview documentation; legal privilege protection; report quality controls; investigation authority compliance'
WHERE name = 'Corporate Investigator / Business Intelligence Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'ECPA 18 USC Section 2510/2701; CFAA 18 USC Section 1030; FRE authentication; state computer crime laws; HIPAA; stored communications act',
  standards_of_creation = 'NIST SP 800-86; ISO/IEC 27037/27041-27043; SWGDE standards; EnCase/FTK certification; SANS GIAC; IACIS standards',
  soc_controls = 'Digital evidence chain of custody; forensic imaging (hash verification); analysis methodology; tool validation; expert report quality; evidence storage/retention controls'
WHERE name = 'Digital Forensics Examiner / Cyber Investigation Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'State accident investigation; NTSB 49 USC Section 1131; MUTCD; state vehicle code; FMCSA; product liability statutes',
  standards_of_creation = 'ACTAR certification; SAE J2952 EDR; NHTSA crash investigation; ASTM reconstruction standards; FARO/Total Station measurement',
  soc_controls = 'Scene documentation methodology; measurement accuracy; EDR data download documentation; physics-based analysis; expert report quality; evidence preservation controls'
WHERE name = 'Accident Reconstruction Investigator / Scene Investigator';

UPDATE citizen_catalog SET
  governing_guidelines = 'State insurance fraud statutes; NAIC Insurance Fraud Prevention Model Act; 18 USC Section 1033-1034; state DOI fraud bureau; SIU mandate',
  standards_of_creation = 'NICB standards; Coalition Against Insurance Fraud; IASIU standards; state SIU standards; CLM fraud investigation',
  soc_controls = 'SIU referral criteria documentation; investigation documentation; evidence preservation; fraud indicator analysis; regulatory fraud reporting; anti-fraud program effectiveness'
WHERE name = 'Special Investigations Unit Investigator / Insurance Fraud Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'FDCPA 15 USC Section 1692; CFPB Reg F 12 CFR Part 1006; TCPA; state debt collection licensing; FCRA; Rosenthal FCDPA CA Civil Code Section 1788',
  standards_of_creation = 'CFPB Reg F guidance; ACA International standards; state licensing requirements; FDCPA case law guidance',
  soc_controls = 'Validation notice compliance; communication frequency limits (7-in-7); third-party disclosure restrictions; dispute handling; time-barred debt disclosure; cease communication compliance'
WHERE name = 'Licensed Debt Collector / Collection Agent';

UPDATE citizen_catalog SET
  governing_guidelines = 'FDCPA; CFPB Reg F; state debt buyer licensing (CA Civil Code Section 1788.50-1788.64); FCRA Section 623',
  standards_of_creation = 'DBA International standards; CFPB debt buyer guidance; state licensing; chain of title standards; RMAi certification',
  soc_controls = 'Chain of title documentation; account-level data integrity; media/original creditor documentation; statute of limitations tracking; credit reporting accuracy; state licensing compliance'
WHERE name = 'Debt Buyer / Debt Portfolio Compliance Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'FDCPA Section 1692b; FCRA; DPPA 18 USC Section 2721; GLBA; TCPA; Reg F location information',
  standards_of_creation = 'ACA International skip tracing; CFPB Reg F location information guidance; FCRA permissible purpose; DPA compliance',
  soc_controls = 'FDCPA Section 1692b compliance; FCRA permissible purpose documentation; call recording consent; database access authorization; attempt documentation; privacy compliance'
WHERE name = 'Collections Skip Trace Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'State pawnbroker licensing (CA Financial Code Section 21000-21207); TILA/Reg Z pawn; BSA precious metals; ATF 18 USC Section 921 (firearms); local ordinances',
  standards_of_creation = 'NPA standards; state licensing standards; ATF firearms pawn requirements; TILA pawn disclosure; state DOJ reporting',
  soc_controls = 'Pawn license verification; transaction documentation (hold/interest); TILA disclosure; stolen property reporting; firearms pawn ATF compliance; record retention'
WHERE name = 'Licensed Pawnbroker / Pawn Transaction Operator';

UPDATE citizen_catalog SET
  governing_guidelines = 'CA B&P Code Section 21625-21647; CA Penal Code Section 21627-21628; state secondhand dealer licensing; BSA precious metals reporting',
  standards_of_creation = 'State DOJ ESIS standards; NPA compliance guidance; trade association practices; state licensing standards',
  soc_controls = 'Transaction hold period; law enforcement reporting (ESIS/LEADS); customer identification; precious metals weight/purity documentation; stolen property screening; license compliance'
WHERE name = 'Licensed Secondhand Dealer / Precious Metals & Gems Dealer';

UPDATE citizen_catalog SET
  governing_guidelines = 'TILA/Reg Z; state consumer finance licensing (CA DFPI-CFL/CDDTL); CFPB small dollar lending; state rate/fee caps; MLA; ECOA/Reg B',
  standards_of_creation = 'CFPB small dollar examination procedures; state DFPI standards; CFSA best practices; OLA standards',
  soc_controls = 'Rate/APR disclosure accuracy; state licensing compliance; ability-to-repay assessment; fee/rate cap compliance; rollover restriction compliance; complaint management'
WHERE name = 'Consumer Finance Compliance Manager / Small Dollar Lending Specialist';

-- Total: 409 UPDATE statements
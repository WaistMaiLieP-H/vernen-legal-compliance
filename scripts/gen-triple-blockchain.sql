-- Blockchain, Fintech, Crowdfunding Triple Constraint Completion

UPDATE citizen_catalog SET
  governing_guidelines = 'Bank Secrecy Act (31 USC 5311); FinCEN Money Transmitter guidance (FIN-2013-G001); state money transmitter licensing statutes (e.g., CA Financial Code Division 1.2); NY BitLicense (23 NYCRR Part 200); FinCEN convertible virtual currency guidance (FIN-2019-G001)',
  standards_of_creation = 'ACAMS CAMS certification (AML for virtual currency); FinCEN BSA reporting requirements; state-specific money transmitter licensing examinations; CSBS Model State Regulatory Framework for money transmission; FFIEC BSA/AML Examination Manual (Virtual Currency section)',
  soc_controls = 'SOC 2 Type II (Security, Processing Integrity, Confidentiality); SAR filing documentation and timeliness; CTR reporting for virtual currency transactions; blockchain transaction monitoring systems; customer identity verification (CIP/CDD/EDD); wallet address screening against sanctions lists; suspicious activity detection model validation; examination readiness documentation'
WHERE name = 'Money Transmitter Compliance Officer (Virtual Currency)';

UPDATE citizen_catalog SET
  governing_guidelines = 'FinCEN MSB registration requirements (31 CFR 1022.380); state money transmitter license acts; BSA MSB examination manual; state surety bond requirements; CSBS State Regulatory Registry',
  standards_of_creation = 'FinCEN MSB registration process standards; CSBS NMLS licensing system requirements; state-specific pre-license examination standards; FinCEN Form 107 (Registration of Money Services Business); surety bond documentation standards',
  soc_controls = 'SOC 2 Type II (Processing Integrity); FinCEN registration renewal tracking; state license renewal calendar; authorized agent registration; MSB agent list maintenance (FinCEN requirement); state examination preparation; compliance program adequacy review; agent monitoring documentation'
WHERE name = 'Money Services Business Registration Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'NY BitLicense (23 NYCRR Part 200); state virtual currency license statutes; FinCEN virtual currency guidance; CSBS Model Framework for State Regulation of Virtual Currency; CA Digital Financial Assets Law (DFAL)',
  standards_of_creation = 'NYDFS BitLicense application standards; state-specific virtual currency examination processes; CSBS Vision 2020 networked supervision framework; capital and reserve requirements per jurisdiction; cybersecurity requirements (23 NYCRR Part 500 for BitLicense holders)',
  soc_controls = 'SOC 2 Type II (Security, Processing Integrity); license application documentation; capital adequacy monitoring; cybersecurity program assessment; books and records maintenance per license conditions; state examination response documentation; consumer complaint handling; annual reporting compliance'
WHERE name = 'Virtual Currency License Administrator';

UPDATE citizen_catalog SET
  governing_guidelines = 'BSA/AML requirements (31 USC 5311-5332); FinCEN CDD Rule (31 CFR 1010.230); USA PATRIOT Act Section 326 (CIP); OFAC sanctions screening; FinCEN guidance on virtual currency (FIN-2019-G001); EU 5th/6th AML Directives (if international)',
  standards_of_creation = 'ACAMS CAMS/CGSS certification; FATF Guidance on Virtual Assets and VASPs; FinCEN CDD rule methodology; blockchain analytics tool standards (Chainalysis, Elliptic, CipherTrace); FFIEC BSA/AML Examination Manual; Wolfsberg Group Due Diligence Questionnaire',
  soc_controls = 'SOC 2 Type II (Security, Confidentiality, Processing Integrity); CIP documentation verification; CDD/EDD risk rating methodology; beneficial ownership identification; PEP and sanctions screening frequency; blockchain analytics monitoring documentation; SAR filing quality review; transaction monitoring model tuning; periodic KYC refresh documentation'
WHERE name = 'Know Your Customer / Anti-Money Laundering Analyst (Digital Assets)';

UPDATE citizen_catalog SET
  governing_guidelines = 'BSA SAR filing requirements (31 CFR 1022.320); FinCEN advisory on virtual currency (FIN-2014-A007); USA PATRIOT Act Section 314(a)/(b); state reporting requirements; FinCEN BSA E-Filing requirements',
  standards_of_creation = 'ACAMS CAMS certification; FinCEN SAR Activity Review publications; SAR narrative writing standards (FinCEN guidance); blockchain forensic analysis methodology (Chainalysis Reactor, CipherTrace); FFIEC suspicious activity monitoring guidance',
  soc_controls = 'SOC 2 Type II (Confidentiality, Processing Integrity); SAR filing timeliness (30-day/60-day requirements); SAR quality review program; 314(a) response compliance; 314(b) information sharing documentation; transaction monitoring alert disposition; case management system documentation; SAR confidentiality safeguards (31 USC 5318(g)(2)); law enforcement referral tracking'
WHERE name = 'SAR Filing Specialist / Financial Intelligence Analyst (Digital Assets)';

UPDATE citizen_catalog SET
  governing_guidelines = 'FATF Recommendation 16 (Travel Rule); FinCEN Travel Rule (31 CFR 1010.410(f)); EU Transfer of Funds Regulation (Regulation 2015/847 as amended); Swiss FINMA Travel Rule guidance; Japan FSA Travel Rule requirements',
  standards_of_creation = 'FATF Updated Guidance for a Risk-Based Approach to Virtual Assets; InterVASP Messaging Standards (IVMS101); TRISA (Travel Rule Information Sharing Architecture); OpenVASP protocol standards; sunrise period compliance standards per jurisdiction',
  soc_controls = 'SOC 2 Type II (Security, Processing Integrity); originator/beneficiary information collection verification; counterparty VASP due diligence; transaction threshold monitoring ($3,000 US / equivalent per jurisdiction); Travel Rule protocol implementation testing; data exchange audit trail; cross-border compliance documentation; information sharing agreement records'
WHERE name = 'Travel Rule Compliance Officer (Virtual Asset Service Provider)';

UPDATE citizen_catalog SET
  governing_guidelines = 'OFAC regulations (31 CFR Parts 500-599); Executive Orders (sanctions programs); FinCEN sanctions screening requirements; EU sanctions regulations; UN Security Council sanctions; state sanctions compliance requirements',
  standards_of_creation = 'ACAMS CGSS (Certified Global Sanctions Specialist) certification; OFAC Compliance Framework (2019); blockchain analytics for sanctions screening methodology; OFAC Specially Designated Nationals (SDN) list integration standards; OFAC Compliance Commitments guidance',
  soc_controls = 'SOC 2 Type II (Security, Processing Integrity); real-time wallet address screening against SDN list; blockchain transaction graph analysis; sanctions screening model validation; false positive reduction documentation; new sanctions program implementation tracking; OFAC voluntary self-disclosure documentation; batch screening documentation; IP geolocation blocking verification'
WHERE name = 'Sanctions Compliance Specialist (Blockchain/Cryptocurrency)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Securities Act of 1933 (15 USC 77a); Securities Exchange Act of 1934; Howey Test (SEC v. W.J. Howey Co.); SEC Framework for Investment Contract Analysis of Digital Assets (2019); SEC Staff No-Action Letters; state Blue Sky laws',
  standards_of_creation = 'SEC guidance on digital asset securities; state Bar securities law specialization; AICPA digital asset guidance; securities registration requirements (Form S-1, Regulation D, Regulation A+, Regulation CF, Regulation S); SAFTs and SAFE token classification methodology',
  soc_controls = 'SOC 2 Type II (Confidentiality, Processing Integrity); token classification analysis documentation; securities registration determination records; offering memorandum/prospectus review; Blue Sky compliance filing tracking; broker-dealer/ATS registration analysis; ongoing reporting obligation tracking; insider trading/Section 16 analysis for token issuers'
WHERE name = 'Token Classification Counsel / Digital Asset Securities Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = 'Securities Act of 1933; Regulation D (17 CFR 230.500-508); Regulation A+ (17 CFR 230.251-263); Regulation S; Regulation CF; SEC FinHub guidance; state securities registration exemptions; FINRA Rules (if broker-dealer involved)',
  standards_of_creation = 'SEC STO compliance guidance; FINRA digital asset rules (if applicable); accredited investor verification standards (Rule 506(c)); transfer agent registration requirements; smart contract audit standards for security token issuance; AICPA digital asset accounting standards',
  soc_controls = 'SOC 2 Type II (Security, Processing Integrity); investor accreditation verification documentation; Form D filing compliance; Blue Sky state notice filing tracking; investor communication records; smart contract security audit documentation; token transfer restriction enforcement; ongoing reporting compliance; secondary trading compliance monitoring'
WHERE name = 'Security Token Offering Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'SEC disclosure requirements (Securities Act Section 10); FTC Act Section 5 (deceptive practices); state consumer protection statutes; SEC guidance on ICO/token disclosure; EU MiCA disclosure requirements (if applicable)',
  standards_of_creation = 'SEC plain English disclosure standards; FINRA communications with public standards; state securities disclosure requirements; industry best practices for token white papers; AICPA guidance on token accounting disclosure',
  soc_controls = 'SOC 2 Type II (Processing Integrity); disclosure document version control; material information completeness review; risk factor adequacy assessment; technical claims verification; forward-looking statement disclaimers; ongoing disclosure update tracking; marketing material consistency review; social media disclosure compliance'
WHERE name = 'Token Disclosure and White Paper Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'IRC Section 61 (gross income); IRS Notice 2014-21 (virtual currency as property); IRC Section 1031 (pre-2018 like-kind exchange debate); Revenue Ruling 2019-24; Infrastructure Investment and Jobs Act Section 80603 (broker reporting); state tax treatment of virtual currency',
  standards_of_creation = 'AICPA Digital Asset Practice Aid; IRS virtual currency FAQ; CPA licensure and continuing education; EA (Enrolled Agent) certification; state-specific cryptocurrency tax guidance; cost basis calculation methodologies (FIFO, LIFO, specific identification, HIFO)',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); transaction history reconciliation; cost basis tracking system verification; Form 8949/Schedule D preparation documentation; FBAR/FATCA reporting for foreign exchange accounts; broker Form 1099-DA compliance preparation; DeFi income recognition documentation; staking/mining/airdrop income classification; IRS audit trail documentation'
WHERE name = 'Cryptocurrency Tax Specialist / Digital Asset Tax Advisor';

UPDATE citizen_catalog SET
  governing_guidelines = 'Infrastructure Investment and Jobs Act Section 80603 (IRC 6045 broker reporting for digital assets); proposed Treasury regulations on digital asset broker reporting; Form 1099-DA requirements; IRS information reporting penalty provisions (IRC 6721/6722)',
  standards_of_creation = 'IRS proposed regulations on broker reporting; AICPA digital asset reporting guidance; industry working group standards for 1099-DA implementation; cost basis reporting methodology standards; de minimis transaction reporting thresholds',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Security); transaction data completeness verification; customer TIN validation; Form 1099-DA generation and filing accuracy; backup withholding determination documentation; corrected return tracking; B-Notice response process; IRS TCC (Transmitter Control Code) management; information return penalty monitoring'
WHERE name = 'Digital Asset Broker Reporting Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'No direct federal regulation of smart contract auditing (emerging field); SEC guidance on digital asset platforms; state consumer protection statutes; CFTC guidance on smart contracts; EU MiCA smart contract requirements (where applicable)',
  standards_of_creation = 'IEEE P3222 (Smart Contract Security Standard — in development); SWC Registry (Smart Contract Weakness Classification); CWE (Common Weakness Enumeration) for blockchain; EIP (Ethereum Improvement Proposals) security standards; Consensys Diligence methodology; Trail of Bits audit methodology; OpenZeppelin security standards',
  soc_controls = 'SOC 2 Type II (Security, Processing Integrity); formal verification documentation; automated scanning tool results (Slither, Mythril, Echidna); manual code review documentation; test coverage reporting; vulnerability classification (critical/high/medium/low/informational); remediation verification; re-audit documentation; audit report publication and hash verification'
WHERE name = 'Smart Contract Security Auditor';

UPDATE citizen_catalog SET
  governing_guidelines = 'SEC guidance on DeFi platforms (SEC enforcement actions against DeFi protocols); CFTC jurisdiction over DeFi derivatives; BSA/AML applicability to DeFi; state money transmitter analysis for DeFi; FATF guidance on DeFi (VASP analysis)',
  standards_of_creation = 'FATF Updated Guidance for Virtual Assets (DeFi section); industry DeFi compliance frameworks (DeFi Education Fund, Blockchain Association); protocol governance documentation standards; risk assessment methodology for decentralized protocols; AICPA DeFi audit considerations',
  soc_controls = 'SOC 2 Type II (Security, Processing Integrity); protocol governance vote documentation; smart contract upgrade audit trail; treasury management documentation; oracle manipulation risk assessment; flash loan attack mitigation documentation; liquidity pool compliance monitoring; front-running prevention documentation; protocol fee transparency reporting'
WHERE name = 'Decentralized Finance Compliance Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'State lending laws (usury, licensing); TILA/Regulation Z applicability analysis; ECOA/Regulation B (fair lending in algorithmic underwriting); state consumer protection statutes; SEC analysis (if lending tokens are securities)',
  standards_of_creation = 'State lending license requirements; TILA disclosure standards (if applicable); fair lending testing methodology for algorithmic protocols; CFPB guidance on AI/ML in lending; responsible innovation frameworks',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Security); collateralization ratio monitoring; liquidation mechanism documentation; interest rate transparency; borrower/lender disclosure compliance; smart contract lending pool audit; governance token voting documentation; protocol parameter change tracking; default and recovery documentation'
WHERE name = 'Decentralized Lending Protocol Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'SEC analysis of staking as securities (SEC enforcement positions); state money transmitter analysis for staking services; IRS staking income guidance (Rev. Rul. 2023-14); OFAC sanctions compliance for validator operations',
  standards_of_creation = 'Protocol-specific validator requirements (Ethereum Beacon Chain, Solana, Cosmos); Ethereum Foundation staking documentation; validator client diversity standards; slashing condition documentation; IRS income recognition standards for staking rewards',
  soc_controls = 'SOC 2 Type II (Security, Availability); validator uptime monitoring; slashing event documentation; key management security audit; withdrawal credential security; MEV (Maximal Extractable Value) compliance documentation; staking reward calculation verification; client diversity monitoring; delegator communication records'
WHERE name = 'Staking Operations / Validator Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'State mining regulations (energy, environmental, zoning); EPA air/noise emissions (if applicable); state energy regulations; local zoning and permitting; OSHA workplace safety; tax classification of mining income (IRS Notice 2014-21)',
  standards_of_creation = 'State mining/energy permit requirements; ASHRAE data center cooling standards (applicable to mining facilities); electrical code compliance (NEC); environmental impact assessment methodology; IRS mining income reporting standards (ordinary income at receipt)',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Security); energy consumption monitoring and reporting; hash rate verification; mining pool payout documentation; equipment depreciation records; environmental compliance monitoring; noise/thermal emission documentation; electrical system safety inspection records; tax basis documentation for mined assets'
WHERE name = 'Mining Operations Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'SEC qualified custodian requirements (Investment Advisers Act Rule 206(4)-2); NY Trust Company charter requirements; state trust company/fiduciary licensing; OCC crypto custody guidance (Interpretive Letter 1170); FinCEN BSA requirements for custodians',
  standards_of_creation = 'SEC custody rule compliance methodology; AICPA SOC 1/SOC 2 custody standards; state trust company examination standards; CCSS (Cryptocurrency Security Standard); ISO 27001 for digital asset custody; multi-signature wallet standards',
  soc_controls = 'SOC 2 Type II (Security, Availability, Processing Integrity); private key management audit (generation, storage, rotation, destruction); multi-signature authorization verification; cold/hot wallet segregation documentation; insurance coverage verification; proof-of-reserves attestation; disaster recovery testing; client asset segregation verification; regulatory examination readiness'
WHERE name = 'Digital Asset Custody Officer / Qualified Custodian';

UPDATE citizen_catalog SET
  governing_guidelines = 'State insurance regulations; NAIC framework for insurance of digital assets; Lloyd syndicate requirements; surplus lines regulations; state admitted/non-admitted carrier rules',
  standards_of_creation = 'CPCU/ARM designation standards (The Institutes); cryptocurrency-specific risk assessment methodology; digital asset valuation standards for insurance purposes; smart contract insurance underwriting standards; DeFi protocol risk scoring methodology',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Security); risk assessment documentation; coverage determination records; claims handling documentation; proof-of-loss verification (blockchain-based); cold storage security assessment; hot wallet exposure monitoring; policy exclusion documentation; reinsurance treaty compliance; aggregate limit monitoring'
WHERE name = 'Cryptocurrency Insurance Underwriter / Risk Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'SEC analysis (are NFTs securities under Howey test — SEC enforcement trends); Copyright Act (17 USC 101); state consumer protection; FTC endorsement and disclosure rules; state unfair business practices statutes; EU MiCA analysis for NFTs',
  standards_of_creation = 'Copyright registration methodology (US Copyright Office); smart contract royalty enforcement standards (ERC-2981); NFT metadata standards (ERC-721, ERC-1155); DMCA compliance for NFT platforms; IP due diligence methodology for NFT minting',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Security); IP ownership verification documentation; DMCA takedown process; royalty enforcement mechanism documentation; wash trading detection methodology; marketplace terms of service compliance; creator verification records; metadata immutability verification; secondary sale royalty tracking'
WHERE name = 'Non-Fungible Token Legal Compliance Specialist';

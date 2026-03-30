-- Compliance, Audit, Risk Industry Triple Constraint Completion

UPDATE citizen_catalog SET
  governing_guidelines = 'Sarbanes-Oxley Act Section 302/404; Federal Sentencing Guidelines Chapter 8 (Effective Compliance Programs); Dodd-Frank Act whistleblower provisions; state corporate compliance requirements; industry-specific regulatory requirements',
  standards_of_creation = 'SCCE (Society of Corporate Compliance and Ethics) CCB certification standards; DOJ Evaluation of Corporate Compliance Programs (2023 update); COSO Internal Control Framework; ISO 37301 (Compliance Management Systems); OCEG GRC Capability Model',
  soc_controls = 'SOC 2 Type II (all five trust service criteria); compliance program effectiveness assessment documentation; hotline/helpline administration and tracking; regulatory change management documentation; compliance risk assessment methodology; board reporting documentation; training completion and competency tracking; regulatory examination readiness'
WHERE name = 'Chief Compliance Officer (CCO)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Same regulatory framework as CCO plus delegated authority documentation requirements; Federal Sentencing Guidelines organizational compliance credit; DOJ individual accountability policy (Yates Memo successor)',
  standards_of_creation = 'SCCE CCB/CHC/CHPC certification standards; compliance program delegation and escalation frameworks; DOJ compliance program evaluation criteria; industry-specific deputy compliance officer role standards',
  soc_controls = 'SOC 2 Type II (Processing Integrity); compliance monitoring program documentation; issue escalation tracking; departmental compliance review schedules; regulatory inquiry response coordination; compliance committee meeting documentation; corrective action plan tracking and closure verification'
WHERE name = 'Deputy/Assistant Chief Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Bank Secrecy Act (31 USC 5311); USA PATRIOT Act; Dodd-Frank Act; GLBA (15 USC 6801); CRA (12 USC 2901); ECOA (15 USC 1691); TILA (15 USC 1601); FDPA; state banking regulations',
  standards_of_creation = 'ABA Compliance School curriculum; CRCM (Certified Regulatory Compliance Manager) certification by ABA/ICB; OCC Comptrollers Handbook; FDIC Compliance Examination Manual; Federal Reserve Consumer Compliance Handbook',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); BSA/AML program audit; CRA performance evaluation documentation; fair lending analysis; complaint management tracking; regulatory examination preparation; compliance testing and monitoring program; risk assessment documentation (enterprise and compliance)'
WHERE name = 'Financial Services Compliance Officer (Banking)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Securities Exchange Act of 1934 (15 USC 78a); Investment Advisers Act of 1940; Investment Company Act of 1940; Dodd-Frank Act; SEC Rules and Regulations; FINRA Rules; state securities (Blue Sky) laws',
  standards_of_creation = 'SEC compliance program requirements (Rule 206(4)-7 for advisers, Rule 38a-1 for funds); FINRA Rule 3110 (Supervision); NSCP (National Society of Compliance Professionals) certification; IACCP (Investment Adviser Certified Compliance Professional)',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality, Security); trade surveillance monitoring; personal trading pre-clearance; code of ethics attestation tracking; advertising review documentation; Form ADV/BD amendment tracking; regulatory filing deadline management; SEC/FINRA examination readiness; insider trading prevention program documentation'
WHERE name = 'Securities Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'State insurance codes; McCarran-Ferguson Act (15 USC 1011); NAIC Model Laws and Regulations; Dodd-Frank Act Title V (FIO); state DOI regulations; HIPAA (health insurance)',
  standards_of_creation = 'NAIC Accreditation Program standards; AICP (Associate in Insurance Compliance) designation; AINS/CPCU certification (The Institutes); state DOI market conduct examination standards; NAIC Market Regulation Handbook',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); rate and form filing compliance tracking; market conduct examination documentation; producer licensing verification; claims handling compliance audit; policyholder complaint tracking; state DOI annual statement filing; surplus lines compliance; reinsurance treaty compliance'
WHERE name = 'Insurance Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'CCPA/CPRA (CA Civil Code 1798.100); GDPR (where applicable); HIPAA Privacy Rule; GLBA Privacy; COPPA; FERPA; state comprehensive privacy laws; FTC Act Section 5',
  standards_of_creation = 'IAPP (International Association of Privacy Professionals) CIPP/CIPM/CIPT certifications; NIST Privacy Framework; ISO 27701 (Privacy Information Management System); AICPA Privacy Management Framework',
  soc_controls = 'SOC 2 Type II (Privacy, Confidentiality); privacy impact assessment documentation; data inventory and mapping; consent management audit; data subject request processing and tracking; vendor privacy assessment; breach notification process documentation; privacy training completion; cookie/tracking technology compliance audit'
WHERE name = 'Privacy Officer / Chief Privacy Officer (CPO)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Bank Secrecy Act (31 USC 5311-5332); USA PATRIOT Act; FinCEN regulations (31 CFR Chapter X); OFAC sanctions regulations (31 CFR Parts 500-599); EU Anti-Money Laundering Directives (where applicable)',
  standards_of_creation = 'ACAMS (Association of Certified Anti-Money Laundering Specialists) CAMS certification; FFIEC BSA/AML Examination Manual; FinCEN guidance documents; Wolfsberg Group AML principles; FATF Recommendations',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Security); CTR/SAR filing timeliness and accuracy audit; CDD/EDD documentation review; sanctions screening documentation; transaction monitoring tuning and validation; model risk management for AML; independent BSA/AML audit (required annually); CIP program verification; PEP screening documentation'
WHERE name = 'Anti-Money Laundering (AML) Compliance Officer / BSA Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Export Administration Regulations (EAR) (15 CFR Parts 730-774); International Traffic in Arms Regulations (ITAR) (22 CFR Parts 120-130); OFAC sanctions; Anti-Boycott regulations (EAR Part 760); Foreign Corrupt Practices Act',
  standards_of_creation = 'BIS (Bureau of Industry and Security) guidance; DDTC (Directorate of Defense Trade Controls) guidance; SCCE/SIA export compliance program standards; International Compliance Professionals Association standards; AES/ACE filing requirements',
  soc_controls = 'SOC 2 Type II (Security, Processing Integrity); export classification determination documentation (ECCN/USML); license application tracking; deemed export compliance; end-user screening (consolidated screening list); technology transfer control documentation; voluntary self-disclosure documentation; record retention compliance (5 years per EAR/ITAR)'
WHERE name = 'Export Controls / Trade Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Clean Air Act; Clean Water Act; RCRA; CERCLA; TSCA; EPCRA; NEPA; state environmental statutes; EPA regulations (40 CFR)',
  standards_of_creation = 'ISO 14001 (Environmental Management Systems); CHMM (Certified Hazardous Materials Manager) certification; QEP (Qualified Environmental Professional) designation; BEAC (Board of Environmental, Health & Safety Auditor Certifications) standards; EPA compliance assistance center guidance',
  soc_controls = 'SOC 2 Type II (Processing Integrity); environmental permit compliance tracking; emissions monitoring and reporting; waste manifest tracking; spill prevention and response documentation; environmental audit program; regulatory inspection readiness; corrective action tracking; environmental management system internal audit documentation'
WHERE name = 'Environmental Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Federal Sentencing Guidelines Chapter 8; Dodd-Frank Act whistleblower protections (15 USC 78u-6); SOX whistleblower protections (18 USC 1514A); state whistleblower protection statutes; False Claims Act qui tam provisions',
  standards_of_creation = 'SCCE investigation standards; ACFE (Association of Certified Fraud Examiners) investigation methodology; AWI (Association of Workplace Investigators) Guiding Principles; EEOC investigation guidance; federal investigation standards',
  soc_controls = 'SOC 2 Type II (Confidentiality, Processing Integrity); investigation file documentation standards; evidence chain of custody; witness interview documentation; investigation timeline tracking; privilege management; anonymity protection documentation; investigation outcome tracking; remediation verification; hotline data analytics'
WHERE name = 'Ethics & Compliance Investigator';

UPDATE citizen_catalog SET
  governing_guidelines = 'State corporation codes; SEC proxy rules (14a-8); NYSE/NASDAQ listing standards; Dodd-Frank Act corporate governance provisions; state business organization statutes',
  standards_of_creation = 'Society for Corporate Governance best practices; CGI (Certified Governance Professional) designation; ICSA (Institute of Chartered Secretaries and Administrators) qualification; ABA Business Law Section governance guidance',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); board meeting minutes documentation; corporate record maintenance; proxy statement preparation and review; beneficial ownership reporting (Sections 13/16); subsidiary governance tracking; corporate charter/bylaws amendment documentation; regulatory filing calendar management; entity management system audit'
WHERE name = 'Corporate Secretary / Governance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'IRC Section 409A (deferred compensation); IRC Section 162(m) (excessive compensation deduction limitation); SEC executive compensation disclosure rules (Regulation S-K Item 402); Dodd-Frank say-on-pay; ERISA',
  standards_of_creation = 'WorldatWork CCP/GRP certification; SHRM-SCP competency standards; SEC executive compensation disclosure requirements; ISS (Institutional Shareholder Services) pay-for-performance methodology; Glass Lewis proxy advisory standards',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); Section 409A compliance documentation; proxy statement CD&A preparation and review; clawback policy administration; stock plan administration audit; peer group benchmarking documentation; compensation committee charter compliance; Section 162(m) performance goal documentation'
WHERE name = 'Executive Compensation Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Securities Exchange Act Section 10(b) and Rule 10b-5; Section 16 reporting requirements; Regulation FD; SOX Section 304 (forfeiture); Dodd-Frank insider trading provisions; SEC Rule 10b5-1 trading plans',
  standards_of_creation = 'SEC guidance on Rule 10b5-1 plans (2023 amendments); NYSE/NASDAQ insider trading policy requirements; FINRA surveillance standards; company insider trading policy best practices per SEC guidance',
  soc_controls = 'SOC 2 Type II (Confidentiality, Processing Integrity); trading window management; pre-clearance documentation; Section 16 filing timeliness (2 business days); Rule 10b5-1 plan adoption and modification documentation; blackout period notification; MNPI access tracking; information barrier documentation; Form 4/5 filing accuracy verification'
WHERE name = 'Insider Trading Compliance Officer / Section 16 Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Federal court authority (18 USC 3563(b)(14)); DOJ Monitor Selection Principles (Morford Memo, Benczkowski Memo); SEC and CFTC consent decree provisions; state AG consent order authority; DPA/NPA terms',
  standards_of_creation = 'DOJ Compliance Monitor Selection and Use Policy; ICC International Compliance Association Monitor standards; World Bank Integrity Compliance Guidelines; Transparency International corporate monitoring standards',
  soc_controls = 'SOC 2 Type II (all five trust service criteria); monitorship work plan documentation; periodic reporting to appointing authority; independence verification; remediation progress tracking; access to books and records documentation; compliance program benchmarking; monitor report confidentiality management; transition and termination documentation'
WHERE name = 'Independent Corporate Monitor';

UPDATE citizen_catalog SET
  governing_guidelines = 'State corporation codes governance provisions; SEC corporate governance rules; NYSE Section 303A / NASDAQ Rule 5600 (corporate governance standards); Dodd-Frank governance provisions; ISS/Glass Lewis governance policies',
  standards_of_creation = 'NACD (National Association of Corporate Directors) Directorship certification; Diligent Institute governance frameworks; Conference Board governance best practices; Spencer Stuart Board Index methodology; ICD (Institute of Corporate Directors) designation',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality); board effectiveness assessment documentation; director independence evaluation; committee charter compliance; board diversity and skills matrix; succession planning documentation; shareholder engagement program records; ESG governance integration documentation'
WHERE name = 'Board Governance Advisor / Governance Consultant';

UPDATE citizen_catalog SET
  governing_guidelines = 'Federal Acquisition Regulation (FAR); DFARS; 41 USC (Public Contracts); Small Business Act (15 USC 631); Trade Agreements Act; Service Contract Act; Buy American Act; False Claims Act',
  standards_of_creation = 'NCMA (National Contract Management Association) CPCM/CFCM certification; DAU (Defense Acquisition University) certification levels; FAR Part 3 (Improper Business Practices) compliance program requirements; DCAA audit standards',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Security); cost accounting system adequacy; TINA (Truth in Negotiations Act) compliance; CAS (Cost Accounting Standards) compliance; organizational conflict of interest documentation; mandatory disclosure program; CPSR (Contractor Purchasing System Review) documentation; subcontractor flow-down verification; DCAA audit trail requirements'
WHERE name = 'Government Contracts Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'GDPR Articles 37-39 (DPO requirements); CCPA/CPRA (CA); state comprehensive privacy laws; ePrivacy Directive; international data transfer mechanisms (SCCs, BCRs)',
  standards_of_creation = 'IAPP CIPP/E and CIPM certifications; EDPB DPO Guidelines (WP243); ISO 27701; NIST Privacy Framework; Article 29 Working Party guidance documents',
  soc_controls = 'SOC 2 Type II (Privacy, Confidentiality, Security); Data Protection Impact Assessment (DPIA) program; Records of Processing Activities (ROPA) maintenance; data subject rights request tracking (30-day response compliance); breach notification process (72-hour assessment); international data transfer documentation; vendor/processor due diligence; DPO independence documentation; supervisory authority communication records'
WHERE name = 'Data Protection Officer (DPO) — GDPR Mandated';

UPDATE citizen_catalog SET
  governing_guidelines = 'IIA International Standards for the Professional Practice of Internal Auditing; SOX Section 404; Federal Sentencing Guidelines (internal audit function); state audit committee requirements; industry-specific IA requirements',
  standards_of_creation = 'IIA International Professional Practices Framework (IPPF); CIA (Certified Internal Auditor) certification; COSO Internal Control and ERM Frameworks; IIA Quality Assurance and Improvement Program (QAIP) standards',
  soc_controls = 'SOC 2 Type II (all five trust service criteria); internal audit charter compliance; risk-based audit plan documentation; audit committee reporting; quality assurance review documentation; CAE functional reporting line documentation; audit universe maintenance; workpaper standards compliance; issue tracking and validation; external quality assessment (every 5 years per IIA Standards)'
WHERE name = 'Chief Audit Executive (CAE)';

UPDATE citizen_catalog SET
  governing_guidelines = 'IIA International Standards for the Professional Practice of Internal Auditing; SOX Section 404 testing requirements; industry-specific regulatory audit requirements; OMB Circular A-123 (federal agencies)',
  standards_of_creation = 'IIA IPPF; CIA/CRMA certification standards; COSO Framework application; IIA Practice Guides and Practice Advisories; ISACA COBIT (for IT-related audits); data analytics methodology standards',
  soc_controls = 'SOC 2 Type II (Processing Integrity); workpaper documentation standards; evidence collection and retention; finding rating methodology; management response tracking; corrective action validation; continuous auditing/monitoring documentation; audit report quality review; independence and objectivity documentation'
WHERE name = 'Internal Auditor (Staff/Senior/Manager)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Federal False Claims Act (31 USC 3729); Wire Fraud (18 USC 1343); Mail Fraud (18 USC 1341); state fraud statutes; Dodd-Frank whistleblower provisions; SOX anti-fraud provisions',
  standards_of_creation = 'ACFE (Association of Certified Fraud Examiners) CFE certification; ACFE Fraud Examiners Manual; AICPA SAS 99 (Consideration of Fraud); COSO Fraud Risk Management Guide; IIA Practice Guide on Fraud',
  soc_controls = 'SOC 2 Type II (Processing Integrity, Confidentiality, Security); fraud risk assessment documentation; investigation methodology documentation; evidence chain of custody; digital forensic evidence handling; interview documentation and recordings; fraud loss quantification workpapers; referral documentation (law enforcement, regulatory); whistleblower identity protection; fraud analytics model documentation'
WHERE name = 'Fraud Examiner / Forensic Auditor';

UPDATE citizen_catalog SET
  governing_guidelines = 'ISACA audit standards; SOX Section 404 (IT controls); FISMA; HIPAA Security Rule; PCI DSS; NIST SP 800-53; state data security laws',
  standards_of_creation = 'ISACA CISA (Certified Information Systems Auditor) certification; ISACA IT Audit Framework; COBIT 2019; NIST Cybersecurity Framework; IIA GTAG (Global Technology Audit Guides)',
  soc_controls = 'SOC 2 Type II (Security, Availability, Processing Integrity); IT general controls testing documentation; application controls testing; access management review; change management audit; business continuity/DR testing documentation; penetration testing results; vulnerability management tracking; network segmentation verification; data classification compliance'
WHERE name = 'IT Auditor';

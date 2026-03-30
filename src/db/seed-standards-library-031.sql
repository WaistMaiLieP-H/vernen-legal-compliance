-- ============================================================
-- SEED 031: ARCHIVIST-0 & VERITAS-0 — International Document Standards
-- Cross-border authentication, trade documents, travel documents,
-- international court/notary, anti-money laundering, banking,
-- and treaty-based document frameworks.
-- Created: 2026-03-18
-- ============================================================


-- ============================================================
-- SECTION 1: INTERNATIONAL DOCUMENT AUTHENTICATION FRAMEWORKS
-- ============================================================

INSERT OR IGNORE INTO governing_standards
  (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title,
   description, requirements, key_sections, document_types, skill_slugs,
   enforcement_body, enforcement_url, private_right_of_action,
   statute_of_limitations, damages_available, effective_date, last_amended,
   source_url, is_active, created_at, updated_at)
VALUES

-- Hague Apostille Convention (expanded)
('std_ver_050', 'VERITAS-0', 'INTERNATIONAL', 'INTL',
 'Hague Convention of 5 October 1961 (Apostille Convention); 125 member states', 'Hague Apostille',
 'Hague Convention Abolishing the Requirement of Legalisation — Apostille Standards',
 'International treaty (125 member states as of 2025) establishing the apostille as the sole authentication required for public documents circulating between member states. The apostille is a standardized certificate (Annex format) affixed to the document by a Competent Authority. Must contain exactly 10 numbered fields in the prescribed order. Documents with apostilles not conforming to the Annex format, issued by non-Competent Authorities, or with fields completed incorrectly are invalid under the Convention. The e-Apostille Programme extends these standards to electronic apostilles with digital signatures.',
 '["Annex format: exactly 10 numbered fields in prescribed order","Field 1: Country of origin","Field 2: Signed by (name of document signer)","Field 3: Acting in the capacity of (title/position)","Field 4: Seal/stamp of the authority on the document","Field 5: City of apostille issuance","Field 6: Date of apostille issuance","Field 7: Competent Authority issuing apostille","Field 8: Apostille number (sequential)","Field 9: Seal/stamp of Competent Authority","Field 10: Signature of Competent Authority representative","Title must read: APOSTILLE (Convention de La Haye du 5 octobre 1961)","e-Apostille: digital signature, secure verification URL, tamper-evident seal","Competent Authority must be designated by the member state"]',
 '[{"section":"Article 1","description":"Scope — public documents executed in one Contracting State to be produced in another"},{"section":"Article 2","description":"Exemption from legalisation — apostille is sole formality"},{"section":"Article 3","description":"Apostille affixed to document — certifies origin only, not content"},{"section":"Article 4","description":"Apostille placed on document itself or allonge"},{"section":"Article 6","description":"Each state designates Competent Authorities"},{"section":"Annex","description":"Model apostille certificate — 10 mandatory fields"},{"section":"e-APP","description":"Electronic Apostille Programme — digital standards"}]',
 '["apostille","public_document","notarized_document","court_order","vital_record","government_certificate","educational_credential","corporate_document"]',
 '["international-document-authentication","apostille-validation","competent-authority-verification"]',
 'Hague Conference on Private International Law (HCCH)', 'https://www.hcch.net/en/instruments/conventions/specialised-sections/apostille',
 0, NULL, NULL,
 '1965-01-24', '2024-01-01',
 'https://www.hcch.net/en/instruments/conventions/specialised-sections/apostille', 1, datetime('now'), datetime('now')),

-- Hague Service Convention
('std_ver_051', 'VERITAS-0', 'INTERNATIONAL', 'INTL',
 'Hague Convention of 15 November 1965 (Service Abroad Convention); 82 member states', 'Hague Service',
 'Hague Convention on the Service Abroad of Judicial and Extrajudicial Documents',
 'International treaty governing service of process across borders. Requires service through designated Central Authorities using prescribed forms (USM-94 in the US). The Model Certificate (Annex) must accompany every request with specific fields completed in the language of the receiving state or in French/English. Service not conforming to Convention requirements may be challenged as invalid, potentially voiding judgments. Documents purporting to prove international service must contain completed Convention certificates.',
 '["Request form to Central Authority in prescribed format","Summary of Document to be Served (Annex)","Translation into language of receiving state (or French/English)","Certificate of Service returned by Central Authority","Identification of parties (applicant and respondent)","Nature and purpose of document being served","Time limits noted if applicable","Method of service requested (formal, informal, personal)","Central Authority confirmation of service date and method","Alternative service documentation when Convention service fails"]',
 '[{"section":"Article 2","description":"Central Authority — each state designates authority to receive requests"},{"section":"Article 3","description":"Request form — mandatory content and format"},{"section":"Article 5","description":"Methods of service — formal, informal, personal delivery"},{"section":"Article 6","description":"Certificate of Service — Central Authority completes and returns"},{"section":"Article 10","description":"Alternative channels — postal, diplomatic, direct"},{"section":"Article 15","description":"Default judgment protections — adequate time requirement"}]',
 '["service_of_process","hague_request","certificate_of_service","international_summons","international_subpoena","usm_94"]',
 '["international-document-authentication","service-of-process-validation","central-authority-verification"]',
 'Hague Conference on Private International Law (HCCH)', 'https://www.hcch.net/en/instruments/conventions/specialised-sections/service',
 0, NULL, NULL,
 '1969-02-10', NULL,
 'https://www.hcch.net/en/instruments/conventions/specialised-sections/service', 1, datetime('now'), datetime('now')),

-- Hague Evidence Convention
('std_ver_052', 'VERITAS-0', 'INTERNATIONAL', 'INTL',
 'Hague Convention of 18 March 1970 (Evidence Abroad Convention); 63 member states', 'Hague Evidence',
 'Hague Convention on the Taking of Evidence Abroad in Civil or Commercial Matters',
 'International treaty governing cross-border evidence gathering. Letters of Request (Letters Rogatory) must follow prescribed format and be transmitted through Central Authorities. Evidence obtained outside Convention procedures may be inadmissible. Documents claiming to be evidence gathered internationally must demonstrate Convention compliance or valid alternative basis.',
 '["Letter of Request in prescribed format","Transmitted through Central Authority","Identity of requesting authority","Nature of proceedings and subject matter","Evidence requested with specificity","Names and addresses of parties","Names and addresses of witnesses","Questions to be put or subject matter for examination","Documents or property to be inspected","Special procedures requested (if any)","Statement of whether attendance of parties/counsel permitted","Language of request (receiving state or French/English)","Executed Letter returned with evidence obtained"]',
 '[{"section":"Article 1","description":"Scope — Letters of Request for evidence in civil/commercial matters"},{"section":"Article 2","description":"Central Authority — designated to receive Letters of Request"},{"section":"Article 3","description":"Content of Letter of Request — mandatory fields"},{"section":"Article 9","description":"Execution — methods of compulsion available"},{"section":"Article 12","description":"Privilege — right to refuse based on privilege"},{"section":"Article 23","description":"Pre-trial discovery reservation — many states exclude"}]',
 '["letter_of_request","letter_rogatory","international_deposition","foreign_evidence","central_authority_response","evidence_commission"]',
 '["international-document-authentication","evidence-convention-validation","letter-rogatory-format-check"]',
 'Hague Conference on Private International Law (HCCH)', 'https://www.hcch.net/en/instruments/conventions/specialised-sections/evidence',
 0, NULL, NULL,
 '1972-10-07', NULL,
 'https://www.hcch.net/en/instruments/conventions/specialised-sections/evidence', 1, datetime('now'), datetime('now')),


-- ============================================================
-- SECTION 2: TRAVEL & IDENTITY DOCUMENT STANDARDS
-- ============================================================

-- ICAO Doc 9303 — Machine Readable Travel Documents
('std_arc_030', 'ARCHIVIST-0', 'INTERNATIONAL', 'INTL',
 'ICAO Doc 9303 (Machine Readable Travel Documents), 8th Edition (2021)', 'ICAO 9303',
 'ICAO Machine Readable Travel Documents — Passport, Visa, and ID Card Standards',
 'International Civil Aviation Organization standard defining the physical and logical structure of machine-readable passports (MRP), visas (MRV), and travel cards. Specifies document size, Machine Readable Zone (MRZ) format, biometric data storage (RFID/NFC chip), security features (holograms, UV, IR, watermarks), and photo specifications. 193 ICAO member states issue documents conforming to Doc 9303. Documents claiming to be official travel/identity documents must contain valid MRZ data with correct check digits, proper security features for the issuing state, and conforming biometric data structure.',
 '["Machine Readable Zone (MRZ) format — TD1, TD2, TD3 sizes","MRZ check digit algorithm (modulus 10 with specific weights)","Biometric data storage per LDS (Logical Data Structure)","RFID/NFC chip with BAC or PACE access control","Security features: hologram, UV-reactive ink, IR-responsive ink, watermark","Photo specifications: 35x45mm, neutral expression, plain background","Document numbering format per issuing state","Validity period encoding","Nationality and issuing state codes (ISO 3166-1 alpha-3)","Name formatting conventions (primary/secondary identifier)","Optional data field specifications","VIZ (Visual Inspection Zone) requirements"]',
 '[{"section":"Part 1","description":"Introduction — scope, references, definitions"},{"section":"Part 2","description":"Specifications Common to All MRTDs"},{"section":"Part 3","description":"Machine Readable Passports (MRP) — TD3 size"},{"section":"Part 4","description":"Specifications for MRVs (Machine Readable Visas)"},{"section":"Part 5","description":"TD1 Size MRTDs — ID cards"},{"section":"Part 6","description":"TD2 Size MRTDs"},{"section":"Part 7","description":"Machine Readable Visas — format B"},{"section":"Part 9","description":"Deployment of Biometric Identification"},{"section":"Part 10-13","description":"Logical Data Structure, PKI, BAC, PACE"}]',
 '["passport","visa","national_id_card","travel_document","refugee_travel_document","diplomatic_passport","service_passport","emergency_travel_document"]',
 '["document-type-identification","travel-document-authentication","mrz-validation","biometric-data-verification"]',
 'International Civil Aviation Organization', 'https://www.icao.int/publications/pages/publication.aspx?docnum=9303',
 0, NULL, NULL,
 '1980-01-01', '2021-01-01',
 'https://www.icao.int/publications/pages/publication.aspx?docnum=9303', 1, datetime('now'), datetime('now')),

-- ISO/IEC 7810/7816 — ID Card Standards
('std_arc_031', 'ARCHIVIST-0', 'INTERNATIONAL', 'INTL',
 'ISO/IEC 7810:2019; ISO/IEC 7816-1:2024 (ID Card Physical/Electronic Standards)', 'ISO 7810/7816',
 'ISO ID Card Standards — Physical Characteristics and Electronic Interface',
 'International standards defining physical dimensions, durability, and electronic interfaces for identification cards including driver licenses, national IDs, health cards, and access cards. ISO 7810 defines four card sizes (ID-1 through ID-4). ISO 7816 defines contact chip interface specifications. Documents claiming to be official identification cards must conform to the appropriate ID size, material specifications, and chip interface standards for their issuing jurisdiction.',
 '["ID-1 size: 85.60 x 53.98 mm (credit card / driver license)","ID-2 size: 105 x 74 mm (French/German national ID)","ID-3 size: 125 x 88 mm (passport data page)","Material and durability specifications","Bending resistance requirements","Contact chip position and dimensions (ISO 7816)","Contactless interface specifications (ISO 14443)","Magnetic stripe specifications (ISO 7811)","Embossing character specifications","Optical memory card specifications","UV and IR security feature zones","Card numbering and issuing authority identification"]',
 '[{"section":"ISO 7810","description":"Physical characteristics — four card sizes"},{"section":"ISO 7816-1","description":"Cards with contacts — physical characteristics"},{"section":"ISO 7816-2","description":"Cards with contacts — dimensions and location of contacts"},{"section":"ISO 7816-4","description":"Organization, security, and commands for interchange"},{"section":"ISO 14443","description":"Contactless proximity cards — RFID interface"},{"section":"ISO 7811","description":"Magnetic stripe recording technique"}]',
 '["driver_license","national_id","health_card","access_card","smart_card","military_id","student_id","government_employee_id"]',
 '["document-type-identification","id-card-authentication","physical-specification-validation"]',
 'ISO/IEC JTC 1/SC 17', 'https://www.iso.org/standard/70483.html',
 0, NULL, NULL,
 '1985-01-01', '2024-01-01',
 'https://www.iso.org/standard/70483.html', 1, datetime('now'), datetime('now')),


-- ============================================================
-- SECTION 3: INTERNATIONAL TRADE DOCUMENT STANDARDS
-- ============================================================

-- UN/CEFACT Trade Document Standards
('std_ver_053', 'VERITAS-0', 'INTERNATIONAL', 'INTL',
 'UN/CEFACT Recommendation 1 (UN Layout Key); UN/EDIFACT; UNeDocs', 'UN/CEFACT Trade',
 'United Nations CEFACT — International Trade Document Standards',
 'United Nations Centre for Trade Facilitation and Electronic Business standards for international trade documents. The UN Layout Key (Recommendation 1) standardizes the physical layout of trade documents (invoices, bills of lading, certificates of origin, customs declarations). UN/EDIFACT provides electronic data interchange standards. Documents claiming to be official trade documents must conform to the UN Layout Key field positions and coding standards.',
 '["UN Layout Key: standardized field positions for trade documents","Commercial invoice mandatory fields (seller, buyer, goods description, value, terms)","Bill of lading format and content requirements","Certificate of origin format and authentication","Customs declaration format (SAD/Single Administrative Document)","Packing list specifications","Insurance certificate format","Inspection certificate requirements","Incoterms reference standards (ICC)","HS (Harmonized System) commodity codes","Country of origin marking requirements","Documentary credit (Letter of Credit) UCP 600 compliance"]',
 '[{"section":"Recommendation 1","description":"UN Layout Key for Trade Documents — field positions"},{"section":"UN/EDIFACT","description":"Electronic Data Interchange for Administration, Commerce, and Transport"},{"section":"Recommendation 6","description":"Aligned Invoice Layout Key"},{"section":"Recommendation 11","description":"Documentary Aspects of Air Transport"},{"section":"Recommendation 12","description":"Documentary Aspects of Sea Transport"},{"section":"UNeDocs","description":"UN electronic Documents standard"}]',
 '["commercial_invoice","bill_of_lading","certificate_of_origin","customs_declaration","packing_list","insurance_certificate","letter_of_credit","inspection_certificate","phytosanitary_certificate","dangerous_goods_declaration"]',
 '["international-document-authentication","trade-document-validation","un-layout-key-format-check"]',
 'United Nations Economic Commission for Europe (UNECE)', 'https://unece.org/trade/uncefact',
 0, NULL, NULL,
 NULL, NULL,
 'https://unece.org/trade/uncefact', 1, datetime('now'), datetime('now')),

-- UCP 600 — Documentary Credits
('std_ver_054', 'VERITAS-0', 'INTERNATIONAL', 'INTL',
 'ICC Uniform Customs and Practice for Documentary Credits (UCP 600, 2007)', 'UCP 600',
 'ICC UCP 600 — Letter of Credit and Documentary Credit Standards',
 'International Chamber of Commerce rules governing letters of credit used in international trade. UCP 600 defines how banks examine documents presented under documentary credits. Article 14 requires strict compliance — documents must appear on their face to comply with credit terms. Documents with discrepancies (spelling errors, inconsistent data, non-conforming formatting) are grounds for refusal of payment. This is document forensics applied to international banking — the bank IS the document auditor.',
 '["Strict compliance standard — documents must conform on their face (Art. 14)","Commercial invoice must appear to have been issued by beneficiary","Transport document must evidence shipment as specified","Insurance document must cover risks specified in credit","Original documents required unless credit permits copies","Consistency of data across all presented documents","Description of goods must match credit (invoice)","Quantity tolerance (5% unless prohibited)","Drawing amount tolerance (5% unless prohibited)","Document presentation period (21 calendar days after shipment, within credit validity)","Discrepancy handling — notice within 5 banking days","ISBP 745 provides detailed document examination standards"]',
 '[{"section":"Article 2","description":"Definitions — credit, complying presentation, honour"},{"section":"Article 7-8","description":"Issuing bank and confirming bank undertaking"},{"section":"Article 14","description":"Standard for Examination of Documents — strict compliance"},{"section":"Article 16","description":"Discrepant Documents — refusal and notice requirements"},{"section":"Article 18","description":"Commercial Invoice — specific requirements"},{"section":"Article 19-25","description":"Transport Documents — by mode of transport"},{"section":"Article 28","description":"Insurance Document requirements"},{"section":"ISBP 745","description":"International Standard Banking Practice — detailed examination rules"}]',
 '["letter_of_credit","documentary_credit","commercial_invoice_lc","bill_of_lading_lc","insurance_certificate_lc","certificate_of_origin_lc","inspection_certificate_lc","draft_bill_of_exchange"]',
 '["international-document-authentication","letter-of-credit-document-examination","strict-compliance-validation"]',
 'International Chamber of Commerce', 'https://iccwbo.org/business-solutions/trade-finance/ucp-600/',
 0, NULL, NULL,
 '2007-07-01', NULL,
 'https://iccwbo.org/business-solutions/trade-finance/ucp-600/', 1, datetime('now'), datetime('now')),


-- ============================================================
-- SECTION 4: ANTI-MONEY LAUNDERING / FINANCIAL CRIME
-- ============================================================

-- FATF Recommendations
('std_ver_055', 'VERITAS-0', 'INTERNATIONAL', 'INTL',
 'FATF 40 Recommendations (Updated February 2023); FATF Methodology', 'FATF',
 'Financial Action Task Force — AML/CFT Document and Due Diligence Standards',
 'International standards for anti-money laundering (AML) and combating the financing of terrorism (CFT). FATF Recommendations define Customer Due Diligence (CDD) documentation requirements, Suspicious Activity Report (SAR) format, beneficial ownership documentation, and record-keeping standards. 206 countries committed to implementation. Documents used in financial transactions must demonstrate CDD compliance. KYC (Know Your Customer) documentation has specific content and verification requirements.',
 '["Customer Due Diligence (CDD) documentation — identity verification","Enhanced Due Diligence (EDD) for high-risk customers","Beneficial ownership identification and verification","Source of funds documentation","Source of wealth documentation","Suspicious Activity Report (SAR/STR) format and content","Record keeping — 5 year minimum retention","Correspondent banking due diligence documentation","Politically Exposed Person (PEP) screening documentation","Wire transfer originator/beneficiary information (Recommendation 16)","Trade-based money laundering red flag documentation","Virtual asset service provider (VASP) due diligence"]',
 '[{"section":"Recommendation 10","description":"Customer Due Diligence — when, what, how to verify"},{"section":"Recommendation 11","description":"Record Keeping — 5 years, available to authorities"},{"section":"Recommendation 13","description":"Correspondent Banking — enhanced due diligence"},{"section":"Recommendation 16","description":"Wire Transfers — originator and beneficiary information"},{"section":"Recommendation 20","description":"Suspicious Transaction Reporting"},{"section":"Recommendation 24-25","description":"Beneficial Ownership — transparency requirements"},{"section":"Recommendation 28","description":"Virtual Assets and VASPs"}]',
 '["kyc_documentation","cdd_record","sar_report","beneficial_ownership_declaration","source_of_funds","wire_transfer_record","correspondent_banking_agreement","pep_screening_record","transaction_monitoring_record"]',
 '["international-document-authentication","aml-document-validation","kyc-documentation-check","beneficial-ownership-verification"]',
 'Financial Action Task Force', 'https://www.fatf-gafi.org/',
 0, NULL, NULL,
 '1990-04-01', '2023-02-01',
 'https://www.fatf-gafi.org/en/recommendations.html', 1, datetime('now'), datetime('now')),

-- US BSA/AML Implementation
('std_ver_056', 'VERITAS-0', 'FEDERAL_STATUTE', 'US',
 '31 USC §§ 5311-5336 (Bank Secrecy Act); 31 CFR Chapter X; FinCEN CDD Rule', 'BSA/AML',
 'Bank Secrecy Act / FinCEN — AML Document and Reporting Standards',
 'US implementation of FATF standards through the Bank Secrecy Act. Requires specific document formats for Currency Transaction Reports (CTR — Form 104), Suspicious Activity Reports (SAR — Form 111), and the Customer Due Diligence Rule (beneficial ownership). The Corporate Transparency Act (effective 2024) adds Beneficial Ownership Information (BOI) reporting to FinCEN. Documents must contain specific FinCEN form numbers, filing institution identification, and transaction details.',
 '["Currency Transaction Report (CTR, FinCEN Form 104) — transactions over $10,000","Suspicious Activity Report (SAR, FinCEN Form 111) — suspicious transactions $5,000+","Customer Identification Program (CIP) documentation","Customer Due Diligence (CDD) — four pillars","Beneficial Ownership Information (BOI) — Corporate Transparency Act","OFAC sanctions screening documentation","314(a) information sharing requests","314(b) voluntary information sharing agreements","Record retention 5 years for CTRs, SARs; documents supporting identification","Foreign bank account reporting (FBAR, FinCEN Form 114)","Casino/gaming transaction reports","Money Services Business registration"]',
 '[{"section":"31 USC 5313","description":"CTR — currency transaction reporting requirement"},{"section":"31 USC 5318(g)","description":"SAR — suspicious activity reporting"},{"section":"31 CFR 1010.220","description":"CDD Rule — four pillar requirements"},{"section":"31 USC 5336","description":"Corporate Transparency Act — BOI reporting"},{"section":"31 CFR 1010.410","description":"Recordkeeping — funds transfer requirements"},{"section":"31 USC 5314","description":"FBAR — foreign bank account reporting"}]',
 '["ctr_form_104","sar_form_111","cdd_documentation","boi_report","fbar_form_114","cip_record","ofac_screening_record"]',
 '["financial-document-authentication","aml-document-validation","fincen-form-validation","boi-reporting-check"]',
 'Financial Crimes Enforcement Network (FinCEN)', 'https://www.fincen.gov/',
 1, '5 years', '{"statutory":"Civil: up to $1.1M per violation; Criminal: up to $500K and 10 years"}',
 '1970-10-26', '2024-01-01',
 'https://www.fincen.gov/', 1, datetime('now'), datetime('now')),


-- ============================================================
-- SECTION 5: INTERNATIONAL BANKING STANDARDS
-- ============================================================

-- Basel Committee Document Standards
('std_ver_057', 'VERITAS-0', 'INTERNATIONAL', 'INTL',
 'Basel III Framework (BCBS); Basel Committee on Banking Supervision Standards', 'Basel III/BCBS',
 'Basel Committee — International Banking Documentation Standards',
 'Basel Committee on Banking Supervision standards adopted by central banks in 28 jurisdictions. Defines documentation requirements for capital adequacy reporting, liquidity coverage, leverage ratios, and stress testing. Pillar 3 (Market Discipline) requires specific public disclosure documents with prescribed format and content. Banking documents claiming Basel compliance must reference specific BCBS standard numbers and demonstrate quantitative compliance with prescribed ratios.',
 '["Pillar 1: Capital adequacy calculation documentation","Pillar 2: Supervisory review process documentation","Pillar 3: Market discipline public disclosures","Common Equity Tier 1 (CET1) capital composition disclosure","Liquidity Coverage Ratio (LCR) disclosure","Net Stable Funding Ratio (NSFR) disclosure","Leverage ratio disclosure","Stress testing methodology and results documentation","Operational risk documentation","Credit risk model validation documentation","Counterparty credit risk documentation","Market risk reporting standards"]',
 '[{"section":"BCBS d424","description":"Basel III: Finalised post-crisis reforms (December 2017)"},{"section":"BCBS d432","description":"Pillar 3 disclosure requirements — updated framework"},{"section":"BCBS d457","description":"Stress testing principles"},{"section":"BCBS d295","description":"Liquidity Coverage Ratio disclosure standards"},{"section":"BCBS d468","description":"Cryptoasset exposure disclosure requirements"}]',
 '["capital_adequacy_report","pillar_3_disclosure","lcr_report","nsfr_report","leverage_ratio_report","stress_test_results","risk_model_validation","regulatory_capital_instrument"]',
 '["international-document-authentication","banking-regulatory-document-validation","basel-disclosure-format-check"]',
 'Basel Committee on Banking Supervision (BIS)', 'https://www.bis.org/bcbs/',
 0, NULL, NULL,
 '2010-12-16', '2024-01-01',
 'https://www.bis.org/bcbs/', 1, datetime('now'), datetime('now')),


-- ============================================================
-- SECTION 6: INTERNATIONAL NOTARIZATION & LEGALIZATION
-- ============================================================

-- International Notary Standards
('std_ver_058', 'VERITAS-0', 'INTERNATIONAL', 'INTL',
 'International Union of Notaries (UINL) Standards; Civil Law Notary Systems', 'UINL Notary',
 'International Notary Standards — Civil vs. Common Law Authentication',
 'International standards for notarization differ fundamentally between civil law and common law jurisdictions. Civil law notaries (Continental Europe, Latin America, Asia) are legal professionals who authenticate AND verify document content. Common law notaries (US, UK, Australia) primarily verify identity and witness signatures. Documents notarized in one system and presented in another must be understood in context. A civil law notarial act carries more evidentiary weight than a common law notarization. Apostille requirements vary based on the type of notarial act.',
 '["Civil law notarial act — content verification AND identity authentication","Common law notarization — identity verification and signature witnessing only","Notarial certificate format per jurisdiction","Notary identification (commission number, jurisdiction, expiration)","Seal/stamp requirements per jurisdiction","Journal/protocol entry requirements","Venue statement (location where notarization performed)","Document retention requirements (civil law: indefinite; common law: varies)","Remote online notarization (RON) standards per jurisdiction","Notarial protest (commercial paper)","Authentication chain for foreign notarizations"]',
 '[{"section":"UINL Principles","description":"Fundamental principles of notarial function"},{"section":"Civil Law","description":"Notary as public officer — content verification authority"},{"section":"Common Law","description":"Notary as witness — identity and signature verification"},{"section":"RON Standards","description":"Remote Online Notarization — technology and identity proofing"},{"section":"Authentication Chain","description":"Notary → Secretary of State → State Dept → Apostille/Authentication"}]',
 '["notarized_document","notarial_act","notarial_certificate","jurat","acknowledgment","copy_certification","protest","apostille_notarization"]',
 '["international-document-authentication","notary-standard-identification","authentication-chain-verification"]',
 'International Union of Notaries (UINL); National Notary Association', 'https://www.uinl.org/',
 0, NULL, NULL,
 NULL, NULL,
 'https://www.uinl.org/', 1, datetime('now'), datetime('now')),


-- ============================================================
-- SECTION 7: INTERNATIONAL HUMAN RIGHTS & COURT STANDARDS
-- ============================================================

-- International Court Document Standards
('std_ver_059', 'VERITAS-0', 'INTERNATIONAL', 'INTL',
 'ICJ Rules of Court; ICC Rules of Procedure and Evidence; ECHR Rules of Court', 'Intl Court Rules',
 'International Court Document Standards — ICJ, ICC, ECHR',
 'Document format and filing standards for international courts. The International Court of Justice (ICJ), International Criminal Court (ICC), and European Court of Human Rights (ECHR) each have specific rules for document format, filing, translation, authentication, and service. Documents filed in international proceedings must conform to the specific court rules including language requirements (ICJ: English/French; ICC: English/French with additional languages), page limits, and certification requirements.',
 '["ICJ: English and French as official languages — filings in one, translation to other","ICC: English and French working languages — 6 official languages","ECHR: English and French official — 46 member state languages for applications","Page limits and formatting requirements per court","Certification of translations","Authentication of documentary evidence","Filing deadlines and extension procedures","Representation requirements (state agents for ICJ, counsel for ICC)","Victim participation documentation (ICC)","Admissibility documentation requirements","Exhaustion of domestic remedies evidence (ECHR)"]',
 '[{"section":"ICJ Rules Art. 43-56","description":"Written Proceedings — memorials, counter-memorials, format"},{"section":"ICC RPE Rules 34-40","description":"Filing requirements — format, languages, certification"},{"section":"ECHR Rules 36-47","description":"Applications — form, content, admissibility"},{"section":"ICC RPE Rule 68","description":"Prior Recorded Testimony — authentication requirements"},{"section":"ECHR Rule 47","description":"Application form — mandatory fields for admissibility"}]',
 '["icj_memorial","icc_filing","echr_application","international_judgment","international_arrest_warrant","victims_participation_form","international_evidence_submission"]',
 '["international-document-authentication","international-court-filing-validation","translation-certification-check"]',
 'International Court of Justice; International Criminal Court; European Court of Human Rights', NULL,
 0, NULL, NULL,
 NULL, NULL,
 NULL, 1, datetime('now'), datetime('now')),

-- UN Human Rights Treaty Body Document Standards
('std_ver_060', 'VERITAS-0', 'INTERNATIONAL', 'INTL',
 'UN Human Rights Treaty Body Reporting Guidelines (HRI/GEN/2/Rev.6)', 'UN Treaty Body',
 'UN Human Rights Treaty Body — State Reporting and Individual Complaint Standards',
 'Standards for documents submitted to UN human rights treaty bodies (CCPR, CESCR, CERD, CEDAW, CAT, CRC, etc.). State reports must follow the Common Core Document format (HRI/CORE) plus treaty-specific reporting guidelines. Individual complaints under Optional Protocols must follow prescribed format including exhaustion of domestic remedies documentation, timeline of events, and specific treaty articles violated. Documents claiming UN human rights relevance must conform to these reporting frameworks.',
 '["Common Core Document format (HRI/CORE) — baseline for all treaty reports","Treaty-specific reporting guidelines per committee","Individual complaint format under Optional Protocols","Exhaustion of domestic remedies documentation","Timeline of events and alleged violations","Specific treaty articles cited","State response documentation format","Committee concluding observations format","Follow-up procedure documentation","Interim measures requests","Word limits per document type","Translation and working language requirements"]',
 '[{"section":"HRI/GEN/2/Rev.6","description":"Compilation of guidelines — all treaty bodies"},{"section":"CCPR/C/153","description":"Guidelines for ICCPR state reports"},{"section":"Optional Protocol Art. 1-5","description":"Individual complaint procedure — admissibility and format"},{"section":"Follow-up procedures","description":"Implementation monitoring documentation"}]',
 '["state_party_report","individual_complaint","committee_concluding_observations","follow_up_report","common_core_document","treaty_body_decision","interim_measures_request"]',
 '["international-document-authentication","un-treaty-body-format-check","human-rights-documentation-validation"]',
 'UN Office of the High Commissioner for Human Rights', 'https://www.ohchr.org/en/treaty-bodies',
 0, NULL, NULL,
 NULL, NULL,
 'https://www.ohchr.org/en/treaty-bodies', 1, datetime('now'), datetime('now')),


-- ============================================================
-- SECTION 8: INTERNATIONAL INFORMATION SECURITY
-- ============================================================

-- ISO/IEC 27001 — Information Security Management
('std_arc_032', 'ARCHIVIST-0', 'INTERNATIONAL', 'INTL',
 'ISO/IEC 27001:2022; ISO/IEC 27002:2022', 'ISO 27001',
 'ISO 27001 — Information Security Management System Document Standards',
 'International standard for establishing, implementing, maintaining, and continually improving an Information Security Management System (ISMS). Defines documentation requirements for security policies, risk assessments, statements of applicability, and audit reports. Organizations claiming ISO 27001 certification must produce specific documents with mandated content. Certification audits verify document compliance. ISO 27001 certification is increasingly required for B2B and government contracts internationally.',
 '["ISMS scope document","Information security policy","Risk assessment methodology and results","Risk treatment plan","Statement of Applicability (SoA) — 93 controls from Annex A","Information security objectives","Competence evidence (training records)","Documented operating procedures","Internal audit program and results","Management review minutes","Corrective action records","Incident management records","Business continuity plans","Asset inventory and classification","Access control policy and records"]',
 '[{"section":"Clause 4","description":"Context of the organization — scope, interested parties"},{"section":"Clause 5","description":"Leadership — policy, roles, responsibilities"},{"section":"Clause 6","description":"Planning — risk assessment, risk treatment, objectives"},{"section":"Clause 7","description":"Support — resources, competence, awareness, communication, documented information"},{"section":"Clause 8","description":"Operation — risk assessment implementation, risk treatment"},{"section":"Clause 9","description":"Performance evaluation — monitoring, internal audit, management review"},{"section":"Clause 10","description":"Improvement — nonconformity, corrective action, continual improvement"},{"section":"Annex A","description":"93 reference controls (organizational, people, physical, technological)"}]',
 '["isms_scope","security_policy","risk_assessment","risk_treatment_plan","statement_of_applicability","audit_report","management_review","incident_report","business_continuity_plan","certification_document"]',
 '["document-type-identification","security-documentation-authentication","iso27001-compliance-verification"]',
 'ISO/IEC JTC 1/SC 27', 'https://www.iso.org/standard/27001',
 0, NULL, NULL,
 '2005-10-15', '2022-10-25',
 'https://www.iso.org/standard/27001', 1, datetime('now'), datetime('now'));


-- ============================================================
-- SECTION 9: CROSS-REFERENCES
-- ============================================================

-- Hague Apostille ↔ State Dept Authentication (seed 028)
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_intl_001', 'std_ver_050', 'std_arc_008', 'IMPLEMENTS', 'Hague Apostille Convention implemented in US by State Department Office of Authentications.', datetime('now'));

-- Hague Service ↔ Hague Evidence
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_intl_002', 'std_ver_051', 'std_ver_052', 'SUPPLEMENTS', 'Service Convention handles document delivery; Evidence Convention handles evidence gathering. Both needed for international litigation.', datetime('now'));

-- ICAO 9303 ↔ ISO 7810/7816
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_intl_003', 'std_arc_030', 'std_arc_031', 'REQUIRES', 'ICAO Doc 9303 travel documents must conform to ISO 7810 physical card specifications.', datetime('now'));

-- FATF ↔ BSA/AML
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_intl_004', 'std_ver_055', 'std_ver_056', 'IMPLEMENTS', 'US Bank Secrecy Act implements FATF Recommendations for the United States.', datetime('now'));

-- UCP 600 ↔ UN/CEFACT Trade
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_intl_005', 'std_ver_054', 'std_ver_053', 'SUPPLEMENTS', 'UCP 600 governs how banks examine trade documents; UN/CEFACT defines the format of those trade documents.', datetime('now'));

-- ISO 27001 ↔ NIST SP 800-63-4 (seed 028)
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_intl_006', 'std_arc_032', 'std_arc_005', 'REFERENCES', 'ISO 27001 information security controls reference NIST identity proofing standards for access control implementation.', datetime('now'));

-- ISO 27001 ↔ ISO 16363 (seed 028)
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_intl_007', 'std_arc_032', 'std_arc_004', 'SUPPLEMENTS', 'ISO 27001 provides the security framework; ISO 16363 provides the repository trust framework. Both needed for trustworthy digital archives.', datetime('now'));

-- Hague Apostille ↔ FRE 901/902 (seed 028)
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_intl_008', 'std_ver_050', 'std_arc_010', 'SUPPLEMENTS', 'Apostilled foreign public documents may qualify as self-authenticating under FRE 902(3) — foreign public documents with attestation.', datetime('now'));

-- FATF ↔ ECOA/Reg B (seed 030)
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_intl_009', 'std_ver_055', 'std_ver_024', 'REFERENCES', 'FATF CDD requirements intersect with ECOA — adverse action based on CDD findings must still comply with ECOA notice requirements.', datetime('now'));

-- International Courts ↔ Hague Service
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_intl_010', 'std_ver_059', 'std_ver_051', 'REFERENCES', 'International court proceedings may require Hague Service Convention compliance for serving parties in member states.', datetime('now'));

-- ICAO ↔ NIST 800-63-4 (seed 028)
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_intl_011', 'std_arc_030', 'std_arc_005', 'REFERENCES', 'ICAO biometric standards for travel documents intersect with NIST digital identity proofing — both address identity verification but at different assurance levels.', datetime('now'));

-- Basel ↔ BSA/AML
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_intl_012', 'std_ver_057', 'std_ver_056', 'SUPPLEMENTS', 'Basel III capital and risk management framework supplemented by BSA/AML transaction monitoring and reporting requirements.', datetime('now'));

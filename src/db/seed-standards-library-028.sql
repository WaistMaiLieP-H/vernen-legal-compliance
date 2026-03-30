-- ============================================================
-- SEED 028: ARCHIVIST-0 & VERITAS-0 — Document Forensics Framework
-- Citizens: ARCHIVIST-0 (Document Identification & Classification)
--           VERITAS-0 (Document Authentication & Forensic Audit)
-- Created: 2026-03-18
-- Purpose: Foundational document forensics capability — every document
--          audited against its own standards of creation, not just
--          regulatory compliance.
-- ============================================================

-- ============================================================
-- SECTION 1: NEW PERSONA CITIZENS
-- ============================================================

INSERT OR IGNORE INTO persona_citizens (id, name, trademark, domain, description, status, conceived_at) VALUES
  ('pc-archivist-0', 'ARCHIVIST-0', 'ARCHIVIST-0™', 'Document Identification & Classification',
   'Document intake specialist. Identifies document type, issuing authority, governing standards of creation, and routes to domain-specific authentication Citizens. The first touch on every document entering the platform.',
   'CONCEIVED', '2026-03-18'),
  ('pc-veritas-0', 'VERITAS-0', 'VERITAS-0™', 'Document Authentication & Forensic Audit',
   'Document authentication and forensic audit engine. Validates documents across 10 audit layers: authenticity, integrity, provenance, internal consistency, cross-document consistency, regulatory compliance, evidentiary admissibility, narrative coherence, terminology precision, and responsive completeness. Latin for truth.',
   'CONCEIVED', '2026-03-18');


-- ============================================================
-- SECTION 2: ARCHIVIST-0 GOVERNING STANDARDS
-- Document Creation, Formatting, Lifecycle, and Repository Standards
-- These are the "standards of creation" — how documents must be
-- built, formatted, stored, and authenticated.
-- ============================================================

-- ------------------------------------
-- 2A: TYPOGRAPHIC & LINGUISTIC STANDARDS
-- ------------------------------------

INSERT OR IGNORE INTO governing_standards
  (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title,
   description, requirements, key_sections, document_types, skill_slugs,
   enforcement_body, enforcement_url, private_right_of_action,
   statute_of_limitations, damages_available, effective_date, last_amended,
   source_url, is_active, created_at, updated_at)
VALUES

-- GPO Style Manual
('std_arc_001', 'ARCHIVIST-0', 'AGENCY_STANDARD', 'US',
 'GPO Style Manual, 2016 Edition', 'GPO Style Manual',
 'U.S. Government Publishing Office Style Manual',
 'The definitive typographic and linguistic standard for all federal government publications and correspondence. Mandates rules for capitalization, abbreviation protocols, compound word hyphenation, punctuation, number formatting, and tabular work. Deviations from GPO typography in a document claiming federal origin are structural anomalies indicating possible forgery or unofficial recreation.',
 '["Capitalization rules for federal titles, offices, and proper nouns (Ch. 3)","Abbreviation protocols including agency acronym standards (Ch. 9)","Compound word hyphenation rules (Ch. 6)","Punctuation standards including semicolon usage with conjunctive adverbs (Ch. 8)","Number and date formatting conventions (Ch. 12)","Tabular work formatting requirements (Ch. 13)","Italic and bold usage standards (Ch. 2)","Spelling preferences and word division rules (Ch. 5)"]',
 '[{"section":"Chapter 2","description":"General Instructions — type styles, format, emphasis"},{"section":"Chapter 3","description":"Capitalization Rules — titles, organizations, geographic terms"},{"section":"Chapter 5","description":"Spelling — preferred forms, word division"},{"section":"Chapter 6","description":"Compounding Rules — hyphenation, unit modifiers"},{"section":"Chapter 8","description":"Punctuation — comma, semicolon, colon, period usage"},{"section":"Chapter 9","description":"Abbreviations and Letter Symbols"},{"section":"Chapter 12","description":"Numerals — figures vs. words, dates, money, percentages"},{"section":"Chapter 13","description":"Tabular Work — table formatting, alignment"}]',
 '["federal_correspondence","federal_regulation","federal_notice","congressional_document","executive_order","agency_report","federal_form"]',
 '["document-type-identification","federal-document-authentication","typography-validation"]',
 'U.S. Government Publishing Office', 'https://www.govinfo.gov/gpo-style-manual',
 0, NULL, NULL,
 '2016-01-01', '2016-01-01',
 'https://www.govinfo.gov/gpo-style-manual', 1, datetime('now'), datetime('now')),

-- Document Drafting Handbook (DDH)
('std_arc_002', 'ARCHIVIST-0', 'AGENCY_STANDARD', 'US',
 'OFR Document Drafting Handbook, 2018 Edition (Rev. 2.2)', 'DDH',
 'Office of the Federal Register Document Drafting Handbook',
 'The structural blueprint for every federal legal notice, rule, proposed regulation, and executive document. Mandates exact requirements for margins, font-matching, preamble structures, signature block positioning, amendatory instruction format, and the specific must/shall language allowed. New mandates for digital transmissions effective June 9, 2025. Documents using outdated preamble structures or deprecated formatting conventions are immediate red flags.',
 '["Precise margin requirements for Federal Register documents","Mandatory preamble structure (AGENCY, ACTION, SUMMARY, DATES, ADDRESSES, FOR FURTHER INFORMATION CONTACT, SUPPLEMENTARY INFORMATION)","Signature block positioning and content requirements","Amendatory instruction format and language","Must/shall/may language usage rules","Header hierarchy requirements","CFR reference formatting","Effective date and comment period formatting","Digital transmission requirements (effective June 9, 2025)"]',
 '[{"section":"Chapter 1","description":"General Instructions — document types and format"},{"section":"Chapter 2","description":"Preamble Requirements — mandatory sections and order"},{"section":"Chapter 3","description":"Regulatory Text — amendatory instructions"},{"section":"Chapter 4","description":"Notices — format and content requirements"},{"section":"Chapter 5","description":"Presidential Documents — executive order format"},{"section":"Chapter 6","description":"Tables and Graphics — inclusion standards"},{"section":"Appendix A","description":"Sample Documents — specimen templates"}]',
 '["federal_regulation","federal_notice","proposed_rule","final_rule","executive_order","presidential_proclamation","agency_guidance"]',
 '["document-type-identification","federal-document-authentication","structural-blueprint-validation"]',
 'Office of the Federal Register', 'https://www.archives.gov/federal-register/write/ddh',
 0, NULL, NULL,
 '2018-01-01', '2025-06-09',
 'https://www.archives.gov/federal-register/write/ddh', 1, datetime('now'), datetime('now')),

-- ------------------------------------
-- 2B: DIGITAL LIFECYCLE & RECORDS MANAGEMENT
-- ------------------------------------

-- NARA Universal ERM Requirements
('std_arc_003', 'ARCHIVIST-0', 'AGENCY_STANDARD', 'US',
 'NARA Universal ERM Requirements, Version 3 (2023-2025)', 'NARA ERM v3',
 'National Archives Universal Electronic Records Management Requirements',
 'Defines how a digital record must be legally created, captured, managed, and preserved to be legally defensible. Contains 105 distinct metrics for Digital Object Management including metadata requirements, transfer formats, and disposal protocols. Records lacking mandatory lifecycle markers have a broken chain of custody and are forensically suspect.',
 '["105 distinct metrics for Digital Object Management","Mandatory metadata fields for valid electronic records","Record capture requirements at point of creation","Transfer format specifications","Disposal and retention scheduling protocols","Chain of custody documentation requirements","Digital signature and authentication requirements","Migration and conversion standards","Access control and security marking requirements"]',
 '[{"section":"Section 1","description":"Record Capture — creation and capture requirements"},{"section":"Section 2","description":"Record Management — metadata, classification, retention"},{"section":"Section 3","description":"Record Preservation — migration, format, integrity"},{"section":"Section 4","description":"Record Disposal — scheduling, authorization, documentation"},{"section":"Section 5","description":"Digital Object Management — 105 metrics"}]',
 '["electronic_record","digital_document","federal_record","agency_correspondence","digital_archive"]',
 '["document-lifecycle-validation","metadata-integrity-check","chain-of-custody-verification"]',
 'National Archives and Records Administration', 'https://www.archives.gov/records-mgmt/policy/universalermrequirements',
 0, NULL, NULL,
 '2023-01-01', '2025-01-01',
 'https://www.archives.gov/records-mgmt/policy/universalermrequirements', 1, datetime('now'), datetime('now')),

-- ------------------------------------
-- 2C: TRUSTWORTHY REPOSITORY STANDARD
-- ------------------------------------

-- ISO 16363
('std_arc_004', 'ARCHIVIST-0', 'INTERNATIONAL', 'US',
 'ISO 16363:2012 (Updated 2025)', 'ISO 16363',
 'Audit and Certification of Trustworthy Digital Repositories',
 'International standard for certifying digital repositories as trustworthy. Contains six new metrics added in 2025 regarding Preservation Objectives and technical risk management. GovInfo.gov is currently the ONLY ISO 16363 certified repository in the world. Any document claiming to be a Golden Record from a source not meeting these metrics is forensically suspect. Documents sourced from non-certified repositories require additional provenance verification.',
 '["Organizational infrastructure requirements","Digital object management requirements","Infrastructure and security risk management","Preservation objectives and strategy","Technical infrastructure requirements","2025 update: six new Preservation Objectives metrics","2025 update: technical risk management metrics","Repository audit and certification process"]',
 '[{"section":"Section 3","description":"Organizational Infrastructure — governance, staffing, sustainability"},{"section":"Section 4","description":"Digital Object Management — ingest, storage, access"},{"section":"Section 5","description":"Infrastructure and Security Risk Management — technical controls"},{"section":"2025 Update","description":"Six new Preservation Objectives and risk metrics"}]',
 '["digital_archive","government_publication","authenticated_document","golden_record"]',
 '["repository-trust-verification","source-authentication","provenance-assessment"]',
 'ISO/TC 20/SC 13', 'https://www.iso.org/standard/56510.html',
 0, NULL, NULL,
 '2012-02-15', '2025-01-01',
 'https://www.iso.org/standard/56510.html', 1, datetime('now'), datetime('now')),

-- ------------------------------------
-- 2D: DIGITAL IDENTITY & PROOFING
-- ------------------------------------

-- NIST SP 800-63-4
('std_arc_005', 'ARCHIVIST-0', 'AGENCY_STANDARD', 'US',
 'NIST SP 800-63 Revision 4 (July 2025)', 'NIST SP 800-63-4',
 'NIST Digital Identity Guidelines',
 'Federal standard for digital identity proofing and authentication. Revision 4 finalized July 2025 includes specific requirements for IAL2 (Remote/In-person) and IAL3 (Physical Presence) identity proofing, plus new controls for detecting deepfakes and forged media. Validates whether the method of document creation (e.g., remote notary session, e-signature) met federal security standards at the time of signing.',
 '["IAL1 identity proofing requirements (self-asserted)","IAL2 identity proofing requirements (remote or in-person verification)","IAL3 identity proofing requirements (physical presence, supervised)","AAL1/AAL2/AAL3 authenticator requirements","FAL1/FAL2/FAL3 federation assurance levels","New deepfake and forged media detection controls (Rev 4)","Biometric collection and comparison requirements","Identity evidence quality requirements","Remote notary and e-signature validation"]',
 '[{"section":"SP 800-63A","description":"Enrollment and Identity Proofing — IAL levels"},{"section":"SP 800-63B","description":"Authentication and Lifecycle Management — AAL levels"},{"section":"SP 800-63C","description":"Federation and Assertions — FAL levels"},{"section":"Rev 4 Supplement","description":"Deepfake detection and forged media controls"}]',
 '["notarized_document","e_signed_document","identity_verification","remote_notary","digital_signature"]',
 '["identity-proofing-validation","signature-authentication","notary-verification"]',
 'National Institute of Standards and Technology', 'https://pages.nist.gov/800-63-4/',
 0, NULL, NULL,
 '2025-07-01', '2025-07-01',
 'https://pages.nist.gov/800-63-4/', 1, datetime('now'), datetime('now')),

-- ------------------------------------
-- 2E: DIGITAL STRUCTURE & ACCESSIBILITY
-- ------------------------------------

-- Section 508
('std_arc_006', 'ARCHIVIST-0', 'FEDERAL_STATUTE', 'US',
 '29 USC § 794d; 36 CFR Part 1194', 'Section 508',
 'Section 508 of the Rehabilitation Act — Electronic Document Accessibility',
 'Every official public federal document must comply with Section 508. Requires hidden structural tags, specific PDF/A (Archival) formats, and accessible text layers. If a government document is sent as a flat image PDF without any 508-compliant underlying text layer or structural tags, it is a HIGH-RISK indicator of forgery or unofficial re-creation. Authentic federal documents produced after 2001 must have accessible structure.',
 '["PDF/A archival format requirements","Structural tagging (headings, lists, tables)","Alt text for images and graphics","Reading order specification","Color contrast requirements","Font embedding requirements","Text layer presence (not flat image)","Metadata fields (title, author, language)","Bookmarks for documents over 9 pages"]',
 '[{"section":"29 USC § 794d","description":"Section 508 statutory requirement"},{"section":"36 CFR 1194","description":"Information and Communication Technology Standards"},{"section":"WCAG 2.1 AA","description":"Web Content Accessibility Guidelines (incorporated by reference)"},{"section":"PDF/UA","description":"Universal Accessibility standard for PDF documents"}]',
 '["federal_document","government_form","agency_report","federal_correspondence","digital_publication"]',
 '["digital-structure-validation","pdf-integrity-check","accessibility-compliance"]',
 'U.S. Access Board; GSA', 'https://www.section508.gov/',
 1, '2 years', '{"actual":true,"injunctive":true}',
 '2001-06-25', '2018-01-18',
 'https://www.section508.gov/', 1, datetime('now'), datetime('now')),

-- ------------------------------------
-- 2F: AUTHENTICATED REPOSITORY
-- ------------------------------------

-- GovInfo/GPO Authentication
('std_arc_007', 'ARCHIVIST-0', 'AGENCY_STANDARD', 'US',
 'GPO GovInfo Authentication Program; 44 USC § 4101', 'GovInfo Auth',
 'GovInfo Authenticated Document Program — Cryptographic Verification',
 'The U.S. Government Publishing Office operates govinfo.gov as the one-stop site for authentic, digitally signed PDF documents. ISO 16363 certified as a trustworthy digital repository. PDFs downloaded from GovInfo contain cryptographic signatures verifying the document has not been altered since publication. The Catalog of U.S. Government Publications (CGP) provides metadata for every document in the National Collection. Documents can be compared against GovInfo golden copies for forensic verification.',
 '["Cryptographic digital signatures on authenticated PDFs","ISO 16363 certified trustworthy repository","Catalog of Government Publications (CGP) metadata","Permanent public access to government information","Digital signature verification via GPO certificate chain","Document versioning and amendment tracking","XML and PDF format availability","MODS metadata standard for bibliographic records"]',
 '[{"section":"44 USC § 4101","description":"Federal Depository Library Program — authentication mandate"},{"section":"GovInfo Authentication","description":"Cryptographic signature program and verification"},{"section":"CGP","description":"Catalog of Government Publications — metadata registry"},{"section":"MODS","description":"Metadata Object Description Schema for bibliographic records"}]',
 '["federal_regulation","federal_statute","congressional_record","federal_register","court_opinion","treaty","executive_order"]',
 '["golden-copy-comparison","cryptographic-verification","repository-source-validation"]',
 'U.S. Government Publishing Office', 'https://www.govinfo.gov/about#702',
 0, NULL, NULL,
 '2009-01-01', '2025-01-01',
 'https://www.govinfo.gov/', 1, datetime('now'), datetime('now')),

-- ------------------------------------
-- 2G: PHYSICAL AUTHENTICATION STANDARDS
-- ------------------------------------

-- State Dept Authentications & Apostilles
('std_arc_008', 'ARCHIVIST-0', 'AGENCY_STANDARD', 'US',
 'Hague Convention Apostille; 22 CFR Part 131', 'Apostille/Authentication',
 'U.S. Department of State Office of Authentications — Document Authentication Standards',
 'Maintains the standards for what constitutes a true and correct copy of high-stakes documents (court orders, contracts, vital records). Defines the physical markers (seals, ribbons, stamps) required for international document recognition under the Hague Convention. CA-DARTS (Document Authentication Review Tracking System) principles define how signatures and seals are verified on submitted paperwork.',
 '["Apostille format and content requirements (Hague Convention)","Authentication certificate format for non-Hague countries","Seal verification requirements","Signature verification chain (local → state → federal)","Physical markers: seals, ribbons, embossments, stamps","Chain of authentication documentation","CA-DARTS verification principles","Notary acknowledgment requirements"]',
 '[{"section":"Hague Convention Art. 3-6","description":"Apostille requirements — form, content, effect"},{"section":"22 CFR 131","description":"Authentication of Documents — federal requirements"},{"section":"CA-DARTS","description":"Document Authentication Review Tracking System — verification process"}]',
 '["court_order","vital_record","notarized_document","international_document","certified_copy","contract"]',
 '["physical-authentication-verification","seal-validation","apostille-verification"]',
 'U.S. Department of State Office of Authentications', 'https://travel.state.gov/content/travel/en/records-and-authentications.html',
 0, NULL, NULL,
 NULL, NULL,
 'https://travel.state.gov/content/travel/en/records-and-authentications.html', 1, datetime('now'), datetime('now')),

-- ------------------------------------
-- 2H: SENSITIVE INFORMATION MARKINGS
-- ------------------------------------

-- NIST SP 800-122 / OMB M-17-12 — PII Handling
('std_arc_009', 'ARCHIVIST-0', 'AGENCY_STANDARD', 'US',
 'NIST SP 800-122; OMB M-17-12; 32 CFR Part 2002 (CUI)', 'PII/CUI Marking',
 'Sensitive Information and Controlled Unclassified Information Marking Standards',
 'Federal standards for marking documents containing Personally Identifiable Information (PII) and Controlled Unclassified Information (CUI). SPII FR // EXTERNAL markings, CUI banners, and distribution statements must be consistent, present, and correctly formatted. Doubled markings indicate production system errors. Missing markings on PII-containing documents violate federal handling requirements. Inconsistent markings across a correspondence series indicate multiple production systems or document manipulation.',
 '["CUI banner marking requirements (32 CFR 2002)","SPII marking format and placement","Distribution statement requirements","Portion marking requirements","Decontrol and destruction marking","Marking consistency within correspondence series","Production system integrity indicators","PII identification and categorization"]',
 '[{"section":"NIST SP 800-122","description":"Guide to Protecting PII Confidentiality"},{"section":"OMB M-17-12","description":"Preparing for and Responding to a Breach of PII"},{"section":"32 CFR 2002","description":"Controlled Unclassified Information Program"},{"section":"CUI Registry","description":"NARA CUI category and marking guide"}]',
 '["federal_correspondence","agency_report","personnel_record","financial_record","medical_record","law_enforcement_record"]',
 '["classification-marking-validation","pii-handling-verification","cui-compliance-check"]',
 'NARA Information Security Oversight Office', 'https://www.archives.gov/cui',
 0, NULL, NULL,
 '2016-11-14', '2024-01-01',
 'https://www.archives.gov/cui', 1, datetime('now'), datetime('now')),

-- ------------------------------------
-- 2I: EVIDENTIARY STANDARDS
-- ------------------------------------

-- Federal Rules of Evidence 901/902
('std_arc_010', 'ARCHIVIST-0', 'COURT_RULE', 'US',
 'FRE 901-903; 28 USC § 1731-1741', 'FRE 901/902',
 'Federal Rules of Evidence — Document Authentication and Self-Authentication',
 'Federal evidentiary standards for document authentication in court. FRE 901 requires evidence sufficient to support a finding that the item is what the proponent claims it is. FRE 902 lists categories of self-authenticating documents (domestic public documents under seal, certified copies, official publications, newspapers, etc.). Documents lacking proper seal AND signature of authorized officer may not be self-authenticating. Government correspondence signed only by department name without individual signatory may require extrinsic evidence for authentication.',
 '["FRE 901(a): Authentication requirement — evidence sufficient to support finding","FRE 901(b)(1): Testimony of witness with knowledge","FRE 901(b)(4): Distinctive characteristics","FRE 901(b)(7): Public records — from office where items of this kind are kept","FRE 902(1): Domestic public documents under seal — requires seal AND signature","FRE 902(2): Domestic public documents not under seal — requires certification","FRE 902(4): Certified copies of public records","FRE 902(5): Official publications — books, pamphlets, purporting to be issued by authority","FRE 903: Subscribing witness testimony not necessary"]',
 '[{"section":"FRE 901","description":"Authenticating or Identifying Evidence — general requirement and examples"},{"section":"FRE 902","description":"Evidence That Is Self-Authenticating — 13 categories"},{"section":"FRE 903","description":"Subscribing Witness Testimony"},{"section":"28 USC 1731-1741","description":"Documentary Evidence statutory provisions"}]',
 '["court_order","government_correspondence","certified_copy","official_publication","business_record","public_record"]',
 '["evidentiary-admissibility-assessment","self-authentication-check","seal-and-signature-verification"]',
 'Federal Judiciary', 'https://www.law.cornell.edu/rules/fre/rule_901',
 0, NULL, NULL,
 '1975-01-02', '2017-12-01',
 'https://www.law.cornell.edu/rules/fre', 1, datetime('now'), datetime('now')),

-- Plain Writing Act
('std_arc_011', 'ARCHIVIST-0', 'FEDERAL_STATUTE', 'US',
 '5 USC § 301 note (Plain Writing Act of 2010)', 'Plain Writing Act',
 'Plain Writing Act of 2010 — Federal Communication Clarity Standards',
 'Requires federal agencies to use clear Government communication that the public can understand and use. Documents using vague language, undefined terms, or passive constructions that obscure meaning violate this standard. Agency correspondence that says information does not match without specifying WHAT information fails the clarity requirement. Applies to all new or substantially revised documents.',
 '["Clear and concise language requirement","Defined terms for technical/legal concepts","Active voice preference","Logical organization and structure","Audience-appropriate language level","Specific and actionable information","Avoidance of jargon without definition","Short sentences and paragraphs"]',
 '[{"section":"Sec. 2","description":"Purpose — improve effectiveness and accountability"},{"section":"Sec. 3","description":"Definitions — covered document types"},{"section":"Sec. 4","description":"Agency responsibilities — senior official designation"},{"section":"Sec. 5","description":"Compliance — plain writing guidelines implementation"}]',
 '["federal_correspondence","agency_notice","federal_form","agency_guidance","consumer_disclosure"]',
 '["terminology-precision-audit","narrative-coherence-check","responsive-completeness-audit"]',
 'Office of Management and Budget', 'https://www.plainlanguage.gov/',
 0, NULL, NULL,
 '2010-10-13', NULL,
 'https://www.plainlanguage.gov/', 1, datetime('now'), datetime('now')),

-- USPS Publication 28
('std_arc_012', 'ARCHIVIST-0', 'AGENCY_STANDARD', 'US',
 'USPS Publication 28 (Postal Addressing Standards)', 'USPS Pub 28',
 'USPS Postal Addressing Standards',
 'Defines the standard format for addresses on mail and in correspondence. Includes city/state formatting, ZIP+4 requirements, abbreviation standards, and punctuation rules. Address formatting inconsistencies within a correspondence series (e.g., mixing full state names with abbreviations, inconsistent ZIP+4 usage, misspelled city names) indicate multiple production systems, document manipulation, or quality control failures.',
 '["Delivery address line formatting","City, State, ZIP Code format standards","ZIP+4 usage requirements","Two-letter state abbreviation standard","Address element punctuation rules","Apartment/suite/unit designation standards","Address consistency within correspondence series"]',
 '[{"section":"Section 2","description":"Delivery Address Standards"},{"section":"Section 3","description":"City, State, ZIP Code Standards"},{"section":"Appendix B","description":"Two-Letter State and Territory Abbreviations"}]',
 '["correspondence","mailing","business_letter","government_correspondence","legal_notice"]',
 '["address-formatting-validation","correspondence-consistency-check"]',
 'United States Postal Service', 'https://pe.usps.com/text/pub28/welcome.htm',
 0, NULL, NULL,
 NULL, NULL,
 'https://pe.usps.com/text/pub28/welcome.htm', 1, datetime('now'), datetime('now')),


-- ============================================================
-- SECTION 3: VERITAS-0 GOVERNING STANDARDS
-- Domain-Specific Document Authentication Standards
-- ============================================================

-- ------------------------------------
-- 3A: AUTO SALES DOCUMENT STANDARDS
-- ------------------------------------

-- FTC Buyers Guide
('std_ver_001', 'VERITAS-0', 'FEDERAL_REGULATION', 'US',
 '16 CFR Part 455 (FTC Used Motor Vehicle Trade Regulation Rule)', 'FTC Buyers Guide',
 'FTC Used Car Buyers Guide — Mandatory Format and Content',
 'Federal Trade Commission rule requiring used car dealers to display a Buyers Guide on every used vehicle offered for sale. Specifies exact format: must be at least 11x7.5 inches, displayed prominently on vehicle, contain specific warranty/AS-IS disclosures, list of major defects, and complaint mechanism. Guide becomes part of the sales contract. Removing the guide before consumer purchase (except for test drives) violates federal law (16 CFR 455). Guide MUST match the vehicle on which it is displayed — a Buyers Guide for a different VIN is a federal violation.',
 '["Minimum size 11 x 7.5 inches","AS IS - NO DEALER WARRANTY or WARRANTY disclosure (checkbox)","Systems Covered / Duration section for warranties","List of major defects that may occur in used motor vehicles","Spanish translation required if negotiation in Spanish","Must be displayed prominently on vehicle","Becomes part of sales contract upon purchase","Complaint mechanism with dealer name, address, phone","VIN must match the vehicle displayed on","Cannot be removed before purchase except for test drive"]',
 '[{"section":"16 CFR 455.1","description":"General duty to display Buyers Guide"},{"section":"16 CFR 455.2","description":"Consumer sales — required disclosures"},{"section":"16 CFR 455.3","description":"Window form — format and content requirements"},{"section":"16 CFR 455.4","description":"Unfair or deceptive acts or practices"},{"section":"16 CFR 455.5","description":"Spanish language form"}]',
 '["buyers_guide","used_vehicle_sale","dealer_disclosure","auto_sale_document"]',
 '["auto-sale-document-authentication","buyers-guide-validation","vin-cross-reference"]',
 'Federal Trade Commission', 'https://www.ftc.gov/legal-library/browse/rules/used-motor-vehicle-trade-regulation-rule',
 1, '3 years', '{"actual":true,"statutory":"$50,120 per violation (2024 adjusted)","injunctive":true}',
 '1985-01-01', '2024-01-09',
 'https://www.ftc.gov/legal-library/browse/rules/used-motor-vehicle-trade-regulation-rule', 1, datetime('now'), datetime('now')),

-- CA Vehicle Code — Dealer Requirements
('std_ver_002', 'VERITAS-0', 'STATE_STATUTE', 'CA',
 'CA Vehicle Code §§ 4456, 5600, 5901, 11709.2, 11713, 11713.1, 11713.18, 11713.21, 11713.26', 'CA VEH Dealer',
 'California Vehicle Code — Used Car Dealer Document Requirements',
 'Comprehensive California dealer disclosure and documentation requirements for used vehicle sales. Mandates specific forms (REG 51 Report of Sale, REG 262 Transfer), conditional sale disclosures, 2-Day Contract Cancellation Option, NMVTIS vehicle history, prior use disclosure, new/used designation, temporary plates, and certified vehicle inspection reports. Each form has mandatory fields, formats, and signature requirements defined by DMV.',
 '["REG 51 Report of Sale (VEH 4456/5901)","REG 262 Transfer/Reassignment (VEH 5600)","2-Day Contract Cancellation Option Agreement (VEH 11713.21) — sunsets 10/1/2026","NMVTIS Vehicle History Report + Warning placard for salvage/junk (VEH 11713.26)","No Cooling-Off Period posted notice (VEH 11709.2)","Prior Use Disclosure for demo/rental/loaner/fleet (VEH 11713(t))","New/Used designation in red box (VEH 11713.1(v))","Temporary License Plate (VEH 4456(a)(9))","Certified Vehicle Inspection Report (VEH 11713.18(a)(6)) — if sold as certified"]',
 '[{"section":"VEH 4456","description":"Report of Sale and temporary plate requirements"},{"section":"VEH 5600","description":"Transfer of title requirements"},{"section":"VEH 11709.2","description":"Conditional sale / spot delivery requirements"},{"section":"VEH 11713","description":"Unlawful dealer acts — comprehensive list"},{"section":"VEH 11713.1","description":"Additional unlawful acts — new/used designation"},{"section":"VEH 11713.21","description":"2-Day Contract Cancellation Option"},{"section":"VEH 11713.26","description":"NMVTIS disclosure requirements"}]',
 '["dmv_form","dealer_disclosure","vehicle_sale_contract","buyers_guide","vehicle_registration","conditional_sale"]',
 '["auto-sale-document-authentication","ca-dealer-compliance-check","dmv-form-validation"]',
 'California DMV; CA Bureau of Automotive Repair', 'https://www.dmv.ca.gov/portal/handbook/vehicle-industry-registration-procedures-manual/',
 1, '4 years', '{"actual":true,"statutory":"$5,000 per violation (VEH 11713)","attorney_fees":true,"injunctive":true}',
 NULL, NULL,
 'https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?division=5.&chapter=4.&lawCode=VEH', 1, datetime('now'), datetime('now')),

-- CA Civil Code — Conditional Sale Contract
('std_ver_003', 'VERITAS-0', 'STATE_STATUTE', 'CA',
 'CA Civil Code §§ 1632, 1770, 1784.43, 2981-2984.5', 'CA CIV Auto Sale',
 'California Civil Code — Auto Sale Consumer Protection Requirements',
 'California consumer protection requirements for auto sales including Conditional Sale Contract with 20+ itemized fields, mandatory notices, 3-Day Right to Cancel disclosure (effective 10/1/2026), foreign language translation requirements (Spanish, Chinese, Tagalog, Vietnamese, Korean per CIV 1632), and CLRA prohibited practices. The conditional sale contract has specific structural requirements — missing mandatory fields or notices render the contract voidable.',
 '["Conditional Sale Contract with 20+ itemized fields (CIV 2981-2984.5)","Multiple mandatory notices embedded in contract (CIV 2982(g)(h)(r))","3-Day Right to Cancel disclosure (CIV 1784.43) — effective 10/1/2026","Foreign Language Translation (CIV 1632) — Spanish, Chinese, Tagalog, Vietnamese, Korean","CLRA prohibited unfair/deceptive practices (CIV 1770)","Itemization of amount financed","Disclosure of finance charge and APR","Total of payments and payment schedule","Deferred payment price"]',
 '[{"section":"CIV 1632","description":"Foreign language contract translation requirements"},{"section":"CIV 1770","description":"CLRA — prohibited unfair and deceptive practices"},{"section":"CIV 1784.43","description":"3-Day Right to Cancel — effective 10/1/2026"},{"section":"CIV 2981","description":"Conditional sale contract — required content"},{"section":"CIV 2982","description":"Conditional sale contract — mandatory notices"},{"section":"CIV 2984.5","description":"Conditional sale — delivery and cancellation"}]',
 '["conditional_sale_contract","retail_installment_contract","auto_financing","consumer_disclosure","vehicle_sale_contract"]',
 '["auto-sale-document-authentication","conditional-sale-validation","consumer-disclosure-check"]',
 'California Department of Financial Protection and Innovation', 'https://dfpi.ca.gov/',
 1, '4 years', '{"actual":true,"statutory":"$5,000 per violation","attorney_fees":true,"injunctive":true,"treble":true}',
 NULL, NULL,
 'https://leginfo.legislature.ca.gov/faces/codes_displayexpandedbranch.xhtml?tocCode=CIV', 1, datetime('now'), datetime('now')),

-- TILA / Reg Z for Dealer-Arranged Financing
('std_ver_004', 'VERITAS-0', 'FEDERAL_REGULATION', 'US',
 '15 USC §§ 1601-1667f; 12 CFR Part 1026 (Regulation Z)', 'TILA/Reg Z',
 'Truth in Lending Act / Regulation Z — Dealer-Arranged Financing Disclosures',
 'Federal disclosure requirements when a dealer arranges financing for a consumer. Requires specific itemized disclosures of APR, finance charge, amount financed, total of payments, and payment schedule. Disclosure format must be clear and conspicuous with required terms more conspicuously disclosed. Violations trigger statutory damages and rescission rights. Applies when dealer acts as creditor or arranges credit with a third party.',
 '["Annual Percentage Rate (APR) disclosure","Finance charge disclosure","Amount financed itemization","Total of payments","Payment schedule (number, amount, due dates)","Total sale price","Security interest description","Late payment terms","Prepayment penalty disclosure","Required itemization of amount financed","Clear and conspicuous format requirement","Segregated disclosure box"]',
 '[{"section":"15 USC 1638","description":"Transactions other than under open end credit plans — required disclosures"},{"section":"12 CFR 1026.17","description":"General disclosure requirements — format and timing"},{"section":"12 CFR 1026.18","description":"Content of disclosures — closed-end credit"},{"section":"12 CFR 1026.19","description":"Certain mortgage and variable-rate transactions"}]',
 '["retail_installment_contract","financing_disclosure","loan_estimate","conditional_sale_contract","credit_application"]',
 '["auto-sale-document-authentication","financing-disclosure-validation","tila-compliance-check"]',
 'Consumer Financial Protection Bureau', 'https://www.consumerfinance.gov/rules-policy/regulations/1026/',
 1, '1 year from disclosure violation; 3 years for rescission', '{"actual":true,"statutory":"Individual: $2,000; Class: lesser of $1M or 1% of net worth","attorney_fees":true,"injunctive":true}',
 '1969-05-29', '2024-01-01',
 'https://www.consumerfinance.gov/rules-policy/regulations/1026/', 1, datetime('now'), datetime('now')),

-- Smog / Emissions
('std_ver_005', 'VERITAS-0', 'STATE_STATUTE', 'CA',
 'CA Health & Safety Code §§ 44015, 44060; CA Vehicle Code § 24007', 'CA Smog',
 'California Smog Certificate Requirements for Vehicle Sales',
 'Seller must provide a valid Smog Certificate of Compliance or Noncompliance at time of sale. Specific exemptions exist (diesel 1997 and older, electric, 4 model years old or newer). Certificate must be from a licensed smog station, dated within 90 days of sale, and match the vehicle VIN. Bureau of Automotive Repair (BAR) maintains station licensing and certificate verification.',
 '["Valid Smog Certificate required at time of sale","Certificate from licensed BAR smog station","Dated within 90 days of sale date","VIN on certificate must match vehicle sold","Specific vehicle exemptions (diesel 1997-, electric, 4 model years new)","BAR station licensing verification","Certificate of Noncompliance disclosure requirements"]',
 '[{"section":"HSC 44015","description":"Smog certificate requirement for vehicle transfer"},{"section":"HSC 44060","description":"Smog station licensing and certification"},{"section":"VEH 24007","description":"Unlawful to sell without smog compliance"}]',
 '["smog_certificate","vehicle_sale","emissions_inspection","dealer_disclosure"]',
 '["auto-sale-document-authentication","smog-certificate-validation"]',
 'California Bureau of Automotive Repair', 'https://www.bar.ca.gov/',
 0, NULL, NULL,
 NULL, NULL,
 'https://www.bar.ca.gov/', 1, datetime('now'), datetime('now')),

-- ------------------------------------
-- 3B: FEDERAL CORRESPONDENCE STANDARDS
-- ------------------------------------

-- Treasury Financial Manual
('std_ver_006', 'VERITAS-0', 'AGENCY_STANDARD', 'US',
 'Treasury Financial Manual (TFM), Volume I, Chapter 6000', 'TFM Ch. 6000',
 'Treasury Financial Manual — Correspondence Standards',
 'Treasury-specific correspondence requirements including accountability standards for official letters, required signatory information, reference number protocols, and response tracking. Treasury letters must include identifiable author (name, title, or division designation), case/reference numbers, and contact information. Letters signed only by department name without individual signatory violate TFM correspondence accountability requirements.',
 '["Identifiable author name, title, or division designation","Case or reference number in letter body","Contact information prominently displayed","Response tracking reference","Consistent letterhead within correspondence series","Date format consistency","Customer number assignment and management","Address verification before correspondence"]',
 '[{"section":"TFM Ch. 6000","description":"Correspondence and Documentation Standards"},{"section":"TFM Ch. 4000","description":"Disbursement Standards"},{"section":"TFM Ch. 7000","description":"Reporting Standards"}]',
 '["treasury_correspondence","treasury_notice","treasury_securities_letter","savings_bond_correspondence"]',
 '["federal-document-authentication","treasury-correspondence-validation","signatory-accountability-check"]',
 'U.S. Department of the Treasury Bureau of the Fiscal Service', 'https://tfm.fiscal.treasury.gov/',
 0, NULL, NULL,
 NULL, NULL,
 'https://tfm.fiscal.treasury.gov/', 1, datetime('now'), datetime('now')),

-- ------------------------------------
-- 3C: MEDICAL DOCUMENT STANDARDS
-- ------------------------------------

-- HIPAA Transaction Standards
('std_ver_007', 'VERITAS-0', 'FEDERAL_REGULATION', 'US',
 '45 CFR Parts 160, 162, 164; HIPAA Administrative Simplification', 'HIPAA Doc Standards',
 'HIPAA Document and Transaction Standards',
 'Federal standards for healthcare documentation including privacy notices, transaction formats, code set requirements, and provider identification. Medical records must include NPI, use standardized code sets (ICD-10, CPT, HCPCS), and follow CMS documentation guidelines. Records missing NPI numbers, using incorrect code sets, or lacking required identifiers are structurally non-compliant and forensically suspect.',
 '["NPI (National Provider Identifier) on all transactions","ICD-10-CM/PCS code set requirements","CPT/HCPCS procedure code requirements","HIPAA Privacy Notice format and content","Authorization form requirements","Minimum necessary standard for disclosures","Business Associate Agreement requirements","Breach notification format and timing","Electronic transaction format standards (X12)"]',
 '[{"section":"45 CFR 160","description":"General Administrative Requirements"},{"section":"45 CFR 162","description":"Administrative Requirements — transactions and code sets"},{"section":"45 CFR 164","description":"Security and Privacy — documentation requirements"},{"section":"45 CFR 164.520","description":"Notice of Privacy Practices — format and content"}]',
 '["medical_record","operative_report","clinical_note","eob","hipaa_authorization","privacy_notice","billing_statement"]',
 '["medical-document-authentication","provider-verification","coding-validation"]',
 'HHS Office for Civil Rights; CMS', 'https://www.hhs.gov/hipaa/',
 1, NULL, '{"actual":true,"statutory":"$100-$50,000 per violation, up to $2.067M per category per year","injunctive":true}',
 '1996-08-21', '2024-01-01',
 'https://www.hhs.gov/hipaa/', 1, datetime('now'), datetime('now')),

-- ------------------------------------
-- 3D: DEBT COLLECTION DOCUMENT STANDARDS
-- ------------------------------------

-- FDCPA Document Requirements
('std_ver_008', 'VERITAS-0', 'FEDERAL_STATUTE', 'US',
 '15 USC §§ 1692-1692p (Fair Debt Collection Practices Act)', 'FDCPA',
 'Fair Debt Collection Practices Act — Required Document Content and Format',
 'Federal requirements for debt collection communications including mandatory validation notice content, mini-Miranda warning, dispute rights disclosure, and original creditor identification. Initial communication must include: amount of debt, name of creditor, 30-day dispute period notice, and verification rights. Collecting on a debt that was never validly created (e.g., denied credit application) is a per se FDCPA violation.',
 '["Validation notice within 5 days of initial communication","Amount of debt","Name of creditor to whom debt is owed","30-day dispute period statement","Right to obtain verification of debt","Right to obtain name and address of original creditor","Mini-Miranda warning in initial and subsequent communications","Prohibition on false, deceptive, or misleading representations","Prohibition on unfair practices","Required response to written disputes within 30 days"]',
 '[{"section":"15 USC 1692e","description":"False or misleading representations"},{"section":"15 USC 1692f","description":"Unfair practices"},{"section":"15 USC 1692g","description":"Validation of debts — required disclosures and timing"},{"section":"15 USC 1692k","description":"Civil liability — damages provisions"}]',
 '["debt_collection_notice","validation_notice","collection_letter","settlement_offer"]',
 '["debt-collection-document-authentication","validation-notice-compliance","fdcpa-required-content-check"]',
 'Consumer Financial Protection Bureau; FTC', 'https://www.consumerfinance.gov/rules-policy/regulations/1006/',
 1, '1 year from violation', '{"actual":true,"statutory":"Individual: $1,000; Class: lesser of $500,000 or 1% of net worth","attorney_fees":true}',
 '1978-03-20', '2021-11-30',
 'https://www.consumerfinance.gov/rules-policy/regulations/1006/', 1, datetime('now'), datetime('now')),

-- Rosenthal Act (CA)
('std_ver_009', 'VERITAS-0', 'STATE_STATUTE', 'CA',
 'CA Civil Code §§ 1788-1788.33 (Rosenthal Fair Debt Collection Practices Act)', 'Rosenthal Act',
 'California Rosenthal Fair Debt Collection Practices Act',
 'California state complement to the FDCPA. Applies to original creditors AND third-party collectors (broader than FDCPA which only covers third-party). Same validation notice requirements plus California-specific protections including prohibition on contacting before 8am or after 9pm, specific language requirements for California residents, and enhanced privacy protections.',
 '["All FDCPA validation notice requirements","Applies to original creditors AND third-party collectors","Prohibition on contact before 8am or after 9pm","California-specific language requirements","Enhanced privacy protections","California consumer rights notice","Specific disclosure for time-barred debt"]',
 '[{"section":"CIV 1788.10","description":"Definitions — debt collector includes original creditors"},{"section":"CIV 1788.11","description":"Threats and harassment prohibited"},{"section":"CIV 1788.12","description":"Unfair or deceptive practices"},{"section":"CIV 1788.13","description":"False representations prohibited"},{"section":"CIV 1788.14","description":"Validation of debt requirements"},{"section":"CIV 1788.30","description":"Liability and damages"}]',
 '["debt_collection_notice","validation_notice","collection_letter","settlement_offer","original_creditor_notice"]',
 '["debt-collection-document-authentication","rosenthal-compliance-check"]',
 'California Department of Financial Protection and Innovation', 'https://dfpi.ca.gov/',
 1, '1 year from violation', '{"actual":true,"statutory":"$100-$1,000 per violation","attorney_fees":true,"injunctive":true}',
 NULL, NULL,
 'https://leginfo.legislature.ca.gov/faces/codes_displayexpandedbranch.xhtml?tocCode=CIV', 1, datetime('now'), datetime('now'));


-- ============================================================
-- SECTION 4: CROSS-REFERENCES
-- ============================================================

-- GPO Style Manual ↔ DDH
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_arc_001', 'std_arc_001', 'std_arc_002', 'SUPPLEMENTS', 'GPO Style Manual provides typography rules; DDH provides structural requirements. Both must be satisfied for authentic federal documents.', datetime('now'));

-- DDH ↔ Section 508
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_arc_002', 'std_arc_002', 'std_arc_006', 'REQUIRES', 'Federal Register documents must comply with both DDH structural requirements and Section 508 accessibility standards.', datetime('now'));

-- NARA ERM ↔ ISO 16363
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_arc_003', 'std_arc_003', 'std_arc_004', 'SUPPLEMENTS', 'NARA ERM defines record lifecycle requirements; ISO 16363 defines the repository trust standards for where those records are stored.', datetime('now'));

-- GovInfo Auth ↔ ISO 16363
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_arc_004', 'std_arc_007', 'std_arc_004', 'IMPLEMENTS', 'GovInfo implements ISO 16363 trustworthy repository standard — the only certified implementation worldwide.', datetime('now'));

-- FRE 901/902 ↔ Apostille
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_arc_005', 'std_arc_010', 'std_arc_008', 'SUPPLEMENTS', 'FRE 901/902 defines domestic authentication requirements; Apostille standards extend to international document authentication.', datetime('now'));

-- FTC Buyers Guide ↔ CA VEH Dealer
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_ver_001', 'std_ver_001', 'std_ver_002', 'SUPPLEMENTS', 'Federal FTC Buyers Guide requirements supplemented by California-specific dealer disclosure requirements. Both must be satisfied in a CA used car sale.', datetime('now'));

-- TILA/Reg Z ↔ CA CIV Auto Sale
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_ver_002', 'std_ver_004', 'std_ver_003', 'SUPPLEMENTS', 'Federal TILA financing disclosure requirements supplemented by California Civil Code conditional sale contract requirements.', datetime('now'));

-- FDCPA ↔ Rosenthal Act
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_ver_003', 'std_ver_008', 'std_ver_009', 'SUPPLEMENTS', 'Federal FDCPA covers third-party collectors only; California Rosenthal Act extends to original creditors. Both apply simultaneously in California.', datetime('now'));

-- PII/CUI Marking ↔ NIST SP 800-63-4
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_arc_006', 'std_arc_009', 'std_arc_005', 'SUPPLEMENTS', 'PII marking standards govern document classification; NIST 800-63-4 governs identity proofing for the individuals referenced in those documents.', datetime('now'));

-- Plain Writing Act ↔ GPO Style Manual
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_arc_007', 'std_arc_011', 'std_arc_001', 'SUPPLEMENTS', 'Plain Writing Act mandates clarity of language; GPO Style Manual mandates consistency of formatting. Together they define how federal documents must read and look.', datetime('now'));

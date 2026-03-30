-- ============================================================
-- SEED 030: VERITAS-0 & ARCHIVIST-0 — AI, Robotics, Space, NASA
-- Emerging Technology Document Standards
-- Created: 2026-03-18
-- Purpose: Document authentication standards for AI governance,
--          robotics safety, space operations, and NASA/aerospace
--          documentation. First-mover advantage in emerging domains.
-- ============================================================


-- ============================================================
-- SECTION 1: ARTIFICIAL INTELLIGENCE GOVERNANCE STANDARDS
-- ============================================================

INSERT OR IGNORE INTO governing_standards
  (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title,
   description, requirements, key_sections, document_types, skill_slugs,
   enforcement_body, enforcement_url, private_right_of_action,
   statute_of_limitations, damages_available, effective_date, last_amended,
   source_url, is_active, created_at, updated_at)
VALUES

-- NIST AI Risk Management Framework
('std_ver_030', 'VERITAS-0', 'AGENCY_STANDARD', 'US',
 'NIST AI 100-1 (AI Risk Management Framework 1.0)', 'NIST AI RMF',
 'NIST AI Risk Management Framework',
 'The foundational US framework for managing AI risk. Defines four core functions: GOVERN, MAP, MEASURE, MANAGE. AI system documentation must demonstrate compliance with these functions including risk identification, impact assessment, monitoring plans, and human oversight mechanisms. Documents claiming AI risk compliance but lacking structured evidence of these four functions are non-compliant. Companion profiles (NIST AI 600-1 for Generative AI) extend the framework.',
 '["GOVERN: Policies, processes, procedures, and practices for AI risk management","MAP: Context, capability, risk identification for AI systems","MEASURE: Quantitative and qualitative analysis of AI risks","MANAGE: Risk treatment, response, and recovery plans","Trustworthy AI characteristics: valid/reliable, safe, secure, accountable, transparent, explainable, privacy-enhanced, fair","AI system inventory and classification documentation","Human oversight and escalation procedures","Third-party AI risk assessment documentation","Continuous monitoring and evaluation plans","Incident response procedures for AI failures"]',
 '[{"section":"GOVERN","description":"Organizational governance for AI risk — policies, roles, culture"},{"section":"MAP","description":"Framing AI risks in context — categorization, capability, impact"},{"section":"MEASURE","description":"Analyzing and assessing AI risks — metrics, testing, evaluation"},{"section":"MANAGE","description":"Treating and monitoring AI risks — prioritization, response, communication"},{"section":"AI 600-1","description":"Generative AI Profile — 12 unique risks for GenAI systems"}]',
 '["ai_risk_assessment","ai_system_documentation","ai_impact_assessment","ai_audit_report","ai_governance_policy","ai_incident_report","model_card","ai_transparency_report"]',
 '["ai-document-authentication","ai-governance-compliance-check","ai-risk-documentation-validation"]',
 'National Institute of Standards and Technology', 'https://airc.nist.gov/AI_RMF_Interactivity',
 0, NULL, NULL,
 '2023-01-26', '2024-07-26',
 'https://www.nist.gov/artificial-intelligence/executive-order-safe-secure-and-trustworthy-artificial-intelligence', 1, datetime('now'), datetime('now')),

-- Executive Order 14110 on AI
('std_ver_031', 'VERITAS-0', 'FEDERAL_REGULATION', 'US',
 'Executive Order 14110 (October 30, 2023); OMB M-24-10', 'EO 14110 / OMB M-24-10',
 'Executive Order on Safe, Secure, and Trustworthy AI & OMB AI Governance Memo',
 'Executive Order 14110 establishes federal AI governance requirements including safety testing, red-teaming documentation, watermarking of AI-generated content, and reporting requirements for dual-use foundation models. OMB M-24-10 implements these requirements across federal agencies with specific documentation mandates: AI use case inventories, impact assessments, risk management practices, and public transparency reporting. Documents claiming federal AI compliance must reference specific EO 14110 provisions and demonstrate OMB M-24-10 implementation.',
 '["Safety testing and red-teaming documentation for dual-use foundation models","AI-generated content authentication and watermarking standards","Federal AI use case inventory (public and internal)","AI impact assessments for rights-impacting AI systems","Minimum risk management practices for federal AI","Annual AI transparency reporting to Congress","Chief AI Officer designation documentation","AI governance board establishment records","Procurement standards for AI systems","Whistleblower protections for AI safety concerns","Data privacy provisions for AI training data","Standards for AI in critical infrastructure"]',
 '[{"section":"EO 14110 Sec. 4","description":"Ensuring Safety and Security of AI Technology"},{"section":"EO 14110 Sec. 5","description":"Promoting Innovation and Competition"},{"section":"EO 14110 Sec. 7","description":"Advancing Equity and Civil Rights"},{"section":"EO 14110 Sec. 8","description":"Protecting Consumers, Patients, Students"},{"section":"EO 14110 Sec. 9","description":"Protecting Workers"},{"section":"EO 14110 Sec. 10","description":"Promoting Government Use of AI"},{"section":"OMB M-24-10 Sec. 3","description":"Minimum Practices for Rights-Impacting AI"},{"section":"OMB M-24-10 Sec. 5","description":"AI Use Case Inventory Requirements"}]',
 '["ai_use_case_inventory","ai_impact_assessment","ai_safety_report","ai_red_team_report","ai_transparency_report","ai_procurement_document","ai_governance_charter"]',
 '["ai-document-authentication","federal-ai-compliance-check","eo14110-documentation-validation"]',
 'Office of Management and Budget; OSTP', 'https://www.whitehouse.gov/ostp/ai-bill-of-rights/',
 0, NULL, NULL,
 '2023-10-30', '2024-03-28',
 'https://www.whitehouse.gov/briefing-room/presidential-actions/2023/10/30/executive-order-on-the-safe-secure-and-trustworthy-development-and-use-of-artificial-intelligence/', 1, datetime('now'), datetime('now')),

-- IEEE AI/ML Standards
('std_ver_032', 'VERITAS-0', 'PROFESSIONAL_STANDARD', 'US',
 'IEEE 7000-2021; IEEE 7001-2021; IEEE 7002-2022; IEEE 7010-2020; IEEE 2801-2022', 'IEEE AI Ethics',
 'IEEE Standards for Ethical AI, Transparency, and Accountability',
 'IEEE family of standards addressing AI ethics, transparency, algorithmic bias, data privacy in AI, and well-being metrics. IEEE 7000 establishes a model process for addressing ethical concerns during system design. IEEE 7001 defines transparency requirements for autonomous systems. IEEE 2801 provides a recommended practice for quality management of datasets used in AI/ML. Documents claiming IEEE AI compliance must reference specific standard numbers and demonstrate process adherence.',
 '["IEEE 7000: Ethical concerns addressed during system design lifecycle","IEEE 7001: Transparency levels for autonomous systems (5 levels)","IEEE 7002: Data privacy process for AI/ML","IEEE 7010: Well-being metrics for AI impact assessment","IEEE 2801: Dataset quality management for AI/ML training data","Algorithmic impact assessments with bias documentation","Model explainability documentation requirements","Human-in-the-loop design specifications","Fail-safe and graceful degradation documentation","Version control and reproducibility requirements"]',
 '[{"section":"IEEE 7000","description":"Model Process for Addressing Ethical Concerns During System Design"},{"section":"IEEE 7001","description":"Transparency of Autonomous Systems — 5 transparency levels"},{"section":"IEEE 7002","description":"Data Privacy Process — privacy-by-design for AI"},{"section":"IEEE 7010","description":"Well-Being Metrics — measuring AI impact on human well-being"},{"section":"IEEE 2801","description":"Quality Management of Datasets for ML/AI"}]',
 '["ai_ethics_assessment","algorithmic_impact_assessment","model_transparency_report","dataset_quality_report","ai_design_specification","autonomous_system_documentation"]',
 '["ai-document-authentication","ieee-ai-standards-validation","algorithmic-bias-documentation-check"]',
 'Institute of Electrical and Electronics Engineers', 'https://ethicsinaction.ieee.org/',
 0, NULL, NULL,
 '2020-01-01', '2022-12-01',
 'https://ethicsinaction.ieee.org/', 1, datetime('now'), datetime('now')),

-- EU AI Act (International Reference)
('std_ver_033', 'VERITAS-0', 'INTERNATIONAL', 'EU',
 'Regulation (EU) 2024/1689 (EU Artificial Intelligence Act)', 'EU AI Act',
 'European Union Artificial Intelligence Act — Risk-Based Documentation Requirements',
 'The world first comprehensive AI law. Establishes four risk tiers (Unacceptable, High, Limited, Minimal) with escalating documentation requirements. High-risk AI systems require: technical documentation per Annex IV, conformity assessments, CE marking, quality management systems, risk management systems, data governance documentation, and post-market monitoring. Documents for AI systems deployed in EU markets or processing EU citizen data must demonstrate compliance. Effective August 1, 2024; full enforcement February 2, 2025.',
 '["Risk classification documentation (Unacceptable/High/Limited/Minimal)","Annex IV Technical Documentation for high-risk AI","Conformity assessment procedures and certificates","CE marking requirements for high-risk AI","Quality management system documentation","Risk management system lifecycle documentation","Data governance and dataset documentation","Human oversight capability documentation","Accuracy, robustness, cybersecurity measures","Post-market monitoring plan","Serious incident reporting within 15 days","Transparency obligations for limited-risk AI (chatbots, deepfakes)","Registration in EU AI database before market placement"]',
 '[{"section":"Title I Art. 1-4","description":"Subject Matter, Scope, Definitions"},{"section":"Title II Art. 5","description":"Prohibited AI Practices (Unacceptable Risk)"},{"section":"Title III Art. 6-49","description":"High-Risk AI Systems — requirements and obligations"},{"section":"Title IV Art. 50","description":"Transparency Obligations for Limited-Risk AI"},{"section":"Annex IV","description":"Technical Documentation Requirements — 15 categories"},{"section":"Title VIII Art. 71-72","description":"Penalties — up to 35M EUR or 7% global turnover"}]',
 '["ai_technical_documentation","conformity_assessment","ai_risk_classification","ai_transparency_notice","ai_incident_report","ai_quality_management","dataset_documentation","ai_registration"]',
 '["ai-document-authentication","eu-ai-act-compliance-check","conformity-assessment-validation"]',
 'European AI Office', 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai',
 0, NULL, '{"statutory":"Up to 35M EUR or 7% worldwide annual turnover"}',
 '2024-08-01', '2025-02-02',
 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689', 1, datetime('now'), datetime('now')),

-- California AI Transparency Act (SB 942)
('std_ver_034', 'VERITAS-0', 'STATE_STATUTE', 'CA',
 'CA Business & Professions Code §§ 22757-22757.10 (SB 942, AI Transparency Act)', 'CA AI Transparency',
 'California AI Transparency Act — Disclosure and Watermarking Requirements',
 'California law requiring AI providers to implement content provenance and watermarking for AI-generated content. Requires disclosure when content is AI-generated, AI detection tools for users, and metadata standards for provenance tracking. Effective January 1, 2026. Documents or content claiming human authorship that contain AI watermarks or provenance metadata inconsistent with claimed origin are forensically significant.',
 '["AI-generated content disclosure requirements","Content provenance metadata standards (C2PA compatible)","AI watermarking implementation for covered providers","AI detection tools provided to users","Manifest or metadata embedded in AI-generated content","Clear and conspicuous labeling of synthetic content","Opt-out mechanisms for content creators","Annual transparency reporting","Provider documentation of watermarking methodology","Deepfake disclosure requirements for political content"]',
 '[{"section":"BPC 22757","description":"Definitions — covered provider, generative AI, synthetic content"},{"section":"BPC 22757.2","description":"Content provenance and watermarking requirements"},{"section":"BPC 22757.4","description":"AI detection tool requirements"},{"section":"BPC 22757.6","description":"Disclosure obligations"},{"section":"BPC 22757.8","description":"Enforcement and penalties"},{"section":"BPC 22757.10","description":"Reporting requirements"}]',
 '["ai_generated_content","synthetic_media","ai_disclosure","content_provenance_record","ai_watermark_documentation"]',
 '["ai-document-authentication","ai-content-provenance-check","synthetic-content-detection"]',
 'California Attorney General', 'https://oag.ca.gov/',
 1, NULL, '{"actual":true,"injunctive":true}',
 '2026-01-01', NULL,
 'https://leginfo.legislature.ca.gov/', 1, datetime('now'), datetime('now')),


-- ============================================================
-- SECTION 2: ROBOTICS STANDARDS
-- ============================================================

-- ISO 10218 Industrial Robots Safety
('std_ver_035', 'VERITAS-0', 'INTERNATIONAL', 'US',
 'ISO 10218-1:2024; ISO 10218-2:2024; ANSI/RIA R15.06-2024', 'ISO 10218 Robotics',
 'ISO 10218 / ANSI R15.06 — Industrial Robot Safety Standards',
 'International and US national standards for industrial robot safety including design, integration, documentation, and risk assessment requirements. Documentation must include robot risk assessments, safety function specifications, collaborative operation parameters, and installation verification records. OSHA references these standards for robotics workplace safety enforcement. Documents certifying robot safety compliance must reference specific ISO/ANSI standard sections and include quantified risk data.',
 '["Robot risk assessment documentation (ISO 12100 methodology)","Safety function specifications and performance levels (PL)","Safety integrity levels (SIL) for safety-related control systems","Collaborative operation parameters (speed, force, power limits)","Safeguarding device specifications and validation","Installation and commissioning verification records","Periodic inspection and maintenance schedules","Operator training documentation and competency records","Emergency stop system documentation","Robot cell layout and safeguard zone specifications","Programming mode safety documentation","Application-specific safety requirements"]',
 '[{"section":"ISO 10218-1:2024","description":"Robots and robotic devices — safety requirements for industrial robots"},{"section":"ISO 10218-2:2024","description":"Robot systems and integration — safety requirements"},{"section":"ANSI/RIA R15.06","description":"US adoption of ISO 10218 with national deviations"},{"section":"ISO/TS 15066","description":"Collaborative robots — safety requirements for collaborative operation"},{"section":"ISO 13849","description":"Safety-related parts of control systems — performance levels"}]',
 '["robot_risk_assessment","safety_function_specification","robot_installation_record","robot_maintenance_record","collaborative_robot_assessment","robot_training_record","robot_incident_report"]',
 '["robotics-document-authentication","robot-safety-compliance-check","risk-assessment-validation"]',
 'OSHA; Robotic Industries Association (RIA/A3)', 'https://www.robotics.org/',
 0, NULL, NULL,
 '2024-01-01', '2024-01-01',
 'https://www.iso.org/standard/73929.html', 1, datetime('now'), datetime('now')),

-- IEEE Robotics Ethics & Design Standards
('std_ver_036', 'VERITAS-0', 'PROFESSIONAL_STANDARD', 'US',
 'IEEE 7007-2024; IEEE 7009-2024; IEEE P2817; IEEE 1872-2024', 'IEEE Robotics',
 'IEEE Robotics Standards — Ethics, Fail-Safe Design, and Ontology',
 'IEEE standards for ethical robotics design, fail-safe autonomous systems, and robot ontology. IEEE 7007 provides ontological standard for ethically driven robotics and automation systems. IEEE 7009 defines fail-safe design requirements. IEEE 1872 provides standard ontology for robotics and automation. Documents for robotic systems claiming ethical design or fail-safe compliance must reference specific IEEE provisions and demonstrate design-level integration, not just operational controls.',
 '["IEEE 7007: Ethical design ontology for robotic systems","IEEE 7009: Fail-safe design of autonomous and semi-autonomous systems","IEEE P2817: Guide for verification of autonomous systems","IEEE 1872: Standard ontology for robotics and automation (ORA)","Ethical risk assessment for autonomous decision-making","Fail-safe behavior specification and testing documentation","Human-robot interaction safety documentation","Autonomy level classification and documentation","System degradation behavior documentation","Override and manual control specifications"]',
 '[{"section":"IEEE 7007","description":"Ontological Standard for Ethically Driven Robotics"},{"section":"IEEE 7009","description":"Fail-Safe Design of Autonomous and Semi-Autonomous Systems"},{"section":"IEEE P2817","description":"Guide for Verification of Autonomous Systems"},{"section":"IEEE 1872","description":"Standard Ontology for Robotics and Automation (ORA)"}]',
 '["robot_design_specification","ethical_risk_assessment","fail_safe_documentation","autonomy_classification","human_robot_interaction_assessment","robot_verification_report"]',
 '["robotics-document-authentication","ethical-design-validation","fail-safe-documentation-check"]',
 'Institute of Electrical and Electronics Engineers', 'https://standards.ieee.org/',
 0, NULL, NULL,
 '2024-01-01', '2024-01-01',
 'https://standards.ieee.org/', 1, datetime('now'), datetime('now')),


-- ============================================================
-- SECTION 3: SPACE / NASA STANDARDS
-- ============================================================

-- NASA Technical Standards Program
('std_arc_020', 'ARCHIVIST-0', 'AGENCY_STANDARD', 'US',
 'NASA-STD Series; NPR 7120.5 (NASA Systems Engineering); NPR 7150.2 (Software Engineering)', 'NASA-STD',
 'NASA Technical Standards Program — Document Creation and Engineering Standards',
 'NASA maintains its own Technical Standards Program governing all engineering, safety, and programmatic documentation. NASA-STD documents follow specific formatting including document numbering (NASA-STD-XXXX.X), revision tracking, approval signatures, and distribution statements. NASA Procedural Requirements (NPR) define lifecycle documentation requirements for missions. The NASA Technical Reports Server (NTRS) is the authenticated repository. Documents claiming NASA origin must conform to NASA-STD formatting and be verifiable against NTRS.',
 '["NASA-STD document numbering format (NASA-STD-XXXX.X)","NPR revision and approval chain documentation","Technical document formatting per NASA-STD-2100 (Handbook Series)","Document classification markings (ITAR, EAR, SBU)","Approval signature blocks with authority designation","Distribution limitation statements","Configuration management and change control documentation","Waivers and deviations formal documentation","Lessons learned documentation format","Review board minutes and findings format","Independent verification and validation (IV&V) documentation","NASA Technical Reports Server (NTRS) registration"]',
 '[{"section":"NASA-STD-2100","description":"NASA Technical Handbook Standards — document format"},{"section":"NPR 7120.5","description":"NASA Systems Engineering Processes and Requirements"},{"section":"NPR 7150.2","description":"NASA Software Engineering Requirements"},{"section":"NPR 8715.3","description":"NASA General Safety Program Requirements"},{"section":"NPR 1450.10","description":"NASA Technical Standards Program Requirements"},{"section":"NTRS","description":"NASA Technical Reports Server — authenticated repository"}]',
 '["nasa_technical_report","nasa_std_document","mission_requirements_document","system_engineering_plan","safety_analysis","flight_readiness_review","test_report","failure_analysis","waiver_deviation"]',
 '["nasa-document-authentication","technical-standards-format-validation","ntrs-repository-verification"]',
 'NASA Office of the Chief Engineer', 'https://standards.nasa.gov/',
 0, NULL, NULL,
 NULL, NULL,
 'https://standards.nasa.gov/', 1, datetime('now'), datetime('now')),

-- NASA Systems Engineering Handbook
('std_ver_037', 'VERITAS-0', 'AGENCY_STANDARD', 'US',
 'NASA SP-2016-6105 Rev 2 (NASA Systems Engineering Handbook); NPR 7123.1', 'NASA SE Handbook',
 'NASA Systems Engineering Handbook — Mission Documentation Standards',
 'NASA definitive guide for systems engineering documentation across mission lifecycle. Defines 17 common technical processes and their required documentation outputs. Every NASA mission generates specific documents at each lifecycle phase (Pre-Phase A through Phase F). Documents include Concept Study Reports, System Requirements Reviews, Preliminary/Critical Design Reviews, and Mission Readiness Reviews. Each has specific content requirements, format standards, and review board approval chains.',
 '["17 common technical processes with documentation outputs","Lifecycle phase documentation (Pre-A through Phase F)","Concept Study Report format and content","System Requirements Document format","Interface Requirements Document","Verification and Validation Plan","Mission Assurance Requirements","Safety and Mission Assurance documentation","Technology Readiness Level (TRL) assessment documentation","Key Decision Point (KDP) review packages","Independent Review Team findings format","Risk management documentation (5x5 risk matrix standard)","Heritage and lessons learned documentation","Anomaly/failure investigation reports"]',
 '[{"section":"Chapter 2","description":"Systems Engineering Fundamentals — process overview"},{"section":"Chapter 3","description":"NASA Program/Project Life Cycle — phases and gates"},{"section":"Chapter 4","description":"System Design Processes — requirements, architecture, design"},{"section":"Chapter 5","description":"Product Realization Processes — implementation, integration, V&V"},{"section":"Chapter 6","description":"Technical Management Processes — planning, risk, configuration"},{"section":"Appendix A-K","description":"Templates and examples for major deliverables"}]',
 '["concept_study_report","system_requirements_document","preliminary_design_review","critical_design_review","flight_readiness_review","mission_readiness_review","anomaly_report","risk_assessment","technology_readiness_assessment"]',
 '["nasa-document-authentication","mission-documentation-validation","review-package-format-check"]',
 'NASA Office of the Chief Engineer', 'https://www.nasa.gov/reference/systems-engineering-handbook/',
 0, NULL, NULL,
 '2016-01-01', '2020-01-01',
 'https://www.nasa.gov/reference/systems-engineering-handbook/', 1, datetime('now'), datetime('now')),

-- ITAR / EAR Export Control
('std_ver_038', 'VERITAS-0', 'FEDERAL_REGULATION', 'US',
 '22 CFR Parts 120-130 (ITAR); 15 CFR Parts 730-774 (EAR)', 'ITAR/EAR',
 'International Traffic in Arms Regulations / Export Administration Regulations',
 'Export control marking and documentation requirements for defense articles (ITAR) and dual-use items (EAR). Space technology, satellite data, and advanced robotics/AI often fall under ITAR or EAR. Documents containing export-controlled technical data must carry specific markings, distribution limitation statements, and export classification determinations (ECCN or USML categories). Unauthorized distribution of ITAR-marked documents or failure to mark export-controlled documents is a federal violation with criminal penalties.',
 '["ITAR distribution limitation statement on all controlled documents","USML (US Munitions List) category classification","Export classification determination (ECCN for EAR, USML for ITAR)","Technology Control Plan documentation","Export license application documentation (DSP-5, DSP-73, DSP-85)","Technical Assistance Agreement (TAA) documentation","Manufacturing License Agreement (MLA) documentation","Deemed export documentation for foreign nationals","End-use certificate requirements","Annual reporting and compliance documentation","ITAR § 127.1 marking requirement for defense articles","EAR § 734.7 published information exclusion documentation"]',
 '[{"section":"22 CFR 120-130","description":"ITAR — defense articles and services export controls"},{"section":"22 CFR 121","description":"US Munitions List — categories I through XXI"},{"section":"22 CFR 125","description":"Licenses for Export of Technical Data"},{"section":"15 CFR 730-774","description":"EAR — dual-use export controls"},{"section":"15 CFR 738","description":"Commerce Control List and ECCN classification"},{"section":"15 CFR 740","description":"License exceptions"}]',
 '["export_classification","itar_marked_document","technology_control_plan","export_license","technical_assistance_agreement","compliance_report","deemed_export_documentation"]',
 '["space-document-authentication","export-control-marking-validation","itar-ear-classification-check"]',
 'DDTC (ITAR); BIS (EAR)', 'https://www.pmddtc.state.gov/',
 0, NULL, '{"statutory":"Criminal: up to $1M and 20 years per violation (ITAR); Civil: up to $368,136 per violation (EAR)"}',
 NULL, NULL,
 'https://www.pmddtc.state.gov/', 1, datetime('now'), datetime('now')),

-- FAA Commercial Space Launch
('std_ver_039', 'VERITAS-0', 'FEDERAL_REGULATION', 'US',
 '51 USC §§ 50901-50923 (Commercial Space Launch Act); 14 CFR Part 400-460', 'FAA Space',
 'FAA Office of Commercial Space Transportation — Launch and Reentry Document Standards',
 'FAA licensing and documentation requirements for commercial space launches, reentry, and spaceport operations. License applications require specific technical documentation including mission descriptions, flight safety analyses, environmental assessments, financial responsibility demonstrations, and safety review documents. Post-launch reporting has specific format and timing requirements. The commercial space industry is generating documents that must meet these specific federal standards.',
 '["Launch/reentry license application format (14 CFR 413-415)","Mission description and flight profile documentation","Flight safety analysis methodology and results","Maximum probable loss (MPL) determination","Financial responsibility demonstration ($500M minimum third-party liability)","Environmental assessment per NEPA","Safety review document format","Accident investigation plan","Post-launch reporting (within 90 days)","Anomaly reporting (within 72 hours for mishaps)","Spaceport operator license documentation","Experimental permit documentation (14 CFR 437)","Human spaceflight informed consent documentation (14 CFR 460)"]',
 '[{"section":"51 USC 50901-50923","description":"Commercial Space Launch Act — statutory framework"},{"section":"14 CFR 413-415","description":"License applications — format and content requirements"},{"section":"14 CFR 417","description":"Launch safety — flight safety analysis requirements"},{"section":"14 CFR 420","description":"License to operate a launch/reentry site"},{"section":"14 CFR 431-435","description":"Reentry vehicle licensing requirements"},{"section":"14 CFR 437","description":"Experimental permits"},{"section":"14 CFR 440","description":"Financial responsibility requirements"},{"section":"14 CFR 460","description":"Human spaceflight requirements — informed consent"}]',
 '["launch_license_application","flight_safety_analysis","environmental_assessment","financial_responsibility","post_launch_report","anomaly_report","spaceport_license","experimental_permit","informed_consent_spaceflight"]',
 '["space-document-authentication","launch-license-documentation-check","flight-safety-analysis-validation"]',
 'FAA Office of Commercial Space Transportation (AST)', 'https://www.faa.gov/space',
 0, NULL, NULL,
 NULL, '2024-01-01',
 'https://www.faa.gov/space', 1, datetime('now'), datetime('now')),

-- CCSDS Standards (Space Data Systems)
('std_arc_021', 'ARCHIVIST-0', 'INTERNATIONAL', 'US',
 'CCSDS 650.0-M-2 (Reference Model for OAIS); CCSDS 651.1-B-1 (Digital Object Identifier)', 'CCSDS/OAIS',
 'Consultative Committee for Space Data Systems — Open Archival Information System',
 'International standard for space science data archival and exchange, adopted as ISO 14721. Defines the Reference Model for an Open Archival Information System (OAIS) — the gold standard for long-term digital preservation of scientific and engineering data. NASA, ESA, JAXA all conform to CCSDS standards. Documents and datasets claiming compliance with space science archival standards must follow OAIS information model including Submission Information Packages (SIP), Archival Information Packages (AIP), and Dissemination Information Packages (DIP).',
 '["OAIS Reference Model compliance (ISO 14721)","Submission Information Package (SIP) format","Archival Information Package (AIP) requirements","Dissemination Information Package (DIP) standards","Preservation Description Information (PDI) metadata","Content Information structure","Representation Information requirements","Fixity Information (checksums, digital signatures)","Provenance Information chain of custody","Context Information for interpretation","Access Rights Information","CCSDS data encoding standards for space telemetry"]',
 '[{"section":"CCSDS 650.0-M-2","description":"Reference Model for OAIS — functional model and information model"},{"section":"CCSDS 651.1-B-1","description":"Digital Object Identifier — persistent identification"},{"section":"ISO 14721:2012","description":"OAIS Reference Model — ISO adoption"},{"section":"CCSDS 661.0-B-1","description":"XML Formatted Data Unit — data exchange format"}]',
 '["space_science_dataset","telemetry_archive","mission_data_package","scientific_publication","observation_record","instrument_calibration_record"]',
 '["document-lifecycle-validation","space-data-archive-verification","oais-compliance-check"]',
 'Consultative Committee for Space Data Systems', 'https://public.ccsds.org/',
 0, NULL, NULL,
 '2012-06-01', '2020-01-01',
 'https://public.ccsds.org/Pubs/650x0m2.pdf', 1, datetime('now'), datetime('now')),

-- Artemis Accords
('std_ver_040', 'VERITAS-0', 'INTERNATIONAL', 'US',
 'Artemis Accords (October 13, 2020); Outer Space Treaty (1967)', 'Artemis Accords',
 'Artemis Accords — International Space Cooperation Document Standards',
 'International framework for civil space exploration signed by 43 nations (as of 2025). Establishes principles for transparency, interoperability, emergency assistance, registration of space objects, release of scientific data, deconfliction of activities, orbital debris mitigation, and heritage preservation. Documents for international space cooperation must reference specific Artemis Accords sections and demonstrate compliance with the underlying Outer Space Treaty (1967), Registration Convention (1976), and Rescue Agreement (1968).',
 '["Transparency: public description of national space policies and exploration plans","Interoperability: use of open standards for space infrastructure","Emergency assistance: mutual aid commitments documentation","Registration: space object registration with UN per Registration Convention","Scientific data: commitment to public release of scientific data","Deconfliction: notification of activities that may cause interference","Orbital debris: compliance with debris mitigation guidelines","Space heritage: preservation of historically significant sites","Resource extraction: compliance with Outer Space Treaty Art. II","Peaceful purposes: documentation of civil nature of activities"]',
 '[{"section":"Section 1","description":"Purpose and Scope — civil space cooperation"},{"section":"Section 3","description":"Transparency — public policy descriptions"},{"section":"Section 5","description":"Registration — UN space object registration"},{"section":"Section 7","description":"Release of Scientific Data — open access commitment"},{"section":"Section 9","description":"Orbital Debris — mitigation compliance"},{"section":"Section 10","description":"Resource Extraction — Outer Space Treaty compliance"},{"section":"Section 11","description":"Deconfliction — interference notification"}]',
 '["space_cooperation_agreement","space_object_registration","debris_mitigation_plan","data_release_plan","deconfliction_notice","heritage_preservation_plan"]',
 '["space-document-authentication","international-space-agreement-validation","treaty-compliance-check"]',
 'NASA; U.S. Department of State', 'https://www.nasa.gov/artemis-accords/',
 0, NULL, NULL,
 '2020-10-13', '2025-01-01',
 'https://www.nasa.gov/artemis-accords/', 1, datetime('now'), datetime('now'));


-- ============================================================
-- SECTION 4: ARCHIVIST-0 — CONTENT PROVENANCE STANDARD
-- ============================================================

-- C2PA Content Provenance
INSERT OR IGNORE INTO governing_standards
  (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title,
   description, requirements, key_sections, document_types, skill_slugs,
   enforcement_body, enforcement_url, private_right_of_action,
   statute_of_limitations, damages_available, effective_date, last_amended,
   source_url, is_active, created_at, updated_at)
VALUES
('std_arc_022', 'ARCHIVIST-0', 'PROFESSIONAL_STANDARD', 'US',
 'C2PA Specification 2.1 (Coalition for Content Provenance and Authenticity)', 'C2PA',
 'C2PA Content Provenance Standard — Digital Content Authentication',
 'Technical specification for content provenance and authenticity created by Adobe, Microsoft, Intel, BBC, and others. Defines cryptographic manifest structure for embedding tamper-evident provenance metadata in digital content (images, video, audio, documents). C2PA manifests record creation tool, editing history, and AI generation indicators. Documents or media with C2PA manifests can be verified for authenticity; absence of C2PA manifests in contexts where they should exist (e.g., AI-generated content post-CA AI Transparency Act) is forensically significant.',
 '["Cryptographic manifest embedded in content file","Claim structure: who created, how, when, what tool","Hard binding of manifest to content (tamper-evident)","Signature validation via trust chain","Action assertions (created, edited, AI-generated, etc.)","Ingredient assertions (source materials)","EXIF/XMP metadata preservation","Trust list verification (known signers)","Manifest history chain for derivative works","Cloud signature validation","Redaction and selective disclosure support"]',
 '[{"section":"Section 5","description":"Manifest Structure — claims, assertions, signatures"},{"section":"Section 6","description":"Hard Bindings — content-to-manifest integrity"},{"section":"Section 7","description":"Trust Model — signature validation and trust lists"},{"section":"Section 8","description":"Actions — creation, editing, AI generation assertions"},{"section":"Section 10","description":"Ingredients — source material tracking"},{"section":"Section 12","description":"Cloud Signatures — remote signing support"}]',
 '["digital_image","digital_video","digital_audio","digital_document","ai_generated_content","synthetic_media","news_media"]',
 '["document-type-identification","ai-content-provenance-check","digital-content-authentication"]',
 'Coalition for Content Provenance and Authenticity', 'https://c2pa.org/',
 0, NULL, NULL,
 '2022-01-26', '2024-10-01',
 'https://c2pa.org/specifications/specifications/2.1/specs/C2PA_Specification.html', 1, datetime('now'), datetime('now'));


-- ============================================================
-- SECTION 5: CROSS-REFERENCES
-- ============================================================

-- NIST AI RMF ↔ EO 14110
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_ver_020', 'std_ver_030', 'std_ver_031', 'IMPLEMENTS', 'NIST AI RMF provides the technical framework; EO 14110 and OMB M-24-10 mandate its use across federal agencies.', datetime('now'));

-- EO 14110 ↔ IEEE AI Ethics
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_ver_021', 'std_ver_031', 'std_ver_032', 'REFERENCES', 'EO 14110 references industry standards for AI safety; IEEE 7000 series provides the professional standard implementation.', datetime('now'));

-- NIST AI RMF ↔ EU AI Act
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_ver_022', 'std_ver_030', 'std_ver_033', 'REFERENCES', 'NIST AI RMF and EU AI Act are complementary frameworks — cross-compliance documentation is increasingly required for global AI deployments.', datetime('now'));

-- CA AI Transparency ↔ C2PA
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_ver_023', 'std_ver_034', 'std_arc_022', 'IMPLEMENTS', 'CA AI Transparency Act watermarking requirements can be implemented via C2PA content provenance standard.', datetime('now'));

-- ISO 10218 Robotics ↔ IEEE Robotics
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_ver_024', 'std_ver_035', 'std_ver_036', 'SUPPLEMENTS', 'ISO 10218 covers physical safety; IEEE 7007/7009 covers ethical design and fail-safe behavior. Both required for comprehensive robotic system documentation.', datetime('now'));

-- NASA-STD ↔ CCSDS/OAIS
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_ver_025', 'std_arc_020', 'std_arc_021', 'REQUIRES', 'NASA technical documents and mission data must be archived per CCSDS/OAIS standards for long-term preservation.', datetime('now'));

-- NASA SE Handbook ↔ NASA-STD
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_ver_026', 'std_ver_037', 'std_arc_020', 'IMPLEMENTS', 'NASA SE Handbook implements the documentation requirements defined in NASA Technical Standards Program.', datetime('now'));

-- ITAR/EAR ↔ NASA-STD
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_ver_027', 'std_ver_038', 'std_arc_020', 'SUPPLEMENTS', 'NASA documents frequently contain ITAR/EAR controlled technical data — export control markings must supplement NASA-STD formatting.', datetime('now'));

-- FAA Space ↔ Artemis Accords
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_ver_028', 'std_ver_039', 'std_ver_040', 'REFERENCES', 'FAA commercial space licensing must align with Artemis Accords transparency and registration commitments for international operations.', datetime('now'));

-- CCSDS/OAIS ↔ ISO 16363
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_ver_029', 'std_arc_021', 'std_arc_004', 'IMPLEMENTS', 'OAIS reference model (ISO 14721) defines the archival framework; ISO 16363 provides the audit/certification standard for repositories implementing OAIS.', datetime('now'));

-- EU AI Act ↔ C2PA
INSERT OR IGNORE INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
VALUES ('xref_ver_030', 'std_ver_033', 'std_arc_022', 'REFERENCES', 'EU AI Act transparency obligations for synthetic content can be technically implemented via C2PA provenance manifests.', datetime('now'));

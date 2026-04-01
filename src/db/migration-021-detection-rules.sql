-- Migration 021: Detection Rule Library
-- Deterministic pattern rules derived from human audit review.
-- Each rule is a specific IF/THEN gate cataloged from a real case.
-- Rules accumulate over time — the persona never forgets a pattern.
-- Every rule is traceable to the case that created it.

-- =============================================================================
-- DETECTION RULES: the persona's growing pattern library
-- =============================================================================

CREATE TABLE IF NOT EXISTS detection_rules (
  id TEXT PRIMARY KEY,

  -- Which persona owns this rule
  citizen_name TEXT NOT NULL,

  -- The rule itself
  rule_name TEXT NOT NULL,             -- e.g. "ROLE_REVERSAL_DETECTION"
  rule_description TEXT NOT NULL,      -- Plain English: what this rule catches
  severity TEXT NOT NULL DEFAULT 'HIGH'
    CHECK(severity IN ('LOW', 'MODERATE', 'HIGH', 'CRITICAL')),

  -- The logic gate (deterministic IF/THEN)
  trigger_conditions TEXT NOT NULL,    -- JSON array of conditions that must ALL be true
  -- Example: ["same_person_both_reports", "role_changed_victim_to_suspect", "same_address"]
  finding_template TEXT NOT NULL,      -- What finding to generate when rule fires
  -- Example: "Person {name} changed from {old_role} to {new_role} between reports {report_a} and {report_b}"

  -- Statutory basis
  governing_standard TEXT,             -- Which law/standard this rule enforces
  -- Example: "PC 13701(b) — dominant aggressor determination requires prior history"

  -- Provenance: where this rule came from
  source_case TEXT,                    -- Case identifier where pattern was first observed
  source_document TEXT,                -- Specific document that triggered human observation
  source_observation TEXT,             -- What the human noticed that the system missed
  cataloged_by TEXT,                   -- Who identified the pattern
  cataloged_at TEXT NOT NULL DEFAULT (datetime('now')),

  -- Rule lifecycle
  version INTEGER NOT NULL DEFAULT 1,
  is_active INTEGER NOT NULL DEFAULT 1,
  times_fired INTEGER NOT NULL DEFAULT 0,  -- How many times this rule has produced a finding
  last_fired_at TEXT,
  false_positive_count INTEGER NOT NULL DEFAULT 0,  -- Track accuracy
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Fast lookup by citizen
CREATE INDEX IF NOT EXISTS idx_detection_citizen ON detection_rules(citizen_name);
-- Fast lookup by active status
CREATE INDEX IF NOT EXISTS idx_detection_active ON detection_rules(is_active);
-- Find rules that have never fired (may be too narrow or broken)
CREATE INDEX IF NOT EXISTS idx_detection_unfired ON detection_rules(times_fired);


-- =============================================================================
-- DETECTION RULE AUDIT LOG: every time a rule fires
-- =============================================================================

CREATE TABLE IF NOT EXISTS detection_rule_log (
  id TEXT PRIMARY KEY,
  rule_id TEXT NOT NULL REFERENCES detection_rules(id),
  citizen_name TEXT NOT NULL,
  document_id TEXT,                    -- Which document triggered the rule
  case_id TEXT,                        -- Which case the document belongs to
  finding_text TEXT NOT NULL,          -- The actual finding generated
  conditions_matched TEXT NOT NULL,    -- JSON: which conditions were true
  severity TEXT NOT NULL,
  confirmed_by_human INTEGER DEFAULT 0,  -- 1 = human verified, 0 = unreviewed
  false_positive INTEGER DEFAULT 0,      -- 1 = human marked as false positive
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_rule_log_rule ON detection_rule_log(rule_id);
CREATE INDEX IF NOT EXISTS idx_rule_log_case ON detection_rule_log(case_id);
CREATE INDEX IF NOT EXISTS idx_rule_log_confirmed ON detection_rule_log(confirmed_by_human);


-- =============================================================================
-- SEED: Initial detection rules from Phase 1 Family Law audit
-- These 7 rules were identified by human review of OPD 09-011438
-- and OPD 09-040089 on April 1, 2026.
-- =============================================================================

INSERT OR IGNORE INTO detection_rules (id, citizen_name, rule_name, rule_description, severity, trigger_conditions, finding_template, governing_standard, source_case, source_document, source_observation, cataloged_by) VALUES
(
  'rule-001',
  'Forensic Police Report Auditor / Shadow Incident Analyst',
  'ROLE_REVERSAL_DETECTION',
  'Same person appears as VICTIM in one report and SUSPECT in another at the same address. Flags potential retaliatory filing or narrative manipulation.',
  'HIGH',
  '["same_person_name_or_dob_match", "same_address", "role_in_report_a != role_in_report_b", "reports_within_12_months"]',
  'Person {name} was listed as {role_a} in {report_a} ({date_a}) and as {role_b} in {report_b} ({date_b}) at the same address. Role reversal detected — verify dominant aggressor determination and cross-reference both reports.',
  'PC 13701(b) — prior DV history consideration mandatory for dominant aggressor determination',
  'FamilyLaw RF09456481',
  'OPD 09-011438 + OPD 09-040089',
  'Michael was VICTIM in Feb 2009, SUSPECT in June 2009. Same address. Different officers. Neither report references the other.',
  'Michael Hartmann / Vernen Legal Compliance'
),
(
  'rule-002',
  'Forensic Police Report Auditor / Shadow Incident Analyst',
  'RETALIATORY_FILING_PATTERN',
  'DV report filed within 72 hours of the reporting party being served with a restraining order or other adverse court action. Flags potential retaliatory or strategic filing.',
  'HIGH',
  '["dv_report_filed", "reporting_party_served_with_court_order_within_72hrs", "delay_between_alleged_incident_and_report > 48hrs"]',
  'DV report {report_id} was filed on {report_date}, {days} days after the alleged incident on {incident_date}. The reporting party was served with {court_order} on {service_date} — {hours} hours before filing the report. Pattern consistent with retaliatory filing.',
  'PC 13701 — officer must consider totality of circumstances including litigation context; Evidence Code 352 — probative value vs prejudicial effect',
  'FamilyLaw RF09456481',
  'OPD 09-040089',
  'Christina served with TRO June 10. Filed felony DV report June 11 for an incident from June 5 — 6-day delay.',
  'Michael Hartmann / Vernen Legal Compliance'
),
(
  'rule-003',
  'Forensic Police Report Auditor / Shadow Incident Analyst',
  'ASYMMETRIC_EVIDENCE_COLLECTION',
  'Same department handles DV reports involving the same parties but collects evidence in one case and not the other. Flags differential treatment.',
  'HIGH',
  '["same_department", "same_parties", "same_crime_category", "photos_collected_in_one_not_other OR evidence_items_differ_by_more_than_3"]',
  'Department {dept} collected {evidence_count_a} evidence items for {victim_a} in {report_a} but {evidence_count_b} evidence items for {victim_b} in {report_b}. Same parties, same crime category, same department. Asymmetric evidence collection detected.',
  'PC 13701 — mandatory evidence documentation standards apply equally regardless of victim identity; POST DV Response Guidelines',
  'FamilyLaw RF09456481',
  'OPD 09-011438 (0 photos) vs OPD 09-040089 (10 photos)',
  'Michael as victim: zero photos. Christina as victim: 10 photos. Same department, same address, 4 months apart.',
  'Michael Hartmann / Vernen Legal Compliance'
),
(
  'rule-004',
  'Forensic Police Report Auditor / Shadow Incident Analyst',
  'SHADOW_INCIDENT_ESCALATION',
  'A shadow incident (event mentioned but no record) is corroborated by a party admission in a later document. Escalate from SHADOW to CONFIRMED.',
  'CRITICAL',
  '["shadow_incident_exists", "later_document_contains_party_admission_confirming_event", "admission_is_from_party_who_would_know"]',
  'Shadow Incident {si_id} ({event_description}) was flagged in {original_document}. It is now CONFIRMED by party admission in {confirming_document}: {party_name} stated {admission_text}. Escalate to CONFIRMED — event occurred, official record still missing.',
  'Brady v. Maryland 373 US 83 — confirmed missing exculpatory evidence; PC 13730 — confirmed DV call with no report',
  'FamilyLaw RF09456481',
  'OPD 09-040089 page 5',
  'Christina stated in June report that Michael called OPD on June 4, she was suicidal, officers/EMTs came, she was hospitalized. No OPD report exists for June 4.',
  'Michael Hartmann / Vernen Legal Compliance'
),
(
  'rule-005',
  'Forensic Police Report Auditor / Shadow Incident Analyst',
  'INITIATIVE_MAPPING',
  'Track who contacted law enforcement and for what purpose across the case. Build a pattern showing help-seeking vs leverage-seeking behavior.',
  'MODERATE',
  '["multiple_police_contacts_same_parties", "contact_purpose_differs_between_parties"]',
  'Law enforcement contact initiative map: {party_a} contacted police {count_a} times (purposes: {purposes_a}). {party_b} contacted police {count_b} times (purposes: {purposes_b}). Pattern: {party_a} = {pattern_a}, {party_b} = {pattern_b}.',
  'PC 13701(b) — dominant aggressor determination includes consideration of who is the primary aggressor over time',
  'FamilyLaw RF09456481',
  'OPD 09-011438 + OPD 09-040089',
  'Michael called for Christinas welfare (suicide), called 911 after being struck. Christina called for civil standby, then filed DV report during standby. Different purposes.',
  'Michael Hartmann / Vernen Legal Compliance'
),
(
  'rule-006',
  'Forensic Police Report Auditor / Shadow Incident Analyst',
  'COURT_ORDER_CONTRADICTION',
  'Active court findings about a party are contradicted by a new police report involving that same party. The report ignores or contradicts what the court has already determined.',
  'CRITICAL',
  '["active_court_order_exists", "court_order_contains_findings_about_party", "new_police_report_lists_same_party_in_contradictory_role", "report_does_not_reference_court_order"]',
  'Court order {order_id} ({order_date}) found {party_name} has a history of {court_findings}. Police report {report_id} ({report_date}) lists {party_name} as {report_role} with no reference to the active court order or its findings. Court order contradiction detected.',
  'Family Code 6380 — law enforcement must check CLETS for active DVROs; PC 13710 — restraining order verification mandatory',
  'FamilyLaw RF09456481',
  'DV-145 court findings vs OPD 09-040089',
  'Court found Christina has history of DV, child abuse, not cooperating, taking children, criminal record. Three days later police report lists her as DV victim with no reference to TRO or court findings.',
  'Michael Hartmann / Vernen Legal Compliance'
),
(
  'rule-007',
  'Forensic Police Report Auditor / Shadow Incident Analyst',
  'SELF_HARM_INJURY_PROXIMITY',
  'Documented self-harm occurs within temporal proximity to a DV injury claim. Flag for investigation — injuries may have alternative source.',
  'HIGH',
  '["documented_self_harm_event", "dv_injury_claim_within_14_days", "injury_locations_overlap_with_self_harm_description"]',
  'Self-harm documented on {self_harm_date} ({self_harm_description}). DV injury claim on {injury_date} ({injury_description}). Temporal proximity: {days} days. Injury locations {overlap_or_not} with documented self-harm areas. Flag for further investigation — injuries may have alternative source.',
  'Evidence Code 210 — relevance includes any tendency to prove or disprove any disputed fact; PC 13701 — officer must determine dominant aggressor considering all circumstances',
  'FamilyLaw RF09456481',
  'DV-100 (June 8 declaration) + OPD 09-040089',
  'Michael declared June 8 that Christina cut at her stomach and wrists with a knife and sliced across both forearms. June 11 report documents bruises on both legs and arms. Self-harm 3-6 days before injury claim.',
  'Michael Hartmann / Vernen Legal Compliance'
);

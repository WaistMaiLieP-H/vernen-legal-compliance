-- seed-035-delator-routing.sql
-- Register DELATOR (Council Seat 5 — Qui Tam Relator's Attorney) into D1
-- Sources: 31 USC §§ 3729-3733; Escobar 579 US 176 (2016); 26 USC § 7623(b);
--          Cal. Gov. Code §§ 12650-12656; 15 USC § 78u-6
-- Filed: 2026-04-20

-- ── citizen_catalog ───────────────────────────────────────────────────────────

INSERT OR IGNORE INTO citizen_catalog (
  citizen_name, display_name, description, primary_jurisdiction,
  status, council_seat, council_total
) VALUES (
  'DELATOR',
  'Qui Tam Relator''s Attorney',
  'False Claims Act qui tam specialist. Files sealed complaints under 31 USC § 3730(b) on behalf of the United States. Applies Escobar implied certification theory. Manages DOJ relationship during 60-day seal period. Handles § 3730(h) anti-retaliation claims and coordinates IRS § 7623 and SEC § 78u-6 whistleblower programs. Council Seat 5 of 7.',
  'FEDERAL',
  'ACTIVE',
  5,
  7
);

-- ── citizen_skills ────────────────────────────────────────────────────────────

INSERT OR IGNORE INTO citizen_skills (
  citizen_name, skill_slug, skill_name, skill_type, governing_standards
) VALUES (
  'DELATOR',
  'fca-qui-tam-filing',
  'False Claims Act Qui Tam Filing',
  'LITIGATION',
  '["31 USC § 3730(b)", "31 USC § 3729", "31 USC § 3730(d)", "31 USC § 3731", "31 USC § 3732", "Universal Health Services v. United States ex rel. Escobar, 579 US 176 (2016)", "Vermont Agency of Natural Resources v. United States ex rel. Stevens, 529 US 765 (2000)"]'
);

INSERT OR IGNORE INTO citizen_skills (
  citizen_name, skill_slug, skill_name, skill_type, governing_standards
) VALUES (
  'DELATOR',
  'fca-anti-retaliation',
  'FCA Anti-Retaliation — 31 USC § 3730(h)',
  'LITIGATION',
  '["31 USC § 3730(h)(1)", "31 USC § 3730(h)(2)"]'
);

INSERT OR IGNORE INTO citizen_skills (
  citizen_name, skill_slug, skill_name, skill_type, governing_standards
) VALUES (
  'DELATOR',
  'irs-whistleblower-claim',
  'IRS Whistleblower Program — 26 USC § 7623(b)',
  'LITIGATION',
  '["26 USC § 7623(b)", "IRS Revenue Procedure 2012-14"]'
);

INSERT OR IGNORE INTO citizen_skills (
  citizen_name, skill_slug, skill_name, skill_type, governing_standards
) VALUES (
  'DELATOR',
  'ca-fca-qui-tam-filing',
  'California False Claims Act — Cal. Gov. Code §§ 12650-12656',
  'LITIGATION',
  '["Cal. Government Code § 12652", "Cal. Government Code § 12653", "Cal. Government Code § 12654", "Cal. Government Code § 12655"]'
);

INSERT OR IGNORE INTO citizen_skills (
  citizen_name, skill_slug, skill_name, skill_type, governing_standards
) VALUES (
  'DELATOR',
  'fraud-pattern-synthesis',
  'Fraud Pattern Synthesis — FCA Predicate Mapping',
  'ANALYSIS',
  '["31 USC § 3729(a)(1)(A)", "31 USC § 3729(a)(1)(B)", "31 USC § 3729(a)(1)(G)", "Universal Health Services v. United States ex rel. Escobar, 579 US 176 (2016)"]'
);

-- ── citizen_routing_index ─────────────────────────────────────────────────────

INSERT OR IGNORE INTO citizen_routing_index (
  doc_type, jurisdiction, category, citizen_name, skill_slug, priority
) VALUES
  ('qui-tam-complaint',           'FEDERAL', 'Qui Tam',           'DELATOR', 'fca-qui-tam-filing',      99),
  ('fca-sealed-complaint',        'FEDERAL', 'Qui Tam',           'DELATOR', 'fca-qui-tam-filing',      99),
  ('fca-disclosure',              'FEDERAL', 'Qui Tam',           'DELATOR', 'fca-qui-tam-filing',      99),
  ('relator-disclosure-statement','FEDERAL', 'Qui Tam',           'DELATOR', 'fca-qui-tam-filing',      99),
  ('false-claims-complaint',      'FEDERAL', 'Qui Tam',           'DELATOR', 'fca-qui-tam-filing',      95),
  ('whistleblower-complaint',     'FEDERAL', 'Whistleblower',     'DELATOR', 'fca-anti-retaliation',    95),
  ('anti-retaliation-filing',     'FEDERAL', 'Whistleblower',     'DELATOR', 'fca-anti-retaliation',    99),
  ('retaliation-complaint',       'FEDERAL', 'Whistleblower',     'DELATOR', 'fca-anti-retaliation',    90),
  ('irs-form-211',                'FEDERAL', 'IRS Whistleblower', 'DELATOR', 'irs-whistleblower-claim', 99),
  ('sec-whistleblower-tip',       'FEDERAL', 'SEC Whistleblower', 'DELATOR', 'irs-whistleblower-claim', 99),
  ('dol-form-5500',               'FEDERAL', 'Pension/ERISA',     'DELATOR', 'fraud-pattern-synthesis', 90),
  ('medicare-billing-record',     'FEDERAL', 'Healthcare Fraud',  'DELATOR', 'fraud-pattern-synthesis', 85),
  ('medi-cal-claim',              'CA',      'Healthcare Fraud',  'DELATOR', 'ca-fca-qui-tam-filing',   85),
  ('cms-1500',                    'FEDERAL', 'Healthcare Fraud',  'DELATOR', 'fraud-pattern-synthesis', 85),
  ('upcoding-complaint',          'FEDERAL', 'Healthcare Fraud',  'DELATOR', 'fraud-pattern-synthesis', 90),
  ('healthcare-fraud-referral',   'FEDERAL', 'Healthcare Fraud',  'DELATOR', 'fraud-pattern-synthesis', 90),
  ('erisa-complaint',             'FEDERAL', 'Pension/ERISA',     'DELATOR', 'fraud-pattern-synthesis', 80),
  ('pension-document',            'FEDERAL', 'Pension/ERISA',     'DELATOR', 'fraud-pattern-synthesis', 80);

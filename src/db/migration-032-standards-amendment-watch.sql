-- migration-032: Standards Amendment Watch
--
-- Adds temporal provenance to every compliance standard:
--   last_verified  — date the citation was confirmed still active law
--   statute_watch_url — canonical URL to monitor for amendments/repeals
--   effective_date — when the cited version of the statute took effect
--   sunset_date    — if known, when the provision expires
--
-- Why now: retroactively adding temporal fields after thousands of
-- standards are in production is expensive; adding them now ensures
-- every standard written from this point forward carries verified provenance.
-- Standards without last_verified are flagged as "unverified" by TEMPORIS.

ALTER TABLE compliance_rules ADD COLUMN last_verified TEXT;
ALTER TABLE compliance_rules ADD COLUMN statute_watch_url TEXT;
ALTER TABLE compliance_rules ADD COLUMN sunset_date TEXT;

-- Index for TEMPORIS to efficiently find stale standards (not verified in 90 days)
CREATE INDEX IF NOT EXISTS idx_rules_last_verified ON compliance_rules(last_verified);
CREATE INDEX IF NOT EXISTS idx_rules_sunset ON compliance_rules(sunset_date);

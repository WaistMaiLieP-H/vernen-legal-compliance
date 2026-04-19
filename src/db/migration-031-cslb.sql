-- Migration 031: CSLB (California Contractors State License Board) lead table
-- Source: cslb.ca.gov Public Data Portal — MasterLicenseData.csv (Tier 2 bulk extract)
-- Ingest path: scripts/ingest-cslb.cjs (Node, runs locally) — NOT a Worker pipeline
-- Worker side only reads/queries this table (consistent with other lead tables).

CREATE TABLE IF NOT EXISTS cslb_leads (
    license_no TEXT PRIMARY KEY,
    business_name TEXT NOT NULL,
    full_business_name TEXT,
    business_type TEXT,
    mailing_address TEXT,
    city TEXT,
    state TEXT DEFAULT 'CA',
    county TEXT,
    zip_code TEXT,
    business_phone TEXT,
    issue_date TEXT,
    reissue_date TEXT,
    expiration_date TEXT,
    inactivation_date TEXT,
    reactivation_date TEXT,
    primary_status TEXT,
    secondary_status TEXT,
    pending_suspension TEXT,
    pending_class_removal TEXT,
    pending_class_replace TEXT,
    classifications TEXT,
    asbestos_reg TEXT,
    wc_coverage_type TEXT,
    wc_insurance_company TEXT,
    wc_effective_date TEXT,
    wc_expiration_date TEXT,
    wc_cancellation_date TEXT,
    wc_suspend_date TEXT,
    cb_surety_company TEXT,
    cb_amount REAL DEFAULT 0,
    cb_effective_date TEXT,
    cb_cancellation_date TEXT,
    db_surety_company TEXT,
    db_number TEXT,
    db_amount REAL DEFAULT 0,
    db_effective_date TEXT,
    db_cancellation_date TEXT,
    db_bond_reason TEXT,
    db_case_no TEXT,
    discp_case_region TEXT,
    risk_score INTEGER DEFAULT 0,
    risk_categories TEXT DEFAULT '[]',
    last_update TEXT,
    ingested_at TEXT NOT NULL DEFAULT (datetime('now')),
    status TEXT DEFAULT 'new'
);

CREATE INDEX IF NOT EXISTS idx_cslb_leads_zip ON cslb_leads(zip_code);
CREATE INDEX IF NOT EXISTS idx_cslb_leads_city ON cslb_leads(city);
CREATE INDEX IF NOT EXISTS idx_cslb_leads_county ON cslb_leads(county);
CREATE INDEX IF NOT EXISTS idx_cslb_leads_business_name ON cslb_leads(business_name);
CREATE INDEX IF NOT EXISTS idx_cslb_leads_primary_status ON cslb_leads(primary_status);
CREATE INDEX IF NOT EXISTS idx_cslb_leads_risk_score ON cslb_leads(risk_score DESC);
CREATE INDEX IF NOT EXISTS idx_cslb_leads_db_case ON cslb_leads(db_case_no) WHERE db_case_no IS NOT NULL AND db_case_no != '';

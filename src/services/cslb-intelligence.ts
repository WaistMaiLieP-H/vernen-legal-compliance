/**
 * CSLB Intelligence — California Contractors State License Board
 *
 * Source: https://www.cslb.ca.gov/Onlineservices/DataPortal/ContractorList
 * Bulk file: MasterLicenseData.csv (Tier 2 — public, free, refreshed regularly)
 * Direct URL: https://www.cslb.ca.gov/OnlineServices/DataPortal/DownLoadFile.ashx?fName=MasterLicenseData&type=C
 *
 * ARCHITECTURE NOTE:
 * Unlike the federal Wave 1-6 pipelines (which fetch JSON APIs from inside the
 * Worker), CSLB is a bulk-CSV source. The download is hundreds of MB and cannot
 * be parsed inside a Worker invocation (memory + CPU + subrequest limits).
 *
 * Therefore CSLB uses a TWO-MODE pipeline:
 *   - Ingest mode: scripts/ingest-cslb.cjs runs locally (Node), downloads the
 *     CSV, parses + scores rows, and bulk-inserts into cslb_leads via wrangler.
 *   - Query mode: this Worker-side service reads/queries cslb_leads only.
 *
 * The orchestrator (pipeline-orchestrator.ts) treats cslb_leads identically to
 * any other lead table — it just selects rows and forwards to the failure
 * taxonomy. The orchestrator never fetches CSLB data itself; the script does.
 *
 * This is the reference implementation for all future bulk-file pipelines
 * (ABC daily CSV, DCA Box files, etc.).
 */

// ═══════════════════════════════════════════════════════════════════════════
// Constants
// ═══════════════════════════════════════════════════════════════════════════

export const CSLB_BULK_DOWNLOAD_URL =
  "https://www.cslb.ca.gov/OnlineServices/DataPortal/DownLoadFile.ashx?fName=MasterLicenseData&type=C";

export const CSLB_PERSONNEL_URL =
  "https://www.cslb.ca.gov/OnlineServices/DataPortal/DownLoadFile.ashx?fName=PersonnelData&type=C";

export const CSLB_WORKERS_COMP_URL =
  "https://www.cslb.ca.gov/OnlineServices/DataPortal/DownLoadFile.ashx?fName=WorkersCompData&type=C";

/** CSV column headers as published by CSLB. Order matters. */
export const CSLB_CSV_HEADERS = [
  "LicenseNo", "LastUpdate", "BusinessName", "BUS-NAME-2", "FullBusinessName",
  "MailingAddress", "City", "State", "County", "ZIPCode", "country",
  "BusinessPhone", "BusinessType", "IssueDate", "ReissueDate", "ExpirationDate",
  "InactivationDate", "ReactivationDate", "PendingSuspension",
  "PendingClassRemoval", "PendingClassReplace", "PrimaryStatus",
  "SecondaryStatus", "Classifications(s)", "AsbestosReg",
  "WorkersCompCoverageType", "WCInsuranceCompany", "WCPolicyNumber",
  "WCEffectiveDate", "WCExpirationDate", "WCCancellationDate", "WCSuspendDate",
  "CBSuretyCompany", "CBNumber", "CBEffectiveDate", "CBCancellationDate",
  "CBAmount", "WBSuretyCompany", "WBNumber", "WBEffectiveDate",
  "WBCancellationDate", "WBAmount", "DBSuretyCompany", "DBNumber",
  "DBEffectiveDate", "DBCancellationDate", "DBAmount", "DateRequired",
  "DiscpCaseRegion", "DBBondReason", "DBCaseNo", "NAME-TP-2",
] as const;

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface CSLBContractor {
  licenseNo: string;
  businessName: string;
  fullBusinessName: string;
  businessType: string;
  mailingAddress: string;
  city: string;
  state: string;
  county: string;
  zipCode: string;
  businessPhone: string;
  issueDate: string;
  expirationDate: string;
  inactivationDate: string;
  reactivationDate: string;
  primaryStatus: string;
  secondaryStatus: string;
  pendingSuspension: string;
  pendingClassRemoval: string;
  pendingClassReplace: string;
  classifications: string;
  asbestosReg: string;
  wcCoverageType: string;
  wcInsuranceCompany: string;
  wcEffectiveDate: string;
  wcExpirationDate: string;
  wcCancellationDate: string;
  wcSuspendDate: string;
  cbSuretyCompany: string;
  cbAmount: number;
  dbSuretyCompany: string;
  dbNumber: string;
  dbAmount: number;
  dbBondReason: string;
  dbCaseNo: string;
  discpCaseRegion: string;
  lastUpdate: string;
}

export interface CSLBComplianceLead {
  contractor: CSLBContractor;
  riskScore: number;       // 0-100
  riskCategories: string[];
}

export interface CSLBSearchFilters {
  zipCode?: string;
  city?: string;
  county?: string;
  businessName?: string;     // partial match
  primaryStatus?: string;
  classification?: string;   // e.g. "C-8"
  minRiskScore?: number;
  hasDisciplinaryBond?: boolean;
  limit?: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// Risk Scoring — operates on a parsed CSLBContractor row
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Score a CSLB contractor 0-100 based on public-record risk indicators.
 * Pure function — no I/O, used by both the ingest script and Worker queries.
 *
 * Scoring rationale (compounding, capped at 100):
 *   +40  disciplinary bond ever filed (DBSuretyCompany or DBCaseNo present)
 *   +25  workers' comp suspended (WCSuspendDate present)
 *   +20  workers' comp cancelled (WCCancellationDate present)
 *   +15  pending suspension flag set
 *   +15  primary status not CLEAR
 *   +10  pending classification removal
 *   +10  pending classification replacement
 *   +10  expiration date in past (license lapsed but renewable)
 *   +5   asbestos registration without WC coverage
 */
export function scoreContractor(c: CSLBContractor): {
  score: number;
  categories: string[];
} {
  let score = 0;
  const categories: string[] = [];

  if (nonEmpty(c.dbSuretyCompany) || nonEmpty(c.dbCaseNo) || nonEmpty(c.dbNumber)) {
    score += 40;
    categories.push("DISCIPLINARY_BOND");
  }
  if (nonEmpty(c.wcSuspendDate)) {
    score += 25;
    categories.push("WC_SUSPENDED");
  }
  if (nonEmpty(c.wcCancellationDate)) {
    score += 20;
    categories.push("WC_CANCELLED");
  }
  if (nonEmpty(c.pendingSuspension)) {
    score += 15;
    categories.push("PENDING_SUSPENSION");
  }
  if (nonEmpty(c.primaryStatus) && c.primaryStatus.toUpperCase() !== "CLEAR") {
    score += 15;
    categories.push(`STATUS_${c.primaryStatus.toUpperCase().replace(/\s+/g, "_")}`);
  }
  if (nonEmpty(c.pendingClassRemoval)) {
    score += 10;
    categories.push("PENDING_CLASS_REMOVAL");
  }
  if (nonEmpty(c.pendingClassReplace)) {
    score += 10;
    categories.push("PENDING_CLASS_REPLACE");
  }
  if (isPastDate(c.expirationDate)) {
    score += 10;
    categories.push("LICENSE_EXPIRED");
  }
  if (nonEmpty(c.asbestosReg) && !nonEmpty(c.wcCoverageType)) {
    score += 5;
    categories.push("ASBESTOS_NO_WC");
  }

  return { score: Math.min(score, 100), categories };
}

// ═══════════════════════════════════════════════════════════════════════════
// D1 Storage
// ═══════════════════════════════════════════════════════════════════════════

export async function ensureCSLBTables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare(
      "CREATE TABLE IF NOT EXISTS cslb_leads (" +
      "license_no TEXT PRIMARY KEY," +
      "business_name TEXT NOT NULL," +
      "full_business_name TEXT," +
      "business_type TEXT," +
      "mailing_address TEXT," +
      "city TEXT," +
      "state TEXT DEFAULT 'CA'," +
      "county TEXT," +
      "zip_code TEXT," +
      "business_phone TEXT," +
      "issue_date TEXT," +
      "reissue_date TEXT," +
      "expiration_date TEXT," +
      "inactivation_date TEXT," +
      "reactivation_date TEXT," +
      "primary_status TEXT," +
      "secondary_status TEXT," +
      "pending_suspension TEXT," +
      "pending_class_removal TEXT," +
      "pending_class_replace TEXT," +
      "classifications TEXT," +
      "asbestos_reg TEXT," +
      "wc_coverage_type TEXT," +
      "wc_insurance_company TEXT," +
      "wc_effective_date TEXT," +
      "wc_expiration_date TEXT," +
      "wc_cancellation_date TEXT," +
      "wc_suspend_date TEXT," +
      "cb_surety_company TEXT," +
      "cb_amount REAL DEFAULT 0," +
      "cb_effective_date TEXT," +
      "cb_cancellation_date TEXT," +
      "db_surety_company TEXT," +
      "db_number TEXT," +
      "db_amount REAL DEFAULT 0," +
      "db_effective_date TEXT," +
      "db_cancellation_date TEXT," +
      "db_bond_reason TEXT," +
      "db_case_no TEXT," +
      "discp_case_region TEXT," +
      "risk_score INTEGER DEFAULT 0," +
      "risk_categories TEXT DEFAULT '[]'," +
      "last_update TEXT," +
      "ingested_at TEXT NOT NULL DEFAULT (datetime('now'))," +
      "status TEXT DEFAULT 'new')"
    ),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_cslb_leads_zip ON cslb_leads(zip_code)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_cslb_leads_city ON cslb_leads(city)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_cslb_leads_county ON cslb_leads(county)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_cslb_leads_business_name ON cslb_leads(business_name)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_cslb_leads_primary_status ON cslb_leads(primary_status)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_cslb_leads_risk_score ON cslb_leads(risk_score DESC)"),
  ]);
}

/** Search stored leads with filters. Used by ZIP dossier and direct lookups. */
export async function searchStoredLeads(
  db: D1Database,
  filters: CSLBSearchFilters
): Promise<Record<string, unknown>[]> {
  let query = "SELECT * FROM cslb_leads WHERE 1=1";
  const binds: unknown[] = [];

  if (filters.zipCode) {
    query += " AND zip_code = ?";
    binds.push(filters.zipCode);
  }
  if (filters.city) {
    query += " AND UPPER(city) = ?";
    binds.push(filters.city.toUpperCase());
  }
  if (filters.county) {
    query += " AND UPPER(county) = ?";
    binds.push(filters.county.toUpperCase());
  }
  if (filters.businessName) {
    query += " AND (UPPER(business_name) LIKE ? OR UPPER(full_business_name) LIKE ?)";
    const pat = `%${filters.businessName.toUpperCase()}%`;
    binds.push(pat, pat);
  }
  if (filters.primaryStatus) {
    query += " AND primary_status = ?";
    binds.push(filters.primaryStatus);
  }
  if (filters.classification) {
    query += " AND classifications LIKE ?";
    binds.push(`%${filters.classification}%`);
  }
  if (typeof filters.minRiskScore === "number") {
    query += " AND risk_score >= ?";
    binds.push(filters.minRiskScore);
  }
  if (filters.hasDisciplinaryBond) {
    query += " AND db_case_no IS NOT NULL AND db_case_no != ''";
  }

  query += " ORDER BY risk_score DESC, business_name ASC";
  query += " LIMIT ?";
  binds.push(filters.limit ?? 100);

  const result = await db.prepare(query).bind(...binds).all();
  return (result.results ?? []) as Record<string, unknown>[];
}

/**
 * Lookup a single contractor by exact license number.
 * Returns null if not found.
 */
export async function getContractorByLicense(
  db: D1Database,
  licenseNo: string
): Promise<Record<string, unknown> | null> {
  const result = await db.prepare(
    "SELECT * FROM cslb_leads WHERE license_no = ? LIMIT 1"
  ).bind(licenseNo).first();
  return (result as Record<string, unknown> | null) ?? null;
}

/**
 * Per-ZIP summary used by the ZIP dossier orchestrator.
 * Returns count of contractors and risk distribution for a ZIP.
 */
export async function summarizeZip(
  db: D1Database,
  zipCode: string
): Promise<{
  zipCode: string;
  totalContractors: number;
  highRiskCount: number;
  disciplinaryBondCount: number;
  expiredLicenseCount: number;
  topClassifications: string[];
}> {
  const row = await db.prepare(
    "SELECT " +
    "  COUNT(*) AS total, " +
    "  SUM(CASE WHEN risk_score >= 50 THEN 1 ELSE 0 END) AS high_risk, " +
    "  SUM(CASE WHEN db_case_no IS NOT NULL AND db_case_no != '' THEN 1 ELSE 0 END) AS db_bond, " +
    "  SUM(CASE WHEN UPPER(primary_status) != 'CLEAR' THEN 1 ELSE 0 END) AS not_clear " +
    "FROM cslb_leads WHERE zip_code = ?"
  ).bind(zipCode).first<{
    total: number;
    high_risk: number;
    db_bond: number;
    not_clear: number;
  }>();

  const classRows = await db.prepare(
    "SELECT classifications, COUNT(*) AS cnt FROM cslb_leads " +
    "WHERE zip_code = ? AND classifications IS NOT NULL AND classifications != '' " +
    "GROUP BY classifications ORDER BY cnt DESC LIMIT 5"
  ).bind(zipCode).all<{ classifications: string; cnt: number }>();

  return {
    zipCode,
    totalContractors: Number(row?.total ?? 0),
    highRiskCount: Number(row?.high_risk ?? 0),
    disciplinaryBondCount: Number(row?.db_bond ?? 0),
    expiredLicenseCount: Number(row?.not_clear ?? 0),
    topClassifications: (classRows.results ?? []).map((r) => r.classifications),
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// Helpers — pure, no I/O
// ═══════════════════════════════════════════════════════════════════════════

function nonEmpty(s: string | undefined | null): boolean {
  return typeof s === "string" && s.trim().length > 0;
}

function isPastDate(dateStr: string | undefined | null): boolean {
  if (!nonEmpty(dateStr)) return false;
  // CSLB format: MM/DD/YYYY
  const parts = (dateStr as string).split("/");
  if (parts.length !== 3) return false;
  const month = Number(parts[0]);
  const day = Number(parts[1]);
  const year = Number(parts[2]);
  if (!month || !day || !year) return false;
  const d = new Date(year, month - 1, day);
  return d.getTime() < Date.now();
}

/**
 * Map a CSLB CSV row (array of strings, in CSLB_CSV_HEADERS order) to a typed
 * CSLBContractor object. Used by the ingest script and any future runtime
 * parser. Pure function — no I/O.
 */
export function rowToContractor(row: string[]): CSLBContractor | null {
  if (row.length < CSLB_CSV_HEADERS.length) return null;
  const get = (i: number): string => (row[i] ?? "").trim();
  const num = (i: number): number => {
    const v = parseFloat(get(i));
    return Number.isFinite(v) ? v : 0;
  };

  const licenseNo = get(0);
  if (!licenseNo) return null;

  return {
    licenseNo,
    lastUpdate: get(1),
    businessName: get(2),
    fullBusinessName: get(4),
    mailingAddress: get(5),
    city: get(6),
    state: get(7),
    county: get(8),
    zipCode: get(9),
    businessPhone: get(11),
    businessType: get(12),
    issueDate: get(13),
    expirationDate: get(15),
    inactivationDate: get(16),
    reactivationDate: get(17),
    pendingSuspension: get(18),
    pendingClassRemoval: get(19),
    pendingClassReplace: get(20),
    primaryStatus: get(21),
    secondaryStatus: get(22),
    classifications: get(23),
    asbestosReg: get(24),
    wcCoverageType: get(25),
    wcInsuranceCompany: get(26),
    wcEffectiveDate: get(28),
    wcExpirationDate: get(29),
    wcCancellationDate: get(30),
    wcSuspendDate: get(31),
    cbSuretyCompany: get(32),
    cbAmount: num(36),
    dbSuretyCompany: get(42),
    dbNumber: get(43),
    dbAmount: num(46),
    dbBondReason: get(49),
    dbCaseNo: get(50),
    discpCaseRegion: get(48),
  };
}

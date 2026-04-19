#!/usr/bin/env node
/**
 * CSLB Bulk Ingest Script — runs locally with Node, not in a Worker.
 *
 * Downloads MasterLicenseData.csv from cslb.ca.gov, parses, scores, filters,
 * and bulk-inserts into the cslb_leads D1 table via wrangler.
 *
 * Why this is a script and not a Worker pipeline:
 *   The CSLB master file is hundreds of MB. Worker memory/CPU/subrequest
 *   limits make in-Worker ingestion impractical. Two-mode pipeline pattern:
 *     - Ingest (this script): heavy, scheduled, runs anywhere with Node
 *     - Query (Worker via cslb-intelligence.ts): light, serves dossier API
 *
 * USAGE:
 *   node scripts/ingest-cslb.cjs --filter risk          (default — high-risk only)
 *   node scripts/ingest-cslb.cjs --filter zip:94510      (single zip)
 *   node scripts/ingest-cslb.cjs --filter zip:94510,94534
 *   node scripts/ingest-cslb.cjs --filter all            (everything — large)
 *   node scripts/ingest-cslb.cjs --dry-run               (parse only, no DB write)
 *   node scripts/ingest-cslb.cjs --local                 (local D1 instead of remote)
 *
 * REQUIREMENTS:
 *   - wrangler installed and authenticated (npx wrangler login)
 *   - Run from the platform/ directory
 */

const fs = require("fs");
const path = require("path");
const https = require("https");
const { execSync } = require("child_process");
const os = require("os");

// ═══════════════════════════════════════════════════════════════════════════
// Constants — keep in sync with src/services/cslb-intelligence.ts
// ═══════════════════════════════════════════════════════════════════════════

const CSLB_URL =
  "https://www.cslb.ca.gov/OnlineServices/DataPortal/DownLoadFile.ashx?fName=MasterLicenseData&type=C";

const D1_DB_NAME = "vernen-legal-compliance";
const BATCH_SIZE = 100;       // rows per SQL file submitted to wrangler
const MAX_INSERT_FILE_BYTES = 4 * 1024 * 1024; // safety cap per SQL file

// ═══════════════════════════════════════════════════════════════════════════
// CLI argument parsing
// ═══════════════════════════════════════════════════════════════════════════

function parseArgs(argv) {
  const args = { filter: "risk", dryRun: false, local: false };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dry-run") args.dryRun = true;
    else if (a === "--local") args.local = true;
    else if (a === "--filter" && argv[i + 1]) {
      args.filter = argv[++i];
    }
  }
  return args;
}

// ═══════════════════════════════════════════════════════════════════════════
// Download
// ═══════════════════════════════════════════════════════════════════════════

function downloadCSV(targetPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(targetPath);
    let bytes = 0;
    let lastReport = Date.now();

    console.log(`[CSLB] Downloading from ${CSLB_URL}`);

    https
      .get(CSLB_URL, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`Download failed: HTTP ${res.statusCode}`));
          return;
        }
        const total = parseInt(res.headers["content-length"] || "0", 10);

        res.on("data", (chunk) => {
          bytes += chunk.length;
          const now = Date.now();
          if (now - lastReport > 2000) {
            const mb = (bytes / 1024 / 1024).toFixed(1);
            const pct = total ? ` (${((bytes / total) * 100).toFixed(0)}%)` : "";
            process.stdout.write(`\r[CSLB] Downloaded ${mb} MB${pct}`);
            lastReport = now;
          }
        });

        res.pipe(file);
        file.on("finish", () => {
          file.close();
          process.stdout.write("\n");
          console.log(`[CSLB] Download complete: ${(bytes / 1024 / 1024).toFixed(1)} MB`);
          resolve(bytes);
        });
      })
      .on("error", (err) => {
        fs.unlink(targetPath, () => {});
        reject(err);
      });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// CSV parsing — handles quoted fields, embedded commas, escaped quotes
// ═══════════════════════════════════════════════════════════════════════════

function parseCSVLine(line) {
  const out = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cur += ch;
      }
    } else {
      if (ch === ",") {
        out.push(cur);
        cur = "";
      } else if (ch === '"' && cur === "") {
        inQuotes = true;
      } else {
        cur += ch;
      }
    }
  }
  out.push(cur);
  return out;
}

// ═══════════════════════════════════════════════════════════════════════════
// Row → contractor object (mirror of rowToContractor in cslb-intelligence.ts)
// ═══════════════════════════════════════════════════════════════════════════

function rowToContractor(row) {
  if (row.length < 51) return null;
  const get = (i) => (row[i] || "").trim();
  const num = (i) => {
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
    reissueDate: get(14),
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
    cbEffectiveDate: get(34),
    cbCancellationDate: get(35),
    dbSuretyCompany: get(42),
    dbNumber: get(43),
    dbAmount: num(46),
    dbEffectiveDate: get(44),
    dbCancellationDate: get(45),
    dbBondReason: get(49),
    dbCaseNo: get(50),
    discpCaseRegion: get(48),
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// Risk scoring — mirror of scoreContractor in cslb-intelligence.ts
// ═══════════════════════════════════════════════════════════════════════════

function nonEmpty(s) {
  return typeof s === "string" && s.trim().length > 0;
}

function isPastDate(dateStr) {
  if (!nonEmpty(dateStr)) return false;
  const parts = dateStr.split("/");
  if (parts.length !== 3) return false;
  const m = Number(parts[0]),
    d = Number(parts[1]),
    y = Number(parts[2]);
  if (!m || !d || !y) return false;
  return new Date(y, m - 1, d).getTime() < Date.now();
}

function scoreContractor(c) {
  let score = 0;
  const cats = [];
  if (nonEmpty(c.dbSuretyCompany) || nonEmpty(c.dbCaseNo) || nonEmpty(c.dbNumber)) {
    score += 40;
    cats.push("DISCIPLINARY_BOND");
  }
  if (nonEmpty(c.wcSuspendDate)) {
    score += 25;
    cats.push("WC_SUSPENDED");
  }
  if (nonEmpty(c.wcCancellationDate)) {
    score += 20;
    cats.push("WC_CANCELLED");
  }
  if (nonEmpty(c.pendingSuspension)) {
    score += 15;
    cats.push("PENDING_SUSPENSION");
  }
  if (nonEmpty(c.primaryStatus) && c.primaryStatus.toUpperCase() !== "CLEAR") {
    score += 15;
    cats.push("STATUS_" + c.primaryStatus.toUpperCase().replace(/\s+/g, "_"));
  }
  if (nonEmpty(c.pendingClassRemoval)) {
    score += 10;
    cats.push("PENDING_CLASS_REMOVAL");
  }
  if (nonEmpty(c.pendingClassReplace)) {
    score += 10;
    cats.push("PENDING_CLASS_REPLACE");
  }
  if (isPastDate(c.expirationDate)) {
    score += 10;
    cats.push("LICENSE_EXPIRED");
  }
  if (nonEmpty(c.asbestosReg) && !nonEmpty(c.wcCoverageType)) {
    score += 5;
    cats.push("ASBESTOS_NO_WC");
  }
  return { score: Math.min(score, 100), categories: cats };
}

// ═══════════════════════════════════════════════════════════════════════════
// Filter
// ═══════════════════════════════════════════════════════════════════════════

function buildFilter(filterArg) {
  if (!filterArg || filterArg === "risk") {
    return (c, scored) => scored.score >= 15;
  }
  if (filterArg === "all") {
    return () => true;
  }
  if (filterArg.startsWith("zip:")) {
    const zips = new Set(
      filterArg
        .slice(4)
        .split(",")
        .map((z) => z.trim())
    );
    return (c) => zips.has(c.zipCode);
  }
  console.warn(`[CSLB] Unknown filter "${filterArg}", defaulting to risk`);
  return (c, scored) => scored.score >= 15;
}

// ═══════════════════════════════════════════════════════════════════════════
// SQL escaping + insert builder
// ═══════════════════════════════════════════════════════════════════════════

function sqlEscape(s) {
  if (s === null || s === undefined) return "NULL";
  if (typeof s === "number") return String(s);
  return "'" + String(s).replace(/'/g, "''") + "'";
}

function buildInsertSQL(rows) {
  const cols = [
    "license_no", "business_name", "full_business_name", "business_type",
    "mailing_address", "city", "state", "county", "zip_code", "business_phone",
    "issue_date", "reissue_date", "expiration_date", "inactivation_date",
    "reactivation_date", "primary_status", "secondary_status",
    "pending_suspension", "pending_class_removal", "pending_class_replace",
    "classifications", "asbestos_reg", "wc_coverage_type",
    "wc_insurance_company", "wc_effective_date", "wc_expiration_date",
    "wc_cancellation_date", "wc_suspend_date", "cb_surety_company", "cb_amount",
    "cb_effective_date", "cb_cancellation_date", "db_surety_company",
    "db_number", "db_amount", "db_effective_date", "db_cancellation_date",
    "db_bond_reason", "db_case_no", "discp_case_region", "risk_score",
    "risk_categories", "last_update",
  ];

  const lines = [];
  lines.push(`INSERT OR REPLACE INTO cslb_leads (${cols.join(", ")}) VALUES`);

  const tuples = rows.map((r) => {
    const c = r.contractor;
    const s = r.scored;
    return (
      "(" +
      [
        sqlEscape(c.licenseNo),
        sqlEscape(c.businessName),
        sqlEscape(c.fullBusinessName),
        sqlEscape(c.businessType),
        sqlEscape(c.mailingAddress),
        sqlEscape(c.city),
        sqlEscape(c.state),
        sqlEscape(c.county),
        sqlEscape(c.zipCode),
        sqlEscape(c.businessPhone),
        sqlEscape(c.issueDate),
        sqlEscape(c.reissueDate),
        sqlEscape(c.expirationDate),
        sqlEscape(c.inactivationDate),
        sqlEscape(c.reactivationDate),
        sqlEscape(c.primaryStatus),
        sqlEscape(c.secondaryStatus),
        sqlEscape(c.pendingSuspension),
        sqlEscape(c.pendingClassRemoval),
        sqlEscape(c.pendingClassReplace),
        sqlEscape(c.classifications),
        sqlEscape(c.asbestosReg),
        sqlEscape(c.wcCoverageType),
        sqlEscape(c.wcInsuranceCompany),
        sqlEscape(c.wcEffectiveDate),
        sqlEscape(c.wcExpirationDate),
        sqlEscape(c.wcCancellationDate),
        sqlEscape(c.wcSuspendDate),
        sqlEscape(c.cbSuretyCompany),
        c.cbAmount || 0,
        sqlEscape(c.cbEffectiveDate),
        sqlEscape(c.cbCancellationDate),
        sqlEscape(c.dbSuretyCompany),
        sqlEscape(c.dbNumber),
        c.dbAmount || 0,
        sqlEscape(c.dbEffectiveDate),
        sqlEscape(c.dbCancellationDate),
        sqlEscape(c.dbBondReason),
        sqlEscape(c.dbCaseNo),
        sqlEscape(c.discpCaseRegion),
        s.score,
        sqlEscape(JSON.stringify(s.categories)),
        sqlEscape(c.lastUpdate),
      ].join(", ") +
      ")"
    );
  });

  return lines.join("\n") + "\n" + tuples.join(",\n") + ";\n";
}

function flushBatch(batch, args, batchNum) {
  if (batch.length === 0) return;
  const sql = buildInsertSQL(batch);
  if (sql.length > MAX_INSERT_FILE_BYTES) {
    console.warn(
      `[CSLB] Batch ${batchNum} too large (${sql.length} bytes), splitting in half`
    );
    const half = Math.floor(batch.length / 2);
    flushBatch(batch.slice(0, half), args, batchNum);
    flushBatch(batch.slice(half), args, batchNum);
    return;
  }

  if (args.dryRun) {
    console.log(`[CSLB] [dry-run] would insert batch ${batchNum} (${batch.length} rows, ${sql.length} bytes)`);
    return;
  }

  const tmpPath = path.join(os.tmpdir(), `cslb_batch_${batchNum}_${Date.now()}.sql`);
  fs.writeFileSync(tmpPath, sql);

  const remoteFlag = args.local ? "" : "--remote";
  const cmd = `npx wrangler d1 execute ${D1_DB_NAME} ${remoteFlag} --file=${tmpPath}`;
  try {
    execSync(cmd, { stdio: ["ignore", "pipe", "pipe"] });
    console.log(`[CSLB] inserted batch ${batchNum} (${batch.length} rows)`);
  } catch (e) {
    console.error(`[CSLB] batch ${batchNum} failed:`, e.message);
    throw e;
  } finally {
    fs.unlinkSync(tmpPath);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  const args = parseArgs(process.argv);
  console.log(`[CSLB] config: filter=${args.filter}, dryRun=${args.dryRun}, local=${args.local}`);

  const tmpCsv = path.join(os.tmpdir(), `cslb_master_${Date.now()}.csv`);
  await downloadCSV(tmpCsv);

  const filter = buildFilter(args.filter);
  let parsed = 0;
  let kept = 0;
  let batchNum = 0;
  let batch = [];

  // Streaming line read
  const stream = fs.createReadStream(tmpCsv, { encoding: "utf-8" });
  let buf = "";
  let isFirstLine = true;

  await new Promise((resolve, reject) => {
    stream.on("data", (chunk) => {
      buf += chunk;
      let nl;
      while ((nl = buf.indexOf("\n")) !== -1) {
        const line = buf.slice(0, nl).replace(/\r$/, "");
        buf = buf.slice(nl + 1);
        if (isFirstLine) {
          isFirstLine = false;
          continue; // skip header
        }
        if (!line) continue;

        const cells = parseCSVLine(line);
        const c = rowToContractor(cells);
        if (!c) continue;
        parsed++;
        const scored = scoreContractor(c);
        if (!filter(c, scored)) continue;
        kept++;
        batch.push({ contractor: c, scored });

        if (batch.length >= BATCH_SIZE) {
          batchNum++;
          try {
            flushBatch(batch, args, batchNum);
          } catch (e) {
            stream.destroy();
            reject(e);
            return;
          }
          batch = [];
        }
      }
    });
    stream.on("end", () => {
      // flush trailing line + batch
      if (buf.trim()) {
        const cells = parseCSVLine(buf.trim());
        const c = rowToContractor(cells);
        if (c) {
          parsed++;
          const scored = scoreContractor(c);
          if (filter(c, scored)) {
            kept++;
            batch.push({ contractor: c, scored });
          }
        }
      }
      if (batch.length > 0) {
        batchNum++;
        try {
          flushBatch(batch, args, batchNum);
        } catch (e) {
          reject(e);
          return;
        }
      }
      resolve();
    });
    stream.on("error", reject);
  });

  fs.unlinkSync(tmpCsv);

  console.log(
    `[CSLB] done. parsed=${parsed} kept=${kept} batches=${batchNum} ` +
    `filter=${args.filter} ${args.dryRun ? "(dry-run)" : args.local ? "(local DB)" : "(remote DB)"}`
  );
}

main().catch((e) => {
  console.error("[CSLB] FATAL:", e);
  process.exit(1);
});

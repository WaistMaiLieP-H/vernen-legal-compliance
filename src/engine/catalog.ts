import type { Env } from "../index.js";
import { generateId } from "../utils/helpers.js";
import type { CitizenSpec, WorkerSpec, CatalogEntry } from "./types.js";

// ---------------------------------------------------------------------------
// Database row shape for citizen_catalog table
// ---------------------------------------------------------------------------
interface CatalogRow {
  id: string;
  name: string;
  trademark: string | null;
  domain: string;
  industry: string;
  category: string | null;
  description: string | null;
  derivation: string | null;
  workers: string | null;
  governance_type: string | null;
  capabilities: string | null;
  registered_at: string;
}

/**
 * Convert a database row into a CitizenSpec.
 */
function rowToSpec(row: CatalogRow): CitizenSpec {
  let workers: WorkerSpec[] = [];
  try {
    if (row.workers) workers = JSON.parse(row.workers) as WorkerSpec[];
  } catch {
    workers = [];
  }

  let capabilities: string[] = [];
  try {
    if (row.capabilities) capabilities = JSON.parse(row.capabilities) as string[];
  } catch {
    capabilities = [];
  }

  return {
    id: row.id,
    name: row.name,
    trademark: row.trademark ?? `${row.name}™`,
    domain: row.domain,
    industry: row.industry,
    category: row.category ?? "",
    description: row.description ?? "",
    derivation: row.derivation ?? "",
    workers,
    governanceType: (row.governance_type as CitizenSpec["governanceType"]) ?? "INDEPENDENT",
    capabilities,
  };
}

// ---------------------------------------------------------------------------
// Catalog Management
// ---------------------------------------------------------------------------

/**
 * Load all CitizenSpecs from the D1 catalog table.
 */
export async function loadCatalogFromDB(env: Env): Promise<CitizenSpec[]> {
  try {
    const result = await env.DB.prepare(
      `SELECT * FROM citizen_catalog ORDER BY name`
    ).all<CatalogRow>();

    if (!result.success || !result.results) return [];
    return result.results.map(rowToSpec);
  } catch {
    return [];
  }
}

/**
 * Register a new CitizenSpec in the D1 catalog.
 */
export async function registerSpec(spec: CitizenSpec, env: Env): Promise<void> {
  await env.DB.prepare(
    `INSERT INTO citizen_catalog
     (id, name, trademark, domain, industry, category, description, derivation, workers, governance_type, capabilities)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11)`
  )
    .bind(
      spec.id,
      spec.name,
      spec.trademark,
      spec.domain,
      spec.industry,
      spec.category,
      spec.description,
      spec.derivation,
      JSON.stringify(spec.workers),
      spec.governanceType,
      JSON.stringify(spec.capabilities)
    )
    .run();
}

/**
 * Look up a CitizenSpec by name or ID.
 */
export async function getSpec(
  nameOrId: string,
  env: Env
): Promise<CitizenSpec | null> {
  try {
    const row = await env.DB.prepare(
      `SELECT * FROM citizen_catalog WHERE id = ?1 OR name = ?1 LIMIT 1`
    )
      .bind(nameOrId)
      .first<CatalogRow>();

    return row ? rowToSpec(row) : null;
  } catch {
    return null;
  }
}

/**
 * Search the catalog by name, domain, or industry.
 */
export async function searchCatalog(
  query: string,
  env: Env
): Promise<CitizenSpec[]> {
  try {
    const pattern = `%${query}%`;
    const result = await env.DB.prepare(
      `SELECT * FROM citizen_catalog
       WHERE name LIKE ?1 OR domain LIKE ?1 OR industry LIKE ?1 OR category LIKE ?1
       ORDER BY name
       LIMIT 100`
    )
      .bind(pattern)
      .all<CatalogRow>();

    if (!result.success || !result.results) return [];
    return result.results.map(rowToSpec);
  } catch {
    return [];
  }
}

/**
 * Get catalog statistics: total, by industry, by governance, deployed, pending.
 */
export async function getCatalogStats(
  env: Env
): Promise<{
  total: number;
  byIndustry: Record<string, number>;
  byGovernance: Record<string, number>;
  deployed: number;
  pending: number;
}> {
  const stats = {
    total: 0,
    byIndustry: {} as Record<string, number>,
    byGovernance: {} as Record<string, number>,
    deployed: 0,
    pending: 0,
  };

  try {
    // Total specs
    const totalRow = await env.DB.prepare(
      `SELECT COUNT(*) as count FROM citizen_catalog`
    ).first<{ count: number }>();
    stats.total = totalRow?.count ?? 0;

    // By industry
    const industryResult = await env.DB.prepare(
      `SELECT industry, COUNT(*) as count FROM citizen_catalog GROUP BY industry ORDER BY count DESC`
    ).all<{ industry: string; count: number }>();
    if (industryResult.success && industryResult.results) {
      for (const row of industryResult.results) {
        stats.byIndustry[row.industry] = row.count;
      }
    }

    // By governance type
    const govResult = await env.DB.prepare(
      `SELECT governance_type, COUNT(*) as count FROM citizen_catalog GROUP BY governance_type ORDER BY count DESC`
    ).all<{ governance_type: string; count: number }>();
    if (govResult.success && govResult.results) {
      for (const row of govResult.results) {
        stats.byGovernance[row.governance_type ?? "INDEPENDENT"] = row.count;
      }
    }

    // Deployed count
    const deployedRow = await env.DB.prepare(
      `SELECT COUNT(*) as count FROM citizen_deployments WHERE status = 'ACTIVE'`
    ).first<{ count: number }>();
    stats.deployed = deployedRow?.count ?? 0;

    // Pending = total specs minus deployed
    stats.pending = stats.total - stats.deployed;
  } catch {
    // Tables may not exist yet — return zeroed stats
  }

  return stats;
}

/**
 * Bulk import CatalogEntry rows (from batch file markdown tables)
 * into the citizen_catalog as CitizenSpecs.
 */
export async function importBatchSpecs(
  entries: CatalogEntry[],
  industry: string,
  category: string,
  env: Env
): Promise<number> {
  let imported = 0;

  for (const entry of entries) {
    // Clean the name — remove ™ for the name field, keep it for trademark
    const cleanName = entry.name.replace(/™/g, "").trim().toUpperCase();
    const trademark = cleanName.includes("™") ? entry.name.trim() : `${cleanName}™`;

    // Generate a default worker spec for each Citizen
    const defaultWorker: WorkerSpec = {
      id: `scan-${cleanName.toLowerCase()}-1`,
      name: `SCAN-${cleanName}-1`,
      description: `Primary scanner for ${cleanName} — ${entry.domain}`,
      mode: "EVENT_TRIGGERED",
      capabilities: ["scan", "analyze"],
    };

    // Generate default capabilities from the domain
    const domainWords = entry.domain
      .toLowerCase()
      .split(/[\s&/,]+/)
      .filter((w) => w.length > 3);
    const capabilities = ["compliance", "analysis", ...domainWords.slice(0, 5)];

    const spec: CitizenSpec = {
      id: generateId("citizen"),
      name: cleanName,
      trademark,
      domain: entry.domain.trim(),
      industry,
      category,
      description: `${cleanName} — ${entry.domain}. Derived from: ${entry.derivation}`,
      derivation: entry.derivation.trim(),
      workers: [defaultWorker],
      governanceType: "INDEPENDENT",
      capabilities,
    };

    try {
      await registerSpec(spec, env);
      imported++;
    } catch {
      // Duplicate name or other constraint violation — skip
    }
  }

  return imported;
}

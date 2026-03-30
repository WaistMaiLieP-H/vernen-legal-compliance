import type { Env } from "../index.js";
import { generateId ,safeKvPut} from "../utils/helpers.js";
import { PersonaCitizenStatus } from "../types/persona.js";
import type { CitizenSpec, DeployedCitizen, DeploymentResult } from "./types.js";
import { getSpec } from "./catalog.js";

// ---------------------------------------------------------------------------
// Database row shapes
// ---------------------------------------------------------------------------
interface DeploymentRow {
  id: string;
  spec_id: string;
  citizen_name: string;
  status: string;
  kv_prefix: string;
  api_base_path: string;
  deployed_at: string;
  deactivated_at: string | null;
}

interface CatalogRow {
  id: string;
  name: string;
  c_name?: string;
  c_id?: string;
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

// ---------------------------------------------------------------------------
// Core Deployment Engine
// ---------------------------------------------------------------------------

/**
 * Deploy a Citizen from a catalog spec.
 * This is the core factory method that takes a specification and produces
 * a live Citizen with D1 records, KV namespace, and API endpoints.
 */
export async function deployCitizen(
  spec: CitizenSpec,
  env: Env
): Promise<DeploymentResult> {
  const citizenName = spec.name.toUpperCase();
  const apiBasePath = `/api/citizens/${citizenName.toLowerCase()}`;
  const kvPrefix = `CITIZEN:${citizenName}:`;
  const deploymentId = generateId("deploy");

  try {
    // 1. Validate — check name uniqueness among active deployments
    const existing = await env.DB.prepare(
      `SELECT id FROM citizen_deployments
       WHERE citizen_name = ?1 AND status IN ('DEPLOYING', 'ACTIVE')
       LIMIT 1`
    )
      .bind(citizenName)
      .first<{ id: string }>();

    if (existing) {
      return {
        success: false,
        citizenId: "",
        apiBasePath,
        endpoints: [],
        error: `Citizen ${citizenName} is already deployed (deployment: ${existing.id})`,
      };
    }

    // 2. Create the persona_citizens record in D1
    const personaId = generateId("persona");
    try {
      await env.DB.prepare(
        `INSERT OR IGNORE INTO persona_citizens
         (id, name, status, conceived_at, deployed_at)
         VALUES (?1, ?2, ?3, ?4, ?5)`
      )
        .bind(
          personaId,
          citizenName,
          PersonaCitizenStatus.SHELL_DEPLOYED,
          new Date().toISOString(),
          new Date().toISOString()
        )
        .run();
    } catch {
      // Table may not exist or citizen already in persona_citizens — non-fatal
    }

    // 3. Create a KV namespace prefix for this Citizen
    await safeKvPut(env.KNOWLEDGE_STORE, 
      `${kvPrefix}system:deployed_at`,
      new Date().toISOString()
    );
    await safeKvPut(env.KNOWLEDGE_STORE, 
      `${kvPrefix}system:spec`,
      JSON.stringify(spec)
    );
    await safeKvPut(env.KNOWLEDGE_STORE, `${kvPrefix}stats:events_received`, "0");

    // 4. Create worker records in D1 workers table
    for (const workerSpec of spec.workers) {
      try {
        await env.DB.prepare(
          `INSERT OR IGNORE INTO workers
           (id, name, persona_id, description, status, deployed_at)
           VALUES (?1, ?2, ?3, ?4, ?5, ?6)`
        )
          .bind(
            generateId("worker"),
            workerSpec.name,
            personaId,
            workerSpec.description,
            "DEPLOYED",
            new Date().toISOString()
          )
          .run();
      } catch {
        // Workers table may not exist — store in KV as fallback
        await safeKvPut(env.KNOWLEDGE_STORE, 
          `${kvPrefix}worker:${workerSpec.id}`,
          JSON.stringify(workerSpec)
        );
      }
    }

    // 5. Create the deployment record
    await env.DB.prepare(
      `INSERT INTO citizen_deployments
       (id, spec_id, citizen_name, status, kv_prefix, api_base_path, deployed_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`
    )
      .bind(
        deploymentId,
        spec.id,
        citizenName,
        "ACTIVE",
        kvPrefix,
        apiBasePath,
        new Date().toISOString()
      )
      .run();

    // 6. Log the deployment activity
    await env.DB.prepare(
      `INSERT INTO citizen_activity (id, citizen_id, action, details, created_at)
       VALUES (?1, ?2, ?3, ?4, ?5)`
    )
      .bind(
        generateId("activity"),
        deploymentId,
        "DEPLOYED",
        JSON.stringify({
          specId: spec.id,
          citizenName,
          industry: spec.industry,
          workerCount: spec.workers.length,
        }),
        new Date().toISOString()
      )
      .run();

    // 7. Return result with endpoints
    const endpoints = [
      `GET ${apiBasePath}/status`,
      `GET ${apiBasePath}/knowledge?q=<query>`,
      `POST ${apiBasePath}/event`,
      `GET ${apiBasePath}/activity`,
      `GET ${apiBasePath}/workers`,
    ];

    return {
      success: true,
      citizenId: deploymentId,
      apiBasePath,
      endpoints,
    };
  } catch (error) {
    return {
      success: false,
      citizenId: "",
      apiBasePath,
      endpoints: [],
      error: error instanceof Error ? error.message : "Deployment failed",
    };
  }
}

/**
 * Deactivate a deployed Citizen (soft-delete — does not destroy data).
 */
export async function undeployCitizen(
  citizenId: string,
  env: Env
): Promise<void> {
  await env.DB.prepare(
    `UPDATE citizen_deployments
     SET status = 'DEACTIVATED', deactivated_at = ?1
     WHERE id = ?2 AND status = 'ACTIVE'`
  )
    .bind(new Date().toISOString(), citizenId)
    .run();

  // Log the deactivation
  await env.DB.prepare(
    `INSERT INTO citizen_activity (id, citizen_id, action, details, created_at)
     VALUES (?1, ?2, ?3, ?4, ?5)`
  )
    .bind(
      generateId("activity"),
      citizenId,
      "DEACTIVATED",
      JSON.stringify({ reason: "Manual undeploy by founder" }),
      new Date().toISOString()
    )
    .run();
}

/**
 * Get all deployed dynamic Citizens with their specs.
 */
export async function getDeployedCitizens(
  env: Env
): Promise<DeployedCitizen[]> {
  try {
    const result = await env.DB.prepare(
      `SELECT d.*, c.id as c_id, c.name as c_name, c.trademark, c.domain,
              c.industry, c.category, c.description, c.derivation,
              c.workers, c.governance_type, c.capabilities
       FROM citizen_deployments d
       JOIN citizen_catalog c ON d.spec_id = c.id
       WHERE d.status = 'ACTIVE'
       ORDER BY d.deployed_at DESC`
    ).all<DeploymentRow & CatalogRow>();

    if (!result.success || !result.results) return [];

    return result.results.map((row) => ({
      spec: {
        id: row.spec_id,
        name: row.name ?? row.citizen_name,
        trademark: row.trademark ?? `${row.citizen_name}™`,
        domain: row.domain,
        industry: row.industry,
        category: row.category ?? "",
        description: row.description ?? "",
        derivation: row.derivation ?? "",
        workers: row.workers ? JSON.parse(row.workers) : [],
        governanceType: (row.governance_type as CitizenSpec["governanceType"]) ?? "INDEPENDENT",
        capabilities: row.capabilities ? JSON.parse(row.capabilities) : [],
      },
      status: PersonaCitizenStatus.SHELL_DEPLOYED,
      deployedAt: row.deployed_at,
      kvPrefix: row.kv_prefix,
      apiBasePath: row.api_base_path,
      deploymentId: row.id,
    }));
  } catch {
    return [];
  }
}

/**
 * Get deployment status for a single Citizen by deployment ID or name.
 */
export async function getDeploymentStatus(
  citizenIdOrName: string,
  env: Env
): Promise<DeployedCitizen | null> {
  try {
    const row = await env.DB.prepare(
      `SELECT d.*, c.id as c_id, c.name as c_name, c.trademark, c.domain,
              c.industry, c.category, c.description, c.derivation,
              c.workers, c.governance_type, c.capabilities
       FROM citizen_deployments d
       JOIN citizen_catalog c ON d.spec_id = c.id
       WHERE (d.id = ?1 OR d.citizen_name = ?1) AND d.status = 'ACTIVE'
       LIMIT 1`
    )
      .bind(citizenIdOrName.toUpperCase())
      .all<DeploymentRow & CatalogRow>();

    // Try case-insensitive if first attempt fails
    let resultRow = row.results?.[0];
    if (!resultRow) {
      const retry = await env.DB.prepare(
        `SELECT d.*, c.id as c_id, c.name as c_name, c.trademark, c.domain,
                c.industry, c.category, c.description, c.derivation,
                c.workers, c.governance_type, c.capabilities
         FROM citizen_deployments d
         JOIN citizen_catalog c ON d.spec_id = c.id
         WHERE (d.id = ?1 OR UPPER(d.citizen_name) = UPPER(?1)) AND d.status = 'ACTIVE'
         LIMIT 1`
      )
        .bind(citizenIdOrName)
        .first<DeploymentRow & CatalogRow>();
      resultRow = retry ?? undefined;
    }

    if (!resultRow) return null;

    return {
      spec: {
        id: resultRow.spec_id,
        name: resultRow.c_name ?? resultRow.citizen_name,
        trademark: resultRow.trademark ?? `${resultRow.citizen_name}™`,
        domain: resultRow.domain,
        industry: resultRow.industry,
        category: resultRow.category ?? "",
        description: resultRow.description ?? "",
        derivation: resultRow.derivation ?? "",
        workers: resultRow.workers ? JSON.parse(resultRow.workers) : [],
        governanceType: (resultRow.governance_type as CitizenSpec["governanceType"]) ?? "INDEPENDENT",
        capabilities: resultRow.capabilities ? JSON.parse(resultRow.capabilities) : [],
      },
      status: PersonaCitizenStatus.SHELL_DEPLOYED,
      deployedAt: resultRow.deployed_at,
      kvPrefix: resultRow.kv_prefix,
      apiBasePath: resultRow.api_base_path,
      deploymentId: resultRow.id,
    };
  } catch {
    return null;
  }
}

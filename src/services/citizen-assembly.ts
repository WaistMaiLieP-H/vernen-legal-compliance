/**
 * Citizen Assembly Service
 *
 * The final stage: takes discovered skills (mined from real compliance failures)
 * and assembles them into deployable Citizens.
 *
 * Each Citizen is a statistical profile of how a specific industry actually fails.
 * The assembly process:
 *   1. Group discovered skills by industry
 *   2. Match to existing catalog spec (or create new one)
 *   3. Install discovered skills into citizen_skills table
 *   4. Populate routing index entries
 *   5. Build scope cache
 *   6. Deploy via existing engine
 *
 * The 16 hand-built Citizens are archetypes. This service produces the other 2800+.
 */

import type { Env } from "../index.js";
import { generateId } from "../utils/helpers.js";
import type { DiscoveredSkill } from "./skill-discovery.js";
import { getFullCatalog, findPosition, type CatalogPosition } from "./citizen-catalog-2880.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface CitizenAssembly {
  id: string;
  citizenName: string;
  citizenTrademark: string;
  industry: string;
  subIndustry: string | null;
  domain: string;
  skillIds: string[];
  skillCount: number;
  totalBackingFailures: number;
  totalBackingEntities: number;
  avgConfidence: number;
  primaryFrameworks: string[];
  primaryStandards: string[];
  failureProfile: Record<string, number>;
  stateCoverage: string[];
  catalogSpecId: string | null;
  deploymentId: string | null;
  assemblyStatus: "DISCOVERED" | "SKILLS_ASSIGNED" | "SPEC_CREATED" | "DEPLOYED" | "ACTIVE";
}

export interface AssemblyResult {
  citizensAssembled: number;
  skillsAssigned: number;
  specsCreated: number;
  citizensDeployed: number;
  durationMs: number;
  assemblies: CitizenAssembly[];
}

export interface AssemblyOptions {
  /** Only assemble for this industry (null = all) */
  industry?: string;
  /** Minimum confidence score for skills to include (0-1) */
  minConfidence?: number;
  /** Minimum number of backing failures */
  minFailures?: number;
  /** Auto-deploy after assembly? */
  autoDeploy?: boolean;
}

// ═══════════════════════════════════════════════════════════════════════════
// Archetype mapping — which core Citizen's DNA does each industry inherit
// ═══════════════════════════════════════════════════════════════════════════

const ARCHETYPE_MAP: Record<string, { archetype: string; governanceType: string }> = {
  HEALTHCARE:           { archetype: "REGULIS",   governanceType: "OVERSIGHT" },
  FINANCE:              { archetype: "FISCARA",   governanceType: "OVERSIGHT" },
  EDUCATION:            { archetype: "REGULIS",   governanceType: "OVERSIGHT" },
  GOVERNMENT:           { archetype: "REGULIS",   governanceType: "BOARD" },
  CONSTRUCTION:         { archetype: "INTEGRA",   governanceType: "ICT" },
  MANUFACTURING:        { archetype: "INTEGRA",   governanceType: "ICT" },
  TECHNOLOGY:           { archetype: "SYNTARA",   governanceType: "ICT" },
  DEFENSE:              { archetype: "VIGILUS",    governanceType: "OVERSIGHT" },
  PROFESSIONAL_SERVICES:{ archetype: "ETHICARA",  governanceType: "BOARD" },
  REAL_ESTATE:          { archetype: "FISCARA",   governanceType: "BOARD" },
  TRANSPORTATION:       { archetype: "INTEGRA",   governanceType: "ICT" },
  UTILITIES:            { archetype: "INTEGRA",   governanceType: "ICT" },
  AGRICULTURE:          { archetype: "REGULIS",   governanceType: "OVERSIGHT" },
  RETAIL:               { archetype: "ADVOCIS",   governanceType: "BOARD" },
  WHOLESALE:            { archetype: "FISCARA",   governanceType: "BOARD" },
  HOSPITALITY:          { archetype: "ADVOCIS",   governanceType: "BOARD" },
  ENTERTAINMENT:        { archetype: "ADVOCIS",   governanceType: "BOARD" },
  MINING:               { archetype: "INTEGRA",   governanceType: "ICT" },
  ADMINISTRATIVE:       { archetype: "INTEGRA",   governanceType: "ICT" },
  MANAGEMENT:           { archetype: "LEXARC",    governanceType: "BOARD" },
  NONPROFIT:            { archetype: "ETHICARA",  governanceType: "OVERSIGHT" },
  PUBLIC_COMPANY:       { archetype: "CLARIDEX",  governanceType: "OVERSIGHT" },
  OTHER_SERVICES:       { archetype: "REGULIS",   governanceType: "INDEPENDENT" },
  GENERAL:              { archetype: "REGULIS",   governanceType: "INDEPENDENT" },
};

// ═══════════════════════════════════════════════════════════════════════════
// Citizen Assembly Engine
// ═══════════════════════════════════════════════════════════════════════════

export class CitizenAssemblyEngine {
  private db: D1Database;

  constructor(env: Env) {
    this.db = env.DB;
  }

  /**
   * Run the full assembly pipeline:
   * 1. Find industries with discovered skills
   * 2. Group skills per industry
   * 3. Build or update citizen assembly record
   * 4. Install skills into citizen_skills
   * 5. Create catalog spec
   * 6. Optionally deploy
   */
  async assemble(options: AssemblyOptions = {}): Promise<AssemblyResult> {
    const start = Date.now();
    let citizensAssembled = 0;
    let skillsAssigned = 0;
    let specsCreated = 0;
    let citizensDeployed = 0;
    const assemblies: CitizenAssembly[] = [];

    const minConfidence = options.minConfidence ?? 0.2;
    const minFailures = options.minFailures ?? 5;

    // Get discovered skills grouped by industry
    let query = `
      SELECT DISTINCT industries FROM discovered_skills
      WHERE is_active = 1
        AND assigned_citizen IS NULL
        AND confidence_score >= ?1
        AND backed_by_failures >= ?2
    `;
    const binds: unknown[] = [minConfidence, minFailures];

    if (options.industry) {
      query += ` AND industries LIKE ?3`;
      binds.push(`%${options.industry}%`);
    }

    const industryRows = await this.db.prepare(query).bind(...binds).all();

    // Extract unique industries from JSON arrays
    const industries = new Set<string>();
    for (const row of (industryRows.results ?? [])) {
      const parsed = JSON.parse((row as Record<string, unknown>).industries as string) as string[];
      for (const ind of parsed) industries.add(ind);
    }

    for (const industry of industries) {
      // Get all qualifying skills for this industry
      const skillRows = await this.db.prepare(`
        SELECT * FROM discovered_skills
        WHERE is_active = 1
          AND assigned_citizen IS NULL
          AND confidence_score >= ?1
          AND backed_by_failures >= ?2
          AND industries LIKE ?3
        ORDER BY confidence_score DESC
      `).bind(minConfidence, minFailures, `%${industry}%`).all();

      const skills: DiscoveredSkill[] = (skillRows.results ?? []).map(mapToDiscoveredSkill);
      if (skills.length === 0) continue;

      // Generate Citizen name for this industry
      const citizenName = generateCitizenName(industry);
      const citizenTrademark = `${citizenName}\u2122`;

      // Compute aggregate profile
      const totalFailures = skills.reduce((sum, s) => sum + s.backedByFailures, 0);
      const totalEntities = skills.reduce((sum, s) => sum + s.backedByEntities, 0);
      const avgConfidence = skills.reduce((sum, s) => sum + s.confidenceScore, 0) / skills.length;

      const allFrameworks = new Set<string>();
      const allStandards = new Set<string>();
      const failureProfile: Record<string, number> = {};

      for (const skill of skills) {
        for (const std of skill.governingStandards) allStandards.add(std);
        // Extract frameworks from cluster data
        const cluster = await this.db.prepare(
          "SELECT compliance_frameworks FROM failure_clusters WHERE id = ?1"
        ).bind(skill.clusterId).first<{ compliance_frameworks: string }>();
        if (cluster) {
          for (const fw of JSON.parse(cluster.compliance_frameworks)) allFrameworks.add(fw);
        }
        failureProfile[skill.skillSlug] = skill.backedByFailures;
      }

      // Upsert citizen assembly record
      const assemblyId = await this.upsertAssembly({
        citizenName,
        citizenTrademark,
        industry,
        subIndustry: null,
        domain: buildDomainDescription(industry, [...allFrameworks]),
        skillIds: skills.map(s => s.id),
        skillCount: skills.length,
        totalBackingFailures: totalFailures,
        totalBackingEntities: totalEntities,
        avgConfidence,
        primaryFrameworks: [...allFrameworks],
        primaryStandards: [...allStandards],
        failureProfile,
        stateCoverage: [],
        catalogSpecId: null,
        deploymentId: null,
        assemblyStatus: "DISCOVERED",
      });

      // Assign skills to this Citizen
      for (const skill of skills) {
        await this.db.prepare(`
          UPDATE discovered_skills
          SET assigned_citizen = ?1, assigned_at = datetime('now'), updated_at = datetime('now')
          WHERE id = ?2
        `).bind(citizenName, skill.id).run();
        skillsAssigned++;
      }

      // Update assembly status
      await this.db.prepare(`
        UPDATE citizen_assemblies
        SET assembly_status = 'SKILLS_ASSIGNED', updated_at = datetime('now')
        WHERE id = ?1
      `).bind(assemblyId).run();

      // Create catalog spec
      const specId = await this.createCatalogSpec(citizenName, citizenTrademark, industry, skills, [...allFrameworks]);
      if (specId) {
        await this.db.prepare(`
          UPDATE citizen_assemblies
          SET catalog_spec_id = ?1, assembly_status = 'SPEC_CREATED', updated_at = datetime('now')
          WHERE id = ?2
        `).bind(specId, assemblyId).run();
        specsCreated++;
      }

      // Install skills into citizen_skills table (the real skill registry)
      await this.installSkills(citizenName, skills);

      // Populate routing index
      await this.populateRoutingIndex(citizenName, skills);

      citizensAssembled++;

      // Load the assembly for return
      const assembly = await this.getAssembly(assemblyId);
      if (assembly) assemblies.push(assembly);

      // Auto-deploy if requested
      if (options.autoDeploy && specId) {
        const deployed = await this.deployFromSpec(specId, citizenName, assemblyId);
        if (deployed) citizensDeployed++;
      }
    }

    // Log stats
    try {
      await this.db.prepare(`
        INSERT INTO taxonomy_statistics (id, stat_type, pipeline, citizens_assembled, skills_discovered, duration_ms)
        VALUES (?1, ?2, ?3, ?4, ?5, ?6)
      `).bind(generateId("stat"), "assembly_run", "ALL", citizensAssembled, skillsAssigned, Date.now() - start).run();
    } catch { /* non-blocking */ }

    return { citizensAssembled, skillsAssigned, specsCreated, citizensDeployed, durationMs: Date.now() - start, assemblies };
  }

  // ─── Install Skills ───────────────────────────────────────────────────

  /**
   * Install discovered skills into the citizen_skills table.
   * This makes them real — the Citizen can now exercise them.
   */
  private async installSkills(citizenName: string, skills: DiscoveredSkill[]): Promise<void> {
    for (const skill of skills) {
      try {
        await this.db.prepare(`
          INSERT OR REPLACE INTO citizen_skills (
            id, citizen_name, skill_slug, name, description, skill_type,
            governing_standards, audit_triggers, audit_checklist,
            output_protocol, cross_references, skill_content,
            version, is_active
          ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14)
        `).bind(
          generateId("skill"),
          citizenName,
          skill.skillSlug,
          skill.name,
          skill.description,
          skill.skillType,
          JSON.stringify(skill.governingStandards),
          JSON.stringify(skill.auditTriggers),
          JSON.stringify(skill.auditChecklist),
          skill.outputProtocol,
          JSON.stringify(skill.crossReferences),
          `# ${skill.name}\n\n${skill.description}\n\n## Backed by ${skill.backedByFailures} documented failures across ${skill.backedByEntities} entities.\n\n## Confidence: ${(skill.confidenceScore * 100).toFixed(1)}%`,
          1,
          1,
        ).run();
      } catch {
        // Skill slug may already exist — that's fine, the OR REPLACE handles it
      }
    }
  }

  // ─── Routing Index ────────────────────────────────────────────────────

  /**
   * Populate routing index entries so documents route to this Citizen.
   */
  private async populateRoutingIndex(citizenName: string, skills: DiscoveredSkill[]): Promise<void> {
    for (const skill of skills) {
      for (const trigger of skill.auditTriggers) {
        try {
          await this.db.prepare(`
            INSERT OR IGNORE INTO citizen_routing_index (
              id, doc_type, jurisdiction, category,
              citizen_name, skill_slug, priority,
              standard_ids, cross_ref_paths, is_active
            ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, 1)
          `).bind(
            generateId("route"),
            trigger,
            "*", // All jurisdictions
            skill.industries[0] ?? "*",
            citizenName,
            skill.skillSlug,
            50, // Mid-priority (core Citizens get higher)
            JSON.stringify(skill.governingStandards),
            JSON.stringify(skill.crossReferences),
          ).run();
        } catch {
          // Duplicate routing entries are fine — OR IGNORE handles it
        }
      }
    }
  }

  // ─── Catalog Spec ─────────────────────────────────────────────────────

  private async createCatalogSpec(
    citizenName: string,
    trademark: string,
    industry: string,
    skills: DiscoveredSkill[],
    frameworks: string[]
  ): Promise<string | null> {
    const archetype = ARCHETYPE_MAP[industry] ?? ARCHETYPE_MAP["GENERAL"]!;
    const specId = generateId("spec");
    const domain = buildDomainDescription(industry, frameworks);

    try {
      await this.db.prepare(`
        INSERT OR IGNORE INTO citizen_catalog (
          id, name, trademark, domain, industry, category, description,
          derivation, workers, governance_type, capabilities
        ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11)
      `).bind(
        specId,
        citizenName,
        trademark,
        domain,
        industry,
        "DATA_DERIVED",
        `${domain}. Assembled from ${skills.length} data-discovered skills backed by real compliance failures. Archetype: ${archetype!.archetype}.`,
        `Data-derived from failure taxonomy mining of ${industry} compliance failures`,
        JSON.stringify([{
          id: `scan-${citizenName.toLowerCase()}-1`,
          name: `SCAN-${citizenName}-1`,
          description: `Primary scanner for ${citizenName} — monitors ${frameworks.join(", ")} compliance`,
          mode: "EVENT_TRIGGERED",
          capabilities: frameworks,
        }]),
        archetype!.governanceType,
        JSON.stringify(frameworks),
      ).run();
      return specId;
    } catch {
      return null;
    }
  }

  // ─── Deploy ───────────────────────────────────────────────────────────

  private async deployFromSpec(specId: string, citizenName: string, assemblyId: string): Promise<boolean> {
    const deploymentId = generateId("deploy");
    const kvPrefix = `${citizenName}:`;

    try {
      await this.db.prepare(`
        INSERT INTO citizen_deployments (
          id, spec_id, citizen_name, status, kv_prefix, api_base_path, deployed_at
        ) VALUES (?1, ?2, ?3, 'ACTIVE', ?4, ?5, datetime('now'))
      `).bind(deploymentId, specId, citizenName, kvPrefix, `/api/${citizenName.toLowerCase()}`).run();

      await this.db.prepare(`
        UPDATE citizen_assemblies
        SET deployment_id = ?1, assembly_status = 'DEPLOYED', deployed_at = datetime('now'), updated_at = datetime('now')
        WHERE id = ?2
      `).bind(deploymentId, assemblyId).run();

      return true;
    } catch {
      return false;
    }
  }

  // ─── Assembly CRUD ────────────────────────────────────────────────────

  private async upsertAssembly(assembly: Omit<CitizenAssembly, "id">): Promise<string> {
    const existing = await this.db.prepare(
      "SELECT id FROM citizen_assemblies WHERE citizen_name = ?1"
    ).bind(assembly.citizenName).first<{ id: string }>();

    if (existing) {
      await this.db.prepare(`
        UPDATE citizen_assemblies SET
          skill_ids = ?2, skill_count = ?3,
          total_backing_failures = ?4, total_backing_entities = ?5,
          avg_confidence = ?6, primary_frameworks = ?7, primary_standards = ?8,
          failure_profile = ?9, state_coverage = ?10,
          updated_at = datetime('now')
        WHERE id = ?1
      `).bind(
        existing.id,
        JSON.stringify(assembly.skillIds), assembly.skillCount,
        assembly.totalBackingFailures, assembly.totalBackingEntities,
        assembly.avgConfidence, JSON.stringify(assembly.primaryFrameworks), JSON.stringify(assembly.primaryStandards),
        JSON.stringify(assembly.failureProfile), JSON.stringify(assembly.stateCoverage),
      ).run();
      return existing.id;
    }

    const id = generateId("asm");
    await this.db.prepare(`
      INSERT INTO citizen_assemblies (
        id, citizen_name, citizen_trademark, industry, sub_industry, domain,
        skill_ids, skill_count,
        total_backing_failures, total_backing_entities, avg_confidence,
        primary_frameworks, primary_standards, failure_profile, state_coverage,
        assembly_status
      ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16)
    `).bind(
      id, assembly.citizenName, assembly.citizenTrademark, assembly.industry, assembly.subIndustry, assembly.domain,
      JSON.stringify(assembly.skillIds), assembly.skillCount,
      assembly.totalBackingFailures, assembly.totalBackingEntities, assembly.avgConfidence,
      JSON.stringify(assembly.primaryFrameworks), JSON.stringify(assembly.primaryStandards),
      JSON.stringify(assembly.failureProfile), JSON.stringify(assembly.stateCoverage),
      assembly.assemblyStatus,
    ).run();
    return id;
  }

  async getAssembly(id: string): Promise<CitizenAssembly | null> {
    const row = await this.db.prepare("SELECT * FROM citizen_assemblies WHERE id = ?1").bind(id).first();
    return row ? mapToAssembly(row) : null;
  }

  async getAssemblies(options?: { industry?: string; status?: string }): Promise<CitizenAssembly[]> {
    let query = "SELECT * FROM citizen_assemblies WHERE 1=1";
    const binds: unknown[] = [];
    let bindIdx = 1;

    if (options?.industry) {
      query += ` AND industry = ?${bindIdx++}`;
      binds.push(options.industry);
    }
    if (options?.status) {
      query += ` AND assembly_status = ?${bindIdx++}`;
      binds.push(options.status);
    }
    query += " ORDER BY total_backing_failures DESC";

    const stmt = this.db.prepare(query);
    const rows = await (binds.length ? stmt.bind(...binds) : stmt).all();
    return (rows.results ?? []).map(mapToAssembly);
  }

  /** Get assembly stats */
  async getStats(): Promise<{
    totalAssemblies: number;
    byStatus: Record<string, number>;
    byIndustry: Record<string, number>;
    totalSkillsAssigned: number;
    totalBackingFailures: number;
  }> {
    const [totalRow, statusRows, industryRows, skillRow, failureRow] = await Promise.all([
      this.db.prepare("SELECT COUNT(*) as cnt FROM citizen_assemblies").first<{ cnt: number }>(),
      this.db.prepare("SELECT assembly_status, COUNT(*) as cnt FROM citizen_assemblies GROUP BY assembly_status").all(),
      this.db.prepare("SELECT industry, COUNT(*) as cnt FROM citizen_assemblies GROUP BY industry ORDER BY cnt DESC").all(),
      this.db.prepare("SELECT SUM(skill_count) as total FROM citizen_assemblies").first<{ total: number }>(),
      this.db.prepare("SELECT SUM(total_backing_failures) as total FROM citizen_assemblies").first<{ total: number }>(),
    ]);

    const toRecord = (rows: unknown[]): Record<string, number> => {
      const rec: Record<string, number> = {};
      for (const r of rows) {
        const row = r as Record<string, unknown>;
        const vals = Object.values(row);
        rec[vals[0] as string] = vals[1] as number;
      }
      return rec;
    };

    return {
      totalAssemblies: totalRow?.cnt ?? 0,
      byStatus: toRecord(statusRows.results ?? []),
      byIndustry: toRecord(industryRows.results ?? []),
      totalSkillsAssigned: skillRow?.total ?? 0,
      totalBackingFailures: failureRow?.total ?? 0,
    };
  }

  // ─── Full Catalog Assembly ──────────────────────────────────────────────

  /**
   * Assemble from the full 2,880-position catalog.
   *
   * For each catalog position:
   *   1. Check if any taxonomy entries or discovered skills match industry + sub_industry
   *   2. If data exists → create assembly record with status SKILLS_ASSIGNED
   *   3. If no data → create assembly record with status DISCOVERED (placeholder)
   *   4. Update the catalog_positions table with the assembly status
   *
   * Processes in batches of 50 to stay under D1 subrequest limits.
   */
  async assembleFullCatalog(options?: { industry?: string }): Promise<{
    totalPositions: number;
    withData: number;
    placeholders: number;
    durationMs: number;
  }> {
    const start = Date.now();
    let catalog = getFullCatalog();

    if (options?.industry) {
      catalog = catalog.filter(p => p.industry === options.industry);
    }

    let withData = 0;
    let placeholders = 0;
    const BATCH_SIZE = 50;

    // Load all skill industries + names ONCE (single query) to check matches in-memory
    const allSkills = await this.db.prepare(
      "SELECT industries, name, description FROM discovered_skills WHERE is_active = 1"
    ).all();
    const skillTexts = (allSkills.results ?? []).map((r: Record<string, unknown>) => ({
      industries: String(r["industries"] ?? ""),
      text: `${String(r["name"] ?? "")} ${String(r["description"] ?? "")}`.toLowerCase(),
    }));

    for (let i = 0; i < catalog.length; i += BATCH_SIZE) {
      const batch = catalog.slice(i, i + BATCH_SIZE);
      const stmts: D1PreparedStatement[] = [];

      for (const pos of batch) {
        // Check if skills exist for this industry + sub_industry (in-memory)
        const keyword = pos.subIndustry.split(" ")[0]!.toLowerCase();
        const hasData = skillTexts.some(s =>
          s.industries.includes(pos.industry) && s.text.includes(keyword)
        );
        const status = hasData ? "SKILLS_ASSIGNED" : "DISCOVERED";

        if (hasData) {
          withData++;
        } else {
          placeholders++;
        }

        // Upsert assembly record for this catalog position
        const assemblyId = generateId("asm");
        stmts.push(
          this.db.prepare(`
            INSERT OR IGNORE INTO citizen_assemblies (
              id, citizen_name, citizen_trademark, industry, sub_industry, domain,
              skill_ids, skill_count,
              total_backing_failures, total_backing_entities, avg_confidence,
              primary_frameworks, primary_standards, failure_profile, state_coverage,
              assembly_status
            ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16)
          `).bind(
            assemblyId,
            pos.citizenName,
            `${pos.citizenName}\u2122`,
            pos.industry,
            pos.subIndustry,
            pos.domain,
            "[]",
            0,
            0, 0, 0,
            "[]", "[]", "{}", "[]",
            status,
          )
        );

        // Update catalog position status
        stmts.push(
          this.db.prepare(`
            UPDATE citizen_catalog_positions
            SET assembly_status = ?1, assigned_assembly_id = ?2, updated_at = datetime('now')
            WHERE citizen_name = ?3
          `).bind(status, assemblyId, pos.citizenName)
        );
      }

      if (stmts.length > 0) {
        try {
          await this.db.batch(stmts);
        } catch {
          // If batch fails, continue — some positions may already exist
        }
      }
    }

    // Log stats
    try {
      await this.db.prepare(`
        INSERT INTO taxonomy_statistics (id, stat_type, pipeline, citizens_assembled, skills_discovered, duration_ms)
        VALUES (?1, ?2, ?3, ?4, ?5, ?6)
      `).bind(
        generateId("stat"), "full_catalog_assembly", "ALL",
        withData + placeholders, withData, Date.now() - start
      ).run();
    } catch { /* non-blocking */ }

    return {
      totalPositions: catalog.length,
      withData,
      placeholders,
      durationMs: Date.now() - start,
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Generate a Citizen name from an industry (and optional sub-industry).
 *
 * First checks the 2,880-position catalog for a matching position.
 * Falls back to the legacy Latin/Greek-inspired names for backward compatibility.
 */
function generateCitizenName(industry: string, subIndustry?: string): string {
  // Check the catalog first
  const catalogPos = findPosition(industry, subIndustry ?? undefined);
  if (catalogPos) return catalogPos.citizenName;

  // Legacy fallback — these names are already in production
  const INDUSTRY_NAMES: Record<string, string> = {
    HEALTHCARE: "MEDICIS",
    FINANCE: "PECUNIS",
    EDUCATION: "SCHOLARIS",
    GOVERNMENT: "CIVILIS",
    CONSTRUCTION: "STRUCTIS",
    MANUFACTURING: "FABRICIS",
    TECHNOLOGY: "DIGITALIS",
    DEFENSE: "FORTARIS",
    PROFESSIONAL_SERVICES: "PRAXARIS",
    REAL_ESTATE: "DOMARIS",
    TRANSPORTATION: "VECTARIS",
    UTILITIES: "SERVARIS",
    AGRICULTURE: "AGRARIS",
    RETAIL: "MERCARIS",
    WHOLESALE: "COMERSIS",
    HOSPITALITY: "HOSPITIS",
    ENTERTAINMENT: "LUDARIS",
    MINING: "TERRARIS",
    ADMINISTRATIVE: "GESTARIS",
    MANAGEMENT: "DIRIGIS",
    NONPROFIT: "COMMUNIS",
    PUBLIC_COMPANY: "PUBLICIS",
    OTHER_SERVICES: "AUXILIARIS",
    GENERAL: "GENERALIS",
  };
  return INDUSTRY_NAMES[industry] ?? `CITIZEN_${industry}`;
}

function buildDomainDescription(industry: string, frameworks: string[]): string {
  const name = industry.replace(/_/g, " ").toLowerCase();
  const fwList = frameworks.length > 0 ? frameworks.join(", ") : "general compliance";
  return `${name.charAt(0).toUpperCase() + name.slice(1)} Compliance Intelligence — ${fwList}`;
}

function mapToAssembly(row: unknown): CitizenAssembly {
  const r = row as Record<string, unknown>;
  return {
    id: r.id as string,
    citizenName: r.citizen_name as string,
    citizenTrademark: r.citizen_trademark as string,
    industry: r.industry as string,
    subIndustry: (r.sub_industry as string) ?? null,
    domain: r.domain as string,
    skillIds: JSON.parse((r.skill_ids as string) ?? "[]"),
    skillCount: r.skill_count as number,
    totalBackingFailures: r.total_backing_failures as number,
    totalBackingEntities: r.total_backing_entities as number,
    avgConfidence: r.avg_confidence as number,
    primaryFrameworks: JSON.parse((r.primary_frameworks as string) ?? "[]"),
    primaryStandards: JSON.parse((r.primary_standards as string) ?? "[]"),
    failureProfile: JSON.parse((r.failure_profile as string) ?? "{}"),
    stateCoverage: JSON.parse((r.state_coverage as string) ?? "[]"),
    catalogSpecId: (r.catalog_spec_id as string) ?? null,
    deploymentId: (r.deployment_id as string) ?? null,
    assemblyStatus: r.assembly_status as CitizenAssembly["assemblyStatus"],
  };
}

function mapToDiscoveredSkill(row: unknown): DiscoveredSkill {
  const r = row as Record<string, unknown>;
  return {
    id: r.id as string,
    clusterId: r.cluster_id as string,
    skillSlug: r.skill_slug as string,
    name: r.name as string,
    description: r.description as string,
    skillType: r.skill_type as string,
    governingStandards: JSON.parse((r.governing_standards as string) ?? "[]"),
    auditTriggers: JSON.parse((r.audit_triggers as string) ?? "[]"),
    auditChecklist: JSON.parse((r.audit_checklist as string) ?? "[]"),
    outputProtocol: (r.output_protocol as string) ?? "",
    crossReferences: JSON.parse((r.cross_references as string) ?? "[]"),
    backedByFailures: r.backed_by_failures as number,
    backedByEntities: r.backed_by_entities as number,
    confidenceScore: r.confidence_score as number,
    industries: JSON.parse((r.industries as string) ?? "[]"),
    assignedCitizen: (r.assigned_citizen as string) ?? null,
  };
}

import type { Env } from "../index.js";
import type {
  RoutingKey,
  RoutingResolution,
  RoutingIndexEntry,
  CitizenScopeCache,
  SkillManifestEntry,
  StandardManifestEntry,
  JunctionRegistryEntry,
  JunctionInstance,
  JunctionTriggerType,
  JunctionAuditEntry,
  ResolutionMethod,
} from "../types/routing.js";
import { generateId } from "../utils/helpers.js";

/**
 * RoutingEngine — Eliminates runtime sifting.
 *
 * Before: document arrives → scan 3,000 agents → matched agent searches database → audit
 * After:  document arrives → routing_index[key] → agent ID → scope_cache[agent] → audit
 *
 * Three pointer dereferences. No scanning. No searching.
 *
 * The engine maintains:
 * 1. In-memory routing table (rebuilt from D1 on boot, invalidated on change)
 * 2. In-memory scope caches per citizen (pre-loaded toolkit)
 * 3. Junction registry for authorized cross-references
 */
export class RoutingEngine {

  // In-memory routing table: composite key → resolution
  private routingTable: Map<string, RoutingResolution[]> = new Map();

  // In-memory scope caches: citizen name → pre-loaded scope
  private scopeCaches: Map<string, CitizenScopeCache> = new Map();

  // In-memory junction registry: citizen pair key → registry entry
  private junctionMap: Map<string, JunctionRegistryEntry> = new Map();

  // Boot state
  private booted = false;
  private bootDurationMs = 0;

  // =========================================================================
  // BOOT: Load everything into memory once
  // =========================================================================

  /**
   * Boot the routing engine. Call once on worker startup.
   * Loads routing index, scope caches, and junction registry into memory.
   */
  async boot(env: Env): Promise<{ routeCount: number; citizenCount: number; junctionCount: number; durationMs: number }> {
    const start = Date.now();

    const [routeCount, citizenCount, junctionCount] = await Promise.all([
      this.loadRoutingTable(env),
      this.loadScopeCaches(env),
      this.loadJunctionRegistry(env),
    ]);

    this.bootDurationMs = Date.now() - start;
    this.booted = true;

    return { routeCount, citizenCount, junctionCount, durationMs: this.bootDurationMs };
  }

  /**
   * Check if the engine has booted.
   */
  isBooted(): boolean {
    return this.booted;
  }

  // =========================================================================
  // ROUTING: Document → Citizen in O(1)
  // =========================================================================

  /**
   * Resolve a document to its handling citizen and skill.
   * This is THE hot path. Must be instant.
   */
  async resolve(key: RoutingKey, env: Env): Promise<RoutingResolution | null> {
    const start = performance.now();

    // Try exact match first
    let compositeKey = this.makeKey(key.docType, key.jurisdiction, key.category);
    let resolutions = this.routingTable.get(compositeKey);

    // Try wildcard jurisdiction
    if (!resolutions) {
      compositeKey = this.makeKey(key.docType, "*", key.category);
      resolutions = this.routingTable.get(compositeKey);
    }

    // Try wildcard category
    if (!resolutions) {
      compositeKey = this.makeKey(key.docType, key.jurisdiction, "*");
      resolutions = this.routingTable.get(compositeKey);
    }

    // Try double wildcard
    if (!resolutions) {
      compositeKey = this.makeKey(key.docType, "*", "*");
      resolutions = this.routingTable.get(compositeKey);
    }

    const elapsed = performance.now() - start;
    const method: ResolutionMethod = resolutions ? "INDEX_HIT" : "NO_MATCH";
    const resolution = resolutions
      ? resolutions.reduce((best, r) => r.priority > best.priority ? r : best, resolutions[0]!)
      : null;

    // Log the routing decision (non-blocking)
    this.logRouting(key, resolution, method, elapsed, env);

    return resolution;
  }

  /**
   * Resolve a document and return the citizen's full pre-loaded scope.
   * This is the complete path: document → citizen → ready toolkit.
   */
  async resolveWithScope(key: RoutingKey, env: Env): Promise<{
    resolution: RoutingResolution;
    scope: CitizenScopeCache;
  } | null> {
    const resolution = await this.resolve(key, env);
    if (!resolution) return null;

    const scope = this.scopeCaches.get(resolution.citizenName);
    if (!scope) return null;

    return { resolution, scope };
  }

  /**
   * Get all citizens that can handle a document type (for multi-citizen audits).
   */
  resolveAll(key: RoutingKey): RoutingResolution[] {
    const results: RoutingResolution[] = [];

    // Check exact and wildcard variants
    const keys = [
      this.makeKey(key.docType, key.jurisdiction, key.category),
      this.makeKey(key.docType, "*", key.category),
      this.makeKey(key.docType, key.jurisdiction, "*"),
      this.makeKey(key.docType, "*", "*"),
    ];

    const seen = new Set<string>();
    for (const k of keys) {
      const resolutions = this.routingTable.get(k);
      if (resolutions) {
        for (const r of resolutions) {
          if (!seen.has(r.citizenName + r.skillSlug)) {
            seen.add(r.citizenName + r.skillSlug);
            results.push(r);
          }
        }
      }
    }

    return results.sort((a, b) => b.priority - a.priority);
  }

  // =========================================================================
  // SCOPE: Pre-loaded citizen toolkit
  // =========================================================================

  /**
   * Get a citizen's pre-loaded scope cache.
   */
  getScope(citizenName: string): CitizenScopeCache | null {
    return this.scopeCaches.get(citizenName) ?? null;
  }

  /**
   * Rebuild a single citizen's scope cache.
   * Called when skills or standards change for that citizen.
   */
  async rebuildScope(citizenName: string, env: Env): Promise<CitizenScopeCache> {
    const start = Date.now();

    // Build skill manifest from D1
    const skillResult = await env.DB.prepare(
      `SELECT id, skill_slug, audit_triggers, audit_checklist, governing_standards, skill_type
       FROM citizen_skills WHERE citizen_name = ?1 AND is_active = 1`
    ).bind(citizenName).all();

    const skillManifest: Record<string, SkillManifestEntry> = {};
    if (skillResult.success && skillResult.results) {
      for (const row of skillResult.results) {
        const slug = row.skill_slug as string;
        const triggers = JSON.parse((row.audit_triggers as string) || "[]");
        const checklist = JSON.parse((row.audit_checklist as string) || "[]");
        const standards = JSON.parse((row.governing_standards as string) || "[]");
        skillManifest[slug] = {
          id: row.id as string,
          slug,
          triggers,
          checklistCount: checklist.length,
          standardIds: standards,
          skillType: row.skill_type as string,
        };
      }
    }

    // Build standard manifest from D1
    const stdResult = await env.DB.prepare(
      `SELECT id, citation, short_cite, standard_type, jurisdiction, document_types, requirements, private_right_of_action
       FROM governing_standards WHERE citizen_name = ?1 AND is_active = 1`
    ).bind(citizenName).all();

    const standardManifest: Record<string, StandardManifestEntry> = {};
    if (stdResult.success && stdResult.results) {
      for (const row of stdResult.results) {
        const id = row.id as string;
        const reqs = JSON.parse((row.requirements as string) || "[]");
        const docTypes = JSON.parse((row.document_types as string) || "[]");
        standardManifest[id] = {
          id,
          citation: row.citation as string,
          shortCite: row.short_cite as string | undefined,
          standardType: row.standard_type as string,
          jurisdiction: row.jurisdiction as string,
          documentTypes: docTypes,
          requirementsCount: reqs.length,
          privateRightOfAction: (row.private_right_of_action as number) === 1,
        };
      }
    }

    // Build routing keys from routing index
    const routeResult = await env.DB.prepare(
      `SELECT doc_type, jurisdiction, category FROM citizen_routing_index
       WHERE citizen_name = ?1 AND is_active = 1`
    ).bind(citizenName).all();

    const routingKeys: RoutingKey[] = [];
    if (routeResult.success && routeResult.results) {
      for (const row of routeResult.results) {
        routingKeys.push({
          docType: row.doc_type as string,
          jurisdiction: row.jurisdiction as string,
          category: row.category as string,
        });
      }
    }

    // Build cross-reference citizen list from junction registry
    const junctionResult = await env.DB.prepare(
      `SELECT citizen_a, citizen_b FROM junction_registry
       WHERE (citizen_a = ?1 OR citizen_b = ?1) AND is_active = 1`
    ).bind(citizenName).all();

    const crossRefCitizens: string[] = [];
    if (junctionResult.success && junctionResult.results) {
      for (const row of junctionResult.results) {
        const other = (row.citizen_a as string) === citizenName
          ? row.citizen_b as string
          : row.citizen_a as string;
        if (!crossRefCitizens.includes(other)) {
          crossRefCitizens.push(other);
        }
      }
    }

    const buildDurationMs = Date.now() - start;

    const cache: CitizenScopeCache = {
      citizenName,
      skillManifest,
      standardManifest,
      routingKeys,
      crossRefCitizens,
      skillCount: Object.keys(skillManifest).length,
      standardCount: Object.keys(standardManifest).length,
      routeCount: routingKeys.length,
      cacheVersion: (this.scopeCaches.get(citizenName)?.cacheVersion ?? 0) + 1,
      builtAt: new Date().toISOString(),
      buildDurationMs,
    };

    // Persist to D1
    await env.DB.prepare(
      `INSERT OR REPLACE INTO citizen_scope_cache
       (citizen_name, skill_manifest, standard_manifest, routing_keys, cross_ref_citizens,
        skill_count, standard_count, route_count, cache_version, built_at, build_duration_ms)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11)`
    ).bind(
      cache.citizenName,
      JSON.stringify(cache.skillManifest),
      JSON.stringify(cache.standardManifest),
      JSON.stringify(cache.routingKeys),
      JSON.stringify(cache.crossRefCitizens),
      cache.skillCount,
      cache.standardCount,
      cache.routeCount,
      cache.cacheVersion,
      cache.builtAt,
      cache.buildDurationMs
    ).run();

    // Update in-memory cache
    this.scopeCaches.set(citizenName, cache);

    return cache;
  }

  // =========================================================================
  // JUNCTIONS: Cross-reference authorization and workspace
  // =========================================================================

  /**
   * Check if two citizens are authorized to junction.
   */
  canJunction(citizenA: string, citizenB: string): JunctionRegistryEntry | null {
    const key = this.makeJunctionKey(citizenA, citizenB);
    return this.junctionMap.get(key) ?? null;
  }

  /**
   * Create a junction instance when a cross-reference is triggered.
   */
  async createJunction(
    citizenA: string,
    citizenB: string,
    triggerType: JunctionTriggerType,
    triggerSource: string,
    env: Env,
    triggerDetail?: Record<string, unknown>
  ): Promise<JunctionInstance | null> {
    // Verify authorization
    const registry = this.canJunction(citizenA, citizenB);
    if (!registry) return null;

    const instance: JunctionInstance = {
      id: generateId("jnct"),
      registryId: registry.id,
      citizenA,
      citizenB,
      triggerType,
      triggerSource,
      triggerDetail,
      sharedArtifacts: [],
      findings: [],
      auditTrail: [{
        citizen: "SYSTEM",
        action: "JUNCTION_CREATED",
        timestamp: new Date().toISOString(),
        detail: `Triggered by ${triggerType} from ${triggerSource}`,
      }],
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24h TTL default
    };

    await env.DB.prepare(
      `INSERT INTO junction_instances
       (id, registry_id, citizen_a, citizen_b, trigger_type, trigger_source, trigger_detail,
        shared_artifacts, findings, audit_trail, status, created_at, expires_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13)`
    ).bind(
      instance.id, instance.registryId, instance.citizenA, instance.citizenB,
      instance.triggerType, instance.triggerSource,
      triggerDetail ? JSON.stringify(triggerDetail) : null,
      "[]", "[]", JSON.stringify(instance.auditTrail),
      instance.status, instance.createdAt, instance.expiresAt
    ).run();

    return instance;
  }

  /**
   * Add an artifact to a junction's shared workspace.
   */
  async addArtifact(junctionId: string, artifactId: string, citizenName: string, env: Env): Promise<void> {
    const row = await env.DB.prepare(
      `SELECT shared_artifacts, audit_trail FROM junction_instances WHERE id = ?1`
    ).bind(junctionId).first();
    if (!row) return;

    const artifacts: string[] = JSON.parse((row.shared_artifacts as string) || "[]");
    const trail: JunctionAuditEntry[] = JSON.parse((row.audit_trail as string) || "[]");

    if (!artifacts.includes(artifactId)) {
      artifacts.push(artifactId);
      trail.push({
        citizen: citizenName,
        action: "ARTIFACT_SHARED",
        timestamp: new Date().toISOString(),
        detail: artifactId,
      });

      await env.DB.prepare(
        `UPDATE junction_instances SET shared_artifacts = ?1, audit_trail = ?2 WHERE id = ?3`
      ).bind(JSON.stringify(artifacts), JSON.stringify(trail), junctionId).run();
    }
  }

  /**
   * Add a finding to a junction.
   */
  async addFinding(junctionId: string, findingId: string, citizenName: string, env: Env): Promise<void> {
    const row = await env.DB.prepare(
      `SELECT findings, audit_trail FROM junction_instances WHERE id = ?1`
    ).bind(junctionId).first();
    if (!row) return;

    const findings: string[] = JSON.parse((row.findings as string) || "[]");
    const trail: JunctionAuditEntry[] = JSON.parse((row.audit_trail as string) || "[]");

    findings.push(findingId);
    trail.push({
      citizen: citizenName,
      action: "FINDING_ADDED",
      timestamp: new Date().toISOString(),
      detail: findingId,
    });

    await env.DB.prepare(
      `UPDATE junction_instances SET findings = ?1, audit_trail = ?2 WHERE id = ?3`
    ).bind(JSON.stringify(findings), JSON.stringify(trail), junctionId).run();
  }

  /**
   * Complete a junction and optionally promote findings to evidence.
   */
  async completeJunction(junctionId: string, promoteTo?: string, env?: Env): Promise<void> {
    if (!env) return;
    const status = promoteTo ? "PROMOTED" : "COMPLETED";

    await env.DB.prepare(
      `UPDATE junction_instances SET status = ?1, promoted_to = ?2, completed_at = ?3 WHERE id = ?4`
    ).bind(status, promoteTo ?? null, new Date().toISOString(), junctionId).run();
  }

  // =========================================================================
  // INDEX MANAGEMENT: Build and maintain the routing index
  // =========================================================================

  /**
   * Register a routing entry. Called when skills/standards change.
   */
  async registerRoute(entry: Omit<RoutingIndexEntry, "id" | "createdAt" | "updatedAt">, env: Env): Promise<string> {
    const id = generateId("rte");

    await env.DB.prepare(
      `INSERT OR REPLACE INTO citizen_routing_index
       (id, doc_type, jurisdiction, category, citizen_name, skill_slug, skill_id,
        priority, standard_ids, cross_ref_paths, is_active, created_at, updated_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?12)`
    ).bind(
      id, entry.docType, entry.jurisdiction, entry.category,
      entry.citizenName, entry.skillSlug, entry.skillId ?? null,
      entry.priority, JSON.stringify(entry.standardIds),
      JSON.stringify(entry.crossRefPaths), entry.isActive ? 1 : 0,
      new Date().toISOString()
    ).run();

    // Update in-memory table
    const key = this.makeKey(entry.docType, entry.jurisdiction, entry.category);
    const existing = this.routingTable.get(key) ?? [];
    existing.push({
      citizenName: entry.citizenName,
      skillSlug: entry.skillSlug,
      skillId: entry.skillId,
      priority: entry.priority,
      standardIds: entry.standardIds,
      crossRefPaths: entry.crossRefPaths,
    });
    this.routingTable.set(key, existing);

    return id;
  }

  /**
   * Register a junction in the registry.
   */
  async registerJunction(
    entry: Omit<JunctionRegistryEntry, "id" | "createdAt">,
    env: Env
  ): Promise<string> {
    const id = generateId("jreg");

    await env.DB.prepare(
      `INSERT OR REPLACE INTO junction_registry
       (id, citizen_a, citizen_b, shared_categories, directionality, data_scope,
        justification, governing_standard_id, approved_by, is_active, created_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11)`
    ).bind(
      id, entry.citizenA, entry.citizenB,
      JSON.stringify(entry.sharedCategories), entry.directionality, entry.dataScope,
      entry.justification, entry.governingStandardId ?? null,
      entry.approvedBy ?? null, entry.isActive ? 1 : 0,
      new Date().toISOString()
    ).run();

    // Update in-memory map
    const key = this.makeJunctionKey(entry.citizenA, entry.citizenB);
    this.junctionMap.set(key, { ...entry, id, createdAt: new Date().toISOString() });

    return id;
  }

  /**
   * Full rebuild: regenerate routing index from skills + standards.
   * Call this when the skill registry or standards library changes.
   */
  async rebuildAll(env: Env): Promise<{
    routes: number;
    scopes: number;
    junctions: number;
    durationMs: number;
  }> {
    const start = Date.now();

    // Rebuild routing index from citizen_skills × governing_standards
    await env.DB.prepare(`DELETE FROM citizen_routing_index`).run();
    this.routingTable.clear();

    // For each skill, create routing entries from its triggers and document types
    const skills = await env.DB.prepare(
      `SELECT cs.id, cs.citizen_name, cs.skill_slug, cs.audit_triggers, gs.document_types, gs.jurisdiction, gs.id as std_id
       FROM citizen_skills cs
       LEFT JOIN governing_standards gs ON gs.citizen_name = cs.citizen_name
         AND gs.skill_slugs LIKE '%' || cs.skill_slug || '%'
       WHERE cs.is_active = 1`
    ).all();

    let routeCount = 0;
    if (skills.success && skills.results) {
      for (const row of skills.results) {
        const citizenName = row.citizen_name as string;
        const skillSlug = row.skill_slug as string;
        const skillId = row.id as string;
        const triggers: string[] = JSON.parse((row.audit_triggers as string) || "[]");
        const docTypes: string[] = JSON.parse((row.document_types as string) || "[]");
        const jurisdiction = (row.jurisdiction as string) || "*";
        const stdId = row.std_id as string | null;

        // Each document type the standard covers becomes a routing entry
        for (const docType of docTypes) {
          // Derive category from the skill slug
          const category = this.deriveCategory(skillSlug);
          await this.registerRoute({
            docType: docType.toUpperCase().replace(/\s+/g, "_"),
            jurisdiction,
            category,
            citizenName,
            skillSlug,
            skillId,
            priority: 0,
            standardIds: stdId ? [stdId] : [],
            crossRefPaths: [],
            isActive: true,
          }, env);
          routeCount++;
        }

        // Each trigger also becomes a routing entry with wildcard doc type
        for (const trigger of triggers) {
          const category = this.deriveCategory(skillSlug);
          await this.registerRoute({
            docType: trigger.toUpperCase().replace(/\s+/g, "_"),
            jurisdiction: "*",
            category,
            citizenName,
            skillSlug,
            skillId,
            priority: -1,  // Lower than doc-type matches
            standardIds: stdId ? [stdId] : [],
            crossRefPaths: [],
            isActive: true,
          }, env);
          routeCount++;
        }
      }
    }

    // Rebuild all scope caches
    const citizens = await env.DB.prepare(
      `SELECT DISTINCT name FROM persona_citizens`
    ).all();

    let scopeCount = 0;
    if (citizens.success && citizens.results) {
      // Rebuild in parallel batches of 5
      const names = citizens.results.map((r) => r.name as string);
      for (let i = 0; i < names.length; i += 5) {
        const batch = names.slice(i, i + 5);
        await Promise.all(batch.map((name) => this.rebuildScope(name, env)));
        scopeCount += batch.length;
      }
    }

    const durationMs = Date.now() - start;

    return {
      routes: routeCount,
      scopes: scopeCount,
      junctions: this.junctionMap.size,
      durationMs,
    };
  }

  /**
   * Get routing engine stats.
   */
  getStats(): {
    booted: boolean;
    bootDurationMs: number;
    routeCount: number;
    citizenCacheCount: number;
    junctionCount: number;
  } {
    return {
      booted: this.booted,
      bootDurationMs: this.bootDurationMs,
      routeCount: this.routingTable.size,
      citizenCacheCount: this.scopeCaches.size,
      junctionCount: this.junctionMap.size,
    };
  }

  // =========================================================================
  // PRIVATE: Loaders and helpers
  // =========================================================================

  private async loadRoutingTable(env: Env): Promise<number> {
    const result = await env.DB.prepare(
      `SELECT * FROM citizen_routing_index WHERE is_active = 1`
    ).all();

    this.routingTable.clear();
    if (!result.success || !result.results) return 0;

    for (const row of result.results) {
      const key = this.makeKey(
        row.doc_type as string,
        row.jurisdiction as string,
        row.category as string
      );
      const resolution: RoutingResolution = {
        citizenName: row.citizen_name as string,
        skillSlug: row.skill_slug as string,
        skillId: row.skill_id as string | undefined,
        priority: row.priority as number,
        standardIds: JSON.parse((row.standard_ids as string) || "[]"),
        crossRefPaths: JSON.parse((row.cross_ref_paths as string) || "[]"),
      };
      const existing = this.routingTable.get(key) ?? [];
      existing.push(resolution);
      this.routingTable.set(key, existing);
    }

    return result.results.length;
  }

  private async loadScopeCaches(env: Env): Promise<number> {
    const result = await env.DB.prepare(
      `SELECT * FROM citizen_scope_cache`
    ).all();

    this.scopeCaches.clear();
    if (!result.success || !result.results) return 0;

    for (const row of result.results) {
      const cache: CitizenScopeCache = {
        citizenName: row.citizen_name as string,
        skillManifest: JSON.parse((row.skill_manifest as string) || "{}"),
        standardManifest: JSON.parse((row.standard_manifest as string) || "{}"),
        routingKeys: JSON.parse((row.routing_keys as string) || "[]"),
        crossRefCitizens: JSON.parse((row.cross_ref_citizens as string) || "[]"),
        skillCount: row.skill_count as number,
        standardCount: row.standard_count as number,
        routeCount: row.route_count as number,
        cacheVersion: row.cache_version as number,
        builtAt: row.built_at as string,
        expiresAt: row.expires_at as string | undefined,
        buildDurationMs: row.build_duration_ms as number | undefined,
      };
      this.scopeCaches.set(cache.citizenName, cache);
    }

    return result.results.length;
  }

  private async loadJunctionRegistry(env: Env): Promise<number> {
    const result = await env.DB.prepare(
      `SELECT * FROM junction_registry WHERE is_active = 1`
    ).all();

    this.junctionMap.clear();
    if (!result.success || !result.results) return 0;

    for (const row of result.results) {
      const entry: JunctionRegistryEntry = {
        id: row.id as string,
        citizenA: row.citizen_a as string,
        citizenB: row.citizen_b as string,
        sharedCategories: JSON.parse((row.shared_categories as string) || "[]"),
        directionality: row.directionality as JunctionRegistryEntry["directionality"],
        dataScope: row.data_scope as JunctionRegistryEntry["dataScope"],
        justification: row.justification as string,
        governingStandardId: row.governing_standard_id as string | undefined,
        approvedBy: row.approved_by as string | undefined,
        isActive: (row.is_active as number) === 1,
        createdAt: row.created_at as string,
      };
      const key = this.makeJunctionKey(entry.citizenA, entry.citizenB);
      this.junctionMap.set(key, entry);
    }

    return result.results.length;
  }

  /**
   * Composite key for routing table lookup.
   */
  private makeKey(docType: string, jurisdiction: string, category: string): string {
    return `${docType}|${jurisdiction}|${category}`;
  }

  /**
   * Order-independent key for junction pairs.
   */
  private makeJunctionKey(a: string, b: string): string {
    return a < b ? `${a}|${b}` : `${b}|${a}`;
  }

  /**
   * Derive a category from a skill slug.
   */
  private deriveCategory(skillSlug: string): string {
    const slug = skillSlug.toLowerCase();
    if (slug.includes("police") || slug.includes("cad-log") || slug.includes("law-enforcement")) return "LAW_ENFORCEMENT";
    if (slug.includes("family-law") || slug.includes("cps") || slug.includes("child")) return "FAMILY_LAW";
    if (slug.includes("civil-rights") || slug.includes("constitutional")) return "CIVIL_RIGHTS";
    if (slug.includes("financial") || slug.includes("banking") || slug.includes("fcra")) return "FINANCIAL";
    if (slug.includes("medical") || slug.includes("psychiatry") || slug.includes("neurology")) return "MEDICAL";
    if (slug.includes("insurance") || slug.includes("bad-faith")) return "INSURANCE";
    if (slug.includes("housing") || slug.includes("tenant") || slug.includes("real-estate")) return "REAL_ESTATE";
    if (slug.includes("labor") || slug.includes("employment")) return "EMPLOYMENT";
    if (slug.includes("immigration")) return "IMMIGRATION";
    if (slug.includes("court") || slug.includes("attorney") || slug.includes("bar")) return "COURT_FILINGS";
    if (slug.includes("military") || slug.includes("usmc")) return "MILITARY";
    if (slug.includes("victim") || slug.includes("marsys")) return "VICTIM_RIGHTS";
    if (slug.includes("document") || slug.includes("authentication") || slug.includes("forensic")) return "DOCUMENT_FORENSICS";
    if (slug.includes("intake") || slug.includes("triage") || slug.includes("structuring")) return "INTAKE";
    if (slug.includes("photo") || slug.includes("facial")) return "FORENSIC_IMAGING";
    if (slug.includes("sync") || slug.includes("archive")) return "OPERATIONS";
    if (slug.includes("style") || slug.includes("enforcer")) return "GOVERNANCE";
    return "GENERAL";
  }

  /**
   * Non-blocking routing audit log.
   */
  private logRouting(
    key: RoutingKey,
    resolution: RoutingResolution | null,
    method: ResolutionMethod,
    elapsedMs: number,
    env: Env
  ): void {
    // Fire and forget — don't slow down the hot path
    env.DB.prepare(
      `INSERT INTO routing_audit_log (id, doc_type, jurisdiction, category, resolved_citizen, resolved_skill, resolution_method, resolution_ns, created_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)`
    ).bind(
      generateId("rlog"),
      key.docType, key.jurisdiction, key.category,
      resolution?.citizenName ?? null,
      resolution?.skillSlug ?? null,
      method,
      Math.round(elapsedMs * 1_000_000), // Convert ms to ns
      new Date().toISOString()
    ).run().catch(() => {}); // Never let logging fail the hot path
  }
}

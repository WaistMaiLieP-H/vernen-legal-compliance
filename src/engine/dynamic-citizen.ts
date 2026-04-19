import { PersonaCitizenBase } from "../personas/base.js";
import { PersonaCitizenStatus } from "../types/persona.js";
import { generateId ,safeKvPut} from "../utils/helpers.js";
import type { Env } from "../index.js";
import type { CitizenSpec } from "./types.js";
import { CUSTOS } from "../services/custos.js";

// ---------------------------------------------------------------------------
// Activity row shape
// ---------------------------------------------------------------------------
interface ActivityRow {
  id: string;
  citizen_id: string;
  action: string;
  details: string | null;
  created_at: string;
}

/**
 * DynamicCitizen — a generic Citizen instantiated from a CitizenSpec at runtime.
 *
 * The 15 core Citizens (REGULIS, ADVOCIS, etc.) are hand-built classes with
 * specialized logic. DynamicCitizen is the factory-produced counterpart:
 * it reads its behavior from a spec and provides generic event handling,
 * knowledge storage, and activity logging via D1 and KV.
 */
export class DynamicCitizen extends PersonaCitizenBase {
  private readonly spec: CitizenSpec;
  private readonly kvPrefix: string;
  private readonly deploymentId: string;

  constructor(spec: CitizenSpec, deploymentId: string, kvPrefix: string) {
    super(spec.name, `${spec.name.toLowerCase()}-knowledge`, PersonaCitizenStatus.CONCEIVED);
    this.spec = spec;
    this.kvPrefix = kvPrefix;
    this.deploymentId = deploymentId;
  }

  // ---------------------------------------------------------------------------
  // Lifecycle overrides
  // ---------------------------------------------------------------------------

  /**
   * Initialize this dynamic Citizen by reading its status from D1
   * and setting up its KV namespace.
   */
  async initialize(env: Env): Promise<void> {
    // Attempt to read current status from D1
    try {
      const row = await env.DB.prepare(
        `SELECT status FROM citizen_deployments WHERE id = ?1 LIMIT 1`
      )
        .bind(this.deploymentId)
        .first<{ status: string }>();

      if (row && row.status === "ACTIVE") {
        this._status = PersonaCitizenStatus.SHELL_DEPLOYED;
      }
    } catch {
      this._status = PersonaCitizenStatus.SHELL_DEPLOYED;
    }

    // Initialize KV with boot marker
    await safeKvPut(env.KNOWLEDGE_STORE, 
      `${this.kvPrefix}system:last_boot`,
      new Date().toISOString()
    );
  }

  /**
   * Generic event handler — logs events to D1 activity and KV knowledge store.
   */
  async receiveEvent(
    event: string,
    payload: unknown,
    env: Env
  ): Promise<void> {
    // Record the event in the activity log
    await this.recordActivity(
      `event:${event}`,
      JSON.stringify({ event, payload, receivedAt: new Date().toISOString() }),
      env
    );

    // Store in KV knowledge namespace for retrieval
    const eventKey = `${this.kvPrefix}event:${event}:${Date.now()}`;
    await safeKvPut(env.KNOWLEDGE_STORE, 
      eventKey,
      JSON.stringify({ event, payload, processedAt: new Date().toISOString() }),
      { expirationTtl: 90 * 86400 } // 90 days
    );

    // Increment event counter
    const counterKey = `${this.kvPrefix}stats:events_received`;
    const current = await env.KNOWLEDGE_STORE.get(counterKey);
    const count = (current ? parseInt(current, 10) : 0) + 1;
    await safeKvPut(env.KNOWLEDGE_STORE, counterKey, String(count));
  }

  /**
   * Search this Citizen's KV knowledge namespace by query prefix.
   */
  async queryKnowledge(
    query: string,
    env: Env
  ): Promise<{ query: string; results: Array<{ key: string; value: unknown }>; source: string }> {
    // CUSTOS hard gate — Citizen knowledge output requires authorization
    const custosToken = CUSTOS.authorize(
      `citizen-query:${this.spec.name}:${query}`
    );

    const prefix = `${this.kvPrefix}${query}`;
    const listResult = await env.KNOWLEDGE_STORE.list({ prefix, limit: 50 });

    const results: Array<{ key: string; value: unknown }> = [];
    for (const keyEntry of listResult.keys) {
      const value = await env.KNOWLEDGE_STORE.get(keyEntry.name, "json");
      if (value !== null) {
        results.push({
          key: keyEntry.name.slice(this.kvPrefix.length),
          value,
        });
      }
    }

    CUSTOS.enforce(custosToken, `citizen-query-output:${this.spec.name}`);
    return { query, results, source: this.name };
  }

  // ---------------------------------------------------------------------------
  // Activity Logging
  // ---------------------------------------------------------------------------

  /**
   * Record an activity entry for this Citizen in D1.
   */
  async recordActivity(
    action: string,
    details: string,
    env: Env
  ): Promise<void> {
    try {
      await env.DB.prepare(
        `INSERT INTO citizen_activity (id, citizen_id, action, details, created_at)
         VALUES (?1, ?2, ?3, ?4, ?5)`
      )
        .bind(
          generateId("activity"),
          this.deploymentId,
          action,
          details,
          new Date().toISOString()
        )
        .run();
    } catch {
      // Fallback: store in KV if D1 table doesn't exist
      const key = `${this.kvPrefix}activity:${Date.now()}`;
      await safeKvPut(env.KNOWLEDGE_STORE, 
        key,
        JSON.stringify({ action, details, createdAt: new Date().toISOString() })
      );
    }
  }

  /**
   * Retrieve the activity log for this Citizen.
   */
  async getActivityLog(
    limit: number,
    env: Env
  ): Promise<Array<{ id: string; action: string; details: unknown; createdAt: string }>> {
    try {
      const result = await env.DB.prepare(
        `SELECT id, citizen_id, action, details, created_at
         FROM citizen_activity
         WHERE citizen_id = ?1
         ORDER BY created_at DESC
         LIMIT ?2`
      )
        .bind(this.deploymentId, limit)
        .all<ActivityRow>();

      if (!result.success || !result.results) return [];

      return result.results.map((row) => ({
        id: row.id,
        action: row.action,
        details: row.details ? JSON.parse(row.details) : null,
        createdAt: row.created_at,
      }));
    } catch {
      return [];
    }
  }

  /**
   * Get the full status of this dynamic Citizen including worker info.
   */
  async getStatus(
    env: Env
  ): Promise<{
    name: string;
    trademark: string;
    domain: string;
    industry: string;
    category: string;
    status: PersonaCitizenStatus;
    governanceType: string;
    capabilities: string[];
    workers: Array<{ id: string; name: string; description: string; mode: string }>;
    kvPrefix: string;
    eventsReceived: number;
    lastBoot: string | null;
    deploymentId: string;
  }> {
    // Read counters from KV
    const eventsRaw = await env.KNOWLEDGE_STORE.get(
      `${this.kvPrefix}stats:events_received`
    );
    const eventsReceived = eventsRaw ? parseInt(eventsRaw, 10) : 0;

    const lastBoot = await env.KNOWLEDGE_STORE.get(
      `${this.kvPrefix}system:last_boot`
    );

    return {
      name: this.spec.name,
      trademark: this.spec.trademark,
      domain: this.spec.domain,
      industry: this.spec.industry,
      category: this.spec.category,
      status: this._status,
      governanceType: this.spec.governanceType,
      capabilities: this.spec.capabilities,
      workers: this.spec.workers.map((w) => ({
        id: w.id,
        name: w.name,
        description: w.description,
        mode: w.mode,
      })),
      kvPrefix: this.kvPrefix,
      eventsReceived,
      lastBoot,
      deploymentId: this.deploymentId,
    };
  }
}

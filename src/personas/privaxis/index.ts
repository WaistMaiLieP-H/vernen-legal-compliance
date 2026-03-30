/**
 * PRIVAXIS — Data Protection & Privacy Compliance Citizen.
 *
 * Wave 5 Persona Citizen, Oversight Committee Member. PRIVAXIS protects all
 * client data, enforces privacy-by-design, and manages security operations.
 * Every byte is accounted for. Every access is logged. Every right is honored.
 *
 * Workers:
 *   - GUARD-1: Privacy operations (audits, consent, data classification, DSAR)
 *   - SHIELD-1: Security operations (auth controls, exposure scans, event log)
 */

import { PersonaCitizenBase } from "../base.js";
import { PersonaCitizenStatus } from "../../types/persona.js";
import { generateId , safeKvPut } from "../../utils/helpers.js";
import { Guard1Worker } from "../../workers/guard-1/index.js";
import { Shield1Worker } from "../../workers/shield-1/index.js";
import { DSARType } from "../../workers/guard-1/types.js";
import { SecurityEventType, SecuritySeverity } from "../../workers/shield-1/types.js";
import type { Env } from "../../index.js";

/** KV namespace prefix for all PRIVAXIS knowledge entries. */
const KV_PREFIX = "PRIVAXIS:";

/** D1 table where persona citizen records live. */
const PERSONA_TABLE = "persona_citizens";

/**
 * Shape of a row in the persona_citizens D1 table.
 */
interface PersonaRow {
  id: string;
  name: string;
  status: string;
  deployed_at: string | null;
  conceived_at: string;
}

/**
 * PRIVAXIS — The Data Protection & Privacy Compliance Persona Citizen.
 * Guards all client data, enforces privacy-by-design, manages security ops.
 */
export class Privaxis extends PersonaCitizenBase {
  private guard: Guard1Worker;
  private shield: Shield1Worker;

  constructor() {
    super("PRIVAXIS", "privaxis-knowledge", PersonaCitizenStatus.CONCEIVED);
    this.guard = new Guard1Worker();
    this.shield = new Shield1Worker();
  }

  // ---------------------------------------------------------------------------
  // Lifecycle overrides
  // ---------------------------------------------------------------------------

  /**
   * Initialize PRIVAXIS by reading its status from D1 and setting up its
   * knowledge store namespace in KV.
   */
  async initialize(env: Env): Promise<void> {
    try {
      const row = await env.DB.prepare(
        `SELECT id, name, status, deployed_at, conceived_at
         FROM ${PERSONA_TABLE}
         WHERE name = ?1
         LIMIT 1`
      )
        .bind("PRIVAXIS")
        .first<PersonaRow>();

      if (row) {
        const dbStatus = row.status as PersonaCitizenStatus;
        if (Object.values(PersonaCitizenStatus).includes(dbStatus)) {
          this._status = dbStatus;
        }
      } else {
        // First boot — insert persona record
        await env.DB.prepare(
          `INSERT OR IGNORE INTO ${PERSONA_TABLE}
           (id, name, status, conceived_at)
           VALUES (?1, ?2, ?3, ?4)`
        )
          .bind(
            generateId("persona"),
            "PRIVAXIS",
            PersonaCitizenStatus.SHELL_DEPLOYED,
            new Date().toISOString()
          )
          .run();

        this._status = PersonaCitizenStatus.SHELL_DEPLOYED;
      }
    } catch {
      this._status = PersonaCitizenStatus.SHELL_DEPLOYED;
    }

    // Initialize KV knowledge namespace with boot marker
    const bootKey = `${KV_PREFIX}system:last_boot`;
    await safeKvPut(env.KNOWLEDGE_STORE, bootKey, new Date().toISOString());

    // Ensure KV counters exist
    const totalAuditsKey = `${KV_PREFIX}stats:total_audits`;
    const existing = await env.KNOWLEDGE_STORE.get(totalAuditsKey);
    if (existing === null) {
      await safeKvPut(env.KNOWLEDGE_STORE, totalAuditsKey, "0");
    }
  }

  /**
   * Handle inbound events from the system or other Persona Citizens.
   */
  async receiveEvent(
    event: string,
    payload: unknown,
    env: Env
  ): Promise<void> {
    switch (event) {
      case "data_access_request": {
        const data = payload as {
          clientId: string;
          requestedBy: string;
          dataType: string;
        };
        // Log the data access as a security event
        await this.shield.logSecurityEvent(
          {
            eventType: SecurityEventType.DATA_ACCESS,
            severity: SecuritySeverity.INFO,
            description: `Data access request for client ${data.clientId}: ${data.dataType}`,
            source: data.requestedBy,
            metadata: data as unknown as Record<string, unknown>,
          },
          env
        );
        await this._recordKnowledge(
          `data_access:${Date.now()}`,
          { ...data, recordedAt: new Date().toISOString() },
          env
        );
        break;
      }

      case "privacy_review": {
        // Trigger a full privacy audit
        const audit = await this.runPrivacyAudit(env);
        await this._recordKnowledge(
          `privacy_review:${audit.id}`,
          { triggeredBy: "event", auditId: audit.id, riskLevel: audit.riskLevel },
          env
        );
        break;
      }

      case "breach_detected": {
        const data = payload as {
          description: string;
          source: string;
          severity?: string;
        };
        // Log as critical security event
        await this.shield.logSecurityEvent(
          {
            eventType: SecurityEventType.BREACH_ATTEMPT,
            severity: SecuritySeverity.CRITICAL,
            description: data.description,
            source: data.source,
            metadata: data as unknown as Record<string, unknown>,
          },
          env
        );
        // Trigger immediate audit
        await this.runPrivacyAudit(env);
        await this._recordKnowledge(
          `breach:${Date.now()}`,
          { ...data, respondedAt: new Date().toISOString() },
          env
        );
        break;
      }

      case "new_client_data": {
        const data = payload as {
          clientId: string;
          dataType: string;
          source: string;
        };
        // Log the new data intake
        await this.shield.logSecurityEvent(
          {
            eventType: SecurityEventType.DATA_ACCESS,
            severity: SecuritySeverity.LOW,
            description: `New client data received: ${data.dataType} for client ${data.clientId}`,
            source: data.source,
          },
          env
        );
        await this._recordKnowledge(
          `new_data:${data.clientId}:${Date.now()}`,
          { ...data, ingestedAt: new Date().toISOString() },
          env
        );
        break;
      }

      default:
        await this._recordKnowledge(
          `unknown_event:${Date.now()}`,
          { event, payload, receivedAt: new Date().toISOString() },
          env
        );
        break;
    }
  }

  /**
   * Search PRIVAXIS's KV knowledge store by query string.
   */
  async queryKnowledge(
    query: string,
    env: Env
  ): Promise<{
    query: string;
    results: Array<{ key: string; value: unknown }>;
    source: string;
  }> {
    const prefix = `${KV_PREFIX}${query}`;
    const listResult = await env.KNOWLEDGE_STORE.list({ prefix, limit: 50 });

    const results: Array<{ key: string; value: unknown }> = [];
    for (const keyEntry of listResult.keys) {
      const value = await env.KNOWLEDGE_STORE.get(keyEntry.name, "json");
      if (value !== null) {
        results.push({
          key: keyEntry.name.slice(KV_PREFIX.length),
          value,
        });
      }
    }

    return { query, results, source: this.name };
  }

  // ---------------------------------------------------------------------------
  // Privacy operations
  // ---------------------------------------------------------------------------

  /**
   * Run a full privacy audit across the platform.
   * Delegates to GUARD-1 for the privacy impact assessment.
   */
  async runPrivacyAudit(env: Env) {
    const audit = await this.guard.generatePrivacyReport(env);

    // Increment audit counter
    await this._incrementStat("total_audits", env);

    // Record latest audit result
    await this._recordKnowledge(
      `audit:latest`,
      {
        auditId: audit.id,
        riskLevel: audit.riskLevel,
        findingCount: audit.findings.length,
        auditedAt: audit.auditedAt,
      },
      env
    );

    return audit;
  }

  /**
   * Map all data flows across the platform.
   * Shows what data goes where, who accesses it, and how it's classified.
   */
  async assessDataFlow(env: Env) {
    const flows = await this.guard.mapDataFlows(env);
    const classification = await this.guard.classifyData(env);

    return {
      flows,
      classification: classification.summary,
      totalFlows: flows.length,
      piiFieldCount: classification.piiFieldCount,
      encryptedFieldCount: classification.encryptedFieldCount,
      assessedAt: new Date().toISOString(),
    };
  }

  /**
   * Get the current privacy posture of the platform.
   * Combines privacy audit, security posture, and DSAR status.
   */
  async getPrivacyStatus(env: Env) {
    const [securityPosture, consentCompliance, dataClassification] =
      await Promise.all([
        this.shield.getSecurityPosture(env),
        this.guard.checkConsentCompliance(env),
        this.guard.classifyData(env),
      ]);

    // Get DSAR stats
    let pendingDSARs = 0;
    let totalDSARs = 0;
    try {
      const dsarStats = await env.DB.prepare(
        `SELECT
           COUNT(*) as total,
           SUM(CASE WHEN status IN ('PENDING', 'IN_PROGRESS') THEN 1 ELSE 0 END) as pending
         FROM dsar_requests`
      ).first<{ total: number; pending: number }>();

      totalDSARs = dsarStats?.total ?? 0;
      pendingDSARs = dsarStats?.pending ?? 0;
    } catch {
      // Table may not exist
    }

    const lastBoot = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}system:last_boot`
    );

    return {
      citizen: "PRIVAXIS",
      status: this._status,
      lastBoot,
      security: {
        score: securityPosture.overallScore,
        grade: securityPosture.grade,
        recentEvents: securityPosture.recentSecurityEvents,
      },
      privacy: {
        consentComplianceRate: consentCompliance.complianceRate,
        piiFieldCount: dataClassification.piiFieldCount,
        encryptedFieldCount: dataClassification.encryptedFieldCount,
      },
      dsar: {
        total: totalDSARs,
        pending: pendingDSARs,
      },
      assessedAt: new Date().toISOString(),
    };
  }

  /**
   * Process a Data Subject Access Request (access, delete, or export).
   */
  async handleDSAR(
    requestType: DSARType,
    clientId: string,
    env: Env
  ) {
    const dsar = await this.guard.processDSAR(requestType, clientId, env);

    // Log DSAR as a security event for audit trail
    await this.shield.logSecurityEvent(
      {
        eventType: SecurityEventType.DATA_ACCESS,
        severity: SecuritySeverity.MEDIUM,
        description: `DSAR ${requestType} request for client ${clientId}`,
        source: "PRIVAXIS",
        metadata: {
          dsarId: dsar.id,
          requestType: dsar.type,
          clientId: dsar.clientId,
        },
      },
      env
    );

    await this._recordKnowledge(
      `dsar:${dsar.id}`,
      {
        type: dsar.type,
        clientId: dsar.clientId,
        status: dsar.status,
        requestedAt: dsar.requestedAt,
      },
      env
    );

    return dsar;
  }

  // ---------------------------------------------------------------------------
  // Delegate methods to workers
  // ---------------------------------------------------------------------------

  /** Get data classification report via GUARD-1. */
  async getDataClassification(env: Env) {
    return this.guard.classifyData(env);
  }

  /** Get security posture via SHIELD-1. */
  async getSecurityPosture(env: Env) {
    return this.shield.getSecurityPosture(env);
  }

  /** Get security events via SHIELD-1. */
  async getSecurityEvents(env: Env, limit?: number) {
    return this.shield.getSecurityEvents(env, limit);
  }

  /** Get data collection audit via GUARD-1. */
  async getDataCollectionAudit(env: Env) {
    return this.guard.auditDataCollection(env);
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  private async _recordKnowledge(
    key: string,
    value: unknown,
    env: Env
  ): Promise<void> {
    const fullKey = `${KV_PREFIX}${key}`;
    await safeKvPut(env.KNOWLEDGE_STORE, fullKey, JSON.stringify(value));
  }

  private async _incrementStat(statName: string, env: Env): Promise<void> {
    const key = `${KV_PREFIX}stats:${statName}`;
    const currentRaw = await env.KNOWLEDGE_STORE.get(key);
    const current = currentRaw ? parseInt(currentRaw, 10) : 0;
    await safeKvPut(env.KNOWLEDGE_STORE, key, String(current + 1));
  }
}

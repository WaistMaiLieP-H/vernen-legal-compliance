import { PersonaCitizenBase } from "../base.js";
import type { Client, BusinessEntityType, USState } from "../../types/client.js";
import { PersonaCitizenStatus } from "../../types/persona.js";
import { Serve1Worker } from "../../workers/serve-1/index.js";
import { Board1Worker } from "../../workers/board-1/index.js";
import { generateId , safeKvPut } from "../../utils/helpers.js";
import type { Env } from "../../index.js";

/** KV namespace prefix for all ADVOCIS knowledge entries. */
const KV_PREFIX = "ADVOCIS:";

/** D1 table where persona citizen records live. */
const PERSONA_TABLE = "persona_citizens";

/** Clients with no purchase in this many days are flagged as churn risk. */
const CHURN_THRESHOLD_DAYS = 60;

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
 * Shape of a client row from D1.
 */
interface ClientRow {
  id: string;
  name: string;
  email: string;
  entity_type: string;
  industry: string | null;
  created_at: string;
}

/**
 * Shape of a feedback row from D1.
 */
interface FeedbackRow {
  id: string;
  client_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

/**
 * Client health metrics returned by getClientHealth.
 */
export interface ClientHealth {
  clientId: string;
  healthScore: number;
  factors: {
    recencyScore: number;
    engagementScore: number;
    sentimentScore: number;
  };
  lastPurchase: string | null;
  totalReports: number;
  averageRating: number | null;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
}

/**
 * Aggregate client statistics.
 */
export interface ClientStats {
  totalClients: number;
  activeClients: number;
  retentionRate: number;
  avgReportsPerClient: number;
  totalFeedback: number;
  averageRating: number;
  openInquiries: number;
}

/**
 * ADVOCIS — The Client Advocacy Persona Citizen.
 *
 * Wave 2 Persona Citizen. ADVOCIS is the retention engine: it turns
 * one-time buyers into subscribers and manages all client-facing
 * interactions. While REGULIS generates revenue, ADVOCIS keeps it.
 *
 * Workers:
 *   SERVE-1 — client service engine (inquiry handling)
 *   BOARD-1 — client onboarding workflow
 */
export class Advocis extends PersonaCitizenBase {
  private serviceEngine: Serve1Worker;
  private onboardingEngine: Board1Worker;

  constructor() {
    super("ADVOCIS", "advocis-knowledge", PersonaCitizenStatus.CONCEIVED);
    this.serviceEngine = new Serve1Worker();
    this.onboardingEngine = new Board1Worker();
  }

  // ---------------------------------------------------------------------------
  // Lifecycle overrides
  // ---------------------------------------------------------------------------

  /**
   * Initialize ADVOCIS by reading its status from D1 and setting up its
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
        .bind("ADVOCIS")
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
           (id, name, trademark, domain, description, status, conceived_at)
           VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`
        )
          .bind(
            generateId("persona"),
            "ADVOCIS",
            "ADVOCIS\u2122",
            "Client Advocacy",
            "Client Advocacy Persona Citizen. Turns one-time buyers into subscribers and manages all client-facing interactions.",
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

    // Ensure counters exist
    const totalClientsKey = `${KV_PREFIX}stats:total_clients_onboarded`;
    const existing = await env.KNOWLEDGE_STORE.get(totalClientsKey);
    if (existing === null) {
      await safeKvPut(env.KNOWLEDGE_STORE, totalClientsKey, "0");
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
      case "client_registered": {
        const data = payload as {
          clientId: string;
          businessName: string;
          email: string;
          entityType: BusinessEntityType;
          states: USState[];
        };
        // Trigger onboarding for the new client
        await this.onboardClient(
          {
            id: data.clientId,
            name: data.businessName,
            entityType: data.entityType,
            states: data.states,
            industry: "General",
            createdAt: new Date().toISOString(),
          },
          env
        );
        break;
      }

      case "report_purchased": {
        const data = payload as {
          clientId: string;
          reportId: string;
          purchasedAt: string;
        };
        // Record purchase activity for health tracking
        await this.recordKnowledge(
          `activity:purchase:${data.clientId}:${Date.now()}`,
          {
            clientId: data.clientId,
            reportId: data.reportId,
            purchasedAt: data.purchasedAt,
          },
          env
        );
        // Update last purchase timestamp
        await safeKvPut(env.KNOWLEDGE_STORE, 
          `${KV_PREFIX}client:${data.clientId}:last_purchase`,
          data.purchasedAt
        );
        break;
      }

      case "client_feedback": {
        const data = payload as {
          clientId: string;
          rating: number;
          comment?: string;
        };
        await this.recordFeedback(
          data.clientId,
          data.rating,
          data.comment ?? null,
          env
        );
        break;
      }

      case "support_request": {
        const data = payload as {
          clientId?: string;
          type: string;
          message: string;
        };
        await this.serviceEngine.handleInquiry(
          {
            clientId: data.clientId,
            type: data.type,
            message: data.message,
          },
          env
        );
        break;
      }

      default:
        await this.recordKnowledge(
          `unknown_event:${Date.now()}`,
          { event, payload, receivedAt: new Date().toISOString() },
          env
        );
        break;
    }
  }

  /**
   * Search ADVOCIS's KV knowledge store by query string.
   */
  async queryKnowledge(
    query: string,
    env: Env
  ): Promise<{ query: string; results: Array<{ key: string; value: unknown }>; source: string }> {
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
  // Client Onboarding
  // ---------------------------------------------------------------------------

  /**
   * Onboard a new client: creates an onboarding record, stores a welcome
   * sequence marker, and records the event in KV.
   */
  async onboardClient(client: Client, env: Env): Promise<{
    clientId: string;
    onboardingId: string;
    welcomeSequence: string;
    steps: unknown[];
  }> {
    // Create the onboarding flow via BOARD-1
    const flow = await this.onboardingEngine.createOnboardingFlow(
      {
        id: client.id,
        entityType: client.entityType,
        states: client.states,
      },
      env
    );

    // Record onboarding in knowledge store
    await this.recordKnowledge(
      `onboarding:${client.id}`,
      {
        clientId: client.id,
        clientName: client.name,
        entityType: client.entityType,
        states: client.states,
        onboardingId: flow.id,
        startedAt: flow.startedAt,
      },
      env
    );

    // Store welcome sequence info
    const welcomeMessage =
      `Welcome to Vernen Legal Compliance, ${client.name}! ` +
      `Your ${client.entityType} operating in ${client.states.join(", ")} ` +
      `is now set up for continuous compliance monitoring.`;

    await safeKvPut(env.KNOWLEDGE_STORE, 
      `${KV_PREFIX}welcome:${client.id}`,
      welcomeMessage
    );

    // Increment onboarded counter
    const counterKey = `${KV_PREFIX}stats:total_clients_onboarded`;
    const current = await env.KNOWLEDGE_STORE.get(counterKey);
    const newCount = (current ? parseInt(current, 10) : 0) + 1;
    await safeKvPut(env.KNOWLEDGE_STORE, counterKey, String(newCount));

    return {
      clientId: client.id,
      onboardingId: flow.id,
      welcomeSequence: welcomeMessage,
      steps: flow.steps,
    };
  }

  // ---------------------------------------------------------------------------
  // Client Health
  // ---------------------------------------------------------------------------

  /**
   * Calculate a health score for a given client based on:
   *   - Recency of last purchase (40% weight)
   *   - Number of reports purchased (30% weight)
   *   - Feedback sentiment (30% weight)
   *
   * Returns a score from 0-100 with risk classification.
   */
  async getClientHealth(clientId: string, env: Env): Promise<ClientHealth> {
    const now = Date.now();

    // --- Recency of last purchase ---
    let lastPurchase: string | null = null;
    let recencyScore = 0;

    // Check KV for last purchase timestamp
    const lastPurchaseStr = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}client:${clientId}:last_purchase`
    );

    if (lastPurchaseStr) {
      lastPurchase = lastPurchaseStr;
      const daysSince = (now - new Date(lastPurchaseStr).getTime()) / (1000 * 60 * 60 * 24);
      if (daysSince <= 7) recencyScore = 100;
      else if (daysSince <= 30) recencyScore = 80;
      else if (daysSince <= 60) recencyScore = 50;
      else if (daysSince <= 90) recencyScore = 25;
      else recencyScore = 10;
    } else {
      // Check D1 for any reports
      try {
        const row = await env.DB.prepare(
          `SELECT MAX(created_at) as last_date FROM compliance_reports WHERE client_id = ?1`
        )
          .bind(clientId)
          .first<{ last_date: string | null }>();

        if (row?.last_date) {
          lastPurchase = row.last_date;
          const daysSince = (now - new Date(row.last_date).getTime()) / (1000 * 60 * 60 * 24);
          if (daysSince <= 7) recencyScore = 100;
          else if (daysSince <= 30) recencyScore = 80;
          else if (daysSince <= 60) recencyScore = 50;
          else if (daysSince <= 90) recencyScore = 25;
          else recencyScore = 10;
        }
      } catch {
        // Table may not exist
      }
    }

    // --- Engagement: number of reports ---
    let totalReports = 0;
    let engagementScore = 0;

    try {
      const row = await env.DB.prepare(
        `SELECT COUNT(*) as count FROM compliance_reports WHERE client_id = ?1`
      )
        .bind(clientId)
        .first<{ count: number }>();

      totalReports = row?.count ?? 0;
    } catch {
      // Table may not exist
    }

    if (totalReports >= 10) engagementScore = 100;
    else if (totalReports >= 5) engagementScore = 80;
    else if (totalReports >= 3) engagementScore = 60;
    else if (totalReports >= 1) engagementScore = 40;
    else engagementScore = 0;

    // --- Sentiment: average feedback rating ---
    let averageRating: number | null = null;
    let sentimentScore = 50; // Neutral default

    try {
      const row = await env.DB.prepare(
        `SELECT AVG(rating) as avg_rating, COUNT(*) as count
         FROM client_feedback
         WHERE client_id = ?1`
      )
        .bind(clientId)
        .first<{ avg_rating: number | null; count: number }>();

      if (row && row.count > 0 && row.avg_rating !== null) {
        averageRating = Math.round(row.avg_rating * 10) / 10;
        // Map 1-5 rating to 0-100 score
        sentimentScore = Math.round(((row.avg_rating - 1) / 4) * 100);
      }
    } catch {
      // Table may not exist
    }

    // --- Composite health score ---
    const healthScore = Math.round(
      recencyScore * 0.4 + engagementScore * 0.3 + sentimentScore * 0.3
    );

    let riskLevel: "LOW" | "MEDIUM" | "HIGH";
    if (healthScore >= 60) riskLevel = "LOW";
    else if (healthScore >= 35) riskLevel = "MEDIUM";
    else riskLevel = "HIGH";

    return {
      clientId,
      healthScore,
      factors: {
        recencyScore,
        engagementScore,
        sentimentScore,
      },
      lastPurchase,
      totalReports,
      averageRating,
      riskLevel,
    };
  }

  // ---------------------------------------------------------------------------
  // Churn Risk
  // ---------------------------------------------------------------------------

  /**
   * Identify clients at risk of churning.
   * A client is at risk if:
   *   - No purchase in 60+ days
   *   - Negative feedback (average rating < 3)
   *   - No engagement (zero reports)
   */
  async getChurnRisk(env: Env): Promise<Array<{
    clientId: string;
    clientName: string;
    healthScore: number;
    riskLevel: string;
    reasons: string[];
  }>> {
    const atRisk: Array<{
      clientId: string;
      clientName: string;
      healthScore: number;
      riskLevel: string;
      reasons: string[];
    }> = [];

    // Get all clients
    let clients: ClientRow[] = [];
    try {
      const result = await env.DB.prepare(
        `SELECT id, name, email, entity_type, industry, created_at FROM clients`
      ).all<ClientRow>();

      if (result.success && result.results) {
        clients = result.results;
      }
    } catch {
      return [];
    }

    const now = Date.now();

    for (const client of clients) {
      const reasons: string[] = [];

      // Check last purchase recency
      let lastPurchaseDate: Date | null = null;
      try {
        const row = await env.DB.prepare(
          `SELECT MAX(created_at) as last_date FROM compliance_reports WHERE client_id = ?1`
        )
          .bind(client.id)
          .first<{ last_date: string | null }>();

        if (row?.last_date) {
          lastPurchaseDate = new Date(row.last_date);
        }
      } catch {
        // ignore
      }

      if (!lastPurchaseDate) {
        reasons.push("No purchases on record");
      } else {
        const daysSince = (now - lastPurchaseDate.getTime()) / (1000 * 60 * 60 * 24);
        if (daysSince >= CHURN_THRESHOLD_DAYS) {
          reasons.push(`No purchase in ${Math.round(daysSince)} days`);
        }
      }

      // Check feedback sentiment
      try {
        const row = await env.DB.prepare(
          `SELECT AVG(rating) as avg_rating, COUNT(*) as count
           FROM client_feedback
           WHERE client_id = ?1`
        )
          .bind(client.id)
          .first<{ avg_rating: number | null; count: number }>();

        if (row && row.count > 0 && row.avg_rating !== null && row.avg_rating < 3) {
          reasons.push(`Negative feedback (avg rating: ${Math.round(row.avg_rating * 10) / 10})`);
        }
      } catch {
        // ignore
      }

      // Check engagement
      try {
        const row = await env.DB.prepare(
          `SELECT COUNT(*) as count FROM compliance_reports WHERE client_id = ?1`
        )
          .bind(client.id)
          .first<{ count: number }>();

        if (!row || row.count === 0) {
          if (!reasons.includes("No purchases on record")) {
            reasons.push("No engagement — zero reports generated");
          }
        }
      } catch {
        // ignore
      }

      if (reasons.length > 0) {
        const health = await this.getClientHealth(client.id, env);
        atRisk.push({
          clientId: client.id,
          clientName: client.name,
          healthScore: health.healthScore,
          riskLevel: health.riskLevel,
          reasons,
        });
      }
    }

    // Sort by health score ascending (worst first)
    atRisk.sort((a, b) => a.healthScore - b.healthScore);

    return atRisk;
  }

  // ---------------------------------------------------------------------------
  // Client Stats
  // ---------------------------------------------------------------------------

  /**
   * Aggregate client statistics: total clients, active, retention rate,
   * avg reports per client, etc.
   */
  async getClientStats(env: Env): Promise<ClientStats> {
    let totalClients = 0;
    let activeClients = 0;
    let totalReports = 0;
    let totalFeedback = 0;
    let avgRating = 0;
    let openInquiries = 0;

    const now = Date.now();

    // Total clients
    try {
      const row = await env.DB.prepare(
        `SELECT COUNT(*) as count FROM clients`
      ).first<{ count: number }>();
      totalClients = row?.count ?? 0;
    } catch {
      // ignore
    }

    // Active clients (have a report in the last 90 days)
    try {
      const row = await env.DB.prepare(
        `SELECT COUNT(DISTINCT client_id) as count
         FROM compliance_reports
         WHERE created_at >= datetime('now', '-90 days')`
      ).first<{ count: number }>();
      activeClients = row?.count ?? 0;
    } catch {
      // ignore
    }

    // Total reports
    try {
      const row = await env.DB.prepare(
        `SELECT COUNT(*) as count FROM compliance_reports`
      ).first<{ count: number }>();
      totalReports = row?.count ?? 0;
    } catch {
      // ignore
    }

    // Feedback stats
    try {
      const row = await env.DB.prepare(
        `SELECT COUNT(*) as count, AVG(rating) as avg_rating FROM client_feedback`
      ).first<{ count: number; avg_rating: number | null }>();
      totalFeedback = row?.count ?? 0;
      avgRating = row?.avg_rating
        ? Math.round(row.avg_rating * 10) / 10
        : 0;
    } catch {
      // ignore
    }

    // Open inquiries
    try {
      const row = await env.DB.prepare(
        `SELECT COUNT(*) as count FROM client_inquiries WHERE status IN ('OPEN', 'IN_PROGRESS')`
      ).first<{ count: number }>();
      openInquiries = row?.count ?? 0;
    } catch {
      // ignore
    }

    const retentionRate =
      totalClients > 0
        ? Math.round((activeClients / totalClients) * 10000) / 100
        : 0;

    const avgReportsPerClient =
      totalClients > 0
        ? Math.round((totalReports / totalClients) * 100) / 100
        : 0;

    return {
      totalClients,
      activeClients,
      retentionRate,
      avgReportsPerClient,
      totalFeedback,
      averageRating: avgRating,
      openInquiries,
    };
  }

  // ---------------------------------------------------------------------------
  // Feedback
  // ---------------------------------------------------------------------------

  /**
   * Record client feedback in D1 and KV.
   */
  async recordFeedback(
    clientId: string,
    rating: number,
    comment: string | null,
    env: Env
  ): Promise<{ id: string; recorded: boolean }> {
    const id = generateId("fb");
    const now = new Date().toISOString();

    // Persist to D1
    try {
      await env.DB.prepare(
        `INSERT INTO client_feedback (id, client_id, rating, comment, created_at)
         VALUES (?1, ?2, ?3, ?4, ?5)`
      )
        .bind(id, clientId, rating, comment, now)
        .run();
    } catch {
      // Fallback to KV
      await safeKvPut(env.KNOWLEDGE_STORE, 
        `${KV_PREFIX}feedback:${id}`,
        JSON.stringify({ id, clientId, rating, comment, createdAt: now })
      );
    }

    // Record in knowledge store for analysis
    await this.recordKnowledge(
      `feedback:${clientId}:${id}`,
      { clientId, rating, comment, createdAt: now },
      env
    );

    return { id, recorded: true };
  }

  // ---------------------------------------------------------------------------
  // Knowledge helpers
  // ---------------------------------------------------------------------------

  /**
   * Store a piece of learned knowledge in ADVOCIS's KV namespace.
   */
  async recordKnowledge(
    key: string,
    value: unknown,
    env: Env
  ): Promise<void> {
    const fullKey = `${KV_PREFIX}${key}`;
    await safeKvPut(env.KNOWLEDGE_STORE, fullKey, JSON.stringify(value));
  }

  /** Expose service engine for direct use by API layer. */
  getServiceEngine(): Serve1Worker {
    return this.serviceEngine;
  }

  /** Expose onboarding engine for direct use by API layer. */
  getOnboardingEngine(): Board1Worker {
    return this.onboardingEngine;
  }
}

/**
 * EventBus — Inter-Citizen Communication Layer
 *
 * The central nervous system of the Vernen ecosystem. Citizens publish
 * structured signals through the EventBus. The bus persists events to D1,
 * then dispatches them to subscribed Citizens. Each Citizen processes
 * events through their own domain lens — cross-pollination, not contamination.
 *
 * Design principles:
 *   - Citizens OWN their knowledge — they are the authority in their domain
 *   - Citizens PUBLISH structured signals, not raw data
 *   - Citizens SUBSCRIBE to event types relevant to them
 *   - Citizens INTERPRET events through their own expertise
 *   - A Citizen can QUERY another Citizen, not rummage through their files
 */

import type { Env } from "../index.js";
import { generateId } from "../utils/helpers.js";

// Citizen imports — lazy-loaded to avoid circular dependencies
import { Regulis } from "../personas/regulis/index.js";
import { Advocis } from "../personas/advocis/index.js";
import { Fiscara } from "../personas/fiscara/index.js";
import { Integra } from "../personas/integra/index.js";
import { Privaxis } from "../personas/privaxis/index.js";
import { Vigilus } from "../personas/vigilus/index.js";
import { Ethicara } from "../personas/ethicara/index.js";
import { Metriqa } from "../personas/metriqa/index.js";
import { Lexarc } from "../personas/lexarc/index.js";
import { Syntara } from "../personas/syntara/index.js";
import { Claridex } from "../personas/claridex/index.js";
import { Vestara } from "../personas/vestara/index.js";
import { Nexaris } from "../personas/nexaris/index.js";
import { PersonaCitizenBase } from "../personas/base.js";

/**
 * Event subscription map: event_type → list of Citizen names that should receive it.
 * This is the routing table. A Citizen only gets events it has declared interest in.
 */
const SUBSCRIPTIONS: Record<string, string[]> = {
  // Revenue & financial events
  "compliance_report_generated": ["FISCARA", "ADVOCIS", "METRIQA", "INTEGRA"],
  "payment_received":            ["FISCARA", "ADVOCIS", "METRIQA"],
  "report_purchased":            ["ADVOCIS", "METRIQA"],
  "expense_recorded":            ["FISCARA", "CLARIDEX"],

  // Client lifecycle events
  "client_registered":           ["REGULIS", "ADVOCIS", "PRIVAXIS", "METRIQA"],
  "client_feedback":             ["ADVOCIS", "ETHICARA", "METRIQA"],

  // Regulatory & compliance events
  "regulatory_change_detected":  ["REGULIS", "VIGILUS", "SYNTARA", "INTEGRA"],
  "compliance_check_requested":  ["REGULIS"],

  // Security & privacy events
  "breach_detected":             ["PRIVAXIS", "VIGILUS", "INTEGRA", "ETHICARA"],
  "security_incident_detected":  ["VIGILUS", "INTEGRA", "PRIVAXIS"],
  "data_access_request":         ["PRIVAXIS"],

  // Operational events
  "system_health_check":         ["INTEGRA", "SYNTARA"],
  "incident_detected":           ["INTEGRA", "VIGILUS"],
  "policy_review_due":           ["INTEGRA", "ETHICARA"],

  // Ethics & governance
  "ethics_review_requested":     ["ETHICARA"],
  "bias_detected":               ["ETHICARA", "INTEGRA"],
  "policy_conflict":             ["ETHICARA", "INTEGRA"],

  // Build system
  "BUILD_TASK_REPORT":           ["SENTINEL-0"],

  // Financial reporting
  "financial_close":             ["CLARIDEX", "FISCARA"],
  "revenue_milestone_reached":   ["VESTARA", "METRIQA"],

  // Growth & partnerships
  "partner_inquiry":             ["NEXARIS"],
  "dashboard_requested":         ["METRIQA"],
  "metrics_alert":               ["METRIQA", "VIGILUS"],

  // Document & strategy
  "document_requested":          ["LEXARC"],
  "document_generated":          ["ADVOCIS", "METRIQA"],
  "strategy_review":             ["LEXARC"],

  // Automation
  "automation_request":          ["SYNTARA"],
  "platform_health":             ["SYNTARA", "INTEGRA"],
};

/**
 * Shape of an event row in D1.
 */
interface EventRow {
  id: string;
  source_persona: string;
  target_persona: string | null;
  event_type: string;
  payload: string;
  processed: number;
  created_at: string;
}

/**
 * Result of publishing an event.
 */
export interface PublishResult {
  eventId: string;
  eventType: string;
  source: string;
  targets: string[];
  deliveredTo: string[];
  failedTo: string[];
  timestamp: string;
}

/**
 * The EventBus. Publish events, dispatch to subscribers, query event history.
 */
export class EventBus {
  /**
   * Publish an event from a source Citizen. Persists to D1 and dispatches
   * to all subscribed Citizens.
   */
  static async publish(
    source: string,
    eventType: string,
    payload: unknown,
    env: Env,
    target?: string
  ): Promise<PublishResult> {
    const eventId = generateId("evt");
    const timestamp = new Date().toISOString();
    const payloadJson = JSON.stringify(payload);

    // Determine targets
    const targets = target
      ? [target]
      : SUBSCRIPTIONS[eventType] ?? [];

    // Persist event to D1
    try {
      await env.DB.prepare(
        `INSERT INTO events (id, source_persona, target_persona, event_type, payload, processed, created_at)
         VALUES (?1, ?2, ?3, ?4, ?5, 0, ?6)`
      )
        .bind(
          eventId,
          source,
          target ?? null,
          eventType,
          payloadJson,
          timestamp
        )
        .run();
    } catch (err) {
      console.error(`EventBus: Failed to persist event ${eventId}:`, err);
    }

    // Dispatch to subscribers
    const deliveredTo: string[] = [];
    const failedTo: string[] = [];

    for (const citizenName of targets) {
      // Don't deliver back to sender
      if (citizenName === source) continue;

      try {
        const citizen = EventBus.getCitizenInstance(citizenName);
        if (citizen) {
          await citizen.initialize(env);
          await citizen.receiveEvent(eventType, payload, env);
          deliveredTo.push(citizenName);
        }
      } catch (err) {
        console.error(
          `EventBus: Failed to deliver ${eventType} to ${citizenName}:`,
          err
        );
        failedTo.push(citizenName);
      }
    }

    // Mark as processed
    try {
      await env.DB.prepare(
        `UPDATE events SET processed = 1 WHERE id = ?1`
      )
        .bind(eventId)
        .run();
    } catch {
      // Non-critical
    }

    // Log to KV for quick access
    try {
      await env.KNOWLEDGE_STORE.put(
        `EVENTBUS:last:${eventType}`,
        JSON.stringify({
          eventId,
          source,
          targets: deliveredTo,
          timestamp,
        }),
        { expirationTtl: 86400 * 30 } // 30 days
      );
    } catch {
      // Non-critical
    }

    return {
      eventId,
      eventType,
      source,
      targets,
      deliveredTo,
      failedTo,
      timestamp,
    };
  }

  /**
   * Get recent events from D1, optionally filtered.
   */
  static async getRecentEvents(
    env: Env,
    options?: {
      source?: string;
      target?: string;
      eventType?: string;
      limit?: number;
      unprocessedOnly?: boolean;
    }
  ): Promise<EventRow[]> {
    const limit = options?.limit ?? 50;
    let sql = `SELECT * FROM events WHERE 1=1`;
    const params: string[] = [];

    if (options?.source) {
      params.push(options.source);
      sql += ` AND source_persona = ?${params.length}`;
    }
    if (options?.target) {
      params.push(options.target);
      sql += ` AND target_persona = ?${params.length}`;
    }
    if (options?.eventType) {
      params.push(options.eventType);
      sql += ` AND event_type = ?${params.length}`;
    }
    if (options?.unprocessedOnly) {
      sql += ` AND processed = 0`;
    }

    sql += ` ORDER BY created_at DESC LIMIT ?${params.length + 1}`;

    const stmt = env.DB.prepare(sql);
    const bound = stmt.bind(...params, limit);
    const result = await bound.all<EventRow>();

    return result.results ?? [];
  }

  /**
   * Get event counts per type for analytics.
   */
  static async getEventStats(
    env: Env
  ): Promise<Array<{ event_type: string; count: number; last_at: string }>> {
    try {
      const result = await env.DB.prepare(
        `SELECT event_type, COUNT(*) as count, MAX(created_at) as last_at
         FROM events
         GROUP BY event_type
         ORDER BY count DESC`
      ).all<{ event_type: string; count: number; last_at: string }>();

      return result.results ?? [];
    } catch {
      return [];
    }
  }

  /**
   * Get the subscription map (what events each Citizen listens to).
   */
  static getSubscriptions(): Record<string, string[]> {
    return { ...SUBSCRIPTIONS };
  }

  /**
   * Get which events a specific Citizen is subscribed to.
   */
  static getSubscriptionsForCitizen(citizenName: string): string[] {
    const events: string[] = [];
    for (const [eventType, subscribers] of Object.entries(SUBSCRIPTIONS)) {
      if (subscribers.includes(citizenName)) {
        events.push(eventType);
      }
    }
    return events;
  }

  /**
   * Instantiate a Citizen by name.
   */
  private static getCitizenInstance(name: string): PersonaCitizenBase | null {
    switch (name) {
      case "REGULIS":    return new Regulis();
      case "ADVOCIS":    return new Advocis();
      case "FISCARA":    return new Fiscara();
      case "INTEGRA":    return new Integra();
      case "PRIVAXIS":   return new Privaxis();
      case "VIGILUS":    return new Vigilus();
      case "ETHICARA":   return new Ethicara();
      case "METRIQA":    return new Metriqa();
      case "LEXARC":     return new Lexarc();
      case "SYNTARA":    return new Syntara();
      case "CLARIDEX":   return new Claridex();
      case "VESTARA":    return new Vestara();
      case "NEXARIS":    return new Nexaris();
      default:           return null;
    }
  }
}

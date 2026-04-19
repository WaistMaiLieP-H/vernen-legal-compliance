/**
 * Document Feed Pipeline
 *
 * Accepts real-world documents (from PACER, Caselaw Access Project, California
 * courts, county records, MuckRock FOIA responses, Federal Register), classifies
 * them using ARCHIVIST-0's document-type-identification skill patterns, resolves
 * the owning Citizen via the routing engine (citizen_routing_index), and logs a
 * skill execution against the matched Citizen's skills.
 *
 * Flow:
 *   Document → Classify (ARCHIVIST-0) → Route (RoutingEngine) → Execute (SkillRegistry) → Log
 */

import type { Env } from "../index.js";
import { generateId } from "../utils/helpers.js";
import { RoutingEngine } from "./routing-engine.js";
import { SkillRegistry } from "./skill-registry.js";
import type { RoutingKey } from "../types/routing.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export type FeedSource =
  | "caselaw" | "pacer" | "fedreg" | "california" | "muckrock" | "manual" | "batch"
  | "fda" | "edgar" | "gao" | "courtlistener" | "sam" | "cfpb" | "epa" | "osha";

export interface FeedDocumentInput {
  source: FeedSource;
  sourceUrl?: string;
  sourceId?: string;
  title: string;
  text?: string;
  metadata?: Record<string, unknown>;
  /** Override classification — skip ARCHIVIST-0 */
  documentType?: string;
  jurisdiction?: string;
  category?: string;
}

export interface FeedDocument {
  id: string;
  source: FeedSource;
  sourceUrl: string | null;
  sourceId: string | null;
  title: string;
  documentType: string | null;
  jurisdiction: string | null;
  category: string | null;
  rawText: string | null;
  metadata: Record<string, unknown>;
  classificationConfidence: number;
  routedCitizen: string | null;
  routedSkill: string | null;
  skillExecutionId: string | null;
  status: "pending" | "classified" | "routed" | "executed" | "failed";
  errorMessage: string | null;
  ingestedAt: string;
  processedAt: string | null;
}

export interface FeedProcessResult {
  document: FeedDocument;
  classification: {
    documentType: string;
    jurisdiction: string;
    category: string;
    confidence: number;
  } | null;
  routing: {
    citizenName: string;
    skillSlug: string;
    priority: number;
  } | null;
  execution: {
    executionId: string;
    citizenName: string;
    skillId: string;
    determination: string;
  } | null;
}

export interface FeedStats {
  total: number;
  bySource: Record<string, number>;
  byStatus: Record<string, number>;
  byCitizen: Record<string, number>;
  byDocumentType: Record<string, number>;
  skillsExercised: number;
  lastIngestedAt: string | null;
}

// ═══════════════════════════════════════════════════════════════════════════
// Document Classification — ARCHIVIST-0 patterns
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Classify a document using ARCHIVIST-0's document-type-identification patterns.
 * This is a rules-based classifier that examines title, text, and metadata to
 * determine document type, jurisdiction, and category.
 */
function classifyDocument(input: FeedDocumentInput): {
  documentType: string;
  jurisdiction: string;
  category: string;
  confidence: number;
} {
  // If caller provided explicit classification, use it
  if (input.documentType && input.jurisdiction && input.category) {
    return {
      documentType: input.documentType,
      jurisdiction: input.jurisdiction,
      category: input.category,
      confidence: 1.0,
    };
  }

  const title = (input.title ?? "").toLowerCase();
  const text = (input.text ?? "").toLowerCase();
  const combined = `${title} ${text}`;
  const source = input.source;

  let documentType = "unknown";
  let jurisdiction = input.jurisdiction ?? "*";
  let category = input.category ?? "*";
  let confidence = 0.5;

  // ── Source-based classification ──────────────────────────────────────
  if (source === "caselaw") {
    documentType = "court_opinion";
    category = "litigation";
    confidence = 0.85;

    if (combined.includes("supreme court")) { documentType = "supreme_court_opinion"; confidence = 0.95; }
    else if (combined.includes("court of appeal") || combined.includes("appellate")) { documentType = "appellate_opinion"; confidence = 0.9; }
    else if (combined.includes("district court")) { documentType = "district_court_opinion"; confidence = 0.9; }

    // Jurisdiction from case metadata or text
    if (combined.includes("california") || combined.includes("cal.")) jurisdiction = "CA";
    else if (combined.includes("new york") || combined.includes("n.y.")) jurisdiction = "NY";
    else if (combined.includes("texas") || combined.includes("tex.")) jurisdiction = "TX";
    else if (combined.includes("ninth circuit") || combined.includes("9th cir")) jurisdiction = "FEDERAL_9TH";
    else if (combined.includes("federal") || combined.includes("u.s.")) jurisdiction = "FEDERAL";

  } else if (source === "pacer") {
    documentType = "court_filing";
    category = "litigation";
    confidence = 0.8;

    if (combined.includes("complaint")) { documentType = "complaint"; confidence = 0.9; }
    else if (combined.includes("motion")) { documentType = "motion"; confidence = 0.9; }
    else if (combined.includes("order")) { documentType = "court_order"; confidence = 0.9; }
    else if (combined.includes("judgment") || combined.includes("verdict")) { documentType = "judgment"; confidence = 0.9; }
    else if (combined.includes("brief")) { documentType = "brief"; confidence = 0.85; }
    else if (combined.includes("declaration") || combined.includes("affidavit")) { documentType = "declaration"; confidence = 0.85; }
    else if (combined.includes("subpoena")) { documentType = "subpoena"; confidence = 0.9; }

    jurisdiction = "FEDERAL";

  } else if (source === "fedreg") {
    category = "regulatory";
    confidence = 0.9;

    if (combined.includes("final rule")) { documentType = "federal_register_final_rule"; confidence = 0.95; }
    else if (combined.includes("proposed rule")) { documentType = "federal_register_proposed_rule"; confidence = 0.95; }
    else if (combined.includes("notice")) { documentType = "federal_register_notice"; confidence = 0.9; }
    else if (combined.includes("executive order")) { documentType = "executive_order"; confidence = 0.95; }
    else { documentType = "federal_register_document"; }

    jurisdiction = "FEDERAL";

  } else if (source === "california") {
    jurisdiction = "CA";
    category = "state_proceeding";
    confidence = 0.8;

    if (combined.includes("fl-")) { documentType = "california_family_law_form"; category = "family_law"; confidence = 0.9; }
    else if (combined.includes("mc-")) { documentType = "california_civil_form"; category = "civil"; confidence = 0.9; }
    else if (combined.includes("cr-")) { documentType = "california_criminal_form"; category = "criminal"; confidence = 0.9; }
    else if (combined.includes("superior court")) { documentType = "california_court_document"; confidence = 0.85; }
    else { documentType = "california_state_document"; }

  } else if (source === "muckrock") {
    documentType = "foia_response";
    category = "government_records";
    jurisdiction = "FEDERAL";
    confidence = 0.85;

    if (combined.includes("state") || combined.includes("public records act")) {
      jurisdiction = "*";
      documentType = "public_records_response";
    }

  } else if (source === "fda") {
    jurisdiction = "FEDERAL";
    category = "regulatory";
    confidence = 0.9;

    if (combined.includes("warning letter")) { documentType = "fda_warning_letter"; confidence = 0.95; }
    else if (combined.includes("recall") || combined.includes("class i") || combined.includes("class ii")) { documentType = "fda_recall"; confidence = 0.95; }
    else if (combined.includes("483") || combined.includes("inspectional observation")) { documentType = "fda_483_observation"; confidence = 0.95; }
    else if (combined.includes("enforcement") || combined.includes("injunction")) { documentType = "fda_enforcement_action"; confidence = 0.9; }
    else if (combined.includes("import alert")) { documentType = "fda_import_alert"; confidence = 0.9; }
    else if (combined.includes("drug label") || combined.includes("prescribing information")) { documentType = "fda_drug_label"; confidence = 0.85; }
    else { documentType = "fda_document"; }

  } else if (source === "edgar") {
    jurisdiction = "FEDERAL";
    category = "securities";
    confidence = 0.9;

    if (combined.includes("10-k") || combined.includes("annual report")) { documentType = "sec_10k"; confidence = 0.95; }
    else if (combined.includes("10-q") || combined.includes("quarterly")) { documentType = "sec_10q"; confidence = 0.95; }
    else if (combined.includes("8-k") || combined.includes("current report")) { documentType = "sec_8k"; confidence = 0.95; }
    else if (combined.includes("def 14a") || combined.includes("proxy")) { documentType = "sec_proxy"; confidence = 0.9; }
    else if (combined.includes("s-1") || combined.includes("registration")) { documentType = "sec_registration"; confidence = 0.9; }
    else if (combined.includes("material weakness")) { documentType = "sec_material_weakness_filing"; confidence = 0.95; }
    else if (combined.includes("restatement")) { documentType = "sec_restatement_filing"; confidence = 0.95; }
    else { documentType = "sec_filing"; }

  } else if (source === "gao") {
    jurisdiction = "FEDERAL";
    category = "government_audit";
    confidence = 0.9;

    if (combined.includes("audit") || combined.includes("financial statement")) { documentType = "gao_audit_report"; confidence = 0.95; }
    else if (combined.includes("testimony")) { documentType = "gao_testimony"; confidence = 0.9; }
    else if (combined.includes("bid protest")) { documentType = "gao_bid_protest"; confidence = 0.95; }
    else if (combined.includes("correspondence")) { documentType = "gao_correspondence"; confidence = 0.85; }
    else if (combined.includes("technology assessment")) { documentType = "gao_tech_assessment"; confidence = 0.9; }
    else { documentType = "gao_report"; }

  } else if (source === "courtlistener") {
    category = "litigation";
    jurisdiction = "FEDERAL";
    confidence = 0.85;

    if (combined.includes("opinion")) { documentType = "court_opinion"; confidence = 0.9; }
    else if (combined.includes("order")) { documentType = "court_order"; confidence = 0.9; }
    else if (combined.includes("docket")) { documentType = "court_docket"; confidence = 0.85; }
    else { documentType = "court_document"; }

    if (combined.includes("supreme court")) { documentType = "supreme_court_opinion"; confidence = 0.95; }
    else if (combined.includes("circuit")) jurisdiction = "FEDERAL_CIRCUIT";
    else if (combined.includes("district")) jurisdiction = "FEDERAL_DISTRICT";
    else if (combined.includes("bankruptcy")) { documentType = "bankruptcy_filing"; category = "bankruptcy"; }

  } else if (source === "sam") {
    jurisdiction = "FEDERAL";
    category = "government_contracting";
    confidence = 0.9;

    if (combined.includes("exclusion") || combined.includes("debarment") || combined.includes("suspension")) {
      documentType = "sam_exclusion"; confidence = 0.95;
    } else if (combined.includes("entity") || combined.includes("registration")) {
      documentType = "sam_entity_registration"; confidence = 0.85;
    } else {
      documentType = "sam_record";
    }

  } else if (source === "cfpb") {
    jurisdiction = "FEDERAL";
    category = "consumer_finance";
    confidence = 0.85;

    if (combined.includes("consent order") || combined.includes("consent decree")) { documentType = "cfpb_consent_order"; confidence = 0.95; }
    else if (combined.includes("complaint")) { documentType = "cfpb_complaint"; confidence = 0.9; }
    else if (combined.includes("enforcement") || combined.includes("civil penalty")) { documentType = "cfpb_enforcement_action"; confidence = 0.9; }
    else if (combined.includes("supervisory")) { documentType = "cfpb_supervisory_highlight"; confidence = 0.85; }
    else { documentType = "cfpb_document"; }

  } else if (source === "epa") {
    jurisdiction = "FEDERAL";
    category = "environmental";
    confidence = 0.9;

    if (combined.includes("consent decree") || combined.includes("consent order")) { documentType = "epa_consent_decree"; confidence = 0.95; }
    else if (combined.includes("administrative order") || combined.includes("compliance order")) { documentType = "epa_administrative_order"; confidence = 0.95; }
    else if (combined.includes("penalty") || combined.includes("fine")) { documentType = "epa_penalty_action"; confidence = 0.9; }
    else if (combined.includes("clean water") || combined.includes("cwa")) { documentType = "epa_cwa_violation"; confidence = 0.9; }
    else if (combined.includes("clean air") || combined.includes("caa")) { documentType = "epa_caa_violation"; confidence = 0.9; }
    else if (combined.includes("rcra") || combined.includes("hazardous waste")) { documentType = "epa_rcra_violation"; confidence = 0.9; }
    else if (combined.includes("superfund") || combined.includes("cercla")) { documentType = "epa_cercla_action"; confidence = 0.9; }
    else { documentType = "epa_enforcement_document"; }

  } else if (source === "osha") {
    jurisdiction = "FEDERAL";
    category = "workplace_safety";
    confidence = 0.9;

    if (combined.includes("citation")) { documentType = "osha_citation"; confidence = 0.95; }
    else if (combined.includes("fatality") || combined.includes("fatal")) { documentType = "osha_fatality_report"; confidence = 0.95; }
    else if (combined.includes("willful") || combined.includes("repeat")) { documentType = "osha_willful_violation"; confidence = 0.95; }
    else if (combined.includes("serious")) { documentType = "osha_serious_violation"; confidence = 0.9; }
    else if (combined.includes("inspection")) { documentType = "osha_inspection_report"; confidence = 0.9; }
    else { documentType = "osha_enforcement_document"; }
  }

  // ── Content-based refinement (cross-source) ─────────────────────────
  if (documentType === "unknown") {
    if (combined.includes("police report") || combined.includes("incident report")) {
      documentType = "police_report"; category = "law_enforcement"; confidence = 0.8;
    } else if (combined.includes("medical record") || combined.includes("diagnosis")) {
      documentType = "medical_record"; category = "healthcare"; confidence = 0.75;
    } else if (combined.includes("contract") || combined.includes("agreement")) {
      documentType = "contract"; category = "business"; confidence = 0.7;
    } else if (combined.includes("tax return") || combined.includes("1040") || combined.includes("w-2")) {
      documentType = "tax_document"; category = "financial"; confidence = 0.8;
    } else if (combined.includes("deed") || combined.includes("title") || combined.includes("property")) {
      documentType = "property_record"; category = "real_estate"; confidence = 0.7;
    } else if (combined.includes("invoice") || combined.includes("receipt") || combined.includes("payment")) {
      documentType = "financial_document"; category = "financial"; confidence = 0.7;
    } else if (combined.includes("regulation") || combined.includes("cfr") || combined.includes("statute")) {
      documentType = "regulatory_document"; category = "regulatory"; confidence = 0.7;
    } else {
      documentType = "unclassified"; confidence = 0.3;
    }
  }

  // ── Family law keywords boost ───────────────────────────────────────
  if (combined.includes("custody") || combined.includes("dissolution") ||
      combined.includes("divorce") || combined.includes("child support") ||
      combined.includes("visitation") || combined.includes("domestic violence")) {
    category = "family_law";
    if (confidence < 0.8) confidence = 0.8;
  }

  // ── Civil rights boost ──────────────────────────────────────────────
  if (combined.includes("1983") || combined.includes("civil rights") ||
      combined.includes("due process") || combined.includes("equal protection") ||
      combined.includes("qualified immunity")) {
    category = "civil_rights";
    if (confidence < 0.8) confidence = 0.8;
  }

  return { documentType, jurisdiction, category, confidence };
}

// ═══════════════════════════════════════════════════════════════════════════
// Document Feed Engine
// ═══════════════════════════════════════════════════════════════════════════

export class DocumentFeedEngine {
  private db: D1Database;
  private routingEngine: RoutingEngine;
  private skillRegistry: SkillRegistry;

  constructor(env: Env) {
    this.db = env.DB;
    this.routingEngine = new RoutingEngine();
    this.skillRegistry = new SkillRegistry();
  }

  // ─── Table Setup ──────────────────────────────────────────────────────

  async ensureTables(): Promise<void> {
    await this.db.prepare(`CREATE TABLE IF NOT EXISTS document_feed (
      id TEXT PRIMARY KEY,
      source TEXT NOT NULL,
      source_url TEXT,
      source_id TEXT,
      title TEXT NOT NULL,
      document_type TEXT,
      jurisdiction TEXT,
      category TEXT,
      raw_text TEXT,
      metadata TEXT DEFAULT '{}',
      classification_confidence REAL DEFAULT 0,
      routed_citizen TEXT,
      routed_skill TEXT,
      skill_execution_id TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      error_message TEXT,
      ingested_at TEXT NOT NULL DEFAULT (datetime('now')),
      processed_at TEXT,
      UNIQUE(source, source_id)
    )`).run();
  }

  // ─── Core Pipeline ────────────────────────────────────────────────────

  /**
   * Process a single document through the full pipeline:
   * Classify → Route → Execute → Log
   */
  async processDocument(input: FeedDocumentInput, env: Env): Promise<FeedProcessResult> {
    const id = generateId("feed");
    const now = new Date().toISOString();

    // Step 1: Insert as pending
    await this.db.prepare(`
      INSERT OR REPLACE INTO document_feed
        (id, source, source_url, source_id, title, raw_text, metadata, status, ingested_at)
      VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, 'pending', ?8)
    `).bind(
      id, input.source, input.sourceUrl ?? null, input.sourceId ?? null,
      input.title, input.text?.substring(0, 50000) ?? null,
      JSON.stringify(input.metadata ?? {}), now
    ).run();

    const doc: FeedDocument = {
      id, source: input.source, sourceUrl: input.sourceUrl ?? null,
      sourceId: input.sourceId ?? null, title: input.title,
      documentType: null, jurisdiction: null, category: null,
      rawText: input.text?.substring(0, 50000) ?? null,
      metadata: input.metadata ?? {},
      classificationConfidence: 0, routedCitizen: null, routedSkill: null,
      skillExecutionId: null, status: "pending", errorMessage: null,
      ingestedAt: now, processedAt: null,
    };

    let classification: FeedProcessResult["classification"] = null;
    let routing: FeedProcessResult["routing"] = null;
    let execution: FeedProcessResult["execution"] = null;

    try {
      // Step 2: Classify using ARCHIVIST-0 patterns
      const cls = classifyDocument(input);
      classification = cls;
      doc.documentType = cls.documentType;
      doc.jurisdiction = cls.jurisdiction;
      doc.category = cls.category;
      doc.classificationConfidence = cls.confidence;
      doc.status = "classified";

      await this.db.prepare(`
        UPDATE document_feed
        SET document_type = ?2, jurisdiction = ?3, category = ?4,
            classification_confidence = ?5, status = 'classified'
        WHERE id = ?1
      `).bind(id, cls.documentType, cls.jurisdiction, cls.category, cls.confidence).run();

      // Step 3: Route via routing engine
      const routingKey: RoutingKey = {
        docType: cls.documentType,
        jurisdiction: cls.jurisdiction,
        category: cls.category,
      };

      // Boot routing engine if needed
      if (!this.routingEngine.isBooted()) {
        await this.routingEngine.boot(env);
      }

      const resolution = await this.routingEngine.resolve(routingKey, env);

      if (resolution) {
        doc.routedCitizen = resolution.citizenName;
        doc.routedSkill = resolution.skillSlug;
        doc.status = "routed";
        routing = {
          citizenName: resolution.citizenName,
          skillSlug: resolution.skillSlug,
          priority: resolution.priority,
        };

        await this.db.prepare(`
          UPDATE document_feed
          SET routed_citizen = ?2, routed_skill = ?3, status = 'routed'
          WHERE id = ?1
        `).bind(id, resolution.citizenName, resolution.skillSlug).run();

        // Step 4: Log skill execution
        const skillExec = await this.skillRegistry.logExecution({
          skillId: resolution.skillId ?? resolution.skillSlug,
          citizenName: resolution.citizenName,
          triggerType: "DOCUMENT_FEED",
          inputDocumentType: cls.documentType,
          findingsCount: 0,
          violationsCount: 0,
          determination: "INGESTED",
          executionSummary: `Document feed: ${input.title} (${input.source}) → ${resolution.citizenName}:${resolution.skillSlug}`,
          durationMs: 0,
        }, env);

        doc.skillExecutionId = skillExec.id;
        doc.status = "executed";
        doc.processedAt = new Date().toISOString();
        execution = {
          executionId: skillExec.id,
          citizenName: resolution.citizenName,
          skillId: resolution.skillId ?? resolution.skillSlug,
          determination: "INGESTED",
        };

        await this.db.prepare(`
          UPDATE document_feed
          SET skill_execution_id = ?2, status = 'executed', processed_at = ?3
          WHERE id = ?1
        `).bind(id, skillExec.id, doc.processedAt).run();
      } else {
        // No routing match — try skill trigger fallback
        const triggerMatch = await this.skillRegistry.findSkillByTrigger(cls.documentType, env);
        if (triggerMatch.length > 0) {
          const matched = triggerMatch[0]!;
          doc.routedCitizen = matched.citizenName;
          doc.routedSkill = matched.skillSlug;
          doc.status = "routed";
          routing = {
            citizenName: matched.citizenName,
            skillSlug: matched.skillSlug,
            priority: 50,
          };

          const skillExec = await this.skillRegistry.logExecution({
            skillId: matched.id,
            citizenName: matched.citizenName,
            triggerType: "DOCUMENT_FEED_TRIGGER",
            inputDocumentType: cls.documentType,
            findingsCount: 0,
            violationsCount: 0,
            determination: "INGESTED",
            executionSummary: `Document feed (trigger match): ${input.title} (${input.source}) → ${matched.citizenName}:${matched.skillSlug}`,
            durationMs: 0,
          }, env);

          doc.skillExecutionId = skillExec.id;
          doc.status = "executed";
          doc.processedAt = new Date().toISOString();
          execution = {
            executionId: skillExec.id,
            citizenName: matched.citizenName,
            skillId: matched.id,
            determination: "INGESTED",
          };

          await this.db.prepare(`
            UPDATE document_feed
            SET routed_citizen = ?2, routed_skill = ?3, skill_execution_id = ?4,
                status = 'executed', processed_at = ?5
            WHERE id = ?1
          `).bind(id, matched.citizenName, matched.skillSlug, skillExec.id, doc.processedAt).run();
        } else {
          // Classified but no route found
          doc.status = "classified";
          await this.db.prepare(`
            UPDATE document_feed SET status = 'classified' WHERE id = ?1
          `).bind(id).run();
        }
      }
    } catch (e: unknown) {
      doc.status = "failed";
      doc.errorMessage = e instanceof Error ? e.message : String(e);
      await this.db.prepare(`
        UPDATE document_feed SET status = 'failed', error_message = ?2 WHERE id = ?1
      `).bind(id, doc.errorMessage).run();
    }

    return { document: doc, classification, routing, execution };
  }

  /**
   * Process a batch of documents.
   */
  async processBatch(
    inputs: FeedDocumentInput[],
    env: Env
  ): Promise<{ results: FeedProcessResult[]; errors: { index: number; error: string }[] }> {
    const results: FeedProcessResult[] = [];
    const errors: { index: number; error: string }[] = [];

    for (let i = 0; i < inputs.length; i++) {
      try {
        const result = await this.processDocument(inputs[i]!, env);
        results.push(result);
      } catch (e: unknown) {
        errors.push({ index: i, error: e instanceof Error ? e.message : String(e) });
      }
    }

    return { results, errors };
  }

  // ─── Query Methods ────────────────────────────────────────────────────

  async getHistory(filter: {
    source?: string;
    status?: string;
    citizen?: string;
    limit?: number;
    offset?: number;
  }): Promise<FeedDocument[]> {
    const parts: string[] = ["SELECT * FROM document_feed WHERE 1=1"];
    const binds: unknown[] = [];
    let idx = 1;

    if (filter.source) {
      parts.push(`AND source = ?${idx++}`);
      binds.push(filter.source);
    }
    if (filter.status) {
      parts.push(`AND status = ?${idx++}`);
      binds.push(filter.status);
    }
    if (filter.citizen) {
      parts.push(`AND routed_citizen = ?${idx++}`);
      binds.push(filter.citizen);
    }

    parts.push(`ORDER BY ingested_at DESC LIMIT ?${idx++} OFFSET ?${idx}`);
    binds.push(filter.limit ?? 50, filter.offset ?? 0);

    const stmt = this.db.prepare(parts.join(" "));
    const result = await stmt.bind(...binds).all();

    if (!result.success || !result.results) return [];

    return result.results.map(r => this.rowToDocument(r as Record<string, unknown>));
  }

  async getStats(): Promise<FeedStats> {
    const [totalRow, sourceRows, statusRows, citizenRows, typeRows, skillRow, lastRow] = await Promise.all([
      this.db.prepare("SELECT COUNT(*) as cnt FROM document_feed").first<{ cnt: number }>(),
      this.db.prepare("SELECT source, COUNT(*) as cnt FROM document_feed GROUP BY source ORDER BY cnt DESC").all(),
      this.db.prepare("SELECT status, COUNT(*) as cnt FROM document_feed GROUP BY status").all(),
      this.db.prepare("SELECT routed_citizen, COUNT(*) as cnt FROM document_feed WHERE routed_citizen IS NOT NULL GROUP BY routed_citizen ORDER BY cnt DESC").all(),
      this.db.prepare("SELECT document_type, COUNT(*) as cnt FROM document_feed WHERE document_type IS NOT NULL GROUP BY document_type ORDER BY cnt DESC LIMIT 20").all(),
      this.db.prepare("SELECT COUNT(DISTINCT skill_execution_id) as cnt FROM document_feed WHERE skill_execution_id IS NOT NULL").first<{ cnt: number }>(),
      this.db.prepare("SELECT MAX(ingested_at) as last_at FROM document_feed").first<{ last_at: string }>(),
    ]);

    const toRecord = (rows: unknown[]): Record<string, number> => {
      const rec: Record<string, number> = {};
      for (const r of rows) {
        const row = r as Record<string, unknown>;
        const key = String(Object.values(row)[0] ?? "UNKNOWN");
        rec[key] = Number(Object.values(row)[1] ?? 0);
      }
      return rec;
    };

    return {
      total: totalRow?.cnt ?? 0,
      bySource: toRecord(sourceRows.results ?? []),
      byStatus: toRecord(statusRows.results ?? []),
      byCitizen: toRecord(citizenRows.results ?? []),
      byDocumentType: toRecord(typeRows.results ?? []),
      skillsExercised: skillRow?.cnt ?? 0,
      lastIngestedAt: lastRow?.last_at ?? null,
    };
  }

  // ─── Live Source Pullers ──────────────────────────────────────────────

  /**
   * Pull from Caselaw Access Project (case.law) API.
   * Free API, no authentication required for basic queries.
   */
  async pullCaselaw(env: Env, query?: {
    search?: string;
    jurisdiction?: string;
    decisionDateMin?: string;
    limit?: number;
  }): Promise<FeedProcessResult[]> {
    const params = new URLSearchParams();
    params.set("page_size", String(Math.min(query?.limit ?? 10, 20)));
    if (query?.search) params.set("search", query.search);
    if (query?.jurisdiction) params.set("jurisdiction", query.jurisdiction);
    if (query?.decisionDateMin) params.set("decision_date_min", query.decisionDateMin);
    params.set("ordering", "-decision_date");

    const resp = await fetch(`https://api.case.law/v1/cases/?${params.toString()}`, {
      headers: { "Accept": "application/json" },
    });

    if (!resp.ok) {
      throw new Error(`case.law API error: ${resp.status} ${resp.statusText}`);
    }

    const data = await resp.json() as {
      results: Array<{
        id: number;
        url: string;
        name: string;
        name_abbreviation: string;
        decision_date: string;
        court?: { name: string; slug: string };
        jurisdiction?: { name: string; slug: string };
        citations?: Array<{ cite: string; type: string }>;
        casebody?: { data?: { opinions?: Array<{ text: string }> } };
      }>;
    };

    const results: FeedProcessResult[] = [];

    for (const cas of (data.results ?? [])) {
      const opinionText = cas.casebody?.data?.opinions?.[0]?.text ?? "";
      const citation = cas.citations?.[0]?.cite ?? "";

      const result = await this.processDocument({
        source: "caselaw",
        sourceUrl: cas.url,
        sourceId: String(cas.id),
        title: cas.name_abbreviation || cas.name,
        text: opinionText.substring(0, 50000),
        jurisdiction: cas.jurisdiction?.slug?.toUpperCase(),
        metadata: {
          fullName: cas.name,
          decisionDate: cas.decision_date,
          court: cas.court?.name,
          courtSlug: cas.court?.slug,
          jurisdiction: cas.jurisdiction?.name,
          citation,
        },
      }, env);

      results.push(result);
    }

    return results;
  }

  /**
   * Pull from PACER RSS feeds (free, no authentication required).
   * Uses the PACER RSS feed for recent federal court filings.
   */
  async pullPacer(env: Env, query?: {
    court?: string; // e.g. 'cand' for N.D. Cal.
    limit?: number;
  }): Promise<FeedProcessResult[]> {
    const court = query?.court ?? "cand";
    const limit = Math.min(query?.limit ?? 10, 25);

    // PACER RSS feeds are XML — fetch and parse
    const resp = await fetch(
      `https://ecf.${court}.uscourts.gov/cgi-bin/rss_outside.pl`,
      { headers: { "Accept": "application/xml, text/xml" } }
    );

    if (!resp.ok) {
      throw new Error(`PACER RSS error for ${court}: ${resp.status} ${resp.statusText}`);
    }

    const xml = await resp.text();
    const results: FeedProcessResult[] = [];

    // Simple XML extraction — no external parser needed
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];

    for (const item of items.slice(0, limit)) {
      const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) ?? item.match(/<title>(.*?)<\/title>/);
      const linkMatch = item.match(/<link>(.*?)<\/link>/);
      const descMatch = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) ?? item.match(/<description>(.*?)<\/description>/);
      const guidMatch = item.match(/<guid[^>]*>(.*?)<\/guid>/);
      const pubDateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/);

      const title = titleMatch?.[1] ?? "Untitled PACER Filing";
      const link = linkMatch?.[1] ?? "";
      const description = descMatch?.[1] ?? "";
      const guid = guidMatch?.[1] ?? generateId("pacer");

      const result = await this.processDocument({
        source: "pacer",
        sourceUrl: link,
        sourceId: guid,
        title,
        text: description,
        jurisdiction: "FEDERAL",
        metadata: {
          court: court.toUpperCase(),
          pubDate: pubDateMatch?.[1] ?? null,
          rawDescription: description,
        },
      }, env);

      results.push(result);
    }

    return results;
  }

  /**
   * Pull recent Federal Register documents as test documents.
   * Uses the free Federal Register API.
   */
  async pullFedReg(env: Env, query?: {
    type?: string; // 'RULE', 'PRORULE', 'NOTICE'
    agency?: string;
    limit?: number;
  }): Promise<FeedProcessResult[]> {
    const params = new URLSearchParams();
    params.set("per_page", String(Math.min(query?.limit ?? 10, 20)));
    params.set("order", "newest");

    if (query?.type) {
      const typeMap: Record<string, string> = {
        RULE: "Rule", PRORULE: "Proposed Rule", NOTICE: "Notice",
      };
      params.set("conditions[type][]", typeMap[query.type] ?? query.type);
    }
    if (query?.agency) {
      params.set("conditions[agencies][]", query.agency);
    }

    const resp = await fetch(
      `https://www.federalregister.gov/api/v1/documents.json?${params.toString()}`,
      { headers: { "Accept": "application/json" } }
    );

    if (!resp.ok) {
      throw new Error(`Federal Register API error: ${resp.status} ${resp.statusText}`);
    }

    const data = await resp.json() as {
      results: Array<{
        document_number: string;
        type: string;
        title: string;
        abstract?: string;
        html_url: string;
        publication_date: string;
        effective_on?: string;
        agencies: Array<{ name: string; slug: string }>;
        cfr_references?: Array<{ title: number; part: number }>;
      }>;
    };

    const results: FeedProcessResult[] = [];

    for (const doc of (data.results ?? [])) {
      const result = await this.processDocument({
        source: "fedreg",
        sourceUrl: doc.html_url,
        sourceId: doc.document_number,
        title: doc.title,
        text: doc.abstract ?? "",
        jurisdiction: "FEDERAL",
        category: "regulatory",
        metadata: {
          documentNumber: doc.document_number,
          type: doc.type,
          publicationDate: doc.publication_date,
          effectiveDate: doc.effective_on ?? null,
          agencies: doc.agencies.map(a => a.name),
          cfrReferences: doc.cfr_references ?? [],
        },
      }, env);

      results.push(result);
    }

    return results;
  }

  // ─── FDA Warning Letters & Enforcement ─────────────────────────────

  /**
   * Pull FDA enforcement actions — recalls, warning letters, and violations.
   * Uses openFDA API (free, no auth). Returns full text reason_for_recall,
   * product descriptions, and violation details.
   */
  async pullFda(env: Env, query?: {
    search?: string; // product or company name
    type?: "drug" | "food" | "device"; // enforcement category
    limit?: number;
  }): Promise<FeedProcessResult[]> {
    const type = query?.type ?? "drug";
    const limit = Math.min(query?.limit ?? 10, 20);
    const params = new URLSearchParams();
    params.set("limit", String(limit));

    // Build search query
    const searchParts: string[] = [];
    if (query?.search) searchParts.push(query.search);
    // Default: recent enforcement actions with substance
    if (searchParts.length === 0) searchParts.push("reason_for_recall:*");
    params.set("search", searchParts.join("+AND+"));
    params.set("sort", "report_date:desc");

    const resp = await fetch(
      `https://api.fda.gov/${type}/enforcement.json?${params.toString()}`,
      { headers: { "Accept": "application/json" } }
    );

    if (!resp.ok) {
      throw new Error(`openFDA API error: ${resp.status} ${resp.statusText}`);
    }

    const data = await resp.json() as {
      results: Array<{
        recall_number: string;
        reason_for_recall: string;
        status: string;
        distribution_pattern: string;
        product_description: string;
        code_info: string;
        recalling_firm: string;
        city: string;
        state: string;
        classification: string;
        report_date: string;
        recall_initiation_date: string;
        voluntary_mandated: string;
        product_type: string;
        event_id: string;
      }>;
    };

    const results: FeedProcessResult[] = [];

    for (const item of (data.results ?? [])) {
      // Build full-text document from all available fields
      const fullText = [
        `RECALL NUMBER: ${item.recall_number}`,
        `STATUS: ${item.status}`,
        `CLASSIFICATION: ${item.classification}`,
        `RECALLING FIRM: ${item.recalling_firm}, ${item.city}, ${item.state}`,
        `PRODUCT: ${item.product_description}`,
        `CODE INFO: ${item.code_info}`,
        `REASON FOR RECALL: ${item.reason_for_recall}`,
        `DISTRIBUTION: ${item.distribution_pattern}`,
        `VOLUNTARY/MANDATED: ${item.voluntary_mandated}`,
        `REPORT DATE: ${item.report_date}`,
        `INITIATION DATE: ${item.recall_initiation_date}`,
      ].join("\n\n");

      const result = await this.processDocument({
        source: "fda",
        sourceUrl: `https://api.fda.gov/${type}/enforcement.json?search=recall_number:"${item.recall_number}"`,
        sourceId: item.recall_number,
        title: `FDA ${item.classification} Recall: ${item.recalling_firm} — ${item.product_description.substring(0, 100)}`,
        text: fullText,
        jurisdiction: "FEDERAL",
        category: "regulatory",
        documentType: "fda_recall",
        metadata: {
          recallNumber: item.recall_number,
          classification: item.classification,
          recallingFirm: item.recalling_firm,
          productType: item.product_type,
          status: item.status,
          state: item.state,
          reportDate: item.report_date,
          eventId: item.event_id,
        },
      }, env);

      results.push(result);
    }

    return results;
  }

  // ─── SEC EDGAR Full-Text Filings ──────────────────────────────────

  /**
   * Pull SEC EDGAR filings via full-text search.
   * Uses EDGAR EFTS (free, no auth). Returns filing text excerpts
   * with links to full documents.
   */
  async pullEdgar(env: Env, query?: {
    search?: string; // "material weakness", "restatement", company name
    forms?: string; // "10-K,10-Q,8-K"
    dateFrom?: string; // YYYY-MM-DD
    limit?: number;
  }): Promise<FeedProcessResult[]> {
    const limit = Math.min(query?.limit ?? 10, 20);
    const params = new URLSearchParams();
    params.set("q", query?.search ?? "material weakness");
    params.set("dateRange", "custom");
    // Default to last 90 days
    const now = new Date();
    const from = query?.dateFrom ?? new Date(now.getTime() - 90 * 86400000).toISOString().split("T")[0]!;
    params.set("startdt", from);
    params.set("enddt", now.toISOString().split("T")[0]!);
    if (query?.forms) params.set("forms", query.forms);

    const resp = await fetch(
      `https://efts.sec.gov/LATEST/search-index?${params.toString()}`,
      {
        headers: {
          "Accept": "application/json",
          "User-Agent": "VernenLegalCompliance/1.0 (compliance@vernenlegal.com)",
        },
      }
    );

    if (!resp.ok) {
      throw new Error(`EDGAR EFTS error: ${resp.status} ${resp.statusText}`);
    }

    const data = await resp.json() as {
      hits: {
        hits: Array<{
          _id: string;
          _source: {
            file_date: string;
            display_date_dt: string;
            entity_name: string;
            file_num: string;
            form_type: string;
            file_description?: string;
            period_of_report?: string;
          };
          _score: number;
        }>;
        total: { value: number };
      };
    };

    const results: FeedProcessResult[] = [];
    const hits = (data.hits?.hits ?? []).slice(0, limit);

    for (const hit of hits) {
      const src = hit._source;
      const accession = hit._id.replace(/-/g, "");
      const filingUrl = `https://www.sec.gov/Archives/edgar/data/${accession}`;

      // Fetch the actual filing index to get document URLs
      let filingText = "";
      try {
        const indexResp = await fetch(
          `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&filenum=${src.file_num}&type=${src.form_type}&dateb=&owner=include&count=1&search_text=&action=getcompany`,
          {
            headers: {
              "User-Agent": "VernenLegalCompliance/1.0 (compliance@vernenlegal.com)",
              "Accept": "text/html",
            },
          }
        );
        if (indexResp.ok) {
          const html = await indexResp.text();
          // Extract filing description/summary from index page
          const descMatch = html.match(/<td[^>]*class="small"[^>]*>([\s\S]*?)<\/td>/);
          filingText = descMatch?.[1]?.replace(/<[^>]+>/g, "").trim() ?? "";
        }
      } catch { /* proceed with metadata only */ }

      const fullText = [
        `ENTITY: ${src.entity_name}`,
        `FORM TYPE: ${src.form_type}`,
        `FILE NUMBER: ${src.file_num}`,
        `FILING DATE: ${src.file_date}`,
        `PERIOD OF REPORT: ${src.period_of_report ?? "N/A"}`,
        src.file_description ? `DESCRIPTION: ${src.file_description}` : "",
        filingText ? `\nFILING CONTENT:\n${filingText}` : "",
        `\nSEARCH RELEVANCE SCORE: ${hit._score}`,
      ].filter(Boolean).join("\n");

      const result = await this.processDocument({
        source: "edgar",
        sourceUrl: filingUrl,
        sourceId: hit._id,
        title: `SEC ${src.form_type}: ${src.entity_name} (${src.file_date})`,
        text: fullText,
        jurisdiction: "FEDERAL",
        category: "securities",
        metadata: {
          entityName: src.entity_name,
          formType: src.form_type,
          fileNumber: src.file_num,
          filingDate: src.file_date,
          periodOfReport: src.period_of_report,
          relevanceScore: hit._score,
        },
      }, env);

      results.push(result);
    }

    return results;
  }

  // ─── GAO Audit Reports ────────────────────────────────────────────

  /**
   * Pull Government Accountability Office reports.
   * Uses GAO API (free, no auth). Full report summaries, findings,
   * and recommendations from the congressional watchdog.
   */
  async pullGao(env: Env, query?: {
    search?: string;
    topic?: string; // "FINANCIAL MANAGEMENT", "DEFENSE", "HEALTH CARE"
    limit?: number;
  }): Promise<FeedProcessResult[]> {
    const limit = Math.min(query?.limit ?? 10, 20);
    const params = new URLSearchParams();
    params.set("limit", String(limit));
    params.set("offset", "0");
    if (query?.search) params.set("query", query.search);
    if (query?.topic) params.set("topic", query.topic);
    params.set("order_by", "date");
    params.set("order", "desc");

    const resp = await fetch(
      `https://www.gao.gov/api/search?${params.toString()}`,
      {
        headers: {
          "Accept": "application/json",
          "User-Agent": "VernenLegalCompliance/1.0",
        },
      }
    );

    if (!resp.ok) {
      throw new Error(`GAO API error: ${resp.status} ${resp.statusText}`);
    }

    const data = await resp.json() as {
      results: Array<{
        url: string;
        title: string;
        description: string;
        date: string;
        type: string;
        topics?: string[];
        gao_number?: string;
        highlights?: string;
        recommendation_text?: string;
      }>;
    };

    const results: FeedProcessResult[] = [];

    for (const item of (data.results ?? [])) {
      const fullText = [
        `GAO REPORT: ${item.title}`,
        `DATE: ${item.date}`,
        `TYPE: ${item.type}`,
        item.gao_number ? `GAO NUMBER: ${item.gao_number}` : "",
        item.topics?.length ? `TOPICS: ${item.topics.join(", ")}` : "",
        "",
        `DESCRIPTION:`,
        item.description,
        item.highlights ? `\nHIGHLIGHTS:\n${item.highlights}` : "",
        item.recommendation_text ? `\nRECOMMENDATIONS:\n${item.recommendation_text}` : "",
      ].filter(Boolean).join("\n");

      const result = await this.processDocument({
        source: "gao",
        sourceUrl: item.url.startsWith("http") ? item.url : `https://www.gao.gov${item.url}`,
        sourceId: item.gao_number ?? item.url,
        title: item.title,
        text: fullText,
        jurisdiction: "FEDERAL",
        category: "government_audit",
        metadata: {
          gaoNumber: item.gao_number,
          reportType: item.type,
          date: item.date,
          topics: item.topics ?? [],
        },
      }, env);

      results.push(result);
    }

    return results;
  }

  // ─── CourtListener / RECAP ────────────────────────────────────────

  /**
   * Pull court opinions from CourtListener (RECAP archive).
   * Free API with full opinion text from federal and state courts.
   */
  async pullCourtListener(env: Env, query?: {
    search?: string;
    court?: string; // court slug, e.g. "scotus", "ca9", "cand"
    dateAfter?: string; // YYYY-MM-DD
    limit?: number;
  }): Promise<FeedProcessResult[]> {
    const limit = Math.min(query?.limit ?? 10, 20);
    const params = new URLSearchParams();
    if (query?.search) params.set("q", query.search);
    if (query?.court) params.set("court", query.court);
    if (query?.dateAfter) params.set("filed_after", query.dateAfter);
    params.set("order_by", "dateFiled desc");
    params.set("page_size", String(limit));

    const resp = await fetch(
      `https://www.courtlistener.com/api/rest/v4/search/?${params.toString()}&type=o`,
      {
        headers: {
          "Accept": "application/json",
          "User-Agent": "VernenLegalCompliance/1.0",
        },
      }
    );

    if (!resp.ok) {
      throw new Error(`CourtListener API error: ${resp.status} ${resp.statusText}`);
    }

    const data = await resp.json() as {
      results: Array<{
        id: number;
        absolute_url: string;
        caseName: string;
        court: string;
        court_citation_string: string;
        dateFiled: string;
        docketNumber: string;
        suitNature?: string;
        snippet: string;
        citeCount: number;
        status: string;
        citation?: string[];
      }>;
    };

    const results: FeedProcessResult[] = [];

    for (const item of (data.results ?? [])) {
      // Fetch full opinion text
      let opinionText = item.snippet ?? "";
      if (item.id) {
        try {
          const opResp = await fetch(
            `https://www.courtlistener.com/api/rest/v4/opinions/${item.id}/`,
            {
              headers: {
                "Accept": "application/json",
                "User-Agent": "VernenLegalCompliance/1.0",
              },
            }
          );
          if (opResp.ok) {
            const opData = await opResp.json() as {
              plain_text?: string;
              html?: string;
              html_with_citations?: string;
            };
            // Prefer plain text, fall back to stripping HTML
            if (opData.plain_text) {
              opinionText = opData.plain_text.substring(0, 50000);
            } else if (opData.html) {
              opinionText = opData.html.replace(/<[^>]+>/g, " ").substring(0, 50000);
            }
          }
        } catch { /* use snippet */ }
      }

      const fullText = [
        `CASE: ${item.caseName}`,
        `COURT: ${item.court_citation_string || item.court}`,
        `DOCKET: ${item.docketNumber}`,
        `DATE FILED: ${item.dateFiled}`,
        `STATUS: ${item.status}`,
        item.citation?.length ? `CITATIONS: ${item.citation.join(", ")}` : "",
        `CITE COUNT: ${item.citeCount}`,
        item.suitNature ? `NATURE OF SUIT: ${item.suitNature}` : "",
        "",
        `OPINION TEXT:`,
        opinionText,
      ].filter(Boolean).join("\n");

      const result = await this.processDocument({
        source: "courtlistener",
        sourceUrl: `https://www.courtlistener.com${item.absolute_url}`,
        sourceId: String(item.id),
        title: item.caseName,
        text: fullText,
        jurisdiction: "FEDERAL",
        category: "litigation",
        metadata: {
          court: item.court,
          docketNumber: item.docketNumber,
          dateFiled: item.dateFiled,
          citeCount: item.citeCount,
          status: item.status,
          suitNature: item.suitNature,
        },
      }, env);

      results.push(result);
    }

    return results;
  }

  // ─── SAM.gov Exclusions ───────────────────────────────────────────

  /**
   * Pull federal contractor exclusion records from SAM.gov.
   * These are debarment/suspension records — real enforcement documents
   * showing who got banned from federal contracting and why.
   */
  async pullSam(env: Env, query?: {
    search?: string; // entity name
    state?: string; // two-letter state code
    limit?: number;
  }): Promise<FeedProcessResult[]> {
    const limit = Math.min(query?.limit ?? 10, 20);
    const params = new URLSearchParams();
    params.set("limit", String(limit));
    params.set("offset", "0");
    if (query?.search) params.set("q", query.search);
    if (query?.state) params.set("stateProvince", query.state);

    const resp = await fetch(
      `https://api.sam.gov/entity-information/v3/exclusions?api_key=DEMO_KEY&${params.toString()}`,
      {
        headers: {
          "Accept": "application/json",
          "User-Agent": "VernenLegalCompliance/1.0",
        },
      }
    );

    if (!resp.ok) {
      throw new Error(`SAM.gov API error: ${resp.status} ${resp.statusText}`);
    }

    const data = await resp.json() as {
      totalRecords: number;
      entityData: Array<{
        exclusionDetails?: {
          classificationType: string;
          exclusionType: string;
          exclusionProgram: string;
          excludingAgencyCode: string;
          excludingAgencyName: string;
          description?: string;
          createDate: string;
          activeDate: string;
          terminationDate?: string;
          ctCode?: string;
          dnbInvestigationStatus?: string;
        };
        entityInformation?: {
          entityName: string;
          prefix?: string;
          firstName?: string;
          middleName?: string;
          lastName?: string;
          suffix?: string;
          entityType: string;
          entityURL?: string;
          ueiSAM?: string;
          cageCode?: string;
          duns?: string;
        };
        entityAddress?: {
          addressLine1?: string;
          city?: string;
          stateOrProvinceCode?: string;
          zipCode?: string;
          countryCode?: string;
        };
      }>;
    };

    const results: FeedProcessResult[] = [];

    for (const item of (data.entityData ?? [])) {
      const entity = item.entityInformation;
      const excl = item.exclusionDetails;
      const addr = item.entityAddress;
      if (!entity || !excl) continue;

      const entityName = entity.entityName ||
        [entity.prefix, entity.firstName, entity.middleName, entity.lastName, entity.suffix]
          .filter(Boolean).join(" ");

      const fullText = [
        `EXCLUDED ENTITY: ${entityName}`,
        `ENTITY TYPE: ${entity.entityType}`,
        entity.ueiSAM ? `UEI: ${entity.ueiSAM}` : "",
        entity.cageCode ? `CAGE: ${entity.cageCode}` : "",
        addr ? `ADDRESS: ${[addr.addressLine1, addr.city, addr.stateOrProvinceCode, addr.zipCode].filter(Boolean).join(", ")}` : "",
        "",
        `EXCLUSION TYPE: ${excl.exclusionType}`,
        `CLASSIFICATION: ${excl.classificationType}`,
        `EXCLUDING AGENCY: ${excl.excludingAgencyName} (${excl.excludingAgencyCode})`,
        `PROGRAM: ${excl.exclusionProgram}`,
        `ACTIVE DATE: ${excl.activeDate}`,
        excl.terminationDate ? `TERMINATION DATE: ${excl.terminationDate}` : "TERMINATION: Indefinite",
        excl.description ? `\nDESCRIPTION:\n${excl.description}` : "",
        excl.ctCode ? `CT CODE: ${excl.ctCode}` : "",
      ].filter(Boolean).join("\n");

      const result = await this.processDocument({
        source: "sam",
        sourceUrl: `https://sam.gov/search/?q=${encodeURIComponent(entityName)}&page=1`,
        sourceId: entity.ueiSAM ?? entity.cageCode ?? entityName,
        title: `SAM Exclusion: ${entityName} — ${excl.exclusionType} by ${excl.excludingAgencyName}`,
        text: fullText,
        jurisdiction: "FEDERAL",
        category: "government_contracting",
        documentType: "sam_exclusion",
        metadata: {
          entityName,
          entityType: entity.entityType,
          uei: entity.ueiSAM,
          exclusionType: excl.exclusionType,
          classification: excl.classificationType,
          excludingAgency: excl.excludingAgencyName,
          activeDate: excl.activeDate,
          terminationDate: excl.terminationDate,
          state: addr?.stateOrProvinceCode,
        },
      }, env);

      results.push(result);
    }

    return results;
  }

  // ─── CFPB Enforcement Actions ─────────────────────────────────────

  /**
   * Pull CFPB consumer complaints with full narratives.
   * Free API, no auth. Consumer complaint narratives are real documents
   * describing financial product failures.
   */
  async pullCfpb(env: Env, query?: {
    search?: string; // product or company
    product?: string; // "Mortgage", "Credit card", "Student loan"
    state?: string;
    limit?: number;
  }): Promise<FeedProcessResult[]> {
    const limit = Math.min(query?.limit ?? 10, 20);
    const params = new URLSearchParams();
    params.set("size", String(limit));
    params.set("sort", "created_date_desc");
    params.set("has_narrative", "true"); // Only complaints with full narrative text

    if (query?.search) params.set("search_term", query.search);
    if (query?.product) params.set("product", query.product);
    if (query?.state) params.set("state", query.state);

    const resp = await fetch(
      `https://www.consumerfinance.gov/data-research/consumer-complaints/search/api/v1/?${params.toString()}`,
      { headers: { "Accept": "application/json" } }
    );

    if (!resp.ok) {
      throw new Error(`CFPB API error: ${resp.status} ${resp.statusText}`);
    }

    const data = await resp.json() as {
      hits: {
        hits: Array<{
          _id: string;
          _source: {
            complaint_id: string;
            date_received: string;
            product: string;
            sub_product?: string;
            issue: string;
            sub_issue?: string;
            consumer_complaint_narrative?: string;
            company: string;
            state: string;
            company_response: string;
            consumer_consent_provided?: string;
            timely: string;
            consumer_disputed?: string;
          };
        }>;
        total: number;
      };
    };

    const results: FeedProcessResult[] = [];

    for (const hit of (data.hits?.hits ?? [])) {
      const src = hit._source;
      if (!src.consumer_complaint_narrative) continue;

      const fullText = [
        `CFPB COMPLAINT #${src.complaint_id}`,
        `DATE: ${src.date_received}`,
        `PRODUCT: ${src.product}${src.sub_product ? ` — ${src.sub_product}` : ""}`,
        `ISSUE: ${src.issue}${src.sub_issue ? ` — ${src.sub_issue}` : ""}`,
        `COMPANY: ${src.company}`,
        `STATE: ${src.state}`,
        `COMPANY RESPONSE: ${src.company_response}`,
        `TIMELY RESPONSE: ${src.timely}`,
        src.consumer_disputed ? `CONSUMER DISPUTED: ${src.consumer_disputed}` : "",
        "",
        `CONSUMER NARRATIVE:`,
        src.consumer_complaint_narrative,
      ].filter(Boolean).join("\n");

      const result = await this.processDocument({
        source: "cfpb",
        sourceUrl: `https://www.consumerfinance.gov/data-research/consumer-complaints/search/detail/${src.complaint_id}`,
        sourceId: src.complaint_id,
        title: `CFPB Complaint: ${src.company} — ${src.product} (${src.issue})`,
        text: fullText,
        jurisdiction: "FEDERAL",
        category: "consumer_finance",
        metadata: {
          complaintId: src.complaint_id,
          dateReceived: src.date_received,
          product: src.product,
          subProduct: src.sub_product,
          issue: src.issue,
          company: src.company,
          state: src.state,
          companyResponse: src.company_response,
          consumerDisputed: src.consumer_disputed,
        },
      }, env);

      results.push(result);
    }

    return results;
  }

  // ─── EPA Enforcement & Compliance ─────────────────────────────────

  /**
   * Pull EPA ECHO enforcement case documents.
   * Free API, no auth. Detailed enforcement actions with penalty amounts,
   * violation descriptions, and settlement terms.
   */
  async pullEpa(env: Env, query?: {
    search?: string; // facility name or zip
    state?: string;
    program?: string; // "CWA", "CAA", "RCRA"
    limit?: number;
  }): Promise<FeedProcessResult[]> {
    const limit = Math.min(query?.limit ?? 10, 20);
    const params = new URLSearchParams();
    params.set("output", "JSON");
    params.set("p_act", query?.program ?? "");
    if (query?.search) params.set("p_fn", query.search);
    if (query?.state) params.set("p_st", query.state);
    params.set("responseset", String(limit));

    const resp = await fetch(
      `https://echodata.epa.gov/echo/dfr_rest_services.get_enforcement_summary?${params.toString()}`,
      { headers: { "Accept": "application/json" } }
    );

    if (!resp.ok) {
      throw new Error(`EPA ECHO API error: ${resp.status} ${resp.statusText}`);
    }

    const data = await resp.json() as {
      Results?: {
        EnforcementSummary?: Array<{
          RegistryId?: string;
          FacilityName?: string;
          CityName?: string;
          StateName?: string;
          ZipCode?: string;
          ActionType?: string;
          ActionDate?: string;
          LeadAgency?: string;
          LawSection?: string;
          SettlementAmount?: string;
          FederalPenalty?: string;
          StatePenalty?: string;
          ComplianceActionDescription?: string;
          EnforcementActionName?: string;
          ActivityId?: string;
        }>;
      };
    };

    const results: FeedProcessResult[] = [];
    const actions = data.Results?.EnforcementSummary ?? [];

    for (const item of actions.slice(0, limit)) {
      const fullText = [
        `FACILITY: ${item.FacilityName}`,
        `LOCATION: ${[item.CityName, item.StateName, item.ZipCode].filter(Boolean).join(", ")}`,
        `REGISTRY ID: ${item.RegistryId}`,
        "",
        `ENFORCEMENT ACTION: ${item.EnforcementActionName ?? item.ActionType}`,
        `ACTION DATE: ${item.ActionDate}`,
        `LEAD AGENCY: ${item.LeadAgency}`,
        `LAW SECTION: ${item.LawSection}`,
        "",
        item.FederalPenalty ? `FEDERAL PENALTY: $${item.FederalPenalty}` : "",
        item.StatePenalty ? `STATE PENALTY: $${item.StatePenalty}` : "",
        item.SettlementAmount ? `SETTLEMENT: $${item.SettlementAmount}` : "",
        "",
        item.ComplianceActionDescription ? `DESCRIPTION:\n${item.ComplianceActionDescription}` : "",
      ].filter(Boolean).join("\n");

      const result = await this.processDocument({
        source: "epa",
        sourceUrl: `https://echo.epa.gov/detailed-facility-report?fid=${item.RegistryId}`,
        sourceId: item.ActivityId ?? item.RegistryId ?? "",
        title: `EPA Enforcement: ${item.FacilityName} — ${item.EnforcementActionName ?? item.ActionType}`,
        text: fullText,
        jurisdiction: "FEDERAL",
        category: "environmental",
        metadata: {
          facilityName: item.FacilityName,
          registryId: item.RegistryId,
          actionType: item.ActionType,
          actionDate: item.ActionDate,
          leadAgency: item.LeadAgency,
          lawSection: item.LawSection,
          federalPenalty: item.FederalPenalty,
          statePenalty: item.StatePenalty,
          settlement: item.SettlementAmount,
          state: item.StateName,
        },
      }, env);

      results.push(result);
    }

    return results;
  }

  // ─── OSHA Inspection Details ──────────────────────────────────────

  /**
   * Pull OSHA inspection and violation details.
   * Uses DOL Enforcement API (free, no auth). Full violation descriptions,
   * penalty amounts, and citation details.
   */
  async pullOsha(env: Env, query?: {
    search?: string; // establishment name
    state?: string;
    severity?: string; // "S" serious, "W" willful, "R" repeat
    limit?: number;
  }): Promise<FeedProcessResult[]> {
    const limit = Math.min(query?.limit ?? 10, 20);

    // DOL enforcement data API
    const params = new URLSearchParams();
    params.set("format", "json");
    params.set("per_page", String(limit));
    params.set("order", "date_of_inspection desc");
    if (query?.search) params.set("estab_name", `*${query.search}*`);
    if (query?.state) params.set("site_state", query.state);

    const resp = await fetch(
      `https://enforcedata.dol.gov/api/v2/safety/inspection?${params.toString()}`,
      {
        headers: {
          "Accept": "application/json",
          "User-Agent": "VernenLegalCompliance/1.0",
        },
      }
    );

    if (!resp.ok) {
      throw new Error(`DOL OSHA API error: ${resp.status} ${resp.statusText}`);
    }

    const data = await resp.json() as {
      results: Array<{
        activity_nr: string;
        estab_name: string;
        site_address: string;
        site_city: string;
        site_state: string;
        site_zip: string;
        naics_code: string;
        insp_type: string;
        open_date: string;
        close_case_date?: string;
        close_conf_date?: string;
        violation_type?: string;
        total_current_penalty?: number;
        total_initial_penalty?: number;
        nr_in_state_flag?: string;
        safety_hlth?: string;
        sic_code?: string;
        union_status?: string;
        nr_of_violations?: number;
      }>;
    };

    const results: FeedProcessResult[] = [];

    for (const item of (data.results ?? [])) {
      const fullText = [
        `ESTABLISHMENT: ${item.estab_name}`,
        `ADDRESS: ${[item.site_address, item.site_city, item.site_state, item.site_zip].filter(Boolean).join(", ")}`,
        `NAICS: ${item.naics_code}`,
        "",
        `INSPECTION NUMBER: ${item.activity_nr}`,
        `INSPECTION TYPE: ${item.insp_type}`,
        `OPENED: ${item.open_date}`,
        item.close_case_date ? `CLOSED: ${item.close_case_date}` : "STATUS: Open",
        "",
        item.violation_type ? `VIOLATION TYPE: ${item.violation_type}` : "",
        item.nr_of_violations ? `NUMBER OF VIOLATIONS: ${item.nr_of_violations}` : "",
        item.total_initial_penalty ? `INITIAL PENALTY: $${item.total_initial_penalty.toLocaleString()}` : "",
        item.total_current_penalty ? `CURRENT PENALTY: $${item.total_current_penalty.toLocaleString()}` : "",
        item.safety_hlth ? `CATEGORY: ${item.safety_hlth === "S" ? "Safety" : "Health"}` : "",
        item.union_status ? `UNION STATUS: ${item.union_status === "Y" ? "Union" : "Non-Union"}` : "",
      ].filter(Boolean).join("\n");

      const result = await this.processDocument({
        source: "osha",
        sourceUrl: `https://www.osha.gov/pls/imis/establishment.inspection_detail?id=${item.activity_nr}`,
        sourceId: item.activity_nr,
        title: `OSHA Inspection: ${item.estab_name} — ${item.violation_type ?? item.insp_type} (${item.open_date})`,
        text: fullText,
        jurisdiction: "FEDERAL",
        category: "workplace_safety",
        metadata: {
          activityNumber: item.activity_nr,
          establishment: item.estab_name,
          naicsCode: item.naics_code,
          inspectionType: item.insp_type,
          openDate: item.open_date,
          closeCaseDate: item.close_case_date,
          violationType: item.violation_type,
          initialPenalty: item.total_initial_penalty,
          currentPenalty: item.total_current_penalty,
          numberOfViolations: item.nr_of_violations,
          state: item.site_state,
        },
      }, env);

      results.push(result);
    }

    return results;
  }

  // ─── MuckRock FOIA Documents ──────────────────────────────────────

  /**
   * Pull FOIA request documents from MuckRock.
   * Free API. Real government documents obtained through FOIA requests.
   */
  async pullMuckRock(env: Env, query?: {
    search?: string;
    agency?: string;
    status?: string; // "done", "ack", "processed"
    limit?: number;
  }): Promise<FeedProcessResult[]> {
    const limit = Math.min(query?.limit ?? 10, 20);
    const params = new URLSearchParams();
    params.set("page_size", String(limit));
    params.set("ordering", "-datetime_submitted");
    if (query?.search) params.set("search", query.search);
    if (query?.agency) params.set("agency", query.agency);
    if (query?.status) params.set("status", query.status);

    const resp = await fetch(
      `https://www.muckrock.com/api_v1/foia/?${params.toString()}`,
      {
        headers: {
          "Accept": "application/json",
          "User-Agent": "VernenLegalCompliance/1.0",
        },
      }
    );

    if (!resp.ok) {
      throw new Error(`MuckRock API error: ${resp.status} ${resp.statusText}`);
    }

    const data = await resp.json() as {
      results: Array<{
        id: number;
        title: string;
        slug: string;
        status: string;
        agency: { name: string; id: number };
        jurisdiction: { name: string; level: string };
        datetime_submitted: string;
        datetime_done?: string;
        description?: string;
        tags: string[];
        communications?: Array<{
          date: string;
          communication: string;
          from_who: { name: string };
          to_who: { name: string };
          status?: string;
        }>;
      }>;
    };

    const results: FeedProcessResult[] = [];

    for (const item of (data.results ?? [])) {
      // Build document text from FOIA request details and communications
      const commsText = (item.communications ?? [])
        .map(c => `[${c.date}] ${c.from_who?.name ?? "Unknown"} → ${c.to_who?.name ?? "Unknown"}\n${c.communication}`)
        .join("\n\n---\n\n");

      const fullText = [
        `FOIA REQUEST: ${item.title}`,
        `AGENCY: ${item.agency?.name}`,
        `JURISDICTION: ${item.jurisdiction?.name} (${item.jurisdiction?.level})`,
        `STATUS: ${item.status}`,
        `SUBMITTED: ${item.datetime_submitted}`,
        item.datetime_done ? `COMPLETED: ${item.datetime_done}` : "",
        item.tags?.length ? `TAGS: ${item.tags.join(", ")}` : "",
        item.description ? `\nDESCRIPTION:\n${item.description}` : "",
        commsText ? `\nCOMMUNICATIONS:\n${commsText}` : "",
      ].filter(Boolean).join("\n");

      const result = await this.processDocument({
        source: "muckrock",
        sourceUrl: `https://www.muckrock.com/foi/${item.slug}-${item.id}/`,
        sourceId: String(item.id),
        title: `FOIA: ${item.title} (${item.agency?.name})`,
        text: fullText.substring(0, 50000),
        jurisdiction: item.jurisdiction?.level === "f" ? "FEDERAL" : item.jurisdiction?.name?.toUpperCase(),
        category: "government_records",
        metadata: {
          foiaId: item.id,
          agency: item.agency?.name,
          agencyId: item.agency?.id,
          jurisdictionName: item.jurisdiction?.name,
          jurisdictionLevel: item.jurisdiction?.level,
          status: item.status,
          dateSubmitted: item.datetime_submitted,
          dateDone: item.datetime_done,
          tags: item.tags,
          communicationCount: item.communications?.length ?? 0,
        },
      }, env);

      results.push(result);
    }

    return results;
  }

  // ─── California Courts ────────────────────────────────────────────

  /**
   * Pull California published court opinions.
   * Uses Caselaw Access Project filtered to California, plus
   * California Courts API for slip opinions.
   */
  async pullCalifornia(env: Env, query?: {
    search?: string;
    court?: string; // "cal", "calctapp"
    dateAfter?: string;
    limit?: number;
  }): Promise<FeedProcessResult[]> {
    // Use case.law API filtered to California jurisdiction
    const limit = Math.min(query?.limit ?? 10, 20);
    const params = new URLSearchParams();
    params.set("jurisdiction", "cal");
    params.set("page_size", String(limit));
    params.set("ordering", "-decision_date");
    if (query?.search) params.set("search", query.search);
    if (query?.dateAfter) params.set("decision_date_min", query.dateAfter);
    if (query?.court) params.set("court", query.court);

    const resp = await fetch(
      `https://api.case.law/v1/cases/?${params.toString()}`,
      { headers: { "Accept": "application/json" } }
    );

    if (!resp.ok) {
      throw new Error(`case.law California error: ${resp.status} ${resp.statusText}`);
    }

    const data = await resp.json() as {
      results: Array<{
        id: number;
        url: string;
        name: string;
        name_abbreviation: string;
        decision_date: string;
        court?: { name: string; slug: string };
        jurisdiction?: { name: string; slug: string };
        citations?: Array<{ cite: string; type: string }>;
        casebody?: { data?: { opinions?: Array<{ text: string; type: string }> } };
      }>;
    };

    const results: FeedProcessResult[] = [];

    for (const cas of (data.results ?? [])) {
      const opinions = cas.casebody?.data?.opinions ?? [];
      const opinionText = opinions.map(o => `[${o.type.toUpperCase()}]\n${o.text}`).join("\n\n---\n\n");
      const citation = cas.citations?.[0]?.cite ?? "";

      const fullText = [
        `CASE: ${cas.name}`,
        `COURT: ${cas.court?.name}`,
        `DECISION DATE: ${cas.decision_date}`,
        citation ? `CITATION: ${citation}` : "",
        "",
        opinionText || "No opinion text available",
      ].filter(Boolean).join("\n");

      const result = await this.processDocument({
        source: "california",
        sourceUrl: cas.url,
        sourceId: String(cas.id),
        title: cas.name_abbreviation || cas.name,
        text: fullText.substring(0, 50000),
        jurisdiction: "CA",
        category: "litigation",
        metadata: {
          fullName: cas.name,
          decisionDate: cas.decision_date,
          court: cas.court?.name,
          courtSlug: cas.court?.slug,
          citation,
          opinionCount: opinions.length,
        },
      }, env);

      results.push(result);
    }

    return results;
  }

  // ─── Pull All — The Firehose ──────────────────────────────────────

  /**
   * Run all pull pipelines and return aggregate results.
   * Each source gets its own error isolation — one failure doesn't stop the rest.
   */
  async pullAll(env: Env, query?: {
    limit?: number; // per-source limit
  }): Promise<{
    totalPulled: number;
    bySource: Record<string, { pulled: number; error?: string }>;
    results: FeedProcessResult[];
  }> {
    const perSourceLimit = Math.min(query?.limit ?? 5, 10);
    const bySource: Record<string, { pulled: number; error?: string }> = {};
    const allResults: FeedProcessResult[] = [];

    const sources: Array<{
      name: string;
      pull: () => Promise<FeedProcessResult[]>;
    }> = [
      { name: "fedreg", pull: () => this.pullFedReg(env, { limit: perSourceLimit }) },
      { name: "fda", pull: () => this.pullFda(env, { limit: perSourceLimit }) },
      { name: "edgar", pull: () => this.pullEdgar(env, { limit: perSourceLimit }) },
      { name: "gao", pull: () => this.pullGao(env, { limit: perSourceLimit }) },
      { name: "courtlistener", pull: () => this.pullCourtListener(env, { limit: perSourceLimit }) },
      { name: "sam", pull: () => this.pullSam(env, { limit: perSourceLimit }) },
      { name: "cfpb", pull: () => this.pullCfpb(env, { limit: perSourceLimit }) },
      { name: "epa", pull: () => this.pullEpa(env, { limit: perSourceLimit }) },
      { name: "osha", pull: () => this.pullOsha(env, { limit: perSourceLimit }) },
      { name: "muckrock", pull: () => this.pullMuckRock(env, { limit: perSourceLimit }) },
      { name: "caselaw", pull: () => this.pullCaselaw(env, { limit: perSourceLimit }) },
      { name: "pacer", pull: () => this.pullPacer(env, { limit: perSourceLimit }) },
      { name: "california", pull: () => this.pullCalifornia(env, { limit: perSourceLimit }) },
    ];

    // Run each source with error isolation
    for (const source of sources) {
      try {
        const results = await source.pull();
        bySource[source.name] = { pulled: results.length };
        allResults.push(...results);
      } catch (e: unknown) {
        bySource[source.name] = {
          pulled: 0,
          error: e instanceof Error ? e.message : String(e),
        };
      }
    }

    return {
      totalPulled: allResults.length,
      bySource,
      results: allResults,
    };
  }

  // ─── Private Helpers ──────────────────────────────────────────────────

  private rowToDocument(row: Record<string, unknown>): FeedDocument {
    return {
      id: String(row.id ?? ""),
      source: String(row.source ?? "manual") as FeedSource,
      sourceUrl: row.source_url ? String(row.source_url) : null,
      sourceId: row.source_id ? String(row.source_id) : null,
      title: String(row.title ?? ""),
      documentType: row.document_type ? String(row.document_type) : null,
      jurisdiction: row.jurisdiction ? String(row.jurisdiction) : null,
      category: row.category ? String(row.category) : null,
      rawText: row.raw_text ? String(row.raw_text) : null,
      metadata: row.metadata ? JSON.parse(String(row.metadata)) : {},
      classificationConfidence: Number(row.classification_confidence ?? 0),
      routedCitizen: row.routed_citizen ? String(row.routed_citizen) : null,
      routedSkill: row.routed_skill ? String(row.routed_skill) : null,
      skillExecutionId: row.skill_execution_id ? String(row.skill_execution_id) : null,
      status: String(row.status ?? "pending") as FeedDocument["status"],
      errorMessage: row.error_message ? String(row.error_message) : null,
      ingestedAt: String(row.ingested_at ?? ""),
      processedAt: row.processed_at ? String(row.processed_at) : null,
    };
  }
}

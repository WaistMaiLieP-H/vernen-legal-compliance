import { PersonaCitizenBase } from "../base.js";
import { PersonaCitizenStatus } from "../../types/persona.js";
import { Lex1Worker, DOCUMENT_PRODUCTS, DOCUMENT_BUNDLES } from "../../workers/lex-1/index.js";
import { DocumentType, type GeneratedDocument } from "../../workers/lex-1/types.js";
import { generateId , safeKvPut } from "../../utils/helpers.js";
import type { Env } from "../../index.js";

/** KV namespace prefix for all LEXARC knowledge entries. */
const KV_PREFIX = "LEXARC:";

/** D1 table where persona citizen records live. */
const PERSONA_TABLE = "persona_citizens";

/** D1 table where generated documents are persisted. */
const DOCS_TABLE = "generated_documents";

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
 * LEXARC — The Corporate Strategy & Legal Architecture Persona Citizen.
 * Wave 3 Persona Citizen in the Vernen ecosystem.
 *
 * LEXARC's primary revenue worker is LEX-1, which generates legal documents
 * (privacy policies, terms of service, employee handbooks, compliance
 * checklists) for sale to small businesses and entrepreneurs.
 *
 * LEXARC handles:
 *   - Document generation requests (dispatched to LEX-1)
 *   - Corporate strategy reviews
 *   - Business expansion queries
 *   - Document catalog and pricing management
 */
export class Lexarc extends PersonaCitizenBase {
  private lex1: Lex1Worker;

  constructor() {
    super("LEXARC", "lexarc-knowledge", PersonaCitizenStatus.CONCEIVED);
    this.lex1 = new Lex1Worker();
  }

  // ---------------------------------------------------------------------------
  // Lifecycle overrides
  // ---------------------------------------------------------------------------

  /**
   * Initialize LEXARC by reading its status from D1 and setting up its
   * knowledge store namespace in KV.
   */
  async initialize(env: Env): Promise<void> {
    // Attempt to read current status from D1
    try {
      const row = await env.DB.prepare(
        `SELECT id, name, status, deployed_at, conceived_at
         FROM ${PERSONA_TABLE}
         WHERE name = ?1
         LIMIT 1`
      )
        .bind("LEXARC")
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
            "LEXARC",
            PersonaCitizenStatus.SHELL_DEPLOYED,
            new Date().toISOString()
          )
          .run();

        this._status = PersonaCitizenStatus.SHELL_DEPLOYED;
      }
    } catch {
      // If the table doesn't exist yet, gracefully default
      this._status = PersonaCitizenStatus.SHELL_DEPLOYED;
    }

    // Initialize KV knowledge namespace with boot marker
    const bootKey = `${KV_PREFIX}system:last_boot`;
    await safeKvPut(env.KNOWLEDGE_STORE, bootKey, new Date().toISOString());

    // Ensure counters exist
    const totalDocsKey = `${KV_PREFIX}stats:total_documents`;
    const existing = await env.KNOWLEDGE_STORE.get(totalDocsKey);
    if (existing === null) {
      await safeKvPut(env.KNOWLEDGE_STORE, totalDocsKey, "0");
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
      case "document_requested": {
        const data = payload as {
          type: DocumentType;
          params: Record<string, unknown>;
        };
        await this.generateDocument(data.type, data.params, env);
        break;
      }

      case "strategy_review": {
        const data = payload as {
          businessName: string;
          state: string;
          entityType: string;
          description?: string;
        };
        // Record the strategy review request in knowledge store
        await this._recordKnowledge(
          `strategy_review:${Date.now()}`,
          {
            ...data,
            requestedAt: new Date().toISOString(),
          },
          env
        );
        break;
      }

      case "expansion_query": {
        const data = payload as {
          businessName: string;
          currentStates: string[];
          targetStates: string[];
        };
        // Record the expansion query for demand tracking
        await this._recordKnowledge(
          `expansion_query:${Date.now()}`,
          {
            ...data,
            requestedAt: new Date().toISOString(),
          },
          env
        );
        break;
      }

      default:
        // Unknown events are logged to knowledge store for review
        await this._recordKnowledge(
          `unknown_event:${Date.now()}`,
          { event, payload, receivedAt: new Date().toISOString() },
          env
        );
        break;
    }
  }

  /**
   * Search LEXARC's KV knowledge store by query string.
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
  // Revenue products
  // ---------------------------------------------------------------------------

  /**
   * Dispatch document generation to LEX-1 based on document type.
   */
  async generateDocument(
    docType: DocumentType,
    params: Record<string, unknown>,
    env: Env
  ): Promise<GeneratedDocument> {
    let doc: GeneratedDocument;

    switch (docType) {
      case DocumentType.PRIVACY_POLICY:
        doc = await this.lex1.generatePrivacyPolicy(
          {
            businessName: params.businessName as string,
            state: params.state as string,
            entityType: params.entityType as string,
            websiteUrl: params.websiteUrl as string | undefined,
            collectsEmail: (params.collectsEmail as boolean) ?? true,
            collectsPayment: (params.collectsPayment as boolean) ?? false,
            usesAnalytics: (params.usesAnalytics as boolean) ?? false,
            hasMinors: (params.hasMinors as boolean) ?? false,
            effectiveDate: params.effectiveDate as string | undefined,
          },
          env
        );
        break;

      case DocumentType.TERMS_OF_SERVICE:
        doc = await this.lex1.generateTermsOfService(
          {
            businessName: params.businessName as string,
            state: params.state as string,
            entityType: params.entityType as string,
            serviceType: (params.serviceType as string) ?? "professional services",
            websiteUrl: params.websiteUrl as string | undefined,
            hasSubscriptions: (params.hasSubscriptions as boolean) ?? false,
            hasRefundPolicy: (params.hasRefundPolicy as boolean) ?? true,
            effectiveDate: params.effectiveDate as string | undefined,
          },
          env
        );
        break;

      case DocumentType.EMPLOYEE_HANDBOOK:
        doc = await this.lex1.generateEmployeeHandbook(
          {
            businessName: params.businessName as string,
            state: params.state as string,
            entityType: params.entityType as string,
            employeeCount: params.employeeCount as number | undefined,
            effectiveDate: params.effectiveDate as string | undefined,
          },
          env
        );
        break;

      case DocumentType.COMPLIANCE_CHECKLIST:
        doc = await this.lex1.generateComplianceChecklist(
          {
            state: params.state as string,
            entityType: params.entityType as string,
            businessName: params.businessName as string | undefined,
          },
          env
        );
        break;

      default:
        throw new Error(`Document type "${docType}" is not yet supported by LEX-1`);
    }

    // Record knowledge about what was generated
    await this._recordDocumentKnowledge(doc, env);

    return doc;
  }

  /**
   * Return the available document catalog with pricing.
   */
  getDocumentCatalog(): {
    products: typeof DOCUMENT_PRODUCTS;
    bundles: typeof DOCUMENT_BUNDLES;
  } {
    return {
      products: DOCUMENT_PRODUCTS,
      bundles: DOCUMENT_BUNDLES,
    };
  }

  /**
   * Retrieve all generated documents from D1.
   */
  async getGeneratedDocuments(env: Env): Promise<GeneratedDocument[]> {
    return this.lex1.listDocuments(100, env);
  }

  /**
   * Get LEXARC operational statistics.
   */
  async getStats(env: Env): Promise<{
    totalDocuments: number;
    documentsByType: Record<string, number>;
    status: PersonaCitizenStatus;
    lastBoot: string | null;
    revenue: { potential: number };
  }> {
    const totalDocsRaw = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}stats:total_documents`
    );
    const totalDocuments = totalDocsRaw ? parseInt(totalDocsRaw, 10) : 0;

    const documentsByType: Record<string, number> = {};
    for (const dt of Object.values(DocumentType)) {
      const countRaw = await env.KNOWLEDGE_STORE.get(
        `${KV_PREFIX}stats:type:${dt}`
      );
      documentsByType[dt] = countRaw ? parseInt(countRaw, 10) : 0;
    }

    const lastBoot = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}system:last_boot`
    );

    // Calculate potential revenue from unpaid docs
    let potentialRevenue = 0;
    try {
      const row = await env.DB.prepare(
        `SELECT COUNT(*) as count FROM ${DOCS_TABLE}
         WHERE generated_by = 'LEX-1' AND is_paid = 0`
      ).first<{ count: number }>();
      // Rough estimate: average document price * unpaid count
      potentialRevenue = (row?.count ?? 0) * 20;
    } catch {
      // Table may not exist
    }

    return {
      totalDocuments,
      documentsByType,
      status: this._status,
      lastBoot,
      revenue: { potential: potentialRevenue },
    };
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  /**
   * Store a piece of knowledge in LEXARC's KV namespace.
   */
  private async _recordKnowledge(
    key: string,
    value: unknown,
    env: Env
  ): Promise<void> {
    const fullKey = `${KV_PREFIX}${key}`;
    await safeKvPut(env.KNOWLEDGE_STORE, fullKey, JSON.stringify(value));
  }

  /**
   * Record knowledge about a generated document for self-improvement.
   */
  private async _recordDocumentKnowledge(
    doc: GeneratedDocument,
    env: Env
  ): Promise<void> {
    // Increment total documents count
    const totalKey = `${KV_PREFIX}stats:total_documents`;
    const currentTotal = await env.KNOWLEDGE_STORE.get(totalKey);
    const newTotal = (currentTotal ? parseInt(currentTotal, 10) : 0) + 1;
    await safeKvPut(env.KNOWLEDGE_STORE, totalKey, String(newTotal));

    // Increment per-type count
    const typeKey = `${KV_PREFIX}stats:type:${doc.type}`;
    const currentType = await env.KNOWLEDGE_STORE.get(typeKey);
    const newType = (currentType ? parseInt(currentType, 10) : 0) + 1;
    await safeKvPut(env.KNOWLEDGE_STORE, typeKey, String(newType));

    // Record state demand
    const stateKey = `${KV_PREFIX}demand:state:${doc.state}`;
    const currentState = await env.KNOWLEDGE_STORE.get(stateKey);
    const newState = (currentState ? parseInt(currentState, 10) : 0) + 1;
    await safeKvPut(env.KNOWLEDGE_STORE, stateKey, String(newState));
  }
}

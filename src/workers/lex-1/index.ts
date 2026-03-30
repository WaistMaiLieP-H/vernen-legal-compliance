/**
 * LEX-1 — Legal Document Generation Engine
 *
 * LEX-1 is LEXARC's primary revenue worker. It generates professional
 * legal documents (privacy policies, terms of service, employee handbooks,
 * compliance checklists) based on business parameters and state law.
 *
 * IMMEDIATE REVENUE: Each document is a saleable product.
 */

import type { Env } from "../../index.js";
import { generateId ,safeKvPut} from "../../utils/helpers.js";
import {
  DocumentType,
  type GeneratedDocument,
  type PrivacyPolicyParams,
  type TermsOfServiceParams,
  type EmployeeHandbookParams,
  type ComplianceChecklistParams,
  type DocumentProduct,
  type DocumentBundle,
} from "./types.js";
import {
  generatePrivacyPolicyHtml,
  generateTermsOfServiceHtml,
  generateEmployeeHandbookHtml,
  generateComplianceChecklistHtml,
  STATE_NAMES,
} from "./templates.js";

/** KV namespace prefix for LEX-1 cached documents. */
const KV_PREFIX = "LEXARC:lex1:";

/** D1 table for generated documents. */
const DOCS_TABLE = "generated_documents";

/**
 * Product catalog — pricing for each document type.
 */
export const DOCUMENT_PRODUCTS: DocumentProduct[] = [
  {
    type: DocumentType.PRIVACY_POLICY,
    name: "Privacy Policy",
    description:
      "Comprehensive privacy policy covering data collection, CCPA/CPRA, GDPR basics, cookies, data retention, and children's privacy. Customized to your state and business type.",
    priceUsd: 15,
    estimatedPages: "3-4 pages",
  },
  {
    type: DocumentType.TERMS_OF_SERVICE,
    name: "Terms of Service",
    description:
      "Professional terms of service covering limitation of liability, intellectual property, dispute resolution, governing law, indemnification, and warranty disclaimers. Includes optional subscription and refund sections.",
    priceUsd: 25,
    estimatedPages: "3-5 pages",
  },
  {
    type: DocumentType.EMPLOYEE_HANDBOOK,
    name: "Employee Handbook",
    description:
      "State-specific employee handbook covering EEO, anti-harassment, compensation, leave policies (FMLA, state-specific), workplace conduct, and separation procedures. Customized for CA, NY, and other states.",
    priceUsd: 75,
    estimatedPages: "8-12 pages",
  },
  {
    type: DocumentType.COMPLIANCE_CHECKLIST,
    name: "Compliance Checklist",
    description:
      "Printable compliance checklist covering business formation, licenses, tax compliance, employment law, insurance, data privacy, and ongoing compliance requirements for your entity type and state.",
    priceUsd: 10,
    estimatedPages: "2-3 pages",
  },
];

/**
 * Bundle products — discounted combinations.
 */
export const DOCUMENT_BUNDLES: DocumentBundle[] = [
  {
    id: "bundle_essentials",
    name: "Business Essentials Bundle",
    description:
      "Privacy Policy + Terms of Service + Compliance Checklist — everything a new business needs to get started online.",
    includes: [
      DocumentType.PRIVACY_POLICY,
      DocumentType.TERMS_OF_SERVICE,
      DocumentType.COMPLIANCE_CHECKLIST,
    ],
    priceUsd: 39,
    savingsUsd: 11,
  },
];

/**
 * LEX-1 Worker — generates legal documents for sale.
 */
export class Lex1Worker {
  // ---------------------------------------------------------------------------
  // Document generation methods
  // ---------------------------------------------------------------------------

  /**
   * Generate a privacy policy based on business parameters.
   */
  async generatePrivacyPolicy(
    params: PrivacyPolicyParams,
    env: Env
  ): Promise<GeneratedDocument> {
    const stateFull = STATE_NAMES[params.state] ?? params.state;
    const effectiveDate =
      params.effectiveDate ??
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

    const html = generatePrivacyPolicyHtml({
      businessName: params.businessName,
      state: params.state,
      stateFull,
      websiteUrl: params.websiteUrl ?? "N/A",
      collectsEmail: params.collectsEmail,
      collectsPayment: params.collectsPayment,
      usesAnalytics: params.usesAnalytics,
      hasMinors: params.hasMinors,
      effectiveDate,
      entityType: params.entityType,
    });

    const doc: GeneratedDocument = {
      id: generateId("doc"),
      type: DocumentType.PRIVACY_POLICY,
      params: params as unknown as Record<string, unknown>,
      content: html,
      generatedAt: new Date().toISOString(),
      generatedBy: "LEX-1",
      isPaid: false,
      businessName: params.businessName,
      state: params.state,
    };

    await this._persistDocument(doc, null, env);
    return doc;
  }

  /**
   * Generate terms of service based on business parameters.
   */
  async generateTermsOfService(
    params: TermsOfServiceParams,
    env: Env
  ): Promise<GeneratedDocument> {
    const stateFull = STATE_NAMES[params.state] ?? params.state;
    const effectiveDate =
      params.effectiveDate ??
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

    const html = generateTermsOfServiceHtml({
      businessName: params.businessName,
      state: params.state,
      stateFull,
      websiteUrl: params.websiteUrl ?? "N/A",
      serviceType: params.serviceType,
      entityType: params.entityType,
      hasSubscriptions: params.hasSubscriptions,
      hasRefundPolicy: params.hasRefundPolicy,
      effectiveDate,
    });

    const doc: GeneratedDocument = {
      id: generateId("doc"),
      type: DocumentType.TERMS_OF_SERVICE,
      params: params as unknown as Record<string, unknown>,
      content: html,
      generatedAt: new Date().toISOString(),
      generatedBy: "LEX-1",
      isPaid: false,
      businessName: params.businessName,
      state: params.state,
    };

    await this._persistDocument(doc, null, env);
    return doc;
  }

  /**
   * Generate an employee handbook based on state employment law.
   */
  async generateEmployeeHandbook(
    params: EmployeeHandbookParams,
    env: Env
  ): Promise<GeneratedDocument> {
    const stateFull = STATE_NAMES[params.state] ?? params.state;
    const effectiveDate =
      params.effectiveDate ??
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

    const html = generateEmployeeHandbookHtml({
      businessName: params.businessName,
      state: params.state,
      stateFull,
      entityType: params.entityType,
      employeeCount: params.employeeCount ?? 10,
      effectiveDate,
    });

    const doc: GeneratedDocument = {
      id: generateId("doc"),
      type: DocumentType.EMPLOYEE_HANDBOOK,
      params: params as unknown as Record<string, unknown>,
      content: html,
      generatedAt: new Date().toISOString(),
      generatedBy: "LEX-1",
      isPaid: false,
      businessName: params.businessName,
      state: params.state,
    };

    await this._persistDocument(doc, null, env);
    return doc;
  }

  /**
   * Generate a compliance checklist based on state and entity type.
   */
  async generateComplianceChecklist(
    params: ComplianceChecklistParams,
    env: Env
  ): Promise<GeneratedDocument> {
    const stateFull = STATE_NAMES[params.state] ?? params.state;

    const html = generateComplianceChecklistHtml({
      businessName: params.businessName ?? "",
      state: params.state,
      stateFull,
      entityType: params.entityType,
    });

    const doc: GeneratedDocument = {
      id: generateId("doc"),
      type: DocumentType.COMPLIANCE_CHECKLIST,
      params: params as unknown as Record<string, unknown>,
      content: html,
      generatedAt: new Date().toISOString(),
      generatedBy: "LEX-1",
      isPaid: false,
      businessName: params.businessName ?? "N/A",
      state: params.state,
    };

    await this._persistDocument(doc, null, env);
    return doc;
  }

  // ---------------------------------------------------------------------------
  // Retrieval methods
  // ---------------------------------------------------------------------------

  /**
   * Retrieve a generated document by ID. Checks KV cache first, then D1.
   */
  async getDocument(
    documentId: string,
    env: Env
  ): Promise<GeneratedDocument | null> {
    // Try KV cache first
    const cached = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}${documentId}`,
      "json"
    );
    if (cached) {
      return cached as GeneratedDocument;
    }

    // Fall back to D1
    try {
      const row = await env.DB.prepare(
        `SELECT id, document_type, client_id, business_name, state, entity_type,
                params, content, is_paid, stripe_payment_id, generated_by, created_at
         FROM ${DOCS_TABLE}
         WHERE id = ?1
         LIMIT 1`
      )
        .bind(documentId)
        .first<DocumentRow>();

      if (!row) return null;

      return this._rowToDocument(row);
    } catch {
      return null;
    }
  }

  /**
   * List all generated documents from D1.
   */
  async listDocuments(
    limit: number,
    env: Env
  ): Promise<GeneratedDocument[]> {
    try {
      const result = await env.DB.prepare(
        `SELECT id, document_type, client_id, business_name, state, entity_type,
                params, content, is_paid, stripe_payment_id, generated_by, created_at
         FROM ${DOCS_TABLE}
         WHERE generated_by = 'LEX-1'
         ORDER BY created_at DESC
         LIMIT ?1`
      )
        .bind(limit)
        .all<DocumentRow>();

      if (!result.success || !result.results) return [];

      return result.results.map((row) => this._rowToDocument(row));
    } catch {
      return [];
    }
  }

  /**
   * Check whether a document has been paid for.
   */
  async isDocumentPaid(documentId: string, env: Env): Promise<boolean> {
    try {
      const row = await env.DB.prepare(
        `SELECT is_paid FROM ${DOCS_TABLE} WHERE id = ?1 LIMIT 1`
      )
        .bind(documentId)
        .first<{ is_paid: number }>();

      return row?.is_paid === 1;
    } catch {
      return false;
    }
  }

  /**
   * Get the product catalog.
   */
  getProductCatalog(): {
    products: DocumentProduct[];
    bundles: DocumentBundle[];
  } {
    return {
      products: DOCUMENT_PRODUCTS,
      bundles: DOCUMENT_BUNDLES,
    };
  }

  /**
   * Get pricing for a specific document type.
   */
  getPrice(type: DocumentType): number | null {
    const product = DOCUMENT_PRODUCTS.find((p) => p.type === type);
    return product?.priceUsd ?? null;
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  /**
   * Persist a generated document to D1 and cache in KV.
   */
  private async _persistDocument(
    doc: GeneratedDocument,
    clientId: string | null,
    env: Env
  ): Promise<void> {
    // Store in D1
    try {
      await env.DB.prepare(
        `INSERT INTO ${DOCS_TABLE}
         (id, document_type, client_id, business_name, state, entity_type,
          params, content, is_paid, generated_by, created_at)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11)`
      )
        .bind(
          doc.id,
          doc.type,
          clientId,
          doc.businessName,
          doc.state,
          (doc.params as Record<string, unknown>).entityType ?? null,
          JSON.stringify(doc.params),
          doc.content,
          doc.isPaid ? 1 : 0,
          doc.generatedBy,
          doc.generatedAt
        )
        .run();
    } catch {
      // Table may not exist yet — will be created by migration
    }

    // Cache in KV (90-day expiration)
    await safeKvPut(env.KNOWLEDGE_STORE, 
      `${KV_PREFIX}${doc.id}`,
      JSON.stringify(doc),
      { expirationTtl: 90 * 86400 }
    );

    // Increment generation counter
    const countKey = `${KV_PREFIX}stats:generated`;
    const current = await env.KNOWLEDGE_STORE.get(countKey);
    const count = (current ? parseInt(current, 10) : 0) + 1;
    await safeKvPut(env.KNOWLEDGE_STORE, countKey, String(count));
  }

  /**
   * Convert a D1 row to a GeneratedDocument.
   */
  private _rowToDocument(row: DocumentRow): GeneratedDocument {
    return {
      id: row.id,
      type: row.document_type as DocumentType,
      params: JSON.parse(row.params || "{}"),
      content: row.content,
      generatedAt: row.created_at,
      generatedBy: "LEX-1",
      isPaid: row.is_paid === 1,
      businessName: row.business_name,
      state: row.state,
    };
  }
}

/**
 * Shape of a row in the generated_documents D1 table.
 */
interface DocumentRow {
  id: string;
  document_type: string;
  client_id: string | null;
  business_name: string;
  state: string;
  entity_type: string | null;
  params: string;
  content: string;
  is_paid: number;
  stripe_payment_id: string | null;
  generated_by: string;
  created_at: string;
}

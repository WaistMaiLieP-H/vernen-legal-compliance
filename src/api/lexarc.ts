import type { Env } from "../index.js";
import { Lexarc } from "../personas/lexarc/index.js";
import { Lex1Worker } from "../workers/lex-1/index.js";
import { DocumentType } from "../workers/lex-1/types.js";
import { USState, BusinessEntityType } from "../types/client.js";
import { parseJsonBody } from "../utils/helpers.js";

type RouteParams = Record<string, string>;

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function htmlResponse(html: string, status = 200): Response {
  return new Response(html, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

// ---------------------------------------------------------------------------
// Singleton LEXARC instance
// ---------------------------------------------------------------------------

let lexarcInstance: Lexarc | null = null;
let lexarcInitialized = false;

async function getLexarcInstance(env: Env): Promise<Lexarc> {
  if (!lexarcInstance) {
    lexarcInstance = new Lexarc();
  }
  if (!lexarcInitialized) {
    await lexarcInstance.initialize(env);
    lexarcInitialized = true;
  }
  return lexarcInstance;
}

// ---------------------------------------------------------------------------
// Validators
// ---------------------------------------------------------------------------

function isValidState(value: string): value is USState {
  return Object.values(USState).includes(value as USState);
}

function isValidEntityType(value: string): value is BusinessEntityType {
  return Object.values(BusinessEntityType).includes(
    value as BusinessEntityType
  );
}

function isValidDocumentType(value: string): value is DocumentType {
  return Object.values(DocumentType).includes(value as DocumentType);
}

// =============================================================================
// Route Handlers
// =============================================================================

/**
 * GET /api/lexarc/status
 * Returns LEXARC Citizen status, knowledge stats, and operational info.
 */
export async function handleLexarcStatus(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const lexarc = await getLexarcInstance(env);
  const stats = await lexarc.getStats(env);

  return jsonResponse({
    citizen: "LEXARC",
    trademark: "LEXARC\u2122",
    domain: "Corporate Strategy & Legal Architecture",
    wave: 3,
    status: stats.status,
    description:
      "Corporate Strategy & Legal Architecture Persona Citizen. Generates professional legal documents for small businesses via LEX-1.",
    workers: ["LEX-1"],
    operational: {
      totalDocuments: stats.totalDocuments,
      documentsByType: stats.documentsByType,
      potentialRevenue: `$${stats.revenue.potential}`,
      lastBoot: stats.lastBoot,
    },
  });
}

/**
 * GET /api/lexarc/documents
 * Returns the document catalog with available types and pricing.
 */
export async function handleLexarcDocuments(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const lexarc = await getLexarcInstance(env);
  const catalog = lexarc.getDocumentCatalog();

  return jsonResponse({
    citizen: "LEXARC",
    worker: "LEX-1",
    catalog: {
      products: catalog.products.map((p) => ({
        type: p.type,
        name: p.name,
        description: p.description,
        price: `$${p.priceUsd}`,
        priceUsd: p.priceUsd,
        estimatedPages: p.estimatedPages,
      })),
      bundles: catalog.bundles.map((b) => ({
        id: b.id,
        name: b.name,
        description: b.description,
        includes: b.includes,
        price: `$${b.priceUsd}`,
        priceUsd: b.priceUsd,
        savings: `$${b.savingsUsd}`,
      })),
    },
  });
}

/**
 * POST /api/lexarc/generate
 * Generate a legal document.
 *
 * Body: { type, businessName, state, entityType, ...params }
 *
 * Free preview: returns first section only.
 * Full document: requires payment (is_paid flag).
 */
export async function handleLexarcGenerate(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const lexarc = await getLexarcInstance(env);

  let body: Record<string, unknown>;
  try {
    body = await parseJsonBody<Record<string, unknown>>(request);
  } catch {
    return jsonResponse({ error: "Invalid JSON in request body" }, 400);
  }

  // Validate required fields
  const type = body.type as string;
  const businessName = body.businessName as string;
  const state = body.state as string;
  const entityType = body.entityType as string;

  if (!type || !isValidDocumentType(type)) {
    return jsonResponse(
      {
        error: "Invalid or missing document type",
        validTypes: Object.values(DocumentType),
      },
      400
    );
  }

  if (
    type !== DocumentType.COMPLIANCE_CHECKLIST &&
    (!businessName || typeof businessName !== "string")
  ) {
    return jsonResponse({ error: "businessName is required" }, 400);
  }

  if (!state || !isValidState(state)) {
    return jsonResponse(
      {
        error: "Invalid or missing state",
        hint: "Use two-letter state code (e.g., CA, NY, TX)",
      },
      400
    );
  }

  if (!entityType || !isValidEntityType(entityType)) {
    return jsonResponse(
      {
        error: "Invalid or missing entityType",
        validTypes: Object.values(BusinessEntityType),
      },
      400
    );
  }

  try {
    const doc = await lexarc.generateDocument(
      type as DocumentType,
      {
        businessName: businessName ?? "",
        state,
        entityType,
        ...body,
      },
      env
    );

    // Free preview: extract first section only
    const previewContent = extractPreview(doc.content);

    return jsonResponse({
      success: true,
      document: {
        id: doc.id,
        type: doc.type,
        businessName: doc.businessName,
        state: doc.state,
        generatedAt: doc.generatedAt,
        generatedBy: doc.generatedBy,
        isPaid: doc.isPaid,
        preview: previewContent,
        fullDocumentAvailable: true,
        retrieveUrl: `/api/lexarc/document/${doc.id}`,
      },
      pricing: getPricingForType(type as DocumentType),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Document generation failed";
    return jsonResponse({ error: message }, 500);
  }
}

/**
 * GET /api/lexarc/document/:id
 * Retrieve a generated document by ID.
 * Payment-gated: returns full content only if paid, otherwise preview.
 */
export async function handleLexarcGetDocument(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const documentId = params["id"];
  if (!documentId) {
    return jsonResponse({ error: "Document ID is required" }, 400);
  }

  const lexarc = await getLexarcInstance(env);
  const lex1 = new Lex1Worker();

  const doc = await lex1.getDocument(documentId, env);
  if (!doc) {
    return jsonResponse({ error: "Document not found" }, 404);
  }

  if (doc.isPaid) {
    // Return full HTML document
    return htmlResponse(doc.content);
  }

  // Unpaid — return preview with purchase info
  const previewContent = extractPreview(doc.content);
  return jsonResponse({
    document: {
      id: doc.id,
      type: doc.type,
      businessName: doc.businessName,
      state: doc.state,
      generatedAt: doc.generatedAt,
      generatedBy: doc.generatedBy,
      isPaid: false,
    },
    preview: previewContent,
    message:
      "This is a free preview. Purchase the full document to download.",
    pricing: getPricingForType(doc.type),
    purchaseUrl: `/api/payments/checkout`,
    purchasePayload: {
      product: `lexarc_${doc.type.toLowerCase()}`,
      documentId: doc.id,
    },
  });
}

/**
 * GET /api/lexarc/products
 * Returns all document products and pricing.
 */
export async function handleLexarcProducts(
  _request: Request,
  _env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const lexarc = new Lexarc();
  const catalog = lexarc.getDocumentCatalog();

  return jsonResponse({
    citizen: "LEXARC",
    worker: "LEX-1",
    products: catalog.products.map((p) => ({
      type: p.type,
      name: p.name,
      description: p.description,
      price: `$${p.priceUsd}`,
      priceUsd: p.priceUsd,
      estimatedPages: p.estimatedPages,
    })),
    bundles: catalog.bundles.map((b) => ({
      id: b.id,
      name: b.name,
      description: b.description,
      includes: b.includes,
      price: `$${b.priceUsd}`,
      priceUsd: b.priceUsd,
      savings: `$${b.savingsUsd}`,
    })),
    pricing: {
      privacyPolicy: "$15",
      termsOfService: "$25",
      employeeHandbook: "$75",
      complianceChecklist: "$10",
      businessEssentialsBundle: "$39 (save $11)",
    },
  });
}

// =============================================================================
// Helpers
// =============================================================================

/**
 * Extract a preview from full HTML content.
 * Returns the content up to the first two sections.
 */
function extractPreview(html: string): string {
  // Find the third <h2> tag and cut there
  let count = 0;
  let cutIndex = -1;
  const regex = /<h2>/gi;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(html)) !== null) {
    count++;
    if (count === 3) {
      cutIndex = match.index;
      break;
    }
  }

  if (cutIndex > 0) {
    const preview = html.slice(0, cutIndex);
    return (
      preview +
      `<div style="padding:24px;background:#f0f4f8;border:2px dashed #1a3a5c;text-align:center;margin:24px 0;">
        <h3 style="color:#1a3a5c;margin:0 0 8px;">Preview Ends Here</h3>
        <p style="margin:0;color:#555;">Purchase the full document to access all sections.</p>
        <p style="margin:8px 0 0;font-size:13px;color:#777;">Powered by LEXARC&trade; &amp; LEX-1&trade; | Vernen Legal Compliance</p>
      </div>
      </body></html>`
    );
  }

  return html;
}

/**
 * Get pricing info for a document type.
 */
function getPricingForType(
  type: DocumentType
): { price: string; priceUsd: number } | null {
  const prices: Record<DocumentType, number> = {
    [DocumentType.PRIVACY_POLICY]: 15,
    [DocumentType.TERMS_OF_SERVICE]: 25,
    [DocumentType.EMPLOYEE_HANDBOOK]: 75,
    [DocumentType.COMPLIANCE_CHECKLIST]: 10,
    [DocumentType.BYLAWS]: 50,
    [DocumentType.OPERATING_AGREEMENT]: 50,
  };

  const priceUsd = prices[type];
  if (priceUsd === undefined) return null;

  return { price: `$${priceUsd}`, priceUsd };
}

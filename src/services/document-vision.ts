/**
 * Document Vision Engine
 *
 * Takes scanned document images (PNG, JPG, PDF pages) from a Brother MFC-J485DW
 * scanner (grayscale, 300 DPI, letter size) and extracts structured text + metadata
 * for the audit pipeline. This is the intake layer that feeds the Document Feed
 * Pipeline (POST /api/feed/document).
 *
 * Flow:
 *   Image → Extract (Workers AI vision) → Structure (text parsing) →
 *   Classify (ARCHIVIST-0 types) → Store (KV) → Feed (document-feed pipeline)
 *
 * Uses Cloudflare Workers AI (@cf/meta/llama-3.2-11b-vision-instruct) for
 * image-to-text extraction. Falls back to base64 passthrough if AI binding
 * is unavailable.
 */

import type { Env } from "../index.js";
import { generateId, safeKvPut } from "../utils/helpers.js";
import { DocumentFeedEngine } from "./document-feed.js";
import type { FeedDocumentInput } from "./document-feed.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface ExtractionResult {
  text: string;
  confidence: number;
  model: string;
  durationMs: number;
}

export interface StructuredDocument {
  documentType: string | null;
  documentDate: string | null;
  caseNumber: string | null;
  jurisdiction: string | null;
  issuingAuthority: string | null;
  parties: string[];
  category: string | null;
  title: string | null;
  pageCount: number;
  /** All structured fields as a flat record */
  fields: Record<string, string | null>;
}

export interface ArchivistClassification {
  documentType: string;
  category: string;
  jurisdiction: string;
  confidence: number;
}

export interface VisionProcessResult {
  id: string;
  extraction: ExtractionResult;
  structured: StructuredDocument;
  classification: ArchivistClassification;
  feedDocumentId: string | null;
  kvKey: string;
  status: "complete" | "failed";
}

export interface VisionStats {
  total: number;
  byStatus: Record<string, number>;
  byDocumentType: Record<string, number>;
  byModel: Record<string, number>;
  avgConfidence: number;
  avgDurationMs: number;
  totalFed: number;
  lastProcessedAt: string | null;
}

// ═══════════════════════════════════════════════════════════════════════════
// Text Extraction — Workers AI Vision
// ═══════════════════════════════════════════════════════════════════════════

const VISION_MODEL = "@cf/meta/llama-3.2-11b-vision-instruct";

const EXTRACTION_PROMPT = `You are a document OCR system. Extract ALL text from this scanned document image exactly as it appears. Preserve:
- Headers and footers
- Numbered paragraphs and sections
- Table structure (use | for columns)
- Case numbers, dates, party names
- Stamps, seals, signatures (note as [STAMP], [SEAL], [SIGNATURE])
- Checkboxes (note as [X] checked or [ ] unchecked)
- Handwritten text (note as [HANDWRITTEN: ...])

Output ONLY the extracted text, no commentary.`;

/**
 * Extract text from a scanned document image using Workers AI vision model.
 */
export async function extractTextFromImage(
  imageBuffer: ArrayBuffer,
  mimeType: string,
  env: Env,
): Promise<ExtractionResult> {
  const start = Date.now();

  // Primary: Workers AI vision model
  if (env.AI) {
    try {
      const imageArray = new Uint8Array(imageBuffer);
      const base64 = uint8ArrayToBase64(imageArray);

      const response = await env.AI.run(VISION_MODEL as Parameters<Ai["run"]>[0], {
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: EXTRACTION_PROMPT },
              { type: "image_url", image_url: { url: `data:${mimeType};base64,${base64}` } },
            ],
          },
        ],
        max_tokens: 4096,
      } as Record<string, unknown>) as { response?: string; result?: { response?: string } };

      const text = response?.response ?? response?.result?.response ?? "";
      const durationMs = Date.now() - start;

      // Estimate confidence based on text length and structure
      const confidence = estimateConfidence(text, imageBuffer.byteLength);

      return { text, confidence, model: VISION_MODEL, durationMs };
    } catch (e: unknown) {
      // Fall through to fallback
      console.error("Workers AI vision failed:", e instanceof Error ? e.message : e);
    }
  }

  // Fallback: return empty extraction with guidance
  return {
    text: "",
    confidence: 0,
    model: "none",
    durationMs: Date.now() - start,
  };
}

/**
 * Estimate extraction confidence based on output characteristics.
 * Higher confidence when text is substantial and well-structured.
 */
function estimateConfidence(text: string, imageSizeBytes: number): number {
  if (!text || text.length < 10) return 0.1;

  let score = 0.5;

  // Length relative to image size (300 DPI letter = ~1-3MB, should yield 500-5000 chars)
  const charsPerKb = text.length / (imageSizeBytes / 1024);
  if (charsPerKb > 0.5 && charsPerKb < 50) score += 0.15;

  // Structural indicators
  if (/\d{1,2}\/\d{1,2}\/\d{2,4}/.test(text)) score += 0.05; // dates
  if (/case\s*(?:no|number|#)/i.test(text)) score += 0.05;     // case numbers
  if (/court|judge|order|motion/i.test(text)) score += 0.05;   // legal terms
  if (/\n\s*\d+[\.\)]\s/.test(text)) score += 0.05;            // numbered paragraphs
  if (/\|/.test(text)) score += 0.03;                           // table structure
  if (text.split("\n").length > 5) score += 0.05;               // multi-line
  if (/[A-Z]{2,}/.test(text)) score += 0.02;                   // headers/caps

  return Math.min(score, 0.98);
}

// ═══════════════════════════════════════════════════════════════════════════
// Structured Data Extraction — Parse text into fields
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Parse extracted text into structured document fields.
 * Looks for common legal document patterns.
 */
export function extractStructuredData(text: string): StructuredDocument {
  const fields: Record<string, string | null> = {};

  // ── Case Number ─────────────────────────────────────────────────────
  const casePatterns = [
    /(?:case\s*(?:no|number|#)[.:]*\s*)([\w\-]+)/i,
    /(?:docket\s*(?:no|number|#)?[.:]*\s*)([\w\-]+)/i,
    /(\d{1,2}:\d{2}-[a-z]{2}-\d+)/i,          // federal: 3:24-cv-01234
    /(\d{2}-\d{2}-\d{4,})/,                    // state: 04-23-01959
    /([A-Z]{1,3}\d{2}-\d{4,})/,                // CA style: C25-01403
  ];
  let caseNumber: string | null = null;
  for (const pat of casePatterns) {
    const m = text.match(pat);
    if (m?.[1]) { caseNumber = m[1]; break; }
  }
  fields.caseNumber = caseNumber;

  // ── Document Date ───────────────────────────────────────────────────
  const datePatterns = [
    /(?:dated?|filed|entered|issued)[:\s]*(\w+\s+\d{1,2},?\s+\d{4})/i,
    /(?:dated?|filed|entered|issued)[:\s]*(\d{1,2}\/\d{1,2}\/\d{2,4})/i,
    /(\w+\s+\d{1,2},?\s+\d{4})/,
    /(\d{1,2}\/\d{1,2}\/\d{2,4})/,
  ];
  let documentDate: string | null = null;
  for (const pat of datePatterns) {
    const m = text.match(pat);
    if (m?.[1]) { documentDate = m[1]; break; }
  }
  fields.documentDate = documentDate;

  // ── Jurisdiction ────────────────────────────────────────────────────
  let jurisdiction: string | null = null;
  const lower = text.toLowerCase();

  if (/superior court.*california/i.test(text) || /state of california/i.test(text)) {
    jurisdiction = "CA";
    // Try to get county
    const countyMatch = text.match(/county of\s+(\w+)/i);
    if (countyMatch?.[1]) fields.county = countyMatch[1];
  } else if (/united states district court/i.test(text)) {
    jurisdiction = "FEDERAL";
    const distMatch = text.match(/(?:northern|southern|eastern|western|central)\s+district\s+of\s+(\w+)/i);
    if (distMatch?.[1]) {
      fields.district = distMatch[0];
      jurisdiction = `FEDERAL_${distMatch[1]!.toUpperCase().substring(0, 2)}`;
    }
  } else if (/ninth circuit|9th cir/i.test(text)) {
    jurisdiction = "FEDERAL_9TH";
  } else if (/state of\s+(\w+)/i.test(text)) {
    const stateMatch = text.match(/state of\s+(\w+)/i);
    if (stateMatch?.[1]) jurisdiction = stateMatch[1].toUpperCase().substring(0, 2);
  }
  fields.jurisdiction = jurisdiction;

  // ── Issuing Authority ───────────────────────────────────────────────
  let issuingAuthority: string | null = null;
  const authorityPatterns = [
    /(?:hon\.|honorable)\s+([\w\s\.]+?)(?:\n|,|$)/i,
    /(judge|magistrate|commissioner)\s+([\w\s\.]+?)(?:\n|,|$)/i,
    /department of\s+([\w\s]+?)(?:\n|,|$)/i,
    /([\w\s]+?)\s*(?:police|sheriff)\s*department/i,
  ];
  for (const pat of authorityPatterns) {
    const m = text.match(pat);
    if (m) { issuingAuthority = m[0].trim(); break; }
  }
  fields.issuingAuthority = issuingAuthority;

  // ── Parties ─────────────────────────────────────────────────────────
  const parties: string[] = [];
  const vsMatch = text.match(/([\w\s,\.]+?)\s+v[s]?\.?\s+([\w\s,\.]+?)(?:\n|$)/i);
  if (vsMatch) {
    if (vsMatch[1]) parties.push(vsMatch[1].trim());
    if (vsMatch[2]) parties.push(vsMatch[2].trim());
  }
  // Petitioner/Respondent
  const petMatch = text.match(/petitioner[:\s]*([\w\s,\.]+?)(?:\n|$)/i);
  if (petMatch?.[1] && !parties.includes(petMatch[1].trim())) parties.push(petMatch[1].trim());
  const respMatch = text.match(/respondent[:\s]*([\w\s,\.]+?)(?:\n|$)/i);
  if (respMatch?.[1] && !parties.includes(respMatch[1].trim())) parties.push(respMatch[1].trim());
  // Plaintiff/Defendant
  const plMatch = text.match(/plaintiff[:\s]*([\w\s,\.]+?)(?:\n|$)/i);
  if (plMatch?.[1] && !parties.includes(plMatch[1].trim())) parties.push(plMatch[1].trim());
  const defMatch = text.match(/defendant[:\s]*([\w\s,\.]+?)(?:\n|$)/i);
  if (defMatch?.[1] && !parties.includes(defMatch[1].trim())) parties.push(defMatch[1].trim());

  // ── Document Type (from text patterns) ──────────────────────────────
  let documentType: string | null = null;
  let category: string | null = null;

  if (/order\s+(?:to\s+show\s+cause|granting|denying|re:|regarding)/i.test(text)) {
    documentType = "court_order"; category = "litigation";
  } else if (/motion\s+(?:to|for)\s/i.test(text)) {
    documentType = "motion"; category = "litigation";
  } else if (/complaint\s+for/i.test(text) || /petition\s+(?:for|to)\s/i.test(text)) {
    documentType = "complaint"; category = "litigation";
  } else if (/police\s+report|incident\s+report|crime\s+report/i.test(text)) {
    documentType = "police_report"; category = "law_enforcement";
  } else if (/medical\s+record|diagnosis|treatment\s+plan|discharge\s+summary/i.test(text)) {
    documentType = "medical_record"; category = "healthcare";
  } else if (/deed\s+of\s+trust|grant\s+deed|title/i.test(text)) {
    documentType = "property_record"; category = "real_estate";
  } else if (/birth\s+certificate|death\s+certificate|marriage\s+(?:license|certificate)/i.test(text)) {
    documentType = "vital_record"; category = "identity";
  } else if (/invoice|receipt|statement\s+of\s+account/i.test(text)) {
    documentType = "financial_document"; category = "financial";
  } else if (/subpoena/i.test(text)) {
    documentType = "subpoena"; category = "litigation";
  } else if (/declaration|affidavit/i.test(text)) {
    documentType = "declaration"; category = "litigation";
  } else if (/judgment|verdict/i.test(text)) {
    documentType = "judgment"; category = "litigation";
  } else if (/debt\s+collection|amount\s+owed|past\s+due/i.test(text)) {
    documentType = "debt_collection"; category = "financial";
  } else if (/insurance|policy\s+number|claim/i.test(text)) {
    documentType = "insurance_document"; category = "insurance";
  } else if (/fl-\d{3}/i.test(text)) {
    documentType = "california_family_law_form"; category = "family_law";
  } else if (/dissolution|custody|visitation|child\s+support/i.test(text)) {
    documentType = "family_law_document"; category = "family_law";
  } else if (/§\s*1983|civil\s+rights|due\s+process/i.test(text)) {
    documentType = "civil_rights_filing"; category = "civil_rights";
  }

  fields.documentType = documentType;
  fields.category = category;

  // ── Title extraction ────────────────────────────────────────────────
  let title: string | null = null;
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  // First substantial line that looks like a title (caps or substantial text)
  for (const line of lines.slice(0, 10)) {
    if (line.length > 10 && line.length < 200) {
      // Skip if it's just a date or number
      if (/^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(line)) continue;
      if (/^\d+$/.test(line)) continue;
      title = line;
      break;
    }
  }
  fields.title = title;

  return {
    documentType,
    documentDate,
    caseNumber,
    jurisdiction,
    issuingAuthority,
    parties,
    category,
    title,
    pageCount: 1,
    fields,
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// ARCHIVIST-0 Classification — Map to routing document types
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Map structured document data to ARCHIVIST-0 document types for routing.
 * These map directly to the routing engine's docType field.
 */
export function classifyDocument(structured: StructuredDocument): ArchivistClassification {
  const docType = structured.documentType ?? "unclassified";
  const category = structured.category ?? "*";
  const jurisdiction = structured.jurisdiction ?? "*";

  // Map to ARCHIVIST-0 canonical types (used by routing engine)
  const ARCHIVIST_TYPE_MAP: Record<string, string> = {
    court_order: "court_order",
    motion: "court_filing",
    complaint: "court_filing",
    judgment: "court_order",
    declaration: "court_filing",
    subpoena: "court_filing",
    police_report: "law_enforcement_report",
    medical_record: "medical_document",
    property_record: "real_property_document",
    vital_record: "identity_document",
    financial_document: "financial_document",
    debt_collection: "debt_collection_document",
    insurance_document: "insurance_document",
    california_family_law_form: "california_family_law_form",
    family_law_document: "family_law_document",
    civil_rights_filing: "civil_rights_filing",
    federal_register_final_rule: "federal_register_document",
    federal_register_proposed_rule: "federal_register_document",
    federal_register_notice: "federal_register_document",
    foia_response: "government_records",
    unclassified: "unclassified",
  };

  const archivistDocType = ARCHIVIST_TYPE_MAP[docType] ?? docType;

  // Confidence based on how much structured data we extracted
  let confidence = 0.5;
  if (structured.documentType) confidence += 0.15;
  if (structured.caseNumber) confidence += 0.1;
  if (structured.jurisdiction) confidence += 0.1;
  if (structured.issuingAuthority) confidence += 0.05;
  if (structured.parties.length > 0) confidence += 0.05;
  if (structured.documentDate) confidence += 0.05;

  return {
    documentType: archivistDocType,
    category,
    jurisdiction,
    confidence: Math.min(confidence, 0.98),
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// Document Vision Engine
// ═══════════════════════════════════════════════════════════════════════════

export class DocumentVisionEngine {
  private db: D1Database;

  constructor(env: Env) {
    this.db = env.DB;
  }

  async ensureTables(): Promise<void> {
    await this.db.prepare(`CREATE TABLE IF NOT EXISTS document_vision (
      id TEXT PRIMARY KEY,
      source_filename TEXT,
      mime_type TEXT NOT NULL,
      image_size_bytes INTEGER NOT NULL DEFAULT 0,
      page_number INTEGER DEFAULT 1,
      batch_id TEXT,
      extracted_text TEXT,
      extraction_confidence REAL DEFAULT 0,
      extraction_model TEXT,
      extraction_duration_ms INTEGER DEFAULT 0,
      document_type TEXT,
      document_date TEXT,
      case_number TEXT,
      jurisdiction TEXT,
      issuing_authority TEXT,
      parties TEXT DEFAULT '[]',
      category TEXT,
      structured_data TEXT DEFAULT '{}',
      archivist_doc_type TEXT,
      archivist_confidence REAL DEFAULT 0,
      feed_document_id TEXT,
      feed_status TEXT DEFAULT 'pending',
      kv_key TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      error_message TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      completed_at TEXT
    )`).run();
  }

  /**
   * Full pipeline: extract → structure → classify → store in KV → feed into document pipeline.
   */
  async processDocument(
    imageBuffer: ArrayBuffer,
    mimeType: string,
    env: Env,
    options?: {
      filename?: string;
      pageNumber?: number;
      batchId?: string;
      autoFeed?: boolean;
    },
  ): Promise<VisionProcessResult> {
    const id = generateId("vis");
    const kvKey = `VISION:${id}`;
    const now = new Date().toISOString();
    const autoFeed = options?.autoFeed ?? true;

    // Insert pending record
    await this.db.prepare(`
      INSERT INTO document_vision
        (id, source_filename, mime_type, image_size_bytes, page_number, batch_id, kv_key, status, created_at)
      VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, 'pending', ?8)
    `).bind(
      id, options?.filename ?? null, mimeType, imageBuffer.byteLength,
      options?.pageNumber ?? 1, options?.batchId ?? null, kvKey, now,
    ).run();

    try {
      // Step 1: Extract text
      await this.db.prepare("UPDATE document_vision SET status = 'extracting' WHERE id = ?1").bind(id).run();

      const extraction = await extractTextFromImage(imageBuffer, mimeType, env);

      await this.db.prepare(`
        UPDATE document_vision
        SET extracted_text = ?2, extraction_confidence = ?3, extraction_model = ?4,
            extraction_duration_ms = ?5, status = 'extracted'
        WHERE id = ?1
      `).bind(id, extraction.text, extraction.confidence, extraction.model, extraction.durationMs).run();

      // Step 2: Extract structured data
      const structured = extractStructuredData(extraction.text);

      await this.db.prepare(`
        UPDATE document_vision
        SET document_type = ?2, document_date = ?3, case_number = ?4,
            jurisdiction = ?5, issuing_authority = ?6, parties = ?7,
            category = ?8, structured_data = ?9, status = 'structured'
        WHERE id = ?1
      `).bind(
        id, structured.documentType, structured.documentDate, structured.caseNumber,
        structured.jurisdiction, structured.issuingAuthority,
        JSON.stringify(structured.parties), structured.category,
        JSON.stringify(structured.fields),
      ).run();

      // Step 3: Classify via ARCHIVIST-0 types
      const classification = classifyDocument(structured);

      await this.db.prepare(`
        UPDATE document_vision
        SET archivist_doc_type = ?2, archivist_confidence = ?3, status = 'classified'
        WHERE id = ?1
      `).bind(id, classification.documentType, classification.confidence).run();

      // Step 4: Store full result in KV
      const fullResult: VisionProcessResult = {
        id, extraction, structured, classification,
        feedDocumentId: null, kvKey, status: "complete",
      };

      await safeKvPut(env.KNOWLEDGE_STORE, kvKey, JSON.stringify(fullResult));

      // Step 5: Auto-feed into document pipeline
      let feedDocumentId: string | null = null;

      if (autoFeed && extraction.text.length > 0) {
        try {
          const feedInput: FeedDocumentInput = {
            source: "manual",
            sourceId: id,
            title: structured.title ?? options?.filename ?? `Scanned document ${id}`,
            text: extraction.text,
            documentType: classification.documentType,
            jurisdiction: classification.jurisdiction,
            category: classification.category,
            metadata: {
              visionId: id,
              extractionConfidence: extraction.confidence,
              archivistConfidence: classification.confidence,
              extractionModel: extraction.model,
              caseNumber: structured.caseNumber,
              documentDate: structured.documentDate,
              issuingAuthority: structured.issuingAuthority,
              parties: structured.parties,
              filename: options?.filename,
              pageNumber: options?.pageNumber,
              batchId: options?.batchId,
            },
          };

          const feedEngine = new DocumentFeedEngine(env);
          await feedEngine.ensureTables();
          const feedResult = await feedEngine.processDocument(feedInput, env);
          feedDocumentId = feedResult.document.id;
          fullResult.feedDocumentId = feedDocumentId;

          await this.db.prepare(`
            UPDATE document_vision SET feed_document_id = ?2, feed_status = 'fed' WHERE id = ?1
          `).bind(id, feedDocumentId).run();
        } catch (e: unknown) {
          await this.db.prepare(`
            UPDATE document_vision SET feed_status = 'failed' WHERE id = ?1
          `).bind(id).run();
        }
      }

      // Mark complete
      await this.db.prepare(`
        UPDATE document_vision SET status = 'complete', completed_at = ?2 WHERE id = ?1
      `).bind(id, new Date().toISOString()).run();

      // Update KV with final result
      fullResult.feedDocumentId = feedDocumentId;
      await safeKvPut(env.KNOWLEDGE_STORE, kvKey, JSON.stringify(fullResult));

      return fullResult;

    } catch (e: unknown) {
      const errorMsg = e instanceof Error ? e.message : String(e);
      await this.db.prepare(`
        UPDATE document_vision SET status = 'failed', error_message = ?2 WHERE id = ?1
      `).bind(id, errorMsg).run();

      return {
        id,
        extraction: { text: "", confidence: 0, model: "none", durationMs: 0 },
        structured: {
          documentType: null, documentDate: null, caseNumber: null,
          jurisdiction: null, issuingAuthority: null, parties: [],
          category: null, title: null, pageCount: 1, fields: {},
        },
        classification: { documentType: "unclassified", category: "*", jurisdiction: "*", confidence: 0 },
        feedDocumentId: null, kvKey, status: "failed",
      };
    }
  }

  /**
   * Process multiple pages as a batch (e.g., multi-page scan).
   * Groups results under a single batch ID.
   */
  async processBatch(
    pages: Array<{ buffer: ArrayBuffer; mimeType: string; filename?: string }>,
    env: Env,
    options?: { autoFeed?: boolean },
  ): Promise<{
    batchId: string;
    results: VisionProcessResult[];
    combinedText: string;
    pageCount: number;
  }> {
    const batchId = generateId("vbat");
    const results: VisionProcessResult[] = [];
    const textParts: string[] = [];

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i]!;
      const result = await this.processDocument(page.buffer, page.mimeType, env, {
        filename: page.filename,
        pageNumber: i + 1,
        batchId,
        autoFeed: false, // Don't feed individual pages
      });
      results.push(result);
      if (result.extraction.text) {
        textParts.push(`--- Page ${i + 1} ---\n${result.extraction.text}`);
      }
    }

    const combinedText = textParts.join("\n\n");

    // Feed the combined document if autoFeed
    if ((options?.autoFeed ?? true) && combinedText.length > 0) {
      // Use the first page's classification for the combined document
      const firstClassification = results[0]?.classification;
      const firstStructured = results[0]?.structured;

      const feedInput: FeedDocumentInput = {
        source: "batch",
        sourceId: batchId,
        title: firstStructured?.title ?? `Multi-page scan (${pages.length} pages)`,
        text: combinedText,
        documentType: firstClassification?.documentType,
        jurisdiction: firstClassification?.jurisdiction,
        category: firstClassification?.category,
        metadata: {
          batchId,
          pageCount: pages.length,
          pages: results.map(r => ({
            visionId: r.id,
            confidence: r.extraction.confidence,
            documentType: r.classification.documentType,
          })),
        },
      };

      try {
        const feedEngine = new DocumentFeedEngine(env);
        await feedEngine.ensureTables();
        await feedEngine.processDocument(feedInput, env);
      } catch {
        // Non-blocking — batch still succeeds even if feed fails
      }
    }

    return { batchId, results, combinedText, pageCount: pages.length };
  }

  /**
   * Get processing stats.
   */
  async getStats(): Promise<VisionStats> {
    const [totalRow, statusRows, typeRows, modelRows, avgRow, fedRow, lastRow] = await Promise.all([
      this.db.prepare("SELECT COUNT(*) as cnt FROM document_vision").first<{ cnt: number }>(),
      this.db.prepare("SELECT status, COUNT(*) as cnt FROM document_vision GROUP BY status").all(),
      this.db.prepare("SELECT archivist_doc_type, COUNT(*) as cnt FROM document_vision WHERE archivist_doc_type IS NOT NULL GROUP BY archivist_doc_type ORDER BY cnt DESC LIMIT 20").all(),
      this.db.prepare("SELECT extraction_model, COUNT(*) as cnt FROM document_vision WHERE extraction_model IS NOT NULL GROUP BY extraction_model ORDER BY cnt DESC").all(),
      this.db.prepare("SELECT AVG(extraction_confidence) as avg_conf, AVG(extraction_duration_ms) as avg_dur FROM document_vision WHERE status = 'complete'").first<{ avg_conf: number; avg_dur: number }>(),
      this.db.prepare("SELECT COUNT(*) as cnt FROM document_vision WHERE feed_status = 'fed'").first<{ cnt: number }>(),
      this.db.prepare("SELECT MAX(created_at) as last_at FROM document_vision").first<{ last_at: string }>(),
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
      byStatus: toRecord(statusRows.results ?? []),
      byDocumentType: toRecord(typeRows.results ?? []),
      byModel: toRecord(modelRows.results ?? []),
      avgConfidence: Math.round((avgRow?.avg_conf ?? 0) * 1000) / 1000,
      avgDurationMs: Math.round(avgRow?.avg_dur ?? 0),
      totalFed: fedRow?.cnt ?? 0,
      lastProcessedAt: lastRow?.last_at ?? null,
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Utility — Base64 encoding for Workers (no Buffer available)
// ═══════════════════════════════════════════════════════════════════════════

function uint8ArrayToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return btoa(binary);
}

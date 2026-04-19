/**
 * Document Vision API Routes
 *
 * Endpoints for processing scanned document images through the vision
 * pipeline: extract text → parse structured data → classify → feed into
 * audit pipeline.
 *
 * Accepts both multipart/form-data (file upload) and JSON (base64-encoded).
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { rateLimit } from "./middleware/rate-limit.js";
import { DocumentVisionEngine, extractTextFromImage, extractStructuredData, classifyDocument } from "../services/document-vision.js";

type RouteParams = Record<string, string>;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

const ALLOWED_MIME_TYPES = new Set([
  "image/png", "image/jpeg", "image/jpg", "image/tiff",
  "image/webp", "image/bmp", "application/pdf",
]);

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB

/**
 * Parse the request body to get image data.
 * Supports multipart/form-data and JSON with base64.
 */
async function parseImageInput(request: Request): Promise<{
  buffer: ArrayBuffer;
  mimeType: string;
  filename?: string;
} | null> {
  const contentType = request.headers.get("Content-Type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const file = formData.get("file") ?? formData.get("image") ?? formData.get("document");

    if (!file || typeof file === "string") return null;

    const blob = file as File;
    return {
      buffer: await blob.arrayBuffer(),
      mimeType: blob.type || "image/png",
      filename: blob.name,
    };
  }

  if (contentType.includes("application/json")) {
    const body = await request.json() as {
      image?: string;      // base64-encoded image data
      mimeType?: string;
      filename?: string;
    };

    if (!body.image) return null;

    const binary = atob(body.image);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    return {
      buffer: bytes.buffer as ArrayBuffer,
      mimeType: body.mimeType ?? "image/png",
      filename: body.filename,
    };
  }

  // Raw binary body
  if (ALLOWED_MIME_TYPES.has(contentType)) {
    return {
      buffer: await request.arrayBuffer(),
      mimeType: contentType,
    };
  }

  return null;
}

/**
 * Parse batch input (JSON with multiple base64 images or multipart).
 */
async function parseBatchInput(request: Request): Promise<Array<{
  buffer: ArrayBuffer;
  mimeType: string;
  filename?: string;
}>> {
  const contentType = request.headers.get("Content-Type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const results: Array<{ buffer: ArrayBuffer; mimeType: string; filename?: string }> = [];

    for (const [key, value] of formData.entries()) {
      if (typeof value !== "string" && (key.startsWith("file") || key.startsWith("page") || key.startsWith("image"))) {
        const blob = value as File;
        results.push({
          buffer: await blob.arrayBuffer(),
          mimeType: blob.type || "image/png",
          filename: blob.name,
        });
      }
    }

    return results;
  }

  if (contentType.includes("application/json")) {
    const body = await request.json() as {
      pages: Array<{
        image: string;
        mimeType?: string;
        filename?: string;
      }>;
    };

    if (!Array.isArray(body.pages)) return [];

    return body.pages.map(page => {
      const binary = atob(page.image);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return {
        buffer: bytes.buffer as ArrayBuffer,
        mimeType: page.mimeType ?? "image/png",
        filename: page.filename,
      };
    });
  }

  return [];
}

// ═══════════════════════════════════════════════════════════════════════════
// POST /api/vision/extract — Upload image, get extracted text back
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Upload a scanned document image and get the extracted text.
 * Does not feed into the audit pipeline — just extraction.
 *
 * Accepts: multipart/form-data (field: file/image/document)
 *          or JSON: { image: "<base64>", mimeType: "image/png" }
 */
export async function handleVisionExtract(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const input = await parseImageInput(request);
  if (!input) {
    return json({
      error: "No image provided. Send multipart/form-data with a 'file' field, or JSON with { image: '<base64>' }",
    }, 400);
  }

  if (!ALLOWED_MIME_TYPES.has(input.mimeType)) {
    return json({ error: `Unsupported mime type: ${input.mimeType}. Supported: PNG, JPG, TIFF, WebP, BMP, PDF` }, 400);
  }

  if (input.buffer.byteLength > MAX_IMAGE_SIZE) {
    return json({ error: `Image too large: ${(input.buffer.byteLength / 1024 / 1024).toFixed(1)}MB. Maximum: 10MB` }, 413);
  }

  const extraction = await extractTextFromImage(input.buffer, input.mimeType, env);
  const structured = extractStructuredData(extraction.text);

  return json({
    text: extraction.text,
    confidence: extraction.confidence,
    model: extraction.model,
    durationMs: extraction.durationMs,
    structured,
    filename: input.filename,
    imageSizeBytes: input.buffer.byteLength,
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// POST /api/vision/process — Upload image, full pipeline + auto-feed
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Upload a scanned document and run the full pipeline:
 * Extract → Structure → Classify → Store in KV → Feed into document pipeline.
 *
 * Accepts: multipart/form-data or JSON with base64.
 * Query params: autoFeed=false to skip feeding into audit pipeline.
 */
export async function handleVisionProcess(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const input = await parseImageInput(request);
  if (!input) {
    return json({
      error: "No image provided. Send multipart/form-data with a 'file' field, or JSON with { image: '<base64>' }",
    }, 400);
  }

  if (!ALLOWED_MIME_TYPES.has(input.mimeType)) {
    return json({ error: `Unsupported mime type: ${input.mimeType}` }, 400);
  }

  if (input.buffer.byteLength > MAX_IMAGE_SIZE) {
    return json({ error: `Image too large: ${(input.buffer.byteLength / 1024 / 1024).toFixed(1)}MB. Maximum: 10MB` }, 413);
  }

  const url = new URL(request.url);
  const autoFeed = url.searchParams.get("autoFeed") !== "false";

  const engine = new DocumentVisionEngine(env);
  await engine.ensureTables();

  const result = await engine.processDocument(input.buffer, input.mimeType, env, {
    filename: input.filename,
    autoFeed,
  });

  return json(result, result.status === "complete" ? 201 : 500);
}

// ═══════════════════════════════════════════════════════════════════════════
// POST /api/vision/batch — Multiple images (multi-page scan)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Upload multiple pages (e.g., from a multi-page scan).
 * Pages are processed sequentially and combined into a single document
 * for the feed pipeline.
 *
 * Accepts: multipart/form-data (fields: file0, file1, ... or page0, page1, ...)
 *          or JSON: { pages: [{ image: "<base64>", mimeType: "image/png" }, ...] }
 * Query params: autoFeed=false to skip feeding.
 */
export async function handleVisionBatch(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const pages = await parseBatchInput(request);

  if (pages.length === 0) {
    return json({
      error: "No pages provided. Send multipart/form-data with file0/file1/... or JSON with { pages: [...] }",
    }, 400);
  }

  if (pages.length > 100) {
    return json({ error: "Maximum 100 pages per batch" }, 400);
  }

  // Validate each page
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]!;
    if (!ALLOWED_MIME_TYPES.has(page.mimeType)) {
      return json({ error: `Page ${i + 1}: unsupported mime type ${page.mimeType}` }, 400);
    }
    if (page.buffer.byteLength > MAX_IMAGE_SIZE) {
      return json({ error: `Page ${i + 1}: image too large (${(page.buffer.byteLength / 1024 / 1024).toFixed(1)}MB)` }, 413);
    }
  }

  const url = new URL(request.url);
  const autoFeed = url.searchParams.get("autoFeed") !== "false";

  const engine = new DocumentVisionEngine(env);
  await engine.ensureTables();

  const result = await engine.processBatch(pages, env, { autoFeed });

  return json({
    batchId: result.batchId,
    pageCount: result.pageCount,
    results: result.results,
    combinedTextLength: result.combinedText.length,
  }, 201);
}

// ═══════════════════════════════════════════════════════════════════════════
// GET /api/vision/stats — Processing stats
// ═══════════════════════════════════════════════════════════════════════════

export async function handleVisionStats(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = authenticate(request, env);
  if (authErr) return authErr;

  const engine = new DocumentVisionEngine(env);
  await engine.ensureTables();

  const stats = await engine.getStats();

  return json(stats);
}

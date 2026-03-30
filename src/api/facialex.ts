/**
 * FACIALEX API Route Handlers
 *
 * Founder-only forensic facial examination & photo comparison endpoints.
 * ALL routes require Bearer token authentication — this is forensic evidence data.
 */

import type { Env } from "../index.js";
import { Facialex } from "../personas/facialex/index.js";
import { authenticate } from "./middleware/auth.js";

type RouteParams = Record<string, string>;

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// ---------------------------------------------------------------------------
// Singleton
// ---------------------------------------------------------------------------

let facialexInstance: Facialex | null = null;
let facialexInitialized = false;

async function getFacialexInstance(env: Env): Promise<Facialex> {
  if (!facialexInstance) {
    facialexInstance = new Facialex();
  }
  if (!facialexInitialized) {
    await facialexInstance.initialize(env);
    facialexInitialized = true;
  }
  return facialexInstance;
}

/**
 * Guard: every FACIALEX endpoint requires API key auth.
 */
function requireAuth(request: Request, env: Env): Response | null {
  return authenticate(request, env);
}

// =============================================================================
// GET /api/facialex/status — operational status & methodology declaration
// =============================================================================

export async function handleFacialexStatus(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const facialex = await getFacialexInstance(env);
    const status = await facialex.getStatus(env);

    return jsonResponse({
      ...status,
      domain: "Forensic Facial Examination & Photo Comparison",
      workers: ["EXAM-1", "CHAIN-1"],
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to get FACIALEX status";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /api/facialex/methodology — full methodology declaration
// =============================================================================

export async function handleFacialexMethodology(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  return jsonResponse({
    citizen: "FACIALEX",
    methodology: {
      standards: [
        {
          body: "FISWG",
          name: "Facial Identification Scientific Working Group",
          scope: "Comparison methodology, training qualifications, reporting, quality assurance",
        },
        {
          body: "SWGIT",
          name: "Scientific Working Group on Imaging Technology",
          scope: "Image capture, processing, integrity, metadata preservation",
        },
        {
          body: "OSAC/NIST",
          name: "Organization of Scientific Area Committees",
          scope: "Nationally recognized consensus standards for facial identification",
        },
        {
          body: "IAI",
          name: "International Association for Identification",
          scope: "Practitioner certification and professional ethics",
        },
      ],
      phases: [
        "1. Image Intake & Chain of Custody (SWGIT)",
        "2. Image Quality Assessment (SWGIT)",
        "3. Image Preparation (SWGIT)",
        "4. Independent Morphological Feature Analysis (FISWG)",
        "5. Feature Comparison (FISWG)",
        "6. Standardized Conclusion (FISWG/OSAC)",
        "7. Report Generation",
        "8. Quality Assurance",
      ],
      conclusionScale: [
        { level: "Identification", description: "Features consistent — same individual (strongest positive)" },
        { level: "Strong Support for Identification", description: "High similarity; minor limitations" },
        { level: "Moderate Support for Identification", description: "Notable similarities; significant limitations" },
        { level: "Inconclusive", description: "Neither identification nor exclusion supported" },
        { level: "Moderate Support for Exclusion", description: "Notable differences; limitations prevent definitive exclusion" },
        { level: "Strong Support for Exclusion", description: "High dissimilarity; minor limitations" },
        { level: "Exclusion", description: "Features inconsistent — not same individual (strongest negative)" },
      ],
      admissibility: {
        daubert: {
          testable: "Standardized feature analysis is reproducible",
          peerReviewed: "FISWG/OSAC standards are published and peer-reviewed",
          knownErrorRate: "Limitations and confidence levels disclosed",
          generalAcceptance: "Methodology used by FBI, law enforcement, forensic labs worldwide",
        },
        frye: "Generally accepted in the relevant scientific community",
      },
      featureRegions: [
        "Face shape", "Forehead", "Eyebrows", "Eyes", "Nose",
        "Mouth", "Ears", "Chin", "Skin", "Facial hair",
      ],
      qualityScale: ["Good", "Moderate", "Poor", "Unsuitable"],
      prohibitedActions: [
        "AI-generated enhancement or super-resolution",
        "Compositing or combining image elements",
        "Color manipulation beyond basic correction",
        "Filters that alter facial geometry or proportions",
      ],
    },
    generatedAt: new Date().toISOString(),
  });
}

// =============================================================================
// GET /api/facialex/knowledge — query knowledge store
// =============================================================================

export async function handleFacialexKnowledge(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const authError = requireAuth(request, env);
  if (authError) return authError;

  try {
    const facialex = await getFacialexInstance(env);
    const url = new URL(request.url);
    const query = url.searchParams.get("q") ?? "";
    const results = await facialex.queryKnowledge(query, env);

    return jsonResponse(results);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to query FACIALEX knowledge";
    return jsonResponse({ error: message }, 500);
  }
}

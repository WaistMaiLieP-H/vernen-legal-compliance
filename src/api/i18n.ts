/**
 * VERNEN™ i18n API Endpoints
 * Serves 13-language UI string bundles for the Guided Document Navigator
 * and all platform UI components.
 *
 * © 2024-2026 Michael Vernen Thomas Hartmann. All Rights Reserved.
 */

import type { Env } from "../index.js";
import {
  I18N_BUNDLES,
  LANGUAGE_META,
  SUPPORTED_LANGUAGES,
  isSupported,
} from "../data/i18n.js";

type RouteParams = Record<string, string>;

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * GET /api/i18n/languages
 * Returns all supported languages with metadata.
 */
export async function handleI18nLanguages(
  _request: Request,
  _env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  return jsonResponse({
    total: SUPPORTED_LANGUAGES.length,
    languages: SUPPORTED_LANGUAGES.map((code) => ({
      code,
      ...LANGUAGE_META[code],
    })),
  });
}

/**
 * GET /api/i18n/:lang
 * Returns the full UI string bundle for a specific language.
 * Falls back to English if the language is not supported.
 */
export async function handleI18nBundle(
  _request: Request,
  _env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const requestedLang = (params["lang"] || "en").toLowerCase().slice(0, 2);
  const lang = isSupported(requestedLang) ? requestedLang : "en";
  const bundle = I18N_BUNDLES[lang] || I18N_BUNDLES["en"];

  return new Response(JSON.stringify(bundle), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, s-maxage=7200",
    },
  });
}

/**
 * GET /api/i18n/:lang/:section
 * Returns a specific section of the UI string bundle (e.g., "gdn", "validation", "filing").
 */
export async function handleI18nSection(
  _request: Request,
  _env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const requestedLang = (params["lang"] || "en").toLowerCase().slice(0, 2);
  const lang = isSupported(requestedLang) ? requestedLang : "en";
  const section = params["section"] || "";

  const bundle = (I18N_BUNDLES[lang] || I18N_BUNDLES["en"]) as Record<string, unknown>;

  if (!section) {
    const available = Object.keys(bundle).filter((k) => !k.startsWith("__"));
    return jsonResponse(
      { error: "Section parameter required", available },
      400
    );
  }

  // Return the section if it exists, or an empty object for unknown sections
  // This prevents 404s for sections like "common" that clients may request
  if (!(section in bundle)) {
    return new Response(JSON.stringify({}), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600, s-maxage=7200",
      },
    });
  }

  return new Response(JSON.stringify(bundle[section]), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, s-maxage=7200",
    },
  });
}

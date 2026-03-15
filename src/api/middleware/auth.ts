import type { Env } from "../../index.js";
import { API_KEY_HEADER, API_KEY_PREFIX } from "../../utils/constants.js";

/**
 * Simple API key authentication middleware.
 * Checks the Authorization header for a valid Bearer token.
 * Returns a Response if authentication fails, or null if it succeeds.
 */
export function authenticate(request: Request, env: Env): Response | null {
  const authHeader = request.headers.get(API_KEY_HEADER);

  if (!authHeader) {
    return new Response(
      JSON.stringify({ error: "Missing Authorization header" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  if (!authHeader.startsWith(API_KEY_PREFIX)) {
    return new Response(
      JSON.stringify({ error: "Authorization header must use Bearer scheme" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const token = authHeader.slice(API_KEY_PREFIX.length);

  if (!env.API_KEY || token !== env.API_KEY) {
    return new Response(
      JSON.stringify({ error: "Invalid API key" }),
      {
        status: 403,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return null;
}

import { safeKvPut } from "../../utils/helpers.js";
import type { Env } from "../../index.js";
import {
  RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_MAX_REQUESTS,
} from "../../utils/constants.js";

interface RateLimitEntry {
  count: number;
  windowStart: number;
}

/**
 * Basic sliding window rate limiter backed by KV.
 * Returns a Response if the rate limit is exceeded, or null if the request is allowed.
 */
export async function rateLimit(
  request: Request,
  env: Env
): Promise<Response | null> {
  const clientIp =
    request.headers.get("CF-Connecting-IP") ??
    request.headers.get("X-Forwarded-For") ??
    "unknown";

  const key = `ratelimit:${clientIp}`;
  const now = Date.now();

  let entry = await env.KNOWLEDGE_STORE.get<RateLimitEntry>(key, "json");

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    // Start a new window
    entry = { count: 1, windowStart: now };
  } else {
    entry.count += 1;
  }

  // Persist the updated count with a TTL matching the window
  const ttlSeconds = Math.ceil(RATE_LIMIT_WINDOW_MS / 1000);
  await safeKvPut(env.KNOWLEDGE_STORE, key, JSON.stringify(entry), {
    expirationTtl: ttlSeconds,
  });

  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    const retryAfter = Math.ceil(
      (entry.windowStart + RATE_LIMIT_WINDOW_MS - now) / 1000
    );

    return new Response(
      JSON.stringify({
        error: "Rate limit exceeded",
        retryAfterSeconds: retryAfter,
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(retryAfter),
          "X-RateLimit-Limit": String(RATE_LIMIT_MAX_REQUESTS),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  return null;
}

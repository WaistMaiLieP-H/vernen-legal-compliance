import { describe, it, expect } from "vitest";
import { rateLimit } from "../src/api/middleware/rate-limit.js";
import type { Env } from "../src/index.js";

/**
 * Mock KV namespace for testing rate limiting.
 */
function createMockKV() {
  const store = new Map<string, string>();
  return {
    get: async <T = string>(key: string, type?: string): Promise<T | null> => {
      const val = store.get(key);
      if (val === undefined) return null;
      if (type === "json") return JSON.parse(val) as T;
      return val as unknown as T;
    },
    put: async (key: string, value: string, _opts?: unknown): Promise<void> => {
      store.set(key, value);
    },
    delete: async (key: string): Promise<void> => {
      store.delete(key);
    },
    list: async () => ({ keys: [], list_complete: true, cursor: "" }),
  };
}

function createMockEnv(): Env {
  return {
    DB: {} as Env["DB"],
    KNOWLEDGE_STORE: createMockKV() as unknown as Env["KNOWLEDGE_STORE"],
    API_KEY: "test-key",
  };
}

function makeRequest(ip = "1.2.3.4"): Request {
  return new Request("http://localhost/api/test", {
    headers: { "CF-Connecting-IP": ip },
  });
}

describe("rateLimit", () => {
  it("should allow the first request", async () => {
    const env = createMockEnv();
    const result = await rateLimit(makeRequest(), env);
    expect(result).toBeNull();
  });

  it("should allow requests under the limit", async () => {
    const env = createMockEnv();
    for (let i = 0; i < 10; i++) {
      const result = await rateLimit(makeRequest(), env);
      expect(result).toBeNull();
    }
  });

  it("should block requests over the limit (100)", async () => {
    const env = createMockEnv();
    // Send 100 requests (should all pass)
    for (let i = 0; i < 100; i++) {
      await rateLimit(makeRequest(), env);
    }
    // 101st request should be blocked
    const result = await rateLimit(makeRequest(), env);
    expect(result).not.toBeNull();
    expect(result!.status).toBe(429);
  });

  it("should return Retry-After header when rate limited", async () => {
    const env = createMockEnv();
    for (let i = 0; i < 101; i++) {
      await rateLimit(makeRequest(), env);
    }
    const result = await rateLimit(makeRequest(), env);
    expect(result).not.toBeNull();
    expect(result!.headers.get("Retry-After")).toBeTruthy();
  });

  it("should track different IPs independently", async () => {
    const env = createMockEnv();
    // Max out IP 1
    for (let i = 0; i < 101; i++) {
      await rateLimit(makeRequest("10.0.0.1"), env);
    }
    // IP 2 should still be allowed
    const result = await rateLimit(makeRequest("10.0.0.2"), env);
    expect(result).toBeNull();
  });

  it("should use X-Forwarded-For when CF-Connecting-IP is absent", async () => {
    const env = createMockEnv();
    const request = new Request("http://localhost/api/test", {
      headers: { "X-Forwarded-For": "5.6.7.8" },
    });
    const result = await rateLimit(request, env);
    expect(result).toBeNull();
  });

  it("should return JSON error body when rate limited", async () => {
    const env = createMockEnv();
    for (let i = 0; i < 101; i++) {
      await rateLimit(makeRequest(), env);
    }
    const result = await rateLimit(makeRequest(), env);
    expect(result).not.toBeNull();
    const body = (await result!.json()) as { error: string; retryAfterSeconds: number };
    expect(body.error).toContain("Rate limit exceeded");
    expect(body.retryAfterSeconds).toBeGreaterThan(0);
  });
});

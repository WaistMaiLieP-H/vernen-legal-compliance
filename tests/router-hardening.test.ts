import { describe, it, expect } from "vitest";
import { handleRequest } from "../src/router.js";

// Minimal mock env — most routes need DB/KV but our tests hit routes that don't
function makeEnv(overrides: Record<string, unknown> = {}) {
  return {
    API_KEY: "test-key",
    DB: {} as D1Database,
    KNOWLEDGE_STORE: {} as KVNamespace,
    ...overrides,
  };
}

function makeCtx(): ExecutionContext {
  return { waitUntil: () => {}, passThroughOnException: () => {} } as unknown as ExecutionContext;
}

function req(path: string, opts?: RequestInit & { origin?: string }): Request {
  const headers = new Headers(opts?.headers);
  if (opts?.origin) headers.set("Origin", opts.origin);
  return new Request(`https://compliance.vernenlegal.com${path}`, {
    ...opts,
    headers,
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// Input validation
// ═══════════════════════════════════════════════════════════════════════════

describe("input validation", () => {
  it("rejects paths longer than 2048 characters", async () => {
    const longPath = "/" + "a".repeat(2100);
    const res = await handleRequest(req(longPath), makeEnv(), makeCtx());
    expect(res.status).toBe(414);
    const body = await res.json() as { error: string };
    expect(body.error).toContain("URI too long");
  });

  it("rejects POST bodies larger than 1 MB via Content-Length", async () => {
    const res = await handleRequest(
      req("/api/regulis/check", {
        method: "POST",
        headers: { "Content-Length": "2000000", "Content-Type": "application/json" },
        body: "{}",
      }),
      makeEnv(),
      makeCtx()
    );
    expect(res.status).toBe(413);
    const body = await res.json() as { error: string };
    expect(body.error).toContain("too large");
  });

  it("allows POST with small Content-Length (does not return 413)", async () => {
    // Hit a route that doesn't need DB/KV — OPTIONS preflight proves the size guard passed
    const res = await handleRequest(
      req("/api/health", {
        method: "POST",
        headers: { "Content-Length": "100", "Content-Type": "application/json" },
        body: "{}",
      }),
      makeEnv(),
      makeCtx()
    );
    // POST /api/health is not a registered route so it 404s — but NOT 413
    expect(res.status).not.toBe(413);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// CORS
// ═══════════════════════════════════════════════════════════════════════════

describe("CORS", () => {
  it("reflects allowed origin in CORS header", async () => {
    const res = await handleRequest(
      req("/robots.txt", { origin: "https://compliance.vernenlegal.com" }),
      makeEnv(),
      makeCtx()
    );
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe("https://compliance.vernenlegal.com");
  });

  it("defaults to compliance.vernenlegal.com for unknown origins", async () => {
    const res = await handleRequest(
      req("/robots.txt", { origin: "https://evil.com" }),
      makeEnv(),
      makeCtx()
    );
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe("https://compliance.vernenlegal.com");
  });

  it("allows localhost:8787 for development", async () => {
    const res = await handleRequest(
      req("/robots.txt", { origin: "http://localhost:8787" }),
      makeEnv(),
      makeCtx()
    );
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe("http://localhost:8787");
  });

  it("includes Vary: Origin header", async () => {
    const res = await handleRequest(req("/robots.txt"), makeEnv(), makeCtx());
    expect(res.headers.get("Vary")).toBe("Origin");
  });

  it("responds to OPTIONS with 204", async () => {
    const res = await handleRequest(
      req("/api/health", { method: "OPTIONS" }),
      makeEnv(),
      makeCtx()
    );
    expect(res.status).toBe(204);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Security headers
// ═══════════════════════════════════════════════════════════════════════════

describe("security headers", () => {
  it("includes HSTS on all responses", async () => {
    const res = await handleRequest(req("/robots.txt"), makeEnv(), makeCtx());
    const hsts = res.headers.get("Strict-Transport-Security");
    expect(hsts).toContain("max-age=63072000");
    expect(hsts).toContain("includeSubDomains");
  });

  it("includes X-Frame-Options DENY", async () => {
    const res = await handleRequest(req("/robots.txt"), makeEnv(), makeCtx());
    expect(res.headers.get("X-Frame-Options")).toBe("DENY");
  });

  it("includes X-Content-Type-Options nosniff", async () => {
    const res = await handleRequest(req("/robots.txt"), makeEnv(), makeCtx());
    expect(res.headers.get("X-Content-Type-Options")).toBe("nosniff");
  });

  it("includes CSP on HTML responses (landing page)", async () => {
    const res = await handleRequest(req("/"), makeEnv(), makeCtx());
    const csp = res.headers.get("Content-Security-Policy");
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("js.stripe.com");
    expect(csp).toContain("fonts.googleapis.com");
  });

  it("does not include CSP on non-HTML responses", async () => {
    const res = await handleRequest(req("/robots.txt"), makeEnv(), makeCtx());
    expect(res.headers.get("Content-Security-Policy")).toBeNull();
  });

  it("includes Permissions-Policy", async () => {
    const res = await handleRequest(req("/robots.txt"), makeEnv(), makeCtx());
    expect(res.headers.get("Permissions-Policy")).toContain("camera=()");
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Rate-limit headers on landing
// ═══════════════════════════════════════════════════════════════════════════

describe("landing page rate-limit headers", () => {
  it("includes X-RateLimit-Limit on landing page", async () => {
    const res = await handleRequest(req("/"), makeEnv(), makeCtx());
    expect(res.headers.get("X-RateLimit-Limit")).toBe("60");
    expect(res.headers.get("X-RateLimit-Window")).toBe("60");
  });

  it("does not include rate-limit headers on other pages", async () => {
    const res = await handleRequest(req("/robots.txt"), makeEnv(), makeCtx());
    expect(res.headers.get("X-RateLimit-Limit")).toBeNull();
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// SEO routes
// ═══════════════════════════════════════════════════════════════════════════

describe("SEO routes", () => {
  it("serves robots.txt with correct content", async () => {
    const res = await handleRequest(req("/robots.txt"), makeEnv(), makeCtx());
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toContain("User-agent: *");
    expect(text).toContain("Disallow: /api/");
    expect(text).toContain("Sitemap:");
  });

  it("serves sitemap.xml with FAQ and pricing", async () => {
    const res = await handleRequest(req("/sitemap.xml"), makeEnv(), makeCtx());
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toContain("compliance.vernenlegal.com/");
    expect(text).toContain("#faq");
    expect(text).toContain("#pricing");
    expect(text).toContain("legal/terms");
    expect(text).toContain("legal/privacy");
  });

  it("serves security.txt at /.well-known/security.txt", async () => {
    const res = await handleRequest(req("/.well-known/security.txt"), makeEnv(), makeCtx());
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toContain("Contact:");
    expect(text).toContain("Preferred-Languages: en");
  });

  it("redirects /health to /api/health", async () => {
    const res = await handleRequest(req("/health"), makeEnv(), makeCtx());
    expect(res.status).toBe(301);
    expect(res.headers.get("Location")).toBe("/api/health");
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Cache-Control on API responses
// ═══════════════════════════════════════════════════════════════════════════

describe("cache-control", () => {
  it("sets short TTL on volatile API endpoints", async () => {
    const res = await handleRequest(req("/api/health"), makeEnv(), makeCtx());
    expect(res.headers.get("Cache-Control")).toContain("max-age=10");
  });

  it("landing page already has Cache-Control (not overwritten)", async () => {
    const res = await handleRequest(req("/"), makeEnv(), makeCtx());
    const cc = res.headers.get("Cache-Control");
    expect(cc).toBeTruthy();
    // Landing page sets its own max-age=300
    expect(cc).toContain("max-age=");
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Landing page content
// ═══════════════════════════════════════════════════════════════════════════

describe("landing page content", () => {
  it("returns 200 with HTML", async () => {
    const res = await handleRequest(req("/"), makeEnv(), makeCtx());
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toContain("text/html");
  });

  it("includes FAQPage structured data", async () => {
    const res = await handleRequest(req("/"), makeEnv(), makeCtx());
    const html = await res.text();
    expect(html).toContain("FAQPage");
    expect(html).toContain("mainEntity");
  });

  it("includes trust signals section", async () => {
    const res = await handleRequest(req("/"), makeEnv(), makeCtx());
    const html = await res.text();
    expect(html).toContain("No Signup");
  });

  it("includes FAQ accordion section", async () => {
    const res = await handleRequest(req("/"), makeEnv(), makeCtx());
    const html = await res.text();
    expect(html).toContain('id="faq"');
  });

  it("includes mobile hamburger menu", async () => {
    const res = await handleRequest(req("/"), makeEnv(), makeCtx());
    const html = await res.text();
    expect(html).toContain("hamburger");
    expect(html).toContain("toggleMobileNav");
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// 404 handling
// ═══════════════════════════════════════════════════════════════════════════

describe("404 handling", () => {
  it("returns 404 for unknown routes", async () => {
    const res = await handleRequest(req("/nonexistent"), makeEnv(), makeCtx());
    expect(res.status).toBe(404);
    const body = await res.json() as { error: string };
    expect(body.error).toBe("Not found");
  });
});

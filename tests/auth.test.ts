import { describe, it, expect } from "vitest";
import { authenticate } from "../src/api/middleware/auth.js";

function makeEnv(apiKey = "test-api-key-12345") {
  return { API_KEY: apiKey } as { API_KEY: string };
}

function makeRequest(authHeader?: string): Request {
  const headers: Record<string, string> = {};
  if (authHeader !== undefined) {
    headers["Authorization"] = authHeader;
  }
  return new Request("http://localhost/api/test", { headers });
}

describe("authenticate", () => {
  it("should return null (success) for valid Bearer token", () => {
    const env = makeEnv();
    const request = makeRequest("Bearer test-api-key-12345");
    const result = authenticate(request, env);
    expect(result).toBeNull();
  });

  it("should return 401 when Authorization header is missing", () => {
    const env = makeEnv();
    const request = makeRequest();
    const result = authenticate(request, env);
    expect(result).not.toBeNull();
    expect(result!.status).toBe(401);
  });

  it("should return 401 when Authorization header doesn't use Bearer scheme", () => {
    const env = makeEnv();
    const request = makeRequest("Basic abc123");
    const result = authenticate(request, env);
    expect(result).not.toBeNull();
    expect(result!.status).toBe(401);
  });

  it("should return 403 when token doesn't match API_KEY", () => {
    const env = makeEnv();
    const request = makeRequest("Bearer wrong-key");
    const result = authenticate(request, env);
    expect(result).not.toBeNull();
    expect(result!.status).toBe(403);
  });

  it("should return 403 when API_KEY is not set in env", () => {
    const env = { API_KEY: "" } as { API_KEY: string };
    const request = makeRequest("Bearer some-token");
    const result = authenticate(request, env);
    expect(result).not.toBeNull();
    expect(result!.status).toBe(403);
  });

  it("should return JSON error body on 401", async () => {
    const env = makeEnv();
    const request = makeRequest();
    const result = authenticate(request, env);
    expect(result).not.toBeNull();
    const body = await result!.json() as { error: string };
    expect(body.error).toContain("Missing Authorization header");
  });

  it("should return JSON error body on 403", async () => {
    const env = makeEnv();
    const request = makeRequest("Bearer wrong-key");
    const result = authenticate(request, env);
    expect(result).not.toBeNull();
    const body = await result!.json() as { error: string };
    expect(body.error).toContain("Invalid API key");
  });

  it("should be case-sensitive for token comparison", () => {
    const env = makeEnv("MySecretKey");
    const request = makeRequest("Bearer mysecretkey");
    const result = authenticate(request, env);
    expect(result).not.toBeNull();
    expect(result!.status).toBe(403);
  });
});

import { describe, it, expect } from "vitest";
import {
  generateId,
  formatDate,
  sanitizeInput,
  parseJsonBody,
} from "../src/utils/helpers.js";

describe("generateId", () => {
  it("should generate a unique ID without prefix", () => {
    const id = generateId();
    expect(id).toBeTruthy();
    expect(typeof id).toBe("string");
    expect(id.length).toBeGreaterThan(5);
  });

  it("should include prefix when provided", () => {
    const id = generateId("rpt");
    expect(id.startsWith("rpt_")).toBe(true);
  });

  it("should generate unique IDs on successive calls", () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateId("test")));
    expect(ids.size).toBe(100);
  });
});

describe("formatDate", () => {
  it("should format an ISO date string", () => {
    const result = formatDate("2026-03-15T12:00:00Z");
    expect(result).toContain("2026");
    expect(result).toContain("March");
    expect(result).toContain("15");
  });

  it("should handle different date formats", () => {
    const result = formatDate("2025-01-01T12:00:00.000Z");
    expect(result).toContain("2025");
    expect(result).toContain("January");
  });
});

describe("sanitizeInput", () => {
  it("should strip HTML tags", () => {
    expect(sanitizeInput("<script>alert('xss')</script>")).not.toContain(
      "<script>"
    );
  });

  it("should escape special characters", () => {
    const result = sanitizeInput('Test & "quotes" & <brackets>');
    expect(result).not.toContain('"');
    expect(result).not.toContain("<");
    expect(result).not.toContain(">");
  });

  it("should trim whitespace", () => {
    expect(sanitizeInput("  hello  ")).toBe("hello");
  });

  it("should handle empty strings", () => {
    expect(sanitizeInput("")).toBe("");
  });

  it("should pass through clean strings unchanged", () => {
    expect(sanitizeInput("clean text")).toBe("clean text");
  });
});

describe("parseJsonBody", () => {
  it("should parse valid JSON from a request", async () => {
    const body = JSON.stringify({ state: "CA", entityType: "LLC" });
    const request = new Request("http://localhost", {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
    });

    const result = await parseJsonBody<{ state: string; entityType: string }>(
      request
    );
    expect(result.state).toBe("CA");
    expect(result.entityType).toBe("LLC");
  });

  it("should throw on invalid JSON", async () => {
    const request = new Request("http://localhost", {
      method: "POST",
      body: "not json",
    });

    await expect(parseJsonBody(request)).rejects.toThrow(
      "Invalid JSON in request body"
    );
  });
});

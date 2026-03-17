import { describe, it, expect } from "vitest";
import { toFormData, verifyWebhook } from "../src/services/stripe.js";

describe("toFormData", () => {
  it("should convert simple key-value pairs", () => {
    const result = toFormData({ name: "test", value: "123" });
    expect(result).toContain("name=test");
    expect(result).toContain("value=123");
  });

  it("should encode special characters", () => {
    const result = toFormData({ email: "user@example.com" });
    expect(result).toContain("email=user%40example.com");
  });

  it("should handle nested objects with bracket notation", () => {
    const result = toFormData({ metadata: { reportId: "rpt_123" } });
    expect(result).toContain("metadata%5BreportId%5D=rpt_123");
  });

  it("should handle arrays with indexed bracket notation", () => {
    const result = toFormData({
      line_items: [{ quantity: "1" }],
    });
    expect(result).toContain("line_items%5B0%5D%5Bquantity%5D=1");
  });

  it("should handle deeply nested objects", () => {
    const result = toFormData({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: "2900",
          },
        },
      ],
    });
    expect(result).toContain("currency");
    expect(result).toContain("usd");
    expect(result).toContain("unit_amount");
    expect(result).toContain("2900");
  });

  it("should skip null values", () => {
    const result = toFormData({ keep: "yes", skip: null });
    expect(result).toContain("keep=yes");
    expect(result).not.toContain("skip");
  });

  it("should skip undefined values", () => {
    const result = toFormData({ keep: "yes", skip: undefined });
    expect(result).toContain("keep=yes");
    expect(result).not.toContain("skip");
  });

  it("should handle empty object", () => {
    const result = toFormData({});
    expect(result).toBe("");
  });

  it("should handle boolean values as strings", () => {
    const result = toFormData({ active: true });
    expect(result).toContain("active=true");
  });

  it("should handle numeric values as strings", () => {
    const result = toFormData({ amount: 2900 });
    expect(result).toContain("amount=2900");
  });

  it("should handle array of primitives", () => {
    const result = toFormData({ tags: ["a", "b", "c"] });
    expect(result).toContain("tags%5B0%5D=a");
    expect(result).toContain("tags%5B1%5D=b");
    expect(result).toContain("tags%5B2%5D=c");
  });

  it("should handle prefix parameter", () => {
    const result = toFormData({ key: "val" }, "parent");
    expect(result).toContain("parent%5Bkey%5D=val");
  });
});

describe("verifyWebhook", () => {
  const SECRET = "whsec_test_secret_key";
  const BODY = '{"id":"evt_123","type":"checkout.session.completed"}';

  async function computeSignature(
    body: string,
    secret: string,
    timestamp: number
  ): Promise<string> {
    const payload = `${timestamp}.${body}`;
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
    return Array.from(new Uint8Array(sig))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  it("should verify a valid webhook signature", async () => {
    const timestamp = Math.floor(Date.now() / 1000);
    const sig = await computeSignature(BODY, SECRET, timestamp);
    const header = `t=${timestamp},v1=${sig}`;

    const result = await verifyWebhook(BODY, header, SECRET);
    expect(result).toBe(true);
  });

  it("should reject an invalid signature", async () => {
    const timestamp = Math.floor(Date.now() / 1000);
    const header = `t=${timestamp},v1=deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef`;

    const result = await verifyWebhook(BODY, header, SECRET);
    expect(result).toBe(false);
  });

  it("should reject when signature header has no timestamp", async () => {
    const result = await verifyWebhook(BODY, "v1=abc123", SECRET);
    expect(result).toBe(false);
  });

  it("should reject when signature header has no v1 signature", async () => {
    const result = await verifyWebhook(BODY, "t=12345", SECRET);
    expect(result).toBe(false);
  });

  it("should reject a timestamp older than 5 minutes", async () => {
    const oldTimestamp = Math.floor(Date.now() / 1000) - 400; // 6+ minutes ago
    const sig = await computeSignature(BODY, SECRET, oldTimestamp);
    const header = `t=${oldTimestamp},v1=${sig}`;

    const result = await verifyWebhook(BODY, header, SECRET);
    expect(result).toBe(false);
  });

  it("should reject when body was tampered with", async () => {
    const timestamp = Math.floor(Date.now() / 1000);
    const sig = await computeSignature(BODY, SECRET, timestamp);
    const header = `t=${timestamp},v1=${sig}`;

    const tamperedBody = '{"id":"evt_456","type":"TAMPERED"}';
    const result = await verifyWebhook(tamperedBody, header, SECRET);
    expect(result).toBe(false);
  });

  it("should reject when wrong secret is used", async () => {
    const timestamp = Math.floor(Date.now() / 1000);
    const sig = await computeSignature(BODY, SECRET, timestamp);
    const header = `t=${timestamp},v1=${sig}`;

    const result = await verifyWebhook(BODY, header, "wrong_secret");
    expect(result).toBe(false);
  });
});

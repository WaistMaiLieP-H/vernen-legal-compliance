/**
 * Stripe Integration Service
 *
 * Direct REST API integration with Stripe — no npm dependency required.
 * Designed for Cloudflare Workers (uses fetch and Web Crypto API).
 */

const STRIPE_API_BASE = "https://api.stripe.com/v1";

// =============================================================================
// Types
// =============================================================================

export interface CheckoutSessionParams {
  productName: string;
  priceInCents: number;
  recurring: boolean;
  metadata: {
    reportId: string;
    product: string;
    state?: string;
    entityType?: string;
  };
  successUrl?: string;
  cancelUrl?: string;
}

export interface CheckoutSessionResult {
  url: string;
  sessionId: string;
}

export interface StripeSession {
  id: string;
  payment_status: string;
  status: string;
  metadata: Record<string, string>;
  customer_email?: string;
  amount_total?: number;
  currency?: string;
}

// =============================================================================
// Helpers
// =============================================================================

/**
 * Convert a nested object into Stripe's bracket-notation form data.
 * e.g., { line_items: [{ price_data: { unit_amount: 2900 } }] }
 * becomes "line_items[0][price_data][unit_amount]=2900"
 */
export function toFormData(obj: Record<string, unknown>, prefix = ""): string {
  const parts: string[] = [];

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}[${key}]` : key;

    if (value === null || value === undefined) {
      continue;
    } else if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const item = value[i];
        if (typeof item === "object" && item !== null) {
          parts.push(toFormData(item as Record<string, unknown>, `${fullKey}[${i}]`));
        } else {
          parts.push(`${encodeURIComponent(`${fullKey}[${i}]`)}=${encodeURIComponent(String(item))}`);
        }
      }
    } else if (typeof value === "object") {
      parts.push(toFormData(value as Record<string, unknown>, fullKey));
    } else {
      parts.push(`${encodeURIComponent(fullKey)}=${encodeURIComponent(String(value))}`);
    }
  }

  return parts.filter(Boolean).join("&");
}

/**
 * Make an authenticated request to the Stripe API.
 */
async function stripeRequest(
  method: string,
  path: string,
  apiKey: string,
  body?: Record<string, unknown>
): Promise<Response> {
  const url = `${STRIPE_API_BASE}${path}`;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const init: RequestInit = { method, headers };

  if (body && (method === "POST" || method === "PUT")) {
    init.body = toFormData(body);
  }

  return fetch(url, init);
}

// =============================================================================
// Public API
// =============================================================================

/**
 * Create a Stripe Checkout Session for a compliance report purchase.
 */
export async function createCheckoutSession(
  apiKey: string,
  params: CheckoutSessionParams
): Promise<CheckoutSessionResult> {
  const successUrl =
    params.successUrl ??
    "https://compliance.vernenlegal.com/payment/success?session_id={CHECKOUT_SESSION_ID}";
  const cancelUrl =
    params.cancelUrl ??
    "https://compliance.vernenlegal.com/payment/cancel";

  const body: Record<string, unknown> = {
    mode: params.recurring ? "subscription" : "payment",
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: params.metadata,
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: String(params.priceInCents),
          product_data: {
            name: params.productName,
          },
          ...(params.recurring
            ? { recurring: { interval: "month" } }
            : {}),
        },
        quantity: "1",
      },
    ],
  };

  const response = await stripeRequest("POST", "/checkout/sessions", apiKey, body);
  const data = (await response.json()) as {
    id?: string;
    url?: string;
    error?: { message: string };
  };

  if (!response.ok || !data.url || !data.id) {
    const msg = data.error?.message ?? "Failed to create checkout session";
    throw new Error(`Stripe error: ${msg}`);
  }

  return {
    url: data.url,
    sessionId: data.id,
  };
}

/**
 * Retrieve a Checkout Session by ID.
 */
export async function getSession(
  apiKey: string,
  sessionId: string
): Promise<StripeSession> {
  const response = await stripeRequest("GET", `/checkout/sessions/${sessionId}`, apiKey);
  const data = (await response.json()) as StripeSession & {
    error?: { message: string };
  };

  if (!response.ok) {
    const msg = (data as { error?: { message: string } }).error?.message ?? "Failed to retrieve session";
    throw new Error(`Stripe error: ${msg}`);
  }

  return data;
}

/**
 * Verify a Stripe webhook signature using the Web Crypto API.
 *
 * Stripe signs webhooks with HMAC-SHA256 using the webhook secret.
 * The signature header contains: t=<timestamp>,v1=<signature>
 */
export async function verifyWebhook(
  body: string,
  signatureHeader: string,
  secret: string
): Promise<boolean> {
  // Parse the signature header
  const parts = signatureHeader.split(",");
  const timestampStr = parts.find((p) => p.startsWith("t="))?.slice(2);
  const signature = parts.find((p) => p.startsWith("v1="))?.slice(3);

  if (!timestampStr || !signature) {
    return false;
  }

  // Check timestamp tolerance (5 minutes)
  const timestamp = parseInt(timestampStr, 10);
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - timestamp) > 300) {
    return false;
  }

  // Compute expected signature: HMAC-SHA256(secret, timestamp + "." + body)
  const payload = `${timestampStr}.${body}`;
  const encoder = new TextEncoder();

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload)
  );

  // Convert to hex
  const expected = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Constant-time comparison
  if (expected.length !== signature.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < expected.length; i++) {
    result |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  }

  return result === 0;
}

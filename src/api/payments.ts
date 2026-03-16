/**
 * Payment Route Handlers
 *
 * Stripe-powered payment processing for REGULIS compliance reports.
 * Gracefully degrades when Stripe keys are not yet configured.
 */

import type { Env } from "../index.js";
import { getProductById } from "../personas/regulis/products.js";
import {
  createCheckoutSession,
  getSession,
  verifyWebhook,
} from "../services/stripe.js";
import { parseJsonBody } from "../utils/helpers.js";
import { Fiscara } from "../personas/fiscara/index.js";
import {
  TransactionType,
  TransactionCategory,
} from "../workers/ledger-1/types.js";

type RouteParams = Record<string, string>;

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function htmlResponse(html: string, status = 200): Response {
  return new Response(html, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

/**
 * Check if Stripe is configured. Returns an error response if not.
 */
function requireStripe(env: Env): Response | null {
  if (!env.STRIPE_SECRET_KEY) {
    return jsonResponse(
      {
        error: "Payment processing is being configured. Please check back soon.",
        configured: false,
      },
      503
    );
  }
  return null;
}

// =============================================================================
// POST /api/payments/checkout
// =============================================================================

export async function handlePaymentCheckout(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const stripeError = requireStripe(env);
  if (stripeError) return stripeError;

  let body: { reportId: string; productId: string };

  try {
    body = await parseJsonBody<typeof body>(request);
  } catch {
    return jsonResponse({ error: "Invalid JSON in request body" }, 400);
  }

  if (!body.reportId || !body.productId) {
    return jsonResponse(
      { error: "Both 'reportId' and 'productId' are required" },
      400
    );
  }

  const product = getProductById(body.productId);
  if (!product) {
    return jsonResponse({ error: `Unknown product: '${body.productId}'` }, 400);
  }

  if (product.price === 0) {
    return jsonResponse(
      { error: "Free preview does not require payment" },
      400
    );
  }

  // Look up the report to get metadata
  let state = "";
  let entityType = "";
  try {
    const row = await env.DB.prepare(
      `SELECT states, entity_type FROM compliance_reports WHERE id = ?`
    ).bind(body.reportId).first<{ states: string; entity_type: string }>();
    if (row) {
      state = row.states;
      entityType = row.entity_type;
    }
  } catch {
    // Report metadata lookup is optional — proceed without it
  }

  try {
    const session = await createCheckoutSession(env.STRIPE_SECRET_KEY!, {
      productName: `${product.name} — Vernen Legal Compliance`,
      priceInCents: product.price,
      recurring: product.recurring,
      metadata: {
        reportId: body.reportId,
        product: body.productId,
        state,
        entityType,
      },
    });

    return jsonResponse({
      url: session.url,
      sessionId: session.sessionId,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create checkout session";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// POST /api/payments/webhook
// =============================================================================

export async function handlePaymentWebhook(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  if (!env.STRIPE_SECRET_KEY || !env.STRIPE_WEBHOOK_SECRET) {
    return jsonResponse({ error: "Webhook not configured" }, 503);
  }

  const signature = request.headers.get("Stripe-Signature");
  if (!signature) {
    return jsonResponse({ error: "Missing Stripe-Signature header" }, 400);
  }

  const body = await request.text();

  const valid = await verifyWebhook(body, signature, env.STRIPE_WEBHOOK_SECRET);
  if (!valid) {
    return jsonResponse({ error: "Invalid webhook signature" }, 401);
  }

  let event: {
    type: string;
    data: {
      object: {
        id: string;
        payment_status: string;
        metadata: Record<string, string>;
        amount_total?: number;
        currency?: string;
        customer_email?: string;
      };
    };
  };

  try {
    event = JSON.parse(body);
  } catch {
    return jsonResponse({ error: "Invalid JSON" }, 400);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const reportId = session.metadata?.reportId;
    const stripePaymentId = session.id;

    if (reportId) {
      // Mark report as paid in D1
      try {
        await env.DB.prepare(
          `UPDATE compliance_reports SET is_paid = 1, stripe_payment_id = ? WHERE id = ?`
        )
          .bind(stripePaymentId, reportId)
          .run();
      } catch (err) {
        console.error("Failed to update report payment status:", err);
      }

      // Store payment record in KV for fast lookup
      try {
        await env.KNOWLEDGE_STORE.put(
          `payment:${reportId}`,
          JSON.stringify({
            sessionId: stripePaymentId,
            reportId,
            product: session.metadata?.product ?? "unknown",
            amount: session.amount_total,
            currency: session.currency,
            email: session.customer_email,
            paidAt: new Date().toISOString(),
          }),
          { expirationTtl: 60 * 60 * 24 * 180 } // 180 days
        );
      } catch (err) {
        console.error("Failed to store payment in KV:", err);
      }

      // Record the transaction in FISCARA for financial tracking
      try {
        const fiscara = new Fiscara();
        await fiscara.initialize(env);

        // Determine category from product metadata
        const productId = session.metadata?.product ?? "unknown";
        let category = TransactionCategory.COMPLIANCE_REPORT;
        if (productId.includes("subscription") || productId.includes("sub_")) {
          category = TransactionCategory.SUBSCRIPTION;
        } else if (productId.includes("doc_")) {
          category = TransactionCategory.DOCUMENT_GENERATION;
        }

        await fiscara.recordRevenue(
          {
            type: TransactionType.REVENUE,
            category,
            amount: session.amount_total ?? 0,
            description: `Payment for ${productId} — report ${reportId}`,
            stripePaymentId,
            productId,
            state: session.metadata?.state ?? undefined,
            metadata: {
              reportId,
              email: session.customer_email,
              entityType: session.metadata?.entityType,
              currency: session.currency,
            },
          },
          env
        );
      } catch (err) {
        console.error("Failed to record transaction in FISCARA:", err);
      }
    }
  }

  // Always return 200 to acknowledge receipt
  return jsonResponse({ received: true });
}

// =============================================================================
// GET /api/payments/verify/:sessionId
// =============================================================================

export async function handlePaymentVerify(
  _request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const stripeError = requireStripe(env);
  if (stripeError) return stripeError;

  const sessionId = params["sessionId"];
  if (!sessionId) {
    return jsonResponse({ error: "Session ID is required" }, 400);
  }

  try {
    const session = await getSession(env.STRIPE_SECRET_KEY!, sessionId);

    return jsonResponse({
      sessionId: session.id,
      paymentStatus: session.payment_status,
      status: session.status,
      reportId: session.metadata?.reportId ?? null,
      product: session.metadata?.product ?? null,
      paid: session.payment_status === "paid",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to verify session";
    return jsonResponse({ error: message }, 500);
  }
}

// =============================================================================
// GET /payment/success
// =============================================================================

export async function handlePaymentSuccess(
  request: Request,
  _env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session_id") ?? "";

  return htmlResponse(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Successful — Vernen Legal Compliance</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0a0e17;
      color: #e0e6f0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .card {
      background: #141926;
      border: 1px solid #2a3548;
      border-radius: 12px;
      padding: 48px;
      max-width: 520px;
      text-align: center;
    }
    .check {
      width: 64px;
      height: 64px;
      background: #10b981;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
      font-size: 32px;
      color: white;
    }
    h1 { font-size: 24px; margin-bottom: 12px; color: #f0f4ff; }
    p { font-size: 16px; line-height: 1.6; color: #8899b0; margin-bottom: 24px; }
    a.btn {
      display: inline-block;
      background: #3b82f6;
      color: white;
      text-decoration: none;
      padding: 12px 32px;
      border-radius: 8px;
      font-weight: 600;
      transition: background 0.2s;
    }
    a.btn:hover { background: #2563eb; }
    .brand { margin-top: 32px; font-size: 13px; color: #4a5568; }
  </style>
</head>
<body>
  <div class="card">
    <div class="check">&#10003;</div>
    <h1>Payment Successful!</h1>
    <p>Your full compliance report is ready. All findings, remediation guidance, and your downloadable report are now unlocked.</p>
    ${sessionId ? `<a class="btn" href="/api/payments/verify/${encodeURIComponent(sessionId)}">View Report Status</a>` : `<a class="btn" href="/">Return Home</a>`}
    <div class="brand">Vernen Legal Compliance&trade; &mdash; Powered by REGULIS&trade;</div>
  </div>
</body>
</html>`);
}

// =============================================================================
// GET /payment/cancel
// =============================================================================

export async function handlePaymentCancel(
  _request: Request,
  _env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  return htmlResponse(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Cancelled — Vernen Legal Compliance</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0a0e17;
      color: #e0e6f0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .card {
      background: #141926;
      border: 1px solid #2a3548;
      border-radius: 12px;
      padding: 48px;
      max-width: 520px;
      text-align: center;
    }
    .icon {
      width: 64px;
      height: 64px;
      background: #6b7280;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
      font-size: 32px;
      color: white;
    }
    h1 { font-size: 24px; margin-bottom: 12px; color: #f0f4ff; }
    p { font-size: 16px; line-height: 1.6; color: #8899b0; margin-bottom: 24px; }
    a.btn {
      display: inline-block;
      background: #3b82f6;
      color: white;
      text-decoration: none;
      padding: 12px 32px;
      border-radius: 8px;
      font-weight: 600;
      transition: background 0.2s;
    }
    a.btn:hover { background: #2563eb; }
    .brand { margin-top: 32px; font-size: 13px; color: #4a5568; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">&#10005;</div>
    <h1>Payment Cancelled</h1>
    <p>No worries — your free compliance preview is still available. You can purchase the full report anytime.</p>
    <a class="btn" href="/">Return to Home</a>
    <div class="brand">Vernen Legal Compliance&trade; &mdash; Powered by REGULIS&trade;</div>
  </div>
</body>
</html>`);
}

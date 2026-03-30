import { handleRequest } from "./router.js";

export interface Env {
  DB: D1Database;
  KNOWLEDGE_STORE: KVNamespace;
  API_KEY: string;
  /** Stripe secret key — set via `wrangler secret put STRIPE_SECRET_KEY` */
  STRIPE_SECRET_KEY?: string;
  /** Stripe webhook signing secret — set via `wrangler secret put STRIPE_WEBHOOK_SECRET` */
  STRIPE_WEBHOOK_SECRET?: string;
  /** FAC API key — set via `wrangler secret put FAC_API_KEY` (free from api.data.gov) */
  FAC_API_KEY?: string;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    try {
      return await handleRequest(request, env, ctx);
    } catch (error) {
      // Log the real error server-side but never expose internals to clients
      console.error("Unhandled error:", error instanceof Error ? error.message : error);
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
          },
        }
      );
    }
  },
};

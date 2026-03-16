import { handleRequest } from "./router.js";

export interface Env {
  DB: D1Database;
  KNOWLEDGE_STORE: KVNamespace;
  API_KEY: string;
  /** Stripe secret key — set via `wrangler secret put STRIPE_SECRET_KEY` */
  STRIPE_SECRET_KEY?: string;
  /** Stripe webhook signing secret — set via `wrangler secret put STRIPE_WEBHOOK_SECRET` */
  STRIPE_WEBHOOK_SECRET?: string;
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
      const message =
        error instanceof Error ? error.message : "Internal server error";
      return new Response(JSON.stringify({ error: message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};

import { handleRequest } from "./router.js";
import { CUSTOSViolation, CUSTOS } from "./services/custos.js";

export interface Env {
  DB: D1Database;
  KNOWLEDGE_STORE: KVNamespace;
  API_KEY: string;
  /** Workers AI binding for document vision (OCR/image-to-text) */
  AI?: Ai;
  /** Stripe secret key — set via `wrangler secret put STRIPE_SECRET_KEY` */
  STRIPE_SECRET_KEY?: string;
  /** Stripe webhook signing secret — set via `wrangler secret put STRIPE_WEBHOOK_SECRET` */
  STRIPE_WEBHOOK_SECRET?: string;
  /** FAC API key — set via `wrangler secret put FAC_API_KEY` (free from api.data.gov) */
  FAC_API_KEY?: string;
  /** GitHub Personal Access Token with repo scope — for verification log anchoring */
  GITHUB_TOKEN?: string;
  /** GitHub owner (username or org) for the verification log repo */
  GITHUB_OWNER?: string;
  /** GitHub repo name for the verification log (default: vernen-verification-log) */
  GITHUB_REPO?: string;
  /**
   * External webhook URL — if set, the platform POSTs a notification to this
   * URL every time a record is appended to the verification chain.
   * This is the integration bridge: glasses app, attorney tools, court filing
   * systems, hardware alerts — anything that needs to react to a completed audit.
   * Set via: wrangler secret put WEBHOOK_URL
   */
  WEBHOOK_URL?: string;
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
      // CUSTOS violation — hard 403, never swallowed, always visible
      if (error instanceof CUSTOSViolation) {
        console.error("[CUSTOS] NonCompliance violation:", error.message);
        return CUSTOS.nonComplianceResponse(error);
      }
      // All other errors — log server-side, never expose internals to clients
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

  /**
   * Scheduled handler — runs daily at 1 AM UTC.
   * Computes yesterday's Merkle root and anchors it to GitHub automatically.
   * Configured in wrangler.toml [triggers] crons.
   */
  async scheduled(
    _event: ScheduledEvent,
    env: Env,
    ctx: ExecutionContext
  ): Promise<void> {
    ctx.waitUntil((async () => {
      try {
        const yesterday = new Date(Date.now() - 86400000)
          .toISOString()
          .split("T")[0]!;
        const { VerificationEngine } = await import("./services/verification-engine.js");
        const engine = new VerificationEngine(env);
        await engine.ensureTables();
        const result = await engine.computeDailyRoot(yesterday);
        console.log(
          `[cron] Daily Merkle root for ${yesterday}: ${result.root} (${result.recordCount} records)`
        );
      } catch (err) {
        console.error("[cron] Daily anchor failed:", err instanceof Error ? err.message : err);
      }
    })());
  },
};

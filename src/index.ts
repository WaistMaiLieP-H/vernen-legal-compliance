import { handleRequest } from "./router.js";

export interface Env {
  DB: D1Database;
  KNOWLEDGE_STORE: KVNamespace;
  API_KEY: string;
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

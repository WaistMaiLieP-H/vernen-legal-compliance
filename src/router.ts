import type { Env } from "./index.js";
import { handleApiRoutes } from "./api/index.js";
import { APP_NAME, APP_VERSION } from "./utils/constants.js";
import { serveLandingPage } from "./landing/serve.js";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function corsResponse(body: string | null, init: ResponseInit = {}): Response {
  const headers = new Headers(init.headers);
  for (const [key, value] of Object.entries(CORS_HEADERS)) {
    headers.set(key, value);
  }
  return new Response(body, { ...init, headers });
}

function jsonResponse(data: unknown, status = 200): Response {
  return corsResponse(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

type RouteParams = Record<string, string>;

interface RouteMatch {
  params: RouteParams;
  handler: (
    request: Request,
    env: Env,
    ctx: ExecutionContext,
    params: RouteParams
  ) => Promise<Response>;
}

function matchRoute(
  method: string,
  pathname: string,
  routes: Map<string, (request: Request, env: Env, ctx: ExecutionContext, params: RouteParams) => Promise<Response>>
): RouteMatch | null {
  for (const [pattern, handler] of routes) {
    const [routeMethod, routePath] = pattern.split(" ");
    if (routeMethod !== method) continue;

    const routeParts = routePath!.split("/").filter(Boolean);
    const pathParts = pathname.split("/").filter(Boolean);

    if (routeParts.length !== pathParts.length) continue;

    const params: RouteParams = {};
    let matched = true;

    for (let i = 0; i < routeParts.length; i++) {
      const routePart = routeParts[i]!;
      const pathPart = pathParts[i]!;

      if (routePart.startsWith(":")) {
        params[routePart.slice(1)] = pathPart;
      } else if (routePart !== pathPart) {
        matched = false;
        break;
      }
    }

    if (matched) {
      return { params, handler };
    }
  }

  return null;
}

export async function handleRequest(
  request: Request,
  env: Env,
  ctx: ExecutionContext
): Promise<Response> {
  const url = new URL(request.url);
  const { pathname } = url;
  const method = request.method;

  if (method === "OPTIONS") {
    return corsResponse(null, { status: 204 });
  }

  const routes = new Map<
    string,
    (request: Request, env: Env, ctx: ExecutionContext, params: RouteParams) => Promise<Response>
  >();

  routes.set("GET /", async () => serveLandingPage());

  routes.set("GET /api/health", async () =>
    jsonResponse({ status: "healthy", timestamp: new Date().toISOString() })
  );

  // API routes are handled by the api module
  routes.set("POST /api/compliance/check", handleApiRoutes.complianceCheck);
  routes.set("GET /api/compliance/report/:id", handleApiRoutes.getReport);

  const match = matchRoute(method, pathname, routes);

  if (match) {
    const response = await match.handler(request, env, ctx, match.params);
    // Ensure CORS headers on all responses
    for (const [key, value] of Object.entries(CORS_HEADERS)) {
      response.headers.set(key, value);
    }
    return response;
  }

  return jsonResponse({ error: "Not found" }, 404);
}

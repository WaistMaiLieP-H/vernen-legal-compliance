import type { Env } from "./index.js";
import { handleApiRoutes, handleSentinelRoutes } from "./api/index.js";
import { APP_NAME, APP_VERSION } from "./utils/constants.js";
import { serveLandingPage } from "./landing/serve.js";
import {
  handleRegulisStatus,
  handleRegulisCheck,
  handleRegulisGetReport,
  handleRegulisProducts,
  handleRegulisStats,
  handleRegulisStates,
  handleRegulisMap,
  handleRegulisMapState,
  handleRegulisCompare,
  handleRegulisAlerts,
  handleRegulisAlertsForState,
} from "./api/regulis.js";
import {
  handlePaymentCheckout,
  handlePaymentWebhook,
  handlePaymentVerify,
  handlePaymentSuccess,
  handlePaymentCancel,
} from "./api/payments.js";
import {
  handleAdvocisStatus,
  handleAdvocisOnboard,
  handleAdvocisGetClient,
  handleAdvocisOnboarding,
  handleAdvocisFeedback,
  handleAdvocisStats,
  handleAdvocisChurnRisk,
  handleAdvocisInquiry,
} from "./api/advocis.js";
import {
  handleFiscaraStatus,
  handleFiscaraSummary,
  handleFiscaraRevenueByProduct,
  handleFiscaraRevenueByState,
  handleFiscaraDailyRevenue,
  handleFiscaraTransactions,
  handleFiscaraRecordTransaction,
  handleFiscaraCashFlow,
  handleFiscaraGrowth,
} from "./api/fiscara.js";
import {
  handleLexarcStatus,
  handleLexarcDocuments,
  handleLexarcGenerate,
  handleLexarcGetDocument,
  handleLexarcProducts,
} from "./api/lexarc.js";
import { handleIntegraRoutes } from "./api/integra.js";
import {
  handlePrivaxisStatus,
  handlePrivaxisAudit,
  handlePrivaxisDataflows,
  handlePrivaxisClassification,
  handlePrivaxisDSAR,
  handlePrivaxisSecurity,
  handlePrivaxisSecurityEvents,
} from "./api/privaxis.js";
import {
  handleVigilusStatus,
  handleVigilusRisks,
  handleVigilusHeatmap,
  handleVigilusAddRisk,
  handleVigilusThreats,
  handleVigilusVendor,
} from "./api/vigilus.js";
import {
  handleEthicaraStatus,
  handleEthicaraCode,
  handleEthicaraReview,
  handleEthicaraReviews,
  handleEthicaraReport,
  handleEthicaraFairness,
} from "./api/ethicara.js";

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

  // FORGE-0 build system routes
  routes.set("GET /api/forge/status", handleApiRoutes.forgeStatus);
  routes.set("GET /api/forge/log", handleApiRoutes.forgeLog);
  routes.set("GET /api/forge/milestone/:id", handleApiRoutes.forgeMilestone);
  routes.set("POST /api/forge/task", handleApiRoutes.forgeSubmitTask);

  // REGULIS Persona Citizen routes — the revenue engine
  routes.set("GET /api/regulis/status", handleRegulisStatus);
  routes.set("POST /api/regulis/check", handleRegulisCheck);
  routes.set("GET /api/regulis/report/:id", handleRegulisGetReport);
  routes.set("GET /api/regulis/products", handleRegulisProducts);
  routes.set("GET /api/regulis/stats", handleRegulisStats);
  routes.set("GET /api/regulis/states", handleRegulisStates);

  // REGULIS Phase 2 — MAP-1 jurisdictional intelligence
  routes.set("GET /api/regulis/map", handleRegulisMap);
  routes.set("GET /api/regulis/map/:state", handleRegulisMapState);
  routes.set("GET /api/regulis/compare", handleRegulisCompare);

  // REGULIS Phase 2 — ALERT-1 compliance alerts
  routes.set("GET /api/regulis/alerts", handleRegulisAlerts);
  routes.set("GET /api/regulis/alerts/:state", handleRegulisAlertsForState);

  // Payment routes — Stripe integration
  routes.set("POST /api/payments/checkout", handlePaymentCheckout);
  routes.set("POST /api/payments/webhook", handlePaymentWebhook);
  routes.set("GET /api/payments/verify/:sessionId", handlePaymentVerify);
  routes.set("GET /payment/success", handlePaymentSuccess);
  routes.set("GET /payment/cancel", handlePaymentCancel);

  // ADVOCIS Persona Citizen routes — the retention engine
  routes.set("GET /api/advocis/status", handleAdvocisStatus);
  routes.set("POST /api/advocis/onboard", handleAdvocisOnboard);
  routes.set("GET /api/advocis/client/:id", handleAdvocisGetClient);
  routes.set("GET /api/advocis/client/:id/onboarding", handleAdvocisOnboarding);
  routes.set("POST /api/advocis/client/:id/feedback", handleAdvocisFeedback);
  routes.set("GET /api/advocis/stats", handleAdvocisStats);
  routes.set("GET /api/advocis/churn-risk", handleAdvocisChurnRisk);
  routes.set("POST /api/advocis/inquiry", handleAdvocisInquiry);

  // FISCARA Persona Citizen routes — the financial brain (founder-only)
  routes.set("GET /api/fiscara/status", handleFiscaraStatus);
  routes.set("GET /api/fiscara/summary", handleFiscaraSummary);
  routes.set("GET /api/fiscara/revenue/products", handleFiscaraRevenueByProduct);
  routes.set("GET /api/fiscara/revenue/states", handleFiscaraRevenueByState);
  routes.set("GET /api/fiscara/revenue/daily", handleFiscaraDailyRevenue);
  routes.set("GET /api/fiscara/transactions", handleFiscaraTransactions);
  routes.set("POST /api/fiscara/transaction", handleFiscaraRecordTransaction);
  routes.set("GET /api/fiscara/cashflow", handleFiscaraCashFlow);
  routes.set("GET /api/fiscara/growth", handleFiscaraGrowth);

  // LEXARC Persona Citizen routes — corporate strategy & legal architecture
  routes.set("GET /api/lexarc/status", handleLexarcStatus);
  routes.set("GET /api/lexarc/documents", handleLexarcDocuments);
  routes.set("POST /api/lexarc/generate", handleLexarcGenerate);
  routes.set("GET /api/lexarc/document/:id", handleLexarcGetDocument);
  routes.set("GET /api/lexarc/products", handleLexarcProducts);

  // INTEGRA Persona Citizen routes — internal compliance & operational integrity (founder-only)
  routes.set("GET /api/integra/status", handleIntegraRoutes.status);
  routes.set("GET /api/integra/audit", handleIntegraRoutes.audit);
  routes.set("GET /api/integra/audit/database", handleIntegraRoutes.auditDatabase);
  routes.set("GET /api/integra/audit/citizens", handleIntegraRoutes.auditCitizens);
  routes.set("GET /api/integra/audit/history", handleIntegraRoutes.auditHistory);
  routes.set("GET /api/integra/metrics", handleIntegraRoutes.metrics);

  // PRIVAXIS Persona Citizen routes — data protection & privacy (founder-only)
  routes.set("GET /api/privaxis/status", handlePrivaxisStatus);
  routes.set("GET /api/privaxis/audit", handlePrivaxisAudit);
  routes.set("GET /api/privaxis/dataflows", handlePrivaxisDataflows);
  routes.set("GET /api/privaxis/classification", handlePrivaxisClassification);
  routes.set("POST /api/privaxis/dsar", handlePrivaxisDSAR);
  routes.set("GET /api/privaxis/security", handlePrivaxisSecurity);
  routes.set("GET /api/privaxis/security/events", handlePrivaxisSecurityEvents);

  // VIGILUS Persona Citizen routes — threat assessment & operational risk (founder-only)
  routes.set("GET /api/vigilus/status", handleVigilusStatus);
  routes.set("GET /api/vigilus/risks", handleVigilusRisks);
  routes.set("GET /api/vigilus/risks/heatmap", handleVigilusHeatmap);
  routes.set("POST /api/vigilus/risks", handleVigilusAddRisk);
  routes.set("GET /api/vigilus/threats", handleVigilusThreats);
  routes.set("GET /api/vigilus/vendor/:name", handleVigilusVendor);

  // ETHICARA Persona Citizen routes — ethical governance & professional standards (founder-only)
  routes.set("GET /api/ethicara/status", handleEthicaraStatus);
  routes.set("GET /api/ethicara/code", handleEthicaraCode);
  routes.set("POST /api/ethicara/review", handleEthicaraReview);
  routes.set("GET /api/ethicara/reviews", handleEthicaraReviews);
  routes.set("POST /api/ethicara/report", handleEthicaraReport);
  routes.set("GET /api/ethicara/fairness", handleEthicaraFairness);

  // SENTINEL-0 audit system routes — the independent auditor
  routes.set("GET /api/sentinel/status", handleSentinelRoutes.status);
  routes.set("GET /api/sentinel/issues", handleSentinelRoutes.issues);
  routes.set("GET /api/sentinel/gate/:id", handleSentinelRoutes.gate);
  routes.set("GET /api/sentinel/citizens", handleSentinelRoutes.citizens);
  routes.set("GET /api/sentinel/report/:phase", handleSentinelRoutes.report);
  routes.set("POST /api/sentinel/audit/:taskId", handleSentinelRoutes.auditTask);

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

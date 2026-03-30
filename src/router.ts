import type { Env } from "./index.js";
import { handleApiRoutes, handleSentinelRoutes } from "./api/index.js";
import { APP_NAME, APP_VERSION } from "./utils/constants.js";
import { serveLandingPage } from "./landing/serve.js";
import { serveDashboard } from "./landing/dashboard.js";
import { serveTermsOfService } from "./legal/terms.js";
import { servePrivacyPolicy } from "./legal/privacy.js";
import { EventBus } from "./services/event-bus.js";
import { authenticate } from "./api/middleware/auth.js";
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
  handleViewReport,
  handleDownloadReportPDF,
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
import {
  handleSyntaraStatus,
  handleSyntaraHealth,
  handleSyntaraAutomation,
  handleSyntaraQuality,
  handleSyntaraDeployments,
} from "./api/syntara.js";
import {
  handleVestaraStatus,
  handleVestaraReadiness,
  handleVestaraMetrics,
  handleVestaraNarrative,
} from "./api/vestara.js";
import {
  handleMetriqaStatus,
  handleMetriqaDashboard,
  handleMetriqaGrowth,
  handleMetriqaEconomics,
} from "./api/metriqa.js";
import {
  handleClaridexStatus,
  handleClaridexFinancials,
  handleClaridexDisclosure,
  handleClaridexAuditReadiness,
} from "./api/claridex.js";
import {
  handleNexarisStatus,
  handleNexarisPartnerships,
  handleNexarisEvaluate,
  handleNexarisReputation,
} from "./api/nexaris.js";
import {
  handleFacialexStatus,
  handleFacialexMethodology,
  handleFacialexKnowledge,
} from "./api/facialex.js";
import {
  handleSubmitAttestation,
  handleSubmitDocument,
  handleVerifyEvidence,
  handleGetEvidence,
  handleGetEvidenceSummary,
  handleGetRetentionRules,
  handleRetentionLookup,
  handleRetentionSummary,
  handlePlaceLegalHold,
  handleReleaseLegalHold,
} from "./api/evidence.js";
import {
  handleFACStatus,
  handleFACDiscover,
  handleFACPipeline,
  handleFACReport,
  handleFACOutreach,
  handleFACOutreachBatch,
  handleFACStates,
  handleFACLeads,
  handleFACFindings,
} from "./api/fac.js";
import {
  handleFedRegStatus,
  handleFedRegSearch,
  handleFedRegImpact,
  handleFedRegPipeline,
  handleFedRegAlert,
  handleFedRegAgencies,
  handleFedRegLeads,
} from "./api/fedreg.js";
import {
  handleHHSStatus,
  handleHHSBreaches,
  handleHHSPipeline,
  handleHHSReport,
  handleHHSStates,
  handleHHSLeads,
} from "./api/hhs.js";
import {
  handleEDGARStatus,
  handleEDGARSearch,
  handleEDGARPipeline,
  handleEDGARReport,
  handleEDGARLeads,
} from "./api/edgar.js";
import {
  handleSBAStatus,
  handleSBADiscover,
  handleSBAPipeline,
  handleSBAReport,
  handleSBAOutreach,
  handleSBAOutreachBatch,
  handleSBAChecklist,
  handleSBAChecklistUpdate,
  handleSBAAppealReadiness,
  handleSBAStates,
  handleSBALeads,
} from "./api/sba.js";
import {
  handleSpendingStatus,
  handleSpendingSearch,
  handleSpendingGrants,
  handleSpendingPipeline,
  handleSpendingReport,
  handleSpendingAgencies,
  handleSpendingLeads,
} from "./api/usaspending.js";
import {
  handleRescueStatus,
  handleRescueInitiate,
  handleRescueGet,
  handleRescueReport,
  handleRescueList,
  handleRescueDeliverableUpdate,
  handleRescueAutomate,
} from "./api/rescue.js";
import {
  handleEngineCatalog,
  handleEngineCatalogStats,
  handleEngineCatalogById,
  handleEngineRegisterSpec,
  handleEngineImportSpecs,
  handleEngineDeploy,
  handleEngineUndeploy,
  handleEngineDeployed,
  handleEngineDeployedById,
  handleDynamicCitizenRoute,
} from "./api/engine.js";
import {
  handleGetAllSkills,
  handleGetCitizenSkills,
  handleGetSkillDetail,
  handleInstallSkill,
  handleInstallBatch,
  handleMatchSkill,
  handleGetExecutions,
} from "./api/skills.js";
import {
  handleGetAllStandards,
  handleGetCitizenStandards,
  handleGetLibrarySummary,
  handleLookupStandard,
  handleStandardsForDocument,
  handleStandardsForSkill,
  handleSearchStandards,
  handleSeedStandards,
  handleGetStandardsByType,
  handleGetStandardsByJurisdiction,
  handleGetActionableStandards,
  handleGetCrossReferences,
  handleAddCrossReference,
} from "./api/standards.js";
import {
  handleLegalStatus,
  handleLegalPracticeAreas,
  handleLegalJurisdictions,
  handleLegalAuthority,
  handleLegalDeadlines,
  handleLegalRules,
  handleLegalMotion,
  handleLegalConflicts,
} from "./api/legal.js";
import {
  handleAuditDocument,
  handleGetAudit,
  handleGetAuditFindings,
  handleListForms,
  handleGetFormGuidance,
  handleValidateFormField,
  handleListScenarios,
  handleGetScenario,
  handleLoadForms,
  handleFormRegistry,
} from "./api/audit.js";
import {
  handleI18nLanguages,
  handleI18nBundle,
  handleI18nSection,
} from "./api/i18n.js";
import {
  handleVerifyLookup,
  handleVerificationStats,
  handlePublicRules,
  handleRuleCategories,
  handleRuleStates,
} from "./api/verification.js";

// ═══════════════════════════════════════════════════════════════════════════
// CORS — Origin-restricted (no wildcard)
// ═══════════════════════════════════════════════════════════════════════════

const ALLOWED_ORIGINS = new Set([
  "https://compliance.vernenlegal.com",
  "https://vernenlegal.com",
  "http://localhost:8787",
]);

function getAllowedOrigin(request?: Request | null): string {
  if (!request) return "https://compliance.vernenlegal.com";
  const origin = request.headers.get("Origin");
  if (origin && ALLOWED_ORIGINS.has(origin)) return origin;
  return "https://compliance.vernenlegal.com";
}

function makeCorsHeaders(origin: string): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Vary": "Origin",
  };
}

function corsResponse(body: string | null, init: ResponseInit = {}, request?: Request | null): Response {
  const headers = new Headers(init.headers);
  const origin = getAllowedOrigin(request);
  for (const [key, value] of Object.entries(makeCorsHeaders(origin))) {
    headers.set(key, value);
  }
  return new Response(body, { ...init, headers });
}

function jsonResponse(data: unknown, status = 200, request?: Request | null): Response {
  return corsResponse(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  }, request);
}

// ═══════════════════════════════════════════════════════════════════════════
// Content-Security-Policy for HTML pages
// ═══════════════════════════════════════════════════════════════════════════

const CSP_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://js.stripe.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data:",
  "connect-src 'self' https://api.stripe.com https://api.fac.gov https://www.federalregister.gov https://api.usaspending.gov",
  "frame-src https://js.stripe.com",
  "object-src 'none'",
  "base-uri 'self'",
].join("; ");

// ═══════════════════════════════════════════════════════════════════════════
// Input validation limits
// ═══════════════════════════════════════════════════════════════════════════

const MAX_PATH_LENGTH = 2048;
const MAX_BODY_SIZE = 1_048_576; // 1 MB

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

  // ── Input validation guards ──────────────────────────────────────────
  if (pathname.length > MAX_PATH_LENGTH) {
    return jsonResponse({ error: "URI too long" }, 414, request);
  }

  if (method === "POST" || method === "PUT") {
    const contentLength = request.headers.get("Content-Length");
    if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE) {
      return jsonResponse({ error: "Request body too large" }, 413, request);
    }
  }

  if (method === "OPTIONS") {
    return corsResponse(null, { status: 204 }, request);
  }

  const routes = new Map<
    string,
    (request: Request, env: Env, ctx: ExecutionContext, params: RouteParams) => Promise<Response>
  >();

  routes.set("GET /", async () => serveLandingPage());

  // Serve logo from KV
  routes.set("GET /assets/logo.png", async (_request, env) => {
    const data = await env.KNOWLEDGE_STORE.get("ASSETS:vernen-logo.png", "arrayBuffer");
    if (!data) return new Response("Not found", { status: 404 });
    return new Response(data, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=604800, immutable",
      },
    });
  });
  routes.set("GET /dashboard", async (request, env) => {
    // Dashboard requires API key — check query param or Authorization header
    const url = new URL(request.url);
    const queryToken = url.searchParams.get("key");
    const authHeader = request.headers.get("Authorization");
    const headerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
    const token = queryToken || headerToken;

    if (!env.API_KEY || !token || token !== env.API_KEY) {
      return new Response(
        `<!DOCTYPE html><html><head><title>Access Denied</title>
        <style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0e17;color:#e0e6f0;}
        .card{text-align:center;padding:3rem;}h1{margin-bottom:1rem;color:#ef4444;}a{color:#c8a951;}</style></head>
        <body><div class="card"><h1>Access Denied</h1><p>Founder Dashboard requires authentication.</p><a href="/">Return Home</a></div></body></html>`,
        { status: 403, headers: { "Content-Type": "text/html; charset=utf-8" } }
      );
    }

    return serveDashboard();
  });

  // SEO
  routes.set("GET /robots.txt", async () =>
    new Response(
      `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /dashboard\nSitemap: https://compliance.vernenlegal.com/sitemap.xml`,
      { headers: { "Content-Type": "text/plain", "Cache-Control": "public, max-age=86400" } }
    )
  );
  routes.set("GET /sitemap.xml", async () =>
    new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://compliance.vernenlegal.com/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://compliance.vernenlegal.com/#faq</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://compliance.vernenlegal.com/#pricing</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://compliance.vernenlegal.com/legal/terms</loc><changefreq>monthly</changefreq><priority>0.3</priority></url>
  <url><loc>https://compliance.vernenlegal.com/legal/privacy</loc><changefreq>monthly</changefreq><priority>0.3</priority></url>
</urlset>`,
      { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=86400" } }
    )
  );

  // Security.txt (RFC 9116)
  routes.set("GET /.well-known/security.txt", async () =>
    new Response(
      `Contact: mailto:compliance@vernenlegal.com\nExpires: 2027-03-16T00:00:00.000Z\nPreferred-Languages: en\nCanonical: https://compliance.vernenlegal.com/.well-known/security.txt`,
      { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=86400" } }
    )
  );

  // Common crawler/monitor health check redirect
  routes.set("GET /health", async () =>
    new Response(null, {
      status: 301,
      headers: { "Location": "/api/health" },
    })
  );

  // Legal pages
  routes.set("GET /legal/terms", async () => serveTermsOfService());
  routes.set("GET /legal/privacy", async () => servePrivacyPolicy());

  routes.set("GET /api/health", async () =>
    jsonResponse({ status: "healthy", timestamp: new Date().toISOString() })
  );

  // ── PUBLIC: Verification & Rules — The Book is Open ────────────────
  routes.set("GET /verify/:hash", handleVerifyLookup);
  routes.set("GET /api/verification/status", handleVerificationStats);
  routes.set("GET /api/rules", handlePublicRules);
  routes.set("GET /api/rules/categories", handleRuleCategories);
  routes.set("GET /api/rules/states", handleRuleStates);

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
  routes.set("GET /report/:id", handleViewReport);
  routes.set("GET /report/:id/pdf", handleDownloadReportPDF);

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

  // SYNTARA Persona Citizen routes — legal technology & compliance automation (founder-only)
  routes.set("GET /api/syntara/status", handleSyntaraStatus);
  routes.set("GET /api/syntara/health", handleSyntaraHealth);
  routes.set("GET /api/syntara/automation", handleSyntaraAutomation);
  routes.set("GET /api/syntara/quality", handleSyntaraQuality);
  routes.set("GET /api/syntara/deployments", handleSyntaraDeployments);

  // VESTARA Persona Citizen routes — stakeholder communication & capital strategy (founder-only)
  routes.set("GET /api/vestara/status", handleVestaraStatus);
  routes.set("GET /api/vestara/readiness", handleVestaraReadiness);
  routes.set("GET /api/vestara/metrics", handleVestaraMetrics);
  routes.set("GET /api/vestara/narrative", handleVestaraNarrative);

  // METRIQA Persona Citizen routes — performance analytics & growth validation (founder-only)
  routes.set("GET /api/metriqa/status", handleMetriqaStatus);
  routes.set("GET /api/metriqa/dashboard", handleMetriqaDashboard);
  routes.set("GET /api/metriqa/growth", handleMetriqaGrowth);
  routes.set("GET /api/metriqa/economics", handleMetriqaEconomics);

  // CLARIDEX Persona Citizen routes — financial disclosure & reporting standards (founder-only)
  routes.set("GET /api/claridex/status", handleClaridexStatus);
  routes.set("GET /api/claridex/financials", handleClaridexFinancials);
  routes.set("GET /api/claridex/disclosure", handleClaridexDisclosure);
  routes.set("GET /api/claridex/audit-readiness", handleClaridexAuditReadiness);

  // NEXARIS Persona Citizen routes — strategic partnerships & reputation (founder-only)
  routes.set("GET /api/nexaris/status", handleNexarisStatus);
  routes.set("GET /api/nexaris/partnerships", handleNexarisPartnerships);
  routes.set("POST /api/nexaris/evaluate", handleNexarisEvaluate);
  routes.set("GET /api/nexaris/reputation", handleNexarisReputation);

  // FACIALEX Persona Citizen routes — forensic facial examination & photo comparison (founder-only)
  routes.set("GET /api/facialex/status", handleFacialexStatus);
  routes.set("GET /api/facialex/methodology", handleFacialexMethodology);
  routes.set("GET /api/facialex/knowledge", handleFacialexKnowledge);

  // SENTINEL-0 audit system routes — the independent auditor
  routes.set("GET /api/sentinel/status", handleSentinelRoutes.status);
  routes.set("GET /api/sentinel/issues", handleSentinelRoutes.issues);
  routes.set("GET /api/sentinel/gate/:id", handleSentinelRoutes.gate);
  routes.set("GET /api/sentinel/citizens", handleSentinelRoutes.citizens);
  routes.set("GET /api/sentinel/report/:phase", handleSentinelRoutes.report);
  routes.set("POST /api/sentinel/audit/:taskId", handleSentinelRoutes.auditTask);

  // ═══════════════════════════════════════════════════════════════════════════
  // EVENTBUS — Inter-Citizen Communication Layer
  // ═══════════════════════════════════════════════════════════════════════════

  // Publish an event (authenticated)
  routes.set("POST /api/events/publish", async (request, env) => {
    const authErr = authenticate(request, env);
    if (authErr) return authErr;

    const body = await request.json() as {
      source: string;
      eventType: string;
      payload: unknown;
      target?: string;
    };

    if (!body.source || !body.eventType) {
      return jsonResponse({ error: "source and eventType are required" }, 400);
    }

    const result = await EventBus.publish(
      body.source, body.eventType, body.payload ?? {}, env, body.target
    );
    return jsonResponse(result);
  });

  // Get recent events (authenticated)
  routes.set("GET /api/events", async (request, env) => {
    const authErr = authenticate(request, env);
    if (authErr) return authErr;

    const url = new URL(request.url);
    const events = await EventBus.getRecentEvents(env, {
      source: url.searchParams.get("source") ?? undefined,
      target: url.searchParams.get("target") ?? undefined,
      eventType: url.searchParams.get("type") ?? undefined,
      limit: parseInt(url.searchParams.get("limit") ?? "50"),
    });
    return jsonResponse({ events, count: events.length });
  });

  // Get event stats (authenticated)
  routes.set("GET /api/events/stats", async (request, env) => {
    const authErr = authenticate(request, env);
    if (authErr) return authErr;

    const stats = await EventBus.getEventStats(env);
    return jsonResponse({ stats });
  });

  // Get subscription map
  routes.set("GET /api/events/subscriptions", async () => {
    const subs = EventBus.getSubscriptions();
    return jsonResponse({ subscriptions: subs });
  });

  // Get subscriptions for a specific Citizen
  routes.set("GET /api/events/subscriptions/:citizen", async (_req, _env, _ctx, params) => {
    const citizen = params["citizen"]?.toUpperCase() ?? "";
    const events = EventBus.getSubscriptionsForCitizen(citizen);
    return jsonResponse({ citizen, subscribedTo: events });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // CITIZEN DEPLOYMENT ENGINE — the factory that mass-produces Citizens
  // ═══════════════════════════════════════════════════════════════════════════

  // Engine catalog management
  routes.set("GET /api/engine/catalog", handleEngineCatalog);
  routes.set("GET /api/engine/catalog/stats", handleEngineCatalogStats);
  routes.set("GET /api/engine/catalog/:id", handleEngineCatalogById);
  routes.set("POST /api/engine/catalog", handleEngineRegisterSpec);
  routes.set("POST /api/engine/catalog/import", handleEngineImportSpecs);

  // Engine deployment operations
  routes.set("POST /api/engine/deploy", handleEngineDeploy);
  routes.set("POST /api/engine/undeploy", handleEngineUndeploy);
  routes.set("GET /api/engine/deployed", handleEngineDeployed);
  routes.set("GET /api/engine/deployed/:id", handleEngineDeployedById);

  // ═══════════════════════════════════════════════════════════════════════════
  // LEGAL INTELLIGENCE — ported from MCP Intelligence Platform
  // ═══════════════════════════════════════════════════════════════════════════

  // Public endpoints
  routes.set("GET /api/legal/status", handleLegalStatus);
  routes.set("GET /api/legal/practice-areas", handleLegalPracticeAreas);
  routes.set("GET /api/legal/jurisdictions", handleLegalJurisdictions);
  routes.set("GET /api/legal/authority/:practiceArea", handleLegalAuthority);
  routes.set("GET /api/legal/rules/:county", handleLegalRules);

  // Authenticated endpoints (premium features)
  routes.set("POST /api/legal/deadlines", handleLegalDeadlines);
  routes.set("POST /api/legal/motion", handleLegalMotion);
  routes.set("POST /api/legal/conflicts", handleLegalConflicts);

  // ═══════════════════════════════════════════════════════════════════════════
  // AUDIT ENGINE & GUIDED DOCUMENT NAVIGATOR — the revenue product
  // ═══════════════════════════════════════════════════════════════════════════

  // Audit endpoints
  routes.set("POST /api/audit/document", handleAuditDocument);
  routes.set("GET /api/audit/:id", handleGetAudit);
  routes.set("GET /api/audit/:id/findings", handleGetAuditFindings);

  // Forms / GDN endpoints
  routes.set("GET /api/forms", handleListForms);
  routes.set("GET /api/forms/registry", handleFormRegistry);
  routes.set("GET /api/forms/scenarios", handleListScenarios);
  routes.set("GET /api/forms/scenario/:id", handleGetScenario);
  routes.set("GET /api/forms/:code", handleGetFormGuidance);
  routes.set("GET /api/forms/:code/validate", handleValidateFormField);
  routes.set("POST /api/forms/load", handleLoadForms);

  // ═══════════════════════════════════════════════════════════════════════════
  // i18n — 13-Language UI String Bundles
  // ═══════════════════════════════════════════════════════════════════════════

  routes.set("GET /api/i18n/languages", handleI18nLanguages);
  routes.set("GET /api/i18n/:lang/:section", handleI18nSection);
  routes.set("GET /api/i18n/:lang", handleI18nBundle);

  // ═══════════════════════════════════════════════════════════════════════════
  // CITIZEN SKILL REGISTRY — professional competencies owned by Citizens
  // ═══════════════════════════════════════════════════════════════════════════

  routes.set("GET /api/skills", handleGetAllSkills);
  routes.set("GET /api/skills/detail/:slug", handleGetSkillDetail);
  routes.set("GET /api/skills/:citizenName", handleGetCitizenSkills);
  routes.set("POST /api/skills/install", handleInstallSkill);
  routes.set("POST /api/skills/install-batch", handleInstallBatch);
  routes.set("POST /api/skills/match", handleMatchSkill);
  routes.set("GET /api/skills/executions/:citizenName", handleGetExecutions);

  // ═══════════════════════════════════════════════════════════════════════════
  // CITIZEN STANDARDS LIBRARY — governing standards each Citizen measures against
  // ═══════════════════════════════════════════════════════════════════════════

  routes.set("GET /api/standards", handleGetAllStandards);
  routes.set("GET /api/standards/types", handleGetStandardsByType);
  routes.set("GET /api/standards/actionable", handleGetActionableStandards);
  routes.set("GET /api/standards/jurisdiction/:jurisdiction", handleGetStandardsByJurisdiction);
  routes.set("POST /api/standards/seed", handleSeedStandards);
  routes.set("POST /api/standards/cross-reference", handleAddCrossReference);
  routes.set("GET /api/standards/:citizenName", handleGetCitizenStandards);
  routes.set("GET /api/standards/:citizenName/summary", handleGetLibrarySummary);
  routes.set("GET /api/standards/:citizenName/lookup", handleLookupStandard);
  routes.set("GET /api/standards/:citizenName/for-document", handleStandardsForDocument);
  routes.set("GET /api/standards/:citizenName/for-skill/:skillSlug", handleStandardsForSkill);
  routes.set("GET /api/standards/:citizenName/cross-references/:standardId", handleGetCrossReferences);
  routes.set("POST /api/standards/:citizenName/search", handleSearchStandards);

  // ═══════════════════════════════════════════════════════════════════════════
  // FAC INTELLIGENCE — Federal Audit Clearinghouse compliance gap pipeline
  // ═══════════════════════════════════════════════════════════════════════════

  routes.set("GET /api/fac/status", handleFACStatus);
  routes.set("GET /api/fac/discover", handleFACDiscover);
  routes.set("GET /api/fac/pipeline", handleFACPipeline);
  routes.set("GET /api/fac/report/:reportId", handleFACReport);
  routes.set("GET /api/fac/outreach/:reportId", handleFACOutreach);
  routes.set("GET /api/fac/outreach-batch", handleFACOutreachBatch);
  routes.set("GET /api/fac/states", handleFACStates);
  routes.set("GET /api/fac/leads", handleFACLeads);
  routes.set("GET /api/fac/findings/:reportId", handleFACFindings);

  // ═══════════════════════════════════════════════════════════════════════════
  // FEDERAL REGISTER INTELLIGENCE — Regulatory change monitoring pipeline
  // ═══════════════════════════════════════════════════════════════════════════

  routes.set("GET /api/fedreg/status", handleFedRegStatus);
  routes.set("GET /api/fedreg/search", handleFedRegSearch);
  routes.set("GET /api/fedreg/impact", handleFedRegImpact);
  routes.set("GET /api/fedreg/pipeline", handleFedRegPipeline);
  routes.set("GET /api/fedreg/alert/:docNumber", handleFedRegAlert);
  routes.set("GET /api/fedreg/agencies", handleFedRegAgencies);
  routes.set("GET /api/fedreg/leads", handleFedRegLeads);

  // ═══════════════════════════════════════════════════════════════════════════
  // HHS INTELLIGENCE — HIPAA breach portal (Wall of Shame) pipeline
  // ═══════════════════════════════════════════════════════════════════════════

  routes.set("GET /api/hhs/status", handleHHSStatus);
  routes.set("GET /api/hhs/breaches", handleHHSBreaches);
  routes.set("GET /api/hhs/pipeline", handleHHSPipeline);
  routes.set("GET /api/hhs/report/:entityId", handleHHSReport);
  routes.set("GET /api/hhs/states", handleHHSStates);
  routes.set("GET /api/hhs/leads", handleHHSLeads);

  // ═══════════════════════════════════════════════════════════════════════════
  // EDGAR INTELLIGENCE — SEC 8-K material weakness & restatement monitor
  // ═══════════════════════════════════════════════════════════════════════════

  routes.set("GET /api/edgar/status", handleEDGARStatus);
  routes.set("GET /api/edgar/search", handleEDGARSearch);
  routes.set("GET /api/edgar/pipeline", handleEDGARPipeline);
  routes.set("GET /api/edgar/report/:cik", handleEDGARReport);
  routes.set("GET /api/edgar/leads", handleEDGARLeads);

  // ═══════════════════════════════════════════════════════════════════════════
  // SBA INTELLIGENCE — 8(a) Program restatement & OHA appeal pipeline
  // ═══════════════════════════════════════════════════════════════════════════

  routes.set("GET /api/sba/status", handleSBAStatus);
  routes.set("GET /api/sba/discover", handleSBADiscover);
  routes.set("GET /api/sba/pipeline", handleSBAPipeline);
  routes.set("GET /api/sba/report/:uei", handleSBAReport);
  routes.set("GET /api/sba/outreach/:uei", handleSBAOutreach);
  routes.set("GET /api/sba/outreach-batch", handleSBAOutreachBatch);
  routes.set("GET /api/sba/checklist/:uei", handleSBAChecklist);
  routes.set("POST /api/sba/checklist/update", handleSBAChecklistUpdate);
  routes.set("GET /api/sba/appeal-readiness/:uei", handleSBAAppealReadiness);
  routes.set("GET /api/sba/states", handleSBAStates);
  routes.set("GET /api/sba/leads", handleSBALeads);

  // ═══════════════════════════════════════════════════════════════════════════
  // USASPENDING INTELLIGENCE — Federal spending, high-value contracts & grants
  // ═══════════════════════════════════════════════════════════════════════════

  routes.set("GET /api/spending/status", handleSpendingStatus);
  routes.set("GET /api/spending/search", handleSpendingSearch);
  routes.set("GET /api/spending/grants", handleSpendingGrants);
  routes.set("GET /api/spending/pipeline", handleSpendingPipeline);
  routes.set("GET /api/spending/report/:awardId", handleSpendingReport);
  routes.set("GET /api/spending/agencies", handleSpendingAgencies);
  routes.set("GET /api/spending/leads", handleSpendingLeads);

  // ═══════════════════════════════════════════════════════════════════════════
  // RESCUE ENGINE — Automated Rescue Sequence for statutory failures
  // ═══════════════════════════════════════════════════════════════════════════

  routes.set("GET /api/rescue/status", handleRescueStatus);
  routes.set("POST /api/rescue/initiate", handleRescueInitiate);
  routes.set("GET /api/rescue/list", handleRescueList);
  routes.set("POST /api/rescue/deliverable/update", handleRescueDeliverableUpdate);
  routes.set("POST /api/rescue/automate", handleRescueAutomate);
  routes.set("GET /api/rescue/report/:sequenceId", handleRescueReport);
  routes.set("GET /api/rescue/:sequenceId", handleRescueGet);

  // Dynamic Citizen routes — MUST be LAST so they don't override core Citizen routes
  // Evidence & Retention
  routes.set("POST /api/evidence/attest", handleSubmitAttestation);
  routes.set("POST /api/evidence/document", handleSubmitDocument);
  routes.set("POST /api/evidence/verify/:evidenceId", handleVerifyEvidence);
  routes.set("GET /api/evidence/:clientId", handleGetEvidence);
  routes.set("GET /api/evidence/:clientId/summary", handleGetEvidenceSummary);
  routes.set("GET /api/retention/rules", handleGetRetentionRules);
  routes.set("GET /api/retention/lookup", handleRetentionLookup);
  routes.set("GET /api/retention/:clientId/summary", handleRetentionSummary);
  routes.set("POST /api/retention/:documentId/hold", handlePlaceLegalHold);
  routes.set("DELETE /api/retention/:documentId/hold", handleReleaseLegalHold);

  routes.set("GET /api/citizens/:name/:action", handleDynamicCitizenRoute);
  routes.set("POST /api/citizens/:name/:action", handleDynamicCitizenRoute);

  const match = matchRoute(method, pathname, routes);

  if (match) {
    const response = await match.handler(request, env, ctx, match.params);

    // Ensure CORS headers on all responses (origin-aware)
    const origin = getAllowedOrigin(request);
    for (const [key, value] of Object.entries(makeCorsHeaders(origin))) {
      response.headers.set(key, value);
    }

    // Security headers — all responses
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");

    // CSP for HTML responses
    const ct = response.headers.get("Content-Type") ?? "";
    if (ct.includes("text/html")) {
      response.headers.set("Content-Security-Policy", CSP_POLICY);
    }

    // Informational rate-limit headers on landing page to deter scrapers
    if (pathname === "/") {
      response.headers.set("X-RateLimit-Limit", "60");
      response.headers.set("X-RateLimit-Window", "60");
    }

    // Cache-Control for API responses (only if not already set by the handler)
    if (!response.headers.has("Cache-Control") && pathname.startsWith("/api/")) {
      if (method === "GET") {
        // Short TTL for dynamic GET endpoints (health, stats, status)
        const isVolatile = /\/(health|stats|status|events|dashboard)/.test(pathname);
        response.headers.set(
          "Cache-Control",
          isVolatile
            ? "public, max-age=10, s-maxage=10"
            : "public, max-age=60, s-maxage=120"
        );
      } else {
        // No caching for mutations
        response.headers.set("Cache-Control", "no-store");
      }
    }
    return response;
  }

  return jsonResponse({ error: "Not found" }, 404, request);
}

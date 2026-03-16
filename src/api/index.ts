import type { Env } from "../index.js";
import { handleComplianceCheck } from "./compliance.js";
import { handleGetReport } from "./reports.js";
import {
  handleForgeStatus,
  handleForgeLog,
  handleForgeMilestone,
  handleForgeSubmitTask,
} from "./forge.js";
import { authenticate } from "./middleware/auth.js";
import { rateLimit } from "./middleware/rate-limit.js";

export { handleSentinelRoutes } from "./sentinel.js";
export {
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
} from "./regulis.js";

export {
  handlePaymentCheckout,
  handlePaymentWebhook,
  handlePaymentVerify,
  handlePaymentSuccess,
  handlePaymentCancel,
} from "./payments.js";

export {
  handleAdvocisStatus,
  handleAdvocisOnboard,
  handleAdvocisGetClient,
  handleAdvocisOnboarding,
  handleAdvocisFeedback,
  handleAdvocisStats,
  handleAdvocisChurnRisk,
  handleAdvocisInquiry,
} from "./advocis.js";

export {
  handleFiscaraStatus,
  handleFiscaraSummary,
  handleFiscaraRevenueByProduct,
  handleFiscaraRevenueByState,
  handleFiscaraDailyRevenue,
  handleFiscaraTransactions,
  handleFiscaraRecordTransaction,
  handleFiscaraCashFlow,
  handleFiscaraGrowth,
} from "./fiscara.js";

export {
  handleLexarcStatus,
  handleLexarcDocuments,
  handleLexarcGenerate,
  handleLexarcGetDocument,
  handleLexarcProducts,
} from "./lexarc.js";

export { handleIntegraRoutes } from "./integra.js";

export {
  handlePrivaxisStatus,
  handlePrivaxisAudit,
  handlePrivaxisDataflows,
  handlePrivaxisClassification,
  handlePrivaxisDSAR,
  handlePrivaxisSecurity,
  handlePrivaxisSecurityEvents,
} from "./privaxis.js";

export {
  handleVigilusStatus,
  handleVigilusRisks,
  handleVigilusHeatmap,
  handleVigilusAddRisk,
  handleVigilusThreats,
  handleVigilusVendor,
} from "./vigilus.js";

export {
  handleEthicaraStatus,
  handleEthicaraCode,
  handleEthicaraReview,
  handleEthicaraReviews,
  handleEthicaraReport,
  handleEthicaraFairness,
} from "./ethicara.js";

export {
  handleSyntaraStatus,
  handleSyntaraHealth,
  handleSyntaraAutomation,
  handleSyntaraQuality,
  handleSyntaraDeployments,
} from "./syntara.js";

export {
  handleVestaraStatus,
  handleVestaraReadiness,
  handleVestaraMetrics,
  handleVestaraNarrative,
} from "./vestara.js";

export {
  handleMetriqaStatus,
  handleMetriqaDashboard,
  handleMetriqaGrowth,
  handleMetriqaEconomics,
} from "./metriqa.js";

export {
  handleClaridexStatus,
  handleClaridexFinancials,
  handleClaridexDisclosure,
  handleClaridexAuditReadiness,
} from "./claridex.js";

export {
  handleNexarisStatus,
  handleNexarisPartnerships,
  handleNexarisEvaluate,
  handleNexarisReputation,
} from "./nexaris.js";

// Legal Intelligence — ported from MCP Intelligence Platform
export {
  handleLegalStatus,
  handleLegalPracticeAreas,
  handleLegalJurisdictions,
  handleLegalAuthority,
  handleLegalDeadlines,
  handleLegalRules,
  handleLegalMotion,
  handleLegalConflicts,
} from "./legal.js";

// Audit Engine & Guided Document Navigator
export {
  handleAuditDocument,
  handleGetAudit,
  handleGetAuditFindings,
  handleListForms,
  handleGetFormGuidance,
  handleValidateFormField,
  handleListScenarios,
  handleGetScenario,
  handleLoadForms,
} from "./audit.js";

// Citizen Deployment Engine
export {
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
} from "./engine.js";

type RouteParams = Record<string, string>;

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const handleApiRoutes = {
  // ── Compliance ────────────────────────────────────────────
  complianceCheck: async (
    request: Request,
    env: Env,
    _ctx: ExecutionContext,
    _params: RouteParams
  ): Promise<Response> => {
    const authError = authenticate(request, env);
    if (authError) return authError;

    const rateLimitError = await rateLimit(request, env);
    if (rateLimitError) return rateLimitError;

    try {
      return await handleComplianceCheck(request, env);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Compliance check failed";
      return jsonResponse({ error: message }, 500);
    }
  },

  getReport: async (
    request: Request,
    env: Env,
    _ctx: ExecutionContext,
    params: RouteParams
  ): Promise<Response> => {
    const authError = authenticate(request, env);
    if (authError) return authError;

    const rateLimitError = await rateLimit(request, env);
    if (rateLimitError) return rateLimitError;

    const reportId = params["id"];
    if (!reportId) {
      return jsonResponse({ error: "Report ID is required" }, 400);
    }

    try {
      return await handleGetReport(reportId, env);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to retrieve report";
      return jsonResponse({ error: message }, 500);
    }
  },

  // ── FORGE-0 ───────────────────────────────────────────────
  forgeStatus: handleForgeStatus,
  forgeLog: handleForgeLog,
  forgeMilestone: handleForgeMilestone,
  forgeSubmitTask: handleForgeSubmitTask,
};

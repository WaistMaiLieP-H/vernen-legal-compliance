/**
 * Realtime Compliance API
 *
 * Four endpoints that power the live compliance layer across all hardware:
 *   POST /api/realtime/session/start    — begin a session, get a session_id
 *   POST /api/realtime/compliance       — submit a text chunk, get alerts + translation
 *   POST /api/realtime/session/seal     — end the session, hash transcript, anchor to chain
 *   GET  /api/realtime/contexts         — list available compliance contexts + active rules
 *
 * On-device STT feeds text chunks here. Alerts and translations come back.
 * Glasses render the overlay. Earbuds play the audioScript.
 * Everything is CUSTOS-gated. Every session is hashed and anchored.
 */

import type { Env } from "../index.js";
import type { ComplianceContext } from "../types/realtime.js";
import { authenticate } from "./middleware/auth.js";
import { rateLimit } from "./middleware/rate-limit.js";
import { parseJsonBody } from "../utils/helpers.js";
import { RealtimeComplianceEngine } from "../services/realtime-compliance.js";
import { CUSTOS } from "../services/custos.js";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

const VALID_CONTEXTS: ComplianceContext[] = [
  "police-encounter",
  "family-court",
  "cps-visit",
  "custody-exchange",
  "mediation",
  "deposition",
  "dmv-hearing",
  "landlord-tenant",
  "employer-employee",
  "consumer-transaction",
  "ssdi-hearing",
  "immigration",
  "general",
];

/**
 * POST /api/realtime/session/start
 *
 * Start a new live compliance session. Returns a session_id.
 * Call this when the user enters a context (court, police stop, CPS visit, etc.)
 *
 * Body: { context, primaryLang, sourceLang }
 *   context    — one of the VALID_CONTEXTS
 *   primaryLang — language the user wants to receive (ISO 639-1, e.g. "es", "en", "tl")
 *   sourceLang  — language being spoken in the room (ISO 639-1)
 */
export async function handleRealtimeStart(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;

  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  type StartBody = {
    context: ComplianceContext;
    primaryLang?: string;
    sourceLang?: string;
  };
  let body: StartBody;
  try {
    body = await parseJsonBody<StartBody>(request);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Invalid JSON" }, 400);
  }

  if (!body.context || !VALID_CONTEXTS.includes(body.context)) {
    return json({
      error: `context required. Valid values: ${VALID_CONTEXTS.join(", ")}`,
    }, 400);
  }

  const custosToken = CUSTOS.authorize(
    `realtime-session:start:${body.context}`,
    { documentType: body.context, agentCharter: "herald" }
  );

  const engine = new RealtimeComplianceEngine(env);
  const session = await engine.startSession({
    context: body.context,
    primaryLang: body.primaryLang ?? "en",
    sourceLang: body.sourceLang ?? "en",
  });

  CUSTOS.enforce(custosToken, `realtime-session:started:${session.sessionId}`);

  return json({
    sessionId: session.sessionId,
    context: session.context,
    primaryLang: session.primaryLang,
    sourceLang: session.sourceLang,
    startedAt: session.startedAt,
    message: "Session started. Stream text chunks to /api/realtime/compliance.",
  });
}

/**
 * POST /api/realtime/compliance
 *
 * The main streaming endpoint. Submit a text chunk (from on-device STT),
 * receive compliance alerts and translation immediately.
 *
 * Call this every time on-device STT produces a sentence or phrase.
 * Target latency: <300ms round-trip.
 *
 * Body: { sessionId, text }
 */
export async function handleRealtimeCompliance(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;

  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  type ComplianceBody = { sessionId: string; text: string };
  let body: ComplianceBody;
  try {
    body = await parseJsonBody<ComplianceBody>(request);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Invalid JSON" }, 400);
  }

  if (!body.sessionId || !body.text) {
    return json({ error: "sessionId and text required" }, 400);
  }

  const custosToken = CUSTOS.authorize(
    `realtime:compliance:${body.sessionId}`,
    { agentCharter: "herald" }
  );

  const engine = new RealtimeComplianceEngine(env);
  let result;
  try {
    result = await engine.processChunk(body.sessionId, body.text);
  } catch (err) {
    return json({
      error: err instanceof Error ? err.message : "Session not found",
    }, 404);
  }

  CUSTOS.enforce(custosToken, `realtime:compliance:processed:${body.sessionId}`);

  // If critical alerts were detected, emit to webhook immediately
  const hasCritical = result.newAlerts.some(a => a.severity === "CRITICAL");
  if (hasCritical && env.WEBHOOK_URL) {
    fetch(env.WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "critical_compliance_alert",
        sessionId: body.sessionId,
        alerts: result.newAlerts.filter(a => a.severity === "CRITICAL"),
      }),
    }).catch(() => {});
  }

  return json(result);
}

/**
 * POST /api/realtime/session/seal
 *
 * End the session. Hashes the full transcript, anchors to verification chain.
 * Call this when the encounter/hearing/interaction ends.
 *
 * Body: { sessionId }
 */
export async function handleRealtimeSeal(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;

  type SealBody = { sessionId: string };
  let body: SealBody;
  try {
    body = await parseJsonBody<SealBody>(request);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Invalid JSON" }, 400);
  }

  if (!body.sessionId) {
    return json({ error: "sessionId required" }, 400);
  }

  const custosToken = CUSTOS.authorize(
    `realtime:seal:${body.sessionId}`,
    { agentCharter: "herald" }
  );

  const engine = new RealtimeComplianceEngine(env);
  let seal;
  try {
    seal = await engine.sealSession(body.sessionId);
  } catch (err) {
    return json({
      error: err instanceof Error ? err.message : "Session not found",
    }, 404);
  }

  CUSTOS.enforce(custosToken, `realtime:sealed:${body.sessionId}`);

  return json({
    ...seal,
    message: seal.chainSeq
      ? `Session sealed and anchored to chain at seq ${seal.chainSeq}. Transcript hash: ${seal.transcriptHash}`
      : "Session sealed. Transcript hash computed. Chain anchor pending (will retry on next run).",
  });
}

/**
 * GET /api/realtime/contexts
 *
 * Returns the list of available compliance contexts and a summary of
 * active rules for each. Devices use this to build their context selector UI.
 * Public endpoint — no auth required.
 */
export async function handleRealtimeContexts(
  _request: Request,
  _env: Env,
): Promise<Response> {
  return json({
    contexts: VALID_CONTEXTS.map(ctx => ({
      id: ctx,
      label: ctx.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
      description: CONTEXT_DESCRIPTIONS[ctx],
    })),
    total: VALID_CONTEXTS.length,
  });
}

const CONTEXT_DESCRIPTIONS: Record<ComplianceContext, string> = {
  "police-encounter": "4th/5th Amendment rights, Miranda, search consent, dominant aggressor statute",
  "family-court": "FC § 3011 custody factors, DVRO standards, Brady disclosure, ex parte rules",
  "cps-visit": "Warrant requirement for home entry, WIC § 300 removal standards, right to counsel",
  "custody-exchange": "Custody order violations, PC § 278.5 custodial interference, EPO claims",
  "mediation": "CRC 5.220 disclosure, mediator neutrality, DV-sensitive protocols",
  "deposition": "Improper question forms, objection grounds, discovery scope",
  "dmv-hearing": "APS suspension standards, Berlinghieri elements, burden of proof",
  "landlord-tenant": "Retaliatory eviction under Civil Code § 1942.5, habitability standards",
  "employer-employee": "Final wages, wrongful termination, Labor Code rights",
  "consumer-transaction": "UDAP, FTC unfair practices, waiver enforceability",
  "ssdi-hearing": "Five-step sequential evaluation, vocational evidence, RFC standards",
  "immigration": "5th Amendment silence rights, warrant requirements, ICE encounter protocols",
  "general": "Recording rights, general civil procedure",
};

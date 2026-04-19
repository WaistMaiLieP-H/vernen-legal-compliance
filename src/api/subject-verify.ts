/**
 * Subject Verification API — Layer 6
 *
 * Public-facing endpoints for subject verification + the
 * conscientious identity framework.
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { rateLimit } from "./middleware/rate-limit.js";
import { parseJsonBody } from "../utils/helpers.js";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/** POST /api/verify/subject — verify a set of extracted subjects */
export async function handleSubjectVerify(request: Request, env: Env): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;

  type Body = {
    subjects: Array<{
      type: "company" | "person" | "address" | "ein" | "dot_number" | "phone" | "email" | "ip";
      value: string;
      context?: string;
      attributes?: Record<string, string>;
    }>;
    rawDocumentText?: string;
  };

  let body: Body;
  try {
    body = await parseJsonBody<Body>(request);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Invalid JSON" }, 400);
  }

  if (!body.subjects || !Array.isArray(body.subjects)) {
    return json({ error: "subjects array required" }, 400);
  }

  const { SubjectVerificationEngine } = await import("../services/subject-verification.js");
  const engine = new SubjectVerificationEngine(env);
  const report = await engine.verify(body.subjects, body.rawDocumentText);
  return json(report);
}

/** GET /api/verify/identification/:hash — look up an identification claim by provenance hash */
export async function handleIdentificationByHash(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: Record<string, string>
): Promise<Response> {
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const hash = params["hash"] ?? "";
  if (!hash) return json({ error: "provenance hash required" }, 400);

  const { ConscientiousIdentityFramework } = await import("../services/conscientious-identity.js");
  const cif = new ConscientiousIdentityFramework(env);
  const claim = await cif.getClaimByHash(hash);
  if (!claim) return json({ error: "claim not found" }, 404);
  return json(claim);
}

/** POST /api/verify/identification/challenge/:hash — submit a challenge to an identification claim */
export async function handleIdentificationChallenge(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: Record<string, string>
): Promise<Response> {
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const hash = params["hash"] ?? "";
  if (!hash) return json({ error: "provenance hash required" }, 400);

  type Body = {
    submittedBy: string;
    challengeReason: string;
    evidence: string;
  };

  let body: Body;
  try {
    body = await parseJsonBody<Body>(request);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Invalid JSON" }, 400);
  }

  if (!body.submittedBy || !body.challengeReason || !body.evidence) {
    return json({ error: "submittedBy, challengeReason, evidence all required" }, 400);
  }

  const { ConscientiousIdentityFramework } = await import("../services/conscientious-identity.js");
  const cif = new ConscientiousIdentityFramework(env);
  const challenge = await cif.submitChallenge({
    identificationClaimHash: hash,
    submittedBy: body.submittedBy,
    challengeReason: body.challengeReason,
    evidence: body.evidence,
  });
  return json(challenge, 201);
}

/** GET /api/verify/identification/subject/:subject — list all claims for a subject */
export async function handleIdentificationsForSubject(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: Record<string, string>
): Promise<Response> {
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const subject = params["subject"] ?? "";
  if (!subject) return json({ error: "subject required" }, 400);

  const { ConscientiousIdentityFramework } = await import("../services/conscientious-identity.js");
  const cif = new ConscientiousIdentityFramework(env);
  const claims = await cif.getClaimsForSubject(decodeURIComponent(subject));
  return json({
    subject: decodeURIComponent(subject),
    count: claims.length,
    claims,
  });
}

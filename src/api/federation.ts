/**
 * Federation Protocol API — Layer 8
 *
 * Public endpoints for federation manifest, peer registry, attestation
 * exchange, and witness queries.
 *
 * Spec: docs/FEDERATION_PROTOCOL.md
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

/** GET /api/federation/manifest — self-describing identity card (public) */
export async function handleFederationManifest(request: Request, env: Env): Promise<Response> {
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const { FederationProtocol } = await import("../services/federation-protocol.js");
  const fed = new FederationProtocol(env);
  const url = new URL(request.url);
  const manifest = await fed.buildManifest(url.host);
  return json(manifest);
}

/** GET /api/federation/key — this instance's public key (public) */
export async function handleFederationKey(request: Request, env: Env): Promise<Response> {
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const { FederationProtocol } = await import("../services/federation-protocol.js");
  const fed = new FederationProtocol(env);
  const kp = await fed.getOrCreateKeypair();
  return json({
    instance_id: kp.instanceId,
    key_id: kp.keyId,
    public_key: kp.publicKeyJwk,
    algorithm: "ECDSA",
    curve: "P-256",
  });
}

/** GET /api/federation/info — explain the federation protocol */
export async function handleFederationInfo(request: Request, env: Env): Promise<Response> {
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;
  return json({
    layer: "8",
    name: "Federation Protocol",
    description: "Cross-instance witnessing of daily Merkle roots. Each Vernen instance signs other instances' published roots, raising the integrity floor from 'trust the operator' to 'trust that no peer ever cosigns a forged root.'",
    properties: [
      "ECDSA P-256 signing keys (Web Crypto native)",
      "Bilateral cosigning of independently-published Merkle roots",
      "Verifiable witness records anyone can re-check",
      "No consensus protocol, no global ordering — just attribution",
      "Peer manifest discovery via HTTPS only",
    ],
    tamper_detection_paths: [
      "Hash chain (Layer 1) — modification of any historical record",
      "GitHub anchor — operator rewriting both the chain and the daily root",
      "Federation witnesses (Layer 8) — operator rewriting the chain, daily root, AND the GitHub anchor",
    ],
    spec: "https://github.com/WaistMaiLieP-H/vernen-verification-log/blob/main/protocol/FEDERATION_PROTOCOL.md",
    protocol_version: 1,
    endpoints: [
      "GET /api/federation/manifest — self-describing identity card",
      "GET /api/federation/key — this instance's public key",
      "GET /api/federation/info — this endpoint",
      "POST /api/federation/peers — register a peer (auth)",
      "GET /api/federation/peers — list peers",
      "POST /api/federation/attest/:date — sign a peer's daily root (auth)",
      "POST /api/federation/witnesses — store an inbound attestation (auth)",
      "GET /api/federation/witnesses/:date — public witness list for date",
    ],
  });
}

/** POST /api/federation/peers — register a peer (auth required) */
export async function handleFederationAddPeer(request: Request, env: Env): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;

  let body: { name?: string; manifest_url?: string };
  try {
    body = await parseJsonBody<{ name?: string; manifest_url?: string }>(request);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Invalid JSON" }, 400);
  }
  if (!body.name || !body.manifest_url) {
    return json({ error: "name and manifest_url required" }, 400);
  }

  const { FederationProtocol } = await import("../services/federation-protocol.js");
  const fed = new FederationProtocol(env);
  try {
    const peer = await fed.addPeer(body.name, body.manifest_url);
    return json(peer, 201);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "addPeer failed" }, 400);
  }
}

/** GET /api/federation/peers — list known peers */
export async function handleFederationListPeers(request: Request, env: Env): Promise<Response> {
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const { FederationProtocol } = await import("../services/federation-protocol.js");
  const fed = new FederationProtocol(env);
  const peers = await fed.listPeers();
  // Strip nothing — public keys and manifest URLs are intentionally public
  return json({ count: peers.length, peers });
}

/**
 * POST /api/federation/attest/:date — sign a peer's daily root
 *
 * Body: { subject_instance_id, merkle_root }
 *
 * Auth: required (so we don't sign for arbitrary callers)
 */
export async function handleFederationAttest(
  request: Request,
  env: Env,
  _ctx: unknown,
  params: { date?: string }
): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;

  const date = params.date;
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return json({ error: "date path param required (YYYY-MM-DD)" }, 400);
  }

  let body: { subject_instance_id?: string; merkle_root?: string };
  try {
    body = await parseJsonBody<{ subject_instance_id?: string; merkle_root?: string }>(request);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Invalid JSON" }, 400);
  }
  if (!body.subject_instance_id || !body.merkle_root) {
    return json({ error: "subject_instance_id and merkle_root required" }, 400);
  }

  const { FederationProtocol } = await import("../services/federation-protocol.js");
  const fed = new FederationProtocol(env);
  try {
    const att = await fed.attestPeerRoot(body.subject_instance_id, date, body.merkle_root);
    return json(att);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "attestPeerRoot failed" }, 400);
  }
}

/** POST /api/federation/witnesses — store an inbound attestation */
export async function handleFederationStoreWitness(request: Request, env: Env): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;

  let body: unknown;
  try {
    body = await parseJsonBody(request);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Invalid JSON" }, 400);
  }
  if (!body || typeof body !== "object") {
    return json({ error: "attestation object required" }, 400);
  }

  const { FederationProtocol } = await import("../services/federation-protocol.js");
  const fed = new FederationProtocol(env);
  try {
    const stored = await fed.storeIncomingWitness(body as Parameters<typeof fed.storeIncomingWitness>[0]);
    return json(stored, 201);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "storeIncomingWitness failed" }, 400);
  }
}

/** GET /api/federation/witnesses/:date — list witnesses for a date (public) */
export async function handleFederationListWitnesses(
  request: Request,
  env: Env,
  _ctx: unknown,
  params: { date?: string }
): Promise<Response> {
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const date = params.date;
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return json({ error: "date path param required (YYYY-MM-DD)" }, 400);
  }

  const { FederationProtocol } = await import("../services/federation-protocol.js");
  const fed = new FederationProtocol(env);
  const witnesses = await fed.listWitnesses(date);
  return json({ date, count: witnesses.length, witnesses });
}

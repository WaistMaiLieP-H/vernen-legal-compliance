/**
 * Verifiability API — public-facing cryptographic verification endpoints.
 *
 * Backed by VerificationEngine (src/services/verification-engine.ts).
 * See docs/VERIFIABILITY_ARCHITECTURE.md for the full architecture.
 *
 * Auth: read endpoints are public (verifiability is a public good); the
 * full-chain integrity scan is gated behind authenticate() since it's
 * expensive. POST /api/verify/document is rate-limited to prevent abuse.
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { rateLimit } from "./middleware/rate-limit.js";
import { VerificationEngine } from "../services/verification-engine.js";
import { VerificationAnchor } from "../services/verification-anchor.js";
import { parseJsonBody } from "../utils/helpers.js";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/** GET /api/verify/record/:recordId — verify a single record's chain integrity */
export async function handleVerifyRecord(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: Record<string, string>
): Promise<Response> {
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const recordId = params["recordId"] ?? "";
  if (!recordId) return json({ error: "recordId required" }, 400);

  const engine = new VerificationEngine(env);
  try {
    await engine.ensureTables();
    const result = await engine.verifyRecord(recordId);
    if (result.error === "record not found") return json(result, 404);
    return json(result);
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

/** GET /api/verify/merkle/:date — fetch the daily Merkle root for a UTC date */
export async function handleVerifyMerkle(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: Record<string, string>
): Promise<Response> {
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const date = params["date"] ?? "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return json({ error: "date must be YYYY-MM-DD" }, 400);
  }

  const engine = new VerificationEngine(env);
  await engine.ensureTables();

  const row = await env.DB.prepare(
    `SELECT date, merkle_root, record_count, first_seq, last_seq,
            github_commit_sha, github_commit_url, ots_btc_block, computed_at
     FROM verification_merkle_roots WHERE date = ?1`
  )
    .bind(date)
    .first<{
      date: string;
      merkle_root: string;
      record_count: number;
      first_seq: number;
      last_seq: number;
      github_commit_sha: string | null;
      github_commit_url: string | null;
      ots_btc_block: number | null;
      computed_at: string;
    }>();

  if (!row) {
    // Try to compute it on-demand if records exist for that day
    try {
      const computed = await engine.computeDailyRoot(date);
      if (computed.recordCount === 0) {
        return json({ error: "no records for that date", date }, 404);
      }
      return json({
        date,
        merkleRoot: computed.root,
        recordCount: computed.recordCount,
        firstSeq: computed.firstSeq,
        lastSeq: computed.lastSeq,
        githubCommit: null,
        btcBlock: null,
        computedAt: new Date().toISOString(),
        wasJustComputed: true,
      });
    } catch (err) {
      return json({ error: err instanceof Error ? err.message : String(err) }, 500);
    }
  }

  return json({
    date: row.date,
    merkleRoot: row.merkle_root,
    recordCount: row.record_count,
    firstSeq: row.first_seq,
    lastSeq: row.last_seq,
    githubCommit: row.github_commit_url,
    githubCommitSha: row.github_commit_sha,
    btcBlock: row.ots_btc_block,
    computedAt: row.computed_at,
  });
}

/** GET /api/verify/proof/:recordId — fetch Merkle proof path for a record */
export async function handleVerifyProof(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: Record<string, string>
): Promise<Response> {
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const recordId = params["recordId"] ?? "";
  if (!recordId) return json({ error: "recordId required" }, 400);

  const engine = new VerificationEngine(env);
  try {
    await engine.ensureTables();
    const proof = await engine.getMerkleProof(recordId);
    return json({
      recordId,
      merkleRoot: proof.root,
      proofPath: proof.proofPath,
      leafIndex: proof.leafIndex,
    });
  } catch (err) {
    return json(
      { error: err instanceof Error ? err.message : String(err), recordId },
      404
    );
  }
}

/** POST /api/verify/document — hash arbitrary content and check existence */
export async function handleVerifyDocument(request: Request, env: Env): Promise<Response> {
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  let body: { content?: unknown; text?: string };
  try {
    body = await parseJsonBody<{ content?: unknown; text?: string }>(request);
  } catch {
    return json({ error: "JSON body required" }, 400);
  }
  if (!body) return json({ error: "JSON body required" }, 400);

  const payload: Record<string, unknown> =
    body.content !== undefined
      ? (typeof body.content === "object" && body.content !== null
          ? (body.content as Record<string, unknown>)
          : { value: body.content })
      : body.text !== undefined
        ? { text: body.text }
        : {};

  if (Object.keys(payload).length === 0) {
    return json({ error: "must provide 'content' or 'text'" }, 400);
  }

  const engine = new VerificationEngine(env);
  await engine.ensureTables();
  const hash = await engine.canonicalHash(payload);

  // Check if this content_hash has been seen
  const row = await env.DB.prepare(
    `SELECT record_id, seq, created_at, record_type, source_table
     FROM verification_log WHERE content_hash = ?1 ORDER BY seq ASC LIMIT 1`
  )
    .bind(hash)
    .first<{
      record_id: string;
      seq: number;
      created_at: string;
      record_type: string;
      source_table: string;
    }>();

  if (!row) {
    return json({ hash, exists: false, firstSeenAt: null, merkleRoot: null });
  }

  const proof = await env.DB.prepare(
    `SELECT merkle_root FROM verification_proofs WHERE record_id = ?1`
  )
    .bind(row.record_id)
    .first<{ merkle_root: string }>();

  return json({
    hash,
    exists: true,
    firstSeenAt: row.created_at,
    recordId: row.record_id,
    seq: row.seq,
    recordType: row.record_type,
    sourceTable: row.source_table,
    merkleRoot: proof?.merkle_root ?? null,
  });
}

/** GET /api/verify/chain/integrity — admin-only full chain walk */
export async function handleVerifyChainIntegrity(
  request: Request,
  env: Env
): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;

  const engine = new VerificationEngine(env);
  await engine.ensureTables();
  const result = await engine.verifyFullChain();
  return json(result);
}

/** GET /api/verify/build — build attestation: which code version is running */
export async function handleVerifyBuild(request: Request, env: Env): Promise<Response> {
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;
  const { BUILD_ATTESTATION } = await import("../services/verification-anchor.js");
  return json({
    ...BUILD_ATTESTATION,
    runtime: "Cloudflare Workers",
    deployment_url: "https://compliance.vernenlegal.com",
    verification_steps: [
      "1. Fetch each public_source URL above",
      "2. Run sha256sum on each fetched file",
      "3. Compare hashes against the local hashes you compute",
      "4. Match = deployed code is the same as published source",
      "5. For independent witness: query https://web.archive.org/web/2*/compliance.vernenlegal.com/api/verify/build",
    ],
  });
}

/** GET /api/verify/genesis — return the genesis hash and engine version */
export async function handleVerifyGenesis(request: Request, env: Env): Promise<Response> {
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  // Genesis is constant; compute it via canonicalHash on a wrapper.
  // We don't import the constant directly — instead use a stable derivation:
  // hash a known wrapper object that yields the same SHA-256 across systems.
  // The engine uses SHA-256("VERNEN_GENESIS_2026") which we replicate here.
  const seed = "VERNEN_GENESIS_2026";
  const data = new TextEncoder().encode(seed);
  const buf = await crypto.subtle.digest("SHA-256", data);
  const genesisHash = Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return json({
    genesisSeed: seed,
    genesisHash,
    createdAt: "2026-01-01T00:00:00Z",
    version: "1.0.0",
    spec: "docs/VERIFIABILITY_ARCHITECTURE.md",
    // External anchor: the genesis hash exists at the following independent
    // public locations. Anyone can verify the genesis was published before any
    // chain operations occurred. Multi-witness diversity protects against
    // single-anchor compromise or backdating.
    external_anchors: {
      github_genesis_file: "https://raw.githubusercontent.com/WaistMaiLieP-H/vernen-verification-log/main/genesis.json",
      wayback_machine: "https://web.archive.org/web/2*/raw.githubusercontent.com/WaistMaiLieP-H/vernen-verification-log/main/genesis.json",
      first_protocol_commit: "https://github.com/WaistMaiLieP-H/vernen-verification-log/commits/main/genesis.json",
    },
    verification_note:
      "The genesis hash is SHA-256 of the literal string 'VERNEN_GENESIS_2026'. Any party can compute this independently. The hash was first committed to the public verification log repo on 2026-04-07. Wayback Machine snapshots provide independent timestamping witnesses.",
  });
}

/** POST /api/verify/anchor/publish/:date — admin: publish a date's root to GitHub */
export async function handleAnchorPublish(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: Record<string, string>
): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;

  const date = params["date"] ?? "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return json({ error: "date must be YYYY-MM-DD" }, 400);
  }

  const anchor = new VerificationAnchor(env);
  if (!anchor.isConfigured()) {
    return json(
      { error: "GITHUB_TOKEN not configured", anchored: false },
      503
    );
  }

  try {
    const row = await env.DB.prepare(
      `SELECT date, merkle_root, record_count, first_seq, last_seq
       FROM verification_merkle_roots WHERE date = ?1`
    )
      .bind(date)
      .first<{
        date: string;
        merkle_root: string;
        record_count: number;
        first_seq: number;
        last_seq: number;
      }>();

    if (!row) {
      return json(
        { error: `no Merkle root computed for ${date}; run /api/verify/merkle/${date} first` },
        404
      );
    }

    const result = await anchor.publishToGitHub(
      row.date,
      row.merkle_root,
      row.record_count,
      row.first_seq,
      row.last_seq
    );

    if (result.commitSha) {
      await env.DB.prepare(
        `UPDATE verification_merkle_roots
         SET github_commit_sha = ?1, github_commit_url = ?2
         WHERE date = ?3`
      )
        .bind(result.commitSha, result.commitUrl, date)
        .run();
    }

    return json({
      anchored: true,
      date,
      merkleRoot: row.merkle_root,
      commitSha: result.commitSha,
      commitUrl: result.commitUrl,
      fileUrl: result.fileUrl,
    });
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

/** POST /api/verify/anchor/initialize — admin: bootstrap GitHub repo with README/genesis/verify.html */
export async function handleAnchorInitialize(
  request: Request,
  env: Env
): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;

  const anchor = new VerificationAnchor(env);
  if (!anchor.isConfigured()) {
    return json(
      { error: "GITHUB_TOKEN not configured", initialized: false },
      503
    );
  }

  try {
    const repo = await anchor.ensureRepo();
    await anchor.initializeRepo();
    return json({
      initialized: true,
      repoExisted: repo.exists,
      repoUrl: repo.url,
    });
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

/** GET /api/verify/anchor/list — public list of anchored daily roots */
export async function handleAnchorList(
  request: Request,
  env: Env
): Promise<Response> {
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const url = new URL(request.url);
  const limitRaw = url.searchParams.get("limit");
  let limit = limitRaw ? parseInt(limitRaw, 10) : 100;
  if (Number.isNaN(limit) || limit < 1) limit = 100;
  if (limit > 1000) limit = 1000;

  const anchor = new VerificationAnchor(env);
  try {
    const roots = await anchor.getAnchoredRoots(limit);
    return json({
      count: roots.length,
      configured: anchor.isConfigured(),
      anchors: roots,
    });
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

/** GET /api/verify/stats — public verification chain statistics */
export async function handleVerifyStats(request: Request, env: Env): Promise<Response> {
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const engine = new VerificationEngine(env);
  const stats = await engine.getStats();
  return json(stats);
}

/** GET /api/verify/principles — list all constitutional principles in the catalog */
export async function handleVerifyPrinciples(request: Request, env: Env): Promise<Response> {
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;
  const { listAllPrinciples, CONSTITUTIONAL_PRINCIPLES } = await import(
    "../services/constitutional-mapping.js"
  );
  return json({
    categories: Object.keys(CONSTITUTIONAL_PRINCIPLES),
    principles: listAllPrinciples(),
    total: listAllPrinciples().length,
  });
}

/** GET /api/verify/consensus — list all consensus groups */
export async function handleConsensusList(request: Request, env: Env): Promise<Response> {
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;
  const url = new URL(request.url);
  const limit = Math.min(parseInt(url.searchParams.get("limit") ?? "50", 10), 200);
  const { ConsensusEngine } = await import("../services/consensus-engine.js");
  const engine = new ConsensusEngine(env);
  const groups = await engine.listConsensusGroups({ limit });
  return json({ count: groups.length, groups });
}

/** GET /api/verify/consensus/stats — aggregate consensus statistics */
export async function handleConsensusStats(request: Request, env: Env): Promise<Response> {
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;
  const { ConsensusEngine } = await import("../services/consensus-engine.js");
  const engine = new ConsensusEngine(env);
  const stats = await engine.getStats();
  return json(stats);
}

/** GET /api/verify/consensus/:groupId/weighted — full weighted consensus computation */
export async function handleConsensusWeighted(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: Record<string, string>
): Promise<Response> {
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;
  const groupId = params["groupId"] ?? "";
  if (!groupId) return json({ error: "groupId required" }, 400);
  const { ConsensusEngine } = await import("../services/consensus-engine.js");
  const engine = new ConsensusEngine(env);
  const result = await engine.computeConsensus(groupId);
  if (result.memberCount === 0) {
    return json({ error: `consensus group not found: ${groupId}` }, 404);
  }
  return json(result);
}

/** POST /api/verify/consensus/:groupId/finalize — finalize and create event/dispute records */
export async function handleConsensusFinalize(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: Record<string, string>
): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;
  const groupId = params["groupId"] ?? "";
  if (!groupId) return json({ error: "groupId required" }, 400);
  const { ConsensusEngine } = await import("../services/consensus-engine.js");
  const engine = new ConsensusEngine(env);
  const finalized = await engine.finalizeConsensus(groupId);
  return json(finalized);
}

/** GET /api/verify/consensus/:groupId — fetch a cross-model consensus group with signal */
export async function handleVerifyConsensus(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: Record<string, string>
): Promise<Response> {
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const groupId = params["groupId"] ?? "";
  if (!groupId) return json({ error: "groupId required" }, 400);

  const engine = new VerificationEngine(env);
  try {
    const group = await engine.getConsensusGroup(groupId);
    if (group.memberCount === 0) {
      return json({ error: `consensus group not found: ${groupId}` }, 404);
    }
    return json(group);
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

/** POST /api/verify/append — admin endpoint to append a record from any source/model */
export async function handleVerifyAppend(request: Request, env: Env): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;

  type AppendBody = {
    recordId: string;
    recordType: string;
    sourceTable: string;
    sourceId: string;
    content: Record<string, unknown>;
    metadata?: Record<string, unknown>;
    consensusGroupId?: string;
    modelName?: string;
  };
  let body: AppendBody;
  try {
    body = await parseJsonBody<AppendBody>(request);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Invalid JSON" }, 400);
  }

  if (!body.recordId || !body.recordType || !body.sourceTable || !body.sourceId || !body.content) {
    return json({
      error: "recordId, recordType, sourceTable, sourceId, content all required"
    }, 400);
  }

  const engine = new VerificationEngine(env);
  try {
    await engine.ensureTables();
    const result = await engine.appendRecord(body);

    const response = {
      seq: result.seq,
      combinedHash: result.combinedHash,
      contentHash: result.contentHash,
      consensusGroupId: body.consensusGroupId ?? null,
      modelName: body.modelName ?? null,
    };

    // ── WEBHOOK EMISSION ──────────────────────────────────────────────────
    // Fire-and-forget POST to WEBHOOK_URL if configured.
    // This is the integration bridge: glasses, earbuds, attorney tools,
    // court filing systems — any subscriber reacts to audit completion.
    if (env.WEBHOOK_URL) {
      const payload = JSON.stringify({
        event:        "audit_chained",
        seq:          result.seq,
        combinedHash: result.combinedHash,
        contentHash:  result.contentHash,
        sourceId:     body.sourceId,
        recordType:   body.recordType,
        sensitivity:  (body.metadata as Record<string, unknown> | undefined)?.["sensitivity"] ?? "CONFIDENTIAL",
        timestamp:    new Date().toISOString(),
      });
      // Non-blocking — don't await, don't let webhook failure affect the response
      fetch(env.WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      }).catch(() => {/* webhook failure is non-fatal */});
    }
    // ─────────────────────────────────────────────────────────────────────

    return json(response);
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

/**
 * POST /api/verify/annotate — attach a signed annotation to any chain record.
 *
 * The original record is NEVER modified. The annotation becomes its own
 * immutable chain entry with recordType "annotation", referencing the
 * original by seq. This is the formal dispute/counter-record/correction
 * mechanism — any party can annotate, nothing is silenced, nothing is erased.
 *
 * annotationType: "dispute" | "correction" | "clarification" | "counter-record"
 */
export async function handleVerifyAnnotate(
  request: Request,
  env: Env,
): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;

  type AnnotateBody = {
    referenceSeq: number;
    annotationType: string;
    content: Record<string, unknown>;
    annotatorId: string;
  };
  let body: AnnotateBody;
  try {
    body = await parseJsonBody<AnnotateBody>(request);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Invalid JSON" }, 400);
  }

  if (!body.referenceSeq || !body.annotationType || !body.content || !body.annotatorId) {
    return json(
      { error: "referenceSeq, annotationType, content, annotatorId all required" },
      400
    );
  }

  const validTypes = ["dispute", "correction", "clarification", "counter-record"];
  if (!validTypes.includes(body.annotationType)) {
    return json({ error: `annotationType must be one of: ${validTypes.join(", ")}` }, 400);
  }

  // Verify the referenced record exists
  const ref = await env.DB.prepare(
    `SELECT seq, record_id, combined_hash FROM verification_log WHERE seq = ?1`
  )
    .bind(body.referenceSeq)
    .first<{ seq: number; record_id: string; combined_hash: string }>();

  if (!ref) return json({ error: `No chain record found at seq ${body.referenceSeq}` }, 404);

  const engine = new VerificationEngine(env);
  await engine.ensureTables();

  const result = await engine.appendRecord({
    recordId: `annotation:${body.referenceSeq}:${body.annotatorId}:${Date.now()}`,
    recordType: "annotation",
    sourceTable: "verification_log",
    sourceId: String(body.referenceSeq),
    content: {
      referenceSeq:         body.referenceSeq,
      referenceCombinedHash: ref.combined_hash,
      annotationType:       body.annotationType,
      content:              body.content,
      annotatorId:          body.annotatorId,
    },
    metadata: {
      annotationType: body.annotationType,
      referenceSeq:   body.referenceSeq,
      sensitivity:    "CONFIDENTIAL",
    },
    modelName: "deterministic",
  });

  return json({
    seq:                  result.seq,
    combinedHash:         result.combinedHash,
    contentHash:          result.contentHash,
    referenceSeq:         body.referenceSeq,
    referenceCombinedHash: ref.combined_hash,
    annotationType:       body.annotationType,
    message:              "Annotation appended. Original record unchanged.",
  });
}

/**
 * GET /api/verify/chain/by-hash/:hash — look up a chain record by its SHA-256 hash.
 *
 * Accepts either combined_hash or content_hash. Returns the full chain record,
 * its Merkle proof (if computed), and its GitHub anchor (if published).
 * This is the primary endpoint for independent third-party verification —
 * anyone with an audit's output_hash can confirm it is permanently recorded.
 */
export async function handleVerifyByHash(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: Record<string, string>
): Promise<Response> {
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const hash = (params["hash"] ?? "").toLowerCase().trim();
  if (!hash || hash.length < 16) {
    return json({ error: "hash required (content_hash or combined_hash)" }, 400);
  }

  const row = await env.DB.prepare(
    `SELECT seq, record_id, record_type, source_table, source_id,
            content_hash, combined_hash, prev_hash, created_at, metadata, model_name
     FROM verification_log
     WHERE combined_hash = ?1 OR content_hash = ?1
     LIMIT 1`
  )
    .bind(hash)
    .first<{
      seq: number; record_id: string; record_type: string;
      source_table: string; source_id: string;
      content_hash: string; combined_hash: string; prev_hash: string;
      created_at: string; metadata: string; model_name: string | null;
    }>();

  if (!row) {
    return json(
      { verified: false, error: "No chain record found for this hash" },
      404
    );
  }

  // Merkle proof if available
  const proof = await env.DB.prepare(
    `SELECT merkle_root, proof_path, leaf_index, computed_at
     FROM verification_proofs WHERE record_id = ?1`
  )
    .bind(row.record_id)
    .first<{
      merkle_root: string; proof_path: string;
      leaf_index: number; computed_at: string;
    }>();

  // GitHub anchor if Merkle root is known
  const anchor = proof
    ? await env.DB.prepare(
        `SELECT date, github_commit_sha, github_commit_url, ots_btc_block
         FROM verification_merkle_roots WHERE merkle_root = ?1`
      )
        .bind(proof.merkle_root)
        .first<{
          date: string; github_commit_sha: string | null;
          github_commit_url: string | null; ots_btc_block: number | null;
        }>()
    : null;

  // Annotations on this record
  const annotations = await env.DB.prepare(
    `SELECT seq, combined_hash, created_at, metadata
     FROM verification_log
     WHERE record_type = 'annotation' AND source_id = ?1
     ORDER BY seq ASC`
  )
    .bind(String(row.seq))
    .all<{ seq: number; combined_hash: string; created_at: string; metadata: string }>();

  return json({
    verified: true,
    record: {
      ...row,
      metadata: (() => { try { return JSON.parse(row.metadata); } catch { return {}; } })(),
    },
    merkleProof: proof
      ? {
          ...proof,
          proofPath: (() => { try { return JSON.parse(proof.proof_path); } catch { return []; } })(),
        }
      : null,
    githubAnchor: anchor ?? null,
    annotations: (annotations.results ?? []).map(a => ({
      seq: a.seq,
      combinedHash: a.combined_hash,
      createdAt: a.created_at,
      metadata: (() => { try { return JSON.parse(a.metadata); } catch { return {}; } })(),
    })),
  });
}

/** GET /api/verify/by-principle/:principle — list records that invoke a principle */
export async function handleVerifyByPrinciple(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
  params: Record<string, string>
): Promise<Response> {
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  const principle = params["principle"] ?? "";
  if (!principle) return json({ error: "principle parameter required" }, 400);

  // Validate the principle exists
  const { isValidPrinciple, describePrinciple } = await import(
    "../services/constitutional-mapping.js"
  );
  if (!isValidPrinciple(principle)) {
    return json({ error: `unknown principle: ${principle}` }, 404);
  }

  const url = new URL(request.url);
  const limit = Math.min(parseInt(url.searchParams.get("limit") ?? "50", 10), 200);

  // SQLite JSON1 search via metadata field. Use LIKE for portability.
  // Each record stores constitutional.primary and .supporting as JSON arrays.
  const search = `%"${principle}"%`;
  const result = await env.DB.prepare(
    `SELECT seq, record_id, record_type, source_table, source_id, created_at,
            content_hash, combined_hash
     FROM verification_log
     WHERE metadata LIKE ?1
     ORDER BY seq DESC
     LIMIT ?2`
  ).bind(search, limit).all();

  return json({
    principle,
    description: describePrinciple(principle),
    count: (result.results ?? []).length,
    limit,
    records: result.results ?? [],
  });
}

/** POST /api/verify/backfill/compliance-reports — chain historical reports (admin) */
export async function handleVerifyBackfillReports(request: Request, env: Env): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;

  const url = new URL(request.url);
  const limit = Math.min(parseInt(url.searchParams.get("limit") ?? "1000", 10), 5000);

  const engine = new VerificationEngine(env);
  await engine.ensureTables();

  const unchained = await env.DB.prepare(
    `SELECT cr.id, cr.client_id, cr.entity_type, cr.states, cr.total_rules,
            cr.compliant_count, cr.non_compliant_count, cr.needs_review_count, cr.generated_by
     FROM compliance_reports cr
     LEFT JOIN verification_log vl ON vl.source_id = cr.id AND vl.source_table = 'compliance_reports'
     WHERE vl.seq IS NULL
     ORDER BY cr.created_at ASC
     LIMIT ?1`
  ).bind(limit).all<{
    id: string; client_id: string; entity_type: string; states: string;
    total_rules: number; compliant_count: number; non_compliant_count: number;
    needs_review_count: number; generated_by: string;
  }>();

  const rows = unchained.results ?? [];
  let chained = 0;
  let failed = 0;

  for (const row of rows) {
    try {
      const states = JSON.parse(row.states ?? "[]") as string[];
      await engine.appendRecord({
        recordId: row.id,
        recordType: "compliance_report",
        sourceTable: "compliance_reports",
        sourceId: row.id,
        content: {
          clientId: row.client_id,
          entityType: row.entity_type,
          state: states[0] ?? "",
          totalRules: row.total_rules,
          compliantCount: row.compliant_count,
          nonCompliantCount: row.non_compliant_count,
          needsReviewCount: row.needs_review_count,
          generatedBy: row.generated_by,
        },
        metadata: { citizen: row.generated_by },
      });
      chained++;
    } catch {
      failed++;
    }
  }

  return json({
    backfilled: chained,
    failed,
    totalProcessed: rows.length,
    remaining: rows.length === limit ? "more — call again" : 0,
  });
}

/** POST /api/verify/backfill/skill-executions — chain historical executions (admin) */
export async function handleVerifyBackfill(request: Request, env: Env): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;

  const engine = new VerificationEngine(env);
  await engine.ensureTables();

  // Find skill_executions not yet in the chain
  const unchained = await env.DB.prepare(
    `SELECT se.id, se.skill_id, se.citizen_name, se.trigger_type, se.findings_count,
            se.violations_count, se.determination, se.execution_summary
     FROM skill_executions se
     LEFT JOIN verification_log vl ON vl.source_id = se.id AND vl.source_table = 'skill_executions'
     WHERE vl.seq IS NULL
     ORDER BY se.executed_at ASC`
  ).all<{
    id: string;
    skill_id: string;
    citizen_name: string;
    trigger_type: string;
    findings_count: number;
    violations_count: number;
    determination: string;
    execution_summary: string;
  }>();

  const rows = unchained.results ?? [];
  let chained = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const row of rows) {
    try {
      await engine.appendRecord({
        recordId: row.id,
        recordType: "skill_execution",
        sourceTable: "skill_executions",
        sourceId: row.id,
        content: {
          skillId: row.skill_id,
          citizenName: row.citizen_name,
          triggerType: row.trigger_type,
          findingsCount: row.findings_count,
          violationsCount: row.violations_count,
          determination: row.determination,
          executionSummary: row.execution_summary,
        },
        metadata: { citizen: row.citizen_name },
      });
      chained++;
    } catch (e) {
      failed++;
      if (errors.length < 5) errors.push(e instanceof Error ? e.message : String(e));
    }
  }

  return json({
    backfilled: chained,
    failed,
    totalProcessed: rows.length,
    errors: errors.length > 0 ? errors : undefined,
  });
}

/**
 * Zero-Knowledge Primitives API
 *
 * Layer 5a — Pedersen commitments and selective disclosure.
 * Lets clients commit to values privately and verify openings later.
 */

import type { Env } from "../index.js";
import { authenticate } from "./middleware/auth.js";
import { rateLimit } from "./middleware/rate-limit.js";
import { parseJsonBody } from "../utils/helpers.js";
import {
  commitToValue,
  verifyValue,
} from "../services/zk-primitives.js";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/** POST /api/zk/commit — create a Pedersen commitment to a numeric value */
export async function handleZkCommit(request: Request, env: Env): Promise<Response> {
  const authErr = await authenticate(request, env);
  if (authErr) return authErr;

  type CommitBody = { value: number | string };
  let body: CommitBody;
  try {
    body = await parseJsonBody<CommitBody>(request);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Invalid JSON" }, 400);
  }

  if (body.value === undefined || body.value === null) {
    return json({ error: "value required (number or numeric string)" }, 400);
  }
  let value: bigint;
  try {
    value = typeof body.value === "number" ? BigInt(Math.floor(body.value)) : BigInt(body.value);
  } catch {
    return json({ error: "value must be an integer" }, 400);
  }
  if (value < 0n) {
    return json({ error: "value must be non-negative" }, 400);
  }

  try {
    const result = await commitToValue(value);
    return json({
      commitment: result.commitment,
      opening: result.opening,
      note: "Store the opening privately. You only need the commitment to publish — anyone with the commitment + opening can later verify the value.",
    });
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

/** POST /api/zk/verify — verify a Pedersen commitment opening */
export async function handleZkVerify(request: Request, env: Env): Promise<Response> {
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  type VerifyBody = {
    commitment: string;
    opening: { value: string; blinding: string };
  };
  let body: VerifyBody;
  try {
    body = await parseJsonBody<VerifyBody>(request);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Invalid JSON" }, 400);
  }

  if (!body.commitment || !body.opening?.value || !body.opening?.blinding) {
    return json({ error: "commitment and opening { value, blinding } required" }, 400);
  }

  try {
    const valid = await verifyValue(body.commitment, body.opening);
    return json({
      valid,
      commitment: body.commitment,
      revealedValue: valid ? body.opening.value : null,
    });
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
}

/** GET /api/zk/info — describe the ZK primitives available */
export async function handleZkInfo(request: Request, env: Env): Promise<Response> {
  const rlErr = await rateLimit(request, env);
  if (rlErr) return rlErr;

  return json({
    layer: "5a",
    name: "Vernen ZK Primitives",
    curve: "secp256r1 / P-256 (NIST FIPS 186-4)",
    hash: "SHA-256",
    primitives: {
      pedersen_commitment: {
        description: "Hide a value behind a cryptographic commitment. The committer can later prove what the value was, but cannot change it after commitment.",
        endpoints: ["POST /api/zk/commit", "POST /api/zk/verify"],
      },
      schnorr_proof_of_knowledge: {
        description: "Prove knowledge of a secret without revealing it. Used internally by other primitives.",
        endpoints: [],
      },
      merkle_subset_proofs: {
        description: "Reveal a subset of records and prove they belong to the published Merkle root, without revealing the rest.",
        endpoints: ["GET /api/verify/proof/:recordId (existing)"],
        note: "The existing Merkle proof endpoint already supports this. Each proof reveals only the leaf hash and ~13 sibling hashes.",
      },
    },
    not_implemented: {
      bulletproofs: "Range proofs — would need WASM, planned for off-platform prover",
      zk_snarks: "Heavy circuit-based ZK — needs WASM prover, planned for Layer 5b off-platform",
      zk_starks: "Same as SNARKs",
    },
    spec: "https://github.com/WaistMaiLieP-H/vernen-verification-log/blob/main/protocol/SPEC.md",
  });
}

/**
 * Verification API — Public endpoints for compliance verification
 *
 * These endpoints are PUBLIC. Anyone can verify a business.
 * Like pulling a contractor's license — you don't need an account.
 */

import type { Env } from "../index.js";

type RouteParams = Record<string, string>;

/**
 * GET /verify/:hash — Public verification lookup
 * Anyone can check if a business is Vernen Verified.
 */
export async function handleVerifyLookup(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const hash = params.hash;
  if (!hash) {
    return jsonResponse(400, { error: "Verification hash required" });
  }

  try {
    const record = await env.DB.prepare(
      `SELECT
        vr.id,
        vr.verification_hash,
        vr.entity_type,
        vr.states_checked,
        vr.rules_count,
        vr.compliant_count,
        vr.non_compliant_count,
        vr.needs_review_count,
        vr.compliance_score,
        vr.verification_status,
        vr.chain_id,
        vr.chain_tx_hash,
        vr.block_number,
        vr.contract_address,
        vr.verified_by,
        vr.verified_at,
        vr.expires_at,
        vr.is_public
      FROM verification_records vr
      WHERE vr.verification_hash = ? AND vr.is_public = 1`
    )
      .bind(hash)
      .first();

    if (!record) {
      return jsonResponse(404, {
        verified: false,
        error: "No public verification record found for this hash",
      });
    }

    // Check expiry
    const expired =
      record.expires_at && new Date(record.expires_at as string) < new Date();

    return jsonResponse(200, {
      verified: !expired,
      verification: {
        hash: record.verification_hash,
        status: record.verification_status,
        score: record.compliance_score,
        entityType: record.entity_type,
        statesChecked: JSON.parse(record.states_checked as string),
        rulesChecked: record.rules_count,
        compliant: record.compliant_count,
        nonCompliant: record.non_compliant_count,
        needsReview: record.needs_review_count,
        verifiedBy: record.verified_by,
        verifiedAt: record.verified_at,
        expiresAt: record.expires_at,
        expired,
        blockchain: record.chain_tx_hash
          ? {
              chainId: record.chain_id,
              txHash: record.chain_tx_hash,
              blockNumber: record.block_number,
              explorerUrl: record.chain_id === "base-mainnet"
                ? `https://basescan.org/tx/${record.chain_tx_hash}`
                : `https://sepolia.basescan.org/tx/${record.chain_tx_hash}`,
              contractUrl: record.chain_id === "base-mainnet"
                ? "https://basescan.org/address/" + (record.contract_address || "")
                : "https://sepolia.basescan.org/address/" + (record.contract_address || ""),
              immutable: true,
              note: "This verification is permanently recorded on the Base L2 blockchain. The hash on-chain matches the hash from the compliance report. It cannot be altered or deleted.",
            }
          : {
              status: "pending",
              note: "This verification is stored in the Vernen database and queued for on-chain anchoring. Once anchored, it becomes permanently immutable on the Base L2 blockchain.",
            },
      },
    });
  } catch (err) {
    return jsonResponse(500, { error: "Verification lookup failed" });
  }
}

/**
 * GET /api/verification/status — Public stats on total verifications
 * Shows the authority: how many businesses verified, how many rules in the book
 */
export async function handleVerificationStats(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  try {
    const [ruleCount, verificationCount, statusBreakdown] = await Promise.all([
      env.DB.prepare(
        "SELECT COUNT(*) as count FROM compliance_rules WHERE is_active = 1"
      ).first(),
      env.DB.prepare(
        "SELECT COUNT(*) as count FROM verification_records WHERE is_public = 1"
      ).first(),
      env.DB.prepare(
        `SELECT verification_status, COUNT(*) as count
         FROM verification_records WHERE is_public = 1
         GROUP BY verification_status`
      ).all(),
    ]);

    return jsonResponse(200, {
      platform: "Vernen Legal Compliance",
      authority: {
        totalRulesInBook: ruleCount?.count ?? 0,
        totalVerifications: verificationCount?.count ?? 0,
        statusBreakdown: statusBreakdown?.results ?? [],
      },
      message:
        "The book is open. The rules are public. The verification is immutable.",
    });
  } catch {
    return jsonResponse(200, {
      platform: "Vernen Legal Compliance",
      authority: { totalRulesInBook: 0, totalVerifications: 0 },
    });
  }
}

/**
 * GET /api/rules — Public access to the complete rule book
 * This is free. The rules are public. You charge for the inspection, not the book.
 */
export async function handlePublicRules(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  const url = new URL(request.url);
  const state = url.searchParams.get("state");
  const category = url.searchParams.get("category");
  const level = url.searchParams.get("level");
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "50"), 100);
  const offset = (page - 1) * limit;

  try {
    let query = "SELECT id, code, title, description, category, level, state, entity_types, effective_date, source, source_url FROM compliance_rules WHERE is_active = 1";
    const bindings: string[] = [];

    if (state) {
      query += " AND (state = ? OR level = 'FEDERAL')";
      bindings.push(state.toUpperCase());
    }

    if (category) {
      query += " AND category = ?";
      bindings.push(category.toUpperCase());
    }

    if (level) {
      query += " AND level = ?";
      bindings.push(level.toUpperCase());
    }

    query += " ORDER BY level, state, category, code LIMIT ? OFFSET ?";
    const allBindings = [...bindings, limit, offset];

    const results = allBindings.length > 0
      ? await env.DB.prepare(query).bind(...allBindings).all()
      : await env.DB.prepare(query).all();

    // Count query
    const countQuery = "SELECT COUNT(*) as total FROM compliance_rules WHERE is_active = 1"
      + (state ? " AND (state = ? OR level = 'FEDERAL')" : "")
      + (category ? " AND category = ?" : "")
      + (level ? " AND level = ?" : "");
    const countResult = bindings.length > 0
      ? await env.DB.prepare(countQuery).bind(...bindings).first<{ total: number }>()
      : await env.DB.prepare(countQuery).first<{ total: number }>();

    return jsonResponse(200, {
      rules: results.results?.map((r: Record<string, unknown>) => ({
        ...r,
        entity_types: JSON.parse(r.entity_types as string),
      })) ?? [],
      pagination: {
        page,
        limit,
        total: countResult?.total ?? 0,
      },
      message: "The book is open. These are the rules every business must follow.",
    });
  } catch (err) {
    return jsonResponse(500, { error: "Failed to retrieve rules" });
  }
}

/**
 * GET /api/rules/categories — List all rule categories and counts
 */
export async function handleRuleCategories(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  try {
    const results = await env.DB.prepare(
      `SELECT category, level, COUNT(*) as count
       FROM compliance_rules WHERE is_active = 1
       GROUP BY category, level
       ORDER BY category, level`
    ).all();

    return jsonResponse(200, {
      categories: results.results ?? [],
    });
  } catch {
    return jsonResponse(500, { error: "Failed to retrieve categories" });
  }
}

/**
 * GET /api/rules/states — List all states and their rule counts
 */
export async function handleRuleStates(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
  params: RouteParams
): Promise<Response> {
  try {
    const results = await env.DB.prepare(
      `SELECT state, COUNT(*) as count
       FROM compliance_rules WHERE is_active = 1 AND state IS NOT NULL
       GROUP BY state
       ORDER BY state`
    ).all();

    const federal = await env.DB.prepare(
      "SELECT COUNT(*) as count FROM compliance_rules WHERE is_active = 1 AND level = 'FEDERAL'"
    ).first();

    return jsonResponse(200, {
      federal: { count: federal?.count ?? 0 },
      states: results.results ?? [],
    });
  } catch {
    return jsonResponse(500, { error: "Failed to retrieve state data" });
  }
}

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": status === 200 ? "public, max-age=300" : "no-store",
    },
  });
}

/**
 * GET /verify — Public merkle verifier page
 *
 * Self-contained browser page that lets anyone verify a record in the
 * Vernen verification log without trusting Vernen. The page fetches the
 * daily merkle root and the on-chain anchor receipt from the public
 * GitHub repo, then recomputes the merkle root from the user-supplied
 * proof in the browser using SHA-256 and compares to what's on chain.
 */
export async function handleVerifyPage(
  _request: Request,
  _env: Env,
  _ctx: ExecutionContext,
  _params: RouteParams
): Promise<Response> {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Vernen Verification — Trust-Free Verifier</title>
<style>
  :root {
    --bg: #0b0e14; --fg: #e6edf3; --muted: #8b949e; --border: #30363d;
    --ok: #3fb950; --bad: #f85149; --accent: #58a6ff;
  }
  * { box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
    background: var(--bg); color: var(--fg); margin: 0; padding: 2rem 1rem; line-height: 1.5; }
  .wrap { max-width: 780px; margin: 0 auto; }
  h1 { margin-top: 0; font-weight: 600; }
  p.lede { color: var(--muted); }
  label { display: block; margin-top: 1rem; font-size: 0.82rem; color: var(--muted);
    text-transform: uppercase; letter-spacing: 0.05em; }
  input, textarea { width: 100%; background: #161b22; color: var(--fg);
    border: 1px solid var(--border); border-radius: 6px; padding: 0.5rem 0.75rem;
    font-family: ui-monospace, Menlo, Consolas, monospace; font-size: 0.85rem; margin-top: 0.25rem; }
  textarea { min-height: 90px; resize: vertical; }
  button { margin-top: 1.5rem; background: var(--accent); color: #0b0e14; border: none;
    padding: 0.7rem 1.2rem; font-weight: 600; border-radius: 6px; cursor: pointer; font-size: 1rem; }
  button:hover { filter: brightness(1.1); }
  .result { margin-top: 1.5rem; padding: 1rem; border-radius: 6px;
    border: 1px solid var(--border); background: #161b22; display: none;
    font-family: ui-monospace, Menlo, Consolas, monospace; font-size: 0.85rem; word-break: break-all; }
  .result.ok { border-color: var(--ok); }
  .result.bad { border-color: var(--bad); }
  .badge { display: inline-block; padding: 0.2rem 0.6rem; border-radius: 999px;
    font-weight: 700; font-size: 0.85rem; margin-bottom: 0.6rem; }
  .badge.ok { background: var(--ok); color: #0b0e14; }
  .badge.bad { background: var(--bad); color: #0b0e14; }
  small { color: var(--muted); }
  a { color: var(--accent); }
  .chain { margin-top: 0.8rem; padding: 0.6rem; background: #0b0e14; border: 1px solid var(--border); border-radius: 4px; }
  .chain strong { color: var(--accent); }
</style>
</head>
<body>
<div class="wrap">
  <h1>Vernen Trust-Free Verifier</h1>
  <p class="lede">
    Verify a record against the Vernen verification log without trusting Vernen.
    This page fetches the daily Merkle root and the on-chain anchor receipt
    directly from the public GitHub repo. SHA-256 math runs in your browser.
    Trust is the standard. Everyone verifies.
  </p>

  <label for="recordDate">Record date <small>(YYYY-MM-DD; the day the record was logged)</small></label>
  <input id="recordDate" placeholder="2026-04-07" value="2026-04-07">

  <label for="leafHash">Leaf hash <small>(SHA-256 hex of the record's combined_hash)</small></label>
  <input id="leafHash" placeholder="64 hex chars">

  <label for="leafIndex">Leaf index</label>
  <input id="leafIndex" type="number" min="0" placeholder="0">

  <label for="proofPath">Proof path <small>(JSON array of sibling hashes)</small></label>
  <textarea id="proofPath" placeholder='["abc...","def..."]'></textarea>

  <button id="go">Verify</button>
  <div id="result" class="result"></div>

  <p style="margin-top:2rem; font-size:0.82rem; color:var(--muted);">
    Source: <a href="https://github.com/WaistMaiLieP-H/vernen-verification-log">github.com/WaistMaiLieP-H/vernen-verification-log</a>.
    Algorithm: binary Merkle tree, SHA-256 over hex-string concatenation,
    last leaf duplicated on odd levels.
  </p>
</div>

<script>
const GITHUB_RAW = "https://raw.githubusercontent.com/WaistMaiLieP-H/vernen-verification-log/main";

async function sha256Hex(input) {
  const data = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

async function verifyMerkleProof(leafHash, proofPath, leafIndex, expectedRoot) {
  let current = leafHash.toLowerCase();
  let index = leafIndex;
  for (const sibling of proofPath) {
    const left = index % 2 === 0 ? current : sibling.toLowerCase();
    const right = index % 2 === 0 ? sibling.toLowerCase() : current;
    current = await sha256Hex(left + right);
    index = Math.floor(index / 2);
  }
  return { computedRoot: current, ok: current === expectedRoot.toLowerCase() };
}

async function fetchRoot(date) {
  const path = date.replace(/-/g, "/").replace(/^(\\d{4})\\/(\\d{2})\\/(\\d{2})$/, "$1/$2/$3");
  const r = await fetch(\`\${GITHUB_RAW}/\${path}.json\`);
  if (!r.ok) throw new Error("daily root file not found for " + date);
  return r.json();
}

async function fetchAnchor(date) {
  const path = date.replace(/-/g, "/").replace(/^(\\d{4})\\/(\\d{2})\\/(\\d{2})$/, "$1/$2/$3");
  const r = await fetch(\`\${GITHUB_RAW}/\${path}.anchor.json\`);
  if (!r.ok) return null;
  return r.json();
}

document.getElementById("go").addEventListener("click", async () => {
  const out = document.getElementById("result");
  out.style.display = "block";
  out.className = "result";
  out.textContent = "Fetching root and anchor from GitHub...";

  try {
    const date = document.getElementById("recordDate").value.trim();
    const leafHash = document.getElementById("leafHash").value.trim();
    const leafIndex = parseInt(document.getElementById("leafIndex").value, 10);
    const proofPathRaw = document.getElementById("proofPath").value.trim();

    if (!/^\\d{4}-\\d{2}-\\d{2}$/.test(date)) throw new Error("date must be YYYY-MM-DD");
    if (!/^[0-9a-fA-F]{64}$/.test(leafHash)) throw new Error("leaf hash must be 64 hex chars");
    if (Number.isNaN(leafIndex) || leafIndex < 0) throw new Error("leaf index must be >= 0");
    const proofPath = JSON.parse(proofPathRaw);
    if (!Array.isArray(proofPath)) throw new Error("proof path must be JSON array");

    const dailyRoot = await fetchRoot(date);
    const anchor = await fetchAnchor(date);
    const expectedRoot = anchor ? anchor.merkle_root : dailyRoot.merkle_root;
    const verifyingAgainst = anchor ? "ON-CHAIN ANCHOR" : "GITHUB DAILY ROOT";

    const { computedRoot, ok } = await verifyMerkleProof(
      leafHash, proofPath, leafIndex, expectedRoot
    );

    out.className = "result " + (ok ? "ok" : "bad");
    let chainBlock = "";
    if (anchor && ok) {
      chainBlock =
        '<div class="chain">' +
        '<div><strong>Anchored on:</strong> ' + (anchor.chain || "base-mainnet") + '</div>' +
        '<div><strong>Tx hash:</strong> ' + anchor.tx_hash + '</div>' +
        '<div><strong>Basescan:</strong> <a href="' + anchor.basescan_url + '" target="_blank" rel="noopener">' + anchor.basescan_url + '</a></div>' +
        '<div><strong>From wallet:</strong> ' + anchor.from + '</div>' +
        '<div style="margin-top:0.4rem;">This root is permanently recorded in Base L2 block history. It cannot be altered or retracted.</div>' +
        '</div>';
    }
    out.innerHTML =
      '<div class="badge ' + (ok ? "ok" : "bad") + '">' + (ok ? "VERIFIED" : "TAMPERED") + '</div>' +
      "<div><strong>Verifying against:</strong> " + verifyingAgainst + "</div>" +
      "<div><strong>Date:</strong> " + date + "</div>" +
      "<div><strong>Expected root:</strong> 0x" + expectedRoot.replace(/^0x/, "").toLowerCase() + "</div>" +
      "<div><strong>Computed root:</strong> 0x" + computedRoot + "</div>" +
      chainBlock;
  } catch (err) {
    out.className = "result bad";
    out.innerHTML = '<div class="badge bad">ERROR</div><div>' +
      (err && err.message ? err.message : String(err)) + "</div>";
  }
});
</script>
</body>
</html>`;
  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer",
    },
  });
}

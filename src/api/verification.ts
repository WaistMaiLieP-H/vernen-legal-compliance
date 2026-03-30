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

#!/usr/bin/env npx tsx
/**
 * anchor.ts — On-chain anchoring script
 *
 * Reads pending verifications from D1, signs transactions with ethers.js,
 * and submits them to the VernenVerification contract on Base L2.
 *
 * Run manually:  npx tsx scripts/anchor.ts
 * Run on cron:   */5 * * * * cd /path/to/platform && npx tsx scripts/anchor.ts
 *
 * Requires:
 *   CHAIN_PRIVATE_KEY — deployer/verifier private key
 *   CHAIN_CONTRACT_ADDRESS — deployed VernenVerification contract address
 *   CHAIN_RPC_URL — Base L2 RPC endpoint (default: https://mainnet.base.org)
 *   CHAIN_ID — network (default: base-mainnet)
 */

import { ethers } from "ethers";
import { execSync } from "child_process";

// ═══════════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════════

const PRIVATE_KEY = process.env.CHAIN_PRIVATE_KEY || process.env.DEPLOYER_PRIVATE_KEY || "";
const CONTRACT_ADDRESS = process.env.CHAIN_CONTRACT_ADDRESS || "";
const RPC_URL = process.env.CHAIN_RPC_URL || "https://mainnet.base.org";
const DB_NAME = "vernen-legal-compliance";

// Contract ABI (just the functions we need)
const ABI = [
  "function anchor(bytes32 _hash, uint16 _score, uint8 _status, uint32 _rulesChecked, uint40 _timestamp, uint40 _expiresAt) external",
  "function anchorBatch(bytes32[] _hashes, uint16[] _scores, uint8[] _statuses, uint32[] _rulesChecked, uint40[] _timestamps, uint40[] _expiresAts) external",
  "function isAnchored(bytes32 _hash) view returns (bool)",
  "function getCount() view returns (uint256)",
  "event VerificationAnchored(bytes32 indexed hash, uint16 score, uint8 status, uint32 rulesChecked, uint40 timestamp, uint40 expiresAt)",
];

// Status mapping
const STATUS_MAP: Record<string, number> = {
  VERIFIED_COMPLIANT: 0,
  VERIFIED_PARTIAL: 1,
  VERIFIED_NON_COMPLIANT: 2,
  VERIFIED_PENDING_REVIEW: 3,
};

// ═══════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════

async function main() {
  console.log("═══════════════════════════════════════════════════════════");
  console.log("  Vernen Legal Compliance — Chain Anchor");
  console.log("═══════════════════════════════════════════════════════════");

  if (!PRIVATE_KEY) {
    console.error("  ✘ CHAIN_PRIVATE_KEY not set");
    process.exit(1);
  }

  if (!CONTRACT_ADDRESS) {
    console.error("  ✘ CHAIN_CONTRACT_ADDRESS not set");
    process.exit(1);
  }

  // Connect to chain
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

  const network = await provider.getNetwork();
  const balance = await provider.getBalance(wallet.address);

  console.log(`  Network:   ${network.name} (${network.chainId})`);
  console.log(`  Wallet:    ${wallet.address}`);
  console.log(`  Balance:   ${ethers.formatEther(balance)} ETH`);
  console.log(`  Contract:  ${CONTRACT_ADDRESS}`);

  const onChainCount = await contract.getCount();
  console.log(`  On-chain:  ${onChainCount} verifications`);
  console.log("───────────────────────────────────────────────────────────");

  // Read pending verifications from D1 (those without chain_tx_hash)
  const pendingJson = execSync(
    `npx wrangler d1 execute ${DB_NAME} --remote --json --command="SELECT id, verification_hash, compliance_score, verification_status, rules_count, verified_at, expires_at FROM verification_records WHERE chain_tx_hash IS NULL AND is_public = 1 ORDER BY created_at ASC LIMIT 50"`,
    { encoding: "utf-8", cwd: process.cwd() }
  );

  let pending: Array<{
    id: string;
    verification_hash: string;
    compliance_score: number;
    verification_status: string;
    rules_count: number;
    verified_at: string;
    expires_at: string;
  }>;

  try {
    const parsed = JSON.parse(pendingJson);
    pending = parsed[0]?.results || [];
  } catch {
    console.log("  No pending verifications found.");
    return;
  }

  if (pending.length === 0) {
    console.log("  ✓ No pending verifications to anchor.");
    return;
  }

  console.log(`  Found ${pending.length} pending verification(s)`);
  console.log("");

  // Anchor each one
  for (const record of pending) {
    const hash = "0x" + record.verification_hash;
    const score = Math.round(record.compliance_score * 100); // to basis points
    const status = STATUS_MAP[record.verification_status] ?? 3;
    const rulesChecked = record.rules_count;
    const timestamp = Math.floor(new Date(record.verified_at).getTime() / 1000);
    const expiresAt = record.expires_at
      ? Math.floor(new Date(record.expires_at).getTime() / 1000)
      : 0;

    // Check if already anchored
    const alreadyAnchored = await contract.isAnchored(hash);
    if (alreadyAnchored) {
      console.log(`  ⏭  ${record.id} — already anchored`);
      continue;
    }

    console.log(`  ⏳ Anchoring ${record.id}...`);
    console.log(`     Hash:   ${hash.slice(0, 18)}...`);
    console.log(`     Score:  ${record.compliance_score}%`);
    console.log(`     Status: ${record.verification_status}`);

    try {
      const tx = await contract.anchor(
        hash,
        score,
        status,
        rulesChecked,
        timestamp,
        expiresAt
      );

      console.log(`     Tx:     ${tx.hash}`);

      const receipt = await tx.wait();
      console.log(`     Block:  ${receipt.blockNumber}`);
      console.log(`     Gas:    ${receipt.gasUsed.toString()}`);

      // Update D1 with chain info
      const chainId = network.chainId.toString() === "8453" ? "base-mainnet" : "base-sepolia";
      execSync(
        `npx wrangler d1 execute ${DB_NAME} --remote --command="UPDATE verification_records SET chain_id='${chainId}', chain_tx_hash='${tx.hash}', block_number=${receipt.blockNumber}, chain_timestamp='${new Date().toISOString()}', contract_address='${CONTRACT_ADDRESS}' WHERE id='${record.id}'"`,
        { encoding: "utf-8", cwd: process.cwd() }
      );

      console.log(`  ✓  ${record.id} — anchored on-chain`);
      console.log("");
    } catch (err) {
      console.error(`  ✘  ${record.id} — failed: ${err instanceof Error ? err.message : err}`);
    }
  }

  const finalCount = await contract.getCount();
  console.log("───────────────────────────────────────────────────────────");
  console.log(`  Total on-chain verifications: ${finalCount}`);
  console.log("═══════════════════════════════════════════════════════════");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

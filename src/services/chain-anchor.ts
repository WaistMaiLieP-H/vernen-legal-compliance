/**
 * ChainAnchor — Blockchain verification anchoring for Cloudflare Workers
 *
 * Architecture:
 * 1. Worker generates verification hash (VerificationEngine)
 * 2. Worker stores hash in D1 (immediate)
 * 3. Worker queues the hash for on-chain anchoring
 * 4. Anchor script (runs on cron/local) reads queue, signs + submits to Base L2
 * 5. Worker updates D1 with tx hash + block number after confirmation
 *
 * The worker can also READ from the chain (eth_call) for verification lookups.
 * It just can't SIGN transactions (no secp256k1 in Workers runtime).
 *
 * This is the read-side + queue-side. The write-side is scripts/anchor.ts.
 */

// Base L2 configuration
const CHAINS = {
  "base-mainnet": {
    rpcUrl: "https://mainnet.base.org",
    chainId: 8453,
    explorer: "https://basescan.org",
  },
  "base-sepolia": {
    rpcUrl: "https://sepolia.base.org",
    chainId: 84532,
    explorer: "https://sepolia.basescan.org",
  },
} as const;

type ChainName = keyof typeof CHAINS;

interface ChainVerification {
  exists: boolean;
  valid: boolean;
  score: number;
  status: number;
  rulesChecked: number;
  timestamp: number;
  expiresAt: number;
}

export class ChainAnchor {
  private rpcUrl: string;
  private chainId: number;
  private explorer: string;
  private contractAddress: string;

  constructor(contractAddress: string, chain: ChainName = "base-mainnet") {
    this.contractAddress = contractAddress.toLowerCase();
    const config = CHAINS[chain];
    this.rpcUrl = config.rpcUrl;
    this.chainId = config.chainId;
    this.explorer = config.explorer;
  }

  /**
   * Read a verification from the chain (anyone can call this)
   */
  async verify(hash: string): Promise<ChainVerification> {
    // verify(bytes32) selector = keccak256("verify(bytes32)")[:4]
    const selector = "0x8e760afe";
    const paddedHash = (hash.startsWith("0x") ? hash.slice(2) : hash).padStart(64, "0");
    const calldata = selector + paddedHash;

    const result = await this.rpcCall("eth_call", [
      { to: this.contractAddress, data: calldata },
      "latest",
    ]);

    // Decode the ABI-encoded response (7 values)
    if (!result || result === "0x" || result.length < 450) {
      return { exists: false, valid: false, score: 0, status: 3, rulesChecked: 0, timestamp: 0, expiresAt: 0 };
    }

    const hex = result.slice(2); // remove 0x
    const words = [];
    for (let i = 0; i < hex.length; i += 64) {
      words.push(hex.slice(i, i + 64));
    }

    return {
      exists: parseInt(words[0] ?? "0", 16) === 1,
      valid: parseInt(words[1] ?? "0", 16) === 1,
      score: parseInt(words[2] ?? "0", 16),
      status: parseInt(words[3] ?? "0", 16),
      rulesChecked: parseInt(words[4] ?? "0", 16),
      timestamp: parseInt(words[5] ?? "0", 16),
      expiresAt: parseInt(words[6] ?? "0", 16),
    };
  }

  /**
   * Check if a hash is already anchored
   */
  async isAnchored(hash: string): Promise<boolean> {
    // isAnchored(bytes32) = 0xf3291e9f
    const selector = "0xf3291e9f";
    const paddedHash = (hash.startsWith("0x") ? hash.slice(2) : hash).padStart(64, "0");
    const calldata = selector + paddedHash;

    const result = await this.rpcCall("eth_call", [
      { to: this.contractAddress, data: calldata },
      "latest",
    ]);

    return result.endsWith("1");
  }

  /**
   * Get total verification count from contract
   */
  async getCount(): Promise<number> {
    // getCount() = 0xa87d942c
    const result = await this.rpcCall("eth_call", [
      { to: this.contractAddress, data: "0xa87d942c" },
      "latest",
    ]);
    return parseInt(result, 16);
  }

  /**
   * Get explorer URL for a transaction
   */
  getExplorerUrl(txHash: string): string {
    return `${this.explorer}/tx/${txHash}`;
  }

  /**
   * Get explorer URL for the contract
   */
  getContractUrl(): string {
    return `${this.explorer}/address/${this.contractAddress}`;
  }

  /**
   * Make a JSON-RPC call to the chain
   */
  private async rpcCall(method: string, params: unknown[]): Promise<string> {
    const response = await fetch(this.rpcUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method,
        params,
      }),
    });

    const data = (await response.json()) as {
      result?: string;
      error?: { message: string };
    };
    if (data.error) {
      throw new Error(`RPC error: ${data.error.message}`);
    }
    return data.result ?? "0x0";
  }
}

/**
 * KnowledgeStore — Interface to persona knowledge stored in Cloudflare KV.
 * Each Persona Citizen has its own namespace prefix in the shared KV store.
 */
export class KnowledgeStore {
  private kv: KVNamespace;

  constructor(kv: KVNamespace) {
    this.kv = kv;
  }

  /**
   * Get a value by key.
   */
  async get<T = unknown>(key: string): Promise<T | null> {
    const value = await this.kv.get(key, "json");
    return value as T | null;
  }

  /**
   * Store a value with an optional TTL (in seconds).
   */
  async put(key: string, value: unknown, ttlSeconds?: number): Promise<void> {
    const options: KVNamespacePutOptions = {};
    if (ttlSeconds !== undefined) {
      options.expirationTtl = ttlSeconds;
    }
    await this.kv.put(key, JSON.stringify(value), options);
  }

  /**
   * List keys with an optional prefix filter.
   */
  async list(prefix?: string): Promise<string[]> {
    const options: KVNamespaceListOptions = {};
    if (prefix !== undefined) {
      options.prefix = prefix;
    }
    const result = await this.kv.list(options);
    return result.keys.map((k) => k.name);
  }

  /**
   * Get all keys and values scoped to a specific Persona Citizen.
   * Keys are prefixed with "persona:{name}:".
   */
  async getForPersona(personaName: string): Promise<Map<string, unknown>> {
    const prefix = `persona:${personaName}:`;
    const keys = await this.list(prefix);
    const entries = new Map<string, unknown>();

    for (const key of keys) {
      const value = await this.get(key);
      if (value !== null) {
        entries.set(key.slice(prefix.length), value);
      }
    }

    return entries;
  }
}

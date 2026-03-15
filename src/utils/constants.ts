export const APP_NAME = "Vernen Legal Compliance";
export const APP_VERSION = "0.1.0";

export const PERSONA_NAMES = {
  REGULIS: "REGULIS",
  FORGE_0: "FORGE-0",
  SENTINEL_0: "SENTINEL-0",
} as const;

export const WORKER_NAMES = {
  SCAN_1: "SCAN-1",
} as const;

export const RATE_LIMIT_WINDOW_MS = 60_000;
export const RATE_LIMIT_MAX_REQUESTS = 100;

export const API_KEY_HEADER = "Authorization";
export const API_KEY_PREFIX = "Bearer ";

import type { ScanRequest, ScanResult } from "./types.js";
import type { USState } from "../../types/client.js";
import { generateId } from "../../utils/helpers.js";

/**
 * SCAN-1: Regulatory scanner worker — the first worker of REGULIS.
 * Scans federal and state regulatory sources to identify
 * applicable compliance rules and coverage gaps.
 */
export class Scan1Worker {
  async scanState(state: USState, request: ScanRequest): Promise<ScanResult> {
    // State-specific regulatory scanning logic.
    // Will integrate with regulatory data sources per jurisdiction.
    return {
      id: generateId("scan"),
      request: { ...request, state },
      rulesFound: 0,
      gapsIdentified: 0,
      newSinceLastScan: 0,
      scannedAt: new Date().toISOString(),
      scanner: "SCAN-1",
    };
  }

  async scanFederal(request: ScanRequest): Promise<ScanResult> {
    // Federal regulatory scanning — applies to all states.
    return {
      id: generateId("scan"),
      request,
      rulesFound: 0,
      gapsIdentified: 0,
      newSinceLastScan: 0,
      scannedAt: new Date().toISOString(),
      scanner: "SCAN-1",
    };
  }

  async generateGapReport(
    currentResults: ScanResult[],
    previousResults: ScanResult[]
  ): Promise<{ gaps: string[]; newRules: number; removedRules: number }> {
    const currentTotal = currentResults.reduce((sum, r) => sum + r.rulesFound, 0);
    const previousTotal = previousResults.reduce((sum, r) => sum + r.rulesFound, 0);

    return {
      gaps: [],
      newRules: Math.max(0, currentTotal - previousTotal),
      removedRules: Math.max(0, previousTotal - currentTotal),
    };
  }
}

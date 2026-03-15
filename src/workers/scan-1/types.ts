import type { BusinessEntityType, USState } from "../../types/client.js";
import type { ComplianceRuleCategory } from "../../types/compliance.js";

export interface ScanRequest {
  state?: USState;
  entityType: BusinessEntityType;
  categories?: ComplianceRuleCategory[];
  includeUpcoming: boolean;
}

export interface ScanResult {
  id: string;
  request: ScanRequest;
  rulesFound: number;
  gapsIdentified: number;
  newSinceLastScan: number;
  scannedAt: string;
  scanner: string;
}

/**
 * Citizen Routing Engine type definitions.
 *
 * Three layers:
 * 1. RoutingIndex — document → citizen in O(1)
 * 2. ScopeCache — citizen's pre-loaded toolkit
 * 3. Junction — authorized cross-reference workspace
 */

// =============================================================================
// ROUTING INDEX
// =============================================================================

export interface RoutingKey {
  docType: string;
  jurisdiction: string;
  category: string;
}

export interface RoutingResolution {
  citizenName: string;
  skillSlug: string;
  skillId?: string;
  priority: number;
  standardIds: string[];
  crossRefPaths: string[];
}

export interface RoutingIndexEntry extends RoutingKey, RoutingResolution {
  id: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// =============================================================================
// SCOPE CACHE
// =============================================================================

export interface SkillManifestEntry {
  id: string;
  slug: string;
  triggers: string[];
  checklistCount: number;
  standardIds: string[];
  skillType: string;
}

export interface StandardManifestEntry {
  id: string;
  citation: string;
  shortCite?: string;
  standardType: string;
  jurisdiction: string;
  documentTypes: string[];
  requirementsCount: number;
  privateRightOfAction: boolean;
}

export interface CitizenScopeCache {
  citizenName: string;
  skillManifest: Record<string, SkillManifestEntry>;
  standardManifest: Record<string, StandardManifestEntry>;
  routingKeys: RoutingKey[];
  crossRefCitizens: string[];
  skillCount: number;
  standardCount: number;
  routeCount: number;
  cacheVersion: number;
  builtAt: string;
  expiresAt?: string;
  buildDurationMs?: number;
}

// =============================================================================
// JUNCTION REGISTRY (static authorization)
// =============================================================================

export type JunctionDirectionality = "A_TO_B" | "B_TO_A" | "BIDIRECTIONAL";
export type JunctionDataScope = "FINDINGS_ONLY" | "FINDINGS_AND_EVIDENCE" | "FULL_SCOPE";

export interface JunctionRegistryEntry {
  id: string;
  citizenA: string;
  citizenB: string;
  sharedCategories: string[];
  directionality: JunctionDirectionality;
  dataScope: JunctionDataScope;
  justification: string;
  governingStandardId?: string;
  approvedBy?: string;
  isActive: boolean;
  createdAt: string;
}

// =============================================================================
// JUNCTION INSTANCES (dynamic workspace)
// =============================================================================

export type JunctionTriggerType =
  | "AUDIT_FINDING"
  | "DOCUMENT_OVERLAP"
  | "STANDARD_REFERENCE"
  | "EXPLICIT_REQUEST"
  | "RESCUE_SEQUENCE";

export type JunctionStatus = "ACTIVE" | "COMPLETED" | "PROMOTED" | "EXPIRED";

export interface JunctionAuditEntry {
  citizen: string;
  action: string;
  timestamp: string;
  detail?: string;
}

export interface JunctionInstance {
  id: string;
  registryId: string;
  citizenA: string;
  citizenB: string;
  triggerType: JunctionTriggerType;
  triggerSource: string;
  triggerDetail?: Record<string, unknown>;
  sharedArtifacts: string[];
  findings: string[];
  auditTrail: JunctionAuditEntry[];
  status: JunctionStatus;
  promotedTo?: string;
  createdAt: string;
  completedAt?: string;
  expiresAt?: string;
}

// =============================================================================
// ROUTING AUDIT
// =============================================================================

export type ResolutionMethod = "INDEX_HIT" | "FALLBACK_SCAN" | "NO_MATCH";

export interface RoutingAuditEntry {
  id: string;
  docType: string;
  jurisdiction: string;
  category: string;
  resolvedCitizen?: string;
  resolvedSkill?: string;
  resolutionMethod: ResolutionMethod;
  resolutionNs?: number;
  createdAt: string;
}

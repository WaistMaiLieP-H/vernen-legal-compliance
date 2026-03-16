import { PersonaCitizenStatus } from "../types/persona.js";

// ---------------------------------------------------------------------------
// Citizen Catalog Specification Types
// ---------------------------------------------------------------------------

/**
 * The specification for a Citizen in the Universal Catalog.
 * This is the blueprint from which a live Citizen is instantiated.
 */
export interface CitizenSpec {
  /** Unique identifier (e.g., "citizen_lxyz1234") */
  id: string;
  /** Citizen name (e.g., "MEDIVOX") */
  name: string;
  /** Trademark string (e.g., "MEDIVOX™") */
  trademark: string;
  /** Professional domain (e.g., "Clinical Decision Support & Diagnostics") */
  domain: string;
  /** Industry category (e.g., "HEALTHCARE") */
  industry: string;
  /** Sub-category within the industry (e.g., "Cardiology") */
  category: string;
  /** Human-readable description of what this Citizen does */
  description: string;
  /** Etymological derivation of the name */
  derivation: string;
  /** Worker specifications — the Citizen's operational units */
  workers: WorkerSpec[];
  /** Governance affiliation */
  governanceType: "BOARD" | "OVERSIGHT" | "ICT" | "INDEPENDENT";
  /** List of capability tags */
  capabilities: string[];
}

/**
 * A worker specification within a Citizen.
 */
export interface WorkerSpec {
  /** Worker identifier (e.g., "scan-medivox-1") */
  id: string;
  /** Worker name (e.g., "SCAN-MEDIVOX-1") */
  name: string;
  /** What this worker does */
  description: string;
  /** Operational mode */
  mode: "CONTINUOUS" | "EVENT_TRIGGERED" | "SCHEDULED";
  /** Capability tags */
  capabilities: string[];
}

/**
 * A deployed Citizen — a live instance running from a spec.
 */
export interface DeployedCitizen {
  /** The spec this Citizen was deployed from */
  spec: CitizenSpec;
  /** Current lifecycle status */
  status: PersonaCitizenStatus;
  /** ISO timestamp of deployment */
  deployedAt: string;
  /** KV namespace prefix for this Citizen's knowledge store */
  kvPrefix: string;
  /** Base path for this Citizen's API endpoints */
  apiBasePath: string;
  /** Deployment record ID */
  deploymentId: string;
}

/**
 * A request to deploy a Citizen from the catalog.
 */
export interface DeploymentRequest {
  /** Catalog spec ID to deploy from */
  specId?: string;
  /** Or provide the full spec inline */
  spec?: CitizenSpec;
  /** Who is requesting the deployment (must be founder) */
  deployerId: string;
}

/**
 * Result of a deployment operation.
 */
export interface DeploymentResult {
  /** Whether the deployment succeeded */
  success: boolean;
  /** The deployed Citizen's ID */
  citizenId: string;
  /** Base API path for this Citizen */
  apiBasePath: string;
  /** Available endpoints */
  endpoints: string[];
  /** Error message if deployment failed */
  error?: string;
}

/**
 * A catalog entry matching the batch file table format.
 * This is the raw row from the markdown tables in the batch files.
 */
export interface CatalogEntry {
  /** Row number from the inventory */
  number: number;
  /** Citizen name (e.g., "CARDIVEX™") */
  name: string;
  /** Professional domain */
  domain: string;
  /** Etymological derivation */
  derivation: string;
}

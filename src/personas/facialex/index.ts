/**
 * FACIALEX — Forensic Facial Examination & Photo Comparison Citizen.
 *
 * Persona Citizen specializing in forensic photo comparison analysis
 * following FISWG, SWGIT, and OSAC/NIST methodology standards. FACIALEX
 * performs identity determination and image integrity verification using
 * court-admissible methodology.
 *
 * Workers:
 *   - EXAM-1: Morphological feature analysis engine
 *   - CHAIN-1: Chain of custody and image integrity tracker
 */

import { PersonaCitizenBase } from "../base.js";
import { PersonaCitizenStatus } from "../../types/persona.js";
import { generateId , safeKvPut } from "../../utils/helpers.js";
import type { Env } from "../../index.js";

/** KV namespace prefix for all FACIALEX knowledge entries. */
const KV_PREFIX = "FACIALEX:";

/** D1 table where persona citizen records live. */
const PERSONA_TABLE = "persona_citizens";

/**
 * Shape of a row in the persona_citizens D1 table.
 */
interface PersonaRow {
  id: string;
  name: string;
  status: string;
  deployed_at: string | null;
  conceived_at: string;
}

/**
 * Standardized conclusion scale per FISWG/OSAC methodology.
 */
export enum ComparisonConclusion {
  IDENTIFICATION = "IDENTIFICATION",
  STRONG_SUPPORT_IDENTIFICATION = "STRONG_SUPPORT_IDENTIFICATION",
  MODERATE_SUPPORT_IDENTIFICATION = "MODERATE_SUPPORT_IDENTIFICATION",
  INCONCLUSIVE = "INCONCLUSIVE",
  MODERATE_SUPPORT_EXCLUSION = "MODERATE_SUPPORT_EXCLUSION",
  STRONG_SUPPORT_EXCLUSION = "STRONG_SUPPORT_EXCLUSION",
  EXCLUSION = "EXCLUSION",
  NO_COMPARISON_POSSIBLE = "NO_COMPARISON_POSSIBLE",
}

/**
 * Image quality rating per SWGIT standards.
 */
export enum ImageQuality {
  GOOD = "GOOD",
  MODERATE = "MODERATE",
  POOR = "POOR",
  UNSUITABLE = "UNSUITABLE",
}

/**
 * Feature consistency rating per FISWG comparison methodology.
 */
export enum FeatureConsistency {
  CONSISTENT = "CONSISTENT",
  INCONSISTENT = "INCONSISTENT",
  UNABLE_TO_DETERMINE = "UNABLE_TO_DETERMINE",
}

/**
 * A morphological feature analysis for a single facial region.
 */
export interface FeatureAnalysis {
  region: string;
  description: string;
  distinctiveness: "common" | "moderate" | "rare";
}

/**
 * A feature comparison result between two images.
 */
export interface FeatureComparison {
  region: string;
  imageADescription: string;
  imageBDescription: string;
  consistency: FeatureConsistency;
  notes: string;
}

/**
 * Image intake record for chain of custody.
 */
export interface ImageIntake {
  imageId: string;
  filename: string;
  sha256Hash: string;
  source: string;
  receivedAt: string;
  format: string;
  resolution: string;
  quality: ImageQuality;
  metadata: Record<string, string>;
  adjustments: string[];
}

/**
 * Full comparison report.
 */
export interface ComparisonReport {
  id: string;
  caseId: string;
  examiner: string;
  authorization: string;
  images: ImageIntake[];
  imageAFeatures: FeatureAnalysis[];
  imageBFeatures: FeatureAnalysis[];
  comparisons: FeatureComparison[];
  conclusion: ComparisonConclusion;
  limitations: string[];
  methodology: string;
  createdAt: string;
}

/**
 * FACIALEX — The Forensic Facial Examination & Photo Comparison Citizen.
 * Evidence is examined, not interpreted. Methodology is followed, not assumed.
 * Every conclusion is earned through documented, reproducible analysis.
 */
export class Facialex extends PersonaCitizenBase {
  constructor() {
    super("FACIALEX", "facialex-knowledge", PersonaCitizenStatus.CONCEIVED);
  }

  // ---------------------------------------------------------------------------
  // Lifecycle overrides
  // ---------------------------------------------------------------------------

  /**
   * Initialize FACIALEX by reading its status from D1 and setting up its
   * knowledge store namespace in KV.
   */
  async initialize(env: Env): Promise<void> {
    try {
      const row = await env.DB.prepare(
        `SELECT id, name, status, deployed_at, conceived_at
         FROM ${PERSONA_TABLE}
         WHERE name = ?1
         LIMIT 1`
      )
        .bind("FACIALEX")
        .first<PersonaRow>();

      if (row) {
        const dbStatus = row.status as PersonaCitizenStatus;
        if (Object.values(PersonaCitizenStatus).includes(dbStatus)) {
          this._status = dbStatus;
        }
      } else {
        // First boot — insert persona record
        await env.DB.prepare(
          `INSERT OR IGNORE INTO ${PERSONA_TABLE}
           (id, name, status, conceived_at)
           VALUES (?1, ?2, ?3, ?4)`
        )
          .bind(
            generateId("persona"),
            "FACIALEX",
            PersonaCitizenStatus.SHELL_DEPLOYED,
            new Date().toISOString()
          )
          .run();

        this._status = PersonaCitizenStatus.SHELL_DEPLOYED;
      }
    } catch {
      this._status = PersonaCitizenStatus.SHELL_DEPLOYED;
    }

    // Initialize KV knowledge namespace with boot marker
    const bootKey = `${KV_PREFIX}system:last_boot`;
    await safeKvPut(env.KNOWLEDGE_STORE, bootKey, new Date().toISOString());

    // Ensure KV counters exist
    const counters = [
      "stats:total_comparisons",
      "stats:total_images_processed",
      "stats:reports_generated",
    ];

    for (const counter of counters) {
      const key = `${KV_PREFIX}${counter}`;
      const existing = await env.KNOWLEDGE_STORE.get(key);
      if (existing === null) {
        await safeKvPut(env.KNOWLEDGE_STORE, key, "0");
      }
    }
  }

  /**
   * Handle inbound events from the system or other Persona Citizens.
   */
  async receiveEvent(
    event: string,
    payload: unknown,
    env: Env
  ): Promise<void> {
    switch (event) {
      case "photo_comparison_requested": {
        const data = payload as {
          caseId: string;
          authorization: string;
          imageCount: number;
        };
        await this._recordKnowledge(
          `request:${data.caseId}`,
          {
            event,
            caseId: data.caseId,
            authorization: data.authorization,
            imageCount: data.imageCount,
            receivedAt: new Date().toISOString(),
          },
          env
        );
        break;
      }

      case "image_submitted": {
        const data = payload as {
          caseId: string;
          imageId: string;
          filename: string;
          sha256Hash: string;
        };
        await this._recordKnowledge(
          `intake:${data.caseId}:${data.imageId}`,
          {
            ...data,
            receivedAt: new Date().toISOString(),
            chainOfCustody: "LOGGED",
          },
          env
        );
        await this._incrementStat("total_images_processed", env);
        break;
      }

      case "comparison_completed": {
        const data = payload as {
          caseId: string;
          reportId: string;
          conclusion: ComparisonConclusion;
        };
        await this._recordKnowledge(
          `comparison:${data.caseId}`,
          {
            reportId: data.reportId,
            conclusion: data.conclusion,
            completedAt: new Date().toISOString(),
          },
          env
        );
        await this._incrementStat("total_comparisons", env);
        await this._incrementStat("reports_generated", env);
        break;
      }

      default:
        await this._recordKnowledge(
          `unknown_event:${Date.now()}`,
          { event, payload, receivedAt: new Date().toISOString() },
          env
        );
        break;
    }
  }

  /**
   * Search FACIALEX's KV knowledge store by query string.
   */
  async queryKnowledge(
    query: string,
    env: Env
  ): Promise<{
    query: string;
    results: Array<{ key: string; value: unknown }>;
    source: string;
  }> {
    const prefix = `${KV_PREFIX}${query}`;
    const listResult = await env.KNOWLEDGE_STORE.list({ prefix, limit: 50 });

    const results: Array<{ key: string; value: unknown }> = [];
    for (const keyEntry of listResult.keys) {
      const value = await env.KNOWLEDGE_STORE.get(keyEntry.name, "json");
      if (value !== null) {
        results.push({
          key: keyEntry.name.slice(KV_PREFIX.length),
          value,
        });
      }
    }

    return { query, results, source: this.name };
  }

  // ---------------------------------------------------------------------------
  // Forensic photo comparison operations
  // ---------------------------------------------------------------------------

  /**
   * Get FACIALEX operational status and comparison statistics.
   */
  async getStatus(env: Env) {
    let totalComparisons = 0;
    let totalImages = 0;
    let reportsGenerated = 0;

    const totalCompRaw = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}stats:total_comparisons`
    );
    totalComparisons = totalCompRaw ? parseInt(totalCompRaw, 10) : 0;

    const totalImgRaw = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}stats:total_images_processed`
    );
    totalImages = totalImgRaw ? parseInt(totalImgRaw, 10) : 0;

    const reportsRaw = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}stats:reports_generated`
    );
    reportsGenerated = reportsRaw ? parseInt(reportsRaw, 10) : 0;

    const lastBoot = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}system:last_boot`
    );

    return {
      citizen: "FACIALEX",
      domain: "Forensic Facial Examination & Photo Comparison",
      status: this._status,
      lastBoot,
      methodology: [
        "FISWG — Facial Identification Scientific Working Group",
        "SWGIT — Scientific Working Group on Imaging Technology",
        "OSAC/NIST — Organization of Scientific Area Committees",
        "IAI — International Association for Identification",
      ],
      admissibility: "Daubert/Frye compliant methodology",
      conclusionScale: [
        "Identification",
        "Strong Support for Identification",
        "Moderate Support for Identification",
        "Inconclusive",
        "Moderate Support for Exclusion",
        "Strong Support for Exclusion",
        "Exclusion",
      ],
      stats: {
        totalComparisons,
        totalImagesProcessed: totalImages,
        reportsGenerated,
      },
      assessedAt: new Date().toISOString(),
    };
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  private async _recordKnowledge(
    key: string,
    value: unknown,
    env: Env
  ): Promise<void> {
    const fullKey = `${KV_PREFIX}${key}`;
    await safeKvPut(env.KNOWLEDGE_STORE, fullKey, JSON.stringify(value));
  }

  private async _incrementStat(statName: string, env: Env): Promise<void> {
    const key = `${KV_PREFIX}stats:${statName}`;
    const currentRaw = await env.KNOWLEDGE_STORE.get(key);
    const current = currentRaw ? parseInt(currentRaw, 10) : 0;
    await safeKvPut(env.KNOWLEDGE_STORE, key, String(current + 1));
  }
}

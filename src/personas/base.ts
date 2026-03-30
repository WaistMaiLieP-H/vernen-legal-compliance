import { PersonaCitizenStatus } from "../types/persona.js";
import type { CitizenSkill } from "../types/skill.js";
import { CITIZEN_SKILL_ASSIGNMENTS } from "../types/skill.js";
import type { GoverningStandard } from "../types/standard.js";
import { runProof, stampOutput } from "../services/proof.js";
import type { ProofResult, ProofContext } from "../services/proof.js";
import { runProtection, ProtectionVerdict } from "../services/protection.js";
import type { ProtectionResult } from "../services/protection.js";
import { createTrustRecord, persistTrustRecord } from "../services/trust.js";
import type { TrustRecord } from "../services/trust.js";
export { ProofVerdict } from "../services/proof.js";
export { ProtectionVerdict } from "../services/protection.js";
export type { ProofResult, ProofContext } from "../services/proof.js";
export type { ProtectionResult } from "../services/protection.js";
export type { TrustRecord } from "../services/trust.js";

/**
 * Valid status transitions for a Persona Citizen's lifecycle.
 * Each status can only advance to specific next states.
 */
const VALID_TRANSITIONS: Record<PersonaCitizenStatus, PersonaCitizenStatus[]> = {
  [PersonaCitizenStatus.CONCEIVED]: [PersonaCitizenStatus.SHELL_DEPLOYED],
  [PersonaCitizenStatus.SHELL_DEPLOYED]: [PersonaCitizenStatus.WORKERS_ACTIVE],
  [PersonaCitizenStatus.WORKERS_ACTIVE]: [PersonaCitizenStatus.KNOWLEDGE_ACCRUING],
  [PersonaCitizenStatus.KNOWLEDGE_ACCRUING]: [PersonaCitizenStatus.AUTONOMOUS],
  [PersonaCitizenStatus.AUTONOMOUS]: [PersonaCitizenStatus.CERTIFIED],
  [PersonaCitizenStatus.CERTIFIED]: [],
};

/**
 * Base class for all Persona Citizens in the Vernen ecosystem.
 * Every Persona Citizen has a name, a lifecycle status, a knowledge store,
 * and a set of professional skills they own and exercise.
 *
 * Skills are a Citizen's professional competencies — the standards they know,
 * the checklists they execute, the output formats they produce. A Citizen
 * without skills is CONCEIVED. A Citizen with active skills is building
 * toward AUTONOMOUS.
 */
export abstract class PersonaCitizenBase {
  readonly name: string;
  protected _status: PersonaCitizenStatus;
  readonly knowledgeStoreId: string;

  /** Cached skills loaded from the registry at initialization. */
  protected _skills: CitizenSkill[] = [];

  /** Cached governing standards loaded from the standards library. */
  protected _standards: GoverningStandard[] = [];

  constructor(
    name: string,
    knowledgeStoreId: string,
    status: PersonaCitizenStatus = PersonaCitizenStatus.CONCEIVED
  ) {
    this.name = name;
    this.knowledgeStoreId = knowledgeStoreId;
    this._status = status;
  }

  get status(): PersonaCitizenStatus {
    return this._status;
  }

  /**
   * The skill slugs this Citizen is authorized to own.
   * Derived from the canonical CITIZEN_SKILL_ASSIGNMENTS registry.
   */
  get assignedSkillSlugs(): string[] {
    return CITIZEN_SKILL_ASSIGNMENTS[this.name] ?? [];
  }

  /**
   * The skills currently loaded and available to this Citizen.
   */
  get skills(): CitizenSkill[] {
    return this._skills;
  }

  /**
   * Check if this Citizen has a specific skill.
   */
  hasSkill(skillSlug: string): boolean {
    return this._skills.some((s) => s.skillSlug === skillSlug);
  }

  /**
   * Get a specific skill by slug. Returns null if not owned.
   */
  getSkill(skillSlug: string): CitizenSkill | null {
    return this._skills.find((s) => s.skillSlug === skillSlug) ?? null;
  }

  /**
   * Load skills from the registry into this Citizen's cache.
   * Called during initialization to hydrate the Citizen's competencies.
   */
  async loadSkills(env: unknown): Promise<void> {
    const typedEnv = env as { DB: { prepare: (q: string) => { bind: (...args: unknown[]) => { all: () => Promise<{ success: boolean; results?: Record<string, unknown>[] }> } } } };
    try {
      const result = await typedEnv.DB.prepare(
        `SELECT * FROM citizen_skills WHERE citizen_name = ?1 AND is_active = 1`
      ).bind(this.name).all();

      if (result.success && result.results) {
        this._skills = result.results.map((row) => ({
          id: row.id as string,
          citizenName: row.citizen_name as string,
          skillSlug: row.skill_slug as string,
          name: row.name as string,
          description: row.description as string,
          skillType: row.skill_type as CitizenSkill["skillType"],
          governingStandards: JSON.parse((row.governing_standards as string) || "[]"),
          auditTriggers: JSON.parse((row.audit_triggers as string) || "[]"),
          auditChecklist: JSON.parse((row.audit_checklist as string) || "[]"),
          outputProtocol: (row.output_protocol as string) || "",
          crossReferences: JSON.parse((row.cross_references as string) || "[]"),
          skillContent: row.skill_content as string,
          version: row.version as number,
          isActive: (row.is_active as number) === 1,
          installedAt: row.installed_at as string,
          updatedAt: row.updated_at as string,
        }));
      }
    } catch {
      // Skills table may not exist yet — gracefully degrade
      this._skills = [];
    }
  }

  /**
   * The governing standards this Citizen has in their reference library.
   */
  get standards(): GoverningStandard[] {
    return this._standards;
  }

  /**
   * Load governing standards from D1 into this Citizen's cache.
   * Called during initialization to hydrate the Citizen's reference library.
   */
  async loadStandards(env: unknown): Promise<void> {
    const typedEnv = env as { DB: { prepare: (q: string) => { bind: (...args: unknown[]) => { all: () => Promise<{ success: boolean; results?: Record<string, unknown>[] }> } } } };
    try {
      const result = await typedEnv.DB.prepare(
        `SELECT * FROM governing_standards WHERE citizen_name = ?1 AND is_active = 1`
      ).bind(this.name).all();

      if (result.success && result.results) {
        this._standards = result.results.map((row) => ({
          id: row.id as string,
          citizenName: row.citizen_name as string,
          standardType: row.standard_type as GoverningStandard["standardType"],
          jurisdiction: row.jurisdiction as string,
          citation: row.citation as string,
          shortCite: row.short_cite as string | undefined,
          title: row.title as string,
          description: row.description as string,
          requirements: JSON.parse((row.requirements as string) || "[]"),
          keySections: JSON.parse((row.key_sections as string) || "[]"),
          documentTypes: JSON.parse((row.document_types as string) || "[]"),
          skillSlugs: JSON.parse((row.skill_slugs as string) || "[]"),
          enforcementBody: row.enforcement_body as string | undefined,
          enforcementUrl: row.enforcement_url as string | undefined,
          privateRightOfAction: (row.private_right_of_action as number) === 1,
          statuteOfLimitations: row.statute_of_limitations as string | undefined,
          damagesAvailable: row.damages_available ? JSON.parse(row.damages_available as string) : undefined,
          effectiveDate: row.effective_date as string | undefined,
          lastAmended: row.last_amended as string | undefined,
          sourceUrl: row.source_url as string | undefined,
          isActive: (row.is_active as number) === 1,
          createdAt: row.created_at as string,
          updatedAt: row.updated_at as string,
        }));
      }
    } catch {
      this._standards = [];
    }
  }

  /**
   * Find all standards applicable to a given document type.
   */
  findStandardsForDocument(documentType: string): GoverningStandard[] {
    const docLower = documentType.toLowerCase();
    return this._standards.filter((std) =>
      std.documentTypes.some((dt) => dt.toLowerCase().includes(docLower) || docLower.includes(dt.toLowerCase()))
    );
  }

  /**
   * Look up a standard by citation or short cite.
   */
  lookupStandard(citation: string): GoverningStandard | null {
    const citeLower = citation.toLowerCase();
    return this._standards.find((std) =>
      std.citation.toLowerCase().includes(citeLower) ||
      (std.shortCite && std.shortCite.toLowerCase().includes(citeLower))
    ) ?? null;
  }

  /**
   * Check if a trigger matches any of this Citizen's skills.
   * Used for automatic skill activation.
   */
  matchSkillByTrigger(trigger: string): CitizenSkill | null {
    const triggerLower = trigger.toLowerCase();
    for (const skill of this._skills) {
      for (const t of skill.auditTriggers) {
        if (t.toLowerCase().includes(triggerLower) || triggerLower.includes(t.toLowerCase())) {
          return skill;
        }
      }
    }
    return null;
  }

  // ═══════════════════════════════════════════════════════════════════════
  // PROTECTION → PROOF → TRUST — The integrity pipeline
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Run PROTECTION on input before processing.
   * Scans for PII exposure, injection attempts, volume anomalies.
   * Returns CLEAR, SANITIZED, or REJECTED.
   *
   * If REJECTED, the Citizen MUST NOT process the input.
   */
  protect(
    operationType: string,
    input: Record<string, unknown>,
    clientId?: string,
  ): ProtectionResult {
    return runProtection(this.name, operationType, input, clientId);
  }

  /**
   * Create a TRUST record after work is complete.
   * Hash-verified audit trail linking input → protection → output → proof.
   * Proves what went in, what was checked, what came out, and that it's unmodified.
   */
  async trust(
    operationType: string,
    input: Record<string, unknown>,
    output: Record<string, unknown>,
    protection?: ProtectionResult,
    proof?: ProofResult,
    clientId?: string,
    startTime?: number,
    env?: unknown,
  ): Promise<TrustRecord> {
    const record = await createTrustRecord(
      this.name,
      operationType,
      input,
      output,
      protection,
      proof,
      clientId,
      [], // standardsCited — populated by Citizen if tracking
      undefined, // previousTrustId — chain linking comes later
      startTime,
    );

    // Persist if DB available
    if (env) {
      const typedEnv = env as { DB: { prepare: (q: string) => { bind: (...args: unknown[]) => { run: () => Promise<unknown> } } } };
      await persistTrustRecord(record, typedEnv);
    }

    // Stamp the output with trust metadata
    (output as Record<string, unknown>)._trust = {
      id: record.id,
      combinedHash: record.combinedHash,
      inputHash: record.inputHash,
      outputHash: record.outputHash,
      proofVerdict: record.proofVerdict,
      protectionVerdict: record.protectionVerdict,
      standardsConsulted: record.standardsConsulted,
      timestamp: record.createdAt,
    };

    return record;
  }

  // ═══════════════════════════════════════════════════════════════════════
  // PROOF — Pre-Release Output Oversight and Finalization
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Run a PROOF pass on output before it leaves this Citizen.
   * Checks against this Citizen's governing standards, attempts self-correction,
   * and stamps the output with verification metadata.
   *
   * Every Citizen inherits this. No output ships without PROOF.
   *
   * @param outputType - "compliance_report", "onboarding", "audit_finding", etc.
   * @param output - The output object (mutated in place if corrections made)
   * @param context - Optional jurisdiction/entity type for targeted checks
   * @returns ProofResult with verdict and deficiency details
   */
  proof(
    outputType: string,
    output: Record<string, unknown>,
    context?: ProofContext,
  ): ProofResult {
    const result = runProof(this.name, outputType, output, this._standards, context);
    stampOutput(output, result);
    return result;
  }

  /**
   * Initialize the Persona Citizen — called once when first deployed.
   * Accepts an optional environment binding for accessing D1/KV resources.
   */
  abstract initialize(env?: unknown): Promise<void>;

  /**
   * Receive and process an event from the system or other Persona Citizens.
   * Accepts an optional environment binding for accessing D1/KV resources.
   */
  abstract receiveEvent(event: string, payload: unknown, env?: unknown): Promise<void>;

  /**
   * Query the Persona Citizen's knowledge store.
   * Accepts an optional environment binding for accessing D1/KV resources.
   */
  abstract queryKnowledge(query: string, env?: unknown): Promise<unknown>;

  /**
   * Transition to a new lifecycle status.
   * Validates that the transition is allowed before applying it.
   */
  evolve(newStatus: PersonaCitizenStatus): void {
    const allowedTransitions = VALID_TRANSITIONS[this._status];

    if (!allowedTransitions.includes(newStatus)) {
      throw new Error(
        `Invalid status transition for ${this.name}: ` +
        `${this._status} -> ${newStatus}. ` +
        `Allowed: [${allowedTransitions.join(", ")}]`
      );
    }

    this._status = newStatus;
  }
}

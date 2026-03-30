import type {
  GoverningStandard,
  StandardCrossReference,
  StandardApplication,
  KeySection,
  DamagesAvailable,
} from "../types/standard.js";
import { StandardType, Determination, Severity } from "../types/standard.js";
import { generateId ,safeKvPut} from "../utils/helpers.js";
import type { Env } from "../index.js";

/**
 * StandardsLibrary — Each Citizen's authoritative reference database.
 *
 * This is where a Citizen looks up the law. When REGULIS audits a CAD log,
 * it doesn't just "know" POST DLD standards from its skill markdown — it
 * queries its standards library for the specific citation, requirements,
 * enforcement body, and remedies.
 *
 * Standards are the SoC (Standard of Creation) for every document a Citizen
 * touches. They answer: "What was the standard this document was supposed
 * to meet?" and "What happens when it doesn't?"
 */
export class StandardsLibrary {

  /**
   * Add a governing standard to a Citizen's library.
   */
  async addStandard(standard: Omit<GoverningStandard, "id" | "createdAt" | "updatedAt">, env: Env): Promise<GoverningStandard> {
    const record: GoverningStandard = {
      ...standard,
      id: generateId("std"),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await env.DB.prepare(
      `INSERT OR REPLACE INTO governing_standards
       (id, citizen_name, standard_type, jurisdiction, citation, short_cite, title,
        description, requirements, key_sections, document_types, skill_slugs,
        enforcement_body, enforcement_url, private_right_of_action,
        statute_of_limitations, damages_available, effective_date, last_amended,
        source_url, is_active, created_at, updated_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18, ?19, ?20, ?21, ?22, ?22)`
    ).bind(
      record.id,
      record.citizenName,
      record.standardType,
      record.jurisdiction,
      record.citation,
      record.shortCite ?? null,
      record.title,
      record.description,
      JSON.stringify(record.requirements),
      JSON.stringify(record.keySections),
      JSON.stringify(record.documentTypes),
      JSON.stringify(record.skillSlugs),
      record.enforcementBody ?? null,
      record.enforcementUrl ?? null,
      record.privateRightOfAction ? 1 : 0,
      record.statuteOfLimitations ?? null,
      record.damagesAvailable ? JSON.stringify(record.damagesAvailable) : null,
      record.effectiveDate ?? null,
      record.lastAmended ?? null,
      record.sourceUrl ?? null,
      record.isActive ? 1 : 0,
      record.createdAt
    ).run();

    // Cache in KV for fast lookup
    const kvKey = `STANDARDS:${record.citizenName}:${record.citation}`;
    await safeKvPut(env.KNOWLEDGE_STORE, kvKey, JSON.stringify(record));

    return record;
  }

  /**
   * Seed a Citizen's entire standards library from a structured array.
   */
  async seedCitizenLibrary(
    citizenName: string,
    standards: Array<Omit<GoverningStandard, "id" | "citizenName" | "createdAt" | "updatedAt" | "isActive">>,
    env: Env
  ): Promise<{ seeded: number; errors: number }> {
    let seeded = 0;
    let errors = 0;

    for (const std of standards) {
      try {
        await this.addStandard({ ...std, citizenName, isActive: true }, env);
        seeded++;
      } catch (err) {
        console.error(`Failed to seed standard ${std.citation}:`, err);
        errors++;
      }
    }

    return { seeded, errors };
  }

  /**
   * Get all standards owned by a Citizen.
   */
  async getCitizenStandards(citizenName: string, env: Env): Promise<GoverningStandard[]> {
    const result = await env.DB.prepare(
      `SELECT * FROM governing_standards WHERE citizen_name = ?1 AND is_active = 1 ORDER BY standard_type, citation`
    ).bind(citizenName).all();

    if (!result.success || !result.results) return [];
    return result.results.map((r) => this.rowToStandard(r as Record<string, unknown>));
  }

  /**
   * Look up a specific standard by citation.
   */
  async lookupByCitation(citizenName: string, citation: string, env: Env): Promise<GoverningStandard | null> {
    const row = await env.DB.prepare(
      `SELECT * FROM governing_standards WHERE citizen_name = ?1 AND (citation LIKE ?2 OR short_cite LIKE ?2) LIMIT 1`
    ).bind(citizenName, `%${citation}%`).first();

    if (!row) return null;
    return this.rowToStandard(row as Record<string, unknown>);
  }

  /**
   * Find all standards applicable to a document type.
   */
  async findByDocumentType(citizenName: string, documentType: string, env: Env): Promise<GoverningStandard[]> {
    const all = await this.getCitizenStandards(citizenName, env);
    const docLower = documentType.toLowerCase();

    return all.filter((std) =>
      std.documentTypes.some((dt) => dt.toLowerCase().includes(docLower) || docLower.includes(dt.toLowerCase()))
    );
  }

  /**
   * Find standards by type (FEDERAL_STATUTE, CASE_LAW, etc.)
   */
  async findByType(citizenName: string, standardType: StandardType, env: Env): Promise<GoverningStandard[]> {
    const result = await env.DB.prepare(
      `SELECT * FROM governing_standards WHERE citizen_name = ?1 AND standard_type = ?2 AND is_active = 1 ORDER BY citation`
    ).bind(citizenName, standardType).all();

    if (!result.success || !result.results) return [];
    return result.results.map((r) => this.rowToStandard(r as Record<string, unknown>));
  }

  /**
   * Find standards associated with a specific skill.
   */
  async findBySkill(citizenName: string, skillSlug: string, env: Env): Promise<GoverningStandard[]> {
    const all = await this.getCitizenStandards(citizenName, env);
    return all.filter((std) => std.skillSlugs.includes(skillSlug));
  }

  /**
   * Add a cross-reference between two standards.
   */
  async addCrossReference(
    standardId: string,
    relatedStandardId: string,
    relationshipType: StandardCrossReference["relationshipType"],
    env: Env,
    notes?: string
  ): Promise<StandardCrossReference> {
    const record: StandardCrossReference = {
      id: generateId("xref"),
      standardId,
      relatedStandardId,
      relationshipType,
      notes,
      createdAt: new Date().toISOString(),
    };

    await env.DB.prepare(
      `INSERT INTO standard_cross_references (id, standard_id, related_standard_id, relationship_type, notes, created_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6)`
    ).bind(record.id, record.standardId, record.relatedStandardId, record.relationshipType, record.notes ?? null, record.createdAt).run();

    return record;
  }

  /**
   * Get cross-references for a standard.
   */
  async getCrossReferences(standardId: string, env: Env): Promise<Array<{ reference: StandardCrossReference; standard: GoverningStandard }>> {
    const result = await env.DB.prepare(
      `SELECT xr.*, gs.* FROM standard_cross_references xr
       JOIN governing_standards gs ON gs.id = xr.related_standard_id
       WHERE xr.standard_id = ?1`
    ).bind(standardId).all();

    if (!result.success || !result.results) return [];

    return result.results.map((row) => {
      const r = row as Record<string, unknown>;
      return {
        reference: {
          id: r.id as string,
          standardId: r.standard_id as string,
          relatedStandardId: r.related_standard_id as string,
          relationshipType: r.relationship_type as StandardCrossReference["relationshipType"],
          notes: r.notes as string | undefined,
          createdAt: r.created_at as string,
        },
        standard: this.rowToStandard(r),
      };
    });
  }

  /**
   * Log when a Citizen applies a standard to a document.
   */
  async logApplication(
    application: Omit<StandardApplication, "id" | "appliedAt">,
    env: Env
  ): Promise<StandardApplication> {
    const record: StandardApplication = {
      ...application,
      id: generateId("sapp"),
      appliedAt: new Date().toISOString(),
    };

    await env.DB.prepare(
      `INSERT INTO standard_applications
       (id, standard_id, citizen_name, skill_execution_id, document_type, determination, finding, severity, applied_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)`
    ).bind(
      record.id, record.standardId, record.citizenName,
      record.skillExecutionId ?? null, record.documentType ?? null,
      record.determination, record.finding ?? null, record.severity, record.appliedAt
    ).run();

    return record;
  }

  /**
   * Get a Citizen's library summary — how many standards by type, jurisdiction.
   */
  async getLibrarySummary(citizenName: string, env: Env): Promise<{
    citizenName: string;
    totalStandards: number;
    byType: Record<string, number>;
    byJurisdiction: Record<string, number>;
    withPrivateAction: number;
    applicationCount: number;
  }> {
    const standards = await this.getCitizenStandards(citizenName, env);

    const byType: Record<string, number> = {};
    const byJurisdiction: Record<string, number> = {};
    let withPrivateAction = 0;

    for (const std of standards) {
      byType[std.standardType] = (byType[std.standardType] ?? 0) + 1;
      byJurisdiction[std.jurisdiction] = (byJurisdiction[std.jurisdiction] ?? 0) + 1;
      if (std.privateRightOfAction) withPrivateAction++;
    }

    // Count applications
    let applicationCount = 0;
    try {
      const row = await env.DB.prepare(
        `SELECT COUNT(*) as count FROM standard_applications WHERE citizen_name = ?1`
      ).bind(citizenName).first<{ count: number }>();
      applicationCount = row?.count ?? 0;
    } catch { /* table may not exist yet */ }

    return { citizenName, totalStandards: standards.length, byType, byJurisdiction, withPrivateAction, applicationCount };
  }

  /**
   * Full-text search across a Citizen's standards.
   */
  async search(citizenName: string, query: string, env: Env): Promise<GoverningStandard[]> {
    const queryLower = query.toLowerCase();
    const all = await this.getCitizenStandards(citizenName, env);

    return all.filter((std) => {
      const searchable = `${std.citation} ${std.shortCite ?? ""} ${std.title} ${std.description} ${std.requirements.join(" ")}`.toLowerCase();
      return searchable.includes(queryLower);
    });
  }

  // ---------------------------------------------------------------------------
  // Private
  // ---------------------------------------------------------------------------

  private rowToStandard(row: Record<string, unknown>): GoverningStandard {
    return {
      id: row.id as string,
      citizenName: row.citizen_name as string,
      standardType: row.standard_type as StandardType,
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
    };
  }
}

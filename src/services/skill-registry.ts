import type { CitizenSkill, SkillExecution, ChecklistItem } from "../types/skill.js";
import { SkillType, CITIZEN_SKILL_ASSIGNMENTS } from "../types/skill.js";
import { generateId ,safeKvPut} from "../utils/helpers.js";
import type { Env } from "../index.js";

/**
 * SkillRegistry — The authoritative system for Citizen skill management.
 *
 * Citizens don't just "have" skills — they OWN them. A skill is a professional
 * competency: the standards a Citizen knows, the checklists they execute, the
 * output formats they produce. Skills are what make a Citizen capable.
 *
 * The registry handles:
 * 1. Installing skills (parsing SKILL.md into structured data)
 * 2. Assigning skills to their owning Citizen
 * 3. Looking up which skills a Citizen has
 * 4. Logging when a Citizen exercises a skill
 * 5. Cross-referencing skills across Citizens for collaboration
 */
export class SkillRegistry {

  /**
   * Install a skill from its SKILL.md content and assign it to the appropriate Citizen.
   */
  async installSkill(
    skillSlug: string,
    skillContent: string,
    env: Env
  ): Promise<CitizenSkill> {
    const parsed = this.parseSkillMd(skillSlug, skillContent);

    // Determine which Citizen owns this skill
    const citizenName = this.resolveOwner(skillSlug);
    parsed.citizenName = citizenName;

    // Persist to D1
    await env.DB.prepare(
      `INSERT OR REPLACE INTO citizen_skills
       (id, citizen_name, skill_slug, name, description, skill_type,
        governing_standards, audit_triggers, audit_checklist, output_protocol,
        cross_references, skill_content, version, is_active, installed_at, updated_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, 1, ?14, ?14)`
    ).bind(
      parsed.id,
      parsed.citizenName,
      parsed.skillSlug,
      parsed.name,
      parsed.description,
      parsed.skillType,
      JSON.stringify(parsed.governingStandards),
      JSON.stringify(parsed.auditTriggers),
      JSON.stringify(parsed.auditChecklist),
      parsed.outputProtocol,
      JSON.stringify(parsed.crossReferences),
      parsed.skillContent,
      parsed.version,
      new Date().toISOString()
    ).run();

    // Also store in KV for fast retrieval
    const kvKey = `SKILL:${citizenName}:${skillSlug}`;
    await safeKvPut(env.KNOWLEDGE_STORE, kvKey, JSON.stringify(parsed));

    return parsed;
  }

  /**
   * Install all skills from a batch of SKILL.md files.
   * Returns a manifest of what was installed and to which Citizen.
   */
  async installBatch(
    skills: Array<{ slug: string; content: string }>,
    env: Env
  ): Promise<{ installed: CitizenSkill[]; errors: Array<{ slug: string; error: string }> }> {
    const installed: CitizenSkill[] = [];
    const errors: Array<{ slug: string; error: string }> = [];

    for (const { slug, content } of skills) {
      try {
        const skill = await this.installSkill(slug, content, env);
        installed.push(skill);
      } catch (err) {
        errors.push({ slug, error: String(err) });
      }
    }

    return { installed, errors };
  }

  /**
   * Get all skills owned by a specific Citizen.
   */
  async getSkillsForCitizen(citizenName: string, env: Env): Promise<CitizenSkill[]> {
    const result = await env.DB.prepare(
      `SELECT * FROM citizen_skills WHERE citizen_name = ?1 AND is_active = 1 ORDER BY name`
    ).bind(citizenName).all();

    if (!result.success || !result.results) return [];

    return result.results.map((row) => this.rowToSkill(row as Record<string, unknown>));
  }

  /**
   * Get a specific skill by slug.
   */
  async getSkill(skillSlug: string, env: Env): Promise<CitizenSkill | null> {
    const row = await env.DB.prepare(
      `SELECT * FROM citizen_skills WHERE skill_slug = ?1 LIMIT 1`
    ).bind(skillSlug).first();

    if (!row) return null;
    return this.rowToSkill(row as Record<string, unknown>);
  }

  /**
   * Get the complete skill inventory across all Citizens.
   */
  async getFullInventory(env: Env): Promise<Record<string, CitizenSkill[]>> {
    const result = await env.DB.prepare(
      `SELECT * FROM citizen_skills WHERE is_active = 1 ORDER BY citizen_name, name`
    ).all();

    if (!result.success || !result.results) return {};

    const inventory: Record<string, CitizenSkill[]> = {};
    for (const row of result.results) {
      const skill = this.rowToSkill(row as Record<string, unknown>);
      const key = skill.citizenName;
      if (!inventory[key]) {
        inventory[key] = [];
      }
      inventory[key]!.push(skill);
    }

    return inventory;
  }

  /**
   * Log a skill execution — called when a Citizen exercises one of their skills.
   */
  async logExecution(execution: Omit<SkillExecution, "id" | "executedAt">, env: Env): Promise<SkillExecution> {
    const record: SkillExecution = {
      ...execution,
      id: generateId("skex"),
      executedAt: new Date().toISOString(),
    };

    await env.DB.prepare(
      `INSERT INTO skill_executions
       (id, skill_id, citizen_name, trigger_type, input_document_type,
        findings_count, violations_count, determination, execution_summary,
        duration_ms, executed_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11)`
    ).bind(
      record.id,
      record.skillId,
      record.citizenName,
      record.triggerType,
      record.inputDocumentType ?? null,
      record.findingsCount,
      record.violationsCount,
      record.determination ?? null,
      record.executionSummary ?? null,
      record.durationMs ?? null,
      record.executedAt
    ).run();

    return record;
  }

  /**
   * Get execution history for a Citizen or skill.
   */
  async getExecutionHistory(
    filter: { citizenName?: string; skillId?: string; limit?: number },
    env: Env
  ): Promise<SkillExecution[]> {
    const parts: string[] = ["SELECT * FROM skill_executions WHERE 1=1"];
    const binds: unknown[] = [];
    let bindIdx = 1;

    if (filter.citizenName) {
      parts.push(`AND citizen_name = ?${bindIdx++}`);
      binds.push(filter.citizenName);
    }
    if (filter.skillId) {
      parts.push(`AND skill_id = ?${bindIdx++}`);
      binds.push(filter.skillId);
    }

    parts.push(`ORDER BY executed_at DESC LIMIT ?${bindIdx}`);
    binds.push(filter.limit ?? 50);

    const stmt = env.DB.prepare(parts.join(" "));
    const result = await stmt.bind(...binds).all();

    if (!result.success || !result.results) return [];

    return result.results.map((row) => ({
      id: row.id as string,
      skillId: row.skill_id as string,
      citizenName: row.citizen_name as string,
      triggerType: row.trigger_type as string,
      inputDocumentType: row.input_document_type as string | undefined,
      findingsCount: row.findings_count as number,
      violationsCount: row.violations_count as number,
      determination: row.determination as string | undefined,
      executionSummary: row.execution_summary as string | undefined,
      durationMs: row.duration_ms as number | undefined,
      executedAt: row.executed_at as string,
    }));
  }

  /**
   * Find which Citizen can handle a given document type or trigger.
   * Used for automatic routing — "who should audit this?"
   */
  async findSkillByTrigger(trigger: string, env: Env): Promise<CitizenSkill[]> {
    const triggerLower = trigger.toLowerCase();
    const result = await env.DB.prepare(
      `SELECT * FROM citizen_skills WHERE is_active = 1`
    ).all();

    if (!result.success || !result.results) return [];

    const matches: CitizenSkill[] = [];
    for (const row of result.results) {
      const skill = this.rowToSkill(row as Record<string, unknown>);
      const triggersMatch = skill.auditTriggers.some(
        (t) => t.toLowerCase().includes(triggerLower) || triggerLower.includes(t.toLowerCase())
      );
      if (triggersMatch) {
        matches.push(skill);
      }
    }

    return matches;
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  /**
   * Determine which Citizen owns a skill based on the canonical assignment map.
   */
  private resolveOwner(skillSlug: string): string {
    for (const [citizen, slugs] of Object.entries(CITIZEN_SKILL_ASSIGNMENTS)) {
      if (slugs.includes(skillSlug)) {
        return citizen;
      }
    }
    // Default unassigned skills to INTEGRA (internal compliance handles intake)
    return "INTEGRA";
  }

  /**
   * Parse a SKILL.md file into structured CitizenSkill data.
   */
  private parseSkillMd(slug: string, content: string): CitizenSkill {
    // Extract frontmatter
    const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
    let name = slug;
    let description = "";

    if (fmMatch && fmMatch[1]) {
      const fm = fmMatch[1];
      const nameMatch = fm.match(/name:\s*(.+)/);
      if (nameMatch && nameMatch[1]) name = nameMatch[1].trim();

      // Description can be single line or multi-line (using > or |)
      const descMatch = fm.match(/description:\s*(?:>\s*\n([\s\S]*?)(?=\n\w|\n---)|(.+))/);
      if (descMatch) {
        description = (descMatch[1] || descMatch[2] || "").trim().replace(/\n\s+/g, " ");
      }
    }

    // Extract governing standards
    const standards = this.extractSection(content, "Governing Standards");
    const standardLines = standards
      .split("\n")
      .filter((l) => l.startsWith("-") || l.startsWith("*"))
      .map((l) => l.replace(/^[-*]\s*/, "").trim())
      .filter(Boolean);

    // Extract audit triggers
    const triggers = this.extractSection(content, "Audit Triggers")
      || this.extractSection(content, "Activation Trigger");
    const triggerLines = triggers
      .split("\n")
      .filter((l) => l.startsWith("-") || l.startsWith("*"))
      .map((l) => l.replace(/^[-*]\s*/, "").trim())
      .filter(Boolean);

    // Extract checklist items
    const checklist = this.extractSection(content, "Audit Checklist")
      || this.extractSection(content, "Audit Framework")
      || this.extractSection(content, "Framework");
    const checklistItems = this.parseChecklist(checklist);

    // Extract output protocol
    const outputProtocol = this.extractSection(content, "Output Protocol")
      || this.extractSection(content, "Output Format")
      || "";

    // Extract cross-references
    const crossRefs = this.extractSection(content, "Cross-Reference")
      || this.extractSection(content, "Cross-Reference Skills")
      || this.extractSection(content, "Integration with Other Skills")
      || "";
    const crossRefSlugs = crossRefs
      .split("\n")
      .filter((l) => l.startsWith("-") || l.startsWith("*"))
      .map((l) => {
        const match = l.match(/(\S+-\S+(?:-\S+)*)/);
        return match?.[1] ? match[1].toLowerCase() : "";
      })
      .filter(Boolean);

    // Classify skill type
    const skillType = this.classifySkillType(slug, description);

    return {
      id: generateId("skill"),
      citizenName: "", // Set by resolveOwner
      skillSlug: slug,
      name,
      description,
      skillType,
      governingStandards: standardLines,
      auditTriggers: triggerLines,
      auditChecklist: checklistItems,
      outputProtocol,
      crossReferences: crossRefSlugs,
      skillContent: content,
      version: 1,
      isActive: true,
      installedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  /**
   * Extract a named section from markdown content.
   */
  private extractSection(content: string, heading: string): string {
    // Match ## heading or ### heading
    const pattern = new RegExp(
      `#{2,3}\\s+${heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?\\n([\\s\\S]*?)(?=\\n#{2,3}\\s|$)`,
      "i"
    );
    const match = content.match(pattern);
    return match?.[1] ? match[1].trim() : "";
  }

  /**
   * Parse checklist markdown into structured items.
   */
  private parseChecklist(content: string): ChecklistItem[] {
    const items: ChecklistItem[] = [];
    const lines = content.split("\n");
    let gate = 0;

    for (const line of lines) {
      const checkMatch = line.match(/^[-*]\s*\[[ x]\]\s*(.+)/);
      const numberedMatch = line.match(/^\d+\.\s+(.+)/);

      if (checkMatch?.[1] || numberedMatch?.[1]) {
        gate++;
        const desc = (checkMatch?.[1] ?? numberedMatch?.[1] ?? "").trim();
        // Extract standard citation if present
        const stdMatch = desc.match(/(?:per|under|per\s+)\s+((?:CRC|CCP|Fam\.\s*Code|WIC|PC|GC|HSC|BPC|CIV|FIN)\s+(?:section\s+)?\d+[\w.]*)/i);

        items.push({
          id: generateId("chk"),
          gate,
          description: desc,
          required: true,
          standard: stdMatch ? stdMatch[1] : undefined,
        });
      }
    }

    return items;
  }

  /**
   * Classify a skill into its type based on slug and description.
   */
  private classifySkillType(slug: string, description: string): SkillType {
    const combined = `${slug} ${description}`.toLowerCase();

    if (combined.includes("audit") || combined.includes("compliance") || combined.includes("flag")) {
      return SkillType.AUDIT;
    }
    if (combined.includes("intake") || combined.includes("triage")) {
      return SkillType.INTAKE;
    }
    if (combined.includes("structuring") || combined.includes("cross-reference") || combined.includes("refiner")) {
      return SkillType.SYNTHESIS;
    }
    if (combined.includes("sync") || combined.includes("archive") || combined.includes("style") || combined.includes("enforcer")) {
      return SkillType.OPERATIONAL;
    }
    if (combined.includes("guardrail") || combined.includes("context") || combined.includes("governance")) {
      return SkillType.GOVERNANCE;
    }

    return SkillType.AUDIT; // Default for this platform
  }

  /**
   * Convert a D1 row to a CitizenSkill object.
   */
  private rowToSkill(row: Record<string, unknown>): CitizenSkill {
    return {
      id: row.id as string,
      citizenName: row.citizen_name as string,
      skillSlug: row.skill_slug as string,
      name: row.name as string,
      description: row.description as string,
      skillType: row.skill_type as SkillType,
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
    };
  }
}

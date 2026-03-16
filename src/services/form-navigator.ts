/**
 * VERNEN™ Guided Document Navigator (GDN) — Cloudflare Workers Service
 * Provides field-by-field guidance for California Judicial Council court forms
 * in 13 languages, with validation and scenario-based navigation.
 *
 * © 2024-2026 Michael Vernen Thomas Hartmann. All Rights Reserved.
 */

import type { Env } from "../index.js";

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export interface FormSummary {
  id: string;
  formCode: string;
  title: string;
  tier: string;
  category: string;
  fieldCount: number;
  languages: string[];
}

export interface FieldGuidance {
  fieldId: string;
  label: string;
  type: string;
  required: boolean;
  guidance: string;
  commonErrors: string[];
  statutoryBasis: string;
  tips?: string;
  options?: string[];
}

export interface FormGuidance {
  formCode: string;
  title: string;
  tier: string;
  category: string;
  language: string;
  governingStatutes: string[];
  fields: FieldGuidance[];
  warnings?: string[];
  filingTips?: string[];
}

export interface ValidationResult {
  valid: boolean;
  fieldId: string;
  errors: string[];
  warnings: string[];
  guidance: string;
}

export interface Scenario {
  scenarioId: string;
  title: string;
  description: string;
  requiredForms: string[];
  optionalForms: string[];
  statutoryBasis: string;
  category: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUPPORTED LANGUAGES
// ═══════════════════════════════════════════════════════════════════════════════

const SUPPORTED_LANGUAGES = ["en", "es", "zh", "vi", "so", "ti", "am", "ar", "ht", "ko", "pt", "ru", "tl"];

function resolveLanguage(requested?: string): string {
  if (!requested) return "en";
  const lang = requested.toLowerCase().slice(0, 2);
  return SUPPORTED_LANGUAGES.includes(lang) ? lang : "en";
}

// ═══════════════════════════════════════════════════════════════════════════════
// FORM NAVIGATOR CLASS
// ═══════════════════════════════════════════════════════════════════════════════

export class FormNavigator {

  /**
   * List all available court forms from the database.
   */
  async getAvailableForms(env: Env): Promise<FormSummary[]> {
    const results = await env.DB.prepare(
      "SELECT id, form_code, title, tier, category, field_count, languages FROM court_forms ORDER BY form_code"
    ).all<{
      id: string;
      form_code: string;
      title: string;
      tier: string;
      category: string;
      field_count: number;
      languages: string;
    }>();

    return (results.results || []).map(row => ({
      id: row.id,
      formCode: row.form_code,
      title: row.title,
      tier: row.tier || "A",
      category: row.category || "general",
      fieldCount: row.field_count || 0,
      languages: this.parseJsonSafe(row.languages, SUPPORTED_LANGUAGES),
    }));
  }

  /**
   * Get field-by-field guidance for a specific form in the requested language.
   */
  async getFormGuidance(
    formCode: string,
    language: string | undefined,
    env: Env
  ): Promise<FormGuidance | null> {
    const lang = resolveLanguage(language);

    const row = await env.DB.prepare(
      "SELECT * FROM court_forms WHERE form_code = ?"
    ).bind(formCode.toUpperCase()).first<{
      id: string;
      form_code: string;
      title: string;
      tier: string;
      category: string;
      field_count: number;
      languages: string;
      data: string;
    }>();

    if (!row) return null;

    const data = this.parseJsonSafe(row.data, null);
    if (!data) return null;

    // Extract fields and translate guidance to requested language
    const fields = this.extractFields(data, lang);
    const governingStatutes = this.extractStatutes(data);
    const warnings = this.extractWarnings(data, lang);
    const filingTips = this.extractFilingTips(data, lang);

    return {
      formCode: row.form_code,
      title: row.title,
      tier: row.tier || "A",
      category: row.category || "general",
      language: lang,
      governingStatutes,
      fields,
      warnings: warnings.length > 0 ? warnings : undefined,
      filingTips: filingTips.length > 0 ? filingTips : undefined,
    };
  }

  /**
   * Validate a single form field value against the annotation rules.
   */
  async validateFormField(
    formCode: string,
    fieldId: string,
    value: string,
    env: Env
  ): Promise<ValidationResult> {
    const row = await env.DB.prepare(
      "SELECT data FROM court_forms WHERE form_code = ?"
    ).bind(formCode.toUpperCase()).first<{ data: string }>();

    if (!row) {
      return {
        valid: false,
        fieldId,
        errors: [`Form ${formCode} not found in database.`],
        warnings: [],
        guidance: "",
      };
    }

    const data = this.parseJsonSafe(row.data, null);
    if (!data) {
      return {
        valid: false,
        fieldId,
        errors: ["Failed to parse form annotation data."],
        warnings: [],
        guidance: "",
      };
    }

    // Find the field definition
    const field = this.findField(data, fieldId);
    if (!field) {
      return {
        valid: false,
        fieldId,
        errors: [`Field ${fieldId} not found in form ${formCode}.`],
        warnings: [],
        guidance: "",
      };
    }

    const errors: string[] = [];
    const warnings: string[] = [];
    const trimmed = (value || "").trim();

    // Required check
    if (field.required && !trimmed) {
      errors.push(`Field "${field.label_en || field.field_label || fieldId}" is required.`);
    }

    // Type-specific validation
    const fieldType = field.type || field.field_type || "text";
    if (trimmed) {
      switch (fieldType) {
        case "email":
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
            errors.push("Invalid email address format.");
          }
          break;
        case "phone":
          if (!/^[\d\s\(\)\-\+\.]{7,}$/.test(trimmed)) {
            warnings.push("Phone number format may not be valid.");
          }
          break;
        case "date":
          if (!/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test(trimmed) &&
              !/\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/.test(trimmed)) {
            warnings.push("Date format may not be recognized. Use MM/DD/YYYY.");
          }
          break;
        case "number":
        case "currency":
          if (!/^[\d,\.\$\s]+$/.test(trimmed)) {
            errors.push("Expected a numeric value.");
          }
          break;
      }

      // Max length check
      if (field.max_length && trimmed.length > field.max_length) {
        warnings.push(`Value exceeds maximum length of ${field.max_length} characters.`);
      }
    }

    // Add common errors as warnings
    const commonErrors = field.common_errors || field.commonErrors;
    if (Array.isArray(commonErrors) && commonErrors.length > 0) {
      for (const err of commonErrors) {
        warnings.push(`Common error: ${err}`);
      }
    }

    const guidance = field.guidance_en || field.guidance?.en ||
      (typeof field.annotations === "object" ? field.annotations.en : "") || "";

    return {
      valid: errors.length === 0,
      fieldId,
      errors,
      warnings,
      guidance,
    };
  }

  /**
   * Get a guided scenario with required/optional forms and statutory basis.
   */
  async getScenario(
    scenarioId: string,
    language: string | undefined,
    env: Env
  ): Promise<Scenario | null> {
    const lang = resolveLanguage(language);

    // Try to find the scenario in KV (where scenario_index may be stored)
    // or fall back to the built-in scenario data
    const scenario = BUILT_IN_SCENARIOS[scenarioId];
    if (!scenario) return null;

    return {
      scenarioId: scenario.scenario_id,
      title: scenario.scenario_title?.[lang] || scenario.scenario_title?.en || scenarioId,
      description: scenario.description?.[lang] || scenario.description?.en || "",
      requiredForms: scenario.required_forms || [],
      optionalForms: scenario.optional_forms || [],
      statutoryBasis: scenario.statutory_basis || "",
      category: scenario.category || "general",
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // HELPERS
  // ═══════════════════════════════════════════════════════════════════════════════

  private parseJsonSafe<T>(json: string, fallback: T): T {
    try {
      return JSON.parse(json) as T;
    } catch {
      return fallback;
    }
  }

  private extractFields(data: any, lang: string): FieldGuidance[] {
    const fields: FieldGuidance[] = [];

    // Handle two annotation formats:
    // Format 1 (FL-100 style): { fields: [ { field_id, label_en, guidance_en, guidance_es, ... } ] }
    // Format 2 (FL-311 style): { sections: [ { fields: [ { field_id, field_label, guidance: { en, es } } ] } ] }

    if (Array.isArray(data.fields)) {
      for (const f of data.fields) {
        fields.push(this.normalizeField(f, lang));
      }
    }

    if (Array.isArray(data.sections)) {
      for (const section of data.sections) {
        if (Array.isArray(section.fields)) {
          for (const f of section.fields) {
            fields.push(this.normalizeField(f, lang));
          }
        }
      }
    }

    return fields;
  }

  private normalizeField(f: any, lang: string): FieldGuidance {
    // Resolve guidance text
    let guidance = "";
    if (f[`guidance_${lang}`]) {
      guidance = f[`guidance_${lang}`];
    } else if (f.guidance_en) {
      guidance = f.guidance_en;
    } else if (typeof f.guidance === "object" && f.guidance !== null) {
      guidance = f.guidance[lang] || f.guidance.en || "";
    } else if (typeof f.annotations === "object" && f.annotations !== null) {
      guidance = f.annotations[lang] || f.annotations.en || "";
    }

    // Resolve common errors
    let commonErrors: string[] = [];
    if (Array.isArray(f.common_errors)) {
      commonErrors = f.common_errors;
    } else if (typeof f.common_errors === "object" && f.common_errors !== null) {
      const ce = f.common_errors[lang] || f.common_errors.en;
      commonErrors = typeof ce === "string" ? [ce] : [];
    }

    // Resolve tips
    let tips = "";
    if (typeof f.tips === "object" && f.tips !== null) {
      tips = f.tips[lang] || f.tips.en || "";
    }

    return {
      fieldId: f.field_id || f.fieldId || "",
      label: f.label_en || f.field_label || f.label || "",
      type: f.type || f.field_type || "text",
      required: f.required || false,
      guidance,
      commonErrors,
      statutoryBasis: f.statutory_basis || f.legal_reference || "",
      tips: tips || undefined,
      options: f.options,
    };
  }

  private extractStatutes(data: any): string[] {
    if (data.metadata?.governing_statutes) return data.metadata.governing_statutes;
    if (data.meta?.statutory_authority) return [data.meta.statutory_authority];
    if (data.governing_statutes) return data.governing_statutes;
    return [];
  }

  private extractWarnings(data: any, lang: string): string[] {
    if (data.critical_warnings) {
      return data.critical_warnings[lang] || data.critical_warnings.en || [];
    }
    return [];
  }

  private extractFilingTips(data: any, lang: string): string[] {
    if (data.filing_tips) {
      return data.filing_tips[lang] || data.filing_tips.en || [];
    }
    return [];
  }

  private findField(data: any, fieldId: string): any {
    // Search in flat fields array
    if (Array.isArray(data.fields)) {
      const found = data.fields.find((f: any) => (f.field_id || f.fieldId) === fieldId);
      if (found) return found;
    }

    // Search in sections
    if (Array.isArray(data.sections)) {
      for (const section of data.sections) {
        if (Array.isArray(section.fields)) {
          const found = section.fields.find((f: any) => (f.field_id || f.fieldId) === fieldId);
          if (found) return found;
        }
      }
    }

    return null;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// BUILT-IN SCENARIO DATA
// ═══════════════════════════════════════════════════════════════════════════════

const BUILT_IN_SCENARIOS: Record<string, any> = {
  divorce_no_children: {
    scenario_id: "divorce_no_children",
    scenario_title: { en: "Divorce Without Children", es: "Divorcio sin hijos", zh: "无子女离婚", vi: "Ly hon khong co con", tl: "Diborsyo na walang anak" },
    description: { en: "Filing for dissolution of marriage when no minor children are involved.", es: "Solicitud de disolución del matrimonio cuando no hay hijos menores involucrados." },
    required_forms: ["FL-100", "FL-110"],
    optional_forms: ["FL-150", "FL-160", "MC-031"],
    statutory_basis: "Family Code §§ 2310-2313",
    category: "dissolution",
  },
  divorce_with_children: {
    scenario_id: "divorce_with_children",
    scenario_title: { en: "Divorce With Children", es: "Divorcio con hijos", zh: "有子女离婚", tl: "Diborsyo na may anak" },
    description: { en: "Filing for dissolution of marriage when minor children are involved. Requires custody and support determinations.", es: "Solicitud de disolución del matrimonio cuando hay hijos menores involucrados." },
    required_forms: ["FL-100", "FL-110", "FL-105", "FL-311"],
    optional_forms: ["FL-150", "FL-160", "FL-341", "FL-142", "MC-031"],
    statutory_basis: "Family Code §§ 2310-2313, 3020-3048",
    category: "dissolution",
  },
  response_to_divorce: {
    scenario_id: "response_to_divorce",
    scenario_title: { en: "Response to Divorce Petition", es: "Respuesta a petición de divorcio" },
    description: { en: "Filing a response after being served with a divorce petition. Must file within 30 days of service." },
    required_forms: ["FL-120"],
    optional_forms: ["FL-150", "FL-160", "FL-311", "FL-341"],
    statutory_basis: "Family Code § 2020; CCP § 412.20",
    category: "dissolution",
  },
  custody_modification: {
    scenario_id: "custody_modification",
    scenario_title: { en: "Modify Custody or Visitation Order", es: "Modificar orden de custodia o visitación" },
    description: { en: "Requesting the court to change an existing custody or visitation order based on changed circumstances." },
    required_forms: ["FL-300", "FL-311"],
    optional_forms: ["FL-305", "FL-341", "MC-031"],
    statutory_basis: "Family Code §§ 3022, 3087, 3100-3105",
    category: "custody",
  },
  custody_emergency: {
    scenario_id: "custody_emergency",
    scenario_title: { en: "Emergency Custody Order (Ex Parte)", es: "Orden de custodia de emergencia (ex parte)" },
    description: { en: "Requesting an immediate, temporary custody order when a child is in danger or at risk of being removed from the state." },
    required_forms: ["FL-300", "FL-305", "FL-311"],
    optional_forms: ["FL-341", "MC-031"],
    statutory_basis: "Family Code §§ 3064, 3134; CRC Rule 5.151",
    category: "custody",
  },
  dv_restraining_order: {
    scenario_id: "dv_restraining_order",
    scenario_title: { en: "Domestic Violence Restraining Order", es: "Orden de restricción por violencia doméstica" },
    description: { en: "Requesting protection from domestic violence, stalking, harassment, or threats by a family member or intimate partner." },
    required_forms: ["DV-100", "DV-109", "DV-110"],
    optional_forms: ["MC-031", "FL-311", "FL-341"],
    statutory_basis: "Family Code §§ 6200-6389",
    category: "dv",
  },
  fee_waiver: {
    scenario_id: "fee_waiver",
    scenario_title: { en: "Request Fee Waiver", es: "Solicitar exención de tarifas" },
    description: { en: "Requesting the court to waive filing fees and court costs due to inability to pay." },
    required_forms: ["FW-001", "FW-003"],
    optional_forms: [],
    statutory_basis: "Government Code §§ 68630-68641",
    category: "general",
  },
  child_support_modification: {
    scenario_id: "child_support_modification",
    scenario_title: { en: "Modify Child Support Order", es: "Modificar orden de manutención" },
    description: { en: "Requesting the court to change an existing child support order due to changed financial circumstances." },
    required_forms: ["FL-300", "FL-150", "FL-142"],
    optional_forms: ["FL-305", "MC-031"],
    statutory_basis: "Family Code §§ 3620-3634, 4050-4076",
    category: "support",
  },
  motion_general: {
    scenario_id: "motion_general",
    scenario_title: { en: "File a Motion in Family Court", es: "Presentar una moción en el tribunal de familia" },
    description: { en: "Filing a request for the court to make an order on custody, support, property, or other family law matter." },
    required_forms: ["FL-300"],
    optional_forms: ["FL-305", "FL-320", "MC-031"],
    statutory_basis: "CRC Rules 5.92, 5.94; Family Code § 210",
    category: "general",
  },
  respond_to_motion: {
    scenario_id: "respond_to_motion",
    scenario_title: { en: "Respond to a Motion", es: "Responder a una moción" },
    description: { en: "Filing a responsive declaration to a motion filed by the other party." },
    required_forms: ["FL-320"],
    optional_forms: ["MC-031", "FL-150"],
    statutory_basis: "CRC Rule 5.92; Family Code § 217",
    category: "general",
  },
  child_abduction_prevention: {
    scenario_id: "child_abduction_prevention",
    scenario_title: { en: "Child Abduction Prevention", es: "Prevención de secuestro de menores" },
    description: { en: "Filing for court orders to prevent a parent from taking a child out of state or country without permission." },
    required_forms: ["FL-300", "FL-312"],
    optional_forms: ["FL-305", "FL-341", "MC-031"],
    statutory_basis: "Family Code §§ 3040-3048, 3130-3134; Penal Code § 278.5",
    category: "custody",
  },
};

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
    scenario_title: { en: "Divorce Without Children", es: "Divorcio sin hijos", zh: "无子女离婚", vi: "Ly hôn không có con", so: "Divorce Without Children", ti: "Divorce Without Children", am: "Divorce Without Children", ar: "Divorce Without Children", ht: "Divorce Without Children", ko: "Divorce Without Children", pt: "Divorce Without Children", ru: "Divorce Without Children", tl: "Diborsyo na walang anak" },
    description: { en: "Filing for dissolution of marriage when no minor children are involved.", es: "Solicitud de disolución del matrimonio cuando no hay hijos menores involucrados.", zh: "Filing for dissolution of marriage when no minor children are involved.", vi: "Filing for dissolution of marriage when no minor children are involved.", so: "Filing for dissolution of marriage when no minor children are involved.", ti: "Filing for dissolution of marriage when no minor children are involved.", am: "Filing for dissolution of marriage when no minor children are involved.", ar: "Filing for dissolution of marriage when no minor children are involved.", ht: "Filing for dissolution of marriage when no minor children are involved.", ko: "Filing for dissolution of marriage when no minor children are involved.", pt: "Filing for dissolution of marriage when no minor children are involved.", ru: "Filing for dissolution of marriage when no minor children are involved.", tl: "Filing for dissolution of marriage when no minor children are involved." },
    required_forms: ["FL-100", "FL-110"],
    optional_forms: ["FL-150", "FL-160", "MC-031"],
    statutory_basis: "Family Code §§ 2310-2313",
    category: "dissolution",
  },
  divorce_with_children: {
    scenario_id: "divorce_with_children",
    scenario_title: { en: "Divorce With Children", es: "Divorcio con hijos", zh: "有子女离婚", vi: "Ly hôn có con", so: "Divorce With Children", ti: "Divorce With Children", am: "Divorce With Children", ar: "Divorce With Children", ht: "Divorce With Children", ko: "Divorce With Children", pt: "Divorce With Children", ru: "Divorce With Children", tl: "Diborsyo na may anak" },
    description: { en: "Filing for dissolution of marriage when minor children are involved. Requires custody and support determinations.", es: "Solicitud de disolución del matrimonio cuando hay hijos menores involucrados.", zh: "Filing for dissolution when minor children are involved.", vi: "Filing for dissolution when minor children are involved.", so: "Filing for dissolution when minor children are involved.", ti: "Filing for dissolution when minor children are involved.", am: "Filing for dissolution when minor children are involved.", ar: "Filing for dissolution when minor children are involved.", ht: "Filing for dissolution when minor children are involved.", ko: "Filing for dissolution when minor children are involved.", pt: "Filing for dissolution when minor children are involved.", ru: "Filing for dissolution when minor children are involved.", tl: "Filing for dissolution when minor children are involved." },
    required_forms: ["FL-100", "FL-110", "FL-105", "FL-311"],
    optional_forms: ["FL-150", "FL-160", "FL-341", "FL-142", "MC-031"],
    statutory_basis: "Family Code §§ 2310-2313, 3020-3048",
    category: "dissolution",
  },
  response_to_divorce: {
    scenario_id: "response_to_divorce",
    scenario_title: { en: "Response to Divorce Petition", es: "Respuesta a petición de divorcio", zh: "对离婚请愿的回应", vi: "Phản hồi đơn ly hôn", so: "Response to Divorce Petition", ti: "Response to Divorce Petition", am: "Response to Divorce Petition", ar: "Response to Divorce Petition", ht: "Response to Divorce Petition", ko: "Response to Divorce Petition", pt: "Response to Divorce Petition", ru: "Response to Divorce Petition", tl: "Response to Divorce Petition" },
    description: { en: "Filing a response after being served with a divorce petition. Must file within 30 days of service.", es: "Presentar una respuesta después de recibir una petición de divorcio.", zh: "Filing a response after being served. Must file within 30 days.", vi: "Filing a response after being served. Must file within 30 days.", so: "Filing a response within 30 days of service.", ti: "Filing a response within 30 days of service.", am: "Filing a response within 30 days of service.", ar: "Filing a response within 30 days of service.", ht: "Filing a response within 30 days of service.", ko: "Filing a response within 30 days of service.", pt: "Filing a response within 30 days of service.", ru: "Filing a response within 30 days of service.", tl: "Filing a response within 30 days of service." },
    required_forms: ["FL-120"],
    optional_forms: ["FL-150", "FL-160", "FL-311", "FL-341"],
    statutory_basis: "Family Code § 2020; CCP § 412.20",
    category: "dissolution",
  },
  custody_modification: {
    scenario_id: "custody_modification",
    scenario_title: { en: "Modify Custody or Visitation Order", es: "Modificar orden de custodia o visitación", zh: "修改监护权或探视令", vi: "Sửa đổi lệnh quyền nuôi con hoặc thăm nom", so: "Modify Custody or Visitation Order", ti: "Modify Custody or Visitation Order", am: "Modify Custody or Visitation Order", ar: "Modify Custody or Visitation Order", ht: "Modify Custody or Visitation Order", ko: "Modify Custody or Visitation Order", pt: "Modify Custody or Visitation Order", ru: "Modify Custody or Visitation Order", tl: "Modify Custody or Visitation Order" },
    description: { en: "Requesting the court to change an existing custody or visitation order based on changed circumstances.", es: "Solicitar al tribunal que cambie una orden de custodia o visitación existente.", zh: "Requesting changes to custody/visitation based on changed circumstances.", vi: "Requesting changes to custody/visitation based on changed circumstances.", so: "Requesting changes to custody/visitation order.", ti: "Requesting changes to custody/visitation order.", am: "Requesting changes to custody/visitation order.", ar: "Requesting changes to custody/visitation order.", ht: "Requesting changes to custody/visitation order.", ko: "Requesting changes to custody/visitation order.", pt: "Requesting changes to custody/visitation order.", ru: "Requesting changes to custody/visitation order.", tl: "Requesting changes to custody/visitation order." },
    required_forms: ["FL-300", "FL-311"],
    optional_forms: ["FL-305", "FL-341", "MC-031"],
    statutory_basis: "Family Code §§ 3022, 3087, 3100-3105",
    category: "custody",
  },
  custody_emergency: {
    scenario_id: "custody_emergency",
    scenario_title: { en: "Emergency Custody Order (Ex Parte)", es: "Orden de custodia de emergencia (ex parte)", zh: "紧急监护令", vi: "Lệnh quyền nuôi con khẩn cấp", so: "Emergency Custody Order", ti: "Emergency Custody Order", am: "Emergency Custody Order", ar: "Emergency Custody Order", ht: "Emergency Custody Order", ko: "Emergency Custody Order", pt: "Emergency Custody Order", ru: "Emergency Custody Order", tl: "Emergency Custody Order" },
    description: { en: "Requesting an immediate, temporary custody order when a child is in danger or at risk of being removed from the state.", es: "Solicitar una orden de custodia temporal inmediata cuando un niño está en peligro.", zh: "Requesting immediate custody order when child is in danger.", vi: "Requesting immediate custody order when child is in danger.", so: "Immediate custody order when child is in danger.", ti: "Immediate custody order when child is in danger.", am: "Immediate custody order when child is in danger.", ar: "Immediate custody order when child is in danger.", ht: "Immediate custody order when child is in danger.", ko: "Immediate custody order when child is in danger.", pt: "Immediate custody order when child is in danger.", ru: "Immediate custody order when child is in danger.", tl: "Immediate custody order when child is in danger." },
    required_forms: ["FL-300", "FL-305", "FL-311"],
    optional_forms: ["FL-341", "MC-031"],
    statutory_basis: "Family Code §§ 3064, 3134; CRC Rule 5.151",
    category: "custody",
  },
  child_support_modification: {
    scenario_id: "child_support_modification",
    scenario_title: { en: "Modify Child Support Order", es: "Modificar orden de manutención", zh: "修改子女抚养费令", vi: "Sửa đổi lệnh cấp dưỡng nuôi con", so: "Modify Child Support Order", ti: "Modify Child Support Order", am: "Modify Child Support Order", ar: "Modify Child Support Order", ht: "Modify Child Support Order", ko: "Modify Child Support Order", pt: "Modify Child Support Order", ru: "Modify Child Support Order", tl: "Modify Child Support Order" },
    description: { en: "Requesting the court to change an existing child support order due to changed financial circumstances.", es: "Solicitar al tribunal que cambie una orden de manutención existente.", zh: "Requesting change to child support due to changed finances.", vi: "Requesting change to child support due to changed finances.", so: "Change child support order.", ti: "Change child support order.", am: "Change child support order.", ar: "Change child support order.", ht: "Change child support order.", ko: "Change child support order.", pt: "Change child support order.", ru: "Change child support order.", tl: "Change child support order." },
    required_forms: ["FL-300", "FL-150", "FL-142"],
    optional_forms: ["FL-305", "MC-031"],
    statutory_basis: "Family Code §§ 3620-3634, 4050-4076",
    category: "support",
  },
  dv_restraining_order: {
    scenario_id: "dv_restraining_order",
    scenario_title: { en: "Domestic Violence Restraining Order", es: "Orden de restricción por violencia doméstica", zh: "家庭暴力限制令", vi: "Lệnh cấm bạo lực gia đình", so: "Domestic Violence Restraining Order", ti: "Domestic Violence Restraining Order", am: "Domestic Violence Restraining Order", ar: "Domestic Violence Restraining Order", ht: "Domestic Violence Restraining Order", ko: "Domestic Violence Restraining Order", pt: "Domestic Violence Restraining Order", ru: "Domestic Violence Restraining Order", tl: "Domestic Violence Restraining Order" },
    description: { en: "Requesting protection from domestic violence, stalking, harassment, or threats by a family member or intimate partner.", es: "Solicitar protección contra la violencia doméstica, acoso o amenazas.", zh: "Requesting protection from domestic violence or threats.", vi: "Requesting protection from domestic violence or threats.", so: "Protection from domestic violence.", ti: "Protection from domestic violence.", am: "Protection from domestic violence.", ar: "Protection from domestic violence.", ht: "Protection from domestic violence.", ko: "Protection from domestic violence.", pt: "Protection from domestic violence.", ru: "Protection from domestic violence.", tl: "Protection from domestic violence." },
    required_forms: ["DV-100", "DV-109", "DV-110"],
    optional_forms: ["MC-031", "FL-311", "FL-341"],
    statutory_basis: "Family Code §§ 6200-6389",
    category: "dv",
  },
  dv_response: {
    scenario_id: "dv_response",
    scenario_title: { en: "Response to DVRO", es: "Respuesta a orden de restricción por VD", zh: "对家暴限制令的回应", vi: "Phản hồi lệnh cấm BLGĐ", so: "Response to DVRO", ti: "Response to DVRO", am: "Response to DVRO", ar: "Response to DVRO", ht: "Response to DVRO", ko: "Response to DVRO", pt: "Response to DVRO", ru: "Response to DVRO", tl: "Response to DVRO" },
    description: { en: "Filing a response after being served with a domestic violence restraining order request.", es: "Presentar una respuesta después de recibir una solicitud de orden de restricción por VD.", zh: "Filing a response to a DVRO request.", vi: "Filing a response to a DVRO request.", so: "Responding to DVRO request.", ti: "Responding to DVRO request.", am: "Responding to DVRO request.", ar: "Responding to DVRO request.", ht: "Responding to DVRO request.", ko: "Responding to DVRO request.", pt: "Responding to DVRO request.", ru: "Responding to DVRO request.", tl: "Responding to DVRO request." },
    required_forms: ["DV-120"],
    optional_forms: ["DV-130", "MC-031"],
    statutory_basis: "Family Code §§ 6300-6306",
    category: "dv",
  },
  fee_waiver: {
    scenario_id: "fee_waiver",
    scenario_title: { en: "Request Fee Waiver", es: "Solicitar exención de tarifas", zh: "申请费用减免", vi: "Yêu cầu miễn phí", so: "Request Fee Waiver", ti: "Request Fee Waiver", am: "Request Fee Waiver", ar: "Request Fee Waiver", ht: "Request Fee Waiver", ko: "Request Fee Waiver", pt: "Request Fee Waiver", ru: "Request Fee Waiver", tl: "Request Fee Waiver" },
    description: { en: "Requesting the court to waive filing fees and court costs due to inability to pay.", es: "Solicitar al tribunal que exima las tarifas de presentación y costos judiciales.", zh: "Requesting waiver of court fees due to inability to pay.", vi: "Requesting waiver of court fees.", so: "Request fee waiver.", ti: "Request fee waiver.", am: "Request fee waiver.", ar: "Request fee waiver.", ht: "Request fee waiver.", ko: "Request fee waiver.", pt: "Request fee waiver.", ru: "Request fee waiver.", tl: "Request fee waiver." },
    required_forms: ["FW-001", "FW-003"],
    optional_forms: [],
    statutory_basis: "Government Code §§ 68630-68641",
    category: "general",
  },
  motion_general: {
    scenario_id: "motion_general",
    scenario_title: { en: "File a Motion in Family Court", es: "Presentar una moción en el tribunal de familia", zh: "在家庭法院提出动议", vi: "Nộp kiến nghị tại tòa gia đình", so: "File a Motion in Family Court", ti: "File a Motion in Family Court", am: "File a Motion in Family Court", ar: "File a Motion in Family Court", ht: "File a Motion in Family Court", ko: "File a Motion in Family Court", pt: "File a Motion in Family Court", ru: "File a Motion in Family Court", tl: "File a Motion in Family Court" },
    description: { en: "Filing a request for the court to make an order on custody, support, property, or other family law matter.", es: "Presentar una solicitud para que el tribunal emita una orden.", zh: "Filing a request for court order on family law matters.", vi: "Filing a request for court order.", so: "File motion in family court.", ti: "File motion in family court.", am: "File motion in family court.", ar: "File motion in family court.", ht: "File motion in family court.", ko: "File motion in family court.", pt: "File motion in family court.", ru: "File motion in family court.", tl: "File motion in family court." },
    required_forms: ["FL-300"],
    optional_forms: ["FL-305", "FL-320", "MC-031"],
    statutory_basis: "CRC Rules 5.92, 5.94; Family Code § 210",
    category: "general",
  },
  respond_to_motion: {
    scenario_id: "respond_to_motion",
    scenario_title: { en: "Respond to a Motion", es: "Responder a una moción", zh: "回应动议", vi: "Phản hồi kiến nghị", so: "Respond to a Motion", ti: "Respond to a Motion", am: "Respond to a Motion", ar: "Respond to a Motion", ht: "Respond to a Motion", ko: "Respond to a Motion", pt: "Respond to a Motion", ru: "Respond to a Motion", tl: "Respond to a Motion" },
    description: { en: "Filing a responsive declaration to a motion filed by the other party.", es: "Presentar una declaración de respuesta a una moción presentada por la otra parte.", zh: "Filing a responsive declaration to a motion.", vi: "Filing a responsive declaration.", so: "Respond to a motion.", ti: "Respond to a motion.", am: "Respond to a motion.", ar: "Respond to a motion.", ht: "Respond to a motion.", ko: "Respond to a motion.", pt: "Respond to a motion.", ru: "Respond to a motion.", tl: "Respond to a motion." },
    required_forms: ["FL-320"],
    optional_forms: ["MC-031", "FL-150"],
    statutory_basis: "CRC Rule 5.92; Family Code § 217",
    category: "general",
  },
  child_abduction_prevention: {
    scenario_id: "child_abduction_prevention",
    scenario_title: { en: "Child Abduction Prevention", es: "Prevención de secuestro de menores", zh: "防止绑架儿童", vi: "Phòng chống bắt cóc trẻ em", so: "Child Abduction Prevention", ti: "Child Abduction Prevention", am: "Child Abduction Prevention", ar: "Child Abduction Prevention", ht: "Child Abduction Prevention", ko: "Child Abduction Prevention", pt: "Child Abduction Prevention", ru: "Child Abduction Prevention", tl: "Child Abduction Prevention" },
    description: { en: "Filing for court orders to prevent a parent from taking a child out of state or country without permission.", es: "Solicitar órdenes judiciales para evitar que un padre saque a un niño del estado o país.", zh: "Filing orders to prevent child removal from state/country.", vi: "Filing orders to prevent child removal.", so: "Prevent child abduction.", ti: "Prevent child abduction.", am: "Prevent child abduction.", ar: "Prevent child abduction.", ht: "Prevent child abduction.", ko: "Prevent child abduction.", pt: "Prevent child abduction.", ru: "Prevent child abduction.", tl: "Prevent child abduction." },
    required_forms: ["FL-300", "FL-312"],
    optional_forms: ["FL-305", "FL-341", "MC-031"],
    statutory_basis: "Family Code §§ 3040-3048, 3130-3134; Penal Code § 278.5",
    category: "custody",
  },
};

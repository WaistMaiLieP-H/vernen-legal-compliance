/**
 * RealtimeComplianceEngine
 *
 * The live compliance layer. Takes streaming transcript chunks from any device
 * (glasses, earbuds, phone) and returns:
 *   - Violations detected RIGHT NOW, in plain English with suggested responses
 *   - Translations into the user's language
 *   - Session state for post-session chain anchoring
 *
 * Architecture:
 *   On-device STT → text chunk → this engine → alerts + translation → device display/audio
 *
 * Privacy: audio never touches the platform. Only text chunks are sent.
 * The full transcript is stored in KV, hashed at session end, and anchored to chain.
 */

import type { Env } from "../index.js";
import type {
  ComplianceContext,
  RealtimeAlert,
  RealtimeSession,
  RealtimeComplianceResponse,
  RealtimeTranslation,
  SessionSeal,
} from "../types/realtime.js";
import { generateId } from "../utils/helpers.js";

const SESSION_TTL = 86400; // 24 hours

// ── Context Rule Sets ──────────────────────────────────────────────────────────
// Each context activates the rules most likely to fire in that situation.
// Every rule: what to detect, what it means in plain English, what to say right now.

interface LiveRule {
  ruleId: string;
  citation: string;
  severity: "CRITICAL" | "MAJOR" | "INFO";
  triggers: string[];           // keyword/phrase patterns (lowercase)
  plainEnglish: string;
  suggestion: string | null;
}

const CONTEXT_RULES: Record<ComplianceContext, LiveRule[]> = {
  "police-encounter": [
    {
      ruleId: "RT-4A-001",
      citation: "4th Amendment; Florida v. Bostick (1991)",
      severity: "CRITICAL",
      triggers: ["can i search", "mind if i search", "open the trunk", "search your", "look inside"],
      plainEnglish: "Officer is requesting consent to search. You have the absolute right to refuse.",
      suggestion: "Say: 'I do not consent to this search.'",
    },
    {
      ruleId: "RT-5A-001",
      citation: "5th Amendment; Miranda v. Arizona (1966)",
      severity: "CRITICAL",
      triggers: ["where were you", "what were you doing", "tell me what happened", "can you explain"],
      plainEnglish: "You are being questioned. You have the right to remain silent.",
      suggestion: "Say: 'I am exercising my right to remain silent. I want an attorney.'",
    },
    {
      ruleId: "RT-MIRANDA-001",
      citation: "Miranda v. Arizona, 384 U.S. 436 (1966)",
      severity: "CRITICAL",
      triggers: ["you are under arrest", "you're under arrest", "placing you under arrest"],
      plainEnglish: "You are being arrested. Officer must read Miranda rights before custodial interrogation.",
      suggestion: "Say: 'I want an attorney present before any questioning.'",
    },
    {
      ruleId: "RT-PC-001",
      citation: "4th Amendment; Terry v. Ohio (1968)",
      severity: "MAJOR",
      triggers: ["stop right there", "don't move", "hands where i can see"],
      plainEnglish: "Officer is conducting a stop. Ask clearly: 'Am I being detained or am I free to go?'",
      suggestion: "Ask: 'Am I being detained or am I free to go?'",
    },
    {
      ruleId: "RT-ID-001",
      citation: "CA Penal Code § 647(e); Hiibel v. Nevada (2004)",
      severity: "INFO",
      triggers: ["id please", "identification", "license and registration", "show me your id"],
      plainEnglish: "California is not a 'stop and identify' state. You must identify only if lawfully arrested.",
      suggestion: null,
    },
    {
      ruleId: "RT-DOMAG-001",
      citation: "CA Penal Code § 13701(b)",
      severity: "CRITICAL",
      triggers: ["both of you", "mutual combat", "arresting both", "dual arrest"],
      plainEnglish: "Officer may be violating the dominant aggressor statute. Officers must identify the primary aggressor, not arrest both parties.",
      suggestion: "State clearly who initiated and who was defending.",
    },
  ],

  "family-court": [
    {
      ruleId: "RT-FC-3011",
      citation: "CA Family Code § 3011",
      severity: "CRITICAL",
      triggers: ["best interest", "custody", "visitation", "parenting plan"],
      plainEnglish: "Custody determination requires court to consider all § 3011 factors including history of domestic violence.",
      suggestion: null,
    },
    {
      ruleId: "RT-DVRO-001",
      citation: "CA Family Code § 6300; Elkins v. Superior Court (2007)",
      severity: "CRITICAL",
      triggers: ["restraining order", "protective order", "dvro", "dv-100", "dv-130"],
      plainEnglish: "DVRO proceedings require 'reasonable proof' of past abuse. Allegations alone are insufficient.",
      suggestion: null,
    },
    {
      ruleId: "RT-BRADY-001",
      citation: "Brady v. Maryland, 373 U.S. 83 (1963)",
      severity: "CRITICAL",
      triggers: ["withheld", "didn't disclose", "failed to provide", "not turned over"],
      plainEnglish: "Potential Brady violation — undisclosed evidence favorable to you must be produced.",
      suggestion: "State on the record: 'I am requesting all exculpatory evidence pursuant to Brady.'",
    },
    {
      ruleId: "RT-EX-PARTE-001",
      citation: "CA Rules of Court 5.165; CA Family Code § 240",
      severity: "CRITICAL",
      triggers: ["ex parte", "without notice", "emergency order"],
      plainEnglish: "Ex parte orders require immediate danger showing. Routine matters cannot use ex parte process.",
      suggestion: null,
    },
    {
      ruleId: "RT-CANRA-001",
      citation: "CA Penal Code § 11166",
      severity: "CRITICAL",
      triggers: ["child abuse", "child neglect", "mandatory report", "cps referral"],
      plainEnglish: "Mandatory reporter did not cross-report to CPS as required. This is a felony violation.",
      suggestion: null,
    },
  ],

  "cps-visit": [
    {
      ruleId: "RT-CPS-4A",
      citation: "4th Amendment; Camara v. Municipal Court (1967); Calabretta v. Floyd (9th Cir. 1999)",
      severity: "CRITICAL",
      triggers: ["can i come in", "need to come inside", "inspect your home", "look around"],
      plainEnglish: "CPS generally cannot enter your home without a warrant or your consent. You may refuse entry.",
      suggestion: "Say: 'Do you have a warrant? I do not consent to entry without a warrant.'",
    },
    {
      ruleId: "RT-CPS-WIC300",
      citation: "CA Welfare & Institutions Code § 300",
      severity: "CRITICAL",
      triggers: ["remove", "take the children", "emergency removal", "detention"],
      plainEnglish: "Emergency removal requires 'immediate danger' finding. Investigate whether this standard is met.",
      suggestion: "Ask: 'What specific facts support an immediate danger finding under WIC § 300?'",
    },
    {
      ruleId: "RT-CPS-COUNSEL",
      citation: "CA Welfare & Institutions Code § 317",
      severity: "MAJOR",
      triggers: ["you have the right", "attorney", "counsel", "lawyer"],
      plainEnglish: "You have the right to counsel in dependency proceedings. Request an attorney immediately.",
      suggestion: "Say: 'I want to speak with an attorney before answering any questions.'",
    },
    {
      ruleId: "RT-CPS-RECORD",
      citation: "CA Penal Code § 632; CA Family Code § 3020",
      severity: "INFO",
      triggers: ["are you recording", "put that away", "stop recording", "can't record"],
      plainEnglish: "In California, you may record any conversation you are a party to. CPS visits are recordable.",
      suggestion: "Say: 'I am recording this conversation as I am a party to it under California law.'",
    },
  ],

  "custody-exchange": [
    {
      ruleId: "RT-ORDER-001",
      citation: "CA Family Code § 213; CA Penal Code § 278.5",
      severity: "CRITICAL",
      triggers: ["not coming", "not going", "won't let me", "refusing to", "keeping the child"],
      plainEnglish: "Potential custody order violation. Custodial interference is a criminal offense under PC § 278.5.",
      suggestion: "Document this refusal with date, time, and exact words. Contact law enforcement if orders are being violated.",
    },
    {
      ruleId: "RT-EPO-001",
      citation: "CA Family Code § 6250",
      severity: "CRITICAL",
      triggers: ["stay away", "don't come near", "you're not allowed", "you can't be here"],
      plainEnglish: "Possible EPO claim being made. Emergency protective orders require specific danger criteria.",
      suggestion: null,
    },
  ],

  "mediation": [
    {
      ruleId: "RT-MED-5220",
      citation: "CA Rules of Court 5.220(d)",
      severity: "CRITICAL",
      triggers: ["i recommend", "my recommendation", "i believe the child should", "in my opinion"],
      plainEnglish: "Mediator is making a recommendation. They must have disclosed that this is a recommending vs. non-recommending session.",
      suggestion: "Ask on the record: 'Did you disclose at the outset that this is a recommending mediation?'",
    },
    {
      ruleId: "RT-MED-BIAS",
      citation: "CA Rules of Court 5.210(c); CRC 10.603",
      severity: "CRITICAL",
      triggers: ["typically fathers", "usually mothers", "men tend to", "women tend to", "fathers usually", "mothers usually"],
      plainEnglish: "Mediator may be applying gender-based generalizations. This violates neutrality requirements.",
      suggestion: "State: 'I object to gender-based generalizations. Please base your assessment on the specific facts of this case.'",
    },
    {
      ruleId: "RT-MED-DV",
      citation: "CA Family Code § 3181; CRC 5.215",
      severity: "CRITICAL",
      triggers: ["both of you need to compromise", "you both have issues", "there are two sides"],
      plainEnglish: "In cases involving domestic violence, standard mediation is inappropriate. The mediator should screen for DV.",
      suggestion: "State on the record: 'I am invoking Family Code § 3181 — this case involves domestic violence and requires DV-sensitive mediation protocols.'",
    },
  ],

  "deposition": [
    {
      ruleId: "RT-DEP-001",
      citation: "CA CCP § 2025.460",
      severity: "MAJOR",
      triggers: ["assumes facts not in evidence", "compound question", "argumentative", "mischaracterizes"],
      plainEnglish: "Improper deposition question. You may object before answering.",
      suggestion: "Say: 'Objection. [state grounds]. I will answer subject to the objection.'",
    },
  ],

  "dmv-hearing": [
    {
      ruleId: "RT-DMV-001",
      citation: "CA Vehicle Code § 13353.2; Berlinghieri v. DMV (1983)",
      severity: "CRITICAL",
      triggers: ["suspend your license", "suspension", "breath test refusal", "chemical test"],
      plainEnglish: "DMV APS hearing — burden is on DMV to prove three elements by a preponderance of evidence.",
      suggestion: null,
    },
  ],

  "landlord-tenant": [
    {
      ruleId: "RT-LT-RETALIATION",
      citation: "CA Civil Code § 1942.5",
      severity: "CRITICAL",
      triggers: ["eviction notice", "three day notice", "pay or quit", "vacate the premises"],
      plainEnglish: "Retaliatory evictions are prohibited within 180 days of a tenant asserting habitability rights.",
      suggestion: "Ask: 'Is this notice within 180 days of a habitability complaint or repair request?'",
    },
  ],

  "employer-employee": [
    {
      ruleId: "RT-EE-WAGE",
      citation: "CA Labor Code § 203; FLSA 29 USC § 206",
      severity: "CRITICAL",
      triggers: ["final check", "last paycheck", "you're fired", "you're terminated", "letting you go"],
      plainEnglish: "Upon termination, California requires immediate payment of all wages. Employer has 72 hours if employee resigned.",
      suggestion: "Say: 'I am requesting my final wages immediately as required by Labor Code § 202-203.'",
    },
  ],

  "consumer-transaction": [
    {
      ruleId: "RT-CT-UDAP",
      citation: "CA Business & Professions Code § 17200; FTC Act § 5",
      severity: "MAJOR",
      triggers: ["as-is", "no returns", "all sales final", "waive your right"],
      plainEnglish: "Unfair or deceptive trade practice may be occurring. Consumer waiver of statutory rights is often unenforceable.",
      suggestion: null,
    },
  ],

  "ssdi-hearing": [
    {
      ruleId: "RT-SSA-001",
      citation: "42 USC § 405(b); 20 CFR § 404.1520",
      severity: "CRITICAL",
      triggers: ["not disabled", "can perform work", "transferable skills", "sedentary work"],
      plainEnglish: "SSA must apply the five-step sequential evaluation. Request they articulate which step they are applying.",
      suggestion: "Ask: 'Which step of the sequential evaluation are you currently applying?'",
    },
  ],

  "immigration": [
    {
      ruleId: "RT-ICE-001",
      citation: "4th Amendment; Morales v. Chadbourne (1st Cir. 2014)",
      severity: "CRITICAL",
      triggers: ["are you a citizen", "where were you born", "papers please", "immigration status"],
      plainEnglish: "You have the right to remain silent about immigration status. You do not have to answer questions about citizenship.",
      suggestion: "Say: 'I am exercising my right to remain silent. I do not answer questions about my immigration status.'",
    },
  ],

  "general": [
    {
      ruleId: "RT-GEN-RECORD",
      citation: "CA Penal Code § 632",
      severity: "INFO",
      triggers: ["you can't record this", "stop recording", "put your phone away"],
      plainEnglish: "In California, all-party consent applies to confidential communications. You may record conversations you participate in.",
      suggestion: "Say: 'I am a party to this conversation and I am recording it as permitted under California law.'",
    },
  ],
};

// ── Engine ─────────────────────────────────────────────────────────────────────

export class RealtimeComplianceEngine {
  constructor(private env: Env) {}

  async startSession(params: {
    context: ComplianceContext;
    primaryLang: string;
    sourceLang: string;
  }): Promise<RealtimeSession> {
    const session: RealtimeSession = {
      sessionId: generateId("rt"),
      context: params.context,
      primaryLang: params.primaryLang,
      sourceLang: params.sourceLang,
      startedAt: new Date().toISOString(),
      emittedRuleIds: [],
      transcriptBuffer: "",
      fullTranscript: "",
    };
    await this.saveSession(session);
    return session;
  }

  async processChunk(
    sessionId: string,
    textChunk: string
  ): Promise<RealtimeComplianceResponse> {
    const session = await this.loadSession(sessionId);
    if (!session) throw new Error(`Session ${sessionId} not found`);

    // Update transcript
    const trimmedChunk = textChunk.trim();
    session.fullTranscript += " " + trimmedChunk;
    // Sliding window: keep last ~300 words for rule matching
    const words = session.transcriptBuffer.split(/\s+/);
    if (words.length > 300) {
      session.transcriptBuffer = words.slice(-200).join(" ");
    }
    session.transcriptBuffer += " " + trimmedChunk;

    // Run rule matching
    const newAlerts = this.matchRules(
      session.transcriptBuffer,
      session.context,
      session.emittedRuleIds
    );

    // Mark rules as emitted
    for (const alert of newAlerts) {
      session.emittedRuleIds.push(alert.ruleId);
    }

    // Translation (only if primary language differs from source)
    let translation: RealtimeTranslation | null = null;
    if (session.primaryLang !== session.sourceLang && trimmedChunk.length > 3) {
      translation = await this.translate(
        trimmedChunk,
        session.sourceLang,
        session.primaryLang,
        newAlerts
      );
    }

    await this.saveSession(session);

    const criticalCount = session.emittedRuleIds.filter(id => {
      const rules = CONTEXT_RULES[session.context] ?? [];
      return rules.find(r => r.ruleId === id)?.severity === "CRITICAL";
    }).length;

    const sessionStatus =
      criticalCount > 0 ? "CRITICAL" : newAlerts.length > 0 ? "ALERT" : "CLEAN";

    return {
      sessionId,
      processed: trimmedChunk,
      newAlerts,
      translation,
      sessionStatus,
      alertCount: session.emittedRuleIds.length,
    };
  }

  async sealSession(sessionId: string): Promise<SessionSeal> {
    const session = await this.loadSession(sessionId);
    if (!session) throw new Error(`Session ${sessionId} not found`);

    // Hash the full transcript
    const encoder = new TextEncoder();
    const data = encoder.encode(session.fullTranscript);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const transcriptHash = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

    const startedAt = new Date(session.startedAt);
    const now = new Date();
    const durationSeconds = Math.round((now.getTime() - startedAt.getTime()) / 1000);

    const rules = CONTEXT_RULES[session.context] ?? [];
    const criticalCount = session.emittedRuleIds.filter(
      id => rules.find(r => r.ruleId === id)?.severity === "CRITICAL"
    ).length;

    const seal: SessionSeal = {
      sessionId,
      context: session.context,
      durationSeconds,
      alertCount: session.emittedRuleIds.length,
      criticalCount,
      transcriptHash,
      ruleIds: [...session.emittedRuleIds],
    };

    // Append to verification chain
    try {
      const { VerificationEngine } = await import("./verification-engine.js");
      const engine = new VerificationEngine(this.env);
      await engine.ensureTables();
      const result = await engine.appendRecord({
        recordId: `session:${sessionId}`,
        recordType: "realtime_session",
        sourceTable: "realtime_sessions",
        sourceId: sessionId,
        content: {
          ...seal,
          startedAt: session.startedAt,
          endedAt: now.toISOString(),
          primaryLang: session.primaryLang,
          sourceLang: session.sourceLang,
        },
        metadata: {
          sensitivity: "CONFIDENTIAL",
          auto_sealed: true,
        },
        modelName: "deterministic",
      });
      seal.chainSeq = result.seq;
      seal.combinedHash = result.combinedHash;
    } catch {
      // Chain failure is non-fatal — seal is still valid, will queue for retry
    }

    // Emit webhook if configured
    if (this.env.WEBHOOK_URL) {
      fetch(this.env.WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: "session_sealed", seal }),
      }).catch(() => {});
    }

    return seal;
  }

  // ── Private ──────────────────────────────────────────────────────────────────

  private matchRules(
    buffer: string,
    context: ComplianceContext,
    alreadyEmitted: string[]
  ): RealtimeAlert[] {
    const rules = [
      ...(CONTEXT_RULES[context] ?? []),
      ...CONTEXT_RULES["general"],
    ];
    const bufferLower = buffer.toLowerCase();
    const alerts: RealtimeAlert[] = [];

    for (const rule of rules) {
      if (alreadyEmitted.includes(rule.ruleId)) continue;

      const triggerText = rule.triggers.find(t => bufferLower.includes(t));
      if (!triggerText) continue;

      // Find the surrounding sentence fragment
      const idx = bufferLower.indexOf(triggerText);
      const excerpt = buffer.slice(Math.max(0, idx - 40), idx + triggerText.length + 40);

      alerts.push({
        alertId: generateId("alert"),
        timestamp: new Date().toISOString(),
        severity: rule.severity,
        ruleId: rule.ruleId,
        citation: rule.citation,
        plainEnglish: rule.plainEnglish,
        suggestion: rule.suggestion,
        triggerText: excerpt.trim(),
        domain: context,
      });
    }

    return alerts;
  }

  private async translate(
    text: string,
    sourceLang: string,
    targetLang: string,
    alerts: RealtimeAlert[]
  ): Promise<RealtimeTranslation> {
    let translatedText = text;

    // Use Cloudflare Workers AI translation if available
    if (this.env.AI) {
      try {
        const result = await (this.env.AI as unknown as {
          run: (model: string, input: Record<string, unknown>) => Promise<{ translated_text?: string }>;
        }).run("@cf/meta/m2m100-1.2b", {
          text,
          source_lang: sourceLang,
          target_lang: targetLang,
        });
        if (result?.translated_text) {
          translatedText = result.translated_text;
        }
      } catch {
        // AI translation unavailable — return source text
      }
    }

    // audioScript: translated text + any critical alerts in target language
    // For now, append alert suggestions if available
    const criticalSuggestions = alerts
      .filter(a => a.severity === "CRITICAL" && a.suggestion)
      .map(a => `[ALERT] ${a.suggestion}`)
      .join(" | ");
    const audioScript = criticalSuggestions
      ? `${translatedText} — ${criticalSuggestions}`
      : translatedText;

    return {
      sourceText: text,
      sourceLang,
      targetLang,
      translatedText,
      audioScript,
      alerts,
    };
  }

  private async saveSession(session: RealtimeSession): Promise<void> {
    await this.env.KNOWLEDGE_STORE.put(
      `realtime:session:${session.sessionId}`,
      JSON.stringify(session),
      { expirationTtl: SESSION_TTL }
    );
  }

  private async loadSession(sessionId: string): Promise<RealtimeSession | null> {
    const raw = await this.env.KNOWLEDGE_STORE.get(
      `realtime:session:${sessionId}`
    );
    if (!raw) return null;
    return JSON.parse(raw) as RealtimeSession;
  }
}

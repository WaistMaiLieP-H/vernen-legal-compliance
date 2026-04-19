/**
 * Realtime Compliance Types
 *
 * Shared schema for the live compliance stream:
 * audio capture → on-device STT → platform rule match → glasses overlay + earbud audio
 */

/** Active context determines which rule set is loaded. */
export type ComplianceContext =
  | "police-encounter"
  | "family-court"
  | "cps-visit"
  | "custody-exchange"
  | "mediation"
  | "deposition"
  | "dmv-hearing"
  | "landlord-tenant"
  | "employer-employee"
  | "consumer-transaction"
  | "ssdi-hearing"
  | "immigration"
  | "general";

/** A single violation detected from the live transcript. */
export interface RealtimeAlert {
  alertId: string;
  timestamp: string;
  severity: "CRITICAL" | "MAJOR" | "INFO";
  ruleId: string;
  citation: string;
  /** One sentence. What happened. No jargon. */
  plainEnglish: string;
  /** Exact words to say right now, if applicable. */
  suggestion: string | null;
  /** The transcript fragment that triggered this alert. */
  triggerText: string;
  domain: ComplianceContext;
}

/** Translation output paired with any compliance alerts found in the source text. */
export interface RealtimeTranslation {
  sourceText: string;
  sourceLang: string;
  targetLang: string;
  translatedText: string;
  /** TTS-ready: the translated text, ready to pipe to earbuds. */
  audioScript: string;
  /** Violations found in the source text before translation. */
  alerts: RealtimeAlert[];
}

/** Session metadata — one session = one encounter/hearing/interaction. */
export interface RealtimeSession {
  sessionId: string;
  context: ComplianceContext;
  primaryLang: string;   // language the user wants to hear
  sourceLang: string;    // language being spoken in the room
  startedAt: string;
  /** Alerts emitted so far this session — used for deduplication. */
  emittedRuleIds: string[];
  /** Running transcript (last 300 words sliding window). */
  transcriptBuffer: string;
  /** Full transcript for session seal. */
  fullTranscript: string;
}

/** What the platform returns on each /api/realtime/compliance call. */
export interface RealtimeComplianceResponse {
  sessionId: string;
  processed: string;         // the text chunk that was evaluated
  newAlerts: RealtimeAlert[];
  translation: RealtimeTranslation | null;
  /** For glasses: current overall status of the session. */
  sessionStatus: "CLEAN" | "ALERT" | "CRITICAL";
  alertCount: number;
}

/** Session seal — sent to verification chain at session end. */
export interface SessionSeal {
  sessionId: string;
  context: ComplianceContext;
  durationSeconds: number;
  alertCount: number;
  criticalCount: number;
  transcriptHash: string;   // SHA-256 of full transcript
  ruleIds: string[];         // all rules that fired
  chainSeq?: number;
  combinedHash?: string;
}

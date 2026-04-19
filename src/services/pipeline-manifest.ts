/**
 * Pipeline Manifest
 *
 * Maps every Citizen to the specific pull configurations that fill them
 * with real documents. When you call fill(citizenName), this knows exactly
 * which APIs to hit and what search terms to use.
 *
 * Each Citizen gets a set of PullConfigs — targeted queries against public
 * document sources that produce document types routed to that Citizen.
 */

import type { Env } from "../index.js";
import { DocumentFeedEngine } from "./document-feed.js";
import type { FeedProcessResult } from "./document-feed.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

interface PullConfig {
  source: string;
  pull: (engine: DocumentFeedEngine, env: Env, limit: number) => Promise<FeedProcessResult[]>;
  description: string;
}

interface CitizenManifest {
  citizenName: string;
  domain: string;
  pulls: PullConfig[];
}

interface FillResult {
  citizenName: string;
  domain: string;
  totalPulled: number;
  bySource: Record<string, { pulled: number; error?: string }>;
}

// ═══════════════════════════════════════════════════════════════════════════
// The Manifest — every Citizen's feed configuration
// ═══════════════════════════════════════════════════════════════════════════

const CITIZEN_MANIFESTS: CitizenManifest[] = [
  // ─── REGULIS — Regulatory Intelligence ────────────────────────────
  {
    citizenName: "REGULIS",
    domain: "Regulatory compliance, FDA, Federal Register, California state",
    pulls: [
      {
        source: "fedreg",
        description: "Federal Register final rules",
        pull: (e, env, limit) => e.pullFedReg(env, { type: "RULE", limit }),
      },
      {
        source: "fedreg-proposed",
        description: "Federal Register proposed rules",
        pull: (e, env, limit) => e.pullFedReg(env, { type: "PRORULE", limit }),
      },
      {
        source: "fda-drug",
        description: "FDA drug enforcement/recalls",
        pull: (e, env, limit) => e.pullFda(env, { type: "drug", limit }),
      },
      {
        source: "fda-food",
        description: "FDA food enforcement/recalls",
        pull: (e, env, limit) => e.pullFda(env, { type: "food", limit }),
      },
      {
        source: "fda-device",
        description: "FDA device enforcement/recalls",
        pull: (e, env, limit) => e.pullFda(env, { type: "device", limit }),
      },
      {
        source: "california",
        description: "California court opinions",
        pull: (e, env, limit) => e.pullCalifornia(env, { limit }),
      },
    ],
  },

  // ─── ADVOCIS — Client Advocacy & Civil Rights ─────────────────────
  {
    citizenName: "ADVOCIS",
    domain: "Constitutional rights, civil rights, victim rights, family law, FOIA",
    pulls: [
      {
        source: "courtlistener-civil-rights",
        description: "Civil rights court opinions",
        pull: (e, env, limit) => e.pullCourtListener(env, { search: "civil rights section 1983", limit }),
      },
      {
        source: "courtlistener-due-process",
        description: "Due process opinions",
        pull: (e, env, limit) => e.pullCourtListener(env, { search: "due process fourteenth amendment", limit }),
      },
      {
        source: "caselaw-family",
        description: "Family law cases",
        pull: (e, env, limit) => e.pullCaselaw(env, { search: "custody dissolution family law", jurisdiction: "cal", limit }),
      },
      {
        source: "caselaw-civil-rights",
        description: "Civil rights cases",
        pull: (e, env, limit) => e.pullCaselaw(env, { search: "qualified immunity civil rights", limit }),
      },
      {
        source: "muckrock-police",
        description: "FOIA: police/law enforcement records",
        pull: (e, env, limit) => e.pullMuckRock(env, { search: "police department", status: "done", limit }),
      },
      {
        source: "muckrock-foia",
        description: "FOIA: government accountability",
        pull: (e, env, limit) => e.pullMuckRock(env, { search: "records request", status: "done", limit }),
      },
      {
        source: "pacer-cand",
        description: "N.D. Cal. federal court filings",
        pull: (e, env, limit) => e.pullPacer(env, { court: "cand", limit }),
      },
      {
        source: "california-family",
        description: "California family law opinions",
        pull: (e, env, limit) => e.pullCalifornia(env, { search: "custody child support dissolution", limit }),
      },
    ],
  },

  // ─── CLARIDEX — Financial Disclosure & Reporting ──────────────────
  {
    citizenName: "CLARIDEX",
    domain: "SEC 10-K, 10-Q, material weakness, restatements, GAAP",
    pulls: [
      {
        source: "edgar-material-weakness",
        description: "SEC filings: material weakness disclosures",
        pull: (e, env, limit) => e.pullEdgar(env, { search: "material weakness internal control", forms: "10-K,10-Q", limit }),
      },
      {
        source: "edgar-restatement",
        description: "SEC filings: financial restatements",
        pull: (e, env, limit) => e.pullEdgar(env, { search: "restatement restated financial statements", forms: "10-K,8-K", limit }),
      },
      {
        source: "edgar-10k",
        description: "SEC 10-K annual reports",
        pull: (e, env, limit) => e.pullEdgar(env, { search: "annual report", forms: "10-K", limit }),
      },
      {
        source: "edgar-sox",
        description: "SEC filings: Sarbanes-Oxley disclosures",
        pull: (e, env, limit) => e.pullEdgar(env, { search: "sarbanes oxley section 404 internal controls", limit }),
      },
    ],
  },

  // ─── VESTARA — Investor Relations ─────────────────────────────────
  {
    citizenName: "VESTARA",
    domain: "SEC proxy, registration, 8-K material events",
    pulls: [
      {
        source: "edgar-proxy",
        description: "SEC DEF 14A proxy statements",
        pull: (e, env, limit) => e.pullEdgar(env, { search: "executive compensation proxy", forms: "DEF 14A", limit }),
      },
      {
        source: "edgar-8k",
        description: "SEC 8-K material events",
        pull: (e, env, limit) => e.pullEdgar(env, { search: "current report material event", forms: "8-K", limit }),
      },
      {
        source: "edgar-s1",
        description: "SEC S-1 registration statements",
        pull: (e, env, limit) => e.pullEdgar(env, { search: "registration statement initial public offering", forms: "S-1", limit }),
      },
    ],
  },

  // ─── VIGILUS — Threat Assessment & Operational Risk ────────────────
  {
    citizenName: "VIGILUS",
    domain: "OSHA workplace safety, EPA environmental enforcement",
    pulls: [
      {
        source: "osha-inspections",
        description: "OSHA workplace inspections",
        pull: (e, env, limit) => e.pullOsha(env, { limit }),
      },
      {
        source: "osha-california",
        description: "OSHA California inspections",
        pull: (e, env, limit) => e.pullOsha(env, { state: "CA", limit }),
      },
      {
        source: "epa-enforcement",
        description: "EPA enforcement actions",
        pull: (e, env, limit) => e.pullEpa(env, { limit }),
      },
      {
        source: "epa-california",
        description: "EPA California enforcement",
        pull: (e, env, limit) => e.pullEpa(env, { state: "CA", limit }),
      },
      {
        source: "epa-cwa",
        description: "EPA Clean Water Act violations",
        pull: (e, env, limit) => e.pullEpa(env, { program: "CWA", limit }),
      },
      {
        source: "epa-rcra",
        description: "EPA RCRA hazardous waste violations",
        pull: (e, env, limit) => e.pullEpa(env, { program: "RCRA", limit }),
      },
    ],
  },

  // ─── PRIVAXIS — Data Protection & Privacy ─────────────────────────
  {
    citizenName: "PRIVAXIS",
    domain: "CFPB consumer complaints, data breaches, privacy enforcement",
    pulls: [
      {
        source: "cfpb-mortgage",
        description: "CFPB mortgage complaints with narratives",
        pull: (e, env, limit) => e.pullCfpb(env, { product: "Mortgage", limit }),
      },
      {
        source: "cfpb-credit-card",
        description: "CFPB credit card complaints",
        pull: (e, env, limit) => e.pullCfpb(env, { product: "Credit card", limit }),
      },
      {
        source: "cfpb-student-loan",
        description: "CFPB student loan complaints",
        pull: (e, env, limit) => e.pullCfpb(env, { product: "Student loan", limit }),
      },
      {
        source: "cfpb-debt-collection",
        description: "CFPB debt collection complaints",
        pull: (e, env, limit) => e.pullCfpb(env, { product: "Debt collection", limit }),
      },
      {
        source: "cfpb-california",
        description: "CFPB California complaints",
        pull: (e, env, limit) => e.pullCfpb(env, { state: "CA", limit }),
      },
      {
        source: "cfpb-banking",
        description: "CFPB checking/savings complaints",
        pull: (e, env, limit) => e.pullCfpb(env, { product: "Checking or savings account", limit }),
      },
    ],
  },

  // ─── METRIQA — Performance Analytics ──────────────────────────────
  {
    citizenName: "METRIQA",
    domain: "GAO audit reports, bid protests, government accountability",
    pulls: [
      {
        source: "gao-audit",
        description: "GAO audit reports",
        pull: (e, env, limit) => e.pullGao(env, { search: "audit financial management", limit }),
      },
      {
        source: "gao-defense",
        description: "GAO defense/national security reports",
        pull: (e, env, limit) => e.pullGao(env, { topic: "DEFENSE", limit }),
      },
      {
        source: "gao-healthcare",
        description: "GAO healthcare reports",
        pull: (e, env, limit) => e.pullGao(env, { topic: "HEALTH CARE", limit }),
      },
      {
        source: "gao-financial",
        description: "GAO financial management reports",
        pull: (e, env, limit) => e.pullGao(env, { topic: "FINANCIAL MANAGEMENT", limit }),
      },
      {
        source: "gao-it",
        description: "GAO information technology reports",
        pull: (e, env, limit) => e.pullGao(env, { search: "information technology cybersecurity", limit }),
      },
    ],
  },

  // ─── NEXARIS — Partnerships & Reputation ──────────────────────────
  {
    citizenName: "NEXARIS",
    domain: "SAM.gov exclusions, federal contractor integrity, FTC enforcement",
    pulls: [
      {
        source: "sam-exclusions",
        description: "SAM.gov debarment/exclusion records",
        pull: (e, env, limit) => e.pullSam(env, { limit }),
      },
      {
        source: "sam-california",
        description: "SAM.gov California exclusions",
        pull: (e, env, limit) => e.pullSam(env, { state: "CA", limit }),
      },
    ],
  },

  // ─── FISCARA — Financial Strategy ─────────────────────────────────
  {
    citizenName: "FISCARA",
    domain: "Banking, financial documents, FCRA, consumer reports",
    pulls: [
      {
        source: "cfpb-credit-reporting",
        description: "CFPB credit reporting complaints",
        pull: (e, env, limit) => e.pullCfpb(env, { product: "Credit reporting or other personal consumer reports", limit }),
      },
      {
        source: "courtlistener-fcra",
        description: "FCRA court opinions",
        pull: (e, env, limit) => e.pullCourtListener(env, { search: "fair credit reporting act FCRA", limit }),
      },
    ],
  },

  // ─── ETHICARA — Professional Standards ────────────────────────────
  {
    citizenName: "ETHICARA",
    domain: "Professional conduct, attorney discipline, medical standards",
    pulls: [
      {
        source: "courtlistener-attorney-discipline",
        description: "Attorney discipline opinions",
        pull: (e, env, limit) => e.pullCourtListener(env, { search: "attorney discipline disbarment", limit }),
      },
      {
        source: "caselaw-malpractice",
        description: "Professional malpractice cases",
        pull: (e, env, limit) => e.pullCaselaw(env, { search: "medical malpractice professional negligence", limit }),
      },
    ],
  },

  // ─── INTEGRA — Triage & Intake ────────────────────────────────────
  {
    citizenName: "INTEGRA",
    domain: "General intake, unclassified documents, triage",
    pulls: [
      {
        source: "fedreg-notices",
        description: "Federal Register notices (general intake)",
        pull: (e, env, limit) => e.pullFedReg(env, { type: "NOTICE", limit }),
      },
    ],
  },

  // ─── LEXARC — Corporate Strategy ──────────────────────────────────
  {
    citizenName: "LEXARC",
    domain: "Corporate governance, style enforcement, legal architecture",
    pulls: [
      {
        source: "courtlistener-corporate",
        description: "Corporate governance opinions",
        pull: (e, env, limit) => e.pullCourtListener(env, { search: "corporate governance fiduciary duty", limit }),
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// Pipeline Manifest Engine
// ═══════════════════════════════════════════════════════════════════════════

export class PipelineManifest {

  /**
   * Get the manifest for a specific Citizen.
   */
  static getManifest(citizenName: string): CitizenManifest | undefined {
    return CITIZEN_MANIFESTS.find(m => m.citizenName === citizenName.toUpperCase());
  }

  /**
   * Get all manifests.
   */
  static getAllManifests(): CitizenManifest[] {
    return CITIZEN_MANIFESTS;
  }

  /**
   * List all Citizens with their domain and pull count.
   */
  static listCitizens(): Array<{ citizenName: string; domain: string; pullCount: number }> {
    return CITIZEN_MANIFESTS.map(m => ({
      citizenName: m.citizenName,
      domain: m.domain,
      pullCount: m.pulls.length,
    }));
  }

  /**
   * Fill a specific Citizen with real documents.
   * Runs all pull configs for that Citizen with error isolation.
   */
  static async fillCitizen(
    citizenName: string,
    env: Env,
    limit: number = 5,
  ): Promise<FillResult> {
    const manifest = this.getManifest(citizenName);
    if (!manifest) {
      return {
        citizenName,
        domain: "UNKNOWN",
        totalPulled: 0,
        bySource: { error: { pulled: 0, error: `No manifest for Citizen: ${citizenName}` } },
      };
    }

    const engine = new DocumentFeedEngine(env);
    await engine.ensureTables();

    const bySource: Record<string, { pulled: number; error?: string }> = {};
    let totalPulled = 0;

    for (const pull of manifest.pulls) {
      try {
        const results = await pull.pull(engine, env, limit);
        bySource[pull.source] = { pulled: results.length };
        totalPulled += results.length;
      } catch (e: unknown) {
        bySource[pull.source] = {
          pulled: 0,
          error: e instanceof Error ? e.message : String(e),
        };
      }
    }

    return {
      citizenName: manifest.citizenName,
      domain: manifest.domain,
      totalPulled,
      bySource,
    };
  }

  /**
   * Fill ALL Citizens with real documents.
   * Runs every manifest sequentially with error isolation per Citizen.
   */
  static async fillAll(
    env: Env,
    limit: number = 3,
  ): Promise<{
    totalCitizens: number;
    totalPulled: number;
    results: FillResult[];
  }> {
    const results: FillResult[] = [];
    let totalPulled = 0;

    for (const manifest of CITIZEN_MANIFESTS) {
      const result = await this.fillCitizen(manifest.citizenName, env, limit);
      results.push(result);
      totalPulled += result.totalPulled;
    }

    return {
      totalCitizens: CITIZEN_MANIFESTS.length,
      totalPulled,
      results,
    };
  }
}

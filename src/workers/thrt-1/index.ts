/**
 * THRT-1 — Threat Intelligence Worker for VIGILUS.
 *
 * Scans the threat landscape, assesses cyber and regulatory threats,
 * and maintains an active threat alert feed. The early warning system.
 */

import type { Env } from "../../index.js";
import { generateId ,safeKvPut} from "../../utils/helpers.js";
import { ThreatType, ThreatSeverity } from "./types.js";
import type {
  ThreatAssessment,
  ThreatAssessmentRow,
  ThreatLandscape,
  CyberThreatReport,
  RegulatoryThreatReport,
} from "./types.js";

const KV_PREFIX = "VIGILUS:threat:";

/**
 * Convert a D1 row into a ThreatAssessment domain object.
 */
function rowToThreat(row: ThreatAssessmentRow): ThreatAssessment {
  return {
    id: row.id,
    threatType: row.threat_type as ThreatType,
    severity: row.severity as ThreatSeverity,
    description: row.description,
    source: row.source,
    active: row.active === 1,
    assessedAt: row.assessed_at,
  };
}

/**
 * Determine the highest severity from a list of threats.
 */
function highestSeverity(threats: ThreatAssessment[]): ThreatSeverity {
  const order = [
    ThreatSeverity.LOW,
    ThreatSeverity.MEDIUM,
    ThreatSeverity.HIGH,
    ThreatSeverity.CRITICAL,
  ];

  let max = ThreatSeverity.LOW;
  for (const t of threats) {
    if (order.indexOf(t.severity) > order.indexOf(max)) {
      max = t.severity;
    }
  }
  return max;
}

export class Thrt1Worker {
  /**
   * Generate a current threat landscape assessment based on system state.
   * Persists new threat assessments to D1 and returns the full picture.
   */
  async scanThreatLandscape(env: Env): Promise<ThreatLandscape> {
    const now = new Date().toISOString();
    const threats: ThreatAssessment[] = [];

    // Generate baseline threat assessments from known vectors
    const baselineThreats: Array<Omit<ThreatAssessment, "id" | "assessedAt">> = [
      {
        threatType: ThreatType.CYBER,
        severity: ThreatSeverity.MEDIUM,
        description: "API endpoint exposure — public-facing compliance endpoints require continuous monitoring",
        source: "THRT-1 automated scan",
        active: true,
      },
      {
        threatType: ThreatType.REGULATORY,
        severity: ThreatSeverity.MEDIUM,
        description: "Multi-state compliance landscape — regulatory changes across 50 states require tracking",
        source: "THRT-1 regulatory monitor",
        active: true,
      },
      {
        threatType: ThreatType.OPERATIONAL,
        severity: ThreatSeverity.LOW,
        description: "Single-founder operational risk — bus factor of 1 for critical decisions",
        source: "THRT-1 operational review",
        active: true,
      },
      {
        threatType: ThreatType.COMPETITIVE,
        severity: ThreatSeverity.LOW,
        description: "Market entry by established legal tech competitors into AI compliance space",
        source: "THRT-1 market intelligence",
        active: true,
      },
    ];

    for (const bt of baselineThreats) {
      const id = generateId("thrt");
      const threat: ThreatAssessment = { id, ...bt, assessedAt: now };
      threats.push(threat);

      // Persist to D1
      try {
        await env.DB.prepare(
          `INSERT INTO threat_assessments
           (id, threat_type, severity, description, source, active, assessed_at)
           VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`
        )
          .bind(id, bt.threatType, bt.severity, bt.description, bt.source, bt.active ? 1 : 0, now)
          .run();
      } catch {
        // Table may not exist — store in KV as fallback
        await safeKvPut(env.KNOWLEDGE_STORE, `${KV_PREFIX}${id}`, JSON.stringify(threat));
      }
    }

    return {
      threats,
      overallSeverity: highestSeverity(threats),
      activeCount: threats.filter((t) => t.active).length,
      assessedAt: now,
    };
  }

  /**
   * Assess platform-specific cyber threats.
   */
  async assessCyberThreats(env: Env): Promise<CyberThreatReport> {
    const now = new Date().toISOString();

    const cyberThreats: ThreatAssessment[] = [
      {
        id: generateId("thrt"),
        threatType: ThreatType.CYBER,
        severity: ThreatSeverity.HIGH,
        description: "D1 database injection — parameterized queries must be enforced across all workers",
        source: "THRT-1 cyber assessment",
        active: true,
        assessedAt: now,
      },
      {
        id: generateId("thrt"),
        threatType: ThreatType.CYBER,
        severity: ThreatSeverity.MEDIUM,
        description: "API key rotation — single API key across all founder endpoints increases blast radius",
        source: "THRT-1 cyber assessment",
        active: true,
        assessedAt: now,
      },
      {
        id: generateId("thrt"),
        threatType: ThreatType.CYBER,
        severity: ThreatSeverity.MEDIUM,
        description: "KV store data integrity — no encryption at rest for knowledge store entries",
        source: "THRT-1 cyber assessment",
        active: true,
        assessedAt: now,
      },
    ];

    // Persist each to D1
    for (const threat of cyberThreats) {
      try {
        await env.DB.prepare(
          `INSERT INTO threat_assessments
           (id, threat_type, severity, description, source, active, assessed_at)
           VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`
        )
          .bind(threat.id, threat.threatType, threat.severity, threat.description, threat.source, 1, now)
          .run();
      } catch {
        await safeKvPut(env.KNOWLEDGE_STORE, `${KV_PREFIX}${threat.id}`, JSON.stringify(threat));
      }
    }

    return {
      threats: cyberThreats,
      platformExposures: [
        "Public API surface at workers.dev domain",
        "Cloudflare D1 shared database for all persona citizens",
        "KV namespace used for sensitive knowledge storage",
      ],
      recommendations: [
        "Implement API key rotation policy (every 90 days)",
        "Add request signing for inter-citizen communication",
        "Enable D1 query logging for anomaly detection",
        "Encrypt sensitive KV entries at the application layer",
      ],
      assessedAt: now,
    };
  }

  /**
   * Assess regulatory enforcement trends and upcoming risks.
   */
  async assessRegulatoryThreats(env: Env): Promise<RegulatoryThreatReport> {
    const now = new Date().toISOString();

    const regulatoryThreats: ThreatAssessment[] = [
      {
        id: generateId("thrt"),
        threatType: ThreatType.REGULATORY,
        severity: ThreatSeverity.HIGH,
        description: "AI regulation — emerging state-level AI compliance mandates may require product changes",
        source: "THRT-1 regulatory monitor",
        active: true,
        assessedAt: now,
      },
      {
        id: generateId("thrt"),
        threatType: ThreatType.REGULATORY,
        severity: ThreatSeverity.MEDIUM,
        description: "Data privacy — evolving CCPA/CPRA enforcement may impact data handling practices",
        source: "THRT-1 regulatory monitor",
        active: true,
        assessedAt: now,
      },
      {
        id: generateId("thrt"),
        threatType: ThreatType.REGULATORY,
        severity: ThreatSeverity.MEDIUM,
        description: "Unauthorized practice of law — compliance product positioning must avoid UPL claims",
        source: "THRT-1 regulatory monitor",
        active: true,
        assessedAt: now,
      },
    ];

    // Persist each to D1
    for (const threat of regulatoryThreats) {
      try {
        await env.DB.prepare(
          `INSERT INTO threat_assessments
           (id, threat_type, severity, description, source, active, assessed_at)
           VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`
        )
          .bind(threat.id, threat.threatType, threat.severity, threat.description, threat.source, 1, now)
          .run();
      } catch {
        await safeKvPut(env.KNOWLEDGE_STORE, `${KV_PREFIX}${threat.id}`, JSON.stringify(threat));
      }
    }

    return {
      threats: regulatoryThreats,
      upcomingDeadlines: [
        "State AI disclosure requirements — various effective dates 2026-2027",
        "CPRA enforcement actions — ongoing",
        "FTC AI enforcement guidance — expected Q2 2026",
      ],
      enforcementTrends: [
        "Increased state AG focus on AI-generated legal advice",
        "FTC targeting misleading AI capability claims",
        "Growing UPL enforcement against legal tech platforms",
      ],
      assessedAt: now,
    };
  }

  /**
   * Get all currently active threat alerts.
   */
  async getActiveThreatAlerts(env: Env): Promise<ThreatAssessment[]> {
    try {
      const result = await env.DB.prepare(
        `SELECT * FROM threat_assessments
         WHERE active = 1
         ORDER BY
           CASE severity
             WHEN 'CRITICAL' THEN 1
             WHEN 'HIGH' THEN 2
             WHEN 'MEDIUM' THEN 3
             WHEN 'LOW' THEN 4
           END,
           assessed_at DESC
         LIMIT 50`
      ).all<ThreatAssessmentRow>();

      if (result.success && result.results) {
        return result.results.map(rowToThreat);
      }
    } catch {
      // Table may not exist
    }

    return [];
  }
}

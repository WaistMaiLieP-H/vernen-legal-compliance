/**
 * Pipeline Analytics Engine — Cross-Pipeline Intelligence
 *
 * Aggregates data across all 40 intelligence pipelines to provide:
 * - Total leads by agency, state, risk tier
 * - Trending enforcement patterns
 * - Cross-pipeline correlation (same entity in multiple agencies)
 * - Geographic hotspots
 * - Risk distribution analysis
 */

// ═══════════════════════════════════════════════════════════════════════════
// All lead tables with their schema patterns
// ═══════════════════════════════════════════════════════════════════════════

const PIPELINE_TABLES: { table: string; agency: string; entityCol: string; stateCol: string }[] = [
  { table: "fac_leads", agency: "FAC", entityCol: "auditee_name", stateCol: "state" },
  { table: "hhs_breach_leads", agency: "HHS", entityCol: "covered_entity", stateCol: "state" },
  { table: "edgar_leads", agency: "EDGAR", entityCol: "company_name", stateCol: "state" },
  { table: "sba_leads", agency: "SBA", entityCol: "firm_name", stateCol: "state" },
  { table: "spending_leads", agency: "USAspending", entityCol: "recipient_name", stateCol: "state" },
  { table: "epa_leads", agency: "EPA", entityCol: "facility_name", stateCol: "state" },
  { table: "cfpb_leads", agency: "CFPB", entityCol: "company", stateCol: "state" },
  { table: "osha_leads", agency: "OSHA", entityCol: "establishment_name", stateCol: "state" },
  { table: "fda_leads", agency: "FDA", entityCol: "recalling_firm", stateCol: "state" },
  { table: "ftc_leads", agency: "FTC", entityCol: "case_name", stateCol: "state" },
  { table: "recap_leads", agency: "RECAP", entityCol: "case_name", stateCol: "court" },
  { table: "eeoc_leads", agency: "EEOC", entityCol: "basis", stateCol: "basis" },
  { table: "nlrb_leads", agency: "NLRB", entityCol: "case_name", stateCol: "state" },
  { table: "nhtsa_leads", agency: "NHTSA", entityCol: "entity", stateCol: "make" },
  { table: "fcc_leads", agency: "FCC", entityCol: "entity_name", stateCol: "state" },
  { table: "usda_leads", agency: "USDA", entityCol: "establishment", stateCol: "state" },
  { table: "cms_leads", agency: "CMS", entityCol: "facility_name", stateCol: "state" },
  { table: "sam_leads", agency: "SAM", entityCol: "entity_name", stateCol: "state" },
  { table: "msha_leads", agency: "MSHA", entityCol: "operator_name", stateCol: "state" },
  { table: "fmcsa_leads", agency: "FMCSA", entityCol: "legal_name", stateCol: "state" },
  { table: "ntsb_leads", agency: "NTSB", entityCol: "entity", stateCol: "state" },
  { table: "irs_leads", agency: "IRS", entityCol: "organization_name", stateCol: "state" },
  { table: "cpsc_leads", agency: "CPSC", entityCol: "manufacturer", stateCol: "recall_date" },
  { table: "doe_leads", agency: "DOE", entityCol: "entity_name", stateCol: "state" },
  { table: "hud_leads", agency: "HUD", entityCol: "entity_name", stateCol: "state" },
  { table: "phmsa_leads", agency: "PHMSA", entityCol: "operator_name", stateCol: "state" },
  { table: "atf_leads", agency: "ATF", entityCol: "licensee", stateCol: "state" },
  { table: "cftc_leads", agency: "CFTC", entityCol: "respondent", stateCol: "action_type" },
  { table: "nrc_leads", agency: "NRC", entityCol: "licensee", stateCol: "state" },
  { table: "ferc_leads", agency: "FERC", entityCol: "respondent", stateCol: "state" },
  { table: "pbgc_leads", agency: "PBGC", entityCol: "sponsor_name", stateCol: "state" },
  { table: "sec_ia_leads", agency: "SEC-IA", entityCol: "respondent", stateCol: "state" },
  { table: "dcma_leads", agency: "DCMA", entityCol: "contractor", stateCol: "state" },
  { table: "ttb_leads", agency: "TTB", entityCol: "permit_holder", stateCol: "state" },
  { table: "ofac_leads", agency: "OFAC", entityCol: "entity_name", stateCol: "program" },
  { table: "fincen_leads", agency: "FinCEN", entityCol: "entity_name", stateCol: "state" },
  { table: "occ_leads", agency: "OCC", entityCol: "bank_name", stateCol: "state" },
  { table: "fdic_leads", agency: "FDIC", entityCol: "bank_name", stateCol: "state" },
  { table: "ncua_leads", agency: "NCUA", entityCol: "credit_union", stateCol: "state" },
  // ─── Wave 7 — California state pipelines (bulk-file ingest) ─────────────
  { table: "cslb_leads", agency: "CSLB", entityCol: "business_name", stateCol: "state" },
];

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface AgencySnapshot {
  agency: string;
  totalLeads: number;
  avgRiskScore: number;
  maxRiskScore: number;
  criticalLeads: number;   // score >= 70
  highLeads: number;       // score 50-69
  mediumLeads: number;     // score 25-49
  lowLeads: number;        // score < 25
  lastUpdated: string;
}

export interface StateHotspot {
  state: string;
  totalLeads: number;
  avgRiskScore: number;
  topAgencies: string[];
  criticalCount: number;
}

export interface RiskDistribution {
  critical: number;
  high: number;
  medium: number;
  low: number;
  total: number;
  avgScore: number;
}

export interface CrossPipelineMatch {
  entityName: string;
  agencies: string[];
  totalFindings: number;
  highestRisk: number;
  matchType: string;
}

export interface PlatformAnalytics {
  generatedAt: string;
  totalLeadsAcrossPipelines: number;
  activePipelines: number;
  emptyPipelines: string[];
  riskDistribution: RiskDistribution;
  agencySnapshots: AgencySnapshot[];
  topStates: StateHotspot[];
  topHighRiskLeads: { agency: string; entity: string; riskScore: number }[];
  crossPipelineMatches: CrossPipelineMatch[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Analytics Engine
// ═══════════════════════════════════════════════════════════════════════════

export class PipelineAnalyticsEngine {

  /**
   * Full platform analytics — aggregates across all 40 pipelines.
   * Uses a single query per table (aggregate) to stay under D1 limits.
   */
  async getFullAnalytics(db: D1Database): Promise<PlatformAnalytics> {
    const now = new Date().toISOString();
    const snapshots: AgencySnapshot[] = [];
    const allHighRisk: { agency: string; entity: string; riskScore: number }[] = [];
    const entityIndex: Map<string, { agencies: Set<string>; count: number; maxRisk: number }> = new Map();

    // Process in batches of 10 to stay under D1 subrequest limits
    for (let i = 0; i < PIPELINE_TABLES.length; i += 10) {
      const batch = PIPELINE_TABLES.slice(i, i + 10);
      const stmts = batch.flatMap(p => [
        // Aggregate stats
        db.prepare(`SELECT COUNT(*) as cnt, COALESCE(AVG(risk_score),0) as avg_score, COALESCE(MAX(risk_score),0) as max_score, SUM(CASE WHEN risk_score >= 70 THEN 1 ELSE 0 END) as critical, SUM(CASE WHEN risk_score >= 50 AND risk_score < 70 THEN 1 ELSE 0 END) as high, SUM(CASE WHEN risk_score >= 25 AND risk_score < 50 THEN 1 ELSE 0 END) as medium, SUM(CASE WHEN risk_score < 25 THEN 1 ELSE 0 END) as low, MAX(created_at) as last_updated FROM ${p.table}`),
        // Top 5 high-risk leads
        db.prepare(`SELECT ${p.entityCol} as entity, risk_score FROM ${p.table} ORDER BY risk_score DESC LIMIT 5`),
      ]);

      try {
        const results = await db.batch(stmts);

        for (let j = 0; j < batch.length; j++) {
          const p = batch[j]!;
          const aggResult = results[j * 2]!;
          const topResult = results[j * 2 + 1]!;

          const agg = (aggResult.results?.[0] ?? {}) as Record<string, unknown>;
          const count = Number(agg["cnt"] ?? 0);

          snapshots.push({
            agency: p.agency,
            totalLeads: count,
            avgRiskScore: Math.round(Number(agg["avg_score"] ?? 0)),
            maxRiskScore: Number(agg["max_score"] ?? 0),
            criticalLeads: Number(agg["critical"] ?? 0),
            highLeads: Number(agg["high"] ?? 0),
            mediumLeads: Number(agg["medium"] ?? 0),
            lowLeads: Number(agg["low"] ?? 0),
            lastUpdated: String(agg["last_updated"] ?? ""),
          });

          // Collect high-risk leads
          for (const row of (topResult.results ?? []) as Record<string, unknown>[]) {
            const score = Number(row["risk_score"] ?? 0);
            const entity = String(row["entity"] ?? "Unknown");
            if (score >= 50) {
              allHighRisk.push({ agency: p.agency, entity, riskScore: score });
            }
            // Build entity cross-reference index
            const key = entity.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 30);
            if (key.length > 3) {
              const existing = entityIndex.get(key);
              if (existing) {
                existing.agencies.add(p.agency);
                existing.count++;
                existing.maxRisk = Math.max(existing.maxRisk, score);
              } else {
                entityIndex.set(key, { agencies: new Set([p.agency]), count: 1, maxRisk: score });
              }
            }
          }
        }
      } catch {
        // Table might not exist yet — skip batch
        for (const p of batch) {
          snapshots.push({
            agency: p.agency, totalLeads: 0, avgRiskScore: 0, maxRiskScore: 0,
            criticalLeads: 0, highLeads: 0, mediumLeads: 0, lowLeads: 0, lastUpdated: "",
          });
        }
      }
    }

    // Compute aggregates
    const totalLeads = snapshots.reduce((s, a) => s + a.totalLeads, 0);
    const activePipelines = snapshots.filter(s => s.totalLeads > 0).length;
    const emptyPipelines = snapshots.filter(s => s.totalLeads === 0).map(s => s.agency);

    const riskDistribution: RiskDistribution = {
      critical: snapshots.reduce((s, a) => s + a.criticalLeads, 0),
      high: snapshots.reduce((s, a) => s + a.highLeads, 0),
      medium: snapshots.reduce((s, a) => s + a.mediumLeads, 0),
      low: snapshots.reduce((s, a) => s + a.lowLeads, 0),
      total: totalLeads,
      avgScore: totalLeads > 0 ? Math.round(snapshots.reduce((s, a) => s + a.avgRiskScore * a.totalLeads, 0) / totalLeads) : 0,
    };

    // Sort snapshots by total leads descending
    snapshots.sort((a, b) => b.totalLeads - a.totalLeads);

    // Top high-risk leads
    allHighRisk.sort((a, b) => b.riskScore - a.riskScore);
    const topHighRiskLeads = allHighRisk.slice(0, 25);

    // Cross-pipeline matches (entities appearing in multiple agencies)
    const crossPipelineMatches: CrossPipelineMatch[] = [];
    for (const [, val] of entityIndex) {
      if (val.agencies.size >= 2) {
        crossPipelineMatches.push({
          entityName: [...val.agencies].join(" + "),
          agencies: [...val.agencies],
          totalFindings: val.count,
          highestRisk: val.maxRisk,
          matchType: val.agencies.size >= 3 ? "Multi-Agency" : "Cross-Agency",
        });
      }
    }
    crossPipelineMatches.sort((a, b) => b.highestRisk - a.highestRisk || b.agencies.length - a.agencies.length);

    // State hotspot analysis — aggregate from state-capable tables
    const stateQuery = PIPELINE_TABLES
      .filter(p => p.stateCol === "state")
      .slice(0, 15) // limit for subrequest budget
      .map(p => db.prepare(`SELECT ${p.stateCol} as st, COUNT(*) as cnt, AVG(risk_score) as avg_score, SUM(CASE WHEN risk_score >= 70 THEN 1 ELSE 0 END) as crit FROM ${p.table} WHERE ${p.stateCol} != '' GROUP BY ${p.stateCol} ORDER BY cnt DESC LIMIT 10`));

    const stateMap: Map<string, { total: number; avgScoreSum: number; avgScoreCount: number; critical: number; agencies: Set<string> }> = new Map();

    if (stateQuery.length > 0) {
      try {
        const stateResults = await db.batch(stateQuery);
        const stateTables = PIPELINE_TABLES.filter(p => p.stateCol === "state").slice(0, 15);
        for (let i = 0; i < stateResults.length; i++) {
          const agency = stateTables[i]!.agency;
          for (const row of (stateResults[i]!.results ?? []) as Record<string, unknown>[]) {
            const st = String(row["st"] ?? "").toUpperCase();
            if (st.length !== 2) continue;
            const existing = stateMap.get(st);
            if (existing) {
              existing.total += Number(row["cnt"] ?? 0);
              existing.avgScoreSum += Number(row["avg_score"] ?? 0);
              existing.avgScoreCount++;
              existing.critical += Number(row["crit"] ?? 0);
              existing.agencies.add(agency);
            } else {
              stateMap.set(st, {
                total: Number(row["cnt"] ?? 0),
                avgScoreSum: Number(row["avg_score"] ?? 0),
                avgScoreCount: 1,
                critical: Number(row["crit"] ?? 0),
                agencies: new Set([agency]),
              });
            }
          }
        }
      } catch { /* tables may not exist */ }
    }

    const topStates: StateHotspot[] = [...stateMap.entries()]
      .map(([state, data]) => ({
        state,
        totalLeads: data.total,
        avgRiskScore: Math.round(data.avgScoreSum / Math.max(data.avgScoreCount, 1)),
        topAgencies: [...data.agencies].slice(0, 5),
        criticalCount: data.critical,
      }))
      .sort((a, b) => b.totalLeads - a.totalLeads)
      .slice(0, 20);

    return {
      generatedAt: now,
      totalLeadsAcrossPipelines: totalLeads,
      activePipelines,
      emptyPipelines,
      riskDistribution,
      agencySnapshots: snapshots,
      topStates,
      topHighRiskLeads,
      crossPipelineMatches: crossPipelineMatches.slice(0, 20),
    };
  }

  /**
   * Quick stats — just counts + risk distribution. Fewer D1 calls.
   */
  async getQuickStats(db: D1Database): Promise<{ total: number; active: number; distribution: RiskDistribution; topAgencies: { agency: string; count: number }[] }> {
    const counts: { agency: string; count: number }[] = [];
    let totalCritical = 0, totalHigh = 0, totalMedium = 0, totalLow = 0, totalAll = 0, scoreSum = 0;

    for (let i = 0; i < PIPELINE_TABLES.length; i += 10) {
      const batch = PIPELINE_TABLES.slice(i, i + 10);
      const stmts = batch.map(p =>
        db.prepare(`SELECT COUNT(*) as cnt, COALESCE(AVG(risk_score),0) as avg_score, SUM(CASE WHEN risk_score >= 70 THEN 1 ELSE 0 END) as crit, SUM(CASE WHEN risk_score >= 50 AND risk_score < 70 THEN 1 ELSE 0 END) as hi, SUM(CASE WHEN risk_score >= 25 AND risk_score < 50 THEN 1 ELSE 0 END) as med, SUM(CASE WHEN risk_score < 25 THEN 1 ELSE 0 END) as lo FROM ${p.table}`)
      );
      try {
        const results = await db.batch(stmts);
        for (let j = 0; j < batch.length; j++) {
          const agg = (results[j]!.results?.[0] ?? {}) as Record<string, unknown>;
          const cnt = Number(agg["cnt"] ?? 0);
          counts.push({ agency: batch[j]!.agency, count: cnt });
          totalAll += cnt;
          totalCritical += Number(agg["crit"] ?? 0);
          totalHigh += Number(agg["hi"] ?? 0);
          totalMedium += Number(agg["med"] ?? 0);
          totalLow += Number(agg["lo"] ?? 0);
          scoreSum += Number(agg["avg_score"] ?? 0) * cnt;
        }
      } catch {
        for (const p of batch) counts.push({ agency: p.agency, count: 0 });
      }
    }

    counts.sort((a, b) => b.count - a.count);

    return {
      total: totalAll,
      active: counts.filter(c => c.count > 0).length,
      distribution: {
        critical: totalCritical,
        high: totalHigh,
        medium: totalMedium,
        low: totalLow,
        total: totalAll,
        avgScore: totalAll > 0 ? Math.round(scoreSum / totalAll) : 0,
      },
      topAgencies: counts.slice(0, 10),
    };
  }

  /**
   * Single agency deep-dive — detailed stats for one pipeline.
   */
  async getAgencyDeepDive(db: D1Database, agency: string): Promise<{
    agency: string; found: boolean; totalLeads: number; riskDistribution: RiskDistribution;
    recentLeads: Record<string, unknown>[]; topRiskLeads: Record<string, unknown>[];
  }> {
    const config = PIPELINE_TABLES.find(p => p.agency.toLowerCase() === agency.toLowerCase());
    if (!config) return { agency, found: false, totalLeads: 0, riskDistribution: { critical: 0, high: 0, medium: 0, low: 0, total: 0, avgScore: 0 }, recentLeads: [], topRiskLeads: [] };

    try {
      const [aggResult, recentResult, topResult] = await db.batch([
        db.prepare(`SELECT COUNT(*) as cnt, COALESCE(AVG(risk_score),0) as avg_score, COALESCE(MAX(risk_score),0) as max_score, SUM(CASE WHEN risk_score >= 70 THEN 1 ELSE 0 END) as crit, SUM(CASE WHEN risk_score >= 50 AND risk_score < 70 THEN 1 ELSE 0 END) as hi, SUM(CASE WHEN risk_score >= 25 AND risk_score < 50 THEN 1 ELSE 0 END) as med, SUM(CASE WHEN risk_score < 25 THEN 1 ELSE 0 END) as lo FROM ${config.table}`),
        db.prepare(`SELECT * FROM ${config.table} ORDER BY created_at DESC LIMIT 10`),
        db.prepare(`SELECT * FROM ${config.table} ORDER BY risk_score DESC LIMIT 10`),
      ]);

      const agg = (aggResult!.results?.[0] ?? {}) as Record<string, unknown>;
      return {
        agency: config.agency,
        found: true,
        totalLeads: Number(agg["cnt"] ?? 0),
        riskDistribution: {
          critical: Number(agg["crit"] ?? 0),
          high: Number(agg["hi"] ?? 0),
          medium: Number(agg["med"] ?? 0),
          low: Number(agg["lo"] ?? 0),
          total: Number(agg["cnt"] ?? 0),
          avgScore: Math.round(Number(agg["avg_score"] ?? 0)),
        },
        recentLeads: (recentResult!.results ?? []) as Record<string, unknown>[],
        topRiskLeads: (topResult!.results ?? []) as Record<string, unknown>[],
      };
    } catch {
      return { agency: config.agency, found: true, totalLeads: 0, riskDistribution: { critical: 0, high: 0, medium: 0, low: 0, total: 0, avgScore: 0 }, recentLeads: [], topRiskLeads: [] };
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Store analytics snapshots for trending
// ═══════════════════════════════════════════════════════════════════════════

export async function ensureAnalyticsTables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS analytics_snapshots (id TEXT PRIMARY KEY, snapshot_date TEXT NOT NULL, total_leads INTEGER DEFAULT 0, active_pipelines INTEGER DEFAULT 0, avg_risk_score INTEGER DEFAULT 0, critical_count INTEGER DEFAULT 0, high_count INTEGER DEFAULT 0, agency_data TEXT DEFAULT '{}', state_data TEXT DEFAULT '{}', created_at TEXT DEFAULT (datetime('now')))"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_analytics_date ON analytics_snapshots(snapshot_date DESC)"),
  ]);
}

export async function storeAnalyticsSnapshot(db: D1Database, analytics: PlatformAnalytics): Promise<void> {
  const date = analytics.generatedAt.split("T")[0];
  const id = `snap-${date}-${Date.now().toString(36)}`;
  const agencyData = JSON.stringify(analytics.agencySnapshots.map(a => ({ a: a.agency, c: a.totalLeads, r: a.avgRiskScore })));
  const stateData = JSON.stringify(analytics.topStates.map(s => ({ s: s.state, c: s.totalLeads, r: s.avgRiskScore })));

  await db.prepare(
    "INSERT OR REPLACE INTO analytics_snapshots (id, snapshot_date, total_leads, active_pipelines, avg_risk_score, critical_count, high_count, agency_data, state_data) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(id, date, analytics.totalLeadsAcrossPipelines, analytics.activePipelines, analytics.riskDistribution.avgScore, analytics.riskDistribution.critical, analytics.riskDistribution.high, agencyData, stateData).run();
}

export async function getAnalyticsTrend(db: D1Database, days: number = 30): Promise<Record<string, unknown>[]> {
  try {
    return (await db.prepare(
      "SELECT snapshot_date, total_leads, active_pipelines, avg_risk_score, critical_count, high_count FROM analytics_snapshots ORDER BY snapshot_date DESC LIMIT ?"
    ).bind(days).all()).results as Record<string, unknown>[];
  } catch { return []; }
}

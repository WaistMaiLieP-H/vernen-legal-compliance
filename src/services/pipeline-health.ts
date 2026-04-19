/**
 * Pipeline Health Monitor — Tracks operational status of all 40 pipelines
 *
 * Records run results, API response codes, lead counts, error rates.
 * Enables: which pipelines are producing data, which are failing, which need attention.
 */

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface PipelineRun {
  id: string;
  pipeline: string;
  status: "SUCCESS" | "PARTIAL" | "EMPTY" | "ERROR";
  leadsFound: number;
  leadsStored: number;
  primaryApiUsed: boolean;
  fallbackUsed: boolean;
  errorMessage: string;
  durationMs: number;
  runAt: string;
}

export interface PipelineHealthStatus {
  pipeline: string;
  lastRun: string;
  lastStatus: string;
  totalRuns: number;
  successRate: number;
  avgLeadsPerRun: number;
  avgDurationMs: number;
  lastError: string;
  streak: number;       // consecutive successes (negative = consecutive failures)
  healthGrade: "A" | "B" | "C" | "D" | "F";
}

export interface PlatformHealth {
  generatedAt: string;
  totalPipelines: number;
  healthyPipelines: number;
  degradedPipelines: number;
  failingPipelines: number;
  unknownPipelines: number;
  overallGrade: string;
  pipelines: PipelineHealthStatus[];
}

// ═══════════════════════════════════════════════════════════════════════════
// All 40 pipelines
// ═══════════════════════════════════════════════════════════════════════════

const ALL_PIPELINES = [
  "FAC", "HHS", "EDGAR", "SBA", "USAspending", "FedReg",
  "EPA", "CFPB", "OSHA", "FDA",
  "FTC", "RECAP", "EEOC", "NLRB",
  "NHTSA", "FCC", "USDA", "CMS", "SAM", "MSHA", "FMCSA", "NTSB", "IRS",
  "CPSC", "DOE", "HUD", "PHMSA", "ATF", "CFTC", "NRC", "FERC", "PBGC",
  "SEC-IA", "DCMA", "TTB", "OFAC", "FinCEN", "OCC", "FDIC", "NCUA",
];

// ═══════════════════════════════════════════════════════════════════════════
// Health Monitor
// ═══════════════════════════════════════════════════════════════════════════

export class PipelineHealthMonitor {

  async ensureTables(db: D1Database): Promise<void> {
    await db.batch([
      db.prepare(`CREATE TABLE IF NOT EXISTS pipeline_runs (
        id TEXT PRIMARY KEY,
        pipeline TEXT NOT NULL,
        status TEXT NOT NULL,
        leads_found INTEGER DEFAULT 0,
        leads_stored INTEGER DEFAULT 0,
        primary_api INTEGER DEFAULT 0,
        fallback_used INTEGER DEFAULT 0,
        error_message TEXT DEFAULT '',
        duration_ms INTEGER DEFAULT 0,
        run_at TEXT DEFAULT (datetime('now'))
      )`),
      db.prepare("CREATE INDEX IF NOT EXISTS idx_pipeline_runs_pipeline ON pipeline_runs(pipeline, run_at DESC)"),
      db.prepare("CREATE INDEX IF NOT EXISTS idx_pipeline_runs_status ON pipeline_runs(status)"),
    ]);
  }

  /**
   * Record a pipeline run result.
   */
  async recordRun(db: D1Database, run: PipelineRun): Promise<void> {
    await this.ensureTables(db);
    await db.prepare(
      `INSERT INTO pipeline_runs (id, pipeline, status, leads_found, leads_stored, primary_api, fallback_used, error_message, duration_ms, run_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)`
    ).bind(
      run.id, run.pipeline, run.status, run.leadsFound, run.leadsStored,
      run.primaryApiUsed ? 1 : 0, run.fallbackUsed ? 1 : 0,
      run.errorMessage, run.durationMs, run.runAt
    ).run();
  }

  /**
   * Get health status for all pipelines.
   */
  async getFullHealth(db: D1Database): Promise<PlatformHealth> {
    await this.ensureTables(db);
    const now = new Date().toISOString();
    const pipelines: PipelineHealthStatus[] = [];

    // Process in batches of 10
    for (let i = 0; i < ALL_PIPELINES.length; i += 10) {
      const batch = ALL_PIPELINES.slice(i, i + 10);
      const stmts = batch.map(p =>
        db.prepare(`SELECT
          COUNT(*) as total_runs,
          SUM(CASE WHEN status = 'SUCCESS' OR status = 'PARTIAL' THEN 1 ELSE 0 END) as success_count,
          AVG(leads_found) as avg_leads,
          AVG(duration_ms) as avg_duration,
          MAX(run_at) as last_run,
          (SELECT status FROM pipeline_runs WHERE pipeline = ?1 ORDER BY run_at DESC LIMIT 1) as last_status,
          (SELECT error_message FROM pipeline_runs WHERE pipeline = ?1 AND error_message != '' ORDER BY run_at DESC LIMIT 1) as last_error
        FROM pipeline_runs WHERE pipeline = ?1`).bind(p)
      );

      try {
        const results = await db.batch(stmts);
        for (let j = 0; j < batch.length; j++) {
          const p = batch[j]!;
          const row = (results[j]!.results?.[0] ?? {}) as Record<string, unknown>;
          const totalRuns = Number(row["total_runs"] ?? 0);
          const successCount = Number(row["success_count"] ?? 0);
          const successRate = totalRuns > 0 ? Math.round((successCount / totalRuns) * 100) : 0;

          let healthGrade: "A" | "B" | "C" | "D" | "F";
          if (totalRuns === 0) healthGrade = "F";
          else if (successRate >= 90) healthGrade = "A";
          else if (successRate >= 75) healthGrade = "B";
          else if (successRate >= 50) healthGrade = "C";
          else if (successRate >= 25) healthGrade = "D";
          else healthGrade = "F";

          pipelines.push({
            pipeline: p,
            lastRun: String(row["last_run"] ?? "Never"),
            lastStatus: String(row["last_status"] ?? "UNKNOWN"),
            totalRuns,
            successRate,
            avgLeadsPerRun: Math.round(Number(row["avg_leads"] ?? 0)),
            avgDurationMs: Math.round(Number(row["avg_duration"] ?? 0)),
            lastError: String(row["last_error"] ?? ""),
            streak: 0,
            healthGrade,
          });
        }
      } catch {
        for (const p of batch) {
          pipelines.push({
            pipeline: p, lastRun: "Never", lastStatus: "UNKNOWN", totalRuns: 0,
            successRate: 0, avgLeadsPerRun: 0, avgDurationMs: 0, lastError: "",
            streak: 0, healthGrade: "F",
          });
        }
      }
    }

    const healthy = pipelines.filter(p => p.healthGrade === "A" || p.healthGrade === "B").length;
    const degraded = pipelines.filter(p => p.healthGrade === "C" || p.healthGrade === "D").length;
    const failing = pipelines.filter(p => p.healthGrade === "F" && p.totalRuns > 0).length;
    const unknown = pipelines.filter(p => p.totalRuns === 0).length;

    let overallGrade: string;
    if (healthy >= 35) overallGrade = "A";
    else if (healthy >= 25) overallGrade = "B";
    else if (healthy >= 15) overallGrade = "C";
    else overallGrade = "D";

    return {
      generatedAt: now,
      totalPipelines: ALL_PIPELINES.length,
      healthyPipelines: healthy,
      degradedPipelines: degraded,
      failingPipelines: failing,
      unknownPipelines: unknown,
      overallGrade,
      pipelines,
    };
  }

  /**
   * Get recent runs for a specific pipeline.
   */
  async getPipelineHistory(db: D1Database, pipeline: string, limit: number = 20): Promise<Record<string, unknown>[]> {
    await this.ensureTables(db);
    try {
      return (await db.prepare(
        "SELECT * FROM pipeline_runs WHERE pipeline = ?1 ORDER BY run_at DESC LIMIT ?2"
      ).bind(pipeline, limit).all()).results as Record<string, unknown>[];
    } catch { return []; }
  }

  /**
   * Cleanup old runs (keep last 30 days).
   */
  async cleanup(db: D1Database): Promise<number> {
    await this.ensureTables(db);
    try {
      const result = await db.prepare(
        "DELETE FROM pipeline_runs WHERE run_at < datetime('now', '-30 days')"
      ).run();
      return result.meta?.changes ?? 0;
    } catch { return 0; }
  }
}

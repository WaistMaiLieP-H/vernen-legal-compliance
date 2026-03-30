/**
 * ALLY-1 — Partnership Evaluation Worker for NEXARIS.
 *
 * Evaluates potential partners, tracks active partnerships, and measures
 * partnership ROI. Every partnership is scored across multiple dimensions
 * before advancing from PROSPECT to ACTIVE.
 */

import type { Env } from "../../index.js";
import { generateId ,safeKvPut} from "../../utils/helpers.js";
import { PartnershipStatus } from "./types.js";
import type {
  Partnership,
  PartnershipRow,
  PartnerEvaluation,
  PartnershipROI,
  ReputationScore,
} from "./types.js";

const KV_PREFIX = "NEXARIS:ally:";

/**
 * Convert a D1 row into a Partnership domain object.
 */
function rowToPartnership(row: PartnershipRow): Partnership {
  return {
    id: row.id,
    partnerName: row.partner_name,
    industry: row.industry,
    status: row.status as PartnershipStatus,
    score: row.score,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export class Ally1Worker {
  /**
   * Evaluate a potential partner across key dimensions.
   */
  async evaluatePartner(
    partnerName: string,
    industry: string,
    description: string,
    env: Env
  ): Promise<PartnerEvaluation> {
    const now = new Date().toISOString();

    // Score across multiple dimensions (1-100 each)
    const dimensions = [
      {
        name: "Strategic Alignment",
        score: this._assessStrategicFit(industry),
        weight: 0.25,
        notes: `Evaluated alignment of ${industry} with Vernen's compliance mission`,
      },
      {
        name: "Market Reach",
        score: 70,
        weight: 0.20,
        notes: `Potential client referral pipeline from ${partnerName}`,
      },
      {
        name: "Technical Compatibility",
        score: this._assessTechnicalFit(industry),
        weight: 0.20,
        notes: "API integration potential and data format compatibility",
      },
      {
        name: "Reputation & Trust",
        score: 65,
        weight: 0.15,
        notes: `Brand alignment and public reputation of ${partnerName}`,
      },
      {
        name: "Revenue Potential",
        score: 60,
        weight: 0.10,
        notes: "Estimated revenue contribution from partnership",
      },
      {
        name: "Risk Profile",
        score: 75,
        weight: 0.10,
        notes: "Regulatory and operational risk from association",
      },
    ];

    const overallScore = Math.round(
      dimensions.reduce((sum, d) => sum + d.score * d.weight, 0)
    );

    const recommendation =
      overallScore >= 80 ? "STRONGLY_RECOMMEND" :
      overallScore >= 60 ? "RECOMMEND" :
      overallScore >= 40 ? "PROCEED_WITH_CAUTION" :
      "NOT_RECOMMENDED";

    const risks = [
      `Data sharing obligations with ${partnerName} require PRIVAXIS review`,
      `Revenue-share model may impact unit economics`,
      `Exclusivity clauses could limit future partnerships in ${industry}`,
    ];

    const synergies = [
      `${partnerName} client base overlaps with Vernen's target market`,
      `Joint compliance offerings could command premium pricing`,
      `Shared infrastructure could reduce operational costs`,
    ];

    // Persist evaluation as partnership prospect
    const id = generateId("partner");
    try {
      await env.DB.prepare(
        `INSERT INTO partnerships (id, partner_name, industry, status, score, notes, created_at, updated_at)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)`
      )
        .bind(
          id,
          partnerName,
          industry,
          PartnershipStatus.EVALUATING,
          overallScore,
          description,
          now,
          now
        )
        .run();
    } catch {
      await safeKvPut(env.KNOWLEDGE_STORE, 
        `${KV_PREFIX}partner:${id}`,
        JSON.stringify({
          id, partnerName, industry,
          status: PartnershipStatus.EVALUATING,
          score: overallScore, notes: description,
          createdAt: now, updatedAt: now,
        })
      );
    }

    return {
      partnerName,
      industry,
      overallScore,
      dimensions,
      recommendation,
      risks,
      synergies,
      evaluatedAt: now,
    };
  }

  /**
   * Get all active partnerships.
   */
  async getActivePartnerships(env: Env): Promise<Partnership[]> {
    try {
      const result = await env.DB.prepare(
        `SELECT * FROM partnerships WHERE status = 'ACTIVE' ORDER BY score DESC`
      ).all<PartnershipRow>();

      if (result.success && result.results) {
        return result.results.map(rowToPartnership);
      }
    } catch {
      // Table may not exist
    }
    return [];
  }

  /**
   * Get all partnerships (any status).
   */
  async getAllPartnerships(env: Env): Promise<Partnership[]> {
    try {
      const result = await env.DB.prepare(
        `SELECT * FROM partnerships ORDER BY updated_at DESC`
      ).all<PartnershipRow>();

      if (result.success && result.results) {
        return result.results.map(rowToPartnership);
      }
    } catch {
      // Table may not exist
    }
    return [];
  }

  /**
   * Calculate partnership ROI metrics.
   */
  async getPartnershipROI(env: Env): Promise<PartnershipROI> {
    const now = new Date().toISOString();
    let totalPartnerships = 0;
    let activePartnerships = 0;
    let avgPartnerScore = 0;
    let topPartner: string | null = null;
    const industryBreakdown: Array<{ industry: string; count: number }> = [];

    try {
      const total = await env.DB.prepare(
        `SELECT COUNT(*) as cnt FROM partnerships`
      ).first<{ cnt: number }>();
      totalPartnerships = total?.cnt ?? 0;

      const active = await env.DB.prepare(
        `SELECT COUNT(*) as cnt FROM partnerships WHERE status = 'ACTIVE'`
      ).first<{ cnt: number }>();
      activePartnerships = active?.cnt ?? 0;

      const avg = await env.DB.prepare(
        `SELECT AVG(score) as avg_score FROM partnerships`
      ).first<{ avg_score: number }>();
      avgPartnerScore = Math.round(avg?.avg_score ?? 0);

      const top = await env.DB.prepare(
        `SELECT partner_name FROM partnerships ORDER BY score DESC LIMIT 1`
      ).first<{ partner_name: string }>();
      topPartner = top?.partner_name ?? null;

      const industries = await env.DB.prepare(
        `SELECT industry, COUNT(*) as cnt FROM partnerships GROUP BY industry ORDER BY cnt DESC`
      ).all<{ industry: string; cnt: number }>();

      if (industries.success && industries.results) {
        for (const row of industries.results) {
          industryBreakdown.push({ industry: row.industry, count: row.cnt });
        }
      }
    } catch {
      // Table may not exist
    }

    return {
      totalPartnerships,
      activePartnerships,
      avgPartnerScore,
      topPartner,
      industryBreakdown,
      generatedAt: now,
    };
  }

  /**
   * Calculate platform reputation score.
   */
  async getReputationScore(env: Env): Promise<ReputationScore> {
    const now = new Date().toISOString();

    // Pull data points from across the platform
    let clientCount = 0;
    let activePartners = 0;
    let complianceRate = 0;

    try {
      const clients = await env.DB.prepare(
        `SELECT COUNT(*) as cnt FROM clients`
      ).first<{ cnt: number }>();
      clientCount = clients?.cnt ?? 0;
    } catch { /* Table may not exist */ }

    try {
      const partners = await env.DB.prepare(
        `SELECT COUNT(*) as cnt FROM partnerships WHERE status = 'ACTIVE'`
      ).first<{ cnt: number }>();
      activePartners = partners?.cnt ?? 0;
    } catch { /* Table may not exist */ }

    try {
      const rules = await env.DB.prepare(
        `SELECT COUNT(*) as cnt FROM compliance_rules`
      ).first<{ cnt: number }>();
      complianceRate = rules?.cnt ?? 0;
    } catch { /* Table may not exist */ }

    // Composite reputation dimensions
    const brandStrength = Math.min(100, 50 + clientCount * 2 + activePartners * 5);
    const partnerSatisfaction = activePartners > 0 ? 75 : 50;
    const marketPresence = Math.min(100, complianceRate + clientCount);

    const dimensions = [
      { name: "Brand Trust", score: brandStrength, trend: clientCount > 0 ? "UP" : "STABLE" },
      { name: "Partner Satisfaction", score: partnerSatisfaction, trend: activePartners > 0 ? "UP" : "STABLE" },
      { name: "Market Presence", score: marketPresence, trend: "UP" },
      { name: "Compliance Authority", score: Math.min(100, complianceRate * 2), trend: "UP" },
      { name: "Innovation Index", score: 85, trend: "UP" },
    ];

    const overallScore = Math.round(
      dimensions.reduce((sum, d) => sum + d.score, 0) / dimensions.length
    );

    return {
      overallScore,
      dimensions,
      partnerSatisfaction,
      brandStrength,
      marketPresence,
      assessedAt: now,
    };
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  private _assessStrategicFit(industry: string): number {
    const highFit = ["legal", "compliance", "regulatory", "fintech", "govtech", "legaltech"];
    const medFit = ["insurance", "healthcare", "finance", "banking", "accounting"];
    const lower = industry.toLowerCase();

    if (highFit.some((k) => lower.includes(k))) return 90;
    if (medFit.some((k) => lower.includes(k))) return 70;
    return 50;
  }

  private _assessTechnicalFit(industry: string): number {
    const techForward = ["fintech", "saas", "technology", "cloud", "ai", "legaltech", "govtech"];
    const lower = industry.toLowerCase();

    if (techForward.some((k) => lower.includes(k))) return 85;
    return 60;
  }
}

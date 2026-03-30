import type { ComplianceEvidence, AutomatedCheck, DocumentRecord } from "../types/evidence.js";
import { EvidenceType, EvidenceStatus, AutomatedCheckType } from "../types/evidence.js";
import type { EvidenceStore } from "./compliance-engine.js";
import { generateId } from "../utils/helpers.js";

/**
 * D1EvidenceStore — Database-backed evidence storage.
 * Implements EvidenceStore interface for ComplianceEngine.
 */
export class D1EvidenceStore implements EvidenceStore {
  constructor(private db: D1Database) {}

  async getEvidenceForClient(clientId: string): Promise<ComplianceEvidence[]> {
    const results = await this.db
      .prepare(
        `SELECT * FROM compliance_evidence
         WHERE client_id = ?
         AND status IN ('SUBMITTED', 'VERIFIED')
         ORDER BY created_at DESC`
      )
      .bind(clientId)
      .all();

    return (results.results || []).map(rowToEvidence);
  }

  async getEvidenceForRule(clientId: string, ruleId: string): Promise<ComplianceEvidence[]> {
    const results = await this.db
      .prepare(
        `SELECT * FROM compliance_evidence
         WHERE client_id = ? AND rule_id = ?
         AND status IN ('SUBMITTED', 'VERIFIED')
         ORDER BY evidence_type ASC, created_at DESC`
      )
      .bind(clientId, ruleId)
      .all();

    return (results.results || []).map(rowToEvidence);
  }

  async getAutomatedChecks(clientId: string): Promise<AutomatedCheck[]> {
    const results = await this.db
      .prepare(
        `SELECT * FROM automated_checks
         WHERE client_id = ?
         ORDER BY executed_at DESC`
      )
      .bind(clientId)
      .all();

    return (results.results || []).map(rowToAutoCheck);
  }

  /**
   * Submit a self-attestation as compliance evidence.
   */
  async submitAttestation(
    clientId: string,
    ruleId: string,
    ruleCode: string,
    statement: string,
    attestedBy: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<ComplianceEvidence> {
    const evidenceId = generateId("evi");
    const attestationId = generateId("att");
    const now = new Date().toISOString();

    // Create the attestation record
    await this.db
      .prepare(
        `INSERT INTO self_attestations
         (id, client_id, rule_id, statement, attested_by, attested_at, ip_address, user_agent, evidence_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(attestationId, clientId, ruleId, statement, attestedBy, now, ipAddress || null, userAgent || null, evidenceId)
      .run();

    // Create the evidence record
    const evidence: ComplianceEvidence = {
      id: evidenceId,
      clientId,
      ruleId,
      ruleCode,
      evidenceType: EvidenceType.SELF_ATTESTATION,
      status: EvidenceStatus.SUBMITTED,
      title: `Self-attestation: ${ruleCode}`,
      description: statement,
      attestedBy,
      attestedAt: now,
      expiresAt: getExpirationDate(365), // 1 year default for attestations
      createdAt: now,
      updatedAt: now,
    };

    await this.db
      .prepare(
        `INSERT INTO compliance_evidence
         (id, client_id, rule_id, rule_code, evidence_type, status, title, description,
          attested_by, attested_at, expires_at, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        evidence.id, evidence.clientId, evidence.ruleId, evidence.ruleCode,
        evidence.evidenceType, evidence.status, evidence.title, evidence.description,
        evidence.attestedBy, evidence.attestedAt, evidence.expiresAt,
        evidence.createdAt, evidence.updatedAt
      )
      .run();

    return evidence;
  }

  /**
   * Record an automated check result as compliance evidence.
   */
  async recordAutomatedCheck(
    clientId: string,
    ruleId: string,
    ruleCode: string,
    checkType: AutomatedCheckType,
    result: "PASS" | "FAIL" | "ERROR" | "SKIPPED",
    details: string,
    targetUrl?: string,
    rawResponse?: string,
    durationMs: number = 0
  ): Promise<{ evidence: ComplianceEvidence; check: AutomatedCheck }> {
    const evidenceId = generateId("evi");
    const checkId = generateId("chk");
    const now = new Date().toISOString();

    // Create the check record
    await this.db
      .prepare(
        `INSERT INTO automated_checks
         (id, client_id, check_type, target_url, result, details, raw_response, executed_at, duration_ms, evidence_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(checkId, clientId, checkType, targetUrl || null, result, details, rawResponse || null, now, durationMs, evidenceId)
      .run();

    // Create the evidence record
    const status = result === "PASS" ? EvidenceStatus.VERIFIED : EvidenceStatus.SUBMITTED;
    const evidence: ComplianceEvidence = {
      id: evidenceId,
      clientId,
      ruleId,
      ruleCode,
      evidenceType: EvidenceType.AUTOMATED_CHECK,
      status,
      title: `Auto-check: ${checkType}`,
      description: details,
      automatedCheckId: checkId,
      expiresAt: getExpirationDate(90), // 90 days for automated checks
      createdAt: now,
      updatedAt: now,
    };

    await this.db
      .prepare(
        `INSERT INTO compliance_evidence
         (id, client_id, rule_id, rule_code, evidence_type, status, title, description,
          automated_check_id, expires_at, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        evidence.id, evidence.clientId, evidence.ruleId, evidence.ruleCode,
        evidence.evidenceType, evidence.status, evidence.title, evidence.description,
        evidence.automatedCheckId, evidence.expiresAt,
        evidence.createdAt, evidence.updatedAt
      )
      .run();

    const check: AutomatedCheck = {
      id: checkId,
      checkType,
      targetUrl,
      result,
      details,
      rawResponse,
      executedAt: now,
      durationMs,
    };

    return { evidence, check };
  }

  /**
   * Submit a document as compliance evidence.
   */
  async submitDocument(
    clientId: string,
    ruleId: string,
    ruleCode: string,
    document: DocumentRecord
  ): Promise<ComplianceEvidence> {
    const evidenceId = generateId("evi");
    const now = new Date().toISOString();

    // Store the document record
    await this.db
      .prepare(
        `INSERT INTO document_records
         (id, client_id, title, document_type, category, storage_method, storage_path,
          mime_type, size_bytes, hash_sha256, uploaded_by, uploaded_at, metadata)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        document.id, document.clientId, document.title, document.documentType,
        document.category, document.storageMethod, document.storagePath,
        document.mimeType, document.sizeBytes, document.hashSha256,
        document.uploadedBy, document.uploadedAt, JSON.stringify(document.metadata || {})
      )
      .run();

    // Create the evidence record
    const evidence: ComplianceEvidence = {
      id: evidenceId,
      clientId,
      ruleId,
      ruleCode,
      evidenceType: EvidenceType.DOCUMENT,
      status: EvidenceStatus.SUBMITTED,
      title: `Document: ${document.title}`,
      description: `${document.documentType} uploaded as compliance evidence`,
      documentId: document.id,
      createdAt: now,
      updatedAt: now,
    };

    await this.db
      .prepare(
        `INSERT INTO compliance_evidence
         (id, client_id, rule_id, rule_code, evidence_type, status, title, description,
          document_id, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        evidence.id, evidence.clientId, evidence.ruleId, evidence.ruleCode,
        evidence.evidenceType, evidence.status, evidence.title, evidence.description,
        evidence.documentId, evidence.createdAt, evidence.updatedAt
      )
      .run();

    return evidence;
  }

  /**
   * Verify evidence (mark as verified by reviewer).
   */
  async verifyEvidence(evidenceId: string, verifiedBy: string): Promise<void> {
    await this.db
      .prepare(
        `UPDATE compliance_evidence
         SET status = 'VERIFIED', updated_at = datetime('now')
         WHERE id = ?`
      )
      .bind(evidenceId)
      .run();
  }

  /**
   * Reject evidence with reason.
   */
  async rejectEvidence(evidenceId: string, reason: string): Promise<void> {
    await this.db
      .prepare(
        `UPDATE compliance_evidence
         SET status = 'REJECTED', description = description || ' [REJECTED: ' || ? || ']', updated_at = datetime('now')
         WHERE id = ?`
      )
      .bind(reason, evidenceId)
      .run();
  }

  /**
   * Get compliance evidence summary for a client.
   */
  async getEvidenceSummary(clientId: string): Promise<{
    total: number;
    byType: Record<string, number>;
    byStatus: Record<string, number>;
    coveragePercent: number;
    rulesWithEvidence: number;
    rulesWithoutEvidence: number;
  }> {
    const evidenceResults = await this.db
      .prepare(
        `SELECT evidence_type, status, COUNT(*) as count
         FROM compliance_evidence
         WHERE client_id = ?
         GROUP BY evidence_type, status`
      )
      .bind(clientId)
      .all<{ evidence_type: string; status: string; count: number }>();

    const coveredRules = await this.db
      .prepare(
        `SELECT COUNT(DISTINCT rule_id) as count
         FROM compliance_evidence
         WHERE client_id = ?
         AND status IN ('SUBMITTED', 'VERIFIED')`
      )
      .bind(clientId)
      .first<{ count: number }>();

    const totalRules = await this.db
      .prepare(`SELECT COUNT(*) as count FROM compliance_rules`)
      .first<{ count: number }>();

    const byType: Record<string, number> = {};
    const byStatus: Record<string, number> = {};
    let total = 0;

    for (const row of evidenceResults.results || []) {
      byType[row.evidence_type] = (byType[row.evidence_type] || 0) + row.count;
      byStatus[row.status] = (byStatus[row.status] || 0) + row.count;
      total += row.count;
    }

    const covered = coveredRules?.count || 0;
    const allRules = totalRules?.count || 1;

    return {
      total,
      byType,
      byStatus,
      coveragePercent: Math.round((covered / allRules) * 100),
      rulesWithEvidence: covered,
      rulesWithoutEvidence: allRules - covered,
    };
  }
}

function rowToEvidence(row: Record<string, unknown>): ComplianceEvidence {
  return {
    id: row.id as string,
    clientId: row.client_id as string,
    ruleId: row.rule_id as string,
    ruleCode: row.rule_code as string,
    evidenceType: row.evidence_type as EvidenceType,
    status: row.status as EvidenceStatus,
    title: row.title as string,
    description: row.description as string,
    attestedBy: row.attested_by as string | undefined,
    attestedAt: row.attested_at as string | undefined,
    documentId: row.document_id as string | undefined,
    automatedCheckId: row.automated_check_id as string | undefined,
    expiresAt: row.expires_at as string | undefined,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

function rowToAutoCheck(row: Record<string, unknown>): AutomatedCheck {
  return {
    id: row.id as string,
    checkType: row.check_type as AutomatedCheckType,
    targetUrl: row.target_url as string | undefined,
    targetEntity: row.target_entity as string | undefined,
    result: row.result as "PASS" | "FAIL" | "ERROR" | "SKIPPED",
    details: row.details as string,
    rawResponse: row.raw_response as string | undefined,
    executedAt: row.executed_at as string,
    durationMs: row.duration_ms as number,
  };
}

function getExpirationDate(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

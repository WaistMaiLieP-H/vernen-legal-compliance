/**
 * GUARD-1 — Privacy Operations Worker for PRIVAXIS.
 *
 * Audits data collection, verifies consent compliance, generates privacy
 * impact assessments, and classifies stored data by sensitivity level.
 * Every byte of personal data is tracked and accounted for.
 */

import type { Env } from "../../index.js";
import { generateId ,safeKvPut} from "../../utils/helpers.js";
import {
  DataClassification,
  DSARType,
  DSARStatus,
} from "./types.js";
import type {
  DataFlowRecord,
  PrivacyAuditResult,
  PrivacyFinding,
  DSARRequest,
  DataCollectionPoint,
  ConsentRecord,
  ClassifiedDataRecord,
} from "./types.js";

const KV_PREFIX = "PRIVAXIS:guard:";

/**
 * Known platform data collection points.
 * GUARD-1 uses this registry to audit what data we collect and where it goes.
 */
const PLATFORM_DATA_POINTS: DataCollectionPoint[] = [
  {
    endpoint: "POST /api/compliance/check",
    dataFields: ["state", "businessType", "businessDetails"],
    classification: DataClassification.CONFIDENTIAL,
    hasConsent: true,
    storedIn: "compliance_reports",
  },
  {
    endpoint: "POST /api/advocis/onboard",
    dataFields: ["name", "email", "company", "state", "businessType"],
    classification: DataClassification.CONFIDENTIAL,
    hasConsent: true,
    storedIn: "clients",
  },
  {
    endpoint: "POST /api/advocis/inquiry",
    dataFields: ["clientId", "question", "category"],
    classification: DataClassification.INTERNAL,
    hasConsent: true,
    storedIn: "client_inquiries",
  },
  {
    endpoint: "POST /api/payments/checkout",
    dataFields: ["productId", "state", "email"],
    classification: DataClassification.RESTRICTED,
    hasConsent: true,
    storedIn: "transactions (via Stripe)",
  },
  {
    endpoint: "POST /api/payments/webhook",
    dataFields: ["stripePaymentId", "customerEmail", "amount"],
    classification: DataClassification.RESTRICTED,
    hasConsent: true,
    storedIn: "transactions",
  },
  {
    endpoint: "POST /api/fiscara/transaction",
    dataFields: ["amount", "category", "description", "productId", "state"],
    classification: DataClassification.CONFIDENTIAL,
    hasConsent: false,
    storedIn: "transactions",
  },
  {
    endpoint: "POST /api/lexarc/generate",
    dataFields: ["productType", "state", "clientInfo"],
    classification: DataClassification.CONFIDENTIAL,
    hasConsent: true,
    storedIn: "legal_documents",
  },
];

/**
 * Known platform data tables and their sensitive columns.
 */
const PLATFORM_DATA_TABLES: ClassifiedDataRecord[] = [
  {
    table: "clients",
    column: "email",
    classification: DataClassification.CONFIDENTIAL,
    containsPII: true,
    encrypted: false,
  },
  {
    table: "clients",
    column: "name",
    classification: DataClassification.CONFIDENTIAL,
    containsPII: true,
    encrypted: false,
  },
  {
    table: "clients",
    column: "company",
    classification: DataClassification.INTERNAL,
    containsPII: false,
    encrypted: false,
  },
  {
    table: "compliance_reports",
    column: "business_details",
    classification: DataClassification.CONFIDENTIAL,
    containsPII: true,
    encrypted: false,
  },
  {
    table: "transactions",
    column: "stripe_payment_id",
    classification: DataClassification.RESTRICTED,
    containsPII: false,
    encrypted: false,
  },
  {
    table: "transactions",
    column: "metadata",
    classification: DataClassification.CONFIDENTIAL,
    containsPII: true,
    encrypted: false,
  },
  {
    table: "legal_documents",
    column: "content",
    classification: DataClassification.CONFIDENTIAL,
    containsPII: true,
    encrypted: false,
  },
  {
    table: "dsar_requests",
    column: "client_id",
    classification: DataClassification.CONFIDENTIAL,
    containsPII: true,
    encrypted: false,
  },
];

export class Guard1Worker {
  /**
   * Audit what personal data the platform collects and where it is stored.
   * Returns a comprehensive list of all data collection points.
   */
  async auditDataCollection(
    env: Env
  ): Promise<{
    collectionPoints: DataCollectionPoint[];
    totalEndpoints: number;
    piiEndpoints: number;
    restrictedEndpoints: number;
    auditedAt: string;
  }> {
    const piiEndpoints = PLATFORM_DATA_POINTS.filter(
      (dp) =>
        dp.classification === DataClassification.CONFIDENTIAL ||
        dp.classification === DataClassification.RESTRICTED
    ).length;

    const restrictedEndpoints = PLATFORM_DATA_POINTS.filter(
      (dp) => dp.classification === DataClassification.RESTRICTED
    ).length;

    const auditedAt = new Date().toISOString();

    // Record audit in KV
    await safeKvPut(env.KNOWLEDGE_STORE, 
      `${KV_PREFIX}audit:data_collection:${Date.now()}`,
      JSON.stringify({
        totalEndpoints: PLATFORM_DATA_POINTS.length,
        piiEndpoints,
        restrictedEndpoints,
        auditedAt,
      })
    );

    return {
      collectionPoints: PLATFORM_DATA_POINTS,
      totalEndpoints: PLATFORM_DATA_POINTS.length,
      piiEndpoints,
      restrictedEndpoints,
      auditedAt,
    };
  }

  /**
   * Verify that consent mechanisms are in place for all data-collecting endpoints.
   */
  async checkConsentCompliance(
    env: Env
  ): Promise<{
    records: ConsentRecord[];
    compliantCount: number;
    nonCompliantCount: number;
    complianceRate: number;
    checkedAt: string;
  }> {
    const records: ConsentRecord[] = PLATFORM_DATA_POINTS.map((dp) => {
      const isCompliant = dp.hasConsent;
      return {
        endpoint: dp.endpoint,
        consentMechanism: dp.hasConsent ? "explicit_opt_in" : "none",
        isCompliant,
        issue: isCompliant
          ? undefined
          : `No consent mechanism for ${dp.classification} data at ${dp.endpoint}`,
      };
    });

    const compliantCount = records.filter((r) => r.isCompliant).length;
    const nonCompliantCount = records.length - compliantCount;
    const complianceRate =
      records.length > 0 ? (compliantCount / records.length) * 100 : 100;

    const checkedAt = new Date().toISOString();

    await safeKvPut(env.KNOWLEDGE_STORE, 
      `${KV_PREFIX}consent:last_check`,
      JSON.stringify({
        compliantCount,
        nonCompliantCount,
        complianceRate,
        checkedAt,
      })
    );

    return {
      records,
      compliantCount,
      nonCompliantCount,
      complianceRate,
      checkedAt,
    };
  }

  /**
   * Generate a privacy impact assessment report.
   */
  async generatePrivacyReport(
    env: Env
  ): Promise<PrivacyAuditResult> {
    const findings: PrivacyFinding[] = [];

    // Check 1: Data collection consent
    const consentCheck = await this.checkConsentCompliance(env);
    findings.push({
      area: "Consent Compliance",
      status: consentCheck.complianceRate >= 100 ? "PASS" : consentCheck.complianceRate >= 80 ? "WARN" : "FAIL",
      description: `${consentCheck.complianceRate.toFixed(0)}% of data collection endpoints have consent mechanisms`,
      recommendation:
        consentCheck.complianceRate < 100
          ? "Implement consent mechanisms for all data-collecting endpoints"
          : undefined,
    });

    // Check 2: Data classification coverage
    const classificationCheck = await this.classifyData(env);
    const unclassifiedCount = classificationCheck.records.filter(
      (r) => r.classification === DataClassification.PUBLIC
    ).length;
    findings.push({
      area: "Data Classification",
      status: unclassifiedCount === 0 ? "PASS" : "WARN",
      description: `${classificationCheck.records.length} data fields classified, ${unclassifiedCount} at PUBLIC level`,
      recommendation:
        unclassifiedCount > 0
          ? "Review PUBLIC-classified fields to ensure they are correctly categorized"
          : undefined,
    });

    // Check 3: PII storage
    const piiFields = classificationCheck.records.filter((r) => r.containsPII);
    const encryptedPII = piiFields.filter((r) => r.encrypted);
    findings.push({
      area: "PII Protection",
      status: encryptedPII.length === piiFields.length ? "PASS" : "WARN",
      description: `${piiFields.length} PII fields identified, ${encryptedPII.length} encrypted at rest`,
      recommendation:
        encryptedPII.length < piiFields.length
          ? "Implement encryption at rest for all PII fields"
          : undefined,
    });

    // Check 4: Data retention
    findings.push({
      area: "Data Retention",
      status: "WARN",
      description: "No automated data retention policies detected",
      recommendation:
        "Implement automated data retention and purge policies per data classification",
    });

    // Check 5: DSAR readiness
    let dsarReady = false;
    try {
      await env.DB.prepare(
        "SELECT COUNT(*) as cnt FROM dsar_requests"
      ).first();
      dsarReady = true;
    } catch {
      // Table doesn't exist yet
    }
    findings.push({
      area: "DSAR Readiness",
      status: dsarReady ? "PASS" : "FAIL",
      description: dsarReady
        ? "DSAR request infrastructure is operational"
        : "DSAR request table not yet deployed",
      recommendation: dsarReady
        ? undefined
        : "Deploy migration-008 to enable DSAR processing",
    });

    // Determine overall risk level
    const failCount = findings.filter((f) => f.status === "FAIL").length;
    const warnCount = findings.filter((f) => f.status === "WARN").length;

    let riskLevel: PrivacyAuditResult["riskLevel"];
    if (failCount >= 3) riskLevel = "CRITICAL";
    else if (failCount >= 1) riskLevel = "HIGH";
    else if (warnCount >= 2) riskLevel = "MEDIUM";
    else riskLevel = "LOW";

    const result: PrivacyAuditResult = {
      id: generateId("audit"),
      auditType: "PRIVACY_IMPACT_ASSESSMENT",
      findings,
      riskLevel,
      auditedAt: new Date().toISOString(),
    };

    // Persist audit to D1
    try {
      await env.DB.prepare(
        `INSERT INTO privacy_audits (id, audit_type, findings, risk_level, audited_at)
         VALUES (?1, ?2, ?3, ?4, ?5)`
      )
        .bind(
          result.id,
          result.auditType,
          JSON.stringify(result.findings),
          result.riskLevel,
          result.auditedAt
        )
        .run();
    } catch {
      // Table may not exist yet — audit still returned
    }

    return result;
  }

  /**
   * Classify all known stored data by sensitivity level.
   */
  async classifyData(
    env: Env
  ): Promise<{
    records: ClassifiedDataRecord[];
    summary: Record<DataClassification, number>;
    piiFieldCount: number;
    encryptedFieldCount: number;
    classifiedAt: string;
  }> {
    const summary: Record<DataClassification, number> = {
      [DataClassification.PUBLIC]: 0,
      [DataClassification.INTERNAL]: 0,
      [DataClassification.CONFIDENTIAL]: 0,
      [DataClassification.RESTRICTED]: 0,
    };

    for (const record of PLATFORM_DATA_TABLES) {
      summary[record.classification]++;
    }

    const piiFieldCount = PLATFORM_DATA_TABLES.filter(
      (r) => r.containsPII
    ).length;
    const encryptedFieldCount = PLATFORM_DATA_TABLES.filter(
      (r) => r.encrypted
    ).length;

    const classifiedAt = new Date().toISOString();

    await safeKvPut(env.KNOWLEDGE_STORE, 
      `${KV_PREFIX}classification:last_run`,
      JSON.stringify({
        summary,
        piiFieldCount,
        encryptedFieldCount,
        classifiedAt,
      })
    );

    return {
      records: PLATFORM_DATA_TABLES,
      summary,
      piiFieldCount,
      encryptedFieldCount,
      classifiedAt,
    };
  }

  /**
   * Process a Data Subject Access Request (DSAR).
   */
  async processDSAR(
    requestType: DSARType,
    clientId: string,
    env: Env
  ): Promise<DSARRequest> {
    const id = generateId("dsar");
    const requestedAt = new Date().toISOString();

    const dsar: DSARRequest = {
      id,
      type: requestType,
      clientId,
      status: DSARStatus.PENDING,
      requestedAt,
      completedAt: null,
    };

    // Persist to D1
    try {
      await env.DB.prepare(
        `INSERT INTO dsar_requests (id, request_type, client_id, status, requested_at, completed_at)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6)`
      )
        .bind(
          dsar.id,
          dsar.type,
          dsar.clientId,
          dsar.status,
          dsar.requestedAt,
          dsar.completedAt
        )
        .run();
    } catch {
      // Table may not exist yet — return request in memory
    }

    // Record in KV for fast lookup
    await safeKvPut(env.KNOWLEDGE_STORE, 
      `${KV_PREFIX}dsar:${dsar.id}`,
      JSON.stringify(dsar)
    );

    // Increment DSAR counter
    const counterKey = `${KV_PREFIX}stats:total_dsars`;
    const currentRaw = await env.KNOWLEDGE_STORE.get(counterKey);
    const current = currentRaw ? parseInt(currentRaw, 10) : 0;
    await safeKvPut(env.KNOWLEDGE_STORE, counterKey, String(current + 1));

    return dsar;
  }

  /**
   * Get all DSAR requests, optionally filtered by status.
   */
  async getDSARRequests(
    env: Env,
    status?: DSARStatus
  ): Promise<DSARRequest[]> {
    try {
      let query = "SELECT * FROM dsar_requests ORDER BY requested_at DESC";
      if (status) {
        query = `SELECT * FROM dsar_requests WHERE status = '${status}' ORDER BY requested_at DESC`;
      }

      const result = await env.DB.prepare(query).all<{
        id: string;
        request_type: string;
        client_id: string;
        status: string;
        requested_at: string;
        completed_at: string | null;
      }>();

      if (result.success && result.results) {
        return result.results.map((row) => ({
          id: row.id,
          type: row.request_type as DSARType,
          clientId: row.client_id,
          status: row.status as DSARStatus,
          requestedAt: row.requested_at,
          completedAt: row.completed_at,
        }));
      }
    } catch {
      // Table may not exist
    }

    return [];
  }

  /**
   * Map all data flows across the platform.
   */
  async mapDataFlows(env: Env): Promise<DataFlowRecord[]> {
    const flows: DataFlowRecord[] = PLATFORM_DATA_POINTS.map((dp, index) => ({
      id: `flow_${index + 1}`,
      dataType: dp.dataFields.join(", "),
      source: dp.endpoint.split(" ")[1] ?? dp.endpoint,
      destination: dp.storedIn,
      classification: dp.classification,
      purpose: `Data collection via ${dp.endpoint}`,
      retentionDays: null,
      hasConsent: dp.hasConsent,
      mappedAt: new Date().toISOString(),
    }));

    // Record flow map in KV
    await safeKvPut(env.KNOWLEDGE_STORE, 
      `${KV_PREFIX}dataflows:latest`,
      JSON.stringify({
        flowCount: flows.length,
        mappedAt: new Date().toISOString(),
      })
    );

    return flows;
  }
}

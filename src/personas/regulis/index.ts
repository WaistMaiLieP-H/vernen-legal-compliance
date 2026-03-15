import { PersonaCitizenBase } from "../base.js";
import type { Client } from "../../types/client.js";
import type { USState } from "../../types/client.js";
import type { ComplianceReport, ComplianceCheckResult } from "../../types/compliance.js";
import { PersonaCitizenStatus } from "../../types/persona.js";
import { ComplianceEngine } from "../../services/compliance-engine.js";
import { ReportGenerator } from "../../services/report-generator.js";
import { generateId } from "../../utils/helpers.js";

/**
 * REGULIS — The Regulatory Intelligence Persona Citizen.
 * First Persona Citizen to go live in the Vernen ecosystem.
 * Specializes in multi-state compliance analysis and reporting.
 */
export class Regulis extends PersonaCitizenBase {
  private complianceEngine: ComplianceEngine;
  private reportGenerator: ReportGenerator;

  constructor(knowledgeStoreId: string) {
    super("REGULIS", knowledgeStoreId, PersonaCitizenStatus.CONCEIVED);
    this.complianceEngine = new ComplianceEngine();
    this.reportGenerator = new ReportGenerator();
  }

  async initialize(): Promise<void> {
    this.evolve(PersonaCitizenStatus.SHELL_DEPLOYED);
  }

  async receiveEvent(event: string, payload: unknown): Promise<void> {
    switch (event) {
      case "COMPLIANCE_CHECK_REQUESTED":
        // Payload expected: { client: Client, states: USState[] }
        break;
      case "REGULATION_UPDATED":
        // Payload expected: { ruleId: string, changes: unknown }
        break;
      case "KNOWLEDGE_SYNC":
        // Trigger knowledge store synchronization
        break;
      default:
        // Unknown events are logged but not processed
        break;
    }
  }

  async queryKnowledge(query: string): Promise<unknown> {
    // Knowledge store queries will be routed through KV
    return { query, results: [], source: this.name };
  }

  async performComplianceCheck(
    client: Client,
    states: USState[]
  ): Promise<ComplianceCheckResult[]> {
    return this.complianceEngine.checkCompliance(client, states);
  }

  async analyzeJurisdiction(
    state: USState,
    client: Client
  ): Promise<ComplianceCheckResult[]> {
    const rules = this.complianceEngine.getRulesForState(
      state,
      client.entityType
    );
    const results: ComplianceCheckResult[] = [];

    for (const rule of rules) {
      const result = this.complianceEngine.evaluateRule(client, rule);
      results.push(result);
    }

    return results;
  }

  async generateReport(
    client: Client,
    checkResults: ComplianceCheckResult[]
  ): Promise<ComplianceReport> {
    const report = this.reportGenerator.generate(checkResults, client);
    return {
      ...report,
      id: generateId("rpt"),
      generatedBy: this.name,
    };
  }
}

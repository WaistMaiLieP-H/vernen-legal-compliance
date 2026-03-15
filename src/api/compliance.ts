import type { Env } from "../index.js";
import type { USState, BusinessEntityType } from "../types/client.js";
import { ComplianceEngine } from "../services/compliance-engine.js";
import { parseJsonBody, generateId } from "../utils/helpers.js";

interface ComplianceCheckRequest {
  clientName: string;
  entityType: BusinessEntityType;
  states: USState[];
  industry: string;
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Handler for POST /api/compliance/check
 * Accepts state + entity type, returns compliance check results.
 */
export async function handleComplianceCheck(
  request: Request,
  _env: Env
): Promise<Response> {
  const body = await parseJsonBody<ComplianceCheckRequest>(request);

  if (!body.entityType || !body.states || body.states.length === 0) {
    return jsonResponse(
      { error: "entityType and at least one state are required" },
      400
    );
  }

  const client = {
    id: generateId("cli"),
    name: body.clientName ?? "Anonymous",
    entityType: body.entityType,
    states: body.states,
    industry: body.industry ?? "General",
    createdAt: new Date().toISOString(),
  };

  const engine = new ComplianceEngine();
  // In production, rules are loaded from D1:
  // const rules = await env.DB.prepare("SELECT * FROM compliance_rules WHERE ...").all();
  // engine.loadRules(rules.results);

  const results = engine.checkCompliance(client, body.states);

  return jsonResponse({
    clientId: client.id,
    entityType: client.entityType,
    states: client.states,
    results,
    checkedAt: new Date().toISOString(),
    checkedBy: "REGULIS",
  });
}

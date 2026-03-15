import type { Env } from "../index.js";
import type { ComplianceReport } from "../types/compliance.js";
import { KnowledgeStore } from "../services/knowledge-store.js";

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Handler for GET /api/compliance/report/:id
 * Retrieves a previously generated compliance report by ID.
 */
export async function handleGetReport(
  reportId: string,
  env: Env
): Promise<Response> {
  const store = new KnowledgeStore(env.KNOWLEDGE_STORE);
  const report = await store.get<ComplianceReport>(`report:${reportId}`);

  if (!report) {
    return jsonResponse({ error: `Report ${reportId} not found` }, 404);
  }

  return jsonResponse(report);
}

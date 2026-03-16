import type { Env } from "../../index.js";
import type { Inquiry, InquiryRow } from "./types.js";
import { InquiryType, InquiryStatus } from "./types.js";
import { generateId } from "../../utils/helpers.js";

/** KV namespace prefix for SERVE-1 data. */
const KV_PREFIX = "ADVOCIS:serve:";

/** Response templates keyed by inquiry type. */
const RESPONSE_TEMPLATES: Record<InquiryType, string> = {
  [InquiryType.BILLING]:
    "Thank you for your billing inquiry. Our team will review your account and respond within 1 business day. If this is urgent, please reference your client ID in any follow-up.",
  [InquiryType.COMPLIANCE_QUESTION]:
    "Thank you for your compliance question. Our REGULIS engine will analyze your inquiry and a compliance specialist will follow up with detailed guidance within 24 hours.",
  [InquiryType.TECHNICAL]:
    "We've received your technical support request. Our engineering team has been notified and will investigate. You can expect an update within 4 business hours.",
  [InquiryType.FEEDBACK]:
    "Thank you for your feedback! We value your input and use it to continuously improve our services. Your comments have been recorded and shared with our team.",
  [InquiryType.GENERAL]:
    "Thank you for reaching out to Vernen Legal Compliance. We've received your message and will respond within 1 business day.",
};

/**
 * SERVE-1 — Client Service Engine
 *
 * Worker responsible for handling, categorizing, and routing client
 * inquiries across the ADVOCIS ecosystem. Generates response templates
 * and maintains inquiry history for each client.
 */
export class Serve1Worker {
  /**
   * Categorize an inquiry message and persist it to D1.
   * Returns the created inquiry with an auto-generated response template.
   */
  async handleInquiry(
    inquiry: { clientId?: string; type: string; message: string },
    env: Env
  ): Promise<Inquiry> {
    const inquiryType = this.categorize(inquiry.type);
    const id = generateId("inq");
    const now = new Date().toISOString();
    const response = this.generateResponse(inquiryType);

    // Persist to D1
    try {
      await env.DB.prepare(
        `INSERT INTO client_inquiries
         (id, client_id, inquiry_type, message, response, status, created_at)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`
      )
        .bind(
          id,
          inquiry.clientId ?? null,
          inquiryType,
          inquiry.message,
          response,
          InquiryStatus.OPEN,
          now
        )
        .run();
    } catch {
      // If table doesn't exist yet, store in KV as fallback
      await env.KNOWLEDGE_STORE.put(
        `${KV_PREFIX}inquiry:${id}`,
        JSON.stringify({
          id,
          clientId: inquiry.clientId ?? null,
          type: inquiryType,
          message: inquiry.message,
          response,
          status: InquiryStatus.OPEN,
          createdAt: now,
        })
      );
    }

    return {
      id,
      clientId: inquiry.clientId ?? null,
      type: inquiryType,
      message: inquiry.message,
      response,
      status: InquiryStatus.OPEN,
      createdAt: now,
      resolvedAt: null,
    };
  }

  /**
   * Retrieve inquiry history for a given client, ordered newest first.
   */
  async getInquiryHistory(
    clientId: string,
    env: Env
  ): Promise<Inquiry[]> {
    try {
      const result = await env.DB.prepare(
        `SELECT id, client_id, inquiry_type, message, response, status, created_at, resolved_at
         FROM client_inquiries
         WHERE client_id = ?1
         ORDER BY created_at DESC
         LIMIT 50`
      )
        .bind(clientId)
        .all<InquiryRow>();

      if (!result.success || !result.results) {
        return [];
      }

      return result.results.map((row) => ({
        id: row.id,
        clientId: row.client_id,
        type: row.inquiry_type as InquiryType,
        message: row.message,
        response: row.response,
        status: row.status as InquiryStatus,
        createdAt: row.created_at,
        resolvedAt: row.resolved_at,
      }));
    } catch {
      return [];
    }
  }

  /**
   * Generate a response template based on inquiry type.
   */
  generateResponse(type: InquiryType): string {
    return RESPONSE_TEMPLATES[type] ?? RESPONSE_TEMPLATES[InquiryType.GENERAL];
  }

  /**
   * Categorize a raw type string into a valid InquiryType.
   */
  private categorize(rawType: string): InquiryType {
    const upper = rawType.toUpperCase();
    if (Object.values(InquiryType).includes(upper as InquiryType)) {
      return upper as InquiryType;
    }

    // Keyword-based fallback categorization
    const lower = rawType.toLowerCase();
    if (lower.includes("bill") || lower.includes("pay") || lower.includes("invoice")) {
      return InquiryType.BILLING;
    }
    if (lower.includes("comply") || lower.includes("compliance") || lower.includes("regulat")) {
      return InquiryType.COMPLIANCE_QUESTION;
    }
    if (lower.includes("tech") || lower.includes("bug") || lower.includes("error")) {
      return InquiryType.TECHNICAL;
    }
    if (lower.includes("feedback") || lower.includes("suggest")) {
      return InquiryType.FEEDBACK;
    }

    return InquiryType.GENERAL;
  }
}

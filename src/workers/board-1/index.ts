import type { Env } from "../../index.js";
import type { BusinessEntityType, USState } from "../../types/client.js";
import type { OnboardingFlow, OnboardingStep, OnboardingRow } from "./types.js";
import { OnboardingStepId, OnboardingStepStatus } from "./types.js";
import { generateId } from "../../utils/helpers.js";

/** KV namespace prefix for BOARD-1 data. */
const KV_PREFIX = "ADVOCIS:board:";

/**
 * Step definitions — the canonical set of onboarding steps every client
 * goes through, with descriptions tailored by entity type.
 */
function buildSteps(entityType: BusinessEntityType, states: string[]): OnboardingStep[] {
  return [
    {
      id: OnboardingStepId.PROFILE_COMPLETE,
      label: "Complete Your Profile",
      description: `Verify your ${entityType} details and operating states (${states.join(", ")}).`,
      status: OnboardingStepStatus.PENDING,
      completedAt: null,
    },
    {
      id: OnboardingStepId.FIRST_SCAN,
      label: "Run Your First Compliance Scan",
      description:
        "REGULIS will scan federal and state regulations applicable to your business.",
      status: OnboardingStepStatus.PENDING,
      completedAt: null,
    },
    {
      id: OnboardingStepId.REVIEW_RESULTS,
      label: "Review Compliance Results",
      description:
        "Walk through your compliance report and understand any action items.",
      status: OnboardingStepStatus.PENDING,
      completedAt: null,
    },
    {
      id: OnboardingStepId.SET_ALERTS,
      label: "Configure Compliance Alerts",
      description:
        "Set up notifications for regulatory changes that affect your business.",
      status: OnboardingStepStatus.PENDING,
      completedAt: null,
    },
    {
      id: OnboardingStepId.INVITE_TEAM,
      label: "Invite Your Team",
      description:
        "Add team members who should receive compliance updates and reports.",
      status: OnboardingStepStatus.PENDING,
      completedAt: null,
    },
  ];
}

/**
 * BOARD-1 — Client Onboarding Worker
 *
 * Manages the onboarding lifecycle for new clients. Creates personalized
 * checklists based on entity type and operating states, tracks progress,
 * and marks steps complete as clients move through the flow.
 */
export class Board1Worker {
  /**
   * Create a new onboarding flow for a client.
   * Generates a personalized checklist based on entity type and states.
   */
  async createOnboardingFlow(
    client: { id: string; entityType: BusinessEntityType; states: string[] },
    env: Env
  ): Promise<OnboardingFlow> {
    const id = generateId("onb");
    const now = new Date().toISOString();
    const steps = buildSteps(client.entityType, client.states);

    const flow: OnboardingFlow = {
      id,
      clientId: client.id,
      steps,
      startedAt: now,
      completedAt: null,
    };

    // Persist to D1
    try {
      await env.DB.prepare(
        `INSERT INTO client_onboarding (id, client_id, steps, started_at)
         VALUES (?1, ?2, ?3, ?4)`
      )
        .bind(id, client.id, JSON.stringify(steps), now)
        .run();
    } catch {
      // Fallback to KV
      await env.KNOWLEDGE_STORE.put(
        `${KV_PREFIX}flow:${id}`,
        JSON.stringify(flow)
      );
    }

    // Also cache in KV for fast retrieval
    await env.KNOWLEDGE_STORE.put(
      `${KV_PREFIX}client:${client.id}:flow`,
      JSON.stringify(flow)
    );

    return flow;
  }

  /**
   * Retrieve the onboarding status for a given client.
   */
  async getOnboardingStatus(
    clientId: string,
    env: Env
  ): Promise<OnboardingFlow | null> {
    // Try KV cache first
    const cached = await env.KNOWLEDGE_STORE.get(
      `${KV_PREFIX}client:${clientId}:flow`,
      "json"
    );
    if (cached) {
      return cached as OnboardingFlow;
    }

    // Fall back to D1
    try {
      const row = await env.DB.prepare(
        `SELECT id, client_id, steps, started_at, completed_at
         FROM client_onboarding
         WHERE client_id = ?1
         ORDER BY started_at DESC
         LIMIT 1`
      )
        .bind(clientId)
        .first<OnboardingRow>();

      if (!row) return null;

      const flow: OnboardingFlow = {
        id: row.id,
        clientId: row.client_id,
        steps: JSON.parse(row.steps) as OnboardingStep[],
        startedAt: row.started_at,
        completedAt: row.completed_at,
      };

      // Populate cache
      await env.KNOWLEDGE_STORE.put(
        `${KV_PREFIX}client:${clientId}:flow`,
        JSON.stringify(flow)
      );

      return flow;
    } catch {
      return null;
    }
  }

  /**
   * Mark an onboarding step as complete for a client.
   * If all steps are complete, marks the entire flow as finished.
   */
  async completeStep(
    clientId: string,
    stepId: string,
    env: Env
  ): Promise<OnboardingFlow | null> {
    const flow = await this.getOnboardingStatus(clientId, env);
    if (!flow) return null;

    const now = new Date().toISOString();
    let found = false;

    for (const step of flow.steps) {
      if (step.id === stepId) {
        step.status = OnboardingStepStatus.COMPLETED;
        step.completedAt = now;
        found = true;
        break;
      }
    }

    if (!found) return null;

    // Check if all steps are completed
    const allDone = flow.steps.every(
      (s) =>
        s.status === OnboardingStepStatus.COMPLETED ||
        s.status === OnboardingStepStatus.SKIPPED
    );

    if (allDone) {
      flow.completedAt = now;
    }

    // Update D1
    try {
      await env.DB.prepare(
        `UPDATE client_onboarding
         SET steps = ?1, completed_at = ?2
         WHERE id = ?3`
      )
        .bind(JSON.stringify(flow.steps), flow.completedAt, flow.id)
        .run();
    } catch {
      // Fallback — KV will be updated below
    }

    // Update KV cache
    await env.KNOWLEDGE_STORE.put(
      `${KV_PREFIX}client:${clientId}:flow`,
      JSON.stringify(flow)
    );

    return flow;
  }
}

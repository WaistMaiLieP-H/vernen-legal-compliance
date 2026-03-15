import { PersonaCitizenStatus } from "../types/persona.js";

/**
 * Valid status transitions for a Persona Citizen's lifecycle.
 * Each status can only advance to specific next states.
 */
const VALID_TRANSITIONS: Record<PersonaCitizenStatus, PersonaCitizenStatus[]> = {
  [PersonaCitizenStatus.CONCEIVED]: [PersonaCitizenStatus.SHELL_DEPLOYED],
  [PersonaCitizenStatus.SHELL_DEPLOYED]: [PersonaCitizenStatus.WORKERS_ACTIVE],
  [PersonaCitizenStatus.WORKERS_ACTIVE]: [PersonaCitizenStatus.KNOWLEDGE_ACCRUING],
  [PersonaCitizenStatus.KNOWLEDGE_ACCRUING]: [PersonaCitizenStatus.AUTONOMOUS],
  [PersonaCitizenStatus.AUTONOMOUS]: [PersonaCitizenStatus.CERTIFIED],
  [PersonaCitizenStatus.CERTIFIED]: [],
};

/**
 * Base class for all Persona Citizens in the Vernen ecosystem.
 * Every Persona Citizen has a name, a lifecycle status, and a knowledge store.
 */
export abstract class PersonaCitizenBase {
  readonly name: string;
  protected _status: PersonaCitizenStatus;
  readonly knowledgeStoreId: string;

  constructor(
    name: string,
    knowledgeStoreId: string,
    status: PersonaCitizenStatus = PersonaCitizenStatus.CONCEIVED
  ) {
    this.name = name;
    this.knowledgeStoreId = knowledgeStoreId;
    this._status = status;
  }

  get status(): PersonaCitizenStatus {
    return this._status;
  }

  /**
   * Initialize the Persona Citizen — called once when first deployed.
   */
  abstract initialize(): Promise<void>;

  /**
   * Receive and process an event from the system or other Persona Citizens.
   */
  abstract receiveEvent(event: string, payload: unknown): Promise<void>;

  /**
   * Query the Persona Citizen's knowledge store.
   */
  abstract queryKnowledge(query: string): Promise<unknown>;

  /**
   * Transition to a new lifecycle status.
   * Validates that the transition is allowed before applying it.
   */
  evolve(newStatus: PersonaCitizenStatus): void {
    const allowedTransitions = VALID_TRANSITIONS[this._status];

    if (!allowedTransitions.includes(newStatus)) {
      throw new Error(
        `Invalid status transition for ${this.name}: ` +
        `${this._status} -> ${newStatus}. ` +
        `Allowed: [${allowedTransitions.join(", ")}]`
      );
    }

    this._status = newStatus;
  }
}

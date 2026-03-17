import { describe, it, expect } from "vitest";
import { PersonaCitizenBase } from "../src/personas/base.js";
import { PersonaCitizenStatus } from "../src/types/persona.js";

/**
 * Concrete test implementation of PersonaCitizenBase.
 */
class TestCitizen extends PersonaCitizenBase {
  async initialize(): Promise<void> {}
  async receiveEvent(): Promise<void> {}
  async queryKnowledge(): Promise<unknown> {
    return null;
  }
}

describe("PersonaCitizenBase", () => {
  describe("constructor", () => {
    it("should initialize with name, knowledgeStoreId, and default CONCEIVED status", () => {
      const citizen = new TestCitizen("TEST", "test-knowledge");
      expect(citizen.name).toBe("TEST");
      expect(citizen.knowledgeStoreId).toBe("test-knowledge");
      expect(citizen.status).toBe(PersonaCitizenStatus.CONCEIVED);
    });

    it("should accept a custom initial status", () => {
      const citizen = new TestCitizen(
        "TEST",
        "test-knowledge",
        PersonaCitizenStatus.SHELL_DEPLOYED
      );
      expect(citizen.status).toBe(PersonaCitizenStatus.SHELL_DEPLOYED);
    });
  });

  describe("evolve", () => {
    it("should transition CONCEIVED -> SHELL_DEPLOYED", () => {
      const citizen = new TestCitizen("TEST", "test-knowledge");
      citizen.evolve(PersonaCitizenStatus.SHELL_DEPLOYED);
      expect(citizen.status).toBe(PersonaCitizenStatus.SHELL_DEPLOYED);
    });

    it("should transition SHELL_DEPLOYED -> WORKERS_ACTIVE", () => {
      const citizen = new TestCitizen(
        "TEST", "test-knowledge", PersonaCitizenStatus.SHELL_DEPLOYED
      );
      citizen.evolve(PersonaCitizenStatus.WORKERS_ACTIVE);
      expect(citizen.status).toBe(PersonaCitizenStatus.WORKERS_ACTIVE);
    });

    it("should transition WORKERS_ACTIVE -> KNOWLEDGE_ACCRUING", () => {
      const citizen = new TestCitizen(
        "TEST", "test-knowledge", PersonaCitizenStatus.WORKERS_ACTIVE
      );
      citizen.evolve(PersonaCitizenStatus.KNOWLEDGE_ACCRUING);
      expect(citizen.status).toBe(PersonaCitizenStatus.KNOWLEDGE_ACCRUING);
    });

    it("should transition KNOWLEDGE_ACCRUING -> AUTONOMOUS", () => {
      const citizen = new TestCitizen(
        "TEST", "test-knowledge", PersonaCitizenStatus.KNOWLEDGE_ACCRUING
      );
      citizen.evolve(PersonaCitizenStatus.AUTONOMOUS);
      expect(citizen.status).toBe(PersonaCitizenStatus.AUTONOMOUS);
    });

    it("should transition AUTONOMOUS -> CERTIFIED", () => {
      const citizen = new TestCitizen(
        "TEST", "test-knowledge", PersonaCitizenStatus.AUTONOMOUS
      );
      citizen.evolve(PersonaCitizenStatus.CERTIFIED);
      expect(citizen.status).toBe(PersonaCitizenStatus.CERTIFIED);
    });

    it("should complete the full lifecycle chain", () => {
      const citizen = new TestCitizen("TEST", "test-knowledge");
      citizen.evolve(PersonaCitizenStatus.SHELL_DEPLOYED);
      citizen.evolve(PersonaCitizenStatus.WORKERS_ACTIVE);
      citizen.evolve(PersonaCitizenStatus.KNOWLEDGE_ACCRUING);
      citizen.evolve(PersonaCitizenStatus.AUTONOMOUS);
      citizen.evolve(PersonaCitizenStatus.CERTIFIED);
      expect(citizen.status).toBe(PersonaCitizenStatus.CERTIFIED);
    });

    it("should reject skipping from CONCEIVED to AUTONOMOUS", () => {
      const citizen = new TestCitizen("TEST", "test-knowledge");
      expect(() => citizen.evolve(PersonaCitizenStatus.AUTONOMOUS)).toThrow(
        "Invalid status transition"
      );
    });

    it("should reject skipping from CONCEIVED to WORKERS_ACTIVE", () => {
      const citizen = new TestCitizen("TEST", "test-knowledge");
      expect(() => citizen.evolve(PersonaCitizenStatus.WORKERS_ACTIVE)).toThrow(
        "Invalid status transition"
      );
    });

    it("should reject backwards transition from AUTONOMOUS to CONCEIVED", () => {
      const citizen = new TestCitizen(
        "TEST", "test-knowledge", PersonaCitizenStatus.AUTONOMOUS
      );
      expect(() => citizen.evolve(PersonaCitizenStatus.CONCEIVED)).toThrow(
        "Invalid status transition"
      );
    });

    it("should reject any transition from CERTIFIED (terminal state)", () => {
      const citizen = new TestCitizen(
        "TEST", "test-knowledge", PersonaCitizenStatus.CERTIFIED
      );
      expect(() => citizen.evolve(PersonaCitizenStatus.AUTONOMOUS)).toThrow(
        "Invalid status transition"
      );
    });

    it("should include citizen name in error message", () => {
      const citizen = new TestCitizen("REGULIS", "regulis-knowledge");
      expect(() => citizen.evolve(PersonaCitizenStatus.CERTIFIED)).toThrow(
        "REGULIS"
      );
    });
  });
});

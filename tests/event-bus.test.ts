import { describe, it, expect } from "vitest";
import { EventBus } from "../src/services/event-bus.js";

describe("EventBus.getSubscriptions", () => {
  it("should return a non-empty subscription map", () => {
    const subs = EventBus.getSubscriptions();
    expect(Object.keys(subs).length).toBeGreaterThan(0);
  });

  it("should have compliance_report_generated subscribers", () => {
    const subs = EventBus.getSubscriptions();
    expect(subs["compliance_report_generated"]).toBeDefined();
    expect(subs["compliance_report_generated"].length).toBeGreaterThan(0);
  });

  it("should include FISCARA in payment_received subscribers", () => {
    const subs = EventBus.getSubscriptions();
    expect(subs["payment_received"]).toContain("FISCARA");
  });

  it("should include ADVOCIS in payment_received subscribers", () => {
    const subs = EventBus.getSubscriptions();
    expect(subs["payment_received"]).toContain("ADVOCIS");
  });

  it("should include METRIQA in compliance_report_generated subscribers", () => {
    const subs = EventBus.getSubscriptions();
    expect(subs["compliance_report_generated"]).toContain("METRIQA");
  });

  it("should return a copy, not the original object", () => {
    const subs1 = EventBus.getSubscriptions();
    const subs2 = EventBus.getSubscriptions();
    expect(subs1).not.toBe(subs2);
    expect(subs1).toEqual(subs2);
  });
});

describe("EventBus.getSubscriptionsForCitizen", () => {
  it("should return events REGULIS subscribes to", () => {
    const events = EventBus.getSubscriptionsForCitizen("REGULIS");
    expect(events).toContain("client_registered");
    expect(events).toContain("compliance_check_requested");
    expect(events).toContain("regulatory_change_detected");
  });

  it("should not include payment_received for REGULIS", () => {
    const events = EventBus.getSubscriptionsForCitizen("REGULIS");
    expect(events).not.toContain("payment_received");
  });

  it("should return events FISCARA subscribes to", () => {
    const events = EventBus.getSubscriptionsForCitizen("FISCARA");
    expect(events).toContain("compliance_report_generated");
    expect(events).toContain("payment_received");
    expect(events).toContain("expense_recorded");
    expect(events).toContain("financial_close");
  });

  it("should return events VIGILUS subscribes to", () => {
    const events = EventBus.getSubscriptionsForCitizen("VIGILUS");
    expect(events).toContain("regulatory_change_detected");
    expect(events).toContain("breach_detected");
    expect(events).toContain("incident_detected");
  });

  it("should return events PRIVAXIS subscribes to", () => {
    const events = EventBus.getSubscriptionsForCitizen("PRIVAXIS");
    expect(events).toContain("breach_detected");
    expect(events).toContain("data_access_request");
    expect(events).toContain("security_incident_detected");
  });

  it("should return events ETHICARA subscribes to", () => {
    const events = EventBus.getSubscriptionsForCitizen("ETHICARA");
    expect(events).toContain("ethics_review_requested");
    expect(events).toContain("bias_detected");
    expect(events).toContain("policy_conflict");
  });

  it("should return events INTEGRA subscribes to", () => {
    const events = EventBus.getSubscriptionsForCitizen("INTEGRA");
    expect(events).toContain("compliance_report_generated");
    expect(events).toContain("system_health_check");
    expect(events).toContain("incident_detected");
  });

  it("should return empty array for unknown citizen", () => {
    const events = EventBus.getSubscriptionsForCitizen("NONEXISTENT");
    expect(events).toEqual([]);
  });

  it("should return events for all 13 deployable Citizens", () => {
    const citizens = [
      "REGULIS", "ADVOCIS", "FISCARA", "INTEGRA", "PRIVAXIS",
      "VIGILUS", "ETHICARA", "METRIQA", "LEXARC", "SYNTARA",
      "CLARIDEX", "VESTARA", "NEXARIS",
    ];
    for (const citizen of citizens) {
      const events = EventBus.getSubscriptionsForCitizen(citizen);
      expect(events.length).toBeGreaterThan(0);
    }
  });

  it("should ensure no citizen subscribes to all events", () => {
    const allEventTypes = Object.keys(EventBus.getSubscriptions());
    const citizens = [
      "REGULIS", "ADVOCIS", "FISCARA", "INTEGRA", "PRIVAXIS",
      "VIGILUS", "ETHICARA", "METRIQA",
    ];
    for (const citizen of citizens) {
      const events = EventBus.getSubscriptionsForCitizen(citizen);
      expect(events.length).toBeLessThan(allEventTypes.length);
    }
  });
});

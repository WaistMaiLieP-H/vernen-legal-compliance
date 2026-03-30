import { describe, it, expect } from "vitest";
import { serveDashboard } from "../src/landing/dashboard.js";

describe("Dashboard Authentication", () => {
  it("extracts API key from URL parameters for authenticated requests", () => {
    const response = serveDashboard();
    const html = response.body ? "has body" : "no body";
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toContain("text/html");
  });

  it("includes API key extraction script in dashboard HTML", async () => {
    const response = serveDashboard();
    const html = await response.text();

    // The dashboard JS must extract the API key from the URL
    expect(html).toContain("new URLSearchParams(window.location.search).get('key')");
  });

  it("passes Authorization header in fetchJSON calls", async () => {
    const response = serveDashboard();
    const html = await response.text();

    // fetchJSON must include Bearer token in requests
    expect(html).toContain("'Authorization': 'Bearer ' + API_KEY");
  });

  it("defines API_KEY variable before fetchJSON", async () => {
    const response = serveDashboard();
    const html = await response.text();

    // API_KEY must be defined before fetchJSON
    const apiKeyIdx = html.indexOf("var API_KEY");
    const fetchJsonIdx = html.indexOf("async function fetchJSON");
    expect(apiKeyIdx).toBeGreaterThan(-1);
    expect(fetchJsonIdx).toBeGreaterThan(-1);
    expect(apiKeyIdx).toBeLessThan(fetchJsonIdx);
  });

  it("falls back gracefully when no API key is present", async () => {
    const response = serveDashboard();
    const html = await response.text();

    // Should use empty string fallback, not crash
    expect(html).toContain("|| ''");
  });

  it("only adds auth headers when API key is present", async () => {
    const response = serveDashboard();
    const html = await response.text();

    // Should conditionally add headers
    expect(html).toContain("if (API_KEY)");
  });

  it("still renders all Citizen chips", async () => {
    const response = serveDashboard();
    const html = await response.text();

    // All 15 Citizens should appear in the grid config
    const citizens = [
      "FORGE-0", "SENTINEL-0", "REGULIS", "ADVOCIS", "LEXARC",
      "SYNTARA", "FISCARA", "INTEGRA", "VIGILUS", "ETHICARA",
      "PRIVAXIS", "VESTARA", "METRIQA", "CLARIDEX", "NEXARIS",
    ];
    for (const c of citizens) {
      expect(html).toContain(c);
    }
  });

  it("includes all dashboard data loaders", async () => {
    const response = serveDashboard();
    const html = await response.text();

    const loaders = [
      "loadCitizenGrid", "loadFinancials", "loadInvestorReadiness",
      "loadRiskRegister", "loadAudit", "loadGrowth", "loadEthics",
      "loadPlatformHealth", "loadDisclosure", "loadPartnerships",
    ];
    for (const loader of loaders) {
      expect(html).toContain(loader);
    }
  });
});

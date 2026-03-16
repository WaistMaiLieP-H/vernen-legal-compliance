# Vernen Legal Compliance Platform

Persona Citizen-based legal compliance system on Cloudflare Workers + D1 + KV.

## Quick Start

```bash
npm install
npm run dev       # Local Wrangler dev server
npm run deploy    # Deploy to Cloudflare Workers
npm test          # Run Vitest
```

## Architecture

**Entry:** `src/index.ts` → `src/router.ts` (custom pattern-matching router with `:param` support)

**Core abstractions:**
- **Persona Citizens** (`src/personas/`) — Autonomous agents with lifecycle: CONCEIVED → SHELL_DEPLOYED → WORKERS_ACTIVE → KNOWLEDGE_ACCRUING → AUTONOMOUS → CERTIFIED. All inherit from `PersonaCitizenBase` in `src/personas/base.ts`
- **Workers** (`src/workers/`) — Specialized task executors (SCAN-1, FORGE-0, SENTINEL-0, etc.)
- **Services** (`src/services/`) — Business logic (ComplianceEngine, AuditEngine, LegalIntelligence, FormNavigator, ReportGenerator)

**15 deployed Citizens:** FORGE-0, SENTINEL-0, REGULIS, ADVOCIS, LEXARC, SYNTARA, FISCARA, INTEGRA, VIGILUS, ETHICARA, PRIVAXIS, VESTARA, METRIQA, CLARIDEX, NEXARIS

## Project Structure

```
src/
  api/            # Route handlers (one file per Citizen + core routes)
  api/middleware/  # auth.ts (Bearer token), rate-limit.ts (KV sliding window)
  personas/       # Citizen classes (base.ts + 14 implementations)
  workers/        # Worker implementations (26 workers)
  services/       # ComplianceEngine, AuditEngine, LegalIntelligence, ReportGenerator
  engine/         # Citizen Deployment Engine (catalog, deployer, dynamic routing)
  db/             # schema.sql, 14 migrations, seed data
  landing/        # Landing page (serve.ts) and Founder Dashboard (dashboard.ts)
  legal/          # Terms, Privacy, Disclaimers
  types/          # TypeScript enums and interfaces
  utils/          # generateId, formatDate, sanitizeInput, parseJsonBody
  data/           # Court form annotations (JSON)
tests/            # Vitest tests
```

## Environment

**Bindings (wrangler.toml):**
- `DB` — D1 database
- `KNOWLEDGE_STORE` — KV namespace

**Secrets:**
- `API_KEY` — Required for protected endpoints
- `STRIPE_SECRET_KEY` — Optional (gracefully missing)
- `STRIPE_WEBHOOK_SECRET` — Optional

## Database

D1 (SQLite). Schema in `src/db/schema.sql`. 14 migrations in `src/db/migration-*.sql`.

Key tables: `compliance_rules`, `compliance_reports`, `persona_citizens`, `workers`, `build_log`, `audit_issues`

## API Handler Pattern

```typescript
async (request: Request, env: Env, ctx: ExecutionContext, params: RouteParams) => Promise<Response>
```

Routes registered in `src/router.ts` as `routes.set("METHOD /path/:param", handler)`.

Protected routes use `authenticate(request, env)` and `rateLimit(request, env)` — both return `Response | null` (null = success).

## Key Types

- `BusinessEntityType`: LLC, CORPORATION, S_CORP, SOLE_PROPRIETORSHIP, PARTNERSHIP, NONPROFIT
- `USState`: All 50 + DC
- `ComplianceStatus`: COMPLIANT, NON_COMPLIANT, NEEDS_REVIEW, NOT_APPLICABLE
- `PersonaCitizenStatus`: CONCEIVED, SHELL_DEPLOYED, WORKERS_ACTIVE, KNOWLEDGE_ACCRUING, AUTONOMOUS, CERTIFIED

## Testing

Vitest. Tests in `tests/**/*.test.ts`. Uses factory functions for test data (see `tests/compliance-engine.test.ts` for pattern).

## Domain

Custom domain: `compliance.vernenlegal.com`
Dashboard: `/dashboard`
Landing: `/`

## Zero Dependencies

All logic self-contained. No production npm dependencies.

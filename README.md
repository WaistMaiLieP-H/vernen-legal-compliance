# Vernen Legal Compliance Platform

Multi-state legal compliance engine built on Cloudflare Workers, powered by Persona Citizens.

## Development

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run deploy
```

## Architecture

- **REGULIS** — Regulatory intelligence Persona Citizen (first to deploy)
- **FORGE-0** — Autonomous builder worker
- **SENTINEL-0** — Compliance auditor worker
- **SCAN-1** — Regulatory scanner (REGULIS's first worker)

/**
 * parse-catalog-3000.ts — Split on ### headings, keep blocks with Governing Body
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ParsedPersona {
  title: string;
  professionalTitle: string;
  governingBody: string;
  governingGuidelines: string;
  documentTypes: string;
  industry: string;
  sourceFile: string;
}

const CATALOG_DIR = path.join(__dirname, '..', 'catalog-3000');

function inferIndustry(filename: string): string {
  return filename.replace('_personas.md', '').replace(/_/g, ' ')
    .split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function grab(block: string, ...names: string[]): string {
  for (const name of names) {
    // Bullet: - **Name:** value  or  - **Name**: value
    const re = new RegExp(`\\*\\*${name}:?\\*\\*:?\\s*(.+)`, 'i');
    const m = block.match(re);
    if (m) {
      let val = m[1].trim();
      // Grab continuation indented lines
      const lines = block.split('\n');
      const idx = lines.findIndex(l => re.test(l));
      if (idx >= 0) {
        for (let j = idx + 1; j < lines.length; j++) {
          const t = lines[j].trim();
          if (t.startsWith('- **') && !t.startsWith('- **' + name)) break;
          if (t.startsWith('| **')) break;
          if (t === '' || t === '---' || t.startsWith('### ') || t.startsWith('## ')) break;
          if (t.startsWith('-') || t.startsWith('*') || t.startsWith('  ')) {
            val += '; ' + t.replace(/^[\s\-\*]+/, '');
          }
        }
      }
      return val;
    }
    // Table: | **Name** | value |
    const tre = new RegExp(`\\|\\s*\\*\\*${name}\\*\\*\\s*\\|\\s*(.+?)\\s*\\|`, 'i');
    const tm = block.match(tre);
    if (tm) return tm[1].trim();
  }
  return '';
}

function parseFile(content: string, sourceFile: string, industry: string): ParsedPersona[] {
  const personas: ParsedPersona[] = [];
  const lines = content.split('\n');

  // Split on ### headings (persona level) — collect body until next ###, ##, or #
  const blocks: { heading: string; body: string }[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    // Match ### heading OR ## Persona N: heading
    if (/^###\s+/.test(line) || /^## Persona \d+:/i.test(line)) {
      const heading = line.replace(/^#{2,3}\s+/, '').trim();
      const bodyLines: string[] = [];
      i++;
      while (i < lines.length && !/^###\s+/.test(lines[i]) && !/^## Persona \d+:/i.test(lines[i])) {
        // Stop at # or ## section headers only if they don't look like persona defs
        if (/^#{1,2}\s+/.test(lines[i]) && !/^## Persona/i.test(lines[i])) {
          break;
        }
        bodyLines.push(lines[i]);
        i++;
      }
      blocks.push({ heading, body: bodyLines.join('\n') });
    } else {
      i++;
    }
  }

  for (const block of blocks) {
    const full = block.body;
    // Must have Governing Body to count as a persona
    if (!/\*\*Governing Body\*\*/i.test(full)) continue;

    // Extract title from heading
    let title = block.heading
      .replace(/^PERSONA\s+[\dA-Z][\dA-Z\-]*:\s*/i, '')
      .replace(/^Persona\s+\d+:\s*/i, '')
      .replace(/^[A-Z]\d*-\d+:\s*/i, '')
      .trim();

    if (!title || title.length < 2) continue;
    // Skip section headers that happen to precede a persona block
    if (/^\d+ Personas?\)?$/i.test(title)) continue;
    if (/^(THE TRIPLE|SECTION|Generated|Catalog|Method|Universal)/i.test(title)) continue;

    const professionalTitle = grab(full, 'Professional Title') || title;
    const governingBody = grab(full, 'Governing Body');
    const guidelines = grab(full,
      'Governing Guidelines', 'Key Governing Guidelines', 'Key Statutes',
      'Key Statutes/Regulations', 'Key Regulations'
    );
    const docTypes = grab(full,
      'Document Types Audited', 'Document Types', 'Documents Audited',
      'Key Document Types'
    );

    personas.push({
      title,
      professionalTitle: professionalTitle.substring(0, 300),
      governingBody: governingBody.substring(0, 500),
      governingGuidelines: guidelines.substring(0, 2000),
      documentTypes: docTypes.substring(0, 2000),
      industry,
      sourceFile,
    });
  }

  return personas;
}

// Main
const files = fs.readdirSync(CATALOG_DIR).filter(f => f.endsWith('.md'));
const allPersonas: ParsedPersona[] = [];
const stats: Record<string, number> = {};

for (const file of files) {
  const content = fs.readFileSync(path.join(CATALOG_DIR, file), 'utf-8');
  const industry = inferIndustry(file);
  const parsed = parseFile(content, file, industry);
  stats[file] = parsed.length;
  allPersonas.push(...parsed);
}

// Generate SQL
const esc = (s: string) => s.replace(/'/g, "''");
const sqlLines: string[] = [
  '-- Auto-generated from catalog-3000 markdown files',
  `-- Generated: ${new Date().toISOString()}`,
  `-- Total personas: ${allPersonas.length}`,
  '',
  `CREATE TABLE IF NOT EXISTS citizen_catalog (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  trademark TEXT,
  domain TEXT NOT NULL,
  industry TEXT NOT NULL,
  category TEXT,
  description TEXT,
  derivation TEXT,
  workers TEXT DEFAULT '[]',
  governance_type TEXT DEFAULT 'INDEPENDENT',
  capabilities TEXT DEFAULT '["compliance","audit","analysis"]',
  professional_title TEXT,
  governing_body TEXT,
  governing_guidelines TEXT,
  document_types TEXT,
  registered_at TEXT DEFAULT (datetime('now'))
);`,
  '',
];

let n = 0;
for (const p of allPersonas) {
  n++;
  const id = `citizen-${String(n).padStart(5, '0')}`;
  const name = p.professionalTitle.substring(0, 200);
  const desc = (p.professionalTitle + ' — ' + p.governingBody).substring(0, 500);
  sqlLines.push(
    `INSERT OR IGNORE INTO citizen_catalog (id, name, domain, industry, description, professional_title, governing_body, governing_guidelines, document_types) VALUES ('${id}', '${esc(name)}', '${esc(p.industry)} Compliance', '${esc(p.industry)}', '${esc(desc)}', '${esc(name)}', '${esc(p.governingBody.substring(0, 500))}', '${esc(p.governingGuidelines.substring(0, 2000))}', '${esc(p.documentTypes.substring(0, 2000))}');`
  );
}

const sqlPath = path.join(__dirname, '..', 'src', 'db', 'seed-catalog-3000.sql');
fs.writeFileSync(sqlPath, sqlLines.join('\n'));

const jsonPath = path.join(__dirname, '..', 'catalog-3000', 'catalog-3000-parsed.json');
fs.writeFileSync(jsonPath, JSON.stringify({ total: allPersonas.length, stats }, null, 2));

console.log(`\n=== CATALOG PARSE COMPLETE ===`);
console.log(`Total personas parsed: ${allPersonas.length}`);
console.log(`SQL seed: ${sqlPath} (${(fs.statSync(sqlPath).size / 1024 / 1024).toFixed(1)} MB)`);
console.log(`\nPer-file breakdown:`);
for (const [file, count] of Object.entries(stats).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${file}: ${count}`);
}

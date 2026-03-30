/**
 * parse-catalog.cjs — CommonJS, no ESM headaches
 * Parses all 41 catalog markdown files into SQL seed
 */
const fs = require('fs');
const path = require('path');

const CATALOG_DIR = path.join(__dirname, '..', 'catalog-3000');

function inferIndustry(filename) {
  return filename.replace('_personas.md', '').replace(/_/g, ' ')
    .split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function grab(bodyLines, ...names) {
  for (const name of names) {
    for (let i = 0; i < bodyLines.length; i++) {
      const line = bodyLines[i];
      // Bullet format — handle **Name:** and **Name**:
      const re = new RegExp('\\*\\*' + name + ':?\\*\\*:?\\s*(.+)', 'i');
      const re2 = new RegExp('\\*\\*' + name + '\\*\\*:?\\s*(.+)', 'i');
      const m = line.match(re) || line.match(re2);
      if (m) {
        let val = m[1].trim();
        // Continuation lines
        for (let j = i + 1; j < bodyLines.length; j++) {
          const t = bodyLines[j].trim();
          if (t === '' || t === '---') break;
          if (t.match(/^\*\*/) || t.match(/^- \*\*(?!$)/)) {
            // Check it's not a continuation — if it starts with - ** and a different field, break
            if (t.match(/^- \*\*/) && !t.match(new RegExp('\\*\\*' + name, 'i'))) break;
          }
          if (t.startsWith('-') || t.startsWith('*') || t.startsWith('  ')) {
            val += '; ' + t.replace(/^[\s\-\*]+/, '');
          } else {
            break;
          }
        }
        return val;
      }
      // Table format
      const tre = new RegExp('\\|\\s*\\*\\*' + name + '\\*\\*\\s*\\|\\s*(.+?)\\s*\\|', 'i');
      const tm = line.match(tre);
      if (tm) return tm[1].trim();
    }
  }
  return '';
}

function parseFile(content, sourceFile, industry) {
  const personas = [];
  const lines = content.split('\n');

  // Find all ### headings and ## Persona headings
  const headingIndices = [];
  for (let i = 0; i < lines.length; i++) {
    if (/^### /.test(lines[i]) || /^## PERSONA /i.test(lines[i]) || /^## Persona \d+:/i.test(lines[i])) {
      headingIndices.push(i);
    }
  }

  for (let h = 0; h < headingIndices.length; h++) {
    const startIdx = headingIndices[h];
    const endIdx = h + 1 < headingIndices.length ? headingIndices[h + 1] : lines.length;
    const heading = lines[startIdx].replace(/^#{2,3}\s+/, '').trim();
    const bodyLines = lines.slice(startIdx + 1, endIdx);

    // Must have Governing Body (colon may be inside or outside the **)
    const hasGB = bodyLines.some(l => /Governing Body/i.test(l) && /\*\*/.test(l));
    if (!hasGB) continue;

    // Clean title
    let title = heading
      .replace(/^PERSONA\s+[\dA-Z][\dA-Z\-]*:\s*/i, '')
      .replace(/^Persona\s+\d+:\s*/i, '')
      .replace(/^[A-Z]\d*-\d+:\s*/i, '')
      .trim();

    if (!title || title.length < 2) continue;

    const professionalTitle = grab(bodyLines, 'Professional Title') || title;
    const governingBody = grab(bodyLines, 'Governing Body');
    const guidelines = grab(bodyLines,
      'Governing Guidelines', 'Key Governing Guidelines', 'Key Statutes',
      'Key Statutes/Regulations', 'Key Regulations'
    );
    const docTypes = grab(bodyLines,
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
const allPersonas = [];
const stats = {};

for (const file of files) {
  const content = fs.readFileSync(path.join(CATALOG_DIR, file), 'utf-8');
  const industry = inferIndustry(file);
  const parsed = parseFile(content, file, industry);
  stats[file] = parsed.length;
  allPersonas.push(...parsed);
}

// Generate SQL
const esc = s => s.replace(/'/g, "''");
const sqlLines = [
  '-- Auto-generated from catalog-3000 markdown files',
  '-- Generated: ' + new Date().toISOString(),
  '-- Total personas: ' + allPersonas.length,
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
  const id = 'citizen-' + String(n).padStart(5, '0');
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

console.log('\n=== CATALOG PARSE COMPLETE ===');
console.log('Total personas parsed: ' + allPersonas.length);
console.log('SQL seed: ' + sqlPath + ' (' + (fs.statSync(sqlPath).size / 1024 / 1024).toFixed(1) + ' MB)');
console.log('\nPer-file breakdown:');
const sorted = Object.entries(stats).sort((a, b) => b[1] - a[1]);
for (const [file, count] of sorted) {
  console.log('  ' + file + ': ' + count);
}

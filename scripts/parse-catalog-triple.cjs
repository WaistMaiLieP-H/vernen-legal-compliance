/**
 * parse-catalog-triple.cjs — Extracts ALL THREE constraints from catalog files
 * and generates UPDATE statements to backfill existing records + INSERT for new ones.
 *
 * Triple Constraint:
 * 1. Governing Guidelines (law)
 * 2. Standards of Creation (professional standards)
 * 3. SOC Controls (integrity verification)
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const CATALOG_DIR = path.join(__dirname, '..', 'catalog-3000');

function gid() { return 'citizen-' + crypto.randomBytes(6).toString('hex'); }
const esc = s => (s || '').replace(/'/g, "''");

function inferIndustry(filename) {
  return filename.replace('_personas.md', '').replace(/_/g, ' ')
    .split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function grab(bodyLines, ...names) {
  for (const name of names) {
    for (let i = 0; i < bodyLines.length; i++) {
      const line = bodyLines[i];
      // Bullet format: - **Name:** value or **Name:** value
      const re = new RegExp('\\*\\*' + name + ':?\\*\\*:?\\s*(.+)', 'i');
      const m = line.match(re);
      if (m) {
        let val = m[1].trim();
        for (let j = i + 1; j < bodyLines.length; j++) {
          const t = bodyLines[j].trim();
          if (t === '' || t === '---') break;
          if (t.match(/^- \*\*/) && !t.match(new RegExp('\\*\\*' + name, 'i'))) break;
          if (t.match(/^\*\*/) && !t.match(new RegExp('\\*\\*' + name, 'i'))) break;
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

    const hasGB = bodyLines.some(l => /Governing Body/i.test(l) && /\*\*/.test(l));
    if (!hasGB) continue;

    let title = heading
      .replace(/^PERSONA\s+[\dA-Z][\dA-Z\-]*:\s*/i, '')
      .replace(/^Persona\s+\d+:\s*/i, '')
      .replace(/^[A-Z]\d*-\d+:\s*/i, '')
      .trim();

    if (!title || title.length < 2) continue;

    const professionalTitle = grab(bodyLines, 'Professional Title') || title;
    const governingBody = grab(bodyLines, 'Governing Body');
    const governingGuidelines = grab(bodyLines,
      'Governing Guidelines', 'Key Governing Guidelines', 'Key Statutes',
      'Key Statutes/Regulations', 'Key Regulations'
    );
    const standardsOfCreation = grab(bodyLines,
      'Standards of Creation', 'Standards Of Creation',
      'Professional Standards', 'Creation Standards'
    );
    const socControls = grab(bodyLines,
      'SOC Controls', 'SOC', 'Segregation of Controls',
      'Integrity Controls', 'Audit Controls'
    );
    const documentTypes = grab(bodyLines,
      'Document Types Audited', 'Document Types', 'Documents Audited',
      'Key Document Types'
    );

    personas.push({
      title,
      professionalTitle: professionalTitle.substring(0, 300),
      governingBody: governingBody.substring(0, 500),
      governingGuidelines: governingGuidelines.substring(0, 2000),
      standardsOfCreation: standardsOfCreation.substring(0, 2000),
      socControls: socControls.substring(0, 2000),
      documentTypes: documentTypes.substring(0, 2000),
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
let hasStandards = 0;
let hasSOC = 0;

for (const file of files) {
  const content = fs.readFileSync(path.join(CATALOG_DIR, file), 'utf-8');
  const industry = inferIndustry(file);
  const parsed = parseFile(content, file, industry);
  stats[file] = parsed.length;
  allPersonas.push(...parsed);
  hasStandards += parsed.filter(p => p.standardsOfCreation).length;
  hasSOC += parsed.filter(p => p.socControls).length;
}

// Generate SQL — UPDATE existing records to add standards_of_creation and soc_controls
// Then INSERT any that are new
const sqlLines = [
  '-- Triple Constraint backfill + new inserts',
  '-- Generated: ' + new Date().toISOString(),
  '-- Total parsed: ' + allPersonas.length,
  '-- With Standards of Creation: ' + hasStandards,
  '-- With SOC Controls: ' + hasSOC,
  '',
];

for (const p of allPersonas) {
  const name = p.professionalTitle.substring(0, 200);

  // UPDATE existing records to add the missing triple constraint fields
  if (p.standardsOfCreation || p.socControls) {
    sqlLines.push(
      `UPDATE citizen_catalog SET standards_of_creation = '${esc(p.standardsOfCreation)}', soc_controls = '${esc(p.socControls)}' WHERE name = '${esc(name)}';`
    );
  }

  // Also INSERT OR IGNORE in case this persona wasn't loaded before
  const id = gid();
  const desc = (p.professionalTitle + ' — ' + p.governingBody).substring(0, 500);
  sqlLines.push(
    `INSERT OR IGNORE INTO citizen_catalog (id, name, domain, industry, description, professional_title, governing_body, governing_guidelines, standards_of_creation, soc_controls, document_types) VALUES ('${id}', '${esc(name)}', '${esc(p.industry)} Compliance', '${esc(p.industry)}', '${esc(desc)}', '${esc(name)}', '${esc(p.governingBody.substring(0, 500))}', '${esc(p.governingGuidelines.substring(0, 2000))}', '${esc(p.standardsOfCreation.substring(0, 2000))}', '${esc(p.socControls.substring(0, 2000))}', '${esc(p.documentTypes.substring(0, 2000))}');`
  );
}

const sqlPath = path.join(__dirname, '..', 'src', 'db', 'seed-triple-constraint.sql');
fs.writeFileSync(sqlPath, sqlLines.join('\n'));

console.log('\n=== TRIPLE CONSTRAINT PARSE ===');
console.log('Total parsed: ' + allPersonas.length);
console.log('With Standards of Creation: ' + hasStandards + ' (' + Math.round(hasStandards/allPersonas.length*100) + '%)');
console.log('With SOC Controls: ' + hasSOC + ' (' + Math.round(hasSOC/allPersonas.length*100) + '%)');
console.log('SQL: ' + sqlPath + ' (' + (fs.statSync(sqlPath).size / 1024 / 1024).toFixed(1) + ' MB)');
console.log('\nPer-file:');
for (const [file, count] of Object.entries(stats).sort((a, b) => b[1] - a[1])) {
  if (count > 0) console.log('  ' + file + ': ' + count);
}

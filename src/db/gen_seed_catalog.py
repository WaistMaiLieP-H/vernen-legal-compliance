#!/usr/bin/env python3
"""
Generate seed-catalog.sql from batch files.
Parses all 25 BATCH_*.md files and generates INSERT statements for citizen_catalog table.
"""
import re
import os

BATCH_DIR = "/home/vernenlegal/Documents/VernenLegalCompliance/assets/inventory"
OUTPUT = "/home/vernenlegal/Documents/VernenLegalCompliance/platform/src/db/seed-catalog.sql"

# Core Citizens to skip (already deployed)
SKIP_NAMES = {
    'LEXARC', 'SYNTARA', 'FISCARA', 'REGULIS', 'ADVOCIS',
    'INTEGRA', 'VIGILUS', 'ETHICARA', 'PRIVAXIS', 'VESTARA',
    'METRIQA', 'CLARIDEX', 'NEXARIS', 'FORGE-0', 'SENTINEL-0'
}

def escape_sql(s):
    return s.replace("'", "''")

def extract_industry_from_filename(filename):
    name = filename.replace('.md', '').replace('BATCH_', '')
    parts = name.split('_', 1)
    if len(parts) > 1:
        return parts[1].replace('_', ' ').upper()
    return 'GENERAL'

def make_id(name):
    clean = name.strip()
    clean = re.sub(r'[^a-zA-Z0-9\s-]', '', clean)
    clean = clean.lower().strip().replace(' ', '-')
    return f"cat-{clean}"

def parse_batch_file(filepath):
    citizens = []
    filename = os.path.basename(filepath)
    industry = extract_industry_from_filename(filename)

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    lines = content.split('\n')
    current_category = ''

    for line_num, line in enumerate(lines):
        stripped = line.strip()

        # Track section headers for category
        if stripped.startswith('## ') and not any(stripped.startswith(f'## {x}') for x in ['Summary', 'SUMMARY', '**']):
            current_category = stripped.lstrip('#').strip()
            current_category = re.sub(r'\s*\(.*?\)\s*', ' ', current_category).strip()
            current_category = re.sub(r'\s*\d+\s*[-\u2013]\s*\d+\s*', '', current_category).strip()
            current_category = re.sub(r'\s*Agents?\s*\d+.*$', '', current_category).strip()
            continue
        if stripped.startswith('### ') and not any(x in stripped.lower() for x in ['batch', 'catalog', 'generated', 'summary']):
            sub = stripped.lstrip('#').strip()
            sub = re.sub(r'\s*\(.*?\)\s*', ' ', sub).strip()
            sub = re.sub(r'\s*\d+\s*[-\u2013]\s*\d+\s*', '', sub).strip()
            if sub:
                current_category = sub
            continue

        # Parse table rows
        if not stripped.startswith('|'):
            continue
        if stripped.startswith('|--') or stripped.startswith('| --') or stripped.startswith('|---'):
            continue
        if any(stripped.startswith(f'| {x}') for x in ['#', 'Segment', 'Category', 'Domain', '**']):
            continue

        cells = [c.strip() for c in stripped.split('|')]
        cells = [c for c in cells if c]

        if len(cells) < 4:
            continue

        num_str = cells[0].strip()
        name_raw = cells[1].strip()
        domain = cells[2].strip()
        derivation = cells[3].strip() if len(cells) > 3 else ''

        try:
            int(num_str)
        except ValueError:
            continue

        # Clean name
        name_with_tm = name_raw
        name_clean = name_raw.replace('\u2122', '').replace('™', '').strip()

        if name_clean.upper() in SKIP_NAMES:
            continue

        if '\u2122' not in name_with_tm and '™' not in name_with_tm:
            name_with_tm = name_clean + '\u2122'

        citizen_id = make_id(name_clean)

        desc = f"{domain}: {derivation}" if derivation else domain

        citizens.append({
            'id': citizen_id,
            'name': name_clean,
            'trademark': name_with_tm,
            'domain': domain,
            'industry': industry,
            'category': current_category if current_category else industry,
            'description': desc,
            'derivation': derivation,
        })

    return citizens

def main():
    batch_files = sorted([
        os.path.join(BATCH_DIR, f)
        for f in os.listdir(BATCH_DIR)
        if f.startswith('BATCH_') and f.endswith('.md')
    ])

    all_citizens = []
    seen_ids = set()

    for bf in batch_files:
        citizens = parse_batch_file(bf)
        for c in citizens:
            orig_id = c['id']
            if orig_id in seen_ids:
                counter = 2
                while f"{orig_id}-{counter}" in seen_ids:
                    counter += 1
                c['id'] = f"{orig_id}-{counter}"
            seen_ids.add(c['id'])
            all_citizens.append(c)

    with open(OUTPUT, 'w', encoding='utf-8') as f:
        f.write("-- Citizen Catalog Seed Data\n")
        f.write("-- Generated: 2026-03-15\n")
        f.write(f"-- Total Citizens: {len(all_citizens)}\n")
        f.write("-- Note: Core Vernen Citizens (LEXARC, SYNTARA, FISCARA, REGULIS, ADVOCIS,\n")
        f.write("--        INTEGRA, VIGILUS, ETHICARA, PRIVAXIS, VESTARA, METRIQA, CLARIDEX,\n")
        f.write("--        NEXARIS, FORGE-0, SENTINEL-0) excluded - already deployed\n\n")

        for c in all_citizens:
            sql = (
                f"INSERT INTO citizen_catalog "
                f"(id, name, trademark, domain, industry, category, description, derivation, workers, governance_type, capabilities) "
                f"VALUES ("
                f"'{escape_sql(c['id'])}', "
                f"'{escape_sql(c['name'])}', "
                f"'{escape_sql(c['trademark'])}', "
                f"'{escape_sql(c['domain'])}', "
                f"'{escape_sql(c['industry'])}', "
                f"'{escape_sql(c['category'])}', "
                f"'{escape_sql(c['description'])}', "
                f"'{escape_sql(c['derivation'])}', "
                f"'[]', "
                f"'INDEPENDENT', "
                f"'[]'"
                f");\n"
            )
            f.write(sql)

    print(f"Generated {len(all_citizens)} INSERT statements to {OUTPUT}")

if __name__ == '__main__':
    main()

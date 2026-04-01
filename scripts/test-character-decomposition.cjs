/**
 * Test: Character Decomposition on OPD 09-011438 (Feb 15, 2009)
 * Shows what team would assemble for this document.
 */

// Simulate the character extraction (in production, CUSTOS would do this)
const characters = [
  { name: "Officer Russell, Derek", role: "Reporting Officer", designation: "Emp# 8950", agency: "OPD", badgeOrId: "8950" },
  { name: "Officer Hazelwood, David", role: "Primary Assigned Officer", designation: "Emp# 8402", agency: "OPD", badgeOrId: "8402" },
  { name: "Officer Lee, Mega", role: "Secondary Responding Officer", designation: "Emp# 8831", agency: "OPD", badgeOrId: "8831" },
  { name: "Officer Nguyen, My", role: "Primary Responding Officer", designation: "Emp# 8775", agency: "OPD", badgeOrId: "8775" },
  { name: "Officer Van Scoy", role: "Officer — Admonished Suspect", designation: "Emp# 8948", agency: "OPD", badgeOrId: "8948" },
  { name: "Officer Katz", role: "Officer — Took Written Statement", designation: "Emp# 8923", agency: "OPD", badgeOrId: "8923" },
  { name: "Sgt. Kim", role: "Custody Sergeant", designation: "#7552", agency: "OPD", badgeOrId: "7552" },
  { name: "Chan, Robert", role: "Report Approver", designation: "Supervisor", agency: "OPD" },
  { name: "Cerretani, Christina Marie", role: "Arrestee/Suspect", designation: "S-1", metadata: { age: "24", sex: "Female" } },
  { name: "Hartmann, Michael", role: "Victim/Complainant", designation: "V-1", metadata: { age: "30", sex: "Male" } },
  { name: "Cole (infant)", role: "Child Present — held by victim during battery", designation: "O-1", metadata: { age: "infant" } },
  { name: "911 Dispatcher", role: "Dispatcher — received 911 call from V-1", agency: "OPD Dispatch" },
  { name: "EMTs (referenced)", role: "First Responders — dispatched to earlier suicide call", agency: "EMT", metadata: { note: "Referenced in case history but not in this report" } },
];

// Classify character types
function classifyType(role, agency) {
  const r = role.toLowerCase();
  const a = (agency || '').toLowerCase();
  if (r.includes('officer') || r.includes('sergeant') || r.includes('deputy') || a.includes('police') || a.includes('opd')) return 'LAW_ENFORCEMENT';
  if (r.includes('emt') || r.includes('paramedic') || r.includes('first responder')) return 'FIRST_RESPONDER';
  if (r.includes('judge') || r.includes('commissioner')) return 'JUDICIAL';
  if (r.includes('victim') || r.includes('suspect') || r.includes('arrestee') || r.includes('complainant')) return 'PARTY';
  if (r.includes('child') || r.includes('infant') || r.includes('minor') || r.includes('baby')) return 'MINOR';
  if (r.includes('dispatch') || r.includes('911')) return 'DISPATCHER';
  if (r.includes('approver') || r.includes('reviewer') || r.includes('supervisor')) return 'ADMINISTRATIVE';
  return 'UNKNOWN';
}

console.log('# Review Team Assembly — OPD 09-011438 (February 15, 2009)');
console.log('## Domestic Violence Incident Report\n');
console.log(`**Characters Identified:** ${characters.length}`);
console.log('');
console.log('| # | Character | Role | Type | Assigned Persona | Key Question |');
console.log('|---|---|---|---|---|---|');

const personaMap = {
  'LAW_ENFORCEMENT': { persona: 'POST Compliance Auditor', question: 'Did this officer fulfill all POST duties?' },
  'FIRST_RESPONDER': { persona: 'EMT/Paramedic', question: 'Does a PCR exist? Is it cross-referenced?' },
  'PARTY_victim': { persona: 'DV Victim Advocate', question: 'Were rights protected? Statement accurate?' },
  'PARTY_suspect': { persona: 'Criminal Defense / Brady Analyst', question: 'Was exculpatory evidence preserved?' },
  'MINOR': { persona: 'CASA / Guardian ad Litem', question: 'Was child safety assessed? CANRA cross-report?' },
  'DISPATCHER': { persona: 'CAD/Dispatch Auditor', question: 'Does CAD entry exist and reconcile?' },
  'ADMINISTRATIVE': { persona: 'Forensic Report Auditor', question: 'Was report reviewed within required timeframe?' },
};

characters.forEach((c, i) => {
  const type = classifyType(c.role, c.agency);
  let key = type;
  if (type === 'PARTY') {
    key = c.role.toLowerCase().includes('victim') ? 'PARTY_victim' : 'PARTY_suspect';
  }
  const mapping = personaMap[key] || { persona: 'Forensic Report Auditor', question: 'Properly documented?' };
  console.log(`| ${i+1} | ${c.name} | ${c.role} | ${type} | ${mapping.persona} | ${mapping.question} |`);
});

console.log('');
console.log('## Standing Members (Always Present)');
console.log('- **Forensic Police Report Auditor / Shadow Incident Analyst** — overall document integrity');
console.log('- **Evidence Suppression / Brady Compliance Analyst** — evidence suppression watchdog');
console.log('');
console.log('## Cross-Perspective Rules That Would Fire');
console.log('');
console.log('| Rule | Between | What It Checks |');
console.log('|---|---|---|');
console.log('| VICTIM_SUSPECT_DYNAMIC | Michael (V-1) ↔ Christina (S-1) | Role reversal in prior/future reports, retaliatory patterns |');
console.log('| CHILD_SAFETY_CROSS_CHECK | Cole (O-1) ↔ Document | CANRA referral, child location, child condition |');
console.log('| CAD_REPORT_RECONCILIATION | Dispatcher ↔ Document | CAD entry exists and matches report |');
console.log('| OFFICER_DUTY_COMPARISON | Russell ↔ Nguyen ↔ Lee ↔ Van Scoy ↔ Katz | Compare duties fulfilled by each officer |');
console.log('| SHADOW_INCIDENT_CHECK | EMTs (referenced) ↔ Document | EMTs mentioned but no report exists for their response |');
console.log('');
console.log(`**Total team: ${characters.length} character perspectives + 2 standing members = ${characters.length + 2} audit viewpoints**`);
console.log('');
console.log('Each viewpoint asks different questions of the same document.');
console.log('What one perspective misses, another catches.');

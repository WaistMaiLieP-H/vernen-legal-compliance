/**
 * character-decomposition.ts — Character Decomposition Engine
 *
 * When a document arrives, don't just audit the paper.
 * Identify every person in it. Map each person to a persona.
 * Assemble a review team. Each persona audits from their
 * character's perspective. Findings merge with attribution.
 *
 * Architecture:
 * 1. CUSTOS routes document to this engine
 * 2. Engine extracts all characters (people named in document)
 * 3. Engine maps each character to the most relevant persona
 * 4. Each persona produces findings from their character's perspective
 * 5. Cross-perspective detection rules fire between personas
 * 6. Findings merge into unified audit with attribution
 */

import { generateId } from "../utils/helpers.js";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A person identified in a document */
export interface DocumentCharacter {
  id: string;
  name: string;
  role: string;           // VICTIM, SUSPECT, OFFICER, WITNESS, CHILD, JUDGE, etc.
  designation: string;    // V-1, S-1, O-1, Ofc. Russell, Sgt. Kim, etc.
  agency?: string;        // OPD, CPS, EMT, Court, etc.
  badgeOrId?: string;     // Badge #, employee #, bar #
  relationship?: string;  // To other characters: spouse, parent, child, supervisor
  characterType: CharacterType;
  metadata: Record<string, string>; // Anything else extracted: age, DOB, address
}

export type CharacterType =
  | "LAW_ENFORCEMENT"      // Officers, detectives, sergeants
  | "FIRST_RESPONDER"      // EMT, paramedic, fire
  | "JUDICIAL"             // Judge, commissioner, referee
  | "LEGAL_PROFESSIONAL"   // Attorney, mediator, evaluator
  | "SOCIAL_SERVICES"      // CPS worker, probation, social worker
  | "MEDICAL"              // Doctor, nurse, psychiatrist, MRO
  | "PARTY"                // Victim, suspect, petitioner, respondent
  | "MINOR"                // Child, ward, dependent
  | "CIVILIAN_WITNESS"     // Neighbor, bystander, reporting person
  | "ADMINISTRATIVE"       // Clerk, records custodian, approver
  | "DISPATCHER"           // 911 operator, CAD dispatcher
  | "UNKNOWN";

/** A persona assigned to audit from a character's perspective */
export interface TeamMember {
  characterId: string;
  characterName: string;
  characterRole: string;
  personaName: string;       // The catalog persona assigned
  personaId?: string;        // citizen_catalog.id
  perspective: string;       // What this team member is looking for
  auditQuestions: string[];  // Specific questions this perspective asks
}

/** The assembled review team for a document */
export interface ReviewTeam {
  id: string;
  documentId: string;
  documentType: string;
  characters: DocumentCharacter[];
  teamMembers: TeamMember[];
  crossPerspectiveRules: CrossPerspectiveRule[];
  assembledAt: string;
}

/** A rule that fires by comparing findings between two team members */
export interface CrossPerspectiveRule {
  id: string;
  memberA: string;    // characterId of first team member
  memberB: string;    // characterId of second team member
  ruleName: string;
  description: string;
  triggerCondition: string;
}

/** A finding produced by a team member from their perspective */
export interface PerspectiveFinding {
  id: string;
  teamMemberId: string;
  characterName: string;
  characterRole: string;
  personaName: string;
  findingText: string;
  severity: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
  standardCited: string;
  perspective: string;   // "From the position of [character], [finding]"
  detectionRuleId?: string;
}

/** The merged audit output */
export interface DecomposedAudit {
  id: string;
  documentId: string;
  documentType: string;
  reviewTeam: ReviewTeam;
  findings: PerspectiveFinding[];
  crossPerspectiveFindings: PerspectiveFinding[];
  characterTimeline: CharacterTimelineEntry[];
  summary: string;
  generatedAt: string;
}

export interface CharacterTimelineEntry {
  timestamp: string;
  characterName: string;
  action: string;
  source: string;  // Which document/page this comes from
}

// ---------------------------------------------------------------------------
// Character Type → Persona Mapping
// ---------------------------------------------------------------------------

/**
 * Maps a character type + role to the most relevant persona name(s)
 * in the catalog. Returns an ordered list — first match wins.
 */
const PERSONA_MAP: Record<CharacterType, PersonaMapping[]> = {
  LAW_ENFORCEMENT: [
    { roleContains: "reporting officer", persona: "POST Compliance Auditor / Peace Officer Training Standards Specialist", perspective: "Did this officer fulfill all POST-mandated duties for this type of call?" },
    { roleContains: "primary assigned", persona: "POST Compliance Auditor / Peace Officer Training Standards Specialist", perspective: "Did the assigned officer properly manage this case?" },
    { roleContains: "supervisor", persona: "POST Compliance Auditor / Peace Officer Training Standards Specialist", perspective: "Did the supervisor properly review and approve this report?" },
    { roleContains: "sergeant", persona: "POST Compliance Auditor / Peace Officer Training Standards Specialist", perspective: "Did the custody sergeant follow booking and charge protocols?" },
    { roleContains: "detective", persona: "POST Compliance Auditor / Peace Officer Training Standards Specialist", perspective: "Did the detective follow investigation standards?" },
    { roleContains: "officer", persona: "POST Compliance Auditor / Peace Officer Training Standards Specialist", perspective: "Did this officer meet all duty-specific requirements?" },
  ],
  FIRST_RESPONDER: [
    { roleContains: "emt", persona: "EMT-Basic / EMT-Intermediate / Paramedic (EMT-P)", perspective: "Were pre-hospital care documentation standards met?" },
    { roleContains: "paramedic", persona: "EMT-Basic / EMT-Intermediate / Paramedic (EMT-P)", perspective: "Was the patient care report properly completed and cross-referenced with police?" },
  ],
  JUDICIAL: [
    { roleContains: "judge", persona: "Judge of the Superior Court", perspective: "Did the court follow all procedural requirements and consider all mandatory factors?" },
    { roleContains: "commissioner", persona: "Child Support Commissioner / Family Law Facilitator", perspective: "Did the commissioner follow all statutory requirements for this determination?" },
    { roleContains: "referee", persona: "Temporary Judge (Judge Pro Tem) / Referee / Private Judge", perspective: "Did the referee have proper authority and follow all procedural requirements?" },
  ],
  LEGAL_PROFESSIONAL: [
    { roleContains: "mediator", persona: "Family Court Services Mediator", perspective: "Did the mediator follow all CRC 5.210-5.215 requirements?" },
    { roleContains: "evaluator", persona: "Custody Evaluator (730 Evaluator)", perspective: "Did the evaluator follow Evidence Code 730 and CRC 5.220 standards?" },
    { roleContains: "attorney", persona: "Attorney at Law / Counselor at Law (Civil)", perspective: "Did this attorney meet all professional responsibility obligations?" },
    { roleContains: "public defender", persona: "Public Defender / Chief Public Defender / Indigent Defense Administrator", perspective: "Were the defendant/respondent's constitutional rights protected?" },
  ],
  SOCIAL_SERVICES: [
    { roleContains: "cps", persona: "Child Protective Services (CPS) Social Worker", perspective: "Were all mandated reporting and child safety protocols followed?" },
    { roleContains: "social worker", persona: "Child Protective Services (CPS) Social Worker", perspective: "Were all child welfare investigation standards met?" },
    { roleContains: "probation", persona: "Deputy Probation Officer / Chief Probation Officer", perspective: "Were all supervision and reporting requirements met?" },
  ],
  MEDICAL: [
    { roleContains: "psychiatr", persona: "Psychiatrist (MD/DO — Psychiatry)", perspective: "Were all psychiatric evaluation and documentation standards met?" },
    { roleContains: "psycholog", persona: "Clinical Psychologist (PhD/PsyD)", perspective: "Were all psychological evaluation standards met?" },
    { roleContains: "physician", persona: "Attending Physician (MD/DO)", perspective: "Were all medical documentation and reporting standards met?" },
    { roleContains: "nurse", persona: "Registered Nurse (RN)", perspective: "Were all nursing documentation standards met?" },
  ],
  PARTY: [
    { roleContains: "victim", persona: "Domestic Violence Attorney", perspective: "Were this person's rights as a victim protected per PC 13701 and Marsy's Law?" },
    { roleContains: "suspect", persona: "Attorney at Law (Criminal Defense) / Public Defender", perspective: "Were this person's constitutional rights preserved? Was exculpatory evidence documented?" },
    { roleContains: "petitioner", persona: "Family Law Attorney (Dissolution)", perspective: "Did this person's filings meet all statutory requirements and disclosure obligations?" },
    { roleContains: "respondent", persona: "Family Law Attorney (Dissolution)", perspective: "Were this person's rights to notice, service, and opportunity to be heard protected?" },
  ],
  MINOR: [
    { roleContains: "", persona: "CASA Volunteer / Guardian ad Litem", perspective: "Was this child's safety assessed? Were all mandated protections triggered? Was CANRA cross-report made if required?" },
  ],
  CIVILIAN_WITNESS: [
    { roleContains: "", persona: "Forensic Police Report Auditor / Shadow Incident Analyst", perspective: "Was this witness properly identified, interviewed, and their statement preserved?" },
  ],
  ADMINISTRATIVE: [
    { roleContains: "approver", persona: "Forensic Police Report Auditor / Shadow Incident Analyst", perspective: "Did the approver review the report within required timeframes and catch deficiencies?" },
    { roleContains: "clerk", persona: "Clerk of the Superior Court / County Clerk / Clerk of Court", perspective: "Were all filing, service, and record-keeping requirements met?" },
  ],
  DISPATCHER: [
    { roleContains: "", persona: "CAD/Dispatch Records Integrity Auditor", perspective: "Does a CAD entry exist for this dispatch? Does it reconcile with the filed report?" },
  ],
  UNKNOWN: [
    { roleContains: "", persona: "Forensic Police Report Auditor / Shadow Incident Analyst", perspective: "Who is this person and what was their role? Were they properly documented?" },
  ],
};

interface PersonaMapping {
  roleContains: string;
  persona: string;
  perspective: string;
}

// ---------------------------------------------------------------------------
// Character Extraction
// ---------------------------------------------------------------------------

/**
 * Extract all characters from document metadata.
 * In a real implementation, this would use NLP/vision to extract names,
 * roles, badge numbers, etc. from the document content.
 * For now, it accepts pre-extracted character data.
 */
export function extractCharacters(
  rawCharacters: Array<{
    name: string;
    role: string;
    designation?: string;
    agency?: string;
    badgeOrId?: string;
    relationship?: string;
    metadata?: Record<string, string>;
  }>
): DocumentCharacter[] {
  return rawCharacters.map((raw) => ({
    id: generateId("char"),
    name: raw.name,
    role: raw.role,
    designation: raw.designation || raw.role,
    agency: raw.agency,
    badgeOrId: raw.badgeOrId,
    relationship: raw.relationship,
    characterType: classifyCharacterType(raw.role, raw.agency),
    metadata: raw.metadata || {},
  }));
}

function classifyCharacterType(role: string, agency?: string): CharacterType {
  const r = role.toLowerCase();
  const a = (agency || "").toLowerCase();

  if (r.includes("officer") || r.includes("detective") || r.includes("sergeant") || r.includes("deputy") || a.includes("police") || a.includes("sheriff")) return "LAW_ENFORCEMENT";
  if (r.includes("emt") || r.includes("paramedic") || r.includes("fire")) return "FIRST_RESPONDER";
  if (r.includes("judge") || r.includes("commissioner") || r.includes("referee") || r.includes("judicial")) return "JUDICIAL";
  if (r.includes("attorney") || r.includes("mediator") || r.includes("evaluator") || r.includes("counsel") || r.includes("public defender")) return "LEGAL_PROFESSIONAL";
  if (r.includes("social worker") || r.includes("cps") || r.includes("probation")) return "SOCIAL_SERVICES";
  if (r.includes("doctor") || r.includes("physician") || r.includes("psychiatr") || r.includes("psycholog") || r.includes("nurse") || r.includes("medical")) return "MEDICAL";
  if (r.includes("victim") || r.includes("suspect") || r.includes("petitioner") || r.includes("respondent") || r.includes("complainant") || r.includes("arrestee")) return "PARTY";
  if (r.includes("child") || r.includes("minor") || r.includes("infant") || r.includes("baby") || r.includes("son") || r.includes("daughter")) return "MINOR";
  if (r.includes("witness") || r.includes("reporting person") || r.includes("bystander")) return "CIVILIAN_WITNESS";
  if (r.includes("clerk") || r.includes("approver") || r.includes("reviewer") || r.includes("records")) return "ADMINISTRATIVE";
  if (r.includes("dispatch") || r.includes("911") || r.includes("operator")) return "DISPATCHER";

  return "UNKNOWN";
}

// ---------------------------------------------------------------------------
// Team Assembly
// ---------------------------------------------------------------------------

/**
 * Assemble a review team by mapping each character to the most
 * relevant persona in the catalog.
 */
export function assembleTeam(
  documentId: string,
  documentType: string,
  characters: DocumentCharacter[],
): ReviewTeam {
  const teamMembers: TeamMember[] = [];

  for (const character of characters) {
    const mappings = PERSONA_MAP[character.characterType] || PERSONA_MAP.UNKNOWN;

    // Find best matching persona for this character
    let matched = false;
    for (const mapping of mappings) {
      if (mapping.roleContains === "" || character.role.toLowerCase().includes(mapping.roleContains)) {
        const questions = generateAuditQuestions(character, mapping.perspective);
        teamMembers.push({
          characterId: character.id,
          characterName: character.name,
          characterRole: character.role,
          personaName: mapping.persona,
          perspective: mapping.perspective,
          auditQuestions: questions,
        });
        matched = true;
        break;
      }
    }

    // Fallback: assign the forensic auditor
    if (!matched) {
      teamMembers.push({
        characterId: character.id,
        characterName: character.name,
        characterRole: character.role,
        personaName: "Forensic Police Report Auditor / Shadow Incident Analyst",
        perspective: `Audit all documentation related to ${character.name} (${character.role})`,
        auditQuestions: [`Was ${character.name} properly documented in their role as ${character.role}?`],
      });
    }
  }

  // Always add the forensic auditor as the overall document auditor
  teamMembers.push({
    characterId: "doc-level",
    characterName: "DOCUMENT",
    characterRole: "OVERALL",
    personaName: "Forensic Police Report Auditor / Shadow Incident Analyst",
    perspective: "Audit the document as a whole for completeness, integrity, and shadow incidents",
    auditQuestions: [
      "Are all mandatory fields completed?",
      "Are all timestamps internally consistent?",
      "Does any party mention an event that has no corresponding record?",
      "Is the document signed and approved?",
      "Does the narrative accurately reflect the documented facts?",
    ],
  });

  // Always add Brady analyst as the integrity watchdog
  teamMembers.push({
    characterId: "brady-level",
    characterName: "INTEGRITY",
    characterRole: "WATCHDOG",
    personaName: "Evidence Suppression / Brady Compliance Analyst",
    perspective: "Watch for any evidence that was not collected, preserved, or disclosed",
    auditQuestions: [
      "Is there evidence mentioned but not collected?",
      "Is there a referenced event with no corresponding report?",
      "Were all parties' statements accurately preserved?",
      "Is there any indication of selective documentation?",
    ],
  });

  // Generate cross-perspective rules
  const crossRules = generateCrossPerspectiveRules(teamMembers);

  return {
    id: generateId("team"),
    documentId,
    documentType,
    characters,
    teamMembers,
    crossPerspectiveRules: crossRules,
    assembledAt: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Audit Question Generation
// ---------------------------------------------------------------------------

function generateAuditQuestions(character: DocumentCharacter, perspective: string): string[] {
  const questions: string[] = [];
  const type = character.characterType;

  if (type === "LAW_ENFORCEMENT") {
    questions.push(`Did ${character.name} complete all mandatory documentation for this incident type?`);
    questions.push(`Did ${character.name} search for prior contacts before completing the report?`);
    questions.push(`Did ${character.name} follow dominant aggressor determination protocol (if DV)?`);
    questions.push(`Were all POST-mandated duties fulfilled by ${character.name}?`);
  }

  if (type === "PARTY" && character.role.toLowerCase().includes("victim")) {
    questions.push(`Were ${character.name}'s statements accurately documented without mischaracterization?`);
    questions.push(`Was ${character.name} advised of their rights (Marsy's Law, DV resource card, EPO)?`);
    questions.push(`Was evidence of ${character.name}'s injuries documented (photos, medical)?`);
  }

  if (type === "PARTY" && character.role.toLowerCase().includes("suspect")) {
    questions.push(`Was exculpatory evidence regarding ${character.name} preserved and documented?`);
    questions.push(`Were ${character.name}'s constitutional rights protected?`);
    questions.push(`Were prior contacts showing ${character.name} as help-seeking party documented?`);
  }

  if (type === "MINOR") {
    questions.push(`Was ${character.name}'s safety assessed at the scene?`);
    questions.push(`Was a CANRA cross-report to CPS made if required?`);
    questions.push(`Was ${character.name}'s physical location and condition documented?`);
  }

  if (type === "FIRST_RESPONDER") {
    questions.push(`Does a Pre-hospital Care Report (PCR) exist for this response?`);
    questions.push(`Is the PCR cross-referenced with the police report?`);
  }

  if (type === "DISPATCHER") {
    questions.push(`Does a CAD entry exist for this dispatch?`);
    questions.push(`Does the CAD disposition match the filed report?`);
    questions.push(`How was the call initially classified vs how it was ultimately reported?`);
  }

  // Always ask the core question
  questions.push(perspective);

  return questions;
}

// ---------------------------------------------------------------------------
// Cross-Perspective Rules
// ---------------------------------------------------------------------------

function generateCrossPerspectiveRules(members: TeamMember[]): CrossPerspectiveRule[] {
  const rules: CrossPerspectiveRule[] = [];

  // Find all officer pairs for evidence symmetry comparison
  const officers = members.filter(m => m.personaName.includes("POST"));
  for (let i = 0; i < officers.length; i++) {
    for (let j = i + 1; j < officers.length; j++) {
      rules.push({
        id: generateId("xrule"),
        memberA: officers[i].characterId,
        memberB: officers[j].characterId,
        ruleName: "OFFICER_DUTY_COMPARISON",
        description: `Compare duties fulfilled by ${officers[i].characterName} vs ${officers[j].characterName}`,
        triggerCondition: "Different officers on same call — compare report contributions",
      });
    }
  }

  // Find victim + suspect pairs for role reversal detection
  const victims = members.filter(m => m.characterRole.toLowerCase().includes("victim"));
  const suspects = members.filter(m => m.characterRole.toLowerCase().includes("suspect"));
  for (const v of victims) {
    for (const s of suspects) {
      rules.push({
        id: generateId("xrule"),
        memberA: v.characterId,
        memberB: s.characterId,
        ruleName: "VICTIM_SUSPECT_DYNAMIC",
        description: `Analyze dynamic between ${v.characterName} (victim) and ${s.characterName} (suspect)`,
        triggerCondition: "Check for role reversal in prior reports, retaliatory filing patterns, and court order contradictions",
      });
    }
  }

  // Find minor + any adult for child safety cross-check
  const minors = members.filter(m => m.characterRole === "MINOR" || m.auditQuestions.some(q => q.includes("CANRA")));
  if (minors.length > 0) {
    rules.push({
      id: generateId("xrule"),
      memberA: minors[0].characterId,
      memberB: "doc-level",
      ruleName: "CHILD_SAFETY_CROSS_CHECK",
      description: "Verify child safety was assessed and all mandatory protections triggered",
      triggerCondition: "Child present in incident — cross-check CPS referral, child location, child condition",
    });
  }

  // Dispatcher + document level for CAD reconciliation
  const dispatchers = members.filter(m => m.personaName.includes("CAD"));
  if (dispatchers.length > 0) {
    rules.push({
      id: generateId("xrule"),
      memberA: dispatchers[0].characterId,
      memberB: "doc-level",
      ruleName: "CAD_REPORT_RECONCILIATION",
      description: "Verify CAD dispatch entry reconciles with filed report",
      triggerCondition: "Dispatch occurred — verify CAD entry exists and matches report",
    });
  }

  return rules;
}

// ---------------------------------------------------------------------------
// Team Report Generation
// ---------------------------------------------------------------------------

/**
 * Generate a summary of the assembled team for human review.
 */
export function teamSummary(team: ReviewTeam): string {
  const lines: string[] = [];

  lines.push(`# Review Team — ${team.documentType}`);
  lines.push(`**Document:** ${team.documentId}`);
  lines.push(`**Characters Identified:** ${team.characters.length}`);
  lines.push(`**Team Members:** ${team.teamMembers.length}`);
  lines.push(`**Cross-Perspective Rules:** ${team.crossPerspectiveRules.length}`);
  lines.push(`**Assembled:** ${team.assembledAt}`);
  lines.push(``);

  lines.push(`## Characters`);
  lines.push(``);
  lines.push(`| Name | Role | Type | Assigned Persona |`);
  lines.push(`|---|---|---|---|`);
  for (const member of team.teamMembers) {
    if (member.characterId === "doc-level" || member.characterId === "brady-level") continue;
    lines.push(`| ${member.characterName} | ${member.characterRole} | ${team.characters.find(c => c.id === member.characterId)?.characterType || "N/A"} | ${member.personaName} |`);
  }
  lines.push(``);

  lines.push(`## Standing Members (Always Present)`);
  lines.push(`- **Forensic Police Report Auditor** — overall document integrity`);
  lines.push(`- **Brady Compliance Analyst** — evidence suppression watchdog`);
  lines.push(``);

  lines.push(`## Cross-Perspective Rules`);
  for (const rule of team.crossPerspectiveRules) {
    lines.push(`- **${rule.ruleName}:** ${rule.description}`);
  }
  lines.push(``);

  lines.push(`## Audit Questions by Perspective`);
  for (const member of team.teamMembers) {
    lines.push(`### ${member.characterName} (${member.characterRole}) → ${member.personaName}`);
    lines.push(`*Perspective: ${member.perspective}*`);
    for (const q of member.auditQuestions) {
      lines.push(`- ${q}`);
    }
    lines.push(``);
  }

  return lines.join("\n");
}

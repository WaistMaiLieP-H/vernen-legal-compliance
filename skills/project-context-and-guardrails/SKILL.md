---

name: project-context-and-guardrails

description: Establishes and maintains project context across conversations while enforcing operational guardrails for legal compliance, ethical boundaries, scope management, and risk thresholds. Ensures continuity, prevents scope creep, and maintains professional standards throughout multi-session engagements.

---



\# 🎯 PROJECT CONTEXT \& GUARDRAILS



\## 📋 WHEN TO USE THIS SKILL



Apply this skill when:



\* Beginning new legal matter or document analysis project

\* User references ongoing case or matter from prior conversations

\* Scope expansion risks exceeding established boundaries

\* Multiple related tasks span multiple conversation sessions

\* Risk threshold assessment required before proceeding

\* Ethical or legal compliance verification needed

\* Project deliverables require cross-session continuity



\## 🏗️ CORE FUNCTIONS



\### 1. PROJECT CONTEXT ESTABLISHMENT



\*\*Objective:\*\* Define and document complete project parameters at initiation.



\*\*Context Initialization Protocol:\*\*



PROJECT CONTEXT BASELINE:



\*\*Matter Identification:\*\*

\* Project Name/Identifier: \[unique reference]

\* Matter Type: \[custody dispute/contract analysis/fraud investigation/etc.]

\* Jurisdiction(s): \[specific courts/counties/states]

\* Controlling Law: \[California Family Code/Contract Law/etc.]



\*\*Parties \& Roles:\*\*

\* Primary User Role: \[petitioner/plaintiff/defendant/analyst]

\* Adverse Parties: \[full names with established roles]

\* Third Parties: \[relevant entities/agencies]

\* Legal Representatives: \[attorneys of record, if any]



\*\*Timeline Parameters:\*\*

\* Matter Origin Date: \[when case/issue began]

\* Current Status: \[active litigation/pre-filing/post-judgment/etc.]

\* Critical Deadlines: \[filing dates/statute of limitations/hearings]

\* Project Completion Target: \[expected end date or milestone]



\*\*Scope Definition:\*\*

\* Primary Objective: \[what user needs accomplished]

\* Deliverable Type: \[analysis/timeline/brief/motion/strategy]

\* Document Universe: \[all relevant files/evidence]

\* Exclusions: \[what is explicitly out of scope]



\*\*Risk Assessment:\*\*

\* Statute of Limitations Status: \[pending/expired/n/a]

\* Jurisdictional Complexity: \[single court/multi-county/federal-state]

\* Evidence Preservation Status: \[secure/at-risk/incomplete]

\* Pro Se Status: \[self-represented/attorney representation]



\### 2. OPERATIONAL GUARDRAILS



\*\*Objective:\*\* Establish and enforce boundaries preventing unauthorized practice of law, ethical violations, or procedural errors.



\*\*GUARDRAIL CATEGORY A: LEGAL PRACTICE BOUNDARIES\*\*



\*\*Prohibited Activities:\*\*

\* Providing legal advice on whether to file, settle, or dismiss

\* Making case outcome predictions or success probability estimates

\* Selecting legal strategies without user direction

\* Drafting attorney signature blocks or representation statements

\* Creating documents falsely implying attorney representation

\* Advising on attorney-client privilege or work product claims



\*\*Permitted Activities:\*\*

\* Analyzing documents for S.o.C. compliance defects

\* Identifying procedural irregularities in court records

\* Organizing evidence chronologically or thematically

\* Explaining legal standards governing specific procedures

\* Drafting factual declarations based on user-provided facts

\* Formatting documents per court rules



\*\*Enforcement:\*\*

IF task crosses into prohibited activity:

&nbsp; 1\. HALT immediately

&nbsp; 2\. Identify specific boundary crossed

&nbsp; 3\. Explain prohibition reason

&nbsp; 4\. Offer permitted alternative approach

&nbsp; 5\. Require user confirmation before proceeding



\*\*GUARDRAIL CATEGORY B: ETHICAL BOUNDARIES\*\*



\*\*Prohibited Conduct:\*\*

\* Creating false evidence or fabricated documents

\* Backdating documents or timestamps

\* Suggesting perjury or false testimony

\* Advising destruction of evidence

\* Creating misleading citations to non-existent authority

\* Facilitating fraud on the court



\*\*Professional Standards:\*\*

\* All factual representations must be user-verified

\* All legal citations must be to actual, published authority

\* All chronologies must accurately reflect source documents

\* All analysis must distinguish fact from inference

\* All risk assessments must include limitation disclaimers



\*\*Verification Protocol:\*\*

BEFORE finalizing any legal document:

\* \[ ] All facts verified against source documents

\* \[ ] All dates confirmed from original records

\* \[ ] All citations validated to published sources

\* \[ ] All inferences clearly labeled as such

\* \[ ] All limitations and disclaimers included



\*\*GUARDRAIL CATEGORY C: SCOPE MANAGEMENT\*\*



\*\*Scope Creep Prevention:\*\*



\*\*Original Scope Documentation:\*\*

Document initial project parameters explicitly

Create baseline against which expansion is measured



\*\*Expansion Triggers:\*\*

\* User requests analysis of new parties not in original scope

\* New jurisdictions introduced requiring different legal standards

\* Additional document sets requiring separate analysis

\* Timeline extension beyond original parameters

\* Deliverable type change (e.g., from analysis to motion)



\*\*Expansion Protocol:\*\*

IF scope expansion detected:

&nbsp; 1\. Identify specific parameter(s) changing

&nbsp; 2\. Calculate token/time impact of expansion

&nbsp; 3\. Present expansion summary to user

&nbsp; 4\. Obtain explicit approval before proceeding

&nbsp; 5\. Update project context baseline



\*\*Example Expansion Notice:\*\*

SCOPE EXPANSION DETECTED:

\* Original Scope: Analysis of 2009 Solano County custody order

\* Proposed Expansion: Add analysis of 2024 Marin County proceedings

\* Impact: Additional jurisdiction, new 16-year timeline, requires separate S.o.C. identification

\* Estimated Token Increase: 25,000 tokens

\* Proceed? \[YES/NO]



\*\*GUARDRAIL CATEGORY D: RISK THRESHOLDS\*\*



\*\*Risk Classification Matrix:\*\*



\*\*LOW RISK:\*\*

\* Document organization and timeline creation

\* Citation formatting and verification

\* Procedural rule explanation

\* General legal standard identification



\*\*MEDIUM RISK:\*\*

\* S.o.C. compliance audits with fraud flagging

\* Multi-jurisdiction procedural analysis

\* Evidence pattern identification

\* Legal defect analysis



\*\*HIGH RISK:\*\*

\* Pro se litigation document drafting

\* Statute of limitations analysis near deadline

\* Jurisdictional challenge strategy

\* Criminal allegations or fraud reporting preparation



\*\*CRITICAL RISK:\*\*

\* Child safety concerns requiring mandatory reporting

\* Imminent deadline (within 72 hours)

\* Criminal defense matters

\* Appellate briefing



\*\*Risk Response Protocol:\*\*



IF MEDIUM RISK:

\* Include enhanced disclaimers

\* Recommend attorney consultation

\* Verify user understanding of limitations



IF HIGH RISK:

\* Provide explicit limitation notice

\* Strongly recommend immediate attorney consultation

\* Require user acknowledgment of risk before proceeding

\* Include multiple verification checkpoints



IF CRITICAL RISK:

\* HALT non-emergency work

\* Provide emergency resource information if applicable

\* Decline work requiring professional licensure

\* Redirect to qualified professional immediately



\### 3. CROSS-SESSION CONTINUITY



\*\*Objective:\*\* Maintain consistent project context across multiple conversations.



\*\*Continuity Protocol:\*\*



\*\*Session Initialization:\*\*

When user references ongoing project:

&nbsp; 1\. Retrieve project context from prior conversations

&nbsp; 2\. Summarize current project status

&nbsp; 3\. Identify any pending tasks or unresolved issues

&nbsp; 4\. Confirm scope parameters remain unchanged

&nbsp; 5\. Note any new developments since last session



\*\*Context Verification Template:\*\*

PROJECT CONTINUITY CHECK:

\* Project: \[name/identifier]

\* Last Session: \[date]

\* Status at Last Session: \[summary]

\* Pending Items: \[list]

\* Any Changes Since Last Session? \[Y/N]



\*\*Information Handoff:\*\*

At end of each session:

\* Summarize work completed

\* Document decisions made

\* List next steps

\* Flag any scope changes

\* Note any new risks identified



\*\*Documentation Standards:\*\*

\* All project context updates recorded in structured format

\* All scope changes explicitly documented with user approval

\* All risk escalations noted with dates

\* All deliverables linked to project context



\### 4. INTEGRATION WITH OTHER SKILLS



\*\*Skill Coordination:\*\*



\*\*Project Context → Input Refiner:\*\*

\* Provides established project parameters

\* Supplies known party names and roles

\* Defines applicable jurisdictions

\* Sets scope boundaries for refinement



\*\*Project Context → Legal Bias Auditor:\*\*

\* Establishes S.o.C. baseline from project parameters

\* Provides jurisdictional context for compliance standards

\* Defines audit scope based on project boundaries



\*\*Project Context → Citation Validator:\*\*

\* Specifies controlling jurisdiction for citation format

\* Defines applicable code sections from project context

\* Sets verification standards based on risk level



\*\*Project Context → Cross-Verifier:\*\*

\* Provides factual baseline for verification

\* Supplies established timelines for consistency checking

\* Defines acceptable inference boundaries



\*\*Project Context → Executive Style Enforcer:\*\*

\* Determines appropriate formality level

\* Specifies required sections based on deliverable type

\* Sets tone based on matter seriousness



\## 📊 PROJECT CONTEXT EXAMPLE



\*\*Matter:\*\* H v. Christina - Custody Jurisdiction Dispute

\*\*Type:\*\* Family Law - Custody/UCCJEA

\*\*Jurisdictions:\*\* Alameda County, Marin County, Solano County (California)

\*\*Controlling Law:\*\* California Family Code §§ 3020-3048, 3400-3425 (UCCJEA)

\*\*User Role:\*\* Petitioner/Custodial Parent (Pro Se)

\*\*Adverse Party:\*\* Christina (Respondent/Non-Custodial Parent)

\*\*Timeline:\*\* 2009 (custody establishment) - 2025 (current)

\*\*Status:\*\* Active dispute over jurisdictional transfer and custody enforcement

\*\*Current Phase:\*\* Emergency filing preparation

\*\*Scope:\*\* Analysis of jurisdictional defects, procedural violations, timeline construction

\*\*Risk Level:\*\* HIGH (pro se, child involved, multi-county jurisdiction)

\*\*Guardrails Active:\*\*

\* No legal advice on filing strategy

\* Attorney consultation strongly recommended

\* Focus limited to procedural defect identification

\* All factual representations user-verified

\* Statute of limitations monitoring active

\*\*Pending Items:\*\*

\* Complete analysis of Judge Sato transfer order

\* Document Marin County jurisdictional assumption basis

\* Finalize chronology of custody order violations

\*\*Next Session Priorities:\*\*

\* Review any new court filings

\* Update timeline with recent developments

\* Prepare emergency motion support documents (if instructed)



\## ⚠️ CRITICAL REMINDERS



1\. \*\*Project context MUST be established\*\* before substantive work begins

2\. \*\*Guardrails are NON-NEGOTIABLE\*\* regardless of user urgency

3\. \*\*Risk thresholds trigger mandatory protocols\*\* without exception

4\. \*\*Scope changes require explicit user approval\*\* before proceeding

5\. \*\*Cross-session continuity is MANDATORY\*\* for all multi-conversation projects

6\. \*\*Attorney consultation must be recommended\*\* for all HIGH and CRITICAL risk matters



\## 🚫 WHAT THIS SKILL DOES NOT DO



This skill does not:



\* Replace attorney representation or legal advice

\* Make strategic legal decisions for the user

\* Eliminate need for professional review of all outputs

\* Guarantee legal sufficiency of any documents

\* Create attorney-client privilege or work product protection

\* Authorize practice of law by non-attorneys



\## ⚖️ HIGH RISK ACKNOWLEDGMENT



Project context and guardrails establish boundaries but do not substitute for professional legal representation. All work performed under this skill remains subject to review and validation by qualified legal counsel. For matters involving child custody, criminal allegations, or imminent deadlines, immediate attorney consultation is not merely recommended but necessary for proper legal protection.



---


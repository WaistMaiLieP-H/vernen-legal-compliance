---

name: automated-structuring-input-refiner

description: Automatically processes, structures, and refines user inputs to maximize analytical accuracy, ensure completeness, and optimize for legal/technical precision. Transforms unstructured queries into standardized, auditable formats aligned with professional documentation standards.

---



\# 🔧 AUTOMATED STRUCTURING \& INPUT REFINER



\## 📋 WHEN TO USE THIS SKILL



Apply this skill when:



\* User provides complex, multi-part questions or instructions

\* Input contains ambiguous terms requiring clarification

\* Legal/technical analysis requires structured baseline data

\* Document analysis requests need standardized parameters

\* Timeline or chronological data requires organization

\* Multiple jurisdictions, parties, or legal theories are referenced

\* User requests involve cross-referencing prior conversations or documents



\## 🎯 CORE FUNCTIONS



\### 1. INPUT PARSING \& CATEGORIZATION



\*\*Objective:\*\* Decompose user input into discrete, actionable components.



\*\*Process:\*\*



\*\*STEP 1: Identify Request Type\*\*



\* \[ ] Document Analysis (legal, medical, technical)

\* \[ ] Timeline Construction

\* \[ ] Legal Research/Citation

\* \[ ] Fact Pattern Analysis

\* \[ ] Strategic Planning

\* \[ ] Technical Implementation

\* \[ ] Multi-Document Comparison



\*\*STEP 2: Extract Critical Parameters\*\*



\* Jurisdiction(s):

\* Time Period(s):

\* Parties Involved:

\* Document Type(s):

\* Legal Standard(s) Referenced:

\* Specific Statutes/Codes:

\* Desired Output Format:



\*\*STEP 3: Flag Ambiguities\*\*



\* Undefined terms requiring clarification

\* Missing critical context

\* Conflicting instructions

\* Scope limitations



\### 2. CONTEXTUAL INTEGRATION PROTOCOL



\*\*Objective:\*\* Connect current request to prior conversations and documentation.



\*\*Mandatory Checks:\*\*



1\. Search conversation history for related prior work

2\. Identify previously uploaded documents relevant to request

3\. Cross-reference with established timelines/fact patterns

4\. Note any conflicting information requiring reconciliation

5\. Verify access to required source materials



\*\*Output Format:\*\*



CONTEXTUAL BASELINE:

\* Related Prior Work: \[conversation IDs, document references]

\* Established Facts: \[from prior analysis]

\* Known Parties: \[with established roles]

\* Jurisdictional Context: \[confirmed courts/agencies]

\* Gaps Requiring New Information: \[list]



\### 3. LEGAL STANDARD IDENTIFICATION



\*\*Objective:\*\* Automatically identify applicable Standard of Creation (S.o.C.) for audit baseline.



\*\*Hierarchy:\*\*



1\. \*\*Statutory Law\*\* (California Code sections, Federal statutes)

2\. \*\*Regulatory Standards\*\* (California Rules of Court, administrative regulations)

3\. \*\*Professional Standards\*\* (State Bar rules, medical licensing board standards)

4\. \*\*Case Law Precedent\*\* (controlling appellate decisions)

5\. \*\*Constitutional Provisions\*\* (due process, equal protection)



\*\*Template:\*\*



APPLICABLE LEGAL STANDARD(S):

\* Standard Type: \[Statutory/Regulatory/Professional/Constitutional]

\* Citation: \[Full citation with section numbers]

\* Requirement: \[Specific duty or standard imposed]

\* Relevance: \[How it applies to current request]

\* Audit Baseline: \[Measurable compliance criteria]



\### 4. AMBIGUITY RESOLUTION FRAMEWORK



\*\*Objective:\*\* Identify and resolve unclear terms before proceeding with analysis.



\*\*Categories of Ambiguity:\*\*



\* \*\*Temporal:\*\* Undefined dates, time periods, deadlines

\* \*\*Jurisdictional:\*\* Unclear court, county, or agency

\* \*\*Identificational:\*\* Ambiguous party names, document titles

\* \*\*Procedural:\*\* Undefined filing requirements, service methods

\* \*\*Substantive:\*\* Vague legal theories, causes of action



\*\*Resolution Protocol:\*\*



AMBIGUITY DETECTED: \[specific term/phrase]

CONTEXT: \[where it appears]

POSSIBLE MEANINGS:

&nbsp; 1\. \[interpretation with supporting context]

&nbsp; 2\. \[alternative interpretation]

CLARIFYING QUESTION: \[direct question to resolve]

PROCEED IF: \[conditions under which Claude can make reasonable inference]

HALT IF: \[conditions requiring user clarification]



\### 5. OUTPUT STANDARDIZATION



\*\*Objective:\*\* Ensure all refined inputs follow consistent format for downstream processing.



\*\*Standard Input Refinement Template:\*\*



═══════════════════════════════════════════════════

REFINED REQUEST SPECIFICATION

═══════════════════════════════════════════════════



PRIMARY OBJECTIVE:

\[Single-sentence statement of core request]



SCOPE OF ANALYSIS:

\* Document(s): \[specific files/types]

\* Time Period: \[defined dates or range]

\* Jurisdiction(s): \[county, state, federal]

\* Parties: \[full names with established roles]

\* Legal Framework: \[applicable statutes/standards]



DELIVERABLE FORMAT:

\[Specified output: analysis, timeline, comparison, etc.]



AUDIT BASELINE:

\* Legal Standard: \[S.o.C. citation]

\* Compliance Criteria: \[measurable requirements]



CONTEXTUAL DEPENDENCIES:

\* Prior Work Referenced: \[conversation/document links]

\* Established Facts: \[from prior analysis]

\* Assumptions Required: \[explicit list]



CLARIFICATIONS NEEDED:

\[List of unresolved ambiguities, or "NONE - PROCEED"]



═══════════════════════════════════════════════════



\### 6. EFFICIENCY OPTIMIZATION



\*\*Objective:\*\* Minimize token consumption while maximizing analytical precision.



\*\*Token Management Rules:\*\*



1\. Eliminate redundant phrasing in user input

2\. Convert verbose descriptions to structured parameters

3\. Reference prior work by ID rather than re-stating facts

4\. Use standardized abbreviations for repeated terms

5\. Flag large document analysis for chunking strategy



\*\*Chunking Protocol:\*\*



IF analysis will exceed 50,000 tokens:

&nbsp; 1\. Break into logical segments

&nbsp; 2\. Identify interdependencies

&nbsp; 3\. Propose sequential processing plan

&nbsp; 4\. Specify integration method for final output

&nbsp; 5\. Present plan to user for approval BEFORE proceeding



\### 7. QUALITY CONTROL CHECKLIST



\*\*Objective:\*\* Verify refined input meets all requirements before analysis begins.



\*\*Pre-Analysis Verification:\*\*



\* \[ ] Request type clearly categorized

\* \[ ] All critical parameters extracted

\* \[ ] Applicable legal standard(s) identified

\* \[ ] Prior contextual work integrated

\* \[ ] All ambiguities resolved or flagged

\* \[ ] Output format specified

\* \[ ] Token efficiency optimized

\* \[ ] User approval obtained (if required)



\## 🔄 SPECIAL HANDLING PROTOCOLS



\### MULTI-JURISDICTION REQUESTS



When input involves multiple counties, courts, or agencies:



1\. Create jurisdiction matrix showing relevant authority for each issue

2\. Identify conflicts of law or procedural differences

3\. Specify which jurisdiction's standard applies to each component

4\. Flag forum selection issues



\### TIMELINE CONSTRUCTION REQUESTS



When input requires chronological organization:



1\. Extract all date references (explicit and implied)

2\. Identify date ranges vs. specific dates

3\. Create provisional timeline structure

4\. Flag gaps requiring additional information

5\. Specify desired output format (visual, narrative, table)



\### DOCUMENT COMPARISON REQUESTS



When input requires analyzing multiple documents:



1\. List all documents with clear identifiers

2\. Specify comparison criteria (legal standard, factual consistency, procedural compliance)

3\. Create comparison matrix template

4\. Define required evidentiary support level



\### LEGAL RESEARCH REQUESTS



When input requires case law or statutory research:



1\. Extract search terms and legal issues

2\. Identify controlling jurisdiction

3\. Specify time period for authorities

4\. Define hierarchy of authority (constitutional > statutory > case law)

5\. Set standards for citation format



\## 🔗 INTEGRATION WITH OTHER SKILLS



\*\*Cross-Skill Workflow:\*\*



1\. \*\*Input Refiner\*\* (this skill) → structures request

2\. \*\*Legal Bias \& Fraud Auditor\*\* → applies S.o.C. baseline

3\. \*\*California Code Citation Validator\*\* → verifies statutory citations

4\. \*\*Cross-Verifying AI Outputs\*\* → validates analytical results

5\. \*\*Executive Style Enforcer\*\* → formats final output



\## 🛡️ ERROR PREVENTION



\*\*Common Input Problems This Skill Prevents:\*\*



\* Vague requests leading to incorrect scope

\* Missing jurisdictional context causing wrong legal standard application

\* Ambiguous party identification creating confusion in analysis

\* Undefined time periods preventing accurate chronological analysis

\* Failure to integrate prior work causing redundant effort

\* Proceeding with analysis despite critical missing information



\## 📊 EXAMPLE TRANSFORMATIONS



\*\*BEFORE (Unstructured Input):\*\*



"Look at that custody thing from 2009 and tell me if the judge messed up when they gave her custody after I already had it and she violated the orders."



\*\*AFTER (Refined Input):\*\*



PRIMARY OBJECTIVE:

Analyze 2009 custody modification proceedings for procedural defects and jurisdictional compliance.



SCOPE OF ANALYSIS:

\* Document: 2009 Custody Order (Solano County Superior Court)

\* Time Period: 2009 (specific dates require user confirmation)

\* Jurisdiction: Solano County, California

\* Parties: H (petitioner, established legal/physical custody), Christina (respondent)

\* Legal Framework: California Family Code §§ 3020-3048, 3087-3088; CRC Rule 5.250



DELIVERABLE FORMAT:

Legal defect analysis with S.o.C. compliance audit



AUDIT BASELINE:

\* Standard: Family Code § 3020(b) (best interest standard); § 3044 (custody modification burden)

\* Criteria: Jurisdiction verification, notice requirements, evidentiary findings, changed circumstances showing



CLARIFICATIONS NEEDED:

1\. Specific date of 2009 order requiring analysis

2\. Which violations are referenced (need order violation dates/details)

3\. Prior custody establishment date and court



\[PROCEED with provisional analysis pending clarifications]



\## ⚠️ CRITICAL REMINDERS



1\. \*\*NEVER proceed with ambiguous inputs\*\* that could lead to incorrect legal standard application

2\. \*\*ALWAYS verify jurisdiction\*\* before identifying applicable law

3\. \*\*ALWAYS check prior conversations\*\* for established context

4\. \*\*ALWAYS specify token consumption\*\* for large analyses

5\. \*\*ALWAYS present refined input\*\* to user for confirmation if critical parameters are inferred



\## 🚫 LIMITATIONS



This skill cannot:



\* Resolve factual disputes requiring evidentiary hearing

\* Make legal determinations requiring professional judgment

\* Access information not provided in conversation or documents

\* Create new legal standards not established by authority

\* Override user's explicit instructions (though may flag concerns)



\## ⚖️ HIGH RISK ACKNOWLEDGMENT



This skill structures inputs for analysis but does not replace qualified legal review. All outputs require validation by licensed attorney before use in actual proceedings. A qualified human expert must be actively involved in reviewing, validating, and making final determinations for any consequential legal matters.



---


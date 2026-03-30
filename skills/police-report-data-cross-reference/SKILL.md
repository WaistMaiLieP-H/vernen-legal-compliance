---
name: police-report-data-cross-reference
description: Active data cross-reference layer that enriches police report and CAD log audits with publicly available comparative data from California DOJ OpenJustice, RIPA stop data, SB 1421/SB 16 misconduct records, POST decertification actions, Fatal Encounters, Mapping Police Violence, and NIBRS/UCR data. Trigger whenever an audit flags a law enforcement deficiency, pattern indicator, or constitutional violation — or when user asks about an agency's history, complaint patterns, use-of-force statistics, or accountability record. Also trigger when user asks to verify or corroborate audit findings with external data, or when comparing conduct across multiple agencies or time periods.
---

# Police Report & Law Enforcement Data Cross-Reference Framework

## Purpose
Active enrichment layer. When a law enforcement audit identifies a deficiency, pattern indicator, or violation, this skill directs the auditor to publicly available data sources that can corroborate, contextualize, or quantify the finding. Transforms isolated audit flags into evidence-backed pattern analysis.

## When This Skill Activates
- After ca-post-law-enforcement-audit-v2 flags any finding classified as "Pattern Indicator"
- After constitutional-and-civil-rights-audit flags any Section 1983 or pattern-and-practice indicator
- When user asks about an agency's history, statistics, or accountability record
- When comparing conduct across agencies or time periods
- When building evidentiary foundation for civil rights claims or government tort claims
- When preparing Pitchess motions (need to establish pattern of conduct)

## Publicly Available Data Sources

### 1. California DOJ OpenJustice Portal
**URL**: openjustice.doj.ca.gov
**Data Portal**: data-openjustice.doj.ca.gov
**What's Available**:
- Arrest data by agency, year, demographics (2005–present)
- Deaths in custody / arrest-related deaths by agency
- Law enforcement officers killed or assaulted
- Use of force incident reports (2016–present)
- Crime and clearance rates by jurisdiction
- Complaints against peace officers
- All data downloadable as CSV

**How to Use for Audit**:
- Search by specific agency (e.g., "Oakland Police Department," "Antioch Police Department," "Benicia Police Department")
- Pull use-of-force statistics for the same year as audited report
- Pull complaint data for same agency/period
- Compare arrest demographics to jurisdiction demographics
- Download raw data for quantitative pattern analysis

**Audit Application**: If audit flags excessive force or documentation deficiency → cross-reference against agency's reported use-of-force incidents for same period. If agency shows elevated force rates relative to peer agencies, this corroborates pattern.

### 2. RIPA Stop Data (AB 953)
**URL**: openjustice.doj.ca.gov/exploration/stop-data
**Governing Law**: Gov. Code § 12525.5
**What's Available**:
- All police stops by agency (vehicle, pedestrian, calls for service)
- Perceived demographics of stopped person (race, gender, age, disability, English fluency)
- Reason for stop
- Actions taken during stop (search, handcuffing, force, etc.)
- Result of stop (citation, arrest, warning, no action)
- All California agencies required to report (533+ agencies as of 2024)

**How to Use for Audit**:
- Search by agency and date range
- Identify disproportionate stop/search/arrest rates by demographics
- Compare stop outcomes across agencies in the same region
- Identify patterns in use of force during stops
- Cross-reference with audited report's stop circumstances

**Audit Application**: If audit flags potential racial profiling or disproportionate enforcement → pull RIPA data for that agency showing stop demographics vs. community demographics. Statistical disparity is evidence of pattern.

### 3. SB 1421 / SB 16 — Police Misconduct & Use-of-Force Records
**Legal Authority**: Penal Code § 832.7(b)
**Database**: California Reporting Project (UC Berkeley/Stanford collaboration)
**URL**: projects.scpr.org/california-reporting-project/
**What's Available**:
- Records of incidents where officer fired gun at person
- Records where force caused death or great bodily injury
- Sustained findings of sexual assault by officer
- Sustained findings of officer dishonesty (perjury, false statements, false reports, evidence destruction/concealment)
- Sustained findings of excessive/unjustified force (SB 16)
- Sustained findings of failure to intervene (SB 16)
- Sustained findings of discriminatory conduct (SB 16)
- Sustained findings of unlawful arrest or search (SB 16)

**How to Obtain Records**:
- File California Public Records Act (CPRA) request with specific agency
- Use templates from ACLU of Southern California: aclusocal.org/know-your-rights/access-ca-police-records
- Use First Amendment Coalition's Police Transparency Handbook: firstamendmentcoalition.org/handbook/police-transparency-handbook/
- Officer-specific requests: identify officer by name, request all SB 1421/SB 16 disclosable records
- Incident-specific requests: identify incident, request complete investigation file

**Audit Application**: If audit identifies specific officer(s) → guide user to file PRA request for that officer's SB 1421/SB 16 records. Prior sustained findings of dishonesty are Brady material. Prior sustained findings of excessive force establish pattern for Monell claims.

### 4. POST Decertification Database (SB 2 — Peace Officer Standards Accountability Act)
**Legal Authority**: Penal Code § 13510.1 et seq.
**URL**: post.ca.gov (Peace Officer Decertification section)
**What's Available**:
- Officers whose certifications have been revoked
- Grounds for decertification (serious misconduct)
- Decertification proceeding outcomes

**How to Use for Audit**:
- Check if officer named in audited report has been decertified or is subject to decertification proceedings
- A decertified officer's prior reports face enhanced credibility challenges

**Audit Application**: If audit identifies named officer → check POST decertification records. Decertified or investigated officer's reports carry diminished evidentiary weight.

### 5. Fatal Encounters / Mapping Police Violence
**URLs**: fatalencounters.org / mappingpoliceviolence.us
**What's Available**:
- Crowdsourced database of all deaths during police encounters nationwide
- Captures approximately 30% more fatalities than official DOJ data
- Searchable by agency, date, demographics, cause of death
- Independent of official reporting (captures incidents agencies may underreport)

**How to Use for Audit**:
- Search by agency name and date range
- Cross-reference against official OpenJustice use-of-force/death data
- Identify incidents not captured in official reporting
- Establish scope of force pattern beyond what agency self-reports

**Audit Application**: If audit flags use-of-force concerns → compare agency's official reporting against Fatal Encounters data. Discrepancies indicate potential underreporting, which is itself a compliance violation.

### 6. NIBRS / UCR Crime Data
**URL**: crime-data-explorer.fr.cloud.gov (FBI Crime Data Explorer)
**What's Available**:
- Incident-based crime data by agency
- Offense, victim, offender, and arrestee data
- Searchable by agency ORI, year, offense type
- Downloadable bulk data

**How to Use for Audit**:
- Verify whether incidents in audited reports were submitted to NIBRS
- Compare agency's NIBRS submissions against actual report documentation
- Identify systematic data gaps between reports written and data submitted

### 7. California Commission on POST — Agency Compliance
**URL**: post.ca.gov
**What's Available**:
- POST program participation status by agency
- Training compliance audit results
- Background file audit findings
- Regional consultant assignments

**How to Use for Audit**:
- Verify agency's POST program participation status
- Check for prior POST compliance audit findings
- Identify whether POST has previously flagged the agency for training deficiencies

### 8. County Grand Jury Reports
**Where to Find**: Each California county's Superior Court website
**What's Available**:
- Annual grand jury investigations of local agencies
- Findings and recommendations regarding law enforcement agencies
- Response requirements from investigated agencies

**How to Use for Audit**:
- Search county grand jury archives for reports on specific agency
- Prior grand jury findings on same agency establish institutional knowledge of problems
- Agency responses to grand jury recommendations are public record

## Cross-Reference Protocol

When performing data cross-reference after audit:

```
[DATA CROSS-REFERENCE]
Agency: [Department]
Audit Finding: [Summary of flagged issue]
Data Source(s) Queried: [Which databases/sources]
Corroborating Data:
  - OpenJustice: [Relevant statistics for agency/period]
  - RIPA: [Stop data patterns if applicable]
  - SB 1421: [Prior sustained findings if applicable]
  - POST: [Decertification or compliance findings if applicable]
  - Fatal Encounters: [Independent fatality data if applicable]
  - NIBRS: [Reporting compliance data if applicable]
  - Grand Jury: [Prior findings if applicable]
Pattern Assessment: [Isolated incident / Emerging pattern / Established pattern]
Evidentiary Value: [How this data strengthens the audit finding]
Next Steps: [Specific PRA requests to file / Data to download / Records to obtain]
```

## User Guidance for Data Retrieval

When directing user to obtain data:
1. Provide specific URL for the data source
2. Provide specific search parameters (agency name, ORI if known, date range)
3. Explain what the data will show and how it connects to the audit finding
4. For PRA requests — provide template language and cite PC 832.7(b) and specific SB 1421/SB 16 category
5. Note any costs (agencies may charge direct duplication costs) and right to inspect for free
6. Note timelines — agencies must respond to PRA requests within 10 days (Gov. Code § 6253(c))

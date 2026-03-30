-- Triple Constraint: Elections/Census/Emergency + California Local Unique
-- Generated: 2026-03-29T22:58:24.069071
-- Elections/Census/Emergency: 171 personas
-- California Local Unique: 78 personas
-- Total: 249 personas
-- governing_guidelines: statute/regulation creating the document obligation
-- standards_of_creation: professional standard defining HOW documents must be created
-- soc_controls: integrity/security framework verifying documents were created correctly
-- All standards bodies, certifications, and methodologies are REAL.

-- ============================================================
-- ELECTIONS / VOTING / CENSUS / EMERGENCY (171 personas)
-- ============================================================

UPDATE citizen_catalog SET
  governing_guidelines = 'National Voter Registration Act (NVRA), 52 USC 20501-20511; Help America Vote Act (HAVA), 52 USC 20901-21145; California Elections Code Division 2 (Voter Registration), Sections 2000-2194; Cal. Elec. Code Section 2102 (Affidavit of Registration requirements); Cal. Elec. Code Section 2122 (County elections official form authority); 11 CFR Part 8 (National Voter Registration Act regulations); Motor Voter provisions (52 USC 20504)',
  standards_of_creation = 'Voter registration affidavit completeness and format (Cal. Elec. Code 2150-2194); Citizenship attestation under penalty of perjury; Residence address verification protocols; Same-day/conditional voter registration processing (Cal. Elec. Code 2170); Online voter registration data integrity (Cal. Elec. Code 2196); Registration database entry within mandated timelines',
  soc_controls = 'Dual-verification of registration data entry; Statewide voter database (VoteCal) access controls; Audit trail for every registration change; Retention: 5 years federal elections (52 USC 20701); 4 years state (Cal. Elec. Code 17300)'
WHERE name = 'County Registrar of Voters / County Clerk-Elections Division';

UPDATE citizen_catalog SET
  governing_guidelines = 'NVRA Section 8 (52 USC 20507) -- List maintenance requirements; HAVA Section 303 (52 USC 21083) -- Statewide voter registration database; Cal. Elec. Code 2200-2227 (Cancellations and changes); Cal. Elec. Code 2220 (Cross-state duplicate checking); ERIC (Electronic Registration Information Center) data sharing agreements; Husted v. A. Philip Randolph Institute, 138 S.Ct. 1833 (2018) -- Purge procedures',
  standards_of_creation = 'Address confirmation mailing before removal (NVRA safe harbor); Two federal general election waiting period before cancellation; Felony conviction cross-check with DOJ records; Death record cross-reference with CDPH vital statistics; Duplicate registration resolution protocols; NCOA (National Change of Address) processing',
  soc_controls = 'No single-actor voter removal authority; Public list maintenance reports required; 90-day pre-election systematic purge blackout (52 USC 20507(c)(2)); Written notice to voter before any status change; Audit log of all removals with reason codes'
WHERE name = 'Voter File Maintenance Analyst / List Maintenance Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 2138-2148 (3PVRO requirements); 52 USC 20505 (Mail voter registration); Cal. Elec. Code 2159 (Submission deadline: 3 days); Cal. Elec. Code 18100-18108 (Registration fraud penalties)',
  standards_of_creation = '3PVRO registration with Secretary of State; Submission of collected registrations within 3 days of signing; Voter receipt distribution requirements; Prohibition on compensation per-registration; Training documentation for registration collectors',
  soc_controls = '3PVRO annual registration and renewal; Chain of custody for collected registration forms; Criminal penalties for registration fraud (Cal. Elec. Code 18100); Pre-circulated disclosure statement on forms'
WHERE name = 'Third-Party Voter Registration Organization (3PVRO) Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 3019 (VBM signature comparison); Cal. Elec. Code 105 (Signature verification standards); Cal. Elec. Code 15104 (Provisional ballot signature verification); HAVA Section 303(b) (ID verification for first-time voters); Soltysik v. Padilla settlement standards',
  standards_of_creation = 'Multi-reference signature comparison (not single exemplar); Cure notice and 28-day cure period for signature discrepancies; Bipartisan review team requirements; Consistent signature comparison training and standards; Documentation of match/mismatch determination rationale',
  soc_controls = 'Minimum two reviewers for rejection determination; Voter notification and cure opportunity before rejection; Training certification for all signature reviewers; Random audit sampling of accepted signatures; Appeal process documentation'
WHERE name = 'Signature Verification Examiner / Ballot Signature Reviewer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Uniformed and Overseas Citizens Absentee Voting Act (UOCAVA), 52 USC 20301-20311; Military and Overseas Voter Empowerment Act (MOVE Act), 52 USC 20301 note; Cal. Elec. Code 300-304 (Military/overseas voters); 11 CFR Part 110 (UOCAVA implementation); 45-day ballot transmission requirement (52 USC 20302(a)(8))',
  standards_of_creation = 'Federal Post Card Application (FPCA) processing; Federal Write-In Absentee Ballot (FWAB) acceptance criteria; Electronic ballot delivery (email/fax/online) where authorized; 45-day pre-election ballot transmission deadline; Ballot tracking and confirmation systems',
  soc_controls = 'FVAP reporting compliance; Separate tracking log for UOCAVA ballots; Extended receipt deadline compliance; Data encryption for electronic ballot transmission; Bipartisan processing teams'
WHERE name = 'UOCAVA Coordinator / Military & Overseas Voting Assistance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Voting Rights Act Section 203 (52 USC 10503) -- Language minority requirements; Cal. Elec. Code 14201-14202 (Bilingual poll workers); Cal. Elec. Code 2103(d) (Registration in languages other than English); Census Bureau Section 203 coverage determinations; Executive Order 13166 (Improving Access to Services for Persons with Limited English Proficiency)',
  standards_of_creation = 'Translated registration materials accuracy; Bilingual poll worker staffing thresholds per precinct; Translated ballot accuracy and equivalency review; Audio ballot and accessible voting system language options; Facsimile ballot availability in covered languages',
  soc_controls = 'Community advisory board review of translations; Certified translator attestation for ballot translations; DOJ preclearance records (historical Section 5 jurisdictions); Complaint tracking and resolution documentation; Language needs assessment methodology records'
WHERE name = 'Voting Rights Act Section 203 Language Compliance Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'ADA Title II (42 USC 12131-12134) -- Public entity accessibility; HAVA Section 301 (52 USC 21081) -- Voting system accessibility; Cal. Elec. Code 19225 (Accessible voting system requirements); Cal. Elec. Code 2300 (Curbside voting); 28 CFR 35.150 (Existing facilities accessibility)',
  standards_of_creation = 'Polling place ADA accessibility survey completion; Accessible voting unit (AVU) deployment per location; Remote accessible vote-by-mail (RAVBM) system availability; Audio ballot interface testing and certification; Tactile/sip-and-puff device compatibility verification',
  soc_controls = 'Pre-election polling place accessibility surveys; Accessible voting equipment testing logs; Voter complaint tracking for accessibility issues; Poll worker disability awareness training records; Alternate voting location designation procedures'
WHERE name = 'Accessible Voting Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 2188 (High school voter pre-registration); Cal. Elec. Code 9084 (County Voter Information Guide); HAVA Section 302 (52 USC 21082) -- Provisional voting information; NVRA Section 7 (52 USC 20506) -- Agency voter registration; Cal. Elec. Code 12108 (Polling place notification)',
  standards_of_creation = 'County Voter Information Guide content accuracy and mailing timelines; New citizen registration outreach coordination with USCIS; High school pre-registration program administration; Agency-based registration (DMV, social services) compliance; Public service announcement accuracy',
  soc_controls = 'Publication deadlines enforcement; Translation review for outreach materials; Expenditure tracking for voter education funds; Impartiality requirements in publicly funded outreach'
WHERE name = 'Voter Education Program Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 13100-13116 (Form of ballot); Cal. Elec. Code 13200-13211 (Ballot printing); Cal. Elec. Code 13262-13282 (Ballot measures -- arguments and rebuttals); HAVA Section 301(a)(1) (Voter intent capture); Cal. Elec. Code 13004 (Randomized ballot rotation -- Randomized Alphabet)',
  standards_of_creation = 'Candidate name rotation per Secretary of State randomized alphabet; Ballot measure argument/rebuttal word count limits (Cal. Elec. Code 13262-13282); Font size minimums (Cal. Elec. Code 13107); Clear instructions placement and language; Ballot stock and printing security specifications; Proof review and certification timeline',
  soc_controls = 'Multi-party proof review before printing; Chain of custody from printer to storage to distribution; Ballot numbering/serialization tracking; Spoiled ballot accounting procedures; Ballot inventory reconciliation'
WHERE name = 'Ballot Composition Specialist / Official Ballot Designer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 19000-19007 (Voting system definitions); Cal. Elec. Code 19200-19224 (Certification procedures); Cal. Elec. Code Section 19006 (Legislative intent -- SOS certification required); Cal. Elec. Code Section 19210 (Application for certification); Cal. Elec. Code Section 19211 (30-day public comment period); Cal. Elec. Code Section 19220 (State-approved testing agency authority); Cal. Elec. Code Section 19222 (Applicant cost responsibility); EAC Voluntary Voting System Guidelines (VVSG) 2.0; HAVA Section 301 (52 USC 21081)',
  standards_of_creation = 'Functional testing against VVSG standards; Source code review and escrow requirements; Penetration testing and security vulnerability assessment; Accessibility compliance testing (Section 301 HAVA); Volume/stress testing for election day loads; Hardware and software certification documentation',
  soc_controls = 'Independent testing laboratory (VSTL) accreditation; 30-day public review period before certification (Cal. Elec. Code 19211); Conditional approval with remediation tracking; Version control and change management for certified systems; Vendor cost-bearing for all testing (Cal. Elec. Code 19222); Decertification procedures and notification'
WHERE name = 'Voting System Test Laboratory Analyst / Certification Examiner';

UPDATE citizen_catalog SET
  governing_guidelines = 'CISA Election Infrastructure Security Guidelines; EI-ISAC (Elections Infrastructure Information Sharing and Analysis Center) protocols; NIST SP 800-53 (Security controls for information systems); HAVA Section 301(a)(2) (Audit capacity requirements); Cal. Elec. Code 19205 (Voting system security requirements); Presidential Directive HSPD-7 (Critical Infrastructure Identification); Designation of election infrastructure as critical infrastructure (DHS, Jan. 2017)',
  standards_of_creation = 'Pre-election logic and accuracy (L&A) testing; Post-election risk-limiting audit procedures; Network isolation and air-gap compliance for voting systems; USB/removable media chain of custody; Intrusion detection system deployment for election networks; Tabulation system hash verification',
  soc_controls = 'Multi-factor authentication for system access; Physical seal logs for voting equipment; Background checks for all personnel with system access; Incident response plan specific to election systems; CISA vulnerability scanning participation; Post-election system image preservation'
WHERE name = 'Election Security Specialist / Voting Infrastructure Cybersecurity Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 15000 (Canvass -- general provisions); Cal. Elec. Code 10009 (Public testing of voting equipment); HAVA Section 301(a)(5) (Error rate standards); EAC Testing and Certification Program Manual; Cal. Elec. Code 19360-19367 (Post-election manual tally)',
  standards_of_creation = 'Pre-programmed test deck creation with known outcomes; Public notice and observation opportunity (72-hour notice); Zero-count verification before testing begins; Every race/contest tested with over-votes, under-votes, write-ins; Results comparison against known test deck outcomes; Bipartisan witness signatures on test documentation',
  soc_controls = 'Public observation requirement; Bipartisan testing board composition; Sealed test decks with chain of custody; Written certification of pass/fail per device; Retest procedures for failed equipment'
WHERE name = 'L&A Testing Official / Pre-Election Testing Board Member';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 13004 (Ballot forms for electronic systems); Cal. Elec. Code 13200-13211 (Ballot printing requirements); Secretary of State Ballot Printing Specifications; VVSG 2.0 (Ballot marking device standards)',
  standards_of_creation = 'Correct precinct/ballot style assignment per voter record; Print quality standards (scan readability thresholds); Ballot stock authentication features (watermarks, serialization); Real-time ballot style database synchronization; Printer calibration verification logs',
  soc_controls = 'Access control for ballot-on-demand printers; Ballot issuance log with voter record linkage; Duplicate ballot prevention controls; Waste/spoiled ballot secure destruction log; Bipartisan oversight of ballot issuance'
WHERE name = 'Ballot Print-on-Demand Technician';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 15360 (1% manual tally requirement); Cal. Elec. Code 19360-19367 (Post-election audit procedures); HAVA Section 301(a)(2) (Audit trail requirements); Secretary of State Post-Election Manual Tally Guide; Risk-Limiting Audit protocols (Lindeman-Stark methodology)',
  standards_of_creation = 'Random precinct/batch selection methodology (public draw); Manual tally procedures with bipartisan teams; Discrepancy escalation thresholds and expanded count triggers; Chain of custody for audited ballots; Statistical confidence level documentation (RLA); Official canvass certification timeline (28 days -- Cal. Elec. Code 15372)',
  soc_controls = 'Public observation of audit proceedings; Bipartisan audit board composition; Independent random selection (dice/random number generator); Discrepancy resolution and escalation protocols; Audit report publication requirement'
WHERE name = 'Risk-Limiting Audit (RLA) Coordinator / Post-Election Canvass Auditor';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 9160-9169 (County ballot measure arguments); Cal. Elec. Code 13262-13282 (State ballot measure arguments); Cal. Elec. Code 9050-9056 (Fiscal impact statements); Cal. Elec. Code 9080-9082 (Impartial analysis)',
  standards_of_creation = 'Argument word count limits (300 words argument, 250 words rebuttal); Filing deadline compliance; Priority submission rights (author, governing body, then voters); Impartial analysis drafting by county counsel/LAO; Fiscal impact statement preparation by finance officer',
  soc_controls = 'Filing deadline enforcement with timestamped receipt; Content review for prohibited statements (per case law); Author identity verification; Publication proof review by all parties'
WHERE name = 'Ballot Argument Submission Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 13102 (Ballot form -- ranked choice provisions); Local municipal codes authorizing RCV (e.g., San Francisco Charter Sec. 13.102); FairVote RCV best practices; EAC VVSG provisions for alternative voting methods',
  standards_of_creation = 'Round-by-round tabulation with published results per round; Exhausted ballot tracking and classification; Overvote and skipped-ranking handling rules; Cast vote record (CVR) generation for audit trail; Batch elimination procedures (where authorized)',
  soc_controls = 'Algorithm certification by SOS before use; Public observation of tabulation rounds; CVR publication for independent verification; Complete round-by-round results archival'
WHERE name = 'RCV Tabulation Analyst / Instant Runoff Tabulation Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 12100-12108 (Precinct board appointment); Cal. Elec. Code 12302-12328 (Precinct board duties); Cal. Elec. Code 14200-14210 (Conduct of elections at polling places); HAVA Section 302 (52 USC 21082) -- Provisional voting requirements; Cal. Elec. Code 14310 (Assistance to voters)',
  standards_of_creation = 'Polling place opening/closing procedures with bipartisan witness; Voter check-in and roster reconciliation; Provisional ballot issuance and envelope completion; Spoiled ballot exchange documentation; Ballot box seal integrity maintenance; Voter assistance documentation',
  soc_controls = 'Bipartisan precinct board composition; Oath of office administration before service; Mandatory training completion certification; Equipment seal number recording on opening/closing; Chain of custody for election materials to/from polling place'
WHERE name = 'Election Officer / Precinct Board Inspector';

UPDATE citizen_catalog SET
  governing_guidelines = 'HAVA Section 302(a) (52 USC 21082) -- Provisional voting right; Cal. Elec. Code 14310 (Provisional ballot provisions); Cal. Elec. Code 15100-15112 (Processing provisional ballots); Cal. Elec. Code 3015 (Voter notification of status)',
  standards_of_creation = 'Eligibility determination checklist completion; Registration verification through VoteCal database; Correct precinct/jurisdiction validation; Envelope information completeness review; Voter notification of counted/not-counted status with reason',
  soc_controls = 'Bipartisan determination teams; Written determination rationale for each rejection; Voter notification within mandated timeline; Free access telephone number or website for status check; Appeal documentation'
WHERE name = 'Provisional Ballot Determination Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 4005-4008 (Voter''s Choice Act); Cal. Elec. Code 4005(a)(10) (Vote center accessibility requirements); Cal. Elec. Code 12283 (Election material security); ADA Title II (28 CFR Part 35)',
  standards_of_creation = 'Vote center election administration plan (EAP) compliance; Multi-day operation opening/closing procedures (10-day early voting minimum); Voter roster synchronization across all vote centers (electronic pollbook); Equipment allocation and staffing ratios; ADA accessibility verification per location',
  soc_controls = 'Real-time electronic pollbook connectivity monitoring; Duplicate voting prevention through live roster updates; Daily ballot reconciliation; Equipment security between operating days; Staffing credential verification'
WHERE name = 'Vote Center Site Manager / Voting Location Supervisor';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 3000-3025 (Voting by mail); Cal. Elec. Code 15101 (Mail ballot processing boards); Cal. Elec. Code 3019 (Signature verification for VBM); AB 37 (2021) -- Permanent VBM for all voters; Cal. Elec. Code 3017 (Early VBM processing authorization)',
  standards_of_creation = 'Ballot envelope signature verification procedures; Ballot extraction and flattening without viewing voter choices; Batch creation and tracking; Damaged ballot duplication with original/duplicate pairing; Observation access for authorized watchers',
  soc_controls = 'Bipartisan processing board composition; Separation of signature verification from ballot extraction; Ballot secrecy preservation procedures; Sequential batch numbering with count reconciliation; Public access to processing observation'
WHERE name = 'Vote-by-Mail Ballot Processing Board Member';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 2301 (International election observers); Cal. Elec. Code 15004 (Observation of canvass); Cal. Elec. Code 12105 (Watchers at polling places); Cal. Elec. Code 319.5 (Election observer access); OSCE/ODIHR election observation standards',
  standards_of_creation = 'Observer/challenger credentialing and badge issuance; Observation area designation that preserves ballot secrecy; Challenge documentation procedures; Observer code of conduct enforcement; International observer uniform access per Cal. Elec. Code 2301',
  soc_controls = 'Credential verification before access; Observer conduct incident documentation; Equal access for all qualified parties; No interference with election operations; Observer complaint and resolution tracking'
WHERE name = 'Poll Watcher Credentialing Officer / Observer Program Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 15150-15160 (Semi-official canvass); Secretary of State results reporting protocols; Cal. Elec. Code 15301-15306 (Official canvass process); Cal. Elec. Code 15372 (Canvass completion deadline -- 28 days)',
  standards_of_creation = 'Semi-official election night results transmission format; Precinct-level results data publication; Results update frequency and timeline compliance; Statement of votes cast (SOV) preparation; Official canvass certification by elections official',
  soc_controls = 'Results transmission encryption; Dual authorization for results publication; Media/public results display segregation from tabulation systems; Canvass results vs. election night results reconciliation; Secretary of State certified results reporting'
WHERE name = 'Election Results Reporting Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 3025 (Ballot dropoff locations); Cal. Elec. Code 4005(a)(1)(H) (Vote center dropbox requirements); Secretary of State Ballot Drop Box Guidelines; Cal. Elec. Code 18575 (Tampering penalties)',
  standards_of_creation = 'Dropbox location selection criteria (accessibility, geographic equity); Physical security specifications (bolting, tamper-evident seals, locks); Collection schedule and chain of custody documentation; Video surveillance deployment where required; Public notification of dropbox locations and hours',
  soc_controls = 'Bipartisan ballot collection teams; Seal number documentation at each collection; Tamper-evident seal integrity verification; Collection log with date/time/personnel/seal numbers; Surveillance footage retention'
WHERE name = 'Ballot Dropbox Deployment and Security Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 12312 (Emergency polling place changes); CISA Election Infrastructure Security resources; Cal. Gov. Code 8550-8551 (Emergency services provisions); Presidential Policy Directive 21 (Critical Infrastructure Security)',
  standards_of_creation = 'Election-specific COOP plan development and maintenance; Backup polling place/vote center designation; Alternative ballot delivery procedures; Emergency extension of voting hours procedures; Disaster recovery for electronic systems',
  soc_controls = 'Annual COOP plan review and tabletop exercise; Emergency authority delegation documentation; Backup system testing records; Communication plan for voter notification of changes; After-action review for any emergency activation'
WHERE name = 'Election Continuity of Operations Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Federal Election Campaign Act (FECA), 52 USC 30101-30146; 11 CFR Parts 100-116 (FEC regulations); 11 CFR Part 104 (Reports by political committees); 11 CFR Part 110 (Contribution and expenditure limitations); Citizens United v. FEC, 558 U.S. 310 (2010); Buckley v. Valeo, 424 U.S. 1 (1976)',
  standards_of_creation = 'Quarterly/monthly/pre-election report filing deadlines; Contribution source identification (name, address, employer, occupation over $200); Contribution limit compliance tracking; Expenditure categorization and documentation; 48-hour notice for large late contributions; Year-end report accuracy and reconciliation',
  soc_controls = 'Treasurer personal liability for report accuracy (52 USC 30104); Segregated bank account requirements; Record retention: 3 years after report filed (11 CFR 104.14); Mandatory electronic filing over $50,000 threshold; Best efforts defense documentation for contributor information; Random audit selection program'
WHERE name = 'Federal Campaign Finance Compliance Specialist / FEC Reporting Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'California Political Reform Act (Cal. Gov. Code 81000-91014); Cal. Gov. Code 84200-84222 (Campaign statement filing); Cal. Gov. Code 82015 (Committee definition); Cal. Gov. Code 82025-82029 (Contribution definitions); 2 CCR Title 2, Division 6 (FPPC regulations); Cal. Gov. Code 84211 (Campaign statement contents)',
  standards_of_creation = 'Form 460 (Recipient Committee Campaign Statement) accuracy; Form 461 (Major Donor and Independent Expenditure) filing; Form 496 (Independent Expenditure Report) -- 24-hour filing in final 90 days; Form 497 (Late Contribution Report) -- 24-hour filing; Semi-annual and pre-election filing deadlines; Electronic filing for committees over $25,000',
  soc_controls = 'Treasurer designation and personal liability; FPPC audit and enforcement authority; Late filing penalties (automatic, per day); Public access to all filings via CAL-ACCESS database; Whistleblower protections for reporting violations; 4-year record retention (Cal. Gov. Code 84214)'
WHERE name = 'FPPC Filing Officer / California Campaign Finance Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = '52 USC 30101(4) (Political committee definition); 11 CFR Part 102 (Registration and organization); 11 CFR Part 114 (Corporate/labor organization activity); SpeechNow.org v. FEC, 599 F.3d 686 (D.C. Cir. 2010) -- Super PAC authorization; Cal. Gov. Code 82013 (California PAC definition); Cal. Gov. Code 84100-84108 (Committee registration)',
  standards_of_creation = 'FEC Form 1 (Statement of Organization) within 10 days of $1,000 threshold; Separate segregated fund documentation; Independent expenditure-only committee (Super PAC) registration; Donor disclosure compliance (or exemption documentation); Coordination prohibition documentation; Connected organization relationship disclosure',
  soc_controls = 'Organizational separation from candidate committee; No coordination with candidate attestation and documentation; Independent expenditure maker identification in communications; FEC compliance review of all communications before publication; Donor database security and access controls'
WHERE name = 'Political Action Committee Compliance Director';

UPDATE citizen_catalog SET
  governing_guidelines = 'Lobbying Disclosure Act (LDA), 2 USC 1601-1614; Honest Leadership and Open Government Act (HLOGA), P.L. 110-81; Cal. Gov. Code 86100-86300 (Lobbying disclosure); 2 USC 1603 (Registration requirements); 2 USC 1604 (Reports -- quarterly disclosure); Cal. Gov. Code 86115 (California lobbyist registration)',
  standards_of_creation = 'LD-1 (Registration) filing within 45 days of lobbying contact threshold; LD-2 (Quarterly Activity Report) accuracy and timeliness; LD-203 (Semi-annual contribution report) filing; California lobbyist employer quarterly reports; Issue area and specific bill identification in reports; Client identification and fee disclosure',
  soc_controls = 'Registration threshold monitoring ($3,000/quarter for firm; $14,000/quarter in-house); Revolving door compliance (1-2 year cooling off periods); Gift ban compliance documentation (STOCK Act provisions); Electronic filing requirement; 5-year record retention; Civil and criminal penalty exposure for non-compliance'
WHERE name = 'Lobbying Compliance Specialist / Lobbying Disclosure Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = '52 USC 30104(f) (Electioneering communications reporting); 11 CFR Part 104.20 (Reporting electioneering communications); McConnell v. FEC, 540 U.S. 93 (2003); Cal. Elec. Code 18350 (Mass mailing disclosure requirements); Cal. Gov. Code 84501-84511 (Online political advertisement disclosure)',
  standards_of_creation = 'FEC Form 9 (24-hour Electioneering Communication report) when exceeding $10,000; "Paid for by" disclosure on all qualifying communications; Broadcast/cable/satellite communication tracking within 60/30-day windows; Digital advertisement disclosure requirements; California DISCLOSE Act (AB 249) compliance for ads',
  soc_controls = 'Communication content review and archive before dissemination; Disclaimer placement verification (size, duration, prominence); Pre-publication legal review for coordination assessment; Communication cost tracking and aggregation; Record retention of all communications and funding sources'
WHERE name = 'Electioneering Communications Disclosure Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = '52 USC 30101(17) (Independent expenditure definition); 11 CFR 109.10 (Independent expenditure reporting); 52 USC 30104(b) and (g) (Reporting requirements); Cal. Gov. Code 82031 (California IE definition); FPPC Form 496 (Independent Expenditure Report); FEC Form 5 (Report of Independent Expenditures)',
  standards_of_creation = '24-hour IE reporting within 20 days of election (over $1,000 federal; $1,000 California); 48-hour IE reporting outside 20-day window (over $10,000 federal); Non-coordination attestation with candidate/party; Support/oppose designation per candidate; Expenditure itemization by vendor and purpose',
  soc_controls = 'Written non-coordination policy; Firewall between IE operation and any candidate contact; Contemporaneous record-keeping of expenditure decisions; Legal counsel sign-off on coordination independence; Expenditure aggregation monitoring against thresholds'
WHERE name = 'Independent Expenditure Compliance Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = '52 USC 30102(a) (Treasurer requirement); 11 CFR 102.7 (Treasurer duties); Cal. Gov. Code 84100 (Committee treasurer requirement); Cal. Gov. Code 84213 (Treasurer responsibility for filings); 11 CFR 103.3 (Bank account requirements)',
  standards_of_creation = 'Accurate receipt and disbursement recording; Contribution legality screening (source, amount, timing); Prohibited contribution identification and return; Bank account reconciliation to filings; Timely filing of all required reports; Best-efforts contributor information collection',
  soc_controls = 'Personal civil liability for filing accuracy; Criminal liability for knowing and willful violations; Segregated campaign account requirement; Dual-signature requirements for large disbursements (internal controls); Assistant treasurer designation and succession; Record retention: 3 years federal / 4 years California'
WHERE name = 'Campaign Committee Treasurer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Gov. Code 87200-87210 (Disclosure requirements); Cal. Gov. Code 87300-87313 (Conflict of interest codes); Cal. Gov. Code 87100 (Disqualification); 2 CCR 18700-18756 (FPPC regulations on Form 700); Ethics in Government Act (5 USC App -- federal equivalent)',
  standards_of_creation = 'Annual/assuming/leaving office filing timeline compliance; Disclosure category compliance per agency conflict of interest code; Income, investments, real property, and gift disclosure completeness; Material financial interest identification; Disqualification documentation when conflicts arise',
  soc_controls = 'Filing officer review for completeness (not accuracy); FPPC audit authority; Late filing penalties; Public access to all filed statements; Agency conflict of interest code review every 2 years; Referral to DA for willful violations'
WHERE name = 'Conflict of Interest / Financial Disclosure Filing Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = '52 USC 30101(14)-(15) (Party committee definitions); 11 CFR Part 106 (Allocation of expenses); 11 CFR Part 109 (Coordinated/independent expenditures); 52 USC 30116 (Contribution limits -- party committees); Cal. Gov. Code 85300-85320 (California party committee rules)',
  standards_of_creation = 'Federal/non-federal allocation methodology documentation; Coordinated party expenditure limits tracking; National/state/local committee aggregation; Building fund and Levin fund accounting separation; Convention/delegate reporting',
  soc_controls = 'Separate federal and non-federal accounts; Allocation ratio documentation and annual review; Coordinated expenditure agreement records; Joint fundraising committee agreements; FEC random audit compliance'
WHERE name = 'Party Committee Financial Compliance Director';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Gov. Code 82016.5 (Primarily formed ballot measure committee); Cal. Gov. Code 84107 (Committee naming requirements for ballot measures); Cal. Gov. Code 84223 (Major donor reporting for ballot measures); Cal. Elec. Code 18600-18614 (Petition circulation fraud); First National Bank of Boston v. Bellotti, 435 U.S. 765 (1978) -- Corporate ballot measure spending',
  standards_of_creation = 'Top contributors disclosure in committee name (AB 249 DISCLOSE Act); Primarily formed committee identification and disclosure; Petition circulation expenditure reporting; Out-of-state contributor disclosure; Ballot measure ad disclaimer compliance',
  soc_controls = 'Committee name change when top contributors change; Public filing of all contributions and expenditures; Petition circulator payment records; Criminal penalties for petition fraud (Cal. Elec. Code 18600-18614)'
WHERE name = 'Ballot Measure Committee Compliance Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 8000-8106 (Nomination of candidates); Cal. Elec. Code 8020-8028 (Declaration of candidacy); Cal. Elec. Code 8040-8062 (Nomination papers -- signatures); Cal. Elec. Code 8100-8106 (Filing fees); Cal. Elec. Code 13107 (Candidate statement in voter pamphlet)',
  standards_of_creation = 'Declaration of candidacy form completeness and timely filing; Filing fee calculation and collection (or in-lieu petition signatures); Nomination signature sufficiency determination; Candidate statement word count and content compliance; Ballot designation review and approval; Withdrawal deadline enforcement',
  soc_controls = 'Filing period deadline enforcement with timestamp; Signature verification for nomination papers; Filing fee receipt and accounting; Candidate statement cost collection (where applicable); Public document status tracking'
WHERE name = 'Candidate Filing Officer / Nomination Document Processor';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Const. Art. II, Sections 8-11 (Initiative, referendum, recall); Cal. Elec. Code 100-107 (Petition requirements); Cal. Elec. Code 9000-9097 (Initiative measures); Cal. Elec. Code 9100-9145 (Referendum measures); Cal. Elec. Code 11000-11386 (Recall procedures); Cal. Elec. Code 101 (11-point type requirements); Cal. Elec. Code 103 (Signature withdrawal rights); Cal. Elec. Code 105 (Signature verification standards)',
  standards_of_creation = 'Petition format compliance (11-point type, required language per Cal. Elec. Code 101); Signature threshold verification (random sample or full count); Circulator affidavit completeness; Filing deadline compliance; Title and summary preparation (Attorney General for state; city attorney for local); Fiscal impact estimate coordination; Signature withdrawal processing (Cal. Elec. Code 103)',
  soc_controls = 'Random sample methodology per Secretary of State guidelines; Signature verification training standards (Cal. Elec. Code 105); Public examination period for petition signatures; Circulator registration verification; Criminal penalties for petition fraud (Cal. Elec. Code 18600-18614); Challenge and recount procedures'
WHERE name = 'Petition Verification Coordinator / Direct Democracy Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Const. Art. XXI (Citizens Redistricting Commission); Cal. Elec. Code 21000-21003 (Redistricting); Cal. Elec. Code 21500-21534 (FAIR MAPS Act -- local redistricting); Voting Rights Act Section 2 (52 USC 10301) -- Non-dilution requirement; 14th Amendment Equal Protection Clause; Rucho v. Common Cause, 588 U.S. ___ (2019) -- Federal courts and partisan gerrymandering',
  standards_of_creation = 'Population equality standards (one person, one vote); Voting Rights Act compliance analysis; Communities of interest testimony documentation; Nested district analysis (Senate within Assembly); Geographic contiguity and compactness criteria; Public hearing record documentation',
  soc_controls = 'Independent commission structure (no legislative control); Public mapping tool access; All deliberations in public meetings (Bagley-Keene Act); Census data source verification (P.L. 94-171); Conflict of interest screening for commissioners; Mandatory public comment periods'
WHERE name = 'Redistricting Demographer / Commission Technical Staff';

UPDATE citizen_catalog SET
  governing_guidelines = 'Voting Rights Act of 1965 as amended (52 USC 10301-10702); VRA Section 2 (52 USC 10301) -- Results test for vote dilution; VRA Section 4(e) (52 USC 10303(e)) -- Literacy test prohibition; VRA Section 203 (52 USC 10503) -- Language minority requirements; Thornburg v. Gingles, 478 U.S. 30 (1986) -- Section 2 framework; Shelby County v. Holder, 570 U.S. 529 (2013) -- Section 4(b) coverage formula; Allen v. Milligan, 599 U.S. 1 (2023) -- Section 2 application; California Voting Rights Act (Cal. Elec. Code 14025-14032)',
  standards_of_creation = 'Racially polarized voting analysis; Gingles preconditions documentation; Totality of circumstances assessment; Remedial district map alternatives; CVRA safe harbor compliance (district-based elections transition); Language assistance plan development',
  soc_controls = 'Expert witness qualification documentation; Statistical methodology disclosure and peer review; Federal court consent decree compliance monitoring; DOJ correspondence and pre-clearance records (historical); Section 2 litigation risk assessment documentation'
WHERE name = 'VRA Compliance Specialist / Voting Rights Litigation Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 15500-15504 (Statement of vote); Cal. Elec. Code 15400-15402 (Secretary of State canvass duties); Cal. Const. Art. V, Section 10 (SOS election duties); Cal. Elec. Code 12172 (Certified list of candidates); Cal. Elec. Code 8800 (Presidential electors); Electoral Count Reform Act of 2022 (P.L. 117-328)',
  standards_of_creation = 'Official statewide canvass certification; County certificate of election results compilation; Presidential elector certification and safe harbor compliance; Candidate qualification determination for statewide office; Statewide initiative measure certification; Recount authorization and oversight',
  soc_controls = 'Constitutional officer personal certification; County-by-county results reconciliation; Safe harbor deadline compliance (Electoral Count Reform Act); Certified results transmission to federal entities; Record retention per state/federal requirements'
WHERE name = 'Statewide Elections Certification Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'HAVA Title III (52 USC 21081-21089) -- Voting system standards; HAVA Section 254 (52 USC 21004) -- State plan requirements; HAVA Section 303 (52 USC 21083) -- Computerized statewide voter registration list; HAVA Section 261 (52 USC 21011) -- Payments to states; EAC Election Administration and Voting Survey (EAVS); GAO audit standards for HAVA fund expenditures',
  standards_of_creation = 'State HAVA compliance plan development and update; HAVA fund expenditure documentation and federal reporting; Statewide voter registration database standards; Voting system standards compliance verification; Provisional voting implementation monitoring; First-time voter ID verification procedures',
  soc_controls = 'Federal fund accounting segregation; EAC reporting timeline compliance; State plan public comment requirements; Annual EAVS survey completion; Federal audit cooperation requirements; Five-year minimum funding maintenance of effort'
WHERE name = 'Help America Vote Act State Compliance Director';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 16000-16103 (Election contests); Cal. Elec. Code 15600-15632 (Recounts); Cal. Elec. Code 16601 (Recount at trial); Cal. Elec. Code 16404 (Contest affidavit specificity requirements); Cal. CCP 1060-1062.5 (Declaratory relief -- election cases)',
  standards_of_creation = 'Contest petition specificity requirements per precinct (Cal. Elec. Code 16404); Recount demand filing within 5 days of canvass completion; Recount deposit calculation and payment; Ballot re-examination procedures; Contest trial procedures (Cal. Elec. Code 16601); Results adjustment or new election order documentation',
  soc_controls = 'Judicial oversight of contest proceedings; Bipartisan observation during recount; Ballot chain of custody maintained through recount; Depositions and discovery in contest proceedings; Court-ordered seal for disputed ballots'
WHERE name = 'Election Contest Attorney / Recount Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Executive Order 13848 (Imposing Certain Sanctions in the Event of Foreign Interference); CISA #Protect2024 framework; Intelligence Reform and Terrorism Prevention Act (IRTPA) provisions; Cal. Elec. Code 18500-18578 (Election crimes); HAVA Section 301(a)(4) (Voting system security standards); Presidential Policy Directive 41 (Cyber Incident Coordination)',
  standards_of_creation = 'Election threat briefing documentation for election officials; Foreign influence operation identification and reporting; Disinformation/misinformation monitoring and response; Insider threat assessment for election workers; Physical security assessment for election facilities; Incident reporting chain from local to state to federal',
  soc_controls = 'Security clearance management for election officials receiving classified briefings; Multi-source intelligence fusion; Information sharing agreements (DHS/FBI/CISA to state/local); Tabletop exercise documentation; Classified and unclassified reporting channels'
WHERE name = 'Election Threat Intelligence Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 2550 (Electronic pollbook authorization); Secretary of State Electronic Pollbook Standards; HAVA Section 303(b) (Voter identification procedures); VVSG 2.0 (Pollbook interoperability standards)',
  standards_of_creation = 'Real-time synchronization between vote centers; Voter record lookup accuracy and speed; Connectivity failure/offline mode procedures; Data encryption in transit and at rest; Voter privacy screen compliance',
  soc_controls = 'Pre-election database load verification; Access authentication for pollbook operators; Synchronization audit logs; Backup paper roster availability; Post-election data purge procedures'
WHERE name = 'Electronic Pollbook System Administrator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 15154 (Write-in vote counting); Cal. Elec. Code 15350 (Manual count procedures); HAVA Section 301(a)(6) (Uniform definition of vote); Secretary of State Ballot Adjudication Guidelines; County-specific voter intent standard operating procedures',
  standards_of_creation = 'Bipartisan team review of ambiguous ballots; Voter intent determination criteria application; Over-vote, under-vote, and stray mark adjudication; Write-in candidate validation; Damaged/unreadable ballot duplication procedures; Adjudication decision documentation with reason codes',
  soc_controls = 'Bipartisan adjudication team requirement; Real-time observation access; Original ballot preservation alongside duplicated ballot; Decision log with ballot ID, issue, and determination; Supervisor escalation for disputed determinations'
WHERE name = 'Ballot Interpretation / Voter Intent Determination Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'California Public Records Act (Cal. Gov. Code 7920-7931); Cal. Elec. Code 17000-17400 (Preservation and destruction of election records); 52 USC 20701 (Federal election records retention -- 22 months); HAVA Section 301(a)(2) (Audit trail availability); Cal. Elec. Code 2194 (Voter registration confidentiality exceptions)',
  standards_of_creation = 'Public records request response within 10 days (Cal. Gov. Code 7922.535); Voter file confidentiality protections (safe-at-home program); Cast vote record publication; Election records retention schedules compliance; Redaction standards for exempt information; Cost estimate and fee schedule for records production',
  soc_controls = 'Records retention: 22 months federal / varies state; Confidential voter information redaction; Ballot image retention and public availability; Response deadline tracking and escalation; Litigation hold procedures for election records'
WHERE name = 'Election Records Public Access Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'NIST SP 800-53 (Security and privacy controls); CISA Election Infrastructure Security guidelines; EAC VVSG 2.0 (Technical requirements); Cal. Elec. Code 19205 (Voting system security requirements); IEC 62443 (Industrial control systems security -- applicable to election networks)',
  standards_of_creation = 'Election network architecture documentation and segmentation; Patch management within certified system constraints; Backup and disaster recovery procedures; System hardening per CIS benchmarks; Election management system (EMS) access control; Endpoint protection and monitoring deployment',
  soc_controls = 'Privileged access management; Change management board approval for system changes; System event logging and SIEM monitoring; Annual penetration testing; Vendor remote access controls and monitoring; Configuration baseline documentation'
WHERE name = 'Election Technology Infrastructure Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 15150-15160 (Results reporting format); EAC Election Administration and Voting Survey methodology; MIT Election Data + Science Lab standards; Cal. Elec. Code 19360 (Post-election audit data); HAVA Section 241 (52 USC 20981) -- EAC research',
  standards_of_creation = 'Precinct-level results data standardization; Turnout calculation methodology documentation; Registration-to-turnout ratio analysis; Absentee/VBM return rate tracking; Demographic participation analysis; Historical trend data compilation',
  soc_controls = 'Data source verification (official canvass only); Methodology documentation and transparency; Peer review of analytical conclusions; Data anonymization for research sharing; Publication delay until official canvass completion'
WHERE name = 'Election Results Data Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 19210-19222 (Vendor certification obligations); Cal. Elec. Code Section 19212 (Post-certification vendor reporting); Cal. Pub. Contract Code 10100+ (Public contracting); EAC Voting System Test Laboratory accreditation; VVSG 2.0 compliance requirements',
  standards_of_creation = 'Vendor SOS certification maintenance; Software version control and update documentation (Cal. Elec. Code 19212); Source code escrow agreement compliance; Service level agreement performance monitoring; Subcontractor disclosure and vetting; End-of-life/support notification requirements',
  soc_controls = 'Vendor background investigation requirements; Foreign ownership disclosure; Contract performance bond or insurance; Audit rights in vendor contracts; Incident notification requirements; Post-certification change reporting within 10 business days (Cal. Elec. Code 19212)'
WHERE name = 'Election System Vendor Contract Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 18000-18578 (Election crimes); 52 USC 20511 (Criminal penalties -- NVRA violations); 18 USC 241-242 (Conspiracy against rights / Deprivation of rights); 18 USC 594 (Intimidation of voters); 18 USC 597 (Vote buying); Cal. Elec. Code 18500 (False voter registration); Cal. Elec. Code 18540 (Voter intimidation)',
  standards_of_creation = 'Election crime complaint intake and documentation; Evidence preservation for election-related offenses; Voter intimidation complaint investigation protocols; Vote buying/selling investigation procedures; False registration referral processing; Multi-jurisdictional coordination documentation',
  soc_controls = 'Case assignment and conflict screening; Evidence chain of custody standards; Witness protection considerations; Grand jury referral documentation; Election day rapid response procedures; FBI/DOJ election crimes coordination'
WHERE name = 'Election Fraud Investigator / Election Crimes Unit Detective';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Gov. Code 83116 (FPPC enforcement authority); Cal. Gov. Code 91000-91014 (Enforcement and penalties); Cal. Gov. Code 83115.5 (Subpoena power); Cal. Gov. Code 91004 (Civil penalties); Cal. Gov. Code 91005 (Criminal penalties); 2 CCR Division 6 (FPPC enforcement regulations)',
  standards_of_creation = 'Sworn complaint intake and evaluation; Probable cause determination documentation; Stipulated settlement negotiation records; Administrative hearing preparation; Civil penalty calculation methodology; Criminal referral criteria and documentation',
  soc_controls = 'Probable cause/no probable cause determination by Commission vote; Respondent due process protections; Confidential investigation phase; Public enforcement action records after disposition; Statute of limitations monitoring (5 years per Cal. Gov. Code 91000); Settlement amount precedent tracking'
WHERE name = 'FPPC Enforcement Division Attorney / Political Reform Act Investigator';

UPDATE citizen_catalog SET
  governing_guidelines = '52 USC 30109 (Enforcement procedures); 11 CFR Part 111 (Compliance procedures); FEC Enforcement Manual; FEC Alternative Dispute Resolution (ADR) program; FEC Administrative Fine Program',
  standards_of_creation = 'Complaint receipt and notification procedures; Reason-to-believe determination analysis; Investigation scope and subpoena authority documentation; Conciliation agreement negotiation; Probable cause brief preparation; Penalty calculation guidelines',
  soc_controls = 'Bipartisan Commission vote requirement (4 of 6 members); Respondent notification and response opportunity; Confidential investigation phase (52 USC 30109(a)(12)); Public disclosure of closed MURs; 5-year statute of limitations; De minimis violation dismissal criteria'
WHERE name = 'FEC Matters Under Review (MUR) Analyst / Enforcement Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = '52 USC 30111(b) (FEC audit authority); 11 CFR Part 104.16 (Audits); GAO Government Auditing Standards (Yellow Book); Cal. Gov. Code 90000-90009 (Franchise Tax Board audits of committees); FPPC audit procedures',
  standards_of_creation = 'Random audit selection methodology documentation; For-cause audit initiation criteria; Contribution limit compliance testing; Expenditure authorization verification; Corporate/foreign national contribution screening; Bank record reconciliation to filed reports; Prohibited contribution identification',
  soc_controls = 'Random selection from eligible committee pool; Formal audit notification and commencement letter; Entrance and exit conference documentation; Draft finding response period for committee; Final audit report publication; Referral to enforcement division for violations found'
WHERE name = 'Political Committee Financial Auditor';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 16100-16103 (Contest of election -- jurisdiction); Cal. CCP 1094.5 (Administrative mandamus); Cal. Gov. Code 11500-11529 (Administrative Procedure Act); Cal. Elec. Code 16400-16442 (Contest proceedings)',
  standards_of_creation = 'Hearing notice and scheduling requirements; Evidence admission standards for election contests; Findings of fact and conclusions of law; Remedy determination (new election vs. results adjustment); Appeal rights notification',
  soc_controls = 'Judicial independence and impartiality; Party participation rights; Record preservation for appellate review; Timeline compliance for contest resolution'
WHERE name = 'Administrative Hearing Officer -- Election Disputes';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code (complete); 52 USC (Voting and Elections -- complete); Cal. Gov. Code 81000-91014 (Political Reform Act); ABA Model Rules of Professional Conduct; Cal. Rules of Prof. Conduct',
  standards_of_creation = 'Legal opinions on election law compliance; Ballot measure title and summary drafting (AG for state measures); Election contest pleading standards; Advisory opinions for election officials; Regulatory comment and rulemaking participation',
  soc_controls = 'Attorney-client privilege maintenance; Conflict of interest screening (public entity representation); Bar licensing and CLE compliance; Opinion letter quality standards'
WHERE name = 'Election Law Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 12283 (Security of election materials); Cal. Elec. Code 14400 (Delivery of ballots and supplies); Secretary of State Supply Chain Security guidelines; County procurement code',
  standards_of_creation = 'Ballot and supply inventory management; Chain of custody documentation for all election materials; Secure storage facility requirements; Distribution routing and delivery confirmation; Post-election material reconciliation; Surplus and spoiled material destruction',
  soc_controls = 'Background checks for warehouse personnel; 24/7 facility security (alarm, surveillance, access control); Dual-custody requirement for ballot access; Inventory reconciliation at each custody transfer; Vehicle GPS tracking for election material transport'
WHERE name = 'Election Materials Supply Chain Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 12309-12310 (Precinct board member instruction); Cal. Elec. Code 12311 (Mandatory training); HAVA Section 261 (Training fund provisions); EAC Poll Worker Training resources; ADA Title II (Accessibility training)',
  standards_of_creation = 'Curriculum development per Secretary of State standards; Mandatory training attendance verification; Competency assessment for poll workers; Scenario-based training for provisional ballots, accessibility, language access; Election law overview for workers (prohibited conduct); Emergency procedures training',
  soc_controls = 'Training completion records with signatures; Curriculum review and update each election cycle; Trainer-of-trainer qualification standards; Multi-language training material availability; Post-election performance evaluation'
WHERE name = 'Election Worker Training Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 2300 (Voter assistance); HAVA Section 302(a)(5) (Voter information requirements); Cal. Elec. Code 3015 (Status notification for VBM); VRA Section 203 (Language access for phone services); Cal. Elec. Code 14310 (Voter assistance at polls)',
  standards_of_creation = 'Script accuracy and legal compliance; Multi-language service availability per Section 203 coverage; Call documentation standards; Complaint intake and escalation procedures; Election day extended hours coverage; Response time metrics',
  soc_controls = 'Staff training certification; Call monitoring and quality assurance; Complaint tracking and resolution documentation; Political neutrality in voter assistance; PII protection in call records'
WHERE name = 'Voter Information Services Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Pen. Code 919-933 (Grand jury powers and duties); Cal. Pen. Code 925 (County operations investigation authority); Cal. Gov. Code 25303 (Board of Supervisors response to grand jury); Grand Jury Procedures Manual',
  standards_of_creation = 'Election office operational review methodology; Findings and recommendations documentation; Response requirement compliance monitoring; Public report preparation standards; Follow-up review scheduling',
  soc_controls = 'Grand jury independence from county operations; Confidential investigation procedures; Mandatory response timeline (60/90 days); Public report publication; Multi-year recommendation tracking'
WHERE name = 'Grand Jury Election Operations Reviewer';

UPDATE citizen_catalog SET
  governing_guidelines = 'USPS Election Mail guidelines (Publication 632); 39 USC 3406 (Election mail provisions); USPS Domestic Mail Manual (DMM) 703; Cal. Elec. Code 3010 (VBM ballot mailing requirements); USPS Tag 191 (Official Election Mail)',
  standards_of_creation = 'Intelligent Mail Barcode (IMb) tracking for election mail; Tag 191/Tag 191-A usage for official election mail; Mail processing timeline compliance (outbound/return); Undeliverable ballot handling procedures; Postmark verification for return deadline compliance; Local USPS election mail coordinator liaison procedures',
  soc_controls = 'USPS dedicated election mail processing stream; All-clear sweep procedures on election deadlines; Delivery point verification before mailing; USPS/Registrar communication log; Tracking data reconciliation'
WHERE name = 'USPS Election Mail Coordinator / Ballot Mail Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 12200-12220 (Precinct establishment); Cal. Elec. Code 21500-21534 (FAIR MAPS Act boundary requirements); Census Bureau TIGER/Line geographic data standards; Cal. Elec. Code 12221 (Consolidation of precincts)',
  standards_of_creation = 'Precinct boundary delineation accuracy; Voter address-to-precinct assignment (geocoding); District overlay mapping (congressional, state, local, special); Polling place/vote center service area analysis; Consolidation precinct documentation; Redistricting data geographic alignment',
  soc_controls = 'GIS database version control; Address change audit trail; Cross-reference with assessor/USPS address databases; Public map publication requirements; Pre-election precinct map certification'
WHERE name = 'Election Geography / Precinct Mapping Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 2053-2054 (CVAAC establishment); ADA Title II (42 USC 12131-12134); Section 504 of the Rehabilitation Act (29 USC 794); HAVA Section 261(b) (Disability access grants)',
  standards_of_creation = 'CVAAC meeting scheduling and public notice; Accessibility complaint review and recommendation; Voting equipment accessibility testing coordination; Election administration plan accessibility review; Disability community outreach documentation',
  soc_controls = 'Committee diversity requirements (range of disabilities represented); Meeting minutes and recommendation tracking; Registrar response to CVAAC recommendations; Public meeting compliance (Brown Act); Annual accessibility assessment cycle'
WHERE name = 'County Voter Accessibility Advisory Committee Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 9084 (County voter information guide); Cal. Elec. Code 12108 (Polling place notification to voters); Cal. Elec. Code 4005(a)(10) (Voter''s Choice Act outreach requirements); Cal. Gov. Code 54954 (Brown Act -- public meeting notice)',
  standards_of_creation = 'Press release accuracy and timing; Social media content compliance with election law; Voter information guide content and mailing; Crisis communication protocol documentation; Election results media briefing procedures',
  soc_controls = 'Legal review of public communications; Political neutrality in official communications; Multi-language communication requirements; Social media policy compliance; Records retention for public communications'
WHERE name = 'Election Communications / Media Relations Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 1-16 (Census Bureau authority and duties); 13 USC 141 (Decennial census requirement); 13 USC 221 (Mandatory response requirement); 13 USC 9 (Title 13 confidentiality protections); Census Bureau Operational Plans (decennial cycle); OMB Statistical Policy Directives',
  standards_of_creation = 'Regional office operational plan implementation; Field operation staffing and training documentation; Non-Response Follow-Up (NRFU) deployment management; Partnership specialist coordination records; Quality assurance and coverage measurement; Local Census Office activation/deactivation procedures',
  soc_controls = 'Title 13 confidentiality oath for all employees (13 USC 23); Background investigation for all census employees; Separation of identified data from published statistics; Operational security for census data collection; Congressional reporting on operational progress; Inspector General oversight'
WHERE name = 'Regional Census Director / Area Census Office Manager';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 23 (Census employee appointments); 13 USC 221-224 (Respondent obligations and penalties); Census Bureau Enumerator Training Manual; Census Bureau Supervisor''s Manual; Census Bureau Information Quality Guidelines',
  standards_of_creation = 'Enumerator assignment and case management; Contact attempt documentation (minimum attempts before proxy); Proxy interview authorization and documentation; Enumerator daily payroll and mileage verification; Quality reinterview program administration; Respondent refusal escalation procedures',
  soc_controls = 'Daily enumerator check-in requirements; GPS tracking of field visits (mobile device); Quality reinterview of minimum percentage of completed cases; Falsification detection and reporting; Whistle-blower protection for data integrity; Case reassignment procedures for enumerator misconduct'
WHERE name = 'Field Operations Supervisor (FOS) / Crew Leader';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 16 (Address information -- legislative provisions); Census Bureau Master Address File (MAF) procedures; LUCA (Local Update of Census Addresses) program guidelines; Census Bureau Geographic Programs guidelines; TIGER/Line geographic database standards',
  standards_of_creation = 'Block-by-block address verification; New construction identification and geocoding; Multi-unit dwelling unit count verification; Housing unit vs. group quarters classification; GPS coordinate capture for each address; Address discrepancy resolution procedures',
  soc_controls = 'MAF/TIGER database access restrictions (Title 13); LUCA participant confidentiality agreements; Address canvassing quality control recanvass; Satellite imagery verification procedures; Address list challenge period administration; Local government liaison documentation'
WHERE name = 'Address Canvasser / Geographic Programs Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 141 (Census of population requirements); Census Bureau Group Quarters Enumeration Manual; Census Bureau GQ Type Classification Guide; 13 USC 9 (Confidentiality -- especially for institutionalized populations); PREA (Prison Rape Elimination Act) considerations for correctional GQ',
  standards_of_creation = 'GQ facility type classification (institutional vs. non-institutional); GQ population count methodology (enumeration at facility vs. usual residence); Transitory locations enumeration procedures; Service-based enumeration for homeless populations; Military installation enumeration coordination; Special procedures for confidential populations (domestic violence shelters)',
  soc_controls = 'Facility administrator coordination and advance notice; Confidential enumeration procedures for sensitive GQ types; Individual questionnaire vs. administrative records methodology; Quality assurance for GQ counts; Duplication avoidance with household enumeration; GQ facility list verification and update'
WHERE name = 'Group Quarters (GQ) Operations Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 141(c) (Census quality requirements); Census Bureau Post-Enumeration Survey methodology; Dual-System Estimation (DSE) statistical framework; Census Coverage Measurement program guidelines; OMB Standards and Guidelines for Statistical Surveys',
  standards_of_creation = 'Coverage measurement survey design and execution; Net undercount/overcount estimation by demographic group; Erroneous enumeration identification; Whole-person imputation methodology documentation; Item imputation rate monitoring; Census-survey comparison analysis',
  soc_controls = 'Independent sample design from production census; Separate matching operation from coverage estimation; Expert panel review of coverage estimates; Peer review of statistical methodology; OMB review before publication; Historical comparison documentation'
WHERE name = 'Census Quality Assurance / Coverage Measurement Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 23 (Appointments and compensation); 13 USC 24 (Special employment provisions for census); 5 CFR Parts 213, 316 (Excepted service appointments); Census Bureau Background Investigation requirements; 13 USC 23(c) (Oath of office -- Title 13 confidentiality)',
  standards_of_creation = 'Mass hiring event documentation; Background investigation processing (fingerprinting, name check); Title 13 confidentiality oath administration; Training completion verification; Bilingual capability assessment documentation; Termination and separation processing',
  soc_controls = 'Background check completion before field deployment; Sworn confidentiality oath as condition of employment; Personnel file confidentiality; Equal opportunity hiring documentation; Separation procedures including equipment return and access revocation; Payroll accuracy controls'
WHERE name = 'Census Temporary Workforce HR Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Census Bureau Complete Count Committee guide; 13 USC 141 (Census purpose and requirements); Census Bureau Partnership Program guidelines; Executive Order 13880 (Census and citizenship data) -- historical reference; Census Bureau Community Engagement toolkit',
  standards_of_creation = 'Complete Count Committee formation documentation; Partnership agreement execution; Hard-to-count community outreach planning; Trusted voice/messenger identification; Questionnaire assistance center establishment; Community-based organization coordination records',
  soc_controls = 'Non-partisan outreach requirement; No influence on questionnaire content through partnerships; Equal access for all community organizations; Partnership activity reporting; Resource allocation equity documentation; Cultural sensitivity review of outreach materials'
WHERE name = 'Census Partnership and Outreach Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Executive Order 13166 (Limited English Proficiency); Census Bureau Language Assistance Program; Section 504 of the Rehabilitation Act (29 USC 794); ADA Title II (42 USC 12131-12134); Census Bureau Internet Self-Response accessibility standards; WCAG 2.0 AA (Web Content Accessibility Guidelines)',
  standards_of_creation = 'Questionnaire translation accuracy (Bureau professional linguists); Language assistance guide development (59+ languages for 2020); Internet self-response accessibility compliance; TTY/relay service availability documentation; Large-print and Braille questionnaire availability; In-language advertising and outreach materials',
  soc_controls = 'Translation quality review by native speakers; Back-translation verification; Cognitive testing of translated questionnaires; Accessibility testing with assistive technology; Language coverage determination methodology; Complaint tracking for language access issues'
WHERE name = 'Census Language Program Coordinator / Accessibility Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 9 (Confidentiality protections); 13 USC 214 (Wrongful disclosure penalties); Census Bureau Respondent Burden Reduction initiative; OMB Controlling Paperwork Burdens on the Public (5 CFR 1320); Paperwork Reduction Act (44 USC 3501-3521)',
  standards_of_creation = 'Respondent burden estimation and minimization; Confidentiality protection communication; Respondent complaint intake and resolution; Non-response reason documentation and analysis; Questionnaire content justification review; Contact frequency limitation enforcement',
  soc_controls = 'Independent respondent advocacy function; Burden reduction reporting to OMB; Complaint trend analysis and systemic issue identification; Confidentiality violation reporting channel; Public transparency reporting on burden'
WHERE name = 'Census Respondent Advocacy Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 9 (Confidentiality -- IT implementation); FISMA (Federal Information Security Modernization Act, 44 USC 3551-3558); NIST SP 800-53 Rev. 5 (Security controls); NIST SP 800-37 (Risk Management Framework); Census Bureau IT Security Policy; FedRAMP (for cloud services)',
  standards_of_creation = 'System security plan (SSP) for census data systems; Authority to Operate (ATO) documentation; Internet self-response system security architecture; Data encryption standards (in transit and at rest); Incident response plan specific to census data; Penetration testing and vulnerability assessment',
  soc_controls = 'FISMA annual assessment and reporting; Continuous monitoring program; Multi-factor authentication for all Title 13 data access; Security awareness training for all census employees; Incident response team activation procedures; Cloud security assessment (FedRAMP compliance)'
WHERE name = 'Census Cybersecurity / IT Security Manager';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 141 (ACS authorized under census authority); 13 USC 182 (Surveys); OMB Standards for Maintaining, Collecting, and Presenting Federal Data on Race and Ethnicity; ACS Design and Methodology Report; OMB Statistical Policy Directive No. 2',
  standards_of_creation = 'Survey sample design documentation; Data collection mode sequence (internet, mail, CATI, CAPI); Response rate monitoring and NRFU deployment; Weighting methodology documentation; 1-year and 5-year estimate production; Margin of error calculation and publication',
  soc_controls = 'OMB clearance for survey instrument (PRA compliance); Title 13 confidentiality for all responses; Independent quality metrics monitoring; Sampling error and non-sampling error documentation; Public use microdata sample (PUMS) disclosure review; Data release schedule compliance'
WHERE name = 'ACS Survey Director / ACS Operations Manager';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 9 (Prohibition against disclosure of identifiable information); Census Bureau Disclosure Review Board policies; Differential Privacy implementation guidelines (2020 Census onward); OMB Statistical Policy Directive No. 4 (Release and dissemination); Census Bureau Data Stewardship policies',
  standards_of_creation = 'Differential privacy noise injection parameters; Disclosure avoidance system (DAS) documentation; Small cell suppression rules; Data swapping methodology (pre-2020); Synthetic data generation documentation; Re-identification risk assessment; Privacy-accuracy tradeoff documentation',
  soc_controls = 'Disclosure Review Board approval required before any data release; Formal privacy loss budget (epsilon) allocation; Post-processing consistency checks; Independent re-identification testing; Public transparency reporting on DAS methodology; Peer review of disclosure avoidance methods'
WHERE name = 'Disclosure Review Board Member / Privacy-Preserving Statistics Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'P.L. 94-171 (Census Redistricting Data Program); 13 USC 141(c) (Data delivery to states); Voting Rights Act Section 2 (52 USC 10301); Census Bureau P.L. 94-171 Redistricting Data Program guidelines; OMB Directive 15 (Race and ethnicity categories)',
  standards_of_creation = 'Block-level population tabulation by race, ethnicity, voting age; April 1 delivery deadline to states (statutory); Geographic hierarchy consistency (state/county/tract/block group/block); Voting district tabulation per state-submitted plans; Group quarters population by type at block level; Data format standardization for state use',
  soc_controls = 'Statutory delivery deadline compliance; State liaison program for geographic plan submission; Data accuracy verification against decennial totals; Disclosure avoidance application verification; Public access simultaneous with state delivery; Historical comparison data availability'
WHERE name = 'P.L. 94-171 Redistricting Data Program Manager';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 181 (Population estimates authority); Census Bureau Population Estimates Methodology; OMB Statistical Policy Directive No. 14 (Statistical agencies responsibilities); Federal-State Cooperative for Population Estimates (FSCPE); Census Bureau Vintage population estimates release schedule',
  standards_of_creation = 'Components of change methodology (births, deaths, migration); Demographic analysis documentation; Administrative records data source validation; Sub-county population estimation methodology; Housing unit method documentation; Annual estimates production and release timeline',
  soc_controls = 'Methodology peer review; Input data source agreement documentation; Vintage release schedule compliance; Intercensal revision documentation; State/local challenge period administration; Historical series consistency maintenance'
WHERE name = 'Intercensal/Postcensal Population Estimates Demographer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Model State Vital Statistics Act (NCHS); Cal. HSC 102100-103095 (California vital records); 42 USC 242k (National vital statistics system); SSA/IRS/USCIS data sharing agreements for vital records; National Association for Public Health Statistics and Information Systems (NAPHSIS) standards',
  standards_of_creation = 'Birth certificate issuance standards (U.S. Standard Certificate of Live Birth); Death certificate completion (U.S. Standard Certificate of Death); Fetal death reporting; Marriage and divorce registration; Cause-of-death coding (ICD-10); Delayed registration procedures; Amendment and correction procedures',
  soc_controls = 'Registrar certification and training; Vital record security paper and issuance controls; Electronic Death Registration System (EDRS) access controls; SSA/IRS data matching for fraud prevention; Sealed record access restrictions; Certified copy issuance tracking; Identity verification for record requests'
WHERE name = 'State/County Vital Records Registrar';

UPDATE citizen_catalog SET
  governing_guidelines = 'Confidential Information Protection and Statistical Efficiency Act (CIPSEA), 44 USC 3561-3583; Evidence Act (Foundations for Evidence-Based Policymaking Act, P.L. 115-435); OMB Statistical Policy Directives 1-4; OMB Circular A-130 (Managing Information as a Strategic Resource); Federal Committee on Statistical Methodology standards',
  standards_of_creation = 'Interagency data sharing agreement documentation; CIPSEA pledge administration for data recipients; Statistical purpose limitation verification; Evidence-building coordination across agencies; Data quality framework implementation; Pre-release access controls for economic indicators',
  soc_controls = 'CIPSEA penalties for unauthorized disclosure (up to $250K fine, 5 years imprisonment); Principal statistical agency independence protections; Embargo procedures for market-sensitive data; Data access agreement breach investigation; Annual statistical program evaluation; OMB clearance for all new surveys'
WHERE name = 'Interagency Statistical Program Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'OMB Standards and Guidelines for Statistical Surveys (2006); AAPOR Code of Professional Ethics; Federal Committee on Statistical Methodology guidelines; Paperwork Reduction Act (44 USC 3501-3521); OMB Statistical Policy Directive No. 1 (Standards)',
  standards_of_creation = 'Sample design documentation and justification; Survey instrument cognitive testing records; Response rate calculation and reporting (AAPOR definitions); Non-response bias analysis; Mode effect analysis documentation; Total survey error framework documentation',
  soc_controls = 'OMB PRA clearance before survey fielding; Institutional review board (IRB) approval for research surveys; AAPOR transparency standards for methodology; Pilot test documentation before full-scale deployment; Independent replication capability; Methodology documentation sufficient for peer review'
WHERE name = 'Survey Research Methodologist / Sample Design Statistician';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 16 (Geographic data authority); Census Bureau TIGER/Line technical documentation; Census Bureau Geographic Areas Reference Manual; OMB Metropolitan Statistical Area delineation standards; Census Bureau Boundary and Annexation Survey (BAS) procedures',
  standards_of_creation = 'TIGER/Line shapefile production and accuracy; Geographic entity boundary maintenance; Block group/tract delineation criteria; Metropolitan/micropolitan statistical area delineation; Tribal, Alaska Native, and Hawaiian areas geographic definition; Address range geocoding accuracy',
  soc_controls = 'Geographic boundary change documentation trail; Boundary and Annexation Survey certification by local officials; TIGER quality metrics and accuracy assessments; Version control for geographic database updates; Public access to geographic files; Geographic entity code assignment controls'
WHERE name = 'TIGER/MAF Geographic Database Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 9 (Information as confidential; exceptions); 13 USC 214 (Wrongful disclosure -- $5,000 fine and/or 5 years imprisonment); 13 USC 23(c) (Oath of office for census employees); Census Bureau Data Stewardship Executive Policy Committee directives; Census Bureau Title 13 training curriculum',
  standards_of_creation = 'Title 13 confidentiality oath administration for all personnel; Breach notification and response procedures; Law enforcement request denial documentation (Title 13 bars all disclosure); Subpoena response procedures (Title 13 supersedes); Contractor confidentiality agreements; Former employee continuing obligation documentation',
  soc_controls = 'Zero-tolerance disclosure policy; Criminal penalty exposure for violations (13 USC 214); Title 13 override of subpoenas, FOIA, court orders; Annual confidentiality training requirement; Incident investigation procedures; Inspector General referral for suspected violations; 72-year rule for individual record release (13 USC 8(b))'
WHERE name = 'Census Confidentiality Compliance Director';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 9 (Confidentiality protections for microdata); CIPSEA (44 USC 3561-3583); Census Bureau Special Sworn Status (SSS) program; Federal Statistical Research Data Center (FSRDC) policies; Census Bureau Microdata Access policies',
  standards_of_creation = 'Research proposal review and approval; Special Sworn Status application processing; Background investigation for data access; Disclosure avoidance review of all research outputs; Data use agreement execution and monitoring; RDC access log maintenance',
  soc_controls = 'Title 13 sworn status as condition of access; Secure physical facility requirements for RDCs; No data removal from secure environment; Output review by Census Bureau staff before release; Project scope limitation enforcement; Access revocation procedures; Annual compliance certification'
WHERE name = 'Research Data Center (RDC) Access Administrator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Census Bureau Count Question Resolution (CQR) program; Census Bureau Population Estimates Challenge program; 13 USC 181 (Estimates authority); OMB guidance on census data corrections; Census Bureau Quality Assurance procedures for challenges',
  standards_of_creation = 'Challenge submission requirements and evidence standards; Geographic boundary verification; Group quarters count verification; Housing unit count challenge processing; Population estimate revision criteria; Challenge determination notification',
  soc_controls = 'Formal challenge filing period; Evidence evaluation criteria documentation; Independent review of challenge determinations; Notification to affected governmental units; No revision of decennial census counts (estimates only); Appeal procedures documentation'
WHERE name = 'Census Count Challenge Program Administrator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Inspector General Act of 1978 (5 USC App.); 13 USC 4 (Secretary of Commerce authority -- delegated to Census Bureau); GAO Government Auditing Standards (Yellow Book); Single Audit Act (31 USC 7501-7507); DOC OIG Audit Guide for Census Operations',
  standards_of_creation = 'Census operation audit planning and execution; Internal control assessment documentation; Fraud, waste, and abuse investigation; Decennial census cost estimation audit; IT system security audit; Contractor performance audit',
  soc_controls = 'IG statutory independence; Audit finding tracking and remediation verification; Management response requirements (60 days); Congressional reporting of significant findings; Hotline for census employee complaints; Whistleblower protection enforcement'
WHERE name = 'OIG Census Program Auditor / IG Liaison';

UPDATE citizen_catalog SET
  governing_guidelines = 'FOIA (5 USC 552) -- as modified by Title 13 exemptions; Privacy Act of 1974 (5 USC 552a); 13 USC 9 (Title 13 override of FOIA for census microdata); OMB Circular A-130 (Privacy Act implementation); Census Bureau System of Records Notices (SORNs); 13 USC 8(b) (72-year rule for individual records)',
  standards_of_creation = 'FOIA request processing with Title 13 exemption application; Privacy Act access and amendment request handling; System of Records Notice maintenance; Privacy Impact Assessment (PIA) completion; 72-year historical records release procedures; Age search service for individual records',
  soc_controls = 'Title 13 exemption applied to all identifiable data FOIA requests; FOIA response timeline compliance (20 business days); Privacy Act accounting of disclosures; PIA publication for new data systems; SORN publication in Federal Register; Annual FOIA report to Attorney General'
WHERE name = 'Census Bureau FOIA/Privacy Act Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 8(b) (Data sharing with designated agencies); Census Bureau Special Tabulation Program policies; Equal Employment Opportunity (EEO) tabulation requirements; Census Transportation Planning Products (CTPP) program; School district tabulation programs; CIPSEA data sharing provisions',
  standards_of_creation = 'Custom tabulation specification documentation; Disclosure avoidance application for custom products; Cost reimbursement agreement execution; Data product quality review before delivery; Geographic customization accuracy; Timeliness of delivery per agreement',
  soc_controls = 'Disclosure Review Board approval for all custom products; Cost recovery documentation; Client confidentiality agreement; Product specification sign-off; Quality assurance review chain; Version control for custom data products'
WHERE name = 'Custom Tabulation / Special Census Products Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 182 (Joint project authority); 29 USC 2 (BLS data collection authority); CPS Technical Paper 66 (Design and methodology); OMB PRA clearance for CPS; Interagency agreement between Census Bureau and BLS',
  standards_of_creation = 'Monthly sample rotation scheme (4-8-4 design) administration; Computer-Assisted Personal/Telephone Interview (CAPI/CATI) quality standards; Supplement questionnaire administration (voting, health, school enrollment); Response rate monitoring and non-response adjustment; Labor force classification accuracy; Monthly processing timeline for employment data',
  soc_controls = 'Joint Census/BLS operational oversight; Pre-release data embargo (market-sensitive employment data); Principal Federal Economic Indicator procedures; Interviewer falsification detection; Quality assurance reinterview program; Supplement sponsor agency coordination'
WHERE name = 'CPS Field Operations Director';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 131 (Census of manufactures); 13 USC 191 (Census of governments); 13 USC 224 (Failure to answer -- penalties for businesses); North American Industry Classification System (NAICS); OMB PRA clearance for economic census forms; Census Bureau Economic Census program guidelines',
  standards_of_creation = 'Business establishment classification by NAICS code; Quinquennial census form design and distribution; Business register (BR) maintenance and update; Revenue, payroll, and employment data collection; Non-response follow-up procedures for businesses; Industry-specific supplement administration',
  soc_controls = 'Title 13 confidentiality for business data; Mandatory response with penalty provisions (13 USC 224); Disclosure avoidance for business data (dominance rules); Pre-release data embargo procedures; Interagency coordination (IRS, SSA, BLS); Quality assurance for industry classification'
WHERE name = 'Economic Census Operations Manager';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 161 (Quinquennial census of governments); 13 USC 163 (Collection of government financial data); Census Bureau Census of Governments methodology; Government Finance Statistics manual; Annual Survey of Public Employment and Payroll methodology',
  standards_of_creation = 'Government unit identification and classification; Revenue and expenditure categorization; Public employment and payroll data collection; Special district and independent authority enumeration; Government organization structure documentation; State/local finance data standardization',
  soc_controls = 'Government unit list verification with state agencies; Response validation against budget documents; Cross-reference with bond rating agencies; Data quality review with state auditors; Annual survey integration with quinquennial census'
WHERE name = 'Government Organization / Finance / Employment Census Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = '42 USC 242k (National Center for Health Statistics authority); NCHS confidentiality provisions (Section 308(d) of the Public Health Service Act); National Health Interview Survey (NHIS) methodology; National Health and Nutrition Examination Survey (NHANES) protocols; OMB Standards for Race/Ethnicity data collection',
  standards_of_creation = 'Survey design and sample selection documentation; Health indicator data quality standards; Demographic cross-tabulation methodology; Data linkage protocols (NHIS-mortality, NHANES-lab results); Health disparity measurement methodology; Trend analysis documentation',
  soc_controls = 'Section 308(d) confidentiality protections; IRB approval for all survey modifications; Informed consent procedures for NHANES examinations; Restricted-use data access agreements; Publication review for identifiability; Peer review of methodology changes'
WHERE name = 'National Health Survey Data Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'Evidence Act (P.L. 115-435) -- evidence-building provisions; CIPSEA (data access for research); Census Bureau Research Data Center policies; Federal Data Strategy (2020-2024 action plan); Interagency data sharing frameworks',
  standards_of_creation = 'Linked administrative records methodology documentation; Machine learning model validation for demographic estimation; Synthetic data product development; Small area estimation methodology; Data linkage quality assessment; Research reproducibility documentation',
  soc_controls = 'Special Sworn Status for researcher access; Disclosure review for all research outputs; Secure computing environment requirements; Research project scope limitation; Code and methodology archival; Peer review before publication'
WHERE name = 'Demographic Data Scientist / Computational Demographer';

UPDATE citizen_catalog SET
  governing_guidelines = '22 USC 2151 (Foreign Assistance Act); Census Bureau International Programs mandate; United Nations Principles and Recommendations for Population and Housing Censuses; Demographic and Health Surveys (DHS) methodology; International statistical cooperation agreements',
  standards_of_creation = 'International demographic database (IDB) maintenance; Technical assistance documentation for foreign census bureaus; HIV/AIDS demographic impact estimation; International population projection methodology; DHS survey design and implementation support; Global demographic indicator standardization',
  soc_controls = 'Country-specific data sharing agreements; Methodology transparency for international comparisons; Data source documentation and quality assessment; Publication review for political sensitivity; Collaboration agreements with national statistical offices'
WHERE name = 'International Programs Demographer';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 141 (Census of Indian country); Tribal consultation requirements (Executive Order 13175); Census Bureau Tribal Consultation Policy; American Indian and Alaska Native areas geographic definition; Census Bureau New Construction Program (tribal components); Indian Self-Determination Act considerations',
  standards_of_creation = 'Government-to-government consultation documentation; Tribal liaison officer designation; On-reservation address canvassing coordination; Tribal enrollment data sharing agreements (where authorized); American Indian/Alaska Native area geographic boundary updates; Tribal Complete Count Committee support',
  soc_controls = 'Tribal sovereignty respect in consultation process; Tribal data sovereignty considerations; Consultation meeting records and follow-up; Cultural protocol compliance; Tribal review of data products before release (where agreed); Dual enrollment deduplication'
WHERE name = 'Census Tribal Affairs Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 9 (Confidentiality requirements for microdata release); Census Bureau PUMS Data User Agreement; Census Bureau Disclosure Avoidance for PUMS; OMB Statistical Policy Directive No. 4 (Data dissemination); Public Use Microdata Area (PUMA) delineation standards',
  standards_of_creation = 'PUMA geographic area delineation (100,000+ population threshold); Variable coding and value suppression for public use; Top-coding and bottom-coding of extreme values; Household and person record linkage in public files; Data dictionary and documentation completeness; Quality verification against internal tabulations',
  soc_controls = 'Disclosure Review Board approval before release; Re-identification risk testing; Geographic threshold enforcement (no sub-PUMA geography); Age/income/value topcoding verification; Version control and errata procedures; User support and FAQ documentation'
WHERE name = 'PUMS Product Development Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'Title VII of the Civil Rights Act (42 USC 2000e); Census Bureau EEO Tabulation program; EEOC data collection authority; Executive Order 11246 (Equal employment opportunity); OMB Race and Ethnicity Standards (SPD 15)',
  standards_of_creation = 'EEO tabulation production by occupation, race, sex, geography; Labor force participation data for civil rights enforcement; Occupational classification mapping (SOC codes); Geographic area tabulation at appropriate jurisdictional levels; Data quality metrics for EEO tabulations',
  soc_controls = 'Disclosure avoidance for EEO tabulations; Authorized use limitation for civil rights enforcement; Data access agreement requirements; Methodology documentation for legal proceedings; Peer review of tabulation methodology'
WHERE name = 'EEO Tabulation Data Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'FSCPE agreement requirements; Census Bureau State Data Center (SDC) program; State statutory requirements for population estimates; Census Bureau Population Estimates methodology; State-specific demographic data production laws',
  standards_of_creation = 'Sub-state population estimate production; State-level demographic data dissemination; Census data training and technical assistance; Population projection methodology for state planning; Data center network coordination; Census Bureau data product distribution',
  soc_controls = 'FSCPE participation agreement compliance; State Data Center lead agency designation; Data user training documentation; Estimate methodology transparency; Challenge coordination between local governments and Census Bureau; Annual estimate review and revision'
WHERE name = 'State Demographer / State Data Center Director';

UPDATE citizen_catalog SET
  governing_guidelines = 'Census Bureau Complete Count Committee Guide; Local government resolution establishing CCC; Census Bureau Outreach toolkit; Section 203 VRA (language access requirements for outreach)',
  standards_of_creation = 'CCC charter and membership roster; Community outreach plan development; Hard-to-count population identification and targeting; Questionnaire assistance center establishment; Self-response rate monitoring and targeted outreach; Community partnership documentation',
  soc_controls = 'Non-partisan committee operations; No access to individual census responses; Budget tracking for outreach activities; Cultural competency requirements for outreach; Accessibility compliance for events; Post-census evaluation report'
WHERE name = 'Complete Count Committee (CCC) Chair / Census Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Census Bureau School District Review Program; Cal. EDC 17000-17077 (School facilities planning); Census Bureau Small Area Income and Poverty Estimates (SAIPE); Title I allocation methodology (20 USC 6333); NCES Common Core of Data standards',
  standards_of_creation = 'School district boundary verification for census; Enrollment projection methodology documentation; Title I eligibility data review; Facilities planning demographic analysis; School attendance area demographic profiling; Special education population estimation',
  soc_controls = 'Census Bureau verification of school district boundaries; State education department data cross-reference; Enrollment projection methodology peer review; FERPA compliance for student data (20 USC 1232g); Public presentation of planning data; Annual update and revision cycle'
WHERE name = 'School Enrollment Demographer / Facilities Planning Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = '23 USC 134 (Metropolitan transportation planning); Census Bureau Census Transportation Planning Products (CTPP); AASHTO demographic data standards; OMB Metropolitan Statistical Area delineation; Environmental justice (EO 12898) demographic analysis',
  standards_of_creation = 'Traffic analysis zone (TAZ) demographic tabulation; Commuting flow data analysis (CTPP workplace tables); Environmental justice population identification; Travel demand model demographic inputs; Long-range transportation plan demographic assumptions; Socioeconomic forecast methodology',
  soc_controls = 'CTPP data use agreement; TAZ geographic specification accuracy; Forecast methodology transparency; Environmental justice analysis peer review; Public participation process documentation; Federal certification review compliance'
WHERE name = 'Transportation/Land Use Demographic Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = '42 USC 1437 (United States Housing Act); HUD Area Median Income (AMI) methodology; HUD Consolidated Plan demographic requirements; Fair Housing Act demographic analysis (42 USC 3601-3619); Affirmatively Furthering Fair Housing (AFFH) requirements',
  standards_of_creation = 'Area Median Income calculation and application; Fair housing demographic analysis (AFFH assessment); Consolidated Plan needs assessment demographics; Waiting list demographic profiling; Racial/ethnic concentration analysis; Disability population housing needs assessment',
  soc_controls = 'HUD data source verification; Census/ACS data application methodology; Fair housing analysis independence; Public comment period for demographic assessments; Civil rights review of demographic conclusions; Annual reassessment cycle'
WHERE name = 'Public Housing/HUD Demographic Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Indian Reorganization Act (25 USC 5123); Tribal constitution and enrollment ordinance; BIA enrollment records maintenance; Indian Civil Rights Act (25 USC 1301-1304); Santa Clara Pueblo v. Martinez, 436 U.S. 49 (1978) -- Tribal enrollment sovereignty',
  standards_of_creation = 'Enrollment application processing; Blood quantum calculation and documentation; Lineage verification through genealogical records; Membership roll maintenance and update; Disenrollment procedures and due process; Certificate of Indian Blood (CIB) issuance',
  soc_controls = 'Tribal sovereignty over enrollment criteria; Due process in enrollment/disenrollment decisions; Genealogical records security; BIA coordination for federal recognition purposes; Enrollment committee/board independence; Appeal procedures documentation'
WHERE name = 'Tribal Enrollment Officer / Blood Quantum Records Manager';

UPDATE citizen_catalog SET
  governing_guidelines = '42 USC 242k (NCHS/CDC data authority); Cal. HSC 120125 (Disease reporting); Census Bureau demographic data for rate calculations; CDC/ATSDR Social Vulnerability Index (SVI); HIPAA Privacy Rule (45 CFR 164) -- de-identification standards',
  standards_of_creation = 'Population denominator calculation from census/ACS data; Age-adjusted rate methodology; Social Vulnerability Index application; Health disparity quantification by demographic group; Small area health estimation; Syndromic surveillance data demographic linkage',
  soc_controls = 'HIPAA de-identification standards (Safe Harbor or Expert Determination); IRB approval for research use of demographic-health linked data; Census data citation standards; Rate suppression for small numbers; Data sharing agreement compliance; Peer review of methodology'
WHERE name = 'Demographic Epidemiologist / Population Health Data Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 221 (Refusal or neglect to answer -- up to $100 fine); 13 USC 222 (Giving false information -- up to $500 fine); 13 USC 224 (Failure of business to report -- up to $500 fine per occurrence); 18 USC 3559 (Sentencing classification); Census Bureau Non-Response procedures',
  standards_of_creation = 'Non-response escalation documentation; Penalty notification procedures; Referral criteria for U.S. Attorney prosecution; Business non-compliance tracking; Voluntary compliance encouragement before penalty; Penalty assessment documentation',
  soc_controls = 'Graduated escalation procedures; Written notification requirements; Due process in penalty assessment; U.S. Attorney prosecution discretion coordination; Record of all penalty actions; Penalty waiver/reduction criteria'
WHERE name = 'Census Non-Response Enforcement Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Robert T. Stafford Disaster Relief and Emergency Assistance Act (42 USC 5121-5207); 44 CFR Part 206 (Federal disaster assistance); 44 CFR 206.36 (Requests for emergency declarations); 44 CFR 206.35-206.39 (Requests for major disaster declarations); FEMA Preliminary Damage Assessment Guide; Presidential declaration threshold criteria',
  standards_of_creation = 'Preliminary damage assessment joint field documentation; Governor''s request letter requirements; Per capita damage threshold calculation; Individual Assistance (IA) and Public Assistance (PA) designation criteria; Hazard Mitigation Grant Program (HMGP) activation documentation; Amendment and extension request processing',
  soc_controls = 'Joint federal/state/local PDA teams; Governor certification of state resource exhaustion; Presidential decision memorandum documentation; FEMA-State Agreement execution; Federal Coordinating Officer appointment documentation; Congressional notification requirements'
WHERE name = 'FEMA Preliminary Damage Assessment (PDA) Coordinator / Declaration Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'Stafford Act Section 408 (42 USC 5174) -- Federal assistance to individuals and households; 44 CFR 206.101-206.120 (Individual assistance provisions); FEMA Individual Assistance Program and Policy Guide (IAPPG); FEMA Individuals and Households Program (IHP) policies; FEMA National Processing Service Center procedures',
  standards_of_creation = 'Disaster survivor registration and intake documentation; Housing inspection report standards; Rental assistance and repair assistance eligibility determination; Other Needs Assistance (ONA) application processing; Duplication of Benefits (DOB) verification; Appeal processing and adjudication',
  soc_controls = 'Identity verification for applicants; Property ownership/occupancy verification; Insurance verification before federal assistance; DOB check against SBA, insurance, and voluntary organizations; Recoupment procedures for improper payments; Inspector General fraud referral protocols; Appeal rights notification at every denial'
WHERE name = 'FEMA IA Case Manager / Housing Assistance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Stafford Act Sections 403, 406, 407 (42 USC 5170b, 5172, 5173); 44 CFR Part 206 Subparts G-I (Public assistance); FEMA Public Assistance Program and Policy Guide (PAPPG); 2 CFR Part 200 (Uniform Administrative Requirements -- grant management); FEMA PA Alternative Procedures Guide (Section 428)',
  standards_of_creation = 'Applicant briefing documentation; Project worksheet (PW) development and documentation; Emergency work (Category A-B) vs. permanent work (Category C-G) classification; Cost estimation and validation methodology; Environmental and historic preservation (EHP) review; Hazard mitigation 406 proposal documentation; Time extension and appeal processing',
  soc_controls = 'Applicant eligibility determination (state/local gov, tribal, certain PNPs); Cost share documentation (typically 75% federal / 25% non-federal); Insurance deduction verification; Procurement standards compliance (2 CFR 200.318-326); Project closeout and final inspection; Single Audit requirements for recipients; De-obligation procedures for uncompleted work'
WHERE name = 'FEMA PA Project Specialist / Grants Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'Stafford Act Section 404 (42 USC 5170c) -- Hazard mitigation; Stafford Act Section 322 (42 USC 5165) -- Mitigation planning; 44 CFR Part 201 (Mitigation planning); 44 CFR Part 206 Subpart N (Hazard mitigation grant program); FEMA Hazard Mitigation Assistance Guidance; FEMA Benefit-Cost Analysis (BCA) toolkit',
  standards_of_creation = 'Hazard mitigation plan development and FEMA approval; HMGP application review and scoring; Benefit-cost analysis preparation and validation; Environmental and historic preservation compliance; Property acquisition/demolition procedures; Elevation project specifications; Mitigation plan 5-year update cycle',
  soc_controls = 'HMGP funding cap (15% of total disaster grant expenditures); Cost-effectiveness requirement (BCR > 1.0); NEPA compliance documentation; Section 106 historic preservation review; Floodplain management (EO 11988) compliance; Duplication of Programs (DOP) check; Quarterly progress reporting'
WHERE name = 'FEMA Hazard Mitigation Grant Program (HMGP) Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'National Flood Insurance Act (42 USC 4001-4131); 44 CFR Parts 59-78 (NFIP regulations); 44 CFR Part 61 (Insurance coverage and rates); 44 CFR Part 65 (Flood map identification and revisions); NFIP Flood Insurance Manual; Biggert-Waters Flood Insurance Reform Act of 2012; Homeowner Flood Insurance Affordability Act of 2014',
  standards_of_creation = 'Flood Insurance Rate Map (FIRM) interpretation; Policy issuance and rating accuracy; Claims adjustment procedures and documentation; Increased Cost of Compliance (ICC) claim processing; Community Rating System (CRS) audit documentation; Substantial damage/improvement determination; Elevation Certificate (FEMA Form 086-0-33) verification',
  soc_controls = 'Write Your Own (WYO) insurer oversight; Claims adjuster licensing and certification; Proof of loss filing deadline enforcement (60 days); Flood Insurance Advocate function; Appeals and litigation procedures; Annual NFIP financial reporting; Community compliance monitoring'
WHERE name = 'NFIP Floodplain Management Specialist / NFIP Claims Adjuster';

UPDATE citizen_catalog SET
  governing_guidelines = '44 CFR 59.22 (Community floodplain management participation); 44 CFR 60.3 (Flood-resistant construction standards); 44 CFR Part 65 (Map revisions); EO 11988 (Floodplain Management); EO 13690 (Federal Flood Risk Management Standard); Local floodplain management ordinance',
  standards_of_creation = 'Floodplain development permit review; Base Flood Elevation (BFE) compliance verification; Substantial improvement/damage determination; Letter of Map Amendment (LOMA) / Letter of Map Revision (LOMR) applications; Community Assistance Visit (CAV) preparation; Higher regulatory standards implementation',
  soc_controls = 'Certified Floodplain Manager (CFM) credential; Building permit review for floodplain compliance; Community probation/suspension procedures for non-compliance; Annual compliance reporting; Variance documentation and FEMA notification; Records retention for all floodplain actions'
WHERE name = 'Local Floodplain Manager / NFIP Community Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Small Business Act Section 7(b) (15 USC 636(b)) -- Disaster loan authority; 13 CFR Part 123 (Disaster loan program); SBA Standard Operating Procedure 50-30 (Disaster loans); Stafford Act coordination provisions; SBA Disaster Loan Program Handbook',
  standards_of_creation = 'Disaster loan application processing (Home, Business, EIDL); Loss verification inspection documentation; Credit worthiness assessment; Loan amount determination methodology; Collateral requirements documentation; Duplication of Benefits coordination with FEMA',
  soc_controls = 'Application deadline compliance (60 days from declaration for physical, 9 months for EIDL); Independent loss verification; Credit analysis standards; Loan closing documentation requirements; Disbursement monitoring; Default and forgiveness procedures; OIG fraud referral protocols'
WHERE name = 'SBA Disaster Loan Specialist / Loss Verifier';

UPDATE citizen_catalog SET
  governing_guidelines = 'Stafford Act Section 411 (42 USC 5178) -- DRC provisions; FEMA DRC Standard Operating Procedures; FEMA Disaster Survivor Assistance (DSA) Team guidelines; ADA Title II (DRC accessibility requirements); FEMA Language Access Plan',
  standards_of_creation = 'DRC site selection and establishment documentation; Multi-agency service coordination records; Survivor registration and assistance tracking; Daily operations reports; Staffing and volunteer coordination; Accessibility compliance verification; DRC closure criteria and notification',
  soc_controls = 'Multi-agency staffing coordination; Survivor PII protection at DRC; Accessibility compliance (ADA, language access); Daily survivor count and service tracking; Safety and security protocols; Inter-agency deconfliction procedures; Post-operation evaluation'
WHERE name = 'DRC Site Manager / Disaster Survivor Assistance Team Lead';

UPDATE citizen_catalog SET
  governing_guidelines = 'National Environmental Policy Act (NEPA) (42 USC 4321-4347); National Historic Preservation Act Section 106 (54 USC 306108); Endangered Species Act Section 7 (16 USC 1536); EO 11988 (Floodplain Management); EO 11990 (Protection of Wetlands); 44 CFR Part 10 (Environmental considerations); FEMA EHP NEPA procedures',
  standards_of_creation = 'Categorical exclusion documentation; Environmental Assessment (EA) preparation; Finding of No Significant Impact (FONSI) determination; Section 106 consultation with SHPO/THPO; Endangered species consultation with USFWS; Floodplain/wetland assessment; Tribal consultation for cultural resources',
  soc_controls = 'EHP review required before FEMA funding obligation; SHPO/THPO concurrence documentation; Public notice requirements for floodplain actions; Environmental condition documentation and mitigation; EHP record retention with project files; Programmatic agreement compliance for repetitive actions'
WHERE name = 'EHP Compliance Specialist / NEPA Reviewer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Inspector General Act of 1978 (5 USC App.); 18 USC 1001 (False statements); 18 USC 287 (False claims); 31 USC 3729-3733 (False Claims Act); Stafford Act Section 312 (42 USC 5155) -- Duplication of benefits; FEMA Fraud Prevention and Investigation standards',
  standards_of_creation = 'Fraud allegation intake and prioritization; Investigation case file documentation; Financial forensic analysis methodology; Identity theft detection in disaster claims; Duplication of benefits analysis; Prosecution referral preparation',
  soc_controls = 'NCDF hotline (866-720-5721) operation; Joint law enforcement task force coordination; Qui tam/whistleblower protection; Case management system documentation; Evidence chain of custody; Grand jury coordination; Asset forfeiture proceedings'
WHERE name = 'DHS OIG Disaster Fraud Investigator';

UPDATE citizen_catalog SET
  governing_guidelines = 'NIMS (National Incident Management System) doctrine; ICS (Incident Command System) -- FEMA IS-100, IS-200, IS-300, IS-400; 44 CFR Part 206 Subpart D (Federal assistance to individuals and households); Cal. Gov. Code 8607 (SEMS -- Standardized Emergency Management System); Homeland Security Presidential Directive 5 (HSPD-5); Cal. Gov. Code 8668 (Local emergency powers)',
  standards_of_creation = 'ICS Form 201 (Incident Briefing); ICS Form 202 (Incident Objectives); ICS Form 203 (Organization Assignment List); ICS Form 205 (Incident Radio Communications Plan); ICS Form 209 (Incident Status Summary); ICS Form 214 (Activity Log); Incident Action Plan (IAP) development and approval; Unified Command integration documentation',
  soc_controls = 'Clear chain of command documentation; Span of control (3-7 subordinates); Transfer of command briefing and documentation; Delegation of authority; Incident within an incident documentation; After Action Report (AAR) requirement; NIMS compliance certification'
WHERE name = 'Incident Commander / Unified Command Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Gov. Code 8585 (Office of Emergency Services); Cal. Gov. Code 8607 (SEMS requirements); NIMS EOC/Multi-Agency Coordination System (MACS) doctrine; FEMA EOC Operations Manual; Cal. Gov. Code 8630 (Local emergency proclamation); FEMA IS-775 (EOC Management and Operations)',
  standards_of_creation = 'EOC activation level documentation; Multi-agency coordination group (MAC) records; Resource request and tracking documentation; Situation status displays and reports; EOC staffing and roster management; Information management and common operating picture; Demobilization documentation',
  soc_controls = 'Activation authority and notification procedures; Position credentialing and training verification; Communication redundancy requirements; Operational period planning cycle; Resource tracking system integrity; Interoperability with ICS field operations; AAR and Improvement Plan development'
WHERE name = 'EOC Director / Emergency Operations Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Gov. Code 8610-8614 (Emergency organization -- counties/cities); Cal. Gov. Code 8630-8634 (Local emergencies); Robert T. Stafford Act (42 USC 5121+); FEMA Emergency Management Performance Grant (EMPG) requirements; Cal. Gov. Code 8588 (Mutual aid system); EMAP (Emergency Management Accreditation Program) standards',
  standards_of_creation = 'Emergency Operations Plan (EOP) development and maintenance; Multi-year training and exercise plan; Continuity of Operations Plan (COOP) development; Community hazard/risk assessment; Mutual aid agreement development; EMPG grant performance reporting; Emergency proclamation and termination',
  soc_controls = 'EMAP accreditation maintenance; Annual EOP review and update; Exercise schedule compliance (HSEEP standards); EMPG reporting and financial accountability; Elected official briefing documentation; Multi-jurisdictional coordination records; Public information officer coordination'
WHERE name = 'Local/County Emergency Manager / OES Director';

UPDATE citizen_catalog SET
  governing_guidelines = 'NIMS ICS Planning Section doctrine; ICS Form 202 (Incident Objectives); ICS Form 204 (Assignment List); ICS Form 206 (Medical Plan); ICS Form 209 (Incident Status Summary); FEMA IS-300/400 (Intermediate/Advanced ICS)',
  standards_of_creation = 'Incident Action Plan compilation and distribution; Situation report production cycle; Resource status tracking (ICS Form 210, 211); Demobilization plan development; Technical specialist coordination; Documentation Unit records management; GIS/mapping product development',
  soc_controls = 'Planning meeting facilitation and documentation; Operational period transition management; Resource status accuracy verification; Historical documentation preservation; After-action data collection; Information security for sensitive incidents'
WHERE name = 'Planning Section Chief / Situation Unit Leader';

UPDATE citizen_catalog SET
  governing_guidelines = 'NIMS ICS Finance/Admin Section doctrine; 2 CFR Part 200 (Uniform guidance for federal awards); 44 CFR Part 206 (FEMA reimbursement requirements); ICS Form 213 (General Message -- for resource orders); ICS Form 214 (Activity Log); State/local procurement and fiscal policies; FEMA PA cost documentation requirements',
  standards_of_creation = 'Time Unit records (personnel time, equipment time); Procurement Unit documentation (emergency contracts, mutual aid); Compensation/Claims Unit records (injury, damage claims); Cost Unit tracking and projections; Force account labor documentation; Equipment use documentation (FEMA equipment rates); Invoice and payment documentation',
  soc_controls = 'Fiscal authority delegation documentation; Emergency procurement threshold compliance; Time keeping accuracy verification; Claims investigation and settlement authority; Cost recovery tracking (responsible party billing); Audit trail maintenance for all financial transactions; Grant closeout financial documentation'
WHERE name = 'Finance/Administration Section Chief / Cost Unit Leader';

UPDATE citizen_catalog SET
  governing_guidelines = 'NIMS ICS Logistics Section doctrine; FEMA National Logistics System (NLS) framework; ICS Form 205A (Communications List); ICS Form 213 (General Message); Cal. Gov. Code 8588 (Mutual aid coordination); FEMA IS-300/400',
  standards_of_creation = 'Resource ordering and tracking documentation; Base/camp establishment records; Communications plan development (ICS Form 205); Medical plan documentation (ICS Form 206); Ground support/transportation records; Supply unit inventory management; Facility security and maintenance records',
  soc_controls = 'Resource ordering authority controls; Inventory reconciliation procedures; Communications interoperability verification; Facility safety inspections; Medical unit capability documentation; Demobilization resource tracking; Cost accountability for all resources ordered'
WHERE name = 'Logistics Section Chief / Supply Unit Leader';

UPDATE citizen_catalog SET
  governing_guidelines = 'NIMS ICS Safety Officer doctrine; ICS Form 208 (Safety Message/Plan); 29 CFR 1910.120 (HAZWOPER); 29 CFR 1926 (Construction safety -- disaster recovery); NFPA 1500 (Standard on Fire Department Occupational Safety); FEMA IS-300/400',
  standards_of_creation = 'Site Safety Plan (ICS Form 208) development; Hazard identification and risk assessment documentation; Safety briefing documentation; Accident/injury investigation reports; Personal protective equipment (PPE) requirements; Exposure monitoring and documentation; Corrective action tracking',
  soc_controls = 'Authority to stop unsafe operations; Hazard reporting and tracking system; Accident investigation within 24 hours; Safety message inclusion in every IAP; Exposure record maintenance (per OSHA recordkeeping); Workers'' compensation coordination; Risk management documentation'
WHERE name = 'Incident Safety Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'NIMS Public Information doctrine; FEMA IS-702 (NIMS Public Information Systems); Joint Information System (JIS) / JIC establishment guidelines; FCC Wireless Emergency Alert (WEA) procedures (47 CFR Part 10); Emergency Alert System (EAS) requirements (47 CFR Part 11); Cal. Gov. Code 8593.7 (Emergency alert system)',
  standards_of_creation = 'Press release accuracy and timing; Social media messaging coordination; JIC activation and staffing documentation; Rumor control documentation; Media briefing scheduling and records; Public warning dissemination records; WEA/EAS message content and authorization',
  soc_controls = 'Message approval chain (IC authorization); Consistent messaging across agencies (JIS); Media inquiry tracking and response; Public information monitoring and correction; Social media policy compliance; Accessibility of public information (ADA, language access); Records retention for all public communications'
WHERE name = 'Emergency Public Information Officer / Joint Information Center (JIC) Manager';

UPDATE citizen_catalog SET
  governing_guidelines = '47 CFR Part 97 (Amateur radio service -- RACES provisions); 47 CFR 97.407 (RACES operations); FEMA Auxiliary Communications (AuxComm) guidelines; Cal. Gov. Code 8590 (Emergency communications); ARRL ARES/RACES Manual; FEMA IS-700 (NIMS introduction)',
  standards_of_creation = 'RACES/ARES volunteer registration and credentialing; Communications plan integration with ICS Form 205; Message handling procedures (radiogram format); Equipment inventory and readiness documentation; Frequency coordination and authorization; Training and exercise participation records; Activation/deactivation procedures',
  soc_controls = 'FCC license verification for all operators; Government authorization for RACES activation; Message log maintenance; Equipment maintenance and testing records; ICS integration and reporting chain; Background check for volunteer access; Exercise participation minimums'
WHERE name = 'Auxiliary Communications (AuxComm) Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Gov. Code 8550-8668 (Emergency services); Cal. Gov. Code 8561 (Master Mutual Aid Agreement); Emergency Management Assistance Compact (EMAC) (Cal. Gov. Code 179); Cal. Gov. Code 8616 (Mutual aid provision); FEMA National Mutual Aid and Resource Management System; NIMS Resource Typing standards',
  standards_of_creation = 'Mutual aid agreement execution and maintenance; Resource typing and credentialing per NIMS standards; Mutual aid request and deployment documentation; EMAC interstate mutual aid request processing; Resource tracking during deployment; Reimbursement documentation; After-deployment evaluation',
  soc_controls = 'Formal mutual aid agreement requirement before deployment; Resource request through proper channels (OES coordination); Liability and workers'' compensation coverage documentation; Deployment order/authorization records; Resource demobilization procedures; Cost reimbursement claim filing; Multi-year agreement renewal tracking'
WHERE name = 'Fire/Law/EMS Mutual Aid Coordinator / Regional Mutual Aid Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'FEMA Comprehensive Preparedness Guide (CPG) 101 -- Developing and Maintaining Emergency Operations Plans; Cal. Gov. Code 8610 (Emergency plan requirements); HSPD-8 (National Preparedness); Presidential Policy Directive 8 (PPD-8) -- National Preparedness; EMAP Standard 4.4 (Emergency Operations Plans); SEMS regulations (19 CCR 2400-2450)',
  standards_of_creation = 'Basic plan with concept of operations; Functional/support annexes (ESF structure); Hazard-specific appendices; Roles and responsibilities matrix; Resource management procedures; Plan review and revision schedule; Public review and adoption documentation',
  soc_controls = 'Multi-agency plan development committee; Plan adoption by governing body; Annual review and update documentation; Exercise validation of plan elements; Distribution list and version control; Classified annex handling (if applicable); Plan accessibility (ADA compliance for public version)'
WHERE name = 'Emergency Planner / EOP Program Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'Federal Continuity Directive 1 (FCD-1) -- Federal Executive Branch COOP; Federal Continuity Directive 2 (FCD-2) -- Federal Mission Essential Functions; FEMA Continuity Guidance Circular (CGC); PPD-40 (National Continuity Policy); Cal. Gov. Code 8607 (SEMS COOP requirements)',
  standards_of_creation = 'Mission Essential Function (MEF) identification and prioritization; Orders of succession documentation; Delegations of authority; Alternate facility identification and readiness; Vital records identification and protection; Devolution planning; Reconstitution procedures; COOP plan testing and exercise',
  soc_controls = 'Annual COOP plan review and certification; Succession order notification and acceptance; Alternate facility readiness verification; Vital records backup and recovery testing; COOP activation decision authority; Employee notification system testing; Multi-year exercise schedule'
WHERE name = 'COOP Program Manager / Continuity Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Stafford Act Section 322 (42 USC 5165) -- Mitigation planning; 44 CFR Part 201 (Mitigation planning requirements); FEMA Hazard Mitigation Planning guidance; Cal. Gov. Code 65302(g)(4) (Safety element -- hazard mitigation); FEMA Local Mitigation Plan Review Guide; FEMA Threat and Hazard Identification and Risk Assessment (THIRA) guide',
  standards_of_creation = 'Multi-jurisdictional hazard mitigation plan development; Risk assessment methodology (probability x consequence); Vulnerability analysis by hazard type; Mitigation strategy identification and prioritization; Capability assessment; Plan maintenance and monitoring procedures; FEMA plan review crosswalk completion; 5-year update cycle compliance',
  soc_controls = 'FEMA approval required for HMGP eligibility; Public participation process documentation; Multi-jurisdictional coordination records; Annual progress reporting; Plan adoption by each participating jurisdiction; Consistency with comprehensive/general plan; State plan integration'
WHERE name = 'Hazard Mitigation Planner / Risk Assessment Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'FEMA CERT Basic Training curriculum; FEMA Citizen Corps program guidelines; Cal. Gov. Code 8610.5 (Volunteers in emergency services); Good Samaritan protections (Cal. HSC 1799.102); FEMA IS-317 (Introduction to CERT); Volunteer Protection Act (42 USC 14501-14505)',
  standards_of_creation = 'CERT training delivery per FEMA curriculum; Training completion and certification records; Team activation and deployment documentation; Equipment inventory and maintenance records; Exercise participation records; Volunteer management database maintenance; Annual training requirements',
  soc_controls = 'Background checks for CERT members; Liability coverage documentation (volunteer protection); Equipment safety inspections; Activation authority (credentialed EOC official only); After-action review for all activations; Skill currency maintenance requirements; Volunteer recognition and retention tracking'
WHERE name = 'CERT Coordinator / Citizen Corps Program Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSEEP Doctrine (2020 revision); DHS Exercise and Evaluation Program Manual; PPD-8 National Exercise Program; Cal. Gov. Code 8607 (SEMS exercise requirements); EMAP Standard 4.8 (Exercises); FEMA Homeland Security Exercise and Evaluation Program',
  standards_of_creation = 'Multi-year Training and Exercise Plan (TEP) development; Exercise design documentation (ExPlan, MSEL, C/E Guide); Tabletop, functional, and full-scale exercise execution; Exercise evaluation methodology; After Action Report / Improvement Plan (AAR/IP) development; Corrective action tracking to completion; National Exercise Program participation',
  soc_controls = 'Exercise objectives tied to capability gaps; Player/evaluator/controller role separation; Artificiality documentation; Safety controller designation; Exercise evaluation team independence; Improvement plan tracking and accountability; HSEEP compliance documentation'
WHERE name = 'Exercise Program Manager / HSEEP Practitioner';

UPDATE citizen_catalog SET
  governing_guidelines = '47 CFR Part 11 (Emergency Alert System rules); 47 CFR Part 10 (Wireless Emergency Alerts); FEMA IPAWS (Integrated Public Alert and Warning System) program; Cal. Gov. Code 8593.7 (State alert and warning capabilities); Presidential communications authority; NOAA/NWS alert protocols',
  standards_of_creation = 'EAS activation procedures and authorization chain; WEA message composition (90/360 character limits); IPAWS alert originator certification; Geographic targeting accuracy for WEA; Alert type classification (Imminent Threat, AMBER, Presidential); Alert cancellation and update procedures; Monthly and weekly EAS test administration',
  soc_controls = 'IPAWS Collaborative Operating Group (COG) authorization; Authentication for alert origination; Dual-authorization for high-level alerts; False alert investigation procedures; System testing and redundancy verification; Alert log retention and review; Public education on alert meaning and response'
WHERE name = 'Alert and Warning Program Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'FEMA REP Program Manual; NUREG-0654 / FEMA-REP-1 (Criteria for REP Plans); 10 CFR 50.47 (NRC emergency planning requirements); 44 CFR Part 350 (Review and approval of state/local REP plans); EPA Protective Action Guides (PAGs) for radiological incidents; Cal. Gov. Code 8610 (State nuclear emergency plan)',
  standards_of_creation = 'REP plan development for Emergency Planning Zones (EPZ); Plume and ingestion pathway protection procedures; KI (potassium iodide) distribution planning; Evacuation time estimate (ETE) study; Dose assessment procedures; Protective action recommendation/decision documentation; Biennial REP exercise planning and execution',
  soc_controls = 'FEMA REP plan review and approval (44 CFR 350); NRC/FEMA joint exercise evaluation; Exercise deficiency tracking and resolution; Annual plan review and letter of certification; Multi-jurisdictional coordination requirements; NRC resident inspector coordination; Public information/education materials update'
WHERE name = 'Radiological Emergency Preparedness (REP) Planner';

UPDATE citizen_catalog SET
  governing_guidelines = 'Pandemic and All-Hazards Preparedness Act (PAHPA) (42 USC 247d); Public Health Emergency Preparedness (PHEP) cooperative agreement; Hospital Preparedness Program (HPP) requirements; CDC Pandemic Influenza Plan; HHS Pandemic Crisis Standards of Care framework; Cal. HSC 101000-101605 (Communicable disease control)',
  standards_of_creation = 'Pandemic operations plan development; Medical countermeasure distribution planning; Healthcare surge capacity documentation; Non-pharmaceutical intervention implementation plans; Continuity of healthcare operations planning; Mass fatality management planning; Crisis standards of care framework adoption',
  soc_controls = 'HHS/ASPR grant compliance reporting; Exercise requirement (PHEP/HPP); Multi-jurisdictional health coordination; Strategic National Stockpile (SNS) coordination; Ethics framework for scarce resource allocation; After-action review for actual activations; Annual plan update requirement'
WHERE name = 'Pandemic Preparedness Coordinator / Public Health Emergency Planner';

UPDATE citizen_catalog SET
  governing_guidelines = 'Tsunami Warning and Education Act (33 USC 3201-3208); ShakeAlert Earthquake Early Warning system protocols; NOAA Tsunami Warning Center procedures; Cal. Gov. Code 8587.5 (Tsunami hazard planning); Cal. PRC 2621-2630 (Alquist-Priolo Earthquake Fault Zoning Act); CGS Special Publication 117 (Seismic design guidelines)',
  standards_of_creation = 'Tsunami evacuation zone mapping; Tsunami evacuation plan development; ShakeAlert distribution and integration; Earthquake early warning dissemination procedures; Inundation modeling documentation; TsunamiReady community recognition program documentation; Seismic hazard assessment integration into land use planning',
  soc_controls = 'NOAA TWC alert authentication; Evacuation route signage installation and maintenance; Annual tsunami warning system test; Community education and outreach documentation; Real-time seismic monitoring network maintenance; False alarm investigation and correction; Multi-agency coordination protocols'
WHERE name = 'Seismic/Tsunami Warning Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. PRC 4201-4204 (Fire hazard severity zones); Cal. Gov. Code 51175-51189 (Very high fire hazard severity zones); Cal. PRC 4291 (Defensible space requirements); CAL FIRE Community Wildfire Protection Plan (CWPP) guidelines; National Cohesive Wildland Fire Management Strategy; FEMA Wildfire Mitigation Fact Sheet; Healthy Forests Restoration Act (16 USC 6501-6591)',
  standards_of_creation = 'Community Wildfire Protection Plan development; Wildfire evacuation plan and route documentation; Defensible space inspection program records; Fire hazard severity zone mapping and update; Pre-fire assessment and resource staging plans; WUI building code compliance documentation; Community education and Firewise USA recognition',
  soc_controls = 'CAL FIRE review and approval of CWPPs; Annual defensible space inspection program; Evacuation route capacity analysis; Red Flag Warning notification procedures; Multi-agency coordination (CAL FIRE, USFS, local); Post-fire damage assessment coordination; Grant program compliance (fire prevention)'
WHERE name = 'Wildfire Preparedness Coordinator / WUI (Wildland-Urban Interface) Planner';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. HSC 1797-1799.207 (Emergency Medical Services System and Prehospital Emergency Medical Care Act); Cal. HSC 1798 (LEMSA authority); NHTSA National EMS Scope of Practice Model; NHTSA National EMS Education Standards; 42 CFR 482.55 (Hospital CoP -- emergency services); LEMSA policies and treatment protocols',
  standards_of_creation = 'EMS treatment protocol development and approval; EMS personnel scope of practice authorization; Quality assurance/quality improvement (QA/QI) program; Run report documentation standards; Medical oversight documentation (online and offline); Medication administration protocols; ALS/BLS service level standards',
  soc_controls = 'Physician medical director license verification; Protocol review and update cycle; QA/QI case review documentation; Personnel certification verification (EMT, Paramedic); Controlled substance accountability; Patient care report review and feedback; Outcome data tracking'
WHERE name = 'Emergency Medical Services Medical Director';

UPDATE citizen_catalog SET
  governing_guidelines = 'NEMSIS data standard (Version 3.5+); Cal. HSC 1797.220 (Data collection authority); HIPAA Privacy Rule (45 CFR 164); LEMSA patient care reporting requirements; CMS ambulance documentation requirements (for billing); Cal. HSC 1798.200 (Prehospital care records)',
  standards_of_creation = 'ePCR data element completeness (NEMSIS required fields); Response time documentation accuracy; Clinical documentation (assessment, treatment, transport); Patient refusal documentation; Interfacility transfer documentation; Trauma system notification documentation; HIPAA-compliant information exchange',
  soc_controls = 'ePCR system access controls; Data validation rules in ePCR software; NEMSIS data submission quality reports; Patient privacy protections; QA/QI review integration; Record retention (minimum 7 years per Cal. HSC); Billing documentation accuracy'
WHERE name = 'EMS Patient Care Report Quality Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'FIRESCOPE MCI Plan; START/JumpSTART triage protocols; SALT (Sort, Assess, Lifesaving interventions, Treatment/Transport) triage; LEMSA MCI policies; Hospital MCI/surge protocols; Cal. HSC 1798.6 (MCI provisions)',
  standards_of_creation = 'MCI triage documentation (tag assignment); Patient tracking through treatment and transport; Hospital notification and bed availability tracking; Resource request documentation; Casualty collection point establishment; Morgue/fatality management coordination; Family reunification center documentation',
  soc_controls = 'MCI declaration authority; Triage officer credentialing; Patient tracking system integrity; Hospital diversion/bypass documentation; Controlled substance accountability during MCI; Security for MCI scene and treatment areas; After-action medical review'
WHERE name = 'MCI Triage Officer / Medical Branch Director';

UPDATE citizen_catalog SET
  governing_guidelines = 'INTERPOL DVI Guide; DHHS/ASPR Mass Fatality Management guidance; Cal. Gov. Code 27491 (Coroner duties); FEMA ESF-8 (Public Health and Medical Services); NDMS DMORT activation procedures; CAP (College of American Pathologists) forensic standards',
  standards_of_creation = 'Victim identification documentation chain; Antemortem/postmortem data collection; DNA sample collection and chain of custody; Dental records comparison documentation; Fingerprint and physical identification records; Family reference sample collection; Death certificate issuance procedures in mass fatality',
  soc_controls = 'Medical examiner/coroner jurisdiction determination; DVI team credentialing; Evidence chain of custody standards; Family assistance center coordination; Identification confirmation (minimum two methods); Remains release documentation; Cultural/religious considerations documentation'
WHERE name = 'DVI Team Member / Mass Fatality Management Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'PHEP cooperative agreement requirements; CDC Cities Readiness Initiative (CRI) standards; SNS (Strategic National Stockpile) 12-hour push package procedures; PREP Act (Public Readiness and Emergency Preparedness Act, 42 USC 247d-6d); Emergency Use Authorization (EUA) procedures (21 USC 360bbb-3); Cal. HSC 120130 (Quarantine and isolation authority)',
  standards_of_creation = 'MCM distribution plan development; Point of dispensing (POD) site planning; Cold chain management documentation; Inventory tracking and accountability; EUA compliance documentation; Adverse event reporting (VAERS/MedWatch); Lot number tracking for recall capability',
  soc_controls = 'CDC technical assistance report compliance; 48-hour distribution goal documentation; Chain of custody for controlled pharmaceuticals; Temperature monitoring logs; Personnel credentialing for MCM administration; Adverse event investigation records; Inventory reconciliation at each distribution tier'
WHERE name = 'Public Health Emergency MCM / SNS Distribution Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'CMS Emergency Preparedness Rule (42 CFR 482.15); TJC Emergency Management (EM) standards; Hospital Preparedness Program (HPP) cooperative agreement; Cal. HSC 1250-1340 (Hospital licensing); HCAI (formerly OSHPD) seismic safety requirements (SB 1953); NFPA 99 (Health Care Facilities Code)',
  standards_of_creation = 'Hospital Emergency Operations Plan (HEOP); Hazard Vulnerability Analysis (HVA) annual update; Exercise program (2 per year, 1 community-based); Surge capacity and decompression planning; 96-hour self-sufficiency documentation; HICS (Hospital Incident Command System) implementation; Communication and notification procedures',
  soc_controls = 'CMS survey compliance; TJC accreditation requirements; Annual HVA review; Exercise documentation and AAR; HPP reporting and deliverables; Seismic safety compliance timeline (SB 1953); Generator and utility failure contingency testing'
WHERE name = 'Hospital Emergency Management Officer / HPP Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. HSC 1797.61-1797.84 (EMT certification); Cal. HSC 1797.170-1797.220 (Paramedic licensure); NREMT certification standards; NHTSA National EMS Education Standards; CECBEMS (accreditation of EMS education programs); LEMSA provider authorization requirements',
  standards_of_creation = 'Initial certification/licensure application processing; Continuing education (CE) tracking and compliance; Skills competency verification; Background check and fitness for duty documentation; Scope of practice expansion/restriction documentation; Reciprocity and endorsement processing; Disciplinary action documentation',
  soc_controls = 'EMSA/LEMSA certification authority; NREMT registry database integrity; CE accreditation verification (CECBEMS/CAPCE); Disciplinary hearing due process; Impaired provider program documentation; Certification renewal deadline enforcement; Public lookup availability for credential verification'
WHERE name = 'EMS Certification and Licensing Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. HSC 1798.160-1798.172 (Trauma care system); ACS Verification Review Committee (VRC) standards (Resources for Optimal Care of the Injured Patient); EMSA Trauma System Planning Guidelines; LEMSA Trauma Plan; CDC Guidelines for Field Triage of Injured Patients',
  standards_of_creation = 'Trauma center designation/verification documentation; Trauma registry data quality and completeness (NTDB); Triage and destination protocol documentation; Trauma system performance improvement; Inter-facility transfer agreement documentation; Trauma mortality/morbidity review; Trauma system plan development',
  soc_controls = 'ACS VRC re-verification cycle (3-year); LEMSA trauma center designation review; Trauma registry data submission compliance; Performance improvement and patient safety (PIPS) committee; Trauma medical director oversight; System bypass/diversion tracking; Benchmarking against TQIP (Trauma Quality Improvement Program)'
WHERE name = 'Regional Trauma System Coordinator / Trauma Center Verification Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'ATC-20 (Procedures for Postearthquake Safety Evaluation of Buildings); ATC-45 (Safety Evaluation of Buildings After Wind Storms and Floods); Cal. HSC 19100-19165 (Building standards); FEMA P-154 (Rapid Visual Screening of Buildings); SAP (Safety Assessment Program -- Cal OES); ICC/NSSA Standard for Damage Assessment',
  standards_of_creation = 'Rapid safety evaluation (placard posting: green/yellow/red); Detailed damage assessment documentation; Structural and non-structural damage classification; Percentage of damage estimation methodology; Unsafe building notification and barricading; Re-inspection and clearance procedures; Damage assessment summary for PDA contribution',
  soc_controls = 'SAP evaluator credentialing and deployment; Building official authority for access restriction; Placard posting documentation and tracking; Property owner notification requirements; Appeal procedures for posted buildings; Liability protection for evaluators (Cal. Gov. Code 8657); Data compilation for FEMA PDA contribution'
WHERE name = 'Damage Assessment Coordinator / Building Inspector (Post-Disaster)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Stafford Act Section 403 (42 USC 5170b) -- Essential assistance (mass care); FEMA ESF-6 (Mass Care, Emergency Assistance, Temporary Housing, and Human Services); American Red Cross Shelter Operations Manual; ADA Title II (Shelter accessibility); Cal. Gov. Code 8588.15 (Access and functional needs population); Post v. City of Fort Lauderdale standards (shelter access)',
  standards_of_creation = 'Shelter activation and registration procedures; Shelter population tracking documentation; Feeding/dormitory operation records; Health surveillance and first aid documentation; Access and functional needs (AFN) accommodation records; Shelter supply inventory management; Shelter deactivation and transition procedures',
  soc_controls = 'Shelter manager credentialing (Red Cross trained); ADA accessibility compliance verification; Sex offender registry check procedures; Animal shelter coordination (pets); Sanitation and health inspection records; Security staffing and incident reporting; Daily population and status reports'
WHERE name = 'Mass Care / Emergency Shelter Operations Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'National VOAD Points of Consensus; FEMA Voluntary Agency Liaison (VAL) program; Cal. Gov. Code 8589.65 (VOAD coordination with Cal OES); Long-Term Recovery Group (LTRG) establishment guide; IRS 501(c)(3) requirements for disaster relief organizations; OMB Circular A-133 (nonprofit audit requirements)',
  standards_of_creation = 'VOAD coordination meeting documentation; Unmet needs identification and case management; Donations management coordination; Volunteer management and credentialing; Long-term recovery plan development; Service delivery tracking and deduplication; Transition from emergency to long-term recovery',
  soc_controls = 'Duplication of benefits tracking across organizations; Case management confidentiality; Donations accountability and transparency; Volunteer background screening; Service delivery equity monitoring; Financial accountability for donated funds; Grant compliance for disaster relief funds'
WHERE name = 'VOAD Liaison / Long-Term Recovery Committee Manager';

UPDATE citizen_catalog SET
  governing_guidelines = '2 CFR 200.318-326 (Procurement standards for federal awards); Cal. Pub. Contract Code 1102 (Emergency contract authority); Cal. Gov. Code 8645 (Local emergency powers -- procurement); FAR Part 18 (Emergency Acquisitions); FEMA PAPPG (procurement documentation for PA reimbursement); Cal. Gov. Code 14838 (State emergency procurement)',
  standards_of_creation = 'Emergency determination and justification documentation; Expedited competitive procurement where feasible; Non-competitive/sole source justification; Cost/price analysis documentation; Contract execution with required federal clauses; Change order management; Contractor performance monitoring',
  soc_controls = 'Emergency declaration as procurement authority basis; Delegation of emergency procurement authority documentation; Cost reasonableness determination; Required FEMA contract clauses for PA-eligible work; Prohibited contract types (cost-plus-percentage-of-cost); Conflict of interest documentation; Post-event procurement audit support; Bond and insurance requirements'
WHERE name = 'Emergency Procurement Specialist / Disaster Contracting Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Stafford Act Section 404, 406 (Mitigation and repair assistance); FEMA National Disaster Recovery Framework (NDRF); HUD CDBG-DR program (42 USC 5301 et seq.); Presidential Policy Directive 8 -- Recovery Mission Area; FEMA Pre-Disaster Recovery Planning Guide; HUD Federal Register notices (CDBG-DR allocation)',
  standards_of_creation = 'Recovery Support Strategy development; Community recovery needs assessment; Recovery Support Function (RSF) coordination documentation; CDBG-DR action plan development; Housing recovery plan documentation; Economic recovery strategy documentation; Recovery performance metrics tracking',
  soc_controls = 'FEMA recovery coordination structure; CDBG-DR action plan HUD approval; Community engagement documentation; Quarterly CDBG-DR reporting; Single Audit compliance; Duplication of benefits verification; Civil rights compliance'
WHERE name = 'Community Recovery Coordinator / FEMA Long-Term Community Recovery (LTCR) Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 790-790.15 (Unfair claims practices); Cal. Ins. Code 2051-2051.5 (Measure of recovery); 10 CCR 2695.1-2695.17 (Fair Claims Settlement Practices regulations); NFIP Claims Manual (for flood claims); Cal. Ins. Code 10089-10089.40 (FAIR Plan); Cal. Ins. Code 10090 (California Earthquake Authority)',
  standards_of_creation = 'Timely claim acknowledgment (15 days per 10 CCR 2695.5); Full investigation and coverage determination; Detailed loss estimate documentation; Proof of loss assistance for policyholders; Additional Living Expense (ALE) documentation; Subrogation documentation; Total loss vs. repair determination',
  soc_controls = 'CDI licensing and continuing education; Fair Claims Settlement Practices compliance; Claim file documentation standards; Unfair claims practice prohibition; Policyholder rights notification; Catastrophe response time standards; Adjuster supervision requirements for CAT deployment'
WHERE name = 'Catastrophe (CAT) Claims Adjuster / Disaster Insurance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Stafford Act Section 426 (42 USC 5189e) -- Disaster case management; FEMA Disaster Case Management Program guidance; HHS DCM Technical Assistance Guide; FEMA Individual Assistance Program guidance; NASW (National Association of Social Workers) case management standards',
  standards_of_creation = 'Survivor recovery plan development; Needs assessment documentation; Resource referral and service coordination records; Progress monitoring and plan updates; Case closure criteria and documentation; Cultural and linguistic competency documentation; Privacy and consent form administration',
  soc_controls = 'Case manager credentialing and training; Client consent and privacy protections; Service delivery duplication avoidance; Supervisor case review schedule; Outcome data tracking; Grant performance reporting; Cultural competency requirements'
WHERE name = 'FEMA Disaster Case Management (DCM) Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'FEMA IHP Inspection Manual; SBA Loss Verification procedures; HUD Housing Quality Standards (24 CFR 982.401); FEMA IAPPG (housing inspection chapter); Cal. HSC 17920-17928 (Substandard buildings)',
  standards_of_creation = 'Habitability determination documentation; Damage quantification by category (real property, personal property); FEMA Verified Loss (FVL) calculation; Photo documentation standards; Access and re-inspection procedures; Manufactured housing unit (MHU) site inspection; Rental resource assessment',
  soc_controls = 'Inspector credentialing and background check; Quality assurance reinspection program; Photo documentation verification; FVL calculation review; Fraud detection indicators; Inspection scheduling and completion timeline; Applicant appeal triggers re-inspection'
WHERE name = 'FEMA Housing Inspection Contractor / SBA Loss Verifier';

UPDATE citizen_catalog SET
  governing_guidelines = '29 CFR 1910.120 (HAZWOPER standard); 40 CFR Part 300 (National Contingency Plan -- NCP); 40 CFR Part 311 (Worker protection for hazardous waste operations); Cal. HSC 25500-25520 (Hazardous Materials Release Response Plans); Cal. Lab. Code 6300-6400 (Cal/OSHA requirements); NFPA 472 (Standard for Competence of Responders to Hazardous Materials); DOT ERG (Emergency Response Guidebook)',
  standards_of_creation = 'Incident action plan for hazmat incidents; Hazard identification and risk assessment documentation; Exposure monitoring and air sampling records; Decontamination procedures documentation; PPE selection documentation (Level A/B/C/D); Medical surveillance records for response personnel; Post-incident environmental sampling',
  soc_controls = '40-hour HAZWOPER certification requirement; Annual 8-hour refresher training; Medical surveillance program (29 CFR 1910.120(f)); Incident Commander hazmat operations qualification; Buddy system for hot zone entry; Personnel exposure records (30-year retention per OSHA); Post-incident debrief and AAR'
WHERE name = 'Hazardous Materials Response Team Leader / Hazmat Branch Director';

UPDATE citizen_catalog SET
  governing_guidelines = '10 CFR Part 20 (NRC Standards for Protection Against Radiation); 10 CFR Part 50 (Domestic Licensing of Production and Utilization Facilities); FEMA REP Program Manual; EPA PAGs (Protective Action Guides); DOE/NNSA Radiological Assistance Program (RAP); NCRP Report 165 (Responding to a Radiological or Nuclear Terrorism Incident)',
  standards_of_creation = 'Radiological monitoring and dose assessment documentation; Protective action recommendation formulation; Contamination survey and mapping records; Decontamination effectiveness documentation; Population dose estimation; Environmental pathway analysis; Recovery phase monitoring plan',
  soc_controls = 'Radiation worker qualifications and dosimetry; ALARA (As Low As Reasonably Achievable) documentation; Dose record maintenance (lifetime tracking); NRC event notification (10 CFR 50.72); Emergency classification level determination authority; Ingestion pathway coordination across jurisdictions; Long-term monitoring plan development'
WHERE name = 'Radiological Emergency Response Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'FEMA National US&R Response System; 44 CFR Part 208 (National Urban Search and Rescue Response System); FEMA US&R Operations Manual; NFPA 1670 (Standard on Operations and Training for Technical Search and Rescue); NFPA 1006 (Standard for Technical Rescue Personnel Professional Qualifications); Cal. Gov. Code 8585-8589 (OES US&R authority)',
  standards_of_creation = 'Task force activation and mobilization documentation; Structural triage and assessment records; Search operations documentation (canine, technical, physical); Rescue operations records; Medical team patient care documentation; Equipment deployment and maintenance records; Demobilization and rehabilitation documentation',
  soc_controls = 'FEMA US&R system credentialing; Task force member certification verification; Equipment cache readiness inspection; Structural specialist assessment authority; Safety officer deployment with each task force; Post-deployment medical monitoring; Equipment accountability and replacement'
WHERE name = 'FEMA US&R Task Force Leader';

UPDATE citizen_catalog SET
  governing_guidelines = 'FEMA PA PAPPG (Debris chapter); FEMA Debris Management Guide (FEMA-325); 40 CFR Parts 239-258 (Solid waste regulations); FEMA Debris Monitoring Guide; EPA emergency debris management guidelines; Cal. PRC 40000-40203 (Integrated waste management)',
  standards_of_creation = 'Debris management plan development; Debris quantity estimation methodology; Temporary debris storage and reduction site (TDSRS) documentation; Load ticket documentation (truck certification, disposal records); Environmental monitoring at TDSRS; Hazardous waste segregation procedures; TDSRS site closure and restoration documentation',
  soc_controls = 'FEMA-eligible debris documentation requirements; Debris monitoring (federal/state/local oversight); Truck certification and cubic yard capacity verification; Roving and tower monitor deployment; Hazardous waste identification and separate handling; Environmental compliance documentation; Contractor performance monitoring; Fraud prevention controls (duplicate tickets, overreporting)'
WHERE name = 'Debris Operations Manager / Debris Monitoring Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'FEMA US&R Canine Standards; NASAR SAR dog certification standards; NFPA 1670 (SAR operations); State SAR coordination policies; FEMA K-9 readiness evaluation requirements; AKC/NASAR canine team certification',
  standards_of_creation = 'K-9 team certification and recertification records; Search operation deployment documentation; Canine alert documentation and handler interpretation; Training log maintenance (minimum hours/frequency); Canine health and veterinary records; Search sector assignment and completion records; Probability of detection (POD) estimation',
  soc_controls = 'Biennial recertification requirement; Independent evaluator for certification testing; Veterinary fitness-for-duty clearance; Handler credentialing verification; Training hour minimums; Deployment health monitoring (canine and handler); After-action evaluation of canine performance'
WHERE name = 'Certified Search and Rescue Canine Handler';

UPDATE citizen_catalog SET
  governing_guidelines = 'NFPA 1670 (Water rescue operations); NFPA 1006 (Technical rescue qualifications); Cal FIRE swiftwater rescue program standards; US Coast Guard flood response procedures; FEMA IS-111 (Floodplain Management); Cal. Gov. Code 8589.5 (Dam inundation mapping)',
  standards_of_creation = 'Rescue operation documentation (location, conditions, outcome); Personnel qualification verification; Equipment inspection and maintenance records; Water rescue incident reporting; Training and exercise records (minimum annual in-water training); Patient/victim documentation and tracking; Risk assessment for rescue operations',
  soc_controls = 'Technician-level minimum for swiftwater operations; Equipment safety inspection before deployment; Buddy system / team minimum requirements; Personal flotation device (PFD) mandate; Medical monitoring during extended operations; After-action review for all rescues; Incident reporting to state/federal agencies'
WHERE name = 'Swiftwater Rescue Technician / Flood Response Team Lead';

UPDATE citizen_catalog SET
  governing_guidelines = 'PETS Act (Post-Katrina Emergency Management Reform Act, 42 USC 5196a-d note); Cal. Gov. Code 8608 (CARES program); Cal. Gov. Code 8588.15 (Animal evacuation planning); FEMA ESF-11 (Agriculture and Natural Resources); AVMA (American Veterinary Medical Association) disaster response guidelines',
  standards_of_creation = 'Animal evacuation shelter establishment documentation; Animal intake and identification records; Veterinary triage and treatment records; Owner reunification tracking; Large animal evacuation coordination; Animal decontamination procedures; Animal mortality documentation',
  soc_controls = 'Veterinary oversight for medical treatment; Animal identification and owner matching database; Zoonotic disease monitoring; Bite incident reporting; Volunteer credentialing for animal handling; Controlled substance management for veterinary use; Disposition of unclaimed animals'
WHERE name = 'CARES (California Animal Response Emergency System) Team Leader';

UPDATE citizen_catalog SET
  governing_guidelines = 'Stafford Act Section 416 (42 USC 5183) -- Crisis counseling assistance; FEMA Crisis Counseling Assistance and Training Program (CCP) guidance; SAMHSA Disaster Behavioral Health resources; Cal. WIC 5000-5900 (Lanterman-Petris-Short Act); 42 USC 290dd-2 (Confidentiality of substance use disorder records); APA/NASW disaster behavioral health practice guidelines',
  standards_of_creation = 'Crisis counseling service delivery documentation; Immediate Services Program (ISP) and Regular Services Program (RSP) records; Psychological First Aid (PFA) documentation; Outreach and education activity records; Assessment and referral documentation; Cultural and linguistic service delivery records; Program performance metrics',
  soc_controls = 'Licensed mental health professional supervision; Client confidentiality protections (42 USC 290dd-2); Informed consent procedures; Mandated reporting compliance; Grant performance reporting (ISP 60-day; RSP 9-month); Outcome data tracking; Staff support and secondary trauma monitoring'
WHERE name = 'Crisis Counselor / Disaster Mental Health Response Team Member';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSEEP After-Action Report/Improvement Plan guidance; FEMA Lessons Learned Information Sharing (LLIS) program; Cal. Gov. Code 8607 (SEMS after-action reporting); 19 CCR 2450 (SEMS after-action report requirements); EMAP Standard 4.9 (After-action reporting); NIMS Guideline for the National Qualification System',
  standards_of_creation = 'AAR structure (executive summary, incident overview, analysis, findings); Strength and area-for-improvement identification; Root cause analysis methodology; Corrective action recommendation development; Improvement plan with responsible party, timeline, and resources; SEMS multi-agency after-action coordination; Corrective action tracking to completion',
  soc_controls = '90-day AAR completion requirement (SEMS -- 19 CCR 2450); Multi-agency review and concurrence; Corrective action implementation tracking; Quarterly progress reporting on IP items; Integration with training and exercise program; LLIS submission for national sharing; Elected official briefing on findings'
WHERE name = 'AAR/IP Program Analyst / Lessons Learned Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'EMAP Standard (current version); ANSI/EMAP EMS 5-2019 (Emergency Management Standard); NFPA 1600 (Standard on Continuity, Emergency, and Crisis Management); EMAP Assessment Methodology; EMAP Commissioner training requirements',
  standards_of_creation = 'Self-assessment completion and documentation; Evidence file preparation for all EMAP standards; On-site assessment facilitation; Corrective action plan for deficiencies; Accreditation maintenance documentation; Annual compliance report; Reaccreditation cycle (5-year) documentation',
  soc_controls = 'Independent assessor team (no conflict of interest); EMAP Commission review and vote; Conditional accreditation with corrective action tracking; Annual compliance reporting; Reaccreditation full review cycle; Public recognition of accreditation status; Complaint investigation procedures'
WHERE name = 'EMAP Assessor / Emergency Management Program Evaluator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Federal Continuity Directive 1 (FCD-1); Federal Continuity Directive 2 (FCD-2); Continuity Guidance Circular (CGC) assessment criteria; PPD-40 (National Continuity Policy); FEMA Continuity Assessment Tool (CAT)',
  standards_of_creation = 'COOP plan assessment against FCD-1 elements; Exercise evaluation for continuity scenarios; Essential functions capability assessment; Alternate facility readiness evaluation; IT systems continuity assessment; Human capital continuity evaluation; Devolution readiness assessment',
  soc_controls = 'Annual self-assessment requirement; FEMA biennial assessment cycle; Corrective action plan development and tracking; Senior leadership certification of continuity readiness; Cross-agency continuity coordination assessment; Classification handling for continuity plans'
WHERE name = 'Federal/State Continuity Program Evaluator';

UPDATE citizen_catalog SET
  governing_guidelines = 'NIMS Doctrine (3rd Edition, 2017); HSPD-5 (Management of Domestic Incidents) -- NIMS adoption requirement; FEMA National Qualification System (NQS); FEMA IS-700 (NIMS Introduction); Cal. Gov. Code 8607 (SEMS/NIMS integration); FEMA NIMS Implementation Objectives',
  standards_of_creation = 'NIMS implementation plan development; ICS training compliance documentation by position; Resource typing and credentialing program; Mutual aid agreement NIMS compliance; Multi-agency coordination system documentation; Public information and warning system NIMS compliance; NIMS baseline assessment completion',
  soc_controls = 'NIMS compliance as prerequisite for federal preparedness grants; Training completion verification by position; Annual NIMS compliance self-assessment; ICS credential verification for incident deployment; NIMS integration in all emergency plans; Typing and credentialing record accuracy; Gap analysis and corrective action'
WHERE name = 'NIMS Implementation Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = '2 CFR Part 200 (Uniform Administrative Requirements); FEMA Preparedness Grants Manual; EMPG (Emergency Management Performance Grant) program guidance; SHSP (State Homeland Security Program) guidance; UASI (Urban Areas Security Initiative) guidance; 44 CFR Part 206 (Grant administration)',
  standards_of_creation = 'Grant application and investment justification; Award acceptance and conditions compliance; Budget and expenditure tracking by project; Quarterly performance reporting; Equipment procurement and inventory management; Match/cost-share documentation (EMPG 50/50); Grant closeout procedures',
  soc_controls = 'Single Audit compliance (2 CFR 200 Subpart F); Equipment inventory and disposition records; Time and effort documentation for personnel costs; Procurement standards compliance; BSIR (Biannual Strategy Implementation Report) submission; Period of performance compliance; Deobligation procedures for unexpended funds'
WHERE name = 'EMPG/SHSP/UASI Grant Program Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSIN User Agreement and Acceptable Use Policy; 6 USC 124h (Department of Homeland Security intelligence); ISE (Information Sharing Environment) guidelines; 28 CFR Part 23 (Criminal Intelligence Systems Operating Policies); EO 13388 (Information Sharing); Privacy Act protections for shared intelligence',
  standards_of_creation = 'HSIN access request and approval documentation; Threat information sharing protocols; Situational awareness report development; Information classification and handling; Suspicious activity reporting (SAR) documentation; Intelligence product dissemination tracking',
  soc_controls = 'HSIN Trusted Agent certification; Background investigation for access; Need-to-know access controls; Information handling and marking compliance; 28 CFR Part 23 reasonable suspicion standard; Privacy and civil liberties protections; Audit trail for all information access and sharing'
WHERE name = 'HSIN Trusted Agent / Emergency Management Intelligence Liaison';

UPDATE citizen_catalog SET
  governing_guidelines = 'PHEP Cooperative Agreement (CDC-RFA-TP18-1802); CDC Public Health Emergency Preparedness and Response Capabilities; Cal. HSC 101000-101605 (Communicable disease control); Public Health Service Act (42 USC 243, 247d); HPP-PHEP alignment requirements; 42 CFR Part 70/71 (Interstate and foreign quarantine)',
  standards_of_creation = 'Public health emergency response plan; Disease surveillance and reporting documentation; Quarantine and isolation order documentation; Mass prophylaxis/vaccination plan; Community reception center planning; Public health laboratory response network coordination; Risk communication plan',
  soc_controls = 'PHEP grant performance measures compliance; Jurisdictional Risk Assessment (JRA) completion; Annual exercise requirement; Budget period reporting; Cross-jurisdictional coordination documentation; CDC technical assistance compliance; Public health emergency declaration authority'
WHERE name = 'Public Health Emergency Preparedness (PHEP) Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Wat. Code 6000-6610 (Dams and reservoirs); Cal. Gov. Code 8589.5 (Dam inundation mapping); FEMA Federal Guidelines for Dam Safety (FEMA P-93); FERC Dam Safety regulations (18 CFR Part 12); National Dam Safety Program Act (33 USC 467); FEMA Emergency Action Plan guidelines for dams',
  standards_of_creation = 'Emergency Action Plan development and maintenance; Inundation map preparation and distribution; Notification flowchart (dam owner to downstream communities); Dam failure mode analysis; Evacuation zone delineation; Annual EAP exercise and update; Dam safety inspection documentation',
  soc_controls = 'DSOD regulatory inspection cycle (annual/biennial per hazard class); EAP approval by DSOD; Downstream notification agreement execution; Exercise frequency (annual tabletop, periodic functional); Independent safety review for high-hazard dams; EAP distribution list maintenance; Instrumentation monitoring records'
WHERE name = 'Dam Safety Emergency Action Plan (EAP) Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Pen. Code 409.5 (Emergency area closure authority); Cal. Gov. Code 8665 (Local emergency powers); CAL FIRE Evacuation guidelines; Cal. Elec. Code 3021 (Ballot access during evacuation); County/city evacuation plans; Cal. Gov. Code 8588.15 (Access and functional needs evacuation)',
  standards_of_creation = 'Evacuation zone mapping and designation; Evacuation order/warning issuance documentation; Traffic control plan for evacuation routes; Access and functional needs transportation coordination; Animal evacuation coordination; Repopulation procedures and documentation; Evacuation center coordination with sheltering',
  soc_controls = 'Law enforcement authority for mandatory evacuation; AlertCalifornia/local alert system activation records; Zone-based evacuation communication; Road closure documentation; Perimeter security and re-entry control; Damage assessment before repopulation; Evacuation order termination documentation'
WHERE name = 'Evacuation Zone Manager / Community Evacuation Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Stafford Act Section 415 (42 USC 5182) -- Legal services; FEMA-ABA Disaster Legal Services program agreement; ABA Model Rules of Professional Conduct; Cal. Bus. & Prof. Code 6000-6238 (State Bar Act); LSC (Legal Services Corporation) disaster response authority; Cal. Rules of Court 9.45 (Registered legal aid attorneys)',
  standards_of_creation = 'DLS intake and screening documentation; Legal advice and representation records; Insurance claim assistance documentation; FEMA appeal preparation records; Landlord-tenant dispute documentation; Consumer protection assistance records; Pro bono attorney coordination',
  soc_controls = 'Income eligibility screening (FEMA DLS income threshold); Bar admission verification for attorneys; Client confidentiality protections; Conflict of interest screening; Case management and outcome tracking; Fee-generating case referral to private bar; Malpractice coverage verification'
WHERE name = 'FEMA Disaster Legal Services (DLS) Coordinator / Pro Bono Disaster Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = 'Presidential Policy Directive 21 (PPD-21) -- Critical Infrastructure Security and Resilience; National Infrastructure Protection Plan (NIPP) 2013; FEMA Community Lifelines framework; 6 USC 131 (Critical Infrastructure Information Act); CISA National Critical Functions; 16 critical infrastructure sectors designation',
  standards_of_creation = 'Critical infrastructure inventory and prioritization; Lifelines status assessment during incidents; Infrastructure dependency and interdependency analysis; Vulnerability assessment documentation; Restoration priority framework; Public-private coordination records; Infrastructure monitoring during incidents',
  soc_controls = 'Critical Infrastructure Information Act protections (6 USC 131); Information sharing agreements with private sector; PCII (Protected Critical Infrastructure Information) handling; Sector-specific agency coordination; Infrastructure status reporting chain; Classified infrastructure vulnerability information handling; Annual assessment update'
WHERE name = 'Emergency Management CIP Coordinator / Lifelines Coordinator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Gov. Code 8593.7 (State alert and warning capabilities); Cal. Gov. Code 53069.6 (Local emergency notification systems); FCC TCPA requirements (47 USC 227) -- Emergency exception; Wireless Emergency Alert (WEA) integration; ADA Title II (Accessible notification requirements); Cal. Elec. Code 18350 (No electioneering via emergency system)',
  standards_of_creation = 'System registration campaign and database maintenance; Alert message composition and distribution; Geographic targeting accuracy; Multi-language notification capability; ADA-accessible formats (TTY, captioning); System testing schedule; Opt-in/opt-out management',
  soc_controls = 'Authorized alert originator designation; Authentication for system access; Message approval workflow; False alert prevention procedures; System redundancy and failover testing; Subscriber database privacy protections; Annual system performance assessment'
WHERE name = 'Community Mass Notification / Reverse 911 System Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Gov. Code 8610.5 (Volunteers in emergency services); Cal. Gov. Code 8657 (Volunteer liability protection); Volunteer Protection Act (42 USC 14501-14505); National Volunteer Organizations Active in Disaster standards; FEMA Citizen Corps program guidance; Cal. Lab. Code 3360-3369 (Volunteer workers'' compensation)',
  standards_of_creation = 'Volunteer registration and credentialing; Skills assessment and assignment documentation; Volunteer training records; Deployment tracking and accountability; Background check processing; Volunteer time and contribution documentation; Recognition and retention records',
  soc_controls = 'Background screening before deployment; Liability coverage verification (Cal. Gov. Code 8657); Workers'' compensation coverage (Cal. Lab. Code 3361); Deployment safety briefing requirement; Volunteer check-in/check-out procedures; Unsolicited volunteer management; After-deployment wellness check'
WHERE name = 'Volunteer Coordination / Citizen Corps Liaison';

UPDATE citizen_catalog SET
  governing_guidelines = 'CERCLA/Superfund emergency response (42 USC 9604-9606); Clean Water Act emergency provisions (33 USC 1321); 40 CFR Part 300 (NCP -- emergency response); Cal. HSC 25100-25250 (Hazardous waste control); FEMA EHP compliance for disaster recovery; EPA Post-Disaster Environmental Assessment guidelines',
  standards_of_creation = 'Environmental hazard identification and assessment; Air/water/soil sampling and analysis; Asbestos and lead survey in damaged structures; Contaminated debris segregation documentation; Household hazardous waste collection coordination; Environmental compliance documentation for FEMA PA projects; Long-term environmental monitoring plan',
  soc_controls = 'Certified environmental professional qualifications; Laboratory accreditation for analytical results; Sample chain of custody; Regulatory notification requirements (CERCLA, CWA); Public health advisory coordination; Environmental justice community notification; Remediation documentation and verification'
WHERE name = 'Environmental Hazard Assessment Coordinator / Disaster Environmental Health Specialist';

-- ============================================================
-- CALIFORNIA LOCAL UNIQUE (78 personas)
-- ============================================================

UPDATE citizen_catalog SET
  governing_guidelines = 'Unemployment Insurance Code (UIC) div. 1-7; Cal. Code Regs. tit. 22 div. 1; Lab. Code 1088-1099; 20 CFR Parts 601-658 (federal UI requirements); SSA cross-match agreements',
  standards_of_creation = 'DE 2501 certification form completion per UIC 1326; determination letter (DE 1080CZ) with specific code section citation; wage record verification against quarterly DE 9C filings; identity verification per UIC 1089; base period wage calculation per UIC 1275-1281; benefit computation per EDD Determination Guide; SDI/PFL medical certification (DE 2501) processing per Cal. Code Regs. tit. 22 sec. 2706',
  soc_controls = 'Dual-review for denial determinations; separation of claims intake from adjudication; automated cross-match with National Directory of New Hires; benefit audit worksheet reconciliation; overpayment determination with written notice and appeal rights (UIC 1375-1379); EDD Quality Control random sample audit; claimant identity verification prior to benefit disbursement; appeal timeline tracking (30-day filing per UIC 1328)'
WHERE name = 'A-1. EDD Claims Examiner';

UPDATE citizen_catalog SET
  governing_guidelines = 'UIC 976-977, 986-986.1, 1088-1089; RTC 19542; Cal. Code Regs. tit. 22 div. 1; AB 5 (Lab. Code 2775-2787); IRC Section 530 safe harbor',
  standards_of_creation = 'ABC test application per Dynamex/AB 5 (Lab. Code 2775); employer payroll audit workpapers per UIC 1127; quarterly contribution return (DE 9/DE 9C) reconciliation; worker classification determination with three-prong documentation; penalty assessment per UIC 1128-1128.1; voluntary plan examination per UIC 3254-3260; jeopardy assessment documentation per UIC 1137',
  soc_controls = 'Audit selection methodology documentation; separation of audit from collections; employer protest rights within 30 days (UIC 1222); FTB/IRS information-sharing agreement compliance; workpaper review by audit supervisor; de novo review on appeal to CUIAB; statute of limitations tracking (3-year per UIC 1132)'
WHERE name = 'A-2. EDD Tax Auditor';

UPDATE citizen_catalog SET
  governing_guidelines = 'PRC 25000-25986 (Warren-Alquist Act); Cal. Code Regs. tit. 20 1601-1609 (Title 24 Part 6); PUC 454.5; SB 100 (100% clean energy by 2045); Cal. Code Regs. tit. 24 Part 6',
  standards_of_creation = 'CF-1R/CF-2R/CF-3R compliance certificate completion per Title 24 Part 6; CBECC-Res/CBECC-Com energy modeling documentation; HERS rater field verification reports; AFC preparation per PRC 25500-25542; RPS compliance reporting per SB 100/SB 350; integrated energy policy report per PRC 25302; appliance efficiency test reports per Cal. Code Regs. tit. 20 div. 2',
  soc_controls = 'HERS rater certification and independence from builder; CEC compliance software version control; third-party plan review for nonresidential projects; CEQA functional equivalency review; SB 100 annual progress reporting; demand forecast peer review; appliance test laboratory accreditation'
WHERE name = 'A-3. CEC Energy Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'PRC 25500-25542 (power plant siting); Warren-Alquist Act; Cal. Code Regs. tit. 20 1701-1770; CEQA (PRC 21000+)',
  standards_of_creation = 'AFC preparation per Cal. Code Regs. tit. 20 1704; preliminary/final staff assessment documentation; compliance monitoring plan per tit. 20 1769; facility amendment request per tit. 20 1769; SPPE application processing; decommissioning plan per tit. 20 1770; environmental impact analysis per CEC CEQA-equivalent process',
  soc_controls = 'Evidentiary hearing process with sworn testimony; intervenor participation rights; 12-month decision timeline (PRC 25522); compliance monitoring with on-site inspections; post-certification amendment tracking; public comment periods; CEC Commissioner recusal for conflicts'
WHERE name = 'A-4. CEC Siting Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 81000-91015 (Political Reform Act); Cal. Code Regs. tit. 2 18110-18997; Gov. Code 83116 (enforcement authority); Gov. Code 91000-91014 (penalties)',
  standards_of_creation = 'Sworn complaint intake per Gov. Code 83115; probable cause determination memorandum; investigation report with documentary evidence; stipulated settlement drafting; administrative hearing preparation per Gov. Code 83115.5; civil penalty calculation per Gov. Code 91004; criminal referral per Gov. Code 91005; advice letter per Gov. Code 83114',
  soc_controls = 'Commission vote for probable cause determination; respondent due process protections; confidential investigation phase; 5-year statute of limitations (Gov. Code 91000); settlement precedent consistency; public disclosure after disposition; separation of investigative and adjudicative functions'
WHERE name = 'A-5. FPPC Enforcement Counsel';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 84100-84252; Gov. Code 87200-87210; Cal. Code Regs. tit. 2 18700-18756; Gov. Code 87300-87313',
  standards_of_creation = 'Form 700 completeness review per Gov. Code 87200-87210; campaign statement filing deadline verification per Gov. Code 84200; Cal-Access electronic filing standards; Form 497 24-hour processing; biennial conflict of interest code review per Gov. Code 87306; lobbyist quarterly report processing per Gov. Code 86115; Form 460 reconciliation',
  soc_controls = 'Filing officer completeness review (not accuracy) per Gov. Code 87203; FPPC audit authority; automatic late filing penalties per Gov. Code 91013; public access via CAL-ACCESS; biennial code review and FPPC approval; referral to DA for willful non-filing'
WHERE name = 'A-6. FPPC Filing Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'RTC 17001-24991 (Personal Income Tax); RTC 23001-24691 (Corporation Tax); Cal. Code Regs. tit. 18; IRC conformity per RTC 17024.5',
  standards_of_creation = 'Audit workpapers per FTB Audit Manual; NPA with specific RTC/IRC citation; residency determination per FTB Pub 1031 and Voss factors; OIC analysis per RTC 19443; abatement review per RTC 19104; protest processing per RTC 19041-19048; corporate apportionment per RTC 25101-25141 (UDITPA)',
  soc_controls = 'Separation of audit from collections; protest within 60 days of NPA; appeal to OTA per RTC 19045; 4-year SOL per RTC 19057; taxpayer confidentiality per RTC 19542; internal quality review; field audit supervisor approval; IRS/FTB exchange agreement compliance'
WHERE name = 'A-7. FTB Tax Auditor';

UPDATE citizen_catalog SET
  governing_guidelines = 'RTC 19001-19780; Gov. Code 12419.5; CCP 706.070-706.077; RTC 19195-19225 (liens)',
  standards_of_creation = 'Earnings withholding order per CCP 706.070; bank levy per RTC 19203; state tax lien filing per RTC 19195; offset notice per RTC 19377; installment agreement per RTC 19008; hardship determination per RTC 19231; interagency intercept per RTC 19280',
  soc_controls = 'Collection due process (notice before enforcement per RTC 19031); installment approval authority limits; hardship review independence; lien release within 40 days per RTC 19202; 20-year collection SOL per RTC 19255; innocent spouse relief per RTC 18533'
WHERE name = 'A-8. FTB Collections Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Const. Art. V; Gov. Code 12000-12080; Gov. Code 11340-11361 (APA); Gov. Code 8550-8668 (Emergency Services Act)',
  standards_of_creation = 'Executive order per Cal. Const. Art. V sec. 1; emergency proclamation per Gov. Code 8625; extradition warrant per Pen. Code 1548-1558; judicial appointment vetting per Cal. Const. Art. VI sec. 16; clemency review per Cal. Const. Art. V sec. 8; regulatory review per Gov. Code 11349; budget proposal per Cal. Const. Art. IV sec. 12',
  soc_controls = 'Separation of powers; legislative override by two-thirds; judicial review of executive orders; Senate confirmation; OAL rulemaking review per Gov. Code 11349.1; emergency proclamation legislative review per Gov. Code 8629; LAO budget review'
WHERE name = 'A-9. Governor';

UPDATE citizen_catalog SET
  governing_guidelines = 'Ins. Code 1-16111; Cal. Code Regs. tit. 10; NAIC Financial Condition Examiners Handbook; NAIC Market Regulation Handbook',
  standards_of_creation = 'Rate filing review per Ins. Code 1861.01-1861.10 (Prop 103); policy form approval per Ins. Code 10290; statutory accounting review per NAIC SAP; market conduct examination per 10 CCR 2695.1-2695.17; solvency analysis per NAIC RBC; surplus line broker filing per Ins. Code 1760-1780; advertising review per Ins. Code 790.03; complaint investigation per Ins. Code 12921.1',
  soc_controls = 'Examiner independence from examined insurer; NAIC accreditation compliance; Prop 103 rate hearing process; consumer complaint tracking; 5-year financial examination cycle per Ins. Code 730; market conduct selection methodology; public rate filing access; cease and desist authority'
WHERE name = 'A-10. CDI Insurance Examiner';

UPDATE citizen_catalog SET
  governing_guidelines = 'Ins. Code 1871-1879.8; Pen. Code 548-551; Ins. Code 1875.20 (SIU requirements); Cal. Code Regs. tit. 10 2698.30-2698.41',
  standards_of_creation = 'SIU referral investigation per Ins. Code 1875.20; mandatory fraud reporting review (annual SIU report per Ins. Code 1875.24); anti-fraud plan filing per Ins. Code 1875.22; DA referral preparation per Ins. Code 1872; workers comp fraud investigation per Ins. Code 1871.4; premium fraud assessment per Ins. Code 1871.7',
  soc_controls = 'Separation of SIU from claims adjustment; mandatory insurer fraud reporting per Ins. Code 1872; CDI SIU report review; anti-fraud plan approval cycle; DA referral tracking; restitution monitoring; anti-fraud plan adequacy assessment; whistleblower protections per Ins. Code 1879.2'
WHERE name = 'A-11. CDI Fraud Investigator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Const. Art. VI sec. 6; Cal. Rules of Court 10.1-10.1030; Gov. Code 68500-68651; Gov. Code 68070-68073',
  standards_of_creation = 'Court administration report per Cal. Rules of Court 10.603; JBSIS statistical report compilation; case management system audit; judicial performance review per Cal. Const. Art. VI sec. 18; mandatory form development per Rules 1.30-1.45; trial court budget allocation per Gov. Code 68502.5; language access plan per Gov. Code 68092.1',
  soc_controls = 'Judicial Council plenary session approval; public comment on proposed rules; advisory committee peer review; AOC oversight; interpreter certification per Gov. Code 68560-68566; trial court audit program; JBSIS data quality controls; facility standards monitoring'
WHERE name = 'A-12. Judicial Council Staff Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Rules of Court 1.1-9.50; CCP 575-576; Gov. Code 68070-68073; Cal. Const. Art. VI sec. 6',
  standards_of_creation = 'Rule amendment proposal with comment analysis per Rules 10.22; invitation-to-comment distribution; rules implementation memorandum; advisory committee report; emergency rule adoption per Rules 10.22(d); form approval with legal review; local rule consistency review per Gov. Code 68070(a)',
  soc_controls = 'Public comment period (45 days minimum per Rules 10.22); Judicial Council majority vote; advisory committee independence; effective date publication; local rule preemption review; annual rules cycle; post-implementation monitoring'
WHERE name = 'A-13. Judicial Council Rules Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 10200-10290; Cal. Const. Art. IV; Cal. Const. Art. II (initiative process); Gov. Code 9600 (chaptering)',
  standards_of_creation = 'Bill draft per Legislative Counsel Manual of Style; constitutional analysis memorandum; enrolled bill report; legislative counsel opinion per Gov. Code 10243; statutory revision memorandum; chaptering per Gov. Code 9600; urgency clause certification per Cal. Const. Art. IV sec. 8(d)',
  soc_controls = 'Nonpartisan office per Gov. Code 10200; attorney-client privilege with requesting legislator; bill drafting confidentiality; enrolled bill proofreading; cross-reference verification; Cal. State Bar membership; separation from political advocacy'
WHERE name = 'A-14. Legislative Counsel';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 9140-9149; Cal. Const. Art. IV sec. 12; Elec. Code 9087 (ballot measure fiscal analysis)',
  standards_of_creation = 'Fiscal impact analysis per Gov. Code 9145; annual budget analysis per Gov. Code 9140; ballot measure fiscal estimate per Elec. Code 9087; policy brief methodology; long-term fiscal outlook per Gov. Code 9140; CalFacts compilation; initiative fiscal estimate',
  soc_controls = 'Nonpartisan appointment by Joint Legislative Budget Committee; methodology transparency; public access to all analyses; independence from political direction; data source documentation; historical accuracy tracking'
WHERE name = 'A-15. Legislative Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'Lab. Code 6300-6719; Cal. Code Regs. tit. 8 (Safety Orders); Lab. Code 6401.7 (IIPP); 8 CCR 3203',
  standards_of_creation = 'Inspection report per Lab. Code 6313; citation and penalty per Lab. Code 6319; IIPP review per Lab. Code 6401.7; Form 5020 processing; OSHAB appeal file; variance review per Lab. Code 6451; abatement verification; serious injury investigation per Lab. Code 6409.1; heat illness plan review per 8 CCR 3395',
  soc_controls = 'Inspector qualification per Lab. Code 6314; inspection warrant per Lab. Code 6314.5; employer contest within 15 working days (Lab. Code 6600); citation classification review; penalty calculation per Lab. Code 6427-6431; OSHAB de novo hearing; abatement tracking; separation of inspection from adjudication'
WHERE name = 'A-16. Cal/OSHA Compliance Officer (Safety)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Lab. Code 6350-6356, 142.3; Cal. Code Regs. tit. 8 5139-5223; 8 CCR 5155 (PEL tables); 8 CCR 5141',
  standards_of_creation = 'Exposure monitoring report per 8 CCR 5141; PEL compliance per 8 CCR 5155; respiratory protection review per 8 CCR 5144; hazard communication audit per 8 CCR 5194; lab hygiene plan per 8 CCR 5191; lead assessment per 8 CCR 1532.1; asbestos assessment per 8 CCR 1529; biological monitoring per 8 CCR 5200',
  soc_controls = 'CIH credential verification; AIHA-accredited lab analysis; NIOSH Methods sampling; personal vs. area monitoring separation; medical surveillance per 8 CCR 5155; 30-year exposure record retention per 8 CCR 3204; Cal/OSHA Standards Board rulemaking'
WHERE name = 'A-17. Cal/OSHA Industrial Hygienist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Elec. Code 1-23003; Gov. Code 6253.5; Cal. Const. Art. V sec. 10; Elec. Code 2196',
  standards_of_creation = 'Candidate filing verification per Elec. Code 8000-8106; ballot measure submission per Elec. Code 9000-9097; initiative petition signature verification per Elec. Code 9030; campaign filing review per Elec. Code 84600; voting system certification per Elec. Code 19200-19224; VoteCal audit per Elec. Code 2190; county election plan review',
  soc_controls = 'Constitutional officer certification; independent signature sampling; 30-day public review for voting system certification; VoteCal access controls; campaign deadline enforcement; county office oversight; bipartisan observation; public records access'
WHERE name = 'A-18. Secretary of State Elections Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'Corp. Code 100-2319; Corp. Code 15900-16962; Corp. Code 17701.01-17713.13; Com. Code 9501-9528',
  standards_of_creation = 'Articles of incorporation/organization filing per Corp. Code; statement of information per Corp. Code 1502/17702.09; UCC financing statement indexing per Com. Code 9519; notary commission application per Gov. Code 8200-8230; trademark registration per Bus. & Prof. Code 14200-14272; apostille per Gov. Code 1189-1190; merger/dissolution per Corp. Code',
  soc_controls = 'Filing date-stamping with tracking; UCC indexing accuracy per Com. Code 9519; notary background check and bond; entity name availability; deficiency notice; public entity search database; filing fee reconciliation; SOI delinquency tracking'
WHERE name = 'A-19. Secretary of State Business Programs Examiner';

UPDATE citizen_catalog SET
  governing_guidelines = 'Wat. Code 13000-13999 (Porter-Cologne); HSC 116270-116755 (Safe Drinking Water Act); 33 USC 1251-1387 (CWA); 40 CFR 122-125',
  standards_of_creation = 'NPDES permit per Wat. Code 13263 and 40 CFR 122; WDR documentation; water quality monitoring review; TMDL per CWA 303(d); SWPPP review; UST cleanup fund per HSC 25299; 303(d) listing methodology; basin plan amendment per Wat. Code 13240; water recycling permit per Wat. Code 13500-13577',
  soc_controls = 'Regional Board hearing process; CEQA review; public comment per Wat. Code 13167; EPA NPDES oversight; self-monitoring verification; compliance inspection; enforcement escalation per Wat. Code 13261-13268; CIWQS audit trail'
WHERE name = 'A-20. State Water Board Water Quality Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'Wat. Code 1200-1851; Cal. Code Regs. tit. 23 div. 3; Cal. Const. Art. X sec. 2; Wat. Code 100',
  standards_of_creation = 'Water rights application per Wat. Code 1250-1253; diversion statement per Wat. Code 5100-5108; license issuance per Wat. Code 1600-1677; change petition per Wat. Code 1700-1707; transfer approval per Wat. Code 1725-1732; curtailment notice; water availability analysis per Wat. Code 1260',
  soc_controls = 'Adjudicative hearing per Wat. Code 1300-1316; protest rights per Wat. Code 1330-1360; environmental review; public trust compliance; reasonable use determination; senior/junior priority; annual reporting; term 91 forfeiture tracking'
WHERE name = 'A-21. State Water Board Water Rights Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 16300-16430; Gov. Code 5000-5980 (Marks-Roos); Cal. Const. Art. XVI; Gov. Code 8855-8859.7 (CDIAC)',
  standards_of_creation = 'GO bond issuance per Cal. Const. Art. XVI; revenue bond official statement per SEC Rule 15c2-12; CDIAC annual debt report per Gov. Code 8855; PMIA investment report per Gov. Code 16480; LIHTC allocation per RTC 12206/17058; CalABLE compliance; conduit bond post-issuance tax compliance per IRC 103; Marks-Roos filing per Gov. Code 6588',
  soc_controls = 'Constitutional debt limits; voter GO bond approval; CDIAC filing mandate; Debt Affordability Report; continuing disclosure compliance; arbitrage rebate calculation; investor tax exemption certification; PMIA Investment Board oversight'
WHERE name = 'A-22. State Treasurer Debt Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 8855-8859.7; Gov. Code 53600-53695; Cal. Const. Art. XVI',
  standards_of_creation = 'Proposed debt issuance report per Gov. Code 8855(i); final sale report per Gov. Code 8855(j); annual debt transparency report; Mello-Roos/Marks-Roos filing review; refunding savings analysis; continuing disclosure review per SEC Rule 15c2-12',
  soc_controls = 'Mandatory public agency filing; 30-day filing deadline; public database; data quality validation; legislative annual report; small issuer technical assistance; SEC/MSRB coordination'
WHERE name = 'A-23. CDIAC Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 25000-25009, 23000-23027; Cal. Const. Art. XI sec. 1; Gov. Code 54950-54963 (Brown Act)',
  standards_of_creation = 'Board resolution/ordinance per Gov. Code 25123; budget adoption per Gov. Code 29000-29144; general plan adoption per Gov. Code 65300; Brown Act agenda (72-hr per Gov. Code 54954.2); closed session report per Gov. Code 54957.1; CEQA findings per PRC 21081; emergency declaration per Gov. Code 8630; Form 700 per Gov. Code 87200',
  soc_controls = 'Brown Act open meeting compliance; Form 700 disclosure; FPPC enforcement; Grand Jury per Pen. Code 919; single subject rule; minutes requirement; public comment; CEQA record of proceedings'
WHERE name = 'B-1. County Supervisor';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 26800-26832; Gov. Code 27201-27383; Elec. Code 1000-1501; Fam. Code 350-500; HSC 102100-103095',
  standards_of_creation = 'Real property deed recording per Gov. Code 27201; vital records per HSC 102100; FBN filing per Bus. & Prof. Code 17900; notary bond per Gov. Code 8212; document indexing per Gov. Code 27230; marriage license per Fam. Code 350; recording fee per Gov. Code 27361; passport acceptance per 22 CFR 51.22',
  soc_controls = 'Sequential numbering and grantor-grantee indexing; vital record security paper; recording legibility requirements; rejection standards per Gov. Code 27201.5; public search access; records retention per Gov. Code 26202; official seal custody; identity verification for vital records'
WHERE name = 'B-2. County Clerk-Recorder';

UPDATE citizen_catalog SET
  governing_guidelines = 'RTC 75-469.5 (Prop 13); Cal. Const. Art. XIIIA; Cal. Code Regs. tit. 18 1-1005; BOE Assessment Practices Surveys',
  standards_of_creation = 'Assessment roll per RTC 601-611; change of ownership per RTC 480-482; Prop 13 base year per Cal. Const. Art. XIIIA; Prop 8 decline-in-value per RTC 51(a); supplemental/escape per RTC 75; exemption claims per RTC 203-276; Form 571-L review per RTC 441',
  soc_controls = 'BOE Assessment Practices Survey; AAB independent review per RTC 1601-1645; annual roll public notice; Assessor BOE certification; equalization ratios per RTC 731-741; Williamson Act methodology per Gov. Code 51200; BOE intercounty equalization; audit trail for value changes'
WHERE name = 'B-3. County Assessor';

UPDATE citizen_catalog SET
  governing_guidelines = 'RTC 2601-4377; Gov. Code 27000-27092; Gov. Code 53600-53695; Cal. Const. Art. XVI sec. 16',
  standards_of_creation = 'Tax bill per RTC 2601-2636; delinquent roll per RTC 3361-3381; tax sale per RTC 3691-3731; investment pool quarterly report per Gov. Code 53646; Teeter Plan per RTC 4701-4717; installment plan per RTC 4216; TOT collection per local ordinance',
  soc_controls = 'Investment oversight committee; annual Treasurer audit; tax sale notice per RTC 3361; redemption rights per RTC 4101-4112; excess proceeds per RTC 4675; CDIAC reporting; custodial controls; investment/disbursement segregation'
WHERE name = 'B-4. County Treasurer-Tax Collector';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 27642-27650; county charter; Cal. Rules of Prof. Conduct; Gov. Code 900-915.4',
  standards_of_creation = 'Legal opinion per Gov. Code 27642; conflict analysis per Gov. Code 1090/87100; ordinance legal review; litigation status report; settlement per Gov. Code 935; Brown Act opinion; CEQA review; contract review; claims investigation per Gov. Code 900-915.4; privilege log per Gov. Code 7920-7931',
  soc_controls = 'Attorney-client privilege per Evidence Code 950-962; State Bar ethics; conflict screening; settlement authority; litigation hold; opinion peer review; insurance defense coordination; grand jury response review per Pen. Code 933'
WHERE name = 'B-5. County Counsel';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 26500-26535; Pen. Code 681-694; Pen. Code 1054-1054.7 (discovery); Brady v. Maryland; Cal. Const. Art. I sec. 28',
  standards_of_creation = 'Charging document per Pen. Code 737-951; plea agreement per Pen. Code 1192.5; Brady disclosure log; victim restitution per Pen. Code 1202.4; asset forfeiture per HSC 11470-11495; three strikes per Pen. Code 667(b)-(i); Marsys Law notification per Cal. Const. Art. I sec. 28(b)',
  soc_controls = 'Brady disclosure obligation; prosecutorial ethics per Rules of Prof. Conduct 3.8; grand jury per Pen. Code 919; disposition tracking; victim notification compliance; asset forfeiture reporting per Gov. Code 38775; State Bar discipline; conviction integrity; AB 2542 racial justice data'
WHERE name = 'B-6. District Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 27700-27712; Pen. Code 987-987.9; Cal. Const. Art. I sec. 15; Strickland v. Washington; ABA Ten Principles',
  standards_of_creation = 'Indigency declaration per Pen. Code 987; case disposition per ABA standards; caseload documentation; Pen. Code 1172.6 resentencing petition; habeas per Pen. Code 1473-1508; Prop 47/57 per Pen. Code 1170.18; conflict referral per Gov. Code 27706; investigation expense per Pen. Code 987.9',
  soc_controls = 'ABA workload standards; client communication documentation; conflict screening; supervisory review; appellate transfer protocol; MCLE compliance; branch independence; confidentiality per Bus. & Prof. Code 6068(e)'
WHERE name = 'B-7. Public Defender';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 26600-26664; Pen. Code 830.1, 832; Cal. Code Regs. tit. 15; Pen. Code 13519 (POST); Gov. Code 3300-3313 (POBR)',
  standards_of_creation = 'Arrest report per Pen. Code 849; booking per Pen. Code 7; use-of-force per Pen. Code 13012; BWC policy per AB 748; jail inspection per BSCC tit. 15; RIPA per Gov. Code 12525.5; CCW per Pen. Code 26150-26225; custodial death per Gov. Code 12525; IA per POBR; SB 1421 disclosure per Pen. Code 832.7',
  soc_controls = 'POST certification; BSCC jail inspection; BWC retention; RIPA submission to DOJ; use-of-force review; CLETS audit; civilian oversight; POBR timelines; POST decertification per SB 2/Pen. Code 13510.8; Brady list'
WHERE name = 'B-8. Sheriff';

UPDATE citizen_catalog SET
  governing_guidelines = 'Pen. Code 1203-1203.4; WIC 200-987; Cal. Code Regs. tit. 15 div. 4; Pen. Code 3450-3465 (AB 109)',
  standards_of_creation = 'Pre-sentence investigation per Pen. Code 1203.10; case plan per evidence-based practice; risk/needs assessment (ORAS/COMPAS) per Pen. Code 1203.016; AB 109 report per Pen. Code 3451; violation report per Pen. Code 1203.2; juvenile detention log per WIC 207.1; restitution collection per Pen. Code 1202.4; electronic monitoring per Pen. Code 1203.016',
  soc_controls = 'BSCC standards for juvenile facilities; validated risk instruments per Pen. Code 1203.016; Morrissey due process for revocation; caseload standards per CPOC; juvenile hall inspection per WIC 209; BSCC data reporting; AB 109 CCP oversight; probation officer POST per Pen. Code 830.5'
WHERE name = 'B-9. Chief Probation Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSC 101000-101475; HSC 120100-120580; Cal. Code Regs. tit. 17; 42 USC 247d',
  standards_of_creation = 'Communicable disease report per HSC 120130/tit. 17; emergency order per HSC 101040; restaurant inspection per CalCode (HSC 113700+); body art permit per HSC 119300; immunization report per HSC 120325; quarantine/isolation order per HSC 120175; well permit; septic permit',
  soc_controls = 'Physician licensure per HSC 101005; CDPH oversight; mandated reporting timelines per tit. 17; restaurant scoring disclosure; CAIR immunization data; quarantine due process per HSC 120175-120235; environmental health permit renewal; food facility grading transparency'
WHERE name = 'B-10. County Health Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'WIC 10000-18999 (CalWORKs); WIC 14000-14199 (Medi-Cal); WIC 18900-18927 (CalFresh); 42 USC 601+ (TANF); 7 CFR 273 (SNAP)',
  standards_of_creation = 'CalWORKs application per WIC 11200-11340; CalFresh worksheet per WIC 18901/7 CFR 273; Medi-Cal determination per WIC 14005; income verification per tit. 22; WTW record per WIC 11320; overpayment claim per WIC 11004; fair hearing per WIC 10950; IHSS assessment per WIC 12300-12318',
  soc_controls = 'CDSS self-assessment reviews; timeliness standards (30/45/90 day); QA error rate monitoring; fair hearing rights at adverse action; income verification documentation; CalSAWS audit trail; federal SNAP QC; Medi-Cal enrollment verification'
WHERE name = 'B-11. County Social Services Eligibility Worker';

UPDATE citizen_catalog SET
  governing_guidelines = 'WIC 300-395; WIC 16500-16522; Pen. Code 11164-11174.3 (CANRA); Cal. Code Regs. tit. 22 div. 2; 42 USC 5101-5119 (CAPTA)',
  standards_of_creation = 'Referral processing per Pen. Code 11166; SDM safety/risk assessment; detention report per WIC 315; jurisdiction/disposition per WIC 358; case plan per WIC 16501.1; court review report per WIC 366; ICPC per WIC 7900; adoption assessment per Fam. Code 8700; CACI notification per Pen. Code 11169',
  soc_controls = 'SDM validated tools; CDSS C-CFSR reviews; 24-hour emergency response; court 6-month review per WIC 366; mandated reporter compliance; ICWA compliance; CACI due process; reunification timeline per WIC 361.5; CWS/CMS audit trail'
WHERE name = 'B-12. County Child Welfare Social Worker';

UPDATE citizen_catalog SET
  governing_guidelines = 'WIC 5000-5120 (Short-Doyle); WIC 5150-5157 (LPS); WIC 5600-5604.5 (MHSA); HSC 1250.2; WIC 14680-14726',
  standards_of_creation = 'MHSA revenue/expenditure report per WIC 5847; 5150/5250/5270 hold documentation per WIC 5150; MHP compliance per DHCS; specialty mental health claims per tit. 9; FSP outcome data per MHSA; Drug Medi-Cal ODS per WIC 14184; LPS conservatorship per WIC 5350; Lauras Law/AOT per WIC 5345',
  soc_controls = 'DHCS EQRO audits; patients rights advocacy per WIC 5520; Mental Health Board per WIC 5604; MHSA stakeholder process per WIC 5848; involuntary hold medical director review; LPS court oversight; drug testing chain of custody; SUD credential verification'
WHERE name = 'B-13. County Behavioral Health Director';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 34000-45343; Cal. Const. Art. XI sec. 3-5; Gov. Code 54950-54963 (Brown Act); Gov. Code 65000-66210',
  standards_of_creation = 'Ordinance/resolution per Gov. Code 36900; general plan amendment per Gov. Code 65354; budget per Gov. Code 37200; Brown Act agenda (72-hr per Gov. Code 54954.2); closed session report per Gov. Code 54957.1; emergency declaration per Gov. Code 8630; Form 700 per Gov. Code 87200',
  soc_controls = 'Brown Act compliance; FPPC Form 700; conflict recusal per Gov. Code 87100; public comment per Gov. Code 54954.3; municipal audit; initiative/referendum per Cal. Const. Art. II; grand jury oversight; CEQA review'
WHERE name = 'B-14. City Council Member';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 34851-34861; city charter/municipal code; Gov. Code 37200-37210; Gov. Code 54950-54963',
  standards_of_creation = 'Annual budget per Gov. Code 37208; staff report with fiscal impact; contract execution per delegation; performance metrics; emergency operations plan per Gov. Code 8610; ADA transition plan per 28 CFR 35.150; labor MOU; ACFR per GASB; risk management report',
  soc_controls = 'Council oversight; annual independent audit per Gov. Code 37209; performance evaluation; delegation documentation; purchasing thresholds; records retention; GFOA standards; labor relations transparency'
WHERE name = 'B-15. City Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 36800-36840; Elec. Code 1301-1304, 10200-10264; Gov. Code 7920.000-7931.000 (CPRA); Gov. Code 54950-54963',
  standards_of_creation = 'Ordinance codification per Gov. Code 36933; council minutes per Gov. Code 36814; CPRA response per Gov. Code 7922.535; FPPC filing officer per Gov. Code 87500; municipal election per Elec. Code 10200; records retention per Gov. Code 34090; claims processing per Gov. Code 900-915.4',
  soc_controls = 'Brown Act compliance for agenda/minutes; CPRA deadline tracking; FPPC filing deadline enforcement; records retention/destruction certification; election code compliance; official custodian responsibility; municipal code publication; bid opening transparency'
WHERE name = 'B-16. City Clerk';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 36500-36524; city charter; Cal. Rules of Prof. Conduct 1.13; Gov. Code 54950-54963; Cal. Const. Art. XI',
  standards_of_creation = 'Legal opinion; ordinance/contract review; litigation file per Prof. Conduct rules; code enforcement prosecution; Brown Act advisory; CEQA legal review per PRC 21168; eminent domain per CCP 1230.010; bond counsel opinion; initiative/referendum analysis per Elec. Code 9200; privilege log per Gov. Code 7922.000',
  soc_controls = 'State Bar licensure/MCLE; attorney-client privilege per Evidence Code 950; conflict screening per Prof. Conduct 1.7; outside counsel standards; litigation reserve; settlement from council; insurance coordination; privilege review; closed session Brown Act compliance'
WHERE name = 'B-17. City Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 65000-66210; PRC 21000-21189.70 (CEQA); Gov. Code 65852.2 (ADU); Gov. Code 65913.4 (SB 35); Gov. Code 65915',
  standards_of_creation = 'General plan elements per Gov. Code 65302; specific plan per Gov. Code 65450; EIR/MND per CEQA Guidelines; housing element per Gov. Code 65580 with HCD review; CUP findings; subdivision map per Gov. Code 66410; ADU/JADU per Gov. Code 65852.2; SB 9 per Gov. Code 65852.21; density bonus per Gov. Code 65915',
  soc_controls = 'Planning Commission per Gov. Code 65353; CEQA lead agency; HCD housing element certification; public hearing notice per Gov. Code 65090; permit streamlining per Gov. Code 65950; Housing Accountability Act per Gov. Code 65589.5; appeal procedures; general plan consistency per Gov. Code 65860'
WHERE name = 'B-18. City Planning Director';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSC 17920-17928; Cal. Building Code (CBC/Title 24); Gov. Code 65850-65863.13; HSC 18900-18944; CALGreen',
  standards_of_creation = 'Permit application review per CBC; plan check per Title 24; inspection records per HSC 17951; certificate of occupancy per HSC 17921; energy compliance (CF-1R/CF-2R); accessibility per CBC Chapter 11B; solar permit per AB 2188; SB 35 streamlined per Gov. Code 65913.4; code violation per HSC 17980',
  soc_controls = 'ICC certification; sequential inspection hold points; third-party plan review; abatement per HSC 17980; Board of Appeals; DSA oversight for schools/hospitals; permit expiration tracking; CO pre-conditions; seismic retrofit compliance'
WHERE name = 'B-19. Chief Building Official';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSC 13000-13273; Cal. Fire Code (Title 24 Part 9); Gov. Code 51175-51189; NFPA 1/13/72/101',
  standards_of_creation = 'Fire inspection per Cal. Fire Code; violation notice per HSC 13143; investigation report per HSC 13113; hazmat disclosure per HSC 25500 (CUPA); community risk assessment per NFPA 1730; sprinkler/alarm plan check per NFPA 13/72; vegetation management per PRC 4291; mutual aid per Gov. Code 8561; NFIRS incident report',
  soc_controls = 'SFM certification per HSC 13159; inspection by occupancy risk; violation tracking with abatement; CO fire clearance; acceptance testing; ISO rating; vegetation inspection; fire cause determination independence; annual completion tracking'
WHERE name = 'B-20. Fire Chief';

UPDATE citizen_catalog SET
  governing_guidelines = 'Pen. Code 830.1, 832, 13519 (POST); Gov. Code 3300-3313 (POBR); Gov. Code 12525.5 (RIPA); Pen. Code 832.7',
  standards_of_creation = 'Arrest report per Pen. Code 849; use-of-force per AB 392/SB 230; BWC per AB 748; RIPA per Gov. Code 12525.5; IA per POBR; SB 1421 disclosure per Pen. Code 832.7; military equipment per AB 481; surveillance technology policy; Brady list per Pen. Code 832.7(b); pursuit report',
  soc_controls = 'POST certification/decertification per SB 2; POBR due process; civilian oversight; RIPA submission to DOJ; use-of-force review; BWC retention; IA timelines per POBR; racial profiling analysis; AB 481 annual report; community accountability'
WHERE name = 'B-21. Police Chief';

UPDATE citizen_catalog SET
  governing_guidelines = 'SHC 1-33700; PCC 20100-22045; Gov. Code 4525-4529 (A&E); Lab. Code 1770-1781 (prevailing wage)',
  standards_of_creation = 'CIP plans per engineering standards; prevailing wage per Lab. Code 1771; bid solicitation per PCC 20100+; encroachment permit per SHC; stormwater per MS4 NPDES; ADA curb ramp per CBC 11B; change orders per PCC 20142; notice of completion per Civ. Code 9204; Prop 218 assessment per Cal. Const. Art. XIIID',
  soc_controls = 'Competitive bidding per PCC; prevailing wage monitoring per DIR; A&E QBS per Gov. Code 4526; project inspection; change order authority; retention release per PCC; encroachment conditions; MS4 annual reporting; ADA compliance program'
WHERE name = 'B-22. Director of Public Works';

UPDATE citizen_catalog SET
  governing_guidelines = 'Wat. Code 30000-38501; HSC 116270-116755 (SDWA); Cal. Const. Art. XIIID (Prop 218); Wat. Code 10610-10657 (UWMP)',
  standards_of_creation = 'CCR per HSC 116470; UWMP per Wat. Code 10610; drought plan per Wat. Code 10632; rate study per Prop 218; SWRCB permit per HSC 116275; water loss audit per SB 555; distribution monitoring per SDWA; lead and copper per 40 CFR 141',
  soc_controls = 'SWRCB drinking water oversight; annual CCR distribution; independent financial audit; Prop 218 protest procedures; DDW permit monitoring; UWMP 5-year update with DWR; backflow prevention; ELAP-accredited lab; drought response triggers'
WHERE name = 'B-23. Water District General Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSC 13800-13970; Gov. Code 50075-50077.5; Cal. Fire Code Title 24 Part 9; NFPA 1710/1720',
  standards_of_creation = 'District formation/annexation per HSC 13800; special tax levy per Gov. Code 50075/Prop 218; ISO rating per PPC schedule; apparatus inventory per NFPA 1901; annual audit per Gov. Code 26909; Gann limit per Cal. Const. Art. XIIIB; mutual aid per Gov. Code 8561; CWPP per Healthy Forests Act',
  soc_controls = 'LAFCO review; special tax voter approval per Prop 218; State Controller audit filing; Gann compliance; NFPA apparatus standards; volunteer certification per SFM; ISO evaluation cycle; mutual aid tracking; Brown Act compliance'
WHERE name = 'B-24. Fire Protection District Chief';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSC 5410-5476; HSC 6400-6830; Wat. Code 13000+; 40 CFR 122, 503; Cal. Code Regs. tit. 23',
  standards_of_creation = 'DMR per 40 CFR 122; SSMP per SWRCB Order 2006-0003; SSO reporting per MRP; pretreatment per 40 CFR 403; biosolids per 40 CFR 503; capacity analysis per SSMP; connection fee per Gov. Code 66013; master plan per CEQA',
  soc_controls = 'SWRCB/Regional Board NPDES enforcement; DMR certified operator; SSO electronic reporting within 2 hours; certified operator per Wat. Code 13627; pretreatment monitoring; biosolids sampling per 40 CFR 503; independent audit; CEQA for expansion'
WHERE name = 'B-25. Sanitation District Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = 'PRC 5001-5076.3; PRC 5780-5791; Gov. Code 53090-53097.5; ADA Title II (28 CFR 35.150)',
  standards_of_creation = 'District formation per PRC 5780; park master plan per CEQA; Prop 68/84 grant compliance per DPR; ADA audit per 28 CFR 35.150; recreation records; user fee study; Quimby Act fee per Gov. Code 66477; landscape/lighting assessment per SHC 22500',
  soc_controls = 'Brown Act; independent audit per Gov. Code 26909; DPR grant monitoring; ADA transition plan; Quimby fee accounting; CEQA review; Prop 218 fee hearing; State Controller reporting'
WHERE name = 'B-26. Parks and Recreation District Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSC 2000-2093; HSC 116110-116068; FAC 12751-14102; 40 CFR 152-180 (FIFRA)',
  standards_of_creation = 'Surveillance report per district protocol; PUR filing with DPR per FAC 12753; IPM plan per MVCAC BMP; public notification for treatments per HSC 2000; annual audit; CEQA for treatment; WNV monitoring per CDPH; special tax per Prop 218',
  soc_controls = 'DPR PUR compliance; NPDES for pesticide in water; qualified applicator per FAC 12201; public notification; independent audit; MVCAC surveillance coordination; environmental monitoring; Prop 218 voter approval'
WHERE name = 'B-27. Mosquito Abatement District Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSC 7000-8030; HSC 8890-9068; BPC 7600-7741 (Cemetery and Funeral Bureau)',
  standards_of_creation = 'Interment record per HSC 8740; endowment care fund report per BPC 7726; plot sales contract per HSC 8925; annual audit per Gov. Code 26909; master plan per CEQA; fee schedule; State Controller financial transactions report; grave relocation per HSC 8540',
  soc_controls = 'Cemetery Bureau oversight per BPC 7600; endowment care minimums per BPC 7726; independent audit; Brown Act; permanent plot records; environmental compliance; fee public notice; State Controller reporting'
WHERE name = 'B-28. Cemetery District Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'Educ. Code 18010-18203; Educ. Code 19400-19605; Gov. Code 6250-6270/6267 (patron privacy)',
  standards_of_creation = 'Collection development per ALA standards; services plan per State Library requirements; patron privacy per Gov. Code 6267; annual statistics per Educ. Code 18020; LSTA/CLSA grant compliance; ADA plan per 28 CFR 35.150; technology plan; intellectual freedom per ALA Bill of Rights',
  soc_controls = 'State Library oversight; patron privacy (Gov. Code 6267); LSTA grant audit; ADA transition plan; intellectual freedom complaint process; bond expenditure accountability; independent audit; collection diversity standards'
WHERE name = 'B-29. Library District Director';

UPDATE citizen_catalog SET
  governing_guidelines = 'Educ. Code 35000-35179; Educ. Code 42100-42652; Cal. Const. Art. IX; 20 USC 1232g (FERPA); Educ. Code 49060-49079',
  standards_of_creation = 'LCAP per Educ. Code 52060; SARC per Educ. Code 35256; budget per Educ. Code 42100; Williams compliance per Educ. Code 35186; SELPA per Educ. Code 56195; Title IX per 34 CFR 106; school safety plan per Educ. Code 32280; facilities master plan per Educ. Code 17070',
  soc_controls = 'EAAP audit standards; CDE monitoring; FCMAT fiscal review; LCAP stakeholder engagement; Williams complaint process; FERPA protections; EERA collective bargaining; Brown Act; County Superintendent oversight per Educ. Code 42127'
WHERE name = 'B-30. School District Superintendent';

UPDATE citizen_catalog SET
  governing_guidelines = 'Educ. Code 70900-87913; Cal. Code Regs. tit. 5 51000-59410; Cal. Const. Art. IX sec. 14; ACCJC standards',
  standards_of_creation = 'Student Success Metrics per tit. 5; ACCJC self-evaluation; annual audit per Educ. Code 84040; FTES accounting per tit. 5 58000; 50% law per Educ. Code 84362; EEO plan per tit. 5 53000; student equity plan per Educ. Code 78220; Prop 39 bond audit per Educ. Code 15278',
  soc_controls = 'ACCJC accreditation cycle; Chancellors Office review; 50% law monitoring; independent audit; FON compliance; BOG oversight; Prop 39 citizens oversight; Brown Act; FCMAT review authority'
WHERE name = 'B-31. Community College District Chancellor';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 56000-57550 (Cortese-Knox-Hertzberg); CEQA (PRC 21000+)',
  standards_of_creation = 'Municipal service review per Gov. Code 56430; sphere of influence per Gov. Code 56425; annexation/detachment per Gov. Code 56650; CEQA document; protest proceeding per Gov. Code 57000; terms and conditions resolution; DUC analysis per Gov. Code 56430(a)(2); island annexation per Gov. Code 56375.3',
  soc_controls = 'Independent LAFCO commission; CEQA lead agency; protest hearing per Gov. Code 57000; public notice and hearing; sphere of influence consistency; State Controller report; OPR consultation; LAFCO budget adoption'
WHERE name = 'B-32. LAFCO Executive Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Pen. Code 888-939.91; Gov. Code 3060-3075; Pen. Code 919; Pen. Code 925',
  standards_of_creation = 'Final report per Pen. Code 933; indictment per Pen. Code 889; operational review per Pen. Code 925; facility inspection per Pen. Code 919; accusation per Gov. Code 3060; mandatory agency response (60/90 day) per Pen. Code 933; continuity report',
  soc_controls = 'Independence from county operations; confidential investigation per Pen. Code 924.2; mandatory agency response per Pen. Code 933(c); Superior Court oversight; juror confidentiality oath; multi-year tracking; public report; complaint intake; indictment review per Pen. Code 939.8'
WHERE name = 'B-33. Grand Jury Foreperson';

UPDATE citizen_catalog SET
  governing_guidelines = 'PRC 21000-21189.70; Cal. Code Regs. tit. 14 15000-15387; PRC 21091; PRC 21080.3.1 (AB 52)',
  standards_of_creation = 'Initial study per Guidelines 15063; ND per 15070; EIR per 15080-15132; NOP/NOD/NOC/NOE per Guidelines; MMRP per PRC 21081.6; findings of overriding consideration per Guidelines 15093; AB 52 tribal consultation per PRC 21080.3.1; SB 18 per Gov. Code 65352.3',
  soc_controls = 'Lead agency per Guidelines 15051; public review (30/45 days per PRC 21091); responsible/trustee agency consultation; State Clearinghouse per PRC 21083; challenge per PRC 21167-21168; mitigation monitoring; categorical exemption per 15300-15333; SOL (30/35 days per PRC 21167)'
WHERE name = 'C-1. CEQA Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSC 25249.5-25249.14 (Prop 65); Cal. Code Regs. tit. 27 25000-27001; OEHHA safe harbor levels',
  standards_of_creation = 'Warning assessment per tit. 27 25601-25607.2; safe harbor warning per tit. 27 25607.1; 60-day notice per HSC 25249.7(d); exposure assessment per OEHHA NSRL/MADL; product testing records; short-form/long-form warning per tit. 27 25603; OEHHA listed chemical analysis',
  soc_controls = 'OEHHA listing process; 60-day notice before private enforcement; safe harbor per tit. 27 25600; settlement public reporting per HSC 25249.7(f); annual reporter discharge per HSC 25249.12; burden on business for exposure levels; AG/DA/city attorney enforcement'
WHERE name = 'C-2. Proposition 65 Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Civ. Code 1798.100-1798.199.100 (CCPA/CPRA); Cal. Code Regs. tit. 11 7000-7102; Cal. Const. Art. I sec. 1',
  standards_of_creation = 'Privacy policy per Civ. Code 1798.130; consumer rights processing per Civ. Code 1798.100-1798.125; data processing agreement per Civ. Code 1798.100(d); DPIA per tit. 11 7050-7053; service provider agreement per Civ. Code 1798.140(ag); opt-out signal per tit. 11 7025; cybersecurity audit per tit. 11 7122-7124; risk assessment per tit. 11 7120',
  soc_controls = 'CPPA enforcement; 45-day response deadline per Civ. Code 1798.130(a)(2); identity verification per tit. 11 7060-7064; cybersecurity audit for high-risk; risk assessment to CPPA; employee privacy notice; children opt-in per Civ. Code 1798.120(d); data broker registration per Civ. Code 1798.99.80'
WHERE name = 'C-3. CCPA/CPRA Privacy Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'PRC 42652.5-42654; Cal. Code Regs. tit. 14 18981-18998; PRC 41780.01 (75% reduction by 2025)',
  standards_of_creation = 'Jurisdiction implementation per tit. 14 18981.2; organic waste collection per tit. 14 18984; edible food recovery per tit. 14 18991; contamination monitoring per tit. 14 18984.5; annual CalRecycle report; recycled organic procurement per tit. 14 18993; enforcement per tit. 14 18995; route review per tit. 14 18984.5',
  soc_controls = 'CalRecycle compliance review; contamination monitoring minimums; edible food recovery capacity; enforcement escalation per tit. 14 18995.1-18995.4; de minimis waivers per tit. 14 18984.11; annual reporting; procurement verification; self-hauler monitoring per tit. 14 18988'
WHERE name = 'C-4. SB 1383 Organic Waste Compliance Monitor';

UPDATE citizen_catalog SET
  governing_guidelines = 'Lab. Code 2775-2787 (AB 5/AB 2257); UIC 621(b), 606.5; Dynamex (2018); Borello v. Dept. of Industrial Relations',
  standards_of_creation = 'ABC test three-prong analysis per Lab. Code 2775; IC agreement review; EDD determination (DE 1870); Borello analysis for exemptions per Lab. Code 2776; B2B exemption per Lab. Code 2776; professional services per Lab. Code 2778; industry exemptions per Lab. Code 2783-2787',
  soc_controls = 'EDD appeal per UIC 1222; Labor Commissioner per Lab. Code 98; AG enforcement per Lab. Code 2786; presumption of employee status; retroactive reclassification risk; EDD/IRS coordination; joint employer analysis; Dynamex retroactivity per Vazquez v. Jan-Pro'
WHERE name = 'C-5. AB 5/ABC Test Worker Classification Auditor';

UPDATE citizen_catalog SET
  governing_guidelines = 'Lab. Code 2698-2699.8 (PAGA); Lab. Code 200-243, 510-558 (wage/hour)',
  standards_of_creation = 'LWDA notice per Lab. Code 2699.3; LWDA response documentation (65-day wait); representative complaint per Lab. Code 2699(a); settlement approval per Lab. Code 2699(l); penalty allocation (75% LWDA/25% employees); cure documentation per Lab. Code 2699.3(c); manageability analysis',
  soc_controls = 'LWDA notice jurisdictional prerequisite; 65-day waiting period; court settlement approval per Lab. Code 2699(l); 75/25 split enforcement; cure opportunity; standing (aggrieved employee per Lab. Code 2699(c)); 1-year SOL per Lab. Code 2699.3(d); distribution accountability'
WHERE name = 'C-6. PAGA Claims Administrator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Civ. Code 51-53 (Unruh); Civ. Code 51.7 (Ralph); Civ. Code 52.1 (Bane); 42 USC 12101+ (ADA incorporated)',
  standards_of_creation = 'Discrimination investigation per CRD; accommodation access audit per Unruh/ADA; ADA nexus analysis per Munson v. Del Taco; Ralph Act report per Civ. Code 51.7; Bane Act investigation per Civ. Code 52.1; website accessibility per WCAG 2.1 AA; CASp inspection per Civ. Code 55.53; pre-litigation demand per Civ. Code 55.3',
  soc_controls = 'CRD administrative process; $4,000 minimum per Civ. Code 52(a); CASp program per Civ. Code 55.53; pre-litigation notice per Civ. Code 55.3; ADA Title III coordination; Ralph Act enhanced damages; Bane Act injunctive relief; WCAG 2.1 AA standards'
WHERE name = 'C-7. Unruh Civil Rights Act Compliance Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'Civ. Code 1788-1788.33 (Rosenthal); 15 USC 1692 (FDCPA incorporated); Civ. Code 1812.700 (medical debt per AB 1020)',
  standards_of_creation = 'Collection communication review per Civ. Code 1788.11-1788.17; validation notice per Civ. Code 1788.14(a)/15 USC 1692g; cease and desist per Civ. Code 1788.21; time-barred debt disclosure per CCP 337-340; credit reporting dispute per FCRA 15 USC 1681s-2; original creditor audit per Civ. Code 1788.2(c); medical debt per AB 1020',
  soc_controls = 'DFPI licensing; FDCPA/Rosenthal dual compliance; statutory damages per Civ. Code 1788.30; 30-day validation period per 15 USC 1692g; cease and desist tracking; time-barred disclosure verification; credit reporting accuracy; medical debt restrictions per AB 1020; DFPI complaint tracking'
WHERE name = 'C-8. Rosenthal Fair Debt Collection Practices Act Auditor';

UPDATE citizen_catalog SET
  governing_guidelines = 'Civ. Code 1790-1795.8 (Song-Beverly); Civ. Code 1793.2(d) (replacement/refund); Civ. Code 1793.22 (presumption)',
  standards_of_creation = 'Repair history per Civ. Code 1793.1; reasonable attempts analysis per Civ. Code 1793.22 (4 attempts or 30 days); buyback/replacement per Civ. Code 1793.2(d); restitution calculation (mileage offset per Civ. Code 1793.2(d)(2)); civil penalty per Civ. Code 1794(c) (up to 2x); DCA arbitration per Civ. Code 1793.22(e)',
  soc_controls = 'Manufacturer disclosure at sale; DCA arbitration certification; used vehicle warranty per Civ. Code 1795.5; mileage offset methodology; TSB tracking; repair order documentation; consumer rights notification per Civ. Code 1793.1; willfulness standard'
WHERE name = 'C-9. Song-Beverly Consumer Warranty Act Analyst (Lemon Law)';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 12900-12996 (FEHA); Cal. Code Regs. tit. 2 11000-11141; 42 USC 2000e (Title VII coordination)',
  standards_of_creation = 'CRD complaint investigation per Gov. Code 12960; right-to-sue per Gov. Code 12965; investigation file per CRD procedures; mediation per Gov. Code 12963; SB 1343 training per Gov. Code 12950.1; reasonable accommodation per tit. 2 11068; pregnancy disability per tit. 2 11035',
  soc_controls = 'CRD independence; 1-year filing per Gov. Code 12960(e); right-to-sue within 150 days; mediation confidentiality per Gov. Code 12963.7; retaliation protection per Gov. Code 12940(h); training retention (2 years per tit. 2 11024(c)); McDonnell Douglas burden-shifting; EEOC/CRD dual-filing'
WHERE name = 'C-10. FEHA Employment Discrimination Investigator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 12945.1-12945.2 (CFRA); Cal. Code Regs. tit. 2 11087-11097; 29 USC 2601-2654 (FMLA)',
  standards_of_creation = 'Leave request per tit. 2 11091; medical certification per tit. 2 11091.3; designation notice per tit. 2 11091.2; fitness-for-duty per tit. 2 11091.4; intermittent leave per tit. 2 11090(b); key employee analysis per tit. 2 11089; CFRA/FMLA concurrent tracking; reinstatement per tit. 2 11089.1',
  soc_controls = 'Notice posting per tit. 2 11095; medical certification confidentiality; retaliation protection per Gov. Code 12945.2(l); leave balance accuracy; health benefit continuation; same/comparable position reinstatement; intermittent minimum increment; PDL/FMLA/paid leave coordination'
WHERE name = 'C-11. CFRA Leave Administrator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Lab. Code 1400-1408 (Cal-WARN); 29 USC 2101-2109 (federal WARN); Lab. Code 1401 (60-day notice)',
  standards_of_creation = '60-day written notice per Lab. Code 1401 (employees, EDD, LWDA, local elected official); relocation determination (100+ miles per Lab. Code 1400(h)); notification letter content per Lab. Code 1401(b); conditional notice; faltering company defense per Lab. Code 1402.5; unforeseeable circumstance per Lab. Code 1402.5; back pay calculation per Lab. Code 1402',
  soc_controls = 'EDD Rapid Response notification; LWDA filing; 60-day enforcement; back pay liability (up to 60 days per Lab. Code 1402); mass layoff definition (50+ per Lab. Code 1400(d)); relocation distance calculation; exception documentation; civil penalty for willful failure'
WHERE name = 'C-12. California WARN Act Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Const. Art. I sec. 28 (Prop 9/Marsys Law); Pen. Code 679-680.4; Pen. Code 1191.1-1191.25; Pen. Code 3043-3043.25',
  standards_of_creation = 'Victim notification (arrest, charges, hearings, release) per Cal. Const. Art. I sec. 28(b)(7); restitution order per Pen. Code 1202.4; victim impact statement per Pen. Code 1191.1; parole hearing notification per Pen. Code 3043.25; protective order per Pen. Code 136.2; VINE registration per Cal. Const. Art. I sec. 28(b)(10); property return per Cal. Const. Art. I sec. 28(b)(14)',
  soc_controls = 'Constitutional enforcement per Cal. Const. Art. I sec. 28(c); VINE automated notification; victim advocate tracking; DA victim-witness compliance; restitution monitoring per Pen. Code 1202.42; protective order service; parole notification timeline; victim privacy per Pen. Code 679.026'
WHERE name = 'C-13. Marsy';

UPDATE citizen_catalog SET
  governing_guidelines = 'Pen. Code 667(b)-(i), 1170.12 (Three Strikes); Pen. Code 1170.126 (Prop 36); Pen. Code 1170.18 (Prop 47); Cal. Const. Art. I sec. 32 (Prop 57)',
  standards_of_creation = 'Strike prior documentation per Pen. Code 667(b); Prop 36 petition per Pen. Code 1170.126; Prop 47 petition per Pen. Code 1170.18; Prop 57 parole per Cal. Const. Art. I sec. 32; CDCR credit-earning per 15 CCR 3043; dangerousness per People v. Kaulick; criminal history (RAP) per Pen. Code 11105',
  soc_controls = 'Court petition review; DA opposition; victim notice per Marsys Law; CDCR credit accuracy; dangerousness standard per Pen. Code 1170.18(c); RAP sheet verification; statutory timeline; appellate review of denial'
WHERE name = 'C-14. Three Strikes/Prop 36/Prop 47/Prop 57 Sentencing Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 65852.21 (SB 9); Gov. Code 65913.5 (SB 10); Gov. Code 65589.5 (HAA); Gov. Code 65915 (density bonus)',
  standards_of_creation = 'SB 9 lot split review per Gov. Code 65852.21; owner-occupancy affidavit (3-year) per Gov. Code 65852.21(g); objective design per Gov. Code 65913.4; demolition history (no Ellis within 15 years) per Gov. Code 65852.21(a)(3); SB 10 resolution per Gov. Code 65913.5; density bonus per Gov. Code 65915; SB 35 per Gov. Code 65913.4',
  soc_controls = 'Ministerial approval (no discretionary review); HAA denial standard per Gov. Code 65589.5(d); HCD oversight/AG referral; objective standard limitation; 60-day processing per PSA; density bonus calculation; affidavit enforcement; Ellis Act history verification'
WHERE name = 'C-15. SB 9/SB 10 Housing Compliance Planner';

UPDATE citizen_catalog SET
  governing_guidelines = 'Civ. Code 1947.12-1947.13 (AB 1482); Civ. Code 1954.50-1954.535 (Costa-Hawkins); local rent stabilization ordinances',
  standards_of_creation = 'Rent increase per AB 1482 (CPI+5%, max 10%) per Civ. Code 1947.12; just cause eviction per Civ. Code 1946.2; vacancy decontrol per Civ. Code 1954.53; AB 1482 exemption per Civ. Code 1947.12(d); relocation assistance per Civ. Code 1946.2(d); capital improvement passthrough per local ordinance; Ellis Act per Gov. Code 7060',
  soc_controls = 'Rent board registration; CPI cap verification; just cause documentation; Costa-Hawkins eligibility; AB 1482 notice of exemption per Civ. Code 1947.12(d)(5); habitability complaint investigation; relocation verification; rent board hearing'
WHERE name = 'C-16. Costa-Hawkins/Rent Stabilization Compliance Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 7060-7060.7 (Ellis Act); local implementation ordinances',
  standards_of_creation = 'Notice of intent per Gov. Code 7060.4; 120-day/1-year notification per Gov. Code 7060.4(b); elderly/disabled extended notice (1 year) per Gov. Code 7060.4(b); relocation assistance per local ordinance; recorded memorandum per Gov. Code 7060.6; re-rental restriction (5/10 year) per Gov. Code 7060.2; tenant right of first refusal per Gov. Code 7060.2(a)',
  soc_controls = 'City notification filing; recorded withdrawal memorandum; re-rental restriction enforcement per Gov. Code 7060.2; elderly/disabled protection verification; relocation documentation; rescission per Gov. Code 7060.5; 10-year restriction for demolished/converted'
WHERE name = 'C-17. Ellis Act Compliance Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 51200-51297.4 (Williamson Act); RTC 421-423; Gov. Code 51220-51262 (Farmland Security Zone)',
  standards_of_creation = 'Preserve establishment per Gov. Code 51230; contract execution per Gov. Code 51240; non-renewal and 9-year phase-out per Gov. Code 51245; cancellation petition per Gov. Code 51282; FSZ contract per Gov. Code 51296; compatible use per Gov. Code 51238; restricted value per RTC 423',
  soc_controls = 'Board of supervisors approval; assessor independent valuation per RTC 423; Dept. of Conservation biennial report; non-renewal 9-year enforcement; cancellation findings per Gov. Code 51282; 12.5% cancellation fee per Gov. Code 51283; subvention verification; county compatible use determination'
WHERE name = 'C-18. Williamson Act Administrator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 54950-54963 (Brown Act); Cal. Const. Art. I sec. 3(b)(1)',
  standards_of_creation = 'Regular agenda (72-hr per Gov. Code 54954.2); special agenda (24-hr per Gov. Code 54956); closed session description per Gov. Code 54954.5; closed session report per Gov. Code 54957.1; teleconference per AB 2449 (Gov. Code 54953(e)); minutes/recordings; cure/correct response per Gov. Code 54960.1; serial meeting analysis',
  soc_controls = 'DA enforcement per Gov. Code 54960; cure/correct (30-day per Gov. Code 54960.1); action voidability per Gov. Code 54960.1; AB 2449 teleconference; public comment per Gov. Code 54954.3; agenda specificity; standing committee analysis per Gov. Code 54952(b); misdemeanor per Gov. Code 54959'
WHERE name = 'C-19. Brown Act Compliance Advisor';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 7920.000-7931.000 (CPRA 2023); Cal. Const. Art. I sec. 3(b)',
  standards_of_creation = 'Response per Gov. Code 7922.535 (10-day); exemption justification per Gov. Code 7922.000; redaction log; fee calculation per Gov. Code 7922.530; electronic format per Gov. Code 7922.570; Vaughn index; proactive disclosure per Gov. Code 7922.610; records retention schedule',
  soc_controls = '10-day deadline per Gov. Code 7922.535; 14-day extension; court enforcement per Gov. Code 7923.000; attorney fees for prevailing requesters; elected official communications subject to CPRA; segregable portions; narrow exemption construction per Gov. Code 7921.000; retention compliance'
WHERE name = 'C-20. California Public Records Act (CPRA) Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 81000-91015 (PRA); Cal. Code Regs. tit. 2 18110-18997; Gov. Code 1090-1099',
  standards_of_creation = 'Conflict code biennial review per Gov. Code 87306; Form 700 compliance per Gov. Code 87200; contribution limit tracking; mass mailing analysis per Gov. Code 89001; gift limit ($590 per Gov. Code 89503); revolving door per Gov. Code 87406; behested payment per Gov. Code 82004.5; Section 1090 analysis per Gov. Code 1090; incompatible office per Gov. Code 1099',
  soc_controls = 'FPPC enforcement; conflict code FPPC approval; automatic late penalties per Gov. Code 91013; public access; whistleblower protection per Gov. Code 91000.5; DA prosecution referral; gift documentation; 5-year SOL per Gov. Code 91000; independent ethics advisory'
WHERE name = 'C-21. Political Reform Act Compliance Advisor';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSC 1340-1399.907 (Knox-Keene); Cal. Code Regs. tit. 28; HSC 1367.01 (parity); SB 17 (drug transparency)',
  standards_of_creation = 'License application/renewal per HSC 1351; network adequacy per HSC 1367.03; grievance/appeal per HSC 1368; IMR per HSC 1374.30; TNE solvency per HSC 1375; HEDIS reporting per HSC 1380; UM policy per HSC 1367.01; SB 17 drug transparency per HSC 1367.243; surprise billing per AB 72',
  soc_controls = 'DMHC licensure/examination; IMR independence per HSC 1374.30; TNE quarterly monitoring; complaint tracking per HSC 1368.02; DMHC help center; NCQA/HEDIS measurement; mental health parity audit; network adequacy annual report; premium rate filing; cultural/linguistic assessment per HSC 1367.04'
WHERE name = 'C-22. Knox-Keene Health Plan Compliance Officer';


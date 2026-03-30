-- ============================================================================
-- Triple Constraint UPDATE Statements
-- Elections/Voting, Census/Demographics, Emergency Management (171 personas)
-- California Local Government & Unique Laws (78 personas)
-- Generated: 2026-03-29
-- Total: 249 personas
-- Uses WHERE name LIKE '%...%' for flexible matching
-- governing_guidelines: statute/regulation creating the document obligation
-- standards_of_creation: professional standard defining HOW documents must be created
-- soc_controls: integrity/security framework verifying documents were created correctly
-- All standards bodies, certifications, and methodologies are REAL.
-- ============================================================================

-- ============================================================================
-- SECTION A: ELECTIONS / VOTING (62 Personas)
-- ============================================================================

-- A1. VOTER REGISTRATION AND ROLL MAINTENANCE (8 Personas)

UPDATE citizen_catalog SET
  governing_guidelines = 'NVRA 52 USC 20501-20511; HAVA 52 USC 20901-21145; Cal. Elec. Code 2000-2194 (Voter Registration); Cal. Elec. Code 2102 (Affidavit of Registration); Cal. Elec. Code 2122 (County elections official authority); 11 CFR Part 8 (NVRA regulations); Motor Voter 52 USC 20504',
  standards_of_creation = 'Voter registration affidavit completeness per Cal. Elec. Code 2150-2194; citizenship attestation under penalty of perjury; residence address verification protocols; same-day/conditional voter registration processing per Cal. Elec. Code 2170; online voter registration data integrity per Cal. Elec. Code 2196; registration database entry within mandated timelines',
  soc_controls = 'Dual-verification of registration data entry; VoteCal statewide voter database access controls; audit trail for every registration change; retention 5 years federal elections per 52 USC 20701 and 4 years state per Cal. Elec. Code 17300'
WHERE name LIKE '%Registrar of Voters%';

UPDATE citizen_catalog SET
  governing_guidelines = 'NVRA Section 8 (52 USC 20507) list maintenance; HAVA Section 303 (52 USC 21083) statewide voter registration database; Cal. Elec. Code 2200-2227 (Cancellations and changes); Cal. Elec. Code 2220 (Cross-state duplicate checking); ERIC data sharing agreements; Husted v. A. Philip Randolph Institute 138 S.Ct. 1833 (2018) purge procedures',
  standards_of_creation = 'Address confirmation mailing before removal per NVRA safe harbor; two federal general election waiting period before cancellation; felony conviction cross-check with DOJ records; death record cross-reference with CDPH vital statistics; duplicate registration resolution protocols; NCOA processing',
  soc_controls = 'No single-actor voter removal authority; public list maintenance reports required; 90-day pre-election systematic purge blackout per 52 USC 20507(c)(2); written notice to voter before any status change; audit log of all removals with reason codes'
WHERE name LIKE '%Voter File Maintenance%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 2138-2148 (3PVRO requirements); 52 USC 20505 (Mail voter registration); Cal. Elec. Code 2159 (Submission deadline 3 days); Cal. Elec. Code 18100-18108 (Registration fraud penalties)',
  standards_of_creation = '3PVRO registration with Secretary of State; submission of collected registrations within 3 days of signing; voter receipt distribution requirements; prohibition on compensation per-registration; training documentation for registration collectors',
  soc_controls = '3PVRO annual registration and renewal; chain of custody for collected registration forms; criminal penalties for registration fraud per Cal. Elec. Code 18100; pre-circulated disclosure statement on forms'
WHERE name LIKE '%3PVRO%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 3019 (VBM signature comparison); Cal. Elec. Code 105 (Signature verification standards); Cal. Elec. Code 15104 (Provisional ballot signature verification); HAVA Section 303(b) (ID verification for first-time voters); Soltysik v. Padilla settlement standards',
  standards_of_creation = 'Multi-reference signature comparison not single exemplar; cure notice and 28-day cure period for signature discrepancies; bipartisan review team requirements; consistent signature comparison training; documentation of match/mismatch determination rationale',
  soc_controls = 'Minimum two reviewers for rejection determination; voter notification and cure opportunity before rejection; training certification for all signature reviewers; random audit sampling of accepted signatures; appeal process documentation'
WHERE name LIKE '%Signature Verification%';

UPDATE citizen_catalog SET
  governing_guidelines = 'UOCAVA 52 USC 20301-20311; MOVE Act 52 USC 20301 note; Cal. Elec. Code 300-304 (Military/overseas voters); 11 CFR Part 110 (UOCAVA implementation); 45-day ballot transmission requirement 52 USC 20302(a)(8)',
  standards_of_creation = 'FPCA processing; FWAB acceptance criteria; electronic ballot delivery where authorized; 45-day pre-election ballot transmission deadline; ballot tracking and confirmation systems',
  soc_controls = 'FVAP reporting compliance; separate tracking log for UOCAVA ballots; extended receipt deadline compliance; data encryption for electronic ballot transmission; bipartisan processing teams'
WHERE name LIKE '%UOCAVA%';

UPDATE citizen_catalog SET
  governing_guidelines = 'VRA Section 203 (52 USC 10503) language minority requirements; Cal. Elec. Code 14201-14202 (Bilingual poll workers); Cal. Elec. Code 2103(d) (Registration in languages other than English); Census Bureau Section 203 coverage determinations; EO 13166 (Limited English Proficiency)',
  standards_of_creation = 'Translated registration materials accuracy; bilingual poll worker staffing thresholds per precinct; translated ballot accuracy and equivalency review; audio ballot and accessible voting system language options; facsimile ballot availability in covered languages',
  soc_controls = 'Community advisory board review of translations; certified translator attestation for ballot translations; DOJ preclearance records (historical Section 5 jurisdictions); complaint tracking and resolution documentation; language needs assessment methodology'
WHERE name LIKE '%Language Access%';

UPDATE citizen_catalog SET
  governing_guidelines = 'ADA Title II (42 USC 12131-12134) public entity accessibility; HAVA Section 301 (52 USC 21081) voting system accessibility; Cal. Elec. Code 19225 (Accessible voting system requirements); Cal. Elec. Code 2300 (Curbside voting); 28 CFR 35.150 (Existing facilities accessibility)',
  standards_of_creation = 'Polling place ADA accessibility survey completion; accessible voting unit deployment per location; RAVBM system availability; audio ballot interface testing and certification; tactile/sip-and-puff device compatibility verification',
  soc_controls = 'Pre-election polling place accessibility surveys; accessible voting equipment testing logs; voter complaint tracking for accessibility issues; poll worker disability awareness training records; alternate voting location designation procedures'
WHERE name LIKE '%Accessible Voting%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 2188 (High school voter pre-registration); Cal. Elec. Code 9084 (County Voter Information Guide); HAVA Section 302 (52 USC 21082) provisional voting information; NVRA Section 7 (52 USC 20506) agency voter registration; Cal. Elec. Code 12108 (Polling place notification)',
  standards_of_creation = 'County Voter Information Guide content accuracy and mailing timelines; new citizen registration outreach coordination with USCIS; high school pre-registration program administration; agency-based registration (DMV, social services) compliance; public service announcement accuracy',
  soc_controls = 'Publication deadlines enforcement; translation review for outreach materials; expenditure tracking for voter education funds; impartiality requirements in publicly funded outreach'
WHERE name LIKE '%Voter Education Program%';

-- A2. BALLOT DESIGN, CERTIFICATION, AND VOTING SYSTEMS (8 Personas)

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 13100-13116 (Form of ballot); Cal. Elec. Code 13200-13211 (Ballot printing); Cal. Elec. Code 13262-13282 (Ballot measures arguments/rebuttals); HAVA Section 301(a)(1) voter intent capture; Cal. Elec. Code 13004 (Randomized Alphabet)',
  standards_of_creation = 'Candidate name rotation per SOS randomized alphabet; ballot measure argument/rebuttal word count limits per Cal. Elec. Code 13262-13282; font size minimums per Cal. Elec. Code 13107; clear instructions placement; ballot stock and printing security specifications; proof review and certification timeline',
  soc_controls = 'Multi-party proof review before printing; chain of custody from printer to storage to distribution; ballot numbering/serialization tracking; spoiled ballot accounting procedures; ballot inventory reconciliation'
WHERE name LIKE '%Ballot Composition%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 19000-19007 (Voting system definitions); Cal. Elec. Code 19200-19224 (Certification procedures); Cal. Elec. Code 19210 (Application for certification); Cal. Elec. Code 19211 (30-day public comment); EAC VVSG 2.0; HAVA Section 301 (52 USC 21081)',
  standards_of_creation = 'Functional testing against VVSG standards; source code review and escrow requirements; penetration testing and security vulnerability assessment; accessibility compliance testing (Section 301 HAVA); volume/stress testing for election day loads; hardware and software certification documentation',
  soc_controls = 'Independent testing laboratory VSTL accreditation; 30-day public review period before certification per Cal. Elec. Code 19211; conditional approval with remediation tracking; version control for certified systems; vendor cost-bearing per Cal. Elec. Code 19222; decertification procedures'
WHERE name LIKE '%Voting System%Certification%';

UPDATE citizen_catalog SET
  governing_guidelines = 'CISA Election Infrastructure Security Guidelines; EI-ISAC protocols; NIST SP 800-53 (Security controls); HAVA Section 301(a)(2) audit capacity; Cal. Elec. Code 19205 (Voting system security); HSPD-7 Critical Infrastructure; DHS election infrastructure designation Jan 2017',
  standards_of_creation = 'Pre-election logic and accuracy testing; post-election risk-limiting audit procedures; network isolation and air-gap compliance for voting systems; USB/removable media chain of custody; intrusion detection deployment for election networks; tabulation system hash verification',
  soc_controls = 'Multi-factor authentication for system access; physical seal logs for voting equipment; background checks for all personnel with system access; incident response plan specific to election systems; CISA vulnerability scanning participation; post-election system image preservation'
WHERE name LIKE '%Voting System Security%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 15000 (Canvass general provisions); Cal. Elec. Code 10009 (Public testing of voting equipment); HAVA Section 301(a)(5) error rate standards; EAC Testing and Certification Program Manual; Cal. Elec. Code 19360-19367 (Post-election manual tally)',
  standards_of_creation = 'Pre-programmed test deck creation with known outcomes; public notice and observation opportunity 72-hour notice; zero-count verification before testing; every race/contest tested with over-votes, under-votes, write-ins; results comparison against known test deck outcomes; bipartisan witness signatures',
  soc_controls = 'Public observation requirement; bipartisan testing board composition; sealed test decks with chain of custody; written certification of pass/fail per device; retest procedures for failed equipment'
WHERE name LIKE '%Logic and Accuracy%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 13004 (Ballot forms for electronic systems); Cal. Elec. Code 13200-13211 (Ballot printing requirements); Secretary of State Ballot Printing Specifications; VVSG 2.0 ballot marking device standards',
  standards_of_creation = 'Correct precinct/ballot style assignment per voter record; print quality standards scan readability thresholds; ballot stock authentication features (watermarks, serialization); real-time ballot style database synchronization; printer calibration verification logs',
  soc_controls = 'Access control for ballot-on-demand printers; ballot issuance log with voter record linkage; duplicate ballot prevention controls; waste/spoiled ballot secure destruction log; bipartisan oversight of ballot issuance'
WHERE name LIKE '%Ballot-on-Demand%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 15360 (1% manual tally requirement); Cal. Elec. Code 19360-19367 (Post-election audit procedures); HAVA Section 301(a)(2) audit trail requirements; SOS Post-Election Manual Tally Guide; Risk-Limiting Audit Lindeman-Stark methodology',
  standards_of_creation = 'Random precinct/batch selection methodology via public draw; manual tally procedures with bipartisan teams; discrepancy escalation thresholds and expanded count triggers; chain of custody for audited ballots; statistical confidence level documentation for RLA; official canvass certification within 28 days per Cal. Elec. Code 15372',
  soc_controls = 'Public observation of audit proceedings; bipartisan audit board composition; independent random selection (dice/random number generator); discrepancy resolution and escalation protocols; audit report publication requirement'
WHERE name LIKE '%Post-Election Audit%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 9160-9169 (County ballot measure arguments); Cal. Elec. Code 13262-13282 (State ballot measure arguments); Cal. Elec. Code 9050-9056 (Fiscal impact statements); Cal. Elec. Code 9080-9082 (Impartial analysis)',
  standards_of_creation = 'Argument word count limits 300 words argument, 250 words rebuttal; filing deadline compliance; priority submission rights (author, governing body, then voters); impartial analysis drafting by county counsel/LAO; fiscal impact statement preparation by finance officer',
  soc_controls = 'Filing deadline enforcement with timestamped receipt; content review for prohibited statements per case law; author identity verification; publication proof review by all parties'
WHERE name LIKE '%Ballot Measure%Argument%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 13102 (Ballot form ranked choice provisions); local municipal codes authorizing RCV (e.g., San Francisco Charter Sec. 13.102); FairVote RCV best practices; EAC VVSG provisions for alternative voting methods',
  standards_of_creation = 'Round-by-round tabulation with published results per round; exhausted ballot tracking and classification; overvote and skipped-ranking handling rules; cast vote record generation for audit trail; batch elimination procedures where authorized',
  soc_controls = 'Algorithm certification by SOS before use; public observation of tabulation rounds; CVR publication for independent verification; complete round-by-round results archival'
WHERE name LIKE '%Ranked Choice Voting%';

-- A3. POLL OPERATIONS AND ELECTION DAY MANAGEMENT (8 Personas)

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 12100-12108 (Precinct board appointment); Cal. Elec. Code 12302-12328 (Precinct board duties); Cal. Elec. Code 14200-14210 (Conduct of elections at polling places); HAVA Section 302 (52 USC 21082) provisional voting; Cal. Elec. Code 14310 (Assistance to voters)',
  standards_of_creation = 'Polling place opening/closing procedures with bipartisan witness; voter check-in and roster reconciliation; provisional ballot issuance and envelope completion; spoiled ballot exchange documentation; ballot box seal integrity maintenance; voter assistance documentation',
  soc_controls = 'Bipartisan precinct board composition; oath of office administration before service; mandatory training completion certification; equipment seal number recording on opening/closing; chain of custody for election materials to/from polling place'
WHERE name LIKE '%Poll Worker%';

UPDATE citizen_catalog SET
  governing_guidelines = 'HAVA Section 302(a) (52 USC 21082) provisional voting right; Cal. Elec. Code 14310 (Provisional ballot provisions); Cal. Elec. Code 15100-15112 (Processing provisional ballots); Cal. Elec. Code 3015 (Voter notification of status)',
  standards_of_creation = 'Eligibility determination checklist completion; registration verification through VoteCal database; correct precinct/jurisdiction validation; envelope information completeness review; voter notification of counted/not-counted status with reason',
  soc_controls = 'Bipartisan determination teams; written determination rationale for each rejection; voter notification within mandated timeline; free access telephone number or website for status check; appeal documentation'
WHERE name = 'Provisional Ballot';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 4005-4008 (Voters Choice Act); Cal. Elec. Code 4005(a)(10) vote center accessibility requirements; Cal. Elec. Code 12283 (Election material security); ADA Title II 28 CFR Part 35',
  standards_of_creation = 'Vote center election administration plan compliance; multi-day operation opening/closing procedures with 10-day early voting minimum; voter roster synchronization across all vote centers via electronic pollbook; equipment allocation and staffing ratios; ADA accessibility verification per location',
  soc_controls = 'Real-time electronic pollbook connectivity monitoring; duplicate voting prevention through live roster updates; daily ballot reconciliation; equipment security between operating days; staffing credential verification'
WHERE name LIKE '%Vote Center%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 3000-3025 (Voting by mail); Cal. Elec. Code 15101 (Mail ballot processing boards); Cal. Elec. Code 3019 (Signature verification for VBM); AB 37 (2021) permanent VBM for all voters; Cal. Elec. Code 3017 (Early VBM processing)',
  standards_of_creation = 'Ballot envelope signature verification procedures; ballot extraction and flattening without viewing voter choices; batch creation and tracking; damaged ballot duplication with original/duplicate pairing; observation access for authorized watchers',
  soc_controls = 'Bipartisan processing board composition; separation of signature verification from ballot extraction; ballot secrecy preservation; sequential batch numbering with count reconciliation; public access to processing observation'
WHERE name LIKE '%Vote-by-Mail%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 2301 (International election observers); Cal. Elec. Code 15004 (Observation of canvass); Cal. Elec. Code 12105 (Watchers at polling places); Cal. Elec. Code 319.5 (Election observer access); OSCE/ODIHR election observation standards',
  standards_of_creation = 'Observer/challenger credentialing and badge issuance; observation area designation preserving ballot secrecy; challenge documentation procedures; observer code of conduct enforcement; international observer uniform access per Cal. Elec. Code 2301',
  soc_controls = 'Credential verification before access; observer conduct incident documentation; equal access for all qualified parties; no interference with election operations; observer complaint and resolution tracking'
WHERE name LIKE '%Election Observer%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 15150-15160 (Semi-official canvass); SOS results reporting protocols; Cal. Elec. Code 15301-15306 (Official canvass process); Cal. Elec. Code 15372 (Canvass completion deadline 28 days)',
  standards_of_creation = 'Semi-official election night results transmission format; precinct-level results data publication; results update frequency and timeline compliance; statement of votes cast preparation; official canvass certification by elections official',
  soc_controls = 'Results transmission encryption; dual authorization for results publication; media/public results display segregation from tabulation systems; canvass results vs election night results reconciliation; SOS certified results reporting'
WHERE name LIKE '%Election Night Reporting%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 3025 (Ballot dropoff locations); Cal. Elec. Code 4005(a)(1)(H) vote center dropbox requirements; SOS Ballot Drop Box Guidelines; Cal. Elec. Code 18575 (Tampering penalties)',
  standards_of_creation = 'Dropbox location selection criteria (accessibility, geographic equity); physical security specifications (bolting, tamper-evident seals, locks); collection schedule and chain of custody documentation; video surveillance deployment where required; public notification of dropbox locations and hours',
  soc_controls = 'Bipartisan ballot collection teams; seal number documentation at each collection; tamper-evident seal integrity verification; collection log with date/time/personnel/seal numbers; surveillance footage retention'
WHERE name LIKE '%Ballot Return%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 12312 (Emergency polling place changes); CISA Election Infrastructure Security; Cal. Gov. Code 8550-8551 (Emergency services provisions); Presidential Policy Directive 21 Critical Infrastructure',
  standards_of_creation = 'Election-specific COOP plan development and maintenance; backup polling place/vote center designation; alternative ballot delivery procedures; emergency extension of voting hours procedures; disaster recovery for electronic systems',
  soc_controls = 'Annual COOP plan review and tabletop exercise; emergency authority delegation documentation; backup system testing records; communication plan for voter notification of changes; after-action review for any emergency activation'
WHERE name LIKE '%Election Emergency%';

-- A4. CAMPAIGN FINANCE AND POLITICAL DISCLOSURE (12 Personas)

UPDATE citizen_catalog SET
  governing_guidelines = 'FECA 52 USC 30101-30146; 11 CFR Parts 100-116 (FEC regulations); 11 CFR Part 104 (Reports by political committees); 11 CFR Part 110 (Contribution/expenditure limitations); Citizens United v. FEC 558 U.S. 310 (2010); Buckley v. Valeo 424 U.S. 1 (1976)',
  standards_of_creation = 'Quarterly/monthly/pre-election report filing deadlines; contribution source identification (name, address, employer, occupation over $200); contribution limit compliance tracking; expenditure categorization and documentation; 48-hour notice for large late contributions; year-end report accuracy and reconciliation',
  soc_controls = 'Treasurer personal liability for report accuracy per 52 USC 30104; segregated bank account requirements; record retention 3 years after report filed per 11 CFR 104.14; mandatory electronic filing over $50K threshold; best efforts defense documentation; random audit selection program'
WHERE name LIKE '%FEC Campaign Finance%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Gov. Code 81000-91014 (Political Reform Act); Cal. Gov. Code 84200-84222 (Campaign statement filing); Cal. Gov. Code 82015 (Committee definition); Cal. Gov. Code 82025-82029 (Contribution definitions); 2 CCR Title 2 Division 6 (FPPC regulations)',
  standards_of_creation = 'Form 460 Recipient Committee Campaign Statement accuracy; Form 461 Major Donor and Independent Expenditure filing; Form 496 Independent Expenditure 24-hour filing in final 90 days; Form 497 Late Contribution Report 24-hour filing; semi-annual and pre-election filing deadlines; electronic filing for committees over $25K',
  soc_controls = 'Treasurer designation and personal liability; FPPC audit and enforcement authority; late filing penalties automatic per day; public access via CAL-ACCESS database; whistleblower protections; 4-year record retention per Cal. Gov. Code 84214'
WHERE name LIKE '%FPPC Campaign%';

UPDATE citizen_catalog SET
  governing_guidelines = '52 USC 30101(4) political committee definition; 11 CFR Part 102 (Registration/organization); 11 CFR Part 114 (Corporate/labor activity); SpeechNow.org v. FEC 599 F.3d 686 (D.C. Cir. 2010) Super PAC; Cal. Gov. Code 82013 (CA PAC definition); Cal. Gov. Code 84100-84108 (Committee registration)',
  standards_of_creation = 'FEC Form 1 Statement of Organization within 10 days of $1K threshold; separate segregated fund documentation; independent expenditure-only committee Super PAC registration; donor disclosure compliance; coordination prohibition documentation; connected organization relationship disclosure',
  soc_controls = 'Organizational separation from candidate committee; no coordination with candidate attestation and documentation; independent expenditure maker identification in communications; FEC compliance review before publication; donor database security and access controls'
WHERE name LIKE '%PAC%Compliance%';

UPDATE citizen_catalog SET
  governing_guidelines = 'LDA 2 USC 1601-1614; HLOGA P.L. 110-81; Cal. Gov. Code 86100-86300 (Lobbying disclosure); 2 USC 1603 (Registration requirements); 2 USC 1604 (Quarterly disclosure); Cal. Gov. Code 86115 (CA lobbyist registration)',
  standards_of_creation = 'LD-1 Registration filing within 45 days; LD-2 Quarterly Activity Report accuracy and timeliness; LD-203 Semi-annual contribution report; California lobbyist employer quarterly reports; issue area and specific bill identification; client identification and fee disclosure',
  soc_controls = 'Registration threshold monitoring ($3K/quarter firm, $14K/quarter in-house); revolving door compliance 1-2 year cooling off; gift ban compliance STOCK Act; electronic filing requirement; 5-year record retention; civil and criminal penalty exposure'
WHERE name LIKE '%Lobbying Registration%';

UPDATE citizen_catalog SET
  governing_guidelines = '52 USC 30104(f) electioneering communications reporting; 11 CFR Part 104.20 (Reporting electioneering communications); McConnell v. FEC 540 U.S. 93 (2003); Cal. Elec. Code 18350 (Mass mailing disclosure); Cal. Gov. Code 84501-84511 (Online political ad disclosure)',
  standards_of_creation = 'FEC Form 9 24-hour report when exceeding $10K; paid-for-by disclosure on all qualifying communications; broadcast/cable/satellite tracking within 60/30-day windows; digital advertisement disclosure requirements; CA DISCLOSE Act AB 249 compliance for ads',
  soc_controls = 'Communication content review and archive before dissemination; disclaimer placement verification (size, duration, prominence); pre-publication legal review for coordination assessment; communication cost tracking and aggregation; record retention of all communications and funding sources'
WHERE name = 'Electioneering Communications';

UPDATE citizen_catalog SET
  governing_guidelines = '52 USC 30101(17) independent expenditure definition; 11 CFR 109.10 (IE reporting); 52 USC 30104(b) and (g) reporting requirements; Cal. Gov. Code 82031 (California IE definition); FPPC Form 496; FEC Form 5',
  standards_of_creation = '24-hour IE reporting within 20 days of election over $1K federal/$1K California; 48-hour IE reporting outside 20 days over $10K federal; non-coordination attestation with candidate/party; support/oppose designation per candidate; expenditure itemization by vendor and purpose',
  soc_controls = 'Written non-coordination policy; firewall between IE operation and candidate contact; contemporaneous record-keeping of expenditure decisions; legal counsel sign-off on coordination independence; expenditure aggregation monitoring against thresholds'
WHERE name = 'Independent Expenditure';

UPDATE citizen_catalog SET
  governing_guidelines = '52 USC 30102(a) treasurer requirement; 11 CFR 102.7 (Treasurer duties); Cal. Gov. Code 84100 (Committee treasurer requirement); Cal. Gov. Code 84213 (Treasurer responsibility); 11 CFR 103.3 (Bank account requirements)',
  standards_of_creation = 'Accurate receipt and disbursement recording; contribution legality screening (source, amount, timing); prohibited contribution identification and return; bank account reconciliation to filings; timely filing of all required reports; best-efforts contributor information collection',
  soc_controls = 'Personal civil liability for filing accuracy; criminal liability for knowing and willful violations; segregated campaign account requirement; dual-signature for large disbursements; assistant treasurer designation and succession; retention 3 years federal / 4 years California'
WHERE name LIKE '%Campaign%Treasurer%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Gov. Code 87200-87210 (Disclosure requirements); Cal. Gov. Code 87300-87313 (Conflict of interest codes); Cal. Gov. Code 87100 (Disqualification); 2 CCR 18700-18756 (FPPC regulations on Form 700); Ethics in Government Act 5 USC App',
  standards_of_creation = 'Annual/assuming/leaving office filing timeline compliance; disclosure category compliance per agency conflict of interest code; income, investments, real property, and gift disclosure completeness; material financial interest identification; disqualification documentation when conflicts arise',
  soc_controls = 'Filing officer review for completeness (not accuracy); FPPC audit authority; late filing penalties; public access to all filed statements; agency conflict of interest code review every 2 years; referral to DA for willful violations'
WHERE name LIKE '%Form 700%';

UPDATE citizen_catalog SET
  governing_guidelines = '52 USC 30101(14)-(15) party committee definitions; 11 CFR Part 106 (Allocation of expenses); 11 CFR Part 109 (Coordinated/independent expenditures); 52 USC 30116 contribution limits party committees; Cal. Gov. Code 85300-85320 (CA party committee rules)',
  standards_of_creation = 'Federal/non-federal allocation methodology documentation; coordinated party expenditure limits tracking; national/state/local committee aggregation; building fund and Levin fund accounting separation; convention/delegate reporting',
  soc_controls = 'Separate federal and non-federal accounts; allocation ratio documentation and annual review; coordinated expenditure agreement records; joint fundraising committee agreements; FEC random audit compliance'
WHERE name LIKE '%Political Party Committee%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Gov. Code 82016.5 (Primarily formed ballot measure committee); Cal. Gov. Code 84107 (Committee naming requirements); Cal. Gov. Code 84223 (Major donor reporting); Cal. Elec. Code 18600-18614 (Petition circulation fraud); First National Bank of Boston v. Bellotti 435 U.S. 765 (1978)',
  standards_of_creation = 'Top contributors disclosure in committee name per AB 249 DISCLOSE Act; primarily formed committee identification and disclosure; petition circulation expenditure reporting; out-of-state contributor disclosure; ballot measure ad disclaimer compliance',
  soc_controls = 'Committee name change when top contributors change; public filing of all contributions and expenditures; petition circulator payment records; criminal penalties for petition fraud per Cal. Elec. Code 18600-18614'
WHERE name LIKE '%Ballot Measure Campaign%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 8000-8106 (Nomination of candidates); Cal. Elec. Code 8020-8028 (Declaration of candidacy); Cal. Elec. Code 8040-8062 (Nomination papers signatures); Cal. Elec. Code 8100-8106 (Filing fees); Cal. Elec. Code 13107 (Candidate statement in voter pamphlet)',
  standards_of_creation = 'Declaration of candidacy form completeness and timely filing; filing fee calculation and collection or in-lieu petition signatures; nomination signature sufficiency determination; candidate statement word count and content compliance; ballot designation review and approval; withdrawal deadline enforcement',
  soc_controls = 'Filing period deadline enforcement with timestamp; signature verification for nomination papers; filing fee receipt and accounting; candidate statement cost collection where applicable; public document status tracking'
WHERE name LIKE '%Candidate Nomination%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Const. Art. II Sections 8-11 (Initiative, referendum, recall); Cal. Elec. Code 100-107 (Petition requirements); Cal. Elec. Code 9000-9097 (Initiative measures); Cal. Elec. Code 9100-9145 (Referendum); Cal. Elec. Code 11000-11386 (Recall); Cal. Elec. Code 101 (11-point type); Cal. Elec. Code 103 (Signature withdrawal)',
  standards_of_creation = 'Petition format compliance 11-point type per Cal. Elec. Code 101; signature threshold verification random sample or full count; circulator affidavit completeness; filing deadline compliance; title and summary preparation by AG for state/city attorney for local; fiscal impact estimate coordination; signature withdrawal processing per Cal. Elec. Code 103',
  soc_controls = 'Random sample methodology per SOS guidelines; signature verification training per Cal. Elec. Code 105; public examination period for petition signatures; circulator registration verification; criminal penalties per Cal. Elec. Code 18600-18614; challenge and recount procedures'
WHERE name LIKE '%Initiative%Referendum%Recall%';

-- A5. REDISTRICTING AND VOTING RIGHTS (6 Personas)

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Const. Art. XXI (Citizens Redistricting Commission); Cal. Elec. Code 21000-21003 (Redistricting); Cal. Elec. Code 21500-21534 (FAIR MAPS Act local redistricting); VRA Section 2 (52 USC 10301) non-dilution; 14th Amendment Equal Protection; Rucho v. Common Cause 588 U.S. ___ (2019)',
  standards_of_creation = 'Population equality standards one person one vote; VRA compliance analysis; communities of interest testimony documentation; nested district analysis Senate within Assembly; geographic contiguity and compactness criteria; public hearing record documentation',
  soc_controls = 'Independent commission structure no legislative control; public mapping tool access; all deliberations in public meetings under Bagley-Keene Act; census data source verification P.L. 94-171; conflict of interest screening for commissioners; mandatory public comment periods'
WHERE name LIKE '%Redistricting Commission%';

UPDATE citizen_catalog SET
  governing_guidelines = 'VRA of 1965 as amended (52 USC 10301-10702); VRA Section 2 (52 USC 10301) results test; VRA Section 4(e) (52 USC 10303(e)) literacy test prohibition; VRA Section 203 (52 USC 10503); Thornburg v. Gingles 478 U.S. 30 (1986); Shelby County v. Holder 570 U.S. 529 (2013); Allen v. Milligan 599 U.S. 1 (2023); Cal. Elec. Code 14025-14032 (CVRA)',
  standards_of_creation = 'Racially polarized voting analysis; Gingles preconditions documentation; totality of circumstances assessment; remedial district map alternatives; CVRA safe harbor compliance district-based elections transition; language assistance plan development',
  soc_controls = 'Expert witness qualification documentation; statistical methodology disclosure and peer review; federal court consent decree compliance monitoring; DOJ correspondence and pre-clearance records; Section 2 litigation risk assessment documentation'
WHERE name LIKE '%Voting Rights Act%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 15500-15504 (Statement of vote); Cal. Elec. Code 15400-15402 (SOS canvass duties); Cal. Const. Art. V Section 10 (SOS election duties); Cal. Elec. Code 12172 (Certified list of candidates); Cal. Elec. Code 8800 (Presidential electors); Electoral Count Reform Act of 2022 P.L. 117-328',
  standards_of_creation = 'Official statewide canvass certification; county certificate of election results compilation; presidential elector certification and safe harbor compliance; candidate qualification determination for statewide office; statewide initiative measure certification; recount authorization and oversight',
  soc_controls = 'Constitutional officer personal certification; county-by-county results reconciliation; safe harbor deadline compliance Electoral Count Reform Act; certified results transmission to federal entities; record retention per state/federal requirements'
WHERE name LIKE '%Election Certification Officer%';

UPDATE citizen_catalog SET
  governing_guidelines = 'HAVA Title III (52 USC 21081-21089) voting system standards; HAVA Section 254 (52 USC 21004) state plan requirements; HAVA Section 303 (52 USC 21083) computerized statewide voter registration list; HAVA Section 261 (52 USC 21011) payments to states; EAC EAVS; GAO audit standards for HAVA fund expenditures',
  standards_of_creation = 'State HAVA compliance plan development and update; HAVA fund expenditure documentation and federal reporting; statewide voter registration database standards; voting system standards compliance verification; provisional voting implementation monitoring; first-time voter ID verification procedures',
  soc_controls = 'Federal fund accounting segregation; EAC reporting timeline compliance; state plan public comment requirements; annual EAVS survey completion; federal audit cooperation requirements; five-year minimum funding maintenance of effort'
WHERE name LIKE '%HAVA Compliance%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 16000-16103 (Election contests); Cal. Elec. Code 15600-15632 (Recounts); Cal. Elec. Code 16601 (Recount at trial); Cal. Elec. Code 16404 (Contest affidavit specificity); Cal. CCP 1060-1062.5 (Declaratory relief election cases)',
  standards_of_creation = 'Contest petition specificity requirements per precinct per Cal. Elec. Code 16404; recount demand filing within 5 days of canvass completion; recount deposit calculation and payment; ballot re-examination procedures; contest trial procedures per Cal. Elec. Code 16601; results adjustment or new election order documentation',
  soc_controls = 'Judicial oversight of contest proceedings; bipartisan observation during recount; ballot chain of custody maintained through recount; depositions and discovery in contest proceedings; court-ordered seal for disputed ballots'
WHERE name LIKE '%Election Contest%';

UPDATE citizen_catalog SET
  governing_guidelines = 'EO 13848 (Foreign Interference Sanctions); CISA #Protect2024 framework; IRTPA provisions; Cal. Elec. Code 18500-18578 (Election crimes); HAVA Section 301(a)(4) voting system security standards; PPD-41 Cyber Incident Coordination',
  standards_of_creation = 'Election threat briefing documentation; foreign influence operation identification and reporting; disinformation/misinformation monitoring and response; insider threat assessment for election workers; physical security assessment for election facilities; incident reporting chain local to state to federal',
  soc_controls = 'Security clearance management for election officials receiving classified briefings; multi-source intelligence fusion; information sharing agreements DHS/FBI/CISA to state/local; tabletop exercise documentation; classified and unclassified reporting channels'
WHERE name LIKE '%Election%Threat%';

-- A6. ELECTION ADMINISTRATION AND TECHNOLOGY (6 Personas)

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 2550 (Electronic pollbook authorization); SOS Electronic Pollbook Standards; HAVA Section 303(b) voter identification procedures; VVSG 2.0 pollbook interoperability standards',
  standards_of_creation = 'Real-time synchronization between vote centers; voter record lookup accuracy and speed; connectivity failure/offline mode procedures; data encryption in transit and at rest; voter privacy screen compliance',
  soc_controls = 'Pre-election database load verification; access authentication for pollbook operators; synchronization audit logs; backup paper roster availability; post-election data purge procedures'
WHERE name = 'Electronic Pollbook';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 15154 (Write-in vote counting); Cal. Elec. Code 15350 (Manual count procedures); HAVA Section 301(a)(6) uniform definition of vote; SOS Ballot Adjudication Guidelines; county-specific voter intent SOPs',
  standards_of_creation = 'Bipartisan team review of ambiguous ballots; voter intent determination criteria application; over-vote, under-vote, and stray mark adjudication; write-in candidate validation; damaged/unreadable ballot duplication procedures; adjudication decision documentation with reason codes',
  soc_controls = 'Bipartisan adjudication team requirement; real-time observation access; original ballot preservation alongside duplicated ballot; decision log with ballot ID issue and determination; supervisor escalation for disputed determinations'
WHERE name LIKE '%Ballot Adjudication%';

UPDATE citizen_catalog SET
  governing_guidelines = 'CPRA (Cal. Gov. Code 7920-7931); Cal. Elec. Code 17000-17400 (Preservation/destruction of election records); 52 USC 20701 (Federal election records retention 22 months); HAVA Section 301(a)(2) audit trail availability; Cal. Elec. Code 2194 (Voter registration confidentiality)',
  standards_of_creation = 'Public records request response within 10 days per Cal. Gov. Code 7922.535; voter file confidentiality protections safe-at-home program; cast vote record publication; election records retention schedules compliance; redaction standards for exempt information; cost estimate and fee schedule for records production',
  soc_controls = 'Records retention 22 months federal varies state; confidential voter information redaction; ballot image retention and public availability; response deadline tracking and escalation; litigation hold procedures for election records'
WHERE name LIKE '%Election Data Transparency%';

UPDATE citizen_catalog SET
  governing_guidelines = 'NIST SP 800-53 security and privacy controls; CISA Election Infrastructure Security; EAC VVSG 2.0 technical requirements; Cal. Elec. Code 19205 (Voting system security); IEC 62443 industrial control systems security',
  standards_of_creation = 'Election network architecture documentation and segmentation; patch management within certified system constraints; backup and disaster recovery procedures; system hardening per CIS benchmarks; EMS access control; endpoint protection and monitoring deployment',
  soc_controls = 'Privileged access management; change management board approval for system changes; system event logging and SIEM monitoring; annual penetration testing; vendor remote access controls and monitoring; configuration baseline documentation'
WHERE name LIKE '%Election IT%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 15150-15160 (Results reporting format); EAC EAVS methodology; MIT Election Data + Science Lab standards; Cal. Elec. Code 19360 (Post-election audit data); HAVA Section 241 (52 USC 20981) EAC research',
  standards_of_creation = 'Precinct-level results data standardization; turnout calculation methodology documentation; registration-to-turnout ratio analysis; absentee/VBM return rate tracking; demographic participation analysis; historical trend data compilation',
  soc_controls = 'Data source verification official canvass only; methodology documentation and transparency; peer review of analytical conclusions; data anonymization for research sharing; publication delay until official canvass completion'
WHERE name LIKE '%Election Data Analyst%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 19210-19222 (Vendor certification obligations); Cal. Elec. Code 19212 (Post-certification vendor reporting); Cal. Pub. Contract Code 10100+ (Public contracting); EAC VSTL accreditation; VVSG 2.0 compliance',
  standards_of_creation = 'Vendor SOS certification maintenance; software version control and update documentation per Cal. Elec. Code 19212; source code escrow agreement compliance; SLA performance monitoring; subcontractor disclosure and vetting; end-of-life/support notification',
  soc_controls = 'Vendor background investigation requirements; foreign ownership disclosure; contract performance bond or insurance; audit rights in vendor contracts; incident notification requirements; post-certification change reporting within 10 business days per Cal. Elec. Code 19212'
WHERE name LIKE '%Voting System Vendor%';

-- A7. ELECTION CRIMES AND ENFORCEMENT (4 Personas)

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 18000-18578 (Election crimes); 52 USC 20511 (Criminal penalties NVRA); 18 USC 241-242 (Conspiracy against rights/Deprivation of rights); 18 USC 594 (Intimidation of voters); 18 USC 597 (Vote buying); Cal. Elec. Code 18500 (False voter registration); Cal. Elec. Code 18540 (Voter intimidation)',
  standards_of_creation = 'Election crime complaint intake and documentation; evidence preservation for election-related offenses; voter intimidation complaint investigation protocols; vote buying/selling investigation procedures; false registration referral processing; multi-jurisdictional coordination documentation',
  soc_controls = 'Case assignment and conflict screening; evidence chain of custody standards; witness protection considerations; grand jury referral documentation; election day rapid response procedures; FBI/DOJ election crimes coordination'
WHERE name LIKE '%Election Crimes Investigator%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Gov. Code 83116 (FPPC enforcement authority); Cal. Gov. Code 91000-91014 (Enforcement/penalties); Cal. Gov. Code 83115.5 (Subpoena power); Cal. Gov. Code 91004 (Civil penalties); Cal. Gov. Code 91005 (Criminal penalties); 2 CCR Division 6 enforcement regulations',
  standards_of_creation = 'Sworn complaint intake and evaluation; probable cause determination documentation; stipulated settlement negotiation records; administrative hearing preparation; civil penalty calculation methodology; criminal referral criteria and documentation',
  soc_controls = 'Probable cause/no probable cause determination by Commission vote; respondent due process protections; confidential investigation phase; public enforcement action records after disposition; statute of limitations monitoring 5 years per Cal. Gov. Code 91000; settlement amount precedent tracking'
WHERE name LIKE '%FPPC Enforcement%';

UPDATE citizen_catalog SET
  governing_guidelines = '52 USC 30109 (Enforcement procedures); 11 CFR Part 111 (Compliance procedures); FEC Enforcement Manual; FEC Alternative Dispute Resolution program; FEC Administrative Fine Program',
  standards_of_creation = 'Complaint receipt and notification procedures; reason-to-believe determination analysis; investigation scope and subpoena authority documentation; conciliation agreement negotiation; probable cause brief preparation; penalty calculation guidelines',
  soc_controls = 'Bipartisan Commission vote requirement 4 of 6 members; respondent notification and response opportunity; confidential investigation phase per 52 USC 30109(a)(12); public disclosure of closed MURs; 5-year statute of limitations; de minimis violation dismissal criteria'
WHERE name LIKE '%FEC Enforcement%';

UPDATE citizen_catalog SET
  governing_guidelines = '52 USC 30111(b) (FEC audit authority); 11 CFR Part 104.16 (Audits); GAO Government Auditing Standards Yellow Book; Cal. Gov. Code 90000-90009 (FTB audits of committees); FPPC audit procedures',
  standards_of_creation = 'Random audit selection methodology documentation; for-cause audit initiation criteria; contribution limit compliance testing; expenditure authorization verification; corporate/foreign national contribution screening; bank record reconciliation to filed reports; prohibited contribution identification',
  soc_controls = 'Random selection from eligible committee pool; formal audit notification and commencement letter; entrance and exit conference documentation; draft finding response period; final audit report publication; referral to enforcement division for violations'
WHERE name LIKE '%Campaign Finance Auditor%';

-- A8. ELECTION SUPPORT SERVICES (10 Personas)

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 16100-16103 (Contest of election jurisdiction); Cal. CCP 1094.5 (Administrative mandamus); Cal. Gov. Code 11500-11529 (APA); Cal. Elec. Code 16400-16442 (Contest proceedings)',
  standards_of_creation = 'Hearing notice and scheduling requirements; evidence admission standards for election contests; findings of fact and conclusions of law; remedy determination new election vs results adjustment; appeal rights notification',
  soc_controls = 'Judicial independence and impartiality; party participation rights; record preservation for appellate review; timeline compliance for contest resolution'
WHERE name LIKE '%Election Judge%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code complete; 52 USC Voting and Elections complete; Cal. Gov. Code 81000-91014 (Political Reform Act); ABA Model Rules of Professional Conduct; Cal. Rules of Professional Conduct',
  standards_of_creation = 'Legal opinions on election law compliance; ballot measure title and summary drafting AG for state measures; election contest pleading standards; advisory opinions for election officials; regulatory comment and rulemaking participation',
  soc_controls = 'Attorney-client privilege maintenance; conflict of interest screening for public entity representation; bar licensing and CLE compliance; opinion letter quality standards'
WHERE name LIKE '%Election Attorney%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 12283 (Security of election materials); Cal. Elec. Code 14400 (Delivery of ballots and supplies); SOS Supply Chain Security guidelines; county procurement code',
  standards_of_creation = 'Ballot and supply inventory management; chain of custody documentation for all election materials; secure storage facility requirements; distribution routing and delivery confirmation; post-election material reconciliation; surplus and spoiled material destruction',
  soc_controls = 'Background checks for warehouse personnel; 24/7 facility security alarm/surveillance/access control; dual-custody requirement for ballot access; inventory reconciliation at each custody transfer; vehicle GPS tracking for election material transport'
WHERE name LIKE '%Election Warehouse%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 12309-12310 (Precinct board member instruction); Cal. Elec. Code 12311 (Mandatory training); HAVA Section 261 (Training fund provisions); EAC Poll Worker Training resources; ADA Title II accessibility training',
  standards_of_creation = 'Curriculum development per SOS standards; mandatory training attendance verification; competency assessment for poll workers; scenario-based training for provisional ballots, accessibility, language access; election law overview prohibited conduct; emergency procedures training',
  soc_controls = 'Training completion records with signatures; curriculum review and update each election cycle; trainer-of-trainer qualification standards; multi-language training material availability; post-election performance evaluation'
WHERE name LIKE '%Poll Worker Trainer%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 2300 (Voter assistance); HAVA Section 302(a)(5) voter information requirements; Cal. Elec. Code 3015 (VBM status notification); VRA Section 203 language access for phone; Cal. Elec. Code 14310 (Voter assistance at polls)',
  standards_of_creation = 'Script accuracy and legal compliance; multi-language service availability per Section 203 coverage; call documentation standards; complaint intake and escalation procedures; election day extended hours coverage; response time metrics',
  soc_controls = 'Staff training certification; call monitoring and quality assurance; complaint tracking and resolution documentation; political neutrality in voter assistance; PII protection in call records'
WHERE name LIKE '%Voter Hotline%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Pen. Code 919-933 (Grand jury powers/duties); Cal. Pen. Code 925 (County operations investigation authority); Cal. Gov. Code 25303 (Board of Supervisors response to grand jury); Grand Jury Procedures Manual',
  standards_of_creation = 'Election office operational review methodology; findings and recommendations documentation; response requirement compliance monitoring; public report preparation standards; follow-up review scheduling',
  soc_controls = 'Grand jury independence from county operations; confidential investigation procedures; mandatory response timeline 60/90 days; public report publication; multi-year recommendation tracking'
WHERE name = 'Grand Jury Election';

UPDATE citizen_catalog SET
  governing_guidelines = 'USPS Publication 632 Election Mail guidelines; 39 USC 3406 (Election mail provisions); USPS DMM 703; Cal. Elec. Code 3010 (VBM ballot mailing); USPS Tag 191 Official Election Mail',
  standards_of_creation = 'IMb tracking for election mail; Tag 191/Tag 191-A usage for official election mail; mail processing timeline compliance outbound/return; undeliverable ballot handling procedures; postmark verification for return deadline compliance; local USPS election mail coordinator liaison',
  soc_controls = 'USPS dedicated election mail processing stream; all-clear sweep procedures on election deadlines; delivery point verification before mailing; USPS/Registrar communication log; tracking data reconciliation'
WHERE name LIKE '%Election Mail%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 12200-12220 (Precinct establishment); Cal. Elec. Code 21500-21534 (FAIR MAPS Act boundary requirements); Census Bureau TIGER/Line geographic data standards; Cal. Elec. Code 12221 (Consolidation of precincts)',
  standards_of_creation = 'Precinct boundary delineation accuracy; voter address-to-precinct assignment geocoding; district overlay mapping congressional/state/local/special; polling place/vote center service area analysis; consolidation precinct documentation; redistricting data geographic alignment',
  soc_controls = 'GIS database version control; address change audit trail; cross-reference with assessor/USPS address databases; public map publication requirements; pre-election precinct map certification'
WHERE name LIKE '%Election GIS%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 2053-2054 (CVAAC establishment); ADA Title II (42 USC 12131-12134); Section 504 Rehabilitation Act (29 USC 794); HAVA Section 261(b) disability access grants',
  standards_of_creation = 'CVAAC meeting scheduling and public notice; accessibility complaint review and recommendation; voting equipment accessibility testing coordination; election administration plan accessibility review; disability community outreach documentation',
  soc_controls = 'Committee diversity requirements range of disabilities represented; meeting minutes and recommendation tracking; registrar response to CVAAC recommendations; public meeting compliance Brown Act; annual accessibility assessment cycle'
WHERE name LIKE '%CVAAC%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Elec. Code 9084 (County voter information guide); Cal. Elec. Code 12108 (Polling place notification to voters); Cal. Elec. Code 4005(a)(10) VCA outreach requirements; Cal. Gov. Code 54954 (Brown Act public meeting notice)',
  standards_of_creation = 'Press release accuracy and timing; social media content compliance with election law; voter information guide content and mailing; crisis communication protocol documentation; election results media briefing procedures',
  soc_controls = 'Legal review of public communications; political neutrality in official communications; multi-language communication requirements; social media policy compliance; records retention for public communications'
WHERE name LIKE '%Election Public Information%';

-- ============================================================================
-- SECTION B: CENSUS / DEMOGRAPHICS / STATISTICS (41 Personas)
-- ============================================================================

-- B1. DECENNIAL CENSUS OPERATIONS (10 Personas)

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 1-16 (Census Bureau authority/duties); 13 USC 141 (Decennial census requirement); 13 USC 221 (Mandatory response requirement); 13 USC 9 (Title 13 confidentiality protections); Census Bureau Operational Plans; OMB Statistical Policy Directives',
  standards_of_creation = 'Regional office operational plan implementation; field operation staffing and training documentation; NRFU deployment management; partnership specialist coordination records; quality assurance and coverage measurement; local census office activation/deactivation procedures',
  soc_controls = 'Title 13 confidentiality oath for all employees per 13 USC 23; background investigation for all census employees; separation of identified data from published statistics; operational security for data collection; congressional reporting on operational progress; Inspector General oversight'
WHERE name LIKE '%Regional Census Director%';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 23 (Census employee appointments); 13 USC 221-224 (Respondent obligations/penalties); Census Bureau Enumerator Training Manual; Census Bureau Supervisors Manual; Census Bureau Information Quality Guidelines',
  standards_of_creation = 'Enumerator assignment and case management; contact attempt documentation minimum attempts before proxy; proxy interview authorization and documentation; enumerator daily payroll and mileage verification; quality reinterview program administration; respondent refusal escalation procedures',
  soc_controls = 'Daily enumerator check-in requirements; GPS tracking of field visits mobile device; quality reinterview of minimum percentage of completed cases; falsification detection and reporting; whistle-blower protection for data integrity; case reassignment for enumerator misconduct'
WHERE name LIKE '%Census Enumerator Supervisor%';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 16 (Address information legislative provisions); Census Bureau MAF procedures; LUCA program guidelines; Census Bureau Geographic Programs guidelines; TIGER/Line geographic database standards',
  standards_of_creation = 'Block-by-block address verification; new construction identification and geocoding; multi-unit dwelling unit count verification; housing unit vs group quarters classification; GPS coordinate capture for each address; address discrepancy resolution procedures',
  soc_controls = 'MAF/TIGER database access restrictions Title 13; LUCA participant confidentiality agreements; address canvassing quality control recanvass; satellite imagery verification procedures; address list challenge period administration; local government liaison documentation'
WHERE name LIKE '%Census Address Canvassing%';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 141 (Census of population requirements); Census Bureau Group Quarters Enumeration Manual; Census Bureau GQ Type Classification Guide; 13 USC 9 (Confidentiality for institutionalized populations); PREA considerations for correctional GQ',
  standards_of_creation = 'GQ facility type classification institutional vs non-institutional; GQ population count methodology enumeration at facility vs usual residence; transitory locations enumeration; service-based enumeration for homeless; military installation coordination; special procedures for confidential populations',
  soc_controls = 'Facility administrator coordination and advance notice; confidential enumeration for sensitive GQ types; individual questionnaire vs administrative records methodology; quality assurance for GQ counts; duplication avoidance with household enumeration; GQ facility list verification'
WHERE name LIKE '%Group Quarters%Enumerator%';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 141(c) (Census quality requirements); Census Bureau Post-Enumeration Survey methodology; Dual-System Estimation statistical framework; Census Coverage Measurement program; OMB Standards and Guidelines for Statistical Surveys',
  standards_of_creation = 'Coverage measurement survey design and execution; net undercount/overcount estimation by demographic group; erroneous enumeration identification; whole-person imputation methodology documentation; item imputation rate monitoring; census-survey comparison analysis',
  soc_controls = 'Independent sample design from production census; separate matching operation from coverage estimation; expert panel review of coverage estimates; peer review of statistical methodology; OMB review before publication; historical comparison documentation'
WHERE name LIKE '%Census Data Quality%';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 23 (Appointments/compensation); 13 USC 24 (Special employment provisions); 5 CFR Parts 213, 316 (Excepted service appointments); Census Bureau Background Investigation requirements; 13 USC 23(c) (Oath of office Title 13 confidentiality)',
  standards_of_creation = 'Mass hiring event documentation; background investigation processing fingerprinting/name check; Title 13 confidentiality oath administration; training completion verification; bilingual capability assessment; termination and separation processing',
  soc_controls = 'Background check completion before field deployment; sworn confidentiality oath as condition of employment; personnel file confidentiality; equal opportunity hiring documentation; separation procedures including equipment return and access revocation; payroll accuracy controls'
WHERE name LIKE '%Census Hiring%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Census Bureau Complete Count Committee guide; 13 USC 141 (Census purpose/requirements); Census Bureau Partnership Program guidelines; EO 13880 (Census and citizenship data); Census Bureau Community Engagement toolkit',
  standards_of_creation = 'Complete Count Committee formation documentation; partnership agreement execution; hard-to-count community outreach planning; trusted voice/messenger identification; questionnaire assistance center establishment; community-based organization coordination records',
  soc_controls = 'Non-partisan outreach requirement; no influence on questionnaire content through partnerships; equal access for all community organizations; partnership activity reporting; resource allocation equity documentation; cultural sensitivity review of outreach materials'
WHERE name LIKE '%Census Partnership%';

UPDATE citizen_catalog SET
  governing_guidelines = 'EO 13166 (Limited English Proficiency); Census Bureau Language Assistance Program; Section 504 Rehabilitation Act (29 USC 794); ADA Title II (42 USC 12131-12134); Census Bureau Internet Self-Response accessibility; WCAG 2.0 AA',
  standards_of_creation = 'Questionnaire translation accuracy by Bureau professional linguists; language assistance guide development 59+ languages; internet self-response accessibility compliance; TTY/relay service availability; large-print and Braille questionnaire availability; in-language advertising and outreach',
  soc_controls = 'Translation quality review by native speakers; back-translation verification; cognitive testing of translated questionnaires; accessibility testing with assistive technology; language coverage determination methodology; complaint tracking for language access issues'
WHERE name LIKE '%Census Language%';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 9 (Confidentiality protections); 13 USC 214 (Wrongful disclosure penalties); Census Bureau Respondent Burden Reduction initiative; OMB Controlling Paperwork Burdens (5 CFR 1320); Paperwork Reduction Act (44 USC 3501-3521)',
  standards_of_creation = 'Respondent burden estimation and minimization; confidentiality protection communication; respondent complaint intake and resolution; non-response reason documentation and analysis; questionnaire content justification review; contact frequency limitation enforcement',
  soc_controls = 'Independent respondent advocacy function; burden reduction reporting to OMB; complaint trend analysis and systemic issue identification; confidentiality violation reporting channel; public transparency reporting on burden'
WHERE name = 'Census Respondent Advocate';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 9 (Confidentiality IT implementation); FISMA (44 USC 3551-3558); NIST SP 800-53 Rev. 5 security controls; NIST SP 800-37 Risk Management Framework; Census Bureau IT Security Policy; FedRAMP for cloud services',
  standards_of_creation = 'System security plan for census data systems; Authority to Operate documentation; internet self-response system security architecture; data encryption in transit and at rest; incident response plan specific to census data; penetration testing and vulnerability assessment',
  soc_controls = 'FISMA annual assessment and reporting; continuous monitoring program; multi-factor authentication for all Title 13 data access; security awareness training for all census employees; incident response team activation procedures; cloud security FedRAMP compliance'
WHERE name LIKE '%Census%IT Security%';

-- B2. STATISTICAL METHODOLOGY AND DATA PRODUCTS (8 Personas)

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 141 (ACS authorized under census authority); 13 USC 182 (Surveys); OMB Standards for Federal Data on Race and Ethnicity; ACS Design and Methodology Report; OMB Statistical Policy Directive No. 2',
  standards_of_creation = 'Survey sample design documentation; data collection mode sequence internet/mail/CATI/CAPI; response rate monitoring and NRFU deployment; weighting methodology documentation; 1-year and 5-year estimate production; margin of error calculation and publication',
  soc_controls = 'OMB clearance for survey instrument PRA compliance; Title 13 confidentiality for all responses; independent quality metrics monitoring; sampling error and non-sampling error documentation; PUMS disclosure review; data release schedule compliance'
WHERE name LIKE '%American Community Survey%';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 9 (Prohibition against disclosure of identifiable information); Census Bureau Disclosure Review Board policies; Differential Privacy implementation guidelines 2020 Census onward; OMB Statistical Policy Directive No. 4; Census Bureau Data Stewardship policies',
  standards_of_creation = 'Differential privacy noise injection parameters; disclosure avoidance system DAS documentation; small cell suppression rules; data swapping methodology pre-2020; synthetic data generation documentation; re-identification risk assessment; privacy-accuracy tradeoff documentation',
  soc_controls = 'DRB approval required before any data release; formal privacy loss budget epsilon allocation; post-processing consistency checks; independent re-identification testing; public transparency reporting on DAS methodology; peer review of disclosure avoidance methods'
WHERE name LIKE '%Statistical Disclosure%';

UPDATE citizen_catalog SET
  governing_guidelines = 'P.L. 94-171 (Census Redistricting Data Program); 13 USC 141(c) (Data delivery to states); VRA Section 2 (52 USC 10301); Census Bureau P.L. 94-171 guidelines; OMB Directive 15 race and ethnicity categories',
  standards_of_creation = 'Block-level population tabulation by race, ethnicity, voting age; April 1 delivery deadline to states statutory; geographic hierarchy consistency state/county/tract/block; voting district tabulation per state plans; group quarters population by type at block level; data format standardization',
  soc_controls = 'Statutory delivery deadline compliance; state liaison program for geographic plan submission; data accuracy verification against decennial totals; disclosure avoidance application verification; public access simultaneous with state delivery; historical comparison data availability'
WHERE name LIKE '%Redistricting Data%';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 181 (Population estimates authority); Census Bureau Population Estimates Methodology; OMB Statistical Policy Directive No. 14; FSCPE; Census Bureau Vintage estimates release schedule',
  standards_of_creation = 'Components of change methodology births/deaths/migration; demographic analysis documentation; administrative records data source validation; sub-county population estimation methodology; housing unit method documentation; annual estimates production and release timeline',
  soc_controls = 'Methodology peer review; input data source agreement documentation; vintage release schedule compliance; intercensal revision documentation; state/local challenge period administration; historical series consistency maintenance'
WHERE name LIKE '%Population Estimates%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Model State Vital Statistics Act NCHS; Cal. HSC 102100-103095 (California vital records); 42 USC 242k (National vital statistics system); SSA/IRS/USCIS data sharing; NAPHSIS standards',
  standards_of_creation = 'Birth certificate issuance per U.S. Standard Certificate of Live Birth; death certificate completion per U.S. Standard Certificate of Death; fetal death reporting; marriage and divorce registration; cause-of-death coding ICD-10; delayed registration procedures; amendment and correction procedures',
  soc_controls = 'Registrar certification and training; vital record security paper and issuance controls; EDRS access controls; SSA/IRS data matching for fraud prevention; sealed record access restrictions; certified copy issuance tracking; identity verification for record requests'
WHERE name LIKE '%Vital Statistics Registrar%';

UPDATE citizen_catalog SET
  governing_guidelines = 'CIPSEA (44 USC 3561-3583); Evidence Act (P.L. 115-435); OMB Statistical Policy Directives 1-4; OMB Circular A-130; Federal Committee on Statistical Methodology standards',
  standards_of_creation = 'Interagency data sharing agreement documentation; CIPSEA pledge administration for data recipients; statistical purpose limitation verification; evidence-building coordination across agencies; data quality framework implementation; pre-release access controls for economic indicators',
  soc_controls = 'CIPSEA penalties for unauthorized disclosure up to $250K fine 5 years imprisonment; principal statistical agency independence protections; embargo procedures for market-sensitive data; data access agreement breach investigation; annual statistical program evaluation; OMB clearance for all new surveys'
WHERE name LIKE '%Federal Statistical Agency%';

UPDATE citizen_catalog SET
  governing_guidelines = 'OMB Standards and Guidelines for Statistical Surveys 2006; AAPOR Code of Professional Ethics; Federal Committee on Statistical Methodology guidelines; PRA (44 USC 3501-3521); OMB Statistical Policy Directive No. 1',
  standards_of_creation = 'Sample design documentation and justification; survey instrument cognitive testing records; response rate calculation and reporting AAPOR definitions; non-response bias analysis; mode effect analysis documentation; total survey error framework documentation',
  soc_controls = 'OMB PRA clearance before survey fielding; IRB approval for research surveys; AAPOR transparency standards for methodology; pilot test documentation before full-scale deployment; independent replication capability; methodology documentation sufficient for peer review'
WHERE name LIKE '%Survey Methodologist%';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 16 (Geographic data authority); Census Bureau TIGER/Line technical documentation; Census Bureau Geographic Areas Reference Manual; OMB Metropolitan Statistical Area delineation; Census Bureau BAS procedures',
  standards_of_creation = 'TIGER/Line shapefile production and accuracy; geographic entity boundary maintenance; block group/tract delineation criteria; metropolitan/micropolitan statistical area delineation; tribal/Alaska Native/Hawaiian areas geographic definition; address range geocoding accuracy',
  soc_controls = 'Geographic boundary change documentation trail; BAS certification by local officials; TIGER quality metrics and accuracy assessments; version control for geographic database updates; public access to geographic files; geographic entity code assignment controls'
WHERE name LIKE '%TIGER%MAF%';

-- B3. CENSUS CONFIDENTIALITY AND LEGAL COMPLIANCE (6 Personas)

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 9 (Information as confidential exceptions); 13 USC 214 (Wrongful disclosure $5K fine and/or 5 years imprisonment); 13 USC 23(c) (Oath of office); Census Bureau Data Stewardship Executive Policy Committee; Census Bureau Title 13 training curriculum',
  standards_of_creation = 'Title 13 confidentiality oath administration for all personnel; breach notification and response procedures; law enforcement request denial documentation Title 13 bars all disclosure; subpoena response procedures Title 13 supersedes; contractor confidentiality agreements; former employee continuing obligation documentation',
  soc_controls = 'Zero-tolerance disclosure policy; criminal penalty exposure per 13 USC 214; Title 13 override of subpoenas/FOIA/court orders; annual confidentiality training requirement; incident investigation procedures; IG referral for suspected violations; 72-year rule per 13 USC 8(b)'
WHERE name LIKE '%Title 13 Compliance%';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 9 (Confidentiality for microdata); CIPSEA (44 USC 3561-3583); Census Bureau Special Sworn Status program; FSRDC policies; Census Bureau Microdata Access policies',
  standards_of_creation = 'Research proposal review and approval; Special Sworn Status application processing; background investigation for data access; disclosure avoidance review of all research outputs; data use agreement execution and monitoring; RDC access log maintenance',
  soc_controls = 'Title 13 sworn status as condition of access; secure physical facility requirements for RDCs; no data removal from secure environment; output review by Census Bureau staff before release; project scope limitation enforcement; access revocation procedures; annual compliance certification'
WHERE name LIKE '%Census Data Use Agreement%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Census Bureau Count Question Resolution CQR program; Census Bureau Population Estimates Challenge program; 13 USC 181 (Estimates authority); OMB guidance on census data corrections',
  standards_of_creation = 'Challenge submission requirements and evidence standards; geographic boundary verification; group quarters count verification; housing unit count challenge processing; population estimate revision criteria; challenge determination notification',
  soc_controls = 'Formal challenge filing period; evidence evaluation criteria documentation; independent review of challenge determinations; notification to affected governmental units; no revision of decennial census counts estimates only; appeal procedures documentation'
WHERE name LIKE '%Census Challenge%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Inspector General Act of 1978 (5 USC App.); 13 USC 4 (Secretary of Commerce authority); GAO Government Auditing Standards Yellow Book; Single Audit Act (31 USC 7501-7507); DOC OIG Audit Guide for Census Operations',
  standards_of_creation = 'Census operation audit planning and execution; internal control assessment documentation; fraud, waste, and abuse investigation; decennial census cost estimation audit; IT system security audit; contractor performance audit',
  soc_controls = 'IG statutory independence; audit finding tracking and remediation verification; management response requirements 60 days; congressional reporting of significant findings; hotline for census employee complaints; whistleblower protection enforcement'
WHERE name LIKE '%Census Bureau Inspector General%';

UPDATE citizen_catalog SET
  governing_guidelines = 'FOIA (5 USC 552) as modified by Title 13 exemptions; Privacy Act (5 USC 552a); 13 USC 9 (Title 13 override of FOIA for census microdata); OMB Circular A-130; Census Bureau SORNs; 13 USC 8(b) (72-year rule)',
  standards_of_creation = 'FOIA request processing with Title 13 exemption application; Privacy Act access and amendment request handling; SORN maintenance; PIA completion; 72-year historical records release procedures; age search service for individual records',
  soc_controls = 'Title 13 exemption applied to all identifiable data FOIA requests; FOIA response timeline 20 business days; Privacy Act accounting of disclosures; PIA publication for new data systems; SORN publication in Federal Register; annual FOIA report to Attorney General'
WHERE name LIKE '%Census FOIA%';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 8(b) (Data sharing with designated agencies); Census Bureau Special Tabulation Program policies; EEO tabulation requirements; CTPP program; school district tabulation programs; CIPSEA data sharing',
  standards_of_creation = 'Custom tabulation specification documentation; disclosure avoidance application for custom products; cost reimbursement agreement execution; data product quality review before delivery; geographic customization accuracy; timeliness of delivery per agreement',
  soc_controls = 'Disclosure Review Board approval for all custom products; cost recovery documentation; client confidentiality agreement; product specification sign-off; quality assurance review chain; version control for custom data products'
WHERE name LIKE '%Census Special Tabulation%';

-- B4. DEMOGRAPHIC SURVEYS AND RESEARCH (9 Personas)

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 182 (Joint project authority); 29 USC 2 (BLS data collection authority); CPS Technical Paper 66; OMB PRA clearance for CPS; interagency agreement Census Bureau and BLS',
  standards_of_creation = 'Monthly sample rotation scheme 4-8-4 design administration; CAPI/CATI quality standards; supplement questionnaire administration voting/health/school enrollment; response rate monitoring and non-response adjustment; labor force classification accuracy; monthly processing timeline for employment data',
  soc_controls = 'Joint Census/BLS operational oversight; pre-release data embargo market-sensitive employment data; Principal Federal Economic Indicator procedures; interviewer falsification detection; quality assurance reinterview program; supplement sponsor coordination'
WHERE name LIKE '%Current Population Survey%';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 131 (Census of manufactures); 13 USC 191 (Census of governments); 13 USC 224 (Failure to answer penalties); NAICS; OMB PRA clearance; Census Bureau Economic Census guidelines',
  standards_of_creation = 'Business establishment classification by NAICS code; quinquennial census form design and distribution; business register maintenance; revenue/payroll/employment data collection; non-response follow-up for businesses; industry-specific supplement administration',
  soc_controls = 'Title 13 confidentiality for business data; mandatory response with penalty per 13 USC 224; disclosure avoidance dominance rules; pre-release data embargo; interagency coordination IRS/SSA/BLS; quality assurance for industry classification'
WHERE name = 'Economic Census';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 161 (Quinquennial census of governments); 13 USC 163 (Government financial data); Census Bureau Census of Governments methodology; Government Finance Statistics manual; Annual Survey of Public Employment and Payroll',
  standards_of_creation = 'Government unit identification and classification; revenue and expenditure categorization; public employment and payroll data collection; special district enumeration; government organization structure documentation; state/local finance data standardization',
  soc_controls = 'Government unit list verification with state agencies; response validation against budget documents; cross-reference with bond rating agencies; data quality review with state auditors; annual survey integration with quinquennial census'
WHERE name = 'Census of Governments';

UPDATE citizen_catalog SET
  governing_guidelines = '42 USC 242k (NCHS authority); NCHS confidentiality Section 308(d) PHS Act; NHIS methodology; NHANES protocols; OMB Standards for Race/Ethnicity data',
  standards_of_creation = 'Survey design and sample selection documentation; health indicator data quality standards; demographic cross-tabulation methodology; data linkage protocols NHIS-mortality/NHANES-lab results; health disparity measurement methodology; trend analysis documentation',
  soc_controls = 'Section 308(d) confidentiality protections; IRB approval for all survey modifications; informed consent for NHANES examinations; restricted-use data access agreements; publication review for identifiability; peer review of methodology changes'
WHERE name LIKE '%Health Survey Statistician%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Evidence Act (P.L. 115-435); CIPSEA data access for research; Census Bureau RDC policies; Federal Data Strategy; interagency data sharing frameworks',
  standards_of_creation = 'Linked administrative records methodology documentation; ML model validation for demographic estimation; synthetic data product development; small area estimation methodology; data linkage quality assessment; research reproducibility documentation',
  soc_controls = 'Special Sworn Status for researcher access; disclosure review for all research outputs; secure computing environment requirements; research project scope limitation; code and methodology archival; peer review before publication'
WHERE name LIKE '%Demographic Research Data Scientist%';

UPDATE citizen_catalog SET
  governing_guidelines = '22 USC 2151 (Foreign Assistance Act); Census Bureau International Programs mandate; UN Principles and Recommendations for Population and Housing Censuses; DHS survey methodology; international statistical cooperation agreements',
  standards_of_creation = 'International demographic database IDB maintenance; technical assistance for foreign census bureaus; HIV/AIDS demographic impact estimation; international population projection methodology; DHS survey design support; global demographic indicator standardization',
  soc_controls = 'Country-specific data sharing agreements; methodology transparency for international comparisons; data source documentation and quality assessment; publication review for political sensitivity; collaboration with national statistical offices'
WHERE name LIKE '%International Demographic%';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 141 (Census of Indian country); EO 13175 (Tribal consultation requirements); Census Bureau Tribal Consultation Policy; AIAN areas geographic definition; Indian Self-Determination Act',
  standards_of_creation = 'Government-to-government consultation documentation; tribal liaison officer designation; on-reservation address canvassing coordination; tribal enrollment data sharing agreements where authorized; AIAN area geographic boundary updates; tribal Complete Count Committee support',
  soc_controls = 'Tribal sovereignty respect in consultation; tribal data sovereignty considerations; consultation meeting records and follow-up; cultural protocol compliance; tribal review of data products before release where agreed; dual enrollment deduplication'
WHERE name LIKE '%Tribal Affairs Census%';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 9 (Confidentiality for microdata release); Census Bureau PUMS Data User Agreement; Census Bureau Disclosure Avoidance for PUMS; OMB Statistical Policy Directive No. 4; PUMA delineation standards',
  standards_of_creation = 'PUMA geographic area delineation 100K+ population threshold; variable coding and value suppression for public use; top-coding and bottom-coding of extreme values; household and person record linkage; data dictionary completeness; quality verification against internal tabulations',
  soc_controls = 'DRB approval before release; re-identification risk testing; geographic threshold enforcement no sub-PUMA geography; topcoding verification; version control and errata procedures; user support documentation'
WHERE name LIKE '%PUMS%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Title VII Civil Rights Act (42 USC 2000e); Census Bureau EEO Tabulation program; EEOC data collection authority; EO 11246 (Equal employment opportunity); OMB Race and Ethnicity Standards SPD 15',
  standards_of_creation = 'EEO tabulation production by occupation/race/sex/geography; labor force participation data for civil rights enforcement; occupational classification mapping SOC codes; geographic area tabulation at jurisdictional levels; data quality metrics for EEO tabulations',
  soc_controls = 'Disclosure avoidance for EEO tabulations; authorized use limitation for civil rights enforcement; data access agreement requirements; methodology documentation for legal proceedings; peer review of tabulation methodology'
WHERE name LIKE '%EEO Data Specialist%';

-- B5. STATE AND LOCAL DEMOGRAPHIC OPERATIONS (8 Personas)

UPDATE citizen_catalog SET
  governing_guidelines = 'FSCPE agreement requirements; Census Bureau State Data Center SDC program; state statutory requirements for population estimates; Census Bureau Population Estimates methodology',
  standards_of_creation = 'Sub-state population estimate production; state-level demographic data dissemination; census data training and technical assistance; population projection methodology for state planning; data center network coordination',
  soc_controls = 'FSCPE participation agreement compliance; State Data Center lead agency designation; data user training documentation; estimate methodology transparency; challenge coordination between local governments and Census Bureau; annual estimate review'
WHERE name LIKE '%State Demographer%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Census Bureau Complete Count Committee Guide; local government resolution establishing CCC; Census Bureau Outreach toolkit; Section 203 VRA language access for outreach',
  standards_of_creation = 'CCC charter and membership roster; community outreach plan development; hard-to-count population identification; questionnaire assistance center establishment; self-response rate monitoring; community partnership documentation',
  soc_controls = 'Non-partisan committee operations; no access to individual census responses; budget tracking for outreach activities; cultural competency requirements; accessibility compliance for events; post-census evaluation report'
WHERE name = 'Complete Count Committee';

UPDATE citizen_catalog SET
  governing_guidelines = 'Census Bureau School District Review Program; Cal. EDC 17000-17077 (School facilities planning); Census Bureau SAIPE; Title I allocation 20 USC 6333; NCES Common Core of Data',
  standards_of_creation = 'School district boundary verification for census; enrollment projection methodology documentation; Title I eligibility data review; facilities planning demographic analysis; school attendance area demographic profiling; special education population estimation',
  soc_controls = 'Census Bureau verification of school district boundaries; state education department data cross-reference; enrollment projection peer review; FERPA compliance per 20 USC 1232g; public presentation of planning data; annual update cycle'
WHERE name LIKE '%School District Demographic%';

UPDATE citizen_catalog SET
  governing_guidelines = '23 USC 134 (Metropolitan transportation planning); Census Bureau CTPP; AASHTO demographic data standards; OMB MSA delineation; EO 12898 environmental justice demographic analysis',
  standards_of_creation = 'TAZ demographic tabulation; commuting flow data analysis CTPP workplace tables; environmental justice population identification; travel demand model demographic inputs; long-range transportation plan demographic assumptions; socioeconomic forecast methodology',
  soc_controls = 'CTPP data use agreement; TAZ geographic specification accuracy; forecast methodology transparency; environmental justice analysis peer review; public participation process documentation; federal certification review'
WHERE name LIKE '%MPO Demographer%';

UPDATE citizen_catalog SET
  governing_guidelines = '42 USC 1437 (United States Housing Act); HUD AMI methodology; HUD Consolidated Plan requirements; Fair Housing Act 42 USC 3601-3619; AFFH requirements',
  standards_of_creation = 'Area Median Income calculation; fair housing demographic analysis AFFH assessment; Consolidated Plan needs assessment demographics; waiting list demographic profiling; racial/ethnic concentration analysis; disability population housing needs',
  soc_controls = 'HUD data source verification; Census/ACS data application methodology; fair housing analysis independence; public comment period for assessments; civil rights review; annual reassessment cycle'
WHERE name LIKE '%Housing Authority Demographic%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Indian Reorganization Act (25 USC 5123); tribal constitution and enrollment ordinance; BIA enrollment records; Indian Civil Rights Act (25 USC 1301-1304); Santa Clara Pueblo v. Martinez 436 U.S. 49 (1978)',
  standards_of_creation = 'Enrollment application processing; blood quantum calculation and documentation; lineage verification through genealogical records; membership roll maintenance; disenrollment procedures and due process; Certificate of Indian Blood CIB issuance',
  soc_controls = 'Tribal sovereignty over enrollment criteria; due process in enrollment/disenrollment decisions; genealogical records security; BIA coordination for federal recognition; enrollment committee independence; appeal procedures documentation'
WHERE name LIKE '%Tribal Enrollment%';

UPDATE citizen_catalog SET
  governing_guidelines = '42 USC 242k (NCHS/CDC data authority); Cal. HSC 120125 (Disease reporting); Census Bureau demographic data for rate calculations; CDC/ATSDR SVI; HIPAA Privacy Rule (45 CFR 164) de-identification',
  standards_of_creation = 'Population denominator calculation from census/ACS data; age-adjusted rate methodology; SVI application; health disparity quantification by demographic group; small area health estimation; syndromic surveillance data demographic linkage',
  soc_controls = 'HIPAA de-identification Safe Harbor or Expert Determination; IRB approval for research use; census data citation standards; rate suppression for small numbers; data sharing agreement compliance; peer review of methodology'
WHERE name LIKE '%Public Health Epidemiology%';

UPDATE citizen_catalog SET
  governing_guidelines = '13 USC 221 (Refusal/neglect up to $100 fine); 13 USC 222 (False information up to $500 fine); 13 USC 224 (Business failure up to $500/occurrence); 18 USC 3559 (Sentencing classification); Census Bureau Non-Response procedures',
  standards_of_creation = 'Non-response escalation documentation; penalty notification procedures; referral criteria for U.S. Attorney prosecution; business non-compliance tracking; voluntary compliance encouragement before penalty; penalty assessment documentation',
  soc_controls = 'Graduated escalation procedures; written notification requirements; due process in penalty assessment; U.S. Attorney prosecution discretion coordination; record of all penalty actions; penalty waiver/reduction criteria'
WHERE name LIKE '%Title 13 Penalty%';

-- ============================================================================
-- SECTION C: EMERGENCY MANAGEMENT / DISASTER RESPONSE (68 Personas)
-- ============================================================================

-- C1. FEMA DISASTER OPERATIONS (10 Personas)

UPDATE citizen_catalog SET
  governing_guidelines = 'Robert T. Stafford Act (42 USC 5121-5207); 44 CFR Part 206 (Federal disaster assistance); 44 CFR 206.36 (Emergency declarations); 44 CFR 206.35-206.39 (Major disaster declarations); FEMA PDA Guide; Presidential declaration threshold criteria',
  standards_of_creation = 'Preliminary damage assessment joint field documentation; Governors request letter requirements; per capita damage threshold calculation; IA and PA designation criteria; HMGP activation documentation; amendment and extension request processing',
  soc_controls = 'Joint federal/state/local PDA teams; Governor certification of state resource exhaustion; Presidential decision memorandum documentation; FEMA-State Agreement execution; FCO appointment documentation; congressional notification requirements'
WHERE name LIKE '%FEMA Disaster Declaration%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Stafford Act Section 408 (42 USC 5174) federal assistance to individuals/households; 44 CFR 206.101-206.120 (IA provisions); FEMA IAPPG; FEMA IHP policies; FEMA National Processing Service Center procedures',
  standards_of_creation = 'Disaster survivor registration and intake documentation; housing inspection report standards; rental/repair assistance eligibility determination; ONA application processing; DOB verification; appeal processing and adjudication',
  soc_controls = 'Identity verification for applicants; property ownership/occupancy verification; insurance verification before federal assistance; DOB check against SBA/insurance/voluntary organizations; recoupment for improper payments; IG fraud referral; appeal rights notification at every denial'
WHERE name LIKE '%FEMA Individual Assistance%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Stafford Act Sections 403, 406, 407 (42 USC 5170b, 5172, 5173); 44 CFR Part 206 Subparts G-I (Public assistance); FEMA PAPPG; 2 CFR Part 200; FEMA PA Alternative Procedures Section 428',
  standards_of_creation = 'Applicant briefing documentation; project worksheet development; emergency work Cat A-B vs permanent work Cat C-G classification; cost estimation and validation; EHP review; hazard mitigation 406 proposal; time extension and appeal processing',
  soc_controls = 'Applicant eligibility determination; cost share 75% federal / 25% non-federal; insurance deduction verification; procurement per 2 CFR 200.318-326; project closeout and final inspection; Single Audit requirements; de-obligation procedures'
WHERE name LIKE '%FEMA Public Assistance%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Stafford Act Section 404 (42 USC 5170c) hazard mitigation; Stafford Act Section 322 (42 USC 5165) mitigation planning; 44 CFR Part 201; 44 CFR Part 206 Subpart N HMGP; FEMA HMA Guidance; FEMA BCA toolkit',
  standards_of_creation = 'Hazard mitigation plan development and FEMA approval; HMGP application review and scoring; BCA preparation and validation; EHP compliance; property acquisition/demolition procedures; elevation project specifications; mitigation plan 5-year update',
  soc_controls = 'HMGP funding cap 15% of total disaster grants; cost-effectiveness BCR > 1.0; NEPA compliance; Section 106 historic preservation review; floodplain management EO 11988; DOP check; quarterly progress reporting'
WHERE name LIKE '%FEMA Hazard Mitigation%';

UPDATE citizen_catalog SET
  governing_guidelines = 'National Flood Insurance Act (42 USC 4001-4131); 44 CFR Parts 59-78; 44 CFR Part 61 coverage/rates; 44 CFR Part 65 flood map revisions; NFIP Flood Insurance Manual; Biggert-Waters Act 2012; Homeowner Flood Insurance Affordability Act 2014',
  standards_of_creation = 'FIRM interpretation; policy issuance and rating accuracy; claims adjustment procedures; ICC claim processing; CRS audit documentation; substantial damage/improvement determination; elevation certificate FEMA Form 086-0-33 verification',
  soc_controls = 'WYO insurer oversight; claims adjuster licensing; proof of loss deadline 60 days; Flood Insurance Advocate; appeals and litigation procedures; annual NFIP financial reporting; community compliance monitoring'
WHERE name LIKE '%NFIP%';

UPDATE citizen_catalog SET
  governing_guidelines = '44 CFR 59.22 community floodplain management; 44 CFR 60.3 flood-resistant construction; 44 CFR Part 65 map revisions; EO 11988 Floodplain Management; EO 13690 Federal Flood Risk Management; local floodplain ordinance',
  standards_of_creation = 'Floodplain development permit review; BFE compliance verification; substantial improvement/damage determination; LOMA/LOMR applications; Community Assistance Visit preparation; higher regulatory standards implementation',
  soc_controls = 'CFM credential; building permit review for floodplain compliance; community probation/suspension for non-compliance; annual compliance reporting; variance documentation and FEMA notification; records retention for all floodplain actions'
WHERE name LIKE '%Floodplain Administrator%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Small Business Act Section 7(b) (15 USC 636(b)) disaster loan authority; 13 CFR Part 123; SBA SOP 50-30; Stafford Act coordination; SBA Disaster Loan Handbook',
  standards_of_creation = 'Disaster loan application processing Home/Business/EIDL; loss verification inspection documentation; credit worthiness assessment; loan amount determination methodology; collateral requirements documentation; DOB coordination with FEMA',
  soc_controls = 'Application deadline 60 days physical/9 months EIDL; independent loss verification; credit analysis standards; loan closing documentation; disbursement monitoring; default and forgiveness procedures; OIG fraud referral'
WHERE name = 'SBA Disaster Loan';

UPDATE citizen_catalog SET
  governing_guidelines = 'Stafford Act Section 411 (42 USC 5178) DRC provisions; FEMA DRC SOPs; FEMA DSA Team guidelines; ADA Title II; FEMA Language Access Plan',
  standards_of_creation = 'DRC site selection and establishment documentation; multi-agency service coordination; survivor registration and assistance tracking; daily operations reports; staffing and volunteer coordination; accessibility compliance; DRC closure criteria',
  soc_controls = 'Multi-agency staffing coordination; survivor PII protection; accessibility compliance ADA/language access; daily survivor count and service tracking; safety and security protocols; inter-agency deconfliction; post-operation evaluation'
WHERE name LIKE '%Disaster Recovery Center%';

UPDATE citizen_catalog SET
  governing_guidelines = 'NEPA (42 USC 4321-4347); NHPA Section 106 (54 USC 306108); ESA Section 7 (16 USC 1536); EO 11988 Floodplain; EO 11990 Wetlands; 44 CFR Part 10; FEMA EHP NEPA procedures',
  standards_of_creation = 'Categorical exclusion documentation; EA preparation; FONSI determination; Section 106 consultation with SHPO/THPO; ESA consultation with USFWS; floodplain/wetland assessment; tribal consultation for cultural resources',
  soc_controls = 'EHP review required before FEMA funding obligation; SHPO/THPO concurrence documentation; public notice for floodplain actions; environmental condition documentation; EHP record retention; programmatic agreement compliance for repetitive actions'
WHERE name LIKE '%FEMA Environmental%Historic%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Inspector General Act (5 USC App.); 18 USC 1001 (False statements); 18 USC 287 (False claims); 31 USC 3729-3733 (False Claims Act); Stafford Act Section 312 (42 USC 5155) DOB; FEMA Fraud Prevention standards',
  standards_of_creation = 'Fraud allegation intake and prioritization; investigation case file documentation; financial forensic analysis; identity theft detection in disaster claims; DOB analysis; prosecution referral preparation',
  soc_controls = 'NCDF hotline 866-720-5721; joint law enforcement task force; qui tam/whistleblower protection; case management system documentation; evidence chain of custody; grand jury coordination; asset forfeiture proceedings'
WHERE name LIKE '%FEMA%Fraud Investigator%';

-- C2. INCIDENT COMMAND AND EMERGENCY OPERATIONS (10 Personas)

UPDATE citizen_catalog SET
  governing_guidelines = 'NIMS doctrine; ICS FEMA IS-100/IS-200/IS-300/IS-400; 44 CFR Part 206 Subpart D; Cal. Gov. Code 8607 (SEMS); HSPD-5; Cal. Gov. Code 8668 (Local emergency powers)',
  standards_of_creation = 'ICS Form 201 Incident Briefing; Form 202 Objectives; Form 203 Organization; Form 205 Radio Plan; Form 209 Status Summary; Form 214 Activity Log; IAP development and approval; unified command integration',
  soc_controls = 'Clear chain of command; span of control 3-7; transfer of command briefing; delegation of authority; incident within incident documentation; AAR requirement; NIMS compliance certification'
WHERE name LIKE '%Incident Commander%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Gov. Code 8585 (OES); Cal. Gov. Code 8607 (SEMS); NIMS EOC/MACS doctrine; FEMA EOC Operations Manual; Cal. Gov. Code 8630 (Local emergency proclamation); FEMA IS-775',
  standards_of_creation = 'EOC activation level documentation; MAC group records; resource request and tracking; situation status displays and reports; EOC staffing and roster management; common operating picture; demobilization documentation',
  soc_controls = 'Activation authority and notification procedures; position credentialing and training verification; communication redundancy; operational period planning cycle; resource tracking system integrity; ICS interoperability; AAR and IP development'
WHERE name LIKE '%EOC%Manager%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Gov. Code 8610-8614 (Emergency organization); Cal. Gov. Code 8630-8634 (Local emergencies); Stafford Act (42 USC 5121+); FEMA EMPG; Cal. Gov. Code 8588 (Mutual aid); EMAP standards',
  standards_of_creation = 'EOP development and maintenance; multi-year training and exercise plan; COOP development; community hazard/risk assessment; mutual aid agreement development; EMPG grant performance reporting; emergency proclamation and termination',
  soc_controls = 'EMAP accreditation maintenance; annual EOP review; exercise schedule HSEEP standards; EMPG reporting; elected official briefing; multi-jurisdictional coordination; PIO coordination'
WHERE name LIKE '%Emergency Management Director%';

UPDATE citizen_catalog SET
  governing_guidelines = 'NIMS ICS Planning Section doctrine; ICS Form 202; Form 204 Assignment List; Form 206 Medical Plan; Form 209; FEMA IS-300/400',
  standards_of_creation = 'IAP compilation and distribution; situation report cycle; resource status tracking ICS 210/211; demobilization plan; technical specialist coordination; Documentation Unit records; GIS/mapping products',
  soc_controls = 'Planning meeting facilitation; operational period transition; resource status accuracy; historical documentation preservation; after-action data collection; information security for sensitive incidents'
WHERE name LIKE '%Planning Section Chief%';

UPDATE citizen_catalog SET
  governing_guidelines = 'NIMS ICS Finance/Admin doctrine; 2 CFR Part 200; 44 CFR Part 206 FEMA reimbursement; ICS Form 213/214; state/local procurement policies; FEMA PA cost documentation',
  standards_of_creation = 'Time Unit records personnel/equipment; Procurement Unit emergency contracts/mutual aid; Compensation/Claims Unit records; Cost Unit tracking; force account labor; equipment use documentation FEMA rates; invoice and payment documentation',
  soc_controls = 'Fiscal authority delegation; emergency procurement threshold compliance; time keeping accuracy; claims investigation authority; cost recovery tracking; audit trail for all financial transactions; grant closeout documentation'
WHERE name LIKE '%Finance%Administration Section%';

UPDATE citizen_catalog SET
  governing_guidelines = 'NIMS ICS Logistics doctrine; FEMA NLS framework; ICS Form 205A/213; Cal. Gov. Code 8588 mutual aid; FEMA IS-300/400',
  standards_of_creation = 'Resource ordering and tracking; base/camp establishment records; communications plan ICS 205; medical plan ICS 206; ground support/transportation records; supply unit inventory; facility security and maintenance records',
  soc_controls = 'Resource ordering authority controls; inventory reconciliation; communications interoperability verification; facility safety inspections; medical unit capability; demobilization resource tracking; cost accountability'
WHERE name LIKE '%Logistics Section Chief%';

UPDATE citizen_catalog SET
  governing_guidelines = 'NIMS ICS Safety Officer doctrine; ICS Form 208; 29 CFR 1910.120 HAZWOPER; 29 CFR 1926 construction safety; NFPA 1500; FEMA IS-300/400',
  standards_of_creation = 'Site Safety Plan ICS 208; hazard identification and risk assessment; safety briefing documentation; accident/injury investigation reports; PPE requirements; exposure monitoring; corrective action tracking',
  soc_controls = 'Authority to stop unsafe operations; hazard reporting system; accident investigation within 24 hours; safety message in every IAP; exposure records per OSHA; workers comp coordination; risk management documentation'
WHERE name LIKE '%ICS Safety Officer%';

UPDATE citizen_catalog SET
  governing_guidelines = 'NIMS Public Information doctrine; FEMA IS-702; JIS/JIC guidelines; FCC WEA (47 CFR Part 10); EAS (47 CFR Part 11); Cal. Gov. Code 8593.7',
  standards_of_creation = 'Press release accuracy and timing; social media coordination; JIC activation and staffing; rumor control documentation; media briefing records; public warning dissemination; WEA/EAS message content and authorization',
  soc_controls = 'Message approval chain IC authorization; consistent messaging JIS; media inquiry tracking; public information correction; social media policy; accessibility ADA/language access; records retention'
WHERE name LIKE '%Public Information Officer%';

UPDATE citizen_catalog SET
  governing_guidelines = '47 CFR Part 97 amateur radio RACES; 47 CFR 97.407 RACES operations; FEMA AuxComm guidelines; Cal. Gov. Code 8590; ARRL ARES/RACES Manual; FEMA IS-700',
  standards_of_creation = 'RACES/ARES volunteer registration and credentialing; communications plan integration ICS 205; message handling radiogram format; equipment inventory and readiness; frequency coordination; training/exercise participation; activation/deactivation procedures',
  soc_controls = 'FCC license verification; government authorization for RACES activation; message log maintenance; equipment maintenance records; ICS integration; background check for access; exercise participation minimums'
WHERE name LIKE '%RACES%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Gov. Code 8550-8668; Cal. Gov. Code 8561 Master Mutual Aid Agreement; EMAC (Cal. Gov. Code 179); Cal. Gov. Code 8616; FEMA National Mutual Aid System; NIMS Resource Typing',
  standards_of_creation = 'Mutual aid agreement execution and maintenance; resource typing and credentialing per NIMS; mutual aid request and deployment documentation; EMAC interstate request processing; resource tracking during deployment; reimbursement documentation; after-deployment evaluation',
  soc_controls = 'Formal agreement before deployment; resource request through proper channels OES; liability and workers comp coverage; deployment order/authorization records; demobilization procedures; cost reimbursement claim filing; multi-year agreement renewal'
WHERE name = 'Mutual Aid Coordinator';

-- C3. EMERGENCY PLANNING AND PREPAREDNESS (10 Personas)

UPDATE citizen_catalog SET
  governing_guidelines = 'FEMA CPG 101; Cal. Gov. Code 8610; HSPD-8; PPD-8; EMAP Standard 4.4; 19 CCR 2400-2450 SEMS',
  standards_of_creation = 'Basic plan with concept of operations; functional/support annexes ESF structure; hazard-specific appendices; roles matrix; resource management procedures; plan review schedule; public review and adoption documentation',
  soc_controls = 'Multi-agency plan committee; plan adoption by governing body; annual review; exercise validation; distribution list and version control; classified annex handling; ADA compliance for public version'
WHERE name LIKE '%Emergency Operations Plan%';

UPDATE citizen_catalog SET
  governing_guidelines = 'FCD-1; FCD-2; FEMA CGC; PPD-40 National Continuity Policy; Cal. Gov. Code 8607 SEMS COOP',
  standards_of_creation = 'MEF identification and prioritization; orders of succession; delegations of authority; alternate facility identification; vital records protection; devolution planning; reconstitution procedures; COOP testing and exercise',
  soc_controls = 'Annual COOP review and certification; succession notification; alternate facility readiness verification; vital records backup testing; COOP activation authority; employee notification system testing; multi-year exercise schedule'
WHERE name LIKE '%Continuity of Operations%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Stafford Act Section 322 (42 USC 5165); 44 CFR Part 201; FEMA Hazard Mitigation Planning guidance; Cal. Gov. Code 65302(g)(4); FEMA Local Mitigation Plan Review Guide; FEMA THIRA guide',
  standards_of_creation = 'Multi-jurisdictional hazard mitigation plan; risk assessment probability x consequence; vulnerability analysis by hazard; mitigation strategy prioritization; capability assessment; plan maintenance; FEMA crosswalk; 5-year update',
  soc_controls = 'FEMA approval for HMGP eligibility; public participation documentation; multi-jurisdictional coordination; annual progress reporting; plan adoption by each jurisdiction; general plan consistency; state plan integration'
WHERE name LIKE '%Hazard Mitigation Plan%';

UPDATE citizen_catalog SET
  governing_guidelines = 'FEMA CERT Basic Training; FEMA Citizen Corps; Cal. Gov. Code 8610.5; Cal. HSC 1799.102 Good Samaritan; FEMA IS-317; Volunteer Protection Act (42 USC 14501-14505)',
  standards_of_creation = 'CERT training per FEMA curriculum; training completion and certification records; team activation and deployment documentation; equipment inventory and maintenance; exercise participation records; volunteer management database; annual training',
  soc_controls = 'Background checks; liability coverage volunteer protection; equipment safety inspections; activation authority credentialed EOC official only; after-action review; skill currency maintenance; volunteer recognition tracking'
WHERE name LIKE '%CERT%';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSEEP Doctrine 2020; DHS Exercise and Evaluation Manual; PPD-8 National Exercise Program; Cal. Gov. Code 8607 SEMS exercise; EMAP Standard 4.8; FEMA HSEEP',
  standards_of_creation = 'Multi-year TEP; exercise design ExPlan/MSEL/C-E Guide; tabletop/functional/full-scale execution; exercise evaluation methodology; AAR/IP development; corrective action tracking; National Exercise Program participation',
  soc_controls = 'Objectives tied to capability gaps; player/evaluator/controller separation; artificiality documentation; safety controller; evaluation team independence; improvement plan accountability; HSEEP compliance'
WHERE name LIKE '%HSEEP%';

UPDATE citizen_catalog SET
  governing_guidelines = '47 CFR Part 11 EAS; 47 CFR Part 10 WEA; FEMA IPAWS; Cal. Gov. Code 8593.7; Presidential communications authority; NOAA/NWS alert protocols',
  standards_of_creation = 'EAS activation procedures and authorization chain; WEA message composition 90/360 character limits; IPAWS originator certification; geographic targeting accuracy; alert type classification; cancellation/update procedures; monthly/weekly EAS tests',
  soc_controls = 'IPAWS COG authorization; authentication for origination; dual-authorization for high-level alerts; false alert investigation; system testing and redundancy; alert log retention; public education'
WHERE name LIKE '%Emergency Alert System%';

UPDATE citizen_catalog SET
  governing_guidelines = 'FEMA REP Program Manual; NUREG-0654/FEMA-REP-1; 10 CFR 50.47; 44 CFR Part 350; EPA PAGs; Cal. Gov. Code 8610 nuclear emergency plan',
  standards_of_creation = 'REP plan for EPZ; plume and ingestion pathway protection; KI distribution planning; evacuation time estimate study; dose assessment; protective action recommendation; biennial REP exercise',
  soc_controls = 'FEMA REP plan approval per 44 CFR 350; NRC/FEMA joint exercise evaluation; deficiency tracking; annual plan review and certification; multi-jurisdictional coordination; NRC resident inspector coordination; public info update'
WHERE name LIKE '%Nuclear Emergency Planner%';

UPDATE citizen_catalog SET
  governing_guidelines = 'PAHPA (42 USC 247d); PHEP cooperative agreement; HPP requirements; CDC Pandemic Influenza Plan; HHS Crisis Standards of Care; Cal. HSC 101000-101605',
  standards_of_creation = 'Pandemic operations plan; MCM distribution planning; healthcare surge capacity; NPI implementation plans; continuity of healthcare operations; mass fatality management; crisis standards of care framework',
  soc_controls = 'HHS/ASPR grant compliance; exercise requirement PHEP/HPP; multi-jurisdictional health coordination; SNS coordination; ethics framework for scarce resources; after-action review; annual plan update'
WHERE name LIKE '%Pandemic%Emergency Planner%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Tsunami Warning and Education Act (33 USC 3201-3208); ShakeAlert EEW protocols; NOAA Tsunami Warning Center; Cal. Gov. Code 8587.5; Cal. PRC 2621-2630 Alquist-Priolo; CGS SP 117',
  standards_of_creation = 'Tsunami evacuation zone mapping; tsunami evacuation plan; ShakeAlert distribution and integration; earthquake early warning dissemination; inundation modeling; TsunamiReady recognition; seismic hazard assessment integration',
  soc_controls = 'NOAA TWC alert authentication; evacuation route signage; annual tsunami warning test; community education; real-time seismic monitoring; false alarm investigation; multi-agency coordination'
WHERE name LIKE '%Tsunami%Earthquake%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. PRC 4201-4204 fire hazard severity zones; Cal. Gov. Code 51175-51189 VHFHSZ; Cal. PRC 4291 defensible space; CAL FIRE CWPP; National Cohesive Wildland Fire Strategy; Healthy Forests Restoration Act (16 USC 6501-6591)',
  standards_of_creation = 'CWPP development; wildfire evacuation plan; defensible space inspection records; fire hazard severity zone mapping; pre-fire assessment and resource staging; WUI building code compliance; Firewise USA recognition',
  soc_controls = 'CAL FIRE CWPP approval; annual defensible space inspections; evacuation route capacity analysis; Red Flag Warning procedures; multi-agency coordination CAL FIRE/USFS/local; post-fire damage assessment; grant compliance'
WHERE name LIKE '%Wildfire Emergency Planner%';

-- C4. EMERGENCY MEDICAL SERVICES AND MASS CASUALTY (8 Personas)

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. HSC 1797-1799.207 (EMS System Act); Cal. HSC 1798 LEMSA authority; NHTSA National EMS Scope of Practice; NHTSA EMS Education Standards; 42 CFR 482.55 Hospital CoP; LEMSA policies',
  standards_of_creation = 'EMS treatment protocol development; personnel scope of practice authorization; QA/QI program; run report standards; medical oversight online/offline; medication administration protocols; ALS/BLS standards',
  soc_controls = 'Physician medical director license verification; protocol review cycle; QA/QI case review; personnel certification EMT/Paramedic; controlled substance accountability; patient care report review; outcome tracking'
WHERE name = 'EMS Medical Director';

UPDATE citizen_catalog SET
  governing_guidelines = 'NEMSIS data standard Version 3.5+; Cal. HSC 1797.220; HIPAA Privacy Rule (45 CFR 164); LEMSA patient care reporting; CMS ambulance documentation; Cal. HSC 1798.200',
  standards_of_creation = 'ePCR data element completeness NEMSIS required fields; response time documentation; clinical documentation assessment/treatment/transport; patient refusal documentation; interfacility transfer; trauma system notification; HIPAA-compliant exchange',
  soc_controls = 'ePCR system access controls; data validation rules; NEMSIS submission quality; patient privacy; QA/QI review integration; record retention minimum 7 years per Cal. HSC; billing documentation accuracy'
WHERE name LIKE '%EMS Run Report%';

UPDATE citizen_catalog SET
  governing_guidelines = 'FIRESCOPE MCI Plan; START/JumpSTART triage; SALT triage; LEMSA MCI policies; hospital MCI/surge protocols; Cal. HSC 1798.6',
  standards_of_creation = 'MCI triage documentation tag assignment; patient tracking through treatment/transport; hospital notification and bed tracking; resource request documentation; casualty collection point; morgue/fatality coordination; family reunification center',
  soc_controls = 'MCI declaration authority; triage officer credentialing; patient tracking integrity; hospital diversion documentation; controlled substance accountability during MCI; scene security; after-action medical review'
WHERE name LIKE '%Mass Casualty%';

UPDATE citizen_catalog SET
  governing_guidelines = 'INTERPOL DVI Guide; DHHS/ASPR Mass Fatality Management; Cal. Gov. Code 27491 coroner; FEMA ESF-8; NDMS DMORT; CAP forensic standards',
  standards_of_creation = 'Victim identification chain; antemortem/postmortem data collection; DNA sample chain of custody; dental records comparison; fingerprint/physical ID records; family reference samples; death certificate issuance in mass fatality',
  soc_controls = 'ME/coroner jurisdiction; DVI team credentialing; evidence chain of custody; family assistance center; ID confirmation minimum two methods; remains release documentation; cultural/religious considerations'
WHERE name LIKE '%Disaster Victim Identification%';

UPDATE citizen_catalog SET
  governing_guidelines = 'PHEP cooperative agreement; CDC CRI; SNS 12-hour push package; PREP Act (42 USC 247d-6d); EUA (21 USC 360bbb-3); Cal. HSC 120130 quarantine/isolation',
  standards_of_creation = 'MCM distribution plan; POD site planning; cold chain management; inventory tracking; EUA compliance; adverse event reporting VAERS/MedWatch; lot number tracking for recall',
  soc_controls = 'CDC technical assistance compliance; 48-hour distribution goal; chain of custody controlled pharmaceuticals; temperature monitoring; personnel credentialing for MCM; adverse event investigation; inventory reconciliation at each tier'
WHERE name LIKE '%Medical Countermeasure%';

UPDATE citizen_catalog SET
  governing_guidelines = 'CMS Emergency Preparedness Rule (42 CFR 482.15); TJC EM standards; HPP cooperative agreement; Cal. HSC 1250-1340; HCAI seismic safety SB 1953; NFPA 99',
  standards_of_creation = 'Hospital EOP; HVA annual update; exercise program 2/year 1 community-based; surge capacity planning; 96-hour self-sufficiency; HICS implementation; communication procedures',
  soc_controls = 'CMS survey compliance; TJC accreditation; annual HVA review; exercise AAR; HPP reporting; seismic safety SB 1953 compliance; generator/utility failure testing'
WHERE name LIKE '%Hospital Emergency Preparedness%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. HSC 1797.61-1797.84 EMT; Cal. HSC 1797.170-1797.220 paramedic licensure; NREMT; NHTSA EMS Education Standards; CECBEMS; LEMSA provider authorization',
  standards_of_creation = 'Initial certification/licensure processing; CE tracking; skills competency verification; background check and fitness for duty; scope of practice documentation; reciprocity processing; disciplinary action documentation',
  soc_controls = 'EMSA/LEMSA certification authority; NREMT registry integrity; CE accreditation CECBEMS/CAPCE; disciplinary hearing due process; impaired provider program; certification renewal enforcement; public lookup availability'
WHERE name LIKE '%EMT%Paramedic Certification%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. HSC 1798.160-1798.172 trauma care; ACS VRC standards; EMSA Trauma Planning; LEMSA Trauma Plan; CDC Field Triage Guidelines',
  standards_of_creation = 'Trauma center designation/verification; trauma registry NTDB data quality; triage/destination protocol; system performance improvement; inter-facility transfer agreements; mortality/morbidity review; trauma system plan',
  soc_controls = 'ACS VRC re-verification 3-year; LEMSA designation review; trauma registry submission compliance; PIPS committee; trauma medical director oversight; bypass/diversion tracking; TQIP benchmarking'
WHERE name LIKE '%Trauma System Coordinator%';

-- C5. DISASTER RECOVERY AND ASSISTANCE (8 Personas)

UPDATE citizen_catalog SET
  governing_guidelines = 'ATC-20 Postearthquake Safety Evaluation; ATC-45 Wind/Flood Evaluation; Cal. HSC 19100-19165; FEMA P-154; Cal OES SAP; ICC/NSSA Damage Assessment Standard',
  standards_of_creation = 'Rapid safety evaluation placard green/yellow/red; detailed damage assessment; structural/non-structural classification; percentage of damage estimation; unsafe building notification; re-inspection/clearance; damage summary for PDA',
  soc_controls = 'SAP evaluator credentialing; building official access restriction authority; placard posting tracking; property owner notification; appeal procedures; liability protection per Cal. Gov. Code 8657; data compilation for FEMA PDA'
WHERE name LIKE '%Post-Disaster Damage Assessment%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Stafford Act Section 403 (42 USC 5170b); FEMA ESF-6; ARC Shelter Operations Manual; ADA Title II; Cal. Gov. Code 8588.15 AFN; Post v. City of Fort Lauderdale',
  standards_of_creation = 'Shelter activation and registration; population tracking; feeding/dormitory records; health surveillance/first aid; AFN accommodation records; supply inventory; deactivation and transition procedures',
  soc_controls = 'Shelter manager credentialing Red Cross; ADA compliance; sex offender registry check; animal shelter coordination; sanitation/health inspection; security staffing and incident reporting; daily population reports'
WHERE name LIKE '%Emergency Shelter Manager%';

UPDATE citizen_catalog SET
  governing_guidelines = 'National VOAD Points of Consensus; FEMA VAL program; Cal. Gov. Code 8589.65; LTRG guide; IRS 501(c)(3); OMB Circular A-133',
  standards_of_creation = 'VOAD coordination meeting documentation; unmet needs identification; donations management; volunteer management and credentialing; long-term recovery plan; service delivery tracking and deduplication; emergency to recovery transition',
  soc_controls = 'DOB tracking across organizations; case management confidentiality; donations accountability; volunteer background screening; service delivery equity; financial accountability; grant compliance'
WHERE name LIKE '%VOAD%';

UPDATE citizen_catalog SET
  governing_guidelines = '2 CFR 200.318-326; Cal. Pub. Contract Code 1102; Cal. Gov. Code 8645; FAR Part 18; FEMA PAPPG procurement; Cal. Gov. Code 14838',
  standards_of_creation = 'Emergency determination and justification; expedited competitive procurement; non-competitive/sole source justification; cost/price analysis; contract with federal clauses; change order management; contractor performance monitoring',
  soc_controls = 'Emergency declaration as authority; delegation documentation; cost reasonableness; FEMA clause requirements; prohibited cost-plus-percentage; conflict of interest documentation; post-event audit; bond and insurance'
WHERE name LIKE '%Emergency Procurement%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Stafford Act Section 404/406; FEMA NDRF; HUD CDBG-DR (42 USC 5301+); PPD-8 Recovery; FEMA Pre-Disaster Recovery Planning Guide; HUD Federal Register CDBG-DR allocation',
  standards_of_creation = 'Recovery Support Strategy; community recovery needs assessment; RSF coordination; CDBG-DR action plan; housing recovery plan; economic recovery strategy; recovery performance metrics',
  soc_controls = 'FEMA recovery coordination; CDBG-DR HUD approval; community engagement documentation; quarterly CDBG-DR reporting; Single Audit compliance; DOB verification; civil rights compliance'
WHERE name LIKE '%Disaster Recovery Planning%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Ins. Code 790-790.15; Cal. Ins. Code 2051-2051.5; 10 CCR 2695.1-2695.17 Fair Claims Settlement; NFIP Claims Manual; Cal. Ins. Code 10089-10089.40 FAIR Plan; Cal. Ins. Code 10090 CEA',
  standards_of_creation = 'Timely claim acknowledgment 15 days per 10 CCR 2695.5; full investigation and coverage determination; detailed loss estimate; proof of loss assistance; ALE documentation; subrogation documentation; total loss vs repair determination',
  soc_controls = 'CDI licensing and CE; Fair Claims Settlement compliance; claim file standards; unfair practices prohibition; policyholder rights notification; catastrophe response time standards; adjuster supervision for CAT deployment'
WHERE name LIKE '%Insurance Adjuster%Catastrophe%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Stafford Act Section 426 (42 USC 5189e); FEMA DCM guidance; HHS DCM Technical Assistance; FEMA IA guidance; NASW case management standards',
  standards_of_creation = 'Survivor recovery plan; needs assessment documentation; resource referral and service coordination; progress monitoring and updates; case closure criteria; cultural/linguistic competency; privacy and consent forms',
  soc_controls = 'Case manager credentialing and training; client consent and privacy; service delivery duplication avoidance; supervisor case review; outcome data tracking; grant performance reporting; cultural competency'
WHERE name LIKE '%Disaster Case Manager%';

UPDATE citizen_catalog SET
  governing_guidelines = 'FEMA IHP Inspection Manual; SBA Loss Verification; HUD Housing Quality Standards (24 CFR 982.401); FEMA IAPPG housing inspection; Cal. HSC 17920-17928',
  standards_of_creation = 'Habitability determination; damage quantification real/personal property; FEMA Verified Loss calculation; photo documentation standards; access and re-inspection procedures; MHU site inspection; rental resource assessment',
  soc_controls = 'Inspector credentialing and background check; QA reinspection program; photo documentation verification; FVL calculation review; fraud detection indicators; inspection timeline; appeal triggers re-inspection'
WHERE name LIKE '%Post-Disaster Housing Inspector%';

-- C6. HAZARDOUS MATERIALS AND SPECIALIZED RESPONSE (8 Personas)

UPDATE citizen_catalog SET
  governing_guidelines = '29 CFR 1910.120 HAZWOPER; 40 CFR Part 300 NCP; 40 CFR Part 311; Cal. HSC 25500-25520; Cal. Lab. Code 6300-6400; NFPA 472; DOT ERG',
  standards_of_creation = 'IAP for hazmat incidents; hazard ID and risk assessment; exposure monitoring/air sampling; decontamination procedures; PPE selection Level A/B/C/D; medical surveillance; post-incident environmental sampling',
  soc_controls = '40-hour HAZWOPER certification; annual 8-hour refresher; medical surveillance per 29 CFR 1910.120(f); IC hazmat qualification; buddy system hot zone; exposure records 30-year OSHA retention; post-incident AAR'
WHERE name LIKE '%HAZWOPER%';

UPDATE citizen_catalog SET
  governing_guidelines = '10 CFR Part 20 NRC Radiation Standards; 10 CFR Part 50; FEMA REP Manual; EPA PAGs; DOE/NNSA RAP; NCRP Report 165',
  standards_of_creation = 'Radiological monitoring and dose assessment; protective action recommendation; contamination survey and mapping; decontamination effectiveness; population dose estimation; environmental pathway analysis; recovery phase monitoring plan',
  soc_controls = 'Radiation worker qualifications and dosimetry; ALARA documentation; dose record lifetime tracking; NRC event notification per 10 CFR 50.72; emergency classification authority; ingestion pathway coordination; long-term monitoring'
WHERE name LIKE '%Nuclear%Radiological Emergency Responder%';

UPDATE citizen_catalog SET
  governing_guidelines = 'FEMA National US&R System; 44 CFR Part 208; FEMA US&R Operations Manual; NFPA 1670; NFPA 1006; Cal. Gov. Code 8585-8589',
  standards_of_creation = 'Task force activation and mobilization; structural triage/assessment; search operations canine/technical/physical; rescue operations records; medical team patient care; equipment deployment/maintenance; demobilization/rehabilitation',
  soc_controls = 'FEMA US&R credentialing; member certification verification; equipment cache readiness; structural specialist authority; safety officer per task force; post-deployment medical monitoring; equipment accountability'
WHERE name LIKE '%Urban Search and Rescue%';

UPDATE citizen_catalog SET
  governing_guidelines = 'FEMA PAPPG debris chapter; FEMA-325 Debris Management Guide; 40 CFR 239-258; FEMA Debris Monitoring Guide; EPA emergency debris; Cal. PRC 40000-40203',
  standards_of_creation = 'Debris management plan; quantity estimation; TDSRS documentation; load ticket documentation; environmental monitoring at TDSRS; hazardous waste segregation; site closure and restoration',
  soc_controls = 'FEMA-eligible debris documentation; debris monitoring oversight; truck certification and capacity verification; roving/tower monitors; hazardous waste separate handling; environmental compliance; fraud prevention controls'
WHERE name LIKE '%Disaster Debris Management%';

UPDATE citizen_catalog SET
  governing_guidelines = 'FEMA US&R Canine Standards; NASAR SAR dog certification; NFPA 1670; state SAR coordination; FEMA K-9 readiness evaluation; AKC/NASAR certification',
  standards_of_creation = 'K-9 team certification/recertification; search deployment documentation; canine alert documentation; training logs minimum hours; canine health/veterinary records; search sector records; POD estimation',
  soc_controls = 'Biennial recertification; independent evaluator; veterinary fitness-for-duty; handler credentialing; training hour minimums; deployment health monitoring; after-action canine performance evaluation'
WHERE name LIKE '%Search and Rescue Dog%';

UPDATE citizen_catalog SET
  governing_guidelines = 'NFPA 1670 water rescue; NFPA 1006 technical rescue qualifications; CAL FIRE swiftwater rescue; US Coast Guard flood response; FEMA IS-111; Cal. Gov. Code 8589.5 dam inundation',
  standards_of_creation = 'Rescue operation documentation location/conditions/outcome; personnel qualification verification; equipment inspection/maintenance; water rescue incident reporting; annual in-water training; patient/victim tracking; risk assessment',
  soc_controls = 'Technician-level minimum; equipment safety inspection before deployment; buddy system/team minimums; PFD mandate; medical monitoring extended operations; after-action review all rescues; state/federal incident reporting'
WHERE name LIKE '%Swiftwater%';

UPDATE citizen_catalog SET
  governing_guidelines = 'PETS Act (42 USC 5196a-d note); Cal. Gov. Code 8608 CARES; Cal. Gov. Code 8588.15 animal evacuation; FEMA ESF-11; AVMA disaster response',
  standards_of_creation = 'Animal evacuation shelter establishment; animal intake/identification records; veterinary triage/treatment; owner reunification tracking; large animal evacuation; animal decontamination; animal mortality documentation',
  soc_controls = 'Veterinary oversight; animal ID and owner matching database; zoonotic disease monitoring; bite incident reporting; volunteer credentialing; controlled substance management veterinary; disposition of unclaimed animals'
WHERE name LIKE '%Disaster Animal Response%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Stafford Act Section 416 (42 USC 5183); FEMA CCP; SAMHSA Disaster Behavioral Health; Cal. WIC 5000-5900 LPS Act; 42 USC 290dd-2 SUD confidentiality; APA/NASW disaster behavioral health guidelines',
  standards_of_creation = 'Crisis counseling service delivery; ISP and RSP records; PFA documentation; outreach/education activity; assessment/referral documentation; cultural/linguistic service records; program performance metrics',
  soc_controls = 'Licensed mental health supervision; client confidentiality per 42 USC 290dd-2; informed consent; mandated reporting compliance; grant performance ISP 60-day/RSP 9-month; outcome data tracking; staff support/secondary trauma monitoring'
WHERE name LIKE '%Disaster Behavioral Health%';

-- C7. AFTER-ACTION AND IMPROVEMENT (6 Personas)

UPDATE citizen_catalog SET
  governing_guidelines = 'HSEEP AAR/IP guidance; FEMA LLIS; Cal. Gov. Code 8607 SEMS after-action; 19 CCR 2450; EMAP Standard 4.9; NIMS NQS Guideline',
  standards_of_creation = 'AAR structure executive summary/overview/analysis/findings; strength and improvement identification; root cause analysis; corrective action recommendations; improvement plan with responsible party/timeline/resources; SEMS multi-agency coordination; corrective action tracking',
  soc_controls = '90-day AAR completion per 19 CCR 2450; multi-agency review; corrective action implementation tracking; quarterly progress reporting; training/exercise integration; LLIS submission; elected official briefing'
WHERE name LIKE '%After Action Report%';

UPDATE citizen_catalog SET
  governing_guidelines = 'EMAP Standard current version; ANSI/EMAP EMS 5-2019; NFPA 1600; EMAP Assessment Methodology; EMAP Commissioner training',
  standards_of_creation = 'Self-assessment completion; evidence file preparation for all standards; on-site assessment facilitation; corrective action plan; accreditation maintenance documentation; annual compliance report; 5-year reaccreditation',
  soc_controls = 'Independent assessor team; EMAP Commission review and vote; conditional accreditation with corrective action; annual compliance reporting; reaccreditation full review; public recognition; complaint investigation'
WHERE name LIKE '%EMAP%Assessor%';

UPDATE citizen_catalog SET
  governing_guidelines = 'FCD-1; FCD-2; CGC assessment criteria; PPD-40; FEMA Continuity Assessment Tool CAT',
  standards_of_creation = 'COOP plan assessment against FCD-1; exercise evaluation for continuity; essential functions capability assessment; alternate facility readiness; IT systems continuity; human capital continuity; devolution readiness',
  soc_controls = 'Annual self-assessment; FEMA biennial assessment; corrective action plan; senior leadership certification; cross-agency coordination assessment; classification handling'
WHERE name LIKE '%Continuity Program Assessor%';

UPDATE citizen_catalog SET
  governing_guidelines = 'NIMS Doctrine 3rd Edition 2017; HSPD-5; FEMA NQS; FEMA IS-700; Cal. Gov. Code 8607 SEMS/NIMS; FEMA NIMS Implementation Objectives',
  standards_of_creation = 'NIMS implementation plan; ICS training compliance by position; resource typing and credentialing; mutual aid NIMS compliance; MACS documentation; public information/warning NIMS compliance; baseline assessment',
  soc_controls = 'NIMS compliance for federal grants; training completion verification by position; annual self-assessment; ICS credential verification for deployment; NIMS in all emergency plans; typing/credentialing accuracy; gap analysis and corrective action'
WHERE name LIKE '%NIMS Compliance%';

UPDATE citizen_catalog SET
  governing_guidelines = '2 CFR Part 200; FEMA Preparedness Grants Manual; EMPG guidance; SHSP guidance; UASI guidance; 44 CFR Part 206',
  standards_of_creation = 'Grant application and investment justification; award acceptance; budget/expenditure tracking by project; quarterly performance reporting; equipment procurement and inventory; match/cost-share EMPG 50/50; grant closeout',
  soc_controls = 'Single Audit per 2 CFR 200 Subpart F; equipment inventory/disposition; time and effort documentation; procurement standards; BSIR submission; period of performance compliance; deobligation procedures'
WHERE name LIKE '%Emergency Management Grant%';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSIN User Agreement; 6 USC 124h DHS intelligence; ISE guidelines; 28 CFR Part 23; EO 13388 Information Sharing; Privacy Act',
  standards_of_creation = 'HSIN access request/approval; threat information sharing protocols; situational awareness reports; information classification/handling; SAR documentation; intelligence product dissemination tracking',
  soc_controls = 'HSIN Trusted Agent certification; background investigation; need-to-know access; information handling/marking; 28 CFR Part 23 reasonable suspicion; privacy/civil liberties protections; audit trail for all access'
WHERE name LIKE '%HSIN%';

-- C8. SPECIALIZED EMERGENCY FUNCTIONS (8 Personas)

UPDATE citizen_catalog SET
  governing_guidelines = 'PHEP Cooperative Agreement CDC-RFA-TP18-1802; CDC PHEP Capabilities; Cal. HSC 101000-101605; Public Health Service Act (42 USC 243, 247d); HPP-PHEP alignment; 42 CFR Part 70/71 quarantine',
  standards_of_creation = 'Public health emergency response plan; disease surveillance/reporting; quarantine/isolation orders; mass prophylaxis/vaccination plan; community reception center planning; laboratory response network; risk communication plan',
  soc_controls = 'PHEP grant performance measures; JRA completion; annual exercise; budget period reporting; cross-jurisdictional coordination; CDC technical assistance; public health emergency declaration authority'
WHERE name LIKE '%PHEP Coordinator%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Wat. Code 6000-6610; Cal. Gov. Code 8589.5; FEMA P-93; FERC 18 CFR Part 12; National Dam Safety Program Act (33 USC 467); FEMA EAP guidelines',
  standards_of_creation = 'EAP development and maintenance; inundation map preparation; notification flowchart; dam failure mode analysis; evacuation zone delineation; annual EAP exercise; dam safety inspection documentation',
  soc_controls = 'DSOD inspection cycle; EAP approval by DSOD; downstream notification agreements; exercise frequency; independent safety review high-hazard; EAP distribution list; instrumentation monitoring records'
WHERE name = 'Dam Safety';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Pen. Code 409.5; Cal. Gov. Code 8665; CAL FIRE Evacuation guidelines; Cal. Elec. Code 3021 ballot access during evacuation; Cal. Gov. Code 8588.15 AFN',
  standards_of_creation = 'Evacuation zone mapping; evacuation order/warning issuance; traffic control plan; AFN transportation coordination; animal evacuation; repopulation procedures; evacuation center coordination',
  soc_controls = 'Law enforcement mandatory evacuation authority; AlertCalifornia activation records; zone-based communication; road closure documentation; perimeter security; damage assessment before repopulation; evacuation termination documentation'
WHERE name LIKE '%Wildfire Evacuation%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Stafford Act Section 415 (42 USC 5182); FEMA-ABA DLS agreement; ABA Model Rules; Cal. Bus. & Prof. Code 6000-6238; LSC disaster response; Cal. Rules of Court 9.45',
  standards_of_creation = 'DLS intake and screening; legal advice/representation records; insurance claim assistance; FEMA appeal preparation; landlord-tenant dispute documentation; consumer protection assistance; pro bono attorney coordination',
  soc_controls = 'Income eligibility screening; bar admission verification; client confidentiality; conflict screening; case management and outcome tracking; fee-generating case referral; malpractice coverage verification'
WHERE name = 'Disaster Legal Services';

UPDATE citizen_catalog SET
  governing_guidelines = 'PPD-21 Critical Infrastructure; NIPP 2013; FEMA Community Lifelines; 6 USC 131 CIII Act; CISA National Critical Functions; 16 critical infrastructure sectors',
  standards_of_creation = 'Critical infrastructure inventory and prioritization; lifelines status assessment; dependency/interdependency analysis; vulnerability assessment; restoration priority framework; public-private coordination; infrastructure monitoring during incidents',
  soc_controls = 'CIII Act protections per 6 USC 131; private sector information sharing agreements; PCII handling; sector-specific agency coordination; infrastructure status reporting; classified vulnerability handling; annual assessment update'
WHERE name LIKE '%Critical Infrastructure Protection%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Gov. Code 8593.7; Cal. Gov. Code 53069.6; FCC TCPA (47 USC 227) emergency exception; WEA integration; ADA Title II; Cal. Elec. Code 18350 no electioneering',
  standards_of_creation = 'System registration campaign/database; alert message composition/distribution; geographic targeting; multi-language capability; ADA-accessible formats TTY/captioning; system testing schedule; opt-in/opt-out management',
  soc_controls = 'Authorized originator designation; authentication for access; message approval workflow; false alert prevention; redundancy/failover testing; subscriber privacy; annual performance assessment'
WHERE name LIKE '%Mass Notification System%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Gov. Code 8610.5; Cal. Gov. Code 8657 liability protection; Volunteer Protection Act (42 USC 14501-14505); National VOAD; FEMA Citizen Corps; Cal. Lab. Code 3360-3369',
  standards_of_creation = 'Volunteer registration/credentialing; skills assessment/assignment; volunteer training records; deployment tracking; background check processing; volunteer time/contribution documentation; recognition/retention records',
  soc_controls = 'Background screening before deployment; liability coverage per Cal. Gov. Code 8657; workers comp per Cal. Lab. Code 3361; deployment safety briefing; check-in/check-out; unsolicited volunteer management; after-deployment wellness check'
WHERE name LIKE '%Disaster Volunteer Management%';

UPDATE citizen_catalog SET
  governing_guidelines = 'CERCLA/Superfund (42 USC 9604-9606); Clean Water Act emergency (33 USC 1321); 40 CFR Part 300 NCP; Cal. HSC 25100-25250; FEMA EHP compliance; EPA Post-Disaster Environmental Assessment',
  standards_of_creation = 'Environmental hazard identification/assessment; air/water/soil sampling/analysis; asbestos/lead survey in damaged structures; contaminated debris segregation; household hazardous waste collection; environmental compliance for FEMA PA; long-term monitoring plan',
  soc_controls = 'Certified environmental professional qualifications; laboratory accreditation; sample chain of custody; CERCLA/CWA regulatory notification; public health advisory coordination; environmental justice notification; remediation documentation'
WHERE name LIKE '%Post-Disaster Environmental%';

-- ============================================================================
-- CALIFORNIA LOCAL GOVERNMENT & UNIQUE LAWS (78 Personas)
-- ============================================================================

-- SECTION A: REMAINING CA STATE DEPARTMENTS (23 Personas)

UPDATE citizen_catalog SET
  governing_guidelines = 'Unemp. Ins. Code div. 1-7; Cal. Code Regs. tit. 22 div. 1; Lab. Code 1088-1099',
  standards_of_creation = 'UI claims determination per UIC standards; SDI/PFL approval/denial documentation; DE 2501 certification; employer tax contribution DE 9/DE 9C; notice of determination letters; overpayment assessment methodology; base period wage record verification',
  soc_controls = 'Dual verification of claims; appeal rights notification; identity verification; benefit audit trail; overpayment recovery procedures; information sharing FTB/IRS'
WHERE name = 'EDD Claims Examiner';

UPDATE citizen_catalog SET
  governing_guidelines = 'UIC 976-977, 986-986.1, 1088-1089; RTC 19542; AB 5 (Lab. Code 2775-2787)',
  standards_of_creation = 'Employer payroll tax audit methodology; worker classification per ABC test under AB 5; quarterly contribution return review; penalty assessment standards; voluntary plan certification; jeopardy assessment documentation',
  soc_controls = 'Audit workpaper retention; dual review of classifications; information sharing FTB/IRS; appeal process; voluntary plan monitoring; enforcement coordination'
WHERE name = 'EDD Tax Auditor';

UPDATE citizen_catalog SET
  governing_guidelines = 'PRC 25000-25986; Cal. Code Regs. tit. 20 1601-1609 (Title 24 Part 6); PUC 454.5; Warren-Alquist Act',
  standards_of_creation = 'Building energy compliance CF-1R/CF-2R/CF-3R; AFC power plant siting; renewable portfolio standard reports; integrated energy policy reports; appliance efficiency certifications; demand forecasts; CEQA functional equivalency; SB 100 compliance',
  soc_controls = 'Title 24 compliance verification; CEQA review standards; public comment period; independent technical review; data quality assurance; regulatory compliance tracking'
WHERE name = 'CEC Energy Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'PRC 25500-25542; Warren-Alquist Act; Cal. Code Regs. tit. 20 1701-1770',
  standards_of_creation = 'AFC for thermal power plants 50MW+; compliance monitoring reports; facility amendment requests; small power plant exemption applications; transmission corridor designations; decommissioning plans',
  soc_controls = 'Public hearing requirements; CEQA integration; compliance monitoring; inter-agency coordination PUC/ISO; decommissioning fund adequacy'
WHERE name = 'CEC Siting Specialist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 81000-91015 (Political Reform Act); Cal. Code Regs. tit. 2 18110-18997; Gov. Code 83116 enforcement',
  standards_of_creation = 'Campaign disclosure Form 460/461/496/497; SEI Form 700 audit; lobbyist Form 601/602/603/625; enforcement complaint files; audit reports; advice letters; penalty assessments; behested payment Form 803; slate mailer filings',
  soc_controls = 'Bipartisan commission oversight; sworn complaint process; probable cause procedure; SOL 5 years; public disclosure of enforcement; whistleblower protections'
WHERE name = 'FPPC Enforcement Counsel';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 84100-84252; Gov. Code 87200-87210; Cal. Code Regs. tit. 2',
  standards_of_creation = 'Form 700 filing completeness; campaign statement deadline tracking; late contribution/expenditure reports; electronic filing compliance; lobbyist employer quarterly reports; conflict-of-interest code reviews',
  soc_controls = 'Filing deadline enforcement automatic penalties; public access via CAL-ACCESS; amendment tracking; biennial conflict code review; filing officer training'
WHERE name = 'FPPC Filing Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'RTC 17001-24991 Personal Income Tax; RTC 23001-24691 Corporation Tax; Cal. Code Regs. tit. 18',
  standards_of_creation = 'Form 540 audit workpapers; Form 100/100S/565/568 review; NPA documentation; protest decision standards; OIC evaluation; abatement review; residency determination; collections correspondence; amnesty processing',
  soc_controls = 'Audit documentation standards; taxpayer rights notification; appeal process per RTC; return confidentiality; dual review for large assessments; SOL tracking'
WHERE name = 'FTB Tax Auditor';

UPDATE citizen_catalog SET
  governing_guidelines = 'RTC 19001-19780; Gov. Code 12419.5; CCP 706.070-706.077',
  standards_of_creation = 'Earnings withholding orders; bank levies; state tax lien filing; offset notices; installment agreements; hardship determination; interagency intercept EDD/Controller',
  soc_controls = 'Taxpayer notification; due process before enforcement; hardship exemption review; installment monitoring; lien release procedures; interagency coordination'
WHERE name = 'FTB Collections Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Const. Art. V; Gov. Code 12000-12080; Gov. Code 11340-11361 APA',
  standards_of_creation = 'Executive orders; proclamations of emergency; extradition warrants; judicial appointment packages; bill signing statements; clemency/pardon applications; regulatory review memoranda; board/commission appointments; State of Emergency declarations; budget proposals',
  soc_controls = 'Constitutional authority verification; APA compliance; legislative notification; public records retention; judicial appointment vetting'
WHERE name LIKE '%Governor%Legal Affairs%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Ins. Code 1-16111; Cal. Code Regs. tit. 10; 10 CCR 2695.1-2695.17 Fair Claims Settlement',
  standards_of_creation = 'Rate filing review; policy form approval; annual financial statement review; market conduct examination; complaint files; license applications; surplus line filings; solvency reports; advertising review; claims handling audits',
  soc_controls = 'Rate approval before use; complaint tracking; market conduct cycle; solvency monitoring; license renewal; consumer protection enforcement'
WHERE name = 'CDI Insurance Examiner';

UPDATE citizen_catalog SET
  governing_guidelines = 'Ins. Code 1871-1879.8; Pen. Code 548-551; CDI Fraud Division',
  standards_of_creation = 'SIU referral investigation; mandatory fraud reporting annual SIU reports; anti-fraud plan filing; investigation case files; DA referral; workers comp fraud referral; premium fraud assessment',
  soc_controls = 'Case management; evidence chain of custody; mandatory reporting compliance; multi-agency coordination DA/AG; anti-fraud plan adequacy; confidential informant protections'
WHERE name = 'CDI Fraud Investigator';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Const. Art. VI sec. 6; Cal. Rules of Court 10.1-10.1030; Gov. Code 68500-68651',
  standards_of_creation = 'Court administration reports; JBSIS statistics; case management audits; interpreter certification; judicial performance evaluations; court facility plans; 500+ mandatory Judicial Council forms; trial court budgets; language access plans',
  soc_controls = 'Judicial Council oversight; statistical reporting accuracy; interpreter standards; budget methodology transparency; public access to forms; language access monitoring'
WHERE name = 'Judicial Council Staff Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Rules of Court 1.1-9.50; CCP 575-576; Gov. Code 68070-68073',
  standards_of_creation = 'Proposed rule amendments and public comments; invitation-to-comment responses; rules implementation memoranda; advisory committee reports; emergency rule adoptions; form approval packages; local rule consistency review',
  soc_controls = 'Public comment period; advisory committee independence; emergency rule justification; local rule consistency methodology; form version control; implementation timeline'
WHERE name = 'Judicial Council Rules Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 10200-10290; Cal. Const. Art. IV',
  standards_of_creation = 'Bill drafts and amendments; legislative counsel opinions; enrolled bill reports; constitutional analyses; statutory revision memoranda; committee analyses; legislative intent documentation; chaptering of statutes; urgency clause certifications',
  soc_controls = 'Nonpartisan analysis; bill request confidentiality; constitutional review; statutory language quality control; legislative history documentation; version control'
WHERE name = 'Legislative Counsel';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 9140-9149; LAO statutory mandate',
  standards_of_creation = 'Fiscal impact analysis; annual budget analysis; ballot measure analysis; policy briefs; long-term fiscal outlook; CalFacts; initiative fiscal estimates for AG',
  soc_controls = 'Nonpartisan independence; methodology transparency; peer review; public access; legislative deadline compliance; historical accuracy tracking'
WHERE name = 'Legislative Analyst';

UPDATE citizen_catalog SET
  governing_guidelines = 'Lab. Code 6300-6719; Cal. Code Regs. tit. 8; Lab. Code 6401.7 IIPP',
  standards_of_creation = 'Workplace inspection reports; citations and penalties; IIPP review; Form 5020 processing; appeal files OSHAB; variance applications; abatement verification; serious injury/fatality investigation; heat illness prevention; COVID-19 prevention plan review',
  soc_controls = 'Inspector qualification; citation standards; penalty calculation; abatement timeline; appeal due process; IIPP compliance verification; employer notification'
WHERE name = 'Cal/OSHA Compliance Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'Lab. Code 6350-6356, 142.3; Cal. Code Regs. tit. 8 5139-5223',
  standards_of_creation = 'Exposure monitoring reports; PEL compliance records; respiratory protection program; hazard communication audit; laboratory chemical hygiene plan; lead/asbestos exposure assessment; biological monitoring results',
  soc_controls = 'Industrial hygienist certification; sampling methodology documentation; laboratory accreditation; exposure record retention per OSHA; medical surveillance oversight; employee notification of exposure'
WHERE name = 'Cal/OSHA Industrial Hygienist';

UPDATE citizen_catalog SET
  governing_guidelines = 'Elec. Code 1-23003; Gov. Code 6253.5 public records',
  standards_of_creation = 'Candidate filing documents; ballot measure submissions; initiative petition signature verification; campaign finance filings; election night reporting; voting system certifications; county election plans; voter registration database audits; conditional voter registration compliance',
  soc_controls = 'Filing deadline enforcement; signature verification training; public access to filings; voting system certification independence; county plan approval; voter database integrity'
WHERE name = 'Secretary of State Elections';

UPDATE citizen_catalog SET
  governing_guidelines = 'Corp. Code 100-2319; Corp. Code 15900-16962; Corp. Code 17701.01-17713.13; Com. Code 9501-9528',
  standards_of_creation = 'Articles of incorporation/organization; statements of information; UCC financing statements; notary commission applications; trademark/service mark registrations; domestic partnership registrations; apostille/authentication; business entity mergers/dissolutions',
  soc_controls = 'Filing fee accounting; document indexing accuracy; public access; notary background check; filing deadline tracking; entity status monitoring; UCC search accuracy'
WHERE name = 'Secretary of State Business Programs';

UPDATE citizen_catalog SET
  governing_guidelines = 'Wat. Code 13000-13999; HSC 116270-116755 Safe Drinking Water Act; PRC 21000+ CEQA',
  standards_of_creation = 'NPDES permits and compliance; WDRs; water quality monitoring; TMDLs; SWPPPs; underground storage tank cleanup; 303(d) impaired waters; basin plan amendments; water recycling permits; sanitary sewer system management plans',
  soc_controls = 'Permit compliance monitoring cycle; sampling chain of custody; public hearing for basin plan; CEQA integration; enforcement escalation; data quality assurance'
WHERE name = 'State Water Board Water Quality';

UPDATE citizen_catalog SET
  governing_guidelines = 'Wat. Code 1200-1851; Cal. Code Regs. tit. 23 div. 3',
  standards_of_creation = 'Water rights applications and permits; diversion statements; licenses; change petitions; transfer approvals; instream flow dedications; curtailment notices; water availability analyses; appropriative rights protests/hearings',
  soc_controls = 'Public notice and protest; hearing officer independence; water availability verification; senior/junior priority; drought curtailment monitoring; environmental flow protection; inter-basin transfer review'
WHERE name = 'State Water Board Water Rights';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 16300-16430; Gov. Code 5000-5980 Marks-Roos; Cal. Const. Art. XVI',
  standards_of_creation = 'GO bond issuance documents; revenue bond official statements; Marks-Roos filings; CDIAC annual debt reports; PMIA investment reports; LIHTC via CTCAC; CalABLE compliance; ScholarShare audits; conduit bond post-issuance compliance',
  soc_controls = 'Constitutional debt limit compliance; CDIAC reporting; investment policy adherence; public disclosure of bond terms; post-issuance tax compliance; arbitrage rebate; continuing disclosure'
WHERE name = 'State Treasurer Debt';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 8855-8859.7; CDIAC statutory authority',
  standards_of_creation = 'Report of proposed debt issuance; report of final sale; annual debt transparency reports; Mello-Roos and Marks-Roos filings; refunding savings analyses; continuing disclosure compliance reviews',
  soc_controls = 'Mandatory reporting all public agency debt; filing deadline enforcement; public access; refunding savings verification; continuing disclosure monitoring; historical data comparison'
WHERE name = 'CDIAC Analyst';

-- SECTION B: CALIFORNIA LOCAL GOVERNMENT (33 Personas)

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 25000-25009, 23000-23027; Cal. Const. Art. XI sec. 1; Brown Act Gov. Code 54950-54963',
  standards_of_creation = 'Board resolutions/ordinances; budget adoption; general plan adoption records; county formation/boundary documents; franchise agreements; legislative body minutes; Brown Act 72-hr agenda posting; CEQA findings; intergovernmental agreements; emergency declarations',
  soc_controls = 'Brown Act compliance; CEQA review; public hearing requirements; budget timeline; general plan consistency; conflict screening; open meeting documentation'
WHERE name = 'County Supervisor';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 26800-26832; Gov. Code 27201-27383; Elec. Code 1000-1501; Fam. Code 350-500',
  standards_of_creation = 'Real property deeds/liens recording; vital records birth/death/marriage; fictitious business name; notary bonds; maps/surveys; oaths of office; election certifications; recording fees; document indexing; UCC county-level; marriage licenses; passport applications',
  soc_controls = 'Recording fee accounting; indexing accuracy; vital record security; public access; chain of custody vital records; identity verification; notary bond adequacy'
WHERE name LIKE '%County Clerk%Recorder%';

UPDATE citizen_catalog SET
  governing_guidelines = 'RTC 75-469.5 Prop 13; Cal. Const. Art. XIIIA; Cal. Code Regs. tit. 18 1-1005',
  standards_of_creation = 'Assessment rolls; change of ownership statements; new construction assessments; exemption claims homeowner/veteran/church/welfare; Prop 8 decline-in-value; Prop 13 base year value; supplemental/escape assessments; possessory interest; Form 571 business property; Williamson Act valuations; assessment appeal hearing',
  soc_controls = 'Prop 13 methodology; assessment roll accuracy; exemption eligibility documentation; appeal hearing due process; BOE equalization oversight; public access; annual timeline'
WHERE name = 'County Assessor';

UPDATE citizen_catalog SET
  governing_guidelines = 'RTC 2601-4377; Gov. Code 27000-27092; Prop 218',
  standards_of_creation = 'Tax bills secured/unsecured; delinquent rolls; tax sale certificates; Teeter Plan; investment pool quarterly reports per Gov. Code 53646; installment plans; treasury investment policy; redemption records; TOT; assessment district levies',
  soc_controls = 'Collection timeline; investment policy adherence; Teeter Plan actuarial review; public reporting of returns; delinquent enforcement; Prop 218 methodology; installment monitoring'
WHERE name LIKE '%County Treasurer%Tax Collector%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 27642-27650; county charter; Gov. Code 900-915.4 claims',
  standards_of_creation = 'Legal opinions; conflict-of-interest analyses; ordinance/resolution review; litigation status; settlement agreements; Brown Act opinions; CEQA review; contract review; claims against county; public records determinations; grand jury response review',
  soc_controls = 'Attorney-client privilege; conflict screening; opinion quality review; litigation hold; settlement authority; Bar licensing; public records response timeline'
WHERE name = 'County Counsel';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 26500-26535; Pen. Code 681-694; Pen. Code 832.7; Pen. Code 1001-1001.95; Cal. Const. Art. I sec. 28 Marsys Law',
  standards_of_creation = 'Charging documents; plea agreements; victim restitution; asset forfeiture; Brady disclosure logs; gang enhancement; three strikes; Marsys Law notification; consumer protection; worker misclassification referral; real estate/elder abuse prosecution',
  soc_controls = 'Brady disclosure compliance; charging documentation; victim notification timeline; asset forfeiture due process; gang enhancement evidence; diversion screening; prosecution declination documentation'
WHERE name = 'District Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 27700-27712; Pen. Code 987-987.9; Cal. Const. Art. I sec. 15',
  standards_of_creation = 'Indigency declarations; appointment orders; case disposition records; caseload statistics per ABA; conflict panel referrals; post-conviction relief Pen. Code 1170.95/1172.6, Prop 47/57; habeas corpus; client communication logs; investigation expense; appellate transfer; juvenile delinquency',
  soc_controls = 'Caseload per ABA standards; client confidentiality; conflict screening; appointment authority; indigency standards; appeal timeline; juvenile training requirements'
WHERE name = 'Public Defender';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 26600-26664; Pen. Code 830.1, 832, 13519-13519.14; Cal. Code Regs. tit. 15; RIPA Gov. Code 12525.5',
  standards_of_creation = 'Arrest reports; booking records; use-of-force per SB 1421/AB 748; BWC policies; jail inspection BSCC; civil process; coroner reports; sex offender registration Pen. Code 290; CLETS logs; RIPA data; CCW permits; mutual aid; custodial death reports; IA investigation files',
  soc_controls = 'POST certification; use-of-force review; BWC compliance; BSCC jail inspection; RIPA reporting; SB 1421/AB 748 disclosure; IA due process; CLETS audit; Brady list'
WHERE name = 'Sheriff';

UPDATE citizen_catalog SET
  governing_guidelines = 'Pen. Code 1203-1203.4; WIC 200-987; Cal. Code Regs. tit. 15 div. 4; AB 109',
  standards_of_creation = 'Pre-sentence investigation reports; supervision case files; juvenile detention logs; risk/needs assessment ORAS/COMPAS; AB 109 caseload reports; violation reports; restitution collection; juvenile hall inspections; electronic monitoring; deferred entry of judgment; wardship orders; transfer hearings; transitional age youth',
  soc_controls = 'Caseload standards; risk assessment validation; juvenile detention BSCC; restitution accounting; violation hearing due process; electronic monitoring compliance; juvenile record confidentiality'
WHERE name = 'Chief Probation Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSC 101000-101475; HSC 120100-120580; Cal. Code Regs. tit. 17',
  standards_of_creation = 'Communicable disease reports; public health emergency orders; food facility inspections per CalCode/HSC 113700+; body art permits; medical waste permits; birth/death vital statistics; immunization compliance; environmental health permits; tobacco licenses; well/septic permits; water quality sampling; quarantine/isolation orders',
  soc_controls = 'Disease reporting timeline; food inspection frequency; emergency authority documentation; vital statistics accuracy; immunization monitoring; environmental health renewal; quarantine due process'
WHERE name = 'County Health Officer';

UPDATE citizen_catalog SET
  governing_guidelines = 'WIC 10000-18999 CalWORKs; WIC 14000-14199 Medi-Cal; WIC 18900-18927 CalFresh; 42 USC 601+ TANF; Cal. Code Regs. tit. 22 div. 3',
  standards_of_creation = 'CalWORKs applications/redeterminations; CalFresh eligibility worksheets; Medi-Cal determinations MAGI/non-MAGI; income verification; WTW participation WTW 2/WTW 73; overpayment claims; fair hearing requests; self-assessment reviews; IHSS assessments; GA/GR applications',
  soc_controls = 'Eligibility accuracy verification; income verification methodology; fair hearing due process; overpayment recovery; redetermination timeline; applicant confidentiality; quality control sampling'
WHERE name LIKE '%Eligibility Worker%';

UPDATE citizen_catalog SET
  governing_guidelines = 'WIC 300-395; WIC 16500-16522; Pen. Code 11164-11174.3 CANRA; Cal. Code Regs. tit. 22 div. 2',
  standards_of_creation = 'Child abuse/neglect referrals 8-583 hotline; SDM safety/risk assessments; detention reports; JV-320/JV-321; case plans per WIC 16501.1; court reports; family reunification/maintenance; ICPC; adoption assessments; ILP/THP+; placement changes; CACI index; mandated reporter compliance',
  soc_controls = 'SDM validation; court report timeline; case plan review cycle; CACI due process; ICPC coordination; mandated reporter training; child welfare confidentiality; adoption standards; ILP outcomes'
WHERE name LIKE '%Child Welfare Social Worker%';

UPDATE citizen_catalog SET
  governing_guidelines = 'WIC 5000-5120 Short-Doyle; WIC 5150-5157 LPS Act; WIC 5600-5604.5 MHSA/Prop 63; HSC 1250.2',
  standards_of_creation = 'MHSA revenue/expenditure reports; 5150/5250/5270 hold documentation; capacity declarations; patients rights reports; MHP compliance reviews; Medi-Cal specialty mental health claims; FSP outcome data; community planning; SUD treatment authorization; Drug Medi-Cal ODS waiver; LPS conservatorship investigation; Lauras Law/AOT petitions',
  soc_controls = 'MHSA expenditure transparency; involuntary hold due process; patients rights advocacy; MHP review cycle; Medi-Cal claiming accuracy; FSP outcome tracking; conservatorship standards; SUD authorization timeline'
WHERE name = 'County Behavioral Health';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 34000-45343; Cal. Const. Art. XI sec. 3-5; Brown Act Gov. Code 54950-54963',
  standards_of_creation = 'City ordinances/resolutions; general plan amendments; budget documents; Brown Act 72-hr posting/closed session reports; franchise agreements; annexation resolutions; conflict declarations; charter amendments; emergency declarations; JPA agreements',
  soc_controls = 'Brown Act compliance; CEQA review; public hearing; budget timeline; general plan consistency; conflict screening; open meeting law'
WHERE name = 'City Council Member';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 34851-34861; city charter or municipal code',
  standards_of_creation = 'Annual budget proposals; staff reports; contract execution under delegation; department performance reports; emergency operations plans; ADA transition plans; labor MOUs; organizational charts; CAFR/ACFR; risk management reports; policy implementation tracking',
  soc_controls = 'Budget process compliance; contract delegation limits; performance measurement; emergency preparedness review; ADA compliance; labor confidentiality; financial audit'
WHERE name = 'City Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 36800-36840; Elec. Code 1301-1304, 10200-10264; CPRA Gov. Code 6250-6270',
  standards_of_creation = 'Ordinance/resolution codification; council meeting minutes; CPRA compliance; Form 700 repository; municipal election documents; conflict-of-interest code maintenance; records retention; claims processing; bid opening records; oath of office; administrative citations; business licenses',
  soc_controls = 'CPRA 10-day response; records retention compliance; Brown Act minutes; FPPC filing deadline; public access; business license renewal; claims timeline'
WHERE name = 'City Clerk';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 36500-36524; city charter; Cal. Rules Prof. Conduct 1.13',
  standards_of_creation = 'Legal opinions; ordinance/contract drafting; litigation files; code enforcement prosecution; Brown Act advisories; CEQA legal adequacy; eminent domain; municipal bond counsel; initiative/referendum analysis; claims investigation; privilege logs; nuisance abatement',
  soc_controls = 'Attorney-client privilege; conflict screening; litigation hold; settlement authority; Bar licensing; opinion quality review; insurance defense coordination'
WHERE name = 'City Attorney';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 65000-66210; PRC 21000-21189.70 CEQA; Gov. Code 65852.2 ADU; Gov. Code 65589.5 Housing Accountability Act',
  standards_of_creation = 'General plan 7 mandatory elements; specific plans; zoning amendments; CUPs; variances; subdivision maps; EIRs; negative declarations/MNDs; housing element HCD; density bonus; ADU/JADU; SB 9 lot split; SB 10 infill; development agreements; Williamson Act contracts',
  soc_controls = 'CEQA compliance; public hearing; housing element HCD certification; general plan consistency; subdivision map act; ADU ministerial timeline; SB 35 streamlined approval; development agreement process'
WHERE name = 'Planning Director';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSC 17920-17928, 18900-18944; Cal. Building Code/Title 24; Gov. Code 65850-65863.13',
  standards_of_creation = 'Building permits; plan check reports; inspection records foundation-to-final; certificate of occupancy; Title 24 energy CF-1R/CF-2R; CalGreen; ADA/accessibility; URM inventories; seismic retrofit; solar permits AB 2188; SB 35; code violations; demolition permits',
  soc_controls = 'Plan check turnaround; inspection documentation; CO final review; code enforcement due process; permit fees; contractor license verification; seismic compliance; accessibility monitoring'
WHERE name = 'Chief Building Official';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSC 13000-13273; Cal. Fire Code Title 24 Part 9; Gov. Code 51175-51189; HSC 25500-25520 CUPA',
  standards_of_creation = 'Fire inspection reports; fire prevention plans; code violation notices; pre-fire plans; mutual/automatic aid agreements; arson investigation; hazmat disclosure CUPA; community risk assessment; sprinkler/alarm plan checks; vegetation management SRA/LRA; NFIRS reports; firework permits; high-rise inspections',
  soc_controls = 'Inspection frequency; violation correction timeline; investigation evidence; CUPA compliance; mutual aid renewal; NFIRS accuracy; community risk methodology'
WHERE name = 'Fire Chief';

UPDATE citizen_catalog SET
  governing_guidelines = 'Pen. Code 830.1, 832, 13519-13519.14 POST; Gov. Code 3300-3313 POBR; AB 392/SB 230; AB 481',
  standards_of_creation = 'Arrest reports; crime reports; use-of-force per AB 392/SB 230; BWC logs; pursuit reports; IA files; civilian complaints; RIPA per Gov. Code 12525.5; towed vehicles; sex offender registration; asset forfeiture; community policing plans; SB 1421/AB 748 disclosure; Brady list; military equipment AB 481; surveillance technology',
  soc_controls = 'POST certification; use-of-force review; BWC policy; IA due process POBR; RIPA data collection; SB 1421/AB 748 disclosure; Brady list; military equipment annual report; surveillance technology approval'
WHERE name = 'Police Chief';

UPDATE citizen_catalog SET
  governing_guidelines = 'SHC 1-33700; PCC 20100-22045; Gov. Code 4525-4529; Lab. Code 1770-1781 prevailing wage',
  standards_of_creation = 'Capital improvement plans; prevailing wage records per Lab. Code 1770-1781; bid solicitation/award; encroachment permits; street/sidewalk/sewer plans; stormwater MS4; pavement management; ADA curb ramps; traffic signal warrants; change orders; notice of completion; retention releases; Prop 218 assessments',
  soc_controls = 'Competitive bidding; prevailing wage monitoring; ADA compliance; MS4 permit compliance; Prop 218 process; change order authority; retention timeline; public contracts code; A&E selection'
WHERE name = 'Director of Public Works';

UPDATE citizen_catalog SET
  governing_guidelines = 'Wat. Code 30000-38501 county water; Wat. Code 34000-38501 municipal water; HSC 116270-116755 drinking water; Prop 218',
  standards_of_creation = 'Water quality CCR; source water assessments; water supply assessments per Gov. Code 66473.7; UWMP per Wat. Code 10610-10657; drought contingency; rate studies Prop 218; financial audits; SWRCB permits; distribution monitoring; backflow prevention; lead and copper rule; recycled water; water loss audits SB 555',
  soc_controls = 'Drinking water monitoring; Prop 218 rate adoption; SWRCB compliance; water loss audit methodology; financial audit; CCR distribution; drought contingency criteria; cross-connection control'
WHERE name = 'Water District General Manager';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSC 13800-13970; Gov. Code 50075-50077.5; Cal. Fire Code Title 24 Part 9',
  standards_of_creation = 'District formation/annexation; special tax/assessment levy; ISO rating; apparatus/equipment inventories; volunteer firefighter certifications; response time reports; CWPP; impact fee studies; financial audits; Prop 4/Gann limits; mutual aid agreements',
  soc_controls = 'Special tax Prop 218; ISO rating maintenance; volunteer training; response time monitoring; financial audit; Gann limit calculation; mutual aid maintenance; equipment tracking'
WHERE name = 'Fire Protection District';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSC 5410-5476; HSC 6400-6830; Wat. Code 13000+; 40 CFR 122, 503',
  standards_of_creation = 'NPDES compliance reports DMRs; collection system monitoring; SSMP; SSO reports; industrial pretreatment; biosolids management; capacity management; connection fees; sewer master plans; CEQA for facility expansion',
  soc_controls = 'NPDES monitoring compliance; SSO reporting timeline; pretreatment enforcement; biosolids disposal; capacity monitoring; connection fee methodology; CEQA mitigation monitoring; laboratory accreditation'
WHERE name = 'Sanitation District Engineer';

UPDATE citizen_catalog SET
  governing_guidelines = 'PRC 5001-5076.3; PRC 5780-5791; Gov. Code 53090-53097.5',
  standards_of_creation = 'District formation; park master plans; Prop 68/Prop 84 grant compliance; ADA accessibility audits; recreation programming; user fee studies; lease agreements; landscape/lighting assessment; Quimby Act in-lieu fees; environmental review for park improvements',
  soc_controls = 'Grant compliance reporting; ADA monitoring; user fee methodology; Quimby Act fee calculation; environmental review; public hearing for master plans; financial audit'
WHERE name = 'Parks and Recreation District';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSC 2000-2093; HSC 116110-116068 vector control; FAC 12751-14102 pesticide use',
  standards_of_creation = 'Mosquito surveillance reports; pesticide use reports DPR filings; best management practices; service request logs; annual budget/audit; CEQA for treatment; IPM plans; public notification aerial/ground; West Nile virus monitoring; special tax assessment records',
  soc_controls = 'Pesticide use reporting DPR; public notification; IPM adherence; West Nile surveillance; CEQA compliance; Prop 218 special tax; financial audit'
WHERE name LIKE '%Mosquito Abatement%';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSC 7000-8030; HSC 8890-9068; BPC 7600-7741 Cemetery and Funeral Bureau',
  standards_of_creation = 'Interment records; endowment care fund investment reports; plot sales contracts; financial audits; district formation/boundary documents; master plan; maintenance schedules; fee schedules; state controller reports; grave relocation orders; environmental compliance',
  soc_controls = 'Endowment care fund oversight; interment record accuracy; Cemetery Bureau compliance; financial audit; state controller reporting; environmental review; public access to records'
WHERE name = 'Cemetery District';

UPDATE citizen_catalog SET
  governing_guidelines = 'Educ. Code 18010-18203; Educ. Code 19400-19605; Gov. Code 6250-6270; Gov. Code 6267 patron privacy',
  standards_of_creation = 'Collection development policies; library services plans; patron privacy per Gov. Code 6267; State Library annual statistics; LSTA/CLSA grant compliance; ADA accessibility; technology plans; intellectual freedom policies; interlibrary loan agreements; foundation audit records; bond expenditure reports',
  soc_controls = 'Patron privacy enforcement; LSTA/CLSA compliance; ADA compliance; State Library reporting accuracy; intellectual freedom implementation; bond expenditure accountability; financial audit'
WHERE name = 'Library District Director';

UPDATE citizen_catalog SET
  governing_guidelines = 'Educ. Code 35000-35179; Educ. Code 42100-42652; Cal. Const. Art. IX; LCFF/LCAP',
  standards_of_creation = 'LCAP development; SARC reports; annual budget adopted/interim; audit reports Education Audits Appeal Panel; Williams compliance; collective bargaining agreements; SELPA compliance; student records FERPA/EdC 49060-49079; mandatory reporter training; Title IX; school safety plans; facilities master plans; developer fee studies; Brown Act compliance',
  soc_controls = 'LCAP stakeholder engagement; budget timeline per EdC; financial audit standards; Williams monitoring; FERPA confidentiality; Title IX compliance; school safety annual review; Brown Act compliance; SELPA allocation; developer fee methodology'
WHERE name = 'School District Superintendent';

UPDATE citizen_catalog SET
  governing_guidelines = 'Educ. Code 70900-87913; Cal. Code Regs. tit. 5 51000-59410; Cal. Const. Art. IX sec. 14; ACCJC accreditation',
  standards_of_creation = 'Student Success Metrics; ACCJC self-evaluation; financial/compliance audits; FTES attendance accounting; 50% law per EdC 84362; EEO plans; student equity plans; faculty obligation; curriculum approvals; California Promise; facilities master plans; Prop 39 bond audits; Brown Act compliance',
  soc_controls = 'ACCJC cycle compliance; 50% law compliance; FTES audit; EEO implementation; student equity outcomes; Prop 39 bond accountability; faculty obligation compliance; Brown Act; financial audit'
WHERE name LIKE '%Community College%Chancellor%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 56000-57550 Cortese-Knox-Hertzberg Act',
  standards_of_creation = 'Municipal service reviews; sphere of influence determinations; annexation/detachment applications; incorporation/disincorporation studies; special district formation reviews; CEQA for boundary changes; protest proceedings; terms and conditions resolutions; out-of-area service agreements; island annexation; disadvantaged unincorporated community analyses; annual report',
  soc_controls = 'MSR methodology transparency; public hearing; CEQA review; protest due process; commission independence; SOI update cycle; annual report publication; DUC analysis requirements'
WHERE name = 'LAFCO';

UPDATE citizen_catalog SET
  governing_guidelines = 'Pen. Code 888-939.91; Gov. Code 3060-3075; Pen. Code 933 mandatory response',
  standards_of_creation = 'Grand jury final reports; indictments; county/city/special district operational reviews; mandated responses 90-day/150-day per Pen. Code 933; complaint intake records; continuity reports; facility inspections jails/juvenile halls per Pen. Code 919; accusation proceedings; special district audit findings',
  soc_controls = 'Grand jury independence; mandatory response timeline; facility inspection compliance; complaint confidentiality; continuity across terms; public report publication; accusation due process'
WHERE name = 'Grand Jury Foreperson';

-- SECTION C: CALIFORNIA-UNIQUE LAW COMPLIANCE (22 Personas)

UPDATE citizen_catalog SET
  governing_guidelines = 'PRC 21000-21189.70; Cal. Code Regs. tit. 14 15000-15387 CEQA Guidelines; PRC 21091 public review',
  standards_of_creation = 'Initial studies; negative declarations/MNDs; EIRs draft/final/supplemental; NOP/NOD/NOC/NOE; mitigation monitoring programs; findings of overriding consideration; EIR certification; CEQA exemptions categorical/statutory/common sense; AB 52 tribal consultation; SB 18 tribal consultation; SCEA documents',
  soc_controls = 'Public review period compliance; exemption justification; EIR adequacy; mitigation monitoring enforcement; tribal consultation; lead agency determination; responsible/trustee agency coordination; statute of limitations'
WHERE name = 'CEQA Compliance';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSC 25249.5-25249.14 Safe Drinking Water and Toxic Enforcement Act; OEHHA listed chemicals',
  standards_of_creation = 'Prop 65 warning labels/signage; clear and reasonable warning assessments; 60-day notice of violation; safe harbor warning compliance; chemical exposure assessments; settlement agreements; annual reporter discharge reports; product testing; short-form/long-form warning evaluations; OEHHA chemical applicability analyses',
  soc_controls = '60-day notice procedure; safe harbor methodology; OEHHA chemical list monitoring; exposure assessment methodology; settlement adequacy; annual reporter compliance; product testing chain of custody'
WHERE name LIKE '%Proposition 65%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Civ. Code 1798.100-1798.199.100 CCPA/CPRA; Cal. Code Regs. tit. 11 7000-7102; CPPA enforcement',
  standards_of_creation = 'Privacy policies; consumer rights request logs access/delete/correct/opt-out; data processing agreements; DPIAs; service provider agreements; opt-out signal compliance; financial incentive notices; high-risk PIAs; data broker registrations; annual cybersecurity audits; risk assessments to CPPA; employee privacy notices; children under-16 opt-in consent',
  soc_controls = 'Consumer request response 45 days; opt-out mechanism; data broker registration; cybersecurity audit independence; CPPA enforcement cooperation; data minimization; third-party data sharing; privacy policy update frequency'
WHERE name LIKE '%CCPA%';

UPDATE citizen_catalog SET
  governing_guidelines = 'PRC 42652.5-42654; Cal. Code Regs. tit. 14 18981-18998 SB 1383',
  standards_of_creation = 'Jurisdiction implementation ordinance/outreach; organic waste collection records; edible food recovery agreements; contamination monitoring; waivers de minimis/physical space; annual CalRecycle compliance reports; procurement recycled products/renewable gas; enforcement actions; route reviews; self-hauler compliance; capacity planning',
  soc_controls = 'CalRecycle review cycle; contamination monitoring methodology; edible food recovery enforcement; procurement compliance; waiver eligibility; enforcement escalation; capacity planning adequacy'
WHERE name LIKE '%SB 1383%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Lab. Code 2775-2787 AB 5/AB 2257; UIC 621(b), 606.5 ABC test; Dynamex Operations West v. Superior Court (2018)',
  standards_of_creation = 'Worker classification ABC prong evaluations; independent contractor agreements; EDD determination DE 1870; payroll records; 1099 vs W-2 analysis; Borello factor analyses for exempt categories; B2B exemption; referral agency exemptions; professional services exemption; industry-specific exemption compliance',
  soc_controls = 'ABC test prong documentation; exemption verification; EDD appeal process; payroll audit methodology; industry-specific criteria; enforcement coordination EDD/Labor Commissioner/AG; self-audit tools'
WHERE name LIKE '%AB 5%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Lab. Code 2698-2699.8 PAGA; Lab. Code 200-243, 510-558 wage/hour',
  standards_of_creation = 'PAGA notice letters to LWDA; LWDA response/non-response records; representative action complaints; settlement approval; penalty allocation 75% LWDA/25% employees; cure provisions per Lab. Code 2699.3; manageability analyses; claim administration; employer violation documentation; PAGA waiver validity',
  soc_controls = 'LWDA notice filing compliance; 65-day waiting period; settlement court oversight; penalty allocation verification; cure provision eligibility; claim administration transparency; LWDA portal filing'
WHERE name = 'PAGA';

UPDATE citizen_catalog SET
  governing_guidelines = 'Civ. Code 51-53 Unruh Act; Civ. Code 51.7 Ralph Act; Civ. Code 52.1 Bane Act; CRD enforcement',
  standards_of_creation = 'Discrimination complaints; public accommodation access audits; ADA nexus analysis Unruh incorporates ADA; anti-discrimination policies; Ralph Act violence reports; Bane Act interference investigation; damages/injunctive relief; website/digital accessibility Unruh online extension; CASP inspections; pre-litigation demand CIV 55.3',
  soc_controls = 'CRD complaint timeline; ADA/Unruh nexus; CASP inspection standards; pre-litigation demand screening; damages calculation; WCAG digital compliance; business policy adequacy'
WHERE name = 'Unruh Civil Rights';

UPDATE citizen_catalog SET
  governing_guidelines = 'Civ. Code 1788-1788.33 Rosenthal Act; 15 USC 1692 FDCPA incorporated; DFPI enforcement',
  standards_of_creation = 'Debt collection communication audit; validation of debt notice; cease-and-desist compliance; debtor dispute files; creditor assignment; time-barred debt disclosure; credit reporting disputes; original creditor practices; collection agency licensing; statutory damages exposure; medical debt AB 1020',
  soc_controls = 'Communication frequency compliance; validation notice accuracy; cease-and-desist enforcement; time-barred debt verification; credit reporting accuracy; license verification; DFPI examination; medical debt protections'
WHERE name LIKE '%Rosenthal%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Civ. Code 1790-1795.8 Song-Beverly; Civ. Code 1793.2(d) replacement/refund',
  standards_of_creation = 'New vehicle warranty repair history; manufacturer repair attempt records; consumer rights notification; buyback/replacement offers; civil penalty willful violation; manufacturer warranty policies; dealer repair orders; TSBs; DCA-certified arbitration; used vehicle implied warranty per Civ. Code 1795.5; restitution calculations mileage offset/incidental damages',
  soc_controls = 'Repair attempt chain; reasonable repair attempts tracking; consumer notification accuracy; DCA arbitration certification; restitution methodology; civil penalty willfulness; manufacturer response timeline'
WHERE name LIKE '%Song-Beverly%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 12900-12996 FEHA; Cal. Code Regs. tit. 2 11000-11141; SB 1343 training',
  standards_of_creation = 'CRD complaint and right-to-sue; employer anti-harassment policy; reasonable accommodation interactive process; investigation files; mediation/conciliation; FEHA training 2-hr supervisory/1-hr non-supervisory per SB 1343; DFEH-185; pregnancy disability leave; religious accommodation; transgender rights compliance',
  soc_controls = 'CRD complaint timeline; investigation methodology; interactive process adequacy; SB 1343 training compliance; mediation confidentiality; right-to-sue timeline; pregnancy disability/CFRA coordination'
WHERE name LIKE '%FEHA%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 12945.1-12945.2 CFRA; Cal. Code Regs. tit. 2 11087-11097',
  standards_of_creation = 'CFRA leave request forms; medical certification; employer designation notice; fitness-for-duty certification; intermittent leave tracking; key employee exemption analysis; CFRA/FMLA concurrent tracking; new parent leave 5-19 employees; reinstatement records; retaliation complaints; leave balance; military exigency/caregiver leave',
  soc_controls = 'Medical certification timeline; designation notice accuracy; intermittent leave methodology; key employee documentation; reinstatement enforcement; retaliation investigation; concurrent CFRA/FMLA; leave balance accuracy'
WHERE name = 'CFRA Leave';

UPDATE citizen_catalog SET
  governing_guidelines = 'Lab. Code 1400-1408 Cal-WARN; 29 USC 2101-2109 federal WARN',
  standards_of_creation = '60-day advance notice mass layoff/plant closing/relocation; notice to EDD/LWDA/local elected official; employee notification; relocation determination 100+ miles; conditional notice; faltering company defense; unforeseeable business circumstance; natural disaster exemption; back pay/benefit calculations; WARN exception analyses',
  soc_controls = '60-day notice timeline; EDD/LWDA notification verification; employee notification accuracy; relocation distance calculation; exception documentation; back pay methodology; conditional notice tracking; enforcement coordination'
WHERE name LIKE '%California WARN%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Cal. Const. Art. I sec. 28 (Marsys Law); Pen. Code 679-680.4, 1191.1-1191.25, 3043-3043.25',
  standards_of_creation = 'Victim notification arrest/charges/hearings/release; restitution orders/collection; victim impact statements; parole hearing notification; protective orders; VINE registration logs; victim privacy; return of property; right to be heard at sentencing; custody status change notifications',
  soc_controls = 'Notification timeline; restitution accounting; VINE functionality; protective order service; victim privacy enforcement; parole notification; custody change procedures'
WHERE name LIKE '%Victim Rights Compliance%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Pen. Code 667(b)-(i), 1170.12 Three Strikes; Pen. Code 1170.126 Prop 36; Pen. Code 1170.18 Prop 47; Cal. Const. Art. I sec. 32 Prop 57',
  standards_of_creation = 'Strike prior allegation/proof; Prop 36 resentencing petition third strike non-violent; Prop 47 reclassification/redesignation; Prop 57 early parole documents; CDCR credit-earning calculations; dangerousness assessments; RAP sheet verification; victim statements; DA responses; court orders granting/denying relief',
  soc_controls = 'Strike prior verification; resentencing timeline; dangerousness assessment standards; victim notification per Marsys Law; CDCR credit verification; court hearing due process; DA response deadline'
WHERE name LIKE '%Three Strikes%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 65852.21 SB 9; Gov. Code 65913.5 SB 10; Gov. Code 65589.5 Housing Accountability Act; Gov. Code 65915 density bonus',
  standards_of_creation = 'SB 9 ministerial lot split applications; SB 9 duplex permits; owner-occupancy affidavit 3-year; SB 10 zoning resolutions; objective design standards; demolition history no Ellis Act prior 15 years; historic district exemption; HAA denial justification; density bonus per Gov. Code 65915; SB 35 streamlined approval',
  soc_controls = 'Ministerial timeline; owner-occupancy verification; demolition screening; objective design clarity; HAA denial justification; density bonus calculation; historic exemption analysis; SB 35 eligibility'
WHERE name LIKE '%SB 9%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Civ. Code 1947.12-1947.13 AB 1482 Tenant Protection; Civ. Code 1954.50-1954.535 Costa-Hawkins; local rent stabilization ordinances',
  standards_of_creation = 'Rent increase notice/calculation CPI caps; just cause eviction documentation; Costa-Hawkins vacancy decontrol; AB 1482 exemption single-family/15-year-new; tenant habitability complaints; relocation assistance; owner move-in eviction; capital improvement passthrough; rent board registration; Ellis Act withdrawal per Gov. Code 7060-7060.7',
  soc_controls = 'Rent cap calculation verification; just cause documentation; exemption eligibility; relocation calculation methodology; rent board filing; capital improvement hearing; tenant notification'
WHERE name LIKE '%Costa-Hawkins%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 7060-7060.7 Ellis Act',
  standards_of_creation = 'Notice of intent to withdraw; 120-day/1-year tenant notification; elderly/disabled extended notice 1 year; relocation assistance payments; recorded memorandum of withdrawal; re-rental restriction 5-year/10-year; city notification filings; rescission of withdrawal; tenant right of first refusal',
  soc_controls = 'Tenant notification timeline; elderly/disabled extended notice; relocation payment tracking; re-rental restriction monitoring; city notification filing; rescission documentation; right of first refusal enforcement; recorded memorandum accuracy'
WHERE name = 'Ellis Act';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 51200-51297.4 Williamson Act; RTC 421-423; Dept. of Conservation oversight',
  standards_of_creation = 'Agricultural preserve establishment; Williamson Act contracts; non-renewal filing 9-year phase-out; cancellation petition findings of inconsistency; Farmland Security Zone super Williamson; compatible use determinations; assessor restricted value; subvention payment claims; Dept. of Conservation biennial reports',
  soc_controls = 'Contract term monitoring; non-renewal calculation verification; cancellation findings; compatible use methodology; restricted value accuracy; subvention claim verification; Dept. of Conservation reporting'
WHERE name = 'Williamson Act';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 54950-54963 Brown Act',
  standards_of_creation = 'Regular/special meeting agendas 72-hr/24-hr posting; closed session descriptions; public comment procedures; meeting minutes/recordings; teleconference per AB 2449; serial meeting prohibition; closed session reports; cure/correct demands; violation complaints; bylaws; standing committee compliance; meeting material accessibility',
  soc_controls = 'Agenda posting timeline; closed session reporting; teleconference documentation; serial meeting monitoring; cure/correct response timeline; public comment enforcement; minutes/recording accuracy; standing committee composition'
WHERE name = 'Brown Act';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 6250-6270 CPRA; Gov. Code 7920.000-7931.000 recodified 2023',
  standards_of_creation = 'Public records request/response logs; 10-day determination; exemption justification memoranda; redaction logs with cited exemptions; fee calculation direct cost of duplication; electronic records format; Vaughn index; litigation privilege logs; proactive disclosure per Gov. Code 6253.10; records retention; elected official communications',
  soc_controls = '10-day response; exemption justification documentation; redaction log completeness; fee calculation methodology; Vaughn index adequacy; records retention adherence; proactive disclosure program; elected official communication preservation; staff training'
WHERE name LIKE '%CPRA Compliance%';

UPDATE citizen_catalog SET
  governing_guidelines = 'Gov. Code 81000-91015 Political Reform Act; Cal. Code Regs. tit. 2 18110-18997; Gov. Code 1090-1099',
  standards_of_creation = 'Conflict code biennial review; Form 700 filing compliance; campaign contribution limits; mass mailing restrictions; government campaign activity prohibition; gift limit $590 2025-26; revolving door restrictions; behested payment reports; ballot measure advocacy; misuse of public position; Section 1090 review; incompatible office determinations',
  soc_controls = 'Biennial conflict code review; Form 700 deadline enforcement; gift limit monitoring; revolving door tracking; behested payment reporting; Section 1090 analysis methodology; incompatible office documentation; FPPC advisory compliance'
WHERE name LIKE '%Political Reform Act%Compliance%';

UPDATE citizen_catalog SET
  governing_guidelines = 'HSC 1340-1399.907 Knox-Keene; Cal. Code Regs. tit. 28; DMHC enforcement',
  standards_of_creation = 'Health plan license applications/renewals; network adequacy timely access; grievance/appeal records; IMR files; TNE solvency reports; HEDIS/QA reports; UM policies; mental health parity; SB 17 drug price transparency; surprise billing AB 72; premium rate filings; annual compliance plans; cultural/linguistic assessments',
  soc_controls = 'DMHC examination cycle; network adequacy monitoring; grievance resolution timeline; IMR compliance; TNE solvency monitoring; HEDIS accuracy; mental health parity audit; drug price transparency; surprise billing consumer protection; premium rate review'
WHERE name LIKE '%Knox-Keene%';

-- ============================================================================
-- END OF TRIPLE CONSTRAINT UPDATE STATEMENTS
-- Total: 249 personas (171 Elections/Census/Emergency + 78 California Local)
-- ============================================================================

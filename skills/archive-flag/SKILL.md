---
name: archive-flag
description: >
  Triggers chronological case archiving to Proton Drive when user says "Flag this",
  "Flag this conversation", "Archive this", "Flag to [case name]", "Save this to [case]",
  or any variation of flagging a conversation for case-specific archiving. Also trigger
  when Claude detects high-value findings during audits (constitutional violations,
  pattern-and-practice indicators, strategic decisions, infrastructure changes) and
  SUGGESTS flagging — but never auto-flags without user confirmation. This skill replaces
  case-conversation-archive by adding automated Proton Drive persistence. Always trigger
  this skill over proton-drive-session-sync when the user explicitly flags a conversation —
  session-sync is for general daily logs, this is for selective case-tagged archives.
  Even casual phrasing like "this is important" or "bookmark this" should trigger this skill.
---

# Archive Flag Skill

## Purpose

One-trigger archiving: user says "Flag this" → Claude generates structured archive →
writes it to the correct case folder in Proton Drive → updates case index → confirms.
Zero manual steps from the user after the trigger word.

---

## Trigger Keywords

### Explicit Triggers (Execute immediately)
- "Flag this" / "Flag this conversation"
- "Archive this" / "Archive this to [case]"
- "Flag to [case name]"
- "Save this to [case]"
- "Bookmark this"
- "This is important — save it"

### Suggest-Only Triggers (Ask user first, never auto-execute)
- Audit discovers constitutional violations or pattern-and-practice indicators
- Strategic business decision finalized (pricing, architecture, partnerships)
- Infrastructure changes made (DNS, deployments, server configs)
- Legal strategy decisions that affect case direction
- Filing deadlines identified or modified

When suggesting: "This session produced [significant findings]. Want me to flag it to [case name]?"

---

## Known Cases

Maintain awareness of active cases from memory and prior archives. Current known cases:

| Case ID | Case Name | Description |
|---------|-----------|-------------|
| VERNEN-Platform | VERNEN™ Platform Development | Technical architecture, skills, MCP, D1 |
| VERNEN-Sales | VERNEN™ Sales & Business | Institutional sales, pricing, market strategy |
| VERNEN-Predictive | VERNEN™ Predictive Analytics | Data pipeline, ML roadmap, ingestion |
| Custody-Cole | Custody Case — Cole | Family law proceedings, filings, strategy |

If user flags to an unknown case, ask: "I don't have a case folder for '[name]' yet. Create it?"
Then add it to the known cases list.

---

## Proton Drive Folder Structure

```
[Proton Drive Sync Folder]/
  VERNEN/
    Case Archives/
      VERNEN-Platform/
        _INDEX.md
        2026-03-03_institutional-sales-predictive-roadmap.md
        2026-03-04_d1-endpoint-build.md
        ...
      VERNEN-Sales/
        _INDEX.md
        2026-03-03_lapd-pitch-strategy.md
        ...
      VERNEN-Predictive/
        _INDEX.md
        ...
      Custody-Cole/
        _INDEX.md
        ...
    Session Logs/          ← proton-drive-session-sync writes here (separate)
      SESSION_LOG_YYYY-MM-DD.md
      VERNEN_INFRASTRUCTURE_MAP.md
```

---

## Execution Protocol

### STEP 1: Identify Case Target

If user specified a case ("Flag to VERNEN"):
- Map to known case folder
- If ambiguous between cases, ask: "Flag to VERNEN-Platform or VERNEN-Sales?"

If user said generic "Flag this":
- Infer from conversation content which case applies
- Confirm with user: "This looks like VERNEN-Platform work. Flag there?"
- If conversation spans multiple cases, ask which one (or offer to flag to multiple)

### STEP 2: Generate Structured Archive

Create markdown file with standardized name: `YYYY-MM-DD_topic-slug.md`

If multiple archives exist for same date, append letter: `2026-03-03b_topic.md`

Archive format:

```markdown
# [Case Name] Archive
## Session: YYYY-MM-DD — [Descriptive Title]

**Case:** [Case ID]
**Status:** Active
**Flagged by:** User [or "Claude-suggested, user-confirmed"]
**Archive Date:** [Date]

---

## Summary
[2-4 sentence executive summary of what this session accomplished relevant to this case]

---

## Key Findings
[Bullet points of substantive discoveries, audit results, or strategic insights]

---

## Decisions Made
[Numbered list of concrete decisions with enough context to understand WHY]

---

## Evidence / Data Points
[Specific numbers, citations, URLs, amounts, dates that support findings]

---

## Open Issues
[Unresolved questions or blockers, numbered]

---

## Next Actions
[Ordered list of what to do next, specific enough to resume without context]

---

## Cross-References
[Links to related cases or prior archives]
```

### Quality Standards for Archive Content

**DO include:**
- Specific file paths, URLs, tool names, configurations
- Exact dollar amounts, percentages, dates, case numbers
- Decision rationale (not just WHAT but WHY)
- Enough context that a fresh Claude instance can resume from this archive alone
- References to source conversations or transcripts

**DO NOT include:**
- Passwords, API keys, tokens, secrets
- Verbose conversation recaps — be actionable, not narrative
- Speculation or hedging language
- Information already in prior archives for same case (reference, don't repeat)

### STEP 3: Write to Proton Drive

**PRIORITY 1: Desktop Commander (Preferred)**

If Desktop Commander MCP tools are available:

```
1. Detect Proton Drive sync folder (same logic as proton-drive-session-sync):
   - Check C:\Users\[username]\Proton Drive\  (Windows)
   - Check ~/Proton Drive/  (macOS/Linux)
   - Search if not found at default path
   - Ask user if search fails

2. Ensure case folder exists:
   create_directory -> [sync_folder]/VERNEN/Case Archives/[Case-ID]/

3. Write archive file:
   write_file -> [sync_folder]/VERNEN/Case Archives/[Case-ID]/YYYY-MM-DD_topic-slug.md

4. Update _INDEX.md (Step 4 below)

5. Verify with get_file_info
```

**PRIORITY 2: Chrome Browser Automation**

If Desktop Commander is NOT available but Chrome extension IS connected:

```
1. Load tool definitions:
   tool_search -> "navigate browser"
   tool_search -> "upload file"

2. Save archive to Claude container:
   Create file at /mnt/user-data/outputs/YYYY-MM-DD_topic-slug.md

3. Navigate to Proton Drive:
   navigate -> https://drive.proton.me

4. Navigate to case folder:
   Click through: VERNEN → Case Archives → [Case-ID]
   If folder doesn't exist, create it via Proton Drive UI

5. Upload file:
   Use file upload interaction to upload the archive markdown

6. Update _INDEX.md:
   Download existing _INDEX.md, append new entry, re-upload
   OR create new _INDEX.md if first archive in this case
```

**PRIORITY 3: Manual Download Fallback**

If neither Desktop Commander nor Chrome is available:

```
1. Save archive to /mnt/user-data/outputs/
2. present_files to give user the download link
3. Instruct: "Save this to Proton Drive → VERNEN/Case Archives/[Case-ID]/"
4. Also provide _INDEX.md update content for user to append manually
```

### STEP 4: Update Case Index

Every case folder has an `_INDEX.md` that tracks all archives chronologically.

If `_INDEX.md` exists: read it, append new entry, write back.
If `_INDEX.md` doesn't exist: create from template below.

**_INDEX.md Template:**

```markdown
# Case Index: [Case Name]

**Case ID:** [Case-ID]
**Status:** Active
**Created:** [Date of first archive]
**Last Updated:** [Date of most recent archive]

---

## Session Timeline

| Date | Archive File | Summary |
|------|-------------|---------|
| YYYY-MM-DD | [filename.md] | [One-line summary] |

---

## Current Status
[2-3 sentences on where this case/project stands RIGHT NOW]

## Priority Next Actions
1. [Most urgent next step]
2. [Second priority]
3. [Third priority]
```

When appending: add new row to Session Timeline table, update Last Updated date,
update Current Status and Priority Next Actions based on latest archive content.

### STEP 5: Confirm

Report to user:

```
ARCHIVE FLAGGED — [Case-ID]

  📁 [Case-ID]/YYYY-MM-DD_topic-slug.md
  📋 _INDEX.md updated ([N] total sessions archived)

  Saved via: [Desktop Commander / Chrome / Manual download]
  Sync status: [Auto-syncing to Proton Drive cloud / Needs manual save]
```

---

## Reading Archives at Session Start

This skill works WITH session-resume-continuity. At conversation start:

1. session-resume-continuity triggers
2. It checks memory for active cases
3. If Desktop Commander available: reads _INDEX.md from active case folders
4. Presents resume context from the most recent archive per active case
5. Offers to continue from the latest Next Actions

Priority chain for context retrieval:
**Case Archives (_INDEX.md)** → **Memory** → **Past Chat Search**

Case Archives are the most reliable because they're structured, chronological, and
contain the actual decision/finding content — not just conversation metadata.

---

## Relationship to Other Skills

| Skill | Purpose | Writes To |
|-------|---------|-----------|
| **archive-flag** (THIS) | Selective, case-tagged, high-value archives | Case Archives/[Case-ID]/ |
| proton-drive-session-sync | General daily session logs | Session Logs/ |
| session-resume-continuity | Reads archives + memory at session start | N/A (read-only) |

**Rule:** archive-flag and proton-drive-session-sync can BOTH run in the same session.
Session-sync captures the general log. Archive-flag captures the case-specific highlights.
They write to different folders. No conflict.

---

## Edge Cases

### Multiple cases in one conversation
Generate separate archive files for each case. Each goes to its own folder with its
own _INDEX.md update. Confirm each case target with user before writing.

### Very long conversations
Focus the archive on DECISIONS and FINDINGS, not on the full discussion that led there.
The archive should be concise enough to read in 2-3 minutes but complete enough to
resume work without searching past chats.

### Conversation was compacted
If conversation was compacted, reference the transcript file path in the archive
under Cross-References. The transcript has the full detail; the archive has the
actionable summary.

### Proton Drive not accessible
Fall to Priority 3 (manual download). ALWAYS generate the archive file regardless of
whether it can be auto-saved. The content matters more than the delivery mechanism.
User can manually place it later.

### User flags same conversation twice
Check if archive for today's date + topic already exists. If so, ask:
"An archive for [topic] already exists from today. Update it or create a new one?"

---

## Quick Reference

```
User: "Flag this"
Claude:
  1. Identify case → confirm with user if ambiguous
  2. Generate structured archive markdown
  3. Write to Proton Drive (Desktop Commander → Chrome → Manual)
  4. Update _INDEX.md
  5. Confirm with file path and sync status
```

Total time from trigger to confirmation: under 60 seconds.

---
name: proton-drive-session-sync
description: "Passive session persistence skill that automatically saves all session progress, deliverables, and infrastructure updates to Proton Drive (drive.proton.me) via Chrome browser automation. ALWAYS trigger this skill at the END of every session, or when user says 'save progress', 'sync to Proton', 'save session', 'update logs', 'save to drive', or any variation of session persistence. Also trigger when user asks to 'remember this', 'track this', or references continuity between sessions. ALSO trigger automatically after any VERNEN build batch is marked DONE in the BUILD_REGISTRY — do not wait for session end or user request. This skill ensures no work is lost between sessions and eliminates the need to manually re-explain context. Even if the user doesn't explicitly ask, if significant work was done in the session, proactively offer to run this skill before the conversation ends."
---

# Proton Drive Session Sync Skill

## PURPOSE
Persist all session work, deliverables, and infrastructure state to Proton Drive automatically. Eliminates context loss between sessions. Operates via Chrome browser automation to drive.proton.me.

---

## TRIGGER CONDITIONS

### Manual Triggers
User says any of:
- "save progress" / "sync to Proton" / "save session"
- "update logs" / "save to drive" / "remember this" / "track this"
- Any reference to session persistence or cross-session continuity

### Automatic — SESSION END
Trigger proactively at session end if ANY of the following occurred:
- Files were created or modified
- Code was written or deployed
- Infrastructure was changed
- Legal documents were analyzed
- Strategic decisions were made

### Automatic — BUILD COMPLETION
Trigger immediately when:
- BUILD_REGISTRY.md status changes to DONE for any task
- present_files is called with VERNEN deliverables
- A build batch completes (do NOT wait for session end)

This is a lightweight BUILD CHECKPOINT SYNC — not a full session log.

---

## SYNC TARGETS

### Primary Location
```
C:\Users\SagFi\Proton Drive\
```
**No re-detection needed.** Path is hardcoded. If unavailable, report error immediately.

### Directory Structure
```
Proton Drive/
├── VERNEN_SESSION_LOGS/
│   ├── SESSION_LOG_YYYY-MM-DD.md       ← Full session logs
│   └── BUILD_CHECKPOINTS/
│       └── CHECKPOINT_YYYY-MM-DD_HH-MM.md  ← Build completion snapshots
├── VERNEN_DELIVERABLES/
│   └── [task-name]/                    ← Output files per task
└── CASE_ARCHIVES/
    └── [case-name]/                    ← Legal/custody flagged items
```

---

## BUILD CHECKPOINT SYNC PROTOCOL

When triggered by BUILD COMPLETION (lightweight mode):

```markdown
# VERNEN Build Checkpoint — [TIMESTAMP]

## Task Completed
[Task name from BUILD_REGISTRY]

## Deliverables
[List of files produced]

## Registry Status
[Copy of updated BUILD_REGISTRY entry]

## Next Task
[Next queued task]

## Notes
[Any blockers, decisions made, or manual gates pending]
```

Append to: `VERNEN_SESSION_LOGS/BUILD_CHECKPOINTS/CHECKPOINT_[DATE]_[TIME].md`

---

## FULL SESSION SYNC PROTOCOL

When triggered at session end or manually:

1. **Compile session summary:**
   - Tasks completed (from BUILD_REGISTRY)
   - Files produced (from present_files calls)
   - Infrastructure changes
   - Decisions made
   - Open items / blockers

2. **Write session log:**
   - File: `VERNEN_SESSION_LOGS/SESSION_LOG_[DATE].md`
   - If file exists for today: append, do not overwrite

3. **Copy deliverables:**
   - Any files from `/mnt/user-data/outputs/` → `VERNEN_DELIVERABLES/[task-name]/`

4. **Confirm sync:**
   - Report: "✅ Session synced to Proton Drive — [X] files, [Y] log entries"

---

## ERROR HANDLING

| Error | Action |
|---|---|
| Proton Drive path not found | Report immediately, do not proceed |
| Browser automation fails | Report error, offer manual download alternative |
| File write conflict | Append timestamp to filename, do not overwrite |
| Network unavailable | Queue sync, notify user |

---

## CHROME AUTOMATION NOTES

- Navigate to drive.proton.me if local Proton Drive folder is unavailable
- Use Claude in Chrome tools if desktop sync client is not active
- Always verify upload success before reporting complete
- Do not store credentials — use existing authenticated session only

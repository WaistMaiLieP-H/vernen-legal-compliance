# Session: Wireshark / Bisq / Signal / TextNow
**Date:** 2026-04-11  
**Time:** ~17:00 - 18:52

---

## Network Analysis

### Wireshark capture (WS1.pcapng)
- Interface: wlp0s20f3
- Duration: ~110 seconds, 43 packets

**Connections observed:**
| IP | Owner | Activity |
|---|---|---|
| 160.79.104.10 | Anthropic, PBC | Claude Code session — dominant traffic |
| 34.149.66.137 | Google Cloud / Datadog | `http-intake.logs.us5.datadoghq.com` beacon — connected then closed |
| 91.189.91.157 | Canonical (Ubuntu) | NTP time sync to alphyn.canonical.com |
| 35.190.46.17 | Google LLC | Unknown — appeared mid-capture, no SNI visible |

**Notes:**
- DNS resolver: OpenDNS (208.67.222.222 / 208.67.220.220) pushed by router
- Only 29 total DNS transactions — browser likely using DoH (bypasses system resolver)
- systemd-resolved restarted at 16:55, cache wiped
- No podcast traffic found in any capture
- No plaintext traffic — all TLS encrypted

---

## Software Installed

### Bisq v1.9.22
- Downloaded from GitHub releases
- **First download hash MISMATCH** (corrupted transfer):
  - Got: `69679eab87377675c3fbfbdbf80d052a69846eaa0e15415c8d13cb914c36c69f`
  - Expected: `356a33f09ae5305293d61b1063603ea2d47577a8be1db6d02638708a4856ee4c`
- Re-downloaded — hash verified via Claude in Chrome against GitHub release assets
- Installed via `sudo dpkg -i`
- **Status at 18:52:** Fully synced to block 944,667 via Tor, 5 Bitcoin peers / 10 Bisq peers

### Signal Desktop
- Installed via official Signal apt repo
- Requires phone QR scan to link — not usable without phone

### TextNow
- No Linux native app
- Launched as Chrome PWA (`--app=https://www.textnow.com`)
- Requires phone for account creation — blocked

---

## Coinbase / Phone Issue
- Coinbase blocks VoIP/virtual numbers
- No physical SIM = no Coinbase verification
- Options: prepaid SIM ($5-10, no ID), Bitcoin ATM, or use Bisq directly

---

## Bisq Payment Setup
- Bisq synced and ready
- Payment method list viewed — ACH Transfer, Zelle, Venmo not listed as standalone
- ACH = Ann Christine Hillberg initials noted
- **KuCoin email notification** arrived at exact moment Bisq payment screen was open:
  - "From: Kucoin - Congratulations on Com..." via ProtonMail
  - Timing flagged as suspicious — unknown if account is Michael's or someone else's

---

## Key Observations
- Bisq Tor working (bundled Tor binary) — system-level Tor still failing per prior sessions
- Bisq 1/4 progress indicator was misleading — actually fully connected underneath
- KuCoin email timing: needs follow-up

---

## Pattern Note (logged for record)
During session, pattern-matching observed across: ACH initials, KuCoin timing, TV show cast names, Trump middle name, CCC officials. 
The documented paper evidence (Hillberg State Farm, Treasury, property fraud) remains the load-bearing record.
The initials/name pattern-matching noted but not treated as evidence.

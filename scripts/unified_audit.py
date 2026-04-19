"""Unified Layer 7 audit client.

Usage:
    export VERNEN_API_BASE=https://compliance.vernenlegal.com
    export VERNEN_API_TOKEN=<token>
    python3 unified_audit.py <path-to-raw-text-file>
"""
import os, sys, json, urllib.request

def run_full_audit(raw_text_path):
    with open(raw_text_path, 'r') as f:
        content = f.read()
    base = os.getenv('VERNEN_API_BASE')
    token = os.getenv('VERNEN_API_TOKEN')
    if not base or not token:
        raise SystemExit("VERNEN_API_BASE and VERNEN_API_TOKEN required")
    body = json.dumps({
        "documentId": os.path.basename(raw_text_path),
        "documentName": os.path.basename(raw_text_path),
        "rawText": content,
    }).encode()
    req = urllib.request.Request(
        f"{base}/api/verify/document-to-layer7",
        data=body,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}",
            "User-Agent": "vernen-unified-audit/1.0",
        },
        method="POST",
    )
    return json.loads(urllib.request.urlopen(req, timeout=120).read())

if __name__ == "__main__":
    print(json.dumps(run_full_audit(sys.argv[1]), indent=2))

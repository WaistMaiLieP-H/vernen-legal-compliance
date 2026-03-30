#!/bin/bash
# Install all exported skills into the Citizen Skill Registry.
# Reads from the vernen-skills-export directory and POSTs to the install-batch endpoint.
#
# Usage: ./scripts/install-skills.sh [API_URL] [API_KEY]
#   API_URL defaults to https://compliance.vernenlegal.com
#   API_KEY must be provided or set as VERNEN_API_KEY env var

set -euo pipefail

SKILLS_DIR="${SKILLS_DIR:-/tmp/vernen-skills/vernen-skills-export}"
API_URL="${1:-${VERNEN_API_URL:-https://compliance.vernenlegal.com}}"
API_KEY="${2:-${VERNEN_API_KEY:-}}"

if [ -z "$API_KEY" ]; then
  echo "ERROR: API_KEY required. Pass as arg or set VERNEN_API_KEY."
  exit 1
fi

echo "=== VERNEN Citizen Skill Installer ==="
echo "Skills source: $SKILLS_DIR"
echo "Target API: $API_URL"
echo ""

# Build JSON payload
SKILLS_JSON='{"skills":['
FIRST=true

for skill_dir in "$SKILLS_DIR"/*/; do
  slug=$(basename "$skill_dir")
  skill_file="$skill_dir/SKILL.md"

  if [ ! -f "$skill_file" ]; then
    echo "SKIP: $slug (no SKILL.md)"
    continue
  fi

  # Check file is non-empty
  if [ ! -s "$skill_file" ]; then
    echo "SKIP: $slug (empty SKILL.md)"
    continue
  fi

  echo "LOAD: $slug"

  # Escape content for JSON
  content=$(python3 -c "
import json, sys
with open('$skill_file', 'r') as f:
    print(json.dumps(f.read()))
")

  if [ "$FIRST" = true ]; then
    FIRST=false
  else
    SKILLS_JSON+=','
  fi

  SKILLS_JSON+="{\"slug\":\"$slug\",\"content\":$content}"
done

SKILLS_JSON+=']}'

echo ""
echo "Installing $(echo "$SKILLS_JSON" | python3 -c "import json,sys; d=json.load(sys.stdin); print(len(d['skills']))" 2>/dev/null || echo '?') skills..."

# POST to batch install endpoint
RESPONSE=$(curl -s -w "\n%{http_code}" \
  -X POST "$API_URL/api/skills/install-batch" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d "$SKILLS_JSON")

HTTP_CODE=$(echo "$RESPONSE" | tail -1)
BODY=$(echo "$RESPONSE" | head -n -1)

if [ "$HTTP_CODE" = "201" ]; then
  echo ""
  echo "=== INSTALLATION COMPLETE ==="
  echo "$BODY" | python3 -m json.tool 2>/dev/null || echo "$BODY"
else
  echo ""
  echo "ERROR: HTTP $HTTP_CODE"
  echo "$BODY" | python3 -m json.tool 2>/dev/null || echo "$BODY"
  exit 1
fi

#!/bin/bash
# ============================================================================
# VERNEN LEGAL COMPLIANCE — Customer Simulation Engine
# Exercises all Citizen services with realistic customer scenarios
# ============================================================================

BASE_URL="${1:-https://compliance.vernenlegal.com}"
DELAY="${2:-2}"  # seconds between requests to be respectful
RUN_ID=$(date +%s)  # unique per run to avoid duplicate conflicts

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m'

log() { echo -e "${CYAN}[$(date +%H:%M:%S)]${NC} $1"; }
ok()  { echo -e "${GREEN}  ✓${NC} $1"; }
warn(){ echo -e "${YELLOW}  ⚠${NC} $1"; }
err() { echo -e "${RED}  ✗${NC} $1"; }
sep() { echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"; }

TOTAL=0
PASS=0
FAIL=0

# Standard call — expects 2xx/3xx
call() {
  local method="$1" endpoint="$2" data="$3" label="$4"
  TOTAL=$((TOTAL+1))

  if [ "$method" = "GET" ]; then
    response=$(curl -s -w "\n%{http_code}" "$BASE_URL$endpoint" 2>&1)
  else
    response=$(curl -s -w "\n%{http_code}" -X "$method" "$BASE_URL$endpoint" \
      -H "Content-Type: application/json" -d "$data" 2>&1)
  fi

  http_code=$(echo "$response" | tail -1)
  body=$(echo "$response" | sed '$d')

  if [ "$http_code" -ge 200 ] && [ "$http_code" -lt 400 ]; then
    ok "$label (HTTP $http_code)"
    PASS=$((PASS+1))
  else
    err "$label (HTTP $http_code)"
    FAIL=$((FAIL+1))
  fi

  LAST_RESPONSE="$body"
  LAST_CODE="$http_code"
  sleep "$DELAY"
}

# Expect a specific HTTP code (for testing error handling)
call_expect() {
  local method="$1" endpoint="$2" data="$3" label="$4" expected="$5"
  TOTAL=$((TOTAL+1))

  if [ "$method" = "GET" ]; then
    response=$(curl -s -w "\n%{http_code}" "$BASE_URL$endpoint" 2>&1)
  else
    response=$(curl -s -w "\n%{http_code}" -X "$method" "$BASE_URL$endpoint" \
      -H "Content-Type: application/json" -d "$data" 2>&1)
  fi

  http_code=$(echo "$response" | tail -1)
  body=$(echo "$response" | sed '$d')

  if [ "$http_code" = "$expected" ]; then
    ok "$label (HTTP $http_code — expected)"
    PASS=$((PASS+1))
  else
    err "$label (HTTP $http_code — expected $expected)"
    FAIL=$((FAIL+1))
  fi

  LAST_RESPONSE="$body"
  LAST_CODE="$http_code"
  sleep "$DELAY"
}

extract_json() {
  echo "$LAST_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin).get('$1',''))" 2>/dev/null
}

# ============================================================================
echo ""
sep
echo -e "${CYAN}  VERNEN LEGAL COMPLIANCE — Customer Simulation Engine${NC}"
echo -e "${CYAN}  Target: $BASE_URL${NC}"
echo -e "${CYAN}  Started: $(date)${NC}"
sep
echo ""

# ============================================================================
# PHASE 1: Platform Health & Discovery
# ============================================================================
log "PHASE 1: Platform Health & Discovery"
sep

call GET "/api/health" "" "Platform health check"
call GET "/api/regulis/products" "" "REGULIS product catalog"
call GET "/api/forms" "" "Court forms catalog"
call GET "/api/forms/scenarios" "" "Form scenarios"

echo ""

# ============================================================================
# PHASE 2: REGULIS — Compliance Checks (10 diverse businesses)
# ============================================================================
log "PHASE 2: REGULIS — Compliance Analysis (10 Customers)"
sep

# Customer 1: California Restaurant LLC
call POST "/api/regulis/check" \
  '{"businessName":"Golden Gate Bistro LLC","entityType":"LLC","state":"CA","industry":"food_service","employeeCount":12}' \
  "Customer 1: CA Restaurant LLC (12 employees)"

REPORT_1=$(echo "$LAST_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin).get('reportId',''))" 2>/dev/null)
if [ -n "$REPORT_1" ]; then
  call GET "/api/regulis/report/$REPORT_1" "" "  → Retrieve report $REPORT_1"
fi

# Customer 2: Texas Construction Corp
call POST "/api/regulis/check" \
  '{"businessName":"Lone Star Builders Corp","entityType":"Corporation","state":"TX","industry":"construction","employeeCount":45}' \
  "Customer 2: TX Construction Corp (45 employees)"

# Customer 3: New York Tech Startup
call POST "/api/regulis/check" \
  '{"businessName":"ByteForge Technologies Inc","entityType":"Corporation","state":"NY","industry":"technology","employeeCount":8}' \
  "Customer 3: NY Tech Startup (8 employees)"

# Customer 4: Florida Real Estate LLC
call POST "/api/regulis/check" \
  '{"businessName":"Sunshine Realty Partners LLC","entityType":"LLC","state":"FL","industry":"real_estate","employeeCount":6}' \
  "Customer 4: FL Real Estate LLC (6 employees)"

# Customer 5: California Cannabis Dispensary
call POST "/api/regulis/check" \
  '{"businessName":"Green Leaf Wellness LLC","entityType":"LLC","state":"CA","industry":"cannabis","employeeCount":15}' \
  "Customer 5: CA Cannabis LLC (15 employees)"

# Customer 6: Multi-state E-commerce (sole prop)
call POST "/api/regulis/check" \
  '{"businessName":"Artisan Goods by Maria","entityType":"Sole Proprietorship","state":"CA","industry":"retail","employeeCount":1}' \
  "Customer 6: CA Sole Prop E-commerce (1 employee)"

# Customer 7: Illinois Healthcare Practice
call POST "/api/regulis/check" \
  '{"businessName":"Midwest Family Medicine SC","entityType":"Corporation","state":"IL","industry":"healthcare","employeeCount":22}' \
  "Customer 7: IL Healthcare Corp (22 employees)"

# Customer 8: Nevada Entertainment LLC
call POST "/api/regulis/check" \
  '{"businessName":"Desert Nights Entertainment LLC","entityType":"LLC","state":"NV","industry":"entertainment","employeeCount":35}' \
  "Customer 8: NV Entertainment LLC (35 employees)"

# Customer 9: Washington Nonprofit
call POST "/api/regulis/check" \
  '{"businessName":"Pacific Northwest Youth Foundation","entityType":"Nonprofit","state":"WA","industry":"nonprofit","employeeCount":10}' \
  "Customer 9: WA Nonprofit (10 employees)"

# Customer 10: Georgia Manufacturing Corp
call POST "/api/regulis/check" \
  '{"businessName":"Peachtree Precision Manufacturing Inc","entityType":"Corporation","state":"GA","industry":"manufacturing","employeeCount":120}' \
  "Customer 10: GA Manufacturing Corp (120 employees)"

echo ""

# ============================================================================
# PHASE 3: ADVOCIS — Client Onboarding & Management
# ============================================================================
log "PHASE 3: ADVOCIS — Client Onboarding"
sep

# Onboard Customer 1 (unique per run)
call POST "/api/advocis/onboard" \
  "{\"businessName\":\"Golden Gate Bistro $RUN_ID LLC\",\"entityType\":\"LLC\",\"states\":[\"CA\"],\"industry\":\"food_service\",\"email\":\"marco+$RUN_ID@goldengatebistroca.com\",\"name\":\"Marco Rossi\",\"employeeCount\":12}" \
  "Onboard: Golden Gate Bistro LLC"

CLIENT_1=$(echo "$LAST_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin).get('clientId',''))" 2>/dev/null)

# Onboard Customer 2
call POST "/api/advocis/onboard" \
  "{\"businessName\":\"Lone Star Builders $RUN_ID Corp\",\"entityType\":\"Corporation\",\"states\":[\"TX\",\"OK\",\"LA\"],\"industry\":\"construction\",\"email\":\"jim+$RUN_ID@lonestarbuilders.com\",\"name\":\"Jim Crawford\",\"employeeCount\":45}" \
  "Onboard: Lone Star Builders Corp (multi-state)"

CLIENT_2=$(echo "$LAST_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin).get('clientId',''))" 2>/dev/null)

# Onboard Customer 3
call POST "/api/advocis/onboard" \
  "{\"businessName\":\"ByteForge $RUN_ID Technologies Inc\",\"entityType\":\"Corporation\",\"states\":[\"NY\",\"CA\",\"TX\"],\"industry\":\"technology\",\"email\":\"priya+$RUN_ID@byteforge.io\",\"name\":\"Priya Sharma\",\"employeeCount\":8}" \
  "Onboard: ByteForge Technologies (3 states)"

# Onboard Customer 4
call POST "/api/advocis/onboard" \
  "{\"businessName\":\"Midwest Family Medicine $RUN_ID SC\",\"entityType\":\"Corporation\",\"states\":[\"IL\"],\"industry\":\"healthcare\",\"email\":\"dr.chen+$RUN_ID@midwestfamilymed.com\",\"name\":\"Dr. Linda Chen\",\"employeeCount\":22}" \
  "Onboard: Midwest Family Medicine SC"

# Onboard Customer 5
call POST "/api/advocis/onboard" \
  "{\"businessName\":\"Artisan Goods $RUN_ID by Maria\",\"entityType\":\"Sole Proprietorship\",\"states\":[\"CA\"],\"industry\":\"retail\",\"email\":\"maria+$RUN_ID@artisangoods.shop\",\"name\":\"Maria Santos\",\"employeeCount\":1}" \
  "Onboard: Artisan Goods (sole prop)"

# Check onboarding status
if [ -n "$CLIENT_1" ]; then
  call GET "/api/advocis/client/$CLIENT_1" "" "  → Client profile: Golden Gate Bistro"
  call GET "/api/advocis/client/$CLIENT_1/onboarding" "" "  → Onboarding status"
fi

# Stats
call GET "/api/advocis/stats" "" "ADVOCIS aggregate stats"
call GET "/api/advocis/churn-risk" "" "Churn risk analysis"

echo ""

# ============================================================================
# PHASE 4: ADVOCIS — Client Inquiries (SERVE-1 Worker)
# ============================================================================
log "PHASE 4: Client Inquiries (SERVE-1 Processing)"
sep

# Billing inquiry
call POST "/api/advocis/inquiry" \
  '{"type":"BILLING","message":"I purchased a single-state report for California but I also need Texas. Can I upgrade to multi-state?","clientId":"'"$CLIENT_1"'"}' \
  "Inquiry: Billing — upgrade request"

# Compliance question
call POST "/api/advocis/inquiry" \
  '{"type":"COMPLIANCE_QUESTION","message":"We are a construction company expanding from Texas to Oklahoma. What additional licenses do we need?","clientId":"'"$CLIENT_2"'"}' \
  "Inquiry: Compliance — multi-state expansion"

# Technical support
call POST "/api/advocis/inquiry" \
  '{"type":"TECHNICAL","message":"My compliance report PDF is not loading. Report ID is rpt_test123. Can you help?"}' \
  "Inquiry: Technical — report access issue"

# General question
call POST "/api/advocis/inquiry" \
  '{"type":"GENERAL","message":"I am a solo practitioner therapist in California. Do I need a compliance report for my practice?"}' \
  "Inquiry: General — solo practitioner question"

# Feedback
call POST "/api/advocis/inquiry" \
  '{"type":"FEEDBACK","message":"The compliance report was very thorough. I especially liked the remediation guidance. Would love to see industry-specific benchmarks added."}' \
  "Inquiry: Feedback — positive with suggestion"

# Compliance question - healthcare
call POST "/api/advocis/inquiry" \
  '{"type":"COMPLIANCE_QUESTION","message":"We are a small medical practice. Are we required to have a HIPAA compliance officer? What are the penalties for non-compliance?"}' \
  "Inquiry: Compliance — HIPAA question"

# Compliance question - cannabis
call POST "/api/advocis/inquiry" \
  '{"type":"COMPLIANCE_QUESTION","message":"We operate a cannabis dispensary in California. With the new regulations taking effect, do we need to update our track-and-trace system?"}' \
  "Inquiry: Compliance — cannabis regulations"

# Billing inquiry
call POST "/api/advocis/inquiry" \
  '{"type":"BILLING","message":"Does the monthly monitor plan cover regulatory change alerts for all three of our operating states?"}' \
  "Inquiry: Billing — monthly monitor scope"

echo ""

# ============================================================================
# PHASE 5: Court Forms Navigation (FormNavigator)
# ============================================================================
log "PHASE 5: Court Forms Navigation"
sep

# Browse forms
call GET "/api/forms/FL-100" "" "Form guidance: FL-100 (Petition for Dissolution)"
call GET "/api/forms/FL-110" "" "Form guidance: FL-110 (Summons)"
call GET "/api/forms/FL-120" "" "Form guidance: FL-120 (Response)"
call GET "/api/forms/FL-300" "" "Form guidance: FL-300 (Request for Order)"
call GET "/api/forms/FL-150" "" "Form guidance: FL-150 (Income & Expense)"
call GET "/api/forms/DV-100" "" "Form guidance: DV-100 (DVRO Request)"
call GET "/api/forms/FW-001" "" "Form guidance: FW-001 (Fee Waiver)"
call GET "/api/forms/FL-305" "" "Form guidance: FL-305 (Temporary Orders)"

# Multilingual access
call GET "/api/forms/FL-100?lang=es" "" "Form FL-100 in Spanish"
call GET "/api/forms/FL-100?lang=zh" "" "Form FL-100 in Chinese"
call GET "/api/forms/FL-100?lang=vi" "" "Form FL-100 in Vietnamese"
call GET "/api/forms/FL-100?lang=ko" "" "Form FL-100 in Korean"
call GET "/api/forms/FL-100?lang=ar" "" "Form FL-100 in Arabic"
call GET "/api/forms/FL-100?lang=tl" "" "Form FL-100 in Tagalog"
call GET "/api/forms/FL-100?lang=ru" "" "Form FL-100 in Russian"
call GET "/api/forms/FL-100?lang=pt" "" "Form FL-100 in Portuguese"
call GET "/api/forms/FL-100?lang=ht" "" "Form FL-100 in Haitian Creole"
call GET "/api/forms/FL-100?lang=so" "" "Form FL-100 in Somali"
call GET "/api/forms/FL-100?lang=ti" "" "Form FL-100 in Tigrinya"
call GET "/api/forms/FL-100?lang=am" "" "Form FL-100 in Amharic"

# i18n Language System
call GET "/api/i18n/languages" "" "i18n: All 13 languages"
call GET "/api/i18n/vi" "" "i18n: Vietnamese full bundle"
call GET "/api/i18n/ar/gdn" "" "i18n: Arabic GDN section"
call GET "/api/i18n/ti/gdn" "" "i18n: Tigrinya GDN section"

# Enriched Form Registry
call GET "/api/forms/registry" "" "GDN: Full form registry (23 forms)"
call GET "/api/forms/registry?tier=A" "" "GDN: Tier A forms"
call GET "/api/forms/registry?tier=B" "" "GDN: Tier B forms"

echo ""

# ============================================================================
# PHASE 6: REGULIS — State Mapping & Comparison
# ============================================================================
log "PHASE 6: REGULIS — Regulatory Intelligence"
sep

call GET "/api/regulis/map" "" "Full state compliance map"
call GET "/api/regulis/map/CA" "" "California regulatory map"
call GET "/api/regulis/map/TX" "" "Texas regulatory map"
call GET "/api/regulis/map/NY" "" "New York regulatory map"
call GET "/api/regulis/compare?state1=CA&state2=TX&entityType=LLC" "" "Compare: CA vs TX (LLC)"
call GET "/api/regulis/alerts" "" "Active regulatory alerts"

echo ""

# ============================================================================
# PHASE 7: Additional Citizen Endpoints
# ============================================================================
log "PHASE 7: Extended Citizen Services"
sep

# INTEGRA — System health (admin-only, expect 401)
call_expect GET "/api/integra/audit" "" "INTEGRA: Auth gate (admin)" "401"
call_expect GET "/api/integra/audit/database" "" "INTEGRA: Auth gate (database)" "401"
call_expect GET "/api/integra/metrics" "" "INTEGRA: Auth gate (metrics)" "401"

# PRIVAXIS — Privacy (admin-only, expect 401)
call_expect GET "/api/privaxis/audit" "" "PRIVAXIS: Auth gate (audit)" "401"
call_expect GET "/api/privaxis/dataflows" "" "PRIVAXIS: Auth gate (dataflows)" "401"

# VIGILUS — Risk (admin-only, expect 401)
call_expect GET "/api/vigilus/risks" "" "VIGILUS: Auth gate (risks)" "401"
call_expect GET "/api/vigilus/risks/heatmap" "" "VIGILUS: Auth gate (heatmap)" "401"

# ETHICARA — Ethics (admin-only, expect 401)
call_expect GET "/api/ethicara/code" "" "ETHICARA: Auth gate (code)" "401"
call_expect GET "/api/ethicara/fairness" "" "ETHICARA: Auth gate (fairness)" "401"

# FISCARA — Financial (admin-only, expect 401)
call_expect GET "/api/fiscara/summary" "" "FISCARA: Auth gate (summary)" "401"

# LEXARC — Documents (public)
call GET "/api/lexarc/documents" "" "LEXARC: Document inventory"

# METRIQA — Analytics (admin-only, expect 401)
call_expect GET "/api/metriqa/dashboard" "" "METRIQA: Auth gate (dashboard)" "401"

echo ""

# ============================================================================
# PHASE 8: Stress Scenarios — Edge Cases
# ============================================================================
log "PHASE 8: Edge Cases & Boundary Testing"
sep

# Empty business name — still processes (graceful)
call POST "/api/regulis/check" \
  '{"businessName":"","entityType":"LLC","state":"CA"}' \
  "Edge: Empty business name (graceful)"

# Unknown state — expect 400
call_expect POST "/api/regulis/check" \
  '{"businessName":"Test Corp","entityType":"LLC","state":"ZZ"}' \
  "Edge: Invalid state code (rejected)" "400"

# Very large employee count
call POST "/api/regulis/check" \
  '{"businessName":"MegaCorp International","entityType":"Corporation","state":"CA","employeeCount":50000}' \
  "Edge: Large enterprise (50K employees)"

# Minimum viable — sole prop, 1 person
call POST "/api/regulis/check" \
  '{"businessName":"Jane Doe Consulting","entityType":"Sole Proprietorship","state":"CA","employeeCount":1}' \
  "Edge: Minimum viable business"

# Missing required fields — expect 400
call_expect POST "/api/regulis/check" \
  '{"businessName":"Test"}' \
  "Edge: Missing required fields (rejected)" "400"

echo ""

# ============================================================================
# RESULTS SUMMARY
# ============================================================================
sep
echo ""
log "SIMULATION COMPLETE"
echo ""
echo -e "  ${GREEN}Passed:${NC}  $PASS"
echo -e "  ${RED}Failed:${NC}  $FAIL"
echo -e "  Total:   $TOTAL"
echo ""
echo -e "  Success Rate: $(( PASS * 100 / TOTAL ))%"
echo ""
sep
echo -e "${CYAN}  Finished: $(date)${NC}"
sep
echo ""

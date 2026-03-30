#!/bin/bash
# ============================================================================
# VERNEN LEGAL COMPLIANCE — Endurance Simulation Engine
# Generates ALL unique audit combinations and runs them systematically
# Target: statistical confidence across every possible customer scenario
# ============================================================================

BASE_URL="${1:-https://compliance.vernenlegal.com}"
BATCH_SIZE="${2:-500}"      # audits per batch before reporting
MAX_AUDITS="${3:-5000}"     # total audits to run (0 = unlimited)
DELAY="0.3"                 # 300ms between requests — fast but respectful
RUN_ID=$(date +%s)

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
BOLD='\033[1m'
NC='\033[0m'

# Counters
TOTAL=0
PASS=0
FAIL=0
BATCH_PASS=0
BATCH_FAIL=0
BATCH_NUM=0
FAIL_LOG="/tmp/vernen-endurance-failures-$RUN_ID.log"
touch "$FAIL_LOG"

# ============================================================================
# All dimensions
# ============================================================================

STATES=(AL AK AZ AR CA CO CT DE DC FL GA HI IA ID IL IN KS KY LA MA MD ME MI MN MO MS MT NC ND NE NH NJ NM NV NY OH OK OR PA RI SC SD TN TX UT VA VT WA WI WV WY)

ENTITY_TYPES=("LLC" "Corporation" "Sole Proprietorship" "Nonprofit" "Partnership" "Cooperative")

INDUSTRIES=(healthcare construction technology food_service retail real_estate cannabis financial_services manufacturing entertainment insurance education environmental transportation agriculture hospitality energy legal consulting pharmaceutical automotive childcare mining wholesale tourism)

EMPLOYEE_COUNTS=(1 5 15 30 50 100 500 2500)

BUSINESS_PREFIXES=("Summit" "Pacific" "Valley" "Mountain" "Coastal" "Prairie" "Metro" "Pioneer" "Heritage" "Frontier" "Golden" "Silver" "Iron" "Crystal" "Harbor" "River" "Eagle" "Cedar" "Oak" "Pine" "Maple" "Granite" "Sapphire" "Atlas" "Nova" "Apex" "Prime" "Crest" "Horizon" "Beacon")

BUSINESS_SUFFIXES=("Solutions" "Services" "Group" "Partners" "Associates" "Enterprises" "Industries" "Consulting" "Ventures" "Holdings" "Management" "Systems" "Works" "Labs" "Studio" "Design" "Craft" "Supply" "Direct" "Central")

LANGUAGES=(en es zh vi ko ar tl ru pt ht so ti am)

FORMS=(FL-100 FL-110 FL-120 FL-150 FL-300 FL-305 FL-311 FL-312 FL-320 FL-341 DV-100 DV-109 DV-110 FW-001 FW-003 MC-031)

INQUIRY_TYPES=("BILLING" "COMPLIANCE_QUESTION" "TECHNICAL" "FEEDBACK" "GENERAL")

INQUIRY_MESSAGES=(
  "What additional licenses do we need for expanding to a new state?"
  "How do I update the industry type on my existing compliance report?"
  "Is there a way to get alerts when regulations change in our state?"
  "We received a compliance notice from the state. Can your report help us respond?"
  "What is the difference between the single state and multi-state report?"
  "Can I add additional states to an existing report or do I need a new one?"
  "How often should we run a compliance check for our business?"
  "We are changing from an LLC to a Corporation. Do we need a new report?"
  "Your report flagged an issue we already addressed. How do I mark it resolved?"
  "Do you support compliance checking for businesses with federal contracts?"
  "We have employees in multiple states but are incorporated in Delaware. Which states matter?"
  "What happens when a regulation changes after I purchased my report?"
  "Can I share my compliance report with my attorney or accountant?"
  "We are a franchise. Does each location need its own compliance check?"
  "How do your compliance rules get updated? How current are they?"
  "Do you cover city and county regulations or just state and federal?"
  "We are applying for a bank loan and they want a compliance report. Will yours work?"
  "Is there a discount for nonprofit organizations?"
  "We need to prove compliance for an insurance audit. Does your report satisfy that?"
  "I am a sole proprietor working from home. Do I really need a compliance report?"
)

# ============================================================================
# Helper functions
# ============================================================================

random_element() {
  local arr=("$@")
  echo "${arr[$((RANDOM % ${#arr[@]}))]}"
}

random_number() {
  echo $(( (RANDOM % ($2 - $1 + 1)) + $1 ))
}

generate_business_name() {
  local prefix=$(random_element "${BUSINESS_PREFIXES[@]}")
  local suffix=$(random_element "${BUSINESS_SUFFIXES[@]}")
  echo "$prefix $suffix $TOTAL"
}

sep() { echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"; }

call_silent() {
  local method="$1" endpoint="$2" data="$3" label="$4"
  TOTAL=$((TOTAL+1))

  if [ "$method" = "GET" ]; then
    response=$(curl -s -w "\n%{http_code}" --max-time 10 "$BASE_URL$endpoint" 2>&1)
  else
    response=$(curl -s -w "\n%{http_code}" --max-time 10 -X "$method" "$BASE_URL$endpoint" \
      -H "Content-Type: application/json" -d "$data" 2>&1)
  fi

  http_code=$(echo "$response" | tail -1)

  if [ "$http_code" -ge 200 ] && [ "$http_code" -lt 400 ]; then
    PASS=$((PASS+1))
    BATCH_PASS=$((BATCH_PASS+1))
  else
    FAIL=$((FAIL+1))
    BATCH_FAIL=$((BATCH_FAIL+1))
    echo "[$(date +%H:%M:%S)] FAIL HTTP $http_code: $label" >> "$FAIL_LOG"
    echo -e "${RED}  ✗ $label (HTTP $http_code)${NC}"
  fi

  sleep "$DELAY"
}

report_batch() {
  BATCH_NUM=$((BATCH_NUM+1))
  local pct=0
  if [ "$TOTAL" -gt 0 ]; then
    pct=$(( PASS * 100 / TOTAL ))
  fi
  local batch_pct=0
  local batch_total=$((BATCH_PASS + BATCH_FAIL))
  if [ "$batch_total" -gt 0 ]; then
    batch_pct=$(( BATCH_PASS * 100 / batch_total ))
  fi

  echo ""
  sep
  echo -e "${CYAN}  BATCH $BATCH_NUM REPORT — $(date +%H:%M:%S)${NC}"
  echo -e "  Batch: ${GREEN}$BATCH_PASS passed${NC} / ${RED}$BATCH_FAIL failed${NC} / $batch_total total = ${BOLD}$batch_pct%${NC}"
  echo -e "  Cumulative: ${GREEN}$PASS passed${NC} / ${RED}$FAIL failed${NC} / $TOTAL total = ${BOLD}$pct%${NC}"
  if [ "$FAIL" -gt 0 ]; then
    echo -e "  ${RED}Failure log: $FAIL_LOG${NC}"
  fi
  sep
  echo ""

  BATCH_PASS=0
  BATCH_FAIL=0
}

# ============================================================================
# Main simulation
# ============================================================================

echo ""
sep
echo -e "${CYAN}  VERNEN LEGAL COMPLIANCE — ENDURANCE SIMULATION${NC}"
echo -e "${CYAN}  Target: $BASE_URL${NC}"
echo -e "${CYAN}  Batch size: $BATCH_SIZE | Max audits: $MAX_AUDITS${NC}"
echo -e "${CYAN}  Started: $(date)${NC}"
echo -e "${CYAN}  Failure log: $FAIL_LOG${NC}"
sep
echo ""

# Phase 1: Systematic state x entity sweep (51 x 6 = 306 audits)
echo -e "${CYAN}[$(date +%H:%M:%S)] PHASE 1: Full State × Entity Type Matrix (306 audits)${NC}"
for state in "${STATES[@]}"; do
  for entity in "${ENTITY_TYPES[@]}"; do
    local_industry=$(random_element "${INDUSTRIES[@]}")
    local_employees=$(random_element "${EMPLOYEE_COUNTS[@]}")
    local_name=$(generate_business_name)
    call_silent POST "/api/regulis/check" \
      "{\"businessName\":\"$local_name\",\"entityType\":\"$entity\",\"state\":\"$state\",\"industry\":\"$local_industry\",\"employeeCount\":$local_employees}" \
      "$state/$entity/$local_industry"

    if [ "$MAX_AUDITS" -gt 0 ] && [ "$TOTAL" -ge "$MAX_AUDITS" ]; then break 2; fi
    if [ $(( TOTAL % BATCH_SIZE )) -eq 0 ] && [ "$TOTAL" -gt 0 ]; then report_batch; fi
  done
done

if [ "$MAX_AUDITS" -gt 0 ] && [ "$TOTAL" -ge "$MAX_AUDITS" ]; then report_batch; fi

# Phase 2: Systematic state x industry sweep (51 x 25 = 1275 audits)
echo -e "${CYAN}[$(date +%H:%M:%S)] PHASE 2: Full State × Industry Matrix (1275 audits)${NC}"
for state in "${STATES[@]}"; do
  for industry in "${INDUSTRIES[@]}"; do
    local_entity=$(random_element "${ENTITY_TYPES[@]}")
    local_employees=$(random_element "${EMPLOYEE_COUNTS[@]}")
    local_name=$(generate_business_name)
    call_silent POST "/api/regulis/check" \
      "{\"businessName\":\"$local_name\",\"entityType\":\"$local_entity\",\"state\":\"$state\",\"industry\":\"$industry\",\"employeeCount\":$local_employees}" \
      "$state/$local_entity/$industry"

    if [ "$MAX_AUDITS" -gt 0 ] && [ "$TOTAL" -ge "$MAX_AUDITS" ]; then break 2; fi
    if [ $(( TOTAL % BATCH_SIZE )) -eq 0 ] && [ "$TOTAL" -gt 0 ]; then report_batch; fi
  done
done

if [ "$MAX_AUDITS" -gt 0 ] && [ "$TOTAL" -ge "$MAX_AUDITS" ]; then report_batch; fi

# Phase 3: Form x language matrix (16 x 13 = 208 requests)
echo -e "${CYAN}[$(date +%H:%M:%S)] PHASE 3: Full Form × Language Matrix (208 requests)${NC}"
for form in "${FORMS[@]}"; do
  for lang in "${LANGUAGES[@]}"; do
    call_silent GET "/api/forms/$form?lang=$lang" "" "$form/$lang"

    if [ "$MAX_AUDITS" -gt 0 ] && [ "$TOTAL" -ge "$MAX_AUDITS" ]; then break 2; fi
    if [ $(( TOTAL % BATCH_SIZE )) -eq 0 ] && [ "$TOTAL" -gt 0 ]; then report_batch; fi
  done
done

if [ "$MAX_AUDITS" -gt 0 ] && [ "$TOTAL" -ge "$MAX_AUDITS" ]; then report_batch; fi

# Phase 4: Onboarding across all states (51 onboards)
echo -e "${CYAN}[$(date +%H:%M:%S)] PHASE 4: Onboarding All States (51 clients)${NC}"
for state in "${STATES[@]}"; do
  local_entity=$(random_element "${ENTITY_TYPES[@]}")
  local_industry=$(random_element "${INDUSTRIES[@]}")
  local_name=$(generate_business_name)
  call_silent POST "/api/advocis/onboard" \
    "{\"businessName\":\"$local_name\",\"entityType\":\"$local_entity\",\"states\":[\"$state\"],\"industry\":\"$local_industry\",\"email\":\"client+${RUN_ID}_${state}@sim.vernen.com\",\"name\":\"Sim Customer $state\",\"employeeCount\":$(random_element "${EMPLOYEE_COUNTS[@]}")}" \
    "Onboard/$state/$local_entity"

  if [ "$MAX_AUDITS" -gt 0 ] && [ "$TOTAL" -ge "$MAX_AUDITS" ]; then break; fi
  if [ $(( TOTAL % BATCH_SIZE )) -eq 0 ] && [ "$TOTAL" -gt 0 ]; then report_batch; fi
done

# Phase 5: Inquiries with all message variants (20 inquiries x 5 types = 100)
echo -e "${CYAN}[$(date +%H:%M:%S)] PHASE 5: Inquiry Variants (100 inquiries)${NC}"
for msg_idx in "${!INQUIRY_MESSAGES[@]}"; do
  for inq_type in "${INQUIRY_TYPES[@]}"; do
    msg="${INQUIRY_MESSAGES[$msg_idx]}"
    # Escape quotes in message
    msg_escaped=$(echo "$msg" | sed 's/"/\\"/g')
    call_silent POST "/api/advocis/inquiry" \
      "{\"type\":\"$inq_type\",\"message\":\"$msg_escaped\"}" \
      "Inquiry/$inq_type/$msg_idx"

    if [ "$MAX_AUDITS" -gt 0 ] && [ "$TOTAL" -ge "$MAX_AUDITS" ]; then break 2; fi
    if [ $(( TOTAL % BATCH_SIZE )) -eq 0 ] && [ "$TOTAL" -gt 0 ]; then report_batch; fi
  done
done

# Phase 6: State comparisons — all adjacent/competing state pairs
echo -e "${CYAN}[$(date +%H:%M:%S)] PHASE 6: State Comparisons (50 pairs)${NC}"
STATE_PAIRS=("CA,TX" "CA,NV" "CA,AZ" "CA,OR" "CA,WA" "NY,NJ" "NY,CT" "NY,PA" "TX,FL" "TX,OK" "FL,GA" "FL,SC" "IL,IN" "IL,WI" "IL,MO" "OH,PA" "OH,MI" "WA,OR" "CO,UT" "CO,AZ" "MA,CT" "MA,NH" "VA,DC" "VA,MD" "NC,SC" "TN,GA" "TN,KY" "MN,WI" "MO,KS" "LA,TX" "NV,AZ" "DE,NJ" "DE,PA" "AL,MS" "AL,GA" "AR,TN" "AR,MO" "IA,NE" "IA,MN" "ID,MT" "ID,WA" "KY,WV" "ME,NH" "ND,SD" "ND,MT" "NM,AZ" "RI,CT" "SD,NE" "VT,NH" "WY,MT")
for pair in "${STATE_PAIRS[@]}"; do
  s1="${pair%,*}"
  s2="${pair#*,}"
  local_entity=$(random_element "${ENTITY_TYPES[@]}")
  call_silent GET "/api/regulis/compare?state1=$s1&state2=$s2&entityType=$local_entity" "" "Compare/$s1-$s2/$local_entity"

  if [ "$MAX_AUDITS" -gt 0 ] && [ "$TOTAL" -ge "$MAX_AUDITS" ]; then break; fi
  if [ $(( TOTAL % BATCH_SIZE )) -eq 0 ] && [ "$TOTAL" -gt 0 ]; then report_batch; fi
done

# Phase 7: i18n section deep dive
echo -e "${CYAN}[$(date +%H:%M:%S)] PHASE 7: i18n Section Coverage${NC}"
I18N_SECTIONS=("gdn" "filing" "auth" "nav" "common" "dashboard" "errors")
for lang in "${LANGUAGES[@]}"; do
  call_silent GET "/api/i18n/$lang" "" "i18n/$lang/full"
  for section in "${I18N_SECTIONS[@]}"; do
    call_silent GET "/api/i18n/$lang/$section" "" "i18n/$lang/$section"
    if [ "$MAX_AUDITS" -gt 0 ] && [ "$TOTAL" -ge "$MAX_AUDITS" ]; then break 2; fi
  done
  if [ $(( TOTAL % BATCH_SIZE )) -eq 0 ] && [ "$TOTAL" -gt 0 ]; then report_batch; fi
done

# Phase 8: Random stress — remaining quota filled with random combos
if [ "$MAX_AUDITS" -gt 0 ] && [ "$TOTAL" -lt "$MAX_AUDITS" ]; then
  remaining=$(( MAX_AUDITS - TOTAL ))
  echo -e "${CYAN}[$(date +%H:%M:%S)] PHASE 8: Random Stress ($remaining remaining audits)${NC}"
  while [ "$TOTAL" -lt "$MAX_AUDITS" ]; do
    local_state=$(random_element "${STATES[@]}")
    local_entity=$(random_element "${ENTITY_TYPES[@]}")
    local_industry=$(random_element "${INDUSTRIES[@]}")
    local_employees=$(random_element "${EMPLOYEE_COUNTS[@]}")
    local_name=$(generate_business_name)
    call_silent POST "/api/regulis/check" \
      "{\"businessName\":\"$local_name\",\"entityType\":\"$local_entity\",\"state\":\"$local_state\",\"industry\":\"$local_industry\",\"employeeCount\":$local_employees}" \
      "Random/$local_state/$local_entity/$local_industry"

    if [ $(( TOTAL % BATCH_SIZE )) -eq 0 ] && [ "$TOTAL" -gt 0 ]; then report_batch; fi
  done
fi

# Final report
report_batch

echo ""
sep
echo -e "${BOLD}${CYAN}  ENDURANCE SIMULATION — FINAL RESULTS${NC}"
sep
echo ""
echo -e "  Total Requests:  $TOTAL"
echo -e "  ${GREEN}Passed:${NC}        $PASS"
echo -e "  ${RED}Failed:${NC}        $FAIL"
echo ""
if [ "$FAIL" -eq 0 ]; then
  echo -e "  ${GREEN}${BOLD}SUCCESS RATE: 100%${NC}"
else
  echo -e "  ${RED}${BOLD}SUCCESS RATE: $(( PASS * 100 / TOTAL ))%${NC}"
  echo ""
  echo -e "  ${RED}Failures:${NC}"
  cat "$FAIL_LOG"
fi
echo ""
echo -e "  Started:  $(date -d @$RUN_ID 2>/dev/null || date)"
echo -e "  Finished: $(date)"
echo -e "  Duration: $(( ($(date +%s) - RUN_ID) / 60 )) minutes"
echo ""
sep

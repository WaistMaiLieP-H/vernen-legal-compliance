#!/bin/bash
# ============================================================================
# VERNEN LEGAL COMPLIANCE — Adversarial Customer Simulation
# Real-world scenarios that expose real gaps
# ============================================================================

BASE_URL="${1:-https://compliance.vernenlegal.com}"
DELAY="${2:-1}"
RUN_ID=$(date +%s)

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m'

log() { echo -e "${CYAN}[$(date +%H:%M:%S)]${NC} $1"; }
ok()  { echo -e "${GREEN}  ✓${NC} $1"; }
err() { echo -e "${RED}  ✗${NC} $1"; }
sep() { echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"; }

TOTAL=0
PASS=0
FAIL=0

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
    err "$label (HTTP $http_code) → $(echo "$body" | python3 -c "import sys,json; print(json.load(sys.stdin).get('error','')[:80])" 2>/dev/null)"
    FAIL=$((FAIL+1))
  fi
  LAST_RESPONSE="$body"
  LAST_CODE="$http_code"
  sleep "$DELAY"
}

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
    err "$label (HTTP $http_code — expected $expected) → $(echo "$body" | python3 -c "import sys,json; print(json.load(sys.stdin).get('error','')[:80])" 2>/dev/null)"
    FAIL=$((FAIL+1))
  fi
  LAST_RESPONSE="$body"
  sleep "$DELAY"
}

echo ""
sep
echo -e "${CYAN}  ADVERSARIAL CUSTOMER SIMULATION${NC}"
echo -e "${CYAN}  Target: $BASE_URL${NC}"
echo -e "${CYAN}  Run ID: $RUN_ID${NC}"
sep
echo ""

# ============================================================================
# SCENARIO 1: Heavily Regulated Industries
# Real businesses in industries with complex compliance requirements
# ============================================================================
log "SCENARIO 1: Heavily Regulated Industries"
sep

call POST "/api/regulis/check" \
  '{"businessName":"Valley Children Hospital","entityType":"Corporation","state":"CA","industry":"healthcare","employeeCount":2500}' \
  "Large hospital system (2500 employees, CA)"

call POST "/api/regulis/check" \
  '{"businessName":"First National Credit Union","entityType":"Corporation","state":"NY","industry":"financial_services","employeeCount":85}' \
  "Credit union (financial services, NY)"

call POST "/api/regulis/check" \
  '{"businessName":"Guardian Insurance Brokerage","entityType":"LLC","state":"CT","industry":"insurance","employeeCount":30}' \
  "Insurance brokerage (CT)"

call POST "/api/regulis/check" \
  '{"businessName":"BrightPath Charter School","entityType":"Nonprofit","state":"TX","industry":"education","employeeCount":65}' \
  "Charter school nonprofit (TX)"

call POST "/api/regulis/check" \
  '{"businessName":"Clean Harbor Environmental Services","entityType":"Corporation","state":"NJ","industry":"environmental","employeeCount":200}' \
  "Environmental services (NJ)"

call POST "/api/regulis/check" \
  '{"businessName":"Pacific Rim Import Export LLC","entityType":"LLC","state":"CA","industry":"import_export","employeeCount":18}' \
  "Import/export trade (CA)"

call POST "/api/regulis/check" \
  '{"businessName":"Sunrise Assisted Living","entityType":"LLC","state":"FL","industry":"senior_care","employeeCount":45}' \
  "Assisted living facility (FL)"

call POST "/api/regulis/check" \
  '{"businessName":"Delta Pharmaceuticals Inc","entityType":"Corporation","state":"MA","industry":"pharmaceutical","employeeCount":350}' \
  "Pharmaceutical company (MA)"

echo ""

# ============================================================================
# SCENARIO 2: Real Business Name Patterns
# Names customers actually use — special chars, DBA, long names
# ============================================================================
log "SCENARIO 2: Real Business Name Patterns"
sep

call POST "/api/regulis/check" \
  '{"businessName":"O'\''Brien & Associates LLC","entityType":"LLC","state":"CA","employeeCount":3}' \
  "Apostrophe in name (O'Brien)"

call POST "/api/regulis/check" \
  '{"businessName":"García, López & Hernández Law Group PC","entityType":"Corporation","state":"TX","industry":"legal","employeeCount":12}' \
  "Accented characters (García López)"

call POST "/api/regulis/check" \
  '{"businessName":"A+ Mobile Auto Detailing","entityType":"Sole Proprietorship","state":"CA","employeeCount":1}' \
  "Plus sign in name"

call POST "/api/regulis/check" \
  '{"businessName":"123 Quick Stop Convenience Store LLC","entityType":"LLC","state":"OH","industry":"retail","employeeCount":4}' \
  "Number-starting name"

call POST "/api/regulis/check" \
  '{"businessName":"The Very Long And Descriptive Business Name That Someone Actually Registered With The Secretary Of State LLC","entityType":"LLC","state":"CA","employeeCount":2}' \
  "Very long business name"

call POST "/api/regulis/check" \
  '{"businessName":"李氏家族企業 Lee Family Enterprise LLC","entityType":"LLC","state":"CA","employeeCount":8}' \
  "Chinese + English mixed name"

call POST "/api/regulis/check" \
  '{"businessName":"Müller & Schmidt GmbH (US Operations)","entityType":"Corporation","state":"DE","employeeCount":25}' \
  "German umlauts (Müller)"

echo ""

# ============================================================================
# SCENARIO 3: All 50 States + DC
# Every state should work — real businesses appropriate to each state
# ============================================================================
log "SCENARIO 3: All 50 States + DC Coverage"
sep

call POST "/api/regulis/check" '{"businessName":"Kodiak Fishing Charters","entityType":"LLC","state":"AK","industry":"tourism","employeeCount":5}' "Alaska: Fishing charter"
call POST "/api/regulis/check" '{"businessName":"Birmingham Steel Works","entityType":"Corporation","state":"AL","industry":"manufacturing","employeeCount":80}' "Alabama: Steel manufacturing"
call POST "/api/regulis/check" '{"businessName":"Ozark Natural Foods Co-op","entityType":"Cooperative","state":"AR","industry":"food_service","employeeCount":25}' "Arkansas: Food co-op"
call POST "/api/regulis/check" '{"businessName":"Sedona Wellness Retreat","entityType":"LLC","state":"AZ","industry":"healthcare","employeeCount":15}' "Arizona: Wellness retreat"
call POST "/api/regulis/check" '{"businessName":"Rocky Mountain Ski Lodge","entityType":"LLC","state":"CO","industry":"hospitality","employeeCount":40}' "Colorado: Ski lodge"
call POST "/api/regulis/check" '{"businessName":"Hartford Insurance Solutions","entityType":"Corporation","state":"CT","industry":"insurance","employeeCount":100}' "Connecticut: Insurance"
call POST "/api/regulis/check" '{"businessName":"Capital Consulting Group","entityType":"LLC","state":"DC","industry":"consulting","employeeCount":12}' "DC: Consulting firm"
call POST "/api/regulis/check" '{"businessName":"Dover Chemical Processing","entityType":"Corporation","state":"DE","industry":"chemical","employeeCount":60}' "Delaware: Chemical processing"
call POST "/api/regulis/check" '{"businessName":"Peach State Logistics","entityType":"LLC","state":"GA","industry":"transportation","employeeCount":35}' "Georgia: Logistics"
call POST "/api/regulis/check" '{"businessName":"Aloha Tours Hawaii","entityType":"LLC","state":"HI","industry":"tourism","employeeCount":20}' "Hawaii: Tourism"
call POST "/api/regulis/check" '{"businessName":"Hawkeye Grain Elevator","entityType":"Corporation","state":"IA","industry":"agriculture","employeeCount":15}' "Iowa: Agriculture"
call POST "/api/regulis/check" '{"businessName":"Boise Tech Solutions","entityType":"LLC","state":"ID","industry":"technology","employeeCount":8}' "Idaho: Tech"
call POST "/api/regulis/check" '{"businessName":"Prairie Wind Energy","entityType":"Corporation","state":"IN","industry":"energy","employeeCount":45}' "Indiana: Energy"
call POST "/api/regulis/check" '{"businessName":"Sunflower Veterinary Clinic","entityType":"LLC","state":"KS","industry":"veterinary","employeeCount":10}' "Kansas: Veterinary"
call POST "/api/regulis/check" '{"businessName":"Bourbon Trail Distillery","entityType":"LLC","state":"KY","industry":"alcohol","employeeCount":30}' "Kentucky: Distillery"
call POST "/api/regulis/check" '{"businessName":"Bayou Seafood Restaurant","entityType":"LLC","state":"LA","industry":"food_service","employeeCount":22}' "Louisiana: Restaurant"
call POST "/api/regulis/check" '{"businessName":"Cape Cod Fishing Co","entityType":"Corporation","state":"MA","industry":"fishing","employeeCount":18}' "Massachusetts: Fishing"
call POST "/api/regulis/check" '{"businessName":"Chesapeake Bay Oyster Farm","entityType":"LLC","state":"MD","industry":"aquaculture","employeeCount":12}' "Maryland: Aquaculture"
call POST "/api/regulis/check" '{"businessName":"Portland Craft Brewery","entityType":"LLC","state":"ME","industry":"alcohol","employeeCount":15}' "Maine: Brewery"
call POST "/api/regulis/check" '{"businessName":"Detroit Auto Parts Supplier","entityType":"Corporation","state":"MI","industry":"automotive","employeeCount":200}' "Michigan: Auto parts"
call POST "/api/regulis/check" '{"businessName":"Twin Cities Daycare Center","entityType":"LLC","state":"MN","industry":"childcare","employeeCount":20}' "Minnesota: Childcare"
call POST "/api/regulis/check" '{"businessName":"Kansas City BBQ Joint","entityType":"Sole Proprietorship","state":"MO","industry":"food_service","employeeCount":8}' "Missouri: BBQ restaurant"
call POST "/api/regulis/check" '{"businessName":"Jackson Catfish Farm","entityType":"LLC","state":"MS","industry":"agriculture","employeeCount":10}' "Mississippi: Catfish farm"
call POST "/api/regulis/check" '{"businessName":"Glacier National Park Outfitters","entityType":"LLC","state":"MT","industry":"tourism","employeeCount":6}' "Montana: Outfitter"
call POST "/api/regulis/check" '{"businessName":"Charlotte Fintech Startup","entityType":"Corporation","state":"NC","industry":"financial_services","employeeCount":15}' "North Carolina: Fintech"
call POST "/api/regulis/check" '{"businessName":"Fargo Oil Field Services","entityType":"Corporation","state":"ND","industry":"oil_gas","employeeCount":50}' "North Dakota: Oil field"
call POST "/api/regulis/check" '{"businessName":"Omaha Meatpacking Co","entityType":"Corporation","state":"NE","industry":"food_processing","employeeCount":300}' "Nebraska: Meatpacking"
call POST "/api/regulis/check" '{"businessName":"White Mountain Ski School","entityType":"LLC","state":"NH","industry":"recreation","employeeCount":25}' "New Hampshire: Ski school"
call POST "/api/regulis/check" '{"businessName":"Newark Trucking Dispatch","entityType":"LLC","state":"NJ","industry":"transportation","employeeCount":40}' "New Jersey: Trucking"
call POST "/api/regulis/check" '{"businessName":"Santa Fe Art Gallery","entityType":"Sole Proprietorship","state":"NM","industry":"retail","employeeCount":3}' "New Mexico: Art gallery"
call POST "/api/regulis/check" '{"businessName":"Reno Wedding Chapel","entityType":"LLC","state":"NV","industry":"entertainment","employeeCount":8}' "Nevada: Wedding chapel"
call POST "/api/regulis/check" '{"businessName":"Buffalo Wings Factory","entityType":"Corporation","state":"NY","industry":"food_service","employeeCount":50}' "New York: Restaurant chain"
call POST "/api/regulis/check" '{"businessName":"Cleveland Plumbing Supply","entityType":"LLC","state":"OH","industry":"wholesale","employeeCount":20}' "Ohio: Plumbing supply"
call POST "/api/regulis/check" '{"businessName":"Tulsa Pipeline Inspection","entityType":"Corporation","state":"OK","industry":"oil_gas","employeeCount":35}' "Oklahoma: Pipeline inspection"
call POST "/api/regulis/check" '{"businessName":"Portland Food Cart Pod","entityType":"LLC","state":"OR","industry":"food_service","employeeCount":4}' "Oregon: Food cart"
call POST "/api/regulis/check" '{"businessName":"Philadelphia Law Associates","entityType":"Partnership","state":"PA","industry":"legal","employeeCount":25}' "Pennsylvania: Law firm"
call POST "/api/regulis/check" '{"businessName":"Providence Jewelry Design","entityType":"Sole Proprietorship","state":"RI","industry":"retail","employeeCount":2}' "Rhode Island: Jewelry"
call POST "/api/regulis/check" '{"businessName":"Charleston Property Management","entityType":"LLC","state":"SC","industry":"real_estate","employeeCount":15}' "South Carolina: Property mgmt"
call POST "/api/regulis/check" '{"businessName":"Rapid City RV Park","entityType":"LLC","state":"SD","industry":"hospitality","employeeCount":5}' "South Dakota: RV park"
call POST "/api/regulis/check" '{"businessName":"Nashville Recording Studio","entityType":"LLC","state":"TN","industry":"entertainment","employeeCount":10}' "Tennessee: Recording studio"
call POST "/api/regulis/check" '{"businessName":"Salt Lake City Solar Installer","entityType":"LLC","state":"UT","industry":"energy","employeeCount":30}' "Utah: Solar installer"
call POST "/api/regulis/check" '{"businessName":"Richmond Civil War Tours","entityType":"Sole Proprietorship","state":"VA","industry":"tourism","employeeCount":3}' "Virginia: Tour company"
call POST "/api/regulis/check" '{"businessName":"Burlington Maple Syrup Farm","entityType":"LLC","state":"VT","industry":"agriculture","employeeCount":4}' "Vermont: Maple syrup"
call POST "/api/regulis/check" '{"businessName":"Seattle Cloud Computing Inc","entityType":"Corporation","state":"WA","industry":"technology","employeeCount":150}' "Washington: Cloud computing"
call POST "/api/regulis/check" '{"businessName":"Milwaukee Cheese Factory","entityType":"Corporation","state":"WI","industry":"food_processing","employeeCount":60}' "Wisconsin: Cheese factory"
call POST "/api/regulis/check" '{"businessName":"Charleston Coal Mine Safety","entityType":"Corporation","state":"WV","industry":"mining","employeeCount":100}' "West Virginia: Mining"
call POST "/api/regulis/check" '{"businessName":"Yellowstone Guest Ranch","entityType":"LLC","state":"WY","industry":"hospitality","employeeCount":12}' "Wyoming: Guest ranch"

echo ""

# ============================================================================
# SCENARIO 4: Multi-State Onboarding Complexity
# Real businesses that operate across state lines
# ============================================================================
log "SCENARIO 4: Multi-State Business Onboarding"
sep

call POST "/api/advocis/onboard" \
  "{\"businessName\":\"Amazon Warehouse $RUN_ID\",\"entityType\":\"Corporation\",\"states\":[\"WA\",\"CA\",\"TX\",\"NY\",\"FL\",\"IL\",\"NJ\",\"PA\",\"OH\",\"GA\"],\"industry\":\"logistics\",\"email\":\"ops+$RUN_ID@warehouse-example.com\",\"name\":\"Operations Manager\",\"employeeCount\":5000}" \
  "Onboard: 10-state warehouse operation"

call POST "/api/advocis/onboard" \
  "{\"businessName\":\"Interstate Trucking $RUN_ID\",\"entityType\":\"Corporation\",\"states\":[\"CA\",\"OR\",\"WA\",\"NV\",\"AZ\"],\"industry\":\"transportation\",\"email\":\"dispatch+$RUN_ID@trucking-example.com\",\"name\":\"Fleet Manager\",\"employeeCount\":200}" \
  "Onboard: West coast trucking (5 states)"

call POST "/api/advocis/onboard" \
  "{\"businessName\":\"Tri-State Dental $RUN_ID\",\"entityType\":\"Corporation\",\"states\":[\"NY\",\"NJ\",\"CT\"],\"industry\":\"healthcare\",\"email\":\"admin+$RUN_ID@dental-example.com\",\"name\":\"Dr. Sarah Kim\",\"employeeCount\":35}" \
  "Onboard: Tri-state dental practice"

echo ""

# ============================================================================
# SCENARIO 5: Real Customer Inquiry Patterns
# Questions actual customers would ask
# ============================================================================
log "SCENARIO 5: Realistic Customer Inquiries"
sep

call POST "/api/advocis/inquiry" \
  '{"type":"COMPLIANCE_QUESTION","message":"I just got a notice from the California EDD saying I misclassified my workers as independent contractors. My compliance report said I was fine. What happened?"}' \
  "Inquiry: Worker misclassification dispute"

call POST "/api/advocis/inquiry" \
  '{"type":"COMPLIANCE_QUESTION","message":"We are a medical practice and one of our employees just filed a HIPAA complaint. Our report did not flag this as a risk area. Can you explain what we missed?"}' \
  "Inquiry: HIPAA complaint — gap in report"

call POST "/api/advocis/inquiry" \
  '{"type":"BILLING","message":"I was charged $29 for a single state report but I only wanted the free preview. I did not authorize this charge. Please refund immediately."}' \
  "Inquiry: Disputed charge — refund demand"

call POST "/api/advocis/inquiry" \
  '{"type":"COMPLIANCE_QUESTION","message":"My food truck operates in three counties across two states. Which state do I need a business license in? Both? Do I need county permits too?"}' \
  "Inquiry: Multi-jurisdiction food truck"

call POST "/api/advocis/inquiry" \
  '{"type":"GENERAL","message":"I am starting a home daycare for 6 children. My husband says I do not need a business license. Is that true? What do I actually need to be legal?"}' \
  "Inquiry: Home daycare licensing"

call POST "/api/advocis/inquiry" \
  '{"type":"COMPLIANCE_QUESTION","message":"We are an LLC in California with remote employees in Texas and Florida. Do we need to register as a foreign entity in those states? What are the penalties if we dont?"}' \
  "Inquiry: Foreign entity registration"

call POST "/api/advocis/inquiry" \
  '{"type":"TECHNICAL","message":"The compliance report generated for my business shows rules for restaurants but we are a software company. The industry field seems wrong. How do I regenerate with the correct industry?"}' \
  "Inquiry: Wrong industry in report"

call POST "/api/advocis/inquiry" \
  '{"type":"COMPLIANCE_QUESTION","message":"I am a licensed contractor in California. A client in Nevada wants me to do a job there. Can I just use my California license or do I need a Nevada one too?"}' \
  "Inquiry: Interstate contractor licensing"

call POST "/api/advocis/inquiry" \
  '{"type":"FEEDBACK","message":"Your platform helped me discover that I needed a city business tax certificate that I did not know about. I would have been fined. Thank you. One suggestion: it would be helpful to show deadlines for each requirement."}' \
  "Inquiry: Positive feedback with deadline feature request"

call POST "/api/advocis/inquiry" \
  '{"type":"COMPLIANCE_QUESTION","message":"I am a sole proprietor selling handmade candles on Etsy. Someone told me I need to comply with CPSC labeling requirements and California Prop 65 warnings. Is that real? I only make $500 a month."}' \
  "Inquiry: Small Etsy seller — product safety"

echo ""

# ============================================================================
# SCENARIO 6: Court Forms — Real User Journeys
# People in actual family law situations navigating forms
# ============================================================================
log "SCENARIO 6: Court Forms — Real User Journeys"
sep

# Person filing for divorce
call GET "/api/forms/FL-100" "" "Divorce petitioner: FL-100 Petition"
call GET "/api/forms/FL-110" "" "Divorce petitioner: FL-110 Summons"
call GET "/api/forms/FL-150" "" "Divorce petitioner: FL-150 Income & Expense"
call GET "/api/forms/FW-001" "" "Divorce petitioner: FW-001 Fee Waiver"

# Person responding to divorce
call GET "/api/forms/FL-120" "" "Divorce respondent: FL-120 Response"
call GET "/api/forms/FL-150?lang=es" "" "Divorce respondent: FL-150 en español"

# Person seeking protective order
call GET "/api/forms/DV-100" "" "DV survivor: DV-100 Request"
call GET "/api/forms/DV-109" "" "DV survivor: DV-109 Notice of Hearing"
call GET "/api/forms/DV-110" "" "DV survivor: DV-110 Temporary Order"
call GET "/api/forms/DV-100?lang=tl" "" "DV survivor: DV-100 sa Tagalog"
call GET "/api/forms/DV-100?lang=vi" "" "DV survivor: DV-100 tiếng Việt"

# Person filing custody motion
call GET "/api/forms/FL-300" "" "Custody: FL-300 Request for Order"
call GET "/api/forms/FL-305" "" "Custody: FL-305 Temporary Orders"
call GET "/api/forms/FL-311" "" "Custody: FL-311 Child Custody Info"
call GET "/api/forms/FL-341" "" "Custody: FL-341 Child Custody Order"

# Scenario-based navigation
call GET "/api/forms/scenarios" "" "All scenarios available"

# Non-English speakers navigating forms
call GET "/api/forms/FL-100?lang=ar" "" "Arabic speaker: FL-100"
call GET "/api/forms/FL-300?lang=so" "" "Somali speaker: FL-300"
call GET "/api/forms/DV-100?lang=am" "" "Amharic speaker: DV-100"
call GET "/api/forms/FL-120?lang=ru" "" "Russian speaker: FL-120"
call GET "/api/forms/FL-150?lang=ko" "" "Korean speaker: FL-150"
call GET "/api/forms/FW-001?lang=ht" "" "Haitian Creole speaker: FW-001"
call GET "/api/forms/FL-100?lang=pt" "" "Portuguese speaker: FL-100"
call GET "/api/forms/FL-300?lang=ti" "" "Tigrinya speaker: FL-300"

echo ""

# ============================================================================
# SCENARIO 7: State Comparison — Real Business Decisions
# Businesses deciding where to incorporate or expand
# ============================================================================
log "SCENARIO 7: State Comparison for Business Decisions"
sep

call GET "/api/regulis/compare?state1=CA&state2=TX&entityType=LLC" "" "Compare CA vs TX for LLC"
call GET "/api/regulis/compare?state1=DE&state2=NV&entityType=Corporation" "" "Compare DE vs NV for Corp (incorporation)"
call GET "/api/regulis/compare?state1=FL&state2=NY&entityType=LLC" "" "Compare FL vs NY for LLC"
call GET "/api/regulis/compare?state1=WA&state2=OR&entityType=LLC" "" "Compare WA vs OR for LLC"
call GET "/api/regulis/compare?state1=IL&state2=IN&entityType=Corporation" "" "Compare IL vs IN for Corp"

# State maps for expansion research
call GET "/api/regulis/map/CA" "" "Map: California compliance landscape"
call GET "/api/regulis/map/TX" "" "Map: Texas compliance landscape"
call GET "/api/regulis/map/FL" "" "Map: Florida compliance landscape"
call GET "/api/regulis/map/DE" "" "Map: Delaware (incorporation state)"
call GET "/api/regulis/map/NV" "" "Map: Nevada (incorporation state)"

echo ""

# ============================================================================
# SCENARIO 8: GDN Registry & i18n Deep Dive
# ============================================================================
log "SCENARIO 8: GDN & i18n Depth"
sep

call GET "/api/forms/registry" "" "Full form registry"
call GET "/api/forms/registry?tier=A" "" "Tier A forms only"
call GET "/api/forms/registry?tier=B" "" "Tier B forms only"

# Every language bundle
call GET "/api/i18n/languages" "" "All supported languages"
call GET "/api/i18n/en" "" "English full bundle"
call GET "/api/i18n/es" "" "Spanish full bundle"
call GET "/api/i18n/zh" "" "Chinese full bundle"
call GET "/api/i18n/vi" "" "Vietnamese full bundle"
call GET "/api/i18n/ko" "" "Korean full bundle"
call GET "/api/i18n/ar" "" "Arabic full bundle"
call GET "/api/i18n/tl" "" "Tagalog full bundle"
call GET "/api/i18n/ru" "" "Russian full bundle"
call GET "/api/i18n/pt" "" "Portuguese full bundle"
call GET "/api/i18n/ht" "" "Haitian Creole full bundle"
call GET "/api/i18n/so" "" "Somali full bundle"
call GET "/api/i18n/ti" "" "Tigrinya full bundle"
call GET "/api/i18n/am" "" "Amharic full bundle"

echo ""

# ============================================================================
# RESULTS
# ============================================================================
sep
echo ""
log "ADVERSARIAL SIMULATION COMPLETE"
echo ""
echo -e "  ${GREEN}Passed:${NC}  $PASS"
echo -e "  ${RED}Failed:${NC}  $FAIL"
echo -e "  Total:   $TOTAL"
echo ""
if [ "$FAIL" -eq 0 ]; then
  echo -e "  ${GREEN}Success Rate: 100%${NC}"
else
  echo -e "  ${RED}Success Rate: $(( PASS * 100 / TOTAL ))%${NC}"
fi
echo ""
sep
echo -e "${CYAN}  Finished: $(date)${NC}"
sep
echo ""

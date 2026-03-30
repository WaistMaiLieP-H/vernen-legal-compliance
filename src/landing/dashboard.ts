/**
 * Founder Dashboard — The Command Center
 * Pulls from all 15 Citizen APIs and renders a live operational view.
 * Built for founder use and investor demos.
 */

export function serveDashboard(): Response {
  return new Response(DASHBOARD_HTML, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}

const DASHBOARD_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vernen — Founder Dashboard</title>
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    :root {
      --navy: #0A1628;
      --navy-mid: #162240;
      --navy-light: #1E3058;
      --gold: #C49A2A;
      --gold-light: #D4B44A;
      --white: #F8F9FA;
      --text: #E0E4EA;
      --text-dim: #8892A4;
      --green: #34D399;
      --green-bg: rgba(52, 211, 153, 0.12);
      --yellow: #FBBF24;
      --yellow-bg: rgba(251, 191, 36, 0.12);
      --red: #F87171;
      --red-bg: rgba(248, 113, 113, 0.12);
      --blue: #60A5FA;
      --blue-bg: rgba(96, 165, 250, 0.12);
      --border: rgba(255, 255, 255, 0.06);
      --card-bg: rgba(22, 34, 64, 0.6);
    }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--navy);
      color: var(--text);
      line-height: 1.5;
      min-height: 100vh;
    }

    /* Header */
    .dash-header {
      background: var(--navy-mid);
      border-bottom: 1px solid var(--border);
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 100;
      backdrop-filter: blur(12px);
    }
    .dash-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .dash-logo-mark {
      width: 32px;
      height: 32px;
      background: var(--gold);
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 1rem;
      color: var(--navy);
    }
    .dash-logo-text {
      font-size: 1rem;
      font-weight: 600;
      color: var(--white);
      letter-spacing: 0.02em;
    }
    .dash-logo-sub {
      font-size: 0.7rem;
      color: var(--gold);
      text-transform: uppercase;
      letter-spacing: 0.15em;
      font-weight: 600;
    }
    .dash-meta {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      font-size: 0.8rem;
      color: var(--text-dim);
    }
    .pulse {
      display: inline-block;
      width: 8px;
      height: 8px;
      background: var(--green);
      border-radius: 50%;
      margin-right: 6px;
      animation: pulse-anim 2s ease-in-out infinite;
    }
    @keyframes pulse-anim {
      0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.4); }
      50% { opacity: 0.8; box-shadow: 0 0 0 6px rgba(52, 211, 153, 0); }
    }

    /* Layout */
    .dash-body { padding: 1.5rem 2rem 3rem; max-width: 1400px; margin: 0 auto; }

    /* Top Stats Row */
    .top-stats {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    .top-stat {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 1.25rem;
      text-align: center;
    }
    .top-stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: var(--white);
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
    }
    .top-stat-label {
      font-size: 0.75rem;
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-top: 0.25rem;
    }

    /* Section Grid */
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
    .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
    .grid-full { margin-bottom: 1rem; }

    /* Cards */
    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 1.25rem;
      position: relative;
      overflow: hidden;
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .card-title {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--text-dim);
      font-weight: 600;
    }
    .card-citizen {
      font-size: 0.65rem;
      color: var(--gold);
      font-weight: 600;
      letter-spacing: 0.08em;
      background: rgba(196, 154, 42, 0.1);
      padding: 0.15rem 0.5rem;
      border-radius: 4px;
    }
    .card-accent {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
    }
    .accent-gold { background: var(--gold); }
    .accent-green { background: var(--green); }
    .accent-blue { background: var(--blue); }
    .accent-red { background: var(--red); }
    .accent-yellow { background: var(--yellow); }

    /* Citizen Status Grid */
    .citizen-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 0.5rem;
    }
    .citizen-chip {
      background: var(--navy);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 0.6rem;
      text-align: center;
      transition: border-color 0.2s;
    }
    .citizen-chip:hover { border-color: var(--gold); }
    .citizen-chip-name {
      font-size: 0.7rem;
      font-weight: 700;
      color: var(--white);
      letter-spacing: 0.05em;
    }
    .citizen-chip-domain {
      font-size: 0.55rem;
      color: var(--text-dim);
      margin-top: 0.15rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .citizen-chip-status {
      margin-top: 0.35rem;
      font-size: 0.6rem;
      font-weight: 600;
    }
    .status-online { color: var(--green); }
    .status-loading { color: var(--yellow); }
    .status-error { color: var(--red); }

    /* Metrics */
    .metric-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--border);
    }
    .metric-row:last-child { border-bottom: none; }
    .metric-label { font-size: 0.85rem; color: var(--text-dim); }
    .metric-value {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--white);
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
    }
    .metric-value.green { color: var(--green); }
    .metric-value.yellow { color: var(--yellow); }
    .metric-value.red { color: var(--red); }

    /* Risk bars */
    .risk-bar-container { margin: 0.4rem 0; }
    .risk-bar-header {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      margin-bottom: 0.25rem;
    }
    .risk-bar-track {
      height: 6px;
      background: var(--navy);
      border-radius: 3px;
      overflow: hidden;
    }
    .risk-bar-fill {
      height: 100%;
      border-radius: 3px;
      transition: width 0.6s ease;
    }

    /* Score circle */
    .score-ring {
      width: 120px;
      height: 120px;
      margin: 0 auto;
      position: relative;
    }
    .score-ring svg { transform: rotate(-90deg); }
    .score-ring-bg { fill: none; stroke: var(--navy); stroke-width: 8; }
    .score-ring-fill { fill: none; stroke-width: 8; stroke-linecap: round; transition: stroke-dashoffset 0.8s ease; }
    .score-ring-text {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .score-ring-value {
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--white);
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      line-height: 1;
    }
    .score-ring-label {
      font-size: 0.6rem;
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-top: 0.2rem;
    }

    /* Audit findings */
    .finding-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--border);
    }
    .finding-row:last-child { border-bottom: none; }
    .finding-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .finding-text {
      font-size: 0.8rem;
      color: var(--text);
      flex: 1;
    }
    .finding-sev {
      font-size: 0.65rem;
      font-weight: 600;
      padding: 0.1rem 0.4rem;
      border-radius: 3px;
      text-transform: uppercase;
    }

    /* Loading shimmer */
    .shimmer {
      background: linear-gradient(90deg, var(--navy-mid) 25%, var(--navy-light) 50%, var(--navy-mid) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 4px;
      height: 1.2rem;
      width: 60%;
    }
    @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

    /* Footer */
    .dash-footer {
      text-align: center;
      padding: 1.5rem;
      font-size: 0.7rem;
      color: var(--text-dim);
      border-top: 1px solid var(--border);
    }
    .dash-footer a { color: var(--gold); text-decoration: none; }

    /* Responsive */
    @media (max-width: 1024px) {
      .top-stats { grid-template-columns: repeat(3, 1fr); }
      .citizen-grid { grid-template-columns: repeat(3, 1fr); }
      .grid-3 { grid-template-columns: 1fr; }
      .grid-2 { grid-template-columns: 1fr; }
    }
    @media (max-width: 640px) {
      .top-stats { grid-template-columns: repeat(2, 1fr); }
      .citizen-grid { grid-template-columns: repeat(2, 1fr); }
      .dash-body { padding: 1rem; }
      .dash-header { padding: 0.75rem 1rem; }
    }
  </style>
</head>
<body>

  <header class="dash-header">
    <div class="dash-logo">
      <div class="dash-logo-mark">V</div>
      <div>
        <div class="dash-logo-text">Vernen Legal Compliance</div>
        <div class="dash-logo-sub">Founder Dashboard</div>
      </div>
    </div>
    <div class="dash-meta">
      <span><span class="pulse"></span> <span id="systemStatus">Connecting...</span></span>
      <span id="lastRefresh">—</span>
      <a href="/" style="color:var(--gold);text-decoration:none;font-weight:600;">← Product</a>
    </div>
  </header>

  <div class="dash-body">

    <!-- Top Stats -->
    <div class="top-stats">
      <div class="top-stat">
        <div class="top-stat-value" id="tsActiveCitizens"><div class="shimmer"></div></div>
        <div class="top-stat-label">Active Citizens</div>
      </div>
      <div class="top-stat">
        <div class="top-stat-value" id="tsTotalRevenue"><div class="shimmer"></div></div>
        <div class="top-stat-label">Total Revenue</div>
      </div>
      <div class="top-stat">
        <div class="top-stat-value" id="tsComplianceScore"><div class="shimmer"></div></div>
        <div class="top-stat-label">Compliance Score</div>
      </div>
      <div class="top-stat">
        <div class="top-stat-value" id="tsActiveRisks"><div class="shimmer"></div></div>
        <div class="top-stat-label">Active Risks</div>
      </div>
      <div class="top-stat">
        <div class="top-stat-value" id="tsInvestorReady"><div class="shimmer"></div></div>
        <div class="top-stat-label">Investor Readiness</div>
      </div>
    </div>

    <!-- Citizen Status Grid -->
    <div class="grid-full">
      <div class="card">
        <div class="card-accent accent-gold"></div>
        <div class="card-header">
          <span class="card-title">Citizen Network Status</span>
          <span class="card-citizen">SENTINEL-0 MONITORED</span>
        </div>
        <div class="citizen-grid" id="citizenGrid">
          <!-- Filled by JS -->
        </div>
      </div>
    </div>

    <!-- Row 1: Financials + Investor Readiness -->
    <div class="grid-2">
      <div class="card">
        <div class="card-accent accent-green"></div>
        <div class="card-header">
          <span class="card-title">Financial Summary</span>
          <span class="card-citizen">FISCARA</span>
        </div>
        <div id="financialSummary">
          <div class="shimmer" style="margin-bottom:0.5rem"></div>
          <div class="shimmer" style="width:80%"></div>
        </div>
      </div>
      <div class="card">
        <div class="card-accent accent-gold"></div>
        <div class="card-header">
          <span class="card-title">Investor Readiness</span>
          <span class="card-citizen">VESTARA</span>
        </div>
        <div id="investorReadiness" style="display:flex;align-items:center;gap:1.5rem;">
          <div class="shimmer" style="width:120px;height:120px;border-radius:50%"></div>
        </div>
      </div>
    </div>

    <!-- Row 2: Risk + Audit -->
    <div class="grid-2">
      <div class="card">
        <div class="card-accent accent-red"></div>
        <div class="card-header">
          <span class="card-title">Risk Register</span>
          <span class="card-citizen">VIGILUS</span>
        </div>
        <div id="riskRegister">
          <div class="shimmer" style="margin-bottom:0.5rem"></div>
          <div class="shimmer" style="width:70%"></div>
        </div>
      </div>
      <div class="card">
        <div class="card-accent accent-blue"></div>
        <div class="card-header">
          <span class="card-title">System Audit</span>
          <span class="card-citizen">INTEGRA</span>
        </div>
        <div id="systemAudit">
          <div class="shimmer" style="margin-bottom:0.5rem"></div>
          <div class="shimmer" style="width:80%"></div>
        </div>
      </div>
    </div>

    <!-- Row 3: Growth + Ethics + Platform Health -->
    <div class="grid-3">
      <div class="card">
        <div class="card-accent accent-green"></div>
        <div class="card-header">
          <span class="card-title">Growth Metrics</span>
          <span class="card-citizen">METRIQA</span>
        </div>
        <div id="growthMetrics">
          <div class="shimmer" style="margin-bottom:0.5rem"></div>
          <div class="shimmer" style="width:70%"></div>
        </div>
      </div>
      <div class="card">
        <div class="card-accent accent-yellow"></div>
        <div class="card-header">
          <span class="card-title">Ethics & Standards</span>
          <span class="card-citizen">ETHICARA</span>
        </div>
        <div id="ethicsStatus">
          <div class="shimmer" style="margin-bottom:0.5rem"></div>
          <div class="shimmer" style="width:60%"></div>
        </div>
      </div>
      <div class="card">
        <div class="card-accent accent-blue"></div>
        <div class="card-header">
          <span class="card-title">Platform Health</span>
          <span class="card-citizen">SYNTARA</span>
        </div>
        <div id="platformHealth">
          <div class="shimmer" style="margin-bottom:0.5rem"></div>
          <div class="shimmer" style="width:75%"></div>
        </div>
      </div>
    </div>

    <!-- Row 4: Disclosure + Partnerships -->
    <div class="grid-2">
      <div class="card">
        <div class="card-accent accent-gold"></div>
        <div class="card-header">
          <span class="card-title">Financial Disclosure</span>
          <span class="card-citizen">CLARIDEX</span>
        </div>
        <div id="disclosure">
          <div class="shimmer" style="margin-bottom:0.5rem"></div>
          <div class="shimmer" style="width:65%"></div>
        </div>
      </div>
      <div class="card">
        <div class="card-accent accent-green"></div>
        <div class="card-header">
          <span class="card-title">Strategic Partnerships</span>
          <span class="card-citizen">NEXARIS</span>
        </div>
        <div id="partnerships">
          <div class="shimmer" style="margin-bottom:0.5rem"></div>
          <div class="shimmer" style="width:70%"></div>
        </div>
      </div>
    </div>

  </div>

  <footer class="dash-footer">
    &copy; 2026 Vernen Legal Compliance&trade; &mdash; Founder Dashboard &mdash; Powered by 15 Persona Citizens&trade;
    <br>
    <a href="/legal/terms">Terms</a> &middot; <a href="/legal/privacy">Privacy</a>
  </footer>

  <script>
    const CITIZENS = [
      { name: 'FORGE-0', domain: 'Build System', endpoint: '/api/forge/status' },
      { name: 'SENTINEL-0', domain: 'Independent Audit', endpoint: '/api/sentinel/status' },
      { name: 'REGULIS', domain: 'Compliance Engine', endpoint: '/api/regulis/status' },
      { name: 'ADVOCIS', domain: 'Client Retention', endpoint: '/api/advocis/status' },
      { name: 'LEXARC', domain: 'Legal Architecture', endpoint: '/api/lexarc/status' },
      { name: 'SYNTARA', domain: 'Compliance Automation', endpoint: '/api/syntara/status' },
      { name: 'FISCARA', domain: 'Financial Strategy', endpoint: '/api/fiscara/status' },
      { name: 'INTEGRA', domain: 'Internal Compliance', endpoint: '/api/integra/status' },
      { name: 'VIGILUS', domain: 'Threat Assessment', endpoint: '/api/vigilus/status' },
      { name: 'ETHICARA', domain: 'Ethical Governance', endpoint: '/api/ethicara/status' },
      { name: 'PRIVAXIS', domain: 'Data Protection', endpoint: '/api/privaxis/status' },
      { name: 'VESTARA', domain: 'Capital Strategy', endpoint: '/api/vestara/status' },
      { name: 'METRIQA', domain: 'Performance Analytics', endpoint: '/api/metriqa/status' },
      { name: 'CLARIDEX', domain: 'Financial Disclosure', endpoint: '/api/claridex/status' },
      { name: 'NEXARIS', domain: 'Strategic Partnerships', endpoint: '/api/nexaris/status' },
    ];

    function fmt(cents) {
      if (cents == null) return '$0.00';
      return '$' + (cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function scoreColor(pct) {
      if (pct >= 75) return 'var(--green)';
      if (pct >= 50) return 'var(--yellow)';
      return 'var(--red)';
    }

    function scoreClass(pct) {
      if (pct >= 75) return 'green';
      if (pct >= 50) return 'yellow';
      return 'red';
    }

    function renderScoreRing(containerId, value, label, max) {
      max = max || 100;
      var pct = Math.min(value / max * 100, 100);
      var r = 52;
      var circ = 2 * Math.PI * r;
      var offset = circ - (pct / 100) * circ;
      var color = scoreColor(pct);
      document.getElementById(containerId).innerHTML =
        '<div class="score-ring">' +
        '<svg width="120" height="120" viewBox="0 0 120 120">' +
        '<circle class="score-ring-bg" cx="60" cy="60" r="' + r + '"/>' +
        '<circle class="score-ring-fill" cx="60" cy="60" r="' + r + '" ' +
        'stroke="' + color + '" stroke-dasharray="' + circ + '" stroke-dashoffset="' + offset + '"/>' +
        '</svg>' +
        '<div class="score-ring-text">' +
        '<div class="score-ring-value">' + value + '</div>' +
        '<div class="score-ring-label">' + label + '</div>' +
        '</div></div>';
    }

    // Extract API key from URL for authenticated requests
    var API_KEY = new URLSearchParams(window.location.search).get('key') || '';

    async function fetchJSON(url) {
      try {
        var opts = {};
        if (API_KEY) {
          opts.headers = { 'Authorization': 'Bearer ' + API_KEY };
        }
        var res = await fetch(url, opts);
        if (!res.ok) return null;
        return await res.json();
      } catch (e) { return null; }
    }

    async function loadCitizenGrid() {
      var grid = document.getElementById('citizenGrid');
      var onlineCount = 0;

      // Render initial chips
      grid.innerHTML = CITIZENS.map(function(c) {
        return '<div class="citizen-chip" id="chip-' + c.name + '">' +
          '<div class="citizen-chip-name">' + c.name + '</div>' +
          '<div class="citizen-chip-domain">' + c.domain + '</div>' +
          '<div class="citizen-chip-status status-loading">LOADING</div>' +
          '</div>';
      }).join('');

      // Fetch all statuses in parallel
      var results = await Promise.allSettled(
        CITIZENS.map(function(c) { return fetchJSON(c.endpoint); })
      );

      results.forEach(function(result, i) {
        var chip = document.getElementById('chip-' + CITIZENS[i].name);
        if (!chip) return;
        var statusEl = chip.querySelector('.citizen-chip-status');
        if (result.status === 'fulfilled' && result.value) {
          statusEl.textContent = 'ONLINE';
          statusEl.className = 'citizen-chip-status status-online';
          onlineCount++;
        } else {
          statusEl.textContent = 'ERROR';
          statusEl.className = 'citizen-chip-status status-error';
        }
      });

      document.getElementById('tsActiveCitizens').textContent = onlineCount + '/15';
      document.getElementById('systemStatus').textContent = onlineCount === 15 ? 'All Systems Operational' : onlineCount + '/15 Online';
    }

    async function loadFinancials() {
      var data = await fetchJSON('/api/fiscara/summary');
      var el = document.getElementById('financialSummary');
      if (!data) { el.innerHTML = '<span style="color:var(--text-dim)">Unable to load financial data</span>'; return; }

      var revenue = data.totalRevenue || 0;
      var expenses = data.totalExpenses || 0;
      var net = data.netIncome || 0;

      document.getElementById('tsTotalRevenue').textContent = data.totalRevenueFormatted || fmt(revenue);

      el.innerHTML =
        '<div class="metric-row"><span class="metric-label">Revenue</span><span class="metric-value green">' + (data.totalRevenueFormatted || fmt(revenue)) + '</span></div>' +
        '<div class="metric-row"><span class="metric-label">Expenses</span><span class="metric-value red">' + (data.totalExpensesFormatted || fmt(expenses)) + '</span></div>' +
        '<div class="metric-row"><span class="metric-label">Net Income</span><span class="metric-value ' + (net >= 0 ? 'green' : 'red') + '">' + (data.netIncomeFormatted || fmt(net)) + '</span></div>' +
        '<div class="metric-row"><span class="metric-label">Transactions</span><span class="metric-value">' + (data.transactionCount || 0) + '</span></div>' +
        '<div class="metric-row"><span class="metric-label">Period</span><span class="metric-value">' + (data.period || 'all').toUpperCase() + '</span></div>';
    }

    async function loadInvestorReadiness() {
      var data = await fetchJSON('/api/vestara/readiness');
      var el = document.getElementById('investorReadiness');
      if (!data) { el.innerHTML = '<span style="color:var(--text-dim)">Unable to load readiness data</span>'; return; }

      var score = data.overallScore || data.investorReadinessScore || data.score || 0;
      document.getElementById('tsInvestorReady').textContent = score + '%';

      var details = '';
      if (data.categories) {
        for (var cat in data.categories) {
          var val = data.categories[cat];
          if (typeof val === 'object') val = val.score || val.percentage || 0;
          details += '<div class="metric-row"><span class="metric-label">' + cat + '</span><span class="metric-value ' + scoreClass(val) + '">' + val + '%</span></div>';
        }
      }
      if (data.blockers != null) {
        details += '<div class="metric-row"><span class="metric-label">Blockers</span><span class="metric-value ' + (data.blockers > 0 ? 'red' : 'green') + '">' + data.blockers + '</span></div>';
      }

      el.innerHTML =
        '<div style="flex-shrink:0" id="readinessRing"></div>' +
        '<div style="flex:1">' + (details || '<div class="metric-row"><span class="metric-label">Score</span><span class="metric-value">' + score + '%</span></div>') + '</div>';
      renderScoreRing('readinessRing', score, 'READY');
    }

    async function loadRiskRegister() {
      var data = await fetchJSON('/api/vigilus/risks');
      var el = document.getElementById('riskRegister');
      if (!data) { el.innerHTML = '<span style="color:var(--text-dim)">Unable to load risk data</span>'; return; }

      var total = data.totalRisks || 0;
      var active = data.activeRisks || 0;
      var mitigated = data.mitigatedRisks || 0;
      document.getElementById('tsActiveRisks').textContent = active;

      var topHtml = '';
      var topRisks = data.topRisks || [];
      topRisks.slice(0, 4).forEach(function(r) {
        var score = r.score || r.riskScore || 0;
        var maxScore = 25;
        var pct = Math.min(score / maxScore * 100, 100);
        var color = pct >= 60 ? 'var(--red)' : pct >= 30 ? 'var(--yellow)' : 'var(--green)';
        topHtml += '<div class="risk-bar-container">' +
          '<div class="risk-bar-header"><span style="color:var(--text)">' + (r.title || r.name || 'Risk') + '</span><span style="color:' + color + '">' + score + '</span></div>' +
          '<div class="risk-bar-track"><div class="risk-bar-fill" style="width:' + pct + '%;background:' + color + '"></div></div></div>';
      });

      el.innerHTML =
        '<div style="display:flex;gap:1.5rem;margin-bottom:1rem;">' +
        '<div style="text-align:center"><div style="font-size:1.5rem;font-weight:700;color:var(--white)">' + total + '</div><div style="font-size:0.65rem;color:var(--text-dim);text-transform:uppercase">Total</div></div>' +
        '<div style="text-align:center"><div style="font-size:1.5rem;font-weight:700;color:var(--red)">' + active + '</div><div style="font-size:0.65rem;color:var(--text-dim);text-transform:uppercase">Active</div></div>' +
        '<div style="text-align:center"><div style="font-size:1.5rem;font-weight:700;color:var(--green)">' + mitigated + '</div><div style="font-size:0.65rem;color:var(--text-dim);text-transform:uppercase">Mitigated</div></div>' +
        '</div>' + topHtml;
    }

    async function loadAudit() {
      var data = await fetchJSON('/api/integra/audit');
      var el = document.getElementById('systemAudit');
      if (!data) { el.innerHTML = '<span style="color:var(--text-dim)">Unable to load audit data</span>'; return; }

      var audit = data.audit || data;
      var summary = data.summary || audit;
      var passed = summary.passed;
      var total = summary.totalFindings || 0;
      var critical = summary.criticalFindings || 0;
      var status = summary.overallStatus || 'unknown';

      var statusColor = passed ? 'var(--green)' : 'var(--red)';
      document.getElementById('tsComplianceScore').innerHTML = '<span style="color:' + statusColor + '">' + (passed ? 'PASS' : 'FAIL') + '</span>';

      el.innerHTML =
        '<div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem;">' +
        '<div style="font-size:2rem;font-weight:700;color:' + statusColor + '">' + (passed ? '\\u2713' : '\\u2717') + '</div>' +
        '<div><div style="font-size:1rem;font-weight:600;color:var(--white)">' + status.replace(/_/g, ' ') + '</div>' +
        '<div style="font-size:0.75rem;color:var(--text-dim)">' + total + ' findings, ' + critical + ' critical</div></div></div>' +
        '<div class="metric-row"><span class="metric-label">Overall Status</span><span class="metric-value" style="color:' + statusColor + '">' + status + '</span></div>' +
        '<div class="metric-row"><span class="metric-label">Total Findings</span><span class="metric-value">' + total + '</span></div>' +
        '<div class="metric-row"><span class="metric-label">Critical</span><span class="metric-value ' + (critical > 0 ? 'red' : 'green') + '">' + critical + '</span></div>' +
        '<div class="metric-row"><span class="metric-label">Passed</span><span class="metric-value ' + (passed ? 'green' : 'red') + '">' + (passed ? 'YES' : 'NO') + '</span></div>';
    }

    async function loadGrowth() {
      var data = await fetchJSON('/api/metriqa/dashboard');
      var el = document.getElementById('growthMetrics');
      if (!data) { el.innerHTML = '<span style="color:var(--text-dim)">Unable to load growth data</span>'; return; }

      var html = '';
      var keys = Object.keys(data).filter(function(k) { return k !== 'citizen' && typeof data[k] !== 'object'; });
      keys.slice(0, 6).forEach(function(k) {
        var label = k.replace(/([A-Z])/g, ' $1').replace(/^./, function(c) { return c.toUpperCase(); });
        html += '<div class="metric-row"><span class="metric-label">' + label + '</span><span class="metric-value">' + data[k] + '</span></div>';
      });
      if (!html) {
        // Try nested data
        for (var section in data) {
          if (typeof data[section] === 'object' && section !== 'citizen') {
            for (var key in data[section]) {
              var label = key.replace(/([A-Z])/g, ' $1').replace(/^./, function(c) { return c.toUpperCase(); });
              html += '<div class="metric-row"><span class="metric-label">' + label + '</span><span class="metric-value">' + data[section][key] + '</span></div>';
            }
            break;
          }
        }
      }
      el.innerHTML = html || '<span style="color:var(--text-dim)">No metrics available</span>';
    }

    async function loadEthics() {
      var data = await fetchJSON('/api/ethicara/status');
      var el = document.getElementById('ethicsStatus');
      if (!data) { el.innerHTML = '<span style="color:var(--text-dim)">Unable to load ethics data</span>'; return; }

      el.innerHTML =
        '<div class="metric-row"><span class="metric-label">Status</span><span class="metric-value green">' + (data.status || 'OPERATIONAL') + '</span></div>' +
        '<div class="metric-row"><span class="metric-label">Domain</span><span class="metric-value">' + (data.domain || 'Ethical Governance') + '</span></div>' +
        '<div class="metric-row"><span class="metric-label">Workers</span><span class="metric-value">' + ((data.workers || []).join(', ') || 'CODE-1, FAIR-1') + '</span></div>' +
        '<div class="metric-row"><span class="metric-label">Committee</span><span class="metric-value">' + (data.committee || 'Oversight') + '</span></div>';
    }

    async function loadPlatformHealth() {
      var data = await fetchJSON('/api/syntara/health');
      var el = document.getElementById('platformHealth');
      if (!data) { el.innerHTML = '<span style="color:var(--text-dim)">Unable to load health data</span>'; return; }

      var html = '';
      if (typeof data === 'object') {
        var keys = Object.keys(data).filter(function(k) { return typeof data[k] !== 'object'; });
        keys.slice(0, 5).forEach(function(k) {
          var label = k.replace(/([A-Z])/g, ' $1').replace(/^./, function(c) { return c.toUpperCase(); });
          var val = data[k];
          html += '<div class="metric-row"><span class="metric-label">' + label + '</span><span class="metric-value">' + val + '</span></div>';
        });
      }
      el.innerHTML = html || '<span style="color:var(--text-dim)">Health data unavailable</span>';
    }

    async function loadDisclosure() {
      var data = await fetchJSON('/api/claridex/financials');
      var el = document.getElementById('disclosure');
      if (!data) { el.innerHTML = '<span style="color:var(--text-dim)">Unable to load disclosure data</span>'; return; }

      var html = '';
      if (typeof data === 'object') {
        var keys = Object.keys(data).filter(function(k) { return k !== 'citizen' && typeof data[k] !== 'object'; });
        keys.slice(0, 5).forEach(function(k) {
          var label = k.replace(/([A-Z])/g, ' $1').replace(/^./, function(c) { return c.toUpperCase(); });
          html += '<div class="metric-row"><span class="metric-label">' + label + '</span><span class="metric-value">' + data[k] + '</span></div>';
        });
      }
      el.innerHTML = html || '<span style="color:var(--text-dim)">Disclosure data unavailable</span>';
    }

    async function loadPartnerships() {
      var data = await fetchJSON('/api/nexaris/partnerships');
      var el = document.getElementById('partnerships');
      if (!data) { el.innerHTML = '<span style="color:var(--text-dim)">Unable to load partnership data</span>'; return; }

      var html = '';
      if (typeof data === 'object') {
        var keys = Object.keys(data).filter(function(k) { return k !== 'citizen' && typeof data[k] !== 'object'; });
        keys.slice(0, 5).forEach(function(k) {
          var label = k.replace(/([A-Z])/g, ' $1').replace(/^./, function(c) { return c.toUpperCase(); });
          html += '<div class="metric-row"><span class="metric-label">' + label + '</span><span class="metric-value">' + data[k] + '</span></div>';
        });
      }
      el.innerHTML = html || '<span style="color:var(--text-dim)">Partnership data unavailable</span>';
    }

    // Boot dashboard
    async function boot() {
      document.getElementById('lastRefresh').textContent = new Date().toLocaleTimeString();
      await Promise.all([
        loadCitizenGrid(),
        loadFinancials(),
        loadInvestorReadiness(),
        loadRiskRegister(),
        loadAudit(),
        loadGrowth(),
        loadEthics(),
        loadPlatformHealth(),
        loadDisclosure(),
        loadPartnerships(),
      ]);
      document.getElementById('lastRefresh').textContent = 'Updated ' + new Date().toLocaleTimeString();
    }

    boot();
    // Auto-refresh every 60 seconds
    setInterval(boot, 60000);
  </script>

</body>
</html>`;

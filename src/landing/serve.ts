/**
 * Product page for Vernen Legal Compliance.
 * Full customer-facing frontend with compliance checking,
 * state comparison, pricing, and Stripe checkout.
 */

const STATES: [string, string][] = [
  ["AL","Alabama"],["AK","Alaska"],["AZ","Arizona"],["AR","Arkansas"],["CA","California"],
  ["CO","Colorado"],["CT","Connecticut"],["DE","Delaware"],["DC","District of Columbia"],
  ["FL","Florida"],["GA","Georgia"],["HI","Hawaii"],["ID","Idaho"],["IL","Illinois"],
  ["IN","Indiana"],["IA","Iowa"],["KS","Kansas"],["KY","Kentucky"],["LA","Louisiana"],
  ["ME","Maine"],["MD","Maryland"],["MA","Massachusetts"],["MI","Michigan"],["MN","Minnesota"],
  ["MS","Mississippi"],["MO","Missouri"],["MT","Montana"],["NE","Nebraska"],["NV","Nevada"],
  ["NH","New Hampshire"],["NJ","New Jersey"],["NM","New Mexico"],["NY","New York"],
  ["NC","North Carolina"],["ND","North Dakota"],["OH","Ohio"],["OK","Oklahoma"],["OR","Oregon"],
  ["PA","Pennsylvania"],["RI","Rhode Island"],["SC","South Carolina"],["SD","South Dakota"],
  ["TN","Tennessee"],["TX","Texas"],["UT","Utah"],["VT","Vermont"],["VA","Virginia"],
  ["WA","Washington"],["WV","West Virginia"],["WI","Wisconsin"],["WY","Wyoming"],
];

const stateOptions = STATES.map(([code, name]) => `<option value="${code}">${name}</option>`).join("");

const LANDING_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Instant business compliance scanning across all 50 states. Check federal and state requirements for LLCs, corporations, sole proprietors, partnerships, and nonprofits. 336 rules. Free preview.">
  <meta name="keywords" content="business compliance, state compliance check, LLC compliance, corporation compliance, regulatory compliance, 50 state compliance, federal compliance, business license, compliance audit, compliance scanning">
  <link rel="canonical" href="https://compliance.vernenlegal.com/">
  <meta name="robots" content="index, follow">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://compliance.vernenlegal.com/">
  <meta property="og:title" content="Business Compliance Scanning — All 50 States | Vernen Legal Compliance">
  <meta property="og:description" content="Instant federal and state compliance scanning for LLCs, corporations, sole proprietors, partnerships, and nonprofits. 336 rules. Free preview available.">
  <meta property="og:site_name" content="Vernen Legal Compliance">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Business Compliance Scanning — All 50 States">
  <meta name="twitter:description" content="Instant compliance scanning for any business entity type across all 50 states + DC. Free preview.">

  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Vernen Legal Compliance",
    "url": "https://compliance.vernenlegal.com",
    "description": "Instant business compliance scanning across all 50 states for LLCs, corporations, sole proprietors, partnerships, and nonprofits.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": [
      { "@type": "Offer", "name": "Free Preview", "price": "0", "priceCurrency": "USD" },
      { "@type": "Offer", "name": "Single State Report", "price": "29", "priceCurrency": "USD" },
      { "@type": "Offer", "name": "Multi-State Package", "price": "149", "priceCurrency": "USD" },
      { "@type": "Offer", "name": "Full 50-State Scan", "price": "499", "priceCurrency": "USD" }
    ],
    "provider": {
      "@type": "Organization",
      "name": "Vernen Legal Compliance",
      "url": "https://compliance.vernenlegal.com"
    }
  }
  </script>

  <title>Business Compliance Scanning — All 50 States | Vernen Legal Compliance</title>
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    :root {
      --navy: #1a2744;
      --navy-light: #243455;
      --gold: #c8a951;
      --gold-light: #d4bc74;
      --white: #ffffff;
      --light-gray: #f5f5f5;
      --mid-gray: #e0e0e0;
      --text: #333333;
      --text-light: #666666;
      --green: #2e7d32;
      --yellow: #f57f17;
      --red: #c62828;
    }
    html { scroll-behavior: smooth; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: var(--text); line-height: 1.6; }
    a { color: var(--gold); text-decoration: none; }
    a:hover { color: var(--gold-light); }

    /* Header */
    .header { background: var(--navy); padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 100; }
    .logo { display: flex; align-items: center; gap: 0.75rem; }
    .logo-mark { width: 36px; height: 36px; background: var(--gold); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.2rem; color: var(--navy); }
    .logo-text { color: var(--white); font-size: 1.1rem; font-weight: 600; }
    .nav { display: flex; gap: 1.5rem; align-items: center; }
    .nav a { color: var(--white); font-size: 0.9rem; opacity: 0.85; transition: opacity 0.2s; }
    .nav a:hover { opacity: 1; color: var(--gold); }

    /* Hero */
    .hero { background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%); color: var(--white); padding: 5rem 2rem; text-align: center; }
    .hero h1 { font-size: 2.8rem; font-weight: 700; margin-bottom: 1rem; line-height: 1.2; }
    .hero p { font-size: 1.2rem; opacity: 0.85; max-width: 700px; margin: 0 auto 2rem; }
    .hero-ctas { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
    .btn { display: inline-block; padding: 0.85rem 2rem; border-radius: 6px; font-weight: 600; font-size: 1rem; cursor: pointer; border: none; transition: all 0.2s; }
    .btn-gold { background: var(--gold); color: var(--navy); }
    .btn-gold:hover { background: var(--gold-light); transform: translateY(-1px); }
    .btn-outline { background: transparent; color: var(--white); border: 2px solid rgba(255,255,255,0.4); }
    .btn-outline:hover { border-color: var(--white); }
    .btn-sm { padding: 0.6rem 1.2rem; font-size: 0.9rem; }

    /* Sections */
    .section { padding: 4rem 2rem; max-width: 1100px; margin: 0 auto; }
    .section-gray { background: var(--light-gray); }
    .section-title { font-size: 2rem; font-weight: 700; color: var(--navy); text-align: center; margin-bottom: 0.5rem; }
    .section-sub { text-align: center; color: var(--text-light); margin-bottom: 2.5rem; font-size: 1.05rem; }

    /* Check Form */
    .check-form { background: var(--white); border-radius: 12px; padding: 2rem; box-shadow: 0 2px 12px rgba(0,0,0,0.08); max-width: 600px; margin: 0 auto; }
    .form-group { margin-bottom: 1.25rem; }
    .form-group label { display: block; font-weight: 600; margin-bottom: 0.4rem; color: var(--navy); font-size: 0.95rem; }
    .form-group select, .form-group input { width: 100%; padding: 0.75rem; border: 2px solid var(--mid-gray); border-radius: 6px; font-size: 1rem; font-family: inherit; background: var(--white); }
    .form-group select:focus, .form-group input:focus { outline: none; border-color: var(--gold); }
    .check-btn { width: 100%; padding: 1rem; font-size: 1.1rem; }

    /* Results */
    .results { display: none; margin-top: 2rem; max-width: 800px; margin-left: auto; margin-right: auto; }
    .results.active { display: block; }
    .score-card { text-align: center; padding: 2rem; background: var(--white); border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); margin-bottom: 1.5rem; }
    .score-number { font-size: 4rem; font-weight: 700; line-height: 1; }
    .score-green { color: var(--green); }
    .score-yellow { color: var(--yellow); }
    .score-red { color: var(--red); }
    .score-label { color: var(--text-light); margin-top: 0.5rem; }
    .summary-row { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 1rem; }
    .summary-item { background: var(--light-gray); padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; }
    .finding-card { background: var(--white); border-radius: 8px; padding: 1.25rem; margin-bottom: 0.75rem; border-left: 4px solid var(--yellow); box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
    .finding-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
    .finding-code { font-weight: 700; color: var(--navy); }
    .badge { padding: 0.2rem 0.6rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; }
    .badge-review { background: #fff3e0; color: #e65100; }
    .badge-compliant { background: #e8f5e9; color: #2e7d32; }
    .badge-noncompliant { background: #ffebee; color: #c62828; }
    .finding-title { font-weight: 600; margin-bottom: 0.4rem; }
    .finding-remediation { font-size: 0.9rem; color: var(--text-light); }
    .upsell-box { background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%); color: var(--white); border-radius: 12px; padding: 2rem; text-align: center; margin-top: 1.5rem; }
    .upsell-box h3 { margin-bottom: 0.5rem; }
    .upsell-box p { opacity: 0.85; margin-bottom: 1.5rem; }
    .upsell-btns { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }

    /* Pricing */
    .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.25rem; }
    .price-card { background: var(--white); border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.06); text-align: center; border: 2px solid transparent; transition: border-color 0.2s; position: relative; }
    .price-card:hover { border-color: var(--gold); }
    .price-card.recommended { border-color: var(--gold); }
    .recommended-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--gold); color: var(--navy); padding: 0.2rem 1rem; border-radius: 12px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
    .price-name { font-weight: 700; color: var(--navy); font-size: 1.1rem; margin-bottom: 0.5rem; }
    .price-amount { font-size: 2rem; font-weight: 700; color: var(--navy); }
    .price-period { font-size: 0.85rem; color: var(--text-light); }
    .price-features { list-style: none; margin: 1rem 0; text-align: left; }
    .price-features li { padding: 0.3rem 0; font-size: 0.9rem; color: var(--text-light); }
    .price-features li::before { content: "\\2713"; color: var(--green); margin-right: 0.5rem; font-weight: 700; }

    /* Compare */
    .compare-form { display: grid; grid-template-columns: 1fr 1fr 1fr auto; gap: 1rem; align-items: end; max-width: 800px; margin: 0 auto; }
    .compare-results { display: none; margin-top: 2rem; }
    .compare-results.active { display: block; }
    .compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    .compare-col { background: var(--white); border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
    .compare-col h3 { color: var(--navy); margin-bottom: 1rem; }
    .cat-tag { display: inline-block; background: var(--light-gray); padding: 0.3rem 0.8rem; border-radius: 12px; margin: 0.2rem; font-size: 0.85rem; }
    .cat-tag.unique { background: #fff3e0; color: #e65100; }
    .cat-tag.shared { background: #e8f5e9; color: #2e7d32; }

    /* Stats */
    .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; text-align: center; }
    .stat-item { padding: 1.5rem; }
    .stat-number { font-size: 2.5rem; font-weight: 700; color: var(--navy); }
    .stat-label { color: var(--text-light); margin-top: 0.25rem; }

    /* Footer */
    .footer { background: var(--navy); color: rgba(255,255,255,0.7); padding: 2rem; text-align: center; font-size: 0.9rem; }
    .footer a { color: var(--gold); }
    .footer-links { margin-bottom: 0.75rem; display: flex; gap: 1.5rem; justify-content: center; }

    /* Loading */
    .spinner { display: inline-block; width: 20px; height: 20px; border: 3px solid rgba(26,39,68,0.2); border-top-color: var(--navy); border-radius: 50%; animation: spin 0.6s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .loading-overlay { display: none; text-align: center; padding: 3rem; }
    .loading-overlay.active { display: block; }
    .error-msg { background: #ffebee; color: #c62828; padding: 1rem; border-radius: 8px; margin-top: 1rem; display: none; }
    .error-msg.active { display: block; }

    /* Responsive */
    @media (max-width: 768px) {
      .hero h1 { font-size: 2rem; }
      .hero p { font-size: 1rem; }
      .compare-form { grid-template-columns: 1fr; }
      .compare-grid { grid-template-columns: 1fr; }
      .stats-row { grid-template-columns: repeat(2, 1fr); }
      .pricing-grid { grid-template-columns: 1fr; }
      .nav { display: none; }
    }
    @media (max-width: 480px) {
      .hero h1 { font-size: 1.6rem; }
      .section { padding: 2.5rem 1rem; }
    }
  </style>
</head>
<body>

  <header class="header">
    <div class="logo">
      <div class="logo-mark">V</div>
      <div class="logo-text">Vernen Legal Compliance</div>
    </div>
    <nav class="nav">
      <a href="#check">Check Compliance</a>
      <a href="#pricing">Pricing</a>
      <a href="#compare">Compare States</a>
    </nav>
  </header>

  <section class="hero">
    <h1>Know Your Compliance.<br>Every State. Every Entity.</h1>
    <p>Instant federal and state compliance scanning for LLCs, corporations, sole proprietors, partnerships, and nonprofits. 336 rules across all 50 states.</p>
    <div class="hero-ctas">
      <a href="#check" class="btn btn-gold">Check My Compliance &mdash; Free</a>
      <a href="#pricing" class="btn btn-outline">View Pricing</a>
    </div>
  </section>

  <section id="check" class="section-gray">
    <div class="section">
      <h2 class="section-title">Compliance Check</h2>
      <p class="section-sub">Select your state and entity type to see your compliance obligations instantly.</p>
      <div class="check-form">
        <div class="form-group">
          <label for="bizName">Business Name (optional)</label>
          <input type="text" id="bizName" placeholder="Your business name">
        </div>
        <div class="form-group">
          <label for="state">State</label>
          <select id="state">
            <option value="">Select your state</option>
            ${stateOptions}
          </select>
        </div>
        <div class="form-group">
          <label for="entityType">Entity Type</label>
          <select id="entityType">
            <option value="">Select entity type</option>
            <option value="LLC">LLC</option>
            <option value="CORPORATION">Corporation</option>
            <option value="S_CORP">S-Corporation</option>
            <option value="SOLE_PROPRIETORSHIP">Sole Proprietorship</option>
            <option value="PARTNERSHIP">Partnership</option>
            <option value="NONPROFIT">Nonprofit</option>
          </select>
        </div>
        <button class="btn btn-gold check-btn" onclick="runCheck()">Scan My Compliance &mdash; Free</button>
        <div id="checkError" class="error-msg"></div>
      </div>

      <div id="loading" class="loading-overlay">
        <div class="spinner"></div>
        <p style="margin-top:1rem;color:var(--text-light)">REGULIS is scanning your compliance requirements...</p>
      </div>

      <div id="results" class="results"></div>
    </div>
  </section>

  <section id="pricing">
    <div class="section">
      <h2 class="section-title">Pricing</h2>
      <p class="section-sub">From a free preview to full 50-state coverage. Pay only for what you need.</p>
      <div class="pricing-grid">
        <div class="price-card">
          <div class="price-name">Free Preview</div>
          <div class="price-amount">$0</div>
          <div class="price-period">one-time</div>
          <ul class="price-features">
            <li>Up to 5 findings</li>
            <li>Basic compliance score</li>
            <li>Single state only</li>
          </ul>
          <a href="#check" class="btn btn-gold btn-sm" style="width:100%">Try Free</a>
        </div>
        <div class="price-card">
          <div class="price-name">Single State</div>
          <div class="price-amount">$29</div>
          <div class="price-period">one-time</div>
          <ul class="price-features">
            <li>Complete state + federal</li>
            <li>All findings + remediation</li>
            <li>Compliance score breakdown</li>
            <li>Downloadable report</li>
            <li>30-day access</li>
          </ul>
          <button class="btn btn-gold btn-sm" style="width:100%" onclick="alert('Run a free check first, then upgrade to the full report.')">Get Report</button>
        </div>
        <div class="price-card recommended">
          <div class="recommended-badge">Most Popular</div>
          <div class="price-name">Multi-State</div>
          <div class="price-amount">$149</div>
          <div class="price-period">up to 5 states</div>
          <ul class="price-features">
            <li>Up to 5 states + federal</li>
            <li>Cross-jurisdictional analysis</li>
            <li>All findings + remediation</li>
            <li>Priority score per state</li>
            <li>90-day access</li>
          </ul>
          <button class="btn btn-gold btn-sm" style="width:100%" onclick="alert('Run a free check first, then upgrade to multi-state.')">Get Report</button>
        </div>
        <div class="price-card">
          <div class="price-name">Full 50-State</div>
          <div class="price-amount">$499</div>
          <div class="price-period">all jurisdictions</div>
          <ul class="price-features">
            <li>All 50 states + DC + federal</li>
            <li>Cross-jurisdictional conflicts</li>
            <li>State-by-state scorecard</li>
            <li>Priority support</li>
            <li>180-day access</li>
          </ul>
          <button class="btn btn-gold btn-sm" style="width:100%" onclick="alert('Run a free check first, then upgrade to 50-state.')">Get Report</button>
        </div>
        <div class="price-card">
          <div class="price-name">Monthly Monitor</div>
          <div class="price-amount">$35</div>
          <div class="price-period">per month</div>
          <ul class="price-features">
            <li>Monthly compliance re-scan</li>
            <li>Regulatory change alerts</li>
            <li>Up to 3 states + federal</li>
            <li>Email notifications</li>
            <li>Trend tracking</li>
          </ul>
          <button class="btn btn-gold btn-sm" style="width:100%" onclick="alert('Coming soon.')">Subscribe</button>
        </div>
      </div>
    </div>
  </section>

  <section id="compare" class="section-gray">
    <div class="section">
      <h2 class="section-title">Compare States</h2>
      <p class="section-sub">Expanding to a new state? See how compliance requirements differ side by side.</p>
      <div class="compare-form">
        <div class="form-group">
          <label for="cmpState1">State 1</label>
          <select id="cmpState1">
            <option value="">Select state</option>
            ${stateOptions}
          </select>
        </div>
        <div class="form-group">
          <label for="cmpState2">State 2</label>
          <select id="cmpState2">
            <option value="">Select state</option>
            ${stateOptions}
          </select>
        </div>
        <div class="form-group">
          <label for="cmpEntity">Entity Type</label>
          <select id="cmpEntity">
            <option value="LLC">LLC</option>
            <option value="CORPORATION">Corporation</option>
            <option value="S_CORP">S-Corporation</option>
            <option value="SOLE_PROPRIETORSHIP">Sole Proprietorship</option>
            <option value="PARTNERSHIP">Partnership</option>
            <option value="NONPROFIT">Nonprofit</option>
          </select>
        </div>
        <button class="btn btn-gold" onclick="compareStates()">Compare</button>
      </div>
      <div id="compareError" class="error-msg"></div>
      <div id="compareResults" class="compare-results"></div>
    </div>
  </section>

  <section>
    <div class="section">
      <div class="stats-row">
        <div class="stat-item">
          <div class="stat-number" id="statRules">336</div>
          <div class="stat-label">Compliance Rules</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">50</div>
          <div class="stat-label">States + DC</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">6</div>
          <div class="stat-label">Entity Types</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" id="statChecks">0</div>
          <div class="stat-label">Checks Run</div>
        </div>
      </div>
    </div>
  </section>

  <div style="background:var(--light-gray);padding:1rem 2rem;text-align:center;font-size:0.85rem;color:var(--text-light);border-top:1px solid var(--mid-gray);">
    Vernen Legal Compliance provides legal information, not legal advice. We are not a law firm. Consult a licensed attorney for advice specific to your situation.
  </div>

  <footer class="footer">
    <div class="footer-links">
      <a href="/api/regulis/products">API</a>
      <a href="/api/regulis/states">Coverage</a>
      <a href="/legal/terms">Terms of Service</a>
      <a href="/legal/privacy">Privacy Policy</a>
      <a href="/dashboard">Dashboard</a>
    </div>
    <p>&copy; 2026 Vernen Legal Compliance&trade; &mdash; All Rights Reserved</p>
    <p style="margin-top:0.5rem;font-size:0.8rem;opacity:0.6">Powered by REGULIS&trade; &mdash; A Vernen Persona Citizen&trade;</p>
  </footer>

  <script>
    // Load stats on page load
    (async function() {
      try {
        const res = await fetch('/api/regulis/stats');
        if (res.ok) {
          const data = await res.json();
          const el = document.getElementById('statChecks');
          if (el && data.totalChecks !== undefined) el.textContent = data.totalChecks;
          const rl = document.getElementById('statRules');
          if (rl && data.totalRules !== undefined) rl.textContent = data.totalRules;
        }
      } catch(e) {}
    })();

    async function runCheck() {
      const state = document.getElementById('state').value;
      const entityType = document.getElementById('entityType').value;
      const bizName = document.getElementById('bizName').value;
      const errEl = document.getElementById('checkError');
      const loadEl = document.getElementById('loading');
      const resEl = document.getElementById('results');

      errEl.className = 'error-msg';
      errEl.textContent = '';
      resEl.className = 'results';
      resEl.innerHTML = '';

      if (!state) { errEl.textContent = 'Please select a state.'; errEl.className = 'error-msg active'; return; }
      if (!entityType) { errEl.textContent = 'Please select an entity type.'; errEl.className = 'error-msg active'; return; }

      loadEl.className = 'loading-overlay active';

      try {
        const res = await fetch('/api/regulis/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ state, entityType, businessName: bizName || undefined })
        });

        loadEl.className = 'loading-overlay';

        if (!res.ok) {
          const err = await res.json();
          errEl.textContent = err.error || 'Something went wrong. Please try again.';
          errEl.className = 'error-msg active';
          return;
        }

        const data = await res.json();
        renderResults(data);
      } catch(e) {
        loadEl.className = 'loading-overlay';
        errEl.textContent = 'Connection error. Please try again.';
        errEl.className = 'error-msg active';
      }
    }

    function renderResults(data) {
      const el = document.getElementById('results');
      const score = data.complianceScore || 0;
      const scoreClass = score >= 70 ? 'score-green' : score >= 40 ? 'score-yellow' : 'score-red';
      const s = data.summary || {};
      const preview = data.preview || [];
      const total = s.totalRules || 0;
      const reportId = data.reportId || '';

      let findingsHtml = '';
      for (const f of preview) {
        const badgeClass = f.status === 'COMPLIANT' ? 'badge-compliant' : f.status === 'NON_COMPLIANT' ? 'badge-noncompliant' : 'badge-review';
        const statusText = f.status === 'NEEDS_REVIEW' ? 'Needs Review' : f.status === 'COMPLIANT' ? 'Compliant' : 'Non-Compliant';
        findingsHtml += '<div class="finding-card">'
          + '<div class="finding-header"><span class="finding-code">' + (f.ruleId || '') + '</span><span class="badge ' + badgeClass + '">' + statusText + '</span></div>'
          + '<div class="finding-title">' + (f.details || '').replace(/Rule \\S+ /, '').split(' \\u2014 ')[0] + '</div>'
          + '<div class="finding-remediation">' + (f.remediation || '') + '</div>'
          + '</div>';
      }

      el.innerHTML = '<div class="score-card">'
        + '<div class="score-number ' + scoreClass + '">' + score + '%</div>'
        + '<div class="score-label">Compliance Score</div>'
        + '<div class="summary-row">'
        + '<span class="summary-item">' + total + ' rules checked</span>'
        + '<span class="summary-item">' + (s.needsReview || 0) + ' need review</span>'
        + '<span class="summary-item">' + (s.compliant || 0) + ' compliant</span>'
        + '<span class="summary-item">' + (s.notApplicable || 0) + ' N/A</span>'
        + '</div></div>'
        + '<h3 style="margin-bottom:1rem;color:var(--navy)">Top Findings (Free Preview)</h3>'
        + findingsHtml
        + '<div class="upsell-box">'
        + '<h3>See All ' + (data.fullReportFindings || total) + ' Findings</h3>'
        + '<p>Get the complete compliance report with detailed remediation guidance for every rule.</p>'
        + '<div class="upsell-btns">'
        + '<button class="btn btn-gold" onclick="startCheckout(\\'' + reportId + '\\', \\'single_state\\')">Full Report &mdash; $29</button>'
        + '<button class="btn btn-outline" onclick="startCheckout(\\'' + reportId + '\\', \\'multi_state\\')">Multi-State &mdash; $149</button>'
        + '<button class="btn btn-outline" onclick="startCheckout(\\'' + reportId + '\\', \\'full_50_state\\')">50-State &mdash; $499</button>'
        + '</div></div>';

      el.className = 'results active';
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    async function startCheckout(reportId, productId) {
      try {
        const res = await fetch('/api/payments/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reportId, productId })
        });
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        } else if (data.error) {
          alert(data.error);
        }
      } catch(e) {
        alert('Payment system is currently being configured. Please try again later.');
      }
    }

    async function compareStates() {
      const state1 = document.getElementById('cmpState1').value;
      const state2 = document.getElementById('cmpState2').value;
      const entityType = document.getElementById('cmpEntity').value;
      const errEl = document.getElementById('compareError');
      const resEl = document.getElementById('compareResults');

      errEl.className = 'error-msg';
      resEl.className = 'compare-results';

      if (!state1 || !state2) { errEl.textContent = 'Please select both states.'; errEl.className = 'error-msg active'; return; }

      try {
        const res = await fetch('/api/regulis/compare?state1=' + state1 + '&state2=' + state2 + '&entityType=' + entityType);
        if (!res.ok) { errEl.textContent = 'Comparison failed.'; errEl.className = 'error-msg active'; return; }
        const data = await res.json();
        const c = data.comparison || {};
        const shared = (c.sharedCategories || []).map(function(cat) { return '<span class="cat-tag shared">' + cat + '</span>'; }).join('');
        const only1 = (c.state1OnlyCategories || []).map(function(cat) { return '<span class="cat-tag unique">' + cat + '</span>'; }).join('');
        const only2 = (c.state2OnlyCategories || []).map(function(cat) { return '<span class="cat-tag unique">' + cat + '</span>'; }).join('');

        resEl.innerHTML = '<div class="compare-grid">'
          + '<div class="compare-col"><h3>' + state1 + ' (' + (c.state1RuleCount || 0) + ' rules)</h3>'
          + '<p style="margin-bottom:0.5rem;font-weight:600;color:var(--green)">Shared:</p>' + (shared || '<em>None</em>')
          + '<p style="margin:0.75rem 0 0.5rem;font-weight:600;color:#e65100">Unique to ' + state1 + ':</p>' + (only1 || '<em>None</em>')
          + '</div>'
          + '<div class="compare-col"><h3>' + state2 + ' (' + (c.state2RuleCount || 0) + ' rules)</h3>'
          + '<p style="margin-bottom:0.5rem;font-weight:600;color:var(--green)">Shared:</p>' + (shared || '<em>None</em>')
          + '<p style="margin:0.75rem 0 0.5rem;font-weight:600;color:#e65100">Unique to ' + state2 + ':</p>' + (only2 || '<em>None</em>')
          + '</div></div>';
        resEl.className = 'compare-results active';
        resEl.scrollIntoView({ behavior: 'smooth' });
      } catch(e) {
        errEl.textContent = 'Connection error.';
        errEl.className = 'error-msg active';
      }
    }
  </script>

</body>
</html>`;

export function serveLandingPage(): Response {
  return new Response(LANDING_HTML, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}

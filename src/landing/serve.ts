/**
 * Product page for Vernen Legal Compliance.
 * Full customer-facing frontend with compliance checking,
 * state comparison, pricing, and Stripe checkout.
 *
 * Design: Black-gold prestige aesthetic from the original VERNEN project.
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

  <!-- FAQ Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a compliance scan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A compliance scan checks your business against federal and state regulatory requirements for your entity type. Our system evaluates 336 rules across categories like formation, taxation, employment, licensing, and reporting to identify obligations, gaps, and action items."
        }
      },
      {
        "@type": "Question",
        "name": "How many states do you cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We cover all 50 US states plus the District of Columbia — 51 jurisdictions total. Each jurisdiction has state-specific rules in addition to the federal baseline that applies everywhere."
        }
      },
      {
        "@type": "Question",
        "name": "Is the free preview really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The free preview requires no signup, no credit card, and no email. You get a compliance score and up to 5 top findings instantly. Paid reports unlock the full findings with detailed remediation guidance."
        }
      },
      {
        "@type": "Question",
        "name": "What entity types are supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We support six entity types: LLC, Corporation, S-Corporation, Sole Proprietorship, Partnership, and Nonprofit. Each entity type has different compliance obligations that our scan accounts for."
        }
      },
      {
        "@type": "Question",
        "name": "How current are the compliance rules?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our compliance rules are maintained and updated regularly to reflect current federal and state requirements. The platform tracks regulatory changes and updates rules as legislation and administrative requirements evolve."
        }
      }
    ]
  }
  </script>

  <title>Business Compliance Scanning — All 50 States | Vernen Legal Compliance</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;500;600;700&family=JetBrains+Mono:wght@300;400;500&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    :root {
      --bg: #080809;
      --bg2: #0c0c0e;
      --bg3: #111114;
      --gold: #c9a84c;
      --gold-light: #d4b35c;
      --gold-dim: rgba(201,168,76,0.4);
      --gold-faint: rgba(201,168,76,0.08);
      --border: #1e1e22;
      --text: #c0b8a8;
      --text-dim: #888;
      --text-faint: #444;
      --green: #5a9a5a;
      --yellow: #c9a84c;
      --red: #c94a4a;
    }
    html { scroll-behavior: smooth; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Libre Baskerville', serif;
      font-size: 15px;
      line-height: 1.7;
      overflow-x: hidden;
    }

    /* GRAIN OVERLAY */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 999;
      opacity: .4;
    }

    a { color: var(--gold); text-decoration: none; }
    a:hover { color: var(--gold-light); }

    /* NAV */
    nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 100;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 18px 48px;
      background: linear-gradient(to bottom, #080809ee, transparent);
      backdrop-filter: blur(4px);
    }
    .nav-logo {
      font-family: 'Cormorant Garamond', serif;
      font-size: 22px;
      font-weight: 700;
      color: var(--gold);
      letter-spacing: 5px;
      text-decoration: none;
    }
    .nav-links { display: flex; gap: 32px; list-style: none; align-items: center; }
    .nav-links a {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      letter-spacing: 2px;
      color: var(--text-dim);
      text-decoration: none;
      text-transform: uppercase;
      transition: color .2s;
    }
    .nav-links a:hover { color: var(--gold); }
    .nav-cta {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      letter-spacing: 2px;
      color: var(--gold);
      border: 1px solid var(--gold);
      padding: 8px 18px;
      text-decoration: none;
      transition: all .2s;
      text-transform: uppercase;
    }
    .nav-cta:hover { background: var(--gold); color: var(--bg); }

    /* HERO */
    .hero {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 120px 24px 80px;
      position: relative;
    }
    .hero::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 200px;
      background: linear-gradient(to bottom, transparent, var(--bg));
    }
    .hero-eyebrow {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      letter-spacing: 4px;
      color: var(--text-dim);
      text-transform: uppercase;
      margin-bottom: 40px;
      animation: fadeUp .8s ease both;
    }
    .hero-logo-img {
      max-width: min(500px, 80vw);
      width: 100%;
      height: auto;
      margin-bottom: 48px;
      animation: fadeUp 1s ease .1s both;
      filter: drop-shadow(0 0 40px rgba(201, 168, 76, 0.15));
    }
    .hero-logo-img:hover {
      filter: drop-shadow(0 0 60px rgba(201, 168, 76, 0.25));
      transition: filter .6s ease;
    }
    .hero h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.8rem;
      font-weight: 300;
      color: #e8e4dc;
      margin-bottom: 1rem;
      line-height: 1.2;
      animation: fadeUp .8s ease .2s both;
    }
    .hero p {
      font-family: 'Libre Baskerville', serif;
      font-size: 16px;
      font-style: italic;
      color: var(--text-dim);
      max-width: 560px;
      line-height: 1.8;
      margin-bottom: 2.5rem;
      animation: fadeUp .8s ease .3s both;
    }
    .hero-ctas {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
      position: relative;
      z-index: 1;
      animation: fadeUp .8s ease .4s both;
    }

    /* BUTTONS */
    .btn {
      display: inline-block;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 14px 32px;
      text-decoration: none;
      transition: all .2s;
      cursor: pointer;
      border: none;
    }
    .btn-gold {
      background: var(--gold);
      color: var(--bg);
    }
    .btn-gold:hover {
      background: var(--gold-light);
      transform: translateY(-1px);
    }
    .btn-outline {
      background: transparent;
      color: var(--gold);
      border: 1px solid var(--gold-dim);
    }
    .btn-outline:hover {
      border-color: var(--gold);
      background: var(--gold-faint);
    }
    .btn-sm { padding: 10px 20px; font-size: 9px; }

    /* STATS BAR */
    .stats-bar {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1px;
      background: var(--border);
      border: 1px solid var(--border);
      max-width: 900px;
      margin: 0 auto 80px;
    }
    .stat {
      background: var(--bg2);
      padding: 32px 24px;
      text-align: center;
    }
    .stat-value {
      font-family: 'Cormorant Garamond', serif;
      font-size: 36px;
      font-weight: 700;
      color: var(--gold);
      margin-bottom: 4px;
    }
    .stat-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 8px;
      letter-spacing: 2px;
      color: var(--text-faint);
      text-transform: uppercase;
    }

    /* SECTIONS */
    section { padding: 100px 48px; max-width: 1100px; margin: 0 auto; }
    .section-eyebrow {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      letter-spacing: 4px;
      color: var(--gold);
      text-transform: uppercase;
      margin-bottom: 16px;
      text-align: center;
    }
    .section-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 36px;
      font-weight: 300;
      color: #e8e4dc;
      margin-bottom: 8px;
      text-align: center;
    }
    .section-sub {
      font-size: 14px;
      color: var(--text-dim);
      max-width: 520px;
      margin: 0 auto 48px;
      text-align: center;
    }
    .divider {
      width: 60px;
      height: 1px;
      background: var(--gold-dim);
      margin: 28px 0;
    }

    /* CHECK FORM */
    .check-form {
      background: var(--bg2);
      border: 1px solid var(--border);
      padding: 2.5rem;
      max-width: 600px;
      margin: 0 auto;
    }
    .form-group { margin-bottom: 1.5rem; }
    .form-group label {
      display: block;
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--text-dim);
      margin-bottom: 0.5rem;
    }
    .form-group select, .form-group input {
      width: 100%;
      padding: 0.85rem;
      border: 1px solid var(--border);
      background: var(--bg);
      color: var(--text);
      font-size: 14px;
      font-family: 'Libre Baskerville', serif;
      transition: border-color 0.2s;
    }
    .form-group select:focus, .form-group input:focus {
      outline: none;
      border-color: var(--gold-dim);
    }
    .form-group select { appearance: auto; }
    .check-btn { width: 100%; padding: 1rem; margin-top: 0.5rem; }

    /* RESULTS */
    .results { display: none; margin-top: 3rem; max-width: 800px; margin-left: auto; margin-right: auto; }
    .results.active { display: block; }
    .score-card {
      text-align: center;
      padding: 2.5rem;
      background: var(--bg2);
      border: 1px solid var(--border);
      margin-bottom: 2rem;
    }
    .score-number {
      font-family: 'Cormorant Garamond', serif;
      font-size: 5rem;
      font-weight: 700;
      line-height: 1;
    }
    .score-green { color: var(--green); }
    .score-yellow { color: var(--gold); }
    .score-red { color: var(--red); }
    .score-label { color: var(--text-dim); margin-top: 0.5rem; font-size: 13px; }
    .summary-row {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 1.5rem;
    }
    .summary-item {
      background: var(--bg3);
      border: 1px solid var(--border);
      padding: 0.5rem 1rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      letter-spacing: 1px;
      color: var(--text-dim);
    }
    .finding-card {
      background: var(--bg2);
      border: 1px solid var(--border);
      border-left: 3px solid var(--gold-dim);
      padding: 1.25rem;
      margin-bottom: 0.75rem;
      transition: border-color 0.3s;
    }
    .finding-card:hover { border-left-color: var(--gold); }
    .finding-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    .finding-code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      font-weight: 500;
      color: var(--gold);
      letter-spacing: 1px;
    }
    .badge {
      font-family: 'JetBrains Mono', monospace;
      padding: 0.2rem 0.6rem;
      font-size: 8px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .badge-review { background: rgba(201,168,76,0.15); color: var(--gold); }
    .badge-compliant { background: rgba(90,154,90,0.15); color: var(--green); }
    .badge-noncompliant { background: rgba(201,74,74,0.15); color: var(--red); }
    .finding-title { font-size: 14px; color: #d4cfc4; margin-bottom: 0.4rem; }
    .finding-remediation { font-size: 13px; color: var(--text-dim); }
    .upsell-box {
      background: var(--bg2);
      border: 1px solid var(--border);
      border-top: 2px solid var(--gold);
      padding: 2.5rem;
      text-align: center;
      margin-top: 2rem;
    }
    .upsell-box h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 300; color: #e8e4dc; margin-bottom: 0.75rem; }
    .upsell-box p { color: var(--text-dim); font-size: 14px; }
    .upsell-btns { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }

    /* PRICING */
    .pricing-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1px;
      background: var(--border);
      border: 1px solid var(--border);
    }
    .price-card {
      background: var(--bg2);
      padding: 40px 28px;
      display: flex;
      flex-direction: column;
      transition: background 0.3s;
    }
    .price-card:hover { background: var(--bg3); }
    .price-card.featured {
      background: var(--bg3);
      border-top: 2px solid var(--gold);
      position: relative;
    }
    .price-tier {
      font-family: 'JetBrains Mono', monospace;
      font-size: 8px;
      letter-spacing: 3px;
      color: var(--gold);
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    .price-amount {
      font-family: 'Cormorant Garamond', serif;
      font-size: 42px;
      font-weight: 700;
      color: #e8e4dc;
      margin-bottom: 4px;
    }
    .price-period {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      color: var(--text-faint);
      letter-spacing: 1px;
      margin-bottom: 24px;
    }
    .price-features { list-style: none; flex: 1; }
    .price-features li {
      font-size: 13px;
      color: var(--text-dim);
      padding: 8px 0;
      border-bottom: 1px solid var(--border);
    }
    .price-features li::before { content: '\\2192 '; color: var(--gold-dim); }
    .price-btn-wrap { margin-top: 24px; }

    /* COMPARE */
    .compare-form {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr auto;
      gap: 1rem;
      align-items: end;
      max-width: 800px;
      margin: 0 auto;
    }
    .compare-results { display: none; margin-top: 2rem; }
    .compare-results.active { display: block; }
    .compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border); border: 1px solid var(--border); }
    .compare-col { background: var(--bg2); padding: 2rem; }
    .compare-col h3 { color: #e8e4dc; margin-bottom: 1rem; font-family: 'Cormorant Garamond', serif; font-weight: 300; }
    .cat-tag {
      display: inline-block;
      border: 1px solid var(--border);
      padding: 0.3rem 0.8rem;
      margin: 0.2rem;
      font-size: 12px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      letter-spacing: 1px;
    }
    .cat-tag.unique { border-color: var(--gold-dim); color: var(--gold); }
    .cat-tag.shared { border-color: rgba(90,154,90,0.3); color: var(--green); }

    /* FAQ */
    .faq-list { max-width: 760px; margin: 0 auto; }
    .faq-item {
      background: var(--bg2);
      border: 1px solid var(--border);
      margin-bottom: 2px;
      overflow: hidden;
    }
    .faq-q {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.25rem 1.5rem;
      cursor: pointer;
      font-weight: 400;
      color: #d4cfc4;
      font-size: 15px;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
      font-family: 'Libre Baskerville', serif;
      transition: color 0.2s;
    }
    .faq-q:hover { color: var(--gold); }
    .faq-q::after {
      content: '+';
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.6rem;
      color: var(--gold);
      transition: transform 0.2s;
      flex-shrink: 0;
      margin-left: 1rem;
    }
    .faq-item.open .faq-q::after { content: '\\2212'; }
    .faq-a {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease, padding 0.3s ease;
      padding: 0 1.5rem;
      color: var(--text-dim);
      line-height: 1.8;
      font-size: 14px;
    }
    .faq-item.open .faq-a { max-height: 300px; padding: 0 1.5rem 1.25rem; }

    /* ORIGIN SECTION */
    .origin-section {
      background: var(--bg2);
      border: 1px solid var(--border);
      padding: 64px;
      max-width: 1100px;
      margin: 0 auto 80px;
    }
    .origin-inner {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 64px;
      align-items: start;
    }
    .origin-text { font-size: 14px; color: var(--text-dim); line-height: 1.8; }
    .origin-text p + p { margin-top: 16px; }
    .origin-ip {
      background: var(--bg);
      border: 1px solid var(--border);
      padding: 32px;
    }
    .ip-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid var(--border);
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
    }
    .ip-label { color: var(--text-faint); letter-spacing: 1px; text-transform: uppercase; }
    .ip-value { color: var(--gold); }

    /* FOOTER */
    footer {
      padding: 48px;
      max-width: 1100px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-wrap: wrap;
      gap: 24px;
    }
    .footer-logo {
      font-family: 'Cormorant Garamond', serif;
      font-size: 28px;
      font-weight: 700;
      color: var(--gold);
      letter-spacing: 5px;
    }
    .footer-mark {
      font-family: 'JetBrains Mono', monospace;
      font-size: 8px;
      color: var(--text-faint);
      letter-spacing: 2px;
      margin-top: 4px;
      text-transform: uppercase;
    }
    .footer-links {
      margin-top: 1rem;
      display: flex;
      gap: 1.5rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .footer-legal {
      font-family: 'JetBrains Mono', monospace;
      font-size: 8px;
      color: var(--text-faint);
      line-height: 2;
      text-align: right;
    }
    .footer-legal strong { color: var(--gold-dim); }

    /* LOADING / ERROR */
    .spinner { display: inline-block; width: 20px; height: 20px; border: 2px solid var(--border); border-top-color: var(--gold); border-radius: 50%; animation: spin 0.6s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .loading-overlay { display: none; text-align: center; padding: 3rem; }
    .loading-overlay.active { display: block; }
    .error-msg { background: rgba(201,74,74,0.1); border: 1px solid rgba(201,74,74,0.2); color: var(--red); padding: 1rem; margin-top: 1rem; display: none; font-size: 13px; }
    .error-msg.active { display: block; }

    /* ANIMATIONS */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .reveal { opacity: 0; transform: translateY(24px); transition: opacity .7s ease, transform .7s ease; }
    .reveal.visible { opacity: 1; transform: none; }

    /* MOBILE */
    .hamburger { display: none; background: none; border: none; cursor: pointer; padding: 0.5rem; z-index: 200; }
    .hamburger span { display: block; width: 22px; height: 2px; background: var(--gold); margin: 5px 0; transition: all 0.3s; }
    .hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
    .hamburger.active span:nth-child(2) { opacity: 0; }
    .hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
    .nav-mobile-overlay { display: none; position: fixed; inset: 0; background: rgba(8,8,9,0.97); z-index: 150; flex-direction: column; align-items: center; justify-content: center; gap: 2rem; }
    .nav-mobile-overlay.active { display: flex; }
    .nav-mobile-overlay a { font-family: 'Cormorant Garamond', serif; color: #e8e4dc; font-size: 1.8rem; letter-spacing: 3px; text-decoration: none; }
    .nav-mobile-overlay a:hover { color: var(--gold); }

    .disclaimer-bar {
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
      padding: 1rem 2rem;
      text-align: center;
      font-family: 'JetBrains Mono', monospace;
      font-size: 8px;
      letter-spacing: 1px;
      color: var(--text-faint);
    }

    /* RESPONSIVE */
    @media (max-width: 900px) {
      nav { padding: 16px 24px; }
      .nav-links { display: none; }
      .hamburger { display: block; }
      section { padding: 60px 24px; }
      .pricing-grid { grid-template-columns: 1fr; }
      .compare-form { grid-template-columns: 1fr; }
      .compare-grid { grid-template-columns: 1fr; }
      .origin-inner { grid-template-columns: 1fr; gap: 40px; }
      .origin-section { padding: 40px 24px; }
      .stats-bar { grid-template-columns: repeat(2, 1fr); }
      footer { flex-direction: column; align-items: flex-start; }
      .footer-legal { text-align: left; }
    }
    @media (max-width: 480px) {
      .hero h1 { font-size: 2rem; }
      .hero { padding: 100px 20px 60px; }
    }
  </style>
</head>
<body>

<!-- NAV -->
<nav>
  <a href="#" class="nav-logo">VERNEN&trade;</a>
  <div class="nav-links">
    <a href="#check">Compliance</a>
    <a href="#pricing">Pricing</a>
    <a href="#compare">Compare</a>
    <a href="#faq">FAQ</a>
    <a href="#origin">Origin</a>
  </div>
  <a href="#check" class="nav-cta">Check Compliance</a>
  <button class="hamburger" onclick="toggleMobileNav()" aria-label="Toggle navigation">
    <span></span><span></span><span></span>
  </button>
</nav>

<div class="nav-mobile-overlay" id="mobileNav">
  <a href="#check" onclick="closeMobileNav()">Compliance</a>
  <a href="#pricing" onclick="closeMobileNav()">Pricing</a>
  <a href="#compare" onclick="closeMobileNav()">Compare</a>
  <a href="#faq" onclick="closeMobileNav()">FAQ</a>
  <a href="#origin" onclick="closeMobileNav()">Origin</a>
</div>

<!-- HERO -->
<div class="hero">
  <div class="hero-eyebrow">Autonomous Compliance Intelligence &middot; Established 2026</div>
  <img src="/assets/logo.png" alt="Vernen Legal Compliance" class="hero-logo-img">
  <h1>Know Your Compliance.<br>Every State. Every Entity.</h1>
  <p>Instant federal and state compliance scanning for LLCs, corporations, sole proprietors, partnerships, and nonprofits. 336 rules across all 50 states.</p>
  <div class="hero-ctas">
    <a href="#check" class="btn btn-gold">Check My Compliance</a>
    <a href="#pricing" class="btn btn-outline">View Pricing</a>
  </div>
</div>

<!-- STATS -->
<div class="stats-bar reveal">
  <div class="stat">
    <div class="stat-value" id="statRules">336</div>
    <div class="stat-label">Compliance Rules</div>
  </div>
  <div class="stat">
    <div class="stat-value">51</div>
    <div class="stat-label">Jurisdictions</div>
  </div>
  <div class="stat">
    <div class="stat-value">6</div>
    <div class="stat-label">Entity Types</div>
  </div>
  <div class="stat">
    <div class="stat-value" id="statChecks">0</div>
    <div class="stat-label">Checks Run</div>
  </div>
</div>

<!-- COMPLIANCE CHECK -->
<section id="check">
  <div class="section-eyebrow">Scan</div>
  <div class="section-title">Compliance Check</div>
  <div class="section-sub">Select your state and entity type to see your compliance obligations instantly.</div>

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
    <p style="margin-top:1rem;color:var(--text-dim);font-size:13px;">REGULIS&trade; is scanning your compliance requirements...</p>
  </div>

  <div id="results" class="results"></div>
</section>

<!-- PRICING -->
<section id="pricing">
  <div class="section-eyebrow">Plans</div>
  <div class="section-title">Pricing</div>
  <div class="section-sub">From a free preview to full 50-state coverage. Pay only for what you need.</div>

  <div class="pricing-grid">
    <div class="price-card">
      <div class="price-tier">Preview</div>
      <div class="price-amount">$0</div>
      <div class="price-period">forever</div>
      <ul class="price-features">
        <li>Up to 5 findings</li>
        <li>Basic compliance score</li>
        <li>Single state only</li>
        <li>No signup required</li>
      </ul>
      <div class="price-btn-wrap"><a href="#check" class="btn btn-outline" style="width:100%;text-align:center;">Try Free</a></div>
    </div>
    <div class="price-card featured">
      <div class="price-tier">Single State</div>
      <div class="price-amount">$29</div>
      <div class="price-period">one-time</div>
      <ul class="price-features">
        <li>Complete state + federal</li>
        <li>All findings + remediation</li>
        <li>Compliance score breakdown</li>
        <li>Downloadable PDF report</li>
        <li>30-day access</li>
      </ul>
      <div class="price-btn-wrap"><button class="btn btn-gold" style="width:100%" onclick="alert('Run a free check first, then upgrade to the full report.')">Get Report</button></div>
    </div>
    <div class="price-card">
      <div class="price-tier">Multi-State</div>
      <div class="price-amount">$149</div>
      <div class="price-period">up to 5 states</div>
      <ul class="price-features">
        <li>Up to 5 states + federal</li>
        <li>Cross-jurisdictional analysis</li>
        <li>All findings + remediation</li>
        <li>Priority score per state</li>
        <li>90-day access</li>
      </ul>
      <div class="price-btn-wrap"><button class="btn btn-outline" style="width:100%" onclick="alert('Run a free check first, then upgrade to multi-state.')">Get Report</button></div>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--border);border:1px solid var(--border);border-top:0;max-width:1100px;">
    <div class="price-card">
      <div class="price-tier">50-State</div>
      <div class="price-amount">$499</div>
      <div class="price-period">all jurisdictions</div>
      <ul class="price-features">
        <li>All 50 states + DC + federal</li>
        <li>Cross-jurisdictional conflicts</li>
        <li>State-by-state scorecard</li>
        <li>Priority support</li>
        <li>180-day access</li>
      </ul>
      <div class="price-btn-wrap"><button class="btn btn-outline" style="width:100%" onclick="alert('Run a free check first, then upgrade to 50-state.')">Get Report</button></div>
    </div>
    <div class="price-card">
      <div class="price-tier">Monthly Monitor</div>
      <div class="price-amount">$35</div>
      <div class="price-period">per month</div>
      <ul class="price-features">
        <li>Monthly compliance re-scan</li>
        <li>Regulatory change alerts</li>
        <li>Up to 3 states + federal</li>
        <li>Email notifications</li>
        <li>Trend tracking</li>
      </ul>
      <div class="price-btn-wrap"><button class="btn btn-outline" style="width:100%" onclick="alert('Coming soon.')">Subscribe</button></div>
    </div>
  </div>
</section>

<!-- COMPARE -->
<section id="compare">
  <div class="section-eyebrow">Analysis</div>
  <div class="section-title">Compare States</div>
  <div class="section-sub">Expanding to a new state? See how compliance requirements differ side by side.</div>

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
</section>

<!-- FAQ -->
<section id="faq">
  <div class="section-eyebrow">Questions</div>
  <div class="section-title">Frequently Asked Questions</div>
  <div class="section-sub">Everything you need to know about compliance scanning.</div>

  <div class="faq-list">
    <div class="faq-item">
      <button class="faq-q" onclick="toggleFaq(this)">What is a compliance scan?</button>
      <div class="faq-a">A compliance scan checks your business against federal and state regulatory requirements for your entity type. Our system evaluates 336 rules across categories like formation, taxation, employment, licensing, and reporting to identify obligations, gaps, and action items.</div>
    </div>
    <div class="faq-item">
      <button class="faq-q" onclick="toggleFaq(this)">How many states do you cover?</button>
      <div class="faq-a">We cover all 50 US states plus the District of Columbia &mdash; 51 jurisdictions total. Each jurisdiction has state-specific rules in addition to the federal baseline that applies everywhere.</div>
    </div>
    <div class="faq-item">
      <button class="faq-q" onclick="toggleFaq(this)">Is the free preview really free?</button>
      <div class="faq-a">Yes. The free preview requires no signup, no credit card, and no email. You get a compliance score and up to 5 top findings instantly. Paid reports unlock the full findings with detailed remediation guidance.</div>
    </div>
    <div class="faq-item">
      <button class="faq-q" onclick="toggleFaq(this)">What entity types are supported?</button>
      <div class="faq-a">We support six entity types: LLC, Corporation, S-Corporation, Sole Proprietorship, Partnership, and Nonprofit. Each entity type has different compliance obligations that our scan accounts for.</div>
    </div>
    <div class="faq-item">
      <button class="faq-q" onclick="toggleFaq(this)">How current are the compliance rules?</button>
      <div class="faq-a">Our compliance rules are maintained and updated regularly to reflect current federal and state requirements. The platform tracks regulatory changes and updates rules as legislation and administrative requirements evolve.</div>
    </div>
  </div>
</section>

<!-- ORIGIN -->
<div id="origin" style="padding: 0 48px;">
  <div class="origin-section">
    <div class="section-eyebrow" style="text-align:left">Origin</div>
    <div class="section-title" style="text-align:left;font-size:2rem;">Built From Lived Experience</div>
    <div class="divider"></div>

    <div class="origin-inner">
      <div class="origin-text">
        <p>VERNEN&trade; was born from 16 years navigating California's family court system as a pro se litigant &mdash; a father fighting for his son across multiple jurisdictions, facing institutional barriers at every turn.</p>
        <p>Every compliance rule in this platform maps to a real regulatory requirement. Every deficiency pattern was discovered through direct experience. Every governing standard was learned the hard way.</p>
        <p>This isn't an academic exercise. It's a tool built by someone who needed it and couldn't find it anywhere.</p>
      </div>
      <div class="origin-ip">
        <div class="ip-row"><span class="ip-label">Creator</span><span class="ip-value">Michael Vernen Thomas Hartmann</span></div>
        <div class="ip-row"><span class="ip-label">IP Manifest</span><span class="ip-value">February 2, 2026</span></div>
        <div class="ip-row"><span class="ip-label">Public Disclosure</span><span class="ip-value">February 22, 2026</span></div>
        <div class="ip-row"><span class="ip-label">Platform</span><span class="ip-value">vernenlegal.com</span></div>
        <div class="ip-row"><span class="ip-label">Persona Citizens</span><span class="ip-value">15 Active</span></div>
        <div class="ip-row"><span class="ip-label">Universal Catalog</span><span class="ip-value">4,717 Citizens</span></div>
        <div class="ip-row"><span class="ip-label">Status</span><span class="ip-value">Live &mdash; Active Development</span></div>
      </div>
    </div>
  </div>
</div>

<!-- DISCLAIMER -->
<div class="disclaimer-bar">
  Vernen Legal Compliance provides legal information, not legal advice. We are not a law firm. Consult a licensed attorney for advice specific to your situation.
</div>

<!-- FOOTER -->
<footer>
  <div>
    <div class="footer-logo">VERNEN&trade;</div>
    <div class="footer-mark">Autonomous Compliance Intelligence</div>
    <div class="footer-links">
      <a href="/api/regulis/products">API</a>
      <a href="/api/regulis/states">Coverage</a>
      <a href="#faq">FAQ</a>
      <a href="/legal/terms">Terms</a>
      <a href="/legal/privacy">Privacy</a>
    </div>
  </div>
  <div class="footer-legal">
    <strong>&copy; 2024&ndash;2026 Michael Vernen Thomas Hartmann. All Rights Reserved.</strong><br>
    VERNEN&trade; is a trademark of Michael Vernen Thomas Hartmann.<br>
    IP Manifest Filed February 2, 2026.<br>
    Powered by REGULIS&trade; &mdash; A Vernen Persona Citizen&trade;
  </div>
</footer>

<script>
  // Scroll reveal
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

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
      + '<h3 style="margin-bottom:1rem;color:#e8e4dc;font-family:Cormorant Garamond,serif;font-weight:300;font-size:1.5rem;">Top Findings</h3>'
      + findingsHtml
      + '<div class="upsell-box">'
      + '<div style="font-family:JetBrains Mono,monospace;font-size:8px;letter-spacing:3px;text-transform:uppercase;color:var(--gold);margin-bottom:1rem;">Your Free Preview Showed ' + preview.length + ' of ' + (data.fullReportFindings || total) + ' Findings</div>'
      + '<h3>Unlock the Full Report</h3>'
      + '<p style="margin-bottom:0.5rem;">Get detailed remediation steps, deadline dates, filing requirements, and penalty risks for <strong style="color:#e8e4dc">all ' + (data.fullReportFindings || total) + ' compliance obligations</strong> in your state.</p>'
      + '<p style="font-size:12px;color:var(--text-faint);margin-bottom:1.5rem;">Your scan results are saved for 24 hours. Purchase now to lock in your report.</p>'
      + '<div class="upsell-btns">'
      + '<button class="btn btn-gold" onclick="startCheckout(\\'' + reportId + '\\', \\'single_state\\')">Full Report &mdash; $29</button>'
      + '<button class="btn btn-outline" onclick="startCheckout(\\'' + reportId + '\\', \\'multi_state\\')">5 States &mdash; $149</button>'
      + '<button class="btn btn-outline" onclick="startCheckout(\\'' + reportId + '\\', \\'full_50_state\\')">All 50 States &mdash; $499</button>'
      + '</div>'
      + '<div style="margin-top:1rem;font-size:10px;color:var(--text-faint);font-family:JetBrains Mono,monospace;letter-spacing:1px;">One-time purchase. No subscription. Instant access.</div>'
      + '</div>';

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
        + '<p style="margin:0.75rem 0 0.5rem;font-weight:600;color:var(--gold)">Unique to ' + state1 + ':</p>' + (only1 || '<em>None</em>')
        + '</div>'
        + '<div class="compare-col"><h3>' + state2 + ' (' + (c.state2RuleCount || 0) + ' rules)</h3>'
        + '<p style="margin-bottom:0.5rem;font-weight:600;color:var(--green)">Shared:</p>' + (shared || '<em>None</em>')
        + '<p style="margin:0.75rem 0 0.5rem;font-weight:600;color:var(--gold)">Unique to ' + state2 + ':</p>' + (only2 || '<em>None</em>')
        + '</div></div>';
      resEl.className = 'compare-results active';
      resEl.scrollIntoView({ behavior: 'smooth' });
    } catch(e) {
      errEl.textContent = 'Connection error.';
      errEl.className = 'error-msg active';
    }
  }

  function toggleMobileNav() {
    document.getElementById('mobileNav').classList.toggle('active');
    document.querySelector('.hamburger').classList.toggle('active');
  }
  function closeMobileNav() {
    document.getElementById('mobileNav').classList.remove('active');
    document.querySelector('.hamburger').classList.remove('active');
  }

  function toggleFaq(btn) {
    const item = btn.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(function(el) { el.classList.remove('open'); });
    if (!wasOpen) item.classList.add('open');
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

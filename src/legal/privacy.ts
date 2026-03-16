/**
 * Privacy Policy page for Vernen Legal Compliance.
 * Branded HTML page with full privacy policy.
 */

const PRIVACY_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Privacy Policy - Vernen Legal Compliance</title>
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    :root {
      --navy: #1a2744;
      --navy-light: #243455;
      --gold: #c8a951;
      --gold-light: #d4bc74;
      --white: #ffffff;
      --light-gray: #f5f5f5;
      --text: #333333;
      --text-light: #666666;
    }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: var(--text); line-height: 1.7; background: var(--light-gray); }
    a { color: var(--gold); text-decoration: none; }
    a:hover { color: var(--gold-light); }

    .header { background: var(--navy); padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; }
    .logo { display: flex; align-items: center; gap: 0.75rem; }
    .logo-mark { width: 36px; height: 36px; background: var(--gold); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.2rem; color: var(--navy); }
    .logo-text { color: var(--white); font-size: 1.1rem; font-weight: 600; }
    .nav a { color: var(--white); font-size: 0.9rem; opacity: 0.85; transition: opacity 0.2s; margin-left: 1.5rem; }
    .nav a:hover { opacity: 1; color: var(--gold); }

    .content { max-width: 800px; margin: 0 auto; padding: 3rem 2rem; background: var(--white); min-height: calc(100vh - 140px); }
    .content h1 { font-size: 2rem; color: var(--navy); margin-bottom: 0.25rem; }
    .effective-date { color: var(--text-light); font-size: 0.95rem; margin-bottom: 2rem; }
    .content h2 { font-size: 1.25rem; color: var(--navy); margin-top: 2rem; margin-bottom: 0.75rem; border-bottom: 2px solid var(--gold); padding-bottom: 0.4rem; }
    .content p { margin-bottom: 1rem; }
    .content ul { margin-bottom: 1rem; padding-left: 1.5rem; }
    .content li { margin-bottom: 0.5rem; }
    .content table { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; }
    .content th { background: var(--navy); color: var(--white); padding: 0.6rem 1rem; text-align: left; font-size: 0.9rem; }
    .content td { padding: 0.6rem 1rem; border-bottom: 1px solid #e0e0e0; font-size: 0.9rem; }

    .footer { background: var(--navy); color: rgba(255,255,255,0.7); padding: 1.5rem 2rem; text-align: center; font-size: 0.85rem; }
    .footer a { color: var(--gold); }

    @media (max-width: 768px) {
      .content { padding: 2rem 1rem; }
      .content h1 { font-size: 1.5rem; }
    }
  </style>
</head>
<body>

  <header class="header">
    <a href="/" class="logo" style="text-decoration:none;">
      <div class="logo-mark">V</div>
      <div class="logo-text">Vernen Legal Compliance</div>
    </a>
    <nav class="nav">
      <a href="/">Home</a>
      <a href="/legal/terms">Terms of Service</a>
    </nav>
  </header>

  <div class="content">
    <h1>Privacy Policy</h1>
    <p class="effective-date">Effective Date: March 16, 2026</p>
    <p>Vernen Legal Compliance ("Company," "we," "us," or "our") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy describes how we collect, use, disclose, and protect information when you use our website at compliance.vernenlegal.com and related services (collectively, the "Service").</p>

    <h2>1. Information We Collect</h2>
    <p>We collect the following categories of information when you use the Service:</p>
    <table>
      <thead>
        <tr><th>Category</th><th>Details</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>Business Information</strong></td><td>Business name, entity type, state of formation, states of operation</td></tr>
        <tr><td><strong>Contact Information</strong></td><td>Email address, name (if provided)</td></tr>
        <tr><td><strong>Payment Information</strong></td><td>Payment transactions are processed by Stripe, Inc. We do not store, process, or have access to your full credit card numbers, debit card numbers, or bank account details. We receive only a transaction confirmation, last four digits of the card, and billing address from Stripe.</td></tr>
        <tr><td><strong>Usage Information</strong></td><td>Pages visited, compliance checks performed, reports generated, features used, timestamps</td></tr>
        <tr><td><strong>Technical Information</strong></td><td>IP address, browser type, device type, operating system (collected automatically via server logs)</td></tr>
      </tbody>
    </table>
    <p>We do not collect sensitive personal information such as Social Security numbers, government-issued identification numbers, financial account credentials, health information, or biometric data.</p>

    <h2>2. How We Use Information</h2>
    <p>We use the information we collect for the following purposes:</p>
    <ul>
      <li><strong>Service Delivery:</strong> To generate compliance reports, document templates, and audit results tailored to your business entity type and state(s) of operation;</li>
      <li><strong>Account Management:</strong> To create and manage your account, process transactions, and provide customer support;</li>
      <li><strong>Service Improvement:</strong> To analyze usage patterns, identify technical issues, and improve the accuracy and functionality of the Service;</li>
      <li><strong>Communications:</strong> To send transactional emails related to your account, such as purchase confirmations, report delivery notifications, and service updates;</li>
      <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, legal processes, or enforceable governmental requests.</li>
    </ul>
    <p>We do not use your information for automated decision-making or profiling that produces legal or similarly significant effects.</p>

    <h2>3. Information Sharing</h2>
    <p><strong>We do not sell, rent, trade, or otherwise disclose your personal information to third parties for their marketing purposes.</strong></p>
    <p>We share information only with the following categories of service providers, strictly as necessary to operate the Service:</p>
    <ul>
      <li><strong>Stripe, Inc.</strong> &mdash; Payment processing. Stripe receives your payment information directly and is subject to <a href="https://stripe.com/privacy" target="_blank" rel="noopener">Stripe's Privacy Policy</a>.</li>
      <li><strong>Cloudflare, Inc.</strong> &mdash; Website hosting, content delivery, and data storage (Cloudflare Workers and D1). Cloudflare processes requests and stores data on our behalf and is subject to <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener">Cloudflare's Privacy Policy</a>.</li>
    </ul>
    <p>That is the complete list of third-party service providers with whom we share data. We may also disclose information if required to do so by law, court order, or governmental authority, or if we believe disclosure is necessary to protect the rights, property, or safety of the Company, our users, or the public.</p>

    <h2>4. Data Retention</h2>
    <p>We retain your information for the following periods:</p>
    <ul>
      <li><strong>Compliance Reports:</strong> Reports are retained and accessible for the duration of your purchased access period (30 days for Single State reports, 90 days for Multi-State reports, and 180 days for Full 50-State reports). After the access period expires, reports may be deleted from our systems within 30 days.</li>
      <li><strong>Account Data:</strong> Your account information (email, business name, entity type) is retained for as long as your account is active. You may request deletion of your account data at any time.</li>
      <li><strong>Usage Logs:</strong> Technical and usage logs are retained for up to 90 days for operational and security purposes, after which they are automatically purged.</li>
      <li><strong>Payment Records:</strong> Transaction records are retained for up to seven (7) years as required for accounting, tax, and legal compliance purposes.</li>
    </ul>

    <h2>5. Your Rights</h2>
    <p>You have the following rights regarding your personal information:</p>
    <ul>
      <li><strong>Right of Access:</strong> You may request a copy of the personal information we hold about you.</li>
      <li><strong>Right of Correction:</strong> You may request that we correct any inaccurate or incomplete personal information.</li>
      <li><strong>Right of Deletion:</strong> You may request that we delete your personal information, subject to certain legal exceptions (such as retention required for legal compliance or legitimate business purposes).</li>
      <li><strong>Right to Data Portability:</strong> You may request that we provide your data in a structured, commonly used, machine-readable format.</li>
    </ul>
    <p>To exercise any of these rights, please contact us at <a href="mailto:hello@vernenlegal.com">hello@vernenlegal.com</a>. We will respond to your request within 30 days. We may ask you to verify your identity before processing your request.</p>

    <h2>6. California Privacy Rights (CCPA)</h2>
    <p>If you are a California resident, the California Consumer Privacy Act (CCPA), as amended by the California Privacy Rights Act (CPRA), provides you with additional rights regarding your personal information:</p>
    <ul>
      <li><strong>Right to Know:</strong> You have the right to request that we disclose the categories and specific pieces of personal information we have collected about you, the categories of sources from which the information was collected, the business purpose for collecting the information, and the categories of third parties with whom the information is shared.</li>
      <li><strong>Right to Delete:</strong> You have the right to request the deletion of your personal information, subject to certain exceptions.</li>
      <li><strong>Right to Opt-Out of Sale:</strong> <strong>We do not sell your personal information.</strong> We have not sold personal information in the preceding twelve (12) months, and we do not intend to sell personal information in the future.</li>
      <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your CCPA rights. We will not deny you services, charge you different prices, or provide a different level of service because you exercised your privacy rights.</li>
    </ul>
    <p>To submit a CCPA request, please email <a href="mailto:hello@vernenlegal.com">hello@vernenlegal.com</a> with the subject line "CCPA Request."</p>

    <h2>7. Cookies</h2>
    <p>We use minimal cookies strictly for session management and essential Service functionality. Specifically:</p>
    <ul>
      <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser, used to maintain your session state during a single visit.</li>
      <li><strong>Authentication Cookies:</strong> Used to keep you logged in if you have an account.</li>
    </ul>
    <p>We do <strong>not</strong> use tracking cookies, advertising cookies, or third-party analytics cookies. We do not use cookies to build behavioral profiles or track your activity across other websites. We do not participate in any advertising networks or use remarketing technologies.</p>

    <h2>8. Security</h2>
    <p>We implement industry-standard security measures to protect your personal information:</p>
    <ul>
      <li><strong>Encryption in Transit:</strong> All data transmitted between your browser and our servers is encrypted using Transport Layer Security (TLS/HTTPS).</li>
      <li><strong>Encryption at Rest:</strong> Data stored in our databases (Cloudflare D1) is encrypted at rest.</li>
      <li><strong>Access Controls:</strong> Access to personal information is restricted to authorized personnel on a need-to-know basis.</li>
      <li><strong>Payment Security:</strong> Payment information is handled entirely by Stripe, which is PCI-DSS Level 1 certified, the highest level of payment security certification.</li>
    </ul>
    <p>While we take reasonable measures to protect your information, no method of transmission over the Internet or method of electronic storage is 100% secure. We cannot guarantee absolute security.</p>

    <h2>9. Children's Privacy</h2>
    <p>The Service is designed for business use and is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13 without verification of parental consent, we will take steps to delete that information promptly. If you believe we may have collected information from a child under 13, please contact us immediately at <a href="mailto:hello@vernenlegal.com">hello@vernenlegal.com</a>. This policy is in compliance with the Children's Online Privacy Protection Act (COPPA).</p>

    <h2>10. Changes to This Policy</h2>
    <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors. If we make material changes to this Privacy Policy, we will update the "Effective Date" at the top of this page and may notify you by email or by posting a prominent notice on the Service. Your continued use of the Service after any changes to this Privacy Policy constitutes your acceptance of the revised policy. We encourage you to review this Privacy Policy periodically.</p>

    <h2>11. Contact</h2>
    <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:</p>
    <p>
      <strong>Vernen Legal Compliance</strong><br>
      Email: <a href="mailto:hello@vernenlegal.com">hello@vernenlegal.com</a><br>
      Website: <a href="https://compliance.vernenlegal.com">compliance.vernenlegal.com</a>
    </p>
  </div>

  <footer class="footer">
    <p>&copy; 2026 Vernen Legal Compliance&trade; &mdash; All Rights Reserved</p>
    <p style="margin-top:0.5rem;"><a href="/legal/terms">Terms of Service</a> &nbsp;|&nbsp; <a href="/legal/privacy">Privacy Policy</a> &nbsp;|&nbsp; <a href="/">Home</a></p>
  </footer>

</body>
</html>`;

export function servePrivacyPolicy(): Response {
  return new Response(PRIVACY_HTML, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

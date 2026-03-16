/**
 * Terms of Service page for Vernen Legal Compliance.
 * Branded HTML page with full legal terms.
 */

const TERMS_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Terms of Service - Vernen Legal Compliance</title>
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
    .content ul, .content ol { margin-bottom: 1rem; padding-left: 1.5rem; }
    .content li { margin-bottom: 0.5rem; }
    .prominent { background: #fff8e1; border-left: 4px solid var(--gold); padding: 1.25rem 1.5rem; margin: 1.5rem 0; font-weight: 600; }
    .prominent strong { color: var(--navy); display: block; font-size: 1.1rem; margin-bottom: 0.5rem; }

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
      <a href="/legal/privacy">Privacy Policy</a>
    </nav>
  </header>

  <div class="content">
    <h1>Terms of Service</h1>
    <p class="effective-date">Effective Date: March 16, 2026</p>
    <p>These Terms of Service ("Terms") govern your access to and use of the website, applications, and services (collectively, the "Service") provided by Vernen Legal Compliance ("Company," "we," "us," or "our"), accessible at compliance.vernenlegal.com. By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Service.</p>

    <h2>1. Acceptance of Terms</h2>
    <p>By accessing, browsing, or using the Service in any manner, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our <a href="/legal/privacy">Privacy Policy</a>, which is incorporated herein by reference. If you are using the Service on behalf of a business, organization, or other entity, you represent and warrant that you have the authority to bind that entity to these Terms, and references to "you" shall include both you individually and the entity you represent.</p>

    <h2>2. Description of Service</h2>
    <p>Vernen Legal Compliance operates a compliance information platform that provides federal and state regulatory compliance scanning, report generation, document templates, audit analysis, and related informational services for businesses operating in the United States. The Service analyzes publicly available statutes, regulations, and administrative rules to help businesses understand their compliance obligations.</p>
    <p>We are a compliance <em>information</em> platform. We are <strong>not a law firm</strong>. We do not practice law, and we do not provide legal representation.</p>

    <h2>3. NOT LEGAL ADVICE</h2>
    <div class="prominent">
      <strong>IMPORTANT: THIS SERVICE DOES NOT PROVIDE LEGAL ADVICE</strong>
      Vernen Legal Compliance provides legal INFORMATION, not legal ADVICE. We are not a law firm. We are not your attorney. No attorney-client relationship is created by using this Service. The information provided through the Service is for general informational purposes only and should not be relied upon as a substitute for consultation with a licensed attorney in your jurisdiction. Laws and regulations change frequently. While we strive for accuracy, we cannot guarantee that all information is current, complete, or applicable to your specific situation. You should always verify information with official government sources and consult with a qualified legal professional before making any legal or business decisions based on information obtained through this Service.
    </div>

    <h2>4. No Attorney-Client Relationship</h2>
    <p>Your use of the Service, including the submission of information through the Service, the receipt of compliance reports, document templates, or audit results, and any communication with the Company, does not create an attorney-client relationship between you and Vernen Legal Compliance. The Company does not act as your attorney, legal counsel, or legal representative. No confidential or privileged relationship exists between you and the Company by virtue of your use of the Service. You should not submit information to the Service that you wish to be protected by attorney-client privilege.</p>

    <h2>5. Accuracy Disclaimer</h2>
    <p>The information provided through the Service is based on publicly available federal and state statutes, regulations, and administrative rules. While we make reasonable efforts to ensure the accuracy and completeness of this information, we make no representations or warranties that:</p>
    <ul>
      <li>The information reflects the most recent legislative or regulatory changes;</li>
      <li>The information is applicable to your specific business, industry, or circumstances;</li>
      <li>The information is free from errors, omissions, or inaccuracies;</li>
      <li>The Service covers all applicable laws, regulations, or compliance obligations for any given jurisdiction or entity type.</li>
    </ul>
    <p>You are solely responsible for verifying all information with official state and federal government sources and for ensuring your business complies with all applicable laws and regulations.</p>

    <h2>6. Document Generation Disclaimer</h2>
    <p>The Service may generate compliance reports, document templates, checklists, and other written materials ("Generated Documents"). All Generated Documents are provided as templates and informational resources only. Generated Documents are not tailored to your specific legal needs and should not be used as-is without review by a licensed attorney. The Company makes no representations or warranties regarding the legal sufficiency, enforceability, or completeness of any Generated Document. You assume all risk and liability arising from the use of any Generated Document without independent legal review.</p>

    <h2>7. Audit Engine Disclaimer</h2>
    <p>The Service may include a compliance audit engine that analyzes documents, business practices, or operational data to identify potential compliance issues ("Audit Results"). Audit Results are algorithmic assessments based on automated analysis and are not legal opinions. Audit Results should not be treated as a substitute for a professional legal review or compliance audit conducted by a licensed attorney or qualified compliance professional. The absence of identified issues in Audit Results does not guarantee compliance with any law or regulation.</p>

    <h2>8. Limitation of Liability</h2>
    <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL VERNEN LEGAL COMPLIANCE, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AFFILIATES, OR LICENSORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS OF PROFITS, GOODWILL, DATA, BUSINESS OPPORTUNITIES, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR IN CONNECTION WITH:</p>
    <ul>
      <li>Your access to or use of, or inability to access or use, the Service;</li>
      <li>Any information, content, or materials obtained through the Service;</li>
      <li>Any reliance on compliance reports, document templates, audit results, or other information provided through the Service;</li>
      <li>Any errors, inaccuracies, or omissions in the information provided;</li>
      <li>Any unauthorized access to or alteration of your data;</li>
      <li>Any other matter relating to the Service.</li>
    </ul>
    <p>IN NO EVENT SHALL THE COMPANY'S TOTAL AGGREGATE LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THE SERVICE EXCEED THE TOTAL AMOUNT PAID BY YOU TO THE COMPANY IN THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM. IF YOU HAVE NOT PAID ANY AMOUNTS TO THE COMPANY, THE COMPANY'S TOTAL LIABILITY SHALL NOT EXCEED FIFTY DOLLARS ($50.00).</p>
    <p>SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IN SUCH JURISDICTIONS, THE LIMITATIONS SET FORTH ABOVE SHALL APPLY TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW.</p>

    <h2>9. Indemnification</h2>
    <p>You agree to indemnify, defend, and hold harmless Vernen Legal Compliance, its officers, directors, employees, agents, and affiliates from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or in connection with: (a) your use of the Service; (b) your violation of these Terms; (c) your violation of any applicable law or regulation; (d) your reliance on information obtained through the Service; or (e) any claim by a third party arising from your use of the Service or any Generated Document.</p>

    <h2>10. Payment Terms</h2>
    <p>Certain features of the Service require payment. All payments are processed through Stripe, Inc., a third-party payment processor. By purchasing a paid product or subscription, you agree to Stripe's terms of service in addition to these Terms. The Company does not directly store or process credit card numbers.</p>
    <p><strong>Refund Policy:</strong> If you have purchased a compliance report and have not accessed or downloaded the report, you may request a full refund within seven (7) days of purchase by contacting us at hello@vernenlegal.com. Once a report has been accessed or downloaded, it is considered delivered and no refund will be issued. Subscription-based products may be canceled at any time, but no prorated refunds will be issued for the current billing period.</p>
    <p><strong>Pricing:</strong> The Company reserves the right to change pricing at any time. Any price changes will not affect existing orders or active subscription periods.</p>

    <h2>11. Intellectual Property</h2>
    <p>All content, features, functionality, text, graphics, logos, trademarks, service marks, trade names, and other intellectual property displayed on or available through the Service, including but not limited to Vernen Legal Compliance&trade;, REGULIS&trade;, Persona Citizen&trade;, CITIZEN&trade;, and all associated Persona Citizen names and marks, are the exclusive property of Vernen Legal Compliance or its licensors and are protected by United States and international intellectual property laws. You may not copy, reproduce, distribute, transmit, display, perform, create derivative works from, or otherwise exploit any content from the Service without the prior written consent of the Company.</p>

    <h2>12. Privacy</h2>
    <p>Your use of the Service is also governed by our <a href="/legal/privacy">Privacy Policy</a>, which describes how we collect, use, and protect your personal information. By using the Service, you consent to the collection and use of your information as described in the Privacy Policy.</p>

    <h2>13. Modifications to Terms</h2>
    <p>The Company reserves the right to modify, amend, or update these Terms at any time, in its sole discretion. If we make material changes to these Terms, we will update the "Effective Date" at the top of this page and may notify you by email or by posting a prominent notice on the Service. Your continued use of the Service after any modifications to the Terms constitutes your acceptance of the revised Terms. It is your responsibility to review these Terms periodically for changes.</p>

    <h2>14. Governing Law</h2>
    <p>These Terms shall be governed by and construed in accordance with the laws of the State of California, United States of America, without regard to its conflict of law principles. Any legal action or proceeding arising out of or relating to these Terms or the Service shall be brought exclusively in the state or federal courts located in the State of California, and you hereby consent to the personal jurisdiction of such courts.</p>

    <h2>15. Dispute Resolution</h2>
    <p><strong>Binding Arbitration:</strong> Any dispute, controversy, or claim arising out of or relating to these Terms or the Service, including the determination of the scope or applicability of this agreement to arbitrate, shall be determined by binding arbitration administered by JAMS pursuant to its Comprehensive Arbitration Rules and Procedures. The arbitration shall take place in the State of California. The arbitrator's decision shall be final and binding and may be entered as a judgment in any court of competent jurisdiction.</p>
    <p><strong>Class Action Waiver:</strong> YOU AND THE COMPANY AGREE THAT EACH PARTY MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS, CONSOLIDATED, OR REPRESENTATIVE PROCEEDING. THE ARBITRATOR MAY NOT CONSOLIDATE MORE THAN ONE PERSON'S CLAIMS AND MAY NOT OTHERWISE PRESIDE OVER ANY FORM OF A REPRESENTATIVE OR CLASS PROCEEDING.</p>
    <p><strong>Exception:</strong> Notwithstanding the foregoing, either party may seek injunctive or other equitable relief in any court of competent jurisdiction to prevent the actual or threatened infringement, misappropriation, or violation of intellectual property rights.</p>

    <h2>16. Severability</h2>
    <p>If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be modified to the minimum extent necessary to make it valid, legal, and enforceable, or if modification is not possible, such provision shall be severed from these Terms, and the remaining provisions shall continue in full force and effect.</p>

    <h2>17. Entire Agreement</h2>
    <p>These Terms, together with the <a href="/legal/privacy">Privacy Policy</a>, constitute the entire agreement between you and Vernen Legal Compliance with respect to your use of the Service and supersede all prior or contemporaneous communications, proposals, representations, understandings, and agreements, whether oral or written, between you and the Company regarding the Service.</p>

    <h2>18. Contact</h2>
    <p>If you have any questions about these Terms of Service, please contact us at:</p>
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

export function serveTermsOfService(): Response {
  return new Response(TERMS_HTML, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

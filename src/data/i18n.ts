/**
 * VERNEN i18n - 13-Language UI String Bundles
 * Auto-generated from Claude Desktop BUILD_2026-02-28 i18n source files.
 *
 * Languages: en, es, zh, vi, ko, ar, tl, ru, pt, ht, so, ti, am
 * (c) 2024-2026 Michael Vernen Thomas Hartmann. All Rights Reserved.
 */

export const LANGUAGE_META: Record<string, { name: string; nativeName: string; direction: string }> = {
  en: { name: "English", nativeName: "English", direction: "ltr" },
  es: { name: "Spanish", nativeName: "Espanol", direction: "ltr" },
  zh: { name: "Chinese (Simplified)", nativeName: "Chinese", direction: "ltr" },
  vi: { name: "Vietnamese", nativeName: "Vietnamese", direction: "ltr" },
  ko: { name: "Korean", nativeName: "Korean", direction: "ltr" },
  ar: { name: "Arabic", nativeName: "Arabic", direction: "rtl" },
  tl: { name: "Tagalog", nativeName: "Tagalog", direction: "ltr" },
  ru: { name: "Russian", nativeName: "Russian", direction: "ltr" },
  pt: { name: "Portuguese", nativeName: "Portuguese", direction: "ltr" },
  ht: { name: "Haitian Creole", nativeName: "Haitian Creole", direction: "ltr" },
  so: { name: "Somali", nativeName: "Soomaali", direction: "ltr" },
  ti: { name: "Tigrinya", nativeName: "Tigrinya", direction: "ltr" },
  am: { name: "Amharic", nativeName: "Amharic", direction: "ltr" },
};

export const SUPPORTED_LANGUAGES = ["en","es","zh","vi","ko","ar","tl","ru","pt","ht","so","ti","am"] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

export function isSupported(lang: string): lang is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
}

// All language bundles keyed by language code
export const I18N_BUNDLES: Record<string, unknown> = {
  en: {
  "__meta": {
    "version": "1.0.0",
    "language": "en",
    "languageName": "English",
    "direction": "ltr",
    "copyright": "© 2024–2026 Michael Vernen Thomas Hartmann. All Rights Reserved.",
    "lastUpdated": "2026-02-28"
  },

  "app": {
    "title": "VERNEN™",
    "tagline": "Multilingual Legal Compliance Platform",
    "loading": "Loading…",
    "error": "Something went wrong",
    "retry": "Try Again",
    "back": "Back",
    "next": "Next",
    "previous": "Previous",
    "save": "Save",
    "cancel": "Cancel",
    "close": "Close",
    "export": "Export",
    "print": "Print",
    "download": "Download",
    "search": "Search",
    "clear": "Clear",
    "reset": "Reset",
    "confirm": "Confirm",
    "delete": "Delete",
    "edit": "Edit",
    "add": "Add",
    "remove": "Remove",
    "select": "Select",
    "required": "Required",
    "optional": "Optional",
    "yes": "Yes",
    "no": "No",
    "none": "None",
    "all": "All",
    "other": "Other",
    "unknown": "Unknown",
    "notAvailable": "N/A"
  },

  "nav": {
    "dashboard": "Dashboard",
    "documentNavigator": "Document Navigator",
    "validation": "Validation",
    "filingGuide": "Filing Guide",
    "audit": "Audit Report",
    "assembly": "Document Assembly",
    "settings": "Settings",
    "help": "Help",
    "collapse": "Collapse sidebar",
    "expand": "Expand sidebar"
  },

  "dashboard": {
    "welcome": "Welcome to VERNEN™",
    "subtitle": "Choose a module to begin",
    "cards": {
      "gdn": {
        "title": "Document Navigator",
        "desc": "Browse and fill Judicial Council forms with guided annotations"
      },
      "validation": {
        "title": "Pre-Filing Validation",
        "desc": "Check forms for errors, missing fields, and compliance issues"
      },
      "filing": {
        "title": "Filing Guide",
        "desc": "Court-specific instructions, fees, and service requirements"
      },
      "audit": {
        "title": "Audit Report",
        "desc": "Generate compliance documentation and risk assessments"
      },
      "assembly": {
        "title": "Document Assembly",
        "desc": "Build multi-form filing packages with automatic data propagation"
      }
    }
  },

  "gdn": {
    "title": "Guided Document Navigator",
    "selectCategory": "Select a category",
    "selectForm": "Select a form",
    "searchForms": "Search forms…",
    "fieldAnnotation": "Field Guidance",
    "legalDefinition": "Legal Definition",
    "commonMistakes": "Common Mistakes",
    "statutoryRef": "Statutory Reference",
    "categories": {
      "family_law": "Family Law",
      "domestic_violence": "Domestic Violence",
      "custody": "Child Custody & Visitation",
      "support": "Child & Spousal Support",
      "fee_waiver": "Fee Waiver",
      "small_claims": "Small Claims",
      "civil_harassment": "Civil Harassment",
      "elder_abuse": "Elder/Dependent Adult Abuse",
      "appeals": "Appeals",
      "general": "General Use"
    },
    "noResults": "No forms match your search.",
    "formFields": "Form Fields",
    "requiredFields": "Required Fields",
    "optionalFields": "Optional Fields",
    "piiWarning": "This field contains personally identifiable information (PII)"
  },

  "validation": {
    "title": "Pre-Filing Validation",
    "runValidation": "Run Validation",
    "revalidate": "Re-Validate",
    "selectForms": "Select forms to validate",
    "overallScore": "Overall Compliance Score",
    "filingReady": "Filing Ready",
    "needsReview": "Needs Review",
    "notReady": "Not Ready",
    "findings": "Findings",
    "noFindings": "No issues found — form is ready for filing.",
    "severity": {
      "critical": "Critical",
      "error": "Error",
      "warning": "Warning",
      "info": "Info"
    },
    "categories": {
      "completeness": "Completeness",
      "format": "Format",
      "compliance": "Compliance",
      "deadline": "Deadline",
      "crossForm": "Cross-Form",
      "service": "Service",
      "procedural": "Procedural"
    },
    "messages": {
      "requiredMissing": "Required field is missing",
      "invalidFormat": "Field format is invalid",
      "deadlinePassed": "Filing deadline may have passed",
      "serviceIncomplete": "Proof of service is incomplete",
      "crossFormMismatch": "Data does not match across forms"
    }
  },

  "filingGuide": {
    "title": "Filing Guide",
    "selectCounty": "Select your county",
    "courtInfo": "Court Information",
    "filingFees": "Filing Fees",
    "serviceReqs": "Service Requirements",
    "deadlines": "Deadlines",
    "eFiling": "E-Filing",
    "inPerson": "In-Person Filing",
    "byMail": "Filing by Mail",
    "hours": "Court Hours",
    "address": "Court Address",
    "phone": "Phone",
    "feeWaivable": "Fee Waiver Eligible",
    "counties": {
      "alameda": "Alameda County",
      "solano": "Solano County",
      "marin": "Marin County",
      "san_francisco": "San Francisco County",
      "contra_costa": "Contra Costa County"
    },
    "serviceTypes": {
      "personal": "Personal Service",
      "mail": "Service by Mail",
      "electronic": "Electronic Service"
    }
  },

  "audit": {
    "title": "Audit Report",
    "generate": "Generate Report",
    "regenerate": "Regenerate",
    "overallRisk": "Overall Risk Level",
    "findings": "Audit Findings",
    "recommendations": "Recommendations",
    "riskLevels": {
      "critical": "Critical Risk",
      "high": "High Risk",
      "medium": "Medium Risk",
      "low": "Low Risk",
      "info": "Informational"
    },
    "categories": {
      "completeness": "Completeness",
      "accuracy": "Accuracy",
      "compliance": "Statutory Compliance",
      "service": "Service of Process",
      "deadlines": "Filing Deadlines",
      "crossForm": "Cross-Form Consistency",
      "procedural": "Procedural Requirements"
    },
    "summary": "Executive Summary",
    "details": "Detailed Findings",
    "noFindings": "No audit findings — documents meet compliance standards."
  },

  "assembly": {
    "title": "Document Assembly",
    "subtitle": "Build multi-form filing packages with automatic cross-form data propagation.",
    "tabs": {
      "parties": "Parties",
      "case": "Case Info",
      "children": "Children",
      "package": "Package Builder",
      "review": "Review & Export"
    },
    "petitioner": "Petitioner (Filing Party)",
    "respondent": "Respondent (Other Party)",
    "caseInfo": "Case Information",
    "children": {
      "title": "Minor Children",
      "add": "Add Child",
      "remove": "Remove",
      "empty": "No children added yet.",
      "emptyHint": "Add children if filing custody, visitation, or support forms.",
      "child": "Child"
    },
    "package": {
      "title": "Select Filing Package",
      "forms": "forms",
      "formsInPackage": "Forms in this package:",
      "types": {
        "dissolution": "Dissolution of Marriage",
        "custody_rfo": "Custody RFO Package",
        "dvro": "DV Restraining Order",
        "fee_waiver": "Fee Waiver Package",
        "custody_modification": "Custody Modification",
        "support_modification": "Support Modification",
        "contempt": "Contempt Proceeding",
        "small_claims": "Small Claims",
        "appeal": "Appeal Package"
      }
    },
    "review": {
      "completeness": "Completeness",
      "readyForAssembly": "Ready for Assembly",
      "partiallyComplete": "Partially Complete",
      "needsMoreInfo": "Needs More Information",
      "consistencyCheck": "Cross-Form Consistency",
      "runCheck": "Run Check",
      "allConsistent": "All cross-form fields are consistent.",
      "summary": "Assembly Summary"
    },
    "fields": {
      "fullName": "Full Legal Name",
      "address": "Street Address",
      "city": "City",
      "state": "State",
      "zip": "ZIP Code",
      "phone": "Phone",
      "email": "Email",
      "dob": "Date of Birth",
      "attorney": "Attorney Name (or \"In Pro Per\")",
      "barNumber": "State Bar Number",
      "caseNumber": "Case Number",
      "county": "County",
      "courtName": "Court Name",
      "courtAddress": "Court Address",
      "department": "Department",
      "filingDate": "Filing Date",
      "hearingDate": "Hearing Date",
      "hearingTime": "Hearing Time",
      "childName": "Child Full Name",
      "childDob": "Date of Birth",
      "childAge": "Current Age",
      "residessWith": "Currently Resides With"
    }
  },

  "settings": {
    "title": "Settings",
    "language": "Language",
    "selectLanguage": "Select language",
    "accessibility": "Accessibility",
    "highContrast": "High Contrast Mode",
    "largeText": "Large Text",
    "reducedMotion": "Reduced Motion",
    "focusIndicators": "Enhanced Focus Indicators",
    "errorLogs": "Error Logs",
    "exportLogs": "Export Error Logs",
    "clearLogs": "Clear Logs",
    "about": "About"
  },

  "help": {
    "title": "Help",
    "thisPage": "This Page",
    "shortcuts": "Shortcuts",
    "about": "About",
    "gettingStarted": "Getting Started",
    "closePanel": "Close help panel"
  },

  "export": {
    "title": "Export",
    "formats": {
      "html": "HTML (Print-Ready)",
      "json": "JSON",
      "csv": "CSV",
      "markdown": "Markdown",
      "text": "Plain Text"
    },
    "options": {
      "maskPII": "Mask PII Fields",
      "includeMetadata": "Include Metadata",
      "includeCitations": "Include Statutory Citations"
    },
    "success": "Export completed successfully.",
    "error": "Export failed. Please try again."
  },

  "errors": {
    "generic": "An unexpected error occurred.",
    "network": "Network error. Please check your connection.",
    "formLoad": "Failed to load form data.",
    "validationFailed": "Validation could not be completed.",
    "exportFailed": "Export failed.",
    "sessionExpired": "Your session has expired. Data has been saved.",
    "storageQuota": "Storage limit reached. Please export and clear old data.",
    "tryAgain": "Try Again",
    "reportIssue": "Report Issue",
    "goToDashboard": "Return to Dashboard"
  },

  "a11y": {
    "skipToMain": "Skip to main content",
    "skipToForm": "Skip to form section",
    "skipToNav": "Skip to navigation",
    "skipToResults": "Skip to results",
    "formProgress": "Form is {percent}% complete",
    "fieldError": "Error: {message}",
    "fieldCleared": "Error cleared",
    "newResults": "Results updated",
    "loading": "Loading, please wait"
  },

  "legal": {
    "disclaimer": "VERNEN™ provides legal form guidance and compliance checking. It does not provide legal advice. For legal counsel, consult a licensed attorney in your jurisdiction.",
    "copyright": "© 2024–2026 Michael Vernen Thomas Hartmann. All Rights Reserved.",
    "trademark": "VERNEN™ is a trademark of Michael Vernen Thomas Hartmann.",
    "ipManifest": "IP Manifest Filed February 2, 2026."
  },

  "auth": {
    "login": "Log In",
    "register": "Create Account",
    "logout": "Log Out",
    "email": "Email Address",
    "password": "Password",
    "confirmPassword": "Confirm Password",
    "displayName": "Display Name",
    "forgotPassword": "Forgot Password?",
    "resetPassword": "Reset Password",
    "resetSent": "Password reset email sent. Check your inbox.",
    "loginSuccess": "Logged in successfully.",
    "registerSuccess": "Account created. Welcome to VERNEN™.",
    "logoutSuccess": "Logged out.",
    "loginError": "Login failed. Check your email and password.",
    "registerError": "Registration failed. Please try again.",
    "sessionExpired": "Your session has expired. Please log in again.",
    "requiredField": "This field is required.",
    "invalidEmail": "Please enter a valid email address.",
    "passwordMinLength": "Password must be at least 8 characters.",
    "passwordMismatch": "Passwords do not match.",
    "alreadyHaveAccount": "Already have an account?",
    "noAccount": "Don't have an account?",
    "tier": {
      "guest": "Guest",
      "free": "Free",
      "pro": "Pro",
      "advocate": "Advocate"
    },
    "tierRequired": "This feature requires a {tier} subscription.",
    "upgradePrompt": "Upgrade to {tier} to access this feature.",
    "upgradeNow": "Upgrade Now"
  },

  "payments": {
    "pricing": "Pricing",
    "plans": "Plans",
    "currentPlan": "Current Plan",
    "monthly": "Monthly",
    "annual": "Annual",
    "perMonth": "/month",
    "perYear": "/year",
    "save": "Save {percent}%",
    "freePlan": {
      "name": "Free",
      "description": "Basic form guidance for getting started.",
      "price": "$0"
    },
    "proPlan": {
      "name": "Pro",
      "description": "Full audit, export, and multilingual support.",
      "priceMonthly": "$19.99",
      "priceAnnual": "$191.88"
    },
    "advocatePlan": {
      "name": "Advocate",
      "description": "Complete platform with document assembly and filing.",
      "priceMonthly": "$39.99",
      "priceAnnual": "$383.88"
    },
    "subscribe": "Subscribe",
    "upgrade": "Upgrade",
    "downgrade": "Downgrade",
    "manageBilling": "Manage Billing",
    "cancelSubscription": "Cancel Subscription",
    "checkoutRedirect": "Redirecting to secure checkout...",
    "checkoutSuccess": "Subscription activated successfully!",
    "checkoutCanceled": "Checkout canceled.",
    "paymentFailed": "Payment failed. Please update your payment method.",
    "subscriptionActive": "Your subscription is active until {date}.",
    "subscriptionCanceled": "Your subscription will end on {date}."
  },

  "esignature": {
    "title": "E-Signature",
    "signHere": "Sign Here",
    "drawSignature": "Draw Signature",
    "typeSignature": "Type Signature",
    "uploadSignature": "Upload Signature",
    "clearSignature": "Clear",
    "acceptSignature": "Accept Signature",
    "signatureRequired": "Signature required on this field.",
    "wetInkRequired": "This field requires a wet ink signature. Print, sign, and scan.",
    "notarizationRequired": "This field requires notarization.",
    "intentDeclaration": "By signing, I declare under penalty of perjury under the laws of the State of California that the information in this document is true and correct.",
    "consentCheckbox": "I understand this electronic signature has the same legal effect as a handwritten signature (Cal. Civ. Code § 1633.7).",
    "signed": "Signed",
    "unsigned": "Not Signed",
    "signedBy": "Signed by {name} on {date}",
    "revoke": "Revoke Signature",
    "revokeConfirm": "Are you sure you want to revoke this signature?",
    "documentChanged": "Document modified after signing. Re-signature required.",
    "certificate": "Signature Certificate",
    "viewCertificate": "View Signature Certificate",
    "legalBasis": "Cal. Civ. Code § 1633 (UETA)"
  },

  "filing": {
    "title": "File with Court",
    "createPackage": "Create Filing Package",
    "filingType": "Filing Type",
    "selectCourt": "Select Court",
    "caseNumber": "Case Number",
    "newCase": "New Case (No Case Number)",
    "documents": "Documents",
    "addDocument": "Add Document",
    "proofOfService": "Proof of Service",
    "filingFee": "Filing Fee",
    "feeWaiver": "Fee Waiver Granted (FW-003)",
    "estimatedFee": "Estimated fee: {amount}",
    "validate": "Validate Package",
    "validationPassed": "Filing package is ready to submit.",
    "validationFailed": "Filing package has {count} error(s).",
    "submit": "Submit to Court",
    "submitConfirm": "Submit this filing package to {court}?",
    "submitting": "Submitting to court...",
    "submitted": "Filing submitted successfully.",
    "confirmationNumber": "Confirmation: {number}",
    "checkStatus": "Check Status",
    "status": {
      "draft": "Draft",
      "ready": "Ready to Submit",
      "submitting": "Submitting",
      "submitted": "Submitted",
      "accepted": "Under Review",
      "rejected": "Rejected",
      "filed": "Filed",
      "error": "Error"
    },
    "rejected": "Filing rejected: {reason}",
    "filedStamped": "Filed-stamped copy available.",
    "downloadFiled": "Download Filed Copy",
    "history": "Filing History",
    "noFilings": "No filings yet.",
    "wetInkWarning": "This form has fields requiring wet ink signatures. Print, sign, and scan before filing."
  },

  "traceability": {
    "title": "Statutory Traceability Log",
    "description": "Record of all statutory sources consulted during this audit.",
    "sources": "Sources Consulted",
    "statutes": "Statutes",
    "regulations": "Regulations",
    "rulesOfCourt": "Rules of Court",
    "federalCode": "Federal Code",
    "contentHash": "Content Hash (SHA-256)",
    "retrievedAt": "Retrieved At",
    "linkedFinding": "Linked Finding",
    "logFinalized": "Traceability log finalized and locked.",
    "viewLog": "View Traceability Log",
    "downloadLog": "Download Traceability Log (PDF)",
    "compliance": "This log satisfies transparency requirements under EU AI Act Art. 13/14, Colorado SB 24-205, and California SB 942."
  },

  "remediation": {
    "title": "Remediation Playbook",
    "description": "Step-by-step instructions to resolve audit findings.",
    "summary": "Summary",
    "totalSteps": "{count} steps to complete",
    "estimatedTime": "Estimated time: {minutes} minutes",
    "phase": "Phase {number}: {name}",
    "phases": {
      "critical": "Critical Fixes",
      "high": "High Priority",
      "compliance": "Compliance Gaps",
      "bestPractice": "Best Practice"
    },
    "step": "Step {number}",
    "priority": "Priority",
    "complexity": {
      "simple": "Simple (~ 2 min)",
      "moderate": "Moderate (~ 10 min)",
      "complex": "Complex (~ 25 min)",
      "requires_review": "Requires Attorney Review (~ 60 min)"
    },
    "goToField": "Go to Field",
    "markComplete": "Mark Complete",
    "skip": "Skip",
    "undo": "Undo",
    "progress": "{completed} of {total} steps completed ({percent}%)",
    "allComplete": "All remediation steps completed! Filing readiness achieved.",
    "nextStep": "Next Step",
    "filingReady": "Filing Ready",
    "notReady": "Not Filing Ready — {remaining} steps remaining"
  }
},
  es: {
  "__meta": {
    "version": "1.0.0",
    "language": "es",
    "languageName": "Spanish",
    "direction": "ltr",
    "copyright": "© 2024–2026 Michael Vernen Thomas Hartmann. All Rights Reserved.",
    "lastUpdated": "2026-02-28",
    "completeness": "partial",
    "fallback": "en"
  },
  "app": {
    "title": "VERNEN™",
    "tagline": "Plataforma Multilingüe de Cumplimiento Legal",
    "loading": "Cargando…",
    "error": "Algo salió mal",
    "retry": "Intentar de Nuevo",
    "back": "Atrás",
    "next": "Siguiente",
    "previous": "Anterior",
    "save": "Guardar",
    "cancel": "Cancelar",
    "close": "Cerrar",
    "export": "Exportar",
    "print": "Imprimir",
    "download": "Descargar",
    "search": "Buscar",
    "clear": "Borrar",
    "reset": "Restablecer",
    "confirm": "Confirmar",
    "delete": "Eliminar",
    "edit": "Editar",
    "add": "Agregar",
    "remove": "Quitar",
    "select": "Seleccionar",
    "required": "Obligatorio",
    "optional": "Opcional",
    "yes": "Sí",
    "no": "No",
    "none": "Ninguno",
    "all": "Todos",
    "other": "Otro",
    "unknown": "Desconocido",
    "notAvailable": "N/D"
  },
  "nav": {
    "dashboard": "Panel Principal",
    "documentNavigator": "Navegador de Documentos",
    "validation": "Validación",
    "filingGuide": "Guía de Presentación",
    "audit": "Informe de Auditoría",
    "assembly": "Ensamblaje de Documentos",
    "settings": "Configuración",
    "help": "Ayuda",
    "collapse": "Contraer barra lateral",
    "expand": "Expandir barra lateral"
  },
  "dashboard": {
    "welcome": "Bienvenido a VERNEN™",
    "subtitle": "Elija un módulo para comenzar",
    "cards": {
      "gdn": {
        "title": "Navegador de Documentos",
        "desc": "Navegue y complete formularios del Consejo Judicial con anotaciones guiadas"
      },
      "validation": {
        "title": "Validación Previa",
        "desc": "Verifique formularios en busca de errores, campos faltantes y problemas de cumplimiento"
      },
      "filing": {
        "title": "Guía de Presentación",
        "desc": "Instrucciones específicas del tribunal, tarifas y requisitos de notificación"
      },
      "audit": {
        "title": "Informe de Auditoría",
        "desc": "Genere documentación de cumplimiento y evaluaciones de riesgo"
      },
      "assembly": {
        "title": "Ensamblaje de Documentos",
        "desc": "Construya paquetes de presentación con propagación automática de datos"
      }
    }
  },
  "gdn": {
    "title": "Guided Document Navigator",
    "selectCategory": "Select a category",
    "selectForm": "Select a form",
    "searchForms": "Search forms…",
    "fieldAnnotation": "Field Guidance",
    "legalDefinition": "Legal Definition",
    "commonMistakes": "Common Mistakes",
    "statutoryRef": "Statutory Reference",
    "categories": {
      "family_law": "Family Law",
      "domestic_violence": "Domestic Violence",
      "custody": "Child Custody & Visitation",
      "support": "Child & Spousal Support",
      "fee_waiver": "Fee Waiver",
      "small_claims": "Small Claims",
      "civil_harassment": "Civil Harassment",
      "elder_abuse": "Elder/Dependent Adult Abuse",
      "appeals": "Appeals",
      "general": "General Use"
    },
    "noResults": "No forms match your search.",
    "formFields": "Form Fields",
    "requiredFields": "Required Fields",
    "optionalFields": "Optional Fields",
    "piiWarning": "This field contains personally identifiable information (PII)"
  },
  "validation": {
    "title": "Validación Previa a la Presentación",
    "runValidation": "Ejecutar Validación",
    "revalidate": "Re-Validar",
    "selectForms": "Select forms to validate",
    "overallScore": "Puntuación General de Cumplimiento",
    "filingReady": "Listo para Presentar",
    "needsReview": "Necesita Revisión",
    "notReady": "No Está Listo",
    "findings": "Hallazgos",
    "noFindings": "No se encontraron problemas — el formulario está listo.",
    "severity": {
      "critical": "Crítico",
      "error": "Error",
      "warning": "Advertencia",
      "info": "Info"
    },
    "categories": {
      "completeness": "Completeness",
      "format": "Format",
      "compliance": "Compliance",
      "deadline": "Deadline",
      "crossForm": "Cross-Form",
      "service": "Service",
      "procedural": "Procedural"
    },
    "messages": {
      "requiredMissing": "Required field is missing",
      "invalidFormat": "Field format is invalid",
      "deadlinePassed": "Filing deadline may have passed",
      "serviceIncomplete": "Proof of service is incomplete",
      "crossFormMismatch": "Data does not match across forms"
    }
  },
  "filingGuide": {
    "title": "Filing Guide",
    "selectCounty": "Select your county",
    "courtInfo": "Court Information",
    "filingFees": "Filing Fees",
    "serviceReqs": "Service Requirements",
    "deadlines": "Deadlines",
    "eFiling": "E-Filing",
    "inPerson": "In-Person Filing",
    "byMail": "Filing by Mail",
    "hours": "Court Hours",
    "address": "Court Address",
    "phone": "Phone",
    "feeWaivable": "Fee Waiver Eligible",
    "counties": {
      "alameda": "Alameda County",
      "solano": "Solano County",
      "marin": "Marin County",
      "san_francisco": "San Francisco County",
      "contra_costa": "Contra Costa County"
    },
    "serviceTypes": {
      "personal": "Personal Service",
      "mail": "Service by Mail",
      "electronic": "Electronic Service"
    }
  },
  "audit": {
    "title": "Audit Report",
    "generate": "Generate Report",
    "regenerate": "Regenerate",
    "overallRisk": "Overall Risk Level",
    "findings": "Audit Findings",
    "recommendations": "Recommendations",
    "riskLevels": {
      "critical": "Critical Risk",
      "high": "High Risk",
      "medium": "Medium Risk",
      "low": "Low Risk",
      "info": "Informational"
    },
    "categories": {
      "completeness": "Completeness",
      "accuracy": "Accuracy",
      "compliance": "Statutory Compliance",
      "service": "Service of Process",
      "deadlines": "Filing Deadlines",
      "crossForm": "Cross-Form Consistency",
      "procedural": "Procedural Requirements"
    },
    "summary": "Executive Summary",
    "details": "Detailed Findings",
    "noFindings": "No audit findings — documents meet compliance standards."
  },
  "assembly": {
    "title": "Ensamblaje de Documentos",
    "subtitle": "Construya paquetes de presentación con propagación automática de datos entre formularios.",
    "tabs": {
      "parties": "Partes",
      "case": "Caso",
      "children": "Hijos",
      "package": "Paquete",
      "review": "Revisión y Exportación"
    },
    "petitioner": "Peticionario (Parte que Presenta)",
    "respondent": "Demandado (Otra Parte)",
    "caseInfo": "Case Information",
    "children": {
      "title": "Hijos Menores",
      "add": "Agregar Hijo",
      "remove": "Quitar",
      "empty": "No se han agregado hijos.",
      "emptyHint": "Add children if filing custody, visitation, or support forms.",
      "child": "Hijo"
    },
    "package": {
      "title": "Select Filing Package",
      "forms": "forms",
      "formsInPackage": "Forms in this package:",
      "types": {
        "dissolution": "Dissolution of Marriage",
        "custody_rfo": "Custody RFO Package",
        "dvro": "DV Restraining Order",
        "fee_waiver": "Fee Waiver Package",
        "custody_modification": "Custody Modification",
        "support_modification": "Support Modification",
        "contempt": "Contempt Proceeding",
        "small_claims": "Small Claims",
        "appeal": "Appeal Package"
      }
    },
    "review": {
      "completeness": "Completeness",
      "readyForAssembly": "Ready for Assembly",
      "partiallyComplete": "Partially Complete",
      "needsMoreInfo": "Needs More Information",
      "consistencyCheck": "Cross-Form Consistency",
      "runCheck": "Run Check",
      "allConsistent": "All cross-form fields are consistent.",
      "summary": "Assembly Summary"
    },
    "fields": {
      "fullName": "Full Legal Name",
      "address": "Street Address",
      "city": "City",
      "state": "State",
      "zip": "ZIP Code",
      "phone": "Phone",
      "email": "Email",
      "dob": "Date of Birth",
      "attorney": "Attorney Name (or \"In Pro Per\")",
      "barNumber": "State Bar Number",
      "caseNumber": "Case Number",
      "county": "County",
      "courtName": "Court Name",
      "courtAddress": "Court Address",
      "department": "Department",
      "filingDate": "Filing Date",
      "hearingDate": "Hearing Date",
      "hearingTime": "Hearing Time",
      "childName": "Child Full Name",
      "childDob": "Date of Birth",
      "childAge": "Current Age",
      "residessWith": "Currently Resides With"
    }
  },
  "settings": {
    "title": "Settings",
    "language": "Language",
    "selectLanguage": "Select language",
    "accessibility": "Accessibility",
    "highContrast": "High Contrast Mode",
    "largeText": "Large Text",
    "reducedMotion": "Reduced Motion",
    "focusIndicators": "Enhanced Focus Indicators",
    "errorLogs": "Error Logs",
    "exportLogs": "Export Error Logs",
    "clearLogs": "Clear Logs",
    "about": "About"
  },
  "help": {
    "title": "Help",
    "thisPage": "This Page",
    "shortcuts": "Shortcuts",
    "about": "About",
    "gettingStarted": "Getting Started",
    "closePanel": "Close help panel"
  },
  "export": {
    "title": "Export",
    "formats": {
      "html": "HTML (Print-Ready)",
      "json": "JSON",
      "csv": "CSV",
      "markdown": "Markdown",
      "text": "Plain Text"
    },
    "options": {
      "maskPII": "Mask PII Fields",
      "includeMetadata": "Include Metadata",
      "includeCitations": "Include Statutory Citations"
    },
    "success": "Export completed successfully.",
    "error": "Export failed. Please try again."
  },
  "errors": {
    "generic": "Ocurrió un error inesperado.",
    "network": "Error de red. Verifique su conexión.",
    "formLoad": "Failed to load form data.",
    "validationFailed": "Validation could not be completed.",
    "exportFailed": "Export failed.",
    "sessionExpired": "Your session has expired. Data has been saved.",
    "storageQuota": "Storage limit reached. Please export and clear old data.",
    "tryAgain": "Try Again",
    "reportIssue": "Report Issue",
    "goToDashboard": "Return to Dashboard"
  },
  "a11y": {
    "skipToMain": "Skip to main content",
    "skipToForm": "Skip to form section",
    "skipToNav": "Skip to navigation",
    "skipToResults": "Skip to results",
    "formProgress": "Form is {percent}% complete",
    "fieldError": "Error: {message}",
    "fieldCleared": "Error cleared",
    "newResults": "Results updated",
    "loading": "Loading, please wait"
  },
  "legal": {
    "disclaimer": "VERNEN™ proporciona orientación y verificación de cumplimiento para formularios legales. No proporciona asesoramiento legal. Para asesoramiento legal, consulte a un abogado licenciado en su jurisdicción.",
    "copyright": "© 2024–2026 Michael Vernen Thomas Hartmann. Todos los Derechos Reservados.",
    "trademark": "VERNEN™ es una marca registrada de Michael Vernen Thomas Hartmann.",
    "ipManifest": "IP Manifest Filed February 2, 2026."
  },
  "auth": {
    "login": "Iniciar Sesión",
    "register": "Crear Cuenta",
    "logout": "Cerrar Sesión",
    "email": "Correo Electrónico",
    "password": "Contraseña",
    "confirmPassword": "Confirmar Contraseña",
    "displayName": "Nombre",
    "forgotPassword": "¿Olvidó su Contraseña?",
    "resetPassword": "Restablecer Contraseña",
    "resetSent": "Correo de restablecimiento enviado.",
    "loginSuccess": "Sesión iniciada exitosamente.",
    "registerSuccess": "Cuenta creada. Bienvenido a VERNEN™.",
    "logoutSuccess": "Sesión cerrada.",
    "loginError": "Error al iniciar sesión. Verifique su correo y contraseña.",
    "registerError": "Error al registrarse. Intente de nuevo.",
    "sessionExpired": "Su sesión ha expirado. Inicie sesión de nuevo.",
    "requiredField": "Este campo es obligatorio.",
    "invalidEmail": "Ingrese un correo electrónico válido.",
    "passwordMinLength": "La contraseña debe tener al menos 8 caracteres.",
    "passwordMismatch": "Las contraseñas no coinciden.",
    "alreadyHaveAccount": "¿Ya tiene una cuenta?",
    "noAccount": "¿No tiene cuenta?",
    "tier": {
      "guest": "Invitado",
      "free": "Gratuito",
      "pro": "Pro",
      "advocate": "Abogado"
    },
    "tierRequired": "Esta función requiere una suscripción {tier}.",
    "upgradePrompt": "Actualice a {tier} para acceder a esta función.",
    "upgradeNow": "Actualizar Ahora"
  },
  "payments": {
    "pricing": "Precios",
    "plans": "Planes",
    "currentPlan": "Plan Actual",
    "monthly": "Mensual",
    "annual": "Anual",
    "perMonth": "/mes",
    "perYear": "/año",
    "save": "Ahorre {percent}%",
    "freePlan": {
      "name": "Gratuito",
      "description": "Guía básica de formularios.",
      "price": "$0"
    },
    "proPlan": {
      "name": "Pro",
      "description": "Auditoría completa, exportación y soporte multilingüe.",
      "priceMonthly": "$19.99",
      "priceAnnual": "$191.88"
    },
    "advocatePlan": {
      "name": "Abogado",
      "description": "Plataforma completa con ensamblaje y presentación.",
      "priceMonthly": "$39.99",
      "priceAnnual": "$383.88"
    },
    "subscribe": "Suscribirse",
    "upgrade": "Actualizar",
    "downgrade": "Reducir Plan",
    "manageBilling": "Administrar Facturación",
    "cancelSubscription": "Cancelar Suscripción",
    "checkoutRedirect": "Redirigiendo al pago seguro...",
    "checkoutSuccess": "¡Suscripción activada!",
    "checkoutCanceled": "Pago cancelado.",
    "paymentFailed": "Pago fallido. Actualice su método de pago.",
    "subscriptionActive": "Su suscripción está activa hasta {date}.",
    "subscriptionCanceled": "Su suscripción terminará el {date}."
  },
  "esignature": {
    "title": "Firma Electrónica",
    "signHere": "Firme Aquí",
    "drawSignature": "Dibujar Firma",
    "typeSignature": "Escribir Firma",
    "uploadSignature": "Subir Firma",
    "clearSignature": "Borrar",
    "acceptSignature": "Aceptar Firma",
    "signatureRequired": "Se requiere firma en este campo.",
    "wetInkRequired": "Este campo requiere firma en tinta. Imprima, firme y escanee.",
    "notarizationRequired": "Este campo requiere notarización.",
    "intentDeclaration": "Al firmar, declaro bajo pena de perjurio según las leyes del Estado de California que la información en este documento es verdadera y correcta.",
    "consentCheckbox": "Entiendo que esta firma electrónica tiene el mismo efecto legal que una firma manuscrita (Cód. Civ. Cal. § 1633.7).",
    "signed": "Firmado",
    "unsigned": "Sin Firmar",
    "signedBy": "Firmado por {name} el {date}",
    "revoke": "Revocar Firma",
    "revokeConfirm": "¿Está seguro de revocar esta firma?",
    "documentChanged": "Documento modificado después de firmar. Se requiere nueva firma.",
    "certificate": "Certificado de Firma",
    "viewCertificate": "Ver Certificado de Firma",
    "legalBasis": "Cód. Civ. Cal. § 1633 (UETA)"
  },
  "filing": {
    "title": "Presentar al Tribunal",
    "createPackage": "Crear Paquete de Presentación",
    "filingType": "Tipo de Presentación",
    "selectCourt": "Seleccionar Tribunal",
    "caseNumber": "Número de Caso",
    "newCase": "Caso Nuevo",
    "documents": "Documentos",
    "addDocument": "Agregar Documento",
    "proofOfService": "Prueba de Notificación",
    "filingFee": "Tarifa de Presentación",
    "feeWaiver": "Exención de Tarifa Concedida (FW-003)",
    "estimatedFee": "Tarifa estimada: {amount}",
    "validate": "Validar Paquete",
    "validationPassed": "El paquete está listo.",
    "validationFailed": "El paquete tiene {count} error(es).",
    "submit": "Presentar al Tribunal",
    "submitConfirm": "¿Presentar este paquete a {court}?",
    "submitting": "Presentando...",
    "submitted": "Presentación enviada exitosamente.",
    "confirmationNumber": "Confirmación: {number}",
    "checkStatus": "Verificar Estado",
    "status": {
      "draft": "Borrador",
      "ready": "Listo",
      "submitting": "Enviando",
      "submitted": "Enviado",
      "accepted": "En Revisión",
      "rejected": "Rechazado",
      "filed": "Presentado",
      "error": "Error"
    },
    "rejected": "Presentación rechazada: {reason}",
    "filedStamped": "Copia sellada disponible.",
    "downloadFiled": "Descargar Copia Sellada",
    "history": "Historial de Presentaciones",
    "noFilings": "Sin presentaciones.",
    "wetInkWarning": "Este formulario tiene campos que requieren firma en tinta."
  },
  "traceability": {
    "title": "Registro de Trazabilidad Estatutaria",
    "description": "Registro de todas las fuentes estatutarias consultadas.",
    "sources": "Fuentes Consultadas",
    "statutes": "Estatutos",
    "regulations": "Reglamentos",
    "rulesOfCourt": "Reglas del Tribunal",
    "federalCode": "Código Federal",
    "contentHash": "Hash de Contenido (SHA-256)",
    "retrievedAt": "Recuperado En",
    "linkedFinding": "Hallazgo Vinculado",
    "logFinalized": "Registro finalizado y bloqueado.",
    "viewLog": "Ver Registro",
    "downloadLog": "Descargar Registro (PDF)",
    "compliance": "Este registro cumple con los requisitos de transparencia."
  },
  "remediation": {
    "title": "Manual de Remediación",
    "description": "Instrucciones paso a paso para resolver hallazgos.",
    "summary": "Resumen",
    "totalSteps": "{count} pasos para completar",
    "estimatedTime": "Tiempo estimado: {minutes} minutos",
    "phase": "Fase {number}: {name}",
    "phases": {
      "critical": "Correcciones Críticas",
      "high": "Alta Prioridad",
      "compliance": "Brechas de Cumplimiento",
      "bestPractice": "Mejores Prácticas"
    },
    "step": "Paso {number}",
    "priority": "Prioridad",
    "complexity": {
      "simple": "Simple (~ 2 min)",
      "moderate": "Moderado (~ 10 min)",
      "complex": "Complejo (~ 25 min)",
      "requires_review": "Requiere Revisión Legal (~ 60 min)"
    },
    "goToField": "Ir al Campo",
    "markComplete": "Marcar Completo",
    "skip": "Omitir",
    "undo": "Deshacer",
    "progress": "{completed} de {total} pasos ({percent}%)",
    "allComplete": "¡Todos los pasos completados!",
    "nextStep": "Siguiente Paso",
    "filingReady": "Listo para Presentar",
    "notReady": "No Listo — {remaining} pasos restantes"
  }
},
  zh: {
  "__meta": {
    "version": "1.0.0",
    "language": "zh",
    "languageName": "Chinese (Simplified)",
    "direction": "ltr",
    "copyright": "© 2024–2026 Michael Vernen Thomas Hartmann. All Rights Reserved.",
    "lastUpdated": "2026-02-28",
    "completeness": "partial",
    "fallback": "en"
  },
  "app": {
    "title": "VERNEN™",
    "tagline": "多语言法律合规平台",
    "loading": "加载中…",
    "error": "出现错误",
    "retry": "重试",
    "back": "返回",
    "next": "下一步",
    "previous": "上一步",
    "save": "保存",
    "cancel": "取消",
    "close": "关闭",
    "export": "导出",
    "print": "打印",
    "download": "下载",
    "search": "搜索",
    "clear": "清除",
    "reset": "重置",
    "confirm": "确认",
    "delete": "删除",
    "edit": "编辑",
    "add": "添加",
    "remove": "移除",
    "select": "选择",
    "required": "必填",
    "optional": "选填",
    "yes": "是",
    "no": "否",
    "none": "无",
    "all": "全部",
    "other": "Other",
    "unknown": "Unknown",
    "notAvailable": "N/A"
  },
  "nav": {
    "dashboard": "仪表板",
    "documentNavigator": "文档导航器",
    "validation": "验证",
    "filingGuide": "申请指南",
    "audit": "审计报告",
    "assembly": "文档组装",
    "settings": "设置",
    "help": "帮助",
    "collapse": "Collapse sidebar",
    "expand": "Expand sidebar"
  },
  "dashboard": {
    "welcome": "欢迎使用 VERNEN™",
    "subtitle": "选择一个模块开始",
    "cards": {
      "gdn": {
        "title": "文档导航器",
        "desc": "浏览并填写司法委员会表格，附带引导注释"
      },
      "validation": {
        "title": "预提交验证",
        "desc": "检查表格的错误、缺失字段和合规问题"
      },
      "filing": {
        "title": "申请指南",
        "desc": "法院特定说明、费用和送达要求"
      },
      "audit": {
        "title": "审计报告",
        "desc": "生成合规文档和风险评估"
      },
      "assembly": {
        "title": "文档组装",
        "desc": "构建多表格提交包，自动数据传播"
      }
    }
  },
  "gdn": {
    "title": "Guided Document Navigator",
    "selectCategory": "Select a category",
    "selectForm": "Select a form",
    "searchForms": "Search forms…",
    "fieldAnnotation": "Field Guidance",
    "legalDefinition": "Legal Definition",
    "commonMistakes": "Common Mistakes",
    "statutoryRef": "Statutory Reference",
    "categories": {
      "family_law": "Family Law",
      "domestic_violence": "Domestic Violence",
      "custody": "Child Custody & Visitation",
      "support": "Child & Spousal Support",
      "fee_waiver": "Fee Waiver",
      "small_claims": "Small Claims",
      "civil_harassment": "Civil Harassment",
      "elder_abuse": "Elder/Dependent Adult Abuse",
      "appeals": "Appeals",
      "general": "General Use"
    },
    "noResults": "No forms match your search.",
    "formFields": "Form Fields",
    "requiredFields": "Required Fields",
    "optionalFields": "Optional Fields",
    "piiWarning": "This field contains personally identifiable information (PII)"
  },
  "validation": {
    "title": "Pre-Filing Validation",
    "runValidation": "Run Validation",
    "revalidate": "Re-Validate",
    "selectForms": "Select forms to validate",
    "overallScore": "Overall Compliance Score",
    "filingReady": "Filing Ready",
    "needsReview": "Needs Review",
    "notReady": "Not Ready",
    "findings": "Findings",
    "noFindings": "No issues found — form is ready for filing.",
    "severity": {
      "critical": "Critical",
      "error": "Error",
      "warning": "Warning",
      "info": "Info"
    },
    "categories": {
      "completeness": "Completeness",
      "format": "Format",
      "compliance": "Compliance",
      "deadline": "Deadline",
      "crossForm": "Cross-Form",
      "service": "Service",
      "procedural": "Procedural"
    },
    "messages": {
      "requiredMissing": "Required field is missing",
      "invalidFormat": "Field format is invalid",
      "deadlinePassed": "Filing deadline may have passed",
      "serviceIncomplete": "Proof of service is incomplete",
      "crossFormMismatch": "Data does not match across forms"
    }
  },
  "filingGuide": {
    "title": "Filing Guide",
    "selectCounty": "Select your county",
    "courtInfo": "Court Information",
    "filingFees": "Filing Fees",
    "serviceReqs": "Service Requirements",
    "deadlines": "Deadlines",
    "eFiling": "E-Filing",
    "inPerson": "In-Person Filing",
    "byMail": "Filing by Mail",
    "hours": "Court Hours",
    "address": "Court Address",
    "phone": "Phone",
    "feeWaivable": "Fee Waiver Eligible",
    "counties": {
      "alameda": "Alameda County",
      "solano": "Solano County",
      "marin": "Marin County",
      "san_francisco": "San Francisco County",
      "contra_costa": "Contra Costa County"
    },
    "serviceTypes": {
      "personal": "Personal Service",
      "mail": "Service by Mail",
      "electronic": "Electronic Service"
    }
  },
  "audit": {
    "title": "Audit Report",
    "generate": "Generate Report",
    "regenerate": "Regenerate",
    "overallRisk": "Overall Risk Level",
    "findings": "Audit Findings",
    "recommendations": "Recommendations",
    "riskLevels": {
      "critical": "Critical Risk",
      "high": "High Risk",
      "medium": "Medium Risk",
      "low": "Low Risk",
      "info": "Informational"
    },
    "categories": {
      "completeness": "Completeness",
      "accuracy": "Accuracy",
      "compliance": "Statutory Compliance",
      "service": "Service of Process",
      "deadlines": "Filing Deadlines",
      "crossForm": "Cross-Form Consistency",
      "procedural": "Procedural Requirements"
    },
    "summary": "Executive Summary",
    "details": "Detailed Findings",
    "noFindings": "No audit findings — documents meet compliance standards."
  },
  "assembly": {
    "title": "Document Assembly",
    "subtitle": "Build multi-form filing packages with automatic cross-form data propagation.",
    "tabs": {
      "parties": "Parties",
      "case": "Case Info",
      "children": "Children",
      "package": "Package Builder",
      "review": "Review & Export"
    },
    "petitioner": "Petitioner (Filing Party)",
    "respondent": "Respondent (Other Party)",
    "caseInfo": "Case Information",
    "children": {
      "title": "Minor Children",
      "add": "Add Child",
      "remove": "Remove",
      "empty": "No children added yet.",
      "emptyHint": "Add children if filing custody, visitation, or support forms.",
      "child": "Child"
    },
    "package": {
      "title": "Select Filing Package",
      "forms": "forms",
      "formsInPackage": "Forms in this package:",
      "types": {
        "dissolution": "Dissolution of Marriage",
        "custody_rfo": "Custody RFO Package",
        "dvro": "DV Restraining Order",
        "fee_waiver": "Fee Waiver Package",
        "custody_modification": "Custody Modification",
        "support_modification": "Support Modification",
        "contempt": "Contempt Proceeding",
        "small_claims": "Small Claims",
        "appeal": "Appeal Package"
      }
    },
    "review": {
      "completeness": "Completeness",
      "readyForAssembly": "Ready for Assembly",
      "partiallyComplete": "Partially Complete",
      "needsMoreInfo": "Needs More Information",
      "consistencyCheck": "Cross-Form Consistency",
      "runCheck": "Run Check",
      "allConsistent": "All cross-form fields are consistent.",
      "summary": "Assembly Summary"
    },
    "fields": {
      "fullName": "Full Legal Name",
      "address": "Street Address",
      "city": "City",
      "state": "State",
      "zip": "ZIP Code",
      "phone": "Phone",
      "email": "Email",
      "dob": "Date of Birth",
      "attorney": "Attorney Name (or \"In Pro Per\")",
      "barNumber": "State Bar Number",
      "caseNumber": "Case Number",
      "county": "County",
      "courtName": "Court Name",
      "courtAddress": "Court Address",
      "department": "Department",
      "filingDate": "Filing Date",
      "hearingDate": "Hearing Date",
      "hearingTime": "Hearing Time",
      "childName": "Child Full Name",
      "childDob": "Date of Birth",
      "childAge": "Current Age",
      "residessWith": "Currently Resides With"
    }
  },
  "settings": {
    "title": "Settings",
    "language": "Language",
    "selectLanguage": "Select language",
    "accessibility": "Accessibility",
    "highContrast": "High Contrast Mode",
    "largeText": "Large Text",
    "reducedMotion": "Reduced Motion",
    "focusIndicators": "Enhanced Focus Indicators",
    "errorLogs": "Error Logs",
    "exportLogs": "Export Error Logs",
    "clearLogs": "Clear Logs",
    "about": "About"
  },
  "help": {
    "title": "Help",
    "thisPage": "This Page",
    "shortcuts": "Shortcuts",
    "about": "About",
    "gettingStarted": "Getting Started",
    "closePanel": "Close help panel"
  },
  "export": {
    "title": "Export",
    "formats": {
      "html": "HTML (Print-Ready)",
      "json": "JSON",
      "csv": "CSV",
      "markdown": "Markdown",
      "text": "Plain Text"
    },
    "options": {
      "maskPII": "Mask PII Fields",
      "includeMetadata": "Include Metadata",
      "includeCitations": "Include Statutory Citations"
    },
    "success": "Export completed successfully.",
    "error": "Export failed. Please try again."
  },
  "errors": {
    "generic": "An unexpected error occurred.",
    "network": "Network error. Please check your connection.",
    "formLoad": "Failed to load form data.",
    "validationFailed": "Validation could not be completed.",
    "exportFailed": "Export failed.",
    "sessionExpired": "Your session has expired. Data has been saved.",
    "storageQuota": "Storage limit reached. Please export and clear old data.",
    "tryAgain": "Try Again",
    "reportIssue": "Report Issue",
    "goToDashboard": "Return to Dashboard"
  },
  "a11y": {
    "skipToMain": "Skip to main content",
    "skipToForm": "Skip to form section",
    "skipToNav": "Skip to navigation",
    "skipToResults": "Skip to results",
    "formProgress": "Form is {percent}% complete",
    "fieldError": "Error: {message}",
    "fieldCleared": "Error cleared",
    "newResults": "Results updated",
    "loading": "Loading, please wait"
  },
  "legal": {
    "disclaimer": "VERNEN™ 提供法律表格指导和合规检查。不提供法律建议。如需法律咨询，请咨询您所在司法管辖区的持牌律师。",
    "copyright": "© 2024–2026 Michael Vernen Thomas Hartmann. 保留所有权利。",
    "trademark": "VERNEN™ is a trademark of Michael Vernen Thomas Hartmann.",
    "ipManifest": "IP Manifest Filed February 2, 2026."
  },
  "auth": {
    "login": "登录",
    "register": "创建账户",
    "logout": "退出",
    "email": "电子邮件",
    "password": "密码",
    "confirmPassword": "确认密码",
    "displayName": "显示名称",
    "forgotPassword": "忘记密码？",
    "resetPassword": "重置密码",
    "resetSent": "密码重置邮件已发送。请查看收件箱。",
    "loginSuccess": "登录成功。",
    "registerSuccess": "账户已创建。欢迎使用 VERNEN™。",
    "logoutSuccess": "已退出。",
    "loginError": "登录失败。请检查邮箱和密码。",
    "registerError": "注册失败。请重试。",
    "sessionExpired": "会话已过期。请重新登录。",
    "requiredField": "此字段为必填项。",
    "invalidEmail": "请输入有效的电子邮件地址。",
    "passwordMinLength": "密码至少需要8个字符。",
    "passwordMismatch": "两次输入的密码不一致。",
    "alreadyHaveAccount": "已有账户？",
    "noAccount": "没有账户？",
    "tier": {
      "guest": "访客",
      "free": "免费",
      "pro": "专业版",
      "advocate": "律师版"
    },
    "tierRequired": "此功能需要 {tier} 订阅。",
    "upgradePrompt": "升级到 {tier} 以使用此功能。",
    "upgradeNow": "立即升级"
  },
  "payments": {
    "pricing": "定价",
    "plans": "方案",
    "currentPlan": "当前方案",
    "monthly": "月付",
    "annual": "年付",
    "perMonth": "/月",
    "perYear": "/年",
    "save": "节省 {percent}%",
    "freePlan": {
      "name": "免费版",
      "description": "基本表格指导。",
      "price": "$0"
    },
    "proPlan": {
      "name": "专业版",
      "description": "完整审计、导出和多语言支持。",
      "priceMonthly": "$19.99",
      "priceAnnual": "$191.88"
    },
    "advocatePlan": {
      "name": "律师版",
      "description": "完整平台，包含文件组装和提交。",
      "priceMonthly": "$39.99",
      "priceAnnual": "$383.88"
    },
    "subscribe": "订阅",
    "upgrade": "升级",
    "downgrade": "降级",
    "manageBilling": "管理账单",
    "cancelSubscription": "取消订阅",
    "checkoutRedirect": "正在跳转至安全支付页面...",
    "checkoutSuccess": "订阅已激活！",
    "checkoutCanceled": "支付已取消。",
    "paymentFailed": "支付失败。请更新您的支付方式。",
    "subscriptionActive": "您的订阅有效期至 {date}。",
    "subscriptionCanceled": "您的订阅将于 {date} 结束。"
  },
  "esignature": {
    "title": "电子签名",
    "signHere": "在此签名",
    "drawSignature": "手写签名",
    "typeSignature": "键入签名",
    "uploadSignature": "上传签名",
    "clearSignature": "清除",
    "acceptSignature": "接受签名",
    "signatureRequired": "此字段需要签名。",
    "wetInkRequired": "此字段需要手写签名。请打印、签名后扫描。",
    "notarizationRequired": "此字段需要公证。",
    "intentDeclaration": "本人签署此文件，依据加利福尼亚州法律，在伪证处罚下声明本文件中的信息真实、正确。",
    "consentCheckbox": "本人理解此电子签名与手写签名具有同等法律效力（加州民法典 § 1633.7）。",
    "signed": "已签名",
    "unsigned": "未签名",
    "signedBy": "{name} 于 {date} 签名",
    "revoke": "撤销签名",
    "revokeConfirm": "确定要撤销此签名吗？",
    "documentChanged": "文件在签名后已修改。需要重新签名。",
    "certificate": "签名证书",
    "viewCertificate": "查看签名证书",
    "legalBasis": "加州民法典 § 1633（UETA）"
  },
  "filing": {
    "title": "提交法院",
    "createPackage": "创建提交包",
    "filingType": "提交类型",
    "selectCourt": "选择法院",
    "caseNumber": "案件编号",
    "newCase": "新案件",
    "documents": "文件",
    "addDocument": "添加文件",
    "proofOfService": "送达证明",
    "filingFee": "提交费用",
    "feeWaiver": "已获费用减免（FW-003）",
    "estimatedFee": "预估费用：{amount}",
    "validate": "验证提交包",
    "validationPassed": "提交包已就绪。",
    "validationFailed": "提交包有 {count} 个错误。",
    "submit": "提交至法院",
    "submitConfirm": "确认提交至 {court}？",
    "submitting": "正在提交...",
    "submitted": "提交成功。",
    "confirmationNumber": "确认号：{number}",
    "checkStatus": "检查状态",
    "status": {
      "draft": "草稿",
      "ready": "就绪",
      "submitting": "提交中",
      "submitted": "已提交",
      "accepted": "审核中",
      "rejected": "被拒绝",
      "filed": "已归档",
      "error": "错误"
    },
    "rejected": "提交被拒绝：{reason}",
    "filedStamped": "盖章副本可下载。",
    "downloadFiled": "下载盖章副本",
    "history": "提交历史",
    "noFilings": "暂无提交记录。",
    "wetInkWarning": "此表格有字段需要手写签名。"
  },
  "traceability": {
    "title": "法规追溯记录",
    "description": "本次审计中所有参考法规来源的记录。",
    "sources": "参考来源",
    "statutes": "法规",
    "regulations": "条例",
    "rulesOfCourt": "法院规则",
    "federalCode": "联邦法典",
    "contentHash": "内容哈希（SHA-256）",
    "retrievedAt": "获取时间",
    "linkedFinding": "关联发现",
    "logFinalized": "追溯记录已完成并锁定。",
    "viewLog": "查看记录",
    "downloadLog": "下载记录（PDF）",
    "compliance": "本记录符合欧盟AI法案第13/14条、科罗拉多州SB 24-205和加州SB 942的透明度要求。"
  },
  "remediation": {
    "title": "修复指南",
    "description": "解决审计发现的分步指导。",
    "summary": "摘要",
    "totalSteps": "{count} 个步骤待完成",
    "estimatedTime": "预计时间：{minutes} 分钟",
    "phase": "阶段 {number}：{name}",
    "phases": {
      "critical": "关键修复",
      "high": "高优先级",
      "compliance": "合规差距",
      "bestPractice": "最佳实践"
    },
    "step": "步骤 {number}",
    "priority": "优先级",
    "complexity": {
      "simple": "简单（约2分钟）",
      "moderate": "中等（约10分钟）",
      "complex": "复杂（约25分钟）",
      "requires_review": "需律师审查（约60分钟）"
    },
    "goToField": "前往字段",
    "markComplete": "标记完成",
    "skip": "跳过",
    "undo": "撤销",
    "progress": "已完成 {completed}/{total} 步骤（{percent}%）",
    "allComplete": "所有修复步骤已完成！",
    "nextStep": "下一步",
    "filingReady": "可提交",
    "notReady": "未就绪 — 剩余 {remaining} 个步骤"
  }
},
  vi: {
  "__meta": {
    "version": "1.0.0",
    "language": "vi",
    "languageName": "Vietnamese",
    "direction": "ltr",
    "copyright": "© 2024–2026 Michael Vernen Thomas Hartmann. All Rights Reserved.",
    "lastUpdated": "2026-02-28",
    "completeness": "partial",
    "fallback": "en"
  },
  "app": {
    "title": "VERNEN™",
    "tagline": "Nền tảng Tuân thủ Pháp lý Đa ngôn ngữ",
    "loading": "Đang tải…",
    "error": "Đã xảy ra lỗi",
    "retry": "Thử lại",
    "back": "Quay lại",
    "next": "Tiếp theo",
    "previous": "Trước",
    "save": "Lưu",
    "cancel": "Hủy",
    "close": "Đóng",
    "export": "Xuất",
    "print": "Print",
    "download": "Download",
    "search": "Tìm kiếm",
    "clear": "Clear",
    "reset": "Reset",
    "confirm": "Confirm",
    "delete": "Delete",
    "edit": "Edit",
    "add": "Add",
    "remove": "Remove",
    "select": "Select",
    "required": "Bắt buộc",
    "optional": "Optional",
    "yes": "Có",
    "no": "Không",
    "none": "None",
    "all": "All",
    "other": "Other",
    "unknown": "Unknown",
    "notAvailable": "N/A"
  },
  "nav": {
    "dashboard": "Bảng điều khiển",
    "documentNavigator": "Trình duyệt Tài liệu",
    "validation": "Xác nhận",
    "filingGuide": "Hướng dẫn Nộp đơn",
    "audit": "Báo cáo Kiểm toán",
    "assembly": "Lắp ráp Tài liệu",
    "settings": "Cài đặt",
    "help": "Trợ giúp",
    "collapse": "Collapse sidebar",
    "expand": "Expand sidebar"
  },
  "dashboard": {
    "welcome": "Chào mừng đến với VERNEN™",
    "subtitle": "Chọn một mô-đun để bắt đầu",
    "cards": {
      "gdn": {
        "title": "Document Navigator",
        "desc": "Browse and fill Judicial Council forms with guided annotations"
      },
      "validation": {
        "title": "Pre-Filing Validation",
        "desc": "Check forms for errors, missing fields, and compliance issues"
      },
      "filing": {
        "title": "Filing Guide",
        "desc": "Court-specific instructions, fees, and service requirements"
      },
      "audit": {
        "title": "Audit Report",
        "desc": "Generate compliance documentation and risk assessments"
      },
      "assembly": {
        "title": "Document Assembly",
        "desc": "Build multi-form filing packages with automatic data propagation"
      }
    }
  },
  "gdn": {
    "title": "Guided Document Navigator",
    "selectCategory": "Select a category",
    "selectForm": "Select a form",
    "searchForms": "Search forms…",
    "fieldAnnotation": "Field Guidance",
    "legalDefinition": "Legal Definition",
    "commonMistakes": "Common Mistakes",
    "statutoryRef": "Statutory Reference",
    "categories": {
      "family_law": "Family Law",
      "domestic_violence": "Domestic Violence",
      "custody": "Child Custody & Visitation",
      "support": "Child & Spousal Support",
      "fee_waiver": "Fee Waiver",
      "small_claims": "Small Claims",
      "civil_harassment": "Civil Harassment",
      "elder_abuse": "Elder/Dependent Adult Abuse",
      "appeals": "Appeals",
      "general": "General Use"
    },
    "noResults": "No forms match your search.",
    "formFields": "Form Fields",
    "requiredFields": "Required Fields",
    "optionalFields": "Optional Fields",
    "piiWarning": "This field contains personally identifiable information (PII)"
  },
  "validation": {
    "title": "Pre-Filing Validation",
    "runValidation": "Run Validation",
    "revalidate": "Re-Validate",
    "selectForms": "Select forms to validate",
    "overallScore": "Overall Compliance Score",
    "filingReady": "Filing Ready",
    "needsReview": "Needs Review",
    "notReady": "Not Ready",
    "findings": "Findings",
    "noFindings": "No issues found — form is ready for filing.",
    "severity": {
      "critical": "Critical",
      "error": "Error",
      "warning": "Warning",
      "info": "Info"
    },
    "categories": {
      "completeness": "Completeness",
      "format": "Format",
      "compliance": "Compliance",
      "deadline": "Deadline",
      "crossForm": "Cross-Form",
      "service": "Service",
      "procedural": "Procedural"
    },
    "messages": {
      "requiredMissing": "Required field is missing",
      "invalidFormat": "Field format is invalid",
      "deadlinePassed": "Filing deadline may have passed",
      "serviceIncomplete": "Proof of service is incomplete",
      "crossFormMismatch": "Data does not match across forms"
    }
  },
  "filingGuide": {
    "title": "Filing Guide",
    "selectCounty": "Select your county",
    "courtInfo": "Court Information",
    "filingFees": "Filing Fees",
    "serviceReqs": "Service Requirements",
    "deadlines": "Deadlines",
    "eFiling": "E-Filing",
    "inPerson": "In-Person Filing",
    "byMail": "Filing by Mail",
    "hours": "Court Hours",
    "address": "Court Address",
    "phone": "Phone",
    "feeWaivable": "Fee Waiver Eligible",
    "counties": {
      "alameda": "Alameda County",
      "solano": "Solano County",
      "marin": "Marin County",
      "san_francisco": "San Francisco County",
      "contra_costa": "Contra Costa County"
    },
    "serviceTypes": {
      "personal": "Personal Service",
      "mail": "Service by Mail",
      "electronic": "Electronic Service"
    }
  },
  "audit": {
    "title": "Audit Report",
    "generate": "Generate Report",
    "regenerate": "Regenerate",
    "overallRisk": "Overall Risk Level",
    "findings": "Audit Findings",
    "recommendations": "Recommendations",
    "riskLevels": {
      "critical": "Critical Risk",
      "high": "High Risk",
      "medium": "Medium Risk",
      "low": "Low Risk",
      "info": "Informational"
    },
    "categories": {
      "completeness": "Completeness",
      "accuracy": "Accuracy",
      "compliance": "Statutory Compliance",
      "service": "Service of Process",
      "deadlines": "Filing Deadlines",
      "crossForm": "Cross-Form Consistency",
      "procedural": "Procedural Requirements"
    },
    "summary": "Executive Summary",
    "details": "Detailed Findings",
    "noFindings": "No audit findings — documents meet compliance standards."
  },
  "assembly": {
    "title": "Document Assembly",
    "subtitle": "Build multi-form filing packages with automatic cross-form data propagation.",
    "tabs": {
      "parties": "Parties",
      "case": "Case Info",
      "children": "Children",
      "package": "Package Builder",
      "review": "Review & Export"
    },
    "petitioner": "Petitioner (Filing Party)",
    "respondent": "Respondent (Other Party)",
    "caseInfo": "Case Information",
    "children": {
      "title": "Minor Children",
      "add": "Add Child",
      "remove": "Remove",
      "empty": "No children added yet.",
      "emptyHint": "Add children if filing custody, visitation, or support forms.",
      "child": "Child"
    },
    "package": {
      "title": "Select Filing Package",
      "forms": "forms",
      "formsInPackage": "Forms in this package:",
      "types": {
        "dissolution": "Dissolution of Marriage",
        "custody_rfo": "Custody RFO Package",
        "dvro": "DV Restraining Order",
        "fee_waiver": "Fee Waiver Package",
        "custody_modification": "Custody Modification",
        "support_modification": "Support Modification",
        "contempt": "Contempt Proceeding",
        "small_claims": "Small Claims",
        "appeal": "Appeal Package"
      }
    },
    "review": {
      "completeness": "Completeness",
      "readyForAssembly": "Ready for Assembly",
      "partiallyComplete": "Partially Complete",
      "needsMoreInfo": "Needs More Information",
      "consistencyCheck": "Cross-Form Consistency",
      "runCheck": "Run Check",
      "allConsistent": "All cross-form fields are consistent.",
      "summary": "Assembly Summary"
    },
    "fields": {
      "fullName": "Full Legal Name",
      "address": "Street Address",
      "city": "City",
      "state": "State",
      "zip": "ZIP Code",
      "phone": "Phone",
      "email": "Email",
      "dob": "Date of Birth",
      "attorney": "Attorney Name (or \"In Pro Per\")",
      "barNumber": "State Bar Number",
      "caseNumber": "Case Number",
      "county": "County",
      "courtName": "Court Name",
      "courtAddress": "Court Address",
      "department": "Department",
      "filingDate": "Filing Date",
      "hearingDate": "Hearing Date",
      "hearingTime": "Hearing Time",
      "childName": "Child Full Name",
      "childDob": "Date of Birth",
      "childAge": "Current Age",
      "residessWith": "Currently Resides With"
    }
  },
  "settings": {
    "title": "Settings",
    "language": "Language",
    "selectLanguage": "Select language",
    "accessibility": "Accessibility",
    "highContrast": "High Contrast Mode",
    "largeText": "Large Text",
    "reducedMotion": "Reduced Motion",
    "focusIndicators": "Enhanced Focus Indicators",
    "errorLogs": "Error Logs",
    "exportLogs": "Export Error Logs",
    "clearLogs": "Clear Logs",
    "about": "About"
  },
  "help": {
    "title": "Help",
    "thisPage": "This Page",
    "shortcuts": "Shortcuts",
    "about": "About",
    "gettingStarted": "Getting Started",
    "closePanel": "Close help panel"
  },
  "export": {
    "title": "Export",
    "formats": {
      "html": "HTML (Print-Ready)",
      "json": "JSON",
      "csv": "CSV",
      "markdown": "Markdown",
      "text": "Plain Text"
    },
    "options": {
      "maskPII": "Mask PII Fields",
      "includeMetadata": "Include Metadata",
      "includeCitations": "Include Statutory Citations"
    },
    "success": "Export completed successfully.",
    "error": "Export failed. Please try again."
  },
  "errors": {
    "generic": "An unexpected error occurred.",
    "network": "Network error. Please check your connection.",
    "formLoad": "Failed to load form data.",
    "validationFailed": "Validation could not be completed.",
    "exportFailed": "Export failed.",
    "sessionExpired": "Your session has expired. Data has been saved.",
    "storageQuota": "Storage limit reached. Please export and clear old data.",
    "tryAgain": "Try Again",
    "reportIssue": "Report Issue",
    "goToDashboard": "Return to Dashboard"
  },
  "a11y": {
    "skipToMain": "Skip to main content",
    "skipToForm": "Skip to form section",
    "skipToNav": "Skip to navigation",
    "skipToResults": "Skip to results",
    "formProgress": "Form is {percent}% complete",
    "fieldError": "Error: {message}",
    "fieldCleared": "Error cleared",
    "newResults": "Results updated",
    "loading": "Loading, please wait"
  },
  "legal": {
    "disclaimer": "VERNEN™ cung cấp hướng dẫn và kiểm tra tuân thủ biểu mẫu pháp lý. Không cung cấp tư vấn pháp lý. Để được tư vấn pháp lý, hãy tham khảo luật sư được cấp phép tại khu vực tài phán của bạn.",
    "copyright": "© 2024–2026 Michael Vernen Thomas Hartmann. All Rights Reserved.",
    "trademark": "VERNEN™ is a trademark of Michael Vernen Thomas Hartmann.",
    "ipManifest": "IP Manifest Filed February 2, 2026."
  },
  "auth": {
    "login": "Đăng Nhập",
    "register": "Tạo Tài Khoản",
    "logout": "Đăng Xuất",
    "email": "Địa Chỉ Email",
    "password": "Mật Khẩu",
    "confirmPassword": "Xác Nhận Mật Khẩu",
    "displayName": "Tên Hiển Thị",
    "forgotPassword": "Quên Mật Khẩu?",
    "resetPassword": "Đặt Lại Mật Khẩu",
    "resetSent": "Email đặt lại mật khẩu đã được gửi.",
    "loginSuccess": "Đăng nhập thành công.",
    "registerSuccess": "Tài khoản đã được tạo. Chào mừng đến VERNEN™.",
    "logoutSuccess": "Đã đăng xuất.",
    "loginError": "Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.",
    "registerError": "Đăng ký thất bại. Vui lòng thử lại.",
    "sessionExpired": "Phiên đã hết hạn. Vui lòng đăng nhập lại.",
    "requiredField": "Trường này là bắt buộc.",
    "invalidEmail": "Vui lòng nhập địa chỉ email hợp lệ.",
    "passwordMinLength": "Mật khẩu phải có ít nhất 8 ký tự.",
    "passwordMismatch": "Mật khẩu không khớp.",
    "alreadyHaveAccount": "Đã có tài khoản?",
    "noAccount": "Chưa có tài khoản?",
    "tier": {
      "guest": "Khách",
      "free": "Miễn Phí",
      "pro": "Chuyên Nghiệp",
      "advocate": "Luật Sư"
    },
    "tierRequired": "Tính năng này yêu cầu gói {tier}.",
    "upgradePrompt": "Nâng cấp lên {tier} để sử dụng tính năng này.",
    "upgradeNow": "Nâng Cấp Ngay"
  },
  "payments": {
    "pricing": "Bảng Giá",
    "plans": "Gói Dịch Vụ",
    "currentPlan": "Gói Hiện Tại",
    "monthly": "Hàng Tháng",
    "annual": "Hàng Năm",
    "perMonth": "/tháng",
    "perYear": "/năm",
    "save": "Tiết kiệm {percent}%",
    "freePlan": {
      "name": "Miễn Phí",
      "description": "Hướng dẫn biểu mẫu cơ bản.",
      "price": "$0"
    },
    "proPlan": {
      "name": "Chuyên Nghiệp",
      "description": "Kiểm toán đầy đủ, xuất và hỗ trợ đa ngôn ngữ.",
      "priceMonthly": "$19.99",
      "priceAnnual": "$191.88"
    },
    "advocatePlan": {
      "name": "Luật Sư",
      "description": "Nền tảng hoàn chỉnh với lắp ráp tài liệu và nộp hồ sơ.",
      "priceMonthly": "$39.99",
      "priceAnnual": "$383.88"
    },
    "subscribe": "Đăng Ký",
    "upgrade": "Nâng Cấp",
    "downgrade": "Hạ Cấp",
    "manageBilling": "Quản Lý Thanh Toán",
    "cancelSubscription": "Hủy Đăng Ký",
    "checkoutRedirect": "Đang chuyển hướng đến trang thanh toán an toàn...",
    "checkoutSuccess": "Đăng ký đã được kích hoạt!",
    "checkoutCanceled": "Thanh toán đã bị hủy.",
    "paymentFailed": "Thanh toán thất bại. Vui lòng cập nhật phương thức thanh toán.",
    "subscriptionActive": "Đăng ký của bạn có hiệu lực đến {date}.",
    "subscriptionCanceled": "Đăng ký của bạn sẽ kết thúc vào {date}."
  },
  "esignature": {
    "title": "Chữ Ký Điện Tử",
    "signHere": "Ký Tại Đây",
    "drawSignature": "Vẽ Chữ Ký",
    "typeSignature": "Gõ Chữ Ký",
    "uploadSignature": "Tải Lên Chữ Ký",
    "clearSignature": "Xóa",
    "acceptSignature": "Chấp Nhận Chữ Ký",
    "signatureRequired": "Trường này yêu cầu chữ ký.",
    "wetInkRequired": "Trường này yêu cầu chữ ký tay. Vui lòng in, ký và quét.",
    "notarizationRequired": "Trường này yêu cầu công chứng.",
    "intentDeclaration": "Bằng việc ký, tôi tuyên bố dưới hình phạt khai man theo luật pháp Tiểu bang California rằng thông tin trong tài liệu này là đúng sự thật.",
    "consentCheckbox": "Tôi hiểu rằng chữ ký điện tử này có hiệu lực pháp lý tương đương chữ ký tay (Bộ luật Dân sự Cal. § 1633.7).",
    "signed": "Đã Ký",
    "unsigned": "Chưa Ký",
    "signedBy": "Ký bởi {name} vào {date}",
    "revoke": "Thu Hồi Chữ Ký",
    "revokeConfirm": "Bạn có chắc muốn thu hồi chữ ký này?",
    "documentChanged": "Tài liệu đã bị thay đổi sau khi ký. Cần ký lại.",
    "certificate": "Chứng Nhận Chữ Ký",
    "viewCertificate": "Xem Chứng Nhận Chữ Ký",
    "legalBasis": "Bộ luật Dân sự Cal. § 1633 (UETA)"
  },
  "filing": {
    "title": "Nộp Hồ Sơ Tòa Án",
    "createPackage": "Tạo Gói Nộp Hồ Sơ",
    "filingType": "Loại Hồ Sơ",
    "selectCourt": "Chọn Tòa Án",
    "caseNumber": "Số Vụ Án",
    "newCase": "Vụ Án Mới",
    "documents": "Tài Liệu",
    "addDocument": "Thêm Tài Liệu",
    "proofOfService": "Bằng Chứng Tống Đạt",
    "filingFee": "Phí Nộp Hồ Sơ",
    "feeWaiver": "Đã Được Miễn Phí (FW-003)",
    "estimatedFee": "Phí ước tính: {amount}",
    "validate": "Xác Nhận Gói",
    "validationPassed": "Gói hồ sơ đã sẵn sàng.",
    "validationFailed": "Gói hồ sơ có {count} lỗi.",
    "submit": "Nộp Tòa Án",
    "submitConfirm": "Nộp gói hồ sơ này đến {court}?",
    "submitting": "Đang nộp...",
    "submitted": "Nộp hồ sơ thành công.",
    "confirmationNumber": "Số xác nhận: {number}",
    "checkStatus": "Kiểm Tra Trạng Thái",
    "status": {
      "draft": "Bản Nháp",
      "ready": "Sẵn Sàng",
      "submitting": "Đang Nộp",
      "submitted": "Đã Nộp",
      "accepted": "Đang Xem Xét",
      "rejected": "Bị Từ Chối",
      "filed": "Đã Nộp Thành Công",
      "error": "Lỗi"
    },
    "rejected": "Hồ sơ bị từ chối: {reason}",
    "filedStamped": "Bản sao có dấu đóng đã sẵn sàng.",
    "downloadFiled": "Tải Bản Sao Có Dấu",
    "history": "Lịch Sử Nộp Hồ Sơ",
    "noFilings": "Chưa có hồ sơ nào.",
    "wetInkWarning": "Biểu mẫu này có trường yêu cầu chữ ký tay."
  },
  "traceability": {
    "title": "Nhật Ký Truy Xuất Pháp Luật",
    "description": "Hồ sơ tất cả các nguồn pháp luật được tham khảo.",
    "sources": "Nguồn Tham Khảo",
    "statutes": "Luật",
    "regulations": "Quy Định",
    "rulesOfCourt": "Quy Tắc Tòa Án",
    "federalCode": "Luật Liên Bang",
    "contentHash": "Mã Băm Nội Dung (SHA-256)",
    "retrievedAt": "Thời Gian Truy Xuất",
    "linkedFinding": "Phát Hiện Liên Quan",
    "logFinalized": "Nhật ký đã hoàn tất và khóa.",
    "viewLog": "Xem Nhật Ký",
    "downloadLog": "Tải Nhật Ký (PDF)",
    "compliance": "Nhật ký này đáp ứng yêu cầu minh bạch."
  },
  "remediation": {
    "title": "Hướng Dẫn Khắc Phục",
    "description": "Hướng dẫn từng bước để giải quyết các phát hiện.",
    "summary": "Tóm Tắt",
    "totalSteps": "{count} bước cần hoàn thành",
    "estimatedTime": "Thời gian ước tính: {minutes} phút",
    "phase": "Giai đoạn {number}: {name}",
    "phases": {
      "critical": "Sửa Lỗi Nghiêm Trọng",
      "high": "Ưu Tiên Cao",
      "compliance": "Lỗ Hổng Tuân Thủ",
      "bestPractice": "Thực Hành Tốt Nhất"
    },
    "step": "Bước {number}",
    "priority": "Ưu Tiên",
    "complexity": {
      "simple": "Đơn Giản (~ 2 phút)",
      "moderate": "Trung Bình (~ 10 phút)",
      "complex": "Phức Tạp (~ 25 phút)",
      "requires_review": "Cần Luật Sư Xem Xét (~ 60 phút)"
    },
    "goToField": "Đến Trường",
    "markComplete": "Đánh Dấu Hoàn Thành",
    "skip": "Bỏ Qua",
    "undo": "Hoàn Tác",
    "progress": "Đã hoàn thành {completed}/{total} bước ({percent}%)",
    "allComplete": "Tất cả các bước đã hoàn thành!",
    "nextStep": "Bước Tiếp Theo",
    "filingReady": "Sẵn Sàng Nộp",
    "notReady": "Chưa Sẵn Sàng — còn {remaining} bước"
  }
},
  ko: {
  "__meta": {
    "version": "1.0.0",
    "language": "ko",
    "languageName": "Korean",
    "direction": "ltr",
    "copyright": "© 2024–2026 Michael Vernen Thomas Hartmann. All Rights Reserved.",
    "lastUpdated": "2026-02-28",
    "completeness": "partial",
    "fallback": "en"
  },
  "app": {
    "title": "VERNEN™",
    "tagline": "다국어 법률 준수 플랫폼",
    "loading": "로딩 중…",
    "error": "문제가 발생했습니다",
    "retry": "다시 시도",
    "back": "뒤로",
    "next": "다음",
    "previous": "이전",
    "save": "저장",
    "cancel": "취소",
    "close": "닫기",
    "export": "내보내기",
    "print": "Print",
    "download": "Download",
    "search": "검색",
    "clear": "Clear",
    "reset": "Reset",
    "confirm": "Confirm",
    "delete": "Delete",
    "edit": "Edit",
    "add": "Add",
    "remove": "Remove",
    "select": "Select",
    "required": "필수",
    "optional": "Optional",
    "yes": "예",
    "no": "아니오",
    "none": "None",
    "all": "All",
    "other": "Other",
    "unknown": "Unknown",
    "notAvailable": "N/A"
  },
  "nav": {
    "dashboard": "대시보드",
    "documentNavigator": "문서 탐색기",
    "validation": "검증",
    "filingGuide": "제출 안내",
    "audit": "감사 보고서",
    "assembly": "문서 조립",
    "settings": "설정",
    "help": "도움말",
    "collapse": "Collapse sidebar",
    "expand": "Expand sidebar"
  },
  "dashboard": {
    "welcome": "VERNEN™에 오신 것을 환영합니다",
    "subtitle": "시작할 모듈을 선택하세요",
    "cards": {
      "gdn": {
        "title": "Document Navigator",
        "desc": "Browse and fill Judicial Council forms with guided annotations"
      },
      "validation": {
        "title": "Pre-Filing Validation",
        "desc": "Check forms for errors, missing fields, and compliance issues"
      },
      "filing": {
        "title": "Filing Guide",
        "desc": "Court-specific instructions, fees, and service requirements"
      },
      "audit": {
        "title": "Audit Report",
        "desc": "Generate compliance documentation and risk assessments"
      },
      "assembly": {
        "title": "Document Assembly",
        "desc": "Build multi-form filing packages with automatic data propagation"
      }
    }
  },
  "gdn": {
    "title": "Guided Document Navigator",
    "selectCategory": "Select a category",
    "selectForm": "Select a form",
    "searchForms": "Search forms…",
    "fieldAnnotation": "Field Guidance",
    "legalDefinition": "Legal Definition",
    "commonMistakes": "Common Mistakes",
    "statutoryRef": "Statutory Reference",
    "categories": {
      "family_law": "Family Law",
      "domestic_violence": "Domestic Violence",
      "custody": "Child Custody & Visitation",
      "support": "Child & Spousal Support",
      "fee_waiver": "Fee Waiver",
      "small_claims": "Small Claims",
      "civil_harassment": "Civil Harassment",
      "elder_abuse": "Elder/Dependent Adult Abuse",
      "appeals": "Appeals",
      "general": "General Use"
    },
    "noResults": "No forms match your search.",
    "formFields": "Form Fields",
    "requiredFields": "Required Fields",
    "optionalFields": "Optional Fields",
    "piiWarning": "This field contains personally identifiable information (PII)"
  },
  "validation": {
    "title": "Pre-Filing Validation",
    "runValidation": "Run Validation",
    "revalidate": "Re-Validate",
    "selectForms": "Select forms to validate",
    "overallScore": "Overall Compliance Score",
    "filingReady": "Filing Ready",
    "needsReview": "Needs Review",
    "notReady": "Not Ready",
    "findings": "Findings",
    "noFindings": "No issues found — form is ready for filing.",
    "severity": {
      "critical": "Critical",
      "error": "Error",
      "warning": "Warning",
      "info": "Info"
    },
    "categories": {
      "completeness": "Completeness",
      "format": "Format",
      "compliance": "Compliance",
      "deadline": "Deadline",
      "crossForm": "Cross-Form",
      "service": "Service",
      "procedural": "Procedural"
    },
    "messages": {
      "requiredMissing": "Required field is missing",
      "invalidFormat": "Field format is invalid",
      "deadlinePassed": "Filing deadline may have passed",
      "serviceIncomplete": "Proof of service is incomplete",
      "crossFormMismatch": "Data does not match across forms"
    }
  },
  "filingGuide": {
    "title": "Filing Guide",
    "selectCounty": "Select your county",
    "courtInfo": "Court Information",
    "filingFees": "Filing Fees",
    "serviceReqs": "Service Requirements",
    "deadlines": "Deadlines",
    "eFiling": "E-Filing",
    "inPerson": "In-Person Filing",
    "byMail": "Filing by Mail",
    "hours": "Court Hours",
    "address": "Court Address",
    "phone": "Phone",
    "feeWaivable": "Fee Waiver Eligible",
    "counties": {
      "alameda": "Alameda County",
      "solano": "Solano County",
      "marin": "Marin County",
      "san_francisco": "San Francisco County",
      "contra_costa": "Contra Costa County"
    },
    "serviceTypes": {
      "personal": "Personal Service",
      "mail": "Service by Mail",
      "electronic": "Electronic Service"
    }
  },
  "audit": {
    "title": "Audit Report",
    "generate": "Generate Report",
    "regenerate": "Regenerate",
    "overallRisk": "Overall Risk Level",
    "findings": "Audit Findings",
    "recommendations": "Recommendations",
    "riskLevels": {
      "critical": "Critical Risk",
      "high": "High Risk",
      "medium": "Medium Risk",
      "low": "Low Risk",
      "info": "Informational"
    },
    "categories": {
      "completeness": "Completeness",
      "accuracy": "Accuracy",
      "compliance": "Statutory Compliance",
      "service": "Service of Process",
      "deadlines": "Filing Deadlines",
      "crossForm": "Cross-Form Consistency",
      "procedural": "Procedural Requirements"
    },
    "summary": "Executive Summary",
    "details": "Detailed Findings",
    "noFindings": "No audit findings — documents meet compliance standards."
  },
  "assembly": {
    "title": "Document Assembly",
    "subtitle": "Build multi-form filing packages with automatic cross-form data propagation.",
    "tabs": {
      "parties": "Parties",
      "case": "Case Info",
      "children": "Children",
      "package": "Package Builder",
      "review": "Review & Export"
    },
    "petitioner": "Petitioner (Filing Party)",
    "respondent": "Respondent (Other Party)",
    "caseInfo": "Case Information",
    "children": {
      "title": "Minor Children",
      "add": "Add Child",
      "remove": "Remove",
      "empty": "No children added yet.",
      "emptyHint": "Add children if filing custody, visitation, or support forms.",
      "child": "Child"
    },
    "package": {
      "title": "Select Filing Package",
      "forms": "forms",
      "formsInPackage": "Forms in this package:",
      "types": {
        "dissolution": "Dissolution of Marriage",
        "custody_rfo": "Custody RFO Package",
        "dvro": "DV Restraining Order",
        "fee_waiver": "Fee Waiver Package",
        "custody_modification": "Custody Modification",
        "support_modification": "Support Modification",
        "contempt": "Contempt Proceeding",
        "small_claims": "Small Claims",
        "appeal": "Appeal Package"
      }
    },
    "review": {
      "completeness": "Completeness",
      "readyForAssembly": "Ready for Assembly",
      "partiallyComplete": "Partially Complete",
      "needsMoreInfo": "Needs More Information",
      "consistencyCheck": "Cross-Form Consistency",
      "runCheck": "Run Check",
      "allConsistent": "All cross-form fields are consistent.",
      "summary": "Assembly Summary"
    },
    "fields": {
      "fullName": "Full Legal Name",
      "address": "Street Address",
      "city": "City",
      "state": "State",
      "zip": "ZIP Code",
      "phone": "Phone",
      "email": "Email",
      "dob": "Date of Birth",
      "attorney": "Attorney Name (or \"In Pro Per\")",
      "barNumber": "State Bar Number",
      "caseNumber": "Case Number",
      "county": "County",
      "courtName": "Court Name",
      "courtAddress": "Court Address",
      "department": "Department",
      "filingDate": "Filing Date",
      "hearingDate": "Hearing Date",
      "hearingTime": "Hearing Time",
      "childName": "Child Full Name",
      "childDob": "Date of Birth",
      "childAge": "Current Age",
      "residessWith": "Currently Resides With"
    }
  },
  "settings": {
    "title": "Settings",
    "language": "Language",
    "selectLanguage": "Select language",
    "accessibility": "Accessibility",
    "highContrast": "High Contrast Mode",
    "largeText": "Large Text",
    "reducedMotion": "Reduced Motion",
    "focusIndicators": "Enhanced Focus Indicators",
    "errorLogs": "Error Logs",
    "exportLogs": "Export Error Logs",
    "clearLogs": "Clear Logs",
    "about": "About"
  },
  "help": {
    "title": "Help",
    "thisPage": "This Page",
    "shortcuts": "Shortcuts",
    "about": "About",
    "gettingStarted": "Getting Started",
    "closePanel": "Close help panel"
  },
  "export": {
    "title": "Export",
    "formats": {
      "html": "HTML (Print-Ready)",
      "json": "JSON",
      "csv": "CSV",
      "markdown": "Markdown",
      "text": "Plain Text"
    },
    "options": {
      "maskPII": "Mask PII Fields",
      "includeMetadata": "Include Metadata",
      "includeCitations": "Include Statutory Citations"
    },
    "success": "Export completed successfully.",
    "error": "Export failed. Please try again."
  },
  "errors": {
    "generic": "An unexpected error occurred.",
    "network": "Network error. Please check your connection.",
    "formLoad": "Failed to load form data.",
    "validationFailed": "Validation could not be completed.",
    "exportFailed": "Export failed.",
    "sessionExpired": "Your session has expired. Data has been saved.",
    "storageQuota": "Storage limit reached. Please export and clear old data.",
    "tryAgain": "Try Again",
    "reportIssue": "Report Issue",
    "goToDashboard": "Return to Dashboard"
  },
  "a11y": {
    "skipToMain": "Skip to main content",
    "skipToForm": "Skip to form section",
    "skipToNav": "Skip to navigation",
    "skipToResults": "Skip to results",
    "formProgress": "Form is {percent}% complete",
    "fieldError": "Error: {message}",
    "fieldCleared": "Error cleared",
    "newResults": "Results updated",
    "loading": "Loading, please wait"
  },
  "legal": {
    "disclaimer": "VERNEN™은 법률 양식 안내 및 준수 확인을 제공합니다. 법률 자문을 제공하지 않습니다. 법률 자문은 해당 관할권의 면허 변호사에게 문의하십시오.",
    "copyright": "© 2024–2026 Michael Vernen Thomas Hartmann. All Rights Reserved.",
    "trademark": "VERNEN™ is a trademark of Michael Vernen Thomas Hartmann.",
    "ipManifest": "IP Manifest Filed February 2, 2026."
  },
  "auth": {
    "login": "로그인",
    "register": "계정 만들기",
    "logout": "로그아웃",
    "email": "이메일 주소",
    "password": "비밀번호",
    "confirmPassword": "비밀번호 확인",
    "displayName": "표시 이름",
    "forgotPassword": "비밀번호를 잊으셨나요?",
    "resetPassword": "비밀번호 재설정",
    "resetSent": "비밀번호 재설정 이메일이 발송되었습니다.",
    "loginSuccess": "로그인 성공.",
    "registerSuccess": "계정이 생성되었습니다. VERNEN™에 오신 것을 환영합니다.",
    "logoutSuccess": "로그아웃 되었습니다.",
    "loginError": "로그인 실패. 이메일과 비밀번호를 확인하세요.",
    "registerError": "등록 실패. 다시 시도해 주세요.",
    "sessionExpired": "세션이 만료되었습니다. 다시 로그인하세요.",
    "requiredField": "필수 입력 항목입니다.",
    "invalidEmail": "유효한 이메일 주소를 입력하세요.",
    "passwordMinLength": "비밀번호는 최소 8자 이상이어야 합니다.",
    "passwordMismatch": "비밀번호가 일치하지 않습니다.",
    "alreadyHaveAccount": "이미 계정이 있으신가요?",
    "noAccount": "계정이 없으신가요?",
    "tier": {
      "guest": "게스트",
      "free": "무료",
      "pro": "프로",
      "advocate": "변호사"
    },
    "tierRequired": "이 기능은 {tier} 구독이 필요합니다.",
    "upgradePrompt": "이 기능을 사용하려면 {tier}로 업그레이드하세요.",
    "upgradeNow": "지금 업그레이드"
  },
  "payments": {
    "pricing": "요금",
    "plans": "요금제",
    "currentPlan": "현재 요금제",
    "monthly": "월간",
    "annual": "연간",
    "perMonth": "/월",
    "perYear": "/년",
    "save": "{percent}% 절약",
    "freePlan": {
      "name": "무료",
      "description": "기본 양식 안내.",
      "price": "$0"
    },
    "proPlan": {
      "name": "프로",
      "description": "전체 감사, 내보내기 및 다국어 지원.",
      "priceMonthly": "$19.99",
      "priceAnnual": "$191.88"
    },
    "advocatePlan": {
      "name": "변호사",
      "description": "문서 조합 및 제출 기능 포함 전체 플랫폼.",
      "priceMonthly": "$39.99",
      "priceAnnual": "$383.88"
    },
    "subscribe": "구독",
    "upgrade": "업그레이드",
    "downgrade": "다운그레이드",
    "manageBilling": "결제 관리",
    "cancelSubscription": "구독 취소",
    "checkoutRedirect": "안전한 결제 페이지로 이동 중...",
    "checkoutSuccess": "구독이 활성화되었습니다!",
    "checkoutCanceled": "결제가 취소되었습니다.",
    "paymentFailed": "결제 실패. 결제 수단을 업데이트하세요.",
    "subscriptionActive": "구독이 {date}까지 유효합니다.",
    "subscriptionCanceled": "구독이 {date}에 종료됩니다."
  },
  "esignature": {
    "title": "전자 서명",
    "signHere": "여기에 서명",
    "drawSignature": "서명 그리기",
    "typeSignature": "서명 입력",
    "uploadSignature": "서명 업로드",
    "clearSignature": "지우기",
    "acceptSignature": "서명 승인",
    "signatureRequired": "이 필드에 서명이 필요합니다.",
    "wetInkRequired": "이 필드는 직접 서명이 필요합니다. 인쇄 후 서명하고 스캔하세요.",
    "notarizationRequired": "이 필드는 공증이 필요합니다.",
    "intentDeclaration": "서명함으로써, 캘리포니아주 법률에 따라 위증죄의 처벌 하에 이 문서의 정보가 사실임을 선언합니다.",
    "consentCheckbox": "이 전자 서명이 자필 서명과 동일한 법적 효력을 갖는다는 것을 이해합니다 (캘리포니아 민법 § 1633.7).",
    "signed": "서명됨",
    "unsigned": "미서명",
    "signedBy": "{name}이(가) {date}에 서명",
    "revoke": "서명 취소",
    "revokeConfirm": "이 서명을 취소하시겠습니까?",
    "documentChanged": "서명 후 문서가 수정되었습니다. 재서명이 필요합니다.",
    "certificate": "서명 인증서",
    "viewCertificate": "서명 인증서 보기",
    "legalBasis": "캘리포니아 민법 § 1633 (UETA)"
  },
  "filing": {
    "title": "법원 제출",
    "createPackage": "제출 패키지 생성",
    "filingType": "제출 유형",
    "selectCourt": "법원 선택",
    "caseNumber": "사건 번호",
    "newCase": "새 사건",
    "documents": "문서",
    "addDocument": "문서 추가",
    "proofOfService": "송달 증명",
    "filingFee": "제출 수수료",
    "feeWaiver": "수수료 면제 승인 (FW-003)",
    "estimatedFee": "예상 수수료: {amount}",
    "validate": "패키지 검증",
    "validationPassed": "제출 패키지가 준비되었습니다.",
    "validationFailed": "제출 패키지에 {count}개의 오류가 있습니다.",
    "submit": "법원에 제출",
    "submitConfirm": "이 패키지를 {court}에 제출하시겠습니까?",
    "submitting": "제출 중...",
    "submitted": "제출이 완료되었습니다.",
    "confirmationNumber": "확인 번호: {number}",
    "checkStatus": "상태 확인",
    "status": {
      "draft": "초안",
      "ready": "준비됨",
      "submitting": "제출 중",
      "submitted": "제출됨",
      "accepted": "검토 중",
      "rejected": "거부됨",
      "filed": "접수됨",
      "error": "오류"
    },
    "rejected": "제출 거부: {reason}",
    "filedStamped": "접수 도장 사본을 다운로드할 수 있습니다.",
    "downloadFiled": "접수 사본 다운로드",
    "history": "제출 기록",
    "noFilings": "제출 기록이 없습니다.",
    "wetInkWarning": "이 양식에는 직접 서명이 필요한 필드가 있습니다."
  },
  "traceability": {
    "title": "법률 추적 기록",
    "description": "감사 중 참조된 모든 법률 출처의 기록.",
    "sources": "참조 출처",
    "statutes": "법률",
    "regulations": "규정",
    "rulesOfCourt": "법원 규칙",
    "federalCode": "연방 법전",
    "contentHash": "콘텐츠 해시 (SHA-256)",
    "retrievedAt": "조회 시간",
    "linkedFinding": "관련 발견",
    "logFinalized": "추적 기록이 완료되고 잠겼습니다.",
    "viewLog": "기록 보기",
    "downloadLog": "기록 다운로드 (PDF)",
    "compliance": "이 기록은 투명성 요구 사항을 충족합니다."
  },
  "remediation": {
    "title": "수정 가이드",
    "description": "감사 발견 사항을 해결하기 위한 단계별 안내.",
    "summary": "요약",
    "totalSteps": "완료할 {count}개 단계",
    "estimatedTime": "예상 시간: {minutes}분",
    "phase": "단계 {number}: {name}",
    "phases": {
      "critical": "중요 수정",
      "high": "높은 우선순위",
      "compliance": "규정 준수 격차",
      "bestPractice": "모범 사례"
    },
    "step": "단계 {number}",
    "priority": "우선순위",
    "complexity": {
      "simple": "간단 (약 2분)",
      "moderate": "보통 (약 10분)",
      "complex": "복잡 (약 25분)",
      "requires_review": "변호사 검토 필요 (약 60분)"
    },
    "goToField": "필드로 이동",
    "markComplete": "완료 표시",
    "skip": "건너뛰기",
    "undo": "실행 취소",
    "progress": "{completed}/{total} 단계 완료 ({percent}%)",
    "allComplete": "모든 수정 단계가 완료되었습니다!",
    "nextStep": "다음 단계",
    "filingReady": "제출 준비 완료",
    "notReady": "준비 안 됨 — {remaining}개 단계 남음"
  }
},
  ar: {
  "__meta": {
    "version": "1.0.0",
    "language": "ar",
    "languageName": "Arabic",
    "direction": "rtl",
    "copyright": "© 2024–2026 Michael Vernen Thomas Hartmann. All Rights Reserved.",
    "lastUpdated": "2026-02-28",
    "completeness": "partial",
    "fallback": "en"
  },
  "app": {
    "title": "™VERNEN",
    "tagline": "منصة الامتثال القانوني متعددة اللغات",
    "loading": "جارٍ التحميل…",
    "error": "حدث خطأ ما",
    "retry": "إعادة المحاولة",
    "back": "رجوع",
    "next": "التالي",
    "previous": "السابق",
    "save": "حفظ",
    "cancel": "إلغاء",
    "close": "إغلاق",
    "export": "تصدير",
    "print": "Print",
    "download": "Download",
    "search": "بحث",
    "clear": "Clear",
    "reset": "Reset",
    "confirm": "Confirm",
    "delete": "Delete",
    "edit": "Edit",
    "add": "Add",
    "remove": "Remove",
    "select": "Select",
    "required": "مطلوب",
    "optional": "Optional",
    "yes": "نعم",
    "no": "لا",
    "none": "None",
    "all": "All",
    "other": "Other",
    "unknown": "Unknown",
    "notAvailable": "N/A"
  },
  "nav": {
    "dashboard": "لوحة المعلومات",
    "documentNavigator": "مستكشف المستندات",
    "validation": "التحقق",
    "filingGuide": "دليل التقديم",
    "audit": "تقرير التدقيق",
    "assembly": "تجميع المستندات",
    "settings": "الإعدادات",
    "help": "المساعدة",
    "collapse": "Collapse sidebar",
    "expand": "Expand sidebar"
  },
  "dashboard": {
    "welcome": "™VERNEN مرحباً بك في",
    "subtitle": "اختر وحدة للبدء",
    "cards": {
      "gdn": {
        "title": "Document Navigator",
        "desc": "Browse and fill Judicial Council forms with guided annotations"
      },
      "validation": {
        "title": "Pre-Filing Validation",
        "desc": "Check forms for errors, missing fields, and compliance issues"
      },
      "filing": {
        "title": "Filing Guide",
        "desc": "Court-specific instructions, fees, and service requirements"
      },
      "audit": {
        "title": "Audit Report",
        "desc": "Generate compliance documentation and risk assessments"
      },
      "assembly": {
        "title": "Document Assembly",
        "desc": "Build multi-form filing packages with automatic data propagation"
      }
    }
  },
  "gdn": {
    "title": "Guided Document Navigator",
    "selectCategory": "Select a category",
    "selectForm": "Select a form",
    "searchForms": "Search forms…",
    "fieldAnnotation": "Field Guidance",
    "legalDefinition": "Legal Definition",
    "commonMistakes": "Common Mistakes",
    "statutoryRef": "Statutory Reference",
    "categories": {
      "family_law": "Family Law",
      "domestic_violence": "Domestic Violence",
      "custody": "Child Custody & Visitation",
      "support": "Child & Spousal Support",
      "fee_waiver": "Fee Waiver",
      "small_claims": "Small Claims",
      "civil_harassment": "Civil Harassment",
      "elder_abuse": "Elder/Dependent Adult Abuse",
      "appeals": "Appeals",
      "general": "General Use"
    },
    "noResults": "No forms match your search.",
    "formFields": "Form Fields",
    "requiredFields": "Required Fields",
    "optionalFields": "Optional Fields",
    "piiWarning": "This field contains personally identifiable information (PII)"
  },
  "validation": {
    "title": "Pre-Filing Validation",
    "runValidation": "Run Validation",
    "revalidate": "Re-Validate",
    "selectForms": "Select forms to validate",
    "overallScore": "Overall Compliance Score",
    "filingReady": "Filing Ready",
    "needsReview": "Needs Review",
    "notReady": "Not Ready",
    "findings": "Findings",
    "noFindings": "No issues found — form is ready for filing.",
    "severity": {
      "critical": "Critical",
      "error": "Error",
      "warning": "Warning",
      "info": "Info"
    },
    "categories": {
      "completeness": "Completeness",
      "format": "Format",
      "compliance": "Compliance",
      "deadline": "Deadline",
      "crossForm": "Cross-Form",
      "service": "Service",
      "procedural": "Procedural"
    },
    "messages": {
      "requiredMissing": "Required field is missing",
      "invalidFormat": "Field format is invalid",
      "deadlinePassed": "Filing deadline may have passed",
      "serviceIncomplete": "Proof of service is incomplete",
      "crossFormMismatch": "Data does not match across forms"
    }
  },
  "filingGuide": {
    "title": "Filing Guide",
    "selectCounty": "Select your county",
    "courtInfo": "Court Information",
    "filingFees": "Filing Fees",
    "serviceReqs": "Service Requirements",
    "deadlines": "Deadlines",
    "eFiling": "E-Filing",
    "inPerson": "In-Person Filing",
    "byMail": "Filing by Mail",
    "hours": "Court Hours",
    "address": "Court Address",
    "phone": "Phone",
    "feeWaivable": "Fee Waiver Eligible",
    "counties": {
      "alameda": "Alameda County",
      "solano": "Solano County",
      "marin": "Marin County",
      "san_francisco": "San Francisco County",
      "contra_costa": "Contra Costa County"
    },
    "serviceTypes": {
      "personal": "Personal Service",
      "mail": "Service by Mail",
      "electronic": "Electronic Service"
    }
  },
  "audit": {
    "title": "Audit Report",
    "generate": "Generate Report",
    "regenerate": "Regenerate",
    "overallRisk": "Overall Risk Level",
    "findings": "Audit Findings",
    "recommendations": "Recommendations",
    "riskLevels": {
      "critical": "Critical Risk",
      "high": "High Risk",
      "medium": "Medium Risk",
      "low": "Low Risk",
      "info": "Informational"
    },
    "categories": {
      "completeness": "Completeness",
      "accuracy": "Accuracy",
      "compliance": "Statutory Compliance",
      "service": "Service of Process",
      "deadlines": "Filing Deadlines",
      "crossForm": "Cross-Form Consistency",
      "procedural": "Procedural Requirements"
    },
    "summary": "Executive Summary",
    "details": "Detailed Findings",
    "noFindings": "No audit findings — documents meet compliance standards."
  },
  "assembly": {
    "title": "Document Assembly",
    "subtitle": "Build multi-form filing packages with automatic cross-form data propagation.",
    "tabs": {
      "parties": "Parties",
      "case": "Case Info",
      "children": "Children",
      "package": "Package Builder",
      "review": "Review & Export"
    },
    "petitioner": "Petitioner (Filing Party)",
    "respondent": "Respondent (Other Party)",
    "caseInfo": "Case Information",
    "children": {
      "title": "Minor Children",
      "add": "Add Child",
      "remove": "Remove",
      "empty": "No children added yet.",
      "emptyHint": "Add children if filing custody, visitation, or support forms.",
      "child": "Child"
    },
    "package": {
      "title": "Select Filing Package",
      "forms": "forms",
      "formsInPackage": "Forms in this package:",
      "types": {
        "dissolution": "Dissolution of Marriage",
        "custody_rfo": "Custody RFO Package",
        "dvro": "DV Restraining Order",
        "fee_waiver": "Fee Waiver Package",
        "custody_modification": "Custody Modification",
        "support_modification": "Support Modification",
        "contempt": "Contempt Proceeding",
        "small_claims": "Small Claims",
        "appeal": "Appeal Package"
      }
    },
    "review": {
      "completeness": "Completeness",
      "readyForAssembly": "Ready for Assembly",
      "partiallyComplete": "Partially Complete",
      "needsMoreInfo": "Needs More Information",
      "consistencyCheck": "Cross-Form Consistency",
      "runCheck": "Run Check",
      "allConsistent": "All cross-form fields are consistent.",
      "summary": "Assembly Summary"
    },
    "fields": {
      "fullName": "Full Legal Name",
      "address": "Street Address",
      "city": "City",
      "state": "State",
      "zip": "ZIP Code",
      "phone": "Phone",
      "email": "Email",
      "dob": "Date of Birth",
      "attorney": "Attorney Name (or \"In Pro Per\")",
      "barNumber": "State Bar Number",
      "caseNumber": "Case Number",
      "county": "County",
      "courtName": "Court Name",
      "courtAddress": "Court Address",
      "department": "Department",
      "filingDate": "Filing Date",
      "hearingDate": "Hearing Date",
      "hearingTime": "Hearing Time",
      "childName": "Child Full Name",
      "childDob": "Date of Birth",
      "childAge": "Current Age",
      "residessWith": "Currently Resides With"
    }
  },
  "settings": {
    "title": "Settings",
    "language": "Language",
    "selectLanguage": "Select language",
    "accessibility": "Accessibility",
    "highContrast": "High Contrast Mode",
    "largeText": "Large Text",
    "reducedMotion": "Reduced Motion",
    "focusIndicators": "Enhanced Focus Indicators",
    "errorLogs": "Error Logs",
    "exportLogs": "Export Error Logs",
    "clearLogs": "Clear Logs",
    "about": "About"
  },
  "help": {
    "title": "Help",
    "thisPage": "This Page",
    "shortcuts": "Shortcuts",
    "about": "About",
    "gettingStarted": "Getting Started",
    "closePanel": "Close help panel"
  },
  "export": {
    "title": "Export",
    "formats": {
      "html": "HTML (Print-Ready)",
      "json": "JSON",
      "csv": "CSV",
      "markdown": "Markdown",
      "text": "Plain Text"
    },
    "options": {
      "maskPII": "Mask PII Fields",
      "includeMetadata": "Include Metadata",
      "includeCitations": "Include Statutory Citations"
    },
    "success": "Export completed successfully.",
    "error": "Export failed. Please try again."
  },
  "errors": {
    "generic": "An unexpected error occurred.",
    "network": "Network error. Please check your connection.",
    "formLoad": "Failed to load form data.",
    "validationFailed": "Validation could not be completed.",
    "exportFailed": "Export failed.",
    "sessionExpired": "Your session has expired. Data has been saved.",
    "storageQuota": "Storage limit reached. Please export and clear old data.",
    "tryAgain": "Try Again",
    "reportIssue": "Report Issue",
    "goToDashboard": "Return to Dashboard"
  },
  "a11y": {
    "skipToMain": "Skip to main content",
    "skipToForm": "Skip to form section",
    "skipToNav": "Skip to navigation",
    "skipToResults": "Skip to results",
    "formProgress": "Form is {percent}% complete",
    "fieldError": "Error: {message}",
    "fieldCleared": "Error cleared",
    "newResults": "Results updated",
    "loading": "Loading, please wait"
  },
  "legal": {
    "disclaimer": "™VERNEN يوفر إرشادات نماذج قانونية وفحص الامتثال. لا يقدم استشارات قانونية. للحصول على مشورة قانونية، استشر محامياً مرخصاً في نطاق اختصاصك القضائي.",
    "copyright": "© 2024–2026 Michael Vernen Thomas Hartmann. All Rights Reserved.",
    "trademark": "VERNEN™ is a trademark of Michael Vernen Thomas Hartmann.",
    "ipManifest": "IP Manifest Filed February 2, 2026."
  },
  "auth": {
    "login": "تسجيل الدخول",
    "register": "إنشاء حساب",
    "logout": "تسجيل الخروج",
    "email": "البريد الإلكتروني",
    "password": "كلمة المرور",
    "confirmPassword": "تأكيد كلمة المرور",
    "displayName": "اسم العرض",
    "forgotPassword": "هل نسيت كلمة المرور؟",
    "resetPassword": "إعادة تعيين كلمة المرور",
    "resetSent": "تم إرسال بريد إعادة التعيين. تحقق من بريدك الوارد.",
    "loginSuccess": "تم تسجيل الدخول بنجاح.",
    "registerSuccess": "تم إنشاء الحساب. مرحباً بك في VERNEN™.",
    "logoutSuccess": "تم تسجيل الخروج.",
    "loginError": "فشل تسجيل الدخول. تحقق من بريدك وكلمة المرور.",
    "registerError": "فشل التسجيل. يرجى المحاولة مرة أخرى.",
    "sessionExpired": "انتهت الجلسة. يرجى تسجيل الدخول مرة أخرى.",
    "requiredField": "هذا الحقل مطلوب.",
    "invalidEmail": "يرجى إدخال بريد إلكتروني صالح.",
    "passwordMinLength": "يجب أن تكون كلمة المرور 8 أحرف على الأقل.",
    "passwordMismatch": "كلمتا المرور غير متطابقتين.",
    "alreadyHaveAccount": "لديك حساب بالفعل؟",
    "noAccount": "ليس لديك حساب؟",
    "tier": {
      "guest": "زائر",
      "free": "مجاني",
      "pro": "احترافي",
      "advocate": "محامي"
    },
    "tierRequired": "هذه الميزة تتطلب اشتراك {tier}.",
    "upgradePrompt": "قم بالترقية إلى {tier} للوصول إلى هذه الميزة.",
    "upgradeNow": "ترقية الآن"
  },
  "payments": {
    "pricing": "الأسعار",
    "plans": "الخطط",
    "currentPlan": "الخطة الحالية",
    "monthly": "شهري",
    "annual": "سنوي",
    "perMonth": "/شهر",
    "perYear": "/سنة",
    "save": "وفر {percent}%",
    "freePlan": {
      "name": "مجاني",
      "description": "إرشادات النماذج الأساسية.",
      "price": "$0"
    },
    "proPlan": {
      "name": "احترافي",
      "description": "تدقيق كامل وتصدير ودعم متعدد اللغات.",
      "priceMonthly": "$19.99",
      "priceAnnual": "$191.88"
    },
    "advocatePlan": {
      "name": "محامي",
      "description": "منصة كاملة مع تجميع المستندات والتقديم.",
      "priceMonthly": "$39.99",
      "priceAnnual": "$383.88"
    },
    "subscribe": "اشتراك",
    "upgrade": "ترقية",
    "downgrade": "تخفيض",
    "manageBilling": "إدارة الفواتير",
    "cancelSubscription": "إلغاء الاشتراك",
    "checkoutRedirect": "جارٍ التوجيه إلى الدفع الآمن...",
    "checkoutSuccess": "تم تفعيل الاشتراك!",
    "checkoutCanceled": "تم إلغاء الدفع.",
    "paymentFailed": "فشل الدفع. يرجى تحديث طريقة الدفع.",
    "subscriptionActive": "اشتراكك فعال حتى {date}.",
    "subscriptionCanceled": "سينتهي اشتراكك في {date}."
  },
  "esignature": {
    "title": "التوقيع الإلكتروني",
    "signHere": "وقّع هنا",
    "drawSignature": "ارسم التوقيع",
    "typeSignature": "اكتب التوقيع",
    "uploadSignature": "ارفع التوقيع",
    "clearSignature": "مسح",
    "acceptSignature": "قبول التوقيع",
    "signatureRequired": "التوقيع مطلوب في هذا الحقل.",
    "wetInkRequired": "هذا الحقل يتطلب توقيعاً بالحبر. اطبع ووقّع وامسح ضوئياً.",
    "notarizationRequired": "هذا الحقل يتطلب توثيقاً.",
    "intentDeclaration": "بتوقيعي، أعلن تحت طائلة عقوبة الحنث باليمين وفقاً لقوانين ولاية كاليفورنيا أن المعلومات الواردة في هذا المستند صحيحة.",
    "consentCheckbox": "أفهم أن هذا التوقيع الإلكتروني له نفس الأثر القانوني للتوقيع بخط اليد (القانون المدني لكاليفورنيا § 1633.7).",
    "signed": "موقّع",
    "unsigned": "غير موقّع",
    "signedBy": "وقّعه {name} في {date}",
    "revoke": "إلغاء التوقيع",
    "revokeConfirm": "هل أنت متأكد من إلغاء هذا التوقيع؟",
    "documentChanged": "تم تعديل المستند بعد التوقيع. يلزم إعادة التوقيع.",
    "certificate": "شهادة التوقيع",
    "viewCertificate": "عرض شهادة التوقيع",
    "legalBasis": "القانون المدني لكاليفورنيا § 1633 (UETA)"
  },
  "filing": {
    "title": "تقديم للمحكمة",
    "createPackage": "إنشاء حزمة التقديم",
    "filingType": "نوع التقديم",
    "selectCourt": "اختيار المحكمة",
    "caseNumber": "رقم القضية",
    "newCase": "قضية جديدة",
    "documents": "المستندات",
    "addDocument": "إضافة مستند",
    "proofOfService": "إثبات التبليغ",
    "filingFee": "رسوم التقديم",
    "feeWaiver": "تم منح الإعفاء من الرسوم (FW-003)",
    "estimatedFee": "الرسوم المقدرة: {amount}",
    "validate": "التحقق من الحزمة",
    "validationPassed": "الحزمة جاهزة للتقديم.",
    "validationFailed": "الحزمة تحتوي على {count} خطأ.",
    "submit": "تقديم للمحكمة",
    "submitConfirm": "تقديم هذه الحزمة إلى {court}؟",
    "submitting": "جارٍ التقديم...",
    "submitted": "تم التقديم بنجاح.",
    "confirmationNumber": "رقم التأكيد: {number}",
    "checkStatus": "التحقق من الحالة",
    "status": {
      "draft": "مسودة",
      "ready": "جاهز",
      "submitting": "قيد التقديم",
      "submitted": "تم التقديم",
      "accepted": "قيد المراجعة",
      "rejected": "مرفوض",
      "filed": "مسجّل",
      "error": "خطأ"
    },
    "rejected": "تم رفض التقديم: {reason}",
    "filedStamped": "النسخة المختومة متاحة.",
    "downloadFiled": "تحميل النسخة المختومة",
    "history": "سجل التقديمات",
    "noFilings": "لا توجد تقديمات.",
    "wetInkWarning": "هذا النموذج يحتوي على حقول تتطلب توقيعاً بالحبر."
  },
  "traceability": {
    "title": "سجل التتبع القانوني",
    "description": "سجل جميع المصادر القانونية المرجعية.",
    "sources": "المصادر المرجعية",
    "statutes": "القوانين",
    "regulations": "الأنظمة",
    "rulesOfCourt": "قواعد المحكمة",
    "federalCode": "القانون الفيدرالي",
    "contentHash": "بصمة المحتوى (SHA-256)",
    "retrievedAt": "وقت الاسترجاع",
    "linkedFinding": "النتيجة المرتبطة",
    "logFinalized": "تم إنهاء السجل وقفله.",
    "viewLog": "عرض السجل",
    "downloadLog": "تحميل السجل (PDF)",
    "compliance": "هذا السجل يفي بمتطلبات الشفافية."
  },
  "remediation": {
    "title": "دليل الإصلاح",
    "description": "تعليمات خطوة بخطوة لحل النتائج.",
    "summary": "ملخص",
    "totalSteps": "{count} خطوات للإكمال",
    "estimatedTime": "الوقت المقدر: {minutes} دقيقة",
    "phase": "المرحلة {number}: {name}",
    "phases": {
      "critical": "إصلاحات حرجة",
      "high": "أولوية عالية",
      "compliance": "فجوات الامتثال",
      "bestPractice": "أفضل الممارسات"
    },
    "step": "الخطوة {number}",
    "priority": "الأولوية",
    "complexity": {
      "simple": "بسيط (~ دقيقتان)",
      "moderate": "متوسط (~ 10 دقائق)",
      "complex": "معقد (~ 25 دقيقة)",
      "requires_review": "يتطلب مراجعة محامي (~ 60 دقيقة)"
    },
    "goToField": "الانتقال إلى الحقل",
    "markComplete": "تمييز كمكتمل",
    "skip": "تخطي",
    "undo": "تراجع",
    "progress": "{completed} من {total} خطوات مكتملة ({percent}%)",
    "allComplete": "تم إكمال جميع خطوات الإصلاح!",
    "nextStep": "الخطوة التالية",
    "filingReady": "جاهز للتقديم",
    "notReady": "غير جاهز — {remaining} خطوات متبقية"
  }
},
  tl: {
  "__meta": {
    "version": "1.0.0",
    "language": "tl",
    "languageName": "Tagalog",
    "direction": "ltr",
    "copyright": "© 2024–2026 Michael Vernen Thomas Hartmann. All Rights Reserved.",
    "lastUpdated": "2026-02-28",
    "completeness": "partial",
    "fallback": "en"
  },
  "app": {
    "title": "VERNEN™",
    "tagline": "Multilingual na Plataporma ng Legal na Pagsunod",
    "loading": "Naglo-load…",
    "error": "May nangyaring mali",
    "retry": "Subukan Muli",
    "back": "Bumalik",
    "next": "Susunod",
    "previous": "Nakaraan",
    "save": "I-save",
    "cancel": "Kanselahin",
    "close": "Isara",
    "export": "I-export",
    "print": "Print",
    "download": "Download",
    "search": "Maghanap",
    "clear": "Clear",
    "reset": "Reset",
    "confirm": "Confirm",
    "delete": "Delete",
    "edit": "Edit",
    "add": "Add",
    "remove": "Remove",
    "select": "Select",
    "required": "Kinakailangan",
    "optional": "Optional",
    "yes": "Oo",
    "no": "Hindi",
    "none": "None",
    "all": "All",
    "other": "Other",
    "unknown": "Unknown",
    "notAvailable": "N/A"
  },
  "nav": {
    "dashboard": "Dashboard",
    "documentNavigator": "Tagapag-navigate ng Dokumento",
    "validation": "Pagpapatunay",
    "filingGuide": "Gabay sa Pag-file",
    "audit": "Ulat ng Pag-audit",
    "assembly": "Pag-assemble ng Dokumento",
    "settings": "Mga Setting",
    "help": "Tulong",
    "collapse": "Collapse sidebar",
    "expand": "Expand sidebar"
  },
  "dashboard": {
    "welcome": "Maligayang pagdating sa VERNEN™",
    "subtitle": "Pumili ng module upang magsimula",
    "cards": {
      "gdn": {
        "title": "Document Navigator",
        "desc": "Browse and fill Judicial Council forms with guided annotations"
      },
      "validation": {
        "title": "Pre-Filing Validation",
        "desc": "Check forms for errors, missing fields, and compliance issues"
      },
      "filing": {
        "title": "Filing Guide",
        "desc": "Court-specific instructions, fees, and service requirements"
      },
      "audit": {
        "title": "Audit Report",
        "desc": "Generate compliance documentation and risk assessments"
      },
      "assembly": {
        "title": "Document Assembly",
        "desc": "Build multi-form filing packages with automatic data propagation"
      }
    }
  },
  "gdn": {
    "title": "Guided Document Navigator",
    "selectCategory": "Select a category",
    "selectForm": "Select a form",
    "searchForms": "Search forms…",
    "fieldAnnotation": "Field Guidance",
    "legalDefinition": "Legal Definition",
    "commonMistakes": "Common Mistakes",
    "statutoryRef": "Statutory Reference",
    "categories": {
      "family_law": "Family Law",
      "domestic_violence": "Domestic Violence",
      "custody": "Child Custody & Visitation",
      "support": "Child & Spousal Support",
      "fee_waiver": "Fee Waiver",
      "small_claims": "Small Claims",
      "civil_harassment": "Civil Harassment",
      "elder_abuse": "Elder/Dependent Adult Abuse",
      "appeals": "Appeals",
      "general": "General Use"
    },
    "noResults": "No forms match your search.",
    "formFields": "Form Fields",
    "requiredFields": "Required Fields",
    "optionalFields": "Optional Fields",
    "piiWarning": "This field contains personally identifiable information (PII)"
  },
  "validation": {
    "title": "Pre-Filing Validation",
    "runValidation": "Run Validation",
    "revalidate": "Re-Validate",
    "selectForms": "Select forms to validate",
    "overallScore": "Overall Compliance Score",
    "filingReady": "Filing Ready",
    "needsReview": "Needs Review",
    "notReady": "Not Ready",
    "findings": "Findings",
    "noFindings": "No issues found — form is ready for filing.",
    "severity": {
      "critical": "Critical",
      "error": "Error",
      "warning": "Warning",
      "info": "Info"
    },
    "categories": {
      "completeness": "Completeness",
      "format": "Format",
      "compliance": "Compliance",
      "deadline": "Deadline",
      "crossForm": "Cross-Form",
      "service": "Service",
      "procedural": "Procedural"
    },
    "messages": {
      "requiredMissing": "Required field is missing",
      "invalidFormat": "Field format is invalid",
      "deadlinePassed": "Filing deadline may have passed",
      "serviceIncomplete": "Proof of service is incomplete",
      "crossFormMismatch": "Data does not match across forms"
    }
  },
  "filingGuide": {
    "title": "Filing Guide",
    "selectCounty": "Select your county",
    "courtInfo": "Court Information",
    "filingFees": "Filing Fees",
    "serviceReqs": "Service Requirements",
    "deadlines": "Deadlines",
    "eFiling": "E-Filing",
    "inPerson": "In-Person Filing",
    "byMail": "Filing by Mail",
    "hours": "Court Hours",
    "address": "Court Address",
    "phone": "Phone",
    "feeWaivable": "Fee Waiver Eligible",
    "counties": {
      "alameda": "Alameda County",
      "solano": "Solano County",
      "marin": "Marin County",
      "san_francisco": "San Francisco County",
      "contra_costa": "Contra Costa County"
    },
    "serviceTypes": {
      "personal": "Personal Service",
      "mail": "Service by Mail",
      "electronic": "Electronic Service"
    }
  },
  "audit": {
    "title": "Audit Report",
    "generate": "Generate Report",
    "regenerate": "Regenerate",
    "overallRisk": "Overall Risk Level",
    "findings": "Audit Findings",
    "recommendations": "Recommendations",
    "riskLevels": {
      "critical": "Critical Risk",
      "high": "High Risk",
      "medium": "Medium Risk",
      "low": "Low Risk",
      "info": "Informational"
    },
    "categories": {
      "completeness": "Completeness",
      "accuracy": "Accuracy",
      "compliance": "Statutory Compliance",
      "service": "Service of Process",
      "deadlines": "Filing Deadlines",
      "crossForm": "Cross-Form Consistency",
      "procedural": "Procedural Requirements"
    },
    "summary": "Executive Summary",
    "details": "Detailed Findings",
    "noFindings": "No audit findings — documents meet compliance standards."
  },
  "assembly": {
    "title": "Document Assembly",
    "subtitle": "Build multi-form filing packages with automatic cross-form data propagation.",
    "tabs": {
      "parties": "Parties",
      "case": "Case Info",
      "children": "Children",
      "package": "Package Builder",
      "review": "Review & Export"
    },
    "petitioner": "Petitioner (Filing Party)",
    "respondent": "Respondent (Other Party)",
    "caseInfo": "Case Information",
    "children": {
      "title": "Minor Children",
      "add": "Add Child",
      "remove": "Remove",
      "empty": "No children added yet.",
      "emptyHint": "Add children if filing custody, visitation, or support forms.",
      "child": "Child"
    },
    "package": {
      "title": "Select Filing Package",
      "forms": "forms",
      "formsInPackage": "Forms in this package:",
      "types": {
        "dissolution": "Dissolution of Marriage",
        "custody_rfo": "Custody RFO Package",
        "dvro": "DV Restraining Order",
        "fee_waiver": "Fee Waiver Package",
        "custody_modification": "Custody Modification",
        "support_modification": "Support Modification",
        "contempt": "Contempt Proceeding",
        "small_claims": "Small Claims",
        "appeal": "Appeal Package"
      }
    },
    "review": {
      "completeness": "Completeness",
      "readyForAssembly": "Ready for Assembly",
      "partiallyComplete": "Partially Complete",
      "needsMoreInfo": "Needs More Information",
      "consistencyCheck": "Cross-Form Consistency",
      "runCheck": "Run Check",
      "allConsistent": "All cross-form fields are consistent.",
      "summary": "Assembly Summary"
    },
    "fields": {
      "fullName": "Full Legal Name",
      "address": "Street Address",
      "city": "City",
      "state": "State",
      "zip": "ZIP Code",
      "phone": "Phone",
      "email": "Email",
      "dob": "Date of Birth",
      "attorney": "Attorney Name (or \"In Pro Per\")",
      "barNumber": "State Bar Number",
      "caseNumber": "Case Number",
      "county": "County",
      "courtName": "Court Name",
      "courtAddress": "Court Address",
      "department": "Department",
      "filingDate": "Filing Date",
      "hearingDate": "Hearing Date",
      "hearingTime": "Hearing Time",
      "childName": "Child Full Name",
      "childDob": "Date of Birth",
      "childAge": "Current Age",
      "residessWith": "Currently Resides With"
    }
  },
  "settings": {
    "title": "Settings",
    "language": "Language",
    "selectLanguage": "Select language",
    "accessibility": "Accessibility",
    "highContrast": "High Contrast Mode",
    "largeText": "Large Text",
    "reducedMotion": "Reduced Motion",
    "focusIndicators": "Enhanced Focus Indicators",
    "errorLogs": "Error Logs",
    "exportLogs": "Export Error Logs",
    "clearLogs": "Clear Logs",
    "about": "About"
  },
  "help": {
    "title": "Help",
    "thisPage": "This Page",
    "shortcuts": "Shortcuts",
    "about": "About",
    "gettingStarted": "Getting Started",
    "closePanel": "Close help panel"
  },
  "export": {
    "title": "Export",
    "formats": {
      "html": "HTML (Print-Ready)",
      "json": "JSON",
      "csv": "CSV",
      "markdown": "Markdown",
      "text": "Plain Text"
    },
    "options": {
      "maskPII": "Mask PII Fields",
      "includeMetadata": "Include Metadata",
      "includeCitations": "Include Statutory Citations"
    },
    "success": "Export completed successfully.",
    "error": "Export failed. Please try again."
  },
  "errors": {
    "generic": "An unexpected error occurred.",
    "network": "Network error. Please check your connection.",
    "formLoad": "Failed to load form data.",
    "validationFailed": "Validation could not be completed.",
    "exportFailed": "Export failed.",
    "sessionExpired": "Your session has expired. Data has been saved.",
    "storageQuota": "Storage limit reached. Please export and clear old data.",
    "tryAgain": "Try Again",
    "reportIssue": "Report Issue",
    "goToDashboard": "Return to Dashboard"
  },
  "a11y": {
    "skipToMain": "Skip to main content",
    "skipToForm": "Skip to form section",
    "skipToNav": "Skip to navigation",
    "skipToResults": "Skip to results",
    "formProgress": "Form is {percent}% complete",
    "fieldError": "Error: {message}",
    "fieldCleared": "Error cleared",
    "newResults": "Results updated",
    "loading": "Loading, please wait"
  },
  "legal": {
    "disclaimer": "VERNEN™ provides legal form guidance and compliance checking. It does not provide legal advice. For legal counsel, consult a licensed attorney in your jurisdiction.",
    "copyright": "© 2024–2026 Michael Vernen Thomas Hartmann. All Rights Reserved.",
    "trademark": "VERNEN™ is a trademark of Michael Vernen Thomas Hartmann.",
    "ipManifest": "IP Manifest Filed February 2, 2026."
  },
  "auth": {
    "login": "Mag-login",
    "register": "Gumawa ng Account",
    "logout": "Mag-logout",
    "email": "Email Address",
    "password": "Password",
    "confirmPassword": "Kumpirmahin ang Password",
    "displayName": "Pangalan",
    "forgotPassword": "Nakalimutan ang Password?",
    "resetPassword": "I-reset ang Password",
    "resetSent": "Naipadala na ang email para sa pag-reset.",
    "loginSuccess": "Matagumpay na naka-login.",
    "registerSuccess": "Nagawa na ang account. Maligayang pagdating sa VERNEN™.",
    "logoutSuccess": "Naka-logout na.",
    "loginError": "Hindi makapag-login. Suriin ang email at password.",
    "registerError": "Hindi makapag-register. Subukan ulit.",
    "sessionExpired": "Nag-expire na ang session. Mag-login ulit.",
    "requiredField": "Kinakailangan ang field na ito.",
    "invalidEmail": "Maglagay ng wastong email address.",
    "passwordMinLength": "Ang password ay dapat hindi bababa sa 8 characters.",
    "passwordMismatch": "Hindi magkatugma ang mga password.",
    "alreadyHaveAccount": "May account ka na?",
    "noAccount": "Wala pang account?",
    "tier": {
      "guest": "Bisita",
      "free": "Libre",
      "pro": "Pro",
      "advocate": "Abogado"
    },
    "tierRequired": "Ang feature na ito ay nangangailangan ng {tier} subscription.",
    "upgradePrompt": "Mag-upgrade sa {tier} para ma-access ang feature na ito.",
    "upgradeNow": "Mag-upgrade Ngayon"
  },
  "payments": {
    "pricing": "Presyo",
    "plans": "Mga Plano",
    "currentPlan": "Kasalukuyang Plano",
    "monthly": "Buwanan",
    "annual": "Taunan",
    "perMonth": "/buwan",
    "perYear": "/taon",
    "save": "Makatipid ng {percent}%",
    "freePlan": {
      "name": "Libre",
      "description": "Pangunahing gabay sa mga form.",
      "price": "$0"
    },
    "proPlan": {
      "name": "Pro",
      "description": "Kumpletong audit, export, at multilingual support.",
      "priceMonthly": "$19.99",
      "priceAnnual": "$191.88"
    },
    "advocatePlan": {
      "name": "Abogado",
      "description": "Kumpletong platform na may document assembly at filing.",
      "priceMonthly": "$39.99",
      "priceAnnual": "$383.88"
    },
    "subscribe": "Mag-subscribe",
    "upgrade": "I-upgrade",
    "downgrade": "I-downgrade",
    "manageBilling": "Pamahalaan ang Billing",
    "cancelSubscription": "Kanselahin ang Subscription",
    "checkoutRedirect": "Nagre-redirect sa secure na pagbabayad...",
    "checkoutSuccess": "Na-activate na ang subscription!",
    "checkoutCanceled": "Nakansela ang pagbabayad.",
    "paymentFailed": "Nabigo ang pagbabayad. I-update ang paraan ng pagbabayad.",
    "subscriptionActive": "Aktibo ang subscription mo hanggang {date}.",
    "subscriptionCanceled": "Matatapos ang subscription mo sa {date}."
  },
  "esignature": {
    "title": "E-Lagda",
    "signHere": "Pumirma Dito",
    "drawSignature": "Iguhit ang Lagda",
    "typeSignature": "I-type ang Lagda",
    "uploadSignature": "I-upload ang Lagda",
    "clearSignature": "Burahin",
    "acceptSignature": "Tanggapin ang Lagda",
    "signatureRequired": "Kinakailangan ng lagda sa field na ito.",
    "wetInkRequired": "Ang field na ito ay nangangailangan ng sulat-kamay na lagda. I-print, pirmahan, at i-scan.",
    "notarizationRequired": "Ang field na ito ay nangangailangan ng notarization.",
    "intentDeclaration": "Sa pamamagitan ng pagpirma, idinedeklara ko sa ilalim ng parusa ng pagsisinungaling ayon sa mga batas ng Estado ng California na ang impormasyon sa dokumentong ito ay totoo at tama.",
    "consentCheckbox": "Naiintindihan ko na ang electronic signature na ito ay may parehong legal na epekto tulad ng sulat-kamay na lagda (Cal. Civ. Code § 1633.7).",
    "signed": "Nilagdaan",
    "unsigned": "Hindi Nilagdaan",
    "signedBy": "Nilagdaan ni {name} noong {date}",
    "revoke": "Bawiin ang Lagda",
    "revokeConfirm": "Sigurado ka bang gustong bawiin ang lagdang ito?",
    "documentChanged": "Binago ang dokumento matapos lagdaan. Kailangan ng bagong lagda.",
    "certificate": "Sertipiko ng Lagda",
    "viewCertificate": "Tingnan ang Sertipiko ng Lagda",
    "legalBasis": "Cal. Civ. Code § 1633 (UETA)"
  },
  "filing": {
    "title": "I-file sa Korte",
    "createPackage": "Gumawa ng Filing Package",
    "filingType": "Uri ng Filing",
    "selectCourt": "Pumili ng Korte",
    "caseNumber": "Numero ng Kaso",
    "newCase": "Bagong Kaso",
    "documents": "Mga Dokumento",
    "addDocument": "Magdagdag ng Dokumento",
    "proofOfService": "Katibayan ng Serbisyo",
    "filingFee": "Bayad sa Pag-file",
    "feeWaiver": "Na-approve ang Fee Waiver (FW-003)",
    "estimatedFee": "Tinatayang bayad: {amount}",
    "validate": "I-validate ang Package",
    "validationPassed": "Handa na ang filing package.",
    "validationFailed": "May {count} na error ang filing package.",
    "submit": "Isumite sa Korte",
    "submitConfirm": "Isumite ang package na ito sa {court}?",
    "submitting": "Isinusumite...",
    "submitted": "Matagumpay na naisumite.",
    "confirmationNumber": "Kumpirmasyon: {number}",
    "checkStatus": "Suriin ang Status",
    "status": {
      "draft": "Draft",
      "ready": "Handa",
      "submitting": "Isinusumite",
      "submitted": "Naisumite",
      "accepted": "Sinusuri",
      "rejected": "Tinanggihan",
      "filed": "Na-file",
      "error": "Error"
    },
    "rejected": "Tinanggihan ang filing: {reason}",
    "filedStamped": "Available na ang filed-stamped copy.",
    "downloadFiled": "I-download ang Filed Copy",
    "history": "Kasaysayan ng Filing",
    "noFilings": "Wala pang nai-file.",
    "wetInkWarning": "May mga field sa form na ito na nangangailangan ng sulat-kamay na lagda."
  },
  "traceability": {
    "title": "Rekord ng Legal Traceability",
    "description": "Rekord ng lahat ng legal sources na ginamit.",
    "sources": "Mga Pinagkunan",
    "statutes": "Mga Batas",
    "regulations": "Mga Regulasyon",
    "rulesOfCourt": "Mga Patakaran ng Korte",
    "federalCode": "Federal Code",
    "contentHash": "Content Hash (SHA-256)",
    "retrievedAt": "Kinuha Noong",
    "linkedFinding": "Kaugnay na Finding",
    "logFinalized": "Natapos at na-lock na ang log.",
    "viewLog": "Tingnan ang Log",
    "downloadLog": "I-download ang Log (PDF)",
    "compliance": "Natutugunan ng log na ito ang mga kinakailangan sa transparency."
  },
  "remediation": {
    "title": "Gabay sa Pagwawasto",
    "description": "Hakbang-hakbang na gabay para ayusin ang mga natuklasan.",
    "summary": "Buod",
    "totalSteps": "{count} hakbang na kailangang tapusin",
    "estimatedTime": "Tinatayang oras: {minutes} minuto",
    "phase": "Yugto {number}: {name}",
    "phases": {
      "critical": "Kritikal na Pagwawasto",
      "high": "Mataas na Priyoridad",
      "compliance": "Gaps sa Pagsunod",
      "bestPractice": "Pinakamahusay na Gawi"
    },
    "step": "Hakbang {number}",
    "priority": "Priyoridad",
    "complexity": {
      "simple": "Simple (~ 2 min)",
      "moderate": "Katamtaman (~ 10 min)",
      "complex": "Komplikado (~ 25 min)",
      "requires_review": "Kailangan ng Abogado (~ 60 min)"
    },
    "goToField": "Pumunta sa Field",
    "markComplete": "Markahan na Tapos",
    "skip": "Laktawan",
    "undo": "I-undo",
    "progress": "{completed} sa {total} hakbang ({percent}%)",
    "allComplete": "Lahat ng hakbang ay tapos na!",
    "nextStep": "Susunod na Hakbang",
    "filingReady": "Handa nang I-file",
    "notReady": "Hindi pa Handa — {remaining} hakbang ang natitira"
  }
},
  ru: {
  "__meta": {
    "version": "1.0.0",
    "language": "ru",
    "languageName": "Russian",
    "direction": "ltr",
    "copyright": "© 2024–2026 Michael Vernen Thomas Hartmann. All Rights Reserved.",
    "lastUpdated": "2026-02-28",
    "completeness": "partial",
    "fallback": "en"
  },
  "app": {
    "title": "VERNEN™",
    "tagline": "Многоязычная платформа правового соответствия",
    "loading": "Загрузка…",
    "error": "Произошла ошибка",
    "retry": "Повторить",
    "back": "Назад",
    "next": "Далее",
    "previous": "Предыдущий",
    "save": "Сохранить",
    "cancel": "Отмена",
    "close": "Закрыть",
    "export": "Экспорт",
    "print": "Print",
    "download": "Download",
    "search": "Поиск",
    "clear": "Clear",
    "reset": "Reset",
    "confirm": "Confirm",
    "delete": "Delete",
    "edit": "Edit",
    "add": "Add",
    "remove": "Remove",
    "select": "Select",
    "required": "Обязательно",
    "optional": "Optional",
    "yes": "Да",
    "no": "Нет",
    "none": "None",
    "all": "All",
    "other": "Other",
    "unknown": "Unknown",
    "notAvailable": "N/A"
  },
  "nav": {
    "dashboard": "Панель управления",
    "documentNavigator": "Навигатор документов",
    "validation": "Проверка",
    "filingGuide": "Руководство по подаче",
    "audit": "Аудиторский отчёт",
    "assembly": "Сборка документов",
    "settings": "Настройки",
    "help": "Справка",
    "collapse": "Collapse sidebar",
    "expand": "Expand sidebar"
  },
  "dashboard": {
    "welcome": "Добро пожаловать в VERNEN™",
    "subtitle": "Выберите модуль для начала",
    "cards": {
      "gdn": {
        "title": "Document Navigator",
        "desc": "Browse and fill Judicial Council forms with guided annotations"
      },
      "validation": {
        "title": "Pre-Filing Validation",
        "desc": "Check forms for errors, missing fields, and compliance issues"
      },
      "filing": {
        "title": "Filing Guide",
        "desc": "Court-specific instructions, fees, and service requirements"
      },
      "audit": {
        "title": "Audit Report",
        "desc": "Generate compliance documentation and risk assessments"
      },
      "assembly": {
        "title": "Document Assembly",
        "desc": "Build multi-form filing packages with automatic data propagation"
      }
    }
  },
  "gdn": {
    "title": "Guided Document Navigator",
    "selectCategory": "Select a category",
    "selectForm": "Select a form",
    "searchForms": "Search forms…",
    "fieldAnnotation": "Field Guidance",
    "legalDefinition": "Legal Definition",
    "commonMistakes": "Common Mistakes",
    "statutoryRef": "Statutory Reference",
    "categories": {
      "family_law": "Family Law",
      "domestic_violence": "Domestic Violence",
      "custody": "Child Custody & Visitation",
      "support": "Child & Spousal Support",
      "fee_waiver": "Fee Waiver",
      "small_claims": "Small Claims",
      "civil_harassment": "Civil Harassment",
      "elder_abuse": "Elder/Dependent Adult Abuse",
      "appeals": "Appeals",
      "general": "General Use"
    },
    "noResults": "No forms match your search.",
    "formFields": "Form Fields",
    "requiredFields": "Required Fields",
    "optionalFields": "Optional Fields",
    "piiWarning": "This field contains personally identifiable information (PII)"
  },
  "validation": {
    "title": "Pre-Filing Validation",
    "runValidation": "Run Validation",
    "revalidate": "Re-Validate",
    "selectForms": "Select forms to validate",
    "overallScore": "Overall Compliance Score",
    "filingReady": "Filing Ready",
    "needsReview": "Needs Review",
    "notReady": "Not Ready",
    "findings": "Findings",
    "noFindings": "No issues found — form is ready for filing.",
    "severity": {
      "critical": "Critical",
      "error": "Error",
      "warning": "Warning",
      "info": "Info"
    },
    "categories": {
      "completeness": "Completeness",
      "format": "Format",
      "compliance": "Compliance",
      "deadline": "Deadline",
      "crossForm": "Cross-Form",
      "service": "Service",
      "procedural": "Procedural"
    },
    "messages": {
      "requiredMissing": "Required field is missing",
      "invalidFormat": "Field format is invalid",
      "deadlinePassed": "Filing deadline may have passed",
      "serviceIncomplete": "Proof of service is incomplete",
      "crossFormMismatch": "Data does not match across forms"
    }
  },
  "filingGuide": {
    "title": "Filing Guide",
    "selectCounty": "Select your county",
    "courtInfo": "Court Information",
    "filingFees": "Filing Fees",
    "serviceReqs": "Service Requirements",
    "deadlines": "Deadlines",
    "eFiling": "E-Filing",
    "inPerson": "In-Person Filing",
    "byMail": "Filing by Mail",
    "hours": "Court Hours",
    "address": "Court Address",
    "phone": "Phone",
    "feeWaivable": "Fee Waiver Eligible",
    "counties": {
      "alameda": "Alameda County",
      "solano": "Solano County",
      "marin": "Marin County",
      "san_francisco": "San Francisco County",
      "contra_costa": "Contra Costa County"
    },
    "serviceTypes": {
      "personal": "Personal Service",
      "mail": "Service by Mail",
      "electronic": "Electronic Service"
    }
  },
  "audit": {
    "title": "Audit Report",
    "generate": "Generate Report",
    "regenerate": "Regenerate",
    "overallRisk": "Overall Risk Level",
    "findings": "Audit Findings",
    "recommendations": "Recommendations",
    "riskLevels": {
      "critical": "Critical Risk",
      "high": "High Risk",
      "medium": "Medium Risk",
      "low": "Low Risk",
      "info": "Informational"
    },
    "categories": {
      "completeness": "Completeness",
      "accuracy": "Accuracy",
      "compliance": "Statutory Compliance",
      "service": "Service of Process",
      "deadlines": "Filing Deadlines",
      "crossForm": "Cross-Form Consistency",
      "procedural": "Procedural Requirements"
    },
    "summary": "Executive Summary",
    "details": "Detailed Findings",
    "noFindings": "No audit findings — documents meet compliance standards."
  },
  "assembly": {
    "title": "Document Assembly",
    "subtitle": "Build multi-form filing packages with automatic cross-form data propagation.",
    "tabs": {
      "parties": "Parties",
      "case": "Case Info",
      "children": "Children",
      "package": "Package Builder",
      "review": "Review & Export"
    },
    "petitioner": "Petitioner (Filing Party)",
    "respondent": "Respondent (Other Party)",
    "caseInfo": "Case Information",
    "children": {
      "title": "Minor Children",
      "add": "Add Child",
      "remove": "Remove",
      "empty": "No children added yet.",
      "emptyHint": "Add children if filing custody, visitation, or support forms.",
      "child": "Child"
    },
    "package": {
      "title": "Select Filing Package",
      "forms": "forms",
      "formsInPackage": "Forms in this package:",
      "types": {
        "dissolution": "Dissolution of Marriage",
        "custody_rfo": "Custody RFO Package",
        "dvro": "DV Restraining Order",
        "fee_waiver": "Fee Waiver Package",
        "custody_modification": "Custody Modification",
        "support_modification": "Support Modification",
        "contempt": "Contempt Proceeding",
        "small_claims": "Small Claims",
        "appeal": "Appeal Package"
      }
    },
    "review": {
      "completeness": "Completeness",
      "readyForAssembly": "Ready for Assembly",
      "partiallyComplete": "Partially Complete",
      "needsMoreInfo": "Needs More Information",
      "consistencyCheck": "Cross-Form Consistency",
      "runCheck": "Run Check",
      "allConsistent": "All cross-form fields are consistent.",
      "summary": "Assembly Summary"
    },
    "fields": {
      "fullName": "Full Legal Name",
      "address": "Street Address",
      "city": "City",
      "state": "State",
      "zip": "ZIP Code",
      "phone": "Phone",
      "email": "Email",
      "dob": "Date of Birth",
      "attorney": "Attorney Name (or \"In Pro Per\")",
      "barNumber": "State Bar Number",
      "caseNumber": "Case Number",
      "county": "County",
      "courtName": "Court Name",
      "courtAddress": "Court Address",
      "department": "Department",
      "filingDate": "Filing Date",
      "hearingDate": "Hearing Date",
      "hearingTime": "Hearing Time",
      "childName": "Child Full Name",
      "childDob": "Date of Birth",
      "childAge": "Current Age",
      "residessWith": "Currently Resides With"
    }
  },
  "settings": {
    "title": "Settings",
    "language": "Language",
    "selectLanguage": "Select language",
    "accessibility": "Accessibility",
    "highContrast": "High Contrast Mode",
    "largeText": "Large Text",
    "reducedMotion": "Reduced Motion",
    "focusIndicators": "Enhanced Focus Indicators",
    "errorLogs": "Error Logs",
    "exportLogs": "Export Error Logs",
    "clearLogs": "Clear Logs",
    "about": "About"
  },
  "help": {
    "title": "Help",
    "thisPage": "This Page",
    "shortcuts": "Shortcuts",
    "about": "About",
    "gettingStarted": "Getting Started",
    "closePanel": "Close help panel"
  },
  "export": {
    "title": "Export",
    "formats": {
      "html": "HTML (Print-Ready)",
      "json": "JSON",
      "csv": "CSV",
      "markdown": "Markdown",
      "text": "Plain Text"
    },
    "options": {
      "maskPII": "Mask PII Fields",
      "includeMetadata": "Include Metadata",
      "includeCitations": "Include Statutory Citations"
    },
    "success": "Export completed successfully.",
    "error": "Export failed. Please try again."
  },
  "errors": {
    "generic": "An unexpected error occurred.",
    "network": "Network error. Please check your connection.",
    "formLoad": "Failed to load form data.",
    "validationFailed": "Validation could not be completed.",
    "exportFailed": "Export failed.",
    "sessionExpired": "Your session has expired. Data has been saved.",
    "storageQuota": "Storage limit reached. Please export and clear old data.",
    "tryAgain": "Try Again",
    "reportIssue": "Report Issue",
    "goToDashboard": "Return to Dashboard"
  },
  "a11y": {
    "skipToMain": "Skip to main content",
    "skipToForm": "Skip to form section",
    "skipToNav": "Skip to navigation",
    "skipToResults": "Skip to results",
    "formProgress": "Form is {percent}% complete",
    "fieldError": "Error: {message}",
    "fieldCleared": "Error cleared",
    "newResults": "Results updated",
    "loading": "Loading, please wait"
  },
  "legal": {
    "disclaimer": "VERNEN™ предоставляет руководство по заполнению юридических форм и проверку соответствия. Не является юридической консультацией. Для получения юридической помощи обратитесь к лицензированному адвокату в вашей юрисдикции.",
    "copyright": "© 2024–2026 Michael Vernen Thomas Hartmann. All Rights Reserved.",
    "trademark": "VERNEN™ is a trademark of Michael Vernen Thomas Hartmann.",
    "ipManifest": "IP Manifest Filed February 2, 2026."
  },
  "auth": {
    "login": "Войти",
    "register": "Создать аккаунт",
    "logout": "Выйти",
    "email": "Электронная почта",
    "password": "Пароль",
    "confirmPassword": "Подтвердите пароль",
    "displayName": "Отображаемое имя",
    "forgotPassword": "Забыли пароль?",
    "resetPassword": "Сбросить пароль",
    "resetSent": "Письмо для сброса пароля отправлено.",
    "loginSuccess": "Вход выполнен успешно.",
    "registerSuccess": "Аккаунт создан. Добро пожаловать в VERNEN™.",
    "logoutSuccess": "Выход выполнен.",
    "loginError": "Ошибка входа. Проверьте почту и пароль.",
    "registerError": "Ошибка регистрации. Попробуйте снова.",
    "sessionExpired": "Сессия истекла. Войдите снова.",
    "requiredField": "Обязательное поле.",
    "invalidEmail": "Введите действительный адрес электронной почты.",
    "passwordMinLength": "Пароль должен быть не менее 8 символов.",
    "passwordMismatch": "Пароли не совпадают.",
    "alreadyHaveAccount": "Уже есть аккаунт?",
    "noAccount": "Нет аккаунта?",
    "tier": {
      "guest": "Гость",
      "free": "Бесплатный",
      "pro": "Профессиональный",
      "advocate": "Адвокат"
    },
    "tierRequired": "Эта функция требует подписку {tier}.",
    "upgradePrompt": "Обновитесь до {tier} для доступа к этой функции.",
    "upgradeNow": "Обновить сейчас"
  },
  "payments": {
    "pricing": "Цены",
    "plans": "Тарифы",
    "currentPlan": "Текущий тариф",
    "monthly": "Ежемесячно",
    "annual": "Ежегодно",
    "perMonth": "/мес",
    "perYear": "/год",
    "save": "Экономия {percent}%",
    "freePlan": {
      "name": "Бесплатный",
      "description": "Базовое руководство по формам.",
      "price": "$0"
    },
    "proPlan": {
      "name": "Профессиональный",
      "description": "Полный аудит, экспорт и многоязычная поддержка.",
      "priceMonthly": "$19.99",
      "priceAnnual": "$191.88"
    },
    "advocatePlan": {
      "name": "Адвокат",
      "description": "Полная платформа со сборкой документов и подачей.",
      "priceMonthly": "$39.99",
      "priceAnnual": "$383.88"
    },
    "subscribe": "Подписаться",
    "upgrade": "Обновить",
    "downgrade": "Понизить",
    "manageBilling": "Управление оплатой",
    "cancelSubscription": "Отменить подписку",
    "checkoutRedirect": "Перенаправление на безопасную оплату...",
    "checkoutSuccess": "Подписка активирована!",
    "checkoutCanceled": "Оплата отменена.",
    "paymentFailed": "Оплата не прошла. Обновите способ оплаты.",
    "subscriptionActive": "Ваша подписка активна до {date}.",
    "subscriptionCanceled": "Ваша подписка завершится {date}."
  },
  "esignature": {
    "title": "Электронная подпись",
    "signHere": "Подпишите здесь",
    "drawSignature": "Нарисовать подпись",
    "typeSignature": "Ввести подпись",
    "uploadSignature": "Загрузить подпись",
    "clearSignature": "Очистить",
    "acceptSignature": "Принять подпись",
    "signatureRequired": "В этом поле требуется подпись.",
    "wetInkRequired": "Это поле требует собственноручную подпись. Распечатайте, подпишите и отсканируйте.",
    "notarizationRequired": "Это поле требует нотариального заверения.",
    "intentDeclaration": "Подписывая, я заявляю под страхом наказания за лжесвидетельство по законам штата Калифорния, что информация в этом документе является правдивой и верной.",
    "consentCheckbox": "Я понимаю, что эта электронная подпись имеет такую же юридическую силу, как и собственноручная подпись (Гражданский кодекс Калифорнии § 1633.7).",
    "signed": "Подписано",
    "unsigned": "Не подписано",
    "signedBy": "Подписано {name} {date}",
    "revoke": "Отозвать подпись",
    "revokeConfirm": "Вы уверены, что хотите отозвать подпись?",
    "documentChanged": "Документ изменён после подписания. Требуется повторная подпись.",
    "certificate": "Сертификат подписи",
    "viewCertificate": "Просмотреть сертификат подписи",
    "legalBasis": "Гражданский кодекс Калифорнии § 1633 (UETA)"
  },
  "filing": {
    "title": "Подача в суд",
    "createPackage": "Создать пакет документов",
    "filingType": "Тип подачи",
    "selectCourt": "Выбрать суд",
    "caseNumber": "Номер дела",
    "newCase": "Новое дело",
    "documents": "Документы",
    "addDocument": "Добавить документ",
    "proofOfService": "Подтверждение вручения",
    "filingFee": "Пошлина за подачу",
    "feeWaiver": "Освобождение от пошлины (FW-003)",
    "estimatedFee": "Ориентировочная пошлина: {amount}",
    "validate": "Проверить пакет",
    "validationPassed": "Пакет готов к подаче.",
    "validationFailed": "В пакете {count} ошибок.",
    "submit": "Подать в суд",
    "submitConfirm": "Подать этот пакет в {court}?",
    "submitting": "Подача...",
    "submitted": "Подача выполнена успешно.",
    "confirmationNumber": "Подтверждение: {number}",
    "checkStatus": "Проверить статус",
    "status": {
      "draft": "Черновик",
      "ready": "Готов",
      "submitting": "Подаётся",
      "submitted": "Подано",
      "accepted": "На рассмотрении",
      "rejected": "Отклонено",
      "filed": "Зарегистрировано",
      "error": "Ошибка"
    },
    "rejected": "Подача отклонена: {reason}",
    "filedStamped": "Заверенная копия доступна.",
    "downloadFiled": "Скачать заверенную копию",
    "history": "История подач",
    "noFilings": "Нет подач.",
    "wetInkWarning": "В этой форме есть поля, требующие собственноручной подписи."
  },
  "traceability": {
    "title": "Журнал отслеживания законодательства",
    "description": "Запись всех правовых источников, использованных при аудите.",
    "sources": "Источники",
    "statutes": "Законы",
    "regulations": "Нормативные акты",
    "rulesOfCourt": "Правила суда",
    "federalCode": "Федеральный кодекс",
    "contentHash": "Хэш содержимого (SHA-256)",
    "retrievedAt": "Получено",
    "linkedFinding": "Связанное обнаружение",
    "logFinalized": "Журнал завершён и заблокирован.",
    "viewLog": "Просмотреть журнал",
    "downloadLog": "Скачать журнал (PDF)",
    "compliance": "Этот журнал соответствует требованиям прозрачности."
  },
  "remediation": {
    "title": "Руководство по исправлению",
    "description": "Пошаговые инструкции по устранению обнаруженных проблем.",
    "summary": "Сводка",
    "totalSteps": "{count} шагов для выполнения",
    "estimatedTime": "Расчётное время: {minutes} минут",
    "phase": "Этап {number}: {name}",
    "phases": {
      "critical": "Критические исправления",
      "high": "Высокий приоритет",
      "compliance": "Пробелы в соответствии",
      "bestPractice": "Лучшие практики"
    },
    "step": "Шаг {number}",
    "priority": "Приоритет",
    "complexity": {
      "simple": "Просто (~ 2 мин)",
      "moderate": "Умеренно (~ 10 мин)",
      "complex": "Сложно (~ 25 мин)",
      "requires_review": "Требуется проверка юриста (~ 60 мин)"
    },
    "goToField": "Перейти к полю",
    "markComplete": "Отметить выполненным",
    "skip": "Пропустить",
    "undo": "Отменить",
    "progress": "Выполнено {completed} из {total} шагов ({percent}%)",
    "allComplete": "Все шаги выполнены!",
    "nextStep": "Следующий шаг",
    "filingReady": "Готов к подаче",
    "notReady": "Не готов — осталось {remaining} шагов"
  }
},
  pt: {
  "__meta": {
    "version": "1.0.0",
    "language": "pt",
    "languageName": "Portuguese",
    "direction": "ltr",
    "copyright": "© 2024–2026 Michael Vernen Thomas Hartmann. All Rights Reserved.",
    "lastUpdated": "2026-02-28",
    "completeness": "partial",
    "fallback": "en"
  },
  "app": {
    "title": "VERNEN™",
    "tagline": "Plataforma Multilíngue de Conformidade Jurídica",
    "loading": "Carregando…",
    "error": "Algo deu errado",
    "retry": "Tentar Novamente",
    "back": "Voltar",
    "next": "Próximo",
    "previous": "Anterior",
    "save": "Salvar",
    "cancel": "Cancelar",
    "close": "Fechar",
    "export": "Exportar",
    "print": "Print",
    "download": "Download",
    "search": "Buscar",
    "clear": "Clear",
    "reset": "Reset",
    "confirm": "Confirm",
    "delete": "Delete",
    "edit": "Edit",
    "add": "Add",
    "remove": "Remove",
    "select": "Select",
    "required": "Obrigatório",
    "optional": "Optional",
    "yes": "Sim",
    "no": "Não",
    "none": "None",
    "all": "All",
    "other": "Other",
    "unknown": "Unknown",
    "notAvailable": "N/A"
  },
  "nav": {
    "dashboard": "Painel",
    "documentNavigator": "Navegador de Documentos",
    "validation": "Validação",
    "filingGuide": "Guia de Protocolo",
    "audit": "Relatório de Auditoria",
    "assembly": "Montagem de Documentos",
    "settings": "Configurações",
    "help": "Ajuda",
    "collapse": "Collapse sidebar",
    "expand": "Expand sidebar"
  },
  "dashboard": {
    "welcome": "Bem-vindo ao VERNEN™",
    "subtitle": "Escolha um módulo para começar",
    "cards": {
      "gdn": {
        "title": "Document Navigator",
        "desc": "Browse and fill Judicial Council forms with guided annotations"
      },
      "validation": {
        "title": "Pre-Filing Validation",
        "desc": "Check forms for errors, missing fields, and compliance issues"
      },
      "filing": {
        "title": "Filing Guide",
        "desc": "Court-specific instructions, fees, and service requirements"
      },
      "audit": {
        "title": "Audit Report",
        "desc": "Generate compliance documentation and risk assessments"
      },
      "assembly": {
        "title": "Document Assembly",
        "desc": "Build multi-form filing packages with automatic data propagation"
      }
    }
  },
  "gdn": {
    "title": "Guided Document Navigator",
    "selectCategory": "Select a category",
    "selectForm": "Select a form",
    "searchForms": "Search forms…",
    "fieldAnnotation": "Field Guidance",
    "legalDefinition": "Legal Definition",
    "commonMistakes": "Common Mistakes",
    "statutoryRef": "Statutory Reference",
    "categories": {
      "family_law": "Family Law",
      "domestic_violence": "Domestic Violence",
      "custody": "Child Custody & Visitation",
      "support": "Child & Spousal Support",
      "fee_waiver": "Fee Waiver",
      "small_claims": "Small Claims",
      "civil_harassment": "Civil Harassment",
      "elder_abuse": "Elder/Dependent Adult Abuse",
      "appeals": "Appeals",
      "general": "General Use"
    },
    "noResults": "No forms match your search.",
    "formFields": "Form Fields",
    "requiredFields": "Required Fields",
    "optionalFields": "Optional Fields",
    "piiWarning": "This field contains personally identifiable information (PII)"
  },
  "validation": {
    "title": "Pre-Filing Validation",
    "runValidation": "Run Validation",
    "revalidate": "Re-Validate",
    "selectForms": "Select forms to validate",
    "overallScore": "Overall Compliance Score",
    "filingReady": "Filing Ready",
    "needsReview": "Needs Review",
    "notReady": "Not Ready",
    "findings": "Findings",
    "noFindings": "No issues found — form is ready for filing.",
    "severity": {
      "critical": "Critical",
      "error": "Error",
      "warning": "Warning",
      "info": "Info"
    },
    "categories": {
      "completeness": "Completeness",
      "format": "Format",
      "compliance": "Compliance",
      "deadline": "Deadline",
      "crossForm": "Cross-Form",
      "service": "Service",
      "procedural": "Procedural"
    },
    "messages": {
      "requiredMissing": "Required field is missing",
      "invalidFormat": "Field format is invalid",
      "deadlinePassed": "Filing deadline may have passed",
      "serviceIncomplete": "Proof of service is incomplete",
      "crossFormMismatch": "Data does not match across forms"
    }
  },
  "filingGuide": {
    "title": "Filing Guide",
    "selectCounty": "Select your county",
    "courtInfo": "Court Information",
    "filingFees": "Filing Fees",
    "serviceReqs": "Service Requirements",
    "deadlines": "Deadlines",
    "eFiling": "E-Filing",
    "inPerson": "In-Person Filing",
    "byMail": "Filing by Mail",
    "hours": "Court Hours",
    "address": "Court Address",
    "phone": "Phone",
    "feeWaivable": "Fee Waiver Eligible",
    "counties": {
      "alameda": "Alameda County",
      "solano": "Solano County",
      "marin": "Marin County",
      "san_francisco": "San Francisco County",
      "contra_costa": "Contra Costa County"
    },
    "serviceTypes": {
      "personal": "Personal Service",
      "mail": "Service by Mail",
      "electronic": "Electronic Service"
    }
  },
  "audit": {
    "title": "Audit Report",
    "generate": "Generate Report",
    "regenerate": "Regenerate",
    "overallRisk": "Overall Risk Level",
    "findings": "Audit Findings",
    "recommendations": "Recommendations",
    "riskLevels": {
      "critical": "Critical Risk",
      "high": "High Risk",
      "medium": "Medium Risk",
      "low": "Low Risk",
      "info": "Informational"
    },
    "categories": {
      "completeness": "Completeness",
      "accuracy": "Accuracy",
      "compliance": "Statutory Compliance",
      "service": "Service of Process",
      "deadlines": "Filing Deadlines",
      "crossForm": "Cross-Form Consistency",
      "procedural": "Procedural Requirements"
    },
    "summary": "Executive Summary",
    "details": "Detailed Findings",
    "noFindings": "No audit findings — documents meet compliance standards."
  },
  "assembly": {
    "title": "Document Assembly",
    "subtitle": "Build multi-form filing packages with automatic cross-form data propagation.",
    "tabs": {
      "parties": "Parties",
      "case": "Case Info",
      "children": "Children",
      "package": "Package Builder",
      "review": "Review & Export"
    },
    "petitioner": "Petitioner (Filing Party)",
    "respondent": "Respondent (Other Party)",
    "caseInfo": "Case Information",
    "children": {
      "title": "Minor Children",
      "add": "Add Child",
      "remove": "Remove",
      "empty": "No children added yet.",
      "emptyHint": "Add children if filing custody, visitation, or support forms.",
      "child": "Child"
    },
    "package": {
      "title": "Select Filing Package",
      "forms": "forms",
      "formsInPackage": "Forms in this package:",
      "types": {
        "dissolution": "Dissolution of Marriage",
        "custody_rfo": "Custody RFO Package",
        "dvro": "DV Restraining Order",
        "fee_waiver": "Fee Waiver Package",
        "custody_modification": "Custody Modification",
        "support_modification": "Support Modification",
        "contempt": "Contempt Proceeding",
        "small_claims": "Small Claims",
        "appeal": "Appeal Package"
      }
    },
    "review": {
      "completeness": "Completeness",
      "readyForAssembly": "Ready for Assembly",
      "partiallyComplete": "Partially Complete",
      "needsMoreInfo": "Needs More Information",
      "consistencyCheck": "Cross-Form Consistency",
      "runCheck": "Run Check",
      "allConsistent": "All cross-form fields are consistent.",
      "summary": "Assembly Summary"
    },
    "fields": {
      "fullName": "Full Legal Name",
      "address": "Street Address",
      "city": "City",
      "state": "State",
      "zip": "ZIP Code",
      "phone": "Phone",
      "email": "Email",
      "dob": "Date of Birth",
      "attorney": "Attorney Name (or \"In Pro Per\")",
      "barNumber": "State Bar Number",
      "caseNumber": "Case Number",
      "county": "County",
      "courtName": "Court Name",
      "courtAddress": "Court Address",
      "department": "Department",
      "filingDate": "Filing Date",
      "hearingDate": "Hearing Date",
      "hearingTime": "Hearing Time",
      "childName": "Child Full Name",
      "childDob": "Date of Birth",
      "childAge": "Current Age",
      "residessWith": "Currently Resides With"
    }
  },
  "settings": {
    "title": "Settings",
    "language": "Language",
    "selectLanguage": "Select language",
    "accessibility": "Accessibility",
    "highContrast": "High Contrast Mode",
    "largeText": "Large Text",
    "reducedMotion": "Reduced Motion",
    "focusIndicators": "Enhanced Focus Indicators",
    "errorLogs": "Error Logs",
    "exportLogs": "Export Error Logs",
    "clearLogs": "Clear Logs",
    "about": "About"
  },
  "help": {
    "title": "Help",
    "thisPage": "This Page",
    "shortcuts": "Shortcuts",
    "about": "About",
    "gettingStarted": "Getting Started",
    "closePanel": "Close help panel"
  },
  "export": {
    "title": "Export",
    "formats": {
      "html": "HTML (Print-Ready)",
      "json": "JSON",
      "csv": "CSV",
      "markdown": "Markdown",
      "text": "Plain Text"
    },
    "options": {
      "maskPII": "Mask PII Fields",
      "includeMetadata": "Include Metadata",
      "includeCitations": "Include Statutory Citations"
    },
    "success": "Export completed successfully.",
    "error": "Export failed. Please try again."
  },
  "errors": {
    "generic": "An unexpected error occurred.",
    "network": "Network error. Please check your connection.",
    "formLoad": "Failed to load form data.",
    "validationFailed": "Validation could not be completed.",
    "exportFailed": "Export failed.",
    "sessionExpired": "Your session has expired. Data has been saved.",
    "storageQuota": "Storage limit reached. Please export and clear old data.",
    "tryAgain": "Try Again",
    "reportIssue": "Report Issue",
    "goToDashboard": "Return to Dashboard"
  },
  "a11y": {
    "skipToMain": "Skip to main content",
    "skipToForm": "Skip to form section",
    "skipToNav": "Skip to navigation",
    "skipToResults": "Skip to results",
    "formProgress": "Form is {percent}% complete",
    "fieldError": "Error: {message}",
    "fieldCleared": "Error cleared",
    "newResults": "Results updated",
    "loading": "Loading, please wait"
  },
  "legal": {
    "disclaimer": "VERNEN™ provides legal form guidance and compliance checking. It does not provide legal advice. For legal counsel, consult a licensed attorney in your jurisdiction.",
    "copyright": "© 2024–2026 Michael Vernen Thomas Hartmann. All Rights Reserved.",
    "trademark": "VERNEN™ is a trademark of Michael Vernen Thomas Hartmann.",
    "ipManifest": "IP Manifest Filed February 2, 2026."
  },
  "auth": {
    "login": "Entrar",
    "register": "Criar Conta",
    "logout": "Sair",
    "email": "Endereço de E-mail",
    "password": "Senha",
    "confirmPassword": "Confirmar Senha",
    "displayName": "Nome de Exibição",
    "forgotPassword": "Esqueceu a Senha?",
    "resetPassword": "Redefinir Senha",
    "resetSent": "E-mail de redefinição enviado. Verifique sua caixa de entrada.",
    "loginSuccess": "Login realizado com sucesso.",
    "registerSuccess": "Conta criada. Bem-vindo ao VERNEN™.",
    "logoutSuccess": "Sessão encerrada.",
    "loginError": "Falha no login. Verifique seu e-mail e senha.",
    "registerError": "Falha no registro. Tente novamente.",
    "sessionExpired": "Sessão expirada. Faça login novamente.",
    "requiredField": "Campo obrigatório.",
    "invalidEmail": "Insira um endereço de e-mail válido.",
    "passwordMinLength": "A senha deve ter pelo menos 8 caracteres.",
    "passwordMismatch": "As senhas não coincidem.",
    "alreadyHaveAccount": "Já tem uma conta?",
    "noAccount": "Não tem conta?",
    "tier": {
      "guest": "Visitante",
      "free": "Gratuito",
      "pro": "Profissional",
      "advocate": "Advogado"
    },
    "tierRequired": "Este recurso requer assinatura {tier}.",
    "upgradePrompt": "Atualize para {tier} para acessar este recurso.",
    "upgradeNow": "Atualizar Agora"
  },
  "payments": {
    "pricing": "Preços",
    "plans": "Planos",
    "currentPlan": "Plano Atual",
    "monthly": "Mensal",
    "annual": "Anual",
    "perMonth": "/mês",
    "perYear": "/ano",
    "save": "Economize {percent}%",
    "freePlan": {
      "name": "Gratuito",
      "description": "Orientação básica de formulários.",
      "price": "$0"
    },
    "proPlan": {
      "name": "Profissional",
      "description": "Auditoria completa, exportação e suporte multilíngue.",
      "priceMonthly": "$19.99",
      "priceAnnual": "$191.88"
    },
    "advocatePlan": {
      "name": "Advogado",
      "description": "Plataforma completa com montagem e protocolo de documentos.",
      "priceMonthly": "$39.99",
      "priceAnnual": "$383.88"
    },
    "subscribe": "Assinar",
    "upgrade": "Atualizar",
    "downgrade": "Rebaixar",
    "manageBilling": "Gerenciar Cobrança",
    "cancelSubscription": "Cancelar Assinatura",
    "checkoutRedirect": "Redirecionando para pagamento seguro...",
    "checkoutSuccess": "Assinatura ativada!",
    "checkoutCanceled": "Pagamento cancelado.",
    "paymentFailed": "Pagamento falhou. Atualize seu método de pagamento.",
    "subscriptionActive": "Sua assinatura está ativa até {date}.",
    "subscriptionCanceled": "Sua assinatura terminará em {date}."
  },
  "esignature": {
    "title": "Assinatura Eletrônica",
    "signHere": "Assine Aqui",
    "drawSignature": "Desenhar Assinatura",
    "typeSignature": "Digitar Assinatura",
    "uploadSignature": "Enviar Assinatura",
    "clearSignature": "Limpar",
    "acceptSignature": "Aceitar Assinatura",
    "signatureRequired": "Assinatura obrigatória neste campo.",
    "wetInkRequired": "Este campo requer assinatura manuscrita. Imprima, assine e digitalize.",
    "notarizationRequired": "Este campo requer reconhecimento de firma.",
    "intentDeclaration": "Ao assinar, declaro sob pena de perjúrio, de acordo com as leis do Estado da Califórnia, que as informações neste documento são verdadeiras e corretas.",
    "consentCheckbox": "Entendo que esta assinatura eletrônica tem o mesmo efeito legal que uma assinatura manuscrita (Cód. Civ. Cal. § 1633.7).",
    "signed": "Assinado",
    "unsigned": "Não Assinado",
    "signedBy": "Assinado por {name} em {date}",
    "revoke": "Revogar Assinatura",
    "revokeConfirm": "Tem certeza de que deseja revogar esta assinatura?",
    "documentChanged": "Documento modificado após assinatura. Nova assinatura necessária.",
    "certificate": "Certificado de Assinatura",
    "viewCertificate": "Ver Certificado de Assinatura",
    "legalBasis": "Cód. Civ. Cal. § 1633 (UETA)"
  },
  "filing": {
    "title": "Protocolar no Tribunal",
    "createPackage": "Criar Pacote de Protocolo",
    "filingType": "Tipo de Protocolo",
    "selectCourt": "Selecionar Tribunal",
    "caseNumber": "Número do Processo",
    "newCase": "Novo Processo",
    "documents": "Documentos",
    "addDocument": "Adicionar Documento",
    "proofOfService": "Comprovante de Citação",
    "filingFee": "Taxa de Protocolo",
    "feeWaiver": "Isenção de Taxa Concedida (FW-003)",
    "estimatedFee": "Taxa estimada: {amount}",
    "validate": "Validar Pacote",
    "validationPassed": "Pacote pronto para envio.",
    "validationFailed": "Pacote com {count} erro(s).",
    "submit": "Protocolar no Tribunal",
    "submitConfirm": "Protocolar este pacote em {court}?",
    "submitting": "Protocolando...",
    "submitted": "Protocolo enviado com sucesso.",
    "confirmationNumber": "Confirmação: {number}",
    "checkStatus": "Verificar Status",
    "status": {
      "draft": "Rascunho",
      "ready": "Pronto",
      "submitting": "Enviando",
      "submitted": "Enviado",
      "accepted": "Em Análise",
      "rejected": "Rejeitado",
      "filed": "Protocolado",
      "error": "Erro"
    },
    "rejected": "Protocolo rejeitado: {reason}",
    "filedStamped": "Cópia carimbada disponível.",
    "downloadFiled": "Baixar Cópia Carimbada",
    "history": "Histórico de Protocolos",
    "noFilings": "Nenhum protocolo.",
    "wetInkWarning": "Este formulário tem campos que requerem assinatura manuscrita."
  },
  "traceability": {
    "title": "Registro de Rastreabilidade Legal",
    "description": "Registro de todas as fontes legais consultadas.",
    "sources": "Fontes Consultadas",
    "statutes": "Estatutos",
    "regulations": "Regulamentos",
    "rulesOfCourt": "Regras do Tribunal",
    "federalCode": "Código Federal",
    "contentHash": "Hash do Conteúdo (SHA-256)",
    "retrievedAt": "Consultado Em",
    "linkedFinding": "Achado Vinculado",
    "logFinalized": "Registro finalizado e bloqueado.",
    "viewLog": "Ver Registro",
    "downloadLog": "Baixar Registro (PDF)",
    "compliance": "Este registro atende aos requisitos de transparência."
  },
  "remediation": {
    "title": "Guia de Correção",
    "description": "Instruções passo a passo para resolver achados.",
    "summary": "Resumo",
    "totalSteps": "{count} passos para completar",
    "estimatedTime": "Tempo estimado: {minutes} minutos",
    "phase": "Fase {number}: {name}",
    "phases": {
      "critical": "Correções Críticas",
      "high": "Alta Prioridade",
      "compliance": "Lacunas de Conformidade",
      "bestPractice": "Melhores Práticas"
    },
    "step": "Passo {number}",
    "priority": "Prioridade",
    "complexity": {
      "simple": "Simples (~ 2 min)",
      "moderate": "Moderado (~ 10 min)",
      "complex": "Complexo (~ 25 min)",
      "requires_review": "Requer Revisão de Advogado (~ 60 min)"
    },
    "goToField": "Ir ao Campo",
    "markComplete": "Marcar Concluído",
    "skip": "Pular",
    "undo": "Desfazer",
    "progress": "{completed} de {total} passos ({percent}%)",
    "allComplete": "Todos os passos concluídos!",
    "nextStep": "Próximo Passo",
    "filingReady": "Pronto para Protocolar",
    "notReady": "Não Pronto — {remaining} passos restantes"
  }
},
  ht: {
  "__meta": {
    "version": "1.0.0",
    "language": "ht",
    "languageName": "Haitian Creole",
    "direction": "ltr",
    "copyright": "© 2024–2026 Michael Vernen Thomas Hartmann. All Rights Reserved.",
    "lastUpdated": "2026-02-28",
    "completeness": "partial",
    "fallback": "en"
  },
  "app": {
    "title": "VERNEN™",
    "tagline": "Platfòm Konfòmite Legal Miltilingwis",
    "loading": "Ap chaje…",
    "error": "Yon bagay ale mal",
    "retry": "Eseye Ankò",
    "back": "Retounen",
    "next": "Pwochen",
    "previous": "Anvan",
    "save": "Sove",
    "cancel": "Anile",
    "close": "Fèmen",
    "export": "Ekspòte",
    "print": "Print",
    "download": "Download",
    "search": "Chèche",
    "clear": "Clear",
    "reset": "Reset",
    "confirm": "Confirm",
    "delete": "Delete",
    "edit": "Edit",
    "add": "Add",
    "remove": "Remove",
    "select": "Select",
    "required": "Obligatwa",
    "optional": "Optional",
    "yes": "Wi",
    "no": "Non",
    "none": "None",
    "all": "All",
    "other": "Other",
    "unknown": "Unknown",
    "notAvailable": "N/A"
  },
  "nav": {
    "dashboard": "Tablo",
    "documentNavigator": "Navigatè Dokiman",
    "validation": "Validasyon",
    "filingGuide": "Gid pou Depoze",
    "audit": "Rapò Odit",
    "assembly": "Asanble Dokiman",
    "settings": "Paramèt",
    "help": "Èd",
    "collapse": "Collapse sidebar",
    "expand": "Expand sidebar"
  },
  "dashboard": {
    "welcome": "Byenveni nan VERNEN™",
    "subtitle": "Chwazi yon modil pou kòmanse",
    "cards": {
      "gdn": {
        "title": "Document Navigator",
        "desc": "Browse and fill Judicial Council forms with guided annotations"
      },
      "validation": {
        "title": "Pre-Filing Validation",
        "desc": "Check forms for errors, missing fields, and compliance issues"
      },
      "filing": {
        "title": "Filing Guide",
        "desc": "Court-specific instructions, fees, and service requirements"
      },
      "audit": {
        "title": "Audit Report",
        "desc": "Generate compliance documentation and risk assessments"
      },
      "assembly": {
        "title": "Document Assembly",
        "desc": "Build multi-form filing packages with automatic data propagation"
      }
    }
  },
  "gdn": {
    "title": "Guided Document Navigator",
    "selectCategory": "Select a category",
    "selectForm": "Select a form",
    "searchForms": "Search forms…",
    "fieldAnnotation": "Field Guidance",
    "legalDefinition": "Legal Definition",
    "commonMistakes": "Common Mistakes",
    "statutoryRef": "Statutory Reference",
    "categories": {
      "family_law": "Family Law",
      "domestic_violence": "Domestic Violence",
      "custody": "Child Custody & Visitation",
      "support": "Child & Spousal Support",
      "fee_waiver": "Fee Waiver",
      "small_claims": "Small Claims",
      "civil_harassment": "Civil Harassment",
      "elder_abuse": "Elder/Dependent Adult Abuse",
      "appeals": "Appeals",
      "general": "General Use"
    },
    "noResults": "No forms match your search.",
    "formFields": "Form Fields",
    "requiredFields": "Required Fields",
    "optionalFields": "Optional Fields",
    "piiWarning": "This field contains personally identifiable information (PII)"
  },
  "validation": {
    "title": "Pre-Filing Validation",
    "runValidation": "Run Validation",
    "revalidate": "Re-Validate",
    "selectForms": "Select forms to validate",
    "overallScore": "Overall Compliance Score",
    "filingReady": "Filing Ready",
    "needsReview": "Needs Review",
    "notReady": "Not Ready",
    "findings": "Findings",
    "noFindings": "No issues found — form is ready for filing.",
    "severity": {
      "critical": "Critical",
      "error": "Error",
      "warning": "Warning",
      "info": "Info"
    },
    "categories": {
      "completeness": "Completeness",
      "format": "Format",
      "compliance": "Compliance",
      "deadline": "Deadline",
      "crossForm": "Cross-Form",
      "service": "Service",
      "procedural": "Procedural"
    },
    "messages": {
      "requiredMissing": "Required field is missing",
      "invalidFormat": "Field format is invalid",
      "deadlinePassed": "Filing deadline may have passed",
      "serviceIncomplete": "Proof of service is incomplete",
      "crossFormMismatch": "Data does not match across forms"
    }
  },
  "filingGuide": {
    "title": "Filing Guide",
    "selectCounty": "Select your county",
    "courtInfo": "Court Information",
    "filingFees": "Filing Fees",
    "serviceReqs": "Service Requirements",
    "deadlines": "Deadlines",
    "eFiling": "E-Filing",
    "inPerson": "In-Person Filing",
    "byMail": "Filing by Mail",
    "hours": "Court Hours",
    "address": "Court Address",
    "phone": "Phone",
    "feeWaivable": "Fee Waiver Eligible",
    "counties": {
      "alameda": "Alameda County",
      "solano": "Solano County",
      "marin": "Marin County",
      "san_francisco": "San Francisco County",
      "contra_costa": "Contra Costa County"
    },
    "serviceTypes": {
      "personal": "Personal Service",
      "mail": "Service by Mail",
      "electronic": "Electronic Service"
    }
  },
  "audit": {
    "title": "Audit Report",
    "generate": "Generate Report",
    "regenerate": "Regenerate",
    "overallRisk": "Overall Risk Level",
    "findings": "Audit Findings",
    "recommendations": "Recommendations",
    "riskLevels": {
      "critical": "Critical Risk",
      "high": "High Risk",
      "medium": "Medium Risk",
      "low": "Low Risk",
      "info": "Informational"
    },
    "categories": {
      "completeness": "Completeness",
      "accuracy": "Accuracy",
      "compliance": "Statutory Compliance",
      "service": "Service of Process",
      "deadlines": "Filing Deadlines",
      "crossForm": "Cross-Form Consistency",
      "procedural": "Procedural Requirements"
    },
    "summary": "Executive Summary",
    "details": "Detailed Findings",
    "noFindings": "No audit findings — documents meet compliance standards."
  },
  "assembly": {
    "title": "Document Assembly",
    "subtitle": "Build multi-form filing packages with automatic cross-form data propagation.",
    "tabs": {
      "parties": "Parties",
      "case": "Case Info",
      "children": "Children",
      "package": "Package Builder",
      "review": "Review & Export"
    },
    "petitioner": "Petitioner (Filing Party)",
    "respondent": "Respondent (Other Party)",
    "caseInfo": "Case Information",
    "children": {
      "title": "Minor Children",
      "add": "Add Child",
      "remove": "Remove",
      "empty": "No children added yet.",
      "emptyHint": "Add children if filing custody, visitation, or support forms.",
      "child": "Child"
    },
    "package": {
      "title": "Select Filing Package",
      "forms": "forms",
      "formsInPackage": "Forms in this package:",
      "types": {
        "dissolution": "Dissolution of Marriage",
        "custody_rfo": "Custody RFO Package",
        "dvro": "DV Restraining Order",
        "fee_waiver": "Fee Waiver Package",
        "custody_modification": "Custody Modification",
        "support_modification": "Support Modification",
        "contempt": "Contempt Proceeding",
        "small_claims": "Small Claims",
        "appeal": "Appeal Package"
      }
    },
    "review": {
      "completeness": "Completeness",
      "readyForAssembly": "Ready for Assembly",
      "partiallyComplete": "Partially Complete",
      "needsMoreInfo": "Needs More Information",
      "consistencyCheck": "Cross-Form Consistency",
      "runCheck": "Run Check",
      "allConsistent": "All cross-form fields are consistent.",
      "summary": "Assembly Summary"
    },
    "fields": {
      "fullName": "Full Legal Name",
      "address": "Street Address",
      "city": "City",
      "state": "State",
      "zip": "ZIP Code",
      "phone": "Phone",
      "email": "Email",
      "dob": "Date of Birth",
      "attorney": "Attorney Name (or \"In Pro Per\")",
      "barNumber": "State Bar Number",
      "caseNumber": "Case Number",
      "county": "County",
      "courtName": "Court Name",
      "courtAddress": "Court Address",
      "department": "Department",
      "filingDate": "Filing Date",
      "hearingDate": "Hearing Date",
      "hearingTime": "Hearing Time",
      "childName": "Child Full Name",
      "childDob": "Date of Birth",
      "childAge": "Current Age",
      "residessWith": "Currently Resides With"
    }
  },
  "settings": {
    "title": "Settings",
    "language": "Language",
    "selectLanguage": "Select language",
    "accessibility": "Accessibility",
    "highContrast": "High Contrast Mode",
    "largeText": "Large Text",
    "reducedMotion": "Reduced Motion",
    "focusIndicators": "Enhanced Focus Indicators",
    "errorLogs": "Error Logs",
    "exportLogs": "Export Error Logs",
    "clearLogs": "Clear Logs",
    "about": "About"
  },
  "help": {
    "title": "Help",
    "thisPage": "This Page",
    "shortcuts": "Shortcuts",
    "about": "About",
    "gettingStarted": "Getting Started",
    "closePanel": "Close help panel"
  },
  "export": {
    "title": "Export",
    "formats": {
      "html": "HTML (Print-Ready)",
      "json": "JSON",
      "csv": "CSV",
      "markdown": "Markdown",
      "text": "Plain Text"
    },
    "options": {
      "maskPII": "Mask PII Fields",
      "includeMetadata": "Include Metadata",
      "includeCitations": "Include Statutory Citations"
    },
    "success": "Export completed successfully.",
    "error": "Export failed. Please try again."
  },
  "errors": {
    "generic": "An unexpected error occurred.",
    "network": "Network error. Please check your connection.",
    "formLoad": "Failed to load form data.",
    "validationFailed": "Validation could not be completed.",
    "exportFailed": "Export failed.",
    "sessionExpired": "Your session has expired. Data has been saved.",
    "storageQuota": "Storage limit reached. Please export and clear old data.",
    "tryAgain": "Try Again",
    "reportIssue": "Report Issue",
    "goToDashboard": "Return to Dashboard"
  },
  "a11y": {
    "skipToMain": "Skip to main content",
    "skipToForm": "Skip to form section",
    "skipToNav": "Skip to navigation",
    "skipToResults": "Skip to results",
    "formProgress": "Form is {percent}% complete",
    "fieldError": "Error: {message}",
    "fieldCleared": "Error cleared",
    "newResults": "Results updated",
    "loading": "Loading, please wait"
  },
  "legal": {
    "disclaimer": "VERNEN™ provides legal form guidance and compliance checking. It does not provide legal advice. For legal counsel, consult a licensed attorney in your jurisdiction.",
    "copyright": "© 2024–2026 Michael Vernen Thomas Hartmann. All Rights Reserved.",
    "trademark": "VERNEN™ is a trademark of Michael Vernen Thomas Hartmann.",
    "ipManifest": "IP Manifest Filed February 2, 2026."
  },
  "auth": {
    "login": "Konekte",
    "register": "Kreye Kont",
    "logout": "Dekonekte",
    "email": "Adrès Imèl",
    "password": "Modpas",
    "confirmPassword": "Konfime Modpas",
    "displayName": "Non",
    "forgotPassword": "Bliye Modpas?",
    "resetPassword": "Reyinisyalize Modpas",
    "resetSent": "Imèl reyinisyalizasyon voye. Tcheke bwat resepsyon ou.",
    "loginSuccess": "Koneksyon reyisi.",
    "registerSuccess": "Kont kreye. Byenveni nan VERNEN™.",
    "logoutSuccess": "Dekonekte.",
    "loginError": "Koneksyon echwe. Tcheke imèl ak modpas ou.",
    "registerError": "Enskripsyon echwe. Eseye ankò.",
    "sessionExpired": "Sesyon ou ekspire. Konekte ankò.",
    "requiredField": "Chan sa a obligatwa.",
    "invalidEmail": "Mete yon adrès imèl ki valab.",
    "passwordMinLength": "Modpas la dwe gen omwen 8 karaktè.",
    "passwordMismatch": "Modpas yo pa menm.",
    "alreadyHaveAccount": "Ou gen yon kont deja?",
    "noAccount": "Ou pa gen kont?",
    "tier": {
      "guest": "Vizitè",
      "free": "Gratis",
      "pro": "Pwofesyonèl",
      "advocate": "Avoka"
    },
    "tierRequired": "Fonksyon sa a mande yon abònman {tier}.",
    "upgradePrompt": "Amelyore a {tier} pou jwenn aksè nan fonksyon sa a.",
    "upgradeNow": "Amelyore Kounye a"
  },
  "payments": {
    "pricing": "Pri",
    "plans": "Plan",
    "currentPlan": "Plan Aktyèl",
    "monthly": "Chak Mwa",
    "annual": "Chak Ane",
    "perMonth": "/mwa",
    "perYear": "/ane",
    "save": "Ekonomize {percent}%",
    "freePlan": {
      "name": "Gratis",
      "description": "Gidans debaz pou fòm.",
      "price": "$0"
    },
    "proPlan": {
      "name": "Pwofesyonèl",
      "description": "Odit konplè, ekspòtasyon ak sipò plizyè lang.",
      "priceMonthly": "$19.99",
      "priceAnnual": "$191.88"
    },
    "advocatePlan": {
      "name": "Avoka",
      "description": "Platfòm konplè ak asanblaj dokiman ak depo.",
      "priceMonthly": "$39.99",
      "priceAnnual": "$383.88"
    },
    "subscribe": "Enskri",
    "upgrade": "Amelyore",
    "downgrade": "Desann",
    "manageBilling": "Jere Faktirasyon",
    "cancelSubscription": "Anile Abònman",
    "checkoutRedirect": "Ap redirije nan peman an sekirite...",
    "checkoutSuccess": "Abònman aktive!",
    "checkoutCanceled": "Peman anile.",
    "paymentFailed": "Peman echwe. Mete ajou metòd peman ou.",
    "subscriptionActive": "Abònman ou aktif jiska {date}.",
    "subscriptionCanceled": "Abònman ou ap fini {date}."
  },
  "esignature": {
    "title": "Siyati Elektwonik",
    "signHere": "Siyen Isit",
    "drawSignature": "Desinen Siyati",
    "typeSignature": "Tape Siyati",
    "uploadSignature": "Telechaje Siyati",
    "clearSignature": "Efase",
    "acceptSignature": "Aksepte Siyati",
    "signatureRequired": "Siyati obligatwa nan chan sa a.",
    "wetInkRequired": "Chan sa a mande siyati ak lank. Enprime, siyen epi eskane.",
    "notarizationRequired": "Chan sa a mande notarizasyon.",
    "intentDeclaration": "Lè m siyen, mwen deklare anba penalite fo temwayaj dapre lwa Eta Kalifòni ke enfòmasyon nan dokiman sa a vrè ak kòrèk.",
    "consentCheckbox": "Mwen konprann ke siyati elektwonik sa a gen menm efè legal ke yon siyati ak men (Kòd Sivil Cal. § 1633.7).",
    "signed": "Siyen",
    "unsigned": "Pa Siyen",
    "signedBy": "Siyen pa {name} nan {date}",
    "revoke": "Revoke Siyati",
    "revokeConfirm": "Èske ou sèten ou vle revoke siyati sa a?",
    "documentChanged": "Dokiman modifye apre siyati. Bezwen siyen ankò.",
    "certificate": "Sètifika Siyati",
    "viewCertificate": "Wè Sètifika Siyati",
    "legalBasis": "Kòd Sivil Cal. § 1633 (UETA)"
  },
  "filing": {
    "title": "Depoze nan Tribinal",
    "createPackage": "Kreye Pakè Depo",
    "filingType": "Tip Depo",
    "selectCourt": "Chwazi Tribinal",
    "caseNumber": "Nimewo Ka",
    "newCase": "Ka Nouvo",
    "documents": "Dokiman",
    "addDocument": "Ajoute Dokiman",
    "proofOfService": "Prèv Sèvis",
    "filingFee": "Frè Depo",
    "feeWaiver": "Dispans Frè Akòde (FW-003)",
    "estimatedFee": "Frè estime: {amount}",
    "validate": "Verifye Pakè",
    "validationPassed": "Pakè a pare.",
    "validationFailed": "Pakè a gen {count} erè.",
    "submit": "Soumèt nan Tribinal",
    "submitConfirm": "Soumèt pakè sa a nan {court}?",
    "submitting": "Ap soumèt...",
    "submitted": "Depo soumèt avèk siksè.",
    "confirmationNumber": "Konfimasyon: {number}",
    "checkStatus": "Tcheke Estati",
    "status": {
      "draft": "Bouyon",
      "ready": "Pare",
      "submitting": "Ap Soumèt",
      "submitted": "Soumèt",
      "accepted": "Ap Revize",
      "rejected": "Rejte",
      "filed": "Depoze",
      "error": "Erè"
    },
    "rejected": "Depo rejte: {reason}",
    "filedStamped": "Kopi estanpe disponib.",
    "downloadFiled": "Telechaje Kopi Estanpe",
    "history": "Istwa Depo",
    "noFilings": "Pa gen depo.",
    "wetInkWarning": "Fòm sa a gen chan ki mande siyati ak lank."
  },
  "traceability": {
    "title": "Rejis Trasabilite Legal",
    "description": "Rejis tout sous legal ki konsilte.",
    "sources": "Sous Konsilte",
    "statutes": "Lwa",
    "regulations": "Règleman",
    "rulesOfCourt": "Règ Tribinal",
    "federalCode": "Kòd Federal",
    "contentHash": "Hash Kontni (SHA-256)",
    "retrievedAt": "Rekipere Nan",
    "linkedFinding": "Dekouvèt Lye",
    "logFinalized": "Rejis finalize ak bloke.",
    "viewLog": "Wè Rejis",
    "downloadLog": "Telechaje Rejis (PDF)",
    "compliance": "Rejis sa a satisfè egzijans transparans."
  },
  "remediation": {
    "title": "Gid Reparasyon",
    "description": "Enstriksyon etap pa etap pou rezoud pwoblèm yo.",
    "summary": "Rezime",
    "totalSteps": "{count} etap pou konplete",
    "estimatedTime": "Tan estime: {minutes} minit",
    "phase": "Faz {number}: {name}",
    "phases": {
      "critical": "Reparasyon Kritik",
      "high": "Priyorite Wo",
      "compliance": "Lachin Konfòmite",
      "bestPractice": "Meyè Pratik"
    },
    "step": "Etap {number}",
    "priority": "Priyorite",
    "complexity": {
      "simple": "Senp (~ 2 min)",
      "moderate": "Mwayen (~ 10 min)",
      "complex": "Konplèks (~ 25 min)",
      "requires_review": "Bezwen Avoka Revize (~ 60 min)"
    },
    "goToField": "Ale nan Chan",
    "markComplete": "Make Konplete",
    "skip": "Sote",
    "undo": "Defèt",
    "progress": "{completed} nan {total} etap ({percent}%)",
    "allComplete": "Tout etap konplete!",
    "nextStep": "Pwochen Etap",
    "filingReady": "Pare pou Depoze",
    "notReady": "Pa Pare — {remaining} etap rete"
  }
},
  so: {
  "__meta": {
    "version": "1.0.0",
    "language": "so",
    "languageName": "Somali",
    "direction": "ltr",
    "copyright": "© 2024–2026 Michael Vernen Thomas Hartmann. All Rights Reserved.",
    "lastUpdated": "2026-02-28",
    "completeness": "partial",
    "fallback": "en"
  },
  "app": {
    "title": "VERNEN™",
    "tagline": "Barnaamilka Horumarinta Sharciga ee Luqadaha Badan",
    "loading": "Waa la soo raraya…",
    "error": "Wax baa khaldan",
    "retry": "Isku Day Mar",
    "back": "Dib u noqo",
    "next": "Xiga",
    "previous": "Hore",
    "save": "Kaydi",
    "cancel": "Jooji",
    "close": "Xir",
    "export": "Export",
    "print": "Print",
    "download": "Download",
    "search": "Raadi",
    "clear": "Clear",
    "reset": "Reset",
    "confirm": "Confirm",
    "delete": "Delete",
    "edit": "Edit",
    "add": "Add",
    "remove": "Remove",
    "select": "Select",
    "required": "Loo baahan yahay",
    "optional": "Optional",
    "yes": "Haa",
    "no": "Maya",
    "none": "None",
    "all": "All",
    "other": "Other",
    "unknown": "Unknown",
    "notAvailable": "N/A"
  },
  "nav": {
    "dashboard": "Guddiga",
    "documentNavigator": "Hagaha Dukumiintiga",
    "validation": "Xaqiijinta",
    "filingGuide": "Hagaha Xareynta",
    "audit": "Warbixinta Baarista",
    "assembly": "Isku-duubista Dukumiintiga",
    "settings": "Dejinta",
    "help": "Caawin",
    "collapse": "Collapse sidebar",
    "expand": "Expand sidebar"
  },
  "dashboard": {
    "welcome": "Ku soo dhawoow VERNEN™",
    "subtitle": "Dooro qaybta aad ku bilaabaneyso",
    "cards": {
      "gdn": {
        "title": "Document Navigator",
        "desc": "Browse and fill Judicial Council forms with guided annotations"
      },
      "validation": {
        "title": "Pre-Filing Validation",
        "desc": "Check forms for errors, missing fields, and compliance issues"
      },
      "filing": {
        "title": "Filing Guide",
        "desc": "Court-specific instructions, fees, and service requirements"
      },
      "audit": {
        "title": "Audit Report",
        "desc": "Generate compliance documentation and risk assessments"
      },
      "assembly": {
        "title": "Document Assembly",
        "desc": "Build multi-form filing packages with automatic data propagation"
      }
    }
  },
  "gdn": {
    "title": "Guided Document Navigator",
    "selectCategory": "Select a category",
    "selectForm": "Select a form",
    "searchForms": "Search forms…",
    "fieldAnnotation": "Field Guidance",
    "legalDefinition": "Legal Definition",
    "commonMistakes": "Common Mistakes",
    "statutoryRef": "Statutory Reference",
    "categories": {
      "family_law": "Family Law",
      "domestic_violence": "Domestic Violence",
      "custody": "Child Custody & Visitation",
      "support": "Child & Spousal Support",
      "fee_waiver": "Fee Waiver",
      "small_claims": "Small Claims",
      "civil_harassment": "Civil Harassment",
      "elder_abuse": "Elder/Dependent Adult Abuse",
      "appeals": "Appeals",
      "general": "General Use"
    },
    "noResults": "No forms match your search.",
    "formFields": "Form Fields",
    "requiredFields": "Required Fields",
    "optionalFields": "Optional Fields",
    "piiWarning": "This field contains personally identifiable information (PII)"
  },
  "validation": {
    "title": "Pre-Filing Validation",
    "runValidation": "Run Validation",
    "revalidate": "Re-Validate",
    "selectForms": "Select forms to validate",
    "overallScore": "Overall Compliance Score",
    "filingReady": "Filing Ready",
    "needsReview": "Needs Review",
    "notReady": "Not Ready",
    "findings": "Findings",
    "noFindings": "No issues found — form is ready for filing.",
    "severity": {
      "critical": "Critical",
      "error": "Error",
      "warning": "Warning",
      "info": "Info"
    },
    "categories": {
      "completeness": "Completeness",
      "format": "Format",
      "compliance": "Compliance",
      "deadline": "Deadline",
      "crossForm": "Cross-Form",
      "service": "Service",
      "procedural": "Procedural"
    },
    "messages": {
      "requiredMissing": "Required field is missing",
      "invalidFormat": "Field format is invalid",
      "deadlinePassed": "Filing deadline may have passed",
      "serviceIncomplete": "Proof of service is incomplete",
      "crossFormMismatch": "Data does not match across forms"
    }
  },
  "filingGuide": {
    "title": "Filing Guide",
    "selectCounty": "Select your county",
    "courtInfo": "Court Information",
    "filingFees": "Filing Fees",
    "serviceReqs": "Service Requirements",
    "deadlines": "Deadlines",
    "eFiling": "E-Filing",
    "inPerson": "In-Person Filing",
    "byMail": "Filing by Mail",
    "hours": "Court Hours",
    "address": "Court Address",
    "phone": "Phone",
    "feeWaivable": "Fee Waiver Eligible",
    "counties": {
      "alameda": "Alameda County",
      "solano": "Solano County",
      "marin": "Marin County",
      "san_francisco": "San Francisco County",
      "contra_costa": "Contra Costa County"
    },
    "serviceTypes": {
      "personal": "Personal Service",
      "mail": "Service by Mail",
      "electronic": "Electronic Service"
    }
  },
  "audit": {
    "title": "Audit Report",
    "generate": "Generate Report",
    "regenerate": "Regenerate",
    "overallRisk": "Overall Risk Level",
    "findings": "Audit Findings",
    "recommendations": "Recommendations",
    "riskLevels": {
      "critical": "Critical Risk",
      "high": "High Risk",
      "medium": "Medium Risk",
      "low": "Low Risk",
      "info": "Informational"
    },
    "categories": {
      "completeness": "Completeness",
      "accuracy": "Accuracy",
      "compliance": "Statutory Compliance",
      "service": "Service of Process",
      "deadlines": "Filing Deadlines",
      "crossForm": "Cross-Form Consistency",
      "procedural": "Procedural Requirements"
    },
    "summary": "Executive Summary",
    "details": "Detailed Findings",
    "noFindings": "No audit findings — documents meet compliance standards."
  },
  "assembly": {
    "title": "Document Assembly",
    "subtitle": "Build multi-form filing packages with automatic cross-form data propagation.",
    "tabs": {
      "parties": "Parties",
      "case": "Case Info",
      "children": "Children",
      "package": "Package Builder",
      "review": "Review & Export"
    },
    "petitioner": "Petitioner (Filing Party)",
    "respondent": "Respondent (Other Party)",
    "caseInfo": "Case Information",
    "children": {
      "title": "Minor Children",
      "add": "Add Child",
      "remove": "Remove",
      "empty": "No children added yet.",
      "emptyHint": "Add children if filing custody, visitation, or support forms.",
      "child": "Child"
    },
    "package": {
      "title": "Select Filing Package",
      "forms": "forms",
      "formsInPackage": "Forms in this package:",
      "types": {
        "dissolution": "Dissolution of Marriage",
        "custody_rfo": "Custody RFO Package",
        "dvro": "DV Restraining Order",
        "fee_waiver": "Fee Waiver Package",
        "custody_modification": "Custody Modification",
        "support_modification": "Support Modification",
        "contempt": "Contempt Proceeding",
        "small_claims": "Small Claims",
        "appeal": "Appeal Package"
      }
    },
    "review": {
      "completeness": "Completeness",
      "readyForAssembly": "Ready for Assembly",
      "partiallyComplete": "Partially Complete",
      "needsMoreInfo": "Needs More Information",
      "consistencyCheck": "Cross-Form Consistency",
      "runCheck": "Run Check",
      "allConsistent": "All cross-form fields are consistent.",
      "summary": "Assembly Summary"
    },
    "fields": {
      "fullName": "Full Legal Name",
      "address": "Street Address",
      "city": "City",
      "state": "State",
      "zip": "ZIP Code",
      "phone": "Phone",
      "email": "Email",
      "dob": "Date of Birth",
      "attorney": "Attorney Name (or \"In Pro Per\")",
      "barNumber": "State Bar Number",
      "caseNumber": "Case Number",
      "county": "County",
      "courtName": "Court Name",
      "courtAddress": "Court Address",
      "department": "Department",
      "filingDate": "Filing Date",
      "hearingDate": "Hearing Date",
      "hearingTime": "Hearing Time",
      "childName": "Child Full Name",
      "childDob": "Date of Birth",
      "childAge": "Current Age",
      "residessWith": "Currently Resides With"
    }
  },
  "settings": {
    "title": "Settings",
    "language": "Language",
    "selectLanguage": "Select language",
    "accessibility": "Accessibility",
    "highContrast": "High Contrast Mode",
    "largeText": "Large Text",
    "reducedMotion": "Reduced Motion",
    "focusIndicators": "Enhanced Focus Indicators",
    "errorLogs": "Error Logs",
    "exportLogs": "Export Error Logs",
    "clearLogs": "Clear Logs",
    "about": "About"
  },
  "help": {
    "title": "Help",
    "thisPage": "This Page",
    "shortcuts": "Shortcuts",
    "about": "About",
    "gettingStarted": "Getting Started",
    "closePanel": "Close help panel"
  },
  "export": {
    "title": "Export",
    "formats": {
      "html": "HTML (Print-Ready)",
      "json": "JSON",
      "csv": "CSV",
      "markdown": "Markdown",
      "text": "Plain Text"
    },
    "options": {
      "maskPII": "Mask PII Fields",
      "includeMetadata": "Include Metadata",
      "includeCitations": "Include Statutory Citations"
    },
    "success": "Export completed successfully.",
    "error": "Export failed. Please try again."
  },
  "errors": {
    "generic": "An unexpected error occurred.",
    "network": "Network error. Please check your connection.",
    "formLoad": "Failed to load form data.",
    "validationFailed": "Validation could not be completed.",
    "exportFailed": "Export failed.",
    "sessionExpired": "Your session has expired. Data has been saved.",
    "storageQuota": "Storage limit reached. Please export and clear old data.",
    "tryAgain": "Try Again",
    "reportIssue": "Report Issue",
    "goToDashboard": "Return to Dashboard"
  },
  "a11y": {
    "skipToMain": "Skip to main content",
    "skipToForm": "Skip to form section",
    "skipToNav": "Skip to navigation",
    "skipToResults": "Skip to results",
    "formProgress": "Form is {percent}% complete",
    "fieldError": "Error: {message}",
    "fieldCleared": "Error cleared",
    "newResults": "Results updated",
    "loading": "Loading, please wait"
  },
  "legal": {
    "disclaimer": "VERNEN™ provides legal form guidance and compliance checking. It does not provide legal advice. For legal counsel, consult a licensed attorney in your jurisdiction.",
    "copyright": "© 2024–2026 Michael Vernen Thomas Hartmann. All Rights Reserved.",
    "trademark": "VERNEN™ is a trademark of Michael Vernen Thomas Hartmann.",
    "ipManifest": "IP Manifest Filed February 2, 2026."
  },
  "auth": {
    "login": "Soo Gal",
    "register": "Samee Akoon",
    "logout": "Ka Bax",
    "email": "Ciwaanka Iimaylka",
    "password": "Furaha Sirta",
    "confirmPassword": "Xaqiiji Furaha Sirta",
    "displayName": "Magaca Muuqaalka",
    "forgotPassword": "Ma Illowday Furaha Sirta?",
    "resetPassword": "Dib u Dejiso Furaha Sirta",
    "resetSent": "Iimaylka dib-u-dejinta waa la diray. Hubi sanduuqaaga.",
    "loginSuccess": "Soo galitaanka waa lagu guuleystay.",
    "registerSuccess": "Akoonka waa la sameeyay. Ku soo dhawoow VERNEN™.",
    "logoutSuccess": "Waa la ka baxay.",
    "loginError": "Soo galitaanku wuu fashilmay. Hubi iimaylka iyo furaha sirta.",
    "registerError": "Diiwaangelintu way fashilantay. Isku day mar kale.",
    "sessionExpired": "Kulanka wuu dhacay. Soo gal mar kale.",
    "requiredField": "Goobtan waa lagama maarmaan.",
    "invalidEmail": "Geli ciwaanka iimaylka oo sax ah.",
    "passwordMinLength": "Furaha sirta waa inuu ugu yaraan yahay 8 xaraf.",
    "passwordMismatch": "Fureyaasha sirta iskuma midna.",
    "alreadyHaveAccount": "Horey ma u leedahay akoon?",
    "noAccount": "Ma lihid akoon?",
    "tier": {
      "guest": "Marti",
      "free": "Bilaash",
      "pro": "Xirfadle",
      "advocate": "Qareen"
    },
    "tierRequired": "Sifadan waxay u baahan tahay rukunka {tier}.",
    "upgradePrompt": "U kor u qaad {tier} si aad u hesho sifadan.",
    "upgradeNow": "Hadda Kor u Qaad"
  },
  "payments": {
    "pricing": "Qiimaha",
    "plans": "Qorsheyaasha",
    "currentPlan": "Qorshaha Hadda",
    "monthly": "Bil kasta",
    "annual": "Sanad kasta",
    "perMonth": "/bil",
    "perYear": "/sanad",
    "save": "Kaydi {percent}%",
    "freePlan": {
      "name": "Bilaash",
      "description": "Hagid aasaasi ah oo foomam.",
      "price": "$0"
    },
    "proPlan": {
      "name": "Xirfadle",
      "description": "Baaritaan buuxda, dhoofin iyo taageero luqadaha badan.",
      "priceMonthly": "$19.99",
      "priceAnnual": "$191.88"
    },
    "advocatePlan": {
      "name": "Qareen",
      "description": "Nidaamka oo dhan oo leh ururin dukumeenti iyo xareyn.",
      "priceMonthly": "$39.99",
      "priceAnnual": "$383.88"
    },
    "subscribe": "Isdiiwaangeli",
    "upgrade": "Kor u Qaad",
    "downgrade": "Hoos u Dhig",
    "manageBilling": "Maamul Biilasha",
    "cancelSubscription": "Jooji Isdiiwaangelinta",
    "checkoutRedirect": "Waxaa loo wareejinayaa lacag bixinta ammaanka ah...",
    "checkoutSuccess": "Isdiiwaangelintu way shaqeysaa!",
    "checkoutCanceled": "Lacag bixintu way joojisay.",
    "paymentFailed": "Lacag bixintu way fashilantay. Cusboonaysii qaabka lacag bixinta.",
    "subscriptionActive": "Isdiiwaangelintaadu way shaqeysaa ilaa {date}.",
    "subscriptionCanceled": "Isdiiwaangelintaadu way dhammaan doontaa {date}."
  },
  "esignature": {
    "title": "Saxiixa Elektaroonigga",
    "signHere": "Halkan Saxiix",
    "drawSignature": "Sawir Saxiixa",
    "typeSignature": "Ku Qor Saxiixa",
    "uploadSignature": "Soo Rar Saxiixa",
    "clearSignature": "Nadiifi",
    "acceptSignature": "Aqbal Saxiixa",
    "signatureRequired": "Goobtan waxay u baahan tahay saxiix.",
    "wetInkRequired": "Goobtan waxay u baahan tahay saxiix gacanta. Daabac, saxiix oo scan.",
    "notarizationRequired": "Goobtan waxay u baahan tahay xaqiijin.",
    "intentDeclaration": "Markaan saxiixayo, waxaan ku sheegayaa ciqaab been abuur ah ee sharciyada Gobolka California in macluumaadka dukumeentigan ay run iyo sax yihiin.",
    "consentCheckbox": "Waan fahmay in saxiixa elektarooniggu uu leeyahay saamayn sharci oo la mid ah saxiixa gacanta (Cal. Civ. Code § 1633.7).",
    "signed": "La Saxiixay",
    "unsigned": "Aan La Saxiixin",
    "signedBy": "Waxaa saxiixay {name} {date}",
    "revoke": "Ka Noqo Saxiixa",
    "revokeConfirm": "Ma hubtaa inaad ka noqonayso saxiixan?",
    "documentChanged": "Dukumeentiga waa la bedelay kadib saxiixa. Waxaa loo baahan yahay saxiix cusub.",
    "certificate": "Shahaadada Saxiixa",
    "viewCertificate": "Arag Shahaadada",
    "legalBasis": "Cal. Civ. Code § 1633 (UETA)"
  },
  "filing": {
    "title": "U Xarey Maxkamadda",
    "createPackage": "Samee Xirmada Xareynta",
    "filingType": "Nooca Xareynta",
    "selectCourt": "Dooro Maxkamadda",
    "caseNumber": "Lambarka Kiiska",
    "newCase": "Kiis Cusub",
    "documents": "Dukumeentiyada",
    "addDocument": "Kudar Dukumeenti",
    "proofOfService": "Caddaynta Adeegga",
    "filingFee": "Khidmadda Xareynta",
    "feeWaiver": "Cafinta Khidmadda (FW-003)",
    "estimatedFee": "Khidmadda qiyaasta: {amount}",
    "validate": "Xaqiiji Xirmada",
    "validationPassed": "Xirmadu way diyaar tahay.",
    "validationFailed": "Xirmadu waxay leedahay {count} qalad.",
    "submit": "U Dir Maxkamadda",
    "submitConfirm": "Ma u direysaa xirmadan {court}?",
    "submitting": "Waa la dirayaa...",
    "submitted": "Xareyntu way guuleysatay.",
    "confirmationNumber": "Xaqiijinta: {number}",
    "checkStatus": "Hubi Xaaladda",
    "status": {
      "draft": "Qoraal",
      "ready": "Diyaar",
      "submitting": "La Dirayaa",
      "submitted": "La Diray",
      "accepted": "La Eegayaa",
      "rejected": "La Diiday",
      "filed": "La Xareeyay",
      "error": "Qalad"
    },
    "rejected": "Xareyntu way diiday: {reason}",
    "filedStamped": "Koobiga la shaabadeeyay waa diyaar.",
    "downloadFiled": "Soo Deg Koobiga",
    "history": "Taariikhda Xareynta",
    "noFilings": "Xareyn ma jirto.",
    "wetInkWarning": "Foomkan wuxuu leeyahay goobab u baahan saxiix gacanta."
  },
  "traceability": {
    "title": "Diiwaanka Raadraaca Sharciga",
    "description": "Diiwaanka dhammaan ilaha sharciga ee la isticmaalay.",
    "sources": "Ilaha La Eegay",
    "statutes": "Sharciyadda",
    "regulations": "Xeerarka",
    "rulesOfCourt": "Xeerarka Maxkamadda",
    "federalCode": "Xeerka Federaalka",
    "contentHash": "Hash-ka Nuxurka (SHA-256)",
    "retrievedAt": "La Helay",
    "linkedFinding": "Natiijooyinka Xidhiidhka",
    "logFinalized": "Diiwaanku waa la xidhay.",
    "viewLog": "Arag Diiwaanka",
    "downloadLog": "Soo Deg Diiwaanka (PDF)",
    "compliance": "Diiwaankan wuxuu buuxiyaa shuruudaha daahfurnaanta."
  },
  "remediation": {
    "title": "Hagaha Sixitaanka",
    "description": "Tillaabooyin tallaabo-tallaabo ah oo lagu xalliyo natiijooyinka.",
    "summary": "Soo Koobid",
    "totalSteps": "{count} tallaabo oo la dhammeystiro",
    "estimatedTime": "Waqtiga qiyaasta: {minutes} daqiiqo",
    "phase": "Marxalad {number}: {name}",
    "phases": {
      "critical": "Sixitaan Degdeg ah",
      "high": "Mudnaanta Sare",
      "compliance": "Farqiga Waafaqsanaanta",
      "bestPractice": "Hab Wanaagsan"
    },
    "step": "Tallaabo {number}",
    "priority": "Mudnaanta",
    "complexity": {
      "simple": "Fudud (~ 2 daq)",
      "moderate": "Dhexdhexaad (~ 10 daq)",
      "complex": "Adag (~ 25 daq)",
      "requires_review": "Waxay u Baahan Tahay Qareen (~ 60 daq)"
    },
    "goToField": "Aad Goobta",
    "markComplete": "Calaamadee Dhammaystiran",
    "skip": "Ka Bood",
    "undo": "Ka Noqo",
    "progress": "{completed} ka mid ah {total} tallaabo ({percent}%)",
    "allComplete": "Dhammaan tallaabooyinku way dhammaadeen!",
    "nextStep": "Tallaabooyinka Xiga",
    "filingReady": "Diyaar Xareyn",
    "notReady": "Aan Diyaar Ahayn — {remaining} tallaabo ayaa haray"
  }
},
  ti: {
  "__meta": {
    "version": "1.0.0",
    "language": "ti",
    "languageName": "Tigrinya",
    "direction": "ltr",
    "copyright": "© 2024–2026 Michael Vernen Thomas Hartmann. All Rights Reserved.",
    "lastUpdated": "2026-02-28",
    "completeness": "partial",
    "fallback": "en"
  },
  "app": {
    "title": "VERNEN™",
    "tagline": "ብዙሕ ቋንቋ ሕጋዊ ምትእስሳር መድረኽ",
    "loading": "ይጽዓን ኣሎ…",
    "error": "ጌጋ ተፈጢሩ",
    "retry": "ደጊምካ ፈትን",
    "back": "ተመለስ",
    "next": "ዝቕጽል",
    "previous": "ዝሓለፈ",
    "save": "ዓቅብ",
    "cancel": "ስረዝ",
    "close": "ዕጸው",
    "export": "Export",
    "print": "Print",
    "download": "Download",
    "search": "ድለ",
    "clear": "Clear",
    "reset": "Reset",
    "confirm": "Confirm",
    "delete": "Delete",
    "edit": "Edit",
    "add": "Add",
    "remove": "Remove",
    "select": "Select",
    "required": "ግድን",
    "optional": "Optional",
    "yes": "እወ",
    "no": "ኣይፋል",
    "none": "None",
    "all": "All",
    "other": "Other",
    "unknown": "Unknown",
    "notAvailable": "N/A"
  },
  "nav": {
    "dashboard": "ዳሽቦርድ",
    "documentNavigator": "መምርሒ ሰነድ",
    "validation": "ምርግጋጽ",
    "filingGuide": "መምርሒ ምቕራብ",
    "audit": "ጸብጻብ ኦዲት",
    "assembly": "ምጥርናፍ ሰነድ",
    "settings": "ምቕራጽ",
    "help": "ሓገዝ",
    "collapse": "Collapse sidebar",
    "expand": "Expand sidebar"
  },
  "dashboard": {
    "welcome": "ናብ VERNEN™ እንቋዕ ብደሓን መጻእኩም",
    "subtitle": "ንምጅማር ሞዱል ምረጹ",
    "cards": {
      "gdn": {
        "title": "Document Navigator",
        "desc": "Browse and fill Judicial Council forms with guided annotations"
      },
      "validation": {
        "title": "Pre-Filing Validation",
        "desc": "Check forms for errors, missing fields, and compliance issues"
      },
      "filing": {
        "title": "Filing Guide",
        "desc": "Court-specific instructions, fees, and service requirements"
      },
      "audit": {
        "title": "Audit Report",
        "desc": "Generate compliance documentation and risk assessments"
      },
      "assembly": {
        "title": "Document Assembly",
        "desc": "Build multi-form filing packages with automatic data propagation"
      }
    }
  },
  "gdn": {
    "title": "Guided Document Navigator",
    "selectCategory": "Select a category",
    "selectForm": "Select a form",
    "searchForms": "Search forms…",
    "fieldAnnotation": "Field Guidance",
    "legalDefinition": "Legal Definition",
    "commonMistakes": "Common Mistakes",
    "statutoryRef": "Statutory Reference",
    "categories": {
      "family_law": "Family Law",
      "domestic_violence": "Domestic Violence",
      "custody": "Child Custody & Visitation",
      "support": "Child & Spousal Support",
      "fee_waiver": "Fee Waiver",
      "small_claims": "Small Claims",
      "civil_harassment": "Civil Harassment",
      "elder_abuse": "Elder/Dependent Adult Abuse",
      "appeals": "Appeals",
      "general": "General Use"
    },
    "noResults": "No forms match your search.",
    "formFields": "Form Fields",
    "requiredFields": "Required Fields",
    "optionalFields": "Optional Fields",
    "piiWarning": "This field contains personally identifiable information (PII)"
  },
  "validation": {
    "title": "Pre-Filing Validation",
    "runValidation": "Run Validation",
    "revalidate": "Re-Validate",
    "selectForms": "Select forms to validate",
    "overallScore": "Overall Compliance Score",
    "filingReady": "Filing Ready",
    "needsReview": "Needs Review",
    "notReady": "Not Ready",
    "findings": "Findings",
    "noFindings": "No issues found — form is ready for filing.",
    "severity": {
      "critical": "Critical",
      "error": "Error",
      "warning": "Warning",
      "info": "Info"
    },
    "categories": {
      "completeness": "Completeness",
      "format": "Format",
      "compliance": "Compliance",
      "deadline": "Deadline",
      "crossForm": "Cross-Form",
      "service": "Service",
      "procedural": "Procedural"
    },
    "messages": {
      "requiredMissing": "Required field is missing",
      "invalidFormat": "Field format is invalid",
      "deadlinePassed": "Filing deadline may have passed",
      "serviceIncomplete": "Proof of service is incomplete",
      "crossFormMismatch": "Data does not match across forms"
    }
  },
  "filingGuide": {
    "title": "Filing Guide",
    "selectCounty": "Select your county",
    "courtInfo": "Court Information",
    "filingFees": "Filing Fees",
    "serviceReqs": "Service Requirements",
    "deadlines": "Deadlines",
    "eFiling": "E-Filing",
    "inPerson": "In-Person Filing",
    "byMail": "Filing by Mail",
    "hours": "Court Hours",
    "address": "Court Address",
    "phone": "Phone",
    "feeWaivable": "Fee Waiver Eligible",
    "counties": {
      "alameda": "Alameda County",
      "solano": "Solano County",
      "marin": "Marin County",
      "san_francisco": "San Francisco County",
      "contra_costa": "Contra Costa County"
    },
    "serviceTypes": {
      "personal": "Personal Service",
      "mail": "Service by Mail",
      "electronic": "Electronic Service"
    }
  },
  "audit": {
    "title": "Audit Report",
    "generate": "Generate Report",
    "regenerate": "Regenerate",
    "overallRisk": "Overall Risk Level",
    "findings": "Audit Findings",
    "recommendations": "Recommendations",
    "riskLevels": {
      "critical": "Critical Risk",
      "high": "High Risk",
      "medium": "Medium Risk",
      "low": "Low Risk",
      "info": "Informational"
    },
    "categories": {
      "completeness": "Completeness",
      "accuracy": "Accuracy",
      "compliance": "Statutory Compliance",
      "service": "Service of Process",
      "deadlines": "Filing Deadlines",
      "crossForm": "Cross-Form Consistency",
      "procedural": "Procedural Requirements"
    },
    "summary": "Executive Summary",
    "details": "Detailed Findings",
    "noFindings": "No audit findings — documents meet compliance standards."
  },
  "assembly": {
    "title": "Document Assembly",
    "subtitle": "Build multi-form filing packages with automatic cross-form data propagation.",
    "tabs": {
      "parties": "Parties",
      "case": "Case Info",
      "children": "Children",
      "package": "Package Builder",
      "review": "Review & Export"
    },
    "petitioner": "Petitioner (Filing Party)",
    "respondent": "Respondent (Other Party)",
    "caseInfo": "Case Information",
    "children": {
      "title": "Minor Children",
      "add": "Add Child",
      "remove": "Remove",
      "empty": "No children added yet.",
      "emptyHint": "Add children if filing custody, visitation, or support forms.",
      "child": "Child"
    },
    "package": {
      "title": "Select Filing Package",
      "forms": "forms",
      "formsInPackage": "Forms in this package:",
      "types": {
        "dissolution": "Dissolution of Marriage",
        "custody_rfo": "Custody RFO Package",
        "dvro": "DV Restraining Order",
        "fee_waiver": "Fee Waiver Package",
        "custody_modification": "Custody Modification",
        "support_modification": "Support Modification",
        "contempt": "Contempt Proceeding",
        "small_claims": "Small Claims",
        "appeal": "Appeal Package"
      }
    },
    "review": {
      "completeness": "Completeness",
      "readyForAssembly": "Ready for Assembly",
      "partiallyComplete": "Partially Complete",
      "needsMoreInfo": "Needs More Information",
      "consistencyCheck": "Cross-Form Consistency",
      "runCheck": "Run Check",
      "allConsistent": "All cross-form fields are consistent.",
      "summary": "Assembly Summary"
    },
    "fields": {
      "fullName": "Full Legal Name",
      "address": "Street Address",
      "city": "City",
      "state": "State",
      "zip": "ZIP Code",
      "phone": "Phone",
      "email": "Email",
      "dob": "Date of Birth",
      "attorney": "Attorney Name (or \"In Pro Per\")",
      "barNumber": "State Bar Number",
      "caseNumber": "Case Number",
      "county": "County",
      "courtName": "Court Name",
      "courtAddress": "Court Address",
      "department": "Department",
      "filingDate": "Filing Date",
      "hearingDate": "Hearing Date",
      "hearingTime": "Hearing Time",
      "childName": "Child Full Name",
      "childDob": "Date of Birth",
      "childAge": "Current Age",
      "residessWith": "Currently Resides With"
    }
  },
  "settings": {
    "title": "Settings",
    "language": "Language",
    "selectLanguage": "Select language",
    "accessibility": "Accessibility",
    "highContrast": "High Contrast Mode",
    "largeText": "Large Text",
    "reducedMotion": "Reduced Motion",
    "focusIndicators": "Enhanced Focus Indicators",
    "errorLogs": "Error Logs",
    "exportLogs": "Export Error Logs",
    "clearLogs": "Clear Logs",
    "about": "About"
  },
  "help": {
    "title": "Help",
    "thisPage": "This Page",
    "shortcuts": "Shortcuts",
    "about": "About",
    "gettingStarted": "Getting Started",
    "closePanel": "Close help panel"
  },
  "export": {
    "title": "Export",
    "formats": {
      "html": "HTML (Print-Ready)",
      "json": "JSON",
      "csv": "CSV",
      "markdown": "Markdown",
      "text": "Plain Text"
    },
    "options": {
      "maskPII": "Mask PII Fields",
      "includeMetadata": "Include Metadata",
      "includeCitations": "Include Statutory Citations"
    },
    "success": "Export completed successfully.",
    "error": "Export failed. Please try again."
  },
  "errors": {
    "generic": "An unexpected error occurred.",
    "network": "Network error. Please check your connection.",
    "formLoad": "Failed to load form data.",
    "validationFailed": "Validation could not be completed.",
    "exportFailed": "Export failed.",
    "sessionExpired": "Your session has expired. Data has been saved.",
    "storageQuota": "Storage limit reached. Please export and clear old data.",
    "tryAgain": "Try Again",
    "reportIssue": "Report Issue",
    "goToDashboard": "Return to Dashboard"
  },
  "a11y": {
    "skipToMain": "Skip to main content",
    "skipToForm": "Skip to form section",
    "skipToNav": "Skip to navigation",
    "skipToResults": "Skip to results",
    "formProgress": "Form is {percent}% complete",
    "fieldError": "Error: {message}",
    "fieldCleared": "Error cleared",
    "newResults": "Results updated",
    "loading": "Loading, please wait"
  },
  "legal": {
    "disclaimer": "VERNEN™ provides legal form guidance and compliance checking. It does not provide legal advice. For legal counsel, consult a licensed attorney in your jurisdiction.",
    "copyright": "© 2024–2026 Michael Vernen Thomas Hartmann. All Rights Reserved.",
    "trademark": "VERNEN™ is a trademark of Michael Vernen Thomas Hartmann.",
    "ipManifest": "IP Manifest Filed February 2, 2026."
  },
  "auth": {
    "login": "እቶ",
    "register": "ሕሳብ ፍጠር",
    "logout": "ውጻእ",
    "email": "ኢመይል",
    "password": "ምስጢራዊ ቃል",
    "confirmPassword": "ምስጢራዊ ቃል ኣረጋግጽ",
    "displayName": "ስም",
    "forgotPassword": "ምስጢራዊ ቃል ረሲዕካ?",
    "resetPassword": "ምስጢራዊ ቃል ሓድሽ",
    "resetSent": "ኢመይል ንምሕዳስ ተላኢኹ። ሳጹንኻ ርአ።",
    "loginSuccess": "ብዓወት ኣቲኻ።",
    "registerSuccess": "ሕሳብ ተፈጢሩ። ናብ VERNEN™ እንቋዕ ደሓን መጻእካ።",
    "logoutSuccess": "ወጺእካ።",
    "loginError": "ምእታው ኣይተኻእለን። ኢመይልን ምስጢራዊ ቃልን ኣረጋግጽ።",
    "registerError": "ምዝገባ ኣይተኻእለን። ደጊምካ ፈትን።",
    "sessionExpired": "ግዜ ወዲኡ። ደጊምካ እቶ።",
    "requiredField": "እዚ ቦታ ግዴታ እዩ።",
    "invalidEmail": "ቅኑዕ ኢመይል ኣእቱ።",
    "passwordMinLength": "ምስጢራዊ ቃል ብውሑዱ 8 ፊደል ክኸውን ኣለዎ።",
    "passwordMismatch": "ምስጢራዊ ቃላት ኣይሰማምዑን።",
    "alreadyHaveAccount": "ሕሳብ ኣለካ?",
    "noAccount": "ሕሳብ የብልካን?",
    "tier": {
      "guest": "ጋሻ",
      "free": "ነጻ",
      "pro": "ፕሮ",
      "advocate": "ጠበቓ"
    },
    "tierRequired": "እዚ ባህሪ {tier} ምዝገባ የድሊ።",
    "upgradePrompt": "ናብ {tier} ኣሐድሽ እዚ ባህሪ ንምጥቃም።",
    "upgradeNow": "ሕጂ ኣሐድሽ"
  },
  "payments": {
    "pricing": "ዋጋ",
    "plans": "መደባት",
    "currentPlan": "ህሉው መደብ",
    "monthly": "ወርሓዊ",
    "annual": "ዓመታዊ",
    "perMonth": "/ወርሒ",
    "perYear": "/ዓመት",
    "save": "{percent}% ቁጠብ",
    "freePlan": {
      "name": "ነጻ",
      "description": "መሰረታዊ መምርሒ ቅጥዒ።",
      "price": "$0"
    },
    "proPlan": {
      "name": "ፕሮ",
      "description": "ምሉእ ኦዲት፡ ምውጻእ ከምኡ'ውን ብዙሕ ቋንቋ ደገፍ።",
      "priceMonthly": "$19.99",
      "priceAnnual": "$191.88"
    },
    "advocatePlan": {
      "name": "ጠበቓ",
      "description": "ምሉእ መድረኽ ምስ ምጥርናፍ ሰነድን ምቕራብን።",
      "priceMonthly": "$39.99",
      "priceAnnual": "$383.88"
    },
    "subscribe": "ተመዝገብ",
    "upgrade": "ኣሐድሽ",
    "downgrade": "ኣትሕት",
    "manageBilling": "ክፍሊት ኣመሓድር",
    "cancelSubscription": "ምዝገባ ሰርዝ",
    "checkoutRedirect": "ናብ ውሑስ ክፍሊት ይቕየር ኣሎ...",
    "checkoutSuccess": "ምዝገባ ንጡፍ ኮይኑ!",
    "checkoutCanceled": "ክፍሊት ተሰሪዙ።",
    "paymentFailed": "ክፍሊት ኣይተኻእለን። ኣገባብ ክፍሊት ኣሐድሽ።",
    "subscriptionActive": "ምዝገባኻ ክሳብ {date} ንጡፍ እዩ።",
    "subscriptionCanceled": "ምዝገባኻ ኣብ {date} ክውዳእ እዩ።"
  },
  "esignature": {
    "title": "ኤለክትሮኒክ ፊርማ",
    "signHere": "ኣብዚ ፈርም",
    "drawSignature": "ፊርማ ስኣል",
    "typeSignature": "ፊርማ ጽሓፍ",
    "uploadSignature": "ፊርማ ጽዓን",
    "clearSignature": "ደምስስ",
    "acceptSignature": "ፊርማ ተቐበል",
    "signatureRequired": "ኣብዚ ቦታ ፊርማ የድሊ።",
    "wetInkRequired": "ኣብዚ ቦታ ብኢድ ፊርማ የድሊ። ሓትም፡ ፈርም ከምኡ'ውን ስካን ግበር።",
    "notarizationRequired": "ኣብዚ ቦታ ምስክርነት የድሊ።",
    "intentDeclaration": "ብምፍራም፡ ብመሰረት ሕጊ ግዝኣት ካሊፎርንያ ኣብ ቅጽዓት ሓሶ ምስክርነት እቲ ኣብዚ ሰነድ ዘሎ ሓበሬታ ሓቅን ቅኑዕን ምዃኑ እእውጅ።",
    "consentCheckbox": "እዚ ኤለክትሮኒክ ፊርማ ከም ብኢድ ፊርማ ሕጋዊ ሓይሊ ከምዘለዎ ይርድኣኒ (Cal. Civ. Code § 1633.7)።",
    "signed": "ተፈሪሙ",
    "unsigned": "ኣይተፈረመን",
    "signedBy": "ብ{name} ኣብ {date} ተፈሪሙ",
    "revoke": "ፊርማ ስሓብ",
    "revokeConfirm": "ነዚ ፊርማ ክትስሕቦ ርግጸኛ ዲኻ?",
    "documentChanged": "ድሕሪ ፊርማ ሰነድ ተቐይሩ። ዳግማይ ፊርማ የድሊ።",
    "certificate": "ናይ ፊርማ ምስክር ወረቐት",
    "viewCertificate": "ናይ ፊርማ ምስክር ወረቐት ርአ",
    "legalBasis": "Cal. Civ. Code § 1633 (UETA)"
  },
  "filing": {
    "title": "ናብ ቤት ፍርዲ ኣቕርብ",
    "createPackage": "ናይ ምቕራብ ጥርናፈ ፍጠር",
    "filingType": "ዓይነት ምቕራብ",
    "selectCourt": "ቤት ፍርዲ ምረጽ",
    "caseNumber": "ቁጽሪ ጉዳይ",
    "newCase": "ሓድሽ ጉዳይ",
    "documents": "ሰነዳት",
    "addDocument": "ሰነድ ወስኽ",
    "proofOfService": "መረጋገጺ ኣገልግሎት",
    "filingFee": "ክፍሊት ምቕራብ",
    "feeWaiver": "ሕድገት ክፍሊት (FW-003)",
    "estimatedFee": "ግምት ክፍሊት: {amount}",
    "validate": "ጥርናፈ ኣረጋግጽ",
    "validationPassed": "ጥርናፈ ተዳልዩ።",
    "validationFailed": "ጥርናፈ {count} ጌጋ ኣለዎ።",
    "submit": "ናብ ቤት ፍርዲ ኣቕርብ",
    "submitConfirm": "ናብ {court} ኣቕርብ?",
    "submitting": "ይቐርብ ኣሎ...",
    "submitted": "ብዓወት ቀሪቡ።",
    "confirmationNumber": "ቁጽሪ ምርግጋጽ: {number}",
    "checkStatus": "ኩነታት ርአ",
    "status": {
      "draft": "ረቂቕ",
      "ready": "ድሉው",
      "submitting": "ይቐርብ ኣሎ",
      "submitted": "ቀሪቡ",
      "accepted": "ይርአ ኣሎ",
      "rejected": "ተነጺጉ",
      "filed": "ተመዝጊቡ",
      "error": "ጌጋ"
    },
    "rejected": "ምቕራብ ተነጺጉ: {reason}",
    "filedStamped": "ዝተሓትመ ቅዳሕ ድሉው እዩ።",
    "downloadFiled": "ዝተሓትመ ቅዳሕ ኣውርድ",
    "history": "ታሪኽ ምቕራብ",
    "noFilings": "ምቕራብ የለን።",
    "wetInkWarning": "እዚ ቅጥዒ ብኢድ ፊርማ ዘድሊ ቦታታት ኣለዎ።"
  },
  "traceability": {
    "title": "ናይ ሕጊ ዝርዝር መዝገብ",
    "description": "ዝርዝር ኩሎም ዝተጠቐሱ ናይ ሕጊ ምንጭታት።",
    "sources": "ዝተጠቐሱ ምንጭታት",
    "statutes": "ሕግታት",
    "regulations": "ደንብታት",
    "rulesOfCourt": "ሕግታት ቤት ፍርዲ",
    "federalCode": "ፈደራል ሕጊ",
    "contentHash": "ናይ ትሕዝቶ ሃሽ (SHA-256)",
    "retrievedAt": "ዝተረኽበሉ ግዜ",
    "linkedFinding": "ዝተኣሳሰረ ረኽቢ",
    "logFinalized": "መዝገብ ተዛዚሙ ተዓጽዩ።",
    "viewLog": "መዝገብ ርአ",
    "downloadLog": "መዝገብ ኣውርድ (PDF)",
    "compliance": "እዚ መዝገብ ናይ ግልጽነት ጠለባት የማልእ።"
  },
  "remediation": {
    "title": "መምርሒ ምዕራይ",
    "description": "ስጉምቲ ብስጉምቲ ንረኽቢታት ንምፍታሕ።",
    "summary": "ጽማቕ",
    "totalSteps": "{count} ስጉምቲ ንምዝዛም",
    "estimatedTime": "ግምት ግዜ: {minutes} ደቒቕ",
    "phase": "ምዕራፍ {number}: {name}",
    "phases": {
      "critical": "ህጹጽ ምዕራይ",
      "high": "ልዑል ቀዳምነት",
      "compliance": "ናይ ምሕዝነት ጉድለት",
      "bestPractice": "ዝበለጸ ኣሰራርሓ"
    },
    "step": "ስጉምቲ {number}",
    "priority": "ቀዳምነት",
    "complexity": {
      "simple": "ቀሊል (~ 2 ደቒቕ)",
      "moderate": "ማእከላይ (~ 10 ደቒቕ)",
      "complex": "ከቢድ (~ 25 ደቒቕ)",
      "requires_review": "ጠበቓ ግምገማ የድሊ (~ 60 ደቒቕ)"
    },
    "goToField": "ናብ ቦታ ኺድ",
    "markComplete": "ተዛዚሙ ኢልካ ምልክት ግበር",
    "skip": "ዝለል",
    "undo": "ተመለስ",
    "progress": "{completed} ካብ {total} ስጉምቲ ({percent}%)",
    "allComplete": "ኩሎም ስጉምቲ ተዛዚሞም!",
    "nextStep": "ዝቕጽል ስጉምቲ",
    "filingReady": "ንምቕራብ ድሉው",
    "notReady": "ድሉው ኣይኮነን — {remaining} ስጉምቲ ተሪፉ"
  }
},
  am: {
  "__meta": {
    "version": "1.0.0",
    "language": "am",
    "languageName": "Amharic",
    "direction": "ltr",
    "copyright": "© 2024–2026 Michael Vernen Thomas Hartmann. All Rights Reserved.",
    "lastUpdated": "2026-02-28",
    "completeness": "partial",
    "fallback": "en"
  },
  "app": {
    "title": "VERNEN™",
    "tagline": "ባለብዙ ቋንቋ የህግ ተገዢነት መድረክ",
    "loading": "በመጫን ላይ…",
    "error": "ስህተት ተከስቷል",
    "retry": "እንደገና ሞክር",
    "back": "ተመለስ",
    "next": "ቀጣይ",
    "previous": "ያለፈው",
    "save": "አስቀምጥ",
    "cancel": "ሰርዝ",
    "close": "ዝጋ",
    "export": "Export",
    "print": "Print",
    "download": "Download",
    "search": "ፈልግ",
    "clear": "Clear",
    "reset": "Reset",
    "confirm": "Confirm",
    "delete": "Delete",
    "edit": "Edit",
    "add": "Add",
    "remove": "Remove",
    "select": "Select",
    "required": "ግዴታ",
    "optional": "Optional",
    "yes": "አዎ",
    "no": "አይ",
    "none": "None",
    "all": "All",
    "other": "Other",
    "unknown": "Unknown",
    "notAvailable": "N/A"
  },
  "nav": {
    "dashboard": "ዳሽቦርድ",
    "documentNavigator": "የሰነድ አሳሽ",
    "validation": "ማረጋገጫ",
    "filingGuide": "የማመልከቻ መመሪያ",
    "audit": "የኦዲት ሪፖርት",
    "assembly": "የሰነድ ስብስብ",
    "settings": "ቅንብሮች",
    "help": "እርዳታ",
    "collapse": "Collapse sidebar",
    "expand": "Expand sidebar"
  },
  "dashboard": {
    "welcome": "ወደ VERNEN™ እንኳን ደህና መጡ",
    "subtitle": "ለመጀመር ሞጁል ይምረጡ",
    "cards": {
      "gdn": {
        "title": "Document Navigator",
        "desc": "Browse and fill Judicial Council forms with guided annotations"
      },
      "validation": {
        "title": "Pre-Filing Validation",
        "desc": "Check forms for errors, missing fields, and compliance issues"
      },
      "filing": {
        "title": "Filing Guide",
        "desc": "Court-specific instructions, fees, and service requirements"
      },
      "audit": {
        "title": "Audit Report",
        "desc": "Generate compliance documentation and risk assessments"
      },
      "assembly": {
        "title": "Document Assembly",
        "desc": "Build multi-form filing packages with automatic data propagation"
      }
    }
  },
  "gdn": {
    "title": "Guided Document Navigator",
    "selectCategory": "Select a category",
    "selectForm": "Select a form",
    "searchForms": "Search forms…",
    "fieldAnnotation": "Field Guidance",
    "legalDefinition": "Legal Definition",
    "commonMistakes": "Common Mistakes",
    "statutoryRef": "Statutory Reference",
    "categories": {
      "family_law": "Family Law",
      "domestic_violence": "Domestic Violence",
      "custody": "Child Custody & Visitation",
      "support": "Child & Spousal Support",
      "fee_waiver": "Fee Waiver",
      "small_claims": "Small Claims",
      "civil_harassment": "Civil Harassment",
      "elder_abuse": "Elder/Dependent Adult Abuse",
      "appeals": "Appeals",
      "general": "General Use"
    },
    "noResults": "No forms match your search.",
    "formFields": "Form Fields",
    "requiredFields": "Required Fields",
    "optionalFields": "Optional Fields",
    "piiWarning": "This field contains personally identifiable information (PII)"
  },
  "validation": {
    "title": "Pre-Filing Validation",
    "runValidation": "Run Validation",
    "revalidate": "Re-Validate",
    "selectForms": "Select forms to validate",
    "overallScore": "Overall Compliance Score",
    "filingReady": "Filing Ready",
    "needsReview": "Needs Review",
    "notReady": "Not Ready",
    "findings": "Findings",
    "noFindings": "No issues found — form is ready for filing.",
    "severity": {
      "critical": "Critical",
      "error": "Error",
      "warning": "Warning",
      "info": "Info"
    },
    "categories": {
      "completeness": "Completeness",
      "format": "Format",
      "compliance": "Compliance",
      "deadline": "Deadline",
      "crossForm": "Cross-Form",
      "service": "Service",
      "procedural": "Procedural"
    },
    "messages": {
      "requiredMissing": "Required field is missing",
      "invalidFormat": "Field format is invalid",
      "deadlinePassed": "Filing deadline may have passed",
      "serviceIncomplete": "Proof of service is incomplete",
      "crossFormMismatch": "Data does not match across forms"
    }
  },
  "filingGuide": {
    "title": "Filing Guide",
    "selectCounty": "Select your county",
    "courtInfo": "Court Information",
    "filingFees": "Filing Fees",
    "serviceReqs": "Service Requirements",
    "deadlines": "Deadlines",
    "eFiling": "E-Filing",
    "inPerson": "In-Person Filing",
    "byMail": "Filing by Mail",
    "hours": "Court Hours",
    "address": "Court Address",
    "phone": "Phone",
    "feeWaivable": "Fee Waiver Eligible",
    "counties": {
      "alameda": "Alameda County",
      "solano": "Solano County",
      "marin": "Marin County",
      "san_francisco": "San Francisco County",
      "contra_costa": "Contra Costa County"
    },
    "serviceTypes": {
      "personal": "Personal Service",
      "mail": "Service by Mail",
      "electronic": "Electronic Service"
    }
  },
  "audit": {
    "title": "Audit Report",
    "generate": "Generate Report",
    "regenerate": "Regenerate",
    "overallRisk": "Overall Risk Level",
    "findings": "Audit Findings",
    "recommendations": "Recommendations",
    "riskLevels": {
      "critical": "Critical Risk",
      "high": "High Risk",
      "medium": "Medium Risk",
      "low": "Low Risk",
      "info": "Informational"
    },
    "categories": {
      "completeness": "Completeness",
      "accuracy": "Accuracy",
      "compliance": "Statutory Compliance",
      "service": "Service of Process",
      "deadlines": "Filing Deadlines",
      "crossForm": "Cross-Form Consistency",
      "procedural": "Procedural Requirements"
    },
    "summary": "Executive Summary",
    "details": "Detailed Findings",
    "noFindings": "No audit findings — documents meet compliance standards."
  },
  "assembly": {
    "title": "Document Assembly",
    "subtitle": "Build multi-form filing packages with automatic cross-form data propagation.",
    "tabs": {
      "parties": "Parties",
      "case": "Case Info",
      "children": "Children",
      "package": "Package Builder",
      "review": "Review & Export"
    },
    "petitioner": "Petitioner (Filing Party)",
    "respondent": "Respondent (Other Party)",
    "caseInfo": "Case Information",
    "children": {
      "title": "Minor Children",
      "add": "Add Child",
      "remove": "Remove",
      "empty": "No children added yet.",
      "emptyHint": "Add children if filing custody, visitation, or support forms.",
      "child": "Child"
    },
    "package": {
      "title": "Select Filing Package",
      "forms": "forms",
      "formsInPackage": "Forms in this package:",
      "types": {
        "dissolution": "Dissolution of Marriage",
        "custody_rfo": "Custody RFO Package",
        "dvro": "DV Restraining Order",
        "fee_waiver": "Fee Waiver Package",
        "custody_modification": "Custody Modification",
        "support_modification": "Support Modification",
        "contempt": "Contempt Proceeding",
        "small_claims": "Small Claims",
        "appeal": "Appeal Package"
      }
    },
    "review": {
      "completeness": "Completeness",
      "readyForAssembly": "Ready for Assembly",
      "partiallyComplete": "Partially Complete",
      "needsMoreInfo": "Needs More Information",
      "consistencyCheck": "Cross-Form Consistency",
      "runCheck": "Run Check",
      "allConsistent": "All cross-form fields are consistent.",
      "summary": "Assembly Summary"
    },
    "fields": {
      "fullName": "Full Legal Name",
      "address": "Street Address",
      "city": "City",
      "state": "State",
      "zip": "ZIP Code",
      "phone": "Phone",
      "email": "Email",
      "dob": "Date of Birth",
      "attorney": "Attorney Name (or \"In Pro Per\")",
      "barNumber": "State Bar Number",
      "caseNumber": "Case Number",
      "county": "County",
      "courtName": "Court Name",
      "courtAddress": "Court Address",
      "department": "Department",
      "filingDate": "Filing Date",
      "hearingDate": "Hearing Date",
      "hearingTime": "Hearing Time",
      "childName": "Child Full Name",
      "childDob": "Date of Birth",
      "childAge": "Current Age",
      "residessWith": "Currently Resides With"
    }
  },
  "settings": {
    "title": "Settings",
    "language": "Language",
    "selectLanguage": "Select language",
    "accessibility": "Accessibility",
    "highContrast": "High Contrast Mode",
    "largeText": "Large Text",
    "reducedMotion": "Reduced Motion",
    "focusIndicators": "Enhanced Focus Indicators",
    "errorLogs": "Error Logs",
    "exportLogs": "Export Error Logs",
    "clearLogs": "Clear Logs",
    "about": "About"
  },
  "help": {
    "title": "Help",
    "thisPage": "This Page",
    "shortcuts": "Shortcuts",
    "about": "About",
    "gettingStarted": "Getting Started",
    "closePanel": "Close help panel"
  },
  "export": {
    "title": "Export",
    "formats": {
      "html": "HTML (Print-Ready)",
      "json": "JSON",
      "csv": "CSV",
      "markdown": "Markdown",
      "text": "Plain Text"
    },
    "options": {
      "maskPII": "Mask PII Fields",
      "includeMetadata": "Include Metadata",
      "includeCitations": "Include Statutory Citations"
    },
    "success": "Export completed successfully.",
    "error": "Export failed. Please try again."
  },
  "errors": {
    "generic": "An unexpected error occurred.",
    "network": "Network error. Please check your connection.",
    "formLoad": "Failed to load form data.",
    "validationFailed": "Validation could not be completed.",
    "exportFailed": "Export failed.",
    "sessionExpired": "Your session has expired. Data has been saved.",
    "storageQuota": "Storage limit reached. Please export and clear old data.",
    "tryAgain": "Try Again",
    "reportIssue": "Report Issue",
    "goToDashboard": "Return to Dashboard"
  },
  "a11y": {
    "skipToMain": "Skip to main content",
    "skipToForm": "Skip to form section",
    "skipToNav": "Skip to navigation",
    "skipToResults": "Skip to results",
    "formProgress": "Form is {percent}% complete",
    "fieldError": "Error: {message}",
    "fieldCleared": "Error cleared",
    "newResults": "Results updated",
    "loading": "Loading, please wait"
  },
  "legal": {
    "disclaimer": "VERNEN™ provides legal form guidance and compliance checking. It does not provide legal advice. For legal counsel, consult a licensed attorney in your jurisdiction.",
    "copyright": "© 2024–2026 Michael Vernen Thomas Hartmann. All Rights Reserved.",
    "trademark": "VERNEN™ is a trademark of Michael Vernen Thomas Hartmann.",
    "ipManifest": "IP Manifest Filed February 2, 2026."
  },
  "auth": {
    "login": "ግባ",
    "register": "መለያ ፍጠር",
    "logout": "ውጣ",
    "email": "ኢሜይል",
    "password": "የይለፍ ቃል",
    "confirmPassword": "የይለፍ ቃል አረጋግጥ",
    "displayName": "ስም",
    "forgotPassword": "የይለፍ ቃል ረሳህ?",
    "resetPassword": "የይለፍ ቃል ዳግም አስጀምር",
    "resetSent": "ዳግም ማስጀመሪያ ኢሜይል ተልኳል። የገቢ ሳጥንህን ፈትሽ።",
    "loginSuccess": "በተሳካ ሁኔታ ገብተሃል።",
    "registerSuccess": "መለያ ተፈጥሯል። እንኳን ወደ VERNEN™ በደህና መጡ።",
    "logoutSuccess": "ወጥተሃል።",
    "loginError": "መግባት አልተሳካም። ኢሜይል እና የይለፍ ቃል ያረጋግጡ።",
    "registerError": "ምዝገባ አልተሳካም። እንደገና ይሞክሩ።",
    "sessionExpired": "ክፍለ ጊዜ አልቋል። እንደገና ይግቡ።",
    "requiredField": "ይህ መስክ ግዴታ ነው።",
    "invalidEmail": "ትክክለኛ ኢሜይል ያስገቡ።",
    "passwordMinLength": "የይለፍ ቃል ቢያንስ 8 ቁምፊ መሆን አለበት።",
    "passwordMismatch": "የይለፍ ቃላት አይዛመዱም።",
    "alreadyHaveAccount": "መለያ አለህ?",
    "noAccount": "መለያ የለህም?",
    "tier": {
      "guest": "እንግዳ",
      "free": "ነፃ",
      "pro": "ፕሮ",
      "advocate": "ጠበቃ"
    },
    "tierRequired": "ይህ ባህሪ {tier} ምዝገባ ይፈልጋል።",
    "upgradePrompt": "ይህንን ባህሪ ለመጠቀም ወደ {tier} ያሻሽሉ።",
    "upgradeNow": "አሁን ያሻሽሉ"
  },
  "payments": {
    "pricing": "ዋጋ",
    "plans": "ዕቅዶች",
    "currentPlan": "አሁኑ ዕቅድ",
    "monthly": "ወርሃዊ",
    "annual": "ዓመታዊ",
    "perMonth": "/ወር",
    "perYear": "/ዓመት",
    "save": "{percent}% ቁጠብ",
    "freePlan": {
      "name": "ነፃ",
      "description": "መሰረታዊ የቅጽ መመሪያ።",
      "price": "$0"
    },
    "proPlan": {
      "name": "ፕሮ",
      "description": "ሙሉ ኦዲት፣ ወደ ውጭ መላክ እና የብዙ ቋንቋ ድጋፍ።",
      "priceMonthly": "$19.99",
      "priceAnnual": "$191.88"
    },
    "advocatePlan": {
      "name": "ጠበቃ",
      "description": "ሙሉ መድረክ ከሰነድ ስብሰባ እና ማቅረብ ጋር።",
      "priceMonthly": "$39.99",
      "priceAnnual": "$383.88"
    },
    "subscribe": "ተመዝገብ",
    "upgrade": "ያሻሽሉ",
    "downgrade": "ዝቅ ያድርጉ",
    "manageBilling": "ክፍያ ያስተዳድሩ",
    "cancelSubscription": "ምዝገባ ሰርዝ",
    "checkoutRedirect": "ወደ ደህንነቱ የተጠበቀ ክፍያ ይዛወራል...",
    "checkoutSuccess": "ምዝገባ ነቅቷል!",
    "checkoutCanceled": "ክፍያ ተሰርዟል።",
    "paymentFailed": "ክፍያ አልተሳካም። የክፍያ ዘዴ ያሻሽሉ።",
    "subscriptionActive": "ምዝገባዎ እስከ {date} ንቁ ነው።",
    "subscriptionCanceled": "ምዝገባዎ በ{date} ያበቃል።"
  },
  "esignature": {
    "title": "ኤሌክትሮኒክ ፊርማ",
    "signHere": "እዚህ ፈርም",
    "drawSignature": "ፊርማ ሳል",
    "typeSignature": "ፊርማ ጻፍ",
    "uploadSignature": "ፊርማ ጫን",
    "clearSignature": "ደምስስ",
    "acceptSignature": "ፊርማ ተቀበል",
    "signatureRequired": "ይህ መስክ ፊርማ ይፈልጋል።",
    "wetInkRequired": "ይህ መስክ የእጅ ፊርማ ይፈልጋል። ያትሙ፣ ይፈርሙ እና ይቃኙ።",
    "notarizationRequired": "ይህ መስክ ማረጋገጫ ይፈልጋል።",
    "intentDeclaration": "በመፈረም፣ በካሊፎርኒያ ግዛት ሕግ መሰረት በሐሰት ምስክርነት ቅጣት ስር በዚህ ሰነድ ያለው መረጃ እውነትና ትክክል መሆኑን አውጃለሁ።",
    "consentCheckbox": "ይህ ኤሌክትሮኒክ ፊርማ ከእጅ ፊርማ ጋር ተመሳሳይ ሕጋዊ ውጤት እንዳለው ተረድቻለሁ (Cal. Civ. Code § 1633.7)።",
    "signed": "ተፈርሟል",
    "unsigned": "አልተፈረመም",
    "signedBy": "በ{name} {date} ተፈርሟል",
    "revoke": "ፊርማ ሰርዝ",
    "revokeConfirm": "ይህንን ፊርማ ለመሰረዝ እርግጠኛ ነዎት?",
    "documentChanged": "ከፊርማ በኋላ ሰነድ ተቀይሯል። ድጋሚ ፊርማ ያስፈልጋል።",
    "certificate": "የፊርማ ምስክር ወረቀት",
    "viewCertificate": "የፊርማ ምስክር ወረቀት ይመልከቱ",
    "legalBasis": "Cal. Civ. Code § 1633 (UETA)"
  },
  "filing": {
    "title": "ለፍርድ ቤት አቅርብ",
    "createPackage": "የማቅረቢያ ጥቅል ፍጠር",
    "filingType": "የማቅረቢያ ዓይነት",
    "selectCourt": "ፍርድ ቤት ምረጥ",
    "caseNumber": "የጉዳይ ቁጥር",
    "newCase": "አዲስ ጉዳይ",
    "documents": "ሰነዶች",
    "addDocument": "ሰነድ ጨምር",
    "proofOfService": "የአገልግሎት ማስረጃ",
    "filingFee": "የማቅረቢያ ክፍያ",
    "feeWaiver": "ክፍያ ነፃ (FW-003)",
    "estimatedFee": "የተገመተ ክፍያ: {amount}",
    "validate": "ጥቅል አረጋግጥ",
    "validationPassed": "ጥቅል ተዘጋጅቷል።",
    "validationFailed": "ጥቅል {count} ስህተት አለው።",
    "submit": "ለፍርድ ቤት አቅርብ",
    "submitConfirm": "ይህንን ጥቅል ለ{court} ያቅርቡ?",
    "submitting": "እየቀረበ ነው...",
    "submitted": "በተሳካ ሁኔታ ቀርቧል።",
    "confirmationNumber": "ማረጋገጫ: {number}",
    "checkStatus": "ሁኔታ ፈትሽ",
    "status": {
      "draft": "ረቂቅ",
      "ready": "ዝግጁ",
      "submitting": "እየቀረበ",
      "submitted": "ቀርቧል",
      "accepted": "እየታየ",
      "rejected": "ተቀባይነት አላገኘም",
      "filed": "ተመዝግቧል",
      "error": "ስህተት"
    },
    "rejected": "ቅርቡ ተቀባይነት አላገኘም: {reason}",
    "filedStamped": "የታተመ ቅጂ ይገኛል።",
    "downloadFiled": "የታተመ ቅጂ አውርድ",
    "history": "የማቅረቢያ ታሪክ",
    "noFilings": "ምንም ቅርቦች የሉም።",
    "wetInkWarning": "ይህ ቅጽ የእጅ ፊርማ የሚፈልጉ መስኮች አሉት።"
  },
  "traceability": {
    "title": "የሕግ ማስከተያ መዝገብ",
    "description": "በኦዲት ጊዜ የተጠቀሱ ሁሉም የሕግ ምንጮች መዝገብ።",
    "sources": "የተጠቀሱ ምንጮች",
    "statutes": "ሕጎች",
    "regulations": "ደንቦች",
    "rulesOfCourt": "የፍርድ ቤት ደንቦች",
    "federalCode": "ፌደራል ሕግ",
    "contentHash": "የይዘት ሃሽ (SHA-256)",
    "retrievedAt": "የተገኘበት ጊዜ",
    "linkedFinding": "የተያያዘ ግኝት",
    "logFinalized": "መዝገብ ተጠናቅቆ ተቆልፏል።",
    "viewLog": "መዝገብ ይመልከቱ",
    "downloadLog": "መዝገብ አውርድ (PDF)",
    "compliance": "ይህ መዝገብ የግልጽነት መስፈርቶችን ያሟላል።"
  },
  "remediation": {
    "title": "የማስተካከያ መመሪያ",
    "description": "ግኝቶችን ለመፍታት ደረጃ በደረጃ መመሪያ።",
    "summary": "ማጠቃለያ",
    "totalSteps": "{count} ደረጃዎች ለማጠናቀቅ",
    "estimatedTime": "የተገመተ ጊዜ: {minutes} ደቂቃ",
    "phase": "ምዕራፍ {number}: {name}",
    "phases": {
      "critical": "ወሳኝ ማስተካከያዎች",
      "high": "ከፍተኛ ቅድሚያ",
      "compliance": "ተገዢነት ክፍተቶች",
      "bestPractice": "ምርጥ ልምዶች"
    },
    "step": "ደረጃ {number}",
    "priority": "ቅድሚያ",
    "complexity": {
      "simple": "ቀላል (~ 2 ደቂቃ)",
      "moderate": "መካከለኛ (~ 10 ደቂቃ)",
      "complex": "ውስብስብ (~ 25 ደቂቃ)",
      "requires_review": "ጠበቃ ግምገማ ያስፈልጋል (~ 60 ደቂቃ)"
    },
    "goToField": "ወደ መስክ ሂድ",
    "markComplete": "ተጠናቅቋል ምልክት አድርግ",
    "skip": "ዝለል",
    "undo": "ቀልብስ",
    "progress": "{completed} ከ{total} ደረጃዎች ({percent}%)",
    "allComplete": "ሁሉም ደረጃዎች ተጠናቅቀዋል!",
    "nextStep": "ቀጣይ ደረጃ",
    "filingReady": "ለማቅረብ ዝግጁ",
    "notReady": "ዝግጁ አይደለም — {remaining} ደረጃዎች ቀርተዋል"
  }
},
};

/**
 * REGULIS Revenue Products — Compliance report offerings.
 * Each product defines a tier of compliance analysis REGULIS can sell.
 */

export interface ComplianceCheckProduct {
  id: string;
  name: string;
  price: number;
  /** Price display string, e.g. "$29" or "$35/mo" */
  priceLabel: string;
  description: string;
  features: string[];
  maxStates: number;
  maxFindings: number;
  recurring: boolean;
}

export const PRODUCTS: ComplianceCheckProduct[] = [
  {
    id: "free_preview",
    name: "Free Preview",
    price: 0,
    priceLabel: "$0",
    description:
      "Quick compliance snapshot — see your top 5 findings at no cost.",
    features: [
      "Up to 5 compliance findings",
      "Basic compliance score",
      "Summary of applicable rules",
      "Single state only",
    ],
    maxStates: 1,
    maxFindings: 5,
    recurring: false,
  },
  {
    id: "single_state",
    name: "Single State Report",
    price: 2900,
    priceLabel: "$29",
    description:
      "Full compliance report for one state plus all applicable federal rules.",
    features: [
      "Complete state + federal analysis",
      "All findings with remediation guidance",
      "Compliance score with category breakdown",
      "Downloadable HTML report",
      "30-day report access",
    ],
    maxStates: 1,
    maxFindings: Infinity,
    recurring: false,
  },
  {
    id: "multi_state",
    name: "Multi-State Package",
    price: 14900,
    priceLabel: "$149",
    description:
      "Comprehensive compliance analysis across up to 5 states plus federal.",
    features: [
      "Up to 5 states + federal analysis",
      "Cross-jurisdictional conflict detection",
      "All findings with remediation guidance",
      "Priority compliance score per state",
      "Downloadable HTML report",
      "90-day report access",
    ],
    maxStates: 5,
    maxFindings: Infinity,
    recurring: false,
  },
  {
    id: "full_50_state",
    name: "Full 50-State Scan",
    price: 49900,
    priceLabel: "$499",
    description:
      "The definitive compliance scan — every state, every applicable federal rule, cross-jurisdictional analysis.",
    features: [
      "All 50 states + DC + federal analysis",
      "Cross-jurisdictional conflict detection",
      "All findings with remediation guidance",
      "State-by-state compliance scorecard",
      "Downloadable HTML report",
      "180-day report access",
      "Priority support",
    ],
    maxStates: 51,
    maxFindings: Infinity,
    recurring: false,
  },
  {
    id: "monthly_monitor",
    name: "Monthly Monitor",
    price: 3500,
    priceLabel: "$35/mo",
    description:
      "Ongoing compliance monitoring with alerts when regulations change.",
    features: [
      "Monthly compliance re-scan",
      "Regulatory change alerts",
      "Up to 3 states + federal",
      "Email notifications for new risks",
      "Trend tracking over time",
      "All findings with remediation guidance",
    ],
    maxStates: 3,
    maxFindings: Infinity,
    recurring: true,
  },
];

/**
 * Determine which product applies based on the number of states
 * and entity type requested.
 */
export function getProductForRequest(
  stateCount: number,
  _entityType: string
): {
  recommended: ComplianceCheckProduct;
  allProducts: ComplianceCheckProduct[];
} {
  let recommended: ComplianceCheckProduct;

  if (stateCount <= 0) {
    recommended = PRODUCTS[0]!; // Free Preview
  } else if (stateCount === 1) {
    recommended = PRODUCTS[1]!; // Single State
  } else if (stateCount <= 5) {
    recommended = PRODUCTS[2]!; // Multi-State
  } else {
    recommended = PRODUCTS[3]!; // Full 50-State
  }

  return { recommended, allProducts: PRODUCTS };
}

/**
 * Look up a product by its ID.
 */
export function getProductById(
  productId: string
): ComplianceCheckProduct | undefined {
  return PRODUCTS.find((p) => p.id === productId);
}

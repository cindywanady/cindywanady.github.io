/**
 * Turns TypeSafe's judgment about one claim into a verdict. Kept apart from
 * scripts/claims.ts so the policy is testable without calling the API.
 *
 * A confident answer decides the claim. Anything less goes to a person: a
 * confidence below the threshold means the model saw more than one reading,
 * and on a public page about a real person that is a human's call.
 */
export type Relation = "supports" | "contradicts" | "says_nothing";
export type Verdict = "verified" | "contradicted" | "unsupported" | "review" | "fabricated";

export const AUTO_ACCEPT = 0.8;

const DECIDED: Record<Relation, Verdict> = {
    supports: "verified",
    contradicts: "contradicted",
    says_nothing: "unsupported",
};

export function verdictFor(relation: Relation, confidence: number, threshold = AUTO_ACCEPT): Verdict {
    return confidence >= threshold ? DECIDED[relation] : "review";
}

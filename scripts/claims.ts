/**
 * Checks that every factual sentence on the site is supported by the source
 * line it quotes. Run with `npm run claims`; needs TYPESAFE_API_KEY.
 *
 * 1. Code first: each quote must be a verbatim span of its source file, and
 *    every number shown must appear in the quote. Failures are "fabricated"
 *    and never reach the model.
 * 2. TypeSafe then judges each remaining claim: does the quote support it,
 *    contradict it, or say nothing about it?
 * 3. src/lib/claim-verdict.ts turns the answer into a verdict. Anything short
 *    of "verified" fails the run; uncertain answers are written to
 *    claims-review.md for a person to decide.
 */
import { writeFileSync } from "node:fs";
import { allClaims } from "@content";
import { choice, TypeSafeClient } from "@typesafe-ai/sdk";
import { type Claim, checkEvidence } from "@/lib/claims";
import { type Relation, type Verdict, verdictFor } from "@/lib/claim-verdict";

const REVIEW_FILE = "claims-review.md";
const CONCURRENCY = 4;

const QUESTIONS = {
    relation: choice(
        "A personal website shows `claim` about its author, backed by `source`, a verbatim line from the author's CV or notes. How does `source` relate to `claim`? The claim may reword the source but must not say more than it.",
        {
            supports: "The source states or directly implies everything the claim says.",
            contradicts: "The source states something that conflicts with the claim.",
            says_nothing: "The claim asserts something the source does not state.",
        },
    ),
};

type Result = { claim: Claim; verdict: Verdict; confidence?: number; detail?: string };

function unique(claims: Claim[]): Claim[] {
    const seen = new Map<string, Claim>();
    for (const c of claims) seen.set(`${c.source}\u0000${c.quote}\u0000${c.text}`, c);
    return [...seen.values()];
}

async function judge(client: TypeSafeClient, claim: Claim): Promise<Result> {
    const response = await client.systemOne({ state: { claim: claim.text, source: claim.quote }, questions: QUESTIONS });
    const answer = response.answers.relation;
    return { claim, verdict: verdictFor(answer.choice as Relation, answer.confidence), confidence: answer.confidence };
}

async function inBatches<T, R>(items: T[], size: number, fn: (item: T) => Promise<R>): Promise<R[]> {
    const out: R[] = [];
    for (let i = 0; i < items.length; i += size) out.push(...(await Promise.all(items.slice(i, i + size).map(fn))));
    return out;
}

async function main(): Promise<number> {
    const claims = unique(allClaims());
    const problems = checkEvidence(claims);
    const fabricated: Result[] = problems.map((p) => ({ claim: p.claim, verdict: "fabricated", detail: p.detail }));
    const bad = new Set(problems.map((p) => p.claim));

    if (!process.env.TYPESAFE_API_KEY) {
        for (const f of fabricated) console.error(`fabricated  ${f.claim.text}  (${f.detail})`);
        console.error(`TYPESAFE_API_KEY is not set, so ${claims.length - bad.size} claims were not judged. Set it and run npm run claims again.`);
        return 2;
    }

    const client = new TypeSafeClient();
    const judged = await inBatches(
        claims.filter((c) => !bad.has(c)),
        CONCURRENCY,
        (c) => judge(client, c),
    );
    const results = [...fabricated, ...judged];

    const failing = results.filter((r) => r.verdict !== "verified");
    for (const r of failing) {
        const why = r.detail ?? `confidence ${r.confidence?.toFixed(2)}`;
        console.error(`${r.verdict.padEnd(12)} ${r.claim.text}  (${why})`);
    }

    const review = results.filter((r) => r.verdict === "review");
    writeFileSync(
        REVIEW_FILE,
        review.length === 0
            ? "# Claims to review\n\nNone.\n"
            : `# Claims to review\n\nTypeSafe was not confident enough to decide these. Check each against its source, then reword the claim or its quote.\n\n${review
                  .map((r) => `- **${r.claim.text}**\n  - source (${r.claim.source}): "${r.claim.quote}"\n  - confidence: ${r.confidence?.toFixed(2)}`)
                  .join("\n")}\n`,
    );

    console.log(`${results.length} claims: ${results.length - failing.length} verified, ${failing.length} failing, ${review.length} for review in ${REVIEW_FILE}`);
    return failing.length === 0 ? 0 : 1;
}

main().then(
    (code) => process.exit(code),
    (error: unknown) => {
        console.error(error);
        process.exit(1);
    },
);

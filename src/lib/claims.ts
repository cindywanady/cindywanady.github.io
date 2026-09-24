import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * The evidence contract. Every factual sentence on the site is a Claim: the
 * text shown, which committed source file backs it, and the verbatim span of
 * that file it rests on. checkEvidence proves the span exists and that every
 * number shown is one the span contains. Whether the span actually supports
 * the sentence is a judgment, made by scripts/claims.ts.
 */
export type Source = "cv" | "yoga";

export type Claim = {
    text: string;
    source: Source;
    quote: string;
};

export type EvidenceProblem = {
    claim: Claim;
    problem: "quote-not-in-source" | "number-not-in-quote";
    detail: string;
};

const EMOJI = /\p{Extended_Pictographic}️?/gu;

/** Collapse whitespace, straighten curly quotes, drop emoji. */
export function normalize(s: string): string {
    return s.replace(EMOJI, "").replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").trim();
}

/** Every number as a reader would say it: "50,000" is 50000, "29%" is 29. */
export function numbersIn(s: string): string[] {
    return (s.match(/\d[\d,]*(?:\.\d+)?/g) ?? []).map((n) => n.replace(/,/g, ""));
}

export function readSource(source: Source): string {
    return readFileSync(join(process.cwd(), "sources", `${source}.md`), "utf8");
}

export function checkEvidence(claims: Claim[], read: (s: Source) => string = readSource): EvidenceProblem[] {
    const cache = new Map<Source, string>();
    const sourceText = (s: Source) => {
        if (!cache.has(s)) cache.set(s, normalize(read(s)));
        return cache.get(s)!;
    };

    const problems: EvidenceProblem[] = [];
    for (const claim of claims) {
        const quote = normalize(claim.quote);
        if (!sourceText(claim.source).includes(quote)) {
            problems.push({ claim, problem: "quote-not-in-source", detail: `sources/${claim.source}.md has no "${quote}"` });
            continue;
        }
        const available = new Set(numbersIn(quote));
        const missing = numbersIn(claim.text).filter((n) => !available.has(n));
        if (missing.length > 0) {
            problems.push({ claim, problem: "number-not-in-quote", detail: `quote lacks ${missing.join(", ")}` });
        }
    }
    return problems;
}

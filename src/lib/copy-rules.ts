/**
 * The writing rules from the spec (section 5.5) as checks over site copy.
 * tests/unit/copy-rules.test.ts runs them over every string in content/.
 */
export type CopyProblem = { text: string; rule: string };

const MAX_WORDS = 20;

const SALES_WORDS = ["passionate", "driven", "results-oriented", "leverage", "synergy", "seamless", "cutting-edge", "dynamic", "innovative"];

// American spelling, matching the CV. Listed forms, not a suffix rule, because
// "-ise" also ends plenty of correct American words (advise, expertise).
const BRITISH =
    /\b(colours?|behaviours?|organis(e|ed|es|ing|ation|ations)|optimis(e|ed|es|ing|ation)|analys(e|ed|es|ing)|practis(e|ed|es|ing)|recognis(e|ed|es|ing)|realis(e|ed|es|ing)|centres?|modelling|travelling|licence)\b/i;

// Abbreviations whose period does not end a sentence.
const ABBREVIATIONS = /\b(A\/Prof|Prof|Dr|est|e\.g|i\.e)\./g;

function sentences(text: string): string[] {
    return text
        .replace(ABBREVIATIONS, (m) => m.replace(".", "\u0000"))
        .split(/(?<=[.!?])\s+/)
        .map((s) => s.replace(/\u0000/g, "."))
        .filter(Boolean);
}

function check(text: string): string[] {
    const rules: string[] = [];
    if (text.includes("—")) rules.push("em dash");
    if (/\p{Extended_Pictographic}/u.test(text)) rules.push("emoji");
    if (sentences(text).some((s) => s.split(/\s+/).length > MAX_WORDS)) rules.push("long sentence");
    if (/\bnot\b[^.]{0,60}?,\s*but\b|\brather than\b|\bit'?s not about\b/i.test(text)) rules.push("negative contrast");
    if (SALES_WORDS.some((w) => new RegExp(`\\b${w}\\b`, "i").test(text))) rules.push("sales word");
    if (BRITISH.test(text)) rules.push("british spelling");
    return rules;
}

export function copyProblems(strings: string[]): CopyProblem[] {
    return strings.flatMap((text) => check(text).map((rule) => ({ text, rule })));
}

/**
 * Every string a reader sees, found anywhere in a content tree. Skips a
 * claim's `quote` (source text, not copy), its `source` key, and URLs.
 */
export function allStrings(value: unknown): string[] {
    if (typeof value === "string") return /^https?:\/\//.test(value) ? [] : [value];
    if (Array.isArray(value)) return value.flatMap(allStrings);
    if (value && typeof value === "object") {
        return Object.entries(value).flatMap(([key, v]) => (key === "quote" || key === "source" ? [] : allStrings(v)));
    }
    return [];
}

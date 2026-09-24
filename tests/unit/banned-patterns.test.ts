import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function files(dir: string): string[] {
    return readdirSync(dir).flatMap((name) => {
        const path = join(dir, name);
        return statSync(path).isDirectory() ? files(path) : /\.(tsx?|css)$/.test(name) ? [path] : [];
    });
}

// Template markers the spec bans (section 4.5). Each pattern names the thing a
// reader would recognize, not an implementation detail.
const BANNED: [string, RegExp][] = [
    ["eyebrow or kicker label", /\b(eyebrow|kicker)\b/i],
    ["gradient fill or text", /\b(bg-gradient-|bg-linear-|bg-radial-|bg-conic-)|linear-gradient\(|radial-gradient\(/],
    ["frosted glass card", /\bbackdrop-blur/],
    ["vertical accent rail", /\bborder-l-(2|4|8)\b/],
    ["emoji", /\p{Extended_Pictographic}/u],
];

const SAMPLES: Record<string, string> = {
    "eyebrow or kicker label": '<p className="eyebrow">Featured</p>',
    "gradient fill or text": 'className="bg-linear-to-r from-brand-500"',
    "frosted glass card": 'className="backdrop-blur-md"',
    "vertical accent rail": 'className="border-l-4 border-brand-600"',
    emoji: "Learning ✨",
};

describe("banned pattern definitions", () => {
    it.each(BANNED)("%s catches its sample", (name, pattern) => {
        expect(pattern.test(SAMPLES[name])).toBe(true);
    });
});

describe("banned patterns", () => {
    const sources = files("src").map((f) => [f, readFileSync(f, "utf8")] as const);

    it.each(BANNED)("no %s anywhere in src/", (_name, pattern) => {
        const hits = sources.filter(([, text]) => pattern.test(text)).map(([f]) => f);
        expect(hits).toEqual([]);
    });
});

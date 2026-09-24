import { describe, expect, it } from "vitest";
import { type Claim, checkEvidence, normalize, numbersIn, readSource } from "@/lib/claims";

const src = {
    cv: "Led CRM platform migrations covering est. 50,000 records across 5 modules.",
    yoga: "Practicing yoga for 3 years,\nas of 2026-09-24.",
};
const read = (s: "cv" | "yoga") => src[s];

describe("numbersIn", () => {
    it("reads numbers the way a reader would", () => {
        expect(numbersIn("5× faster, 50,000 records, 29% and 3.67")).toEqual(["5", "50000", "29", "3.67"]);
    });

    it("finds nothing in plain words", () => {
        expect(numbersIn("Field mapping and validation rules")).toEqual([]);
    });

    it("does not treat a trailing sentence period as a decimal", () => {
        expect(numbersIn("across 23 branches.")).toEqual(["23"]);
    });
});

describe("normalize", () => {
    it("collapses whitespace, straightens quotes, drops emoji", () => {
        expect(normalize("it’s  a\nlucky ✨🌱 day")).toBe("it's a lucky day");
    });
});

describe("checkEvidence", () => {
    it("passes a claim whose quote is in the source and whose numbers are in the quote", () => {
        const c: Claim = { text: "I migrated about 50,000 CRM records.", source: "cv", quote: "est. 50,000 records across 5 modules" };
        expect(checkEvidence([c], read)).toEqual([]);
    });

    it("matches a quote that the source wraps across lines", () => {
        const c: Claim = { text: "I have practiced for 3 years.", source: "yoga", quote: "Practicing yoga for 3 years, as of 2026-09-24" };
        expect(checkEvidence([c], read)).toEqual([]);
    });

    it("fails a quote that is not in the source", () => {
        const c: Claim = { text: "I migrated records.", source: "cv", quote: "migrated 90,000 records" };
        expect(checkEvidence([c], read).map((p) => p.problem)).toEqual(["quote-not-in-source"]);
    });

    it("fails a number in the text that the quote does not contain", () => {
        const c: Claim = { text: "I migrated 60,000 records.", source: "cv", quote: "est. 50,000 records" };
        const problems = checkEvidence([c], read);
        expect(problems.map((p) => p.problem)).toEqual(["number-not-in-quote"]);
        expect(problems[0].detail).toContain("60000");
    });
});

describe("readSource", () => {
    it("reads the committed source files", () => {
        expect(readSource("cv")).toContain("Mekari");
        expect(readSource("yoga")).toContain("Vidyarasa");
    });
});

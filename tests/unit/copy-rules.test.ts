import { describe, expect, it } from "vitest";
import { site } from "@content";
import { allStrings, copyProblems } from "@/lib/copy-rules";

const rulesFor = (s: string) => copyProblems([s]).map((p) => p.rule);

describe("copyProblems", () => {
    it.each([
        ["em dash", "I built it — fast."],
        ["emoji", "Learning matters ✨"],
        ["long sentence", "One two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty twentyone."],
        ["negative contrast", "It is not a report, but a system."],
        ["negative contrast", "I measure it rather than guess."],
        ["negative contrast", "It's not about speed."],
        ["sales word", "A passionate and results-oriented analyst."],
        ["british spelling", "I optimise the colour of each behaviour."],
    ])("flags %s: %s", (rule, s) => {
        expect(rulesFor(s)).toContain(rule);
    });

    it.each([
        "I cut a report from about 2 hours to a few minutes per event.",
        "Sept 2018 – Jul 2019",
        "A/Prof. Derry Wijaya supervises the thesis.",
        "Learning matters more than perfection.",
        "I optimized 700+ workflow automations.",
        "Advised a local small business on production.",
    ])("passes clean copy: %s", (s) => {
        expect(copyProblems([s])).toEqual([]);
    });
});

describe("allStrings", () => {
    it("collects copy and skips quotes, sources and URLs", () => {
        const tree = { a: "Shown copy.", b: [{ text: "Claim text.", source: "cv", quote: "Quoted — source." }], url: "https://x.y/" };
        expect(allStrings(tree).sort()).toEqual(["Claim text.", "Shown copy."]);
    });
});

describe("site copy", () => {
    it("follows every writing rule", () => {
        expect(copyProblems(allStrings(site))).toEqual([]);
    });
});

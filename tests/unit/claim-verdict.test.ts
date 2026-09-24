import { describe, expect, it } from "vitest";
import { verdictFor } from "@/lib/claim-verdict";

describe("verdictFor", () => {
    it.each([
        ["supports", 0.9, "verified"],
        ["supports", 0.8, "verified"],
        ["supports", 0.79, "review"],
        ["contradicts", 0.9, "contradicted"],
        ["contradicts", 0.5, "review"],
        ["says_nothing", 0.85, "unsupported"],
        ["says_nothing", 0.4, "review"],
    ] as const)("%s at %s is %s", (relation, confidence, verdict) => {
        expect(verdictFor(relation, confidence)).toBe(verdict);
    });

    it("takes a different threshold when given one", () => {
        expect(verdictFor("supports", 0.85, 0.9)).toBe("review");
    });
});

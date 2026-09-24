import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("type", () => {
    const theme = readFileSync("src/styles/theme.css", "utf8");
    const layout = readFileSync("src/app/layout.tsx", "utf8");

    it("sets Familjen Grotesk for display and Source Serif 4 for body", () => {
        expect(theme).toMatch(/--font-display:\s*var\(--font-familjen/);
        expect(theme).toMatch(/--font-body:\s*var\(--font-source-serif/);
    });

    it("loads both faces and no leftover Inter", () => {
        expect(layout).toContain("Familjen_Grotesk");
        expect(layout).toContain("Source_Serif_4");
        expect(layout).not.toContain("Inter");
    });
});

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("type", () => {
    const theme = readFileSync("src/styles/theme.css", "utf8");
    const css = readFileSync("src/styles/site.css", "utf8");

    it("sets Familjen Grotesk for display and Source Serif 4 for body", () => {
        expect(theme).toMatch(/--font-display:\s*var\(--font-familjen/);
        expect(theme).toMatch(/--font-body:\s*var\(--font-source-serif/);
    });

    it("loads both faces locally so static builds do not depend on Google Fonts", () => {
        expect(css).toContain("/fonts/familjen-grotesk-latin.woff2");
        expect(css).toContain("/fonts/source-serif-4-latin.woff2");
    });
});

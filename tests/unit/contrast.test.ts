import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { contrastRatio } from "@/design/contrast";
import { brand, neutral, palette, textSafe } from "@/design/palette";

describe("contrastRatio", () => {
    it("matches known WCAG values", () => {
        expect(contrastRatio("#000000", "#FFFFFF")).toBeCloseTo(21, 1);
        expect(contrastRatio(palette.espresso, palette.cream)).toBeCloseTo(10.31, 1);
    });

    it("is symmetric", () => {
        expect(contrastRatio(palette.cream, palette.burgundy)).toBeCloseTo(contrastRatio(palette.burgundy, palette.cream), 5);
    });
});

describe("palette", () => {
    it("anchors the scales on the supplied colors", () => {
        expect(brand[700]).toBe(palette.burgundy);
        expect(neutral[50]).toBe(palette.cream);
        expect(neutral[200]).toBe(palette.sand);
        expect(neutral[800]).toBe(palette.espresso);
    });

    it("keeps every text-safe color at 4.5:1 or better on cream", () => {
        for (const c of textSafe) expect(contrastRatio(c, palette.cream), c).toBeGreaterThanOrEqual(4.5);
    });

    it("never lists coral, mustard or sand as text-safe", () => {
        for (const c of [palette.coral, palette.mustard, palette.sand]) expect(textSafe).not.toContain(c);
    });
});

describe("theme.css", () => {
    const css = readFileSync("src/styles/theme.css", "utf8").toLowerCase();

    it("declares every brand and neutral step from palette.ts", () => {
        for (const [k, v] of Object.entries(brand)) expect(css).toContain(`--color-brand-${k}: ${v.toLowerCase()};`);
        for (const [k, v] of Object.entries(neutral)) expect(css).toContain(`--color-neutral-${k}: ${v.toLowerCase()};`);
    });

    it("uses cream as the page background and espresso as primary text", () => {
        expect(css).toMatch(/--color-bg-primary:\s*var\(--color-neutral-50\)/);
        expect(css).toMatch(/--color-text-primary:\s*var\(--color-neutral-800\)/);
    });

    it("has no dark theme to fall into", () => {
        expect(css).not.toContain(".dark-mode");
    });

    it("never points a text token at coral, mustard or sand", () => {
        const textTokens = css.match(/--color-text-[a-z0-9-]+:\s*[^;]+/g) ?? [];
        expect(textTokens.length).toBeGreaterThan(0);
        for (const t of textTokens) expect(t).not.toMatch(/ornament|feature|neutral-(100|200|300|400)\)|#f28c7c|#c89b2b|#d9c2a3/);
    });
});

describe("globals.css", () => {
    // Untitled UI components carry `dark:` utilities. Bound to a class nothing
    // applies, they never fire. Deleted as dead code, Tailwind would fall back to
    // prefers-color-scheme and dark-OS readers would get half a dark theme.
    it("binds dark: to a class the site never sets", () => {
        const css = readFileSync(process.env.GLOBALS_CSS ?? "src/styles/globals.css", "utf8");
        expect(css).toMatch(/@custom-variant dark \(&:where\(\.dark-mode, \.dark-mode \*\)\);/);
    });
});

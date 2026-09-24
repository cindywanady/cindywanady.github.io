import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("next config", () => {
    it("exports static HTML with trailing slashes", async () => {
        const { default: config } = await import("../../next.config.mjs");
        expect(config.output).toBe("export");
        expect(config.trailingSlash).toBe(true);
        expect(config.images?.unoptimized).toBe(true);
    });

    it("ships no theme switcher", () => {
        const pkg = JSON.parse(readFileSync("package.json", "utf8"));
        expect(pkg.dependencies["next-themes"]).toBeUndefined();
    });
});

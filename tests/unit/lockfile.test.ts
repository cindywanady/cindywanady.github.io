import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// npm drops platform-specific optional packages from the lockfile when it
// rewrites it on a machine that already lacks them (npm/cli#4828). CI builds on
// Linux with `npm ci`, which installs only what the lockfile lists, so a missing
// entry breaks every test run there while everything passes locally.
describe("package-lock.json", () => {
    const packages = JSON.parse(readFileSync("package-lock.json", "utf8")).packages as Record<string, unknown>;

    it.each(["@rolldown/binding-linux-x64-gnu", "@rolldown/binding-darwin-arm64"])("records %s", (name) => {
        expect(packages[`node_modules/${name}`]).toBeDefined();
    });
});

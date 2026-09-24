import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// Text checks rather than a YAML parser, to add no dependency. Each names the
// risk it guards.
const yml = readFileSync(".github/workflows/deploy.yml", "utf8");
const section = (name: string) => {
    const start = yml.indexOf(`\n    ${name}:\n`);
    const next = yml.slice(start + 1).search(/\n    [a-z]+:\n/);
    return next === -1 ? yml.slice(start) : yml.slice(start, start + 1 + next);
};
const topLevel = yml.slice(0, yml.indexOf("\njobs:"));

describe("deploy workflow", () => {
    it("grants Pages write access to the deploy job only", () => {
        // PR code runs npm install scripts in check and claims; neither should
        // be able to mint a token that can publish.
        expect(topLevel).not.toMatch(/pages: write|id-token: write/);
        expect(section("check")).not.toMatch(/pages: write|id-token: write/);
        expect(section("claims")).not.toMatch(/pages: write|id-token: write/);
        expect(section("deploy")).toMatch(/pages: write/);
        expect(section("deploy")).toMatch(/id-token: write/);
    });

    it("publishes only from main", () => {
        // A manual run from a feature branch must not publish that branch.
        expect(section("deploy")).toMatch(/if: github\.ref == 'refs\/heads\/main'/);
    });

    it("deploys after GitHub's legacy Pages build of the same commit, while the legacy source is on", () => {
        // Pages keeps whichever deployment was created last. With the legacy
        // branch source still on, GitHub's Jekyll build of each push races ours
        // and can publish the raw repository over the site.
        const deploy = section("deploy");
        const wait = deploy.indexOf("pages/builds/latest");
        expect(wait).toBeGreaterThan(-1);
        expect(wait).toBeLessThan(deploy.indexOf("actions/deploy-pages"));
        expect(deploy).toMatch(/build_type/);
    });
});

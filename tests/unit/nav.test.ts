import { site } from "@content";
import { describe, expect, it } from "vitest";
import { currentNavHref } from "@/lib/nav";

describe("currentNavHref", () => {
    it.each([
        ["/data/", "/data/"],
        ["/data/thesis/", "/data/"],
        ["/yoga/", "/yoga/"],
        ["/about/", "/about/"],
        ["/contact/", "/contact/"],
        ["/", null],
        ["/nowhere/", null],
        ["/database/", null],
        // GitHub Pages serves 404.html at the missing URL. Its prerendered nav
        // marks nothing, so the client must agree or React reports a mismatch.
        ["/data/old-project/", null],
        ["/yoga/missing/", null],
    ])("%s -> %s", (path, expected) => {
        expect(currentNavHref(path, site.navigation)).toBe(expected);
    });

    it("tolerates a path without its trailing slash", () => {
        expect(currentNavHref("/data/thesis", site.navigation)).toBe("/data/");
    });
});

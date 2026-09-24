import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// Checks over the built site in out/. These catch what component tests cannot,
// such as what React emits when server and client components meet.
// Run `npm run build` first; the suite skips cleanly if out/ is absent.
const built = existsSync("out/index.html");

describe.skipIf(!built)("built home page", () => {
    const html = built ? readFileSync("out/index.html", "utf8") : "";

    it("renders each half's link with its arrow", () => {
        for (const label of ["See data work", "See yoga practice"]) {
            const end = html.indexOf("</a>", html.indexOf(label));
            const start = html.lastIndexOf("<a", html.indexOf(label));
            expect(html.slice(start, end), label).toContain("<svg");
        }
    });
});

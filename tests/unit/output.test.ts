import { site } from "@content";
import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// Checks over the built site in out/. These catch what component tests cannot,
// such as what React emits when server and client components meet.
// Run `npm run build` first; the suite skips cleanly if out/ is absent.
const built = existsSync("out/index.html");

describe.skipIf(!built)("built home page", () => {
    const html = built ? readFileSync("out/index.html", "utf8") : "";

    it("tells a search for her name who she is, in a few words", () => {
        // Google shows the title as the result's headline, cut off near 60
        // characters, and the description beneath, cut off near 155.
        const title = html.match(/<title>([^<]+)<\/title>/)?.[1] ?? "";
        const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1] ?? "";
        expect(title).toBe("Cindy Wanady: Data and Yoga");
        expect(description.startsWith("Data and yoga.")).toBe(true);
        expect(description.length).toBeLessThanOrEqual(155);
        expect(description).toContain("tech industry");
        expect(description).not.toContain("Mekari");
        expect(html).toContain('<meta property="og:title" content="Cindy Wanady: Data and Yoga"');
    });

    it("renders each half's link with its arrow", () => {
        for (const label of ["See data work", "See yoga practice"]) {
            const end = html.indexOf("</a>", html.indexOf(label));
            const start = html.lastIndexOf("<a", html.indexOf(label));
            expect(html.slice(start, end), label).toContain("<svg");
        }
    });
});

const ROUTES = ["/", "/data/", "/data/thesis/", "/yoga/", "/about/", "/contact/"];
const fileFor = (route: string) => `out${route}index.html`;

describe.skipIf(!built)("built site", () => {
    it("lists every route in the sitemap", () => {
        const xml = readFileSync("out/sitemap.xml", "utf8");
        for (const route of ROUTES) expect(xml).toContain(`<loc>https://cindywanady.github.io${route}</loc>`);
    });

    it("points crawlers at the sitemap", () => {
        expect(readFileSync("out/robots.txt", "utf8")).toContain("Sitemap: https://cindywanady.github.io/sitemap.xml");
    });

    it("publishes llms.txt built from the evidenced content", () => {
        const txt = readFileSync("out/llms.txt", "utf8");
        // Generated from content/, so it says only what the claims say and
        // follows every source change. A hand-written file drifted.
        for (const claim of [...site.identity.intro, site.data.column.trueLine, ...site.yoga.column.proof]) expect(txt).toContain(claim.text);
        expect(txt).not.toContain("four of them at Mekari");
        for (const route of ROUTES.slice(1)) expect(txt).toContain(`https://cindywanady.github.io${route}`);
        expect(txt).toMatch(/yoga/i);
        expect(txt).toMatch(/data/i);
    });

    it("carries a parseable Person block on every page", () => {
        for (const route of ROUTES) {
            const html = readFileSync(fileFor(route), "utf8");
            const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
            expect(
                blocks.filter((b) => b["@type"] === "Person"),
                route,
            ).toHaveLength(1);
        }
    });

    it("gives every page its own description and a social image", () => {
        const descriptions = ROUTES.map((route) => {
            const html = readFileSync(fileFor(route), "utf8");
            // GitHub Pages sets Content-Type from the extension, and social
            // crawlers skip an image not served as one.
            const image = html.match(/<meta property="og:image" content="https:\/\/cindywanady\.github\.io(\/[^"?]+\.png)"/)?.[1];
            expect(image, route).toBeDefined();
            expect(existsSync(`out${image}`), `${route} image file`).toBe(true);
            return html.match(/<meta name="description" content="([^"]+)"/)?.[1];
        });
        expect(new Set(descriptions).size).toBe(ROUTES.length);
    });

    it("has no internal link that leads nowhere", () => {
        const broken: string[] = [];
        for (const route of ROUTES) {
            const html = readFileSync(fileFor(route), "utf8");
            for (const [, href] of html.matchAll(/<a [^>]*href="(\/[^"#]*)"/g)) {
                const target = href.endsWith("/") ? `out${href}index.html` : `out${href}`;
                if (!existsSync(target)) broken.push(`${route} -> ${href}`);
            }
        }
        expect(broken).toEqual([]);
    });
});

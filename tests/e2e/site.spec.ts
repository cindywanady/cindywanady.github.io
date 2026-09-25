import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const ROUTES: [path: string, currentNav: string | null][] = [
    ["/", null],
    ["/data/", "Data"],
    ["/data/thesis/", "Data"],
    ["/yoga/", "Yoga"],
    ["/about/", "About"],
    ["/contact/", "Contact"],
];

for (const [path, currentNav] of ROUTES) {
    test.describe(path, () => {
        test("loads with one h1 and marks the right section", async ({ page }) => {
            const response = await page.goto(path);
            expect(response?.status()).toBe(200);
            await expect(page.locator("h1")).toHaveCount(1);
            const current = page.getByRole("navigation", { name: "Sections" }).locator('[aria-current="page"]');
            if (currentNav) await expect(current).toHaveText(currentNav);
            else await expect(current).toHaveCount(0);
        });

        test("has no serious or critical accessibility violations", async ({ page }) => {
            // Measure the settled page. Mid-draw, strip labels are partly
            // transparent and axe would score the animation frame it caught.
            await page.emulateMedia({ reducedMotion: "reduce" });
            await page.goto(path);
            const { violations } = await new AxeBuilder({ page }).analyze();
            const blocking = violations.filter((v) => v.impact === "serious" || v.impact === "critical");
            expect(blocking.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
        });

        for (const width of [192, 256, 320, 375, 390, 760]) {
            test(`never scrolls sideways at ${width}px`, async ({ page }) => {
                await page.setViewportSize({ width, height: 800 });
                await page.goto(path);
                const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
                expect(overflow).toBeLessThanOrEqual(0);
            });
        }
    });
}

test("the mobile portrait stays below the About introduction at narrow and zoom-equivalent widths", async ({ page }) => {
    for (const width of [192, 320, 390, 760]) {
        await page.setViewportSize({ width, height: 800 });
        await page.goto("/about/");
        const { copy, portrait } = await page.evaluate(() => {
            const copy = document.querySelector(".intro-copy")!.getBoundingClientRect();
            const portrait = document.querySelector(".intro-portrait")!.getBoundingClientRect();
            return { copy: { bottom: copy.bottom }, portrait: { top: portrait.top } };
        });
        expect(portrait.top).toBeGreaterThanOrEqual(copy.bottom);
    }
});

test("mobile navigation is reachable from either side and clears the footer", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/about/");
    const links = page.getByRole("navigation", { name: "Sections" }).getByRole("link");
    await expect(links).toHaveCount(4);
    const boxes = await links.evaluateAll((nodes) => nodes.map((node) => node.getBoundingClientRect().toJSON()));
    expect(boxes[0].x).toBeLessThan(80);
    expect(boxes[3].right).toBeGreaterThan(310);
    expect(boxes.every((box) => box.height >= 44)).toBe(true);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const { footer, nav } = await page.evaluate(() => ({
        footer: document.querySelector("footer")!.getBoundingClientRect().bottom,
        nav: document.querySelector(".site-nav")!.getBoundingClientRect().top,
    }));
    expect(footer).toBeLessThanOrEqual(nav);
});

test("the chakra stays centered after zooming in, out, and back", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/about/");
    const geometry = () =>
        page.evaluate(() => {
            const svg = document.querySelector(".chakra-field")!.getBoundingClientRect();
            const orbit = document.querySelector(".chakra-orbit")!.getBoundingClientRect();
            const portrait = document.querySelector(".intro-portrait")!.getBoundingClientRect();
            return { center: svg.x + svg.width / 2, orbitCenter: orbit.x + orbit.width / 2, portraitCenter: portrait.x + portrait.width / 2 };
        });
    const initial = await geometry();
    for (const zoom of ["150%", "200%", "75%", "100%"]) {
        await page.evaluate((value) => (document.documentElement.style.zoom = value), zoom);
        const current = await geometry();
        expect(Math.abs(current.orbitCenter - current.center)).toBeLessThan(1);
        expect(Math.abs(current.portraitCenter - current.center)).toBeLessThan(1);
    }
    const restored = await geometry();
    expect(Math.abs(restored.center - initial.center)).toBeLessThan(1);
});

test("the ambient background follows scrolling and respects a motion preference change", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/data/");
    const backgroundTransform = () => page.evaluate(() => getComputedStyle(document.body, "::before").transform);

    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight / 2));
    await expect.poll(backgroundTransform).not.toBe("none");
    await expect.poll(backgroundTransform).not.toMatch(/, 0\)$/);

    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect.poll(backgroundTransform).toBe("none");

    await page.emulateMedia({ reducedMotion: "no-preference" });
    await expect.poll(backgroundTransform).not.toBe("none");
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
});

test("keyboard: the first Tab reaches the skip link, with a visible focus ring", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus");
    await expect(focused).toHaveText("Skip to content");
    const outline = await focused.evaluate((el) => getComputedStyle(el).outlineStyle);
    expect(outline).not.toBe("none");
});

test.describe("a reader whose OS is set to dark", () => {
    test.use({ colorScheme: "dark" });
    test("still gets the light theme", async ({ page }) => {
        await page.goto("/");
        const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
        expect(bg).toBe("rgb(247, 241, 231)");
    });
});

test.describe("a reader who prefers reduced motion", () => {
    test.use({ reducedMotion: "reduce" });
    test("sees every strip step at once, with no animation", async ({ page }) => {
        await page.goto("/yoga/");
        const steps = page.locator(".strip-step");
        await expect(steps).toHaveCount(7);
        for (const step of await steps.all()) {
            expect(await step.evaluate((el) => getComputedStyle(el).opacity)).toBe("1");
            expect(await step.evaluate((el) => getComputedStyle(el).transitionDuration)).toBe("0s");
        }
    });

    test("sees a still chakra behind the portrait", async ({ page }) => {
        await page.goto("/");
        await expect(page.locator(".chakra-orbit")).toHaveCSS("animation-name", "none");
        await expect(page.getByRole("img", { name: "Cindy Wanady" })).toBeVisible();
    });
});

test("a reader who allows motion sees the strips draw in", async ({ page }) => {
    await page.goto("/yoga/");
    const strip = page.getByRole("figure", { name: "Opening flow of Sun Salutation A" });
    await strip.scrollIntoViewIfNeeded();
    await expect(strip).toHaveAttribute("data-state", "drawn");
    await expect(strip.locator(".strip-step").last()).toHaveCSS("opacity", "1");
});

test("an unknown path gets the not-found page with a 404", async ({ page }) => {
    const response = await page.goto("/nowhere/");
    expect(response?.status()).toBe(404);
    await expect(page.locator("h1")).toHaveText("This page does not exist.");
    await expect(page.getByRole("navigation", { name: "Pages that do exist" }).getByRole("link")).toHaveCount(4);
});

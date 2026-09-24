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

        for (const width of [320, 375]) {
            test(`never scrolls sideways at ${width}px`, async ({ page }) => {
                await page.setViewportSize({ width, height: 800 });
                await page.goto(path);
                const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
                expect(overflow).toBeLessThanOrEqual(0);
            });
        }
    });
}

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
        await page.goto("/");
        const steps = page.locator(".strip-step");
        await expect(steps).toHaveCount(12);
        for (const step of await steps.all()) {
            expect(await step.evaluate((el) => getComputedStyle(el).opacity)).toBe("1");
            expect(await step.evaluate((el) => getComputedStyle(el).transitionDuration)).toBe("0s");
        }
    });
});

test("a reader who allows motion sees the strips draw in", async ({ page }) => {
    await page.goto("/yoga/");
    const strip = page.getByRole("figure", { name: /Surya Namaskar A/ });
    await strip.scrollIntoViewIfNeeded();
    await expect(strip).toHaveAttribute("data-state", "drawn");
    await expect(strip.locator(".strip-step").last()).toHaveCSS("opacity", "1");
});

test("an unknown path gets the not-found page with a 404", async ({ page }) => {
    const response = await page.goto("/nowhere/");
    expect(response?.status()).toBe(404);
    await expect(page.locator("h1")).toHaveText("Page not found");
});

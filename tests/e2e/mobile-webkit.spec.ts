import { expect, test } from "@playwright/test";

const ROUTES = ["/", "/data/", "/data/thesis/", "/yoga/", "/about/", "/contact/"];

for (const route of ROUTES) {
    test(`${route} stays within a narrow iPhone viewport through zoom changes`, async ({ page }) => {
        await page.setViewportSize({ width: 320, height: 568 });
        await page.goto(route);

        for (const zoom of ["100%", "150%", "200%", "75%", "100%"]) {
            await page.evaluate((value) => (document.documentElement.style.zoom = value), zoom);
            expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
        }
    });
}

test("iPhone navigation stays tappable above the reading surface", async ({ page }) => {
    await page.goto("/");

    for (const [label, path] of [
        ["Data", "/data/"],
        ["Yoga", "/yoga/"],
        ["About", "/about/"],
        ["Contact", "/contact/"],
    ]) {
        await page.getByRole("navigation", { name: "Sections" }).getByRole("link", { name: label }).tap();
        await expect(page).toHaveURL(new RegExp(`${path}$`));
    }
});

test("the home images load when reached on an iPhone", async ({ page }) => {
    await page.goto("/");

    for (const image of await page.locator(".practice-image").all()) {
        await image.scrollIntoViewIfNeeded();
        await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
    }
});

import { defineConfig, devices } from "@playwright/test";

// Runs against the static export in out/, served the way GitHub Pages serves
// it. Build first: `npm run e2e` does both.
export default defineConfig({
    testDir: "tests/e2e",
    fullyParallel: true,
    reporter: process.env.CI ? "github" : "list",
    use: { baseURL: "http://localhost:4321" },
    projects: [
        { name: "chromium", testIgnore: /mobile-webkit\.spec\.ts/, use: { ...devices["Desktop Chrome"] } },
        { name: "webkit-mobile", testMatch: /mobile-webkit\.spec\.ts/, use: { ...devices["iPhone 13"] } },
    ],
    webServer: {
        command: "node scripts/serve-out.mjs",
        url: "http://localhost:4321",
        reuseExistingServer: !process.env.CI,
    },
});

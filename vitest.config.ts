import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
        environment: "jsdom",
        include: ["tests/unit/**/*.test.{ts,tsx}"],
        setupFiles: ["tests/unit/setup.ts"],
        // Rendering a whole page in jsdom took just under Vitest's 5s default
        // and failed once under load. A timeout in CI blocks the deploy.
        testTimeout: 15_000,
    },
});

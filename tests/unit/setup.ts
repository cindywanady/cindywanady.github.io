import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Testing Library unmounts after each test only when Vitest globals are on.
// They are off here, so unmount explicitly or renders pile up across tests.
afterEach(cleanup);

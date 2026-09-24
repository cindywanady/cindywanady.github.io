import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RevealRoot } from "@/components/site/reveal-root";

function stubMotion(reduced: boolean) {
    vi.stubGlobal("matchMedia", (query: string) => ({
        matches: reduced && query.includes("reduce"),
        media: query,
        addEventListener() {},
        removeEventListener() {},
    }));
}

let trigger: (el: Element) => void = () => {};
function stubObserver() {
    vi.stubGlobal(
        "IntersectionObserver",
        class {
            cb: IntersectionObserverCallback;
            constructor(cb: IntersectionObserverCallback) {
                this.cb = cb;
                trigger = (el) => cb([{ isIntersecting: true, target: el } as unknown as IntersectionObserverEntry], this as unknown as IntersectionObserver);
            }
            observe() {}
            unobserve() {}
            disconnect() {}
        },
    );
}

function Page() {
    return (
        <>
            <RevealRoot />
            <section data-reveal="" data-testid="below">
                Below the fold
            </section>
        </>
    );
}

afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
});

describe("RevealRoot", () => {
    it("holds a section below the fold, then shows it on arrival", () => {
        stubMotion(false);
        stubObserver();
        vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ top: 5000, bottom: 5400 } as DOMRect);
        render(<Page />);
        const el = screen.getByTestId("below");
        expect(el).toHaveAttribute("data-reveal", "waiting");
        act(() => trigger(el));
        expect(el).toHaveAttribute("data-reveal", "shown");
    });

    it("never hides a section already on screen at load", () => {
        stubMotion(false);
        stubObserver();
        vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ top: 100, bottom: 400 } as DOMRect);
        render(<Page />);
        expect(screen.getByTestId("below")).not.toHaveAttribute("data-reveal", "waiting");
    });

    it("never hides anything for a reader who prefers reduced motion", () => {
        stubMotion(true);
        stubObserver();
        vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ top: 5000, bottom: 5400 } as DOMRect);
        render(<Page />);
        expect(screen.getByTestId("below")).not.toHaveAttribute("data-reveal", "waiting");
    });

    it("never hides anything where the browser cannot observe scrolling", () => {
        stubMotion(false);
        vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ top: 5000, bottom: 5400 } as DOMRect);
        render(<Page />);
        expect(screen.getByTestId("below")).not.toHaveAttribute("data-reveal", "waiting");
    });
});

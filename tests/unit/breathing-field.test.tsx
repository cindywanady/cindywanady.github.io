import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BreathingField } from "@/components/site/breathing-field";

function stubMotion(reduced: boolean) {
    vi.stubGlobal("matchMedia", (query: string) => ({
        matches: reduced && query.includes("reduce"),
        media: query,
        addEventListener() {},
        removeEventListener() {},
    }));
}

afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
});

describe("BreathingField", () => {
    it("is decoration: hidden from assistive technology", () => {
        stubMotion(false);
        const { container } = render(<BreathingField tone="both" />);
        const canvas = container.querySelector("canvas")!;
        expect(canvas).toHaveAttribute("aria-hidden", "true");
    });

    it("does nothing, and does not throw, where canvas drawing is unavailable", () => {
        // jsdom returns null from getContext, as some privacy modes do.
        stubMotion(false);
        const raf = vi.spyOn(window, "requestAnimationFrame");
        expect(() => render(<BreathingField tone="data" />)).not.toThrow();
        expect(raf).not.toHaveBeenCalled();
    });

    it("draws once and never animates for a reader who prefers reduced motion", () => {
        stubMotion(true);
        const ctx = {
            clearRect: vi.fn(),
            beginPath: vi.fn(),
            arc: vi.fn(),
            fill: vi.fn(),
            setTransform: vi.fn(),
            set fillStyle(_: string) {},
            set globalAlpha(_: number) {},
        };
        vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(ctx as unknown as CanvasRenderingContext2D);
        const raf = vi.spyOn(window, "requestAnimationFrame");
        render(<BreathingField tone="yoga" />);
        expect(ctx.arc).toHaveBeenCalled();
        expect(raf).not.toHaveBeenCalled();
    });

    it("redraws after a resize even when no loop is running", () => {
        // Resizing a canvas clears it. With no animation loop to paint the
        // next frame, the field would stay blank.
        stubMotion(true);
        const ctx = {
            clearRect: vi.fn(),
            beginPath: vi.fn(),
            arc: vi.fn(),
            fill: vi.fn(),
            setTransform: vi.fn(),
            set fillStyle(_: string) {},
            set globalAlpha(_: number) {},
        };
        vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(ctx as unknown as CanvasRenderingContext2D);
        render(<BreathingField tone="data" />);
        ctx.arc.mockClear();
        window.dispatchEvent(new Event("resize"));
        expect(ctx.arc).toHaveBeenCalled();
    });

    it("animates for a reader who allows motion", () => {
        stubMotion(false);
        const ctx = {
            clearRect: vi.fn(),
            beginPath: vi.fn(),
            arc: vi.fn(),
            fill: vi.fn(),
            setTransform: vi.fn(),
            set fillStyle(_: string) {},
            set globalAlpha(_: number) {},
        };
        vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(ctx as unknown as CanvasRenderingContext2D);
        const raf = vi.spyOn(window, "requestAnimationFrame").mockReturnValue(1);
        render(<BreathingField tone="both" />);
        expect(raf).toHaveBeenCalled();
    });
});

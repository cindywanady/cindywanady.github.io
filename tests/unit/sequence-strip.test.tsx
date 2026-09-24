import { act, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SequenceStrip } from "@/components/site/sequence-strip";

const steps = [{ label: "Field mapping" }, { label: "Validation rules" }, { label: "Cutover", detail: "go-live" }];

function stubMotion(reduced: boolean) {
    vi.stubGlobal("matchMedia", (query: string) => ({ matches: reduced && query.includes("reduce"), media: query, addEventListener() {}, removeEventListener() {} }));
}

let trigger: (visible: boolean) => void = () => {};
function stubObserver() {
    vi.stubGlobal(
        "IntersectionObserver",
        class {
            constructor(cb: IntersectionObserverCallback) {
                trigger = (visible) => cb([{ isIntersecting: visible } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
            }
            observe() {}
            disconnect() {}
            unobserve() {}
        },
    );
}

afterEach(() => vi.unstubAllGlobals());

describe("SequenceStrip", () => {
    it("renders the steps as an ordered list, in data order", () => {
        render(<SequenceStrip title="How I run a CRM migration" steps={steps} tone="data" />);
        const figure = screen.getByRole("figure", { name: "How I run a CRM migration" });
        const items = within(figure).getAllByRole("listitem");
        expect(within(figure).getByRole("list").tagName).toBe("OL");
        expect(items.map((li) => li.querySelector("[data-part=label]")?.textContent)).toEqual(["Field mapping", "Validation rules", "Cutover"]);
        expect(items[2]).toHaveTextContent("go-live");
    });

    it("carries its half's tone", () => {
        render(<SequenceStrip title="t" steps={steps} tone="yoga" />);
        expect(screen.getByRole("figure")).toHaveAttribute("data-tone", "yoga");
    });

    it("shows every step when the browser cannot observe scrolling", () => {
        stubMotion(false);
        render(<SequenceStrip title="t" steps={steps} tone="data" />);
        expect(screen.getByRole("figure")).not.toHaveAttribute("data-state", "waiting");
    });

    it("waits off-screen, then draws once scrolled into view", () => {
        stubMotion(false);
        stubObserver();
        render(<SequenceStrip title="t" steps={steps} tone="data" />);
        const figure = screen.getByRole("figure");
        expect(figure).toHaveAttribute("data-state", "waiting");
        act(() => trigger(true));
        expect(figure).toHaveAttribute("data-state", "drawn");
    });

    it("never hides steps for a reader who prefers reduced motion", () => {
        stubMotion(true);
        stubObserver();
        render(<SequenceStrip title="t" steps={steps} tone="data" />);
        expect(screen.getByRole("figure")).not.toHaveAttribute("data-state", "waiting");
    });
});

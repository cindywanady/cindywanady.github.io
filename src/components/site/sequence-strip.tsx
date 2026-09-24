"use client";

import { type CSSProperties, useEffect, useId, useRef, useState } from "react";

export type StripStep = { label: string; detail?: string };

type Props = {
    title: string;
    steps: StripStep[];
    /** Which half the strip belongs to. Sets the rule and marker color. */
    tone: "data" | "yoga";
};

/**
 * The site's signature: an ordered sequence drawn as numbered steps joined by
 * a rule. Used once per half, for a real sequence only.
 *
 * Server-rendered complete, so every step is readable without JavaScript. In
 * a browser that can observe scrolling, and for a reader who has not asked for
 * reduced motion, a strip that starts below the fold waits there and draws in
 * order on arrival. One already on screen at load is left as it is.
 */
export function SequenceStrip({ title, steps, tone }: Props) {
    const ref = useRef<HTMLElement>(null);
    const titleId = useId();
    const [state, setState] = useState<"static" | "waiting" | "drawn">("static");

    useEffect(() => {
        const node = ref.current;
        const reduced = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!node || reduced || typeof IntersectionObserver === "undefined") return;

        // Already on screen when the page loads: leave it as rendered. Hiding it
        // now would make visible content blink out and redraw.
        const { top, bottom } = node.getBoundingClientRect();
        if (top < window.innerHeight && bottom > 0) return;

        setState("waiting");
        // Draw once the strip's top has risen a fifth of the way up the screen,
        // so the reader sees it happen. A margin works at any strip height; a
        // visibility ratio would never be reached by a tall strip on a short
        // screen, which would then stay hidden.
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    setState("drawn");
                    observer.disconnect();
                }
            },
            { rootMargin: "0px 0px -20% 0px" },
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <figure
            ref={ref}
            className="strip"
            aria-labelledby={titleId}
            data-tone={tone}
            data-state={state === "static" ? undefined : state}
            style={{ "--steps": steps.length } as CSSProperties}
        >
            <figcaption id={titleId} className="strip-title">
                {title}
            </figcaption>
            <ol className="strip-steps">
                {steps.map((step, i) => (
                    <li key={step.label} className="strip-step" style={{ "--i": i } as CSSProperties}>
                        <span data-part="label" className="strip-label">
                            {step.label}
                        </span>
                        {step.detail && (
                            <span data-part="detail" className="strip-detail" lang={tone === "yoga" ? "sa-Latn" : undefined}>
                                {step.detail}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </figure>
    );
}

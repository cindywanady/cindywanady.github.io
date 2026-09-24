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
 * reduced motion, the steps wait off-screen and draw in order on arrival.
 */
export function SequenceStrip({ title, steps, tone }: Props) {
    const ref = useRef<HTMLElement>(null);
    const titleId = useId();
    const [state, setState] = useState<"static" | "waiting" | "drawn">("static");

    useEffect(() => {
        const node = ref.current;
        const reduced = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!node || reduced || typeof IntersectionObserver === "undefined") return;

        setState("waiting");
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    setState("drawn");
                    observer.disconnect();
                }
            },
            { threshold: 0.4 },
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

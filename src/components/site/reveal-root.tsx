"use client";

import { useEffect } from "react";

/**
 * Makes every element marked `data-reveal` rise in as it scrolls into view.
 * Rendered once, in the layout.
 *
 * Only an element that starts below the fold is ever held back; one already
 * on screen at load is left alone, so nothing visible blinks out when the page
 * hydrates. Nothing is held back without a scrolling observer or for a reader
 * who prefers reduced motion. The styles are in src/styles/globals.css.
 */
export function RevealRoot() {
    useEffect(() => {
        const reduced = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced || typeof IntersectionObserver === "undefined") return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    entry.target.setAttribute("data-reveal", "shown");
                    observer.unobserve(entry.target);
                }
            },
            { rootMargin: "0px 0px -10% 0px" },
        );

        for (const el of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
            const { top, bottom } = el.getBoundingClientRect();
            if (top < window.innerHeight && bottom > 0) continue;
            el.setAttribute("data-reveal", "waiting");
            observer.observe(el);
        }
        return () => observer.disconnect();
    }, []);

    return null;
}

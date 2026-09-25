"use client";

import { useEffect } from "react";
import type { BasicScroll } from "basicscroll";

/** Moves the decorative background a little as the reader moves down a page. */
export function AmbientScroll() {
    useEffect(() => {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        let instance: BasicScroll | undefined;
        let disposed = false;

        const start = async () => {
            if (instance || reducedMotion.matches) return;
            const basicScroll = await import("basicscroll");
            if (disposed || instance || reducedMotion.matches) return;

            instance = basicScroll.create({
                elem: document.body,
                from: "top-top",
                to: "bottom-bottom",
                direct: document.body,
                props: {
                    "--ambient-scroll": { from: "0px", to: "-24px", timing: "linear" },
                },
            });
            instance.start();
        };

        const sync = () => {
            if (reducedMotion.matches) {
                instance?.destroy();
                instance = undefined;
                document.body.style.removeProperty("--ambient-scroll");
            } else {
                void start();
            }
        };

        reducedMotion.addEventListener("change", sync);
        sync();

        return () => {
            disposed = true;
            reducedMotion.removeEventListener("change", sync);
            instance?.destroy();
            document.body.style.removeProperty("--ambient-scroll");
        };
    }, []);

    return null;
}

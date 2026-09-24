"use client";

import { useEffect, useRef } from "react";
import { brand, neutral, palette } from "@/design/palette";

type Tone = "data" | "yoga" | "both";

const COLORS: Record<Tone, string[]> = {
    data: [palette.terracotta, brand[700], palette.terracotta],
    yoga: [palette.olive, neutral[400], palette.olive],
    both: [palette.terracotta, palette.olive, brand[700]],
};

/** One breath: inhale and exhale over six seconds, a slow resting pace. */
const BREATH_MS = 6000;
const BREATH_DEPTH = 0.07;

type Point = { x: number; y: number; z: number; color: string };

/** Points spread evenly over a sphere (a Fibonacci lattice), with a little jitter. */
function sphere(count: number, colors: string[]): Point[] {
    const golden = Math.PI * (3 - Math.sqrt(5));
    return Array.from({ length: count }, (_, i) => {
        const y = 1 - (i / (count - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = golden * i;
        const jitter = 1 + (((i * 0.618034) % 1) - 0.5) * 0.18;
        return { x: Math.cos(theta) * r * jitter, y: y * jitter, z: Math.sin(theta) * r * jitter, color: colors[i % colors.length] };
    });
}

/**
 * The ambient background behind each page's opening: a field of data points
 * that turns slowly and breathes, swelling and settling on a six-second
 * cycle. Decoration only, so it is hidden from assistive technology.
 *
 * Draws a single still frame for a reader who prefers reduced motion, and
 * pauses whenever the tab is hidden or the field is off screen.
 */
export function BreathingField({ tone }: { tone: Tone }) {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        const reduced = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
        const small = typeof matchMedia === "function" && matchMedia("(max-width: 40rem)").matches;
        const points = sphere(small ? 260 : 560, COLORS[tone]);

        let width = 0;
        let height = 0;
        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = canvas.clientWidth || 600;
            height = canvas.clientHeight || 600;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        let lastT = 0;
        const draw = (t: number) => {
            lastT = t;
            const breath = 1 + BREATH_DEPTH * Math.sin((2 * Math.PI * t) / BREATH_MS);
            const angle = t * 0.00005;
            const [cos, sin] = [Math.cos(angle), Math.sin(angle)];
            const radius = Math.min(width, height) * 0.38 * breath;
            ctx.clearRect(0, 0, width, height);
            for (const p of points) {
                const x = p.x * cos - p.z * sin;
                const z = p.x * sin + p.z * cos;
                const depth = (z + 1.6) / 2.6;
                ctx.globalAlpha = 0.25 + depth * 0.55;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(width / 2 + x * radius, height / 2 + p.y * radius, 0.8 + depth * 1.4, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        // Resizing a canvas clears it, so repaint the last frame straight away
        // rather than waiting for a loop that may be paused or never started.
        const onResize = () => {
            resize();
            draw(lastT);
        };
        onResize();
        window.addEventListener("resize", onResize);
        if (reduced) return () => window.removeEventListener("resize", onResize);

        let frame = 0;
        let visible = true;
        const loop = (t: number) => {
            draw(t);
            frame = requestAnimationFrame(loop);
        };
        const start = () => {
            if (!frame && visible && !document.hidden) frame = requestAnimationFrame(loop);
        };
        const stop = () => {
            cancelAnimationFrame(frame);
            frame = 0;
        };
        const onVisibility = () => (document.hidden ? stop() : start());

        const observer =
            typeof IntersectionObserver === "undefined"
                ? null
                : new IntersectionObserver(([entry]) => {
                      visible = entry.isIntersecting;
                      if (visible) start();
                      else stop();
                  });
        observer?.observe(canvas);
        document.addEventListener("visibilitychange", onVisibility);
        start();

        return () => {
            stop();
            observer?.disconnect();
            window.removeEventListener("resize", onResize);
            document.removeEventListener("visibilitychange", onVisibility);
        };
    }, [tone]);

    return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}

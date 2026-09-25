import type { ReactNode } from "react";

/**
 * A page section with a heading, an optional one-line lede, and its content.
 */
export function Section({ title, lede, children }: { title: string; lede?: string; children: ReactNode }) {
    return (
        <section className="flex flex-col gap-10 border-t border-secondary pt-12 pb-20">
            <header className="grid gap-3 md:grid-cols-[1fr_1fr] md:items-end md:gap-12">
                <h2 className="font-display text-4xl font-medium tracking-tight text-primary md:text-5xl">{title}</h2>
                {lede && <p className="max-w-[32rem] leading-relaxed text-tertiary md:justify-self-end md:text-right">{lede}</p>}
            </header>
            {children}
        </section>
    );
}

import type { ReactNode } from "react";

/**
 * A page section: the heading on the left, an optional one-line lede on the
 * right, then the content. It rises in on scroll (see RevealRoot).
 */
export function Section({ title, lede, children }: { title: string; lede?: string; children: ReactNode }) {
    return (
        <section data-reveal="" className="flex flex-col gap-10 border-t border-secondary pt-12 pb-20">
            <header className="grid gap-3 md:grid-cols-[1fr_1fr] md:items-end md:gap-12">
                <h2 className="font-display text-3xl font-semibold tracking-tight text-primary md:text-4xl">{title}</h2>
                {lede && <p className="max-w-[32rem] leading-relaxed text-tertiary md:justify-self-end md:text-right">{lede}</p>}
            </header>
            {children}
        </section>
    );
}

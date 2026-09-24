import type { ReactNode } from "react";

/** A page's h1 and its opening lines. Every page starts with one. */
export function PageIntro({ title, children }: { title: string; children?: ReactNode }) {
    return (
        <div className="flex flex-col gap-5 pt-10 pb-14 md:pt-16 md:pb-20">
            <h1 className="max-w-[18ch] font-display text-5xl leading-[1.02] font-semibold tracking-[-0.025em] text-primary md:text-7xl">{title}</h1>
            {children && <div className="max-w-[40rem] text-xl leading-relaxed text-secondary md:text-2xl">{children}</div>}
        </div>
    );
}

import type { ReactNode } from "react";
import { BreathingField } from "./breathing-field";

/**
 * A page's opening: the h1, its lede, and the breathing field behind them on
 * the right. The field takes the page's half: terracotta for data, olive for
 * yoga, both for pages that belong to neither.
 */
export function PageIntro({ title, field = "both", children }: { title: ReactNode; field?: "data" | "yoga" | "both"; children?: ReactNode }) {
    return (
        <div className="relative isolate pt-12 pb-16 md:pt-20 md:pb-24">
            <div className="absolute top-0 right-0 -z-10 size-64 opacity-40 md:top-2 md:size-[30rem] md:opacity-80">
                <BreathingField tone={field} />
            </div>
            <h1 className="max-w-[16ch] font-display text-5xl leading-[1] font-semibold tracking-[-0.03em] text-primary md:text-7xl lg:text-[5.5rem]">
                {title}
            </h1>
            {children && <div className="mt-7 max-w-[38rem] text-xl leading-relaxed text-secondary md:text-2xl">{children}</div>}
        </div>
    );
}

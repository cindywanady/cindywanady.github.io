import { useId } from "react";
import type { Column } from "@content/schema";
import { ArrowRight } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { SequenceStrip } from "./sequence-strip";

/**
 * One practice on the home page. Data and yoga render through this same
 * component so the two halves cannot drift apart in shape.
 *
 * The link is a plain server-rendered anchor on purpose. Routed through
 * Untitled UI's client Button, the second of two identical arrow icons came
 * out of the static build missing: React stores a repeated element once and
 * refers to it after that, and the Button's element check does not recognize
 * the reference. tests/unit/output.test.ts checks the built HTML for it.
 */
export function HalfColumn({ column, tone }: { column: Column; tone: "data" | "yoga" }) {
    const headingId = useId();
    return (
        <section
            data-reveal=""
            aria-labelledby={headingId}
            className={cx(
                "flex flex-col gap-7 rounded-3xl bg-neutral-100 p-7 pt-9 transition duration-300 ease-out md:p-10 md:pt-12",
                "hover:-translate-y-1 hover:shadow-[0_28px_56px_-28px_rgba(74,52,40,0.45)] motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                tone === "data" ? "shadow-[inset_0_6px_0_var(--color-data)]" : "shadow-[inset_0_6px_0_var(--color-yoga)]",
            )}
        >
            <h2 id={headingId} className="font-display text-3xl font-semibold tracking-tight text-primary md:text-4xl">
                {column.heading}
            </h2>
            <p className="max-w-[30ch] text-xl leading-snug text-primary">{column.trueLine.text}</p>
            <SequenceStrip title={column.strip.title} steps={column.strip.steps} tone={tone} />
            <ul className={cx("flex list-disc flex-col gap-2.5 pl-5 text-secondary", tone === "data" ? "marker:text-data" : "marker:text-yoga")}>
                {column.proof.map((claim) => (
                    <li key={claim.text} className="pl-1 leading-relaxed">
                        {claim.text}
                    </li>
                ))}
            </ul>
            <a
                href={column.href}
                className="group mt-auto inline-flex items-center gap-2 self-start rounded-full bg-brand-700 px-5 py-3 font-display text-base font-semibold text-white transition-colors hover:bg-brand-800"
            >
                {column.cta}
                <ArrowRight aria-hidden="true" className="size-5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </a>
        </section>
    );
}

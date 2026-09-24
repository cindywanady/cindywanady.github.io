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
        <section aria-labelledby={headingId} className={cx("flex flex-col gap-7 border-t-4 pt-7", tone === "data" ? "border-data" : "border-yoga")}>
            <h2 id={headingId} className="font-display text-3xl font-semibold tracking-tight text-primary">
                {column.heading}
            </h2>
            <p className="max-w-[34ch] text-xl leading-snug text-primary">{column.trueLine.text}</p>
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
                className="group inline-flex items-center gap-1.5 self-start font-display text-base font-semibold text-brand-secondary underline decoration-transparent underline-offset-4 transition-colors hover:text-brand-700 hover:decoration-current"
            >
                {column.cta}
                <ArrowRight aria-hidden="true" className="size-5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </a>
        </section>
    );
}

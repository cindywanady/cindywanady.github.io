import type { Column } from "@content/schema";
import { ArrowRight } from "@untitledui/icons";
import { useId } from "react";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";
import { SequenceStrip } from "./sequence-strip";

/**
 * One practice on the home page. Data and yoga render through this same
 * component so the two halves cannot drift apart in shape.
 *
 * Button is a client component, so its icon goes in as a rendered element: a
 * component passed as a prop cannot cross the server-to-client boundary.
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
            <Button href={column.href} color="link-color" size="lg" iconTrailing={<ArrowRight data-icon aria-hidden="true" />} className="self-start">
                {column.cta}
            </Button>
        </section>
    );
}

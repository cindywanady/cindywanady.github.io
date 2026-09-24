import { useId } from "react";
import type { Column } from "@content/schema";
import { ArrowRight } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { PracticeMark } from "./practice-mark";

/**
 * One practice on the home page. The two sections share a structure and
 * leave their longer sequences for their own pages.
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
        <section aria-labelledby={headingId} className={cx("practice-panel", tone === "data" ? "practice-panel-data" : "practice-panel-yoga")}>
            <h2 id={headingId} className="practice-heading">
                <PracticeMark tone={tone} />
                {column.heading}
            </h2>
            <p className="practice-line">{column.trueLine.text}</p>
            <ul className="practice-proof">
                {column.proof.map((claim) => (
                    <li key={claim.text}>{claim.text}</li>
                ))}
            </ul>
            <a href={column.href} className="practice-link group">
                {column.cta}
                <ArrowRight aria-hidden="true" className="size-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
            </a>
        </section>
    );
}

import { site } from "@content";
import type { Metadata } from "next";
import { Badge } from "@/components/base/badges/badges";
import { PageIntro } from "@/components/site/page-intro";

const page = site.pages.thesis;

export const metadata: Metadata = { title: page.title, description: page.description };

export default function ThesisPage() {
    const thesis = site.projects.thesis;
    return (
        <article>
            <PageIntro title={thesis.title} field="data" artwork="/thesis-research.webp">
                <p className="font-display text-base text-tertiary md:text-lg">
                    {thesis.context}, {thesis.year}
                </p>
            </PageIntro>
            <div className="flex max-w-[40rem] flex-col gap-6 pt-8 text-lg leading-relaxed text-primary">
                {thesis.claims.map((claim) => (
                    <p key={claim.text}>{claim.text}</p>
                ))}
                <p className="font-display text-base text-secondary">
                    {page.text.supervisedBy}{" "}
                    <a href={thesis.supervisor.url} className="font-semibold text-brand-secondary underline underline-offset-4 hover:text-brand-700">
                        {thesis.supervisor.label}
                    </a>
                </p>
                <ul aria-label="Tools" className="flex flex-wrap gap-1.5">
                    {thesis.tools.map((tool) => (
                        <li key={tool}>
                            <Badge type="color" size="sm" color="gray">
                                {tool}
                            </Badge>
                        </li>
                    ))}
                </ul>
                <a
                    href="/data/"
                    className="self-start font-display text-sm font-semibold text-brand-secondary underline underline-offset-4 hover:text-brand-700"
                >
                    {page.text.back}
                </a>
            </div>
        </article>
    );
}

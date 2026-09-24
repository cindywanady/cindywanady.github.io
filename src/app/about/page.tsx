import { site } from "@content";
import type { Metadata } from "next";
import { PageIntro } from "@/components/site/page-intro";
import { Section } from "@/components/site/section";

const page = site.pages.about;

export const metadata: Metadata = { title: page.title, description: page.description };

export default function AboutPage() {
    return (
        <>
            <PageIntro title={page.title} portrait>
                <p>{site.identity.intro.map((c) => c.text).join(" ")}</p>
            </PageIntro>

            <Section title={page.text.education} lede={page.ledes.education}>
                {site.education.map((e) => (
                    <article key={e.award} className="grid gap-2 md:grid-cols-[11rem_1fr] md:gap-10">
                        <p className="font-display text-sm text-tertiary tabular-nums md:pt-1">{e.dates}</p>
                        <div className="flex flex-col gap-2">
                            <h3 className="font-display text-xl font-semibold text-primary">{e.award}</h3>
                            <p className="font-display text-sm text-secondary">{e.institution}</p>
                            {e.claims.length > 0 && (
                                <ul className="flex flex-col gap-1.5 text-secondary">
                                    {e.claims.map((c) => (
                                        <li key={c.text}>{c.text}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </article>
                ))}
            </Section>

            <Section title={page.text.languages}>
                <dl className="flex flex-col gap-3">
                    {site.identity.languages.map((l) => (
                        <div key={l.name} className="grid gap-1 md:grid-cols-[11rem_1fr] md:gap-10">
                            <dt className="font-display text-sm font-semibold text-primary">{l.name}</dt>
                            <dd className="text-secondary">{l.level}</dd>
                        </div>
                    ))}
                </dl>
            </Section>
        </>
    );
}

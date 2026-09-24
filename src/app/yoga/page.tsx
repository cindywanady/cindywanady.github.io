import { site } from "@content";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageIntro } from "@/components/site/page-intro";
import { SequenceStrip } from "@/components/site/sequence-strip";

const page = site.pages.yoga;

export const metadata: Metadata = { title: page.title, description: page.description };

function Section({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section className="flex flex-col gap-8 border-t border-secondary pt-10 pb-16">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-primary">{title}</h2>
            {children}
        </section>
    );
}

export default function YogaPage() {
    const { yoga, identity } = site;
    const instagram = identity.profiles.find((p) => p.label === "Instagram")!;
    return (
        <>
            <PageIntro title={page.title}>
                <p>{yoga.column.trueLine.text}</p>
            </PageIntro>

            <Section title={page.text.training}>
                <ul className="flex flex-col gap-5">
                    {yoga.trainings.map((t) => (
                        <li key={t.hours} className="grid gap-1 md:grid-cols-[11rem_1fr] md:gap-10">
                            <span className="font-display text-sm text-tertiary">{t.status === "completed" ? page.text.completed : page.text.inProgress}</span>
                            <span className="text-lg text-primary">
                                {t.hours}-hour {t.name.toLowerCase()}
                                {t.school && (
                                    <>
                                        {", "}
                                        <a href={t.school.url} className="text-brand-secondary underline underline-offset-4 hover:text-brand-700">
                                            {t.school.label}
                                        </a>
                                    </>
                                )}
                            </span>
                        </li>
                    ))}
                </ul>
                <p className="font-display text-sm text-secondary">
                    {page.text.styles}: {yoga.styles.join(" and ")}
                </p>
            </Section>

            <Section title={page.text.sequence}>
                <SequenceStrip title={yoga.column.strip.title} steps={yoga.column.strip.steps} tone="yoga" />
            </Section>

            <Section title={page.text.words}>
                <blockquote className="max-w-[36rem] border-t-4 border-yoga pt-6 text-2xl leading-snug text-primary md:text-3xl">
                    <p>{yoga.reflection.text}</p>
                </blockquote>
                <a href={instagram.url} rel="me noreferrer" className="self-start font-display text-sm font-semibold text-brand-secondary underline underline-offset-4 hover:text-brand-700">
                    {page.text.instagram}
                </a>
            </Section>
        </>
    );
}

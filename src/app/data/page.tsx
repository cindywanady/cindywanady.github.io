import type { ReactNode } from "react";
import { site } from "@content";
import type { Metadata } from "next";
import { PageIntro } from "@/components/site/page-intro";
import { ProjectEntry } from "@/components/site/project-entry";
import { RoleEntry } from "@/components/site/role-entry";
import { SequenceStrip } from "@/components/site/sequence-strip";

const page = site.pages.data;

export const metadata: Metadata = { title: page.title, description: page.description };

function Section({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section className="flex flex-col gap-10 border-t border-secondary pt-10 pb-16">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-primary">{title}</h2>
            {children}
        </section>
    );
}

export default function DataPage() {
    const { data, projects } = site;
    return (
        <>
            <PageIntro title={page.title}>
                <p>{data.column.trueLine.text}</p>
            </PageIntro>

            <Section title={page.text.current}>
                <RoleEntry role={data.current}>
                    <SequenceStrip title={data.column.strip.title} steps={data.column.strip.steps} tone="data" />
                </RoleEntry>
            </Section>

            <Section title={page.text.thesis}>
                <ProjectEntry project={projects.thesis} featured>
                    <a
                        href="/data/thesis/"
                        className="self-start font-display text-sm font-semibold text-brand-secondary underline underline-offset-4 hover:text-brand-700"
                    >
                        {page.text.thesisLink}
                    </a>
                </ProjectEntry>
            </Section>

            <Section title={page.text.course}>
                <div className="grid gap-12 md:grid-cols-2">
                    {projects.course.map((project) => (
                        <ProjectEntry key={project.title} project={project} />
                    ))}
                </div>
            </Section>

            <Section title={page.text.earlier}>
                {data.earlier.map((role) => (
                    <RoleEntry key={role.organization} role={role} />
                ))}
                <h3 className="font-display text-lg font-semibold text-secondary">{page.text.formative}</h3>
                {data.formative.map((role) => (
                    <RoleEntry key={role.title} role={role} />
                ))}
            </Section>

            <Section title={page.text.skills}>
                <dl className="grid gap-6 md:grid-cols-2">
                    {data.skills.map((s) => (
                        <div key={s.group} className="flex flex-col gap-1.5">
                            <dt className="font-display text-sm font-semibold text-primary">{s.group}</dt>
                            <dd className="leading-relaxed text-secondary">{s.items}</dd>
                        </div>
                    ))}
                </dl>
            </Section>
        </>
    );
}

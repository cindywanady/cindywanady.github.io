import { site } from "@content";
import type { Metadata } from "next";
import { PageIntro } from "@/components/site/page-intro";
import { ProjectEntry } from "@/components/site/project-entry";
import { RoleEntry } from "@/components/site/role-entry";
import { Section } from "@/components/site/section";
import { SequenceStrip } from "@/components/site/sequence-strip";
import { SkillMark } from "@/components/site/skill-mark";

const page = site.pages.data;

export const metadata: Metadata = { title: page.title, description: page.description };

export default function DataPage() {
    const { data, projects } = site;
    return (
        <>
            <PageIntro title={page.title} field="data">
                <p>{data.column.trueLine.text}</p>
            </PageIntro>

            <Section title={page.text.current} lede={page.ledes.current}>
                <RoleEntry role={data.current}>
                    <SequenceStrip title={data.column.strip.title} steps={data.column.strip.steps} tone="data" />
                </RoleEntry>
            </Section>

            <Section title={page.text.thesis} lede={page.ledes.thesis}>
                <ProjectEntry project={projects.thesis} featured>
                    <a
                        href="/data/thesis/"
                        className="self-start font-display text-sm font-semibold text-brand-secondary underline underline-offset-4 hover:text-brand-700"
                    >
                        {page.text.thesisLink}
                    </a>
                </ProjectEntry>
            </Section>

            <Section title={page.text.course} lede={page.ledes.course}>
                <div className="grid gap-12 md:grid-cols-2">
                    {projects.course.map((project) => (
                        <ProjectEntry key={project.title} project={project} />
                    ))}
                </div>
            </Section>

            <Section title={page.text.earlier} lede={page.ledes.earlier}>
                {data.earlier.map((role) => (
                    <RoleEntry key={role.organization} role={role} />
                ))}
                <h3 className="font-display text-lg font-semibold text-secondary">{page.text.formative}</h3>
                {data.formative.map((role) => (
                    <RoleEntry key={role.title} role={role} />
                ))}
            </Section>

            <Section title={page.text.skills} lede={page.ledes.skills}>
                <dl className="grid gap-6 md:grid-cols-2">
                    {data.skills.map((s) => (
                        <div key={s.group} className="flex flex-col gap-1.5">
                            <dt className="flex items-center gap-3 font-display text-sm font-semibold text-primary">
                                <SkillMark group={s.group} />
                                {s.group}
                            </dt>
                            <dd className="leading-relaxed text-secondary">{s.items}</dd>
                        </div>
                    ))}
                </dl>
            </Section>
        </>
    );
}

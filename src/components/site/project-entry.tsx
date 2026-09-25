import type { ReactNode } from "react";
import type { Project } from "@content/schema";
import { Badge } from "@/components/base/badges/badges";
import { cx } from "@/utils/cx";

/**
 * One project. `featured` gives it the mustard mark; the spec allows one
 * featured item per page, and the /data/ page test holds it to that.
 */
export function ProjectEntry({ project, featured = false, children }: { project: Project; featured?: boolean; children?: ReactNode }) {
    return (
        <article
            data-featured={featured ? "" : undefined}
            className={cx(
                "project-entry flex flex-col gap-3 rounded-sm bg-neutral-100 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(74,52,40,0.45)] motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                featured ? "p-8 md:p-10" : "p-6",
            )}
        >
            {(featured || project.image) && (
                <img
                    src={featured ? "/thesis-research.webp" : project.image}
                    alt=""
                    width={featured ? 1536 : 1200}
                    height={featured ? 1024 : 800}
                    loading="lazy"
                    decoding="async"
                    className={featured ? "featured-project-image" : "project-image"}
                />
            )}
            <h3 className={cx("font-display font-semibold text-primary", featured ? "text-2xl" : "text-lg")}>{project.title}</h3>
            {featured && (
                <p className="font-display text-sm text-tertiary">
                    {project.context}, {project.year}
                </p>
            )}
            <ul aria-label="Tools" className="flex flex-wrap gap-1.5">
                {project.tools.map((tool) => (
                    <li key={tool}>
                        <Badge type="color" size="sm" color="gray">
                            {tool}
                        </Badge>
                    </li>
                ))}
            </ul>
            <ul className="flex list-disc flex-col gap-2 pl-5 text-secondary marker:text-data">
                {project.claims.map((claim) => (
                    <li key={claim.text} className="pl-1 leading-relaxed">
                        {claim.text}
                    </li>
                ))}
            </ul>
            {project.link && (
                <a
                    href={project.link.url}
                    className="self-start font-display text-sm font-semibold text-brand-secondary underline underline-offset-4 hover:text-brand-700"
                >
                    {project.link.label}
                </a>
            )}
            {children}
        </article>
    );
}

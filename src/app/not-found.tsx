import { site } from "@content";
import { ArrowRight } from "@untitledui/icons";
import type { Metadata } from "next";
import { PageIntro } from "@/components/site/page-intro";
import { cx } from "@/utils/cx";

const page = site.pages.notFound;

export const metadata: Metadata = { title: page.title, description: page.description };

/** Each section's own description, keyed by its nav href. */
const DESCRIPTIONS: Record<string, string> = {
    "/data/": site.pages.data.description,
    "/yoga/": site.pages.yoga.description,
    "/about/": site.pages.about.description,
    "/contact/": site.pages.contact.description,
};

const BAND: Record<string, string> = {
    "/data/": "shadow-[inset_0_5px_0_var(--color-data)]",
    "/yoga/": "shadow-[inset_0_5px_0_var(--color-yoga)]",
};

/**
 * Served by GitHub Pages for any missing URL. Says what happened, then offers
 * every section as a way on. Next marks it noindex, so it never appears in
 * search results.
 */
export default function NotFound() {
    return (
        <>
            <PageIntro title={page.text.heading}>
                <p>{page.text.lede}</p>
            </PageIntro>
            <nav aria-label={page.text.ways}>
                <ul className="grid gap-5 sm:grid-cols-2">
                    {site.navigation.map((item) => (
                        <li key={item.href}>
                            <a
                                href={item.href}
                                className={cx(
                                    "group flex h-full flex-col gap-2 rounded-2xl bg-neutral-100 p-6 pt-8 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(74,52,40,0.45)] motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                                    BAND[item.href],
                                )}
                            >
                                <span className="flex items-center gap-2 font-display text-2xl font-semibold text-primary group-hover:text-brand-700">
                                    {item.label}
                                    <ArrowRight
                                        aria-hidden="true"
                                        className="size-5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                                    />
                                </span>
                                <p className="leading-relaxed text-secondary">{DESCRIPTIONS[item.href]}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <a
                href="/"
                className="mt-12 inline-flex items-center gap-2 rounded-full bg-brand-700 px-5 py-3 font-display text-base font-semibold text-white transition-colors hover:bg-brand-800"
            >
                {page.text.home}
            </a>
        </>
    );
}

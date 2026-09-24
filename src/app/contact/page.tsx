import { site } from "@content";
import type { Metadata } from "next";
import { GitHub, Instagram, LinkedIn } from "@/components/foundations/social-icons";
import { PageIntro } from "@/components/site/page-intro";

const page = site.pages.contact;
const ICONS: Record<string, typeof GitHub> = { LinkedIn, Instagram, GitHub };

export const metadata: Metadata = { title: page.title, description: page.description };

export default function ContactPage() {
    return (
        <>
            <PageIntro title={page.title}>
                <p>{page.text.lede}</p>
            </PageIntro>
            <ul className="flex flex-col border-t border-secondary">
                {site.identity.profiles.map((profile) => {
                    const Icon = ICONS[profile.label];
                    return (
                        <li key={profile.url} className="border-b border-secondary">
                            <a href={profile.url} rel="me noreferrer" className="group flex items-center gap-4 py-6 font-display text-2xl font-semibold text-primary hover:text-brand-700">
                                {Icon && <Icon className="size-6 text-tertiary group-hover:text-brand-700" aria-hidden="true" />}
                                {profile.label}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

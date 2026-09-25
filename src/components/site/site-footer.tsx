import { site } from "@content";
import { GitHub, Instagram, LinkedIn } from "@/components/foundations/social-icons";

const ICONS: Record<string, typeof GitHub> = { LinkedIn, Instagram, GitHub };

/** The three profile links and the year. No email address is published. */
export function SiteFooter() {
    return (
        <footer className="mx-auto mt-24 flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 md:px-8">
            <p className="font-display text-sm text-tertiary">
                {site.identity.name}, {new Date().getFullYear()}
            </p>
            <nav aria-label="Profiles">
                <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    {site.identity.profiles.map((profile) => {
                        const Icon = ICONS[profile.label];
                        return (
                            <li key={profile.url}>
                                <a
                                    href={profile.url}
                                    rel="me noreferrer"
                                    className="flex items-center gap-2 font-display text-sm font-semibold text-secondary hover:text-brand-700"
                                >
                                    {Icon && <Icon className="size-4" aria-hidden="true" />}
                                    {profile.label}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </footer>
    );
}

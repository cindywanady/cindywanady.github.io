"use client";

import { site } from "@content";
import { usePathname } from "next/navigation";
import { currentNavHref } from "@/lib/nav";
import { NavList } from "./nav-list";

/** Name linking home, and the section links with the current one marked. */
export function SiteHeader() {
    const current = currentNavHref(usePathname() ?? "/", site.navigation);
    return (
        <header className="mx-auto flex w-full max-w-5xl flex-wrap items-baseline justify-between gap-4 px-5 pt-8 pb-6 md:px-8">
            <a href="/" className="font-display text-lg font-semibold text-primary hover:text-brand-700">
                {site.identity.name}
            </a>
            <nav aria-label="Sections">
                <NavList items={site.navigation} current={current} />
            </nav>
        </header>
    );
}

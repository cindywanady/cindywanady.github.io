"use client";

import { site } from "@content";
import { usePathname } from "next/navigation";
import { currentNavHref } from "@/lib/nav";
import { NavList } from "./nav-list";

/** Name linking home, and the section links with the current one marked. */
export function SiteHeader() {
    const current = currentNavHref(usePathname() ?? "/", site.navigation);
    return (
        <header className="site-header mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-5 px-5 py-6 md:px-8">
            <a href="/" className="font-display text-2xl font-semibold tracking-tight text-primary hover:text-brand-700">
                {site.identity.name}
            </a>
            <nav aria-label="Sections" className="site-nav">
                <NavList items={site.navigation} current={current} />
            </nav>
        </header>
    );
}

import type { NavItem } from "@content/schema";

/**
 * The href of the section that owns a path, or null when none does (the home
 * page, or a path no section claims). Matching is by path prefix on whole
 * segments, so /database/ does not fall under /data/.
 */
export function currentNavHref(pathname: string, items: NavItem[]): string | null {
    const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
    const owner = items.find((item) => item.owns.some((prefix) => path.startsWith(prefix)));
    return owner?.href ?? null;
}

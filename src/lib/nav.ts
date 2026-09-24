import type { NavItem } from "@content/schema";

/**
 * The href of the section that owns a path, or null when none does: the home
 * page, and any path that is not one of the site's routes. Trailing slashes are
 * optional.
 */
export function currentNavHref(pathname: string, items: NavItem[]): string | null {
    const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
    return items.find((item) => item.owns.includes(path))?.href ?? null;
}

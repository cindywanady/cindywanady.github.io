import type { NavItem } from "@content/schema";
import { cx } from "@/utils/cx";

/** The four section links. `current` is the href of the section being read. */
export function NavList({ items, current }: { items: NavItem[]; current: string | null }) {
    return (
        <ul className="site-nav-list flex flex-wrap items-center gap-x-6 gap-y-2">
            {items.map((item) => {
                const isCurrent = item.href === current;
                return (
                    <li key={item.href}>
                        <a
                            href={item.href}
                            aria-current={isCurrent ? "page" : undefined}
                            className={cx(
                                "font-display text-sm font-semibold underline-offset-[6px] transition-colors",
                                isCurrent ? "text-brand-700 underline decoration-2" : "text-secondary hover:text-brand-700",
                            )}
                        >
                            {item.label}
                        </a>
                    </li>
                );
            })}
        </ul>
    );
}

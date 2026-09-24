import type { ReactNode } from "react";

/** Small, code-native marks that help readers scan the four skill groups. */
export function SkillMark({ group }: { group: string }) {
    const paths: Record<string, ReactNode> = {
        "Languages and Query": (
            <>
                <rect x="5" y="8" width="30" height="24" rx="3" />
                <path d="m15 16-4 4 4 4m10-8 4 4-4 4" />
            </>
        ),
        "Analytics and ML": (
            <>
                <path d="m10 29 10-18 10 18M10 29h20M20 11v18" />
                <circle cx="10" cy="29" r="2" />
                <circle cx="20" cy="11" r="2" />
                <circle cx="30" cy="29" r="2" />
            </>
        ),
        "Visualization and BI": (
            <>
                <path d="M7 32h27M10 29v-9m9 9V11m9 18V16" />
                <circle cx="10" cy="20" r="2" />
                <circle cx="19" cy="11" r="2" />
                <circle cx="28" cy="16" r="2" />
            </>
        ),
        "CRM and Automation": (
            <>
                <path d="M12 14a11 11 0 0 1 17-1l3 3m-4 10a11 11 0 0 1-17 1l-3-3" />
                <path d="M32 10v6h-6M8 30v-6h6" />
            </>
        ),
    };

    if (!paths[group]) return null;
    return (
        <svg
            aria-hidden="true"
            className="size-8 shrink-0 text-brand-secondary"
            viewBox="0 0 40 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {paths[group]}
        </svg>
    );
}

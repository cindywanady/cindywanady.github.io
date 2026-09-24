import type { Role } from "@content/schema";
import type { ReactNode } from "react";

/** One job: dates beside title, organization, and what she did there. */
export function RoleEntry({ role, children }: { role: Role; children?: ReactNode }) {
    return (
        <article className="grid gap-2 md:grid-cols-[11rem_1fr] md:gap-10">
            <p className="font-display text-sm text-tertiary tabular-nums md:pt-1.5">{role.dates}</p>
            <div className="flex flex-col gap-4">
                <div>
                    <h3 className="font-display text-xl font-semibold text-primary">{role.title}</h3>
                    <p className="font-display text-sm text-secondary">{role.place ? `${role.organization}, ${role.place}` : role.organization}</p>
                </div>
                {children}
                <ul className="flex list-disc flex-col gap-2 pl-5 text-secondary marker:text-data">
                    {role.claims.map((claim) => (
                        <li key={claim.text} className="pl-1 leading-relaxed">
                            {claim.text}
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    );
}

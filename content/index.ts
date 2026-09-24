import { data } from "./data";
import { education } from "./education";
import { identity } from "./identity";
import { navigation } from "./navigation";
import { pages } from "./pages";
import { projects } from "./projects";
import {
    type Claim,
    dataSchema,
    educationSchema,
    identitySchema,
    navigationSchema,
    pagesSchema,
    projectsSchema,
    yogaSchema,
} from "./schema";
import { yoga } from "./yoga";

/**
 * All site content, parsed once. A module that breaks its schema throws here,
 * during `next build`, naming the field.
 */
export const site = {
    identity: identitySchema.parse(identity),
    navigation: navigationSchema.parse(navigation),
    data: dataSchema.parse(data),
    projects: projectsSchema.parse(projects),
    yoga: yogaSchema.parse(yoga),
    education: educationSchema.parse(education),
    pages: pagesSchema.parse(pages),
};

/** Every claim on the site, for the evidence and claim checks. */
export function allClaims(): Claim[] {
    const found: Claim[] = [];
    const walk = (value: unknown) => {
        if (Array.isArray(value)) return value.forEach(walk);
        if (value && typeof value === "object") {
            const v = value as Record<string, unknown>;
            if (typeof v.text === "string" && typeof v.quote === "string" && (v.source === "cv" || v.source === "yoga")) {
                found.push(v as Claim);
                return;
            }
            Object.values(v).forEach(walk);
        }
    };
    walk(site);
    return found;
}

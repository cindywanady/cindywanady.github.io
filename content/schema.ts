import { z } from "zod";

/**
 * The shape of every piece of site content. content/index.ts parses each
 * module against these at import time, so a missing or empty field fails
 * `next build` with an error naming the field. TypeScript types alone cannot
 * reject an empty string, which is why this file exists.
 */

const text = z.string().trim().min(1);
const httpsUrl = z.url({ protocol: /^https$/ });

export const claimSchema = z.object({
    text,
    source: z.enum(["cv", "yoga", "brief"]),
    quote: text,
});

const linkSchema = z.object({ label: text, url: httpsUrl });

export const stripSchema = z.object({
    title: text,
    steps: z
        .array(z.object({ label: text, detail: text.optional() }))
        .min(3)
        .max(8),
    evidence: claimSchema,
});

/** One half of the home page. Both halves must have exactly this anatomy. */
export const columnSchema = z.object({
    heading: text,
    trueLine: claimSchema,
    strip: stripSchema,
    proof: z.array(claimSchema).length(3),
    href: text,
    cta: text,
});

export const identitySchema = z.object({
    name: text,
    url: httpsUrl,
    jobTitle: text,
    worksFor: text,
    alumniOf: z.array(text).min(1),
    /** The home page's headline: one sentence of hers, with one word set apart. */
    hero: z.object({ claim: claimSchema, emphasis: text }),
    intro: z.array(claimSchema).length(2),
    profiles: z.array(linkSchema).length(3),
    knowsAbout: z.array(text).min(1),
    knowsLanguage: z.array(text).min(1),
    languages: z.array(z.object({ name: text, level: text })).min(1),
});

export const roleSchema = z.object({
    title: text,
    organization: text,
    place: text.optional(),
    dates: text,
    claims: z.array(claimSchema).min(1),
});

export const projectSchema = z.object({
    title: text,
    year: z.number().int(),
    context: text,
    tools: z.array(text).min(1),
    claims: z.array(claimSchema).min(1),
    link: linkSchema.optional(),
});

export const thesisSchema = projectSchema.extend({
    supervisor: linkSchema,
});

export const dataSchema = z.object({
    column: columnSchema,
    current: roleSchema,
    earlier: z.array(roleSchema).min(1),
    formative: z.array(roleSchema),
    skills: z.array(z.object({ group: text, items: text })).min(1),
});

export const projectsSchema = z.object({
    thesis: thesisSchema,
    course: z.array(projectSchema).length(5),
});

export const trainingSchema = z.object({
    name: text,
    hours: z.number().int().positive(),
    status: z.enum(["completed", "in_progress"]),
    school: linkSchema.optional(),
    evidence: claimSchema,
});

export const yogaSchema = z.object({
    column: columnSchema,
    styles: z.array(text).min(1),
    trainings: z.array(trainingSchema).min(1),
    reflection: claimSchema,
});

export const educationSchema = z.array(
    z.object({
        award: text,
        institution: text,
        dates: text,
        claims: z.array(claimSchema),
    }),
);

export const navigationSchema = z.array(z.object({ label: text, href: text, owns: z.array(text) })).length(4);

const pageMeta = z.object({ title: text, description: text, text: z.record(z.string(), text), ledes: z.record(z.string(), text).default({}) });
export const pagesSchema = z.object({
    home: pageMeta,
    data: pageMeta,
    thesis: pageMeta,
    yoga: pageMeta,
    about: pageMeta,
    contact: pageMeta,
    notFound: pageMeta,
});

export type Claim = z.infer<typeof claimSchema>;
export type Column = z.infer<typeof columnSchema>;
export type Strip = z.infer<typeof stripSchema>;
export type Role = z.infer<typeof roleSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Thesis = z.infer<typeof thesisSchema>;
export type Training = z.infer<typeof trainingSchema>;
export type NavItem = z.infer<typeof navigationSchema>[number];

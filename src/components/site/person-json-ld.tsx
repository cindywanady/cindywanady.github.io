import { site } from "@content";

/** schema.org Person for search engines. Built from content/identity.ts. */
export function PersonJsonLd() {
    const { identity } = site;
    const person = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: identity.name,
        url: identity.url,
        jobTitle: identity.jobTitle,
        worksFor: { "@type": "Organization", name: identity.worksFor },
        alumniOf: identity.alumniOf.map((name) => ({ "@type": "CollegeOrUniversity", name })),
        knowsAbout: identity.knowsAbout,
        knowsLanguage: identity.knowsLanguage,
        sameAs: identity.profiles.map((p) => p.url),
    };
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />;
}

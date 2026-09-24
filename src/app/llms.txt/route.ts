import { site } from "@content";

export const dynamic = "force-static";

/**
 * /llms.txt, a plain summary for language-model crawlers. Built from the
 * evidenced content rather than written by hand, so it states only what the
 * site's claims state and follows every change to sources/.
 */
export function GET() {
    const { identity, data, yoga, pages } = site;
    const url = (path: string) => new URL(path, identity.url).toString();
    const lines = [
        `# ${identity.name}`,
        "",
        `> ${identity.hero.claim.text}`,
        "",
        `> ${identity.intro.map((c) => c.text).join(" ")}`,
        "",
        "## Data",
        "",
        data.column.trueLine.text,
        ...data.column.proof.map((c) => `- ${c.text}`),
        "",
        `- [${pages.data.title}](${url("/data/")}): ${pages.data.description}`,
        `- [${pages.thesis.title}](${url("/data/thesis/")}): ${pages.thesis.description}`,
        "",
        "## Yoga",
        "",
        yoga.column.trueLine.text,
        ...yoga.column.proof.map((c) => `- ${c.text}`),
        "",
        `- [${pages.yoga.title}](${url("/yoga/")}): ${pages.yoga.description}`,
        "",
        "## About and contact",
        "",
        `- [${pages.about.title}](${url("/about/")}): ${pages.about.description}`,
        `- [${pages.contact.title}](${url("/contact/")}): ${pages.contact.description}`,
        ...identity.profiles.map((p) => `- ${p.label}: ${p.url}`),
        "",
    ];
    return new Response(lines.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8" } });
}

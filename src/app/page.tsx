import { site } from "@content";
import type { Metadata } from "next";
import { HalfColumn } from "@/components/site/half-column";
import { PageIntro } from "@/components/site/page-intro";

export const metadata: Metadata = {
    title: { absolute: site.pages.home.title },
    description: site.pages.home.description,
};

/** The headline with one word set in terracotta, the data half's color. */
function Emphasis({ text, word }: { text: string; word: string }) {
    const at = text.indexOf(word);
    if (at === -1) return <>{text}</>;
    return (
        <>
            {text.slice(0, at)}
            <span className="text-data">{word}</span>
            {text.slice(at + word.length)}
        </>
    );
}

export default function HomePage() {
    const { hero } = site.identity;
    return (
        <>
            <PageIntro title={<Emphasis text={hero.claim.text} word={hero.emphasis} />}>
                <p>
                    {site.pages.home.text.greeting} {site.identity.intro.map((c) => c.text).join(" ")}
                </p>
            </PageIntro>
            <div className="grid gap-8 md:grid-cols-2 md:gap-8">
                <HalfColumn column={site.data.column} tone="data" />
                <HalfColumn column={site.yoga.column} tone="yoga" />
            </div>
        </>
    );
}

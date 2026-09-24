import { site } from "@content";
import type { Metadata } from "next";
import { HalfColumn } from "@/components/site/half-column";
import { PageIntro } from "@/components/site/page-intro";

export const metadata: Metadata = {
    title: { absolute: site.pages.home.title },
    description: site.pages.home.description,
};

/** The role is the first line a reader sees. */
function Emphasis({ text, word }: { text: string; word: string }) {
    const at = text.indexOf(word);
    if (at === -1) return <>{text}</>;
    return (
        <>
            {text.slice(0, at)}
            <span className="hero-emphasis">{word}</span>
            {text.slice(at + word.length)}
        </>
    );
}

export default function HomePage() {
    const { hero } = site.identity;
    return (
        <>
            <PageIntro title={<Emphasis text={hero.claim.text} word={hero.emphasis} />} home>
                <p>
                    {site.pages.home.text.greeting} {site.identity.intro.map((c) => c.text).join(" ")}
                </p>
            </PageIntro>
            <div className="practice-grid">
                <HalfColumn column={site.data.column} tone="data" />
                <HalfColumn column={site.yoga.column} tone="yoga" />
            </div>
        </>
    );
}

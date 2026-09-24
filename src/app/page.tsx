import { site } from "@content";
import type { Metadata } from "next";
import { HalfColumn } from "@/components/site/half-column";
import { PageIntro } from "@/components/site/page-intro";

export const metadata: Metadata = {
    title: { absolute: site.pages.home.title },
    description: site.pages.home.description,
};

export default function HomePage() {
    return (
        <>
            <PageIntro title={site.identity.name}>
                <p>{site.identity.intro.map((c) => c.text).join(" ")}</p>
            </PageIntro>
            <div className="grid gap-16 md:grid-cols-2 md:gap-12">
                <HalfColumn column={site.data.column} tone="data" />
                <HalfColumn column={site.yoga.column} tone="yoga" />
            </div>
        </>
    );
}

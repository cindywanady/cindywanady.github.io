import { site } from "@content";
import type { Metadata } from "next";
import { PageIntro } from "@/components/site/page-intro";

const page = site.pages.notFound;

export const metadata: Metadata = { title: page.title, description: page.description };

export default function NotFound() {
    return (
        <PageIntro title={page.title}>
            <p>{page.text.lede}</p>
            <ul className="mt-6 flex flex-wrap gap-6 font-display text-lg font-semibold">
                <li>
                    <a href="/data/" className="text-brand-secondary underline underline-offset-4 hover:text-brand-700">
                        {page.text.data}
                    </a>
                </li>
                <li>
                    <a href="/yoga/" className="text-brand-secondary underline underline-offset-4 hover:text-brand-700">
                        {page.text.yoga}
                    </a>
                </li>
            </ul>
        </PageIntro>
    );
}

import type { Metadata, Viewport } from "next";
import { PersonJsonLd } from "@/components/site/person-json-ld";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SkipLink } from "@/components/site/skip-link";
import "@/styles/globals.css";

export const metadata: Metadata = {
    metadataBase: new URL("https://cindywanady.github.io"),
    title: { default: "Cindy Wanady | Data Scientist in CRM & Yoga Practitioner", template: "%s | Cindy Wanady" },
    openGraph: {
        type: "website",
        siteName: "Cindy Wanady",
        images: [{ url: "/og.png", width: 1200, height: 630, alt: "Cindy Wanady, data scientist in CRM and yoga practitioner" }],
    },
    twitter: { card: "summary_large_image" },
    verification: { google: "tJPBeZWPyaUjNDjeIAcI3rTsAKTAdQj4K0G2tSFU8S0" },
};

export const viewport: Viewport = {
    themeColor: "#F7F1E7",
    colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className="flex min-h-dvh flex-col bg-primary font-body text-primary antialiased">
                <SkipLink />
                <SiteHeader />
                <main id="main" className="mx-auto w-full max-w-6xl px-5 md:px-8">
                    {children}
                </main>
                <SiteFooter />
                <PersonJsonLd />
            </body>
        </html>
    );
}

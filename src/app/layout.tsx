import type { Metadata, Viewport } from "next";
import { Familjen_Grotesk, Source_Serif_4 } from "next/font/google";
import { PersonJsonLd } from "@/components/site/person-json-ld";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SkipLink } from "@/components/site/skip-link";
import { RouteProvider } from "@/providers/router-provider";
import "@/styles/globals.css";
import { cx } from "@/utils/cx";

const display = Familjen_Grotesk({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-familjen",
});

const body = Source_Serif_4({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-source-serif",
});

export const metadata: Metadata = {
    title: "Cindy Wanady",
};

export const viewport: Viewport = {
    themeColor: "#F7F1E7",
    colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={cx(display.variable, body.variable, "flex min-h-dvh flex-col bg-primary font-body text-primary antialiased")}>
                <RouteProvider>
                    <SkipLink />
                    <SiteHeader />
                    <main id="main" className="mx-auto w-full max-w-5xl px-5 md:px-8">
                        {children}
                    </main>
                    <SiteFooter />
                </RouteProvider>
                <PersonJsonLd />
            </body>
        </html>
    );
}

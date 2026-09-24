import { site } from "@content";
import { ImageResponse } from "next/og";
import { neutral, palette } from "@/design/palette";

export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

/**
 * The social card at /og.png: her professional identity in the site's palette. A route
 * handler, not Next's opengraph-image convention, because that exports a file
 * with no extension, and GitHub Pages serves it as application/octet-stream,
 * which LinkedIn and Facebook skip. src/app/layout.tsx points og:image here.
 */
export function GET() {
    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: 76,
                background: palette.cream,
            }}
        >
            <div style={{ display: "flex", fontSize: 32, fontWeight: 700, color: palette.burgundy }}>{site.identity.name}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", fontFamily: "Georgia", fontSize: 100, lineHeight: 1.05, color: palette.espresso }}>Data scientist</div>
                <div style={{ display: "flex", fontFamily: "Georgia", fontSize: 100, lineHeight: 1.05, color: palette.espresso }}>in CRM.</div>
            </div>
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: `3px solid ${palette.olive}`,
                    paddingTop: 24,
                }}
            >
                <div style={{ display: "flex", fontSize: 38, color: neutral[800] }}>Yoga practitioner</div>
                <div style={{ display: "flex", fontSize: 24, color: palette.burgundy }}>cindywanady.github.io</div>
            </div>
        </div>,
        size,
    );
}

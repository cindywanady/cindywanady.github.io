import { site } from "@content";
import { ImageResponse } from "next/og";
import { neutral, palette } from "@/design/palette";

export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

/**
 * The social card at /og.png: her name over the two halves' colors. A route
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
                padding: 80,
                background: palette.cream,
            }}
        >
            <div style={{ display: "flex", fontSize: 108, fontWeight: 700, color: palette.espresso, letterSpacing: -3 }}>{site.identity.name}</div>
            <div style={{ display: "flex", gap: 40 }}>
                {[
                    { label: "Data", color: palette.terracotta },
                    { label: "Yoga", color: palette.olive },
                ].map((half) => (
                    <div key={half.label} style={{ display: "flex", flexDirection: "column", flex: 1, borderTop: `10px solid ${half.color}`, paddingTop: 24 }}>
                        <div style={{ fontSize: 48, fontWeight: 700, color: neutral[800] }}>{half.label}</div>
                    </div>
                ))}
            </div>
        </div>,
        size,
    );
}

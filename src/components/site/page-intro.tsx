import type { ReactNode } from "react";
import { ChakraField } from "./chakra-field";

/** A page's opening with Cindy's portrait, a related editorial image, or the chakra. */
export function PageIntro({
    title,
    field = "both",
    home = false,
    portrait = false,
    artwork,
    children,
}: {
    title: ReactNode;
    field?: "data" | "yoga" | "both";
    home?: boolean;
    portrait?: boolean;
    artwork?: string;
    children?: ReactNode;
}) {
    const showPortrait = home || portrait;
    const scene = artwork ?? (field === "data" ? "/data-workspace.webp" : field === "yoga" ? "/yoga-practice.webp" : null);
    const sceneSrcSet =
        scene === "/data-workspace.webp"
            ? "/data-workspace-640.webp 640w, /data-workspace-1080.webp 1080w, /data-workspace.webp 1536w"
            : scene === "/yoga-practice.webp"
              ? "/yoga-practice-640.webp 640w, /yoga-practice-1080.webp 1080w, /yoga-practice.webp 1536w"
              : undefined;
    return (
        <div className={home ? "intro-shell intro-shell-home" : "intro-shell intro-shell-inner"}>
            <div className="intro-copy">
                <h1 className="intro-title">{title}</h1>
                {children && <div className="intro-lede">{children}</div>}
                {home && (
                    <div className="intro-spectrum" aria-hidden="true">
                        {Array.from({ length: 7 }, (_, index) => (
                            <span key={index} />
                        ))}
                    </div>
                )}
            </div>
            <div className={showPortrait ? "intro-art intro-art-portrait" : scene ? "intro-art intro-art-scene" : "intro-art intro-art-symbol"}>
                {(showPortrait || !scene) && <ChakraField tone={field} />}
                {showPortrait && (
                    <picture className="intro-portrait">
                        <source
                            type="image/webp"
                            srcSet="/cindy-portrait-450.webp 450w, /cindy-portrait.webp 1086w"
                            sizes={home ? "(max-width: 760px) 80vw, 420px" : "(max-width: 760px) 70vw, 300px"}
                        />
                        <img src="/cindy-portrait.webp" alt="Cindy Wanady" width="1086" height="1448" fetchPriority="high" />
                    </picture>
                )}
                {scene && !showPortrait && (
                    <img
                        src={scene}
                        srcSet={sceneSrcSet}
                        sizes={sceneSrcSet ? "(max-width: 760px) calc(100vw - 40px), 400px" : undefined}
                        alt=""
                        width="1536"
                        height="1024"
                        className="intro-scene"
                    />
                )}
                {!scene && !showPortrait && <img src="/botanical-branch.webp" alt="" width="512" height="768" loading="lazy" className="intro-botanical" />}
            </div>
        </div>
    );
}

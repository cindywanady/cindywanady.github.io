import { palette } from "@/design/palette";

type Tone = "data" | "yoga" | "both";

const tones: Record<Tone, { outer: string; inner: string }> = {
    data: { outer: palette.terracotta, inner: palette.burgundy },
    yoga: { outer: palette.olive, inner: palette.terracotta },
    both: { outer: palette.olive, inner: palette.burgundy },
};

/** A quiet, chakra-inspired mandala. CSS handles motion and reduced-motion preference. */
export function ChakraField({ tone = "both" }: { tone?: Tone }) {
    const color = tones[tone];
    return (
        <svg aria-hidden="true" className="chakra-field" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="250" cy="250" r="236" stroke={color.outer} strokeOpacity=".28" strokeWidth="1" />
            <circle cx="250" cy="250" r="213" stroke={color.outer} strokeOpacity=".46" strokeWidth="1" />
            <g className="chakra-orbit" style={{ transformOrigin: "250px 250px" }}>
                {Array.from({ length: 12 }, (_, index) => (
                    <g key={index} transform={`rotate(${index * 30} 250 250)`}>
                        <ellipse cx="250" cy="84" rx="29" ry="78" stroke={color.outer} strokeOpacity=".55" strokeWidth="1.4" />
                        <circle cx="250" cy="20" r="2.6" fill={index % 3 === 0 ? palette.coral : color.outer} fillOpacity=".72" />
                    </g>
                ))}
            </g>
            <g className="chakra-breath" style={{ transformOrigin: "250px 250px" }}>
                <circle cx="250" cy="250" r="112" fill={palette.cream} fillOpacity=".76" stroke={color.inner} strokeOpacity=".36" strokeWidth="1.5" />
                {Array.from({ length: 8 }, (_, index) => (
                    <ellipse
                        key={index}
                        cx="250"
                        cy="188"
                        rx="25"
                        ry="60"
                        transform={`rotate(${index * 45} 250 250)`}
                        stroke={color.inner}
                        strokeOpacity=".55"
                        strokeWidth="1.2"
                    />
                ))}
                <circle cx="250" cy="250" r="42" fill={palette.cream} stroke={color.inner} strokeOpacity=".68" strokeWidth="1.5" />
                <circle cx="250" cy="250" r="7" fill={palette.mustard} fillOpacity=".7" />
            </g>
        </svg>
    );
}

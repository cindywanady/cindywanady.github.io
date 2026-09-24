/**
 * The site's colors. The eight named values are the client's palette and are
 * used exactly; the two scales are derived from them in OKLCH and are what
 * src/styles/theme.css declares. tests/unit/contrast.test.ts keeps the two
 * files in agreement, so change a value here and there together.
 */
export const palette = {
    burgundy: "#7A263A",
    terracotta: "#C96A4A",
    coral: "#F28C7C",
    mustard: "#C89B2B",
    olive: "#6F7A3A",
    sand: "#D9C2A3",
    cream: "#F7F1E7",
    espresso: "#4A3428",
} as const;

/** Anchored at 700 on burgundy. */
export const brand = {
    50: "#FFF3F5",
    100: "#FEE6E9",
    200: "#F8CFD4",
    300: "#EBAEB6",
    400: "#D78793",
    500: "#BE6373",
    600: "#A0485A",
    700: "#7A263A",
    800: "#691E30",
    900: "#521323",
    950: "#350512",
} as const;

/** Anchored at 50 on cream, 200 on sand and 800 on espresso. */
export const neutral = {
    50: "#F7F1E7",
    100: "#EEE1D0",
    200: "#D9C2A3",
    300: "#BBA88E",
    400: "#9D846D",
    500: "#806556",
    600: "#684F42",
    700: "#5A4134",
    800: "#4A3428",
    900: "#342117",
    950: "#1F1007",
} as const;

/**
 * Colors allowed as a text color at body size on cream. Coral, mustard and
 * sand are absent on purpose: all three measure under 3:1 on cream.
 */
export const textSafe = [
    brand[600],
    brand[700],
    brand[800],
    brand[900],
    brand[950],
    neutral[500],
    neutral[600],
    neutral[700],
    neutral[800],
    neutral[900],
    neutral[950],
] as const;

# Design system

## Color

The eight colors are Cindy's and are used exactly. `src/design/palette.ts` holds them. `src/styles/theme.css` declares them as Untitled UI tokens, and `tests/unit/contrast.test.ts` keeps the two files in agreement.

| Color | On cream | Allowed use |
|---|---|---|
| Espresso `#4A3428` | 10.31 | All text |
| Burgundy `#7A263A` | 8.63 | Text, links, focus ring |
| Olive `#6F7A3A` | 4.13 | The yoga half's rule and markers, large text |
| Terracotta `#C96A4A` | 3.31 | The data half's rule and markers, large text |
| Mustard `#C89B2B` | 2.29 | The one featured item per page, as a fill or rule |
| Coral `#F28C7C` | 2.12 | Small ornaments only |
| Sand `#D9C2A3` | 1.53 | Borders, fills |
| Cream `#F7F1E7` | | Page background |

Coral, mustard and sand are never a text color. A test fails if a text token points at one.

Untitled UI's semantic tokens read `--color-neutral-*`. The warm scale derived from cream, sand and espresso is declared under that name. On a sand fill, text uses neutral 700 or darker.

The site is light only. There is no dark theme. The components' `dark:` classes are bound to a class nothing sets. A test guards that binding, because deleting it would make them follow the reader's OS setting.

## Type

- Familjen Grotesk: her name, headings, navigation, labels, the sequence strip.
- Source Serif 4: body text.

## The sequence strip

`src/components/site/sequence-strip.tsx` draws numbered steps joined by a rule. It is the site's one bold element and appears once per half: her CRM migration method on the data side, a practice sequence on the yoga side. Numbering is allowed there because the order is real, and nowhere else.

- The rule and markers take the half's color. The numbers stay espresso so they pass contrast.
- The strip follows its container's width. Below 36rem it runs vertically, which is why both home-page strips are vertical at desktop width.
- It renders complete on the server. Where the browser can observe scrolling and the reader allows motion, the steps draw in on arrival. Under reduced motion there is no animation.

## Banned

`tests/unit/banned-patterns.test.ts` scans `src/` for these:

- eyebrow or kicker labels above headings
- gradients
- frosted glass cards
- vertical accent rails
- emoji

The review also checks for things a regex cannot: decorative numbering, rows of big numbers with small labels, and animation beyond the strip.

## Components

Untitled UI components live in `src/components/base/` and `src/components/foundations/`. They were copied in and are owned here. Only the badge and three social icons are used.

The half-column links are plain anchors, not Untitled UI's `Button`. `Button` is a client component, and a repeated icon element passed through it came out missing from the static build.

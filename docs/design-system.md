# Design system

## Color

The eight colors are Cindy's and are used exactly. `src/design/palette.ts` holds them. `src/styles/theme.css` declares them as Untitled UI tokens, and `tests/unit/contrast.test.ts` keeps the two files in agreement.

Three muted teal, violet, and rose accents appear only in the decorative spectrum and portrait mandala. They add Cindy's requested prismatic, celestial feeling while the eight core colors still carry text, surfaces, and section identity.

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

- Familjen Grotesk appears in navigation, labels, and the sequence strips.
- Source Serif 4 appears in the main headings and body copy.

Both families load from `public/fonts/`, so the static build needs no font download.

Familjen Grotesk now carries the page and section headings, the site name, and navigation. Source Serif 4 stays in the reading text. This gives Cindy's data work and yoga practice a shared typographic identity without treating either practice as an aside.

## The sequence strip

`src/components/site/sequence-strip.tsx` draws numbered steps joined by a rule. The data page shows her CRM migration method, and the yoga page shows a practice sequence. Numbering follows the actual order of each process.

- The rule and markers take the half's color. The numbers stay espresso so they pass contrast.
- The strip follows its container's width. Below 36rem it runs vertically so labels stay readable.
- It renders complete on the server. The labels remain visible while the connecting rule draws on arrival. Under reduced motion there is no animation.

## Chakra and images

`src/components/site/chakra-field.tsx` draws a thin mandala behind Cindy's portrait. Its outer petals turn slowly, and its inner petals expand slightly. Reduced motion freezes both layers. The SVG is decorative and hidden from assistive technology.

The homepage and About page use Cindy's supplied portrait, converted to WebP at two widths. The home practice panels use two generated still lifes, and the five project cards use distinct editorial interpretations of their subjects. The data and yoga pages retain their own editorial images. The Contact page uses a generated botanical branch. Every image sits in `public/`, and `docs/visual-assets.md` records its source and prompt.

A transparent field of orbital paths, small points, and spectral light moves slowly behind the content. BasicScroll, selected from the frontend-stuff collection, also shifts it up to 12 pixels as a reader moves down a page. A translucent cream reading surface quiets the field beneath the main content, especially on phones, while leaving the artwork visible around the page edges. The motion suggests data connections, celestial energy, and the pace of a breath. It stops under reduced motion, including when that setting changes while the page is open, and the layer never receives pointer events.

On narrow screens, portrait and scene artwork follow the copy in normal grid order. The portrait stays inside a square art frame, so browser zoom cannot place it over text. The four section links move to a fixed bottom bar with 44px targets that can be reached from either side of a phone. The footer has clearance below the bar.

## Depth

The home data section uses a burgundy surface and a photo of Cindy's kind of workflow to give analytical work more presence. The yoga section uses a quieter sand surface with olive details. Both sections keep clear type, distinct practice marks, and matching photographic crops. The headings and proof points use space instead of divider rules. Projects on `/data/` use individual images inside soft panels, while the featured thesis uses a full-width image. Four code native marks help readers scan the skill groups.

The home introduction carries seven separate spectrum strokes, and the portrait mandala uses muted spectral petals. Both details express the rainbow energy without reducing the clarity of Cindy's credentials or work.

All content stays visible as a page loads. Project panels may lift on hover, and sequence strips may draw when they enter view.

## Banned

`tests/unit/banned-patterns.test.ts` scans `src/` for these:

- eyebrow or kicker labels above headings
- gradients
- frosted glass cards
- vertical accent rails
- emoji

The review also checks decorative numbering and oversized statistics that could make the site feel generic.

## Components

Untitled UI components live in `src/components/base/` and `src/components/foundations/`. They were copied in and are owned here. Only the badge and three social icons are used.

The half-column links are plain anchors, not Untitled UI's `Button`. `Button` is a client component, and a repeated icon element passed through it came out missing from the static build.

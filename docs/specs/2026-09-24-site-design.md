# cindywanady.github.io: site design spec

Status: design approved in conversation on 2026-09-24. Awaiting review of this
written spec before an implementation plan is written.

## 1. What this site is for

Cindy Wanady works in two practices and the site gives them equal weight.

- **Data.** Six years across CRM automation, data migration and operational
  reporting, four of them at Mekari. A Master of Data Science at Monash
  University, expected September 2026, with a thesis building a
  retrieval-augmented chatbot for depression care in Indonesian primary care.
- **Yoga.** Three years of practice. She holds a 100-hour yoga teacher training
  (YTT) certificate and is partway through a 200-hour YTT. She does not teach.

Readers arrive for one practice or the other. A recruiter looking for her
Mekari work should reach it in one click without passing through yoga, and a
reader interested in her practice should reach it without passing through CRM.

Success means:

1. Each practice is one click from the home page, and the home page gives both
   the same space and the same structure.
2. Every factual sentence on the site is traceable to a committed source file,
   and the build proves it.
3. Nothing on the site reads as a generated template.
4. A future coding agent can change content without touching templates, and can
   prove a change is safe by running one command.

### Non-goals

These are out of scope. Adding one is a new decision, not a gap in this spec.

- Dark mode. The palette is a light palette.
- A blog or writing section. There is no writing to publish yet.
- Analytics or tracking scripts.
- A contact form. It needs a server and GitHub Pages has none.
- A detail page per course project. Each is one or two sentences in the CV.
- Untitled UI PRO components. Only the MIT-licensed open-source set is used.
- Class bookings or any teaching offer. She is not teaching.

## 2. Stack and hosting

| Concern | Choice |
|---|---|
| Language | TypeScript |
| Framework | Next.js, App Router |
| Styling | Tailwind CSS v4 |
| Components | Untitled UI React, open-source set (MIT), built on React Aria |
| Content validation | zod |
| Unit tests | Vitest, Testing Library |
| End-to-end tests | Playwright, `@axe-core/playwright` |
| Claim checking | TypeSafe, `@typesafe-ai/sdk` |
| Hosting | GitHub Pages, published by a GitHub Actions workflow |

### Static export

`next.config.ts` sets `output: 'export'` and `trailingSlash: true`. The build
writes plain HTML to `out/`. There is no server code, no API routes, no
middleware, and no runtime data fetching. Every page is prerendered, so crawlers
receive complete HTML.

The repository is the user site `cindywanady.github.io`, which serves from the
domain root. No `basePath` is needed.

`images.unoptimized: true` is required by static export. Images are committed
as WebP at the sizes they are displayed.

### Why zod

TypeScript types cannot reject an empty string. The yoga and contact facts in
section 5.3 must be present and non-empty before the site can ship, and a zod
schema parsed at build time is the smallest thing that enforces it. It is the
only dependency beyond the named stack.

### Untitled UI

Components are copied into the project by the Untitled UI CLI and are then
owned code. Initialize with:

```bash
npx untitledui@latest init
```

Add further components with the CLI's add command as documented at
`untitledui.com/react/docs`. Copied components live in `src/components/ui/` and
are edited in place when the site needs something different. There is no
upstream package to stay in sync with.

## 3. Information architecture

| Route | Holds |
|---|---|
| `/` | Her name, one plain sentence naming both practices, the two equal columns |
| `/data/` | Current work at Mekari with the migration sequence strip, the thesis as the featured item, five course projects, earlier roles, skills |
| `/data/thesis/` | The RAG chatbot: what it is grounded in, the three-arm blind evaluation, supervision |
| `/yoga/` | Her trainings (YTT 100-hour completed, YTT 200-hour in progress), Hatha yoga, three years of practice, the practice sequence, what practice changed in how she works |
| `/about/` | Education (Monash, Prasetiya Mulya, the Tsinghua exchange), languages, where the two practices meet |
| `/contact/` | Email, LinkedIn, GitHub |
| 404 | A short message and links to both halves |

Primary navigation: `Data`, `Yoga`, `About`, `Contact`. The item for the
current section carries `aria-current="page"`, resolved at build time.
`/data/thesis/` marks `Data` as current.

### Home layout

The two halves share one anatomy and one width. The equal structure carries the
claim that the practices are equal; no copy has to say it.

```text
Cindy Wanady                                  Data  Yoga  About  Contact
────────────────────────────────────────────────────────────────────────
Cindy Wanady
One plain sentence naming both practices.

┌─ Data ───────────────────────┐  ┌─ Yoga ───────────────────────┐
│ one true line                │  │ one true line                │
│ 1─2─3─4─5  sequence strip    │  │ 1─2─3─4  sequence strip      │
│ three proof lines            │  │ three proof lines            │
│ See data work                │  │ See yoga practice            │
└──────────────────────────────┘  └──────────────────────────────┘
```

Below 768px the columns stack, Data first. Order follows the navigation and
is the only asymmetry the layout allows.

## 4. Visual system

### 4.1 Palette

The client supplied these eight colors. They are used exactly.

| Role | Name | Hex |
|---|---|---|
| Primary | Burgundy | `#7A263A` |
| Secondary | Terracotta | `#C96A4A` |
| Accent | Coral | `#F28C7C` |
| Highlight | Mustard gold | `#C89B2B` |
| Support | Olive green | `#6F7A3A` |
| Neutral | Sand beige | `#D9C2A3` |
| Background | Warm cream | `#F7F1E7` |
| Text | Espresso brown | `#4A3428` |

Measured contrast against the cream background decides what each color may do:

| Color | On cream | Permitted use |
|---|---|---|
| Espresso | 10.31 | All text |
| Burgundy | 8.63 | All text, links, primary buttons |
| Olive | 4.13 | Large text (24px, or 18.66px bold), UI edges, the yoga half's marks |
| Terracotta | 3.31 | Large text, UI edges, the data half's marks |
| Mustard | 2.29 | Fills only. Marks the one featured item per page |
| Coral | 2.12 | Fills and small ornaments only |
| Sand | 1.53 | Card fills, borders |

The palette's original suggestions put coral on badges and mustard on labels.
Used as text colors both fail WCAG AA, so neither is ever a text color. Text
placed on a coral or mustard fill is espresso: 4.86:1 on coral, 4.51:1 on
mustard.

Primary buttons are burgundy with cream text, 8.63:1.

### 4.2 Token scales

Untitled UI reads its colors from `theme.css`. Two scales are replaced.

**Brand**, anchored at 700 on the supplied burgundy, derived in OKLCH at a
constant hue:

| Token | Value | On cream |
|---|---|---|
| `--color-brand-50` | `#FFF3F5` | 1.04 |
| `--color-brand-100` | `#FEE6E9` | 1.06 |
| `--color-brand-200` | `#F8CFD4` | 1.26 |
| `--color-brand-300` | `#EBAEB6` | 1.66 |
| `--color-brand-400` | `#D78793` | 2.40 |
| `--color-brand-500` | `#BE6373` | 3.58 |
| `--color-brand-600` | `#A0485A` | 5.24 |
| `--color-brand-700` | `#7A263A` | 8.63 |
| `--color-brand-800` | `#691E30` | 10.22 |
| `--color-brand-900` | `#521323` | 12.66 |
| `--color-brand-950` | `#350512` | 15.82 |

**Gray**, anchored at 50 on cream, 200 on sand and 800 on espresso. The light
end takes sand's hue and the dark end espresso's, so it stays warm without
turning pink:

| Token | Value | On cream | On sand |
|---|---|---|---|
| `--color-gray-50` | `#F7F1E7` | 1.00 | 1.53 |
| `--color-gray-100` | `#EEE1D0` | 1.15 | 1.34 |
| `--color-gray-200` | `#D9C2A3` | 1.53 | 1.00 |
| `--color-gray-300` | `#BBA88E` | 2.05 | 1.34 |
| `--color-gray-400` | `#9D846D` | 3.14 | 2.05 |
| `--color-gray-500` | `#806556` | 4.78 | 3.12 |
| `--color-gray-600` | `#684F42` | 6.71 | 4.38 |
| `--color-gray-700` | `#5A4134` | 8.34 | 5.44 |
| `--color-gray-800` | `#4A3428` | 10.31 | 6.73 |
| `--color-gray-900` | `#342117` | 13.58 | 8.86 |
| `--color-gray-950` | `#1F1007` | 16.46 | 10.74 |

Text on a sand fill uses gray 700 or darker. Gray 500 and 600 pass on cream but
not on sand.

The page background is `--color-gray-50`. Body text is `--color-gray-800`.

The remaining four supplied colors become single named tokens rather than
scales, because each has one job:

```css
--color-data: #C96A4A;      /* terracotta: the data half */
--color-yoga: #6F7A3A;      /* olive: the yoga half */
--color-feature: #C89B2B;   /* mustard: the one featured item per page */
--color-ornament: #F28C7C;  /* coral: small decorative marks */
```

### 4.3 Typography

| Role | Face | Use |
|---|---|---|
| Display and interface | Familjen Grotesk | Her name, section headings, navigation, buttons, sequence strip labels |
| Body | Source Serif 4 | Paragraphs and proof lines |

Both load through `next/font/google`, subset to Latin, and replace Untitled
UI's default font tokens. Numbers use `font-variant-numeric: tabular-nums` so
dates and figures align in lists.

The common generated look pairs a high-contrast serif display with a cream
background. This site keeps the client's cream and puts the serif only in the
reading text, with a grotesk carrying the display. Neither face is used on
feliren88.github.io.

Scale, in rem: 0.875, 1, 1.125, 1.375, 1.75, 2.5, 3.5. Body line height 1.6,
measure capped at 68 characters. Headings are sentence case.

### 4.4 Signature: the sequence strip

The one bold element on the site. A horizontal row of numbered steps joined by
a rule, rendered as an ordered list. It appears once in each half and nowhere
else.

- **Data half:** her CRM migration method, taken from the Mekari bullet in her
  CV: field mapping, validation rules, pre-cutover reconciliation, cutover,
  post-cutover reconciliation. Steps and joining rule in terracotta.
- **Yoga half:** a practice sequence she supplies (section 5.3). Steps and
  joining rule in olive.

Numbering is permitted here because the order is real: a migration fails if
reconciliation happens after cutover, and a practice sequence is performed in
order. Numbers are never used as decoration anywhere else.

On first entering the viewport the rule draws from step one to the last step,
revealing each step as it passes. That is the only animation on the site. Under
`prefers-reduced-motion: reduce` the strip renders complete with no motion.

Below 640px the strip turns vertical.

### 4.5 Banned patterns

None of these may appear, and tests in section 7 enforce the ones a machine can
detect:

- eyebrows, kickers, or any small uppercase label above a heading
- decorative counters such as `01`, `02`
- gradient fills or gradient text
- a row of large numbers with small labels
- frosted or glass cards
- vertical accent rails beside headings, cards or prose
- emoji
- animation beyond the sequence strip

## 5. Content

### 5.1 Sources of truth

Two committed files are the only places a fact may come from.

| File | Holds | Written by |
|---|---|---|
| `sources/cv.md` | Her CV as plain text, converted from the LaTeX source | Converted once, then edited when the CV changes |
| `sources/yoga.md` | Her yoga facts | Cindy |

The CV conversion keeps every sentence verbatim and removes only LaTeX markup:
`\textbf{}`, `\textit{}`, `\hfill`, `\href{url}{text}` becomes `text (url)`,
`$\sim$` becomes `~`, and `\%` becomes `%`. Commented-out LaTeX lines are
dropped.

### 5.2 Content modules

All site copy lives in `content/`, one module per concern. Templates import
content and never hold copy of their own.

| Module | Holds |
|---|---|
| `content/identity.ts` | Name, the home sentence, contact links, the Person JSON-LD fields |
| `content/data.ts` | Data column copy, the migration sequence, Mekari, earlier roles, skills |
| `content/projects.ts` | The thesis and the five course projects |
| `content/yoga.ts` | Yoga column copy, certification, the practice sequence, reflections |
| `content/education.ts` | Degrees, the exchange, scholarships |
| `content/navigation.ts` | The four nav items and the routes each owns |

A factual sentence is never a bare string. It is a claim:

```ts
type Claim = {
  text: string;                  // what the site says
  source: 'cv' | 'yoga';         // which file backs it
  quote: string;                 // a verbatim span of that file
};
```

Each module exports a zod schema and the data it validates. `content/index.ts`
parses every module at import time, so an invalid module fails `next build`
with the zod error naming the field.

### 5.3 Yoga and contact facts

**Confirmed on 2026-09-24**, and written into `sources/yoga.md` when the
project is scaffolded:

| Fact | Value |
|---|---|
| Years practicing | 3 |
| Completed training | YTT 100-hour |
| Training in progress | YTT 200-hour |
| Style | Hatha yoga |

The site names no training school. Trainings carry no school field, so none
can be added by accident.

Trainings are a list, each with a `status` of `completed` or `in_progress`,
so the 200-hour course moves to `completed` by changing one field. The site
says "in progress" for an unfinished training and never implies she holds it.
The 3-year figure is stated as of the date recorded beside it in
`sources/yoga.md`, so it cannot silently go stale: a test fails once that date
is more than twelve months old.

**Still required from Cindy.** The build fails until each is present and
non-empty:

| Field | Module |
|---|---|
| A practice sequence she uses, 3 to 8 ordered steps | `yoga.ts` |
| One sentence on what practice changed in how she works | `yoga.ts` |
| Email address | `identity.ts` |
| LinkedIn URL | `identity.ts` |
| GitHub URL | `identity.ts` |

Each yoga fact also appears in `sources/yoga.md` so its claim has a quote.

A portrait photo is optional. Every layout must work without one.

### 5.4 Items held back

Her CV marks two details as not yet confirmed: the number of psychologist
raters in the thesis evaluation, and the baseline behind the 29% RMSE
improvement. The site states both claims only as the CV words them and adds
neither detail until it appears in `sources/cv.md`.

### 5.5 Writing rules

These apply to every string in `content/`.

- First person.
- Sentences average about 14 words. The target ceiling is 17, and the hard
  limit enforced by test is 20.
- No em dashes.
- No "not X but Y", "rather than" framing, or "it's not about X" constructions.
  State the positive.
- No announcing the shape of a section before saying it.
- No invented numbers. Every number in a claim's `text` appears in its `quote`.
- No sales words: passionate, driven, results-oriented, leverage, synergy,
  seamless, cutting-edge, dynamic, innovative.
- American spelling, matching her CV: analyzed, optimized, organization.
- Controls say what they do: "Email Cindy", "Read the thesis", "See data work".
- Sentence case for headings and buttons.

## 6. Components

Site components live in `src/components/site/`. Each has one job and takes its
content through props.

| Component | Job | Built from |
|---|---|---|
| `SiteHeader` | Name, primary nav, current-item marking | Untitled UI navigation |
| `SiteFooter` | Contact links, copyright | Plain markup |
| `HalfColumn` | One half on the home page: heading, true line, strip, proof lines, link | Composes the three below |
| `SequenceStrip` | The signature ordered list with the draw-on | Owned markup and CSS |
| `ProofLine` | One claim rendered as a sentence | Plain markup |
| `RoleEntry` | One job: title, organization, dates, claims | Plain markup |
| `ProjectEntry` | One project: title, context, tools, claims | Untitled UI badge for tools |
| `FeatureMark` | The mustard mark on the one featured item per page | Owned markup |

Buttons, badges, links and focus rings come from Untitled UI and inherit the
replaced tokens.

## 7. Verification

Development is test-driven: each unit's test is written and seen failing before
its code. Every check below exists as a test.

| Check | Tool | Fails when |
|---|---|---|
| Content schemas | Vitest, zod | A required field is missing or empty; a date is malformed; a URL is invalid; the years-practicing figure is more than twelve months past its recorded date |
| Evidence integrity | Vitest | A claim's `quote` is not a verbatim span of its source file; a number in `text` is absent from `quote` |
| Palette contrast | Vitest | A text and background token pair used in `src/` measures under 4.5:1, or a UI edge pair under 3:1; coral, mustard or sand is applied as a text color |
| Writing rules | Vitest over `content/` | An em dash, a banned phrase or word, or a sentence over 20 words appears |
| Banned patterns | Vitest over `src/` | A class name contains `eyebrow` or `kicker`; a gradient utility appears; an emoji appears in copy |
| Sequence strip | Vitest, Testing Library | Steps are not an `<ol>`; step count or order differs from the data |
| Routes | Playwright on `out/` | A route fails to load; the wrong nav item carries `aria-current` |
| Layout | Playwright | The page scrolls horizontally at 375px; keyboard focus is not visible |
| Accessibility | `@axe-core/playwright` | Any serious or critical violation on any route |
| Reduced motion | Playwright | Under reduced motion the strip animates, or any strip step is hidden |
| Build output | Vitest over `out/` | The sitemap misses a route; the Person JSON-LD fails to parse; an internal link points nowhere |
| Claims | `npm run claims` | See section 8 |

### Entry points

| Command | Runs |
|---|---|
| `npm run dev` | Local server |
| `npm run test` | Vitest |
| `npm run e2e` | Build, then Playwright against `out/` |
| `npm run check` | Type check, lint, `test`, `e2e`, build output checks |
| `npm run claims` | The TypeSafe claim check |

## 8. Claim checking with TypeSafe

TypeSafe does not run inside the site. It runs at build time as a script, with
the API key held in `TYPESAFE_API_KEY` and never exposed to the browser.

For each claim in `content/`:

1. **Code checks first.** The quote must be a verbatim span of the source file
   after normalizing whitespace and quote characters, and every number in the
   claim's text must appear in the quote. A failure here is marked `fabricated`
   and never reaches the model.
2. **TypeSafe judges support.** One `choice` question per claim, over state
   `{ claim: text, source: quote }`, asking how the source relates to the claim,
   with options `supports`, `contradicts`, `says_nothing`.
3. **Code applies the policy.** `supports` with confidence at or above 0.8
   passes. `contradicts` or `says_nothing` at or above 0.8 fails the run. Any
   answer below 0.8 is written to `claims-review.md` for a person to decide, and
   fails the run until each entry is resolved.

The script uses `@typesafe-ai/sdk` through `TypeSafeClient` and its
`systemOne({ state, questions })` call. Confirm the exact question builder,
response fields and model id against `docs.typesafe.ai/sdk/javascript.md` when
implementing, since the SDK is pre-1.0.

Locally, `npm run claims` stops with a message naming the missing variable if
the key is absent. In CI the key is a repository secret.

## 9. Search and discovery

- Per-page `title` and `description` through the Next.js metadata API.
- One Person JSON-LD block on every page, built from `content/identity.ts`:
  name, job title, alumni of Monash University and Prasetiya Mulya University,
  `knowsAbout`, `knowsLanguage`, and `sameAs` pointing at her LinkedIn and
  GitHub.
- `app/sitemap.ts` and `app/robots.ts`, emitted as static files.
- `public/llms.txt`, a plain summary of both halves and every route.
- A static Open Graph image per section in `public/og/`, 1200 by 630 WebP.

## 10. Deployment

A workflow at `.github/workflows/deploy.yml` runs on every push to `main`:

1. Install with `npm ci`.
2. Run `npm run check`.
3. Run `npm run claims` with the `TYPESAFE_API_KEY` secret.
4. Build and upload `out/` with `actions/upload-pages-artifact`.
5. Publish with `actions/deploy-pages`.

A failure at any step stops the deploy and the live site stays as it was.

Pull requests run steps 1 to 3 only.

The repository's Pages source must be set to GitHub Actions in the repository
settings. `public/.nojekyll` is committed so Pages serves the `_next/` folder.

## 11. Repository layout

```text
cindywanady.github.io/
├── CLAUDE.md              short rules for agents and a routing table into docs/
├── README.md              for people: what the site is, how to run it
├── docs/
│   ├── specs/             this spec and later ones
│   ├── content.md         how to add or change a fact and its evidence
│   ├── design-system.md   palette roles, tokens, type, the strip, banned patterns
│   └── verification.md    every check, what it catches, how to run it
├── sources/               cv.md, yoga.md
├── content/               typed, validated content modules
├── scripts/claims.ts      the TypeSafe claim check
├── src/
│   ├── app/               routes, layout, metadata, sitemap, robots
│   ├── components/ui/     Untitled UI components, owned after copy
│   ├── components/site/   the components in section 6
│   └── styles/theme.css   Untitled UI tokens with the scales from section 4.2
├── tests/unit/
├── tests/e2e/
├── public/
└── .github/workflows/deploy.yml
```

`CLAUDE.md` stays short. It holds the writing rules, the banned patterns, the
palette roles, the rule that facts live in `sources/` and copy lives in
`content/`, and a table naming which `docs/` file to read for which task.

## 12. Acceptance criteria

The first release is done when all of these hold:

1. All six routes and the 404 page export to `out/` and load on GitHub Pages.
2. The home page shows both halves with identical anatomy and equal width
   above 768px.
3. `npm run check` passes.
4. `npm run claims` passes with an empty `claims-review.md`.
5. Every field in section 5.3 is filled from facts Cindy has confirmed.
6. Axe reports no serious or critical violations on any route.
7. No banned pattern from section 4.5 appears.
8. The deploy workflow publishes from `main` and blocks on any failed check.

## 13. Risks

| Risk | Handling |
|---|---|
| The yoga facts are not supplied, so the build cannot pass | By design. The yoga half never ships empty or invented |
| TypeSafe's SDK changes before implementation | Section 8 says to confirm the call shape against the live docs first |
| Untitled UI's CLI or file layout changes | Components are owned after copy; only the initial copy depends on the CLI |
| The cream-and-terracotta palette reads as a generated template | Type, layout and the sequence strip carry the distinction; section 4.5 bans the other template markers |
| GitHub Pages ignores `_next/` | `public/.nojekyll` is committed |

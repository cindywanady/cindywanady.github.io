# cindywanady.github.io

The personal site of Cindy Wanady, live at [cindywanady.github.io](https://cindywanady.github.io/).

It gives her two practices equal weight. The data half covers her CRM and analytics work at Mekari, her Monash master's thesis and her course projects. The yoga half covers her Hatha and Vinyasa practice and her teacher training.

## Run it

You need Node 24.

```bash
npm install
npm run dev        # http://localhost:3000
```

Before you push, run everything CI runs:

```bash
npx playwright install chromium   # once
npm run check      # typecheck, format, build, unit tests, browser tests
```

## Change what the site says

All copy lives in `content/`. Pages and components hold none.

| To change                                                     | Edit                   |
| ------------------------------------------------------------- | ---------------------- |
| Name, intro, profile links                                    | `content/identity.ts`  |
| Mekari, earlier roles, skills, the data half of the home page | `content/data.ts`      |
| The thesis and course projects                                | `content/projects.ts`  |
| Trainings, styles, the yoga sequence, the yoga half           | `content/yoga.ts`      |
| Degrees                                                       | `content/education.ts` |
| Page titles, descriptions, headings, link labels              | `content/pages.ts`     |

Every factual sentence is a claim: the text shown, plus a quote copied word for word from one of two source files.

- `sources/cv.md` is her CV as plain text.
- `sources/yoga.md` holds her yoga facts.
- `sources/brief.md` records the site owner's direction on professional identity.

A fact changes in the source first. Then update the claim that quotes it. `npm test` fails when a quote is not in its source, or when the text shows a number the quote does not contain. That is how a changed CV finds every sentence it no longer supports.

`docs/content.md` has the details and the writing rules the tests enforce.

## How it is built

Next.js exports the site as static HTML to `out/`. Styles use Tailwind and a few components copied from [Untitled UI](https://www.untitledui.com/react) (MIT). The colors come from Cindy's palette in `src/design/palette.ts`. The site self-hosts its fonts, portrait, and editorial images. `docs/design-system.md` describes the visual system and motion.

## Publishing

Pushing to `main` runs `.github/workflows/deploy.yml`. It checks everything, builds, and publishes to GitHub Pages. A failing check stops the deploy, and the live site stays as it was.

Two settings belong to the repository owner:

1. **Settings → Pages → Source: GitHub Actions.** It is still on the legacy branch source. Until it changes, every push also runs GitHub's own Jekyll build, which publishes the raw repository. Whichever finishes last is what the site shows.
2. **A `TYPESAFE_API_KEY` repository secret.** With it, every deploy asks [TypeSafe](https://typesafe.ai/) whether each claim is supported by its quote, and stops if one is not. Without it, that step is skipped with a warning. You can also run it locally with `npm run claims`.

## More

- `CLAUDE.md` is the short version of the rules, for coding agents.
- `docs/verification.md` lists every check and what it catches.
- `docs/specs/` and `docs/plans/` hold the design and the plan the site was built from.

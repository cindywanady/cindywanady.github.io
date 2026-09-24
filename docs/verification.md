# Verification

`npm run check` runs everything below except the claim check. CI runs the same, then the claim check if the secret exists, then deploys from `main`. CI also warns, without failing, when the yoga years figure in `sources/yoga.md` is more than a year old.

## Unit tests, `npm test`

| File | Fails when |
|---|---|
| `content.test.ts` | A field is missing or empty; a quote is not in its source; a number shown is not in its quote; a title, date, degree, skill line, training, style or organization does not match its source; an email appears |
| `claims.test.ts` | The evidence engine misreads a number or a quote |
| `copy-rules.test.ts` | Any content string breaks a writing rule in `docs/content.md` |
| `banned-patterns.test.ts` | `src/` contains an eyebrow, gradient, glass card, accent rail or emoji |
| `contrast.test.ts` | A text color falls under 4.5:1 on cream; `theme.css` and `palette.ts` disagree; a dark theme reappears |
| `fonts.test.ts` | The two typefaces are not the ones loaded |
| `sequence-strip.test.tsx` | Steps are out of order, not an ordered list, or hidden without a scrolling observer or under reduced motion |
| `nav.test.ts`, `site-shell.test.tsx` | The wrong section is marked; a profile link or its icon is missing |
| `pages.test.tsx` | The two home halves differ in anatomy; a page is missing its key content |
| `output.test.ts` | Checks over the built `out/`: missing arrows, sitemap entries, robots, llms.txt, JSON-LD, social image, or a broken internal link. Run after `npm run build` |
| `export.test.ts`, `lockfile.test.ts` | Static export is misconfigured; the lockfile has lost the Linux build binding CI needs |

## Browser tests, `npm run e2e`

Playwright over `out/`, served the way GitHub Pages serves it by `scripts/serve-out.mjs`. Run `npm run build` first.

- Every route loads with one h1 and the right section marked.
- Axe finds no serious or critical violations.
- Nothing scrolls sideways at 320 or 375px.
- The first Tab reaches the skip link, with a visible focus ring.
- A reader with a dark OS still gets the light theme.
- Reduced motion shows every strip step at once.
- An unknown path returns the not-found page with a 404.

## Claim check, `npm run claims`

Needs `TYPESAFE_API_KEY`. It runs the code checks first, then asks TypeSafe whether each quote supports its claim. An answer below 0.8 confidence goes to `claims-review.md` for a person to decide. The run fails until every claim is verified.

## Dependencies

npm can drop platform build packages when it rewrites the lockfile ([npm/cli#4828](https://github.com/npm/cli/issues/4828)). After adding or removing a dependency, reinstall from clean:

```bash
rm -rf node_modules package-lock.json && npm install
```

`lockfile.test.ts` catches it if you forget.

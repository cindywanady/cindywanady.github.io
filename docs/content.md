# Content and evidence

## Where things live

- `sources/` holds facts. `cv.md` is Cindy's CV as plain text; `yoga.md` holds her yoga facts. Nothing else on the site may state a fact that is not in one of them.
- `content/` holds everything a reader sees, as typed modules. `content/index.ts` parses each against a zod schema in `content/schema.ts` when the site builds. A missing or empty field fails the build and names the field.
- `src/app/` and `src/components/` hold layout only. They read from `content/` and contain no copy.

## Claims

A factual sentence is never a bare string. It is a claim:

```ts
{ text: "I led CRM migrations of about 50,000 records across 5 modules.",
  source: "cv",
  quote: "Led CRM platform migrations covering est. 50,000 records across 5 modules" }
```

`quote` must be a word-for-word span of `sources/<source>.md`. Whitespace and curly quotes are normalized, nothing else. Every number in `text` must also appear in `quote`.

Titles, employers, dates, degrees, skill lines and languages are not sentences, so they are not claims. A separate test checks each appears verbatim in the CV.

## Changing a fact

1. Edit the source file.
2. Run `npm test`. Every claim that quoted the old wording fails and names its quote.
3. Update each failing claim's `text` and `quote`.

This is how the Monash result was corrected. The CV said GPA 3.67 and High Distinction. The source changed to GPA 3.563, WAM 80.25, with Distinction. The tests then found each sentence that still said the old thing.

## Writing rules

`tests/unit/copy-rules.test.ts` checks every string in `content/` except quotes.

- First person, American spelling (her CV's: analyzed, optimized).
- No sentence over 20 words. Aim for about 14.
- No em dashes and no emoji.
- No "not X, but Y", "rather than" or "it's not about" framing. State the positive.
- None of these words: passionate, driven, results-oriented, leverage, synergy, seamless, cutting-edge, dynamic, innovative.
- Links say what they do: "See data work", not "Learn more".

## Held back on purpose

- No email address is published. Contact is LinkedIn, Instagram and GitHub, and a test enforces it.
- The yoga strip is captioned "A sequence I practice" and does not name the sequence. A test keeps the name off the page.
- Her CV had two details marked unconfirmed: the number of psychologist raters, and the baseline behind the 29% RMSE gain. Neither appears until it is in `sources/cv.md`.
- The 200-hour yoga training shows as in progress. Change its `status` in `content/yoga.ts` when it is done.
- Her yoga practice is stated as "since 2022", a fixed year, so it never needs updating.

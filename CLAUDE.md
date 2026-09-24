# CLAUDE.md

Cindy Wanady's personal site. Two practices, data and yoga, with equal weight. Next.js static export, Tailwind, Untitled UI, published to GitHub Pages.

## Rules

- Facts live in `sources/`. Copy lives in `content/`. Pages and components hold neither.
- Every factual sentence is a claim with a word-for-word `quote` from its source. Change the source first, then the claim.
- Never invent a fact, number or detail about Cindy. If it is not in `sources/`, ask.
- Copy: first person, American spelling, no sentence over 20 words, no em dashes, no emoji, no "not X but Y" framing, no sales words.
- Never add: eyebrow or kicker labels, gradients, glass cards, accent rails, decorative numbering, or animation beyond the sequence strip.
- Coral, mustard and sand are never text colors.
- Light theme only.
- No email address on the site.
- Write the failing test first.
- After any dependency change, reinstall from clean (`rm -rf node_modules package-lock.json && npm install`).
- Run `npm run check` before calling anything done.

## Read before touching

| Working on                          | Read                                   |
| ----------------------------------- | -------------------------------------- |
| Copy, facts, claims                 | `docs/content.md`                      |
| Colors, type, the strip, components | `docs/design-system.md`                |
| Tests, CI, the claim check          | `docs/verification.md`                 |
| Why it is built this way            | `docs/specs/2026-09-24-site-design.md` |

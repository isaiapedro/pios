# Equal Rights — design dossier

An implementation-neutral record of the Equal Rights public blog, social-card assets, and protected CMS, extracted from `services/personal-blog/src/app/`. It preserves interaction and visual contracts without copying editorial content, visitor data, credentials, or media assets.

## Scope and source boundaries

| Surface | Source | Included here |
|---|---|---|
| Public shell and discovery | `app.ts`, `home-page/`, `articles-page/`, `article-search-page/`, `collection-page/` | Navigation, search, filters, layouts, cards, responsive behavior |
| Long-form reading | `post-page/`, `review/` | Reading hierarchy, metadata, engagement, comments, review anatomy |
| About | `about-page/` | Personal, tactile composition pattern only; no profile data or assets |
| Protected authoring | `admin/`, `auth/login/` | Information architecture and state patterns only |

Do not copy source data files, article/review text, images, social URLs, admin screens containing live content, or any authentication material into this dossier.

## Visual character

The public experience is a **dark, independent music magazine**: near-black canvas, white editorial rules, restrained neutral text, saturated red labels, and serif headlines. It combines newspaper hierarchy with a small amount of analog texture. The CMS intentionally switches to a denser, functional dark workspace rather than inheriting the public site’s editorial treatment.

### Foundations

| Concern | Observed contract |
|---|---|
| Base canvas | Dark `#000` application background; reading surfaces range from `#0d0d0d` to `#1b1b1b`. Light mode uses warm off-white `#f5f5f0`, not pure white. |
| Text | Primary white; supporting text typically `#888`–`#ccc`; use contrast, weight, and serif/sans contrast before adding color. |
| Accent | Red `#D32531` for category labels and prominent actions; active state darkens to `#a0000f`. Likes use a brighter red. |
| Typography | `Playfair Display` for editorial/display reading; `Inter` for interface and body controls; `IBM Plex Mono` for dates, technical metadata, genres, and code. The about surface adds handwriting/typewriter faces as a deliberate exception. |
| Rules and elevation | 1px translucent white dividers establish editorial structure. The red control uses a distinctive double-outline plus 5px offset shadow. Soft, low-contrast cards are reserved for review details and forms. |
| Shape | Editorial/public imagery is mostly square or lightly rounded (6–16px); search and genre filters are pill-shaped; CMS controls use practical 4–8px corners. |
| Motion | 150–300ms color, opacity, image scale, and drawer transitions. Image loading uses a dark shimmer. Avoid ornamental animation during reading. |

## Structure

- `shared/brand-assets/` — Equal Rights logos and banner.
- `shared/social-cards/cards/` — social-card templates and previews.
- `shared/tokens/` — shipping color, typography, spacing, and base contracts.
- `shared/integration/equal-rights.css` — one-file CSS entry point.
- `desktop/blog/PATTERNS.md` — desktop public and CMS patterns.
- `desktop/blog/patterns.css` — desktop-ready editorial, reading, and review patterns.
- `mobile/blog/README.md` — mobile navigation and responsive behavior.
- `mobile/blog/patterns.css` — responsive overrides.
- `DECISIONS.md` — extraction choices, privacy boundaries, and known source divergences.
- Shipping implementation: `services/personal-blog/src/app/`.

## Reuse rules

1. Reuse this kit only for editorial, music, or culture-oriented surfaces; it is intentionally opinionated.
2. Treat the red print-label button and serif/sans/mono triad as a set. Do not transplant either alone into a neutral PIOS interface.
3. Prefer the documented semantic roles over literal selectors or one-off values. A future implementation should centralize them as tokens.
4. Keep public reading patterns and authenticated CMS patterns separate. The CMS is not a public-site component library.
5. Preserve keyboard-visible focus, accessible names, and adequate contrast when reimplementing; these are requirements for the extracted contract even where the source does not express them consistently.

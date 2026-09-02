# Caramelo — Petlove&Co Design System

Caramelo is the design system of **Petlove&Co**, Brazil's largest pet-care ecosystem (e-commerce + services + health). It powers the storefronts and apps of the group's brands — **Petlove, DogHero, Vetsmart, Vetus, Porto.pet** and **Clube Petlove**. The name *caramelo* is a loving nod to the iconic Brazilian mixed-breed street dog (the "vira-lata caramelo").

This project is a faithful recreation built from the brand's Figma library, intended for generating well-branded interfaces and assets — production or throwaway prototypes.

## Sources
- **Figma:** "❌ Caramelo 2.0 - Components [Não usar]" (mounted .fig). 925 component sets, 968 design variables across 3 collections, brand logos under the *Brand* page. Tokens, the Petlove wordmark, the Caramelo logo, the heart mark and 21 real icon glyphs were extracted directly from this file. (The file title marks it as an archived/WIP copy — treat values here as a recreation, confirm against the live library before production use.)
- Language throughout the source is **Brazilian Portuguese (pt-BR)**.

---

## CONTENT FUNDAMENTALS — voice & copy

Petlove's voice is **warm, close, and caring** — it talks to pet parents like a knowledgeable friend, never a corporation.

- **Language:** Brazilian Portuguese. Informal second person ("você"), e.g. *"Tudo para o seu pet"*, *"Ofertas pra vocês"*.
- **Tone:** affectionate and reassuring. Cuidado (care) is the core theme — *"Cuidar é amar"*. Pets are family ("seu melhor amigo", "seu pet").
- **Casing:** sentence case everywhere — buttons, titles, labels. NOT Title Case. Reserve UPPERCASE only for tiny eyebrow labels (brand name on a product card, section kickers).
- **Buttons** are short, action-first verbs: *Adicionar à sacola*, *Assinar agora*, *Finalizar compra*, *Ver tudo*. Note: cart = **"sacola"** (bag), not "carrinho".
- **Numbers/price:** pt-BR format — `R$ 189,90` (comma decimals). Discounts as `-30%`.
- **Emoji:** used very sparingly, only as a friendly accent in confirmations (e.g. a 🐾 on "Pedido confirmado!"). Not in UI chrome.
- **Vibe:** optimistic, trustworthy, a little playful. The heart ♥ is the emotional shorthand of the brand and appears as a recurring motif.

---

## VISUAL FOUNDATIONS

**Color.** The signature combination is a **purple brand** (`#4E2096`) against **warm "caramelo" neutrals** — creams and sands rather than cold greys (`#F9F4EC`, `#EBE2D3`, `#D3C8B6`, text `#322D25`). The **heart red** (`#EA534A`) is the accent/emotional mark, used for the logo heart, discount badges and favorites. Feedback colors: green success `#49A971`, amber warning `#FFA840`, red danger `#EA534A`, blue info `#0A60D8`, each with a soft tint. Surfaces are white/cream; the page background is the warm `--c-surface`.

**Type.** Two families: **Inter** for all body and UI text, and **Gooper** (a rounded, friendly slab serif by Latinotype) for display/brand headings. Gooper is shipped as the real licensed face (`assets/fonts/`, weights SemiBold 600 / Bold 700 / Black 900). Mono is **Roboto Mono**. Scale: 12 / 14 / 16 / 22 / 24 / 32 / 48. Headings are bold; body is regular; labels are medium.

**Shape & radius.** Friendly and rounded. Radii: 4 / 8 / 12 / 16 / 20 / 24 px plus **pill (999)**. **Buttons, chips, search, avatars and badges are fully pill-shaped.** Cards use 16–20px radius.

**Elevation.** Shadows are **warm brown** (`rgba(60,35,18,…)`), not neutral grey/black — they keep the cozy palette consistent. Four steps xs→lg, low-opacity and soft. Cards sit on a 1px warm hairline border (`--c-border`) plus an `xs` shadow; interactive cards lift on hover.

**Spacing.** 4px base grid (4 / 8 / 12 / 16 / 24 / 32 / 48). Control heights sm/md/lg = 40 / 48 / 56px.

**Borders.** 1px hairlines for dividers/cards; 2px for inputs and focus. Focus state = brand-colored border + a soft `--c-brand-soft` ring.

**Motion.** Restrained and gentle. ~0.15–0.18s ease transitions on color/background/border; buttons scale to ~0.97 on press; subtle 2px hover lift on cards. Loading uses a shimmer sweep (skeleton) and a brand spinner. No bounces or flashy effects.

**Hover / press.** Primary buttons darken to the `strong` shade on hover; secondary/tertiary fill with the soft tint. Press shrinks slightly. Icon buttons share the same logic.

**Imagery.** Real product/pet photography on cream placeholders, square crops with rounded corners. Warm, bright, friendly photography.

---

## ICONOGRAPHY

- Petlove uses a **custom line/solid icon set** (~271 glyphs in Figma) with Material-style naming (`icon/24px/<name>`, `icon/content/<name>_24px`). Icons are drawn on a 24px frame with ~20px live area, single-color, and **paint with `currentColor`** so they inherit text color.
- This project ships **21 real extracted glyphs** through a single `Icon` component (`components/icons/`): arrow-right, cart, cat, check, chevron-down/left/right, close, close-circle, danger, dog, gift, heart, home, info, minus-circle, plus, search, star, success, warning. Glyph path data lives in `components/icons/iconRegistry.js`.
- Need more? Extract additional glyphs from the Figma library with `fig_materialize` and add them to the registry — **don't hand-draw SVGs.**
- **Emoji** are not used as icons. **Unicode** isn't used for iconography either. The **heart** is the one symbolic motif (`HeartSolid` / `Heart` brand components).

---

## INDEX

**Foundations**
- `styles.css` — global entry point (only `@import`s). Consumers link this.
- `tokens/colors.css` · `typography.css` · `spacing.css` · `fonts.css` · `base.css` — curated, human-readable token layer (use `--c-*`, `--fs-*`, `--space-*`, `--radius-*`, `--shadow-*`).
- `tokens/fig-tokens.css` — full Figma variable export (all primitives + semantic aliases + theme modes) for completeness.
- `guidelines/*.card.html` — foundation specimen cards (colors, type, spacing, radii, shadows).

**Components** (`components/<group>/`, exposed on `window.CarameloDesignSystemPetlove_6f57df`)
- `core/` — Button, IconButton, Badge, Tag, Avatar, Price, Divider
- `forms/` — Input, Textarea, Select, Checkbox, Radio, Switch, Counter, SearchBar
- `surface/` — Card, ProductCard, Banner, Accordion
- `feedback/` — Alert, Snackbar, Tooltip, Skeleton, ProgressIndicator, Rating, EmptyState
- `navigation/` — Tabs, SegmentedButton, Chip, BottomNav, Pagination, Stepper
- `icons/` — Icon (+ `iconRegistry.js`)

**Brand** (`assets/brand/`)
- PetloveLogo (wordmark, 6 variants), CarameloLogo, HeartSolid, Heart, CoreSolid — real vector logos.

**UI kit** (`ui_kits/petlove-shop/`)
- Interactive mobile storefront (home → product → cart) composed from the components.

**Other**
- `SKILL.md` — Agent-Skill manifest for use in Claude Code.

---

## Usage
Link `styles.css`, load `_ds_bundle.js`, then read components from the namespace:
```html
<link rel="stylesheet" href="styles.css" />
<script src="_ds_bundle.js"></script>
<script>const { Button, ProductCard, Icon } = window.CarameloDesignSystemPetlove_6f57df;</script>
```

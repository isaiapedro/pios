---
name: caramelo-petlove-design
description: Use this skill to generate well-branded interfaces and assets for Petlove&Co (Caramelo design system), either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, brand logos, icons, and UI kit components for prototyping the Petlove, DogHero, Vetsmart, Vetus and Clube Petlove brands.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick reference
- **Brand:** Petlove&Co (Brazil's largest pet ecosystem). Voice: warm, caring, pt-BR, informal "você". Theme: *cuidar é amar*. Cart = "sacola".
- **Color:** purple brand `#4E2096`; warm caramelo neutrals (`#F9F4EC`/`#EBE2D3`/text `#322D25`); heart-red accent `#EA534A`. Warm-brown shadows.
- **Type:** Inter (body/UI), Gooper (display — real licensed face in `shared/assets/fonts/`), Roboto Mono. Sentence case.
- **Shape:** pill buttons/chips/inputs; 16–20px cards; rounded & friendly.
- **Tokens:** `shared/tokens/*.css` (curated `--c-*`, `--fs-*`, `--space-*`, `--radius-*`, `--shadow-*`) + `shared/tokens/fig-tokens.css` (full Figma export).
- **Components:** `shared/components/<group>/` → `window.CarameloDesignSystemPetlove_6f57df`. Icons via `Icon` (currentColor). Logos in `shared/assets/brand/`.
- **Reference UI:** `mobile/ui-kits/petlove-shop/` interactive storefront.

To use components: link `styles.css`, load `_ds_bundle.js`, then `const { Button, ProductCard, Icon } = window.CarameloDesignSystemPetlove_6f57df;`.

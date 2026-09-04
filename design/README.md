# PIOS Design

Design material is organized by ownership first, then product, then platform. A product owns every one of its assets, tokens, references, and pattern documents; nothing is shared across ownership boundaries by default.

## Catalog

| Owner | Product | Platforms | Entry point |
|---|---|---|---|
| Personal | Equal Rights | Desktop, mobile | `personal/equal-rights/` |
| Personal | Chess Wrapped | Mobile | `personal/chess-wrapped/` |
| Professional · Petlove | Caramelo Design System | Shared primitives, mobile examples | `professional/petlove/caramelo-design-system/` |

## Navigation convention

```text
<owner>/<product>/shared/  # assets, identity, tokens, sources used by more than one surface
<owner>/<product>/desktop/ # desktop-specific layouts and patterns
<owner>/<product>/mobile/  # mobile-specific layouts, implementations, and prototypes
```

`shared/` never means cross-product reuse. It belongs only to its containing product. A new product begins under either `personal/` or `professional/<organization>/`; do not add a root-level asset, UI, identity, mobile, reference, or job folder.

## Product entry points

- Equal Rights: `personal/equal-rights/README.md`
- Chess Wrapped: `personal/chess-wrapped/mobile/implementation/README.md`
- Caramelo: `professional/petlove/caramelo-design-system/README.md`

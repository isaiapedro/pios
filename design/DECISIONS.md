# Design structure decisions

## Ownership precedes artifact type

The former type-first tree mixed unrelated personal and professional material. Every design artifact now sits below an owner and product, so discovery does not imply permission to reuse a brand, token set, or asset.

## Platform separation without duplication

Desktop and mobile material are separate below each product. Assets, references, identity, and tokens used by more than one surface stay in that product's `shared/` directory. Products do not receive empty platform directories.

## Professional systems are isolated

Caramelo remains entirely within `professional/petlove/caramelo-design-system/`. Its fonts, components, generated bundle, tokens, and example screens are not PIOS shared assets.

## Generated files

Source configuration and lockfiles are retained with their prototypes. Generated dependency and cache directories are excluded from the active Design tree. A generated asset may be removed only when it is confirmed redundant with a canonical file.

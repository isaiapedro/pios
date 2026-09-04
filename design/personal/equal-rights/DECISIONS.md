# Personal Blog — extraction decisions

## This is a dossier, not a copied design system

The source application is a personal service and contains editorial records, identity material, social destinations, and an authenticated CMS. This folder documents reusable visual and interaction patterns only. It contains no copied content, images, data exports, account information, or implementation bundle.

## Why the public and CMS systems stay separate

The public experience prioritizes discovery and long-form reading: strong editorial type, image-led hierarchy, and print-like rules. The CMS prioritizes scanning, status, forms, and safe authoring. Combining them would dilute both and could encourage accidental use of internal patterns on public surfaces.

## Why raw source values are described rather than promoted globally

The source uses repeated hard-coded colors, sizes, and spacing alongside Angular Material defaults. They form a clear product language but are not yet a PIOS-wide token standard. This dossier names the roles and preserves representative values; a future product implementation should create local tokens before sharing any primitive.

## Intentional exceptions

- The about page’s paper, handwriting, tape, and rotated elements are a contained autobiographical composition—not a general-purpose card recipe.
- The red, outlined offset-shadow label is a brand-signature editorial action, not the default PIOS button.
- Grain is nearly imperceptible and belongs only on review reading surfaces; it must not reduce text contrast or performance.

## Source divergences to resolve before implementation work

1. The application combines custom CSS with Angular Material’s generated Azure/blue theme. A future extraction should choose one semantic token layer and map Material tokens to it.
2. Light mode is implemented through broad selector overrides. A new implementation should define paired semantic tokens instead of maintaining a growing override list.
3. Focus visibility and control semantics are not consistently explicit in the source. Any reuse must add keyboard focus, target sizes, labels, and contrast validation.
4. Several layout values are hand-tuned with absolute positioning, zoom, and negative margins. Preserve the visual hierarchy, but use resilient container/grid rules in a new surface.
5. Some visual labels are used both as tags and filters. Their semantic role, keyboard behavior, and state must follow the actual interaction, not the shared CSS class.
